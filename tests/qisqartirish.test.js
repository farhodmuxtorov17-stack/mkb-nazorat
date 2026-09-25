/* ============================================================
   qisqartirish.test.js — takrorni olib tashlash qoidalari:
   1) bildirishnoma kimga boradi (yadro/amal.js MKB_BILDIRISH_DOIRA): rahbariyatga obyekt eslatmasi faqat
      muddatidan 3 kundan ko'p o'tib yopilmaganda, administratorga biznes xabari umuman bormaydi;
   2) monitoring tasmasi olti tab, kommunal balans aktivlari bo'limida;
   3) shapkadagi pillalar faqat yon panel yig'ilgan kenglikda (721–1024 px).
   Ishga tushirish: node tests/qisqartirish.test.js
   ============================================================ */
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm");
const ILDIZ = path.join(__dirname, "..");
process.env.MKB_PAROL = process.env.MKB_PAROL || "sinov-parol-qisqa";
process.env.MKB_BUGUN = process.env.MKB_BUGUN || "2026-09-21";
let otdi = 0, yiqildi = 0;
function tekshir(nom, fn){
  try{ fn(); otdi++; console.log("  [OK]   " + nom); }
  catch(e){ yiqildi++; console.log("  [XATO] " + nom + "\n         " + e.message); }
}
function talab(shart, xabar){ if (!shart) throw new Error(xabar); }
const teng = (a, b, nom) => talab(JSON.stringify(a) === JSON.stringify(b), (nom || "") + " kutilgan " + JSON.stringify(b) + ", keldi " + JSON.stringify(a));
const matn = f => fs.readFileSync(path.join(ILDIZ, f), "utf8");

const qum = {window: {}};
vm.runInNewContext(matn("yadro/amal.js"), qum, {filename: "amal.js"});
const T = qum.window.MKB_BILDIRISH_DOIRA;

console.log("\n1. Bildirishnoma kimga boradi (sof qoida)");
const QOIDALAR = [
  {id: "Q-POLIS", qabulQiluvchiRol: "Obyekt menejeri", eskalatsiyaRol: "Rahbariyat", eskalatsiyaKun: 0},
  {id: "Q-KORIK", qabulQiluvchiRol: "Ko'rik va xavfsizlik inspektori", eskalatsiyaRol: "Rahbariyat", eskalatsiyaKun: 7},
  {id: "Q-QURILMA", qabulQiluvchiRol: "Ko'rik va xavfsizlik inspektori", eskalatsiyaRol: "Obyekt menejeri", eskalatsiyaKun: 3},
  {id: "Q-SOLIQ", qabulQiluvchiRol: "Buxgalteriya va risk", eskalatsiyaRol: null, eskalatsiyaKun: null},
];
const kontekst = (rol, rolNomi, vazifalar, bugun) => ({rol, rolNomi, bugun: bugun || new Date(2026, 8, 21),
  qoida: id => QOIDALAR.find(q => q.id === id) || null,
  vazifa: id => (vazifalar || []).find(v => v.id === id) || null,
  kanon: x => x === "Xavfsizlik xizmati" ? "Ko'rik va xavfsizlik inspektori" : x});
const polis = {id: "Q-POLIS|AK-1|01.09.2026", qoidaId: "Q-POLIS", obyektId: "AK-1", rol: "Obyekt menejeri", sana: "01.09.2026"};
const vazifa = (b, muddat, bajarildi) => ({id: "V|" + b.id, muddat, bajarildi: !!bajarildi});

