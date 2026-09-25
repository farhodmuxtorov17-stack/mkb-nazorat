/* ============================================================
   boshqaruv.js — Sozlamalar bo'limi sahifalarining umumiy qoidalari
   (foydalanuvchilar, foydalanuvchi, rollar, integratsiyalar, amallar tarixi,
   sozlamalar, tizim holati). Sahifalar uni yadro/amal.js dan keyin ulaydi.

   Bu yerda faqat sof hisob-kitob va ma'lumotnomalar: DOM ga tegmaydi,
   MKBapi ni o'zi chaqirmaydi (aktivlarni o'tkazish bundan mustasno, u
   sahifa bergan yozish funksiyasi bilan ishlaydi). Shuning uchun qoidalar
   Node testida brauzersiz tekshiriladi (tests/boshqaruv.test.js).
   ============================================================ */
(function (W) {
  "use strict";
  const B = {};

  /* ---------- 1. SHA-256 (FIPS 180-4), UTF-8 matn uchun, hex qaytaradi ----------
     CSV oxiridagi nazorat yig'indisi uchun. crypto.subtle faqat HTTPS yoki localhost da
     ishlaydi va asinxron: fayl ichki tarmoqdagi oddiy HTTP da ham bir xil hisoblansin. */
  const K = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2];
  function utf8(matn) {
    if (typeof TextEncoder !== "undefined") return new TextEncoder().encode(matn);
    const s = unescape(encodeURIComponent(matn)), b = new Uint8Array(s.length);
    for (let i = 0; i < s.length; i++) b[i] = s.charCodeAt(i);
    return b;
  }
  B.sha256 = function (matn) {
    const m = utf8(String(matn == null ? "" : matn));
    const uzun = m.length, bloklar = ((uzun + 9 + 63) >> 6) << 6;
    const x = new Uint8Array(bloklar);
    x.set(m); x[uzun] = 0x80;
    const bit = uzun * 8, dv = new DataView(x.buffer);
    dv.setUint32(bloklar - 8, Math.floor(bit / 0x100000000));
    dv.setUint32(bloklar - 4, bit >>> 0);
    const H = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19];
    const w = new Uint32Array(64);
    const r = (v, n) => (v >>> n) | (v << (32 - n));
    for (let o = 0; o < bloklar; o += 64) {
      for (let i = 0; i < 16; i++) w[i] = dv.getUint32(o + i * 4);
      for (let i = 16; i < 64; i++) {
        const s0 = r(w[i - 15], 7) ^ r(w[i - 15], 18) ^ (w[i - 15] >>> 3);
        const s1 = r(w[i - 2], 17) ^ r(w[i - 2], 19) ^ (w[i - 2] >>> 10);
        w[i] = (w[i - 16] + s0 + w[i - 7] + s1) >>> 0;
      }
      let [a, b, c, d, e, f, g, h] = H;
      for (let i = 0; i < 64; i++) {
        const t1 = (h + (r(e, 6) ^ r(e, 11) ^ r(e, 25)) + ((e & f) ^ (~e & g)) + K[i] + w[i]) >>> 0;
        const t2 = ((r(a, 2) ^ r(a, 13) ^ r(a, 22)) + ((a & b) ^ (a & c) ^ (b & c))) >>> 0;
        h = g; g = f; f = e; e = (d + t1) >>> 0; d = c; c = b; b = a; a = (t1 + t2) >>> 0;
      }
      H[0] = (H[0] + a) >>> 0; H[1] = (H[1] + b) >>> 0; H[2] = (H[2] + c) >>> 0; H[3] = (H[3] + d) >>> 0;
      H[4] = (H[4] + e) >>> 0; H[5] = (H[5] + f) >>> 0; H[6] = (H[6] + g) >>> 0; H[7] = (H[7] + h) >>> 0;
    }
    return H.map(v => v.toString(16).padStart(8, "0")).join("");
  };

  /* CSV matni MKB.csv bilan bir xil: har qiymat qo'shtirnoqda, ";" ajratgich, CRLF qator oxiri.
     Nazorat yig'indisi sarlavha va yozuvlar qatoridan, oxirgi yozuvdan keyingi CRLF bilan birga olinadi:
     BOM va oxirgi ikki qator olib tashlangan fayl (masalan, head -n -2) aynan shu matn bo'ladi. */
  B.csvMatn = function (sarlavhalar, qatorlar) {
    const e = v => '"' + String(v == null ? "" : v).replace(/"/g, '""') + '"';
    return [sarlavhalar.map(e).join(";")].concat(qatorlar.map(q => q.map(e).join(";"))).join("\r\n");
  };
  B.csvNazorat = function (sarlavhalar, qatorlar) {
    return {soni: qatorlar.length, sha256: B.sha256(B.csvMatn(sarlavhalar, qatorlar) + "\r\n")};
  };

  /* ---------- 2. Tashqi tizimlar katalogi ----------
     Holat alohida saqlanadi (to'plam INTEGRATSIYALAR, sozlamalar bo'limi); bu yerda
     har bir ulanishning tarkibi va uni ishga tushirish uchun nima kerakligi. */
  B.TIZIM_GURUHLARI = [
    {kalit: "davlat", nom: "Davlat tizimlari va tashkilotlar"},
    {kalit: "bank", nom: "Bank ichidagi tizimlar"},
    {kalit: "xabar", nom: "Xabar yuborish"},
    {kalit: "qoriqlash", nom: "Qo'riqlash va qurilmalar"}
  ];
  B.TIZIMLAR = [
    {id: "abs", guruh: "bank", ikonka: "bank", nom: "Bank ABS", javobgar: "Bank axborot texnologiyalari departamenti",
     yonalish: "ikki", ketadi: "Aktivlar kesimida hisoblangan zaxira summasi, balansdan chiqarish asosi.",
     keladi: "16701 va 16799 hisobvaraqlari qoldig'i, balansga olish o'tkazmasi raqami va sanasi.",
     protokol: "Kunlik eksport fayli (SFTP) yoki ichki REST xizmati", kanal: "Bank ichki tarmog'i, internetga chiqmaydi",
     kerak: ["AT departamenti bilan texnik topshiriq", "Axborot xavfsizligi xizmati xulosasi", "Xizmat hisobi va faqat o'qish huquqi"],
     qolda: "Balans qiymati qabulda kiritiladi, zaxira ABS bilan qo'lda solishtiriladi", havola: "zaxira.html", havolaNomi: "Zaxira"},
    {id: "eauksion", guruh: "davlat", ikonka: "gavel", nom: "E-auksion", javobgar: "Elektron onlayn-auksionlar operatori",
     yonalish: "ikki", ketadi: "Lot e'loni: aktiv, boshlang'ich narx, zakalat, savdo sanasi.",
     keladi: "Savdo natijasi: g'olib, yakuniy narx, bayonnoma sanasi yoki savdo o'tmagani.",
     protokol: "Operator API, HTTPS", kanal: "Internet, bankning tashqi shlyuzi (DMZ) orqali",
     kerak: ["Operator bilan ulanish shartnomasi", "API kaliti va IP manzillar ro'yxati", "Axborot xavfsizligi xizmati xulosasi"],
     qolda: "Lot raqami, savdo natijasi va yakuniy narx lot kartochkasida kiritiladi", havola: "lotlar.html", havolaNomi: "Lotlar"},
    {id: "kadastr", guruh: "davlat", ikonka: "yer", nom: "Kadastr (davreestr)", javobgar: "Kadastr agentligi, ko'chmas mulkka huquqlar reyestri",
     yonalish: "keladi", ketadi: "Kadastr raqami.",
     keladi: "Huquq egasi, qayd sanasi, reyestr ko'chirmasi, taqiq va cheklovlar.",
     protokol: "Idoralararo integratsiya platformasi, so'rov-javob", kanal: "Elektron hukumat himoyalangan kanali (VPN)",
     kerak: ["Platforma operatoriga ulanish arizasi", "Agentlik bilan ma'lumot almashish kelishuvi", "Bank ERI kaliti"],
     qolda: "Kadastr raqami, qayd sanasi va taqiqlar qo'lda kiritiladi", havola: "rasmiylashtirish.html", havolaNomi: "Huquqni rasmiylashtirish"},
    {id: "yhxx", guruh: "davlat", ikonka: "mashina", nom: "YHXX", javobgar: "Yo'l harakati xavfsizligi xizmati",
     yonalish: "keladi", ketadi: "Davlat raqami yoki VIN.",
     keladi: "Qayd holati, qayta ro'yxatdan o'tkazish sanasi, taqiqlar.",
     protokol: "Idoralararo integratsiya platformasi, so'rov-javob", kanal: "Elektron hukumat himoyalangan kanali (VPN)",
     kerak: ["Ma'lumot almashish kelishuvi", "Platformaga ulanish arizasi"],
     qolda: "Qayta qayd sanasi qo'lda kiritiladi, 10 kunlik muddatni qoida kuzatadi", havola: "rasmiylashtirish.html", havolaNomi: "Huquqni rasmiylashtirish"},
    {id: "mib", guruh: "davlat", ikonka: "yuridik", nom: "MIB", javobgar: "Majburiy ijro byurosi",
     yonalish: "keladi", ketadi: "Ijro ishi raqami, qarzdorning STIR yoki PINFL raqami.",
     keladi: "Ijro ishi holati, xatlov va taqiq, mulkni undiruvchiga o'tkazish dalolatnomasi.",
     protokol: "Idoralararo integratsiya platformasi, so'rov-javob", kanal: "Elektron hukumat himoyalangan kanali (VPN)",
     kerak: ["Ma'lumot almashish kelishuvi", "Undiruv ishlari bo'yicha mas'ul xodimlar ro'yxati"],
     qolda: "Ijro varaqasi va MIB holati undiruv ishida kiritiladi", havola: "undiruv.html", havolaNomi: "Undiruv"},
    {id: "soliq", guruh: "davlat", ikonka: "soliq", nom: "Soliq xizmati", javobgar: "Soliq qo'mitasi",
     yonalish: "ikki", ketadi: "Mol-mulk va yer solig'i bazasi aktivlar kesimida.",
     keladi: "Hisoblangan soliq, qarzdorlik, imtiyoz holati.",
     protokol: "Soliq xizmatining elektron hisobot interfeysi, ERI bilan", kanal: "Internet, DMZ orqali",
     kerak: ["Bank ERI kaliti", "Soliq xizmati bilan ulanish kelishuvi"],
     qolda: "Soliq bazasi tizimda hisoblanadi, to'langan summa qo'lda kiritiladi", havola: "soliq.html", havolaNomi: "Soliq"},
    {id: "mb", guruh: "davlat", ikonka: "hisobot", nom: "Markaziy bank portali", javobgar: "O'zbekiston Respublikasi Markaziy banki",
     yonalish: "ketadi", ketadi: "Oylik hisobot (MB 3441, 16-band): mol-mulk ro'yxati va kapitalga nisbat.",
     keladi: "Hisobot qabul qilingani haqida tasdiq.",
     protokol: "Hisobot fayli, ERI bilan imzolanadi", kanal: "Markaziy bankning himoyalangan kanali",
     kerak: ["Hisobot formati spetsifikatsiyasi", "Mas'ul xodimning ERI kaliti"],
     qolda: "Hisobot tizimda tuziladi, topshirilgani qo'lda belgilanadi", havola: "hisobot-mb.html", havolaNomi: "MB hisoboti"},
    {id: "mygov", guruh: "davlat", ikonka: "hujjat", nom: "my.gov.uz", javobgar: "Yagona interaktiv davlat xizmatlari portali",
     yonalish: "ikki", ketadi: "Huquqni qayd etish va transportni qayta ro'yxatdan o'tkazish arizasi.",
     keladi: "Ariza holati va natija hujjati.",
     protokol: "Yuridik shaxslar uchun integratsiya interfeysi, ERI bilan", kanal: "Internet, DMZ orqali",
     kerak: ["Bankning portalda yuridik shaxs sifatida ro'yxatdan o'tgani", "Mas'ul xodimning ERI kaliti"],
     qolda: "Ariza raqami va natija huquqni rasmiylashtirishda kiritiladi", havola: "rasmiylashtirish.html", havolaNomi: "Huquqni rasmiylashtirish"},
    {id: "eimzo", guruh: "bank", ikonka: "imzo", nom: "E-IMZO", javobgar: "Elektron raqamli imzo kalitlarini ro'yxatga olish markazi",
     yonalish: "ikki", ketadi: "Imzolanadigan hujjat: dalolatnoma, qaror, hisobot.",
     keladi: "Imzo, sertifikat egasi va imzo vaqti; kirishda xodim sertifikati.",
     protokol: "Xodim kompyuteridagi E-IMZO dasturi, serverda imzo tekshiruvi", kanal: "Bank ichki tarmog'i, vaqt belgisi xizmatiga chiqish",
     kerak: ["Xodimlarning amaldagi ERI kalitlari", "Imzo tekshirish xizmati", "Bank ERI siyosati"],
     qolda: "Dalolatnoma chop etilib, qo'lda imzolanadi", havola: "korik-tarixi.html", havolaNomi: "Ko'rik dalolatnomalari"},
    {id: "ad", guruh: "bank", ikonka: "foydalar", nom: "Active Directory", javobgar: "Bank axborot texnologiyalari departamenti",
     yonalish: "keladi", ketadi: "Login va parol tekshiruvi so'rovi.",
     keladi: "Xodimning domen hisobi, guruhlari, bloklangani.",
     protokol: "LDAPS (636-port) yoki bank SSO xizmati", kanal: "Bank ichki tarmog'i",
     kerak: ["Faqat o'qish huquqli xizmat hisobi", "Domen guruhlari va rollar jadvali", "Axborot xavfsizligi xizmati xulosasi"],
     qolda: "Hisoblar va bloklash foydalanuvchilar ro'yxatida yuritiladi", havola: "foydalanuvchilar.html", havolaNomi: "Foydalanuvchilar"},
    {id: "sms", guruh: "xabar", ikonka: "xat", nom: "SMS shlyuzi", javobgar: "Mobil operator yoki SMS agregatori",
     yonalish: "ketadi", ketadi: "Xodimlarga muddat, yuqoriga o'tkazish va xavf xabarlari.",
     keladi: "Yetkazilganlik holati.",
     protokol: "HTTPS API yoki SMPP", kanal: "Internet, DMZ orqali",
     kerak: ["Agregator bilan shartnoma", "Jo'natuvchi nomini ro'yxatdan o'tkazish", "Xabar andozalarini kelishish"],
     qolda: "Bildirishnomalar tizim ichida ko'rsatiladi", havola: "bildirishnomalar.html", havolaNomi: "Bildirishnomalar"},
    {id: "telegram", guruh: "xabar", ikonka: "chat", nom: "Telegram", javobgar: "Telegram Messenger, Bot API xizmati",
     yonalish: "ikki", ketadi: "Navbatchi guruhga xavf signali va vazifa eslatmasi, shaxsiy ma'lumotsiz.",
     keladi: "Navbatchining \"Qabul qildim\" javobi.",
     protokol: "HTTPS Bot API, webhook", kanal: "Internet, DMZ orqali",
     kerak: ["Axborot xavfsizligi xizmati roziligi: server O'zbekistondan tashqarida", "Bank nomidagi bot va navbatchilar guruhi", "Xabarda ism, telefon va manzil bo'lmasligi"],
     qolda: "Signal monitoring markazida ko'rinadi, navbatchiga telefon qilinadi", havola: "himoya.html", havolaNomi: "Monitoring markazi"},
    {id: "qoriqlash", guruh: "qoriqlash", ikonka: "qalqon", nom: "Qo'riqlash pulti", javobgar: "Qo'riqlash shartnomasi tuzilgan xizmat",
     yonalish: "ikki", ketadi: "Qo'riqlanadigan obyektlar va mas'ul xodimlar ro'yxati.",
     keladi: "Xavf signali, qo'riqqa olish va olib tashlash vaqti, guruh chiqqani.",
     protokol: "Pult voqealari eksporti (Contact ID) shlyuz orqali", kanal: "Pult bilan ajratilgan kanal yoki VPN",
     kerak: ["Qo'riqlash shartnomasiga ma'lumot almashish ilovasi", "Pult operatorining texnik shartlari"],
     qolda: "Shartnoma va javob vaqti qo'riqlash sahifasida kiritiladi", havola: "qoriqlash.html", havolaNomi: "Qo'riqlash"},
    {id: "iot", guruh: "qoriqlash", ikonka: "kamera", nom: "NVR va IoT shlyuzi", javobgar: "Kameralar, datchiklar va GPS-trekerlar",
     yonalish: "keladi", ketadi: "Qurilmalar ro'yxati va obyektga bog'lanishi.",
     keladi: "Qurilma aloqasi, batareya darajasi, eshik va harakat voqealari.",
     protokol: "MQTT TLS (8883-port), kamera uchun ONVIF", kanal: "Alohida VLAN yoki operatorning xususiy APN tarmog'i",
     kerak: ["Qurilmalar reyestri va sertifikatlari", "Shlyuz serveri bank ichida", "Axborot xavfsizligi xizmati xulosasi"],
     qolda: "Qurilma ro'yxatga qo'lda olinadi, oxirgi signal qo'lda yangilanadi", havola: "qurilmalar.html", havolaNomi: "Qurilmalar", sinov: "mqtt"},
    {id: "kommunal", guruh: "davlat", ikonka: "olov", nom: "Kommunal ta'minotchilar", javobgar: "Elektr, gaz va suv ta'minoti korxonalari",
     yonalish: "keladi", ketadi: "Shaxsiy hisob raqami.",
     keladi: "Qarzdorlik, oxirgi ko'rsatkich, ta'minot holati.",
     protokol: "Ta'minotchi yoki to'lov agregatori API", kanal: "Internet, DMZ orqali",
     kerak: ["Har bir ta'minotchi bilan kelishuv yoki agregator shartnomasi", "Obyektlarning shaxsiy hisob raqamlari"],
     qolda: "Hisoblagich ko'rsatkichi va qarz qo'lda kiritiladi", havola: "kommunal.html", havolaNomi: "Kommunal holat"}
  ];
  B.YONALISH = {ketadi: "Bir tomonlama: tizimdan", keladi: "Bir tomonlama: tizimga", ikki: "Ikki tomonlama"};
  /* To'plamdagi yozuv bo'lmasa tizim ulanmagan hisoblanadi */
  /* "Ulangan" faqat birinchi sinxron sanasi bilan hisoblanadi. Sanasiz belgi sozlanmoqda qatoriga tushadi
     va buni ochiq aytadi: qo'lda qo'yilgan belgi ulanmagan tizimni ulangan qilib ko'rsatmaydi */
  B.tizimHolati = function (id, royxat, holatlar) {
    const y = (royxat || []).find(x => x && x.id === id) || null;
    const saqlangan = y && y.holat ? y.holat : "ulanmagan";
    const dalilsiz = saqlangan === "ulangan" && !(y && y.oxirgiSinxron);
    const kalit = dalilsiz ? "sozlanmoqda" : saqlangan;
    const h = (holatlar || []).find(x => x.kalit === kalit) || {kalit, nom: kalit, chip: "chip-kul"};
    return dalilsiz ? {kalit, nom: "Ulangan deb belgilangan, ma'lumot hali kelmagan", chip: "chip-sariq", yozuv: y, saqlangan}
      : {kalit: h.kalit, nom: h.nom, chip: h.chip, yozuv: y, saqlangan};
  };
  /* Qo'lda kiritiladigan maydon yonidagi manba qatori */
  B.manbaMatni = function (id, royxat) {
    const h = B.tizimHolati(id, royxat, []);
    return h.kalit === "ulangan" ? "Manba: " + ((B.TIZIMLAR.find(t => t.id === id) || {}).nom || id) : "Manba: qo'lda · integratsiya ulanmagan";
  };

  /* ---------- 3. Saqlash muddatlari ----------
     Kun soni va huquqiy asos PARAMETRLAR da (param = id, asos = manba); muddat tugagandagi amal
     va javobgar shu jadvalda. Tavsiya — parametr hali saqlanmaganda formaga qo'yiladigan qiymat. */
  B.SAQLASH = [
    {param: "amallarSaqlashKun", tur: "Amallar tarixi", qamrov: "Kim, qachon, qaysi yozuvni o'zgartirgani", tavsiya: 1825,
     asos: "Bank ichki nazorat tartibi", oxirida: "arxiv", javobgar: "Axborot xavfsizligi xizmati"},
    {param: "kirishJurnaliKun", tur: "Kirish jurnali", qamrov: "Tizimga kirish, rad etilgan urinish, eshik ochilishi", tavsiya: 1095,
     asos: "Axborot xavfsizligi tartibi", oxirida: "anonim", javobgar: "Xavfsizlik xizmati"},
    {param: "shaxsiyMalumotKun", tur: "Tashrifchi va pudratchi", qamrov: "Pasport, telefon, surat; oxirgi tashrif yoki ruxsatdan keyin", tavsiya: 365,
     asos: "O'RQ-547, ichki tartib", oxirida: "anonim", javobgar: "Xavfsizlik xizmati"},
    {param: "videoSaqlashKun", tur: "Kamera video arxivi", qamrov: "NVR yozuvi; bu tizim videoni saqlamaydi va o'chirmaydi", tavsiya: 30,
     asos: "O'RQ-547, ichki tartib", oxirida: "ustiga", javobgar: "Xavfsizlik xizmati"},
    {param: "hujjatSaqlashKun", tur: "Hujjat va surat", qamrov: "Aktiv hujjatlari, ko'rik suratlari; aktiv balansdan chiqqandan keyin", tavsiya: 1825,
     asos: "Bank hujjatlar nomenklaturasi", oxirida: "arxiv", javobgar: "Obyekt menejeri"},
    {param: "yopilganHisobKun", tur: "Yopilgan hisob", qamrov: "Bloklangan xodimning ismi, telefoni, pochtasi; login va amallar qoladi", tavsiya: 1095,
     asos: "O'RQ-547, ichki tartib", oxirida: "anonim", javobgar: "Administrator"}
  ];
  B.OXIRIDA = {
    arxiv: "Faqat o'qiladigan arxivga o'tadi",
    anonim: "Anonimlashtiriladi, yozuvning o'zi qoladi",
    ustiga: "NVR eski yozuv ustiga yozadi"
  };
  /* PARAMETRLAR bilan birlashgan jadval: {param, tur, kun, asos, saqlangan, ...} */
  B.saqlashJadvali = function (paramlar) {
    return B.SAQLASH.map(s => {
      const p = (paramlar || []).find(x => x && x.id === s.param) || null;
      const kun = p && typeof p.qiymat === "number" && p.qiymat > 0 ? p.qiymat : null;
      return Object.assign({}, s, {kun, saqlangan: kun != null, asos: (p && p.manba) || s.asos, oxiridaNomi: B.OXIRIDA[s.oxirida] || s.oxirida});
    });
  };
  /* Qayd va jurnal sifatida PARAMETRLAR ga yoziladigan qiymatlar: me'yoriy parametrlar ro'yxatida chiqmaydi */
  B.JURNAL_PARAM = ["huquqKorikSana", "anonimOxirgi"];

  /* ---------- 4. Huquqlarni ko'rib chiqish ----------
     Uch holat: bloklangan, lekin mas'ul aktivi bor; 90 kun kirmagan faol hisob; bir nechta faol administrator.
     o: {aktivSoni(f), oxirgiKirish(f) -> Date|null, bugun: Date, jurnalBoshi: Date|null, kunFarqi(a, b)} */
  B.KIRMAGAN_KUN = 90;
  B.ADMIN_KOPI = 1;
  const adminmi = f => !!f && (f.teg === "admin" || f.rol === "Administrator");
  const sanaOl = v => {
    if (v instanceof Date) return v;
    const m = /^(\d{1,2})\.(\d{1,2})\.(\d{4})(?:\s+(\d{1,2}):(\d{2}))?/.exec(String(v || ""));
    return m ? new Date(+m[3], +m[2] - 1, +m[1], +(m[4] || 0), +(m[5] || 0)) : null;
  };
  const kunlar = (a, b) => Math.round((Date.UTC(b.getFullYear(), b.getMonth(), b.getDate()) - Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())) / 864e5);
  B.huquqKorigi = function (foydlar, o) {
    o = o || {};
    const bugun = o.bugun || new Date();
    const faolAdminlar = (foydlar || []).filter(f => f && f.faol !== false && adminmi(f));
    const jurnalQamrovi = o.jurnalBoshi ? kunlar(o.jurnalBoshi, bugun) : 0;
    return (foydlar || []).filter(Boolean).map(f => {
      const sabablar = [];
      const aktiv = o.aktivSoni ? o.aktivSoni(f) : 0;
      if (f.faol === false && aktiv > 0) sabablar.push({kod: "blok-aktiv", soni: aktiv});
      if (f.faol !== false){
        const k = o.oxirgiKirish ? o.oxirgiKirish(f) : null;
        const ochilgan = sanaOl(f.sana);
        if (k){
          const kun = kunlar(k, bugun);
          if (kun >= B.KIRMAGAN_KUN) sabablar.push({kod: "kirmagan", kun});
        } else if (ochilgan && kunlar(ochilgan, bugun) >= B.KIRMAGAN_KUN && jurnalQamrovi >= B.KIRMAGAN_KUN) {
          sabablar.push({kod: "kirmagan", kun: null});
        }
        if (adminmi(f) && faolAdminlar.length > B.ADMIN_KOPI) sabablar.push({kod: "admin-kop", soni: faolAdminlar.length});
      }
      return {f, sabablar};
    });
  };
  B.sababMatni = function (s) {
    if (s.kod === "blok-aktiv") return "Bloklangan, " + s.soni + " ta aktivning mas'uli";
    if (s.kod === "kirmagan") return s.kun == null ? "90 kundan beri kirish qayd etilmagan" : s.kun + " kundan beri tizimga kirmagan";
    if (s.kod === "admin-kop") return "Faol administratorlar: " + s.soni + " ta";
    return s.kod;
  };
  /* Xuddi shu matn HTML ko'rinishida: raqam alohida, qolgani tarjima lug'atidagi bo'lak */
  const esc = v => String(v == null ? "" : v).replace(/[&<>"']/g, c => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"}[c]));
  const bo = t => "<span>" + esc(t) + "</span>", son = v => "<span data-tarjimasiz>" + esc(v) + "</span>";
  B.sababHTML = function (s) {
    if (s.kod === "blok-aktiv") return bo("Bloklangan,") + " " + son(s.soni) + " " + bo("ta aktivning mas'uli");
    if (s.kod === "kirmagan") return s.kun == null ? bo("90 kundan beri kirish qayd etilmagan") : son(s.kun) + " " + bo("kundan beri tizimga kirmagan");
    if (s.kod === "admin-kop") return bo("Faol administratorlar:") + " " + son(s.soni);
    return esc(s.kod);
  };
  B.bo = bo; B.son = son;
  /* Chorak: 1..4 va uning oxirgi kuni */
  B.chorak = function (d) {
    const c = Math.floor(d.getMonth() / 3) + 1;
    return {c, yil: d.getFullYear(), oxiri: new Date(d.getFullYear(), c * 3, 0)};
  };
  /* Shu chorakda ko'rib chiqilganmi */
  B.chorakdaMi = function (sana, bugun) {
    const d = sanaOl(sana);
    if (!d) return false;
    const a = B.chorak(d), b = B.chorak(bugun);
    return a.c === b.c && a.yil === b.yil;
  };

  /* ---------- 5. Aktivlar va mas'ullar ---------- */
  B.masulAktivlar = function (D, nom) {
    return ((D && D.YOZUVLAR) || []).filter(y => y && y.masul === nom && y.holat !== "Chiqarildi");
  };
  /* Aktivlarni boshqa xodimga o'tkazish: yoz(id, patch) har bir aktiv uchun chaqiriladi.
     Xato bo'lsa to'xtaydi va nechtasi o'tganini aytadi: qayta ishga tushirilsa qolgani o'tadi. */
  B.aktivlarniOtkaz = async function (aktivlar, yangiMasul, yoz, jarayon) {
    let n = 0;
    for (const a of aktivlar) {
      try { await yoz(a.id, {masul: yangiMasul}); }
      catch (e) { const x = new Error(n + " ta aktiv o'tkazildi, " + a.id + " da to'xtadi: " + (e && e.message ? e.message : "xato")); x.otkazildi = n; throw x; }
      n++;
      if (jarayon) jarayon(n, aktivlar.length);
    }
    return n;
  };

  /* Yangi mas'ul nomzodlari: faol obyekt menejerlari, avval aktivi kamlari. [[nom, "nom · N ta aktiv"]] */
  B.masulNomzodlari = function (D, foydlar, f) {
    return (foydlar || []).filter(x => x && x.faol !== false && x.id !== f.id && (x.teg === "obyekt" || x.rol === "Obyekt menejeri"))
      .map(x => ({x, n: B.masulAktivlar(D, x.nom).length})).sort((a, b) => a.n - b.n)
      .map(({x, n}) => [x.nom, x.nom + " · " + n + " ta aktiv"]);
  };
  /* O'tkazish dialogi (MKB.tasdiqla). Natija: null yoki {qiymat: o'tgan soni, qiymatlar: {kimga}} */
  B.otkazishDialogi = function (D, foydlar, f) {
    const M = W.MKB, api = W.MKBapi;
    const aktivlar = B.masulAktivlar(D, f.nom);
    return M.tasdiqla({
      sarlavha: "Aktivlarni boshqa xodimga o'tkazish",
      matn: f.nom + " mas'ul bo'lgan " + aktivlar.length + " ta aktiv tanlangan xodimga o'tadi. Aktiv kartochkasi va keyingi ko'rik dalolatnomasida yangi mas'ul yoziladi.",
      tafsilot: [["Hozirgi mas'ul", {matn: f.nom, tarjimasiz: true}], ["Holat", f.faol === false ? "Bloklangan" : "Faol"], ["Aktivlar", {matn: String(aktivlar.length), tarjimasiz: true}]],
      maydonlar: [{nom: "kimga", yorliq: "Yangi mas'ul", tur: "tanlov", majburiy: true, variantlar: B.masulNomzodlari(D, foydlar, f),
        izoh: "Ro'yxatda obyekt menejerlari, avval aktivi kamlari"}],
      oqibat: ["Har bir aktivning o'zgarishi amallar tarixiga yoziladi"],
      okMatn: "Aktivlarni o'tkazish",
      bajar: ({qiymatlar}) => B.aktivlarniOtkaz(aktivlar, qiymatlar.kimga, (id, patch) => api.yangilash("YOZUVLAR", id, patch)),
    });
  };

  /* ---------- 6. Amallar tarixi: namoyish uchun boshlang'ich yozuvlar ----------
     Namoyish ma'lumotidagi qaror, ko'rik, hodisa va aktiv tarixidan oxirgi 30 kunlik amallar tiklanadi.
     Har yozuvda eski va yangi qiymat bor. Haqiqiy (mahalliy) reyestrda hech narsa qo'shilmaydi.
     Yadro ma'lumotida D.AMALLAR_BOSH bo'lsa, o'sha ishlatiladi. */
  B.BOSH_KUN = 30;
  B.BOSH_MAX = 200;
  function urug(s) { let h = 2166136261; for (const c of String(s)) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; }
  const ikki = n => String(n).padStart(2, "0");
  const vaqtMatn = d => ikki(d.getDate()) + "." + ikki(d.getMonth() + 1) + "." + d.getFullYear() + " " + ikki(d.getHours()) + ":" + ikki(d.getMinutes());
  B.boshlangichAmallar = function (D) {
    if (!D || D.MANBA === "mahalliy") return [];
    if (Array.isArray(D.AMALLAR_BOSH)) return D.AMALLAR_BOSH.slice();
    const bugun = D.bugun ? D.bugun() : new Date();
    const bosh = new Date(bugun.getFullYear(), bugun.getMonth(), bugun.getDate() - (B.BOSH_KUN - 1));
    /* Kelajakdagi vaqt yozilmaydi: sana bugun bo'lsa, chegara — hozirgi soat */
    const hozir = new Date();
    const kunOxiri = new Date(bugun.getFullYear(), bugun.getMonth(), bugun.getDate(), 23, 59);
    const oxir = hozir < kunOxiri && hozir.toDateString() === bugun.toDateString() ? hozir : kunOxiri;
    const F = (D.FOYDLAR || []).filter(Boolean);
    const rolOl = nom => { const f = F.find(x => x.nom === nom); return f ? f.rol : "-"; };
    const rahbar = (F.find(f => f.rol === "Rahbariyat" && f.faol !== false && !f.filialKod) || {}).nom || "Rahbariyat";
    const admin = (F.find(f => adminmi(f) && f.faol !== false) || {}).nom || "Administrator";
    const R = [];
    /* Bloklangan xodim blokdan keyin amal qilmaydi: uning nomidagi keyingi amallar faol obyekt menejeriga yoziladi */
    const blokSana = new Date(bugun.getFullYear(), bugun.getMonth(), bugun.getDate() - 26, 10, 12);
    const bloklangan = new Set(F.filter(f => f.faol === false).map(f => f.nom));
    const menejer = (F.find(f => f.faol !== false && (f.teg === "obyekt" || f.rol === "Obyekt menejeri")) || {}).nom || rahbar;
    /* Vaqt: kun sanasi + yozuv id sidan olingan barqaror soat (08:30–17:59) */
    const vaqt = (sana, kalit, soatBor) => {
      const d = sanaOl(sana);
      if (!d) return null;
      if (!soatBor) { const u = urug(kalit); d.setHours(8 + (u % 10), (u >>> 4) % 60); if (d.getHours() === 8 && d.getMinutes() < 30) d.setMinutes(30 + d.getMinutes()); }
      return d >= bosh && d <= oxir ? d : null;
    };
    const qosh = (d, kim, kolleksiya, obyektId, turi, ozgarish, aktivId) => {
      if (!d || !kim) return;
      if (bloklangan.has(kim) && d >= blokSana) kim = menejer;
      R.push({vaqt: vaqtMatn(d), t: d.getTime(), kim, rol: kim === "Mehmon" ? "-" : rolOl(kim), kolleksiya, obyektId, turi,
        tafsilot: ozgarish ? Object.keys(ozgarish).join(", ") : "", ozgarish: ozgarish || null, aktivId: aktivId || null, boshlangich: true});
    };
    /* Qarorlar: so'rov yuborilgani va qaror qabul qilingani */
    (D.TASDIQLAR || []).forEach(t => {
      qosh(vaqt(t.sana, t.id + "s"), t.muallif, "TASDIQLAR", t.id, "yaratish",
        {holat: {eski: null, yangi: "kutilmoqda"}, summa: {eski: null, yangi: t.summa == null ? null : t.summa}}, t.obyektId);
      if (t.holat && t.holat !== "kutilmoqda" && t.qarorSana) {
        const kim = t.qarorKim ? ((F.find(f => f.login === t.qarorKim) || {}).nom || t.qarorKim) : rahbar;
        qosh(vaqt(t.qarorSana, t.id + "q"), kim, "TASDIQLAR", t.id, "yangilash",
          {holat: {eski: "kutilmoqda", yangi: t.holat}, qaror: {eski: null, yangi: t.qaror || t.holat}}, t.obyektId);
      }
    });
    /* Ko'riklar: o'tkazilgan ko'rik natijasi inspektor nomidan. Namoyish jurnali 200 yozuv bilan
       cheklangan, ko'riklar esa oyiga 150 dan ortiq: har beshtadan ikkitasi olinadi */
    (D.KORIKLAR || []).forEach(k => {
      if (k.holat !== "otkazildi" || urug(k.id) % 5 > 1) return;
      qosh(vaqt(k.sana, k.id), k.inspektor, "KORIKLAR", k.id, "yangilash",
        {holat: {eski: "rejada", yangi: "otkazildi"}, holatBall: {eski: null, yangi: k.holatBall == null ? null : k.holatBall}}, k.obyektId);
    });
    /* Hodisalar: qayd etilgani va bosqichi o'zgargani */
    (D.HODISALAR || []).forEach(h => {
      const d = vaqt(h.vaqt, h.id, true);
      qosh(d, h.masul, "HODISALAR", h.id, "yaratish", {holat: {eski: null, yangi: "Yangi"}, jiddiylik: {eski: null, yangi: h.jiddiylik || null}}, h.obyektId);
      if (d && h.holat && h.holat !== "Yangi") {
        const keyin = new Date(d.getTime() + (2 + urug(h.id) % 20) * 3600e3);
        if (keyin <= oxir) qosh(keyin, h.masul, "HODISALAR", h.id, "yangilash", {holat: {eski: "Yangi", yangi: h.holat}}, h.obyektId);
      }
    });
    /* Aktiv tarixi: oxirgi voqea almashgani (eski voqea -> yangi voqea) */
    (D.YOZUVLAR || []).forEach(y => {
      const t = Array.isArray(y.tarix) ? y.tarix : [];
      t.forEach((v, i) => {
        qosh(vaqt(v.sana, y.id + ":" + i), y.masul || rahbar, "YOZUVLAR", y.id, "yangilash",
          {voqea: {eski: i ? t[i - 1].voqea : null, yangi: v.voqea}}, y.id);
      });
    });
    /* Bloklangan hisob: blok 26 kun oldin administrator tomonidan */
    F.filter(f => f.faol === false).forEach(f => {
      const d = new Date(blokSana);
      qosh(d >= bosh ? d : null, admin, "FOYDLAR", f.id, "yangilash", {faol: {eski: true, yangi: false}});
    });
    /* Tizimga kirishlar: faol xodimlar ish kunlari, har biri haftasiga 1–3 marta */
    F.filter(f => f.faol !== false).forEach(f => {
      for (let i = 0; i < B.BOSH_KUN; i++) {
        const d = new Date(bosh.getFullYear(), bosh.getMonth(), bosh.getDate() + i);
        if (d.getDay() === 0 || d.getDay() === 6) continue;
        const u = urug(f.login + i);
        if (u % 5 > 1) continue;
        d.setHours(8, 35 + (u >>> 3) % 50);
        qosh(d, f.nom, "SESSIYA", f.nom, "kirish", null);
      }
    });
    /* Rad etilgan urinishlar: noto'g'ri parol va notanish login */
    const rad = [[3, "09:02", (F[1] || {}).login || "a.rahmonov"], [3, "09:03", (F[1] || {}).login || "a.rahmonov"], [11, "22:47", "admin"], [18, "07:15", "test"]];
    rad.forEach(([n, s, login]) => {
      const d = new Date(bugun.getFullYear(), bugun.getMonth(), bugun.getDate() - n, +s.slice(0, 2), +s.slice(3));
      qosh(d, "Mehmon", "SESSIYA", login, "kirish rad etildi", null);
    });
    R.sort((a, b) => b.t - a.t);
    /* Kirishlar boshqa amallarni siqib chiqarmasin: avval ish amallari, keyin kirishlar chegara ichida */
    const kirishmi = a => a.kolleksiya === "SESSIYA" && a.turi === "kirish";
    const ish = R.filter(a => !kirishmi(a)), kir = R.filter(kirishmi);
    const tanlangan = ish.slice(0, Math.max(0, B.BOSH_MAX - Math.min(kir.length, 45))).concat(kir.slice(0, 45));
    tanlangan.sort((a, b) => b.t - a.t);
    return tanlangan.map((a, i) => { const x = Object.assign({}, a, {id: "AMB-" + String(i + 1).padStart(4, "0")}); delete x.t; return x; });
  };
  /* Jurnal = haqiqiy amallar + (namoyishda) boshlang'ich yozuvlar, yangidan eskiga */
  B.jurnal = function (D, haqiqiy) {
    const r = (haqiqiy || []).slice();
    const b = B.boshlangichAmallar(D);
    const t = a => { const d = sanaOl(a && a.vaqt); return d ? d.getTime() : 0; };
    return r.concat(b).sort((x, y) => t(y) - t(x));
  };
  /* Xodimning oxirgi kirishi va oxirgi amali (jurnal yangidan eskiga tartiblangan) */
  B.oxirgiKirish = function (f, jurnal) {
    if (f && f.oxirgiKirish) return sanaOl(f.oxirgiKirish);
    const a = (jurnal || []).find(x => x && x.turi === "kirish" && x.kim === f.nom);
    return a ? sanaOl(a.vaqt) : null;
  };
  B.oxirgiAmal = function (f, jurnal) {
    return (jurnal || []).find(x => x && x.kim === f.nom && x.kolleksiya !== "SESSIYA") || null;
  };
  /* Rol qachondan: FOYDLAR.rolSana, bo'lmasa jurnaldagi oxirgi rol o'zgarishi, bo'lmasa hisob ochilgan sana */
  B.rolSana = function (f, jurnal) {
    if (f.rolSana) return {sana: String(f.rolSana).slice(0, 10), manba: "yozuv"};
    const a = (jurnal || []).find(x => x && x.kolleksiya === "FOYDLAR" && x.obyektId === f.id && x.ozgarish && x.ozgarish.rol);
    if (a) return {sana: String(a.vaqt).slice(0, 10), manba: "jurnal"};
    return {sana: f.sana || null, manba: "ochilgan"};
  };
  B.jurnalBoshi = function (jurnal) {
    let min = null;
    (jurnal || []).forEach(a => { const d = sanaOl(a && a.vaqt); if (d && (!min || d < min)) min = d; });
    return min;
  };
  B.sanaOl = sanaOl;

  /* To'liq nusxaga kiradigan to'plamlar: server/server.js KOLLEKSIYALAR ning yoziladigan qismi */
  B.NUSXA_TOPLAMLARI = ["YOZUVLAR", "FILIALLAR", "HUJJATLAR", "FAYLLAR", "ARXIV", "XARAJATLAR",
    "KORIKLAR", "INVENTAR", "INVENTARIZATSIYALAR", "BAHOLASHLAR", "SUGURTALAR", "SUGURTA_DAVOLARI", "SOLIQ", "ZAXIRA_TARIX", "MB_HISOBOTLAR",
    "LOTLAR", "TAKLIFLAR", "XARIDORLAR", "SHARTNOMALAR", "IJARA", "PAKETLAR",
    "UNDIRUV_ISHLAR", "SUD_MAJLISLAR", "ADVOKATLAR", "RESTRUKTURIZATSIYA", "MULOQOTLAR",
    "HODISALAR", "QORIQLASH", "KOMMUNAL_ARIZALAR",
    "SHAXSLAR", "KIRISH_NUQTALARI", "QURILMALAR", "KIRISH_VOQEALARI", "RUXSATLAR",
    "KIRISH_SOROVLARI", "TASHRIFLAR", "XAVFSIZLIK_HODISALARI", "MASOFAVIY_SESSIYALAR", "XIZMAT_ISHLARI",
    "TASDIQLAR", "MENING_VAZIFALARIM", "BILDIRISHLAR",
    "FOYDLAR", "PARAMETRLAR", "BAYRAMLAR", "QOIDALAR", "INTEGRATSIYALAR"];

  /* ---------- 7. Oxirgi eksport va to'liq nusxa (shu brauzer) ---------- */
  B.EKSPORT_KALIT = "mkb4-eksport-oxirgi";
  B.NUSXA_KALIT = "mkb4-nusxa-oxirgi";
  B.belgiYoz = function (kalit, qiymat) {
    try { W.localStorage.setItem(W.MKBapi ? W.MKBapi.kalit(kalit) : kalit, JSON.stringify(qiymat)); } catch (_) { }
  };
  B.belgiOqi = function (kalit) {
    try { return JSON.parse(W.localStorage.getItem(W.MKBapi ? W.MKBapi.kalit(kalit) : kalit) || "null"); } catch (_) { return null; }
  };

  /* Tizim holati sahifasi faqat administratorga. Yadro uni SAHIFA_MAXSUS ga qo'shmaguncha
     boshqa rolda unga havola ko'rsatilmaydi (tab tasmasi va sahifa ichidagi havolalar) */
  if (W.document && W.MKBapi) W.MKBapi.tayyor.then(() => {
    const ol = () => { if (W.MKB && W.MKB.rol && W.MKB.rol() !== "admin") W.document.querySelectorAll('a[href="tizim-holati.html"]').forEach(a => a.remove()); };
    if (W.document.readyState === "loading") W.document.addEventListener("DOMContentLoaded", ol); else ol();
  });

  W.MKB_BOSHQARUV = B;
})(typeof window !== "undefined" ? window : globalThis);
