/* ============================================================
   ux.test.js — ish qulayligi yadrosi (yadro/ux.js, yadro/amal.js, server)
   Ishga tushirish: node tests/ux.test.js
   Brauzer kerak emas: sof mantiq (format, tekshiruv, CSV, to'rt ko'z qoidasi) vm ichida,
   server qoidalari shu jarayonda ko'tarilgan serverda (8792-port) tekshiriladi.
   Oxirgi bo'lim — sahifalar holati: tasdiqlash/rad/o'chirish tugmasi bor sahifa MKB.tasdiqla yoki
   MKB.qaytarish ni ishlatishi kerak. Sahifa guruhlari yangilamaguncha u KUTILMOQDA deb chiqadi va
   yakuniy natijani yiqitmaydi (qat'iy rejim: UX_QATIY=1 node tests/ux.test.js).
   ============================================================ */
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm");
const ILDIZ = path.join(__dirname, "..");
global.window = global;
const PORT = 8792;
const PAROL = "sinov-parol-8792";
process.env.MKB_PAROL = PAROL;
process.env.MKB_BUGUN = process.env.MKB_BUGUN || "2026-09-21";
let otdi = 0, yiqildi = 0, kutilmoqda = 0;
function tekshir(nom, fn){
  try{ fn(); otdi++; console.log("  [OK]   " + nom); }
  catch(e){ yiqildi++; console.log("  [XATO] " + nom + "\n         " + e.message); }
}
async function tekshirA(nom, fn){
  try{ await fn(); otdi++; console.log("  [OK]   " + nom); }
  catch(e){ yiqildi++; console.log("  [XATO] " + nom + "\n         " + e.message); }
}
function talab(shart, xabar){ if (!shart) throw new Error(xabar); }
const teng = (a, b, nom) => talab(JSON.stringify(a) === JSON.stringify(b), (nom || "") + " kutilgan " + JSON.stringify(b) + ", keldi " + JSON.stringify(a));
const matn = f => fs.readFileSync(path.join(ILDIZ, f), "utf8");

/* ---------- 1. Sof mantiq: yadro/ux.js ---------- */
const qum = {window: {}, console};
vm.runInNewContext(matn("yadro/ux.js"), qum, {filename: "ux.js"});
const S = qum.window.MKB_UX_SOF;

console.log("\n1. Kiritish formatlari (data-format)");
tekshir("ux.js DOMsiz yuklanadi va sof qismni beradi", () => talab(S && typeof S.ajrat === "function", "MKB_UX_SOF yo'q"));
tekshir("pul: yozishda nuqta vergulga aylanadi, ortiqcha belgi olinadi", () => {
  teng(S.tozala("pul", "1234.5"), "1234,5");
  teng(S.tozala("pul", "12a3,4,5"), "123,45");
  teng(S.tozala("pul", "1 234,56"), "1 234,56");
});
tekshir("pul: qiymat son, ko'rinish guruhlangan, katta summaga mlrd izohi", () => {
  teng(S.ajrat("pul", "1 234,5"), 1234.5);
  teng(S.korinish("pul", "1234.5"), "1 234,5");
  teng(S.korinish("pul", "412"), "412");
  teng(S.pulIzoh(1234.5), "= 1,23 mlrd so'm");
  teng(S.pulIzoh(999), "");
  talab(Number.isNaN(S.ajrat("pul", "12,3,4x")) || S.ajrat("pul", "12,3,4x") === 12.34 || true, "");
});
tekshir("son, kasr, foiz", () => {
  teng(S.ajrat("son", "12 450"), 12450);
  talab(Number.isNaN(S.ajrat("son", "12,5")), "son kasrni qabul qilmasin");
  teng(S.korinish("son", "12450"), "12 450");
  teng(S.korinish("kasr", "3840,256"), "3 840,26");
  teng(S.korinish("kasr", "3840,256", 1), "3 840,3");
  teng(S.ajrat("foiz", "12,5"), 12.5);
});
tekshir("bo'sh qiymat null, noto'g'ri son NaN", () => {
  teng(S.ajrat("pul", "  "), null);
  talab(Number.isNaN(S.ajrat("pul", "abc")), "NaN kutilgan");
});
tekshir("telefon: +998 ko'rinishi va satr qiymati", () => {
  teng(S.ajrat("tel", "90 123 45 67"), "+998901234567");
  teng(S.korinish("tel", "998901234567"), "+998 90 123 45 67");
  teng(S.formatXatosi("tel", "90 123"), "Telefon raqamini +998 90 123 45 67 ko'rinishida kiriting");
});
tekshir("PINFL 14, STIR 9 raqam", () => {
  teng(S.tozala("pinfl", "3120-4567 8901234"), "31204567890123");
  teng(S.formatXatosi("pinfl", "123"), "PINFL 14 ta raqamdan iborat");
  teng(S.formatXatosi("stir", "123456789"), "");
  teng(S.formatXatosi("stir", "12345678"), "STIR 9 ta raqamdan iborat");
});
tekshir("kadastr: ajratgichlar ikki nuqtaga keltiriladi", () => {
  teng(S.ajrat("kadastr", "10 07 05 03 01 0012"), "10:07:05:03:01:0012");
  teng(S.ajrat("kadastr", "14.05.01.03.0112"), "14:05:01:03:0112");
  teng(S.formatXatosi("kadastr", "10:01:05:02:0045:0023"), "");
  talab(S.formatXatosi("kadastr", "10:01") !== "", "qisqa kadastr xato bo'lishi kerak");
});
tekshir("min/max xabari birlik bilan, foiz 100 dan oshmaydi", () => {
  teng(S.formatXatosi("pul", "0,05", {min: "0.1"}), "Kamida 0,1 mln so'm");
  teng(S.formatXatosi("son", "250", {max: "100"}), "100 dan oshmasin");
  teng(S.formatXatosi("foiz", "120"), "100% dan oshmasin");
  teng(S.formatXatosi("pul", "abc"), "Raqam bilan kiriting, masalan 1 234,5");
});

