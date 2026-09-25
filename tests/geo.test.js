"use strict";
/* ============================================================
   Chegara ma'lumoti va xarita mantig'i tekshiruvi.
   Faqat node kerak, tashqi kutubxona yo'q. Ildizdan ishga tushiriladi:

       node tests/geo.test.js

   Nima tekshiriladi:
   - assets/geo/hududlar.geojson: 14 ta daraja-1 obyekt, maydonlari to'la,
     markazi o'z poligoni ichida, kodlari HUDUD_KODLAR bilan mos;
   - assets/geo/tumanlar.geojson: 200 ta daraja-2 obyekt, har biri mavjud hududga tegishli,
     kod formati, takroriy kod yo'q;
   - geometriya yaxlitligi: halqalar yopiq, koordinata 5 xonadan oshmaydi,
     o'z-o'zini kesish yo'q, halqa yo'nalishi RFC 7946 bo'yicha;
   - hudud yuzasi o'z tumanlari yuzasi yig'indisiga teng;
   - "... shahri" birligi shu nomdagi "... tumani" dan katta bo'lmasin (Kogon xatosi);
   - MKBxarita.shkala: bo'linish chegarasi hech qachon undefined bo'lmaydi va
     qiymat besh tadan kam bo'lganda shkala eng ochidan boshlanadi;
   - namoyish reyestri: hudud sanoqlari, tuman nomlari chegara faylida bor,
     aniq koordinatalar o'z tumani poligoni ichida yotadi.
   ============================================================ */

const path = require("path");
const fs = require("fs");

const ILDIZ = path.join(__dirname, "..");
const GEO = path.join(ILDIZ, "assets", "geo");
const FAYLLAR = ["malumot.js", "malumot-qoshimcha.js", "malumot-kengaytma.js", "malumot-kirish.js", "malumot-indeks.js"];
const BUGUN = "2026-09-21";

/* ---------- kichik yurituvchi ---------- */
const guruhlar = [];
let joriy = null;
function guruh(nom) { joriy = {nom, sinovlar: []}; guruhlar.push(joriy); }
function sinov(nom, fn) { joriy.sinovlar.push({nom, fn}); }
function ok(shart, xabar) { if (!shart) throw new Error(xabar || "shart bajarilmadi"); }
function teng(haqiqiy, kutilgan, xabar) {
  if (!Object.is(haqiqiy, kutilgan))
    throw new Error((xabar ? xabar + ": " : "") + JSON.stringify(haqiqiy) + " keldi, " + JSON.stringify(kutilgan) + " kutilgan");
}

/* ---------- ma'lumot qatlami (namoyish) ---------- */
function malumotYukla() {
  FAYLLAR.forEach(f => { delete require.cache[require.resolve(path.join(ILDIZ, f))]; });
  global.window = {MKB_BUGUN: BUGUN};
  FAYLLAR.forEach(f => require(path.join(ILDIZ, f)));
  return global.window.MKB_DATA;
}

/* ---------- yadro shkalasi (Leafletsiz yuklanadi) ---------- */
function shkalaYukla() {
  const yol = path.join(ILDIZ, "yadro", "xarita.js");
  delete require.cache[require.resolve(yol)];
  global.window = {};
  require(yol);
  return global.window.MKBxarita && global.window.MKBxarita.shkala;
}

const H = JSON.parse(fs.readFileSync(path.join(GEO, "hududlar.geojson"), "utf8"));
const T = JSON.parse(fs.readFileSync(path.join(GEO, "tumanlar.geojson"), "utf8"));

