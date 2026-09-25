/* ============================================================
   hisobot-davr.js — davr bo'yicha hisob: hafta, oy, chorak, yil.
   Haftalik xulosa (haftalik.html), kengash hisoboti (panel.html) va
   ABS bilan solishtirish (panel-moliya.html) bitta qoidadan hisoblaydi:
   bir raqam ikki sahifada ikki xil chiqmasligi uchun.
   DOMsiz: node testida ham yuklanadi (tests/davr.test.js).
   Barcha summalar mln so'mda, sanalar "dd.mm.yyyy".
   ============================================================ */
(function(){
  "use strict";
  const OY = ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr"];
  const ikki = n => String(n).padStart(2, "0");
  const kun = d => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const kunQosh = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
  const sanaYoz = d => ikki(d.getDate()) + "." + ikki(d.getMonth() + 1) + "." + d.getFullYear();
  const yaxlit = (n, k) => { const p = Math.pow(10, k == null ? 1 : k); return Math.round(n * p) / p; };
  const kunlarSoni = (a, b) => Math.round((Date.UTC(b.getFullYear(), b.getMonth(), b.getDate()) -
    Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())) / 864e5) + 1;
  /* "dd.mm.yyyy", "dd.mm.yyyy HH:MM", "yyyy-mm-dd" yoki Date -> kun boshi */
  function oqi(x){
    if (x == null || x === "") return null;
    if (x instanceof Date) return isNaN(x) ? null : kun(x);
    let m = /^(\d{1,2})[.\-/](\d{1,2})[.\-/](\d{4})/.exec(String(x).trim());
    if (m) return new Date(+m[3], +m[2] - 1, +m[1]);
    m = /^(\d{4})-(\d{1,2})-(\d{1,2})/.exec(String(x).trim());
    if (m) return new Date(+m[1], +m[2] - 1, +m[3]);
    return null;
  }

  /* ---------- Davrlar ---------- */
  /* Hafta dushanbadan yakshanbagacha (O'zbekistonda ish haftasi dushanbadan boshlanadi) */
  function oraliq(tur, sana){
    const d = oqi(sana);
    if (tur === "hafta"){ const dan = kunQosh(d, -((d.getDay() + 6) % 7)); return {tur, dan, gacha: kunQosh(dan, 6)}; }
    if (tur === "oy") return {tur, dan: new Date(d.getFullYear(), d.getMonth(), 1), gacha: new Date(d.getFullYear(), d.getMonth() + 1, 0)};
    if (tur === "chorak"){ const m = d.getMonth() - d.getMonth() % 3; return {tur, dan: new Date(d.getFullYear(), m, 1), gacha: new Date(d.getFullYear(), m + 3, 0)}; }
    if (tur === "yil") return {tur, dan: new Date(d.getFullYear(), 0, 1), gacha: new Date(d.getFullYear(), 11, 31)};
    throw new Error("davr turi noma'lum: " + tur);
  }
  const oldingi = o => oraliq(o.tur, kunQosh(o.dan, -1));
  const keyingi = o => oraliq(o.tur, kunQosh(o.gacha, 1));
  /* Tugamagan davr bugun bilan kesiladi, solishtirma davr esa xuddi shuncha kunga:
     1–25 sentabr 1–25 avgust bilan solishtiriladi, to'liq avgust bilan emas.
     Oy uzunligi farq qilsa, oldingi davr o'z oxiridan oshmaydi. */
  function juft(o, bugun){
    const b = oqi(bugun);
    const joriy = Object.assign({}, o, {qismiy: o.gacha > b, gacha: o.gacha > b ? b : o.gacha});
    const old = oldingi(o);
    const n = kunlarSoni(joriy.dan, joriy.gacha);
    const oxir = kunQosh(old.dan, n - 1);
    return {joriy, oldingi: Object.assign({}, old, {qismiy: joriy.qismiy, gacha: oxir < old.gacha ? oxir : old.gacha})};
  }
  const ichida = (s, o) => { const d = oqi(s); return !!d && d >= o.dan && d <= o.gacha; };
  function nomi(o){
    if (o.tur === "hafta" || o.qismiy)
      return (o.dan.getFullYear() === o.gacha.getFullYear() && o.dan.getMonth() === o.gacha.getMonth()
        ? ikki(o.dan.getDate()) : sanaYoz(o.dan).slice(0, o.dan.getFullYear() === o.gacha.getFullYear() ? 5 : 10)) + "–" + sanaYoz(o.gacha);
    if (o.tur === "oy") return OY[o.dan.getMonth()] + " " + o.dan.getFullYear();
    if (o.tur === "chorak") return (o.dan.getMonth() / 3 + 1) + "-chorak " + o.dan.getFullYear();
    return o.dan.getFullYear() + "-yil";
  }
  /* Kengash hisobotining raqami: KH-2026/09 (oy), KH-2026/Q3 (chorak), KH-2026 (yil) */
  function raqam(o){
    const y = o.dan.getFullYear();
    if (o.tur === "oy") return "KH-" + y + "/" + ikki(o.dan.getMonth() + 1);
    if (o.tur === "chorak") return "KH-" + y + "/Q" + (o.dan.getMonth() / 3 + 1);
    if (o.tur === "yil") return "KH-" + y;
    return "HX-" + y + "/" + ikki(haftaRaqami(o.dan));
  }
  /* ISO 8601 hafta raqami */
  function haftaRaqami(d){
    const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    t.setUTCDate(t.getUTCDate() + 4 - (t.getUTCDay() || 7));
    return Math.ceil(((t - Date.UTC(t.getUTCFullYear(), 0, 1)) / 864e5 + 1) / 7);
  }

  /* ---------- Balans holati: sana oxirida balansda turgan aktivlar ----------
     MB oylik hisobotidagi qoida bilan bir xil: reyestrdagi aktiv qabul sanasidan boshlab,
     arxivdagi aktiv esa qabuldan sotuv sanasigacha balansda turadi. */
  const ayniyat = r => r;
  function balansdagilar(D, sana, doira){
    doira = doira || ayniyat;
    const d = oqi(sana);
    const arxivId = new Set((D.ARXIV || []).map(a => a.id));
    const hozir = doira((D.YOZUVLAR || []).filter(y => y && y.holat !== "Chiqarildi" && !arxivId.has(y.id)))
      .filter(y => { const b = oqi(y.balans && y.balans.sana); return b && b <= d; })
      .map(y => ({id: y.id, nom: y.qisqa || y.nom, sana: y.balans.sana, qiymat: +y.balans.qiymat || 0, yozuv: y}));
    const arx = doira((D.ARXIV || []).slice())
      .filter(a => { const b = oqi(a.balansSana), s = oqi(a.sotuvSana); return b && b <= d && (!s || s > d); })
      .map(a => ({id: a.id, nom: a.qisqa || a.nom, sana: a.balansSana, qiymat: +a.balansQiymat || 0, arxiv: true}));
    return hozir.concat(arx);
  }
  function balansHolati(D, sana, doira){
    const r = balansdagilar(D, sana, doira);
    return {soni: r.length, qiymat: yaxlit(r.reduce((a, x) => a + x.qiymat, 0))};
  }

  /* Sana oxiridagi zaxira: reyestrdagi aktivga o'sha kundagi toifa (D.zaxiraHisobi), keyin sotilgan
     aktivga MB zaxira tarixidagi qoida (qabul asosi noma'lum — umumiy chegara) */
  function zaxiraHolati(D, sana, doira){
    const d = oqi(sana);
    let summa = 0, taxminiy = false;
    balansdagilar(D, d, doira).forEach(x => {
      if (x.yozuv && D.zaxiraHisobi){
        const z = D.zaxiraHisobi(x.yozuv, d);
        if (z && z.summa){ summa += z.summa; if (z.taxminiy) taxminiy = true; }
      } else if (x.arxiv && D.zaxiraToifasi){
        const t = D.zaxiraToifasi(kunlarSoni(oqi(x.sana), d) - 1, D.chegaraKuni ? D.chegaraKuni({balans: {qabulAsosi: null}}) : null);
        if (t){ summa += x.qiymat * t.foiz / 100; if (t.taxminiy) taxminiy = true; }
      }
    });
    return {summa: yaxlit(summa), taxminiy};
  }

  /* ---------- Davr ichidagi harakatlar ---------- */
  const jami = (r, f) => yaxlit(r.reduce((a, x) => a + (+(f ? f(x) : x.summa) || 0), 0));
  /* opts.yopilish — {"KOL:id": "dd.mm.yyyy HH:MM"}: amallar jurnalidan olingan yopilish vaqti */
  function harakat(D, o, doira, opts){
    doira = doira || ayniyat;
    const yopilish = (opts && opts.yopilish) || {};
    const ARX = D.ARXIV || [];
    const arxivId = new Set(ARX.map(a => a.id));
    /* Balansga olingan: reyestrdagi va keyin sotilib arxivga o'tgan aktivlar */
    const qabul = doira((D.YOZUVLAR || []).filter(y => y && !arxivId.has(y.id) && y.holat !== "Chiqarildi"))
      .filter(y => ichida(y.balans && y.balans.sana, o))
      .map(y => ({id: y.id, nom: y.qisqa || y.nom, sana: y.balans.sana, qiymat: +y.balans.qiymat || 0, href: "obyekt.html?id=" + encodeURIComponent(y.id)}))
      .concat(doira(ARX.slice()).filter(a => ichida(a.balansSana, o))
        .map(a => ({id: a.id, nom: a.qisqa || a.nom, sana: a.balansSana, qiymat: +a.balansQiymat || 0, href: "arxiv-obyekt.html?id=" + encodeURIComponent(a.id)})));
    /* Balansdan chiqqan: arxivga o'tgan kun — sotuv sanasi */
    const chiqim = doira(ARX.slice()).filter(a => ichida(a.sotuvSana, o))
      .map(a => ({id: a.id, nom: a.qisqa || a.nom, sana: a.sotuvSana, qiymat: +a.balansQiymat || 0, sotuv: +a.sotuvNarxi || 0,
        href: "arxiv-obyekt.html?id=" + encodeURIComponent(a.id)}));
    /* Sotilgan: davrda imzolangan oldi-sotdi shartnomalari (bekor qilinganlardan tashqari) */
    const SH = doira((D.SHARTNOMALAR || []).filter(s => s && s.holat !== "bekor"));
    const shartnoma = SH.filter(s => ichida(s.sana, o))
      .map(s => ({id: s.id, obyektId: s.obyektId, sana: s.sana, summa: +s.narx || 0, href: "shartnoma.html?id=" + encodeURIComponent(s.id)}));
    /* Tushum: shartnoma kuni avans (to'liq to'lovda butun narx) va jadval bo'yicha to'langan oylar.
       ABS ulanmaguncha to'lov kuni jadvaldagi sana deb olinadi */
    const tushum = [];
    SH.forEach(s => {
      if (+s.avans > 0 && ichida(s.sana, o)) tushum.push({shartnomaId: s.id, obyektId: s.obyektId, sana: s.sana, summa: +s.avans, tur: "avans"});
      (s.jadval || []).forEach(j => { if (j && j.tolandi && ichida(j.sana, o)) tushum.push({shartnomaId: s.id, obyektId: s.obyektId, sana: j.sana, summa: +j.summa || 0, tur: "jadval"}); });
    });
    /* Ijara tushumi oyma-oy yoziladi (kun yo'q): faqat oy, chorak va yil davrlarida hisoblanadi */
    const ijara = [];
    if (o.tur !== "hafta") doira((D.IJARA || []).slice()).forEach(i => (i.tolovlar || []).forEach(t => {
      const m = /^(\d{1,2})\.(\d{4})$/.exec(String(t && t.davr || ""));
      if (!m || !t.tolandi) return;
      const d = new Date(+m[2], +m[1] - 1, 1);
      if (d >= new Date(o.dan.getFullYear(), o.dan.getMonth(), 1) && d <= o.gacha) ijara.push({ijaraId: i.id, obyektId: i.obyektId, davr: t.davr, summa: +t.summa || 0});
    }));
    /* Qarorlar: davrda hal qilinganlar va davr oxirida hal qilinmay turganlar */
    const TS = doira((D.TASDIQLAR || []).slice());
    const qarorHal = TS.filter(t => ["tasdiqlangan", "rad etilgan"].indexOf(t.holat) >= 0 && ichida(t.qarorSana, o));
    const qarorKutil = TS.filter(t => {
      const s = oqi(t.sana);
      if (!s || s > o.gacha) return false;
      if (t.holat === "kutilmoqda") return true;
      const q = oqi(t.qarorSana);
      return !!q && q > o.gacha;
    }).map(t => Object.assign({}, t, {otgan: !!oqi(t.javobMuddati) && oqi(t.javobMuddati) < o.gacha}));
    /* Hodisalar: qayd etilganlar va yopilganlar. Yopilish vaqti yozilmagan yopiq hodisa haftaga taqsimlanmaydi */
    const HD = doira((D.HODISALAR || []).map(h => Object.assign({kol: "HODISALAR"}, h)))
      .concat(doira((D.XAVFSIZLIK_HODISALARI || []).map(h => Object.assign({kol: "XAVFSIZLIK_HODISALARI"}, h))));
    const yopiqmi = h => h.ustun === "yopildi" || h.holat === "yopildi" || h.holat === "Yopildi";
    const hodisaYangi = HD.filter(h => ichida(h.vaqt || h.sana, o));
    const yv = h => h.yopilganVaqt || yopilish[h.kol + ":" + h.id] || null;
    const hodisaYopilgan = HD.filter(h => yopiqmi(h) && ichida(yv(h), o)).map(h => Object.assign(h, {yopilganVaqt: yv(h)}));
    const hodisaSanasiz = HD.filter(h => yopiqmi(h) && !oqi(yv(h))).length;
    /* Kechikkan ko'rik: davr oxirida rejadagi sanasi o'tib ketgan va o'tkazilmagan ko'rik */
    const korikKech = doira((D.KORIKLAR || []).slice()).filter(k => k.holat !== "otkazildi" && oqi(k.sana) && oqi(k.sana) < o.gacha)
      .map(k => Object.assign({}, k, {kechikish: kunlarSoni(oqi(k.sana), o.gacha) - 1}));
    /* Qiymati pasaygan: yangi baho avvalgisidan past yoki lot narxi pasaytirilgan */
    const pasaygan = [];
    doira((D.BAHOLASHLAR || []).slice()).filter(x => x.holat !== "rad etilgan" && x.avvalgi > 0 && x.bozorQiymati > 0 &&
      x.bozorQiymati < x.avvalgi && ichida(x.sana, o)).forEach(x =>
      pasaygan.push({obyektId: x.obyektId, sana: x.sana, eski: x.avvalgi, yangi: x.bozorQiymati, tur: "baho", href: "obyekt.html?id=" + encodeURIComponent(x.obyektId)}));
    doira((D.LOTLAR || []).slice()).forEach(l => (l.pasaytirishlar || []).forEach((p, i, r) => {
      if (!ichida(p.sana, o) || !(p.narx > 0)) return;
      const eski = i > 0 && r[i - 1].narx > 0 ? r[i - 1].narx : (p.foiz > 0 && p.foiz < 100 ? yaxlit(p.narx / (1 - p.foiz / 100)) : null);
      if (eski > p.narx) pasaygan.push({obyektId: l.obyektId, sana: p.sana, eski, yangi: p.narx, tur: "lot", href: "lot.html?id=" + encodeURIComponent(l.id)});
    }));
    const xarajat = doira((D.XARAJATLAR || []).slice()).filter(x => ichida(x.sana, o));
    /* Davrda imzolangan shartnomalar davr oxiridagi holatda: qancha to'lanmay qolgan va nechtasining aktivi balansdan chiqqan */
    const chiqqanId = new Set(ARX.filter(a => oqi(a.sotuvSana) && oqi(a.sotuvSana) <= o.gacha).map(a => a.id));
    let shartnomaQoldiq = 0, shartnomaChiqqan = 0;
    SH.filter(s => ichida(s.sana, o)).forEach(s => {
      const tolangan = (+s.avans || 0) + (s.jadval || []).filter(j => j && j.tolandi && oqi(j.sana) && oqi(j.sana) <= o.gacha).reduce((x, j) => x + (+j.summa || 0), 0);
      shartnomaQoldiq += Math.max(0, (+s.narx || 0) - tolangan);
      if (chiqqanId.has(s.obyektId)) shartnomaChiqqan++;
    });
    return {
      qabul, chiqim, shartnoma, tushum, ijara, qarorHal, qarorKutil, hodisaYangi, hodisaYopilgan, hodisaSanasiz, korikKech, pasaygan, xarajat,
      jami: {
        qabul: jami(qabul, x => x.qiymat), chiqim: jami(chiqim, x => x.qiymat), chiqimSotuv: jami(chiqim, x => x.sotuv),
        shartnoma: jami(shartnoma), tushum: jami(tushum), ijara: jami(ijara), xarajat: jami(xarajat),
        pasayish: jami(pasaygan, x => x.eski - x.yangi), shartnomaQoldiq: yaxlit(shartnomaQoldiq), shartnomaChiqqan,
        tasdiqlandi: qarorHal.filter(t => t.holat === "tasdiqlangan").length, radEtildi: qarorHal.filter(t => t.holat === "rad etilgan").length,
        kutilOtgan: qarorKutil.filter(t => t.otgan).length,
      },
    };
  }

  /* ---------- Manba qachondan yozilgan ----------
     Har ko'rsatkich to'plamidagi eng erta yozuv sanasi. Oldingi davr shu sanadan oldin boshlansa,
     u davr uchun yozuv yo'q: katakka 0 emas, "ma'lumot yo'q" yoziladi, farq hisoblanmaydi.
     Kechikkan ko'rik o'tkazilmagan ko'riklardan hisoblanadi, shuning uchun ularning eng erta sanasi olinadi. */
  function manbaBoshi(D, doira){
    doira = doira || ayniyat;
    const eng = (r, f) => r.reduce((m, x) => { const d = x ? oqi(f(x)) : null; return d && (!m || d < m) ? d : m; }, null);
    const hodisa = eng(doira((D.HODISALAR || []).slice()).concat(doira((D.XAVFSIZLIK_HODISALARI || []).slice())), h => h.vaqt || h.sana);
    const qaror = eng(doira((D.TASDIQLAR || []).slice()), t => t.sana);
    const korik = eng(doira((D.KORIKLAR || []).slice()).filter(k => k && k.holat !== "otkazildi"), k => k.sana);
    return {hodisaYangi: hodisa, hodisaYopilgan: hodisa, qarorHal: qaror, qarorKutil: qaror, korikKech: korik};
  }
  /* Davr uchun yozuv yo'qmi: to'plam bo'sh yoki birinchi yozuv davr boshidan keyin */
  const yozuvYoq = (bosh, o) => !bosh || bosh > o.dan;

  /* ---------- ABS bilan solishtirish ----------
     reyestr: [{id, sana, qiymat}] — sana oxiridagi balansdagilar (balansdagilar()).
     abs: [{id, sana, summa}] — ABS ning 16701 hisobvarag'i bo'yicha analitik ko'chirmasi.
     Summada 0,05 mln so'mgacha farq yaxlitlash deb olinadi. */
  function absSolishtir(reyestr, abs, opts){
    const chegara = (opts && opts.chegara) != null ? opts.chegara : 0.05;
    const kalit = x => String(x == null ? "" : x).trim().toUpperCase();
    const R = new Map((reyestr || []).map(x => [kalit(x.id), x]));
    const A = new Map();
    const takror = [];
    (abs || []).forEach(x => { const k = kalit(x.id); if (!k) return; if (A.has(k)) takror.push(k); else A.set(k, x); });
    const royxat = [];
    R.forEach((r, k) => {
      const a = A.get(k);
      if (!a) return royxat.push({id: r.id, tur: "absda-yoq", reyestr: r.qiymat, abs: null, reyestrSana: r.sana, absSana: null});
      const sF = Math.abs((+a.summa || 0) - (+r.qiymat || 0)) > chegara;
      const dR = oqi(r.sana), dA = oqi(a.sana);
      const kF = !!(dR && dA && dR.getTime() !== dA.getTime()) || (!!dR !== !!dA);
      if (sF || kF) royxat.push({id: r.id, tur: sF ? "summa" : "sana", sanaHam: sF && kF, reyestr: r.qiymat, abs: +a.summa || 0,
        reyestrSana: r.sana, absSana: a.sana || null});
    });
    A.forEach((a, k) => { if (!R.has(k)) royxat.push({id: a.id, tur: "reyestrda-yoq", reyestr: null, abs: +a.summa || 0, reyestrSana: null, absSana: a.sana || null}); });
    const TARTIB = {"summa": 0, "absda-yoq": 1, "reyestrda-yoq": 2, "sana": 3};
    royxat.sort((a, b) => TARTIB[a.tur] - TARTIB[b.tur] || Math.abs((b.abs || 0) - (b.reyestr || 0)) - Math.abs((a.abs || 0) - (a.reyestr || 0)));
    /* Jami ming so'mgacha aniqlikda: solishtirishda 100 ming so'mlik yaxlitlash farqni yashirmasin */
    const aniq = (r, f) => yaxlit(r.reduce((a, x) => a + (+f(x) || 0), 0), 3);
    return {royxat, takror, reyestrJami: aniq([...R.values()], x => x.qiymat), absJami: aniq([...A.values()], x => x.summa)};
  }
  /* Ko'chirma qatorlari: sarlavha satri bo'yicha ustunlar topiladi (reyestr raqami, sana, summa).
     Summa so'mda kelsa (1 mln dan katta butun sonlar), mln so'mga o'tkaziladi. */
  function absQatorlari(qatorlar){
    if (!qatorlar || !qatorlar.length) return {qatorlar: [], xato: "Faylda qator yo'q"};
    const norm = s => String(s || "").toLowerCase().replace(/[^a-z0-9а-яё']/gi, "");
    const bosh = qatorlar[0].map(norm);
    /* Nomlar muhimlik tartibida: "Balansga olingan sana" ustuni summa deb olinmasin */
    const band = [];
    const top = nomlar => {
      for (const n of nomlar){ const i = bosh.findIndex((h, k) => band.indexOf(k) < 0 && h.indexOf(n) >= 0); if (i >= 0){ band.push(i); return i; } }
      return -1;
    };
    const iId = top(["reyestr", "inventar", "aktiv", "obyekt", "kod", "реестр", "инвентар", "объект", "id"]);
    const iSana = top(["sana", "дата", "date"]);
    const iSumma = top(["summa", "qoldiq", "сумма", "остаток", "qiymat", "balans"]);
    if (iId < 0 || iSumma < 0) return {qatorlar: [], xato: "Ustunlar topilmadi: kamida «reyestr raqami» va «summa» sarlavhasi kerak"};
    const son = s => { const t = String(s == null ? "" : s).replace(/\s| /g, "").replace(",", "."); return t === "" || isNaN(+t) ? null : +t; };
    const r = [], xatolar = [];
    qatorlar.slice(1).forEach((q, i) => {
      const id = String(q[iId] || "").trim(), s = son(q[iSumma]);
      if (!id && s == null) return;
      if (!id || s == null){ xatolar.push(i + 2); return; }
      r.push({id, sana: iSana >= 0 ? String(q[iSana] || "").trim() : "", summa: s});
    });
    if (r.length && r.every(x => Math.abs(x.summa) >= 1e6 || x.summa === 0) && r.some(x => Math.abs(x.summa) >= 1e6))
      r.forEach(x => { x.summa = yaxlit(x.summa / 1e6, 3); });
    return {qatorlar: r, xatolar};
  }
  /* MB hisobotini "topshirilgan" deb belgilashdan oldingi shart: shu davr ABS bilan solishtirilgan,
     farq bo'lsa izohi yozilgan. hisobot-mb.html va panel-moliya.html bir xil javob oladi */
  function mbTopshirishTayyormi(x){
    const s = x && x.solishtirish;
    if (!s || !s.sana || !s.kim) return {tayyor: false, sabab: "ABS bilan solishtirilmagan"};
    if (Math.abs(+s.farq || 0) > 0.05 && !String(s.izoh || "").trim()) return {tayyor: false, sabab: "Farq izohlanmagan"};
    return {tayyor: true, sabab: ""};
  }

  const API = {OY, oqi, sanaYoz, oraliq, oldingi, keyingi, juft, ichida, nomi, raqam, haftaRaqami, kunlarSoni,
    balansdagilar, balansHolati, zaxiraHolati, harakat, manbaBoshi, yozuvYoq, absSolishtir, absQatorlari, mbTopshirishTayyormi};
  if (typeof window !== "undefined") window.MKB_DAVR = API;
  if (typeof module !== "undefined" && module.exports) module.exports = API;
})();
