/* ============================================================
   app.js — tizim qobig'i v4
   Relsa-navigatsiya · sarlavha paneli · RBAC · UZ/RU tarjima ·
   UI dvijoklari (jadval, forma, halqa, zanjir, modal, toast)
   ============================================================ */

/* ---------- Bo'limlar reyestri (relsa tartibi) ---------- */
const BOLIMLAR = [
  {kalit: "panel",    yorliq: "Boshqaruv paneli",  ikonka: "panel",    href: "panel.html"},
  {kalit: "aktivlar", yorliq: "Obyektlar reyestri",ikonka: "aktivlar", href: "obyektlar.html"},
  {kalit: "kn",       yorliq: "Kirish nazorati",   ikonka: "qulf",     href: "kirish-nazorati.html"},
  {kalit: "korik",    yorliq: "Ko'rik nazorati",   ikonka: "korik",    href: "korik-rejasi.html"},
  {kalit: "baholash", yorliq: "Baholash",          ikonka: "baholash", href: "baholash.html"},
  {kalit: "sugurta",  yorliq: "Sug'urta",          ikonka: "sugurta",  href: "sugurta.html"},
  {kalit: "yuridik",  yorliq: "Undiruv va sud",    ikonka: "yuridik",  href: "undiruv.html"},
  {kalit: "arxiv",    yorliq: "Arxiv",             ikonka: "arxiv",    href: "arxiv.html"},
  {kalit: "xarita",   yorliq: "Hududiy xarita",    ikonka: "xarita",   href: "xarita.html"},
  {kalit: "hisobot",  yorliq: "Hisobotlar",        ikonka: "hisobot",  href: "hisobotlar.html"},
  {kalit: "vazifa",   yorliq: "Vazifalar",         ikonka: "vazifa",   href: "vazifalar.html"},
  {kalit: "hujjat",   yorliq: "Hujjatlar",         ikonka: "hujjat",   href: "hujjatlar.html"},
];

/* ---------- Rollar ---------- */
const ROL_KALIT = {
  "Obyekt menejeri": "obyekt",                 /* reyestr, balansga qabul, hujjatlar */
  "Ko'rik inspektori": "nazorat",              /* ko'rik, kirish nazorati, sug'urta, hodisalar */
  "Baholovchi mutaxassis": "baholash",         /* qiymat va qayta baholash */
  "Yurist": "yurist",                          /* undiruv, sud, ijro */
  "Filial rahbari": "filial",
  "Administrator": "admin",
};
const ROL_RUXSAT = {
  admin:    null, /* hammasi */
  filial:   ["panel","aktivlar","kn","korik","baholash","sugurta","yuridik","arxiv",
             "xarita","hisobot","vazifa","hujjat","sozlama"],
  /* Obyekt menejeri — reyestr, balansga qabul, kirish nuqtalari, hujjatlar */
  obyekt:   ["panel","aktivlar","kn","korik","arxiv","xarita","hisobot","vazifa","hujjat","sozlama"],
  /* Ko'rik inspektori — obyekt holati: ko'rik, kirish nazorati, sug'urta, hodisalar */
  nazorat:  ["panel","aktivlar","kn","korik","sugurta","xarita","hisobot","vazifa","hujjat","sozlama"],
  /* Baholovchi — obyekt qiymati */
  baholash: ["panel","aktivlar","baholash","hisobot","vazifa","hujjat","sozlama"],
  /* Yurist — undiruv va sud */
  yurist:   ["panel","yuridik","aktivlar","arxiv","hisobot","vazifa","hujjat","sozlama"],
};
/* Fayl darajasidagi cheklovlar (sahifa ruxsatidan tashqari) */
const SAHIFA_MAXSUS = {
  "panel.html":            ["admin", "filial"],
  "panel-obyekt.html":     ["admin", "obyekt"],
  "panel-nazorat.html":    ["admin", "nazorat"],
  "panel-baholash.html":   ["admin", "baholash"],
  "panel-yurist.html":     ["admin", "yurist"],
  "panel-filial.html":     ["admin", "filial"],
  "foydalanuvchilar.html": ["admin"],
  "foydalanuvchi.html":    ["admin"],
  "rollar.html":           ["admin"],
  "amallar-tarixi.html":   ["admin"],
  "integratsiyalar.html":  ["admin"],
  "filiallar.html":        ["admin", "filial"],
  "qurilma-ornatish.html": ["admin", "obyekt", "nazorat"],
};

