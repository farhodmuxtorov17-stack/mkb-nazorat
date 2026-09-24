/* ============================================================
   brauzer.mjs — olcham.mjs va tarjima.mjs uchun umumiy yordamchi.
   - loyiha ildizini 127.0.0.1 dagi vaqtinchalik statik serverda beradi
     (mahalliy/ va server/ papkalari berilmaydi: faqat namoyish ma'lumoti);
   - Microsoft Edge ni headless rejimda ochadi va DevTools protokoli
     orqali boshqaradi (paket kerak emas, Node 22+ dagi WebSocket).
   Edge manzili MKB_EDGE muhit o'zgaruvchisi bilan almashtiriladi.
   ============================================================ */
import http from "node:http";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {spawn} from "node:child_process";
import {fileURLToPath} from "node:url";

export const ILDIZ = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const EDGE = process.env.MKB_EDGE || "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const MIME = {".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".json": "application/json", ".svg": "image/svg+xml", ".webp": "image/webp", ".png": "image/png", ".jpg": "image/jpeg",
  ".woff2": "font/woff2", ".ico": "image/x-icon"};
const kut = ms => new Promise(r => setTimeout(r, ms));

/* Ish sahifalari: "_" bilan boshlanadigan yordamchilar va alohida taqdimot kirmaydi */
export function sahifalarRoyxati(filtr) {
  const hammasi = fs.readdirSync(ILDIZ).filter(f => f.endsWith(".html") && !f.startsWith("_") && f !== "taqdimot.html").sort();
  return filtr && filtr.length ? hammasi.filter(f => filtr.includes(f)) : hammasi;
}

/* Tafsilot sahifalari va ularning to'plamlari. Id ro'yxatdagi birinchi bo'sh bo'lmagan to'plamdan olinadi. */
export const KARTOCHKALAR = {
  "ish.html": ["UNDIRUV_ISHLAR"], "lot.html": ["LOTLAR"], "shartnoma.html": ["SHARTNOMALAR"],
  "hodisa.html": ["XAVFSIZLIK_HODISALARI", "HODISALAR"], "qurilma.html": ["QURILMALAR"],
  "sud-majlis.html": ["SUD_MAJLISLAR"], "baholash-hisobot.html": ["BAHOLASHLAR"],
  "sugurta-polis.html": ["SUGURTALAR"], "korik-akti.html": ["KORIKLAR"], "arxiv-obyekt.html": ["ARXIV"]
};

/* idlar() ishlamay qolsa ishlatiladigan zaxira: namoyish ma'lumotidagi yozuvlar */
const TAFSILOT_ID = {
  "lot.html": "LT-2026/0166", "shartnoma.html": "SH-2026/0105", "hodisa.html": "XH-2026/301",
  "qurilma.html": "QR-0105", "sud-majlis.html": "SM-2026/0160", "baholash-hisobot.html": "BH-2026/0301",
  "sugurta-polis.html": "PL-2026/12001"
};

/* Tafsilot sahifalari identifikator bilan ochiladi. idlar — ochish().idlar() natijasi,
   masalan {"ish.html": "UI-2026/0528"}. */
export function manzilQur(f, idlar) {
  const n = idlar || {};
  if (/^obyekt(-|\.)/.test(f) && f !== "obyektlar.html")
    return f + "?id=" + encodeURIComponent(n["obyekt.html"] || "AK-2026/4471");
  const id = n[f] || TAFSILOT_ID[f];
  return id ? f + "?id=" + encodeURIComponent(id) : f;
}

export function argumentlar() {
  const a = {};
  process.argv.slice(2).forEach(x => {
    const m = /^--([a-z]+)=(.*)$/.exec(x);
    if (m) a[m[1]] = m[2];
  });
  return a;
}

function statikServer() {
  const s = http.createServer((req, res) => {
    let yol;
    try { yol = decodeURIComponent(new URL(req.url, "http://x").pathname); } catch (_) { res.writeHead(400); return res.end(); }
    if (yol === "/") yol = "/kirish.html";
    const f = path.join(ILDIZ, yol);
    if (!f.startsWith(ILDIZ) || yol.includes("..") || /^\/(mahalliy|server)\//i.test(yol) || /\/\./.test(yol)) {
      res.writeHead(404); return res.end();
    }
    fs.stat(f, (x, st) => {
      if (x || !st.isFile()) { res.writeHead(404); return res.end(); }
      res.writeHead(200, {"Content-Type": MIME[path.extname(f).toLowerCase()] || "application/octet-stream", "Cache-Control": "no-store"});
      fs.createReadStream(f).pipe(res);
    });
  });
  return new Promise(hal => s.listen(0, "127.0.0.1", () => hal(s)));
}

