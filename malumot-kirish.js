/* ============================================================
   malumot-kirish.js — elektron kirish nazorati moduli ma'lumotlari
   malumot-kengaytma.js dan KEYIN ulanadi. Kirish nuqtalari bino
   modelidan (yadro/bino.js) olinadi — reja, 3D navigator va reyestr
   bir xil nuqtalarni ko'rsatadi.
   ============================================================ */
(function () {
  const D = window.MKB_DATA;
  if (!D || D.__kirishNazorati) return;
  D.__kirishNazorati = true;

  /* ---------- deterministik "tasodif" ---------- */
  let urug = 30260826;
  const rnd = () => { urug = (urug * 1103515245 + 12345) & 0x7fffffff; return urug / 0x7fffffff; };
  const tanla = a => a[Math.floor(rnd() * a.length)];
  const oraliq = (a, b) => a + Math.floor(rnd() * (b - a + 1));
  const ehtimol = p => rnd() < p;

  /* ---------- sana yordamchilari (tizim sanasi qat'iy) ---------- */
  const BUGUN = new Date(2026, 7, 26);
  function kunQosh(k) { const d = new Date(BUGUN); d.setDate(d.getDate() + k); return d; }
  function sanaMatn(d) {
    return String(d.getDate()).padStart(2, "0") + "." + String(d.getMonth() + 1).padStart(2, "0") + "." + d.getFullYear();
  }
  function vaqtMatn(d) {
    return String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0");
  }

  /* ---------- shaxslar ---------- */
  const ISMLAR = [
    "Aliyev Sardor", "Karimova Nilufar", "To'xtayev Bekzod", "Yusupova Dilnoza", "Rahimov Jasur",
    "Ergasheva Malika", "Sattorov Javohir", "Nazarova Zilola", "Umarov Sanjar", "Qodirova Ozoda",
    "Islomov Doniyor", "Xolmatova Sevara", "Toshpo'latov Rustam", "Mirzayeva Gulnora", "Abdullayev Aziz",
    "Sharipova Nodira", "Jo'rayev Ulug'bek", "Hakimova Feruza", "Nurmatov Otabek", "Sodiqova Kamola",
    "Bekmurodov Shohruh", "Yo'ldosheva Mavluda", "Qosimov Farrux", "Tursunova Zebo", "Ochilov Bahodir",
    "G'aniyeva Munisa", "Xudoyberdiyev Alisher", "Saidova Nasiba", "Muhammadiyev Temur", "Rasulova Shahnoza",
    "Berdiyev Islom", "Ismoilova Aziza", "Normatov Shavkat", "Kamolova Dilfuza", "Pardayev Nodir",
    "Yodgorova Ra'no", "Zokirov Anvar", "Hamidova Gulbahor", "Sultonov Behruz", "Axmedova Zarina",
  ];
  const LAVOZIMLAR = {
    xodim: ["Obyekt menejeri", "Ko'rik inspektori", "Baholovchi mutaxassis", "Filial rahbari",
            "Xavfsizlik bo'yicha mutaxassis", "Yurist"],
    pudratchi: ["Elektrik", "Ta'mirchi", "Qurilma o'rnatuvchisi", "Tozalash xizmati", "Isitish tizimi ustasi"],
    tashrifchi: ["Potentsial ijarachi", "Kadastr vakili", "Sug'urta agenti", "Avvalgi egasining vakili",
                 "Baholash tashkiloti vakili"],
    nazoratchi: ["Ichki audit", "Markaziy apparat vakili", "Nazorat guruhi"],
  };
  const TASHKILOTLAR = ["Mikrokreditbank", "Mikrokreditbank filiali", "SafeLine Servis MChJ",
                        "Kadastr palatasi", "O'zbekinvest sug'urta", "Baholash markazi MChJ",
                        "Toshkent ta'mir xizmati"];

  const SHAXSLAR = ISMLAR.map((ism, i) => {
    const tur = i < 16 ? "xodim" : i < 26 ? "pudratchi" : i < 34 ? "tashrifchi" : "nazoratchi";
    const bosh = ism.split(" ").map(x => x[0]).join("").toUpperCase();
    return {
      id: "SH-" + String(i + 1).padStart(3, "0"),
      ism: ism,
      belgi: bosh,
      tur: tur,
      lavozim: tanla(LAVOZIMLAR[tur]),
      tashkilot: tur === "xodim" ? "Mikrokreditbank" : tanla(TASHKILOTLAR),
      rasm: "assets/xodim_" + ((i % 10) + 1) + ".webp",
      hujjat: "AA " + oraliq(1000000, 9999999),
      tel: "+998 " + oraliq(90, 99) + " " + oraliq(100, 999) + " " + oraliq(10, 99) + " " + oraliq(10, 99),
      faol: ehtimol(0.88),
    };
  });
  const SHAXS_INDEKS = {};
  SHAXSLAR.forEach(s => SHAXS_INDEKS[s.id] = s);

  /* ---------- kirish nuqtalari — bino modelidan ---------- */
  const NUQTA_TUR = {
    turniket: {nom: "Turniket", ik: "kirish"},
    eshik:    {nom: "Elektron qulfli eshik", ik: "qulf"},
    shlagbaum:{nom: "Shlagbaum", ik: "avto"},
    darvoza:  {nom: "Yuk darvozasi", ik: "ombor"},
  };
  const REJIMLAR = ["Face ID + karta", "Karta", "Karta + PIN", "Face ID", "Masofadan ochish"];
  const NUQTA_HOLAT = ["onlayn","onlayn","onlayn","onlayn","onlayn","onlayn",
                       "onlayn","onlayn","onlayn","onlayn","oflayn","xizmatda"];

  const KIRISH_NUQTALARI = [];
  const BINO_MODELLARI = {};
  const obyektlar = (D.YOZUVLAR || []).slice();

  obyektlar.forEach(y => {
    const tur = y.mulk.tur;
    let nuqtalar = [];
    if (window.MKBbino) {
      const m = window.MKBbino.model(y.id, tur, y.mulk.qisqa);
      BINO_MODELLARI[y.id] = m;
      m.qavatlar.forEach(q => {
        q.kirishNuqtalari.forEach(k => nuqtalar.push({qavat: q.raqam, kn: k}));
      });
    }
    /* juda ko'p bo'lsa — asosiylari qoladi */
    if (nuqtalar.length > 6) {
      nuqtalar = nuqtalar.filter((x, i) => i < 2 || i % Math.ceil(nuqtalar.length / 6) === 0).slice(0, 6);
    }
    nuqtalar.forEach((x, i) => {
      const kn = x.kn;
      const nuqtaTur = kn.tur === "turniket" ? "turniket"
        : tur === "Ombor" || tur === "Ishlab chiqarish" ? (i === 1 ? "darvoza" : "eshik")
        : tur === "Avtotransport" || tur === "Yer uchastkasi" ? (i === 0 ? "shlagbaum" : "eshik")
        : "eshik";
      KIRISH_NUQTALARI.push({
        id: y.id.replace("/", "-") + "-KN" + String(i + 1).padStart(2, "0"),
        obyektId: y.id,
        qavat: x.qavat,
        xonaId: kn.xonaId || null,
        nom: kn.nom,
        tur: nuqtaTur,
        turNomi: NUQTA_TUR[nuqtaTur].nom,
        rejim: i === 0 ? "Face ID + karta" : tanla(REJIMLAR),
        holat: i === 0 ? "onlayn" : tanla(NUQTA_HOLAT),
        kunlikOtish: oraliq(2, 74),
        oxirgiAloqa: vaqtMatn(kunQosh(0)) + " · bugun",
        ishVaqti: i === 0 ? "08:30 — 19:00" : tanla(["08:00 — 18:00", "09:00 — 18:00", "Sutka bo'yi", "08:30 — 19:00"]),
        geom: {x: kn.x, y: kn.y, en: kn.en, yonalish: kn.yonalish},
      });
    });
  });

  /* ---------- qurilmalar ---------- */
  const QURILMA_TURLARI = [
    ["qulf",       "Elektromagnit qulf",   ["SecurLine ML-400", "SecurLine ML-600", "AccessPro EM-280"]],
    ["oquvchi",    "Kartani o'quvchi",     ["AccessPro RD-12", "AccessPro RD-20", "SecurLine RF-9"]],
    ["yuz",        "Yuzni aniqlash terminali", ["VisionGate F7", "VisionGate F9 Pro", "FaceLine T3"]],
    ["kamera",     "Videokamera",          ["OptiCam D4 2MP", "OptiCam D8 4MP", "OptiCam PTZ-12"]],
    ["kontroller", "Kirish kontrolleri",   ["AccessPro C-8", "AccessPro C-16", "SecurLine CTRL-4"]],
    ["interkom",   "Videointerkom",        ["TalkLine IP-2", "TalkLine IP-5"]],
    ["datchik",    "Eshik holati datchigi", ["SenseGuard DS-1", "SenseGuard DS-3"]],
  ];
  const QURILMA_HOLAT = ["ishlayapti","ishlayapti","ishlayapti","ishlayapti","ishlayapti",
                         "ishlayapti","ishlayapti","ishlayapti","ogohlantirish","nosoz"];

  const QURILMALAR = [];
  KIRISH_NUQTALARI.forEach((kn, i) => {
    const tarkib = kn.rejim.indexOf("Face ID") >= 0
      ? ["yuz", "qulf", "kontroller", "kamera"]
      : kn.tur === "shlagbaum" ? ["oquvchi", "kontroller", "kamera"]
      : ["oquvchi", "qulf", "datchik"];
    tarkib.forEach((t, j) => {
      const tip = QURILMA_TURLARI.find(x => x[0] === t);
      const ornatilgan = kunQosh(-oraliq(60, 900));
      const holat = kn.holat === "oflayn" && j === 0 ? "nosoz" : tanla(QURILMA_HOLAT);
      QURILMALAR.push({
        id: "QR-" + String(QURILMALAR.length + 1).padStart(4, "0"),
        obyektId: kn.obyektId,
        kirishNuqtaId: kn.id,
        tur: t,
        turNomi: tip[1],
        model: tanla(tip[2]),
        seriya: "SN" + oraliq(100000, 999999),
        ornatilgan: sanaMatn(ornatilgan),
        proshivka: "v" + oraliq(1, 4) + "." + oraliq(0, 9) + "." + oraliq(0, 9),
        holat: holat,
        oxirgiAloqa: holat === "nosoz" ? sanaMatn(kunQosh(-oraliq(1, 9))) + " " + vaqtMatn(kunQosh(0))
                                       : "bugun " + vaqtMatn(kunQosh(0)),
        batareya: t === "datchik" ? oraliq(18, 100) : null,
        keyingiXizmat: sanaMatn(kunQosh(oraliq(-20, 160))),
      });
    });
  });

  /* ---------- ruxsatlar ---------- */
  const DARAJALAR = ["To'liq kirish", "Cheklangan kirish", "Hamrohlik bilan"];
  const RUXSATLAR = [];
  obyektlar.forEach((y, oi) => {
    const soni = oraliq(1, 4);
    for (let i = 0; i < soni; i++) {
      const sh = tanla(SHAXSLAR);
      const boshlanish = kunQosh(-oraliq(5, 300));
      const kunlar = oraliq(20, 420);
      const tugash = new Date(boshlanish); tugash.setDate(tugash.getDate() + kunlar);
      const tugagan = tugash < BUGUN;
      const nuq = KIRISH_NUQTALARI.filter(k => k.obyektId === y.id);
      RUXSATLAR.push({
        id: "RX-" + String(RUXSATLAR.length + 1).padStart(4, "0"),
        shaxsId: sh.id,
        obyektId: y.id,
        nuqtalar: nuq.slice(0, oraliq(1, Math.max(1, nuq.length))).map(k => k.id),
        daraja: sh.tur === "xodim" ? tanla([DARAJALAR[0], DARAJALAR[1]]) : tanla([DARAJALAR[1], DARAJALAR[2]]),
        usul: tanla(["Face ID", "Karta", "Karta + PIN", "Face ID + karta"]),
        boshlanish: sanaMatn(boshlanish),
        tugash: sanaMatn(tugash),
        holat: tugagan ? "muddati tugagan" : ehtimol(0.07) ? "to'xtatilgan" : "amalda",
        bergan: tanla(SHAXSLAR.filter(x => x.tur === "xodim")).ism,
      });
    }
  });

  /* ---------- kirish so'rovlari ---------- */
  const MAQSADLAR = ["Rejali ko'rik", "Qayta baholash", "Ta'mirlash ishlari", "Kadastr o'lchovi",
                     "Sug'urta ekspertizasi", "Texnik xizmat", "Hujjatlarni olib chiqish",
                     "Potentsial ijarachini ko'rsatish", "Ichki audit tekshiruvi"];
  const KIRISH_SOROVLARI = [];
  for (let i = 0; i < 46; i++) {
    const y = tanla(obyektlar);
    const sh = tanla(SHAXSLAR);
    const sana = kunQosh(oraliq(-6, 9));
    const holat = sana > BUGUN ? tanla(["kutilmoqda", "kutilmoqda", "tasdiqlangan"])
                               : tanla(["tasdiqlangan", "tasdiqlangan", "bajarildi", "rad etilgan"]);
    KIRISH_SOROVLARI.push({
      id: "KS-2026/" + String(1200 + i),
      sana: sanaMatn(sana),
      vaqt: String(oraliq(8, 17)).padStart(2, "0") + ":" + tanla(["00", "15", "30", "45"]),
      shaxsId: sh.id,
      obyektId: y.id,
      maqsad: tanla(MAQSADLAR),
      muddat: oraliq(1, 6) + " soat",
      sorovchi: tanla(SHAXSLAR.filter(x => x.tur === "xodim")).ism,
      tasdiqlovchi: holat === "kutilmoqda" ? null : tanla(SHAXSLAR.filter(x => x.tur === "xodim")).ism,
      holat: holat,
      izoh: holat === "rad etilgan" ? tanla(["Obyekt muhrlangan", "Hujjat to'liq emas", "Vaqt mos kelmadi"]) : "",
    });
  }

  /* ---------- tashriflar ---------- */
  const TASHRIFLAR = [];
  for (let i = 0; i < 128; i++) {
    const y = tanla(obyektlar);
    const sh = tanla(SHAXSLAR);
    const kun = oraliq(-21, 0);
    const soat = oraliq(8, 17);
    const davom = oraliq(15, 190);
    const tugadi = kun < 0 ? true : soat < 13;
    const kirdi = new Date(kunQosh(kun)); kirdi.setHours(soat, oraliq(0, 59));
    const chiqdi = new Date(kirdi); chiqdi.setMinutes(chiqdi.getMinutes() + davom);
    TASHRIFLAR.push({
      id: "TS-" + String(4200 + i),
      obyektId: y.id,
      shaxsId: sh.id,
      sana: sanaMatn(kirdi),
      kirish: vaqtMatn(kirdi),
      chiqish: tugadi ? vaqtMatn(chiqdi) : null,
      davomiylik: tugadi ? davom + " daqiqa" : "davom etmoqda",
      maqsad: tanla(MAQSADLAR),
      hamroh: sh.tur === "xodim" ? null : tanla(SHAXSLAR.filter(x => x.tur === "xodim")).ism,
      holat: tugadi ? "yakunlandi" : "obyektda",
    });
  }

  /* ---------- kirish voqealari ---------- */
  const USULLAR = ["Face ID", "Karta", "Karta + PIN", "Masofadan ochish", "Interkom"];
  const NATIJALAR = ["ruxsat", "ruxsat", "ruxsat", "ruxsat", "ruxsat", "rad", "ogohlantirish"];
  const RAD_SABAB = ["Ruxsat muddati tugagan", "Karta ro'yxatda yo'q", "Yuz mos kelmadi",
                     "Ish vaqtidan tashqari urinish", "PIN noto'g'ri", "Obyekt muhrlangan"];
  const KIRISH_VOQEALARI = [];
  for (let i = 0; i < 720; i++) {
    const kn = tanla(KIRISH_NUQTALARI);
    const sh = tanla(SHAXSLAR);
    const kun = oraliq(-7, 0);
    const vaqt = new Date(kunQosh(kun));
    vaqt.setHours(oraliq(6, 21), oraliq(0, 59), oraliq(0, 59));
    const natija = tanla(NATIJALAR);
    KIRISH_VOQEALARI.push({
      id: "KV-" + String(90000 + i),
      vaqt: sanaMatn(vaqt) + " " + vaqtMatn(vaqt),
      sana: sanaMatn(vaqt),
      soat: vaqtMatn(vaqt),
      obyektId: kn.obyektId,
      kirishNuqtaId: kn.id,
      nuqtaNomi: kn.nom,
      shaxsId: natija === "rad" && ehtimol(0.4) ? null : sh.id,
      usul: tanla(USULLAR),
      natija: natija,
      sabab: natija === "rad" ? tanla(RAD_SABAB) : "",
      yonalish: ehtimol(0.55) ? "kirish" : "chiqish",
    });
  }
  KIRISH_VOQEALARI.sort((a, b) => (a.vaqt < b.vaqt ? 1 : -1));

  /* ---------- xavfsizlik hodisalari ---------- */
  const XAVF_TURLARI = [
    ["Ruxsatsiz kirish urinishi", "yuqori"],
    ["Eshik ochiq qoldi", "o'rta"],
    ["Yuz identifikatsiyasi mos kelmadi", "o'rta"],
    ["Ish vaqtidan tashqari kirish", "yuqori"],
    ["Qurilma aloqasi uzildi", "o'rta"],
    ["Muhr buzilgan", "yuqori"],
    ["Kamera signali yo'qoldi", "past"],
    ["Datchik batareyasi past", "past"],
  ];
  const XAVFSIZLIK_HODISALARI = [];
  for (let i = 0; i < 64; i++) {
    const kn = tanla(KIRISH_NUQTALARI);
    const t = tanla(XAVF_TURLARI);
    const kun = oraliq(-30, 0);
    const vaqt = new Date(kunQosh(kun));
    vaqt.setHours(oraliq(0, 23), oraliq(0, 59));
    const holat = kun < -7 ? tanla(["yopildi", "yopildi", "tekshiruvda"]) : tanla(["ochiq", "tekshiruvda", "yopildi"]);
    XAVFSIZLIK_HODISALARI.push({
      id: "XH-2026/" + String(300 + i),
      vaqt: sanaMatn(vaqt) + " " + vaqtMatn(vaqt),
      sana: sanaMatn(vaqt),
      obyektId: kn.obyektId,
      kirishNuqtaId: kn.id,
      hodisa: t[0],
      jiddiylik: t[1],
      holat: holat,
      masul: tanla(SHAXSLAR.filter(x => x.tur === "xodim")).ism,
      chora: holat === "yopildi" ? tanla(["Qurilma qayta ishga tushirildi", "Muhr qayta o'rnatildi",
                                          "Ruxsat bekor qilindi", "Ta'mir topshirig'i berildi"]) : "",
    });
  }

  /* ---------- masofaviy ko'rik sessiyalari ---------- */
  const SESSIYA_BOSQICH = ["Aloqa o'rnatildi", "Kirish nuqtasi ochildi", "Xonalar aylanib chiqildi",
                           "Foto va video yozildi", "Eshiklar yopildi", "Bayonnoma imzolandi"];
  const MASOFAVIY_SESSIYALAR = [];
  for (let i = 0; i < 28; i++) {
    const y = tanla(obyektlar);
    const kun = oraliq(-40, 6);
    const sana = kunQosh(kun);
    const holat = kun > 0 ? "rejalashtirilgan" : kun === 0 ? tanla(["jarayonda", "yakunlandi"]) : "yakunlandi";
    const bosqich = holat === "yakunlandi" ? SESSIYA_BOSQICH.length
      : holat === "jarayonda" ? oraliq(1, 4) : 0;
    MASOFAVIY_SESSIYALAR.push({
      id: "MS-2026/" + String(140 + i),
      obyektId: y.id,
      sana: sanaMatn(sana),
      vaqt: String(oraliq(9, 16)).padStart(2, "0") + ":00",
      inspektor: tanla(SHAXSLAR.filter(x => x.lavozim === "Ko'rik inspektori" || x.tur === "xodim")).ism,
      holat: holat,
      bosqich: bosqich,
      bosqichlar: SESSIYA_BOSQICH,
      kameralar: oraliq(2, 6),
      davomiylik: holat === "yakunlandi" ? oraliq(12, 48) + " daqiqa" : "—",
    });
  }

  /* ---------- qurilma xizmat ishlari ---------- */
  const XIZMAT_TURLARI = ["Profilaktika", "Nosozlikni bartaraf etish", "Proshivkani yangilash",
                          "Batareyani almashtirish", "Qayta sozlash", "O'rnatish"];
  const EHTIYOT = ["Magnit qulf plastinasi", "Kartani o'quvchi moduli", "Quvvat bloki",
                   "Aloqa kabeli", "Datchik batareyasi", "Kamera obyektivi"];
  const XIZMAT_ISHLARI = [];
  for (let i = 0; i < 52; i++) {
    const qr = tanla(QURILMALAR);
    const kun = oraliq(-25, 12);
    const sana = kunQosh(kun);
    const holat = kun > 0 ? "rejada" : kun > -3 ? tanla(["bajarilmoqda", "rejada"]) : "bajarildi";
    XIZMAT_ISHLARI.push({
      id: "XI-2026/" + String(700 + i),
      qurilmaId: qr.id,
      obyektId: qr.obyektId,
      kirishNuqtaId: qr.kirishNuqtaId,
      tur: tanla(XIZMAT_TURLARI),
      sana: sanaMatn(sana),
      usta: tanla(SHAXSLAR.filter(x => x.tur === "pudratchi")).ism,
      holat: holat,
      ehtiyotQismlar: ehtimol(0.5) ? [tanla(EHTIYOT)] : [],
      izoh: holat === "bajarildi" ? tanla(["Ish qabul qilindi", "Sinovdan o'tkazildi", "Akt imzolandi"]) : "",
    });
  }

  /* ---------- indekslar va yordamchilar ---------- */
  const NUQTA_INDEKS = {};
  KIRISH_NUQTALARI.forEach(k => NUQTA_INDEKS[k.id] = k);

  D.SHAXSLAR = SHAXSLAR;
  D.SHAXS_INDEKS = SHAXS_INDEKS;
  D.KIRISH_NUQTALARI = KIRISH_NUQTALARI;
  D.NUQTA_INDEKS = NUQTA_INDEKS;
  D.QURILMALAR = QURILMALAR;
  D.RUXSATLAR = RUXSATLAR;
  D.KIRISH_SOROVLARI = KIRISH_SOROVLARI;
  D.TASHRIFLAR = TASHRIFLAR;
  D.KIRISH_VOQEALARI = KIRISH_VOQEALARI;
  D.XAVFSIZLIK_HODISALARI = XAVFSIZLIK_HODISALARI;
  D.MASOFAVIY_SESSIYALAR = MASOFAVIY_SESSIYALAR;
  D.XIZMAT_ISHLARI = XIZMAT_ISHLARI;
  D.BINO_MODELLARI = BINO_MODELLARI;
  D.KIRISH_BUGUN = sanaMatn(BUGUN);

  D.shaxs = id => SHAXS_INDEKS[id] || null;
  D.shaxsNomi = id => (SHAXS_INDEKS[id] ? SHAXS_INDEKS[id].ism : "Aniqlanmagan");
  D.kirishNuqtasi = id => NUQTA_INDEKS[id] || null;
  D.obyektNuqtalari = obyektId => KIRISH_NUQTALARI.filter(k => k.obyektId === obyektId);
  D.obyektVoqealari = obyektId => KIRISH_VOQEALARI.filter(k => k.obyektId === obyektId);
  D.kirishJamlama = function () {
    return {
      nuqta: KIRISH_NUQTALARI.length,
      onlayn: KIRISH_NUQTALARI.filter(k => k.holat === "onlayn").length,
      oflayn: KIRISH_NUQTALARI.filter(k => k.holat !== "onlayn").length,
      qurilma: QURILMALAR.length,
      nosoz: QURILMALAR.filter(q => q.holat === "nosoz").length,
      bugungiVoqea: KIRISH_VOQEALARI.filter(v => v.sana === sanaMatn(BUGUN)).length,
      rad: KIRISH_VOQEALARI.filter(v => v.natija === "rad").length,
      obyektda: TASHRIFLAR.filter(t => t.holat === "obyektda").length,
      kutilayotganSorov: KIRISH_SOROVLARI.filter(s => s.holat === "kutilmoqda").length,
      ochiqHodisa: XAVFSIZLIK_HODISALARI.filter(h => h.holat !== "yopildi").length,
      amaldagiRuxsat: RUXSATLAR.filter(r => r.holat === "amalda").length,
    };
  };
})();
