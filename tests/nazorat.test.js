"use strict";
/* ============================================================
   Himoya va monitoring ma'lumotlari, nazorat indeksi va rollar.
   Faqat node kerak. Ildizdan ishga tushiriladi:

       node tests/nazorat.test.js

   Ma'lumot to'liq kengaytirilgan holatda (267 aktiv) tekshiriladi:
   asosiy xatolar aynan kengaytmadan keyin paydo bo'ladi.
   Bino geometriyasi, qavat rejasi va 3D navigator tizimdan olib
   tashlangan; bu yerda ularga tayanadigan tekshiruv yo'q.
   ============================================================ */

const path = require("path");
const vm = require("vm"), fs = require("fs");
const ILDIZ = path.join(__dirname, "..");
const FAYLLAR = ["malumot.js", "malumot-qoshimcha.js", "malumot-kengaytma.js", "malumot-kirish.js", "malumot-indeks.js"];

function yukla() {
  FAYLLAR.forEach(f => { delete require.cache[require.resolve(path.join(ILDIZ, f))]; });
  global.window = {MKB_BUGUN: "2026-09-21"};
  FAYLLAR.forEach(f => require(path.join(ILDIZ, f)));
  return global.window.MKB_DATA;
}
const D = yukla();
const matn = f => fs.readFileSync(path.join(ILDIZ, f), "utf8");

function tekshir(shart, xabar) { if (!shart) throw new Error(xabar); }
const SINOVLAR = [];
function sinov(nom, fn) { SINOVLAR.push({nom, fn}); }

/* ---------- 1. Umumiy moslik ---------- */
sinov("moslik tekshiruvi to'liq reyestrda toza", () => {
  tekshir(D.YOZUVLAR.length >= 200, "reyestr kengaytirilmagan: " + D.YOZUVLAR.length);
  const xato = D.moslikTekshiruvi();
  tekshir(xato.length === 0, "moslik buzilgan:\n  " + xato.slice(0, 6).join("\n  "));
});

sinov("bino modeli va chizma skriptlari yuklanmaydi", () => {
  ["MKBbino", "MKBqavat", "MKBnav3d", "MKB3D"].forEach(k => tekshir(!(k in global.window), k + " hali mavjud"));
  tekshir(!("BINO_MODELLARI" in D), "D.BINO_MODELLARI hali mavjud");
  ["yadro/bino.js", "yadro/qavat.js", "yadro/nav3d.js", "yadro/obyekt-rasm.js"].forEach(f =>
    tekshir(!fs.existsSync(path.join(ILDIZ, f)), f + " o'chirilmagan"));
});

/* ---------- 2. Kirish nuqtalari va qurilmalar ---------- */
sinov("kirish nuqtalari mavjud binoli obyektga bog'langan", () => {
  D.KIRISH_NUQTALARI.forEach(n => {
    const y = D.topish(n.obyektId);
    tekshir(y, n.id + ": obyekt reyestrda yo'q");
    tekshir(D.binolimi(y), n.id + ": binosiz obyektda kirish nuqtasi");
  });
});

sinov("binoli obyektda kamida bitta, binosizda nol kirish nuqtasi", () => {
  const yoq = D.YOZUVLAR.filter(y => D.binolimi(y) && !D.obyektNuqtalari(y.id).length);
  const ortiqcha = D.YOZUVLAR.filter(y => !D.binolimi(y) && D.obyektNuqtalari(y.id).length);
  tekshir(!yoq.length, yoq.length + " ta binoli obyektda kirish nuqtasi yo'q");
  tekshir(!ortiqcha.length, ortiqcha.length + " ta binosiz obyektda kirish nuqtasi bor");
});

