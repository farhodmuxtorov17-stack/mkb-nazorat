/* ============================================================
   jonli.js — ochiq manbalardan jonli ma'lumot qatlami
   Bank obyektiga tegmaydi. Uch manba ishlatiladi:
     1. Open-Meteo (CC BY 4.0): harorat, bulut, quyosh nurlanishi,
        shamol zarbi va yog'in. Kalitsiz, CORS ochiq, 15 daqiqa keshda.
     2. Ommaviy MQTT sinov brokeri (test.mosquitto.org, zaxira:
        broker.emqx.io) shifrlangan WebSocket orqali. Mavzu tasodifiy,
        xabarda bank ma'lumoti yo'q. MQTT 3.1.1 mijozi shu faylda.
     3. Kamera kadri: faqat egasi hammaga e'lon qilgan va joylashtirishga
        ruxsat bergan kadr yoki oqim (davlat idorasi kamerasi, YouTube).
        Ro'yxat assets/jonli/kameralar.json da.
   Internet yopiq bo'lsa har blok 8 soniyadan keyin halol xabar beradi,
   sahifaning qolgan qismi ishlayveradi.

   Brauzersiz qism (hisoblar va MQTT paketlari) node'da sinovdan o'tadi:
   window.MKB_JONLI_SOF yoki module.exports.

   Sahifa uchun:
     MKB.jonli.obHavoBlok(el, {lat, lng, quyoshli, obyektId, korik})
     MKB.jonli.namunaKarta(el)       — monitoring markazi
     MKB.jonli.sinovQurilma(el)      — qurilmalar ro'yxati
     MKB.jonli.quyoshIqlimi(lat, lng) — NASA POWER oylik nurlanishi va panel hisobi
                                        (obHavoBlok quyoshli qurilmada chaqiradi)
     MKB.jonli.obHavo([{lat, lng}])   — Open-Meteo: joriy holat va 24 soatlik prognoz (obHavoBlok ichida)
   ============================================================ */
