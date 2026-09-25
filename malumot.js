/* ============================================================
   malumot.js — yagona ma'lumot manbai (yadro)
   Tizim bank balansidagi aktivlarni boshqaradi: balansga qabul,
   huquqni rasmiylashtirish, baholash, himoya, sotuvga tayyorlash,
   lot, shartnoma va balansdan chiqarish.

   Yuklanish tartibi: malumot.js -> malumot-qoshimcha.js ->
   malumot-kengaytma.js -> malumot-kirish.js -> malumot-indeks.js

   Ikki rejim (D.MANBA):
   - "mahalliy": localhost orqali ochilganda mahalliy/obyektlar.json
     o'qiladi. Faqat haqiqiy reyestr, qolgan to'plamlar bo'sh boshlanadi.
   - "shartli": namoyish. 267 ta shartli aktiv va ularga bog'liq
     yozuvlar deterministik yaratiladi, sanalar bugun() ga nisbatan.
   ============================================================ */
(function () {
"use strict";
const W = typeof window !== "undefined" ? window : globalThis;

/* ============================================================
   1. Sana
   ============================================================ */
const OY_QISQA = ["yan", "fev", "mar", "apr", "may", "iyn", "iyl", "avg", "sen", "okt", "noy", "dek"];
const OY_TOLIQ = ["yanvar", "fevral", "mart", "aprel", "may", "iyun", "iyul", "avgust", "sentabr", "oktabr", "noyabr", "dekabr"];
const OY_XARITA = {};
OY_QISQA.forEach((o, i) => { OY_XARITA[o] = i; });
OY_TOLIQ.forEach((o, i) => { OY_XARITA[o] = i; });
Object.assign(OY_XARITA, {iyun: 5, iyul: 6, sentyabr: 8, okt: 9, noyabr: 10});

/* Bugungi sana. ?bugun=YYYY-MM-DD faqat testlar va taqdimot suratlari uchun sanani qotiradi.
   Qotirilgan sana shu brauzer oynasi yopilguncha saqlanadi (sessionStorage), ?bugun= bo'sh
   qiymat bilan bekor qilinadi. Node testlarida window.MKB_BUGUN = "YYYY-MM-DD" beriladi. */
function bugunAniqla() {
  let matn = null;
  try {
    if (typeof location !== "undefined" && location.search) {
      const p = new URLSearchParams(location.search);
      if (p.has("bugun")) {
        matn = p.get("bugun");
        if (/^\d{4}-\d{2}-\d{2}$/.test(matn)) sessionStorage.setItem("mkb-bugun", matn);
        else sessionStorage.removeItem("mkb-bugun");
      }
    }
    if (!matn && typeof sessionStorage !== "undefined") matn = sessionStorage.getItem("mkb-bugun");
  } catch (_) { /* location yoki sessionStorage yo'q */ }
  if (!matn && typeof W.MKB_BUGUN === "string") matn = W.MKB_BUGUN;
  const m = matn && /^(\d{4})-(\d{2})-(\d{2})$/.exec(matn);
  const d = m ? new Date(+m[1], +m[2] - 1, +m[3]) : new Date();
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}
const BUGUN = bugunAniqla();
const QOTIRILGAN = BUGUN.getTime() !== new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getTime();
function bugun() { return new Date(BUGUN); }

/* Matn yoki Date -> Date. Qabul qilinadigan shakllar:
   "21.09.2026", "21.09.2026 14:12", "21-09-2026", "21/09/2026",
   "2026-09-21", "2026-09-21T14:12", "21-sen, 2026", "21 sentabr 2026". */
function sanaOqi(x) {
  if (x == null || x === "") return null;
  if (x instanceof Date) return isNaN(x) ? null : new Date(x);
  const s = String(x).trim();
  let m = /^(\d{1,2})[.\-/](\d{1,2})[.\-/](\d{4})(?:[ ,T]+(\d{1,2}):(\d{2}))?$/.exec(s);
  if (m) return new Date(+m[3], +m[2] - 1, +m[1], +(m[4] || 0), +(m[5] || 0));
  m = /^(\d{4})-(\d{1,2})-(\d{1,2})(?:[T ](\d{1,2}):(\d{2}))?/.exec(s);
  if (m) return new Date(+m[1], +m[2] - 1, +m[3], +(m[4] || 0), +(m[5] || 0));
  m = /^(\d{1,2})[-\s]+([a-z'ʻ]+)[,\s]+(\d{4})$/i.exec(s);
  if (m) {
    const oy = OY_XARITA[m[2].toLowerCase().replace(/[ʻ']/g, "")];
    if (oy !== undefined) return new Date(+m[3], oy, +m[1]);
  }
  return null;
}
const ikki = n => String(n).padStart(2, "0");
/* Date -> "dd.mm.yyyy" (saqlash formati) */
function sanaYoz(x) {
  const d = x instanceof Date ? x : sanaOqi(x);
  if (!d || isNaN(d)) return "";
  return ikki(d.getDate()) + "." + ikki(d.getMonth() + 1) + "." + d.getFullYear();
}
/* Date -> "dd.mm.yyyy HH:MM" */
function vaqtYoz(x) {
  const d = x instanceof Date ? x : sanaOqi(x);
  if (!d || isNaN(d)) return "";
  return sanaYoz(d) + " " + ikki(d.getHours()) + ":" + ikki(d.getMinutes());
}
function kunQosh(x, n) {
  const d = sanaOqi(x) || bugun();
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n, d.getHours(), d.getMinutes());
}
function oyQosh(x, n) {
  const d = sanaOqi(x) || bugun();
  const r = new Date(d.getFullYear(), d.getMonth() + n, 1);
  const oxirgi = new Date(r.getFullYear(), r.getMonth() + 1, 0).getDate();
  r.setDate(Math.min(d.getDate(), oxirgi));
  return r;
}
/* b - a, kalendar kunlarda (soat mintaqasi o'tishlariga chidamli) */
function kunFarqi(a, b) {
  const x = sanaOqi(a), y = sanaOqi(b);
  if (!x || !y) return null;
  return Math.round((Date.UTC(y.getFullYear(), y.getMonth(), y.getDate()) -
                     Date.UTC(x.getFullYear(), x.getMonth(), x.getDate())) / 864e5);
}
/* Namoyish generatori uchun: bugundan n kun oldin/keyin, "dd.mm.yyyy" */
const nisbiy = n => sanaYoz(kunQosh(BUGUN, n));

/* ============================================================
   2. Formatlash
   ============================================================ */
function fmt(n) {
  if (n == null || isNaN(n)) return "—";
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
/* mln so'm -> "520 mln so'm" yoki "1,48 mlrd so'm" */
function pul(mln) {
  if (mln == null || isNaN(mln)) return "—";
  return mln >= 1000
    ? (mln / 1000).toFixed(2).replace(".", ",").replace(/,00$/, "") + " mlrd so'm"
    : (+mln).toFixed(1).replace(".", ",").replace(/,0$/, "") + " mln so'm";
}
function son(n) {
  if (n == null || isNaN(n)) return "—";
  return n.toLocaleString("ru-RU", {minimumFractionDigits: 1, maximumFractionDigits: 1}).replace(".", ",");
}
const yaxlit = (n, k) => { const p = Math.pow(10, k == null ? 1 : k); return Math.round(n * p) / p; };

/* ============================================================
   3. Ma'lumotnomalar (konstantalar)
   ============================================================ */

/* Ranglar: bu fayldagi barcha "rang" maydonlari yadro/app.css dagi tokenni nomlaydi (var(--holat-*), var(--muddat-*) va h.k.),
   alohida hex palitra yo'q. SVG atributi yoki Leaflet uchun xom qiymat MKB.rangQiymat() orqali olinadi. */
/* Aktiv holati. Qiymat yozuvda nom sifatida saqlanadi (y.holat = "Balansda"). */
const HOLATLAR = [
  {kalit: "balansda",       nom: "Balansda",                 rang: "var(--holat-balansda)",   chip: "chip-yashil"},
  {kalit: "rasmiy",         nom: "Rasmiylashtirilmoqda",     rang: "var(--holat-rasmiy)",     chip: "chip-sariq"},
  {kalit: "sotuvga",        nom: "Sotuvga tayyorlanmoqda",   rang: "var(--holat-sotuvga)",    chip: "chip-tarvuz"},
  {kalit: "lotda",          nom: "Lotda",                    rang: "var(--holat-lotda)",      chip: "chip-asos"},
  {kalit: "ijarada",        nom: "Ijarada",                  rang: "var(--holat-ijarada)",    chip: "chip-kok"},
  {kalit: "bolib",          nom: "Bo'lib to'lashda",         rang: "var(--holat-bolib)",      chip: "chip-binafsha"},
  {kalit: "davaktiv",       nom: "Davaktivga o'tkazilgan",   rang: "var(--holat-davaktiv)",   chip: "chip-kul"},
  {kalit: "chiqarildi",     nom: "Chiqarildi",               rang: "var(--holat-chiqarildi)", chip: "chip-kul"}
];
const holatInfo = nom => HOLATLAR.find(h => h.nom === nom || h.kalit === nom) || null;

/* Aktivning hayot yo'li (bosqich) */
const BOSQICHLAR = [
  {kalit: "qabul",           nom: "Balansga qabul",            rang: "var(--holat-balansda)", chip: "chip-yashil"},
  {kalit: "rasmiylashtirish", nom: "Huquqni rasmiylashtirish", rang: "var(--holat-rasmiy)",   chip: "chip-sariq"},
  {kalit: "baholash",        nom: "Baholash",                  rang: "var(--moviy)",          chip: "chip-kok"},
  {kalit: "sotuv",           nom: "Sotuvga tayyorlash",        rang: "var(--voronka-1)",      chip: "chip-tarvuz"},
  {kalit: "lot",             nom: "Lot",                       rang: "var(--voronka-2)",      chip: "chip-asos"},
  {kalit: "shartnoma",       nom: "Shartnoma",                 rang: "var(--voronka-4)",      chip: "chip-binafsha"},
  {kalit: "chiqim",          nom: "Balansdan chiqarish",       rang: "var(--voronka-5)",      chip: "chip-kul"}
];
const bosqichInfo = k => BOSQICHLAR.find(b => b.kalit === k) || null;
/* Holatdan bosqichga odatiy moslik (yangi yozuv yaratishda ishlatiladi) */
const HOLAT_BOSQICH = {
  "Balansda": "baholash", "Rasmiylashtirilmoqda": "rasmiylashtirish", "Sotuvga tayyorlanmoqda": "sotuv",
  "Lotda": "lot", "Ijarada": "sotuv", "Bo'lib to'lashda": "shartnoma",
  "Davaktivga o'tkazilgan": "sotuv", "Chiqarildi": "chiqim"
};

/* Undiruv ishi bosqichlari: oxirgisi balansga qabul ustasiga olib boradi */
const UNDIRUV_BOSQICHLAR = [
  {kalit: "ogohlantirish", nom: "Ogohlantirish",   rang: "var(--matn-4)",         chip: "chip-kul"},
  {kalit: "davo",          nom: "Da'vo arizasi",   rang: "var(--moviy)",          chip: "chip-kok"},
  {kalit: "sud",           nom: "Sud jarayonida",  rang: "var(--binafsha)",       chip: "chip-binafsha"},
  {kalit: "qaror",         nom: "Sud qarori",      rang: "var(--lavanda-matn)",   chip: "chip-asos"},
  {kalit: "ijro",          nom: "Qaror ijrosi",    rang: "var(--sariq-matn)",     chip: "chip-sariq"},
  {kalit: "qabul",         nom: "Balansga qabul",  rang: "var(--holat-balansda)", chip: "chip-yashil"}
];

/* Balansga qabul asosi. garov=true: garovdan olingan mulk, 1 yilda sotilmasa umidsiz.
   garov=false: bank faoliyatida foydalanilmaydigan boshqa mulk, chegara 3 yil (MB 2696, 20-band). */
const QABUL_ASOSLARI = [
  {kalit: "sud",       nom: "Sud qarori va ijro varaqasi (MIB)",                  garov: true,  hujjat: "Sud qarori"},
  {kalit: "notarial",  nom: "Notarial kelishuv asosida sudsiz undirish",          garov: true,  hujjat: "Notarial kelishuv"},
  {kalit: "takroriy",  nom: "Takroriy savdo o'tkazilmagani sababli o'zida qoldirish", garov: true, hujjat: "Takroriy savdo bayonnomasi"},
  {kalit: "ixtiyoriy", nom: "Ixtiyoriy topshirish",                               garov: true,  hujjat: "Topshirish kelishuvi"},
  {kalit: "boshqa",    nom: "Bank faoliyatida foydalanilmaydigan boshqa mulk",     garov: false, hujjat: "Bank qarori"}
];
const qabulAsosiInfo = k => QABUL_ASOSLARI.find(a => a.kalit === k) || null;

/* Asosiy tur (turKalit) va surat turi (rasmTuri, 12 ta) */
const ASOSIY_TURLAR = [
  {kalit: "noturar",   nom: "Noturar bino",      binoli: true},
  {kalit: "turar",     nom: "Turar joy",         binoli: true},
  {kalit: "transport", nom: "Transport vositasi", binoli: false},
  {kalit: "uskuna",    nom: "Asbob-uskuna",      binoli: false},
  {kalit: "texnika",   nom: "Maxsus texnika",    binoli: false}
];
const TUR_KALITLAR = [
  {kalit: "mamuriy",   nom: "Ma'muriy bino",            turKalit: "noturar",   ikon: "i-bino"},
  {kalit: "sex",       nom: "Ishlab chiqarish sexi",    turKalit: "noturar",   ikon: "i-zavod"},
  {kalit: "ferma",     nom: "Ferma va chorvachilik binosi", turKalit: "noturar", ikon: "i-ferma"},
  {kalit: "issiqxona", nom: "Issiqxona",                turKalit: "noturar",   ikon: "i-ferma"},
  {kalit: "ombor",     nom: "Ombor",                    turKalit: "noturar",   ikon: "i-ombor"},
  {kalit: "dokon",     nom: "Savdo va xizmat binosi",   turKalit: "noturar",   ikon: "i-dokon"},
  {kalit: "kopqavat",  nom: "Ko'p qavatli uydagi xonadon", turKalit: "turar",  ikon: "i-uy"},
  {kalit: "uy",        nom: "Xususiy uy",               turKalit: "turar",     ikon: "i-uy"},
  {kalit: "avto",      nom: "Yengil avtomobil",         turKalit: "transport", ikon: "i-avto"},
  {kalit: "yuk",       nom: "Yuk avtomobili",           turKalit: "transport", ikon: "i-avto"},
  {kalit: "texnika",   nom: "Maxsus texnika",           turKalit: "texnika",   ikon: "i-avto"},
  {kalit: "uskuna",    nom: "Asbob-uskuna",             turKalit: "uskuna",    ikon: "i-uskuna"}
];
const turInfo = k => TUR_KALITLAR.find(t => t.kalit === k) || null;
const binolimi = y => !!(y && (y.binoli != null ? y.binoli : (ASOSIY_TURLAR.find(t => t.kalit === y.turKalit) || {}).binoli));

/* Sotish usullari (PQ-142, VM 18, 2026 farmoni) */
const SOTISH_USULLARI = [
  {kalit: "eauksion",   nom: "E-auksion"},
  {kalit: "togridan",   nom: "To'g'ridan-to'g'ri sotish"},
  {kalit: "bolib",      nom: "Bo'lib to'lash"},
  {kalit: "lizing",     nom: "Lizing"},
  {kalit: "biznes",     nom: "Tayyor biznes"},
  {kalit: "davaktiv",   nom: "Davaktivga o'tkazish"},
  {kalit: "ijara",      nom: "Sotilguncha ijara"}
];
/* chip — holat pilyulasining sinfi (rang grafik va nuqtalar uchun, chip undan hosil qilinmaydi) */
const LOT_HOLATLARI = [
  {kalit: "tayyorlanmoqda", nom: "Tayyorlanmoqda",     rang: "var(--sariq-matn)",        chip: "chip-sariq"},
  {kalit: "elon",           nom: "E'lon qilingan",     rang: "var(--lavanda-matn)",      chip: "chip-info"},
  {kalit: "otkazilmagan",   nom: "Savdo o'tkazilmagan", rang: "var(--xavf-matn-yorqin)", chip: "chip-xavf"},
  {kalit: "golib",          nom: "G'olib aniqlangan",  rang: "var(--moviy)",             chip: "chip-kok"},
  {kalit: "sotildi",        nom: "Sotildi",            rang: "var(--yashil)",            chip: "chip-yashil"},
  {kalit: "bekor",          nom: "Bekor qilingan",     rang: "var(--matn-4)",            chip: "chip-kul"}
];

/* Saqlash xarajatlari toifalari (12 ta) */
const XARAJAT_TOIFALARI = [
  {kalit: "qoriqlash",   nom: "Qo'riqlash"},
  {kalit: "kommunal",    nom: "Kommunal"},
  {kalit: "molmulk",     nom: "Mol-mulk solig'i"},
  {kalit: "yer",         nom: "Yer solig'i"},
  {kalit: "sugurta",     nom: "Sug'urta"},
  {kalit: "baholash",    nom: "Baholash"},
  {kalit: "tamir",       nom: "Ta'mir va konservatsiya"},
  {kalit: "elon",        nom: "E'lon va auksion"},
  {kalit: "notarius",    nom: "Notarius va kadastr"},
  {kalit: "transport",   nom: "Transport va evakuator"},
  {kalit: "saqlash",     nom: "Saqlash maydoni"},
  {kalit: "sud",         nom: "Sud xarajatlari"}
];

const QORIQLASH_TURLARI = [
  {kalit: "post",    nom: "Qo'riqlash posti"},
  {kalit: "pult",    nom: "Pultdan qo'riqlash"},
  {kalit: "mobil",   nom: "Mobil guruh"},
  {kalit: "avtonom", nom: "Avtonom kamera va datchiklar"},
  {kalit: "ichki",   nom: "Bank xodimi nazorati"}
];

const KOMMUNAL_XIZMATLAR = [
  {kalit: "elektr", nom: "Elektr"},
  {kalit: "gaz",    nom: "Gaz"},
  {kalit: "suv",    nom: "Suv"}
];
const KOMMUNAL_HOLATLAR = ["ulangan", "uzilgan", "vaqtincha to'xtatilgan", "mavjud emas"];

/* Me'yoriy muddat holatlari */
const MUDDAT_HOLATLARI = {
  "imtiyozda":        {nom: "Soliq imtiyozi davrida",     rang: "var(--muddat-imtiyozda)", chip: "chip-kok"},
  "normal":           {nom: "Me'yor ichida",              rang: "var(--muddat-normal)",    chip: "chip-yashil"},
  "xavf-90":          {nom: "Umidsizgacha 90 kundan kam",  rang: "var(--muddat-xavf-90)",   chip: "chip-sariq"},
  "umidsiz":          {nom: "Umidsiz toifa",              rang: "var(--muddat-umidsiz)",   chip: "chip-qizil"},
  "3-yildan-oshgan":  {nom: "3 yildan oshgan",            rang: "var(--muddat-3-yil)",     chip: "chip-qizil"},
  "chiqarilgan":      {nom: "Balansdan chiqarilgan",      rang: "var(--muddat-yoq)",       chip: "chip-kul"},
  "kiritilmagan":     {nom: "Balans sanasi kiritilmagan", rang: "var(--muddat-yoq)",       chip: "chip-kul"}
};

/* Zaxira toifalari (MB 2696, 36-band). Oraliq kun chegaralari va stavkalari PARAMETRLAR da,
   ular buxgalteriya tasdig'ini kutadi (taxminiy). Tasdiqlangan qoida bitta: chegaradan keyin 100%. */
const ZAXIRA_TOIFALARI = [
  {kalit: "substandart", nom: "Substandart", chip: "chip-kok",    rang: "var(--moviy)"},
  {kalit: "qoniqarsiz",  nom: "Qoniqarsiz",  chip: "chip-sariq",  rang: "var(--sariq-matn)"},
  {kalit: "shubhali",    nom: "Shubhali",    chip: "chip-tarvuz", rang: "var(--apelsin)"},
  {kalit: "umidsiz",     nom: "Umidsiz",     chip: "chip-qizil",  rang: "var(--xavf-matn-yorqin)"}
];

/* Hisob-kitob parametrlari. taxminiy:true — qonun bilan tasdiqlanmagan yoki bankning ichki
   qarorini kutayotgan qiymat; sozlamalarda o'zgartiriladi (MKBapi, to'plam PARAMETRLAR). */
const PARAMETRLAR = [
  {id: "umidsizKun",           guruh: "muddat",   nom: "Undiruv natijasida olingan mulk: umidsiz toifagacha", qiymat: 365, birlik: "kun", taxminiy: false, manba: "MB 2696, 20-band"},
  {id: "uchYilKun",            guruh: "muddat",   nom: "Boshqa foydalanilmayotgan mulk: umidsiz toifagacha", qiymat: 1095, birlik: "kun", taxminiy: false, manba: "MB 2696, 20-band; MB 3441, 6–8-bandlar"},
  {id: "soliqImtiyozOy",       guruh: "muddat",   nom: "Mol-mulk va yer solig'idan imtiyoz", qiymat: 6, birlik: "oy", taxminiy: true, manba: "Prezident farmoni, 2026-yil 28-avgust"},
  {id: "yhxxKun",              guruh: "muddat",   nom: "Transportni YHXXda qayta qayd etish", qiymat: 10, birlik: "kalendar kun", taxminiy: false, manba: "VM 683, 6-band"},
  {id: "birlamchiKorikSoat",   guruh: "muddat",   nom: "Birlamchi ko'rik", qiymat: 72, birlik: "soat", taxminiy: true, manba: "Ichki me'yor"},
  {id: "mbHisobotKuni",        guruh: "muddat",   nom: "Markaziy bank hisoboti", qiymat: 10, birlik: "oyning sanasi", taxminiy: false, manba: "MB 3441, 16-band"},
  {id: "bahoAmalOy",           guruh: "muddat",   nom: "Baholash hisobotining dolzarblik muddati", qiymat: 12, birlik: "oy", taxminiy: true, manba: "Ichki me'yor; Yagona milliy baholash standarti"},
  {id: "korikDavriBino",       guruh: "korik",    nom: "Bino ko'rigi davriyligi", qiymat: 90, birlik: "kun", taxminiy: true, manba: "Ichki me'yor"},
  {id: "korikDavriTransport",  guruh: "korik",    nom: "Transport va uskuna ko'rigi davriyligi", qiymat: 30, birlik: "kun", taxminiy: true, manba: "Ichki me'yor"},
  /* Ko'rikda kamida shuncha surat: bino — to'rt tomon, kirish, ichki xonalar; transport — to'rt tomon, spidometr, VIN */
  {id: "korikSuratBino",       guruh: "korik",    nom: "Bino ko'rigida kamida surat", qiymat: 6, birlik: "ta", taxminiy: true, manba: "Ichki me'yor"},
  {id: "korikSuratTransport",  guruh: "korik",    nom: "Transport va uskuna ko'rigida kamida surat", qiymat: 6, birlik: "ta", taxminiy: true, manba: "Ichki me'yor"},
  {id: "zaxiraOraliq1Kun",     guruh: "zaxira",   nom: "Substandart toifa chegarasi", qiymat: 90, birlik: "kun", taxminiy: true, manba: "Buxgalteriya tasdig'ida"},
  {id: "zaxiraOraliq1Foiz",    guruh: "zaxira",   nom: "Substandart toifa stavkasi", qiymat: 10, birlik: "%", taxminiy: true, manba: "MB 2696, 36-band; buxgalteriya tasdig'ida"},
  {id: "zaxiraOraliq2Kun",     guruh: "zaxira",   nom: "Qoniqarsiz toifa chegarasi", qiymat: 180, birlik: "kun", taxminiy: true, manba: "Buxgalteriya tasdig'ida"},
  {id: "zaxiraOraliq2Foiz",    guruh: "zaxira",   nom: "Qoniqarsiz toifa stavkasi", qiymat: 25, birlik: "%", taxminiy: true, manba: "MB 2696, 36-band; buxgalteriya tasdig'ida"},
  {id: "zaxiraOraliq3Foiz",    guruh: "zaxira",   nom: "Shubhali toifa stavkasi (chegaragacha)", qiymat: 50, birlik: "%", taxminiy: true, manba: "MB 2696, 36-band; buxgalteriya tasdig'ida"},
  {id: "zaxiraUmidsizFoiz",    guruh: "zaxira",   nom: "Umidsiz toifa stavkasi", qiymat: 100, birlik: "%", taxminiy: false, manba: "MB 2696, 20 va 36-bandlar"},
  {id: "hisobvaraqAktiv",      guruh: "zaxira",   nom: "Balans hisobvarag'i", qiymat: "16701", birlik: "", taxminiy: true, manba: "Hisobvaraqlar rejasi, buxgalteriya tasdig'ida"},
  {id: "hisobvaraqZaxira",     guruh: "zaxira",   nom: "Zaxira hisobvarag'i", qiymat: "16799", birlik: "", taxminiy: true, manba: "Hisobvaraqlar rejasi, buxgalteriya tasdig'ida"},
  {id: "kapital1DarajaMlrd",   guruh: "kapital",  nom: "Birinchi darajali regulyativ kapital", qiymat: null, birlik: "mlrd so'm", taxminiy: false, manba: "Bank hisoboti, qo'lda kiritiladi"},
  {id: "kapitalLimitKoeff",    guruh: "kapital",  nom: "Mol-mulk qiymatining kapitalga nisbati chegarasi", qiymat: 1, birlik: "marta", taxminiy: false, manba: "MB 3441, 3-band"},
  {id: "yillikRejaMlrd",       guruh: "reja",     nom: "Yillik realizatsiya rejasi", qiymat: null, birlik: "mlrd so'm", taxminiy: false, manba: "Bank rejasi, qo'lda kiritiladi"},
  {id: "elonMinKun",           guruh: "savdo",    nom: "E'londan savdogacha kamida", qiymat: 30, birlik: "kun", taxminiy: false, manba: "VM 18, 22-band"},
  {id: "takroriySavdoMinKun",  guruh: "savdo",    nom: "O'tkazilmagan savdodan keyin takroriy savdo", qiymat: 10, birlik: "kalendar kun", taxminiy: false, manba: "VM 18, 37-band"},
  {id: "golibTolovIshKuni",    guruh: "savdo",    nom: "G'olibning to'lov muddati", qiymat: 5, birlik: "ish kuni", taxminiy: false, manba: "VM 18, 31-band"},
  {id: "shartnomaIshKuni",     guruh: "savdo",    nom: "Shartnoma tuzish muddati", qiymat: 10, birlik: "ish kuni", taxminiy: false, manba: "VM 18, 33-band"},
  {id: "qadamFoiz",            guruh: "savdo",    nom: "Auksion qadami", qiymat: 10, birlik: "%", taxminiy: false, manba: "VM 18, 28-band"},
  {id: "qadamFoizKatta",       guruh: "savdo",    nom: "Auksion qadami (2000 BHM dan yuqori lot)", qiymat: 5, birlik: "%", taxminiy: false, manba: "VM 18, 28-band"},
  {id: "bhmMing",              guruh: "savdo",    nom: "Bazaviy hisoblash miqdori", qiymat: 412, birlik: "ming so'm", taxminiy: true, manba: "Prezident farmoni, 2025-yil 1-avgustdan amalda"},
  {id: "zakalatFoiz",          guruh: "savdo",    nom: "Zakalat (odatiy)", qiymat: 10, birlik: "%", taxminiy: true, manba: "VM 18, 14-band: 1–50%"},
  {id: "takroriySavdoChegirma", guruh: "savdo",   nom: "Takroriy savdodan keyin o'zida qoldirish chegirmasi", qiymat: 25, birlik: "%", taxminiy: true, manba: "Garov to'g'risidagi qonun, yurist tasdig'ida"},
  {id: "pasaytirishOy",        guruh: "savdo",    nom: "Sotilmasa narxni pasaytirishgacha", qiymat: 3, birlik: "oy", taxminiy: true, manba: "Bank realizatsiya tartibi"},
  {id: "pasaytirishFoiz",      guruh: "savdo",    nom: "Bir martalik narx pasaytirish", qiymat: 10, birlik: "%", taxminiy: true, manba: "Bank realizatsiya tartibi"},
  {id: "avansFoiz",            guruh: "savdo",    nom: "Bo'lib to'lashda avans", qiymat: 15, birlik: "%", taxminiy: true, manba: "MKBANK e'loni"},
  {id: "davaktivQaytarishOy",  guruh: "savdo",    nom: "Davaktivda sotilmasa qaytarish", qiymat: 12, birlik: "oy", taxminiy: true, manba: "Prezident farmoni, 2026-yil 28-avgust"},
  {id: "molMulkSoligiFoiz",    guruh: "soliq",    nom: "Mol-mulk solig'i stavkasi", qiymat: 1.5, birlik: "%", taxminiy: false, manba: "O'RQ-1108"},
  {id: "konservatsiyaFoiz",    guruh: "soliq",    nom: "Tugallanmagan va konservatsiyadagi obyekt stavkasi", qiymat: 0.7, birlik: "%", taxminiy: false, manba: "O'RQ-1108"},
  {id: "qqsFoiz",              guruh: "soliq",    nom: "QQS stavkasi", qiymat: 12, birlik: "%", taxminiy: true, manba: "Soliq kodeksi; sotuvga qo'llanishi buxgalteriya tasdig'ida"},
  {id: "minM2Toshkent",       guruh: "soliq",    nom: "1 m² minimal qiymati: Toshkent shahri", qiymat: 3.53, birlik: "mln so'm", taxminiy: false, manba: "O'RQ-1108, 2026"},
  {id: "minM2Markaz",          guruh: "soliq",    nom: "1 m² minimal qiymati: viloyat markazlari", qiymat: 2.35, birlik: "mln so'm", taxminiy: false, manba: "O'RQ-1108, 2026"},
  {id: "minM2Boshqa",          guruh: "soliq",    nom: "1 m² minimal qiymati: boshqa hududlar", qiymat: 1.39, birlik: "mln so'm", taxminiy: false, manba: "O'RQ-1108, 2026"},
  {id: "osagoSummaMln",        guruh: "sugurta",  nom: "OSAGO sug'urta summasi", qiymat: 80, birlik: "mln so'm", taxminiy: false, manba: "OSAGO to'g'risidagi qonun, 2026"},
  {id: "aloqaSimOylikMing",    guruh: "himoya",   nom: "4G SIM aloqasi, bir qurilma", qiymat: 60, birlik: "ming so'm/oy", taxminiy: true, manba: "Operator tariflari, 2026-yil"},
  {id: "aloqaLoraOylikMing",   guruh: "himoya",   nom: "LoRaWAN shlyuzi aloqasi, bir obyekt", qiymat: 90, birlik: "ming so'm/oy", taxminiy: true, manba: "Operator tariflari, 2026-yil"},
  {id: "ornatishFoiz",         guruh: "himoya",   nom: "O'rnatish va sozlash, jihoz narxidan", qiymat: 15, birlik: "%", taxminiy: true, manba: "Integratorlar tijorat takliflari"},
  {id: "aloqaOy",              guruh: "himoya",   nom: "Smetadagi aloqa davri", qiymat: 12, birlik: "oy", taxminiy: false, manba: "Smeta qoidasi"},
  {id: "sessiyaKutishDaq",     guruh: "himoya",   nom: "Harakatsiz sessiya yopiladi", qiymat: 30, birlik: "daqiqa", taxminiy: false, manba: "Axborot xavfsizligi tartibi"},
  {id: "videoSaqlashKun",      guruh: "himoya",   nom: "Kamera video arxivini saqlash", qiymat: 30, birlik: "kun", taxminiy: true, manba: "O'RQ-547, ichki tartib"},
  {id: "shaxsiyMalumotKun",    guruh: "shaxsiy",  nom: "Tashrifchi va pudratchi ma'lumotlarini saqlash", qiymat: null, birlik: "kun", taxminiy: false, manba: "O'RQ-547, ichki tartib"},
  {id: "eksportNiqob",         guruh: "shaxsiy",  nom: "Eksportda telefon va hujjat raqamlarini yashirish", qiymat: 0, birlik: "", taxminiy: false, manba: "O'RQ-547"}
];
function param(id) {
  const royxat = (W.MKB_DATA && W.MKB_DATA.PARAMETRLAR) || PARAMETRLAR;
  const p = royxat.find(x => x.id === id);
  return p ? p.qiymat : null;
}
/* Parametr buxgalteriya tasdig'ini kutyaptimi (taxminiy belgisi yechilmagan) */
function paramTaxminiy(id) {
  const royxat = (W.MKB_DATA && W.MKB_DATA.PARAMETRLAR) || PARAMETRLAR;
  const p = royxat.find(x => x.id === id);
  return !p || p.taxminiy !== false;
}

/* O'zbekiston dam olish kunlari. Hayit sanalari har yili farmon bilan belgilanadi,
   shuning uchun taxminiy va sozlamalarda tahrirlanadi (to'plam BAYRAMLAR). */
const BAYRAMLAR = [];
function bayramQosh(yil, kunOy, nom, taxminiy) {
  const [k, o] = kunOy.split(".");
  BAYRAMLAR.push({id: yil + "-" + o + "-" + k, sana: k + "." + o + "." + yil, nom, taxminiy: !!taxminiy});
}
[2025, 2026, 2027].forEach(yil => {
  bayramQosh(yil, "01.01", "Yangi yil");
  bayramQosh(yil, "08.03", "Xalqaro xotin-qizlar kuni");
  bayramQosh(yil, "21.03", "Navro'z bayrami");
  bayramQosh(yil, "09.05", "Xotira va qadrlash kuni");
  bayramQosh(yil, "01.09", "Mustaqillik kuni");
  bayramQosh(yil, "01.10", "O'qituvchi va murabbiylar kuni");
  bayramQosh(yil, "08.12", "Konstitutsiya kuni");
});
bayramQosh(2025, "30.03", "Ramazon hayiti", true);
bayramQosh(2025, "06.06", "Qurbon hayiti", true);
bayramQosh(2026, "20.03", "Ramazon hayiti", true);
bayramQosh(2026, "27.05", "Qurbon hayiti", true);
bayramQosh(2027, "10.03", "Ramazon hayiti", true);
bayramQosh(2027, "16.05", "Qurbon hayiti", true);

function bayramKunlari(yil) {
  const royxat = (W.MKB_DATA && W.MKB_DATA.BAYRAMLAR) || BAYRAMLAR;
  return royxat.filter(b => String(b.sana).slice(-4) === String(yil)).map(b => b.sana);
}
function ishKunimi(x) {
  const d = sanaOqi(x);
  if (!d) return false;
  const h = d.getDay();
  if (h === 0 || h === 6) return false;
  return bayramKunlari(d.getFullYear()).indexOf(sanaYoz(d)) < 0;
}
/* n ish kuni qo'shish (n=0: sana ish kuni bo'lmasa keyingi ish kuniga suriladi) */
function ishKuniQosh(x, n) {
  let d = sanaOqi(x) || bugun();
  d = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  if (!n) { while (!ishKunimi(d)) d = kunQosh(d, 1); return d; }
  let qoldi = Math.abs(n); const qadam = n > 0 ? 1 : -1;
  while (qoldi > 0) { d = kunQosh(d, qadam); if (ishKunimi(d)) qoldi--; }
  return d;
}

/* Hudud: markaz koordinatasi va soliq toifasi (minimal qiymat uchun, O'RQ-1108) */
const HUDUD_KODLAR = {
  TS: {nom: "Toshkent sh.",     toliq: "Toshkent shahri",         lat: 41.311, lng: 69.279, markaz: "Toshkent"},
  TV: {nom: "Toshkent vil.",    toliq: "Toshkent viloyati",       lat: 41.018, lng: 69.358, markaz: "Nurafshon"},
  SA: {nom: "Samarqand",        toliq: "Samarqand viloyati",      lat: 39.654, lng: 66.975, markaz: "Samarqand"},
  BU: {nom: "Buxoro",           toliq: "Buxoro viloyati",         lat: 39.768, lng: 64.421, markaz: "Buxoro"},
  NV: {nom: "Navoiy",           toliq: "Navoiy viloyati",         lat: 40.103, lng: 65.374, markaz: "Navoiy"},
  XO: {nom: "Xorazm",           toliq: "Xorazm viloyati",         lat: 41.550, lng: 60.631, markaz: "Urganch"},
  QR: {nom: "Qoraqalpog'iston", toliq: "Qoraqalpog'iston R.",     lat: 42.460, lng: 59.603, markaz: "Nukus"},
  QA: {nom: "Qashqadaryo",      toliq: "Qashqadaryo viloyati",    lat: 38.860, lng: 65.790, markaz: "Qarshi"},
  SU: {nom: "Surxondaryo",      toliq: "Surxondaryo viloyati",    lat: 37.224, lng: 67.278, markaz: "Termiz"},
  JI: {nom: "Jizzax",           toliq: "Jizzax viloyati",         lat: 40.116, lng: 67.842, markaz: "Jizzax"},
  SI: {nom: "Sirdaryo",         toliq: "Sirdaryo viloyati",       lat: 40.489, lng: 68.784, markaz: "Guliston"},
  NA: {nom: "Namangan",         toliq: "Namangan viloyati",       lat: 40.998, lng: 71.672, markaz: "Namangan"},
  FA: {nom: "Farg'ona",         toliq: "Farg'ona viloyati",       lat: 40.389, lng: 71.783, markaz: "Farg'ona"},
  AN: {nom: "Andijon",          toliq: "Andijon viloyati",        lat: 40.783, lng: 72.344, markaz: "Andijon"}
};
const hududKodi = nom => Object.keys(HUDUD_KODLAR).find(k => HUDUD_KODLAR[k].nom === nom || HUDUD_KODLAR[k].toliq === nom) || null;
const HUDUD_TOIFA = {
  toifalar: [
    {kalit: "toshkent", nom: "Toshkent shahri",       param: "minM2Toshkent"},
    {kalit: "markaz",   nom: "Viloyat markazi",       param: "minM2Markaz"},
    {kalit: "boshqa",   nom: "Boshqa aholi punktlari", param: "minM2Boshqa"}
  ],
  /* shahar nomi + "sh."/"shahri" manzilda uchrasa viloyat markazi hisoblanadi */
  markazlar: Object.keys(HUDUD_KODLAR).map(k => HUDUD_KODLAR[k].markaz)
};
function hududToifasi(y) {
  if (!y) return "boshqa";
  const kod = y.hududKod || hududKodi(y.hudud);
  if (kod === "TS") return "toshkent";
  const matn = [y.manzil, y.tuman, y.hududToliq].filter(Boolean).join(" ");
  const markaz = HUDUD_TOIFA.markazlar.filter(m => m !== "Toshkent").map(m => m.replace(/'/g, "['ʻ]?")).join("|");
  return new RegExp("(" + markaz + ")\\s*(sh\\.|sh\\b|shahri|shahar)", "i").test(matn) ? "markaz" : "boshqa";
}

/* Bosqichga va qabul asosiga bog'liq majburiy hujjatlar: MAJBURIY_HUJJATLAR[bosqich][asos].
   "*" — asosdan qat'i nazar; "transport" — transport va texnika uchun qo'shimcha. */
const MAJBURIY_HUJJATLAR = {
  qabul: {
    sud:       ["Sud qarori", "Ijro varaqasi", "Qabul-topshirish dalolatnomasi", "Balansga qabul buyrug'i", "Baholash hisoboti"],
    notarial:  ["Notarial kelishuv", "Qarzdorga xabarnoma", "Qabul-topshirish dalolatnomasi", "Balansga qabul buyrug'i", "Baholash hisoboti"],
    takroriy:  ["Takroriy savdo bayonnomasi", "Qo'mita qarori", "Qabul-topshirish dalolatnomasi", "Balansga qabul buyrug'i", "Baholash hisoboti"],
    ixtiyoriy: ["Topshirish kelishuvi", "Qo'mita qarori", "Qabul-topshirish dalolatnomasi", "Balansga qabul buyrug'i", "Baholash hisoboti"],
    boshqa:    ["Bank qarori", "Qabul-topshirish dalolatnomasi", "Balansga qabul buyrug'i"],
    "*":       ["Inventar ro'yxati", "Hisoblagich ko'rsatkichlari dalolatnomasi", "Kalit topshirish varaqasi", "Fotojadval"]
  },
  rasmiylashtirish: {
    "*":         ["Davlat reyestridan ko'chirma", "Kadastr pasporti", "Yer uchastkasiga huquq hujjati"],
    "transport": ["Qayd guvohnomasi", "Texnik pasport"]
  },
  baholash: {"*": ["Baholash hisoboti", "Birlamchi ko'rik dalolatnomasi"]},
  sotuv:    {"*": ["Realizatsiya qarori", "Narx asoslanmasi", "E'lon matni"]},
  lot:      {"*": ["Lot kartasi", "Savdo bayonnomasi"]},
  shartnoma: {"*": ["Oldi-sotdi shartnomasi", "To'lov jadvali"]},
  chiqim:   {"*": ["Xaridorga topshirish dalolatnomasi", "Balansdan chiqarish buyrug'i", "Yakuniy hisob-kitob"]}
};
function majburiyHujjatlar(bosqich, asos, turKalit) {
  const b = MAJBURIY_HUJJATLAR[bosqich];
  if (!b) return [];
  const royxat = [].concat(b[asos] || [], b["*"] || []);
  if (bosqich === "rasmiylashtirish" && (turKalit === "transport" || turKalit === "texnika"))
    return b.transport.slice();
  if (bosqich === "rasmiylashtirish" && turKalit === "uskuna") return [];
  return royxat;
}

/* ============================================================
   4. Himoya: qurilma turlari, katalog va komplekt andozalari
   ============================================================ */
const QURILMA_TURLARI = [
  {kalit: "kamera-4G",         nom: "4G kamera"},
  {kalit: "harakat-datchigi",  nom: "Harakat datchigi"},
  {kalit: "eshik-datchigi",    nom: "Eshik ochilish datchigi"},
  {kalit: "tutun-datchigi",    nom: "Tutun datchigi"},
  {kalit: "yongin-datchigi",   nom: "Yong'in datchigi (tutun, harorat, is gazi)"},
  {kalit: "suv-datchigi",      nom: "Suv sizishi datchigi"},
  {kalit: "titrash-datchigi",  nom: "Titrash va og'ish datchigi"},
  {kalit: "aqlli-qulf",        nom: "Aqlli qulf"},
  {kalit: "faceid-terminal",   nom: "Yuzni tanish terminali"},
  {kalit: "GPS-treker",        nom: "GPS-treker"},
  {kalit: "shlyuz",            nom: "Aloqa shlyuzi"},
  {kalit: "quvvat",            nom: "Quvvat bloki"}
];
const QUVVAT_MANBALARI = ["quyosh+akkumulyator", "akkumulyator", "tarmoq"];
const ALOQA_KANALLARI = ["4G", "LoRaWAN", "NB-IoT"];

/* Katalog: taqdimotdagi 10 yechim va smeta jadvalidagi jihozlar. Narx — bozor ko'rsatkichi, so'm. */
const QURILMA_KATALOG = [
  {id: "reolink-argus",   yechim: "reolink",   tur: "kamera-4G",        ishlabChiqaruvchi: "Reolink",   model: "Argus seriyali batareyali kamera", quvvat: "akkumulyator", aloqa: "4G",
   narxMin: 1800000, narxMax: 2600000, qayerdan: "Reolink importi", kimOrnatadi: "Mahalliy CCTV integratori"},
  {id: "reolink-hub",     yechim: "reolink",   tur: "shlyuz",           ishlabChiqaruvchi: "Reolink",   model: "Home Hub va 4G router", quvvat: "akkumulyator", aloqa: "4G",
   narxMin: 1500000, narxMax: 2400000, qayerdan: "Reolink importi", kimOrnatadi: "Mahalliy CCTV integratori"},
  {id: "hik-solar",       yechim: "hikvision", tur: "kamera-4G",        ishlabChiqaruvchi: "Hikvision", model: "quyosh panelli 4G kamera (IP66)", quvvat: "quyosh+akkumulyator", aloqa: "4G",
   narxMin: 3800000, narxMax: 5200000, qayerdan: "SAT Solutions, Hikvision PG, Baraka Profit", kimOrnatadi: "SAT Solutions yoki Hikvision PG"},
  {id: "hik-kirish",      yechim: "hikvision", tur: "faceid-terminal",  ishlabChiqaruvchi: "Hikvision", model: "Kirish terminali: yuz, karta va PIN", quvvat: "akkumulyator", aloqa: "4G",
   narxMin: 3000000, narxMax: 4500000, qayerdan: "Hikvision PG, Adminz / i7 Team", kimOrnatadi: "Kirish nazorati integratori",
   izoh: "Oflayn yuz bazasi. Yuz ma'lumoti O'zbekiston hududidagi serverda saqlanadi (O'RQ-1125, O'RQ-547)."},
  {id: "dahua-solar",     yechim: "dahua",     tur: "kamera-4G",        ishlabChiqaruvchi: "Dahua",     model: "quyosh panelli 4G aylanuvchi kamera", quvvat: "quyosh+akkumulyator", aloqa: "4G",
   narxMin: 3500000, narxMax: 4800000, qayerdan: "SAT Solutions (rasmiy integrator)", kimOrnatadi: "SAT Solutions"},
  {id: "lifepo4-shkaf",   yechim: "lifepo4",   tur: "quvvat",           ishlabChiqaruvchi: "", model: "Almashtiriladigan LiFePO4 shkafi, 5 kVt·soat", quvvat: "akkumulyator", aloqa: "4G",
   narxMin: 12000000, narxMax: 20000000, qayerdan: "Past kuchlanish integratori", kimOrnatadi: "Past kuchlanish integratori",
   izoh: "Qishda past harorat himoyali BMS majburiy."},
  {id: "ajax-hub2",       yechim: "ajax",      tur: "shlyuz",           ishlabChiqaruvchi: "Ajax",      model: "Hub 2 (4G)", quvvat: "akkumulyator", aloqa: "4G",
   narxMin: 4200000, narxMax: 5500000, qayerdan: "Ajax savdo kanallari", kimOrnatadi: "Xavfsizlik integratori"},
  {id: "ajax-door",       yechim: "ajax",      tur: "eshik-datchigi",   ishlabChiqaruvchi: "Ajax",      model: "DoorProtect Plus", quvvat: "akkumulyator", aloqa: "4G",
   narxMin: 750000, narxMax: 1100000, qayerdan: "Ajax savdo kanallari", kimOrnatadi: "Xavfsizlik integratori"},
  {id: "ajax-fire",       yechim: "ajax",      tur: "yongin-datchigi",  ishlabChiqaruvchi: "Ajax",      model: "FireProtect 2 (tutun, harorat, is gazi)", quvvat: "akkumulyator", aloqa: "4G",
   narxMin: 1200000, narxMax: 1800000, qayerdan: "Ajax savdo kanallari", kimOrnatadi: "Xavfsizlik integratori"},
  {id: "ajax-motion",     yechim: "ajax",      tur: "harakat-datchigi", ishlabChiqaruvchi: "Ajax",      model: "MotionCam (foto tasdiqli)", quvvat: "akkumulyator", aloqa: "4G",
   narxMin: 1100000, narxMax: 1600000, qayerdan: "Ajax savdo kanallari", kimOrnatadi: "Xavfsizlik integratori"},
  {id: "ajax-leak",       yechim: "ajax",      tur: "suv-datchigi",     ishlabChiqaruvchi: "Ajax",      model: "LeaksProtect", quvvat: "akkumulyator", aloqa: "4G",
   narxMin: 450000, narxMax: 700000, qayerdan: "Ajax savdo kanallari", kimOrnatadi: "Xavfsizlik integratori"},
  {id: "ajax-relay",      yechim: "ajax",      tur: "aqlli-qulf",       ishlabChiqaruvchi: "Ajax",      model: "Relay va elektromexanik qulf", quvvat: "akkumulyator", aloqa: "4G",
   narxMin: 650000, narxMax: 1000000, qayerdan: "Ajax savdo kanallari", kimOrnatadi: "Xavfsizlik integratori"},
  {id: "ms-gateway",      yechim: "milesight", tur: "shlyuz",           ishlabChiqaruvchi: "Milesight", model: "LoRaWAN shlyuzi (4G)", quvvat: "akkumulyator", aloqa: "LoRaWAN",
   narxMin: 2500000, narxMax: 4000000, qayerdan: "Milesight distribyutori", kimOrnatadi: "IoT integratori"},
  {id: "ms-door",         yechim: "milesight", tur: "eshik-datchigi",   ishlabChiqaruvchi: "Milesight", model: "LoRaWAN magnit kontakt", quvvat: "akkumulyator", aloqa: "LoRaWAN",
   narxMin: 400000, narxMax: 650000, qayerdan: "Milesight distribyutori", kimOrnatadi: "IoT integratori"},
  {id: "ms-smoke",        yechim: "milesight", tur: "tutun-datchigi",   ishlabChiqaruvchi: "Milesight", model: "LoRaWAN tutun datchigi", quvvat: "akkumulyator", aloqa: "LoRaWAN",
   narxMin: 600000, narxMax: 900000, qayerdan: "Milesight distribyutori", kimOrnatadi: "IoT integratori"},
  {id: "ms-pir",          yechim: "milesight", tur: "harakat-datchigi", ishlabChiqaruvchi: "Milesight", model: "LoRaWAN harakat datchigi", quvvat: "akkumulyator", aloqa: "LoRaWAN",
   narxMin: 500000, narxMax: 800000, qayerdan: "Milesight distribyutori", kimOrnatadi: "IoT integratori"},
  {id: "ms-leak",         yechim: "milesight", tur: "suv-datchigi",     ishlabChiqaruvchi: "Milesight", model: "LoRaWAN suv datchigi", quvvat: "akkumulyator", aloqa: "LoRaWAN",
   narxMin: 450000, narxMax: 700000, qayerdan: "Milesight distribyutori", kimOrnatadi: "IoT integratori"},
  {id: "kochma-lfp",      yechim: "kochma",    tur: "quvvat",           ishlabChiqaruvchi: "EcoFlow yoki Bluetti sinfi", model: "Ko'chma LFP stansiya, 1–4 kVt·soat", quvvat: "akkumulyator", aloqa: "4G",
   narxMin: 5000000, narxMax: 12000000, qayerdan: "Import distribyutori", kimOrnatadi: "CCTV integratori"},
  {id: "efoy",            yechim: "efoy",      tur: "quvvat",           ishlabChiqaruvchi: "SFC Energy", model: "EFOY metanol yoqilg'i elementi", quvvat: "akkumulyator", aloqa: "4G",
   narxMin: 25000000, narxMax: 60000000, qayerdan: "EFOY distribyutori (import)", kimOrnatadi: "CCTV integratori"},
  {id: "minora",          yechim: "minora",    tur: "kamera-4G",        ishlabChiqaruvchi: "", model: "Mobil kuzatuv minorasi (quyosh paneli va LiFePO4)", quvvat: "quyosh+akkumulyator", aloqa: "4G",
   narxMin: 40000000, narxMax: 120000000, qayerdan: "Import tirkama yoki mahalliy yig'ish; ijara modeli", kimOrnatadi: "CCTV integratori"},
  {id: "klaster-shkaf",   yechim: "klaster",   tur: "shlyuz",           ishlabChiqaruvchi: "MikroTik yoki Ubiquiti", model: "Klaster shkafi: radio ko'prik, NVR, akkumulyator", quvvat: "quyosh+akkumulyator", aloqa: "4G",
   narxMin: 20000000, narxMax: 40000000, qayerdan: "Mahalliy integrator", kimOrnatadi: "Mahalliy integrator"},
  {id: "gps-treker",      yechim: "transport", tur: "GPS-treker",       ishlabChiqaruvchi: "Teltonika", model: "FMB sinfidagi GPS-treker, ichki akkumulyator", quvvat: "akkumulyator", aloqa: "4G",
   narxMin: 900000, narxMax: 1500000, qayerdan: "Telematika distribyutori", kimOrnatadi: "Telematika integratori"},
  {id: "titrash",         yechim: "transport", tur: "titrash-datchigi", ishlabChiqaruvchi: "Milesight", model: "LoRaWAN titrash va og'ish datchigi", quvvat: "akkumulyator", aloqa: "LoRaWAN",
   narxMin: 600000, narxMax: 950000, qayerdan: "Milesight distribyutori", kimOrnatadi: "IoT integratori"}
];

/* Himoya komplekti andozalari: taqdimotdagi 10 yechim bilan bir xil nomlar.
   tarkib — [katalogId, soni]. narxMln — taqdimotdagi bir obyekt narxi oralig'i (o'rnatish bilan). */
const HIMOYA_ANDOZALARI = [
  {id: "reolink",   tartib: 1,  nom: "Reolink va Home Hub",     qollash: "Uy, kichik ofis, do'kon", narxMln: [8, 12],
   tarkib: [["reolink-argus", 3], ["reolink-hub", 1]], aloqa: "4G", turlar: ["kopqavat", "uy", "dokon", "mamuriy"]},
  {id: "hikvision", tartib: 2,  nom: "Hikvision quyosh-4G",     qollash: "Ombor, hovli, uzoq obyekt", narxMln: [5, 9],
   tarkib: [["hik-solar", 1]], aloqa: "4G", turlar: ["ombor", "ferma", "issiqxona", "uy"]},
  {id: "dahua",     tartib: 3,  nom: "Dahua quyosh-4G",         qollash: "Katta hudud, perimetr", narxMln: [7, 12],
   tarkib: [["dahua-solar", 2]], aloqa: "4G", turlar: ["ferma", "issiqxona", "sex"]},
  {id: "lifepo4",   tartib: 4,  nom: "LiFePO4 shkafi",          qollash: "Quyosh paneli o'rnatib bo'lmaydigan obyekt", narxMln: [12, 20],
   tarkib: [["lifepo4-shkaf", 1], ["hik-solar", 1]], aloqa: "4G", turlar: ["sex", "mamuriy"]},
  {id: "ajax",      tartib: 5,  nom: "Ajax datchiklari",        qollash: "Ofis va qimmat obyekt", narxMln: [7, 10],
   tarkib: [["ajax-hub2", 1], ["ajax-door", 1], ["ajax-fire", 1], ["ajax-motion", 1]], aloqa: "4G", turlar: ["mamuriy", "dokon", "kopqavat"]},
  {id: "milesight", tartib: 6,  nom: "Milesight LoRaWAN",       qollash: "Katta ombor, texnik xona", narxMln: [3, 8],
   tarkib: [["ms-gateway", 1], ["ms-door", 2], ["ms-smoke", 1], ["ms-leak", 1]], aloqa: "LoRaWAN", turlar: ["ombor", "sex", "ferma"]},
  {id: "kochma",    tartib: 7,  nom: "Ko'chma stansiya",        qollash: "Qisqa muddatli aktiv", narxMln: [7, 16],
   tarkib: [["kochma-lfp", 1], ["reolink-argus", 2]], aloqa: "4G", turlar: ["dokon", "uy"]},
  {id: "efoy",      tartib: 8,  nom: "EFOY yoqilg'i elementi",  qollash: "Chekka va qimmat obyekt", narxMln: [25, 60],
   tarkib: [["efoy", 1], ["hik-solar", 2]], aloqa: "4G", turlar: ["sex", "ferma"]},
  {id: "minora",    tartib: 9,  nom: "Mobil minora",            qollash: "Katta maydon", narxMln: [40, 120],
   tarkib: [["minora", 1]], aloqa: "4G", turlar: ["ferma", "issiqxona"]},
  {id: "klaster",   tartib: 10, nom: "Klaster shkafi",          qollash: "Bir hududdagi 3–10 obyekt", narxMln: [20, 40],
   tarkib: [["klaster-shkaf", 1]], aloqa: "4G", turlar: ["ombor", "sex"]},
  {id: "transport", tartib: 11, nom: "Transport va uskuna komplekti", qollash: "Binosiz aktiv: transport, texnika, uskuna", narxMln: [1.5, 2.5],
   tarkib: [["gps-treker", 1], ["titrash", 1]], aloqa: "4G", turlar: ["avto", "yuk", "texnika", "uskuna"]}
];
const katalog = id => QURILMA_KATALOG.find(k => k.id === id) || null;

/* Obyekt andozasi: saqlangan y.himoya.andoza birinchi o'rinda, bo'lmasa turi va xavfi bo'yicha tavsiya */
function himoyaAndozasi(y) {
  if (!y) return null;
  const saqlangan = y.himoya && y.himoya.andoza ? HIMOYA_ANDOZALARI.find(a => a.id === y.himoya.andoza) : null;
  return saqlangan || himoyaAndozaTavsiyasi(y);
}
/* Turi va xavfi bo'yicha tavsiya (qimmat obyektga kuchliroq komplekt) */
function himoyaAndozaTavsiyasi(y) {
  if (!y) return null;
  if (!binolimi(y)) return HIMOYA_ANDOZALARI.find(a => a.id === "transport");
  const qiymat = (y.balans && y.balans.qiymat) || 0;
  const mos = HIMOYA_ANDOZALARI.filter(a => a.turlar.indexOf(y.rasmTuri) >= 0 && a.id !== "transport");
  if (!mos.length) return HIMOYA_ANDOZALARI[0];
  if (qiymat >= 5000) return mos[mos.length - 1];
  if (qiymat >= 1500) return mos[Math.min(1, mos.length - 1)];
  return mos[0];
}
/* Smeta: qurilmalar x narx + o'rnatish + 12 oylik aloqa. So'mda, oraliq bilan. */
function himoyaSmetasi(andozaId, soni) {
  const a = typeof andozaId === "object" ? andozaId : HIMOYA_ANDOZALARI.find(x => x.id === andozaId);
  if (!a) return null;
  const n = soni || 1;
  const qatorlar = a.tarkib.map(([kid, dona]) => {
    const k = katalog(kid);
    return {katalogId: kid, nom: [k.ishlabChiqaruvchi, k.model].filter(Boolean).join(" "), tur: k.tur, dona,
            narxMin: k.narxMin * dona, narxMax: k.narxMax * dona};
  });
  const jihozMin = qatorlar.reduce((s, q) => s + q.narxMin, 0);
  const jihozMax = qatorlar.reduce((s, q) => s + q.narxMax, 0);
  const ornatishF = (param("ornatishFoiz") || 0) / 100;
  const oy = param("aloqaOy") || 12;
  const simSoni = qatorlar.filter(q => katalog(q.katalogId).aloqa === "4G" && ["shlyuz", "kamera-4G", "faceid-terminal", "GPS-treker"].indexOf(q.tur) >= 0)
    .reduce((s, q) => s + q.dona, 0);
  const aloqaOylik = a.aloqa === "LoRaWAN" ? (param("aloqaLoraOylikMing") || 0) * 1000
                                          : simSoni * (param("aloqaSimOylikMing") || 0) * 1000;
  const aloqa = aloqaOylik * oy;
  return {
    andoza: a.id, nom: a.nom, obyektSoni: n, qatorlar,
    jihoz: [jihozMin * n, jihozMax * n],
    ornatish: [Math.round(jihozMin * ornatishF) * n, Math.round(jihozMax * ornatishF) * n],
    aloqa: aloqa * n, aloqaOy: oy,
    jami: [Math.round(jihozMin * (1 + ornatishF) + aloqa) * n, Math.round(jihozMax * (1 + ornatishF) + aloqa) * n],
    taxminiy: true
  };
}

/* ============================================================
   5. Aktiv hosilalari: muddat, zaxira, soliq
   ============================================================ */
function chegaraKuni(y) {
  const a = qabulAsosiInfo(y && y.balans && y.balans.qabulAsosi);
  return a && a.garov === false ? param("uchYilKun") : param("umidsizKun");
}
function muddatHisobi(y, joriy) {
  const b = sanaOqi(y && y.balans && y.balans.sana);
  const j = joriy ? sanaOqi(joriy) : BUGUN;
  if (!b) return {kiritilmagan: true, holat: "kiritilmagan", holatNomi: MUDDAT_HOLATLARI.kiritilmagan.nom,
                  balansSana: null, soliqImtiyozTugash: null, umidsizSana: null, uchYilSana: null,
                  chegaraSana: null, turganKun: null, qolganKun: null};
  const umidsizKun = param("umidsizKun"), uchYilKun = param("uchYilKun");
  const chegara = chegaraKuni(y);
  const turgan = kunFarqi(b, j);
  /* Mol-mulk va yer solig'i imtiyozi faqat binoli aktivga tegishli: transport va uskunaga soliq qo'llanmaydi (soliqHisobi bilan bir xil) */
  const imtiyoz = binolimi(y) ? oyQosh(b, param("soliqImtiyozOy") || 6) : null;
  const qolgan = chegara - turgan;
  let holat;
  if (y.holat === "Chiqarildi") holat = "chiqarilgan";
  else if (turgan >= uchYilKun) holat = "3-yildan-oshgan";
  else if (turgan >= chegara) holat = "umidsiz";
  else if (qolgan <= 90) holat = "xavf-90";
  else if (imtiyoz && j < imtiyoz) holat = "imtiyozda";
  else holat = "normal";
  return {
    balansSana: sanaYoz(b),
    soliqImtiyozTugash: imtiyoz ? sanaYoz(imtiyoz) : null,
    umidsizSana: sanaYoz(kunQosh(b, umidsizKun)),
    uchYilSana: sanaYoz(kunQosh(b, uchYilKun)),
    chegaraSana: sanaYoz(kunQosh(b, chegara)),
    chegaraKun: chegara,
    turganKun: turgan,
    qolganKun: qolgan,
    uchYilgachaKun: uchYilKun - turgan,
    imtiyozQolganKun: imtiyoz ? kunFarqi(j, imtiyoz) : null,
    holat, holatNomi: MUDDAT_HOLATLARI[holat].nom
  };
}
/* Balansda turgan kunga qarab zaxira toifasi. chegara: 365 (garov) yoki 1095 (boshqa mulk). */
function zaxiraToifasi(kun, chegara) {
  const ch = chegara || param("umidsizKun");
  const topish = k => ZAXIRA_TOIFALARI.find(t => t.kalit === k);
  if (kun == null) return null;
  if (kun >= ch) return Object.assign({}, topish("umidsiz"), {foiz: param("zaxiraUmidsizFoiz"), taxminiy: false});
  if (kun <= param("zaxiraOraliq1Kun")) return Object.assign({}, topish("substandart"), {foiz: param("zaxiraOraliq1Foiz"), taxminiy: paramTaxminiy("zaxiraOraliq1Foiz") || paramTaxminiy("zaxiraOraliq1Kun")});
  if (kun <= param("zaxiraOraliq2Kun")) return Object.assign({}, topish("qoniqarsiz"), {foiz: param("zaxiraOraliq2Foiz"), taxminiy: paramTaxminiy("zaxiraOraliq2Foiz") || paramTaxminiy("zaxiraOraliq2Kun")});
  return Object.assign({}, topish("shubhali"), {foiz: param("zaxiraOraliq3Foiz"), taxminiy: paramTaxminiy("zaxiraOraliq3Foiz")});
}
function zaxiraHisobi(y, joriy) {
  const m = muddatHisobi(y, joriy);
  const q = y && y.balans ? y.balans.qiymat : null;
  if (m.kiritilmagan || !(q > 0)) return {kiritilmagan: true, toifa: null, foiz: null, summa: null, taxminiy: false};
  if (m.holat === "chiqarilgan") return {kiritilmagan: false, toifa: null, foiz: 0, summa: 0, taxminiy: false};
  const t = zaxiraToifasi(m.turganKun, m.chegaraKun);
  return {kiritilmagan: false, toifa: t.kalit, toifaNomi: t.nom, chip: t.chip, rang: t.rang,
          foiz: t.foiz, summa: yaxlit(q * t.foiz / 100), asos: q, taxminiy: t.taxminiy,
          izoh: t.taxminiy ? "Oraliq stavka buxgalteriya tasdig'ida" : ""};
}
/* Mol-mulk solig'i (O'RQ-1108): baza = max(balans qiymati, maydon x minimal qiymat).
   davr: "2026-Q3". Imtiyoz oylari (balansga olingandan 6 oy) soliqqa tortilmaydi.
   Yer solig'i formulasi uydirilmaydi: yerSoligi qo'lda kiritiladi. */
function soliqHisobi(y, davr) {
  if (!y) return null;
  if (!binolimi(y)) return {qollanmaydi: true, izoh: "Mol-mulk solig'i binosiz aktivga qo'llanmaydi"};
  const m = /^(\d{4})-Q([1-4])$/.exec(davr || "");
  const yil = m ? +m[1] : BUGUN.getFullYear();
  const chorak = m ? +m[2] : Math.floor(BUGUN.getMonth() / 3) + 1;
  const b = sanaOqi(y.balans && y.balans.sana);
  const maydon = (y.maydon && (y.maydon.foydali || y.maydon.qurilishOsti)) || 0;
  const toifa = (y.huquq && y.huquq.aholiPunktiToifasi) || hududToifasi(y);
  const minM2 = param((HUDUD_TOIFA.toifalar.find(t => t.kalit === toifa) || HUDUD_TOIFA.toifalar[2]).param);
  const minBaza = yaxlit(maydon * minM2);
  const qiymat = (y.balans && y.balans.qiymat) || 0;
  const baza = Math.max(qiymat, minBaza);
  const stavka = y.konservatsiya ? param("konservatsiyaFoiz") : param("molMulkSoligiFoiz");
  const yillik = baza * stavka / 100;
  const imtiyozTugash = b ? oyQosh(b, param("soliqImtiyozOy") || 6) : null;
  let soliqOy = 0, imtiyozOy = 0;
  for (let i = 0; i < 3; i++) {
    const oyBosh = new Date(yil, (chorak - 1) * 3 + i, 1);
    const oyOxir = new Date(yil, (chorak - 1) * 3 + i + 1, 0);
    if (!b || b > oyOxir) continue;                     /* bu oyda aktiv hali balansda emas */
    if (imtiyozTugash && oyBosh < imtiyozTugash) imtiyozOy++; else soliqOy++;
  }
  return {davr: yil + "-Q" + chorak, baza: yaxlit(baza), minBaza, maydon, toifa, minM2, stavka,
          yillik: yaxlit(yillik, 2), summa: yaxlit(yillik / 12 * soliqOy, 2), soliqOy, imtiyozOy,
          imtiyoz: imtiyozOy > 0, imtiyozTugash: imtiyozTugash ? sanaYoz(imtiyozTugash) : null,
          yerSoligi: null, maydonKiritilmagan: !maydon};
}

/* ============================================================
   6. Aktiv yozuvi: sxema va o'qish uchun qulay ko'rinishlar
   ============================================================ */
/* To'plamlar sxemasi: server PATCH oq ro'yxati va testlar shu ro'yxatdan foydalanadi */
const SXEMA = {
  YOZUVLAR: ["id", "nom", "qisqa", "tur", "turKalit", "rasmTuri", "binoli", "hudud", "hududKod", "hududToliq", "tuman", "manzil",
    "joy", "filial", "filialKod", "sobiqEga", "tafsilot", "holat", "bosqich", "masul", "balans", "qiymat", "maydon", "huquq",
    "kommunal", "himoya", "sotuv", "konservatsiya", "rasm", "rasmKichik", "rasmlar", "rasmManba", "rasmUmumiy", "tarix", "izoh",
    /* qabul: {dalolatnomaRaqami, sana, komissiya:[{ism, lavozim}], rais, kalitlar, jihozlar:[{nom, soni, holati}]} */
    "qabul"],
  UNDIRUV_ISHLAR: ["id", "holat", "bosqich", "qarzdor", "shartnoma", "qarz", "garov", "filial", "filialKod", "masul", "advokatId",
    "sud", "qaror", "ijro", "muddat", "tarix", "hujjatlar", "aktivId", "yopilganSana"],
  LOTLAR: ["id", "obyektId", "eauksionLotRaqami", "sotishUsuli", "elonSana", "savdoSana", "boshlangichNarx", "minimalNarx",
    "zakalatFoiz", "qadamFoiz", "pasaytirishlar", "keyingiPasaytirishSana", "holat", "golib", "yakuniyNarx", "bayonnomaSana",
    "ishtirokchilarSoni", "takroriySavdoSana", "tolovMuddati", "shartnomaMuddati", "paketId", "qarorRaqami"],
  TAKLIFLAR: ["id", "obyektId", "lotId", "xaridor", "xaridorTuri", "stirYokiPinfl", "summa", "tolovSharti", "sana", "amlNatija",
    "affillanganlik", "qarorRaqami", "holat", "izoh"],
  SHARTNOMALAR: ["id", "lotId", "taklifId", "obyektId", "xaridor", "narx", "avans", "sotishUsuli", "sana", "jadval", "taqiqHolati", "holat"],
  IJARA: ["id", "obyektId", "ijarachi", "maydon", "oylikIjara", "boshlanish", "tugash", "depozit", "kommunalKimTolaydi",
    "sotuvdaBekorQilishSharti", "tolovlar", "holat"],
  PAKETLAR: ["id", "nom", "tarkib", "investKompaniya", "holat"],
  QORIQLASH: ["id", "obyektId", "qoriqlashTuri", "ijrochi", "shartnomaRaqami", "boshlanish", "tugash", "oylikTolov", "javobVaqtiDaq", "holat"],
  KOMMUNAL_ARIZALAR: ["id", "obyektId", "xizmat", "tur", "raqam", "sana", "muddat", "holat", "izoh"],
  INVENTAR: ["id", "obyektId", "inventarRaqam", "qrKod", "nom", "marka", "model", "yil", "vin", "motosoatYokiKm", "butlik",
    "butlikIzoh", "akkumulyator", "kalit", "saqlashJoyi", "holatBall", "oxirgiSanash"],
  INVENTARIZATSIYALAR: ["id", "sana", "turi", "komissiya", "obyektlar", "natijalar", "kamomad", "ortiqcha", "holat"],
  SOLIQ: ["id", "obyektId", "davr", "baza", "stavka", "summa", "imtiyoz", "yerSoligi", "holat"],
  MB_HISOBOTLAR: ["id", "davr", "muddat", "topshirilganSana", "obyektlarSoni", "jamiBalansQiymat", "kapital1Daraja",
    "kapitalgaNisbat", "umidsizSoni", "holat"],
  QOIDALAR: ["id", "trigger", "nom", "kunlar", "natija", "qabulQiluvchiRol", "eskalatsiyaRol", "eskalatsiyaKun", "faol", "manba"],
  FAYLLAR: ["id", "obyektId", "kolleksiya", "yozuvId", "nom", "tur", "hajm", "yuklangan", "yuklagan", "yol"],
  /* To'rt ko'z qoidasi: muallifLogin — so'rovni yuborgan xodim logini; qarorKim — qaror qilgan xodim logini;
     qarorVakolat — "o'z" yoki "o'rinbosar"; qarorNomidan — o'rinbosar kimning nomidan qaror qilgani (login) */
  TASDIQLAR: ["id", "tur", "manbaKol", "manbaId", "obyektId", "sarlavha", "tavsif", "summa", "muallif", "muallifLogin", "masulRol",
    "javobMuddati", "holat", "qaror", "sabab", "qarorSana", "qarorKim", "qarorVakolat", "qarorNomidan", "sana", "asos"],
  /* oqiganlar: o'qigan xodimlar loginlari. oqildi — eski umumiy belgi (true bo'lsa hamma uchun o'qilgan) */
  BILDIRISHLAR: ["id", "qoidaId", "obyektId", "sarlavha", "matn", "havola", "sana", "rol", "oqildi", "oqiganlar", "ikon"],
  /* qoldirish — vazifa shu sanagacha navbatda ko'rsatilmaydi (dd.mm.yyyy) */
  /* muallifLogin — vazifani qo'shgan xodim (server sessiyadan yozadi; qoidalar dvigateli yozgan vazifada null).
     Boshqa xodim bergan vazifani ijrochi o'chirmaydi */
  MENING_VAZIFALARIM: ["id", "nom", "tur", "obyektId", "kod", "qoidaId", "sana", "muddat", "ijrochi", "rol", "muhimlik", "bajarildi", "qoldirish",
    "muallifLogin"],
  SUGURTA_DAVOLARI: ["id", "polisId", "hodisaId", "obyektId", "sana", "summa", "holat"],
  ZAXIRA_TARIX: ["id", "davr", "obyektId", "toifa", "foiz", "summa"],
  PARAMETRLAR: ["id", "guruh", "nom", "qiymat", "birlik", "taxminiy", "manba"],
  BAYRAMLAR: ["id", "sana", "nom", "taxminiy"],
  INTEGRATSIYALAR: ["id", "nom", "holat", "masul", "izoh", "oxirgiSinxron"]
};
/* Sxemasi namoyish kalitlaridan olinadigan to'plamlarga qo'shimcha maydonlar va ularning turi.
   Mijoz (yadro/api.js) va server (server/server.js) oq ro'yxatga shularni ham qo'shadi. */
const QOSHIMCHA_MAYDONLAR = {
  HODISALAR: {zarar: "number", chora: "string"},
  XAVFSIZLIK_HODISALARI: {zarar: "number", izoh: "string"},
  XIZMAT_ISHLARI: {narx: "number"},
  /* muallifLogin — yozuvni kiritgan xodim logini (server sessiyadan yozadi, keyin o'zgarmaydi) */
  XARAJATLAR: {manbaId: "string", muallifLogin: "string"},
  /* So'rovchi o'z so'rovini tasdiqlamaydi: muallifLogin shu tekshiruvga asos */
  KIRISH_SOROVLARI: {muallifLogin: "string"},
  /* boshlanish — sessiya haqiqatda boshlangan vaqt (dd.mm.yyyy HH:MM); rejadagi sana/vaqt o'zgarmaydi */
  MASOFAVIY_SESSIYALAR: {boshlanish: "string"},
  TASHRIFLAR: {jurnal: "array", sorovId: "string"},
  KIRISH_VOQEALARI: {qaror: "object", kartaRaqam: "string"},
  BAHOLASHLAR: {sabab: "string", narx: "number", muddat: "string"},
  /* orinbosar: {login, dan, gacha} — qaror vakolati shu davrda o'rinbosarga o'tadi;
     sayohatlar: {sayohatId: {holat: "tugadi"|"otkazildi"|"yarim", sana}}. Ikkalasini xodim o'z yozuvida o'zgartiradi */
  FOYDLAR: {orinbosar: "object", sayohatlar: "object", bildirishSozlama: "object"}
};
/* Tashqi tizimlar bilan ulanish holati (sozlamalar). Tavsif integratsiyalar sahifasida. */
const INTEGRATSIYALAR = [
  {id: "eauksion", nom: "E-auksion"},
  {id: "kadastr",  nom: "Ko'chmas mulk kadastri"},
  {id: "yhxx",     nom: "YHXX"},
  {id: "abs",      nom: "Bank ABS"},
  {id: "kommunal", nom: "Kommunal ta'minotchilar"},
  {id: "iot",      nom: "NVR va IoT shlyuzi"},
  {id: "sms",      nom: "SMS shlyuzi"}
].map(x => Object.assign(x, {holat: "ulanmagan", masul: null, izoh: "", oxirgiSinxron: null}));
const INTEGRATSIYA_HOLATLARI = [
  {kalit: "ulanmagan",   nom: "Ulanmagan",   chip: "chip-kul"},
  {kalit: "sozlanmoqda", nom: "Sozlanmoqda", chip: "chip-sariq"},
  {kalit: "ulangan",     nom: "Ulangan",     chip: "chip-yashil"}
];

/* Maydon ko'rinishi: "1 850 m²", binosiz aktiv uchun "1 dona" */
function maydonMatn(y) {
  if (!y) return "";
  if (!binolimi(y)) return "1 dona";
  const m = y.maydon || {};
  const v = m.foydali || m.qurilishOsti || m.yer || 0;
  return v > 0 ? fmt(Math.round(v)) + " m²" : "kiritilmagan";
}

/* Eski sahifalar uchun faqat o'qiladigan ko'rinish (y.mulk). Yangi kod yuqori darajadagi
   maydonlardan foydalanadi: y.nom, y.balans, y.qiymat va hokazo. */
function mulkKorinish(y) {
  return {
    tur: y.tur, nom: y.nom, qisqa: y.qisqa, hudud: y.hudud, hududToliq: y.hududToliq, manzil: y.manzil,
    maydon: maydonMatn(y), baho: y.qiymat ? y.qiymat.bozor : null, bahoSana: y.qiymat ? y.qiymat.bahoSana : null,
    qabul: y.balans ? y.balans.sana : null, rasm: y.rasm || "", rasmKichik: y.rasmKichik || y.rasm || "",
    rasmTuri: y.rasmTuri, nazoratBall: W.MKB_DATA && W.MKB_DATA.nazoratIndeksi ? (W.MKB_DATA.nazoratIndeksi(y) || {}).ball : null
  };
}
/* Xotiradagi yozuvga hosila maydonlarni ulash. Ular sanab o'tilmaydi (JSON ga tushmaydi),
   har murojaatda joriy ma'lumotdan qayta hisoblanadi. */
function aktivTayyorla(y) {
  if (!y || typeof y !== "object" || Object.prototype.hasOwnProperty.call(y, "muddat")) return y;
  Object.defineProperty(y, "muddat", {get() { return muddatHisobi(this); }, enumerable: false, configurable: true});
  Object.defineProperty(y, "zaxira", {get() { return zaxiraHisobi(this); }, enumerable: false, configurable: true});
  Object.defineProperty(y, "mulk",   {get() { return mulkKorinish(this); }, enumerable: false, configurable: true});
  Object.defineProperty(y, "holatInfo", {get() { return holatInfo(this.holat); }, enumerable: false, configurable: true});
  return y;
}
/* To'plamga keyin qo'shilgan yozuvlar ham (MKBapi.yangi) hosilalarga ega bo'lishi uchun */
function tayyorlovchiRoyxat(arr) {
  arr.forEach(aktivTayyorla);
  Object.defineProperty(arr, "push", {
    value: function () { Array.prototype.forEach.call(arguments, aktivTayyorla); return Array.prototype.push.apply(this, arguments); },
    enumerable: false, configurable: true, writable: true
  });
  return arr;
}

/* Aktiv yozuvining to'liq qolipi: berilmagan maydonlar halol bo'sh qiymat oladi */
function aktivQolip(x) {
  const binoli = x.binoli != null ? x.binoli : (ASOSIY_TURLAR.find(t => t.kalit === x.turKalit) || {}).binoli !== false;
  const y = Object.assign({
    id: "", nom: "", qisqa: "", tur: "", turKalit: "noturar", rasmTuri: "mamuriy", binoli,
    hudud: "", hududKod: null, hududToliq: "", tuman: "", manzil: "", joy: null,
    filial: "", filialKod: null, sobiqEga: "", tafsilot: null,
    holat: "Balansda", bosqich: "qabul", masul: null, konservatsiya: false,
    rasm: "", rasmKichik: "", rasmlar: [], rasmManba: null, rasmUmumiy: false, tarix: [], izoh: ""
  }, x);
  y.balans = Object.assign({sana: null, qiymat: null, hisobvaraq: null, qabulAsosi: null,
    asosHujjat: {raqam: null, sana: null}, yopilganQarz: null, ixtiyoriyTopshirish: null, undiruvIshId: null}, x.balans || {});
  y.qiymat = Object.assign({bozor: null, tugatish: null, baholanmagan: true, bahoSana: null, baholovchi: null}, x.qiymat || {});
  if (y.qiymat.bozor != null) y.qiymat.baholanmagan = false;
  y.maydon = Object.assign({yer: 0, qurilishOsti: 0, foydali: 0}, x.maydon || {});
  if (!binoli) y.maydon = {yer: 0, qurilishOsti: 0, foydali: 0};
  y.huquq = Object.assign({kadastrRaqami: null, qaydSana: null, reyestrKochirma: null, taqiqlar: [], yerHuquqiTuri: null,
    davlatRaqami: null, vin: null, texPasport: null, yhxxQaydSana: null, aholiPunktiToifasi: null}, x.huquq || {});
  if (!y.huquq.aholiPunktiToifasi) y.huquq.aholiPunktiToifasi = hududToifasi(y);
  y.kommunal = binoli ? (x.kommunal || KOMMUNAL_XIZMATLAR.map(k => kommunalQator(k.kalit))) : [];
  y.himoya = Object.assign({qoriqlashTuri: null, qurilmaSoni: 0, andoza: null}, x.himoya || {});
  y.sotuv = Object.assign({holat: null, usul: null, lotId: null, qarorRaqami: null}, x.sotuv || {});
  return y;
}
function kommunalQator(xizmat, q) {
  return Object.assign({xizmat, holat: null, hisoblagich: null, korsatkich: null, korsatkichSana: null, plomba: null,
    shaxsiyHisob: null, avvalgiQarz: null, qarzYoqligiMalumotnoma: null, texnikShartAriza: null, texnikShartSana: null,
    shartnomaSana: null, oylikXarajat: null}, q || {});
}

/* ============================================================
   7. Mahalliy (haqiqiy) reyestr
   vositalar/import_taqdimot.py yaratgan mahalliy/obyektlar.json. Faqat localhost orqali
   ochilganda o'qiladi; ommaviy nusxada har doim namoyish ma'lumoti ishlaydi.
   ============================================================ */
function mahalliyOqish() {
  if (typeof location === "undefined" || typeof XMLHttpRequest === "undefined") return null;
  if (!/^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname)) return null;
  try {
    if (localStorage.getItem("mkb-manba") === "shartli" || sessionStorage.getItem("mkb-mahalliy-yoq")) return null;
    const x = new XMLHttpRequest();
    x.open("GET", "mahalliy/obyektlar.json", false);
    x.send();
    if (x.status === 200) {
      const j = JSON.parse(x.responseText);
      return j && j.obyektlar && j.obyektlar.length ? j : null;
    }
    sessionStorage.setItem("mkb-mahalliy-yoq", "1");
  } catch (_) { try { sessionStorage.setItem("mkb-mahalliy-yoq", "1"); } catch (e) { /* ruxsat yo'q */ } }
  return null;
}
function mahalliyAktiv(m) {
  const kod = m.hudud;
  const h = HUDUD_KODLAR[kod] || {};
  const balansSana = sanaYoz(sanaOqi(m.balansSana));
  return aktivQolip({
    id: m.id, nom: m.nom + (m.manzil ? ", " + m.manzil : ""), qisqa: m.nom,
    tur: m.tur, turKalit: m.turKalit, rasmTuri: m.rasmTuri, binoli: !!m.binoli,
    hudud: m.hududNomi || h.nom || "", hududKod: kod || null,
    hududToliq: (m.hududNomi || h.nom || "") + (m.tuman ? ", " + m.tuman : ""), tuman: m.tuman || "", manzil: m.manzil || "",
    /* Koordinata hudud markazidan olinadi: aniq nuqta kiritilmaguncha aniq=false */
    joy: h.lat ? {lat: h.lat, lng: h.lng, aniq: false} : null,
    filial: m.filialNomi || "", filialKod: m.filial || null,
    sobiqEga: m.sobiqEga && m.sobiqEga !== "—" ? m.sobiqEga : "", tafsilot: m.tafsilot || null,
    holat: m.holat === "Sotuvga tayyorlanmoqda" ? "Sotuvga tayyorlanmoqda" : "Balansda",
    bosqich: m.holat === "Sotuvga tayyorlanmoqda" ? "sotuv" : "qabul",
    balans: {sana: balansSana, qiymat: m.balansQiymat},
    qiymat: m.sotishQiymat ? {bozor: m.sotishQiymat, baholanmagan: false, manba: "Balansga qabul taqdimoti"}
                           : {bozor: null, baholanmagan: true},
    maydon: {yer: m.yerMaydon || 0, qurilishOsti: m.qurilishOsti || 0, foydali: m.foydaliMaydon > 1 ? m.foydaliMaydon : 0},
    sotuv: m.sotishQiymat ? {holat: "tayyorlanmoqda"} : {},
    rasm: m.rasm || "", rasmKichik: m.rasmKichik || m.rasm || "", rasmlar: Array.isArray(m.rasmlar) ? m.rasmlar : (m.rasm ? [{yol: m.rasm, tur: "foto"}] : []),
    rasmManba: m.rasmManba || (m.slayd ? "Balansga qabul taqdimoti, " + m.slayd + "-slayd" : null),
    rasmUmumiy: !!m.rasmUmumiy,
    tarix: balansSana ? [{sana: balansSana, voqea: "Balansga qabul qilindi", izoh: "Balans qiymati: " + pul(m.balansQiymat)}] : []
  });
}

const MAH = mahalliyOqish();
const MANBA = MAH ? "mahalliy" : "shartli";

/* ============================================================
   8. Namoyish: sakkizta asosiy aktiv (qolgan 259 tasi malumot-kengaytma.js da)
   Bu yozuvlar qo'lda to'ldirilgan: kartochka, qabul ustasi va hisobotlarda to'liq
   ma'lumotli misol bo'ladi. Barcha sanalar bugun() ga nisbatan.
   ============================================================ */
function asosiyAktivlar() {
  return [
    aktivQolip({
      id: "AK-2026/4471", nom: "Yunusobod 12-kvartal, 45-uy, 23-xonadon", qisqa: "Yunusobod 12-kvartal, 45-uy",
      tur: "Turar joy", turKalit: "turar", rasmTuri: "kopqavat", binoli: true,
      hudud: "Toshkent sh.", hududKod: "TS", hududToliq: "Toshkent sh., Yunusobod", tuman: "Yunusobod tumani",
      manzil: "Yunusobod 12-kvartal, 45-uy, 23-xonadon", joy: {lat: 41.3516, lng: 69.2856, aniq: true},
      filial: "Yunusobod BXM", filialKod: "TS-02", sobiqEga: "Karimov Javlon Anvarovich",
      holat: "Sotuvga tayyorlanmoqda", bosqich: "sotuv", masul: "Ismoilova Nilufar",
      balans: {sana: nisbiy(-214), qiymat: 412.0, hisobvaraq: "16701", qabulAsosi: "sud",
        asosHujjat: {raqam: "2-1234/2026", sana: nisbiy(-260)}, yopilganQarz: 486.2, ixtiyoriyTopshirish: false, undiruvIshId: "UI-2026/0412"},
      qiymat: {bozor: 520.0, tugatish: 416.0, bahoSana: nisbiy(-190), baholovchi: "«Expert Baho» MChJ"},
      maydon: {yer: 0, qurilishOsti: 0, foydali: 78},
      huquq: {kadastrRaqami: "10:01:05:02:0045:0023", qaydSana: nisbiy(-170), reyestrKochirma: "RK-2026/10458", yerHuquqiTuri: "Umumiy ulushli mulk"},
      kommunal: [
        kommunalQator("elektr", {holat: "ulangan", hisoblagich: "E-4471-08", korsatkich: 18422, korsatkichSana: nisbiy(-30), plomba: "P-771204", shaxsiyHisob: "7710-4471", avvalgiQarz: 0, qarzYoqligiMalumotnoma: true, shartnomaSana: nisbiy(-160), oylikXarajat: 0.12}),
        kommunalQator("gaz",    {holat: "uzilgan", hisoblagich: "G-4471-02", korsatkich: 0, korsatkichSana: nisbiy(-213), plomba: "P-G11034", avvalgiQarz: 1.9}),
        kommunalQator("suv",    {holat: "ulangan", hisoblagich: "S-4471-11", korsatkich: 312, korsatkichSana: nisbiy(-30), shaxsiyHisob: "S-4471", avvalgiQarz: 0, shartnomaSana: nisbiy(-150), oylikXarajat: 0.05})
      ],
      himoya: {qoriqlashTuri: "avtonom", qurilmaSoni: 0, andoza: "ajax"},
      sotuv: {holat: "tayyorlanmoqda", usul: "eauksion", qarorRaqami: "RQ-2026/118"},
      tarix: [
        {sana: nisbiy(-214), voqea: "Balansga qabul qilindi", izoh: "Sud qarori 2-1234/2026 asosida, ijro varaqasi MIBda."},
        {sana: nisbiy(-190), voqea: "Baholash hisoboti qabul qilindi", izoh: "Bozor qiymati 520 mln so'm."},
        {sana: nisbiy(-170), voqea: "Huquq bank nomiga ro'yxatdan o'tkazildi", izoh: "Davlat reyestridan ko'chirma olindi."},
        {sana: nisbiy(-12),  voqea: "Realizatsiya qarori qabul qilindi", izoh: "E-auksion orqali sotish."}
      ]
    }),
    aktivQolip({
      id: "AK-2025/1187", nom: "Zarafshon Tekstil ishlab chiqarish sexi", qisqa: "Zarafshon Tekstil sexi",
      tur: "Noturar bino", turKalit: "noturar", rasmTuri: "sex", binoli: true,
      hudud: "Samarqand", hududKod: "SA", hududToliq: "Samarqand vil., Samarqand sh.", tuman: "Samarqand shahri",
      manzil: "Samarqand sh., Sanoat ko'chasi, 4", joy: {lat: 39.6497, lng: 66.987, aniq: true},
      filial: "Samarqand BXO", filialKod: "SA-01", sobiqEga: "«Zarafshon Tekstil» MChJ",
      holat: "Lotda", bosqich: "lot", masul: "Tosheva Barno",
      balans: {sana: nisbiy(-402), qiymat: 3840.4, hisobvaraq: "16701", qabulAsosi: "sud",
        asosHujjat: {raqam: "4-0221/2025", sana: nisbiy(-470)}, yopilganQarz: 3840.4, ixtiyoriyTopshirish: false, undiruvIshId: "UI-2025/1187"},
      qiymat: {bozor: 4150.0, tugatish: 3320.0, bahoSana: nisbiy(-111), baholovchi: "«Baholash Servis» MChJ"},
      maydon: {yer: 12000, qurilishOsti: 9400, foydali: 8800},
      huquq: {kadastrRaqami: "14:05:01:03:0112", qaydSana: nisbiy(-360), reyestrKochirma: "RK-2025/33871", yerHuquqiTuri: "Ijara"},
      kommunal: [
        kommunalQator("elektr", {holat: "uzilgan", hisoblagich: "E-1187-01", korsatkich: 0, korsatkichSana: nisbiy(-402), plomba: "P-SA0921", avvalgiQarz: 38.4, texnikShartAriza: "MG-2026/88412", texnikShartSana: nisbiy(-20)}),
        kommunalQator("gaz",    {holat: "uzilgan", hisoblagich: "G-1187-01", korsatkich: 0, korsatkichSana: nisbiy(-402), avvalgiQarz: 12.1}),
        kommunalQator("suv",    {holat: "vaqtincha to'xtatilgan", hisoblagich: "S-1187-01", korsatkich: 1204, korsatkichSana: nisbiy(-402)})
      ],
      himoya: {qoriqlashTuri: "pult", qurilmaSoni: 0, andoza: "efoy"},
      sotuv: {holat: "lotda", usul: "eauksion", qarorRaqami: "RQ-2026/074"},
      tarix: [
        {sana: nisbiy(-402), voqea: "Balansga qabul qilindi", izoh: "Majburiy ijro tugagach bank foydasiga o'tkazildi."},
        {sana: nisbiy(-360), voqea: "Huquq bank nomiga ro'yxatdan o'tkazildi", izoh: ""},
        {sana: nisbiy(-111), voqea: "Qayta baholandi", izoh: "Bozor qiymati 4,15 mlrd so'm."},
        {sana: nisbiy(-47),  voqea: "E-auksionga lot qo'yildi", izoh: ""}
      ]
    }),
    aktivQolip({
      id: "AK-2026/2210", nom: "Chilonzor 9-kvartal, 12-uy, 56-xonadon", qisqa: "Chilonzor 9-kvartal, 12-uy",
      tur: "Turar joy", turKalit: "turar", rasmTuri: "kopqavat", binoli: true,
      hudud: "Toshkent sh.", hududKod: "TS", hududToliq: "Toshkent sh., Chilonzor", tuman: "Chilonzor tumani",
      manzil: "Chilonzor 9-kvartal, 12-uy, 56-xonadon", joy: {lat: 41.2753, lng: 69.211, aniq: true},
      filial: "Chilonzor BXM", filialKod: "TS-03", sobiqEga: "Ergasheva Dilnoza Baxtiyorovna",
      holat: "Rasmiylashtirilmoqda", bosqich: "rasmiylashtirish", masul: "Ismoilova Nilufar",
      balans: {sana: nisbiy(-96), qiymat: 92.5, hisobvaraq: "16701", qabulAsosi: "notarial",
        asosHujjat: {raqam: "NK-2026/2210", sana: nisbiy(-110)}, yopilganQarz: 92.5, ixtiyoriyTopshirish: false, undiruvIshId: "UI-2026/2210"},
      qiymat: {bozor: 340.0, tugatish: 272.0, bahoSana: nisbiy(-80), baholovchi: "«Andoza Baho» MChJ"},
      maydon: {yer: 0, qurilishOsti: 0, foydali: 64},
      huquq: {taqiqlar: [{turi: "Soliq taqiqi", organ: "Chilonzor tumani DSI", sana: nisbiy(-300), yechilganSana: null}]},
      kommunal: [
        kommunalQator("elektr", {holat: "ulangan", hisoblagich: "E-2210-04", korsatkich: 9021, korsatkichSana: nisbiy(-95), shaxsiyHisob: "7710-2210", avvalgiQarz: 0.8}),
        kommunalQator("gaz",    {holat: "ulangan", hisoblagich: "G-2210-04", korsatkich: 1432, korsatkichSana: nisbiy(-95), avvalgiQarz: 0}),
        kommunalQator("suv",    {holat: "ulangan", hisoblagich: "S-2210-04", korsatkich: 211, korsatkichSana: nisbiy(-95), avvalgiQarz: 0.3})
      ],
      himoya: {qoriqlashTuri: "ichki", qurilmaSoni: 0, andoza: "reolink"},
      tarix: [
        {sana: nisbiy(-96), voqea: "Balansga qabul qilindi", izoh: "Notarial kelishuv asosida sudsiz undirish."},
        {sana: nisbiy(-80), voqea: "Baholash hisoboti qabul qilindi", izoh: ""},
        {sana: nisbiy(-40), voqea: "Kadastrga ariza topshirildi", izoh: "Soliq taqiqi yechilishi kutilmoqda."}
      ]
    }),
    aktivQolip({
      id: "AK-2025/0934", nom: "Navruz Plaza, 3-qavat savdo maydoni", qisqa: "Navruz Plaza",
      tur: "Noturar bino", turKalit: "noturar", rasmTuri: "dokon", binoli: true,
      hudud: "Toshkent sh.", hududKod: "TS", hududToliq: "Toshkent sh., Shayxontohur", tuman: "Shayxontohur tumani",
      manzil: "Amir Temur ko'chasi, 88", joy: {lat: 41.3039, lng: 69.2437, aniq: true},
      filial: "Toshkent shahar BXO", filialKod: "TS-01", sobiqEga: "«Navruz Savdo» MChJ",
      holat: "Ijarada", bosqich: "sotuv", masul: "Tosheva Barno",
      balans: {sana: nisbiy(-268), qiymat: 1260.6, hisobvaraq: "16701", qabulAsosi: "takroriy",
        asosHujjat: {raqam: "EA-2025/77104", sana: nisbiy(-300)}, yopilganQarz: 1260.6, ixtiyoriyTopshirish: false, undiruvIshId: "UI-2025/0934"},
      qiymat: {bozor: 1480.0, tugatish: 1180.0, bahoSana: nisbiy(-180), baholovchi: "«Baholash Servis» MChJ"},
      maydon: {yer: 0, qurilishOsti: 0, foydali: 1850},
      huquq: {kadastrRaqami: "10:02:11:04:0934", qaydSana: nisbiy(-240), reyestrKochirma: "RK-2025/41220", yerHuquqiTuri: "Umumiy ulushli mulk"},
      kommunal: [
        kommunalQator("elektr", {holat: "ulangan", hisoblagich: "E-0934-12", korsatkich: 51284, korsatkichSana: nisbiy(-5), plomba: "P-TS8812", shaxsiyHisob: "7710-0934", avvalgiQarz: 0, qarzYoqligiMalumotnoma: true, shartnomaSana: nisbiy(-230), oylikXarajat: 2.4}),
        kommunalQator("gaz",    {holat: "mavjud emas"}),
        kommunalQator("suv",    {holat: "ulangan", hisoblagich: "S-0934-12", korsatkich: 1822, korsatkichSana: nisbiy(-5), shaxsiyHisob: "S-0934", avvalgiQarz: 0, shartnomaSana: nisbiy(-230), oylikXarajat: 0.4})
      ],
      himoya: {qoriqlashTuri: "post", qurilmaSoni: 0, andoza: "ajax"},
      sotuv: {holat: "tayyorlanmoqda", usul: "eauksion", qarorRaqami: "RQ-2026/131"},
      tarix: [
        {sana: nisbiy(-268), voqea: "Balansga qabul qilindi", izoh: "Takroriy savdo o'tkazilmagach, mulk bankda qoldirildi."},
        {sana: nisbiy(-240), voqea: "Huquq bank nomiga ro'yxatdan o'tkazildi", izoh: ""},
        {sana: nisbiy(-150), voqea: "Sotilguncha ijaraga berildi", izoh: "Shartnomada sotuvda bekor qilish sharti bor."}
      ]
    }),
    aktivQolip({
      id: "AK-2026/5512", nom: "Chevrolet Malibu (2023), 01 A 887 KA", qisqa: "Chevrolet Malibu (2023), oq",
      tur: "Transport vositasi", turKalit: "transport", rasmTuri: "avto", binoli: false,
      hudud: "Toshkent sh.", hududKod: "TS", hududToliq: "Toshkent sh., Mirobod", tuman: "Mirobod tumani",
      manzil: "Bank saqlash maydonchasi, Mirobod", joy: {lat: 41.2757, lng: 69.2518, aniq: true},
      filial: "Toshkent shahar BXO", filialKod: "TS-01", sobiqEga: "To'xtasinov Sherzod Rustamovich",
      tafsilot: "Chevrolet Malibu, 2023 yil, oq rang, 42 180 km",
      holat: "Balansda", bosqich: "baholash", masul: "Sattorov Javohir",
      balans: {sana: nisbiy(-58), qiymat: 168.0, hisobvaraq: "16701", qabulAsosi: "ixtiyoriy",
        asosHujjat: {raqam: "TK-2026/5512", sana: nisbiy(-60)}, yopilganQarz: 168.0, ixtiyoriyTopshirish: true, undiruvIshId: "UI-2026/5512"},
      qiymat: {bozor: 186.0, tugatish: 150.0, bahoSana: nisbiy(-50), baholovchi: "«Expert Baho» MChJ"},
      huquq: {davlatRaqami: "01 A 887 KA", vin: "XWBJF69V0PA012345", texPasport: "AAF 0412587", yhxxQaydSana: nisbiy(-51)},
      himoya: {qoriqlashTuri: "avtonom", qurilmaSoni: 0, andoza: "transport"},
      tarix: [
        {sana: nisbiy(-58), voqea: "Balansga qabul qilindi", izoh: "Sobiq egasi avtomobilni ixtiyoriy topshirdi."},
        {sana: nisbiy(-51), voqea: "YHXXda bank nomiga qayd etildi", izoh: "7 kun ichida."},
        {sana: nisbiy(-50), voqea: "Baholash hisoboti qabul qilindi", izoh: ""}
      ]
    }),
    aktivQolip({
      id: "AK-2025/3308", nom: "Nurafshon turar-joy majmuasi, 18-uy, 24-xonadon", qisqa: "Nurafshon majmuasi, 24-xonadon",
      tur: "Turar joy", turKalit: "turar", rasmTuri: "kopqavat", binoli: true,
      hudud: "Toshkent vil.", hududKod: "TV", hududToliq: "Toshkent vil., Nurafshon sh.", tuman: "Nurafshon shahri",
      manzil: "Nurafshon sh., Istiqlol ko'chasi, 21", joy: {lat: 41.0378, lng: 69.3567, aniq: true},
      filial: "Toshkent viloyat BXO", filialKod: "TV-01", sobiqEga: "Yusupova Nodira Alisherovna",
      holat: "Bo'lib to'lashda", bosqich: "shartnoma", masul: "Ismoilova Nilufar",
      balans: {sana: nisbiy(-290), qiymat: 312.4, hisobvaraq: "16701", qabulAsosi: "sud",
        asosHujjat: {raqam: "2-0908/2026", sana: nisbiy(-330)}, yopilganQarz: 312.4, ixtiyoriyTopshirish: false, undiruvIshId: "UI-2026/3308"},
      qiymat: {bozor: 395.0, tugatish: 316.0, bahoSana: nisbiy(-150), baholovchi: "«Baholash Servis» MChJ"},
      maydon: {yer: 0, qurilishOsti: 0, foydali: 96},
      huquq: {kadastrRaqami: "11:10:02:01:0018:0024", qaydSana: nisbiy(-250), reyestrKochirma: "RK-2025/52013", yerHuquqiTuri: "Umumiy ulushli mulk"},
      kommunal: [
        kommunalQator("elektr", {holat: "ulangan", hisoblagich: "E-3308-24", korsatkich: 6120, korsatkichSana: nisbiy(-15), avvalgiQarz: 0}),
        kommunalQator("gaz",    {holat: "ulangan", hisoblagich: "G-3308-24", korsatkich: 880, korsatkichSana: nisbiy(-15), avvalgiQarz: 0}),
        kommunalQator("suv",    {holat: "ulangan", hisoblagich: "S-3308-24", korsatkich: 140, korsatkichSana: nisbiy(-15), avvalgiQarz: 0})
      ],
      himoya: {qoriqlashTuri: "ichki", qurilmaSoni: 0, andoza: "reolink"},
      sotuv: {holat: "sotildi", usul: "bolib", qarorRaqami: "RQ-2026/097"},
      tarix: [
        {sana: nisbiy(-290), voqea: "Balansga qabul qilindi", izoh: ""},
        {sana: nisbiy(-150), voqea: "Qayta baholandi", izoh: ""},
        {sana: nisbiy(-64),  voqea: "Bo'lib to'lash shartnomasi tuzildi", izoh: "Avans 15%, qoldiq 24 oyda."}
      ]
    }),
    aktivQolip({
      id: "AK-2023/0755", nom: "Qibray tumani, parrandachilik majmuasi", qisqa: "Qibray parrandachilik majmuasi",
      tur: "Noturar bino", turKalit: "noturar", rasmTuri: "ferma", binoli: true,
      hudud: "Toshkent vil.", hududKod: "TV", hududToliq: "Toshkent vil., Qibray", tuman: "Qibray tumani",
      manzil: "Qibray tumani, Salor MFY", joy: {lat: 41.39, lng: 69.53, aniq: true},
      filial: "Toshkent viloyat BXO", filialKod: "TV-01", sobiqEga: "«Bo'ston Agro» fermer xo'jaligi",
      holat: "Davaktivga o'tkazilgan", bosqich: "sotuv", masul: "Tosheva Barno", konservatsiya: true,
      balans: {sana: nisbiy(-1120), qiymat: 890.0, hisobvaraq: "16701", qabulAsosi: "takroriy",
        asosHujjat: {raqam: "EA-2023/10233", sana: nisbiy(-1160)}, yopilganQarz: 890.0, ixtiyoriyTopshirish: false, undiruvIshId: "UI-2025/0755"},
      qiymat: {bozor: 1020.0, tugatish: 810.0, bahoSana: nisbiy(-400), baholovchi: "«Andoza Baho» MChJ"},
      maydon: {yer: 24000, qurilishOsti: 3200, foydali: 2900},
      huquq: {kadastrRaqami: "11:09:03:02:0012", qaydSana: nisbiy(-1080), reyestrKochirma: "RK-2023/19002", yerHuquqiTuri: "Doimiy foydalanish"},
      kommunal: [
        kommunalQator("elektr", {holat: "uzilgan", hisoblagich: "E-0755-01", korsatkich: 0, korsatkichSana: nisbiy(-1120), avvalgiQarz: 21.6}),
        kommunalQator("gaz",    {holat: "uzilgan", hisoblagich: "G-0755-01", korsatkich: 0, korsatkichSana: nisbiy(-1120)}),
        kommunalQator("suv",    {holat: "uzilgan"})
      ],
      himoya: {qoriqlashTuri: "mobil", qurilmaSoni: 0, andoza: "hikvision"},
      sotuv: {holat: "davaktiv", usul: "davaktiv", qarorRaqami: "RQ-2026/052"},
      tarix: [
        {sana: nisbiy(-1120), voqea: "Balansga qabul qilindi", izoh: ""},
        {sana: nisbiy(-700),  voqea: "Konservatsiya qilindi", izoh: "Suv tizimi bo'shatildi, tom tekshirildi."},
        {sana: nisbiy(-120),  voqea: "Davaktivga o'tkazildi", izoh: "12 oyda sotilmasa bankka qaytariladi."}
      ]
    }),
    aktivQolip({
      id: "AK-2026/0141", nom: "Chorvoq dala hovlisi", qisqa: "Chorvoq dala hovlisi",
      tur: "Turar joy", turKalit: "turar", rasmTuri: "uy", binoli: true,
      hudud: "Toshkent vil.", hududKod: "TV", hududToliq: "Toshkent vil., Bo'stonliq", tuman: "Bo'stonliq tumani",
      manzil: "Bo'stonliq tumani, Chorvoq qirg'og'i, 12", joy: {lat: 41.623, lng: 69.781, aniq: true},
      filial: "Toshkent viloyat BXO", filialKod: "TV-01", sobiqEga: "Rasulov Otabek Farhodovich",
      holat: "Balansda", bosqich: "qabul", masul: "Ismoilova Nilufar",
      balans: {sana: nisbiy(-34), qiymat: 38.6, hisobvaraq: "16701", qabulAsosi: "ixtiyoriy",
        asosHujjat: {raqam: "TK-2026/0141", sana: nisbiy(-36)}, yopilganQarz: 38.6, ixtiyoriyTopshirish: true, undiruvIshId: "UI-2026/0141"},
      qiymat: {bozor: null, baholanmagan: true},
      maydon: {yer: 850, qurilishOsti: 240, foydali: 210},
      kommunal: [
        kommunalQator("elektr", {holat: "ulangan", hisoblagich: "E-0141-01", korsatkich: 4410, korsatkichSana: nisbiy(-34), avvalgiQarz: 0.6}),
        kommunalQator("gaz",    {holat: "mavjud emas"}),
        kommunalQator("suv",    {holat: "uzilgan", hisoblagich: "S-0141-01", korsatkich: 88, korsatkichSana: nisbiy(-34)})
      ],
      himoya: {qoriqlashTuri: null, qurilmaSoni: 0, andoza: "hikvision"},
      tarix: [{sana: nisbiy(-34), voqea: "Balansga qabul qilindi", izoh: "Ixtiyoriy topshirish, birlamchi ko'rik tayinlandi."}]
    })
  ];
}

/* ============================================================
   9. Yozuvlar va reyestr
   ============================================================ */
const YOZUVLAR = MAH ? MAH.obyektlar.map(mahalliyAktiv) : asosiyAktivlar();

/* Filiallar: mahalliy rejimda obyektlar.json dagi 58 ta filial, namoyishda kengaytma to'ldiradi */
const FILIALLAR = MAH && Array.isArray(MAH.filiallar)
  ? MAH.filiallar.map(f => ({id: f.id, nom: f.nom, hudud: f.hudud, hududNomi: (HUDUD_KODLAR[f.hudud] || {}).nom || "", turi: f.turi}))
  : [];

/* Obyekt reyestri: boshqa to'plamlar obyektga faqat identifikator bilan murojaat qiladi,
   ko'rinadigan nom shu yerdan olinadi (bir obyekt ikki sahifada ikki xil atalmaydi). */
const OBYEKT_INDEKS = {};
function reyestrgaQosh(o, manba) {
  OBYEKT_INDEKS[o.id] = {
    id: o.id, nom: o.nom, qisqa: o.qisqa || o.nom, tur: o.tur, turKalit: o.turKalit, rasmTuri: o.rasmTuri,
    hudud: o.hudud || "", hududToliq: o.hududToliq || o.hudud || "", manzil: o.manzil || "",
    filial: o.filial || "", filialKod: o.filialKod || null,
    rasm: o.rasm || "", rasmKichik: o.rasmKichik || o.rasm || "",
    balansQiymat: o.balans ? o.balans.qiymat : (o.balansQiymat != null ? o.balansQiymat : null),
    bozor: o.qiymat ? o.qiymat.bozor : null,
    maydon: o.maydon ? maydonMatn(o) : "",
    manba: manba
  };
}
YOZUVLAR.forEach(y => reyestrgaQosh(y, "balans"));
function obyekt(id) { return OBYEKT_INDEKS[id] || null; }
function obyektNomi(id, qisqami) {
  const o = OBYEKT_INDEKS[id];
  if (!o) return "?" + id;
  return qisqami ? o.qisqa : o.nom;
}
function obyektHududi(id, toliqmi) {
  const o = OBYEKT_INDEKS[id];
  if (!o) return "?" + id;
  return toliqmi ? o.hududToliq : o.hudud;
}
function joyNomi(id, ichki, ajratgich) {
  const q = obyektNomi(id, true);
  return ichki ? q + (ajratgich || ", ") + ichki : q;
}

/* ============================================================
   10. Namoyish: qo'lda yozilgan hodisalar va vazifalar (asosiy aktivlar bo'yicha)
   ============================================================ */
/* Namoyish ma'lumotining holat vaqti: bugun 09:00 (malumot-kirish.js dagi HOZIR bilan bir xil).
   Bugungi yozuv shu vaqtdan keyin tushmaydi: kechroq soat berilsa, holat vaqtidan oldingi daqiqaga suriladi. */
const HOLAT_VAQTI = new Date(BUGUN.getFullYear(), BUGUN.getMonth(), BUGUN.getDate(), 9, 0);
const vaqtNisbiy = (kun, soat, daq) => {
  const d = kunQosh(BUGUN, kun); d.setHours(soat, daq || 0);
  if (d > HOLAT_VAQTI) return vaqtYoz(new Date(HOLAT_VAQTI.getTime() - (10 + (soat * 60 + (daq || 0)) % 170) * 60e3));
  return vaqtYoz(d);
};
const HODISALAR = MAH ? [] : [
  {id: "GH-2026-00214", kod: "#GH-2026-00214", obyektId: "AK-2026/0141", rang: "#E0442B",
   hodisa: "Yerto'lani suv bosgan", vaqt: vaqtNisbiy(0, 9, 12), jiddiylik: "yuqori", ustun: "yangi", holat: "Yangi", manba: "korik",
   tavsif: "Ko'rikda yerto'lada suv to'planib qolgani aniqlandi. Suv sathi 12 sm. Poydevorga ta'siri baholanadi, sug'urta kompaniyasiga xabarnoma tayyorlanadi.",
   masul: "Karimova Feruza", bolim: "Aktivlar nazorati bo'limi", iibAriza: null},
  {id: "GH-2026-00213", kod: "#GH-2026-00213", obyektId: "AK-2025/1187", rang: "#4338CA",
   hodisa: "Inventar ro'yxatida kamomad", vaqt: vaqtNisbiy(0, 8, 52), jiddiylik: "yuqori", ustun: "yangi", holat: "Yangi", manba: "korik",
   tavsif: "Rejali ko'rikda inventar ro'yxatidagi 2 ta to'quv dastgohi joyida topilmadi. Xavfsizlik xizmati politsiyaga ariza berdi.",
   masul: "Karimova Feruza", bolim: "Aktivlar nazorati bo'limi", iibAriza: {raqam: "IIB-SA-2026/3312", sana: nisbiy(0)}},
  {id: "GH-2026-00211", kod: "#GH-2026-00211", obyektId: "AK-2025/0934", rang: "#F2994A",
   hodisa: "Sug'urta polisi muddati o'tgan", vaqt: vaqtNisbiy(-1, 13, 48), jiddiylik: "o'rta", ustun: "tekshirilmoqda", holat: "Tekshirilmoqda", manba: "qo'lda",
   tavsif: "Mulk sug'urtasi polisi tugagan, yangi polis rasmiylashtirilmagan. Ijaradagi obyekt qamrovsiz qolgan.",
   masul: "Tosheva Barno", bolim: "Muammoli aktivlar bo'limi", iibAriza: null},
  {id: "GH-2026-00209", kod: "#GH-2026-00209", obyektId: "AK-2026/5512", rang: "#8B5CF6",
   hodisa: "GPS-treker saqlash maydonidan chiqishni qayd etdi", vaqt: vaqtNisbiy(-2, 22, 33), jiddiylik: "yuqori", ustun: "bartaraf", holat: "Bartaraf etilmoqda", manba: "qurilma",
   tavsif: "Avtomobil 23:10 da maydon chegarasidan 40 metr chiqdi va qaytdi. Qo'riqchi evakuator haydovchisi manevr qilganini tasdiqladi. Video yozuv so'raldi.",
   masul: "Sattorov Javohir", bolim: "Xavfsizlik xizmati", iibAriza: null},
  {id: "GH-2026-00206", kod: "#GH-2026-00206", obyektId: "AK-2023/0755", rang: "#F2C230",
   hodisa: "Hududga ruxsatsiz kirish", vaqt: vaqtNisbiy(-3, 3, 5), jiddiylik: "yuqori", ustun: "tekshirilmoqda", holat: "Tekshirilmoqda", manba: "qo'lda",
   tavsif: "Qo'riqchi tungi soat 03:05 da hududda ikki kishini ko'rdi va xabar berdi. Mobil guruh 18 daqiqada yetib keldi, shaxslar ketib qolgan. Darvoza qulfi kesilgan.",
   masul: "Sattorov Javohir", bolim: "Xavfsizlik xizmati", iibAriza: {raqam: "IIB-TV-2026/1905", sana: nisbiy(-3)}},
  {id: "GH-2026-00204", kod: "#GH-2026-00204", obyektId: "AK-2026/4471", rang: "#F2C230",
   hodisa: "Gaz bo'yicha avvalgi egasidan qolgan qarz", vaqt: vaqtNisbiy(-4, 11, 17), jiddiylik: "past", ustun: "bartaraf", holat: "Bartaraf etilmoqda", manba: "qo'lda",
   tavsif: "Gaz shaxsiy hisobida 1,9 mln so'm qarz qolgan. Qayta ulash uchun qarz yo'qligi haqidagi ma'lumotnoma kerak. Masala yurist bilan hal qilinmoqda.",
   masul: "Ismoilova Nilufar", bolim: "Muammoli aktivlar bo'limi", iibAriza: null},
  {id: "GH-2026-00198", kod: "#GH-2026-00198", obyektId: "AK-2025/3308", rang: "#059669",
   hodisa: "Xaridorga kalitlar topshirildi", vaqt: vaqtNisbiy(-6, 16, 23), jiddiylik: "past", ustun: "yopildi", holat: "Yopildi", manba: "qo'lda",
   tavsif: "Bo'lib to'lash shartnomasi bo'yicha xonadon xaridorga topshirildi. Hisoblagich ko'rsatkichlari dalolatnomaga yozildi.",
   masul: "Ismoilova Nilufar", bolim: "Muammoli aktivlar bo'limi", iibAriza: null},
  {id: "GH-2026-00195", kod: "#GH-2026-00195", obyektId: "AK-2026/2210", rang: "#059669",
   hodisa: "Birlamchi ko'rik o'tkazildi", vaqt: vaqtNisbiy(-8, 10, 8), jiddiylik: "past", ustun: "yopildi", holat: "Yopildi", manba: "korik",
   tavsif: "Xonadon yashash holatida, ta'mir talab qilinmaydi. Dalolatnoma imzolandi, keyingi ko'rik 90 kundan keyin.",
   masul: "Karimova Feruza", bolim: "Aktivlar nazorati bo'limi", iibAriza: null}
];
HODISALAR.forEach(h => {
  h.bino = obyektNomi(h.obyektId, true);
  h.joy = obyektHududi(h.obyektId, true);
  h.sarlavha = h.bino + " — " + h.hodisa;
});

/* ============================================================
   11. Foydalanuvchilar va hisobot ta'riflari
   Rollar: yadro/app.js dagi ROL_KALIT bilan bir xil nomlar.
   FOYDLAR — namoyish hisoblari (namoyish: true): ism va rol shartli, bank xodimlari emas.
   Telefon va elektron pochta yozilmagan, boshqaruv darajasidagi lavozim berilmaydi.
   Mahalliy rejimda ham shu hisoblar kirish uchun qoladi: sarlavha va ro'yxatda "Namoyish hisobi" belgisi chiqadi.
   ============================================================ */
const FOYDLAR = [
  {id: "U056789011", nom: "Ismoilov Otabek",     rol: "Administrator",                   teg: "admin",       login: "o.ismoilov",  bolim: "Axborot texnologiyalari departamenti", filialKod: null, faol: true, email: "", lavozim: "Tizim ma'muri", tel: "", sana: "04.01.2021", namoyish: true, rasm: "assets/xodim_1.webp"},
  {id: "U056789021", nom: "Rahmonov Anvar",      rol: "Rahbariyat",                      teg: "rahbariyat",  login: "a.rahmonov",  bolim: "Boshqaruv apparati", filialKod: null, faol: true, email: "", lavozim: "Rahbariyat vakili", tel: "", sana: "12.02.2020", namoyish: true, rasm: "assets/xodim_2.webp"},
  {id: "U056789012", nom: "Yo'ldoshev Alisher",  rol: "Rahbariyat",                      teg: "rahbariyat",  login: "a.yoldoshev", bolim: "Yunusobod BXM", filialKod: "TS-02", faol: true, email: "", lavozim: "Filial boshqaruvchisi", tel: "", sana: "04.03.2022", namoyish: true, rasm: "assets/xodim_2.webp"},
  {id: "U056789013", nom: "Ismoilova Nilufar",   rol: "Obyekt menejeri",                 teg: "obyekt",      login: "n.ismoilova", bolim: "Muammoli aktivlar bo'limi", filialKod: null, faol: true, email: "", lavozim: "Katta mutaxassis", tel: "", sana: "07.05.2023", namoyish: true, rasm: "assets/xodim_3.webp"},
  {id: "U056789014", nom: "Sattorov Javohir",    rol: "Ko'rik va xavfsizlik inspektori", teg: "nazorat",     login: "j.sattorov",  bolim: "Aktivlar nazorati bo'limi", filialKod: null, faol: true, email: "", lavozim: "Ko'rik inspektori", tel: "", sana: "10.07.2024", namoyish: true, rasm: "assets/xodim_4.webp"},
  {id: "U056789015", nom: "Karimova Feruza",     rol: "Ko'rik va xavfsizlik inspektori", teg: "nazorat",     login: "f.karimova",  bolim: "Aktivlar nazorati bo'limi", filialKod: null, faol: true, email: "", lavozim: "Yetakchi inspektor", tel: "", sana: "13.09.2025", namoyish: true, rasm: "assets/xodim_5.webp"},
  {id: "U056789016", nom: "Nazarov Aziz",        rol: "Obyekt menejeri",                 teg: "obyekt",      login: "a.nazarov",   bolim: "Baholash bo'limi", filialKod: null, faol: true, email: "", lavozim: "Baholovchi", tel: "", sana: "16.11.2021", namoyish: true, rasm: "assets/xodim_6.webp"},
  {id: "U056789022", nom: "Qosimova Dilnoza",    rol: "Obyekt menejeri",                 teg: "obyekt",      login: "d.qosimova", bolim: "Realizatsiya bo'limi", filialKod: null, faol: true, email: "", lavozim: "Realizatsiya bo'yicha bosh mutaxassis", tel: "", sana: "01.06.2022", namoyish: true, rasm: "assets/xodim_8.webp"},
  {id: "U056789017", nom: "Sobirov Ulug'bek",    rol: "Obyekt menejeri",                 teg: "obyekt",      login: "u.sobirov",   bolim: "Yuridik departament", filialKod: null, faol: true, email: "", lavozim: "Bosh yurist", tel: "", sana: "19.01.2022", namoyish: true, rasm: "assets/xodim_7.webp"},
  {id: "U056789023", nom: "Xolmatova Zulfiya",   rol: "Buxgalteriya va risk",            teg: "buxgalteriya", login: "z.xolmatova", bolim: "Buxgalteriya va risk-menejment", filialKod: null, faol: true, email: "", lavozim: "Risk menejeri", tel: "", sana: "15.03.2021", namoyish: true, rasm: "assets/xodim_10.webp"},
  {id: "U056789024", nom: "Qurbonov Sherzod",    rol: "Ko'rik va xavfsizlik inspektori", teg: "nazorat",     login: "sh.qurbonov", bolim: "Xavfsizlik xizmati", filialKod: null, faol: true, email: "", lavozim: "Xavfsizlik bo'yicha mutaxassis", tel: "", sana: "20.08.2023", namoyish: true, rasm: "assets/xodim_9.webp"},
  {id: "U056789018", nom: "Tosheva Barno",       rol: "Obyekt menejeri",                 teg: "obyekt",      login: "b.tosheva",   bolim: "Muammoli aktivlar bo'limi", filialKod: null, faol: true, email: "", lavozim: "Mutaxassis", tel: "", sana: "22.03.2023", namoyish: true, rasm: "assets/xodim_8.webp"},
  {id: "U056789019", nom: "Ergashev Botir",      rol: "Rahbariyat",                      teg: "rahbariyat",  login: "b.ergashev",  bolim: "Chilonzor BXM", filialKod: "TS-03", faol: true, email: "", lavozim: "Filial boshqaruvchisi", tel: "", sana: "25.05.2024", namoyish: true, rasm: "assets/xodim_9.webp"},
  {id: "U056789020", nom: "Xolmatova Sevara",    rol: "Obyekt menejeri",                 teg: "obyekt",      login: "s.xolmatova", bolim: "Baholash bo'limi", filialKod: null, faol: false, email: "", lavozim: "Katta baholovchi", tel: "", sana: "28.07.2025", namoyish: true, rasm: "assets/xodim_10.webp"}
];

/* Hisobot ta'riflari: raqamlar sahifada joriy ma'lumotdan hisoblanadi */
const HISOBOTLAR = [
  {id: "portfel",      nom: "Oylik portfel hisoboti",        sub: "Balansdagi aktivlar, holat va muddatlar kesimi", format: "PDF",  tur: "portfel"},
  {id: "muddat",       nom: "Me'yoriy muddatlar",            sub: "6 oy, 1 yil va 3 yil chegaralari", format: "XLSX", tur: "muddat"},
  {id: "zaxira",       nom: "Tasnif va zaxira",              sub: "Toifalar, zaxira yuki va oylik migratsiya", format: "XLSX", tur: "zaxira"},
  {id: "mb",           nom: "Markaziy bank uchun oylik hisobot", sub: "MB 3441, 16-band: har oyning 10-sanasigacha", format: "XLSX", tur: "mb"},
  {id: "realizatsiya", nom: "Realizatsiya",                  sub: "Lotlar, takliflar, shartnomalar va tushum", format: "PDF",  tur: "realizatsiya"},
  {id: "xarajat",      nom: "Saqlash xarajatlari",           sub: "Toifa, filial va obyekt kesimi", format: "XLSX", tur: "xarajat"},
  {id: "nazorat",      nom: "Aktivlar nazorati",             sub: "Ko'riklar, sug'urta, baholash va himoya", format: "PDF",  tur: "nazorat"},
  {id: "undiruv",      nom: "Undiruv va sud ishlari",        sub: "Faol ishlar, bosqichlar va sud majlislari", format: "XLSX", tur: "undiruv"}
];

/* ============================================================
   12. Moslik tekshiruvi
   ============================================================ */
function moslikTekshiruvi() {
  const D = W.MKB_DATA || {};
  const xato = [];
  const YOZ = D.YOZUVLAR || YOZUVLAR;
  const holatNomlari = HOLATLAR.map(h => h.nom);
  const bosqichKalit = BOSQICHLAR.map(b => b.kalit);
  const turKalit = TUR_KALITLAR.map(t => t.kalit);
  YOZ.forEach(y => {
    if (!y.id) xato.push("identifikatorsiz yozuv");
    if (!sanaOqi(y.balans && y.balans.sana)) xato.push(y.id + ": balans sanasi yo'q yoki o'qilmaydi");
    if (!(y.balans && y.balans.qiymat > 0)) xato.push(y.id + ": balans qiymati noto'g'ri");
    if (holatNomlari.indexOf(y.holat) < 0) xato.push(y.id + ": noma'lum holat " + y.holat);
    if (bosqichKalit.indexOf(y.bosqich) < 0) xato.push(y.id + ": noma'lum bosqich " + y.bosqich);
    if (turKalit.indexOf(y.rasmTuri) < 0) xato.push(y.id + ": noma'lum rasm turi " + y.rasmTuri);
    if (y.qiymat && y.qiymat.baholanmagan !== (y.qiymat.bozor == null)) xato.push(y.id + ": baholanmagan belgisi bozor qiymatiga mos emas");
    if (!binolimi(y) && ((y.maydon && (y.maydon.foydali || y.maydon.yer)) || (y.kommunal || []).length))
      xato.push(y.id + ": binosiz aktivda maydon yoki kommunal bor");
    if (y.rasm && !/^(mahalliy\/|fayllar\/|api\/|\/api\/|data:image|blob:|https?:)/.test(y.rasm)) xato.push(y.id + ": surat manzili haqiqiy surat emas");
  });
  const idlar = new Set();
  YOZ.forEach(y => { if (idlar.has(y.id)) xato.push(y.id + ": takrorlangan identifikator"); idlar.add(y.id); });

  /* Havolalar butunligi */
  const INDEKS = D.OBYEKT_INDEKS || OBYEKT_INDEKS;
  ["HODISALAR", "HUJJATLAR", "KORIKLAR", "SUGURTALAR", "BAHOLASHLAR", "TASDIQLAR", "XARAJATLAR", "LOTLAR", "TAKLIFLAR",
   "SHARTNOMALAR", "IJARA", "QORIQLASH", "KOMMUNAL_ARIZALAR", "INVENTAR", "SOLIQ", "QURILMALAR", "KIRISH_NUQTALARI"].forEach(k => {
    (D[k] || []).forEach(r => {
      if (r.obyektId && !INDEKS[r.obyektId])
        xato.push(k + " / " + (r.id || r.nom) + ": obyekt havolasi uzilgan (" + r.obyektId + ")");
    });
  });
  const ishlar = new Set((D.UNDIRUV_ISHLAR || []).map(i => i.id));
  ["SUD_MAJLISLAR", "RESTRUKTURIZATSIYA", "MULOQOTLAR"].forEach(k => (D[k] || []).forEach(r => {
    if (!ishlar.has(r.ishId)) xato.push(k + " / " + r.id + ": undiruv ishi topilmadi (" + r.ishId + ")");
  }));

  /* E-auksion: e'londan savdogacha kamida 30 kun (VM 18, 22-band) */
  (D.LOTLAR || []).forEach(l => {
    if (l.elonSana && l.savdoSana && kunFarqi(l.elonSana, l.savdoSana) < param("elonMinKun"))
      xato.push(l.id + ": e'londan savdogacha " + param("elonMinKun") + " kundan kam");
  });
  /* Sana izchilligi: bank mulkni balansga olgunicha sotmaydi, boshlang'ich narx e'londan oldingi baholashdan olinadi */
  const aktivi = id => YOZ.find(y => y.id === id);
  (D.LOTLAR || []).forEach(l => {
    const y = aktivi(l.obyektId), e = sanaOqi(l.elonSana);
    if (!y || !e) return;
    if (e < sanaOqi(y.balans.sana)) xato.push(l.id + ": e'lon aktiv balansga olinishidan oldin");
    const baho = y.qiymat && sanaOqi(y.qiymat.bahoSana);
    if (baho && l.boshlangichNarx === y.qiymat.bozor && e < baho) xato.push(l.id + ": e'lon boshlang'ich narxni bergan baholashdan oldin");
    if (l.savdoSana && !ishKunimi(l.savdoSana)) xato.push(l.id + ": savdo kuni ish kuni emas");
  });
  (D.SHARTNOMALAR || []).forEach(s => {
    const y = aktivi(s.obyektId);
    if (y && sanaOqi(s.sana) < sanaOqi(y.balans.sana)) xato.push(s.id + ": shartnoma aktiv balansga olinishidan oldin");
  });
  (D.SUD_MAJLISLAR || []).forEach(m => { if (m.sana && !ishKunimi(m.sana)) xato.push(m.id + ": sud majlisi ish kunida emas"); });
  /* Bank xodimi balansdagi mulkning sobiq egasi sifatida ko'rinmaydi */
  const xodimlar = new Set((D.FOYDLAR || []).map(f => f.nom));
  YOZ.forEach(y => { if (y.sobiqEga && xodimlar.has(y.sobiqEga)) xato.push(y.id + ": sobiq egasi bank xodimi bilan bir xil"); });
  /* Ijaradagi binoning kommunali to'liq uzilgan bo'lmaydi (kommunalni ijarachi to'laydi) */
  YOZ.forEach(y => {
    if (y.holat === "Ijarada" && (y.kommunal || []).length && (y.kommunal || []).every(k => k.holat !== "ulangan"))
      xato.push(y.id + ": ijaradagi binoda birorta kommunal xizmat ulanmagan");
  });
  /* Shartnoma jadvali: avans + jadval = narx */
  (D.SHARTNOMALAR || []).forEach(s => {
    const jami = (s.avans || 0) + (s.jadval || []).reduce((a, q) => a + (q.summa || 0), 0);
    if (s.jadval && s.jadval.length && Math.abs(jami - s.narx) > 0.5) xato.push(s.id + ": to'lov jadvali narxga teng emas");
  });
  /* Arxiv: iqtisodiy natija = sotuv narxi - balans qiymati - jami xarajat */
  (D.ARXIV || []).forEach(a => {
    if (a.sotuvNarxi == null || a.balansQiymat == null) { xato.push(a.id + ": arxiv yozuvida sotuv yoki balans qiymati yo'q"); return; }
    if (Math.abs(a.foydaZarar - (a.sotuvNarxi - a.balansQiymat - (a.jamiXarajat || 0))) > 0.2)
      xato.push(a.id + ": foyda yoki zarar hisobi mos emas");
  });
  /* Hududlar kesimi reyestrni to'liq qoplaydi */
  if (D.HUDUDLAR) {
    const hJami = D.HUDUDLAR.reduce((a, h) => a + (+h[1]), 0);
    if (hJami !== YOZ.length) xato.push("hududlar bo'yicha " + hJami + " obyekt, reyestrda " + YOZ.length);
  }
  return xato;
}

/* ============================================================
   13. Eksport
   ============================================================ */
tayyorlovchiRoyxat(YOZUVLAR);

W.MKB_DATA = {
  MANBA, BUGUN, BUGUN_QOTIRILGAN: QOTIRILGAN, HOZIR: HOLAT_VAQTI,
  /* sana */
  bugun, sanaOqi, sanaYoz, vaqtYoz, kunQosh, oyQosh, kunFarqi, ishKunimi, ishKuniQosh, bayramKunlari, OY_QISQA,
  sana: {oqi: sanaOqi, yoz: sanaYoz, vaqt: vaqtYoz, kunQosh, oyQosh, kunFarqi, ishKunimi, ishKuni: ishKuniQosh, bugun},
  /* format */
  pul, son, fmt, yaxlit,
  /* ma'lumotnomalar */
  HOLATLAR, holatInfo, BOSQICHLAR, bosqichInfo, HOLAT_BOSQICH, UNDIRUV_BOSQICHLAR, QABUL_ASOSLARI, qabulAsosiInfo,
  ASOSIY_TURLAR, TUR_KALITLAR, turInfo, binolimi, SOTISH_USULLARI, LOT_HOLATLARI, XARAJAT_TOIFALARI,
  QORIQLASH_TURLARI, KOMMUNAL_XIZMATLAR, KOMMUNAL_HOLATLAR, MUDDAT_HOLATLARI, ZAXIRA_TOIFALARI,
  PARAMETRLAR, param, BAYRAMLAR, HUDUD_KODLAR, hududKodi, HUDUD_TOIFA, hududToifasi,
  MAJBURIY_HUJJATLAR, majburiyHujjatlar, SXEMA, QOSHIMCHA_MAYDONLAR, INTEGRATSIYALAR, INTEGRATSIYA_HOLATLARI,
  QURILMA_TURLARI, QUVVAT_MANBALARI, ALOQA_KANALLARI, QURILMA_KATALOG, katalog, HIMOYA_ANDOZALARI, himoyaAndozasi, himoyaAndozaTavsiyasi, himoyaSmetasi,
  /* aktiv hosilalari */
  muddatHisobi, zaxiraToifasi, zaxiraHisobi, soliqHisobi, chegaraKuni, maydonMatn, mulkKorinish, aktivTayyorla, aktivQolip, kommunalQator,
  /* yozuvlar */
  YOZUVLAR, FILIALLAR, OBYEKT_INDEKS, reyestrgaQosh, obyekt, obyektNomi, obyektHududi, joyNomi,
  HODISALAR, FOYDLAR, HISOBOTLAR,
  moslikTekshiruvi,
  topish: id => (W.MKB_DATA.YOZUVLAR || YOZUVLAR).find(y => y.id === id) || null,
  /* ichki: kengaytma va boshqa fayllar uchun */
  __nisbiy: nisbiy, __vaqtNisbiy: vaqtNisbiy
};
})();
