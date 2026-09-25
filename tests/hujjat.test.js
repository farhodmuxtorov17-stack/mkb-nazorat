/* ============================================================
   hujjat.test.js — chop etiladigan shakllar, import va inspektor ishi:
   SHA-256 va tekshirish kodi, QR kod (tuzilmasi va Reed–Solomon), yagona shablon ulanishi,
   Excel o'qish/yozish, marshrut va masofa, EXIF, import sahifalarida to'rt ko'z qoidasi.
   Ishga tushirish: node tests/hujjat.test.js
   ============================================================ */
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm"), crypto = require("crypto"), zlib = require("zlib");
const ILDIZ = path.join(__dirname, "..");
let otdi = 0, yiqildi = 0;
async function tekshir(nom, fn){
  try{ await fn(); otdi++; console.log("  [OK]   " + nom); }
  catch(e){ yiqildi++; console.log("  [XATO] " + nom + "\n         " + e.message); }
}
function talab(shart, xabar){ if (!shart) throw new Error(xabar); }
const teng = (a, b, nom) => talab(JSON.stringify(a) === JSON.stringify(b), (nom || "") + " kutilgan " + JSON.stringify(b) + ", keldi " + JSON.stringify(a));
const matn = f => fs.readFileSync(path.join(ILDIZ, f), "utf8");

/* Modullar DOM siz yuklanadi: sof qismi window.MKB_HUJJAT va window.MKB_JADVAL_FAYL ga chiqadi */
const qum = {window: {}, TextEncoder, TextDecoder, Blob, Response, DecompressionStream, console};
qum.window = qum;
vm.runInNewContext(matn("yadro/dalolatnoma.js"), qum, {filename: "dalolatnoma.js"});
vm.runInNewContext(matn("yadro/jadval-fayl.js"), qum, {filename: "jadval-fayl.js"});
const H = qum.MKB_HUJJAT, J = qum.MKB_JADVAL_FAYL;

/* ---------- QR ni mustaqil o'qish: format, versiya, niqob, bloklar, Reed–Solomon, ma'lumot ---------- */
const QR_M = [null, [10, [[1, 16]]], [16, [[1, 28]]], [26, [[1, 44]]], [18, [[2, 32]]], [24, [[2, 43]]],
  [16, [[4, 27]]], [18, [[4, 31]]], [22, [[2, 38], [2, 39]]], [22, [[3, 36], [2, 37]]]];
