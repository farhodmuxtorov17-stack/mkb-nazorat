/* ============================================================
   Yagona ma'lumot manbai — barcha bo'limlar shu moduldan o'qiydi.
   Bir obyekt bo'yicha summa, sana va holat butun tizimda bir xil bo'lishi
   uchun sahifalarda alohida massivlar saqlanmaydi.

   Bog'lanish: Mijoz -> Shartnoma -> Ta'minot -> Undiruv ishi -> Auksion loti
   ============================================================ */
(function () {
"use strict";

/* ---------- Undiruv bosqichlari (tartib muhim: faqat ketma-ket o'tiladi) ---------- */
const BOSQICHLAR = [
  {kalit: "ogohlantirish", nom: "Ogohlantirish",     rang: "#8A94A0", chip: "chip-kul"},
  {kalit: "davo",          nom: "Da'vo arizasi",     rang: "#3E7BD6", chip: "chip-kok"},
  {kalit: "sud",           nom: "Sud jarayonida",    rang: "#8B5CF6", chip: "chip-binafsha"},
  {kalit: "qaror",         nom: "Sud qarori",        rang: "#4F46E5", chip: "chip-asos"},
  {kalit: "ijro",           nom: "Qaror ijrosi",        rang: "#D98324", chip: "chip-sariq"},
  {kalit: "musodara",      nom: "Musodara qilingan", rang: "#059669", chip: "chip-asos"},
  {kalit: "auksion",       nom: "Auksionda",         rang: "#8B5CF6", chip: "chip-binafsha"}
];

/* Bosqich -> aktiv obyektining holati (TZ, Д-2 qoidasi) */
const BOSQICH_HOLAT = {
  ogohlantirish: {nom: "Ta'minotda",              rang: "#7BAEFC"},
  davo:          {nom: "Ta'minotda",              rang: "#7BAEFC"},
  sud:           {nom: "Ta'minotda",              rang: "#7BAEFC"},
  qaror:         {nom: "Musodara jarayonida",  rang: "#E8763C"},
  ijro:          {nom: "Musodara jarayonida",  rang: "#E8763C"},
  musodara:      {nom: "Nazoratda",            rang: "#059669"},
  auksion:       {nom: "Auksionda",            rang: "#8B5CF6"}
};

/* ---------- Yozuvlar. Har bir yozuv butun tizim uchun yagona haqiqat ---------- */
const YOZUVLAR = [
  {
    id: "AK-2026/4471",
    mijoz: {nom: "Karimov Javlon Anvarovich", tur: "Jismoniy shaxs", raqam: "PINFL 3210 4471 8802", belgi: "KJ", yur: false, tel: "+998 90 123 44 71"},
    filial: "Yunusobod filiali",
    shartnoma: {raqam: "IP-2023/4471", tur: "Ipoteka krediti", sana: "12.04.2023", berilgan: 480.0},
    qarz: {asosiy: 412.0, foiz: 74.2, kunlar: 214},
    mulk: {
      tur: "Kvartira", nom: "Yunusobod 12-kvartal, 45-uy, 23-xonadon", qisqa: "Yunusobod 12-kvartal, 45-uy",
      hudud: "Toshkent sh.", hududToliq: "Toshkent sh., Yunusobod", manzil: "Yunusobod 12-kvartal, 45-uy",
      maydon: "78 m²", baho: 520.0, bahoSana: "18.02.2026", sugurta: "Amalda",
      rasm: "assets/bino_9.webp", nazoratBall: 72
    },
    ish: {
      raqam: "UI-2026/0412", bosqich: "ijro", masul: "Sobirov Ulug'bek",
      sud: "Yunusobod tumanlararo fuqarolik ishlari sudi", qaror: "2-1234/2026",
      ijro: "IH-2026/4471", muddat: "28-may — ijro hujjati muddati", kun: "4 kun qoldi", shoshilinch: "yuqori",
      tarix: [
        ["14.10.2025", "Yozma ogohlantirish yuborildi", "Qarzdorga 90 kunlik kechikish bo'yicha rasmiy talabnoma topshirildi."],
        ["22.12.2025", "Da'vo arizasi berildi", "Sudga ta'minotni undirish to'g'risida da'vo arizasi taqdim etildi."],
        ["12.03.2026", "Sud qarori qabul qilindi", "Ta'minot predmetini realizatsiya qilish to'g'risida qaror chiqarildi."],
        ["02.04.2026", "Ijro hujjati ijroga qabul qilindi", "Majburiy ijro ishi qo'zg'atildi."]
      ],
      hujjatlar: [["PDF", "Sud qarori 2-1234/2026", "1,8 MB"], ["PDF", "Ijro hujjati IH-2026/4471", "640 KB"], ["PDF", "Ta'minot shartnomasi", "2,1 MB"]]
    },
    tolov: [1,1,1,1,1,1,0,0,0,0,0,0]
  },
  {
    id: "AK-2025/1187",
    mijoz: {nom: "«Zarafshon Tekstil» MChJ", tur: "Yuridik shaxs", raqam: "INN 302 481 776", belgi: "ZT", yur: true, tel: "+998 71 234 11 87"},
    filial: "Samarqand filiali",
    shartnoma: {raqam: "IK-2022/1187", tur: "Investitsiya krediti", sana: "03.02.2022", berilgan: 4200.0},
    qarz: {asosiy: 3210.0, foiz: 630.4, kunlar: 402},
    mulk: {
      tur: "Ishlab chiqarish", nom: "Zarafshon Tekstil ishlab chiqarish sexi", qisqa: "Zarafshon Tekstil sexi",
      hudud: "Samarqand", hududToliq: "Samarqand vil., Samarqand sh.", manzil: "Sanoat ko'chasi, 4",
      maydon: "9 400 m²", baho: 4150.0, bahoSana: "05.12.2025", sugurta: "Amalda",
      rasm: "assets/bino_mall.webp", nazoratBall: 89, qabul: "21.11.2025"
    },
    ish: {
      raqam: "UI-2025/1187", bosqich: "musodara", masul: "Qodirova Nilufar",
      sud: "Samarqand viloyat iqtisodiy sudi", qaror: "4-0221/2025",
      ijro: "IH-2025/1187", muddat: "Baholash hisoboti — 10-iyun", kun: "17 kun qoldi", shoshilinch: "normal",
      tarix: [
        ["05.03.2025", "Da'vo arizasi berildi", "Iqtisodiy sudga qarz va ta'minot bo'yicha da'vo taqdim etildi."],
        ["19.06.2025", "Sud qarori qabul qilindi", "Qarz undirish va ta'minotni realizatsiya qilish to'g'risida."],
        ["04.09.2025", "ijro ijro ishi yakunlandi", "Obyekt bank foydasiga majburiy ravishda o'tkazildi."],
        ["21.11.2025", "Obyekt bank balansiga qabul qilindi", "Qabul dalolatnomasi imzolandi, xavfsizlik tizimi ishga tushirildi."]
      ],
      hujjatlar: [["PDF", "Qabul dalolatnomasi", "1,2 MB"], ["PDF", "Sud qarori 4-0221/2025", "2,4 MB"], ["XLSX", "Inventarizatsiya ro'yxati", "318 KB"]]
    },
    tolov: [1,1,1,0,0,0,0,0,0,0,0,0]
  },
  {
    id: "AK-2026/2210",
    mijoz: {nom: "Ergasheva Dilnoza Baxtiyorovna", tur: "Jismoniy shaxs", raqam: "PINFL 5102 2210 4417", belgi: "ED", yur: false, tel: "+998 93 452 22 10"},
    filial: "Chilonzor filiali",
    shartnoma: {raqam: "IS-2024/2210", tur: "Iste'mol krediti (ta'minot bilan)", sana: "26.07.2024", berilgan: 95.0},
    qarz: {asosiy: 81.4, foiz: 11.1, kunlar: 96},
    mulk: {
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
    id: "AK-2025/0934",
    mijoz: {nom: "«Navruz Savdo» MChJ", tur: "Yuridik shaxs", raqam: "INN 205 118 934", belgi: "NS", yur: true, tel: "+998 71 209 09 34"},
    filial: "Toshkent shahar filiali",
    shartnoma: {raqam: "AM-2023/0934", tur: "Aylanma mablag' krediti", sana: "17.05.2023", berilgan: 1350.0},
    qarz: {asosiy: 1080.0, foiz: 180.6, kunlar: 268},
    mulk: {
      tur: "Savdo maydoni", nom: "Navruz Plaza, 3-qavat savdo maydoni", qisqa: "Navruz Plaza",
      hudud: "Toshkent sh.", hududToliq: "Toshkent sh., Shayxontohur", manzil: "Amir Temur ko'chasi, 88",
      maydon: "1 850 m²", baho: 1480.0, bahoSana: "22.04.2026", sugurta: "Amalda",
      rasm: "assets/bino_tower.webp", nazoratBall: 92, qabul: "14.08.2025"
    },
    ish: {
      raqam: "UI-2025/0934", bosqich: "auksion", masul: "Qodirova Nilufar",
      sud: "Toshkent shahar iqtisodiy sudi", qaror: "4-0512/2025",
      ijro: "IH-2025/0934", muddat: "Auksion savdosi — 5-iyun", kun: "12 kun qoldi", shoshilinch: "orta",
      tarix: [
        ["11.02.2025", "Da'vo arizasi berildi", "Iqtisodiy sudga qarzni undirish bo'yicha da'vo berildi."],
        ["30.05.2025", "Sud qarori qabul qilindi", "Ta'minot predmetiga undiruv qaratildi."],
        ["14.08.2025", "Obyekt bank balansiga qabul qilindi", "Savdo maydoni qo'riqlash tizimiga ulandi."],
        ["22.04.2026", "Auksionga chiqarildi", "Boshlang'ich narx baholangan qiymat bo'yicha belgilandi."]
      ],
      hujjatlar: [["PDF", "Auksion e'loni", "520 KB"], ["PDF", "Baholash hisoboti", "3,1 MB"], ["PDF", "Qabul dalolatnomasi", "1,1 MB"]]
    },
    tolov: [1,1,0,0,0,0,0,0,0,0,0,0]
  },
  {
    id: "AK-2026/5512",
    mijoz: {nom: "To'xtasinov Sherzod Rustamovich", tur: "Jismoniy shaxs", raqam: "PINFL 4417 5512 9003", belgi: "TS", yur: false, tel: "+998 94 155 55 12"},
    filial: "Toshkent shahar filiali",
    shartnoma: {raqam: "AV-2024/5512", tur: "Avtokredit", sana: "09.09.2024", berilgan: 82.0},
    qarz: {asosiy: 68.2, foiz: 6.6, kunlar: 58},
    mulk: {
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
      hujjatlar: [["PDF", "Da'vo arizasi", "740 KB"], ["PDF", "Ta'minot shartnomasi (transport)", "1,3 MB"]]
    },
    tolov: [1,1,1,1,1,1,1,1,1,1,0,0]
  },
  {
    id: "AK-2026/3308",
    mijoz: {nom: "Yusupova Nodira Alisherovna", tur: "Jismoniy shaxs", raqam: "PINFL 6014 3308 1120", belgi: "YN", yur: false, tel: "+998 97 330 33 08"},
    filial: "Chilonzor filiali",
    shartnoma: {raqam: "IP-2023/3308", tur: "Ipoteka krediti", sana: "28.06.2023", berilgan: 330.0},
    qarz: {asosiy: 276.0, foiz: 36.4, kunlar: 141},
    mulk: {
      tur: "Turar-joy majmuasi", nom: "Nurafshon turar-joy majmuasi, 18-uy", qisqa: "Nurafshon turar-joy majmuasi",
      hudud: "Nurafshon sh.", hududToliq: "Toshkent vil., Nurafshon", manzil: "Istiqlol ko'chasi, 21",
      maydon: "96 m²", baho: 395.0, bahoSana: "30.01.2026", sugurta: "Amalda",
      rasm: "assets/bino_turar.webp", nazoratBall: 76
    },
    ish: {
      raqam: "UI-2026/3308", bosqich: "qaror", masul: "Qodirova Nilufar",
      sud: "Sergeli tumanlararo fuqarolik ishlari sudi", qaror: "2-0908/2026",
      ijro: "Rasmiylashtirilmoqda", muddat: "Ijro hujjatini olish — 30-may", kun: "6 kun qoldi", shoshilinch: "yuqori",
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
    id: "AK-2025/0755",
    mijoz: {nom: "«Bo'ston Agro» fermer xo'jaligi", tur: "Yuridik shaxs", raqam: "INN 411 020 755", belgi: "BA", yur: true, tel: "+998 95 707 07 55"},
    filial: "Namangan filiali",
    shartnoma: {raqam: "AG-2022/0755", tur: "Agrokredit", sana: "21.03.2022", berilgan: 950.0},
    qarz: {asosiy: 742.0, foiz: 148.0, kunlar: 335},
    mulk: {
      tur: "Yer uchastkasi", nom: "Qibray tumani, 2,4 ga yer uchastkasi", qisqa: "Qibray tumani",
      hudud: "Toshkent vil.", hududToliq: "Toshkent vil., Qibray", manzil: "Qibray tumani, Salor MFY",
      maydon: "24 000 m²", baho: 1020.0, bahoSana: "16.10.2025", sugurta: "Yo'q",
      rasm: "assets/bino_yer.webp", nazoratBall: 61
    },
    ish: {
      raqam: "UI-2025/0755", bosqich: "ijro", masul: "Sobirov Ulug'bek",
      sud: "Namangan viloyat iqtisodiy sudi", qaror: "4-0733/2025",
      ijro: "IH-2025/0755", muddat: "Yer uchastkasini qabul qilish — 14-iyun", kun: "21 kun qoldi", shoshilinch: "normal",
      tarix: [
        ["20.04.2025", "Da'vo arizasi berildi", "Yer uchastkasi ta'minoti bo'yicha da'vo taqdim etildi."],
        ["07.08.2025", "Sud qarori qabul qilindi", "Ta'minot predmetini realizatsiya qilishga ruxsat berildi."],
        ["19.12.2025", "Ijro hujjati ijroga qabul qilindi", "Ijro ishi qo'zg'atildi, chegara belgilari tekshirilmoqda."]
      ],
      hujjatlar: [["PDF", "Ijro hujjati IH-2025/0755", "680 KB"], ["PDF", "Kadastr hujjati", "1,4 MB"], ["XLSX", "Chegara koordinatalari", "96 KB"]]
    },
    tolov: [1,1,1,1,0,0,0,0,0,0,0,0]
  },
  {
    id: "AK-2026/0141",
    mijoz: {nom: "Rasulov Otabek Farhodovich", tur: "Jismoniy shaxs", raqam: "PINFL 3308 0141 7724", belgi: "RO", yur: false, tel: "+998 99 014 01 41"},
    filial: "Toshkent shahar filiali",
    shartnoma: {raqam: "MQ-2025/0141", tur: "Mikroqarz (ta'minot bilan)", sana: "14.11.2025", berilgan: 40.0},
    qarz: {asosiy: 35.8, foiz: 2.8, kunlar: 34},
    mulk: {
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
      hujjatlar: [["PDF", "Yozma talabnoma", "420 KB"], ["PDF", "Ta'minot shartnomasi", "1,1 MB"]]
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
  {kalit: "yaxshi",      nom: "Yaxshi",      kundan: 0,   zaxira: 0,   chip: "chip-yashil",    rang: "#059669"},
  {kalit: "standart",    nom: "Standart",    kundan: 1,   zaxira: 10,  chip: "chip-kok",       rang: "#3E7BD6"},
  {kalit: "substandart", nom: "Substandart", kundan: 31,  zaxira: 25,  chip: "chip-sariq",     rang: "#D98324"},
  {kalit: "shubhali",    nom: "Shubhali",    kundan: 91,  zaxira: 50,  chip: "chip-tarvuz",    rang: "#E8763C"},
  {kalit: "umidsiz",     nom: "Umidsiz",     kundan: 181, zaxira: 100, chip: "chip-qizil",     rang: "#B91C1C"}
];

/* Kechikish kunidan toifani aniqlash. Chegara — "shu kundan boshlab". */
function tasnifla(kunlar){
  let topilgan = TASNIF[0];
  TASNIF.forEach(t => { if (kunlar >= t.kundan) topilgan = t; });
  return topilgan;
}

/* Ta'minlanmagan qism: qarz ta'minot qiymatidan qancha oshadi.
   Zaxira faqat shu qismga emas, butun qarzga hisoblanadi — soddalashtirilgan
   model; ta'minotni hisobga olish tartibi buyurtmachi bilan aniqlanadi. */
function zaxiraHisobi(qarzJami, taminotBaho, foiz){
  const zaxira    = +(qarzJami * foiz / 100).toFixed(1);
  const taminot   = Math.min(taminotBaho, qarzJami);
  const ochiq     = +(qarzJami - taminot).toFixed(1);   // ta'minlanmagan qoldiq
  const qoplash   = qarzJami > 0 ? Math.round(taminotBaho / qarzJami * 100) : 0;
  return {zaxira, ochiq, qoplash};
}

/* Kichik tumba varianti: jadval katagi 44–64px uchun 1254px asl nusxa
   dekodlanmasin. Fayl nomi _kichik qo'shimchasi bilan. */
function kichikRasm(y){
  const r = y.mulk.rasm || "";
  const k = r.replace(/\.webp$/, "_kichik.webp");
  y.mulk.rasmKichik = /bino_/.test(r) ? k : r;
}
function yozuvHosilalari(){
YOZUVLAR.forEach(y => {
  y.qarz.jami = +(y.qarz.asosiy + y.qarz.foiz).toFixed(1);   // Д-1: yagona qiymat
  y.bosqichNomi = bosqichnoma(y.ish.bosqich).nom;
  y.bosqichChip = bosqichnoma(y.ish.bosqich).chip;
  y.holat = BOSQICH_HOLAT[y.ish.bosqich];                     // Д-2: holat bosqichdan
  y.qarzMatn = pul(y.qarz.jami);
  y.asosiyMatn = pul(y.qarz.asosiy);
  y.foizMatn = pul(y.qarz.foiz);
  y.bahoMatn = pul(y.mulk.baho);
  y.qarzSon = son(y.qarz.jami);

  /* Tasnif kechikish kunidan, zaxira tasnifdan — ikkalasi ham hosila (Д-2) */
  y.tasnif = tasnifla(y.qarz.kunlar);
  const h = zaxiraHisobi(y.qarz.jami, y.mulk.baho, y.tasnif.zaxira);
  y.zaxira      = h.zaxira;        // zaxiraga ajratma, mln so'm
  y.ochiqQoldiq = h.ochiq;         // ta'minot bilan qoplanmagan qism
  y.qoplash     = h.qoplash;       // ta'minotning qarzga nisbati, %
  y.zaxiraMatn  = pul(y.zaxira);
});
}
yozuvHosilalari();
YOZUVLAR.forEach(kichikRasm);

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
const jamiBaho = () => +YOZUVLAR.reduce((s, y) => s + y.mulk.baho, 0).toFixed(1);


/* ---------- Portfel darajasidagi agregatlar ----------
   8 ta batafsil yozuv — shoshilinch ishlar kesimi. Butun bank portfeli
   ko‘rsatkichlari shu yerda YAGONA joyda saqlanadi (sahifalarda emas).
   Yig‘indi va foizlar moslikTekshiruvi() bilan nazorat qilinadi. */
const PORTFEL = {
  jami: 1248,
  bahoTrln: "12,7",
  oylikUndiruvMlrd: "58,4",
  holatlar: [
    {nom: "Ta'minotda",              rang: "#7BAEFC", son: 704},
    {nom: "Nazoratda",            rang: "#059669", son: 306},
    {nom: "Musodara jarayonida",  rang: "#E8763C", son: 118},
    {nom: "Ijaraga berilgan",     rang: "#3E7BD6", son: 86},
    {nom: "Auksionda",            rang: "#8B5CF6", son: 34}
  ],
  /* Nazorat tadbirlari — butun portfel bo'yicha (Д-7 talabiga ko'ra
     kesim yig'indilari jami bilan moslikTekshiruvi() da solishtiriladi) */
  /* Portfel darajasidagi undiruv va shartnoma kesimlari — sahifalarda
     qo'lda yozilgan raqamlar o'rniga.
     417 qarzdor / 128 shartnoma ziddiyati bartaraf: qarzdor <= shartnoma. */
  undiruv: {qarzdorlar: 112, muddatiOtganQarzMlrd: "184,6", sudJarayonida: 96, musodara: 118},
  shartnoma: {jami: 128, faol: 96, kechikkan: 14, sudda: 3, yakunlangan: 15},
  /* Ko'rsatkich deltalari (oldingi davrga nisbatan) — ilgari HTMLda literal edi */
  delta: {portfel: "\u2191 8,2%", balansda: "\u2191 6", baho: "\u2191 7,6%", undiruv: "\u2191 6,1%", hudud: "\u2191 5,4%"},
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
  {id: "AK-2024/0286", nom: "Sergeli logistika ombori", tur: "Ombor",
   hudud: "Toshkent sh.", hududToliq: "Toshkent sh., Sergeli",
   baho: 4200.0, rasm: "assets/bino_9.webp", ish: "UI-2024/0286", ijro: "IH-2024/0286",
   bosqich: "elon", korik: 2},
  {id: "AK-2024/0512", nom: "Chorsu Savdo Markazi, B blok", qisqa: "Chorsu Savdo Markazi", tur: "Savdo maydoni",
   hudud: "Toshkent sh.", hududToliq: "Toshkent sh., Chilonzor",
   baho: 2400.0, rasm: "assets/bino_mall.webp", ish: "UI-2024/0512", ijro: "IH-2024/0512",
   bosqich: "rasmiylashtirish", korik: 0}
];

/* ---------- Doimiy arxiv: realizatsiya yakunlangan obyektlar (Д-6) ---------- */
const ARXIV = [
  {kod: "AK-2023/0088", nom: "Yakkasaroy 2-xonali kvartirasi", tur: "Kvartira",
   sotilgan: "18-may, 2026", yil: "2026", xaridor: "Soliyev Umidjon",
   summa: 640.0, ish: "UI-2023/0088", qabul: "12-yan, 2025", nazorat: "16 oy", rasm: "assets/bino_turar.webp"},
  {kod: "AK-2022/0034", nom: "Chimyon dala hovlisi", tur: "Dala hovli",
   sotilgan: "02-may, 2026", yil: "2026", xaridor: "Alimov Sardor",
   summa: 980.0, ish: "UI-2022/0034", qabul: "20-avg, 2024", nazorat: "21 oy", rasm: "assets/bino_dacha.webp"},
  {kod: "AK-2023/0156", nom: "Olmazor savdo do'koni", tur: "Savdo maydoni",
   sotilgan: "20-apr, 2026", yil: "2026", xaridor: "«Turon Retail» MChJ",
   summa: 1150.0, ish: "UI-2023/0156", qabul: "03-iyl, 2025", nazorat: "9 oy", rasm: "assets/bino_mall.webp"},
  {kod: "AK-2022/0077", nom: "Bektemir ombori", tur: "Ombor",
   sotilgan: "11-dek, 2025", yil: "2025", xaridor: "«Sifat Qurilish» MChJ",
   summa: 3350.0, ish: "UI-2022/0077", qabul: "28-fev, 2025", nazorat: "10 oy", rasm: "assets/bino_9.webp"},
  {kod: "AK-2021/0203", nom: "Chilonzor ofis binosi", tur: "Ofis binosi",
   sotilgan: "30-okt, 2025", yil: "2025", xaridor: "«Humo Trade» MChJ",
   summa: 2780.0, ish: "UI-2021/0203", qabul: "15-yan, 2025", nazorat: "9 oy", rasm: "assets/bino_humo.webp"},
  {kod: "AK-2023/0119", nom: "Zangiota yer uchastkasi", tur: "Yer uchastkasi",
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
YOZUVLAR.forEach(y => reyestrgaQosh(Object.assign({}, y.mulk, {id: y.id, manba: "faol"})));
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


/* ---------- Hodisalar (Ta'minot 1:N Hodisa, ТЗ 3.2) ----------
   Yozuvda obyekt nomi va hududi SAQLANMAYDI — faqat obyektId. Ko'rinadigan
   sarlavha, bino nomi va hudud reyestrdan hosil qilinadi, shuning uchun
   obyekt nomi o'zgarsa hamma sahifada bir vaqtda o'zgaradi. */
const HODISALAR = [
  {kod:"#GH-2026-00214", obyektId:"AK-2026/0141", rang:"#E0442B",
   hodisa:"yerto'lani suv bosishi — shikast", vaqt:"Bugun, 14:12", jiddiylik:"yuqori", ustun:"yangi", holat:"Yangi",
   tavsif:"Nazorat ko'rigida yerto'lada suv sathi ko'tarilgani aniqlandi. Poydevorga ta'sir baholanmoqda; sug'urta kompaniyasiga xabarnoma tayyorlanmoqda.",
   masul:"Karimova F.", bolim:"Aktivlar nazorati bo'limi", fayl:"korik_dalolatnoma.pdf", hajm:"1.2 MB"},
  {kod:"#GH-2026-00213", obyektId:"AK-2025/1187", rang:"#4338CA",
   hodisa:"uskunalar ro'yxatida kamomad", vaqt:"Bugun, 12:52", jiddiylik:"yuqori", ustun:"yangi", holat:"Yangi",
   tavsif:"Choraklik ko'rikda ta'minot ro'yxatidagi 2 ta to'quv dastgohi joyida yo'qligi aniqlandi. Qarzdordan yozma tushuntirish talab qilindi.",
   masul:"Sattorov J.", bolim:"Aktivlar nazorati bo'limi", fayl:"royxat_solishtirma.pdf", hajm:"640 KB"},
  {kod:"#GH-2026-00211", obyektId:"AK-2025/0934", rang:"#F2994A",
   hodisa:"sug'urta polisi muddati o'tdi", vaqt:"Bugun, 13:48", jiddiylik:"orta", ustun:"tekshirilmoqda", holat:"Tekshirilmoqda",
   tavsif:"PL-2025/08127 polisi 11-avgustda tugagan, uzaytirish rasmiylashtirilmagan. Auksion bosqichidagi obyekt sug'urtasiz qolgan.",
   masul:"Qodirova N.", bolim:"Muammoli kreditlar boshqarmasi", fayl:"polis_nusxa.pdf", hajm:"920 KB"},
  {kod:"#GH-2026-00209", obyektId:"AK-2026/5512", rang:"#8B5CF6",
   hodisa:"qiymatning jadal pasayishi", vaqt:"Bugun, 12:33", jiddiylik:"orta", ustun:"tekshirilmoqda", holat:"Tekshirilmoqda",
   tavsif:"Qayta baholashda qiymat 13% ga pasaygan (214 dan 186 mln gacha). Bozor tahlili so'raldi; zaxira stavkasiga ta'siri hisoblanmoqda.",
   masul:"Xolmatova Z.", bolim:"Tavakkalchiliklarni boshqarish departamenti", fayl:"baholash_hisobot.pdf", hajm:"480 KB"},
  {kod:"#GH-2026-00206", obyektId:"AK-2026/3308", rang:"#F2C230",
   hodisa:"ruxsatsiz ijaraga berish holati", vaqt:"Bugun, 11:05", jiddiylik:"orta", ustun:"tekshirilmoqda", holat:"Tekshirilmoqda",
   tavsif:"Ko'rikda xonadonda ijarachi yashayotgani aniqlandi. Ta'minot shartnomasi bank roziligisiz ijaraga berishni taqiqlaydi. Yuristga yo'naltirildi.",
   masul:"Rahimov B.", bolim:"Yuridik departament", fayl:"korik_bayonnoma.pdf", hajm:"350 KB"},
  {kod:"#GH-2026-00204", obyektId:"AK-2026/4471", rang:"#F2C230",
   hodisa:"kommunal qarzdorlik aniqlandi", vaqt:"Bugun, 13:17", jiddiylik:"past", ustun:"bartaraf", holat:"Bartaraf etilmoqda",
   tavsif:"Xonadon bo'yicha 4,2 mln so'm kommunal qarz to'plangan. Realizatsiyada xaridorga o'tmasligi uchun hujjatlar tartibga keltirilmoqda.",
   masul:"Qodirova N.", bolim:"Muammoli kreditlar boshqarmasi", fayl:"kommunal_malumotnoma.pdf", hajm:"1.1 MB"},
  {kod:"#GH-2026-00201", obyektId:"AK-2025/0755", rang:"#4338CA",
   hodisa:"chegara belgisi buzilgan", vaqt:"Bugun, 10:11", jiddiylik:"past", ustun:"bartaraf", holat:"Bartaraf etilmoqda",
   tavsif:"G'arbiy chegaradagi 2 ta belgi surilgan. Kadastr muhandisi chaqirildi, qo'shni uchastka egasi bilan dalolatnoma tuzilmoqda.",
   masul:"Sattorov J.", bolim:"Aktivlar nazorati bo'limi", fayl:"kadastr_akt.pdf", hajm:"210 KB"},
  {kod:"#GH-2026-00198", obyektId:"AK-2026/3308", rang:"#059669",
   hodisa:"sug'urta polisi uzaytirildi", vaqt:"Kecha, 18:23", jiddiylik:"past", ustun:"yopildi", holat:"Yopildi",
   tavsif:"PL-2026/10578 polisi bo'yicha uzaytirish rasmiylashtirildi, yangi muddat 08.10.2027 gacha. Nusxa ishga biriktirildi.",
   masul:"Qodirova N.", bolim:"Muammoli kreditlar boshqarmasi", fayl:"polis_yangi.pdf", hajm:"380 KB"},
  {kod:"#GH-2026-00196", obyektId:"AK-2025/0934", rang:"#059669",
   hodisa:"auksion oldi ko'rigi yakunlandi", vaqt:"Kecha, 17:42", jiddiylik:"past", ustun:"yopildi", holat:"Yopildi",
   tavsif:"Holat qayd etildi, fotojamlanma va dalolatnoma savdo hujjatlariga kiritildi. E'lon matni uchun ma'lumotlar tayyor.",
   masul:"Karimova F.", bolim:"Aktivlar nazorati bo'limi", fayl:"fotojamlanma.zip", hajm:"290 KB"},
  {kod:"#GH-2026-00195", obyektId:"AK-2026/2210", rang:"#059669",
   hodisa:"qarzdor bilan ko'rik o'tkazildi", vaqt:"Kecha, 16:08", jiddiylik:"past", ustun:"yopildi", holat:"Yopildi",
   tavsif:"Rejali ko'rik qarzdor ishtirokida o'tdi, dalolatnoma ikki tomonlama imzolandi. Holat qoniqarli, keyingi ko'rik 3 oydan keyin.",
   masul:"Sattorov J.", bolim:"Aktivlar nazorati bo'limi", fayl:"dalolatnoma.pdf", hajm:"175 KB"}
];

HODISALAR.forEach(h => {
  h.bino     = obyektNomi(h.obyektId, true);
  h.joy      = obyektHududi(h.obyektId, true);
  h.sarlavha = h.bino + " — " + h.hodisa;
});


/* ---------- Hujjatlar bo'limi uchun yordamchi izoh ----------
   joyIchi — obyekt ICHIDAGI joy ("1-qavat", "Lobby"). Obyekt nomi bu yerda
   saqlanmaydi: ko'rinadigan `joy` reyestrdagi qisqa nom bilan birlashtiriladi. */


/* ---------- Hujjatlar (Ta'minot 1:N Hujjat, ТЗ 3.2) ---------- */
const HUJJATLAR = [
  {nom:"Texnik pasport.pdf", ikon:"pdf", iturl:"i-hujjat", obyektId:"AK-2025/0934", tur:"Texnik pasport", teg:"pasport",
   sana:"24-avg, 2026", holat:"Tasdiqlangan", hrang:"#059669", id:"DOC-2024-001", hajm:"12.4 MB", format:"PDF", rasm:"assets/bino_tower.webp",
   yuklagan:"Ismoilov Otabek", tavsif:"Bino bo'yicha texnik ma'lumotlar va umumiy tavsif."},
  {nom:"Kadastr reja.dwg", ikon:"dwg", iturl:"i-xarita", obyektId:"AK-2026/0141", tur:"Kadastr", teg:"kadastr",
   sana:"21-avg, 2026", holat:"Tasdiqlangan", hrang:"#059669", id:"DOC-2024-014", hajm:"8.1 MB", format:"DWG", rasm:"assets/bino_dacha.webp",
   yuklagan:"Rahimov S.", tavsif:"Yer uchastkasining kadastr chizmasi."},
  {nom:"Ijara shartnomasi.pdf", ikon:"doc", iturl:"i-shartnoma", obyektId:"AK-2024/0512", tur:"Shartnoma", teg:"shartnoma",
   sana:"18-avg, 2026", holat:"Tasdiqlangan", hrang:"#059669", id:"DOC-2024-022", hajm:"2.7 MB", format:"PDF", rasm:"assets/bino_mall.webp",
   yuklagan:"Karimova N.", tavsif:"«Turon Retail» MChJ bilan ijara shartnomasi."},
  {nom:"Fasad ko'rinishi.jpg", ikon:"img", iturl:"i-kamera", obyektId:"AK-2025/1187", tur:"Rasm", teg:"rasm",
   sana:"16-avg, 2026", holat:"Yangi", hrang:"#059669", id:"DOC-2024-031", hajm:"5.4 MB", format:"JPG", rasm:"assets/bino_humo.webp",
   yuklagan:"Soliev B.", tavsif:"Bino fasadining yangilangan surati."},
  {nom:"Baholash hisobot.pdf", ikon:"rep", iturl:"i-hisobot", obyektId:"AK-2026/3308", tur:"Hisobot", teg:"hisobot",
   sana:"14-avg, 2026", holat:"Tasdiqlangan", hrang:"#059669", id:"DOC-2024-036", hajm:"4.2 MB", format:"PDF", rasm:"assets/bino_turar.webp",
   yuklagan:"Yusupova M.", tavsif:"Mustaqil baholovchi hisoboti."},
  {nom:"Yer uchastkasi rejasi.pdf", ikon:"pdf", iturl:"i-yer", obyektId:"AK-2025/0755", tur:"Kadastr", teg:"kadastr",
   sana:"12-avg, 2026", holat:"Ko'rib chiqilmoqda", hrang:"#4A90F2", id:"DOC-2024-040", hajm:"3.3 MB", format:"PDF", rasm:"assets/bino_yer.webp",
   yuklagan:"Rahimov S.", tavsif:"Yer uchastkasining chegara rejasi."},
  {nom:"Qabul-topshirish dalolatnomasi.pdf", ikon:"doc", iturl:"i-shartnoma", obyektId:"AK-2025/0934", tur:"Shartnoma", teg:"shartnoma",
   sana:"10-avg, 2026", holat:"Tasdiqlangan", hrang:"#059669", id:"DOC-2024-044", hajm:"1.6 MB", format:"PDF", rasm:"assets/bino_tower.webp",
   yuklagan:"Ismoilov Otabek", tavsif:"5-qavat ofis maydonini topshirish dalolatnomasi."},
  {nom:"Energiya audit hisobot.pdf", ikon:"pdf", iturl:"i-energiya", obyektId:"AK-2026/0141", tur:"Hisobot", teg:"hisobot",
   sana:"07-avg, 2026", holat:"Tasdiqlangan", hrang:"#059669", id:"DOC-2024-051", hajm:"6.8 MB", format:"PDF", rasm:"assets/bino_dacha.webp",
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
  {nom:"Savdo maydoni", obyektId:"AK-2025/0934", qavat:"3", maydon:"412 m²", rasm:"assets/xona_savdo.webp",
   tur:"Asosiy ta'minot predmeti", ulush:62, holat:"Ta'minot predmeti",
   kadastr:"10:02:11:04:0934/003", huquq:"Mulk huquqi, cheklov: bank ta'minoti",
   jihozlar:"Savdo pavilonlari demontaj qilinmagan, muhandislik tarmoqlari ishga yaroqli"},
  {nom:"Ofis qismi 301", obyektId:"AK-2025/0934", qavat:"3", maydon:"86 m²", rasm:"assets/xona_ofis.webp",
   tur:"Yordamchi maydon", ulush:14, holat:"Ta'minot predmeti",
   kadastr:"10:02:11:04:0934/004", huquq:"Mulk huquqi, cheklov: bank ta'minoti",
   jihozlar:"Ish stollari va ofis jihozlari ta'minot ro'yxatiga kirmaydi"},
  {nom:"Konferensiya zali", obyektId:"AK-2025/0934", qavat:"3", maydon:"64 m²", rasm:"assets/xona_konf.webp",
   tur:"Yordamchi maydon", ulush:11, holat:"Ta'minot predmeti",
   kadastr:"10:02:11:04:0934/005", huquq:"Mulk huquqi, cheklov: bank ta'minoti",
   jihozlar:"Multimedia jihozlari qarzdorda qoladi, dalolatnomada qayd etilgan"},
  {nom:"Arxiv xonasi", obyektId:"AK-2025/0934", qavat:"-1", maydon:"28 m²", rasm:"assets/xona_arxiv.webp",
   tur:"Texnik maydon", ulush:5, holat:"Ta'minot predmeti",
   kadastr:"10:02:11:04:0934/006", huquq:"Mulk huquqi, cheklov: bank ta'minoti",
   jihozlar:"Namlik nazorati talab qilinadi — so'nggi ko'rikda qayd etilgan"},
  {nom:"Texnik xona", obyektId:"AK-2025/0934", qavat:"-1", maydon:"46 m²", rasm:"assets/xona_server.webp",
   tur:"Texnik maydon", ulush:8, holat:"Ta'minot predmeti",
   kadastr:"10:02:11:04:0934/007", huquq:"Mulk huquqi, cheklov: bank ta'minoti",
   jihozlar:"Isitish qozoni va ventilyatsiya — binoning ajralmas qismi sifatida ta'minotda"}
];

XONALAR.forEach(x => { x.bino = obyektNomi(x.obyektId, true); });


/* ---------- Aktivlar nazorati tadbirlari ----------
   Bank ta'minotni QO'RIQLAMAYDI — mavjudligi va holatini NAZORAT qiladi:
   davriy ko'rik, sug'urta amal qilishi, baholash dolzarbligi. Uchala
   ro'yxat obyektga identifikator bilan bog'lanadi (Д-8). */

/* Ko'riklar: rejali va navbatdan tashqari chiqishlar */
const KORIKLAR = [
  {id: "KO-2026/0412", obyektId: "AK-2025/1187", tur: "Rejali",
   sana: "26-avg, 2026", holat: "rejada", inspektor: "Sattorov Jasur",
   izoh: "Choraklik ko'rik. Sex uskunalari ro'yxati bilan solishtiriladi."},
  {id: "KO-2026/0405", obyektId: "AK-2026/4471", tur: "Rejali",
   sana: "28-avg, 2026", holat: "rejada", inspektor: "Sattorov Jasur",
   izoh: "Qaror ijrosi oldidan holatni qayd etish."},
  {id: "KO-2026/0398", obyektId: "AK-2026/0141", tur: "Navbatdan tashqari",
   sana: "22-avg, 2026", holat: "muddati_otgan", inspektor: "Karimova Feruza",
   izoh: "Suv bosishi hodisasidan keyingi nazorat ko'rigi. Chiqish amalga oshmadi."},
  {id: "KO-2026/0391", obyektId: "AK-2025/0934", tur: "Rejali",
   sana: "18-avg, 2026", holat: "otkazildi", inspektor: "Karimova Feruza",
   ball: 84, xulosa: "Qoniqarli. Savdo maydoni ishlamayapti, kommunikatsiyalar saqlangan.",
   izoh: "Auksion oldidan holat qayd etildi, fotojamlanma biriktirildi."},
  {id: "KO-2026/0383", obyektId: "AK-2025/0755", tur: "Rejali",
   sana: "12-avg, 2026", holat: "otkazildi", inspektor: "Sattorov Jasur",
   ball: 91, xulosa: "Chegara belgilari joyida, ekin maydoni ishlov berilmagan.",
   izoh: "Kadastr chegaralari GPS bo'yicha tekshirildi."},
  {id: "KO-2026/0377", obyektId: "AK-2026/5512", tur: "Rejali",
   sana: "08-avg, 2026", holat: "otkazildi", inspektor: "Karimova Feruza",
   ball: 88, xulosa: "Saqlash maydonchasida, texnik holati o'zgarmagan.",
   izoh: "Yurgizib ko'rildi, kilometraj qayd etildi: 42 180 km."},
  {id: "KO-2026/0369", obyektId: "AK-2026/3308", tur: "Rejali",
   sana: "04-avg, 2026", holat: "otkazildi", inspektor: "Sattorov Jasur",
   ball: 76, xulosa: "B blok fasadida namlik izlari. Sug'urta hodisasi emas.",
   izoh: "Keyingi ko'rikda qayta tekshirish belgilandi."},
  {id: "KO-2026/0362", obyektId: "AK-2026/2210", tur: "Rejali",
   sana: "29-iyl, 2026", holat: "otkazildi", inspektor: "Karimova Feruza",
   ball: 93, xulosa: "Xonadon yashash holatida, ta'mir talab qilinmaydi.",
   izoh: "Qarzdor bilan birga ko'rildi, dalolatnoma imzolatildi."},
  {id: "KO-2026/0341", obyektId: "AK-2025/1187", tur: "Rejali",
   sana: "15-iyl, 2026", holat: "otkazildi", inspektor: "Sattorov Jasur",
   ball: 79, xulosa: "Uskunalar ro'yxati mos, sex tomida mahalliy ta'mir talabi.",
   izoh: "Tom qoplamasi bo'yicha kuzatuv keyingi ko'rikka qoldirildi."},
  {id: "KO-2026/0322", obyektId: "AK-2026/4471", tur: "Rejali",
   sana: "02-iyl, 2026", holat: "otkazildi", inspektor: "Karimova Feruza",
   ball: 85, xulosa: "Xonadon holati qoniqarli, kommunal to'lovlarda qarz belgisi.",
   izoh: "Kommunal ma'lumotnoma so'raldi — keyinchalik hodisa ochildi."},
  {id: "KO-2026/0304", obyektId: "AK-2026/0141", tur: "Rejali",
   sana: "18-iyn, 2026", holat: "otkazildi", inspektor: "Sattorov Jasur",
   ball: 82, xulosa: "Hovli qarovli, drenaj tizimi tozalash talab qiladi.",
   izoh: "Drenaj bo'yicha ogohlantirish keyinroq tasdiqlandi — suv bosishi."},
  {id: "KO-2026/0287", obyektId: "AK-2025/0934", tur: "Navbatdan tashqari",
   sana: "05-iyn, 2026", holat: "otkazildi", inspektor: "Karimova Feruza",
   ball: 87, xulosa: "Musodara qabulidan keyingi birinchi ko'rik, plombalar joyida.",
   izoh: "Balansga qabul dalolatnomasiga foto ilova qilindi."},
  {id: "KO-2026/0263", obyektId: "AK-2026/5512", tur: "Rejali",
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
  {obyektId: "AK-2026/4471", polis: "PL-2026/11842", kompaniya: "O'zbekinvest",
   summa: 520.0,  tugash: "14-yan, 2027", holat: "amalda"},
  {obyektId: "AK-2025/1187", polis: "PL-2025/09315", kompaniya: "Gross Insurance",
   summa: 4150.0, tugash: "19-sen, 2026", holat: "tugaydi"},
  {obyektId: "AK-2026/2210", polis: "PL-2026/12073", kompaniya: "O'zbekinvest",
   summa: 340.0,  tugash: "03-mar, 2027", holat: "amalda"},
  {obyektId: "AK-2025/0934", polis: "PL-2025/08127", kompaniya: "Alfa Invest",
   summa: 1480.0, tugash: "11-avg, 2026", holat: "muddati_otgan"},
  {obyektId: "AK-2026/5512", polis: "PL-2026/13964", kompaniya: "Kafolat",
   summa: 186.0,  tugash: "27-may, 2027", holat: "amalda"},
  {obyektId: "AK-2026/3308", polis: "PL-2026/10578", kompaniya: "Gross Insurance",
   summa: 395.0,  tugash: "08-okt, 2026", holat: "tugaydi"},
  {obyektId: "AK-2025/0755", polis: "—", kompaniya: "—",
   summa: 0, tugash: "—", holat: "yoq"},
  {obyektId: "AK-2026/0141", polis: "PL-2026/09842", kompaniya: "O'zbekinvest",
   summa: 155.0, tugash: "16-dek, 2026", holat: "amalda"}
];
SUGURTALAR.forEach(g => { g.obyekt = obyektNomi(g.obyektId, true); });

/* Baholash tarixi: qiymat dolzarbligi nazorati */
const BAHOLASHLAR = [
  {obyektId: "AK-2025/1187", sana: "02.06.2026", qiymat: 4150.0, avvalgi: 4390.0,
   baholovchi: "«Baholash Servis» MChJ", usul: "Daromad yondashuvi", keyingi: "02.06.2027", holat: "dolzarb"},
  {obyektId: "AK-2026/4471", sana: "18.02.2026", qiymat: 520.0, avvalgi: 505.0,
   baholovchi: "«Expert Baho» MChJ", usul: "Qiyosiy yondashuv", keyingi: "18.02.2027", holat: "dolzarb"},
  {obyektId: "AK-2025/0934", sana: "25.03.2026", qiymat: 1480.0, avvalgi: 1520.0,
   baholovchi: "«Baholash Servis» MChJ", usul: "Qiyosiy yondashuv", keyingi: "25.09.2026", holat: "tugaydi"},
  {obyektId: "AK-2026/2210", sana: "09.01.2026", qiymat: 340.0, avvalgi: 328.0,
   baholovchi: "«Andoza Baho» MChJ", usul: "Qiyosiy yondashuv", keyingi: "09.01.2027", holat: "dolzarb"},
  {obyektId: "AK-2026/5512", sana: "14.11.2025", qiymat: 186.0, avvalgi: 214.0,
   baholovchi: "«Expert Baho» MChJ", usul: "Qiyosiy yondashuv", keyingi: "14.05.2026", holat: "eskirgan"},
  {obyektId: "AK-2026/3308", sana: "21.04.2026", qiymat: 395.0, avvalgi: 380.0,
   baholovchi: "«Baholash Servis» MChJ", usul: "Xarajat yondashuvi", keyingi: "21.04.2027", holat: "dolzarb"},
  {obyektId: "AK-2025/0755", sana: "30.10.2025", qiymat: 890.0, avvalgi: 915.0,
   baholovchi: "«Andoza Baho» MChJ", usul: "Qiyosiy yondashuv", keyingi: "30.04.2026", holat: "eskirgan"},
  {obyektId: "AK-2026/0141", sana: "12.05.2026", qiymat: 155.0, avvalgi: 148.0,
   baholovchi: "«Expert Baho» MChJ", usul: "Qiyosiy yondashuv", keyingi: "12.05.2027", holat: "dolzarb"}
];
BAHOLASHLAR.forEach(b => { b.obyekt = obyektNomi(b.obyektId, true); });

/* Kartochkadagi baholangan qiymat REYESTRDAN EMAS, BAHOLASHLARdan olinadi (Д-1):
   ilgari ikki joyda saqlanib, AK-2026/0141 da 620 mln (kartochka) va 155 mln
   (baholash reyestri) bo'lib ajralib ketgan edi — testlar shuni ushladi. */
YOZUVLAR.forEach(y => {
  const b = BAHOLASHLAR.find(x => x.obyektId === y.id);
  if (b){
    y.mulk.baho = b.qiymat;
    y.mulk.bahoSana = b.sana;
  }
});
yozuvHosilalari();   // baho o'zgargani uchun qoplash/zaxira qayta hisoblanadi
YOZUVLAR.forEach(kichikRasm);

/* ---------- Savdo bosqichlari va potensial xaridorlar (ТЗ 3.3: lot maydonlari) ----------
   Ilgari auksion sahifasida saqlanardi — 3.1 taqiqiga zid edi. Savdo sanasi
   ham shu yerda. */
const SAVDO_MIJOZLAR = {
  "AK-2025/1187": {bosqich: "tayyorlanmoqda", korik: 1,
    mijozlar: [["«Baraka Tekstil» MChJ", "B2B mijoz", "korik", "Ko'rik 26-avg"]]},
  "AK-2025/0934": {bosqich: "korik", korik: 2,
    mijozlar: [["«Turon Retail» MChJ", "B2B mijoz", "muzokara", "Muzokarada"],
               ["Qodirova Malika", "+998 93 555-66-77", "korik", "Ko'rik 27-avg"]]},
  "AK-2024/0286": {mijozlar: [["«Sifat Qurilish» MChJ", "B2B mijoz", "korik", "Ko'rik 25-avg"],
                              ["Aliyev Kamron", "+998 90 777-88-99", "korik", "Ko'rik 28-avg"]]},
  "AK-2024/0512": {mijozlar: [["«Turon Retail» MChJ", "B2B mijoz · G'olib taklif", "tayyor", "Hujjatlar tayyorlanmoqda"]]}
};
/* Savdo sanalari lot bo'yicha */
Object.assign(SAVDO_MIJOZLAR["AK-2025/0934"] = SAVDO_MIJOZLAR["AK-2025/0934"] || {}, {savdoSana: "09-sen, 2026"});
Object.assign(SAVDO_MIJOZLAR["AK-2024/0286"] = SAVDO_MIJOZLAR["AK-2024/0286"] || {}, {savdoSana: "12-sen, 2026"});
Object.assign(SAVDO_MIJOZLAR["AK-2024/0512"] = SAVDO_MIJOZLAR["AK-2024/0512"] || {}, {savdoSana: "05-sen, 2026"});

/* ---------- Qarzdor bilan muloqot tarixi (ТЗ 4.2) ----------
   Kanal + sana + qisqa natija. Kartochkada ko'rsatiladi. */
const MULOQOTLAR = {
  "AK-2026/4471": [
    ["21-avg, 2026", "Telefon", "Qarzdor to'lovni 30-avgustgacha va'da qildi"],
    ["12-avg, 2026", "Yozma talabnoma", "Ijro hujjati muddati haqida ogohlantirildi"]],
  "AK-2025/1187": [
    ["19-avg, 2026", "Uchrashuv", "Rahbariyat bilan muzokara \u2014 kelishuvga erishilmadi"],
    ["05-avg, 2026", "Telefon", "Buxgalteriya bog'lanishga va'da berdi, natija yo'q"]],
  "AK-2026/2210": [
    ["23-avg, 2026", "Telefon", "To'lov jadvali taklifi yuborildi, javob kutilmoqda"],
    ["10-avg, 2026", "SMS", "Kechikish haqida eslatma yetkazildi"]],
  "AK-2025/0934": [
    ["15-avg, 2026", "Yozma talabnoma", "Auksion e'loni haqida rasmiy xabarnoma"],
    ["02-avg, 2026", "Telefon", "Aloqa o'rnatilmadi \u2014 raqam javob bermaydi"]],
  "AK-2026/5512": [
    ["20-avg, 2026", "Telefon", "Qarzdor avtomobilni ixtiyoriy topshirishga rozi"],
    ["08-avg, 2026", "Uchrashuv", "Saqlash maydonchasida holat ko'rigi birga o'tkazildi"]],
  "AK-2026/3308": [
    ["18-avg, 2026", "Yozma talabnoma", "Ruxsatsiz ijara bo'yicha tushuntirish so'raldi"],
    ["06-avg, 2026", "Telefon", "Qarzdor ijarani rad etdi \u2014 ko'rik dalili bor"]],
  "AK-2025/0755": [
    ["16-avg, 2026", "Telefon", "Qaror ijrosi bosqichi haqida xabardor qilindi"],
    ["01-avg, 2026", "Yozma talabnoma", "Chegara belgilarini tiklash talabi yuborildi"]],
  "AK-2026/0141": [
    ["22-avg, 2026", "Telefon", "Suv bosishi bo'yicha sug'urta jarayoni tushuntirildi"],
    ["11-avg, 2026", "SMS", "90 kunlik muddat tugashi haqida eslatma"]]
};

/* ---------- Tasdiqlar: kelishuv so'rovlari ----------
   joyIchi bo'lsa — obyekt ichidagi joy, aks holda bank ofisi (reyestrda yo'q). */
const TASDIQLAR = [
  {ikon:"i-grafik", tile:"yashil", sarlavha:"Baholash buyurtmasini tasdiqlash", org:"\u00abExpert Baho\u00bb MChJ", sub:"Navbatdan tashqari qayta baholash",
   vaqt:"Bugun, 14:30", j:"yuqori", jm:"Shoshilinch", tavsif:"Chevrolet Malibu 2 (AK-2026/5512) qiymati 13% pasaygan. Zaxira stavkasiga ta'sirini aniqlash uchun navbatdan tashqari baholash talab qilinadi.",
   sorovchi:"Sattorov Jasur", lavozim:"Aktivlar nazorati inspektori", obyektId:"AK-2026/5512",
   ishtirokchilar:"Xolmatova Z., Yo'ldoshev A.", sessiyaTuri:"Hujjat kelishuvi",
   qoshimcha:"Baholash 5 ish kunida yakunlanadi", hujjatNomi:"baholash_buyurtma_BB-2026-0114.pdf", hujjatHajmi:"420 KB",
   sorovSana:"24-avg, 2026", javobMuddati:"25-avg, 2026", qolgan:"1 kun",
   masulNom:"Xolmatova Zulfiya", masulLavozim:"Tavakkalchilik menejeri", masulTel:"+998 88 678 90 12",
   koribNom:"Yo'ldoshev Alisher", koribLavozim:"Filial rahbari",
   nusxaNom:"Qodirova Nilufar", nusxaLavozim:"Kredit menejeri"},
  {ikon:"i-tarozi", tile:"kok", sarlavha:"Bosqich o'tkazishni tasdiqlash", org:"Yuridik departament", sub:"Ogohlantirish \u2192 Da'vo arizasi",
   vaqt:"Bugun, 16:00", j:"yuqori", jm:"Shoshilinch", tavsif:"Chorvoq dala hovlisi (AK-2026/0141) bo'yicha 90 kunlik talabnoma muddati o'tdi. Da'vo arizasi bosqichiga o'tkazish tasdiqlanishi kerak.",
   sorovchi:"Qodirova Nilufar", lavozim:"Kredit menejeri", obyektId:"AK-2026/0141",
   ishtirokchilar:"Rahimov B., Yo'ldoshev A.", sessiyaTuri:"Bosqich tasdig'i",
   qoshimcha:"Da'vo summasi 38,6 mln so'm", hujjatNomi:"davo_loyiha_GR-2026-0141.docx", hujjatHajmi:"180 KB",
   sorovSana:"23-avg, 2026", javobMuddati:"26-avg, 2026", qolgan:"2 kun",
   masulNom:"Rahimov Bekzod", masulLavozim:"Yurist", masulTel:"+998 97 567 89 01",
   koribNom:"Yo'ldoshev Alisher", koribLavozim:"Filial rahbari",
   nusxaNom:"Sattorov Jasur", nusxaLavozim:"Aktivlar nazorati inspektori"},
  {ikon:"i-bolg", tile:"binafsha", sarlavha:"Auksion boshlang'ich narxini tasdiqlash", org:"Realizatsiya guruhi", sub:"Lot NP-2026/0934",
   vaqt:"27-avg, 10:00", j:"orta", jm:"Rejali", tavsif:"Navruz Plaza savdo maydoni uchun boshlang'ich narx 1,48 mlrd so'm \u2014 25.03.2026 baholangan qiymatga teng (Д-4).",
   sorovchi:"Karimova Feruza", lavozim:"Aktivlar nazorati inspektori", obyektId:"AK-2025/0934",
   ishtirokchilar:"Rahimov B., Yo'ldoshev A.", sessiyaTuri:"Lot rasmiylashtirish",
   qoshimcha:"E'lon 28-avgustda chiqadi", hujjatNomi:"lot_hujjatlari_NP-2026-0934.pdf", hujjatHajmi:"2,8 MB",
   sorovSana:"22-avg, 2026", javobMuddati:"27-avg, 2026", qolgan:"3 kun",
   masulNom:"Rahimov Bekzod", masulLavozim:"Yurist", masulTel:"+998 97 567 89 01",
   koribNom:"Yo'ldoshev Alisher", koribLavozim:"Filial rahbari",
   nusxaNom:"Xolmatova Zulfiya", nusxaLavozim:"Tavakkalchilik menejeri"},
  {ikon:"i-aktiv", tile:"sariq", sarlavha:"Hisobdan chiqarishni ko'rib chiqish", org:"Tavakkalchilik departamenti", sub:"Qoplanmagan qoldiq",
   vaqt:"29-avg, 15:00", j:"orta", jm:"Rejali", tavsif:"Zarafshon Tekstil sexi (AK-2025/1187) bo'yicha realizatsiyadan keyin qoplanmay qolishi kutilayotgan 286 mln so'm qoldiqni zaxira hisobidan chiqarish taklifi.",
   sorovchi:"Xolmatova Zulfiya", lavozim:"Tavakkalchilik menejeri", obyektId:"AK-2025/1187",
   ishtirokchilar:"Rahimov B., Yo'ldoshev A., boshqaruv qo'mitasi", sessiyaTuri:"Qo'mita muhokamasi",
   qoshimcha:"Boshqaruv qo'mitasi yig'ilishida ko'riladi", hujjatNomi:"hisobdan_chiqarish_HC-2026-0034.pdf", hujjatHajmi:"1,4 MB",
   sorovSana:"21-avg, 2026", javobMuddati:"29-avg, 2026", qolgan:"5 kun",
   masulNom:"Rahimov Bekzod", masulLavozim:"Yurist", masulTel:"+998 97 567 89 01",
   koribNom:"Yo'ldoshev Alisher", koribLavozim:"Filial rahbari",
   nusxaNom:"Qodirova Nilufar", nusxaLavozim:"Kredit menejeri"}
];

TASDIQLAR.forEach(t => { if (t.obyektId) t.joy = obyektNomi(t.obyektId, true); });

/* ---------- Yer uchastkalari ----------
   kod reyestrdagi obyektga to'g'ri kelsa — status ish bosqichidan olinadi (Д-2). */
const UCHASTKALAR = [
  {kod:"AK-2025/0755", tuman:"Qibray tumani", viloyat:"Toshkent viloyati", maydon:"2.40 gektar", status:"Musodara jarayonida", srang:"#E8763C", narx:"37,1 ming so'm/m²",
   kadastr:"11:09:03:02:0012", yerturi:"Qishloq xo'jaligi yerlari", jami:"890 000 000 so'm"},
  {kod:"AK-2024/0331", tuman:"Zangiota tumani", viloyat:"Toshkent viloyati", maydon:"8.75 gektar", status:"Nazoratda", srang:"#059669", narx:"180 ming so'm/m²",
   kadastr:"11:07:12:01:0044", yerturi:"Zaxira yerlar", jami:"15 750 000 000 so'm"},
  {kod:"AK-2024/0197", tuman:"Yuqorichirchiq tumani", viloyat:"Toshkent viloyati", maydon:"15.20 gektar", status:"Auksionda", srang:"#8B5CF6", narx:"260 ming so'm/m²",
   kadastr:"11:12:05:03:0090", yerturi:"Qurilish yerlari", jami:"39 520 000 000 so'm"},
  {kod:"AK-2024/0640", tuman:"Ohangaron tumani", viloyat:"Toshkent viloyati", maydon:"23.10 gektar", status:"Ta'minotda", srang:"#7BAEFC", narx:"160 ming so'm/m²",
   kadastr:"11:04:08:02:0110", yerturi:"Qishloq xo'jaligi yerlari", jami:"36 960 000 000 so'm"},
  {kod:"AK-2025/0288", tuman:"Parkent tumani", viloyat:"Toshkent viloyati", maydon:"5.60 gektar", status:"Ta'minotda", srang:"#7BAEFC", narx:"150 ming so'm/m²",
   kadastr:"11:09:01:07:0021", yerturi:"Zaxira yerlar", jami:"8 400 000 000 so'm"},
  {kod:"AK-2024/0072", tuman:"Bekobod tumani", viloyat:"Toshkent viloyati", maydon:"10.00 gektar", status:"Nazoratda", srang:"#059669", narx:"290 ming so'm/m²",
   kadastr:"11:02:11:04:0067", yerturi:"Sanoat yerlari", jami:"29 000 000 000 so'm"}
];
UCHASTKALAR.forEach(u => {
  const y = YOZUVLAR.find(z => z.id === u.kod);
  if (y) { u.status = y.holat.nom; u.srang = y.holat.rang; }
});

/* ---------- Vazifalar navbati va shaxsiy vazifalar ---------- */
const NAVBAT = [
  {nom:"Baholash buyurtmasi", kod:"\u2116 BB-2026-0114", summa:"12 000 000 so'm", firma:"\u00abExpert Baho\u00bb MChJ",
   muddat:"Bugun", soat:"14:30", shosh:true, faol:true,
   izoh:"AK-2026/5512 bo'yicha navbatdan tashqari qayta baholash \u2014 qiymat 13% pasaygan.",
   qadamlar:[
    ["bajarildi","Buyurtma shakllantirildi","Sattorov Jasur","24-avg, 09:15","Yuborildi"],
    ["joriy","Tavakkalchilik xulosasi","Xolmatova Zulfiya","","Kutilmoqda"],
    ["kutish","Filial rahbari tasdig'i","Yo'ldoshev Alisher","","Kutilmoqda"]
   ],
   tarix:[
    ["24-avg, 09:15","Sattorov Jasur","Buyurtma loyihasi tayyorlandi va kelishuvga yuborildi."],
    ["24-avg, 10:02","Tizim","Keyingi bosqich: Tavakkalchilik xulosasi (Xolmatova Zulfiya)"]
   ],
   malumot:{turi:"Baholash buyurtmasi", asos:"Qiymatning jadal pasayishi (#GH-2026-00209)",
            obyekt:"Chevrolet Malibu 2 \u00b7 AK-2026/5512", ijrochi:"\u00abExpert Baho\u00bb MChJ", muddatIsh:"5 ish kuni"}},
  {nom:"Bosqich o'tkazish tasdig'i", kod:"\u2116 BO-2026-0451", summa:"38 600 000 so'm", firma:"Chorvoq dala hovlisi",
   muddat:"Bugun", soat:"16:00", shosh:true, faol:false,
   izoh:"AK-2026/0141 \u2014 ogohlantirishdan da'vo bosqichiga o'tkazish. Yozma talabnoma muddati o'tdi.",
   qadamlar:[
    ["bajarildi","Kredit menejeri taklifi","Qodirova Nilufar","23-avg, 17:40","Yuborildi"],
    ["joriy","Yuridik xulosa","Rahimov Bekzod","","Kutilmoqda"],
    ["kutish","Filial rahbari tasdig'i","Yo'ldoshev Alisher","","Kutilmoqda"]
   ],
   tarix:[["23-avg, 17:40","Qodirova Nilufar","90 kunlik muddat tugadi, da'vo bosqichi taklif qilindi."]],
   malumot:{turi:"Bosqich o'tkazish", asos:"To'lov jadvalining buzilishi \u2014 34 kun kechikish",
            obyekt:"Chorvoq dala hovlisi \u00b7 AK-2026/0141", ijrochi:"Yuridik departament", muddatIsh:"3 ish kuni"}},
  {nom:"Sug'urta uzaytirish talabi", kod:"\u2116 SU-2026-0223", summa:"1 480 000 000 so'm", firma:"Alfa Invest sug'urta",
   muddat:"Ertaga", soat:"11:00", shosh:false, faol:false,
   izoh:"AK-2025/0934 polisi muddati o'tgan \u2014 auksion bosqichidagi obyekt qamrovsiz qolgan.",
   qadamlar:[
    ["bajarildi","Hodisa qayd etildi","Qodirova Nilufar","24-avg, 13:48","Ochildi"],
    ["joriy","Qarzdorga talabnoma","Qodirova Nilufar","","Tayyorlanmoqda"],
    ["kutish","Nazorat yopilishi","Sattorov Jasur","","Kutilmoqda"]
   ],
   tarix:[["24-avg, 13:48","Tizim","Polis muddati o'tganligi aniqlandi (#GH-2026-00211)."]],
   malumot:{turi:"Sug'urta nazorati", asos:"Polis PL-2025/08127 muddati 11-avgustda tugagan",
            obyekt:"Navruz Plaza \u00b7 AK-2025/0934", ijrochi:"Muammoli kreditlar boshqarmasi", muddatIsh:"7 kun"}},
  {nom:"Auksion boshlang'ich narxi", kod:"\u2116 AN-2026-0087", summa:"1 480 000 000 so'm", firma:"Navruz Plaza",
   muddat:"27-avg", soat:"10:00", shosh:false, faol:false,
   izoh:"Boshlang'ich narx joriy baholangan qiymatga tenglashtiriladi (Д-4).",
   qadamlar:[
    ["bajarildi","Baholash hisoboti biriktirildi","Karimova Feruza","22-avg, 15:20","Tasdiqlandi"],
    ["joriy","Yurist kelishuvi","Rahimov Bekzod","","Kutilmoqda"],
    ["kutish","Filial rahbari tasdig'i","Yo'ldoshev Alisher","","Kutilmoqda"]
   ],
   tarix:[["22-avg, 15:20","Karimova Feruza","25.03.2026 baholash hisoboti lot hujjatlariga kiritildi."]],
   malumot:{turi:"Lot rasmiylashtirish", asos:"Sud qarori 2-0876/2026, ijro hujjati IH-2026/0934",
            obyekt:"Navruz Plaza \u00b7 AK-2025/0934", ijrochi:"Realizatsiya guruhi", muddatIsh:"5 ish kuni"}},
  {nom:"Hisobdan chiqarish taklifi", kod:"\u2116 HC-2026-0034", summa:"286 000 000 so'm", firma:"Zarafshon Tekstil sexi",
   muddat:"29-avg", soat:"15:00", shosh:false, faol:false,
   izoh:"Realizatsiyadan keyin qoplanmay qolgan qoldiqni zaxira hisobidan chiqarish.",
   qadamlar:[
    ["bajarildi","Tavakkalchilik hisob-kitobi","Xolmatova Zulfiya","21-avg, 12:10","Tayyor"],
    ["joriy","Yuridik xulosa","Rahimov Bekzod","","Kutilmoqda"],
    ["kutish","Boshqaruv qo'mitasi","Yo'ldoshev Alisher","","Kutilmoqda"]
   ],
   tarix:[["21-avg, 12:10","Xolmatova Zulfiya","Qoplanmagan qoldiq bo'yicha hujjatlar to'plami shakllantirildi."]],
   malumot:{turi:"Hisobdan chiqarish", asos:"Zaxira 100% shakllantirilgan, undiruv imkoniyatlari tugagan",
            obyekt:"Zarafshon Tekstil sexi \u00b7 AK-2025/1187", ijrochi:"Tavakkalchilik departamenti", muddatIsh:"10 ish kuni"}}
];

const MENING_VAZIFALARIM = [
  {nom:"Ko'rik dalolatnomasini imzolatish", tur:"Aktivlar nazorati", kod:"KO-2026/0391", sana:"2026-08-24", vaqt:"15:00", bugunmi:true, ikon:"i-hujjat", muhimlik:"yuqori", ijrochi:"Sattorov J."},
  {nom:"Qarzdor bilan muzokara", tur:"Portfel", kod:"AK-2026/2210", sana:"2026-08-24", vaqt:"17:30", bugunmi:true, ikon:"i-foyd", muhimlik:"orta", ijrochi:"Qodirova N."},
  {nom:"Sug'urta talabnomasini yuborish", tur:"Nazorat", kod:"AK-2025/0934", sana:"2026-08-25", vaqt:"", bugunmi:false, ikon:"i-qalqon", muhimlik:"yuqori", ijrochi:"Qodirova N."},
  {nom:"Kadastr ma'lumotini yangilash", tur:"Hujjatlar", kod:"AK-2025/0755", sana:"2026-08-26", vaqt:"", bugunmi:false, ikon:"i-yer", muhimlik:"past", ijrochi:"Karimova F."}
];


/* ---------- Bildirishnomalar ---------- */
const BILDIRISHLAR = [
  {ikon:"i-grafik", t:"Tasdiqlar", sarlavha:"Baholash buyurtmasi kelishuvda", matn:"AK-2026/5512 bo'yicha buyurtma (\u2116 BB-2026-0114) tavakkalchilik xulosasini kutmoqda.", vaqt:"14:30", yangi:true, havola:"vazifalar.html"},
  {ikon:"i-ogoh", t:"Aktiv hodisasi", sarlavha:"Sug'urta polisi muddati o'tdi", matn:"Navruz Plaza (AK-2025/0934) auksion bosqichida qamrovsiz qoldi \u2014 talabnoma tayyorlanmoqda.", vaqt:"13:48", yangi:true, havola:"hodisalar.html"},
  {ikon:"i-tashrif", t:"Ko'rik rejasi", sarlavha:"Ko'rik muddati o'tdi", matn:"Chorvoq dala hovlisi bo'yicha navbatdan tashqari ko'rik (KO-2026/0398) o'tkazilmadi \u2014 qayta tayinlang.", vaqt:"12:05", yangi:true, havola:"korik-rejasi.html"},
  {ikon:"i-tarozi", t:"Yuridik ish", sarlavha:"Ijro hujjati muddati yaqinlashmoqda", matn:"AK-2026/4471 bo'yicha ijro hujjati muddatiga 4 kun qoldi.", vaqt:"11:20", yangi:false, havola:"undiruv.html"},
  {ikon:"i-aktiv", t:"Nazorat indeksi", sarlavha:"Indeks pasayish chegarasida", matn:"AK-2026/0141 bo'yicha nazorat indeksi 62% ga tushdi \u2014 hujjatlar to'liq emas va ko'rik muddati yaqinlashdi.", vaqt:"10:40", yangi:false, havola:"obyektlar.html"},
  {ikon:"i-bolg", t:"Kirish nazorati", sarlavha:"Kirish nuqtasi aloqadan chiqdi", matn:"Sergeli logistika ombori \u2014 yuk darvozasi kontrolleri 40 daqiqadan beri javob bermayapti.", vaqt:"09:15", yangi:false, havola:"kirish-nazorati.html"}
];


/* ---------- Audit jurnali: o'zgarmas yozuv, matn qayta hisoblanmaydi (ТЗ 8) ---------- */
const AMALLAR_JURNALI = [
  {vaqt:"24-avg, 14:20", ism:"Sattorov Jasur", rol:"Aktivlar nazorati mutaxassisi", amal:`Hodisani "Bartaraf etilmoqda" ustuniga ko'chirdi`, obyekt:"#GH-2026-00204 \u2014 Yunusobod 12-kvartal, 45-uy (kommunal qarzdorlik)"},
  {vaqt:"24-avg, 13:55", ism:"Karimova Feruza", rol:"Aktivlar nazorati mutaxassisi", amal:"Ko'rik dalolatnomasini rasmiylashtirdi", obyekt:"KO-2026/0391 \u2014 Navruz Plaza"},
  {vaqt:"24-avg, 12:10", ism:"Yo'ldoshev Alisher", rol:"Filial rahbari", amal:"Baholash buyurtmasini tasdiqladi", obyekt:"AK-2026/5512 \u2014 Chevrolet Malibu 2"},
  {vaqt:"24-avg, 11:32", ism:"Ismoilov Otabek", rol:"Administrator", amal:`Foydalanuvchi rolini o'zgartirdi: "Kredit menejeri" \u2192 "Aktivlar nazorati mutaxassisi"`, obyekt:"Nilufar Ismoilova \u00b7 U056789013"},
  {vaqt:"24-avg, 11:04", ism:"Xolmatova Zulfiya", rol:"Tavakkalchilik menejeri", amal:"Tasnif toifasini qayta ko'rib chiqdi", obyekt:"AK-2026/5512 \u2014 Substandart toifasi tasdiqlandi"},
  {vaqt:"24-avg, 10:40", ism:"Nilufar Ismoilova", rol:"Aktivlar nazorati mutaxassisi", amal:"Hujjat yukladi", obyekt:"Baholash hisobot.pdf \u2014 Nurafshon turar-joy majmuasi"},
  {vaqt:"24-avg, 10:15", ism:"Yo'ldoshev Alisher", rol:"Filial rahbari", amal:"Ko'rik rejasini tasdiqladi", obyekt:"2026-yil sentabr oyi rejasi \u2014 12 chiqish"},
  {vaqt:"24-avg, 09:12", ism:"Sattorov Jasur", rol:"Aktivlar nazorati mutaxassisi", amal:"Yangi hodisa qayd etdi", obyekt:"#GH-2026-00213 \u2014 Zarafshon Tekstil sexi (uskunalar kamomadi)"},
  {vaqt:"24-avg, 08:47", ism:"Rahimov Bekzod", rol:"Yurist", amal:"Da'vo arizasi loyihasini biriktirdi", obyekt:"UI-2026/0503 \u2014 AK-2026/0141"},
  {vaqt:"23-avg, 22:48", ism:"Jahongir Otajonov", rol:"Kredit menejeri", amal:"Xato parol bilan kirishga urindi (3 marta)", obyekt:"IP 91.204.239.18"},
  {vaqt:"23-avg, 16:05", ism:"Sattorov Jasur", rol:"Aktivlar nazorati mutaxassisi", amal:"Hisobotni eksport qildi", obyekt:"Monitoring hisoboti \u2014 PDF"},
  {vaqt:"23-avg, 15:30", ism:"Qodirova Nilufar", rol:"Kredit menejeri", amal:"Qarzdor bilan muzokara natijasini kiritdi", obyekt:"AK-2026/2210 \u2014 to'lov jadvali taklifi"},
  {vaqt:"23-avg, 14:12", ism:"Xolmatova Zulfiya", rol:"Tavakkalchilik menejeri", amal:"Zaxira hisobotini shakllantirdi", obyekt:"2026-yil avgust \u2014 tasnif kesimi"},
  {vaqt:"23-avg, 11:26", ism:"Ismoilov Otabek", rol:"Administrator", amal:"Ikki bosqichli autentifikatsiyani majburiy qildi", obyekt:"Ikki bosqichli autentifikatsiya \u2014 Tizim parametrlari"}
];




/* ---------- Foydalanuvchilar, hisobotlar, hududlar, auksion bosqichlari ---------- */
const FOYDLAR = [
  {nom:"Ismoilov Otabek", rol:"Administrator", teg:"admin", login:"o.ismoilov", bolim:"Axborot texnologiyalari departamenti", faol:true, id:"U056789011", email:"o.ismoilov@mkbank.uz", lavozim:"Tizim ma'muri", tel:"+998 90 000 00 00", sana:"01-yan, 2021", rasm:"assets/xodim_1.webp"},
  {nom:"Yo'ldoshev Alisher", rol:"Filial rahbari", teg:"filial", login:"a.yoldoshev", bolim:"Yunusobod filiali", faol:true, id:"U056789012", email:"a.yoldoshev@mkbank.uz", lavozim:"Filial boshqaruvchisi", tel:"+998 91 375 29 46", sana:"04-mar, 2022", rasm:"assets/xodim_2.webp"},
  {nom:"Ismoilova Nilufar", rol:"Obyekt menejeri", teg:"obyekt", login:"n.ismoilova", bolim:"Muammoli aktivlar bo'limi", faol:true, id:"U056789013", email:"n.ismoilova@mkbank.uz", lavozim:"Katta mutaxassis", tel:"+998 92 640 48 82", sana:"07-may, 2023", rasm:"assets/xodim_3.webp"},
  {nom:"Sattorov Javohir", rol:"Ko'rik inspektori", teg:"nazorat", login:"j.sattorov", bolim:"Aktivlar nazorati bo'limi", faol:true, id:"U056789014", email:"j.sattorov@mkbank.uz", lavozim:"Ko'rik inspektori", tel:"+998 93 915 67 28", sana:"10-iyl, 2024", rasm:"assets/xodim_4.webp"},
  {nom:"Karimova Feruza", rol:"Ko'rik inspektori", teg:"nazorat", login:"f.karimova", bolim:"Aktivlar nazorati bo'limi", faol:true, id:"U056789015", email:"f.karimova@mkbank.uz", lavozim:"Yetakchi inspektor", tel:"+998 94 280 86 64", sana:"13-sen, 2025", rasm:"assets/xodim_5.webp"},
  {nom:"Nazarov Aziz", rol:"Baholovchi mutaxassis", teg:"baholash", login:"a.nazarov", bolim:"Baholash bo'limi", faol:true, id:"U056789016", email:"a.nazarov@mkbank.uz", lavozim:"Baholovchi", tel:"+998 95 555 05 00", sana:"16-noy, 2021", rasm:"assets/xodim_6.webp"},
  {nom:"Sobirov Ulug'bek", rol:"Yurist", teg:"yurist", login:"u.sobirov", bolim:"Yuridik departament", faol:true, id:"U056789017", email:"u.sobirov@mkbank.uz", lavozim:"Bosh yurist", tel:"+998 96 820 24 46", sana:"19-yan, 2022", rasm:"assets/xodim_7.webp"},
  {nom:"Tosheva Barno", rol:"Obyekt menejeri", teg:"obyekt", login:"b.tosheva", bolim:"Muammoli aktivlar bo'limi", faol:true, id:"U056789018", email:"b.tosheva@mkbank.uz", lavozim:"Mutaxassis", tel:"+998 97 195 43 82", sana:"22-mar, 2023", rasm:"assets/xodim_8.webp"},
  {nom:"Ergashev Botir", rol:"Filial rahbari", teg:"filial", login:"b.ergashev", bolim:"Chilonzor filiali", faol:true, id:"U056789019", email:"b.ergashev@mkbank.uz", lavozim:"Filial boshqaruvchisi", tel:"+998 98 460 62 28", sana:"25-may, 2024", rasm:"assets/xodim_9.webp"},
  {nom:"Xolmatova Sevara", rol:"Baholovchi mutaxassis", teg:"baholash", login:"s.xolmatova", bolim:"Baholash bo'limi", faol:false, id:"U056789020", email:"s.xolmatova@mkbank.uz", lavozim:"Katta baholovchi", tel:"+998 99 735 81 64", sana:"28-iyl, 2025", rasm:"assets/xodim_10.webp"},
];

const HISOBOTLAR = [
  {nom:"Oylik portfel hisoboti", sub:"Muammoli aktivlar dinamikasi, bosqichlar kesimi", format:"PDF", sana:"31-iyl, 2026", soat:"09:00", tur:"portfel", hajm:"2,4 MB",
   daromad:"58,4", daromadD:8.2, xarajat:"6,2", xarajatD:-3.1, foyda:"52,2", foydaD:9.6, indeks:"87", indeksD:2.1, grafik:[42,48,45,52,58,54,61,58]},
  {nom:"Undiruv samaradorligi", sub:"Bosqichlar bo'yicha o'tish muddatlari va tushum", format:"XLSX", sana:"31-iyl, 2026", soat:"09:00", tur:"undiruv", hajm:"1,1 MB",
   daromad:"31,7", daromadD:5.4, xarajat:"2,8", xarajatD:1.2, foyda:"28,9", foydaD:6.1, indeks:"91", indeksD:1.4, grafik:[35,38,36,41,44,47,45,49]},
  {nom:"Aktivlar nazorati hisoboti", sub:"Ko'riklar, sug'urta qamrovi, baholash dolzarbligi", format:"PDF", sana:"31-iyl, 2026", soat:"09:30", tur:"nazorat", hajm:"3,2 MB",
   daromad:"87,7", daromadD:1.8, xarajat:"94,2", xarajatD:0.6, foyda:"85,2", foydaD:2.2, indeks:"88", indeksD:0.9, grafik:[82,84,83,86,85,87,88,88]},
  {nom:"Tasnif va zaxira hisoboti", sub:"Toifalar kesimi, zaxira yuki, migratsiya", format:"XLSX", sana:"31-iyl, 2026", soat:"10:00", tur:"zaxira", hajm:"0,9 MB",
   daromad:"6,71", daromadD:4.2, xarajat:"0,29", xarajatD:-1.8, foyda:"95,9", foydaD:0.4, indeks:"96", indeksD:0.3, grafik:[88,90,89,92,94,93,95,96]},
  {nom:"Realizatsiya hisoboti", sub:"Lotlar, savdo natijalari, tushum", format:"PDF", sana:"30-iyl, 2026", soat:"11:00", tur:"realizatsiya", hajm:"1,8 MB",
   daromad:"12,5", daromadD:11.3, xarajat:"0,7", xarajatD:2.4, foyda:"11,8", foydaD:12.0, indeks:"84", indeksD:3.2, grafik:[28,32,30,38,42,40,47,52]},
  {nom:"Boshqaruv taqdimoti", sub:"Rahbariyat uchun oylik yig'ma taqdimot", format:"PPTX", sana:"30-iyl, 2026", soat:"14:00", tur:"portfel", hajm:"5,6 MB",
   daromad:"58,4", daromadD:8.2, xarajat:"6,2", xarajatD:-3.1, foyda:"52,2", foydaD:9.6, indeks:"87", indeksD:2.1, grafik:[42,48,45,52,58,54,61,58]}
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
  ["elon","E'lon qilingan","#4338CA"],
  ["korik","Ko'rik / Muzokara","#4F46E5"],
  ["rasmiylashtirish","Rasmiylashtirish","#8B5CF6"]
];

/* ---------- Rejalashtirilgan hisobotlar va KPI asosi ---------- */
const AVTO = [
  ["Oylik portfel hisoboti","Har oy","01-sen, 2026","09:00","+3"],
  ["Haftalik nazorat hisoboti","Har hafta","31-avg, 2026","09:00","+2"],
  ["Kvartalik tasnif va zaxira","Har kvartal","30-sen, 2026","10:00","+4"]
];

const KPI_BAZA = [
  /* YTD (yanvar–iyul 2026) — portfel miqyosi; oylik seriya bilan moslikda:
     jami = UNDIRUV_SERIYA oylik yig'indisi */
  {qiymat: 356.5, birlik: "mlrd so'm", delta: 8.2,  manfiy: false},   /* undirilgan YTD */
  {qiymat: 84.6,  birlik: "mlrd so'm", delta: 12.4, manfiy: false},   /* realizatsiya tushumi YTD */
  {qiymat: 9.3,   birlik: "mlrd so'm", delta: -3.1, manfiy: true},    /* nazorat xarajatlari YTD */
  {qiymat: 347.2, birlik: "mlrd so'm", delta: 9.6,  manfiy: false}    /* sof qoplama YTD */
];

/* Undiruv dinamikasi — 2026 yil oylari (mlrd so'm). Choraklar va yillik
   YTD shu qatordan YIG'ILADI, alohida yozilmaydi (Д-7). */
const UNDIRUV_SERIYA = {
  oylik: {yorliq: ["Yan","Fev","Mar","Apr","May","Iyn","Iyl"],
          qiymat: [42.1, 47.3, 44.8, 52.2, 57.6, 54.1, 58.4]},
  yillik: {yorliq: ["2023","2024","2025"], qiymat: [318.6, 389.7, 412.3]}
};



/* ---------- Xarita nuqtalari: portfelning geo-namoyishi ----------
   8 ta batafsil yozuv haqiqiy koordinatalari bilan (kod!=null — kartochkaga
   bog'lanadi), qolganlari tuman/shahar guruhlari bo'yicha joylashtirilgan.
   Klaster ko'rinishi guruh maydoniga qarab hisoblanadi. */
const XARITA_NUQTALARI = [
  {kod:null, nom:"Yunusobod, ta'minot avtotransporti", tur:"Avtotransport", holat:"Ta'minotda", lat:41.356, lng:69.2838, guruh:"Yunusobod"},
  {kod:null, nom:"Yunusobod, ko'p qavatli uy xonadoni", tur:"Kvartira", holat:"Ta'minotda", lat:41.3719, lng:69.2823, guruh:"Yunusobod"},
  {kod:null, nom:"Yunusobod, 2-xonali xonadon", tur:"Kvartira", holat:"Ta'minotda", lat:41.3818, lng:69.2826, guruh:"Yunusobod"},
  {kod:null, nom:"Yunusobod, dala hovli", tur:"Turar-joy", holat:"Musodara jarayonida", lat:41.3673, lng:69.2704, guruh:"Yunusobod"},
  {kod:null, nom:"Yunusobod, savdo do'koni", tur:"Tijorat", holat:"Musodara jarayonida", lat:41.3599, lng:69.295, guruh:"Yunusobod"},
  {kod:null, nom:"Chilonzor, 2-xonali xonadon", tur:"Kvartira", holat:"Ta'minotda", lat:41.2868, lng:69.1842, guruh:"Chilonzor"},
  {kod:null, nom:"Chilonzor, savdo do'koni", tur:"Tijorat", holat:"Ta'minotda", lat:41.2679, lng:69.2076, guruh:"Chilonzor"},
  {kod:null, nom:"Chilonzor, 3-xonali xonadon", tur:"Kvartira", holat:"Ta'minotda", lat:41.2719, lng:69.2111, guruh:"Chilonzor"},
  {kod:null, nom:"Chilonzor, yer uchastkasi", tur:"Yer uchastkasi", holat:"Musodara jarayonida", lat:41.271, lng:69.2004, guruh:"Chilonzor"},
  {kod:null, nom:"Chilonzor, 3-xonali xonadon", tur:"Kvartira", holat:"Ta'minotda", lat:41.2811, lng:69.2059, guruh:"Chilonzor"},
  {kod:null, nom:"Mirobod, ishlab chiqarish sexi", tur:"Ishlab chiqarish", holat:"Musodara jarayonida", lat:41.2964, lng:69.257, guruh:"Mirobod"},
  {kod:null, nom:"Mirobod, savdo do'koni", tur:"Tijorat", holat:"Nazoratda", lat:41.2714, lng:69.2824, guruh:"Mirobod"},
  {kod:null, nom:"Mirobod, yer uchastkasi", tur:"Yer uchastkasi", holat:"Nazoratda", lat:41.2852, lng:69.2731, guruh:"Mirobod"},
  {kod:null, nom:"Mirobod, yer uchastkasi", tur:"Yer uchastkasi", holat:"Nazoratda", lat:41.2727, lng:69.2738, guruh:"Mirobod"},
  {kod:null, nom:"Yakkasaroy, yer uchastkasi", tur:"Yer uchastkasi", holat:"Ta'minotda", lat:41.3053, lng:69.2386, guruh:"Yakkasaroy"},
  {kod:null, nom:"Yakkasaroy, ta'minot avtotransporti", tur:"Avtotransport", holat:"Ta'minotda", lat:41.2916, lng:69.2402, guruh:"Yakkasaroy"},
  {kod:null, nom:"Yakkasaroy, ko'p qavatli uy xonadoni", tur:"Kvartira", holat:"Ta'minotda", lat:41.2816, lng:69.2644, guruh:"Yakkasaroy"},
  {kod:null, nom:"Yakkasaroy, 2-xonali xonadon", tur:"Kvartira", holat:"Nazoratda", lat:41.2887, lng:69.2305, guruh:"Yakkasaroy"},
  {kod:null, nom:"Shayxontohur, xususiy turar-joy", tur:"Turar-joy", holat:"Ta'minotda", lat:41.3083, lng:69.2121, guruh:"Shayxontohur"},
  {kod:null, nom:"Shayxontohur, 3-xonali xonadon", tur:"Kvartira", holat:"Ta'minotda", lat:41.3374, lng:69.2466, guruh:"Shayxontohur"},
  {kod:null, nom:"Shayxontohur, ta'minot avtotransporti", tur:"Avtotransport", holat:"Ta'minotda", lat:41.3219, lng:69.226, guruh:"Shayxontohur"},
  {kod:null, nom:"Shayxontohur, ishlab chiqarish sexi", tur:"Ishlab chiqarish", holat:"Ta'minotda", lat:41.3374, lng:69.2274, guruh:"Shayxontohur"},
  {kod:null, nom:"Sergeli, umumiy ovqatlanish obyekti", tur:"Tijorat", holat:"Ta'minotda", lat:41.2324, lng:69.2175, guruh:"Sergeli"},
  {kod:null, nom:"Sergeli, yer uchastkasi", tur:"Yer uchastkasi", holat:"Ta'minotda", lat:41.2359, lng:69.2352, guruh:"Sergeli"},
  {kod:null, nom:"Sergeli, 2-xonali xonadon", tur:"Kvartira", holat:"Ta'minotda", lat:41.2181, lng:69.2198, guruh:"Sergeli"},
  {kod:null, nom:"Sergeli, ko'p qavatli uy xonadoni", tur:"Kvartira", holat:"Ta'minotda", lat:41.2162, lng:69.2264, guruh:"Sergeli"},
  {kod:null, nom:"Yashnobod, xususiy turar-joy", tur:"Turar-joy", holat:"Nazoratda", lat:41.278, lng:69.3511, guruh:"Yashnobod"},
  {kod:null, nom:"Yashnobod, xususiy turar-joy", tur:"Turar-joy", holat:"Ta'minotda", lat:41.3101, lng:69.3356, guruh:"Yashnobod"},
  {kod:null, nom:"Yashnobod, umumiy ovqatlanish obyekti", tur:"Tijorat", holat:"Ta'minotda", lat:41.2981, lng:69.3195, guruh:"Yashnobod"},
  {kod:null, nom:"Olmazor, ta'minot avtotransporti", tur:"Avtotransport", holat:"Musodara jarayonida", lat:41.36, lng:69.1832, guruh:"Olmazor"},
  {kod:null, nom:"Olmazor, ta'minot avtotransporti", tur:"Avtotransport", holat:"Ta'minotda", lat:41.3383, lng:69.1866, guruh:"Olmazor"},
  {kod:null, nom:"Olmazor, yer uchastkasi", tur:"Yer uchastkasi", holat:"Ta'minotda", lat:41.3349, lng:69.2238, guruh:"Olmazor"},
  {kod:null, nom:"Chirchiq, yer uchastkasi", tur:"Yer uchastkasi", holat:"Ta'minotda", lat:41.4717, lng:69.5922, guruh:"Chirchiq"},
  {kod:null, nom:"Chirchiq, ishlab chiqarish sexi", tur:"Ishlab chiqarish", holat:"Ta'minotda", lat:41.4553, lng:69.5731, guruh:"Chirchiq"},
  {kod:null, nom:"Chirchiq, 3-xonali xonadon", tur:"Kvartira", holat:"Musodara jarayonida", lat:41.4701, lng:69.5956, guruh:"Chirchiq"},
  {kod:null, nom:"Angren, ko'p qavatli uy xonadoni", tur:"Kvartira", holat:"Nazoratda", lat:41.0273, lng:70.1509, guruh:"Angren"},
  {kod:null, nom:"Angren, umumiy ovqatlanish obyekti", tur:"Tijorat", holat:"Nazoratda", lat:41.027, lng:70.1216, guruh:"Angren"},
  {kod:null, nom:"Olmaliq, dala hovli", tur:"Turar-joy", holat:"Ta'minotda", lat:40.8614, lng:69.6108, guruh:"Olmaliq"},
  {kod:null, nom:"Olmaliq, yer uchastkasi", tur:"Yer uchastkasi", holat:"Ta'minotda", lat:40.836, lng:69.5798, guruh:"Olmaliq"},
  {kod:null, nom:"Bekobod, 3-xonali xonadon", tur:"Kvartira", holat:"Nazoratda", lat:40.2169, lng:69.2711, guruh:"Bekobod"},
  {kod:null, nom:"Bekobod, ta'minot avtotransporti", tur:"Avtotransport", holat:"Ta'minotda", lat:40.2152, lng:69.2893, guruh:"Bekobod"},
  {kod:null, nom:"Parkent, ko'p qavatli uy xonadoni", tur:"Kvartira", holat:"Ta'minotda", lat:41.306, lng:69.6793, guruh:"Parkent"},
  {kod:null, nom:"Parkent, yer uchastkasi", tur:"Yer uchastkasi", holat:"Ta'minotda", lat:41.3099, lng:69.6598, guruh:"Parkent"},
  {kod:null, nom:"Nurafshon, ko'p qavatli uy xonadoni", tur:"Kvartira", holat:"Nazoratda", lat:41.0237, lng:69.3796, guruh:"Nurafshon"},
  {kod:null, nom:"Nurafshon, savdo do'koni", tur:"Tijorat", holat:"Ta'minotda", lat:41.0268, lng:69.3467, guruh:"Nurafshon"},
  {kod:null, nom:"Samarqand, omborxona", tur:"Ishlab chiqarish", holat:"Ta'minotda", lat:39.6524, lng:66.9531, guruh:"Samarqand"},
  {kod:null, nom:"Samarqand, savdo do'koni", tur:"Tijorat", holat:"Nazoratda", lat:39.6658, lng:66.9532, guruh:"Samarqand"},
  {kod:null, nom:"Namangan, yer uchastkasi", tur:"Yer uchastkasi", holat:"Ta'minotda", lat:40.9989, lng:71.6649, guruh:"Namangan"},
  {kod:"AK-2026/4471", nom:"Yunusobod 12-kvartal, 45-uy xonadoni", tur:"Kvartira", holat:null, lat:41.3611, lng:69.2897, guruh:"Yunusobod"},
  {kod:"AK-2025/1187", nom:"Zarafshon Tekstil ishlab chiqarish sexi", tur:"Ishlab chiqarish", holat:null, lat:39.6547, lng:66.9758, guruh:"Samarqand"},
  {kod:"AK-2026/2210", nom:"Chilonzor 9-kvartal xonadoni", tur:"Kvartira", holat:null, lat:41.2795, lng:69.2054, guruh:"Chilonzor"},
  {kod:"AK-2025/0934", nom:"Navruz Plaza savdo maydoni", tur:"Tijorat", holat:null, lat:41.3111, lng:69.2797, guruh:"Mirobod"},
  {kod:"AK-2026/5512", nom:"Avtotransport saqlash maydonchasi", tur:"Avtotransport", holat:null, lat:41.2946, lng:69.2828, guruh:"Mirobod"},
  {kod:"AK-2026/3308", nom:"Nurafshon turar-joy majmuasi", tur:"Turar-joy", holat:null, lat:41.0378, lng:69.3567, guruh:"Nurafshon"},
  {kod:"AK-2025/0755", nom:"Qibray yer uchastkasi", tur:"Yer uchastkasi", holat:null, lat:41.39, lng:69.53, guruh:"Chirchiq"},
  {kod:"AK-2026/0141", nom:"Chorvoq dala hovlisi", tur:"Turar-joy", holat:null, lat:41.623, lng:69.781, guruh:"Chirchiq"}
];

/* ---------- Mosligni o'z-o'zini tekshirish (TZ 3.4, П-9) ---------- */
function moslikTekshiruvi(){
  const xato = [];
  YOZUVLAR.forEach(y => {
    if (Math.abs(y.qarz.jami - (y.qarz.asosiy + y.qarz.foiz)) > 0.05)
      xato.push(y.id + ": qarz yig'indisi mos emas");
    if (!BOSQICH_HOLAT[y.ish.bosqich])
      xato.push(y.id + ": bosqichga holat biriktirilmagan");
    if (y.ish.bosqich === "auksion" && !y.mulk.qabul)
      xato.push(y.id + ": auksionda, lekin balansga qabul sanasi yo'q");
    if (["musodara", "auksion"].includes(y.ish.bosqich) && y.ish.ijro === "Hali berilmagan")
      xato.push(y.id + ": musodara bosqichi ijro hujjatisiz");
    if (y.mulk.baho <= 0) xato.push(y.id + ": baholangan qiymat noto'g'ri");
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

  /* --- 11: toifa kechikish kunlariga, zaxira toifa stavkasiga mos --- */
  YOZUVLAR.forEach(y => {
    const t = tasnifla(y.qarz.kunlar);
    if (y.tasnif.kalit !== t.kalit)
      xato.push(y.id + ": tasnif toifasi kechikish kuniga mos emas");
    if (Math.abs(y.zaxira - +(y.qarz.jami * y.tasnif.zaxira / 100).toFixed(1)) > 0.05)
      xato.push(y.id + ": zaxira toifa stavkasidan hisoblanmagan");
  });

  /* --- 12: sug'urta qamrovi baholangan qiymatdan kam emas (ТЗ 4.3) ---
     Yer sug'urtalanmaydi; polis yo'q/muddati o'tgan holatlar qamrov emas,
     alohida hodisa sifatida kuzatiladi. */
  SUGURTALAR.forEach(g => {
    const y = YOZUVLAR.find(z => z.id === g.obyektId);
    if (!y || y.mulk.tur === "Yer uchastkasi") return;
    if ((g.holat === "amalda" || g.holat === "tugaydi") && g.summa + 0.05 < y.mulk.baho)
      xato.push(g.obyektId + ": sug'urta summasi baholangan qiymatdan kam");
  });

  /* --- 13: kartochkadagi baho joriy baholash bilan sinxron (Д-1) --- */
  BAHOLASHLAR.forEach(b => {
    const y = YOZUVLAR.find(z => z.id === b.obyektId);
    if (y && Math.abs(y.mulk.baho - b.qiymat) > 0.05)
      xato.push(b.obyektId + ": kartochka bahosi baholash reyestridan farq qiladi");
  });

  /* --- 14: undiruv/shartnoma kesimlari ichki mosligi --- */
  const sh = PORTFEL.shartnoma;
  if (sh.faol + sh.kechikkan + sh.sudda + sh.yakunlangan !== sh.jami)
    xato.push("shartnoma kesimi yig'indisi mos emas");
  if (PORTFEL.undiruv.qarzdorlar > sh.jami)
    xato.push("qarzdorlar soni shartnomalardan ko'p bo'lishi mumkin emas");

  return xato;
}

window.MKB_DATA = {
  BOSQICHLAR, YOZUVLAR, PORTFEL, SOTUV, ARXIV, XARITA_NUQTALARI,
  OBYEKT_INDEKS, obyekt, obyektNomi, obyektHududi, joyNomi,
  TASNIF, tasnifla, tasnifStatistikasi, jamiZaxira,
  HODISALAR, HUJJATLAR, XONALAR,
  KORIKLAR, SUGURTALAR, BAHOLASHLAR, TASDIQLAR, UCHASTKALAR,
  SAVDO_MIJOZLAR, MULOQOTLAR, NAVBAT, MENING_VAZIFALARIM, BILDIRISHLAR, AMALLAR_JURNALI,
  FOYDLAR, HISOBOTLAR, HUDUDLAR, AUKSION_BOSQICH, AVTO, KPI_BAZA, UNDIRUV_SERIYA,
  pul, son, fmt,
  bosqichStatistikasi, holatStatistikasi,
  jamiQarz, jamiBaho, moslikTekshiruvi,
  topish: id => YOZUVLAR.find(y => y.id === id),
  ishBoyicha: raqam => YOZUVLAR.find(y => y.ish.raqam === raqam)
};
})();
