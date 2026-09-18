/* ============================================================
   sahifalar.test.js — navigatsiya va sahifalar butunligi
   Ishga tushirish: node tests/sahifalar.test.js
   ============================================================ */
"use strict";
const fs = require("fs"), path = require("path");
const ILDIZ = path.join(__dirname, "..");
let otdi = 0, yiqildi = 0;
function tekshir(nom, fn){
  try{ fn(); otdi++; console.log("  [OK]   " + nom); }
  catch(e){ yiqildi++; console.log("  [XATO] " + nom + "\n         " + e.message); }
}
function talab(shart, xabar){ if (!shart) throw new Error(xabar); }

const sahifalar = fs.readdirSync(ILDIZ).filter(f => f.endsWith(".html") && !f.startsWith("_"));
const matn = f => fs.readFileSync(path.join(ILDIZ, f), "utf8");
const bor = f => fs.existsSync(path.join(ILDIZ, f));

global.window = global;
require(path.join(ILDIZ, "yadro", "daraxt.js"));
const DARAXT = global.MKB_DARAXT, ICHKI = global.MKB_ICHKI || {};
const app = matn("yadro/app.js");

console.log("\n1. Navigatsiya daraxti");
tekshir("daraxtdagi har bir sahifa mavjud", () => {
  Object.values(DARAXT).forEach(r => r.forEach(s => talab(bor(s.f), "fayl yo'q: " + s.f)));
});
tekshir("ichki sahifalar ro'yxatidagi har bir fayl mavjud", () => {
  Object.values(ICHKI).forEach(r => r.forEach(f => talab(bor(f), "fayl yo'q: " + f)));
});
tekshir("bo'limlar reyestri va daraxt kalitlari mos", () => {
  const kalitlar = [...app.matchAll(/\{kalit: "([a-z]+)",\s+yorliq:/g)].map(m => m[1]);
  talab(kalitlar.length >= 6, "BOLIMLAR o'qilmadi");
  kalitlar.forEach(k => talab(DARAXT[k] && DARAXT[k].length, "daraxtda bo'lim yo'q: " + k));
  talab(kalitlar.length <= 9, "bo'limlar soni 9 dan oshmasligi kerak, hozir: " + kalitlar.length);
});
tekshir("har bir sahifaning bo'lim kaliti daraxtdagi bo'limiga mos", () => {
  const xarita = {};
  Object.keys(DARAXT).forEach(k => DARAXT[k].forEach(s => { xarita[s.f] = k; }));
  Object.keys(ICHKI).forEach(k => ICHKI[k].forEach(f => { xarita[f] = k; }));
  Object.keys(xarita).forEach(f => {
    const m = /data-sahifa="([^"]+)"/.exec(matn(f));
    talab(m && m[1] === xarita[f], f + ": data-sahifa=" + (m && m[1]) + ", kutilgan " + xarita[f]);
  });
});

console.log("\n2. Havolalar");
tekshir("sahifalardagi barcha ichki havolalar mavjud faylga olib boradi", () => {
  const yoq = [];
  sahifalar.forEach(f => {
    const s = matn(f);
    for (const m of s.matchAll(/(?:href|src)=["']([^"'#?]+\.(?:html|js|css|webp|jpg|svg))/g)){
      const manzil = m[1];
      if (/^https?:/.test(manzil)) continue;
      if (!bor(manzil)) yoq.push(f + " -> " + manzil);
    }
    for (const m of s.matchAll(/["'`]([a-z0-9-]+\.html)(?:\?|["'`])/g)) if (!bor(m[1])) yoq.push(f + " -> " + m[1]);
  });
  talab(!yoq.length, "uzilgan havolalar:\n           " + [...new Set(yoq)].slice(0, 12).join("\n           "));
});
tekshir("yadro va qo'llanmadagi havolalar mavjud", () => {
  ["yadro/app.js", "yadro/qollanma.js", "yadro/api.js"].forEach(f => {
    for (const m of matn(f).matchAll(/["'`]([a-z0-9-]+\.html)/g)) talab(bor(m[1]), f + " -> " + m[1]);
  });
});
tekshir("bo'lim tasmalaridagi bandlar o'z bo'limidagi sahifalarga olib boradi", () => {
  const amaldagi = new Set([].concat(...Object.values(DARAXT).map(r => r.map(s => s.f)), ...Object.values(ICHKI)));
  sahifalar.filter(f => amaldagi.has(f)).forEach(f => {
    const s = matn(f), t = /<nav class="bolim-tablar".*?<\/nav>/s.exec(s);
    if (!t || /data-id-qoshib/.test(t[0])) return;
    const bolim = /data-sahifa="([^"]+)"/.exec(s)[1];
    for (const m of t[0].matchAll(/href="([^"]+)"/g)){
      talab(bor(m[1]), f + ": tasmada yo'q fayl " + m[1]);
      const b = /data-sahifa="([^"]+)"/.exec(matn(m[1]))[1];
      talab(b === bolim, f + ": tasmadagi " + m[1] + " boshqa bo'limda (" + b + ")");
    }
  });
});

console.log("\n3. Umumiy talablar");
tekshir("har bir sahifa bir xil versiya belgisi bilan yuklanadi", () => {
  const versiyalar = new Set();
  sahifalar.forEach(f => { for (const m of matn(f).matchAll(/\?v=(\d+)/g)) versiyalar.add(m[1]); });
  talab(versiyalar.size === 1, "turli versiyalar: " + [...versiyalar].join(", "));
});
tekshir("sahifa ichidagi skriptlar sintaksis jihatdan to'g'ri", () => {
  const vm = require("vm");
  sahifalar.forEach(f => {
    let i = 0;
    for (const m of matn(f).matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)){
      i++;
      try { new vm.Script("(async()=>{" + m[1] + "\n})", {filename: f}); }
      catch (e) { throw new Error(f + ", " + i + "-skript: " + e.message); }
    }
  });
});
tekshir("server va mijozdagi rol-bo'lim jadvallari bir xil bo'limlardan iborat", () => {
  const srv = matn("server/server.js");
  ["arxiv", "xarita", "sugurta", "hujjat"].forEach(k => {
    talab(!new RegExp('"' + k + '"').test(/const ROL_BOLIMLAR = \{[\s\S]*?\};/.exec(srv)[0]), "serverda eskirgan bo'lim: " + k);
    talab(!new RegExp('"' + k + '"').test(/const ROL_RUXSAT = \{[\s\S]*?\};/.exec(app)[0]), "mijozda eskirgan bo'lim: " + k);
  });
});

console.log("\nYakun: o'tdi " + otdi + ", yiqildi " + yiqildi + ", jami " + (otdi + yiqildi));
process.exit(yiqildi ? 1 : 0);
