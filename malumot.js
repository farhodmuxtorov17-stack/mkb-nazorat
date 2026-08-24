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
  {kalit: "qaror",         nom: "Sud qarori",        rang: "#0F5392", chip: "chip-asos"},
  {kalit: "mib",           nom: "MIB ijrosi",        rang: "#D98324", chip: "chip-sariq"},
  {kalit: "musodara",      nom: "Musodara qilingan", rang: "#3AAA3E", chip: "chip-asos"},
  {kalit: "auksion",       nom: "Auksionda",         rang: "#8B5CF6", chip: "chip-binafsha"}
];

/* Bosqich -> garov obyektining holati (TZ, Д-2 qoidasi) */
const BOSQICH_HOLAT = {
  ogohlantirish: {nom: "Garovda",              rang: "#7BAEFC"},
  davo:          {nom: "Garovda",              rang: "#7BAEFC"},
  sud:           {nom: "Garovda",              rang: "#7BAEFC"},
  qaror:         {nom: "Musodara jarayonida",  rang: "#E8763C"},
  mib:           {nom: "Musodara jarayonida",  rang: "#E8763C"},
  musodara:      {nom: "Nazoratda",            rang: "#3AAA3E"},
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
});

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
    {nom: "Nazoratda",            rang: "#3AAA3E", son: 306},
    {nom: "Musodara jarayonida",  rang: "#E8763C", son: 118},
    {nom: "Ijaraga berilgan",     rang: "#3E7BD6", son: 86},
    {nom: "Auksionda",            rang: "#8B5CF6", son: 34}
  ],
  qurilmalar: {jami: 3120, onlayn: 2934, beqaror: 118, oflayn: 46, tamirda: 22},
  kameralar: {jami: 1480, onlayn: 1462}
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
  {kod:"#INC-2026-00128", obyektId:"GR-2025/1187", rang:"#E0442B",
   hodisa:"yong'in signalizatsiyasi", vaqt:"Bugun, 14:12", jiddiylik:"yuqori", ustun:"yangi", holat:"Yangi",
   tavsif:"3-qavatda yong'in signalizatsiyasi ishga tushdi. Xodimlar evakuatsiya qilindi. Holat tekshirilmoqda.",
   masul:"Rustam Q.", bolim:"Texnik xizmat bo'limi", fayl:"signalizatsiya_log.pdf", hajm:"1.2 MB"},
  {kod:"#INC-2026-00125", obyektId:"GR-2026/3308", rang:"#2E7BC4",
   hodisa:"elektr ta'minotida uzilish", vaqt:"Bugun, 12:52", jiddiylik:"past", ustun:"yangi", holat:"Yangi",
   tavsif:"B blokda qisqa muddatli elektr uzilishi kuzatildi. Zaxira generator avtomatik ishga tushdi.",
   masul:"Bekzod T.", bolim:"Energetika bo'limi", fayl:"elektr_jurnal.pdf", hajm:"640 KB"},
  {kod:"#INC-2026-00127", obyektId:"GR-2025/0934", rang:"#F2994A",
   hodisa:"lift ishlamayapti", vaqt:"Bugun, 13:48", jiddiylik:"orta", ustun:"tekshirilmoqda", holat:"Tekshirilmoqda",
   tavsif:"2-lift 8-qavatda to'xtab qoldi. Texnik guruh joyga yetib bordi, diagnostika o'tkazilmoqda.",
   masul:"Karimov I.", bolim:"Texnik xizmat bo'limi", fayl:"lift_diagnostika.pdf", hajm:"920 KB"},
  {kod:"#INC-2026-00124", obyektId:"GR-2026/0141", rang:"#8B5CF6",
   hodisa:"suv bosishi", vaqt:"Bugun, 12:33", jiddiylik:"past", ustun:"tekshirilmoqda", holat:"Tekshirilmoqda",
   tavsif:"Yerto'lada suv sathi ko'tarilgani aniqlandi. Nasos tizimi ishga tushirildi.",
   masul:"Oybek R.", bolim:"Ekspluatatsiya bo'limi", fayl:"suv_hisobot.pdf", hajm:"480 KB"},
  {kod:"#INC-2026-00120", obyektId:"GR-2024/0512", rang:"#F2C230",
   hodisa:"yoritish tizimi ishlamayapti", vaqt:"Bugun, 11:05", jiddiylik:"orta", ustun:"tekshirilmoqda", holat:"Tekshirilmoqda",
   tavsif:"2-qavat g'arbiy qanotida yoritish paneli ishdan chiqqan. Elektrik chaqirildi.",
   masul:"Sardor M.", bolim:"Energetika bo'limi", fayl:"yoritish_akt.pdf", hajm:"350 KB"},
  {kod:"#INC-2026-00126", obyektId:"GR-2024/0512", rang:"#F2C230",
   hodisa:"sovutish tizimida nosozlik", vaqt:"Bugun, 13:17", jiddiylik:"orta", ustun:"bartaraf", holat:"Bartaraf etilmoqda",
   tavsif:"Markaziy konditsioner bloki past bosim bilan ishlayapti. Freon qo'shilmoqda.",
   masul:"Rustam Q.", bolim:"HVAC guruhi", fayl:"hvac_hisobot.pdf", hajm:"1.1 MB"},
  {kod:"#INC-2026-00118", obyektId:"GR-2026/0141", rang:"#2E7BC4",
   hodisa:"eshik qulfi shikastlangan", vaqt:"Bugun, 10:11", jiddiylik:"past", ustun:"bartaraf", holat:"Bartaraf etilmoqda",
   tavsif:"Asosiy kirish eshigining elektron qulfi almashtirilmoqda.",
   masul:"Jasur A.", bolim:"Xavfsizlik bo'limi", fayl:"qulf_akt.pdf", hajm:"210 KB"},
  {kod:"#INC-2026-00117", obyektId:"GR-2026/3308", rang:"#3AAA3E",
   hodisa:"xlorlash tizimi", vaqt:"Kecha, 18:23", jiddiylik:"past", ustun:"yopildi", holat:"Yopildi",
   tavsif:"Suv tozalash tizimida rejali xlorlash yakunlandi. Ko'rsatkichlar normada.",
   masul:"Dilshod N.", bolim:"Ekspluatatsiya bo'limi", fayl:"suv_tahlil.pdf", hajm:"380 KB"},
  {kod:"#INC-2026-00116", obyektId:"GR-2025/0934", rang:"#3AAA3E",
   hodisa:"HVAC filtri almashtirildi", vaqt:"Kecha, 17:42", jiddiylik:"past", ustun:"yopildi", holat:"Yopildi",
   tavsif:"Rejali texnik xizmat: barcha HVAC filtrlari yangilandi.",
   masul:"Karimov I.", bolim:"HVAC guruhi", fayl:"filtr_akt.pdf", hajm:"290 KB"},
  {kod:"#INC-2026-00115", obyektId:"GR-2024/0286", rang:"#3AAA3E",
   hodisa:"kirish nazorati tiklandi", vaqt:"Kecha, 16:08", jiddiylik:"past", ustun:"yopildi", holat:"Yopildi",
   tavsif:"Turniket kontrollerining dasturiy ta'minoti yangilandi, tizim to'liq tiklandi.",
   masul:"Jasur A.", bolim:"Xavfsizlik bo'limi", fayl:"kirish_log.pdf", hajm:"175 KB"}
];
HODISALAR.forEach(h => {
  h.bino     = obyektNomi(h.obyektId, true);
  h.joy      = obyektHududi(h.obyektId, true);
  h.sarlavha = h.bino + " — " + h.hodisa;
});


