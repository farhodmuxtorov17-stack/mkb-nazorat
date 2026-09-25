/* ============================================================
   tarjima.mjs — ruscha interfeysda o'zbekcha qolgan matnni topadi.
   Har bir sahifa mkb-til=ru bilan headless Edge da ochiladi. Matn
   tugunlari va tarjima qilinadigan atributlar (placeholder, title,
   aria-label, alt, data-toast, data-yorliq) tekshiriladi.

   Tarjima qilinmaydigan qism ([data-tarjimasiz]) ichida o'lchov
   birliklari ("#birlik:") va lug'atda tarjimasi bor gaplar
   ("#tarjimasiz:") tekshiriladi. Xos nomlar bundan mustasno.

   Istisnolar: xos nomlar va manzillar (aktiv nomi, manzil, hudud,
   filial, xodim, xaridor, sud va tashkilot nomlari namoyish
   ma'lumotidan olinadi), hujjat raqamlari, kodlar va brendlar.

   Ishga tushirish (Edge kerak):
       node tests/tarjima.mjs
       node tests/tarjima.mjs --sahifa=panel.html,obyekt.html
       node tests/tarjima.mjs --json=natija.json
   Topilsa chiqish kodi 1.
   ============================================================ */
import fs from "node:fs";
import {ochish, sahifalarRoyxati, manzilQur, argumentlar} from "./brauzer.mjs";

const arg = argumentlar();
const sahifalar = sahifalarRoyxati(arg.sahifa ? arg.sahifa.split(",") : null);