export async function ochish() {
  if (!fs.existsSync(EDGE)) throw new Error("Edge topilmadi: " + EDGE + " (MKB_EDGE bilan ko'rsating)");
  const server = await statikServer();
  const ASOS = "http://127.0.0.1:" + server.address().port + "/";
  const profil = fs.mkdtempSync(path.join(os.tmpdir(), "mkb-edge-"));
  const port = 9300 + Math.floor(Math.random() * 600);
  const edge = spawn(EDGE, ["--headless=new", "--remote-debugging-port=" + port, "--user-data-dir=" + profil,
    "--no-first-run", "--no-default-browser-check", "--disable-extensions", "--disable-gpu", "--hide-scrollbars", "about:blank"],
    {stdio: "ignore"});
  let wsUrl = null;
  for (let i = 0; i < 80 && !wsUrl; i++) {
    await kut(150);
    try { wsUrl = (await fetch("http://127.0.0.1:" + port + "/json/version").then(r => r.json())).webSocketDebuggerUrl; } catch (_) { }
  }
  if (!wsUrl) { edge.kill(); server.close(); throw new Error("Edge DevTools porti ochilmadi"); }
  const ws = new WebSocket(wsUrl);
  await new Promise((hal, rad) => { ws.onopen = hal; ws.onerror = rad; });
  let n = 0;
  const kutilmoqda = new Map();
  const tinglovchilar = new Set();
  ws.onmessage = e => {
    const m = JSON.parse(e.data);
    if (m.id && kutilmoqda.has(m.id)) {
      const {hal, rad} = kutilmoqda.get(m.id);
      kutilmoqda.delete(m.id);
      m.error ? rad(new Error(m.error.message)) : hal(m.result);
    } else if (m.method) tinglovchilar.forEach(t => t(m));
  };
  const yubor = (method, params, sessionId) => new Promise((hal, rad) => {
    const id = ++n;
    kutilmoqda.set(id, {hal, rad});
    ws.send(JSON.stringify(Object.assign({id, method, params: params || {}}, sessionId ? {sessionId} : {})));
  });

  const {targetId} = await yubor("Target.createTarget", {url: "about:blank"});
  const {sessionId} = await yubor("Target.attachToTarget", {targetId, flatten: true});
  const s = (m, p) => yubor(m, p, sessionId);
  await s("Page.enable"); await s("Runtime.enable");
  let xatolar = [];
  let yuklandi = null;
  tinglovchilar.add(m => {
    if (m.sessionId !== sessionId) return;
    if (m.method === "Runtime.exceptionThrown") {
      const d = m.params.exceptionDetails;
      xatolar.push(((d.exception && d.exception.description) || d.text || "").split("\n")[0].slice(0, 200));
    }
    if (m.method === "Page.loadEventFired" && yuklandi) { const h = yuklandi; yuklandi = null; h(); }
  });

  const baho = async ifoda => {
    const r = await s("Runtime.evaluate", {expression: ifoda, returnByValue: true, awaitPromise: true});
    if (r.exceptionDetails) throw new Error((r.exceptionDetails.exception && r.exceptionDetails.exception.description) || r.exceptionDetails.text);
    return r.result.value;
  };
  const kor = async (manzil, kutish) => {
    xatolar = [];
    const tayyor = new Promise(hal => { yuklandi = hal; });
    await s("Page.navigate", {url: ASOS + manzil});
    await Promise.race([tayyor, kut(15000)]);
    await kut(kutish == null ? 700 : kutish);
    return xatolar.slice();
  };
  const olcham = (en, boy) => s("Emulation.setDeviceMetricsOverride",
    {width: en, height: boy, deviceScaleFactor: 1, mobile: en < 768});

  /* Namoyish sessiyasi: _sessiya.html bilan bir xil kalitlar, repodagi hech narsaga bog'liq emas */
  const sessiya = async (til, rol) => {
    await kor("xato-404.html", 100);
    await baho("(" + function (til, rol) {
      localStorage.setItem("mkb4-sessiya", JSON.stringify({token: "sinov", id: "U056789011", login: "o.ismoilov",
        ism: "Ismoilov Otabek", rol: rol || "Administrator", filial: "Axborot texnologiyalari departamenti", filialKod: null,
        manba: "shartli", rejim: "snapshot", tugash: Date.now() + 8 * 3600 * 1000}));
      localStorage.setItem("mkb-manba", "shartli");
      localStorage.setItem("mkb-til", til || "uz");
      sessionStorage.setItem("mkb-mahalliy-yoq", "1");
      return true;
    } + ")(" + JSON.stringify(til) + "," + JSON.stringify(rol) + ")");
  };

  /* Har bir kartochka sahifasi uchun namoyish ma'lumotidagi birinchi id (foydalanuvchi doirasida).
     Sessiyadan keyin chaqiriladi, chunki doira rol va filialga bog'liq. */
  const idlar = async () => {
    await kor("panel.html", 300);
    return baho("(" + function (K) {
      const D = window.MKB_DATA || {};
      const doirada = r => { try { return !window.MKB || !MKB.doira || MKB.doira([r]).length > 0; } catch (_) { return true; } };
      const birinchi = kol => ((Array.isArray(D[kol]) ? D[kol] : []).find(r => r && r.id && doirada(r)) || {}).id || null;
      const n = {};
      Object.keys(K).forEach(f => { for (const kol of K[f]) { const id = birinchi(kol); if (id) { n[f] = id; break; } } });
      const y = birinchi("YOZUVLAR");
      if (y) n["obyekt.html"] = y;
      return n;
    } + ")(" + JSON.stringify(KARTOCHKALAR) + ")");
  };

  const yop = async () => {
    try { ws.close(); } catch (_) { }
    edge.kill();
    server.close();
    await kut(300);
    try { fs.rmSync(profil, {recursive: true, force: true}); } catch (_) { }
  };
  return {kor, baho, olcham, sessiya, idlar, yop, ASOS};
}
