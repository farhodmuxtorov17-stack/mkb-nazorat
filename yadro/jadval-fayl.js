/* ============================================================
   Excel (.xlsx) va CSV: o'qish, namuna fayl yozish, import oynasini kengaytirish
   - uchinchi tomon kutubxonasi yo'q: .xlsx — bu ZIP ichidagi XML. ZIP brauzerning
     DecompressionStream("deflate-raw") orqali ochiladi, namuna fayl siqilmagan ZIP bo'lib yoziladi
   - MKB.jadvalImport(cfg) yadrodagi MKB.csvImport oynasini ochadi va unga .xlsx ni,
     "Namuna fayl" tugmalarini qo'shadi. Qatorlarni tekshirish va saqlash yadroda qoladi
   Sof funksiyalar window.MKB_JADVAL_FAYL da (Node sinovlari ham ishlatadi).
   ============================================================ */
(function(ildiz){
"use strict";

/* ---------- CRC-32 va ZIP ---------- */
const CRC = (() => { const t = new Uint32Array(256); for (let n = 0; n < 256; n++){ let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
function crc32(u8){ let c = 0xFFFFFFFF; for (let i = 0; i < u8.length; i++) c = CRC[(c ^ u8[i]) & 0xFF] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; }
const utf8 = s => new TextEncoder().encode(s);

/* Siqilmagan ZIP: fayllar [{nom, malumot: Uint8Array | string}] */
function zipYoz(fayllar){
  const qismlar = [], markaz = [];
  let joy = 0;
  const dosVaqt = 0x6000, dosSana = ((2026 - 1980) << 9) | (1 << 5) | 1;
  fayllar.forEach(f => {
    const nom = utf8(f.nom), d = typeof f.malumot === "string" ? utf8(f.malumot) : f.malumot, crc = crc32(d);
    const l = new DataView(new ArrayBuffer(30));
    l.setUint32(0, 0x04034b50, true); l.setUint16(4, 20, true); l.setUint16(6, 0x0800, true); l.setUint16(8, 0, true);
    l.setUint16(10, dosVaqt, true); l.setUint16(12, dosSana, true); l.setUint32(14, crc, true);
    l.setUint32(18, d.length, true); l.setUint32(22, d.length, true); l.setUint16(26, nom.length, true); l.setUint16(28, 0, true);
    const c = new DataView(new ArrayBuffer(46));
    c.setUint32(0, 0x02014b50, true); c.setUint16(4, 20, true); c.setUint16(6, 20, true); c.setUint16(8, 0x0800, true); c.setUint16(10, 0, true);
    c.setUint16(12, dosVaqt, true); c.setUint16(14, dosSana, true); c.setUint32(16, crc, true);
    c.setUint32(20, d.length, true); c.setUint32(24, d.length, true); c.setUint16(28, nom.length, true);
    c.setUint32(42, joy, true);
    qismlar.push(new Uint8Array(l.buffer), nom, d);
    markaz.push(new Uint8Array(c.buffer), nom);
    joy += 30 + nom.length + d.length;
  });
  const mUz = markaz.reduce((s, x) => s + x.length, 0);
  const e = new DataView(new ArrayBuffer(22));
  e.setUint32(0, 0x06054b50, true); e.setUint16(8, fayllar.length, true); e.setUint16(10, fayllar.length, true);
  e.setUint32(12, mUz, true); e.setUint32(16, joy, true);
  const hammasi = qismlar.concat(markaz, [new Uint8Array(e.buffer)]);
  const r = new Uint8Array(hammasi.reduce((s, x) => s + x.length, 0));
  let o = 0; hammasi.forEach(x => { r.set(x, o); o += x.length; });
  return r;
}
async function inflateRaw(u8){
  if (typeof DecompressionStream !== "function") throw new Error("Brauzer Excel faylni ocha olmaydi. Faylni CSV ko'rinishida saqlang");
  const s = new Blob([u8]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
  return new Uint8Array(await new Response(s).arrayBuffer());
}
/* ZIP ichidagi fayllar: Map(nom -> Uint8Array) */
async function zipOqi(buf){
  const u8 = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
  const dv = new DataView(u8.buffer, u8.byteOffset, u8.byteLength);
  let e = -1;
  for (let i = u8.length - 22; i >= Math.max(0, u8.length - 65557); i--) if (dv.getUint32(i, true) === 0x06054b50){ e = i; break; }
  if (e < 0) throw new Error("Fayl Excel (.xlsx) emas yoki buzilgan");
  const soni = dv.getUint16(e + 10, true);
  let o = dv.getUint32(e + 16, true);
  const r = new Map();
  for (let i = 0; i < soni; i++){
    if (dv.getUint32(o, true) !== 0x02014b50) throw new Error("Excel fayl tuzilmasi buzilgan");
    const usul = dv.getUint16(o + 10, true), siqUz = dv.getUint32(o + 20, true);
    const nUz = dv.getUint16(o + 28, true), xUz = dv.getUint16(o + 30, true), kUz = dv.getUint16(o + 32, true);
    const lh = dv.getUint32(o + 42, true);
    const nom = new TextDecoder().decode(u8.subarray(o + 46, o + 46 + nUz));
    const bosh = lh + 30 + dv.getUint16(lh + 26, true) + dv.getUint16(lh + 28, true);
    const d = u8.subarray(bosh, bosh + siqUz);
    if (usul === 0) r.set(nom, d);
    else if (usul === 8) r.set(nom, {siq: d});
    else throw new Error("Excel fayl qo'llanmaydigan usulda siqilgan");
    o += 46 + nUz + xUz + kUz;
  }
  for (const [k, v] of r) if (v && v.siq) r.set(k, await inflateRaw(v.siq));
  return r;
}

/* ---------- XLSX o'qish ---------- */
const xmlMatn = s => String(s).replace(/_x([0-9A-Fa-f]{4})_/g, (_, h) => String.fromCharCode(parseInt(h, 16)))
  .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16))).replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d))
  .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, "&");
