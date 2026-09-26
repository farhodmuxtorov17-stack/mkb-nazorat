/* ============================================================
   malumot-kengaytma.js — namoyish reyestri va aktivga bog'liq to'plamlar
   malumot-qoshimcha.js dan KEYIN ulanadi.

   Namoyish rejimida 267 ta aktiv (8 tasi malumot.js da) va ularning ko'riklari,
   sug'urtasi, baholash, hujjatlar, xarajatlar, qo'riqlash, kommunal arizalar,
   inventar, soliq, lotlar, takliflar, shartnomalar, ijara, arxiv, tasdiqlar,
   MB hisobotlari va zaxira tarixi yaratiladi. Barcha sanalar bugun() ga nisbatan.

   Mahalliy (haqiqiy) rejimda hech narsa yaratilmaydi: to'plamlar bo'sh,
   faqat foydalanuvchi kiritgan yozuvlar bo'ladi.
   ============================================================ */
(function () {
  const D = window.MKB_DATA;
  if (!D || D.__kengaytirilgan) return;
  D.__kengaytirilgan = true;

  const namoyish = D.MANBA !== "mahalliy";
  const BUGUN = D.BUGUN;
  const nisbiy = D.__nisbiy;
  const {sanaYoz, sanaOqi, kunQosh, oyQosh, kunFarqi, yaxlit} = D;

  /* ---------- deterministik tasodif ----------
     rnd  — eski generator bilan bir xil urug' va chaqiruvlar tartibi: aktivning turi, hududi,
            nomi va qiymati avvalgi versiyadagidek qoladi.
     rnd2 — aktivning yangi maydonlari, rnd3 — bog'liq to'plamlar. */
  function generator(boshUrug) {
    let urug = boshUrug;
    const r = () => { urug = (urug * 1103515245 + 12345) & 0x7fffffff; return urug / 0x7fffffff; };
    return {r, tanla: a => a[Math.floor(r() * a.length)], oraliq: (a, b) => a + Math.floor(r() * (b - a + 1)),
            ehtimol: p => r() < p};
  }
  /* Yozuv identifikatoridan barqaror son (FNV-1a). Tasodifiy oqimdan son olmasdan tanlash kerak bo'lgan
     joyda ishlatiladi: shunda keyingi yozuvlar ketma-ketligi siljimaydi */
  const iz = s => { let h = 2166136261; for (const c of String(s)) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; };
  const G1 = generator(20260826), G2 = generator(52260921), G3 = generator(63260921);
  const rnd = G1.r, tanla = G1.tanla, oraliq = G1.oraliq;
  /* G4 faqat namoyish summalarini siljitadi: bozor bahosi va qarz qoplanishi shu oqimdan olinadi.
     Alohida oqim kerak, chunki G1 dagi ketma-ketlik aktivning turi, hududi, nomi va reyestr
     raqamini beradi — ular o'zgarmasligi shart, aks holda saqlangan havolalar uziladi. */
  const {r: r4} = generator(41260925);
  /* Namoyish summasi bankning haqiqiy kitobiga tushib qolmasin: har aktiv bahosi 0,72-1,18
     oralig'ida siljiydi, o'rtacha 0,95. Urug' qotirilgan, shuning uchun raqam har ochilishda bir xil. */
  const bahoSiljit = n => Math.max(12, Math.round(n * (0.72 + r4() * 0.46)));

  /* Eski chizma funksiyasi o'rnida turadi va bitta tasodifiy son iste'mol qiladi: shu sabab
     keyingi yozuvlarning qiymatlari o'zgarmaydi. Surat quyidagi NAMUNA_SURAT dan beriladi. */
  const suratOtkaz = () => { rnd(); return ""; };

  /* ---------- Namoyish suratlari ----------
     assets/namuna/ dagi ochiq litsenziyali fotolar (Wikimedia Commons). Har surat aktivning
     turiga mos keladi, o'ziga emas: haqiqiy obyekt suratlari faqat mahalliy reyestrda bo'ladi.
     Ikkinchi qiymat — muallif va litsenziya, u ekranda surat ostida ko'rsatiladi (CC BY va
     CC BY-SA shuni talab qiladi). To'liq ro'yxat assets/namuna/MANBA.md da. */
  const NAMUNA_SURAT = {
    mamuriy: [["mamuriy-1", "Uralsk Review, CC BY 3.0"], ["mamuriy-2", "Jean Housen, CC BY-SA 4.0"], ["mamuriy-3", "Bula.erg, CC BY-SA 4.0"], ["mamuriy-4", "Nikolai Bulykin, CC BY-SA 4.0"], ["mamuriy-5", "Айвик, CC BY-SA 3.0"], ["mamuriy-6", "Шухрат Саъдиев, CC BY-SA 4.0"]],
    sex: [["sex-1", "Homoatrox, CC BY-SA 4.0"], ["sex-2", "Zoirovna, CC BY-SA 4.0"], ["sex-3", "Шевченко Катерина Володимирівна, CC BY-SA 4.0"], ["sex-4", "Raymond Zoller, CC BY-SA 2.0"], ["sex-5", "Raymond Zoller, CC BY-SA 2.0"]],
    ferma: [["ferma-1", "Лобачев Владимир, CC BY-SA 3.0"], ["ferma-2", "NVO, CC BY-SA 3.0"], ["ferma-3", "Dor Shabashewitz, CC BY-SA 4.0"], ["ferma-4", "Екатерина Борисова, CC BY-SA 4.0"], ["ferma-5", "Alandislands, CC BY-SA 4.0"], ["ferma-6", "VOLOT, CC BY-SA 4.0"]],
    issiqxona: [["issiqxona-1", "USDAgov, Public domain"], ["issiqxona-2", "Schlaghecken Josef, CC BY-SA 4.0"], ["issiqxona-3", "MHM55, CC BY-SA 4.0"]],
    ombor: [["ombor-1", "Aneem faris, CC BY-SA 4.0"], ["ombor-2", "Анатолий Таранцов, CC BY 3.0"], ["ombor-3", "Natalia Senatorova, CC BY-SA 4.0"], ["ombor-4", "Oxfam East Africa, CC BY 2.0"], ["ombor-5", "Natalia Senatorova, CC BY-SA 4.0"]],
    dokon: [["dokon-1", "Jean Housen, CC BY-SA 4.0"], ["dokon-2", "Jean Housen, CC BY-SA 4.0"], ["dokon-4", "Peretz Partensky, CC BY-SA 2.0"], ["dokon-5", "Thomas Taylor Hammond, CC BY-SA 4.0"], ["dokon-6", "Jean Housen, CC BY-SA 4.0"]],
    kopqavat: [["kopqavat-1", "Uralsk Review, CC BY 3.0"], ["kopqavat-2", "Olimidono, CC0"], ["kopqavat-3", "Sigismund von Dobschütz, CC BY-SA 3.0"], ["kopqavat-4", "Uralsk Review, CC BY 3.0"]],
    uy: [["uy-1", "Nikolai Bulykin, CC BY-SA 4.0"], ["uy-2", "Shuhrataxmedov, CC BY-SA 3.0"], ["uy-3", "upyernoz, CC BY 2.0"], ["uy-4", "Nikolai Bulykin, CC BY-SA 4.0"], ["uy-5", "upyernoz, CC BY 2.0"], ["uy-6", "Adam Jones, CC BY-SA 2.0"]],
    uskuna: [["uskuna-1", "Unknown photographer, CC BY 3.0"], ["uskuna-2", "Kent Madsen, CC BY-SA 4.0"], ["uskuna-3", "Surya Prakash.S.A., CC BY-SA 3.0"], ["uskuna-4", "NearEMPTiness, CC BY-SA 4.0"], ["uskuna-5", "Carol Carlos, CC BY-SA 4.0"], ["uskuna-6", "Tell Rifaat Information Office, CC BY 3.0"]],
    /* Transport va texnika: surat markaga ham mos kelishi kerak — yozuvda «Chevrolet Damas»
       tursa, sedan surati qo'yilmaydi. Uchinchi qiymat — nomdagi model bo'lagi, modeli
       ro'yxatda yo'q aktiv suratsiz qoladi. Yengil va yuk avtomobil ro'yxatlari alohida:
       «Yuk avtomobili» turidagi yozuvga sedan surati tushmasligi kerak. */
    avto: [
      ["avto-1", "Mosantio, CC BY 4.0", "Nexia"],
      ["avto-3", "Ilya Plekhanov, CC BY-SA 4.0", "Damas"],
      ["avto-4", "Matti Blume, CC BY-SA 4.0", "Cobalt"],
      ["avto-6", "Makizox, CC BY-SA 4.0", "Lacetti"],
      ["avto-7", "Bull-Doser at English Wikipedia, Public domain", "Spark"],
      ["avto-9", "Bull-Doser, Public domain", "Tracker"],
      ["avto-10", "Benespit, CC BY-SA 4.0", "Captiva"],
      ["avto-11", "Bull-Doser, Public domain", "Equinox"],
      ["avto-12", "Benespit, CC BY-SA 4.0", "Kia K5"]
    ],
    yuk: [
      ["avto-8", "Benespit, CC BY-SA 4.0", "Labo"],
      ["avto-13", "Tokumeigakarinoaoshima, CC0", "Isuzu"],
      ["avto-14", "Oleg Yunakov, CC BY-SA 4.0", "MAN TGS"]
    ],
    texnika: [
      ["texnika-1", "Александр Сигачёв, CC0", "Ekskavator"],
      ["texnika-2", "Redline, CC BY-SA 3.0", "G'ildirakli"]
    ]
  };
  const NAMUNA_NAVBAT = {};
  function namunaSurati(rasmTuri, nom) {
    const b = NAMUNA_SURAT[rasmTuri] || [];
    if (!b.length) return null;
    /* Modeli ko'rsatilgan surat faqat shu model yozilgan aktivga tushadi */
    const r = b.filter(s => !s[2] || String(nom).indexOf(s[2]) >= 0);
    if (!r.length) return null;
    /* Navbat model bo'yicha yuritiladi (binolarda — tur bo'yicha). Transport va texnikada har
       ikkinchi aktiv, binolarda har uchinchisi surat oladi; bitta surat ko'pi bilan ikki aktivda
       takrorlanadi. Qolganlari suratsiz qoladi: surati hali yuklanmagan aktiv shunday ko'rinadi. */
    const kalit = rasmTuri + "/" + (r[0][2] || "");
    const qadam = r[0][2] ? 2 : 3;
    const n = (NAMUNA_NAVBAT[kalit] = (NAMUNA_NAVBAT[kalit] || 0) + 1);
    if (n % qadam !== 1 || n > r.length * qadam * 2) return null;
    const k = (n - 1) / qadam;
    const s = r[k % r.length];
    /* «Umumiy surat» belgisi bu yerda qo'yilmaydi: navbat tur va model bo'yicha alohida
       yuritilgani uchun navbat raqamidan takrorlanishni bilib bo'lmaydi. Belgi reyestr
       yig'ilib bo'lgach, fayl yo'li bo'yicha haqiqiy sanoqdan qo'yiladi. */
    return {yol: "assets/namuna/" + s[0] + ".webp", kichik: "assets/namuna/" + s[0] + "-k.webp",
            manba: "Namuna surati · " + s[1] + " · Wikimedia Commons"};
  }

  /* ---------- Filiallar (namoyish) ---------- */
  const FILIAL_KODLAR = {
    "Toshkent shahar BXO": "TS-01", "Yunusobod BXM": "TS-02", "Chilonzor BXM": "TS-03", "Toshkent viloyat BXO": "TV-01",
    "Samarqand BXO": "SA-01", "Namangan BXO": "NA-01", "Farg'ona BXO": "FA-01", "Andijon BXO": "AN-01",
    "Buxoro BXO": "BU-01", "G'ijduvon BXM": "BU-02", "Urganch BXO": "XO-01", "Qarshi BXO": "QA-01",
    "Termiz BXO": "SU-01", "Denov BXM": "SU-02", "Jizzax BXO": "JI-01", "Zarbdor BXM": "JI-02",
    "Navoiy BXO": "NV-01", "Guliston BXM": "SI-01", "Nukus BXO": "QR-01"
  };
  if (namoyish && !D.FILIALLAR.length) {
    Object.keys(FILIAL_KODLAR).forEach(nom => {
      const id = FILIAL_KODLAR[nom], h = id.slice(0, 2);
      D.FILIALLAR.push({id, nom, hudud: h, hududNomi: (D.HUDUD_KODLAR[h] || {}).nom || "", turi: /BXM$/.test(nom) ? "BXM" : "BXO"});
    });
  }
  D.filial = kod => D.FILIALLAR.find(f => f.id === kod || f.nom === kod) || null;

  /* ---------- Eski generator ro'yxatlari (tartib o'zgartirilmaydi) ---------- */
  /* [hudud, manzil boshi, filial, tuman]. To'rtinchi ustun — haqiqiy tuman nomi.
     Manzil boshining oxirgi bo'lagi ko'p yozuvda ko'cha yoki mahalla nomi ("Registon",
     "Kogon yo'li"), shuning uchun undan tuman olinmaydi: aks holda xaritada metka o'z
     tumani markaziga emas, viloyat markaziga tushib qolardi. Nom assets/geo/tumanlar.geojson
     dagi nom_uz bilan bir xil yozilgan — xarita shu bo'yicha tumanni topadi. */
  const HUDUDLAR = [
    /* Yunusobod tumanidagi aktivlar o'sha tumandagi filialga biriktirilgan: ilgari ular
       shahar bosh ofisiga tushar, Yunusobod BXM esa bitta aktiv bilan qolardi */
    ["Toshkent sh.", "Toshkent sh., Yunusobod", "Yunusobod BXM", "Yunusobod tumani"],
    ["Toshkent sh.", "Toshkent sh., Chilonzor", "Chilonzor BXM", "Chilonzor tumani"],
    ["Toshkent sh.", "Toshkent sh., Mirzo Ulug'bek", "Toshkent shahar BXO", "Mirzo Ulug'bek tumani"],
    ["Toshkent vil.", "Toshkent vil., Qibray", "Toshkent viloyat BXO", "Qibray tumani"],
    ["Toshkent vil.", "Toshkent vil., Zangiota", "Toshkent viloyat BXO", "Zangiota tumani"],
    ["Samarqand", "Samarqand sh., Registon", "Samarqand BXO", "Samarqand shahri"],
    ["Samarqand", "Urgut tumani", "Samarqand BXO", "Urgut tumani"],
    ["Namangan", "Namangan sh., Davlatobod", "Namangan BXO", "Namangan shahri"],
    ["Farg'ona", "Farg'ona sh., Yangi bozor", "Farg'ona BXO", "Farg'ona shahri"],
    ["Andijon", "Andijon sh., Bog'ishamol", "Andijon BXO", "Andijon shahri"],
    ["Buxoro", "Buxoro sh., Kogon yo'li", "Buxoro BXO", "Buxoro shahri"],
    ["Xorazm", "Urganch sh., Al-Xorazmiy", "Urganch BXO", "Urganch shahri"],
    ["Qashqadaryo", "Qarshi sh., Mustaqillik", "Qarshi BXO", "Qarshi shahri"],
    ["Surxondaryo", "Termiz sh., Sharq", "Termiz BXO", "Termiz shahri"],
    ["Jizzax", "Jizzax sh., Sharof Rashidov", "Jizzax BXO", "Jizzax shahri"],
    ["Navoiy", "Navoiy sh., G'alaba", "Navoiy BXO", "Navoiy shahri"],
    ["Sirdaryo", "Guliston sh., Ahillik", "Guliston BXM", "Guliston shahri"],
    ["Qoraqalpog'iston", "Nukus sh., Do'stlik", "Nukus BXO", "Nukus shahri"],
    ["Surxondaryo", "Denov tumani", "Denov BXM", "Denov tumani"],
    ["Jizzax", "Zarbdor tumani", "Zarbdor BXM", "Zarbdor tumani"],
    ["Buxoro", "G'ijduvon tumani", "G'ijduvon BXM", "G'ijduvon tumani"]
  ];
  /* [tur, surat turi, maydon oralig'i, birlik, qiymat oralig'i (mln so'm), ulush]. Ulushlar haqiqiy
     reyestr tarkibini takrorlaydi, jami 267 ta. */
  const TURLAR = [
    ["Ma'muriy bino",   "mamuriy",   [240, 1800],  "m²",  1200, 7400, 44],
    ["Ma'muriy bino",   "mamuriy",   [110, 620],   "m²",   460, 2400, 18],
    ["Avtotransport",   "avto",      [1, 1],       "dona", 120,  860, 42],
    ["Asbob-uskuna",    "uskuna",    [1, 1],       "dona",  60,  540, 30],
    ["Avtotransport",   "yuk",       [1, 1],       "dona", 240, 1400,  6],
    ["Maxsus texnika",  "texnika",   [1, 1],       "dona", 420, 2600,  1],
    ["Ishlab chiqarish", "ferma",    [800, 5200],  "m²",  1800, 8600, 32],
    ["Ishlab chiqarish", "sex",      [600, 2400],  "m²",  1100, 4600, 24],
    ["Ishlab chiqarish", "issiqxona", [1200, 9800], "m²",  640, 3200,  6],
    ["Kvartira",        "kopqavat",  [58, 124],    "m²",   380,  980, 18],
    ["Savdo maydoni",   "dokon",     [90, 640],    "m²",   420, 2600, 18],
    ["Turar-joy",       "uy",        [180, 640],   "m²",   260, 1500, 16],
    ["Ombor",           "ombor",     [600, 3400],  "m²",   700, 4200, 12]
  ];
  const TUR_HAVZA = TURLAR.reduce((a, t) => a.concat(Array(t[6]).fill(t)), []);
  /* Nomlar ro'yxati turdagi aktivlar sonidan kichik bo'lmasin: bitta nom reyestrda 3-4 martadan ko'p takrorlanmaydi.
     Kvartira nomi uning manzili (ko'cha va uy), manzil shu nomdan yasaladi. */
  const NOM_BOSH = {
    "Kvartira": ["12-kvartal, 45-uy", "9-kvartal, 12-uy", "Bunyodkor ko'chasi, 8-uy", "Navoiy ko'chasi, 21-uy", "Chinor mavzesi, 3-uy",
                 "4-kvartal, 17-uy", "7-mavze, 30-uy", "Ipak yo'li ko'chasi, 5-uy", "Mustaqillik ko'chasi, 14-uy"],
    "Savdo maydoni": ["Savdo do'koni binosi", "Choyxona va do'kon binosi", "Xizmat ko'rsatish binosi", "Dorixona binosi", "Savdo pavilyoni",
                      "Oziq-ovqat do'koni", "Maishiy xizmat binosi"],
    "Ma'muriy bino": ["Ma'muriy bino", "Ma'muriy-xo'jalik binosi", "Boshqaruv binosi", "Ofis bloki A", "Ish markazi, 5-qavat",
                      "Ikki qavatli ofis binosi", "Uch qavatli ma'muriy bino", "Biznes markaz binosi", "Ofis binosi", "Idora binosi",
                      "Xizmat binosi", "Ma'muriy korpus", "Ofis va ombor majmuasi", "Ofis bloki B", "Ish markazi, 2-qavat",
                      "Ish markazi, 3-qavat", "Ma'muriy bino va hovli", "Konferens-zal binosi"],
    "Turar-joy": ["Turar joy binosi", "Bir qavatli turar joy", "Hovli-joy", "Ikki qavatli turar joy", "Turar joy va hovli", "Yozgi uy"],
    "Asbob-uskuna": ["Tikuv stanogi", "Un tortish liniyasi", "Sovutish agregati", "Nonvoyxona pechi", "Qadoqlash liniyasi", "Payvandlash uskunasi",
                     "Tokarlik stanogi", "Frezalash stanogi", "Beton qorish uskunasi", "Havo kompressori", "Elektr generatori", "Quyish liniyasi"],
    "Maxsus texnika": ["Ekskavator-yuklagich", "G'ildirakli yuklagich"],
    "Ishlab chiqarish": ["Tikuvchilik sexi", "Un tegirmoni binosi", "Parrandachilik binosi", "Paypoq ishlab chiqarish sexi",
                         "Oziq-ovqat ishlab chiqarish sexi", "Chorvachilik kompleksi", "Mebel sexi", "Non zavodi binosi",
                         "Sut qayta ishlash sexi", "Qandolatchilik sexi", "Go'sht qayta ishlash sexi", "Plastmassa buyumlar sexi",
                         "Qurilish materiallari sexi", "Issiqxona majmuasi", "Baliqchilik xo'jaligi binosi", "Quyonchilik fermasi",
                         "Tikuv-trikotaj sexi", "Konserva sexi"],
    "Ombor": ["Omborxona binosi", "Sovutkichli ombor", "Mineral o'g'itlar ombori", "Don saqlash ombori", "Meva-sabzavot ombori"],
    "Avtotransport": ["Chevrolet Cobalt (2022)", "Chevrolet Malibu (2023)", "Chevrolet Damas (2021)", "Chevrolet Nexia 3 (2020)",
                      "Chevrolet Spark (2021)", "Chevrolet Lacetti (2019)", "Chevrolet Tracker (2022)", "Chevrolet Onix (2023)",
                      "Chevrolet Captiva (2019)", "Chevrolet Equinox (2021)", "Kia K5 (2022)"],
    /* Yuk avtomobili turidagi yozuv yengil avtomobil nomini olmasligi kerak */
    "Yuk avtotransport": ["Isuzu NQR 71 (2021)", "MAN TGS 26.400 (2020)", "Dongfeng DFL1160 (2019)", "Hyundai HD78 (2021)",
                          "Chevrolet Labo (2022)"]
  };
  const EGA_JIS = ["Karimov Javlon", "Ergasheva Dilnoza", "Yusupova Nodira", "To'xtasinov Sherzod", "Rasulov Otabek", "Islomov Bekzod",
    "Nazarova Malika", "Qodirov Alisher", "Sattorova Gulnoza", "Umarov Doniyor", "Hakimova Zulfiya", "Ochilov Sanjar",
    "Yo'ldosheva Sevara", "Aliyev Rustam", "Nurmatova Kamola", "Mamatqulov Shuhrat", "Xolmatov Jasur", "Ibrohimova Nilufar"];
  const EGA_YUR = ["«Zarafshon Tekstil» MChJ", "«Baraka Savdo» MChJ", "«Oq Tepa Servis» MChJ", "«Chust Textile» QK", "«Farovon Market» MChJ",
    "«Nurli Yo'l» QK", "«Sharq Logistika» MChJ", "«Bo'ston Agro» fermer xo'jaligi", "«Temir Konstruksiya» MChJ",
    "«Mehr Oziq-ovqat» MChJ", "«Zamin Qurilish» MChJ", "«Sifat Print» MChJ"];
  const ESKI_MASUL = ["Sattorov Jasur", "Karimova Feruza", "Yo'ldoshev Sardor", "Tosheva Barno", "Rahimov Sherzod", "Salimova Gulnora",
    "Ergashev Botir", "Nazarov Aziz"];
  /* Tuman manzili uchun mahalla va ko'cha (tasodifiy son olinmaydi: uy raqamidan tanlanadi) */
  const TUMAN_KOCHA = ["Navbahor MFY, Mustaqillik ko'chasi", "Guliston MFY, Bog'bon ko'chasi", "Yangiobod MFY, Amir Temur ko'chasi",
    "Do'stlik MFY, Istiqlol ko'chasi", "Oqtepa MFY, Paxtakor ko'chasi", "Bunyodkor MFY, Navoiy ko'chasi", "Tinchlik MFY, Sharq ko'chasi"];
  const MENEJERLAR = D.FOYDLAR.filter(f => f.rol === "Obyekt menejeri").map(f => f.nom);
  const INSPEKTORLAR = D.FOYDLAR.filter(f => f.rol === "Ko'rik va xavfsizlik inspektori").map(f => f.nom);

  /* Eski generatorning bitta yozuvi: tasodifiy sonlar avvalgi tartibda iste'mol qilinadi,
     kerakli qiymatlar qaytariladi, qolganlari tashlab yuboriladi. */
  const NOM_NAVBAT = {};
  /* Namoyish reyestri yig'ilgan sana: raqamlardagi yil shu sanaga nisbatan hisoblanadi */
  const RAQAM_SANASI = new Date(2026, 8, 21);
  function eskiNavbat() {
    const t = tanla(TUR_HAVZA);
    const [hudud, manzilBosh, filial, tumanNomi] = tanla(HUDUDLAR);
    const yur = rnd() < 0.42;
    const ega = yur ? tanla(EGA_YUR) : tanla(EGA_JIS);
    /* nom navbat bilan beriladi (tasodifiy son baribir olinadi, keyingi qiymatlar ketma-ketligi o'zgarmaydi) */
    rnd();
    const nomKalit = t[1] === "yuk" ? "Yuk avtotransport" : t[0];
    const royxat = NOM_BOSH[nomKalit];
    const nomQisqa = royxat[(NOM_NAVBAT[nomKalit] = (NOM_NAVBAT[nomKalit] || 0) + 1) % royxat.length];
    const baho = bahoSiljit(oraliq(t[4], t[5]));
    const qoplash = Math.round(oraliq(58, 260) * (0.9 + r4() * 0.24));
    const kunlar = oraliq(35, 720);
    const eskiBosq = kunlar > 500 ? tanla([4, 5, 6]) : kunlar > 300 ? tanla([3, 4, 2]) : kunlar > 150 ? tanla([2, 1]) : tanla([0, 1]);
    const maydon = t[3] === "dona" ? null : oraliq(t[2][0], t[2][1]);
    suratOtkaz();
    oraliq(0, 1); oraliq(0, 1); oraliq(0, 1);                      /* sobiq egasining raqami */
    tanla([0]); oraliq(0, 1); oraliq(0, 1); oraliq(0, 1);           /* telefon */
    oraliq(0, 1); tanla([0]); oraliq(0, 1); tanla([0]);             /* kredit shartnomasi */
    const uy = oraliq(1, 120);
    oraliq(0, 1); oraliq(0, 1);                                     /* eski baholash sanasi */
    rnd();                                                          /* eski sug'urta belgisi */
    oraliq(0, 1);                                                   /* eski nazorat bali */
    const masul = tanla(ESKI_MASUL);
    if (eskiBosq >= 2) tanla([0]);
    if (eskiBosq >= 3) oraliq(0, 1);
    if (eskiBosq >= 4) oraliq(0, 1);
    oraliq(0, 1); oraliq(0, 1); oraliq(0, 1); oraliq(0, 1);         /* eski muddat va tarix */
    oraliq(0, 1); oraliq(0, 1); oraliq(0, 1); oraliq(0, 1);         /* eski hujjat hajmlari */
    for (let k = 0; k < 12; k++) rnd();                             /* eski to'lov intizomi */
    return {t, hudud, manzilBosh, filial, tumanNomi, yur, ega, nomQisqa, baho, qoplash, kunlar, maydon, uy, masul};
  }

  /* ============================================================
     1. Aktivlar (namoyish)
     ============================================================ */
  if (namoyish) {
    const {r: r2, tanla: tanla2, oraliq: oraliq2, ehtimol: eh2} = G2;
    const KERAK = 267;
    const yangi = [];
    for (let i = D.YOZUVLAR.length; i < KERAK; i++) {
      const e = eskiNavbat();
      const rasmTuri = e.t[1];
      const ti = D.turInfo(rasmTuri);
      const turKalit = ti.turKalit;
      const binoli = turKalit === "noturar" || turKalit === "turar";
      const hududKod = D.hududKodi(e.hudud);
      const hk = D.HUDUD_KODLAR[hududKod] || {};
      /* Reyestr raqamidagi yil balansga qabul qilingan yil. Raqam kundan kunga o'zgarmasligi kerak (saqlangan
         o'zgarishlar va havolalar raqamga bog'langan), shuning uchun yil namoyish reyestri yig'ilgan sanaga
         (RAQAM_SANASI) nisbatan olinadi: shu davrda ko'rilganda yil qabul sanasiga to'liq mos keladi. */
      const yil = D.kunQosh(RAQAM_SANASI, -e.kunlar).getFullYear();
      const id = "AK-" + yil + "/" + String(1000 + i * 37 % 8999).padStart(4, "0");
      const qarz = Math.max(24, Math.round(e.baho / (e.qoplash / 100)));
      const balansQiymat = yaxlit(Math.min(qarz, e.baho * 0.92));
      const balansSana = nisbiy(-e.kunlar);
      /* qabul asosi va holat */
      const asos = eh2(0.06) ? "boshqa" : tanla2(["sud", "sud", "sud", "notarial", "takroriy", "takroriy", "ixtiyoriy"]);
      let holat;
      const h = r2();
      if (e.kunlar < 150 && h < 0.25) holat = "Rasmiylashtirilmoqda";
      else if (h < 0.42) holat = "Balansda";
      else if (h < 0.66) holat = "Sotuvga tayyorlanmoqda";
      else if (h < 0.80) holat = "Lotda";
      else if (h < 0.87) holat = binoli ? "Ijarada" : "Sotuvga tayyorlanmoqda";
      /* bo'lib to'lash e-auksiondan keyin: balansda 120 kundan kam turgan aktiv hali lotda */
      else if (h < 0.95) holat = e.kunlar >= 120 ? "Bo'lib to'lashda" : "Lotda";
      else holat = e.kunlar > 365 ? "Davaktivga o'tkazilgan" : "Balansda";
      /* baholanmagan aktiv faqat dastlabki holatlarda bo'ladi */
      const baholanmagan = ["Balansda", "Rasmiylashtirilmoqda"].indexOf(holat) >= 0 && eh2(0.3);
      /* Baholash 12 oy amal qiladi: yuqori chegara 375 kun, eskirgan hisobot bor-yo'g'i bir necha aktivda
         va muddati 10 kundan ko'p o'tmagan (buyurtma berilgan, yangi hisobot kutilmoqda) */
      const bahoKun = Math.min(e.kunlar - 5, oraliq2(20, 375));
      const foydali = binoli ? e.maydon : 0;
      const maydon = !binoli ? {} : rasmTuri === "kopqavat"
        ? {yer: 0, qurilishOsti: 0, foydali}
        : {yer: Math.round(foydali * (1.3 + r2() * 2.2)), qurilishOsti: Math.round(foydali * (0.95 + r2() * 0.2)), foydali};
      const manzil = !binoli ? "Bank saqlash maydonchasi, " + e.manzilBosh
        : rasmTuri === "kopqavat" ? e.manzilBosh + ", " + e.nomQisqa + ", " + (e.uy % 90 + 1) + "-xonadon"
        : / tumani$/.test(e.manzilBosh) ? e.manzilBosh + ", " + TUMAN_KOCHA[e.uy % TUMAN_KOCHA.length] + ", " + e.uy + "-uy"
        : e.manzilBosh + " ko'chasi, " + e.uy + "-uy";
      const rasmiy = holat !== "Rasmiylashtirilmoqda" && eh2(0.85);
      const huquq = binoli
        ? {kadastrRaqami: rasmiy ? String(oraliq2(10, 14)) + ":" + String(oraliq2(1, 12)).padStart(2, "0") + ":" + String(oraliq2(1, 20)).padStart(2, "0") + ":" + String(oraliq2(1, 9)).padStart(2, "0") + ":" + String(oraliq2(1, 999)).padStart(4, "0") : null,
           qaydSana: rasmiy ? nisbiy(-e.kunlar + oraliq2(15, 60)) : null, reyestrKochirma: rasmiy ? "RK-" + yil + "/" + oraliq2(10000, 59999) : null,
           yerHuquqiTuri: rasmTuri === "kopqavat" ? "Umumiy ulushli mulk" : tanla2(["Mulk", "Ijara", "Doimiy foydalanish"]),
           taqiqlar: eh2(0.12) ? [{turi: tanla2(["Soliq taqiqi", "MIB taqiqi"]), organ: hk.markaz ? hk.markaz + " DSI" : "DSI", sana: nisbiy(-e.kunlar - oraliq2(30, 200)), yechilganSana: rasmiy ? nisbiy(-e.kunlar + oraliq2(10, 40)) : null}] : []}
        : (turKalit === "transport" || turKalit === "texnika"
          ? {davlatRaqami: String(oraliq2(1, 95)).padStart(2, "0") + " " + tanla2(["A", "B", "M", "S"]) + " " + oraliq2(100, 999) + " " + tanla2(["AA", "BA", "KA", "MB"]),
             vin: "XWB" + Math.floor(r2() * 1e14).toString(36).toUpperCase().padEnd(14, "0").slice(0, 14),
             texPasport: "AAF " + oraliq2(1000000, 9999999),
             /* YHXXda qayta qayd 10 kun ichida (VM 683). Rasmiylashtirish tugamagan transport ham 30 kundan keyin
                qayd etilgan: aks holda navbatda bir yil kechikkan vazifa turib qolardi. Sana reyestr raqamidan olinadi,
                tasodifiy son olinmaydi */
             yhxxQaydSana: rasmiy ? nisbiy(-e.kunlar + oraliq2(3, 12)) : e.kunlar > 30 ? nisbiy(-e.kunlar + 3 + iz(id) % 8) : null}
          : {});
      /* kommunal: obyekt odatda hisoblagichlari nolga tushirilgan holda keladi */
      const kommunal = !binoli ? [] : D.KOMMUNAL_XIZMATLAR.map(k => {
        const r = r2();
        const yoq = (k.kalit === "gaz" && ["ombor", "issiqxona", "dokon"].indexOf(rasmTuri) >= 0 && r < 0.4);
        const ulangan = !yoq && r < (k.kalit === "elektr" ? 0.38 : 0.28);
        const holatK = yoq ? "mavjud emas" : ulangan ? "ulangan" : (r > 0.92 ? "vaqtincha to'xtatilgan" : "uzilgan");
        const qarzOld = !yoq && eh2(0.4) ? yaxlit(r2() * 24) : 0;
        return D.kommunalQator(k.kalit, yoq ? {holat: holatK} : {
          holat: holatK, hisoblagich: k.kalit[0].toUpperCase() + "-" + id.slice(-4) + "-" + oraliq2(1, 20),
          korsatkich: ulangan ? oraliq2(100, 60000) : 0, korsatkichSana: ulangan ? nisbiy(-oraliq2(2, 35)) : balansSana,
          plomba: eh2(0.6) ? "P-" + oraliq2(100000, 999999) : null,
          shaxsiyHisob: ulangan ? oraliq2(1000, 9999) + "-" + id.slice(-4) : null,
          avvalgiQarz: qarzOld, qarzYoqligiMalumotnoma: ulangan ? true : null,
          texnikShartAriza: !ulangan && k.kalit === "elektr" && eh2(0.3) ? "MG-" + BUGUN.getFullYear() + "/" + oraliq2(10000, 99999) : null,
          texnikShartSana: null, shartnomaSana: ulangan ? nisbiy(-e.kunlar + oraliq2(20, 90)) : null,
          oylikXarajat: ulangan ? yaxlit((k.kalit === "elektr" ? 0.3 : 0.1) + r2() * (foydali / 800), 2) : null
        });
      });
      const qTur = binoli
        ? tanla2(["post", "pult", "pult", "mobil", "avtonom", "avtonom", "ichki", null, null])
        : tanla2(["post", "post", "avtonom", "avtonom", null]);
      const ns = namunaSurati(rasmTuri, e.nomQisqa);
      const y = D.aktivQolip({
        id, nom: e.nomQisqa + ", " + e.manzilBosh, qisqa: e.nomQisqa,
        tur: D.ASOSIY_TURLAR.find(a => a.kalit === turKalit).nom, turKalit, rasmTuri, binoli,
        hudud: e.hudud, hududKod, hududToliq: e.manzilBosh, tuman: e.tumanNomi, manzil,
        /* Namoyish manzili aniq nuqtani bildirmaydi: joy hudud markazi, aniq:false (xarita "taxminiy joy" deb ko'rsatadi).
           r2() ikki marta chaqiriladi, shunda keyingi tasodifiy qiymatlar ketma-ketligi o'zgarmaydi */
        joy: hk.lat ? (r2(), r2(), {lat: hk.lat, lng: hk.lng, aniq: false}) : null,
        filial: e.filial, filialKod: FILIAL_KODLAR[e.filial] || null, sobiqEga: e.ega,
        tafsilot: binoli ? null : e.nomQisqa + ", " + tanla2(["oq", "kulrang", "qora", "ko'k"]) + " rang",
        holat, bosqich: D.HOLAT_BOSQICH[holat], masul: tanla2(MENEJERLAR), konservatsiya: binoli && e.kunlar > 500 && eh2(0.25),
        balans: {sana: balansSana, qiymat: balansQiymat, hisobvaraq: D.param("hisobvaraqAktiv"), qabulAsosi: asos,
          asosHujjat: (() => {
            /* raqamdagi yil hujjat sanasining yili (tasodifiy sonlar avvalgi tartibda olinadi) */
            const n = oraliq2(1000, 9999), sana = nisbiy(-e.kunlar - oraliq2(5, 60));
            const hYil = D.kunQosh(RAQAM_SANASI, kunFarqi(BUGUN, sanaOqi(sana))).getFullYear();
            return {raqam: (asos === "sud" ? "2-" : asos === "notarial" ? "NK-" : asos === "takroriy" ? "EA-" : "TK-") + n + "/" + hYil, sana};
          })(),
          yopilganQarz: asos === "boshqa" ? null : balansQiymat, ixtiyoriyTopshirish: asos === "ixtiyoriy"},
        qiymat: baholanmagan ? {bozor: null, baholanmagan: true}
          : {bozor: e.baho, tugatish: Math.round(e.baho * (0.72 + r2() * 0.1)), bahoSana: nisbiy(-bahoKun),
             baholovchi: tanla2(["«Baholash Servis» MChJ", "«Expert Baho» MChJ", "«Milliy Baholash Markazi» DUK", "«Aniq Baho» MChJ"])},
        maydon, huquq, kommunal,
        rasm: ns ? ns.yol : "", rasmKichik: ns ? ns.kichik : "",
        rasmManba: ns ? ns.manba : null, rasmUmumiy: false,
        himoya: {qoriqlashTuri: qTur, qurilmaSoni: 0, andoza: null},
        sotuv: {holat: holat === "Sotuvga tayyorlanmoqda" ? "tayyorlanmoqda" : holat === "Lotda" ? "lotda" : holat === "Bo'lib to'lashda" ? "sotildi" : holat === "Davaktivga o'tkazilgan" ? "davaktiv" : null,
                usul: holat === "Lotda" ? "eauksion" : holat === "Bo'lib to'lashda" ? "bolib" : holat === "Davaktivga o'tkazilgan" ? "davaktiv" : holat === "Ijarada" ? "ijara" : null},
        tarix: [{sana: balansSana, voqea: "Balansga qabul qilindi", izoh: D.qabulAsosiInfo(asos).nom}]
      });
      y.himoya.andoza = D.himoyaAndozasi(y).id;
      if (!baholanmagan) y.tarix.push({sana: y.qiymat.bahoSana, voqea: "Baholash hisoboti qabul qilindi", izoh: "Bozor qiymati: " + D.pul(e.baho)});
      if (huquq.qaydSana) y.tarix.push({sana: huquq.qaydSana, voqea: "Huquq bank nomiga ro'yxatdan o'tkazildi", izoh: ""});
      if (huquq.yhxxQaydSana) y.tarix.push({sana: huquq.yhxxQaydSana, voqea: "YHXXda bank nomiga qayd etildi", izoh: ""});
      y.tarix.sort((a, b) => sanaOqi(a.sana) - sanaOqi(b.sana));
      yangi.push(y);
    }
    yangi.forEach(y => { D.YOZUVLAR.push(y); D.reyestrgaQosh(y, "balans"); });
    /* Bitta namuna surati ikkita aktivda turishi mumkin. Reyestr yig'ilib bo'lgach, har bir
       fayl yo'li nechta yozuvda uchraganini sanaymiz va takrorlanganlarining hammasiga
       «Umumiy surat» belgisini qo'yamiz — shunda rahbariyat bir xil binoni ikki kartochkada
       ko'rganda buni darrov tushunadi. */
    const SURAT_SANOQ = {};
    D.YOZUVLAR.forEach(y => { if (y.rasm) SURAT_SANOQ[y.rasm] = (SURAT_SANOQ[y.rasm] || 0) + 1; });
    D.YOZUVLAR.forEach(y => { y.rasmUmumiy = !!(y.rasm && SURAT_SANOQ[y.rasm] > 1); });
  }

  /* ============================================================
     2. Bog'liq to'plamlar (namoyish). Mahalliy rejimda bo'sh.
     ============================================================ */
  const KORIKLAR = [], SUGURTALAR = [], BAHOLASHLAR = [], HUJJATLAR = [], XARAJATLAR = [], QORIQLASH = [],
        KOMMUNAL_ARIZALAR = [], INVENTAR = [], INVENTARIZATSIYALAR = [], SOLIQ = [], LOTLAR = [], TAKLIFLAR = [],
        XARIDORLAR = [], SHARTNOMALAR = [], IJARA = [], PAKETLAR = [], ARXIV = [], SUGURTA_DAVOLARI = [], TASDIQLAR = [],
        MENING_VAZIFALARIM = [], MB_HISOBOTLAR = [], ZAXIRA_TARIX = [], FAYLLAR = [];

  /* Ko'rik chek-listlari: obyekt turi bo'yicha */
  const KORIK_CHEKLIST = {
    bino: ["Eshik, darvoza va qulflar butun", "Deraza va panjaralar butun", "Tom va tarnovlar holati", "Devor va poydevorda yoriq yo'q",
           "Hisoblagichlar va plombalar joyida", "Ruxsatsiz foydalanish belgilari yo'q", "Hudud va perimetr toza", "Himoya qurilmalari ishlaydi"],
    transport: ["Saqlash joyida turibdi", "Kuzov va oynalar butun", "Butlovchi qismlar to'liq", "Akkumulyator holati",
                "Kilometraj yoki motosoat qayd etildi", "Kalitlar va hujjatlar joyida", "GPS-treker ishlaydi"],
    uskuna: ["Saqlash joyida turibdi", "Seriya raqami mos", "Butlovchi qismlar to'liq", "Korroziya va shikast yo'q", "Qadoq yoki himoya qoplamasi butun"]
  };
  const chekListTuri = y => D.binolimi(y) ? "bino" : y.turKalit === "uskuna" ? "uskuna" : "transport";

  if (namoyish) {
    const {r: r3, tanla: tanla3, oraliq: oraliq3, ehtimol: eh3} = G3;
    const YOZ = D.YOZUVLAR;
    const turgan = y => kunFarqi(y.balans.sana, BUGUN);

    /* ---------- Ko'riklar ---------- */
    let korikN = 400;
    const XULOSA_YAXSHI = ["Obyekt saqlanish holati qoniqarli, plombalar butun.", "Tashqi konstruksiyalar butun, ruxsatsiz foydalanish belgilari yo'q.",
      "Holat o'zgarmagan, fotojadval yangilandi."];
    const XULOSA_KAMCHILIK = ["Tomdan suv o'tishi aniqlandi, ta'mir talab qilinadi.", "Darvoza qulfi almashtirilishi kerak.",
      "Hududda begona buyumlar tashlangan, tozalash kerak.", "Akkumulyator zaryadsizlangan, almashtirish taklif qilindi."];
    YOZ.forEach(y => {
      const davr = D.binolimi(y) ? D.param("korikDavriBino") : D.param("korikDavriTransport");
      const tk = turgan(y);
      const royxat = [];
      if (tk < 420) royxat.push({kun: -tk + oraliq3(1, 3), korikTuri: "Birlamchi", holat: "otkazildi"});
      const oxirgi = -oraliq3(3, Math.max(4, davr - 5));
      [oxirgi - davr, oxirgi].forEach(k => { if (-k < tk - 5) royxat.push({kun: k, korikTuri: eh3(0.1) ? "Navbatdan tashqari" : "Rejali", holat: "otkazildi"}); });
      const keyingi = oxirgi + davr;
      if (keyingi < 0) royxat.push({kun: keyingi, korikTuri: "Rejali", holat: "kechikkan"});
      else {
        /* Kechikkan ko'rik portfelda kam: tasodifiy son avvalgidek olinadi, lekin kechikish faqat har beshinchi
           nomzodda qoladi (identifikator bo'yicha), qolganlari rejadagi sanasida turadi */
        const kech = eh3(0.14) ? -oraliq3(2, 20) : null;
        royxat.push({kun: kech != null && iz(y.id) % 5 === 0 ? kech : keyingi, korikTuri: y.holat === "Lotda" && eh3(0.4) ? "Sotuv oldi" : "Rejali", holat: "rejada"});
      }
      royxat.forEach(k => {
        if (k.holat === "rejada" && k.kun < 0) k.holat = "kechikkan";
        korikN++;
        const otgan = k.holat === "otkazildi";
        const kamchilik = otgan && eh3(0.22);
        const tur = chekListTuri(y);
        const korikSana = nisbiy(k.kun);
        KORIKLAR.push({
          /* id yili ko'rik sanasidan olinadi */
          id: "KO-" + sanaOqi(korikSana).getFullYear() + "/" + String(korikN).padStart(4, "0"), obyektId: y.id,
          korikTuri: k.korikTuri, tur: k.korikTuri, sana: korikSana, holat: k.holat, inspektor: tanla3(INSPEKTORLAR),
          holatBall: otgan ? (kamchilik ? oraliq3(2, 3) : oraliq3(4, 5)) : null,
          chekList: otgan ? KORIK_CHEKLIST[tur].map((band, j) => ({band, natija: kamchilik && j === 2 ? "kamchilik" : "joyida"})) : [],
          kamchiliklar: kamchilik ? tanla3(XULOSA_KAMCHILIK) : "",
          xarajatTaklifi: kamchilik ? yaxlit(1 + r3() * 14) : null,
          keyingiKorikSana: otgan ? nisbiy(k.kun + davr) : null,
          xulosa: otgan ? (kamchilik ? "Kamchilik bor" : tanla3(XULOSA_YAXSHI)) : "",
          izoh: k.holat === "kechikkan" ? "Reja muddati o'tgan, ko'rik o'tkazilmagan." : k.holat === "rejada" ? "Rejaga muvofiq." : ""
        });
      });
    });

    /* ---------- Sug'urta ---------- */
    const KOMPANIYA = ["O'zbekinvest", "Kafolat", "Gross Insurance", "Alskom", "Apex Insurance"];
    let polisN = 12000;
    const polisQosh = (y, polisTuri, summa, mukofotFoiz) => {
      /* Muddati o'tgan polis kam va yaqinda tugagan: yangilash jarayonda */
      const tugashKun = eh3(0.03) ? -oraliq3(3, 40) : oraliq3(5, 360);
      const tugash = kunQosh(BUGUN, tugashKun), boshlanish = kunQosh(tugash, -365);
      polisN++;
      const id = "PL-" + boshlanish.getFullYear() + "/" + String(polisN).padStart(5, "0");
      SUGURTALAR.push({id, obyektId: y.id, polis: id, polisTuri, kompaniya: tanla3(KOMPANIYA), summa,
        mukofot: yaxlit(summa * mukofotFoiz / 100, 2), boshlanish: sanaYoz(boshlanish), tugash: sanaYoz(tugash),
        holat: tugashKun < 0 ? "muddati tugagan" : tugashKun <= 30 ? "tugaydi" : "amalda"});
    };
    YOZ.forEach(y => {
      if (eh3(0.08)) return;                                  /* polisi yo'q obyektlar ham bor */
      const summa = y.qiymat.bozor || y.balans.qiymat;
      if (y.turKalit === "transport") {
        polisQosh(y, "OSAGO", D.param("osagoSummaMln"), 0.25);
        if (eh3(0.5)) polisQosh(y, "mulk", summa, 1.2);
      } else polisQosh(y, "mulk", summa, 0.35 + r3() * 0.25);
      if (["sex", "ferma"].indexOf(y.rasmTuri) >= 0 && y.kommunal.some(k => k.xizmat === "gaz" && k.holat === "ulangan"))
        polisQosh(y, "XICHO", 50, 0.6);
    });

    /* ---------- Baholash ---------- */
    const BAHOLOVCHI = {"«Baholash Servis» MChJ": "BL-0214", "«Expert Baho» MChJ": "BL-0387", "«Milliy Baholash Markazi» DUK": "BL-0011",
      "«Aniq Baho» MChJ": "BL-0452", "«Andoza Baho» MChJ": "BL-0296"};
    const USUL = ["Qiyosiy yondashuv", "Daromad yondashuvi", "Xarajat yondashuvi"];
    let bahoN = 300;
    YOZ.forEach(y => {
      if (y.qiymat.bozor == null) return;
      const oxirgiSana = sanaOqi(y.qiymat.bahoSana);
      const eski = eh3(0.35) && kunFarqi(y.balans.sana, oxirgiSana) > 200;
      const avvalgi = Math.round(y.qiymat.bozor * (0.88 + r3() * 0.2));
      const qosh = (sana, bozor, tugatish, oldingi) => {
        bahoN++;
        const baholovchi = y.qiymat.baholovchi && BAHOLOVCHI[y.qiymat.baholovchi] ? y.qiymat.baholovchi : tanla3(Object.keys(BAHOLOVCHI));
        const amal = oyQosh(sana, D.param("bahoAmalOy"));
        const qolgan = kunFarqi(BUGUN, amal);
        BAHOLASHLAR.push({id: "BH-" + sana.getFullYear() + "/" + String(bahoN).padStart(4, "0"), obyektId: y.id, sana: sanaYoz(sana),
          hisobotRaqami: "BH-" + oraliq3(100, 999) + "/" + sana.getFullYear(), bozorQiymati: bozor, tugatishQiymati: tugatish,
          avvalgi: oldingi, baholovchi, litsenziya: BAHOLOVCHI[baholovchi], usul: tanla3(USUL),
          amalQilishTugash: sanaYoz(amal), holat: qolgan < 0 ? "eskirgan" : qolgan <= 60 ? "tugaydi" : "dolzarb"});
      };
      if (eski) qosh(kunQosh(y.balans.sana, -oraliq3(5, 30)), avvalgi, Math.round(avvalgi * 0.78), null);
      qosh(oxirgiSana, y.qiymat.bozor, y.qiymat.tugatish, eski ? avvalgi : null);
    });

    /* ---------- Hujjatlar: bosqichlar bo'yicha majburiy ro'yxat, ayrimlari yetishmaydi ---------- */
    const BOSQ = D.BOSQICHLAR.map(b => b.kalit);
    const YUKLOVCHI = MENEJERLAR.concat(["Sobirov Ulug'bek"]);
    /* Hujjat raqami prefiksi: tur nomidagi so'zlarning bosh harflari ("E'lon matni" -> EM, "Kadastr pasporti" -> KP) */
    const hujjatPrefiks = tur => String(tur).replace(/['’ʻʼ`]/g, "").split(/[\s-]+/).filter(Boolean).map(w => w[0]).join("").toUpperCase();
    let hujN = 200;
    YOZ.forEach(y => {
      const gacha = BOSQ.indexOf(y.bosqich);
      BOSQ.slice(0, gacha + 1).forEach(b => {
        if (b === "chiqim") return;
        D.majburiyHujjatlar(b, y.balans.qabulAsosi, y.turKalit).forEach(tur => {
          if (b === y.bosqich ? eh3(0.35) : eh3(0.1)) return;   /* joriy bosqich hujjatlari ko'proq yetishmaydi */
          hujN++;
          const sana = b === "qabul" ? kunQosh(y.balans.sana, oraliq3(0, 5)) : kunQosh(BUGUN, -oraliq3(3, Math.max(4, turgan(y) - 5)));
          HUJJATLAR.push({id: "HJ-" + hujN, obyektId: y.id, nom: tur, tur, bosqich: b,
            raqam: hujjatPrefiks(tur) + "-" + oraliq3(1000, 9999), sana: sanaYoz(sana), amalQilishTugash: null,
            holat: eh3(0.86) ? "Tasdiqlangan" : "Ko'rib chiqilmoqda", format: "PDF",
            hajm: oraliq3(1, 6) + "," + oraliq3(1, 9) + " MB", yuklagan: tanla3(YUKLOVCHI), faylId: null});
        });
      });
    });

    /* ---------- Qo'riqlash shartnomalari ---------- */
    let qN = 100;
    YOZ.forEach(y => {
      const t = y.himoya.qoriqlashTuri;
      if (["post", "pult", "mobil", "ichki"].indexOf(t) < 0) return;
      qN++;
      const bosh = kunQosh(y.balans.sana, oraliq3(1, 20));
      const tugash = oyQosh(bosh, 12 * Math.max(1, Math.ceil((kunFarqi(bosh, BUGUN) + 30) / 365)));
      const hk = D.HUDUD_KODLAR[y.hududKod] || {};
      QORIQLASH.push({id: "QQ-" + bosh.getFullYear() + "/" + String(qN).padStart(4, "0"), obyektId: y.id, qoriqlashTuri: t,
        ijrochi: t === "ichki" ? "Bank xavfsizlik xizmati" : "IIV huzuridagi Qo'riqlash departamenti, " + (hk.toliq || y.hudud) + " boshqarmasi",
        shartnomaRaqami: t === "ichki" ? null : "QD-" + oraliq3(1000, 9999) + "/" + bosh.getFullYear(),
        boshlanish: sanaYoz(bosh), tugash: sanaYoz(tugash),
        oylikTolov: t === "post" ? yaxlit(6 + r3() * 3) : t === "pult" ? yaxlit(0.6 + r3() * 0.6, 2) : t === "mobil" ? yaxlit(1.5 + r3() * 1.5) : 0,
        javobVaqtiDaq: t === "post" ? 0 : t === "pult" ? oraliq3(8, 20) : t === "mobil" ? oraliq3(15, 40) : null,
        holat: kunFarqi(BUGUN, tugash) < 0 ? "tugagan" : "amalda"});
    });

    /* ---------- Kommunal arizalar ---------- */
    let kaN = 100;
    YOZ.forEach(y => y.kommunal.forEach(k => {
      if (!k.texnikShartAriza) return;
      kaN++;
      const sana = kunQosh(BUGUN, -oraliq3(1, 25));
      const tugagan = eh3(0.4);
      if (tugagan) k.texnikShartSana = sanaYoz(D.ishKuniQosh(sana, 3));
      KOMMUNAL_ARIZALAR.push({id: "KA-" + sana.getFullYear() + "/" + kaN, obyektId: y.id, xizmat: k.xizmat, tur: "Texnik shart",
        raqam: k.texnikShartAriza, sana: sanaYoz(sana), muddat: sanaYoz(D.ishKuniQosh(sana, 3)),
        holat: tugagan ? "bajarildi" : "ko'rib chiqilmoqda", izoh: "my.gov.uz orqali, 20 kVt gacha"});
    }));
    YOZ.filter(y => y.kommunal.some(k => k.holat === "uzilgan" && k.avvalgiQarz > 0)).slice(0, 14).forEach(y => {
      const k = y.kommunal.find(x => x.holat === "uzilgan" && x.avvalgiQarz > 0);
      kaN++;
      const sana = kunQosh(BUGUN, -oraliq3(2, 40));
      KOMMUNAL_ARIZALAR.push({id: "KA-" + sana.getFullYear() + "/" + kaN, obyektId: y.id, xizmat: k.xizmat,
        tur: "Shaxsiy hisobni qayta rasmiylashtirish", raqam: null, sana: sanaYoz(sana), muddat: null,
        holat: "qarz yopilishi kutilmoqda", izoh: "Avvalgi egasidan qolgan qarz: " + D.pul(k.avvalgiQarz)});
    });

    /* ---------- Inventar ---------- */
    let invN = 0;
    const invQosh = (y, nom, marka, model, yil, vin, km) => {
      invN++;
      const raqam = "INV-" + String(invN).padStart(5, "0");
      const butlik = eh3(0.88);
      INVENTAR.push({id: raqam, obyektId: y.id, inventarRaqam: raqam, qrKod: "MKB:" + raqam, nom, marka, model, yil, vin,
        motosoatYokiKm: km, butlik, butlikIzoh: butlik ? "" : tanla3(["Akkumulyator yo'q", "Ehtiyot g'ildirak yo'q", "Boshqaruv bloki yechilgan"]),
        akkumulyator: tanla3(["bor", "bor", "zaryadsiz", "yo'q"]), kalit: y.turKalit === "uskuna" ? 0 : oraliq3(1, 2),
        saqlashJoyi: y.manzil, holatBall: oraliq3(2, 5),
        /* oxirgi sanash balansga qabul qilingandan keyin (bugundan o'tmaydi) */
        oxirgiSanash: (() => { const n = kunQosh(BUGUN, -oraliq3(10, 300)), q = kunQosh(sanaOqi(y.balans.sana), 3);
          return sanaYoz(n < q ? (q > BUGUN ? BUGUN : q) : n); })()});
    };
    YOZ.forEach(y => {
      if (y.turKalit === "transport" || y.turKalit === "texnika") {
        const [marka, ...qolgan] = y.qisqa.replace(/\s*\(\d{4}\)/, "").split(" ");
        const yil = +((/\((\d{4})\)/.exec(y.qisqa) || [])[1] || 2020);
        invQosh(y, y.qisqa, marka, qolgan.join(" ") || marka, yil, y.huquq.vin, oraliq3(8000, 240000) + " km");
      } else if (y.turKalit === "uskuna") {
        invQosh(y, y.qisqa, tanla3(["Juki", "Brother", "Bühler", "Ilpa", "Esab"]), "SN-" + oraliq3(10000, 99999), oraliq3(2012, 2022), null, oraliq3(200, 9000) + " motosoat");
      } else if (["sex", "ferma"].indexOf(y.rasmTuri) >= 0 && eh3(0.4)) {
        for (let k = 0; k < oraliq3(1, 3); k++)
          invQosh(y, tanla3(["Sovutish agregati", "Generator", "Tikuv liniyasi", "Inkubator"]), tanla3(["Bitzer", "FG Wilson", "Juki", "Petersime"]),
            "SN-" + oraliq3(10000, 99999), oraliq3(2010, 2021), null, null);
      }
    });
    const yilOxiri = new Date(BUGUN.getFullYear() - 1, 11, 20);
    /* Yillik inventarizatsiya faqat o'sha sanada balansda bo'lgan aktivlarni sanaydi.
       Natija hamma birlik uchun hisoblanadi (tasodifiy sonlar tartibi saqlanadi), keyin sana bo'yicha saralanadi. */
    const balanslimi = i => { const y = D.topish(i.obyektId); return !!y && sanaOqi(y.balans.sana) <= yilOxiri; };
    const yillikNatija = INVENTAR.map(i => ({inventarId: i.id, topildi: i.butlik || eh3(0.6), izoh: i.butlik ? "" : i.butlikIzoh}))
      .filter((n, k) => balanslimi(INVENTAR[k]));
    const yillikBirlik = INVENTAR.filter(balanslimi);
    INVENTARIZATSIYALAR.push(
      {id: "INVZ-" + yilOxiri.getFullYear() + "/01", sana: sanaYoz(yilOxiri), turi: "yillik",
       komissiya: ["Tosheva Barno", "Karimova Feruza", "Xolmatova Zulfiya"], obyektlar: yillikBirlik.map(i => i.obyektId).filter((v, i, a) => a.indexOf(v) === i),
       natijalar: yillikNatija,
       kamomad: 0, ortiqcha: 0, holat: "yakunlangan"},
      {id: "INVZ-" + BUGUN.getFullYear() + "/02", sana: nisbiy(oraliq3(5, 25)), turi: "navbatdan tashqari",
       komissiya: ["Ismoilova Nilufar", "Sattorov Javohir"], obyektlar: INVENTAR.filter(i => !i.butlik).map(i => i.obyektId),
       natijalar: [], kamomad: 0, ortiqcha: 0, holat: "rejada"});
    /* kamomad natijalardan sanaladi: topilmagan inventar soni */
    INVENTARIZATSIYALAR.forEach(z => { z.kamomad = (z.natijalar || []).filter(n => n.topildi === false).length; });
    /* Kamomad hodisasi (GH-...-00213) haqiqiy kamomaddan olinadi: yillik inventarizatsiyada topilmagan birlik
       va shu aktivning oxirgi o'tkazilgan ko'rigi (u ham kamomadni qayd etadi) */
    (function kamomadHodisasi() {
      const h = (D.HODISALAR || []).find(x => x.hodisa === "Inventar ro'yxatida kamomad");
      if (!h) return;
      const faol = i => { const y = i && D.topish(i.obyektId); return !!y && y.holat !== "Chiqarildi"; };
      /* avval yillik inventarizatsiyada topilmagan birlik, bo'lmasa butlovchi qismi yetishmaydigan birlik
         (navbatdan tashqari inventarizatsiya aynan shu birliklar uchun rejalashtirilgan) */
      const topilmagan = yillikNatija.filter(n => n.topildi === false).map(n => INVENTAR.find(i => i.id === n.inventarId)).filter(faol);
      const oxirgiKorik = id => KORIKLAR.filter(k => k.obyektId === id && k.holat === "otkazildi" && sanaOqi(k.sana) <= BUGUN)
        .sort((a, b) => sanaOqi(b.sana) - sanaOqi(a.sana))[0];
      const nomzod = (topilmagan.length ? topilmagan : INVENTAR.filter(i => !i.butlik && faol(i)))
        .map(i => ({i, k: oxirgiKorik(i.obyektId)}))
        .sort((a, b) => (b.k ? +sanaOqi(b.k.sana) : 0) - (a.k ? +sanaOqi(a.k.sana) : 0))[0];   /* eng yangi ko'rik */
      if (!nomzod) { D.HODISALAR.splice(D.HODISALAR.indexOf(h), 1); return; }
      const u = nomzod.i, korik = nomzod.k;
      const yoq = !topilmagan.length;
      const y = D.topish(u.obyektId);
      const nom = u.nom + " (" + u.id + ")";
      const topilma = yoq ? nom + " to'liq emas: " + u.butlikIzoh.toLowerCase() : nom + " joyida topilmadi";
      if (korik) {
        Object.assign(korik, {holatBall: Math.min(korik.holatBall || 2, 2), xulosa: "Kamchilik bor",
          kamchiliklar: "Inventar ro'yxatidagi " + topilma + "."});
        const b = (korik.chekList || []).find(c => /Butlovchi|Ruxsatsiz/.test(c.band)) || (korik.chekList || [])[0];
        if (b) b.natija = "kamchilik";
      }
      const sana = korik ? korik.sana : sanaYoz(BUGUN);
      Object.assign(h, {obyektId: y.id, bino: y.qisqa, joy: y.hududToliq, sarlavha: y.qisqa + " — " + h.hodisa,
        vaqt: D.__vaqtNisbiy(kunFarqi(BUGUN, sanaOqi(sana)), 11, 40),
        tavsif: (korik ? "Rejali ko'rikda" : "Tekshiruvda") + " inventar ro'yxatidagi " + topilma + ". " +
          (yoq ? "Navbatdan tashqari inventarizatsiya rejalashtirildi." : "Yillik inventarizatsiyada (" + sanaYoz(yilOxiri) + ") ham kamomad qayd etilgan.") +
          " Xavfsizlik xizmati politsiyaga ariza berdi.",
        iibAriza: {raqam: "IIB-" + (y.hududKod || "TS") + "-" + BUGUN.getFullYear() + "/3312", sana}});
    })();

    /* ---------- Soliq: oxirgi to'rt chorak (to'langan) va joriy chorak ---------- */
    const chorakKodi = d => d.getFullYear() + "-Q" + (Math.floor(d.getMonth() / 3) + 1);
    const davrlar = [-12, -9, -6, -3, 0].map(n => chorakKodi(oyQosh(BUGUN, n)));
    YOZ.forEach(y => {
      if (!D.binolimi(y)) return;
      davrlar.forEach((davr, i) => {
        const h = D.soliqHisobi(y, davr);
        if (!h || h.qollanmaydi || (h.soliqOy + h.imtiyozOy) === 0) return;
        SOLIQ.push({id: "SQ-" + y.id.replace("/", "-") + "-" + davr, obyektId: y.id, davr, baza: h.baza, stavka: h.stavka,
          summa: h.summa, imtiyoz: h.imtiyoz, yerSoligi: null, holat: i < davrlar.length - 1 ? "to'langan" : "hisoblangan"});
      });
    });

    /* ---------- Lotlar, takliflar, shartnomalar, ijara ---------- */
    const XARIDOR_YUR = ["«Turon Retail» MChJ", "«Sifat Qurilish» MChJ", "«Humo Trade» MChJ", "«Agrotex Invest» MChJ", "«Savdo Plyus» MChJ",
      "«Yashil Vodiy» MChJ", "«Orient Logistik» MChJ", "«Baraka Tekstil» MChJ"];
    const XARIDOR_JIS = ["Soliyev Umidjon", "Alimov Sardor", "Qodirova Malika", "Aliyev Kamron", "Mirzayev Botir", "Rashidova Lola",
      "Nematov Ilhom", "Sodiqov Anvar"];
    const xaridorOl = () => {
      const yur = eh3(0.55);
      return {nom: yur ? tanla3(XARIDOR_YUR) : tanla3(XARIDOR_JIS), tur: yur ? "Yuridik shaxs" : "Jismoniy shaxs"};
    };
    const stir = x => x.tur === "Yuridik shaxs"
      ? "STIR " + (200 + (x.nom.length * 37) % 399) + " " + (100 + (x.nom.charCodeAt(2) * 7) % 899) + " " + (100 + (x.nom.length * 113) % 899)
      : "PINFL " + (3000 + (x.nom.length * 97) % 2999) + " " + (1000 + (x.nom.charCodeAt(1) * 31) % 8999) + " " + (1000 + (x.nom.length * 211) % 8999);
    const bhmChegara = 2000 * D.param("bhmMing") / 1000;     /* mln so'm */
    let lotN = 100, tkN = 400, shN = 100, ijN = 30;
    const lotNarx = y => y.qiymat.bozor || Math.round(y.balans.qiymat * 1.05);
    /* Ijaraga berilgan binoda elektr va suv ijara boshidan ulangan: ijarachi to'laydi (tasodifiy son olinmaydi) */
    const ijaraKommunali = (y, bosh) => {
      const kod = y.id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
      ["elektr", "suv"].forEach((x, j) => {
        const k = (y.kommunal || []).find(q => q.xizmat === x);
        if (!k || k.holat === "ulangan" || k.holat === "mavjud emas") return;
        const ulandi = kunQosh(bosh, 3 + j * 2);
        const oqildi = kunQosh(BUGUN, -(2 + (kod + j * 7) % 20));
        Object.assign(k, {holat: "ulangan", shartnomaSana: sanaYoz(ulandi), korsatkich: 300 + (kod * (j + 3)) % 9000,
          korsatkichSana: sanaYoz(oqildi < ulandi ? ulandi : oqildi), shaxsiyHisob: (1000 + kod % 8999) + "-" + y.id.slice(-4),
          qarzYoqligiMalumotnoma: true, oylikXarajat: yaxlit((x === "elektr" ? 0.3 : 0.1) + ((y.maydon && y.maydon.foydali) || 100) / 800, 2)});
        KOMMUNAL_ARIZALAR.filter(a => a.obyektId === y.id && a.xizmat === x && a.holat !== "bajarildi").forEach(a => {
          a.holat = "bajarildi";
          if (a.tur === "Texnik shart") k.texnikShartSana = a.muddat;
        });
      });
    };
    const lotQosh = (y, holat, elonKun) => {
      lotN++;
      const id = "LT-" + BUGUN.getFullYear() + "/" + String(lotN).padStart(4, "0");
      const narx = lotNarx(y);
      let elon = elonKun != null ? kunQosh(BUGUN, elonKun) : null;
      if (elon) {
        /* e'lon balansga qabuldan 30 kun va boshlang'ich narxni bergan baholashdan 3 kun oldin bo'lmaydi.
           Sotilgan lotda savdo, bayonnoma va shartnoma bugungacha sig'ishi kerak, sig'masa 30 kunlik zaxira olib tashlanadi */
        const bal = sanaOqi(y.balans.sana), baho = sanaOqi(y.qiymat && y.qiymat.bahoSana);
        const oxirgi = kunQosh(BUGUN, holat === "sotildi" ? -(D.param("elonMinKun") + 30) : -5);
        let eng = new Date(Math.max(+kunQosh(bal, 30), baho ? +kunQosh(baho, 3) : 0));
        if (eng > oxirgi) eng = new Date(Math.max(+kunQosh(bal, 1), baho ? +kunQosh(baho, 3) : 0));
        if (elon < eng) elon = eng;
      }
      /* savdo kuni ish kuni (dam olish kuni bo'lsa keyingi ish kuniga suriladi) */
      const savdo = elon ? D.ishKuniQosh(kunQosh(elon, D.param("elonMinKun") + oraliq3(0, 10)), 0) : null;
      const pasaytirishlar = [];
      let joriyNarx = narx;
      if (holat === "elon" && elon && kunFarqi(elon, BUGUN) > 95) {
        const p = D.param("pasaytirishFoiz");
        joriyNarx = Math.round(narx * (1 - p / 100));
        pasaytirishlar.push({sana: sanaYoz(oyQosh(elon, D.param("pasaytirishOy"))), foiz: p, narx: joriyNarx, tasdiqId: null});
      }
      const l = {id, obyektId: y.id, eauksionLotRaqami: elon ? "EA-" + oraliq3(1000000, 9999999) : null, sotishUsuli: "eauksion",
        elonSana: elon ? sanaYoz(elon) : null, savdoSana: savdo ? sanaYoz(savdo) : null,
        boshlangichNarx: narx, minimalNarx: Math.round(joriyNarx * (1 - D.param("takroriySavdoChegirma") / 100)),
        zakalatFoiz: D.param("zakalatFoiz"), qadamFoiz: narx > bhmChegara ? D.param("qadamFoizKatta") : D.param("qadamFoiz"),
        pasaytirishlar, keyingiPasaytirishSana: holat === "elon" ? sanaYoz(oyQosh(elon, D.param("pasaytirishOy") * (pasaytirishlar.length + 1))) : null,
        holat, golib: null, yakuniyNarx: null, bayonnomaSana: null, ishtirokchilarSoni: 0,
        takroriySavdoSana: null, tolovMuddati: null, shartnomaMuddati: null, paketId: null, qarorRaqami: y.sotuv.qarorRaqami || "RQ-" + oraliq3(10, 199)};
      if (holat === "elon" && savdo < BUGUN) {
        l.holat = "otkazilmagan";
        l.takroriySavdoSana = sanaYoz(D.ishKuniQosh(kunQosh(savdo, D.param("takroriySavdoMinKun") + oraliq3(0, 8)), 0));
      }
      LOTLAR.push(l);
      y.sotuv.lotId = id;
      return l;
    };
    const taklifQosh = (y, l, holat, summa) => {
      tkN++;
      const x = xaridorOl();
      const t = {id: "TK-" + BUGUN.getFullYear() + "/" + String(tkN).padStart(4, "0"), obyektId: y.id, lotId: l ? l.id : null,
        xaridor: x.nom, xaridorTuri: x.tur, stirYokiPinfl: stir(x), summa,
        tolovSharti: tanla3(["To'liq to'lov", "Bo'lib to'lash, 24 oy", "Bo'lib to'lash, 36 oy"]),
        sana: nisbiy(-oraliq3(1, 30)), amlNatija: eh3(0.9) ? "toza" : eh3(0.5) ? "tekshirilmoqda" : "shubhali",
        affillanganlik: eh3(0.04), qarorRaqami: null, holat, izoh: ""};
      TAKLIFLAR.push(t);
      return t;
    };
    const shartnomaQosh = (y, l, t, narx, sana, usul, oylar) => {
      shN++;
      const avans = usul === "bolib" ? Math.round(narx * D.param("avansFoiz") / 100 * 10) / 10 : narx;
      const jadval = [];
      if (usul === "bolib") {
        const qoldiq = narx - avans, bir = Math.floor(qoldiq / oylar * 10) / 10;
        for (let k = 1; k <= oylar; k++) {
          const s = oyQosh(sana, k);
          const summa = k === oylar ? yaxlit(qoldiq - bir * (oylar - 1)) : bir;
          jadval.push({sana: sanaYoz(s), summa, tolandi: s < BUGUN});
        }
      }
      const kechikkan = jadval.length && eh3(0.12);
      if (kechikkan) { const oxirgiOtgan = jadval.filter(j => sanaOqi(j.sana) < BUGUN).pop(); if (oxirgiOtgan) oxirgiOtgan.tolandi = false; }
      const toliq = jadval.length ? jadval.every(j => j.tolandi) : true;
      const s = {id: "SH-" + sana.getFullYear() + "/" + String(shN).padStart(4, "0"), lotId: l ? l.id : null, taklifId: t ? t.id : null,
        obyektId: y.id, xaridor: t ? t.xaridor : xaridorOl().nom, narx, avans, sotishUsuli: usul, sana: sanaYoz(sana), jadval,
        taqiqHolati: usul === "bolib" && !toliq ? "taqiq qo'yilgan" : "yechilgan",
        holat: kechikkan ? "kechikkan" : toliq ? (usul === "bolib" ? "toliq tolangan" : "yakunlangan") : "faol"};
      SHARTNOMALAR.push(s);
      return s;
    };

    YOZ.forEach(y => {
      if (y.holat === "Lotda") {
        const l = lotQosh(y, "elon", -oraliq3(5, 130));
        const soni = l.holat === "elon" ? oraliq3(0, 2) : 0;
        l.ishtirokchilarSoni = soni;
        for (let k = 0; k < soni; k++) taklifQosh(y, l, "yangi", Math.round(l.boshlangichNarx * (1 + k * l.qadamFoiz / 100)));
      } else if (y.holat === "Sotuvga tayyorlanmoqda") {
        if (eh3(0.35)) lotQosh(y, "tayyorlanmoqda", null);
        if (eh3(0.3)) {
          const narx = lotNarx(y);
          const t = taklifQosh(y, null, tanla3(["yangi", "korib chiqilmoqda", "qo'mitada", "qo'mitada"]), Math.round(narx * (0.9 + r3() * 0.15)));
          y.sotuv.usul = "togridan";
          if (t.holat === "qo'mitada") t.izoh = "To'g'ridan-to'g'ri sotish taklifi, PQ-142";
        }
      } else if (y.holat === "Bo'lib to'lashda") {
        const l = lotQosh(y, "sotildi", -oraliq3(90, 260));
        l.holat = "sotildi";
        l.takroriySavdoSana = null;
        const bayon = kunQosh(sanaOqi(l.savdoSana), 0);
        const t = taklifQosh(y, l, "tasdiqlangan", Math.round(l.boshlangichNarx * (1 + l.qadamFoiz / 100)));
        t.qarorRaqami = "QQ-" + oraliq3(100, 999);
        Object.assign(l, {golib: t.xaridor, yakuniyNarx: t.summa, bayonnomaSana: sanaYoz(bayon), ishtirokchilarSoni: oraliq3(2, 5),
          tolovMuddati: sanaYoz(D.ishKuniQosh(bayon, D.param("golibTolovIshKuni"))),
          shartnomaMuddati: sanaYoz(D.ishKuniQosh(bayon, D.param("shartnomaIshKuni")))});
        const s = shartnomaQosh(y, l, t, t.summa, D.ishKuniQosh(bayon, oraliq3(3, 9)), "bolib", tanla3([12, 24, 36]));
        y.sotuv.lotId = l.id;
        y.tarix.push({sana: s.sana, voqea: "Bo'lib to'lash shartnomasi tuzildi", izoh: s.id});
      } else if (y.holat === "Ijarada") {
        ijN++;
        const bosh = kunQosh(BUGUN, -oraliq3(40, Math.max(41, Math.min(400, turgan(y) - 10))));
        const oylik = yaxlit(y.balans.qiymat * (0.006 + r3() * 0.004), 2);
        const tolovlar = [];
        /* To'lov jadvali shartnoma muddati (12 oy) ichida qoladi */
        for (let k = 0; k < 12 && oyQosh(bosh, k) < BUGUN; k++) tolovlar.push({davr: sanaYoz(oyQosh(bosh, k)).slice(3), summa: oylik, tolandi: true});
        const kech = eh3(0.15);
        if (kech && tolovlar.length) tolovlar[tolovlar.length - 1].tolandi = false;
        IJARA.push({id: "IJ-" + bosh.getFullYear() + "/" + String(ijN).padStart(4, "0"), obyektId: y.id,
          ijarachi: tanla3(["«Savdo Plyus» MChJ", "«Oq Tepa Servis» MChJ", "Norqulov Jamshid", "«Farovon Market» MChJ", "«Zamin Qurilish» MChJ"]),
          maydon: y.maydon.foydali, oylikIjara: oylik, boshlanish: sanaYoz(bosh), tugash: sanaYoz(oyQosh(bosh, 12)),
          depozit: yaxlit(oylik * 2, 2), kommunalKimTolaydi: "ijarachi", sotuvdaBekorQilishSharti: true, tolovlar,
          holat: kech ? "kechikkan" : "amalda"});
        ijaraKommunali(y, bosh);
      }
    });

    /* Tayyor biznes paketi: bir hududdagi sex va uskuna */
    const sex = YOZ.find(y => y.rasmTuri === "sex" && y.holat === "Sotuvga tayyorlanmoqda");
    if (sex) {
      const uskuna = YOZ.filter(y => y.turKalit === "uskuna" && y.hudud === sex.hudud && y.holat === "Sotuvga tayyorlanmoqda").slice(0, 2);
      PAKETLAR.push({id: "PK-" + BUGUN.getFullYear() + "/01", nom: sex.qisqa + " va uskunalar", tarkib: [sex.id].concat(uskuna.map(u => u.id)),
        investKompaniya: null, holat: "shakllantirilmoqda"});
    }

    /* Xaridorlar reyestri */
    const kor = {};
    TAKLIFLAR.forEach(t => {
      if (!kor[t.xaridor]) {
        kor[t.xaridor] = {id: "XR-" + String(XARIDORLAR.length + 11).padStart(3, "0"), nom: t.xaridor, tur: t.xaridorTuri,
          stirYokiPinfl: t.stirYokiPinfl, ishtirok: 0, yutgan: 0, holat: "faol"};
        XARIDORLAR.push(kor[t.xaridor]);
      }
      kor[t.xaridor].ishtirok++;
      if (t.holat === "tasdiqlangan") kor[t.xaridor].yutgan++;
    });

    /* ---------- Arxiv: balansdan chiqarilgan aktivlar ---------- */
    const ARXIV_TUR = [["Kvartira", "kopqavat", "turar"], ["Dala hovlisi", "uy", "turar"], ["Savdo do'koni", "dokon", "noturar"],
      ["Omborxona", "ombor", "noturar"], ["Ofis binosi", "mamuriy", "noturar"], ["Tikuvchilik sexi", "sex", "noturar"],
      ["Chevrolet Cobalt (2021)", "avto", "transport"], ["Isuzu yuk avtomobili (2020)", "yuk", "transport"], ["Qadoqlash liniyasi", "uskuna", "uskuna"]];
    const ARXIV_HUDUD = [["Toshkent sh.", "TS", "Toshkent shahar BXO"], ["Toshkent vil.", "TV", "Toshkent viloyat BXO"],
      ["Samarqand", "SA", "Samarqand BXO"], ["Farg'ona", "FA", "Farg'ona BXO"], ["Buxoro", "BU", "Buxoro BXO"]];
    /* Sotuvdan oldingi baholash: sotuv narxi qonunan baholash hisobotiga tayanadi. Alohida tasodifiy qator,
       shu sabab keyingi to'plamlarning qiymatlari o'zgarmaydi. */
    const G5 = generator(85260921);
    for (let i = 0; i < 20; i++) {
      const [nom, rasmTuri, turKalit] = tanla3(ARXIV_TUR);
      const [hudud, hududKod, filial] = tanla3(ARXIV_HUDUD);
      const sotuvKun = oraliq3(15, 900);
      const turganKun = oraliq3(90, 700);
      const sotuv = kunQosh(BUGUN, -sotuvKun), balans = kunQosh(sotuv, -turganKun);
      const balansQiymat = turKalit === "transport" ? oraliq3(90, 700) : turKalit === "uskuna" ? oraliq3(60, 400) : oraliq3(300, 4200);
      const sotuvNarxi = Math.round(balansQiymat * (0.8 + r3() * 0.45));
      const jamiXarajat = yaxlit(balansQiymat * (0.01 + r3() * 0.04));
      const usul = tanla3(["eauksion", "eauksion", "togridan", "bolib"]);
      const id = "AK-" + balans.getFullYear() + "/" + String(200 + i * 13).padStart(4, "0");
      const zax = D.zaxiraToifasi(turganKun, D.param("umidsizKun"));
      const x = xaridorOl();
      shN++;
      const shId = "SH-" + sotuv.getFullYear() + "/" + String(shN).padStart(4, "0");
      SHARTNOMALAR.push({id: shId, lotId: null, taklifId: null, obyektId: id, xaridor: x.nom, narx: sotuvNarxi, avans: sotuvNarxi,
        sotishUsuli: usul, sana: sanaYoz(sotuv), jadval: [], taqiqHolati: "yechilgan", holat: "yakunlangan"});
      const a = {id, obyektId: id, nom: nom + ", " + hudud, qisqa: nom, tur: D.ASOSIY_TURLAR.find(t => t.kalit === turKalit).nom, turKalit, rasmTuri,
        hudud, hududKod, filial, filialKod: FILIAL_KODLAR[filial] || null,
        balansSana: sanaYoz(balans), balansQiymat, sotuvSana: sanaYoz(sotuv), sotuvNarxi, sotishUsuli: usul, xaridor: x.nom,
        jamiXarajat, tiklanganZaxira: yaxlit(balansQiymat * zax.foiz / 100),
        foydaZarar: yaxlit(sotuvNarxi - balansQiymat - jamiXarajat), shartnomaId: shId, lotId: null,
        turganKun, rasm: "", rasmKichik: ""};
      ARXIV.push(a);
      {
        const bSana = kunQosh(sotuv, -G5.oraliq(20, Math.min(150, turganKun - 10)));
        const bozor = Math.round(balansQiymat * (0.95 + G5.r() * 0.3));
        const baholovchi = G5.tanla(Object.keys(BAHOLOVCHI));
        const amal = oyQosh(bSana, D.param("bahoAmalOy"));
        bahoN++;
        BAHOLASHLAR.push({id: "BH-" + bSana.getFullYear() + "/" + String(bahoN).padStart(4, "0"), obyektId: id, sana: sanaYoz(bSana),
          hisobotRaqami: "BH-" + G5.oraliq(100, 999) + "/" + bSana.getFullYear(), bozorQiymati: bozor, tugatishQiymati: Math.round(bozor * 0.78),
          avvalgi: null, baholovchi, litsenziya: BAHOLOVCHI[baholovchi], usul: G5.tanla(USUL),
          amalQilishTugash: sanaYoz(amal), holat: kunFarqi(BUGUN, amal) < 0 ? "eskirgan" : "dolzarb"});
      }
      D.reyestrgaQosh(Object.assign({}, a, {balans: {qiymat: balansQiymat}, qiymat: null, maydon: null}), "arxiv");
    }

    /* ---------- Hodisalar (generatsiya) ---------- */
    /* [matn, jiddiylik, manba, qayerda]: qayerda — "bino", "binosiz" (transport, texnika, uskuna) yoki "transport".
       Aloqa uzilishi va past zaryad bu yerda yo'q: ular qurilma signali, XAVFSIZLIK_HODISALARI da turadi.
       Takrorlangan qator — shu turdagi topilma ko'proq uchraydi. */
    const HODISA_MATN = [
      ["Eshik plombasi buzilgan", "yuqori", "korik", "bino"], ["Tomdan suv o'tayotgani aniqlandi", "past", "korik", "bino"],
      ["Tomdan suv o'tayotgani aniqlandi", "past", "korik", "bino"], ["Hududda ruxsatsiz qurilish boshlangan", "o'rta", "korik", "bino"],
      ["Harakat datchigi tunda signal berdi", "yuqori", "qurilma", "bino"], ["Tutun datchigi ishga tushdi", "yuqori", "qurilma", "bino"],
      ["Avtomobil saqlash joyidan siljigan", "yuqori", "qurilma", "transport"], ["Butlovchi qism yetishmasligi aniqlandi", "o'rta", "korik", "binosiz"],
      ["Korroziya belgilari aniqlandi", "past", "korik", "binosiz"], ["Korroziya belgilari aniqlandi", "past", "korik", "binosiz"]
    ];
    const USTUNLAR = [["yangi", "Yangi"], ["tekshirilmoqda", "Tekshirilmoqda"], ["bartaraf", "Bartaraf etilmoqda"], ["yopildi", "Yopildi"]];
    const qayerda = y => D.binolimi(y) ? "bino" : y.turKalit === "transport" || y.turKalit === "texnika" ? "transport" : "uskuna";
    /* Yopilishgacha soat: jiddiy hodisa shu kuni, o'rtachasi 1–3 kunda, kichigi bir haftagacha yopiladi */
    const yopishSoati = (jid, k) => jid === "yuqori" ? 2 + k % 7 : jid === "o'rta" ? 20 + k % 52 : 48 + k % 120;
    const yopildiVaqt = (vaqt, soat) => {
      const d = new Date(sanaOqi(vaqt).getTime() + soat * 3600e3);
      return D.vaqtYoz(d > D.HOZIR ? new Date(D.HOZIR.getTime() - 5 * 60e3) : d);
    };
    /* 29 ta hodisa so'nggi 150 kunga bir tekis yoyilgan: haftasiga ikkitaga yaqin. 10 kundan eskisi
       yopilgan, yangi ustunida faqat so'nggi ikki kun hodisasi turadi */
    YOZ.slice(8).filter((y, i) => i % 9 === 0).forEach((y, i) => {
      const joy = qayerda(y);
      const [matn, jid, manba] = tanla3(HODISA_MATN.filter(h => h[3] === joy || (h[3] === "binosiz" && joy !== "bino")));
      const [ustun0, holat0] = tanla3(USTUNLAR);
      const kod = "GH-" + BUGUN.getFullYear() + "-" + String(300 + i).padStart(5, "0");
      const kun = -(Math.round(i * 5.2) + oraliq3(0, 5));
      const soat = oraliq3(0, 23), daq = oraliq3(0, 59);
      const vaqt = D.__vaqtNisbiy(kun, soat, daq);
      const [ustun, holat] = -kun > 10 || ustun0 === "yopildi" ? USTUNLAR[3]
        : ustun0 === "yangi" && -kun > 2 ? USTUNLAR[1] : [ustun0, holat0];
      D.HODISALAR.push({id: kod, kod: "#" + kod, obyektId: y.id, rang: jid === "yuqori" ? "#E2523A" : jid === "o'rta" ? "#E8A13C" : "#0E8D74",
        hodisa: matn, vaqt, jiddiylik: jid, ustun, holat, manba,
        yopilganVaqt: ustun === "yopildi" ? yopildiVaqt(vaqt, yopishSoati(jid, soat + daq)) : null,
        tavsif: "", masul: tanla3(INSPEKTORLAR), bolim: "Aktivlar nazorati bo'limi",
        iibAriza: jid === "yuqori" && eh3(0.4) ? {raqam: "IIB-" + y.hududKod + "-" + BUGUN.getFullYear() + "/" + oraliq3(1000, 9999), sana: nisbiy(kun)} : null,
        bino: y.qisqa, joy: y.hududToliq, sarlavha: y.qisqa + " — " + matn});
    });

    /* ---------- Sug'urta da'volari: zarar yetkazgan hodisalardan (suv bosishi, o'g'irlik, bostirib kirish) ---------- */
    D.HODISALAR.filter(h => h.jiddiylik === "yuqori" && /suv bosgan|kamomad|ruxsatsiz kirish/i.test(h.hodisa)).forEach((h, i) => {
      const polis = SUGURTALAR.find(s => s.obyektId === h.obyektId && s.polisTuri === "mulk" && s.holat !== "muddati tugagan");
      if (!polis) return;
      SUGURTA_DAVOLARI.push({id: "SD-" + BUGUN.getFullYear() + "/" + String(100 + i).padStart(4, "0"), polisId: polis.id, hodisaId: h.id,
        obyektId: h.obyektId, sana: sanaYoz(sanaOqi(h.vaqt)), summa: yaxlit(polis.summa * (0.01 + r3() * 0.04)),
        holat: tanla3(["korib chiqilmoqda", "topshirilgan", "tolangan"])});
    });

    /* ---------- Xarajatlar: shartnoma yoki balans sanasidan bugungacha, toifalar bo'yicha.
       Alohida tasodifiy qator: xarajatlar soni boshqa to'plamlarga ta'sir qilmaydi ---------- */
    const G4 = generator(74260921);
    let xN = 1000;
    const xarajat = (y, toifa, summa, sana, kontragent) => {
      if (!(summa > 0) || sanaOqi(sana) < sanaOqi(y.balans.sana) || sanaOqi(sana) > BUGUN) return;
      xN++;
      const d = sanaOqi(sana);
      XARAJATLAR.push({id: "XJ-" + d.getFullYear() + "/" + xN, obyektId: y.id, toifa, summa: yaxlit(summa, 2),
        davr: d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0"), sana: sanaYoz(d), kontragent,
        hisobFaktura: "HF-" + G4.oraliq(10000, 99999), tasdiqlovchi: "Xolmatova Zulfiya",
        holat: kunFarqi(d, BUGUN) < 20 && G4.ehtimol(0.4) ? "tolanmagan" : "tolangan"});
    };
    /* boshlanish oyidan joriy oygacha har oyning shu kunida (kelajakdagi sana yozilmaydi) */
    const harOy = (bosh, kun, tugash, fn) => {
      const b = sanaOqi(bosh);
      if (!b) return;
      const oxiri = tugash && sanaOqi(tugash) < BUGUN ? sanaOqi(tugash) : BUGUN;
      for (let d = new Date(b.getFullYear(), b.getMonth(), kun); d <= oxiri; d = oyQosh(d, 1))
        if (d >= b) fn(d);
    };
    YOZ.forEach(y => {
      const q = QORIQLASH.find(x => x.obyektId === y.id);
      if (q && q.oylikTolov) harOy(q.boshlanish, 5, q.tugash, d => xarajat(y, "qoriqlash", q.oylikTolov, d, q.ijrochi));
      y.kommunal.filter(x => x.oylikXarajat).forEach(x => harOy(x.shartnomaSana || y.balans.sana, 10, null, d => xarajat(y, "kommunal", x.oylikXarajat, d,
        x.xizmat === "elektr" ? "Hududiy elektr tarmoqlari" : x.xizmat === "gaz" ? "Hududgazta'minot" : "Suvoqova")));
      if (!D.binolimi(y) && y.himoya.qoriqlashTuri === "post")
        harOy(y.balans.sana, 7, null, d => xarajat(y, "saqlash", 0.8 + (y.id.charCodeAt(9) % 5) / 10, d, "Saqlash maydonchasi"));
      SOLIQ.filter(s => s.obyektId === y.id && s.holat === "to'langan" && s.summa > 0).forEach(s => {
        const [yil, ch] = s.davr.split("-Q");
        xarajat(y, "molmulk", s.summa, new Date(+yil, +ch * 3, 15), "Davlat soliq xizmati");
      });
      SUGURTALAR.filter(s => s.obyektId === y.id).forEach(s => xarajat(y, "sugurta", s.mukofot, s.boshlanish, s.kompaniya));
      BAHOLASHLAR.filter(b => b.obyektId === y.id).forEach(b => xarajat(y, "baholash", 2 + (b.bozorQiymati > 2000 ? 6 : 1.5), b.sana, b.baholovchi));
      if (y.huquq.qaydSana) xarajat(y, "notarius", 0.4 + (y.balans.qiymat > 1000 ? 1.2 : 0.3), y.huquq.qaydSana, "Kadastr xizmati");
      if (y.sotuv.lotId) { const l = LOTLAR.find(x => x.id === y.sotuv.lotId); if (l && l.elonSana) xarajat(y, "elon", 0.35, l.elonSana, "E-auksion operatori"); }
      KORIKLAR.filter(k => k.obyektId === y.id && k.xarajatTaklifi && G4.ehtimol(0.5)).forEach(k =>
        xarajat(y, "tamir", k.xarajatTaklifi, kunQosh(k.sana, G4.oraliq(5, 20)), "Pudratchi"));
    });

    /* ---------- Tasdiqlar ---------- */
    let tsN = 40;
    const tasdiq = (o) => {
      tsN++;
      const t = Object.assign({id: "TS-" + BUGUN.getFullYear() + "/" + String(tsN).padStart(4, "0"), qaror: null, sabab: "", qarorSana: null}, o);
      TASDIQLAR.push(t);
      return t;
    };
    /* Taklif qo'mitaga AML tekshiruvidan keyin kiritiladi: so'rov sanasi taklif sanasidan keyin, oxirgi 12 kundagi
       ish kuni. Qo'mita 10 ish kunida ko'rib chiqadi, shuning uchun qo'mitadagi takliflar muddatida turadi */
    TAKLIFLAR.filter(t => t.holat === "qo'mitada").forEach(t => {
      let d = kunQosh(BUGUN, -(iz(t.id) % 12));
      while (!D.ishKunimi(d)) d = kunQosh(d, -1);
      const kiritildi = sanaYoz(new Date(Math.max(+sanaOqi(t.sana), +d)));
      tasdiq({tur: "taklif", manbaKol: "TAKLIFLAR", manbaId: t.id, obyektId: t.obyektId,
        sarlavha: "Taklifni tasdiqlash: " + D.obyektNomi(t.obyektId, true), tavsif: t.xaridor + " " + D.pul(t.summa) + " taklif qildi. " + (t.izoh || ""),
        summa: t.summa, muallif: "Qosimova Dilnoza", masulRol: "Rahbariyat", sana: kiritildi, javobMuddati: sanaYoz(D.ishKuniQosh(kiritildi, 10)), holat: "kutilmoqda"});
    });
    LOTLAR.filter(l => l.keyingiPasaytirishSana && sanaOqi(l.keyingiPasaytirishSana) <= kunQosh(BUGUN, 10) && ["elon", "otkazilmagan"].indexOf(l.holat) >= 0)
      .forEach(l => {
        const p = D.param("pasaytirishFoiz");
        const joriy = l.pasaytirishlar.length ? l.pasaytirishlar[l.pasaytirishlar.length - 1].narx : l.boshlangichNarx;
        /* tasdiq so'rovi kelajak sanasi bilan yozilmaydi: muddat yaqin bo'lsa, bugun yuborilgan */
        const sana = sanaOqi(l.keyingiPasaytirishSana) > BUGUN ? sanaYoz(BUGUN) : l.keyingiPasaytirishSana;
        tasdiq({tur: "pasaytirish", manbaKol: "LOTLAR", manbaId: l.id, obyektId: l.obyektId,
          sarlavha: "Narxni " + p + "% pasaytirish: " + D.obyektNomi(l.obyektId, true),
          tavsif: "Lot " + D.param("pasaytirishOy") + " oydan beri sotilmadi. Yangi narx: " + D.pul(Math.round(joriy * (1 - p / 100))) + ".",
          summa: Math.round(joriy * (1 - p / 100)), muallif: "Qosimova Dilnoza", masulRol: "Rahbariyat", sana,
          javobMuddati: sanaYoz(D.ishKuniQosh(sana, 5)), holat: "kutilmoqda"});
      });
    SHARTNOMALAR.filter(s => s.holat === "toliq tolangan").forEach(s => tasdiq({tur: "chiqim", manbaKol: "SHARTNOMALAR", manbaId: s.id, obyektId: s.obyektId,
      sarlavha: "Balansdan chiqarish: " + D.obyektNomi(s.obyektId, true), tavsif: "Shartnoma bo'yicha to'lov to'liq tushdi. Taqiq yechiladi, aktiv arxivga o'tadi.",
      summa: s.narx, muallif: "Xolmatova Zulfiya", masulRol: "Rahbariyat", sana: nisbiy(-oraliq3(0, 4)), javobMuddati: nisbiy(oraliq3(2, 6)), holat: "kutilmoqda"}));
    BAHOLASHLAR.filter(b => kunFarqi(b.sana, BUGUN) <= 25).slice(0, 4).forEach(b => tasdiq({tur: "baho", manbaKol: "BAHOLASHLAR", manbaId: b.id, obyektId: b.obyektId,
      sarlavha: "Baholash natijasini tasdiqlash: " + D.obyektNomi(b.obyektId, true), tavsif: b.baholovchi + ", bozor qiymati " + D.pul(b.bozorQiymati) + ".",
      summa: b.bozorQiymati, muallif: "Nazarov Aziz", masulRol: "Rahbariyat", sana: b.sana, javobMuddati: sanaYoz(D.ishKuniQosh(b.sana, 10)), holat: "kutilmoqda"}));
    D.UNDIRUV_ISHLAR.filter(i => i.bosqich === "ijro").slice(0, 2).forEach(i => tasdiq({tur: "qabul", manbaKol: "UNDIRUV_ISHLAR", manbaId: i.id, obyektId: null,
      sarlavha: "Garovni balansga qabul qilish: " + i.garov.nom, tavsif: "Ijro varaqasi MIBda. Garovni o'zida qoldirish qarori kerak.",
      summa: i.qarz.jami, muallif: i.masul, masulRol: "Rahbariyat", sana: nisbiy(-oraliq3(0, 5)), javobMuddati: nisbiy(oraliq3(3, 9)), holat: "kutilmoqda"}));
    /* hal qilingan tasdiqlar (tarix uchun) */
    TAKLIFLAR.filter(t => t.holat === "tasdiqlangan").slice(0, 6).forEach(t => {
      const s = tasdiq({tur: "taklif", manbaKol: "TAKLIFLAR", manbaId: t.id, obyektId: t.obyektId, sarlavha: "Taklifni tasdiqlash: " + D.obyektNomi(t.obyektId, true),
        tavsif: t.xaridor + ", " + D.pul(t.summa), summa: t.summa, muallif: "Qosimova Dilnoza", masulRol: "Rahbariyat", sana: t.sana,
        javobMuddati: sanaYoz(D.ishKuniQosh(t.sana, 10)), holat: "tasdiqlangan"});
      s.qaror = "tasdiqlandi"; s.qarorSana = sanaYoz(D.ishKuniQosh(t.sana, 2));
    });
    /* So'nggi 90 kunda qabul qilingan baholash hisobotlari ham rahbariyat tasdig'idan o'tgan: haftalik xulosada
       qarorlar oqimi ko'rinadi. Tasdiq 1–5 ish kunida, qarorni kutayotgan to'rttasi yuqorida */
    const bahoKutil = new Set(TASDIQLAR.filter(t => t.tur === "baho").map(t => t.manbaId));
    BAHOLASHLAR.filter(b => !bahoKutil.has(b.id) && D.topish(b.obyektId) && kunFarqi(b.sana, BUGUN) <= 90 && kunFarqi(b.sana, BUGUN) > 7).forEach(b => {
      const qaror = D.ishKuniQosh(b.sana, 1 + iz(b.id) % 5);
      if (qaror > BUGUN) return;
      const s = tasdiq({tur: "baho", manbaKol: "BAHOLASHLAR", manbaId: b.id, obyektId: b.obyektId,
        sarlavha: "Baholash natijasini tasdiqlash: " + D.obyektNomi(b.obyektId, true), tavsif: b.baholovchi + ", bozor qiymati " + D.pul(b.bozorQiymati) + ".",
        summa: b.bozorQiymati, muallif: "Nazarov Aziz", masulRol: "Rahbariyat", sana: b.sana, javobMuddati: sanaYoz(D.ishKuniQosh(b.sana, 10)), holat: "tasdiqlangan"});
      s.qaror = "tasdiqlandi"; s.qarorSana = sanaYoz(qaror);
    });

    /* ---------- Mening vazifalarim (qo'lda qo'yilgan) ---------- */
    [["Ko'rik dalolatnomasini imzolatish", "Ko'rik", "AK-2025/1187", 0, "Karimova Feruza", "Ko'rik va xavfsizlik inspektori", "yuqori"],
     ["Gaz bo'yicha qarz yo'qligi haqidagi ma'lumotnomani olish", "Kommunal", "AK-2026/4471", 2, "Ismoilova Nilufar", "Obyekt menejeri", "orta"],
     ["Sug'urta polisini yangilash", "Sug'urta", "AK-2025/0934", 1, "Tosheva Barno", "Obyekt menejeri", "yuqori"],
     ["Kadastrga taqiq yechilganini tasdiqlovchi xatni topshirish", "Rasmiylashtirish", "AK-2026/2210", 4, "Sobirov Ulug'bek", "Obyekt menejeri", "orta"],
     ["Birlamchi ko'rik o'tkazish", "Ko'rik", "AK-2026/0141", -1, "Sattorov Javohir", "Ko'rik va xavfsizlik inspektori", "yuqori"],
     ["Baholash buyurtmasini berish", "Baholash", "AK-2026/0141", 3, "Nazarov Aziz", "Obyekt menejeri", "orta"]
    ].forEach(([nom, tur, obyektId, kun, ijrochi, rol, muhimlik], i) => MENING_VAZIFALARIM.push({
      id: "VZ-" + BUGUN.getFullYear() + "-" + String(71 + i), nom, tur, obyektId, kod: obyektId, qoidaId: null,
      sana: nisbiy(Math.min(0, kun) - 1), muddat: nisbiy(kun), ijrochi, rol, muhimlik, bajarildi: false}));

    /* ---------- Fayllar (hujjatlar metama'lumoti, namoyishda fayl mazmuni yo'q) ---------- */
    HUJJATLAR.filter(h => ["AK-2026/4471", "AK-2025/1187", "AK-2025/0934", "AK-2026/5512"].indexOf(h.obyektId) >= 0).forEach((h, i) => {
      const f = {id: "FL-" + String(1001 + i), obyektId: h.obyektId, kolleksiya: "HUJJATLAR", yozuvId: h.id, nom: h.nom + ".pdf",
        tur: "application/pdf", hajm: Math.round(parseFloat(h.hajm.replace(",", ".")) * 1048576), yuklangan: h.sana + " 10:00",
        yuklagan: h.yuklagan, yol: ""};
      FAYLLAR.push(f);
      h.faylId = f.id;
    });
  }

  /* ============================================================
     3. MB hisoboti va zaxira tarixi (hisoblash funksiyalari ikki rejimda ham ishlaydi)
     ============================================================ */
  function oyOxiri(davr) {
    const [y, m] = davr.split("-").map(Number);
    return new Date(y, m, 0);
  }
  /* Davr oxirida balansda bo'lgan aktivlar: hozirgi reyestr va arxivdagi (keyin sotilgan) aktivlar */
  function davrAktivlari(davr) {
    const oxir = oyOxiri(davr);
    const hozir = D.YOZUVLAR.filter(y => { const b = sanaOqi(y.balans && y.balans.sana); return b && b <= oxir && y.holat !== "Chiqarildi"; })
      .map(y => ({id: y.id, filialKod: y.filialKod, sana: y.balans.sana, qiymat: y.balans.qiymat, asos: y.balans.qabulAsosi}));
    /* D.ARXIV eksportdan keyin mavjud; namoyish suratlari eksportdan oldin hisoblanadi, shuning uchun mahalliy ARXIV ga tushiladi */
    const arx = (D.ARXIV || ARXIV || []).filter(a => sanaOqi(a.balansSana) <= oxir && sanaOqi(a.sotuvSana) > oxir)
      .map(a => ({id: a.id, filialKod: a.filialKod, sana: a.balansSana, qiymat: a.balansQiymat, asos: null}));
    return hozir.concat(arx);
  }
  function zaxiraTarixHisobla(davr) {
    const oxir = oyOxiri(davr);
    return davrAktivlari(davr).map(a => {
      const chegara = D.chegaraKuni({balans: {qabulAsosi: a.asos}});
      const t = D.zaxiraToifasi(kunFarqi(a.sana, oxir), chegara);
      return {id: davr + "/" + a.id, davr, obyektId: a.id, toifa: t.kalit, foiz: t.foiz, summa: yaxlit(a.qiymat * t.foiz / 100)};
    });
  }
  /* saralash (ixtiyoriy): aktivlar ro'yxatini toraytiradi, masalan filial rahbari uchun MKB.doira */
  function mbHisobotHisobla(davr, saralash) {
    const oxir = oyOxiri(davr);
    const aktiv = saralash ? saralash(davrAktivlari(davr)) : davrAktivlari(davr);
    const jami = yaxlit(aktiv.reduce((s, a) => s + a.qiymat, 0));
    const kapital = D.param("kapital1DarajaMlrd");
    const muddat = D.ishKuniQosh(new Date(oxir.getFullYear(), oxir.getMonth() + 1, D.param("mbHisobotKuni")), 0);
    return {id: "MB-" + davr, davr, muddat: sanaYoz(muddat), topshirilganSana: null, obyektlarSoni: aktiv.length,
      jamiBalansQiymat: jami, kapital1Daraja: kapital, kapitalgaNisbat: kapital ? yaxlit(jami / 1000 / kapital, 3) : null,
      umidsizSoni: aktiv.filter(a => kunFarqi(a.sana, oxir) >= D.chegaraKuni({balans: {qabulAsosi: a.asos}})).length,
      holat: "tayyorlanmoqda", solishtirish: null};
  }
  if (namoyish) {
    for (let k = 12; k >= 1; k--) {
      const d = oyQosh(new Date(BUGUN.getFullYear(), BUGUN.getMonth(), 1), -k);
      const davr = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0");
      zaxiraTarixHisobla(davr).forEach(z => ZAXIRA_TARIX.push(z));
      const h = mbHisobotHisobla(davr);
      if (sanaOqi(h.muddat) < BUGUN) { h.holat = "topshirilgan"; h.topshirilganSana = sanaYoz(D.ishKuniQosh(h.muddat, -G3.oraliq(0, 3))); }
      MB_HISOBOTLAR.push(h);
    }
  }

  /* ============================================================
     4. Qoidalar (ikki rejimda ham): bildirishnoma va vazifa triggerlari
     ============================================================ */
  const QOIDALAR = [
    {id: "Q-UMIDSIZ",   trigger: "umidsiz",          nom: "Me'yoriy muddatgacha qolgan kun", kunlar: [90, 60, 30], natija: "ikkalasi", qabulQiluvchiRol: "Obyekt menejeri", eskalatsiyaRol: "Rahbariyat", eskalatsiyaKun: 30, faol: true, manba: "MB 2696, 20-band"},
    {id: "Q-POLIS",     trigger: "polis",            nom: "Sug'urta polisi 30 kunda tugaydi", kunlar: [30], natija: "ikkalasi", qabulQiluvchiRol: "Obyekt menejeri", eskalatsiyaRol: "Rahbariyat", eskalatsiyaKun: 7, faol: true, manba: "Ichki tartib"},
    {id: "Q-BAHO",      trigger: "baholash",         nom: "Baholash eskirmoqda", kunlar: [30], natija: "ikkalasi", qabulQiluvchiRol: "Obyekt menejeri", eskalatsiyaRol: "Rahbariyat", eskalatsiyaKun: 0, faol: true, manba: "Yagona milliy baholash standarti"},
    {id: "Q-KORIK",     trigger: "korik",            nom: "Ko'rik kechikdi", kunlar: [0], natija: "ikkalasi", qabulQiluvchiRol: "Ko'rik va xavfsizlik inspektori", eskalatsiyaRol: "Rahbariyat", eskalatsiyaKun: 7, faol: true, manba: "Ichki me'yor"},
    {id: "Q-QURILMA",   trigger: "qurilma-oflayn",   nom: "Qurilma 24 soatdan ortiq aloqasiz", kunlar: [1], natija: "ikkalasi", qabulQiluvchiRol: "Ko'rik va xavfsizlik inspektori", eskalatsiyaRol: "Obyekt menejeri", eskalatsiyaKun: 3, faol: true, manba: "Ichki me'yor"},
    {id: "Q-TOLOV",     trigger: "eauksion-tolov",   nom: "E-auksion g'olibining to'lov muddati (5 ish kuni)", kunlar: [2], natija: "ikkalasi", qabulQiluvchiRol: "Obyekt menejeri", eskalatsiyaRol: "Rahbariyat", eskalatsiyaKun: 0, faol: true, manba: "VM 18, 31-band"},
    {id: "Q-YHXX",      trigger: "yhxx",             nom: "Transportni YHXXda 10 kun ichida qayta qayd etish", kunlar: [3], natija: "ikkalasi", qabulQiluvchiRol: "Obyekt menejeri", eskalatsiyaRol: "Rahbariyat", eskalatsiyaKun: 0, faol: true, manba: "VM 683, 6-band"},
    {id: "Q-SOLIQ",     trigger: "soliq-imtiyoz",    nom: "Soliq imtiyozi tugaydi", kunlar: [30], natija: "bildirish", qabulQiluvchiRol: "Buxgalteriya va risk", eskalatsiyaRol: null, eskalatsiyaKun: null, faol: true, manba: "Prezident farmoni, 2026-yil 28-avgust"},
    {id: "Q-MB",        trigger: "mb-hisobot",       nom: "Markaziy bank hisoboti oyning 10-sanasigacha", kunlar: [5], natija: "ikkalasi", qabulQiluvchiRol: "Buxgalteriya va risk", eskalatsiyaRol: "Rahbariyat", eskalatsiyaKun: 1, faol: true, manba: "MB 3441, 16-band"},
    {id: "Q-PASAYTIR",  trigger: "pasaytirish",      nom: "Lot 3 oy sotilmadi: narx pasaytirish tasdiqqa", kunlar: [0], natija: "vazifa", qabulQiluvchiRol: "Obyekt menejeri", eskalatsiyaRol: "Rahbariyat", eskalatsiyaKun: 5, faol: true, manba: "Bank realizatsiya tartibi"},
    {id: "Q-DAVAKTIV",  trigger: "davaktiv",         nom: "Davaktivda 1 yil: qaytarish so'rovi", kunlar: [0], natija: "vazifa", qabulQiluvchiRol: "Obyekt menejeri", eskalatsiyaRol: "Rahbariyat", eskalatsiyaKun: 10, faol: true, manba: "Prezident farmoni, 2026-yil 28-avgust"},
    {id: "Q-MAJLIS",    trigger: "sud-majlis",       nom: "Sud majlisi eslatmasi", kunlar: [1, 0], natija: "ikkalasi", qabulQiluvchiRol: "Obyekt menejeri", eskalatsiyaRol: "Rahbariyat", eskalatsiyaKun: 3, faol: true, manba: "Ichki tartib"},
    {id: "Q-KONSERV",   trigger: "konservatsiya",    nom: "Mavsumiy konservatsiya chek-listi (15-noyabr)", kunlar: [0], natija: "vazifa", qabulQiluvchiRol: "Obyekt menejeri", eskalatsiyaRol: null, eskalatsiyaKun: null, faol: true, manba: "Ichki tartib"}
  ];

  /* ============================================================
     4b. Namoyish: qurilma holati va xavfsizlik hodisalari
     Qurilmalar va ularning signallari malumot-kirish.js da yaratiladi: u yerda har o'ninchi qurilma
     aloqasiz yoki zaryadi past chiqadi, bu portfel uchun favqulodda holat manzarasi. Quyidagi qadam kirish
     qatlami tugagach, malumot-indeks.js hisobni boshlashidan oldin bir marta ishlaydi (D.__nazoratIndeksi
     yozilgan payt) va namoyishni tartibli yuritilayotgan portfelga keltiradi:
     - muammoli qurilmalarning ozi qoladi: 24 soatdan ortiq aloqasiz 1 ta, qisqa uzilish 10 ta, zaryadi
       past 1 ta. Qolganlariga xizmat ko'rsatilgan: xizmat ishi "bajarildi", qurilma aloqada, zaryadi joyida;
     - tuzatilgan qurilmaning aloqa va zaryad hodisalari olib tashlanadi, raqamlar tartib bilan qayta beriladi;
     - signal hodisalari so'nggi 90 kunga yoyiladi, 7 kundan eskisi yopilgan;
     - har bir yopilgan hodisaga yopilganVaqt yoziladi.
     Tasodifiy son olinmaydi: qaysi qurilma qolishi identifikator bo'yicha (iz) tanlanadi.
     ============================================================ */
  function kirishdanKeyin() {
    const QS = D.QURILMALAR, XH = D.XAVFSIZLIK_HODISALARI;
    if (!Array.isArray(QS) || !Array.isArray(XH)) return;
    const qaydKuni = q => sanaOqi(q.holatQayd) || D.HOZIR;
    /* ochiq hodisaga bog'langan qurilma o'z holatida qoladi */
    const band = new Set((D.HODISALAR || []).filter(h => h.qurilmaId && D.ochiqHodisami && D.ochiqHodisami(h)).map(h => h.qurilmaId));
    const qoldir = (royxat, n) => new Set(royxat.slice().sort((a, b) => (band.has(b.id) - band.has(a.id)) || iz(a.id) - iz(b.id)).slice(0, n).map(q => q.id));
    const uzoq = QS.filter(q => (q.oflaynSoat || 0) >= 24), qisqa = QS.filter(q => q.oflaynSoat > 0 && q.oflaynSoat < 24);
    const zaryad = QS.filter(q => q.batareya != null && q.batareya < 20);
    const qoladi = new Set([...qoldir(uzoq, 1), ...qoldir(qisqa, 10)]), zaryadQoladi = qoldir(zaryad, 1);
    const aloqaTuzaldi = new Set(), zaryadTuzaldi = new Set();
    uzoq.concat(qisqa).forEach(q => {
      if (qoladi.has(q.id) || band.has(q.id)) return;
      Object.assign(q, {oflaynSoat: 0, oxirgiSignal: q.holatQayd, holat: q.holat === "xizmatda" ? "xizmatda" : "onlayn"});
      aloqaTuzaldi.add(q.id);
    });
    zaryad.forEach(q => {
      if (zaryadQoladi.has(q.id) || band.has(q.id)) return;
      q.batareya = 45 + iz(q.id) % 50;
      zaryadTuzaldi.add(q.id);
    });
    /* xizmat ishi qurilmani tuzatgan: qayddan oldin bajarilgan */
    (D.XIZMAT_ISHLARI || []).forEach(x => {
      if (!aloqaTuzaldi.has(x.qurilmaId) && !zaryadTuzaldi.has(x.qurilmaId)) return;
      const q = QS.find(r => r.id === x.qurilmaId);
      const oxir = kunQosh(qaydKuni(q), -(1 + iz(x.id) % 3));
      if (sanaOqi(x.sana) > oxir) x.sana = sanaYoz(oxir);
      x.holat = "bajarildi";
      if (zaryadTuzaldi.has(x.qurilmaId)) { x.tur = "Batareyani almashtirish"; x.ehtiyotQismlar = ["LiFePO4 akkumulyator"]; }
    });
    /* kirish nuqtasi holati uning qurilmalaridan (malumot-kirish.js dagi qoida) */
    const QI = {};
    QS.forEach(q => { QI[q.id] = q; });
    (D.KIRISH_NUQTALARI || []).forEach(n => {
      const qs = (n.qurilmalar || []).map(id => QI[id]).filter(Boolean);
      if (!qs.length) return;
      n.holat = qs.every(q => q.holat === "onlayn") ? "onlayn" : qs.some(q => q.holat === "nosoz") ? "nosoz" : "oflayn";
      n.oxirgiAloqa = qs.map(q => q.oxirgiSignal).sort((a, b) => sanaOqi(b) - sanaOqi(a))[0];
    });
    /* hodisalar: tuzatilgan qurilmaning holat hodisasi olib tashlanadi, signal hodisasi tarixga yoyiladi */
    const aloqaHodisasi = h => h.hodisa === "Qurilma 24 soatdan ortiq aloqasiz", zaryadHodisasi = h => /^Batareya zaryadi /.test(h.hodisa);
    const qolgan = XH.filter(h => !(aloqaHodisasi(h) && aloqaTuzaldi.has(h.qurilmaId)) && !(zaryadHodisasi(h) && zaryadTuzaldi.has(h.qurilmaId)));
    const yil = BUGUN.getFullYear();
    qolgan.forEach((h, i) => {
      h.id = "XH-" + yil + "/" + (301 + i);
      const q = QI[h.qurilmaId];
      if (q && !aloqaHodisasi(h) && !zaryadHodisasi(h)) {
        const v = sanaOqi(h.vaqt), yosh = kunFarqi(v, BUGUN);
        const chegara = q.ornatilgan ? kunFarqi(q.ornatilgan, BUGUN) - 1 : yosh;
        const yangiYosh = Math.max(yosh, Math.min(yosh * 3, chegara));
        if (yangiYosh !== yosh) {
          const d = kunQosh(v, yosh - yangiYosh);
          Object.assign(h, {vaqt: D.vaqtYoz(d), sana: sanaYoz(d)});
        }
        if (yangiYosh > 7 && h.holat !== "yopildi")
          Object.assign(h, {holat: "yopildi", chora: h.jiddiylik === "yuqori" || /odam/.test(h.hodisa) ? "Mobil guruh yuborildi, obyekt joyida" : "Qurilma qayta ishga tushirildi"});
      }
      if (h.holat === "yopildi" && !h.yopilganVaqt) {
        const d = new Date(sanaOqi(h.vaqt).getTime() + (1 + iz(h.id) % 30) * 3600e3);
        h.yopilganVaqt = D.vaqtYoz(d > D.HOZIR ? new Date(D.HOZIR.getTime() - 5 * 60e3) : d);
      }
    });
    XH.length = 0;
    qolgan.forEach(h => XH.push(h));
  }
  if (namoyish) {
    /* malumot-indeks.js boshida "D.__nazoratIndeksi = true" yozadi: shu payt barcha generatorlar tugagan */
    let indeksBoshlandi;
    Object.defineProperty(D, "__nazoratIndeksi", {configurable: true, enumerable: true, get: () => indeksBoshlandi,
      set: v => { if (v && !indeksBoshlandi) kirishdanKeyin(); indeksBoshlandi = v; }});
    /* Yillik realizatsiya rejasi: namoyish banki uchun kiritilgan qiymat. Mahalliy rejimda bo'sh qoladi,
       uni administrator boshqaruv panelida kiritadi */
    const reja = D.PARAMETRLAR.find(p => p.id === "yillikRejaMlrd");
    if (reja && reja.qiymat == null) reja.qiymat = 60;
  }

  /* ============================================================
     5. Eksport
     ============================================================ */
  Object.assign(D, {
    KORIKLAR, SUGURTALAR, POLISLAR: SUGURTALAR, BAHOLASHLAR, HUJJATLAR, XARAJATLAR, QORIQLASH, KOMMUNAL_ARIZALAR,
    INVENTAR, INVENTARIZATSIYALAR, SOLIQ, LOTLAR, SOTUV: LOTLAR, TAKLIFLAR, XARIDORLAR, SHARTNOMALAR, IJARA, PAKETLAR,
    ARXIV, SUGURTA_DAVOLARI, TASDIQLAR, MENING_VAZIFALARIM, VAZIFALAR: MENING_VAZIFALARIM, BILDIRISHLAR: [],
    MB_HISOBOTLAR, ZAXIRA_TARIX, QOIDALAR, FAYLLAR, KORIK_CHEKLIST,
    zaxiraTarixHisobla, mbHisobotHisobla, korikChekListi: y => KORIK_CHEKLIST[chekListTuri(y)]
  });
})();