const TEKIS = [null, [], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46]];
const EXP = [], LOG = [];
{ let x = 1; for (let i = 0; i < 255; i++){ EXP[i] = x; LOG[x] = i; x <<= 1; if (x & 0x100) x ^= 0x11D; } }
const gfK = (a, b) => a && b ? EXP[(LOG[a] + LOG[b]) % 255] : 0;
function qrOqi(m){
  const n = m.length, v = (n - 17) / 4;
  talab(Number.isInteger(v) && v >= 1 && v <= 9, "o'lcham noto'g'ri: " + n);
  const fn = Array.from({length: n}, () => new Array(n).fill(false));
  const band = (x, y) => { if (x >= 0 && y >= 0 && x < n && y < n) fn[y][x] = true; };
  for (let i = 0; i < n; i++){ band(6, i); band(i, 6); }
  [[3, 3], [n - 4, 3], [3, n - 4]].forEach(([cx, cy]) => { for (let dy = -4; dy <= 4; dy++) for (let dx = -4; dx <= 4; dx++) band(cx + dx, cy + dy); });
  const al = TEKIS[v];
  for (let i = 0; i < al.length; i++) for (let j = 0; j < al.length; j++){
    if ((i === 0 && j === 0) || (i === 0 && j === al.length - 1) || (i === al.length - 1 && j === 0)) continue;
    for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) band(al[i] + dx, al[j] + dy);
  }
  for (let i = 0; i < 9; i++){ band(8, i); band(i, 8); }
  for (let i = 0; i < 8; i++){ band(n - 1 - i, 8); band(8, n - 1 - i); }
  if (v >= 7) for (let i = 0; i < 18; i++){ band(n - 11 + i % 3, Math.floor(i / 3)); band(Math.floor(i / 3), n - 11 + i % 3); }
  /* Format: birinchi nusxa */
  const q = (x, y) => m[y][x] ? 1 : 0;
  let f = 0;
  const olin = [];
  for (let i = 0; i <= 5; i++) olin.push(q(8, i));
  olin.push(q(8, 7), q(8, 8), q(7, 8));
  for (let i = 9; i < 15; i++) olin.push(q(14 - i, 8));
  olin.forEach((b, i) => { f |= b << i; });
  f ^= 0x5412;
  const dat = f >>> 10;
  let r = dat; for (let i = 0; i < 10; i++) r = (r << 1) ^ ((r >>> 9) * 0x537);
  talab((((dat << 10) | r) & 0x7FFF) === f, "format bitlari BCH ga mos emas");
  talab((dat >>> 3) === 0, "xato tuzatish darajasi M emas");
  const mask = dat & 7;
  /* Ikkinchi nusxa birinchisiga teng */
  let f2 = 0;
  for (let i = 0; i < 8; i++) f2 |= q(n - 1 - i, 8) << i;
  for (let i = 8; i < 15; i++) f2 |= q(8, n - 15 + i) << i;
  talab((f2 ^ 0x5412) === f, "format bitlarining ikkinchi nusxasi farq qiladi");
  talab(q(8, n - 8) === 1, "qora modul yo'q");
  if (v >= 7){
    let vb = 0;
    for (let i = 0; i < 18; i++) vb |= q(n - 11 + i % 3, Math.floor(i / 3)) << i;
    let rv = v; for (let i = 0; i < 12; i++) rv = (rv << 1) ^ ((rv >>> 11) * 0x1F25);
    talab(vb === ((v << 12) | rv), "versiya bitlari noto'g'ri");
  }
  const MASK = [(x, y) => (x + y) % 2 === 0, (x, y) => y % 2 === 0, x => x % 3 === 0, (x, y) => (x + y) % 3 === 0,
    (x, y) => (Math.floor(x / 3) + Math.floor(y / 2)) % 2 === 0, (x, y) => x * y % 2 + x * y % 3 === 0,
    (x, y) => (x * y % 2 + x * y % 3) % 2 === 0, (x, y) => ((x + y) % 2 + x * y % 3) % 2 === 0];
  const bitlar = [];
  for (let ong = n - 1; ong >= 1; ong -= 2){
    if (ong === 6) ong = 5;
    for (let vert = 0; vert < n; vert++) for (let j = 0; j < 2; j++){
      const x = ong - j, y = ((ong + 1) & 2) === 0 ? n - 1 - vert : vert;
      if (!fn[y][x]) bitlar.push(q(x, y) ^ (MASK[mask](x, y) ? 1 : 0));
    }
  }
  const [ec, g] = QR_M[v];
  const bloklar = [];
  g.forEach(([soni, uz]) => { for (let i = 0; i < soni; i++) bloklar.push({uz, d: []}); });
  const jami = bloklar.reduce((s, b) => s + b.uz + ec, 0);
  const soz = [];
  for (let i = 0; i < jami; i++){ let b = 0; for (let k = 0; k < 8; k++) b = (b << 1) | bitlar[i * 8 + k]; soz.push(b); }
  let o = 0;
  const eng = Math.max(...bloklar.map(b => b.uz));
  for (let i = 0; i < eng; i++) bloklar.forEach(b => { if (i < b.uz) b.d.push(soz[o++]); });
  for (let i = 0; i < ec; i++) bloklar.forEach(b => b.d.push(soz[o++]));
  bloklar.forEach((b, bi) => {
    for (let s = 0; s < ec; s++){
      let y = 0; const a = EXP[s];
      b.d.forEach(c => { y = gfK(y, a) ^ c; });
      talab(y === 0, (bi + 1) + "-blokda Reed–Solomon sindromi nol emas");
    }
  });
  const data = [].concat(...bloklar.map(b => b.d.slice(0, b.uz)));
  const db = [];
  data.forEach(x => { for (let k = 7; k >= 0; k--) db.push((x >>> k) & 1); });
  const ol = (i, u) => { let r2 = 0; for (let k = 0; k < u; k++) r2 = (r2 << 1) | db[i + k]; return r2; };
  talab(ol(0, 4) === 4, "rejim bayt emas");
  const uz = ol(4, 8), bayt = [];
  for (let i = 0; i < uz; i++) bayt.push(ol(12 + i * 8, 8));
  return {v, matn: new TextDecoder().decode(Uint8Array.from(bayt))};
}

