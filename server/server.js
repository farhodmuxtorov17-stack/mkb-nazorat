/* ============================================================
   Aktivlar nazorati — lokal server (sof Node.js, paketsiz)
   Ishga tushirish:  node server/server.js   →  http://localhost:8790
   - statik fayllar (loyiha ildizi)
   - REST /api/*  (JSON omborlar: server/malumotlar/*.json)
   - sessiya tokenlari, rol tekshiruvi, amallar jurnali
   ============================================================ */
const http = require("http");
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const crypto = require("crypto");

const ILDIZ = path.join(__dirname, "..");
const OMBOR = path.join(__dirname, "malumotlar");
const PORT = process.env.PORT || 8790;
/* Kirish paroli: muhit o'zgaruvchisidan olinadi. Berilmagan bo'lsa
   ishga tushishda tasodifiy parol yaratiladi va konsolga bir marta chiqadi —
   shu tariqa tizim hech qachon parolsiz ochiq qolmaydi. */
const KIRISH_PAROL = process.env.MKB_PAROL || crypto.randomBytes(6).toString("hex");
const PAROL_YARATILDI = !process.env.MKB_PAROL;

/* ---------- Snapshotdan urug'lash ---------- */
const KOLLEKSIYALAR = ["YOZUVLAR", "KORIKLAR", "ARXIV", "HUDUDLAR",
  "SUGURTALAR", "BAHOLASHLAR", "HODISALAR", "HUJJATLAR", "TASDIQLAR",
  "MENING_VAZIFALARIM", "BILDIRISHLAR", "FOYDLAR", "ADVOKATLAR",
  "SUD_MAJLISLAR", "XARAJATLAR", "SUGURTA_DAVOLARI",
  "SHAXSLAR", "KIRISH_NUQTALARI", "QURILMALAR", "KIRISH_VOQEALARI",
  "RUXSATLAR", "KIRISH_SOROVLARI", "TASHRIFLAR", "XAVFSIZLIK_HODISALARI",
  "MASOFAVIY_SESSIYALAR", "XIZMAT_ISHLARI"];

/* Kolleksiya -> bo'lim kaliti (mijozdagi ROL_RUXSAT bilan bir xil nomlar) */
const KOLLEKSIYA_BOLIM = {
  yozuvlar: "aktivlar", hududlar: "aktivlar", xarajatlar: "aktivlar", hodisalar: "aktivlar",
  koriklar: "korik", baholashlar: "baholash",
  sugurtalar: "sugurta", sugurta_davolari: "sugurta",
  sud_majlislar: "yuridik", advokatlar: "yuridik",
  arxiv: "arxiv", hujjatlar: "hujjat",
  mening_vazifalarim: "vazifa", tasdiqlar: "vazifa", bildirishlar: "vazifa",
  foydlar: "sozlama",
  shaxslar: "kn", kirish_nuqtalari: "kn", qurilmalar: "kn", kirish_voqealari: "kn",
  ruxsatlar: "kn", kirish_sorovlari: "kn", tashriflar: "kn",
  xavfsizlik_hodisalari: "kn", masofaviy_sessiyalar: "kn", xizmat_ishlari: "kn",
};

/* Rol -> ochiq bo'limlar (mijozdagi yadro/app.js ROL_RUXSAT nusxasi) */
const ROL_BOLIMLAR = {
  "Administrator": null,
  "Filial rahbari": ["panel","aktivlar","kn","korik","baholash","sugurta","yuridik","arxiv",
                     "xarita","hisobot","vazifa","hujjat","sozlama"],
  "Obyekt menejeri": ["panel","aktivlar","kn","korik","arxiv","xarita","hisobot","vazifa","hujjat","sozlama"],
  "Ko'rik inspektori": ["panel","aktivlar","kn","korik","sugurta","xarita","hisobot","vazifa","hujjat","sozlama"],
  "Baholovchi mutaxassis": ["panel","aktivlar","baholash","hisobot","vazifa","hujjat","sozlama"],
  "Yurist": ["panel","yuridik","aktivlar","arxiv","hisobot","vazifa","hujjat","sozlama"],
};

function bolimRuxsatlimi(rol, bolim){
  const r = ROL_BOLIMLAR[rol];
  if (r === null) return true;          /* administrator */
  if (!r) return false;                 /* noma'lum rol — hech narsa */
  return r.includes(bolim);
}

