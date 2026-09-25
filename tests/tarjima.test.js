"use strict";
/* ============================================================
   Ruscha interfeys uchun lug'at va qoidalar tekshiruvi. Brauzer
   kerak emas, faqat node. Ildizdan ishga tushiriladi:

       node tests/tarjima.test.js

   Nima tekshiriladi:
   1) Bitta matn tugunida yig'iladigan "Sarlavha: qiymat" xabarlari
      to'liq o'giriladimi. tarjimaQil butun tugunni kalit sifatida
      qidiradi, shuning uchun lug'atdagi "Sarlavha:" kalitining o'zi
      bunday xabarni o'girmaydi — unga alohida {} qoidasi kerak.
   2) Lug'atda ikki nuqta bilan tugagan har bir kalit kod ichida
      "Sarlavha: " + qiymat ko'rinishida ishlatilsa, unga mos qoida
      bormi. Bo'lmasa, ruscha interfeysda sarlavha o'zbekcha qoladi.

   Sahifadagi matn tugunlarini brauzerda tekshiradigan sinov alohida:
   node tests/tarjima.mjs
   ============================================================ */

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const ILDIZ = path.join(__dirname, "..");

/* ---------- Lug'at va qoidalarni yuklash ---------- */
/* app.js dagi tarjima bloklari sahifada ham qo'shiladi, shuning uchun bu yerda ham qo'shiladi:
   ular top-level (function(){ ... })(); bloklari va lug'at yoki qoidalar ro'yxatiga tegadi. */
function appTarjimaBloklari(){
  const satr = fs.readFileSync(path.join(ILDIZ, "yadro", "app.js"), "utf8").split(/\r?\n/);
  const bloklar = [];
  for (let i = 0; i < satr.length; i++){
    if (satr[i] !== "(function(){") continue;
    const oxir = satr.indexOf("})();", i);
    if (oxir < 0) continue;
    const blok = satr.slice(i, oxir + 1).join("\n");
    if (/MKB_TARJIMA_QOIDALARI|MKB_LUGAT/.test(blok)) bloklar.push(blok);
    i = oxir;
  }
  return bloklar;
}

const oyna = {};
const qobiq = vm.createContext({window: oyna, console});
qobiq.globalThis = qobiq;
vm.runInContext("var window = globalThis.window;\n" + fs.readFileSync(path.join(ILDIZ, "tarjima.js"), "utf8"), qobiq, {filename: "tarjima.js"});
appTarjimaBloklari().forEach((b, i) => vm.runInContext(b, qobiq, {filename: "app.js#tarjima" + i}));

