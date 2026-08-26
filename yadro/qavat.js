/* ============================================================
   qavat.js — qavat rejasi (arxitektura chizmasi)
   Devorlar qalinligi bilan, eshik yopqichlari, deraza tashqi
   ramkalari, o'lchov zanjirlari, o'q to'ri, masshtab lineyka,
   shimol strelkasi va shartli belgilar. Manba — MKBbino modeli.
   ============================================================ */
(function (global) {
  "use strict";

  const M = 10;                 /* 1 metr = 10 chizma birligi */
  const CHET = {chap: 62, ong: 46, tepa: 54, past: 66};

  const HOLAT_RANG = {
    foydalanishda: {toldir: "#EAF6E4", chiziq: "#8FC77E"},
    bosh:          {toldir: "#EFF4F7", chiziq: "#B9C6CE"},
    muhrlangan:    {toldir: "#FBE7E3", chiziq: "#E4A79B"},
    tamirda:       {toldir: "#E7EAFA", chiziq: "#98A2DC"},
  };
  const YOLAK_RANG = {toldir: "#F8F6F3", chiziq: "#DAD3C9"};

  const DEVOR = "#15150F";
  const QOGOZ = "#FFFFFF";
  const INGICHKA = "#6F6A61";

  function n(v) { return Math.round(v * 100) / 100; }
  function esc(s) {
    return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  /* ---------- Devor to'plami ---------- */
  function devorlar(model, q) {
    const g = model.gabarit, o = MKBbino.olcham;
    const t = o.TASH_DEVOR, ich = o.ICH_DEVOR;
    const dv = [];
    /* tashqi kontur — halqa shaklida */
    dv.push({tur: "tash", x: 0, y: 0, en: g.en, chuq: t});
    dv.push({tur: "tash", x: 0, y: g.chuq - t, en: g.en, chuq: t});
    dv.push({tur: "tash", x: 0, y: t, en: t, chuq: g.chuq - t * 2});
    dv.push({tur: "tash", x: g.en - t, y: t, en: t, chuq: g.chuq - t * 2});

    /* yo'lak devorlari */
    const yl = q.yolak;
    dv.push({tur: "ich", x: yl.x, y: yl.y - ich, en: yl.en, chuq: ich});
    dv.push({tur: "ich", x: yl.x, y: yl.y + yl.chuq, en: yl.en, chuq: ich});

    /* xonalar orasidagi to'siqlar */
    ["yuqori", "past"].forEach(tomon => {
      const r = q.xonalar.filter(x => x.tomon === tomon).sort((a, b) => a.x - b.x);
      for (let i = 1; i < r.length; i++) {
        dv.push({tur: "ich", x: r[i].x - ich / 2, y: r[i].y, en: ich, chuq: r[i].chuq});
      }
    });
    return dv;
  }

  /* ---------- Ochiqliklar (eshik/deraza) ---------- */
  function ochiqliklar(model, q) {
    const o = MKBbino.olcham, g = model.gabarit;
    const teshik = [], simvol = [];
    q.eshiklar.forEach(e => {
      const qalin = e.tur === "kirish" ? o.TASH_DEVOR : o.ICH_DEVOR;
      if (e.yonalish === "x") {
        teshik.push({x: e.x, y: e.y - qalin / 2 - 0.02, en: e.en, chuq: qalin + 0.04});
        simvol.push({tur: "eshik", x: e.x, y: e.y, en: e.en, yonalish: "x",
                     ochilish: e.ochilish, nazorat: e.tur !== "ichki"});
      } else {
        teshik.push({x: e.x - qalin / 2 - 0.02, y: e.y, en: qalin + 0.04, chuq: e.en});
        simvol.push({tur: "eshik", x: e.x, y: e.y, en: e.en, yonalish: "y",
                     ochilish: e.ochilish, nazorat: e.tur !== "ichki"});
      }
    });
    q.derazalar.forEach(d => {
      if (d.yonalish === "x") {
        teshik.push({x: d.x, y: d.y - 0.02, en: d.en, chuq: o.TASH_DEVOR + 0.04});
        simvol.push({tur: "deraza", x: d.x, y: d.y, en: d.en, yonalish: "x"});
      } else {
        teshik.push({x: d.x - 0.02, y: d.y, en: o.TASH_DEVOR + 0.04, chuq: d.en});
        simvol.push({tur: "deraza", x: d.x, y: d.y, en: d.en, yonalish: "y"});
      }
    });
    return {teshik, simvol};
  }

  /* ---------- O'lchov zanjiri ---------- */
  function zanjir(bolaklar, boshX, chiziqY, yonalish, uzunlikMatn) {
    /* bolaklar: [{boshi, uzunlik}] — metrda */
    let s = "";
    const uch = 3.4;
    bolaklar.forEach(b => {
      const a = (yonalish === "x" ? b.boshi * M : b.boshi * M);
      const l = b.uzunlik * M;
      if (yonalish === "x") {
        s += '<line x1="' + n(a) + '" y1="' + n(chiziqY - uch) + '" x2="' + n(a) + '" y2="' + n(chiziqY + uch) + '"/>';
        s += '<line x1="' + n(a) + '" y1="' + n(chiziqY) + '" x2="' + n(a + l) + '" y2="' + n(chiziqY) + '"/>';
        if (l > 22) {
          s += '<text x="' + n(a + l / 2) + '" y="' + n(chiziqY - 4.5) + '" text-anchor="middle">' +
               (uzunlikMatn ? uzunlikMatn(b.uzunlik) : b.uzunlik.toFixed(1)) + "</text>";
        }
      } else {
        s += '<line x1="' + n(chiziqY - uch) + '" y1="' + n(a) + '" x2="' + n(chiziqY + uch) + '" y2="' + n(a) + '"/>';
        s += '<line x1="' + n(chiziqY) + '" y1="' + n(a) + '" x2="' + n(chiziqY) + '" y2="' + n(a + l) + '"/>';
        if (l > 22) {
          s += '<text x="' + n(chiziqY - 4.5) + '" y="' + n(a + l / 2) + '" text-anchor="middle" ' +
               'transform="rotate(-90 ' + n(chiziqY - 4.5) + ' ' + n(a + l / 2) + ')">' +
               (uzunlikMatn ? uzunlikMatn(b.uzunlik) : b.uzunlik.toFixed(1)) + "</text>";
        }
      }
      const oxir = bolaklar[bolaklar.length - 1];
      if (b === oxir) {
        const e = (b.boshi + b.uzunlik) * M;
        if (yonalish === "x") {
          s += '<line x1="' + n(e) + '" y1="' + n(chiziqY - uch) + '" x2="' + n(e) + '" y2="' + n(chiziqY + uch) + '"/>';
        } else {
          s += '<line x1="' + n(chiziqY - uch) + '" y1="' + n(e) + '" x2="' + n(chiziqY + uch) + '" y2="' + n(e) + '"/>';
        }
      }
    });
    return s;
  }

  /* ---------- Asosiy chizish ---------- */
  function chiz(joy, model, qavatRaqami, opt) {
    opt = opt || {};
    const el = typeof joy === "string" ? document.getElementById(joy) : joy;
    if (!el) return null;
    const q = model.qavatlar.find(x => x.raqam === qavatRaqami) || model.qavatlar[0];
    const g = model.gabarit;
    const o = MKBbino.olcham;

    const W = g.en * M, H = g.chuq * M;
    const vbW = W + CHET.chap + CHET.ong;
    const vbH = H + CHET.tepa + CHET.past;

    const dv = devorlar(model, q);
    const och = ochiqliklar(model, q);

    let s = "";

    /* --- o'q to'ri --- */
    const yuqoriQator = q.xonalar.filter(x => x.tomon === "yuqori").sort((a, b) => a.x - b.x);
    const pastQator = q.xonalar.filter(x => x.tomon === "past").sort((a, b) => a.x - b.x);
    s += '<g class="reja-toq">';
    yuqoriQator.forEach((x, i) => {
      const cx = (x.x + x.en / 2) * M;
      s += '<line x1="' + n(cx) + '" y1="-26" x2="' + n(cx) + '" y2="' + n(H + 26) + '"/>';
      s += '<circle cx="' + n(cx) + '" cy="-32" r="7"/>';
      s += '<text x="' + n(cx) + '" y="-29.4" text-anchor="middle">' + (i + 1) + "</text>";
    });
    ["A", "B", "C"].forEach((bel, i) => {
      const cy = i === 0 ? o.TASH_DEVOR * M / 2
        : i === 1 ? (q.yolak.y + q.yolak.chuq / 2) * M
        : H - o.TASH_DEVOR * M / 2;
      s += '<line x1="-26" y1="' + n(cy) + '" x2="' + n(W + 26) + '" y2="' + n(cy) + '"/>';
      s += '<circle cx="-32" cy="' + n(cy) + '" r="7"/>';
      s += '<text x="-32" y="' + n(cy + 2.6) + '" text-anchor="middle">' + bel + "</text>";
    });
    s += "</g>";

    /* --- xona to'ldirishlari --- */
    s += '<g class="reja-xonalar">';
    const yl = q.yolak;
    s += '<rect class="reja-yolak" x="' + n(yl.x * M) + '" y="' + n(yl.y * M) + '" width="' + n(yl.en * M) +
         '" height="' + n(yl.chuq * M) + '" fill="' + YOLAK_RANG.toldir + '"/>';
    q.xonalar.forEach(x => {
      const r = HOLAT_RANG[x.holat] || HOLAT_RANG.bosh;
      s += '<g class="reja-xona" data-xona="' + esc(x.id) + '" tabindex="0" role="button" ' +
           'aria-label="' + esc(x.nom + ", " + x.maydon + " kvadrat metr, " + MKBbino.holatNomi(x.holat)) + '">';
      s += '<rect x="' + n(x.x * M) + '" y="' + n(x.y * M) + '" width="' + n(x.en * M) + '" height="' + n(x.chuq * M) +
           '" fill="' + r.toldir + '"/>';
      if (x.holat === "muhrlangan") {
        s += '<rect x="' + n(x.x * M) + '" y="' + n(x.y * M) + '" width="' + n(x.en * M) + '" height="' + n(x.chuq * M) +
             '" fill="url(#shtrix-muhr)"/>';
      }
      if (x.holat === "tamirda") {
        s += '<rect x="' + n(x.x * M) + '" y="' + n(x.y * M) + '" width="' + n(x.en * M) + '" height="' + n(x.chuq * M) +
             '" fill="url(#shtrix-tamir)"/>';
      }
      s += '<rect class="reja-tanla" x="' + n(x.x * M + 1) + '" y="' + n(x.y * M + 1) + '" width="' + n(x.en * M - 2) +
           '" height="' + n(x.chuq * M - 2) + '" fill="none"/>';
      s += "</g>";
    });
    s += "</g>";

    /* --- devorlar --- */
    s += '<g class="reja-devor">';
    dv.forEach(d => {
      s += '<rect x="' + n(d.x * M) + '" y="' + n(d.y * M) + '" width="' + n(d.en * M) +
           '" height="' + n(d.chuq * M) + '" fill="' + DEVOR + '"/>';
    });
    s += "</g>";

    /* --- ochiqliklarni kesish --- */
    s += '<g class="reja-teshik">';
    och.teshik.forEach(t => {
      s += '<rect x="' + n(t.x * M) + '" y="' + n(t.y * M) + '" width="' + n(t.en * M) +
           '" height="' + n(t.chuq * M) + '" fill="' + QOGOZ + '"/>';
    });
    s += "</g>";

    /* --- deraza va eshik belgilari --- */
    s += '<g class="reja-simvol">';
    och.simvol.forEach(v => {
      if (v.tur === "deraza") {
        const qal = o.TASH_DEVOR * M;
        if (v.yonalish === "x") {
          const y = v.y * M;
          [0, qal / 2, qal].forEach(dy => {
            s += '<line x1="' + n(v.x * M) + '" y1="' + n(y + dy) + '" x2="' + n((v.x + v.en) * M) +
                 '" y2="' + n(y + dy) + '"/>';
          });
        } else {
          const x = v.x * M;
          [0, qal / 2, qal].forEach(dx => {
            s += '<line x1="' + n(x + dx) + '" y1="' + n(v.y * M) + '" x2="' + n(x + dx) +
                 '" y2="' + n((v.y + v.en) * M) + '"/>';
          });
        }
      } else {
        const w = v.en * M;
        if (v.yonalish === "x") {
          const x = v.x * M, y = v.y * M, d = v.ochilish;
          s += '<line class="qanot" x1="' + n(x) + '" y1="' + n(y) + '" x2="' + n(x) + '" y2="' + n(y + w * d) + '"/>';
          s += '<path class="yoy" d="M ' + n(x) + " " + n(y + w * d) + " A " + n(w) + " " + n(w) +
               " 0 0 " + (d > 0 ? 0 : 1) + " " + n(x + w) + " " + n(y) + '"/>';
        } else {
          const x = v.x * M, y = v.y * M, d = v.ochilish;
          s += '<line class="qanot" x1="' + n(x) + '" y1="' + n(y) + '" x2="' + n(x + w * d) + '" y2="' + n(y) + '"/>';
          s += '<path class="yoy" d="M ' + n(x + w * d) + " " + n(y) + " A " + n(w) + " " + n(w) +
               " 0 0 " + (d > 0 ? 1 : 0) + " " + n(x) + " " + n(y + w) + '"/>';
        }
      }
    });
    s += "</g>";

    /* --- xona yozuvlari --- */
    s += '<g class="reja-yozuv">';
    q.xonalar.forEach(x => {
      const cx = (x.x + x.en / 2) * M, cy = (x.y + x.chuq / 2) * M;
      const kichik = x.en * M < 42 || x.chuq * M < 34;
      if (kichik) {
        s += '<text class="qisqa" x="' + n(cx) + '" y="' + n(cy + 3) + '" text-anchor="middle">' +
             esc(x.id.split("-")[1]) + "</text>";
      } else {
        s += '<text class="nom" x="' + n(cx) + '" y="' + n(cy - 4) + '" text-anchor="middle">' + esc(x.nom) + "</text>";
        s += '<text class="olcham" x="' + n(cx) + '" y="' + n(cy + 8) + '" text-anchor="middle">' +
             x.maydon.toFixed(1).replace(".", ",") + " m&#178;</text>";
        s += '<text class="kod" x="' + n(cx) + '" y="' + n(cy + 19) + '" text-anchor="middle">' + esc(x.id) + "</text>";
      }
    });
    s += '<text class="nom" x="' + n((yl.x + yl.en / 2) * M) + '" y="' + n((yl.y + yl.chuq / 2) * M + 3) +
         '" text-anchor="middle">' + esc(yl.nom) + " &#183; " + yl.maydon.toFixed(1).replace(".", ",") + " m&#178;</text>";
    s += "</g>";

    /* --- kirish nuqtalari --- */
    s += '<g class="reja-kn">';
    q.kirishNuqtalari.forEach(k => {
      const cx = (k.x + (k.yonalish === "x" ? k.en / 2 : 0)) * M;
      const cy = (k.y + (k.yonalish === "y" ? k.en / 2 : 0)) * M;
      s += '<g class="kn-belgi" data-kn="' + esc(k.id) + '" tabindex="0" role="button" aria-label="' +
           esc("Kirish nuqtasi: " + k.nom) + '">';
      s += '<circle cx="' + n(cx) + '" cy="' + n(cy) + '" r="6.6"/>';
      s += '<path d="M ' + n(cx - 2.6) + " " + n(cy - 0.6) + " v -1.6 a 2.6 2.6 0 0 1 5.2 0 v 1.6 h 1 v 5 h -7.2 v -5 z" +
           '"/>';
      s += "</g>";
    });
    s += "</g>";

    /* --- o'lchov zanjirlari --- */
    s += '<g class="reja-olchov">';
    s += zanjir(yuqoriQator.map(x => ({boshi: x.x, uzunlik: x.en})), 0, -14, "x");
    s += zanjir([{boshi: 0, uzunlik: g.en}], 0, H + 30, "x", v => v.toFixed(1).replace(".", ",") + " m");
    s += zanjir([
      {boshi: 0, uzunlik: yl.y},
      {boshi: yl.y, uzunlik: yl.chuq},
      {boshi: yl.y + yl.chuq, uzunlik: g.chuq - yl.y - yl.chuq},
    ], 0, -14, "y");
    s += "</g>";

    /* --- masshtab lineyka va shimol --- */
    const lx = 0, ly = H + 48;
    s += '<g class="reja-masshtab">';
    for (let i = 0; i < 5; i++) {
      s += '<rect x="' + n(lx + i * 2 * M) + '" y="' + n(ly) + '" width="' + n(2 * M) + '" height="4.4" ' +
           'fill="' + (i % 2 ? QOGOZ : DEVOR) + '" stroke="' + DEVOR + '" stroke-width="0.7"/>';
    }
    s += '<text x="' + n(lx) + '" y="' + n(ly + 13) + '">0</text>';
    s += '<text x="' + n(lx + 10 * M) + '" y="' + n(ly + 13) + '" text-anchor="middle">10 m</text>';
    s += "</g>";
    s += '<g class="reja-shimol" transform="translate(' + n(W + 22) + ',-30)">' +
         '<path d="M 0 -13 L 5.4 9 L 0 4.6 L -5.4 9 Z"/>' +
         '<text x="0" y="20" text-anchor="middle">Sh</text></g>';

    const svg =
      '<svg class="qavat-reja" viewBox="' + n(-CHET.chap) + " " + n(-CHET.tepa) + " " + n(vbW) + " " + n(vbH) + '" ' +
      'role="img" aria-label="' + esc(q.nom + " rejasi") + '" preserveAspectRatio="xMidYMid meet">' +
      '<defs>' +
      '<pattern id="shtrix-muhr" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">' +
      '<line x1="0" y1="0" x2="0" y2="7" stroke="#D08F80" stroke-width="1.1"/></pattern>' +
      '<pattern id="shtrix-tamir" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">' +
      '<line x1="0" y1="0" x2="0" y2="9" stroke="#98A2DC" stroke-width="1"/></pattern>' +
      "</defs>" + s + "</svg>";

    el.innerHTML = svg;

    /* --- interaktivlik --- */
    const svgEl = el.querySelector("svg");
    function tanla(id) {
      svgEl.querySelectorAll(".reja-xona.tanlangan").forEach(g2 => g2.classList.remove("tanlangan"));
      const g2 = svgEl.querySelector('.reja-xona[data-xona="' + id + '"]');
      if (g2) g2.classList.add("tanlangan");
      const x = q.xonalar.find(y => y.id === id);
      if (x && opt.tanlanganda) opt.tanlanganda(x, q);
    }
    svgEl.querySelectorAll(".reja-xona").forEach(g2 => {
      g2.addEventListener("click", () => tanla(g2.dataset.xona));
      g2.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); tanla(g2.dataset.xona); }
      });
    });
    function knIshlat(g2, e) {
      if (e) e.stopPropagation();
      const k = q.kirishNuqtalari.find(y => y.id === g2.dataset.kn);
      if (k && opt.kirishNuqtaBosilganda) opt.kirishNuqtaBosilganda(k, q);
    }
    svgEl.querySelectorAll(".kn-belgi").forEach(g2 => {
      g2.addEventListener("click", e => knIshlat(g2, e));
      g2.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); knIshlat(g2, e); }
      });
    });
    if (opt.boshlangichXona) tanla(opt.boshlangichXona);
    return {svg: svgEl, qavat: q, tanla: tanla};
  }

  global.MKBqavat = {chiz: chiz, HOLAT_RANG: HOLAT_RANG};
})(window);
