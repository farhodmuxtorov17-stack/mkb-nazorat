/* ============================================================
   malumot-indeks.js — obyektning nazorat indeksi
   Barcha ma'lumot fayllaridan KEYIN ulanadi.

   Nazorat indeksi — obyekt bank nazoratida qanchalik tartibda
   turganini ko'rsatuvchi yagona ko'rsatkich (0—100%). U beshta
   tekshiruvdan yig'iladi va hech qayerda saqlanmaydi, har safar
   joriy ma'lumotdan qayta hisoblanadi.
   ============================================================ */
(function () {
  const D = window.MKB_DATA;
  if (!D || D.__nazoratIndeksi) return;
  D.__nazoratIndeksi = true;

  const BUGUN = new Date(2026, 7, 26);
  const OYLAR = {yan: 0, fev: 1, mar: 2, apr: 3, may: 4, iyn: 5, iyl: 6,
                 avg: 7, sen: 8, okt: 9, noy: 10, dek: 11};

  /* "26-avg, 2026" yoki "02.06.2026" -> Date */
  function sana(matn) {
    if (!matn) return null;
    let m = /^(\d{1,2})[.\-/](\d{1,2})[.\-/](\d{4})$/.exec(String(matn).trim());
    if (m) return new Date(+m[3], +m[2] - 1, +m[1]);
    m = /^(\d{1,2})-([a-z']+),?\s*(\d{4})$/i.exec(String(matn).trim());
    if (m && OYLAR[m[2].toLowerCase()] !== undefined) return new Date(+m[3], OYLAR[m[2].toLowerCase()], +m[1]);
    return null;
  }
  function kunFarqi(a, b) { return Math.round((b - a) / 86400000); }

  /* Ko'rik davriyligi — mulk turiga qarab (kun) */
  function korikDavri(tur) {
    if (/Avtotransport|transport/i.test(tur)) return 30;
    if (/Yer|uchastka/i.test(tur)) return 180;
    return 90;
  }

  /* Bosqichli ball: qiymat me'yordan qancha oshgani */
  function pasayish(kun, meyor) {
    if (kun == null) return 0;
    if (kun <= meyor) return 1;
    if (kun <= meyor * 1.5) return 0.6;
    if (kun <= meyor * 2) return 0.3;
    return 0;
  }

  const OGIRLIK = [
    {kalit: "korik",    nom: "Ko'rik dolzarbligi", ogirlik: 25},
    {kalit: "sugurta",  nom: "Sug'urta himoyasi",  ogirlik: 25},
    {kalit: "baho",     nom: "Baho dolzarbligi",   ogirlik: 20},
    {kalit: "hujjat",   nom: "Hujjatlar to'liqligi", ogirlik: 15},
    {kalit: "kirish",   nom: "Kirish nazorati",    ogirlik: 15},
  ];

  const KESH = {};

  function indeks(y) {
    if (!y) return null;
    const id = typeof y === "string" ? y : y.id;
    if (KESH[id]) return KESH[id];
    const yoz = typeof y === "string" ? (D.YOZUVLAR || []).find(x => x.id === id) : y;
    if (!yoz) return null;

    const tarkib = [];

    /* 1. Ko'rik */
    const koriklar = (D.KORIKLAR || []).filter(k => k.obyektId === id);
    const OTKAZILDI = ["otkazildi", "o'tkazildi", "bajarildi", "yakunlandi"];
    const otkazilgan = koriklar
      .filter(k => OTKAZILDI.includes(String(k.holat).toLowerCase()))
      .map(k => sana(k.sana)).filter(Boolean).sort((a, b) => b - a);
    const meyorK = korikDavri(yoz.mulk.tur);
    const oxirgiKorik = otkazilgan[0] || null;
    const kunK = oxirgiKorik ? kunFarqi(oxirgiKorik, BUGUN) : null;
    const kechikkan = koriklar.some(k => k.holat === "kechikkan");
    let ballK = oxirgiKorik ? pasayish(kunK, meyorK) : 0.15;
    if (kechikkan) ballK = Math.min(ballK, 0.3);
    tarkib.push({
      kalit: "korik", nom: "Ko'rik dolzarbligi", ogirlik: 25, ulush: ballK,
      qiymat: oxirgiKorik ? kunK + " kun oldin" : "o'tkazilmagan",
      meyor: "har " + meyorK + " kunda",
      holat: ballK >= 0.9 ? "yaxshi" : ballK >= 0.5 ? "ogohlantirish" : "xavf",
      izoh: kechikkan ? "Rejadagi ko'rik muddati o'tgan" : "",
    });

    /* 2. Sug'urta */
    const polis = (D.SUGURTALAR || []).filter(s => s.obyektId === id)
      .sort((a, b) => (sana(b.tugash) || 0) - (sana(a.tugash) || 0))[0];
    const tugash = polis ? sana(polis.tugash) : null;
    const qolgan = tugash ? kunFarqi(BUGUN, tugash) : null;
    const qoplam = polis ? polis.summa : 0;
    const baho = yoz.mulk.baho || 0;
    /* polis holati matn bilan emas, tugash sanasi bilan baholanadi */
    const amalda = polis && qolgan != null && qolgan > 0 &&
                   String(polis.holat).toLowerCase().indexOf("to'xtat") < 0;
    let ballS = 0;
    if (amalda && qolgan > 30) ballS = qoplam >= baho ? 1 : 0.65;
    else if (amalda) ballS = 0.5;
    else if (polis) ballS = 0.1;
    tarkib.push({
      kalit: "sugurta", nom: "Sug'urta himoyasi", ogirlik: 25, ulush: ballS,
      qiymat: polis ? (qolgan > 0 ? qolgan + " kun qoldi" : "muddati tugagan") : "polis yo'q",
      meyor: "qoplama bahodan kam emas",
      holat: ballS >= 0.9 ? "yaxshi" : ballS >= 0.5 ? "ogohlantirish" : "xavf",
      izoh: polis && qoplam < baho ? "Qoplama baholangan qiymatdan past" : "",
    });

    /* 3. Baholash */
    const bahoSana = sana(yoz.mulk.bahoSana);
    const kunB = bahoSana ? kunFarqi(bahoSana, BUGUN) : null;
    const ballB = bahoSana ? pasayish(kunB, 365) : 0;
    tarkib.push({
      kalit: "baho", nom: "Baho dolzarbligi", ogirlik: 20, ulush: ballB,
      qiymat: bahoSana ? kunB + " kun oldin" : "baholanmagan",
      meyor: "12 oyda bir marta",
      holat: ballB >= 0.9 ? "yaxshi" : ballB >= 0.5 ? "ogohlantirish" : "xavf",
      izoh: "",
    });

    /* 4. Hujjatlar */
    const ZARUR = ["Texnik pasport", "Kadastr hujjati", "Qabul dalolatnomasi"];
    const hujjatlar = (D.HUJJATLAR || []).filter(h => h.obyektId === id);
    const bor = ZARUR.filter(z => hujjatlar.some(h => (h.tur || "").indexOf(z.split(" ")[0]) >= 0));
    const ballH = hujjatlar.length === 0 ? 0.2 : Math.max(0.2, bor.length / ZARUR.length);
    tarkib.push({
      kalit: "hujjat", nom: "Hujjatlar to'liqligi", ogirlik: 15, ulush: ballH,
      qiymat: hujjatlar.length + " ta hujjat",
      meyor: ZARUR.length + " ta majburiy hujjat",
      holat: ballH >= 0.9 ? "yaxshi" : ballH >= 0.5 ? "ogohlantirish" : "xavf",
      izoh: bor.length < ZARUR.length ? "Yetishmaydi: " + ZARUR.filter(z => bor.indexOf(z) < 0).join(", ") : "",
    });

    /* 5. Kirish nazorati */
    const nuqtalar = (D.KIRISH_NUQTALARI || []).filter(k => k.obyektId === id);
    const onlayn = nuqtalar.filter(k => k.holat === "onlayn").length;
    const ochiqHodisa = (D.XAVFSIZLIK_HODISALARI || [])
      .filter(h => h.obyektId === id && h.holat !== "yopildi").length;
    let ballK2 = 0;
    if (nuqtalar.length) {
      ballK2 = onlayn / nuqtalar.length;
      if (ochiqHodisa) ballK2 = Math.max(0, ballK2 - Math.min(0.6, ochiqHodisa * 0.2));
    }
    tarkib.push({
      kalit: "kirish", nom: "Kirish nazorati", ogirlik: 15, ulush: ballK2,
      qiymat: nuqtalar.length ? onlayn + " / " + nuqtalar.length + " nuqta onlayn" : "nuqta yo'q",
      meyor: "barcha nuqta onlayn",
      holat: ballK2 >= 0.9 ? "yaxshi" : ballK2 >= 0.5 ? "ogohlantirish" : "xavf",
      izoh: ochiqHodisa ? ochiqHodisa + " ta yopilmagan hodisa" : "",
    });

    const ball = Math.round(tarkib.reduce((a, t) => a + t.ulush * t.ogirlik, 0));
    const natija = {
      obyektId: id,
      ball: ball,
      daraja: ball >= 85 ? "yuqori" : ball >= 70 ? "barqaror" : ball >= 50 ? "past" : "kritik",
      darajaNomi: ball >= 85 ? "Yuqori nazorat" : ball >= 70 ? "Barqaror"
                : ball >= 50 ? "E'tibor talab" : "Kritik",
      tarkib: tarkib,
      zaif: tarkib.filter(t => t.holat !== "yaxshi").sort((a, b) => a.ulush - b.ulush),
    };
    KESH[id] = natija;
    return natija;
  }

  function jamlama(royxat) {
    const r = royxat || D.YOZUVLAR || [];
    const ballar = r.map(y => indeks(y)).filter(Boolean);
    const ortacha = ballar.length ? Math.round(ballar.reduce((a, b) => a + b.ball, 0) / ballar.length) : 0;
    const daraja = {yuqori: 0, barqaror: 0, past: 0, kritik: 0};
    ballar.forEach(b => daraja[b.daraja]++);
    return {ortacha: ortacha, daraja: daraja, jami: ballar.length};
  }

  /* Har bir yozuvga tayyor ball — eski nazoratBall maydonining o'rniga */
  (D.YOZUVLAR || []).forEach(y => {
    const n = indeks(y);
    if (n) y.mulk.nazoratBall = n.ball;
  });

  D.nazoratIndeksi = indeks;
  D.nazoratJamlama = jamlama;
  D.NAZORAT_OGIRLIK = OGIRLIK;
})();