/* ---------- Qurilmalar (Garov 1:N Qurilma, ТЗ 3.2) ----------
   joyIchi — obyekt ICHIDAGI joy ("1-qavat", "Lobby"). Obyekt nomi bu yerda
   saqlanmaydi: ko'rinadigan `joy` reyestrdagi qisqa nom bilan birlashtiriladi. */
const QURILMALAR = [
  {nom:"Entry Door Main", obyektId:"GR-2025/0934", joyIchi:"1-qavat", tur:"Eshik kirish tizimi", ikon:"i-qulf", onlayn:true,
    ip:"192.168.1.45", mac:"20:4E:7F:12:9A:BC", fw:"v2.4.1", uptime:"12 kun 4 soat", sinx:"24-may, 14:28",
    signal:"-62 dBm", soglikL:"A'lo", soglikR:"#268030", soglikF:92, cpu:"18%", xotira:"42%", kechikish:"12 ms",
    t4:{y:"Eshik holati", q:"Yopiq", alt:"Ochiq"}, t5:{y:"O'tishlar soni (bugun)", q:"128"},
    harorat:"34°C", tarmoq:"Yaxshi", quvvat:"Normal", seriya:"EDM-2024-00145", rasm:"assets/qurilma_eshik.webp",
    komp:[
      {ik:"i-qulf", n:"Elektr qulf boshqaruvchisi", t:"SecurLine SmartLock X2 · masofadan boshqariladigan magnit qulf", c:"Ishlayapti", r:"yashil"},
      {ik:"i-kamera", n:"FaceID skaner", t:"Biometrik yuz-tanish moduli · SecurLine FaceMatch v2.1", c:"Ishlayapti", r:"yashil"},
      {ik:"i-kamera", n:"IP kamera", t:"Kirish nuqtasi videokuzatuvi, doimiy yozuv", c:"Ishlayapti", r:"yashil"},
      {ik:"i-energiya", n:"Zaxira quvvat (UPS)", t:"Asosiy quvvat uzilganda 500ms ichida avtomatik almashadi", c:"To'liq — 4 soat zaxira", r:"yashil"},
      {ik:"i-wifi", n:"Tarmoq moduli", t:"Ethernet + Wi-Fi zaxira kanali", c:"Ulangan", r:"yashil"}
    ],
    fav:"Quvvat yoki tarmoq butunlay uzilsa, eshik xavfsizlik qoidalariga muvofiq avtomatik qulfdan chiqadi — mijoz hech qachon ichkarida qulflanib qolmaydi. Zaxira mexanik kalit texnik xonada saqlanadi.",
    hujjat:[{n:"O'rnatish akti", h:"PDF · 1.2 MB"},{n:"SmartLock X2 sertifikati", h:"PDF · 640 KB"},{n:"Foydalanuvchi qo'llanmasi", h:"PDF · 3.4 MB"}],
    logs:[{v:"14:28:12", m:"Sinxronizatsiya muvaffaqiyatli"},{v:"14:27:58", m:"Face ID tasdiqlandi"},{v:"14:27:45", m:"Eshik ochildi"},{v:"14:27:12", m:"Interkom qo'ng'irog'i qabul qilindi"},{v:"14:26:55", m:"Kamera aloqasi tiklandi"}]},

  {nom:"Entry Door Back", obyektId:"GR-2025/0934", joyIchi:"1-qavat", tur:"Eshik kirish tizimi", ikon:"i-qulf", onlayn:true,
    ip:"192.168.1.46", mac:"20:4E:7F:12:9A:BD", fw:"v2.4.1", uptime:"9 kun 11 soat", sinx:"24-may, 14:27",
    signal:"-58 dBm", soglikL:"A'lo", soglikR:"#268030", soglikF:89, cpu:"15%", xotira:"38%", kechikish:"10 ms",
    t4:{y:"Eshik holati", q:"Yopiq", alt:"Ochiq"}, t5:{y:"O'tishlar soni (bugun)", q:"86"},
    harorat:"33°C", tarmoq:"Yaxshi", quvvat:"Normal", seriya:"EDB-2024-00146", rasm:"assets/qurilma_eshik.webp",
    komp:[
      {ik:"i-qulf", n:"Elektr qulf boshqaruvchisi", t:"SecurLine SmartLock X2 · masofadan boshqariladigan magnit qulf", c:"Ishlayapti", r:"yashil"},
      {ik:"i-qalqon", n:"RFID karta o'quvchi", t:"SecurLine CardMatch R1 · xodim kartalarini tekshirish moduli", c:"Ishlayapti", r:"yashil"},
      {ik:"i-kamera", n:"IP kamera", t:"Kirish nuqtasi videokuzatuvi, doimiy yozuv", c:"Ishlayapti", r:"yashil"},
      {ik:"i-energiya", n:"Zaxira quvvat (UPS)", t:"Asosiy quvvat uzilganda 500ms ichida avtomatik almashadi", c:"To'liq — 3 soat zaxira", r:"yashil"},
      {ik:"i-wifi", n:"Tarmoq moduli", t:"Ethernet + Wi-Fi zaxira kanali", c:"Ulangan", r:"yashil"}
    ],
    fav:"Quvvat yoki tarmoq butunlay uzilsa, eshik xavfsizlik qoidalariga muvofiq avtomatik qulfdan chiqadi. Zaxira mexanik kalit texnik xonada saqlanadi.",
    hujjat:[{n:"O'rnatish akti", h:"PDF · 1.1 MB"},{n:"CardMatch R1 sertifikati", h:"PDF · 512 KB"}],
    logs:[{v:"14:27:40", m:"Sinxronizatsiya muvaffaqiyatli"},{v:"14:19:22", m:"RFID karta o'qildi — ruxsat berildi"},{v:"14:19:05", m:"Eshik ochildi"},{v:"13:52:11", m:"Eshik yopildi (avtomatik)"},{v:"13:40:03", m:"Kamera aloqasi tiklandi"}]},

  {nom:"Parking Barrier 1", obyektId:"GR-2025/0934", joyIchi:"Yer osti", tur:"Shlagbaum", ikon:"i-minus", onlayn:true,
    ip:"192.168.1.52", mac:"20:4E:7F:12:9B:11", fw:"v1.8.3", uptime:"27 kun 2 soat", sinx:"24-may, 14:25",
    signal:"-71 dBm", soglikL:"Yaxshi", soglikR:"#0A3D6E", soglikF:78, cpu:"11%", xotira:"29%", kechikish:"19 ms",
    t4:{y:"Shlagbaum holati", q:"Yopiq", alt:"Ochiq"}, t5:{y:"O'tgan avtomobillar (bugun)", q:"47"},
    harorat:"31°C", tarmoq:"Yaxshi", quvvat:"Normal", seriya:"PB1-2024-00201", rasm:null,
    komp:[
      {ik:"i-minus", n:"Shlagbaum motori", t:"SecurLine BarrierDrive B1 · elektromexanik ko'targich", c:"Ishlayapti", r:"yashil"},
      {ik:"i-kamera", n:"Avtomobil raqami tanish kamerasi", t:"ANPR moduli · raqamni avtomatik o'qiydi", c:"Ishlayapti", r:"yashil"},
      {ik:"i-qalqon", n:"Induktiv sensor", t:"Yo'lakdagi avtomobilni aniqlash konturi", c:"Aniqlanmoqda", r:"yashil"},
      {ik:"i-wifi", n:"Tarmoq moduli", t:"Ethernet ulanish", c:"Ulangan", r:"yashil"}
    ],
    fav:"Quvvat uzilganda shlagbaum qo'lda ko'tarish tutqichi bilan ochiladi — avtomobillar band bo'lib qolmaydi.",
    hujjat:[{n:"O'rnatish akti", h:"PDF · 980 KB"},{n:"BarrierDrive B1 texnik pasporti", h:"PDF · 2.1 MB"}],
    logs:[{v:"14:25:30", m:"Sinxronizatsiya muvaffaqiyatli"},{v:"14:21:50", m:"Shlagbaum ochildi — 01A777BB aniqlandi"},{v:"14:22:40", m:"Shlagbaum yopildi (avtomatik)"},{v:"13:58:12", m:"Induktiv sensor tekshiruvi — OK"},{v:"13:30:05", m:"ANPR kamera aloqasi tekshirildi"}]},

  {nom:"Lobby Camera 1", obyektId:"GR-2025/0934", joyIchi:"Lobby", tur:"IP Kamera", ikon:"i-kamera", onlayn:true,
    ip:"192.168.1.60", mac:"20:4E:7F:12:9C:02", fw:"v3.1.0", uptime:"41 kun 16 soat", sinx:"24-may, 14:29",
    signal:"-55 dBm", soglikL:"A'lo", soglikR:"#268030", soglikF:95, cpu:"22%", xotira:"51%", kechikish:"8 ms",
    t4:{y:"Yozuv holati", q:"Yozilmoqda", alt:"To'xtatilgan"}, t5:{y:"Aniqlangan harakatlar (bugun)", q:"19"},
    harorat:"29°C", tarmoq:"Yaxshi", quvvat:"Normal (PoE)", seriya:"LC1-2024-00312", rasm:null,
    komp:[
      {ik:"i-kamera", n:"Video sensori", t:"4K, 30 fps · keng burchakli obyektiv", c:"Ishlayapti", r:"yashil"},
      {ik:"i-monitor", n:"IR tungi ko'rish moduli", t:"Yorug'lik yetarli bo'lmaganda avtomatik yoqiladi", c:"Avtomatik", r:"yashil"},
      {ik:"i-servis", n:"Mikrofon", t:"Kirish nuqtasi audio yozuvi", c:"Yoqilgan", r:"yashil"},
      {ik:"i-wifi", n:"Tarmoq moduli", t:"PoE — quvvat va ma'lumot bitta kabelda", c:"Ulangan", r:"yashil"}
    ],
    fav:null,
    hujjat:[{n:"O'rnatish akti", h:"PDF · 890 KB"},{n:"Kamera sertifikati", h:"PDF · 430 KB"}],
    logs:[{v:"14:29:05", m:"Sinxronizatsiya muvaffaqiyatli"},{v:"14:24:18", m:"Harakat aniqlandi — lobby zonasi"},{v:"14:10:02", m:"Video bufer diskka yozildi"},{v:"13:47:36", m:"IR rejim avtomatik yoqildi"},{v:"13:20:00", m:"Aloqa tekshiruvi — OK"}]},

  {nom:"Elevator Panel 1", obyektId:"GR-2025/0934", joyIchi:"Lift bank 1", tur:"Lift paneli", ikon:"i-ekran", onlayn:true,
    ip:"192.168.1.71", mac:"20:4E:7F:12:9D:19", fw:"v2.0.6", uptime:"18 kun 7 soat", sinx:"24-may, 14:26",
    signal:"-66 dBm", soglikL:"Yaxshi", soglikR:"#0A3D6E", soglikF:81, cpu:"14%", xotira:"33%", kechikish:"15 ms",
    t4:{y:"Lift holati", q:"Ishlamoqda", alt:"To'xtatilgan"}, t5:{y:"Bugungi chaqiriqlar", q:"64"},
    harorat:"32°C", tarmoq:"Yaxshi", quvvat:"Normal", seriya:"EP1-2024-00408", rasm:null,
    komp:[
      {ik:"i-ekran", n:"Boshqaruv platasi", t:"Qavat chaqiruv va harakat nazorati", c:"Ishlayapti", r:"yashil"},
      {ik:"i-topshiriq", n:"Qavat tugmalari paneli", t:"Kabina ichi va tashqi chaqiruv tugmalari", c:"Javob bermoqda", r:"yashil"},
      {ik:"i-servis", n:"Interkom moduli", t:"Favqulodda aloqa kanali", c:"Ulangan", r:"yashil"},
      {ik:"i-qalqon", n:"Yuk sensori", t:"Ortiqcha yuklanishni aniqlaydi", c:"Normal", r:"yashil"}
    ],
    fav:"Favqulodda to'xtash tugmasi bosilsa, lift eng yaqin qavatga tushib eshigini ochadi va texnik xizmatga signal yuboradi.",
    hujjat:[{n:"O'rnatish akti", h:"PDF · 1.4 MB"},{n:"Xavfsizlik nazorati sertifikati", h:"PDF · 760 KB"}],
    logs:[{v:"14:26:50", m:"Sinxronizatsiya muvaffaqiyatli"},{v:"14:22:11", m:"Chaqiriq qabul qilindi — 4-qavat"},{v:"14:15:34", m:"Interkom orqali qo'ng'iroq"},{v:"13:59:02", m:"Yuk sensori tekshiruvi — normal"},{v:"13:30:47", m:"Eshik sensori avtomatik testi — OK"}]},

  {nom:"Fire Detector 3F", obyektId:"GR-2025/0934", joyIchi:"3-qavat", tur:"Yong'in detektori", ikon:"i-ogoh", onlayn:true, qizil:true,
    ip:"192.168.1.83", mac:"20:4E:7F:12:9E:27", fw:"v1.5.2", uptime:"63 kun 20 soat", sinx:"24-may, 13:58",
    signal:"-74 dBm", soglikL:"Ogohlantirish", soglikR:"#9A6E00", soglikF:54, cpu:"9%", xotira:"24%", kechikish:"22 ms",
    t4:{y:"Sensor holati", q:"Tekshiruv talab etadi"}, t5:{y:"Oxirgi kalibrovka", q:"46 kun oldin"},
    harorat:"38°C", tarmoq:"Beqaror", quvvat:"Normal", seriya:"FD3F-2024-00519", rasm:null,
    komp:[
      {ik:"i-ogoh", n:"Tutum sensori (optik)", t:"Sezuvchanlik darajasi normadan pastroq — tekshiruv talab etadi", c:"Ogohlantirish", r:"sariq"},
      {ik:"i-qalqon", n:"Harorat sensori", t:"Kritik haroratni doimiy nazorat qiladi", c:"Ishlayapti", r:"yashil"},
      {ik:"i-servis", n:"Signal beruvchi", t:"Sirena + strob chiroq", c:"Tayyor", r:"yashil"},
      {ik:"i-wifi", n:"Markaziy nazorat ulanishi", t:"Yong'in nazorat paneliga to'g'ridan-to'g'ri ulanish", c:"Ulangan", r:"yashil"}
    ],
    fav:"Signal aniqlansa, barcha eshiklar avtomatik qulfdan chiqadi (fail-safe evakuatsiya rejimi) va Hodisalar bo'limida kritik hodisa avtomatik yaratiladi.",
    hujjat:[{n:"Yong'in xavfsizligi sertifikati", h:"PDF · 1.0 MB"},{n:"Kalibrovka jurnali", h:"PDF · 320 KB"}],
    logs:[{v:"13:58:20", m:"Sinxronizatsiya — kechikish bilan (beqaror tarmoq)"},{v:"12:40:11", m:"O'z-o'zini tekshirish — sezuvchanlik pasaygan"},{v:"09:15:00", m:"Kunlik test signali — o'tdi"},{v:"kecha 22:03", m:"Harorat sensori tekshiruvi — normal"},{v:"kecha 08:00", m:"Rejalashtirilgan kalibrovka eslatmasi yuborildi"}]},

  {nom:"Power Supply 1", obyektId:"GR-2025/0934", joyIchi:"Texnik xona", tur:"Quvvat manbai", ikon:"i-energiya", onlayn:true,
    ip:"192.168.1.90", mac:"20:4E:7F:12:9F:33", fw:"v1.2.0", uptime:"84 kun 3 soat", sinx:"24-may, 14:24",
    signal:"Kabelli · barqaror", soglikL:"A'lo", soglikR:"#268030", soglikF:97, cpu:"6%", xotira:"18%", kechikish:"5 ms",
    t4:{y:"Quvvat holati", q:"Ishlayapti"}, t5:{y:"Batareya zaxirasi", q:"100%"},
    harorat:"36°C", tarmoq:"Yaxshi", quvvat:"Normal", seriya:"PS1-2024-00602", rasm:null,
    komp:[
      {ik:"i-energiya", n:"AC/DC o'zgartirgich", t:"Asosiy quvvat manbaini o'zgartiradi", c:"Ishlayapti", r:"yashil"},
      {ik:"i-energiya", n:"Batareya bloki (UPS)", t:"Zaxira quvvat manbai, ~4 soat avtonom ishlash", c:"To'liq quvvatlangan", r:"yashil"},
      {ik:"i-qalqon", n:"Kuchlanish stabilizatori", t:"Tarmoqdagi kuchlanish tebranishlaridan himoyalaydi", c:"Normal", r:"yashil"},
      {ik:"i-wifi", n:"Nazorat moduli", t:"Masofadan monitoring va boshqaruv kanali", c:"Ulangan", r:"yashil"}
    ],
    fav:"Asosiy quvvat uzilganda batareya zaxirasi avtomatik ishga tushadi va texnik xonadagi barcha qurilmalarni ~4 soat quvvatlaydi.",
    hujjat:[{n:"O'rnatish akti", h:"PDF · 750 KB"},{n:"UPS texnik pasporti", h:"PDF · 1.8 MB"}],
    logs:[{v:"14:24:09", m:"Sinxronizatsiya muvaffaqiyatli"},{v:"11:12:40", m:"Batareya sikli tekshiruvi — 100% sig'im"},{v:"09:00:00", m:"Kunlik quvvat tekshiruvi — normal"},{v:"kecha 19:44", m:"Qisqa kuchlanish tebranishi — avtomatik barqarorlashtirildi"},{v:"kecha 08:00", m:"Rejalashtirilgan texnik ko'rik eslatmasi"}]},

  {nom:"Network Switch 1", obyektId:"GR-2025/0934", joyIchi:"Texnik xona", tur:"Tarmoq uskunasi", ikon:"i-wifi", onlayn:false,
    ip:"192.168.1.2", mac:"20:4E:7F:12:A0:05", fw:"v4.0.1", uptime:"—", sinx:"23-may, 22:14",
    signal:"Aloqa yo'q", soglikL:"Kritik", soglikR:"#C43C31", soglikF:8, cpu:"—", xotira:"—", kechikish:"—",
    t4:{y:"Tarmoq holati", q:"Offline"}, t5:{y:"Faol portlar", q:"0/24"},
    harorat:"—", tarmoq:"Aloqa yo'q", quvvat:"Noma'lum", seriya:"NS1-2024-00711", rasm:null,
    komp:[
      {ik:"i-wifi", n:"24-portli kommutator moduli", t:"Barcha portlar orqali ma'lumot uzatadi", c:"Ishlamayapti", r:"qizil"},
      {ik:"i-energiya", n:"PoE quvvat moduli", t:"Kameralar va kontrollerlarni quvvatlaydi", c:"Aloqa yo'q", r:"qizil"},
      {ik:"i-ekran", n:"Boshqaruv protsessori", t:"Qurilmaning markaziy boshqaruv bloki", c:"Javob bermayapti", r:"qizil"},
      {ik:"i-qalqon", n:"Zaxira quvvat kirishi", t:"Ikkilamchi quvvat manbai", c:"Tekshirilmoqda", r:"sariq"}
    ],
    fav:"Qurilma tarmoqqa ulanmagan — unga bog'liq qurilmalar (kameralar, eshik kontrollerlari) zaxira kanaliga o'tkazilgan holda ishlamoqda.",
    hujjat:[{n:"O'rnatish akti", h:"PDF · 640 KB"}],
    logs:[{v:"23-may 22:14", m:"Aloqa uzildi (timeout)"},{v:"23-may 22:13", m:"1–24-portlar: signal yo'qotildi"},{v:"23-may 21:58", m:"Yuqori harorat ogohlantirishi"},{v:"23-may 18:30", m:"Sinxronizatsiya muvaffaqiyatli"},{v:"23-may 09:00", m:"Kunlik trafik hisoboti yaratildi"}]}
];
QURILMALAR.forEach(q => {
  q.joy  = joyNomi(q.obyektId, q.joyIchi);
  q.bino = obyektNomi(q.obyektId, true);
});


