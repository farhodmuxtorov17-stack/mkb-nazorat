/* ============================================================
   boshqaruv.test.js — Sozlamalar bo'limi qoidalari (boshqaruv.js)
   Ishga tushirish: node tests/boshqaruv.test.js
   Brauzer va server kerak emas: ma'lumot fayllari Node da yuklanadi.

   1. SHA-256 va CSV nazorat yig'indisi
   2. Tashqi tizimlar katalogi (15 ta) va holat
   3. Saqlash muddatlari jadvali
   4. Huquqlarni ko'rib chiqish qoidalari
   5. Aktivlarni o'tkazish
   6. Amallar tarixining boshlang'ich yozuvlari
   7. Sahifalar qoidalarni ulagan
   ============================================================ */
"use strict";
const fs = require("fs"), path = require("path"), crypto = require("crypto");
const ILDIZ = path.join(__dirname, "..");
let otdi = 0, yiqildi = 0;
const kutilgan = [];
function tekshir(nom, fn){
  const p = (async () => { try{ await fn(); otdi++; console.log("  [OK]   " + nom); }
    catch(e){ yiqildi++; console.log("  [XATO] " + nom + "\n         " + e.message); } })();
  kutilgan.push(p);
  return p;
}
function talab(shart, xabar){ if (!shart) throw new Error(xabar); }
const matn = f => fs.readFileSync(path.join(ILDIZ, f), "utf8");

global.window = global;
window.MKB_BUGUN = "2026-09-21";
global.localStorage = {getItem(){ return null; }, setItem(){}, removeItem(){}};
["malumot.js", "malumot-qoshimcha.js", "malumot-kengaytma.js", "malumot-kirish.js", "malumot-indeks.js", "boshqaruv.js"]
  .forEach(f => require(path.join(ILDIZ, f)));
const D = window.MKB_DATA, B = window.MKB_BOSHQARUV;
const sana = (k, o, y) => new Date(y, o - 1, k);