/* Sahifa ichida bajariladi: tarjima qilinmagan matnlarni qaytaradi */
function yigish() {
  const D = window.MKB_DATA || {};
  const L = window.MKB_LUGAT || {};
  const Q = window.MKB_TARJIMA_QOIDALARI || [];
  const apos = m => m.replace(/[’ʼʻ`´]/g, "'");
  /* Xos nomlar: ma'lumotdan */
  const nomlar = new Set();
  const qosh = v => { if (typeof v === "string" && v.trim().length > 1) nomlar.add(apos(v.trim())); };
  const MAYDON = {
    YOZUVLAR: ["nom", "qisqa", "manzil", "hudud", "hududToliq", "tuman", "filial", "sobiqEga", "masul"],
    FILIALLAR: ["nom", "manzil", "rahbar"], FOYDLAR: ["nom", "ism", "bolim", "filial", "lavozim"],
    SHAXSLAR: ["ism", "tashkilot", "lavozim"], XARIDORLAR: ["nom", "ism", "vakil"], ADVOKATLAR: ["ism", "nom", "firma", "tashkilot"],
    SUD_MAJLISLAR: ["sud", "advokat", "zal"], TAKLIFLAR: ["xaridor"], SHARTNOMALAR: ["xaridor"], IJARA: ["ijarachi"],
    QORIQLASH: ["ijrochi"], BAHOLASHLAR: ["baholovchi", "tashkilot", "ijrochi"], SUGURTALAR: ["sugurtachi", "kompaniya"],
    POLISLAR: ["sugurtachi", "kompaniya"], KORIKLAR: ["inspektor", "ijrochi"], TASHRIFLAR: ["ism", "tashkilot"],
    KIRISH_SOROVLARI: ["ism", "tashkilot"], XIZMAT_ISHLARI: ["ijrochi", "pudratchi"], QURILMALAR: ["ishlabChiqaruvchi", "model"],
    QURILMA_KATALOG: ["ishlabChiqaruvchi", "model"], MENING_VAZIFALARIM: ["ijrochi"], TASDIQLAR: ["muallif"],
    ARXIV: ["nom", "qisqa", "manzil", "hudud", "xaridor"], LOTLAR: ["golib"]
  };
  Object.keys(MAYDON).forEach(k => (Array.isArray(D[k]) ? D[k] : []).forEach(r => {
    if (!r) return;
    MAYDON[k].forEach(m => qosh(r[m]));
    if (k === "YOZUVLAR" && r.qiymat) qosh(r.qiymat.baholovchi);
    if ((k === "QURILMALAR" || k === "QURILMA_KATALOG") && r.ishlabChiqaruvchi && r.model) qosh(r.ishlabChiqaruvchi + " " + r.model);
  }));
  (D.UNDIRUV_ISHLAR || []).forEach(i => {
    if (i.qarzdor) qosh(i.qarzdor.nom);
    if (i.garov) { qosh(i.garov.nom); qosh(i.garov.manzil); qosh(i.garov.hudud); }
    if (i.sud) qosh(i.sud.nomi);
    qosh(i.filial); qosh(i.masul);
  });
  Object.values(D.HUDUD_KODLAR || {}).forEach(h => { qosh(h.nom); qosh(h.toliq); qosh(h.markaz); });
  try { const s = JSON.parse(localStorage.getItem("mkb4-sessiya") || "{}"); qosh(s.ism); qosh(s.filial); } catch (_) { }
  const BREND = /^(MKBANK|MKB|Mikrokreditbank|OneID|E-IMZO|Reolink|Hikvision|Dahua|Ajax|Milesight|EFOY|LiFePO4|LoRaWAN|ONVIF|MQTT|GPS|NVR|SIM|APN|VPN|CSV|JSON|PDF|XLSX|DOCX|PNG|JPG|API|REST|IoT|4G|LTE|QR|VIN|STIR|PINFL|OSAGO|KASKO|MIB|YHXX|ABS|SMS|Face ID|OpenStreetMap|Leaflet|Uzcard|Humo)$/i;
  const kodmi = m => /^[\s\dA-Z«»"()№#.,:;\/\-–—+%×·•|°²³]+$/.test(m) || /^[A-Z]{1,5}[-\/][\w\-\/.]+$/.test(m);
  /* Sahifa allaqachon ruscha rejimda: DOM dagi matn tarjimadan keyingi holat. Bo'lak to'g'ri hisoblanadi,
     agar u xos nom, kod yoki brend bo'lsa, lotin so'zi bo'lmasa yoki ruscha bo'lib, o'zbekcha yordamchi so'z qolmagan bo'lsa. */
  const KIRILL = /[\u0400-\u04FF]/;
  const UZ_SOZ = /(^|[\s(])(va|uchun|bilan|yoki|kun|kunda|ta|tasi|yo'q|bor|gacha|dan|bo'yicha|oy|yil|soat|obyekt|aktiv)([\s),.:]|$)/i;
  /* Xodim ismi (namuna sifatida placeholder da ham) lotin yozuvida qoladi */
  const ISM = /^[A-Z][a-z']+(ov|ova|ev|eva|yev|yeva) [A-Z][a-z']+$/;
  const toza = b => nomlar.has(b) || ISM.test(b) || L[b] === b || /^[\w.+-]+@[\w.-]+$/.test(b) || kodmi(b) || BREND.test(b) || !/[A-Za-z]{2}/.test(b) || (KIRILL.test(b) && !UZ_SOZ.test(b));
  const bolakOk = b => toza(b) || b.split(/\s*[,:()]\s*/).map(x => x.trim()).filter(Boolean).every(toza);
  const qoldiq = k => {
    const a = apos(k);
    if (toza(a)) return false;
    const bolaklar = a.split(/\s*[·•|—–]\s*|\s+-\s+/).map(x => x.trim()).filter(Boolean);
    return !(bolaklar.length && bolaklar.every(bolakOk));
  };
  const natija = [];
  const yur = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let n;
  while ((n = yur.nextNode())) {
    const o = n.parentElement;
    if (!o || /^(SCRIPT|STYLE|NOSCRIPT|TEXTAREA)$/.test(o.tagName) || o.closest("[data-tarjimasiz]")) continue;
    const k = (n.nodeValue || "").trim();
    if (k && qoldiq(k)) natija.push(k);
  }
  /* Tarjima qilinmaydigan qism (raqam, kod, nom) ichida ham o'lchov birligi ruscha bo'lishi kerak */
  const yur2 = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while ((n = yur2.nextNode())) {
    const o = n.parentElement;
    if (!o || !o.closest("[data-tarjimasiz]") || /^(SCRIPT|STYLE)$/.test(o.tagName)) continue;
    const k = (n.nodeValue || "").trim();
    if (/\d\s*(mln |mlrd |ming )?so['’ʻʼ`]m|\d\s*kun(?![a-z'])/.test(k)) natija.push("#birlik: " + k);
    /* Lug'atda tarjimasi bor gap bu yerda o'zbekcha qolmasligi kerak (xos nomlar bundan mustasno) */
    const tarjimaBor = x => x && Object.prototype.hasOwnProperty.call(L, x) && L[x] !== x && !nomlar.has(x) && !kodmi(x) && !BREND.test(x);
    const a = apos(k);
    if (tarjimaBor(a) || a.split(/:\s+|\s*[·•|—–]\s*/).map(x => x.trim().replace(/[.,;]$/, "")).some(tarjimaBor))
      natija.push("#tarjimasiz: " + k);
  }
  const ATTR = ["placeholder", "title", "aria-label", "alt", "data-toast", "data-yorliq"];
  document.querySelectorAll(ATTR.map(a => "[" + a + "]").join(",")).forEach(el => {
    if (el.closest("[data-tarjimasiz]")) return;
    ATTR.forEach(a => { const v = (el.getAttribute(a) || "").trim(); if (v && qoldiq(v)) natija.push("@" + a + ": " + v); });
  });
  const t = document.title.split(" — ").slice(1).join(" — ");
  if (t && qoldiq(t)) natija.push("@title: " + t);
  return [...new Set(natija)];
}

/* Sessiyasiz ochiladigan sahifalar. Sessiya bilan ochilsa kirish.html darhol
   panelga yo'naltiradi, shuning uchun kirish ekrani va hujjatlar alohida,
   sessiyasiz ham tekshiriladi: rozilik bloki aynan shu holatda ko'rinadi. */
const OCHIQ = ["kirish.html", "oferta.html", "maxfiylik.html", "parol-tiklash.html", "parol-yangilash.html"];

const b = await ochish();
const hisobot = {};
let jami = 0;
async function tekshir(nom, manzil) {
  const xatolar = await b.kor(manzil, 1500);
  let qolgan = [];
  try { qolgan = await b.baho("(" + yigish + ")()"); } catch (e) { qolgan = ["! tekshirib bo'lmadi: " + e.message]; }
  if (xatolar.length) qolgan.push(...xatolar.map(x => "! skript xatosi: " + x));
  if (qolgan.length) { hisobot[nom] = qolgan; jami += qolgan.length; }
  process.stdout.write((qolgan.length ? "  [" + String(qolgan.length).padStart(3) + "] " : "  [ OK] ") + nom + "\n");
}
try {
  await b.olcham(1440, 900);
  await b.sessiya("ru", arg.rol || "Administrator");
  const idlar = await b.idlar();
  for (const f of sahifalar) await tekshir(f, manzilQur(f, idlar));
  const ochiq = sahifalar.filter(f => OCHIQ.includes(f));
  if (ochiq.length) {
    await b.kor("xato-404.html", 100);
    await b.baho('localStorage.clear(); localStorage.setItem("mkb-til", "ru"); localStorage.setItem("mkb-manba", "shartli");'
      + ' sessionStorage.setItem("mkb-mahalliy-yoq", "1"); true');
    for (const f of ochiq) await tekshir(f + " (sessiyasiz)", f);
  }
} finally {
  await b.yop();
}
if (arg.json) fs.writeFileSync(arg.json, JSON.stringify(hisobot, null, 1));
else Object.entries(hisobot).forEach(([f, r]) => { console.log("\n" + f); r.slice(0, 40).forEach(x => console.log("   " + x)); });
console.log("\nYakun: " + sahifalar.length + " sahifa, tarjimasiz matn: " + jami);
process.exit(jami ? 1 : 0);