tekshir("mas'ul rol o'z eslatmasini darhol ko'radi", () => {
  teng(T.holat(polis, kontekst("obyekt", "Obyekt menejeri", [vazifa(polis, "30.09.2026")])), "oz");
});
tekshir("rahbariyat muddati kelmagan obyekt eslatmasini olmaydi, u haftalik xulosaga tushadi", () => {
  teng(T.holat(polis, kontekst("rahbariyat", "Rahbariyat", [vazifa(polis, "30.09.2026")])), "xulosa");
  talab(!T.korinadimi(polis, kontekst("rahbariyat", "Rahbariyat", [vazifa(polis, "30.09.2026")])), "ko'rinib qoldi");
});
tekshir("muddatdan 3 kun o'tgani hali ijrochida, 4-kuni rahbariyatga o'tadi", () => {
  teng(T.holat(polis, kontekst("rahbariyat", "Rahbariyat", [vazifa(polis, "18.09.2026")])), "xulosa", "3 kun:");
  teng(T.holat(polis, kontekst("rahbariyat", "Rahbariyat", [vazifa(polis, "17.09.2026")])), "eskalatsiya", "4 kun:");
  teng(T.otganKun(polis, kontekst("rahbariyat", "Rahbariyat", [vazifa(polis, "17.09.2026")])), 4);
});
tekshir("yopilgan vazifa yuqoriga o'tmaydi", () => {
  teng(T.holat(polis, kontekst("rahbariyat", "Rahbariyat", [vazifa(polis, "01.08.2026", true)])), "xulosa");
});
tekshir("qoidadagi eskalatsiya kuni 3 dan katta bo'lsa, o'shancha kutiladi", () => {
  const k = {id: "Q-KORIK|AK-2|10.09.2026", qoidaId: "Q-KORIK", obyektId: "AK-2", rol: "Ko'rik va xavfsizlik inspektori", sana: "10.09.2026"};
  teng(T.holat(k, kontekst("rahbariyat", "Rahbariyat", [vazifa(k, "14.09.2026")])), "xulosa", "7 kun:");
  teng(T.holat(k, kontekst("rahbariyat", "Rahbariyat", [vazifa(k, "13.09.2026")])), "eskalatsiya", "8 kun:");
});
tekshir("eskalatsiya roli boshqa bo'lsa, rahbariyatga bormaydi; obyekt menejeriga boradi", () => {
  const q = {id: "Q-QURILMA|AK-3|01.09.2026", qoidaId: "Q-QURILMA", obyektId: "AK-3", rol: "Ko'rik va xavfsizlik inspektori", sana: "01.09.2026"};
  const v = [vazifa(q, "02.09.2026")];
  teng(T.holat(q, kontekst("rahbariyat", "Rahbariyat", v)), "xulosa");
  teng(T.holat(q, kontekst("obyekt", "Obyekt menejeri", v)), "eskalatsiya");
  teng(T.holat(q, kontekst("buxgalteriya", "Buxgalteriya va risk", v)), null);
});
tekshir("rahbariyat bank darajasidagi xabarni va jiddiy hodisani ko'radi", () => {
  teng(T.holat({id: "Q-MB|-|05.09.2026", qoidaId: "Q-MB", obyektId: null, rol: "Buxgalteriya va risk"}, kontekst("rahbariyat", "Rahbariyat")), "bank");
  teng(T.holat({id: "HODISA|GH-1", qoidaId: null, obyektId: "AK-4", rol: "Xavfsizlik xizmati"}, kontekst("rahbariyat", "Rahbariyat")), "hodisa");
  teng(T.holat({id: "HODISA|GH-1", qoidaId: null, obyektId: "AK-4", rol: "Xavfsizlik xizmati"}, kontekst("nazorat", "Ko'rik va xavfsizlik inspektori")), "oz", "eski rol nomi:");
});
tekshir("administrator biznes xabarini olmaydi, faqat o'z roliga yozilgan tizim xabarini", () => {
  const vz = [vazifa(polis, "01.08.2026")];
  teng(T.holat(polis, kontekst("admin", "Administrator", vz)), null);
  teng(T.holat({id: "HODISA|GH-1", qoidaId: null, obyektId: "AK-4", rol: "Xavfsizlik xizmati"}, kontekst("admin", "Administrator")), null);
  teng(T.holat({id: "T-1", qoidaId: null, obyektId: null, rol: "Administrator"}, kontekst("admin", "Administrator")), "oz");
});

console.log("\n2. Namoyish ma'lumoti");
const {urugla, omborOl} = require(path.join(ILDIZ, "server", "server.js"));
urugla();
const D = omborOl("shartli").D;
const VZ = new Map((D.MENING_VAZIFALARIM || []).map(v => [v.id, v]));
const bugun = (() => { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(process.env.MKB_BUGUN); return new Date(+m[1], +m[2] - 1, +m[3]); })();
const dk = (rol, rolNomi) => ({rol, rolNomi, bugun, qoida: id => (D.QOIDALAR || []).find(q => q.id === id) || null, vazifa: id => VZ.get(id) || null,
  kanon: x => ({"Xavfsizlik xizmati": "Ko'rik va xavfsizlik inspektori", "Filial rahbari": "Rahbariyat"})[x] || x});
