/* ============================================================
   nashr.test.js — chiqarishdan oldingi qoidalar
   Ishga tushirish: node tests/nashr.test.js
   Fayllar matn sifatida o'qiladi: brauzer va server kerak emas.

   Bu yerda to'rtta qoida qat'iy tekshiriladi:
     1. Kirishdan oldin ommaviy oferta va maxfiylik bildirishnomasi qabul qilinadi.
     2. Yon paneldagi hisoblagich soni qo'lda yozilmaydi — faqat yozuvlardan sanaladi.
     3. Bosh sahifadan boshqa har bir sahifada ortga qaytish yo'li bor.
     4. Kod, izoh, hujjat va interfeysda taqiqlangan so'zlar qolmagan.
   Beshinchi bo'lim namoyish suratlari litsenziyasi va maxfiy ma'lumot izi bo'yicha.
   ============================================================ */
"use strict";
const fs = require("fs"), path = require("path"), cp = require("child_process");
const ILDIZ = path.join(__dirname, "..");
let otdi = 0, yiqildi = 0;
function tekshir(nom, fn){
  try{ fn(); otdi++; console.log("  [OK]   " + nom); }
  catch(e){ yiqildi++; console.log("  [XATO] " + nom + "\n         " + e.message); }
}
function talab(shart, xabar){ if (!shart) throw new Error(xabar); }
const matn = f => fs.readFileSync(path.join(ILDIZ, f), "utf8");
const bormi = f => fs.existsSync(path.join(ILDIZ, f));

const kirish = matn("kirish.html");
const app = matn("yadro/app.js");

/* Git kuzatuvidagi fayllar: tekshiruv doirasi shu ro'yxat bo'yicha olinadi */
function gitFayllar(){
  try{
    return cp.execSync("git ls-files", {cwd: ILDIZ, encoding: "utf8", maxBuffer: 8 << 20})
      .split("\n").map(s => s.trim()).filter(Boolean);
  }catch(_){ return null; }
}
const GIT = gitFayllar() || [];
/* Taqdimot (taqdimot.html, taqdimot/, yadro/taqdimot*) alohida egasi bor: u yerda ikkita so'z bank
   va tarmoq atamasi sifatida ishlatiladi. Ilova fayllari esa qat'iy tekshiriladi. */
const taqdimotmi = f => /^taqdimot\//.test(f) || f === "taqdimot.html" || /^yadro\/taqdimot/.test(f);
const matnFayl = f => /\.(html|js|css|md|json|txt)$/.test(f);

