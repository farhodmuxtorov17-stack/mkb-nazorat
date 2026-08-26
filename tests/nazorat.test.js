"use strict";
/* ============================================================
   Kirish nazorati moduli, bino modeli va nazorat indeksi tekshiruvi.
   Faqat node kerak. Ildizdan ishga tushiriladi:

       node tests/nazorat.test.js

   Yondashuv: har bir tekshiruv buziladigan holatdan quriladi —
   ma'lumot to'liq kengaytirilgan holatda (64 obyekt) tekshiriladi,
   chunki asosiy xatolar aynan kengaytmadan keyin paydo bo'ladi.
   ============================================================ */

const path = require("path");
const ILDIZ = path.join(__dirname, "..");

function yukla() {
  ["yadro/bino.js", "malumot.js", "malumot-qoshimcha.js", "malumot-kengaytma.js",
   "malumot-kirish.js", "malumot-indeks.js"].forEach(f => {
    delete require.cache[require.resolve(path.join(ILDIZ, f))];
  });
  global.window = {};
  ["yadro/bino.js", "malumot.js", "malumot-qoshimcha.js", "malumot-kengaytma.js",
   "malumot-kirish.js", "malumot-indeks.js"].forEach(f => require(path.join(ILDIZ, f)));
  return {D: global.window.MKB_DATA, B: global.window.MKBbino};
}

const {D, B} = yukla();

function tekshir(shart, xabar) {
  if (!shart) throw new Error(xabar);
}

const SINOVLAR = [];
function sinov(nom, fn) { SINOVLAR.push({nom, fn}); }

/* ---------- 1. Ma'lumot mosligi ---------- */
sinov("moslik tekshiruvi to'liq reyestrni qamrab oladi", () => {
  tekshir(D.YOZUVLAR.length >= 60, "reyestr kengaytirilmagan: " + D.YOZUVLAR.length);
  const xato = D.moslikTekshiruvi();
  tekshir(xato.length === 0, "moslik buzilgan:\n  " + xato.slice(0, 6).join("\n  "));
});

sinov("moslik tekshiruvi buzilgan yozuvni ushlaydi", () => {
  const y = D.YOZUVLAR[D.YOZUVLAR.length - 1];
  const asl = y.qarz.jami;
  y.qarz.jami = asl + 100;
  const xato = D.moslikTekshiruvi();
  y.qarz.jami = asl;
  tekshir(xato.length > 0, "qasddan buzilgan yig'indi sezilmadi");
});

sinov("balansdagi obyektda qabul sanasi va ijro hujjati bor", () => {
  const buzuq = D.YOZUVLAR.filter(y =>
    ["musodara", "balans"].includes(y.ish.bosqich) &&
    (!y.mulk.qabul || y.ish.ijro === "Hali berilmagan"));
  tekshir(buzuq.length === 0, buzuq.length + " ta balansdagi obyekt hujjatsiz");
});

/* ---------- 2. Bino modeli ---------- */
sinov("bino modeli deterministik", () => {
  const a = B.model("AK-2025/0934", "Ma'muriy bino");
  const b = B.model("AK-2025/0934", "Ma'muriy bino");
  tekshir(JSON.stringify(a) === JSON.stringify(b), "bir xil kirishga turli model qaytdi");
});