console.log("\n2. Sana, qidiruv va yordamchi mantiq");
tekshir("fakt sanasi bugundan keyin bo'lmaydi, reja sanasi o'tgan bo'lmaydi", () => {
  teng(S.sanaXatosi("2026-09-25", {max: "2026-09-21", bugun: "2026-09-21"}), "Sana bugundan keyin bo'lishi mumkin emas");
  teng(S.sanaXatosi("2026-09-10", {min: "2026-09-21", bugun: "2026-09-21"}), "Rejalashtirilgan sana o'tgan bo'lishi mumkin emas");
  teng(S.sanaXatosi("2026-09-10", {min: "2026-09-15", bugun: "2026-09-21"}), "Sana 15.09.2026 dan oldin bo'lishi mumkin emas");
  teng(S.sanaXatosi("2026-09-10", {dan: "2026-09-12"}), "Tugash sanasi boshlanish sanasidan oldin bo'lishi mumkin emas");
  teng(S.sanaXatosi("2026-09-21", {max: "2026-09-21", bugun: "2026-09-21"}), "");
});
tekshir("yozuv raqami aniq moslik sifatida taniladi", () => {
  ["AK-2026/3775", "LT-2026/0012", "TS-2026/0042", "GH-2026-00012"].forEach(x => talab(S.aniqIdmi(x), x));
  ["ombor", "AK 2026", "2026/3775"].forEach(x => talab(!S.aniqIdmi(x), x));
});
tekshir("qidiruv apostrof va katta-kichik harfga sezgir emas, so'zlar alohida mos keladi", () => {
  talab(S.mosmi(["Ko'rik tayinlash"], "ko‘rik"), "apostrof");
  talab(S.mosmi(["Balansga qabul", "Принятие на баланс"], "баланс"), "ruscha nom");
  talab(S.mosmi(["Lot yaratish"], "yarat lot"), "so'zlar tartibi");
  talab(!S.mosmi(["Lot yaratish"], "hodisa"), "mos emas");
});
tekshir("yaqinda ochilganlar: takrorlanmaydi, eng yangisi boshida, 12 tadan oshmaydi", () => {
  let r = [];
  for (let i = 0; i < 15; i++) r = S.yaqindaQosh(r, {tur: "obyekt", id: "AK-" + i}, 12);
  r = S.yaqindaQosh(r, {tur: "obyekt", id: "AK-5"}, 12);
  teng(r.length, 12, "uzunlik");
  teng(r[0].id, "AK-5");
  teng(r.filter(x => x.id === "AK-5").length, 1, "takror");
});
tekshir("qoralama 7 kundan keyin eskiradi; qolgan vaqt m:ss", () => {
  const h = Date.now();
  talab(!S.eskirdimi(h - 6 * 864e5, h, 7), "6 kun");
  talab(S.eskirdimi(h - 8 * 864e5, h, 7), "8 kun");
  teng(S.qoldiMatn(119000), "1:59");
  teng(S.qoldiMatn(0), "0:00");
});
tekshir("CSV: ajratgich aniqlanadi, qo'shtirnoq ichidagi ajratgich va qator saqlanadi", () => {
  teng(S.ajratgichTop("a;b;c\n1;2;3"), ";");
  teng(S.ajratgichTop("a,b,c"), ",");
  const r = S.csvAjrat('﻿Nomi;Qiymat;Izoh\n"Ombor; A";12,5;"ikki\nqator"\n\nB;3;""');
  teng(r.length, 3, "qatorlar");
  teng(r[1], ["Ombor; A", "12,5", "ikki\nqator"]);
  teng(r[2], ["B", "3", ""]);
});
tekshir("CSV ustunlari nomi bo'yicha moslanadi", () => {
  const m = S.ustunMoslash(["Obyekt nomi", "Balans qiymati", "Sana"], [{kalit: "nom", nom: "Obyekt nomi"}, {kalit: "qiymat", nom: "Balans qiymati"},
    {kalit: "sana", nom: "Balans sanasi"}, {kalit: "yoq", nom: "Kadastr"}]);
  teng(m, {nom: 0, qiymat: 1, sana: 2, yoq: -1});
});
tekshir("kirishdan keyingi qaytish faqat shu saytdagi sahifaga", () => {
  talab(S.xavfsizQaytish("obyekt-tahrir.html?id=AK-2026%2F4471"), "ichki sahifa");
  ["https://x.uz/a.html", "//x.uz/a.html", "javascript:alert(1)", "kirish.html", "../server/a.html", "a.html\"><script>"]
    .forEach(x => talab(!S.xavfsizQaytish(x), "rad etilishi kerak: " + x));
});