function snapshotOqi(){
  const qum = {window: {}, document: undefined, localStorage: undefined};
  qum.globalThis = qum;
  for (const f of ["yadro/bino.js", "malumot.js", "malumot-qoshimcha.js",
                   "malumot-kengaytma.js", "malumot-kirish.js", "malumot-indeks.js"]){
    const kod = fs.readFileSync(path.join(ILDIZ, f), "utf8");
    vm.runInNewContext(kod, qum, {filename: f});
  }
  return qum.window.MKB_DATA || {};
}

function urugla(){
  if (!fs.existsSync(OMBOR)) fs.mkdirSync(OMBOR, {recursive: true});
  const D = snapshotOqi();
  let n = 0;
  for (const k of KOLLEKSIYALAR){
    const f = path.join(OMBOR, k.toLowerCase() + ".json");
    if (!fs.existsSync(f) && Array.isArray(D[k])){
      fs.writeFileSync(f, JSON.stringify(D[k], null, 1));
      n++;
    }
  }
  const amalF = path.join(OMBOR, "amallar.json");
  if (!fs.existsSync(amalF)) fs.writeFileSync(amalF, "[]");
  return n;
}

function oqi(kolleksiya){
  const f = path.join(OMBOR, kolleksiya + ".json");
  if (!fs.existsSync(f)) return null;
  try{ return JSON.parse(fs.readFileSync(f, "utf8")); }
  catch(_){ return null; }
}
function yoz(kolleksiya, royxat){
  fs.writeFileSync(path.join(OMBOR, kolleksiya + ".json"), JSON.stringify(royxat, null, 1));
}

/* ---------- Sessiyalar ---------- */
const SESSIYALAR = new Map(); /* token -> {ism, rol, filial, vaqt} */
const ROLLAR = ["Administrator", "Filial rahbari", "Obyekt menejeri",
  "Ko'rik inspektori", "Baholovchi mutaxassis", "Yurist"];

function amalYoz(s, kolleksiya, obyektId, turi, tafsilot){
  const j = oqi("amallar") || [];
  j.unshift({
    id: "AM-" + Date.now().toString(36) + crypto.randomBytes(2).toString("hex"),
    vaqt: new Date().toISOString().slice(0, 16).replace("T", " "),
    kim: s ? s.ism : "-", rol: s ? s.rol : "-",
    kolleksiya, obyektId, turi, tafsilot: tafsilot || "",
  });
  yoz("amallar", j.slice(0, 2000));
}

/* ---------- Yordamchilar ---------- */
function jsonJavob(res, kod, obj){
  const t = JSON.stringify(obj);
  res.writeHead(kod, {"Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"});
  res.end(t);
}
function tanaOqi(req){
  return new Promise((hal, rad) => {
    let t = "";
    req.on("data", d => { t += d; if (t.length > 1e6) req.destroy(); });
    req.on("end", () => { try{ hal(t ? JSON.parse(t) : {}); }catch(e){ rad(e); } });
  });
}

const MIME = {".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8", ".json": "application/json",
  ".svg": "image/svg+xml", ".webp": "image/webp", ".png": "image/png",
  ".jpg": "image/jpeg", ".woff2": "font/woff2", ".ico": "image/x-icon",
  ".md": "text/markdown; charset=utf-8"};

function statika(req, res){
  let yol = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (yol === "/") yol = "/kirish.html";
  const f = path.join(ILDIZ, yol);
  if (!f.startsWith(ILDIZ) || yol.includes("..")){ res.writeHead(403); res.end(); return; }
  fs.stat(f, (xato, st) => {
    if (xato || !st.isFile()){
      const x404 = path.join(ILDIZ, "xato-404.html");
      if (fs.existsSync(x404)){
        res.writeHead(404, {"Content-Type": "text/html; charset=utf-8"});
        fs.createReadStream(x404).pipe(res);
      } else { res.writeHead(404); res.end("topilmadi"); }
      return;
    }
    res.writeHead(200, {"Content-Type": MIME[path.extname(f)] || "application/octet-stream",
      "Cache-Control": yol.startsWith("/assets/") ? "max-age=86400" : "no-cache"});
    fs.createReadStream(f).pipe(res);
  });
}

