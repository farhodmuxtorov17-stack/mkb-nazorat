/* ============================================================
   app.js — tizim qobig'i v4
   Relsa-navigatsiya · sarlavha paneli · RBAC · UZ/RU tarjima ·
   UI dvijoklari (jadval, forma, halqa, zanjir, modal, toast)
   ============================================================ */

/* ---------- Bo'limlar reyestri (relsa tartibi) ---------- */
const BOLIMLAR = [
  {kalit: "panel",    yorliq: "Boshqaruv paneli",    ikonka: "panel",    href: "panel.html"},
  {kalit: "portfel",  yorliq: "Qarzdorlar portfeli", ikonka: "portfel",  href: "qarzdorlar.html"},
  {kalit: "aktivlar", yorliq: "Aktivlar reyestri",   ikonka: "aktivlar", href: "obyektlar.html"},
  {kalit: "yuridik",  yorliq: "Undiruv va sud",      ikonka: "yuridik",  href: "undiruv.html"},
  {kalit: "korik",    yorliq: "Ko'rik nazorati",     ikonka: "korik",    href: "korik-rejasi.html"},
  {kalit: "baholash", yorliq: "Baholash",            ikonka: "baholash", href: "baholash.html"},
  {kalit: "sugurta",  yorliq: "Sug'urta",            ikonka: "sugurta",  href: "sugurta.html"},
  {kalit: "zaxira",   yorliq: "Tasnif va zaxira",    ikonka: "zaxira",   href: "tasniflash.html"},
  {kalit: "savdo",    yorliq: "Realizatsiya",        ikonka: "savdo",    href: "savdo.html"},
  {kalit: "arxiv",    yorliq: "Arxiv",               ikonka: "arxiv",    href: "arxiv.html"},
  {kalit: "hisobot",  yorliq: "Hisobotlar",          ikonka: "hisobot",  href: "hisobotlar.html"},
  {kalit: "xarita",   yorliq: "Hududiy xarita",      ikonka: "xarita",   href: "xarita.html"},
  {kalit: "vazifa",   yorliq: "Vazifalar",           ikonka: "vazifa",   href: "vazifalar.html"},
  {kalit: "hujjat",   yorliq: "Hujjatlar",           ikonka: "hujjat",   href: "hujjatlar.html"},
];

