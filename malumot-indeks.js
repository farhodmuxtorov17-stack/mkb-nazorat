/* ============================================================
   malumot-indeks.js — nazorat indeksi, portfel kesimlari va qoidalar
   Barcha ma'lumot fayllaridan KEYIN ulanadi.

   Nazorat indeksi (0–100) aktiv bank nazoratida qanchalik tartibda
   turganini ko'rsatadi. U beshta tekshiruvdan yig'iladi, saqlanmaydi,
   har safar joriy ma'lumotdan hisoblanadi. Mahalliy rejimda kiritilmagan
   ma'lumot "kiritilmagan" deb ko'rsatiladi va ball bermaydi.
   ============================================================ */
(function () {
  const D = window.MKB_DATA;
  if (!D || D.__nazoratIndeksi) return;
  D.__nazoratIndeksi = true;

  const {sanaOqi, sanaYoz, kunFarqi, kunQosh, oyQosh, yaxlit} = D;
  const BUGUN = D.BUGUN;
  const mahalliy = D.MANBA === "mahalliy";

  function korikDavri(y) { return D.binolimi(y) ? D.param("korikDavriBino") : D.param("korikDavriTransport"); }
  /* Me'yordan oshish darajasi bo'yicha pog'onali ball */
  function pasayish(kun, meyor) {
    if (kun == null) return 0;
    if (kun <= meyor) return 1;
    if (kun <= meyor * 1.5) return 0.6;
    if (kun <= meyor * 2) return 0.3;
    return 0;
  }
  const holatBall = u => u >= 0.9 ? "yaxshi" : u >= 0.5 ? "ogohlantirish" : "xavf";

  const OGIRLIK = [
    {kalit: "korik",   nom: "Ko'rik dolzarbligi",   ogirlik: 25},
    {kalit: "sugurta", nom: "Sug'urta himoyasi",    ogirlik: 25},
    {kalit: "baho",    nom: "Baho dolzarbligi",     ogirlik: 20},
    {kalit: "hujjat",  nom: "Hujjatlar to'liqligi", ogirlik: 15},
    {kalit: "himoya",  nom: "Qo'riqlash va qurilmalar", ogirlik: 15}
  ];

  /* Hujjatlar to'liqligi: aktiv o'tgan bosqichlar uchun majburiy hujjatlar */
  function hujjatToliqligi(y) {
    const bosq = D.BOSQICHLAR.map(b => b.kalit);
    const gacha = Math.max(0, bosq.indexOf(y.bosqich));
    const kerak = [];
    bosq.slice(0, gacha + 1).forEach(b => {
      if (b === "chiqim" && y.holat !== "Chiqarildi") return;
      /* bir hujjat turi bir necha bosqichda majburiy bo'lishi mumkin (masalan, baholash hisoboti): u bir marta sanaladi */
      D.majburiyHujjatlar(b, y.balans && y.balans.qabulAsosi, y.turKalit).forEach(t => { if (!kerak.some(k => k.tur === t)) kerak.push({bosqich: b, tur: t}); });
    });
    const bor = (D.HUJJATLAR || []).filter(h => h.obyektId === y.id);
    const turlar = bor.map(h => h.tur);
    const mavjud = kerak.filter(k => turlar.indexOf(k.tur) >= 0);
    return {kerak, bor, mavjud, yetishmaydi: kerak.filter(k => turlar.indexOf(k.tur) < 0),
            foiz: kerak.length ? Math.round(mavjud.length / kerak.length * 100) : 100};
  }

  const KESH = {};
  function indeks(y) {
    if (!y) return null;
    const id = typeof y === "string" ? y : y.id;
    if (KESH[id]) return KESH[id];
    const yoz = typeof y === "string" ? (D.YOZUVLAR || []).find(x => x.id === id) : y;
    if (!yoz) return null;
    const tarkib = [];
    const kiritilmagan = (kalit, nom, ogirlik, meyor, izoh) =>
      tarkib.push({kalit, nom, ogirlik, ulush: 0, qiymat: "kiritilmagan", meyor, holat: "kiritilmagan", izoh: izoh || ""});

    /* 1. Ko'rik */
    const koriklar = (D.KORIKLAR || []).filter(k => k.obyektId === id);
    const meyorK = korikDavri(yoz);
    if (!koriklar.length && mahalliy) kiritilmagan("korik", "Ko'rik dolzarbligi", 25, "har " + meyorK + " kunda");
    else {
      const otkazilgan = koriklar.filter(k => ["otkazildi", "o'tkazildi", "bajarildi", "yakunlandi"].indexOf(String(k.holat).toLowerCase()) >= 0)
        .map(k => sanaOqi(k.sana)).filter(Boolean).sort((a, b) => b - a);
      const oxirgi = otkazilgan[0] || null;
      const kun = oxirgi ? kunFarqi(oxirgi, BUGUN) : null;
      const kechikkan = koriklar.some(k => k.holat === "kechikkan");
      let u = oxirgi ? pasayish(kun, meyorK) : 0.15;
      if (kechikkan) u = Math.min(u, 0.3);
      tarkib.push({kalit: "korik", nom: "Ko'rik dolzarbligi", ogirlik: 25, ulush: u,
        qiymat: oxirgi ? kun + " kun oldin" : "o'tkazilmagan", meyor: "har " + meyorK + " kunda", holat: holatBall(u),
        izoh: kechikkan ? "Rejadagi ko'rik muddati o'tgan" : ""});
    }

    /* 2. Sug'urta: transportda OSAGO, boshqasida mulk polisi */
    const kerakTur = yoz.turKalit === "transport" ? "OSAGO" : "mulk";
    const polislar = (D.SUGURTALAR || []).filter(s => s.obyektId === id && (!s.polisTuri || s.polisTuri === kerakTur))
      .sort((a, b) => (sanaOqi(b.tugash) || 0) - (sanaOqi(a.tugash) || 0));
    if (!polislar.length && mahalliy) kiritilmagan("sugurta", "Sug'urta himoyasi", 25, kerakTur === "OSAGO" ? "amaldagi OSAGO" : "sug'urta summasi bahodan kam emas");
    else {
      const polis = polislar[0];
      const qolgan = polis ? kunFarqi(BUGUN, polis.tugash) : null;
      const asos = (yoz.qiymat && yoz.qiymat.bozor) || (yoz.balans && yoz.balans.qiymat) || 0;
      const amalda = polis && qolgan != null && qolgan > 0 && String(polis.holat).indexOf("to'xtat") < 0;
      let u = 0;
      if (amalda && qolgan > 30) u = kerakTur === "OSAGO" || polis.summa >= asos ? 1 : 0.65;
      else if (amalda) u = 0.5;
      else if (polis) u = 0.1;
      tarkib.push({kalit: "sugurta", nom: "Sug'urta himoyasi", ogirlik: 25, ulush: u,
        qiymat: polis ? (qolgan > 0 ? qolgan + " kun qoldi" : "muddati tugagan") : "polis yo'q",
        meyor: kerakTur === "OSAGO" ? "amaldagi OSAGO" : "sug'urta summasi bahodan kam emas", holat: holatBall(u),
        izoh: polis && kerakTur !== "OSAGO" && polis.summa < asos ? "Sug'urta summasi baholangan qiymatdan past" : ""});
    }

    /* 3. Baholash dolzarbligi */
    const bahoSana = sanaOqi(yoz.qiymat && yoz.qiymat.bahoSana);
    const bahoMeyor = Math.round(D.param("bahoAmalOy") * 30.4);
    if (!bahoSana && mahalliy) kiritilmagan("baho", "Baho dolzarbligi", 20, D.param("bahoAmalOy") + " oyda bir marta",
      yoz.qiymat && yoz.qiymat.bozor != null ? "Sotish qiymati bor, baholash sanasi kiritilmagan" : "");
    else {
      const kun = bahoSana ? kunFarqi(bahoSana, BUGUN) : null;
      const u = bahoSana ? pasayish(kun, bahoMeyor) : 0;
      tarkib.push({kalit: "baho", nom: "Baho dolzarbligi", ogirlik: 20, ulush: u,
        qiymat: bahoSana ? kun + " kun oldin" : "baholanmagan", meyor: D.param("bahoAmalOy") + " oyda bir marta", holat: holatBall(u), izoh: ""});
    }

    /* 4. Hujjatlar */
    const h = hujjatToliqligi(yoz);
    if (!h.bor.length && mahalliy) kiritilmagan("hujjat", "Hujjatlar to'liqligi", 15, h.kerak.length + " ta majburiy hujjat");
    else {
      const u = h.kerak.length ? h.mavjud.length / h.kerak.length : 1;
      tarkib.push({kalit: "hujjat", nom: "Hujjatlar to'liqligi", ogirlik: 15, ulush: u,
        qiymat: h.mavjud.length + " / " + h.kerak.length, meyor: h.kerak.length + " ta majburiy hujjat", holat: holatBall(u),
        izoh: h.yetishmaydi.length ? "Yetishmaydi: " + h.yetishmaydi.map(k => k.tur).join(", ") : ""});
    }

    /* 5. Himoya: qo'riqlash shartnomasi, qurilmalarning onlayn ulushi va batareya holati */
    const shartnoma = (D.QORIQLASH || []).find(q => q.obyektId === id && q.holat === "amalda");
    const qurilmalar = (D.QURILMALAR || []).filter(q => q.obyektId === id);
    if (!shartnoma && !qurilmalar.length && mahalliy) kiritilmagan("himoya", "Qo'riqlash va qurilmalar", 15, "shartnoma yoki onlayn qurilma");
    else {
      let u = shartnoma ? 0.5 : 0;
      let onlayn = 0, batOk = 0;
      if (qurilmalar.length) {
        onlayn = qurilmalar.filter(q => q.holat === "onlayn").length;
        const batli = qurilmalar.filter(q => q.batareya != null);
        batOk = batli.length ? batli.filter(q => q.batareya >= 20).length / batli.length : 1;
        u += 0.35 * onlayn / qurilmalar.length + 0.15 * batOk;
      }
      u = Math.min(1, u);
      tarkib.push({kalit: "himoya", nom: "Qo'riqlash va qurilmalar", ogirlik: 15, ulush: u,
        qiymat: (shartnoma ? "shartnoma bor" : "shartnoma yo'q") + ", " + (qurilmalar.length ? onlayn + " / " + qurilmalar.length + " qurilma onlayn" : "qurilma yo'q"),
        meyor: "shartnoma va onlayn qurilmalar", holat: holatBall(u),
        izoh: qurilmalar.some(q => q.batareya != null && q.batareya < 20) ? "Batareyasi past qurilma bor" : ""});
    }

    const ball = Math.round(tarkib.reduce((a, t) => a + t.ulush * t.ogirlik, 0));
    const bosh = tarkib.every(t => t.holat === "kiritilmagan");
    const natija = {
      obyektId: id, ball,
      daraja: bosh ? "malumotsiz" : ball >= 85 ? "yuqori" : ball >= 70 ? "barqaror" : ball >= 50 ? "past" : "kritik",
      darajaNomi: bosh ? "Ma'lumot kiritilmagan" : ball >= 85 ? "Yuqori nazorat" : ball >= 70 ? "Barqaror" : ball >= 50 ? "Diqqat talab" : "Xavfli",
      kiritilmagan: tarkib.filter(t => t.holat === "kiritilmagan").length,
      tarkib,
      zaif: tarkib.filter(t => t.holat !== "yaxshi").sort((a, b) => a.ulush - b.ulush)
    };
    KESH[id] = natija;
    return natija;
  }
  function jamlama(royxat) {
    const r = royxat || D.YOZUVLAR || [];
    const ballar = r.map(y => indeks(y)).filter(Boolean);
    const hisobda = ballar.filter(b => b.daraja !== "malumotsiz");
    const ortacha = hisobda.length ? Math.round(hisobda.reduce((a, b) => a + b.ball, 0) / hisobda.length) : 0;
    const daraja = {yuqori: 0, barqaror: 0, past: 0, kritik: 0, malumotsiz: 0};
    ballar.forEach(b => daraja[b.daraja]++);
    return {ortacha, daraja, jami: ballar.length};
  }
  (D.YOZUVLAR || []).forEach(y => {
    if (!Object.prototype.hasOwnProperty.call(y, "nazoratBall"))
      Object.defineProperty(y, "nazoratBall", {get() { const n = indeks(this); return n ? n.ball : null; }, enumerable: false, configurable: true});
  });

  /* Oylik saqlash xarajati: faol qo'riqlash to'lovi + joriy chorak solig'ining uchdan biri +
     oxirgi 3 oydagi boshqa xarajatlar o'rtachasi (qo'riqlash va soliq qayta sanalmaydi). */
  function oylikSaqlashXarajati(y) {
    const id = typeof y === "string" ? y : y.id;
    const q = (D.QORIQLASH || []).find(x => x.obyektId === id && x.holat === "amalda");
    const chorak = BUGUN.getFullYear() + "-Q" + (Math.floor(BUGUN.getMonth() / 3) + 1);
    const s = (D.SOLIQ || []).find(x => x.obyektId === id && x.davr === chorak);
    const chegara = oyQosh(BUGUN, -3);
    const boshqa = (D.XARAJATLAR || []).filter(x => x.obyektId === id && ["qoriqlash", "molmulk"].indexOf(x.toifa) < 0 && sanaOqi(x.sana) >= chegara)
      .reduce((a, x) => a + x.summa, 0) / 3;
    const natija = {qoriqlash: q ? q.oylikTolov : 0, soliq: s ? yaxlit(s.summa / 3, 2) : 0, boshqa: yaxlit(boshqa, 2)};
    natija.jami = yaxlit(natija.qoriqlash + natija.soliq + natija.boshqa, 2);
    return natija;
  }

  /* ---------- Portfel kesimlari (har doim reyestrdan hisoblanadi) ---------- */
  function portfelHisobla() {
    const yoz = (D.YOZUVLAR || []).filter(y => y.holat !== "Chiqarildi");
    const holatSanoq = {};
    yoz.forEach(y => { holatSanoq[y.holat] = (holatSanoq[y.holat] || 0) + 1; });
    const holatlar = D.HOLATLAR.filter(h => holatSanoq[h.nom]).map(h => ({nom: h.nom, kalit: h.kalit, rang: h.rang, chip: h.chip, son: holatSanoq[h.nom]}));
    /* foizlar eng katta qoldiq usulida: yig'indi doim 100 */
    const ulush = holatlar.map(h => h.son / Math.max(1, yoz.length) * 100);
    const butun = ulush.map(Math.floor);
    const qoldi = 100 - butun.reduce((a, b) => a + b, 0);
    ulush.map((u, i) => [u - butun[i], i]).sort((a, b) => b[0] - a[0]).slice(0, Math.max(0, qoldi)).forEach(([, i]) => butun[i]++);
    holatlar.forEach((h, i) => { h.foiz = yoz.length ? butun[i] : 0; });

    const muddat = {imtiyozda: 0, normal: 0, "xavf-90": 0, umidsiz: 0, "3-yildan-oshgan": 0, kiritilmagan: 0};
    let zaxira = 0, zaxiraTaxminiy = 0, umidsiz90Son = 0, umidsiz90Qiymat = 0;
    yoz.forEach(y => {
      const m = D.muddatHisobi(y);
      muddat[m.holat] = (muddat[m.holat] || 0) + 1;
      if (m.holat === "xavf-90") { umidsiz90Son++; umidsiz90Qiymat += y.balans.qiymat || 0; }
      const z = D.zaxiraHisobi(y);
      if (z.summa) { zaxira += z.summa; if (z.taxminiy) zaxiraTaxminiy += z.summa; }
    });
    const kesim = kalit => {
      let yaxshi = 0, ogoh = 0, kirit = 0;
      yoz.forEach(y => {
        const t = (indeks(y) || {tarkib: []}).tarkib.find(x => x.kalit === kalit);
        if (!t) return;
        if (t.holat === "yaxshi") yaxshi++; else if (t.holat === "ogohlantirish") ogoh++; else if (t.holat === "kiritilmagan") kirit++;
      });
      return {jami: yoz.length, yaxshi, ogoh, xavf: yoz.length - yaxshi - ogoh - kirit, kiritilmagan: kirit};
    };
    const k = kesim("korik"), sg = kesim("sugurta");
    /* Baho muddati: baho sanasidan bahoAmalOy oy o'tib tugaydi; 30 kun qolganda ogohlantiriladi (baholash.html bilan bir xil) */
    const bh = {jami: yoz.length, yaxshi: 0, ogoh: 0, xavf: 0, kiritilmagan: 0};
    yoz.forEach(y => {
      const s = sanaOqi(y.qiymat && y.qiymat.bahoSana);
      if (!s) { bh.kiritilmagan++; return; }
      const qolgan = kunFarqi(BUGUN, D.oyQosh(s, D.param("bahoAmalOy") || 12));
      if (qolgan < 0) bh.xavf++; else if (qolgan <= 30) bh.ogoh++; else bh.yaxshi++;
    });
    const balansQiymat = yaxlit(yoz.reduce((a, y) => a + (y.balans.qiymat || 0), 0));
    const baholangan = yoz.filter(y => y.qiymat && y.qiymat.bozor != null);
    const kapital = D.param("kapital1DarajaMlrd");
    return {
      jami: yoz.length, reyestrda: yoz.length, balansda: yoz.length,
      balansQiymat, balansQiymatMlrd: yaxlit(balansQiymat / 1000, 1),
      bozorQiymat: yaxlit(baholangan.reduce((a, y) => a + y.qiymat.bozor, 0)), baholangan: baholangan.length,
      baholanmagan: yoz.length - baholangan.length,
      holatlar, muddat, umidsiz90: {son: umidsiz90Son, qiymat: yaxlit(umidsiz90Qiymat)},
      zaxira: {jami: yaxlit(zaxira), taxminiyQism: yaxlit(zaxiraTaxminiy)},
      kapital: {kapital1DarajaMlrd: kapital, nisbat: kapital ? yaxlit(balansQiymat / 1000 / kapital, 3) : null, chegara: D.param("kapitalLimitKoeff")},
      koriklar:  {jami: k.jami,  otkazilgan: k.yaxshi, rejada: k.ogoh, muddatiOtgan: k.xavf, kiritilmagan: k.kiritilmagan},
      sugurtali: {jami: sg.jami, amalda: sg.yaxshi, tugaydi30: sg.ogoh, muddatiOtgan: sg.xavf, kiritilmagan: sg.kiritilmagan},
      baholash:  {jami: bh.jami, dolzarb: bh.yaxshi, tugaydi30: bh.ogoh, eskirgan: bh.xavf, kiritilmagan: bh.kiritilmagan},
      undiruv: D.undiruvJamlama ? D.undiruvJamlama() : null,
      himoya: D.kirishJamlama ? D.kirishJamlama() : null
    };
  }

  /* ---------- Hududlar kesimi: [nom, son, "", son] (eski shakl) va batafsil ---------- */
  function hududKesimi() {
    const s = {};
    (D.YOZUVLAR || []).filter(y => y.holat !== "Chiqarildi").forEach(y => {
      const kod = y.hududKod || D.hududKodi(y.hudud) || "?";
      const r = s[kod] = s[kod] || {kod, nom: (D.HUDUD_KODLAR[kod] || {}).toliq || y.hudud, son: 0, balansQiymat: 0, umidsiz: 0};
      r.son++;
      r.balansQiymat = yaxlit(r.balansQiymat + (y.balans.qiymat || 0));
      const m = D.muddatHisobi(y).holat;
      if (m === "umidsiz" || m === "3-yildan-oshgan") r.umidsiz++;
    });
    return Object.keys(s).map(k => s[k]).sort((a, b) => b.son - a.son);
  }

  /* ---------- Balansga olingan va sotilgan (yillar kesimi) ---------- */
  function balansDinamika() {
    const joriy = BUGUN.getFullYear();
    const yillar = Array.from({length: 6}, (_, i) => String(joriy - 5 + i));
    const yil = s => { const d = sanaOqi(s); return d ? String(d.getFullYear()) : null; };
    const arx = D.ARXIV || [];
    const arxIdlar = new Set(arx.map(a => a.id));
    const sotuvlar = arx.map(a => ({yil: yil(a.sotuvSana), qiymat: a.sotuvNarxi}))
      .concat((D.SHARTNOMALAR || []).filter(s => !arxIdlar.has(s.obyektId) && s.holat !== "bekor").map(s => ({yil: yil(s.sana), qiymat: s.narx})));
    const olinganlar = (D.YOZUVLAR || []).map(y => ({yil: yil(y.balans.sana), qiymat: y.balans.qiymat}))
      .concat(arx.map(a => ({yil: yil(a.balansSana), qiymat: a.balansQiymat})));
    return {
      yillar,
      olingan: yillar.map(y => olinganlar.filter(v => v.yil === y).length),
      sotilgan: yillar.map(y => sotuvlar.filter(v => v.yil === y).length),
      olinganQiymat: yillar.map(y => yaxlit(olinganlar.filter(v => v.yil === y).reduce((a, v) => a + (v.qiymat || 0), 0))),
      sotilganQiymat: yillar.map(y => yaxlit(sotuvlar.filter(v => v.yil === y).reduce((a, v) => a + (v.qiymat || 0), 0)))
    };
  }

  /* ---------- Xarita nuqtalari: joy koordinatasi bor aktivlar ---------- */
  function xaritaNuqtalari() {
    return (D.YOZUVLAR || []).filter(y => y.joy && y.joy.lat).map(y => ({
      kod: y.id, nom: y.qisqa, tur: y.tur, rasmTuri: y.rasmTuri, holat: y.holat, lat: y.joy.lat, lng: y.joy.lng, aniq: !!y.joy.aniq,
      guruh: y.hudud, muddat: D.muddatHisobi(y).holat, qoriqlash: y.himoya ? y.himoya.qoriqlashTuri : null
    }));
  }

  /* ============================================================
     Qoidalar: bildirishnoma va vazifa nomzodlari
     Yadrodagi qoidalar dvigateli natijani BILDIRISHLAR va MENING_VAZIFALARIM ga
     yozadi. id qoida, obyekt va trigger sanasidan tuziladi, shuning uchun takror
     yuklanishda yangi yozuv paydo bo'lmaydi.
     ============================================================ */
  function qoidaNatijalari(joriy) {
    const j = joriy ? sanaOqi(joriy) : BUGUN;
    const qoida = id => (D.QOIDALAR || []).find(q => q.id === id && q.faol !== false);
    const natija = [];
    const qosh = (q, obyektId, triggerSana, sarlavha, matn, havola, muddat, muhimlik, kalit) => {
      const id = q.id + "|" + (kalit || obyektId || "-") + "|" + sanaYoz(triggerSana);
      const n = {id, qoidaId: q.id, obyektId: obyektId || null, sana: sanaYoz(triggerSana), sarlavha, matn, havola,
        rol: q.qabulQiluvchiRol, eskalatsiyaRol: q.eskalatsiyaRol, muddat: muddat ? sanaYoz(muddat) : null, muhimlik: muhimlik || "orta"};
      if (q.natija === "bildirish" || q.natija === "ikkalasi") natija.push(Object.assign({tur: "bildirish"}, n));
      if (q.natija === "vazifa" || q.natija === "ikkalasi") natija.push(Object.assign({tur: "vazifa"}, n, {id: "V|" + id}));
    };
    /* Qisqa nomlar takrorlanadi: bildirishnomada obyekt ID bilan ajratiladi */
    const nom = id => D.obyektNomi(id, true) + " (" + id + ")";
    const YOZ = (D.YOZUVLAR || []).filter(y => y.holat !== "Chiqarildi");

    let q = qoida("Q-UMIDSIZ");
    if (q) YOZ.forEach(y => {
      const m = D.muddatHisobi(y, j);
      if (m.kiritilmagan || m.qolganKun <= 0) return;
      const chegara = q.kunlar.filter(k => m.qolganKun <= k).sort((a, b) => a - b)[0];
      if (chegara == null) return;
      qosh(q, y.id, kunQosh(m.chegaraSana, -chegara), "Me'yoriy muddatgacha " + chegara + " kun qoldi",
        nom(y.id) + ": " + m.chegaraSana + "-dan 100% zaxira talab qilinadi.", "obyekt.html?id=" + encodeURIComponent(y.id),
        m.chegaraSana, chegara <= 30 ? "yuqori" : "orta");
    });
    q = qoida("Q-POLIS");
    if (q) (D.SUGURTALAR || []).forEach(s => {
      const qolgan = kunFarqi(j, s.tugash);
      if (qolgan == null || qolgan < 0 || qolgan > q.kunlar[0]) return;
      qosh(q, s.obyektId, kunQosh(s.tugash, -q.kunlar[0]), "Sug'urta polisi " + qolgan + " kunda tugaydi",
        nom(s.obyektId) + ": " + s.polis + " (" + ((D.POLIS_TURLARI || {})[s.polisTuri] || s.polisTuri) + "), " + s.tugash + " gacha.", "sugurta-polis.html?id=" + encodeURIComponent(s.id), s.tugash, qolgan <= 7 ? "yuqori" : "orta");
    });
    q = qoida("Q-BAHO");
    if (q) YOZ.forEach(y => {
      const b = sanaOqi(y.qiymat && y.qiymat.bahoSana);
      if (!b) return;
      const tugash = oyQosh(b, D.param("bahoAmalOy"));
      const qolgan = kunFarqi(j, tugash);
      if (qolgan > q.kunlar[0]) return;
      qosh(q, y.id, kunQosh(tugash, -q.kunlar[0]), qolgan < 0 ? "Baholash eskirgan" : "Baholash " + qolgan + " kunda eskiradi",
        nom(y.id) + ": oxirgi baholash " + sanaYoz(b) + ".", "baholash-buyurtma.html?obyekt=" + encodeURIComponent(y.id), tugash, qolgan < 0 ? "yuqori" : "orta");
    });
    q = qoida("Q-KORIK");
    if (q) (D.KORIKLAR || []).forEach(k => {
      const s = sanaOqi(k.sana);
      if (!s || ["otkazildi", "bekor"].indexOf(k.holat) >= 0 || s >= j) return;
      qosh(q, k.obyektId, s, "Ko'rik kechikdi", nom(k.obyektId) + ": " + k.sana + "-dagi ko'rik o'tkazilmagan.",
        "korik-otkazish.html?id=" + encodeURIComponent(k.id), s, "yuqori");   /* muddat = rejadagi sana: kechikkan ko'rik muddati o'tgan vazifa */
    });
    q = qoida("Q-QURILMA");
    if (q) (D.QURILMALAR || []).forEach(x => {
      if ((x.oflaynSoat || 0) < 24) return;
      const signal = sanaOqi(x.oxirgiSignal);
      /* muddat = oxirgi signal + 24 soat (aloqasizlik chegarasi) */
      qosh(q, x.obyektId, signal, "Qurilma " + x.oflaynSoat + " soatdan beri aloqasiz",
        nom(x.obyektId) + ": " + x.turNomi + " (" + x.id + ").", "qurilma.html?id=" + encodeURIComponent(x.id), signal ? kunQosh(signal, 1) : j, "orta");
    });
    q = qoida("Q-TOLOV");
    if (q) (D.LOTLAR || []).forEach(l => {
      if (l.holat !== "golib" || !l.tolovMuddati) return;
      const qolgan = kunFarqi(j, l.tolovMuddati);
      if (qolgan < 0 || qolgan > q.kunlar[0]) return;
      qosh(q, l.obyektId, sanaOqi(l.bayonnomaSana), "G'olib to'lovi muddati " + l.tolovMuddati,
        nom(l.obyektId) + ": lot " + l.id + ", g'olib " + (l.golib || "") + ".", "lot.html?id=" + encodeURIComponent(l.id), l.tolovMuddati, "yuqori");
    });
    q = qoida("Q-YHXX");
    if (q) YOZ.forEach(y => {
      if (y.turKalit !== "transport" && y.turKalit !== "texnika") return;
      if (y.huquq && y.huquq.yhxxQaydSana) return;
      const muddat = kunQosh(y.balans.sana, D.param("yhxxKun"));
      if (kunFarqi(j, muddat) > q.kunlar[0]) return;
      qosh(q, y.id, y.balans.sana, "Transportni YHXXda qayta qayd etish", nom(y.id) + ": muddat " + sanaYoz(muddat) + ".",
        "rasmiylashtirish.html?obyekt=" + encodeURIComponent(y.id), muddat, "yuqori");
    });
    q = qoida("Q-SOLIQ");
    if (q) YOZ.forEach(y => {
      if (!D.binolimi(y)) return;
      const m = D.muddatHisobi(y, j);
      if (m.kiritilmagan || m.imtiyozQolganKun == null || m.imtiyozQolganKun < 0 || m.imtiyozQolganKun > q.kunlar[0]) return;
      qosh(q, y.id, kunQosh(m.soliqImtiyozTugash, -q.kunlar[0]), "Soliq imtiyozi " + m.imtiyozQolganKun + " kunda tugaydi",
        nom(y.id) + ": imtiyoz " + m.soliqImtiyozTugash + " gacha.", "soliq.html", m.soliqImtiyozTugash, "orta");
    });
    q = qoida("Q-MB");
    if (q) {
      const oldingi = oyQosh(new Date(j.getFullYear(), j.getMonth(), 1), -1);
      const davr = oldingi.getFullYear() + "-" + String(oldingi.getMonth() + 1).padStart(2, "0");
      const muddat = D.ishKuniQosh(new Date(j.getFullYear(), j.getMonth(), D.param("mbHisobotKuni")), 0);
      const h = (D.MB_HISOBOTLAR || []).find(x => x.davr === davr);
      const qolgan = kunFarqi(j, muddat);
      if ((!h || h.holat !== "topshirilgan") && qolgan >= 0 && qolgan <= q.kunlar[0])
        qosh(q, null, kunQosh(muddat, -q.kunlar[0]), "Markaziy bank hisoboti: " + davr, "Topshirish muddati " + sanaYoz(muddat) + ".", "hisobot-mb.html", muddat, "yuqori");
    }
    q = qoida("Q-PASAYTIR");
    if (q) (D.LOTLAR || []).forEach(l => {
      if (["elon", "otkazilmagan"].indexOf(l.holat) < 0 || !l.keyingiPasaytirishSana) return;
      const s = sanaOqi(l.keyingiPasaytirishSana);
      if (s > j) return;
      qosh(q, l.obyektId, s, "Narx pasaytirishni tasdiqqa yuborish", nom(l.obyektId) + ": lot " + D.param("pasaytirishOy") + " oydan beri sotilmadi.",
        "lot.html?id=" + encodeURIComponent(l.id), D.ishKuniQosh(s, 5), "orta");
    });
    q = qoida("Q-DAVAKTIV");
    if (q) YOZ.forEach(y => {
      if (y.holat !== "Davaktivga o'tkazilgan") return;
      const t = (y.tarix || []).filter(x => /Davaktiv/.test(x.voqea)).map(x => sanaOqi(x.sana)).sort((a, b) => b - a)[0];
      if (!t) return;
      const qaytish = oyQosh(t, D.param("davaktivQaytarishOy"));
      if (qaytish > j) return;
      qosh(q, y.id, qaytish, "Davaktivdan qaytarish so'rovi", nom(y.id) + ": " + D.param("davaktivQaytarishOy") + " oyda sotilmadi.",
        "obyekt.html?id=" + encodeURIComponent(y.id), D.ishKuniQosh(qaytish, 10), "orta");
    });
    /* Sud majlisi: bir kun oldin va majlis kuni mas'ul xodimga eslatma; o'tgan majlis natijasi kiritilmagan bo'lsa vazifa */
    q = qoida("Q-MAJLIS");
    if (q) (D.SUD_MAJLISLAR || []).forEach(m => {
      if (!m || m.__ochirilgan || m.holat !== "rejada") return;
      const s = sanaOqi(m.sana);
      if (!s) return;
      const ish = (D.UNDIRUV_ISHLAR || []).find(x => x.id === m.ishId) || {};
      const qolgan = kunFarqi(j, s);
      const matn = "Ish " + m.ishId + ": " + (m.sud || (ish.sud && ish.sud.nomi) || "sud") + ", " + m.sana + (m.soat ? " " + m.soat : "") + ".";
      const havola = "sud-majlis.html?id=" + encodeURIComponent(m.id);
      const bildir = Object.assign({}, q, {natija: "bildirish"}), vazifa = Object.assign({}, q, {natija: "vazifa"});
      const kun = (q.kunlar || [1, 0]).slice().sort((a, b) => b - a);
      if (qolgan >= 0 && qolgan <= kun[0]){
        const chegara = kun.filter(k => qolgan <= k).sort((a, b) => a - b)[0];
        qosh(bildir, ish.aktivId || null, kunQosh(s, -chegara), chegara === 0 ? "Sud majlisi bugun" : "Sud majlisi ertaga", matn, havola, s, "yuqori", m.id);
      } else if (qolgan < 0)
        qosh(vazifa, ish.aktivId || null, s, "Majlis natijasini kiriting", matn, havola, D.ishKuniQosh(s, 1), "yuqori", m.id);
    });
    q = qoida("Q-KONSERV");
    if (q) {
      const kun = new Date(j.getFullYear(), 10, 15);
      if (j >= kun && j <= new Date(j.getFullYear(), 11, 31))
        YOZ.filter(y => D.binolimi(y)).forEach(y => qosh(q, y.id, kun, "Qishki konservatsiya chek-listi",
          nom(y.id) + ": suv tizimini bo'shatish, tom va eshiklarni tekshirish.", "obyekt.html?id=" + encodeURIComponent(y.id), kunQosh(kun, 15), "orta"));
    }
    return natija;
  }

  /* ---------- Ijara to'lovlari: bitta ta'rif (ijara sahifasi, moliya paneli, yon panel hisoblagichi) ---------- */
  /* "10.2025" davri uchun to'lov sanasi: ijara boshlangan kun shu oyda (28 dan oshmaydi) */
  function ijaraTolovSanasi(ij, davr) {
    const m = /^(\d{1,2})\.(\d{4})$/.exec(String(davr || ""));
    if (!m) return null;
    const bosh = sanaOqi(ij && ij.boshlanish), kun = bosh ? Math.min(bosh.getDate(), 28) : 1;
    return new Date(+m[2], +m[1] - 1, kun);
  }
  /* Kechikkan ijara oylari: to'lanmagan va to'lov sanasi bugundan oldin. Muddati kelmagan oy kechikkan emas. */
  function ijaraOtganTolovlar(ij, bugunKun) {
    const b = bugunKun || (x => new Date(x.getFullYear(), x.getMonth(), x.getDate()))(D.bugun());
    return (Array.isArray(ij && ij.tolovlar) ? ij.tolovlar : []).filter(t => {
      if (!t || t.tolandi) return false;
      const d = ijaraTolovSanasi(ij, t.davr);
      return !!d && d < b;
    });
  }

  /* ---------- Hisoblash va eksport ---------- */
  D.ijaraTolovSanasi = ijaraTolovSanasi;
  D.ijaraOtganTolovlar = ijaraOtganTolovlar;
  D.hujjatToliqligi = hujjatToliqligi;
  D.nazoratKeshTozala = function () { Object.keys(KESH).forEach(k => delete KESH[k]); };
  D.nazoratIndeksi = indeks;
  D.nazoratJamlama = jamlama;
  D.NAZORAT_OGIRLIK = OGIRLIK;
  D.oylikSaqlashXarajati = oylikSaqlashXarajati;
  D.portfelHisobla = portfelHisobla;
  D.hududKesimi = hududKesimi;
  D.balansDinamika = balansDinamika;
  D.qoidaNatijalari = qoidaNatijalari;
  D.balansKunlari = y => { const m = D.muddatHisobi(y); return m.kiritilmagan ? 0 : m.turganKun; };
  /* Qo'riqlash — bitta ta'rif (panel, monitoring markazi, qo'riqlash, reyestr, hududlar, xarita):
     obyekt kartasidagi qo'riqlash turi YOKI amaldagi va muddati o'tmagan qo'riqlash shartnomasi YOKI obyektdagi qurilma.
     Qaytaradi: QORIQLASH_TURLARI kaliti ("post", "pult", ..., faqat qurilma bo'lsa "avtonom") yoki null */
  D.qoriqlashTuri = function (y, bugun) {
    if (!y) return null;
    const t = y.himoya && y.himoya.qoriqlashTuri;
    if (t) return t;
    const b = bugun || D.bugun();
    const q = (D.QORIQLASH || []).find(x => x && x.obyektId === y.id && x.holat === "amalda" && !(D.sanaOqi(x.tugash) && D.sanaOqi(x.tugash) < b));
    if (q) return q.qoriqlashTuri || "pult";
    return (D.QURILMALAR || []).some(x => x && x.obyektId === y.id) ? "avtonom" : null;
  };
  D.qoriqlanadimi = (y, bugun) => !!D.qoriqlashTuri(y, bugun);

  D.PORTFEL = portfelHisobla();
  D.HUDUDLAR = hududKesimi().map(h => [h.nom, String(h.son), "", h.son]);
  D.BALANS_DINAMIKA = balansDinamika();
  D.XARITA_NUQTALARI = xaritaNuqtalari();

  /* Namoyishda qoidalar natijasi bildirishnoma va vazifalarga oldindan yoziladi.
     Mahalliy rejimda ularni yadrodagi qoidalar dvigateli yozadi. */
  if (!mahalliy) {
    const bor = new Set((D.BILDIRISHLAR || []).map(b => b.id).concat((D.MENING_VAZIFALARIM || []).map(v => v.id)));
    const HAVOLA_IKON = {"Q-UMIDSIZ": "i-ogoh", "Q-POLIS": "i-qalqon", "Q-BAHO": "i-grafik", "Q-KORIK": "i-tashrif", "Q-QURILMA": "i-qurilma",
      "Q-TOLOV": "i-karta-pul", "Q-YHXX": "i-avto", "Q-SOLIQ": "i-hisobot", "Q-MB": "i-hisobot", "Q-PASAYTIR": "i-grafik", "Q-DAVAKTIV": "i-aktivlar", "Q-KONSERV": "i-uy",
      "Q-MAJLIS": "i-sud"};
    qoidaNatijalari().forEach(n => {
      if (bor.has(n.id)) return;
      if (n.tur === "bildirish") D.BILDIRISHLAR.push({id: n.id, qoidaId: n.qoidaId, obyektId: n.obyektId, sarlavha: n.sarlavha, matn: n.matn,
        havola: n.havola, sana: n.sana, rol: n.rol, oqildi: kunFarqi(n.sana, BUGUN) > 10, ikon: HAVOLA_IKON[n.qoidaId] || "i-ogoh"});
      else D.MENING_VAZIFALARIM.push({id: n.id, nom: n.sarlavha, tur: (D.QOIDALAR.find(x => x.id === n.qoidaId) || {}).nom || "",
        obyektId: n.obyektId, kod: n.obyektId, qoidaId: n.qoidaId, sana: n.sana, muddat: n.muddat, ijrochi: null, rol: n.rol,
        muhimlik: n.muhimlik, bajarildi: false});
    });
  }
})();
