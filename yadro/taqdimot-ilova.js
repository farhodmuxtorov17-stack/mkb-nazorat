/* Taqdimot: ayrim slaydlardagi hisob-kitoblar. */
/* ---- montaj ---- */
/* Montaj bobi: s-korik operator shkalasi va s-quvvat hisoblagichi.
   Matnlar HTML'da turadi, skript faqat raqam va holatni yangilaydi. */
(function () {
  "use strict";

  function son(n, kasr) {
    var s = (kasr ? n.toFixed(kasr) : String(Math.round(n))).split(".");
    s[0] = s[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return s.join(",").replace("-", "−");
  }

  /* ---------- s-korik: RSRP shkalasi ---------- */
  function shkalaJoyi(r) {
    /* to'rt teng bo'lak: -70..-90, -90..-105, -105..-115, -115..-125 */
    var ch = [[-70, -90], [-90, -105], [-105, -115], [-115, -125]];
    for (var i = 0; i < ch.length; i++) {
      var a = ch[i][0], b = ch[i][1];
      if (r >= b || i === ch.length - 1) {
        var t = Math.max(0, Math.min(1, (a - r) / (a - b)));
        return { foiz: (i + t) * 25, zona: i };
      }
    }
    return { foiz: 0, zona: 0 };
  }

  function korik() {
    var s = document.getElementById("s-korik");
    if (!s) return;
    var tugmalar = [].slice.call(s.querySelectorAll(".mj-oper button"));
    var marker = s.querySelector(".mj-marker");
    var zonalar = [].slice.call(s.querySelectorAll(".mj-zonalar > div"));
    function tanla(t) {
      var r = +t.getAttribute("data-rsrp"), q = +t.getAttribute("data-sinr");
      var j = shkalaJoyi(r);
      tugmalar.forEach(function (x) { x.classList.toggle("faol", x === t); x.setAttribute("aria-pressed", x === t ? "true" : "false"); });
      marker.style.left = j.foiz + "%";
      s.querySelector(".mj-rsrp").textContent = son(r);
      s.querySelector(".mj-sinr").textContent = son(q);
      zonalar.forEach(function (z, i) { z.classList.toggle("faol", i === j.zona); });
    }
    tugmalar.forEach(function (t) {
      t.addEventListener("click", function (e) { e.preventDefault(); e.stopPropagation(); tanla(t); });
    });
  }

  /* ---------- s-quvvat: panel va akkumulyator hisoblagichi ---------- */
  function quvvat() {
    var s = document.getElementById("s-quvvat");
    if (!s) return;
    var w = s.querySelector('[data-hisob="w"]'), k = s.querySelector('[data-hisob="kun"]');
    if (!w || !k) return;
    function yoz(n, v) { var el = s.querySelector('[data-hisob-chiq="' + n + '"]'); if (el) el.textContent = v; }
    function hisobla() {
      var vt = +w.value, kun = +k.value;
      var kunlik = vt * 24;
      var wh = kunlik * kun / 0.8;
      /* Panel ikki vazifani bajaradi: kunlik yukni beradi va bo'shagan blokni
         tiklaydi. TIKLASH = akkumulyatorni to'ldirishga beriladigan kun soni;
         usiz panel birinchi uzoq bulutli davrdan keyin blokni ko'tarolmaydi. */
      var TIKLASH = 10;
      var panel = Math.ceil((kunlik + wh / TIKLASH) / (1.62 * 0.7));
      var ah = Math.ceil(wh / 12.8);
      yoz("w", son(vt, vt % 1 ? 1 : 0));
      yoz("kun", son(kun));
      yoz("panel", son(panel));
      yoz("wh", son(Math.round(wh)));
      yoz("ah", son(ah));
    }
    [w, k].forEach(function (i) {
      i.addEventListener("input", hisobla);
      i.addEventListener("click", function (e) { e.stopPropagation(); });
      i.addEventListener("wheel", function (e) { e.stopPropagation(); }, { passive: true });
    });
    hisobla();
  }

  function boshla() { korik(); quvvat(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boshla);
  else boshla();
})();

/* ---- rahbariyat ---- */
/* Rahbariyat guruhi: s-iqtisod slaydidagi kalkulyator.
   Faqat raqamlarni yozadi; barcha yozuvlar HTML ichida (tarjima ishlashi uchun).
   Farazlar slayddagi izoh bilan bir xil: komplekt 5 yilda eskiradi,
   SIM va servis bir obyektga yiliga 3 mln so'm, operatorlar markazi yiliga 240 mln so'm. */
/* Tilga qarab rasm: data-src-ru bo'lsa, RU rejimda shu fayl ko'rsatiladi */
(function () {
  "use strict";
  function qoy() {
    var ru = false;
    try { ru = localStorage.getItem("mkb-til") === "ru"; } catch (_) {}
    [].forEach.call(document.querySelectorAll("img[data-src-ru]"), function (i) {
      if (!i.getAttribute("data-src-uz")) i.setAttribute("data-src-uz", i.getAttribute("src"));
      var k = i.getAttribute(ru ? "data-src-ru" : "data-src-uz");
      if (i.getAttribute("src") !== k) i.setAttribute("src", k);
    });
  }
  document.addEventListener("taqdimot:til", qoy);
  window.addEventListener("storage", function (e) { if (e.key === "mkb-til") qoy(); });
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", qoy); else qoy();
})();

(function () {
  "use strict";
  var MUDDAT = 5, SERVIS = 3, MARKAZ = 240;

  function ishga() {
    var s = document.getElementById("s-iqtisod");
    if (!s) return;
    function el(n) { return s.querySelector('[data-iq="' + n + '"]'); }
    function kir(n) { return s.querySelector('[data-iq-kirit="' + n + '"]'); }

    function bosh(n) {
      var b = String(n).split(".");
      b[0] = b[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      return b.join(",");
    }
    function yoz(n, v) { var e = el(n); if (e) e.textContent = v; }

    function hisobla() {
      var N = +kir("obyekt").value, Q = +kir("qoriq").value, K = +kir("komplekt").value;
      var qoriqYil = N * Q * 12;
      var jihozSarf = N * SERVIS + MARKAZ;              /* yillik ish xarajati */
      var nazoratYil = N * K / MUDDAT + jihozSarf;      /* amortizatsiya bilan */
      var tejash = qoriqYil - nazoratYil;
      var oylikFoyda = (qoriqYil - jihozSarf) / 12;
      ["obyekt", "qoriq", "komplekt"].forEach(function (n) {
        var i = kir(n);
        i.style.setProperty("--t", ((i.value - i.min) / (i.max - i.min) * 100).toFixed(1) + "%");
      });
      yoz("obyekt", bosh(N));
      yoz("qoriq", bosh(Q.toFixed(1)));
      yoz("komplekt", bosh(K));
      yoz("tejash", tejash > 0 ? bosh(Math.round(tejash / 10) * 10) : "0");
      yoz("nazorat", bosh(Math.round(nazoratYil)));
      yoz("qoplash", oylikFoyda > 0 ? bosh((N * K / oylikFoyda).toFixed(1)) : "—");
      /* grafikdagi «Masofaviy nazorat» ustuni ayni shu hisobdan chiqadi */
      var birObyekt = nazoratYil / N;
      yoz("bir", bosh(birObyekt.toFixed(1)));
      var t = s.querySelector('[data-iq-t="bir"]');
      if (t) t.style.width = Math.min(100, birObyekt / 145 * 100).toFixed(1) + "%";
      yoz("karra", bosh((55 / birObyekt).toFixed(1)));
    }

    ["obyekt", "qoriq", "komplekt"].forEach(function (n) {
      var i = kir(n);
      if (!i) return;
      i.addEventListener("input", hisobla);
      /* slayd o'tkazgich klavishlari va bosish panelni ochmasin */
      i.addEventListener("keydown", function (e) { e.stopPropagation(); });
      i.addEventListener("touchend", function (e) { e.stopPropagation(); });
    });
    hisobla();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", ishga);
  else ishga();
})();
