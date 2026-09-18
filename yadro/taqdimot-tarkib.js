/* ============================================================
   taqdimot-tarkib.js — bank balansidagi ikki yuz oltmish yetti
   obyektning turlar bo'yicha tarkibi.

   Sonlar reyestrdan olingan. Har bir tur uchun nazoratni
   qiyinlashtiradigan omil va shu turga to'g'ri keladigan
   yechim raqamlari ko'rsatilgan (raqamlar yechimlar
   katalogidagi tartibga mos).
   ============================================================ */
window.MKB_TARKIB = (function () {
  "use strict";

  var TARKIB = [
    {
      kalit: "mamuriy", nom: "Ma'muriy bino", soni: 62,
      omil: "Ko'pchiligi shahar va tuman markazida, elektr tarmog'i yonidan o'tadi. Hisoblagich olib qo'yilgan, lekin ustun joyida turibdi.",
      yechim: [2, 4, 11], qiyinlik: "past"
    },
    {
      kalit: "avto", nom: "Avtotransport", soni: 42,
      omil: "Turgan joyi o'zgaradi, o'z quvvat manbai yo'q. Kamera bu yerda ish bermaydi — nazorat plomba va joylashuvga tayanadi.",
      yechim: [1, 5, 11], qiyinlik: "yuqori"
    },
    {
      kalit: "ferma", nom: "Chorvachilik fermasi", soni: 32,
      omil: "Aholi punktidan uzoqda, tarmoq tortish narxi obyekt qiymatiga yaqinlashadi. Hovlisi keng, perimetri uzun.",
      yechim: [3, 5, 8], qiyinlik: "yuqori"
    },
    {
      kalit: "uskuna", nom: "Asbob-uskuna", soni: 30,
      omil: "Bino ichida turadi va o'zi alohida obyekt emas. Uni qamrab olish uchun xonaga kirishni nazorat qilish yetarli.",
      yechim: [1, 5], qiyinlik: "past"
    },
    {
      kalit: "sex", nom: "Ishlab chiqarish sexi", soni: 24,
      omil: "Sanoat zonasida, ko'pida transformator uzeli saqlanib qolgan. Maydoni katta — bitta kamera ichkarini qamrab olmaydi.",
      yechim: [2, 4, 11], qiyinlik: "o'rta"
    },
    {
      kalit: "kopqavat", nom: "Ko'p qavatli uydagi xonadon", soni: 18,
      omil: "Podyezd va hovli boshqa egalar bilan umumiy. Bankka faqat eshikning o'zi tegishli, perimetr emas.",
      yechim: [1, 6], qiyinlik: "past"
    },
    {
      kalit: "dokon", nom: "Savdo do'koni", soni: 18,
      omil: "Ko'cha yuzida, vitrinasi katta va ko'rinib turadi. Elektr ulangan bo'lsa ham hisoblagich yopilgan.",
      yechim: [2, 4], qiyinlik: "past"
    },
    {
      kalit: "uy", nom: "Turar joy", soni: 16,
      omil: "Devor bilan o'ralgan hovli va bitta darvoza. Nazorat nuqtasi aniq, lekin elektr ko'pincha uzilgan.",
      yechim: [2, 6, 7], qiyinlik: "o'rta"
    },
    {
      kalit: "ombor", nom: "Omborxona", soni: 12,
      omil: "Kirish kamdan-kam bo'ladi, shuning uchun uzluksiz video shart emas. Muhimi — eshik ochilganini bilish.",
      yechim: [5, 6, 7], qiyinlik: "past"
    },
    {
      kalit: "issiqxona", nom: "Issiqxona", soni: 6,
      omil: "Konstruksiyasi yengil, qiymatning katta qismi plyonka va karkasda. Devorga jihoz o'rnatib bo'lmaydi.",
      yechim: [3, 5, 8], qiyinlik: "o'rta"
    },
    {
      kalit: "yuk", nom: "Yuk avtomobili", soni: 6,
      omil: "Kuzov yopiladi va plombalanadi. Joylashuv bilan birga kuzov ochilgani ham qayd etilishi kerak.",
      yechim: [1, 5, 11], qiyinlik: "yuqori"
    },
    {
      kalit: "texnika", nom: "Maxsus texnika", soni: 1,
      omil: "Yakka obyekt, lekin qiymati yuqori. Bitta obyekt uchun alohida yechim tanlash to'plamga qo'shishdan arzon.",
      yechim: [1, 8], qiyinlik: "yuqori"
    }
  ];

  var JAMI = TARKIB.reduce(function (a, t) { return a + t.soni; }, 0);
  var BINOSIZ = ["avto", "uskuna", "yuk", "texnika"].reduce(function (a, k) {
    var t = TARKIB.find(function (x) { return x.kalit === k; });
    return a + (t ? t.soni : 0);
  }, 0);

  return { TARKIB: TARKIB, JAMI: JAMI, BINOSIZ: BINOSIZ };
})();