function joriySessiya(){ return window.MKBapi ? MKBapi.sessiya() : null; }
function joriyRolKalit(){
  const s = joriySessiya();
  return s ? (ROL_KALIT[s.rol] || "admin") : null;
}
function bolimRuxsatlimi(kalit, rol){
  const r = ROL_RUXSAT[rol];
  return !r || r.includes(kalit);
}
function faylNomi(href){
  const f = (href || location.pathname).split("/").pop().split("?")[0];
  return f || "panel.html";
}
function sahifaRuxsatlimi(href){
  const rol = joriyRolKalit();
  if (!rol) return false;
  const fayl = faylNomi(href);
  if (SAHIFA_MAXSUS[fayl] && !SAHIFA_MAXSUS[fayl].includes(rol)) return false;
  const b = document.body;
  if (href){
    /* boshqa sahifa: bo'limini reyestrdan taxmin qilamiz */
    const bol = BOLIMLAR.find(x => faylNomi(x.href) === fayl);
    return bol ? bolimRuxsatlimi(bol.kalit, rol) : true;
  }
  const kalit = b.dataset.sahifa;
  return kalit ? bolimRuxsatlimi(kalit, rol) : true;
}
function rolBoshSahifasi(rol){
  return rol === "admin" ? "panel.html" : "panel-" + rol + ".html";
}