sinov("xonalar gabaritdan chiqmaydi va ustma-ust tushmaydi", () => {
  const turlar = ["Ma'muriy bino", "Savdo majmuasi", "Ombor", "Kvartira",
                  "Turar-joy", "Ishlab chiqarish", "Yer uchastkasi", "Avtotransport"];
  let xona = 0;
  for (let i = 0; i < 120; i++) {
    const t = turlar[i % turlar.length];
    const m = B.model("SINOV-" + i, t);
    const g = m.gabarit;
    m.qavatlar.forEach(q => {
      q.xonalar.forEach(x => {
        xona++;
        tekshir(x.x >= -0.01 && x.y >= -0.01, t + " " + x.id + ": manfiy koordinata");
        tekshir(x.x + x.en <= g.en + 0.02 && x.y + x.chuq <= g.chuq + 0.02,
                t + " " + x.id + ": gabaritdan chiqdi");
        tekshir(x.en > 1.4 && x.chuq > 1.4, t + " " + x.id + ": xona juda kichik");
        tekshir(x.maydon > 0 && isFinite(x.maydon), t + " " + x.id + ": maydon noto'g'ri");
        tekshir(x.holat, t + " " + x.id + ": holat belgilanmagan");
      });
      ["yuqori", "past"].forEach(tomon => {
        const r = q.xonalar.filter(x => x.tomon === tomon).sort((a, b) => a.x - b.x);
        for (let k = 1; k < r.length; k++) {
          tekshir(r[k].x >= r[k - 1].x + r[k - 1].en - 0.03,
                  t + ": " + r[k - 1].id + " va " + r[k].id + " kesishdi");
        }
        if (r.length) {
          const o = r[r.length - 1];
          tekshir(Math.abs(o.x + o.en - (g.en - 0.4)) < 0.06, t + ": qatorda bo'shliq qoldi");
        }
      });
    });
  }
  tekshir(xona > 3000, "tekshirilgan xona juda kam: " + xona);
});

sinov("har bir xonaning yo'lakka chiqadigan eshigi bor", () => {
  const m = B.model("AK-2025/0934", "Ma'muriy bino");
  m.qavatlar.forEach(q => {
    q.xonalar.forEach(x => {
      const bor = q.eshiklar.some(e => e.xonaId === x.id);
      tekshir(bor, x.id + ": eshik yo'q");
    });
  });
});

sinov("derazalar faqat tashqi devorda", () => {
  const m = B.model("AK-2026/4471", "Savdo majmuasi");
  const g = m.gabarit, t = B.olcham.TASH_DEVOR;
  m.qavatlar.forEach(q => q.derazalar.forEach(d => {
    const tashqi = d.yonalish === "x"
      ? (Math.abs(d.y) < 0.01 || Math.abs(d.y - (g.chuq - t)) < 0.01)
      : (Math.abs(d.x) < 0.01 || Math.abs(d.x - (g.en - t)) < 0.01);
    tekshir(tashqi, "deraza tashqi devorda emas: " + JSON.stringify(d));
  }));
});

/* ---------- 3. Kirish nazorati ma'lumotlari ---------- */
sinov("kirish nuqtalari mavjud obyekt va qavatga bog'langan", () => {
  D.KIRISH_NUQTALARI.forEach(n => {
    tekshir(D.OBYEKT_INDEKS[n.obyektId], n.id + ": obyekt reyestrda yo'q");
    const m = D.BINO_MODELLARI[n.obyektId];
    tekshir(m, n.obyektId + ": bino modeli yo'q");
    tekshir(m.qavatlar.some(q => q.raqam === n.qavat), n.id + ": qavat modelda yo'q");
  });
});

sinov("qurilmalar mavjud kirish nuqtasiga bog'langan", () => {
  D.QURILMALAR.forEach(q => {
    tekshir(D.kirishNuqtasi(q.kirishNuqtaId), q.id + ": kirish nuqtasi topilmadi");
    tekshir(q.obyektId === D.kirishNuqtasi(q.kirishNuqtaId).obyektId,
            q.id + ": qurilma va nuqta obyekti mos emas");
  });
});

sinov("voqealar va ruxsatlar yetim yozuvsiz", () => {
  D.KIRISH_VOQEALARI.forEach(v => {
    tekshir(D.kirishNuqtasi(v.kirishNuqtaId), v.id + ": nuqta yo'q");
    if (v.shaxsId) tekshir(D.shaxs(v.shaxsId), v.id + ": shaxs yo'q");
  });
  D.RUXSATLAR.forEach(r => {
    tekshir(D.shaxs(r.shaxsId), r.id + ": shaxs yo'q");
    tekshir(D.OBYEKT_INDEKS[r.obyektId], r.id + ": obyekt yo'q");
    r.nuqtalar.forEach(n => tekshir(D.kirishNuqtasi(n), r.id + ": nuqta " + n + " yo'q"));
  });
});

