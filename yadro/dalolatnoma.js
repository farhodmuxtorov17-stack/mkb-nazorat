/* ============================================================
   Dalolatnoma: yagona A4 chop shabloni
   - raqam, sana, joy; bandlar jadval ko'rinishida; 3×2 fotojadval;
     komissiya va imzo qatorlari; tekshirish kodi (SHA-256 dan 12 belgi) va QR
   - surat qoidasi yoki tasdiq bajarilmagan varaq "Qoralama" suv belgisi bilan chiqadi
   - QR havolasi dalolatnoma sahifasini ?kod= bilan ochadi: sahifa kodni joriy yozuvdan
     qayta hisoblaydi va mos kelish-kelmasligini aytadi
   Sof funksiyalar (xesh, QR, masofa, marshrut, EXIF) window.MKB_HUJJAT da: Node sinovlari ham ishlatadi.
   ============================================================ */
(function(ildiz){
"use strict";

/* ---------- SHA-256 (brauzerning xavfsiz konteksti shart emas: ichki http serverda ham ishlaydi) ---------- */
const K256 = [
  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
  0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
  0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
  0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
  0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
  0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2];
const ror = (x, n) => (x >>> n) | (x << (32 - n));
function sha256(bayt){
  if (typeof bayt === "string") bayt = new TextEncoder().encode(bayt);
  const l = bayt.length, n = ((l + 9 + 63) >> 6) << 6;
  const m = new Uint8Array(n);
  m.set(bayt); m[l] = 0x80;
  const dv = new DataView(m.buffer);
  dv.setUint32(n - 4, (l * 8) >>> 0);
  dv.setUint32(n - 8, Math.floor(l / 0x20000000));
  const h = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19];
  const w = new Uint32Array(64);
  for (let o = 0; o < n; o += 64){
    for (let i = 0; i < 16; i++) w[i] = dv.getUint32(o + i * 4);
    for (let i = 16; i < 64; i++){
      const s0 = ror(w[i - 15], 7) ^ ror(w[i - 15], 18) ^ (w[i - 15] >>> 3);
      const s1 = ror(w[i - 2], 17) ^ ror(w[i - 2], 19) ^ (w[i - 2] >>> 10);
      w[i] = (w[i - 16] + s0 + w[i - 7] + s1) >>> 0;
    }
    let [a, b, c, d, e, f, g, k] = h;
    for (let i = 0; i < 64; i++){
      const t1 = (k + (ror(e, 6) ^ ror(e, 11) ^ ror(e, 25)) + ((e & f) ^ (~e & g)) + K256[i] + w[i]) >>> 0;
      const t2 = ((ror(a, 2) ^ ror(a, 13) ^ ror(a, 22)) + ((a & b) ^ (a & c) ^ (b & c))) >>> 0;
      k = g; g = f; f = e; e = (d + t1) >>> 0; d = c; c = b; b = a; a = (t1 + t2) >>> 0;
    }
    [a, b, c, d, e, f, g, k].forEach((x, i) => { h[i] = (h[i] + x) >>> 0; });
  }
  return h.map(x => x.toString(16).padStart(8, "0")).join("");
}

/* Kalitlari saralangan JSON: bir xil ma'lumot har doim bir xil matn beradi */
function kanonik(v){
  if (v === null || v === undefined) return "null";
  if (Array.isArray(v)) return "[" + v.map(kanonik).join(",") + "]";
  if (typeof v === "object") return "{" + Object.keys(v).filter(k => v[k] !== undefined).sort()
    .map(k => JSON.stringify(k) + ":" + kanonik(v[k])).join(",") + "}";
  if (typeof v === "number") return Number.isFinite(v) ? JSON.stringify(v) : "null";
  return JSON.stringify(v);
}
/* 12 ta o'n oltilik belgi, to'rttadan: "3F9A-C12B-7E0D" */
const kodFormat = hex => String(hex).slice(0, 12).toUpperCase().replace(/(.{4})(?=.)/g, "$1-");

/* Katak qiymatining matni: "matn", 12, {t: "tarjima qilinadigan"}, {html: "<b>..</b>"} */
function qiymatMatn(v){
  if (v == null) return "";
  if (typeof v === "object"){
    if (v.t != null) return String(v.t);
    if (v.html != null) return String(v.html).replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
    if (v.matn != null) return String(v.matn);
    return "";
  }
  return String(v);
}
/* Xeshga faqat yozuvdan kelgan mazmun kiradi: chop vaqti, til va surat manzili kirmaydi.
   Varaqni ochgan xodimga yoki bugungi sanaga bog'liq qator (bo'lim, kv qatori, komissiya a'zosi)
   {xeshsiz: true} bilan belgilanadi. kv qatorining {xesh: qiymat} bayrog'i ekrandagi matn o'rniga
   o'zgarmas qismini beradi: masalan "3 / 4 aloqada" o'rniga qurilmalar soni. */
const xeshli = x => x && !(x.xeshsiz || (Array.isArray(x) && x[2] && x[2].xeshsiz));
function xeshMalumoti(m){
  return {
    t: m.tur || "", r: m.raqam || "", s: m.sanaXeshda === false ? null : (m.sana || ""),
    o: m.obyekt ? (m.obyekt.id || "") : "",
    b: (m.bolimlar || []).filter(xeshli).map(b => ({
      s: b.sarlavha || "",
      kv: b.kv ? b.kv.filter(xeshli).map(q => [q[0], q[2] && q[2].xesh != null ? String(q[2].xesh) : qiymatMatn(q[1])]) : null,
      j: b.jadval ? {u: b.jadval.ustunlar || [], q: (b.jadval.qatorlar || []).map(r => r.map(qiymatMatn))} : null,
      m: b.matn != null ? qiymatMatn(b.matn) : null,
    })),
    f: (m.fotolar || []).map(f => f.id || null),
    k: (m.komissiya || []).filter(xeshli).map(x => [x.rol || "", x.ism || ""]),
    q: m.qoralama ? 1 : 0,
  };
}
const kodHisobla = m => kodFormat(sha256(kanonik(xeshMalumoti(m))));

/* ---------- QR kod: bayt rejimi, M darajali xato tuzatish, 1–9 versiya (180 baytgacha) ----------
   Versiya bo'yicha: [blokdagi tuzatish so'zlari, [[bloklar soni, blokdagi ma'lumot so'zlari], ...]] */
const QR_M = [null, [10, [[1, 16]]], [16, [[1, 28]]], [26, [[1, 44]]], [18, [[2, 32]]], [24, [[2, 43]]],
  [16, [[4, 27]]], [18, [[4, 31]]], [22, [[2, 38], [2, 39]]], [22, [[3, 36], [2, 37]]]];
const QR_TEKIS = [null, [], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46]];
const gfKop = (x, y) => { let z = 0; for (let i = 7; i >= 0; i--){ z = (z << 1) ^ ((z >>> 7) * 0x11D); z ^= ((y >>> i) & 1) * x; } return z; };
function rsBoluvchi(d){
  const r = new Array(d).fill(0); r[d - 1] = 1;
  let ildizQ = 1;
  for (let i = 0; i < d; i++){
    for (let j = 0; j < d; j++){ r[j] = gfKop(r[j], ildizQ); if (j + 1 < d) r[j] ^= r[j + 1]; }
    ildizQ = gfKop(ildizQ, 2);
  }
  return r;
}
function rsQoldiq(data, bol){
  const r = new Array(bol.length).fill(0);
  data.forEach(b => { const f = b ^ r.shift(); r.push(0); bol.forEach((g, i) => { r[i] ^= gfKop(g, f); }); });
  return r;
}
function qrMatritsa(matn){
  const bayt = Array.from(new TextEncoder().encode(String(matn)));
  const sigim = v => QR_M[v][1].reduce((s, g) => s + g[0] * g[1], 0);
  let v = 1;
  while (v < QR_M.length && 12 + bayt.length * 8 > sigim(v) * 8) v++;
  if (v >= QR_M.length) throw new Error("Matn QR uchun juda uzun");
  const n = 17 + 4 * v, jami = sigim(v);
  const bit = [];
  const qosh = (x, uz) => { for (let i = uz - 1; i >= 0; i--) bit.push((x >>> i) & 1); };
  qosh(4, 4); qosh(bayt.length, 8); bayt.forEach(b => qosh(b, 8));
  qosh(0, Math.min(4, jami * 8 - bit.length));
  while (bit.length % 8) bit.push(0);
  const data = [];
  for (let i = 0; i < bit.length; i += 8) data.push(parseInt(bit.slice(i, i + 8).join(""), 2));
  for (let p = 0; data.length < jami; p ^= 1) data.push(p ? 0x11 : 0xEC);
  /* Bloklarga bo'lish, har blokka Reed–Solomon, keyin so'zlarni aralashtirib terish */
  const [ecUz, guruhlar] = QR_M[v], bol = rsBoluvchi(ecUz);
  const bloklar = [];
  let o = 0;
  guruhlar.forEach(([soni, uz]) => { for (let i = 0; i < soni; i++){ const d = data.slice(o, o + uz); o += uz; bloklar.push({d, e: rsQoldiq(d, bol)}); } });
  const kodlar = [];
  const eng = Math.max(...bloklar.map(b => b.d.length));
  for (let i = 0; i < eng; i++) bloklar.forEach(b => { if (i < b.d.length) kodlar.push(b.d[i]); });
  for (let i = 0; i < ecUz; i++) bloklar.forEach(b => kodlar.push(b.e[i]));

  const m = Array.from({length: n}, () => new Array(n).fill(false));
  const fn = Array.from({length: n}, () => new Array(n).fill(false));
  const qoy = (x, y, q) => { m[y][x] = q; fn[y][x] = true; };
  for (let i = 0; i < n; i++){ qoy(6, i, i % 2 === 0); qoy(i, 6, i % 2 === 0); }
  const topuvchi = (x, y) => {
    for (let dy = -4; dy <= 4; dy++) for (let dx = -4; dx <= 4; dx++){
      const xx = x + dx, yy = y + dy;
      if (xx < 0 || yy < 0 || xx >= n || yy >= n) continue;
      const d = Math.max(Math.abs(dx), Math.abs(dy));
      qoy(xx, yy, d !== 2 && d !== 4);
    }
  };
  topuvchi(3, 3); topuvchi(n - 4, 3); topuvchi(3, n - 4);
  const al = QR_TEKIS[v], k = al.length;
  for (let i = 0; i < k; i++) for (let j = 0; j < k; j++){
    if ((i === 0 && j === 0) || (i === 0 && j === k - 1) || (i === k - 1 && j === 0)) continue;
    for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) qoy(al[i] + dx, al[j] + dy, Math.max(Math.abs(dx), Math.abs(dy)) !== 1);
  }
  const format = mask => {
    let r = mask;
    for (let i = 0; i < 10; i++) r = (r << 1) ^ ((r >>> 9) * 0x537);
    const b = ((mask << 10) | r) ^ 0x5412;
    const g = i => ((b >>> i) & 1) === 1;
    for (let i = 0; i <= 5; i++) qoy(8, i, g(i));
    qoy(8, 7, g(6)); qoy(8, 8, g(7)); qoy(7, 8, g(8));
    for (let i = 9; i < 15; i++) qoy(14 - i, 8, g(i));
    for (let i = 0; i < 8; i++) qoy(n - 1 - i, 8, g(i));
    for (let i = 8; i < 15; i++) qoy(8, n - 15 + i, g(i));
    qoy(8, n - 8, true);
  };
  format(0);
  if (v >= 7){
    let r = v;
    for (let i = 0; i < 12; i++) r = (r << 1) ^ ((r >>> 11) * 0x1F25);
    const b = (v << 12) | r;
    for (let i = 0; i < 18; i++){
      const q = ((b >>> i) & 1) === 1, a = n - 11 + i % 3, c = Math.floor(i / 3);
      qoy(a, c, q); qoy(c, a, q);
    }
  }
  let i = 0;
  for (let ong = n - 1; ong >= 1; ong -= 2){
    if (ong === 6) ong = 5;
    for (let vert = 0; vert < n; vert++) for (let j = 0; j < 2; j++){
      const x = ong - j, yuqori = ((ong + 1) & 2) === 0, y = yuqori ? n - 1 - vert : vert;
      if (!fn[y][x] && i < kodlar.length * 8){ m[y][x] = ((kodlar[i >>> 3] >>> (7 - (i & 7))) & 1) === 1; i++; }
    }
  }
  const MASK = [(x, y) => (x + y) % 2 === 0, (x, y) => y % 2 === 0, x => x % 3 === 0, (x, y) => (x + y) % 3 === 0,
    (x, y) => (Math.floor(x / 3) + Math.floor(y / 2)) % 2 === 0, (x, y) => x * y % 2 + x * y % 3 === 0,
    (x, y) => (x * y % 2 + x * y % 3) % 2 === 0, (x, y) => ((x + y) % 2 + x * y % 3) % 2 === 0];
  const qolla = t => { for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (!fn[y][x] && MASK[t](x, y)) m[y][x] = !m[y][x]; };
  const jarima = () => {
    let p = 0, qora = 0;
    for (let a = 0; a < 2; a++) for (let s = 0; s < n; s++){
      let uz = 1;
      for (let t = 1; t <= n; t++){
        const cur = t < n ? (a ? m[t][s] : m[s][t]) : null, old = a ? m[t - 1][s] : m[s][t - 1];
        if (cur === old) uz++; else { if (uz >= 5) p += uz - 2; uz = 1; }
      }
    }
    for (let y = 0; y < n - 1; y++) for (let x = 0; x < n - 1; x++){
      const c = m[y][x];
      if (c === m[y][x + 1] && c === m[y + 1][x] && c === m[y + 1][x + 1]) p += 3;
    }
    m.forEach(r => r.forEach(c => { if (c) qora++; }));
    return p + Math.floor(Math.abs(qora * 20 - n * n * 10) / (n * n)) * 10;
  };
  let engMask = 0, engJ = Infinity;
  for (let t = 0; t < 8; t++){ qolla(t); format(t); const j = jarima(); if (j < engJ){ engJ = j; engMask = t; } qolla(t); }
  qolla(engMask); format(engMask);
  return m;
}
function qrSvg(matn){
  const m = qrMatritsa(matn), n = m.length, c = n + 8;
  let d = "";
  m.forEach((r, y) => r.forEach((q, x) => { if (q) d += "M" + (x + 4) + " " + (y + 4) + "h1v1h-1z"; }));
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + c + " " + c + '" shape-rendering="crispEdges" role="img" aria-label="QR">' +
    '<rect width="' + c + '" height="' + c + '" fill="#fff"/><path d="' + d + '" fill="#000"/></svg>';
}

