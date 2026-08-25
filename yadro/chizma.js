/* ============================================================
   chizma.js — SVG grafik dvijoki (kutubxonasiz, token-ranglar)
   maydon()  — silliq egri chiziqli area-grafik, gradient, tooltip
   ustun()   — yumaloq ustunlar, gridlines, tooltip
   halqaDiag() — donut, markazda jami, segment hover
   uchqun()  — mini-sparkline (stat-kartalar uchun)
   ============================================================ */
window.MKBchizma = (function(){

  function el(nom, attr, ich){
    const e = document.createElementNS("http://www.w3.org/2000/svg", nom);
    for (const k in attr) e.setAttribute(k, attr[k]);
    if (ich != null) e.textContent = ich;
    return e;
  }
  function rang(nomi){ /* CSS token -> haqiqiy qiymat */
    return getComputedStyle(document.documentElement).getPropertyValue(nomi).trim() || nomi;
  }
  let idSanoq = 0;

  /* Catmull-Rom -> silliq kubik Bezier yo'li */
  function silliqYol(n){
    if (n.length < 2) return "";
    let d = "M" + n[0][0].toFixed(1) + "," + n[0][1].toFixed(1);
    for (let i = 0; i < n.length - 1; i++){
      const p0 = n[Math.max(0, i - 1)], p1 = n[i], p2 = n[i + 1], p3 = n[Math.min(n.length - 1, i + 2)];
      const c1x = p1[0] + (p2[0] - p0[0]) / 6, c1y = p1[1] + (p2[1] - p0[1]) / 6;
      const c2x = p2[0] - (p3[0] - p1[0]) / 6, c2y = p2[1] - (p3[1] - p1[1]) / 6;
      d += "C" + c1x.toFixed(1) + "," + c1y.toFixed(1) + " " +
           c2x.toFixed(1) + "," + c2y.toFixed(1) + " " +
           p2[0].toFixed(1) + "," + p2[1].toFixed(1);
    }
    return d;
  }

  function tooltipYarat(orin){
    let t = orin.querySelector(".chizma-tooltip");
    if (t) return t;
    t = document.createElement("div");
    t.className = "chizma-tooltip";
    t.setAttribute("hidden", "");
    orin.appendChild(t);
    return t;
  }

  /* ---------- AREA (silliq egri) ---------- */
  function maydon(orin, cfg){
    orin = typeof orin === "string" ? document.getElementById(orin) : orin;
    if (!orin) return;
    const chiz = () => {
      orin.innerHTML = "";
      const W = Math.max(orin.clientWidth, 280);
      const H = cfg.balandlik || 190;
      const P = {t: 14, r: 10, b: 26, l: cfg.oqlSiz ? 8 : 42};
      const q = cfg.qiymatlar, y = cfg.yorliqlar;
      const maks = (cfg.maks || Math.max(...q) * 1.15), min = cfg.min != null ? cfg.min : Math.min(...q) * 0.82;
      const X = i => P.l + (W - P.l - P.r) * (q.length === 1 ? 0.5 : i / (q.length - 1));
      const Y = v => P.t + (H - P.t - P.b) * (1 - (v - min) / (maks - min));
      const nuqtalar = q.map((v, i) => [X(i), Y(v)]);
      const asosiy = rang(cfg.rang || "--siyoh");
      const toldirish = rang(cfg.fonRang || cfg.rang || "--mint");
      const gid = "cg" + (++idSanoq);

      const svg = el("svg", {width: "100%", height: H, viewBox: "0 0 " + W + " " + H, "aria-hidden": "true"});
      const defs = el("defs", {});
      const gr = el("linearGradient", {id: gid, x1: 0, y1: 0, x2: 0, y2: 1});
      gr.appendChild(el("stop", {offset: "0%", "stop-color": toldirish, "stop-opacity": ".85"}));
      gr.appendChild(el("stop", {offset: "100%", "stop-color": toldirish, "stop-opacity": "0"}));
      defs.appendChild(gr);
      svg.appendChild(defs);

      /* gorizontal grid + o'q raqamlari */
      for (let g = 0; g <= 3; g++){
        const gy = P.t + (H - P.t - P.b) * g / 3;
        svg.appendChild(el("line", {x1: P.l, x2: W - P.r, y1: gy, y2: gy,
          stroke: rang("--chiziq-2"), "stroke-width": 1}));
        if (!cfg.oqlSiz){
          const v = maks - (maks - min) * g / 3;
          svg.appendChild(el("text", {x: P.l - 8, y: gy + 3.5, "text-anchor": "end",
            "font-size": 10, "font-family": "JetBrains Mono, monospace",
            fill: rang("--iz")}, cfg.oqFormat ? cfg.oqFormat(v) : Math.round(v)));
        }
      }
      /* area + chiziq */
      const yol = silliqYol(nuqtalar);
      svg.appendChild(el("path", {d: yol +
        "L" + nuqtalar[nuqtalar.length - 1][0] + "," + (H - P.b) +
        "L" + nuqtalar[0][0] + "," + (H - P.b) + "Z", fill: "url(#" + gid + ")"}));
      svg.appendChild(el("path", {d: yol, fill: "none", stroke: asosiy,
        "stroke-width": 2.5, "stroke-linecap": "round"}));
      /* oxirgi nuqta — pulsli belgi */
      const ox = nuqtalar[nuqtalar.length - 1];
      svg.appendChild(el("circle", {cx: ox[0], cy: ox[1], r: 7, fill: asosiy, opacity: .18}));
      svg.appendChild(el("circle", {cx: ox[0], cy: ox[1], r: 3.5, fill: asosiy,
        stroke: rang("--varaq"), "stroke-width": 2}));
      /* x yorliqlar */
      (y || []).forEach((t, i) => {
        if (y.length > 9 && i % 2) return;
        svg.appendChild(el("text", {x: X(i), y: H - 8, "text-anchor": "middle",
          "font-size": 10.5, fill: rang("--iz")}, t));
      });
      /* hover: eng yaqin nuqta */
      const belgi = el("g", {opacity: 0});
      const bl = el("line", {y1: P.t, y2: H - P.b, stroke: rang("--chiziq-3"), "stroke-width": 1, "stroke-dasharray": "3 3"});
      const bd = el("circle", {r: 4.5, fill: asosiy, stroke: rang("--varaq"), "stroke-width": 2});
      belgi.appendChild(bl); belgi.appendChild(bd);
      svg.appendChild(belgi);
      orin.style.position = "relative";
      const tt = tooltipYarat(orin);
      svg.addEventListener("pointermove", e => {
        const r = svg.getBoundingClientRect();
        const mx = (e.clientX - r.left) * (W / r.width);
        let eng = 0;
        nuqtalar.forEach((n, i) => { if (Math.abs(n[0] - mx) < Math.abs(nuqtalar[eng][0] - mx)) eng = i; });
        const [nx, ny] = nuqtalar[eng];
        belgi.setAttribute("opacity", 1);
        bl.setAttribute("x1", nx); bl.setAttribute("x2", nx);
        bd.setAttribute("cx", nx); bd.setAttribute("cy", ny);
        tt.removeAttribute("hidden");
        tt.innerHTML = "<b>" + (cfg.tooltipFormat ? cfg.tooltipFormat(q[eng]) : q[eng]) + "</b>" +
          (y && y[eng] ? '<span>' + y[eng] + "</span>" : "");
        tt.style.left = (nx / W * 100) + "%";
        tt.style.top = (ny / H * 100) + "%";
      });
      svg.addEventListener("pointerleave", () => { belgi.setAttribute("opacity", 0); tt.setAttribute("hidden", ""); });
      orin.appendChild(svg);
    };
    chiz();
    new ResizeObserver(() => chiz()).observe(orin);
  }

  /* ---------- USTUNLAR ---------- */
  function ustun(orin, cfg){
    orin = typeof orin === "string" ? document.getElementById(orin) : orin;
    if (!orin) return;
    const chiz = () => {
      orin.innerHTML = "";
      const W = Math.max(orin.clientWidth, 280);
      const H = cfg.balandlik || 190;
      const P = {t: 14, r: 6, b: 26, l: cfg.oqlSiz ? 6 : 40};
      const q = cfg.qiymatlar, y = cfg.yorliqlar;
      const maks = cfg.maks || Math.max(...q) * 1.12;
      const joy = (W - P.l - P.r) / q.length;
      const en = Math.min(cfg.en || 30, joy * 0.62);
      const asosiy = rang(cfg.rang || "--siyoh");
      const urgu = rang(cfg.urguRang || "--mint-matn");
      const svg = el("svg", {width: "100%", height: H, viewBox: "0 0 " + W + " " + H, "aria-hidden": "true"});
      for (let g = 0; g <= 3; g++){
        const gy = P.t + (H - P.t - P.b) * g / 3;
        svg.appendChild(el("line", {x1: P.l, x2: W - P.r, y1: gy, y2: gy, stroke: rang("--chiziq-2")}));
        if (!cfg.oqlSiz){
          const v = maks * (1 - g / 3);
          svg.appendChild(el("text", {x: P.l - 8, y: gy + 3.5, "text-anchor": "end",
            "font-size": 10, "font-family": "JetBrains Mono, monospace", fill: rang("--iz")},
            cfg.oqFormat ? cfg.oqFormat(v) : Math.round(v)));
        }
      }
      orin.style.position = "relative";
      const tt = tooltipYarat(orin);
      q.forEach((v, i) => {
        const h = Math.max(4, (H - P.t - P.b) * v / maks);
        const x = P.l + joy * i + (joy - en) / 2;
        const yy = H - P.b - h;
        const faol = cfg.urgu != null ? i === cfg.urgu : i === q.length - 1;
        const r = el("rect", {x, y: yy, width: en, height: h, rx: Math.min(7, en / 2.4),
          fill: faol ? urgu : asosiy, opacity: faol ? 1 : .82, style: "transition:opacity .14s"});
        r.addEventListener("pointerenter", () => {
          r.setAttribute("opacity", 1);
          tt.removeAttribute("hidden");
          tt.innerHTML = "<b>" + (cfg.tooltipFormat ? cfg.tooltipFormat(v) : v) + "</b>" +
            (y && y[i] ? "<span>" + y[i] + "</span>" : "");
          tt.style.left = ((x + en / 2) / W * 100) + "%";
          tt.style.top = (yy / H * 100) + "%";
        });
        r.addEventListener("pointerleave", () => { r.setAttribute("opacity", faol ? 1 : .82); tt.setAttribute("hidden", ""); });
        svg.appendChild(r);
        if (y && y[i] != null && !(y.length > 9 && i % 2))
          svg.appendChild(el("text", {x: P.l + joy * i + joy / 2, y: H - 8,
            "text-anchor": "middle", "font-size": 10.5, fill: rang("--iz")}, y[i]));
      });
      orin.appendChild(svg);
    };
    chiz();
    new ResizeObserver(() => chiz()).observe(orin);
  }

  /* ---------- DONUT ---------- */
  function halqaDiag(orin, cfg){
    orin = typeof orin === "string" ? document.getElementById(orin) : orin;
    if (!orin) return;
    const O = cfg.olcham || 172, T = cfg.qalinlik || 17;
    const R = (O - T) / 2, C = 2 * Math.PI * R;
    const jami = cfg.segmentlar.reduce((a, s) => a + s.qiymat, 0);
    const svg = el("svg", {width: O, height: O, viewBox: "0 0 " + O + " " + O,
      style: "transform:rotate(-90deg)", "aria-hidden": "true"});
    let siljish = 0;
    orin.style.position = "relative";
    const tt = tooltipYarat(orin);
    cfg.segmentlar.forEach(s => {
      const ul = s.qiymat / jami;
      const seg = el("circle", {cx: O / 2, cy: O / 2, r: R, fill: "none",
        stroke: s.rang, "stroke-width": T, "stroke-linecap": "butt",
        "stroke-dasharray": (ul * C - 2.5) + " " + (C - ul * C + 2.5),
        "stroke-dashoffset": -siljish * C, style: "transition:stroke-width .15s"});
      seg.addEventListener("pointerenter", () => {
        seg.setAttribute("stroke-width", T + 5);
        tt.removeAttribute("hidden");
        tt.innerHTML = "<b>" + s.qiymat + (cfg.birlik || "") + "</b><span>" + s.nom + " · " + Math.round(ul * 100) + "%</span>";
        tt.style.left = "50%"; tt.style.top = "8%";
      });
      seg.addEventListener("pointerleave", () => { seg.setAttribute("stroke-width", T); tt.setAttribute("hidden", ""); });
      svg.appendChild(seg);
      siljish += ul;
    });
    orin.innerHTML = "";
    orin.appendChild(svg);
    const markaz = document.createElement("div");
    markaz.className = "chizma-donut-markaz";
    markaz.innerHTML = "<b>" + (cfg.markaz != null ? cfg.markaz : jami) + "</b><span>" + (cfg.markazIzoh || "") + "</span>";
    orin.appendChild(markaz);
  }

  /* ---------- SPARKLINE ---------- */
  function uchqun(orin, qiymatlar, rangNomi){
    orin = typeof orin === "string" ? document.getElementById(orin) : orin;
    if (!orin) return;
    const W = 96, H = 34, P = 3;
    const maks = Math.max(...qiymatlar), min = Math.min(...qiymatlar);
    const X = i => P + (W - P * 2) * i / (qiymatlar.length - 1);
    const Y = v => P + (H - P * 2) * (1 - (v - min) / ((maks - min) || 1));
    const n = qiymatlar.map((v, i) => [X(i), Y(v)]);
    const asosiy = rang(rangNomi || "--siyoh");
    const gid = "cu" + (++idSanoq);
    const svg = el("svg", {width: W, height: H, viewBox: "0 0 " + W + " " + H, "aria-hidden": "true"});
    const defs = el("defs", {});
    const gr = el("linearGradient", {id: gid, x1: 0, y1: 0, x2: 0, y2: 1});
    gr.appendChild(el("stop", {offset: "0%", "stop-color": rang("--mint"), "stop-opacity": ".9"}));
    gr.appendChild(el("stop", {offset: "100%", "stop-color": rang("--mint"), "stop-opacity": "0"}));
    defs.appendChild(gr); svg.appendChild(defs);
    const yol = silliqYol(n);
    svg.appendChild(el("path", {d: yol + "L" + n[n.length - 1][0] + "," + (H - 1) + "L" + n[0][0] + "," + (H - 1) + "Z",
      fill: "url(#" + gid + ")"}));
    svg.appendChild(el("path", {d: yol, fill: "none", stroke: asosiy, "stroke-width": 2, "stroke-linecap": "round"}));
    const ox = n[n.length - 1];
    svg.appendChild(el("circle", {cx: ox[0], cy: ox[1], r: 2.6, fill: asosiy}));
    orin.innerHTML = "";
    orin.appendChild(svg);
  }

  return {maydon, ustun, halqaDiag, uchqun};
})();
