"use strict";
/* ============================================================
   Ma'lumot qatlami va lug'at tekshiruvi.
   Faqat node kerak. Ildizdan ishga tushiriladi:

       node tests/malumot.test.js

   Nima tekshiriladi:
   - balans aktivi modeli: kredit maydonlari yo'q, balans sanasi va qiymati bor;
   - me'yoriy muddatlar va zaxira: 365 kundan keyin 100%;
   - undiruv ishlari balans aktivlaridan alohida to'plamda;
   - suratlar: chizma yo'llari yo'q, rasmTuri 12 kalitdan biri;
   - namoyish sanalari bugunga nisbatan (qattiq sana yo'q);
   - mahalliy rejim: sun'iy fixture bilan, haqiqiy reyestr o'qilmaydi;
   - moslik tekshiruvi: toza ma'lumotda bo'sh, buzilganda qizaradi;
   - tarjima.js: sintaksis, dublikat, yadro nomlarining ruscha kalitlari.
   ============================================================ */

const path = require("path");
const fs = require("fs");

const ILDIZ = path.join(__dirname, "..");
const FAYLLAR = ["malumot.js", "malumot-qoshimcha.js", "malumot-kengaytma.js", "malumot-kirish.js", "malumot-indeks.js"];
const BUGUN = "2026-09-21";

/* Toza yuklash: har safar yangi window, fayllar keshdan olib tashlanadi.
   muhit: window ga qo'shiladigan qo'shimcha maydonlar (MKB_BUGUN) va global o'zgaruvchilar. */
function yukla(muhit) {
  muhit = muhit || {};
  FAYLLAR.forEach(f => { delete require.cache[require.resolve(path.join(ILDIZ, f))]; });
  const eski = {};
  const globallar = muhit.globallar || {};
  Object.keys(globallar).forEach(k => { eski[k] = global[k]; global[k] = globallar[k]; });
  global.window = Object.assign({MKB_BUGUN: BUGUN}, muhit.window || {});
  try {
    FAYLLAR.forEach(f => require(path.join(ILDIZ, f)));
  } finally {
    Object.keys(globallar).forEach(k => { if (eski[k] === undefined) delete global[k]; else global[k] = eski[k]; });
  }
  return global.window.MKB_DATA;
}

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

const D = yukla();
const sanaMatn = d => D.sanaYoz(d);
const bugunDan = n => sanaMatn(D.kunQosh(D.bugun(), n));

/* Sun'iy aktiv: kerakli maydonlar bilan aktivQolip dan o'tadi, hosila maydonlar ulanadi */
function aktiv(x) {
  const y = D.aktivQolip(Object.assign({id: "SINOV-1", nom: "Sinov aktivi", turKalit: "noturar", rasmTuri: "ombor"}, x));
  return D.aktivTayyorla(y);
}

/* ============================================================
   1. Sana
   ============================================================ */
guruh("1. Sana: o'qish, yozish, ish kunlari");

sinov("bugun qotirilgan sanaga teng (MKB_BUGUN)", () => {
  teng(sanaMatn(D.bugun()), "21.09.2026");
});

sinov("sanaOqi barcha qabul qilinadigan shakllarni o'qiydi", () => {
  ["21.09.2026", "21-09-2026", "21/09/2026", "2026-09-21", "21-sen, 2026", "21 sentabr 2026"].forEach(s => {
    const d = D.sanaOqi(s);
    ok(d, s + " o'qilmadi");
    teng(sanaMatn(d), "21.09.2026", s);
  });
  teng(D.sanaOqi(""), null);
  teng(D.sanaOqi("kiritilmagan"), null);
});

sinov("sanaYoz dd.mm.yyyy, vaqtYoz dd.mm.yyyy HH:MM", () => {
  teng(D.sanaYoz(new Date(2026, 0, 5)), "05.01.2026");
  teng(D.vaqtYoz(new Date(2026, 0, 5, 9, 7)), "05.01.2026 09:07");
});

sinov("kunFarqi kalendar kunlarda, kabisa yilini hisobga oladi", () => {
  teng(D.kunFarqi("01.03.2027", "01.03.2028"), 366);
  teng(D.kunFarqi("21.09.2026", "21.09.2026"), 0);
  teng(D.kunFarqi("22.09.2026", "21.09.2026"), -1);
});

sinov("ish kuni: shanba, yakshanba va bayramlar o'tkazib yuboriladi", () => {
  ok(!D.ishKunimi("26.09.2026"), "shanba ish kuni emas");
  ok(!D.ishKunimi("01.09.2026"), "Mustaqillik kuni ish kuni emas");
  ok(D.ishKunimi("21.09.2026"), "dushanba ish kuni");
  /* juma + 1 ish kuni = dushanba */
  teng(sanaMatn(D.ishKuniQosh("25.09.2026", 1)), "28.09.2026");
});

/* ============================================================
   2. Formatlash
   ============================================================ */
guruh("2. Pul va son formati");

sinov("999,9 mln so'm, 1 mlrd so'm, 1,48 mlrd so'm", () => {
  teng(D.pul(999.9), "999,9 mln so'm");
  teng(D.pul(1000), "1 mlrd so'm");
  teng(D.pul(1480), "1,48 mlrd so'm");
  teng(D.pul(520), "520 mln so'm");
});