/* ---------- Joylashuv: masofa (metr) va kunlik marshrut ---------- */
function masofa(a, b){
  if (!a || !b || !Number.isFinite(+a.lat) || !Number.isFinite(+a.lng) || !Number.isFinite(+b.lat) || !Number.isFinite(+b.lng)) return null;
  const R = 6371000, r = x => x * Math.PI / 180;
  const dl = r(b.lat - a.lat), dn = r(b.lng - a.lng);
  const h = Math.sin(dl / 2) ** 2 + Math.cos(r(a.lat)) * Math.cos(r(b.lat)) * Math.sin(dn / 2) ** 2;
  return Math.round(2 * R * Math.asin(Math.min(1, Math.sqrt(h))));
}
/* taxminiy: koordinata hudud markazi bo'yicha (reyestrda aniq nuqta yo'q) — masofa "≈" bilan, 1 km dan kami "shu hududda" */
const masofaMatn = (m, taxminiy) => m == null ? "" : taxminiy && m < 1000 ? "shu hududda"
  : (taxminiy ? "≈ " : "") + (m >= 1000 ? (m / 1000).toFixed(1).replace(".", ",") + " km" : m + " m");
/* Kunlik marshrut: boshlanish nuqtasidan (inspektor turgan joy yoki birinchi nuqta) har safar eng yaqin obyektga.
   nuqtalar: [{..., lat, lng}] — kelgan tartibi ustuvorlik (eng kechikkani birinchi). Koordinatasiz nuqtalar oxirida.
   Natija: [{nuqta, masofa}] — masofa oldingi to'xtashdan (birinchisida boshlanish nuqtasidan), noma'lum bo'lsa null */