sinov("jamlama hisoblangan qiymatlarni qaytaradi", () => {
  const j = D.kirishJamlama();
  tekshir(j.nuqta === D.KIRISH_NUQTALARI.length, "nuqta soni mos emas");
  tekshir(j.onlayn + j.oflayn === j.nuqta, "onlayn va oflayn yig'indisi mos emas");
  tekshir(j.qurilma === D.QURILMALAR.length, "qurilma soni mos emas");
  tekshir(j.ochiqHodisa === D.XAVFSIZLIK_HODISALARI.filter(h => h.holat !== "yopildi").length,
          "ochiq hodisa soni mos emas");
});

sinov("model va reyestr kirish nuqtalari soni bir xil", () => {
  const farq = [];
  D.YOZUVLAR.forEach(y => {
    const m = B.model(y.id, y.mulk.tur, y.mulk.qisqa, y.mulk.maydon);
    const r = D.obyektNuqtalari(y.id).length;
    if (m.kirishNuqtaSoni !== r) farq.push(y.id + ": model " + m.kirishNuqtaSoni + ", reyestr " + r);
  });
  tekshir(farq.length === 0, farq.slice(0, 4).join("; "));
});

sinov("bino maydoni reyestrdagi maydonga mos", () => {
  const farq = [];
  D.YOZUVLAR.forEach(y => {
    const m = B.model(y.id, y.mulk.tur, y.mulk.qisqa, y.mulk.maydon);
    if (!m.binoli) return;
    const t = String(y.mulk.maydon || "").replace(/\s| /g, "").match(/(\d+([.,]\d+)?)/);
    if (!t) return;
    const talab = parseFloat(t[1].replace(",", "."));
    const n = m.maydon / talab;
    if (n < 0.75 || n > 1.35) farq.push(y.id + ": reyestr " + talab + ", model " + m.maydon);
  });
  tekshir(farq.length === 0, farq.slice(0, 4).join("; "));
});

sinov("bino tuzilmasi yuritilmaydigan turlar belgilangan", () => {
  const yer = D.YOZUVLAR.find(y => y.mulk.tur === "Yer uchastkasi");
  const bino = D.YOZUVLAR.find(y => y.mulk.tur === "Ishlab chiqarish" || y.mulk.tur === "Ombor");
  if (yer) tekshir(!B.model(yer.id, yer.mulk.tur).binoli, "yer uchastkasi binoli deb belgilangan");
  if (bino) tekshir(B.model(bino.id, bino.mulk.tur, bino.mulk.qisqa, bino.mulk.maydon).binoli,
                    "bino turi binosiz deb belgilangan");
});

sinov("har bir obyektda kamida bitta kirish nuqtasi bor", () => {
  const yoq = D.YOZUVLAR.filter(y => !D.obyektNuqtalari(y.id).length);
  tekshir(yoq.length === 0, yoq.length + " ta obyektda kirish nuqtasi yo'q");
});

/* ---------- 4. Nazorat indeksi ---------- */
sinov("indeks tarkibi og'irliklari 100 ga teng", () => {
  const n = D.nazoratIndeksi(D.YOZUVLAR[0]);
  const jami = n.tarkib.reduce((a, t) => a + t.ogirlik, 0);
  tekshir(jami === 100, "og'irliklar yig'indisi " + jami);
});

sinov("indeks 0 va 100 oralig'ida va ma'lumotdan hisoblanadi", () => {
  D.YOZUVLAR.forEach(y => {
    const n = D.nazoratIndeksi(y);
    tekshir(n.ball >= 0 && n.ball <= 100, y.id + ": ball oralig'i buzilgan " + n.ball);
    const qoldan = Math.round(n.tarkib.reduce((a, t) => a + t.ulush * t.ogirlik, 0));
    tekshir(qoldan === n.ball, y.id + ": ball tarkibga mos emas");
  });
});