(async function(){
  console.log("\n1. Tekshirish kodi");
  await tekshir("SHA-256 Node crypto bilan bir xil (bo'sh, 55/56/64 bayt chegarasi, UTF-8, 1000 bayt)", () => {
    for (const s of ["", "abc", "x".repeat(55), "x".repeat(56), "x".repeat(63), "x".repeat(64), "Ko'rik dalolatnomasi — № KO-2026/0404 · Oʻzbek", "y".repeat(1000)])
      teng(H.sha256(s), crypto.createHash("sha256").update(s, "utf8").digest("hex"), JSON.stringify(s.slice(0, 12)));
  });
  const model = {tur: "korik", raqam: "KO-2026/0404", sana: "25.09.2026", obyekt: {id: "AK-2026/4471", nom: "Namuna"},
    bolimlar: [{sarlavha: "Bandlar", jadval: {ustunlar: ["№", "Band"], qatorlar: [["1", {t: "Eshik butun"}]]}}, {sarlavha: "Xulosa", matn: "Butun"}],
    fotolar: [{id: "FL-1", src: "blob:a"}], komissiya: [{rol: "Inspektor", ism: "A"}]};
  await tekshir("kod formati XXXX-XXXX-XXXX va kalit tartibiga bog'liq emas", () => {
    const k = H.kodHisobla(model);
    talab(/^[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}$/.test(k), "format: " + k);
    teng(H.kanonik({b: 1, a: [2, {d: 1, c: null}]}), '{"a":[2,{"c":null,"d":1}],"b":1}');
  });
  await tekshir("kod surat manzili va chop vaqtiga bog'liq emas, mazmun o'zgarsa o'zgaradi", () => {
    const k = H.kodHisobla(model);
    teng(H.kodHisobla(Object.assign({}, model, {fotolar: [{id: "FL-1", src: "blob:boshqa"}], vaqt: "23:59"})), k, "manzil/vaqt");
    talab(H.kodHisobla(Object.assign({}, model, {bolimlar: [model.bolimlar[0], {sarlavha: "Xulosa", matn: "Buzilgan"}]})) !== k, "xulosa o'zgargani sezilmadi");
    talab(H.kodHisobla(Object.assign({}, model, {qoralama: "Surat yetarli emas"})) !== k, "qoralama belgisi sezilmadi");
    talab(H.kodHisobla(Object.assign({}, model, {komissiya: [{rol: "Inspektor", ism: "B"}]})) !== k, "imzolovchi o'zgargani sezilmadi");
    teng(H.kodHisobla(Object.assign({}, model, {sana: "26.09.2026", sanaXeshda: false})), H.kodHisobla(Object.assign({}, model, {sanaXeshda: false})), "chop sanasi");
  });
  await tekshir("surat qoidasi: kam bo'lsa sabab, yetarli bo'lsa null", () => {
    teng(H.suratQoidasi(2, 6).matn, "Surat qoidasi bajarilmagan: 2 / 6");
    teng(H.suratQoidasi(6, 6), null);
    teng(H.suratQoidasi(0, 0), null);
  });

  console.log("\n2. QR kod");
  await tekshir("1–3 versiyada inventarizatsiya yorlig'idagi generator bilan bir xil matritsa", () => {
    const s = matn("inventarizatsiya.html");
    const eski = new Function(s.slice(s.indexOf("function qrMatritsa"), s.indexOf("function qrSvg")) + "; return qrMatritsa;")();
    for (let L = 1; L <= 42; L += 3) for (const c of ["MKB:INV-0", "x", "Ab9/"]){ const t = c.repeat(50).slice(0, L); teng(JSON.stringify(H.qrMatritsa(t)) === JSON.stringify(eski(t)), true, t); }
  });
  await tekshir("har versiyada (1–9) mustaqil o'quvchi format, versiya bitlari, Reed–Solomon va matnni tasdiqlaydi", () => {
    const n0 = "https://farhodmuxtorov17-stack.github.io/mkb-nazorat/inventar-dalolatnoma.html?id=INVZ-2025%2F01&dalolatnoma=x&kod=3F9A-C12B-7E0D";
    const korildi = new Set();
    for (const L of [5, 20, 40, 60, 80, 100, 110, 130, 150, 175, 180]){
      const t = (n0 + n0).slice(0, L);
      const r = qrOqi(H.qrMatritsa(t));
      teng(r.matn, t, "L=" + L);
      korildi.add(r.v);
    }
    talab([1, 2, 3, 4, 5, 6, 7, 8, 9].every(v => korildi.has(v)), "hamma versiya sinalmadi: " + [...korildi]);
  });
  await tekshir("181 baytdan uzun matn aniq xato beradi", () => {
    let x = null; try{ H.qrMatritsa("x".repeat(181)); }catch(e){ x = e.message; }
    teng(x, "Matn QR uchun juda uzun");
  });

  console.log("\n3. Excel va CSV");
  await tekshir("namuna .xlsx yozilib qayta o'qiladi: maxsus belgilar, bo'sh katak, o'zbek harflari", async () => {
    const q = [["Nomi", "Balans qiymati", "Sana"], ['Toshkent, "A&B" <1>', "412,5", "01.02.2026"], ["Oʻzbek g'alla", "", "x"]];
    const b = J.xlsxYoz([{nom: "Ma'lumot", qatorlar: q}, {nom: "Ustunlar", qatorlar: [["a"]]}]);
    teng(await J.xlsxOqi(b), q);
  });
  await tekshir("siqilgan (deflate) .xlsx: umumiy satrlar, sana uslubi, son, mantiqiy qiymat, bo'sh qator", async () => {
    const fayllar = {
      "xl/workbook.xml": '<workbook><sheets><sheet name="A" sheetId="1" r:id="rId1"/></sheets></workbook>',
      "xl/_rels/workbook.xml.rels": '<Relationships><Relationship Id="rId1" Target="worksheets/sheet1.xml"/></Relationships>',
      "xl/sharedStrings.xml": "<sst><si><t>Nomi</t></si><si><r><t>Uy </t></r><r><t>№5</t></r></si><si><t>Sana</t></si></sst>",
      "xl/styles.xml": '<styleSheet><numFmts><numFmt numFmtId="164" formatCode="dd/mm/yyyy;@"/></numFmts><cellXfs><xf numFmtId="0"/><xf numFmtId="164"/><xf numFmtId="14"/></cellXfs></styleSheet>',
      "xl/worksheets/sheet1.xml": '<worksheet><sheetData><row r="1"><c r="A1" t="s"><v>0</v></c><c r="C1" t="s"><v>2</v></c></row>' +
        '<row r="2"><c r="A2" t="s"><v>1</v></c><c r="B2"><v>412.5</v></c><c r="C2" s="1"><v>46054</v></c><c r="D2" t="b"><v>1</v></c></row>' +
        '<row r="3"/><row r="4"><c r="A4" t="inlineStr"><is><t>Qator &amp; 4</t></is></c><c r="C4" s="2"><v>46022.4</v></c></row></sheetData></worksheet>',
    };
    const qism = [], markaz = [];
    let joy = 0;
    for (const [nom, t] of Object.entries(fayllar)){
      const d = Buffer.from(t, "utf8"), z = zlib.deflateRawSync(d), nb = Buffer.from(nom);
      const l = Buffer.alloc(30); l.writeUInt32LE(0x04034b50, 0); l.writeUInt16LE(8, 8); l.writeUInt32LE(J.crc32(d), 14); l.writeUInt32LE(z.length, 18); l.writeUInt32LE(d.length, 22); l.writeUInt16LE(nb.length, 26);
      const c = Buffer.alloc(46); c.writeUInt32LE(0x02014b50, 0); c.writeUInt16LE(8, 10); c.writeUInt32LE(J.crc32(d), 16); c.writeUInt32LE(z.length, 20); c.writeUInt32LE(d.length, 24); c.writeUInt16LE(nb.length, 28); c.writeUInt32LE(joy, 42);
      qism.push(l, nb, z); markaz.push(c, nb); joy += 30 + nb.length + z.length;
    }
    const m = Buffer.concat(markaz), e = Buffer.alloc(22);
    e.writeUInt32LE(0x06054b50, 0); e.writeUInt16LE(5, 8); e.writeUInt16LE(5, 10); e.writeUInt32LE(m.length, 12); e.writeUInt32LE(joy, 16);
    const r = await J.xlsxOqi(Buffer.concat(qism.concat([m, e])));
    teng(r, [["Nomi", "", "Sana"], ["Uy №5", "412,5", "01.02.2026", "TRUE"], ["Qator & 4", "", "31.12.2025"]]);
  });
  await tekshir("buzilgan fayl tushunarli xato beradi", async () => {
    let x = null; try{ await J.xlsxOqi(new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23])); }catch(er){ x = er.message; }
    teng(x, "Fayl Excel (.xlsx) emas yoki buzilgan");
  });
  await tekshir("CSV: BOM, «;» ajratgich, qo'shtirnoq ikkilanadi", () => {
    teng(J.csvMatn([["a", 'b"c'], ["1;2", null]]), '﻿"a";"b""c"\r\n"1;2";""');
  });
  await tekshir("Excel sana formatini sondan ajratadi", () => {
    teng([J.sanaFormatmi("dd.mm.yyyy"), J.sanaFormatmi("[$-419]d mmmm yyyy"), J.sanaFormatmi("0.00"), J.sanaFormatmi('#,##0" so\'m"')], [true, true, false, false]);
    teng(J.seriyaSana(46054), "01.02.2026");
  });

  console.log("\n4. Joylashuv, marshrut va surat muhri");
  await tekshir("masofa: Toshkent – Samarqand 260–275 km, bir nuqta 0 m, koordinatasiz null", () => {
    const d = H.masofa({lat: 41.311, lng: 69.279}, {lat: 39.654, lng: 66.959});
    talab(d > 260000 && d < 275000, "masofa " + d);
    teng(H.masofa({lat: 41, lng: 69}, {lat: 41, lng: 69}), 0);
    teng(H.masofa({lat: 41}, {lat: 41, lng: 69}), null);
    teng([H.masofaMatn(1234), H.masofaMatn(80), H.masofaMatn(271500, true), H.masofaMatn(300, true)], ["1,2 km", "80 m", "≈ 271,5 km", "shu hududda"]);
  });
  await tekshir("marshrut: birinchi nuqtadan har safar eng yaqini, koordinatasizlar oxirida, taxminiy belgisi", () => {
    const A = {id: "A", lat: 41.0, lng: 69.0}, B = {id: "B", lat: 41.5, lng: 69.0}, C = {id: "C", lat: 41.05, lng: 69.0, aniq: false}, X = {id: "X"};
    const r = H.marshrut([A, B, X, C], null);
    teng(r.map(x => x.nuqta.id), ["A", "C", "B", "X"]);
    teng(r[0].masofa, null); teng(r[1].taxminiy, true); teng(r[3].masofa, null);
    teng(H.marshrut([A, B], {lat: 41.6, lng: 69.0}).map(x => x.nuqta.id), ["B", "A"], "boshlanish nuqtasidan");
  });
  await tekshir("EXIF: suratga olingan vaqt va GPS (Intel va Motorola bayt tartibi), EXIF siz JPEG — null", () => {
    const jpeg = le => {
      const t = Buffer.alloc(200);
      const u16 = (o, v) => le ? t.writeUInt16LE(v, o) : t.writeUInt16BE(v, o), u32 = (o, v) => le ? t.writeUInt32LE(v, o) : t.writeUInt32BE(v, o);
      t.write(le ? "II" : "MM", 0, "latin1"); u16(2, 42); u32(4, 8);
      u16(8, 2); u16(10, 0x8769); u16(12, 4); u32(14, 1); u32(18, 38); u16(22, 0x8825); u16(24, 4); u32(26, 1); u32(30, 64); u32(34, 0);
      u16(38, 1); u16(40, 0x9003); u16(42, 2); u32(44, 20); u32(48, 172); u32(52, 0);
      t.write("2026:09:22 10:15:00\0", 172, "latin1");
      u16(64, 4);
      u16(66, 1); u16(68, 2); u32(70, 2); t.write("N\0", 74, "latin1");
      u16(78, 2); u16(80, 5); u32(82, 3); u32(86, 124);
      u16(90, 3); u16(92, 2); u32(94, 2); t.write("E\0", 98, "latin1");
      u16(102, 4); u16(104, 5); u32(106, 3); u32(110, 148);
      [[41, 1], [21, 1], [6, 1]].forEach(([a, b], i) => { u32(124 + i * 8, a); u32(128 + i * 8, b); });
      [[69, 1], [17, 1], [8, 1]].forEach(([a, b], i) => { u32(148 + i * 8, a); u32(152 + i * 8, b); });
      const app1 = Buffer.concat([Buffer.from("Exif\0\0", "latin1"), t]);
      const bosh = Buffer.alloc(4); bosh.writeUInt16BE(0xFFE1, 0); bosh.writeUInt16BE(app1.length + 2, 2);
      return new Uint8Array(Buffer.concat([Buffer.from([0xFF, 0xD8]), bosh, app1, Buffer.from([0xFF, 0xD9])]));
    };
    for (const le of [true, false]) teng(H.exifOqi(jpeg(le)), {vaqt: "22.09.2026 10:15", lat: 41.351667, lng: 69.285556}, le ? "II" : "MM");
    teng(H.exifOqi(new Uint8Array([0xFF, 0xD8, 0xFF, 0xD9])), null);
  });

  console.log("\n5. Sahifalar: shablon, tugmalar va importdagi to'rt ko'z");
  const AKT = ["korik-akti.html", "qabul-dalolatnoma.html", "inventar-dalolatnoma.html", "obyekt-pasport.html"];
  await tekshir("to'rt dalolatnoma bitta shablondan chiqadi, eski qo'lda yozilgan varaq uslubi qolmagan", () => {
    AKT.forEach(f => {
      const s = matn(f);
      talab(s.includes('src="yadro/dalolatnoma.js?v=') && s.includes('href="yadro/dalolatnoma.css?v='), f + ": shablon ulanmagan");
      talab(/MKB\.dalolatnoma\.chiz\(/.test(s), f + ": varaq shablon orqali chizilmaydi");
      talab(!/\.akt-imzo|\.ps-imzo|\.varaq \.imzolar/.test(s), f + ": eski imzo uslubi qolgan");
    });
  });
  await tekshir("uchta yangi shakl tugmasi: chiqim, arxiv, shartnoma, hodisa sahifalarida", () => {
    [["chiqim-tasdiqlash.html", "chiqim"], ["arxiv-obyekt.html", "chiqim"], ["shartnoma.html", "topshirish"], ["hodisa.html", "hodisa"]].forEach(([f, t]) => {
      const s = matn(f);
      talab(s.includes('src="yadro/dalolatnoma.js?v='), f + ": modul ulanmagan");
      talab(new RegExp('MKB\\.dalolatnoma\\.tugma\\([\\s\\S]{0,40}?"' + t + '"').test(s), f + ": " + t + " tugmasi yo'q");
    });
  });
  await tekshir("chopda URL qatori va yadro sarlavhasi yashirinadi, QR tekshiruvi joriy kodni ko'rsatmaydi", () => {
    const c = matn("yadro/dalolatnoma.css"), j = matn("yadro/dalolatnoma.js");
    talab(/body\.dn-sahifa \.chop-oyoq/.test(c) && /body\.dn-chop \.chop-oyoq/.test(c), "chop-oyoq yashirilmagan");
    talab(/@page\{size:A4/.test(c), "A4 belgilanmagan");
    talab(!/joriy kod/.test(j), "mos kelmaganda joriy kod ko'rsatilmoqda");
  });
  const IMPORT = ["obyektlar.html", "sugurta.html", "baholash.html", "korik-rejasi.html", "qurilmalar.html"];
  await tekshir("besh sahifada import: Excel moduli, tugma huquq bilan, yadro oynasi orqali", () => {
    IMPORT.forEach(f => {
      const s = matn(f);
      talab(s.includes('src="yadro/jadval-fayl.js?v='), f + ": jadval-fayl.js ulanmagan");
      talab(/id="import-tugma"/.test(s), f + ": import tugmasi yo'q");
      talab(/MKB\.jadvalImport\(/.test(s) && !/MKB\.csvImport\(/.test(s), f + ": import yadro oynasini Excel bilan ochmaydi");
    });
    IMPORT.slice(1).forEach(f => talab(/id="import-tugma"[^>]*data-huquq="yoz"/.test(matn(f)), f + ": tugma huquqsiz rolga ko'rinadi"));
  });
  await tekshir("import to'rt ko'z qoidasini chetlab o'tmaydi: aktiv «Balansda» emas, baho qaror so'rovi bilan", () => {
    const o = matn("obyektlar.html");
    const i = o.indexOf("MKB.jadvalImport("), q = o.slice(i, o.indexOf("keyin(n)", i));
    talab(/holat: "Rasmiylashtirilmoqda"/.test(q) && !/holat: "Balansda"/.test(q), "import aktivni to'g'ridan-to'g'ri balansga yozadi");
    talab(/it\.hidden = !MKB\.huquq\("aktivlar", "yoz"\)/.test(o), "obyekt menejeri importni boshlay olmaydi");
    const b = matn("baholash.html");
    talab(/holat: "tasdiqda"/.test(b) && /MKB\.tasdiq\.sorov\(\{tur: "baho"/.test(b), "baholash importi qaror so'rovisiz");
    talab(!/qiymat: Object\.assign/.test(b.slice(b.indexOf("MKB.jadvalImport("))), "baholash importi obyekt qiymatini o'zi o'zgartirmoqda");
  });
  await tekshir("ko'rik formasi: kamera, surat muhri, marshrut; muhr imzoda dalolatnomaga yoziladi", () => {
    const s = matn("korik-otkazish.html");
    talab(/capture="environment"/.test(s), "kamera to'g'ridan-to'g'ri ochilmaydi");
    talab(/H\.exifOqi\(/.test(s) && /suratlar: suratMuhr/.test(s), "surat muhri yozilmaydi");
    talab(/H\.marshrut\(/.test(s) && /H\.marshrut\(/.test(matn("panel-nazorat.html")), "bugungi marshrut yo'q");
  });

  console.log("\nYakun: o'tdi " + otdi + ", yiqildi " + yiqildi + ", jami " + (otdi + yiqildi));
  process.exit(yiqildi ? 1 : 0);
})();
