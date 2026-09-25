"use strict";
/* ============================================================
   davr.test.js — hisobot-davr.js: hafta, oy, chorak va yil hisobi,
   balans harakati, ABS bilan solishtirish va MB hisobotini topshirish sharti.
   Faqat node kerak:  node tests/davr.test.js
   Namoyish ma'lumoti qotirilgan sanada (21.09.2026) yuklanadi.
   ============================================================ */
const path = require("path");
const ILDIZ = path.join(__dirname, "..");
const FAYLLAR = ["malumot.js", "malumot-qoshimcha.js", "malumot-kengaytma.js", "malumot-kirish.js", "malumot-indeks.js"];
global.window = {MKB_BUGUN: "2026-09-21"};
FAYLLAR.forEach(f => require(path.join(ILDIZ, f)));
const D = global.window.MKB_DATA;
const V = require(path.join(ILDIZ, "hisobot-davr.js"));

let otdi = 0, yiqildi = 0;
function tekshir(nom, fn){
  try{ fn(); otdi++; console.log("  [OK]   " + nom); }
  catch(e){ yiqildi++; console.log("  [XATO] " + nom + "\n         " + e.message); }
}
function talab(shart, xabar){ if (!shart) throw new Error(xabar); }
const teng = (a, b, x) => talab(Object.is(a, b), (x ? x + ": " : "") + JSON.stringify(a) + " keldi, " + JSON.stringify(b) + " kutilgan");
const s = d => V.sanaYoz(d);
const yaxlit = n => Math.round(n * 10) / 10;

console.log("\n1. Davrlar");
tekshir("hafta dushanbadan yakshanbagacha (yakshanba va dushanba kunlari ham)", () => {
  const h = V.oraliq("hafta", "25.09.2026");
  teng(s(h.dan), "21.09.2026"); teng(s(h.gacha), "27.09.2026");
  teng(s(V.oraliq("hafta", "27.09.2026").dan), "21.09.2026", "yakshanba");
  teng(s(V.oraliq("hafta", "21.09.2026").dan), "21.09.2026", "dushanba");
  teng(s(V.oldingi(h).dan), "14.09.2026"); teng(s(V.keyingi(h).gacha), "04.10.2026");
});
tekshir("ISO hafta raqami: 21.09.2026 — 39-hafta, 01.01.2026 — 1-hafta", () => {
  teng(V.haftaRaqami(V.oqi("21.09.2026")), 39);
  teng(V.haftaRaqami(V.oqi("01.01.2026")), 1);
});
tekshir("oy, chorak va yil chegaralari; kabisa yili fevrali", () => {
  const o = V.oraliq("oy", "15.02.2028");
  teng(s(o.gacha), "29.02.2028");
  const c = V.oraliq("chorak", "25.09.2026");
  teng(s(c.dan), "01.07.2026"); teng(s(c.gacha), "30.09.2026");
  teng(s(V.oldingi(c).dan), "01.04.2026");
  teng(s(V.oraliq("yil", "25.09.2026").gacha), "31.12.2026");
});
tekshir("kengash hisoboti raqami: KH-2026/09, KH-2026/Q3, KH-2026", () => {
  teng(V.raqam(V.oraliq("oy", "25.09.2026")), "KH-2026/09");
  teng(V.raqam(V.oraliq("chorak", "25.09.2026")), "KH-2026/Q3");
  teng(V.raqam(V.oraliq("yil", "25.09.2026")), "KH-2026");
});
tekshir("tugamagan davr bugun bilan kesiladi, solishtirma davr xuddi shuncha kun", () => {
  const j = V.juft(V.oraliq("oy", "25.09.2026"), "25.09.2026");
  talab(j.joriy.qismiy, "qismiy belgisi yo'q");
  teng(s(j.joriy.gacha), "25.09.2026"); teng(s(j.oldingi.dan), "01.08.2026"); teng(s(j.oldingi.gacha), "25.08.2026");
  /* 31-mart: fevral o'z oxiridan oshmaydi */
  const m = V.juft(V.oraliq("oy", "31.03.2026"), "31.03.2026");
  talab(!m.joriy.qismiy, "31-mart to'liq oy");
  teng(s(m.oldingi.gacha), "28.02.2026");
  const f = V.juft(V.oraliq("oy", "05.03.2026"), "30.03.2026");
  teng(s(f.oldingi.gacha), "28.02.2026", "30 kun fevraldan oshmaydi");
});
tekshir("tugagan davr to'liq qoladi", () => {
  const j = V.juft(V.oraliq("hafta", "14.09.2026"), "25.09.2026");
  talab(!j.joriy.qismiy, "qismiy bo'lmasligi kerak");
  teng(s(j.joriy.gacha), "20.09.2026"); teng(s(j.oldingi.gacha), "13.09.2026");
});

