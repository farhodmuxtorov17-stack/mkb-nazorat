/* ============================================================
   malumot-kengaytma.js — demo ma'lumot bazasini kengaytirish
   malumot-qoshimcha.js dan KEYIN ulanadi.
   Maqsad: tizim real ish hajmi bilan ko'rinsin (60+ obyekt, 40+ ko'rik,
   auksion lotlari, arxiv, vazifalar) — barchasi deterministik hosil qilinadi.
   ============================================================ */
(function(){
  const D = window.MKB_DATA;
  if (!D || D.__kengaytirilgan) return;
  D.__kengaytirilgan = true;

  /* ---------- deterministik "tasodif" ---------- */
  let urug = 20260826;
  const rnd = () => { urug = (urug * 1103515245 + 12345) & 0x7fffffff; return urug / 0x7fffffff; };
  const tanla = a => a[Math.floor(rnd() * a.length)];
  const oraliq = (a, b) => a + Math.floor(rnd() * (b - a + 1));

  const HUDUDLAR = [
    ["Toshkent sh.", "Toshkent sh., Yunusobod", "Toshkent shahar filiali"],
    ["Toshkent sh.", "Toshkent sh., Chilonzor", "Chilonzor filiali"],
    ["Toshkent sh.", "Toshkent sh., Mirzo Ulug'bek", "Toshkent shahar filiali"],
    ["Toshkent vil.", "Toshkent vil., Qibray", "Toshkent viloyat filiali"],
    ["Toshkent vil.", "Toshkent vil., Zangiota", "Toshkent viloyat filiali"],
    ["Samarqand", "Samarqand sh., Registon", "Samarqand filiali"],
    ["Samarqand", "Urgut tumani", "Samarqand filiali"],
    ["Namangan", "Namangan sh., Davlatobod", "Namangan filiali"],
    ["Farg'ona", "Farg'ona sh., Yangi bozor", "Farg'ona filiali"],
    ["Andijon", "Andijon sh., Bog'ishamol", "Andijon filiali"],
    ["Buxoro", "Buxoro sh., Kogon yo'li", "Buxoro filiali"],
    ["Xorazm", "Urganch sh., Al-Xorazmiy", "Xorazm filiali"],
    ["Qashqadaryo", "Qarshi sh., Mustaqillik", "Qashqadaryo filiali"],
    ["Surxondaryo", "Termiz sh., Sharq", "Surxondaryo filiali"],
    ["Jizzax", "Jizzax sh., Sharof Rashidov", "Jizzax filiali"],
    ["Navoiy", "Navoiy sh., Galaba", "Navoiy filiali"],
  ];

  const TURLAR = [
    ["Kvartira", ["bino_turar.webp", "bino_9.webp"], [58, 124], "m²", 380, 980],
    ["Turar-joy majmuasi", ["bino_9.webp", "bino_qavatlar.webp"], [1200, 4600], "m²", 2600, 9200],
    ["Savdo maydoni", ["bino_mall.webp", "bino_humo.webp"], [180, 1250], "m²", 900, 5400],
    ["Ofis binosi", ["bino_tower.webp", "bino_humo.webp"], [240, 1800], "m²", 1200, 7400],
    ["Ishlab chiqarish", ["bino_qavatlar.webp", "bino_9.webp"], [800, 5200], "m²", 1800, 8600],
    ["Ombor", ["bino_mall.webp", "bino_qavatlar.webp"], [600, 3400], "m²", 700, 4200],
    ["Yer uchastkasi", ["bino_yer.webp"], [1200, 24000], "m²", 300, 2400],
    ["Dala hovli", ["bino_dacha.webp", "bino_turar.webp"], [180, 640], "m²", 260, 1500],
    ["Avtotransport", ["kam_avto.webp", "bino_yer.webp"], [1, 1], "dona", 120, 860],
  ];

  const NOM_BOSH = {
    "Kvartira": ["12-kvartal, 45-uy", "9-kvartal, 12-uy", "Bunyodkor ko'chasi, 8-uy",
                 "Navoiy ko'chasi, 21-uy", "Chinor mavzesi, 3-uy"],
    "Turar-joy majmuasi": ["Nurafshon turar-joy majmuasi", "Yangi Hayot majmuasi",
                           "Baraka Residence", "Chinor Park majmuasi"],
    "Savdo maydoni": ["Savdo markazi, 2-qavat", "Bozor rastasi bloki", "Savdo pavilyoni",
                      "Do'kon maydoni, 1-qavat"],
    "Ofis binosi": ["Biznes markaz, 3-qavat", "Ma'muriy bino", "Ofis bloki A",
                    "Ish markazi, 5-qavat"],
    "Ishlab chiqarish": ["Tekstil sexi", "Non zavodi bloki", "Metall konstruksiya sexi",
                         "Oziq-ovqat ishlab chiqarish sexi"],
    "Ombor": ["Logistika ombori", "Sovutkichli ombor", "Materiallar ombori", "Tranzit ombori"],
    "Yer uchastkasi": ["Yer uchastkasi", "Sanoat yer uchastkasi", "Qurilish uchun yer uchastkasi"],
    "Dala hovli": ["Dala hovlisi", "Bog' uyi", "Yozgi dala hovli"],
    "Avtotransport": ["Chevrolet Cobalt (2022)", "Isuzu yuk avtomobili (2021)",
                      "Chevrolet Malibu (2023)", "MAN tortuvchi (2020)"],
  };

  const MIJOZ_JIS = ["Karimov Javlon", "Ergasheva Dilnoza", "Yusupova Nodira", "To'xtasinov Sherzod",
    "Rasulov Otabek", "Islomov Bekzod", "Nazarova Malika", "Qodirov Alisher", "Sattorova Gulnoza",
    "Umarov Doniyor", "Hakimova Zulfiya", "Ochilov Sanjar", "Yo'ldosheva Sevara", "Aliyev Rustam",
    "Nurmatova Kamola", "Sobirov Ulug'bek", "Xolmatov Jasur", "Ibrohimova Nilufar"];
  const MIJOZ_YUR = ["«Zarafshon Tekstil» MChJ", "«Baraka Savdo» MChJ", "«Oq Tepa Servis» MChJ",
    "«Chust Textile» QK", "«Farovon Market» MChJ", "«Nurli Yo'l» QK", "«Sharq Logistika» MChJ",
    "«Bo'ston Agro» fermer xo'jaligi", "«Temir Konstruksiya» MChJ", "«Mehr Oziq-ovqat» MChJ",
    "«Zamin Qurilish» MChJ", "«Sifat Print» MChJ"];

  const MASULLAR = ["Sattorov Jasur", "Karimova Feruza", "Yo'ldoshev Sardor", "Tosheva Barno",
    "Rahimov Sherzod", "Salimova Gulnora", "Ergashev Botir", "Nazarov Aziz"];

  const BOSQICHLAR = D.BOSQICHLAR.map(b => b.kalit);

  function pulMatn(mln){
    return mln >= 1000
      ? (mln / 1000).toFixed(2).replace(".", ",") + " mlrd so'm"
      : String(Math.round(mln * 10) / 10).replace(".", ",") + " mln so'm";
  }
  function son(n){ return new Intl.NumberFormat("ru-RU").format(n); }

  /* ---------- YOZUVLAR (asosiy reyestr) ---------- */
  const bor = D.YOZUVLAR.length;
  const KERAK = 64;
  const yangiYozuvlar = [];
  for (let i = bor; i < KERAK; i++){
    const t = tanla(TURLAR);
    const [tur, rasmlar, mayd, birlik, bahoMin, bahoMaks] = t;
    const [hudud, manzilBosh, filial] = tanla(HUDUDLAR);
    const yur = rnd() < 0.42;
    const mijozNomi = yur ? tanla(MIJOZ_YUR) : tanla(MIJOZ_JIS);
    const nomQisqa = tanla(NOM_BOSH[tur]);
    const baho = oraliq(bahoMin, bahoMaks);
    const qoplashFoiz = oraliq(58, 260);
    const qarz = Math.max(24, Math.round(baho / (qoplashFoiz / 100)));
    const kunlar = oraliq(35, 720);
    const bosqich = kunlar > 500 ? tanla(["ijro", "musodara", "auksion"])
                  : kunlar > 300 ? tanla(["qaror", "ijro", "sud"])
                  : kunlar > 150 ? tanla(["sud", "davo"]) : tanla(["ogohlantirish", "davo"]);
    const bIndeks = BOSQICHLAR.indexOf(bosqich);
    const bosq = D.BOSQICHLAR[bIndeks < 0 ? 0 : bIndeks];
    const yil = 2025 + (i % 2);
    const id = "AK-" + yil + "/" + String(1000 + i * 37 % 8999).padStart(4, "0");
    const maydon = tur === "Avtotransport" ? "1 dona" : son(oraliq(mayd[0], mayd[1])) + " " + birlik;
    const asosiy = Math.round(qarz * 0.82);
    const foiz = qarz - asosiy;
    const tasnif = D.tasnifla ? D.tasnifla(kunlar) : null;
    const zaxira = tasnif ? Math.round(qarz * tasnif.zaxira) / 100 : 0;
    const rasm = "assets/" + tanla(rasmlar);
    yangiYozuvlar.push({
      id,
      mijoz: {nom: mijozNomi, tur: yur ? "Yuridik shaxs" : "Jismoniy shaxs",
        raqam: yur ? "INN " + oraliq(200, 599) + " " + oraliq(100, 999) + " " + oraliq(100, 999)
                   : "PINFL " + oraliq(3000, 5999) + " " + oraliq(1000, 9999) + " " + oraliq(1000, 9999),
        belgi: mijozNomi.replace(/[«»]/g, "").split(" ").map(v => v[0]).join("").slice(0, 2).toUpperCase(),
        yur, tel: "+998 " + tanla(["90", "93", "94", "97", "99", "71"]) + " " +
          oraliq(100, 999) + " " + oraliq(10, 99) + " " + oraliq(10, 99)},
      filial,
      shartnoma: {raqam: "KR-" + (yil - 1) + "/" + oraliq(1000, 9999), tur: tanla(
        ["Mikroqarz", "Tadbirkorlik krediti", "Iste'mol krediti", "Ipoteka", "Agro kredit"]),
        sana: oraliq(1, 28) + "-" + tanla(["yan", "fev", "mar", "apr", "may", "iyn", "iyl", "avg"]) + ", " + (yil - 1),
        berilgan: pulMatn(Math.round(qarz * 1.15))},
      qarz: {asosiy, foiz, kunlar, jami: qarz},
      mulk: {tur, nom: nomQisqa + " · " + manzilBosh, qisqa: nomQisqa, hudud,
        hududToliq: manzilBosh, manzil: manzilBosh + ", " + oraliq(1, 120) + "-uy",
        maydon, baho, bahoSana: oraliq(1, 28) + "." + String(oraliq(1, 12)).padStart(2, "0") + "." + yil,
        sugurta: rnd() < 0.72 ? "Amalda" : "Muddati tugagan", rasm, rasmKichik: rasm,
        nazoratBall: oraliq(52, 96)},
      ish: {raqam: "UI-" + yil + "/" + String(100 + i).padStart(4, "0"), bosqich,
        masul: tanla(MASULLAR),
        sud: bIndeks >= 2 ? tanla(["Toshkent shahar sudi", "Toshkent viloyat sudi",
          "Samarqand sudi", "Namangan sudi", "Buxoro sudi"]) : "—",
        qaror: bIndeks >= 3 ? "2-" + oraliq(1000, 1999) + "/" + yil : "—",
        ijro: bIndeks >= 4 ? "IH-" + yil + "/" + oraliq(1000, 9999) : "—",
        muddat: oraliq(1, 28) + "." + String(oraliq(9, 12)).padStart(2, "0") + ".2026",
        kun: kunlar, shoshilinch: kunlar > 480,
        tarix: [[oraliq(1, 28) + "." + String(oraliq(1, 8)).padStart(2, "0") + "." + yil,
          "Yozma ogohlantirish yuborildi", "Qarzdorga rasmiy talabnoma topshirildi."]],
        hujjatlar: [["PDF", "Ta'minot shartnomasi", oraliq(1, 3) + "," + oraliq(1, 9) + " MB"],
                    ["PDF", "Baholash hisoboti", oraliq(1, 2) + "," + oraliq(1, 9) + " MB"]]},
      tolov: Array.from({length: 12}, () => rnd() > 0.32),
      bosqichNomi: bosq.nom, bosqichChip: bosq.chip,
      holat: {nom: bosq.nom, rang: bosq.rang},
      qarzMatn: pulMatn(qarz), asosiyMatn: pulMatn(asosiy), foizMatn: pulMatn(foiz),
      bahoMatn: pulMatn(baho), qarzSon: son(qarz),
      tasnif, zaxira, zaxiraMatn: pulMatn(zaxira), ochiqQoldiq: 0,
      qoplash: Math.round(baho / qarz * 100),
    });
  }
  D.YOZUVLAR = D.YOZUVLAR.concat(yangiYozuvlar);
  yangiYozuvlar.forEach(y => {
    D.OBYEKT_INDEKS[y.id] = {id: y.id, nom: y.mulk.nom, qisqa: y.mulk.qisqa, tur: y.mulk.tur,
      hudud: y.mulk.hudud, manzil: y.mulk.manzil, baho: y.mulk.baho, rasm: y.mulk.rasm,
      rasmKichik: y.mulk.rasmKichik, maydon: y.mulk.maydon};
  });

  /* ---------- KORIKLAR ---------- */
  const INSPEKTORLAR = ["Sattorov Jasur", "Karimova Feruza", "Yo'ldoshev Sardor", "Tosheva Barno",
    "Nazarov Aziz", "Ergashev Botir"];
  const KORIK_TUR = ["Rejali", "Navbatdan tashqari", "Qabul ko'rigi", "Savdo oldi"];
  const KORIK_HOLAT = ["rejada", "otkazildi", "otkazildi", "kechikkan"];
  const yangiKorik = [];
  yangiYozuvlar.forEach((y, i) => {
    if (i % 2) return;
    const holat = tanla(KORIK_HOLAT);
    yangiKorik.push({
      id: "KO-2026/" + String(500 + i).padStart(4, "0"),
      obyektId: y.id, tur: tanla(KORIK_TUR),
      sana: oraliq(1, 28) + "-" + tanla(["avg", "sen", "okt"]) + ", 2026",
      holat, inspektor: tanla(INSPEKTORLAR),
      baho: holat === "otkazildi" ? tanla(["A'lo", "Qoniqarli", "Nuqsonli"]) : "",
      izoh: holat === "otkazildi"
        ? tanla(["Obyekt saqlanish holati qoniqarli, muhrlar butun.",
                 "Kommunikatsiyalarda kichik nuqsonlar aniqlandi.",
                 "Tashqi konstruksiyalar butun, ruxsatsiz foydalanish belgilari yo'q."])
        : "Rejaga muvofiq ko'rik o'tkaziladi.",
    });
  });
  D.KORIKLAR = D.KORIKLAR.concat(yangiKorik);

  /* ---------- SOTUV (auksion lotlari) ---------- */
  const auksionYozuv = D.YOZUVLAR.filter(y => ["musodara", "auksion"].includes(y.ish.bosqich));
  const yangiLot = [];
  auksionYozuv.forEach((y, i) => {
    if (D.SOTUV.some(l => l.id === y.id)) return;
    yangiLot.push({id: y.id, nom: y.mulk.qisqa, tur: y.mulk.tur, hudud: y.mulk.hudud,
      hududToliq: y.mulk.hududToliq, baho: y.mulk.baho, rasm: y.mulk.rasm,
      ish: y.ish.raqam, ijro: y.ish.ijro,
      bosqich: D.AUKSION_BOSQICH[i % D.AUKSION_BOSQICH.length][0],
      korik: oraliq(0, 4)});
  });
  D.SOTUV = D.SOTUV.concat(yangiLot);

  /* ---------- TAKLIFLAR ---------- */
  const XARIDOR_NOM = MIJOZ_YUR.concat(MIJOZ_JIS).slice(0, 22);
  const yangiTaklif = [];
  yangiLot.forEach((l, i) => {
    const soni = oraliq(0, 3);
    for (let k = 0; k < soni; k++){
      yangiTaklif.push({
        id: "TK-2026/" + String(400 + i * 5 + k).padStart(4, "0"),
        obyektId: l.id, obyekt: l.nom, kim: tanla(XARIDOR_NOM),
        turi: rnd() < 0.5 ? "Yuridik shaxs" : "Jismoniy shaxs",
        summa: Math.round(l.baho * (0.92 + rnd() * 0.28)),
        sana: oraliq(1, 28) + "-avg, 2026",
        holat: k === 0 ? "yetakchi" : tanla(["korib chiqilmoqda", "muzokarada"]),
      });
    }
  });
  D.TAKLIFLAR = (D.TAKLIFLAR || []).concat(yangiTaklif);

  /* ---------- ARXIV ---------- */
  const yangiArxiv = [];
  for (let i = 0; i < 14; i++){
    const t = tanla(TURLAR);
    const nom = tanla(NOM_BOSH[t[0]]);
    const summa = oraliq(t[4], t[5]);
    const yil = tanla(["2024", "2025", "2026"]);
    const kod = "AK-" + (parseInt(yil, 10) - 2) + "/" + String(200 + i * 13).padStart(4, "0");
    yangiArxiv.push({id: kod, kod, nom, tur: t[0],
      sotilgan: oraliq(1, 28) + "-" + tanla(["yan", "mar", "may", "iyl", "sen"]) + ", " + yil,
      yil, xaridor: tanla(XARIDOR_NOM), summa,
      ish: "UI-" + (parseInt(yil, 10) - 2) + "/" + oraliq(100, 999),
      qabul: oraliq(1, 28) + "-" + tanla(["fev", "apr", "iyn"]) + ", " + (parseInt(yil, 10) - 1),
      nazorat: oraliq(6, 22) + " oy", rasm: "assets/" + tanla(t[1])});
  }
  D.ARXIV = D.ARXIV.concat(yangiArxiv);

  /* ---------- SUGURTALAR ---------- */
  const KOMPANIYA = ["O'zbekinvest", "Kafolat sug'urta", "Gross Insurance", "Alskom", "Apex Insurance"];
  const yangiPolis = [];
  yangiYozuvlar.forEach((y, i) => {
    if (i % 3) return;
    yangiPolis.push({id: "PL-2026/" + String(12000 + i).padStart(5, "0"),
      obyektId: y.id, polis: "PL-2026/" + String(12000 + i).padStart(5, "0"),
      kompaniya: tanla(KOMPANIYA), summa: y.mulk.baho,
      tugash: oraliq(1, 28) + "-" + tanla(["sen", "okt", "noy", "dek", "yan"]) + ", " +
        tanla(["2026", "2027"]),
      holat: rnd() < 0.78 ? "amalda" : "muddati tugagan", obyekt: y.mulk.qisqa});
  });
  D.SUGURTALAR = D.SUGURTALAR.concat(yangiPolis);
  D.POLISLAR = D.SUGURTALAR;

  /* ---------- BAHOLASHLAR ---------- */
  const BAHOLOVCHI = ["«Baholash Servis» MChJ", "«Expert Baho» MChJ", "«Milliy Baholash Markazi» DUK",
    "«Aniq Baho» MChJ"];
  const USUL = ["Qiyosiy yondashuv", "Daromad yondashuvi", "Xarajat yondashuvi"];
  const yangiBaho = [];
  yangiYozuvlar.forEach((y, i) => {
    if (i % 2) return;
    const avvalgi = Math.round(y.mulk.baho * (0.86 + rnd() * 0.2));
    yangiBaho.push({id: "BH-2026/" + String(300 + i).padStart(4, "0"),
      obyektId: y.id, sana: oraliq(1, 28) + "." + String(oraliq(1, 8)).padStart(2, "0") + ".2026",
      qiymat: y.mulk.baho, avvalgi, baholovchi: tanla(BAHOLOVCHI), usul: tanla(USUL),
      keyingi: "12 oydan so'ng", holat: "yakunlangan"});
  });
  D.BAHOLASHLAR = D.BAHOLASHLAR.concat(yangiBaho);

  /* ---------- HODISALAR ---------- */
  const HODISA_MATN = [
    ["yerto'lani suv bosishi — shikast", "yuqori"], ["uskunalar ro'yxatida kamomad", "o'rta"],
    ["sug'urta polisi muddati o'tdi", "yuqori"], ["ruxsatsiz ijaraga berish holati", "yuqori"],
    ["qiymatning jadal pasayishi", "o'rta"], ["muhr buzilgan holati aniqlandi", "yuqori"],
    ["kommunal qarzdorlik yuzaga keldi", "o'rta"], ["tomda oqish aniqlandi", "past"],
    ["hududda ruxsatsiz qurilish", "o'rta"], ["yong'in signalizatsiyasi ishlamayapti", "yuqori"],
  ];
  const yangiHodisa = [];
  yangiYozuvlar.slice(0, 18).forEach((y, i) => {
    const [matn, jid] = tanla(HODISA_MATN);
    yangiHodisa.push({id: "GH-2026-" + String(300 + i).padStart(5, "0"),
      kod: "#GH-2026-" + String(300 + i).padStart(5, "0"), obyektId: y.id,
      rang: jid === "yuqori" ? "#E2523A" : jid === "o'rta" ? "#E8A13C" : "#0E8D74",
      hodisa: matn, vaqt: tanla(["Bugun", "Kecha", "2 kun oldin"]) + ", " +
        oraliq(9, 18) + ":" + String(oraliq(0, 59)).padStart(2, "0"),
      jiddiylik: jid, ustun: tanla(["yangi", "bartaraf", "yopildi"])});
  });
  D.HODISALAR = D.HODISALAR.concat(yangiHodisa);

  /* ---------- VAZIFALAR ---------- */
  const VAZ = [
    ["Ko'rik dalolatnomasini imzolatish", "Ko'rik nazorati"],
    ["Sug'urta polisini yangilash", "Sug'urta"],
    ["Baholash hisobotini qabul qilish", "Baholash"],
    ["Auksion e'lonini joylash", "Realizatsiya"],
    ["Sud majlisiga hujjat tayyorlash", "Yuridik"],
    ["Balansga qabul dalolatnomasi", "Aktivlar reyestri"],
    ["Zaxira hisobini qayta ko'rish", "Tasnif va zaxira"],
    ["Obyekt fotosuratlarini yangilash", "Ko'rik nazorati"],
    ["Ijara to'lovini nazorat qilish", "Realizatsiya"],
    ["Kadastr hujjatini so'rash", "Aktivlar reyestri"],
  ];
  const yangiVazifa = [];
  VAZ.forEach((v, i) => {
    const y = yangiYozuvlar[i * 3 % yangiYozuvlar.length];
    yangiVazifa.push({id: "VZ-2026-" + String(200 + i), nom: v[0], tur: v[1],
      kod: y ? y.id : "", sana: "2026-08-" + String(24 + (i % 5)).padStart(2, "0"),
      vaqt: oraliq(9, 17) + ":00", bugunmi: i % 3 === 0,
      muhimlik: i % 4 === 0 ? "yuqori" : "oddiy", bajarildi: i % 5 === 0});
  });
  D.MENING_VAZIFALARIM = D.MENING_VAZIFALARIM.concat(yangiVazifa);
  D.VAZIFALAR = D.MENING_VAZIFALARIM;

  /* ---------- HUJJATLAR ---------- */
  const HUJ_TUR = ["Texnik pasport", "Kadastr hujjati", "Sud hujjati", "Shartnoma", "Dalolatnoma",
    "Baholash hisoboti", "Sug'urta polisi"];
  const yangiHujjat = [];
  yangiYozuvlar.slice(0, 26).forEach((y, i) => {
    const tur = tanla(HUJ_TUR);
    yangiHujjat.push({id: "HJ-" + (200 + i), nom: tur + " — " + y.mulk.qisqa,
      ikon: "pdf", iturl: "i-hujjat", obyektId: y.id, tur, teg: "pdf",
      sana: oraliq(1, 28) + "-avg, 2026",
      holat: rnd() < 0.7 ? "Tasdiqlangan" : "Ko'rib chiqilmoqda",
      hajm: oraliq(1, 6) + "," + oraliq(1, 9) + " MB"});
  });
  D.HUJJATLAR = D.HUJJATLAR.concat(yangiHujjat);

  /* ---------- MULOQOTLAR ---------- */
  const KANAL = ["Telefon", "SMS", "Xat", "Uchrashuv", "Ogohlantirish"];
  const NATIJA = ["Qarzni qayta ko'rib chiqish so'raldi", "To'lov jadvali muhokama qilindi",
    "Aloqaga chiqmadi", "Rasmiy talabnoma topshirildi", "Qisman to'lov va'da qilindi",
    "Obyektni ixtiyoriy topshirishga rozilik", "Restrukturizatsiya arizasi qabul qilindi"];
  yangiYozuvlar.forEach((y, i) => {
    if (i % 2) return;
    D.MULOQOTLAR[y.id] = Array.from({length: oraliq(1, 3)}, () => [
      oraliq(1, 28) + "-" + tanla(["iyn", "iyl", "avg"]) + ", 2026", tanla(KANAL), tanla(NATIJA)]);
  });

  /* ---------- PORTFEL ko'rsatkichlari (real songa moslash) ---------- */
  const jamiObyekt = D.YOZUVLAR.length;
  const jamiQarz = D.YOZUVLAR.reduce((a, y) => a + y.qarz.jami, 0);
  const jamiBaho = D.YOZUVLAR.reduce((a, y) => a + y.mulk.baho, 0);
  D.PORTFEL.jami = 1248;                       /* bank bo'yicha umumiy (statistik) */
  D.PORTFEL.reyestrda = jamiObyekt;            /* tizimda ochilgan yozuvlar */
  D.PORTFEL.bahoTrln = (jamiBaho / 1000000 * 8.4).toFixed(1).replace(".", ",");
  D.PORTFEL.holatlar.forEach(h => {
    const mos = D.YOZUVLAR.filter(y => y.bosqichNomi === h.nom || (y.holat && y.holat.nom === h.nom));
    if (mos.length) h.son = Math.max(h.son, mos.length);
  });

  /* ---------- Hosilaviy kolleksiyalarni qayta hisoblash ---------- */
  const balansda = y => ["musodara", "auksion"].includes(y.ish.bosqich);
  /* xarajatlar */
  const XAR_TUR = [["Qo'riqlash xizmati", 4.2], ["Kommunal to'lovlar", 2.8],
                   ["Mulk solig'i", 6.5], ["Joriy ta'mirlash", 3.6]];
  D.YOZUVLAR.filter(balansda).forEach((y, i) => {
    if (D.XARAJATLAR.some(x => x.obyektId === y.id)) return;
    XAR_TUR.forEach(([tur, asos], j) => {
      if ((i + j) % 3 === 2) return;
      D.XARAJATLAR.push({id: "XJ-2026/" + String(600 + i * 10 + j),
        obyektId: y.id, obyekt: y.mulk.qisqa, tur,
        summa: Math.round(asos * (8 + ((i + j) % 9)) * 10) / 10,
        sana: oraliq(1, 28) + "-avg, 2026",
        holat: (i + j) % 3 === 1 ? "tolanmagan" : "tolangan"});
    });
  });
  /* ijara */
  const IJARACHI = ["«Savdo Plyus» MChJ", "«Oq Tepa Servis» MChJ", "Norqulov Jamshid",
    "«Chust Textile» QK", "«Farovon Market» MChJ", "«Zamin Qurilish» MChJ"];
  D.YOZUVLAR.filter(balansda).forEach((y, i) => {
    if (i % 3 || D.IJARA.some(v => v.obyektId === y.id)) return;
    D.IJARA.push({id: "IJ-2026/" + String(100 + i).padStart(4, "0"),
      obyektId: y.id, obyekt: y.mulk.qisqa, hudud: y.mulk.hudud,
      ijarachi: tanla(IJARACHI), oylik: Math.round(y.mulk.baho * 0.009 * 10) / 10,
      boshlanish: "01-iyl, 2026", tugash: "01-iyl, 2027",
      tolangan: oraliq(1, 8), jami: 12, holat: rnd() < 0.75 ? "amalda" : "kechikkan"});
  });
  /* sud majlislari */
  const ZALLAR = ["1-zal", "2-zal", "4-zal", "6-zal", "8-zal"];
  const SOATLAR = ["09:30", "11:00", "14:30", "16:00"];
  const ADVOKAT = D.ADVOKATLAR.map(a => a.ism);
  D.YOZUVLAR.forEach((y, i) => {
    if (!y.ish.sud || y.ish.sud === "—" || D.SUD_MAJLISLAR.some(m => m.obyektId === y.id)) return;
    D.SUD_MAJLISLAR.push({id: "SM-2026/" + String(300 + i).padStart(4, "0"),
      ishRaqam: y.ish.raqam, obyektId: y.id, obyekt: y.mulk.qisqa, sud: y.ish.sud,
      sana: String(oraliq(1, 28)).padStart(2, "0") + "-sen, 2026", soat: tanla(SOATLAR),
      zal: tanla(ZALLAR), advokat: tanla(ADVOKAT),
      mavzu: tanla(["Asosiy muhokama", "Dalillarni o'rganish", "Qaror e'lon qilish"]),
      holat: rnd() < 0.62 ? "rejada" : "otkazildi"});
  });
  /* xaridorlar */
  const korilgan = new Set(D.XARIDORLAR.map(x => x.nom));
  D.TAKLIFLAR.forEach(t => {
    if (korilgan.has(t.kim)) return;
    korilgan.add(t.kim);
    D.XARIDORLAR.push({id: "XR-" + String(D.XARIDORLAR.length + 11).padStart(3, "0"),
      nom: t.kim, tur: t.turi,
      ishtirok: D.TAKLIFLAR.filter(x => x.kim === t.kim).length,
      yutgan: D.ARXIV.filter(a => a.xaridor === t.kim).length, holat: "faol"});
  });
  /* restrukturizatsiya */
  D.YOZUVLAR.forEach((y, i) => {
    if (y.qarz.kunlar < 90 || y.qarz.kunlar > 300 || i % 4 ||
        D.RESTRUKTURIZATSIYA.some(r => r.obyektId === y.id)) return;
    D.RESTRUKTURIZATSIYA.push({id: "RS-2026/" + String(100 + i).padStart(4, "0"),
      obyektId: y.id, mijoz: y.mijoz.nom, shartnoma: y.shartnoma.raqam,
      qarz: y.qarzMatn, kunlar: y.qarz.kunlar,
      taklif: tanla(["Muddatni 18 oyga uzaytirish", "Yangi to'lov grafigi (bosqichma-bosqich)",
        "Imtiyozli davr — 6 oy", "Qisman kechish va qayta rasmiylashtirish"]),
      sana: oraliq(1, 28) + "-avg, 2026",
      holat: tanla(["korib chiqilmoqda", "kelishilgan", "rad etilgan"])});
  });
  /* sug'urta da'volari */
  D.HODISALAR.filter(h => h.jiddiylik === "yuqori").slice(0, 9).forEach((h, i) => {
    if (D.SUGURTA_DAVOLARI.some(d => d.obyektId === h.obyektId)) return;
    const y = D.OBYEKT_INDEKS[h.obyektId] || {};
    const polis = D.SUGURTALAR.find(s => s.obyektId === h.obyektId);
    D.SUGURTA_DAVOLARI.push({id: "SD-2026/" + String(100 + i).padStart(4, "0"),
      obyektId: h.obyektId, obyekt: y.qisqa || h.obyektId,
      polis: polis ? polis.polis : "—", kompaniya: polis ? polis.kompaniya : "O'zbekinvest",
      hodisa: h.hodisa, sana: h.vaqt,
      summa: Math.round((y.baho || 300) * (0.03 + rnd() * 0.08) * 10) / 10,
      holat: tanla(["korib chiqilmoqda", "topshirilgan", "tolangan"])});
  });

  /* ---------- HUDUDLAR statistikasini reyestrga moslash ---------- */
  const hududSoni = {};
  D.YOZUVLAR.forEach(y => { hududSoni[y.mulk.hudud] = (hududSoni[y.mulk.hudud] || 0) + 1; });
  D.HUDUDLAR.forEach(h => {
    const qism = String(h[0]).split(" ")[0];
    const mos = Object.keys(hududSoni).find(k => k.indexOf(qism) === 0);
    if (mos) h[3] = hududSoni[mos];
  });
})();