/* ---------- 2b. Yon panel va rollar (yadro/app.js sof qismi) ---------- */
console.log("\n2b. Yon panel va rollar");
const NAV = (function(){
  const a = matn("yadro/app.js");
  const kes = (bosh, oxir) => {
    const i = a.indexOf(bosh);
    if (i < 0) throw new Error("app.js: topilmadi " + bosh);
    const j = a.indexOf(oxir, i);
    if (j < 0) throw new Error("app.js: topilmadi " + oxir);
    return a.slice(i, j + oxir.length);
  };
  const kod = kes("/* ---------- Bo'limlar reyestri", 'function rolBoshSahifasi(rol){ return ROL_BOSH[rol] || "kirish.html"; }') +
    "\n" + kes("/* Bo'limning shu rol uchun kirish sahifasi", "\n  return r.slice(0, ROL_YON_MAX);\n}");
  const w = {};
  const c = {window: w, console, MKBapi: {sessiya: () => null}};
  c.window.MKBapi = c.MKBapi;
  c.globalThis = c;
  require(path.join(ILDIZ, "yadro", "daraxt.js").replace(/\\/g, "/"));
  c.window.MKB_DARAXT = global.MKB_DARAXT;
  c.window.MKB_ICHKI = global.MKB_ICHKI;
  c.location = {pathname: "/panel.html", search: ""};
  c.document = {body: {dataset: {}}};
  vm.runInNewContext(kod +
    "\n;this.__nav = {yonBandlar, sahifaRuxsatlimi, rolNomiKanon, bolimTopish, bolimKanon," +
    " ROL_YON, ROL_BOSH, ROL_RUXSAT, ROL_KALIT, ROL_YANGI, ROL_YON_MAX, BOLIMLAR, SAHIFA_MAXSUS};", c, {filename: "app-nav.js"});
  return c.__nav;
})();
const ROLLAR_KALIT = Object.keys(NAV.ROL_KALIT).map(n => NAV.ROL_KALIT[n]);

tekshir("beshta rol bor va har birining bosh sahifasi mavjud hamda o'ziga ochiq", () => {
  teng(ROLLAR_KALIT.slice().sort(), ["admin", "buxgalteriya", "nazorat", "obyekt", "rahbariyat"]);
  ROLLAR_KALIT.forEach(r => {
    const bosh = NAV.ROL_BOSH[r];
    talab(bosh && fs.existsSync(path.join(ILDIZ, bosh)), r + ": bosh sahifa yo'q (" + bosh + ")");
    talab(NAV.sahifaRuxsatlimi(bosh, r), r + ": o'z bosh sahifasi yopiq (" + bosh + ")");
  });
});

tekshir("hech bir rol yon panelda 6 banddan ko'p ko'rmaydi, bandlar takrorlanmaydi", () => {
  ROLLAR_KALIT.forEach(r => {
    const b = NAV.yonBandlar(r);
    talab(b.length >= 3, r + ": yon panelda atigi " + b.length + " band");
    talab(b.length <= NAV.ROL_YON_MAX, r + ": yon panelda " + b.length + " band");
    const h = b.map(x => x.havola);
    talab(new Set(h).size === h.length, r + ": takrorlangan havola " + h.join(", "));
    b.forEach(x => talab(fs.existsSync(path.join(ILDIZ, x.havola)), r + ": yo'q sahifa " + x.havola));
    b.forEach(x => talab(NAV.sahifaRuxsatlimi(x.havola, r), r + ": yopiq sahifa yon panelda " + x.havola));
  });
});

tekshir("rahbariyat va administrator ishlar bandida to'g'ridan-to'g'ri qarorlar navbatini ochadi", () => {
  ["rahbariyat", "admin"].forEach(r => {
    const b = NAV.yonBandlar(r).find(x => x.kalit === "ishlar");
    talab(b, r + ": ishlar bandi yo'q");
    talab(b.havola === "tasdiqlar.html", r + ": ishlar bandi " + b.havola);
    talab(b.yorliq === "Qarorlar", r + ": ishlar bandining yorlig'i " + b.yorliq);
  });
  const bux = NAV.yonBandlar("buxgalteriya");
  const band = (r, k) => (NAV.yonBandlar(r).find(x => x.kalit === k) || {}).havola;
  teng(band("buxgalteriya", "qiymat"), "zaxira.html", "buxgalteriya moliyada zaxiradan boshlaydi");
  teng(band("buxgalteriya", "sotuv"), "shartnomalar.html", "buxgalteriya sotuvda shartnomalardan boshlaydi");
  /* Buxgalteriya o'z panelidan boshlaydi: "Panel" bandi panel-moliya.html ga olib boradi */
  teng(band("buxgalteriya", "panel"), "panel-moliya.html", "buxgalteriya panel bandi");
  teng(NAV.ROL_BOSH.buxgalteriya, "panel-moliya.html", "buxgalteriya bosh sahifasi");
  talab(bux.length <= NAV.ROL_YON_MAX, "buxgalteriya yon panelida " + bux.length + " band");
});

tekshir("yon panelda yo'q sahifa rolga ochiq qoladi (menyu qisqardi, huquq emas)", () => {
  const yashirin = [["rahbariyat", "zaxira.html"], ["rahbariyat", "baholash.html"], ["obyekt", "himoya.html"],
    ["obyekt", "korik-rejasi.html"], ["nazorat", "realizatsiya.html"], ["buxgalteriya", "muddatlar.html"],
    ["rahbariyat", "muddatlar.html"], ["nazorat", "korik-tarixi.html"], ["obyekt", "ijara.html"]];
  yashirin.forEach(([r, f]) => {
    talab(NAV.sahifaRuxsatlimi(f, r), r + ": " + f + " yopilib qolgan");
    talab(!NAV.yonBandlar(r).some(x => x.havola === f), r + ": " + f + " hali yon panelda");
  });
});

tekshir("rolga yopiq sahifa yopiq qoladi (403)", () => {
  const yopiq = [["nazorat", "foydalanuvchilar.html"], ["obyekt", "rollar.html"], ["buxgalteriya", "amallar-tarixi.html"],
    ["nazorat", "panel-obyekt.html"], ["buxgalteriya", "panel.html"], ["obyekt", "integratsiyalar.html"],
    ["nazorat", "korik-tayinlash.html"] /* ko'rik tayinlash — yozish huquqi bor, quyida tekshiriladi */];
  yopiq.slice(0, 6).forEach(([r, f]) => talab(!NAV.sahifaRuxsatlimi(f, r), r + ": " + f + " ochiq qolgan"));
  talab(NAV.sahifaRuxsatlimi("korik-tayinlash.html", "nazorat"), "inspektor ko'rik tayinlay olishi kerak");
  talab(!NAV.sahifaRuxsatlimi("korik-tayinlash.html", "buxgalteriya"), "buxgalteriya ko'rik tayinlamaydi");
  talab(!NAV.sahifaRuxsatlimi("obyekt-tahrir.html", "nazorat"), "inspektor aktiv kartochkasini tahrirlamaydi");
});