function marshrut(nuqtalar, bosh){
  const koord = x => x && Number.isFinite(+x.lat) && Number.isFinite(+x.lng);
  const qoldi = (nuqtalar || []).filter(koord);
  const koordsiz = (nuqtalar || []).filter(x => !koord(x));
  const natija = [];
  let joy = koord(bosh) ? bosh : null;
  if (!joy && qoldi.length){ const b = qoldi.shift(); natija.push({nuqta: b, masofa: null, taxminiy: false}); joy = b; }
  while (qoldi.length){
    let eng = 0, engM = Infinity;
    qoldi.forEach((x, i) => { const d = masofa(joy, x); if (d < engM){ engM = d; eng = i; } });
    const b = qoldi.splice(eng, 1)[0];
    natija.push({nuqta: b, masofa: engM, taxminiy: b.aniq === false || joy.aniq === false});
    joy = b;
  }
  koordsiz.forEach(x => natija.push({nuqta: x, masofa: null, taxminiy: false}));
  return natija;
}

/* ---------- EXIF: suratga olingan vaqt va GPS (JPEG) ---------- */
function exifOqi(buf){
  try{
    const dv = new DataView(buf instanceof ArrayBuffer ? buf : buf.buffer, buf.byteOffset || 0, buf.byteLength);
    if (dv.getUint16(0) !== 0xFFD8) return null;
    let o = 2;
    while (o + 4 < dv.byteLength){
      const belgi = dv.getUint16(o), uz = dv.getUint16(o + 2);
      if (belgi === 0xFFE1 && dv.getUint32(o + 4) === 0x45786966) return tiffOqi(dv, o + 10);
      if ((belgi & 0xFF00) !== 0xFF00 || belgi === 0xFFDA) break;
      o += 2 + uz;
    }
  }catch(_){ }
  return null;
}
function tiffOqi(dv, t){
  const le = dv.getUint16(t) === 0x4949;
  const u16 = o => dv.getUint16(t + o, le), u32 = o => dv.getUint32(t + o, le);
  const yozuvlar = ifd => {
    const r = {}, soni = u16(ifd);
    for (let i = 0; i < soni; i++){ const e = ifd + 2 + i * 12; r[u16(e)] = e; }
    return r;
  };
  const matnOl = e => { const n = u32(e + 4), o = n > 4 ? u32(e + 8) : e + 8; let s = ""; for (let i = 0; i < n - 1; i++) s += String.fromCharCode(dv.getUint8(t + o + i)); return s; };
  const ratsional = (e, i) => { const o = u32(e + 8) + i * 8; const b = u32(o + 4); return b ? u32(o) / b : 0; };
  const daraja = e => ratsional(e, 0) + ratsional(e, 1) / 60 + ratsional(e, 2) / 3600;
  const bosh = yozuvlar(u32(4));
  const r = {vaqt: null, lat: null, lng: null};
  if (bosh[0x8769] != null){
    const ex = yozuvlar(u32(bosh[0x8769] + 8));
    const e = ex[0x9003] != null ? ex[0x9003] : ex[0x9004];
    const m = e != null ? /^(\d{4}):(\d{2}):(\d{2}) (\d{2}):(\d{2})/.exec(matnOl(e)) : null;
    if (m) r.vaqt = m[3] + "." + m[2] + "." + m[1] + " " + m[4] + ":" + m[5];
  }
  if (bosh[0x8825] != null){
    const g = yozuvlar(u32(bosh[0x8825] + 8));
    if (g[2] != null && g[4] != null){
      const lat = daraja(g[2]), lng = daraja(g[4]);
      const latR = g[1] != null ? String.fromCharCode(dv.getUint8(g[1] + t + 8)) : "N";
      const lngR = g[3] != null ? String.fromCharCode(dv.getUint8(g[3] + t + 8)) : "E";
      if (lat || lng){ r.lat = +(latR === "S" ? -lat : lat).toFixed(6); r.lng = +(lngR === "W" ? -lng : lng).toFixed(6); }
    }
  }
  return r.vaqt || r.lat != null ? r : null;
}

/* Surat qoidasi: kerakli sondan kam bo'lsa sabab matni, aks holda null */
function suratQoidasi(bor, kerak){
  bor = +bor || 0; kerak = +kerak || 0;
  return kerak > bor ? {bor, kerak, matn: "Surat qoidasi bajarilmagan: " + bor + " / " + kerak} : null;
}

const H = {sha256, kanonik, kodFormat, qiymatMatn, xeshMalumoti, kodHisobla, qrMatritsa, qrSvg, masofa, masofaMatn, marshrut, exifOqi, suratQoidasi};
ildiz.MKB_HUJJAT = H;
if (typeof document === "undefined" || !ildiz.MKB) return;

/* ============================================================
   DOM qismi: MKB.dalolatnoma
   ============================================================ */
const MKB = ildiz.MKB;
const e_ = s => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
const tarjima = el => { if (typeof ildiz.tarjimaQil === "function") ildiz.tarjimaQil(el); };
const matnJoriy = s => (MKB.matn ? MKB.matn(s) : s);
const ru = () => typeof ildiz.joriyTil === "function" && ildiz.joriyTil() === "ru";