/* ---------- API marshrutlash ---------- */
async function api(req, res, yol){
  const [, , resurs, xomId] = yol.split("/"); /* /api/resurs/id */
  const id = xomId ? decodeURIComponent(xomId) : xomId;
  const sToken = req.headers["x-sessiya"];
  const sessiya = sToken ? SESSIYALAR.get(sToken) : null;

  if (resurs === "salomat") return jsonJavob(res, 200, {holat: "ok", vaqt: Date.now()});

  if (resurs === "kirish" && req.method === "POST"){
    const t = await tanaOqi(req);
    const F = oqi("foydlar") || [];
    const login = String(t.login || "").trim().toLowerCase();
    const f = F.find(x => String(x.login || "").toLowerCase() === login);
    /* Noma'lum login, o'chirilgan hisob yoki noto'g'ri parol — bir xil javob:
       hisob mavjudligini oshkor qilmaymiz. */
    const kutilgan = (f && f.parol) || KIRISH_PAROL;
    if (!f || f.faol === false || !t.parol || !kutilgan || String(t.parol) !== kutilgan){
      amalYoz(null, "sessiya", login || "-", "kirish rad etildi");
      return jsonJavob(res, 401, {xato: "Login yoki parol noto'g'ri"});
    }
    if (!ROLLAR.includes(f.rol))
      return jsonJavob(res, 403, {xato: "Rol tizimda ro'yxatdan o'tmagan"});
    const token = crypto.randomBytes(18).toString("hex");
    /* Rol faqat hisob yozuvidan olinadi — mijoz tanlovi hisobga olinmaydi */
    const s = {token, ism: f.nom || f.ism || login, rol: f.rol,
               filial: f.bolim || f.filial || ""};
    SESSIYALAR.set(token, s);
    amalYoz(s, "sessiya", s.ism, "kirish");
    return jsonJavob(res, 200, s);
  }

  if (!sessiya) return jsonJavob(res, 401, {xato: "sessiya yo'q"});

  if (resurs === "amallar"){
    if (sessiya.rol !== "Administrator") return jsonJavob(res, 403, {xato: "faqat administrator"});
    return jsonJavob(res, 200, oqi("amallar") || []);
  }

  /* Kolleksiya darajasidagi ruxsat: sessiyadagi rol bo'yicha */
  const bolim = KOLLEKSIYA_BOLIM[resurs];
  if (bolim && !bolimRuxsatlimi(sessiya.rol, bolim))
    return jsonJavob(res, 403, {xato: "bu bo'lim rolingizga yopiq"});
  /* Foydalanuvchilar ro'yxatini faqat administrator o'zgartira oladi */
  if (resurs === "foydlar" && req.method !== "GET" && sessiya.rol !== "Administrator")
    return jsonJavob(res, 403, {xato: "faqat administrator"});

  const royxat = oqi(resurs);
  if (royxat === null) return jsonJavob(res, 404, {xato: "kolleksiya yo'q: " + resurs});

  if (req.method === "GET" && !id){
    const q = new URL(req.url, "http://x").searchParams;
    let r = royxat;
    for (const [k, v] of q){
      if (k === "q"){
        const s = v.toLowerCase();
        r = r.filter(x => JSON.stringify(x).toLowerCase().includes(s));
      } else r = r.filter(x => String(x[k]) === v);
    }
    return jsonJavob(res, 200, r);
  }
  if (req.method === "GET" && id){
    const x = royxat.find(y => String(y.id) === id);
    return x ? jsonJavob(res, 200, x) : jsonJavob(res, 404, {xato: "topilmadi"});
  }
  if (req.method === "POST"){
    const t = await tanaOqi(req);
    if (!t.id) t.id = resurs.toUpperCase().slice(0, 2) + "-" + Date.now().toString(36);
    royxat.push(t);
    yoz(resurs, royxat);
    amalYoz(sessiya, resurs, t.id, "yaratish");
    return jsonJavob(res, 201, t);
  }
  if (req.method === "PATCH" && id){
    const i = royxat.findIndex(y => String(y.id) === id);
    if (i < 0) return jsonJavob(res, 404, {xato: "topilmadi"});
    const t = await tanaOqi(req);
    delete t.id;
    Object.assign(royxat[i], t);
    yoz(resurs, royxat);
    amalYoz(sessiya, resurs, id, "yangilash", Object.keys(t).join(", "));
    return jsonJavob(res, 200, royxat[i]);
  }
  return jsonJavob(res, 405, {xato: "usul qo'llanmaydi"});
}

/* ---------- Server ---------- */
const server = http.createServer((req, res) => {
  const yol = new URL(req.url, "http://x").pathname;
  if (yol.startsWith("/api/")){
    api(req, res, yol).catch(e => jsonJavob(res, 500, {xato: String(e.message || e)}));
  } else statika(req, res);
});
if (require.main === module){
  const urug = urugla();
  server.listen(PORT, () => {
    console.log("Obyektlar nazorati server: http://localhost:" + PORT +
      (urug ? "  (omborga " + urug + " kolleksiya urug'landi)" : ""));
    if (PAROL_YARATILDI)
      console.log("Kirish paroli (shu ishga tushish uchun): " + KIRISH_PAROL);
  });
}
module.exports = {server, snapshotOqi, urugla};
