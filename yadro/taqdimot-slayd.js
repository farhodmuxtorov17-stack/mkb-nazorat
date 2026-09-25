/* ============================================================
   taqdimot-slayd.js — slayd dvigateli.

   Har bir <section class="slayd"> — 1920×1080 kanvadagi bitta slayd.
   Ikki rejim:
     • Slayd — kanva ekranga sig'adi, klaviatura yoki bosish bilan o'tiladi;
     • O'qish — slaydlar ustma-ust turadi va sahifa kabi aylantiriladi.
   Qo'shimcha: umumiy ko'rinish, mundarija, batafsil panel.

   Klavishlar: → ← Probel PageUp PageDown Home End — o'tish;
   S — o'qish rejimi; M — mundarija; O — umumiy ko'rinish;
   F — to'liq ekran; P — PDF; Esc — yopish.
   N, Q, I, B, ? va raqam + Enter — taqdimot-maruza.js da.
   Manzil: taqdimot.html#7 — yettinchi slayd; ?rejim=oqish — o'qish rejimi;
   ?kadr=1 — ma'ruzachi oynasidagi ko'rinish (boshqaruvsiz, rejim saqlanmaydi);
   ?maruza=1 — ma'ruzachi oynasi.

   Batafsil: data-batafsil="kalit" bo'lgan blok — karta, jadval qatori,
   raqam, chip yoki foto paneli — butunlay bosiladi va o'ng tomonda panel
   ochiladi. Ichidagi havola, tab tugmasi va kiritish maydoni o'z ishini
   bajaradi. Klaviatura: Tab bilan fokus, Enter yoki Probel ochadi,
   Esc yopadi va fokus blokka qaytadi. Mazmuni window.MKB_BATAFSIL[kalit] da:
   { yorliq, sarlavha, tana (HTML), manba: [[nom, url], …] }.

   Ko'rinuvchanlik: har blokda "+" belgisi, sichqoncha ostida u "Batafsil"
   yozuvli tugmachaga cho'ziladi; slayd sarlavhasida "N ta batafsil" hisobi
   (bosilsa birinchi blok ochiladi); birinchi tashrifda dastlabki uch slaydda
   bir qatorlik ishora (localStorage: mkb-taqdimot-ishora).

   Panelda "Kengaytirish" — shu mazmun to'liq ekranli o'qish varag'iga o'tadi
   (localStorage: mkb-batafsil-keng). Chuqur sahifa havolasi window.MKB_CHUQUR
   reyestridan olinadi: { "kalit yoki slayd id": "sahifa.html" }. Reyestr bo'sh
   bo'lsa havola chiqmaydi.

   Ma'ruzachi oynasi, qisqacha, manbalar va klavishlar — boshqaruv qatoridagi
   "…" menyusida (taqdimot-maruza.js ularni shu yerga qo'yadi).
   ============================================================ */