sinov("bo'sh qiymat tire bilan ko'rsatiladi, soxta nol chiqmaydi", () => {
  teng(D.pul(null), "—");
  teng(D.son(undefined), "—");
  teng(D.fmt(NaN), "—");
});

/* ============================================================
   3. Me'yoriy muddatlar va zaxira
   ============================================================ */
guruh("3. Muddatlar va zaxira (MB 2696)");

sinov("garovdan olingan mulk: 365 kun o'tgach zaxira 100%", () => {
  const y = aktiv({balans: {sana: bugunDan(-365), qiymat: 800, qabulAsosi: "sud"}});
  const z = D.zaxiraHisobi(y);
  teng(z.toifa, "umidsiz");
  teng(z.foiz, 100);
  teng(z.summa, 800, "zaxira balans qiymatiga teng");
  teng(z.taxminiy, false, "365 kun qoidasi tasdiqlangan, taxminiy emas");
});

sinov("364-kun hali umidsiz emas; oraliq stavka taxminiy belgilangan", () => {
  const y = aktiv({balans: {sana: bugunDan(-364), qiymat: 800, qabulAsosi: "sud"}});
  const z = D.zaxiraHisobi(y);
  ok(z.toifa !== "umidsiz", "364-kunda umidsiz bo'ldi");
  ok(z.foiz < 100, "364-kunda 100%");
  teng(z.taxminiy, true, "oraliq stavka buxgalteriya tasdig'ida");
  ok(/buxgalteriya/.test(z.izoh), "izohda buxgalteriya tasdig'i aytilmagan");
});

sinov("zaxiraToifasi(365, 365) = umidsiz 100%", () => {
  const t = D.zaxiraToifasi(365, 365);
  teng(t.kalit, "umidsiz");
  teng(t.foiz, 100);
});

sinov("boshqa foydalanilmayotgan mulk: chegara 3 yil (1095 kun)", () => {
  const y = aktiv({balans: {sana: bugunDan(-400), qiymat: 100, qabulAsosi: "boshqa"}});
  teng(D.chegaraKuni(y), 1095);
  ok(D.zaxiraHisobi(y).toifa !== "umidsiz", "400-kunda boshqa mulk umidsiz bo'ldi");
  const z = D.zaxiraHisobi(aktiv({balans: {sana: bugunDan(-1095), qiymat: 100, qabulAsosi: "boshqa"}}));
  teng(z.foiz, 100);
});

sinov("muddatHisobi: 6 oy imtiyoz, 1 yil va 3 yil sanalari", () => {
  const m = D.muddatHisobi(aktiv({balans: {sana: "10.01.2026", qiymat: 50, qabulAsosi: "sud"}}));
  teng(m.balansSana, "10.01.2026");
  teng(m.soliqImtiyozTugash, "10.07.2026");
  teng(m.umidsizSana, "10.01.2027");
  teng(m.uchYilSana, sanaMatn(D.kunQosh("10.01.2026", 1095)));
  teng(m.turganKun, D.kunFarqi("10.01.2026", D.bugun()));
  teng(m.qolganKun, 365 - m.turganKun);
});

sinov("muddat holatlari: imtiyozda, xavf-90, umidsiz, 3 yildan oshgan", () => {
  const h = kun => D.muddatHisobi(aktiv({balans: {sana: bugunDan(-kun), qiymat: 1, qabulAsosi: "sud"}})).holat;
  teng(h(10), "imtiyozda");
  teng(h(200), "normal");
  teng(h(300), "xavf-90");
  teng(h(365), "umidsiz");
  teng(h(1095), "3-yildan-oshgan");
});

sinov("balans sanasi yo'q: halol 'kiritilmagan', soxta raqam yo'q", () => {
  const y = aktiv({balans: {sana: null, qiymat: 10}});
  const m = D.muddatHisobi(y);
  teng(m.holat, "kiritilmagan");
  teng(m.turganKun, null);
  const z = D.zaxiraHisobi(y);
  teng(z.kiritilmagan, true);
  teng(z.summa, null);
});

sinov("namoyish reyestrida har bir aktivning zaxirasi muddatga mos", () => {
  D.YOZUVLAR.forEach(y => {
    const m = y.muddat, z = y.zaxira;
    if (m.holat === "chiqarilgan") return;
    if (m.turganKun >= m.chegaraKun) teng(z.foiz, 100, y.id + " chegaradan o'tgan");
    else ok(z.foiz < 100, y.id + ": chegaragacha 100% zaxira");
  });
});

/* ============================================================
   4. Balans aktivi modeli
   ============================================================ */
guruh("4. YOZUVLAR: balans aktivi modeli");

const KREDIT_MAYDONLARI = ["qarz", "tasnif", "ish", "kredit", "qarzdor", "ochiqQoldiq", "qoplash", "sud"];

sinov("namoyish reyestri to'liq: 267 aktiv, identifikatorlar takrorlanmaydi", () => {
  teng(D.MANBA, "shartli");
  ok(D.YOZUVLAR.length >= 200, "aktivlar soni: " + D.YOZUVLAR.length);
  teng(new Set(D.YOZUVLAR.map(y => y.id)).size, D.YOZUVLAR.length);
});

