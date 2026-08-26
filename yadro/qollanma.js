/* ============================================================
   qollanma.js — har bir rol uchun ish tartibi
   Shapkadagi "Tizimda qanday ishlash kerak" tugmasi va
   qollanma.html shu manbadan o'qiydi.
   ============================================================ */
window.MKB_QOLLANMA = {

  obyekt: {
    nom: "Obyekt menejeri",
    maqsad: "Siz bank balansiga qabul qilingan obyektlarning reyestrini yuritasiz: har bir bino, " +
            "maydon va texnika bo'yicha hujjat to'liq, ma'lumot dolzarb, kirish nazorati yoqilgan " +
            "bo'lishi kerak. Obyektning nazorat indeksi 70% dan pastga tushmasligi — sizning javobgarligingiz.",
    qadamlar: [
      {nom: "Panelni ochib, past indeksli obyektlarni ko'ring",
       izoh: "Diqqat talab obyektlar ro'yxati indeks bo'yicha o'sish tartibida keladi — eng muammolisi yuqorida.",
       havola: "panel-obyekt.html", havolaNomi: "Panelim"},
      {nom: "Yangi obyektni balansga qabul qiling",
       izoh: "Uch bosqich: asos hujjati, obyekt hujjatlari, tasdiqlash. Tasdiqlangach obyekt reyestrga tushadi.",
       havola: "qabul-boshlash.html", havolaNomi: "Qabulni boshlash"},
      {nom: "Kartochkani to'ldiring",
       izoh: "Manzil, maydon, qavatlar, kadastr raqami va fotolar. Qavat rejasi va 3D ko'rinish shu ma'lumotdan quriladi.",
       havola: "obyektlar.html", havolaNomi: "Reyestr"},
      {nom: "Kirish nuqtalarini ro'yxatga oling",
       izoh: "Har bir obyektda kamida bitta kirish nuqtasi va unga bog'langan qurilma bo'lishi shart.",
       havola: "kirish-nazorati.html", havolaNomi: "Kirish nazorati"},
      {nom: "Xarajatlarni kiritib boring",
       izoh: "Qo'riqlash, kommunal to'lov, ta'mir va servis — hammasi obyektga bog'lanadi.",
       havola: "obyektlar.html", havolaNomi: "Obyekt xarajatlari"},
      {nom: "Nazoratdan chiqarilgan obyektni arxivga o'tkazing",
       izoh: "Chiqish asosi, sana va yakuniy dalolatnoma bilan. Arxiv yozuvi o'zgartirilmaydi.",
       havola: "arxiv.html", havolaNomi: "Arxiv"},
    ],
    javobgarlik: [
      "Reyestrdagi har bir yozuvning to'liqligi va dolzarbligi",
      "Balansga qabul hujjatlarining tartibi",
      "Obyekt bo'yicha kirish nuqtalarining ro'yxatga olinishi",
      "Xarajatlarning obyektga to'g'ri bog'lanishi",
    ],
    meyor: [
      "Balansga qabul — asos hujjati kelganidan keyin 5 ish kuni ichida",
      "Birinchi ko'rik — qabul qilingandan keyin 10 kun ichida",
      "Kartochkadagi ma'lumot o'zgarsa — o'sha kuni yangilanadi",
    ],
    yopiq: ["Baholash hisobotini kiritish", "Sud va ijro bo'limi", "Foydalanuvchilar va rollar"],
  },

  nazorat: {
    nom: "Ko'rik inspektori",
    maqsad: "Siz obyektning jismoniy holatini nazorat qilasiz: rejali va navbatdan tashqari ko'riklar, " +
            "elektron kirish nazorati, sug'urta muddatlari va hodisalar. Obyektga kim, qachon va qanday " +
            "asosda kirgani sizning jurnalingizda qoladi.",
    qadamlar: [
      {nom: "Bugungi ko'riklar va kechikkanlarni ko'ring",
       izoh: "Reja muddati o'tgan ko'riklar alohida belgilanadi va indeksni pasaytiradi.",
       havola: "korik-rejasi.html", havolaNomi: "Ko'rik rejasi"},
      {nom: "Ko'rikni o'tkazing va dalolatnomani rasmiylashtiring",
       izoh: "Tekshirish bandlari, fotofiksatsiya, holat balli va imzo. Akt saqlanmaguncha ko'rik yakunlanmaydi.",
       havola: "korik-otkazish.html", havolaNomi: "Ko'rik o'tkazish"},
      {nom: "Kirish so'rovlarini ko'rib chiqing",
       izoh: "Tashrifchiga faqat vaqt oralig'i va kirish nuqtasi ko'rsatilgan ruxsat beriladi.",
       havola: "kirish-soravi.html", havolaNomi: "Kirish so'rovlari"},
      {nom: "Jonli tashrifni kuzating",
       izoh: "Identifikatsiyadan keyin eshik ochiladi, obyektda o'tkazilgan vaqt hisoblanadi, chiqishda inventar tekshiriladi.",
       havola: "tashrif-jonli.html", havolaNomi: "Jonli tashrif"},
      {nom: "Hodisalarni yuriting",
       izoh: "Har bir hodisa texnik xulosa va dalil bilan yopiladi. Dalilsiz yopish mumkin emas.",
       havola: "hodisalar.html", havolaNomi: "Hodisalar doskasi"},
      {nom: "Tugayotgan polislarni yangilang",
       izoh: "Muddati 30 kundan kam qolgan polislar ro'yxatda birinchi turadi.",
       havola: "sugurta-tugayotgan.html", havolaNomi: "Tugayotgan polislar"},
    ],
    javobgarlik: [
      "Ko'rik rejasining bajarilishi",
      "Kirish nuqtalarining onlayn holati",
      "Hodisalarni o'z vaqtida yopish",
      "Sug'urta qoplamasining uzilmasligi",
    ],
    meyor: [
      "Ko'chmas mulk — chorakda bir marta, transport — oyda bir marta, yer — yarim yilda bir marta",
      "Yuqori jiddiylikdagi hodisa — 24 soat ichida ko'rib chiqiladi",
      "Kirish so'roviga javob — 3 soat ichida",
    ],
    yopiq: ["Balansga qabul", "Sud va ijro bo'limi", "Foydalanuvchilar va rollar"],
  },

  baholash: {
    nom: "Baholovchi mutaxassis",
    maqsad: "Siz obyektlarning qiymatini dolzarb holda ushlab turasiz: baholash buyurtmalari, " +
            "hisobotlarni qabul qilish, qiymat dinamikasi va qayta baholash muddatlari.",
    qadamlar: [
      {nom: "Qayta baholash zarur obyektlarni aniqlang",
       izoh: "Bahosi 12 oydan eski bo'lgan obyektlar panelda alohida ko'rsatiladi.",
       havola: "panel-baholash.html", havolaNomi: "Panelim"},
      {nom: "Baholash buyurtmasini rasmiylashtiring",
       izoh: "Obyekt, usul, muddat va baholovchi tashkilot ko'rsatiladi.",
       havola: "baholash-buyurtma.html", havolaNomi: "Buyurtma"},
      {nom: "Hisobotni kiriting",
       izoh: "Qiymat, usul, hisobot raqami va sanasi. Kiritilgan qiymat obyekt kartochkasiga o'tadi.",
       havola: "baholash-hisobot-kiritish.html", havolaNomi: "Hisobot kiritish"},
      {nom: "Dinamikani tekshiring",
       izoh: "Qiymatning keskin pasayishi hodisa ochish uchun asos bo'ladi.",
       havola: "baholash-dinamika.html", havolaNomi: "Qiymat dinamikasi"},
    ],
    javobgarlik: [
      "Baholash hisobotlarining to'liqligi va muddati",
      "Qiymatning obyekt kartochkasi bilan mos kelishi",
      "Baholovchi tashkilotlar ro'yxatining yuritilishi",
    ],
    meyor: [
      "Qayta baholash — kamida 12 oyda bir marta",
      "Hisobot kelgach 3 ish kuni ichida tizimga kiritiladi",
    ],
    yopiq: ["Kirish nazorati", "Sud va ijro bo'limi", "Balansga qabul"],
  },

  yurist: {
    nom: "Yurist",
    maqsad: "Siz obyekt bankka o'tguncha bo'lgan huquqiy yo'lni yuritasiz: da'vo, sud, qaror va ijro. " +
            "Har bir bosqichga o'tish faqat tartib bo'yicha va tarixga yozuv bilan amalga oshiriladi.",
    qadamlar: [
      {nom: "Undiruv doskasini oching",
       izoh: "Ishlar bosqichlar bo'yicha taqsimlangan, muddati yaqinlashgani yuqorida turadi.",
       havola: "undiruv.html", havolaNomi: "Undiruv doskasi"},
      {nom: "Da'vo hujjatlarini tayyorlang",
       izoh: "Shakl avtomatik to'ldiriladi, faqat tekshirib imzolash qoladi.",
       havola: "davo-tayyorlash.html", havolaNomi: "Da'vo tayyorlash"},
      {nom: "Sud majlislarini kuzating",
       izoh: "Kalendarda majlis sanasi, sud va mas'ul ko'rsatiladi.",
       havola: "sud-kalendar.html", havolaNomi: "Sud kalendari"},
      {nom: "Qarorni kiriting",
       izoh: "Qaror raqami va sanasi kiritilgach ish ijro bosqichiga o'tadi.",
       havola: "qaror-kiritish.html", havolaNomi: "Qaror kiritish"},
      {nom: "Ijro nazoratini yuriting",
       izoh: "Ijro hujjati muddati va bajarilish holati kuzatiladi.",
       havola: "ijro-nazorati.html", havolaNomi: "Ijro nazorati"},
    ],
    javobgarlik: [
      "Ish bosqichlarining tartibi va muddatlari",
      "Sud hujjatlarining to'liqligi",
      "Ijro hujjatlari bo'yicha nazorat",
    ],
    meyor: [
      "Da'vo — talabnoma muddati tugagach 10 kun ichida",
      "Qaror kuchga kirgach 5 kun ichida ijroga beriladi",
    ],
    yopiq: ["Kirish nazorati", "Baholash hisobotini kiritish", "Foydalanuvchilar va rollar"],
  },

  filial: {
    nom: "Filial rahbari",
    maqsad: "Siz filialdagi barcha obyektlar bo'yicha umumiy manzarani ko'rasiz, rejalarni va " +
            "buyurtmalarni tasdiqlaysiz, hisobotlarni shakllantirasiz.",
    qadamlar: [
      {nom: "Filial panelini ko'ring",
       izoh: "Obyektlar soni, nazorat indeksi, kechikkan ko'riklar va ochiq hodisalar bir ekranda.",
       havola: "panel-filial.html", havolaNomi: "Filial paneli"},
      {nom: "Kutayotgan tasdiqlarni ko'rib chiqing",
       izoh: "Ko'rik rejasi, baholash buyurtmasi, kirish ruxsati va servis topshiriqlari.",
       havola: "tasdiqlar.html", havolaNomi: "Tasdiqlar"},
      {nom: "Filial kesimidagi hisobotni oching",
       izoh: "Davr tanlanadi, jadval va grafiklar shu davr bo'yicha qayta hisoblanadi.",
       havola: "hisobot-filial.html", havolaNomi: "Filial kesimi"},
      {nom: "Vazifalarni taqsimlang",
       izoh: "Har bir vazifaning mas'uli, muddati va obyekti ko'rsatiladi.",
       havola: "vazifalar.html", havolaNomi: "Vazifalar"},
    ],
    javobgarlik: [
      "Filial bo'yicha nazorat indeksining o'rtacha darajasi",
      "Tasdiqlarning o'z vaqtida ko'rib chiqilishi",
      "Hisobotlarning markazga o'z vaqtida topshirilishi",
    ],
    meyor: [
      "Tasdiq so'roviga javob — 2 ish kuni ichida",
      "Oylik hisobot — keyingi oyning 5-sanasigacha",
    ],
    yopiq: ["Foydalanuvchilar va rollar", "Integratsiyalar"],
  },

  admin: {
    nom: "Administrator",
    maqsad: "Siz tizimning ishlashini ta'minlaysiz: foydalanuvchilar, rollar, ma'lumotnomalar, " +
            "integratsiyalar va amallar tarixi. Ma'lumotni siz kiritmaysiz — siz kim kirita olishini belgilaysiz.",
    qadamlar: [
      {nom: "Foydalanuvchilarni yuriting",
       izoh: "Yangi xodimga rol va filial biriktiriladi, ishdan bo'shaganda hisob bloklanadi.",
       havola: "foydalanuvchilar.html", havolaNomi: "Foydalanuvchilar"},
      {nom: "Rollar matritsasini tekshiring",
       izoh: "Har bir rolga qaysi bo'lim ochiqligi shu yerda ko'rinadi.",
       havola: "rollar.html", havolaNomi: "Rollar matritsasi"},
      {nom: "Ma'lumotnomalarni yangilang",
       izoh: "Obyekt turlari, hujjat turlari, hodisa turlari va boshqa ro'yxatlar.",
       havola: "malumotnomalar.html", havolaNomi: "Ma'lumotnomalar"},
      {nom: "Integratsiyalarni kuzating",
       izoh: "Tashqi tizimlar bilan almashinuv holati va oxirgi sinxronizatsiya vaqti.",
       havola: "integratsiyalar.html", havolaNomi: "Integratsiyalar"},
      {nom: "Amallar tarixini tekshiring",
       izoh: "Kim, qachon, qaysi yozuvni o'zgartirgani. Yozuvlar o'chirilmaydi.",
       havola: "amallar-tarixi.html", havolaNomi: "Amallar tarixi"},
    ],
    javobgarlik: [
      "Hisoblar va huquqlarning to'g'riligi",
      "Ma'lumotnomalarning dolzarbligi",
      "Integratsiyalarning uzluksizligi",
      "Amallar tarixining butunligi",
    ],
    meyor: [
      "Ishdan bo'shagan xodim hisobi — o'sha kuni bloklanadi",
      "Integratsiya uzilishi — 4 soat ichida hal qilinadi",
    ],
    yopiq: [],
  },
};

/* Xodimlarning ish suratlari: F.I.Sh. -> fayl.
   Surat qo'shilsa shapkadagi profil va foydalanuvchilar ro'yxati avtomatik yangilanadi. */
window.MKB_XODIM_RASMLARI = window.MKB_XODIM_RASMLARI || {};