sinov("qurilma mavjud obyektga, nuqtaga yoki shlyuzga bog'langan", () => {
  D.QURILMALAR.forEach(q => {
    tekshir(D.OBYEKT_INDEKS[q.obyektId], q.id + ": obyekt yo'q");
    if (q.kirishNuqtaId) {
      const n = D.kirishNuqtasi(q.kirishNuqtaId);
      tekshir(n, q.id + ": kirish nuqtasi topilmadi");
      tekshir(n.obyektId === q.obyektId, q.id + ": qurilma va nuqta obyekti mos emas");
    }
    if (q.shlyuzId) {
      const s = D.qurilma(q.shlyuzId);
      tekshir(s && s.tur === "shlyuz", q.id + ": shlyuz topilmadi");
      tekshir(s.obyektId === q.obyektId, q.id + ": shlyuz boshqa obyektda");
    }
  });
});

sinov("nuqtadagi qurilmalar ro'yxati shu nuqtaga ishora qiladi", () => {
  D.KIRISH_NUQTALARI.forEach(n => (n.qurilmalar || []).forEach(id => {
    const q = D.qurilma(id);
    tekshir(q, n.id + ": qurilma " + id + " yo'q");
    tekshir(q.kirishNuqtaId === n.id, n.id + ": " + id + " boshqa nuqtaga bog'langan");
  }));
});

sinov("elektrsiz obyekt uchun qurilma turlari: Face ID va yong'in datchigi bor", () => {
  const k = D.QURILMA_TURLARI.map(t => t.kalit);
  ["faceid-terminal", "yongin-datchigi", "kamera-4G", "shlyuz", "GPS-treker"].forEach(t =>
    tekshir(k.includes(t), t + " qurilma turlarida yo'q"));
  D.QURILMALAR.forEach(q => tekshir(k.includes(q.tur), q.id + ": noma'lum tur " + q.tur));
});

sinov("katalogdagi har bir qurilma andozaga va turga bog'langan", () => {
  const turlar = D.QURILMA_TURLARI.map(t => t.kalit);
  D.QURILMA_KATALOG.forEach(k => {
    tekshir(turlar.includes(k.tur), k.id + ": noma'lum tur " + k.tur);
    tekshir(k.narxMin > 0 && k.narxMax >= k.narxMin, k.id + ": narx oralig'i noto'g'ri");
  });
  D.HIMOYA_ANDOZALARI.forEach(a => a.tarkib.forEach(([id]) =>
    tekshir(D.katalog(id), a.id + ": katalogda yo'q " + id)));
});

sinov("himoya smetasi: jihoz + o'rnatish + 12 oylik aloqa", () => {
  D.HIMOYA_ANDOZALARI.forEach(a => {
    const s = D.himoyaSmetasi(a.id, 2);
    tekshir(s && s.obyektSoni === 2, a.id + ": smeta yo'q");
    const jihozMin = s.qatorlar.reduce((x, q) => x + q.narxMin, 0);
    tekshir(Math.abs(jihozMin * 2 - s.jihoz[0]) < 1, a.id + ": jihoz yig'indisi (bir obyekt x 2) mos emas");
    tekshir(s.aloqaOy === 12, a.id + ": aloqa davri " + s.aloqaOy);
    tekshir(Math.abs(s.jami[0] - (s.jihoz[0] + s.ornatish[0] + s.aloqa)) < 1, a.id + ": jami mos emas");
    tekshir(s.taxminiy === true, a.id + ": taxminiy narx belgilanmagan");
  });
});

/* ---------- 3. Voqealar va jamlama ---------- */
sinov("voqealar, ruxsatlar va tashriflar yetim yozuvsiz", () => {
  D.KIRISH_VOQEALARI.forEach(v => {
    tekshir(D.kirishNuqtasi(v.kirishNuqtaId), v.id + ": nuqta yo'q");
    if (v.shaxsId) tekshir(D.shaxs(v.shaxsId), v.id + ": shaxs yo'q");
  });
  D.RUXSATLAR.forEach(r => {
    tekshir(D.shaxs(r.shaxsId), r.id + ": shaxs yo'q");
    tekshir(D.OBYEKT_INDEKS[r.obyektId], r.id + ": obyekt yo'q");
    (r.nuqtalar || []).forEach(n => tekshir(D.kirishNuqtasi(n), r.id + ": nuqta " + n + " yo'q"));
  });
  D.TASHRIFLAR.forEach(t => tekshir(D.OBYEKT_INDEKS[t.obyektId], t.id + ": obyekt yo'q"));
});

