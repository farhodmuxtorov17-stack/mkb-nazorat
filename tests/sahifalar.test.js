/* ============================================================
   sahifalar.test.js — navigatsiya va sahifalar butunligi
   Ishga tushirish: node tests/sahifalar.test.js
   Sahifalar matn sifatida o'qiladi: brauzer va server kerak emas.
   Nomi "_" bilan boshlanadigan lokal yordamchi sahifalar tekshirilmaydi.
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

const sahifalar = fs.readdirSync(ILDIZ).filter(f => f.endsWith(".html") && !f.startsWith("_"));
const matn = f => fs.readFileSync(path.join(ILDIZ, f), "utf8");
const bor = f => fs.existsSync(path.join(ILDIZ, f));
const ochiqmi = f => /<body[^>]*data-ochiq="1"/.test(matn(f));

/* Olib tashlangan sahifalar va chizma tizimi: ularga hech qayerda havola qolmasligi kerak */
const OCHIRILGAN_SAHIFALAR = ["obyekt-3d.html", "obyekt-qavat.html", "kirish-nazorati.html", "kirish-nuqtalari.html", "kirish-nuqtasi.html"];
const OCHIRILGAN_FAYLLAR = ["yadro/bino.js", "yadro/qavat.js", "yadro/nav3d.js", "yadro/obyekt-rasm.js",
  "yadro/taqdimot-tarkib.js", "yadro/taqdimot-moslama.js", "assets/obyekt"];
const ESKI_IZLAR = /assets\/obyekt\/|obyekt-rasm|bino\.js|nav3d|qavat\.js|taqdimot-tarkib|taqdimot-moslama|MKBbino|MKBqavat/;
/* Taqdimot o'z versiya kalitlari bilan alohida yuritiladi: umumiy kalit tekshiruvidan chetda */
const ALOHIDA_VERSIYA = new Set(["taqdimot.html"]);

