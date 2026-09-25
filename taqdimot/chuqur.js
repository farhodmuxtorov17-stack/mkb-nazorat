/* ==========================================================================
   MKBANK — chuqur sahifalar dvigateli (taqdimot/*.html).

   Sahifa slayd emas, lekin xulqi slayd bilan bir xil: yashil belgili har bir
   blok bosiladi va o'ng tomondan batafsil paneli chiqadi. Panel mazmuni
   window.MKB_BATAFSIL dan olinadi (chuqur-batafsil.js), ruscha matn yozuvning
   o'zida turadi.

   Vazifalari: til almashtirgichi, batafsil paneli, bo'limlar tasmasi,
   taqdimotga qaytish havolasi (?dan=s-y01) va chop etish.
   ========================================================================== */
(function () {
  "use strict";

  var $ = function (s, k) { return (k || document).querySelector(s); };
  var $$ = function (s, k) { return [].slice.call((k || document).querySelectorAll(s)); };

  /* Slayd raqamlari: ?dan= qiymatidan taqdimotdagi o'ringa o'tish uchun */
  var SLAYD = {
    "s-muqova": 1, "s-mundarija": 2, "s-taklif": 3, "s-muammo": 4, "s-tizim": 5,
    "s-rol": 6, "s-sxema": 7, "s-foyda": 8, "s-tarkib": 9, "s-xatar": 10,
    "s-shart": 11, "s-matritsa": 12, "s-y01": 13, "s-y02": 14, "s-y03": 15,
    "s-y04": 16, "s-y05": 17, "s-y06": 18, "s-y07": 19, "s-y08": 20,
    "s-y09": 21, "s-y10": 22, "s-narx": 23, "s-arx": 24, "s-savol": 25,
    "s-api": 26, "s-adapter": 27, "s-video": 28, "s-masshtab": 29, "s-kirish": 30,
    "s-uzilish": 31, "s-korik": 32, "s-montaj": 33, "s-quvvat": 34, "s-qabul": 35,
    "s-iqtisod": 36, "s-bom": 37, "s-meyor": 38, "s-hamkor": 39, "s-sotuv": 40,
    "s-istiqbol": 41, "s-platforma": 42, "s-yol": 43, "s-pilot": 44, "s-faq": 45
  };

  function ik(d, q) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + (q || 2) +
      '" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + d + "</svg>";
  }
  var IK = {
    chap: ik('<path d="M15 5l-7 7 7 7"/>', 2.2),
    ong: ik('<path d="M9 5l7 7-7 7"/>', 2.2),
    yop: ik('<path d="M6 6l12 12M18 6L6 18"/>', 2.2),
    chop: ik('<path d="M7 9V4h10v5M7 17H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2"/><rect x="7" y="14" width="10" height="6" rx="1"/>'),
    tashqi: ik('<path d="M14 5h5v5M19 5l-8 8M18 14v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h4"/>'),
    kengaytir: ik('<path d="M9 4H4v5M15 20h5v-5M4 4l6 6M20 20l-6-6"/>'),
    yigish: ik('<path d="M10 4v5H5M14 20v-5h5M4 4l5 5M20 20l-5-5"/>')
  };

  function saqla(k, v) { try { localStorage.setItem(k, v); } catch (_) {} }
  function oqi(k) { try { return localStorage.getItem(k); } catch (_) { return null; } }
  function til() { return oqi("mkb-til") === "ru" ? "ru" : "uz"; }

  /* ---------------------------------------------------------------- tarjima
     app.js yuklanmaydi (u sahifa qobig'ini quradi va bu yerda keraksiz),
     shuning uchun matn tugunlarini o'girish shu yerda bajariladi. Qoidalar
     va lug'at tarjima.js dan olinadi, xulq app.js dagi bilan bir xil. */
  var ASL = new WeakMap();
  var TARJ_ATTR = ["placeholder", "title", "aria-label", "alt"];
  function birXil(m) { return m.replace(/[’ʼʻ`´]/g, "'"); }
  function qoidalar() { return window.MKB_TARJIMA_QOIDALARI || []; }
  function ogir(k, L) {
    var t = L[k] != null ? L[k] : L[birXil(k)];
    if (t == null) {
      var q = qoidalar();
      for (var i = 0; i < q.length; i++) if (q[i][0].test(k)) { t = k.replace(q[i][0], q[i][1]); break; }
    }
    return t;
  }
  function tarjima(el) {
    var ildiz = el || document.body, ru = til() === "ru", L = window.MKB_LUGAT || {};
    var yur = document.createTreeWalker(ildiz, NodeFilter.SHOW_TEXT), n;
    while ((n = yur.nextNode())) {
      var ota = n.parentElement;
      if (!ota || /^(SCRIPT|STYLE)$/.test(ota.tagName)) continue;
      if (ota.closest("[data-tarjimasiz]")) {
        if (!ru && !ASL.has(n)) continue;
        if (!ASL.has(n)) ASL.set(n, n.nodeValue);
        var aslB = ASL.get(n);
        n.nodeValue = ru && typeof window.mkbBirlikTarjima === "function" ? window.mkbBirlikTarjima(aslB) : aslB;
        continue;
      }
      if (!ASL.has(n)) ASL.set(n, n.nodeValue);
      var asl = ASL.get(n), k = asl.trim();
      if (!k) continue;
      if (!ru) { n.nodeValue = asl; continue; }
      var t = ogir(k, L);
      if (t != null && typeof window.mkbSonliIbora === "function") t = window.mkbSonliIbora(n, t);
      if (t != null) n.nodeValue = asl.replace(k, t);
    }
    var joy = ildiz.querySelectorAll ? ildiz : document;
    joy.querySelectorAll(TARJ_ATTR.map(function (a) { return "[" + a + "]"; }).join(",")).forEach(function (e) {
      TARJ_ATTR.forEach(function (a) {
        if (!e.getAttribute(a)) return;
        var kalit = "data-asl-" + a;
        if (!e.hasAttribute(kalit)) e.setAttribute(kalit, e.getAttribute(a));
        var aa = e.getAttribute(kalit);
        if (!ru) { e.setAttribute(a, aa); return; }
        var tt = ogir(aa, L);
        e.setAttribute(a, tt != null ? tt : aa);
      });
    });
  }
  function param(n) { return new URLSearchParams(location.search).get(n) || ""; }

  var panel, panelTana, panelSar, panelYorliq, panelManba, panelHisob, panelChuqur;
  var nuqtalar = [], panelKalit = null, oldingiFokus = null;

  /* ------------------------------------------------------------------ til */
  function tilBelgisi() {
    var t = til();
    $$(".c-til [data-til]").forEach(function (b) {
      b.classList.toggle("faol", b.getAttribute("data-til") === t);
      b.setAttribute("aria-pressed", b.getAttribute("data-til") === t ? "true" : "false");
    });
    document.documentElement.lang = t;
    document.documentElement.style.setProperty("--bf-soz", t === "ru" ? '"Подробнее"' : '"Batafsil"');
  }
  /* Platforma ekranlari ikki tilda suratga olingan: til bilan birga surat ham almashadi */
  function ekranlar() {
    var t = til();
    $$("[data-ekran]").forEach(function (im) {
      im.setAttribute("src", "../assets/taqdimot/ekran-" + im.getAttribute("data-ekran") + "-" + t + ".webp");
    });
  }
  function tilQoy() {
    tilBelgisi();
    ekranlar();
    tarjima(document.body);
    if (panelKalit) panelYoz(panelKalit);
  }
  window.addEventListener("storage", function (e) { if (e.key === "mkb-til") tilQoy(); });

  /* -------------------------------------------------- taqdimotga qaytish */
  function orqaHavola() {
    var dan = param("dan") || document.body.getAttribute("data-slayd") || "";
    var n = SLAYD[dan] || SLAYD[document.body.getAttribute("data-slayd")] || 1;
    $$("[data-orqa]").forEach(function (a) {
      a.setAttribute("href", "../taqdimot.html#" + n);
      var r = $(".c-orqa-raqam", a);
      if (r) r.textContent = (n < 10 ? "0" : "") + n;
    });
  }

  /* --------------------------------------------------- batafsil nuqtalari */
  /* Xaritadagi tugun SVG ichida turadi va HTML belgisi u yerda ko'rinmaydi:
     belgi SVG ning o'zida chiziladi. O'rni tugundagi data-belgi="x,y" da. */
  var SVGNS = "http://www.w3.org/2000/svg";
  function svgBelgi(el) {
    if ($(":scope > .bf-svg-belgi", el)) return;
    var j = (el.getAttribute("data-belgi") || "").split(",");
    if (j.length !== 2) return;
    var r = +(el.getAttribute("data-belgi-r") || 13);
    var g = document.createElementNS(SVGNS, "g");
    g.setAttribute("class", "bf-svg-belgi");
    g.setAttribute("aria-hidden", "true");
    g.setAttribute("transform", "translate(" + (+j[0]) + "," + (+j[1]) + ")");
    var c = document.createElementNS(SVGNS, "circle");
    c.setAttribute("r", r);
    c.setAttribute("class", "bf-svg-doira");
    var p = document.createElementNS(SVGNS, "path");
    p.setAttribute("d", "M" + (-r * 0.46) + " 0h" + (r * 0.92) + "M0 " + (-r * 0.46) + "v" + (r * 0.92));
    p.setAttribute("class", "bf-svg-chiziq");
    g.appendChild(c);
    g.appendChild(p);
    el.appendChild(g);
  }

  function nuqtalarniBelgila() {
    var b = window.MKB_BATAFSIL || {};
    nuqtalar = [];
    $$("[data-batafsil]").forEach(function (el) {
      var k = el.getAttribute("data-batafsil");
      if (!b[k]) return;
      el.classList.add("bor-batafsil");
      if (el.tagName !== "BUTTON" && el.tagName !== "A") {
        el.setAttribute("role", "button");
        if (!el.hasAttribute("tabindex")) el.tabIndex = 0;
      }
      if (el.ownerSVGElement) svgBelgi(el);
      else if (!$(":scope > .bf-belgi", el) && !$(":scope > td > .bf-belgi", el)) {
        var i = document.createElement("i");
        i.className = "bf-belgi";
        i.setAttribute("aria-hidden", "true");
        i.setAttribute("data-tarjimasiz", "");
        i.textContent = "+";
        (el.tagName === "TR" ? el.lastElementChild : el).appendChild(i);
      }
      if (!el.getAttribute("aria-label")) {
        var s = (b[k].sarlavha || "").trim();
        if (s) el.setAttribute("aria-label", s);
      }
      nuqtalar.push(el);
    });
    /* bo'lim sarlavhasida shu bo'limdagi nuqtalar soni */
    $$(".c-bob").forEach(function (s) {
      var n = $$(".bor-batafsil", s).length, j = $(".c-bob-hisob", s);
      if (!j) return;
      if (!n) { j.remove(); return; }
      j.innerHTML = '<i aria-hidden="true">+</i><b data-tarjimasiz>' + n + "</b><span>ta batafsil</span>";
    });
  }

  function panelQur() {
    panel = document.createElement("aside");
    panel.className = "batafsil";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "true");
    panel.setAttribute("aria-hidden", "true");
    panel.innerHTML =
      '<div class="bf-parda"></div>' +
      '<div class="bf-oyna" tabindex="-1">' +
        '<div class="bf-bosh"><span class="bf-yorliq"></span>' +
          '<span class="bf-yonalish">' +
            '<button type="button" class="bf-tugma bf-matnli" data-bf="orqa">' + IK.chap + "<span>Oldingi</span></button>" +
            '<span class="bf-hisob" data-tarjimasiz></span>' +
            '<button type="button" class="bf-tugma bf-matnli" data-bf="old"><span>Keyingi</span>' + IK.ong + "</button></span>" +
          '<button type="button" class="bf-tugma bf-matnli bf-keng" data-bf="keng"></button>' +
          '<button type="button" class="bf-tugma" data-bf="yop" aria-label="Yopish (Esc)">' + IK.yop + "</button></div>" +
        '<h2 class="bf-sarlavha"></h2>' +
        '<div class="bf-tana"></div>' +
        '<div class="bf-chuqur"></div>' +
        '<div class="bf-manba"></div>' +
      "</div>";
    document.body.appendChild(panel);
    panelTana = $(".bf-tana", panel);
    panelSar = $(".bf-sarlavha", panel);
    panelYorliq = $(".bf-yorliq", panel);
    panelManba = $(".bf-manba", panel);
    panelHisob = $(".bf-hisob", panel);
    panelChuqur = $(".bf-chuqur", panel);
    /* Parda ostida boshqa batafsil blok bo'lsa, bosish panelni yopmasdan o'sha
       blokka almashadi — o'quvchi bloklar bo'ylab bir bosishda yuradi. */
    $(".bf-parda", panel).addEventListener("click", function (e) {
      var ost = null;
      panel.style.pointerEvents = "none";
      try { ost = document.elementFromPoint(e.clientX, e.clientY); } catch (_) {}
      panel.style.pointerEvents = "";
      var blok = ost && ost.closest ? ost.closest("[data-batafsil]") : null;
      if (blok && !blok.classList.contains("tanlangan")) panelOch(blok);
      else panelYop();
    });
    panel.addEventListener("click", function (e) {
      var t = e.target.closest("[data-bf]");
      if (!t) return;
      var a = t.getAttribute("data-bf");
      if (a === "yop") panelYop();
      else if (a === "keng") kengAlmashtir();
      else qadam(a === "old" ? 1 : -1);
    });
    kengAlmashtir(oqi("mkb-batafsil-keng") === "1");
  }

  function kengAlmashtir(yoq) {
    var k = yoq === undefined ? !panel.classList.contains("keng") : !!yoq;
    panel.classList.toggle("keng", k);
    var t = $("[data-bf=keng]", panel);
    if (t) { t.innerHTML = (k ? IK.yigish : IK.kengaytir) + "<span>" + (k ? "Yig'ish" : "Kengaytirish") + "</span>"; tarjima(t); }
    saqla("mkb-batafsil-keng", k ? "1" : "0");
    if (panelTana) panelTana.scrollTop = 0;
  }

  function panelYoz(k) {
    var d = (window.MKB_BATAFSIL || {})[k];
    if (!d) return false;
    if (til() === "ru" && d.ru) d = {
      yorliq: d.ru.yorliq || d.yorliq, sarlavha: d.ru.sarlavha || d.sarlavha,
      tana: d.ru.tana || d.tana, manba: d.manba
    };
    panelYorliq.textContent = d.yorliq || "Batafsil";
    panelSar.textContent = d.sarlavha || "";
    panelTana.innerHTML = d.tana || "";
    panelManba.innerHTML = (d.manba && d.manba.length)
      ? "<b>Manba</b>" + d.manba.map(function (m) {
          return '<a href="' + m[1] + '" target="_blank" rel="noopener">' + m[0] + IK.tashqi + "</a>";
        }).join("")
      : "";
    panelChuqur.innerHTML = "";
    tarjima(panel);
    return true;
  }

  function panelOch(el) {
    var k = el.getAttribute("data-batafsil");
    if (!(window.MKB_BATAFSIL || {})[k]) return;
    if (!panel.classList.contains("ochiq")) oldingiFokus = document.activeElement;
    panelKalit = k;
    nuqtalar.forEach(function (x) { x.classList.remove("tanlangan"); });
    el.classList.add("tanlangan");
    panelYoz(k);
    var i = nuqtalar.indexOf(el);
    panelHisob.textContent = nuqtalar.length > 1 ? (i + 1) + " / " + nuqtalar.length : "";
    panel.classList.add("ochiq");
    panel.setAttribute("aria-hidden", "false");
    panelTana.scrollTop = 0;
    $(".bf-oyna", panel).focus();
    ishoraYop(true);
    try { history.replaceState(null, "", location.pathname + location.search + "#bf=" + k); } catch (_) {}
  }
  function panelYop() {
    if (!panel || !panel.classList.contains("ochiq")) return;
    panel.classList.remove("ochiq");
    panel.setAttribute("aria-hidden", "true");
    nuqtalar.forEach(function (x) { x.classList.remove("tanlangan"); });
    panelKalit = null;
    try { history.replaceState(null, "", location.pathname + location.search); } catch (_) {}
    if (oldingiFokus && oldingiFokus.focus) oldingiFokus.focus();
  }
  function qadam(yon) {
    if (!nuqtalar.length) return;
    var i = nuqtalar.indexOf($(".bor-batafsil.tanlangan"));
    var j = (i + yon + nuqtalar.length) % nuqtalar.length;
    var el = nuqtalar[j];
    el.scrollIntoView({ block: "center", behavior: "smooth" });
    panelOch(el);
  }

  /* ------------------------------------------------------ bo'limlar tasmasi */
  function tasma() {
    var havolalar = $$(".c-yoq a"), boblar = havolalar.map(function (a) {
      return document.getElementById(a.getAttribute("href").slice(1));
    }).filter(Boolean);
    if (!boblar.length) return;
    var faol = null;
    function belgila() {
      var y = window.scrollY + 160, t = boblar[0];
      boblar.forEach(function (b) { if (b.offsetTop <= y) t = b; });
      if (t === faol) return;
      faol = t;
      havolalar.forEach(function (a) {
        var j = a.getAttribute("href").slice(1) === t.id;
        a.classList.toggle("joriy", j);
        if (j) a.scrollIntoView({ block: "nearest", inline: "nearest" });
      });
    }
    var kutmoqda = false;
    window.addEventListener("scroll", function () {
      if (kutmoqda) return;
      kutmoqda = true;
      requestAnimationFrame(function () { kutmoqda = false; belgila(); });
    }, { passive: true });
    belgila();
  }

  /* ------------------------------------------------------------- ishora */
  var ishoraEl = null;
  function ishoraChiz() {
    if (oqi("mkb-chuqur-ishora") === "1" || !nuqtalar.length) return;
    ishoraEl = document.createElement("div");
    ishoraEl.className = "c-ishora";
    ishoraEl.innerHTML = '<i aria-hidden="true">+</i><p>Yashil belgili har bir blok bosiladi</p>' +
      '<button type="button">Tushunarli</button>';
    /* Ishora sahifa matni ustida suzmaydi: chuqur sahifada aylantirish bor va
       suzuvchi yorliq birinchi jadvalning qatorini bekitib qo'yardi. U kirish
       matnidan keyin, oqim ichida turadi va faqat tugma bilan yopiladi. */
    var joy = $(".c-kirish .c-lid") || $(".c-kirish h1");
    if (joy && joy.parentNode) joy.parentNode.insertBefore(ishoraEl, joy.nextSibling);
    else document.body.appendChild(ishoraEl);
    tarjima(ishoraEl);
    $("button", ishoraEl).addEventListener("click", function () { ishoraYop(true); });
  }
  function ishoraYop(butunlay) {
    if (butunlay) saqla("mkb-chuqur-ishora", "1");
    if (ishoraEl) { ishoraEl.remove(); ishoraEl = null; }
  }

  /* ------------------------------------------------------------ boshlash */
  function tayyorla() {
    document.body.classList.add("chuqur");
    panelQur();
    nuqtalarniBelgila();
    orqaHavola();
    tilBelgisi();
    ekranlar();
    tarjima(document.body);
    tasma();

    document.addEventListener("click", function (e) {
      var t = e.target.closest("[data-til]");
      if (t) { saqla("mkb-til", t.getAttribute("data-til")); tilQoy(); return; }
      if (e.target.closest("[data-chop]")) { panelYop(); setTimeout(function () { window.print(); }, 60); return; }
      var b = e.target.closest(".bor-batafsil");
      if (b && !e.target.closest("a")) { e.preventDefault(); panelOch(b); }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && panel.classList.contains("ochiq")) { e.preventDefault(); panelYop(); return; }
      var b = e.target.closest && e.target.closest(".bor-batafsil");
      if (b && (e.key === "Enter" || e.key === " ") && b.tagName !== "A") { e.preventDefault(); panelOch(b); return; }
      if (!panel.classList.contains("ochiq")) return;
      if (e.key === "ArrowRight") { e.preventDefault(); qadam(1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); qadam(-1); }
    });

    /* #bf=kalit bilan kelgan havola panelni darhol ochadi */
    var h = /^#bf=(.+)$/.exec(location.hash || "");
    if (h) {
      var el = $('[data-batafsil="' + h[1] + '"]');
      if (el) { el.scrollIntoView({ block: "center" }); panelOch(el); }
    } else ishoraChiz();
  }

  window.MKB_CHUQUR_SAHIFA = {
    och: function (k) { var el = $('[data-batafsil="' + k + '"]'); if (el) panelOch(el); },
    yop: panelYop,
    royxat: function () { return nuqtalar.map(function (el) { return el.getAttribute("data-batafsil"); }); },
    til: til
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", tayyorla);
  else tayyorla();
})();