/* Uslublar fayli: dalolatnoma sahifasida <link> bor, boshqa sahifalarda (hodisa, shartnoma, arxiv) shu yerda ulanadi */
(function uslub(){
  if (document.querySelector('link[href*="yadro/dalolatnoma.css"]')) return;
  const asos = document.querySelector('link[href*="yadro/app.css"]');
  const v = asos ? (/\?v=([^"&]+)/.exec(asos.getAttribute("href")) || [])[1] : "";
  const l = document.createElement("link");
  l.rel = "stylesheet";
  l.href = "yadro/dalolatnoma.css" + (v ? "?v=" + v : "");
  document.head.appendChild(l);
})();

/* Katak: oddiy qiymat ma'lumot sifatida (tarjima qilinmaydi), {t} — tarjima qilinadigan matn, {html} — tayyor belgi */
function katak(v){
  /* null — ma'lumot yo'q (tire); "" — qog'ozda qo'lda to'ldiriladigan bo'sh katak */
  if (v === "") return "";
  if (v == null) return '<span class="dn-bosh-q">—</span>';
  if (typeof v === "object"){
    if (v.html != null) return v.html;
    if (v.t != null) return "<span>" + e_(v.t) + "</span>";
    return "";
  }
  return '<span data-tarjimasiz>' + e_(v) + "</span>";
}
function kvHTML(kv){
  return '<dl class="dn-kv">' + kv.filter(Boolean).map(q => '<div class="' + (q[2] && q[2].keng ? "keng" : "") + '"><dt>' + e_(q[0]) + "</dt><dd>" + katak(q[1]) + "</dd></div>").join("") + "</dl>";
}
function jadvalHTML(j){
  /* Hamma qatorda bo'sh ustun (masalan, izohsiz "Izoh") varaqda joy olmaydi */
  const bosh = v => { const t = qiymatMatn(v).trim(); return !t || t === "—"; };
  const qator = j.qatorlar || [];
  const olib = (j.ustunlar || []).map((_, i) => qator.length > 0 && i > 0 && (j.majburiy || []).indexOf(i) < 0 && qator.every(r => bosh(r[i])));
  if (olib.some(Boolean)){
    const t = (arr) => arr.filter((_, i) => !olib[i]);
    const yangiIndeks = i => i - olib.slice(0, i).filter(Boolean).length;
    j = Object.assign({}, j, {ustunlar: t(j.ustunlar), kenglik: j.kenglik ? t(j.kenglik) : null,
      son: (j.son || []).filter(i => !olib[i]).map(yangiIndeks),
      qatorlar: qator.map(r => Object.assign(t(r), {sinf: r.sinf}))});
  }
  const son = j.son || [];
  const uz = (j.ustunlar || []).length;
  return '<div class="dn-jadval-orash"><table class="dn-jadval' + (uz >= 5 ? " dn-u5" : uz === 4 ? " dn-u4" : "") + '"><thead><tr>' +
    (j.ustunlar || []).map((u, i) => '<th' + (son.indexOf(i) >= 0 ? ' class="son"' : "") + (j.kenglik && j.kenglik[i] ? ' style="width:' + j.kenglik[i] + '"' : "") + ">" + e_(u) + "</th>").join("") + "</tr></thead><tbody>" +
    ((j.qatorlar || []).length
      ? j.qatorlar.map(r => "<tr" + (r.sinf ? ' class="' + e_(r.sinf) + '"' : "") + ">" + r.map((v, i) => "<td" + (son.indexOf(i) >= 0 ? ' class="son"' : "") + ">" + katak(v) + "</td>").join("") + "</tr>").join("")
      : '<tr><td colspan="' + (j.ustunlar || []).length + '"><span>' + e_(j.bosh || "Yozuv yo'q") + "</span></td></tr>") +
    "</tbody></table></div>";
}
function fotoHTML(m){
  const f = (m.fotolar || []).slice(0, 6);
  const kerak = Math.min(6, Math.max(f.length, +m.fotoKerak || 0));
  const kataklar = [];
  for (let i = 0; i < kerak; i++){
    const x = f[i];
    if (!x){ kataklar.push('<figure class="dn-kadr bosh"><div class="dn-rasm"><span>Surat yo\'q</span></div><figcaption><b data-tarjimasiz>' + (i + 1) + "</b></figcaption></figure>"); continue; }
    const rasm = x.html != null ? x.html : x.src ? '<img src="' + e_(x.src) + '" alt="' + e_(x.alt || x.izoh || "") + '" decoding="async">' : "<span>Surat bank tarmog'ida</span>";
    kataklar.push('<figure class="dn-kadr"><div class="dn-rasm">' + rasm + "</div><figcaption><b data-tarjimasiz>" + (i + 1) + "</b>" +
      (x.izoh ? " " + katak(typeof x.izoh === "object" ? x.izoh : {t: x.izoh}) : "") +
      (x.muhr ? ' <span class="dn-muhr" data-tarjimasiz>' + e_(x.muhr) + "</span>" : "") + "</figcaption></figure>");
  }
  const jami = (m.fotolar || []).length;
  return kerak ? '<div class="dn-fotolar">' + kataklar.join("") + "</div>" +
    (jami > 6 ? '<p class="dn-izoh"><span>Jami suratlar:</span> <span data-tarjimasiz>' + jami + "</span>. <span>Varaqda birinchi oltitasi.</span></p>" : "")
    : '<p class="dn-izoh"><span>' + e_(m.fotoBosh || "Surat biriktirilmagan") + "</span></p>";
}
function imzoHTML(m){
  const k = (m.komissiya || []).filter(Boolean);
  return '<table class="dn-jadval dn-imzolar"><thead><tr><th style="width:30%">Lavozimi, vazifasi</th><th>F.I.Sh.</th><th style="width:22%">Imzo</th><th style="width:15%">Sana</th></tr></thead><tbody>' +
    k.map(x => "<tr><td>" + (x.rolTarjimasiz ? '<span data-tarjimasiz>' + e_(x.rol) + "</span>" : "<span>" + e_(x.rol) + "</span>") + "</td><td>" +
      (x.ism ? '<span data-tarjimasiz>' + e_(x.ism) + "</span>" : "") + '</td><td class="dn-imzo-joy"></td><td>' + (x.sana ? '<span data-tarjimasiz>' + e_(x.sana) + "</span>" : "") + "</td></tr>").join("") +
    "</tbody></table>";
}
function tekshirHavola(m, kod){
  if (!m.havola) return null;
  const u = new URL(m.havola, location.href);
  u.hash = "";
  u.searchParams.set("kod", kod);
  return u.href;
}
function sanaVaqt(d){
  const p = n => String(n).padStart(2, "0");
  return p(d.getDate()) + "." + p(d.getMonth() + 1) + "." + d.getFullYear() + " " + p(d.getHours()) + ":" + p(d.getMinutes());
}

/* m: {tur, sarlavha, raqam, sana, vaqt, joy, filial, obyekt: {id, nom}, bolimlar: [{sarlavha, kv | jadval | matn | html}],
       fotolar: [{src | html, izoh, muhr, id}], fotoKerak, fotoBosh, komissiya: [{rol, ism, sana}], qoralama: null | "sabab",
       havola: "korik-akti.html?id=..", sanaXeshda} */
function html(m){
  const kod = kodHisobla(m);
  const havola = tekshirHavola(m, kod);
  let qr = "";
  if (havola){ try{ qr = qrSvg(havola); }catch(_){ qr = ""; } }
  const api = ildiz.MKBapi, s = (api && api.sessiya && api.sessiya()) || {};
  let n = 0;
  const bolim = (sarlavha, ichki, sinf) => '<section class="dn-bolim' + (sinf ? " " + sinf : "") + '"><h3><span data-tarjimasiz>' + (++n) + ".</span> <span>" + e_(sarlavha) + "</span></h3>" + ichki + "</section>";
  const bolimlar = (m.bolimlar || []).filter(Boolean).map(b => bolim(b.sarlavha,
    b.kv ? kvHTML(b.kv) : b.jadval ? jadvalHTML(b.jadval) : b.html != null ? b.html : '<p class="dn-matn">' + katak(b.matn) + "</p>", b.sinf)).join("");
  const foto = m.fotolar != null || m.fotoKerak ? bolim("Fotojadval", fotoHTML(m), "dn-foto") : "";
  return '<article class="dn-varaq' + (m.qoralama ? " qoralama" : "") + '" aria-label="' + e_(m.sarlavha) + '" data-kod="' + kod + '">' +
    (m.qoralama ? '<div class="dn-suv" aria-hidden="true"><span>Qoralama</span></div>' +
      '<p class="dn-qoralama-sabab" role="note"><b>Qoralama.</b> <span>' + e_(m.qoralama) + "</span></p>" : "") +
    '<header class="dn-bosh"><div class="dn-bank">' + (typeof LOGO_SVG === "string" ? LOGO_SVG : "") +
      "<div><b>Mikrokreditbank</b>" + (m.filial ? '<span data-tarjimasiz>' + e_(m.filial) + "</span>" : "") + "</div></div>" +
      '<dl class="dn-rekv"><div><dt>Raqam</dt><dd class="kod" data-tarjimasiz>№ ' + e_(m.raqam || "—") + "</dd></div>" +
        '<div><dt>Sana</dt><dd data-tarjimasiz>' + (m.sana === "" ? '<span class="dn-toldir"></span>' : e_((m.sana || "—") + (m.vaqt ? ", " + m.vaqt : ""))) + "</dd></div>" +
        (m.joy ? '<div><dt>Joy</dt><dd data-tarjimasiz>' + e_(m.joy) + "</dd></div>" : "") + "</dl></header>" +
    '<h2 class="dn-sar"><span>' + e_(m.sarlavha) + "</span></h2>" +
    (m.obyekt ? '<p class="dn-sub"><span data-tarjimasiz>' + e_(m.obyekt.nom || "") + '</span>' + (m.obyekt.id ? ' · <span class="kod" data-tarjimasiz>' + e_(m.obyekt.id) + "</span>" : "") + "</p>" : "") +
    bolimlar + foto +
    '<section class="dn-bolim dn-yakun"><h3><span data-tarjimasiz>' + (++n) + ".</span> <span>" + e_(m.imzoSarlavha || "Komissiya va imzolar") + "</span></h3>" +
      '<div class="dn-yakun-tor">' + imzoHTML(m) +
        '<div class="dn-tekshir">' + (qr ? '<div class="dn-qr">' + qr + "</div>" : "") +
          '<div class="dn-kod"><span>Tekshirish kodi</span><b data-tarjimasiz>' + kod + "</b>" +
            (qr ? "<small>QR kodni telefon kamerasi bilan o'qing: tizim varaqni joriy yozuv bilan solishtiradi.</small>" : "") +
            '<small class="dn-vaqt" data-ism="' + e_(s.ism || "") + '"><span>Shakllantirildi:</span> <span data-tarjimasiz>' + e_(sanaVaqt(new Date()) + (s.ism ? " · " + s.ism : "")) + "</span></small></div></div></div></section>" +
    "</article>";
}

/* Varaq pastidagi qator (@page chekkasi): hujjat, raqam, kod va varaq raqami. URL chiqmaydi */
function sahifaOyoq(m, kod){
  let st = document.getElementById("dn-sahifa-oyoq");
  if (!st){ st = document.createElement("style"); st.id = "dn-sahifa-oyoq"; document.head.appendChild(st); }
  const q = s => String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  const chap = "Mikrokreditbank · " + matnJoriy(m.sarlavha) + " № " + (m.raqam || "—") + " · " + matnJoriy("Tekshirish kodi") + " " + kod + (m.qoralama ? " · " + matnJoriy("Qoralama") : "");
  /* @page chekkasiga CSS o'zgaruvchisi yetib bormaydi: shrift va rang xom qiymatda qoladi */
  const sh = 'font:7.5pt "Outfit","Manrope",sans-serif;color:#555';
  st.textContent = "@media print{@page{@bottom-left{content:\"" + q(chap) + "\";" + sh + "}" +
    "@bottom-right{content:\"" + q(ru() ? "Лист " : "Varaq ") + "\" counter(page) \" / \" counter(pages);" + sh + "}}}";
}
/* Ekranda varaq "Shakllantirildi" vaqtini ko'rsatadi. Chop oynasi ochilganda yorliq
   "Chop etildi" ga, vaqt esa o'sha daqiqaga almashadi: qog'ozga haqiqiy chop vaqti tushadi */
if (typeof addEventListener === "function") addEventListener("beforeprint", () => {
  document.querySelectorAll(".dn-vaqt").forEach(el => {
    const ism = el.dataset.ism || "";
    el.innerHTML = "<span>" + e_(matnJoriy("Chop etildi:")) + '</span> <span data-tarjimasiz>' + e_(sanaVaqt(new Date()) + (ism ? " · " + ism : "")) + "</span>";
  });
});

/* Havoladagi ?kod= ni joriy yozuvdan hisoblangan kod bilan solishtirish */
function urlTekshir(m, kod){
  const k = new URLSearchParams(location.search).get("kod");
  if (!k) return null;
  kod = kod || kodHisobla(m);
  const mos = k.replace(/[^0-9a-f]/gi, "").toUpperCase() === kod.replace(/-/g, "");
  const eski = document.getElementById("dn-tekshiruv");
  if (eski) eski.remove();
  const b = document.createElement("section");
  b.id = "dn-tekshiruv";
  b.className = "dn-tekshiruv chop-yashir " + (mos ? "mos" : "mos-emas");
  b.setAttribute("role", "status");
  b.innerHTML = '<span class="dn-t-belgi">' + (MKB.ik ? MKB.ik(mos ? "tasdiq" : "xavf") : "") + "</span><div>" +
    (mos ? "<b>Tekshirish kodi mos keladi</b><span>Varaqdagi ma'lumot tizimdagi yozuv bilan bir xil. Kod:</span> "
      : "<b>Tekshirish kodi mos kelmaydi</b><span>Varaq chop etilgandan keyin yozuv o'zgargan yoki kod noto'g'ri o'qilgan. Tizimdagi joriy dalolatnomaga qarang. Varaqdagi kod:</span> ") +
    '<b class="kod" data-tarjimasiz>' + e_(k.toUpperCase()) + "</b></div>";
  const main = document.querySelector("main.kontent") || document.querySelector("main");
  const shapka = main && main.querySelector(".hujjat-shapka");
  if (shapka) shapka.after(b); else if (main) main.prepend(b);
  tarjima(b);
  return mos;
}

async function rasmlarniKut(el){
  const r = [...el.querySelectorAll("img")];
  await Promise.race([
    Promise.all(r.map(i => i.complete ? null : new Promise(h => { i.addEventListener("load", h, {once: true}); i.addEventListener("error", h, {once: true}); }))),
    new Promise(h => setTimeout(h, 4000))]);
}

MKB.dalolatnoma = {
  kod: kodHisobla,
  html,
  urlTekshir,
  /* Sahifaning o'zida varaq: dalolatnoma sahifalari (ko'rik, qabul, inventarizatsiya, pasport) */
  chiz(joy, m){
    const el = typeof joy === "string" ? document.getElementById(joy) : joy;
    const kod = kodHisobla(m);
    el.innerHTML = html(m);
    el.classList.add("dn-joy");
    document.body.classList.add("dn-sahifa");
    tarjima(el);
    sahifaOyoq(m, kod);
    urlTekshir(m, kod);
    return kod;
  },
  /* Boshqa sahifadan chop: varaq vaqtincha body oxiriga qo'yiladi, sahifaning qolgani chopda yashiriladi */
  async chop(m){
    let joy = document.getElementById("dn-chop-joy");
    if (!joy){ joy = document.createElement("div"); joy.id = "dn-chop-joy"; document.body.appendChild(joy); }
    const kod = kodHisobla(m);
    joy.innerHTML = html(m);
    tarjima(joy);
    sahifaOyoq(m, kod);
    await rasmlarniKut(joy);
    document.body.classList.add("dn-chop");
    const tozala = () => { document.body.classList.remove("dn-chop"); window.removeEventListener("afterprint", tozala); };
    window.addEventListener("afterprint", tozala);
    window.print();
    /* Ba'zi brauzerlar afterprint bermaydi: chop oynasi yopilgach sahifa o'z holiga qaytadi */
    setTimeout(() => { if (!window.matchMedia || !window.matchMedia("print").matches) tozala(); }, 1500);
    return kod;
  },
};

/* ============================================================
   Uchta shakl boshqa sahifalardan chop etiladi: balansdan chiqarish, xaridorga topshirish, hodisa.
   Model shu yerda yig'iladi: sahifa faqat tugma qo'yadi, QR havolasi (?dalolatnoma=&kod=) ham shu model bilan tekshiriladi.
   ============================================================ */
const D_ = () => ildiz.MKB_DATA || {};
const yaxlit = n => Math.round((+n || 0) * 10) / 10;
const ismLogin = login => { const f = (D_().FOYDLAR || []).find(x => x.login && login && x.login.toLowerCase() === String(login).toLowerCase()); return f ? f.nom : login || ""; };
const faolIsm = ism => { const f = (D_().FOYDLAR || []).find(x => x.nom === ism); return ism && (!f || f.faol !== false) ? ism : ""; };
const usulNomi = k => k === "hisobdan" ? "Hisobdan chiqarish" : (((D_().SOTISH_USULLARI || []).find(u => u.kalit === k) || {}).nom || k || "—");

async function chiqimModeli(p){
  const D = D_();
  const tasdiqlar = D.TASDIQLAR || [];
  let a = p.arxiv ? (D.ARXIV || []).find(x => x.id === p.arxiv || x.obyektId === p.arxiv) || null : null;
  if (!a && p.arxiv && ildiz.MKBapi){ try{ a = await ildiz.MKBapi.bitta("ARXIV", p.arxiv); }catch(_){ a = null; } }
  let ts = p.tasdiq ? tasdiqlar.find(t => t.id === p.tasdiq) || null : null;
  const oid = (a && (a.obyektId || a.id)) || (ts && (ts.obyektId || ts.manbaId)) || p.obyekt;
  if (!oid) throw new Error("Chiqim yozuvi topilmadi");
  if (!a) a = (D.ARXIV || []).find(x => x.obyektId === oid || x.id === oid) || null;
  if (!ts){
    const r = tasdiqlar.filter(t => t.tur === "chiqim" && (t.obyektId === oid || t.manbaId === oid) && t.holat !== "rad etilgan");
    ts = r.find(t => t.holat === "tasdiqlangan") || r.find(t => t.holat === "kutilmoqda") || null;
  }
  const y = D.topish ? D.topish(oid) : null;
  const o = y || a || {id: oid};
  const asos = ts ? (ts.asos && typeof ts.asos === "object" ? ts.asos : (() => { try{ return JSON.parse(ts.izoh || "{}") || {}; }catch(_){ return {}; } })()) : {};
  const balans = a ? +a.balansQiymat || 0 : +(y && y.balans && y.balans.qiymat) || 0;
  const xarajat = a ? +a.jamiXarajat || 0 : yaxlit((D.XARAJATLAR || []).filter(x => x.obyektId === oid && x.holat !== "bekor").reduce((s, x) => s + (+x.summa || 0), 0));
  const narx = a ? (a.sotuvNarxi == null ? 0 : +a.sotuvNarxi) : (asos.narx != null ? +asos.narx : null);
  let zaxira = a ? (a.tiklanganZaxira == null ? null : +a.tiklanganZaxira) : null;
  let zaxiraTaxminiy = false;
  if (!a && y && D.zaxiraHisobi){ try{ const z = D.zaxiraHisobi(y); if (z && !z.kiritilmagan){ zaxira = z.summa; zaxiraTaxminiy = !!z.taxminiy; } }catch(_){ } }
  const natija = narx == null ? null : a && a.foydaZarar != null ? +a.foydaZarar : yaxlit(narx - balans - xarajat);
  const qqsP = (D.PARAMETRLAR || []).find(x => x.id === "qqsFoiz");
  const qqsFoiz = qqsP && qqsP.qiymat != null ? +qqsP.qiymat : 12;
  const qqs = narx > 0 ? yaxlit(narx * qqsFoiz / (100 + qqsFoiz)) : 0;
  const sof = natija == null ? null : yaxlit(natija - qqs);
  const belgili = n => n == null ? "—" : (n < 0 ? "−" : "+") + MKB.pul(Math.abs(n));
  const tasdiqlangan = !!a || (ts && ts.holat === "tasdiqlangan");
  const sana = a ? a.sotuvSana : asos.sana || (ts && ts.sana) || "";
  const sh = (a && a.shartnomaId) || asos.shartnomaId || null;
  const holatNom = ts ? (ts.holat === "tasdiqlangan" ? "Tasdiqlangan" : ts.holat === "kutilmoqda" ? "Rahbariyat qarori kutilmoqda" : ts.holat) : a ? "Chiqim bajarilgan" : "So'rov yuborilmagan";
  return {
    tur: "chiqim", sarlavha: "Balansdan chiqarish dalolatnomasi", raqam: asos.dal || (ts && ts.id) || oid, sana,
    joy: o.hududToliq || o.hudud || "", filial: o.filial || "", obyekt: {id: oid, nom: o.qisqa || o.nom || oid},
    havola: a ? "arxiv-obyekt.html?id=" + encodeURIComponent(a.id) + "&dalolatnoma=chiqim" : ts ? "chiqim-tasdiqlash.html?tasdiq=" + encodeURIComponent(ts.id) + "&dalolatnoma=chiqim" : null,
    bolimlar: [
      {sarlavha: "Obyekt", kv: [
        ["Nomi", o.nom || oid, {keng: true}], ["Turi", o.tur ? {t: o.tur} : null], ["Filial", o.filial || null],
        ["Balansga qabul sanasi", (a && a.balansSana) || (y && y.balans && y.balans.sana) || null],
        ["Balansda turgan", (() => {
          const kun = a ? a.turganKun : (y && y.balans && y.balans.sana && sana && D.kunFarqi ? D.kunFarqi(D.sanaOqi(y.balans.sana), D.sanaOqi(sana)) : null);
          return kun != null && Number.isFinite(kun) ? {html: '<span data-tarjimasiz>' + MKB.fmt(kun) + "</span> <span>kun</span>"} : null;
        })()],
      ]},
      {sarlavha: "Chiqarish asosi", kv: [
        ["Chiqarish usuli", {t: usulNomi((a && a.sotishUsuli) || asos.usul)}], ["Chiqarish sanasi", sana || null],
        ["Asos qarori", ts ? ts.id + (ts.qarorSana ? ", " + ts.qarorSana : "") : {t: "Qaror tizimda qayd etilmagan"}],
        ["Qaror holati", {t: holatNom}],
        ["Buyruq raqami", asos.qaror || null],
        ["Xaridor yoki qabul qiluvchi", (a && a.xaridor) || asos.xaridor || null], ["Shartnoma", sh],
        ["Lot", (a && a.lotId) || asos.lotId || null],
        asos.hujjat || (a && a.izoh) ? ["Hujjatlar", asos.hujjat || a.izoh, {keng: true}] : null,
      ]},
      {sarlavha: "Moliyaviy natija", jadval: {ustunlar: ["Ko'rsatkich", "Summa"], son: [1], majburiy: [1], kenglik: ["", "34%"], qatorlar: [
        [{t: "Sotuv narxi (tushum)"}, narx == null ? "—" : MKB.pul(narx)],
        [{t: "Balans qiymati"}, MKB.pul(balans)],
        [{t: "Saqlash xarajatlari"}, MKB.pul(xarajat)],
        [{t: "Natija, QQSgacha"}, belgili(natija)],
        [{html: "<span>QQS</span> <span data-tarjimasiz>" + qqsFoiz + "%</span>" + (!qqsP || qqsP.taxminiy !== false ? " <span>(taxminiy, narx ichida)</span>" : "")}, MKB.pul(qqs)],
        Object.assign([{t: "Sof natija"}, belgili(sof)], {sinf: sof != null && sof < 0 ? "kam" : ""}),
        [{html: "<span>Tiklangan zaxira</span>" + (zaxiraTaxminiy ? " <span>(buxgalteriya tasdig'ida)</span>" : "")}, zaxira == null ? "—" : MKB.pul(zaxira)],
      ]}},
    ],
    komissiya: [
      {rol: "Tayyorladi", ism: ts ? ts.muallif || "" : ""},
      {rol: "Tasdiqladi", ism: ts && ts.qarorKim ? ismLogin(ts.qarorKim) : ""},
      {rol: "Bosh buxgalter", ism: ""},
      {rol: "Komissiya a'zosi", ism: ""},
    ],
    qoralama: tasdiqlangan ? null : ts ? "Rahbariyat qarori kutilmoqda: " + ts.id : "Chiqim qaror so'rovi yuborilmagan",
  };
}

async function topshirishModeli(p){
  const D = D_();
  const s = (D.SHARTNOMALAR || []).find(x => x.id === p.id);
  if (!s) throw new Error("Shartnoma topilmadi: " + p.id);
  const y = (D.topish && D.topish(s.obyektId)) || (D.ARXIV || []).find(x => x.obyektId === s.obyektId) || {id: s.obyektId};
  const j = Array.isArray(s.jadval) ? s.jadval : [];
  const tolangan = s.holat === "yakunlangan" ? +s.narx || 0 : yaxlit((+s.avans || 0) + j.filter(x => x.tolandi).reduce((a, x) => a + (+x.summa || 0), 0));
  const qoldiq = Math.max(0, yaxlit((+s.narx || 0) - tolangan));
  const taqiq = s.taqiqHolati || "";
  const kalit = (D.INVENTAR || []).filter(x => x.obyektId === s.obyektId).reduce((a, x) => a + (+x.kalit || 0), 0);
  const kom = (y.kommunal || []).filter(k => k && k.holat !== "mavjud emas");
  const xizNom = k => ((D.KOMMUNAL_XIZMATLAR || []).find(x => x.kalit === k) || {}).nom || k;
  /* Topshirish to'liq to'lovdan keyin yoki bo'lib to'lashda taqiq qo'yilgandan keyin */
  const ruxsat = qoldiq <= 0 || /qo'yilgan/.test(taqiq);
  const transport = y.turKalit === "transport" || y.turKalit === "texnika";
  return {
    tur: "topshirish", sarlavha: "Xaridorga qabul-topshirish dalolatnomasi", raqam: s.id, sana: "", sanaXeshda: false,
    joy: y.hududToliq || y.hudud || "", filial: y.filial || "", obyekt: {id: s.obyektId, nom: y.qisqa || y.nom || s.obyektId},
    havola: "shartnoma.html?id=" + encodeURIComponent(s.id) + "&dalolatnoma=topshirish",
    bolimlar: [
      {sarlavha: "Shartnoma va obyekt", kv: [
        ["Shartnoma", s.id + (s.sana ? ", " + s.sana : "")], ["Sotish usuli", {t: usulNomi(s.sotishUsuli)}],
        ["Xaridor", s.xaridor || null], ["Lot", s.lotId || null],
        ["Obyekt", y.nom || s.obyektId, {keng: true}],
        ["Manzil", y.manzil || null, {keng: true}],
      ]},
      {sarlavha: "To'lov va taqiq", kv: [
        ["Shartnoma narxi", MKB.pul(s.narx)], ["To'langan", MKB.pul(tolangan)],
        ["Qoldiq", MKB.pul(qoldiq)], ["Taqiq", taqiq ? {t: taqiq} : {t: "Qo'yilmagan"}],
      ]},
      {sarlavha: "Kalitlar va hujjatlar", jadval: {ustunlar: ["№", "Nomi", "Soni", "Izoh"], son: [2], majburiy: [2, 3], kenglik: ["7%", "", "12%", "36%"], qatorlar: [
        ["1", {t: "Kalitlar"}, kalit ? String(kalit) : "", kalit ? {t: "Inventarizatsiya bo'yicha"} : {t: "Topshirishda sanaladi"}],
        ["2", {t: transport ? "Texnik pasport" : "Kadastr hujjatlari nusxasi"}, "", ""],
        ["3", {t: "Pult, karta va boshqa kirish vositalari"}, "", ""],
      ]}},
      kom.length ? {sarlavha: "Hisoblagich ko'rsatkichlari", jadval: {ustunlar: ["Xizmat", "Hisoblagich", "Oxirgi qayd", "Topshirish kuni"], majburiy: [3], qatorlar:
        kom.map(k => [{t: xizNom(k.xizmat)}, k.hisoblagich || "—", k.korsatkich != null ? MKB.fmt(k.korsatkich) + (k.korsatkichSana ? " (" + k.korsatkichSana + ")" : "") : "—", ""])}} : null,
      {sarlavha: "Obyekt holati va e'tirozlar", matn: {t: "Xaridor obyektni ko'rdi. E'tirozlar (bo'lmasa «yo'q» deb yoziladi):"}},
    ],
    komissiya: [{rol: "Topshirdi (bank)", ism: faolIsm(y.masul)}, {rol: "Qabul qildi (xaridor)", ism: s.xaridor || ""}, {rol: "Realizatsiya mutaxassisi", ism: ""}],
    qoralama: ruxsat ? null : "To'lov yakunlanmagan va taqiq qo'yilmagan. Qoldiq: " + MKB.pul(qoldiq),
  };
}

async function hodisaModeli(p){
  const D = D_();
  const id = String(p.id || "").replace(/^#/, "");
  let kol = "XAVFSIZLIK_HODISALARI", h = (D.XAVFSIZLIK_HODISALARI || []).find(x => x.id === id);
  if (!h){ kol = "HODISALAR"; h = (D.HODISALAR || []).find(x => x.id === id || x.kod === "#" + id); }
  if (!h) throw new Error("Hodisa topilmadi: " + id);
  const y = (D.topish && D.topish(h.obyektId)) || {id: h.obyektId};
  const NOM = {ochiq: "Yangi", yangi: "Yangi", tekshiruvda: "Tekshiruvda", tekshirilmoqda: "Tekshiruvda", bartaraf: "Bartaraf etilmoqda", hal: "Hal qilindi", yopildi: "Yopildi"};
  const holat = kol === "XAVFSIZLIK_HODISALARI" ? h.holat : (h.ustun || h.holat);
  const yopiq = holat === "hal" || holat === "yopildi";
  let aniqlagan = "", aniqlaganManba = null;
  if (kol === "XAVFSIZLIK_HODISALARI") aniqlaganManba = "Qurilma signali";
  else {
    try{ const r = (await ildiz.MKBapi.royxat("amallar")) || []; const b = r.find(x => x.kolleksiya === kol && x.obyektId === h.id && x.turi === "yaratish"); if (b) aniqlagan = b.kim || ""; }catch(_){ }
    if (!aniqlagan) aniqlaganManba = h.manba === "korik" ? "Ko'rik" : h.manba === "qurilma" ? "Qurilma signali" : null;
  }
  const chora = String(h[kol === "XAVFSIZLIK_HODISALARI" ? "chora" : "izoh"] || "").split("\n").map(x => x.trim()).filter(Boolean).map(x => {
    const m = /^(\d{2}\.\d{2}\.\d{4} \d{2}:\d{2}) · ([^:]+): (.*)$/.exec(x);
    return m ? [m[1], m[2], m[3]] : ["", "", x];
  });
  const davolar = (D.SUGURTA_DAVOLARI || []).filter(x => x.hodisaId === h.id);
  const zarar = davolar.reduce((a, x) => a + (+x.summa || 0), 0);
  const fotolar = [];
  for (const f of (D.FAYLLAR || []).filter(f => f.kolleksiya === kol && f.yozuvId === h.id && /^image\//.test(f.tur || ""))){
    let src = f.yol && !/^fayllar\//.test(f.yol) ? f.yol : null;
    if (!src && ildiz.MKBapi){ try{ src = await ildiz.MKBapi.fayl.url(f.id); }catch(_){ src = null; } }
    fotolar.push({id: f.id, src, alt: f.nom || "", izoh: {t: "Dalil surati"}, muhr: f.yuklangan || ""});
  }
  const jd = MKB.jiddiylik ? MKB.jiddiylik(String(h.jiddiylik || "").replace(/&#39;/g, "'")) : null;
  const [sana, vaqt] = String(h.vaqt || h.sana || "").split(" ");
  return {
    tur: "hodisa", sarlavha: "Hodisa dalolatnomasi", raqam: h.id, sana: sana || "", vaqt: vaqt || null,
    joy: y.hududToliq || h.joy || y.hudud || "", filial: y.filial || "", obyekt: {id: h.obyektId, nom: y.qisqa || y.nom || h.bino || h.obyektId},
    havola: "hodisa.html?id=" + encodeURIComponent(h.id) + "&dalolatnoma=hodisa",
    bolimlar: [
      {sarlavha: "Hodisa", kv: [
        ["Hodisa", h.hodisa || null, {keng: true}], ["Aniqlangan vaqt", h.vaqt || h.sana || null], ["Jiddiylik", jd && jd.nom ? {t: jd.nom} : null],
        ["Aniqlagan", aniqlagan || (aniqlaganManba ? {html: "<span>" + e_(aniqlaganManba) + "</span>" + (h.qurilmaId ? ' <span data-tarjimasiz>· ' + e_(h.qurilmaId) + "</span>" : "")} : null)], ["Mas'ul", h.masul || null],
        ["Holat", {t: NOM[holat] || holat || "—"}], ["IIB arizasi", h.iibAriza && h.iibAriza.raqam ? h.iibAriza.raqam + ", " + (h.iibAriza.sana || "") : {t: "Berilmagan"}],
        ["Manzil", y.manzil || h.joy || null, {keng: true}],
      ]},
      h.tavsif ? {sarlavha: "Tavsif", matn: {t: h.tavsif}} : null,
      {sarlavha: "Ko'rilgan chora", jadval: {ustunlar: ["Vaqt", "Kim", "Chora"], majburiy: [2], kenglik: ["20%", "22%", ""], qatorlar: chora, bosh: "Chora yozilmagan"}},
      {sarlavha: "Zarar", jadval: {ustunlar: ["Sug'urta da'vosi", "Polis", "Sana", "Holat", "Summa"], son: [4], qatorlar:
        davolar.map(x => [x.id, x.polisId || "—", x.sana || "—",
          {t: ({topshirilgan: "Topshirilgan", "korib chiqilmoqda": "Ko'rib chiqilmoqda", tolangan: "To'langan", "rad etilgan": "Rad etilgan"})[x.holat] || x.holat || "—"}, MKB.pul(x.summa)])
          .concat(davolar.length > 1 ? [[{t: "Jami"}, "", "", "", MKB.pul(yaxlit(zarar))]] : []),
        bosh: "Zarar summasi sug'urta da'vosi bilan qayd etilmagan"}},
    ],
    fotolar, fotoBosh: "Dalil surati biriktirilmagan",
    komissiya: [{rol: "Aniqlagan xodim", ism: kol === "HODISALAR" ? faolIsm(aniqlagan) : ""}, {rol: "Mas'ul", ism: faolIsm(h.masul)},
      {rol: "Obyekt uchun mas'ul", ism: faolIsm(y.masul)}, {rol: "Xavfsizlik xizmati rahbari", ism: ""}],
    qoralama: yopiq ? null : "Hodisa hali yopilmagan. Holat: " + (NOM[holat] || holat || "—"),
  };
}

const SHAKL = {
  chiqim: {nom: "Chiqarish dalolatnomasi", yasa: chiqimModeli},
  topshirish: {nom: "Topshirish dalolatnomasi", yasa: topshirishModeli},
  hodisa: {nom: "Hodisa dalolatnomasi", yasa: hodisaModeli},
};
MKB.dalolatnoma.shakl = (tur, p) => SHAKL[tur].yasa(p || {});
/* Chop tugmasi konteyner oxiriga qo'shiladi (odatda .hs-amallar); p — {id} | {tasdiq} | {arxiv} */
MKB.dalolatnoma.tugma = function(joy, tur, p){
  const el = typeof joy === "string" ? document.getElementById(joy) : joy;
  if (!el || !SHAKL[tur]) return null;
  const eski = el.querySelector('[data-dalolatnoma="' + tur + '"]');
  if (eski) eski.remove();
  const b = document.createElement("button");
  b.type = "button";
  b.className = "tugma tugma-oq";
  b.dataset.dalolatnoma = tur;
  b.innerHTML = (MKB.ik ? MKB.ik("chop") : "") + "<span>" + e_(SHAKL[tur].nom) + "</span>";
  b.addEventListener("click", async () => {
    try{ await MKB.band(b, async () => MKB.dalolatnoma.chop(await SHAKL[tur].yasa(p || {}))); }
    catch(err){ MKB.toast("Dalolatnoma chop etilmadi: " + (err && err.message ? err.message : "qayta urinib ko'ring"), "xavf"); }
  });
  el.appendChild(b);
  tarjima(b);
  return b;
};

/* QR orqali ochilgan sahifa: ?dalolatnoma=<tur>&kod=... bo'lsa, model qayta yig'iladi va kod solishtiriladi */
(async function qrTekshir(){
  const u = new URLSearchParams(location.search);
  const tur = u.get("dalolatnoma");
  if (!tur || !SHAKL[tur] || !u.get("kod")) return;
  try{
    if (ildiz.MKBapi) await ildiz.MKBapi.tayyor;
    if (!ildiz.MKB_TAYYOR) await new Promise(r => document.addEventListener("mkb:tayyor", r, {once: true}));
    const p = tur === "chiqim" ? (u.get("tasdiq") ? {tasdiq: u.get("tasdiq")} : {arxiv: u.get("id")}) : {id: u.get("id")};
    const m = await SHAKL[tur].yasa(p);
    setTimeout(() => urlTekshir(m), 800);
  }catch(_){ }
})();
})(typeof window !== "undefined" ? window : globalThis);