(async () => {
console.log("\n1. SHA-256 va CSV nazorat yig'indisi");
await tekshir("SHA-256 Node crypto bilan bir xil (bo'sh, lotin, kirill, apostrof, 1 MB)", () => {
  const namuna = ["", "abc", "Amallar tarixi: O'zgartirildi", "Изменено: взыскание", "x".repeat(55), "y".repeat(64), "z".repeat(1 << 20)];
  namuna.forEach(m => {
    const k = crypto.createHash("sha256").update(m, "utf8").digest("hex");
    talab(B.sha256(m) === k, "mos emas: " + m.slice(0, 20) + " (" + m.length + ")");
  });
});
await tekshir("CSV matni MKB.csv bilan bir xil: qo'shtirnoq, ';' ajratgich, CRLF", () => {
  const app = matn("yadro/app.js");
  talab(/const e = v => '"' \+ String\(v == null \? "" : v\)\.replace\(\/"\/g, '""'\) \+ '"';/.test(app), "MKB.csv qiymat qolipi o'zgargan");
  talab(/\.map\(e\)\.join\(";"\)\]\.concat\(qatorlar\.map\(r => r\.map\(e\)\.join\(";"\)\)\)\.join\("\\r\\n"\)/.test(app), "MKB.csv qator qolipi o'zgargan");
  const t = B.csvMatn(["Vaqt", "Izoh"], [["21.09.2026 10:00", 'u "qo\'shtirnoq"'], ["", null]]);
  talab(t === '"Vaqt";"Izoh"\r\n"21.09.2026 10:00";"u ""qo\'shtirnoq"""\r\n"";""', "CSV matni: " + JSON.stringify(t));
  const n = B.csvNazorat(["A"], [["1"], ["2"]]);
  talab(n.soni === 2 && n.sha256 === crypto.createHash("sha256").update('"A"\r\n"1"\r\n"2"\r\n').digest("hex"), "nazorat yig'indisi noto'g'ri");
});

console.log("\n2. Tashqi tizimlar katalogi");
await tekshir("15 ta tizim: rejadagi 14 tasi va kommunal ta'minotchilar, id takrorlanmaydi", () => {
  const ids = B.TIZIMLAR.map(t => t.id);
  talab(ids.length === 15 && new Set(ids).size === 15, "soni yoki takror: " + ids.join(","));
  ["abs", "eauksion", "kadastr", "yhxx", "mib", "soliq", "mb", "mygov", "eimzo", "ad", "sms", "telegram", "qoriqlash", "iot", "kommunal"]
    .forEach(k => talab(ids.includes(k), "yo'q: " + k));
});
await tekshir("har bir kartada oqim, protokol, kanal, javobgar, kerakli hujjat va mavjud sahifa", () => {
  B.TIZIMLAR.forEach(t => {
    ["nom", "javobgar", "ketadi", "keladi", "protokol", "kanal", "qolda", "havola", "havolaNomi"].forEach(k => talab(String(t[k] || "").trim(), t.id + ": " + k + " bo'sh"));
    talab(B.YONALISH[t.yonalish], t.id + ": yo'nalish noto'g'ri");
    talab(Array.isArray(t.kerak) && t.kerak.length >= 2, t.id + ": ulash uchun kerakli hujjatlar kam");
    talab(B.TIZIM_GURUHLARI.some(g => g.kalit === t.guruh), t.id + ": guruh noto'g'ri");
    talab(fs.existsSync(path.join(ILDIZ, t.havola)), t.id + ": sahifa yo'q " + t.havola);
  });
});
await tekshir("holat to'plamdan olinadi: yozuv yo'q bo'lsa ulanmagan, manba qatori shunga mos", () => {
  const H = D.INTEGRATSIYA_HOLATLARI;
  talab(B.tizimHolati("mib", [], H).kalit === "ulanmagan", "yozuvsiz tizim ulanmagan emas");
  talab(B.tizimHolati("abs", [{id: "abs", holat: "ulangan", oxirgiSinxron: "01.09.2026"}], H).nom === "Ulangan", "ulangan holat o'qilmadi");
  talab(B.manbaMatni("abs", []) === "Manba: qo'lda · integratsiya ulanmagan", "manba qatori: " + B.manbaMatni("abs", []));
  talab(B.manbaMatni("abs", [{id: "abs", holat: "ulangan", oxirgiSinxron: "01.09.2026"}]) === "Manba: Bank ABS", "ulangan tizim manbasi");
  /* Sinxron sanasisiz "ulangan" belgisi ulangan hisoblanmaydi va qiymatlar manbasi qo'lda qoladi */
  const q = B.tizimHolati("abs", [{id: "abs", holat: "ulangan", oxirgiSinxron: null}], H);
  talab(q.kalit === "sozlanmoqda" && q.saqlangan === "ulangan" && /ma'lumot hali kelmagan/.test(q.nom), "dalilsiz ulangan: " + JSON.stringify(q));
  talab(B.manbaMatni("abs", [{id: "abs", holat: "ulangan"}]) === "Manba: qo'lda · integratsiya ulanmagan", "dalilsiz ulangan manbasi");
});
await tekshir("Telegram kartasi chet el serveri va shaxsiy ma'lumotsiz xabar talabini aytadi", () => {
  const t = B.TIZIMLAR.find(x => x.id === "telegram");
  talab(/O'zbekistondan tashqarida/.test(t.kerak.join(" ")) && /shaxsiy ma'lumotsiz/.test(t.ketadi), "cheklov yozilmagan");
});

console.log("\n3. Saqlash muddatlari");
await tekshir("olti tur, parametr id takrorlanmaydi, har birida asos, amal va javobgar", () => {
  talab(B.SAQLASH.length === 6, "soni " + B.SAQLASH.length);
  talab(new Set(B.SAQLASH.map(x => x.param)).size === 6, "param takrorlangan");
  ["Amallar tarixi", "Kirish jurnali", "Tashrifchi va pudratchi", "Kamera video arxivi", "Hujjat va surat", "Yopilgan hisob"]
    .forEach(t => talab(B.SAQLASH.some(x => x.tur === t), "tur yo'q: " + t));
  B.SAQLASH.forEach(x => { talab(x.asos && x.javobgar && B.OXIRIDA[x.oxirida], x.param + ": maydon bo'sh"); talab(x.tavsiya > 0, x.param + ": tavsiya"); });
});
await tekshir("jadval PARAMETRLAR dan o'qiydi: null qiymat saqlanmagan, manba asos bo'ladi", () => {
  const r = B.saqlashJadvali([{id: "videoSaqlashKun", qiymat: 45, manba: "Ichki buyruq 12"}, {id: "shaxsiyMalumotKun", qiymat: null}]);
  const v = r.find(x => x.param === "videoSaqlashKun"), s = r.find(x => x.param === "shaxsiyMalumotKun");
  talab(v.kun === 45 && v.saqlangan && v.asos === "Ichki buyruq 12", "video qatori");
  talab(s.kun === null && !s.saqlangan, "bo'sh qiymat saqlangan deb ko'rsatildi");
  talab(B.saqlashJadvali(D.PARAMETRLAR).find(x => x.param === "videoSaqlashKun").kun === 30, "namoyish qiymati o'qilmadi");
});
await tekshir("jurnal qiymatlari me'yoriy parametrlar ro'yxatiga kirmaydi", () => {
  talab(B.JURNAL_PARAM.includes("huquqKorikSana") && B.JURNAL_PARAM.includes("anonimOxirgi"), "ro'yxat to'liq emas");
  talab(/BQ\.JURNAL_PARAM\.includes\(p\.id\)/.test(matn("sozlamalar.html")), "sozlamalar filtrlamayapti");
});

console.log("\n4. Huquqlarni ko'rib chiqish");
const bugun = sana(21, 9, 2026);
const F = [
  {id: "1", nom: "Admin Bir", teg: "admin", rol: "Administrator", faol: true, sana: "01.01.2024"},
  {id: "2", nom: "Menejer Blok", teg: "obyekt", rol: "Obyekt menejeri", faol: false, sana: "01.01.2024"},
  {id: "3", nom: "Kirgan 89", teg: "obyekt", rol: "Obyekt menejeri", faol: true, sana: "01.01.2024", oxirgiKirish: "24.06.2026 09:00"},
  {id: "4", nom: "Kirgan 90", teg: "obyekt", rol: "Obyekt menejeri", faol: true, sana: "01.01.2024", oxirgiKirish: "23.06.2026 09:00"},
  {id: "5", nom: "Yangi hisob", teg: "nazorat", rol: "Ko'rik va xavfsizlik inspektori", faol: true, sana: "01.09.2026"},
  {id: "6", nom: "Blok Admin", teg: "admin", rol: "Administrator", faol: false, sana: "01.01.2024"},
];
const aktiv = {"Menejer Blok": 51, "Kirgan 89": 3};
const opts = (o) => Object.assign({aktivSoni: f => aktiv[f.nom] || 0, oxirgiKirish: f => B.oxirgiKirish(f, []), bugun, jurnalBoshi: null}, o);
const kodlar = (r, id) => r.find(x => x.f.id === id).sabablar.map(s => s.kod).join(",");
await tekshir("bloklangan, lekin aktivi bor hisob ushlanadi; aktivsiz bloklangan hisob ushlanmaydi", () => {
  const r = B.huquqKorigi(F, opts());
  talab(kodlar(r, "2") === "blok-aktiv", "2: " + kodlar(r, "2"));
  talab(r.find(x => x.f.id === "2").sabablar[0].soni === 51, "aktivlar soni");
  talab(kodlar(r, "6") === "", "aktivsiz bloklangan administrator ushlandi");
});
await tekshir("90 kun chegarasi: 89 kun — yo'q, 90 kun — ushlanadi", () => {
  const r = B.huquqKorigi(F, opts());
  talab(kodlar(r, "3") === "", "89 kun ushlandi");
  talab(kodlar(r, "4") === "kirmagan" && r.find(x => x.f.id === "4").sabablar[0].kun === 90, "90 kun ushlanmadi");
});
await tekshir("kirish qayd etilmagan hisob faqat jurnal 90 kunni qamrasa va hisob 90 kundan eski bo'lsa ushlanadi", () => {
  const G = [{id: "7", nom: "Jim", rol: "Obyekt menejeri", faol: true, sana: "01.01.2025"}, {id: "8", nom: "Yangi", rol: "Obyekt menejeri", faol: true, sana: "01.09.2026"}];
  talab(kodlar(B.huquqKorigi(G, opts({jurnalBoshi: sana(1, 9, 2026)})), "7") === "", "30 kunlik jurnal bilan ushlandi");
  const r = B.huquqKorigi(G, opts({jurnalBoshi: sana(1, 1, 2026)}));
  talab(kodlar(r, "7") === "kirmagan" && r.find(x => x.f.id === "7").sabablar[0].kun === null, "uzoq jurnal bilan ushlanmadi");
  talab(kodlar(r, "8") === "", "yangi hisob ushlandi");
});
await tekshir("bir nechta faol administrator: ikkalasi ushlanadi, bloklangani sanalmaydi", () => {
  talab(kodlar(B.huquqKorigi(F, opts()), "1") === "", "bitta faol administrator ushlandi");
  const G = F.concat([{id: "9", nom: "Admin Ikki", teg: "admin", rol: "Administrator", faol: true, sana: "01.01.2024", oxirgiKirish: "20.09.2026 10:00"}]);
  const r = B.huquqKorigi(G, opts());
  talab(kodlar(r, "1") === "admin-kop" && kodlar(r, "9") === "admin-kop", "ikki administrator ushlanmadi");
  talab(r.find(x => x.f.id === "9").sabablar[0].soni === 2, "bloklangan administrator ham sanaldi");
});
await tekshir("namoyish ma'lumotida bloklangan xodimning 51 ta aktivi topiladi", () => {
  const J = B.jurnal(D, []);
  const r = B.huquqKorigi(D.FOYDLAR, {aktivSoni: f => B.masulAktivlar(D, f.nom).length, oxirgiKirish: f => B.oxirgiKirish(f, J), bugun: D.bugun(), jurnalBoshi: B.jurnalBoshi(J)});
  const t = r.filter(x => x.sabablar.length);
  talab(t.length === 1 && t[0].f.faol === false && t[0].sabablar[0].soni === 51, "topilmalar: " + t.map(x => x.f.nom + " " + x.sabablar.map(B.sababMatni)).join("; "));
});
await tekshir("chorak: sana shu chorakda bo'lsa ko'rib chiqilgan hisoblanadi", () => {
  talab(B.chorak(bugun).c === 3 && B.chorak(bugun).oxiri.getDate() === 30, "chorak oxiri");
  talab(B.chorakdaMi("01.07.2026", bugun) && !B.chorakdaMi("30.06.2026", bugun) && !B.chorakdaMi(null, bugun), "chorak chegarasi");
});
await tekshir("rol sanasi: yozuvdagi maydon, keyin jurnaldagi rol o'zgarishi, keyin hisob ochilgan sana", () => {
  const f = {id: "U1", nom: "X", sana: "01.02.2024"};
  talab(B.rolSana(Object.assign({rolSana: "05.05.2025"}, f), []).manba === "yozuv", "maydon");
  const j = [{kolleksiya: "FOYDLAR", obyektId: "U1", vaqt: "10.03.2026 11:00", ozgarish: {rol: {eski: "A", yangi: "B"}}}];
  talab(B.rolSana(f, j).sana === "10.03.2026", "jurnal");
  talab(B.rolSana(f, []).sana === "01.02.2024" && B.rolSana(f, []).manba === "ochilgan", "ochilgan sana");
});

console.log("\n5. Aktivlarni o'tkazish");
await tekshir("har bir aktiv yangi mas'ulga yoziladi, xatoda nechtasi o'tgani aytiladi", async () => {
  const yozildi = [];
  const n = await B.aktivlarniOtkaz([{id: "A1"}, {id: "A2"}], "Yangi Mas'ul", async (id, p) => { yozildi.push(id + ":" + p.masul); });
  talab(n === 2 && yozildi.join() === "A1:Yangi Mas'ul,A2:Yangi Mas'ul", "yozuvlar: " + yozildi.join());
  let x = null;
  try{ await B.aktivlarniOtkaz([{id: "A1"}, {id: "A2"}, {id: "A3"}], "Y", async id => { if (id === "A2") throw new Error("server rad etdi"); }); }
  catch(e){ x = e; }
  talab(x && x.otkazildi === 1 && /1 ta aktiv o'tkazildi, A2 da to'xtadi/.test(x.message), "xato matni: " + (x && x.message));
});
await tekshir("nomzodlar faqat faol obyekt menejerlari, avval aktivi kamlari", () => {
  const f = D.FOYDLAR.find(x => x.faol === false);
  const v = B.masulNomzodlari(D, D.FOYDLAR, f);
  talab(v.length > 0 && v.every(([nom]) => { const x = D.FOYDLAR.find(y => y.nom === nom); return x.faol !== false && x.rol === "Obyekt menejeri" && x.id !== f.id; }), "nomzodlar noto'g'ri");
  const son = v.map(([, n]) => +/· (\d+) ta aktiv/.exec(n)[1]);
  talab(son.every((s, i) => !i || son[i - 1] <= s), "tartib: " + son.join(","));
});

console.log("\n6. Amallar tarixining boshlang'ich yozuvlari");
const BOSH = B.boshlangichAmallar(D);
await tekshir("namoyishda 150–200 ta yozuv, oxirgi 30 kun ichida, kelajakda emas", () => {
  talab(BOSH.length >= 150 && BOSH.length <= 200, "soni " + BOSH.length);
  const b = D.bugun(), bosh = new Date(b.getFullYear(), b.getMonth(), b.getDate() - 29), oxir = new Date(b.getFullYear(), b.getMonth(), b.getDate(), 23, 59);
  BOSH.forEach(a => { const d = B.sanaOl(a.vaqt); talab(d && d >= bosh && d <= oxir, "sana chegaradan tashqarida: " + a.vaqt); });
});
await tekshir("qaror, ko'rik, hodisa va aktiv tarixi bor; kirishdan boshqa yozuvlarda eski va yangi qiymat", () => {
  ["TASDIQLAR", "KORIKLAR", "HODISALAR", "YOZUVLAR", "SESSIYA"].forEach(k => talab(BOSH.some(a => a.kolleksiya === k), "yo'q: " + k));
  BOSH.filter(a => a.kolleksiya !== "SESSIYA").forEach(a => {
    const o = a.ozgarish ? Object.values(a.ozgarish) : [];
    talab(o.length && o.every(v => v && "eski" in v && "yangi" in v), a.id + ": eski/yangi yo'q");
  });
  talab(BOSH.some(a => a.turi === "kirish rad etildi"), "rad etilgan kirish yo'q");
});
await tekshir("id noyob, yangidan eskiga, bloklangan xodim blokdan keyin amal qilmaydi", () => {
  talab(new Set(BOSH.map(a => a.id)).size === BOSH.length, "id takrorlangan");
  const t = BOSH.map(a => B.sanaOl(a.vaqt).getTime());
  talab(t.every((x, i) => !i || t[i - 1] >= x), "tartib buzilgan");
  const blok = BOSH.find(a => a.kolleksiya === "FOYDLAR" && a.ozgarish && a.ozgarish.faol);
  talab(blok, "bloklash yozuvi yo'q");
  const f = D.FOYDLAR.find(x => x.id === blok.obyektId);
  talab(!BOSH.some(a => a.kim === f.nom && B.sanaOl(a.vaqt) > B.sanaOl(blok.vaqt)), "bloklangandan keyin amal bor");
});
await tekshir("mahalliy reyestrda boshlang'ich yozuv yo'q, yadro yozuvlari bo'lsa o'shalar olinadi", () => {
  talab(B.boshlangichAmallar(Object.assign({}, D, {MANBA: "mahalliy"})).length === 0, "mahalliyda yozuv bor");
  const x = [{id: "Y1", vaqt: "20.09.2026 10:00"}];
  talab(B.boshlangichAmallar(Object.assign({}, D, {AMALLAR_BOSH: x}))[0].id === "Y1", "AMALLAR_BOSH o'qilmadi");
});
await tekshir("jurnal haqiqiy amallarni boshlang'ichlar bilan vaqt bo'yicha birlashtiradi", () => {
  const h = [{id: "H1", vaqt: "22.09.2026 09:00", kim: "Z", turi: "kirish", kolleksiya: "SESSIYA"}];
  const j = B.jurnal(D, h);
  talab(j.length === BOSH.length + 1 && j[0].id === "H1", "birlashtirish");
  talab(B.oxirgiKirish({nom: "Z"}, j).getDate() === 22, "oxirgi kirish");
  talab(B.oxirgiKirish({nom: "Z", oxirgiKirish: "01.01.2026 08:00"}, j).getMonth() === 0, "FOYDLAR.oxirgiKirish ustun emas");
});

console.log("\n7. Sahifalar qoidalarni ulagan");
const SAHIFALAR = ["sozlamalar.html", "foydalanuvchilar.html", "foydalanuvchi.html", "rollar.html", "integratsiyalar.html", "amallar-tarixi.html", "tizim-holati.html"];
await tekshir("boshqaruv.js yadro/amal.js dan keyin, bir xil kesh kaliti bilan ulanadi", () => {
  SAHIFALAR.forEach(f => {
    const s = matn(f);
    const i = s.indexOf('src="boshqaruv.js?v='), j = s.indexOf('src="yadro/amal.js?v=');
    talab(i > j && j > 0, f + ": tartib");
    const v = new Set([...s.matchAll(/\?v=(\d+)/g)].map(m => m[1]));
    talab(v.size === 1, f + ": turli kalit");
  });
});
await tekshir("tizim holati faqat administratorga, amallar tarixi CSV nazorat yig'indisi bilan", () => {
  talab(/if \(MKB\.rol\(\) !== "admin"\)\{ location\.replace\("xato-403\.html\?sahifa=tizim-holati\.html"\)/.test(matn("tizim-holati.html")), "rol tekshiruvi yo'q");
  const at = matn("amallar-tarixi.html");
  talab(/B\.csvNazorat\(/.test(at) && /\["SHA-256", n\.sha256\]/.test(at), "CSV oxiridagi yig'indi yo'q");
  talab(/url\.get\("obyekt"\)/.test(at), "?obyekt= filtri yo'q");
});
await tekshir("ommaviy sinov manbasi va litsenziyasi yozilgan, bank qurilmasi emasligi aytilgan", () => {
  const i = matn("integratsiyalar.html"), t = matn("tizim-holati.html");
  talab(/Ommaviy namuna, bank qurilmasi emas/.test(i) && /test\.mosquitto\.org/.test(i), "MQTT sinovi belgisi");
  talab(/Open-Meteo\.com, ma&#39;lumot litsenziyasi CC BY 4\.0/.test(t) && /bank ma&#39;lumoti emas/.test(t), "Open-Meteo belgisi");
});
await tekshir("yangi fayllarda taqiqlangan so'zlar yo'q", () => {
  const b = (...q) => q.join("");
  const re = [new RegExp("\\b" + b("A", "I") + "\\b"), new RegExp("\\b" + b("ag", "ent") + "(?:lar|ning|iga|i|lari|s)?\\b|\\b" + b("аг", "ент"), "i"), new RegExp("\\b" + b("au", "dit"), "i"),
    new RegExp(b("cla", "ude") + "|" + b("anthr", "opic"), "i"), new RegExp("\\b" + b("gene", "rated") + "\\b", "i")];
  ["boshqaruv.js", "tests/boshqaruv.test.js"].concat(SAHIFALAR).forEach(f => {
    const s = matn(f);
    re.forEach(r => talab(!r.test(s), f + ": " + r.source));
  });
});

await Promise.all(kutilgan);
console.log("\nYakun: o'tdi " + otdi + ", yiqildi " + yiqildi + ", jami " + (otdi + yiqildi));
process.exit(yiqildi ? 1 : 0);
})();