/* ---------- Rollar ---------- */
const ROL_KALIT = {
  "Administrator": "admin",
  "Filial rahbari": "filial",
  "Kredit menejeri": "kredit",
  "Aktivlar nazorati mutaxassisi": "aktiv",
  "Yurist": "yurist",
  "Tavakkalchilik menejeri": "tavakkal",
};
const ROL_RUXSAT = {
  admin:    null, /* hammasi */
  filial:   ["panel","portfel","aktivlar","korik","zaxira","savdo","arxiv","hisobot","xarita","vazifa","hujjat","sozlama"],
  kredit:   ["panel","portfel","hisobot","vazifa","hujjat","sozlama"],
  aktiv:    ["panel","aktivlar","korik","baholash","sugurta","savdo","arxiv","xarita","hisobot","vazifa","hujjat","sozlama"],
  yurist:   ["panel","portfel","yuridik","arxiv","hisobot","vazifa","hujjat","sozlama"],
  tavakkal: ["panel","baholash","zaxira","hisobot","vazifa","hujjat","sozlama"],
};
/* Fayl darajasidagi cheklovlar (sahifa ruxsatidan tashqari) */
const SAHIFA_MAXSUS = {
  "foydalanuvchilar.html": ["admin"],
  "foydalanuvchi.html":    ["admin"],
  "rollar.html":           ["admin"],
  "amallar-tarixi.html":   ["admin"],
  "integratsiyalar.html":  ["admin"],
  "filiallar.html":        ["admin", "filial"],
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
const TARJIMA_ATTR = ["placeholder", "title", "aria-label", "alt", "data-toast"];
function joriyTil(){ return localStorage.getItem("mkb-til") === "ru" ? "ru" : "uz"; }
function lugat(){ return window.MKB_LUGAT || {}; }
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
    if (ru && L[k]) n.nodeValue = asl.replace(k, L[k]);
    else if (!ru) n.nodeValue = asl;
  }
  (ildiz || document).querySelectorAll(TARJIMA_ATTR.map(a => "[" + a + "]").join(",")).forEach(el => {
    TARJIMA_ATTR.forEach(a => {
      const q = el.getAttribute(a);
      if (!q) return;
      const kalitAttr = "data-asl-" + a;
      if (!el.hasAttribute(kalitAttr)) el.setAttribute(kalitAttr, q);
      const asl = el.getAttribute(kalitAttr);
      el.setAttribute(a, ru && L[asl] ? L[asl] : asl);
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
function relsaChiz(){
  const el = document.getElementById("relsa");
  if (!el) return;
  const rol = joriyRolKalit();
  const faol = document.body.dataset.sahifa;
  const bandlar = BOLIMLAR.filter(b => bolimRuxsatlimi(b.kalit, rol));
  el.innerHTML =
    '<a class="relsa-logo" href="' + rolBoshSahifasi(rol) + '" aria-label="Bosh sahifa">' +
      '<svg viewBox="0 0 44 44" aria-hidden="true"><g transform="translate(0,-6)">' +
      '<path d="M14.275 40.779 2 31.971V48h12.28l-.005-7.221Z" fill="#16170F"/>' +
      '<path d="M2 24.239 17.776 35.755 41.798 20.342V8L17.776 23.413 2 11.897v12.342Z" fill="#16170F"/>' +
      '<path d="M29.518 35.935V48h12.28V28.056l-12.28 7.879Z" fill="#16170F"/></g></svg></a>' +
    '<div class="relsa-bosh">' +
      bandlar.map(b =>
        '<a class="relsa-band' + (b.kalit === faol ? " faol" : "") + '" href="' + b.href +
        '" data-yorliq="' + b.yorliq + '" aria-label="' + b.yorliq + '"' +
        (b.kalit === faol ? ' aria-current="page"' : "") + ">" + ik(b.ikonka) + "</a>"
      ).join("") +
    "</div>" +
    '<div class="relsa-past">' +
      '<div class="relsa-ajratgich"></div>' +
      '<a class="relsa-band' + (faol === "sozlama" ? " faol" : "") + '" href="sozlamalar.html" data-yorliq="Sozlamalar" aria-label="Sozlamalar">' + ik("sozlama") + "</a>" +
      '<button type="button" class="relsa-band" id="chiqish-tugma" data-yorliq="Chiqish" aria-label="Tizimdan chiqish">' + ik("chiqish") + "</button>" +
    "</div>";
  const ch = document.getElementById("chiqish-tugma");
  if (ch) ch.addEventListener("click", () => {
    MKBapi.chiqish();
    location.href = "kirish.html";
  });
}

function shapkaChiz(){
  const el = document.getElementById("shapka");
  if (!el) return;
  const s = joriySessiya() || {ism: "Mehmon", rol: "-", filial: ""};
  const bosh = (s.ism || "M").split(" ").map(x => x[0]).join("").slice(0, 2).toUpperCase();
  const til = joriyTil();
  el.innerHTML =
    '<div class="izlash" id="global-izlash-qutisi">' +
      ik("izlash") +
      '<input type="search" id="global-izlash" placeholder="Obyekt, shartnoma yoki mijoz bo\'yicha qidirish..." aria-label="Qidirish">' +
      '<kbd aria-hidden="true">/</kbd>' +
    "</div>" +
    '<div class="shapka-ong">' +
      '<div class="til-almash" role="group" aria-label="Interfeys tili">' +
        '<button type="button" data-til="uz" class="' + (til === "uz" ? "faol" : "") + '">UZ</button>' +
        '<button type="button" data-til="ru" class="' + (til === "ru" ? "faol" : "") + '">RU</button>' +
      "</div>" +
      '<a class="shapka-tugma" href="bildirishnomalar.html" aria-label="Bildirishnomalar">' +
        ik("qongiroq") + '<span class="nuqta"></span></a>' +
      '<div class="profil" id="profil-tugma" role="button" tabindex="0" aria-haspopup="menu">' +
        '<span class="yuz">' + bosh + "</span>" +
        '<span class="kim"><b>' + (s.ism || "") + "</b><span>" + (s.rol || "") + "</span></span>" +
        ik("past") +
        '<div class="menyu-popover" id="profil-menyu" style="top:calc(100% + 8px);right:0" role="menu">' +
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
      el.querySelectorAll(".til-almash button").forEach(x =>
        x.classList.toggle("faol", x === b));
      tarjimaQil();
      document.dispatchEvent(new CustomEvent("mkb:til", {detail: b.dataset.til}));
    }));
  /* Profil menyu */
  const pt = document.getElementById("profil-tugma");
  const pm = document.getElementById("profil-menyu");
  pt.addEventListener("click", e => {
    if (e.target.closest("a,button") && !e.target.closest("#profil-tugma > .kim, #profil-tugma > .yuz")){
      if (e.target.closest(".menyu-popover")) return;
    }
    pm.classList.toggle("ochiq");
  });
  document.addEventListener("click", e => {
    if (!e.target.closest("#profil-tugma")) pm.classList.remove("ochiq");
  });
  const pc = document.getElementById("profil-chiqish");
  pc.addEventListener("click", () => { MKBapi.chiqish(); location.href = "kirish.html"; });
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

  /* Qoplash halqasi: foiz -> SVG */
  halqa(foiz, olcham, qalinlik){
    olcham = olcham || 46; qalinlik = qalinlik || 4.5;
    const r = (olcham - qalinlik) / 2;
    const C = 2 * Math.PI * r;
    const ulush = Math.max(0, Math.min(foiz, 200)) / 200;
    const zona = foiz >= 140 ? "halqa-yashil" : foiz >= 100 ? "halqa-sariq" : "halqa-xavf";
    return '<span class="halqa ' + zona + '" role="img" aria-label="Qoplash ' + foiz + ' foiz">' +
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
          (u.son ? ' style="text-align:right"' : "") + '><span class="yon">' + u.nom +
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
        '<div class="jadval-past"><span>Jami: <b>' + jami + "</b> ta yozuv</span>" +
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
    relsaChiz();
    shapkaChiz();
  }

  /* Rejim belgisi */
  document.addEventListener("mkb:rejim", e => {
    if (ochiq) return;
    let b = document.querySelector(".rejim-belgisi");
    if (!b){
      b = document.createElement("div");
      b.className = "rejim-belgisi";
      document.body.appendChild(b);
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
});