/* ---------- Hujjatlar (Garov 1:N Hujjat, ТЗ 3.2) ---------- */
const HUJJATLAR = [
  {nom:"Texnik pasport.pdf", ikon:"pdf", iturl:"i-hujjat", obyektId:"GR-2025/0934", tur:"Texnik pasport", teg:"pasport",
   sana:"24-may, 2024", holat:"Tasdiqlangan", hrang:"#3AAA3E", id:"DOC-2024-001", hajm:"12.4 MB", format:"PDF", rasm:"assets/bino_tower.webp",
   yuklagan:"Ismoilov Otabek", tavsif:"Bino bo'yicha texnik ma'lumotlar va umumiy tavsif."},
  {nom:"Kadastr reja.dwg", ikon:"dwg", iturl:"i-xarita", obyektId:"GR-2026/0141", tur:"Kadastr", teg:"kadastr",
   sana:"21-may, 2024", holat:"Tasdiqlangan", hrang:"#3AAA3E", id:"DOC-2024-014", hajm:"8.1 MB", format:"DWG", rasm:"assets/bino_dacha.webp",
   yuklagan:"Rahimov S.", tavsif:"Yer uchastkasining kadastr chizmasi."},
  {nom:"Ijara shartnomasi.pdf", ikon:"doc", iturl:"i-shartnoma", obyektId:"GR-2024/0512", tur:"Shartnoma", teg:"shartnoma",
   sana:"18-may, 2024", holat:"Tasdiqlangan", hrang:"#3AAA3E", id:"DOC-2024-022", hajm:"2.7 MB", format:"PDF", rasm:"assets/bino_mall.webp",
   yuklagan:"Karimova N.", tavsif:"«Turon Retail» MChJ bilan ijara shartnomasi."},
  {nom:"Fasad ko'rinishi.jpg", ikon:"img", iturl:"i-kamera", obyektId:"GR-2025/1187", tur:"Rasm", teg:"rasm",
   sana:"16-may, 2024", holat:"Yangi", hrang:"#3AAA3E", id:"DOC-2024-031", hajm:"5.4 MB", format:"JPG", rasm:"assets/bino_humo.webp",
   yuklagan:"Soliev B.", tavsif:"Bino fasadining yangilangan surati."},
  {nom:"Baholash hisobot.pdf", ikon:"rep", iturl:"i-hisobot", obyektId:"GR-2026/3308", tur:"Hisobot", teg:"hisobot",
   sana:"14-may, 2024", holat:"Tasdiqlangan", hrang:"#3AAA3E", id:"DOC-2024-036", hajm:"4.2 MB", format:"PDF", rasm:"assets/bino_turar.webp",
   yuklagan:"Yusupova M.", tavsif:"Mustaqil baholovchi hisoboti."},
  {nom:"Yer uchastkasi rejasi.pdf", ikon:"pdf", iturl:"i-yer", obyektId:"GR-2025/0755", tur:"Kadastr", teg:"kadastr",
   sana:"12-may, 2024", holat:"Ko'rib chiqilmoqda", hrang:"#4A90F2", id:"DOC-2024-040", hajm:"3.3 MB", format:"PDF", rasm:"assets/bino_yer.webp",
   yuklagan:"Rahimov S.", tavsif:"Yer uchastkasining chegara rejasi."},
  {nom:"Qabul-topshirish dalolatnomasi.pdf", ikon:"doc", iturl:"i-shartnoma", obyektId:"GR-2025/0934", tur:"Shartnoma", teg:"shartnoma",
   sana:"10-may, 2024", holat:"Tasdiqlangan", hrang:"#3AAA3E", id:"DOC-2024-044", hajm:"1.6 MB", format:"PDF", rasm:"assets/bino_tower.webp",
   yuklagan:"Ismoilov Otabek", tavsif:"5-qavat ofis maydonini topshirish dalolatnomasi."},
  {nom:"Energiya audit hisobot.pdf", ikon:"pdf", iturl:"i-energiya", obyektId:"GR-2026/0141", tur:"Hisobot", teg:"hisobot",
   sana:"07-may, 2024", holat:"Tasdiqlangan", hrang:"#3AAA3E", id:"DOC-2024-051", hajm:"6.8 MB", format:"PDF", rasm:"assets/bino_dacha.webp",
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
  {nom:"Ofis 301", obyektId:"GR-2025/0934", qavat:"3", maydon:"120 m²", rasm:"assets/xona_ofis.webp", tur:"Ofis", sigim:"12 kishi", holat:"Band",
   egasi:"SecurTech Servis MChJ", shartnoma:"NPR-2024-0566", muddat:"26-may, 2025",
   jihozlar:[["Stol","12 ta"],["Kreslo","12 ta"],["Kompyuter","12 ta"],["Printer","2 ta"],["Konditsioner","2 ta"]]},
  {nom:"Konferensiya zali", obyektId:"GR-2025/0934", qavat:"4", maydon:"60 m²", rasm:"assets/xona_konf.webp", tur:"Konferensiya", sigim:"24 kishi", holat:"Bron qilinadi",
   egasi:"Umumiy foydalanish", shartnoma:"—", muddat:"—",
   jihozlar:[["Stol","1 ta"],["Kreslo","24 ta"],["Proyektor","1 ta"],["Video panel","1 ta"],["Konditsioner","2 ta"]]},
  {nom:"Arxiv xonasi", obyektId:"GR-2025/0934", qavat:"-1", maydon:"25 m²", rasm:"assets/xona_arxiv.webp", tur:"Arxiv", sigim:"—", holat:"Faol",
   egasi:"MKB ma'muriyati", shartnoma:"—", muddat:"—",
   jihozlar:[["Javon","16 ta"],["Seyf","2 ta"],["Namlik sensori","2 ta"]]},
  {nom:"Server xonasi", obyektId:"GR-2025/0934", qavat:"-1", maydon:"18 m²", rasm:"assets/xona_server.webp", tur:"Texnik", sigim:"—", holat:"Faol",
   egasi:"IT bo'limi", shartnoma:"—", muddat:"—",
   jihozlar:[["Server shkafi","6 ta"],["UPS","4 ta"],["Sovutish bloki","2 ta"]]},
  {nom:"Savdo maydoni", obyektId:"GR-2025/0934", qavat:"2", maydon:"240 m²", rasm:"assets/xona_savdo.webp", tur:"Savdo", sigim:"120 kishi", holat:"Band",
   egasi:"«Turon Retail» MChJ", shartnoma:"NPR-2024-0312", muddat:"14-iyun, 2025",
   jihozlar:[["Peshtaxta","8 ta"],["Javon","32 ta"],["Kassa","4 ta"],["Konditsioner","4 ta"]]}
];
XONALAR.forEach(x => { x.bino = obyektNomi(x.obyektId, true); });


/* ---------- Videokuzatuv va aloqa kanallari ----------
   Ilgari bu ro'yxatlarda obyekt nomi matn bilan yozilardi va bitta obyekt
   uch xil yozilishi mumkin edi ("Zarafshon Tekstil", "...sexi",
   "...ishlab chiqarish sexi"). Endi faqat obyektId saqlanadi. */
const KAMERALAR = [
  {obyektId:"GR-2025/0934", joyIchi:"Bosh kirish",        rasm:"assets/kam_kirish.webp", holat:"ok",     vaqt:"14:32:07", kod:"CAM-014"},
  {obyektId:"GR-2025/1187", joyIchi:"Sex hududi",    rasm:"assets/kam_lobi.webp",   holat:"trevoga", vaqt:"14:32:05", kod:"CAM-027"},
  {obyektId:"GR-2026/0141", joyIchi:"Perimetr",   rasm:"assets/kam_avto.webp",   holat:"ok",     vaqt:"14:32:06", kod:"CAM-041"},
  {obyektId:"GR-2026/4471", joyIchi:"Kirish yo'lagi",  rasm:"assets/kam_konf.webp",   holat:"ok",     vaqt:"14:32:07", kod:"CAM-052"},
  {obyektId:"GR-2024/0286", joyIchi:"Kirish darvozasi",  rasm:"assets/jonli_kamera.webp", holat:"ok",   vaqt:"14:32:04", kod:"CAM-063"},
  {obyektId:"GR-2025/0755", joyIchi:"Chegara",   rasm:"assets/kv_kamera.webp",  holat:"oflayn", vaqt:"14:18:52", kod:"CAM-078"},
  {obyektId:"GR-2025/0934", joyIchi:"Avtoturargoh",       rasm:"assets/kam_avto.webp",   holat:"ok",     vaqt:"14:32:06", kod:"CAM-019"},
  {obyektId:"GR-2026/3308", joyIchi:"Hovli",           rasm:"assets/kirish_sahna.webp", holat:"ok",   vaqt:"14:32:07", kod:"CAM-085"},
  {obyektId:"GR-2026/2210", joyIchi:"Podyezd",         rasm:"assets/sx_kamera.webp",  holat:"ok",     vaqt:"14:32:05", kod:"CAM-091"}
];
KAMERALAR.forEach(k => { k.nom = joyNomi(k.obyektId, k.joyIchi, " · "); });

const TREVOGALAR = [
  {id:"a1", daraja:"kritik", nom:"Perimetr buzilishi aniqlandi", obyektId:"GR-2025/1187", joyIchi:"Sex hududi",
   vaqt:"14:31", sla:"0:48", buzilgan:false, kam:1},
  {id:"a2", daraja:"kritik", nom:"Kamera aloqasi uzildi", obyektId:"GR-2025/0755", joyIchi:"Chegara",
   vaqt:"14:18", sla:"13:22", buzilgan:true, kam:5},
  {id:"a3", daraja:"ogoh", nom:"Eshik ruxsatsiz ochilishga urinish", obyektId:"GR-2025/0934", joyIchi:"3-qavat savdo maydoni",
   vaqt:"14:06", sla:"2:11", buzilgan:false, kam:0},
  {id:"a4", daraja:"ogoh", nom:"Harorat me'yordan yuqori", obyektId:"GR-2025/1187", joyIchi:"Server xonasi",
   vaqt:"13:52", sla:"1:04", buzilgan:false, kam:1},
  {id:"a5", daraja:"past", nom:"Zaxira quvvatga o'tildi", obyektId:"GR-2026/0141", joyIchi:"Asosiy shchit",
   vaqt:"13:40", sla:"0:26", buzilgan:false, kam:2},
  {id:"a6", daraja:"past", nom:"Rejalashtirilmagan tashrif qayd etildi", obyektId:"GR-2024/0286", joyIchi:"Kirish zonasi",
   vaqt:"13:21", sla:"0:12", buzilgan:false, kam:4}
];
TREVOGALAR.forEach(t => { t.obyekt = joyNomi(t.obyektId, t.joyIchi, " · "); });

const KANALLAR = [
  {obyektId:"GR-2025/0934", kanal:"Optik tolali · 200 Mbit", qurilma:"12 ta", zaxira:"UPS · 4 soat", sifat:96, holat:"Barqaror", rang:"#3AAA3E"},
  {obyektId:"GR-2025/1187", kanal:"Optik tolali · 100 Mbit", qurilma:"18 ta", zaxira:"Generator · 12 soat", sifat:88, holat:"Barqaror", rang:"#3AAA3E"},
  {obyektId:"GR-2026/0141", kanal:"4G LTE · zaxira kanal", qurilma:"6 ta", zaxira:"UPS · 2 soat", sifat:64, holat:"Diqqat", rang:"#D98324"},
  {obyektId:"GR-2025/0755", kanal:"4G LTE", qurilma:"4 ta", zaxira:"Quyosh paneli", sifat:22, holat:"Uzilgan", rang:"#D8432F"},
  {obyektId:"GR-2026/4471", kanal:"Optik tolali · 100 Mbit", qurilma:"5 ta", zaxira:"UPS · 3 soat", sifat:93, holat:"Barqaror", rang:"#3AAA3E"},
  {obyektId:"GR-2024/0286", kanal:"Optik tolali · 200 Mbit", qurilma:"9 ta", zaxira:"UPS · 6 soat", sifat:97, holat:"Barqaror", rang:"#3AAA3E"}
];
KANALLAR.forEach(k => { k.obyekt = joyNomi(k.obyektId, k.joyIchi, " · "); });


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
  {kod:"GR-2024/0331", tuman:"Zangiota tumani", viloyat:"Toshkent viloyati", maydon:"8.75 gektar", status:"Nazoratda", srang:"#3AAA3E", narx:"180 ming so'm/m²",
   kadastr:"11:07:12:01:0044", yerturi:"Zaxira yerlar", jami:"15 750 000 000 so'm"},
  {kod:"GR-2024/0197", tuman:"Yuqorichirchiq tumani", viloyat:"Toshkent viloyati", maydon:"15.20 gektar", status:"Auksionda", srang:"#8B5CF6", narx:"260 ming so'm/m²",
   kadastr:"11:12:05:03:0090", yerturi:"Qurilish yerlari", jami:"39 520 000 000 so'm"},
  {kod:"GR-2024/0640", tuman:"Ohangaron tumani", viloyat:"Toshkent viloyati", maydon:"23.10 gektar", status:"Garovda", srang:"#7BAEFC", narx:"160 ming so'm/m²",
   kadastr:"11:04:08:02:0110", yerturi:"Qishloq xo'jaligi yerlari", jami:"36 960 000 000 so'm"},
  {kod:"GR-2025/0288", tuman:"Parkent tumani", viloyat:"Toshkent viloyati", maydon:"5.60 gektar", status:"Garovda", srang:"#7BAEFC", narx:"150 ming so'm/m²",
   kadastr:"11:09:01:07:0021", yerturi:"Zaxira yerlar", jami:"8 400 000 000 so'm"},
  {kod:"GR-2024/0072", tuman:"Bekobod tumani", viloyat:"Toshkent viloyati", maydon:"10.00 gektar", status:"Nazoratda", srang:"#3AAA3E", narx:"290 ming so'm/m²",
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
   matn:"Turniket №2 offline holatida.", vaqt:"10:05", yangi:false, havola:"monitoring.html"}
];

