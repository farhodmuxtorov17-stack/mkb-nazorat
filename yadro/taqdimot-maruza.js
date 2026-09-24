/* ============================================================
   taqdimot-maruza.js — taqdimotning ma'ruzachi vositalari.

   N — ma'ruzachi oynasi (joriy va keyingi slayd, izoh, taymer, soat).
       Tomoshabin oynasi bilan BroadcastChannel("mkb-taqdimot") orqali
       sinxron: qaysi oynada o'tilsa, ikkinchisi ham o'tadi.
   Q — rahbariyat uchun qisqacha (window.MKB_QISQA, taqdimot-qisqa.js).
   I — manbalar: window.MKB_BATAFSIL dagi barcha manba havolalari.
   B yoki . — ekranni qoraytirish; ? — klavishlar ro'yxati;
   raqam + Enter — shu raqamli slaydga o'tish; F5 — to'liq ekran.

   Izohlar: window.MKB_IZOH[slaydId] — satr, massiv yoki {uz, ru}.
   Ma'ruzachi oynasi yadro/taqdimot-izoh.js ni o'zi yuklaydi (fayl bo'lsa).
   ============================================================ */
(function () {
  "use strict";

  var PAR = new URLSearchParams(location.search);
  var KADR = PAR.get("kadr") === "1", MARUZA = PAR.get("maruza") === "1";
  if (KADR) return; /* ma'ruzachi oynasidagi slayd ko'rinishi: faqat slayd */

  var S, IK;
  var kanal = null;
  var ochiqQatlam = null, oldingiFokus = null;
  var qora = false;

  function $(s, o) { return (o || document).querySelector(s); }
  function $$(s, o) { return [].slice.call((o || document).querySelectorAll(s)); }
  function ikki(n) { return (n < 10 ? "0" : "") + n; }
  function til() { try { return localStorage.getItem("mkb-til") === "ru" ? "ru" : "uz"; } catch (_) { return "uz"; } }
  function tarjima(el) { if (window.tarjimaQil) window.tarjimaQil(el || document.body); }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function svg(d, q) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + (q || 2) +
      '" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + d + "</svg>";
  }
  var IKON = {
    maruza: svg('<rect x="2.5" y="4" width="12" height="9" rx="1.5"/><path d="M8.5 13v3M5.5 16h6"/><rect x="16.5" y="4" width="5" height="4" rx="1"/><path d="M17 11h4M17 14h4"/>'),
    qisqa: svg('<rect x="4" y="3.5" width="16" height="17" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>'),
    manba: svg('<path d="M5 4.5h9l5 5v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-14a1 1 0 0 1 1-1z"/><path d="M14 4.5v5h5M8 14h8M8 17h5"/>'),
    yordam: svg('<rect x="2.5" y="6" width="19" height="12" rx="2"/><path d="M6 10h1M9.5 10h1M13 10h1M16.5 10h1M7 14h10"/>'),
    qora: svg('<rect x="3" y="5" width="18" height="12" rx="2"/><path d="M3 5l18 12"/><path d="M8 21h8"/>'),
    taymer: svg('<circle cx="12" cy="13" r="7.5"/><path d="M12 9v4l2.5 2M9.5 2.5h5"/>'),
    pauza: svg('<path d="M9 6v12M15 6v12"/>', 2.4),
    boshla: svg('<path d="M8 5.5v13l10-6.5z"/>'),
    qayta: svg('<path d="M4 12a8 8 0 1 0 2.4-5.7M4 4.5v4h4"/>'),
    kichik: svg('<path d="M5 12h14"/>', 2.4),
    katta: svg('<path d="M12 5v14M5 12h14"/>', 2.4)
  };

  /* ---------- Umumiy qatlam (modal oyna) ---------- */
  function qatlamQur(sinf, sarlavha, yorliq) {
    var q = document.createElement("div");
    q.className = "qatlam " + sinf;
    q.setAttribute("role", "dialog");
    q.setAttribute("aria-modal", "true");
    q.setAttribute("aria-hidden", "true");
    q.setAttribute("aria-label", sarlavha);
    q.innerHTML =
      '<div class="ql-parda" data-ql-yop></div>' +
      '<div class="ql-oyna" tabindex="-1">' +
        '<div class="ql-bosh">' +
          '<div class="ql-nom">' + (yorliq ? '<span class="ql-yorliq">' + yorliq + "</span>" : "") + "<h2>" + sarlavha + "</h2></div>" +
          '<button type="button" class="ql-yop" data-ql-yop aria-label="Yopish" title="Yopish (Esc)">' + IK.yop + "</button>" +
        "</div>" +
        '<div class="ql-tana"></div>' +
      "</div>";
    document.body.appendChild(q);
    q.addEventListener("click", function (e) {
      if (e.target.closest("[data-ql-yop]")) { qatlamYop(); return; }
      /* slaydga havola: dvigatel o'tkazadi, qatlam yopiladi */
      if (e.target.closest("[data-slayd]")) qatlamYop();
    });
    return q;
  }

  function qatlamOch(q, tayyorla) {
    if (ochiqQatlam === q) { qatlamYop(); return; }
    if (ochiqQatlam) qatlamYop(true);
    S.yop();
    oldingiFokus = document.activeElement;
    if (tayyorla) tayyorla();
    tarjima(q);
    ochiqQatlam = q;
    q.classList.add("ochiq");
    q.setAttribute("aria-hidden", "false");
    document.body.classList.add("qatlam-ochiq");
    var t = $(".ql-tana", q);
    if (t) t.scrollTop = 0;
    $(".ql-oyna", q).focus({ preventScroll: true });
  }

  function qatlamYop(jim) {
    if (!ochiqQatlam) return;
    ochiqQatlam.classList.remove("ochiq");
    ochiqQatlam.setAttribute("aria-hidden", "true");
    ochiqQatlam = null;
    document.body.classList.remove("qatlam-ochiq");
    if (!jim && oldingiFokus && oldingiFokus.focus) oldingiFokus.focus({ preventScroll: true });
  }

  /* Fokus qatlam ichida aylanadi (Tab) */
  function fokusTutish(e) {
    if (!ochiqQatlam || e.key !== "Tab") return;
    var f = $$('a[href],button:not([disabled]),input,[tabindex="0"]', ochiqQatlam).filter(function (x) { return x.offsetParent !== null; });
    if (!f.length) return;
    var bir = f[0], oxir = f[f.length - 1];
    if (e.shiftKey && document.activeElement === bir) { e.preventDefault(); oxir.focus(); }
    else if (!e.shiftKey && document.activeElement === oxir) { e.preventDefault(); bir.focus(); }
  }

  /* ---------- Slayd ma'lumoti ---------- */
  function slaydRoyxati() { return S.slaydlar(); }
  function slaydRaqami(id) {
    var r = slaydRoyxati();
    for (var i = 0; i < r.length; i++) if ("#" + r[i].id === id || r[i].id === id) return i + 1;
    return 0;
  }
  function slaydNomi(s) {
    if (!s) return "";
    var h = s.querySelector("h1, h2");
    return h ? h.textContent.replace(/\s+/g, " ").trim() : (s.getAttribute("data-qism") || "");
  }

  /* ---------- Q: rahbariyat uchun qisqacha ---------- */
  var qisqaEl;
  function qisqaChiz() {
    var Q = (window.MKB_QISQA || {})[til()] || (window.MKB_QISQA || {}).uz;
    var tana = $(".ql-tana", qisqaEl);
    if (!Q) { tana.innerHTML = ""; return; }
    $(".ql-yorliq", qisqaEl).textContent = Q.yorliq;
    $(".ql-nom h2", qisqaEl).textContent = Q.sarlavha;
    function havola(id, matn, sinf) {
      var n = slaydRaqami(id);
      return '<a href="#' + n + '" data-slayd="' + id + '" class="' + (sinf || "qs-havola") + '" data-tarjimasiz>' +
        esc(matn) + ' <span class="qs-n">' + ikki(n) + "</span></a>";
    }
    var h = '<p class="qs-lid" data-tarjimasiz>' + esc(Q.lid) + "</p><div class=\"qs-bloklar\">";
    Q.bloklar.forEach(function (b, i) {
      h += '<article class="qs-blok" data-tarjimasiz>' +
        '<div class="qs-bosh"><span class="qs-tartib">' + ikki(i + 1) + "</span><b>" + esc(b.nom) + "</b></div>" +
        '<div class="qs-raqam">' + esc(b.raqam) + "<small>" + esc(b.birlik) + "</small></div>" +
        "<p>" + esc(b.matn) + "</p>" +
        '<div class="qs-havolalar">' + havola(b.slayd, Q.slaydSoz, "qs-havola asosiy") +
        (b.qoshimcha || []).map(function (x) { return havola(x[1], x[0]); }).join("") + "</div>" +
        "</article>";
    });
    h += "</div>";
    var R = Q.qaror;
    h += '<div class="qs-qaror" data-tarjimasiz><div class="qs-qaror-bosh"><small>' + esc(R.nom) + "</small><ol>" +
      R.bandlar.map(function (b) { return "<li>" + esc(b) + "</li>"; }).join("") + "</ol></div>" +
      '<div class="qs-qaror-havola">' + havola(R.slayd, Q.bloklar[4].nom, "qs-havola oq") + havola(R.havolaSlayd, R.havola, "qs-havola oq") + "</div></div>";
    tana.innerHTML = h;
  }
  function qisqaOch() { qatlamOch(qisqaEl, qisqaChiz); }

  /* ---------- I: manbalar ---------- */
  var manbaEl;
  function manbaYigish() {
    var B = window.MKB_BATAFSIL || {};
    var slaydlar = slaydRoyxati();
    var idRaqam = {};
    slaydlar.forEach(function (s, i) { idRaqam[s.id] = i; });
    var korildi = {}, guruh = {}, jami = 0;
    Object.keys(B).forEach(function (k) {
      var d = B[k];
      if (!d || !d.manba || !d.manba.length) return;
      var sid = k.split(".")[0];
      if (!(sid in idRaqam)) {
        var el = document.querySelector('[data-batafsil="' + k.replace(/"/g, '\\"') + '"]');
        var s = el && el.closest(".slayd");
        sid = s ? s.id : "";
      }
      var gi = sid in idRaqam ? idRaqam[sid] : 999;
      d.manba.forEach(function (m) {
        if (!m || !m[1]) return;
        var url = String(m[1]).trim();
        var kalit = url.replace(/^https?:\/\/(www\.)?/, "").replace(/[#?].*$/, "").replace(/\/$/, "").toLowerCase();
        if (korildi[kalit]) { korildi[kalit].marta++; return; }
        var y = { nom: m[0] || url, url: url, marta: 1, kalit: k };
        korildi[kalit] = y;
        (guruh[gi] = guruh[gi] || []).push(y);
        jami++;
      });
    });
    return { guruh: guruh, jami: jami, slaydlar: slaydlar };
  }
  function domen(u) { try { return new URL(u).hostname.replace(/^www\./, ""); } catch (_) { return ""; } }
  function manbaChiz() {
    var M = manbaYigish();
    var tartib = Object.keys(M.guruh).map(Number).sort(function (a, b) { return a - b; });
    var h = '<div class="mb-qidiruv"><input type="search" placeholder="Manba yoki sayt nomi" aria-label="Manba yoki sayt nomi">' +
      '<span class="mb-son"><span>Manbalar:</span> <b data-tarjimasiz>' + M.jami + "</b> <span>· slaydlar:</span> <b data-tarjimasiz>" + tartib.length + "</b></span></div>" +
      '<div class="mb-royxat">';
    tartib.forEach(function (gi) {
      var s = M.slaydlar[gi];
      h += '<section class="mb-guruh"><h3>' +
        (s ? '<a href="#' + (gi + 1) + '" data-slayd="' + (gi + 1) + '"><span data-tarjimasiz>' + ikki(gi + 1) + "</span>" + esc(slaydNomi(s)) + "</a>" : "<span>Umumiy</span>") +
        "</h3><ul>";
      M.guruh[gi].forEach(function (y) {
        h += '<li><a href="' + esc(y.url) + '" target="_blank" rel="noopener noreferrer">' +
          '<span class="mb-nom">' + esc(y.nom) + "</span>" +
          '<span class="mb-domen" data-tarjimasiz>' + esc(domen(y.url)) + IK.tashqi + "</span></a></li>";
      });
      h += "</ul></section>";
    });
    h += '</div><p class="mb-bosh-yoq" hidden>Hech narsa topilmadi</p>';
    $(".ql-tana", manbaEl).innerHTML = h;
    var inp = $("input", manbaEl);
    inp.addEventListener("input", function () {
      var q = inp.value.trim().toLowerCase(), bor = 0;
      $$(".mb-guruh", manbaEl).forEach(function (g) {
        var kor = 0;
        $$("li", g).forEach(function (li) {
          var mos = !q || li.textContent.toLowerCase().indexOf(q) >= 0;
          li.hidden = !mos;
          if (mos) kor++;
        });
        g.hidden = !kor;
        bor += kor;
      });
      $(".mb-bosh-yoq", manbaEl).hidden = bor > 0;
    });
  }
  function manbaOch() { qatlamOch(manbaEl, manbaChiz); }

  /* ---------- ?: klavishlar ---------- */
  var yordamEl;
  var KLAVISH = [
    ["O'tish", [
      [["→", "PageDown", "Probel"], "Keyingi slayd"],
      [["←", "PageUp"], "Oldingi slayd"],
      [["Home", "End"], "Birinchi va oxirgi slayd"],
      [["12", "Enter"], "Raqamli slaydga o'tish"]
    ]],
    ["Ko'rinish", [
      [["M"], "Mundarija"],
      [["O"], "Barcha slaydlar"],
      [["S"], "O'qish rejimi"],
      [["F"], "To'liq ekran"],
      [["B", "."], "Ekranni qoraytirish"]
    ]],
    ["Ma'ruzachi", [
      [["N"], "Ma'ruzachi oynasi"],
      [["Q"], "Rahbariyat uchun qisqacha"],
      [["I"], "Manbalar"],
      [["P"], "PDF sifatida saqlash"],
      [["?"], "Klavishlar ro'yxati"],
      [["Esc"], "Oynani yopish"]
    ]]
  ];
  function yordamChiz() {
    var h = '<div class="ky-ustunlar">';
    KLAVISH.forEach(function (g) {
      h += '<section><h3>' + g[0] + "</h3><dl>";
      g[1].forEach(function (r) {
        h += "<div><dt>" + r[0].map(function (k) { return (k === "Probel" ? "<kbd>" : "<kbd data-tarjimasiz>") + esc(k) + "</kbd>"; }).join("") + "</dt><dd>" + r[1] + "</dd></div>";
      });
      h += "</dl></section>";
    });
    h += '</div><p class="ky-izoh">Taqdimot pulti ham ishlaydi: PageUp, PageDown va B tugmalari.</p>';
    $(".ql-tana", yordamEl).innerHTML = h;
  }
  function yordamOch() { qatlamOch(yordamEl, yordamChiz); }

  /* ---------- Qora ekran ---------- */
  var qoraEl;
  function qoraQoy(v, jim) {
    qora = v === undefined ? !qora : !!v;
    if (!qoraEl) {
      qoraEl = document.createElement("div");
      qoraEl.className = "qora-ekran";
      qoraEl.innerHTML = "<span>Ekran qoraytirilgan · B</span>";
      qoraEl.addEventListener("click", function () { qoraQoy(false); });
      document.body.appendChild(qoraEl);
      tarjima(qoraEl);
    }
    qoraEl.classList.toggle("ochiq", qora);
    if (!jim) joyYubor();
  }

  /* ---------- Raqam + Enter ---------- */
  var raqamBufer = "", raqamVaqt, raqamEl;
  function raqamKorsat() {
    if (!raqamEl) {
      raqamEl = document.createElement("div");
      raqamEl.className = "raqam-ter";
      raqamEl.setAttribute("aria-live", "polite");
      document.body.appendChild(raqamEl);
    }
    raqamEl.textContent = raqamBufer ? "→ " + raqamBufer : "";
    raqamEl.classList.toggle("ochiq", !!raqamBufer);
  }

  /* ---------- Xabar (toast) ---------- */
  function toast(matn) {
    var t = document.createElement("div");
    t.className = "tq-toast";
    t.textContent = matn;
    document.body.appendChild(t);
    tarjima(t);
    requestAnimationFrame(function () { t.classList.add("ochiq"); });
    setTimeout(function () { t.classList.remove("ochiq"); setTimeout(function () { t.remove(); }, 400); }, 3600);
  }

  /* ---------- Kanal: tomoshabin va ma'ruzachi oynalari ---------- */
  function kanalOch(qabul) {
    try { kanal = new BroadcastChannel("mkb-taqdimot"); } catch (_) { kanal = null; }
    if (kanal) kanal.onmessage = function (e) { qabul(e.data || {}); };
  }
  function yubor(x) { if (kanal) try { kanal.postMessage(x); } catch (_) {} }
  function joyYubor() { yubor({ t: "joy", n: S.joriy(), qora: qora }); }

  /* ---------- N: ma'ruzachi oynasini ochish ---------- */
  var maruzaOyna = null;
  function maruzaOch() {
    var url = location.pathname + "?maruza=1#" + S.joriy();
    if (maruzaOyna && !maruzaOyna.closed) { maruzaOyna.focus(); return; }
    maruzaOyna = window.open(url, "mkb-maruza", "width=1440,height=860,menubar=no,toolbar=no,location=no");
    if (!maruzaOyna) toast("Brauzer yangi oynani to'sdi. Manzil satrida ruxsat bering.");
  }

  /* ---------- Tomoshabin oynasi ---------- */
  function tomoshabin() {
    /* boshqaruv paneliga tugmalar */
    var p = $(".boshqaruv");
    if (p) {
      var chop = $("[data-a=chop]", p);
      var t = document.createElement("span");
      t.className = "bq-qoshimcha";
      t.innerHTML =
        '<button type="button" data-q="maruza" title="Ma\'ruzachi oynasi (N)">' + IKON.maruza + "</button>" +
        '<button type="button" data-q="qisqa" title="Rahbariyat uchun qisqacha (Q)">' + IKON.qisqa + "</button>" +
        '<button type="button" data-q="manba" title="Manbalar (I)">' + IKON.manba + "</button>" +
        '<button type="button" data-q="yordam" title="Klavishlar (?)">' + IKON.yordam + "</button>";
      if (chop && chop.nextSibling) p.insertBefore(t, chop.nextSibling); else p.appendChild(t);
      t.addEventListener("click", function (e) {
        var b = e.target.closest("[data-q]");
        if (!b) return;
        var a = b.getAttribute("data-q");
        if (a === "maruza") maruzaOch();
        else if (a === "qisqa") qisqaOch();
        else if (a === "manba") manbaOch();
        else if (a === "yordam") yordamOch();
      });
      tarjima(t);
    }

    qisqaEl = qatlamQur("qisqa-oyna", "Taqdimot bir sahifada", "Rahbariyat uchun");
    manbaEl = qatlamQur("manba-oyna", "Manbalar", "Batafsil panellardagi havolalar");
    yordamEl = qatlamQur("yordam-oyna", "Klavishlar", "Taqdimotni boshqarish");
    [qisqaEl, manbaEl, yordamEl].forEach(function (q) { tarjima(q); });

    document.addEventListener("taqdimot:til", function () {
      if (ochiqQatlam === qisqaEl) qisqaChiz();
      if (ochiqQatlam) tarjima(ochiqQatlam);
    });
    document.addEventListener("taqdimot:chop", function () { qatlamYop(true); qoraQoy(false, true); });

    kanalOch(function (x) {
      if (x.t === "bor" && x.n) { if (x.n !== S.joriy()) S.bor(x.n); else joyYubor(); }
      else if (x.t === "qora") qoraQoy(x.v);
      else if (x.t === "sorov") joyYubor();
    });
    document.addEventListener("slayd:joy", joyYubor);

    /* havola bilan ochish: taqdimot.html?ochiq=qisqa — raisga yuboriladigan manzil */
    var och = PAR.get("ochiq");
    if (och) setTimeout(function () {
      if (och === "qisqa") qisqaOch();
      else if (och === "manba") manbaOch();
      else if (och === "klavish") yordamOch();
    }, 0);

    document.addEventListener("keydown", function (e) {
      if (e.target.closest && e.target.closest("input,textarea,select,[contenteditable]")) {
        if (e.key === "Escape" && ochiqQatlam) { e.target.blur(); qatlamYop(); }
        return;
      }
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      var k = e.key;
      fokusTutish(e);
      if (ochiqQatlam) {
        if (k === "Escape") { e.preventDefault(); qatlamYop(); return; }
        var qk = k.toLowerCase();
        if ((qk === "q" || qk === "й") && ochiqQatlam === qisqaEl) { qatlamYop(); return; }
        if ((qk === "i" || qk === "ш") && ochiqQatlam === manbaEl) { qatlamYop(); return; }
        if ((k === "?" || qk === "h" || qk === "р") && ochiqQatlam === yordamEl) { qatlamYop(); return; }
        return;
      }
      if (qora && (k === "Escape" || k === "b" || k === "B" || k === "." || k === "и" || k === "И" || k === "ю")) { e.preventDefault(); qoraQoy(false); return; }
      if (qora && /^(ArrowRight|ArrowLeft|PageDown|PageUp| )$/.test(k)) qoraQoy(false);
      if (/^[0-9]$/.test(k)) {
        raqamBufer = (raqamBufer + k).slice(-2);
        clearTimeout(raqamVaqt);
        raqamVaqt = setTimeout(function () { raqamBufer = ""; raqamKorsat(); }, 2200);
        raqamKorsat();
        return;
      }
      if (k === "Enter" && raqamBufer) {
        e.preventDefault();
        var n = +raqamBufer;
        raqamBufer = ""; raqamKorsat();
        if (n >= 1 && n <= S.jami()) { S.yop(); S.bor(n); }
        return;
      }
      if (k === "Backspace" && raqamBufer) { raqamBufer = raqamBufer.slice(0, -1); raqamKorsat(); return; }
      var l = k.toLowerCase();
      if (l === "n" || l === "т") { e.preventDefault(); maruzaOch(); }
      else if (l === "q" || l === "й") { e.preventDefault(); qisqaOch(); }
      else if (l === "i" || l === "ш") { e.preventDefault(); manbaOch(); }
      else if (k === "?" || l === "h" || l === "р") { e.preventDefault(); yordamOch(); }
      else if (l === "b" || k === "." || l === "и" || k === "ю") { e.preventDefault(); qoraQoy(); }
      else if (k === "F5") { e.preventDefault(); S.ekran(); }
    });
  }

  /* ============================================================
     Ma'ruzachi oynasi (?maruza=1)
     ============================================================ */
  function maruzachi() {
    var jami = S.jami(), n = Math.max(1, Math.min(jami, parseInt((location.hash || "").replace(/\D/g, ""), 10) || 1));
    var aloqa = false, boshVaqt = Date.now(), toxtagan = 0, pauzada = false, slaydBosh = Date.now();
    var shrift = 22;
    try { shrift = +localStorage.getItem("mkb-maruza-shrift") || 22; } catch (_) {}
    /* reja vaqti: butun taqdimot uchun daqiqa, 0 — reja yo'q */
    var reja = 20;
    try { var rj = localStorage.getItem("mkb-maruza-reja"); if (rj !== null && +rj >= 0) reja = +rj; } catch (_) {}
    var nishon = [];
    function TT(u, r) { return til() === "ru" ? r : u; }
    /* mundarijadagi «Rahbariyat» o'qish yo'li: bu slaydlar majlisda albatta ko'rsatiladi */
    var rahbarYol = {};
    $$('[data-panel="rahbar"] a[data-slayd]').forEach(function (a) {
      var id = (a.getAttribute("data-slayd") || "").replace(/^#/, "");
      if (id) rahbarYol[id] = true;
    });
    /* har slaydning reja vaqti: data-vaqt bo'lsa shu og'irlik, bo'lmasa teng ulush */
    function nishonHisob() {
      var r = slaydRoyxati(), w = [], s = 0, i;
      for (i = 0; i < r.length; i++) { var d = +r[i].getAttribute("data-vaqt") || 1; w.push(d); s += d; }
      nishon = [];
      for (i = 0; i < w.length; i++) nishon.push(s > 0 ? reja * 60 * w[i] / s : 0);
    }

    document.title = "Ma'ruzachi oynasi — MKBANK";
    var baza = location.pathname + "?kadr=1#";
    var tanlov = slaydRoyxati().map(function (s, i) {
      return '<option value="' + (i + 1) + '">' + ikki(i + 1) + " · " + esc(slaydNomi(s)) + "</option>";
    }).join("");

    var m = document.createElement("div");
    m.className = "mz";
    m.innerHTML =
      '<header class="mz-bosh">' +
        '<div class="mz-brend">' + S.belgi(true) + '<span class="mz-nom">Ma\'ruzachi oynasi</span></div>' +
        '<label class="mz-tanlov"><span class="yashir">Slaydni tanlash</span><select aria-label="Slaydni tanlash">' + tanlov + "</select></label>" +
        '<div class="mz-aloqa" data-holat="yoq"><i></i><span class="mz-aloqa-yoq">Tomoshabin oynasi ulanmagan</span><span class="mz-aloqa-bor">Tomoshabin oynasi bilan sinxron</span></div>' +
        '<div class="mz-vaqt">' +
          '<label class="mz-reja"><small class="mz-reja-n"></small><select class="mz-reja-s" aria-label="Reja vaqti"></select></label>' +
          '<div class="mz-taymer" title="Taqdimot boshidan"><small>O\'tgan vaqt</small><b data-tarjimasiz>00:00</b><em class="mz-temp" hidden></em></div>' +
          '<button type="button" data-m="pauza" class="mz-kichik-t" title="To\'xtatish yoki davom ettirish (T)">' + IKON.pauza + "</button>" +
          '<button type="button" data-m="nol" class="mz-kichik-t" title="Taymerni nolga qaytarish (R)">' + IKON.qayta + "</button>" +
          '<div class="mz-soat"><small>Soat</small><b data-tarjimasiz>--:--</b></div>' +
        "</div>" +
        '<div class="mz-til"><button type="button" data-til="uz">UZ</button><button type="button" data-til="ru">RU</button></div>' +
      "</header>" +
      '<div class="mz-asosiy">' +
        '<section class="mz-joriy">' +
          '<div class="mz-kadr-bosh"><small>Hozir ekranda</small><b class="mz-hisob" data-tarjimasiz></b><em class="mz-yol"></em><span class="mz-slaydda"><span>Slaydda</span><b class="mz-slaydda-v" data-tarjimasiz></b></span></div>' +
          '<div class="mz-kadr"><iframe title="Joriy slayd" tabindex="-1"></iframe></div>' +
          '<div class="mz-yurish">' +
            '<button type="button" data-m="orqa">' + IK.chap + "<span>Oldingi slayd</span></button>" +
            '<div class="mz-reyka"><i></i></div>' +
            '<button type="button" data-m="qora" class="mz-qora">' + IKON.qora + "<span>Qora ekran</span><kbd data-tarjimasiz>B</kbd></button>" +
            '<button type="button" data-m="old" class="mz-asosiy-t"><span>Keyingi slayd</span>' + IK.ong + "</button>" +
          "</div>" +
        "</section>" +
        '<aside class="mz-yon">' +
          '<div class="mz-keyingi"><div class="mz-kadr-bosh"><small>Keyingi slayd</small><b class="mz-keyingi-nom"></b></div>' +
            '<div class="mz-kadr kichik"><iframe title="Keyingi slayd" tabindex="-1"></iframe><div class="mz-oxir" hidden><b>Oxirgi slayd</b><span>Keyin savol-javob</span></div></div></div>' +
          '<div class="mz-izoh">' +
            '<div class="mz-izoh-bosh"><small>Ma\'ruzachi izohi</small>' +
              '<button type="button" data-m="kichik" title="Kichikroq shrift">' + IKON.kichik + "</button>" +
              '<button type="button" data-m="katta" title="Kattaroq shrift">' + IKON.katta + "</button></div>" +
            '<div class="mz-izoh-matn"></div><button type="button" class="mz-izoh-davom" data-m="davom" hidden></button>' +
          "</div>" +
        "</aside>" +
      "</div>" +
      '<footer class="mz-oyoq"><span><kbd data-tarjimasiz>← →</kbd> slaydlar</span><span><kbd data-tarjimasiz>B</kbd> qora ekran</span>' +
        '<span><kbd data-tarjimasiz>T</kbd> taymer</span><span><kbd data-tarjimasiz>R</kbd> nolga</span><span><kbd data-tarjimasiz>+ −</kbd> izoh shrifti</span></footer>';
    document.body.appendChild(m);

    var fJoriy = $(".mz-joriy iframe", m), fKeyingi = $(".mz-keyingi iframe", m);
    var sel = $("select", m);
    fJoriy.src = baza + n;
    fKeyingi.src = baza + Math.min(jami, n + 1);

    function kadrgaBor(f, k) {
      try {
        var w = f.contentWindow;
        if (w && w.MKB_SLAYD) { w.MKB_SLAYD.bor(k); return; }
      } catch (_) {}
      f.src = baza + k;
    }

    function izohMatni(s) {
      var I = window.MKB_IZOH || {}, x = s ? I[s.id] : null, t = til();
      if (x && typeof x === "object" && !Array.isArray(x)) x = x[t] || x.uz || null;
      if (Array.isArray(x)) return "<ul>" + x.map(function (b) { return "<li>" + b + "</li>"; }).join("") + "</ul>";
      if (typeof x === "string" && x.trim()) {
        return /<(p|ul|ol|div)\b/i.test(x) ? x : x.split(/\n{2,}|\n/).map(function (p) { return "<p>" + p + "</p>"; }).join("");
      }
      /* izoh yozilmagan: slayd sarlavhasi va lidi eslatma bo'lib turadi */
      var lid = s ? s.querySelector(".lid") : null;
      return '<p class="mz-izoh-yoq">Bu slaydga izoh yozilmagan. Slayd matni:</p>' +
        "<p><b>" + esc(slaydNomi(s)) + "</b></p>" + (lid ? "<p>" + esc(lid.textContent.replace(/\s+/g, " ").trim()) + "</p>" : "");
    }

    function chiz() {
      var r = slaydRoyxati(), s = r[n - 1], kel = r[n];
      $(".mz-hisob", m).textContent = ikki(n) + " / " + ikki(jami);
      $(".mz-reyka i", m).style.width = (n / jami * 100) + "%";
      sel.value = String(n);
      $(".mz-keyingi-nom", m).textContent = kel ? ikki(n + 1) + " · " + slaydNomi(kel) : "";
      $(".mz-oxir", m).hidden = !!kel;
      fKeyingi.style.visibility = kel ? "visible" : "hidden";
      var yb = $(".mz-yol", m);
      var yolda = !!(s && rahbarYol[s.id]);
      yb.textContent = yolda ? TT("Rahbariyat yo'li", "Путь руководства") : TT("O'tkazish mumkin", "Можно пропустить");
      yb.classList.toggle("bor", yolda);
      var iz = $(".mz-izoh-matn", m);
      iz.innerHTML = izohMatni(s);
      iz.style.fontSize = shrift + "px";
      iz.scrollTop = 0;
      if ($(".mz-izoh-yoq", m)) tarjima(iz);
      izohBelgi();
      setTimeout(izohBelgi, 40);
      /* slayd nomlari joriy tilda (lug'at deck matnini o'girgandan keyin) */
      $$("option", sel).forEach(function (o, i) { o.textContent = ikki(i + 1) + " · " + slaydNomi(r[i]); });
      $("[data-m=orqa]", m).disabled = n <= 1;
      $("[data-m=old]", m).disabled = n >= jami;
      try { history.replaceState(null, "", location.search + "#" + n); } catch (_) {}
    }

    function bor(k, jim) {
      k = Math.max(1, Math.min(jami, k));
      if (k === n && !jim) return;
      if (k !== n) slaydBosh = Date.now();
      n = k;
      kadrgaBor(fJoriy, n);
      if (n < jami) kadrgaBor(fKeyingi, n + 1);
      chiz();
      if (!jim) yubor({ t: "bor", n: n });
    }

    function qoraBelgi() { $("[data-m=qora]", m).classList.toggle("faol", qora); }

    function mmss(ms) {
      var s = Math.floor(ms / 1000), h = Math.floor(s / 3600), mi = Math.floor(s % 3600 / 60), se = s % 60;
      return (h ? h + ":" + ikki(mi) : ikki(mi)) + ":" + ikki(se);
    }
    function vaqt() {
      var hozir = Date.now();
      var otgan = pauzada ? toxtagan : hozir - boshVaqt;
      $(".mz-taymer b", m).textContent = mmss(otgan);
      $(".mz-taymer", m).classList.toggle("pauza", pauzada);
      var d = new Date();
      $(".mz-soat b", m).textContent = ikki(d.getHours()) + ":" + ikki(d.getMinutes());
      var slaydda = hozir - slaydBosh, nish = reja > 0 ? (nishon[n - 1] || 0) : 0;
      var sv = $(".mz-slaydda-v", m);
      sv.textContent = nish > 0 ? mmss(slaydda) + " / " + mmss(nish * 1000) : mmss(slaydda);
      sv.classList.toggle("oshgan", nish > 0 && slaydda > nish * 1000);
      /* temp: shu slaydga qadar rejada qancha vaqt ketishi kerak edi */
      var tp = $(".mz-temp", m);
      if (reja <= 0) { tp.hidden = true; return; }
      var kutilgan = 0;
      for (var i = 0; i < n - 1; i++) kutilgan += nishon[i] || 0;
      var farq = Math.round(otgan / 1000 - kutilgan);
      tp.hidden = false;
      tp.classList.toggle("ortda", farq > 60);
      tp.classList.toggle("oldinda", farq < -60);
      if (Math.abs(farq) < 30) tp.textContent = TT("reja bo'yicha", "по плану");
      else tp.textContent = mmss(Math.abs(farq) * 1000) + " " + (farq > 0 ? TT("ortda", "отставание") : TT("oldinda", "запас"));
    }
    /* izoh paneli: matn sig'masa, pastda «davomi» belgisi va soya chiqadi */
    function izohBelgi() {
      var iz = $(".mz-izoh-matn", m), q = $(".mz-izoh", m), db = $(".mz-izoh-davom", m);
      if (!iz || !q || !db) return;
      var bor = iz.scrollHeight - iz.clientHeight > 6;
      var pastda = iz.scrollTop + iz.clientHeight >= iz.scrollHeight - 6;
      var kor = bor && !pastda;
      q.classList.toggle("uzun", kor);
      db.hidden = !kor;
      db.textContent = TT("davomi bor", "есть продолжение");
    }
    function pauza() {
      if (pauzada) { boshVaqt = Date.now() - toxtagan; pauzada = false; }
      else { toxtagan = Date.now() - boshVaqt; pauzada = true; }
      $("[data-m=pauza]", m).innerHTML = pauzada ? IKON.boshla : IKON.pauza;
      vaqt();
    }
    function nolga() {
      tasdiq("Taymer nolga qaytarilsinmi?", "O'tgan vaqt va slayddagi vaqt 00:00 dan boshlanadi.", "Nolga qaytarish", function () {
        boshVaqt = Date.now(); toxtagan = 0; slaydBosh = Date.now();
        if (pauzada) pauza();
        vaqt();
      });
    }
    function shriftQoy(d) {
      shrift = Math.max(16, Math.min(40, shrift + d));
      try { localStorage.setItem("mkb-maruza-shrift", shrift); } catch (_) {}
      $(".mz-izoh-matn", m).style.fontSize = shrift + "px";
      izohBelgi();
    }
    /* reja ro'yxati: 0 — reja yo'q, qolganlari daqiqada */
    function rejaChiz() {
      var s = $(".mz-reja-s", m);
      $(".mz-reja-n", m).textContent = TT("Reja", "План");
      s.innerHTML = [0, 15, 20, 30, 45, 60].map(function (v) {
        var nom = v === 0 ? TT("reja yo'q", "без плана") : v + " " + TT("daq", "мин");
        return '<option value="' + v + '"' + (v === reja ? " selected" : "") + ">" + nom + "</option>";
      }).join("");
    }
    function tilBelgi() {
      document.title = til() === "ru" ? "Окно докладчика — MKBANK" : "Ma'ruzachi oynasi — MKBANK";
      $$(".mz-til [data-til]", m).forEach(function (b) { b.classList.toggle("faol", b.getAttribute("data-til") === til()); });
      rejaChiz();
    }

    m.addEventListener("click", function (e) {
      var b = e.target.closest("[data-m]");
      var tl = e.target.closest("[data-til]");
      if (tl) {
        try { localStorage.setItem("mkb-til", tl.getAttribute("data-til")); } catch (_) {}
        /* storage hodisasi boshqa oynalarga yetadi, bu oyna o'zini yangilaydi */
        tarjima(document.body); tilBelgi(); chiz();
        return;
      }
      if (!b) return;
      var a = b.getAttribute("data-m");
      if (a === "orqa") bor(n - 1);
      else if (a === "old") bor(n + 1);
      else if (a === "qora") { qora = !qora; qoraBelgi(); yubor({ t: "qora", v: qora }); }
      else if (a === "pauza") pauza();
      else if (a === "nol") nolga();
      else if (a === "kichik") shriftQoy(-2);
      else if (a === "katta") shriftQoy(2);
      else if (a === "davom") { var iz = $(".mz-izoh-matn", m); iz.scrollTop += iz.clientHeight * 0.85; }
    });
    sel.addEventListener("change", function () { bor(+sel.value); sel.blur(); });
    $(".mz-reja-s", m).addEventListener("change", function () {
      reja = +this.value || 0;
      try { localStorage.setItem("mkb-maruza-reja", String(reja)); } catch (_) {}
      nishonHisob(); vaqt(); this.blur();
    });
    $(".mz-izoh-matn", m).addEventListener("scroll", izohBelgi);
    window.addEventListener("resize", izohBelgi);

    document.addEventListener("keydown", function (e) {
      if ($(".tasdiq.ochiq")) return;
      if (e.target.closest && e.target.closest("select,input")) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      var k = e.key, l = k.toLowerCase();
      if (/^(ArrowRight|ArrowDown|PageDown| |Enter)$/.test(k)) { e.preventDefault(); bor(n + 1); }
      else if (/^(ArrowLeft|ArrowUp|PageUp|Backspace)$/.test(k)) { e.preventDefault(); bor(n - 1); }
      else if (k === "Home") { e.preventDefault(); bor(1); }
      else if (k === "End") { e.preventDefault(); bor(jami); }
      else if (l === "b" || k === "." || l === "и" || k === "ю") { e.preventDefault(); qora = !qora; qoraBelgi(); yubor({ t: "qora", v: qora }); }
      else if (l === "t" || l === "е") pauza();
      else if (l === "r" || l === "к") nolga();
      else if (k === "+" || k === "=") shriftQoy(2);
      else if (k === "-" || k === "_") shriftQoy(-2);
      else if (k === "F5") e.preventDefault();
    });

    kanalOch(function (x) {
      if (x.t === "joy") {
        aloqa = true;
        $(".mz-aloqa", m).setAttribute("data-holat", "bor");
        qora = !!x.qora; qoraBelgi();
        if (x.n && x.n !== n) bor(x.n, true);
      }
    });
    yubor({ t: "sorov" });
    /* ulanish holati: tomoshabin oynasi yopilsa, belgi o'chadi */
    setInterval(function () {
      if (!aloqa) $(".mz-aloqa", m).setAttribute("data-holat", "yoq");
      aloqa = false;
      yubor({ t: "sorov" });
    }, 4000);

    document.addEventListener("taqdimot:til", function () { tilBelgi(); chiz(); });

    function izohYuklandi() { chiz(); }
    if (!window.MKB_IZOH) {
      var sc = document.createElement("script");
      sc.src = "yadro/taqdimot-izoh.js?v=" + Date.now().toString(36);
      sc.onload = izohYuklandi;
      sc.onerror = function () {};
      document.head.appendChild(sc);
    }

    tarjima(m);
    nishonHisob();
    tilBelgi();
    chiz();
    setTimeout(chiz, 60);
    window.addEventListener("load", function () { nishonHisob(); chiz(); });
    vaqt();
    setInterval(vaqt, 1000);
  }

  /* ---------- Tasdiq oynasi ---------- */
  function tasdiq(sarlavha, matn, tugma, ha) {
    var t = document.createElement("div");
    t.className = "tasdiq ochiq";
    t.setAttribute("role", "alertdialog");
    t.setAttribute("aria-modal", "true");
    t.innerHTML = '<div class="ts-oyna"><b>' + esc(sarlavha) + "</b><p>" + esc(matn) + "</p>" +
      '<div class="ts-tugmalar"><button type="button" data-ts="yoq">Bekor qilish</button>' +
      '<button type="button" data-ts="ha" class="ts-asosiy">' + esc(tugma) + "</button></div></div>";
    document.body.appendChild(t);
    tarjima(t);
    var hab = $("[data-ts=ha]", t);
    hab.focus();
    function yop() { document.removeEventListener("keydown", kl, true); t.remove(); }
    function kl(e) {
      if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); yop(); }
      else if (e.key === "Enter") { e.preventDefault(); e.stopPropagation(); yop(); ha(); }
    }
    document.addEventListener("keydown", kl, true);
    t.addEventListener("click", function (e) {
      var b = e.target.closest("[data-ts]");
      if (e.target === t || (b && b.getAttribute("data-ts") === "yoq")) yop();
      else if (b) { yop(); ha(); }
    });
  }

  function boshla() {
    S = window.MKB_SLAYD;
    if (!S) return;
    IK = S.ikona;
    if (MARUZA) maruzachi(); else tomoshabin();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boshla);
  else boshla();
})();
