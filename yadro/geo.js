/* ============================================================
   geo.js — O'zbekiston chegaralari (assets/geo) uchun yuklovchi
   Fayllar bir marta o'qiladi va xotirada saqlanadi; takroriy chaqiruv
   o'sha promise'ni qaytaradi. Tarmoqqa chiqmaydi: hammasi repo ichida.

   MKB.geo.yukla()      -> Promise<{hududlar, tumanlar}>
   MKB.geo.hududlar()   -> Promise<FeatureCollection>  (1-daraja, 14 ta)
   MKB.geo.tumanlar()   -> Promise<FeatureCollection>  (2-daraja, 200 ta)
   MKB.geo.hudud(kod)   -> Feature | null   (yuklangandan keyin)
   MKB.geo.tuman(kod)   -> Feature | null
   MKB.geo.hududTumanlari(kod) -> [Feature]
   MKB.geo.markaz(kod)  -> [lat, lng] | null
   MKB.geo.kod(nom)     -> "TS" | "TS-T03" | null
   MKB.geo.nomi(kod, til) -> nom matni
   MKB.geo.tayyor()     -> yuklanganmi
   MKB.geo.ATRIBUT      -> xaritada ko'rsatiladigan manba matni
   ============================================================ */
(function(){
  "use strict";
  if (!window.MKB || window.MKB.geo) return;
  const MKB = window.MKB;

  const V = window.MKB_VERSIYA || "";
  const YOL = {hududlar: "assets/geo/hududlar.geojson", tumanlar: "assets/geo/tumanlar.geojson"};
  const ATRIBUT = "Chegaralar: OCHA ROCCA / geoBoundaries (CC BY 3.0 IGO)";
  /* geoBoundaries loyihasi manba nomidan tashqari o'z saytiga havolani ham so'raydi.
     Matn ikki joyda saqlanmasligi uchun manzil shu yerda turadi, xarita uni ATRIBUT dagi
     "geoBoundaries" so'ziga o'raydi. */
  const MANBA_HAVOLA = "https://www.geoboundaries.org";
  /* Chegaralar qaysi yil holatiga: yon panelda ko'rsatiladi (docs: assets/geo/MANBA.md) */
  const SANA = "2020";

  /* Yo'l shu skriptning o'z manzilidan hisoblanadi (yadro/geo.js -> ildiz):
     sahifa ostki papkadan ochilsa ham chegara fayllari topiladi. */
  const ILDIZ = (function(){
    const s = document.currentScript;
    if (s && s.src) return s.src.replace(/[?#].*$/, "").replace(/yadro\/[^/]*$/, "");
    return location.pathname.replace(/[^/]*$/, "");
  })();
  const manzil = yol => ILDIZ + yol + (V ? "?v=" + V : "");

  const kesh = {hududlar: null, tumanlar: null};   /* promise keshi */
  const dona = {hududlar: null, tumanlar: null};   /* yuklangan ma'lumot */
  let indeks = null;

  function olib(nom){
    if (kesh[nom]) return kesh[nom];
    /* Keshni ?v= hal qiladi (assets/ ga max-age qo'yilgan), shuning uchun cache rejimi o'zgartirilmaydi */
    kesh[nom] = fetch(manzil(YOL[nom]))
      .then(j => {
        if (!j.ok) throw new Error(nom + ": " + j.status);
        return j.json();
      })
      .then(fc => {
        if (!fc || fc.type !== "FeatureCollection" || !Array.isArray(fc.features) || !fc.features.length)
          throw new Error(nom + ": chegara fayli bo'sh");
        dona[nom] = fc;
        indeks = null;
        return fc;
      })
      .catch(x => { kesh[nom] = null; throw x; });
    return kesh[nom];
  }

  const hududlar = () => olib("hududlar");
  const tumanlar = () => olib("tumanlar");
  const yukla = () => Promise.all([hududlar(), tumanlar()]).then(r => ({hududlar: r[0], tumanlar: r[1]}));
  const tayyor = () => !!(dona.hududlar && dona.tumanlar);

  /* ---------- Kod va nom indeksi ---------- */
  const kalit = s => String(s == null ? "" : s).trim().toLowerCase()
    .replace(/[‘’ʻʼ`´]/g, "'")   /* har xil apostroflar bitta ko'rinishga */
    .replace(/\s+/g, " ");

  function qur(){
    if (indeks) return indeks;
    const x = {kod: {}, nom: {}};
    ["hududlar", "tumanlar"].forEach(t => {
      (dona[t] ? dona[t].features : []).forEach(f => {
        const p = f.properties || {};
        if (!p.kod) return;
        x.kod[p.kod] = f;
        [p.nom_uz, p.nom_ru, p.toliq_uz, p.toliq_ru].forEach(n => {
          const k = kalit(n);
          if (k && !x.nom[k]) x.nom[k] = p.kod;
        });
        /* "Urgut tumani" ham, "Urgut" ham topilsin */
        const qisqa = kalit(String(p.nom_uz || "").replace(/\s+(tumani|shahri|viloyati|respublikasi)$/i, ""));
        if (qisqa && !x.nom[qisqa]) x.nom[qisqa] = p.kod;
      });
    });
    indeks = x;
    return x;
  }

  const hudud = kod => (qur().kod[kod] && (qur().kod[kod].properties || {}).daraja === 1) ? qur().kod[kod] : null;
  const tuman = kod => (qur().kod[kod] && (qur().kod[kod].properties || {}).daraja === 2) ? qur().kod[kod] : null;
  const obyekt = kod => qur().kod[kod] || null;

  function hududTumanlari(kod){
    return (dona.tumanlar ? dona.tumanlar.features : []).filter(f => (f.properties || {}).hudud === kod);
  }

  /* Markaz: poligon ichida yotadigan nuqta, faylga oldindan yozilgan.
     Fayl hali yuklanmagan bo'lsa viloyatlar uchun ma'lumot bazasidagi markazga tushadi. */
  function markaz(kod){
    const f = obyekt(kod);
    if (f && f.properties && f.properties.markaz) return f.properties.markaz.slice();
    const D = window.MKB_DATA || {};
    const h = (D.HUDUD_KODLAR || {})[kod];
    return h && h.lat ? [h.lat, h.lng] : null;
  }

  /* Yuklangan obyektlar ro'yxati, sinxron. Xarita yozuvni joylashtirayotganda nuqta qaysi
     hududga tushganini tekshiradi — buning uchun ro'yxat darhol kerak bo'ladi. Fayl hali
     yuklanmagan bo'lsa bo'sh ro'yxat qaytadi va tekshiruv o'tkazib yuboriladi. */
  function royxat(daraja) {
    const t = daraja === 2 ? "tumanlar" : "hududlar";
    return dona[t] ? dona[t].features : [];
  }

  /* Nomdan kod: viloyat ham, tuman ham. Fayl yuklanmagan bo'lsa ma'lumot bazasiga tushadi. */
  function kod(nom){
    const k = kalit(nom);
    if (!k) return null;
    const x = qur();
    if (x.nom[k]) return x.nom[k];
    const D = window.MKB_DATA || {};
    return (D.hududKodi ? D.hududKodi(String(nom).trim()) : null) || null;
  }

  function nomi(kodi, til){
    const f = obyekt(kodi);
    if (!f) return "";
    const p = f.properties || {};
    return (til === "ru" ? p.nom_ru : p.nom_uz) || p.nom_uz || "";
  }

  /* Chegara chetlari: L.map.fitBounds uchun [[lat,lng],[lat,lng]] */
  function chegara(kodi){
    const f = obyekt(kodi);
    if (!f) return null;
    let x1 = 180, y1 = 90, x2 = -180, y2 = -90;
    const halqa = r => r.forEach(p => {
      if (p[0] < x1) x1 = p[0];
      if (p[0] > x2) x2 = p[0];
      if (p[1] < y1) y1 = p[1];
      if (p[1] > y2) y2 = p[1];
    });
    const g = f.geometry;
    if (g.type === "Polygon") g.coordinates.forEach(halqa);
    else g.coordinates.forEach(p => p.forEach(halqa));
    return [[y1, x1], [y2, x2]];
  }

  MKB.geo = {yukla, hududlar, tumanlar, hudud, tuman, obyekt, hududTumanlari, royxat,
    markaz, kod, nomi, chegara, tayyor, ATRIBUT, MANBA_HAVOLA, SANA};
})();