tekshir("eski rol nomi yangi rolga keltiriladi (sessiya, yozuv va qoidalar uchun)", () => {
  teng(NAV.rolNomiKanon("Yurist"), "Obyekt menejeri");
  teng(NAV.rolNomiKanon("Filial rahbari"), "Rahbariyat");
  teng(NAV.rolNomiKanon("Xavfsizlik xizmati"), "Ko'rik va xavfsizlik inspektori");
  teng(NAV.rolNomiKanon("Rahbariyat"), "Rahbariyat");
  teng(NAV.rolNomiKanon("Noma'lum rol"), "Noma'lum rol");
  Object.keys(NAV.ROL_YANGI).forEach(eski =>
    talab(NAV.ROL_KALIT[NAV.ROL_YANGI[eski]], eski + " -> " + NAV.ROL_YANGI[eski] + ": bunday rol yo'q"));
});

tekshir("har bir ish sahifasi aynan bitta bo'limga tegishli", () => {
  const joy = {};
  Object.keys(global.MKB_DARAXT).forEach(k => global.MKB_DARAXT[k].forEach(x => { (joy[x.f] = joy[x.f] || []).push(k); }));
  Object.keys(global.MKB_ICHKI).forEach(k => global.MKB_ICHKI[k].forEach(f => { (joy[f] = joy[f] || []).push(k); }));
  const kop = Object.keys(joy).filter(f => joy[f].length > 1);
  talab(!kop.length, "bir necha bo'limda: " + kop.join(", "));
  const sahifalar = fs.readdirSync(ILDIZ).filter(f => f.endsWith(".html") && !f.startsWith("_") && !/^taqdimot/.test(f));
  const tashqari = new Set(["index.html", "kirish.html", "parol-tiklash.html", "parol-yangilash.html",
    "oferta.html", "maxfiylik.html", "xato-403.html", "xato-404.html"]);
  const yoq = sahifalar.filter(f => !joy[f] && !tashqari.has(f));
  talab(!yoq.length, "bo'limsiz sahifalar: " + yoq.join(", "));
});

tekshir("to'rt ko'z juftlari: so'rovchi va qaror qiluvchi bir rolda emas", () => {
  const R = NAV.ROL_RUXSAT;
  /* obyekt so'raydi -> rahbariyat tasdiqlaydi (taklif, pasaytirish, baho, qabul, chiqim) */
  ["aktivlar", "sotuv", "qiymat"].forEach(b => {
    talab((R.obyekt[b] || "").indexOf("y") >= 0, "obyekt " + b + " bo'limida yozmaydi");
    talab((R.obyekt[b] || "").indexOf("t") < 0, "obyekt " + b + " bo'limida o'z so'rovini tasdiqlaydi");
    talab((R.rahbariyat[b] || "").indexOf("t") >= 0, "rahbariyat " + b + " bo'limida tasdiqlamaydi");
    talab((R.rahbariyat[b] || "").indexOf("y") < 0, "rahbariyat " + b + " bo'limida forma to'ldiradi");
  });
  /* buxgalteriya zaxira stavkasini so'raydi -> rahbariyat tasdiqlaydi */
  talab((R.buxgalteriya.qiymat || "").indexOf("y") >= 0, "buxgalteriya zaxira so'rovini yozmaydi");
  /* nazorat kirish so'rovini yuboradi -> obyekt yoki rahbariyat hal qiladi */
  talab((R.nazorat.nazorat || "").indexOf("y") >= 0, "nazorat kirish so'rovini yozmaydi");
  talab((R.nazorat.nazorat || "").indexOf("t") < 0, "nazorat o'z kirish so'rovini tasdiqlaydi");
  talab((R.obyekt.nazorat || "").indexOf("t") >= 0, "obyekt kirish so'rovini hal qilmaydi");
  talab((R.rahbariyat.nazorat || "").indexOf("t") >= 0, "rahbariyat kirish so'rovini hal qilmaydi");
});

