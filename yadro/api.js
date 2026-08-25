/* ============================================================
   MKBapi — ma'lumot xizmati (bitta kirish nuqtasi, ikki rejim)
   1) "server"  — lokal REST (server/server.js, port 8790)
   2) "snapshot" — malumot.js + localStorage ustqatlami (Pages/demo)
   Sahifalar to'g'ridan-to'g'ri fetch chaqirmaydi — faqat MKBapi.
   ============================================================ */
window.MKBapi = (function(){
  const OMBOR_KALIT = "mkb4-ozgarishlar";      /* {kolleksiya:{id:{...patch}|{__yangi:obyekt}}} */
  const SESSIYA_KALIT = "mkb4-sessiya";        /* {token, rol, ism, filial} */
  let rejim = "snapshot";
  let tayyorHal;
  const tayyor = new Promise(r => { tayyorHal = r; });

  /* ---------- Rejimni aniqlash ---------- */
  (async function aniqla(){
    try{
      const nazorat = new AbortController();
      const t = setTimeout(() => nazorat.abort(), 700);
      const j = await fetch("/api/salomat", {signal: nazorat.signal}).then(x => x.json());
      clearTimeout(t);
      if (j && j.holat === "ok") rejim = "server";
    }catch(_){ rejim = "snapshot"; }
    tayyorHal(rejim);
    document.dispatchEvent(new CustomEvent("mkb:rejim", {detail: rejim}));
  })();

  /* ---------- Snapshot ustqatlami ---------- */
  function ustqatlam(){
    try{ return JSON.parse(localStorage.getItem(OMBOR_KALIT) || "{}"); }
    catch(_){ return {}; }
  }
  function ustqatlamSaqla(u){ localStorage.setItem(OMBOR_KALIT, JSON.stringify(u)); }

  function xomRoyxat(kolleksiya){
    const D = window.MKB_DATA || {};
    const asl = Array.isArray(D[kolleksiya]) ? D[kolleksiya] : [];
    const u = (ustqatlam()[kolleksiya]) || {};
    const royxat = asl.map(x => {
      const p = u[x.id];
      return p && !p.__yangi ? Object.assign({}, x, p) : x;
    }).filter(x => !(u[x.id] && u[x.id].__ochirilgan));
    Object.values(u).forEach(p => { if (p.__yangi) royxat.push(p.__yangi); });
    return royxat;
  }

  /* ---------- Server so'rovi ---------- */
  async function sorov(yol, usul, tana){
    const s = sessiya();
    const r = await fetch("/api/" + yol, {
      method: usul || "GET",
      headers: Object.assign({"Content-Type": "application/json"},
        s ? {"X-Sessiya": s.token} : {}),
      body: tana ? JSON.stringify(tana) : undefined,
    });
    if (r.status === 401){ chiqish(); location.href = "kirish.html"; throw new Error("sessiya tugadi"); }
    if (!r.ok) throw new Error("API xatosi: " + r.status);
    return r.json();
  }

  /* ---------- Ochiq metodlar ---------- */
  async function royxat(kolleksiya, filtr){
    await tayyor;
    let natija;
    if (rejim === "server"){
      const q = filtr ? "?" + new URLSearchParams(filtr) : "";
      natija = await sorov(kolleksiya.toLowerCase() + q);
    } else {
      natija = xomRoyxat(kolleksiya);
      if (filtr) natija = natija.filter(x =>
        Object.entries(filtr).every(([k, v]) => v === "" || v == null || String(x[k]) === String(v)));
    }
    return natija;
  }

  async function bitta(kolleksiya, id){
    await tayyor;
    if (rejim === "server") return sorov(kolleksiya.toLowerCase() + "/" + encodeURIComponent(id));
    return xomRoyxat(kolleksiya).find(x => x.id === id) || null;
  }

  async function yangilash(kolleksiya, id, patch){
    await tayyor;
    if (rejim === "server") return sorov(kolleksiya.toLowerCase() + "/" + encodeURIComponent(id), "PATCH", patch);
    const u = ustqatlam();
    u[kolleksiya] = u[kolleksiya] || {};
    if (u[kolleksiya][id] && u[kolleksiya][id].__yangi){
      Object.assign(u[kolleksiya][id].__yangi, patch);
    } else {
      u[kolleksiya][id] = Object.assign({}, u[kolleksiya][id], patch);
    }
    ustqatlamSaqla(u);
    amalYoz(kolleksiya, id, "yangilash", patch);
    return Object.assign({id}, patch);
  }

  async function yangi(kolleksiya, obyekt){
    await tayyor;
    if (rejim === "server") return sorov(kolleksiya.toLowerCase(), "POST", obyekt);
    const u = ustqatlam();
    u[kolleksiya] = u[kolleksiya] || {};
    u[kolleksiya][obyekt.id] = {__yangi: obyekt};
    ustqatlamSaqla(u);
    amalYoz(kolleksiya, obyekt.id, "yaratish", null);
    return obyekt;
  }

  /* ---------- Amallar jurnali ---------- */
  function amalYoz(kolleksiya, id, turi, tafsilot){
    const s = sessiya();
    const yozuv = {
      id: "AM-" + Date.now().toString(36),
      vaqt: new Date().toISOString().slice(0, 16).replace("T", " "),
      kim: s ? s.ism : "Mehmon",
      rol: s ? s.rol : "-",
      kolleksiya, obyektId: id, turi,
      tafsilot: tafsilot ? Object.keys(tafsilot).join(", ") : "",
    };
    try{
      const j = JSON.parse(localStorage.getItem("mkb4-amallar") || "[]");
      j.unshift(yozuv);
      localStorage.setItem("mkb4-amallar", JSON.stringify(j.slice(0, 400)));
    }catch(_){ }
  }
  function amallar(){
    try{ return JSON.parse(localStorage.getItem("mkb4-amallar") || "[]"); }
    catch(_){ return []; }
  }

  /* ---------- Sessiya ---------- */
  function sessiya(){
    try{ return JSON.parse(localStorage.getItem(SESSIYA_KALIT) || "null"); }
    catch(_){ return null; }
  }
  async function kirish(login, parol, rol){
    await tayyor;
    if (rejim === "server"){
      const j = await sorov("kirish", "POST", {login, parol, rol});
      localStorage.setItem(SESSIYA_KALIT, JSON.stringify(j));
      return j;
    }
    /* snapshot: rol tanlovi bilan namoyish kirishi */
    const F = (window.MKB_DATA && MKB_DATA.FOYDALANUVCHILAR) || [];
    const f = F.find(x => x.login === login) ||
              F.find(x => x.rol === rol) ||
              {ism: login || "Ismoilov Otabek", rol: rol || "Administrator", filial: "Toshkent shahar filiali"};
    const s = {token: "demo-" + Date.now().toString(36), ism: f.ism, rol: rol || f.rol, filial: f.filial};
    localStorage.setItem(SESSIYA_KALIT, JSON.stringify(s));
    amalYoz("SESSIYA", s.ism, "kirish", null);
    return s;
  }
  function chiqish(){
    localStorage.removeItem(SESSIYA_KALIT);
  }

  return {tayyor, rejim: () => rejim, royxat, bitta, yangi, yangilash,
          kirish, chiqish, sessiya, amallar};
})();