(function () {
  "use strict";

  var BELGI =
    '<svg class="belgi" viewBox="0 0 440 96" role="img" aria-label="MKBANK">' +
    '<polygon fill="#13A33A" points="0,9.6 40.2,36.7 100,0 100,26.7 40.2,65.3 0,40.6"/>' +
    '<polygon fill="#0A4A9C" points="0,57.4 31.1,76.5 31.1,96 0,96"/>' +
    '<polygon fill="#0A4A9C" points="68.9,67.9 100,47.8 100,96 68.9,96"/>' +
    '<text x="133" y="69.5" font-family="Manrope, sans-serif" font-weight="800" font-size="58" ' +
    'textLength="305" lengthAdjust="spacingAndGlyphs" fill="#0A4A9C">MKBANK</text></svg>';
  var BELGI_OQ = BELGI.replace(/#0A4A9C/g, "#FFFFFF");

  function svg(d, qalin) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + (qalin || 2) +
      '" stroke-linecap="round" stroke-linejoin="round">' + d + "</svg>";
  }
  var IK = {
    chap: svg('<path d="M15 5l-7 7 7 7"/>', 2.2),
    ong: svg('<path d="M9 5l7 7-7 7"/>', 2.2),
    tor: svg('<rect x="3.5" y="4.5" width="7" height="6" rx="1.5"/><rect x="13.5" y="4.5" width="7" height="6" rx="1.5"/><rect x="3.5" y="13.5" width="7" height="6" rx="1.5"/><rect x="13.5" y="13.5" width="7" height="6" rx="1.5"/>'),
    oqish: svg('<path d="M5 5h14M5 10h14M5 15h14M5 20h9"/>'),
    slayd: svg('<rect x="3" y="5" width="18" height="12" rx="2"/><path d="M8 21h8"/>'),
    mundarija: svg('<path d="M4 6h2M4 12h2M4 18h2M9 6h11M9 12h11M9 18h11"/>'),
    ekran: svg('<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>'),
    chop: svg('<path d="M7 9V4h10v5M7 17H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2"/><rect x="7" y="14" width="10" height="6" rx="1"/>'),
    yop: svg('<path d="M6 6l12 12M18 6L6 18"/>', 2.2),
    tashqi: svg('<path d="M14 5h5v5M19 5l-8 8M18 14v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h4"/>'),
    kengaytir: svg('<path d="M9 4H4v5M15 20h5v-5M4 4l6 6M20 20l-6-6"/>'),
    yigish: svg('<path d="M10 4v5H5M14 20v-5h5M4 4l5 5M20 20l-5-5"/>'),
    yana: svg('<path d="M5 12h.01M12 12h.01M19 12h.01"/>', 2.8)
  };

  var lenta, slaydlar = [], qutilar = [], joriy = 0, jami = 0;
  var rejim = "slayd";
  var panel, panelTana, panelSarlavha, panelYorliq, panelManba, panelHisob, panelIlova, oldingiFokus = null, panelKalit = null;
  var ishoraEl = null, umumiyEdi = false;
  /* Chuqur sahifalar reyestri: kalit yoki slayd id -> sahifa manzili.
     Sahifa qo'shilmaguncha bo'sh turadi, shuning uchun uzilgan havola chiqmaydi. */
  window.MKB_CHUQUR = window.MKB_CHUQUR || {};
  var mundarijaEl;

  function $(s, o) { return (o || document).querySelector(s); }
  function $$(s, o) { return [].slice.call((o || document).querySelectorAll(s)); }
  function ikki(n) { return (n < 10 ? "0" : "") + n; }

  /* Matndagi slayd raqami: <span data-slayd-raqam="#s-api"></span>.
     Slaydlar DOM tartibidan raqamlanadi, shuning uchun havola id bilan
     yoziladi va raqam shu yerda qo'yiladi. Batafsil panelining mazmuni
     keyinroq quriladi — panelOch shu funksiyani panel tanasiga qayta chaqiradi. */
  function raqamlarQoy(ildiz) {
    var idRoyxat = slaydlar.map(function (x) { return "#" + x.id; });
    $$("[data-slayd-raqam]", ildiz || document).forEach(function (el) {
      var i = idRoyxat.indexOf(el.getAttribute("data-slayd-raqam"));
      el.textContent = i >= 0 ? ikki(i + 1) : "–";
      el.setAttribute("data-tarjimasiz", "");
    });
  }
  function saqla(k, v) { try { localStorage.setItem(k, v); } catch (_) {} }
  function oqi(k) { try { return localStorage.getItem(k); } catch (_) { return null; } }

  var PAR = new URLSearchParams(location.search);
  var KADR = PAR.get("kadr") === "1", MARUZA = PAR.get("maruza") === "1";
  function joriyTil() { return oqi("mkb-til") === "ru" ? "ru" : "uz"; }
  function xabar(nom, d) { document.dispatchEvent(new CustomEvent(nom, { detail: d || {} })); }

  /* Yuklanish ko'rsatkichi: brend ekrani birinchi slayd chizilgunicha turadi.
     Parda window.load ni kutmaydi — 40 slaydning fotolari keyin kelaveradi, bosish
     esa shu daqiqadan ishlaydi. CSS'da pointer-events:none, ya'ni shaffof holatda
     ham hech qachon bosishni yutmaydi. */
  var pardaniYop = function () {};
  (function () {
    if (KADR || MARUZA || !document.body) return;
    var y = document.createElement("div");
    y.className = "yuklanish";
    y.setAttribute("aria-hidden", "true");
    y.innerHTML = '<div class="yk-ichi">' + BELGI_OQ + '<span class="yk-chiziq"><i></i></span></div>';
    document.body.appendChild(y);
    var ketdi = false;
    pardaniYop = function () {
      if (ketdi) return;
      ketdi = true;
      y.classList.add("ketdi");
      setTimeout(function () { if (y.parentNode) y.parentNode.removeChild(y); }, 600);
    };
    if (document.readyState === "complete") pardaniYop();
    else { window.addEventListener("load", pardaniYop); setTimeout(pardaniYop, 1200); }
  })();
  function tarjima(el) { if (window.tarjimaQil) window.tarjimaQil(el || document.body); }

  /* ---------- Tayyorlash ---------- */
  function tayyorla() {
    lenta = $(".lenta");
    slaydlar = $$(".slayd");
    if (KADR) document.body.classList.add("kadr");
    if (MARUZA) document.body.classList.add("maruza");
    jami = slaydlar.length;

    slaydlar.forEach(function (s, i) {
      var q = document.createElement("div");
      q.className = "slayd-quti";
      q.setAttribute("data-raqam", ikki(i + 1));
      s.parentNode.insertBefore(q, s);
      q.appendChild(s);
      q.addEventListener("click", function () {
        if (document.body.classList.contains("umumiy")) { umumiy(false); bor(i); }
      });
      qutilar.push(q);

      var tun = s.classList.contains("tunli");
      if (s.getAttribute("data-bosh") !== "yoq") {
        var b = document.createElement("header");
        b.className = "s-bosh";
        b.innerHTML = (tun ? BELGI_OQ : BELGI) +
          '<div class="qism"><span>' + (s.getAttribute("data-qism") || "") + "</span>" +
          '<span class="raqam" data-tarjimasiz>' + ikki(i + 1) + " <span>/ " + ikki(jami) + "</span></span>" +
          '<span class="reyka"><i style="width:' + Math.round((i + 1) / jami * 100) + '%"></i></span></div>';
        s.insertBefore(b, s.firstChild);
      }
      if (s.getAttribute("data-oyoq") !== "yoq") {
        var o = document.createElement("footer");
        o.className = "s-oyoq";
        o.innerHTML = '<span class="shior">' + (s.getAttribute("data-shior") || "Bank balansidagi aktivlar nazorati") + "</span>" +
          '<span data-tarjimasiz>MKBANK · ' + ikki(i + 1) + "</span>";
        s.appendChild(o);
      }
    });

    batafsilBelgila();
    boshqaruvQur();
    panelQur();
    mundarijaQur();
    ishoraQur();

    raqamlarQoy();
    /* tablar: [data-tablar] ichida button[data-tab="x"] va [data-panel="x"] */
    $$("[data-tablar]").forEach(function (t) {
      var bir = $("[data-tab].faol", t) || $("[data-tab]", t);
      if (bir) tabTanla(t, bir.getAttribute("data-tab"));
    });

    /* slayd ichidagi havolalar: data-slayd="7" */
    document.addEventListener("mousedown", function () {
      umumiyEdi = document.body.classList.contains("umumiy");
    }, true);
    document.addEventListener("click", function (e) {
      var tb = e.target.closest("[data-tab]");
      if (tb && !document.body.classList.contains("umumiy")) {
        e.preventDefault();
        tabTanla(tb.closest("[data-tablar]"), tb.getAttribute("data-tab"));
        return;
      }
      var h = e.target.closest("[data-slayd]");
      if (h && !document.body.classList.contains("umumiy")) {
        e.preventDefault();
        mundarijaYop();
        var v = h.getAttribute("data-slayd");
        var idx = v.charAt(0) === "#" ? slaydlar.map(function (x) { return "#" + x.id; }).indexOf(v) : +v - 1;
        bor(idx, false, true);
        return;
      }
      if (!e.target.closest(".bq-yana")) yanaYop();
      var bt = e.target.closest(".bor-batafsil");
      /* umumiy ko'rinishda bosish faqat slaydga o'tkazadi: quti tinglovchisi
         sinfni bu paytga qadar olib tashlaganini hisobga olamiz */
      if (bt && !umumiyEdi && !document.body.classList.contains("umumiy")) {
        /* blok ichidagi haqiqiy havola, tugma yoki maydon o'z ishini bajaradi */
        var ich = e.target.closest("a[href],button,input,select,textarea,label,summary,[data-tab],[data-slayd]");
        if (ich && ich !== bt && bt.contains(ich)) return;
        /* matn nusxalash uchun belgilangan bo'lsa panel ochilmaydi */
        if (matnBelgilandi(bt)) return;
        e.preventDefault();
        panelOch(bt);
      }
    });
    document.addEventListener("keydown", function (e) {
      var bt = e.target.closest && e.target.closest(".bor-batafsil");
      if (!bt || (e.key !== "Enter" && e.key !== " ")) return;
      /* blok ichidagi tugma yoki havola o'z klavishini oladi */
      if (e.target !== bt && /^(BUTTON|A|INPUT|SELECT|TEXTAREA)$/.test(e.target.tagName)) return;
      e.preventDefault();
      panelOch(bt);
    });

    window.addEventListener("resize", function () { if (rejim === "oqish") oqishOlcham(); else olcham(); });

    var boshRejim = KADR || MARUZA ? "slayd" : PAR.get("rejim") || oqi("mkb-taqdimot-rejim") ||
      (window.innerWidth < 900 || window.innerHeight > window.innerWidth ? "oqish" : "slayd");
    rejimQoy(boshRejim === "oqish" ? "oqish" : "slayd", true);

    /* Chuqur sahifadan qaytish: ?dan=s-y06 slayd raqamini o'zi topadi, raqam
       slayd qo'shilganda siljib ketmaydi. Hash bo'lsa, u ustun turadi. */
    var n = parseInt((location.hash || "").replace(/\D/g, ""), 10);
    if (!(n > 0)) {
      var dan = PAR.get("dan");
      if (dan) {
        var di = slaydlar.indexOf(document.getElementById(dan.replace(/^#/, "")));
        if (di >= 0) n = di + 1;
      }
    }
    bor(n > 0 ? n - 1 : 0, true, true);
    /* slayd chizildi va bosish ishlaydi — parda shu yerda ketadi */
    pardaniYop();
  }

  function tabTanla(t, n) {
    if (!t) return;
    $$("[data-tab]", t).forEach(function (x) {
      if (x.closest("[data-tablar]") !== t) return;
      var f = x.getAttribute("data-tab") === n;
      x.classList.toggle("faol", f);
      x.setAttribute("aria-pressed", f ? "true" : "false");
    });
    $$("[data-panel]", t).forEach(function (p) {
      if (p.closest("[data-tablar]") !== t) return;
      p.hidden = p.getAttribute("data-panel") !== n;
    });
    t.setAttribute("data-faol-tab", n);
  }

  /* ---------- Batafsil nuqtalari ----------
     Kalit ikki yo'l bilan beriladi: data-batafsil="kalit" yoki avtomatik —
     slayd id + element roli + tartib raqami, masalan "s-y01.band2". */
  var NUQTA_ROLLARI = [
    [".korsat > div", "korsat"], [".faktlar > div", "fakt"], [".band-yozuv", "yozuv"],
    [".ustunlar .q", "qator"], [".shart", "shart"], [".varaq .band", "band"], [".narx", "narx"],
    [".diqqat", "diqqat"], [".oqim > div", "oqim"], [".arx .u", "ustun"], [".oqimlar > div", "oqimlar"],
    [".park", "park"], [".tun-fakt > div", "tunfakt"], [".kod", "kod"], [".qadam", "qadam"],
    [".ikki-izoh > div", "izoh"], [".tamoyil > div", "tamoyil"], [".xatarlar > div", "karta"],
    [".diapazon .q", "diapazon"], [".bom tbody tr", "bom"], [".chiplar", "chiplar"],
    [".hamkor > div", "hamkor"], [".jarayon", "jarayon"], [".ekranlar figure", "ekran"],
    [".pilot-qadam > div", "pilot"], [".qaror", "qaror"], [".nuqta", "nuqta"],
    /* fotodagi chaqiruv yorliqlari va arxitektura ustunlari ichidagi qatorlar:
       auditoriya aynan shu nomlarni so'raydi, shuning uchun ular ham nuqta */
    [".yechim-s .rq-i > .rb", "rb"], [".arx .u li.b", "kanal"], [".arx .u.yadro li", "yadro"]
  ];
  function nuqtaKalitlari() {
    var natija = [];
    slaydlar.forEach(function (s) {
      var id = s.id || "";
      NUQTA_ROLLARI.forEach(function (r) {
        $$(r[0], s).forEach(function (el, i) {
          var k = el.getAttribute("data-batafsil");
          if (!k && id && !el.closest("[data-slayd]")) {
            k = id + "." + r[1] + (i + 1);
            el.setAttribute("data-batafsil", k);
          }
          if (k) natija.push({ kalit: k, matn: el.textContent.replace(/\s+/g, " ").trim().slice(0, 240) });
        });
      });
    });
    return natija;
  }

  function batafsilBelgila() {
    var B = window.MKB_BATAFSIL || {};
    nuqtaKalitlari();
    $$("[data-batafsil]").forEach(function (el) {
      var k = el.getAttribute("data-batafsil");
      if (!B[k]) return;
      el.classList.add("bor-batafsil");
      if (!/^(BUTTON|A)$/.test(el.tagName)) {
        el.setAttribute("tabindex", "0");
        el.setAttribute("role", "button");
      }
      el.setAttribute("aria-haspopup", "dialog");
      /* nomni elementning o'z matni beradi, shuning uchun takroriy tooltip olib tashlanadi */
      if (el.getAttribute("title") === "Batafsil") el.removeAttribute("title");
      var belgi = document.createElement("span");
      belgi.className = "bf-belgi";
      belgi.setAttribute("aria-hidden", "true");
      belgi.textContent = "+";
      if (el.tagName === "TR") {
        var td = el.cells[0];
        if (td) td.appendChild(belgi);
      } else {
        if (getComputedStyle(el).position === "static") el.style.position = "relative";
        el.appendChild(belgi);
      }
    });
    hisobBelgila();
  }

  /* Matn belgilab turib qo'yib yuborilgan bosish panelni ochmaydi */
  function matnBelgilandi(el) {
    try {
      var t = window.getSelection();
      if (!t || t.isCollapsed || String(t).trim().length < 3) return false;
      return el.contains(t.anchorNode);
    } catch (_) { return false; }
  }

  /* Slaydda nechta blok ochilishi — sarlavha qatoridagi hisob.
     Bosilsa shu slayddagi birinchi blok ochiladi. */
  function hisobBelgila() {
    slaydlar.forEach(function (s) {
      var n = $$(".bor-batafsil", s).length;
      /* slayd o'zi joy ko'rsatsa (data-hisob-joy), yorliq o'sha yerga tushadi;
         aks holda sarlavha qatoriga, u yashirilgan bo'lsa pastki qatorga */
      var joy = $("[data-hisob-joy]", s), oyoqda = false;
      if (!joy) {
        joy = $(".s-bosh .qism", s);
        oyoqda = joy && getComputedStyle(joy).display === "none";
        if (oyoqda) joy = $(".s-oyoq", s);
      }
      if (!n || !joy || $(".bf-son", s)) return;
      var t = document.createElement("button");
      t.type = "button";
      t.className = "bf-son";
      t.innerHTML = '<i aria-hidden="true">+</i><b data-tarjimasiz>' + n + "</b><span>ta batafsil</span>";
      t.addEventListener("click", function (e) {
        e.stopPropagation();
        var bir = $(".bor-batafsil", s);
        if (bir) panelOch(bir);
      });
      if (oyoqda && joy.lastElementChild) joy.insertBefore(t, joy.lastElementChild);
      else joy.appendChild(t);
    });
  }

  /* ---------- Boshqaruv paneli ---------- */
  function boshqaruvQur() {
    var p = document.createElement("nav");
    p.className = "boshqaruv";
    p.setAttribute("aria-label", "Taqdimotni boshqarish");
    p.innerHTML =
      '<button type="button" data-a="orqa" title="Oldingi slayd">' + IK.chap + "</button>" +
      '<span class="joy" data-tarjimasiz><b>01</b> / ' + ikki(jami) + "</span>" +
      '<button type="button" data-a="old" title="Keyingi slayd">' + IK.ong + "</button>" +
      '<span class="ajrat"></span>' +
      '<button type="button" data-a="mundarija" title="Mundarija (M)">' + IK.mundarija + "</button>" +
      '<button type="button" data-a="rejim" title="O\'qish rejimi (S)">' + IK.oqish + "</button>" +
      '<button type="button" data-a="umumiy" title="Barcha slaydlar (O)">' + IK.tor + "</button>" +
      '<button type="button" data-a="ekran" title="To\'liq ekran (F)">' + IK.ekran + "</button>" +
      '<button type="button" data-a="chop" title="PDF sifatida saqlash (P)">' + IK.chop + "</button>" +
      '<span class="bq-yana"><button type="button" data-a="yana" aria-haspopup="true" aria-expanded="false" ' +
        "title=\"Qo'shimcha vositalar\">" + IK.yana + '</button><div class="bq-menyu" hidden></div></span>' +
      '<span class="ajrat"></span>' +
      '<button type="button" data-til="uz">UZ</button><button type="button" data-til="ru">RU</button>';
    document.body.appendChild(p);
    var pr = document.createElement("div");
    pr.className = "progress";
    pr.innerHTML = "<i></i>";
    document.body.appendChild(pr);

    p.addEventListener("click", function (e) {
      var t = e.target.closest("button");
      if (!t) return;
      var a = t.getAttribute("data-a");
      if (a === "orqa") bor(joriy - 1, false, true);
      else if (a === "old") bor(joriy + 1, false, true);
      else if (a === "umumiy") umumiy();
      else if (a === "rejim") rejimQoy(rejim === "oqish" ? "slayd" : "oqish");
      else if (a === "mundarija") mundarijaAlmashtir();
      else if (a === "ekran") toliqEkran();
      else if (a === "chop") chop();
      else if (a === "yana") { e.stopPropagation(); yanaAlmashtir(); }
      var til = t.getAttribute("data-til");
      if (til) { saqla("mkb-til", til); tilQoy(); }
    });
    tilBelgisi();
    qoshimchaKoch();
    /* ma'ruzachi moduli o'z tugmalarini keyinroq qo'shadi — ular ham menyuga tushadi */
    new MutationObserver(qoshimchaKoch).observe(p, { childList: true });
  }

  /* Ma'ruzachi, qisqacha, manba va klavishlar — asosiy qatordan menyuga ko'chiriladi */
  var YANA_NOM = { maruza: "Ma'ruzachi oynasi", qisqa: "Qisqacha bayon", manba: "Manbalar", yordam: "Klavishlar" };
  function qoshimchaKoch() {
    var m = $(".bq-menyu"), q = $(".boshqaruv .bq-qoshimcha");
    if (!m || !q || q.parentNode === m) return;
    m.appendChild(q);
    $$("[data-q]", q).forEach(function (b) {
      if ($("span", b)) return;
      var nom = YANA_NOM[b.getAttribute("data-q")];
      if (nom) b.insertAdjacentHTML("beforeend", "<span>" + nom + "</span>");
    });
    tarjima(m);
  }
  function yanaAlmashtir(yoq) {
    var m = $(".bq-menyu"), t = $(".boshqaruv [data-a=yana]");
    if (!m) return;
    var och = yoq === undefined ? m.hidden : yoq;
    m.hidden = !och;
    if (t) { t.setAttribute("aria-expanded", och ? "true" : "false"); t.classList.toggle("faol", och); }
  }
  function yanaYop() { yanaAlmashtir(false); }

  /* Til almashdi (shu oynada yoki boshqa oynada — storage hodisasi) */
  function tilQoy() {
    tilBelgisi();
    tarjima(document.body);
    if (panelKalit) {
      var ochiqEl = $(".bor-batafsil.tanlangan");
      if (ochiqEl) panelOch(ochiqEl);
    }
    xabar("taqdimot:til", { til: joriyTil() });
  }
  window.addEventListener("storage", function (e) { if (e.key === "mkb-til") tilQoy(); });

  /* PDF: panel va oynalar yopiladi, keyin brauzerning chop etish oynasi */
  function chop() {
    panelYop();
    mundarijaYop();
    yanaYop();
    xabar("taqdimot:chop");
    setTimeout(function () { window.print(); }, 60);
  }

  function tilBelgisi() {
    var t = joriyTil();
    $$(".boshqaruv [data-til]").forEach(function (b) { b.classList.toggle("faol", b.getAttribute("data-til") === t); });
    document.documentElement.lang = t === "ru" ? "ru" : "uz";
    /* blok ustiga kelganda chiqadigan yorliq matni — CSS content uchun */
    document.documentElement.style.setProperty("--bf-soz", t === "ru" ? '"\u041f\u043e\u0434\u0440\u043e\u0431\u043d\u0435\u0435"' : '"Batafsil"');
  }

  /* ---------- Mundarija ---------- */
  function mundarijaQur() {
    mundarijaEl = document.createElement("div");
    mundarijaEl.className = "mundarija-oyna";
    mundarijaEl.setAttribute("role", "dialog");
    mundarijaEl.setAttribute("aria-label", "Mundarija");
    var html = '<div class="mo-bosh"><b>Mundarija</b><button type="button" class="mo-yop" aria-label="Yopish">' + IK.yop + "</button></div><ol>";
    slaydlar.forEach(function (s, i) {
      var bob = s.getAttribute("data-bob");
      if (bob) html += '<li class="mo-bob">' + bob + "</li>";
      var h = s.querySelector("h1, h2");
      var nom = h ? h.textContent.replace(/\s+/g, " ").trim() : (s.getAttribute("data-qism") || "");
      html += '<li><a href="#' + (i + 1) + '" data-slayd="' + (i + 1) + '"><span data-tarjimasiz>' + ikki(i + 1) + "</span>" + nom + "</a></li>";
    });
    mundarijaEl.innerHTML = html + "</ol>";
    document.body.appendChild(mundarijaEl);
    mundarijaEl.querySelector(".mo-yop").addEventListener("click", mundarijaYop);
  }
  function mundarijaAlmashtir() {
    var och = !mundarijaEl.classList.contains("ochiq");
    mundarijaEl.classList.toggle("ochiq", och);
    if (och) {
      $$("a", mundarijaEl).forEach(function (a, i) { a.classList.toggle("joriy", i === joriy); });
      tarjima(mundarijaEl);
      var j = $("a.joriy", mundarijaEl);
      if (j) j.scrollIntoView({ block: "center" });
    }
  }
  function mundarijaYop() { if (mundarijaEl) mundarijaEl.classList.remove("ochiq"); }

  /* ---------- Batafsil panel ---------- */
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
    panelSarlavha = $(".bf-sarlavha", panel);
    panelYorliq = $(".bf-yorliq", panel);
    panelManba = $(".bf-manba", panel);
    panelHisob = $(".bf-hisob", panel);
    panelIlova = $(".bf-chuqur", panel);
    /* Parda slayd ustida turadi. Ostida yana bir batafsil blok bo'lsa, bosish
       panelni yopmasdan o'sha blokka o'tadi: bloklar orasida yurish uchun ikki
       marta bosish kerak emas. */
    $(".bf-parda", panel).addEventListener("click", function (e) {
      var ost = null;
      panel.style.pointerEvents = "none";
      try { ost = document.elementFromPoint(e.clientX, e.clientY); } catch (_) {}
      panel.style.pointerEvents = "";
      var blok = ost && ost.closest ? ost.closest(".bor-batafsil") : null;
      if (blok && !blok.classList.contains("tanlangan")) panelOch(blok);
      else panelYop();
    });
    panel.addEventListener("click", function (e) {
      var t = e.target.closest("[data-bf]");
      if (!t) return;
      var a = t.getAttribute("data-bf");
      if (a === "yop") panelYop();
      else if (a === "keng") kengAlmashtir();
      else panelQadam(a === "old" ? 1 : -1);
    });
    kengAlmashtir(oqi("mkb-batafsil-keng") === "1");
  }

  /* Kengaytirish: shu mazmun o'ng paneldan to'liq ekranli o'qish varag'iga o'tadi */
  function kengAlmashtir(yoq) {
    var k = yoq === undefined ? !panel.classList.contains("keng") : !!yoq;
    panel.classList.toggle("keng", k);
    var t = $("[data-bf=keng]", panel);
    if (t) {
      t.innerHTML = (k ? IK.yigish : IK.kengaytir) + "<span>" + (k ? "Yig'ish" : "Kengaytirish") + "</span>";
      tarjima(t);
    }
    saqla("mkb-batafsil-keng", k ? "1" : "0");
    if (panelTana) panelTana.scrollTop = 0;
  }

  /* Chuqur sahifa: reyestrda manzil bo'lsagina havola chiqadi */
  function chuqurChiz(k) {
    if (!panelIlova) return;
    var x = window.MKB_CHUQUR || {}, s = slaydlar[joriy];
    var manzil = x[k] || (s ? x[s.id] : "") || "";
    panelIlova.innerHTML = manzil
      ? '<a href="' + manzil + '" target="_blank" rel="noopener">' + IK.tashqi + "<span>To'liq sahifada ochish</span></a>"
      : "";
  }

  function slaydNuqtalari() {
    var s = slaydlar[joriy];
    return s ? $$(".bor-batafsil", s) : [];
  }

  function panelOch(el) {
    var k = el.getAttribute("data-batafsil");
    var d = (window.MKB_BATAFSIL || {})[k];
    if (!d) return;
    /* ruscha matn yozuvning o'zida (ru maydoni) turadi: uzun izohlar lug'atdan o'tkazilmaydi */
    if (joriyTil() === "ru" && d.ru) d = {
      yorliq: d.ru.yorliq || d.yorliq, sarlavha: d.ru.sarlavha || d.sarlavha,
      tana: d.ru.tana || d.tana, manba: d.manba
    };
    if (!panel.classList.contains("ochiq")) oldingiFokus = document.activeElement;
    panelKalit = k;
    $$(".bor-batafsil.tanlangan").forEach(function (x) { x.classList.remove("tanlangan"); });
    el.classList.add("tanlangan");
    panelYorliq.textContent = d.yorliq || "Batafsil";
    panelSarlavha.textContent = d.sarlavha || "";
    panelTana.innerHTML = d.tana || "";
    raqamlarQoy(panelTana);
    panelManba.innerHTML = (d.manba && d.manba.length)
      ? "<b>Manba</b>" + d.manba.map(function (m) {
          return '<a href="' + m[1] + '" target="_blank" rel="noopener">' + m[0] + IK.tashqi + "</a>";
        }).join("")
      : "";
    var n = slaydNuqtalari(), i = n.indexOf(el);
    panelHisob.textContent = n.length > 1 ? (i + 1) + " / " + n.length : "";
    $(".bf-yonalish", panel).hidden = n.length < 2;
    $$("[data-bf=orqa],[data-bf=old]", panel).forEach(function (b) { b.hidden = n.length < 2; });
    chuqurChiz(k);
    ishoraTugadi();
    panel.classList.add("ochiq");
    panel.setAttribute("aria-hidden", "false");
    document.body.classList.add("panel-ochiq");
    panelTana.scrollTop = 0;
    tarjima(panel);
    $(".bf-oyna", panel).focus({ preventScroll: true });
  }

  function panelQadam(d) {
    var n = slaydNuqtalari();
    if (!n.length) return;
    var i = n.indexOf($(".bor-batafsil.tanlangan", slaydlar[joriy]));
    panelOch(n[(i + d + n.length) % n.length]);
  }

  function panelYop() {
    if (!panel || !panel.classList.contains("ochiq")) return;
    panel.classList.remove("ochiq");
    panel.setAttribute("aria-hidden", "true");
    document.body.classList.remove("panel-ochiq");
    $$(".bor-batafsil.tanlangan").forEach(function (x) { x.classList.remove("tanlangan"); });
    panelKalit = null;
    if (oldingiFokus && oldingiFokus.focus) oldingiFokus.focus({ preventScroll: true });
  }

  /* Panel ochiq turganda fokus panel ichida qoladi */
  function fokusHalqa(e) {
    var f = $$('a[href],button,[tabindex="0"]', panel).filter(function (x) { return !x.hidden && x.offsetParent !== null; });
    if (!f.length) return;
    var bir = f[0], oxir = f[f.length - 1], faol = document.activeElement;
    if (e.shiftKey && (faol === bir || !panel.contains(faol))) { e.preventDefault(); oxir.focus(); }
    else if (!e.shiftKey && faol === oxir) { e.preventDefault(); bir.focus(); }
  }

  /* ---------- Birinchi tashrif ishorasi ----------
     Hali birorta batafsil ochmagan tomoshabinga dastlabki uch slaydda bir qatorli eslatma. */
  var ISHORA = "mkb-taqdimot-ishora";
  function ishoraQur() {
    if (KADR || MARUZA) return;
    ishoraEl = document.createElement("div");
    ishoraEl.className = "tq-ishora";
    ishoraEl.setAttribute("role", "status");
    ishoraEl.innerHTML = '<i aria-hidden="true">+</i>' +
      "<p>Yashil belgili har bir blok bosiladi</p>" +
      '<button type="button" aria-label="Yopish">' + IK.yop + "</button>";
    ishoraEl.querySelector("button").addEventListener("click", function (e) { e.stopPropagation(); ishoraTugadi(); });
    document.body.appendChild(ishoraEl);
    tarjima(ishoraEl);
  }
  function ishoraKorsat() {
    if (!ishoraEl) return;
    /* slaydda o'z ichki ishorasi bo'lsa (muqovadagi yashil qator), suzuvchi yorliq takrorlanmaydi */
    var kerak = oqi(ISHORA) !== "1" && joriy < 3 && slaydlar[joriy] &&
      $$(".bor-batafsil", slaydlar[joriy]).length > 0 &&
      !$(".muq-ishora, .ishora-inline", slaydlar[joriy]);
    ishoraEl.classList.toggle("ochiq", !!kerak);
  }
  function ishoraTugadi() {
    saqla(ISHORA, "1");
    if (ishoraEl) ishoraEl.classList.remove("ochiq");
  }

  /* ---------- Rejimlar ---------- */
  function olcham() {
    if (rejim !== "slayd" || document.body.classList.contains("umumiy")) return;
    var k = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    lenta.style.transform = "scale(" + k + ")";
  }

  function oqishOlcham() {
    var en = Math.min(window.innerWidth - (window.innerWidth < 700 ? 0 : 48), 1680);
    var k = en / 1920;
    document.documentElement.style.setProperty("--oqish-k", k);
    qutilar.forEach(function (q) { q.style.width = en + "px"; q.style.height = Math.round(1080 * k) + "px"; });
  }

  var kuzatuvchi = null;
  function rejimQoy(r, jim) {
    var eski = joriy;
    rejim = r;
    if (!KADR && !MARUZA) saqla("mkb-taqdimot-rejim", r);
    document.body.classList.toggle("oqish", r === "oqish");
    var tugma = $(".boshqaruv [data-a=rejim]");
    if (tugma) {
      tugma.innerHTML = r === "oqish" ? IK.slayd : IK.oqish;
      tugma.title = r === "oqish" ? "Slayd rejimi (S)" : "O'qish rejimi (S)";
      tugma.setAttribute("data-asl-title", tugma.title);
      tarjima(tugma.parentNode);
    }
    if (kuzatuvchi) { kuzatuvchi.disconnect(); kuzatuvchi = null; }
    if (r === "oqish") {
      lenta.style.transform = "none";
      oqishOlcham();
      slaydlar.forEach(function (s) { s.setAttribute("aria-hidden", "false"); });
      kuzatuvchi = new IntersectionObserver(function (yozuvlar) {
        yozuvlar.forEach(function (y) {
          var s = y.target.querySelector(".slayd");
          if (y.isIntersecting) {
            s.classList.add("faol", "korildi");
            if (y.intersectionRatio > 0.55) belgilaJoriy(qutilar.indexOf(y.target));
          }
        });
      }, { threshold: [0.15, 0.55, 0.9] });
      qutilar.forEach(function (q) { kuzatuvchi.observe(q); });
      if (!jim) requestAnimationFrame(function () { qutilar[eski].scrollIntoView({ block: "start" }); });
    } else {
      qutilar.forEach(function (q) { q.style.width = ""; q.style.height = ""; });
      slaydlar.forEach(function (s) { s.classList.remove("korildi"); });
      olcham();
      if (!jim) bor(eski, true);
    }
  }

  function belgilaJoriy(i) {
    if (i < 0) return;
    joriy = i;
    try { history.replaceState(null, "", location.search + "#" + (i + 1)); } catch (_) {}
    var pr = $(".progress i");
    if (pr) pr.style.width = ((i + 1) / jami * 100) + "%";
    var joy = $(".boshqaruv .joy b");
    if (joy) joy.textContent = ikki(i + 1);
    ishoraKorsat();
    xabar("slayd:joy", { raqam: i + 1, id: slaydlar[i] ? slaydlar[i].id : "" });
  }

  /* ---------- O'tish ---------- */
  /* Slayd rasmlari loading="lazy" bilan yuklanadi. Ma'ruzachi oldinga o'tganda
     rasm endi so'raladi: proyektorda foto paneli bir necha soniya bo'sh turadi
     va chaqiruv yorliqlari kulrang fonda osilib qoladi. Shuning uchun joriy
     slayddan oldingi va keyingi ikkitasining rasmlaridan "lazy" olib tashlanadi —
     brauzer ularni darhol so'raydi, uzoqdagi slaydlar esa lazy bo'lib qolaveradi. */
  function rasmTayyorla(i) {
    for (var j = i - 1; j <= i + 2; j++) {
      if (j < 0 || j >= jami || !slaydlar[j]) continue;
      $$("img[loading='lazy']", slaydlar[j]).forEach(function (im) {
        im.removeAttribute("loading");
        if (im.decode) try { im.decode().catch(function () {}); } catch (_) {}
      });
    }
  }

  function bor(i, birinchi, siljit) {
    if (i < 0 || i >= jami) return;
    panelYop();
    rasmTayyorla(i);
    if (rejim === "oqish") {
      belgilaJoriy(i);
      if (siljit) qutilar[i].scrollIntoView({ block: "start", behavior: birinchi ? "auto" : "smooth" });
      return;
    }
    if (!birinchi && i === joriy && slaydlar[i].classList.contains("faol")) return;
    slaydlar.forEach(function (s, j) {
      s.classList.toggle("faol", j === i);
      s.setAttribute("aria-hidden", j === i ? "false" : "true");
    });
    belgilaJoriy(i);
    document.dispatchEvent(new CustomEvent("slayd:faol", { detail: { raqam: i + 1, el: slaydlar[i] } }));
  }

  function umumiy(yoq) {
    var b = document.body;
    var ochiq = yoq === undefined ? !b.classList.contains("umumiy") : yoq;
    panelYop();
    mundarijaYop();
    b.classList.toggle("umumiy", ochiq);
    if (ochiq) {
      lenta.style.transform = "none";
      qutilar.forEach(function (x) { x.style.width = ""; });
      requestAnimationFrame(function () {
        var en = qutilar.length ? qutilar[0].getBoundingClientRect().width : 360;
        qutilar.forEach(function (x, j) { x.style.height = Math.round(en * 9 / 16) + "px"; x.classList.toggle("joriy", j === joriy); });
        document.documentElement.style.setProperty("--kichik", en / 1920);
        if (qutilar[joriy]) qutilar[joriy].scrollIntoView({ block: "center" });
      });
    } else {
      qutilar.forEach(function (x) { x.style.height = ""; });
      rejimQoy(rejim, true);
      if (rejim === "oqish") requestAnimationFrame(function () { qutilar[joriy].scrollIntoView({ block: "start" }); });
    }
  }

  function toliqEkran() {
    if (!document.fullscreenElement) { (document.documentElement.requestFullscreen || function () {}).call(document.documentElement); }
    else if (document.exitFullscreen) document.exitFullscreen();
  }

  /* ---------- Klaviatura, g'ildirak, sensor ---------- */
  document.addEventListener("keydown", function (e) {
    if (e.target.closest && e.target.closest("input,textarea,select,[contenteditable]")) return;
    /* ma'ruzachi oynasi va ochiq qatlam (qisqacha, manbalar, klavishlar) klavishlarni o'zi boshqaradi */
    if (MARUZA || document.body.classList.contains("qatlam-ochiq")) return;
    var k = e.key;
    var panelda = panel && panel.classList.contains("ochiq");
    if (k === "Escape") {
      if ($(".bq-menyu") && !$(".bq-menyu").hidden) { yanaYop(); return; }
      if (panelda) { panelYop(); return; }
      if (mundarijaEl && mundarijaEl.classList.contains("ochiq")) { mundarijaYop(); return; }
      if (document.body.classList.contains("umumiy")) { umumiy(false); return; }
      return;
    }
    if (panelda) {
      if (k === "Tab") { fokusHalqa(e); return; }
      if (k === "ArrowRight" || k === "ArrowDown") { e.preventDefault(); panelQadam(1); }
      else if (k === "ArrowLeft" || k === "ArrowUp") { e.preventDefault(); panelQadam(-1); }
      return;
    }
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (k === "ArrowRight" || k === "PageDown" || (k === " " && rejim === "slayd") || (k === "ArrowDown" && rejim === "slayd")) { e.preventDefault(); bor(joriy + 1, false, true); }
    else if (k === "ArrowLeft" || k === "PageUp" || (k === "ArrowUp" && rejim === "slayd")) { e.preventDefault(); bor(joriy - 1, false, true); }
    else if (k === "Home") { e.preventDefault(); bor(0, false, true); }
    else if (k === "End") { e.preventDefault(); bor(jami - 1, false, true); }
    else if (k === "o" || k === "O" || k === "щ" || k === "Щ") umumiy();
    else if (k === "s" || k === "S" || k === "ы" || k === "Ы") rejimQoy(rejim === "oqish" ? "slayd" : "oqish");
    else if (k === "m" || k === "M" || k === "ь" || k === "Ь") mundarijaAlmashtir();
    else if (k === "f" || k === "F" || k === "а" || k === "А") toliqEkran();
    else if (k === "p" || k === "P" || k === "з" || k === "З") { e.preventDefault(); chop(); }
  });

  var gildirakVaqt = 0;
  window.addEventListener("wheel", function (e) {
    if (rejim !== "slayd" || document.body.classList.contains("umumiy")) return;
    if (panel && panel.classList.contains("ochiq")) return;
    if (mundarijaEl && mundarijaEl.classList.contains("ochiq")) return;
    if (Math.abs(e.deltaY) < 24) return;
    var hozir = Date.now();
    if (hozir - gildirakVaqt < 700) return;
    gildirakVaqt = hozir;
    bor(joriy + (e.deltaY > 0 ? 1 : -1));
  }, { passive: true });

  var tx = null, ty = null;
  window.addEventListener("touchstart", function (e) { tx = e.touches[0].clientX; ty = e.touches[0].clientY; }, { passive: true });
  window.addEventListener("touchend", function (e) {
    if (tx === null || rejim !== "slayd") { tx = null; return; }
    if (panel && panel.classList.contains("ochiq")) { tx = null; return; }
    var dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) bor(joriy + (dx < 0 ? 1 : -1));
    tx = ty = null;
  }, { passive: true });

  var harakatVaqt;
  document.addEventListener("mousemove", function () {
    document.body.classList.add("harakat");
    clearTimeout(harakatVaqt);
    harakatVaqt = setTimeout(function () { document.body.classList.remove("harakat"); }, 2200);
  });

  window.addEventListener("hashchange", function () {
    var n = parseInt((location.hash || "").replace(/\D/g, ""), 10);
    if (n > 0 && n - 1 !== joriy) bor(n - 1, false, true);
  });

  window.MKB_SLAYD = {
    bor: function (n) { bor(n - 1, false, true); },
    joriy: function () { return joriy + 1; },
    rejim: function (r) { if (r) rejimQoy(r); return rejim; },
    jami: function () { return jami; },
    slaydlar: function () { return slaydlar.slice(); },
    yop: function () { panelYop(); mundarijaYop(); if (document.body.classList.contains("umumiy")) umumiy(false); },
    ekran: toliqEkran,
    chop: function () { chop(); },
    til: joriyTil,
    ikona: IK,
    belgi: function (oq) { return oq ? BELGI_OQ : BELGI; },
    batafsil: function (k) { var el = $('[data-batafsil="' + k + '"]'); if (el) panelOch(el); },
    kengaytir: function (x) { kengAlmashtir(x); return panel.classList.contains("keng"); },
    royxat: function () { return nuqtaKalitlari(); }
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", tayyorla);
  else tayyorla();
})();