/* ---------- Audit jurnali: o'zgarmas yozuv, matn qayta hisoblanmaydi (ТЗ 8) ---------- */
const AUDIT_JURNAL = [
  {vaqt:"24-may, 14:47", ism:"Ismoilov Otabek", rol:"Administrator", amal:"Tizimga kirdi", obyekt:"Sessiya #SS-88214 · IP 192.168.10.14"},
  {vaqt:"24-may, 14:20", ism:"Sattorov Jasur", rol:"Xavfsizlik operatori", amal:`Hodisani "Bartaraf etilmoqda" ustuniga ko'chirdi`, obyekt:"#INC-2026-00126 — Chorsu Savdo Markazi (sovutish tizimida nosozlik)"},
  {vaqt:"24-may, 13:55", ism:"Rahimov Bekzod", rol:"Texnik xodim", amal:"Qurilmani qayta ishga tushirdi", obyekt:"Network Switch 1 — Navruz Plaza, Texnik xona"},
  {vaqt:"24-may, 12:10", ism:"Yo'ldoshev Alisher", rol:"Bank rahbariyati", amal:"Shartnomani tasdiqladi", obyekt:"CT-2025-0912 — SecurTech Servis MChJ"},
  {vaqt:"24-may, 11:32", ism:"Ismoilov Otabek", rol:"Administrator", amal:`Foydalanuvchi rolini o'zgartirdi: "Texnik xodim" → "Xavfsizlik operatori"`, obyekt:"Nilufar Ismoilova · U056789013"},
  {vaqt:"24-may, 11:05", ism:"Ismoilov Otabek", rol:"Administrator", amal:"Sozlamani o'chirdi", obyekt:"Ikki bosqichli autentifikatsiya — Tizim parametrlari"},
  {vaqt:"24-may, 10:40", ism:"Nilufar Ismoilova", rol:"Xavfsizlik operatori", amal:"Hujjat yukladi", obyekt:"Baholash hisobot.pdf — Nurafshon turar-joy majmuasi"},
  {vaqt:"24-may, 10:15", ism:"Yo'ldoshev Alisher", rol:"Bank rahbariyati", amal:"Kirish so'rovini tasdiqladi", obyekt:"Sardor Aliyev, mehmon — Navruz Plaza"},
  {vaqt:"24-may, 09:12", ism:"Sattorov Jasur", rol:"Xavfsizlik operatori", amal:"Yangi hodisa qayd etdi", obyekt:"#INC-2026-00128 — Zarafshon Tekstil sexi (yong'in signalizatsiyasi)"},
  {vaqt:"24-may, 04:15", ism:"Tizim", rol:"Avtomatik", amal:"Zaxira nusxa yaratdi", obyekt:"To'liq zaxira — 213 GB"},
  {vaqt:"23-may, 22:48", ism:"Jahongir Otajonov", rol:"Texnik xodim", amal:"Xato parol bilan kirishga urindi (3 marta)", obyekt:"IP 91.204.239.18"},
  {vaqt:"23-may, 16:05", ism:"Sattorov Jasur", rol:"Xavfsizlik operatori", amal:"Hisobotni eksport qildi", obyekt:"Moliyaviy hisobot — PDF"},
  {vaqt:"22-may, 15:20", ism:"Ismoilov Otabek", rol:"Administrator", amal:"Foydalanuvchi hisobini nofaollashtirdi", obyekt:"Umid Safarov · U056789017"},
  {vaqt:"22-may, 09:47", ism:"Ismoilov Otabek", rol:"Administrator", amal:"Foydalanuvchi parolini tiklashga majburladi", obyekt:"Jahongir Otajonov · U056789019"}
];