sinov("aktivda kredit maydonlari yo'q", () => {
  const yomon = [];
  D.YOZUVLAR.forEach(y => KREDIT_MAYDONLARI.forEach(k => { if (y[k] !== undefined) yomon.push(y.id + "." + k); }));
  teng(yomon.length, 0, "kredit maydonlari: " + yomon.slice(0, 6).join(", "));
});

sinov("har bir aktivda balans sanasi, balans qiymati va ma'lum holat bor", () => {
  const holatlar = D.HOLATLAR.map(h => h.nom);
  D.YOZUVLAR.forEach(y => {
    ok(D.sanaOqi(y.balans.sana), y.id + ": balans sanasi o'qilmaydi");
    ok(y.balans.qiymat > 0, y.id + ": balans qiymati yo'q");
    ok(holatlar.includes(y.holat), y.id + ": noma'lum holat " + y.holat);
    ok(D.bosqichInfo(y.bosqich), y.id + ": noma'lum bosqich " + y.bosqich);
  });
});

sinov("holatlar ro'yxati kelishilgan sakkizta holatdan iborat", () => {
  teng(D.HOLATLAR.map(h => h.nom).join(" | "),
    "Balansda | Rasmiylashtirilmoqda | Sotuvga tayyorlanmoqda | Lotda | Ijarada | Bo'lib to'lashda | Davaktivga o'tkazilgan | Chiqarildi");
});

sinov("rasmTuri 12 kalitdan biri, turKalit unga mos", () => {
  teng(D.TUR_KALITLAR.length, 12);
  D.YOZUVLAR.forEach(y => {
    const t = D.turInfo(y.rasmTuri);
    ok(t, y.id + ": noma'lum rasmTuri " + y.rasmTuri);
    teng(y.turKalit, t.turKalit, y.id + " turKalit");
  });
});