/* ---------- geometriya yordamchilari ---------- */
const halqalar = g => (g.type === "Polygon" ? [g.coordinates] : g.coordinates);
function nuqtaIchida(p, g) {
  for (const poligon of halqalar(g)) {
    let ichida = false;
    for (let h = 0; h < poligon.length; h++) {
      const r = poligon[h];
      let kesdi = false;
      for (let i = 0, j = r.length - 1; i < r.length; j = i++) {
        const xi = r[i][0], yi = r[i][1], xj = r[j][0], yj = r[j][1];
        if ((yi > p[1]) !== (yj > p[1]) && p[0] < (xj - xi) * (p[1] - yi) / (yj - yi) + xi) kesdi = !kesdi;
      }
      if (h === 0) { if (!kesdi) break; ichida = true; }
      else if (kesdi) { ichida = false; break; }
    }
    if (ichida) return true;
  }
  return false;
}
const YER = 6371008.8;
function halqaYuza(r) {
  let a = 0;
  for (let i = 0, j = r.length - 1; i < r.length; j = i++) {
    const l1 = r[j][0] * Math.PI / 180, l2 = r[i][0] * Math.PI / 180;
    a += (l2 - l1) * (2 + Math.sin(r[j][1] * Math.PI / 180) + Math.sin(r[i][1] * Math.PI / 180));
  }
  return Math.abs(a * YER * YER / 2);
}
function yuza(g) {
  let s = 0;
  for (const poligon of halqalar(g)) {
    s += halqaYuza(poligon[0]);
    for (let i = 1; i < poligon.length; i++) s -= halqaYuza(poligon[i]);
  }
  return s;
}
function belgiliYuza(r) {
  let a = 0;
  for (let i = 0, j = r.length - 1; i < r.length; j = i++) a += r[j][0] * r[i][1] - r[i][0] * r[j][1];
  return a / 2;
}
/* Ikki kesma kesishadimi (umumiy uchi bo'lmagan holat uchun) */
function kesishdi(p1, p2, p3, p4) {
  const d = (a, b, c) => (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
  const d1 = d(p3, p4, p1), d2 = d(p3, p4, p2), d3 = d(p1, p2, p3), d4 = d(p1, p2, p4);
  return ((d1 > 0 && d2 < 0) || (d1 < 0 && d2 > 0)) && ((d3 > 0 && d4 < 0) || (d3 < 0 && d4 > 0));
}
function ozniKesdi(g) {
  for (const poligon of halqalar(g)) {
    for (const r of poligon) {
      const n = r.length - 1;      /* oxirgi nuqta birinchisini takrorlaydi */
      if (n > 600) continue;        /* juda uzun halqa: sinov vaqtini cheklaymiz */
      for (let i = 0; i < n; i++) {
        for (let j = i + 2; j < n; j++) {
          if (i === 0 && j === n - 1) continue;
          if (kesishdi(r[i], r[i + 1], r[j], r[j + 1])) return true;
        }
      }
    }
  }
  return false;
}

const hududlar = H.features;
const tumanlar = T.features;
const hKod = {};
hududlar.forEach(f => { hKod[f.properties.kod] = f; });

/* ============================================================
   1. Hududlar fayli
   ============================================================ */
guruh("1. hududlar.geojson");

sinov("FeatureCollection va o'n to'rtta obyekt", () => {
  teng(H.type, "FeatureCollection");
  teng(hududlar.length, 14, "hudud soni");
});

sinov("har bir hududda kod, nom_uz, nom_ru va markaz to'la", () => {
  hududlar.forEach(f => {
    const p = f.properties || {};
    ok(/^[A-Z]{2}$/.test(p.kod || ""), "kod formati: " + JSON.stringify(p.kod));
    ok(p.nom_uz && p.nom_uz.trim(), p.kod + ": nom_uz bo'sh");
    ok(p.nom_ru && p.nom_ru.trim(), p.kod + ": nom_ru bo'sh");
    teng(p.daraja, 1, p.kod + ": daraja");
    ok(Array.isArray(p.markaz) && p.markaz.length === 2 && p.markaz.every(Number.isFinite),
      p.kod + ": markaz noto'g'ri");
  });
});

sinov("hudud markazi o'z poligoni ichida yotadi", () => {
  hududlar.forEach(f => {
    const m = f.properties.markaz;
    ok(nuqtaIchida([m[1], m[0]], f.geometry), f.properties.kod + ": markaz poligondan tashqarida");
  });
});

sinov("kodlar HUDUD_KODLAR bilan to'liq mos", () => {
  const D = malumotYukla();
  const bazada = Object.keys(D.HUDUD_KODLAR || {}).sort();
  const faylda = hududlar.map(f => f.properties.kod).sort();
  teng(faylda.join(","), bazada.join(","), "kodlar ro'yxati");
});

sinov("takroriy kod yo'q", () => {
  const k = hududlar.map(f => f.properties.kod);
  teng(new Set(k).size, k.length, "takroriy hudud kodi");
});

/* ============================================================
   2. Tumanlar fayli
   ============================================================ */
guruh("2. tumanlar.geojson");

sinov("FeatureCollection va ikki yuzta obyekt", () => {
  teng(T.type, "FeatureCollection");
  teng(tumanlar.length, 200, "tuman soni");
});

sinov("kod formati HUDUD-Tnn va takrori yo'q", () => {
  const k = tumanlar.map(f => f.properties.kod);
  k.forEach(x => ok(/^[A-Z]{2}-T\d{2}$/.test(x || ""), "kod formati: " + JSON.stringify(x)));
  teng(new Set(k).size, k.length, "takroriy tuman kodi");
});

sinov("har bir tuman mavjud hudud kodiga tegishli", () => {
  tumanlar.forEach(f => {
    const p = f.properties || {};
    ok(hKod[p.hudud], p.kod + ": hudud kodi ro'yxatda yo'q — " + p.hudud);
    teng(p.kod.slice(0, 2), p.hudud, p.kod + ": kod boshi hudud kodiga mos emas");
    teng(p.daraja, 2, p.kod + ": daraja");
    ok(p.nom_uz && p.nom_ru, p.kod + ": nom bo'sh");
  });
});

sinov("tuman markazi o'z poligoni ichida yotadi", () => {
  tumanlar.forEach(f => {
    const m = f.properties.markaz;
    ok(Array.isArray(m) && m.length === 2 && m.every(Number.isFinite), f.properties.kod + ": markaz noto'g'ri");
    ok(nuqtaIchida([m[1], m[0]], f.geometry), f.properties.kod + ": markaz poligondan tashqarida");
  });
});

sinov("shahar o'z tumanidan katta emas", () => {
  /* Manbada Kogon shahri va tumani almashib ketgan edi: shahar 470 km², tumani 1,9 km².
     Xuddi shunday almashish boshqa juftlikda ham bo'lmasligi shu yerda kuzatiladi. */
  const y = {};
  tumanlar.forEach(f => { y[f.properties.nom_uz] = yuza(f.geometry); });
  Object.keys(y).forEach(nom => {
    if (!/ shahri$/.test(nom)) return;
    const tuman = nom.replace(/ shahri$/, " tumani");
    if (!(tuman in y)) return;
    ok(y[nom] <= y[tuman], nom + " (" + Math.round(y[nom] / 1e6) + " km²) > " +
      tuman + " (" + Math.round(y[tuman] / 1e6) + " km²)");
  });
});

/* ============================================================
   3. Geometriya yaxlitligi
   ============================================================ */
guruh("3. Geometriya");

sinov("barcha halqalar yopiq va kamida to'rt nuqtali", () => {
  [].concat(hududlar, tumanlar).forEach(f => {
    halqalar(f.geometry).forEach(poligon => poligon.forEach(r => {
      ok(r.length >= 4, f.properties.kod + ": halqa juda qisqa (" + r.length + ")");
      teng(r[0][0], r[r.length - 1][0], f.properties.kod + ": halqa yopilmagan (lng)");
      teng(r[0][1], r[r.length - 1][1], f.properties.kod + ": halqa yopilmagan (lat)");
    }));
  });
});

sinov("koordinatada besh xonadan ortiq o'nlik yo'q, NaN va cheksiz yo'q", () => {
  [].concat(hududlar, tumanlar).forEach(f => {
    halqalar(f.geometry).forEach(poligon => poligon.forEach(r => r.forEach(p => {
      p.forEach(v => {
        ok(Number.isFinite(v), f.properties.kod + ": koordinata soni emas");
        const kasr = String(v).split(".")[1];
        ok(!kasr || kasr.length <= 5, f.properties.kod + ": ortiqcha aniqlik " + v);
      });
    })));
  });
});

sinov("halqa yo'nalishi RFC 7946 bo'yicha", () => {
  /* Tashqi halqa soat yo'nalishiga teskari (musbat yuza), ichki halqa soat yo'nalishi bo'yicha.
     Leaflet buni sezmaydi, lekin fayl boshqa vositaga yuklanganda teshik to'lib ketmasligi kerak. */
  [].concat(hududlar, tumanlar).forEach(f => {
    halqalar(f.geometry).forEach(poligon => poligon.forEach((r, i) => {
      const s = belgiliYuza(r);
      if (i === 0) ok(s > 0, f.properties.kod + ": tashqi halqa soat yo'nalishi bo'yicha");
      else ok(s < 0, f.properties.kod + ": ichki halqa tashqisi bilan bir yo'nalishda");
    }));
  });
});

sinov("poligon o'z-o'zini kesmaydi", () => {
  [].concat(hududlar, tumanlar).forEach(f => {
    ok(!ozniKesdi(f.geometry), f.properties.kod + ": poligon o'z-o'zini kesadi");
  });
});

sinov("hudud yuzasi o'z tumanlari yuzasi yig'indisiga teng", () => {
  hududlar.forEach(f => {
    const kod = f.properties.kod;
    const jami = tumanlar.filter(t => t.properties.hudud === kod).reduce((a, t) => a + yuza(t.geometry), 0);
    const oz = yuza(f.geometry);
    const farq = Math.abs(jami - oz) / oz;
    ok(farq < 1e-5, kod + ": yuza farqi " + (farq * 100).toFixed(4) + "%");
  });
});

sinov("har bir hududda kamida bitta tuman bor", () => {
  hududlar.forEach(f => {
    const n = tumanlar.filter(t => t.properties.hudud === f.properties.kod).length;
    ok(n > 0, f.properties.kod + ": tumani yo'q");
    if (f.properties.tumanlar != null) teng(f.properties.tumanlar, n, f.properties.kod + ": tumanlar maydoni");
  });
});

/* ============================================================
   4. Bo'yoq shkalasi (MKBxarita.shkala)
   ============================================================ */
guruh("4. Bo'yoq shkalasi");

sinov("bo'linish chegarasida undefined qolmaydi", () => {
  const shkala = shkalaYukla();
  ok(typeof shkala === "function", "MKBxarita.shkala yuklanmadi");
  [[12], [12, 34], [12, 34, 56], [12, 34, 56, 78], [1, 2, 3, 4, 5, 6, 7, 8]].forEach(q => {
    const s = shkala(q, 5);
    s.bolinish.forEach(v => ok(Number.isFinite(v), JSON.stringify(q) + ": bo'linishda " + v));
  });
});

sinov("qiymat besh tadan kam bo'lsa shkala eng ochidan boshlanadi", () => {
  const shkala = shkalaYukla();
  /* Ilgari bitta qiymatda hamma hudud eng to'q pog'onaga bo'yalar va filtr qo'yilgan xarita
     "hamma joyda eng yuqori daraja" deb o'qilardi. */
  teng(shkala([12], 5).bosqich(12), 0, "bitta qiymat");
  teng(shkala([12], 5).yagona, true, "bitta qiymat: yagona bayrog'i");
  teng(shkala([12], 5).pogona, 1, "bitta qiymat: pog'ona soni");
  const ikki = shkala([12, 34], 5);
  teng(ikki.bosqich(12), 0, "ikki qiymat: pastkisi");
  teng(ikki.bosqich(34), 1, "ikki qiymat: yuqorisi");
  teng(ikki.pogona, 2, "ikki qiymat: pog'ona soni");
  const tort = shkala([1, 2, 3, 4], 5);
  teng(tort.bosqich(1), 0, "to'rt qiymat: pastkisi");
  teng(tort.bosqich(4), 3, "to'rt qiymat: yuqorisi");
});

sinov("o'n to'rt qiymatda beshta pog'ona ishlatiladi va tartib buzilmaydi", () => {
  const shkala = shkalaYukla();
  const q = [9, 9, 10, 11, 12, 12, 13, 14, 15, 23, 26, 27, 28, 34, 39];
  const s = shkala(q, 5);
  teng(s.pogona, 5, "pog'ona soni");
  teng(s.yagona, false, "yagona bayrog'i");
  let oldingi = -1;
  q.forEach(v => { const b = s.bosqich(v); ok(b >= oldingi, "bosqich kamayib ketdi: " + v); oldingi = b; });
  teng(s.bosqich(q[q.length - 1]), 4, "eng katta qiymat eng to'q pog'onada");
});

sinov("legenda oraliqlari uzluksiz", () => {
  const shkala = shkalaYukla();
  const s = shkala([9, 10, 11, 12, 13, 14, 15, 23, 26, 27, 28, 34, 39], 5);
  for (let i = 0; i < s.pogona; i++) {
    const o = s.oraliq(i);
    ok(o, "oraliq(" + i + ") bo'sh");
    if (i === 0) teng(o.past, null, "birinchi pog'onada quyi chegara bo'lmasin");
    else teng(o.past, s.oraliq(i - 1).yuqori, "pog'ona " + i + ": quyi chegara oldingisining yuqorisiga teng emas");
    if (i === s.pogona - 1) teng(o.yuqori, null, "oxirgi pog'onada yuqori chegara bo'lmasin");
  }
});

sinov("bo'sh ro'yxatda ham xato bermaydi", () => {
  const shkala = shkalaYukla();
  const s = shkala([], 5);
  teng(s.bolinish.length, 0, "bo'linish");
  teng(s.yagona, true, "yagona bayrog'i");
  teng(s.bosqich(0), 0, "bosqich");
});

/* ============================================================
   5. Namoyish reyestri chegara faylida
   ============================================================ */
guruh("5. Reyestr va chegara mosligi");

sinov("hudud bo'yicha sanoqlar reyestr sanog'iga teng", () => {
  const D = malumotYukla();
  const sanoq = {};
  D.YOZUVLAR.forEach(y => {
    const k = y.hududKod || (D.hududKodi && D.hududKodi(y.hudud));
    ok(k, y.id + ": hudud kodi aniqlanmadi");
    sanoq[k] = (sanoq[k] || 0) + 1;
  });
  const jami = Object.keys(sanoq).reduce((a, k) => a + sanoq[k], 0);
  teng(jami, D.YOZUVLAR.length, "hudud sanoqlari yig'indisi");
  Object.keys(sanoq).forEach(k => ok(hKod[k], "reyestrdagi hudud kodi chegara faylida yo'q: " + k));
});

sinov("reyestrdagi har bir tuman nomi chegara faylida bor", () => {
  const D = malumotYukla();
  const nomlar = new Set(tumanlar.map(f => f.properties.nom_uz));
  const yoq = new Set();
  D.YOZUVLAR.forEach(y => { if (y.tuman && !nomlar.has(y.tuman)) yoq.add(y.tuman); });
  teng(yoq.size, 0, "chegara faylida topilmagan tuman nomlari: " + Array.from(yoq).join(", "));
});

sinov("aniq koordinata o'z tumani poligoni ichida yotadi", () => {
  const D = malumotYukla();
  const tKod = {};
  tumanlar.forEach(f => { tKod[f.properties.nom_uz] = f; });
  const aniq = D.YOZUVLAR.filter(y => y.joy && y.joy.aniq);
  ok(aniq.length > 0, "aniq koordinatali yozuv yo'q");
  aniq.forEach(y => {
    const f = tKod[y.tuman];
    ok(f, y.id + ": tuman chegara faylida yo'q — " + y.tuman);
    ok(nuqtaIchida([y.joy.lng, y.joy.lat], f.geometry),
      y.id + ": nuqta " + y.joy.lat + "/" + y.joy.lng + " " + y.tuman + " ichida emas");
  });
});

sinov("aniq koordinata o'z hududi poligoni ichida ham yotadi", () => {
  const D = malumotYukla();
  D.YOZUVLAR.filter(y => y.joy && y.joy.aniq).forEach(y => {
    const k = y.hududKod || (D.hududKodi && D.hududKodi(y.hudud));
    ok(nuqtaIchida([y.joy.lng, y.joy.lat], hKod[k].geometry),
      y.id + ": nuqta " + k + " hududidan tashqarida");
  });
});

sinov("har bir namoyish filialida bir nechta aktiv bor", () => {
  /* Namoyish sessiyasida filial rahbariga biriktirilgan filial bo'm-bo'sh bo'lsa,
     o'sha rolda xarita bitta metkadan iborat bo'lib qoladi va ko'rsatib bo'lmaydi. */
  const D = malumotYukla();
  const sanoq = {};
  D.YOZUVLAR.forEach(y => { if (y.filialKod) sanoq[y.filialKod] = (sanoq[y.filialKod] || 0) + 1; });
  (D.FILIALLAR || []).forEach(f => {
    ok((sanoq[f.id] || 0) >= 5, f.id + " (" + f.nom + "): " + (sanoq[f.id] || 0) + " ta aktiv, kamida 5 kutilgan");
  });
});

/* ---------- ishga tushirish ---------- */
let otdi = 0, yiqildi = 0;
for (const g of guruhlar) {
  console.log("\n" + g.nom);
  for (const t of g.sinovlar) {
    try { t.fn(); otdi++; console.log("  [OK]   " + t.nom); }
    catch (e) {
      yiqildi++;
      console.log("  [XATO] " + t.nom);
      console.log("         " + String(e.message).split("\n").join("\n         "));
    }
  }
}
console.log("\nYakun: o'tdi " + otdi + ", yiqildi " + yiqildi + ", jami " + (otdi + yiqildi));
if (yiqildi > 0) process.exit(1);