const LUGAT = oyna.MKB_LUGAT || {};
const QOIDALAR = oyna.MKB_TARJIMA_QOIDALARI || [];
const birXil = m => String(m).replace(/[’ʼʻ`´]/g, "'");

/* yadro/app.js dagi tarjimaQil bilan bir xil tartib: lug'at, keyin qoidalar */
function tarjima(matn){
  const k = String(matn).trim();
  let t = LUGAT[k] != null ? LUGAT[k] : LUGAT[birXil(k)];
  if (t == null){
    for (const [q, alm] of QOIDALAR){ if (q.test(k)){ t = k.replace(q, alm); break; } }
  }
  return t == null ? k : t;
}

/* ---------- Tekshiriladigan fayllar ---------- */
const OTKAZ = new Set(["mahalliy", "taqdimot", "node_modules", ".git", "assets", "server", "v8", "vositalar", "tests", "docs"]);
function fayllar(katalog, yigma){
  yigma = yigma || [];
  for (const e of fs.readdirSync(katalog, {withFileTypes: true})){
    if (e.isDirectory()){ if (!OTKAZ.has(e.name)) fayllar(path.join(katalog, e.name), yigma); continue; }
    if (!/\.(html|js)$/.test(e.name)) continue;
    if (/^taqdimot/.test(e.name) || /^_/.test(e.name) || e.name === "tarjima.js") continue;
    yigma.push(path.join(katalog, e.name));
  }
  return yigma;
}
const MATNLAR = fayllar(ILDIZ).map(f => [path.relative(ILDIZ, f).replace(/\\/g, "/"), fs.readFileSync(f, "utf8")]);

/* ---------- 1. Yig'ma xabarlar ---------- */
/* Har bir satr: kodda haqiqatan yig'iladigan xabar va uning manbasi. */
const XABARLAR = [
  ["yadro/amal.js", "Bu obyekt uchun faol lot bor: LT-2026/0166"],
  ["yadro/amal.js", "Bu taklif bo'yicha shartnoma bor: SH-2026/0105"],
  ["yadro/amal.js", "Bu masala bo'yicha qaror kutilmoqda: TS-2026/0045"],
  ["yadro/amal.js", "Qaror turi noto'g'ri: taklif"],
  ["yadro/amal.js", "Baholash hisoboti topilmadi: BH-2026/0301"],
  ["yadro/amal.js", "Qaror asosida: Karimov Aziz"],
  ["yadro/amal.js", "Taklif TK-2026/0031 tasdiqlandi. Xaridor: Alfa Savdo MChJ, 412,5 mln so'm"],
  ["yadro/api.js", "O'chirilgan yozuv topilmadi: AK-2026/4471"],
  ["yadro/app.js", "Sana qotirilgan: 21.09.2026. Haqiqiy sanaga qaytish"],
  ["qabul-boshlash.html", "Bu ish bo'yicha obyekt allaqachon balansga olingan: AK-2026/4471"],
  ["qabul-boshlash.html", "Undiruv ishi topilmadi: UN-2026/0011"],
  ["qabul-tasdiqlash.html", "Bu raqamli dalolatnoma tizimda bor: QD-2026/0044"],
  ["qabul-hujjatlar.html", "Aniqlik: 12 m"],
  ["qabul-hujjatlar.html", "Hujjat olib tashlandi: Baholash hisoboti"],
  ["qabul-hujjatlar.html", "Jihoz olib tashlandi: Konditsioner"],
  ["ruxsatlar.html", "Muddati o'tgan ruxsatlar yopildi: 3"],
  ["undiruv.html", "Ish ochildi: Karimov A."],
  ["obyekt-tarix.html", "G'olib aniqlandi: Qosimova Dilnoza"],
  ["obyekt-moliya.html", "Joriy chorak bo'yicha hisob: 12,4 mln so'm"],
  ["malumot-kengaytma.js", "Avvalgi egasidan qolgan qarz: 12,4 mln so'm"],
  ["korik-tayinlash.html", "Ko'chirildi: 12.10.2026 → 19.10.2026. Inspektor boshqa obyektda"],
  ["hodisa.html", "Hodisa bo'yicha chora ko'rish: Buzib kirish"],
  ["tashrif-chiqish.html", "Rasmiylashtirdi: Karimov A."],
  ["tashrif-chiqish.html", "Bandlar: Eshik buzilgan; Kamera ishlamaydi"],
  ["vazifalar.html", "Vazifa o'chirilmadi: yozuv topilmadi"],
];

/* ---------- 2. Lug'atdagi ikki nuqtali kalitlar ---------- */
/* Shakli o'zgacha xabarlar uchun haqiqiy davomi. Qolganlariga oddiy hujjat raqami qo'yiladi. */
const DAVOMI = {
  "Ko'chirildi:": "12.10.2026 → 19.10.2026. Inspektor boshqa obyektda",
  "Muddati o'tgan ruxsatlar yopildi:": "3",
  "Sana qotirilgan:": "21.09.2026. Haqiqiy sanaga qaytish",
  "Aniqlik:": "12 m",
  "Bildirishnomalar:": "3 ta o'qilmagan",
  "Jami:": "12 ta yozuv",
  "Topshirilgan kalitlar:": "4 dona",
};
const NAMUNA = "AK-2026/4471";
const qochir = s => s.replace(/[.*+?^$(){}|[\]\\]/g, "\\$&");

function tekshir(shart, xabar){ if (!shart) throw new Error(xabar); }
const SINOVLAR = [];
function sinov(nom, fn){ SINOVLAR.push({nom, fn}); }

sinov("yig'ma \"sarlavha: qiymat\" xabarlari ruschaga o'giriladi", () => {
  const xato = [];
  XABARLAR.forEach(([manba, uz]) => {
    const ru = tarjima(uz);
    const bosh = uz.split(": ")[0];
    if (ru === uz || ru.indexOf(bosh) >= 0) xato.push(manba + " — " + uz + "  =>  " + ru);
  });
  tekshir(xato.length === 0, "o'zbekcha qolgan xabar (" + xato.length + "):\n  " + xato.join("\n  "));
});

sinov("konkatenatsiyada ishlatiladigan ikki nuqtali kalitga qoida bor", () => {
  const xato = [];
  Object.keys(LUGAT).filter(k => /:$/.test(k) && k.length < 90).forEach(k => {
    /* faqat "Sarlavha: " + qiymat ko'rinishi: bo'sh joysiz "kalit:" saqlash kaliti hisoblanmaydi */
    const rx = new RegExp(qochir(k) + " (?:\"|') ?\\+");
    const joylar = [];
    MATNLAR.forEach(([f, t]) => {
      if (t.indexOf(k) < 0) return;
      t.split(/\r?\n/).forEach((satr, i) => { if (rx.test(satr)) joylar.push(f + ":" + (i + 1)); });
    });
    if (!joylar.length) return;
    const uz = k + " " + (DAVOMI[k] || NAMUNA);
    const ru = tarjima(uz);
    if (ru.indexOf(k.slice(0, -1)) >= 0) xato.push(k + " (" + joylar.slice(0, 2).join(", ") + ")  =>  " + ru);
  });
  tekshir(xato.length === 0, "{} qoidasi yo'q kalit (" + xato.length + "):\n  " + xato.join("\n  "));
});

/* ---------- 3. Obyekt ro'yxati: "nom · kod · holat" ---------- */
/* Ijara, lot va taklif oynalaridagi obyekt ro'yxati shu ko'rinishda quriladi.
   Qoida faqat holatni o'girsa, ruscha ro'yxatda nom o'zbekcha qolib ketadi. */
sinov("obyekt ro'yxatida nom ham, holat ham ruschaga o'giriladi", () => {
  const xato = [];
  [
    ["Biznes markaz binosi · AK-2026/4552 · Balansda", "Biznes markaz binosi"],
    ["Boshqaruv binosi · AK-2026/3923 · Balansda", "Boshqaruv binosi"],
    ["Choyxona va do'kon binosi · AK-2026/1111 · Balansda", "Choyxona va do'kon binosi"],
    ["Bir qavatli turar joy · AK-2025/1407 · Sud qarori", "Bir qavatli turar joy"],
  ].forEach(([uz, nom]) => {
    const ru = tarjima(uz);
    if (ru.indexOf(nom) >= 0) xato.push("nom o'zbekcha: " + uz + "  =>  " + ru);
    if (/Balansda|Sud qarori/.test(ru)) xato.push("holat o'zbekcha: " + uz + "  =>  " + ru);
    if (ru.indexOf(uz.split(" · ")[1]) < 0) xato.push("kod yo'qoldi: " + uz + "  =>  " + ru);
  });
  tekshir(xato.length === 0, "obyekt ro'yxati (" + xato.length + "):\n  " + xato.join("\n  "));
});

/* ---------- 4. Maydon birligi ---------- */
/* Maydon ming ajratgichi bilan yoziladi ("20 774 m²") va ko'pincha [data-tarjimasiz]
   ichida turadi, ya'ni faqat mkbBirlikTarjima orqali o'tadi. */
sinov("maydon birligi m² ruschada м² bo'ladi", () => {
  const xato = [], aj = String.fromCharCode(160);
  ["78 m²", "20 774 m²", "20" + aj + "774 m²", "2 791 m²", "1 850,5 m²"].forEach(uz => {
    const ru = tarjima(uz);
    if (/m²/.test(ru)) xato.push("qoida: " + uz + "  =>  " + ru);
    const b = oyna.mkbBirlikTarjima(uz);
    if (/m²/.test(b)) xato.push("birlik: " + uz + "  =>  " + b);
  });
  /* raqamdan keyin turmagan m² (o'lchov nomi ichida) o'zgarmaydi */
  if (oyna.mkbBirlikTarjima("mln so'm/m²").indexOf("m²") < 0) xato.push("mln so'm/m² qoidaga tushib ketdi");
  tekshir(xato.length === 0, "maydon birligi (" + xato.length + "):\n  " + xato.join("\n  "));
});

/* ---------- Ishga tushirish ---------- */
let otdi = 0, yiqildi = 0;
console.log("Lug'at va tarjima qoidalari tekshiruvi\n");
for (const t of SINOVLAR){
  try { t.fn(); otdi++; console.log("  [OK]   " + t.nom); }
  catch (e){
    yiqildi++;
    console.log("  [XATO] " + t.nom);
    console.log("         " + String(e.message).split("\n").join("\n         "));
  }
}
console.log("\nYakun: o'tdi " + otdi + ", yiqildi " + yiqildi + ", jami " + (otdi + yiqildi));
if (yiqildi > 0) process.exit(1);
