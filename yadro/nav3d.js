/* ============================================================
   nav3d.js — bino bo'ylab uch o'lchovli navigator
   Canvas 2D ustida qurilgan proyeksiya dvijoki: perspektiv
   kamera, orbita boshqaruvi, chuqurlik bo'yicha saralash,
   yorug'lik bo'yicha soyalash, qavat ajratish, xona tanlash.
   Geometriya MKBbino modelidan olinadi — reja bilan bir manba.
   ============================================================ */
(function (global) {
  "use strict";

  /* ---------- Vektor amallari ---------- */
  function ayir(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function kopayt(a, b) {
    return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  }
  function skalyar(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function birlik(a) {
    const u = Math.hypot(a[0], a[1], a[2]) || 1;
    return [a[0] / u, a[1] / u, a[2] / u];
  }

  /* ---------- Rang ---------- */
  function rangdan(hex) {
    const h = hex.replace("#", "");
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  }
  function rangga(c, k, shaffof) {
    const r = Math.max(0, Math.min(255, Math.round(c[0] * k)));
    const g = Math.max(0, Math.min(255, Math.round(c[1] * k)));
    const b = Math.max(0, Math.min(255, Math.round(c[2] * k)));
    return shaffof == null ? "rgb(" + r + "," + g + "," + b + ")"
                           : "rgba(" + r + "," + g + "," + b + "," + shaffof + ")";
  }

  const PALITRA = {
    fasad:    rangdan("#E4CFAE"),
    fasadYon: rangdan("#D8BE97"),
    tsokol:   rangdan("#9C6B57"),
    plita:    rangdan("#F0EAE1"),
    parapet:  rangdan("#EDE3D3"),
    oyna:     rangdan("#35526E"),
    oynaRam:  rangdan("#C6AA85"),
    tosiq:    rangdan("#E9E2D7"),
    zamin:    rangdan("#EDE7DE"),
    yolCH:    rangdan("#E2DACF"),
    uskuna:   rangdan("#B9BDC0"),
    kn:       rangdan("#25651A"),
  };
  const XONA_RANG = {
    foydalanishda: rangdan("#BFE6AE"),
    bosh:          rangdan("#E7EDF1"),
    muhrlangan:    rangdan("#F2B3A6"),
    tamirda:       rangdan("#BAC3EE"),
  };

  const YORUG = birlik([-0.42, -0.66, 0.62]);

  /* ---------- Geometriya yig'uvchi ---------- */
  function quti(yuz, x, y, z, en, chuq, bal, ranglar, meta, shaffof) {
    const x2 = x + en, y2 = y + chuq, z2 = z + bal;
    const t = ranglar.tepa || ranglar.yon;
    const p = ranglar.yon;
    const q = ranglar.qirra || p;
    yuz.push({n: [[x, y, z2], [x2, y, z2], [x2, y2, z2], [x, y2, z2]], c: t, meta: meta, a: shaffof});
    yuz.push({n: [[x, y, z], [x2, y, z], [x2, y, z2], [x, y, z2]], c: p, meta: meta, a: shaffof});
    yuz.push({n: [[x2, y2, z], [x, y2, z], [x, y2, z2], [x2, y2, z2]], c: p, meta: meta, a: shaffof});
    yuz.push({n: [[x2, y, z], [x2, y2, z], [x2, y2, z2], [x2, y, z2]], c: q, meta: meta, a: shaffof});
    yuz.push({n: [[x, y2, z], [x, y, z], [x, y, z2], [x, y2, z2]], c: q, meta: meta, a: shaffof});
  }

  function tekislik(yuz, x, y, z, en, chuq, rang, meta, shaffof) {
    yuz.push({n: [[x, y, z], [x + en, y, z], [x + en, y + chuq, z], [x, y + chuq, z]],
              c: rang, meta: meta, a: shaffof});
  }

  /* ---------- Fasadni derazalar bilan yig'ish ---------- */
  function fasadQur(yuz, q, g, tomon, z, bal, ochiq) {
    const o = MKBbino.olcham;
    const t = o.TASH_DEVOR;
    const derazaBal = 2.30, pastBal = 0.72;
    const rang = tomon === "shimol" || tomon === "janub" ? PALITRA.fasad : PALITRA.fasadYon;

    const der = q.derazalar.filter(d => d.fasad === tomon).slice();
    /* tashqi eshiklar ham fasadda ochiqlik qoldiradi */
    q.eshiklar.filter(e => e.tur === "kirish").forEach(e => {
      const yotiq2 = tomon === "shimol" || tomon === "janub";
      if (e.yonalish === "x" && yotiq2 && tomon === "janub") der.push({x: e.x, en: e.en, yonalish: "x"});
      if (e.yonalish === "y" && !yotiq2) der.push({y: e.y, en: e.en, yonalish: "y"});
    });
    const yotiq = tomon === "shimol" || tomon === "janub";
    const uzunlik = yotiq ? g.en : g.chuq;

    /* devor bo'ylab bo'shliqlar ro'yxati */
    const teshiklar = der.map(d => ({a: yotiq ? d.x : d.y, b: (yotiq ? d.x : d.y) + d.en}))
      .sort((p1, p2) => p1.a - p2.a);

    function bolak(a, b, zz, hh, c) {
      if (b - a < 0.02 || hh < 0.02) return;
      if (yotiq) {
        const yy = tomon === "shimol" ? 0 : g.chuq - t;
        quti(yuz, a, yy, zz, b - a, t, hh, {yon: c, tepa: c, qirra: c});
      } else {
        const xx = tomon === "g'arb" ? 0 : g.en - t;
        quti(yuz, xx, a, zz, t, b - a, hh, {yon: c, tepa: c, qirra: c});
      }
    }

    let kursor = 0;
    teshiklar.forEach(h => {
      bolak(kursor, h.a, z, bal, rang);
      /* deraza tagidagi va tepasidagi devor */
      bolak(h.a, h.b, z, pastBal, rang);
      bolak(h.a, h.b, z + pastBal + derazaBal, bal - pastBal - derazaBal, rang);
      /* oyna */
      if (ochiq !== false) {
        const zz = z + pastBal;
        if (yotiq) {
          const yy = tomon === "shimol" ? t * 0.62 : g.chuq - t * 0.62;
          yuz.push({n: [[h.a, yy, zz], [h.b, yy, zz], [h.b, yy, zz + derazaBal], [h.a, yy, zz + derazaBal]],
                    c: PALITRA.oyna, oyna: true});
        } else {
          const xx = tomon === "g'arb" ? t * 0.62 : g.en - t * 0.62;
          yuz.push({n: [[xx, h.a, zz], [xx, h.b, zz], [xx, h.b, zz + derazaBal], [xx, h.a, zz + derazaBal]],
                    c: PALITRA.oyna, oyna: true});
        }
      }
      kursor = h.b;
    });
    bolak(kursor, uzunlik, z, bal, rang);
  }

  /* ---------- Butun binoni yig'ish ---------- */
  function geometriya(model, holat) {
    const g = model.gabarit;
    const o = MKBbino.olcham;
    const yuz = [];
    const zamin = [];
    const plitaBal = 0.30;
    const rejim = holat.rejim || "butun";
    const yoyilgan = rejim === "yoyilgan";
    const ichki = rejim === "ichki";

    /* --- zamin: maydoncha va yo'lka --- */
    tekislik(zamin, -3.0, -3.0, 0.008, g.en + 6.0, g.chuq + 6.0, PALITRA.yolCH);

    model.qavatlar.forEach((q, i) => {
      const faol = q.raqam === holat.qavat;
      const yuqorida = q.raqam > holat.qavat;
      if (ichki && yuqorida) return;                 /* tanlangan qavatdan tepasi olib turiladi */

      const z = q.z + (yoyilgan ? i * holat.yoyishBalandligi : 0);
      const ochiqIchki = yoyilgan || (ichki && faol);
      const shaffof = yoyilgan && !faol ? 0.92 : null;

      /* qavat plitasi */
      quti(yuz, 0, 0, z - plitaBal, g.en, g.chuq, plitaBal,
           {yon: PALITRA.tsokol, tepa: PALITRA.plita, qirra: PALITRA.tsokol},
           {qavat: q.raqam}, shaffof);

      if (ochiqIchki) {
        /* xona to'ldirishlari va to'siqlar */
        q.xonalar.forEach(x => {
          const c = XONA_RANG[x.holat] || XONA_RANG.bosh;
          tekislik(yuz, x.x, x.y, z + 0.02, x.en, x.chuq, c, {xona: x.id, qavat: q.raqam}, shaffof);
        });
        tekislik(yuz, q.yolak.x, q.yolak.y, z + 0.02, q.yolak.en, q.yolak.chuq, PALITRA.tosiq,
                 {xona: q.yolak.id, qavat: q.raqam}, shaffof);

        const tosiqBal = Math.min(1.30, o.QAVAT_BAL * 0.38);
        ["yuqori", "past"].forEach(tomon => {
          const r = q.xonalar.filter(x => x.tomon === tomon).sort((a, b) => a.x - b.x);
          for (let k = 1; k < r.length; k++) {
            quti(yuz, r[k].x - o.ICH_DEVOR / 2, r[k].y, z + 0.03, o.ICH_DEVOR, r[k].chuq, tosiqBal,
                 {yon: PALITRA.tosiq, tepa: PALITRA.plita}, null, shaffof);
          }
        });
        const yl = q.yolak;
        quti(yuz, yl.x, yl.y - o.ICH_DEVOR, z + 0.03, yl.en, o.ICH_DEVOR, tosiqBal,
             {yon: PALITRA.tosiq, tepa: PALITRA.plita}, null, shaffof);
        quti(yuz, yl.x, yl.y + yl.chuq, z + 0.03, yl.en, o.ICH_DEVOR, tosiqBal,
             {yon: PALITRA.tosiq, tepa: PALITRA.plita}, null, shaffof);
        /* past bo'y tashqi bort — qavat konturini ushlab turadi */
        const bort = 0.42;
        [[0, 0, g.en, o.TASH_DEVOR], [0, g.chuq - o.TASH_DEVOR, g.en, o.TASH_DEVOR],
         [0, o.TASH_DEVOR, o.TASH_DEVOR, g.chuq - o.TASH_DEVOR * 2],
         [g.en - o.TASH_DEVOR, o.TASH_DEVOR, o.TASH_DEVOR, g.chuq - o.TASH_DEVOR * 2]].forEach(b => {
          quti(yuz, b[0], b[1], z + 0.02, b[2], b[3], bort,
               {yon: PALITRA.fasadYon, tepa: PALITRA.fasad}, null, shaffof);
        });
      } else {
        /* tashqi devorlar derazalari bilan */
        const devorBal = o.QAVAT_BAL - plitaBal;
        ["shimol", "janub", "g'arb", "sharq"].forEach(tomon => {
          fasadQur(yuz, q, g, tomon, z, devorBal, true);
        });
      }

      /* tom — faqat butun ko'rinishda */
      if (i === model.qavatlar.length - 1 && !ochiqIchki) {
        const zt = z + o.QAVAT_BAL - plitaBal;
        quti(yuz, 0, 0, zt, g.en, g.chuq, 0.34,
             {yon: PALITRA.parapet, tepa: PALITRA.plita, qirra: PALITRA.parapet});
        const pt = 0.32, ph = 0.72;
        quti(yuz, 0, 0, zt + 0.34, g.en, pt, ph, {yon: PALITRA.parapet, tepa: PALITRA.parapet});
        quti(yuz, 0, g.chuq - pt, zt + 0.34, g.en, pt, ph, {yon: PALITRA.parapet, tepa: PALITRA.parapet});
        quti(yuz, 0, pt, zt + 0.34, pt, g.chuq - pt * 2, ph, {yon: PALITRA.parapet, tepa: PALITRA.parapet});
        quti(yuz, g.en - pt, pt, zt + 0.34, pt, g.chuq - pt * 2, ph, {yon: PALITRA.parapet, tepa: PALITRA.parapet});
        const soni = Math.max(2, Math.round(g.en / 15));
        for (let k = 0; k < soni; k++) {
          const ux = Math.min(4.2 + k * ((g.en - 10) / Math.max(1, soni - 1)), g.en - 5.4);
          quti(yuz, ux, g.chuq * 0.30, zt + 0.34, 3.1, 2.2, 1.15,
               {yon: PALITRA.uskuna, tepa: PALITRA.plita});
        }
      }
    });

    /* kirish nuqtalari — birinchi qavat oldida ustunchalar */
    const q1 = model.qavatlar[0];
    if (q1 && !yoyilgan) {
      q1.kirishNuqtalari.filter(k => k.tur === "turniket" || k.id.slice(-2) === "02").forEach(k => {
        const x = k.yonalish === "x" ? k.x + k.en / 2 : k.x;
        const y = k.yonalish === "y" ? k.y + k.en / 2 : k.y;
        quti(yuz, x - 0.38, y - 0.38, 0, 0.76, 0.76, 1.20,
             {yon: PALITRA.kn, tepa: PALITRA.kn}, {kn: k.id});
      });
    }
    return {zamin: zamin, bino: yuz};
  }

  /* ---------- Navigator ---------- */
  function yarat(joy, model, opt) {
    opt = opt || {};
    const el = typeof joy === "string" ? document.getElementById(joy) : joy;
    if (!el) return null;

    const kanvas = document.createElement("canvas");
    kanvas.className = "nav3d-kanvas";
    kanvas.setAttribute("role", "img");
    kanvas.setAttribute("aria-label", (model.nom || "Bino") + " uch o'lchovli ko'rinishi");
    el.appendChild(kanvas);
    const ctx = kanvas.getContext("2d");

    const g = model.gabarit;
    const holat = {
      qavat: opt.qavat || 1,
      rejim: opt.rejim || "butun",          /* butun | ichki | yoyilgan */
      yoyishBalandligi: MKBbino.olcham.QAVAT_BAL * 1.25,
      az: -0.86, bal: 0.52,
      masofa: Math.max(g.en, g.chuq) * 1.65 + 22,
      markaz: [g.en / 2, g.chuq / 2, g.balandlik * 0.36],
      tanlangan: null,
      ustida: null,
    };
    let sahna = geometriya(model, holat);
    let chizilgan = [];
    let W = 0, H = 0, dpr = 1;
    let animatsiya = null;

    function olcham() {
      const r = el.getBoundingClientRect();
      dpr = Math.min(2, global.devicePixelRatio || 1);
      W = Math.max(320, Math.round(r.width));
      H = Math.max(260, Math.round(r.height));
      kanvas.width = Math.round(W * dpr);
      kanvas.height = Math.round(H * dpr);
      kanvas.style.width = W + "px";
      kanvas.style.height = H + "px";
    }

    function kamera() {
      const cb = Math.cos(holat.bal), sb = Math.sin(holat.bal);
      const poz = [
        holat.markaz[0] + holat.masofa * cb * Math.cos(holat.az),
        holat.markaz[1] + holat.masofa * cb * Math.sin(holat.az),
        holat.markaz[2] + holat.masofa * sb,
      ];
      const old = birlik(ayir(holat.markaz, poz));
      const ong = birlik(kopayt(old, [0, 0, 1]));
      const tepa = kopayt(ong, old);
      return {poz, old, ong, tepa};
    }

    function proyeksiya(k) {
      const f = 1 / Math.tan(0.42);
      const masshtab = Math.min(W, H * 1.35) * 0.5;
      return function (p) {
        const v = ayir(p, k.poz);
        const z = skalyar(v, k.old);
        if (z < 0.35) return null;
        const x = skalyar(v, k.ong), y = skalyar(v, k.tepa);
        return [W / 2 + (f * x / z) * masshtab, H / 2 - (f * y / z) * masshtab, z];
      };
    }

    function tayyorla(royxat, k, pr) {
      const t = [];
      for (let i = 0; i < royxat.length; i++) {
        const y = royxat[i];
        const ekran = [];
        let ok = true, chuqurlik = 0;
        for (let j = 0; j < y.n.length; j++) {
          const p = pr(y.n[j]);
          if (!p) { ok = false; break; }
          ekran.push(p);
          chuqurlik += p[2];
        }
        if (!ok) continue;
        const norm = birlik(kopayt(ayir(y.n[1], y.n[0]), ayir(y.n[2], y.n[0])));
        if (skalyar(norm, birlik(ayir(k.poz, y.n[0]))) <= 0.001) continue;
        t.push({y: y, ekran: ekran, chuqurlik: chuqurlik / y.n.length, norm: norm});
      }
      t.sort((a, b) => b.chuqurlik - a.chuqurlik);
      return t;
    }

    function yol(d) {
      ctx.beginPath();
      ctx.moveTo(d.ekran[0][0], d.ekran[0][1]);
      for (let j = 1; j < d.ekran.length; j++) ctx.lineTo(d.ekran[j][0], d.ekran[j][1]);
      ctx.closePath();
    }

    function chiz() {
      animatsiya = null;
      const k = kamera();
      const pr = proyeksiya(k);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      /* fon */
      const fon = ctx.createLinearGradient(0, 0, W * 0.35, H);
      fon.addColorStop(0, "#FBF6F0");
      fon.addColorStop(0.55, "#F4F1F5");
      fon.addColorStop(1, "#EDF1F1");
      ctx.fillStyle = fon;
      ctx.fillRect(0, 0, W, H);

      const asos = pr([g.en / 2, g.chuq / 2, 0]);

      /* maydoncha */
      const zaminD = tayyorla(sahna.zamin, k, pr);
      zaminD.forEach(d => {
        yol(d);
        if (asos) {
          const r = Math.max(g.en, g.chuq) * 9 * (520 / holat.masofa);
          const gr = ctx.createRadialGradient(asos[0], asos[1], 0, asos[0], asos[1], Math.max(60, r));
          gr.addColorStop(0, "rgba(232,224,212,.95)");
          gr.addColorStop(1, "rgba(232,224,212,0)");
          ctx.fillStyle = gr;
        } else {
          ctx.fillStyle = rangga(d.y.c, 1);
        }
        ctx.fill();
      });

      /* kontakt soyasi */
      if (asos) {
        const rx = Math.max(g.en, g.chuq) * 4.2 * (560 / holat.masofa);
        ctx.save();
        ctx.translate(asos[0], asos[1] + 4);
        ctx.scale(1, 0.26);
        const gr = ctx.createRadialGradient(0, 0, 0, 0, 0, Math.max(40, rx));
        gr.addColorStop(0, "rgba(58,44,30,.30)");
        gr.addColorStop(0.62, "rgba(58,44,30,.10)");
        gr.addColorStop(1, "rgba(58,44,30,0)");
        ctx.fillStyle = gr;
        ctx.beginPath();
        ctx.arc(0, 0, Math.max(40, rx), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      chizilgan = tayyorla(sahna.bino, k, pr);
      for (let i = 0; i < chizilgan.length; i++) {
        const d = chizilgan[i];
        const yorug = 0.56 + 0.44 * Math.max(0, skalyar(d.norm, YORUG));
        const meta = d.y.meta;
        const tanlangan = meta && meta.xona && meta.xona === holat.tanlangan;
        const ustida = meta && meta.xona && meta.xona === holat.ustida;
        let rang;
        if (d.y.oyna) rang = rangga(d.y.c, 0.68 + 0.46 * Math.max(0, skalyar(d.norm, YORUG)), d.y.a);
        else if (tanlangan) rang = rangga([22, 22, 18], 1, d.y.a);
        else if (ustida) rang = rangga(d.y.c, yorug * 1.16, d.y.a);
        else rang = rangga(d.y.c, yorug, d.y.a);
        yol(d);
        ctx.fillStyle = rang;
        ctx.fill();
        if (d.y.oyna) {
          ctx.strokeStyle = rangga(PALITRA.oynaRam, yorug * 0.9);
          ctx.lineWidth = 1;
          ctx.stroke();
        } else if (meta && meta.xona) {
          ctx.strokeStyle = tanlangan ? "rgba(11,11,10,.9)" : "rgba(24,22,18,.22)";
          ctx.lineWidth = tanlangan ? 1.4 : 0.8;
          ctx.stroke();
        }
      }

      /* qavat yorliqlari — bino konturidan tashqarida */
      ctx.font = "500 12.5px 'Outfit','Manrope',system-ui,sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      model.qavatlar.forEach((q, i) => {
        if (holat.rejim === "ichki" && q.raqam > holat.qavat) return;
        const dz = holat.rejim === "yoyilgan" ? i * holat.yoyishBalandligi : 0;
        const p = pr([g.en + 2.6, -2.6, q.z + dz + MKBbino.olcham.QAVAT_BAL * 0.5]);
        if (!p) return;
        const faol = q.raqam === holat.qavat;
        const matn = q.raqam + "-qavat";
        const w = ctx.measureText(matn).width + 16;
        ctx.fillStyle = faol ? "rgba(11,11,10,.92)" : "rgba(255,255,255,.78)";
        ctx.beginPath();
        if (ctx.roundRect) { ctx.roundRect(p[0] - w / 2, p[1] - 10, w, 20, 10); }
        else { ctx.rect(p[0] - w / 2, p[1] - 10, w, 20); }
        ctx.fill();
        ctx.fillStyle = faol ? "#FFFFFF" : "rgba(11,11,10,.62)";
        ctx.fillText(matn, p[0], p[1] + 0.5);
      });
      ctx.textBaseline = "alphabetic";

      if (opt.chizilgandan) opt.chizilgandan(holat);
    }

    function yangila() {
      if (!animatsiya) animatsiya = global.requestAnimationFrame(chiz);
    }
    function kameraMoslash() {
      const eng = Math.max(g.en, g.chuq);
      const q = model.qavatlar.find(x => x.raqam === holat.qavat) || model.qavatlar[0];
      if (holat.rejim === "ichki") {
        holat.markaz = [g.en / 2, g.chuq / 2, q.z + 1.4];
        holat.masofa = eng * 0.95 + 8;
        holat.bal = Math.max(holat.bal, 0.66);
      } else if (holat.rejim === "yoyilgan") {
        const bal = (model.qavatlar.length - 1) * holat.yoyishBalandligi + g.balandlik;
        holat.markaz = [g.en / 2, g.chuq / 2, bal * 0.34];
        holat.masofa = eng * 1.55 + bal * 0.9 + 16;
        holat.bal = Math.min(Math.max(holat.bal, 0.42), 0.72);
      } else {
        holat.markaz = [g.en / 2, g.chuq / 2, g.balandlik * 0.36];
        holat.masofa = eng * 1.65 + 22;
      }
    }

    function qayta() {
      sahna = geometriya(model, holat);
      yangila();
    }

    /* ---------- Tanlash ---------- */
    function ichidami(p, kop) {
      let ichida = false;
      for (let i = 0, j = kop.length - 1; i < kop.length; j = i++) {
        const xi = kop[i][0], yi = kop[i][1], xj = kop[j][0], yj = kop[j][1];
        if ((yi > p[1]) !== (yj > p[1]) && p[0] < ((xj - xi) * (p[1] - yi)) / (yj - yi) + xi) ichida = !ichida;
      }
      return ichida;
    }
    function nuqtadagi(mx, my) {
      for (let i = chizilgan.length - 1; i >= 0; i--) {
        const d = chizilgan[i];
        if (!d.y.meta || (!d.y.meta.xona && !d.y.meta.kn)) continue;
        if (ichidami([mx, my], d.ekran)) return d.y.meta;
      }
      return null;
    }

    /* ---------- Boshqaruv ---------- */
    let sudrash = null;
    kanvas.addEventListener("pointerdown", e => {
      kanvas.setPointerCapture(e.pointerId);
      sudrash = {x: e.offsetX, y: e.offsetY, az: holat.az, bal: holat.bal, yurdi: false};
    });
    kanvas.addEventListener("pointermove", e => {
      if (sudrash) {
        const dx = e.offsetX - sudrash.x, dy = e.offsetY - sudrash.y;
        if (Math.abs(dx) + Math.abs(dy) > 3) sudrash.yurdi = true;
        holat.az = sudrash.az + dx * 0.0072;
        holat.bal = Math.max(0.10, Math.min(1.30, sudrash.bal + dy * 0.0055));
        yangila();
        return;
      }
      const m = nuqtadagi(e.offsetX, e.offsetY);
      const yangi = m && m.xona ? m.xona : null;
      if (yangi !== holat.ustida) {
        holat.ustida = yangi;
        kanvas.style.cursor = yangi ? "pointer" : "grab";
        yangila();
      }
    });
    kanvas.addEventListener("pointerup", e => {
      const edi = sudrash;
      sudrash = null;
      if (edi && !edi.yurdi) {
        const m = nuqtadagi(e.offsetX, e.offsetY);
        if (m && m.xona) {
          holat.tanlangan = m.xona;
          const x = MKBbino.xonaTop(model, m.xona);
          if (x && opt.tanlanganda) opt.tanlanganda(x);
          yangila();
        } else if (m && m.kn && opt.kirishNuqtaBosilganda) {
          opt.kirishNuqtaBosilganda(m.kn);
        }
      }
    });
    kanvas.addEventListener("pointercancel", () => { sudrash = null; });
    kanvas.addEventListener("pointerleave", () => {
      sudrash = null;
      if (holat.ustida){ holat.ustida = null; yangila(); }
    });
    kanvas.addEventListener("wheel", e => {
      e.preventDefault();
      const eng = Math.max(g.en, g.chuq);
      holat.masofa = Math.max(eng * 0.75, Math.min(eng * 4.2 + 40, holat.masofa * (1 + e.deltaY * 0.0011)));
      yangila();
    }, {passive: false});
    kanvas.addEventListener("dblclick", () => {
      holat.az = -0.86; holat.bal = 0.52;
      holat.masofa = Math.max(g.en, g.chuq) * 1.65 + 22;
      yangila();
    });
    kanvas.tabIndex = 0;
    kanvas.addEventListener("keydown", e => {
      const q = {ArrowLeft: () => holat.az -= 0.09, ArrowRight: () => holat.az += 0.09,
                 ArrowUp: () => holat.bal = Math.min(1.30, holat.bal + 0.06),
                 ArrowDown: () => holat.bal = Math.max(0.10, holat.bal - 0.06)}[e.key];
      if (q) { e.preventDefault(); q(); yangila(); return; }
      /* Tab/Enter bilan xonalarni ketma-ket ko'rib chiqish */
      if (e.key === "Enter" || e.key === " " || e.key === "n" || e.key === "N") {
        e.preventDefault();
        const qav = model.qavatlar.find(x => x.raqam === holat.qavat);
        if (!qav || !qav.xonalar.length) return;
        const i = qav.xonalar.findIndex(x => x.id === holat.tanlangan);
        const keyingi = qav.xonalar[(i + 1) % qav.xonalar.length];
        holat.tanlangan = keyingi.id;
        if (opt.tanlanganda) opt.tanlanganda(keyingi);
        yangila();
      }
    });
    kanvas.style.cursor = "grab";

    if (global.ResizeObserver) {
      new global.ResizeObserver(() => { olcham(); yangila(); }).observe(el);
    } else {
      global.addEventListener("resize", () => { olcham(); yangila(); });
    }
    olcham();
    yangila();

    return {
      holat: holat,
      qavatTanla: function (r) {
        holat.qavat = r; holat.tanlangan = null;
        if (holat.rejim === "ichki") kameraMoslash();
        qayta();
      },
      xonaTanla: function (id) { holat.tanlangan = id; yangila(); },
      rejimQoy: function (r) { holat.rejim = r; kameraMoslash(); qayta(); },
      boshlangich: function () {
        holat.az = -0.86; holat.bal = holat.rejim === "ichki" ? 0.78 : 0.52;
        kameraMoslash();
        yangila();
      },
      yangila: yangila,
    };
  }

  global.MKBnav3d = {yarat: yarat, PALITRA: PALITRA, XONA_RANG: XONA_RANG};
})(window);