sinov("suratlarda chizma yo'llari yo'q (.svg, assets/obyekt/)", () => {
  const yomon = [];
  D.YOZUVLAR.forEach(y => {
    const yollar = [y.rasm, y.rasmKichik].concat((y.rasmlar || []).map(r => (r && (r.yol || r.kichik)) || ""));
    yollar.forEach(r => { if (r && (/\.svg(\?|$)/i.test(r) || r.includes("assets/obyekt/"))) yomon.push(y.id + ": " + r); });
  });
  Object.values(D.OBYEKT_INDEKS).forEach(o => {
    [o.rasm, o.rasmKichik].forEach(r => { if (r && /\.svg(\?|$)|assets\/obyekt\//i.test(r)) yomon.push("indeks " + o.id + ": " + r); });
  });
  teng(yomon.length, 0, yomon.slice(0, 5).join("; "));
});

sinov("namoyish rejimida surat o'rnida almashtiruvchi rasm yo'q", () => {
  const rasmli = D.YOZUVLAR.filter(y => y.rasm || (y.rasmlar || []).length);
  teng(rasmli.length, 0, "namoyishda surat: " + rasmli.slice(0, 3).map(y => y.id).join(", "));
});

sinov("binosiz aktivda maydon, kommunal va kirish nuqtasi yo'q", () => {
  const binosiz = D.YOZUVLAR.filter(y => !D.binolimi(y));
  ok(binosiz.length > 0, "namoyishda binosiz aktiv yo'q");
  binosiz.forEach(y => {
    teng(y.maydon.foydali + y.maydon.yer + y.maydon.qurilishOsti, 0, y.id + " maydon");
    teng(y.kommunal.length, 0, y.id + " kommunal");
    teng(D.maydonMatn(y), "1 dona");
    teng(D.obyektNuqtalari(y.id).length, 0, y.id + " kirish nuqtalari");
  });
});

sinov("baholanmagan belgisi bozor qiymatiga mos", () => {
  D.YOZUVLAR.forEach(y => teng(y.qiymat.baholanmagan, y.qiymat.bozor == null, y.id));
});

sinov("namoyish sanalari bugunga nisbatan: bugun o'zgarsa balansda turgan kun o'zgarmaydi", () => {
  const boshqa = yukla({window: {MKB_BUGUN: "2027-03-10"}});
  const farq = [];
  D.YOZUVLAR.forEach(y => {
    const b = boshqa.topish(y.id);
    if (!b) { farq.push(y.id + " yo'q"); return; }
    if (y.muddat.turganKun !== b.muddat.turganKun) farq.push(y.id + ": " + y.muddat.turganKun + " / " + b.muddat.turganKun);
  });
  teng(farq.length, 0, "qattiq sana: " + farq.slice(0, 5).join("; "));
});

/* ============================================================
   5. Undiruv ishlari alohida to'plamda
   ============================================================ */
guruh("5. UNDIRUV_ISHLAR: balansgacha bo'lgan ishlar");

sinov("namoyishda 30–60 ta faol undiruv ishi", () => {
  const faol = D.UNDIRUV_ISHLAR.filter(i => i.holat !== "yopilgan");
  ok(faol.length >= 30 && faol.length <= 60, "faol ishlar: " + faol.length);
});

sinov("undiruv ishi balans reyestriga tushmaydi", () => {
  D.UNDIRUV_ISHLAR.forEach(i => {
    ok(!D.OBYEKT_INDEKS[i.id], i.id + " obyekt reyestrida");
    ok(!D.topish(i.id), i.id + " YOZUVLAR da");
  });
});

sinov("ish bosqichi UNDIRUV_BOSQICHLAR dan, oxirgisi balansga qabul", () => {
  const k = D.UNDIRUV_BOSQICHLAR.map(b => b.kalit);
  teng(k[k.length - 1], "qabul");
  D.UNDIRUV_ISHLAR.forEach(i => ok(k.includes(i.bosqich), i.id + ": noma'lum bosqich " + i.bosqich));
});

sinov("yopilgan ish yangi aktivga, aktiv esa ishga ishora qiladi", () => {
  const yopiq = D.UNDIRUV_ISHLAR.filter(i => i.aktivId);
  ok(yopiq.length > 0, "aktivga aylangan ish yo'q");
  yopiq.forEach(i => {
    const a = D.topish(i.aktivId);
    ok(a, i.id + ": aktiv " + i.aktivId + " topilmadi");
    teng(a.balans.undiruvIshId, i.id, i.aktivId + " undiruvIshId");
    teng(i.holat, "yopilgan", i.id + " holati");
  });
});

sinov("faol ishda aktiv yo'q; sud majlislari mavjud ishga bog'langan", () => {
  D.UNDIRUV_ISHLAR.filter(i => i.holat !== "yopilgan").forEach(i => ok(!i.aktivId, i.id + " faol, lekin aktivId bor"));
  const ishlar = new Set(D.UNDIRUV_ISHLAR.map(i => i.id));
  ["SUD_MAJLISLAR", "RESTRUKTURIZATSIYA", "MULOQOTLAR"].forEach(k =>
    (D[k] || []).forEach(r => ok(ishlar.has(r.ishId), k + " / " + r.id + ": ish " + r.ishId + " yo'q")));
});

/* ============================================================
   6. Obyekt reyestri va havolalar
   ============================================================ */
guruh("6. OBYEKT_INDEKS: havolalar va nomlar");

sinov("har bir aktiv reyestrda", () => {
  D.YOZUVLAR.forEach(y => ok(D.OBYEKT_INDEKS[y.id], y.id));
});

sinov("ikkilamchi to'plamlardagi obyektId reyestrda topiladi", () => {
  const uzilgan = [];
  ["HODISALAR", "HUJJATLAR", "KORIKLAR", "SUGURTALAR", "BAHOLASHLAR", "TASDIQLAR", "XARAJATLAR", "LOTLAR",
   "TAKLIFLAR", "SHARTNOMALAR", "IJARA", "QORIQLASH", "KOMMUNAL_ARIZALAR", "INVENTAR", "SOLIQ", "QURILMALAR",
   "KIRISH_NUQTALARI", "MENING_VAZIFALARIM", "BILDIRISHLAR", "FAYLLAR"].forEach(k =>
    (D[k] || []).forEach(r => { if (r.obyektId && !D.OBYEKT_INDEKS[r.obyektId]) uzilgan.push(k + ":" + r.obyektId); }));
  teng(uzilgan.length, 0, uzilgan.slice(0, 6).join(", "));
});

sinov("mavjud bo'lmagan id: nom '?' bilan belgilanadi, obyekt() null", () => {
  teng(D.obyektNomi("AK-9999/0000"), "?AK-9999/0000");
  teng(D.obyekt("AK-9999/0000"), null);
});

sinov("qisqa nom va joyNomi", () => {
  const y = D.topish("AK-2026/4471");
  teng(D.obyektNomi(y.id, true), y.qisqa);
  teng(D.joyNomi(y.id, "1-qavat"), y.qisqa + ", 1-qavat");
});

/* ============================================================
   7. Moslik tekshiruvi
   ============================================================ */
guruh("7. moslikTekshiruvi(): toza ma'lumot va buzishlar");

sinov("namoyish ma'lumotida buzilish yo'q", () => {
  const M = yukla();
  const x = M.moslikTekshiruvi();
  teng(x.length, 0, x.slice(0, 5).join(" | "));
});

sinov("balans qiymati olib tashlansa ushlanadi", () => {
  const M = yukla();
  M.YOZUVLAR[0].balans.qiymat = 0;
  const x = M.moslikTekshiruvi();
  ok(x.some(t => t.includes(M.YOZUVLAR[0].id) && /balans qiymati/.test(t)), x.join(" | "));
});

sinov("hodisadagi uzilgan obyektId ushlanadi", () => {
  const M = yukla();
  M.HODISALAR[0].obyektId = "AK-0000/0000";
  const x = M.moslikTekshiruvi();
  teng(x.length, 1, x.join(" | "));
  ok(/obyekt havolasi uzilgan/.test(x[0]) && x[0].includes("AK-0000/0000"), x[0]);
});

sinov("e'londan savdogacha 30 kundan kam bo'lsa ushlanadi (VM 18)", () => {
  const M = yukla();
  const l = M.LOTLAR.find(x => x.elonSana && x.savdoSana);
  ok(l, "sanali lot yo'q");
  l.savdoSana = M.sanaYoz(M.kunQosh(l.elonSana, 29));
  const x = M.moslikTekshiruvi();
  ok(x.some(t => t.includes(l.id) && /30 kundan kam/.test(t)), x.join(" | "));
});

sinov("sud majlisi yo'q ishga bog'lansa ushlanadi", () => {
  const M = yukla();
  M.SUD_MAJLISLAR[0].ishId = "UI-0000/0000";
  const x = M.moslikTekshiruvi();
  ok(x.some(t => /undiruv ishi topilmadi/.test(t)), x.join(" | "));
});

sinov("chizma yo'li yozilsa ushlanadi", () => {
  const M = yukla();
  M.YOZUVLAR[0].rasm = "assets/obyekt/ombor-1.svg";
  const x = M.moslikTekshiruvi();
  ok(x.some(t => /haqiqiy surat emas/.test(t)), x.join(" | "));
});

/* ============================================================
   8. Mahalliy rejim (sun'iy fixture)
   Haqiqiy mahalliy/obyektlar.json o'qilmaydi: XMLHttpRequest o'rniga
   quyidagi to'qima ikki yozuv beriladi.
   ============================================================ */
guruh("8. Mahalliy rejim: sun'iy fixture");

const FIXTURE = {
  obyektlar: [
    {id: "SN-0001", nom: "Sinov ombori", manzil: "Sinov ko'chasi, 1", tur: "Noturar bino", turKalit: "noturar",
     rasmTuri: "ombor", binoli: true, hudud: "SA", tuman: "Sinov tumani", filial: "SA-01", filialNomi: "Sinov filiali",
     balansSana: "15.02.2026", balansQiymat: 120.5, foydaliMaydon: 340},
    {id: "SN-0002", nom: "Sinov avtomobili", tur: "Transport vositasi", turKalit: "transport", rasmTuri: "avto",
     binoli: false, hudud: "TS", balansSana: "2026-05-01", balansQiymat: 95, sotishQiymat: 110, holat: "Sotuvga tayyorlanmoqda"}
  ],
  filiallar: [{id: "SA-01", nom: "Sinov filiali", hudud: "SA", turi: "BXM"}]
};
function xotira() {
  const m = new Map();
  return {getItem: k => (m.has(k) ? m.get(k) : null), setItem: (k, v) => m.set(k, String(v)), removeItem: k => m.delete(k)};
}
function mahalliyYukla() {
  function XHR() {
    this.status = 0; this.responseText = "";
    this.open = (_u, url) => { this.url = String(url); };
    this.send = () => {
      if (/^mahalliy\/obyektlar\.json/.test(this.url)) { this.status = 200; this.responseText = JSON.stringify(FIXTURE); }
      else this.status = 404;
    };
  }
  return yukla({globallar: {
    location: {hostname: "127.0.0.1", search: "", pathname: "/obyektlar.html", href: "http://127.0.0.1/obyektlar.html"},
    XMLHttpRequest: XHR, localStorage: xotira(), sessionStorage: xotira()
  }});
}
const M8 = mahalliyYukla();

sinov("fixture o'qiladi, manba 'mahalliy'", () => {
  teng(M8.MANBA, "mahalliy");
  teng(M8.YOZUVLAR.length, 2);
});

sinov("mahalliy yozuvda kredit maydonlari undefined", () => {
  M8.YOZUVLAR.forEach(y => KREDIT_MAYDONLARI.forEach(k => teng(y[k], undefined, y.id + "." + k)));
});

sinov("balans sanasi dd.mm.yyyy ga keltiriladi, qiymat saqlanadi", () => {
  teng(M8.topish("SN-0002").balans.sana, "01.05.2026");
  teng(M8.topish("SN-0001").balans.qiymat, 120.5);
  teng(M8.topish("SN-0002").qiymat.bozor, 110);
  teng(M8.topish("SN-0001").qiymat.baholanmagan, true);
});

sinov("aniq koordinata to'qilmaydi: joy.aniq = false", () => {
  M8.YOZUVLAR.forEach(y => ok(!y.joy || y.joy.aniq === false, y.id + ": to'qima aniq koordinata"));
});

sinov("namoyish to'plamlari mahalliy rejimda bo'sh", () => {
  ["UNDIRUV_ISHLAR", "SUD_MAJLISLAR", "LOTLAR", "TAKLIFLAR", "SHARTNOMALAR", "HODISALAR", "KORIKLAR", "XARAJATLAR"].forEach(k =>
    teng((M8[k] || []).length, 0, k));
});

sinov("binosiz mahalliy aktivda kommunal va kirish nuqtasi yo'q", () => {
  const a = M8.topish("SN-0002");
  teng(a.kommunal.length, 0);
  teng(M8.obyektNuqtalari(a.id).length, 0);
});

sinov("mahalliy rejimda moslik tekshiruvi toza", () => {
  const x = M8.moslikTekshiruvi();
  teng(x.length, 0, x.join(" | "));
});

/* ============================================================
   9. tarjima.js
   ============================================================ */
guruh("9. tarjima.js: lug'at");

const TARJIMA = path.join(ILDIZ, "tarjima.js");
function lugatOl() {
  delete require.cache[require.resolve(TARJIMA)];
  global.window = {};
  require(TARJIMA);
  return {L: global.window.MKB_LUGAT, Q: global.window.MKB_TARJIMA_QOIDALARI || []};
}
const {L, Q} = lugatOl();
const TARJIMA_OYNA = global.window;
const apostrof = m => String(m).replace(/[’ʼʻ`´]/g, "'");
const tarjimasi = m => {
  const k = String(m).trim();
  if (L[k] != null || L[apostrof(k)] != null) return true;
  return Q.some(([q]) => q.test(k));
};

sinov("modul yuklanadi va obyekt qaytaradi", () => {
  ok(L && typeof L === "object" && !Array.isArray(L));
  ok(Array.isArray(Q), "MKB_TARJIMA_QOIDALARI massiv emas");
});

sinov("kalitlar takrorlanmaydi (qatorma-qator o'qiladi)", () => {
  const re = /^\s*"((?:[^"\\]|\\.)*)"\s*:/;
  const bor = new Map(), takror = [];
  let soni = 0, ichida = false;
  /* faqat window.MKB_LUGAT = { ... }; bloki: fayldagi boshqa jadvallar (MKB_RU_SON) lug'at emas */
  fs.readFileSync(TARJIMA, "utf8").split(/\r?\n/).forEach((q, i) => {
    if (/^window\.MKB_LUGAT\s*=\s*\{/.test(q)){ ichida = true; return; }
    if (ichida && /^\};/.test(q)){ ichida = false; return; }
    if (!ichida) return;
    const m = q.match(re);
    if (!m) return;
    soni++;
    if (bor.has(m[1])) takror.push((i + 1) + "-qator: " + m[1].slice(0, 60));
    else bor.set(m[1], i);
  });
  teng(takror.length, 0, takror.slice(0, 5).join("; "));
  teng(soni, Object.keys(L).length, "qatorlar va yuklangan kalitlar soni");
});

sinov("har bir qiymat bo'sh bo'lmagan ruscha matn", () => {
  const yomon = Object.entries(L).filter(([, v]) => typeof v !== "string" || !v.trim()).map(([k]) => k);
  teng(yomon.length, 0, yomon.slice(0, 5).join(", "));
});

sinov("qoidalar: [RegExp, satr yoki funksiya]", () => {
  Q.forEach((q, i) => ok(q[0] instanceof RegExp && (typeof q[1] === "string" || typeof q[1] === "function"), i + "-qoida"));
});

sinov("yadro ma'lumotnomalari nomlarining ruscha tarjimasi bor", () => {
  const nomlar = [];
  const qosh = (arr, ...m) => (arr || []).forEach(x => m.forEach(k => { if (x && x[k]) nomlar.push(x[k]); }));
  qosh(D.HOLATLAR, "nom"); qosh(D.BOSQICHLAR, "nom"); qosh(D.UNDIRUV_BOSQICHLAR, "nom");
  qosh(D.QABUL_ASOSLARI, "nom"); qosh(D.ASOSIY_TURLAR, "nom"); qosh(D.TUR_KALITLAR, "nom");
  qosh(D.SOTISH_USULLARI, "nom"); qosh(D.LOT_HOLATLARI, "nom"); qosh(D.XARAJAT_TOIFALARI, "nom");
  qosh(D.QORIQLASH_TURLARI, "nom"); qosh(D.KOMMUNAL_XIZMATLAR, "nom"); qosh(D.ZAXIRA_TOIFALARI, "nom");
  qosh(Object.values(D.MUDDAT_HOLATLARI), "nom"); qosh(D.QOIDALAR, "nom"); qosh(D.HISOBOTLAR, "nom", "sub");
  qosh(D.INTEGRATSIYA_HOLATLARI, "nom"); qosh(D.QURILMA_TURLARI, "nom"); qosh(D.QUVVAT_MANBALARI, "nom");
  qosh(D.ALOQA_KANALLARI, "nom");
  const yoq = [...new Set(nomlar)].filter(n => !tarjimasi(n));
  teng(yoq.length, 0, "tarjimasiz: " + yoq.slice(0, 12).join(" | "));
});

sinov("bo'limlar va navigatsiya bandlari tarjima qilingan", () => {
  global.window = {};
  require(path.join(ILDIZ, "yadro", "daraxt.js"));
  const dar = global.window.MKB_DARAXT, tab = global.window.MKB_OBYEKT_TABLAR || [];
  const html = s => s.replace(/&#39;/g, "'");
  const nomlar = [].concat(...Object.values(dar).map(r => r.map(s => html(s.n))), tab.map(t => html(t.n)));
  const app = fs.readFileSync(path.join(ILDIZ, "yadro", "app.js"), "utf8");
  for (const m of app.matchAll(/\{kalit: "[a-z]+",\s+yorliq: "([^"]+)"/g)) nomlar.push(m[1]);
  const yoq = [...new Set(nomlar)].filter(n => !tarjimasi(n));
  teng(yoq.length, 0, "tarjimasiz: " + yoq.join(" | "));
});

sinov("pul va sana ko'rinishlari qoidalar bilan o'giriladi", () => {
  const qolla = m => { for (const [q, a] of Q) if (q.test(m)) return m.replace(q, a); return m; };
  teng(qolla("1,48 mlrd so'm"), "1,48 млрд сум");
  teng(qolla("520 mln so'm"), "520 млн сум");
  teng(qolla("12 kun"), "12 дн.");
});

sinov("ruscha son bilan ot kelishadi: 1 запись, 24 записи, 131 запись, 11 записей", () => {
  const qolla = m => { for (const [q, a] of Q) if (q.test(m)) return m.replace(q, a); return m; };
  teng(qolla("Jami: 131 ta yozuv"), "Итого: 131 запись");
  teng(qolla("Jami: 24 ta yozuv"), "Итого: 24 записи");
  teng(qolla("Jami: 11 ta yozuv"), "Итого: 11 записей");
  teng(qolla("Jami: 112 ta yozuv"), "Итого: 112 записей");
  teng(qolla("Jami: 473 ta yozuv"), "Итого: 473 записи");
  teng(qolla("3 ta kechikkan shartnoma"), "3 просроченных договора");
  ok(qolla("23 ta hisobot · 22.09.2026 holatiga").indexOf("23 отчёта · ") === 0, "23 отчёта");
  teng(qolla("2026 yil · 4 ta sotuv"), "2026 год · 4 продажи");
  teng(qolla("2026-yil · 5 ta sotuv"), "2026 год · 5 продаж");
  teng(qolla("1 234 ta obyekt"), "1 234 объекта");
  teng(qolla("21 ta yozuv · 3 ta ustun"), "21 запись · 3 столбца");
  teng(qolla("21 ta obyektda ko'rik kechikkan"), "осмотр просрочен на 21 объекте");
  const f = TARJIMA_OYNA.ruKop;
  ok(typeof f === "function", "window.ruKop yo'q");
  [[0, "c"], [1, "a"], [2, "b"], [4, "b"], [5, "c"], [11, "c"], [12, "c"], [14, "c"], [21, "a"], [22, "b"], [101, "a"], [111, "c"]]
    .forEach(([n, s]) => teng(f(n, "a", "b", "c"), s, "ruKop(" + n + ")"));
  /* son alohida elementda: <b>4</b><span>ta hisobot</span> */
  const g = TARJIMA_OYNA.mkbSonliIbora;
  ok(typeof g === "function", "window.mkbSonliIbora yo'q");
  const tugun = son => { const b = {nodeType: 1, textContent: son, lastChild: {nodeType: 3, nodeValue: son}}; return {parentNode: {previousSibling: b}, previousSibling: null}; };
  teng(g(tugun("4"), "отчётов"), "отчёта");
  teng(g(tugun("141"), "активов без устройств"), "актив без устройств");
  teng(g(tugun("12"), "отчётов"), "отчётов");
  teng(g(tugun("22.09.2026"), "отчётов"), "отчётов", "sana son emas");
});

sinov("tarjimasiz qism ichidagi o'lchov birliklari o'giriladi, nom o'zgarmaydi", () => {
  const f = TARJIMA_OYNA.mkbBirlikTarjima;
  ok(typeof f === "function", "window.mkbBirlikTarjima yo'q");
  teng(f("312 mln so'm"), "312 млн сум");
  teng(f("51,47 mlrd so'm · 12%"), "51,47 млрд сум · 12%");
  teng(f("9 kun"), "9 дн.");
  teng(f("Toshkent sh., Sanoat ko'chasi, 4"), "Toshkent sh., Sanoat ko'chasi, 4");
});

sinov("namoyish aktivlarining tur nomi ruscha interfeysda bir xil o'giriladi", () => {
  /* qisqa nom — aktiv turi ("Sovutish agregati", "Isuzu yuk avtomobili (2021)"). Manzil (raqamli)
     va faqat brend-modeldan iborat nom ("Chevrolet Cobalt (2022)") xos nom sifatida qoladi.
     Undiruv ishidan kelgan garov nomi ("Navruz Plaza") ham xos nom. */
  global.window = TARJIMA_OYNA;
  const garov = new Set((D.UNDIRUV_ISHLAR || []).map(i => i.garov && String(i.garov.nom).trim()));
  const qolla = m => { for (const [q, a] of Q) if (q[2] !== "yigma" && q.test(m)) return m.replace(q, a); return null; };
  const nomlar = [].concat((D.YOZUVLAR || []).map(y => y.qisqa), (D.ARXIV || []).map(y => y.qisqa))
    .filter(Boolean).map(n => String(n).trim())
    .filter(n => !garov.has(n) && !/^Chevrolet /.test(n) && !/\d/.test(n.replace(/ \(\d{4}\)$/, "")));
  const yoq = [...new Set(nomlar)].filter(n => {
    if (L[n] != null || L[apostrof(n)] != null) return false;
    const t = qolla(n);
    return t == null || t === n;
  });
  teng(yoq.length, 0, "tarjimasiz tur nomlari: " + yoq.slice(0, 12).join(" | "));
});

sinov("xodim ismlari kirillchaga o'girilmaydi", () => {
  const ism = /^[A-Z][a-z']+(?:ov|ova|ev|eva|yev|yeva|iy|bek|jon) [A-Z][a-z']+(?: —.*)?$/;
  const yomon = Object.entries(L).filter(([k, v]) => ism.test(k) && /^[А-ЯЁ][а-яё]+ [А-ЯЁ]/.test(v)).map(([k]) => k);
  teng(yomon.length, 0, yomon.join(", "));
});

sinov("taklif matni jinsga bog'liq fe'lsiz o'giriladi", () => {
  global.window = TARJIMA_OYNA;
  const qolla = m => { for (const [q, a] of Q) if (q.test(m)) return m.replace(q, a); return m; };
  const t = qolla("Qodirova Malika 470 mln so'm taklif qildi. To'g'ridan-to'g'ri sotish taklifi, PQ-142");
  teng(t, "Qodirova Malika: предложение на 470 млн сум. Предложение о прямой продаже, ПП-142");
  teng(qolla("Aliyev Bobur 1,2 mlrd so'm taklif qildi."), "Aliyev Bobur: предложение на 1,2 млрд сум.");
  teng(qolla("MAN tortuvchi (2020)"), "Тягач MAN (2020)");
  teng(qolla("Chevrolet Cobalt (2022)"), "Chevrolet Cobalt (2022)");
});

sinov("tarjimasiz qism ichida ham aktiv turi o'giriladi, xos nom va manzil qoladi", () => {
  global.window = TARJIMA_OYNA;
  const f = TARJIMA_OYNA.mkbBirlikTarjima;
  teng(f("Un tortish liniyasi"), "Мукомольная линия");
  teng(f("Ish markazi, 5-qavat"), "Бизнес-центр, 5-й этаж");
  teng(f("Qadoqlash liniyasi · AK-2026/0001"), "Упаковочная линия · AK-2026/0001");
  teng(f("Isuzu yuk avtomobili (2021)"), "Грузовой автомобиль Isuzu (2021)");
  teng(f("Navruz Plaza"), "Navruz Plaza");
  teng(f("Chevrolet Cobalt (2022)"), "Chevrolet Cobalt (2022)");
  const yoq = (TARJIMA_OYNA.MKB_AKTIV_TURLARI || []).filter(t => L[t] == null);
  teng(yoq.length, 0, "turlar ro'yxatida lug'atsiz nom: " + yoq.join(" | "));
});

/* ============================================================
   Namoyish ma'lumotining ichki izchilligi
   ============================================================ */
guruh("Izchillik: hisobot suratlari, muddat, hodisa manbasi, hujjatlar");

sinov("oylik MB hisoboti va zaxira surati keyin sotilgan aktivlarni ham sanaydi", () => {
  const M = yukla();
  ok((M.MB_HISOBOTLAR || []).length > 0, "MB hisobotlari yo'q");
  M.MB_HISOBOTLAR.forEach(h => {
    const q = M.mbHisobotHisobla(h.davr);
    teng(h.obyektlarSoni, q.obyektlarSoni, h.davr + " obyektlar soni");
    teng(h.jamiBalansQiymat, q.jamiBalansQiymat, h.davr + " balans qiymati");
    teng(h.umidsizSoni, q.umidsizSoni, h.davr + " umidsiz soni");
  });
  const davr = M.MB_HISOBOTLAR[M.MB_HISOBOTLAR.length - 1].davr;
  const saqlangan = M.ZAXIRA_TARIX.filter(z => z.davr === davr).length;
  teng(saqlangan, M.zaxiraTarixHisobla(davr).length, davr + " zaxira surati");
});

sinov("soliq imtiyozi holati faqat binoli aktivga beriladi", () => {
  const avto = aktiv({turKalit: "transport", rasmTuri: "avto", balans: {sana: bugunDan(-30), qiymat: 50, qabulAsosi: "sud"}});
  ok(!D.binolimi(avto), "sinov aktivi binosiz bo'lishi kerak");
  const m = D.muddatHisobi(avto);
  ok(m.holat !== "imtiyozda", "binosiz aktiv imtiyozda deb sanaldi");
  teng(m.soliqImtiyozTugash, null);
  D.YOZUVLAR.filter(y => D.muddatHisobi(y).holat === "imtiyozda")
    .forEach(y => ok(D.binolimi(y), y.id + " binosiz, lekin imtiyozda"));
});

sinov("qurilma manbali hodisa obyektdagi mos qurilmaga bog'langan", () => {
  const M = yukla();
  const q = M.HODISALAR.filter(h => h.manba === "qurilma");
  ok(q.length > 0, "qurilma manbali hodisa yo'q");
  q.forEach(h => {
    const qr = h.qurilmaId && M.qurilma(h.qurilmaId);
    ok(qr, h.id + ": qurilmaId yo'q yoki topilmadi");
    teng(qr.obyektId, h.obyektId, h.id + " qurilmasi boshqa obyektda");
  });
});

sinov("yetishmaydigan hujjat turi bir marta sanaladi", () => {
  D.YOZUVLAR.slice(0, 120).forEach(y => {
    const t = D.hujjatToliqligi(y).kerak.map(k => k.tur);
    teng(new Set(t).size, t.length, y.id + " majburiy hujjatlarda takror");
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
