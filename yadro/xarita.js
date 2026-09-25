/* ============================================================
   xarita.js — MKB xarita yadrosi (Leaflet ustida)
   Foydalanadi: xarita.html (to'liq ish xaritasi) va panel.html (kichik ko'rinish).

   Asos — vektor: O'zbekiston hududlari va tumanlari repodagi
   assets/geo/*.geojson dan chiziladi. Tashqi tayl serveri talab qilinmaydi,
   shuning uchun xarita bank tarmog'ida internetsiz ham to'liq ishlaydi.
   Sun'iy yo'ldosh va ko'cha qatlami — ixtiyoriy ustki qatlam: plitka
   ochilmasa qatlam o'chadi va vektor asos joyida qoladi.

   Yuklanish tartibi: leaflet.js -> yadro/app.js -> yadro/xarita.js
   (MKB.esc va MKB.rangQiymat kerak; yadro/geo.js sahifada bo'lmasa o'zi ulanadi).

   MKBxarita.asos(xarita, o)      -> vektor asos {tayyor, uslubla, tanla, yorit}
   MKBxarita.plitka(xarita, o)    -> asos() ning eski nomi (panel.html shuni chaqiradi)
   MKBxarita.rasterlar(xarita, o) -> {qoy(nom), ochir(), nomi()} ixtiyoriy plitka
   MKBxarita.klaster(xarita, o)   -> jamlanadigan metkalar qatlami
   MKBxarita.metka / hududMetka / konturQatlami / yorit / sindir
   MKBxarita.olchagich(xarita, o) -> masofa o'lchash asbobi
   MKBxarita.yorliqlarniTekisla / yorliqlarniKuzat -> yozuvlar ustma-ust tushmasin
   ============================================================ */
/* ============================================================
   0. Kvantil shkalasi — Leafletsiz ishlaydi
   Bo'yoq bosqichlarini hisoblaydi. Formula ilgari to'rt sahifada nusxalangan edi va
   hammasida bir xil xato bor edi: qiymat besh tadan kam bo'lsa bo'linish chegarasi
   undefined chiqib, hamma hudud eng to'q pog'onaga bo'yalardi — filtr qo'yilgan xarita
   "hamma joyda eng yuqori daraja" deb o'qilardi. Endi indeks qirqiladi, qiymat soni
   pog'ona sonidan kam bo'lsa shkala eng ochidan boshlanadi va shuncha pog'ona ishlatiladi.

   MKBxarita.shkala(qiymatlar, pogonaSoni) -> {
     bosqich(v)  -> 0..n-1
     bolinish    -> yuqori chegaralar ro'yxati
     pogona      -> haqiqatda ishlatilgan pog'onalar soni
     yagona      -> bitta qiymat qoldi: bo'yoq hech narsa ajratmaydi
     oraliq(i)   -> {past, yuqori} | null  (past — oldingi chegara, i=0 da null)
   }
   ============================================================ */
(function () {
  "use strict";
  const X = (window.MKBxarita = window.MKBxarita || {});

  X.shkala = function (qiymatlar, pogonaSoni) {
    const n = pogonaSoni || 5;
    const q = (qiymatlar || []).filter(v => typeof v === "number" && isFinite(v) && v > 0).sort((a, b) => a - b);
    const noyob = q.filter((v, i) => i === 0 || v !== q[i - 1]);
    const bolinish = [];
    if (noyob.length > 1) {
      if (noyob.length <= n) {
        /* Qiymat pog'onadan kam: har biriga o'z pog'onasi, eng ochidan boshlab */
        for (let i = 0; i < noyob.length - 1; i++) bolinish.push(noyob[i]);
      } else {
        for (let i = 1; i < n; i++) {
          const j = Math.max(0, Math.min(q.length - 1, Math.round(q.length * i / n) - 1));
          bolinish.push(q[j]);
        }
        for (let i = 1; i < bolinish.length; i++) if (bolinish[i] < bolinish[i - 1]) bolinish[i] = bolinish[i - 1];
      }
    }
    const bosqich = v => {
      for (let i = 0; i < bolinish.length; i++) if (v <= bolinish[i]) return i;
      return bolinish.length;
    };
    return {
      bolinish, bosqich,
      pogona: bolinish.length + 1,
      yagona: noyob.length <= 1,
      bosh: noyob.length ? noyob[0] : 0,
      eng: noyob.length ? noyob[noyob.length - 1] : 0,
      /* Legenda uchun: pog'ona chegaralari. past — oldingi pog'onaning yuqori cheti
         (shu pog'onaga kirmaydi), yuqori — shu pog'onaning yuqori cheti (kiradi).
         Shunda shkala uzluksiz bo'ladi: ilgari yorliq kuzatilgan qiymatlardan
         yozilgani uchun oraliqlar orasida ko'rinmas bo'shliq qolardi. */
      oraliq: i => (i < 0 || i > bolinish.length) ? null
        : {past: i === 0 ? null : bolinish[i - 1], yuqori: i < bolinish.length ? bolinish[i] : null}
    };
  };
})();