sinov("jamlama hisoblangan qiymatlarni qaytaradi", () => {
  const j = D.kirishJamlama();
  tekshir(j.nuqta === D.KIRISH_NUQTALARI.length, "nuqta soni mos emas");
  tekshir(j.onlayn + j.oflayn === j.nuqta, "onlayn va oflayn yig'indisi mos emas");
  tekshir(j.qurilma === D.QURILMALAR.length, "qurilma soni mos emas");
  tekshir(j.himoyalanganObyekt + j.qurilmasizObyekt === D.YOZUVLAR.length, "himoyalangan va qurilmasiz obyektlar yig'indisi mos emas");
  const ochiq = D.XAVFSIZLIK_HODISALARI.filter(D.ochiqHodisami).length + D.HODISALAR.filter(D.ochiqHodisami).length;
  tekshir(j.ochiqHodisa === ochiq, "ochiq hodisa soni mos emas: " + j.ochiqHodisa + " / " + ochiq);
});

/* ---------- 4. Nazorat indeksi ---------- */
sinov("indeks tarkibi og'irliklari 100 ga teng", () => {
  const n = D.nazoratIndeksi(D.YOZUVLAR[0]);
  const jami = n.tarkib.reduce((a, t) => a + t.ogirlik, 0);
  tekshir(jami === 100, "og'irliklar yig'indisi " + jami);
});

sinov("indeks 0 va 100 oralig'ida va tarkibdan hisoblanadi", () => {
  D.YOZUVLAR.forEach(y => {
    const n = D.nazoratIndeksi(y);
    tekshir(n.ball >= 0 && n.ball <= 100, y.id + ": ball oralig'i buzilgan " + n.ball);
    const qoldan = Math.round(n.tarkib.reduce((a, t) => a + t.ulush * t.ogirlik, 0));
    tekshir(qoldan === n.ball, y.id + ": ball tarkibga mos emas");
  });
});

sinov("ma'lumot yo'q bo'lsa indeks pasayadi", () => {
  const y = D.YOZUVLAR.find(x => D.SUGURTALAR.some(s => s.obyektId === x.id));
  tekshir(y, "polisli obyekt topilmadi");
  const asl = D.SUGURTALAR.slice();
  const oldingi = D.nazoratIndeksi(y).ball;
  D.SUGURTALAR.length = 0;
  asl.filter(s => s.obyektId !== y.id).forEach(s => D.SUGURTALAR.push(s));
  D.nazoratKeshTozala();
  const keyingi = D.nazoratIndeksi(y).ball;
  D.SUGURTALAR.length = 0;
  asl.forEach(s => D.SUGURTALAR.push(s));
  D.nazoratKeshTozala();
  tekshir(keyingi < oldingi, "polis olib tashlanganda indeks pasaymadi: " + oldingi + " -> " + keyingi);
});

sinov("sanalar yagona dd.mm.yyyy formatida saqlanadi", () => {
  const re = /^\d{2}\.\d{2}\.\d{4}( \d{2}:\d{2})?$/;
  const yomon = [];
  ["KORIKLAR", "BAHOLASHLAR", "SUGURTALAR", "HODISALAR", "LOTLAR", "SHARTNOMALAR", "XARAJATLAR", "SUD_MAJLISLAR",
   "TASHRIFLAR", "KIRISH_VOQEALARI", "MENING_VAZIFALARIM", "TASDIQLAR"].forEach(k => (D[k] || []).forEach(r => {
    Object.entries(r).forEach(([m, v]) => {
      if (/^(sana|boshlanish|tugash|muddat)$|Sana$/.test(m) && typeof v === "string" && v && !re.test(v)) yomon.push(k + "." + m + "=" + v);
    });
  }));
  tekshir(!yomon.length, yomon.length + " ta boshqa formatdagi sana: " + yomon.slice(0, 4).join("; "));
});

