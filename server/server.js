/* ============================================================
   Aktivlar nazorati — lokal server (sof Node.js, paketsiz)
   Ishga tushirish:  node server/server.js   →  http://127.0.0.1:8790
   - statik fayllar (loyiha ildizi); mahalliy/ va server/ faqat shu kompyuterdan
   - REST /api/*  (ikki ombor: shartli namoyish va mahalliy reyestr)
   - sessiya tokenlari, rol va filial tekshiruvi, maydonlar oq ro'yxati
   - fayl saqlash (surat va hujjatlar): server/malumotlar/<manba>/fayllar/
   Muhit o'zgaruvchilari: PORT, MKB_HOST (standart 127.0.0.1), MKB_PAROL, MKB_BUGUN.

   Muhim: tizim shaxsga doir ma'lumotlarni (sobiq egalar, xaridorlar, xodimlar) saqlaydi.
   "Shaxsga doir ma'lumotlar to'g'risida"gi O'RQ-547 qonuni (27-1-modda) talabiga ko'ra
   O'zbekiston fuqarolarining bunday ma'lumotlari O'zbekiston hududidagi serverda
   saqlanadi. Serverni bank ichki tarmog'idagi kompyuterda ishga tushiring.
   ============================================================ */
const http = require("http");
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const crypto = require("crypto");
const zlib = require("zlib");

const ILDIZ = path.join(__dirname, "..");
const OMBOR = path.join(__dirname, "malumotlar");
const PORT = Number(process.env.PORT) || 8790;
const HOST = process.env.MKB_HOST || "127.0.0.1";
/* Boshlang'ich parol: muhit o'zgaruvchisidan olinadi. Berilmagan bo'lsa ishga tushishda
   tasodifiy parol yaratiladi va konsolga bir marta chiqadi. U faqat urug'dan kelgan
   hisoblarga amal qiladi; keyin qo'shilgan hisobga administrator alohida parol beradi. */
const KIRISH_PAROL = process.env.MKB_PAROL || crypto.randomBytes(6).toString("hex");
const PAROL_YARATILDI = !process.env.MKB_PAROL;

const SESSIYA_MUDDATI = 8 * 3600 * 1000;       /* 8 soat: mutlaq chegara */
const KUTISH_DAQ = 30;                          /* harakatsizlik: PARAMETRLAR.sessiyaKutishDaq bo'lmasa */
const TIKLASH_MUDDATI = 10 * 60 * 1000;         /* muallif o'z o'chirgan yozuvini shu muddatda qaytaradi */
const BLOK_URINISH = 5;                        /* ketma-ket noto'g'ri parol */
const BLOK_MUDDATI = 15 * 60 * 1000;           /* 15 daqiqa */
const FAYL_MAX = 20 * 1024 * 1024;             /* 20 MB */
const JSON_MAX = 4 * 1024 * 1024;

/* ---------- To'plamlar ---------- */
const KOLLEKSIYALAR = [
  "YOZUVLAR", "FILIALLAR", "HUJJATLAR", "FAYLLAR", "ARXIV", "XARAJATLAR",
  "KORIKLAR", "INVENTAR", "INVENTARIZATSIYALAR",
  "BAHOLASHLAR", "SUGURTALAR", "SUGURTA_DAVOLARI", "SOLIQ", "ZAXIRA_TARIX", "MB_HISOBOTLAR",
  "LOTLAR", "TAKLIFLAR", "XARIDORLAR", "SHARTNOMALAR", "IJARA", "PAKETLAR",
  "UNDIRUV_ISHLAR", "SUD_MAJLISLAR", "ADVOKATLAR", "RESTRUKTURIZATSIYA", "MULOQOTLAR",
  "HODISALAR", "QORIQLASH", "KOMMUNAL_ARIZALAR",
  "SHAXSLAR", "KIRISH_NUQTALARI", "QURILMALAR", "KIRISH_VOQEALARI", "RUXSATLAR",
  "KIRISH_SOROVLARI", "TASHRIFLAR", "XAVFSIZLIK_HODISALARI", "MASOFAVIY_SESSIYALAR", "XIZMAT_ISHLARI",
  "TASDIQLAR", "MENING_VAZIFALARIM", "BILDIRISHLAR",
  "FOYDLAR", "PARAMETRLAR", "BAYRAMLAR", "QOIDALAR", "INTEGRATSIYALAR",
  /* faqat o'qiladigan ma'lumotnomalar va hisoblangan jamlamalar */
  "HUDUDLAR", "HISOBOTLAR", "QURILMA_KATALOG", "HIMOYA_ANDOZALARI"];
const FAQAT_OQISH = new Set(["HUDUDLAR", "HISOBOTLAR", "QURILMA_KATALOG", "HIMOYA_ANDOZALARI"]);
/* Taxalluslar: bir to'plamning eski nomlari */
const TAXALLUS = {POLISLAR: "SUGURTALAR", SOTUV: "LOTLAR", VAZIFALAR: "MENING_VAZIFALARIM"};

/* To'plam -> bo'lim kaliti (yadro/daraxt.js bo'limlari) */
const KOLLEKSIYA_BOLIM = {
  YOZUVLAR: "aktivlar", HUJJATLAR: "aktivlar", FAYLLAR: "aktivlar", ARXIV: "aktivlar", XARAJATLAR: "aktivlar",
  HUDUDLAR: "aktivlar",
  KORIKLAR: "nazorat", INVENTAR: "nazorat", INVENTARIZATSIYALAR: "nazorat",
  BAHOLASHLAR: "qiymat", SUGURTALAR: "qiymat", SUGURTA_DAVOLARI: "qiymat", SOLIQ: "qiymat", ZAXIRA_TARIX: "qiymat",
  MB_HISOBOTLAR: "hisobot", HISOBOTLAR: "hisobot",
  LOTLAR: "sotuv", TAKLIFLAR: "sotuv", XARIDORLAR: "sotuv", SHARTNOMALAR: "sotuv",
  IJARA: "sotuv", PAKETLAR: "sotuv",
  UNDIRUV_ISHLAR: "sotuv", SUD_MAJLISLAR: "sotuv", ADVOKATLAR: "sotuv", RESTRUKTURIZATSIYA: "sotuv",
  MULOQOTLAR: "sotuv",
  HODISALAR: "nazorat", QORIQLASH: "nazorat", KOMMUNAL_ARIZALAR: "nazorat", QURILMA_KATALOG: "nazorat",
  HIMOYA_ANDOZALARI: "nazorat", SHAXSLAR: "nazorat", KIRISH_NUQTALARI: "nazorat", QURILMALAR: "nazorat",
  KIRISH_VOQEALARI: "nazorat", RUXSATLAR: "nazorat", KIRISH_SOROVLARI: "nazorat", TASHRIFLAR: "nazorat",
  XAVFSIZLIK_HODISALARI: "nazorat", MASOFAVIY_SESSIYALAR: "nazorat", XIZMAT_ISHLARI: "nazorat",
  TASDIQLAR: "ishlar", MENING_VAZIFALARIM: "ishlar", BILDIRISHLAR: "ishlar",
  FOYDLAR: "sozlama", FILIALLAR: "sozlama", PARAMETRLAR: "sozlama", BAYRAMLAR: "sozlama", QOIDALAR: "sozlama",
  INTEGRATSIYALAR: "sozlama",
};

/* Rol -> o'qish va yozish ochiq bo'limlar (null = hammasi).
   To'rt ish roli va texnik administrator; eski rol nomlari ROL_YANGI orqali shu beshtaga keltiriladi.
   Sozlamalar bo'limiga yozish faqat administratorga; PARAMETRLAR istisnosi pastda. */
const HAMMA_OQISH = ["panel", "aktivlar", "nazorat", "qiymat", "sotuv", "hisobot", "ishlar", "sozlama"];
const ROL_BOLIMLAR = {
  "Administrator":                   {oqi: null, yoz: null},
  /* Rahbariyat forma to'ldirmaydi (mijozda yozish tugmalari yopiq), lekin qarorni tasdiqlaganda amal.js
     taklif, lot, baholash va aktiv yozuvlarini o'zgartiradi, kirish so'rovini tasdiqlash esa ruxsat va tashrif
     yozadi — mijozdagi "t" bo'limlari (yadro/app.js ROL_RUXSAT) bilan bir xil.
     Ko'rik va undiruv yozuvlari esa ROL_KOL_TAQIQ bilan yopiladi. */
  "Rahbariyat":                      {oqi: HAMMA_OQISH, yoz: ["ishlar", "aktivlar", "nazorat", "sotuv", "qiymat"]},
  "Obyekt menejeri":                 {oqi: HAMMA_OQISH, yoz: ["aktivlar", "nazorat", "qiymat", "sotuv", "ishlar"]},
  "Ko'rik va xavfsizlik inspektori": {oqi: HAMMA_OQISH, yoz: ["aktivlar", "nazorat", "ishlar"]},
  "Buxgalteriya va risk":            {oqi: HAMMA_OQISH, yoz: ["qiymat", "hisobot", "ishlar"]},
};
const ROLLAR = Object.keys(ROL_BOLIMLAR);
/* Eski rol nomi -> yangi rol nomi (yadro/app.js ROL_YANGI bilan bir xil).
   Sof funksiya: kirishda, yozuvlarda va qoidalarda nomni almashtirishdan boshqa hech narsa qilmaydi. */
