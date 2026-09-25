/* ============================================================
   ux.js — ish qulayligi (UX shartnomasi, 2–12-bo'limlar)
   MKB.tasdiqla · MKB.band · MKB.sahifaYukla · jarayon chizig'i · MKB.qaytarish ·
   MKB.formaQoriqla (qoralama) · MKB.formaTekshir / MKB.formaUla (data-format) ·
   buyruqlar oynasi (Ctrl+K, /) va MKB_AMALLAR · tugmalar ro'yxati (?) · MKB.yaqinda ·
   sessiya muddati · aloqa uzilishi · MKB.yangilanganBelgi · MKB.csvImport ·
   MKB.sayohat · yordam paneli · chop etish sarlavhasi
   Sahifalar bu mantiqni o'zi yozmaydi, faqat shu funksiyalarni chaqiradi.
   Qobiq (app.js) bu faylni avtomatik ulaydi.
   ============================================================ */

/* ---------- Sof mantiq: DOMsiz, testlar shu qismni tekshiradi ---------- */
window.MKB_UX_SOF = (function(){
  "use strict";
  const ikki = n => String(n).padStart(2, "0");
  const guruhla = butun => String(butun).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  const SON_FORMAT = ["pul", "son", "kasr", "foiz"];
  const BIRLIK = {pul: " mln so'm", foiz: "%"};

  /* Son ko'rinishi: "1 234,5" — ko'pi bilan maxKasr xona, oxirgi nollar tashlanadi */
  function sonMatn(n, maxKasr){
    if (n == null || !Number.isFinite(Number(n))) return "";
    const k = maxKasr == null ? 2 : maxKasr;
    const r = Number(n);
    const [b, kasr] = Math.abs(r).toFixed(k).split(".");
    const k2 = (kasr || "").replace(/0+$/, "");
    return (r < 0 && (+b || +k2) ? "-" : "") + guruhla(b) + (k2 ? "," + k2 : "");
  }
  /* Yozish paytida: faqat ruxsat etilgan belgilar, nuqta vergulga aylanadi */
  function tozala(format, v){
    v = String(v == null ? "" : v);
    switch (format){
      case "pul": case "kasr": case "foiz": {
        v = v.replace(/\./g, ",").replace(/[^\d,\s]/g, "");
        const i = v.indexOf(",");
        if (i >= 0) v = v.slice(0, i + 1) + v.slice(i + 1).replace(/[,\s]/g, "");
        return v.replace(/\s+/g, " ").replace(/^\s+/, "");
      }
      case "son": return v.replace(/[^\d\s]/g, "").replace(/\s+/g, " ").replace(/^\s+/, "");
      case "tel": return v.replace(/[^\d+\s()-]/g, "").slice(0, 20);
      case "pinfl": return v.replace(/\D/g, "").slice(0, 14);
      case "stir": return v.replace(/\D/g, "").slice(0, 9);
      case "kadastr": return v.replace(/[^\d:\/\s.-]/g, "").slice(0, 40);
      default: return v;
    }
  }
  /* Qiymat: son formatlari Number (noto'g'ri bo'lsa NaN), qolganlari satr; bo'sh — null */
  function ajrat(format, v){
    const s = String(v == null ? "" : v).trim();
    if (!s) return null;
    if (SON_FORMAT.indexOf(format) >= 0){
      const t = s.replace(/\s/g, "").replace(",", ".");
      if (format === "son") return /^\d+$/.test(t) ? parseInt(t, 10) : NaN;
      return /^\d+(\.\d+)?$/.test(t) ? parseFloat(t) : NaN;
    }
    if (format === "tel"){
      let d = s.replace(/\D/g, "");
      if (d.length === 9) d = "998" + d;
      return /^998\d{9}$/.test(d) ? "+" + d : s;
    }
    if (format === "pinfl" || format === "stir") return s.replace(/\D/g, "");
    if (format === "kadastr") return s.replace(/\s*[\s.\-]\s*/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
    return s;
  }
  /* Maydondan chiqqanda ko'rinish */
  function korinish(format, v, kasr){
    const q = ajrat(format, v);
    if (q == null) return "";
    if (SON_FORMAT.indexOf(format) >= 0){
      if (!Number.isFinite(q)) return String(v).trim();
      return sonMatn(q, format === "son" ? 0 : format === "kasr" ? (kasr == null ? 2 : kasr) : format === "foiz" ? 2 : 2);
    }
    if (format === "tel"){
      const m = /^\+998(\d{2})(\d{3})(\d{2})(\d{2})$/.exec(q);
      return m ? "+998 " + m[1] + " " + m[2] + " " + m[3] + " " + m[4] : String(v).trim();
    }
    return q;
  }
  /* Format bo'yicha xato matni ("" — to'g'ri). Bo'sh qiymat bu yerda tekshirilmaydi (majburiylik alohida) */
  function formatXatosi(format, v, o){
    o = o || {};
    const q = ajrat(format, v);
    if (q == null) return "";
    const birlik = BIRLIK[format] || "";
    if (SON_FORMAT.indexOf(format) >= 0){
      if (!Number.isFinite(q)) return format === "son" ? "Butun son kiriting" : "Raqam bilan kiriting, masalan 1 234,5";
      const min = o.min != null && o.min !== "" ? Number(o.min) : null;
      const max = o.max != null && o.max !== "" ? Number(o.max) : (format === "foiz" ? 100 : null);
      if (min != null && Number.isFinite(min) && q < min) return "Kamida " + sonMatn(min) + birlik;
      if (max != null && Number.isFinite(max) && q > max) return sonMatn(max) + birlik + " dan oshmasin";
      return "";
    }
    if (format === "tel") return /^\+998\d{9}$/.test(q) ? "" : "Telefon raqamini +998 90 123 45 67 ko'rinishida kiriting";
    if (format === "pinfl") return q.length === 14 ? "" : "PINFL 14 ta raqamdan iborat";
    if (format === "stir") return q.length === 9 ? "" : "STIR 9 ta raqamdan iborat";
    if (format === "kadastr") return /^\d{2}(:\d{2,4}){3,5}(\/\d+)?$/.test(q) ? "" : "Kadastr raqamini 10:07:05:03:01:0012 ko'rinishida kiriting";
    return "";
  }
  /* Katta summa uchun izoh: 1234,5 mln -> "= 1,23 mlrd so'm" */
  function pulIzoh(n){
    if (!Number.isFinite(n) || n < 1000) return "";
    return "= " + sonMatn(n / 1000, 2) + " mlrd so'm";
  }
  const isoOqi = v => { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(v || "")); return m ? new Date(+m[1], +m[2] - 1, +m[3]) : null; };
  const isoYoz = d => d.getFullYear() + "-" + ikki(d.getMonth() + 1) + "-" + ikki(d.getDate());
  const nuqtali = d => ikki(d.getDate()) + "." + ikki(d.getMonth() + 1) + "." + d.getFullYear();
  /* Sana (input type=date qiymati) tekshiruvi. o: {min, max, bugun: "yyyy-mm-dd", dan: boshlanish qiymati} */
  function sanaXatosi(v, o){
    o = o || {};
    if (!v) return "";
    const d = isoOqi(v);
    if (!d) return "Sanani kiriting";
    const bugun = o.bugun || null;
    if (o.max){
      const mx = isoOqi(o.max);
      if (mx && d > mx) return o.max === bugun ? "Sana bugundan keyin bo'lishi mumkin emas" : "Sana " + nuqtali(mx) + " dan keyin bo'lishi mumkin emas";
    }
    if (o.min){
      const mn = isoOqi(o.min);
      if (mn && d < mn) return o.min === bugun ? "Rejalashtirilgan sana o'tgan bo'lishi mumkin emas" : "Sana " + nuqtali(mn) + " dan oldin bo'lishi mumkin emas";
    }
    if (o.dan){
      const b = isoOqi(o.dan);
      if (b && d < b) return o.danXato || "Tugash sanasi boshlanish sanasidan oldin bo'lishi mumkin emas";
    }
    return "";
  }
  const kichikHarf = s => String(s == null ? "" : s).replace(/[‘’ʼʻ`´]/g, "'").toLowerCase();
  /* Ruscha so'zning lug'at shakli interfeysdagi shakldan farq qiladi ("решение" — "Решения"),
     shuning uchun 4 harfdan uzun bo'lakning oxirgi qo'shimchasi tashlab ham qidiriladi */
  const ozak = w => (w.length > 4 ? w.replace(/(ями|ами|ия|ии|ие|ый|ой|ам|ах|ов|ы|и|е|а|я|у|ю|о|ь)$/, "") : w);
  function mosmi(matnlar, q){
    const s = kichikHarf(q).trim();
    if (!s) return true;
    const qismlar = s.split(/\s+/);
    const m = matnlar.filter(x => x != null).map(kichikHarf).join(" ");
    return qismlar.every(x => m.indexOf(x) >= 0 || m.indexOf(ozak(x)) >= 0);
  }
  /* Yozuv raqami: AK-2026/3775, LT-2026/0012, TS-2026/0042, GH-2026-00012 */
  const aniqIdmi = q => /^[A-Za-z]{1,4}-\d{4}[\/-]\d{2,6}$/.test(String(q || "").trim());
  function yaqindaQosh(royxat, band, maks){
    const r = (Array.isArray(royxat) ? royxat : []).filter(x => x && !(x.tur === band.tur && String(x.id) === String(band.id)));
    return [band].concat(r).slice(0, maks || 12);
  }
  const eskirdimi = (vaqtMs, hozir, kun) => !vaqtMs || hozir - vaqtMs > (kun || 7) * 864e5;
  function qoldiMatn(ms){
    const s = Math.max(0, Math.ceil(ms / 1000));
    return Math.floor(s / 60) + ":" + ikki(s % 60);
  }
  /* CSV: ";" yoki "," ajratgich, qo'shtirnoq ichidagi ajratgich va yangi qator */
  function ajratgichTop(matn){
    const birinchi = String(matn || "").split(/\r?\n/)[0] || "";
    const n = c => (birinchi.match(new RegExp("\\" + c, "g")) || []).length;
    return n(";") >= n(",") ? ";" : ",";
  }
  function csvAjrat(matn, ajr){
    matn = String(matn || "").replace(/^\uFEFF/, "");
    ajr = ajr || ajratgichTop(matn);
    const qatorlar = []; let qator = [], kat = "", qosh = false;
    for (let i = 0; i < matn.length; i++){
      const c = matn[i];
      if (qosh){
        if (c === '"'){ if (matn[i + 1] === '"'){ kat += '"'; i++; } else qosh = false; }
        else kat += c;
      } else if (c === '"') qosh = true;
      else if (c === ajr){ qator.push(kat); kat = ""; }
      else if (c === "\n" || c === "\r"){
        if (c === "\r" && matn[i + 1] === "\n") i++;
        qator.push(kat); kat = "";
        if (qator.some(x => x.trim() !== "")) qatorlar.push(qator);
        qator = [];
      } else kat += c;
    }
    qator.push(kat);
    if (qator.some(x => x.trim() !== "")) qatorlar.push(qator);
    return qatorlar;
  }
  /* Fayl sarlavhalari -> ustun kaliti: nom yoki kalit bo'yicha (katta-kichik harf va apostrof farqsiz) */
  function ustunMoslash(sarlavhalar, ustunlar){
    const norm = x => kichikHarf(x).replace(/[^a-z0-9а-яё']+/gi, "");
    const h = (sarlavhalar || []).map(norm);
    const r = {};
    (ustunlar || []).forEach(u => {
      let i = h.indexOf(norm(u.nom));
      if (i < 0) i = h.indexOf(norm(u.kalit));
      if (i < 0) i = h.findIndex(x => x && (x.indexOf(norm(u.nom)) >= 0 || norm(u.nom).indexOf(x) >= 0));
      r[u.kalit] = i;
    });
    return r;
  }
  /* Ichki havola xavfsizmi: shu saytdagi sahifa, protokol va domensiz */
  const xavfsizQaytish = q => /^[a-z0-9-]+\.html(\?[^#\s<>"']*)?(#[\w-]*)?$/i.test(String(q || "")) && !/^(kirish|index|xato-)/.test(String(q));
  return {sonMatn, tozala, ajrat, korinish, formatXatosi, pulIzoh, sanaXatosi, isoOqi, isoYoz, nuqtali, mosmi, aniqIdmi,
    yaqindaQosh, eskirdimi, qoldiMatn, ajratgichTop, csvAjrat, ustunMoslash, xavfsizQaytish, BIRLIK, SON_FORMAT};
})();

(function(){
  "use strict";
  if (typeof document === "undefined" || !window.MKB || window.MKB.palitra) return;
  const MKB = window.MKB;
  const SOF = window.MKB_UX_SOF;
  const D = () => window.MKB_DATA || {};
  const e_ = typeof esc === "function" ? esc : (m => String(m == null ? "" : m).replace(/[&<>"']/g, c => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"})[c]));
  const ik_ = (n, k) => (typeof ik === "function" ? ik(n, k) : "");
  const tarjima = el => { if (typeof tarjimaQil === "function" && el) tarjimaQil(el); };
  const sessiya = () => (window.MKBapi ? MKBapi.sessiya() : null);
  const login = () => (sessiya() || {}).login || "-";
  const kalit = nom => (window.MKBapi ? MKBapi.kalit(nom) : nom);
  const kamHarakat = () => !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
  const fayl = () => (typeof faylNomi === "function" ? faylNomi() : (location.pathname.split("/").pop() || "panel.html"));
  const ruxsat = h => (typeof sahifaRuxsatlimi === "function" ? sahifaRuxsatlimi(h) : true);
  const kutish = ms => new Promise(r => setTimeout(r, ms));
  const lsOqi = (k, asl) => { try{ const v = localStorage.getItem(k); return v == null ? asl : JSON.parse(v); }catch(_){ return asl; } };
  const lsYoz = (k, v) => { try{ localStorage.setItem(k, JSON.stringify(v)); return true; }catch(_){ return false; } };
  const ssOqi = (k, asl) => { try{ const v = sessionStorage.getItem(k); return v == null ? asl : JSON.parse(v); }catch(_){ return asl; } };
  const ssYoz = (k, v) => { try{ if (v == null) sessionStorage.removeItem(k); else sessionStorage.setItem(k, JSON.stringify(v)); }catch(_){ } };
  const soatMatn = d => String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0");
  const sanaVaqt = d => SOF.nuqtali(d) + " " + soatMatn(d);
  let sanoq = 0;
  const yangiId = p => "ux-" + p + "-" + (++sanoq);
  const inertQil = els => (typeof fonniInertQil === "function" ? fonniInertQil(els) : () => {});
  const tut = (e, joy) => { if (typeof fokusniTut === "function") fokusniTut(e, joy); };
  const ochiqDialogBormi = () => !!document.querySelector(".modal-parda, dialog[open], .yon-panel.ochiq, .sayohat-qatlam");

  /* ============================================================
     3.1 MKB.band — tugma band holati
     ============================================================ */
  const bandlar = new WeakMap();
  /* Ekran o'quvchi uchun yagona jonli mintaqa: band tugma matnining o'zi o'qilmaydi (u aria-disabled bo'ladi) */
  let elonEl = null;
  function elon(matn){
    if (!document.body) return;
    if (!elonEl || !elonEl.isConnected){
      elonEl = document.createElement("div");
      elonEl.className = "sr-only ux-elon";
      elonEl.setAttribute("role", "status");
      elonEl.setAttribute("aria-live", "polite");
      document.body.appendChild(elonEl);
    }
    elonEl.textContent = "";
    if (matn) setTimeout(() => { if (elonEl) { elonEl.textContent = matn; tarjima(elonEl); } }, 30);
  }
  MKB.elon = elon;
  MKB.band = function(tugma, ish){
    const bajar = () => (typeof ish === "function" ? ish() : ish);
    if (!tugma || !tugma.nodeType) return Promise.resolve().then(bajar);
    if (bandlar.has(tugma)) return bandlar.get(tugma);
    const boshlandi = Date.now();
    const eskiDisabled = tugma.disabled;
    const forma = tugma.closest("form");
    const qoshni = forma ? Array.from(forma.querySelectorAll('button[type="submit"], button:not([type]), input[type="submit"]'))
      .filter(b => b !== tugma && !b.disabled) : [];
    const ikonka = tugma.querySelector(":scope > svg.ic");
    const aylana = document.createElement("span");
    aylana.className = "aylana";
    aylana.setAttribute("aria-hidden", "true");
    /* Fokus tugmada qoladi: disabled o'rniga aria-disabled (takroriy bosish yuqoridagi navbat bilan to'xtatiladi) */
    const eskiAria = tugma.getAttribute("aria-disabled");
    const fokusdaEdi = document.activeElement === tugma;
    tugma.setAttribute("aria-disabled", "true");
    tugma.setAttribute("aria-busy", "true");
    tugma.classList.add("band");
    if (!ikonka) tugma.style.minWidth = tugma.offsetWidth + "px";
    if (ikonka){ ikonka.style.display = "none"; tugma.insertBefore(aylana, ikonka); } else tugma.insertBefore(aylana, tugma.firstChild);
    elon("Bajarilmoqda");
    /* Band paytida takroriy bosish (sichqoncha ham, Enter ham) ishlamaydi, lekin tugma fokusda qoladi */
    const tiy = e => { e.preventDefault(); e.stopImmediatePropagation(); };
    tugma.addEventListener("click", tiy, true);
    qoshni.forEach(b => { b.disabled = true; });
    const p = (async () => {
      try{ return await bajar(); }
      finally{
        const q = 300 - (Date.now() - boshlandi);
        if (q > 0) await kutish(q);
        aylana.remove();
        tugma.removeEventListener("click", tiy, true);
        if (ikonka) ikonka.style.display = "";
        tugma.style.minWidth = "";
        tugma.disabled = eskiDisabled;
        if (eskiAria == null) tugma.removeAttribute("aria-disabled"); else tugma.setAttribute("aria-disabled", eskiAria);
        tugma.removeAttribute("aria-busy");
        tugma.classList.remove("band");
        qoshni.forEach(b => { b.disabled = false; });
        bandlar.delete(tugma);
        elon("");
        if (fokusdaEdi && document.contains(tugma)) tugma.focus();
      }
    })();
    bandlar.set(tugma, p);
    return p;
  };

  /* ============================================================
     2. MKB.tasdiqla — tasdiqlash oynasi
     ============================================================ */
  let tasdiqlaNavbat = Promise.resolve();
  MKB.tasdiqla = function(o){
    const natija = tasdiqlaNavbat.then(() => tasdiqlaOch(o || {}));
    tasdiqlaNavbat = natija.catch(() => null);
    return natija;
  };
  function tasdiqlaOch(o){
    return new Promise(hal => {
      const xavfli = o.ton === "xavfli";
      const oldingi = document.activeElement;
      const sid = yangiId("ts"), mid = yangiId("tm");
      const s = o.sabab && typeof o.sabab === "object" ? Object.assign({min: 0, maks: 500}, o.sabab) : null;
      if (s && s.majburiy && !s.min) s.min = 5;
      const qiymatHTML = v => {
        if (v && typeof v === "object") return v.tarjimasiz ? '<span data-tarjimasiz>' + e_(v.matn) + "</span>" : e_(v.matn);
        const m = String(v == null ? "—" : v);
        return /^[\d\s.,−–+-]/.test(m) ? '<span data-tarjimasiz>' + e_(m) + "</span>" : e_(m);
      };
      /* Oqibat qatori: matn; {matn, tarjimasiz}; yoki {nom, oldin, keyin} — "Narx: 1 200 → 1 080" (qiymatlar o'girilmaydi) */
      const oqibatHTML = x => {
        if (!x || typeof x !== "object") return e_(x);
        if ("oldin" in x || "keyin" in x)
          return (x.nom ? "<span>" + e_(x.nom) + "</span>: " : "") + qiymatHTML(x.oldin) + ' <span aria-hidden="true">→</span> ' + qiymatHTML(x.keyin);
        return x.tarjimasiz ? '<span data-tarjimasiz>' + e_(x.matn) + "</span>" : "<span>" + e_(x.matn) + "</span>";
      };
      /* Tasdiqlashdan oldin tanlanadigan qiymatlar: [{nom, yorliq, tur:"sana"|"tanlov"|"son"|"matn", qiymat, variantlar, majburiy, min, max, izoh, tekshir}] */
      const mlar = (Array.isArray(o.maydonlar) ? o.maydonlar : []).filter(m => m && m.nom);
      const isoga = v => { const m = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(String(v || "")); return m ? m[3] + "-" + m[2] + "-" + m[1] : String(v || ""); };
      const maydonHTML = m => {
        const id = sid + "-m-" + String(m.nom).replace(/[^\w-]/g, "_");
        const tur = m.tur === "date" ? "sana" : m.tur === "select" ? "tanlov" : m.tur === "number" ? "son" : m.tur || "matn";
        const talab = m.majburiy ? " required" : "";
        let kirish;
        if (tur === "tanlov"){
          const v = (m.variantlar || []).map(x => Array.isArray(x) ? x : (x && typeof x === "object" ? [x.qiymat != null ? x.qiymat : x.id, x.nom != null ? x.nom : x.matn] : [x, x]));
          kirish = '<span class="kirish"><select id="' + id + '" name="' + e_(m.nom) + '"' + talab + ">" + (m.majburiy && m.qiymat == null ? '<option value="">Tanlang</option>' : "") +
            v.map(p => '<option value="' + e_(p[0]) + '">' + e_(p[1]) + "</option>").join("") + "</select></span>";
        } else {
          const t = tur === "sana" ? "date" : tur === "son" ? "number" : "text";
          kirish = '<span class="kirish"><input id="' + id + '" name="' + e_(m.nom) + '" type="' + t + '"' + talab +
            (m.min != null ? ' min="' + e_(t === "date" ? isoga(m.min) : m.min) + '"' : "") + (m.max != null ? ' max="' + e_(t === "date" ? isoga(m.max) : m.max) + '"' : "") +
            (m.format ? ' data-format="' + e_(m.format) + '"' : "") + ' autocomplete="off"></span>';
        }
        return '<div class="maydon"><label class="maydon-yorliq" for="' + id + '">' + e_(m.yorliq || m.nom) + (m.majburiy ? " <b>*</b>" : "") + "</label>" + kirish +
          (m.izoh ? '<span class="maydon-izoh">' + e_(m.izoh) + "</span>" : "") + "</div>";
      };
      const parda = document.createElement("div");
      parda.className = "modal-parda ochiq tasdiqla-parda";
      parda.innerHTML =
        '<div class="modal tasdiqla" role="' + (xavfli ? "alertdialog" : "dialog") + '" aria-modal="true" aria-labelledby="' + sid + '" aria-describedby="' + mid + '">' +
          '<div class="modal-bosh"><h3 id="' + sid + '"></h3>' +
          '<button type="button" class="modal-yop" aria-label="Yopish">' + ik_("yopish") + "</button></div>" +
          '<div class="modal-tana">' +
            '<p class="tasdiqla-matn" id="' + mid + '"></p>' +
            (Array.isArray(o.tafsilot) && o.tafsilot.length ? '<dl class="malumot-royxat tasdiqla-tafsilot">' +
              o.tafsilot.map(r => "<dt>" + e_(r[0]) + "</dt><dd>" + qiymatHTML(r[1]) + "</dd>").join("") + "</dl>" : "") +
            (Array.isArray(o.oqibat) && o.oqibat.length ? '<div class="tasdiqla-oqibat"><b>Nima o&#39;zgaradi</b><ul>' +
              o.oqibat.map(x => "<li>" + oqibatHTML(x) + "</li>").join("") + "</ul></div>" : "") +
            (mlar.length ? '<div class="tasdiqla-maydonlar">' + mlar.map(maydonHTML).join("") + "</div>" : "") +
            (s ? '<div class="maydon tasdiqla-sabab"><label class="maydon-yorliq" for="' + sid + '-s">' + e_(s.yorliq || "Sabab") + (s.majburiy ? " <b>*</b>" : "") + "</label>" +
              '<textarea class="kirish-matn" id="' + sid + '-s" maxlength="' + s.maks + '"' + (s.majburiy ? " required" : "") +
                (s.namuna ? ' placeholder="' + e_(s.namuna) + '"' : "") + ' aria-describedby="' + sid + '-si"></textarea>' +
              '<div class="tasdiqla-sabab-past" id="' + sid + '-si">' + (s.izoh ? "<span>" + e_(s.izoh) + "</span>" : "<span></span>") +
                '<span class="tasdiqla-sanoq" data-tarjimasiz>0 / ' + s.maks + "</span></div></div>" : "") +
            (o.yozibTasdiq ? '<div class="maydon tasdiqla-yozish"><label class="maydon-yorliq" for="' + sid + '-y"><span>Tasdiqlash uchun yozing:</span> <b class="kod-mono" data-tarjimasiz>' +
              e_(o.yozibTasdiq) + '</b></label><span class="kirish"><input id="' + sid + '-y" autocomplete="off" spellcheck="false"></span></div>' : "") +
            '<div class="tasdiqla-xato" role="alert" hidden></div>' +
          "</div>" +
          '<div class="modal-oyoq">' +
            '<button type="button" class="tugma tugma-oq" data-t="bekor"></button>' +
            '<button type="button" class="tugma ' + (xavfli ? "tugma-xavf" : "tugma-asosiy") + '" data-t="ok"></button>' +
          "</div></div>";
      parda.querySelector("h3").textContent = o.sarlavha || "Amalni tasdiqlang";
      parda.querySelector(".tasdiqla-matn").textContent = o.matn || "";
      const bekor = parda.querySelector('[data-t="bekor"]'), ok = parda.querySelector('[data-t="ok"]');
      bekor.textContent = o.bekorMatn || "Bekor qilish";
      ok.innerHTML = (xavfli ? ik_("xavf") : ik_("tasdiq")) + "<span></span>";
      ok.querySelector("span").textContent = o.okMatn || "Tasdiqlash";
      /* maydonlarning boshlang'ich qiymati (matn sifatida, HTML ga qo'shilmaydi) */
      const mEl = mlar.map(m => {
        const el = parda.querySelector('.tasdiqla-maydonlar [name="' + (window.CSS && CSS.escape ? CSS.escape(m.nom) : m.nom) + '"]');
        if (el && m.qiymat != null) el.value = el.type === "date" ? isoga(m.qiymat) : String(m.qiymat);
        return {m, el};
      }).filter(x => x.el);
      document.body.appendChild(parda);
      tarjima(parda);
      if (mEl.length) MKB.formaUla(parda.querySelector(".tasdiqla-maydonlar"));
      const modal = parda.querySelector(".modal");
      const ta = parda.querySelector(".tasdiqla-sabab textarea"), yi = parda.querySelector(".tasdiqla-yozish input"), xatoEl = parda.querySelector(".tasdiqla-xato");
      const sanoqEl = parda.querySelector(".tasdiqla-sanoq");
      const fonQaytar = inertQil([parda]);
      let yopildi = false, ishlamoqda = false;
      const yaroqli = () => {
        if (s && ta && ta.value.replace(/\s/g, "").length < (s.min || 0)) return false;
        if (o.yozibTasdiq && yi && yi.value.trim().toLowerCase() !== String(o.yozibTasdiq).trim().toLowerCase()) return false;
        if (mEl.some(({m, el}) => m.majburiy && !String(el.value || "").trim())) return false;
        return true;
      };
      const mQiymatlar = () => { const q = {}; mEl.forEach(({m, el}) => { q[m.nom] = maydonQiymati(el); }); return q; };
      const holatYangila = () => {
        ok.setAttribute("aria-disabled", String(!yaroqli() || ishlamoqda));
        if (sanoqEl && ta) sanoqEl.textContent = ta.value.length + " / " + s.maks;
      };
      /* Nima yetishmayotgani ko'rsatiladi: birinchi to'ldirilmagan maydonga xato va fokus */
      const yetishmagan = () => {
        if (s && ta && ta.value.replace(/\s/g, "").length < (s.min || 0)) return [ta, "Sababni yozing"];
        if (o.yozibTasdiq && yi && yi.value.trim().toLowerCase() !== String(o.yozibTasdiq).trim().toLowerCase()) return [yi, "Tasdiqlash uchun yozing"];
        const m = mEl.find(({m: q, el}) => q.majburiy && !String(el.value || "").trim());
        return m ? [m.el, "Maydonni to'ldiring"] : null;
      };
      const yop = r => {
        if (yopildi) return;
        yopildi = true;
        parda.remove(); fonQaytar();
        document.removeEventListener("keydown", tepa, true);
        if (oldingi && oldingi.focus && document.contains(oldingi)) oldingi.focus();
        hal(r);
      };
      const tasdiqla = async () => {
        if (ishlamoqda) return;
        if (!yaroqli()){
          const y = yetishmagan();
          if (y){ MKB.maydonXato(y[0], y[1]); y[0].focus(); }
          return;
        }
        const sabab = ta ? ta.value.trim() : "";
        let qiymatlar;
        if (mEl.length){
          qiymatlar = mQiymatlar();
          const xatoli = mEl.map(({m, el}) => { const x = maydonXatosi(el, m.tekshir, qiymatlar); MKB.maydonXato(el, x || null); return x ? el : null; }).filter(Boolean);
          if (xatoli.length){ xatoli[0].focus(); return; }
        }
        if (typeof o.bajar !== "function"){ yop({sabab, qiymat: undefined, qiymatlar}); return; }
        ishlamoqda = true;
        xatoEl.hidden = true;
        try{
          const qiymat = await MKB.band(ok, () => o.bajar({sabab, qiymatlar}));
          ishlamoqda = false;
          yop({sabab, qiymat, qiymatlar});
        }catch(e){
          ishlamoqda = false;
          xatoEl.innerHTML = ik_("xavf") + "<span></span>";
          xatoEl.querySelector("span").textContent = e && e.message ? e.message : "Amal bajarilmadi. Qayta urinib ko'ring";
          xatoEl.hidden = false;
          tarjima(xatoEl);
          holatYangila();
        }
      };
      /* Escape faqat eng ustki oynada: shu oyna eng oxirgi qo'shilgan parda bo'lsa */
      const tepa = e => {
        if (e.key !== "Escape" || yopildi) return;
        const pardalar = document.querySelectorAll(".modal-parda");
        if (pardalar[pardalar.length - 1] !== parda) return;
        e.preventDefault(); e.stopPropagation();
        if (!ishlamoqda) yop(null);
      };
      document.addEventListener("keydown", tepa, true);
      parda.addEventListener("keydown", e => {
        tut(e, modal);
        if (e.key === "Enter" && !e.isComposing){
          const f = document.activeElement;
          if (f && f.tagName === "TEXTAREA"){ if (e.ctrlKey || e.metaKey){ e.preventDefault(); tasdiqla(); } return; }
          if (f && (f.tagName === "BUTTON" || f.tagName === "A")) return;
          e.preventDefault(); tasdiqla();
        }
      });
      parda.addEventListener("click", e => { if (e.target === parda && !xavfli && !ishlamoqda) yop(null); });
      parda.querySelector(".modal-yop").addEventListener("click", () => { if (!ishlamoqda) yop(null); });
      bekor.addEventListener("click", () => { if (!ishlamoqda) yop(null); });
      ok.addEventListener("click", tasdiqla);
      const tozala = el => { if (el.__mxEl) MKB.maydonXato(el, null); };
      if (ta) ta.addEventListener("input", () => { tozala(ta); holatYangila(); });
      if (yi) yi.addEventListener("input", () => { tozala(yi); holatYangila(); });
      mEl.forEach(({el}) => { el.addEventListener("input", () => { tozala(el); holatYangila(); }); el.addEventListener("change", holatYangila); });
      holatYangila();
      const birinchi = (mEl.length && mEl[0].el) || (s && s.majburiy && ta) || yi || (xavfli ? bekor : ok);
      setTimeout(() => { if (!yopildi) birinchi.focus(); }, 30);
    });
  }

  /* ============================================================
     3.2 MKB.sahifaYukla — skelet, xato va qayta urinish
     ============================================================ */
  MKB.sahifaYukla = function(o){
    o = o || {};
    const joylar = o.joylar || {};
    const main = document.querySelector("main.kontent") || document.querySelector("main");
    const qoy = () => Object.keys(joylar).forEach(id => {
      const el = document.getElementById(id);
      const [tur, n] = Array.isArray(joylar[id]) ? joylar[id] : [joylar[id], null];
      if (el) el.innerHTML = MKB.skelet(n || (tur === "karta" ? 4 : tur === "jadval" ? 8 : 6), tur === "qator" ? undefined : tur);
    });
    const ishla = async () => {
      qoy();
      if (main) main.setAttribute("aria-busy", "true");
      try{
        if (window.MKBapi) await MKBapi.tayyor;
        return await o.ish();
      }catch(e){
        Object.keys(joylar).forEach(id => MKB.xatoHolat(id, o.xato || (e && e.message) || null, ishla));
        return undefined;
      }finally{
        if (main) main.removeAttribute("aria-busy");
      }
    };
    return ishla();
  };

  /* ============================================================
     3.3 Jarayon chizig'i va MKBapi kuzatuvi (aloqa uzilishi, namoyish izohi)
     ============================================================ */
  let aktivSorov = 0, korsatT = 0, yashirT = 0, chiziq = null;
  function chiziqOl(){
    if (chiziq && chiziq.isConnected) return chiziq;
    chiziq = document.createElement("div");
    chiziq.className = "jarayon-chiziq";
    chiziq.setAttribute("aria-hidden", "true");
    (document.body || document.documentElement).appendChild(chiziq);
    return chiziq;
  }
  function sorovBoshla(){
    aktivSorov++;
    if (aktivSorov === 1){ clearTimeout(yashirT); korsatT = setTimeout(() => { if (document.body) chiziqOl().classList.add("ochiq"); }, 150); }
  }
  function sorovTugat(){
    aktivSorov = Math.max(0, aktivSorov - 1);
    if (!aktivSorov){ clearTimeout(korsatT); yashirT = setTimeout(() => { if (chiziq) chiziq.classList.remove("ochiq"); }, 200); }
  }
  const NAMOYISH_IZOH = "Qanday ishlaydi namoyishi";
  function apiOra(){
    const A = window.MKBapi;
    if (!A || A.__uxOralgan) return;
    A.__uxOralgan = true;
    const ora = (obyekt, nom) => {
      const asl = obyekt[nom];
      if (typeof asl !== "function") return;
      obyekt[nom] = function(...a){
        const tizim = a.some(x => x && typeof x === "object" && x.tizim === true);
        if (nom === "yangi" && sayohatHolati() && sayohatHolati().rejim === "namoyish" && a[1] && typeof a[1] === "object" && !a[1].izoh)
          a[1] = Object.assign({}, a[1], {izoh: NAMOYISH_IZOH});
        if (!tizim) sorovBoshla();
        let p;
        try{ p = Promise.resolve(asl.apply(this, a)); }
        catch(e){ if (!tizim) sorovTugat(); throw e; }
        return p.then(r => { if (!tizim) sorovTugat(); if (oflayn && A.rejim() === "server" && navigator.onLine !== false) aloqaBor(); return r; },
          e => { if (!tizim) sorovTugat(); if (e instanceof TypeError && A.rejim() === "server") aloqaYoq(); throw e; });
      };
    };
    ["royxat", "bitta", "yangi", "yangilash", "ochir", "tiklash"].forEach(n => ora(A, n));
    if (A.fayl) ora(A.fayl, "saqla");
  }
  apiOra();

  /* ============================================================
     4. MKB.qaytarish — tasdiqlash o'rniga qaytarish
     ============================================================ */
  let joriyQaytarish = null;
  MKB.qaytarish = function(xabar, o){
    o = o || {};
    if (joriyQaytarish) joriyQaytarish.yakunla();
    let q = document.querySelector(".toast-qutisi");
    if (!q){ q = document.createElement("div"); q.className = "toast-qutisi"; q.setAttribute("role", "status"); q.setAttribute("aria-live", "polite"); document.body.appendChild(q); }
    const muddat = Math.max(6000, Math.min(60000, Number(o.muddat) || 8000));
    const t = document.createElement("div");
    t.className = "toast qaytarish";
    t.innerHTML = ik_("tasdiq") + '<span class="q-matn"></span><button type="button" class="q-tugma">' + ik_("yangilash") + "<span>Qaytarish</span></button>" +
      '<i class="q-vaqt" aria-hidden="true"></i>';
    t.querySelector(".q-matn").textContent = xabar;
    q.appendChild(t);
    tarjima(t);
    const vaqt = t.querySelector(".q-vaqt");
    let qoldi = muddat, oxirgi = Date.now(), toxtagan = false, tugadi = false, taymer = 0;
    const yangila = () => { vaqt.style.transform = "scaleX(" + Math.max(0, qoldi / muddat) + ")"; };
    const tik = () => {
      if (tugadi) return;
      const h = Date.now();
      if (!toxtagan) qoldi -= h - oxirgi;
      oxirgi = h;
      yangila();
      if (qoldi <= 0) yakunla(); else taymer = setTimeout(tik, 100);
    };
    const yakunla = () => {
      if (tugadi) return;
      tugadi = true; clearTimeout(taymer);
      t.style.transition = "opacity .2s"; t.style.opacity = "0";
      setTimeout(() => t.remove(), 220);
      if (joriyQaytarish && joriyQaytarish.t === t) joriyQaytarish = null;
    };
    const bekorQil = async () => {
      if (tugadi) return;
      toxtagan = true;
      const b = t.querySelector(".q-tugma");
      try{
        await MKB.band(b, () => o.bekor ? o.bekor() : null);
        yakunla();
        MKB.toast("Bekor qilindi", "info");
        if (o.keyin) await o.keyin();
      }catch(e){
        yakunla();
        MKB.toast(e && e.message ? "Qaytarib bo'lmadi: " + e.message : "Qaytarib bo'lmadi", "xavf");
      }
    };
    t.addEventListener("mouseenter", () => { toxtagan = true; });
    t.addEventListener("mouseleave", () => { toxtagan = false; oxirgi = Date.now(); });
    t.addEventListener("focusin", () => { toxtagan = true; });
    t.addEventListener("focusout", () => { toxtagan = false; oxirgi = Date.now(); });
    t.querySelector(".q-tugma").addEventListener("click", bekorQil);
    yangila();
    taymer = setTimeout(tik, 100);
    joriyQaytarish = {t, yakunla, bekorQil};
    return {bekor: bekorQil, yakunla};
  };

  /* ============================================================
     6. Forma tekshiruvi va kiritish formatlari (data-format)
     ============================================================ */
  const ulangan = new WeakSet();
  const bugunIso = () => SOF.isoYoz(MKB.bugun());
  function yorliqMatni(el){
    const m = el.closest(".maydon");
    const l = (el.id && document.querySelector('label[for="' + (window.CSS && CSS.escape ? CSS.escape(el.id) : el.id) + '"]')) ||
      (m && m.querySelector(".maydon-yorliq")) || el.closest("label");
    const t = l ? l.textContent.replace(/\*/g, "").replace(/\s+/g, " ").trim() : "";
    return t || el.getAttribute("aria-label") || el.name || "";
  }
  /* Xato matnini maydon ostida ko'rsatish yoki olib tashlash (matn null bo'lsa) */
  MKB.maydonXato = function(el, matn){
    if (!el) return;
    const quti = el.closest(".kirish") || (el.tagName === "TEXTAREA" || el.tagName === "SELECT" ? el : null);
    const maydon = el.closest(".maydon") || el.parentNode;
    let x = el.__mxEl && el.__mxEl.isConnected ? el.__mxEl : null;
    const bog = (el.getAttribute("aria-describedby") || "").split(/\s+/).filter(Boolean);
    if (!matn){
      if (x){ x.remove(); el.setAttribute("aria-describedby", bog.filter(i => i !== x.id).join(" ")); if (!el.getAttribute("aria-describedby")) el.removeAttribute("aria-describedby"); }
      el.__mxEl = null;
      el.removeAttribute("aria-invalid");
      if (quti) quti.classList.remove("xato");
      return;
    }
    if (!x){
      x = document.createElement("span");
      x.className = "maydon-xato";
      x.id = yangiId("mx");
      const joy = quti && quti !== el ? quti : el;
      if (joy.parentNode === maydon || maydon.contains(joy)) joy.insertAdjacentElement("afterend", x);
      else maydon.appendChild(x);
      el.__mxEl = x;
      if (bog.indexOf(x.id) < 0) el.setAttribute("aria-describedby", bog.concat([x.id]).join(" "));
    }
    x.innerHTML = ik_("xavf") + "<span></span>";
    x.querySelector("span").textContent = matn;
    tarjima(x);
    el.setAttribute("aria-invalid", "true");
    if (quti) quti.classList.add("xato");
  };
  function maydonQiymati(el){
    if (el.type === "checkbox") return el.checked;
    if (el.type === "radio"){ const f = el.form || document; const c = f.querySelector('input[type="radio"][name="' + el.name + '"]:checked'); return c ? c.value : ""; }
    if (el.tagName === "SELECT" && el.multiple) return Array.from(el.selectedOptions).map(o => o.value);
    const f = el.getAttribute("data-format");
    if (f) return SOF.ajrat(f, el.value);
    if (el.type === "date"){ const d = SOF.isoOqi(el.value); return d ? SOF.nuqtali(d) : ""; }
    if (el.type === "number") return el.value === "" ? null : Number(el.value);
    return String(el.value || "").trim();
  }
  /* Sana oralig'i: "Savdo sanasi e'lon sanasidan oldin bo'lishi mumkin emas" (data-dan-xato bo'lsa o'sha matn) */
  function danXatoMatni(el, danEl){
    const o = el.getAttribute("data-dan-xato");
    if (o) return o;
    const a = yorliqMatni(el), b = yorliqMatni(danEl);
    if (!a || !b) return null;
    const b2 = /^[A-ZА-ЯЁ][a-zа-яё'‘’ʻ]/.test(b) ? b[0].toLowerCase() + b.slice(1) : b;
    /* Rus tilida yorliqlar allaqachon o'girilgan: xabar shu tilda tuziladi */
    if (joriyTilRu()) return a + " не может быть раньше, чем " + b2;
    return a + " " + b2 + "dan oldin bo'lishi mumkin emas";
  }
  /* Bitta maydon: xato matni yoki "" */
  function maydonXatosi(el, qoida, qiymatlar){
    if (el.disabled || el.type === "hidden") return "";
    const f = el.getAttribute("data-format");
    const bosh = el.type === "checkbox" ? !el.checked : el.type === "radio" ? !maydonQiymati(el) : !String(el.value || "").trim();
    if (el.required && bosh) return el.getAttribute("data-xato") || (el.tagName === "SELECT" || el.type === "radio" ? "Variantni tanlang" :
      el.type === "checkbox" ? "Belgilang" : el.type === "date" ? "Sanani kiriting" : "Maydonni to'ldiring");
    if (!bosh){
      if (f){ const x = SOF.formatXatosi(f, el.value, {min: el.getAttribute("min"), max: el.getAttribute("max")}); if (x) return x; }
      else if (el.type === "date"){
        const danNom = el.getAttribute("data-dan");
        const danEl = danNom ? (el.form || document).querySelector('[name="' + danNom + '"]') : null;
        const x = SOF.sanaXatosi(el.value, {min: el.getAttribute("min"), max: el.getAttribute("max"), bugun: bugunIso(), dan: danEl ? danEl.value : null,
          danXato: danEl ? danXatoMatni(el, danEl) : null});
        if (x) return x;
      } else if (el.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim())) return "Elektron pochtani name@bank.uz ko'rinishida kiriting";
      else if (el.type === "number"){
        const n = Number(el.value), mn = el.getAttribute("min"), mx = el.getAttribute("max");
        if (!Number.isFinite(n)) return "Raqam kiriting";
        if (mn !== null && mn !== "" && n < Number(mn)) return "Kamida " + SOF.sonMatn(Number(mn));
        if (mx !== null && mx !== "" && n > Number(mx)) return SOF.sonMatn(Number(mx)) + " dan oshmasin";
      }
      const ml = Number(el.getAttribute("minlength"));
      if (ml > 0 && String(el.value).trim().length < ml) return "Kamida " + ml + " ta belgi yozing";
    }
    if (typeof qoida === "function"){
      const r = qoida(maydonQiymati(el), qiymatlar || {});
      if (typeof r === "string" && r) return r;
    }
    return "";
  }
  function formatlabQoy(el){
    const f = el.getAttribute("data-format");
    if (!f) return;
    const k = el.getAttribute("data-kasr");
    const v = SOF.korinish(f, el.value, k != null ? Number(k) : undefined);
    if (v !== "" && v !== el.value) el.value = v;
    if (f === "pul"){
      const maydon = el.closest(".maydon");
      if (!maydon) return;
      let iz = maydon.querySelector("[data-pul-izoh]");
      const n = SOF.ajrat("pul", el.value);
      const t = Number.isFinite(n) ? SOF.pulIzoh(n) : "";
      if (!t){ if (iz) iz.remove(); return; }
      if (!iz){
        iz = document.createElement("span");
        iz.className = "maydon-izoh";
        iz.setAttribute("data-pul-izoh", "");
        iz.setAttribute("data-tarjimasiz", "");
        (el.closest(".kirish") || el).insertAdjacentElement("afterend", iz);
      }
      iz.textContent = t;
      tarjima(iz);
    }
  }
  /* Format sozlamasi: inputmode, birlik yorlig'i. Atribut keyin qo'shilsa ham qayta qo'llanadi */
  function formatSozla(el){
    const f = el.getAttribute("data-format");
    if (!f || el.__mkbFormat === f) return f;
    el.__mkbFormat = f;
    if (!el.hasAttribute("inputmode")) el.setAttribute("inputmode", f === "tel" ? "tel" : ["pul", "kasr", "foiz"].indexOf(f) >= 0 ? "decimal" : f === "kadastr" ? "text" : "numeric");
    if (!el.getAttribute("autocomplete")) el.setAttribute("autocomplete", "off");
    const quti = el.closest(".kirish");
    const birlik = SOF.BIRLIK[f];
    if (quti && birlik && !quti.querySelector(".kirish-birlik")){
      const yorliq = (el.closest(".maydon") && el.closest(".maydon").querySelector(".maydon-yorliq")) || null;
      if (!yorliq || !/so['’]m|%/.test(yorliq.textContent)){
        const b = document.createElement("span");
        b.className = "kirish-birlik";
        b.setAttribute("aria-hidden", "true");
        b.textContent = birlik.trim();
        quti.appendChild(b);
        tarjima(b);
      }
    }
    if (el.value) formatlabQoy(el);
    return f;
  }
  /* Maydonning joriy xatosi: formaTekshir / formaQoidalar bergan qoida ham qo'llanadi */
  function jonliXato(el){
    const f = el.__mkbForma;
    const q = el.__mkbQoida;
    let qiymatlar = {};
    if (q && f) f.querySelectorAll("input[name], select[name], textarea[name]").forEach(m => {
      if (m.type === "radio" && !m.checked && qiymatlar[m.name] !== undefined) return;
      qiymatlar[m.name] = maydonQiymati(m);
    });
    return maydonXatosi(el, q, qiymatlar);
  }
  function xulosaYangila(el){
    const f = el.__mkbForma || el.form;
    const x = f && f.querySelector(":scope > .xato-xulosa");
    if (x && !f.querySelector('[aria-invalid="true"]')) x.remove();
  }
  function maydonUla(el){
    if (el.type === "hidden" || el.type === "file" || el.type === "submit" || el.type === "button") return;
    formatSozla(el);
    if (ulangan.has(el)) return;
    ulangan.add(el);
    let tegildi = false;
    el.addEventListener("input", () => {
      tegildi = true;
      const f = formatSozla(el);
      if (f){
        const eski = el.value, joy = el.selectionStart;
        const yangi = SOF.tozala(f, eski);
        if (yangi !== eski){ el.value = yangi; try{ const d = Math.max(0, (joy || 0) - (eski.length - yangi.length)); el.setSelectionRange(d, d); }catch(_){ } }
      }
      if (el.getAttribute("aria-invalid") === "true"){ MKB.maydonXato(el, jonliXato(el) || null); xulosaYangila(el); }
    });
    el.addEventListener(el.tagName === "SELECT" || el.type === "checkbox" || el.type === "radio" || el.type === "date" ? "change" : "blur", () => {
      if (formatSozla(el)) formatlabQoy(el);
      if (tegildi || el.getAttribute("aria-invalid") === "true"){ MKB.maydonXato(el, jonliXato(el) || null); xulosaYangila(el); }
    });
  }
  /* Qo'shimcha qoidalarni maydonlarga oldindan ulash: blur va yozish paytida ham qo'llanadi (formaTekshir ham shuni qiladi) */
  function qoidalarniEsla(forma, qoidalar){
    if (!forma || !qoidalar) return;
    Object.keys(qoidalar).forEach(n => forma.querySelectorAll('[name="' + (window.CSS && CSS.escape ? CSS.escape(n) : n) + '"]').forEach(el => {
      el.__mkbQoida = qoidalar[n]; el.__mkbForma = forma;
    }));
  }
  MKB.formaQoidalar = function(forma, qoidalar){ qoidalarniEsla(forma, qoidalar); MKB.formaUla(forma); };
  /* Sahifadagi (yoki joy ichidagi) barcha maydonlarga tekshiruv va format ulanadi */
  MKB.formaUla = function(joy){
    const r = joy && joy.querySelectorAll ? joy : document;
    const sel = ".maydon input, .maydon select, .maydon textarea, input[data-format], input[required], select[required], textarea[required], input[type=date]";
    if (r.matches && r.matches(sel)) maydonUla(r);
    r.querySelectorAll(sel).forEach(maydonUla);
  };
  /* Formani tekshirish: xato bo'lsa maydonlar ostida va tepada xulosa, fokus xulosaga; aks holda {qiymatlar} */
  MKB.formaTekshir = function(forma, qoidalar){
    if (!forma) return null;
    qoidalar = qoidalar || {};
    qoidalarniEsla(forma, qoidalar);
    const maydonlar = Array.from(forma.querySelectorAll("input[name], select[name], textarea[name]"))
      .filter(el => !el.disabled && el.type !== "hidden" && el.type !== "submit" && el.type !== "button" && (el.getClientRects().length || el.type === "radio" || el.type === "checkbox"));
    const qiymatlar = {};
    maydonlar.forEach(el => {
      if (el.type === "radio" && qiymatlar[el.name] !== undefined) return;
      qiymatlar[el.name] = maydonQiymati(el);
    });
    const xatolar = [];
    const korilgan = new Set();
    maydonlar.forEach(el => {
      maydonUla(el);
      if (el.type === "radio"){ if (korilgan.has(el.name)) return; korilgan.add(el.name); }
      if (!el.__mkbForma) el.__mkbForma = forma;
      const x = maydonXatosi(el, qoidalar[el.name] || el.__mkbQoida, qiymatlar);
      MKB.maydonXato(el, x || null);
      if (x) xatolar.push({el, x});
    });
    let xulosa = forma.querySelector(":scope > .xato-xulosa");
    if (!xatolar.length){ if (xulosa) xulosa.remove(); return {qiymatlar}; }
    if (!xulosa){
      xulosa = document.createElement("div");
      xulosa.className = "xato-xulosa";
      xulosa.tabIndex = -1;
      forma.insertBefore(xulosa, forma.firstChild);
    }
    xulosa.innerHTML = ik_("xavf") + '<div><b><span data-tarjimasiz>' + xatolar.length + "</span> <span>ta maydonni tuzating</span></b><ul>" +
      xatolar.map(({el, x}) => { if (!el.id) el.id = yangiId("mf"); return '<li><a href="#' + e_(el.id) + '">' + e_(yorliqMatni(el)) + ": " + e_(x) + "</a></li>"; }).join("") +
      "</ul></div>";
    xulosa.querySelectorAll("a").forEach(a => a.addEventListener("click", e => {
      e.preventDefault();
      const t = document.getElementById(a.getAttribute("href").slice(1));
      if (t){ t.focus(); t.scrollIntoView({block: "center", behavior: kamHarakat() ? "auto" : "smooth"}); }
    }));
    tarjima(xulosa);
    xulosa.focus();
    return null;
  };
  /* Server yoki amal.js xatosini maydon ostiga (nomi berilsa) yoki forma xulosasiga yozish */
  MKB.formaXato = function(forma, xabar, maydonNomi){
    const el = maydonNomi && forma ? forma.querySelector('[name="' + maydonNomi + '"]') : null;
    if (el){ MKB.maydonXato(el, xabar); el.focus(); return; }
    if (!forma){ MKB.toast(xabar, "xavf"); return; }
    let xulosa = forma.querySelector(":scope > .xato-xulosa");
    if (!xulosa){ xulosa = document.createElement("div"); xulosa.className = "xato-xulosa"; xulosa.tabIndex = -1; forma.insertBefore(xulosa, forma.firstChild); }
    xulosa.innerHTML = ik_("xavf") + "<div><b></b></div>";
    xulosa.querySelector("b").textContent = xabar;
    tarjima(xulosa);
    xulosa.focus();
  };

  /* ============================================================
     5. MKB.formaQoriqla — saqlanmagan o'zgarishlar va qoralama
     ============================================================ */
  const qoriqlar = new Set();
  let chiqishRuxsat = false;
  const QORALAMA_OLD = "mkb4-qoralama:";
  const qoralamaKalit = q => kalit(QORALAMA_OLD + login() + ":" + q);
  function formaHolati(forma, maxfiy){
    const r = {};
    forma.querySelectorAll("input[name], select[name], textarea[name]").forEach(el => {
      if (el.type === "file" || el.type === "submit" || el.type === "button" || (maxfiy && maxfiy.indexOf(el.name) >= 0)) return;
      if (el.type === "checkbox") r[el.name] = el.checked;
      else if (el.type === "radio"){ if (el.checked) r[el.name] = el.value; else if (!(el.name in r)) r[el.name] = null; }
      else if (el.tagName === "SELECT" && el.multiple) r[el.name] = Array.from(el.selectedOptions).map(o => o.value);
      else r[el.name] = el.value;
    });
    return r;
  }
  function formaTikla(forma, q, maxfiy){
    Object.keys(q || {}).forEach(n => {
      if (maxfiy && maxfiy.indexOf(n) >= 0) return;
      forma.querySelectorAll('[name="' + n + '"]').forEach(el => {
        const v = q[n];
        if (el.type === "checkbox") el.checked = !!v;
        else if (el.type === "radio") el.checked = el.value === v;
        else if (el.tagName === "SELECT" && el.multiple) Array.from(el.options).forEach(o => { o.selected = Array.isArray(v) && v.indexOf(o.value) >= 0; });
        else if (v != null) el.value = v;
        el.dispatchEvent(new Event("input", {bubbles: true}));
        el.dispatchEvent(new Event("change", {bubbles: true}));
      });
    });
  }
  function qoralamalarniTozala(hammasi){
    try{
      const old = kalit(QORALAMA_OLD + login() + ":");
      const hozir = Date.now();
      for (let i = localStorage.length - 1; i >= 0; i--){
        const k = localStorage.key(i);
        if (!k || k.indexOf(old) !== 0) continue;
        if (hammasi){ localStorage.removeItem(k); continue; }
        const v = lsOqi(k, null);
        if (!v || SOF.eskirdimi(v.ms, hozir, 7)) localStorage.removeItem(k);
      }
    }catch(_){ }
  }
  MKB.formaQoriqla = function(forma, o){
    o = o || {};
    if (!forma) return {toza(){}, iflosmi: () => false, saqla(){}, fayllar(){}, qadam(){}, qoralama: () => null};
    const maxfiy = o.maxfiy || [];
    let asos = JSON.stringify(formaHolati(forma));
    let iflos = false, taymer = 0, oxirgiHolat = 0, fayllar = [], qadam = null;
    const qk = o.qoralama ? qoralamaKalit(o.qoralama) : null;
    let holatEl = null;
    if (qk){
      holatEl = document.createElement("p");
      holatEl.className = "qoralama-holat";
      holatEl.setAttribute("aria-live", "polite");
      holatEl.hidden = true;
      const joy = typeof o.holatJoy === "string" ? document.querySelector(o.holatJoy) : o.holatJoy;
      if (joy) joy.appendChild(holatEl); else forma.insertBefore(holatEl, forma.firstChild);
    }
    const tekshir = () => { iflos = JSON.stringify(formaHolati(forma)) !== asos; return iflos; };
    const saqla = () => {
      if (!qk) return;
      clearTimeout(taymer);
      if (!tekshir() && !fayllar.length) return;
      const d = new Date();
      if (!lsYoz(qk, {v: 1, vaqt: sanaVaqt(d), ms: d.getTime(), qiymatlar: formaHolati(forma, maxfiy), fayllar, qadam})) return;
      if (holatEl && Date.now() - oxirgiHolat > 10000){
        oxirgiHolat = Date.now();
        holatEl.innerHTML = ik_("tasdiq") + "<span>Qoralama saqlandi</span> <span data-tarjimasiz>" + soatMatn(d) + "</span>";
        holatEl.hidden = false;
        tarjima(holatEl);
      }
    };
    const kechiktir = () => { tekshir(); if (qk){ clearTimeout(taymer); taymer = setTimeout(saqla, 1500); } };
    forma.addEventListener("input", kechiktir);
    forma.addEventListener("change", kechiktir);
    forma.addEventListener("focusout", () => { if (qk && tekshir()) saqla(); });
    const q = {
      forma, nom: o.nom || "Forma", qoralamaBor: !!qk,
      iflosmi: () => tekshir(),
      saqla,
      toza(){ asos = JSON.stringify(formaHolati(forma)); iflos = false; fayllar = []; clearTimeout(taymer); if (qk){ try{ localStorage.removeItem(qk); }catch(_){ } }
        if (holatEl) holatEl.hidden = true; const l = forma.previousElementSibling; if (l && l.classList.contains("qoralama-lenta")) l.remove(); },
      asos(){ asos = JSON.stringify(formaHolati(forma)); iflos = false; },
      fayllar(ids){ fayllar = Array.isArray(ids) ? ids.slice() : []; kechiktir(); },
      qadam(n){ qadam = n; kechiktir(); },
      qoralama: () => (qk ? lsOqi(qk, null) : null),
      yoq(){ qoriqlar.delete(q); },
    };
    qoriqlar.add(q);
    /* Tiklash lentasi: qoralama bor va yozuvning oxirgi o'zgarishidan yangi bo'lsa */
    if (qk){
      qoralamalarniTozala(false);
      const d = lsOqi(qk, null);
      const yozuvMs = o.yozuvVaqt ? (() => { const m = /^(\d{2})\.(\d{2})\.(\d{4})(?:\s+(\d{2}):(\d{2}))?/.exec(o.yozuvVaqt); return m ? new Date(+m[3], +m[2] - 1, +m[1], +(m[4] || 0), +(m[5] || 0)).getTime() : 0; })() : 0;
      if (d && d.qiymatlar && (!yozuvMs || d.ms > yozuvMs) && JSON.stringify(Object.assign(formaHolati(forma, maxfiy), d.qiymatlar)) !== JSON.stringify(formaHolati(forma, maxfiy))){
        const l = document.createElement("div");
        l.className = "qoralama-lenta";
        l.setAttribute("role", "status");
        l.innerHTML = ik_("hujjat") + '<span class="ql-matn"><span>Saqlanmagan qoralama bor</span> <b data-tarjimasiz>' + e_(d.vaqt || "") + "</b></span>" +
          '<button type="button" class="tugma tugma-asosiy tugma-kichik" data-ql="tikla">' + ik_("yangilash") + "Qoralamani tiklash</button>" +
          '<button type="button" class="tugma tugma-oq tugma-kichik" data-ql="ochir">O&#39;chirish</button>';
        forma.parentNode.insertBefore(l, forma);
        tarjima(l);
        l.querySelector('[data-ql="tikla"]').addEventListener("click", () => {
          formaTikla(forma, d.qiymatlar, maxfiy);
          fayllar = Array.isArray(d.fayllar) ? d.fayllar : [];
          qadam = d.qadam == null ? null : d.qadam;
          l.remove();
          tekshir();
          if (typeof o.tiklandi === "function") o.tiklandi(d);
          MKB.toast("Qoralama tiklandi", "info");
          const b = forma.querySelector("input:not([type=hidden]), select, textarea"); if (b) b.focus();
        });
        l.querySelector('[data-ql="ochir"]').addEventListener("click", () => {
          try{ localStorage.removeItem(qk); }catch(_){ }
          l.remove();
          MKB.toast("Qoralama o'chirildi", "info");
        });
      }
    }
    return q;
  };
  const iflosQoriq = joy => Array.from(qoriqlar).find(q => q.forma.isConnected && (!joy || joy.contains(q.forma)) && q.iflosmi());
  function qoralamalarniSaqla(){ qoriqlar.forEach(q => { if (q.forma.isConnected) q.saqla(); }); }
  /* Chiqib ketish mumkinmi: saqlanmagan forma bo'lsa so'raladi. chiqish — tizimdan chiqishda qoralama ham o'chadi */
  async function ketishMumkinmi(chiqish, joy){
    const q = iflosQoriq(joy);
    if (!q) return true;
    const qoralama = q.qoralamaBor && !chiqish;
    if (qoralama) q.saqla();
    const r = await MKB.tasdiqla({
      sarlavha: "Saqlanmagan o'zgarishlar bor",
      matn: q.nom + " formasidagi o'zgarishlar saqlanmagan. " + (qoralama ? "Qoralama shu qurilmada saqlanadi, keyin davom ettirishingiz mumkin." : "Chiqib ketsangiz, ular yo'qoladi."),
      ton: qoralama ? "oddiy" : "xavfli", okMatn: chiqish ? "Tizimdan chiqish" : "Chiqib ketish", bekorMatn: "Formada qolish",
    });
    if (!r) return false;
    /* Tizimdan chiqishda sahifa yopiladi. Aks holda faqat tashlab ketilgan formalar toza deb olinadi:
       sahifadagi boshqa formalar va havola/yopish qo'riqlari ishlashda davom etadi */
    if (chiqish) chiqishRuxsat = true;
    else Array.from(qoriqlar).forEach(x => { if (x.forma.isConnected && (!joy || joy.contains(x.forma)) && x.iflosmi()) x.asos(); });
    return true;
  }
  /* o.joy — faqat shu element (masalan yon panel) ichidagi formalar tekshiriladi */
  MKB.ketishMumkinmi = o => ketishMumkinmi(false, o && o.joy && o.joy.contains ? o.joy : null);
  document.addEventListener("click", e => {
    const a = e.target && e.target.closest ? e.target.closest("a[href]") : null;
    if (!a || e.defaultPrevented || e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
    if (a.target === "_blank" || a.hasAttribute("download")) return;
    const h = a.getAttribute("href") || "";
    if (!h || h[0] === "#" || /^(mailto:|tel:|javascript:|blob:|data:)/i.test(h)) return;
    if (chiqishRuxsat || !iflosQoriq()) return;
    e.preventDefault(); e.stopPropagation();
    ketishMumkinmi(false).then(ok => { if (ok) location.href = a.href; });
  }, true);
  window.addEventListener("beforeunload", e => {
    qoralamalarniSaqla();
    if (chiqishRuxsat || !iflosQoriq()) return;
    e.preventDefault(); e.returnValue = "";
  });
  MKB.tizimdanChiq = async function(){
    if (!(await ketishMumkinmi(true))) return;
    chiqishRuxsat = true;
    qoralamalarniTozala(true);
    MKBapi.chiqish();
    location.href = "kirish.html";
  };

  /* ============================================================
     8.1 Buyruqlar oynasi: Ctrl+K va "/"
     ============================================================ */
  window.MKB_AMALLAR = window.MKB_AMALLAR || [
    {nom: "Hodisa qayd etish", ikonka: "ogoh", havola: "hodisalar.html?yangi=1", bolim: "himoya", huquq: "yoz"},
    {nom: "Lot yaratish", ikonka: "savdo", havola: "lotlar.html?yangi=1", bolim: "realizatsiya", huquq: "yoz"},
    {nom: "Vazifa qo'shish", ikonka: "vazifa", havola: "vazifalar.html?yangi=1", bolim: "vazifa", huquq: "yoz"},
    {nom: "Ko'rik tayinlash", ikonka: "korik", havola: "korik-tayinlash.html", bolim: "korik", huquq: "yoz"},
    {nom: "Balansga qabul", ikonka: "aktivlar", havola: "qabul-boshlash.html", bolim: "aktivlar", huquq: "yoz"},
    {nom: "Yangi undiruv ishi", ikonka: "yuridik", havola: "undiruv.html?yangi=1", bolim: "yuridik", huquq: "yoz"},
    {nom: "Majlis tayinlash", ikonka: "sud", havola: "sud-kalendar.html?yangi=1", bolim: "yuridik", huquq: "yoz"},
    {nom: "Taklif kiritish", ikonka: "karta-pul", havola: "takliflar.html?yangi=1", bolim: "realizatsiya", huquq: "yoz"},
    {nom: "Ruxsat berish", ikonka: "ruxsat", havola: "ruxsatlar.html?yangi=1", bolim: "himoya", huquq: "yoz"},
    {nom: "Qo'riqlash shartnomasi qo'shish", ikonka: "qalqon", havola: "qoriqlash.html?yangi=1", bolim: "himoya", huquq: "yoz"},
    {nom: "Foydalanuvchi qo'shish", ikonka: "foyd", havola: "foydalanuvchilar.html?yangi=1", bolim: "sozlama", huquq: "yoz"},
    {nom: "Inventarizatsiya boshlash", ikonka: "skaner", havola: "inventarizatsiya.html?yangi=1", bolim: "korik", huquq: "yoz"},
    {nom: "Paket yaratish", ikonka: "portfel", havola: "realizatsiya.html?yangi=1", bolim: "realizatsiya", huquq: "yoz"},
  ];
  const amalRuxsatli = a => ruxsat(a.havola) && (!a.bolim || MKB.huquq(a.bolim, a.huquq || "yoz"));
  /* Yozuv turi: to'plam, sahifa, ikonka, nomi */
  const YOZUV_TURI = {
    obyekt: {kol: "YOZUVLAR", sahifa: "obyekt.html", ikonka: "aktivlar", nom: y => y.qisqa || y.nom},
    lot: {kol: "LOTLAR", sahifa: "lot.html", ikonka: "savdo", nom: l => l.id + (D().obyektNomi ? " · " + D().obyektNomi(l.obyektId) : "")},
    ish: {kol: "UNDIRUV_ISHLAR", sahifa: "ish.html", ikonka: "yuridik", nom: x => x.id + (x.qarzdor ? " · " + (x.qarzdor.nom || x.qarzdor) : "")},
    hodisa: {kol: "HODISALAR", sahifa: "hodisa.html", ikonka: "ogoh", nom: x => x.sarlavha || x.hodisa || x.id},
    qurilma: {kol: "QURILMALAR", sahifa: "qurilma.html", ikonka: "qurilma", nom: x => (x.turNomi || x.tur || "") + " · " + (x.model || x.id)},
    shartnoma: {kol: "SHARTNOMALAR", sahifa: "shartnoma.html", ikonka: "hujjat", nom: x => x.id + (x.xaridor ? " · " + x.xaridor : "")},
    tasdiq: {kol: "TASDIQLAR", sahifa: "tasdiqlar.html", ikonka: "muhr", nom: x => x.id + " · " + (x.sarlavha || "")},
  };
  function sahifalarRoyxati(){
    const r = [];
    const d = window.MKB_DARAXT || {};
    const nomBolim = k => (typeof bolimNomi === "function" ? bolimNomi(k) : k);
    Object.keys(d).forEach(k => (d[k] || []).forEach(s => { if (ruxsat(s.f)) r.push({nom: String(s.n).replace(/&#39;/g, "'"), havola: s.f, izoh: nomBolim(k)}); }));
    if (typeof BOLIMLAR !== "undefined") BOLIMLAR.forEach(b => { if (ruxsat(b.href) && !r.some(x => x.havola === b.href)) r.push({nom: b.yorliq, havola: b.href, izoh: b.qisqa}); });
    [["Profil sozlamalari", "sozlamalar.html"], ["Ish qo'llanmasi", "qollanma.html"], ["Bildirishnomalar", "bildirishnomalar.html"], ["Qarorlar", "tasdiqlar.html"]]
      .forEach(([n, h]) => { if (ruxsat(h) && !r.some(x => x.havola === h)) r.push({nom: n, havola: h, izoh: ""}); });
    return r;
  }
  const ruNomi = n => { const L = window.MKB_LUGAT || {}; return L[n] || ""; };
  function palitraNatijalari(q){
    q = String(q || "").trim();
    const g = [];
    const D0 = D();
    if (!q){
      const y = MKB.yaqinda.royxat().slice(0, 6);
      if (y.length) g.push({nom: "Yaqinda ochilganlar", bandlar: y.map(x => ({sarlavha: x.nom, izoh: x.id, havola: x.havola, ikonka: (YOZUV_TURI[x.tur] || {}).ikonka || "hujjat"}))});
      const a = window.MKB_AMALLAR.filter(amalRuxsatli);
      if (a.length) g.push({nom: "Amallar", bandlar: a.map(x => ({sarlavha: x.nom, havola: x.havola, ikonka: x.ikonka || "qoshish"}))});
      return g;
    }
    /* Aniq raqam: yozuv ro'yxat tepasida, Enter bilan to'g'ri ochiladi */
    if (SOF.aniqIdmi(q)){
      const aniq = [];
      Object.keys(YOZUV_TURI).forEach(t => {
        const T = YOZUV_TURI[t];
        if (!ruxsat(T.sahifa)) return;
        const x = MKB.doira(D0[T.kol] || []).find(y => y && String(y.id).toLowerCase() === q.toLowerCase());
        if (x) aniq.push({sarlavha: T.nom(x), izoh: x.id, havola: T.sahifa + "?id=" + encodeURIComponent(x.id), ikonka: T.ikonka});
      });
      if (aniq.length) g.push({nom: "Aniq moslik", bandlar: aniq});
    }
    const a = window.MKB_AMALLAR.filter(amalRuxsatli).filter(x => SOF.mosmi([x.nom, ruNomi(x.nom)], q));
    if (a.length) g.push({nom: "Amallar", bandlar: a.slice(0, 6).map(x => ({sarlavha: x.nom, havola: x.havola, ikonka: x.ikonka || "qoshish"}))});
    const s = sahifalarRoyxati().filter(x => SOF.mosmi([x.nom, ruNomi(x.nom), x.havola], q));
    if (s.length) g.push({nom: "Sahifalar", bandlar: s.slice(0, 6).map(x => ({sarlavha: x.nom, izoh: x.izoh, havola: x.havola, ikonka: "hujjat"}))});
    if (q.length >= 2){
      if (typeof izlashNatijalari === "function") izlashNatijalari(q).forEach(gr => g.push({nom: gr.nom, bandlar: gr.bandlar.map(b => Object.assign({ikonka: gr.ikonka}, b))}));
      const qosh = (nom, t, maydonlar) => {
        const T = YOZUV_TURI[t];
        if (!ruxsat(T.sahifa)) return;
        const r = MKB.doira(D0[T.kol] || []).filter(x => x && SOF.mosmi(maydonlar(x), q)).slice(0, 5);
        if (r.length) g.push({nom, bandlar: r.map(x => ({sarlavha: T.nom(x), izoh: x.id, havola: T.sahifa + "?id=" + encodeURIComponent(x.id), ikonka: T.ikonka}))});
      };
      qosh("Undiruv ishlari", "ish", x => [x.id, x.qarzdor && (x.qarzdor.nom || x.qarzdor), x.shartnoma && (x.shartnoma.raqam || x.shartnoma)]);
      qosh("Qarorlar", "tasdiq", x => [x.id, x.sarlavha]);
      qosh("Hodisalar", "hodisa", x => [x.id, x.hodisa, x.sarlavha, D0.obyektNomi ? D0.obyektNomi(x.obyektId) : x.obyektId]);
    }
    /* Bir yozuv ikki guruhda takrorlanmaydi: birinchi (eng aniq) guruhdagisi qoladi */
    const korilgan = new Set();
    return g.map(gr => Object.assign({}, gr, {bandlar: gr.bandlar.filter(b => {
      const k = b.havola || "";
      if (!k || korilgan.has(k)) return !k;
      korilgan.add(k);
      return true;
    })})).filter(gr => gr.bandlar.length);
  }
  let palitraEl = null;
  function palitraOch(boshMatn){
    if (palitraEl){ const i = palitraEl.querySelector("input"); i.value = boshMatn || i.value; i.dispatchEvent(new Event("input")); i.focus(); return; }
    const oldingi = document.activeElement;
    const d = document.createElement("dialog");
    const sid = yangiId("bp");
    d.className = "buyruq-palitra";
    d.setAttribute("aria-labelledby", sid);
    d.innerHTML =
      '<h2 class="sr-only" id="' + sid + '">Buyruqlar va qidiruv</h2>' +
      '<div class="bp-kirish">' + ik_("izlash") +
        '<input type="text" role="combobox" aria-expanded="true" aria-controls="' + sid + '-r" aria-autocomplete="list" autocomplete="off" spellcheck="false" ' +
          'placeholder="Obyekt, sahifa yoki amal nomi" aria-label="Obyekt, sahifa yoki amal nomi">' +
        '<button type="button" class="bp-yop" aria-label="Yopish"><kbd>Esc</kbd></button></div>' +
      '<div class="bp-royxat" id="' + sid + '-r" role="listbox" aria-label="Natijalar"></div>' +
      '<div class="bp-past" aria-hidden="true"><span><kbd>↑</kbd><kbd>↓</kbd> tanlash</span><span><kbd>Enter</kbd> ochish</span><span><kbd>Esc</kbd> yopish</span><span><kbd>?</kbd> tugmalar</span></div>';
    document.body.appendChild(d);
    palitraEl = d;
    const inp = d.querySelector("input"), royxat = d.querySelector(".bp-royxat");
    let faol = 0;
    const bandlar = () => Array.from(royxat.querySelectorAll(".bp-band"));
    const belgila = i => {
      const b = bandlar();
      if (!b.length){ inp.removeAttribute("aria-activedescendant"); return; }
      faol = (i + b.length) % b.length;
      b.forEach((x, j) => { x.classList.toggle("faol", j === faol); x.setAttribute("aria-selected", String(j === faol)); });
      inp.setAttribute("aria-activedescendant", b[faol].id);
      b[faol].scrollIntoView({block: "nearest"});
    };
    const chiz = () => {
      const g = palitraNatijalari(inp.value);
      let k = 0;
      royxat.innerHTML = g.length ? g.map(gr => {
        const gid = sid + "-g" + (k++);
        return '<div class="bp-guruh natija-guruh" role="group" aria-labelledby="' + gid + '"><div class="bp-guruh-nom natija-nom" id="' + gid + '">' + e_(gr.nom) + "</div>" +
          gr.bandlar.map(b => '<a class="bp-band natija-band" role="option" tabindex="-1" aria-selected="false" id="' + sid + "-b" + (k++) + '" href="' + e_(b.havola) + '">' +
            ik_(b.ikonka || "hujjat") + '<span class="matn"><b>' + MKB.matnQismlari(b.sarlavha) + "</b>" +
            (b.izoh ? "<span>" + MKB.matnQismlari(b.izoh) + "</span>" : "") + "</span>" +
            ik_("ong", "mitti") + "</a>").join("") + "</div>";
      }).join("") : '<div class="bp-bosh">' + ik_("izlash") + "<b>Hech narsa topilmadi</b><span>Boshqa so&#39;z yoki yozuv raqamini yozib ko&#39;ring</span></div>";
      tarjima(royxat);
      belgila(0);
    };
    const yop = () => {
      if (!palitraEl) return;
      palitraEl = null;
      if (d.open) d.close();
      d.remove();
      if (oldingi && oldingi.focus && document.contains(oldingi) && oldingi.id !== "global-izlash") oldingi.focus();
    };
    let taymer = 0;
    inp.addEventListener("input", () => { clearTimeout(taymer); taymer = setTimeout(chiz, 80); });
    inp.addEventListener("keydown", e => {
      if (e.key === "ArrowDown"){ e.preventDefault(); belgila(faol + 1); }
      else if (e.key === "ArrowUp"){ e.preventDefault(); belgila(faol - 1); }
      else if (e.key === "Home" && e.ctrlKey){ e.preventDefault(); belgila(0); }
      else if (e.key === "Enter"){
        e.preventDefault();
        const b = bandlar()[faol];
        if (b){ yop(); location.href = b.getAttribute("href"); }
      }
    });
    royxat.addEventListener("mousemove", e => { const b = e.target.closest(".bp-band"); if (b){ const i = bandlar().indexOf(b); if (i !== faol) belgila(i); } });
    royxat.addEventListener("click", e => { const b = e.target.closest(".bp-band"); if (b) yop(); });
    d.querySelector(".bp-yop").addEventListener("click", yop);
    d.addEventListener("cancel", e => { e.preventDefault(); yop(); });
    d.addEventListener("keydown", e => {
      if (e.key === "Escape"){ e.preventDefault(); e.stopPropagation(); yop(); return; }
      tut(e, d);
    });
    d.addEventListener("click", e => { if (e.target === d) yop(); });
    tarjima(d);
    inp.value = boshMatn || "";
    chiz();
    if (d.showModal) d.showModal(); else d.setAttribute("open", "");
    inp.focus();
    inp.setSelectionRange(inp.value.length, inp.value.length);
  }
  MKB.palitra = {och: palitraOch, yop: () => { if (palitraEl) palitraEl.querySelector(".bp-yop").click(); }, natijalar: palitraNatijalari};

  /* ============================================================
     8.2 Tugmalar ro'yxati
     ============================================================ */
  const TUGMALAR = [
    [["Ctrl", "K"], "Buyruqlar oynasi", ["/"]],
    [["?"], "Tugmalar ro'yxati"],
    [["g", "p"], "Bosh panel"], [["g", "o"], "Obyektlar"], [["g", "t"], "Qarorlar"], [["g", "v"], "Vazifalar"], [["g", "b"], "Bildirishnomalar"],
    [["Esc"], "Ochiq oyna, panel yoki ro'yxatni yopish"],
    [["Ctrl", "Z"], "Oxirgi amalni qaytarish (xabar ko'rinib turganda)"],
    [["Ctrl", "S"], "Formani saqlash"],
    [["↑", "↓"], "Jadval qatorlari bo'ylab yurish"], [["Enter"], "Qatorni ochish"], [["Bo'sh joy"], "Qatorni tanlash"],
  ];
  const tugmaJadvali = () => '<table class="tugma-jadval"><tbody>' + TUGMALAR.map(([k, n, qosh]) =>
    "<tr><td>" + k.map(x => "<kbd>" + e_(x) + "</kbd>").join(" ") + (qosh ? " <span>yoki</span> " + qosh.map(x => "<kbd>" + e_(x) + "</kbd>").join(" ") : "") + "</td><td>" + e_(n) + "</td></tr>").join("") +
    "</tbody></table>";
  function tugmalarOch(){
    if (document.querySelector(".tugmalar-oyna")) return;
    const p = MKB.modal("Klaviatura tugmalari", tugmaJadvali(), {okMatn: "Yopish"});
    p.classList.add("tugmalar-oyna");
    const b = p.querySelector('[data-amal="bekor"]');
    if (b) b.remove();
  }
  MKB.tugmalarOch = tugmalarOch;

  /* ============================================================
     8.3 Yaqinda ochilganlar
     ============================================================ */
  const yaqindaKalit = () => kalit("mkb4-yaqinda:" + login());
  MKB.yaqinda = {
    qosh(b){
      if (!b || !b.tur || !b.id) return;
      const band = {tur: b.tur, id: String(b.id), nom: String(b.nom || b.id), havola: b.havola || ((YOZUV_TURI[b.tur] || {}).sahifa || "") + "?id=" + encodeURIComponent(b.id), vaqt: Date.now()};
      lsYoz(yaqindaKalit(), SOF.yaqindaQosh(lsOqi(yaqindaKalit(), []), band, 12));
    },
    royxat(){
      const D0 = D();
      return (lsOqi(yaqindaKalit(), []) || []).filter(x => {
        if (!x || !x.tur || !x.id || !ruxsat(x.havola)) return false;
        const T = YOZUV_TURI[x.tur];
        if (!T) return true;
        const kol = (D0[T.kol] || []).concat(x.tur === "obyekt" ? (D0.ARXIV || []) : []);
        const y = kol.find(r => r && String(r.id) === String(x.id));
        return !!y && MKB.doira([y]).length > 0;
      });
    },
  };
  /* Yozuv sahifasi ochilganda avtomatik qo'shiladi (sahifa o'zi qo'shsa ham takrorlanmaydi) */
  function yaqindaAvto(){
    const f = fayl(), id = new URLSearchParams(location.search).get("id");
    if (!id) return;
    const tur = /^(obyekt|obyekt-[a-z]+|arxiv-obyekt)\.html$/.test(f) && f !== "obyekt-tahrir.html" ? "obyekt" : f === "lot.html" ? "lot" : f === "ish.html" ? "ish" :
      f === "hodisa.html" ? "hodisa" : f === "qurilma.html" ? "qurilma" : f === "shartnoma.html" ? "shartnoma" : f === "tasdiqlar.html" ? "tasdiq" : null;
    if (!tur) return;
    const T = YOZUV_TURI[tur];
    const D0 = D();
    const y = (D0[T.kol] || []).concat(tur === "obyekt" ? (D0.ARXIV || []) : []).find(r => r && String(r.id) === id);
    if (!y) return;
    MKB.yaqinda.qosh({tur, id, nom: T.nom(y), havola: (tur === "obyekt" ? (f === "arxiv-obyekt.html" ? f : "obyekt.html") : T.sahifa) + "?id=" + encodeURIComponent(id)});
  }

  /* ============================================================
     Umumiy tugmalar (8.2)
     ============================================================ */
  const yozyaptimi = el => !!el && (/^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName) || el.isContentEditable);
  let gVaqt = 0;
  function tugmalarUla(){
    document.addEventListener("keydown", e => {
      const f = document.activeElement;
      const k = (e.key || "").toLowerCase();
      if ((e.ctrlKey || e.metaKey) && !e.altKey && k === "k"){
        e.preventDefault();
        if (palitraEl) MKB.palitra.yop(); else if (!document.querySelector(".modal-parda, .sayohat-qatlam")) palitraOch("");
        return;
      }
      if ((e.ctrlKey || e.metaKey) && !e.altKey && k === "s"){
        const q = Array.from(qoriqlar).find(x => x.forma.isConnected && x.forma.querySelector("[data-saqla]"));
        const b = q ? q.forma.querySelector("[data-saqla]") : document.querySelector("main [data-saqla]");
        if (b){ e.preventDefault(); if (!b.disabled) b.click(); }
        return;
      }
      if ((e.ctrlKey || e.metaKey) && !e.shiftKey && k === "z" && joriyQaytarish && !yozyaptimi(f)){
        e.preventDefault(); joriyQaytarish.bekorQil(); return;
      }
      if (e.ctrlKey || e.metaKey || e.altKey || yozyaptimi(f) || e.defaultPrevented) return;
      if (ochiqDialogBormi()) return;
      if (e.key === "/"){ e.preventDefault(); palitraOch(""); return; }
      if (e.key === "?"){ e.preventDefault(); tugmalarOch(); return; }
      if (k === "g"){ gVaqt = Date.now(); return; }
      if (gVaqt && Date.now() - gVaqt < 1500){
        gVaqt = 0;
        const rol = typeof joriyRolKalit === "function" ? joriyRolKalit() : null;
        const manzil = {p: typeof rolBoshSahifasi === "function" ? rolBoshSahifasi(rol) : "panel.html", o: "obyektlar.html", t: "tasdiqlar.html", v: "vazifalar.html", b: "bildirishnomalar.html"}[k];
        if (manzil && ruxsat(manzil)){ e.preventDefault(); location.href = manzil; }
      }
    });
  }

  /* ============================================================
     9.1 Sessiya muddati
     ============================================================ */
  let ogohOyna = null;
  function sessiyaKuzat(){
    if (!window.MKBapi || !MKBapi.faollikBelgila) return;
    let yozilgan = 0;
    const harakat = () => {
      if (ogohOyna) return;           /* ogohlantirish ochiq: faqat "Davom etish" uzaytiradi */
      const h = Date.now();
      if (h - yozilgan > 15000){ yozilgan = h; MKBapi.faollikBelgila(); }
    };
    ["pointerdown", "keydown", "wheel", "touchstart"].forEach(t => document.addEventListener(t, harakat, {passive: true, capture: true}));
    window.addEventListener("scroll", harakat, {passive: true});
    window.addEventListener("storage", e => { if (e.key === "mkb4-faollik" && ogohOyna) ogohYop(); if (e.key === "mkb4-sessiya" && !e.newValue) muddatTugadi(true); });
    setInterval(tekshir, 5000);
    function tekshir(){
      const s = sessiya();
      if (!s){ muddatTugadi(false); return; }
      const qoldi = MKBapi.kutishMs() - (Date.now() - MKBapi.faollik());
      if (qoldi <= 120000 && !ogohOyna) ogohOch();
    }
  }
  function ogohOch(){
    const oldingi = document.activeElement;
    const parda = document.createElement("div");
    const sid = yangiId("so");
    parda.className = "modal-parda ochiq sessiya-parda";
    parda.innerHTML = '<div class="modal" role="alertdialog" aria-modal="true" aria-labelledby="' + sid + '" aria-describedby="' + sid + '-m">' +
      '<div class="modal-bosh"><h3 id="' + sid + '">Sessiya tez orada yopiladi</h3></div>' +
      '<div class="modal-tana"><p class="tasdiqla-matn" id="' + sid + '-m"><span>Harakat bo&#39;lmagani uchun sessiya yopiladi. Qolgan vaqt:</span> <b class="sessiya-vaqt" data-tarjimasiz>2:00</b></p>' +
        '<p class="maydon-izoh">Formadagi saqlanmagan ma&#39;lumot shu qurilmada qoralama sifatida saqlanadi.</p>' +
        '<p class="sr-only" aria-live="assertive" data-sessiya-elon></p></div>' +
      '<div class="modal-oyoq"><button type="button" class="tugma tugma-oq" data-s="chiq">Tizimdan chiqish</button>' +
        '<button type="button" class="tugma tugma-asosiy" data-s="davom">' + ik_("yangilash") + "Davom etish</button></div></div>";
    document.body.appendChild(parda);
    tarjima(parda);
    const fonQaytar = inertQil([parda]);
    const vaqtEl = parda.querySelector(".sessiya-vaqt"), elon = parda.querySelector("[data-sessiya-elon]");
    let oxirgiElon = 0;
    const yangila = () => {
      const qoldi = MKBapi.kutishMs() - (Date.now() - MKBapi.faollik());
      if (qoldi <= 0){ muddatTugadi(false); return; }
      vaqtEl.textContent = SOF.qoldiMatn(qoldi);
      if (Date.now() - oxirgiElon >= 30000){ oxirgiElon = Date.now(); elon.textContent = (typeof joriyTil === "function" && joriyTil() === "ru" ? "Сессия закроется через " : "Sessiya yopilishiga qoldi: ") + SOF.qoldiMatn(qoldi); }
    };
    const taymer = setInterval(yangila, 1000);
    ogohOyna = {parda, yop(){ clearInterval(taymer); parda.remove(); fonQaytar(); ogohOyna = null; if (oldingi && oldingi.focus && document.contains(oldingi)) oldingi.focus(); }};
    const davom = parda.querySelector('[data-s="davom"]');
    davom.addEventListener("click", () => MKB.band(davom, () => MKBapi.sessiyaUzaytir()).then(() => ogohYop(), e => MKB.toast(e && e.message ? e.message : "Sessiya uzaytirilmadi", "xavf")));
    parda.querySelector('[data-s="chiq"]').addEventListener("click", () => { ogohYop(); MKB.tizimdanChiq(); });
    parda.addEventListener("keydown", e => { tut(e, parda.querySelector(".modal")); if (e.key === "Escape"){ e.preventDefault(); e.stopPropagation(); } });
    yangila();
    davom.focus();
  }
  function ogohYop(){ if (ogohOyna) ogohOyna.yop(); }
  let tugadiBelgi = false;
  function muddatTugadi(boshqaOyna){
    if (tugadiBelgi) return;
    tugadiBelgi = true;
    qoralamalarniSaqla();
    chiqishRuxsat = true;
    ogohYop();
    try{ sessionStorage.setItem("mkb4-sessiya-sabab", "muddat"); }catch(_){ }
    if (!boshqaOyna) MKBapi.chiqish();
    location.href = "kirish.html?sabab=muddat&qaytish=" + encodeURIComponent(fayl() + location.search);
  }
  /* Kirish sahifasi: sabab matni va kirgandan keyin shu sahifaga qaytish */
  function kirishSahifasi(){
    const p = new URLSearchParams(location.search);
    const qaytish = p.get("qaytish");
    if (p.get("sabab") === "muddat"){
      const forma = document.getElementById("kirish-forma");
      if (forma && !document.querySelector(".kirish-sabab")){
        const b = document.createElement("div");
        b.className = "kirish-sabab";
        b.setAttribute("role", "status");
        b.innerHTML = ik_("qulf") + "<span>Xavfsizlik uchun sessiya yopildi. Qayta kiring, ish shu sahifadan davom etadi</span>";
        forma.insertBefore(b, forma.firstChild);
        tarjima(b);
      }
    }
    if (qaytish && SOF.xavfsizQaytish(qaytish) && typeof window.rolBoshSahifasi === "function"){
      const asl = window.rolBoshSahifasi;
      window.rolBoshSahifasi = function(rol){
        return (sessiya() && ruxsat(qaytish)) ? qaytish : asl(rol);
      };
    }
  }

  /* ============================================================
     9.2 Aloqa uzilishi
     ============================================================ */
  let lenta = null, oflayn = false, tiklandiT = 0;
  function lentaOl(){
    if (lenta && lenta.isConnected) return lenta;
    lenta = document.createElement("div");
    lenta.className = "oflayn-lenta";
    lenta.setAttribute("role", "status");
    lenta.hidden = true;
    const shapka = document.getElementById("shapka");
    if (shapka && shapka.parentNode) shapka.insertAdjacentElement("afterend", lenta); else document.body.insertBefore(lenta, document.body.firstChild);
    return lenta;
  }
  function yozuvchiTugmalar(ochiq){
    document.querySelectorAll("[data-yozadi]").forEach(b => {
      if (!ochiq){ if (!b.disabled){ b.disabled = true; b.dataset.oflaynYopdi = "1"; attrOrnat(b, "title", "Aloqa tiklanganda saqlash mumkin"); } }
      else if (b.dataset.oflaynYopdi){ b.disabled = false; delete b.dataset.oflaynYopdi; b.removeAttribute("title"); b.removeAttribute("data-asl-title"); }
    });
  }
  const attrOrnat = (el, a, v) => { if (typeof attrTarjima === "function") attrTarjima(el, a, v); else el.setAttribute(a, v); };
  function aloqaYoq(){
    if (oflayn) return;
    oflayn = true;
    clearTimeout(tiklandiT);
    const l = lentaOl();
    const server = window.MKBapi && MKBapi.rejim() === "server";
    l.className = "oflayn-lenta";
    l.innerHTML = ik_("xavf") + "<span>" + (server
      ? "Internet aloqasi yo&#39;q. O&#39;zgarishlar serverga yuborilmaydi. Formadagi ma&#39;lumot shu qurilmada qoralama sifatida saqlanadi."
      : "Internet aloqasi yo&#39;q. Namoyish rejimida ma&#39;lumot shu brauzerda saqlanadi") + "</span>";
    l.hidden = false;
    tarjima(l);
    if (server) yozuvchiTugmalar(false);
    qoralamalarniSaqla();
  }
  function aloqaBor(){
    if (!oflayn) return;
    oflayn = false;
    const l = lentaOl();
    l.className = "oflayn-lenta tiklandi";
    l.innerHTML = ik_("tasdiq") + "<span>Aloqa tiklandi</span>";
    tarjima(l);
    yozuvchiTugmalar(true);
    clearTimeout(tiklandiT);
    tiklandiT = setTimeout(() => { l.hidden = true; }, 4000);
    belgilar.forEach(b => b.yangilaBirMarta());
  }
  function aloqaKuzat(){
    window.addEventListener("offline", aloqaYoq);
    window.addEventListener("online", aloqaBor);
    if (navigator.onLine === false) aloqaYoq();
  }

  /* ============================================================
     9.3 Yangilanish vaqti belgisi
     ============================================================ */
  const belgilar = new Set();
  MKB.yangilanganBelgi = function(joy, o){
    o = o || {};
    const el = typeof joy === "string" ? document.getElementById(joy) : joy;
    if (!el) return {belgila(){}, yangila(){}};
    if (el.textContent.trim() === "—") el.textContent = "";
    const w = document.createElement("span");
    w.className = "yangilangan";
    /* Vaqt belgisi holat xabari emas: jonli mintaqa bo'lmaydi, aks holda har 30 soniyada qayta o'qiladi */
    w.innerHTML = '<span class="y-matn"></span>' +
      '<button type="button" class="doira-tugma kichik y-tugma" aria-label="Yangilash" title="Yangilash">' + ik_("yangilash") + "</button>";
    /* Sarlavha qatori sig'may qolmasin: belgi non-yo'l qatoriga chiqadi, sahifa amallari sarlavha yonida qoladi */
    const shapkaBloki = el.closest && el.closest(".hujjat-shapka");
    const nonYol = shapkaBloki && el.closest(".hs-qator") ? shapkaBloki.querySelector(".hs-yorliq") : null;
    const joyEl = nonYol || el;
    joyEl.hidden = false;
    joyEl.appendChild(w);
    const matn = w.querySelector(".y-matn"), tugma = w.querySelector(".y-tugma");
    let vaqt = null;
    let oxirgiHTML = null;
    const chiz = () => {
      if (!vaqt){ if (oxirgiHTML !== ""){ matn.innerHTML = ""; oxirgiHTML = ""; } return; }
      const daq = Math.floor((Date.now() - vaqt) / 60000);
      w.classList.toggle("eski", daq >= 5);
      const yangi = daq >= 5 ? '<span data-tarjimasiz>' + daq + "</span> <span>daqiqa oldin</span>" : "<span>Yangilandi</span> <span data-tarjimasiz>" + soatMatn(new Date(vaqt)) + "</span>";
      /* Matn o'zgarmagan bo'lsa DOM ham o'zgarmaydi */
      if (yangi === oxirgiHTML) return;
      oxirgiHTML = yangi;
      matn.innerHTML = yangi;
      tarjima(matn);
    };
    const yangila = () => MKB.band(tugma, async () => { if (o.yangila) await o.yangila(); b.belgila(); });
    tugma.addEventListener("click", () => { yangila().catch(e => MKB.toast(e && e.message ? "Yangilab bo'lmadi: " + e.message : "Yangilab bo'lmadi", "xavf")); });
    setInterval(chiz, 30000);
    if (o.avto > 0){
      setInterval(() => {
        if (document.visibilityState !== "visible" || !window.MKBapi || MKBapi.rejim() !== "server" || ochiqDialogBormi() || iflosQoriq() || oflayn) return;
        yangila().catch(() => {});
      }, o.avto * 1000);
    }
    tarjima(w);
    const b = {
      belgila(){ vaqt = Date.now(); chiz(); },
      yangila,
      yangilaBirMarta(){ if (window.MKBapi && MKBapi.rejim() === "server") yangila().catch(() => {}); },
    };
    belgilar.add(b);
    b.belgila();
    return b;
  };

  /* ============================================================
     10.1 MKB.csvImport — CSV fayldan yozuv qo'shish
     ============================================================ */
  MKB.csvImport = function(cfg){
    cfg = cfg || {};
    const ust = cfg.ustunlar || [];
    const birlik = cfg.birlik || "yozuv";
    const holat = {sarlavhalar: [], qatorlar: [], moslik: {}, natija: null};
    const p = MKB.modal(cfg.sarlavha || "CSV fayldan qo'shish", '<div class="csv-import"></div>', {okMatn: "Davom etish", ok: () => { keyingi(); return false; }});
    p.querySelector(".modal").classList.add("keng-modal");
    const joy = p.querySelector(".csv-import");
    const ok = p.querySelector('[data-amal="ok"]');
    let qadam = 1;
    const qadamSarlavha = n => '<ol class="csv-qadamlar" aria-label="Qadamlar">' + ["Fayl", "Ustunlar", "Tekshiruv", "Saqlash"].map((x, i) =>
      '<li class="' + (i + 1 < n ? "otdi" : i + 1 === n ? "joriy" : "") + '"' + (i + 1 === n ? ' aria-current="step"' : "") + '><span data-tarjimasiz>' + (i + 1) + "</span>" + x + "</li>").join("") + "</ol>";
    const qatorTekshir = r => {
      const x = {}, xatolar = [];
      ust.forEach(u => {
        const i = holat.moslik[u.kalit];
        const v = i >= 0 ? String(r[i] == null ? "" : r[i]).trim() : "";
        if (!v){ if (u.majburiy) xatolar.push({nom: u.nom, matn: "kiritilmagan"}); x[u.kalit] = null; return; }
        if (u.format){
          const fx = SOF.formatXatosi(u.format, v, {});
          if (fx){ xatolar.push({nom: u.nom, matn: fx}); x[u.kalit] = undefined; return; }
          x[u.kalit] = SOF.ajrat(u.format, v);
        } else x[u.kalit] = v;
      });
      /* Qo'shimcha tekshiruv har doim ishlaydi: format xatoli maydon qiymati undefined (null — bo'sh) */
      if (typeof cfg.tekshir === "function"){
        let q = [];
        try{ q = cfg.tekshir(x) || []; }catch(_){ q = []; }
        q.forEach(m => { if (m && xatolar.indexOf(m) < 0) xatolar.push(m); });
      }
      return {x, xatolar};
    };
    /* Xato matni: ustun nomi ham, xatoning o'zi ham alohida bo'lak bo'lib lug'atdan o'tadi */
    const xatoHTML = m => (m && typeof m === "object"
      ? "<span>" + e_(m.nom) + "</span>: <span>" + e_(m.matn) + "</span>"
      : "<span>" + e_(m) + "</span>");
    function chiz(){
      if (qadam === 1){
        joy.innerHTML = qadamSarlavha(1) + '<div class="fayl-joy"></div><p class="maydon-izoh">UTF-8 yoki Windows-1251, ajratgich ";" yoki ",". Birinchi qator — ustun nomlari.</p>';
        const fj = joy.querySelector(".fayl-joy");
        fj.innerHTML = '<label class="fayl-maydon"><input type="file" accept=".csv,text/csv"><span class="fm-belgi">' + ik_("yuklash") + "</span><b>CSV faylni tanlang</b>" +
          "<span><span>Namuna: ustunlar</span> " + ust.map(u => "<span>" + e_(u.nom) + "</span>").join(", ") + "</span></label>";
        fj.querySelector("input").addEventListener("change", async e => {
          const f = e.target.files && e.target.files[0];
          if (!f) return;
          const buf = await f.arrayBuffer();
          let matn;
          try{ matn = new TextDecoder("utf-8", {fatal: true}).decode(buf); }catch(_){ matn = new TextDecoder("windows-1251").decode(buf); }
          const r = SOF.csvAjrat(matn);
          if (r.length < 2){ MKB.toast("Faylda ma'lumot qatori yo'q", "xavf"); return; }
          holat.sarlavhalar = r[0].map(x => String(x).trim());
          holat.qatorlar = r.slice(1);
          holat.moslik = SOF.ustunMoslash(holat.sarlavhalar, ust);
          qadam = 2; chiz();
        });
        ok.hidden = true;
      } else if (qadam === 2){
        joy.innerHTML = qadamSarlavha(2) + '<p class="tasdiqla-matn"><span data-tarjimasiz>' + holat.qatorlar.length + "</span> <span>ta qator topildi. Fayldagi ustunlarni moslang.</span></p>" +
          '<div class="forma-tor">' + ust.map(u => '<label class="maydon"><span class="maydon-yorliq">' + e_(u.nom) + (u.majburiy ? " <b>*</b>" : "") + "</span>" +
            '<span class="kirish"><select data-moslik="' + e_(u.kalit) + '"><option value="-1">Tanlanmagan</option>' +
            holat.sarlavhalar.map((h, i) => '<option value="' + i + '"' + (holat.moslik[u.kalit] === i ? " selected" : "") + ">" + e_(h) + "</option>").join("") +
            "</select></span></label>").join("") + "</div>";
        joy.querySelectorAll("[data-moslik]").forEach(s => s.addEventListener("change", () => { holat.moslik[s.dataset.moslik] = +s.value; }));
        ok.hidden = false; ok.lastChild.textContent = "Tekshirish";
      } else if (qadam === 3){
        const tek = holat.qatorlar.map(qatorTekshir);
        holat.tek = tek;
        const yaxshi = tek.filter(t => !t.xatolar.length).length;
        joy.innerHTML = qadamSarlavha(3) +
          '<p class="tasdiqla-matn"><span data-tarjimasiz>' + yaxshi + "</span> <span>ta qator to'g'ri,</span> <span data-tarjimasiz>" + (tek.length - yaxshi) + "</span> <span>ta qatorda xato bor.</span></p>" +
          '<div class="csv-korik"><table class="jadval"><thead><tr><th>№</th>' + ust.map(u => "<th>" + e_(u.nom) + "</th>").join("") + "<th>Holat</th></tr></thead><tbody>" +
          tek.slice(0, 200).map((t, i) => "<tr><td data-tarjimasiz>" + (i + 2) + "</td>" + ust.map(u => {
            const j = holat.moslik[u.kalit];
            return '<td data-tarjimasiz>' + e_(j >= 0 ? holat.qatorlar[i][j] || "" : "") + "</td>";
          }).join("") + "<td>" + (t.xatolar.length ? '<span class="chip chip-xavf chip-kichik"><span data-tarjimasiz>' + t.xatolar.length + "</span>&nbsp;<span>ta xato</span></span>" +
            '<ul class="csv-xatolar">' + t.xatolar.map(m => "<li>" + xatoHTML(m) + "</li>").join("") + "</ul>" : '<span class="chip chip-yashil chip-kichik">To&#39;g&#39;ri</span>') + "</td></tr>").join("") +
          "</tbody></table></div>" + (tek.length > 200 ? '<p class="maydon-izoh">Birinchi 200 qator ko&#39;rsatildi.</p>' : "");
        ok.hidden = !yaxshi; ok.lastChild.textContent = "Saqlash";
      }
      tarjima(joy);
      tarjima(ok);
    }
    async function keyingi(){
      if (qadam === 2){
        const yoq = ust.filter(u => u.majburiy && !(holat.moslik[u.kalit] >= 0));
        if (yoq.length){ MKB.toast("Majburiy ustunni tanlang: " + yoq.map(u => u.nom).join(", "), "xavf"); return; }
        qadam = 3; chiz(); return;
      }
      if (qadam === 3){
        const yaxshi = holat.tek.filter(t => !t.xatolar.length);
        const yomon = holat.tek.length - yaxshi.length;
        const r = await MKB.tasdiqla({sarlavha: "Yozuvlarni qo'shish", matn: yaxshi.length + " ta " + birlik + " qo'shiladi, " + yomon + " ta qator o'tkazib yuboriladi.", okMatn: "Qo'shish"});
        if (!r) return;
        qadam = 4;
        joy.innerHTML = qadamSarlavha(4) + '<div class="yuklash-bar" role="progressbar" aria-valuemin="0" aria-valuemax="' + yaxshi.length + '" aria-valuenow="0"><i></i></div><p class="tasdiqla-matn" aria-live="polite"></p>';
        tarjima(joy);
        ok.hidden = true;
        const bar = joy.querySelector(".yuklash-bar"), izoh = joy.querySelector(".tasdiqla-matn");
        const rad = [];
        let n = 0, saqlandi = 0;
        for (const t of yaxshi){
          try{ await cfg.saqla(t.x); saqlandi++; }
          catch(e){ rad.push({t, xato: e && e.message ? e.message : "Saqlanmadi"}); }
          n++;
          bar.setAttribute("aria-valuenow", String(n));
          bar.querySelector("i").style.width = (n / yaxshi.length * 100) + "%";
          izoh.textContent = n + " / " + yaxshi.length;
        }
        const radQatorlar = holat.tek.map((t, i) => ({t, i})).filter(({t}) => t.xatolar.length).map(({t, i}) => holat.qatorlar[i].concat([t.xatolar.join("; ")]))
          .concat(rad.map(r2 => holat.qatorlar[holat.tek.indexOf(r2.t)].concat([r2.xato])));
        izoh.innerHTML = "<span data-tarjimasiz>" + saqlandi + "</span> <span>ta yozuv qo'shildi.</span>" + (radQatorlar.length ? " <span data-tarjimasiz>" + radQatorlar.length + "</span> <span>ta qator rad etildi.</span>" : "");
        if (radQatorlar.length){
          const b = document.createElement("button");
          b.type = "button"; b.className = "tugma tugma-oq tugma-kichik";
          b.innerHTML = ik_("csv") + "Rad etilgan qatorlar (CSV)";
          b.addEventListener("click", () => MKB.csv("rad-etilgan-qatorlar.csv", holat.sarlavhalar.concat(["Sabab"]), radQatorlar));
          joy.appendChild(b);
        }
        tarjima(joy);
        const bek = p.querySelector('[data-amal="bekor"]');
        if (bek){ bek.textContent = "Yopish"; tarjima(bek); }
        if (typeof cfg.keyin === "function") cfg.keyin({saqlandi, rad: radQatorlar.length});
      }
    }
    chiz();
    return p;
  };

  /* ============================================================
     11. MKB.sayohat — yo'l ko'rsatuvchi sayohat
     ============================================================ */
  const SAYOHAT_KALIT = "mkb-sayohat";
  /* ?sayohat=&qadam= skript yuklanganda o'qiladi: sahifa keyin manzilni o'zgartirsa ham yo'qolmaydi */
  const BOSH_PARAM = new URLSearchParams(window.MKB_BOSH_URL != null ? window.MKB_BOSH_URL : location.search);
  const sayohatHolati = () => ssOqi(SAYOHAT_KALIT, null);
  const sayohatLsKalit = () => kalit("mkb4-sayohat:" + login());
  function ozYozuv(){
    const s = sessiya();
    if (!s) return null;
    return (D().FOYDLAR || []).find(f => f && ((s.id && f.id === s.id) || (s.login && f.login === s.login))) || null;
  }
  function sayohatHolatlari(){
    const f = ozYozuv();
    return Object.assign({}, lsOqi(sayohatLsKalit(), {}) || {}, (f && f.sayohatlar && typeof f.sayohatlar === "object") ? f.sayohatlar : {});
  }
  async function sayohatBelgila(id, holatNom, qadam){
    const f = ozYozuv();
    const yangi = Object.assign({}, sayohatHolatlari());
    if (holatNom) yangi[id] = {holat: holatNom, sana: SOF.nuqtali(MKB.bugun()), qadam: Math.max(0, qadam || 0)}; else delete yangi[id];
    lsYoz(sayohatLsKalit(), yangi);
    if (f){ try{ await MKBapi.yangilash("FOYDLAR", f.id, {sayohatlar: yangi}); }catch(_){ } }
  }
  const rolKalit = () => (typeof joriyRolKalit === "function" ? joriyRolKalit() : null);
  function oringa(sahifa){
    const D0 = D();
    const b = (kol, sh) => { const x = MKB.doira(D0[kol] || []).find(y => y && (!sh || sh(y))); return x ? encodeURIComponent(x.id) : ""; };
    return String(sahifa || "")
      .replace("{birinchiObyekt}", () => b("YOZUVLAR", y => y.holat !== "Chiqarildi"))
      .replace("{birinchiLot}", () => b("LOTLAR"))
      .replace("{birinchiQaror}", () => b("TASDIQLAR", t => t.holat === "kutilmoqda"))
      .replace("{birinchiIsh}", () => b("UNDIRUV_ISHLAR"));
  }
  const sahifaFayli = s => String(s || "").split("?")[0].split("#")[0];
  function sayohatQadamlari(id){
    const T = (window.MKB_SAYOHATLAR || {})[id];
    if (!T || !Array.isArray(T.qadamlar)) return [];
    const rol = rolKalit();
    const rollar = Array.isArray(T.rol) ? T.rol : [T.rol || "hammasi"];
    if (rollar.indexOf("hammasi") < 0 && rollar.indexOf(rol) < 0) return [];
    return T.qadamlar.filter(q => q && (!q.sahifa || ruxsat(sahifaFayli(q.sahifa))));
  }
  let sayohatJoriy = null;
  const sayohat = {
    boshla(id, o){
      o = o || {};
      const T = (window.MKB_SAYOHATLAR || {})[id];
      if (!T){ MKB.toast("Sayohat topilmadi", "xavf"); return false; }
      const rejim = T.rejim || "sayohat";
      if (rejim === "namoyish" && window.MKBapi && MKBapi.manba() !== "shartli"){ MKB.toast("Namoyish faqat shartli ma'lumotda ishlaydi", "info"); return false; }
      const q = sayohatQadamlari(id);
      if (!q.length){ MKB.toast("Bu sayohat sizning rolingiz uchun emas", "info"); return false; }
      ssYoz(SAYOHAT_KALIT, {id, qadam: Math.max(0, Math.min(o.qadam || 0, q.length - 1)), rejim, yonalish: 1});
      sayohatBaj();
      return true;
    },
    davom(){
      const p = BOSH_PARAM;
      if (p.get("sayohat") && !sayohatHolati()){ sayohat.boshla(p.get("sayohat"), {qadam: Math.max(0, (+p.get("qadam") || 1) - 1)}); return; }
      if (sayohatHolati()) sayohatBaj();
    },
    /* To'xtatilgan sayohat o'chirilgan emas: qadami saqlanadi va taklif kartasi uni davom ettiradi */
    toxtat(){ const h = sayohatHolati(); if (h) sayohatBelgila(h.id, "yarim", h.qadam); sayohatTozala(); },
    tugat(){ const h = sayohatHolati(); if (h) sayohatBelgila(h.id, "tugadi"); sayohatTozala(); },
    sahifaUchun(f){
      f = f || fayl();
      return Object.keys(window.MKB_SAYOHATLAR || {}).filter(id => sayohatQadamlari(id).some(q => sahifaFayli(q.sahifa) === f))
        .map(id => Object.assign({id}, window.MKB_SAYOHATLAR[id]));
    },
    holat: id => (sayohatHolatlari()[id] || {}).holat || null,
    qadami: id => Math.max(0, (sayohatHolatlari()[id] || {}).qadam || 0),
    async tiklash(){
      lsYoz(sayohatLsKalit(), {});
      const f = ozYozuv();
      if (f) await MKBapi.yangilash("FOYDLAR", f.id, {sayohatlar: {}});
      try{ sessionStorage.removeItem("mkb-sayohat-keyinroq"); }catch(_){ }
    },
  };
  MKB.sayohat = sayohat;
  function sayohatTozala(){
    ssYoz(SAYOHAT_KALIT, null);
    if (sayohatJoriy){ sayohatJoriy.yop(); sayohatJoriy = null; }
  }
  /* Joriy qadamni ko'rsatish: kerak bo'lsa boshqa sahifaga o'tiladi */
  async function sayohatBaj(){
    const h = sayohatHolati();
    if (!h) return;
    const T = (window.MKB_SAYOHATLAR || {})[h.id];
    const qadamlar = sayohatQadamlari(h.id);
    if (!T || !qadamlar.length){ sayohatTozala(); return; }
    if (h.qadam >= qadamlar.length){ sayohatYakunla(T, qadamlar, h); return; }
    if (h.qadam < 0){ h.qadam = 0; }
    const q = qadamlar[h.qadam];
    if (q.sahifa && sahifaFayli(q.sahifa) !== fayl()){
      /* boshqa sahifadagi qadam: o'sha sahifaga o'tib davom etiladi */
      ssYoz(SAYOHAT_KALIT, h);
      if (!(await ketishMumkinmi(false))){ sayohat.toxtat(); return; }
      location.href = oringa(q.sahifa);
      return;
    }
    /* Ketma-ket o'tkazib yuborilgan qadamlarda ekran bo'sh turadi, shuning uchun kutish qisqartiriladi */
    const nishon = q.nishon ? await nishonKut(q.nishon, h.otkazildi ? 400 : 2000) : null;
    if (q.nishon && !nishon){
      /* Nishon topilmadi: qadam o'tkazib yuboriladi, lekin sanab boriladi — oxirida sayohat
         jimgina yo'qolmasin, xodimga nima uchun tugaganini aytadigan yakuniy qadam ko'rsatiladi */
      h.otkazildi = (h.otkazildi || 0) + 1;
      if (h.yonalish < 0 && h.qadam <= 0) h.yonalish = 1;
      h.qadam += h.yonalish < 0 ? -1 : 1;
      if (h.qadam < 0) h.qadam = 0;
      ssYoz(SAYOHAT_KALIT, h);
      if (h.qadam >= qadamlar.length){ sayohatYakunla(T, qadamlar, h); return; }
      return sayohatBaj();
    }
    /* Qadam ko'rsatildi: o'tkazib yuborilganlar hisobi nollanadi, yakuniy qadam faqat
       sayohat oxiridagi ketma-ket o'tkazib yuborishdan keyin chiqadi */
    if (h.otkazildi){ h.otkazildi = 0; ssYoz(SAYOHAT_KALIT, h); }
    sayohatKorsat(T, qadamlar, h, q, nishon);
  }
  /* Sayohat oxiri. Qadamlar to'liq ko'rsatilgan bo'lsa — oddiy tugash; bir nechtasi shu rolda
     yoki shu ekranda bo'lmagani uchun o'tkazib yuborilgan bo'lsa — buni aytadigan yakuniy qadam */
  function sayohatYakunla(T, qadamlar, h){
    if (!h || !h.otkazildi){ sayohat.tugat(); return; }
    const hh = Object.assign({}, h, {qadam: Math.max(0, qadamlar.length - 1), yonalish: 1});
    ssYoz(SAYOHAT_KALIT, hh);
    sayohatKorsat(T, qadamlar, hh, {
      sarlavha: "Sayohat tugadi",
      matn: "Oxirgi qadamlar ekranda topilmadi: ular kerakli yozuv ochilganda yoki sizga tegishli ish paydo bo'lganda chiziladi. Sayohatni o'shanda qaytadan boshlang.",
    }, null);
  }
  function nishonKut(sel, ms){
    return new Promise(hal => {
      const top = () => { try{ const el = document.querySelector(sel); return el && el.getClientRects().length ? el : null; }catch(_){ return null; } };
      const x = top();
      if (x){ hal(x); return; }
      const kuz = new MutationObserver(() => { const y = top(); if (y){ kuz.disconnect(); clearTimeout(t); hal(y); } });
      kuz.observe(document.body, {childList: true, subtree: true, attributes: true, attributeFilter: ["hidden", "class", "style"]});
      const t = setTimeout(() => { kuz.disconnect(); hal(top()); }, ms);
    });
  }
  function sayohatKorsat(T, qadamlar, h, q, nishon){
    if (sayohatJoriy) sayohatJoriy.yop();
    const namoyish = h.rejim === "namoyish";
    const amalQadam = !!q.amal;
    const oldingi = document.activeElement;
    const sid = yangiId("sy");
    const qatlam = document.createElement("div");
    qatlam.className = "sayohat-qatlam";
    const maskId = sid + "-m";
    qatlam.innerHTML =
      '<svg class="sayohat-soya" aria-hidden="true" width="100%" height="100%"><defs><mask id="' + maskId + '"><rect x="0" y="0" width="100%" height="100%" fill="#fff"/>' +
        '<rect class="sy-teshik" x="0" y="0" width="0" height="0" rx="12" fill="#000"/></mask></defs>' +
        '<rect class="sy-fon" x="0" y="0" width="100%" height="100%" mask="url(#' + maskId + ')"/></svg>' +
      '<div class="sayohat-halqa" aria-hidden="true"></div>' +
      '<div class="sayohat-tosiq" data-t="yuqori"></div><div class="sayohat-tosiq" data-t="past"></div><div class="sayohat-tosiq" data-t="chap"></div><div class="sayohat-tosiq" data-t="ong"></div>';
    const karta = document.createElement("div");
    karta.className = "sayohat-karta";
    karta.setAttribute("role", "dialog");
    /* Amal qadamida fon inert qilinmaydi (nishonni bosish kerak), shuning uchun karta modal ham emas */
    if (!amalQadam) karta.setAttribute("aria-modal", "true");
    karta.setAttribute("aria-labelledby", sid + "-s");
    karta.setAttribute("aria-describedby", sid + "-m2");
    const n = h.qadam + 1, jami = qadamlar.length;
    karta.innerHTML =
      '<div class="sy-bosh"><span class="sy-soni" data-tarjimasiz>' + n + " / " + jami + '</span><span class="sy-chiziq"><i style="width:' + (n / jami * 100) + '%"></i></span>' +
        (namoyish ? '<button type="button" class="doira-tugma kichik" data-sy="pauza" aria-pressed="false" aria-label="Pauza">' + ik_("soat") + "</button>" : "") +
        '<button type="button" class="sy-otkaz" data-sy="otkaz">' + (namoyish ? "To&#39;xtatish" : "O&#39;tkazib yuborish") + "</button></div>" +
      '<h3 id="' + sid + '-s"></h3><p id="' + sid + '-m2"></p>' +
      '<div class="sy-tugmalar">' +
        (h.qadam > 0 ? '<button type="button" class="tugma tugma-oq tugma-kichik" data-sy="orqaga">' + ik_("chap") + "Orqaga</button>" : "") +
        '<button type="button" class="tugma tugma-asosiy tugma-kichik" data-sy="keyingi">' + (n === jami ? "Tugatish" : "Keyingi") + ik_(n === jami ? "tasdiq" : "ong") + "</button>" +
      "</div>";
    karta.querySelector("h3").textContent = q.sarlavha || T.sarlavha || "";
    karta.querySelector("p").textContent = q.matn || "";
    document.body.appendChild(qatlam);
    document.body.appendChild(karta);
    tarjima(karta);
    const fonQaytar = amalQadam ? () => {} : inertQil([qatlam, karta]);
    const teshik = qatlam.querySelector(".sy-teshik"), halqa = qatlam.querySelector(".sayohat-halqa");
    const tosiq = {};
    qatlam.querySelectorAll(".sayohat-tosiq").forEach(t => { tosiq[t.dataset.t] = t; });
    if (!amalQadam) qatlam.classList.add("toliq-tosiq");
    let rafT = 0, avtoT = 0, pauza = false;
    const joylash = () => {
      cancelAnimationFrame(rafT);
      rafT = requestAnimationFrame(() => {
        const W = window.innerWidth, H = window.innerHeight;
        let r = nishon && nishon.isConnected ? nishon.getBoundingClientRect() : null;
        const pad = 8, bo = 16;
        let radius = 12;
        /* Teshik, halqa va bosishni to'sadigan to'siqlar bitta joydan chiziladi */
        const teshikQoy = (x, y, w, hh) => {
          const rx = Math.min(radius, 36);
          teshik.setAttribute("x", x); teshik.setAttribute("y", y); teshik.setAttribute("width", Math.max(0, w)); teshik.setAttribute("height", Math.max(0, hh)); teshik.setAttribute("rx", rx);
          Object.assign(halqa.style, {left: x + "px", top: y + "px", width: Math.max(0, w) + "px", height: Math.max(0, hh) + "px", borderRadius: rx + "px", display: "block"});
          Object.assign(tosiq.yuqori.style, {left: 0, top: 0, width: W + "px", height: y + "px"});
          Object.assign(tosiq.past.style, {left: 0, top: (y + hh) + "px", width: W + "px", height: Math.max(0, H - y - hh) + "px"});
          Object.assign(tosiq.chap.style, {left: 0, top: y + "px", width: x + "px", height: hh + "px"});
          Object.assign(tosiq.ong.style, {left: (x + w) + "px", top: y + "px", width: Math.max(0, W - x - w) + "px", height: hh + "px"});
        };
        if (r && (r.width || r.height)){
          /* Nishon ekranga sig'maydi: teshik ekran balandligining 60% i bilan cheklanadi.
             Ekranga sig'adigan blok (balandligi 70–98% bo'lsa ham) butunicha yoritiladi */
          if (r.height > H - pad * 2){
            const bosh = Math.max(0, r.top);
            r = {left: r.left, right: r.right, top: bosh, bottom: Math.min(H, bosh + H * 0.6), width: r.width, height: H * 0.6};
          }
          const x = Math.max(0, r.left - pad), y = Math.max(0, r.top - pad), w = Math.min(W, r.right + pad) - x, hh = Math.min(H, r.bottom + pad) - y;
          radius = (parseFloat(getComputedStyle(nishon).borderTopLeftRadius) || 4) + pad;
          teshikQoy(x, y, w, hh);
          r = {left: x, top: y, right: x + w, bottom: y + hh, width: w, height: hh};
        } else {
          teshik.setAttribute("width", 0); teshik.setAttribute("height", 0); halqa.style.display = "none";
          Object.assign(tosiq.yuqori.style, {left: 0, top: 0, width: W + "px", height: H + "px"});
          r = null;
        }
        /* Karta yoritilgan sohani to'smaydi: kesishsa teshik kartaning chetigacha qisqaradi */
        const kartaniAyir = () => {
          if (!r) return;
          const k = karta.getBoundingClientRect();
          if (!k.width || !k.height) return;
          if (k.right <= r.left || k.left >= r.right || k.bottom <= r.top || k.top >= r.bottom) return;
          const yuq = k.top - bo - r.top, past = r.bottom - (k.bottom + bo);
          let y2 = r.top, b2 = r.bottom;
          if (yuq >= past && yuq > 48) b2 = k.top - bo;
          else if (past > 48) y2 = k.bottom + bo;
          else return;
          teshikQoy(r.left, y2, r.width, b2 - y2);
          r = {left: r.left, top: y2, right: r.right, bottom: b2, width: r.width, height: b2 - y2};
        };
        /* Karta joyi: ≤720px — pastki varaq; aks holda joy (past/yuqori/chap/ong/avto), sig'masa teskarisi */
        const tor = W <= 720;
        karta.classList.toggle("varaq", tor);
        if (tor){ karta.style.left = ""; karta.style.top = ""; kartaniAyir(); return; }
        const kw = karta.offsetWidth, kh = karta.offsetHeight;
        let joy = q.joy || "avto", L, Tp;
        if (!r){ L = (W - kw) / 2; Tp = (H - kh) / 2; }
        else {
          const joyBor = {past: H - r.bottom >= kh + bo * 2, yuqori: r.top >= kh + bo * 2, ong: W - r.right >= kw + bo * 2, chap: r.left >= kw + bo * 2};
          const teskari = {past: "yuqori", yuqori: "past", chap: "ong", ong: "chap"};
          if (joy === "avto" || !joyBor[joy]) joy = joy !== "avto" && joyBor[teskari[joy]] ? teskari[joy] : ["past", "yuqori", "ong", "chap"].find(k2 => joyBor[k2]) || "markaz";
          if (joy === "past"){ Tp = r.bottom + bo; L = r.left + r.width / 2 - kw / 2; }
          else if (joy === "yuqori"){ Tp = r.top - kh - bo; L = r.left + r.width / 2 - kw / 2; }
          else if (joy === "ong"){ L = r.right + bo; Tp = r.top + r.height / 2 - kh / 2; }
          else if (joy === "chap"){ L = r.left - kw - bo; Tp = r.top + r.height / 2 - kh / 2; }
          else { L = (W - kw) / 2; Tp = H - kh - bo; }
        }
        karta.style.left = Math.max(bo, Math.min(W - kw - bo, L)) + "px";
        karta.style.top = Math.max(bo, Math.min(H - kh - bo, Tp)) + "px";
        kartaniAyir();
      });
    };
    const ro = window.ResizeObserver ? new ResizeObserver(() => { if (ro.mkbTekshir) ro.mkbTekshir(); joylash(); }) : null;
    if (ro && nishon) ro.observe(nishon);
    window.addEventListener("resize", joylash);
    window.addEventListener("scroll", joylash, true);
    const yurish = d => {
      const hh = sayohatHolati();
      if (!hh) return;
      hh.qadam += d; hh.yonalish = d;
      ssYoz(SAYOHAT_KALIT, hh);
      if (hh.qadam >= qadamlar.length){ sayohat.tugat(); return; }
      if (hh.qadam < 0){ hh.qadam = 0; ssYoz(SAYOHAT_KALIT, hh); }
      yop(false);
      sayohatBaj();
    };
    const tugmaBos = e => {
      const b = e.target.closest("[data-sy]");
      if (!b) return;
      const a = b.dataset.sy;
      if (a === "keyingi") keyingi();
      else if (a === "orqaga") yurish(-1);
      else if (a === "otkaz"){ namoyish ? sayohat.toxtat() : (sayohatBelgila(h.id, "otkazildi"), sayohatTozala()); }
      else if (a === "pauza"){ pauza = !pauza; b.setAttribute("aria-pressed", String(pauza)); attrOrnat(b, "aria-label", pauza ? "Davom ettirish" : "Pauza"); if (!pauza) avtoRejala(); else clearTimeout(avtoT); }
    };
    let bandmi = false;
    async function keyingi(){
      /* Amal bajarilib, ekran yangilanishi kutilayotganda takroriy bosish qadamlarni sakratib yubormasin */
      if (bandmi) return;
      clearTimeout(avtoT);
      /* Qadamda amal bo'lsa, "Keyingi" uni o'zi bajaradi: xodim nishonni bosmasdan Enter bossa ham
         keyingi qadamlarning nishoni paydo bo'ladi. Xodim allaqachon bajargan bo'lsa qayta bajarilmaydi */
      if (q.amal && nishon){
        let bajarilgan = false;
        try{ bajarilgan = !!(q.kutish && document.querySelector(q.kutish)); }catch(_){ }
        if (!bajarilgan){
          bandmi = true;
          try{
            try{
              if (q.amal.tur === "yoz" && "value" in nishon){ nishon.focus(); nishon.value = q.amal.qiymat || ""; nishon.dispatchEvent(new Event("input", {bubbles: true})); nishon.dispatchEvent(new Event("change", {bubbles: true})); }
              else if (q.amal.tur === "bos") nishon.click();
            }catch(_){ }
            /* Ekran o'zgarishini kutamiz: q.kutish yoki keyingi qadamlarning nishonidan qaysi biri
               oldin paydo bo'lsa — o'sha. Shunda ixtiyoriy blok chizilmagan yozuvda ham to'xtab qolinmaydi */
            const kutSel = [q.kutish].concat(qadamlar.slice(h.qadam + 1).map(x => x && x.nishon)).filter(Boolean).join(",");
            if (kutSel) await nishonKut(kutSel, 4000);
          }finally{ bandmi = false; }
        }
      }
      yurish(1);
    }
    const avtoRejala = () => { clearTimeout(avtoT); if (namoyish && !pauza) avtoT = setTimeout(keyingi, 6000); };
    const klav = e => {
      if (e.key === "Escape"){ e.preventDefault(); e.stopPropagation(); sayohat.toxtat(); return; }
      const yoz = yozyaptimi(document.activeElement) && !karta.contains(document.activeElement);
      if (yoz) return;
      if (e.key === "ArrowRight" || (e.key === "Enter" && document.activeElement === karta)){ e.preventDefault(); keyingi(); }
      else if (e.key === "ArrowLeft" && h.qadam > 0){ e.preventDefault(); yurish(-1); }
      else if (e.key === "Tab"){
        const f = Array.from(karta.querySelectorAll("button")).concat(amalQadam && nishon ? [nishon] : []);
        if (!f.length) return;
        const i = f.indexOf(document.activeElement);
        e.preventDefault();
        f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
      }
    };
    karta.addEventListener("click", tugmaBos);
    document.addEventListener("keydown", klav, true);
    let eskiSkrollChek = null, eskiSkrollChekYuq = null;
    function yop(fokusQaytar){
      cancelAnimationFrame(rafT); clearTimeout(avtoT);
      if (nishon && eskiSkrollChek !== null) nishon.style.scrollMarginBottom = eskiSkrollChek;
      if (nishon && eskiSkrollChekYuq !== null) nishon.style.scrollMarginTop = eskiSkrollChekYuq;
      if (ro) ro.disconnect();
      window.removeEventListener("resize", joylash);
      window.removeEventListener("scroll", joylash, true);
      document.removeEventListener("keydown", klav, true);
      fonQaytar();
      qatlam.remove(); karta.remove();
      if (sayohatJoriy && sayohatJoriy.karta === karta) sayohatJoriy = null;
      if (fokusQaytar === false) return;
      /* Sayohat dastur orqali boshlangan bo'lsa oldingi fokus BODY bo'ladi — u holda ma'noli nishonga qaytariladi */
      let qayt = oldingi && oldingi.focus && oldingi !== document.body && document.contains(oldingi) ? oldingi : null;
      /* Nishon odatda butun <section class="karta"> bo'ladi: unga fokus berilsa kartaning atrofida
         qora kontur qolib ketadi. Shuning uchun fokus nishon ichidagi birinchi boshqaruvga beriladi. */
      if (!qayt && nishon && nishon.isConnected)
        qayt = /^(A|BUTTON|INPUT|SELECT|TEXTAREA)$/.test(nishon.tagName) ? nishon
          : Array.from(nishon.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),select,textarea,[tabindex="0"]'))
            .find(x => x.offsetParent !== null) || null;
      if (!qayt) qayt = document.getElementById("yordam-tugma");
      if (!qayt || !qayt.focus) return;
      if (qayt.tabIndex < 0 && !/^(A|BUTTON|INPUT|SELECT|TEXTAREA)$/.test(qayt.tagName)) qayt.tabIndex = -1;
      qayt.focus();
    }
    sayohatJoriy = {karta, yop};
    if (nishon){
      /* Tor ekranda karta pastki varaq bo'ladi: nishon uning ostida qolmasin */
      const torEkran = window.innerWidth <= 720;
      karta.classList.toggle("varaq", torEkran);
      eskiSkrollChek = nishon.style.scrollMarginBottom;
      if (torEkran) nishon.style.scrollMarginBottom = (karta.offsetHeight + 16) + "px";
      /* Ekranga sig'maydigan blok (jadval, doska, uzun ro'yxat) markazga surilsa uning sarlavhasi,
         ustun nomlari va asboblari ekrandan yuqorida qolib ketadi — karta ko'rinmaydigan narsa haqida
         gapiradi. Bunday nishon yuqori chetiga tekislanadi: yoritilgan soha blok boshidan boshlanadi. */
      const bandPast = () => (torEkran ? karta.offsetHeight + 16 : 0);
      const baland = nishon.getBoundingClientRect().height > window.innerHeight - bandPast() - 32;
      eskiSkrollChekYuq = nishon.style.scrollMarginTop;
      if (baland) nishon.style.scrollMarginTop = "96px";
      const surish = tez => nishon.scrollIntoView({block: baland ? "start" : "center",
        behavior: tez ? "auto" : (kamHarakat() ? "auto" : "smooth")});
      surish(false);
      /* Sahifa yuklanishda nishondan yuqoridagi kontent hali chizilayotgan bo'lsa nishon ekrandan
         chiqib ketadi va teshik balandligi nolga tushadi: har takrorda joyi tekshirilib qayta suriladi */
      const joydami = () => {
        if (!nishon.isConnected) return true;
        const r = nishon.getBoundingClientRect();
        return r.bottom > 0 && r.top < window.innerHeight - bandPast();
      };
      let n2 = 0;
      const barqaror = () => {
        if (!joydami()) surish(true);
        joylash();
        if (++n2 < 12) setTimeout(barqaror, 60);
      };
      barqaror();
      if (ro) ro.mkbTekshir = () => { if (!joydami()) surish(true); };
    } else joylash();
    karta.tabIndex = -1;
    setTimeout(() => { const b = karta.querySelector('[data-sy="keyingi"]'); (b || karta).focus(); }, 40);
    avtoRejala();
  }
  /* Birinchi kirish: rolning bosh sahifasida bir martalik taklif kartasi (modal emas) */
  function birinchiTaklif(){
    const rol = rolKalit();
    if (!rol || typeof rolBoshSahifasi !== "function" || fayl() !== rolBoshSahifasi(rol)) return;
    if (sayohatHolati() || ochiqDialogBormi() || iflosQoriq()) return;
    try{ if (sessionStorage.getItem("mkb-sayohat-keyinroq")) return; }catch(_){ }
    const S = window.MKB_SAYOHATLAR || {};
    const yaroqli = k2 => { const h2 = sayohat.holat(k2); return !h2 || h2 === "yarim"; };
    const id = Object.keys(S).find(k2 => S[k2] && S[k2].birinchi && (S[k2].rejim || "sayohat") === "sayohat" && sayohatQadamlari(k2).length && yaroqli(k2));
    if (!id || document.querySelector(".sayohat-taklif")) return;
    const T = S[id];
    /* To'xtatib qo'yilgan sayohat: taklif o'sha qadamdan davom ettiradi */
    const yarim = sayohat.holat(id) === "yarim";
    const boshQadam = yarim ? Math.min(sayohat.qadami(id), sayohatQadamlari(id).length - 1) : 0;
    const k = document.createElement("section");
    k.className = "sayohat-taklif";
    k.setAttribute("aria-labelledby", "sayohat-taklif-s");
    k.innerHTML = '<div class="st-matn"><h3 id="sayohat-taklif-s">Tizim bilan 2 daqiqada tanishing</h3><p></p></div>' +
      '<div class="st-tugmalar"><button type="button" class="tugma tugma-asosiy tugma-kichik" data-st="boshla">' + ik_("ong") +
        (yarim ? "Davom ettirish" : "Boshlash") + "</button>" +
      '<button type="button" class="tugma tugma-oq tugma-kichik" data-st="keyin">Keyinroq</button>' +
      '<button type="button" class="sy-otkaz" data-st="yoq">Boshqa ko&#39;rsatmaslik</button></div>';
    k.querySelector("p").textContent = T.tavsif || T.sarlavha || "";
    /* Lenta oqimda turadi: sarlavhadan keyin, kontentning eng boshida — hech nimani to'smaydi */
    const main = document.querySelector("main.kontent") || document.querySelector("main");
    if (!main) return;
    const shapka = main.querySelector(":scope > nav.bolim-tablar") || main.querySelector(":scope > .hujjat-shapka");
    if (shapka && shapka.nextSibling) main.insertBefore(k, shapka.nextSibling);
    else if (shapka) main.appendChild(k);
    else main.insertBefore(k, main.firstChild);
    tarjima(k);
    /* Sayohat ochilganda lenta yashiriladi: bir vaqtda ikki taklif ko'rinmaydi */
    let rafId = 0;
    const holatTekshir = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => { k.hidden = !!document.querySelector(".sayohat-qatlam"); });
    };
    const kuzat = new MutationObserver(holatTekshir);
    kuzat.observe(document.body, {childList: true, subtree: true, attributes: true, attributeFilter: ["class", "open"]});
    holatTekshir();
    const kartaniYop = () => {
      cancelAnimationFrame(rafId);
      kuzat.disconnect();
      k.remove();
    };
    k.addEventListener("click", e => {
      const b = e.target.closest("[data-st]");
      if (!b) return;
      kartaniYop();
      if (b.dataset.st === "boshla") sayohat.boshla(id, {qadam: boshQadam});
      else if (b.dataset.st === "keyin"){ try{ sessionStorage.setItem("mkb-sayohat-keyinroq", "1"); }catch(_){ } }
      else sayohatBelgila(id, "otkazildi");
    });
  }

  /* ============================================================
     11.5 Yordam paneli
     ============================================================ */
  MKB.yordamOch = function(){
    const f = fayl();
    const rol = rolKalit();
    const Y = (window.MKB_YORDAM || {})[f];
    const qol = typeof qollanmaHTML === "function" ? qollanmaHTML(rol) : null;
    let shu = "";
    if (Y){
      shu = (Y.nimaUchun ? '<p class="qol-maqsad">' + e_(Y.nimaUchun) + "</p>" : "") +
        (Array.isArray(Y.amallar) && Y.amallar.length ? '<ol class="qol-qadamlar">' + Y.amallar.map((a, i) =>
          '<li class="qol-qadam"><span class="raqam">' + (i + 1) + '</span><span class="matn"><b>' + e_(a.nom) + "</b><span>" + e_(a.izoh || "") + "</span></span></li>").join("") + "</ol>" : "") +
        (Array.isArray(Y.qoidalar) && Y.qoidalar.length ? '<div class="qol-blok qol-meyor"><h4>Qoidalar</h4><ul>' + Y.qoidalar.map(x => "<li>" + e_(x) + "</li>").join("") + "</ul></div>" : "") +
        (Y.havola ? '<a class="karta-havola" href="' + e_(Y.havola) + '">Qo&#39;llanmada batafsil' + ik_("ong") + "</a>" : "");
    } else if (qol && qol.Q){
      const mos = (qol.Q.qadamlar || []).filter(x => x.havola && sahifaFayli(x.havola) === f);
      shu = mos.length ? '<ol class="qol-qadamlar">' + mos.map((x, i) => '<li class="qol-qadam"><span class="raqam">' + (i + 1) + '</span><span class="matn"><b>' + x.nom + "</b><span>" + x.izoh + "</span></span></li>").join("") + "</ol>"
        : '<p class="maydon-izoh">Bu sahifa uchun alohida yo&#39;riqnoma hali yozilmagan. Quyida rolingiz bo&#39;yicha ish tartibi.</p>';
    }
    const turlar = sayohat.sahifaUchun(f);
    const oddiy = turlar.filter(t => (t.rejim || "sayohat") === "sayohat");
    const nam = turlar.filter(t => t.rejim === "namoyish");
    /* "Shu sahifa bo'yicha sayohat" haqiqatan shu sahifaniki bo'lsin: rol tanishuvi alohida tugmada turadi */
    /* Shu sahifada faqat oxirgi qadami bor sayohat — "shu sahifa bo'yicha" emas: u yolg'iz xayrlashuv kartasi bo'lib ochiladi */
    const oxirgiYolgiz = t => {
      const q = sayohatQadamlari(t.id);
      return q.length > 1 && q.filter(x => sahifaFayli(x.sahifa) === f).length === 1 && sahifaFayli(q[q.length - 1].sahifa) === f;
    };
    const baho = t => {
      const q = sayohatQadamlari(t.id);
      return (t.birinchi ? 0 : 1000) + (q.length && sahifaFayli(q[0].sahifa) === f ? 100 : 0) +
        (oxirgiYolgiz(t) ? 0 : q.filter(x => sahifaFayli(x.sahifa) === f).length);
    };
    const tartib = oddiy.slice().sort((a, b) => baho(b) - baho(a));
    const shuSayohat = tartib.find(t => !t.birinchi) || null;
    const tanishuv = tartib.find(t => t.birinchi) || (shuSayohat ? null : tartib[0]) || null;
    const tana =
      '<section class="yordam-bolim"><h4>Shu sahifa</h4>' + (Y && Y.sarlavha ? "<b class=\"yordam-nom\">" + e_(Y.sarlavha) + "</b>" : "") + shu +
        ((oddiy.length || nam.length) ? '<div class="yordam-tugmalar">' +
          (shuSayohat ? '<button type="button" class="tugma tugma-asosiy" data-yordam-sayohat="' + e_(shuSayohat.id) + '">' + ik_("ong") + "Shu sahifa bo&#39;yicha sayohat</button>" : "") +
          (tanishuv ? '<button type="button" class="tugma ' + (shuSayohat ? "tugma-oq" : "tugma-asosiy") + '" data-yordam-tanishuv="' + e_(tanishuv.id) + '">' + ik_("ong") + "Rol bilan tanishuv</button>" : "") +
          nam.map(t => '<button type="button" class="tugma tugma-oq" data-yordam-namoyish="' + e_(t.id) + '">' + ik_("korish") + "<span>Qanday ishlaydi</span>" +
            (nam.length > 1 ? ": " + e_(t.sarlavha || "") : "") + "</button>").join("") + "</div>" : "") +
      "</section>" +
      (qol ? '<details class="yordam-bolim"' + (Y ? "" : " open") + "><summary>Mening ish tartibim</summary>" + qol.tana + "</details>" : "") +
      '<details class="yordam-bolim"><summary>Klaviatura</summary>' + tugmaJadvali() + "</details>";
    const {panel, yop} = MKB.yonPanel("Yordam", tana, {yorliq: (qol && qol.nom) || ""});
    panel.addEventListener("click", e => {
      const b = e.target.closest("[data-yordam-sayohat], [data-yordam-namoyish], [data-yordam-tanishuv]");
      if (!b) return;
      const id = b.dataset.yordamSayohat || b.dataset.yordamNamoyish || b.dataset.yordamTanishuv;
      const q = sayohatQadamlari(id);
      const i = q.findIndex(x => sahifaFayli(x.sahifa) === f);
      /* Shu sahifadagi qadam oxirgisi bo'lsa sayohat boshidan ochiladi: yolg'iz yakuniy karta ochilib qolmaydi */
      const boshQadam = b.dataset.yordamSayohat && i > 0 && i + 1 < q.length ? i : 0;
      yop();
      setTimeout(() => sayohat.boshla(id, {qadam: boshQadam}), 300);
    });
  };

  /* ============================================================
     12.4 Chop etish sarlavhasi
     ============================================================ */
  function chopKuzat(){
    window.addEventListener("beforeprint", () => {
      document.querySelectorAll(".chop-sarlavha, .chop-oyoq").forEach(x => x.remove());
      const main = document.querySelector("main.kontent") || document.querySelector("main");
      if (!main) return;
      const s = sessiya() || {};
      const h1 = document.querySelector(".hs-qator h1, main h1");
      const filtrlar = [];
      document.querySelectorAll(".jadval-asbob").forEach(a => {
        const q = a.querySelector("[data-jadval-qidiruv]");
        if (q && q.value.trim()) filtrlar.push((joriyTilRu() ? "Поиск: " : "Qidiruv: ") + q.value.trim());
        const k = a.querySelector("[data-jadval-korinish]");
        if (k && k.value) filtrlar.push(k.options[k.selectedIndex].textContent.trim());
        a.querySelectorAll("[data-jadval-filtr]").forEach(t => {
          const v = t.querySelector(".t-yorliq"), n = t.querySelector(".t-old");
          const p = t.parentNode.querySelector('.menyu-popover [aria-pressed="true"]');
          if (p && p.dataset.qiymat && v && n) filtrlar.push(n.textContent.trim() + " " + v.textContent.trim());
        });
      });
      /* Sahifa o'z filtrlarini qo'shadi: <span data-chop-filtr="Davr: 01.09.2026 – 21.09.2026"> yoki elementning matni */
      document.querySelectorAll("[data-chop-filtr]").forEach(f => {
        const m = (f.getAttribute("data-chop-filtr") || f.textContent || "").replace(/\s+/g, " ").trim();
        if (m && filtrlar.indexOf(m) < 0) filtrlar.push(m);
      });
      const b = document.createElement("div");
      b.className = "chop-sarlavha";
      b.innerHTML = '<div class="cs-logo">' + (typeof LOGO_SVG === "string" ? LOGO_SVG : "") + "<b>Mikrokreditbank</b></div>" +
        '<div class="cs-nom"></div>' + (filtrlar.length ? '<div class="cs-filtr"></div>' : "") +
        '<div class="cs-meta"><span>Chop etildi:</span> <span data-tarjimasiz></span></div>';
      b.querySelector(".cs-nom").textContent = h1 ? h1.textContent.trim() : document.title;
      if (filtrlar.length) b.querySelector(".cs-filtr").textContent = filtrlar.join(" · ");
      b.querySelector(".cs-meta [data-tarjimasiz]").textContent = sanaVaqt(new Date()) + " · " + (s.ism || "") + (s.rol ? ", " + s.rol : "");
      main.insertBefore(b, main.firstChild);
      const o = document.createElement("div");
      o.className = "chop-oyoq";
      o.innerHTML = '<span data-tarjimasiz></span><span>Ichki foydalanish uchun</span>';
      o.querySelector("span").textContent = location.pathname.split("/").pop() + location.search;
      document.body.appendChild(o);
      tarjima(b); tarjima(o);
    });
    window.addEventListener("afterprint", () => document.querySelectorAll(".chop-sarlavha, .chop-oyoq").forEach(x => x.remove()));
  }
  const joriyTilRu = () => typeof joriyTil === "function" && joriyTil() === "ru";

  /* ============================================================
     Ishga tushirish
     ============================================================ */
  window.MKB_UX_TAYYOR = true;
  document.dispatchEvent(new CustomEvent("mkb:ux"));
  let boshlandi = false;
  function boshla(){
    if (boshlandi || !document.body) return;
    boshlandi = true;
    if (fayl() === "kirish.html"){ kirishSahifasi(); return; }
    if (document.body.dataset.ochiq === "1") return;
    chiziqOl();
    MKB.formaUla(document);
    if (window.MutationObserver){
      let navbat = [], rej = 0;
      new MutationObserver(ozg => {
        for (const o of ozg) for (const n of o.addedNodes) if (n.nodeType === 1 && (n.matches("input, select, textarea") || n.querySelector("input, select, textarea"))) navbat.push(n);
        if (navbat.length && !rej) rej = requestAnimationFrame(() => { rej = 0; const r = navbat; navbat = []; r.forEach(x => { if (x.isConnected) MKB.formaUla(x); }); });
      }).observe(document.body, {childList: true, subtree: true});
    }
    tugmalarUla();
    sessiyaKuzat();
    aloqaKuzat();
    chopKuzat();
    try{ yaqindaAvto(); }catch(_){ }
    qoralamalarniTozala(false);
    setTimeout(() => { try{ sayohat.davom(); }catch(_){ } }, 350);
    setTimeout(() => { try{ birinchiTaklif(); }catch(_){ } }, 1600);
  }
  if (window.MKB_TAYYOR) boshla();
  else document.addEventListener("mkb:tayyor", boshla, {once: true});
})();
