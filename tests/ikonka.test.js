/* ============================================================
   ikonka.test.js — belgilar to'plami va orqaga qaytish navigatsiyasi
   Ishga tushirish: node tests/ikonka.test.js
   Fayllar matn sifatida o'qiladi: brauzer va server kerak emas.
   ============================================================ */
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm");
const ILDIZ = path.join(__dirname, "..");
let otdi = 0, yiqildi = 0;
function tekshir(nom, fn){
  try{ fn(); otdi++; console.log("  [OK]   " + nom); }
  catch(e){ yiqildi++; console.log("  [XATO] " + nom + "\n         " + e.message); }
}
function talab(shart, xabar){ if (!shart) throw new Error(xabar); }
const matn = f => fs.readFileSync(path.join(ILDIZ, f), "utf8");

/* Sprite: yadro/ikonlar.js window.MKB_SPRITE ni yasaydi */
const qum = {window: {}};
vm.runInNewContext(matn("yadro/ikonlar.js"), qum, {filename: "ikonlar.js"});
const SPRITE = qum.window.MKB_SPRITE;
const belgilar = [...SPRITE.matchAll(/<symbol id="ik-([a-z0-9-]+)"([\s\S]*?)<\/symbol>/g)]
  .map(m => ({nom: m[1], bosh: m[0].slice(0, 90), tan: m[2]}));
const nomlar = new Set(belgilar.map(b => b.nom));

const app = matn("yadro/app.js");
const TAXALLUS = vm.runInNewContext("(" + /const IK_TAXALLUS = (\{[\s\S]*?\});/.exec(app)[1] + ")");
const yechim = n => TAXALLUS[n] || n;