/* ---------- Servis: reglament ro'yxati va ehtiyot qismlar ---------- */
const SERVIS_VAZIFALAR = [
  {nom:"1. Kamera tekshiruvi", izoh:"Barcha kameralar tasvir sifati va yozuvini tekshirish", holat:"bajarildi"},
  {nom:"2. Face ID test", izoh:"Face ID qurilmalari aniqlik va javob vaqtini tekshirish", holat:"jarayonda"},
  {nom:"3. Interkom audio testi", izoh:"Interkom qurilmalarining ovoz sifati va ulanishini tekshirish", holat:"kutish"},
  {nom:"4. Eshik qulfi tekshiruvi", izoh:"Eshik qulflari va ochilish mexanizmlarini tekshirish", holat:"kutish"},
  {nom:"5. Yong'in detektori tekshiruvi", izoh:"Yong'in detektorlari ishlash holatini tekshirish", holat:"kutish"},
  {nom:"6. Yong'in signalizatsiyasi liniyasi", izoh:"Signalizatsiya liniyasi va markaziy panelni tekshirish", holat:"kutish"}
];
const EHTIYOT_QISMLAR = [
  {nom:"Magnit qulf moduli", kod:"EQ-1001", omborda:6, birlik:"dona"},
  {nom:"Face ID sensori", kod:"EQ-1002", omborda:3, birlik:"dona"},
  {nom:"IP kamera obyektivi", kod:"EQ-1003", omborda:5, birlik:"dona"},
  {nom:"UPS batareya bloki", kod:"EQ-1004", omborda:2, birlik:"dona"},
  {nom:"Tarmoq kabeli", kod:"EQ-1005", omborda:45, birlik:"m"}
];