const ROL_YANGI = {
  "Filial rahbari": "Rahbariyat",
  "Baholovchi": "Obyekt menejeri",
  "Baholovchi mutaxassis": "Obyekt menejeri",
  "Realizatsiya mutaxassisi": "Obyekt menejeri",
  "Yurist": "Obyekt menejeri",
  "Xavfsizlik xizmati": "Ko'rik va xavfsizlik inspektori",
  "Ko'rik inspektori": "Ko'rik va xavfsizlik inspektori",
};
function rolNomiKanon(nom){ return ROL_YANGI[String(nom == null ? "" : nom).trim()] || nom; }
/* Bo'limlar birlashgandan keyin rol o'zi hech qachon yuritmaydigan to'plamlar: har qanday
   o'zgartirish so'roviga 403 (mijozda ham yozish tugmasi yo'q — yadro/app.js ROL_KOL_TAQIQ) */
const ROL_KOL_TAQIQ = {
  "Rahbariyat": ["KORIKLAR", "INVENTARIZATSIYALAR", "INVENTAR", "UNDIRUV_ISHLAR", "SUD_MAJLISLAR"],
};
const PARAMETR_YOZUVCHI = ["Administrator", "Buxgalteriya va risk"];
/* Bo'lim huquqidan tashqari: shu rollar to'plamga faqat yangi yozuv qo'sha oladi (POST).
   Ko'rik va xavfsizlik inspektori hodisa bo'yicha sug'urta da'vosini ochadi; da'voni keyin qiymat bo'limi yuritadi. */
const YARATISH_ISTISNO = {SUGURTA_DAVOLARI: ["Ko'rik va xavfsizlik inspektori"]};
/* Da'vo ochish uchun polis va da'volar ro'yxatini ko'rish kerak */
const OQISH_ISTISNO = {SUGURTALAR: ["Ko'rik va xavfsizlik inspektori"], SUGURTA_DAVOLARI: ["Ko'rik va xavfsizlik inspektori"]};
/* To'lov belgisi: Buxgalteriya va risk sotuv bo'limida faqat to'lov jadvali va holatni o'zgartiradi
   (mijozda MKB.tolovBelgilaydimi bilan bir xil) */
const TOLOV_ISTISNO = {IJARA: ["tolovlar", "holat"], SHARTNOMALAR: ["jadval", "holat"]};
const TOLOV_BELGILOVCHI = ["Buxgalteriya va risk"];
/* Muallif sessiyadan yoziladi va keyin o'zgarmaydi: xarajat qatori, kirish so'rovi, qo'lda berilgan vazifa */
const MUALLIFLI = new Set(["XARAJATLAR", "KIRISH_SOROVLARI", "MENING_VAZIFALARIM"]);

/* Balansga qabul (qabul-tasdiqlash.html) oxirida boshqa bo'limga ham yoziladi: undiruv ishi yopiladi va birlamchi
   ko'rik rejalashtiriladi. Qabulni aktivlar bo'limiga yoza oladigan rol bajaradi (Obyekt menejeri
   vazifadan yoki undiruv ishidan). Unga butun bo'lim ochilmaydi: faqat shu ikki yozuv va ular uchun kerakli o'qish.
   Qaytaradi: null (ruxsat yo'q) yoki {tana} (o'qilgan so'rov tanasi) / {faqatId} (ro'yxatdan faqat id'lar). */
async function qabulIstisnosi(o, s, kol, req, id){
  if (!bolimRuxsatlimi(s.rol, "aktivlar", "yoz")) return null;
  const D = o.D;
  const obyekt = oid => (D.YOZUVLAR || []).find(y => y && String(y.id) === String(oid) && !y.__ochirilgan);
  if (kol === "UNDIRUV_ISHLAR" && id){
    const ish = (D.UNDIRUV_ISHLAR || []).find(x => x && String(x.id) === id && !x.__ochirilgan);
    if (!ish) return null;
    /* ish allaqachon balansga olinganmi: bitta yozuvni tekshirish */
    if (req.method === "GET") return {};
    if (req.method !== "PATCH" || ish.aktivId) return null;
    const t = await tanaOqi(req);
    const ruxsatli = ["holat", "bosqich", "aktivId", "yopilganSana", "tarix"];
    if (!oddiyObyektmi(t) || Object.keys(t).some(k => !ruxsatli.includes(k))) return null;
    if (t.holat !== "yopilgan" || t.bosqich !== "qabul" || !t.aktivId) return null;
    const ob = obyekt(t.aktivId);
    if (!ob || !ob.balans || ob.balans.undiruvIshId !== ish.id) return null;
    /* Tarixga faqat bitta yangi qator qo'shiladi; oldingi qatorlar serverdagidan olinadi */
    const qator = Array.isArray(t.tarix) ? t.tarix[t.tarix.length - 1] : null;
    if (!oddiyObyektmi(qator) || !qator.voqea) return null;
    t.tarix = (Array.isArray(ish.tarix) ? ish.tarix : []).concat([qator]);
    return {tana: t};
  }
  if (kol === "KORIKLAR" && !id){
    /* keyingi ko'rik raqamini hisoblash uchun: ko'rik mazmuni berilmaydi */
    if (req.method === "GET") return {faqatId: true};
    if (req.method !== "POST") return null;
    const t = await tanaOqi(req);
    if (!oddiyObyektmi(t) || t.korikTuri !== "Birlamchi" || t.holat !== "rejada" || t.inspektor) return null;
    const ob = obyekt(t.obyektId);
    if (!ob || !ob.balans || !ob.balans.qabulAsosi) return null;
    if ((D.KORIKLAR || []).some(k => k && !k.__ochirilgan && k.obyektId === ob.id && k.korikTuri === "Birlamchi")) return null;
    return {tana: t};
  }
  return null;
}

function bolimRuxsatlimi(rol, bolim, usul){
  const h = ROL_BOLIMLAR[rol];
  if (!h) return false;                                   /* noma'lum rol — hech narsa */
  const r = usul === "oqi" ? h.oqi : h.yoz;
  if (r === null) return true;                            /* administrator */
  return r.includes(bolim);
}

/* ---------- Ma'lumot modelini o'qish ---------- */
const MALUMOT_FAYLLARI = ["malumot.js", "malumot-qoshimcha.js", "malumot-kengaytma.js",
                          "malumot-kirish.js", "malumot-indeks.js"];

function xotiraOmbori(){
  const m = new Map();
  return {getItem: k => (m.has(k) ? m.get(k) : null), setItem: (k, v) => m.set(k, String(v)),
          removeItem: k => m.delete(k)};
}

/* manba: "shartli" (namoyish) yoki "mahalliy" (mahalliy/obyektlar.json dagi haqiqiy reyestr) */
function snapshotOqi(manba){
  const qum = {window: {}, document: undefined, URLSearchParams, console};
  qum.globalThis = qum;
  if (process.env.MKB_BUGUN) qum.window.MKB_BUGUN = process.env.MKB_BUGUN;
  if (manba === "mahalliy"){
    qum.location = {hostname: "127.0.0.1", search: "", pathname: "/", href: "http://127.0.0.1/"};
    qum.localStorage = xotiraOmbori();
    qum.sessionStorage = xotiraOmbori();
    qum.XMLHttpRequest = function(){
      this.status = 0; this.responseText = "";
      this.open = (_u, url) => { this.url = String(url).split("?")[0]; };
      this.send = () => {
        const f = path.join(ILDIZ, this.url);
        if (f.startsWith(path.join(ILDIZ, "mahalliy")) && fs.existsSync(f)){
          this.status = 200; this.responseText = fs.readFileSync(f, "utf8");
        } else this.status = 404;
      };
    };
  }
  for (const f of MALUMOT_FAYLLARI){
    const kod = fs.readFileSync(path.join(ILDIZ, f), "utf8");
    vm.runInNewContext(kod, qum, {filename: f});
  }
  return qum.window.MKB_DATA || {};
}

function urugVersiyasi(manba){
  const h = crypto.createHash("sha1");
  for (const f of MALUMOT_FAYLLARI) h.update(fs.readFileSync(path.join(ILDIZ, f)));
  if (manba === "mahalliy"){
    const m = path.join(ILDIZ, "mahalliy", "obyektlar.json");
    if (fs.existsSync(m)) h.update(fs.readFileSync(m));
  }
  return h.digest("hex").slice(0, 16);
}
function mahalliyBormi(){ return fs.existsSync(path.join(ILDIZ, "mahalliy", "obyektlar.json")); }