const atr = (s, n) => { const m = new RegExp("(?:^|\\s)" + n + '="([^"]*)"').exec(s); return m ? m[1] : null; };
const tlar = s => { let r = ""; String(s).replace(/<rPh\b[\s\S]*?<\/rPh>/g, "").replace(/<t\b[^>]*>([\s\S]*?)<\/t>|<t\b[^>]*\/>/g, (_, t) => { r += t || ""; return ""; }); return xmlMatn(r); };
const ustunIndeksi = ref => { const m = /^([A-Z]+)/.exec(ref || ""); if (!m) return -1; let n = 0; for (const c of m[1]) n = n * 26 + c.charCodeAt(0) - 64; return n - 1; };
const SANA_ID = new Set([14, 15, 16, 17, 22, 27, 28, 29, 30, 31, 34, 35, 36, 50, 51, 52, 53, 54, 57, 58]);
function sanaFormatmi(kod){
  const t = String(kod || "").replace(/"[^"]*"/g, "").replace(/\[[^\]]*\]/g, "").replace(/\\./g, "");
  return /[dy]/i.test(t) && !/^[#0.,% ]*$/.test(t);
}
const p2 = n => String(n).padStart(2, "0");
function seriyaSana(n, t1904){
  const ms = Math.round((n + (t1904 ? 1462 : 0)) * 86400000) + Date.UTC(1899, 11, 30);
  const d = new Date(ms);
  return p2(d.getUTCDate()) + "." + p2(d.getUTCMonth() + 1) + "." + d.getUTCFullYear();
}
const sonMatn = v => { const n = Number(v); if (!Number.isFinite(n)) return String(v); return String(Math.round(n * 1e9) / 1e9).replace(".", ","); };

/* Birinchi varaq qatorlari: [[matn, ...], ...]; bo'sh qatorlar tashlab yuboriladi */
async function xlsxOqi(buf){
  const z = await zipOqi(buf);
  const matn = n => { const d = z.get(n); return d ? new TextDecoder().decode(d) : null; };
  const wb = matn("xl/workbook.xml");
  if (!wb) throw new Error("Fayl Excel (.xlsx) emas: ichida ishchi kitob yo'q");
  const t1904 = /date1904="(1|true)"/.test(wb);
  let varaq = null;
  const birinchi = /<sheet\b([^>]*)\/?>/.exec(wb);
  const rels = matn("xl/_rels/workbook.xml.rels");
  if (birinchi && rels){
    const rid = atr(birinchi[1], "r:id");
    const m = new RegExp('<Relationship\\b[^>]*Id="' + rid + '"[^>]*>').exec(rels);
    const tg = m ? atr(m[0], "Target") : null;
    if (tg) varaq = tg.replace(/^\//, "").replace(/^(?!xl\/)/, "xl/");
  }
  if (!varaq || !z.get(varaq)) varaq = [...z.keys()].filter(k => /^xl\/worksheets\/[^/]+\.xml$/.test(k)).sort()[0];
  if (!varaq) throw new Error("Excel faylda varaq topilmadi");
  const sst = [];
  const ss = matn("xl/sharedStrings.xml");
  if (ss) ss.replace(/<si\b[^>]*>([\s\S]*?)<\/si>|<si\b[^>]*\/>/g, (_, x) => { sst.push(tlar(x || "")); return ""; });
  const sanaUslub = [];
  const st = matn("xl/styles.xml");
  if (st){
    const fmt = {};
    st.replace(/<numFmt\b([^>]*)\/?>/g, (_, a) => { fmt[atr(a, "numFmtId")] = xmlMatn(atr(a, "formatCode") || ""); return ""; });
    const xfs = /<cellXfs\b[^>]*>([\s\S]*?)<\/cellXfs>/.exec(st);
    if (xfs) xfs[1].replace(/<xf\b([^>]*?)(?:\/>|>)/g, (_, a) => { const id = +atr(a, "numFmtId") || 0; sanaUslub.push(SANA_ID.has(id) || (id >= 164 && sanaFormatmi(fmt[id]))); return ""; });
  }
  const qatorlar = [];
  const sx = matn(varaq);
  sx.replace(/<row\b([^>]*?)(?:\/>|>([\s\S]*?)<\/row>)/g, (_, ra, ichki) => {
    const q = [];
    let oldingi = -1;
    String(ichki || "").replace(/<c\b([^>]*?)(?:\/>|>([\s\S]*?)<\/c>)/g, (__, a, ic) => {
      let i = ustunIndeksi(atr(a, "r"));
      if (i < 0) i = oldingi + 1;
      oldingi = i;
      const t = atr(a, "t"), s = +atr(a, "s") || 0;
      const vm = /<v\b[^>]*>([\s\S]*?)<\/v>/.exec(ic || "");
      const v = vm ? xmlMatn(vm[1]) : "";
      let qiymat = "";
      if (t === "s") qiymat = sst[+v] != null ? sst[+v] : "";
      else if (t === "inlineStr") qiymat = tlar((/<is\b[^>]*>([\s\S]*?)<\/is>/.exec(ic || "") || [])[1] || "");
      else if (t === "str") qiymat = v;
      else if (t === "b") qiymat = v === "1" ? "TRUE" : "FALSE";
      else if (t === "e") qiymat = "";
      else if (v !== "") qiymat = sanaUslub[s] ? seriyaSana(Number(v), t1904) : sonMatn(v);
      q[i] = String(qiymat).trim();
      return "";
    });
    for (let i = 0; i < q.length; i++) if (q[i] == null) q[i] = "";
    const ri = +atr(ra, "r");
    if (ri > 0) qatorlar[ri - 1] = q; else qatorlar.push(q);
    return "";
  });
  return Array.from(qatorlar, q => q || []).filter(q => q.some(x => String(x).trim() !== ""));
}

/* ---------- XLSX yozish: namuna fayl ---------- */
const xe = s => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const ustunHarf = i => { let s = ""; i++; while (i > 0){ const m = (i - 1) % 26; s = String.fromCharCode(65 + m) + s; i = Math.floor((i - 1) / 26); } return s; };
function varaqXml(qatorlar, kengliklar){
  const kat = (v, r, c, s) => '<c r="' + ustunHarf(c) + (r + 1) + '" t="inlineStr"' + (s ? ' s="' + s + '"' : "") + "><is><t xml:space=\"preserve\">" + xe(v) + "</t></is></c>";
  return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n' +
    '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">' +
    '<sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews>' +
    "<cols>" + kengliklar.map((k, i) => '<col min="' + (i + 1) + '" max="' + (i + 1) + '" width="' + k + '" customWidth="1"/>').join("") + "</cols>" +
    "<sheetData>" + qatorlar.map((q, r) => '<row r="' + (r + 1) + '">' + q.map((v, c) => kat(v, r, c, r === 0 ? 1 : 0)).join("") + "</row>").join("") + "</sheetData></worksheet>";
}
/* varaqlar: [{nom, qatorlar: [[...]]}] — birinchi qator sarlavha (qalin) */
function xlsxYoz(varaqlar){
  const kenglik = q => (q[0] || []).map((_, c) => Math.min(60, Math.max(10, ...q.map(r => String(r[c] == null ? "" : r[c]).length + 2))));
  const f = [
    {nom: "[Content_Types].xml", malumot: '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">' +
      '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/>' +
      '<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>' +
      '<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>' +
      varaqlar.map((_, i) => '<Override PartName="/xl/worksheets/sheet' + (i + 1) + '.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>').join("") + "</Types>"},
    {nom: "_rels/.rels", malumot: '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
      '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>'},
    {nom: "xl/workbook.xml", malumot: '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets>' +
      varaqlar.map((v, i) => '<sheet name="' + xe(String(v.nom).slice(0, 31)) + '" sheetId="' + (i + 1) + '" r:id="rId' + (i + 1) + '"/>').join("") + "</sheets></workbook>"},
    {nom: "xl/_rels/workbook.xml.rels", malumot: '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
      varaqlar.map((_, i) => '<Relationship Id="rId' + (i + 1) + '" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet' + (i + 1) + '.xml"/>').join("") +
      '<Relationship Id="rId' + (varaqlar.length + 1) + '" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>'},
    {nom: "xl/styles.xml", malumot: '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">' +
      '<fonts count="2"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><name val="Calibri"/></font></fonts>' +
      '<fills count="3"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FFF2EFEB"/></patternFill></fill></fills>' +
      '<borders count="1"><border/></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>' +
      '<cellXfs count="2"><xf numFmtId="49" fontId="0" fillId="0" borderId="0" applyNumberFormat="1"/><xf numFmtId="49" fontId="1" fillId="2" borderId="0" applyFont="1" applyFill="1" applyNumberFormat="1"/></cellXfs></styleSheet>'},
  ].concat(varaqlar.map((v, i) => ({nom: "xl/worksheets/sheet" + (i + 1) + ".xml", malumot: varaqXml(v.qatorlar, kenglik(v.qatorlar))})));
  return zipYoz(f);
}

/* ---------- CSV ---------- */
const csvMatn = qatorlar => "﻿" + qatorlar.map(q => q.map(v => '"' + String(v == null ? "" : v).replace(/"/g, '""') + '"').join(";")).join("\r\n");
const xlsxmi = f => /\.xlsx$/i.test(f && f.name || "") || /spreadsheetml/.test(f && f.type || "");

const J = {crc32, zipYoz, zipOqi, xlsxOqi, xlsxYoz, csvMatn, seriyaSana, sanaFormatmi, xlsxmi};
ildiz.MKB_JADVAL_FAYL = J;
if (typeof document === "undefined" || !ildiz.MKB) return;

/* ============================================================
   DOM: MKB.jadvalImport — yadrodagi import oynasi + Excel + namuna fayl
   cfg: MKB.csvImport kaliti hammasi, qo'shimcha:
     faylNomi: "aktivlar-namuna",  namuna: [[...ustunlar tartibida]],  qoidalar: {kalit: "qisqa qoida"}
   ============================================================ */
const MKB = ildiz.MKB;
const tarjima = el => { if (typeof ildiz.tarjimaQil === "function") ildiz.tarjimaQil(el); };
const e_ = s => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
function yuklab(nom, blob){
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = nom;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
}
function namunaQatorlar(cfg){
  const ust = cfg.ustunlar || [];
  return [ust.map(u => MKB.matn(u.nom))].concat((cfg.namuna || []).map(q => ust.map((_, i) => q[i] == null ? "" : q[i])));
}
function namunaXlsx(cfg){
  const ust = cfg.ustunlar || [];
  const qoida = [[MKB.matn("Ustun"), MKB.matn("Majburiy"), MKB.matn("Qoida")]].concat(ust.map(u => [MKB.matn(u.nom), MKB.matn(u.majburiy ? "Ha" : "Yo'q"),
    MKB.matn((cfg.qoidalar || {})[u.kalit] || (u.format === "pul" ? "mln so'm, masalan 412,5" : ""))]));
  const b = xlsxYoz([{nom: MKB.matn("Ma'lumot"), qatorlar: namunaQatorlar(cfg)}, {nom: MKB.matn("Ustunlar"), qatorlar: qoida}]);
  yuklab((cfg.faylNomi || "import-namuna") + ".xlsx", new Blob([b], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}));
}
function kengaytir(p, cfg){
  const inp = p.querySelector('.csv-import input[type="file"]');
  if (!inp) return;
  const yadroXlsx = /xlsx/.test(inp.getAttribute("accept") || "");
  if (!yadroXlsx){
    inp.setAttribute("accept", ".xlsx,.csv,text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    const b = inp.closest(".fayl-maydon") && inp.closest(".fayl-maydon").querySelector("b");
    if (b) b.textContent = "Excel yoki CSV faylni tanlang";
    const iz = p.querySelector(".csv-import > .maydon-izoh");
    if (iz) iz.textContent = "Excel (.xlsx, birinchi varaq) yoki CSV (UTF-8 yoki Windows-1251, ajratgich «;» yoki «,»). Birinchi qator — ustun nomlari, ustunlar nomi bo'yicha moslanadi.";
    /* .xlsx tanlansa: CSV ga aylantirilib yadroning o'z ishlovchisiga beriladi */
    let ichki = false;
    p.addEventListener("change", async e => {
      if (e.target !== inp || ichki) return;
      const f = inp.files && inp.files[0];
      if (!xlsxmi(f)) return;
      e.stopImmediatePropagation();
      try{
        const q = await xlsxOqi(await f.arrayBuffer());
        if (q.length < 2){ MKB.toast("Excel faylning birinchi varag'ida ma'lumot qatori yo'q", "xavf"); inp.value = ""; return; }
        const csv = new File([csvMatn(q)], f.name.replace(/\.xlsx$/i, "") + ".csv", {type: "text/csv"});
        const dt = new DataTransfer();
        dt.items.add(csv);
        inp.files = dt.files;
        ichki = true;
        inp.dispatchEvent(new Event("change", {bubbles: true}));
      }catch(err){
        MKB.toast("Excel faylni o'qib bo'lmadi: " + (err && err.message ? err.message : "fayl buzilgan"), "xavf");
        inp.value = "";
      }finally{ ichki = false; }
    }, true);
  }
  /* Namuna: to'g'ri ustunlar va bitta-ikkita misol qator, ikkinchi varaqda ustun qoidalari */
  const joy = p.querySelector(".csv-import .fayl-joy") || inp.closest(".fayl-maydon");
  if (joy && !p.querySelector("[data-namuna]")){
    const d = document.createElement("div");
    d.className = "import-namuna";
    d.style.cssText = "display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-top:12px";
    d.innerHTML = '<span class="maydon-izoh" style="margin:0">Ustunlari tayyor fayl:</span>' +
      '<button type="button" class="tugma tugma-oq tugma-kichik" data-namuna="xlsx">' + (MKB.ik ? MKB.ik("yuklab") : "") + "<span>Namuna fayl (.xlsx)</span></button>" +
      '<button type="button" class="tugma tugma-oq tugma-kichik" data-namuna="csv">' + (MKB.ik ? MKB.ik("csv") : "") + "<span>CSV</span></button>";
    joy.after(d);
    d.addEventListener("click", e => {
      const b = e.target.closest("[data-namuna]");
      if (!b) return;
      if (b.dataset.namuna === "xlsx") namunaXlsx(cfg);
      else yuklab((cfg.faylNomi || "import-namuna") + ".csv", new Blob([csvMatn(namunaQatorlar(cfg))], {type: "text/csv;charset=utf-8"}));
    });
  }
  /* Tekshiruv jadvalida "Holat" ustuni ko'p ustunli faylda o'ng chetda yashirinib qoladi:
     u № dan keyingi joyga ko'chiriladi, xatolar ekranning o'zida o'qiladi */
  const ci = p.querySelector(".csv-import");
  if (ci){
    const kochir = () => {
      const t = ci.querySelector(".csv-korik table:not([data-holat-oldinda])");
      if (!t) return;
      t.setAttribute("data-holat-oldinda", "1");
      t.querySelectorAll("tr").forEach(tr => { const c = tr.lastElementChild, ikkinchi = tr.children[1]; if (c && ikkinchi && c !== ikkinchi) tr.insertBefore(c, ikkinchi); });
      t.querySelectorAll("tbody td:nth-child(2)").forEach(td => { td.style.minWidth = "220px"; });
    };
    new MutationObserver(kochir).observe(ci, {childList: true, subtree: true});
  }
  tarjima(p.querySelector(".csv-import"));
}
MKB.jadvalImport = async function(cfg){
  if (typeof MKB.csvImport !== "function") await new Promise(r => { if (ildiz.MKB_UX_TAYYOR) r(); else document.addEventListener("mkb:ux", r, {once: true}); });
  /* qaytaYukla: oyna yopilgach, biror qator saqlangan bo'lsa sahifa ma'lumoti qayta o'qiladi */
  let saqlandi = 0;
  const asl = cfg.keyin;
  cfg = Object.assign({}, cfg, {keyin(n){ saqlandi = n && n.saqlandi || 0; if (typeof asl === "function") asl(n); }});
  const p = MKB.csvImport(cfg);
  if (p) kengaytir(p, cfg);
  if (p && cfg.qaytaYukla){
    const kuz = new MutationObserver(() => { if (!p.isConnected){ kuz.disconnect(); if (saqlandi) location.reload(); } });
    kuz.observe(document.body, {childList: true, subtree: true});
  }
  return p;
};
/* Import qatorlaridagi umumiy tekshiruvlar */
const kichikM = s => String(s || "").trim().toLowerCase().replace(/[‘’ʻʼ`]/g, "'");
MKB.importYordam = {
  kichik: kichikM,
  /* Obyekt: reyestr raqami (AK-2026/1234) yoki to'liq nomi; balansdan chiqarilgan va doiradan tashqaridagilar hisobga olinmaydi */
  obyekt(v){
    const D = ildiz.MKB_DATA || {};
    const k = kichikM(v);
    return k ? MKB.doira((D.YOZUVLAR || []).filter(y => y && y.holat !== "Chiqarildi")).find(y => kichikM(y.id) === k || kichikM(y.nom) === k) || null : null;
  },
  /* "kk.oo.yyyy" sana: Date yoki null */
  sana(v){
    const D = ildiz.MKB_DATA || {};
    return /^\d{1,2}[.\/-]\d{1,2}[.\/-]\d{4}$/.test(String(v || "").trim()) ? D.sanaOqi(String(v).trim()) || null : null;
  },
  bugun(){ const b = MKB.bugun(); return new Date(b.getFullYear(), b.getMonth(), b.getDate()); },
  /* Ro'yxatdagi variant: kalit yoki nomi bo'yicha */
  variant(royxat, v){ const k = kichikM(v); return (royxat || []).find(x => kichikM(x[0]) === k || kichikM(x[1]) === k) || null; },
};
})(typeof window !== "undefined" ? window : globalThis);