/* ---------- Kirish nazorati: voqealar, so'rovlar, mehmonlar ----------
   SILUET — shaxs fotosurati yo'q bo'lganda ko'rsatiladigan o'rinbosar. */
const SILUET = "data:image/svg+xml;utf8,"+encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 132 150'><rect width='132' height='150' rx='16' fill='#EEF1F5'/><circle cx='66' cy='56' r='27' fill='#AFB6BE'/><path d='M15 150c4.5-36 25-55 51-55s46.5 19 51 55z' fill='#AFB6BE'/></svg>`);
const VOQEALAR = [
  {nom:"Akmal Rustamov", eshik:"Bosh kirish eshigi", sana:"Bugun", vaqt:"14:32:18", pill:"mos", pillM:"Yuz mos keldi", chiziq:"#0F5392", toifa:"jonli",
   id:"EMP-0247", bolim:"IT bo'limi", lavozim:"Dasturchi", karta:"CARD-8891", foiz:"98%", rasm:"assets/kv_shaxs.webp",
   turi:"Yuz orqali kirish", usul:"Face ID", davomiylik:"1.2 soniya"},
  {nom:"Sevara Mirzayeva", eshik:"Ofis qavati eshigi", sana:"Bugun", vaqt:"14:31:47", pill:"qolda", pillM:"Qo'lda tekshirish", chiziq:"#F2994A", toifa:"jonli",
   id:"EMP-0311", bolim:"Moliya bo'limi", lavozim:"Buxgalter", karta:"CARD-8674", foiz:"71%", rasm:SILUET,
   turi:"Qo'lda tekshirish", usul:"Xodim tomonidan vizual tekshiruv", davomiylik:"4.6 soniya"},
  {nom:"Javlon Karimov", eshik:"Texnik xona eshigi", sana:"Bugun", vaqt:"14:31:12", pill:"ruxsat", pillM:"Ruxsat berildi", chiziq:"#0F5392", toifa:"jonli",
   id:"EMP-0102", bolim:"Boshqaruv", lavozim:"Garov obyektlari direktori", karta:"CARD-8001", foiz:"97%", rasm:"assets/kv_shaxs.webp",
   turi:"Yuz orqali kirish", usul:"Face ID", davomiylik:"1.1 soniya"},
  {nom:"Nodirbek Yusupov", eshik:"Orqa kirish eshigi", sana:"Bugun", vaqt:"14:30:45", pill:"rad", pillM:"Rad etildi", chiziq:"#F45E53", toifa:"jonli",
   id:"—", bolim:"—", lavozim:"Noma'lum shaxs", karta:"—", foiz:"38%", rasm:SILUET,
   turi:"Kirish urinishi (aniqlanmadi)", usul:"Face ID (mos kelmadi)", davomiylik:"2.4 soniya"},
  {nom:"Madina Tukhtayeva", eshik:"Ofis qavati eshigi", sana:"Bugun", vaqt:"14:30:21", pill:"mos", pillM:"Yuz mos keldi", chiziq:"#0F5392", toifa:"jonli",
   id:"EMP-0450", bolim:"HR bo'limi", lavozim:"Menejer", karta:"CARD-8712", foiz:"96%", rasm:SILUET,
   turi:"Yuz orqali kirish", usul:"Face ID", davomiylik:"1.0 soniya"},
  {nom:"Sanjar Abdullaev", eshik:"Bosh kirish eshigi", sana:"Bugun", vaqt:"14:29:58", pill:"qolda", pillM:"Qo'lda tekshirish", chiziq:"#F2994A", toifa:"jonli",
   id:"EMP-0523", bolim:"Xavfsizlik", lavozim:"Qorovul", karta:"CARD-8330", foiz:"69%", rasm:"assets/kv_shaxs.webp",
   turi:"Qo'lda tekshirish", usul:"Xodim tomonidan vizual tekshiruv", davomiylik:"5.1 soniya"},
  {nom:"Dilnoza Yoqubova", eshik:"Bosh kirish eshigi", sana:"Kecha", vaqt:"18:44:02", pill:"mos", pillM:"Yuz mos keldi", chiziq:"#0F5392", toifa:"arxiv",
   id:"EMP-0198", bolim:"Yuridik bo'lim", lavozim:"Yurist", karta:"CARD-8532", foiz:"95%", rasm:SILUET,
   turi:"Yuz orqali kirish", usul:"Face ID", davomiylik:"1.3 soniya"},
  {nom:"Otabek Rashidov", eshik:"Ombor kirish eshigi", sana:"Kecha", vaqt:"09:12:30", pill:"ruxsat", pillM:"Ruxsat berildi", chiziq:"#0F5392", toifa:"arxiv",
   id:"EMP-0276", bolim:"Logistika bo'limi", lavozim:"Omborchi", karta:"CARD-8455", foiz:"93%", rasm:"assets/kv_shaxs.webp",
   turi:"Yuz orqali kirish", usul:"Face ID", davomiylik:"1.4 soniya"},
  {nom:"Kamola Sultonova", eshik:"Ofis qavati eshigi", sana:"22-may", vaqt:"11:05:47", pill:"rad", pillM:"Rad etildi", chiziq:"#F45E53", toifa:"arxiv",
   id:"—", bolim:"—", lavozim:"Noma'lum shaxs", karta:"—", foiz:"41%", rasm:SILUET,
   turi:"Kirish urinishi (aniqlanmadi)", usul:"Face ID (mos kelmadi)", davomiylik:"2.1 soniya"},
  {nom:"Feruz Nazarov", eshik:"Texnik xona eshigi", sana:"20-may", vaqt:"16:38:15", pill:"qolda", pillM:"Qo'lda tekshirish", chiziq:"#F2994A", toifa:"arxiv",
   id:"EMP-0389", bolim:"Texnik xizmat", lavozim:"Muhandis", karta:"CARD-8290", foiz:"73%", rasm:"assets/kv_shaxs.webp",
   turi:"Qo'lda tekshirish", usul:"Xodim tomonidan vizual tekshiruv", davomiylik:"3.8 soniya"}
];
const SOROVLAR = [
  {nom:"Javlon Karimov", rol:"Mehmon", vaqt:"14:31", id:"G56781234", tashkilot:"BuildTech LLC", maqsad:"Yetkazib berish", mezbon:"Sattorov Jasur", nuqta:"Asosiy kirish",
   tarix:[["22-may, 09:10","Kirish — Asosiy"]]},
  {nom:"Shahnoza Mirzayeva", rol:"Pudratchi", vaqt:"14:30", id:"G56782345", tashkilot:"CleanPro Xizmat", maqsad:"Tozalash xizmati", mezbon:"Rahimov Bekzod", nuqta:"Yon kirish",
   tarix:[["23-may, 08:00","Kirish — Yon"],["23-may, 17:15","Chiqish — Yon"]]},
  {nom:"Bobur Yusupov", rol:"Haydovchi", vaqt:"14:29", id:"G56783456", tashkilot:"FastCargo", maqsad:"Yuk tushirish", mezbon:"Sattorov Jasur", nuqta:"Ombor kirish",
   tarix:[["18-may, 11:20","Kirish — Ombor"],["18-may, 12:05","Chiqish — Ombor"]]},
  {nom:"Azizbek Norov", rol:"Xodim", vaqt:"14:28", id:"U056789020", tashkilot:"MKB (ichki xodim)", maqsad:"Ish smenasi", mezbon:"—", nuqta:"Asosiy kirish",
   tarix:[["24-may, 08:02","Kirish — Asosiy"],["23-may, 18:40","Chiqish — Asosiy"],["23-may, 08:05","Kirish — Asosiy"]]},
  {nom:"Madina Tursunova", rol:"Mehmon", vaqt:"14:27", id:"G56784567", tashkilot:"Investment Group", maqsad:"Uchrashuv", mezbon:"Ismoilov Otabek", nuqta:"Asosiy kirish",
   tarix:[["10-may, 15:30","Kirish — Asosiy"],["10-may, 16:45","Chiqish — Asosiy"]]}
];
const MEHMONLAR = [
  {nom:"Kamron Aliyev", id:"G56785678", tashkilot:"SecurTech Servis MChJ", maqsad:"Uchrashuv", mezbon:"Ismoilov Otabek", nuqta:"Asosiy kirish", kirishVaqti:"24-may, 14:20",
   tarix:[["24-may, 14:20","Kirish — Asosiy"]]},
  {nom:"Nargiza Karimova", id:"G56786789", tashkilot:"Prime Consulting", maqsad:"Konsultatsiya", mezbon:"Sattorov Jasur", nuqta:"Asosiy kirish", kirishVaqti:"24-may, 14:15",
   tarix:[["24-may, 14:15","Kirish — Asosiy"],["02-may, 10:00","Kirish — Asosiy"],["02-may, 11:20","Chiqish — Asosiy"]]},
  {nom:"Umid Soliyev", id:"G56787890", tashkilot:"Legal Partners", maqsad:"Huquqiy maslahat", mezbon:"Rahimov Bekzod", nuqta:"Asosiy kirish", kirishVaqti:"24-may, 14:10",
   tarix:[["24-may, 14:10","Kirish — Asosiy"]]},
  {nom:"Saida Rahimova", id:"G56788901", tashkilot:"Media Group", maqsad:"Intervyu", mezbon:"Ismoilov Otabek", nuqta:"Asosiy kirish", kirishVaqti:"24-may, 14:05",
   tarix:[["24-may, 14:05","Kirish — Asosiy"]]}
];