/* ---------- Tarjima (UZ -> RU) ---------- */
const TARJIMA_ATTR = ["placeholder", "title", "aria-label", "alt", "data-toast", "data-yorliq"];
function joriyTil(){ return localStorage.getItem("mkb-til") === "ru" ? "ru" : "uz"; }
function lugat(){ return window.MKB_LUGAT || {}; }
/* Turli apostrof belgilarini yagona ko'rinishga keltirish */
function birXilApostrof(m){ return m.replace(/[’ʼʻ`´]/g, "'"); }
const ASL_MATN = new WeakMap();
function tarjimaQil(ildiz){
  const ru = joriyTil() === "ru", L = lugat();
  const yur = document.createTreeWalker(ildiz || document.body, NodeFilter.SHOW_TEXT);
  let n;
  while ((n = yur.nextNode())){
    const ota = n.parentElement;
    if (!ota || /^(SCRIPT|STYLE)$/.test(ota.tagName)) continue;
    if (!ASL_MATN.has(n)) ASL_MATN.set(n, n.nodeValue);
    const asl = ASL_MATN.get(n);
    const k = asl.trim();
    if (!k) continue;
    if (ru){
      let t = L[k] != null ? L[k] : L[birXilApostrof(k)];
      if (t == null){
        for (const [q, alm] of (window.MKB_TARJIMA_QOIDALARI || [])){
          if (q.test(k)){ t = k.replace(q, alm); break; }
        }
      }
      if (t != null) n.nodeValue = asl.replace(k, t);
    } else n.nodeValue = asl;
  }
  (ildiz || document).querySelectorAll(TARJIMA_ATTR.map(a => "[" + a + "]").join(",")).forEach(el => {
    TARJIMA_ATTR.forEach(a => {
      const q = el.getAttribute(a);
      if (!q) return;
      const kalitAttr = "data-asl-" + a;
      if (!el.hasAttribute(kalitAttr)) el.setAttribute(kalitAttr, q);
      const asl = el.getAttribute(kalitAttr);
      const tr = L[asl] != null ? L[asl] : L[birXilApostrof(asl)];
      el.setAttribute(a, ru && tr != null ? tr : asl);
    });
  });
  /* sahifa sarlavhasi */
  if (!document.body.dataset.aslTitle) document.body.dataset.aslTitle = document.title;
  const t = document.body.dataset.aslTitle;
  const [old, qism] = [t.split(" — ")[0], t.split(" — ").slice(1).join(" — ")];
  document.title = ru && qism && L[qism] ? old + " — " + L[qism] : t;
}

/* ---------- Ikonka yordamchisi ---------- */
function ik(nom, klass){
  return '<svg class="ic' + (klass ? " " + klass : "") + '"><use href="#i-' + nom + '"/></svg>';
}

/* ---------- Qobiq chizish ---------- */
const LOGO_SVG =
  '<svg width="20" height="20" viewBox="0 0 44 44" aria-hidden="true"><g transform="translate(0,-6)">' +
  '<path d="M14.275 40.779 2 31.971V48h12.28l-.005-7.221Z" fill="#fff"/>' +
  '<path d="M2 24.239 17.776 35.755 41.798 20.342V8L17.776 23.413 2 11.897v12.342Z" fill="#fff"/>' +
  '<path d="M29.518 35.935V48h12.28V28.056l-12.28 7.879Z" fill="#fff"/></g></svg>';

function bolimNomi(kalit){
  const b = BOLIMLAR.find(x => x.kalit === kalit);
  if (b) return b.yorliq;
  return kalit === "sozlama" ? "Sozlamalar" : "Tizim";
}

function yonChiz(){
  const el = document.getElementById("yon");
  if (!el) return;
  const rol = joriyRolKalit();
  const joriyBolim = document.body.dataset.sahifa;
  const joriyFayl = faylNomi();
  const daraxt = window.MKB_DARAXT || {};
  const bandlar = BOLIMLAR.filter(b => bolimRuxsatlimi(b.kalit, rol));

  const guruhHTML = (kalit, yorliq, ikonka) => {
    const sahifalar = (daraxt[kalit] || []).filter(s => sahifaRuxsatlimi(s.f));
    const ochiq = kalit === joriyBolim;
    const havola = sahifalar.length ? sahifalar[0].f : (BOLIMLAR.find(b => b.kalit === kalit) || {}).href;
    if (!sahifalar.length)
      return '<a class="yon-band' + (ochiq ? " faol" : "") + '" href="' + havola + '">' +
        ik(ikonka) + yorliq + "</a>";
    return '<div class="yon-guruh">' +
      '<button type="button" class="yon-band' + (ochiq ? " faol" : "") + '" data-guruh="' + kalit +
      '" aria-expanded="' + ochiq + '">' + ik(ikonka) + yorliq +
      ik("past", "strelka") + "</button>" +
      '<div class="yon-ichki' + (ochiq ? " ochiq" : "") + '" data-ichki="' + kalit + '">' +
      sahifalar.map(s =>
        '<a href="' + s.f + '"' + (s.f === joriyFayl ? ' class="faol"' : "") + ">" + s.n + "</a>").join("") +
      "</div></div>";
  };

  el.innerHTML =
    '<a class="yon-logo" href="' + rolBoshSahifasi(rol) + '">' +
      '<span class="belgi">' + LOGO_SVG + "</span>" +
      "<b>Mikrokreditbank</b></a>" +
    '<div class="yon-sarlavha">' +
      '<a class="yon-orqaga" href="' + rolBoshSahifasi(rol) + '" aria-label="Boshqaruv paneli">' + ik("chap") + "</a>" +
      "<h2>" + bolimNomi(joriyBolim) + "</h2>" +
    "</div>" +
    bandlar.map(b => guruhHTML(b.kalit, b.yorliq, b.ikonka)).join("") +
    '<div class="yon-past">' +
      guruhHTML("sozlama", "Sozlamalar", "sozlama") +
      '<button type="button" class="yon-band" id="chiqish-tugma">' + ik("chiqish") + "Tizimdan chiqish</button>" +
    "</div>";

  el.querySelectorAll("[data-guruh]").forEach(b => b.addEventListener("click", () => {
    const ichki = el.querySelector('[data-ichki="' + b.dataset.guruh + '"]');
    const ochiq = ichki.classList.toggle("ochiq");
    b.setAttribute("aria-expanded", ochiq);
  }));
  const ch = document.getElementById("chiqish-tugma");
  if (ch) ch.addEventListener("click", () => { MKBapi.chiqish(); location.href = "kirish.html"; });
}

function shapkaChiz(){
  const el = document.getElementById("shapka");
  if (!el) return;
  const s = joriySessiya() || {ism: "Mehmon", rol: "-", filial: ""};
  const bosh = (s.ism || "M").split(" ").map(x => x[0]).join("").slice(0, 2).toUpperCase();
  const suratYol = xodimSurati(s.ism);
  const til = joriyTil();
  const rol = joriyRolKalit();
  const joriyBolim = document.body.dataset.sahifa;
  const tezkor = BOLIMLAR.filter(b => bolimRuxsatlimi(b.kalit, rol)).slice(0, 4);
  const joriyBor = tezkor.some(b => b.kalit === joriyBolim);
  const joriyObj = BOLIMLAR.find(b => b.kalit === joriyBolim);

  el.innerHTML =
    '<button type="button" class="doira-tugma menyu-tugma" id="menyu-tugma" aria-label="Menyu">' + ik("menyu") + "</button>" +
    '<nav class="pill-nav" aria-label="Tezkor bo\'limlar">' +
      tezkor.map(b =>
        '<a class="pill' + (b.kalit === joriyBolim ? " faol" : "") + '" href="' + b.href + '">' + b.yorliq + "</a>").join("") +
      (!joriyBor && joriyObj ? '<a class="pill faol" href="' + joriyObj.href + '">' + joriyObj.yorliq + "</a>" : "") +
      (!joriyBor && !joriyObj && joriyBolim === "sozlama" ? '<a class="pill faol" href="sozlamalar.html">Sozlamalar</a>' : "") +
    "</nav>" +
    '<div class="shapka-ong">' +
      '<div class="izlash" id="global-izlash-qutisi">' + ik("izlash") +
        '<input type="search" id="global-izlash" placeholder="Obyekt, kirish nuqtasi yoki hujjat bo\'yicha qidirish..." aria-label="Qidirish">' +
        '<kbd aria-hidden="true">/</kbd></div>' +
      '<div class="til-almash" role="group" aria-label="Interfeys tili">' +
        '<button type="button" data-til="uz" class="' + (til === "uz" ? "faol" : "") + '">UZ</button>' +
        '<button type="button" data-til="ru" class="' + (til === "ru" ? "faol" : "") + '">RU</button>' +
      "</div>" +
      '<button type="button" class="doira-tugma" id="yordam-tugma" '
        + 'aria-label="Tizimda qanday ishlash kerak" title="Tizimda qanday ishlash kerak">'
        + ik("yordam") + "</button>" +
      '<a class="doira-tugma" href="bildirishnomalar.html" aria-label="Bildirishnomalar">' +
        ik("qongiroq") + '<span class="nuqta"></span></a>' +
      '<div class="profil" id="profil-tugma" role="button" tabindex="0" aria-haspopup="menu">' +
        '<span class="yuz">' + (suratYol
          ? '<img src="' + suratYol + '" alt="" loading="lazy" '
            + 'onerror="this.parentNode.textContent=this.dataset.bosh" data-bosh="' + bosh + '">'
          : bosh) + "</span>" +
        '<span class="kim"><b>' + (s.ism || "") + "</b><span>" + (s.rol || "") + "</span></span>" +
        ik("past") +
        '<div class="menyu-popover" id="profil-menyu" style="top:calc(100% + 10px);right:0" role="menu">' +
          '<a href="sozlamalar.html">' + ik("foyd") + "Profil sozlamalari</a>" +
          '<a href="amallar-tarixi.html">' + ik("soat") + "Amallar tarixi</a>" +
          '<div class="ajratgich"></div>' +
          '<button type="button" id="profil-chiqish">' + ik("chiqish") + "Tizimdan chiqish</button>" +
        "</div>" +
      "</div>" +
    "</div>";

  /* Izlash: Enter -> reyestr, "/" fokus, ruxsatsiz rolga ko'rinmaydi */
  const gi = document.getElementById("global-izlash");
  if (!sahifaRuxsatlimi("obyektlar.html")){
    document.getElementById("global-izlash-qutisi").remove();
  } else {
    gi.addEventListener("keydown", e => {
      if (e.key === "Enter" && gi.value.trim())
        location.href = "obyektlar.html?qidiruv=" + encodeURIComponent(gi.value.trim());
    });
    document.addEventListener("keydown", e => {
      if (e.key === "/" && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)){
        e.preventDefault(); gi.focus();
      }
    });
  }
  /* Til */
  el.querySelectorAll(".til-almash button").forEach(b =>
    b.addEventListener("click", () => {
      localStorage.setItem("mkb-til", b.dataset.til);
      el.querySelectorAll(".til-almash button").forEach(x => x.classList.toggle("faol", x === b));
      tarjimaQil();
      document.dispatchEvent(new CustomEvent("mkb:til", {detail: b.dataset.til}));
    }));
  /* Yordam paneli */
  const yt = document.getElementById("yordam-tugma");
  if (yt) yt.addEventListener("click", () => qollanmaOch(rol));

  /* Profil menyu */
  const pt = document.getElementById("profil-tugma");
  const pm = document.getElementById("profil-menyu");
  pt.addEventListener("click", e => {
    if (e.target.closest(".menyu-popover")) return;
    pm.classList.toggle("ochiq");
  });
  document.addEventListener("click", e => {
    if (!e.target.closest("#profil-tugma")) pm.classList.remove("ochiq");
  });
  const pc = document.getElementById("profil-chiqish");
  if (pc) pc.addEventListener("click", () => { MKBapi.chiqish(); location.href = "kirish.html"; });

  /* Mobil menyu */
  const mt = document.getElementById("menyu-tugma");
  const yon = document.getElementById("yon");
  if (mt && yon){
    let parda = document.querySelector(".yon-parda");
    if (!parda){
      parda = document.createElement("div");
      parda.className = "yon-parda";
      document.body.appendChild(parda);
    }
    const almash = ochiq => {
      yon.classList.toggle("ochiq", ochiq);
      parda.classList.toggle("ochiq", ochiq);
      /* ba'zi muhitlarda media-qoida ustuvorligi ishlamaydi — to'g'ridan-to'g'ri */
      yon.style.left = ochiq ? "0px" : "";
      parda.style.display = ochiq ? "block" : "";
    };
    mt.addEventListener("click", () => almash(!yon.classList.contains("ochiq")));
    parda.addEventListener("click", () => almash(false));
  }
}

/* ---------- UI dvijoklari ---------- */
const MKB = {
  toast(matn, ikonka){
    let q = document.querySelector(".toast-qutisi");
    if (!q){ q = document.createElement("div"); q.className = "toast-qutisi"; document.body.appendChild(q); }
    const t = document.createElement("div");
    t.className = "toast";
    t.innerHTML = ik(ikonka || "tasdiq") + "<span></span>";
    t.querySelector("span").textContent = matn;
    q.appendChild(t);
    tarjimaQil(t);
    setTimeout(() => { t.style.opacity = "0"; t.style.transition = "opacity .25s"; }, 3400);
    setTimeout(() => t.remove(), 3800);
  },

  modal(sarlavha, tanaHTML, opts){
    opts = opts || {};
    const parda = document.createElement("div");
    parda.className = "modal-parda ochiq";
    parda.innerHTML =
      '<div class="modal" role="dialog" aria-modal="true">' +
        '<div class="modal-bosh"><h3></h3>' +
        '<button type="button" class="modal-yop" aria-label="Yopish">' + ik("yopish") + "</button></div>" +
        '<div class="modal-tana">' + tanaHTML + "</div>" +
        '<div class="modal-oyoq">' +
          '<button type="button" class="tugma tugma-oq" data-amal="bekor">Bekor qilish</button>' +
          '<button type="button" class="tugma tugma-asosiy" data-amal="ok">' + (opts.okMatn || "Tasdiqlash") + "</button>" +
        "</div></div>";
    parda.querySelector("h3").textContent = sarlavha;
    document.body.appendChild(parda);
    tarjimaQil(parda);
    const yop = () => parda.remove();
    parda.addEventListener("click", e => { if (e.target === parda) yop(); });
    parda.querySelector(".modal-yop").addEventListener("click", yop);
    parda.querySelector('[data-amal="bekor"]').addEventListener("click", yop);
    parda.querySelector('[data-amal="ok"]').addEventListener("click", () => {
      if (opts.ok && opts.ok(parda) === false) return;
      yop();
    });
    document.addEventListener("keydown", function esc(e){
      if (e.key === "Escape"){ yop(); document.removeEventListener("keydown", esc); }
    });
    return parda;
  },

  /* O'ngdan suriladigan panel (qo'llanma, tafsilot, tarix) */
  yonPanel(sarlavha, tanaHTML, opts){
    opts = opts || {};
    document.querySelectorAll(".yon-panel, .yon-panel-parda").forEach(x => x.remove());
    const parda = document.createElement("div");
    parda.className = "yon-panel-parda";
    const panel = document.createElement("aside");
    panel.className = "yon-panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "true");
    panel.innerHTML =
      '<div class="yon-panel-bosh">' +
        '<div class="yp-nom"><span class="yorliq"></span><h3></h3></div>' +
        '<button type="button" class="modal-yop" aria-label="Yopish">' + ik("yopish") + "</button>" +
      "</div>" +
      '<div class="yon-panel-tana">' + tanaHTML + "</div>";
    panel.querySelector("h3").textContent = sarlavha;
    const yl = panel.querySelector(".yorliq");
    if (opts.yorliq) yl.textContent = opts.yorliq; else yl.remove();
    document.body.appendChild(parda);
    document.body.appendChild(panel);
    tarjimaQil(panel);
    requestAnimationFrame(() => { parda.classList.add("ochiq"); panel.classList.add("ochiq"); });
    const yop = () => {
      panel.classList.remove("ochiq");
      parda.classList.remove("ochiq");
      setTimeout(() => { panel.remove(); parda.remove(); }, 280);
    };
    parda.addEventListener("click", yop);
    panel.querySelector(".modal-yop").addEventListener("click", yop);
    document.addEventListener("keydown", function esc(e){
      if (e.key === "Escape"){ yop(); document.removeEventListener("keydown", esc); }
    });
    const birinchi = panel.querySelector("a, button");
    if (birinchi) birinchi.focus();
    return {panel, yop};
  },

  /* Taqsimot barlari: [[nom, qiymat, rang?, izoh?], ...] */
  barlar(joy, juftlar, opts){
    const el = typeof joy === "string" ? document.getElementById(joy) : joy;
    if (!el) return;
    opts = opts || {};
    const qiymat = j => MKB.sonQiymat(Array.isArray(j) ? j[1] : j.qiymat);
    const maks = Math.max(...juftlar.map(qiymat), 1);
    el.classList.add("bar-royxat");
    el.innerHTML = juftlar.map((j, i) => {
      const nom = Array.isArray(j) ? j[0] : j.nom;
      const v = qiymat(j);
      const rang = (Array.isArray(j) ? j[2] : j.rang) || "var(--siyoh)";
      const izoh = (Array.isArray(j) ? j[3] : j.izoh) || "";
      const matn = opts.format ? opts.format(v, j) : MKB.fmt(v);
      return '<' + (opts.href ? 'a class="bar-qator" href="' + opts.href + '"' : 'div class="bar-qator"') + '>' +
        '<span class="bar-nom"><i style="background:' + rang + '"></i>' + nom + "</span>" +
        '<span class="bar-iz"><span style="width:' + Math.max(4, v / maks * 100) + "%;background:" + rang +
        ";animation-delay:" + (i * 55) + 'ms"></span></span>' +
        '<span class="bar-son">' + matn + (izoh ? "<em>" + izoh + "</em>" : "") + "</span>" +
        "</" + (opts.href ? "a" : "div") + ">";
    }).join("");
    if (window.tarjimaQil) tarjimaQil(el);
  },

  /* Shtrix-ko'rsatkich: foiz -> mos-bar (jadval qatorlari uchun) */
  shtrix(foiz, soni){
    soni = soni || 14;
    const toliq = Math.round(Math.max(0, Math.min(foiz, 100)) / 100 * soni);
    const zona = foiz >= 85 ? "z-yashil" : foiz >= 70 ? "z-sariq" : "z-xavf";
    let p = "";
    for (let i = 0; i < soni; i++) p += '<i class="' + (i < toliq ? 'f' : '') + '"></i>';
    return '<span class="shtrix ' + zona + '" role="img" aria-label="Nazorat indeksi ' + foiz + ' foiz">' +
      '<span class="panjara">' + p + "</span><b>" + foiz + "%</b></span>";
  },

  /* Qoplash halqasi: foiz -> SVG */
  halqa(foiz, olcham, qalinlik){
    olcham = olcham || 46; qalinlik = qalinlik || 4.5;
    const r = (olcham - qalinlik) / 2;
    const C = 2 * Math.PI * r;
    const ulush = Math.max(0, Math.min(foiz, 100)) / 100;
    const zona = foiz >= 85 ? "halqa-yashil" : foiz >= 70 ? "halqa-sariq" : "halqa-xavf";
    return '<span class="halqa ' + zona + '" role="img" aria-label="Nazorat indeksi ' + foiz + ' foiz">' +
      '<svg width="' + olcham + '" height="' + olcham + '">' +
      '<circle class="h-iz" cx="' + olcham/2 + '" cy="' + olcham/2 + '" r="' + r + '" stroke-width="' + qalinlik + '"/>' +
      '<circle class="h-qiymat" cx="' + olcham/2 + '" cy="' + olcham/2 + '" r="' + r + '" stroke-width="' + qalinlik +
      '" stroke-dasharray="' + C + '" stroke-dashoffset="' + (C * (1 - ulush)) + '"/></svg>' +
      "<b>" + foiz + "</b></span>";
  },

  /* Bosqich zanjiri */
  zanjir(bosqichlar, joriyIndeks){
    return '<div class="zanjir">' + bosqichlar.map((b, i) => {
      const holat = i < joriyIndeks ? "otildi" : i === joriyIndeks ? "joriy" : "";
      const ich = i < joriyIndeks ? ik("tasdiq") : String(i + 1);
      return '<div class="zanjir-bosqich ' + holat + '">' +
        '<span class="zanjir-shtamp">' + ich + "</span>" +
        '<span class="zanjir-nom">' + (b.nom || b) + "</span>" +
        (b.sana ? '<span class="zanjir-sana">' + b.sana + "</span>" : "") +
        "</div>";
    }).join("") + "</div>";
  },

  /* Jadval dvijoki */
  jadval(joy, cfg){
    const el = typeof joy === "string" ? document.getElementById(joy) : joy;
    if (!el) return null;
    const holat = {qidiruv: "", saralash: cfg.saralash || null, yonalish: 1, sahifa: 1, filtrlar: {}};
    const hajm = cfg.sahifaHajmi || 12;

    function qiymat(x, k){ const v = x[k]; return v == null ? "" : v; }
    function moslar(){
      let r = cfg.qatorlar.slice();
      if (holat.qidiruv && cfg.qidiruv){
        const q = holat.qidiruv.toLowerCase();
        r = r.filter(x => cfg.qidiruv.some(k => String(qiymat(x, k)).toLowerCase().includes(q)));
      }
      Object.entries(holat.filtrlar).forEach(([k, v]) => {
        if (v) r = r.filter(x => String(qiymat(x, k)) === v);
      });
      if (holat.saralash){
        const k = holat.saralash;
        r.sort((a, b) => {
          const av = qiymat(a, k), bv = qiymat(b, k);
          const as = typeof av === "number" && typeof bv === "number";
          return (as ? av - bv : String(av).localeCompare(String(bv), "uz")) * holat.yonalish;
        });
      }
      return r;
    }

    function chiz(){
      const r = moslar();
      const jami = r.length;
      const sahifalar = Math.max(1, Math.ceil(jami / hajm));
      holat.sahifa = Math.min(holat.sahifa, sahifalar);
      const bolak = r.slice((holat.sahifa - 1) * hajm, holat.sahifa * hajm);

      const asbob = (cfg.qidiruv || cfg.filtrlar || cfg.amallar) ?
        '<div class="jadval-asbob">' +
          (cfg.qidiruv ? '<div class="izlash" style="max-width:300px">' + ik("izlash") +
            '<input type="search" data-jadval-qidiruv placeholder="' + (cfg.qidiruvYozuvi || "Qidirish...") + '"></div>' : "") +
          (cfg.filtrlar || []).map(f =>
            '<div class="tanlov" data-jadval-filtr="' + f.kalit + '" role="button" tabindex="0" aria-expanded="false">' +
              '<span class="t-old">' + f.nom + ':</span><span class="t-yorliq">' + (f.hamma || "Barchasi") + "</span>" + ik("past", "strelka") +
              '<div class="menyu-popover" style="top:calc(100% + 6px);left:0">' +
                '<button type="button" data-qiymat="">' + (f.hamma || "Barchasi") + "</button>" +
                f.variantlar.map(v => '<button type="button" data-qiymat="' + v + '">' + v + "</button>").join("") +
              "</div></div>").join("") +
          '<div class="oraliq"></div>' + (cfg.amallar || "") +
        "</div>" : "";

      el.innerHTML =
        '<div class="jadval-korpus">' + asbob +
        '<div class="jadval-orash"><table class="jadval"><thead><tr>' +
        cfg.ustunlar.map(u =>
          "<th" + (u.saralash !== false ? ' class="saralanadi' + (holat.saralash === u.kalit ? " faol" : "") + '" data-kalit="' + u.kalit + '"' : "") +
          (u.son ? ' style="text-align:right"' : "") + '><span class="th-yon">' + u.nom +
          (u.saralash !== false ? ik(holat.saralash === u.kalit && holat.yonalish < 0 ? "yuqori" : "past") : "") +
          "</span></th>").join("") +
        "</tr></thead><tbody>" +
        (bolak.length ? bolak.map(x =>
          '<tr data-id="' + (x.id || "") + '"' + (cfg.bosilganda ? ' class="bosiladi" tabindex="0"' : "") + ">" +
          cfg.ustunlar.map(u =>
            "<td" + (u.son ? ' class="son"' : "") + ">" +
            (u.chiz ? u.chiz(x) : String(qiymat(x, u.kalit))) + "</td>").join("") +
          "</tr>").join("")
        : '<tr><td colspan="' + cfg.ustunlar.length + '"><div class="bosh-holat">' + ik("hujjat") +
          "<b>Hech narsa topilmadi</b><span>Qidiruv yoki filtr shartlarini o\'zgartirib ko\'ring</span></div></td></tr>") +
        "</tbody></table></div>" +
        '<div class="jadval-past"><span style="font-weight:500">Jami: ' + jami + " ta yozuv</span>" +
        '<div class="sahifalash">' +
          '<button type="button" data-sahifa="old"' + (holat.sahifa <= 1 ? " disabled" : "") + ">" + ik("chap") + "</button>" +
          Array.from({length: sahifalar}, (_, i) =>
            sahifalar > 7 && Math.abs(i + 1 - holat.sahifa) > 2 && i !== 0 && i !== sahifalar - 1
              ? (Math.abs(i + 1 - holat.sahifa) === 3 ? "<span>…</span>" : "")
              : '<button type="button" data-sahifa="' + (i + 1) + '"' + (i + 1 === holat.sahifa ? ' class="faol"' : "") + ">" + (i + 1) + "</button>"
          ).join("") +
          '<button type="button" data-sahifa="keyin"' + (holat.sahifa >= sahifalar ? " disabled" : "") + ">" + ik("ong") + "</button>" +
        "</div></div></div>";

      /* hodisalar */
      el.querySelectorAll("th.saralanadi").forEach(th => th.addEventListener("click", () => {
        const k = th.dataset.kalit;
        if (holat.saralash === k) holat.yonalish *= -1;
        else { holat.saralash = k; holat.yonalish = 1; }
        chiz();
      }));
      const q = el.querySelector("[data-jadval-qidiruv]");
      if (q){
        q.value = holat.qidiruv;
        q.addEventListener("input", () => { holat.qidiruv = q.value; holat.sahifa = 1; chiz2(); });
        function chiz2(){ const p = q.selectionStart; chiz(); const q2 = el.querySelector("[data-jadval-qidiruv]"); q2.focus(); q2.setSelectionRange(p, p); }
      }
      el.querySelectorAll("[data-jadval-filtr]").forEach(t => {
        const pop = t.querySelector(".menyu-popover");
        t.addEventListener("click", e => {
          if (e.target.closest(".menyu-popover")) return;
          document.querySelectorAll(".menyu-popover.ochiq").forEach(p => p !== pop && p.classList.remove("ochiq"));
          pop.classList.toggle("ochiq");
          t.setAttribute("aria-expanded", pop.classList.contains("ochiq"));
        });
        pop.querySelectorAll("button").forEach(b => b.addEventListener("click", () => {
          holat.filtrlar[t.dataset.jadvalFiltr] = b.dataset.qiymat;
          holat.sahifa = 1;
          chiz();
        }));
      });
      el.querySelectorAll("[data-sahifa]").forEach(b => b.addEventListener("click", () => {
        const v = b.dataset.sahifa;
        holat.sahifa = v === "old" ? holat.sahifa - 1 : v === "keyin" ? holat.sahifa + 1 : +v;
        chiz();
      }));
      if (cfg.bosilganda) el.querySelectorAll("tbody tr.bosiladi").forEach(tr => {
        const ish = () => {
          const x = cfg.qatorlar.find(y => String(y.id) === tr.dataset.id);
          if (x) cfg.bosilganda(x, tr);
        };
        tr.addEventListener("click", ish);
        tr.addEventListener("keydown", e => { if (e.key === "Enter") ish(); });
      });
      tarjimaQil(el);
      if (cfg.chizilganda) cfg.chizilganda(bolak, el);
    }

    chiz();
    return {
      yangila(qatorlar){ if (qatorlar) cfg.qatorlar = qatorlar; chiz(); },
      holat,
    };
  },

  /* Forma yig'ish + tekshirish */
  forma(el, majburiy){
    const q = {};
    let birinchiXato = null;
    el.querySelectorAll("[name]").forEach(m => {
      const kirish = m.closest(".kirish") || m;
      kirish.classList.remove("xato");
      q[m.name] = m.type === "checkbox" ? m.checked : m.value.trim();
      if ((majburiy || []).includes(m.name) && !q[m.name]){
        kirish.classList.add("xato");
        if (!birinchiXato) birinchiXato = m;
      }
    });
    if (birinchiXato){ birinchiXato.focus(); return null; }
    return q;
  },

  pul(son){
    if (window.MKB_DATA && MKB_DATA.pul) return MKB_DATA.pul(son);
    return new Intl.NumberFormat("ru-RU").format(son) + " so\'m";
  },
  rol(){ return joriyRolKalit(); },
  fmt(son){ return new Intl.NumberFormat("ru-RU").format(son); },
  /* "3 840,4" -> 3840.4 */
  sonQiymat(x){
    const n = parseFloat(String(x == null ? "" : x).replace(/\s/g, "").replace(",", "."));
    return isNaN(n) ? 0 : n;
  },
};
window.MKB = MKB;
window.sahifaRuxsatlimi = sahifaRuxsatlimi;
window.tarjimaQil = tarjimaQil;
window.joriyTil = joriyTil;
window.ik = ik;

/* ---------- Ishga tushirish ---------- */
document.addEventListener("DOMContentLoaded", () => {
  /* Sprite */
  if (window.MKB_SPRITE && !document.getElementById("mkb-sprite")){
    const d = document.createElement("div");
    d.id = "mkb-sprite";
    d.innerHTML = window.MKB_SPRITE;
    document.body.prepend(d);
  }

  const ochiq = document.body.dataset.ochiq === "1";
  const s = joriySessiya();

  if (!ochiq && !s){ location.replace("kirish.html"); return; }
  if (!ochiq && !sahifaRuxsatlimi()){
    if (faylNomi() !== "xato-403.html"){ location.replace("xato-403.html"); return; }
  }

  if (!ochiq){
    yonChiz();
    shapkaChiz();
  }

  /* Rejim belgisi */
  document.addEventListener("mkb:rejim", e => {
    if (ochiq) return;
    let b = document.querySelector(".rejim-belgisi");
    if (!b){
      b = document.createElement("div");
      b.className = "rejim-belgisi";
      const joy = document.querySelector("#yon .yon-past") || document.body;
      joy.appendChild(b);
    }
    const server = e.detail === "server";
    b.classList.toggle("snapshot", !server);
    b.innerHTML = '<span class="nuqta"></span>' + (server ? "Server ulangan" : "Namoyish rejimi");
    tarjimaQil(b);
  });

  /* data-toast tugmalar */
  document.body.addEventListener("click", e => {
    const t = e.target.closest("[data-toast]");
    if (t) MKB.toast(t.getAttribute("data-toast"));
  });

  tarjimaQil();
  document.dispatchEvent(new CustomEvent("mkb:tayyor"));
  /* Sahifa skriptlari ma'lumotni keyin chizadi — tarjima ikki bosqichda takrorlanadi */
  setTimeout(tarjimaQil, 250);
  setTimeout(tarjimaQil, 1000);
});


/* ---------- Xodim surati ---------- */
function xodimSurati(ism){
  if (!ism) return null;
  const R = window.MKB_XODIM_RASMLARI || {};
  if (R[ism]) return R[ism];
  const F = (window.MKB_DATA && MKB_DATA.FOYDLAR) || [];
  const f = F.find(x => x.nom === ism || x.ism === ism || x.login === ism);
  return f && f.rasm ? f.rasm : null;
}

/* ---------- Rolga moslashgan qo'llanma ---------- */
function qollanmaOch(rol){
  const Q = (window.MKB_QOLLANMA || {})[rol] || (window.MKB_QOLLANMA || {}).admin;
  if (!Q){
    MKB.toast("Qo'llanma topilmadi");
    return;
  }
  const qadam = (x, i) =>
    '<li class="qol-qadam">' +
      '<span class="raqam">' + (i + 1) + "</span>" +
      '<span class="matn"><b>' + x.nom + "</b><span>" + x.izoh + "</span>" +
      (x.havola ? '<a href="' + x.havola + '">' + (x.havolaNomi || "Ochish") + ik("ong", "mitti") + "</a>" : "") +
      "</span></li>";
  const royxat = (nom, bandlar, kls) => bandlar && bandlar.length
    ? '<div class="qol-blok' + (kls ? " " + kls : "") + '"><h4>' + nom + "</h4><ul>" +
      bandlar.map(b => "<li>" + b + "</li>").join("") + "</ul></div>"
    : "";
  const tana =
    '<p class="qol-maqsad">' + Q.maqsad + "</p>" +
    '<div class="qol-blok"><h4>Kunlik ish tartibi</h4><ol class="qol-qadamlar">' +
      Q.qadamlar.map(qadam).join("") + "</ol></div>" +
    royxat("Sizning javobgarligingiz", Q.javobgarlik) +
    royxat("Muddat va me'yorlar", Q.meyor, "qol-meyor") +
    royxat("Sizga yopiq bo'limlar", Q.yopiq, "qol-yopiq") +
    '<a class="tugma tugma-oq qol-toliq" href="qollanma.html">' + ik("hujjat") +
      "To'liq qo'llanmani ochish</a>";
  MKB.yonPanel(Q.nom + " — qanday ishlash kerak", tana, {yorliq: "Ish tartibi"});
}