/* ---------- 5. Rollar ---------- */
const app = matn("yadro/app.js");
const blok = (bosh, oxir) => app.slice(app.indexOf(bosh), app.indexOf(oxir, app.indexOf(bosh)));
const rollar = [...blok("const ROL_KALIT", "};").matchAll(/"([^"]+)":\s*"([a-z]+)"/g)].map(m => ({nom: m[1], kalit: m[2]}));

sinov("beshta rol: to'rt ish roli va administrator, nomlar mijoz, server va namoyish hisoblarida bir xil", () => {
  tekshir(rollar.length === 5, "ROL_KALIT da " + rollar.length + " ta rol");
  ["admin", "rahbariyat", "obyekt", "nazorat", "buxgalteriya"].forEach(k =>
    tekshir(rollar.some(r => r.kalit === k), "rol kaliti yo'q: " + k));
  const srv = matn("server/server.js");
  const srvRollar = [...(/const ROL_BOLIMLAR = \{([\s\S]*?)\n\};/.exec(srv) || [])[1].matchAll(/^\s*"([^"]+)":/gm)].map(m => m[1]);
  rollar.forEach(r => tekshir(srvRollar.includes(r.nom), r.nom + " serverda yo'q"));
  tekshir(srvRollar.length === rollar.length, "serverda " + srvRollar.length + " ta rol");
  D.FOYDLAR.forEach(f => tekshir(rollar.some(r => r.nom === f.rol), f.nom + ": noma'lum rol " + f.rol));
});

sinov("har bir rolning qo'llanmasi bor", () => {
  const qol = matn("yadro/qollanma.js");
  rollar.forEach(r => tekshir(new RegExp("\\n\\s+" + r.kalit + ":").test(qol), r.kalit + " uchun qo'llanma yo'q"));
});

sinov("har bir rolning bosh sahifasi mavjud va rolga ochiq", () => {
  const bosh = blok("const ROL_BOSH", "};");
  rollar.forEach(r => {
    const m = new RegExp("\\b" + r.kalit + ':\\s*"([^"]+)"').exec(bosh);
    tekshir(m, r.kalit + ": bosh sahifa belgilanmagan");
    tekshir(fs.existsSync(path.join(ILDIZ, m[1])), m[1] + " topilmadi");
  });
});


/* ---------- 6. Yon panel va to'rt ko'z ---------- */
const bolimlar = [...blok("const BOLIMLAR", "];").matchAll(/kalit: "([a-z]+)"/g)].map(m => m[1]).concat(["sozlama"]);
const obj = (nom) => vm.runInNewContext("(" + new RegExp("const " + nom + " = (\\{[\\s\\S]*?\\n\\});").exec(app)[1] + ")");
const ROL_YON = obj("ROL_YON");
const ROL_RUXSAT = obj("ROL_RUXSAT");

sinov("hech bir rol yon panelda 6 banddan ko'p ko'rmaydi", () => {
  rollar.forEach(r => {
    const y = ROL_YON[r.kalit];
    tekshir(Array.isArray(y) && y.length, r.kalit + ": ROL_YON belgilanmagan");
    tekshir(y.length <= 6, r.kalit + ": yon panelda " + y.length + " band");
    y.forEach(k => tekshir(bolimlar.includes(k), r.kalit + ": noma'lum bo'lim " + k));
    tekshir(new Set(y).size === y.length, r.kalit + ": takrorlangan bo'lim");
  });
});

sinov("yon paneldagi har bir bo'lim rolga ochiq (ROL_RUXSAT yon paneldan keng)", () => {
  rollar.forEach(r => {
    const h = ROL_RUXSAT[r.kalit];
    if (h === null) return;                       /* administrator */
    ROL_YON[r.kalit].forEach(k =>
      tekshir((h[k] || "").indexOf("o") >= 0, r.kalit + ": yon paneldagi " + k + " bo'limi yopiq"));
  });
});