console.log("\n2. Balans harakati");
tekshir("bugungi balans holati reyestrdagi faol aktivlar bilan teng", () => {
  const faol = D.YOZUVLAR.filter(y => y.holat !== "Chiqarildi");
  const b = V.balansHolati(D, D.bugun());
  teng(b.soni, faol.length);
  teng(b.qiymat, yaxlit(faol.reduce((a, y) => a + y.balans.qiymat, 0)));
});
tekshir("oy oxiridagi holat MB oylik hisobotidagi summa va son bilan bir xil", () => {
  (D.MB_HISOBOTLAR || []).forEach(m => {
    const [y, o] = m.davr.split("-").map(Number);
    const b = V.balansHolati(D, new Date(y, o, 0));
    teng(b.qiymat, m.jamiBalansQiymat, m.davr + " summa");
    teng(b.soni, m.obyektlarSoni, m.davr + " soni");
  });
});
tekshir("balans tenglamasi: oxir = boshlanish + qabul − chiqim (chorak, yil)", () => {
  ["chorak", "yil"].forEach(tur => {
    [V.oraliq(tur, "21.09.2026"), V.oldingi(V.oraliq(tur, "21.09.2026"))].forEach(o => {
      const bosh = V.balansHolati(D, new Date(o.dan.getFullYear(), o.dan.getMonth(), o.dan.getDate() - 1));
      const oxir = V.balansHolati(D, o.gacha);
      const h = V.harakat(D, o);
      teng(oxir.soni, bosh.soni + h.qabul.length - h.chiqim.length, tur + " " + V.nomi(o) + " soni");
      teng(yaxlit(oxir.qiymat), yaxlit(bosh.qiymat + h.jami.qabul - h.jami.chiqim), tur + " " + V.nomi(o) + " qiymat");
    });
  });
});
tekshir("sotuv zanjiri: shartnoma summasi va tushum manfiy emas, chiqqan aktiv arxivdan", () => {
  const h = V.harakat(D, V.oraliq("yil", "21.09.2026"));
  talab(h.shartnoma.length > 0, "yilda shartnoma yo'q");
  talab(h.jami.tushum >= 0 && h.jami.shartnomaQoldiq >= 0, "manfiy summa");
  talab(h.jami.shartnomaChiqqan <= h.shartnoma.length, "chiqqan shartnomadan ko'p");
  const arxiv = new Set(D.ARXIV.map(a => a.id));
  talab(h.chiqim.every(x => arxiv.has(x.id)), "chiqim arxivda emas");
});
tekshir("tushum shartnoma narxidan oshmaydi (har bir shartnoma bo'yicha, butun davr)", () => {
  const h = V.harakat(D, {tur: "yil", dan: new Date(2000, 0, 1), gacha: new Date(2100, 0, 1)});
  const jami = {};
  h.tushum.forEach(t => { jami[t.shartnomaId] = (jami[t.shartnomaId] || 0) + t.summa; });
  D.SHARTNOMALAR.forEach(sh => talab(!jami[sh.id] || jami[sh.id] <= sh.narx + 0.2, sh.id + ": tushum " + jami[sh.id] + " > narx " + sh.narx));
});
tekshir("kutilayotgan qarorlar: davr oxirida kutilayotgan, keyin hal qilingan ham sanaladi", () => {
  const t = D.TASDIQLAR.find(x => x.holat === "tasdiqlangan" && x.qarorSana && x.sana !== x.qarorSana);
  talab(t, "hal qilingan qaror yo'q");
  const o = {tur: "hafta", dan: V.oqi(t.sana), gacha: V.oqi(t.sana)};
  talab(V.harakat(D, o).qarorKutil.some(x => x.id === t.id), t.id + " kutilayotganlar ichida emas");
  talab(!V.harakat(D, {tur: "hafta", dan: V.oqi(t.qarorSana), gacha: V.oqi(t.qarorSana)}).qarorKutil.some(x => x.id === t.id), "hal qilingan kuni ham kutilmoqda");
});
tekshir("yopilish vaqti yo'q yopiq hodisa haftaga taqsimlanmaydi, jurnal vaqti bilan taqsimlanadi", () => {
  const o = V.oraliq("hafta", "21.09.2026");
  const h = V.harakat(D, o);
  const yopiq = D.HODISALAR.concat(D.XAVFSIZLIK_HODISALARI).filter(x => x.ustun === "yopildi" || x.holat === "yopildi");
  teng(h.hodisaSanasiz, yopiq.filter(x => !x.yopilganVaqt).length);
  const x = D.HODISALAR.find(q => q.ustun === "yopildi");
  if (x){
    const j = V.harakat(D, o, null, {yopilish: {["HODISALAR:" + x.id]: "22.09.2026 10:15"}});
    talab(j.hodisaYopilgan.some(q => q.id === x.id), "jurnal vaqti hisobga olinmadi");
  }
});

