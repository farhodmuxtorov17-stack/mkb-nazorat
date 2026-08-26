/* ============================================================
   bino.js — obyekt binosining yagona geometrik modeli
   Bitta manba: qavatlar, xonalar, devorlar, eshiklar, derazalar,
   kirish nuqtalari. Qavat rejasi ham, 3D navigator ham shu
   modeldan chiziladi — shuning uchun ular hech qachon farq qilmaydi.
   O'lchov birligi — metr. Koordinata boshi: bino gabaritining
   chap-yuqori burchagi (X — bo'ylama, Y — ko'ndalang).
   ============================================================ */
(function (global) {
  "use strict";

  /* ---------- Takrorlanuvchi tasodif (bir obyekt — bir bino) ---------- */
  function urug(matn) {
    let h = 2166136261;
    for (let i = 0; i < matn.length; i++) {
      h ^= matn.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }
  function tasodif(boshlangich) {
    let a = boshlangich >>> 0;
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  /* ---------- Xona turlari ---------- */
  const XONA_TUR = {
    ofis:     {nom: "Ofis xonasi",       rang: "lavanda", nazorat: false},
    yigilish: {nom: "Yig'ilish xonasi",  rang: "mint",    nazorat: false},
    ochiq:    {nom: "Ochiq ish zoni",    rang: "lavanda", nazorat: false},
    savdo:    {nom: "Savdo zali",        rang: "mint",    nazorat: false},
    ombor:    {nom: "Ombor",             rang: "kul",     nazorat: true},
    arxiv:    {nom: "Arxiv",             rang: "kul",     nazorat: true},
    server:   {nom: "Server xonasi",     rang: "pushti",  nazorat: true},
    kassa:    {nom: "Kassa tuguni",      rang: "pushti",  nazorat: true},
    texnik:   {nom: "Texnik xona",       rang: "kul",     nazorat: true},
    sanuzel:  {nom: "Sanuzel",           rang: "kul",     nazorat: false},
    zinapoya: {nom: "Zinapoya",          rang: "kul",     nazorat: false},
    lift:     {nom: "Lift holli",        rang: "kul",     nazorat: false},
    yolak:    {nom: "Yo'lak",            rang: "kul",     nazorat: false},
    kirish:   {nom: "Kirish holli",      rang: "mint",    nazorat: true},
    ishlab:   {nom: "Ishlab chiqarish",  rang: "lavanda", nazorat: true},
    kotarma:  {nom: "Yuk ko'tarish zoni",rang: "kul",     nazorat: true},
  };

  const HOLATLAR = [
    {kalit: "foydalanishda", nom: "Foydalanishda", rang: "mint"},
    {kalit: "bosh",          nom: "Bo'sh",         rang: "kul"},
    {kalit: "muhrlangan",    nom: "Muhrlangan",    rang: "pushti"},
    {kalit: "tamirda",       nom: "Ta'mirda",      rang: "lavanda"},
  ];

  /* ---------- Bino turlari bo'yicha tipologiya ---------- */
  const TIPOLOGIYA = {
    "Ma'muriy bino":      {qavat: [3, 6], en: [38, 54], chuq: [15, 20], asos: ["ofis","ofis","yigilish","ochiq"]},
    "Savdo majmuasi":     {qavat: [2, 4], en: [46, 62], chuq: [20, 26], asos: ["savdo","savdo","ochiq","ombor"]},
    "Savdo maydoni":      {qavat: [1, 2], en: [30, 44], chuq: [16, 22], asos: ["savdo","ombor","ochiq"]},
    "Ombor":              {qavat: [1, 2], en: [44, 60], chuq: [20, 28], asos: ["ombor","ombor","kotarma","texnik"]},
    "Ishlab chiqarish":   {qavat: [1, 2], en: [42, 58], chuq: [20, 26], asos: ["ishlab","ishlab","texnik","ombor"]},
    "Turar-joy majmuasi": {qavat: [4, 9], en: [30, 42], chuq: [14, 18], asos: ["ofis","ofis","ochiq"]},
    "Kvartira":           {qavat: [1, 1], en: [12, 16], chuq: [9, 12],  asos: ["ofis","ofis","ochiq"]},
    "Ofis binosi":        {qavat: [3, 6], en: [34, 50], chuq: [15, 20], asos: ["ofis","ofis","yigilish","ochiq"]},
    "Dala hovli":         {qavat: [1, 2], en: [13, 19], chuq: [10, 14], asos: ["ofis","ochiq","ombor"]},
    "Turar-joy":          {qavat: [1, 2], en: [14, 20], chuq: [10, 14], asos: ["ofis","ochiq","ombor"]},
    "Avtotransport":      {qavat: [1, 1], en: [18, 24], chuq: [12, 16], asos: ["texnik","ombor"]},
    "Yer uchastkasi":     {qavat: [1, 1], en: [16, 22], chuq: [10, 14], asos: ["texnik","ombor"]},
  };
  const ANIQLANMAGAN = {qavat: [2, 4], en: [34, 48], chuq: [16, 21], asos: ["ofis","ochiq","ombor"]};

  /* Bino tuzilmasi yuritilmaydigan turlar: yer uchastkasi va transport.
     Bunday obyektlarda qavat rejasi ham, uch o'lchovli navigator ham
     ma'noga ega emas — ekran buni ochiq aytadi. */
  const BINOSIZ = ["Yer uchastkasi", "Avtotransport", "Uchastka", "Transport"];

  /* "9 400 m²" kabi matndan sonni ajratish */
  function maydonSoni(matn) {
    if (typeof matn === "number") return matn > 0 ? matn : null;
    if (!matn) return null;
    const m = String(matn).replace(/\u00a0|\s/g, "").match(/(\d+([.,]\d+)?)/);
    if (!m) return null;
    const v = parseFloat(m[1].replace(",", "."));
    return v > 0 ? v : null;
  }

  /* ---------- O'lchovlar (metr) ---------- */
  const TASH_DEVOR = 0.40;   /* tashqi devor qalinligi */
  const ICH_DEVOR  = 0.15;   /* ichki to'siq qalinligi */
  const YOLAK_ENI  = 2.40;   /* yo'lak eni */
  const ESHIK_ENI  = 0.95;
  const DERAZA_ENI = 1.70;
  const QAVAT_BAL  = 3.60;   /* qavat balandligi */

  function butun(r, a, b) { return a + Math.floor(r() * (b - a + 1)); }
  function oraliq(r, a, b) { return a + r() * (b - a); }

  /* ---------- Bir tomonni xonalarga bo'lish ---------- */
  function bolish(r, uzunlik, engKichik, engKatta) {
    const bolaklar = [];
    if (uzunlik <= engKichik + 0.01) return uzunlik > 0.5 ? [Math.round(uzunlik * 100) / 100] : [];
    let qolgan = uzunlik;
    while (qolgan > engKichik * 2 + 0.01) {
      let w = oraliq(r, engKichik, engKatta);
      if (qolgan - w < engKichik) w = qolgan - engKichik;
      bolaklar.push(Math.round(w * 100) / 100);
      qolgan -= w;
    }
    bolaklar.push(Math.round(qolgan * 100) / 100);
    return bolaklar;
  }

  /* ---------- Bitta qavat rejasi ---------- */
  function qavatQur(r, tip, gab, raqam, qavatSoni) {
    const {en, chuq} = gab;
    const ichEn = en - TASH_DEVOR * 2;
    const ichChuq = chuq - TASH_DEVOR * 2;
    const yolakY = TASH_DEVOR + (ichChuq - YOLAK_ENI) / 2;
    const yuqoriChuq = yolakY - TASH_DEVOR;
    const pastY = yolakY + YOLAK_ENI;
    const pastChuq = chuq - TASH_DEVOR - pastY;

    const xonalar = [];
    const eshiklar = [];
    let nomer = 0;

    /* yadro: zinapoya + lift + sanuzel — har qavatda bir xil joyda.
       Kichik gabaritda yadro qisqaradi, juda kichigida faqat sanuzel qoladi. */
    let yadroTarkib = ["zinapoya", "lift", "sanuzel"];
    if (ichEn < 30) yadroTarkib = ["zinapoya", "sanuzel"];
    if (ichEn < 18) yadroTarkib = ["sanuzel"];
    const YADRO_EN = {zinapoya: 3.0, lift: 2.2, sanuzel: 2.4};
    const yadroEn = yadroTarkib.reduce((a, t) => a + YADRO_EN[t], 0);
    let yadroX = TASH_DEVOR + ichEn * 0.62;
    yadroX = Math.min(yadroX, en - TASH_DEVOR - yadroEn);
    yadroX = Math.max(TASH_DEVOR + 3.2, yadroX);
    yadroX = Math.round(yadroX * 100) / 100;

    function xonaQosh(x, y, w, d, tur, tomon) {
      nomer += 1;
      const maydon = Math.round(w * d * 10) / 10;
      const id = raqam + "-" + String(nomer).padStart(2, "0");
      const t = XONA_TUR[tur] || XONA_TUR.ofis;
      const x2 = Math.round(x * 100) / 100, y2 = Math.round(y * 100) / 100;
      const x3 = { id: id, nom: t.nom, tur: tur, rang: t.rang, qavat: raqam,
                   x: x2, y: y2, en: Math.round(w * 100) / 100, chuq: Math.round(d * 100) / 100,
                   maydon: maydon, tomon: tomon, nazorat: t.nazorat };
      xonalar.push(x3);
      /* yo'lakka chiqadigan eshik */
      const eshikX = x2 + (x3.en - ESHIK_ENI) / 2;
      const eshikY = tomon === "yuqori" ? y2 + d : y2;
      /* y — to'siqning O'Q chizig'i: renderer teshikni shu o'q atrofida kesadi */
      const oq = tomon === "yuqori" ? y2 + d + ICH_DEVOR / 2 : y2 - ICH_DEVOR / 2;
      eshiklar.push({
        id: id + "-E", xonaId: id, x: Math.round(eshikX * 100) / 100,
        y: Math.round(oq * 100) / 100,
        en: ESHIK_ENI, yonalish: "x", ochilish: tomon === "yuqori" ? -1 : 1,
        tur: t.nazorat ? "nazorat" : "ichki",
      });
      return x3;
    }

    /* --- yuqori tomon --- */
    let x = TASH_DEVOR;
    const yuqoriBolaklar = bolish(r, ichEn, 3.6, 8.2);
    yuqoriBolaklar.forEach((w, i) => {
      let tur = tip.asos[i % tip.asos.length];
      if (raqam === 1 && i === 0) tur = "kirish";
      if (i === yuqoriBolaklar.length - 1 && raqam > 1) tur = "arxiv";
      xonaQosh(x, TASH_DEVOR, w, yuqoriChuq, tur, "yuqori");
      x += w;
    });

    /* --- past tomon: yadro bloki bilan --- */
    x = TASH_DEVOR;
    const chapUzunlik = yadroX - TASH_DEVOR;
    const ongUzunlik = en - TASH_DEVOR - (yadroX + yadroEn);
    const chapBolaklar = bolish(r, chapUzunlik, 3.6, 7.8);
    chapBolaklar.forEach((w, i) => {
      let tur = tip.asos[(i + 2) % tip.asos.length];
      if (raqam === 1 && i === 0) tur = "kirish";
      if (i === 1 && raqam === 1) tur = "kassa";
      if (i === 2 && raqam === 2) tur = "server";
      xonaQosh(x, pastY, w, pastChuq, tur, "past");
      x += w;
    });
    /* yadro — o'ng tomonda ozgina joy qolsa, oxirgi blok devorgacha cho'ziladi */
    let yx = yadroX;
    yadroTarkib.forEach((t, i) => {
      const oxirgi = i === yadroTarkib.length - 1;
      const w = YADRO_EN[t] + (oxirgi && ongUzunlik > 0 && ongUzunlik <= 3.2 ? ongUzunlik : 0);
      xonaQosh(yx, pastY, w, pastChuq, t, "past");
      yx += w;
    });
    x = yx;
    if (ongUzunlik > 3.2) {
      const ongBolaklar = bolish(r, ongUzunlik, 3.6, 7.8);
      ongBolaklar.forEach((w, i) => {
        const tur = tip.asos[(i + 1) % tip.asos.length];
        xonaQosh(x, pastY, w, pastChuq, tur, "past");
        x += w;
      });
    }

    /* --- yo'lak --- */
    const yolak = {
      id: raqam + "-YL", nom: XONA_TUR.yolak.nom, tur: "yolak", rang: "kul", qavat: raqam,
      holat: "foydalanishda", nazorat: false,
      x: TASH_DEVOR, y: Math.round(yolakY * 100) / 100, en: Math.round(ichEn * 100) / 100,
      chuq: YOLAK_ENI, maydon: Math.round(ichEn * YOLAK_ENI * 10) / 10, tomon: "yolak", nazorat: false,
    };

    /* --- derazalar: tashqi devordagi xonalar bo'yicha --- */
    const derazalar = [];
    /* birinchi qavatda markaziy kirish egallaydigan oraliq */
    const kirishOraligi = raqam === 1
      ? {a: Math.round((en / 2 - 1.9) * 100) / 100, b: Math.round((en / 2 + 1.9) * 100) / 100}
      : null;
    xonalar.forEach(x2 => {
      if (x2.tur === "zinapoya" || x2.tur === "lift" || x2.tur === "sanuzel") return;
      const soni = Math.max(1, Math.floor(x2.en / 3.1));
      const qadam = x2.en / soni;
      for (let i = 0; i < soni; i++) {
        const cx = Math.round((x2.x + qadam * (i + 0.5) - DERAZA_ENI / 2) * 100) / 100;
        /* janub fasadida markaziy kirish bilan to'qnashadigan deraza tashlanadi */
        if (x2.tomon === "past" && kirishOraligi &&
            cx + DERAZA_ENI > kirishOraligi.a && cx < kirishOraligi.b) continue;
        derazalar.push({
          x: cx,
          y: x2.tomon === "yuqori" ? 0 : chuq - TASH_DEVOR,
          en: DERAZA_ENI, yonalish: "x", fasad: x2.tomon === "yuqori" ? "shimol" : "janub",
        });
      }
    });
    /* yon fasadlar */
    [0, 1].forEach(k => {
      const soni = Math.max(1, Math.floor(ichChuq / 3.4));
      const qadam = ichChuq / soni;
      for (let i = 0; i < soni; i++) {
        derazalar.push({
          x: k === 0 ? 0 : en - TASH_DEVOR,
          y: Math.round((TASH_DEVOR + qadam * (i + 0.5) - DERAZA_ENI / 2) * 100) / 100,
          en: DERAZA_ENI, yonalish: "y", fasad: k === 0 ? "g'arb" : "sharq",
        });
      }
    });

    /* --- kirish nuqtalari (elektron qulf o'rnatilgan eshiklar) --- */
    const nuqtalar = [];
    if (raqam === 1) {
      const markaz = Math.round((en / 2 - 1.6) * 100) / 100;
      nuqtalar.push({
        id: "KN-" + raqam + "-01", nom: "Markaziy kirish", qavat: raqam,
        x: markaz, y: chuq - TASH_DEVOR, en: 3.2, yonalish: "x", tur: "turniket",
      });
      eshiklar.push({id: "KN-" + raqam + "-01-E", xonaId: null, x: markaz,
                     y: Math.round((chuq - TASH_DEVOR / 2) * 100) / 100,
                     en: 3.2, yonalish: "x", ochilish: -1, tur: "kirish"});
      nuqtalar.push({
        id: "KN-" + raqam + "-02", nom: "Xizmat kirishi", qavat: raqam,
        x: 0, y: Math.round((chuq / 2 - 0.6) * 100) / 100, en: 1.2, yonalish: "y", tur: "eshik",
      });
    }
    /* Nazorat ostidagi xonalardan eng muhimlari: har qavatda ko'pi bilan uchtasi.
       Reyestr aynan shu ro'yxatni oladi — 3D, reja va jadval bir xil sonni ko'rsatadi. */
    const MUHIM = ["server", "kassa", "arxiv", "ombor", "texnik", "kirish", "ishlab", "kotarma"];
    xonalar.filter(x2 => x2.nazorat)
      .sort((a, b) => MUHIM.indexOf(a.tur) - MUHIM.indexOf(b.tur))
      .slice(0, 3)
      .forEach((x2, i) => {
      nuqtalar.push({
        id: "KN-" + raqam + "-" + String(i + 10).padStart(2, "0"),
        nom: x2.nom, qavat: raqam, xonaId: x2.id,
        x: Math.round((x2.x + (x2.en - ESHIK_ENI) / 2) * 100) / 100,
        y: x2.tomon === "yuqori" ? Math.round((x2.y + x2.chuq) * 100) / 100 : x2.y,
        en: ESHIK_ENI, yonalish: "x", tur: "eshik",
      });
    });

    const jamiMaydon = Math.round((xonalar.reduce((a, b) => a + b.maydon, 0) + yolak.maydon) * 10) / 10;
    return {
      raqam: raqam,
      nom: raqam + "-qavat",
      balandlik: QAVAT_BAL,
      z: (raqam - 1) * QAVAT_BAL,
      xonalar: xonalar,
      yolak: yolak,
      eshiklar: eshiklar,
      derazalar: derazalar,
      kirishNuqtalari: nuqtalar,
      maydon: jamiMaydon,
    };
  }

  /* ---------- Xona holatini taqsimlash ---------- */
  function holatBer(r, model) {
    const jami = model.qavatlar.reduce((a, q) => a + q.xonalar.length, 0);
    let muhr = Math.max(1, Math.round(jami * oraliq(r, 0.10, 0.22)));
    let bosh = Math.max(1, Math.round(jami * oraliq(r, 0.14, 0.30)));
    let tamir = Math.round(jami * oraliq(r, 0.04, 0.12));
    model.qavatlar.forEach(q => {
      q.xonalar.forEach(x => {
        if (["zinapoya", "lift", "sanuzel"].includes(x.tur)) { x.holat = "foydalanishda"; return; }
        const t = r();
        if (muhr > 0 && t < 0.24) { x.holat = "muhrlangan"; muhr--; }
        else if (bosh > 0 && t < 0.52) { x.holat = "bosh"; bosh--; }
        else if (tamir > 0 && t < 0.62) { x.holat = "tamirda"; tamir--; }
        else x.holat = "foydalanishda";
      });
    });
  }

  /* ---------- Model ---------- */
  const KESH = {};

  function model(obyektId, tur, nom, maydon) {
    const kalit = obyektId + "|" + (tur || "") + "|" + (maydon == null ? "" : maydon);
    if (KESH[kalit]) return KESH[kalit];

    const r = tasodif(urug(kalit));
    const tip = TIPOLOGIYA[tur] || ANIQLANMAGAN;
    let qavatSoni = butun(r, tip.qavat[0], tip.qavat[1]);
    let gab = {
      en: Math.round(oraliq(r, tip.en[0], tip.en[1]) * 10) / 10,
      chuq: Math.round(oraliq(r, tip.chuq[0], tip.chuq[1]) * 10) / 10,
    };

    /* Reyestrda maydon ko'rsatilgan bo'lsa — gabarit shunga moslanadi,
       shunda obyekt kartochkasi va bino ko'rinishi bir xil raqamni beradi. */
    const talab = maydonSoni(maydon);
    if (talab) {
      const eng = tip.qavat[1];
      qavatSoni = Math.max(tip.qavat[0], Math.min(eng,
        Math.round(talab / Math.max(120, gab.en * gab.chuq * 0.72))));
      if (!qavatSoni || !isFinite(qavatSoni)) qavatSoni = tip.qavat[0];
      /* juda katta maydon bir qavatga sig'masa — qavat sonini oshiramiz */
      while (talab / qavatSoni > 7000 && qavatSoni < 12) qavatSoni += 1;
      const qavatMaydoni = talab / qavatSoni;
      /* nisbatni saqlagan holda gabaritni qayta hisoblaymiz */
      const nisbat = gab.en / gab.chuq;
      const yalpi = qavatMaydoni / 0.93;          /* devor va yo'lak ulushi */
      let chuq = Math.sqrt(yalpi / nisbat);
      let en = yalpi / chuq;
      chuq = Math.max(8.5, Math.min(64, chuq));
      en = Math.max(11, Math.min(190, yalpi / chuq));
      gab = {en: Math.round(en * 10) / 10, chuq: Math.round(chuq * 10) / 10};
    }

    const m = {
      obyektId: obyektId,
      nom: nom || obyektId,
      tur: tur || "Ma'muriy bino",
      gabarit: {en: gab.en, chuq: gab.chuq, qavatBalandligi: QAVAT_BAL,
                balandlik: Math.round(qavatSoni * QAVAT_BAL * 10) / 10},
      qavatSoni: qavatSoni,
      qavatlar: [],
    };
    for (let i = 1; i <= qavatSoni; i++) m.qavatlar.push(qavatQur(r, tip, gab, i, qavatSoni));
    holatBer(r, m);

    m.maydon = Math.round(m.qavatlar.reduce((a, q) => a + q.maydon, 0) * 10) / 10;
    m.xonaSoni = m.qavatlar.reduce((a, q) => a + q.xonalar.length, 0);
    m.kirishNuqtaSoni = m.qavatlar.reduce((a, q) => a + q.kirishNuqtalari.length, 0);

    m.talabMaydon = talab || null;
    m.binoli = BINOSIZ.indexOf(tur) < 0;
    KESH[kalit] = m;
    return m;
  }

  /* ---------- Yordamchilar ---------- */
  function xonaTop(m, xonaId) {
    for (const q of m.qavatlar) {
      const x = q.xonalar.find(y => y.id === xonaId);
      if (x) return x;
      if (q.yolak.id === xonaId) return q.yolak;
    }
    return null;
  }
  function holatNomi(kalit) {
    const h = HOLATLAR.find(x => x.kalit === kalit);
    return h ? h.nom : kalit;
  }
  function holatRangi(kalit) {
    const h = HOLATLAR.find(x => x.kalit === kalit);
    return h ? h.rang : "kul";
  }
  function jamlama(m) {
    const j = {};
    HOLATLAR.forEach(h => j[h.kalit] = 0);
    m.qavatlar.forEach(q => q.xonalar.forEach(x => { j[x.holat] = (j[x.holat] || 0) + 1; }));
    return j;
  }

  global.MKBbino = {
    model: model,
    xonaTop: xonaTop,
    holatNomi: holatNomi,
    holatRangi: holatRangi,
    jamlama: jamlama,
    HOLATLAR: HOLATLAR,
    XONA_TUR: XONA_TUR,
    olcham: {TASH_DEVOR, ICH_DEVOR, YOLAK_ENI, ESHIK_ENI, DERAZA_ENI, QAVAT_BAL},
  };
})(window);