console.log("\n1. Belgilar to'plami bir tilda chizilgan");
tekshir("har bir belgi 24px to'rda", () => {
  const xato = belgilar.filter(b => !/viewBox="0 0 24 24"/.test(b.bosh));
  talab(!xato.length, "24 to'rda emas: " + xato.map(b => b.nom).join(", "));
});
tekshir("chiziq qalinligi 1.5px", () => {
  const xato = belgilar.filter(b => !/stroke-width="1\.5"/.test(b.tan));
  talab(!xato.length, "boshqa qalinlik: " + xato.map(b => b.nom).join(", "));
});
tekshir("rang currentColor dan olinadi", () => {
  const xato = belgilar.filter(b => !/stroke="currentColor"/.test(b.tan));
  talab(!xato.length, "currentColor yo'q: " + xato.map(b => b.nom).join(", "));
});
tekshir("tashqi surat, shrift yoki emoji ishlatilmaydi", () => {
  /* xmlns faqat tashqi svg tegida bo'ladi, belgilar ichida hech qanday tashqi manba yo'q */
  const tana = belgilar.map(b => b.tan).join("");
  talab(!/<image|<text|font-family|https?:\/\//.test(tana), "belgida tashqi manba yoki matn bor");
  talab(!/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u.test(SPRITE), "spriteda emoji bor");
});
tekshir("orqaga qaytish belgisi bor", () => talab(nomlar.has("orqaga"), "ik-orqaga yo'q"));

console.log("\n2. Ishlatilgan har bir belgi spriteda bor");
const fayllar = fs.readdirSync(ILDIZ).filter(f => f.endsWith(".html") && !f.startsWith("_") && f !== "taqdimot.html")
  .concat(["yadro/app.js", "yadro/ux.js", "yadro/amal.js", "yadro/xarita.js", "yadro/chizma.js"]);
tekshir("sahifalardagi #ik- havolalari yechiladi", () => {
  const yoq = new Set();
  fayllar.forEach(f => {
    [...matn(f).matchAll(/#ik-([a-z0-9-]+)/g)].forEach(m => { if (!nomlar.has(yechim(m[1]))) yoq.add(m[1] + " (" + f + ")"); });
  });
  talab(!yoq.size, "spriteda yo'q: " + [...yoq].join(", "));
});
tekshir("ik(\"nom\") chaqiruvlari yechiladi", () => {
  const yoq = new Set();
  fayllar.forEach(f => {
    [...matn(f).matchAll(/\bik\("([a-z0-9-]+)"/g)].forEach(m => { if (!nomlar.has(yechim(m[1]))) yoq.add(m[1] + " (" + f + ")"); });
  });
  talab(!yoq.size, "spriteda yo'q: " + [...yoq].join(", "));
});
tekshir("ma'lumotdagi ikonka nomlari yechiladi", () => {
  const yoq = new Set();
  ["malumot.js", "malumot-qoshimcha.js", "malumot-kengaytma.js", "malumot-kirish.js", "malumot-indeks.js", "yadro/ux.js"]
    .forEach(f => [...matn(f).matchAll(/ikonka:\s*"([a-z0-9-]+)"/g)]
      .forEach(m => { if (!nomlar.has(yechim(m[1]))) yoq.add(m[1] + " (" + f + ")"); }));
  talab(!yoq.size, "spriteda yo'q: " + [...yoq].join(", "));
});
tekshir("taxallus ro'yxatidagi nomlar mavjud belgilarga qaraydi", () => {
  const yoq = Object.entries(TAXALLUS).filter(([, v]) => !nomlar.has(v));
  talab(!yoq.length, "taxallus bo'sh: " + yoq.map(x => x.join("->")).join(", "));
});

console.log("\n3. Sarlavha va KPI belgilari sahifalarda qo'yilgan");
/* data-ikonka - sahifa qaysi belgi kerakligini aytadi, belgini yadro chizadi (app.js ikonkalarniQoy).
   Sinov shu e'lonlar rostdan yozilganini qo'riqlaydi: mexanizm bor-u, ishlatilmasa ekranda hech narsa ko'rinmaydi. */
const PANELLAR = ["panel.html", "panel-nazorat.html", "panel-obyekt.html", "panel-moliya.html"];
const sarlavhaBelgisiz = f => [...matn(f).matchAll(/class="karta-bosh"[^>]*>\s*<h2([^>]*)>/g)]
  .filter(m => !/data-ikonka="/.test(m[1])).map(m => f + ":" + m[1].trim());
tekshir("panel sahifalarida har bir karta sarlavhasida belgi bor", () => {
  const xato = PANELLAR.flatMap(sarlavhaBelgisiz);
  talab(!xato.length, "data-ikonka yo'q: " + xato.join(", "));
});
tekshir("panel sahifalarida har bir KPI plitkasida belgi bor", () => {
  const xato = PANELLAR.flatMap(f => [...matn(f).matchAll(/class="metrika"([^>]*)>/g)]
    .filter(m => !/data-ikonka="/.test(m[1])).map(m => f + ":" + m[1].trim()));
  talab(!xato.length, "data-ikonka yo'q: " + xato.join(", "));
});
tekshir("har bir sahifada karta sarlavhasi belgi bilan chiqadi", () => {
  const sah = fs.readdirSync(ILDIZ).filter(f => f.endsWith(".html") && !f.startsWith("_") && f !== "taqdimot.html");
  const xato = sah.flatMap(sarlavhaBelgisiz);
  talab(!xato.length, "data-ikonka yo'q: " + xato.slice(0, 6).join(", "));
});
tekshir("e'lon qilingan har bir data-ikonka nomi spriteda bor", () => {
  const yoq = new Set();
  fayllar.forEach(f => {
    [...matn(f).matchAll(/data-ikonka="([a-z0-9-]+)"/g)].forEach(m => { if (!nomlar.has(yechim(m[1]))) yoq.add(m[1] + " (" + f + ")"); });
  });
  talab(!yoq.size, "spriteda yo'q: " + [...yoq].join(", "));
});

console.log("\n4. Orqaga qaytish: yadro va uslublar");
tekshir("yadro MKB.orqaga, MKB.urlHolat va MKB.urlOrqaga ni beradi", () => {
  ["MKB.orqaga =", "MKB.urlHolat =", "MKB.urlOrqaga ="].forEach(k => talab(app.includes(k), k + " yo'q"));
});
tekshir("orqaga tugmasi saqlanmagan formani so'raydi", () => {
  const p = app.indexOf("MKB.orqaga = ");
  talab(app.slice(p, p + 400).includes("ketishMumkinmi"), "MKB.orqaga forma qo'riqchisini chaqirmaydi");
});
tekshir("rolga xos bo'lim markazida orqaga chizilmaydi", () => {
  const p = app.indexOf("function orqagaChiz");
  const tan = app.slice(p, p + 900);
  talab(tan.includes("bolimHavolasi(joriyBolim()"),
    "orqagaChiz rolga xos bo'lim markazini (BOLIM_BOSH_ROL) hisobga olmaydi");
});
tekshir("kirish, sessiya va xato sahifalariga qaytarilmaydi", () => {
  const p = app.indexOf("function tarixdaOrqaBor");
  const tan = app.slice(p, p + 900);
  ["kirish\\.html", "xato-", "index\\.html"].forEach(k => talab(tan.includes(k), k + " chetlatilmagan"));
});
const css = matn("yadro/app.css");
tekshir("uslublar app.css da", () => {
  talab(/\.orqaga-tugma\{/.test(css), ".orqaga-tugma uslubi yo'q");
  talab(/\.hs-yorliq \.yolak-ic\{/.test(css), "yo'lakcha belgisi uslubi yo'q");
  talab(/\.sarlavha-ic\{/.test(css), "data-ikonka belgisi uslubi yo'q");
});
tekshir("chop etishda orqaga tugmasi ko'rinmaydi", () => {
  const p = css.indexOf("@media print");
  talab(css.slice(p, p + 400).includes(".orqaga-tugma"), "chopda yashirilmagan");
});

console.log("\n5. Yo'lakcha: ota sahifa har bir ichki sahifada bor");
global.window = global;
require(path.join(ILDIZ, "yadro", "daraxt.js"));
const DARAXT = global.MKB_DARAXT;
const BOLIM_HREF = [...app.matchAll(/\{kalit: "([a-z]+)",\s+yorliq: "[^"]+",\s+qisqa: "[^"]+",\s+ikonka: "([a-z0-9-]+)",\s+href: "([^"]+)"\}/g)];
const bosh = new Set(BOLIM_HREF.map(m => m[3]));
Object.keys(DARAXT).forEach(k => { if (!BOLIM_HREF.find(m => m[1] === k)) bosh.add(DARAXT[k][0].f); });
const rb = /const ROL_BOSH = \{([\s\S]*?)\};/.exec(app);
if (rb) [...rb[1].matchAll(/"([a-z-]+\.html)"/g)].forEach(x => bosh.add(x[1]));
const sahifalar = fs.readdirSync(ILDIZ).filter(f => f.endsWith(".html") && !f.startsWith("_") &&
  !["index.html", "taqdimot.html", "kirish.html"].includes(f) && !/^(xato-|parol-)/.test(f));
const ochiqmi = f => /<body[^>]*data-ochiq="1"/.test(matn(f));
const yolakcha = f => {
  const m = /<div class="hs-yorliq"[^>]*>([\s\S]*?)<\/div>/.exec(matn(f));
  return m ? m[1] : null;
};
tekshir("bo'lim markazi va rol paneli ota sahifasiz", () => {
  const xato = [...bosh].filter(f => sahifalar.includes(f) && yolakcha(f) && /<a [^>]*href=/.test(yolakcha(f)));
  talab(!xato.length, "bosh sahifada ota havolasi bor: " + xato.join(", "));
});
tekshir("qolgan har bir sahifada ota havolasi bor (Orqaga shu yerga qaytadi)", () => {
  const xato = sahifalar.filter(f => !bosh.has(f) && !ochiqmi(f))
    .filter(f => { const y = yolakcha(f); return !y || !/<a [^>]*href=/.test(y); });
  talab(!xato.length, "ota havolasi yo'q: " + xato.join(", "));
});
tekshir("yo'lakchaning birinchi bandi bo'limga qaraydi", () => {
  const xato = sahifalar.filter(f => !ochiqmi(f)).filter(f => {
    const y = yolakcha(f);
    if (!y) return true;
    const a = /<a [^>]*href="([^"?#]+)/.exec(y);
    if (!a) return false;   /* oddiy matn: bo'lim joriy sahifadan aniqlanadi */
    const fayl = a[1].split("/").pop();
    return !BOLIM_HREF.find(m => m[3] === fayl) && !Object.keys(DARAXT).some(k => (DARAXT[k] || []).some(s => s.f === fayl));
  });
  talab(!xato.length, "birinchi band bo'limga qaramaydi: " + xato.join(", "));
});

console.log("\nYakun: o'tdi " + otdi + ", yiqildi " + yiqildi + ", jami " + (otdi + yiqildi));
process.exit(yiqildi ? 1 : 0);