sinov("ma'lumot yo'q bo'lsa indeks pasayadi", () => {
  const y = D.YOZUVLAR.find(x => D.SUGURTALAR.some(s => s.obyektId === x.id));
  const asl = D.SUGURTALAR.filter(s => s.obyektId === y.id);
  const boshqa = D.SUGURTALAR.filter(s => s.obyektId !== y.id);
  const oldingi = D.nazoratIndeksi(y).ball;
  D.SUGURTALAR.length = 0;
  boshqa.forEach(s => D.SUGURTALAR.push(s));
  delete require.cache[require.resolve(path.join(ILDIZ, "malumot-indeks.js"))];
  const kesh = D.__nazoratIndeksi;
  D.__nazoratIndeksi = false;
  require(path.join(ILDIZ, "malumot-indeks.js"));
  const keyingi = D.nazoratIndeksi(y).ball;
  asl.forEach(s => D.SUGURTALAR.push(s));
  D.__nazoratIndeksi = kesh;
  tekshir(keyingi < oldingi, "polis olib tashlanganda indeks pasaymadi: " + oldingi + " -> " + keyingi);
});

sinov("sana tahlilchisi ikkala formatni tushunadi", () => {
  const uz = D.KORIKLAR.find(k => /-[a-z]{3},/.test(k.sana));
  const nuqtali = D.BAHOLASHLAR.find(b => /^\d{2}\.\d{2}\.\d{4}$/.test(b.sana));
  tekshir(uz, "«26-avg, 2026» ko'rinishidagi sana topilmadi");
  tekshir(nuqtali, "«02.06.2026» ko'rinishidagi sana topilmadi");
  const y = D.YOZUVLAR.find(x => x.id === uz.obyektId);
  if (y) {
    const n = D.nazoratIndeksi(y);
    const korik = n.tarkib.find(t => t.kalit === "korik");
    tekshir(korik.qiymat !== "o'tkazilmagan" || korik.ulush < 0.5,
            "uzbekcha sana o'qilmadi: " + korik.qiymat);
  }
});

/* ---------- 5. Rollar ---------- */
sinov("rollar barcha manbalarda bir xil", () => {
  const fs = require("fs");
  const app = fs.readFileSync(path.join(ILDIZ, "yadro", "app.js"), "utf8");
  const rollar = [...app.matchAll(/^\s*"([^"]+)":\s*"([a-z]+)",/gm)]
    .filter(m => app.slice(app.indexOf("const ROL_KALIT"), app.indexOf("const ROL_RUXSAT")).includes(m[0]))
    .map(m => ({nom: m[1], kalit: m[2]}));
  tekshir(rollar.length >= 5, "ROL_KALIT o'qilmadi");

  const qol = fs.readFileSync(path.join(ILDIZ, "yadro", "qollanma.js"), "utf8");
  rollar.forEach(r => tekshir(new RegExp("\\n  " + r.kalit + ":").test(qol),
                              r.kalit + " uchun qo'llanma yo'q"));

  const srv = fs.readFileSync(path.join(ILDIZ, "server", "server.js"), "utf8");
  rollar.forEach(r => tekshir(srv.includes('"' + r.nom + '"'),
                              r.nom + " serverda ro'yxatdan o'tmagan"));

  D.FOYDLAR.forEach(f => tekshir(rollar.some(r => r.nom === f.rol),
                                 f.nom + ": noma'lum rol " + f.rol));
});

sinov("har bir rolning bosh sahifasi mavjud", () => {
  const fs = require("fs");
  const app = fs.readFileSync(path.join(ILDIZ, "yadro", "app.js"), "utf8");
  const blok = app.slice(app.indexOf("const ROL_KALIT"), app.indexOf("const ROL_RUXSAT"));
  [...blok.matchAll(/"([a-z]+)",/g)].map(m => m[1]).forEach(kalit => {
    const fayl = kalit === "admin" ? "panel.html" : "panel-" + kalit + ".html";
    tekshir(fs.existsSync(path.join(ILDIZ, fayl)), fayl + " topilmadi");
  });
});

/* ---------- Ishga tushirish ---------- */
let otdi = 0, yiqildi = 0;
console.log("Kirish nazorati va bino modeli tekshiruvi\n");
for (const t of SINOVLAR) {
  try {
    t.fn();
    otdi++;
    console.log("  [OK]   " + t.nom);
  } catch (e) {
    yiqildi++;
    console.log("  [XATO] " + t.nom);
    console.log("         " + String(e.message).split("\n").join("\n         "));
  }
}
console.log("\nYakun: o'tdi " + otdi + ", yiqildi " + yiqildi + ", jami " + (otdi + yiqildi));
if (yiqildi > 0) process.exit(1);