console.log("\n3. ABS bilan solishtirish");
const R = [{id: "AK-1", sana: "01.03.2026", qiymat: 100}, {id: "AK-2", sana: "02.03.2026", qiymat: 200},
  {id: "AK-3", sana: "03.03.2026", qiymat: 300}, {id: "AK-4", sana: "04.03.2026", qiymat: 400}];
tekshir("to'rt turdagi nomuvofiqlik topiladi, yaxlitlash farqi e'tiborsiz", () => {
  const A = [{id: "ak-1", sana: "01.03.2026", summa: 100.04}, {id: "AK-2", sana: "02.03.2026", summa: 212.5},
    {id: "AK-3", sana: "05.03.2026", summa: 300}, {id: "AK-9", sana: "01.03.2026", summa: 50}];
  const r = V.absSolishtir(R, A);
  const tur = Object.fromEntries(r.royxat.map(x => [x.id, x.tur]));
  teng(tur["AK-1"], undefined, "0,04 mln farq");
  teng(tur["AK-2"], "summa"); teng(tur["AK-3"], "sana"); teng(tur["AK-4"], "absda-yoq"); teng(tur["AK-9"], "reyestrda-yoq");
  teng(r.royxat[0].tur, "summa", "summa farqi birinchi");
  teng(r.reyestrJami, 1000); teng(r.absJami, 662.54);
});
tekshir("takrorlangan reyestr raqami alohida qayd etiladi", () => {
  const r = V.absSolishtir(R, [{id: "AK-1", summa: 100}, {id: "AK-1", summa: 100}]);
  teng(r.takror.join(), "AK-1");
});
tekshir("ko'chirma: ustunlar sarlavhadan topiladi, so'mdagi summa mln ga o'tadi, buzuq qator qayd etiladi", () => {
  const r = V.absQatorlari([["Inventar raqami", "Balansga olingan sana", "Qoldiq, so'm"],
    ["AK-1", "01.03.2026", "100 000 000"], ["AK-2", "02.03.2026", "212 500 000"], ["AK-3", "", "x"]]);
  teng(r.qatorlar.length, 2); teng(r.qatorlar[1].summa, 212.5); teng(r.xatolar.join(), "4");
  const m = V.absQatorlari([["id", "summa"], ["AK-1", "100,4"]]);
  teng(m.qatorlar[0].summa, 100.4);
  talab(V.absQatorlari([["nom", "izoh"], ["a", "b"]]).xato, "ustunsiz fayl rad etilmadi");
});
tekshir("MB hisobotini topshirish: solishtirishsiz yo'q, izohsiz farq bilan yo'q", () => {
  talab(!V.mbTopshirishTayyormi({}).tayyor, "belgisiz tayyor");
  talab(!V.mbTopshirishTayyormi({solishtirish: {sana: "30.09.2026 10:00", kim: "X", farq: -12.5}}).tayyor, "izohsiz farq bilan tayyor");
  talab(V.mbTopshirishTayyormi({solishtirish: {sana: "30.09.2026 10:00", kim: "X", farq: 0.04}}).tayyor, "yaxlitlash farqi to'sdi");
  talab(V.mbTopshirishTayyormi({solishtirish: {sana: "30.09.2026 10:00", kim: "X", farq: -12.5, izoh: "Qabul o'tkazmasi 01.10 da"}}).tayyor, "izohli farq to'sdi");
});

console.log("\nYakun: o'tdi " + otdi + ", yiqildi " + yiqildi + ", jami " + (otdi + yiqildi));
process.exit(yiqildi ? 1 : 0);