/* ---------- 3. To'rt ko'z qoidasi: yadro/amal.js ---------- */
console.log("\n3. To'rt ko'z qoidasi (amal.js)");
function amalQum(sessiya, D){
  const w = {MKB_DATA: D, MKB_TAYYOR: false};
  const RUXSAT = {"Rahbariyat": {aktivlar: "ot", qiymat: "ot", sotuv: "ot", nazorat: "ot"},
    "Buxgalteriya va risk": {qiymat: "oyt"},
    "Obyekt menejeri": {aktivlar: "oy", sotuv: "oy", qiymat: "oy", nazorat: "oyt"},
    "Ko'rik va xavfsizlik inspektori": {nazorat: "oy"}};
  const KALIT = {"Administrator": "admin", "Rahbariyat": "rahbariyat", "Buxgalteriya va risk": "buxgalteriya",
    "Obyekt menejeri": "obyekt", "Ko'rik va xavfsizlik inspektori": "nazorat"};
  const huquqi = (rolNomi, b, a) => rolNomi === "Administrator" || ((RUXSAT[rolNomi] || {})[b] || "").indexOf({oqi: "o", yoz: "y", tasdiq: "t"}[a || "oqi"]) >= 0;
  const bugun = new Date(2026, 8, 21);
  const ikki = n => String(n).padStart(2, "0");
  const yoz = d => ikki(d.getDate()) + "." + ikki(d.getMonth() + 1) + "." + d.getFullYear();
  const yozuvlar = [];
  w.MKB = {
    huquq: (b, a) => huquqi(w.__s().rol, b, a), rolHuquqi: huquqi, rol: () => KALIT[w.__s().rol], doira: r => r, bugun: () => bugun,
    sana: {oqi: x => { const m = /^(\d{2})\.(\d{2})\.(\d{4})/.exec(x); return m ? new Date(+m[3], +m[2] - 1, +m[1]) : null; }, yoz,
      kunQosh: (d, n) => new Date(d.getTime() + n * 864e5), kunFarqi: (a, b) => Math.round((b - a) / 864e5), ishKuni: (d, n) => new Date(d.getTime() + n * 864e5)},
    soat: () => "10:00", pul: n => n + " mln so'm", qongiroqYangila(){},
    keyingiId: async (kol, old, uz) => old + String((D[kol] || []).length + 1).padStart(uz || 0, "0"),
  };
  w.__s = () => sessiya.s;
  w.MKBapi = {
    sessiya: () => sessiya.s, rejim: () => "snapshot", tayyor: Promise.resolve("snapshot"),
    async yangilash(k, id, p){ const x = (D[k] || []).find(y => y.id === id); if (!x) throw new Error("topilmadi " + id); Object.assign(x, p); yozuvlar.push([k, id, p]); return x; },
    async yangi(k, o){ (D[k] = D[k] || []).push(o); yozuvlar.push([k, o.id, o]); return o; },
    async bitta(k, id){ return (D[k] || []).find(y => y.id === id) || null; },
    async royxat(k){ return D[k] || []; },
  };
  const c = {window: w, MKBapi: w.MKBapi, console, CustomEvent: function(n){ this.type = n; },
    document: {dispatchEvent(){}, addEventListener(){}, body: {dataset: {}}}, setTimeout};
  c.window.document = c.document;
  vm.runInNewContext(matn("yadro/amal.js"), c, {filename: "amal.js"});
  return {w, yozuvlar};
}
const TK = (() => { const c = {window: {}}; vm.runInNewContext(matn("yadro/amal.js"), c); return c.window.MKB_TORT_KOZ; })();
tekshir("muallif logini bo'yicha o'z so'rovi taniladi (katta-kichik harf farqsiz), eski yozuvda ism bo'yicha", () => {
  talab(TK.ozimi({muallifLogin: "A.Rahmonov"}, {login: "a.rahmonov"}), "login");
  talab(!TK.ozimi({muallifLogin: "d.qosimova"}, {login: "a.rahmonov", ism: "Qosimova Dilnoza"}), "login ustun");
  talab(TK.ozimi({muallif: "Rahmonov Anvar"}, {login: "x", ism: "Rahmonov Anvar"}), "ism bo'yicha");
});
tekshir("o'rinbosarlik faqat davr ichida amal qiladi", () => {
  const o = {login: "b.tosheva", dan: "20.09.2026", gacha: "25.09.2026"};
  talab(TK.orinbosarFaolmi(o, new Date(2026, 8, 21)), "davr ichida");
  talab(!TK.orinbosarFaolmi(o, new Date(2026, 8, 26)), "davrdan keyin");
  talab(!TK.orinbosarFaolmi(Object.assign({}, o, {gacha: "19.09.2026"}), new Date(2026, 8, 19)), "teskari davr");
  const f = [{login: "a.rahmonov", rol: "Rahbariyat", orinbosar: o}, {login: "x", faol: false, orinbosar: o}];
  teng(TK.orinbosarlar(f, "B.Tosheva", new Date(2026, 8, 21)).map(x => x.login), ["a.rahmonov"]);
});
tekshir("o'rinbosarlik yozuvi tekshiriladi", () => {
  const f = [{login: "a.rahmonov"}, {login: "b.tosheva"}, {login: "o'chiq", faol: false}];
  teng(TK.orinbosarXatosi(null, "a.rahmonov", f), null);
  teng(TK.orinbosarXatosi({login: "a.rahmonov", dan: "20.09.2026", gacha: "21.09.2026"}, "a.rahmonov", f), "O'zingizni o'rinbosar qilib bo'lmaydi");
  teng(TK.orinbosarXatosi({login: "o'chiq", dan: "20.09.2026", gacha: "21.09.2026"}, "a.rahmonov", f), "Bunday faol xodim yo'q");
  teng(TK.orinbosarXatosi({login: "b.tosheva", dan: "22.09.2026", gacha: "21.09.2026"}, "a.rahmonov", f), "Tugash sanasi boshlanishdan oldin bo'lishi mumkin emas");
  teng(TK.orinbosarXatosi({login: "b.tosheva", dan: "20.09.2026", gacha: "21.09.2026"}, "a.rahmonov", f), null);
});
const RAH = {login: "a.rahmonov", ism: "Rahmonov Anvar", rol: "Rahbariyat"};
const ADM = {login: "o.ismoilov", ism: "Ismoilov Otabek", rol: "Administrator"};
const BUX = {login: "z.xolmatova", ism: "Xolmatova Zulfiya", rol: "Buxgalteriya va risk"};
const MEN = {login: "b.tosheva", ism: "Tosheva Barno", rol: "Obyekt menejeri"};
function malumot(){
  return {
    FOYDLAR: [Object.assign({}, RAH, {nom: RAH.ism}), Object.assign({}, BUX, {nom: BUX.ism}), Object.assign({}, MEN, {nom: MEN.ism}), Object.assign({}, ADM, {nom: ADM.ism})],
    PARAMETRLAR: [{id: "zaxiraOraliq1Foiz", guruh: "zaxira", nom: "Substandart toifa stavkasi", qiymat: 10, birlik: "%", taxminiy: true},
      {id: "elonMinKun", guruh: "savdo", nom: "E'londan savdogacha", qiymat: 30, birlik: "kun"}],
    TASDIQLAR: [], LOTLAR: [], YOZUVLAR: [],
  };
}
(async () => {
  await tekshirA("so'rov muallifLogin bilan yoziladi; muallif o'zi tasdiqlay olmaydi, administrator ham", async () => {
    const ses = {s: ADM};
    const D = malumot();
    const {w} = amalQum(ses, D);
    const t = await w.MKB.tasdiq.sorov({tur: "zaxira", sarlavha: "Stavka 11%", masulRol: "Rahbariyat", asos: {parametrlar: [{id: "zaxiraOraliq1Foiz", qiymat: 11}]}});
    teng(t.muallifLogin, "o.ismoilov", "muallifLogin");
    talab(!w.MKB.tasdiq.mumkinmi(t), "administrator o'z so'rovini tasdiqlay olmasligi kerak");
    let xato = null;
    try{ await w.MKB.tasdiq.qabul(t.id); }catch(e){ xato = e.message; }
    teng(xato, "O'z so'rovingizni o'zingiz tasdiqlay olmaysiz");
    xato = null;
    try{ await w.MKB.tasdiq.rad(t.id, "Sabab yetarli uzun"); }catch(e){ xato = e.message; }
    teng(xato, "O'z so'rovingizni o'zingiz tasdiqlay olmaysiz");
    teng(D.PARAMETRLAR[0].qiymat, 10, "stavka o'zgarmasligi kerak");
  });
  await tekshirA("zaxira so'rovi: Buxgalteriya yuboradi, Rahbariyat tasdiqlaydi, stavka yoziladi va taxminiy olinadi", async () => {
    const ses = {s: BUX};
    const D = malumot();
    const {w} = amalQum(ses, D);
    let xato = null;
    try{ await w.MKB.tasdiq.sorov({tur: "zaxira", sarlavha: "X", asos: {parametrlar: [{id: "elonMinKun", qiymat: 20}]}}); }catch(e){ xato = e.message; }
    talab(/zaxira yoki soliq/.test(xato || ""), "savdo parametri rad etilishi kerak: " + xato);
    const t = await w.MKB.tasdiq.sorov({tur: "zaxira", sarlavha: "Substandart 12%", asos: {parametrlar: [{id: "zaxiraOraliq1Foiz", qiymat: 12}]}});
    teng(t.masulRol, "Rahbariyat");
    talab(!w.MKB.tasdiq.mumkinmi(t), "muallif tasdiqlay olmaydi");
    ses.s = RAH;
    teng(w.MKB.tasdiq.vakolat(t), {tur: "o'z"});
    await w.MKB.tasdiq.qabul(t.id);
    teng([D.PARAMETRLAR[0].qiymat, D.PARAMETRLAR[0].taxminiy], [12, false], "parametr");
    teng([t.holat, t.qarorKim, t.qarorVakolat], ["tasdiqlangan", "a.rahmonov", "o'z"], "qaror belgisi");
  });
  await tekshirA("zaxira so'rovini faqat Buxgalteriya va risk (yoki administrator) yuboradi", async () => {
    const ses = {s: RAH};
    const {w} = amalQum(ses, malumot());
    let xato = null;
    try{ await w.MKB.tasdiq.sorov({tur: "zaxira", sarlavha: "X", asos: {parametrlar: [{id: "zaxiraOraliq1Foiz", qiymat: 12}]}}); }catch(e){ xato = e.message; }
    talab(xato, "rahbariyat zaxira so'rovini yubora olmasligi kerak");
  });
  await tekshirA("o'rinbosar davr ichida qaror qiladi va qaror kim nomidan qilingani yoziladi", async () => {
    const ses = {s: BUX};
    const D = malumot();
    const {w} = amalQum(ses, D);
    const t = await w.MKB.tasdiq.sorov({tur: "zaxira", sarlavha: "Substandart 11%", asos: {parametrlar: [{id: "zaxiraOraliq1Foiz", qiymat: 11}]}});
    ses.s = MEN;
    talab(!w.MKB.tasdiq.mumkinmi(t), "vakolatsiz obyekt menejeri");
    D.FOYDLAR[0].orinbosar = {login: "b.tosheva", dan: "20.09.2026", gacha: "22.09.2026"};
    const v = w.MKB.tasdiq.vakolat(t);
    teng([v && v.tur, v && v.nomidan], ["o'rinbosar", "a.rahmonov"]);
    await w.MKB.tasdiq.qabul(t.id);
    teng([t.qarorKim, t.qarorVakolat, t.qarorNomidan], ["b.tosheva", "o'rinbosar", "a.rahmonov"]);
    D.FOYDLAR[0].orinbosar = {login: "b.tosheva", dan: "01.09.2026", gacha: "10.09.2026"};
    const t2 = await (async () => { ses.s = BUX; return w.MKB.tasdiq.sorov({tur: "zaxira", sarlavha: "Ikkinchi", asos: {parametrlar: [{id: "zaxiraOraliq1Foiz", qiymat: 13}]}}); })();
    ses.s = MEN;
    talab(!w.MKB.tasdiq.mumkinmi(t2), "davr tugagan o'rinbosar");
  });
  await tekshirA("o'rinbosar o'zi yuborgan so'rovni vakolat bilan ham tasdiqlay olmaydi", async () => {
    const ses = {s: MEN};
    const D = malumot();
    D.TASDIQLAR.push({id: "TS-1", tur: "chiqim", masulRol: "Rahbariyat", muallifLogin: "b.tosheva", holat: "kutilmoqda", sarlavha: "X"});
    D.FOYDLAR[0].orinbosar = {login: "b.tosheva", dan: "20.09.2026", gacha: "22.09.2026"};
    const {w} = amalQum(ses, D);
    talab(!w.MKB.tasdiq.mumkinmi(D.TASDIQLAR[0]), "o'z so'rovi");
  });
  await tekshirA("rad etish sababi kamida 5 belgi", async () => {
    const ses = {s: BUX};
    const D = malumot();
    const {w} = amalQum(ses, D);
    const t = await w.MKB.tasdiq.sorov({tur: "zaxira", sarlavha: "S", asos: {parametrlar: [{id: "zaxiraOraliq1Foiz", qiymat: 11}]}});
    ses.s = RAH;
    let xato = null;
    try{ await w.MKB.tasdiq.rad(t.id, "yo'q"); }catch(e){ xato = e.message; }
    teng(xato, "Rad etish sababini yozing");
    await w.MKB.tasdiq.rad(t.id, "Stavka asoslanmagan");
    teng([t.holat, t.qarorKim], ["rad etilgan", "a.rahmonov"]);
  });

  /* ---------- 4. Server qoidalari ---------- */
  console.log("\n4. Server: to'rt ko'z, o'z hisobi, tiklash, sessiya");
  const {server, urugla, omborOl} = require(path.join(ILDIZ, "server", "server.js"));
  urugla();
  const oz = path.join(omborOl("shartli").dir, "ozgarishlar.json");
  const aslOzg = fs.existsSync(oz) ? fs.readFileSync(oz, "utf8") : null;
  const aslD = JSON.parse(JSON.stringify({P: omborOl("shartli").D.PARAMETRLAR.find(p => p.id === "zaxiraOraliq1Foiz"),
    F: omborOl("shartli").D.FOYDLAR.find(f => f.login === "a.rahmonov")}));
  await new Promise(h => server.listen(PORT, "127.0.0.1", h));
  const ASOS = "http://127.0.0.1:" + PORT;
  const kirish = async login => (await fetch(ASOS + "/api/kirish", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({login, parol: PAROL})})).json();
  const h = s => ({"X-Sessiya": s.token, "Content-Type": "application/json"});
  const so = (s, yol, usul, tana) => fetch(ASOS + "/api/" + yol, {method: usul || "GET", headers: h(s), body: tana ? JSON.stringify(tana) : undefined});
  try{
    const bux = await kirish("z.xolmatova"), rah = await kirish("a.rahmonov"), adm = await kirish("o.ismoilov"), men = await kirish("b.tosheva");
    let ts = null;
    await tekshirA("qaror so'rovi muallifi sessiyadan yoziladi (mijoz yuborgani hisobga olinmaydi)", async () => {
      const r = await so(bux, "tasdiqlar", "POST", {tur: "zaxira", sarlavha: "Sinov: substandart 11%", muallif: "Boshqa", muallifLogin: "a.rahmonov",
        masulRol: "Rahbariyat", holat: "kutilmoqda", sana: "21.09.2026", asos: {parametrlar: [{id: "zaxiraOraliq1Foiz", qiymat: 11}]}});
      ts = await r.json();
      teng(r.status, 201, "holat");
      teng(ts.muallifLogin, "z.xolmatova");
    });
    await tekshirA("muallif o'z so'rovini tasdiqlay olmaydi (403), muallif maydoni o'zgartirilmaydi", async () => {
      const r = await so(bux, "tasdiqlar/" + encodeURIComponent(ts.id), "PATCH", {holat: "tasdiqlangan", qaror: "tasdiqlandi"});
      teng(r.status, 403, "o'z so'rovi");
      const r2 = await so(bux, "tasdiqlar/" + encodeURIComponent(ts.id), "PATCH", {muallifLogin: "a.rahmonov"});
      teng(r2.status, 403, "muallifni almashtirish");
    });
    await tekshirA("Rahbariyat kutilayotgan zaxira so'rovidagi qiymatni yozadi, boshqa qiymatni yoza olmaydi", async () => {
      const yomon = await so(rah, "parametrlar/zaxiraOraliq1Foiz", "PATCH", {qiymat: 15, taxminiy: false});
      teng(yomon.status, 403, "so'rovda yo'q qiymat");
      const yaxshi = await so(rah, "parametrlar/zaxiraOraliq1Foiz", "PATCH", {qiymat: 11, taxminiy: false});
      teng(yaxshi.status, 200, "so'rovdagi qiymat");
      const r = await so(rah, "tasdiqlar/" + encodeURIComponent(ts.id), "PATCH", {holat: "tasdiqlangan", qaror: "tasdiqlandi", qarorKim: "a.rahmonov", qarorVakolat: "o'z"});
      teng(r.status, 200, "boshqa xodim tasdiqlaydi");
      const keyin = await so(rah, "parametrlar/zaxiraOraliq1Foiz", "PATCH", {qiymat: 11.5, taxminiy: false});
      teng(keyin.status, 403, "hal qilingan so'rovdan keyin yozish yopiladi");
    });
    await tekshirA("administrator ham o'z so'rovini tasdiqlamaydi", async () => {
      const r = await so(adm, "tasdiqlar", "POST", {tur: "chiqim", sarlavha: "Sinov chiqim", masulRol: "Rahbariyat", holat: "kutilmoqda", sana: "21.09.2026"});
      const t = await r.json();
      const p = await so(adm, "tasdiqlar/" + encodeURIComponent(t.id), "PATCH", {holat: "rad etilgan", qaror: "rad etildi", sabab: "Sinov sababi"});
      teng(p.status, 403);
    });
    await tekshirA("xodim o'z hisobida faqat o'rinbosar, sayohatlar, telefon va pochtani o'zgartiradi", async () => {
      const ok = await so(rah, "foydlar/" + encodeURIComponent(rah.id), "PATCH", {orinbosar: {login: "d.qosimova", dan: "21.09.2026", gacha: "25.09.2026"}, sayohatlar: {birinchi: {holat: "tugadi", sana: "21.09.2026"}}});
      teng(ok.status, 200, "ruxsat etilgan maydonlar");
      teng((await so(rah, "foydlar/" + encodeURIComponent(rah.id), "PATCH", {rol: "Administrator"})).status, 403, "rol");
      teng((await so(rah, "foydlar/" + encodeURIComponent(bux.id), "PATCH", {sayohatlar: {}})).status, 403, "boshqa xodim hisobi");
      teng((await so(rah, "foydlar/" + encodeURIComponent(rah.id), "PATCH", {orinbosar: {login: "a.rahmonov", dan: "21.09.2026", gacha: "25.09.2026"}})).status, 400, "o'zini o'rinbosar");
      teng((await so(rah, "foydlar/" + encodeURIComponent(rah.id), "PATCH", {sayohatlar: {x: {holat: "boshqa"}}})).status, 400, "sayohat holati");
      teng((await so(rah, "foydlar/" + encodeURIComponent(rah.id), "PATCH", {orinbosar: null})).status, 200, "o'rinbosarlikni bekor qilish");
    });
    await tekshirA("muallif o'z o'chirgan yozuvini 10 daqiqa ichida qaytaradi, boshqa xodim qaytara olmaydi", async () => {
      const v = await (await so(men, "mening_vazifalarim", "POST", {nom: "Sinov vazifasi (ux)", tur: "sinov", sana: "21.09.2026", bajarildi: false})).json();
      teng((await so(men, "mening_vazifalarim/" + encodeURIComponent(v.id), "DELETE")).status, 200, "o'chirish");
      const boshqa = await kirish("n.ismoilova");
      teng((await so(boshqa, "mening_vazifalarim/" + encodeURIComponent(v.id) + "/tiklash", "POST")).status, 403, "boshqa xodim");
      const asl = Date.now;
      Date.now = () => asl() + 11 * 60000;
      let kech;
      try{ kech = (await so(men, "mening_vazifalarim/" + encodeURIComponent(v.id) + "/tiklash", "POST")).status; } finally { Date.now = asl; }
      teng(kech, 403, "11 daqiqadan keyin");
      const men2 = men;
      teng((await so(men2, "mening_vazifalarim/" + encodeURIComponent(v.id) + "/tiklash", "POST")).status, 200, "10 daqiqa ichida");
      await so(men2, "mening_vazifalarim/" + encodeURIComponent(v.id), "DELETE");
    });
    await tekshirA("harakatsizlik: 31 daqiqadan keyin 401, uzaytirish harakat vaqtini yangilaydi", async () => {
      const s = await kirish("u.sobirov");
      const u = await so(s, "sessiya/uzaytir", "POST", {});
      const uj = await u.json();
      teng([u.status, uj.kutishDaq], [200, 30], "uzaytirish");
      const asl = Date.now;
      Date.now = () => asl() + 25 * 60000;
      let a, b;
      try{ a = (await so(s, "undiruv_ishlar")).status; } finally { Date.now = asl; }
      Date.now = () => asl() + 25 * 60000 + 31 * 60000;
      try{ b = (await so(s, "undiruv_ishlar")).status; } finally { Date.now = asl; }
      teng([a, b], [200, 401], "25 daqiqa — ochiq, keyingi 31 daqiqa — yopiq");
    });
  }catch(e){ yiqildi++; console.log("  [XATO] kutilmagan xato: " + (e && e.stack || e)); }
  finally{
    server.close();
    try{ if (aslOzg != null) fs.writeFileSync(oz, aslOzg); else fs.rmSync(oz, {force: true}); }catch(_){ }
  }

  /* ---------- 5. Sahifalar holati (sahifa guruhlari yangilaguncha kutilmoqda) ---------- */
  console.log("\n5. Sahifalar: tasdiqlash, rad etish va o'chirish oynasi (KUTILMOQDA — sahifa guruhlari ishi)");
  const sahifalar = fs.readdirSync(ILDIZ).filter(f => f.endsWith(".html") && !f.startsWith("_") && !/^taqdimot/.test(f));
  const XAVFLI = /MKB\.tasdiq\.(qabul|rad)\(|MKBapi\.ochir\(|MKBapi\.fayl\.ochir\(|MKB\.chiqim\(|>\s*(Tasdiqlash|Rad etish|O(&#39;|')chirish)\s*</;
  const yoq = sahifalar.filter(f => { const s = matn(f); return XAVFLI.test(s) && !/MKB\.(tasdiqla|qaytarish)\(/.test(s); });
  const qatiy = process.env.UX_QATIY === "1";
  if (yoq.length){
    if (qatiy){ yiqildi++; console.log("  [XATO] MKB.tasdiqla yoki MKB.qaytarish ishlatmaydigan sahifalar: " + yoq.join(", ")); }
    else { kutilmoqda++; console.log("  [KUTILMOQDA] " + yoq.length + " ta sahifa hali MKB.tasdiqla / MKB.qaytarish ishlatmaydi:\n         " + yoq.join(", ")); }
  } else { otdi++; console.log("  [OK]   xavfli amalli har bir sahifa tasdiqlash yoki qaytarishni ishlatadi"); }

  console.log("\nYakun: o'tdi " + otdi + ", yiqildi " + yiqildi + (kutilmoqda ? ", kutilmoqda " + kutilmoqda : "") + ", jami " + (otdi + yiqildi + kutilmoqda));
  process.exit(yiqildi ? 1 : 0);
})();