console.log("\n1. Kirishdan oldin oferta va maxfiylik bildirishnomasi qabul qilinadi");
tekshir("kirish formasida rozilik belgisi va ikkala hujjatga havola bor", () => {
  talab(/<input type="checkbox" id="rozilik"/.test(kirish), "rozilik belgisi yo'q");
  talab(/href="oferta\.html"/.test(kirish), "ofertaga havola yo'q");
  talab(/href="maxfiylik\.html"/.test(kirish), "maxfiylik bildirishnomasiga havola yo'q");
  talab(/bank siri va shaxsga doir ma&#39;lumotlar/.test(kirish),
    "nima uchun rozilik so'ralayotgani aytilmagan");
});
tekshir("rozilik olinmasa forma sessiya ochmaydi", () => {
  const p = kirish.indexOf('forma.addEventListener("submit"');
  talab(p > 0, "submit ishlovchisi yo'q");
  const tan = kirish.slice(p, p + 3000);
  const tosiq = tan.indexOf("rozilikXatoKorsat()");
  talab(tosiq > 0, "rozilik to'sig'i submit ichida yo'q");
  /* To'siq hisobga kirish chaqiruvidan oldin turishi shart */
  const kir = tan.search(/MKBapi\.kirish\(/);
  talab(kir < 0 || tosiq < kir, "rozilik to'sig'i MKBapi.kirish dan keyin turibdi");
  talab(/if \(!rozilikBormi\(\)\)\{ rozilikXatoKorsat\(\); return; \}/.test(tan),
    "roziliksiz submit to'xtatilmayapti");
});
tekshir("rozilik hisob yozuviga yoziladi, faqat brauzerda qolmaydi", () => {
  talab(/MKBapi\.yangilash\("FOYDLAR", *s\.id, *\{rozilik:/.test(kirish),
    "rozilik FOYDLAR yozuviga yozilmaydi");
  talab(/f\.rozilik\.tahrir === HUJJAT_TAHRIR/.test(kirish),
    "rozilik hujjat tahririga bog'lanmagan");
});
tekshir("ochiq sessiya ham rozilik tekshiruvidan o'tadi", () => {
  const p = kirish.indexOf("ochiqSessiya");
  talab(p > 0, "ochiq sessiya tarmog'i yo'q");
  talab(/rozilikJoriymi\(f0\)/.test(kirish), "ochiq sessiyada rozilik tekshirilmaydi");
  talab(/\|\| rozilikJoriymi\(f0\)\)\{ location\.replace/.test(kirish),
    "roziliksiz ochiq sessiya to'g'ridan-to'g'ri panelga o'tkazilmoqda");
});
tekshir("hujjat tahriri o'zgarsa rozilik qaytadan so'raladi", () => {
  const m = /const HUJJAT_TAHRIR = "([^"]+)"/.exec(kirish);
  talab(m, "HUJJAT_TAHRIR yo'q");
  talab(/rozilikBarchasi\(\)\.tahrirlar\[HUJJAT_TAHRIR\]/.test(kirish),
    "qurilmadagi belgi tahrirga bog'lanmagan");
  ["oferta.html", "maxfiylik.html"].forEach(f => {
    talab(bormi(f), f + " yo'q");
    talab(matn(f).includes(m[1]), f + " da hujjat tahriri " + m[1] + " ko'rsatilmagan");
  });
});
tekshir("oferta va maxfiylik sessiyasiz ochiladi va kirishga qaytaradi", () => {
  ["oferta.html", "maxfiylik.html"].forEach(f => {
    const t = matn(f);
    talab(/<body[^>]*data-ochiq="1"/.test(t), f + " sessiya so'raydi");
    talab(/href="kirish\.html"/.test(t), f + " dan kirishga qaytish yo'q");
  });
});

console.log("\n2. Yon paneldagi hisoblagich soni yozuvlardan sanaladi");
const yonBlok = (() => {
  const p = app.indexOf("function yonSonlar()");
  if (p < 0) return "";
  return app.slice(p, app.indexOf("function yonSonHTML"));
})();
tekshir("har bir son to'plamdan filtrlab sanaladi, qo'lda yozilmaydi", () => {
  talab(yonBlok, "yonSonlar yo'q");
  /* Har bir qosh("...", ...) chaqiruvi keyingi chaqiruvgacha bo'lgan bo'lak sifatida o'qiladi:
     ichida ko'p qatorli filtr bo'lgani uchun qavs bo'yicha ajratilmaydi */
  const boshlar = [...yonBlok.matchAll(/qosh\("([a-z]+)",/g)];
  talab(boshlar.length >= 5, "hisoblagich chaqiruvlari topilmadi: " + boshlar.length);
  boshlar.forEach((m, i) => {
    const tan = yonBlok.slice(m.index + m[0].length,
      i + 1 < boshlar.length ? boshlar[i + 1].index : yonBlok.length);
    talab(/\.length\s*\)?\s*[;+]/.test(tan), m[1] + ": son .length dan olinmayapti");
    talab(!/^\s*\d+\s*\)/.test(tan), m[1] + ": songa qo'lda qiymat berilgan");
  });
  talab(/doira\(D\.TASDIQLAR\)/.test(yonBlok), "tasdiqlar filial doirasidan o'tmayapti");
});
tekshir("hisoblagich manbasi — mavjud MKBapi to'plamlari", () => {
  const nomlar = [...new Set([...yonBlok.matchAll(/D\.([A-Z][A-Z_]{3,})/g)].map(m => m[1]))];
  talab(nomlar.length >= 6, "to'plam nomlari topilmadi: " + nomlar.join(","));
  const malumot = ["malumot.js", "malumot-kengaytma.js", "malumot-qoshimcha.js", "malumot-indeks.js"]
    .map(matn).join("\n");
  nomlar.forEach(n => talab(malumot.includes(n), "yo'q to'plam sanalmoqda: D." + n));
});
tekshir("nol bo'lsa belgi umuman chizilmaydi, 99 dan ortig'i qisqartiriladi", () => {
  const p = app.indexOf("function yonSonHTML");
  talab(p > 0, "yonSonHTML yo'q");
  const tan = app.slice(p, p + 600);
  talab(/if \(!\(n > 0\)\) return "";/.test(tan), "nolda belgi chizilmasligi ta'minlanmagan");
  talab(/YON_SON_CHEK \+ "\+"/.test(tan), "99+ qisqartmasi yo'q");
  talab(/Sizni kutmoqda: ' \+ n/.test(tan), "izohda haqiqiy son ko'rsatilmayapti");
});
tekshir("sahifalarda qo'lda yozilgan yon-son belgisi yo'q", () => {
  const xato = GIT.filter(f => /\.html$/.test(f) && !taqdimotmi(f))
    .filter(f => /class="yon-son"/.test(matn(f)));
  talab(!xato.length, "qo'lda yozilgan hisoblagich: " + xato.join(", "));
});
tekshir("yon panel bandlari hisoblagichni yonSonHTML dan oladi", () => {
  const p = app.indexOf("function yonChiz");
  talab(p > 0, "yonChiz yo'q");
  talab(app.slice(p, p + 8000).includes("yonSonHTML("), "yon panel hisoblagichni chizmayapti");
});

console.log("\n3. Ortga qaytish yo'li har bir sahifada bor");
const HTMLLAR = GIT.filter(f => /^[a-z0-9-]+\.html$/.test(f));
const ochiqmi = f => /<body[^>]*data-ochiq="1"/.test(matn(f));
const ISH = HTMLLAR.filter(f => !ochiqmi(f) && f !== "index.html" && f !== "taqdimot.html");
/* Bosh sahifalar: rol paneli, bo'lim markazi va daraxtdagi har bir bo'limning birinchi sahifasi.
   Ular tepaga chiqmaydi, shuning uchun ularda ota havolasi ham, orqaga tugmasi ham yo'q. */
const BOSH = (() => {
  const s = new Set();
  [...app.matchAll(/href: "([a-z0-9-]+\.html)"\}/g)].forEach(m => s.add(m[1]));
  const rb = /const ROL_BOSH = \{([\s\S]*?)\};/.exec(app);
  if (rb) [...rb[1].matchAll(/"([a-z0-9-]+\.html)"/g)].forEach(m => s.add(m[1]));
  const bbr = /const BOLIM_BOSH_ROL = \{([\s\S]*?)\n\};/.exec(app);
  if (bbr) [...bbr[1].matchAll(/"([a-z0-9-]+\.html)"/g)].forEach(m => s.add(m[1]));
  /* Bo'limlar jadvalida yo'q bo'lim (masalan "sozlama") markazi — daraxtdagi birinchi sahifa */
  const bolimlar = new Set([...app.matchAll(/\{kalit: "([a-z]+)",\s+yorliq:/g)].map(m => m[1]));
  const g = {window: {}};
  require("vm").runInNewContext(matn("yadro/daraxt.js"), g, {filename: "daraxt.js"});
  const D = g.window.MKB_DARAXT || g.MKB_DARAXT;
  if (D) Object.keys(D).forEach(k => {
    if (!bolimlar.has(k) && D[k] && D[k][0] && D[k][0].f) s.add(D[k][0].f);
  });
  return s;
})();
tekshir("ish sahifalari topildi", () => talab(ISH.length > 60, "ish sahifalari ro'yxati juda kalta: " + ISH.length));
tekshir("har bir ish sahifasida shapka va sarlavha qatori bor (orqaga shu yerga qo'yiladi)", () => {
  const xato = ISH.filter(f => {
    const t = matn(f);
    return !/class="hujjat-shapka"/.test(t) || !/class="hs-qator"/.test(t);
  });
  talab(!xato.length, "shapka yoki hs-qator yo'q: " + xato.join(", "));
});
tekshir("orqaga tugmasi sahifa chizilishida qo'yiladi", () => {
  talab(/yolakchaBelgisi\(\);\s*\n\s*orqagaChiz\(\);/.test(app), "orqagaChiz umumiy chizishda chaqirilmagan");
});
tekshir("bosh sahifadan boshqa har bir sahifa ota sahifani ko'rsatadi", () => {
  talab(BOSH.size >= 8, "bosh sahifalar ro'yxati topilmadi: " + BOSH.size);
  const xato = ISH.filter(f => !BOSH.has(f)).filter(f => {
    const m = /<div class="hs-yorliq"[^>]*>([\s\S]*?)<\/div>/.exec(matn(f));
    return !m || !/<a [^>]*href=/.test(m[1]);
  });
  talab(!xato.length, "ota sahifasi yo'q (orqaga qaytadigan joy yo'q): " + xato.join(", "));
});
tekshir("bosh sahifalarning o'zi ish sahifalari ro'yxatida bor", () => {
  const yoq = [...BOSH].filter(f => !HTMLLAR.includes(f));
  talab(!yoq.length, "bosh sahifa fayli yo'q: " + yoq.join(", "));
});
tekshir("sessiyasiz ochiladigan sahifalarda ham qaytish tugmasi bor", () => {
  /* index.html — yo'naltiruvchi sahifa: ekranda hech narsa yo'q, tugma ham kerak emas */
  const ochiq = HTMLLAR.filter(f => ochiqmi(f) && f !== "kirish.html" && f !== "index.html");
  talab(ochiq.length >= 4, "ochiq sahifalar topilmadi: " + ochiq.length);
  const xato = ochiq.filter(f => {
    const t = matn(f);
    return !/href="kirish\.html"/.test(t) && !/history\.back\(\)/.test(t);
  });
  talab(!xato.length, "qaytish yo'li yo'q: " + xato.join(", "));
});
tekshir("orqaga tugmasi faqat chop etishda yashiriladi", () => {
  const css = matn("yadro/app.css");
  const chop = css.indexOf("@media print");
  talab(chop > 0 && css.slice(chop, chop + 600).includes(".orqaga-tugma"), "chopda yashirilmagan");
  const xato = GIT.filter(f => /\.html$/.test(f) && !taqdimotmi(f))
    .filter(f => /\.orqaga-tugma[^{]*\{[^}]*display\s*:\s*none/.test(matn(f)));
  talab(!xato.length, "sahifa orqaga tugmasini o'chirmoqda: " + xato.join(", "));
});

console.log("\n4. Taqiqlangan so'zlar qolmagan");
/* So'zlar bo'g'inlardan yig'iladi: shu sinovning o'z matni ham tekshiruvdan o'tadi */
const b = (...q) => q.join("");
const TAQIQ = [
  {nom: b("A", "I"), re: new RegExp("\\b" + b("A", "I") + "\\b")},
  {nom: b("ag", "ent"), re: new RegExp("\\b" + b("ag", "ent") + "(?:lar|ning|iga|i|lari|s)?\\b|\\b" + b("аг", "ент"), "i")},
  {nom: b("au", "dit"), re: new RegExp("\\b" + b("au", "dit") + "|\\b" + b("ау", "дит"), "i")},
  {nom: b("Cla", "ude"), re: new RegExp(b("cla", "ude") + "|" + b("anthr", "opic"), "i")},
  {nom: b("gene", "rated"), re: new RegExp("\\b" + b("gene", "rated") + "\\b|" + b("сгенери", "рован"), "i")},
];
/* Sinov faylining o'zi chiqariladi: unda taqiqlangan so'zlar naqsh sifatida yoziladi */
const ILOVA = GIT.filter(f => matnFayl(f) && !taqdimotmi(f) && f !== "tests/nashr.test.js");
/* Qoldirilgan yagona joylar. Ro'yxat qotirilgan: yangi joy paydo bo'lsa sinov yiqiladi.
   robots.txt dagi qidiruv robotlari direktivasi — protokolning qat'iy nomi, ekranda ko'rinmaydi.
   tarjima.js dagi uchta yozuv faqat taqdimot matnini o'giradi; ilovaning birorta sahifasi
   ularni ishlatmaydi (tekshiruvi quyida). Ularni lug'at egasi olib tashlashi kerak. */
const ISTISNO = [
  {fayl: "robots.txt", so_z: TAQIQ[1].nom, parcha: "User-" + TAQIQ[1].nom},
  {fayl: "tarjima.js", so_z: TAQIQ[1].nom, parcha: "\"Sug'urta " + TAQIQ[1].nom + "i\""},
  {fayl: "tarjima.js", so_z: TAQIQ[2].nom, parcha: "\"" + TAQIQ[2].nom.replace("a", "A") + "or\""},
  {fayl: "tarjima.js", so_z: TAQIQ[2].nom, parcha: TAQIQ[2].nom + "ga yaroqli"},
];
/* Istisno parchasi olib tashlangan matn: qolgan hamma joyda so'z qat'iy taqiqlanadi */
function tozaMatn(f, so_z){
  let t = matn(f);
  ISTISNO.filter(i => i.fayl === f && i.so_z === so_z).forEach(i => {
    talab(t.includes(i.parcha), f + ": istisno endi yo'q, ro'yxatdan olib tashlansin — " + i.parcha);
    /* Istisno qatorini butunlay chiqarib tashlash: shu qatordagi boshqa hech narsa tekshirilmaydi */
    t = t.split("\n").filter(q => !q.includes(i.parcha)).join("\n");
  });
  return t;
}
tekshir("ilova fayllarida (taqdimotdan tashqari) beshta so'zning hech biri yo'q", () => {
  talab(ILOVA.length > 50, "tekshiriladigan fayl kam: " + ILOVA.length);
  const topilgan = [];
  ILOVA.forEach(f => {
    TAQIQ.forEach(q => {
      const m = q.re.exec(tozaMatn(f, q.nom));
      if (m) topilgan.push(f + ": " + q.nom + " (" + m[0] + ")");
    });
  });
  talab(!topilgan.length, topilgan.slice(0, 10).join("; "));
});
tekshir("istisno qilingan lug'at yozuvlari birorta sahifada ishlatilmaydi", () => {
  const sahifalar = GIT.filter(f => /\.(html|js)$/.test(f) && !taqdimotmi(f) && f !== "tarjima.js");
  const band = sahifalar.map(matn).join("\n");
  ISTISNO.filter(i => i.fayl === "tarjima.js").map(i => i.parcha.replace(/"/g, "")).forEach(k => {
    talab(!band.includes(k), "istisno yozuvi ilovada ishlatilmoqda: " + k);
  });
});
tekshir("taqdimotda ham uchta eng qat'iy so'z yo'q", () => {
  const T = GIT.filter(f => matnFayl(f) && taqdimotmi(f));
  talab(T.length > 0, "taqdimot fayllari topilmadi");
  const qattiq = [TAQIQ[0], TAQIQ[3], TAQIQ[4]];
  const topilgan = [];
  T.forEach(f => {
    const t = matn(f);
    qattiq.forEach(q => { const m = q.re.exec(t); if (m) topilgan.push(f + ": " + q.nom); });
  });
  talab(!topilgan.length, topilgan.slice(0, 10).join("; "));
});
tekshir("izoh va hujjatlarda tugallanmagan ish izlari yo'q", () => {
  const izlar = [/\bTODO\b/, /\bFIXME\b/, new RegExp(b("lorem", " ipsum"), "i")];
  const topilgan = [];
  ILOVA.filter(f => /\.(html|js|css)$/.test(f)).forEach(f => {
    const t = matn(f);
    izlar.forEach(re => { if (re.test(t)) topilgan.push(f + ": " + re.source); });
  });
  talab(!topilgan.length, topilgan.slice(0, 10).join("; "));
});

console.log("\n5. Namoyish suratlari va maxfiy ma'lumot");
const NAMUNA = path.join(ILDIZ, "assets", "namuna");
const suratlar = fs.readdirSync(NAMUNA).filter(f => f.endsWith(".webp"));
const asosiy = suratlar.filter(f => !/-k\.webp$/.test(f));
const MANBA = matn("assets/namuna/MANBA.md");
tekshir("MANBA.md har bir suratni muallif, litsenziya va manba bilan sanaydi", () => {
  const yoq = asosiy.filter(f => !MANBA.includes("`" + f + "`"));
  talab(!yoq.length, "MANBA.md da yo'q: " + yoq.join(", "));
  /* "## Ro'yxat" bo'limidagi jadval: fayl | aktiv turi | muallif | litsenziya | manba */
  const bosh = MANBA.search(/^## Ro'yxat$/m);
  talab(bosh > 0, "MANBA.md da \"## Ro'yxat\" bo'limi yo'q");
  const qator = MANBA.slice(bosh).split("\n").filter(l => /^\| `[a-z0-9-]+\.webp`/.test(l))
    .map(l => l.replace(/^\|\s*/, "").replace(/\s*\|\s*$/, "").split(" | "));
  talab(qator.length === asosiy.length, "ro'yxat qatori " + qator.length + ", surat " + asosiy.length);
  qator.forEach(q => {
    const nom = q[0].replace(/`/g, "");
    talab(q.length === 5, nom + ": jadval qatori to'liq emas (" + q.length + " ustun)");
    talab(asosiy.includes(nom), nom + ": bunday fayl yo'q");
    talab(q[1].trim().length > 2, nom + ": aktiv turi yozilmagan");
    talab(q[2].trim().length > 1, nom + ": muallif yozilmagan");
    talab(/^\[[^\]]+\]\(/.test(q[3]) && /creativecommons\.org|Public domain/.test(q[3]),
      nom + ": litsenziya ko'rsatilmagan");
    talab(/commons\.wikimedia\.org/.test(q[4]), nom + ": manba havolasi yo'q");
  });
});
tekshir("MANBA.md dagi surat soni haqiqiy songa teng", () => {
  const m = /Bu papkadagi (\d+) ta surat/.exec(MANBA);
  talab(m, "surat soni yozilmagan");
  talab(+m[1] === asosiy.length, "yozilgan " + m[1] + ", haqiqiy " + asosiy.length);
});
tekshir("har bir suratning eskizi bor, fayl 250 KB dan oshmaydi", () => {
  const eskizsiz = asosiy.filter(f => !suratlar.includes(f.replace(/\.webp$/, "-k.webp")));
  talab(!eskizsiz.length, "eskizi yo'q: " + eskizsiz.join(", "));
  const yetim = suratlar.filter(f => /-k\.webp$/.test(f))
    .filter(f => !asosiy.includes(f.replace(/-k\.webp$/, ".webp")));
  talab(!yetim.length, "yetim eskiz: " + yetim.join(", "));
  const ogir = asosiy.filter(f => fs.statSync(path.join(NAMUNA, f)).size > 250 * 1024);
  talab(!ogir.length, "250 KB dan og'ir: " + ogir.join(", "));
});
tekshir("transport suratlarida davlat raqami bo'yicha qayd bor", () => {
  const avto = asosiy.filter(f => /^(avto|texnika)-/.test(f));
  talab(avto.length > 0, "transport surati topilmadi");
  const yoq = avto.filter(f => !new RegExp("\\| `" + f.replace(/\./g, "\\.") + "` \\| (xiralashtirilgan|ko'rinmaydi)").test(MANBA));
  talab(!yoq.length, "davlat raqami qaydi yo'q: " + yoq.join(", "));
});
tekshir("maxfiy reyestr va server ombori git kuzatuvida yo'q", () => {
  talab(GIT.length, "git ls-files ishlamadi");
  const izi = GIT.filter(f => /^mahalliy\//.test(f) || /^server\/malumotlar\//.test(f) || /^v8\//.test(f));
  talab(!izi.length, "kuzatuvda maxfiy fayl: " + izi.join(", "));
  const gi = matn(".gitignore");
  ["mahalliy/", "server/malumotlar/", "v8/"].forEach(k => talab(gi.includes(k), ".gitignore da " + k + " yo'q"));
});
tekshir("birorta sahifa mahalliy reyestrni o'qimaydi va unga havola bermaydi", () => {
  const xato = GIT.filter(f => /\.html$/.test(f)).filter(f => /mahalliy\//.test(matn(f)));
  talab(!xato.length, "sahifada mahalliy/ ga murojaat: " + xato.join(", "));
  /* Yagona o'qish joyi — malumot.js dagi manba tanlovi, u ham faqat localhost orqali */
  const oqish = [...matn("malumot.js").matchAll(/["']mahalliy\/[^"']+["']/g)].map(m => m[0]);
  talab(oqish.length === 1 && oqish[0].includes("obyektlar.json"),
    "malumot.js mahalliy reyestrdan boshqa fayl ham o'qiyapti: " + oqish.join(", "));
});
tekshir("server mahalliy reyestrni tashqi manzildan bermaydi", () => {
  const s = matn("server/server.js");
  talab(/kichik\.startsWith\("\/mahalliy\/"\) && !mahalliyManzilmi\(req\)/.test(s),
    "server /mahalliy/ ni tashqi manzildan yopmayapti");
});
tekshir("namoyish ma'lumotida haqiqiy reyestr nusxasi yo'q", () => {
  /* Haqiqiy reyestr faqat mahalliy/obyektlar.json da yashaydi; kuzatuvdagi hech bir
     ma'lumot faylida u yerdagi belgi (manba: "mahalliy") bilan yozilgan yozuv bo'lmasin */
  const xato = GIT.filter(f => /^malumot.*\.js$/.test(f))
    .filter(f => /manba:\s*["']mahalliy["']/.test(matn(f)));
  talab(!xato.length, "namoyish faylida mahalliy yozuv: " + xato.join(", "));
});

console.log("\nYakun: o'tdi " + otdi + ", yiqildi " + yiqildi + ", jami " + (otdi + yiqildi));
process.exit(yiqildi ? 1 : 0);