global.window = global;
require(path.join(ILDIZ, "yadro", "daraxt.js"));
const DARAXT = global.MKB_DARAXT, ICHKI = global.MKB_ICHKI || {}, TABLAR = global.MKB_OBYEKT_TABLAR || [];
const app = matn("yadro/app.js");
/* BOLIMLAR dagi ish bo'limlari va alohida chiziladigan "sozlama" */
const bolimKalitlari = [...app.matchAll(/\{kalit: "([a-z]+)",\s+yorliq:/g)].map(m => m[1]);
if (!bolimKalitlari.includes("sozlama")) bolimKalitlari.push("sozlama");
const royxatdagi = {};
Object.keys(DARAXT).forEach(k => DARAXT[k].forEach(s => { royxatdagi[s.f] = k; }));
Object.keys(ICHKI).forEach(k => ICHKI[k].forEach(f => { royxatdagi[f] = k; }));

console.log("\n1. Navigatsiya daraxti");
tekshir("daraxtdagi har bir sahifa mavjud", () => {
  Object.values(DARAXT).forEach(r => r.forEach(s => talab(bor(s.f), "fayl yo'q: " + s.f)));
});
tekshir("ichki sahifalar ro'yxatidagi har bir fayl mavjud", () => {
  Object.values(ICHKI).forEach(r => r.forEach(f => talab(bor(f), "fayl yo'q: " + f)));
});
tekshir("o'nta bo'lim: reyestr va daraxt kalitlari mos, 'Undiruv va sud' saqlangan", () => {
  talab(bolimKalitlari.length >= 6, "BOLIMLAR o'qilmadi");
  bolimKalitlari.forEach(k => talab(DARAXT[k] && DARAXT[k].length, "daraxtda bo'lim yo'q: " + k));
  Object.keys(DARAXT).forEach(k => talab(bolimKalitlari.includes(k), "daraxtdagi bo'lim reyestrda yo'q: " + k));
  talab(bolimKalitlari.length === 10, "bo'limlar soni 10 bo'lishi kerak, hozir: " + bolimKalitlari.length);
  talab(bolimKalitlari.includes("yuridik"), "undiruv bo'limi (yuridik) yo'q");
});
tekshir("har bir ish sahifasi daraxtda yoki ichki ro'yxatda qayd etilgan", () => {
  const yoq = sahifalar.filter(f => !royxatdagi[f] && !ochiqmi(f));
  talab(!yoq.length, "ro'yxatga olinmagan sahifalar: " + yoq.join(", "));
});
tekshir("har bir sahifaning bo'lim kaliti daraxtdagi bo'limiga mos", () => {
  Object.keys(royxatdagi).forEach(f => {
    const m = /data-sahifa="([^"]+)"/.exec(matn(f));
    talab(m && m[1] === royxatdagi[f], f + ": data-sahifa=" + (m && m[1]) + ", kutilgan " + royxatdagi[f]);
  });
});
tekshir("obyekt kartochkasi tablari: kelishilgan o'nta tab, fayllari bor", () => {
  const nomlar = TABLAR.map(t => t.n.replace(/&#39;/g, "'")).join(", ");
  talab(nomlar === "Umumiy, Suratlar, Moliya, Hujjatlar, Ko'riklar, Xarajatlar, Kommunal, Himoya, Sotuv, Tarix",
    "tablar: " + nomlar);
  TABLAR.forEach(t => talab(bor(t.f), "tab fayli yo'q: " + t.f));
});

console.log("\n2. Havolalar");
tekshir("sahifalardagi barcha ichki havolalar mavjud faylga olib boradi", () => {
  const yoq = [];
  sahifalar.forEach(f => {
    const s = matn(f);
    for (const m of s.matchAll(/(?:href|src)=["']([^"'#?]+\.(?:html|js|css|webp|jpg|jpeg|png|svg|woff2))/g)){
      const manzil = m[1];
      if (/^(https?:|data:|blob:)/.test(manzil) || manzil.startsWith("mahalliy/")) continue;
      if (!bor(manzil)) yoq.push(f + " -> " + manzil);
    }
    for (const m of s.matchAll(/["'`]([a-z0-9-]+\.html)(?:[?#]|["'`])/g)) if (!bor(m[1])) yoq.push(f + " -> " + m[1]);
  });
  talab(!yoq.length, "uzilgan havolalar:\n           " + [...new Set(yoq)].slice(0, 12).join("\n           "));
});
tekshir("yadro skriptlaridagi sahifa nomlari mavjud", () => {
  ["yadro/app.js", "yadro/qollanma.js", "yadro/api.js", "yadro/amal.js", "yadro/daraxt.js"].filter(bor).forEach(f => {
    for (const m of matn(f).matchAll(/["'`]([a-z0-9-]+\.html)/g)) talab(bor(m[1]), f + " -> " + m[1]);
  });
});
tekshir("bo'lim tasmalaridagi bandlar o'z bo'limidagi sahifalarga olib boradi", () => {
  sahifalar.filter(f => royxatdagi[f]).forEach(f => {
    const s = matn(f), t = /<nav class="bolim-tablar".*?<\/nav>/s.exec(s);
    if (!t || /data-id-qoshib/.test(t[0])) return;
    const bolim = /data-sahifa="([^"]+)"/.exec(s)[1];
    for (const m of t[0].matchAll(/href="([^"?#]+)/g)){
      talab(bor(m[1]), f + ": tasmada yo'q fayl " + m[1]);
      const b = /data-sahifa="([^"]+)"/.exec(matn(m[1]));
      talab(b && b[1] === bolim, f + ": tasmadagi " + m[1] + " boshqa bo'limda (" + (b && b[1]) + ")");
    }
  });
});
tekshir("olib tashlangan sahifalar yo'q va ularga havola qolmagan", () => {
  OCHIRILGAN_SAHIFALAR.forEach(f => talab(!bor(f), f + " hali mavjud"));
  OCHIRILGAN_FAYLLAR.forEach(f => talab(!bor(f), f + " hali mavjud"));
  const qolgan = [];
  const fayllar = sahifalar.concat(fs.readdirSync(path.join(ILDIZ, "yadro")).filter(f => f.endsWith(".js")).map(f => "yadro/" + f),
    fs.readdirSync(ILDIZ).filter(f => /^malumot.*\.js$/.test(f)), ["tarjima.js", "server/server.js"]);
  fayllar.forEach(f => {
    matn(f).split(/\r?\n/).forEach((q, i) => {
      if (OCHIRILGAN_SAHIFALAR.some(s => q.includes(s))) qolgan.push(f + ":" + (i + 1));
      /* api.js va server eski rasm yo'lini rad etadi: bu tekshiruv qatori havola emas */
      if (ESKI_IZLAR.test(q) && !/includes\("assets\/obyekt\/"\)/.test(q)) qolgan.push(f + ":" + (i + 1));
    });
  });
  talab(!qolgan.length, "eski havolalar: " + qolgan.slice(0, 10).join(", "));
});

console.log("\n3. Umumiy talablar");
tekshir("har bir sahifada keshlash kaliti yagona, ish sahifalarida bir xil", () => {
  const umumiy = new Map();
  sahifalar.filter(f => !ALOHIDA_VERSIYA.has(f)).forEach(f => {
    const v = new Set([...matn(f).matchAll(/\?v=(\d+)/g)].map(m => m[1]));
    talab(v.size <= 1, f + ": bir sahifada turli kalitlar " + [...v].join(", "));
    if (v.size) { const k = [...v][0]; umumiy.set(k, (umumiy.get(k) || []).concat(f)); }
  });
  if (umumiy.size > 1){
    const kam = [...umumiy.entries()].sort((a, b) => a[1].length - b[1].length)[0];
    throw new Error("turli kalitlar: " + [...umumiy.keys()].join(", ") + "; kamchilikdagi: " + kam[1].slice(0, 8).join(", "));
  }
});
tekshir("ma'lumot va yadro skriptlari kelishilgan tartibda yuklanadi", () => {
  const tartib = ["malumot.js", "malumot-qoshimcha.js", "malumot-kengaytma.js", "malumot-kirish.js", "malumot-indeks.js",
    "tarjima.js", "yadro/ikonlar.js", "yadro/daraxt.js", "yadro/chizma.js", "yadro/qollanma.js", "yadro/api.js", "yadro/app.js"];
  sahifalar.filter(f => royxatdagi[f]).forEach(f => {
    const src = [...matn(f).matchAll(/<script[^>]*\bsrc="([^"?]+)/g)].map(m => m[1]);
    const joy = tartib.map(t => src.indexOf(t));
    talab(joy.every(i => i >= 0), f + ": yetishmaydi " + tartib.filter((t, i) => joy[i] < 0).join(", "));
    for (let i = 1; i < joy.length; i++) talab(joy[i] > joy[i - 1], f + ": " + tartib[i] + " " + tartib[i - 1] + " dan oldin");
    const amal = src.indexOf("yadro/amal.js");
    if (amal >= 0) talab(amal > joy[joy.length - 1], f + ": yadro/amal.js app.js dan oldin");
  });
});
tekshir("sahifa ichidagi skriptlar sintaksis jihatdan to'g'ri", () => {
  sahifalar.forEach(f => {
    let i = 0;
    for (const m of matn(f).matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)){
      i++;
      try { new vm.Script("(async()=>{" + m[1] + "\n})", {filename: f}); }
      catch (e) { throw new Error(f + ", " + i + "-skript: " + e.message); }
    }
  });
});
tekshir("yadro va ma'lumot skriptlari sintaksis jihatdan to'g'ri", () => {
  const fayllar = fs.readdirSync(path.join(ILDIZ, "yadro")).filter(f => f.endsWith(".js")).map(f => "yadro/" + f)
    .concat(fs.readdirSync(ILDIZ).filter(f => /^(malumot.*|tarjima)\.js$/.test(f)));
  fayllar.forEach(f => {
    try { new vm.Script(matn(f), {filename: f}); }
    catch (e) { throw new Error(f + ": " + e.message); }
  });
});
tekshir("server va mijozdagi bo'limlar bir xil", () => {
  const srv = matn("server/server.js");
  const srvBolim = JSON.parse(/const HAMMA_OQISH = (\[[^\]]*\])/.exec(srv)[1]);
  const mijoz = bolimKalitlari;
  talab(srvBolim.slice().sort().join() === mijoz.slice().sort().join(),
    "server: " + srvBolim.join(", ") + " / mijoz: " + mijoz.join(", "));
  const ruxsat = /const ROL_RUXSAT = \{[\s\S]*?\n\};/.exec(app)[0];
  for (const m of ruxsat.matchAll(/\b([a-z]+): "[oyt]+"/g))
    talab(mijoz.includes(m[1]), "ROL_RUXSAT da noma'lum bo'lim: " + m[1]);
  ["arxiv", "xarita", "sugurta", "hujjat", "kn", "baholash"].forEach(k =>
    talab(!new RegExp('"' + k + '"').test(/const ROL_BOLIMLAR = \{[\s\S]*?\};/.exec(srv)[0]), "serverda eskirgan bo'lim: " + k));
});
tekshir("mijoz va serverdagi har bir rolning o'qish bo'limlari bir xil", () => {
  const srv = matn("server/server.js");
  const kalit = vm.runInNewContext("(" + /const ROL_KALIT = (\{[\s\S]*?\n\});/.exec(app)[1] + ")");
  const ruxsat = vm.runInNewContext("(" + /const ROL_RUXSAT = (\{[\s\S]*?\n\});/.exec(app)[1] + ")");
  const hamma = JSON.parse(/const HAMMA_OQISH = (\[[^\]]*\])/.exec(srv)[1]);
  const srvRol = vm.runInNewContext("const HAMMA_OQISH = " + JSON.stringify(hamma) + ";(" +
    /const ROL_BOLIMLAR = (\{[\s\S]*?\n\});/.exec(srv)[1] + ")");
  const farq = [];
  Object.keys(kalit).forEach(rolNomi => {
    const r = ruxsat[kalit[rolNomi]], s = srvRol[rolNomi];
    talab(s, "serverda rol yo'q: " + rolNomi);
    if (r === null || s.oqi === null){ if (!(r === null && s.oqi === null)) farq.push(rolNomi + ": to'liq huquq faqat bir tomonda"); return; }
    const m = Object.keys(r).filter(b => r[b].indexOf("o") >= 0).sort().join();
    const v = s.oqi.slice().sort().join();
    if (m !== v) farq.push(rolNomi + ": mijoz [" + m + "] / server [" + v + "]");
  });
  talab(!farq.length, farq.join("; "));
});

console.log("\nYakun: o'tdi " + otdi + ", yiqildi " + yiqildi + ", jami " + (otdi + yiqildi));
process.exit(yiqildi ? 1 : 0);