/* ---------- Maydonlar oq ro'yxati va turlar ---------- */
let SXEMA_KESH = null;
function sxema(){
  if (SXEMA_KESH) return SXEMA_KESH;
  const D = omborOl("shartli").D;           /* namoyish to'plamlari to'liq: barcha maydonlar ko'rinadi */
  const S = {};
  for (const k of KOLLEKSIYALAR){
    const royxat = Array.isArray(D[k]) ? D[k] : [];
    const maydon = new Set((D.SXEMA && D.SXEMA[k]) || []);
    const turlar = {};
    const sxemaBor = maydon.size > 0;
    for (const x of royxat){
      if (!x || typeof x !== "object") continue;
      for (const [m, v] of Object.entries(x)){
        if (!sxemaBor) maydon.add(m);
        (turlar[m] = turlar[m] || new Set()).add(turi(v));
      }
    }
    /* namoyishda qiymati yo'q, lekin ruxsat etilgan qo'shimcha maydonlar (malumot.js QOSHIMCHA_MAYDONLAR) */
    for (const [m, t] of Object.entries((D.QOSHIMCHA_MAYDONLAR || {})[k] || {})){
      maydon.add(m);
      if (!turlar[m]) turlar[m] = new Set([t === "array" ? "array" : t]);
    }
    if (maydon.size){ maydon.add("id"); maydon.add("izoh"); }
    if (k === "FOYDLAR") maydon.add("parol");
    S[k] = {maydon, turlar};
  }
  SXEMA_KESH = S;
  return S;
}
function turi(v){
  if (v === null || v === undefined) return "null";
  if (Array.isArray(v)) return "array";
  return typeof v;
}
function oddiyObyektmi(v){ return v && typeof v === "object" && !Array.isArray(v); }

const SANA_MAYDON = /^(sana|boshlanish|tugash)$|Sana$/;
function tekshir(kol, t, D, yangimi){
  const s = sxema()[kol];
  if (!s || !s.maydon.size) return null;       /* sxemasi yo'q to'plam: tur tekshiruvisiz */
  for (const [m, v] of Object.entries(t)){
    if (m.startsWith("__")) return "ichki maydon yozilmaydi: " + m;
    if (!s.maydon.has(m)) return "noma'lum maydon: " + m;
    const kutilgan = s.turlar[m];
    const tv = turi(v);
    if (tv === "number" && !Number.isFinite(v)) return "son noto'g'ri: " + m;
    if (kutilgan && tv !== "null"){
      const ruxsat = new Set(kutilgan); ruxsat.delete("null");
      if (ruxsat.size && !ruxsat.has(tv)) return "maydon turi noto'g'ri: " + m;
    }
    if (tv === "string" && SANA_MAYDON.test(m) && v.trim() && !(D.sanaOqi && D.sanaOqi(v)))
      return "sana noto'g'ri: " + m;
  }
  if (JSON.stringify(t).includes("assets/obyekt/")) return "eskirgan rasm yo'li: assets/obyekt/";
  if (kol === "YOZUVLAR"){
    if (t.holat != null && D.HOLATLAR && !D.HOLATLAR.some(h => h.nom === t.holat)) return "holat noto'g'ri";
    if (t.bosqich != null && D.BOSQICHLAR && !D.BOSQICHLAR.some(b => b.kalit === t.bosqich)) return "bosqich noto'g'ri";
    if (t.balans !== undefined){
      if (!oddiyObyektmi(t.balans)) return "balans obyekt bo'lishi kerak";
      const q = t.balans.qiymat;
      if (q !== undefined && !(typeof q === "number" && Number.isFinite(q) && q > 0)) return "balans qiymati noto'g'ri";
      if (t.balans.sana !== undefined && !(D.sanaOqi && D.sanaOqi(t.balans.sana))) return "balans sanasi noto'g'ri";
    }
    if (yangimi){
      if (!String(t.nom || "").trim()) return "obyekt nomi kiritilmagan";
      if (!t.balans || !t.balans.qiymat || !t.balans.sana) return "balans sanasi va qiymati kiritilmagan";
    }
  }
  return null;
}

/* Ichki obyektlar (balans, qiymat, huquq...) bir daraja chuqur birlashtiriladi, massivlar almashtiriladi */
function birlashtir(asl, patch){
  for (const [k, v] of Object.entries(patch)){
    if (oddiyObyektmi(v) && oddiyObyektmi(asl[k])) asl[k] = Object.assign({}, asl[k], v);
    else asl[k] = v;
  }
  return asl;
}

/* ---------- Omborlar: urug' + o'zgarishlar qatlami ----------
   Urug' har ishga tushishda joriy ma'lumot modelidan olinadi. Foydalanuvchi o'zgarishlari
   malumotlar/<manba>/ozgarishlar.json da saqlanadi va urug' ustiga qo'llanadi. Urug'
   versiyasi o'zgarsa yangi modelga mos kelmaydigan maydonlar va uzilgan yozuvlar tashlanadi. */
const OMBORLAR = {};

function jsonOqi(f, bosh){
  try{ return JSON.parse(fs.readFileSync(f, "utf8")); }catch(_){ return bosh; }
}
function jsonYoz(f, obj){
  const vaqtincha = f + ".tmp";
  fs.writeFileSync(vaqtincha, JSON.stringify(obj, null, 1));
  fs.renameSync(vaqtincha, f);
}

function omborOl(manba){
  if (OMBORLAR[manba]) return OMBORLAR[manba];
  if (manba === "mahalliy" && !mahalliyBormi()) return null;
  const dir = path.join(OMBOR, manba);
  fs.mkdirSync(path.join(dir, "fayllar"), {recursive: true});
  const D = snapshotOqi(manba);
  const o = {manba, dir, D, ozg: jsonOqi(path.join(dir, "ozgarishlar.json"), {}), qayta: false};
  OMBORLAR[manba] = o;

  const versiya = urugVersiyasi(manba);
  const vf = path.join(dir, "versiya.json");
  const eski = jsonOqi(vf, {}).versiya;
  if (eski !== versiya){
    o.qayta = !!eski;
    if (eski) ozgarishlarniMoslash(o);
    jsonYoz(vf, {versiya, sana: new Date().toISOString()});
  }
  for (const [kol, ids] of Object.entries(o.ozg))
    for (const [id, p] of Object.entries(ids)) qatlamQolla(o, kol, id, p);
  if (!fs.existsSync(path.join(dir, "amallar.json"))) jsonYoz(path.join(dir, "amallar.json"), []);
  if (!fs.existsSync(path.join(dir, "parollar.json"))){
    /* urug'dagi hisoblar boshlang'ich parol bilan kiradi */
    const p = {};
    (D.FOYDLAR || []).forEach(f => { if (f.login) p[String(f.login).toLowerCase()] = {boshlangich: true}; });
    jsonYoz(path.join(dir, "parollar.json"), p);
  }
  return o;
}

function ozgarishlarniMoslash(o){
  for (const [kol, ids] of Object.entries(o.ozg)){
    if (!KOLLEKSIYALAR.includes(kol)){ delete o.ozg[kol]; continue; }
    const asl = o.D[kol] || [];
    const sx = sxema()[kol];
    for (const [id, p] of Object.entries(ids)){
      const yozuv = p.__yangi || p;
      if (sx && sx.maydon.size)
        for (const m of Object.keys(yozuv)) if (!m.startsWith("__") && !sx.maydon.has(m)) delete yozuv[m];
      if (!p.__yangi && !asl.some(x => String(x.id) === id)) delete ids[id];
    }
  }
  omborSaqla(o);
}

function qatlamQolla(o, kol, id, p){
  const asl = o.D[kol];
  if (!Array.isArray(asl)) return;
  const i = asl.findIndex(x => String(x.id) === id);
  if (p.__yangi){
    const y = Object.assign({}, p.__yangi);
    if (p.__ochirilgan) Object.assign(y, {__ochirilgan: true, ochirilganSana: p.ochirilganSana, ochirgan: p.ochirgan});
    if (i < 0) asl.push(y); else asl[i] = Object.assign(asl[i], y);
    return;
  }
  if (i < 0) return;
  const {__ochirilgan, ochirilganSana, ochirgan, ...maydon} = p;
  birlashtir(asl[i], maydon);
  if (__ochirilgan) Object.assign(asl[i], {__ochirilgan: true, ochirilganSana, ochirgan});
  else delete asl[i].__ochirilgan;
}

function omborSaqla(o){ jsonYoz(path.join(o.dir, "ozgarishlar.json"), o.ozg); }

function ozgarishYoz(o, kol, id, patch, yangimi){
  o.ozg[kol] = o.ozg[kol] || {};
  const bor = o.ozg[kol][id];
  if (yangimi) o.ozg[kol][id] = {__yangi: patch};
  else if (bor && bor.__yangi) birlashtir(bor.__yangi, patch);
  else o.ozg[kol][id] = birlashtir(Object.assign({}, bor), patch);
  omborSaqla(o);
}

function urugla(){
  fs.mkdirSync(OMBOR, {recursive: true});
  let n = 0;
  for (const m of ["shartli", "mahalliy"]){
    const o = omborOl(m);
    if (o) n += KOLLEKSIYALAR.filter(k => Array.isArray(o.D[k])).length;
  }
  return n;
}

/* ---------- Amallar jurnali ---------- */
/* Qoidalar dvigateli yozuvi (X-Tizim): jurnalga alohida tushmaydi, dvigatel bitta jamlama yozadi.
   Faqat avtomatik to'plamlarga ruxsat: foydalanuvchi amali bu belgi bilan yashirilmaydi. */