tekshir("rahbariyat obyekt eslatmalarining ko'pini olmaydi, olganlari hammasi muddati o'tgan", () => {
  const B = D.BILDIRISHLAR || [];
  talab(B.length > 50, "namoyishda bildirishnoma kam: " + B.length);
  const k = dk("rahbariyat", "Rahbariyat");
  const kor = B.filter(b => T.korinadimi(b, k));
  talab(kor.length < B.length / 2, "rahbariyat hali ko'p oladi: " + kor.length + " / " + B.length);
  kor.filter(b => T.holat(b, k) === "eskalatsiya").forEach(b => talab(T.otganKun(b, k) > 3, b.id + ": muddatdan " + T.otganKun(b, k) + " kun"));
  talab(!kor.some(b => /kunda tugaydi|kunda eskiradi/.test(b.sarlavha || "")), "muddati kelmagan eslatma rahbariyatga bordi");
});
tekshir("administratorga namoyishdagi birorta biznes xabari bormaydi", () => {
  const k = dk("admin", "Administrator");
  teng((D.BILDIRISHLAR || []).filter(b => T.korinadimi(b, k)).length, 0);
});
tekshir("qo'ng'iroq va bildirishnomalar sahifasi bitta qoidani ishlatadi", () => {
  const a = matn("yadro/app.js"), s = matn("bildirishnomalar.html");
  talab(/MKB_BILDIRISH_DOIRA\.holat/.test(a), "app.js qoidani chaqirmaydi");
  talab(!/hammasi = rol === "admin" \|\| rol === "rahbariyat"/.test(a), "app.js da eski 'hammasi' qoidasi qoldi");
  talab(/MKB\.bildirish\.royxat\(\)/.test(s) && !/hammasiniKoradi/.test(s), "sahifa o'z doirasini hisoblaydi");
});

console.log("\n3. Navigatsiya");
const MONITORING = ["himoya.html", "hodisalar.html", "qurilmalar.html", "ruxsatlar.html", "korik-rejasi.html", "qoriqlash.html"];
tekshir("monitoring tasmasi olti tab va hamma sahifada bir xil", () => {
  fs.readdirSync(ILDIZ).filter(f => f.endsWith(".html")).forEach(f => {
    const t = /<nav class="bolim-tablar"[^>]*>(.*?)<\/nav>/s.exec(matn(f));
    if (!t || !/href="himoya\.html"/.test(t[1])) return;
    const havolalar = [...t[1].matchAll(/href="([^"?#]+)/g)].map(m => m[1]);
    teng(havolalar, MONITORING, f + ":");
  });
});
tekshir("kommunal balans aktivlari bo'limida, monitoring tasmasida yo'q", () => {
  const g = {window: {}}; vm.runInNewContext(matn("yadro/daraxt.js"), g);
  const dar = g.window.MKB_DARAXT;
  talab(dar.aktivlar.some(x => x.f === "kommunal.html"), "aktivlarda yo'q");
  talab(!dar.nazorat.some(x => x.f === "kommunal.html"), "nazoratda qoldi");
  talab(/<body data-sahifa="aktivlar">/.test(matn("kommunal.html")), "kommunal.html data-sahifa aktivlar emas");
});
tekshir("nazorat bo'limining ikkala tasmasida ham oltitadan ko'p tab yo'q", () => {
  const g = {window: {}}; vm.runInNewContext(matn("yadro/daraxt.js"), g);
  g.window.MKB_DARAXT.nazorat.map(x => x.f).forEach(f => {
    const t = /<nav class="bolim-tablar"[^>]*>(.*?)<\/nav>/s.exec(matn(f));
    if (!t) return;
    const n = (t[1].match(/<a /g) || []).length;
    talab(n <= 6, f + ": tasmada " + n + " tab");
  });
});
tekshir("shapka pillalari yon panelni takrorlamaydi: faqat 721–1024 px da", () => {
  const css = matn("yadro/app.css");
  talab(/\n\.pill-nav\{display:none;/.test(css), "keng ekranda pillalar ko'rinadi");
  const blok = kenglik => { const i = css.indexOf("@media (max-width:" + kenglik + "px){\n"); talab(i >= 0, kenglik + " bloki yo'q"); return css.slice(i, css.indexOf("\n}", i)); };
  talab(/\.pill-nav\{display:flex\}/.test(blok(1024)), "1024 px dan torda pillalar chiqmaydi");
  talab(/\.pill-nav\{display:none\}/.test(blok(720)), "telefonda pillalar joy egallaydi");
});

console.log("\nYakun: o'tdi " + otdi + ", yiqildi " + yiqildi + ", jami " + (otdi + yiqildi));
process.exit(yiqildi ? 1 : 0);
