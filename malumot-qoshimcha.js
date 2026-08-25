/* ============================================================
   malumot-qoshimcha.js — hosilaviy kolleksiyalar
   malumot.js dan KEYIN ulanadi; barcha yozuvlar YOZUVLARdan
   deterministik hosil qilinadi (Д-1: yagona manba, nusxasiz).
   ============================================================ */
(function(){
  const D = window.MKB_DATA;
  if (!D) return;
  const faol = D.YOZUVLAR;

  /* ---------- Advokatlar (yuridik bo'lim shartnoma asosida) ---------- */
  D.ADVOKATLAR = [
    {id: "AD-01", ism: "Rahimov Sherzod", litsenziya: "AD 004112", ixtisos: "Fuqarolik ishlari", tel: "+998 90 711 24 08", tajriba: "11 yil"},
    {id: "AD-02", ism: "Karimova Nilufar", litsenziya: "AD 003877", ixtisos: "Iqtisodiy nizolar", tel: "+998 93 402 18 55", tajriba: "8 yil"},
    {id: "AD-03", ism: "To'xtayev Alisher", litsenziya: "AD 005204", ixtisos: "Ijro ishlari", tel: "+998 97 133 90 12", tajriba: "14 yil"},
    {id: "AD-04", ism: "Salimova Gulnora", litsenziya: "AD 004930", ixtisos: "Bank huquqi", tel: "+998 91 556 71 43", tajriba: "9 yil"},
    {id: "AD-05", ism: "Ergashev Botir", litsenziya: "AD 002641", ixtisos: "Mulk huquqi", tel: "+998 99 810 33 67", tajriba: "17 yil"},
  ];
  const advokatNomi = i => D.ADVOKATLAR[i % D.ADVOKATLAR.length].ism;

  /* ---------- Sud majlislari (sud bosqichidagi ishlardan) ---------- */
  const ZALLAR = ["1-zal", "2-zal", "4-zal", "6-zal"];
  const SOATLAR = ["09:30", "11:00", "14:30", "16:00"];
  D.SUD_MAJLISLAR = [];
  faol.forEach((y, i) => {
    if (!y.ish || !y.ish.sud || y.ish.sud === "—") return;
    const asos = 2 + (i % 9);
    D.SUD_MAJLISLAR.push({
      id: "SM-2026/0" + (140 + i * 7),
      ishRaqam: y.ish.raqam, obyektId: y.id, obyekt: y.mulk.qisqa,
      sud: y.ish.sud, sana: "0" + asos + "-sen, 2026", soat: SOATLAR[i % SOATLAR.length],
      zal: ZALLAR[i % ZALLAR.length], advokat: advokatNomi(i),
      mavzu: i % 2 ? "Asosiy muhokama" : "Dalillarni o'rganish",
      holat: i % 3 === 2 ? "otkazildi" : "rejada",
    });
  });

  /* ---------- Ijara (balansdagi ayrim obyektlar) ---------- */
  const IJARACHILAR = ["«Savdo Plyus» MChJ", "«Oq Tepa Servis» MChJ", "Norqulov Jamshid",
    "«Chust Textile» QK", "«Farovon Market» MChJ"];
  const balansda = y => ["musodara", "auksion"].includes(y.ish.bosqich);
  D.IJARA = faol
    .filter((y, i) => balansda(y) && i % 2 === 1)
    .map((y, i) => ({
      id: "IJ-2026/00" + (31 + i * 4),
      obyektId: y.id, obyekt: y.mulk.qisqa, hudud: y.mulk.hudud,
      ijarachi: IJARACHILAR[i % IJARACHILAR.length],
      oylik: Math.round(y.mulk.baho * 0.9) / 100,      /* mln so'm, baho ‰ */
      boshlanish: "01-iyl, 2026", tugash: "01-iyl, 2027",
      tolangan: 2, jami: 12, holat: i % 3 === 1 ? "kechikkan" : "amalda",
    }));

  /* ---------- Auksion takliflari (savdo mijozlaridan) ---------- */
  D.TAKLIFLAR = [];
  Object.entries(D.SAVDO_MIJOZLAR).forEach(([obyektId, m], k) => {
    (m.mijozlar || []).forEach((mij, i) => {
      const y = D.OBYEKT_INDEKS[obyektId];
      if (!y) return;
      const baho = y.baho || 500;
      D.TAKLIFLAR.push({
        id: "TK-2026/0" + (200 + k * 10 + i),
        obyektId, obyekt: y.qisqa || y.nom, kim: mij[0], turi: mij[1],
        summa: Math.round(baho * (100 + 3 * i + (k % 4)) ) / 100,
        sana: (12 + ((k + i) % 14)) + "-avg, 2026",
        holat: mij[2] === "muzokara" ? "muzokarada" : i === 0 ? "yetakchi" : "korib chiqilmoqda",
      });
    });
  });

  /* ---------- Xaridorlar reyestri ---------- */
  const korilgan = new Set();
  D.XARIDORLAR = [];
  D.TAKLIFLAR.forEach(t => {
    if (korilgan.has(t.kim)) return;
    korilgan.add(t.kim);
    D.XARIDORLAR.push({
      id: "XR-" + String(D.XARIDORLAR.length + 11).padStart(3, "0"),
      nom: t.kim, tur: t.turi,
      ishtirok: D.TAKLIFLAR.filter(x => x.kim === t.kim).length,
      yutgan: 0, holat: "faol",
    });
  });
  D.ARXIV.forEach((a, i) => {
    if (korilgan.has(a.xaridor)) {
      const x = D.XARIDORLAR.find(v => v.nom === a.xaridor);
      if (x) x.yutgan++;
      return;
    }
    korilgan.add(a.xaridor);
    D.XARIDORLAR.push({
      id: "XR-" + String(D.XARIDORLAR.length + 11).padStart(3, "0"),
      nom: a.xaridor, tur: a.xaridor.includes("MChJ") || a.xaridor.includes("QK") ? "Yuridik shaxs" : "Jismoniy shaxs",
      ishtirok: 1, yutgan: 1, holat: "faol",
    });
  });

  /* ---------- Saqlash xarajatlari (balansdagi obyektlar) ---------- */
  const XARAJAT_TURLARI = [
    ["Qo'riqlash xizmati", 4.2], ["Kommunal to'lovlar", 2.8],
    ["Mulk solig'i", 6.5], ["Joriy ta'mirlash", 3.6],
  ];
  D.XARAJATLAR = [];
  faol.filter(balansda).forEach((y, i) => {
    XARAJAT_TURLARI.forEach(([tur, asos], j) => {
      if ((i + j) % 4 === 3) return;
      D.XARAJATLAR.push({
        id: "XJ-2026/0" + (300 + i * 10 + j),
        obyektId: y.id, obyekt: y.mulk.qisqa, tur,
        summa: Math.round(asos * (10 + ((i * 3 + j * 5) % 7)) ) / 10,   /* mln so'm */
        sana: (3 + j * 6 + (i % 4)) + "-avg, 2026",
        holat: (i + j) % 3 === 1 ? "tolanmagan" : "tolangan",
      });
    });
  });

  /* ---------- Restrukturizatsiya arizalari ---------- */
  D.RESTRUKTURIZATSIYA = faol
    .filter(y => y.qarz.kunlar >= 90 && y.qarz.kunlar <= 240)
    .map((y, i) => ({
      id: "RS-2026/00" + (18 + i * 3),
      obyektId: y.id, mijoz: y.mijoz.nom, shartnoma: y.shartnoma.raqam,
      qarz: y.qarzMatn, kunlar: y.qarz.kunlar,
      taklif: i % 2 ? "Muddatni 18 oyga uzaytirish" : "Yangi to'lov grafigi (bosqichma-bosqich)",
      sana: (4 + i * 5) + "-avg, 2026",
      holat: i % 3 === 0 ? "korib chiqilmoqda" : i % 3 === 1 ? "kelishilgan" : "rad etilgan",
    }));

  /* ---------- Id berish (id'siz kolleksiyalar uchun) ---------- */
  (D.ARXIV || []).forEach(a => { if (!a.id) a.id = a.kod; });
  (D.BAHOLASHLAR || []).forEach((b, i) => { if (!b.id) b.id = "BH-2026/0" + (110 + i * 3); });
  (D.SUGURTALAR || []).forEach(s => { if (!s.id) s.id = s.polis; });
  (D.HODISALAR || []).forEach(h => { if (!h.id) h.id = h.kod; });
  (D.HUJJATLAR || []).forEach((h, i) => { if (!h.id) h.id = "HJ-" + String(101 + i); });
  (D.TASDIQLAR || []).forEach((t, i) => { if (!t.id) t.id = "TS-" + String(41 + i); });
  (D.MENING_VAZIFALARIM || []).forEach((v, i) => { if (!v.id) v.id = "VZ-" + String(71 + i); });
  (D.BILDIRISHLAR || []).forEach((b, i) => { if (!b.id) b.id = "BL-" + String(21 + i); });

  /* ---------- Sug'urta da'volari (jiddiy hodisalardan) ---------- */
  D.SUGURTA_DAVOLARI = (D.HODISALAR || [])
    .filter(h => h.jiddiylik === "yuqori")
    .slice(0, 4)
    .map((h, i) => {
      const y = D.OBYEKT_INDEKS[h.obyektId] || {};
      const polis = (D.SUGURTALAR || []).find(s => s.obyektId === h.obyektId);
      return {
        id: "SD-2026/00" + (12 + i * 5),
        obyektId: h.obyektId, obyekt: y.qisqa || h.obyektId,
        polis: polis ? polis.polis : "—",
        kompaniya: polis ? polis.kompaniya : "O'zbekinvest",
        hodisa: h.hodisa, sana: h.vaqt,
        summa: Math.round((y.baho || 300) * (4 + i)) / 100,
        holat: i === 0 ? "korib chiqilmoqda" : i % 2 ? "tolangan" : "topshirilgan",
      };
    });

  /* ---------- Taxalluslar (yagona nom bilan murojaat uchun) ---------- */
  D.POLISLAR = D.SUGURTALAR;
  D.VAZIFALAR = D.MENING_VAZIFALARIM;

  /* ---------- Moslik tekshiruviga qo'shimcha ---------- */
  const aslTekshiruv = D.moslikTekshiruvi;
  D.moslikTekshiruvi = function(){
    const xatolar = aslTekshiruv ? aslTekshiruv() : [];
    D.SUD_MAJLISLAR.forEach(m => {
      if (!D.OBYEKT_INDEKS[m.obyektId]) xatolar.push("SUD_MAJLISLAR: obyekt yo'q " + m.obyektId);
    });
    D.TAKLIFLAR.forEach(t => {
      if (!D.OBYEKT_INDEKS[t.obyektId]) xatolar.push("TAKLIFLAR: obyekt yo'q " + t.obyektId);
    });
    D.IJARA.forEach(x => {
      if (!D.OBYEKT_INDEKS[x.obyektId]) xatolar.push("IJARA: obyekt yo'q " + x.obyektId);
    });
    D.XARAJATLAR.forEach(x => {
      if (!D.OBYEKT_INDEKS[x.obyektId]) xatolar.push("XARAJATLAR: obyekt yo'q " + x.obyektId);
    });
    return xatolar;
  };
})();