(function () {
  "use strict";
  if (!window.L) return;

  const esc = s => (window.MKB && MKB.esc ? MKB.esc(s) : String(s == null ? "" : s));
  const rang = v => (window.MKB && MKB.rangQiymat ? MKB.rangQiymat(v) : v);
  const til = () => (document.documentElement.getAttribute("lang") === "ru" ? "ru" : "uz");

  /* ---------- geo.js: sahifa ulamagan bo'lsa o'zi ulaydi ---------- */
  let geoVada = null;
  function geo() {
    if (window.MKB && MKB.geo) return Promise.resolve(MKB.geo);
    if (geoVada) return geoVada;
    geoVada = new Promise((hal, rad) => {
      const ildiz = (function () {
        const s = document.querySelector('script[src*="yadro/xarita.js"]');
        if (s && s.src) return s.src.replace(/[?#].*$/, "").replace(/yadro\/[^/]*$/, "");
        return location.pathname.replace(/[^/]*$/, "");
      })();
      const t = document.createElement("script");
      t.src = ildiz + "yadro/geo.js" + (window.MKB_VERSIYA ? "?v=" + window.MKB_VERSIYA : "");
      t.async = false;
      t.onload = () => (window.MKB && MKB.geo ? hal(MKB.geo) : rad(new Error("Chegara moduli yuklanmadi")));
      t.onerror = () => rad(new Error("Chegara moduli yuklanmadi"));
      document.head.appendChild(t);
    });
    return geoVada;
  }

  /* ---------- Qatlam tartibi ----------
     fon (chegaradan tashqari maydon) -> raster -> tumanlar -> hududlar -> nomlar.
     Har qatlam o'z panelida turgani uchun raster yoqilganda ham kontur va yozuv ustida qoladi. */
  /* Tuman chiziqlari hudud bo'yog'idan yuqorida turadi, shuning uchun bo'yoq ularni bosib ketmaydi */
  /* Yer nomlari metkalar panelidan (600) pastda: jamlangan belgidagi son yozuv ostida qolmaydi */
  const PANEL = {fon: 200, raster: 210, hudud: 402, tuman: 406, nom: 560};
  function panellar(xarita) {
    if (xarita.__mkbPanel) return;
    xarita.__mkbPanel = true;
    Object.keys(PANEL).forEach(nom => {
      const p = xarita.createPane("mkb-" + nom);
      p.style.zIndex = PANEL[nom];
      if (nom === "nom") p.style.pointerEvents = "none";
    });
  }

  /* Bo'yoqning ko'z bilan sezilgan ravshanligi (0 qora — 1 oq).
     Faqat #rrggbb va rgb() qaytadi: rang() CSS tokenini shu ko'rinishga keltiradi. */
  function ravshanlik(v) {
    const s = String(v || "").trim();
    let r = 0, g = 0, b = 0;
    const h = s.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
    if (h) {
      const x = h[1].length === 3 ? h[1].split("").map(c => c + c).join("") : h[1];
      r = parseInt(x.slice(0, 2), 16); g = parseInt(x.slice(2, 4), 16); b = parseInt(x.slice(4, 6), 16);
    } else {
      const m = s.match(/rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/i);
      if (!m) return 1;
      r = +m[1]; g = +m[2]; b = +m[3];
    }
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  }
  /* To'q bo'yoqda oq, och bo'yoqda siyoh chiziq. Shaffoflik shunday tanlangan-ki,
     chiziq bilan bo'yoq orasidagi kontrast beshta bosqichning hammasida 3:1 dan yuqori. */
  function chegaraChizigi(boyoq) {
    return ravshanlik(boyoq) < 0.52
      ? {chiziq: "var(--oq)", qalinlik: 1.4, shaffof: .8}
      : {chiziq: "var(--siyoh)", qalinlik: 1.2, shaffof: .55};
  }

  /* ============================================================
     1. Vektor asos
     ============================================================ */
  function asos(xarita, o) {
    o = o || {};
    panellar(xarita);
    const tumanZoom = o.tumanZoom || 8;
    const nomZoom = o.nomZoom || 9;

    xarita.getContainer().classList.add("mkb-vektor");
    /* Chegaradan tashqarisi so'ndirilgan maydon: qo'shni davlatlar geometriyasi repoda yo'q,
       shuning uchun u yerga hech qanday chiziq chizilmaydi. */
    L.rectangle([[-85, -180], [85, 180]], {
      pane: "mkb-fon", stroke: false, interactive: false,
      fillColor: rang("var(--band)"), fillOpacity: 1
    }).addTo(xarita);

    const natija = {
      hududQatlam: null, tumanQatlam: null, nomQatlam: L.layerGroup(),
      shakl: {}, hududlar: [], tayyor: null,
      uslubla: () => {}, tanla: () => {}, yorit: () => {}, nomlarYangila: () => {}
    };

    const hududUslubi = f => {
      const kod = f.properties.kod;
      const u = (o.uslub && o.uslub(kod)) || {};
      const boyoq = rang(u.rang || "var(--oq)");
      /* Kontur rangi bo'yoqdan hisoblanadi: to'q bo'yoqda oq, och bo'yoqda siyoh chiziq o'qiladi.
         14% shaffoflikdagi ingichka hairline (--chiziq-3) hech qaysi bo'yoqda ko'rinmagani uchun
         u "rang berilmagan" deb qaraladi; sahifa boshqa rang bersa (tanlangan hudud) o'sha rang qoladi. */
      const oz = u.chiziq && u.chiziq !== "var(--chiziq-3)";
      const ch = oz ? {chiziq: u.chiziq, qalinlik: u.qalinlik || 1, shaffof: 1} : chegaraChizigi(boyoq);
      return {
        pane: "mkb-hudud", className: "mkb-hudud-shakl",
        color: rang(ch.chiziq), weight: oz ? (u.qalinlik || 1) : ch.qalinlik, opacity: ch.shaffof,
        fillColor: boyoq, fillOpacity: u.shaffof == null ? 1 : u.shaffof,
        interactive: !!(o.bosildi || o.nom)
      };
    };
    const tumanUslubi = f => {
      const u = (o.tumanUslub && o.tumanUslub(f.properties.hudud)) || {};
      return {pane: "mkb-tuman", className: "mkb-tuman-shakl", fill: false,
        color: rang(u.chiziq || "var(--siyoh)"), weight: u.qalinlik || .8,
        opacity: u.shaffof == null ? .22 : u.shaffof};
    };

    /* Tuman geometriyasi 370 KB: mamlakat ko'rinishida qotib turadigan sahifa (boshqaruv
       paneli) unga hech qachon yaqinlashmaydi, shuning uchun u faylni umuman so'ramaydi.
       Sahifa o.tumanlar === false bersa tuman qatlami bo'sh qoladi. */
    const BOSH_TUMAN = {type: "FeatureCollection", features: []};
    const tumanKerak = o.tumanlar !== false;
    natija.tayyor = geo()
      .then(g => tumanKerak ? g.yukla() : g.hududlar().then(h => ({hududlar: h, tumanlar: BOSH_TUMAN})))
      .then(({hududlar, tumanlar}) => {
      natija.hududlar = hududlar.features.map(f => f.properties);

      /* Tumanlar — ingichka kontur: yaqinlashganda hudud ichi bo'linadi.
         Chiziq rangini sahifa beradi: to'q bo'yoq ustida oq, och bo'yoq ustida qora o'qiladi.
         Sahifa o.tumanNom yoki o.tumanBosildi bersagina qatlam bosiladigan bo'ladi — aks holda
         tuman konturi bosishni ushlab, ostidagi hudud shaklini ishlamay qo'yardi. */
      const tumanIshlaydi = !!(o.tumanNom || o.tumanBosildi);
      natija.tumanQatlam = L.geoJSON(tumanlar, {
        pane: "mkb-tuman", interactive: tumanIshlaydi,
        style: tumanUslubi,
        onEachFeature: !tumanIshlaydi ? undefined : (f, qatlam) => {
          const kod = f.properties.kod, hk = f.properties.hudud;
          if (o.tumanNom) qatlam.bindTooltip(() => o.tumanNom(kod, hk), {sticky: true, className: "mkb-yorliq mkb-yorliq-hudud"});
          if (o.tumanBosildi) qatlam.on("click", ev => { L.DomEvent.stop(ev); o.tumanBosildi(kod, hk); });
        }
      });

      /* Hududni bosish — xaritaning asosiy amali: u butun sahifani filtrlaydi. Shuning uchun
         shakl klaviaturadan ham ochiladi. Leaflet Path ga tabindex qo'ymaydi va keydown ni
         umuman tinglamaydi (metkalar uchun buni tugmaQil hal qiladi), shuning uchun hodisa
         to'g'ridan-to'g'ri SVG elementiga ulanadi. Fokusda shakl yoritiladi — sichqoncha
         ostidagi ko'rinishning aynan o'zi. */
      /* o.nom sahifaga qarab HTML matni ham, tayyor element ham qaytaradi. Yorliq bir nechta
         bo'lakdan iborat (nom, o'lchov qiymati, ko'rsatma), shuning uchun bo'laklar nuqta bilan
         ajratiladi — aks holda ekran o'qigich ularni bitta so'z qilib qo'shib yuboradi. */
      const shaklMatn = h => {
        if (h == null) return "";
        let ildiz = h;
        if (!h.nodeType) {
          ildiz = document.createElement("div");
          ildiz.innerHTML = String(h);
          /* Sahifa tayyor element bersa u allaqachon o'girilgan; HTML matn esa lug'atdan
             o'tkazilishi kerak, aks holda rus interfeysida yorliq o'zbekcha qolib ketadi */
          if (typeof window.tarjimaQil === "function") window.tarjimaQil(ildiz);
        }
        const toza = s => String(s || "").replace(/\s+/g, " ").trim();
        const bolak = Array.from(ildiz.childNodes).map(n => toza(n.textContent)).filter(Boolean);
        return (bolak.length ? bolak.join(". ") : toza(ildiz.textContent)).replace(/\.\s*\./g, ".");
      };
      function shaklKlaviatura(qatlam, kod) {
        const el = qatlam.getElement && qatlam.getElement();
        if (!el) return;
        if (o.nom) el.setAttribute("aria-label", shaklMatn(o.nom(kod)));
        if (el.__mkbKlav) return;
        el.__mkbKlav = true;
        el.setAttribute("tabindex", "0");
        el.setAttribute("role", o.bosildi ? "button" : "img");
        el.addEventListener("keydown", ev => {
          if (ev.key !== "Enter" && ev.key !== " " && ev.key !== "Spacebar") return;
          ev.preventDefault();
          if (o.bosildi) o.bosildi(kod);
        });
        el.addEventListener("focus", () => { natija.yorit(kod, true); if (o.ustida) o.ustida(kod, true); });
        el.addEventListener("blur", () => { natija.yorit(kod, false); if (o.ustida) o.ustida(kod, false); });
      }
      natija.hududQatlam = L.geoJSON(hududlar, {
        pane: "mkb-hudud",
        style: hududUslubi,
        onEachFeature: (f, qatlam) => {
          const kod = f.properties.kod;
          natija.shakl[kod] = qatlam;
          if (o.nom) qatlam.bindTooltip(() => o.nom(kod), {sticky: true, className: "mkb-yorliq mkb-yorliq-hudud"});
          if (o.bosildi) qatlam.on("click", ev => { L.DomEvent.stop(ev); o.bosildi(kod); });
          qatlam.on("mouseover", () => { natija.yorit(kod, true); if (o.ustida) o.ustida(kod, true); });
          qatlam.on("mouseout", () => { natija.yorit(kod, false); if (o.ustida) o.ustida(kod, false); });
          qatlam.on("add", () => shaklKlaviatura(qatlam, kod));
        }
      }).addTo(xarita);
      Object.keys(natija.shakl).forEach(k => shaklKlaviatura(natija.shakl[k], k));

      const nomMetka = (joy, matn, sinf, kod) => L.marker(joy, {
        pane: "mkb-nom", interactive: false, keyboard: false,
        icon: L.divIcon({className: "mkb-nom " + sinf, iconSize: [0, 0],
          html: '<span data-tarjimasiz' + (kod ? ' data-kod="' + esc(kod) + '"' : "") + ">" + esc(matn) + "</span>"})
      });
      hududlar.features.filter(f => f.properties.markaz).forEach(f =>
        natija.nomQatlam.addLayer(nomMetka(f.properties.markaz,
          f.properties[til() === "ru" ? "nom_ru" : "nom_uz"], "mkb-nom-hudud", f.properties.kod)));
      natija.nomQatlam.addTo(xarita);

      /* Tuman nomlari yaqinlashgandagina va faqat ko'rinayotgan oynada chiziladi:
         200 ta yozuvni doim saqlash panorama tezligini tushiradi. */
      let tumanNomlari = [];
      /* Tor ekranda tuman yozuvlari chizilmaydi: ular baribir o'qilmaydi, ammo viloyat
         nomiga joy qoldirmay uni chetga surib yuboradi */
      const torKarta = () => xarita.getSize().x < 760;
      function qayta() {
        const z = xarita.getZoom();
        if (z >= tumanZoom && tumanKerak) { if (!xarita.hasLayer(natija.tumanQatlam)) natija.tumanQatlam.addTo(xarita); }
        else if (xarita.hasLayer(natija.tumanQatlam)) xarita.removeLayer(natija.tumanQatlam);

        tumanNomlari.forEach(m => natija.nomQatlam.removeLayer(m));
        tumanNomlari = [];
        if (z < nomZoom || torKarta()) return;
        const chek = xarita.getBounds();
        for (const f of tumanlar.features) {
          if (tumanNomlari.length >= 46) break;
          const j = f.properties.markaz;
          if (!j || !chek.contains(j)) continue;
          const m = nomMetka(j, f.properties[til() === "ru" ? "nom_ru" : "nom_uz"], "mkb-nom-tuman");
          tumanNomlari.push(m);
          natija.nomQatlam.addLayer(m);
        }
      }
      xarita.on("zoomend moveend", qayta);
      qayta();
      /* Vektor nomlar geo fayli yuklangandan keyin qo'shiladi. Shu paytda xarita qimirlamasa
         zoomend/moveend kelmaydi, shuning uchun tekislash bir marta majburiy chaqiriladi —
         aks holda viloyat nomlari belgilar ostida qolib ketadi. */
      requestAnimationFrame(() => yorliqlarniTekisla(xarita));

      natija.uslubla = () => {
        if (natija.hududQatlam) natija.hududQatlam.setStyle(hududUslubi);
        if (natija.tumanQatlam) natija.tumanQatlam.setStyle(tumanUslubi);
        /* Ekran o'qigichdagi yorliqda joriy o'lchov qiymati turadi: o'lchov almashganda
           yozuv bilan birga u ham yangilanadi */
        Object.keys(natija.shakl).forEach(k => shaklKlaviatura(natija.shakl[k], k));
      };
      natija.tanla = kod => Object.keys(natija.shakl).forEach(k => {
        const el = natija.shakl[k].getElement && natija.shakl[k].getElement();
        if (el) el.classList.toggle("tanlangan", k === kod);
      });
      natija.yorit = (kod, holat) => {
        const q = natija.shakl[kod];
        const el = q && q.getElement && q.getElement();
        if (el) el.classList.toggle("yoritilgan", !!holat);
      };
      return natija;
    });

    /* Chegara manbasi litsenziya talabi bo'yicha xaritada ko'rinib turadi.
       Manba nomi va litsenziya belgisi o'zgarmaydi — ular huquqiy matn. Oldidagi izoh so'zi esa
       interfeys tiliga o'giriladi, shuning uchun u alohida tugunda turadi. */
    if (xarita.attributionControl) {
      xarita.attributionControl.setPrefix('<a href="https://leafletjs.com" target="_blank" rel="noopener" data-tarjimasiz>Leaflet</a>');
      const matn = (window.MKB && MKB.geo && MKB.geo.ATRIBUT) || "Chegaralar: OCHA ROCCA / geoBoundaries (CC BY 3.0 IGO)";
      const bolim = matn.indexOf(": ");
      const yorliq = bolim > 0 ? matn.slice(0, bolim) : "";
      const manba = bolim > 0 ? matn.slice(bolim + 2) : matn;
      /* geoBoundaries loyihasi so'raydigan havola shu so'zning ustiga qo'yiladi: litsenziya
         matni o'zgarmaydi, faqat manba nomi bosiladigan bo'ladi */
      const havola = (window.MKB && MKB.geo && MKB.geo.MANBA_HAVOLA) || "";
      const manbaHTML = havola
        ? esc(manba).replace("geoBoundaries", '<a href="' + esc(havola) + '" target="_blank" rel="noopener">geoBoundaries</a>')
        : esc(manba);
      xarita.attributionControl.addAttribution(
        (yorliq ? "<span>" + esc(yorliq) + "</span>: " : "") + '<span data-tarjimasiz>' + manbaHTML + "</span>");
      if (window.tarjimaQil) tarjimaQil(xarita.attributionControl.getContainer());
    }
    return natija;
  }

  /* Eski nom: panel.html shu funksiyani chaqiradi va natijani ishlatmaydi */
  function plitka(xarita, o) { return asos(xarita, o); }

  /* ============================================================
     2. Ixtiyoriy raster qatlam
     Internet bo'lmasa plitka so'rovi xato qaytaradi: qatlam olib tashlanadi,
     vektor asos joyida qoladi, sahifaga xabar beriladi.
     ============================================================ */
  /* Plitka manzili kodda qattiq yozilmaydi: bank o'z ichki serverini ko'rsatadi.
     Manzil topilmasa ko'cha qatlami umuman bo'lmaydi va sahifa tugmani ko'rsatmaydi —
     shunda xodim bosadigan, lekin ishlamaydigan tugma qolmaydi. Tashqi jamoat serveri
     (OpenStreetMap) va shartnomasiz tijorat servisi (Esri) qo'yilmagan: ularning
     foydalanish shartlari bank mahsulotida bunday ishlatishga yo'l qo'ymaydi va har bir
     so'rov bilan xodim qaysi joyni ko'rayotgani tashqariga chiqib ketardi.

     Manzil ikki joydan qidiriladi:
       window.MKB_PLITKA_SERVER  — o'rnatishda beriladigan sozlama;
       localStorage "mkb-plitka-server" — sozlamalar sahifasidan kiritilgani.
     Qiymat Leaflet shabloni ko'rinishida bo'ladi: .../{z}/{x}/{y}.png */
  function ichkiPlitka() {
    let m = window.MKB_PLITKA_SERVER || "";
    if (!m) { try { m = localStorage.getItem("mkb-plitka-server") || ""; } catch (_) { m = ""; } }
    m = String(m).trim();
    return /\{z\}/.test(m) && /\{x\}/.test(m) && /\{y\}/.test(m) ? m : "";
  }
  function rasterRoyxati() {
    const m = ichkiPlitka();
    if (!m) return {};
    return {kocha: {nom: "Ko'cha xaritasi", manzil: m,
      soz: {maxZoom: 18, attribution: '<span data-tarjimasiz>Ichki plitka serveri</span>'}}};
  }
  function rasterlar(xarita, o) {
    o = o || {};
    panellar(xarita);
    const RASTER = rasterRoyxati();
    let joriy = null, qatlam = null, xato = 0, taymer = 0, kutish = 0;
    function ochir() {
      clearTimeout(kutish);
      if (qatlam) xarita.removeLayer(qatlam);
      qatlam = null; joriy = null; xato = 0;
      xarita.getContainer().classList.remove("mkb-raster");
    }
    function qoy(nom) {
      if (!RASTER[nom]) { ochir(); return null; }
      if (joriy === nom) return qatlam;
      ochir();
      joriy = nom;
      qatlam = L.tileLayer(RASTER[nom].manzil, Object.assign({pane: "mkb-raster"}, RASTER[nom].soz));
      /* Bitta plitkaning kechikishi emas, manbaning umuman ochilmayotgani muhim */
      qatlam.on("tileerror", () => {
        xato++;
        clearTimeout(taymer);
        taymer = setTimeout(() => {
          if (xato >= 3) { const eski = joriy; ochir(); if (o.uzildi) o.uzildi(eski); }
          xato = 0;
        }, 1200);
      });
      /* Bank tarmog'ida so'rov xato qaytarmay osilib qolishi mumkin: proksi uni yutib
         yuboradi, tileerror kelmaydi va ustki qatlam bo'm-bo'sh kulrang qoladi. Shuning
         uchun birinchi plitka kutiladi: to'rt soniyada kelmasa qatlam olib tashlanadi. */
      let keldi = false;
      qatlam.on("tileload", () => { keldi = true; clearTimeout(kutish); });
      clearTimeout(kutish);
      kutish = setTimeout(() => {
        if (keldi || joriy !== nom) return;
        const eski = joriy;
        ochir();
        if (o.uzildi) o.uzildi(eski);
      }, 4000);
      qatlam.addTo(xarita);
      xarita.getContainer().classList.add("mkb-raster");
      return qatlam;
    }
    return {qoy, ochir, nomi: () => joriy, bormi: () => Object.keys(RASTER).length > 0,
      royxat: Object.keys(RASTER).map(k => ({kalit: k, nom: RASTER[k].nom}))};
  }

  /* Metka klaviaturada ham tugmadek ishlasin.
     Leaflet metka ikonkasiga tabindex=0 va role="button" qo'yadi, lekin Enter ni faqat bindPopup
     orqali ulaydi: .on("click", ...) bilan yozilgan amal klaviaturadan umuman ishlamas edi.
     latlng uzatilishi shart — popupli metkalarda Leaflet shu maydonni kutadi. */
  function tugmaQil(m) {
    m.on("keydown", e => {
      const k = e.originalEvent && e.originalEvent.key;
      if (k !== "Enter" && k !== " " && k !== "Spacebar") return;
      L.DomEvent.stop(e.originalEvent);
      m.fire("click", {latlng: m.getLatLng()});
    });
    return m;
  }

  function zoomTugmalari(xarita) {
    /* Leaflet tugmalari standartda inglizcha: o'zbekcha nom beramiz, lug'at rus tiliga o'giradi */
    const yopKlav = ev => {
      if (ev.key !== "Escape") return;
      ev.preventDefault(); ev.stopPropagation();
      xarita.closePopup();
    };
    xarita.on("popupopen", ev => {
      const t = ev.popup && ev.popup.getElement && ev.popup.getElement();
      if (!t) return;
      const yop = t.querySelector(".leaflet-popup-close-button");
      if (yop) {
        yop.setAttribute("aria-label", "Yopish");
        yop.setAttribute("title", "Yopish");
        if (typeof window.tarjimaQil === "function") window.tarjimaQil(yop);
      }
      /* Quti metkalar panelidan keyin chiziladi: fokus metkada qolsa Tab avval qolgan hamma
         metkani aylanib chiqadi va qutidagi amallarga umuman yetib bo'lmaydi. Shuning uchun
         quti ochilganda fokus uning birinchi amaliga ko'chadi, yopilganda metkaga qaytadi. */
      const ikon = ev.popup._source && ev.popup._source.getElement && ev.popup._source.getElement();
      const birinchi = t.querySelector("a[href], button:not([disabled]), .leaflet-popup-close-button");
      if (birinchi && ikon && document.activeElement && ikon.contains(document.activeElement)) birinchi.focus();
      t.addEventListener("keydown", yopKlav);
      if (ikon) ikon.addEventListener("keydown", yopKlav);
    });
    xarita.on("popupclose", ev => {
      const ikon = ev.popup._source && ev.popup._source.getElement && ev.popup._source.getElement();
      if (!ikon) return;
      ikon.removeEventListener("keydown", yopKlav);
      const t = ev.popup.getElement && ev.popup.getElement();
      if (t && document.activeElement && t.contains(document.activeElement) && document.contains(ikon)) ikon.focus();
    });
    return L.control.zoom({zoomInTitle: "Kattalashtirish", zoomOutTitle: "Kichraytirish"}).addTo(xarita);
  }

  /* ============================================================
     3. Metkalar
     ============================================================ */
  const TUR_IKON = {turar: "uy", noturar: "bino", transport: "avto", uskuna: "uskuna", texnika: "zavod"};

  /* Tomchi metka: teginish maydoni 40x44, ko'rinadigan belgi 28x38, uchi koordinata ustida.
     Rang holatni, ichidagi belgi aktiv turini ko'rsatadi — rang farqini ko'rmaydigan ko'z uchun ham ajraladi.
     Uzuq kontur: joy taxminiy (tuman yoki hudud markaziga qo'yilgan). */
  function pinHTML(rangi, tur, taxminiy) {
    const belgi = TUR_IKON[tur] || "kub";
    return '<svg class="mkb-pin" viewBox="0 0 28 38" aria-hidden="true">' +
      '<path class="mkb-pin-tana" d="M14 36.4C14 36.4 25.2 22.8 25.2 13.8A11.2 11.2 0 1 0 2.8 13.8C2.8 22.8 14 36.4 14 36.4Z" fill="' + rangi +
      '" stroke="#ffffff" stroke-width="2.6" stroke-linejoin="round"' + (taxminiy ? ' stroke-dasharray="3.4 2.6"' : "") + "/>" +
      '<circle cx="14" cy="13.8" r="7.9" fill="#ffffff" fill-opacity=".96"/>' +
      '<svg x="7.1" y="6.9" width="13.8" height="13.8" viewBox="0 0 24 24" style="color:' + rangi + '"><use href="#ik-' + belgi + '"/></svg></svg>';
  }

  function metka(joy, o) {
    o = o || {};
    const rangi = rang(o.rang || "var(--matn-4)");
    const m = L.marker(joy, {
      icon: L.divIcon({
        className: "mkb-metka" + (o.taxminiy ? " taxminiy" : ""),
        iconSize: [40, 44], iconAnchor: [20, 40], popupAnchor: [0, -37], tooltipAnchor: [0, -37],
        html: '<span class="sr-only" data-tarjimasiz>' + esc(o.nom || "") + "</span>" + pinHTML(rangi, o.tur, o.taxminiy)
      }),
      keyboard: true,
      zIndexOffset: o.ust || 1000,
      riseOnHover: true
    });
    if (o.nom) m.bindTooltip(
      '<b data-tarjimasiz>' + esc(o.nom) + "</b>" + (o.izoh ? '<span data-tarjimasiz>' + esc(o.izoh) + "</span>" : ""),
      {direction: "top", className: "mkb-yorliq", offset: [0, -4], permanent: !!o.doimiy});
    if (o.toifa) m.mkbToifa = o.toifa;
    return tugmaQil(m);
  }

  /* Hudud metkasi: koordinatasi kiritilmagan obyektlar hudud markazida (panel.html) */
  function hududMetka(joy, o) {
    o = o || {};
    const son = o.son || 0;
    const d = Math.round(Math.min(72, 38 + Math.sqrt(son) * 4.6) * (o.kichik ? .62 : 1));
    const m = L.marker(joy, {
      icon: L.divIcon({
        className: "mkb-metka mkb-hudud-metka",
        iconSize: [d, d], iconAnchor: [d / 2, d / 2], popupAnchor: [0, -d / 2], tooltipAnchor: [0, -d / 2],
        html: '<span class="sr-only"><span>' + esc(o.nom || "") + "</span>: <span data-tarjimasiz>" + son +
          '</span> <span>ta obyekt, taxminiy joy</span></span>' +
          '<div class="mkb-hudud" aria-hidden="true" style="width:' + d + "px;height:" + d + "px;--hudud-rang:" + rang(o.rang || "var(--matn-3)") +
          '"><b data-tarjimasiz>' + son + "</b></div>" +
          (o.yorliq === false ? "" : '<span class="mkb-hudud-nom" aria-hidden="true" data-tarjimasiz' +
            (o.kod ? ' data-kod="' + esc(o.kod) + '"' : "") + ">" + esc(o.qisqaNom || o.nom || "") + "</span>")
      }),
      keyboard: true,
      riseOnHover: true
    });
    m.mkbKod = o.kod || null;
    return tugmaQil(m);
  }

  /* Eski kontur qatlami: geometriya MKB_DATA.HUDUD_CHEGARA dan kelganda (moslik uchun) */
  function konturQatlami(xarita, o) {
    o = o || {};
    const ch = o.chegara || (window.MKB_DATA && MKB_DATA.HUDUD_CHEGARA) || null;
    const qatlam = L.layerGroup();
    const shakllar = {};
    if (ch) Object.keys(ch).forEach(kod => {
      const nuqtalar = ch[kod];
      if (!nuqtalar || !nuqtalar.length) return;
      const p = L.polygon(nuqtalar, {
        className: "mkb-kontur", pane: o.pane || "overlayPane",
        color: rang("var(--chiziq-3)"), weight: 1.2, fillColor: rang(o.rang ? o.rang(kod) : "var(--plitka)"), fillOpacity: .35
      });
      if (o.nom) p.bindTooltip(esc(o.nom(kod)), {sticky: true, className: "mkb-yorliq"});
      if (o.bosildi) p.on("click", () => o.bosildi(kod));
      shakllar[kod] = p;
      qatlam.addLayer(p);
    });
    qatlam.mkbShakllar = shakllar;
    qatlam.mkbTanla = kod => Object.keys(shakllar).forEach(k =>
      shakllar[k].getElement() && shakllar[k].getElement().classList.toggle("tanlangan", k === kod));
    qatlam.addTo(xarita);
    return qatlam;
  }

  /* ---------- Yorliqlar bir-birining ustiga tushmasin ----------
     Kichik masshtabda nomlar qo'shilib ketadi: og'irroq yozuv qoladi, ustiga tushgani vaqtincha yashiriladi.
  /* ---------- Yorliqlar bir-birining ustiga tushmasin ----------
     Kichik masshtabda nomlar qo'shilib ketadi: og'irroq yozuv qoladi, ustiga tushgani vaqtincha yashiriladi.
     Og'irlik: hudud nomi tuman nomidan, ko'p obyektli hudud belgisi kamidan ustun.

     Hudud yozuvi uchun uchta shart bir vaqtda tekshiriladi:
       1) yozuv markazi o'z hududining poligoni ichida yotsin — mamlakat masshtabida viloyat
          kengligi 40-60 px, shuning uchun ilgarigi "yon siljish 36 px dan oshmaydi" qoidasi
          yozuvni qo'shnisining ustiga olib chiqib ketardi va son noto'g'ri viloyatga bog'lanardi;
       2) yozuv karta chegarasidan chiqmasin — tor ekranda o'ng chetdagi yozuvlar qirqilardi;
       3) boshqa yozuv yoki metka ustiga tushmasin.
     Hech bir variant hududga tushmasa yozuv chetga chiqariladi va markazga ingichka chiziq
     (yetakchi chiziq) bilan bog'lanadi — hisobot sahifasidagi yechimning xuddi o'zi.

     O'lchov har bir yozuv uchun bir marta o'qiladi, variantlar esa hisobda sinaladi: ilgari
     har variantdan keyin getBoundingClientRect() chaqirilib majburiy reflow qilinardi. */

  /* Nuqta poligon ichidami. Koordinata [lng, lat], geometriya — geojson Polygon/MultiPolygon.
     Teshik ichiga tushgan nuqta tashqarida deb hisoblanadi. */
  function nuqtaIchida(nuqta, geometriya) {
    if (!geometriya) return false;
    const halqalar = geometriya.type === "Polygon" ? [geometriya.coordinates] : geometriya.coordinates;
    for (const poligon of halqalar) {
      let ichida = false;
      for (let h = 0; h < poligon.length; h++) {
        const r = poligon[h];
        let kesdi = false;
        for (let i = 0, j = r.length - 1; i < r.length; j = i++) {
          const xi = r[i][0], yi = r[i][1], xj = r[j][0], yj = r[j][1];
          if ((yi > nuqta[1]) !== (yj > nuqta[1]) &&
              nuqta[0] < (xj - xi) * (nuqta[1] - yi) / (yj - yi) + xi) kesdi = !kesdi;
        }
        if (h === 0) { if (!kesdi) break; ichida = true; }
        else if (kesdi) { ichida = false; break; }
      }
      if (ichida) return true;
    }
    return false;
  }

  /* Yetakchi chiziqlar qatlami: yozuv o'z hududiga sig'masa unga shu chiziq bilan bog'lanadi */
  function yetakQatlami(xarita) {
    if (!xarita.__mkbYetak) {
      panellar(xarita);
      xarita.__mkbYetak = L.layerGroup().addTo(xarita);
    }
    return xarita.__mkbYetak;
  }

  /* Variantlar: avval markazning o'zi, keyin kengayib boradigan halqalar. Yaqin variant
     har doim uzoqdan oldin sinaladi, shuning uchun yozuv imkon qadar markazga yaqin turadi. */
  const SILJISH = (function () {
    /* Avval tik siljish: viloyatlar mamlakat masshtabida uzunasiga cho'zilgan, shuning uchun
       yozuv tepaga yoki pastga surilganda hudud ichida qolish ehtimoli eng katta. Keyin yon
       tomon, oxirida kengayib boradigan halqalar. */
    const j = [[0, 0]];
    [17, 26, 34, 44, 54, 66].forEach(d => { j.push([0, -d]); j.push([0, d]); });
    [30, 46, 64].forEach(d => { j.push([-d, 0]); j.push([d, 0]); });
    [20, 30, 44, 60, 78, 98].forEach(radius => {
      for (let burchak = 0; burchak < 360; burchak += 30) {
        const a = burchak * Math.PI / 180;
        j.push([Math.round(radius * Math.cos(a) * 1.35), Math.round(radius * Math.sin(a))]);
      }
    });
    return j;
  })();

  function yorliqlarniTekisla(xarita) {
    const idish = xarita.getContainer();
    const nomlar = Array.from(idish.querySelectorAll(".mkb-hudud-nom, .mkb-nom > span"));
    const yetak = window.L && xarita.getPane ? yetakQatlami(xarita) : null;
    if (yetak) yetak.clearLayers();
    if (!nomlar.length) return;
    nomlar.forEach(n => n.classList.remove("yashirin"));
    const idishR = idish.getBoundingClientRect();
    if (!idishR.width) return;
    /* Karta cheti: yozuv shu to'rtburchakdan chiqsa .x-karta ning overflow:hidden si uni qirqadi */
    const chet = {sol: idishR.left + 4, ong: idishR.right - 4, tep: idishR.top + 4, past: idishR.bottom - 4};

    /* Jamlangan metka belgisi tuman nomidan ustun: son ostida qolgan mayda yozuv o'qilmaydi.
       Hudud nomi esa hech narsaga bo'shatib bermaydi — u xaritaning asosiy yo'l ko'rsatkichi.
       Tomchi metka ham to'siq: u metkalar panelida (600) yozuvlar panelidan (560) yuqorida
       chiziladi. Teginish maydoni emas, ko'rinadigan belgi olinadi. */
    /* Xarita ustidagi boshqaruvlar ham to'siq: asos qatlami tanlovi, asboblar ustuni va manba
       qatori yozuvni yopib qo'yadi. Ular xarita konteyneridan tashqarida turgani uchun
       otasidan qidiriladi va sahifada data-xarita-tosiq bilan belgilanadi. */
    const tosiqIdish = idish.parentElement || idish;
    const klasterlar = Array.from(idish.querySelectorAll(".mkb-klaster, .mkb-hudud, .mkb-metka .mkb-pin, .leaflet-control-attribution"))
      .concat(Array.from(tosiqIdish.querySelectorAll("[data-xarita-tosiq]")))
      .map(k => k.getBoundingClientRect()).filter(r => r.width);
    /* Bir hudud — bitta nom. Hudud belgisi nomni o'zi yonida yozib tursa (yorliq berilgan metka),
       o'sha hududning vektor asosidagi nomi ikkinchi marta chizilmaydi. */
    const belgiKodlari = new Set(Array.from(idish.querySelectorAll(".mkb-hudud-nom[data-kod]")).map(x => x.getAttribute("data-kod")));
    const tur = n => {
      const ota = n.parentElement;
      if (ota && ota.classList.contains("mkb-nom-hudud")) return "hudud";
      if (ota && ota.classList.contains("mkb-nom-tuman")) return "tuman";
      return "belgi";
    };
    const ogirlik = n => {
      const t = tur(n);
      if (t === "hudud") return 1e6;
      if (t === "tuman") return 1;
      const b = n.parentElement && n.parentElement.querySelector(".mkb-hudud b");
      return b ? (parseInt(b.textContent, 10) || 0) + 10 : 10;
    };
    const kesishdi = (r, q) => !(r.right < q.left - 2 || r.left > q.right + 2 || r.bottom < q.top - 2 || r.top > q.bottom + 2);
    const tartib = nomlar.slice().sort((a, b) => ogirlik(b) - ogirlik(a));
    const band = [];
    const geo = (window.MKB && MKB.geo) || null;
    /* Boshqa hududlar: yozuv o'z hududiga sig'masa, hech bo'lmasa qo'shnisining ustiga
       tushmasligi kerak — aks holda son noto'g'ri viloyatga bog'lanadi. Chegara to'rtburchagi
       oldin tekshiriladi, poligon sinovi faqat shu to'rtburchakka tushgan nuqta uchun. */
    const hududRoyxat = (geo && geo.royxat ? geo.royxat(1) : []).map(f => {
      let x1 = 180, y1 = 90, x2 = -180, y2 = -90;
      const halqa = r => r.forEach(p => {
        if (p[0] < x1) x1 = p[0]; if (p[0] > x2) x2 = p[0];
        if (p[1] < y1) y1 = p[1]; if (p[1] > y2) y2 = p[1];
      });
      const g = f.geometry;
      if (g.type === "Polygon") g.coordinates.forEach(halqa); else g.coordinates.forEach(p => p.forEach(halqa));
      return {kod: f.properties.kod, g: g, quti: [x1, y1, x2, y2]};
    });

    tartib.forEach(n => {
      /* O'lchov bir marta: (0,0) variantida yozuv markazi tayanch nuqta ustida turadi */
      n.style.setProperty("--nom-x", "0px");
      n.style.setProperty("--nom-y", "0px");
      const r0 = n.getBoundingClientRect();
      if (!r0.width) return;
      const en = r0.width, boy = r0.height;
      const mx = r0.left + en / 2, my = r0.top + boy / 2;   /* tayanch nuqta ekran koordinatasida */
      const tortburchak = j => ({left: mx + j[0] - en / 2, right: mx + j[0] + en / 2,
        top: my + j[1] - boy / 2, bottom: my + j[1] + boy / 2});
      const kartada = q => q.left >= chet.sol && q.right <= chet.ong && q.top >= chet.tep && q.bottom <= chet.past;
      const bosh = q => !band.some(x => kesishdi(q, x)) && !klasterlar.some(x => kesishdi(q, x));
      const qoy = j => { n.style.setProperty("--nom-x", j[0] + "px"); n.style.setProperty("--nom-y", j[1] + "px"); };

      if (tur(n) === "hudud") {
        const kod = n.getAttribute("data-kod");
        if (kod && belgiKodlari.has(kod)) { n.classList.add("yashirin"); return; }
        const f = kod && geo && geo.hudud ? geo.hudud(kod) : null;
        const hududIchida = j => {
          if (!f) return true;
          const ll = xarita.containerPointToLatLng(L.point(mx + j[0] - idishR.left, my + j[1] - idishR.top));
          return nuqtaIchida([ll.lng, ll.lat], f.geometry);
        };

        const nuqtasi = j => {
          const ll = xarita.containerPointToLatLng(L.point(mx + j[0] - idishR.left, my + j[1] - idishR.top));
          return [ll.lng, ll.lat];
        };
        const boshqada = j => {
          const p = nuqtasi(j);
          for (const h of hududRoyxat) {
            if (h.kod === kod) continue;
            if (p[0] < h.quti[0] || p[0] > h.quti[2] || p[1] < h.quti[1] || p[1] > h.quti[3]) continue;
            if (nuqtaIchida(p, h.g)) return true;
          }
          return false;
        };
        /* Uch daraja: o'z hududi ichi -> bo'sh maydon -> nima bo'lsa ham karta ichi */
        let tanlangan = null, zaxira = null, zaxira2 = null;
        for (const j of SILJISH) {
          const q = tortburchak(j);
          if (!kartada(q) || !bosh(q)) continue;
          if (hududIchida(j)) { tanlangan = {j: j, q: q}; break; }
          if (!zaxira && !boshqada(j)) zaxira = {j: j, q: q};
          if (!zaxira2) zaxira2 = {j: j, q: q};
        }
        zaxira = zaxira || zaxira2;
        if (tanlangan) { qoy(tanlangan.j); band.push(tanlangan.q); return; }
        /* Hududga sig'madi: yozuv chetga chiqadi va markaziga ingichka chiziq bilan bog'lanadi */
        if (zaxira) {
          qoy(zaxira.j);
          band.push(zaxira.q);
          if (yetak && (Math.abs(zaxira.j[0]) > 8 || Math.abs(zaxira.j[1]) > 8)) {
            const p1 = L.point(mx - idishR.left, my - idishR.top);
            const p2 = L.point(mx + zaxira.j[0] - idishR.left, my + zaxira.j[1] - idishR.top);
            const l1 = xarita.containerPointToLatLng(p1), l2 = xarita.containerPointToLatLng(p2);
            yetak.addLayer(L.polyline([l1, l2], {pane: "mkb-nom", className: "mkb-yetak", interactive: false,
              color: rang("var(--matn-3)"), weight: 1, opacity: .7}));
            yetak.addLayer(L.circleMarker(l1, {pane: "mkb-nom", className: "mkb-yetak", interactive: false,
              radius: 2, color: rang("var(--matn-3)"), weight: 1, opacity: .85, fillOpacity: .85}));
          }
          return;
        }
        n.style.removeProperty("--nom-y");
        n.style.removeProperty("--nom-x");
        n.classList.add("yashirin");
        return;
      }
      /* Tuman nomi va belgi yozuvi: joy bo'sh bo'lsa qoladi, aks holda yashiriladi */
      const j0 = [0, tur(n) === "belgi" ? 0 : -14];
      const q0 = tortburchak(j0);
      if (kartada(q0) && bosh(q0)) { qoy(j0); band.push(q0); }
      else n.classList.add("yashirin");
    });
  }

  /* Xarita harakatlanganda yorliqlar qaytadan joylashadi */
  function yorliqlarniKuzat(xarita) {
    const qayta = () => requestAnimationFrame(() => yorliqlarniTekisla(xarita));
    xarita.on("zoomend moveend", qayta);
    qayta();
  }

  function yorit(metka, holat) {
    const el = metka && metka.getElement && metka.getElement();
    if (el) el.classList.toggle("yoritilgan", !!holat);
  }
  function sindir(metka, holat) {
    const el = metka && metka.getElement && metka.getElement();
    if (el) el.classList.toggle("sonik", !!holat);
  }

  /* ============================================================
     4. Jamlagich (klaster)
     Metka bir marta yasaladi va keshda qoladi: filtr o'zgarganda qatlam
     qaytadan qurilmaydi, faqat keraksizi olib tashlanadi.
     Bir nuqtaga tushgan metkalar (koordinatasi kiritilmagan, tuman yoki hudud
     markazidagi obyektlar) bosilganda halqa bo'lib yoyiladi.
     ============================================================ */
  function klaster(xarita, o) {
    o = o || {};
    const hujra = o.hujra || 64;
    /* Mayda ko'rinish: mamlakat masshtabida jamlagich son yozilmagan kichik nuqtaga aylanadi.
       Son o'sha masshtabda hudud yozuvida turadi, shuning uchun doira uni takrorlamaydi —
       doira faqat aktivlar qayerda to'planganini ko'rsatadi. Sahifa o.mayda(zoom) beradi.
       Ilgari bu holatda doiralar butunlay yashirilardi va xaritada birorta metka qolmasdi. */
    const mayda = () => !!(o.mayda && o.mayda(xarita.getZoom()));
    const maksZoom = o.maksZoom || 15;
    const qatlam = L.layerGroup().addTo(xarita);
    const yoyQatlam = L.layerGroup().addTo(xarita);
    const kesh = new Map();          /* id -> L.Marker */
    let nuqtalar = [];
    let korinayotgan = new Map();    /* kalit -> qatlam */
    let yoyilgan = null;
    let tanlangan = null;

    const metkaOl = n => {
      let m = kesh.get(n.id);
      if (!m) { m = o.metka(n); m.mkbId = n.id; kesh.set(n.id, m); }
      return m;
    };
    const guruhKaliti = g => g.map(x => x.id).join("|");

    /* Bir nuqtadagi metkalar halqa bo'ylab tarqatiladi, har biriga ingichka chiziq tortiladi:
       ularning haqiqiy joyi bitta ekani ko'rinib turadi. */
    function yoy(guruh, markaz) {
      yoyQatlam.clearLayers();
      yoyilgan = guruhKaliti(guruh);
      const n = guruh.length;
      const radius = Math.min(28 + n * 5.4, 104);
      const asosNuqta = xarita.latLngToLayerPoint(markaz);
      guruh.forEach((d, i) => {
        const burchak = (2 * Math.PI * i) / n - Math.PI / 2;
        const joy = xarita.layerPointToLatLng(
          L.point(asosNuqta.x + radius * Math.cos(burchak), asosNuqta.y + radius * Math.sin(burchak)));
        yoyQatlam.addLayer(L.polyline([markaz, joy], {className: "mkb-oyoq", color: rang("var(--matn-3)"),
          weight: 1, opacity: .55, interactive: false}));
        const m = metkaOl(d);
        m.setLatLng(joy);
        m.mkbYoyilgan = true;
        yoyQatlam.addLayer(m);
      });
    }
    function yoyYop() {
      if (!yoyilgan) return;
      yoyQatlam.clearLayers();
      yoyilgan = null;
      chiz();
    }

    function klasterMetka(guruh, markaz) {
      const n = guruh.length;
      const d = belgiOlchami(n);
      /* Halqa segmentlari: guruh ichidagi toifalar ulushi */
      const sanoq = {};
      guruh.forEach(x => { const k = x.rang || "var(--matn-4)"; sanoq[k] = (sanoq[k] || 0) + 1; });
      let burchak = 0;
      const qismlar = Object.keys(sanoq).sort((a, b) => sanoq[b] - sanoq[a]).map(k => {
        const boshi = burchak;
        burchak += (sanoq[k] / n) * 360;
        return rang(k) + " " + boshi.toFixed(1) + "deg " + burchak.toFixed(1) + "deg";
      }).join(",");
      const birJoyda = guruh.every(x => Math.abs(x.lat - guruh[0].lat) < 1e-6 && Math.abs(x.lng - guruh[0].lng) < 1e-6);
      const kichik = mayda();
      const m = L.marker(markaz, {
        keyboard: true, zIndexOffset: 600,
        icon: L.divIcon({
          className: "mkb-klaster" + (birJoyda && !kichik ? " bir-joyda" : ""),
          iconSize: [d, d], iconAnchor: [d / 2, d / 2],
          html: '<span class="sr-only"><span data-tarjimasiz>' + n + "</span> <span>ta obyekt jamlangan</span></span>" +
            '<span class="mkb-klaster-halqa" aria-hidden="true" style="background:conic-gradient(' + qismlar + ')"></span>' +
            '<b aria-hidden="true"' + (kichik ? "" : ' data-tarjimasiz>' + n) + "</b>"
        })
      });
      m.on("click", () => {
        if (birJoyda || xarita.getZoom() >= maksZoom) { yoy(guruh, markaz); chiz(); return; }
        xarita.flyToBounds(L.latLngBounds(guruh.map(x => [x.lat, x.lng])), {padding: [60, 60], maxZoom: maksZoom, duration: .5});
      });
      m.bindTooltip('<b data-tarjimasiz>' + n + "</b><span>" +
        (birJoyda ? "Bir joyda: yoyish uchun bosing" : "Yaqinlashtirish uchun bosing") + "</span>",
        {direction: "top", className: "mkb-yorliq", offset: [0, -d / 2 - 2]});
      /* Guruh ichidagi obyektlar: sahifa legenda ustiga kelganda qaysi doirada tanlangan
         toifa borligini shu ro'yxatdan biladi va qolganlarini so'ndiradi */
      m.mkbIchi = guruh.map(x => x.id);
      return tugmaQil(m);
    }

    const belgiOlchami = n => mayda() ? 14 : Math.round(Math.min(66, 34 + Math.sqrt(n) * 4.4));

    function guruhla() {
      const z = xarita.getZoom();
      const guruhlar = new Map();
      nuqtalar.forEach(n => {
        const p = xarita.project([n.lat, n.lng], z);
        const k = z >= maksZoom ? "n" + n.id : Math.floor(p.x / hujra) + ":" + Math.floor(p.y / hujra);
        if (!guruhlar.has(k)) guruhlar.set(k, []);
        guruhlar.get(k).push(n);
      });
      if (z >= maksZoom) return guruhlar;
      /* Hujra chegarasi ikki yonma-yon to'plamni ajratib qo'yishi mumkin: belgilar ustma-ust
         tushib son o'qilmay qoladi. Shuning uchun bir-birini yopadigan belgilar birlashtiriladi. */
      const royxat = [];
      guruhlar.forEach((g, k) => {
        const p = g.reduce((a, n) => {
          const q = xarita.project([n.lat, n.lng], z);
          return {x: a.x + q.x / g.length, y: a.y + q.y / g.length};
        }, {x: 0, y: 0});
        royxat.push({kalit: k, ichi: g, x: p.x, y: p.y});
      });
      let ozgardi = true;
      while (ozgardi) {
        ozgardi = false;
        for (let i = 0; i < royxat.length && !ozgardi; i++) {
          for (let j = i + 1; j < royxat.length; j++) {
            const a = royxat[i], b = royxat[j];
            const kerak = (belgiOlchami(a.ichi.length) + belgiOlchami(b.ichi.length)) / 2 + 5;
            if (Math.hypot(a.x - b.x, a.y - b.y) >= kerak) continue;
            const n1 = a.ichi.length, n2 = b.ichi.length;
            a.x = (a.x * n1 + b.x * n2) / (n1 + n2);
            a.y = (a.y * n1 + b.y * n2) / (n1 + n2);
            a.ichi = a.ichi.concat(b.ichi);
            a.kalit = a.kalit + "+" + b.kalit;
            royxat.splice(j, 1);
            ozgardi = true;
            break;
          }
        }
      }
      const natija = new Map();
      royxat.forEach(r => natija.set(r.kalit, r.ichi));
      return natija;
    }

    function chiz() {
      const yangi = new Map();
      guruhla().forEach((guruh, k) => {
        if (guruh.length === 1) {
          const m = metkaOl(guruh[0]);
          if (m.mkbYoyilgan) { m.setLatLng([guruh[0].lat, guruh[0].lng]); m.mkbYoyilgan = false; }
          yangi.set("m" + guruh[0].id, m);
          return;
        }
        if (yoyilgan && yoyilgan === guruhKaliti(guruh)) return;   /* bu guruh halqa ko'rinishida turibdi */
        const lat = guruh.reduce((a, x) => a + x.lat, 0) / guruh.length;
        const lng = guruh.reduce((a, x) => a + x.lng, 0) / guruh.length;
        const kalit = "k" + k + ":" + guruh.length + ":" + guruh[0].id;
        yangi.set(kalit, korinayotgan.get(kalit) || klasterMetka(guruh, [lat, lng]));
      });
      korinayotgan.forEach((m, k) => { if (!yangi.has(k)) qatlam.removeLayer(m); });
      yangi.forEach((m, k) => { if (!korinayotgan.has(k)) qatlam.addLayer(m); });
      korinayotgan = yangi;
      if (tanlangan) belgila(tanlangan);
      if (o.chizildi) o.chizildi();
    }

    function belgila(id) {
      tanlangan = id || null;
      kesh.forEach((m, k) => {
        const el = m.getElement && m.getElement();
        if (el) el.classList.toggle("tanlangan", k === tanlangan);
      });
    }

    xarita.on("zoomend", () => { yoyilgan = null; yoyQatlam.clearLayers(); chiz(); });
    xarita.on("moveend", chiz);
    xarita.on("click", yoyYop);

    return {
      qatlam,
      /* Ro'yxatni almashtirish: metkalar keshdan olinadi, qaytadan yasalmaydi */
      malumot(r) { nuqtalar = r || []; yoyilgan = null; yoyQatlam.clearLayers(); chiz(); },
      metkasi: id => kesh.get(id),
      /* Hozir chizilgan jamlagich belgilar: legenda ularga ham ta'sir qilishi uchun */
      klasterlar: () => Array.from(korinayotgan.values()).filter(m => m.mkbIchi),
      belgila,
      yoyYop,
      /* Ro'yxatdan bosilganda: metka klaster ichida bo'lsa avval guruhi yoyiladi */
      korsat(id) {
        const n = nuqtalar.find(x => x.id === id);
        if (!n) return null;
        const m = metkaOl(n);
        if (!qatlam.hasLayer(m) && !yoyQatlam.hasLayer(m)) {
          let guruh = [n];
          guruhla().forEach(g => { if (g.some(x => x.id === id)) guruh = g; });
          if (guruh.length > 1) {
            const lat = guruh.reduce((a, x) => a + x.lat, 0) / guruh.length;
            const lng = guruh.reduce((a, x) => a + x.lng, 0) / guruh.length;
            yoy(guruh, L.latLng(lat, lng));
            chiz();
          }
        }
        belgila(id);
        return kesh.get(id);
      }
    };
  }

  /* ============================================================
     5. Masofa o'lchash
     ============================================================ */
  function olchagich(xarita, o) {
    o = o || {};
    let yoqilgan = false, nuqtalar = [], chiziq = null, belgilar = [], yorliq = null;
    const jami = () => {
      let s = 0;
      for (let i = 1; i < nuqtalar.length; i++) s += xarita.distance(nuqtalar[i - 1], nuqtalar[i]);
      return s;
    };
    const matn = () => {
      const s = jami();
      return s >= 1000 ? (s / 1000).toFixed(s >= 10000 ? 0 : 1).replace(".", ",") + " km" : Math.round(s) + " m";
    };
    function chiz() {
      if (chiziq) { xarita.removeLayer(chiziq); chiziq = null; }
      if (nuqtalar.length > 1)
        chiziq = L.polyline(nuqtalar, {className: "mkb-olchov", color: rang("var(--siyoh)"), weight: 2, dashArray: "6 5"}).addTo(xarita);
      belgilar.forEach(m => xarita.removeLayer(m));
      belgilar = nuqtalar.map(j => L.circleMarker(j, {radius: 4, color: rang("var(--siyoh)"), weight: 2,
        fillColor: "#ffffff", fillOpacity: 1}).addTo(xarita));
      if (yorliq) { xarita.removeLayer(yorliq); yorliq = null; }
      if (nuqtalar.length > 1) yorliq = L.marker(nuqtalar[nuqtalar.length - 1], {
        interactive: false, keyboard: false,
        icon: L.divIcon({className: "mkb-olchov-yorliq", iconSize: [0, 0], html: '<span data-tarjimasiz>' + matn() + "</span>"})
      }).addTo(xarita);
      if (o.ozgardi) o.ozgardi(nuqtalar.length, matn());
    }
    function bosildi(ev) { if (yoqilgan) { nuqtalar.push(ev.latlng); chiz(); } }
    function tozala() { nuqtalar = []; chiz(); }
    return {
      yoq() { yoqilgan = true; xarita.getContainer().classList.add("mkb-olchayapti"); xarita.on("click", bosildi); },
      ochir() { yoqilgan = false; xarita.getContainer().classList.remove("mkb-olchayapti"); xarita.off("click", bosildi); tozala(); },
      tozala, holati: () => yoqilgan, matni: matn
    };
  }

  Object.assign(window.MKBxarita, {geo, panellar, asos, plitka, rasterlar, ichkiPlitka, zoomTugmalari, tugmaQil, metka, hududMetka,
    konturQatlami, klaster, olchagich, yorliqlarniTekisla, yorliqlarniKuzat, yorit, sindir, TUR_IKON});
})();