/* ---------- Foydalanuvchilar, hisobotlar, hududlar, auksion bosqichlari ---------- */
const FOYDLAR = [
  {nom:"Javlon Karimov", rol:"Administrator", teg:"admin", bolim:"IT bo'limi", faol:true, id:"U056789012", email:"javlon.karimov@mkbank.uz", lavozim:"Tizim administratori", tel:"+998 90 123 45 67", sana:"15-yan, 2022"},
  {nom:"Nilufar Ismoilova", rol:"Xavfsizlik operatori", teg:"operator", bolim:"Operatsion bo'lim", faol:true, id:"U056789013", email:"n.ismoilova@mkbank.uz", lavozim:"Katta operator", tel:"+998 91 234 56 78", sana:"03-mar, 2022"},
  {nom:"Bekzod Yusupov", rol:"Auditor", teg:"auditor", bolim:"Audit bo'limi", faol:true, id:"U056789014", email:"b.yusupov@mkbank.uz", lavozim:"Bosh auditor", tel:"+998 93 345 67 89", sana:"20-avg, 2021"},
  {nom:"Madina Tursunova", rol:"Moliya", teg:"moliya", bolim:"Moliya bo'limi", faol:true, id:"U056789015", email:"m.tursunova@mkbank.uz", lavozim:"Moliya mutaxassisi", tel:"+998 94 456 78 90", sana:"11-noy, 2022"},
  {nom:"Shahzod Abdullaev", rol:"Texnik xodim", teg:"texnik", bolim:"Texnik xizmat", faol:true, id:"U056789016", email:"sh.abdullaev@mkbank.uz", lavozim:"Texnik muhandis", tel:"+998 97 567 89 01", sana:"05-fev, 2023"},
  {nom:"Umid Safarov", rol:"Xavfsizlik operatori", teg:"operator", bolim:"Operatsion bo'lim", faol:false, id:"U056789017", email:"u.safarov@mkbank.uz", lavozim:"Xavfsizlik operatori", tel:"+998 88 678 90 12", sana:"14-iyul, 2023"},
  {nom:"Saida Rahimova", rol:"Moliya", teg:"moliya", bolim:"Moliya bo'limi", faol:true, id:"U056789018", email:"s.rahimova@mkbank.uz", lavozim:"Buxgalter", tel:"+998 99 789 01 23", sana:"22-sen, 2021"},
  {nom:"Jahongir Otajonov", rol:"Texnik xodim", teg:"texnik", bolim:"Texnik xizmat", faol:true, id:"U056789019", email:"j.otajonov@mkbank.uz", lavozim:"Elektrik", tel:"+998 95 890 12 34", sana:"09-dek, 2023"}
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
  ["elon","E'lon qilingan","#2E7BC4"],
  ["korik","Ko'rik / Muzokara","#0F5392"],
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
  const q = PORTFEL.qurilmalar;
  if (q.onlayn + q.beqaror + q.oflayn + q.tamirda !== q.jami) xato.push("qurilmalar yig'indisi mos emas");
  if (PORTFEL.kameralar.onlayn > PORTFEL.kameralar.jami) xato.push("kameralar soni mos emas");
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
    ["HODISALAR", HODISALAR, "kod"], ["QURILMALAR", QURILMALAR, "nom"],
    ["HUJJATLAR", HUJJATLAR, "nom"], ["XONALAR", XONALAR, "nom"],
    ["KAMERALAR", KAMERALAR, "kod"], ["TREVOGALAR", TREVOGALAR, "id"],
    ["KANALLAR", KANALLAR, "kanal"], ["TASDIQLAR", TASDIQLAR, "sarlavha"]
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
  HODISALAR, QURILMALAR, HUJJATLAR, XONALAR,
  KAMERALAR, TREVOGALAR, KANALLAR, TASDIQLAR, UCHASTKALAR,
  NAVBAT, MENING_VAZIFALARIM, BILDIRISHLAR, AUDIT_JURNAL,
  SERVIS_VAZIFALAR, EHTIYOT_QISMLAR, SILUET, VOQEALAR, SOROVLAR, MEHMONLAR,
  FOYDLAR, HISOBOTLAR, HUDUDLAR, AUKSION_BOSQICH, AVTO, KPI_BAZA,
  pul, son, fmt,
  bosqichStatistikasi, holatStatistikasi,
  jamiQarz, jamiBaho, moslikTekshiruvi,
  topish: id => YOZUVLAR.find(y => y.id === id),
  ishBoyicha: raqam => YOZUVLAR.find(y => y.ish.raqam === raqam)
};
})();