sinov("eski rol nomlari yangi rolga keltiriladi va mijoz bilan server bir xil jadvaldan foydalanadi", () => {
  const mijoz = obj("ROL_YANGI");
  const srv = matn("server/server.js");
  const srvY = vm.runInNewContext("(" + /const ROL_YANGI = (\{[\s\S]*?\n\});/.exec(srv)[1] + ")");
  tekshir(JSON.stringify(mijoz) === JSON.stringify(srvY), "ROL_YANGI mijoz va serverda farq qiladi");
  Object.keys(mijoz).forEach(eski => {
    tekshir(rollar.some(r => r.nom === mijoz[eski]), eski + " -> " + mijoz[eski] + ": bunday rol yo'q");
    tekshir(!rollar.some(r => r.nom === eski), eski + " hali ham amaldagi rol");
  });
});

sinov("qoidalar va namoyish hisoblari faqat amaldagi rollarni ishlatadi", () => {
  const nomlar = rollar.map(r => r.nom);
  (D.QOIDALAR || []).forEach(q => {
    if (q.qabulQiluvchiRol) tekshir(nomlar.includes(q.qabulQiluvchiRol), q.id + ": qabul qiluvchi rol " + q.qabulQiluvchiRol);
    if (q.eskalatsiyaRol) tekshir(nomlar.includes(q.eskalatsiyaRol), q.id + ": eskalatsiya roli " + q.eskalatsiyaRol);
  });
  (D.MENING_VAZIFALARIM || []).forEach(v => {
    if (v.rol) tekshir(nomlar.includes(v.rol), v.id + ": vazifa roli " + v.rol);
  });
});

sinov("to'rt ko'z: so'rovchi va qaror qiluvchi ajralgan", () => {
  const amal = matn("yadro/amal.js");
  tekshir(/TASDIQ_SORUVCHI = \{zaxira: \["buxgalteriya", "admin"\]\}/.test(amal), "zaxira so'rovini faqat buxgalteriya yuboradi");
  tekshir(/if \(TK\.ozimi\(t, s\)\) return null;/.test(amal), "o'z so'rovini hal qilish taqiqi yo'q");
  const srv = matn("server/server.js");
  ["tortKozXatosi", "kirishSorovXatosi", "chiqimXatosi", "zaxiraIstisnosi"].forEach(fn =>
    tekshir(new RegExp("function " + fn + "|async function " + fn).test(srv), "serverda " + fn + " yo'q"));
  tekshir(/if \(s\.rol !== "Rahbariyat"\) return null;/.test(srv), "zaxira stavkasini faqat Rahbariyat tasdiqlaydi");
  /* Kirish so'rovini yuborgan bo'lim uni o'zi hal qilmaydi: nazorat rolida tasdiq huquqi yo'q */
  tekshir((ROL_RUXSAT.nazorat.nazorat || "").indexOf("t") < 0, "nazorat o'z kirish so'rovini tasdiqlamasligi kerak");
  tekshir((ROL_RUXSAT.obyekt.nazorat || "").indexOf("t") >= 0, "kirish so'rovini obyekt menejeri hal qiladi");
  tekshir((ROL_RUXSAT.rahbariyat.nazorat || "").indexOf("t") >= 0, "kirish so'rovini rahbariyat ham hal qiladi");
  tekshir((ROL_RUXSAT.buxgalteriya.qiymat || "").indexOf("y") >= 0, "zaxira so'rovini buxgalteriya yozadi");
  tekshir((ROL_RUXSAT.rahbariyat.qiymat || "").indexOf("t") >= 0, "zaxira so'rovini rahbariyat tasdiqlaydi");
});

/* ---------- Ishga tushirish ---------- */
let otdi = 0, yiqildi = 0;
console.log("Himoya, nazorat indeksi va rollar tekshiruvi\n");
for (const t of SINOVLAR) {
  try { t.fn(); otdi++; console.log("  [OK]   " + t.nom); }
  catch (e) {
    yiqildi++;
    console.log("  [XATO] " + t.nom);
    console.log("         " + String(e.message).split("\n").join("\n         "));
  }
}
console.log("\nYakun: o'tdi " + otdi + ", yiqildi " + yiqildi + ", jami " + (otdi + yiqildi));
if (yiqildi > 0) process.exit(1);
