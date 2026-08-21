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
      tur: "Kvartira", nom: "Yunusobod 12-kvartal, 45-uy, 23-xonadon",
      hudud: "Toshkent sh.", hududToliq: "Toshkent sh., Yunusobod", manzil: "Yunusobod 12-kvartal, 45-uy",
      maydon: "78 m²", baho: 520.0, bahoSana: "18.02.2026", sugurta: "Amalda",
      rasm: "assets/bino_9.png", nazoratBall: 72
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
      tur: "Ishlab chiqarish", nom: "Zarafshon Tekstil ishlab chiqarish sexi",
      hudud: "Samarqand", hududToliq: "Samarqand vil., Samarqand sh.", manzil: "Sanoat ko'chasi, 4",
      maydon: "9 400 m²", baho: 4150.0, bahoSana: "05.12.2025", sugurta: "Amalda",
      rasm: "assets/bino_mall.png", nazoratBall: 89, qabul: "21.11.2025"
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
      tur: "Kvartira", nom: "Chilonzor 9-kvartal, 12-uy, 56-xonadon",
      hudud: "Toshkent sh.", hududToliq: "Toshkent sh., Chilonzor", manzil: "Chilonzor 9-kvartal, 12-uy",
      maydon: "64 m²", baho: 340.0, bahoSana: "11.03.2026", sugurta: "Amalda",
      rasm: "assets/bino_qavatlar.png", nazoratBall: 70
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
      tur: "Savdo maydoni", nom: "Navruz Plaza, 3-qavat savdo maydoni",
      hudud: "Toshkent sh.", hududToliq: "Toshkent sh., Shayxontohur", manzil: "Amir Temur ko'chasi, 88",
      maydon: "1 850 m²", baho: 1480.0, bahoSana: "22.04.2026", sugurta: "Amalda",
      rasm: "assets/bino_tower.png", nazoratBall: 92, qabul: "14.08.2025"
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
      tur: "Avtotransport", nom: "Chevrolet Malibu 2 (2023) · 01 A 887 KA",
      hudud: "Toshkent sh.", hududToliq: "Toshkent sh., Mirobod", manzil: "Saqlash maydonchasi, Mirobod",
      maydon: "—", baho: 186.0, bahoSana: "02.04.2026", sugurta: "Amalda",
      rasm: "assets/kam_avto.png", nazoratBall: 64
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
      tur: "Turar-joy majmuasi", nom: "Nurafshon turar-joy majmuasi, 18-uy",
      hudud: "Nurafshon sh.", hududToliq: "Toshkent vil., Nurafshon", manzil: "Istiqlol ko'chasi, 21",
      maydon: "96 m²", baho: 395.0, bahoSana: "30.01.2026", sugurta: "Amalda",
      rasm: "assets/bino_turar.png", nazoratBall: 76
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
      tur: "Yer uchastkasi", nom: "Qibray tumani, 2,4 ga yer uchastkasi",
      hudud: "Toshkent vil.", hududToliq: "Toshkent vil., Qibray", manzil: "Qibray tumani, Salor MFY",
      maydon: "24 000 m²", baho: 1020.0, bahoSana: "16.10.2025", sugurta: "Yo'q",
      rasm: "assets/bino_yer.png", nazoratBall: 61
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
      tur: "Dala hovli", nom: "Chorvoq dala hovlisi",
      hudud: "Bo'stonliq tum.", hududToliq: "Toshkent vil., Bo'stonliq", manzil: "Chorvoq qirg'og'i, 12",
      maydon: "850 m²", baho: 620.0, bahoSana: "02.03.2026", sugurta: "Amalda",
      rasm: "assets/bino_dacha.png", nazoratBall: 68
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
   baho: 4200.0, rasm: "assets/bino_9.png", ish: "UI-2024/0286", ijro: "IV-2024/0286",
   bosqich: "elon", korik: 2},
  {id: "GR-2024/0512", nom: "Chorsu Savdo Markazi, B blok", tur: "Savdo maydoni",
   baho: 2400.0, rasm: "assets/bino_mall.png", ish: "UI-2024/0512", ijro: "IV-2024/0512",
   bosqich: "rasmiylashtirish", korik: 0}
];

/* ---------- Doimiy arxiv: realizatsiya yakunlangan obyektlar (Д-6) ---------- */
const ARXIV = [
  {kod: "GR-2023/0088", nom: "Yakkasaroy 2-xonali kvartirasi", tur: "Kvartira",
   sotilgan: "18-may, 2026", yil: "2026", xaridor: "Soliyev Umidjon",
   summa: 640.0, ish: "UI-2023/0088", qabul: "12-yan, 2025", nazorat: "16 oy", rasm: "assets/bino_turar.png"},
  {kod: "GR-2022/0034", nom: "Chimyon dala hovlisi", tur: "Dala hovli",
   sotilgan: "02-may, 2026", yil: "2026", xaridor: "Alimov Sardor",
   summa: 980.0, ish: "UI-2022/0034", qabul: "20-avg, 2024", nazorat: "21 oy", rasm: "assets/bino_dacha.png"},
  {kod: "GR-2023/0156", nom: "Olmazor savdo do'koni", tur: "Savdo maydoni",
   sotilgan: "20-apr, 2026", yil: "2026", xaridor: "«Turon Retail» MChJ",
   summa: 1150.0, ish: "UI-2023/0156", qabul: "03-iyl, 2025", nazorat: "9 oy", rasm: "assets/bino_mall.png"},
  {kod: "GR-2022/0077", nom: "Bektemir ombori", tur: "Ombor",
   sotilgan: "11-dek, 2025", yil: "2025", xaridor: "«Sifat Qurilish» MChJ",
   summa: 3350.0, ish: "UI-2022/0077", qabul: "28-fev, 2025", nazorat: "10 oy", rasm: "assets/bino_9.png"},
  {kod: "GR-2021/0203", nom: "Chilonzor ofis binosi", tur: "Ofis binosi",
   sotilgan: "30-okt, 2025", yil: "2025", xaridor: "«Humo Trade» MChJ",
   summa: 2780.0, ish: "UI-2021/0203", qabul: "15-yan, 2025", nazorat: "9 oy", rasm: "assets/bino_humo.png"},
  {kod: "GR-2023/0119", nom: "Zangiota yer uchastkasi", tur: "Yer uchastkasi",
   sotilgan: "14-iyl, 2025", yil: "2025", xaridor: "«Agrotex Invest» MChJ",
   summa: 760.0, ish: "UI-2023/0119", qabul: "09-sen, 2024", nazorat: "10 oy", rasm: "assets/bino_yer.png"}
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
  return xato;
}

window.MKB_DATA = {
  BOSQICHLAR, YOZUVLAR, PORTFEL, SOTUV, ARXIV, XARITA_NUQTALARI,
  pul, son, fmt,
  bosqichStatistikasi, holatStatistikasi,
  jamiQarz, jamiBaho, moslikTekshiruvi,
  topish: id => YOZUVLAR.find(y => y.id === id),
  ishBoyicha: raqam => YOZUVLAR.find(y => y.ish.raqam === raqam)
};
})();