(function(){
  "use strict";
  const G = typeof window !== "undefined" ? window : globalThis;

  /* ---------- 1. Sof hisoblar ---------- */
  const SOF = (function(){
    /* Navbatdan tashqari ko'rik chegaralari: kuchli shamol, jala va qattiq sovuq */
    const CHEGARA = {shamolZarbi: 72, yogin24: 20, sovuq: -10};
    /* Taqdimotdagi 1-profil (hodisali 4G kamera): kuniga 72 Vt·soat, 5 kunlik zaxira,
       80 % gacha razryad, zaxirani 10 kunda tiklash. PR 0,7: 22 Vt panel 1,62 kVt·soat/m² da
       sutkasiga 25 Vt·soat beradi, taqdimotdagi o'lchov shu. */
    const PROFIL = {panelVt: 104, ehtiyojVtSoat: 72, pr: 0.7, avtonomKun: 5, razryad: 0.8, tiklashKun: 10};

    const yaxlit = (x, n) => { const k = Math.pow(10, n || 0); return Math.round(x * k) / k; };
    /* Uchinchi tomonga obyektning aniq nuqtasi yuborilmaydi: 0,1° (taxminan 11 km) ob-havo uchun yetarli */
    const koordinata = (lat, lng) => [yaxlit(+lat, 1), yaxlit(+lng, 1)];
    const mjdanKvt = mj => mj == null || isNaN(mj) ? null : mj / 3.6;
    const sonmi = v => typeof v === "number" && isFinite(v);

    /* Litiy (shu jumladan LiFePO4) akkumulyator 0 °C dan past haroratda zaryad olmaydi: BMS zaryadni to'xtatadi */
    function zaryad(harorat){
      if (!sonmi(harorat)) return null;
      return {toxtatilgan: harorat < 0, harorat};
    }
    /* Kunlik nurlanish (kVt·soat/m²) × panel (Vt) × PR = sutkalik hosil, Vt·soat */
    function quyoshHosili(kvtSoatM2, panelVt, pr){
      if (!sonmi(kvtSoatM2)) return null;
      return Math.round((panelVt || PROFIL.panelVt) * kvtSoatM2 * (pr || PROFIL.pr));
    }
    /* Prognozdan navbatdan tashqari ko'rik asoslari. Tizim hech narsa yaratmaydi: faqat asosni aytadi */
    function korikAsoslari(p){
      const r = [];
      if (!p) return r;
      if (sonmi(p.shamolMaks) && p.shamolMaks > CHEGARA.shamolZarbi) r.push({kalit: "shamol", qiymat: p.shamolMaks, chegara: CHEGARA.shamolZarbi});
      if (sonmi(p.yoginJami) && p.yoginJami > CHEGARA.yogin24) r.push({kalit: "yogin", qiymat: p.yoginJami, chegara: CHEGARA.yogin24});
      if (sonmi(p.haroratMin) && p.haroratMin < CHEGARA.sovuq) r.push({kalit: "sovuq", qiymat: p.haroratMin, chegara: CHEGARA.sovuq});
      return r;
    }
    /* Keyingi 24 soatlik soatbay prognozdan eng katta zarb, jami yog'in va eng past harorat */
    function kunlikXulosa(soatlik){
      if (!soatlik) return null;
      const ol = k => (soatlik[k] || []).slice(0, 24).filter(sonmi);
      const z = ol("wind_gusts_10m"), y = ol("precipitation"), t = ol("temperature_2m");
      if (!z.length && !y.length && !t.length) return null;
      return {shamolMaks: z.length ? Math.max.apply(null, z) : null,
        yoginJami: y.length ? yaxlit(y.reduce((a, b) => a + b, 0), 1) : null,
        haroratMin: t.length ? Math.min.apply(null, t) : null};
    }
    /* Panel va akkumulyator eng qorong'i oyga hisoblanadi (NASA POWER oylik o'rtachasi, kVt·soat/m² kun).
       Toshkent: dekabr 1,62 → 104 Vt panel, iyun 7,60 → 22 Vt; akkumulyator 450 Vt·soat. */
    function quvvatHisobi(psh, o){
      o = Object.assign({}, PROFIL, o || {});
      if (!sonmi(psh) || psh <= 0) return null;
      const akkumulyatorVtSoat = Math.ceil(o.ehtiyojVtSoat * o.avtonomKun / o.razryad);
      const tiklashVtSoat = akkumulyatorVtSoat / o.tiklashKun;
      return {akkumulyatorVtSoat, tiklashVtSoat: Math.round(tiklashVtSoat),
        panelVt: Math.ceil(yaxlit((o.ehtiyojVtSoat + tiklashVtSoat) / (psh * o.pr), 3))};
    }
    const eskirganmi = (vaqt, hozir, ms) => !sonmi(vaqt) || (hozir - vaqt) > (ms || 15 * 60e3) || vaqt > hozir + 60e3;

    /* ---------- MQTT 3.1.1: faqat kerakli paketlar (CONNECT, SUBSCRIBE, PUBLISH QoS 0, PING, DISCONNECT) ---------- */
    const utf8 = s => new TextEncoder().encode(String(s));
    function uzunlik(n){
      const b = [];
      do { let x = n % 128; n = Math.floor(n / 128); if (n > 0) x |= 128; b.push(x); } while (n > 0);
      return b;
    }
    function satr(s){ const u = utf8(s); return [u.length >> 8, u.length & 255].concat(Array.from(u)); }
    function paket(bosh, tana){ return new Uint8Array([bosh].concat(uzunlik(tana.length), tana)); }
    const mqtt = {
      ulanish: (mijozId, jonliSoniya) => paket(0x10, satr("MQTT").concat([4, 0x02, (jonliSoniya >> 8) & 255, jonliSoniya & 255], satr(mijozId))),
      obuna: (id, mavzu) => paket(0x82, [id >> 8, id & 255].concat(satr(mavzu), [0])),
      nashr: (mavzu, matn) => paket(0x30, satr(mavzu).concat(Array.from(utf8(matn)))),
      ping: () => new Uint8Array([0xC0, 0]),
      uzish: () => new Uint8Array([0xE0, 0]),
      /* Oqimdan to'liq paketlarni ajratadi; chala qolgan qism keyingi bo'lak bilan qo'shiladi */
      ajrat(bufer){
        const paketlar = [];
        let i = 0;
        while (i < bufer.length){
          let n = 0, k = 1, j = i + 1, byte;
          do {
            if (j >= bufer.length) return {paketlar, qoldiq: bufer.slice(i)};
            byte = bufer[j++]; n += (byte & 127) * k; k *= 128;
          } while (byte & 128);
          if (j + n > bufer.length) return {paketlar, qoldiq: bufer.slice(i)};
          const tur = bufer[i] >> 4, tana = bufer.slice(j, j + n);
          if (tur === 2) paketlar.push({tur: "connack", kod: tana[1]});
          else if (tur === 9) paketlar.push({tur: "suback", id: (tana[0] << 8) | tana[1], kod: tana[2]});
          else if (tur === 13) paketlar.push({tur: "pingresp"});
          else if (tur === 3){
            const qos = (bufer[i] >> 1) & 3, ml = (tana[0] << 8) | tana[1];
            const mavzu = new TextDecoder().decode(tana.slice(2, 2 + ml));
            const bosh = 2 + ml + (qos ? 2 : 0);
            paketlar.push({tur: "publish", mavzu, matn: new TextDecoder().decode(tana.slice(bosh))});
          } else paketlar.push({tur: "boshqa", kod: tur});
          i = j + n;
        }
        return {paketlar, qoldiq: new Uint8Array(0)};
      },
    };

    /* Qurilma xabari: XAVFSIZLIK_HODISALARI yozuvi bilan bir xil maydon nomlari. obyektId ataylab bo'sh */
    const SXEMA = "mkb.qurilma.voqea/1";
    function voqea(o){
      return {sxema: SXEMA, qurilmaId: o.qurilmaId, tur: o.tur, hodisa: o.hodisa, jiddiylik: o.jiddiylik || "past",
        batareya: sonmi(o.batareya) ? o.batareya : null, obyektId: null, namuna: true, yuborildi: o.hozir};
    }
    function voqeaTekshir(o){
      return !!o && typeof o === "object" && o.sxema === SXEMA && o.namuna === true && typeof o.qurilmaId === "string" &&
        o.qurilmaId.length <= 40 && typeof o.hodisa === "string" && o.hodisa.length <= 120 && sonmi(o.yuborildi);
    }
    const mavzu = hex => "mkb-nazorat/namuna/" + String(hex).replace(/[^a-f0-9]/gi, "").slice(0, 32);
    /* Ekrandagi son: vergul bilan, minus belgisi bilan. Yaxlitlangach nolga teng manfiy son belgisiz chiqadi
       (−0,4 butungacha "0", "−0" emas) */
    const sonMatn = (x, kasr) => !sonmi(x) ? "—"
      : x.toFixed(kasr || 0).replace(/^-(?=0(\.0+)?$)/, "").replace(".", ",").replace(/^-/, "−");

    return {CHEGARA, PROFIL, koordinata, mjdanKvt, zaryad, quyoshHosili, korikAsoslari, kunlikXulosa, quvvatHisobi,
      eskirganmi, mqtt, voqea, voqeaTekshir, mavzu, SXEMA, sonMatn};
  })();

  G.MKB_JONLI_SOF = SOF;
  if (typeof module !== "undefined" && module.exports) module.exports = SOF;
  if (typeof document === "undefined" || !G.MKB) return;

  /* ---------- 2. Brauzer qismi ---------- */
  const MKB = G.MKB, esc = MKB.esc;
  const KUTISH = 8000;
  const OFLAYN = "Internet yo'q: jonli namuna ko'rsatilmaydi";
  const OFLAYN_IZOH = "Bank tarmog'i tashqi manzillarni yopgan bo'lsa ham shu xabar chiqadi. Sahifaning qolgan qismi ishlayveradi.";
  const OM_MANBA = "Open-Meteo, CC BY 4.0";
  const ikon = n => typeof G.ik === "function" ? G.ik(n) : "";
  const tarjima = el => { if (typeof G.tarjimaQil === "function") G.tarjimaQil(el); };
  const xotira = {
    ol(k){ try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : null; } catch (_) { return null; } },
    yoz(k, v){ try { localStorage.setItem(k, JSON.stringify(v)); } catch (_) {} },
  };
  const son = SOF.sonMatn;
  const tj = v => '<span data-tarjimasiz>' + esc(String(v)) + "</span>";

  /* Uslub bir marta qo'shiladi: v6 tokenlari, yangi o'lcham kiritilmaydi */
  function uslub(){
    if (document.getElementById("jl-uslub")) return;
    const s = document.createElement("style");
    s.id = "jl-uslub";
    s.textContent = [
      ".jl-izoh{font-size:13px;line-height:1.6;color:var(--matn-3);margin:0}",
      ".jl-izoh b{color:var(--matn-2);font-weight:500}",
      ".jl-manba{font-size:12.5px;line-height:1.55;color:var(--matn-3);margin:12px 0 0}",
      ".jl-manba a{color:inherit;text-decoration:underline;text-underline-offset:2px}",
      ".jl-blok{padding:18px 0 4px;box-shadow:inset 0 1px 0 var(--chiziq-2);margin-top:18px}",
      ".jl-blok:first-of-type{margin-top:6px}",
      ".jl-blok-bosh{display:flex;align-items:center;gap:10px 14px;flex-wrap:wrap;margin-bottom:10px}",
      ".jl-blok-bosh h3{font:500 16px/1.3 var(--shrift-displey);letter-spacing:-.015em;margin:0;flex:1 1 220px;display:flex;align-items:center;gap:10px}",
      ".jl-blok-bosh h3 .ic{width:19px;height:19px;color:var(--matn-3);flex:none}",
      ".jl-amallar{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}",
      ".jl-xato{display:flex;gap:10px;align-items:flex-start;padding:12px 14px;border-radius:var(--r-kichik);background:var(--plitka);font-size:13.5px;line-height:1.5;color:var(--matn-2);margin-top:10px}",
      ".jl-xato .ic{width:17px;height:17px;flex:none;margin-top:2px;color:var(--matn-3)}",
      ".jl-xato > div > span{display:block;color:var(--matn-3);font-size:12.5px}",
      ".jl-kod{font-family:var(--shrift-mono);font-size:12.5px;overflow-wrap:anywhere}",
      ".jl-kuzatuv{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-top:4px}",
      ".jl-kuzatuv > div{padding:12px 14px;border-radius:var(--r-kichik);background:var(--plitka)}",
      ".jl-kuzatuv small{display:block;font-size:12.5px;color:var(--matn-3);margin-bottom:4px}",
      ".jl-kuzatuv b{font-size:17px;font-weight:500;letter-spacing:-.02em;font-variant-numeric:tabular-nums}",
      ".jl-xulosa{margin-top:12px;font-size:13.5px;line-height:1.6;color:var(--matn-2)}",
      ".jl-xulosa .chip{margin-right:6px}",
      ".jl-kadr{position:relative;width:100%;aspect-ratio:16/9;border-radius:16px;overflow:hidden;background:var(--qora-yuza);margin-top:10px}",
      ".jl-kadr iframe{position:absolute;inset:0;width:100%;height:100%;border:0}",
      ".jl-kadr img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain}",
      ".jl-kadr .jl-kadr-belgi{position:absolute;left:10px;top:10px;max-width:calc(100% - 20px);white-space:normal;height:auto;line-height:1.35;padding-top:4px;padding-bottom:4px}",
      ".jl-kam-tor{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:14px;margin-top:10px}",
      ".jl-kam-tor .jl-kadr{margin-top:0}",
      ".jl-kam-matn{display:flex;flex-direction:column;gap:4px;margin-top:8px;font-size:13px;line-height:1.5;color:var(--matn-3)}",
      ".jl-kam-matn b{color:var(--matn-2);font-weight:500;font-size:14px}",
      ".jl-rad{margin:8px 0 0;padding:0;list-style:none}",
      ".jl-rad-yig summary{cursor:pointer;padding:10px 0}",
      ".jl-qatorlar .qator .matn > span{display:block;-webkit-line-clamp:unset;line-clamp:unset;overflow:visible}",
      ".jl-rad li{padding:10px 0;font-size:13px;line-height:1.55;color:var(--matn-3);box-shadow:inset 0 -1px 0 var(--chiziq-2)}",
      ".jl-rad li:last-child{box-shadow:none}",
      ".jl-rad b{color:var(--matn-2);font-weight:500}",
    ].join("\n");
    document.head.appendChild(s);
  }

  /* 8 soniyalik chegara bilan so'rov. Tarmoq xatosi va server javobi alohida ajratiladi */
  function xato(tur, status){ const e = new Error(tur === "tarmoq" ? OFLAYN : "HTTP " + status); e.tur = tur; e.status = status; return e; }
  async function olish(url){
    if (navigator.onLine === false) throw xato("tarmoq");
    const ctl = typeof AbortController === "function" ? new AbortController() : null;
    const t = setTimeout(() => { if (ctl) ctl.abort(); }, KUTISH);
    try {
      const r = await fetch(url, {signal: ctl ? ctl.signal : undefined, credentials: "omit", referrerPolicy: "no-referrer", cache: "no-store"});
      if (!r.ok) throw xato("javob", r.status);
      return await r.json();
    } catch (e) {
      throw e && e.tur ? e : xato("tarmoq");
    } finally { clearTimeout(t); }
  }
  function xatoHTML(e, manba){
    const tarmoq = !e || e.tur === "tarmoq";
    return '<div class="jl-xato" role="status">' + ikon("info") + "<div>" +
      (tarmoq ? "<b>" + OFLAYN + "</b><span>" + OFLAYN_IZOH + "</span>"
        : "<b><span>" + esc(manba) + "</span> <span>javob bermadi</span> " + tj("(" + (e.status ? "HTTP " + e.status : e.message) + ")") + "</b>" +
          "<span>Keyinroq qayta urinib ko'ring. Sahifaning qolgan qismi ishlayveradi.</span>") + "</div></div>";
  }

  /* ---------- Open-Meteo: bir so'rovda bir nechta nuqta, 15 daqiqa kesh ---------- */
  const OM = "https://api.open-meteo.com/v1/forecast";
  async function obHavo(nuqtalar){
    const k = nuqtalar.map(n => SOF.koordinata(n.lat, n.lng));
    const kalit = "mkb4-jonli-om:" + k.map(x => x.join(",")).join(";");
    const kesh = xotira.ol(kalit);
    if (kesh && !SOF.eskirganmi(kesh.vaqt, Date.now())) return kesh.natija;
    const url = OM + "?latitude=" + k.map(x => x[0]).join(",") + "&longitude=" + k.map(x => x[1]).join(",") +
      "&current=temperature_2m,cloud_cover,shortwave_radiation,wind_gusts_10m,precipitation" +
      "&hourly=temperature_2m,precipitation,wind_gusts_10m&forecast_hours=24" +
      "&daily=shortwave_radiation_sum&forecast_days=1&timezone=Asia%2FTashkent";
    const j = await olish(url);
    const royxat = Array.isArray(j) ? j : [j];
    const natija = royxat.map(r => {
      const c = r.current || {}, d = r.daily || {};
      return {vaqt: String(c.time || "").slice(11, 16), harorat: c.temperature_2m, bulut: c.cloud_cover, nur: c.shortwave_radiation,
        zarb: c.wind_gusts_10m, kunlikNur: SOF.mjdanKvt((d.shortwave_radiation_sum || [])[0]), prognoz: SOF.kunlikXulosa(r.hourly)};
    });
    if (natija.length !== nuqtalar.length) throw xato("javob", "?");
    xotira.yoz(kalit, {vaqt: Date.now(), natija});
    return natija;
  }

  /* ---------- NASA POWER: 2001–2020 oylik o'rtacha quyosh nurlanishi (kVt·soat/m² kun), 30 kun kesh ----------
     Qaytaradi: {oylar: [12 son], eng: {oy, qiymat}, hisob: quvvatHisobi(eng past oy)} */
  const NASA = "https://power.larc.nasa.gov/api/temporal/climatology/point";
  const OY = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  async function quyoshIqlimi(lat, lng, profil){
    const k = SOF.koordinata(lat, lng), kalit = "mkb4-jonli-nasa:" + k.join(",");
    let oylar = null;
    const kesh = xotira.ol(kalit);
    if (kesh && !SOF.eskirganmi(kesh.vaqt, Date.now(), 30 * 864e5)) oylar = kesh.oylar;
    if (!oylar){
      const j = await olish(NASA + "?parameters=ALLSKY_SFC_SW_DWN&community=RE&format=JSON&latitude=" + k[0] + "&longitude=" + k[1]);
      const p = ((j.properties || {}).parameter || {}).ALLSKY_SFC_SW_DWN || {};
      oylar = OY.map(m => typeof p[m] === "number" && p[m] >= 0 ? p[m] : null);
      if (oylar.some(v => v == null)) throw xato("javob", "NASA POWER");
      xotira.yoz(kalit, {vaqt: Date.now(), oylar});
    }
    const qiymat = Math.min.apply(null, oylar);
    return {oylar, eng: {oy: oylar.indexOf(qiymat) + 1, qiymat}, hisob: SOF.quvvatHisobi(qiymat, profil),
      manba: "NASA POWER, 2001–2020"};
  }

  const ASOS_MATN = {shamol: ["Shamol zarbi", "km/soat"], yogin: ["Yog'in 24 soatda", "mm"], sovuq: ["Harorat", "°C"]};
  const asosChip = a => '<span class="chip chip-kichik chip-sariq"><span>' + ASOS_MATN[a.kalit][0] + "</span> " + tj(son(a.qiymat, 1) + " " + ASOS_MATN[a.kalit][1]) + "</span>";
  const zaryadChip = h => h.toxtatilgan
    ? '<span class="chip chip-kichik chip-sariq"><span>Zaryad to\'xtatilgan:</span> ' + tj(son(h.harorat, 1) + " °C") + "</span>"
    : '<span class="chip chip-kichik chip-yashil"><span>Zaryad oladi:</span> ' + tj(son(h.harorat, 1) + " °C") + "</span>";

  /* ---------- Qurilma va obyekt sahifasi: obyekt hududidagi ob-havo va quyosh ---------- */
  async function obHavoBlok(el, o){
    uslub();
    if (!el || !o || o.lat == null || o.lng == null) return;
    el.innerHTML = '<div class="skelet-royxat" aria-busy="true" aria-label="Yuklanmoqda"><div class="skelet-qator"><span class="skelet" style="width:60%"></span></div><div class="skelet-qator"><span class="skelet" style="width:40%"></span></div></div>';
    let h;
    try { h = (await obHavo([{lat: o.lat, lng: o.lng}]))[0]; }
    catch (e) { el.innerHTML = xatoHTML(e, "Open-Meteo"); tarjima(el); return; }
    const z = SOF.zaryad(h.harorat);
    const hosil = SOF.quyoshHosili(h.kunlikNur);
    const asoslar = SOF.korikAsoslari(h.prognoz);
    const P = SOF.PROFIL;
    let html = '<div class="jl-kuzatuv">' +
      "<div><small>Havo harorati</small><b data-tarjimasiz>" + son(h.harorat, 1) + " °C</b></div>" +
      "<div><small>Bulut</small><b data-tarjimasiz>" + son(h.bulut) + " %</b></div>" +
      "<div><small>Quyosh hozir</small><b data-tarjimasiz>" + son(h.nur) + " Vt/m²</b></div>" +
      "<div><small>Quyosh bugun</small><b data-tarjimasiz>" + son(h.kunlikNur, 2) + " kVt·soat/m²</b></div></div>";
    if (o.quyoshli){
      html += '<p class="jl-xulosa">' + (z ? zaryadChip(z) : "") +
        (z && z.toxtatilgan ? "<span>Litiy akkumulyator 0 °C dan past zaryad olmaydi: panel ishlasa ham quvvat faqat sarflanadi.</span> " : "") +
        (hosil != null ? "<span>Bugun</span> " + tj(P.panelVt + " Vt") + " <span>panel taxminan</span> " + tj(son(hosil) + " Vt·soat") +
          " <span>beradi, kamera sutkasiga</span> " + tj(P.ehtiyojVtSoat + " Vt·soat") + " <span>sarflaydi.</span>" : "") + "</p>";
    }
    if (o.korik && h.prognoz){
      const p = h.prognoz;
      html += '<p class="jl-xulosa"><span>Keyingi 24 soat:</span> <span>shamol zarbi</span> ' + tj(son(p.shamolMaks) + " km/soat") +
        ", <span>yog'in</span> " + tj(son(p.yoginJami, 1) + " mm") + ", <span>eng past harorat</span> " + tj(son(p.haroratMin) + " °C") + ".</p>";
      if (asoslar.length) html += '<p class="jl-xulosa">' + asoslar.map(asosChip).join("") +
        "<span>Prognoz navbatdan tashqari ko'rik chegarasidan o'tdi. Qarorni inspektor qabul qiladi.</span>" +
        (o.obyektId ? ' <a href="korik-tayinlash.html?obyekt=' + encodeURIComponent(o.obyektId) + '" data-huquq="nazorat:yoz">Ko\'rik tayinlash</a>' : "") + "</p>";
    }
    html += '<p class="jl-manba"><span>Manba:</span> <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer">' + OM_MANBA + "</a> · " +
      "<span>hudud bo'yicha, 0,1° aniqlikda</span> · <span>ma'lumot vaqti</span> " + tj(h.vaqt || "—") +
      (o.quyoshli ? " · <span>hisob:</span> " + tj(P.panelVt + " Vt") + " <span>panel, yo'qotish</span> " + tj("30 %") : "") + "</p>";
    el.innerHTML = html;
    tarjima(el);
    /* Quyoshli qurilma: shu hududning eng qorong'i oyi bo'yicha kerakli panel va akkumulyator (NASA POWER, 20 yillik o'rtacha).
       Javob kelmasa bugungi blok to'liq qoladi, faqat shu qator o'rniga holat yoziladi. */
    if (o.quyoshli){
      const q = document.createElement("p");
      q.className = "jl-xulosa";
      try {
        const n = await quyoshIqlimi(o.lat, o.lng);
        if (!n.hisob) return;
        q.innerHTML = "<span>Shu hududda quyosh eng kam oy:</span> <span>" + OY_NOM[n.eng.oy - 1] + "</span>, " + tj(son(n.eng.qiymat, 2) + " kVt·soat/m²") +
          ". <span>Kamera yil bo'yi ishlashi uchun panel</span> " + tj(n.hisob.panelVt + " Vt") + ", <span>akkumulyator</span> " +
          tj(n.hisob.akkumulyatorVtSoat + " Vt·soat") + '. <span>Manba:</span> <a href="https://power.larc.nasa.gov/" target="_blank" rel="noopener noreferrer">' +
          tj(n.manba) + "</a>";
      } catch (_) {
        q.className = "jl-manba";
        q.innerHTML = "<span>NASA POWER javob bermadi: hudud bo'yicha panel hisobi ko'rsatilmadi.</span>";
      }
      if (!el.isConnected) return;
      el.insertBefore(q, el.querySelector(".jl-manba"));
      tarjima(q);
    }
  }
  const OY_NOM = ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr"];

  /* ---------- MQTT kanali: bitta sahifada bitta ulanish ---------- */
  const BROKERLAR = [
    {nom: "test.mosquitto.org", url: "wss://test.mosquitto.org:8081", havola: "https://test.mosquitto.org/"},
    {nom: "broker.emqx.io", url: "wss://broker.emqx.io:8084/mqtt", havola: "https://www.emqx.com/en/mqtt/public-mqtt5-broker"},
  ];
  function tasodifHex(n){
    const b = new Uint8Array(n);
    if (G.crypto && G.crypto.getRandomValues) G.crypto.getRandomValues(b); else for (let i = 0; i < n; i++) b[i] = Math.floor(Math.random() * 256);
    return Array.from(b, x => x.toString(16).padStart(2, "0")).join("");
  }
  /* Mavzu shu brauzerga tegishli: monitoring markazi va qurilmalar sahifasi bir xil mavzuni ishlatadi, 12 soatda yangilanadi */
  function joriyMavzu(){
    const k = "mkb4-jonli-mavzu", v = xotira.ol(k);
    if (v && v.hex && Date.now() - v.vaqt < 12 * 3600e3) return {mavzu: SOF.mavzu(v.hex), qurilmaId: "SINOV-" + v.hex.slice(0, 4).toUpperCase()};
    const hex = tasodifHex(12);
    xotira.yoz(k, {hex, vaqt: Date.now()});
    return {mavzu: SOF.mavzu(hex), qurilmaId: "SINOV-" + hex.slice(0, 4).toUpperCase()};
  }
  const kanal = (function(){
    let ws = null, broker = null, holat = "yopiq", ping = null;
    const tinglovchi = new Set();
    const xabarla = (tur, x) => tinglovchi.forEach(f => { try { f(tur, x); } catch (_) {} });
    function urin(b, M, muddat){
      return new Promise((ok, rad) => {
        let tayyor = false, w, bufer = new Uint8Array(0);
        try { w = new WebSocket(b.url, ["mqtt"]); } catch (_) { rad(xato("tarmoq")); return; }
        w.binaryType = "arraybuffer";
        const t = setTimeout(() => { try { w.close(); } catch (_) {} rad(xato("tarmoq")); }, muddat);
        w.onopen = () => w.send(SOF.mqtt.ulanish("mkb-" + tasodifHex(6), 60));
        w.onmessage = e => {
          const kel = new Uint8Array(e.data), bir = new Uint8Array(bufer.length + kel.length);
          bir.set(bufer); bir.set(kel, bufer.length);
          const r = SOF.mqtt.ajrat(bir);
          bufer = r.qoldiq;
          r.paketlar.forEach(p => {
            if (p.tur === "connack"){ if (p.kod === 0) w.send(SOF.mqtt.obuna(1, M.mavzu)); else { clearTimeout(t); try { w.close(); } catch (_) {} rad(xato("javob", "CONNACK " + p.kod)); } }
            else if (p.tur === "suback" && !tayyor){ tayyor = true; clearTimeout(t); ok(w); }
            else if (p.tur === "publish" && ws === w && p.mavzu === M.mavzu && p.matn.length <= 2048){
              let o = null;
              try { o = JSON.parse(p.matn); } catch (_) {}
              /* Ommaviy brokerdan kelgan har qanday xabar begona hisoblanadi: sxemaga mos kelmasa tashlab yuboriladi */
              if (SOF.voqeaTekshir(o)) xabarla("xabar", {voqea: o, kechikish: Math.max(0, Date.now() - o.yuborildi), keldi: Date.now()});
            }
          });
        };
        w.onclose = () => {
          clearTimeout(t);
          if (!tayyor){ rad(xato("tarmoq")); return; }
          if (ws === w){ ws = null; holat = "uzildi"; clearInterval(ping); xabarla("holat", holat); }
        };
      });
    }
    async function ulan(){
      if (holat === "ulangan") return broker;
      if (holat === "ulanmoqda") return new Promise((ok, rad) => { const f = (tur, h) => { if (tur !== "holat") return; tinglovchi.delete(f); h === "ulangan" ? ok(broker) : rad(xato("tarmoq")); }; tinglovchi.add(f); });
      if (navigator.onLine === false) throw xato("tarmoq");
      holat = "ulanmoqda"; xabarla("holat", holat);
      const M = joriyMavzu();
      /* Asosiy broker 3 soniyada javob bermasa zaxirasi parallel ishga tushadi. Umumiy muddat 8 soniya:
         bank tarmog'i yopiq bo'lsa ham xabar shu vaqtda chiqadi */
      const bosh = Date.now();
      try {
        const g = await new Promise((ok, rad) => {
          let qoldi = BROKERLAR.length, tugadi = false, oxirgi = null;
          BROKERLAR.forEach((b, i) => setTimeout(() => {
            if (tugadi){ qoldi--; return; }
            urin(b, M, Math.max(1000, KUTISH - (Date.now() - bosh))).then(w => {
              if (tugadi){ try { w.close(); } catch (_) {} return; }
              tugadi = true; ok({w, b});
            }, e => { oxirgi = e; if (--qoldi === 0 && !tugadi){ tugadi = true; rad(oxirgi); } });
          }, i * 3000));
        });
        ws = g.w; broker = g.b; holat = "ulangan";
        ping = setInterval(() => { try { if (ws) ws.send(SOF.mqtt.ping()); } catch (_) {} }, 50e3);
        xabarla("holat", holat);
        return broker;
      } catch (e) {
        holat = "yopiq"; xabarla("holat", holat);
        throw e && e.tur ? e : xato("tarmoq");
      }
    }
    function nashr(o){
      if (!ws || holat !== "ulangan") throw xato("tarmoq");
      const M = joriyMavzu();
      const v = SOF.voqea(Object.assign({qurilmaId: M.qurilmaId, hozir: Date.now()}, o));
      ws.send(SOF.mqtt.nashr(M.mavzu, JSON.stringify(v)));
      return v;
    }
    function uz(){
      if (ws){ try { ws.send(SOF.mqtt.uzish()); ws.close(); } catch (_) {} }
      ws = null; holat = "yopiq"; clearInterval(ping); xabarla("holat", holat);
    }
    addEventListener("pagehide", () => { if (ws) uz(); });
    return {ulan, nashr, uz, holat: () => holat, broker: () => broker, tingla: f => { tinglovchi.add(f); return () => tinglovchi.delete(f); }};
  })();

  const SINOV_VOQEALAR = {
    eshik: {tur: "eshik-datchigi", hodisa: "Eshik ochildi", jiddiylik: "o'rta"},
    batareya: {tur: "eshik-datchigi", hodisa: "Batareya 18 %", jiddiylik: "past", batareya: 18},
  };
  const vaqtMatn = ms => { const d = new Date(ms); return [d.getHours(), d.getMinutes(), d.getSeconds()].map(x => String(x).padStart(2, "0")).join(":"); };
  function xabarQatori(x){
    const v = x.voqea;
    return '<div class="qator"><span class="belgi ' + (v.jiddiylik === "o'rta" ? "sariq" : "lavanda") + '">' + ikon(v.batareya != null ? "batareya" : "eshik") + "</span>" +
      '<span class="matn"><b>' + esc(v.hodisa) + "</b><span>" + tj(v.qurilmaId) + " · <span>Ommaviy sinov kanali</span></span></span>" +
      '<span class="ong"><span class="chip chip-kichik chip-oq">' + tj(son(x.kechikish) + " ms") + '</span><span class="vaqt" data-tarjimasiz>' + vaqtMatn(x.keldi) + "</span></span></div>";
  }
  function kanalMatni(){
    const M = joriyMavzu(), b = kanal.broker() || BROKERLAR[0];
    return "<span>Mavzu:</span> <span class=\"jl-kod\" data-tarjimasiz>" + esc(M.mavzu) + "</span>" +
      (kanal.holat() === "ulangan" ? " · <span>ulangan broker:</span> " + tj(b.nom) : "");
  }

  /* ---------- Qurilmalar ro'yxati: sinov qurilmasi ---------- */
  function sinovQurilma(el){
    uslub();
    if (!el) return;
    let ochiq = false, oxirgi = null, kutilmoqda = {};
    el.innerHTML =
      '<div class="karta-bosh"><h2 id="jl-sq-s" data-ikonka="signal">Sinov qurilmasi</h2><span class="chip chip-kichik chip-sariq">' + ikon("info") + "<span>Ommaviy namuna, bank obyekti emas</span></span>" +
        '<button type="button" class="tugma tugma-oq tugma-kichik" data-jl-och aria-expanded="false" aria-controls="jl-sq-tana" style="margin-left:auto">' + ikon("past") + "<span>Ko'rsatish</span></button></div>" +
      '<p class="jl-izoh" data-jl-yopiq>Virtual eshik datchigi ommaviy MQTT sinov kanaliga xabar yuboradi va uni qaytarib oladi. Haqiqiy qurilma shlyuz orqali platformaga xuddi shu yo\'l bilan xabar beradi.</p>' +
      '<div id="jl-sq-tana" hidden>' +
        '<p class="jl-izoh">Xabar platformaning hodisa sxemasida: qurilma ID, tur, hodisa, jiddiylik, batareya va yuborilgan vaqt. Obyekt maydoni bo\'sh: ommaviy brokerni istalgan kishi o\'qiy oladi, shuning uchun bank ma\'lumoti yuborilmaydi.</p>' +
        '<p class="jl-manba" data-jl-kanal></p>' +
        '<div class="jl-amallar"><button type="button" class="tugma tugma-asosiy tugma-kichik" data-jl-yubor="eshik">' + ikon("eshik") + "<span>Eshik ochildi xabarini yuborish</span></button>" +
          '<button type="button" class="tugma tugma-oq tugma-kichik" data-jl-yubor="batareya">' + ikon("batareya") + "<span>Batareya past xabarini yuborish</span></button></div>" +
        '<div data-jl-natija aria-live="polite"></div>' +
        '<p class="jl-manba"><span>Qabul qiluvchi tomonni ko\'rish uchun Monitoring markazini yangi oynada oching, «Ulanish namunasi» kartasida «Kanalga ulanish» ni bosing va xabarni shu yerdan yuboring: u ikkala oynada bir xil kechikish bilan chiqadi.</span> <a href="himoya.html#jl-namuna" target="_blank" rel="noopener">Monitoring markazi</a></p>' +
      "</div>";
    const $ = s => el.querySelector(s);
    const natija = $("[data-jl-natija]");
    const kanalYoz = () => { $("[data-jl-kanal]").innerHTML = kanalMatni(); tarjima($("[data-jl-kanal]")); };
    kanal.tingla((tur, x) => {
      if (tur !== "xabar" || !kutilmoqda[x.voqea.yuborildi]) return;
      delete kutilmoqda[x.voqea.yuborildi];
      oxirgi = x;
      natija.innerHTML = xabarQatori(x) + '<p class="jl-manba"><span>Yuborildi</span> ' + tj(vaqtMatn(x.voqea.yuborildi)) + ", <span>brokerdan qaytdi</span> " + tj(son(x.kechikish) + " ms") + " <span>dan keyin.</span></p>";
      tarjima(natija);
    });
    $("[data-jl-och]").addEventListener("click", e => {
      ochiq = !ochiq;
      const t = e.currentTarget;
      t.setAttribute("aria-expanded", String(ochiq));
      t.innerHTML = ikon(ochiq ? "yuqori" : "past") + "<span>" + (ochiq ? "Yashirish" : "Ko'rsatish") + "</span>";
      $("#jl-sq-tana").hidden = !ochiq; $("[data-jl-yopiq]").hidden = ochiq;
      if (ochiq) kanalYoz();
      tarjima(el);
    });
    el.querySelectorAll("[data-jl-yubor]").forEach(b => b.addEventListener("click", async () => {
      const ish = async () => {
        await kanal.ulan();
        kanalYoz();
        const v = kanal.nashr(SINOV_VOQEALAR[b.dataset.jlYubor]);
        kutilmoqda[v.yuborildi] = true;
        /* Xabar 8 soniyada qaytmasa foydalanuvchi bo'sh blok qarshisida qolmaydi */
        setTimeout(() => {
          if (!kutilmoqda[v.yuborildi]) return;
          delete kutilmoqda[v.yuborildi];
          natija.innerHTML = '<div class="jl-xato" role="status">' + ikon("info") + "<div><b>Xabar brokerdan 8 soniyada qaytmadi</b>" +
            "<span>Ommaviy broker xabarni yo'qotgan yoki tarmoq sekin. Qayta yuboring.</span></div></div>";
          tarjima(natija);
        }, KUTISH);
        await new Promise(r => setTimeout(r, 50));
      };
      try { await (MKB.band ? MKB.band(b, ish) : ish()); }
      catch (e) { natija.innerHTML = xatoHTML(e, "MQTT"); tarjima(natija); }
    }));
    tarjima(el);
    if (location.hash === "#jl-sinov"){ $("[data-jl-och]").click(); el.scrollIntoView(); }
  }

  /* ---------- Monitoring markazi: yig'ilgan «Ulanish namunasi» kartasi ---------- */
  async function kameralarRoyxati(){
    const V = G.MKB_VERSIYA ? "?v=" + G.MKB_VERSIYA : "";
    const r = await fetch("assets/jonli/kameralar.json" + V, {cache: "no-cache"});
    if (!r.ok) throw xato("javob", r.status);
    return r.json();
  }
  /* Kamera embed havolasi faqat ro'yxatdagi ikki ko'rinishdan yasaladi: begona manzil qo'yib bo'lmaydi */
  function embedManzil(k){
    if (k.tur === "youtube" && /^[A-Za-z0-9_-]{11}$/.test(k.videoId || "")) return "https://www.youtube-nocookie.com/embed/" + k.videoId + "?autoplay=1&mute=1&rel=0&modestbranding=1";
    if (k.tur === "youtube-kanal" && /^UC[A-Za-z0-9_-]{22}$/.test(k.kanalId || "")) return "https://www.youtube-nocookie.com/embed/live_stream?channel=" + k.kanalId + "&autoplay=1&mute=1";
    if (k.tur === "rasm") return rasmManzil(k);
    return null;
  }
  /* Davlat idorasi e'lon qiladigan kamera kadri (JPEG, bir necha daqiqada yangilanadi).
     Faqat shu xostlardan: kadr jamoat mulki, CORS ochiq, shuning uchun kadr olingan vaqtni o'qish mumkin */
  const RASM_XOSTLAR = ["https://volcanoes.usgs.gov/"];
  function rasmManzil(k){
    const u = String(k.rasm || "");
    return RASM_XOSTLAR.some(x => u.indexOf(x) === 0) && /\.jpe?g$/i.test(u) && !/[?#"'<>\s]/.test(u) ? u : null;
  }
  /* Kadr qachon olingan: Last-Modified sarlavhasidan. O'qib bo'lmasa null */
  async function kadrVaqti(u){
    const ctl = typeof AbortController === "function" ? new AbortController() : null;
    const t = setTimeout(() => { if (ctl) ctl.abort(); }, KUTISH);
    try {
      const r = await fetch(u, {method: "HEAD", signal: ctl ? ctl.signal : undefined, credentials: "omit", referrerPolicy: "no-referrer", cache: "no-store"});
      const lm = r.ok ? r.headers.get("last-modified") : null;
      const d = lm ? new Date(lm) : null;
      return d && !isNaN(d) ? d : null;
    } catch (_) { return null; } finally { clearTimeout(t); }
  }

  function hududlar(){
    const D = G.MKB_DATA || {}, H = D.HUDUD_KODLAR || {};
    const doira = MKB.doira ? MKB.doira : x => x;
    const obyekt = {};
    doira(D.YOZUVLAR || []).forEach(y => { obyekt[y.id] = y.hududKod || (D.hududKodi ? D.hududKodi(y.hudud) : null); });
    const soni = {};
    doira(D.QURILMALAR || []).filter(q => q.quvvat === "quyosh+akkumulyator").forEach(q => { const k = obyekt[q.obyektId]; if (k) soni[k] = (soni[k] || 0) + 1; });
    return Object.keys(H).map(k => ({kod: k, nom: H[k].nom, lat: H[k].lat, lng: H[k].lng, quyosh: soni[k] || 0}));
  }

  function namunaKarta(el){
    uslub();
    if (!el) return;
    const K = "mkb4-jonli-karta";
    let ochiq = !!xotira.ol(K) || location.hash === "#jl-namuna";
    el.innerHTML =
      '<div class="karta-bosh"><h2 id="jl-s" data-ikonka="signal">Ulanish namunasi: ochiq manbalar</h2><span class="chip chip-kichik chip-sariq">' + ikon("info") + "<span>Ommaviy namuna, bank obyekti emas</span></span>" +
        '<button type="button" class="tugma tugma-oq tugma-kichik" data-jl-och aria-controls="jl-tana" style="margin-left:auto"></button></div>' +
      '<p class="jl-izoh">Platformaga tashqi ma\'lumot qanday kelishini ochiq manbalarda ko\'rsatadi: hududlardagi ob-havo va quyosh, qurilma xabari va shahar kamerasi. Har blok tugma bosilgandagina internetga chiqadi.</p>' +
      '<div id="jl-tana">' +
        '<section class="jl-blok" aria-labelledby="jl-om-s"><div class="jl-blok-bosh"><h3 id="jl-om-s">' + ikon("quyosh") + "<span>Ob-havo va quyosh: 14 hudud markazi</span></h3>" +
          '<button type="button" class="tugma tugma-oq tugma-kichik" data-jl-om>' + ikon("yuklab") + "<span>Ma'lumotni olish</span></button></div>" +
          '<p class="jl-izoh"><span>Quyoshli qurilmalar uchun ikki raqam muhim: harorat 0 °C dan pastmi (litiy akkumulyator zaryad olmaydi) va bugun panelga qancha quyosh tushadi.</span> ' +
          '<span>Shamol zarbi</span> ' + tj("72 km/soat") + '<span>, yog\'in 24 soatda</span> ' + tj("20 mm") + ' <span>yoki harorat</span> ' + tj("−10 °C") + ' <span>chegarasidan o\'tsa, qatorda navbatdan tashqari ko\'rik asosi ko\'rinadi.</span></p>' +
          '<div data-jl-om-natija aria-live="polite"></div>' +
          '<p class="jl-manba"><span>Manba:</span> <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer">' + OM_MANBA + "</a>. " +
          "<span>Bepul API tijoriy bo'lmagan foydalanish uchun, kuniga 10 000 so'rovgacha. Bank ishida pullik kalit yoki o'z serveri kerak. Javob 15 daqiqa keshda turadi.</span></p></section>" +
        '<section class="jl-blok" aria-labelledby="jl-mq-s"><div class="jl-blok-bosh"><h3 id="jl-mq-s">' + ikon("signal") + "<span>Qurilma xabari: MQTT sinov kanali</span></h3>" +
          '<button type="button" class="tugma tugma-oq tugma-kichik" data-jl-mq-ulan>' + ikon("signal") + "<span>Kanalga ulanish</span></button></div>" +
          '<p class="jl-izoh">Brauzer ommaviy sinov brokeriga shifrlangan WebSocket orqali ulanadi, xabar yuboradi va shu mavzudan qaytarib oladi. Kechikish shu yo\'lning to\'liq vaqti. Brokerni istalgan kishi o\'qiy oladi, shuning uchun xabarda bank ma\'lumoti yo\'q.</p>' +
          '<p class="jl-manba" data-jl-kanal></p>' +
          '<div class="jl-amallar" data-jl-mq-amal hidden><button type="button" class="tugma tugma-asosiy tugma-kichik" data-jl-mq-yubor>' + ikon("eshik") + "<span>Sinov signalini yuborish</span></button>" +
            '<button type="button" class="tugma tugma-oq tugma-kichik" data-jl-mq-uz>' + ikon("yopish") + "<span>Kanalni uzish</span></button>" +
            "</div>" +
          '<div data-jl-mq-natija aria-live="polite"></div>' +
          '<p class="jl-manba"><span>Broker:</span> <a href="https://test.mosquitto.org/" target="_blank" rel="noopener noreferrer">test.mosquitto.org</a> ' +
          "<span>(Eclipse Mosquitto loyihasi), faqat sinov uchun, kafolatsiz. Ulanmasa zaxira:</span> " +
          '<a href="https://www.emqx.com/en/mqtt/public-mqtt5-broker" target="_blank" rel="noopener noreferrer">broker.emqx.io</a>. ' +
          "<span>Bankda o'z brokeri TLS va har qurilmaga alohida login bilan ishlaydi.</span></p></section>" +
        '<section class="jl-blok" aria-labelledby="jl-kam-s"><div class="jl-blok-bosh"><h3 id="jl-kam-s">' + ikon("kamera") + "<span>Kamera kadri: davlat idorasining ochiq kamerasi</span></h3>" +
          '<button type="button" class="tugma tugma-oq tugma-kichik" data-jl-kam>' + ikon("korish") + "<span>Kadrlarni ko'rsatish</span></button></div>" +
          '<p class="jl-izoh">4G kamera obyektdan hodisa paytida kadr yuboradi. Bu yerda xuddi shunday kadrni egasi hammaga e\'lon qilgan kameradan olamiz va qachon olinganini ko\'rsatamiz. Himoyasiz qolgan yoki qidiruvda topilgan kameralarga ulanish ruxsatsiz kirish hisoblanadi, ular ishlatilmaydi.</p>' +
          '<div data-jl-kam-natija aria-live="polite"></div></section>' +
      "</div>";
    const $ = s => el.querySelector(s);
    const ochT = $("[data-jl-och]"), tana = $("#jl-tana");
    const ochChiz = () => {
      ochT.setAttribute("aria-expanded", String(ochiq));
      ochT.innerHTML = ikon(ochiq ? "yuqori" : "past") + "<span>" + (ochiq ? "Yashirish" : "Ko'rsatish") + "</span>";
      tana.hidden = !ochiq;
      tarjima(ochT);
    };
    ochT.addEventListener("click", () => { ochiq = !ochiq; xotira.yoz(K, ochiq ? 1 : 0); ochChiz(); });
    ochChiz();

    /* 1. Ob-havo */
    const omJoy = $("[data-jl-om-natija]");
    $("[data-jl-om]").addEventListener("click", async e => {
      const b = e.currentTarget;
      const ish = async () => {
        const H = hududlar();
        let r;
        try { r = await obHavo(H); }
        catch (x) { omJoy.innerHTML = xatoHTML(x, "Open-Meteo"); tarjima(omJoy); return; }
        const toxtagan = H.reduce((s, h, i) => s + (r[i].harorat < 0 ? h.quyosh : 0), 0);
        const jamiQ = H.reduce((s, h) => s + h.quyosh, 0);
        omJoy.classList.add("jl-qatorlar");
        omJoy.innerHTML = '<p class="jl-xulosa"><span>Quyoshli qurilmalar:</span> ' + tj(jamiQ) + ". <span>Zaryadi hozir to'xtagani:</span> " + tj(toxtagan) +
          ". <span>Ma'lumot vaqti</span> " + tj(r[0].vaqt || "—") + ".</p>" +
          H.map((h, i) => {
            const x = r[i], z = SOF.zaryad(x.harorat), a = SOF.korikAsoslari(x.prognoz), hosil = SOF.quyoshHosili(x.kunlikNur);
            return '<div class="qator"><span class="belgi ' + (z && z.toxtatilgan ? "sariq" : x.nur > 0 ? "mint" : "") + '">' + ikon("quyosh") + "</span>" +
              '<span class="matn"><b><span>' + esc(h.nom) + "</span> · " + tj(son(x.harorat, 1) + " °C") + "</b>" +
              "<span><span>bulut</span> " + tj(son(x.bulut) + " %") + " · <span>quyosh</span> " + tj(son(x.nur) + " Vt/m²") +
              " · <span>bugun</span> " + tj(son(x.kunlikNur, 1) + " kVt·soat/m²") + (hosil != null ? " · " + tj(SOF.PROFIL.panelVt + " Vt") + " <span>panel</span> " + tj(son(hosil) + " Vt·soat") : "") +
              " · <span>shamol zarbi</span> " + tj(son(x.zarb) + " km/soat") + "</span></span>" +
              '<span class="ong">' + (h.quyosh ? '<span class="chip chip-kichik chip-oq"><span><b data-tarjimasiz>' + h.quyosh + "</b> <span>ta quyoshli qurilma, reyestrdan</span></span></span>" : "") +
              (h.quyosh && z ? zaryadChip(z) : "") + a.map(asosChip).join("") + "</span></div>";
          }).join("") +
          '<p class="jl-manba"><span>Quyosh hisobi:</span> ' + tj(SOF.PROFIL.panelVt + " Vt") + " <span>panel, yo'qotish</span> " + tj("30 %") +
          ", <span>kamera sutkasiga</span> " + tj(SOF.PROFIL.ehtiyojVtSoat + " Vt·soat") + " <span>sarflaydi. Harorat havo bo'yicha: akkumulyator qutisidagi haroratni qurilmaning o'z datchigi beradi.</span></p>" +
          '<p class="jl-manba"><span>Ob-havo: Open-Meteo.</span> <span>' + ((G.MKB_DATA || {}).MANBA === "mahalliy" ? "Qurilmalar soni: bank reyestri" : "Qurilmalar soni: bank reyestri (namoyish)") + "</span></p>";
        tarjima(omJoy);
      };
      try { await (MKB.band ? MKB.band(b, ish) : ish()); } catch (_) {}
    });

    /* 2. MQTT */
    const mqJoy = $("[data-jl-mq-natija]"), amal = $("[data-jl-mq-amal]"), ulanT = $("[data-jl-mq-ulan]");
    const kelgan = [];
    let jamiKeldi = 0;
    const kanalYoz = () => { $("[data-jl-kanal]").innerHTML = kanalMatni(); tarjima($("[data-jl-kanal]")); };
    /* Natija bloki kanal holatiga har o'zgarishda qayta chiziladi: uzilgandan keyin ham "Kanal ochiq" qolib ketmaydi.
       Kanal hali bir marta ham ochilmagan bo'lsa, boshlang'ich izoh o'z joyida turadi */
    let ochilgan = false;
    const mqChiz = () => {
      const h = kanal.holat();
      amal.hidden = h !== "ulangan"; ulanT.hidden = h === "ulangan";
      if (h === "ulangan") ochilgan = true;
      kanalYoz();
      if (h === "ulanmoqda" || (!ochilgan && !kelgan.length)) return;
      mqJoy.innerHTML = (h === "ulangan" && kelgan.length ? '<p class="jl-xulosa"><span class="chip chip-kichik chip-yashil">Kanal ochiq</span><span>Xabar olindi:</span> ' + tj(jamiKeldi) + " <span>ta, oxirgi kechikish</span> " + tj(son(kelgan[0].kechikish) + " ms") + "</p>"
        : h === "ulangan" ? '<p class="jl-xulosa"><span class="chip chip-kichik chip-yashil">Kanal ochiq</span><span>Xabar kutilmoqda. Sinov signalini yuboring.</span></p>'
        : h === "uzildi" ? '<p class="jl-xulosa"><span class="chip chip-kichik chip-sariq">Kanal uzildi</span><span>Broker ulanishni uzdi. Qayta ulaning.</span></p>'
        : '<p class="jl-xulosa"><span class="chip chip-kichik chip-kul">Kanal yopiq</span></p>') + kelgan.slice(0, 8).map(xabarQatori).join("");
      tarjima(mqJoy);
    };
    kanal.tingla((tur, x) => { if (tur === "xabar"){ jamiKeldi++; kelgan.unshift(x); kelgan.length = Math.min(kelgan.length, 20); } mqChiz(); });
    ulanT.addEventListener("click", async () => {
      const ish = async () => { await kanal.ulan(); kanalYoz(); };
      try { await (MKB.band ? MKB.band(ulanT, ish) : ish()); mqChiz(); const y = $("[data-jl-mq-yubor]"); if (y) y.focus(); }
      catch (e) { mqJoy.innerHTML = xatoHTML(e, "MQTT"); tarjima(mqJoy); }
    });
    $("[data-jl-mq-yubor]").addEventListener("click", () => {
      try { kanal.nashr(SINOV_VOQEALAR.eshik); } catch (x) { mqJoy.innerHTML = xatoHTML(x, "MQTT"); tarjima(mqJoy); }
    });
    $("[data-jl-mq-uz]").addEventListener("click", () => { kanal.uz(); mqChiz(); ulanT.focus(); });
    kanalYoz();

    /* 3. Shahar kamerasi */
    const kamJoy = $("[data-jl-kam-natija]");
    $("[data-jl-kam]").addEventListener("click", async e => {
      const b = e.currentTarget;
      const ish = async () => {
        let R;
        try { R = await kameralarRoyxati(); }
        catch (x) { kamJoy.innerHTML = xatoHTML(x, "ruxsatli kameralar ro'yxati"); tarjima(kamJoy); return; }
        const kam = (R.kameralar || []).filter(k => embedManzil(k));
        /* Tekshirilgan va rad etilgan manbalar ro'yxati faqat assets/jonli/MANBA.md da */
        if (!kam.length){ kamJoy.innerHTML = '<p class="jl-manba">Mos oqim topilmasa blok bo\'sh qoladi.</p>'; tarjima(kamJoy); return; }
        const belgi = k => '<span class="chip chip-kichik chip-sariq jl-kadr-belgi"><span>Ommaviy namuna:</span> <span>' + esc(k.egasi) + "</span> <span>kamerasi, bank obyekti emas</span></span>";
        kamJoy.innerHTML = '<div class="jl-kam-tor">' + kam.map((k, i) => '<figure style="margin:0">' +
            (k.tur === "rasm"
              ? '<div class="jl-kadr"><img alt="' + esc(k.nom) + '" data-jl-rasm="' + i + '" referrerpolicy="no-referrer" decoding="async">' + belgi(k) + "</div>"
              : '<div class="jl-kadr" data-jl-kadr-joy="' + i + '">' + belgi(k) + "</div>") +
            '<figcaption class="jl-kam-matn"><b>' + esc(k.nom) + "</b>" +
              (k.izoh ? "<span>" + esc(k.izoh) + "</span>" : "") +
              '<span data-jl-vaqt="' + i + '" aria-live="polite"></span>' +
              (k.tur === "rasm" ? "" : '<span><button type="button" class="tugma tugma-oq tugma-kichik" data-jl-kadr="' + i + '">' + ikon("korish") + "<span>Oqimni ochish</span></button></span>") +
              '<span><span>Manba:</span> <a href="' + esc(k.havola) + '" target="_blank" rel="noopener noreferrer">' + esc(k.egasi) + "</a> · <span>" + esc(k.shartlar) + "</span> · <span>tekshirildi</span> " + tj(k.tekshirildi || "—") + "</span>" +
            "</figcaption></figure>").join("") + "</div>";
        kamJoy.querySelectorAll("[data-jl-kadr]").forEach(t => t.addEventListener("click", () => kadrOch(kam[+t.dataset.jlKadr], kamJoy.querySelector('[data-jl-kadr-joy="' + t.dataset.jlKadr + '"]'), t)));
        kamJoy.querySelectorAll("[data-jl-rasm]").forEach(img => rasmKuzat(kam[+img.dataset.jlRasm], img, kamJoy.querySelector('[data-jl-vaqt="' + img.dataset.jlRasm + '"]')));
        tarjima(kamJoy);
      };
      try { await (MKB.band ? MKB.band(b, ish) : ish()); } catch (_) {}
    });
    /* Kadr har 60 soniyada qayta so'raladi, faqat blok ekranda va sahifa ochiq turganda.
       Vaqt satri kadr olingan paytni (Last-Modified) ko'rsatadi: kadr eskirgan bo'lsa buni yashirmaydi */
    function rasmKuzat(k, img, vaqtJoy){
      const u = rasmManzil(k);
      if (!u) return;
      let oxirgi = 0;
      const yangila = async () => {
        if (!img.isConnected) { clearInterval(tm); return; }
        if (document.hidden || tana.hidden) return;
        if (navigator.onLine === false){ vaqtJoy.innerHTML = "<span>" + OFLAYN + "</span>"; tarjima(vaqtJoy); return; }
        oxirgi = Date.now();
        img.onerror = () => { vaqtJoy.innerHTML = "<span>" + OFLAYN + "</span>"; tarjima(vaqtJoy); };
        img.src = u + "?t=" + Math.floor(oxirgi / 60000);
        const d = await kadrVaqti(u);
        if (!d){ vaqtJoy.innerHTML = "<span>Kadr vaqtini o'qib bo'lmadi</span>"; tarjima(vaqtJoy); return; }
        const daq = Math.max(0, Math.round((Date.now() - d.getTime()) / 60000));
        const ikki = n => String(n).padStart(2, "0");
        vaqtJoy.innerHTML = "<span>Kadr olingan:</span> " + tj(ikki(d.getHours()) + ":" + ikki(d.getMinutes())) + " · " +
          (daq < 1 ? "<span>hozirgina</span>" : tj(daq) + " <span>daqiqa oldin</span>") + (daq > 30 ? ' <span class="chip chip-kichik chip-sariq">Kadr eskirgan</span>' : "");
        tarjima(vaqtJoy);
      };
      const tm = setInterval(yangila, 60000);
      yangila();
    }
    async function kadrOch(k, joy, t){
      if (!k || !joy) return;
      if (navigator.onLine === false){ joy.innerHTML = xatoHTML(null); tarjima(joy); return; }
      const src = embedManzil(k);
      /* Belgi kadr ustida qoladi: oqim bank obyekti emasligi ko'rinib turadi */
      const b = joy.querySelector(".jl-kadr-belgi");
      joy.innerHTML = '<iframe title="' + esc(k.nom) + '" src="' + esc(src) + '" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen referrerpolicy="strict-origin-when-cross-origin" loading="lazy"></iframe>';
      if (b) joy.appendChild(b);
      const f = joy.querySelector("iframe");
      const tm = setTimeout(() => { joy.innerHTML = xatoHTML(null); tarjima(joy); }, KUTISH);
      f.addEventListener("load", () => clearTimeout(tm), {once: true});
      if (t) t.hidden = true;
      tarjima(joy);
    }
    tarjima(el);
    if (location.hash === "#jl-namuna") setTimeout(() => el.scrollIntoView(), 0);
  }

  MKB.jonli = {obHavo, obHavoBlok, quyoshIqlimi, namunaKarta, sinovQurilma, kanal, xatoHTML, SOF, OFLAYN};
})();