const TIZIM_KOLLEKSIYALAR = new Set(["BILDIRISHLAR", "MENING_VAZIFALARIM", "ZAXIRA_TARIX", "MB_HISOBOTLAR"]);
function tizimYozuvimi(req){
  if (req.headers["x-tizim"] !== "1") return false;
  const kol = String(new URL(req.url, "http://x").pathname.split("/")[2] || "").toUpperCase();
  return TIZIM_KOLLEKSIYALAR.has(TAXALLUS[kol] || kol);
}
let amalSanagich = 0;
function amalYoz(o, s, kolleksiya, obyektId, turi, ozgarish){
  const f = path.join(o.dir, "amallar.json");
  const j = jsonOqi(f, []);
  amalSanagich = (amalSanagich + 1) % 1e6;
  j.unshift({
    id: "AM-" + Date.now().toString(36) + "-" + amalSanagich.toString(36) + crypto.randomBytes(2).toString("hex"),
    vaqt: vaqtMatn(new Date()),
    kim: s ? s.ism : "-", rol: s ? s.rol : "-",
    kolleksiya, obyektId, turi,
    tafsilot: ozgarish ? Object.keys(ozgarish).join(", ") : "",
    ozgarish: ozgarish || null,
  });
  jsonYoz(f, j.slice(0, 5000));
}
function ikki(n){ return String(n).padStart(2, "0"); }
function vaqtMatn(d){
  return ikki(d.getDate()) + "." + ikki(d.getMonth() + 1) + "." + d.getFullYear() + " " +
         ikki(d.getHours()) + ":" + ikki(d.getMinutes());
}
function farq(asl, patch){
  const r = {};
  for (const [k, v] of Object.entries(patch)){
    const e = asl ? asl[k] : undefined;
    if (JSON.stringify(e) !== JSON.stringify(v)) r[k] = {eski: e === undefined ? null : e, yangi: v};
  }
  return r;
}

/* ---------- Parollar ---------- */
function parolXesh(parol, tuz){
  tuz = tuz || crypto.randomBytes(12).toString("hex");
  return {tuz, xesh: crypto.scryptSync(String(parol), tuz, 32).toString("hex")};
}
function parolTogrimi(o, login, parol){
  const p = jsonOqi(path.join(o.dir, "parollar.json"), {})[login];
  if (!p || !parol) return false;                         /* parolsiz hisob kira olmaydi */
  if (p.xesh){
    const b = Buffer.from(parolXesh(parol, p.tuz).xesh, "hex");
    return crypto.timingSafeEqual(b, Buffer.from(p.xesh, "hex"));
  }
  if (p.boshlangich){
    const a = Buffer.from(String(parol)), b = Buffer.from(KIRISH_PAROL);
    return a.length === b.length && crypto.timingSafeEqual(a, b);
  }
  return false;
}
function parolOrnat(o, login, parol){
  const f = path.join(o.dir, "parollar.json");
  const p = jsonOqi(f, {});
  p[login] = parolXesh(parol);
  jsonYoz(f, p);
}

/* ---------- Sessiyalar va bloklash ---------- */
const SESSIYALAR = new Map();      /* token -> {ism, rol, filial, filialKod, login, manba, tugash} */
const FAOLLIK = new Map();         /* token -> oxirgi so'rov vaqti (ms): harakatsizlik muddati uchun */
const URINISHLAR = new Map();      /* manba:login -> {soni, blokGacha} */
const OCHIRISH_IZI = new Map();    /* manba|to'plam|id -> {login, vaqt}: muallif 10 daqiqa ichida qaytarishi uchun */

function kutishDaq(manba){
  const o = OMBORLAR[manba];
  const p = o && (o.D.PARAMETRLAR || []).find(x => x && x.id === "sessiyaKutishDaq" && !x.__ochirilgan);
  const v = Number(p && p.qiymat);
  return Number.isFinite(v) && v > 0 ? v : KUTISH_DAQ;
}
function sessiyaOl(req){
  let t = req.headers["x-sessiya"];
  if (!t){
    const c = /(?:^|;\s*)mkb_s=([a-f0-9]+)/.exec(req.headers.cookie || "");
    t = c && c[1];
  }
  if (!t) return null;
  const s = SESSIYALAR.get(t);
  if (!s) return null;
  const hozir = Date.now();
  const oxirgi = FAOLLIK.get(t) || hozir;
  if (hozir > s.tugash || hozir - oxirgi > kutishDaq(s.manba) * 60000){ SESSIYALAR.delete(t); FAOLLIK.delete(t); return null; }
  FAOLLIK.set(t, hozir);
  return s;
}

function mahalliyManzilmi(req){
  const a = String(req.socket.remoteAddress || "");
  return a === "127.0.0.1" || a === "::1" || a === "::ffff:127.0.0.1";
}

/* ---------- Yordamchilar ---------- */
function jsonJavob(res, kod, obj, qoshimcha){
  const t = JSON.stringify(obj);
  res.writeHead(kod, Object.assign({"Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff"}, qoshimcha || {}));
  res.end(t);
}
function tanaOqi(req){
  return new Promise((hal, rad) => {
    let t = "";
    req.on("data", d => { t += d; if (t.length > JSON_MAX){ rad(new Error("so'rov juda katta")); req.destroy(); } });
    req.on("end", () => { try{ hal(t ? JSON.parse(t) : {}); }catch(e){ rad(new Error("JSON noto'g'ri")); } });
    req.on("error", rad);
  });
}

