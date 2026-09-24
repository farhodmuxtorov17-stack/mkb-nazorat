/* ============================================================
   MKBapi — ma'lumot xizmati (bitta kirish nuqtasi, ikki rejim)
   1) "server"   — lokal REST (server/server.js, port 8790)
   2) "snapshot" — malumot*.js + brauzer xotirasidagi o'zgarishlar qatlami
   Ma'lumot manbai (MKB_DATA.MANBA): "shartli" namoyish yoki "mahalliy" haqiqiy reyestr.
   Har bir manbaning o'zgarishlari, jurnali va fayllari alohida saqlanadi.
   Sahifalar to'g'ridan-to'g'ri fetch chaqirmaydi — faqat MKBapi.
   ============================================================ */
window.MKBapi = (function(){
  const D0 = window.MKB_DATA || {};
  /* Ma'lumot fayllarisiz ochiladigan sahifalar (index, xato-*): manba sessiyadan olinadi va sessiya o'chirilmaydi */
  const MALUMOTSIZ = !D0.MANBA;
  const MANBA = (function(){
    if (!MALUMOTSIZ) return D0.MANBA === "mahalliy" ? "mahalliy" : "shartli";
    try{ const s = JSON.parse(localStorage.getItem("mkb4-sessiya") || "null"); if (s && s.manba === "mahalliy") return "mahalliy"; }catch(_){ }
    return "shartli";
  })();
  const QOSHIMCHA = MANBA === "mahalliy" ? "-mahalliy" : "";
  /* Brauzer xotirasi kaliti: manba qo'shimchasi bilan (namoyish yozuvi haqiqiy rejimga o'tmaydi) */
  function kalit(nom){ return nom + QOSHIMCHA; }

  const OMBOR_KALIT = kalit("mkb4-ozgarishlar");   /* {kolleksiya:{id:{...patch}|{__yangi:obyekt}|{__ochirilgan}}} */
  const AMAL_KALIT = kalit("mkb4-amallar");
  const SESSIYA_KALIT = "mkb4-sessiya";            /* bitta xodim — bitta sessiya; manba sessiya ichida */
  const FAYL_BAZA = kalit("mkb4-fayllar");
  const SESSIYA_MUDDATI = 8 * 3600 * 1000;          /* mutlaq chegara */
  /* Oxirgi harakat vaqti (ms): barcha oynalar uchun umumiy, harakatsizlik muddati PARAMETRLAR.sessiyaKutishDaq */
  const FAOLLIK_KALIT = "mkb4-faollik";
  const SABAB_KALIT = "mkb4-sessiya-sabab";
  /* Muallif o'z o'chirgan yozuvini shu muddat ichida qaytara oladi */
  const TIKLASH_MUDDATI = 10 * 60 * 1000;
  const FAYL_MAX = 20 * 1024 * 1024;
  /* Namoyish rejimidagi kirish paroli. Haqiqiy kirish server rejimida (server/server.js). */
  const NAMOYISH_PAROL = "mkb-namoyish";
  const TAXALLUS = {POLISLAR: "SUGURTALAR", SOTUV: "LOTLAR", VAZIFALAR: "MENING_VAZIFALARIM"};
  const FAYL_TURLARI = /^(image\/(jpeg|png|webp|gif)|application\/pdf|application\/msword|application\/vnd\.(ms-excel|openxmlformats-officedocument\.[a-z.]+)|text\/(plain|csv))$/;

  let rejim = "snapshot";
  let tayyorHal;
  const tayyor = new Promise(r => { tayyorHal = r; });

  function kanon(k){ const K = String(k || ""); return TAXALLUS[K.toUpperCase()] || K; }
  function oddiyObyektmi(v){ return v && typeof v === "object" && !Array.isArray(v); }
  /* Ichki obyektlar (balans, qiymat, huquq...) bir daraja chuqur birlashtiriladi, massivlar almashtiriladi */
  function birlashtir(asl, patch){
    Object.keys(patch).forEach(k => {
      const v = patch[k];
      if (oddiyObyektmi(v) && oddiyObyektmi(asl[k])) asl[k] = Object.assign({}, asl[k], v);
      else asl[k] = v;
    });
    return asl;
  }
  function ikki(n){ return String(n).padStart(2, "0"); }
  function vaqtMatn(d){
    return ikki(d.getDate()) + "." + ikki(d.getMonth() + 1) + "." + d.getFullYear() + " " + ikki(d.getHours()) + ":" + ikki(d.getMinutes());
  }
  let sanagich = 0;
  function noyobId(prefiks){
    sanagich = (sanagich + 1) % 1e6;
    const t = new Uint8Array(3);
    try{ crypto.getRandomValues(t); }catch(_){ t[0] = Math.random() * 256; t[1] = Math.random() * 256; }
    return prefiks + "-" + Date.now().toString(36).toUpperCase() + sanagich.toString(36).toUpperCase() +
      Array.from(t, b => b.toString(16).padStart(2, "0")).join("").toUpperCase();
  }
  function hosilalarniYangila(){
    const D = window.MKB_DATA || {};
    if (D.nazoratKeshTozala) D.nazoratKeshTozala();
    if (D.portfelHisobla) try{ D.PORTFEL = D.portfelHisobla(); }catch(_){ }
  }

  /* ---------- Xotiradagi MKB_DATA ga qo'llash ----------
     Saqlangan o'zgarishlar xotiradagi MKB_DATA ga ham qo'llanadi: ma'lumotni to'g'ridan-to'g'ri
     o'qiydigan sahifalar va hosilaviy ko'rsatkichlar (nazorat indeksi) ularni ko'radi. */
  const OCHIRILGANLAR = {};   /* kolleksiya -> {id: yozuv} — shu sessiyada tiklash uchun */
  function xotiradaQolla(kolleksiya, id, p){
    const D = window.MKB_DATA || {};
    const asl = D[kolleksiya];
    if (!Array.isArray(asl)) return;
    const i = asl.findIndex(x => x && x.id === id);
    if (p.__ochirilgan){
      if (i >= 0){ (OCHIRILGANLAR[kolleksiya] = OCHIRILGANLAR[kolleksiya] || {})[id] = asl[i]; asl.splice(i, 1); }
      return;
    }
    if (p.__yangi){
      if (i < 0) asl.push(Object.assign({}, p.__yangi));
      else birlashtir(asl[i], p.__yangi);
    } else if (i >= 0){
      birlashtir(asl[i], p);
    }
    /* obyekt indeksi (D.obyekt, D.obyektNomi) yangi va o'zgargan aktivlarni ham ko'rsin */
    if (kolleksiya === "YOZUVLAR" && D.reyestrgaQosh){
      const y = asl.find(x => x && x.id === id);
      if (y) try{ D.reyestrgaQosh(y, "balans"); }catch(_){ }
    }
  }

  /* ---------- Snapshot ustqatlami ---------- */
  function ustqatlam(){
    try{ return JSON.parse(localStorage.getItem(OMBOR_KALIT) || "{}"); }
    catch(_){ return {}; }
  }
  function ustqatlamSaqla(u){
    try{ localStorage.setItem(OMBOR_KALIT, JSON.stringify(u)); }
    catch(_){ throw new Error("Brauzer xotirasi to'lgan: o'zgarish saqlanmadi"); }
  }
  (function ustqatlamniQolla(){
    const u = ustqatlam();
    Object.keys(u).forEach(k => Object.keys(u[k]).forEach(id => {
      const p = u[k][id];
      if (p.__yangi) xotiradaQolla(k, id, {__yangi: p.__yangi});
      else { const m = Object.assign({}, p); ["__ochirilgan", "ochirilganSana", "ochirgan", "ochirganLogin", "ochirilganMs"].forEach(x => delete m[x]);
             if (Object.keys(m).length) xotiradaQolla(k, id, m); }
      if (p.__ochirilgan) xotiradaQolla(k, id, {__ochirilgan: true});
    }));
    if (Object.keys(u).length) hosilalarniYangila();
  })();

  function xomRoyxat(kolleksiya){
    const D = window.MKB_DATA || {};
    const u = (ustqatlam()[kolleksiya]) || {};
    return (Array.isArray(D[kolleksiya]) ? D[kolleksiya] : []).filter(x => !(x && u[x.id] && u[x.id].__ochirilgan));
  }

  /* ---------- To'rt ko'z va muallif qoidalari (server/server.js bilan bir xil; namoyish rejimida shu yerda) ---------- */
  const MUALLIFLI = ["XARAJATLAR", "KIRISH_SOROVLARI", "MENING_VAZIFALARIM"];
  const kichik = x => String(x == null ? "" : x).trim().toLowerCase();
  function chiqimXatosi(obyektId, s){
    const t = xomRoyxat("TASDIQLAR").find(r => r && r.tur === "chiqim" && ["kutilmoqda", "tasdiqlangan"].indexOf(r.holat) >= 0 &&
      (String(r.obyektId) === String(obyektId) || String(r.manbaId) === String(obyektId)));
    if (!t) return "Balansdan chiqarish qaror so'rovi orqali bajariladi: so'rov yuboring, uni boshqa xodim tasdiqlaydi";
    const ozi = t.muallifLogin ? kichik(t.muallifLogin) === kichik(s && s.login) : (!!t.muallif && !!s && t.muallif === s.ism);
    return ozi ? "O'z so'rovingizni o'zingiz tasdiqlay olmaysiz" : null;
  }
  function qoidaXatosi(k, joriy, patch, s){
    if (MUALLIFLI.indexOf(k) >= 0 && "muallifLogin" in patch && kichik(patch.muallifLogin) !== kichik(joriy.muallifLogin)) return "yozuv muallifi o'zgartirilmaydi";
    if (k === "KIRISH_SOROVLARI" && "holat" in patch && patch.holat !== joriy.holat && ["tasdiqlangan", "rad etilgan"].indexOf(patch.holat) >= 0){
      const ozi = joriy.muallifLogin ? kichik(joriy.muallifLogin) === kichik(s && s.login) : (!!joriy.sorovchi && !!s && joriy.sorovchi === s.ism);
      if (ozi) return "O'z so'rovingizni o'zingiz tasdiqlay olmaysiz";
    }
    if (k === "YOZUVLAR" && patch.holat === "Chiqarildi" && joriy.holat !== "Chiqarildi") return chiqimXatosi(joriy.id, s);
    return null;
  }

  /* ---------- Maydonlar tekshiruvi (server bilan bir xil qoidalar) ---------- */
  function maydonlar(kolleksiya){
    const D = window.MKB_DATA || {};
    if (D.SXEMA && D.SXEMA[kolleksiya]) return new Set(D.SXEMA[kolleksiya].concat(["id", "izoh"]));
    const r = Array.isArray(D[kolleksiya]) ? D[kolleksiya] : [];
    if (!r.length) return null;
    const s = new Set(["id", "izoh"]);
    r.forEach(x => { if (oddiyObyektmi(x)) Object.keys(x).forEach(k => s.add(k)); });
    Object.keys((D.QOSHIMCHA_MAYDONLAR || {})[kolleksiya] || {}).forEach(k => s.add(k));
    return s;
  }
  function tekshir(kolleksiya, t, yangimi){
    const D = window.MKB_DATA || {};
    const s = maydonlar(kolleksiya);
    for (const m of Object.keys(t)){
      if (m.startsWith("__")) return "ichki maydon yozilmaydi: " + m;
      if (s && !s.has(m) && !(kolleksiya === "FOYDLAR" && m === "parol")) return "noma'lum maydon: " + m;
      if (typeof t[m] === "number" && !Number.isFinite(t[m])) return "son noto'g'ri: " + m;
      const qt = ((D.QOSHIMCHA_MAYDONLAR || {})[kolleksiya] || {})[m];
      if (qt && t[m] != null && (Array.isArray(t[m]) ? "array" : typeof t[m]) !== qt) return "maydon turi noto'g'ri: " + m;
      if (typeof t[m] === "string" && /^(sana|boshlanish|tugash)$|Sana$/.test(m) && t[m].trim() && D.sanaOqi && !D.sanaOqi(t[m]))
        return "sana noto'g'ri: " + m;
    }
    if (JSON.stringify(t).includes("assets/obyekt/")) return "eskirgan rasm yo'li";
    if (kolleksiya === "YOZUVLAR"){
      if (t.holat != null && D.HOLATLAR && !D.HOLATLAR.some(h => h.nom === t.holat)) return "holat noto'g'ri";
      if (t.bosqich != null && D.BOSQICHLAR && !D.BOSQICHLAR.some(b => b.kalit === t.bosqich)) return "bosqich noto'g'ri";
      if (t.balans !== undefined){
        if (!oddiyObyektmi(t.balans)) return "balans obyekt bo'lishi kerak";
        const q = t.balans.qiymat;
        if (q !== undefined && !(typeof q === "number" && Number.isFinite(q) && q > 0)) return "balans qiymati noto'g'ri";
        if (t.balans.sana !== undefined && D.sanaOqi && !D.sanaOqi(t.balans.sana)) return "balans sanasi noto'g'ri";
      }
      if (yangimi){
        if (!String(t.nom || "").trim()) return "obyekt nomi kiritilmagan";
        if (!t.balans || !t.balans.qiymat || !t.balans.sana) return "balans sanasi va qiymati kiritilmagan";
      }
    }
    return null;
  }

  /* ---------- Server so'rovi ---------- */
  function kirishgaQayt(){
    try{ sessionStorage.setItem(SABAB_KALIT, "muddat"); }catch(_){ }
    const joy = String(location.pathname.split("/").pop() || "") + location.search;
    location.href = "kirish.html?sabab=muddat" + (/\.html/.test(joy) ? "&qaytish=" + encodeURIComponent(joy) : "");
  }
  async function sorov(yol, usul, tana, sarlavha){
    const s = sessiya();
    const xom = tana instanceof Blob;
    const r = await fetch("/api/" + yol, {
      method: usul || "GET",
      credentials: "same-origin",
      headers: Object.assign(xom ? {} : {"Content-Type": "application/json"},
        s && s.token ? {"X-Sessiya": s.token} : {}, sarlavha || {}),
      body: tana == null ? undefined : (xom ? tana : JSON.stringify(tana)),
    });
    if (r.status === 401 && yol !== "kirish"){ chiqish(true); kirishgaQayt(); throw new Error("Sessiya muddati tugadi"); }
    if (!r.ok){
      let xabar = "Server xatosi: " + r.status;
      try{ const j = await r.json(); if (j && j.xato) xabar = j.xato; }catch(_){ }
      const e = new Error(xabar); e.status = r.status; throw e;
    }
    return r;
  }
  async function sorovJson(yol, usul, tana, sarlavha){ return (await sorov(yol, usul, tana, sarlavha)).json(); }
  /* Qoidalar dvigateli kabi avtomatik yozuvlar: har bir yozuv jurnalga alohida tushmaydi (tizimQayd bitta jamlama yozadi) */
  const TIZIM_SARLAVHA = {"X-Tizim": "1"};
  /* Faqat avtomatik to'plamlar (server bilan bir xil): foydalanuvchi amali jurnaldan yashirilmaydi */
  const TIZIM_KOLLEKSIYALAR = ["BILDIRISHLAR", "MENING_VAZIFALARIM", "ZAXIRA_TARIX", "MB_HISOBOTLAR"];
  const tizimmi = (k, opts) => !!(opts && opts.tizim) && TIZIM_KOLLEKSIYALAR.indexOf(k) >= 0;

  /* ---------- Rejimni aniqlash ---------- */
  (async function aniqla(){
    try{
      const nazorat = new AbortController();
      const t = setTimeout(() => nazorat.abort(), 700);
      const j = await fetch("/api/salomat", {signal: nazorat.signal}).then(x => x.json());
      clearTimeout(t);
      if (j && j.holat === "ok" && (!j.manbalar || j.manbalar.includes(MANBA))) rejim = "server";
    }catch(_){ rejim = "snapshot"; }
    if (rejim === "server"){
      const s = sessiya();
      /* boshqa manba yoki snapshot rejimida ochilgan sessiya server uchun yaroqsiz */
      if (s && (s.manba !== MANBA || s.rejim !== "server")){ if (!MALUMOTSIZ) localStorage.removeItem(SESSIYA_KALIT); }
      else if (s && !MALUMOTSIZ) await serverdanSinxron();
    }
    tayyorHal(rejim);
    document.dispatchEvent(new CustomEvent("mkb:rejim", {detail: rejim}));
  })();

  /* Server omboridagi o'zgarishlar xotiradagi MKB_DATA ga qo'llanadi */
  async function serverdanSinxron(){
    try{
      const r = await fetch("/api/ozgarishlar", {headers: {"X-Sessiya": sessiya().token}, credentials: "same-origin"});
      if (r.status === 401){ localStorage.removeItem(SESSIYA_KALIT); return; }
      if (!r.ok) return;
      const u = await r.json();
      Object.keys(u).forEach(k => Object.keys(u[k]).forEach(id => {
        const p = u[k][id];
        const m = Object.assign({}, p); ["__ochirilgan", "ochirilganSana", "ochirgan", "ochirganLogin", "ochirilganMs"].forEach(x => delete m[x]);
        if (p.__yangi) xotiradaQolla(k, id, {__yangi: p.__yangi});
        else if (Object.keys(m).length) xotiradaQolla(k, id, m);
        if (p.__ochirilgan) xotiradaQolla(k, id, {__ochirilgan: true});
      }));
      hosilalarniYangila();
    }catch(_){ }
  }

  /* ---------- Ochiq metodlar ---------- */
  async function royxat(kolleksiya, filtr){
    await tayyor;
    if (String(kolleksiya).toLowerCase() === "amallar") return rejim === "server" ? sorovJson("amallar") : amallar();
    const k = kanon(kolleksiya);
    let natija;
    if (rejim === "server"){
      const q = filtr ? "?" + new URLSearchParams(Object.fromEntries(
        Object.entries(filtr).filter(([, v]) => v !== "" && v != null))) : "";
      natija = await sorovJson(k.toLowerCase() + (q === "?" ? "" : q));
    } else {
      natija = xomRoyxat(k);
      if (filtr) natija = natija.filter(x =>
        Object.entries(filtr).every(([f, v]) => v === "" || v == null || String(x[f]) === String(v)));
    }
    return natija;
  }

  async function bitta(kolleksiya, id){
    await tayyor;
    const k = kanon(kolleksiya);
    if (rejim === "server"){
      try{ return await sorovJson(k.toLowerCase() + "/" + encodeURIComponent(id)); }
      catch(e){ if (e.status === 404) return null; throw e; }
    }
    return xomRoyxat(k).find(x => x && x.id === id) || null;
  }

  /* opts.tizim — avtomatik yozuv, amallar jurnaliga alohida yozilmaydi */
  async function yangilash(kolleksiya, id, patch, opts){
    await tayyor;
    const k = kanon(kolleksiya);
    const tizim = tizimmi(k, opts);
    patch = Object.assign({}, patch);
    delete patch.id;
    const xato = tekshir(k, patch, false);
    if (xato) throw new Error(xato);
    if (rejim === "server"){
      if (!tizim) faollikBelgila();
      const j = await sorovJson(k.toLowerCase() + "/" + encodeURIComponent(id), "PATCH", patch, tizim ? TIZIM_SARLAVHA : null);
      const p = Object.assign({}, patch); delete p.parol;
      xotiradaQolla(k, id, p);
      hosilalarniYangila();
      return j;
    }
    const joriy = xomRoyxat(k).find(x => x && x.id === id);
    if (!joriy) throw new Error("Yozuv topilmadi: " + id);
    const qx = qoidaXatosi(k, joriy, patch, sessiya());
    if (qx) throw new Error(qx);
    const ozg = farq(joriy, patch);
    /* Hech narsa o'zgarmagan bo'lsa saqlanmaydi va jurnalga yozilmaydi */
    if (!Object.keys(ozg).length) return Object.assign({}, joriy);
    const u = ustqatlam();
    u[k] = u[k] || {};
    if (u[k][id] && u[k][id].__yangi) birlashtir(u[k][id].__yangi, patch);
    else u[k][id] = birlashtir(Object.assign({}, u[k][id]), patch);
    ustqatlamSaqla(u);
    xotiradaQolla(k, id, patch);
    hosilalarniYangila();
    if (!tizim){ amalYoz(k, id, "yangilash", ozg); faollikBelgila(); }
    return Object.assign({}, joriy);
  }

  async function yangi(kolleksiya, obyekt, opts){
    await tayyor;
    const k = kanon(kolleksiya);
    const tizim = tizimmi(k, opts);
    obyekt = Object.assign({}, obyekt);
    const xato = tekshir(k, obyekt, true);
    if (xato) throw new Error(xato);
    if (!tizim) faollikBelgila();
    if (rejim === "server"){
      const j = await sorovJson(k.toLowerCase(), "POST", obyekt, tizim ? TIZIM_SARLAVHA : null);
      xotiradaQolla(k, j.id, {__yangi: j});
      hosilalarniYangila();
      return j;
    }
    if (!obyekt.id) obyekt.id = noyobId(k.slice(0, 2));
    if (xomRoyxat(k).some(x => x && x.id === obyekt.id)) throw new Error("Bu id band: " + obyekt.id);
    if (MUALLIFLI.indexOf(k) >= 0){ const s = sessiya(); obyekt.muallifLogin = tizim ? null : (s && s.login) || null; }
    if (k === "ARXIV"){ const cx = chiqimXatosi(obyekt.obyektId || obyekt.id, sessiya()); if (cx) throw new Error(cx); }
    delete obyekt.parol;
    const u = ustqatlam();
    u[k] = u[k] || {};
    u[k][obyekt.id] = {__yangi: obyekt};
    ustqatlamSaqla(u);
    xotiradaQolla(k, obyekt.id, {__yangi: obyekt});
    hosilalarniYangila();
    if (!tizim) amalYoz(k, obyekt.id, "yaratish", null);
    return obyekt;
  }

  /* Yumshoq o'chirish: yozuv yo'qolmaydi, ro'yxatlarda ko'rinmaydi, jurnalga yoziladi */
  async function ochir(kolleksiya, id){
    await tayyor;
    const k = kanon(kolleksiya);
    if (rejim === "server"){
      const j = await sorovJson(k.toLowerCase() + "/" + encodeURIComponent(id), "DELETE");
      xotiradaQolla(k, id, {__ochirilgan: true});
      hosilalarniYangila();
      return j;
    }
    const joriyYozuv = xomRoyxat(k).find(x => x && x.id === id);
    if (!joriyYozuv) throw new Error("Yozuv topilmadi: " + id);
    const s = sessiya();
    if (k === "MENING_VAZIFALARIM" && joriyYozuv.muallifLogin && !(s && s.rol === "Administrator") && kichik(joriyYozuv.muallifLogin) !== kichik(s && s.login))
      throw new Error("Boshqa xodim bergan vazifani o'chira olmaysiz. Bajarildi deb belgilang");
    const u = ustqatlam();
    u[k] = u[k] || {};
    u[k][id] = Object.assign(u[k][id] || {}, {__ochirilgan: true, ochirilganSana: vaqtMatn(new Date()), ochirgan: s ? s.ism : "-",
      ochirganLogin: s ? s.login : null, ochirilganMs: Date.now()});
    ustqatlamSaqla(u);
    xotiradaQolla(k, id, {__ochirilgan: true});
    hosilalarniYangila();
    amalYoz(k, id, "o'chirish", null);
    return {id, ochirildi: true};
  }

  /* O'chirilgan yozuvni qaytarish: administrator yoki 10 daqiqa ichida o'chirgan xodimning o'zi (serverda ham shu qoida) */
  async function tiklash(kolleksiya, id){
    await tayyor;
    const k = kanon(kolleksiya);
    if (rejim === "server"){
      const j = await sorovJson(k.toLowerCase() + "/" + encodeURIComponent(id) + "/tiklash", "POST");
      const D = window.MKB_DATA || {};
      if (Array.isArray(D[k]) && !D[k].some(x => x && x.id === id)) D[k].push(j);
      hosilalarniYangila();
      return j;
    }
    const u = ustqatlam();
    const p = u[k] && u[k][id];
    if (!p || !p.__ochirilgan) throw new Error("O'chirilgan yozuv topilmadi: " + id);
    const s = sessiya();
    const admin = !!s && s.rol === "Administrator";
    const ozi = !!s && !!p.ochirganLogin && p.ochirganLogin === s.login && Date.now() - Number(p.ochirilganMs || 0) <= TIKLASH_MUDDATI;
    if (!admin && !ozi) throw new Error("Yozuvni administrator yoki uni 10 daqiqa ichida o'chirgan xodim qaytaradi");
    ["__ochirilgan", "ochirilganSana", "ochirgan", "ochirganLogin", "ochirilganMs"].forEach(x => delete p[x]);
    if (!p.__yangi && !Object.keys(p).length) delete u[k][id];
    ustqatlamSaqla(u);
    const D = window.MKB_DATA || {};
    const saqlangan = (OCHIRILGANLAR[k] || {})[id] || (p.__yangi ? Object.assign({}, p.__yangi) : null);
    if (saqlangan && Array.isArray(D[k]) && !D[k].some(x => x && x.id === id)) D[k].push(saqlangan);
    hosilalarniYangila();
    amalYoz(k, id, "tiklash", null);
    return saqlangan;
  }

  /* ---------- Fayllar (surat va hujjatlar) ----------
     Snapshot rejimida fayl brauzerning IndexedDB bazasida (manba bo'yicha alohida) saqlanadi,
     server rejimida server/malumotlar/<manba>/fayllar/ ga yoziladi. Metama'lumot FAYLLAR to'plamida. */
  function bazaOch(){
    return new Promise((hal, rad) => {
      if (!window.indexedDB){ rad(new Error("Brauzer fayl saqlashni qo'llamaydi")); return; }
      const r = indexedDB.open(FAYL_BAZA, 1);
      r.onupgradeneeded = () => { r.result.createObjectStore("fayllar", {keyPath: "id"}); };
      r.onsuccess = () => hal(r.result);
      r.onerror = () => rad(r.error || new Error("Fayl bazasi ochilmadi"));
    });
  }
  async function bazaAmal(usul, qiymat){
    const db = await bazaOch();
    return new Promise((hal, rad) => {
      const tx = db.transaction("fayllar", usul === "get" ? "readonly" : "readwrite");
      const st = tx.objectStore("fayllar");
      const r = usul === "put" ? st.put(qiymat) : usul === "delete" ? st.delete(qiymat) : st.get(qiymat);
      tx.oncomplete = () => { db.close(); hal(r.result); };
      tx.onerror = tx.onabort = () => { db.close();
        const e = tx.error || r.error;
        rad(new Error(e && e.name === "QuotaExceededError" ? "Brauzer xotirasi to'lgan: fayl saqlanmadi" : "Fayl saqlanmadi")); };
    });
  }
  function faylTekshir(fayl){
    if (!(fayl instanceof Blob)) throw new Error("Fayl tanlanmagan");
    if (!fayl.size) throw new Error("Fayl bo'sh");
    if (fayl.size > FAYL_MAX) throw new Error("Fayl 20 MB dan katta");
    const tur = (fayl.type || "").toLowerCase();
    if (!FAYL_TURLARI.test(tur)) throw new Error("Bu fayl turi qabul qilinmaydi. Surat, PDF, Word yoki Excel yuklang.");
    return tur;
  }
  const fayl = {
    MAX_HAJM: FAYL_MAX,
    /* meta: {obyektId, kolleksiya, yozuvId}; opts.jarayon(foiz) — yuklash jarayoni (0–100); natija — FAYLLAR yozuvi */
    async saqla(f, meta, opts){
      await tayyor;
      const tur = faylTekshir(f);
      meta = meta || {};
      const jarayon = opts && typeof opts.jarayon === "function" ? opts.jarayon : null;
      const xabar = foiz => { if (jarayon) try{ jarayon(Math.max(0, Math.min(100, Math.round(foiz)))); }catch(_){ } };
      faollikBelgila();
      const nom = String(f.name || meta.nom || "fayl").replace(/[\\/:*?"<>|\r\n]/g, "_").slice(0, 180);
      if (rejim === "server"){
        const sar = {"Content-Type": tur, "X-Fayl-Nom": encodeURIComponent(nom)};
        if (meta.obyektId) sar["X-ObyektId"] = encodeURIComponent(meta.obyektId);
        if (meta.kolleksiya) sar["X-Kolleksiya"] = encodeURIComponent(meta.kolleksiya);
        if (meta.yozuvId) sar["X-YozuvId"] = encodeURIComponent(meta.yozuvId);
        const j = jarayon ? await xhrYukla("fayllar/yukla", f, sar, xabar) : await (await sorov("fayllar/yukla", "POST", f, sar)).json();
        xotiradaQolla("FAYLLAR", j.id, {__yangi: j});
        xabar(100);
        return j;
      }
      const id = noyobId("FL");
      await bazaAmal("put", {id, blob: f, nom, tur, hajm: f.size});
      xabar(100);
      const s = sessiya();
      const yozuv = {id, obyektId: meta.obyektId || null, kolleksiya: meta.kolleksiya || null, yozuvId: meta.yozuvId || null,
        nom, tur, hajm: f.size, yuklangan: vaqtMatn(new Date()), yuklagan: s ? s.ism : "-", yol: "fayllar/" + id};
      try{ await yangi("FAYLLAR", yozuv); }
      catch(e){ await bazaAmal("delete", id).catch(() => {}); throw e; }
      return yozuv;
    },
    /* Faylning o'zi (Blob). Namoyish yozuvlarida fayl yo'q — null qaytadi. */
    async ol(id){
      await tayyor;
      if (rejim === "server"){
        try{ return await (await sorov("fayllar/" + encodeURIComponent(id) + "/xom")).blob(); }
        catch(e){ if (e.status === 404) return null; throw e; }
      }
      try{ const x = await bazaAmal("get", id); return x ? x.blob : null; }
      catch(_){ return null; }
    },
    /* <img src> yoki havola uchun manzil. Fayl bo'lmasa null. */
    async url(id){
      await tayyor;
      if (rejim === "server"){
        const y = (window.MKB_DATA && (MKB_DATA.FAYLLAR || []).find(x => x.id === id)) || await bitta("FAYLLAR", id);
        return y && y.yol ? y.yol : null;
      }
      const b = await fayl.ol(id);
      return b ? URL.createObjectURL(b) : null;
    },
    /* Brauzerda haqiqiy faylni yuklab olish. Fayl bo'lmasa false qaytadi. */
    async yuklab(id){
      const b = await fayl.ol(id);
      if (!b) return false;
      const y = await bitta("FAYLLAR", id);
      const a = document.createElement("a");
      a.href = URL.createObjectURL(b);
      a.download = (y && y.nom) || id;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 4000);
      return true;
    },
    async ochir(id){ return ochir("FAYLLAR", id); },
    async royxat(filtr){ return royxat("FAYLLAR", filtr); },
  };

  /* Server rejimida yuklash jarayoni: fetch yuborish foizini bermaydi, shuning uchun XMLHttpRequest */
  function xhrYukla(yol, tana, sarlavha, xabar){
    return new Promise((hal, rad) => {
      const s = sessiya();
      const x = new XMLHttpRequest();
      x.open("POST", "/api/" + yol);
      x.withCredentials = true;
      Object.entries(Object.assign({}, s && s.token ? {"X-Sessiya": s.token} : {}, sarlavha || {})).forEach(([k, v]) => x.setRequestHeader(k, v));
      x.upload.onprogress = e => { if (e.lengthComputable) xabar(e.loaded / e.total * 99); };
      x.onerror = () => rad(new TypeError("Tarmoq xatosi: fayl yuborilmadi"));
      x.onload = () => {
        let j = null;
        try{ j = JSON.parse(x.responseText || "null"); }catch(_){ }
        if (x.status === 401){ chiqish(true); kirishgaQayt(); rad(new Error("Sessiya muddati tugadi")); return; }
        if (x.status < 200 || x.status >= 300){
          const e = new Error(j && j.xato ? j.xato : "Server xatosi: " + x.status); e.status = x.status; rad(e); return;
        }
        hal(j);
      };
      x.send(tana);
    });
  }

  /* ---------- Amallar jurnali ---------- */
  function farq(asl, patch){
    const r = {};
    Object.keys(patch).forEach(k => {
      if (k === "parol") { r[k] = {eski: null, yangi: "***"}; return; }
      const e = asl ? asl[k] : undefined;
      if (JSON.stringify(e) !== JSON.stringify(patch[k])) r[k] = {eski: e === undefined ? null : e, yangi: patch[k]};
    });
    return r;
  }
  function amalYoz(kolleksiya, id, turi, ozgarish, kim){
    const s = sessiya();
    const yozuv = {
      id: noyobId("AM"),
      vaqt: vaqtMatn(new Date()),
      kim: kim || (s ? s.ism : "Mehmon"),
      rol: kim ? kim : (s ? s.rol : "-"),
      kolleksiya, obyektId: id, turi,
      tafsilot: ozgarish ? Object.keys(ozgarish).join(", ") : "",
      ozgarish: ozgarish || null,
    };
    try{
      const j = JSON.parse(localStorage.getItem(AMAL_KALIT) || "[]");
      j.unshift(yozuv);
      localStorage.setItem(AMAL_KALIT, JSON.stringify(j.slice(0, 400)));
    }catch(_){ }
  }
  /* Avtomatik yozuvlar jamlamasi: jurnalga "Tizim" nomidan bitta yozuv.
     hisob: {TO'PLAM: yaratilgan yozuvlar soni}; hammasi 0 bo'lsa hech narsa yozilmaydi */
  async function tizimQayd(hisob){
    await tayyor;
    const ozg = {};
    Object.keys(hisob || {}).forEach(k => { const n = Number(hisob[k]); if (n > 0 && /^[A-Z_]+$/.test(k)) ozg[k] = {eski: null, yangi: n}; });
    if (!Object.keys(ozg).length) return false;
    if (rejim === "server"){
      try{ await sorovJson("amallar/tizim", "POST", {hisob: Object.fromEntries(Object.keys(ozg).map(k => [k, ozg[k].yangi]))}); return true; }
      catch(_){ return false; }
    }
    amalYoz("QOIDALAR", null, "yaratish", ozg, "Tizim");
    return true;
  }
  function amallar(){
    try{ return JSON.parse(localStorage.getItem(AMAL_KALIT) || "[]"); }
    catch(_){ return []; }
  }

  /* ---------- Sessiya ---------- */
  /* Harakatsizlik muddati (ms): PARAMETRLAR.sessiyaKutishDaq, standart 30 daqiqa */
  function kutishMs(){
    const D = window.MKB_DATA || {};
    const v = Number(D.param ? D.param("sessiyaKutishDaq") : NaN);
    return (Number.isFinite(v) && v > 0 ? v : 30) * 60000;
  }
  function faollik(){ try{ return Number(localStorage.getItem(FAOLLIK_KALIT)) || 0; }catch(_){ return 0; } }
  function faollikBelgila(){ try{ localStorage.setItem(FAOLLIK_KALIT, String(Date.now())); }catch(_){ } }
  function sessiya(){
    try{
      const s = JSON.parse(localStorage.getItem(SESSIYA_KALIT) || "null");
      if (!s) return null;
      if (s.tugash && Date.now() > s.tugash){ localStorage.removeItem(SESSIYA_KALIT); sababYoz(); return null; }
      /* sessiyadan oldingi (eski) harakat belgisi hisobga olinmaydi */
      const f = faollik(), boshlangan = s.tugash ? s.tugash - SESSIYA_MUDDATI - 60000 : 0;
      if (f && f >= boshlangan && Date.now() - f > kutishMs()){ localStorage.removeItem(SESSIYA_KALIT); sababYoz(); return null; }
      if (!f || f < boshlangan) faollikBelgila();
      return s;
    }catch(_){ return null; }
  }
  function sababYoz(){ try{ sessionStorage.setItem(SABAB_KALIT, "muddat"); }catch(_){ } }
  /* Sessiya muddat tufayli yopilganmi (bir marta o'qiladi) */
  function sessiyaSababi(){
    try{ const v = sessionStorage.getItem(SABAB_KALIT); sessionStorage.removeItem(SABAB_KALIT); return v; }catch(_){ return null; }
  }
  /* "Davom etish": harakat vaqti yangilanadi, server rejimida server sessiyasi ham */
  async function sessiyaUzaytir(){
    await tayyor;
    const s = sessiya();
    if (!s) throw new Error("Sessiya yopilgan. Qayta kiring");
    faollikBelgila();
    if (rejim === "server"){
      const j = await sorovJson("sessiya/uzaytir", "POST", {});
      return {tugash: s.tugash, kutishDaq: j && j.kutishDaq ? j.kutishDaq : kutishMs() / 60000};
    }
    return {tugash: s.tugash, kutishDaq: kutishMs() / 60000};
  }
  async function kirish(login, parol){
    await tayyor;
    login = String(login || "").trim();
    if (rejim === "server"){
      const j = await sorovJson("kirish", "POST", {login, parol, manba: MANBA});
      const s = Object.assign({}, j, {rejim: "server"});
      localStorage.setItem(SESSIYA_KALIT, JSON.stringify(s));
      faollikBelgila();
      await serverdanSinxron();
      return s;
    }
    /* Namoyish: login FOYDLAR da bo'lishi, hisob faol bo'lishi va namoyish paroli talab qilinadi.
       Rol tanlangan tugmadan emas, hisob yozuvidan olinadi. */
    const F = xomRoyxat("FOYDLAR");
    const f = F.find(x => String(x.login || "").toLowerCase() === login.toLowerCase());
    if (!f || f.faol === false || String(parol || "") !== NAMOYISH_PAROL){
      amalYoz("SESSIYA", login || "-", "kirish rad etildi", null);
      throw new Error("Login yoki parol noto'g'ri");
    }
    const s = {token: noyobId("S"), id: f.id, login: f.login, ism: f.nom || f.ism, rol: f.rol,
               filial: f.bolim || f.filial || "", filialKod: f.filialKod || null,
               manba: MANBA, rejim: "snapshot", tugash: Date.now() + SESSIYA_MUDDATI};
    localStorage.setItem(SESSIYA_KALIT, JSON.stringify(s));
    faollikBelgila();
    amalYoz("SESSIYA", s.ism, "kirish", null);
    return s;
  }
  function chiqish(faqatMahalliy){
    const s = sessiya();
    if (!faqatMahalliy && s && rejim === "server")
      fetch("/api/chiqish", {method: "POST", credentials: "same-origin", headers: {"X-Sessiya": s.token}}).catch(() => {});
    localStorage.removeItem(SESSIYA_KALIT);
  }
  /* O'z parolini almashtirish (server rejimi) */
  async function parolAlmashtir(eski, yangiParol){
    await tayyor;
    if (rejim !== "server") throw new Error("Namoyish rejimida parol almashtirilmaydi");
    return sorovJson("parol", "POST", {eski, yangi: yangiParol});
  }

  return {tayyor, rejim: () => rejim, manba: () => MANBA, kalit, NAMOYISH_PAROL,
          royxat, bitta, yangi, yangilash, ochir, tiklash, fayl,
          kirish, chiqish, sessiya, parolAlmashtir, amallar, tizimQayd,
          sessiyaUzaytir, sessiyaSababi, faollikBelgila, faollik, kutishMs, TIKLASH_MUDDATI};
})();
