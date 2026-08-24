/* ============================================================
   Yagona ma'lumot manbai — barcha bo'limlar shu moduldan o'qiydi.
   Bir obyekt bo'yicha summa, sana va holat butun tizimda bir xil bo'lishi
   uchun sahifalarda alohida massivlar saqlanmaydi.

   Bog'lanish: Mijoz -> Shartnoma -> Garov -> Undiruv ishi -> Auksion loti
   ============================================================ */
(function () {
"use strict";

/* ---------- Undiruv bosqichlari (tartib muhim: faqat ketma-ket o'tiladi) ---------- */
const BOSQICHLAR = [
  {kalit: "ogohlantirish", nom: "Ogohlantirish",     rang: "#8A94A0", chip: "chip-kul"},
  {kalit: "davo",          nom: "Da'vo arizasi",     rang: "#3E7BD6", chip: "chip-kok"},
  {kalit: "sud",           nom: "Sud jarayonida",    rang: "#8B5CF6", chip: "chip-binafsha"},
  {kalit: "qaror",         nom: "Sud qarori",        rang: "#0E6B5C", chip: "chip-asos"},
  {kalit: "mib",           nom: "MIB ijrosi",        rang: "#D98324", chip: "chip-sariq"},
  {kalit: "musodara",      nom: "Musodara qilingan", rang: "#2E9E52", chip: "chip-asos"},
  {kalit: "auksion",       nom: "Auksionda",         rang: "#8B5CF6", chip: "chip-binafsha"}
];

/* Bosqich -> garov obyektining holati (TZ, Д-2 qoidasi) */
const BOSQICH_HOLAT = {
  ogohlantirish: {nom: "Garovda",              rang: "#7BAEFC"},
  davo:          {nom: "Garovda",              rang: "#7BAEFC"},
  sud:           {nom: "Garovda",              rang: "#7BAEFC"},
  qaror:         {nom: "Musodara jarayonida",  rang: "#E8763C"},
  mib:           {nom: "Musodara jarayonida",  rang: "#E8763C"},
  musodara:      {nom: "Nazoratda",            rang: "#2E9E52"},
  auksion:       {nom: "Auksionda",            rang: "#8B5CF6"}
};

/* ---------- Yozuvlar. Har bir yozuv butun tizim uchun yagona haqiqat ---------- */
const YOZUVLAR = [
  {
    id: "GR-2026/4471",
    mijoz: {nom: "Karimov Javlon Anvarovich", tur: "Jismoniy shaxs", raqam: "PINFL 3210 4471 8802", belgi: "KJ", yur: false},
    filial: "Yunusobod filiali",
    shartnoma: {raqam: "IP-2023/4471", tur: "Ipoteka krediti", sana: "12.04.2023", berilgan: 480.0},
    qarz: {asosiy: 412.0, foiz: 74.2, kunlar: 214},
    garov: {
      tur: "Kvartira", nom: "Yunusobod 12-kvartal, 45-uy, 23-xonadon", qisqa: "Yunusobod 12-kvartal, 45-uy",
      hudud: "Toshkent sh.", hududToliq: "Toshkent sh., Yunusobod", manzil: "Yunusobod 12-kvartal, 45-uy",
      maydon: "78 m²", baho: 520.0, bahoSana: "18.02.2026", sugurta: "Amalda",
      rasm: "assets/bino_9.webp", nazoratBall: 72
    },
    ish: {
      raqam: "UI-2026/0412", bosqich: "mib", masul: "Sobirov Ulug'bek",
      sud: "Yunusobod tumanlararo fuqarolik ishlari sudi", qaror: "2-1234/2026",
      ijro: "IV-2026/4471", muddat: "28-may — ijro hujjati muddati", kun: "4 kun qoldi", shoshilinch: "yuqori",
      tarix: [
        ["14.10.2025", "Yozma ogohlantirish yuborildi", "Qarzdorga 90 kunlik kechikish bo'yicha rasmiy talabnoma topshirildi."],
        ["22.12.2025", "Da'vo arizasi berildi", "Sudga garovni undirish to'g'risida da'vo arizasi taqdim etildi."],
        ["12.03.2026", "Sud qarori qabul qilindi", "Garov predmetini realizatsiya qilish to'g'risida qaror chiqarildi."],
        ["02.04.2026", "Ijro varaqasi MIBga topshirildi", "Majburiy ijro byurosida ijro ishi qo'zg'atildi."]
      ],
      hujjatlar: [["PDF", "Sud qarori 2-1234/2026", "1,8 MB"], ["PDF", "Ijro varaqasi IV-2026/4471", "640 KB"], ["PDF", "Garov shartnomasi", "2,1 MB"]]
    },
    tolov: [1,1,1,1,1,1,0,0,0,0,0,0]
  },
  {
    id: "GR-2025/1187",
    mijoz: {nom: "«Zarafshon Tekstil» MChJ", tur: "Yuridik shaxs", raqam: "INN 302 481 776", belgi: "ZT", yur: true},
    filial: "Samarqand filiali",
    shartnoma: {raqam: "IK-2022/1187", tur: "Investitsiya krediti", sana: "03.02.2022", berilgan: 4200.0},
    qarz: {asosiy: 3210.0, foiz: 630.4, kunlar: 402},
    garov: {
      tur: "Ishlab chiqarish", nom: "Zarafshon Tekstil ishlab chiqarish sexi", qisqa: "Zarafshon Tekstil sexi",
      hudud: "Samarqand", hududToliq: "Samarqand vil., Samarqand sh.", manzil: "Sanoat ko'chasi, 4",
      maydon: "9 400 m²", baho: 4150.0, bahoSana: "05.12.2025", sugurta: "Amalda",
      rasm: "assets/bino_mall.webp", nazoratBall: 89, qabul: "21.11.2025"
    },
    ish: {
      raqam: "UI-2025/1187", bosqich: "musodara", masul: "Qodirova Nilufar",
      sud: "Samarqand viloyat iqtisodiy sudi", qaror: "4-0221/2025",
      ijro: "IV-2025/1187", muddat: "Baholash hisoboti — 10-iyun", kun: "17 kun qoldi", shoshilinch: "normal",
      tarix: [
        ["05.03.2025", "Da'vo arizasi berildi", "Iqtisodiy sudga qarz va garov bo'yicha da'vo taqdim etildi."],
        ["19.06.2025", "Sud qarori qabul qilindi", "Qarz undirish va garovni realizatsiya qilish to'g'risida."],
        ["04.09.2025", "MIB ijro ishi yakunlandi", "Obyekt bank foydasiga majburiy ravishda o'tkazildi."],
        ["21.11.2025", "Obyekt bank balansiga qabul qilindi", "Qabul dalolatnomasi imzolandi, xavfsizlik tizimi ishga tushirildi."]
      ],
      hujjatlar: [["PDF", "Qabul dalolatnomasi", "1,2 MB"], ["PDF", "Sud qarori 4-0221/2025", "2,4 MB"], ["XLSX", "Inventarizatsiya ro'yxati", "318 KB"]]
    },
    tolov: [1,1,1,0,0,0,0,0,0,0,0,0]
  },
  {
    id: "GR-2026/2210",
    mijoz: {nom: "Ergasheva Dilnoza Baxtiyorovna", tur: "Jismoniy shaxs", raqam: "PINFL 5102 2210 4417", belgi: "ED", yur: false},
    filial: "Chilonzor filiali",
    shartnoma: {raqam: "IS-2024/2210", tur: "Iste'mol krediti (garov bilan)", sana: "26.07.2024", berilgan: 95.0},
    qarz: {asosiy: 81.4, foiz: 11.1, kunlar: 96},
    garov: {
      tur: "Kvartira", nom: "Chilonzor 9-kvartal, 12-uy, 56-xonadon", qisqa: "Chilonzor 9-kvartal, 12-uy",
      hudud: "Toshkent sh.", hududToliq: "Toshkent sh., Chilonzor", manzil: "Chilonzor 9-kvartal, 12-uy",
      maydon: "64 m²", baho: 340.0, bahoSana: "11.03.2026", sugurta: "Amalda",
      rasm: "assets/bino_qavatlar.webp", nazoratBall: 70
    },
    ish: {
      raqam: "UI-2026/2210", bosqich: "sud", masul: "Sobirov Ulug'bek",
      sud: "Chilonzor tumanlararo fuqarolik ishlari sudi", qaror: "—",
      ijro: "Hali berilmagan", muddat: "Sud majlisi — 3-iyun", kun: "10 kun qoldi", shoshilinch: "orta",
      tarix: [
        ["18.01.2026", "Yozma ogohlantirish yuborildi", "60 kunlik kechikish bo'yicha talabnoma topshirildi."],
        ["27.03.2026", "Da'vo arizasi berildi", "Sudga da'vo arizasi qabul qilindi, ish yuritish boshlandi."],
        ["03.06.2026", "Navbatdagi sud majlisi", "Qarzdor tomonidan qisman to'lov taklifi ko'rib chiqiladi."]
      ],
      hujjatlar: [["PDF", "Da'vo arizasi", "890 KB"], ["PDF", "Kredit shartnomasi IS-2024/2210", "1,5 MB"]]
    },
    tolov: [1,1,1,1,1,1,1,1,0,0,0,0]
  },
  {
    id: "GR-2025/0934",
    mijoz: {nom: "«Navruz Savdo» MChJ", tur: "Yuridik shaxs", raqam: "INN 205 118 934", belgi: "NS", yur: true},
    filial: "Toshkent shahar filiali",
    shartnoma: {raqam: "AM-2023/0934", tur: "Aylanma mablag' krediti", sana: "17.05.2023", berilgan: 1350.0},
    qarz: {asosiy: 1080.0, foiz: 180.6, kunlar: 268},
    garov: {
      tur: "Savdo maydoni", nom: "Navruz Plaza, 3-qavat savdo maydoni", qisqa: "Navruz Plaza",
      hudud: "Toshkent sh.", hududToliq: "Toshkent sh., Shayxontohur", manzil: "Amir Temur ko'chasi, 88",
      maydon: "1 850 m²", baho: 1480.0, bahoSana: "22.04.2026", sugurta: "Amalda",
      rasm: "assets/bino_tower.webp", nazoratBall: 92, qabul: "14.08.2025"
    },
    ish: {
      raqam: "UI-2025/0934", bosqich: "auksion", masul: "Qodirova Nilufar",
      sud: "Toshkent shahar iqtisodiy sudi", qaror: "4-0512/2025",
      ijro: "IV-2025/0934", muddat: "Auksion savdosi — 5-iyun", kun: "12 kun qoldi", shoshilinch: "orta",
      tarix: [
        ["11.02.2025", "Da'vo arizasi berildi", "Iqtisodiy sudga qarzni undirish bo'yicha da'vo berildi."],
        ["30.05.2025", "Sud qarori qabul qilindi", "Garov predmetiga undiruv qaratildi."],
        ["14.08.2025", "Obyekt bank balansiga qabul qilindi", "Savdo maydoni qo'riqlash tizimiga ulandi."],
        ["22.04.2026", "Auksionga chiqarildi", "Boshlang'ich narx baholangan qiymat bo'yicha belgilandi."]
      ],
      hujjatlar: [["PDF", "Auksion e'loni", "520 KB"], ["PDF", "Baholash hisoboti", "3,1 MB"], ["PDF", "Qabul dalolatnomasi", "1,1 MB"]]
    },
    tolov: [1,1,0,0,0,0,0,0,0,0,0,0]
  },
  {
    id: "GR-2026/5512",
    mijoz: {nom: "To'xtasinov Sherzod Rustamovich", tur: "Jismoniy shaxs", raqam: "PINFL 4417 5512 9003", belgi: "TS", yur: false},
    filial: "Toshkent shahar filiali",
    shartnoma: {raqam: "AV-2024/5512", tur: "Avtokredit", sana: "09.09.2024", berilgan: 82.0},
    qarz: {asosiy: 68.2, foiz: 6.6, kunlar: 58},
    garov: {
      tur: "Avtotransport", nom: "Chevrolet Malibu 2 (2023) · 01 A 887 KA", qisqa: "Chevrolet Malibu 2",
      hudud: "Toshkent sh.", hududToliq: "Toshkent sh., Mirobod", manzil: "Saqlash maydonchasi, Mirobod",
      maydon: "—", baho: 186.0, bahoSana: "02.04.2026", sugurta: "Amalda",
      rasm: "assets/kam_avto.webp", nazoratBall: 64
    },
    ish: {
      raqam: "UI-2026/5512", bosqich: "davo", masul: "Sobirov Ulug'bek",
      sud: "Mirobod tumanlararo fuqarolik ishlari sudi", qaror: "—",
      ijro: "Hali berilmagan", muddat: "Ariza ko'rib chiqilishi — 11-iyun", kun: "18 kun qoldi", shoshilinch: "normal",
      tarix: [
        ["02.03.2026", "Yozma ogohlantirish yuborildi", "30 kunlik kechikish bo'yicha talabnoma yuborildi."],
        ["29.04.2026", "Da'vo arizasi berildi", "Transport vositasiga undiruv qaratish so'raldi."]
      ],
      hujjatlar: [["PDF", "Da'vo arizasi", "740 KB"], ["PDF", "Garov shartnomasi (transport)", "1,3 MB"]]
    },
    tolov: [1,1,1,1,1,1,1,1,1,1,0,0]
  },
  {
    id: "GR-2026/3308",
    mijoz: {nom: "Yusupova Nodira Alisherovna", tur: "Jismoniy shaxs", raqam: "PINFL 6014 3308 1120", belgi: "YN", yur: false},
    filial: "Chilonzor filiali",
    shartnoma: {raqam: "IP-2023/3308", tur: "Ipoteka krediti", sana: "28.06.2023", berilgan: 330.0},
    qarz: {asosiy: 276.0, foiz: 36.4, kunlar: 141},
    garov: {
      tur: "Turar-joy majmuasi", nom: "Nurafshon turar-joy majmuasi, 18-uy", qisqa: "Nurafshon turar-joy majmuasi",
      hudud: "Nurafshon sh.", hududToliq: "Toshkent vil., Nurafshon", manzil: "Istiqlol ko'chasi, 21",
      maydon: "96 m²", baho: 395.0, bahoSana: "30.01.2026", sugurta: "Amalda",
      rasm: "assets/bino_turar.webp", nazoratBall: 76
    },
    ish: {
      raqam: "UI-2026/3308", bosqich: "qaror", masul: "Qodirova Nilufar",
      sud: "Sergeli tumanlararo fuqarolik ishlari sudi", qaror: "2-0908/2026",
      ijro: "Rasmiylashtirilmoqda", muddat: "Ijro varaqasini olish — 30-may", kun: "6 kun qoldi", shoshilinch: "yuqori",
      tarix: [
        ["09.11.2025", "Yozma ogohlantirish yuborildi", "Qayta tuzish bo'yicha muzokara natijasiz yakunlandi."],
        ["16.01.2026", "Da'vo arizasi berildi", "Ipoteka predmetiga undiruv qaratish so'raldi."],
        ["08.05.2026", "Sud qarori qabul qilindi", "Qaror bank foydasiga chiqdi, apellyatsiya muddati o'tmoqda."]
      ],
      hujjatlar: [["PDF", "Sud qarori 2-0908/2026", "1,9 MB"], ["PDF", "Ipoteka shartnomasi", "2,6 MB"]]
    },
    tolov: [1,1,1,1,1,1,1,0,0,0,0,0]
  },
  {
    id: "GR-2025/0755",
    mijoz: {nom: "«Bo'ston Agro» fermer xo'jaligi", tur: "Yuridik shaxs", raqam: "INN 411 020 755", belgi: "BA", yur: true},
    filial: "Namangan filiali",
    shartnoma: {raqam: "AG-2022/0755", tur: "Agrokredit", sana: "21.03.2022", berilgan: 950.0},
    qarz: {asosiy: 742.0, foiz: 148.0, kunlar: 335},
    garov: {
      tur: "Yer uchastkasi", nom: "Qibray tumani, 2,4 ga yer uchastkasi", qisqa: "Qibray tumani",
      hudud: "Toshkent vil.", hududToliq: "Toshkent vil., Qibray", manzil: "Qibray tumani, Salor MFY",
      maydon: "24 000 m²", baho: 1020.0, bahoSana: "16.10.2025", sugurta: "Yo'q",
      rasm: "assets/bino_yer.webp", nazoratBall: 61
    },
    ish: {
      raqam: "UI-2025/0755", bosqich: "mib", masul: "Sobirov Ulug'bek",
      sud: "Namangan viloyat iqtisodiy sudi", qaror: "4-0733/2025",
      ijro: "IV-2025/0755", muddat: "Yer uchastkasini qabul qilish — 14-iyun", kun: "21 kun qoldi", shoshilinch: "normal",
      tarix: [
        ["20.04.2025", "Da'vo arizasi berildi", "Yer uchastkasi garovi bo'yicha da'vo taqdim etildi."],
        ["07.08.2025", "Sud qarori qabul qilindi", "Garov predmetini realizatsiya qilishga ruxsat berildi."],
        ["19.12.2025", "Ijro varaqasi MIBga topshirildi", "Ijro ishi qo'zg'atildi, chegara belgilari tekshirilmoqda."]
      ],
      hujjatlar: [["PDF", "Ijro varaqasi IV-2025/0755", "680 KB"], ["PDF", "Kadastr hujjati", "1,4 MB"], ["XLSX", "Chegara koordinatalari", "96 KB"]]
    },
    tolov: [1,1,1,1,0,0,0,0,0,0,0,0]
  },
  {
    id: "GR-2026/0141",
    mijoz: {nom: "Rasulov Otabek Farhodovich", tur: "Jismoniy shaxs", raqam: "PINFL 3308 0141 7724", belgi: "RO", yur: false},
    filial: "Toshkent shahar filiali",
    shartnoma: {raqam: "MQ-2025/0141", tur: "Mikroqarz (garov bilan)", sana: "14.11.2025", berilgan: 40.0},
    qarz: {asosiy: 35.8, foiz: 2.8, kunlar: 34},
    garov: {
      tur: "Dala hovli", nom: "Chorvoq dala hovlisi", qisqa: "Chorvoq dala hovlisi",
      hudud: "Bo'stonliq tum.", hududToliq: "Toshkent vil., Bo'stonliq", manzil: "Chorvoq qirg'og'i, 12",
      maydon: "850 m²", baho: 620.0, bahoSana: "02.03.2026", sugurta: "Amalda",
      rasm: "assets/bino_dacha.webp", nazoratBall: 68
    },
    ish: {
      raqam: "UI-2026/0141", bosqich: "ogohlantirish", masul: "Sobirov Ulug'bek",
      sud: "Hali murojaat qilinmagan", qaror: "—",
      ijro: "Hali berilmagan", muddat: "Talabnomaga javob — 8-iyun", kun: "15 kun qoldi", shoshilinch: "normal",
      tarix: [
        ["24.04.2026", "Birinchi ogohlantirish yuborildi", "SMS va rasmiy xat orqali xabar berildi."],
        ["09.05.2026", "Yozma talabnoma topshirildi", "30 kun ichida qarzni yopish taklif etildi."]
      ],
      hujjatlar: [["PDF", "Yozma talabnoma", "420 KB"], ["PDF", "Garov shartnomasi", "1,1 MB"]]
    },
    tolov: [1,1,1,1,1,1,1,1,1,1,1,0]
  }
];

/* ---------- Hosila qiymatlar (hech qayerda qo'lda yozilmaydi) ---------- */
function fmt(n){ return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "\u202F").replace(/\u202F/g, " "); }
function pul(mln){
  // 1 000 mln so'm dan katta bo'lsa mlrd da ko'rsatiladi
  return mln >= 1000
    ? (mln / 1000).toFixed(2).replace(".", ",").replace(/,00$/, "") + " mlrd so'm"
    : mln.toFixed(1).replace(".", ",").replace(/,0$/, "") + " mln so'm";
}
function son(mln){
  return mln.toLocaleString("ru-RU", {minimumFractionDigits: 1, maximumFractionDigits: 1}).replace(".", ",");
}
const bosqichnoma = k => BOSQICHLAR.find(b => b.kalit === k) || BOSQICHLAR[0];


/* ---------- Aktivlar tasnifi va imkoniyatli yo'qotishlar zaxirasi ----------
   Markaziy bank aktivlar sifatini tasniflash tartibiga muvofiq besh toifa.
   Toifa kechikish kunlaridan kelib chiqadi, zaxira esa toifadan — ikkalasi
   ham qo'lda kiritilmaydi (Д-2, Д-7).

   E'TIBOR: kun chegaralari va zaxira foizlari amaldagi tahrir bo'yicha
   BUYURTMACHI TOMONIDAN TASDIQLANISHI SHART. Ular shu yerda — yagona
   joyda — saqlanadi, shuning uchun me'yor o'zgarsa bitta jadval tuzatiladi.  */
const TASNIF = [
  {kalit: "yaxshi",      nom: "Yaxshi",      kundan: 0,   zaxira: 0,   chip: "chip-yashil",    rang: "#2E9E52"},
  {kalit: "standart",    nom: "Standart",    kundan: 1,   zaxira: 10,  chip: "chip-kok",       rang: "#3E7BD6"},
  {kalit: "substandart", nom: "Substandart", kundan: 31,  zaxira: 25,  chip: "chip-sariq",     rang: "#D98324"},
  {kalit: "shubhali",    nom: "Shubhali",    kundan: 91,  zaxira: 50,  chip: "chip-tarvuz",    rang: "#E8763C"},
  {kalit: "umidsiz",     nom: "Umidsiz",     kundan: 181, zaxira: 100, chip: "chip-qizil",     rang: "#C0392B"}
];

/* Kechikish kunidan toifani aniqlash. Chegara — "shu kundan boshlab". */
function tasnifla(kunlar){
  let topilgan = TASNIF[0];
  TASNIF.forEach(t => { if (kunlar >= t.kundan) topilgan = t; });
  return topilgan;
}

/* Ta'minlanmagan qism: qarz garov qiymatidan qancha oshadi.
   Zaxira faqat shu qismga emas, butun qarzga hisoblanadi — soddalashtirilgan
   model; garovni hisobga olish tartibi buyurtmachi bilan aniqlanadi. */
function zaxiraHisobi(qarzJami, garovBaho, foiz){
  const zaxira    = +(qarzJami * foiz / 100).toFixed(1);
  const taminot   = Math.min(garovBaho, qarzJami);
  const ochiq     = +(qarzJami - taminot).toFixed(1);   // ta'minlanmagan qoldiq
  const qoplash   = qarzJami > 0 ? Math.round(garovBaho / qarzJami * 100) : 0;
  return {zaxira, ochiq, qoplash};
}

YOZUVLAR.forEach(y => {
  y.qarz.jami = +(y.qarz.asosiy + y.qarz.foiz).toFixed(1);   // Д-1: yagona qiymat
  y.bosqichNomi = bosqichnoma(y.ish.bosqich).nom;
  y.bosqichChip = bosqichnoma(y.ish.bosqich).chip;
  y.holat = BOSQICH_HOLAT[y.ish.bosqich];                     // Д-2: holat bosqichdan
  y.qarzMatn = pul(y.qarz.jami);
  y.asosiyMatn = pul(y.qarz.asosiy);
  y.foizMatn = pul(y.qarz.foiz);
  y.bahoMatn = pul(y.garov.baho);
  y.qarzSon = son(y.qarz.jami);

  /* Tasnif kechikish kunidan, zaxira tasnifdan — ikkalasi ham hosila (Д-2) */
  y.tasnif = tasnifla(y.qarz.kunlar);
  const h = zaxiraHisobi(y.qarz.jami, y.garov.baho, y.tasnif.zaxira);
  y.zaxira      = h.zaxira;        // zaxiraga ajratma, mln so'm
  y.ochiqQoldiq = h.ochiq;         // garov bilan qoplanmagan qism
  y.qoplash     = h.qoplash;       // garovning qarzga nisbati, %
  y.zaxiraMatn  = pul(y.zaxira);
});

/* ---------- Tasnif kesimi: portfel bo'yicha zaxira yuki (Д-7) ---------- */
function tasnifStatistikasi(){
  return TASNIF.map(t => {
    const guruh = YOZUVLAR.filter(y => y.tasnif.kalit === t.kalit);
    return {
      kalit: t.kalit, nom: t.nom, rang: t.rang, chip: t.chip, foizStavka: t.zaxira,
      son: guruh.length,
      qarz:   +guruh.reduce((s, y) => s + y.qarz.jami, 0).toFixed(1),
      zaxira: +guruh.reduce((s, y) => s + y.zaxira, 0).toFixed(1)
    };
  });
}
const jamiZaxira = () => +YOZUVLAR.reduce((s, y) => s + y.zaxira, 0).toFixed(1);

/* ---------- Umumlashmalar: raqamlar massivdan hisoblanadi (Д-7) ---------- */
function bosqichStatistikasi(){
  return BOSQICHLAR.map(b => {
    const guruh = YOZUVLAR.filter(y => y.ish.bosqich === b.kalit);
    return {
      kalit: b.kalit, nom: b.nom, rang: b.rang,
      son: guruh.length,
      summa: +guruh.reduce((s, y) => s + y.qarz.jami, 0).toFixed(1)
    };
  });
}
function holatStatistikasi(){
  const xarita = {};
  YOZUVLAR.forEach(y => {
    const h = y.holat.nom;
    xarita[h] = xarita[h] || {nom: h, rang: y.holat.rang, son: 0};
    xarita[h].son++;
  });
  const jami = YOZUVLAR.length;
  return Object.values(xarita).map(x => Object.assign(x, {
    foiz: Math.round(x.son / jami * 100)
  }));
}
const jamiQarz = () => +YOZUVLAR.reduce((s, y) => s + y.qarz.jami, 0).toFixed(1);
const jamiBaho = () => +YOZUVLAR.reduce((s, y) => s + y.garov.baho, 0).toFixed(1);


/* ---------- Portfel darajasidagi agregatlar ----------
   8 ta batafsil yozuv — shoshilinch ishlar kesimi. Butun bank portfeli
   ko‘rsatkichlari shu yerda YAGONA joyda saqlanadi (sahifalarda emas).
   Yig‘indi va foizlar moslikTekshiruvi() bilan nazorat qilinadi. */
const PORTFEL = {
  jami: 1248,
  bahoTrln: "12,7",
  oylikUndiruvMlrd: "58,4",
  holatlar: [
    {nom: "Garovda",              rang: "#7BAEFC", son: 704},
    {nom: "Nazoratda",            rang: "#2E9E52", son: 306},
    {nom: "Musodara jarayonida",  rang: "#E8763C", son: 118},
    {nom: "Ijaraga berilgan",     rang: "#3E7BD6", son: 86},
    {nom: "Auksionda",            rang: "#8B5CF6", son: 34}
  ],
  /* Nazorat tadbirlari — butun portfel bo'yicha (Д-7 talabiga ko'ra
     kesim yig'indilari jami bilan moslikTekshiruvi() da solishtiriladi) */
  koriklar:  {jami: 1248, otkazilgan: 1094, rejada: 118, muddatiOtgan: 36},
  sugurtali: {jami: 1248, amalda: 1176, tugaydi30: 52, muddatiOtgan: 20},
  baholash:  {jami: 1248, dolzarb: 1063, tugaydi90: 141, eskirgan: 44}
};
/* Foizlar eng katta qoldiq usulida butunlashtiriladi — yig'indi doim 100 (Д-3) */
(function(){
  const ulush = PORTFEL.holatlar.map(h => h.son / PORTFEL.jami * 100);
  const butun = ulush.map(Math.floor);
  let qoldi = 100 - butun.reduce((a, b) => a + b, 0);
  ulush.map((u, i) => [u - butun[i], i]).sort((a, b) => b[0] - a[0])
    .slice(0, qoldi).forEach(([, i]) => butun[i]++);
  PORTFEL.holatlar.forEach((h, i) => { h.foiz = butun[i]; });
})();
PORTFEL.balansda = PORTFEL.holatlar.filter(h => ["Nazoratda","Auksionda","Ijaraga berilgan"].includes(h.nom))
  .reduce((s, h) => s + h.son, 0);


/* ---------- Realizatsiya: yopilgan ishlar bo'yicha lotlar ----------
   Faol YOZUVLAR ro'yxatiga kirmagan (ishi allaqachon yakunlangan) obyektlar.
   Auksion sahifasi ularni faol yozuvlardagi lotlar bilan birga ko'rsatadi. */
const SOTUV = [
  {id: "GR-2024/0286", nom: "Sergeli logistika ombori", tur: "Ombor",
   hudud: "Toshkent sh.", hududToliq: "Toshkent sh., Sergeli",
   baho: 4200.0, rasm: "assets/bino_9.webp", ish: "UI-2024/0286", ijro: "IV-2024/0286",
   bosqich: "elon", korik: 2},
  {id: "GR-2024/0512", nom: "Chorsu Savdo Markazi, B blok", qisqa: "Chorsu Savdo Markazi", tur: "Savdo maydoni",
   hudud: "Toshkent sh.", hududToliq: "Toshkent sh., Chilonzor",
   baho: 2400.0, rasm: "assets/bino_mall.webp", ish: "UI-2024/0512", ijro: "IV-2024/0512",
   bosqich: "rasmiylashtirish", korik: 0}
];

/* ---------- Doimiy arxiv: realizatsiya yakunlangan obyektlar (Д-6) ---------- */
const ARXIV = [
  {kod: "GR-2023/0088", nom: "Yakkasaroy 2-xonali kvartirasi", tur: "Kvartira",
   sotilgan: "18-may, 2026", yil: "2026", xaridor: "Soliyev Umidjon",
   summa: 640.0, ish: "UI-2023/0088", qabul: "12-yan, 2025", nazorat: "16 oy", rasm: "assets/bino_turar.webp"},
  {kod: "GR-2022/0034", nom: "Chimyon dala hovlisi", tur: "Dala hovli",
   sotilgan: "02-may, 2026", yil: "2026", xaridor: "Alimov Sardor",
   summa: 980.0, ish: "UI-2022/0034", qabul: "20-avg, 2024", nazorat: "21 oy", rasm: "assets/bino_dacha.webp"},
  {kod: "GR-2023/0156", nom: "Olmazor savdo do'koni", tur: "Savdo maydoni",
   sotilgan: "20-apr, 2026", yil: "2026", xaridor: "«Turon Retail» MChJ",
   summa: 1150.0, ish: "UI-2023/0156", qabul: "03-iyl, 2025", nazorat: "9 oy", rasm: "assets/bino_mall.webp"},
  {kod: "GR-2022/0077", nom: "Bektemir ombori", tur: "Ombor",
   sotilgan: "11-dek, 2025", yil: "2025", xaridor: "«Sifat Qurilish» MChJ",
   summa: 3350.0, ish: "UI-2022/0077", qabul: "28-fev, 2025", nazorat: "10 oy", rasm: "assets/bino_9.webp"},
  {kod: "GR-2021/0203", nom: "Chilonzor ofis binosi", tur: "Ofis binosi",
   sotilgan: "30-okt, 2025", yil: "2025", xaridor: "«Humo Trade» MChJ",
   summa: 2780.0, ish: "UI-2021/0203", qabul: "15-yan, 2025", nazorat: "9 oy", rasm: "assets/bino_humo.webp"},
  {kod: "GR-2023/0119", nom: "Zangiota yer uchastkasi", tur: "Yer uchastkasi",
   sotilgan: "14-iyl, 2025", yil: "2025", xaridor: "«Agrotex Invest» MChJ",
   summa: 760.0, ish: "UI-2023/0119", qabul: "09-sen, 2024", nazorat: "10 oy", rasm: "assets/bino_yer.webp"}
];


/* ---------- Obyekt reyestri: nom faqat shu yerdan olinadi (Д-1) ----------
   Ikkilamchi ro'yxatlar — qurilmalar, hodisalar, hujjatlar, vazifalar,
   kirish voqealari va boshqalar — obyektga MATN bilan emas, IDENTIFIKATOR
   bilan murojaat qiladi. Ko'rsatiladigan to'liq va qisqa nomlar shu yerda
   hosil bo'ladi, shuning uchun bitta obyekt nomi ikki sahifada ajralib
   keta olmaydi. Ilgari shunday ajralish bor edi: "Zarafshon Tekstil sexi"
   (hodisalar) va "Zarafshon Tekstil ishlab chiqarish sexi" (reyestr). */
const OBYEKT_INDEKS = {};
function reyestrgaQosh(o){
  OBYEKT_INDEKS[o.id] = {
    id: o.id, nom: o.nom, qisqa: o.qisqa || o.nom, tur: o.tur,
    hudud: o.hudud || "", hududToliq: o.hududToliq || o.hudud || "",
    rasm: o.rasm || "", manba: o.manba
  };
}
YOZUVLAR.forEach(y => reyestrgaQosh(Object.assign({}, y.garov, {id: y.id, manba: "faol"})));
SOTUV.forEach(l => reyestrgaQosh(Object.assign({}, l, {manba: "sotuv"})));
ARXIV.forEach(a => reyestrgaQosh(Object.assign({}, a, {id: a.kod, manba: "arxiv"})));

/* Obyekt joylashuvi — hudud nomi ham yagona manbadan (Д-1). */
function obyektHududi(id, toliqmi){
  const o = OBYEKT_INDEKS[id];
  if (!o) return "?" + id;
  return toliqmi ? o.hududToliq : o.hudud;
}

/* Obyektni identifikator bo'yicha topish. Topilmasa null — chaqiruvchi
   jimgina noto'g'ri matn chiqarmasligi uchun moslikTekshiruvi() buni ushlaydi. */
function obyekt(id){ return OBYEKT_INDEKS[id] || null; }

/* Ko'rsatish uchun nom. qisqami=true — ro'yxatlar va chiplar uchun qisqa shakl. */
function obyektNomi(id, qisqami){
  const o = OBYEKT_INDEKS[id];
  if (!o) return "?" + id;                 // ko'rinadigan belgi: havola uzilgan
  return qisqami ? o.qisqa : o.nom;
}

/* Obyekt ichidagi joy: "Navruz Plaza, 1-qavat".
   Obyekt nomi reyestrdan, ichki joy — yozuvning o'zidan. */
function joyNomi(id, ichki, ajratgich){
  const q = obyektNomi(id, true);
  return ichki ? q + (ajratgich || ", ") + ichki : q;
}


/* ---------- Hodisalar (Garov 1:N Hodisa, ТЗ 3.2) ----------
   Yozuvda obyekt nomi va hududi SAQLANMAYDI — faqat obyektId. Ko'rinadigan
   sarlavha, bino nomi va hudud reyestrdan hosil qilinadi, shuning uchun
   obyekt nomi o'zgarsa hamma sahifada bir vaqtda o'zgaradi. */
const HODISALAR = [
  {kod:"#GH-2026-00214", obyektId:"GR-2026/0141", rang:"#E0442B",
   hodisa:"yerto'lani suv bosishi — shikast", vaqt:"Bugun, 14:12", jiddiylik:"yuqori", ustun:"yangi", holat:"Yangi",
   tavsif:"Nazorat ko'rigida yerto'lada suv sathi ko'tarilgani aniqlandi. Poydevorga ta'sir baholanmoqda; sug'urta kompaniyasiga xabarnoma tayyorlanmoqda.",
   masul:"Karimova F.", bolim:"Garov ta'minoti bo'limi", fayl:"korik_dalolatnoma.pdf", hajm:"1.2 MB"},
  {kod:"#GH-2026-00213", obyektId:"GR-2025/1187", rang:"#14836F",
   hodisa:"uskunalar ro'yxatida kamomad", vaqt:"Bugun, 12:52", jiddiylik:"yuqori", ustun:"yangi", holat:"Yangi",
   tavsif:"Choraklik ko'rikda garov ro'yxatidagi 2 ta to'quv dastgohi joyida yo'qligi aniqlandi. Qarzdordan yozma tushuntirish talab qilindi.",
   masul:"Sattorov J.", bolim:"Garov ta'minoti bo'limi", fayl:"royxat_solishtirma.pdf", hajm:"640 KB"},
  {kod:"#GH-2026-00211", obyektId:"GR-2025/0934", rang:"#F2994A",
   hodisa:"sug'urta polisi muddati o'tdi", vaqt:"Bugun, 13:48", jiddiylik:"orta", ustun:"tekshirilmoqda", holat:"Tekshirilmoqda",
   tavsif:"PL-2025/08127 polisi 11-avgustda tugagan, uzaytirish rasmiylashtirilmagan. Auksion bosqichidagi obyekt sug'urtasiz qolgan.",
   masul:"Qodirova N.", bolim:"Muammoli kreditlar boshqarmasi", fayl:"polis_nusxa.pdf", hajm:"920 KB"},
  {kod:"#GH-2026-00209", obyektId:"GR-2026/5512", rang:"#8B5CF6",
   hodisa:"qiymatning jadal pasayishi", vaqt:"Bugun, 12:33", jiddiylik:"orta", ustun:"tekshirilmoqda", holat:"Tekshirilmoqda",
   tavsif:"Qayta baholashda qiymat 13% ga pasaygan (214 dan 186 mln gacha). Bozor tahlili so'raldi; zaxira stavkasiga ta'siri hisoblanmoqda.",
   masul:"Xolmatova Z.", bolim:"Tavakkalchiliklarni boshqarish departamenti", fayl:"baholash_hisobot.pdf", hajm:"480 KB"},
  {kod:"#GH-2026-00206", obyektId:"GR-2026/3308", rang:"#F2C230",
   hodisa:"ruxsatsiz ijaraga berish holati", vaqt:"Bugun, 11:05", jiddiylik:"orta", ustun:"tekshirilmoqda", holat:"Tekshirilmoqda",
   tavsif:"Ko'rikda xonadonda ijarachi yashayotgani aniqlandi. Garov shartnomasi bank roziligisiz ijaraga berishni taqiqlaydi. Yuristga yo'naltirildi.",
   masul:"Rahimov B.", bolim:"Yuridik departament", fayl:"korik_bayonnoma.pdf", hajm:"350 KB"},
  {kod:"#GH-2026-00204", obyektId:"GR-2026/4471", rang:"#F2C230",
   hodisa:"kommunal qarzdorlik aniqlandi", vaqt:"Bugun, 13:17", jiddiylik:"past", ustun:"bartaraf", holat:"Bartaraf etilmoqda",
   tavsif:"Xonadon bo'yicha 4,2 mln so'm kommunal qarz to'plangan. Realizatsiyada xaridorga o'tmasligi uchun hujjatlar tartibga keltirilmoqda.",
   masul:"Qodirova N.", bolim:"Muammoli kreditlar boshqarmasi", fayl:"kommunal_malumotnoma.pdf", hajm:"1.1 MB"},
  {kod:"#GH-2026-00201", obyektId:"GR-2025/0755", rang:"#14836F",
   hodisa:"chegara belgisi buzilgan", vaqt:"Bugun, 10:11", jiddiylik:"past", ustun:"bartaraf", holat:"Bartaraf etilmoqda",
   tavsif:"G'arbiy chegaradagi 2 ta belgi surilgan. Kadastr muhandisi chaqirildi, qo'shni uchastka egasi bilan dalolatnoma tuzilmoqda.",
   masul:"Sattorov J.", bolim:"Garov ta'minoti bo'limi", fayl:"kadastr_akt.pdf", hajm:"210 KB"},
  {kod:"#GH-2026-00198", obyektId:"GR-2026/3308", rang:"#2E9E52",
   hodisa:"sug'urta polisi uzaytirildi", vaqt:"Kecha, 18:23", jiddiylik:"past", ustun:"yopildi", holat:"Yopildi",
   tavsif:"PL-2026/10578 polisi bo'yicha uzaytirish rasmiylashtirildi, yangi muddat 08.10.2027 gacha. Nusxa ishga biriktirildi.",
   masul:"Qodirova N.", bolim:"Muammoli kreditlar boshqarmasi", fayl:"polis_yangi.pdf", hajm:"380 KB"},
  {kod:"#GH-2026-00196", obyektId:"GR-2025/0934", rang:"#2E9E52",
   hodisa:"auksion oldi ko'rigi yakunlandi", vaqt:"Kecha, 17:42", jiddiylik:"past", ustun:"yopildi", holat:"Yopildi",
   tavsif:"Holat qayd etildi, fotojamlanma va dalolatnoma savdo hujjatlariga kiritildi. E'lon matni uchun ma'lumotlar tayyor.",
   masul:"Karimova F.", bolim:"Garov ta'minoti bo'limi", fayl:"fotojamlanma.zip", hajm:"290 KB"},
  {kod:"#GH-2026-00195", obyektId:"GR-2026/2210", rang:"#2E9E52",
   hodisa:"qarzdor bilan ko'rik o'tkazildi", vaqt:"Kecha, 16:08", jiddiylik:"past", ustun:"yopildi", holat:"Yopildi",
   tavsif:"Rejali ko'rik qarzdor ishtirokida o'tdi, dalolatnoma ikki tomonlama imzolandi. Holat qoniqarli, keyingi ko'rik 3 oydan keyin.",
   masul:"Sattorov J.", bolim:"Garov ta'minoti bo'limi", fayl:"dalolatnoma.pdf", hajm:"175 KB"}
];

HODISALAR.forEach(h => {
  h.bino     = obyektNomi(h.obyektId, true);
  h.joy      = obyektHududi(h.obyektId, true);
  h.sarlavha = h.bino + " — " + h.hodisa;
});


/* ---------- Qurilmalar (Garov 1:N Qurilma, ТЗ 3.2) ----------
   joyIchi — obyekt ICHIDAGI joy ("1-qavat", "Lobby"). Obyekt nomi bu yerda
   saqlanmaydi: ko'rinadigan `joy` reyestrdagi qisqa nom bilan birlashtiriladi. */


/* ---------- Hujjatlar (Garov 1:N Hujjat, ТЗ 3.2) ---------- */
const HUJJATLAR = [
  {nom:"Texnik pasport.pdf", ikon:"pdf", iturl:"i-hujjat", obyektId:"GR-2025/0934", tur:"Texnik pasport", teg:"pasport",
   sana:"24-may, 2024", holat:"Tasdiqlangan", hrang:"#2E9E52", id:"DOC-2024-001", hajm:"12.4 MB", format:"PDF", rasm:"assets/bino_tower.webp",
   yuklagan:"Ismoilov Otabek", tavsif:"Bino bo'yicha texnik ma'lumotlar va umumiy tavsif."},
  {nom:"Kadastr reja.dwg", ikon:"dwg", iturl:"i-xarita", obyektId:"GR-2026/0141", tur:"Kadastr", teg:"kadastr",
   sana:"21-may, 2024", holat:"Tasdiqlangan", hrang:"#2E9E52", id:"DOC-2024-014", hajm:"8.1 MB", format:"DWG", rasm:"assets/bino_dacha.webp",
   yuklagan:"Rahimov S.", tavsif:"Yer uchastkasining kadastr chizmasi."},
  {nom:"Ijara shartnomasi.pdf", ikon:"doc", iturl:"i-shartnoma", obyektId:"GR-2024/0512", tur:"Shartnoma", teg:"shartnoma",
   sana:"18-may, 2024", holat:"Tasdiqlangan", hrang:"#2E9E52", id:"DOC-2024-022", hajm:"2.7 MB", format:"PDF", rasm:"assets/bino_mall.webp",
   yuklagan:"Karimova N.", tavsif:"«Turon Retail» MChJ bilan ijara shartnomasi."},
  {nom:"Fasad ko'rinishi.jpg", ikon:"img", iturl:"i-kamera", obyektId:"GR-2025/1187", tur:"Rasm", teg:"rasm",
   sana:"16-may, 2024", holat:"Yangi", hrang:"#2E9E52", id:"DOC-2024-031", hajm:"5.4 MB", format:"JPG", rasm:"assets/bino_humo.webp",
   yuklagan:"Soliev B.", tavsif:"Bino fasadining yangilangan surati."},
  {nom:"Baholash hisobot.pdf", ikon:"rep", iturl:"i-hisobot", obyektId:"GR-2026/3308", tur:"Hisobot", teg:"hisobot",
   sana:"14-may, 2024", holat:"Tasdiqlangan", hrang:"#2E9E52", id:"DOC-2024-036", hajm:"4.2 MB", format:"PDF", rasm:"assets/bino_turar.webp",
   yuklagan:"Yusupova M.", tavsif:"Mustaqil baholovchi hisoboti."},
  {nom:"Yer uchastkasi rejasi.pdf", ikon:"pdf", iturl:"i-yer", obyektId:"GR-2025/0755", tur:"Kadastr", teg:"kadastr",
   sana:"12-may, 2024", holat:"Ko'rib chiqilmoqda", hrang:"#4A90F2", id:"DOC-2024-040", hajm:"3.3 MB", format:"PDF", rasm:"assets/bino_yer.webp",
   yuklagan:"Rahimov S.", tavsif:"Yer uchastkasining chegara rejasi."},
  {nom:"Qabul-topshirish dalolatnomasi.pdf", ikon:"doc", iturl:"i-shartnoma", obyektId:"GR-2025/0934", tur:"Shartnoma", teg:"shartnoma",
   sana:"10-may, 2024", holat:"Tasdiqlangan", hrang:"#2E9E52", id:"DOC-2024-044", hajm:"1.6 MB", format:"PDF", rasm:"assets/bino_tower.webp",
   yuklagan:"Ismoilov Otabek", tavsif:"5-qavat ofis maydonini topshirish dalolatnomasi."},
  {nom:"Energiya audit hisobot.pdf", ikon:"pdf", iturl:"i-energiya", obyektId:"GR-2026/0141", tur:"Hisobot", teg:"hisobot",
   sana:"07-may, 2024", holat:"Tasdiqlangan", hrang:"#2E9E52", id:"DOC-2024-051", hajm:"6.8 MB", format:"PDF", rasm:"assets/bino_dacha.webp",
   yuklagan:"Karimov I.", tavsif:"Yillik energiya samaradorligi auditi."}
];
HUJJATLAR.forEach(h => {
  h.obyekt = obyektNomi(h.obyektId, true);
  h.kod    = h.obyektId;          // ilgari alohida saqlanardi — endi hosila (Д-1)
});

/* ---------- Xonalar: Navruz Plaza binosining ichki bo'linmalari ----------
   Xona obyekt EMAS — u obyekt ichidagi joy, shuning uchun obyektId bilan
   bog'lanadi va bino nomi reyestrdan olinadi. */
const XONALAR = [
  {nom:"Savdo maydoni", obyektId:"GR-2025/0934", qavat:"3", maydon:"412 m²", rasm:"assets/xona_savdo.webp",
   tur:"Asosiy garov predmeti", ulush:62, holat:"Garov predmeti",
   kadastr:"10:02:11:04:0934/003", huquq:"Mulk huquqi, cheklov: bank garovi",
   jihozlar:"Savdo pavilonlari demontaj qilinmagan, muhandislik tarmoqlari ishga yaroqli"},
  {nom:"Ofis qismi 301", obyektId:"GR-2025/0934", qavat:"3", maydon:"86 m²", rasm:"assets/xona_ofis.webp",
   tur:"Yordamchi maydon", ulush:14, holat:"Garov predmeti",
   kadastr:"10:02:11:04:0934/004", huquq:"Mulk huquqi, cheklov: bank garovi",
   jihozlar:"Ish stollari va ofis jihozlari garov ro'yxatiga kirmaydi"},
  {nom:"Konferensiya zali", obyektId:"GR-2025/0934", qavat:"3", maydon:"64 m²", rasm:"assets/xona_konf.webp",
   tur:"Yordamchi maydon", ulush:11, holat:"Garov predmeti",
   kadastr:"10:02:11:04:0934/005", huquq:"Mulk huquqi, cheklov: bank garovi",
   jihozlar:"Multimedia jihozlari qarzdorda qoladi, dalolatnomada qayd etilgan"},
  {nom:"Arxiv xonasi", obyektId:"GR-2025/0934", qavat:"-1", maydon:"28 m²", rasm:"assets/xona_arxiv.webp",
   tur:"Texnik maydon", ulush:5, holat:"Garov predmeti",
   kadastr:"10:02:11:04:0934/006", huquq:"Mulk huquqi, cheklov: bank garovi",
   jihozlar:"Namlik nazorati talab qilinadi — so'nggi ko'rikda qayd etilgan"},
  {nom:"Texnik xona", obyektId:"GR-2025/0934", qavat:"-1", maydon:"46 m²", rasm:"assets/xona_server.webp",
   tur:"Texnik maydon", ulush:8, holat:"Garov predmeti",
   kadastr:"10:02:11:04:0934/007", huquq:"Mulk huquqi, cheklov: bank garovi",
   jihozlar:"Isitish qozoni va ventilyatsiya — binoning ajralmas qismi sifatida garovda"}
];

XONALAR.forEach(x => { x.bino = obyektNomi(x.obyektId, true); });


/* ---------- Garov nazorati tadbirlari ----------
   Bank garovni QO'RIQLAMAYDI — mavjudligi va holatini NAZORAT qiladi:
   davriy ko'rik, sug'urta amal qilishi, baholash dolzarbligi. Uchala
   ro'yxat obyektga identifikator bilan bog'lanadi (Д-8). */

/* Ko'riklar: rejali va navbatdan tashqari chiqishlar */
const KORIKLAR = [
  {id: "KO-2026/0412", obyektId: "GR-2025/1187", tur: "Rejali",
   sana: "26-avg, 2026", holat: "rejada", inspektor: "Sattorov Jasur",
   izoh: "Choraklik ko'rik. Sex uskunalari ro'yxati bilan solishtiriladi."},
  {id: "KO-2026/0405", obyektId: "GR-2026/4471", tur: "Rejali",
   sana: "28-avg, 2026", holat: "rejada", inspektor: "Sattorov Jasur",
   izoh: "MIB ijrosi oldidan holatni qayd etish."},
  {id: "KO-2026/0398", obyektId: "GR-2026/0141", tur: "Navbatdan tashqari",
   sana: "22-avg, 2026", holat: "muddati_otgan", inspektor: "Karimova Feruza",
   izoh: "Suv bosishi hodisasidan keyingi nazorat ko'rigi. Chiqish amalga oshmadi."},
  {id: "KO-2026/0391", obyektId: "GR-2025/0934", tur: "Rejali",
   sana: "18-avg, 2026", holat: "otkazildi", inspektor: "Karimova Feruza",
   ball: 84, xulosa: "Qoniqarli. Savdo maydoni ishlamayapti, kommunikatsiyalar saqlangan.",
   izoh: "Auksion oldidan holat qayd etildi, fotojamlanma biriktirildi."},
  {id: "KO-2026/0383", obyektId: "GR-2025/0755", tur: "Rejali",
   sana: "12-avg, 2026", holat: "otkazildi", inspektor: "Sattorov Jasur",
   ball: 91, xulosa: "Chegara belgilari joyida, ekin maydoni ishlov berilmagan.",
   izoh: "Kadastr chegaralari GPS bo'yicha tekshirildi."},
  {id: "KO-2026/0377", obyektId: "GR-2026/5512", tur: "Rejali",
   sana: "08-avg, 2026", holat: "otkazildi", inspektor: "Karimova Feruza",
   ball: 88, xulosa: "Saqlash maydonchasida, texnik holati o'zgarmagan.",
   izoh: "Yurgizib ko'rildi, kilometraj qayd etildi: 42 180 km."},
  {id: "KO-2026/0369", obyektId: "GR-2026/3308", tur: "Rejali",
   sana: "04-avg, 2026", holat: "otkazildi", inspektor: "Sattorov Jasur",
   ball: 76, xulosa: "B blok fasadida namlik izlari. Sug'urta hodisasi emas.",
   izoh: "Keyingi ko'rikda qayta tekshirish belgilandi."},
  {id: "KO-2026/0362", obyektId: "GR-2026/2210", tur: "Rejali",
   sana: "29-iyl, 2026", holat: "otkazildi", inspektor: "Karimova Feruza",
   ball: 93, xulosa: "Xonadon yashash holatida, ta'mir talab qilinmaydi.",
   izoh: "Qarzdor bilan birga ko'rildi, dalolatnoma imzolatildi."},
  {id: "KO-2026/0341", obyektId: "GR-2025/1187", tur: "Rejali",
   sana: "15-iyl, 2026", holat: "otkazildi", inspektor: "Sattorov Jasur",
   ball: 79, xulosa: "Uskunalar ro'yxati mos, sex tomida mahalliy ta'mir talabi.",
   izoh: "Tom qoplamasi bo'yicha kuzatuv keyingi ko'rikka qoldirildi."},
  {id: "KO-2026/0322", obyektId: "GR-2026/4471", tur: "Rejali",
   sana: "02-iyl, 2026", holat: "otkazildi", inspektor: "Karimova Feruza",
   ball: 85, xulosa: "Xonadon holati qoniqarli, kommunal to'lovlarda qarz belgisi.",
   izoh: "Kommunal ma'lumotnoma so'raldi — keyinchalik hodisa ochildi."},
  {id: "KO-2026/0304", obyektId: "GR-2026/0141", tur: "Rejali",
   sana: "18-iyn, 2026", holat: "otkazildi", inspektor: "Sattorov Jasur",
   ball: 82, xulosa: "Hovli qarovli, drenaj tizimi tozalash talab qiladi.",
   izoh: "Drenaj bo'yicha ogohlantirish keyinroq tasdiqlandi — suv bosishi."},
  {id: "KO-2026/0287", obyektId: "GR-2025/0934", tur: "Navbatdan tashqari",
   sana: "05-iyn, 2026", holat: "otkazildi", inspektor: "Karimova Feruza",
   ball: 87, xulosa: "Musodara qabulidan keyingi birinchi ko'rik, plombalar joyida.",
   izoh: "Balansga qabul dalolatnomasiga foto ilova qilindi."},
  {id: "KO-2026/0263", obyektId: "GR-2026/5512", tur: "Rejali",
   sana: "12-may, 2026", holat: "otkazildi", inspektor: "Sattorov Jasur",
   ball: 90, xulosa: "Texnik holat yaxshi, akkumulyator zaryadi nazoratda.",
   izoh: "Oylik yurgizish reglament bo'yicha bajarildi."}
];
KORIKLAR.forEach(k => {
  k.obyekt = obyektNomi(k.obyektId, true);
  k.hudud  = obyektHududi(k.obyektId, false);
});

/* Sug'urta polislari: amal qilish nazorati */
const SUGURTALAR = [
  {obyektId: "GR-2026/4471", polis: "PL-2026/11842", kompaniya: "O'zbekinvest",
   summa: 520.0,  tugash: "14-yan, 2027", holat: "amalda"},
  {obyektId: "GR-2025/1187", polis: "PL-2025/09315", kompaniya: "Gross Insurance",
   summa: 4100.0, tugash: "19-sen, 2026", holat: "tugaydi"},
  {obyektId: "GR-2026/2210", polis: "PL-2026/12073", kompaniya: "O'zbekinvest",
   summa: 340.0,  tugash: "03-mar, 2027", holat: "amalda"},
  {obyektId: "GR-2025/0934", polis: "PL-2025/08127", kompaniya: "Alfa Invest",
   summa: 1480.0, tugash: "11-avg, 2026", holat: "muddati_otgan"},
  {obyektId: "GR-2026/5512", polis: "PL-2026/13964", kompaniya: "Kafolat",
   summa: 186.0,  tugash: "27-may, 2027", holat: "amalda"},
  {obyektId: "GR-2026/3308", polis: "PL-2026/10578", kompaniya: "Gross Insurance",
   summa: 395.0,  tugash: "08-okt, 2026", holat: "tugaydi"},
  {obyektId: "GR-2025/0755", polis: "—", kompaniya: "—",
   summa: 0, tugash: "—", holat: "yoq"},
  {obyektId: "GR-2026/0141", polis: "PL-2026/09842", kompaniya: "O'zbekinvest",
   summa: 62.0, tugash: "16-dek, 2026", holat: "amalda"}
];
SUGURTALAR.forEach(g => { g.obyekt = obyektNomi(g.obyektId, true); });

/* Baholash tarixi: qiymat dolzarbligi nazorati */
const BAHOLASHLAR = [
  {obyektId: "GR-2025/1187", sana: "02.06.2026", qiymat: 4150.0, avvalgi: 4390.0,
   baholovchi: "«Baholash Servis» MChJ", usul: "Daromad yondashuvi", keyingi: "02.06.2027", holat: "dolzarb"},
  {obyektId: "GR-2026/4471", sana: "18.02.2026", qiymat: 520.0, avvalgi: 505.0,
   baholovchi: "«Expert Baho» MChJ", usul: "Qiyosiy yondashuv", keyingi: "18.02.2027", holat: "dolzarb"},
  {obyektId: "GR-2025/0934", sana: "25.03.2026", qiymat: 1480.0, avvalgi: 1520.0,
   baholovchi: "«Baholash Servis» MChJ", usul: "Qiyosiy yondashuv", keyingi: "25.09.2026", holat: "tugaydi"},
  {obyektId: "GR-2026/2210", sana: "09.01.2026", qiymat: 340.0, avvalgi: 328.0,
   baholovchi: "«Andoza Baho» MChJ", usul: "Qiyosiy yondashuv", keyingi: "09.01.2027", holat: "dolzarb"},
  {obyektId: "GR-2026/5512", sana: "14.11.2025", qiymat: 186.0, avvalgi: 214.0,
   baholovchi: "«Expert Baho» MChJ", usul: "Qiyosiy yondashuv", keyingi: "14.05.2026", holat: "eskirgan"},
  {obyektId: "GR-2026/3308", sana: "21.04.2026", qiymat: 395.0, avvalgi: 380.0,
   baholovchi: "«Baholash Servis» MChJ", usul: "Xarajat yondashuvi", keyingi: "21.04.2027", holat: "dolzarb"},
  {obyektId: "GR-2025/0755", sana: "30.10.2025", qiymat: 890.0, avvalgi: 915.0,
   baholovchi: "«Andoza Baho» MChJ", usul: "Qiyosiy yondashuv", keyingi: "30.04.2026", holat: "eskirgan"},
  {obyektId: "GR-2026/0141", sana: "12.05.2026", qiymat: 155.0, avvalgi: 148.0,
   baholovchi: "«Expert Baho» MChJ", usul: "Qiyosiy yondashuv", keyingi: "12.05.2027", holat: "dolzarb"}
];
BAHOLASHLAR.forEach(b => { b.obyekt = obyektNomi(b.obyektId, true); });

/* ---------- Tasdiqlar: kelishuv so'rovlari ----------
   joyIchi bo'lsa — obyekt ichidagi joy, aks holda bank ofisi (reyestrda yo'q). */
const TASDIQLAR = [
  {ikon:"i-kamera", tile:"yashil", sarlavha:"Masofaviy ko'rik sessiyasini tasdiqlash", org:"Navruz Plaza", sub:"Navruz Plaza &nbsp;·&nbsp; GR-2025/0934",
   vaqt:"Bugun, 14:20", j:"yuqori", jm:"Yuqori", tavsif:"Investor bilan masofaviy ko'rik sessiyasini o'tkazish uchun ruxsat so'ralmoqda.",
   sorovchi:"Javlon Karimov", lavozim:"Garov obyektlari direktori", obyektId:"GR-2025/0934", joyIchi:"1201-xona", ishtirokchilar:"3 nafar", sessiyaTuri:"Video konferensiya",
   qoshimcha:"Investor: Global Invest Ltd.", hujjatNomi:"Session_Request_GreenTower.pdf", hujjatHajmi:"1.2 MB",
   sorovSana:"24-may, 2025 &nbsp;·&nbsp; 14:20", javobMuddati:"26-may, 2025 &nbsp;·&nbsp; 15:00", qolgan:"0 soat 28 daqiqa",
   masulNom:"Javlon Karimov", masulLavozim:"Garov obyektlari direktori", masulTel:"+998 90 123-45-67",
   koribNom:"Saida Karimova", koribLavozim:"Yuridik maslahatchi", nusxaNom:"Temur Mirzayev", nusxaLavozim:"CFO"},
  {ikon:"i-kalendar", tile:"sariq", sarlavha:"Budjetni tasdiqlash", org:"Marketing bo'limi", sub:"Marketing bo'limi &nbsp;·&nbsp; BD-2025-114",
   vaqt:"Bugun, 13:45", j:"orta", jm:"O'rta", tavsif:"Marketing bo'limining III chorak byudjeti tasdiqlash uchun yuborildi.",
   sorovchi:"Zarina Yoqubova", lavozim:"Marketing menejeri", joy:"Bosh ofis, Moliya bo'limi", ishtirokchilar:"Byudjet qo'mitasi", sessiyaTuri:"Moliyaviy so'rov",
   qoshimcha:"Umumiy summa: 312 000 000 so'm", hujjatNomi:"Marketing_Byudjet_Q3_2025.xlsx", hujjatHajmi:"890 KB",
   sorovSana:"24-may, 2025 &nbsp;·&nbsp; 13:45", javobMuddati:"27-may, 2025 &nbsp;·&nbsp; 18:00", qolgan:"1 kun 4 soat",
   masulNom:"Zarina Yoqubova", masulLavozim:"Marketing menejeri", masulTel:"+998 90 234-56-78",
   koribNom:"Temur Mirzayev", koribLavozim:"CFO", nusxaNom:"Ismoilov Otabek", nusxaLavozim:"Administrator"},
  {ikon:"i-shartnoma", tile:"binafsha", sarlavha:"Shartnomani tasdiqlash", org:"SecurTech Servis MChJ", sub:"SecurTech Servis MChJ &nbsp;·&nbsp; CT-2025-0912",
   vaqt:"Bugun, 12:10", j:"past", jm:"Past", tavsif:"Yangi ijara shartnomasi loyihasi yuridik ko'rikdan o'tdi, yakuniy tasdiq talab etiladi.",
   sorovchi:"Bekzod Yusupov", lavozim:"Bosh auditor", obyektId:"GR-2025/0934", joyIchi:"Yuridik bo'lim", ishtirokchilar:"2 nafar", sessiyaTuri:"Hujjat ko'rigi",
   qoshimcha:"Ijara muddati: 3 yil", hujjatNomi:"Ijara_shartnomasi_TechSolutions.pdf", hujjatHajmi:"2.4 MB",
   sorovSana:"22-may, 2025 &nbsp;·&nbsp; 12:10", javobMuddati:"29-may, 2025 &nbsp;·&nbsp; 17:00", qolgan:"4 kun 5 soat",
   masulNom:"Bekzod Yusupov", masulLavozim:"Bosh auditor", masulTel:"+998 90 345-67-89",
   koribNom:"Saida Karimova", koribLavozim:"Yuridik maslahatchi", nusxaNom:"Javlon Karimov", nusxaLavozim:"Garov obyektlari direktori"},
  {ikon:"i-ogoh", tile:"qizil", sarlavha:"Texnik xarajatni tasdiqlash", org:"Server uskunalari", sub:"IT bo'limi &nbsp;·&nbsp; EX-2025-0334",
   vaqt:"Bugun, 11:05", j:"yuqori", jm:"Yuqori", tavsif:"Server uskunalarini favqulodda almashtirish uchun xarajat tasdiqlanishi kerak.",
   sorovchi:"Shahzod Abdullaev", lavozim:"Texnik muhandis", obyektId:"GR-2025/0934", joyIchi:"Texnik xona", ishtirokchilar:"1 nafar", sessiyaTuri:"Favqulodda so'rov",
   qoshimcha:"Summa: 48 500 000 so'm", hujjatNomi:"Server_almashtirish_smeta.pdf", hujjatHajmi:"640 KB",
   sorovSana:"24-may, 2025 &nbsp;·&nbsp; 11:05", javobMuddati:"25-may, 2025 &nbsp;·&nbsp; 09:00", qolgan:"0 soat 55 daqiqa",
   masulNom:"Shahzod Abdullaev", masulLavozim:"Texnik muhandis", masulTel:"+998 90 456-78-90",
   koribNom:"Temur Mirzayev", koribLavozim:"CFO", nusxaNom:"Ismoilov Otabek", nusxaLavozim:"Administrator"}
];
TASDIQLAR.forEach(t => { if (t.obyektId) t.joy = joyNomi(t.obyektId, t.joyIchi); });

/* ---------- Yer uchastkalari ----------
   kod reyestrdagi obyektga to'g'ri kelsa — status ish bosqichidan olinadi (Д-2). */
const UCHASTKALAR = [
  {kod:"GR-2025/0755", tuman:"Qibray tumani", viloyat:"Toshkent viloyati", maydon:"2.40 gektar", status:"Musodara jarayonida", srang:"#E8763C", narx:"42,5 ming so'm/m²",
   kadastr:"11:09:03:02:0012", yerturi:"Qishloq xo'jaligi yerlari", jami:"1 020 000 000 so'm"},
  {kod:"GR-2024/0331", tuman:"Zangiota tumani", viloyat:"Toshkent viloyati", maydon:"8.75 gektar", status:"Nazoratda", srang:"#2E9E52", narx:"180 ming so'm/m²",
   kadastr:"11:07:12:01:0044", yerturi:"Zaxira yerlar", jami:"15 750 000 000 so'm"},
  {kod:"GR-2024/0197", tuman:"Yuqorichirchiq tumani", viloyat:"Toshkent viloyati", maydon:"15.20 gektar", status:"Auksionda", srang:"#8B5CF6", narx:"260 ming so'm/m²",
   kadastr:"11:12:05:03:0090", yerturi:"Qurilish yerlari", jami:"39 520 000 000 so'm"},
  {kod:"GR-2024/0640", tuman:"Ohangaron tumani", viloyat:"Toshkent viloyati", maydon:"23.10 gektar", status:"Garovda", srang:"#7BAEFC", narx:"160 ming so'm/m²",
   kadastr:"11:04:08:02:0110", yerturi:"Qishloq xo'jaligi yerlari", jami:"36 960 000 000 so'm"},
  {kod:"GR-2025/0288", tuman:"Parkent tumani", viloyat:"Toshkent viloyati", maydon:"5.60 gektar", status:"Garovda", srang:"#7BAEFC", narx:"150 ming so'm/m²",
   kadastr:"11:09:01:07:0021", yerturi:"Zaxira yerlar", jami:"8 400 000 000 so'm"},
  {kod:"GR-2024/0072", tuman:"Bekobod tumani", viloyat:"Toshkent viloyati", maydon:"10.00 gektar", status:"Nazoratda", srang:"#2E9E52", narx:"290 ming so'm/m²",
   kadastr:"11:02:11:04:0067", yerturi:"Sanoat yerlari", jami:"29 000 000 000 so'm"}
];
UCHASTKALAR.forEach(u => {
  const y = YOZUVLAR.find(z => z.id === u.kod);
  if (y) { u.status = y.holat.nom; u.srang = y.holat.rang; }
});

/* ---------- Vazifalar navbati va shaxsiy vazifalar ---------- */
const NAVBAT = [
  {nom:"Xarid so'rovnomasi", kod:"№ PR-2024-0568", summa:"125 000 000 so'm", firma:'"Navruz Plaza" MCHJ', muddat:"Bugun", soat:"14:30", shosh:true, faol:true,
   izoh:"Moliyaviy limit doirasida. Tasdiqlash uchun yuborildi.",
   qadamlar:[
     ["bajarildi","Boshlang'ich so'rov","Shohruh Umurzakov","24-may, 09:15","Tasdiqlandi"],
     ["joriy","Moliyaviy nazorat","Malika Saidova","","Kutilmoqda"],
     ["kutish","Yuridik ko'rib chiqish","Javlonbek Karimov","","Kutilmoqda"],
     ["kutish","Yakuniy tasdiq","Ismoilov Otabek","","Kutilmoqda"]],
   tarix:[
     ["24-may, 09:15","Shohruh Umurzakov","Boshlang'ich so'rov yopildi va tasdiqlash jarayoniga yuborildi."],
     ["24-may, 10:02","Tizim","Keyingi bosqich: Moliyaviy nazorat (Malika Saidova)"]],
   malumot:{turi:"Xarid so'rovnomasi", byudjet:"Kapital xarajatlar", obyekt:'"Navruz Plaza" MCHJ', yetkazib:"Climate Pro MCHJ", muddatIsh:"10 ish kuni"}},

  {nom:"Shartnoma tasdig'i", kod:"№ CT-2024-1187", summa:"85 400 000 so'm", firma:'"Chorsu Savdo Markazi" MCHJ', muddat:"Bugun", soat:"16:00", shosh:true,
   izoh:"Ijara shartnomasi loyihasi. Yuridik bo'lim tekshiruvi kutilmoqda.",
   qadamlar:[
     ["bajarildi","Loyiha tayyorlandi","Nilufar Ismoilova","24-may, 08:40","Tasdiqlandi"],
     ["joriy","Yuridik ko'rib chiqish","Javlonbek Karimov","","Kutilmoqda"],
     ["kutish","Moliyaviy nazorat","Malika Saidova","","Kutilmoqda"],
     ["kutish","Yakuniy imzo","Ismoilov Otabek","","Kutilmoqda"]],
   tarix:[
     ["24-may, 08:40","Nilufar Ismoilova","Shartnoma loyihasi tayyorlandi va yuborildi."],
     ["24-may, 09:50","Tizim","Keyingi bosqich: Yuridik ko'rib chiqish (Javlonbek Karimov)"]],
   malumot:{turi:"Shartnoma tasdig'i", byudjet:"Operatsion xarajatlar", obyekt:'"Chorsu Savdo Markazi" MCHJ', yetkazib:"«Turon Retail» MChJ", muddatIsh:"5 ish kuni"}},

  {nom:"To'lov topshirig'i", kod:"№ PAY-2024-3345", summa:"46 750 000 so'm", firma:'"Nurafshon turar-joy majmuasi" MCHJ', muddat:"25-may", soat:"10:00",
   izoh:"Oylik kommunal xizmatlar to'lovi. Standart jarayon.",
   qadamlar:[
     ["bajarildi","So'rov yaratildi","Saida Rahimova","23-may, 15:20","Tasdiqlandi"],
     ["bajarildi","Moliyaviy nazorat","Malika Saidova","24-may, 11:05","Tasdiqlandi"],
     ["joriy","Yakuniy tasdiq","Ismoilov Otabek","","Kutilmoqda"],
     ["kutish","To'lov amalga oshirish","Xazina bo'limi","","Kutilmoqda"]],
   tarix:[
     ["23-may, 15:20","Saida Rahimova","To'lov topshirig'i yaratildi."],
     ["24-may, 11:05","Malika Saidova","Moliyaviy nazorat o'tdi, yakuniy tasdiqqa yuborildi."]],
   malumot:{turi:"To'lov topshirig'i", byudjet:"Kommunal xarajatlar", obyekt:'"Nurafshon turar-joy majmuasi" MCHJ', yetkazib:"Hududiy elektr tarmoqlari", muddatIsh:"3 ish kuni"}},

  {nom:"Sotuv shartnomasi tasdig'i", kod:"№ SOT-2024-0099", summa:"312 000 000 so'm", firma:'"Industrial Park" MCHJ', muddat:"26-may", soat:"09:30",
   izoh:"Yirik summadagi sotuv bitimi — kengaytirilgan yuridik tekshiruv talab etiladi.",
   qadamlar:[
     ["bajarildi","Boshlang'ich so'rov","Bekzod Yusupov","22-may, 14:00","Tasdiqlandi"],
     ["joriy","Yuridik ko'rib chiqish","Javlonbek Karimov","","Kutilmoqda"],
     ["kutish","Moliyaviy nazorat","Malika Saidova","","Kutilmoqda"],
     ["kutish","Yakuniy tasdiq","Ismoilov Otabek","","Kutilmoqda"]],
   tarix:[
     ["22-may, 14:00","Bekzod Yusupov","Sotuv shartnomasi loyihasi kiritildi."],
     ["23-may, 09:15","Tizim","Keyingi bosqich: Yuridik ko'rib chiqish (Javlonbek Karimov)"]],
   malumot:{turi:"Sotuv shartnomasi tasdig'i", byudjet:"Obyektlarni realizatsiya qilish", obyekt:'"Industrial Park" MCHJ', yetkazib:"Industrial Partners LLC", muddatIsh:"15 ish kuni"}},

  {nom:"Obyektni qabul qilish", kod:"№ AC-2024-2211", summa:"32 500 000 so'm", firma:'"Savdo markazi" MCHJ', muddat:"27-may", soat:"11:00",
   izoh:"Yangi uskuna qabul qilinishi kutilmoqda. Texnik ko'rikdan keyin davom etadi.",
   qadamlar:[
     ["joriy","Boshlang'ich so'rov","Jahongir Otajonov","","Kutilmoqda"],
     ["kutish","Texnik ko'rik","Shahzod Abdullaev","","Kutilmoqda"],
     ["kutish","Moliyaviy nazorat","Malika Saidova","","Kutilmoqda"],
     ["kutish","Yakuniy tasdiq","Ismoilov Otabek","","Kutilmoqda"]],
   tarix:[
     ["25-may, 16:40","Jahongir Otajonov","Obyektni qabul qilish so'rovi yaratildi."]],
   malumot:{turi:"Obyektni qabul qilish", byudjet:"Garov obyektlari hisobga olish", obyekt:'"Savdo markazi" MCHJ', yetkazib:"Tex Import MCHJ", muddatIsh:"7 ish kuni"}}
];
const MENING_VAZIFALARIM = [
  {nom:"Moliyaviy nazorat", tur:"Xarid so'rovnomasi", kod:"№ PR-2024-0568", sana:"Bugun", vaqt:"14:30", bugunmi:true,
   ikon:"i-daromad", muhimlik:"kritik", ijrochi:"Malika Saidova"},
  {nom:"Shartnoma loyihasi", tur:"Ko'rib chiqish", kod:"№ CT-2024-1187", sana:"Bugun", vaqt:"16:00", bugunmi:true,
   ikon:"i-shartnoma", muhimlik:"yuqori", ijrochi:"Javlonbek Karimov"},
  {nom:"To'lov jadvali yangilash", tur:"Hisobot tayyorlash", kod:"№ REP-2024-0091", sana:"25-may", vaqt:"09:00", bugunmi:false,
   ikon:"i-daromad", muhimlik:"orta", ijrochi:"Saida Rahimova"},
  {nom:"Aktiv ma'lumotlarini tekshirish", tur:"Ma'lumotlarni yangilash", kod:"№ AC-2024-2211", sana:"26-may", vaqt:"11:30", bugunmi:false,
   ikon:"i-aktiv", muhimlik:"past", ijrochi:"Jahongir Otajonov"}
];

/* ---------- Bildirishnomalar ---------- */
const BILDIRISHLAR = [
  {ikon:"i-shartnoma", t:"Tasdiqlar", sarlavha:"Yangi xarid so'rovnomasi yaratildi",
   matn:"Navruz Plaza loyihasi uchun yangi xarid so'rovnomasi (№ PR-2024-0568) yaratildi.", vaqt:"14:30", yangi:true, havola:"vazifalar.html"},
  {ikon:"i-vazifa", t:"Tasdiqlar", sarlavha:"Tasdiqlash kutilmoqda",
   matn:'"Chorsu Savdo Markazi" shartnomasi tasdiqlashingizni kutmoqda.', vaqt:"14:10", yangi:true, havola:"vazifalar.html"},
  {ikon:"i-kalendar", t:"Tizim", sarlavha:"Uchrashuv eslatmasi",
   matn:"Texnik ko'rik uchrashuvi rejalashtirilgan.", vaqt:"13:45", yangi:false, havola:"vazifalar.html"},
  {ikon:"i-daromad", t:"Moliya", sarlavha:"To'lov yaqinlashmoqda",
   matn:'"Nurafshon turar-joy majmuasi" uchun to\'lov 25-may sanasida yakunlanadi.', vaqt:"12:20", yangi:false, havola:"shartnomalar.html"},
  {ikon:"i-foyd", t:"Kirish nazorati", sarlavha:"Yangi foydalanuvchi qo'shildi",
   matn:"Javlon Karimov Kirish nazorati tizimiga qo'shildi.", vaqt:"11:30", yangi:false, havola:"foydalanuvchilar.html"},
  {ikon:"i-ogoh", t:"Hodisalar", sarlavha:"Qurilma ogohlantirishi",
   matn:"Turniket №2 offline holatida.", vaqt:"10:05", yangi:false, havola:"garov-monitoringi.html"}
];

/* ---------- Audit jurnali: o'zgarmas yozuv, matn qayta hisoblanmaydi (ТЗ 8) ---------- */
const AUDIT_JURNAL = [
  {vaqt:"24-avg, 14:20", ism:"Sattorov Jasur", rol:"Garov xizmati mutaxassisi", amal:`Hodisani "Bartaraf etilmoqda" ustuniga ko'chirdi`, obyekt:"#GH-2026-00204 \u2014 Yunusobod 12-kvartal, 45-uy (kommunal qarzdorlik)"},
  {vaqt:"24-avg, 13:55", ism:"Karimova Feruza", rol:"Garov xizmati mutaxassisi", amal:"Ko'rik dalolatnomasini rasmiylashtirdi", obyekt:"KO-2026/0391 \u2014 Navruz Plaza"},
  {vaqt:"24-avg, 12:10", ism:"Yo'ldoshev Alisher", rol:"Filial rahbari", amal:"Baholash buyurtmasini tasdiqladi", obyekt:"GR-2026/5512 \u2014 Chevrolet Malibu 2"},
  {vaqt:"24-avg, 11:32", ism:"Ismoilov Otabek", rol:"Administrator", amal:`Foydalanuvchi rolini o'zgartirdi: "Kredit menejeri" \u2192 "Garov xizmati mutaxassisi"`, obyekt:"Nilufar Ismoilova \u00b7 U056789013"},
  {vaqt:"24-avg, 11:04", ism:"Xolmatova Zulfiya", rol:"Tavakkalchilik menejeri", amal:"Tasnif toifasini qayta ko'rib chiqdi", obyekt:"GR-2026/5512 \u2014 Substandart toifasi tasdiqlandi"},
  {vaqt:"24-avg, 10:40", ism:"Nilufar Ismoilova", rol:"Garov xizmati mutaxassisi", amal:"Hujjat yukladi", obyekt:"Baholash hisobot.pdf \u2014 Nurafshon turar-joy majmuasi"},
  {vaqt:"24-avg, 10:15", ism:"Yo'ldoshev Alisher", rol:"Filial rahbari", amal:"Ko'rik rejasini tasdiqladi", obyekt:"2026-yil sentabr oyi rejasi \u2014 12 chiqish"},
  {vaqt:"24-avg, 09:12", ism:"Sattorov Jasur", rol:"Garov xizmati mutaxassisi", amal:"Yangi hodisa qayd etdi", obyekt:"#GH-2026-00213 \u2014 Zarafshon Tekstil sexi (uskunalar kamomadi)"},
  {vaqt:"24-avg, 08:47", ism:"Rahimov Bekzod", rol:"Yurist", amal:"Da'vo arizasi loyihasini biriktirdi", obyekt:"UI-2026/0503 \u2014 GR-2026/0141"},
  {vaqt:"23-avg, 22:48", ism:"Jahongir Otajonov", rol:"Kredit menejeri", amal:"Xato parol bilan kirishga urindi (3 marta)", obyekt:"IP 91.204.239.18"},
  {vaqt:"23-avg, 16:05", ism:"Sattorov Jasur", rol:"Garov xizmati mutaxassisi", amal:"Hisobotni eksport qildi", obyekt:"Monitoring hisoboti \u2014 PDF"},
  {vaqt:"23-avg, 15:30", ism:"Qodirova Nilufar", rol:"Kredit menejeri", amal:"Qarzdor bilan muzokara natijasini kiritdi", obyekt:"GR-2026/2210 \u2014 to'lov jadvali taklifi"},
  {vaqt:"23-avg, 14:12", ism:"Xolmatova Zulfiya", rol:"Tavakkalchilik menejeri", amal:"Zaxira hisobotini shakllantirdi", obyekt:"2026-yil avgust \u2014 tasnif kesimi"},
  {vaqt:"23-avg, 11:26", ism:"Ismoilov Otabek", rol:"Administrator", amal:"Ikki bosqichli autentifikatsiyani majburiy qildi", obyekt:"Ikki bosqichli autentifikatsiya \u2014 Tizim parametrlari"}
];




/* ---------- Foydalanuvchilar, hisobotlar, hududlar, auksion bosqichlari ---------- */
const FOYDLAR = [
  {nom:"Ismoilov Otabek", rol:"Administrator", teg:"admin", bolim:"Axborot texnologiyalari departamenti", faol:true, id:"U056789011", email:"o.ismoilov@mkbank.uz", lavozim:"Tizim ma'muri", tel:"+998 90 123 45 67", sana:"12-yan, 2021"},
  {nom:"Yo'ldoshev Alisher", rol:"Filial rahbari", teg:"filial", bolim:"Yunusobod filiali", faol:true, id:"U056789012", email:"a.yoldoshev@mkbank.uz", lavozim:"Filial boshqaruvchisi", tel:"+998 93 345 67 89", sana:"20-avg, 2021"},
  {nom:"Nilufar Ismoilova", rol:"Garov xizmati mutaxassisi", teg:"garov", bolim:"Garov ta'minoti bo'limi", faol:true, id:"U056789013", email:"n.ismoilova@mkbank.uz", lavozim:"Katta mutaxassis", tel:"+998 91 234 56 78", sana:"03-mar, 2022"},
  {nom:"Qodirova Nilufar", rol:"Kredit menejeri", teg:"kredit", bolim:"Muammoli kreditlar boshqarmasi", faol:true, id:"U056789014", email:"n.qodirova@mkbank.uz", lavozim:"Yetakchi menejer", tel:"+998 99 456 78 90", sana:"17-okt, 2022"},
  {nom:"Sattorov Jasur", rol:"Garov xizmati mutaxassisi", teg:"garov", bolim:"Garov ta'minoti bo'limi", faol:true, id:"U056789015", email:"j.sattorov@mkbank.uz", lavozim:"Inspektor", tel:"+998 94 890 11 22", sana:"11-noy, 2022"},
  {nom:"Rahimov Bekzod", rol:"Yurist", teg:"yurist", bolim:"Yuridik departament", faol:true, id:"U056789016", email:"b.rahimov@mkbank.uz", lavozim:"Da'vo-ariza sektori yuristi", tel:"+998 97 567 89 01", sana:"05-fev, 2023"},
  {nom:"Xolmatova Zulfiya", rol:"Tavakkalchilik menejeri", teg:"tavakkal", bolim:"Tavakkalchiliklarni boshqarish departamenti", faol:true, id:"U056789017", email:"z.xolmatova@mkbank.uz", lavozim:"Bosh mutaxassis", tel:"+998 88 678 90 12", sana:"14-iyl, 2023"},
  {nom:"Jahongir Otajonov", rol:"Kredit menejeri", teg:"kredit", bolim:"Muammoli kreditlar boshqarmasi", faol:false, id:"U056789019", email:"j.otajonov@mkbank.uz", lavozim:"Menejer", tel:"+998 95 890 12 34", sana:"09-dek, 2023"}
];

const HISOBOTLAR = [
  {nom:"Oylik faoliyat hisoboti", sub:"Faoliyat tahlili va ko'rsatkichlar", format:"pdf", sana:"31-may, 2024", soat:"14:30", tur:"Faoliyat tahlili", hajm:"2.4 MB",
   daromad:"12 450 000 000 so'm", daromadD:"+12,4%", xarajat:"4 250 000 000 so'm", xarajatD:"-5,3%", foyda:"8 200 000 000 so'm", foydaD:"+18,7%", indeks:"92 / 100", indeksD:"+6", grafik:[6.1,7.2,6.8,9.4,12.45]},
  {nom:"Obyektlar holati hisoboti", sub:"Garov obyektlari ro'yxati va holati", format:"xlsx", sana:"31-may, 2024", soat:"14:15", tur:"Garov obyektlari tahlili", hajm:"1.8 MB",
   daromad:"9 800 000 000 so'm", daromadD:"+4,1%", xarajat:"3 100 000 000 so'm", xarajatD:"-2,8%", foyda:"6 700 000 000 so'm", foydaD:"+7,9%", indeks:"88 / 100", indeksD:"+3", grafik:[5.4,6.0,6.6,8.1,9.8]},
  {nom:"Ijara va to'lovlar hisoboti", sub:"Ijara tushumlari va to'lov jadvallari", format:"pdf", sana:"31-may, 2024", soat:"13:40", tur:"Moliyaviy", hajm:"2.1 MB",
   daromad:"15 200 000 000 so'm", daromadD:"+9,6%", xarajat:"2 400 000 000 so'm", xarajatD:"-1,2%", foyda:"12 800 000 000 so'm", foydaD:"+11,4%", indeks:"95 / 100", indeksD:"+4", grafik:[9.7,10.5,11.9,13.6,15.2]},
  {nom:"Moliyaviy tahlil hisoboti", sub:"Daromad va xarajatlar tahlili", format:"xlsx", sana:"30-may, 2024", soat:"18:20", tur:"Moliyaviy", hajm:"1.5 MB",
   daromad:"18 900 000 000 so'm", daromadD:"+15,8%", xarajat:"6 750 000 000 so'm", xarajatD:"-8,9%", foyda:"12 150 000 000 so'm", foydaD:"+21,3%", indeks:"90 / 100", indeksD:"+8", grafik:[11.2,13.0,14.8,16.5,18.9]},
  {nom:"Boshqaruv taqdimoti", sub:"Asosiy KPI va tahlillar", format:"pptx", sana:"30-may, 2024", soat:"17:05", tur:"Taqdimot", hajm:"6.2 MB",
   daromad:"14 600 000 000 so'm", daromadD:"+10,2%", xarajat:"4 900 000 000 so'm", xarajatD:"-4,5%", foyda:"9 700 000 000 so'm", foydaD:"+16,1%", indeks:"91 / 100", indeksD:"+5", grafik:[8.3,9.6,10.8,12.9,14.6]},
  {nom:"Xavfsizlik va kirish hisoboti", sub:"Kirish nazorati faoliyati tahlili", format:"pdf", sana:"30-may, 2024", soat:"16:45", tur:"Xavfsizlik", hajm:"1.1 MB",
   daromad:"7 300 000 000 so'm", daromadD:"+3,4%", xarajat:"1 900 000 000 so'm", xarajatD:"-6,1%", foyda:"5 400 000 000 so'm", foydaD:"+9,8%", indeks:"97 / 100", indeksD:"+2", grafik:[4.8,5.5,6.1,6.8,7.3]}
];
const HUDUDLAR = [
  ["Toshkent shahri","302","↑ 8,2%",1],["Toshkent viloyati","244","↑ 6,4%",1],
  ["Samarqand viloyati","128","↑ 7,1%",1],["Farg'ona viloyati","96","↓ 2,3%",0],
  ["Buxoro viloyati","78","↑ 4,8%",1],["Qashqadaryo viloyati","66","↑ 3,2%",1],
  ["Navoiy viloyati","54","↑ 6,0%",1],["Andijon viloyati","62","↑ 1,7%",1],
  ["Namangan viloyati","58","↑ 2,4%",1],["Xorazm viloyati","44","↑ 5,6%",1],
  ["Jizzax viloyati","40","↑ 3,9%",1],["Surxondaryo viloyati","38","↑ 4,1%",1],
  ["Qoraqalpog'iston R.","38","↑ 2,8%",1]
];
const AUKSION_BOSQICH = [
  ["tayyorlanmoqda","Sotuvga tayyorlanmoqda","#F2C230"],
  ["elon","E'lon qilingan","#14836F"],
  ["korik","Ko'rik / Muzokara","#0E6B5C"],
  ["rasmiylashtirish","Rasmiylashtirish","#8B5CF6"]
];

/* ---------- Rejalashtirilgan hisobotlar va KPI asosi ---------- */
const AVTO = [
  ["Oylik boshqaruv hisoboti","Har oy","01-iyun, 2024","09:00","+3"],
  ["Haftalik obyektlar hisoboti","Har hafta","02-iyun, 2024","09:00","+2"],
  ["Kvartalik moliyaviy tahlil","Har kvartal","30-iyun, 2024","10:00","+4"]
];
const KPI_BAZA = [
  {qiymat:12.48, birlik:"mlrd so'm", delta:8.2, manfiy:false},
  {qiymat:2.16,  birlik:"mlrd so'm", delta:5.6, manfiy:false},
  {qiymat:8.93,  birlik:"mlrd so'm", delta:-3.1, manfiy:true},
  {qiymat:3.55,  birlik:"mlrd so'm", delta:12.4, manfiy:false}
];


/* ---------- Xarita nuqtalari: portfelning geo-namoyishi ----------
   8 ta batafsil yozuv haqiqiy koordinatalari bilan (kod!=null — kartochkaga
   bog'lanadi), qolganlari tuman/shahar guruhlari bo'yicha joylashtirilgan.
   Klaster ko'rinishi guruh maydoniga qarab hisoblanadi. */
const XARITA_NUQTALARI = [
  {kod:null, nom:"Yunusobod, garov avtotransporti", tur:"Avtotransport", holat:"Garovda", lat:41.356, lng:69.2838, guruh:"Yunusobod"},
  {kod:null, nom:"Yunusobod, ko'p qavatli uy xonadoni", tur:"Kvartira", holat:"Garovda", lat:41.3719, lng:69.2823, guruh:"Yunusobod"},
  {kod:null, nom:"Yunusobod, 2-xonali xonadon", tur:"Kvartira", holat:"Garovda", lat:41.3818, lng:69.2826, guruh:"Yunusobod"},
  {kod:null, nom:"Yunusobod, dala hovli", tur:"Turar-joy", holat:"Musodara jarayonida", lat:41.3673, lng:69.2704, guruh:"Yunusobod"},
  {kod:null, nom:"Yunusobod, savdo do'koni", tur:"Tijorat", holat:"Musodara jarayonida", lat:41.3599, lng:69.295, guruh:"Yunusobod"},
  {kod:null, nom:"Chilonzor, 2-xonali xonadon", tur:"Kvartira", holat:"Garovda", lat:41.2868, lng:69.1842, guruh:"Chilonzor"},
  {kod:null, nom:"Chilonzor, savdo do'koni", tur:"Tijorat", holat:"Garovda", lat:41.2679, lng:69.2076, guruh:"Chilonzor"},
  {kod:null, nom:"Chilonzor, 3-xonali xonadon", tur:"Kvartira", holat:"Garovda", lat:41.2719, lng:69.2111, guruh:"Chilonzor"},
  {kod:null, nom:"Chilonzor, yer uchastkasi", tur:"Yer uchastkasi", holat:"Musodara jarayonida", lat:41.271, lng:69.2004, guruh:"Chilonzor"},
  {kod:null, nom:"Chilonzor, 3-xonali xonadon", tur:"Kvartira", holat:"Garovda", lat:41.2811, lng:69.2059, guruh:"Chilonzor"},
  {kod:null, nom:"Mirobod, ishlab chiqarish sexi", tur:"Ishlab chiqarish", holat:"Musodara jarayonida", lat:41.2964, lng:69.257, guruh:"Mirobod"},
  {kod:null, nom:"Mirobod, savdo do'koni", tur:"Tijorat", holat:"Nazoratda", lat:41.2714, lng:69.2824, guruh:"Mirobod"},
  {kod:null, nom:"Mirobod, yer uchastkasi", tur:"Yer uchastkasi", holat:"Nazoratda", lat:41.2852, lng:69.2731, guruh:"Mirobod"},
  {kod:null, nom:"Mirobod, yer uchastkasi", tur:"Yer uchastkasi", holat:"Nazoratda", lat:41.2727, lng:69.2738, guruh:"Mirobod"},
  {kod:null, nom:"Yakkasaroy, yer uchastkasi", tur:"Yer uchastkasi", holat:"Garovda", lat:41.3053, lng:69.2386, guruh:"Yakkasaroy"},
  {kod:null, nom:"Yakkasaroy, garov avtotransporti", tur:"Avtotransport", holat:"Garovda", lat:41.2916, lng:69.2402, guruh:"Yakkasaroy"},
  {kod:null, nom:"Yakkasaroy, ko'p qavatli uy xonadoni", tur:"Kvartira", holat:"Garovda", lat:41.2816, lng:69.2644, guruh:"Yakkasaroy"},
  {kod:null, nom:"Yakkasaroy, 2-xonali xonadon", tur:"Kvartira", holat:"Nazoratda", lat:41.2887, lng:69.2305, guruh:"Yakkasaroy"},
  {kod:null, nom:"Shayxontohur, xususiy turar-joy", tur:"Turar-joy", holat:"Garovda", lat:41.3083, lng:69.2121, guruh:"Shayxontohur"},
  {kod:null, nom:"Shayxontohur, 3-xonali xonadon", tur:"Kvartira", holat:"Garovda", lat:41.3374, lng:69.2466, guruh:"Shayxontohur"},
  {kod:null, nom:"Shayxontohur, garov avtotransporti", tur:"Avtotransport", holat:"Garovda", lat:41.3219, lng:69.226, guruh:"Shayxontohur"},
  {kod:null, nom:"Shayxontohur, ishlab chiqarish sexi", tur:"Ishlab chiqarish", holat:"Garovda", lat:41.3374, lng:69.2274, guruh:"Shayxontohur"},
  {kod:null, nom:"Sergeli, umumiy ovqatlanish obyekti", tur:"Tijorat", holat:"Garovda", lat:41.2324, lng:69.2175, guruh:"Sergeli"},
  {kod:null, nom:"Sergeli, yer uchastkasi", tur:"Yer uchastkasi", holat:"Garovda", lat:41.2359, lng:69.2352, guruh:"Sergeli"},
  {kod:null, nom:"Sergeli, 2-xonali xonadon", tur:"Kvartira", holat:"Garovda", lat:41.2181, lng:69.2198, guruh:"Sergeli"},
  {kod:null, nom:"Sergeli, ko'p qavatli uy xonadoni", tur:"Kvartira", holat:"Garovda", lat:41.2162, lng:69.2264, guruh:"Sergeli"},
  {kod:null, nom:"Yashnobod, xususiy turar-joy", tur:"Turar-joy", holat:"Nazoratda", lat:41.278, lng:69.3511, guruh:"Yashnobod"},
  {kod:null, nom:"Yashnobod, xususiy turar-joy", tur:"Turar-joy", holat:"Garovda", lat:41.3101, lng:69.3356, guruh:"Yashnobod"},
  {kod:null, nom:"Yashnobod, umumiy ovqatlanish obyekti", tur:"Tijorat", holat:"Garovda", lat:41.2981, lng:69.3195, guruh:"Yashnobod"},
  {kod:null, nom:"Olmazor, garov avtotransporti", tur:"Avtotransport", holat:"Musodara jarayonida", lat:41.36, lng:69.1832, guruh:"Olmazor"},
  {kod:null, nom:"Olmazor, garov avtotransporti", tur:"Avtotransport", holat:"Garovda", lat:41.3383, lng:69.1866, guruh:"Olmazor"},
  {kod:null, nom:"Olmazor, yer uchastkasi", tur:"Yer uchastkasi", holat:"Garovda", lat:41.3349, lng:69.2238, guruh:"Olmazor"},
  {kod:null, nom:"Chirchiq, yer uchastkasi", tur:"Yer uchastkasi", holat:"Garovda", lat:41.4717, lng:69.5922, guruh:"Chirchiq"},
  {kod:null, nom:"Chirchiq, ishlab chiqarish sexi", tur:"Ishlab chiqarish", holat:"Garovda", lat:41.4553, lng:69.5731, guruh:"Chirchiq"},
  {kod:null, nom:"Chirchiq, 3-xonali xonadon", tur:"Kvartira", holat:"Musodara jarayonida", lat:41.4701, lng:69.5956, guruh:"Chirchiq"},
  {kod:null, nom:"Angren, ko'p qavatli uy xonadoni", tur:"Kvartira", holat:"Nazoratda", lat:41.0273, lng:70.1509, guruh:"Angren"},
  {kod:null, nom:"Angren, umumiy ovqatlanish obyekti", tur:"Tijorat", holat:"Nazoratda", lat:41.027, lng:70.1216, guruh:"Angren"},
  {kod:null, nom:"Olmaliq, dala hovli", tur:"Turar-joy", holat:"Garovda", lat:40.8614, lng:69.6108, guruh:"Olmaliq"},
  {kod:null, nom:"Olmaliq, yer uchastkasi", tur:"Yer uchastkasi", holat:"Garovda", lat:40.836, lng:69.5798, guruh:"Olmaliq"},
  {kod:null, nom:"Bekobod, 3-xonali xonadon", tur:"Kvartira", holat:"Nazoratda", lat:40.2169, lng:69.2711, guruh:"Bekobod"},
  {kod:null, nom:"Bekobod, garov avtotransporti", tur:"Avtotransport", holat:"Garovda", lat:40.2152, lng:69.2893, guruh:"Bekobod"},
  {kod:null, nom:"Parkent, ko'p qavatli uy xonadoni", tur:"Kvartira", holat:"Garovda", lat:41.306, lng:69.6793, guruh:"Parkent"},
  {kod:null, nom:"Parkent, yer uchastkasi", tur:"Yer uchastkasi", holat:"Garovda", lat:41.3099, lng:69.6598, guruh:"Parkent"},
  {kod:null, nom:"Nurafshon, ko'p qavatli uy xonadoni", tur:"Kvartira", holat:"Nazoratda", lat:41.0237, lng:69.3796, guruh:"Nurafshon"},
  {kod:null, nom:"Nurafshon, savdo do'koni", tur:"Tijorat", holat:"Garovda", lat:41.0268, lng:69.3467, guruh:"Nurafshon"},
  {kod:null, nom:"Samarqand, omborxona", tur:"Ishlab chiqarish", holat:"Garovda", lat:39.6524, lng:66.9531, guruh:"Samarqand"},
  {kod:null, nom:"Samarqand, savdo do'koni", tur:"Tijorat", holat:"Nazoratda", lat:39.6658, lng:66.9532, guruh:"Samarqand"},
  {kod:null, nom:"Namangan, yer uchastkasi", tur:"Yer uchastkasi", holat:"Garovda", lat:40.9989, lng:71.6649, guruh:"Namangan"},
  {kod:"GR-2026/4471", nom:"Yunusobod 12-kvartal, 45-uy xonadoni", tur:"Kvartira", holat:null, lat:41.3611, lng:69.2897, guruh:"Yunusobod"},
  {kod:"GR-2025/1187", nom:"Zarafshon Tekstil ishlab chiqarish sexi", tur:"Ishlab chiqarish", holat:null, lat:39.6547, lng:66.9758, guruh:"Samarqand"},
  {kod:"GR-2026/2210", nom:"Chilonzor 9-kvartal xonadoni", tur:"Kvartira", holat:null, lat:41.2795, lng:69.2054, guruh:"Chilonzor"},
  {kod:"GR-2025/0934", nom:"Navruz Plaza savdo maydoni", tur:"Tijorat", holat:null, lat:41.3111, lng:69.2797, guruh:"Mirobod"},
  {kod:"GR-2026/5512", nom:"Avtotransport saqlash maydonchasi", tur:"Avtotransport", holat:null, lat:41.2946, lng:69.2828, guruh:"Mirobod"},
  {kod:"GR-2026/3308", nom:"Nurafshon turar-joy majmuasi", tur:"Turar-joy", holat:null, lat:41.0378, lng:69.3567, guruh:"Nurafshon"},
  {kod:"GR-2025/0755", nom:"Qibray yer uchastkasi", tur:"Yer uchastkasi", holat:null, lat:41.39, lng:69.53, guruh:"Chirchiq"},
  {kod:"GR-2026/0141", nom:"Chorvoq dala hovlisi", tur:"Turar-joy", holat:null, lat:41.623, lng:69.781, guruh:"Chirchiq"}
];

/* ---------- Mosligni o'z-o'zini tekshirish (TZ 3.4, П-9) ---------- */
function moslikTekshiruvi(){
  const xato = [];
  YOZUVLAR.forEach(y => {
    if (Math.abs(y.qarz.jami - (y.qarz.asosiy + y.qarz.foiz)) > 0.05)
      xato.push(y.id + ": qarz yig'indisi mos emas");
    if (!BOSQICH_HOLAT[y.ish.bosqich])
      xato.push(y.id + ": bosqichga holat biriktirilmagan");
    if (y.ish.bosqich === "auksion" && !y.garov.qabul)
      xato.push(y.id + ": auksionda, lekin balansga qabul sanasi yo'q");
    if (["musodara", "auksion"].includes(y.ish.bosqich) && y.ish.ijro === "Hali berilmagan")
      xato.push(y.id + ": musodara bosqichi ijro varaqasisiz");
    if (y.garov.baho <= 0) xato.push(y.id + ": baholangan qiymat noto'g'ri");
    if (y.qarz.kunlar <= 0) xato.push(y.id + ": kechikish kunlari noto'g'ri");
  });
  const pJami = PORTFEL.holatlar.reduce((s, h) => s + h.son, 0);
  if (pJami !== PORTFEL.jami) xato.push("portfel yig'indisi " + pJami + " != " + PORTFEL.jami);
  const k = PORTFEL.koriklar;
  if (k.otkazilgan + k.rejada + k.muddatiOtgan !== k.jami) xato.push("ko'riklar yig'indisi mos emas");
  const sg = PORTFEL.sugurtali;
  if (sg.amalda + sg.tugaydi30 + sg.muddatiOtgan !== sg.jami) xato.push("sug'urta kesimi mos emas");
  const bh = PORTFEL.baholash;
  if (bh.dolzarb + bh.tugaydi90 + bh.eskirgan !== bh.jami) xato.push("baholash kesimi mos emas");
  ARXIV.forEach(a => {
    if (!a.xaridor || !a.ish) xato.push(a.kod + ": arxiv yozuvida xaridor yoki ish raqami yo'q");
    if (!(a.summa > 0)) xato.push(a.kod + ": sotuv summasi noto'g'ri");
  });
  SOTUV.forEach(l => { if (!(l.baho > 0)) xato.push(l.id + ": lot bahosi noto'g'ri"); });
  const foizJami = holatStatistikasi().reduce((s, h) => s + h.foiz, 0);
  if (Math.abs(foizJami - 100) > 2) xato.push("holat foizlari yig'indisi " + foizJami + "%");

  /* --- Havolalar butunligi: ikkilamchi ro'yxatlar obyektga ID bilan bog'lanadi.
         Uzilgan havola sahifada "?GR-..." bo'lib ko'rinadi, shuning uchun uni
         shu yerda oldindan ushlaymiz (Д-1). --- */
  const bogliq = [
    ["HODISALAR", HODISALAR, "kod"],
    ["HUJJATLAR", HUJJATLAR, "nom"], ["XONALAR", XONALAR, "nom"],
    ["KORIKLAR", KORIKLAR, "id"], ["SUGURTALAR", SUGURTALAR, "polis"],
    ["BAHOLASHLAR", BAHOLASHLAR, "sana"], ["TASDIQLAR", TASDIQLAR, "sarlavha"]
  ];
  bogliq.forEach(([nom, royxat, belgi]) => royxat.forEach(r => {
    if (r.obyektId && !OBYEKT_INDEKS[r.obyektId])
      xato.push(nom + " / " + r[belgi] + ": obyekt havolasi uzilgan (" + r.obyektId + ")");
  }));

  /* --- Hududlar kesimi butun portfelni qoplashi kerak (Д-7) --- */
  const hJami = HUDUDLAR.reduce((a, h) => a + (+h[1]), 0);
  if (hJami !== PORTFEL.jami)
    xato.push("hududlar bo'yicha " + hJami + " obyekt, portfelda " + PORTFEL.jami);

  /* --- Yer uchastkasi reyestrdagi obyekt bo'lsa, statusi bosqichdan kelib chiqadi (Д-2) --- */
  UCHASTKALAR.forEach(u => {
    const y = YOZUVLAR.find(z => z.id === u.kod);
    if (y && u.status !== y.holat.nom)
      xato.push(u.kod + ": uchastka statusi ish bosqichiga mos emas");
  });

  return xato;
}

window.MKB_DATA = {
  BOSQICHLAR, YOZUVLAR, PORTFEL, SOTUV, ARXIV, XARITA_NUQTALARI,
  OBYEKT_INDEKS, obyekt, obyektNomi, obyektHududi, joyNomi,
  TASNIF, tasnifla, tasnifStatistikasi, jamiZaxira,
  HODISALAR, HUJJATLAR, XONALAR,
  KORIKLAR, SUGURTALAR, BAHOLASHLAR, TASDIQLAR, UCHASTKALAR,
  NAVBAT, MENING_VAZIFALARIM, BILDIRISHLAR, AUDIT_JURNAL,
  FOYDLAR, HISOBOTLAR, HUDUDLAR, AUKSION_BOSQICH, AVTO, KPI_BAZA,
  pul, son, fmt,
  bosqichStatistikasi, holatStatistikasi,
  jamiQarz, jamiBaho, moslikTekshiruvi,
  topish: id => YOZUVLAR.find(y => y.id === id),
  ishBoyicha: raqam => YOZUVLAR.find(y => y.ish.raqam === raqam)
};
})();