const MIME = {".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8", ".json": "application/json",
  ".svg": "image/svg+xml", ".webp": "image/webp", ".png": "image/png", ".gif": "image/gif",
  ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".woff2": "font/woff2", ".ico": "image/x-icon",
  ".pdf": "application/pdf", ".txt": "text/plain; charset=utf-8", ".csv": "text/csv; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".geojson": "application/geo+json",
  ".doc": "application/msword", ".xls": "application/vnd.ms-excel",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"};
const FAYL_TURLARI = {};
Object.entries(MIME).forEach(([e, m]) => {
  if (/^(image\/(jpeg|png|webp|gif)|application\/(pdf|msword|vnd)|text\/(plain|csv))/.test(m)) FAYL_TURLARI[m.split(";")[0]] = e;
});

function topilmadi(res){
  const x404 = path.join(ILDIZ, "xato-404.html");
  if (fs.existsSync(x404)){
    res.writeHead(404, {"Content-Type": "text/html; charset=utf-8"});
    fs.createReadStream(x404).pipe(res);
  } else { res.writeHead(404); res.end("topilmadi"); }
}

function statika(req, res){
  let yol;
  try{ yol = decodeURIComponent(new URL(req.url, "http://x").pathname); }
  catch(_){ res.writeHead(400); res.end(); return; }
  if (yol === "/") yol = "/kirish.html";
  const f = path.join(ILDIZ, yol);
  if (!f.startsWith(ILDIZ) || yol.includes("..")){ res.writeHead(403); res.end(); return; }
  const kichik = yol.toLowerCase();
  /* Server ombori (parollar, jurnal) hech kimga statik berilmaydi. Yashirin fayllar ham. */
  if (kichik.startsWith("/server/") || /\/\./.test(kichik)) return topilmadi(res);
  /* v8/ — ilovaning eski nusxasi (repoda kuzatilmaydi): server uni bermaydi */
  if (kichik.startsWith("/v8/") || kichik === "/v8") return topilmadi(res);
  /* Ishlab chiqish qoldiqlari: _ bilan boshlanadigan tekshiruv sahifalari va skript fayllari.
     Ular mahsulot konturiga kirmaydi, shuning uchun tashqi manzildan ochilmaydi. */
  if (/\/_[^/]*\.html$/.test(kichik) || /\.(py|pyc)$/.test(kichik)) return topilmadi(res);
  /* Haqiqiy reyestr va suratlar faqat shu kompyuterdan */
  if (kichik.startsWith("/mahalliy/") && !mahalliyManzilmi(req)) return topilmadi(res);
  fs.stat(f, (xato, st) => {
    if (xato || !st.isFile()) return topilmadi(res);
    const tur = MIME[path.extname(f).toLowerCase()] || "application/octet-stream";
    const bosh = {"Content-Type": tur,
      "Cache-Control": yol.startsWith("/assets/") ? "max-age=86400" : "no-cache"};
    /* Matn fayllari siqib beriladi: chegara fayllari 476 KB dan 132 KB ga tushadi,
       filialning tor kanalida bu sezilarli. Rasm va shrift allaqachon siqilgan — ularga tegilmaydi. */
    const siqsa = /^(text\/|application\/(json|geo\+json|javascript))/.test(tur) &&
      /(^|[\s,])gzip($|[\s,;])/.test(String(req.headers["accept-encoding"] || ""));
    if (siqsa){
      bosh["Content-Encoding"] = "gzip";
      bosh["Vary"] = "Accept-Encoding";
      res.writeHead(200, bosh);
      fs.createReadStream(f).pipe(zlib.createGzip()).pipe(res);
      return;
    }
    res.writeHead(200, bosh);
    fs.createReadStream(f).pipe(res);
  });
}

function yangiId(kol){
  const p = {YOZUVLAR: "BM", FAYLLAR: "FL", LOTLAR: "LOT", TAKLIFLAR: "TK", SHARTNOMALAR: "SH",
             UNDIRUV_ISHLAR: "UI", HODISALAR: "HD", KORIKLAR: "KR", TASDIQLAR: "TS"}[kol] || kol.slice(0, 2);
  return p + "-" + Date.now().toString(36).toUpperCase() + crypto.randomBytes(2).toString("hex").toUpperCase();
}

/* Filiali ko'rsatilgan hisob (masalan filial boshqaruvchisi) faqat o'z filiali obyektlarini o'zgartiradi.
   Filial endi alohida rol emas: fence hisobdagi filialKod bo'yicha ishlaydi. */
function filialKodi(o, kol, yozuv){
  if (!yozuv) return undefined;
  if (yozuv.filialKod !== undefined && (kol === "YOZUVLAR" || kol === "UNDIRUV_ISHLAR")) return yozuv.filialKod;
  if (yozuv.obyektId){
    const ob = (o.D.YOZUVLAR || []).find(x => x.id === yozuv.obyektId);
    return ob ? ob.filialKod : null;
  }
  if (yozuv.aktivId){
    const ob = (o.D.YOZUVLAR || []).find(x => x.id === yozuv.aktivId);
    return ob ? ob.filialKod : null;
  }
  /* Qaror so'rovi (TASDIQLAR) va vazifa obyektsiz bo'lishi mumkin: filial manba yozuvidan olinadi */
  if (yozuv.manbaKol && yozuv.manbaId && KOLLEKSIYALAR.includes(yozuv.manbaKol) && yozuv.manbaKol !== kol){
    const m = (o.D[yozuv.manbaKol] || []).find(x => x && x.id === yozuv.manbaId);
    if (m) return filialKodi(o, yozuv.manbaKol, m);
  }
  return undefined;
}
function filialRuxsatmi(o, s, kol, ...yozuvlar){
  if (!s.filialKod) return true;
  for (const y of yozuvlar){
    const k = filialKodi(o, kol, y);
    if (k !== undefined && k !== s.filialKod) return false;
  }
  return true;
}

function yozuvToza(kol, x){
  if (kol !== "FOYDLAR") return x;
  const qolgan = Object.assign({}, x);
  delete qolgan.parol;
  return qolgan;
}

/* ---------- To'rt ko'z qoidasi (TASDIQLAR) ----------
   Qaror so'rovini yuborgan xodim uni o'zi tasdiqlamaydi va rad etmaydi, administrator ham.
   Muallif maydonlari keyin o'zgartirilmaydi. */
function kichikMatn(x){ return String(x == null ? "" : x).trim().toLowerCase(); }
function tortKozXatosi(x, t, s){
  if ("muallifLogin" in t || "muallif" in t){
    const ozgardi = ("muallifLogin" in t && kichikMatn(t.muallifLogin) !== kichikMatn(x.muallifLogin)) ||
      ("muallif" in t && String(t.muallif || "") !== String(x.muallif || ""));
    if (ozgardi) return "so'rov muallifi o'zgartirilmaydi";
  }
  const qaror = ["tasdiqlangan", "rad etilgan"].includes(t.holat) || (t.qaror != null && t.qaror !== x.qaror);
  if (!qaror) return null;
  const ozi = x.muallifLogin ? kichikMatn(x.muallifLogin) === kichikMatn(s.login) : (!!x.muallif && x.muallif === s.ism);
  if (ozi) return "O'z so'rovingizni o'zingiz tasdiqlay olmaysiz";
  if ("qarorKim" in t && t.qarorKim != null && kichikMatn(t.qarorKim) !== kichikMatn(s.login)) return "qaror qilgan xodim sessiyadan olinadi";
  return null;
}

/* Obyektga kirish so'rovini hal qiladigan rollar (mijozdagi nazorat: "t" bilan bir xil).
   Ko'rik va xavfsizlik inspektori so'rovni yuboradi, lekin hal qilmaydi: to'rt ko'z shu yerda ikki bo'limga bo'linadi. */
const KIRISH_TASDIQLOVCHI = ["Administrator", "Rahbariyat", "Obyekt menejeri"];
/* Kirish so'rovini yuborgan xodim uni o'zi tasdiqlamaydi va rad etmaydi (administrator ham) */
function kirishSorovXatosi(x, t, s){
  if (!("holat" in t) || t.holat === x.holat || !["tasdiqlangan", "rad etilgan"].includes(t.holat)) return null;
  if (!KIRISH_TASDIQLOVCHI.includes(s.rol)) return "Kirish so'rovini boshqa bo'lim xodimi hal qiladi";
  const ozi = x.muallifLogin ? kichikMatn(x.muallifLogin) === kichikMatn(s.login) : (!!x.sorovchi && x.sorovchi === s.ism);
  return ozi ? "O'z so'rovingizni o'zingiz tasdiqlay olmaysiz" : null;
}
/* Boshqa xodim bergan vazifani ijrochi o'chirmaydi: faqat muallif yoki administrator */
function vazifaOchirishXatosi(x, s){
  if (!x.muallifLogin || s.rol === "Administrator") return null;
  return kichikMatn(x.muallifLogin) === kichikMatn(s.login) ? null : "Boshqa xodim bergan vazifani o'chira olmaysiz. Bajarildi deb belgilang";
}
/* Balansdan chiqarish (ARXIV yozuvi, aktiv holati "Chiqarildi") faqat boshqa xodim yuborgan chiqim so'rovi bo'yicha */
function chiqimXatosi(o, s, obyektId){
  const t = (o.D.TASDIQLAR || []).find(r => r && !r.__ochirilgan && r.tur === "chiqim" && ["kutilmoqda", "tasdiqlangan"].includes(r.holat) &&
    (String(r.obyektId) === String(obyektId) || String(r.manbaId) === String(obyektId)));
  if (!t) return "Balansdan chiqarish qaror so'rovi orqali bajariladi: so'rov yuboring, uni boshqa xodim tasdiqlaydi";
  const ozi = t.muallifLogin ? kichikMatn(t.muallifLogin) === kichikMatn(s.login) : (!!t.muallif && t.muallif === s.ism);
  return ozi ? "O'z so'rovingizni o'zingiz tasdiqlay olmaysiz" : null;
}

/* Xodim o'z hisobida faqat shu maydonlarni o'zgartiradi
   (sozlamalar: aloqa, o'rinbosar, sayohatlar, bildirishnomalar; kirish sahifasi: hujjatlarga rozilik) */
const OZ_MAYDONLAR = ["tel", "email", "orinbosar", "sayohatlar", "bildirishSozlama", "rozilik"];
const SAYOHAT_HOLAT = ["tugadi", "otkazildi", "yarim"];
/* Rozilik yozuvi: {tahrir, hujjatSana, sana} va eski tahrirlar tarixi */
function rozilikQatoriTogrimi(v){
  if (!oddiyObyektmi(v)) return false;
  if (Object.keys(v).some(k => !["tahrir", "hujjatSana", "sana"].includes(k))) return false;
  return ["tahrir", "hujjatSana", "sana"].every(k => typeof v[k] === "string" && v[k].length > 0 && v[k].length <= 40);
}
function sanaTogrimi(v){ const m = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(String(v || "")); return m ? new Date(+m[3], +m[2] - 1, +m[1]) : null; }
async function ozYozuvIstisnosi(o, s, req, id){
  const x = (o.D.FOYDLAR || []).find(f => f && String(f.id) === String(id) && !f.__ochirilgan);
  if (!x || String(x.id) !== String(s.id)) return {xato: "faqat administrator", kod: 403};
  const t = await tanaOqi(req);
  if (!oddiyObyektmi(t)) return {xato: "o'zgarish obyekt bo'lishi kerak"};
  delete t.id;
  const ortiqcha = Object.keys(t).filter(k => !OZ_MAYDONLAR.includes(k));
  if (ortiqcha.length) return {xato: "o'z hisobingizda faqat aloqa, o'rinbosar, sayohatlar, bildirishnoma sozlamasi va hujjatlarga rozilik o'zgaradi", kod: 403};
  if ("rozilik" in t && t.rozilik !== null){
    const r = t.rozilik;
    if (!oddiyObyektmi(r) || Object.keys(r).some(k => !["tahrir", "hujjatSana", "sana", "tarix"].includes(k)) ||
        !rozilikQatoriTogrimi({tahrir: r.tahrir, hujjatSana: r.hujjatSana, sana: r.sana}))
      return {xato: "rozilik yozuvi noto'g'ri"};
    if ("tarix" in r && (!Array.isArray(r.tarix) || r.tarix.length > 30 || !r.tarix.every(rozilikQatoriTogrimi)))
      return {xato: "rozilik tarixi noto'g'ri"};
  }
  if ("bildirishSozlama" in t && t.bildirishSozlama !== null){
    const b = t.bildirishSozlama;
    if (!oddiyObyektmi(b) || Object.keys(b).some(k => k !== "olinmaydi") || !Array.isArray(b.olinmaydi) ||
        b.olinmaydi.length > 50 || b.olinmaydi.some(q => typeof q !== "string" || !/^Q-[A-Z0-9-]{1,30}$/.test(q)))
      return {xato: "bildirishnoma sozlamasi noto'g'ri"};
  }
  if (JSON.stringify(t).length > 8192) return {xato: "so'rov juda katta"};
  if ("orinbosar" in t && t.orinbosar !== null){
    const b = t.orinbosar;
    if (!oddiyObyektmi(b) || Object.keys(b).some(k => !["login", "dan", "gacha"].includes(k))) return {xato: "o'rinbosar ma'lumoti noto'g'ri"};
    const l = kichikMatn(b.login);
    if (!l || l === kichikMatn(x.login)) return {xato: "o'rinbosar boshqa xodim bo'lishi kerak"};
    if (!(o.D.FOYDLAR || []).some(f => f && !f.__ochirilgan && f.faol !== false && kichikMatn(f.login) === l)) return {xato: "bunday faol xodim yo'q"};
    const dan = sanaTogrimi(b.dan), gacha = sanaTogrimi(b.gacha);
    if (!dan || !gacha || gacha < dan) return {xato: "o'rinbosarlik davri noto'g'ri"};
  }
  if ("sayohatlar" in t && t.sayohatlar !== null){
    if (!oddiyObyektmi(t.sayohatlar)) return {xato: "sayohatlar ma'lumoti noto'g'ri"};
    for (const v of Object.values(t.sayohatlar))
      if (!oddiyObyektmi(v) || !SAYOHAT_HOLAT.includes(v.holat)) return {xato: "sayohat holati noto'g'ri"};
  }
  for (const k of ["tel", "email"]) if (k in t && t[k] != null && (typeof t[k] !== "string" || t[k].length > 120)) return {xato: k + " noto'g'ri"};
  return {tana: t};
}

/* Zaxira stavkasini tasdiqlash: Rahbariyat PARAMETRLAR ga faqat kutilayotgan "zaxira" so'rovidagi qiymatni yozadi,
   so'rov boshqa xodimniki bo'lishi shart (to'rt ko'z) */
async function zaxiraIstisnosi(o, s, req, id){
  if (s.rol !== "Rahbariyat") return null;
  const t = await tanaOqi(req);
  if (!oddiyObyektmi(t) || Object.keys(t).some(k => !["qiymat", "taxminiy"].includes(k)) || typeof t.qiymat !== "number") return null;
  const mos = (o.D.TASDIQLAR || []).some(r => r && !r.__ochirilgan && r.tur === "zaxira" && r.holat === "kutilmoqda" &&
    !(r.muallifLogin ? kichikMatn(r.muallifLogin) === kichikMatn(s.login) : r.muallif === s.ism) &&
    (!r.masulRol || r.masulRol === s.rol) &&
    oddiyObyektmi(r.asos) && Array.isArray(r.asos.parametrlar) &&
    r.asos.parametrlar.some(p => p && String(p.id) === String(id) && Number(p.qiymat) === t.qiymat));
  return mos ? {tana: t} : null;
}

/* ---------- Fayllar ---------- */
async function faylYukla(req, res, o, s){
  const tur = String(req.headers["content-type"] || "").split(";")[0].trim().toLowerCase();
  if (!FAYL_TURLARI[tur]) return jsonJavob(res, 415, {xato: "bu fayl turi qabul qilinmaydi"});
  const uzunlik = Number(req.headers["content-length"] || 0);
  if (uzunlik > FAYL_MAX) return jsonJavob(res, 413, {xato: "fayl 20 MB dan katta"});
  let nom = "fayl" + FAYL_TURLARI[tur];
  try{ nom = decodeURIComponent(String(req.headers["x-fayl-nom"] || nom)).replace(/[\\/:*?"<>|\r\n]/g, "_").slice(0, 180); }catch(_){ }
  const meta = {};
  for (const m of ["obyektId", "kolleksiya", "yozuvId"]){
    const v = req.headers["x-" + m.toLowerCase()];
    if (v) try{ meta[m] = decodeURIComponent(String(v)); }catch(_){ }
  }
  if (!filialRuxsatmi(o, s, "FAYLLAR", meta)) return jsonJavob(res, 403, {xato: "boshqa filial obyekti"});
  const id = yangiId("FAYLLAR");
  const disk = path.join(o.dir, "fayllar", id + FAYL_TURLARI[tur]);
  const hajm = await new Promise((hal, rad) => {
    let n = 0, toxtadi = false;
    const oqim = fs.createWriteStream(disk);
    req.on("data", b => {
      n += b.length;
      if (n > FAYL_MAX && !toxtadi){ toxtadi = true; req.unpipe(oqim); oqim.destroy(); fs.rm(disk, () => {}); rad(new Error("katta")); }
    });
    req.pipe(oqim);
    oqim.on("finish", () => hal(n));
    oqim.on("error", rad);
  }).catch(() => -1);
  if (hajm < 0) return jsonJavob(res, 413, {xato: "fayl 20 MB dan katta"});
  if (!hajm){ fs.rm(disk, () => {}); return jsonJavob(res, 400, {xato: "fayl bo'sh"}); }
  const yozuv = Object.assign({id, obyektId: null, kolleksiya: null, yozuvId: null}, meta, {
    nom, tur, hajm, yuklangan: vaqtMatn(new Date()), yuklagan: s.ism, yol: "api/fayllar/" + id + "/xom"});
  (o.D.FAYLLAR = o.D.FAYLLAR || []).push(yozuv);
  ozgarishYoz(o, "FAYLLAR", id, yozuv, true);
  amalYoz(o, s, "FAYLLAR", id, "fayl yuklash", {nom: {eski: null, yangi: nom}});
  return jsonJavob(res, 201, yozuv);
}

function faylBer(req, res, o, id){
  const y = (o.D.FAYLLAR || []).find(x => x.id === id && !x.__ochirilgan);
  const ext = y && FAYL_TURLARI[y.tur];
  const disk = ext && path.join(o.dir, "fayllar", id + ext);
  if (!disk || !fs.existsSync(disk)) return jsonJavob(res, 404, {xato: "fayl serverda yo'q"});
  const yuklab = new URL(req.url, "http://x").searchParams.get("yuklab") === "1";
  res.writeHead(200, {"Content-Type": y.tur, "Cache-Control": "private, no-store",
    "X-Content-Type-Options": "nosniff",
    "Content-Disposition": (yuklab || !/^image\/|pdf$/.test(y.tur) ? "attachment" : "inline") +
      "; filename*=UTF-8''" + encodeURIComponent(y.nom)});
  fs.createReadStream(disk).pipe(res);
}

/* ---------- API marshrutlash ---------- */
async function api(req, res, yol){
  const qism = yol.split("/").slice(2).map(x => { try{ return decodeURIComponent(x); }catch(_){ return x; } });
  const resurs = String(qism[0] || "").toLowerCase();
  const id = qism[1];
  const amal = qism[2];

  if (resurs === "salomat")
    return jsonJavob(res, 200, {holat: "ok", vaqt: Date.now(),
      manbalar: mahalliyBormi() && mahalliyManzilmi(req) ? ["shartli", "mahalliy"] : ["shartli"]});

  if (resurs === "kirish" && req.method === "POST"){
    const t = await tanaOqi(req);
    const manba = t.manba === "mahalliy" ? "mahalliy" : "shartli";
    if (manba === "mahalliy" && !mahalliyManzilmi(req))
      return jsonJavob(res, 403, {xato: "haqiqiy reyestr faqat shu kompyuterdan ochiladi"});
    const o = omborOl(manba);
    if (!o) return jsonJavob(res, 404, {xato: "reyestr topilmadi"});
    const login = String(t.login || "").trim().toLowerCase();
    const kalit = manba + ":" + login;
    const u = URINISHLAR.get(kalit);
    if (u && u.blokGacha > Date.now()){
      const daq = Math.ceil((u.blokGacha - Date.now()) / 60000);
      return jsonJavob(res, 429, {xato: "Login " + daq + " daqiqaga bloklangan", daqiqa: daq});
    }
    const f = (o.D.FOYDLAR || []).find(x => !x.__ochirilgan && String(x.login || "").toLowerCase() === login);
    /* Noma'lum login, o'chirilgan hisob yoki noto'g'ri parol — bir xil javob */
    if (!f || f.faol === false || !parolTogrimi(o, login, t.parol)){
      if (login){
        const n = (u && u.blokGacha <= Date.now() && u.blokGacha ? 0 : (u ? u.soni : 0)) + 1;
        URINISHLAR.set(kalit, {soni: n, blokGacha: n >= BLOK_URINISH ? Date.now() + BLOK_MUDDATI : 0});
      }
      amalYoz(o, null, "SESSIYA", login || "-", "kirish rad etildi");
      return jsonJavob(res, 401, {xato: "Login yoki parol noto'g'ri"});
    }
    /* Eski rol nomi bilan qolgan hisob rad etilmaydi: nomi yangi rolga keltiriladi va jurnalga yoziladi */
    const rol = rolNomiKanon(f.rol);
    if (!ROLLAR.includes(rol))
      return jsonJavob(res, 403, {xato: "Rol tizimda ro'yxatdan o'tmagan"});
    URINISHLAR.delete(kalit);
    const token = crypto.randomBytes(24).toString("hex");
    /* Rol faqat hisob yozuvidan olinadi — mijoz tanlovi hisobga olinmaydi */
    const s = {token, id: f.id, login: f.login, ism: f.nom || f.ism || login, rol,
               filial: f.bolim || f.filial || "", filialKod: f.filialKod || null, manba,
               tugash: Date.now() + SESSIYA_MUDDATI};
    SESSIYALAR.set(token, s);
    FAOLLIK.set(token, Date.now());
    amalYoz(o, s, "SESSIYA", s.ism, rol === f.rol ? "kirish" : "kirish (rol " + f.rol + " -> " + rol + ")");
    return jsonJavob(res, 200, s, {"Set-Cookie": "mkb_s=" + token + "; HttpOnly; SameSite=Strict; Path=/; Max-Age=" + SESSIYA_MUDDATI / 1000});
  }

  const sessiya = sessiyaOl(req);
  if (!sessiya) return jsonJavob(res, 401, {xato: "sessiya yo'q yoki muddati tugagan"});
  const o = omborOl(sessiya.manba);
  if (!o) return jsonJavob(res, 404, {xato: "reyestr topilmadi"});

  /* "Davom etish": harakat vaqti sessiyaOl da yangilandi, mutlaq 8 soatlik chegara o'zgarmaydi */
  if (resurs === "sessiya" && id === "uzaytir" && req.method === "POST")
    return jsonJavob(res, 200, {holat: "ok", tugash: sessiya.tugash, kutishDaq: kutishDaq(sessiya.manba)});
  if (resurs === "chiqish" && req.method === "POST"){
    SESSIYALAR.delete(sessiya.token);
    FAOLLIK.delete(sessiya.token);
    amalYoz(o, sessiya, "SESSIYA", sessiya.ism, "chiqish");
    return jsonJavob(res, 200, {holat: "ok"}, {"Set-Cookie": "mkb_s=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0"});
  }
  if (resurs === "parol" && req.method === "POST"){
    const t = await tanaOqi(req);
    const yangiP = String(t.yangi || "");
    if (!parolTogrimi(o, String(sessiya.login).toLowerCase(), t.eski))
      return jsonJavob(res, 403, {xato: "Joriy parol noto'g'ri"});
    if (yangiP.length < 8) return jsonJavob(res, 400, {xato: "Parol kamida 8 belgidan iborat bo'lsin"});
    parolOrnat(o, String(sessiya.login).toLowerCase(), yangiP);
    amalYoz(o, sessiya, "FOYDLAR", sessiya.id, "parol almashtirildi");
    return jsonJavob(res, 200, {holat: "ok"});
  }

  /* Qoidalar dvigatelining avtomatik yozuvlari jamlamasi: "Tizim" nomidan bitta yozuv. Faqat sonlar qabul qilinadi. */
  if (resurs === "amallar" && id === "tizim" && req.method === "POST"){
    const t = await tanaOqi(req);
    const hisob = oddiyObyektmi(t) && oddiyObyektmi(t.hisob) ? t.hisob : {};
    const ozg = {};
    for (const [k, v] of Object.entries(hisob))
      if (KOLLEKSIYALAR.includes(k) && Number.isInteger(v) && v > 0 && v < 100000) ozg[k] = {eski: null, yangi: v};
    if (!Object.keys(ozg).length) return jsonJavob(res, 400, {xato: "jamlama bo'sh"});
    amalYoz(o, {ism: "Tizim", rol: "Tizim"}, "QOIDALAR", null, "yaratish", ozg);
    return jsonJavob(res, 200, {holat: "ok"});
  }
  /* Amallar jurnali: administrator va rahbariyat (faqat o'qish) — mijozdagi SAHIFA_MAXSUS bilan bir xil */
  if (resurs === "amallar"){
    if (!(sessiya.rol === "Administrator" || (sessiya.rol === "Rahbariyat" && req.method === "GET")))
      return jsonJavob(res, 403, {xato: "faqat administrator va rahbariyat"});
    return jsonJavob(res, 200, jsonOqi(path.join(o.dir, "amallar.json"), []));
  }

  /* Urug' ustidagi o'zgarishlar: brauzer ularni xotiradagi MKB_DATA ga qo'llaydi */
  if (resurs === "ozgarishlar" && req.method === "GET"){
    const r = {};
    for (const [kol, ids] of Object.entries(o.ozg)){
      const b = KOLLEKSIYA_BOLIM[kol];
      if (b && !bolimRuxsatlimi(sessiya.rol, b, "oqi") && !(OQISH_ISTISNO[kol] || []).includes(sessiya.rol)) continue;
      r[kol] = {};
      for (const [id2, p] of Object.entries(ids))
        r[kol][id2] = p.__yangi ? Object.assign({}, p, {__yangi: yozuvToza(kol, p.__yangi)}) : yozuvToza(kol, p);
    }
    return jsonJavob(res, 200, r);
  }

  const katta = resurs.toUpperCase();
  const kol = TAXALLUS[katta] || katta;
  if (!KOLLEKSIYALAR.includes(kol)) return jsonJavob(res, 404, {xato: "kolleksiya yo'q: " + resurs});
  const bolim = KOLLEKSIYA_BOLIM[kol];
  const oqishmi = req.method === "GET";
  let oldTana;                  /* istisno tekshiruvida o'qilgan so'rov tanasi */
  let faqatId = false;
  let ozYozuv = false;          /* xodim o'z hisobida ruxsat etilgan maydonlarni o'zgartiradi */
  if (kol === "FOYDLAR" && req.method === "PATCH" && id && sessiya.rol !== "Administrator"){
    const q = await ozYozuvIstisnosi(o, sessiya, req, id).catch(e => ({xato: e.message}));
    if (q.xato) return jsonJavob(res, q.kod || 400, {xato: q.xato});
    oldTana = q.tana; ozYozuv = true;
  }
  if (!oqishmi && (ROL_KOL_TAQIQ[sessiya.rol] || []).includes(kol))
    return jsonJavob(res, 403, {xato: "bu to'plamni rolingiz yuritmaydi"});
  if (!ozYozuv && bolim && !bolimRuxsatlimi(sessiya.rol, bolim, oqishmi ? "oqi" : "yoz")){
    let ruxsat = (kol === "PARAMETRLAR" && !oqishmi && PARAMETR_YOZUVCHI.includes(sessiya.rol)) ||
      (req.method === "POST" && !id && (YARATISH_ISTISNO[kol] || []).includes(sessiya.rol)) ||
      (oqishmi && (OQISH_ISTISNO[kol] || []).includes(sessiya.rol));
    if (!ruxsat && TOLOV_ISTISNO[kol] && req.method === "PATCH" && id && TOLOV_BELGILOVCHI.includes(sessiya.rol)){
      const t = await tanaOqi(req).catch(() => null);
      if (oddiyObyektmi(t) && Object.keys(t).length && Object.keys(t).every(k => TOLOV_ISTISNO[kol].includes(k))){ ruxsat = true; oldTana = t; }
      else return jsonJavob(res, 403, {xato: "Buxgalteriya faqat to'lov belgisini qo'yadi"});
    }
    if (!ruxsat && kol === "PARAMETRLAR" && req.method === "PATCH" && id){
      const q = await zaxiraIstisnosi(o, sessiya, req, id).catch(() => null);
      if (q){ ruxsat = true; oldTana = q.tana; }
    }
    if (!ruxsat){
      const q = await qabulIstisnosi(o, sessiya, kol, req, id).catch(() => null);
      if (q){ ruxsat = true; oldTana = q.tana; faqatId = !!q.faqatId; }
    }
    if (!ruxsat) return jsonJavob(res, 403, {xato: "bu bo'lim rolingizga yopiq"});
  }
  if (!oqishmi && FAQAT_OQISH.has(kol)) return jsonJavob(res, 405, {xato: "bu to'plam faqat o'qiladi"});
  if (kol === "FOYDLAR" && !oqishmi && sessiya.rol !== "Administrator" && !ozYozuv)
    return jsonJavob(res, 403, {xato: "faqat administrator"});

  if (kol === "HUDUDLAR" && o.D.hududKesimi) o.D.HUDUDLAR = o.D.hududKesimi();
  const royxat = Array.isArray(o.D[kol]) ? o.D[kol] : (o.D[kol] = []);

  /* fayllar */
  if (kol === "FAYLLAR" && req.method === "POST" && id === "yukla") return faylYukla(req, res, o, sessiya);
  if (kol === "FAYLLAR" && req.method === "GET" && id && amal === "xom") return faylBer(req, res, o, id);

  if (req.method === "GET" && !id){
    const q = new URL(req.url, "http://x").searchParams;
    const ochirilganlar = q.get("ochirilgan") === "1" && sessiya.rol === "Administrator";
    let r = royxat.filter(x => ochirilganlar ? x && x.__ochirilgan : !(x && x.__ochirilgan));
    for (const [k, v] of q){
      if (k === "ochirilgan") continue;
      if (k === "q"){
        const s = v.toLowerCase();
        r = r.filter(x => JSON.stringify(x).toLowerCase().includes(s));
      } else r = r.filter(x => x && String(x[k]) === v);
    }
    return jsonJavob(res, 200, faqatId ? r.map(x => ({id: x.id})) : r.map(x => yozuvToza(kol, x)));
  }
  if (req.method === "GET" && id){
    const x = royxat.find(y => y && String(y.id) === id && !y.__ochirilgan);
    return x ? jsonJavob(res, 200, yozuvToza(kol, x)) : jsonJavob(res, 404, {xato: "topilmadi"});
  }

  if (req.method === "POST" && id && amal === "tiklash"){
    const iz = OCHIRISH_IZI.get(o.manba + "|" + kol + "|" + id);
    const ozi = !!iz && iz.login === String(sessiya.login || "").toLowerCase() && Date.now() - iz.vaqt <= TIKLASH_MUDDATI;
    if (sessiya.rol !== "Administrator" && !ozi)
      return jsonJavob(res, 403, {xato: "Yozuvni administrator yoki uni 10 daqiqa ichida o'chirgan xodim qaytaradi"});
    const x = royxat.find(y => y && String(y.id) === id && y.__ochirilgan);
    if (!x) return jsonJavob(res, 404, {xato: "o'chirilgan yozuv topilmadi"});
    OCHIRISH_IZI.delete(o.manba + "|" + kol + "|" + id);
    delete x.__ochirilgan; delete x.ochirilganSana; delete x.ochirgan;
    const p = o.ozg[kol] && o.ozg[kol][id];
    if (p){ delete p.__ochirilgan; delete p.ochirilganSana; delete p.ochirgan;
            if (!p.__yangi && !Object.keys(p).length) delete o.ozg[kol][id]; omborSaqla(o); }
    amalYoz(o, sessiya, kol, id, "tiklash");
    return jsonJavob(res, 200, yozuvToza(kol, x));
  }

  if (req.method === "POST" && !id){
    const t = oldTana !== undefined ? oldTana : await tanaOqi(req);
    if (!oddiyObyektmi(t)) return jsonJavob(res, 400, {xato: "yozuv obyekt bo'lishi kerak"});
    const parol = kol === "FOYDLAR" ? t.parol : undefined;
    delete t.parol;
    const xato = tekshir(kol, t, o.D, true);
    if (xato) return jsonJavob(res, 400, {xato});
    if (!t.id) t.id = yangiId(kol);
    t.id = String(t.id);
    if (royxat.some(y => y && String(y.id) === t.id)) return jsonJavob(res, 409, {xato: "bu id band"});
    /* Qaror so'rovi muallifi sessiyadan yoziladi: to'rt ko'z tekshiruvi shunga tayanadi */
    if (kol === "TASDIQLAR"){
      t.muallifLogin = sessiya.login || null;
      if (!t.muallif) t.muallif = sessiya.ism;
      if (t.holat && t.holat !== "kutilmoqda") return jsonJavob(res, 400, {xato: "yangi so'rov faqat kutilmoqda holatida yaratiladi"});
    }
    if (MUALLIFLI.has(kol)) t.muallifLogin = tizimYozuvimi(req) ? null : (sessiya.login || null);
    if (kol === "ARXIV"){
      const xc = chiqimXatosi(o, sessiya, t.obyektId || t.id);
      if (xc) return jsonJavob(res, 403, {xato: xc});
    }
    if (!filialRuxsatmi(o, sessiya, kol, t)) return jsonJavob(res, 403, {xato: "boshqa filial obyekti"});
    if (kol === "FOYDLAR" && t.login){
      if (royxat.some(y => String(y.login || "").toLowerCase() === String(t.login).toLowerCase()))
        return jsonJavob(res, 409, {xato: "bu login band"});
      if (parol){
        if (String(parol).length < 8) return jsonJavob(res, 400, {xato: "Parol kamida 8 belgidan iborat bo'lsin"});
        parolOrnat(o, String(t.login).toLowerCase(), parol);
      }
    }
    royxat.push(t);
    ozgarishYoz(o, kol, t.id, t, true);
    if (!tizimYozuvimi(req)) amalYoz(o, sessiya, kol, t.id, "yaratish");
    if (o.D.nazoratKeshTozala) o.D.nazoratKeshTozala();
    return jsonJavob(res, 201, yozuvToza(kol, t));
  }

  if (req.method === "PATCH" && id){
    const x = royxat.find(y => y && String(y.id) === id && !y.__ochirilgan);
    if (!x) return jsonJavob(res, 404, {xato: "topilmadi"});
    const t = oldTana !== undefined ? oldTana : await tanaOqi(req);
    if (!oddiyObyektmi(t)) return jsonJavob(res, 400, {xato: "o'zgarish obyekt bo'lishi kerak"});
    delete t.id;
    const parol = kol === "FOYDLAR" ? t.parol : undefined;
    delete t.parol;
    const xato = tekshir(kol, t, o.D, false);
    if (xato) return jsonJavob(res, 400, {xato});
    if (kol === "TASDIQLAR"){
      const x4 = tortKozXatosi(x, t, sessiya);
      if (x4) return jsonJavob(res, 403, {xato: x4});
    }
    if (MUALLIFLI.has(kol) && "muallifLogin" in t && kichikMatn(t.muallifLogin) !== kichikMatn(x.muallifLogin))
      return jsonJavob(res, 403, {xato: "yozuv muallifi o'zgartirilmaydi"});
    if (kol === "KIRISH_SOROVLARI"){
      const xk = kirishSorovXatosi(x, t, sessiya);
      if (xk) return jsonJavob(res, 403, {xato: xk});
    }
    if (kol === "YOZUVLAR" && t.holat === "Chiqarildi" && x.holat !== "Chiqarildi"){
      const xc = chiqimXatosi(o, sessiya, x.id);
      if (xc) return jsonJavob(res, 403, {xato: xc});
    }
    /* filial tekshiruvi: joriy yozuv ham, o'zgargandan keyingi holat ham o'z filialida bo'lsin */
    if (!filialRuxsatmi(o, sessiya, kol, x, Object.assign({}, x, t)))
      return jsonJavob(res, 403, {xato: "boshqa filial obyekti"});
    if (parol){
      if (String(parol).length < 8) return jsonJavob(res, 400, {xato: "Parol kamida 8 belgidan iborat bo'lsin"});
      parolOrnat(o, String(x.login || "").toLowerCase(), parol);
    }
    const ozg = farq(x, t);
    /* Hech narsa o'zgarmagan PATCH saqlanmaydi va jurnalga yozilmaydi */
    if (!Object.keys(ozg).length){
      if (parol) amalYoz(o, sessiya, kol, id, "parol o'rnatildi");
      return jsonJavob(res, 200, yozuvToza(kol, x));
    }
    birlashtir(x, t);
    ozgarishYoz(o, kol, id, t, false);
    if (!tizimYozuvimi(req)) amalYoz(o, sessiya, kol, id, "yangilash", ozg);
    if (o.D.nazoratKeshTozala) o.D.nazoratKeshTozala();
    return jsonJavob(res, 200, yozuvToza(kol, x));
  }

  if (req.method === "DELETE" && id){
    const x = royxat.find(y => y && String(y.id) === id && !y.__ochirilgan);
    if (!x) return jsonJavob(res, 404, {xato: "topilmadi"});
    if (!filialRuxsatmi(o, sessiya, kol, x)) return jsonJavob(res, 403, {xato: "boshqa filial obyekti"});
    if (kol === "FOYDLAR" && String(x.id) === String(sessiya.id))
      return jsonJavob(res, 400, {xato: "o'z hisobingizni o'chira olmaysiz"});
    if (kol === "MENING_VAZIFALARIM"){
      const xv = vazifaOchirishXatosi(x, sessiya);
      if (xv) return jsonJavob(res, 403, {xato: xv});
    }
    const belgi = {__ochirilgan: true, ochirilganSana: vaqtMatn(new Date()), ochirgan: sessiya.ism};
    Object.assign(x, belgi);
    o.ozg[kol] = o.ozg[kol] || {};
    o.ozg[kol][id] = Object.assign(o.ozg[kol][id] || {}, belgi);
    omborSaqla(o);
    if (kol === "FOYDLAR") for (const [t2, s2] of SESSIYALAR) if (s2.manba === o.manba && s2.id === x.id){ SESSIYALAR.delete(t2); FAOLLIK.delete(t2); }
    OCHIRISH_IZI.set(o.manba + "|" + kol + "|" + id, {login: String(sessiya.login || "").toLowerCase(), vaqt: Date.now()});
    amalYoz(o, sessiya, kol, id, "o'chirish");
    if (o.D.nazoratKeshTozala) o.D.nazoratKeshTozala();
    return jsonJavob(res, 200, {id, ochirildi: true});
  }
  return jsonJavob(res, 405, {xato: "usul qo'llanmaydi"});
}

/* ---------- Server ---------- */
function ishlovchi(req, res){
  const yol = new URL(req.url, "http://x").pathname;
  if (yol.startsWith("/api/")){
    api(req, res, yol).catch(e => { if (!res.headersSent) jsonJavob(res, 400, {xato: String(e.message || e)}); });
  } else statika(req, res);
}
const server = http.createServer(ishlovchi);

if (require.main === module){
  const urug = urugla();
  for (const m of ["shartli", "mahalliy"])
    if (OMBORLAR[m] && OMBORLAR[m].qayta) console.log("Ma'lumot modeli yangilangan: " + m + " ombori qayta urug'landi.");
  server.listen(PORT, HOST, () => {
    console.log("Obyektlar nazorati server: http://" + (HOST.includes(":") ? "[" + HOST + "]" : HOST) + ":" + PORT +
      "  (" + urug + " to'plam, omborlar: " + Object.keys(OMBORLAR).join(", ") + ")");
    if (PAROL_YARATILDI)
      console.log("Boshlang'ich parol (shu ishga tushish uchun): " + KIRISH_PAROL);
    console.log("Eslatma: shaxsga doir ma'lumotlar O'zbekiston hududidagi serverda saqlanishi shart (O'RQ-547).");
  });
  /* localhost ba'zi tizimlarda ::1 ga ochiladi: standart holatda IPv6 loopback ham tinglanadi */
  if (!process.env.MKB_HOST){
    const s6 = http.createServer(ishlovchi);
    s6.on("error", () => {});
    s6.listen(PORT, "::1");
  }
}
module.exports = {server, snapshotOqi, urugla, omborOl, KOLLEKSIYALAR, ROL_BOLIMLAR};
