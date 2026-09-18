/* ============================================================
   obyekt-rasm.js — balansdagi obyektning izometrik chizmasi.

   Reyestrdagi o'n ikki tur uchun protsedural SVG: ma'muriy bino, sex,
   do'kon, uy, ombor, ferma, issiqxona, ko'p qavatli uy, asbob-uskuna,
   avtotransport, yuk mashinasi, maxsus texnika.

   Yuzalar O'zbekiston qurilishida haqiqatan uchraydigan materiallardan
   olingan: ohaklangan suvoq, silikat va qizil g'isht, ko'k profnastil,
   shifer, yashil metall darvoza, alyumin vitrina.

   Chizma obyekt urug'idan hosil bo'ladi — bitta obyekt har doim bir xil
   ko'rinadi, ammo qo'shnisiga o'xshamaydi.

   Node ostida ham, brauzerda ham ishlaydi.
   ============================================================ */
(function (global) {
  "use strict";

  var C = Math.cos(Math.PI / 6), S = Math.sin(Math.PI / 6);

  /* Har bir material uchun uch yuz: [ust, chap, o'ng] — yorug'lik yuqori chapdan. */
  var M = {
    suvoq:     ["#F5F1E9", "#E8E2D6", "#D3CBBC"],
    gisht:     ["#DCC1A8", "#CAA98E", "#AF8B70"],
    silikat:   ["#EBE9E2", "#DBD9D0", "#C2C0B6"],
    panel:     ["#E8E5DD", "#D7D4CB", "#BDBAB0"],
    kokTom:    ["#8CA8BA", "#7792A1", "#5F7888"],
    yashilTom: ["#7C9674", "#6A8263", "#546A4F"],
    qizilTom:  ["#B9705E", "#A26052", "#875044"],
    shifer:    ["#C8CBC5", "#B6B9B3", "#9C9F99"],
    darvoza:   ["#55815B", "#476B4C", "#38573D"],
    metall:    ["#CFD3CF", "#BCC0BC", "#A1A5A1"],
    qoraMetall:["#7E8580", "#6D746F", "#5A605C"],
    oyna:      ["#B8CBD2", "#A5BAC3", "#8DA3AD"],
    tunOyna:   ["#70848C", "#60737C", "#4E5E66"],
    beton:     ["#DFDCD4", "#CDCAC2", "#B3B0A8"],
    tsokol:    ["#B5AFA2", "#A69F93", "#8C867B"],
    ruberoid:  ["#A9A7A0", "#9B9992", "#85837E"],
    asfalt:    ["#C7C4BD", "#B6B3AC", "#9D9A93"],
    barg:      ["#7A8A6C", "#69795D", "#55634B"],
    yaproq:    ["#708062", "#5F6E53", "#4C5943"],
    tana:      ["#BAAF9C", "#A89D8B", "#8D8373"],
    sariq:     ["#DAAA4F", "#C49742", "#A57E35"],
    qizil:     ["#B55949", "#9F4E40", "#864034"],
    kok:       ["#5F7E93", "#526D80", "#42586A"],
    oq:        ["#FBF9F5", "#EEEBE4", "#DBD7CE"],
    kumush:    ["#E2E4E1", "#D2D4D1", "#B7B9B6"],
    yer:       ["#EEEAE0", "#E2DED3", "#D0CCC1"],
    mkb:       ["#2E8B57", "#26764A", "#1E603C"]
  };

  function soya(hex, k) {
    var n = parseInt(hex.slice(1, 7), 16);
    var f = function (v) { return Math.max(0, Math.min(255, Math.round(v + 255 * k))); };
    return "#" + [f(n >> 16), f((n >> 8) & 255), f(n & 255)]
      .map(function (v) { return v.toString(16).length < 2 ? "0" + v.toString(16) : v.toString(16); }).join("");
  }

  function tasodif(urug) {
    var a = (urug >>> 0) || 1;
    return function () {
      a = (a + 0x6D2B79F5) >>> 0;
      var t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  /* ---------------------------------------------------------------- Sahna */
  function Sahna() {
    var sh = [], ishl = {};
    function bez(mat, yuz) {
      var k = mat + yuz;
      ishl[k] = M[mat][yuz];
      return k;
    }
    var A = {
      sh: sh,
      ishl: ishl,

      /* Ixtiyoriy ko'pburchak yuzasi */
      yuz: function (pts, mat, yuz, o) {
        o = o || {};
        sh.push({ pts: pts, kalit: bez(mat, yuz), asos: M[mat][yuz], sw: o.sw, op: o.op, yopiq: true });
      },
      chiziq: function (pts, o) {
        o = o || {};
        sh.push({ pts: pts, stroke: o.stroke || "#6F6A60", sw: o.sw == null ? 0.6 : o.sw, op: o.op == null ? 0.35 : o.op, dash: o.dash });
      },

      /* To'g'ri burchakli prizma. Ko'rinadigan yuzlar: chap (y=y1), o'ng (x=x1), ust. */
      quti: function (x, y, z, w, d, h, mat, o) {
        o = o || {};
        var x1 = x + w, y1 = y + d, z1 = z + h;
        if (!o.chapsiz) A.yuz([[x, y1, z], [x1, y1, z], [x1, y1, z1], [x, y1, z1]], o.chapMat || mat, 1, o);
        if (!o.ongsiz) A.yuz([[x1, y1, z], [x1, y, z], [x1, y, z1], [x1, y1, z1]], o.ongMat || mat, 2, o);
        if (!o.ustsiz) A.yuz([[x, y, z1], [x1, y, z1], [x1, y1, z1], [x, y1, z1]], o.ustMat || mat, 0, o);
      },

      /* Ikki nishabli tom. oq="x" — tizma x o'qi bo'ylab. */
      tom: function (x, y, z, w, d, rh, mat, oq) {
        var x1 = x + w, y1 = y + d;
        if (oq === "x") {
          var ym = y + d / 2;
          A.yuz([[x, y1, z], [x1, y1, z], [x1, ym, z + rh], [x, ym, z + rh]], mat, 1);
          A.yuz([[x1, y1, z], [x1, ym, z + rh], [x1, y, z]], mat, 2);
          A.yuz([[x, y1, z], [x, y1, z - 0.22], [x1, y1, z - 0.22], [x1, y1, z]], mat, 2);
          for (var i = 1; i < d / 2 / 0.55; i++) {
            var yy = y1 - i * 0.55;
            A.chiziq([[x, yy, z + (y1 - yy) * rh / (d / 2)], [x1, yy, z + (y1 - yy) * rh / (d / 2)]], { op: 0.16, sw: 0.5 });
          }
          A.quti(x - 0.05, ym - 0.16, z + rh - 0.06, w + 0.1, 0.32, 0.14, mat, { ustMat: "beton" });   /* tizma qopqog'i */
        } else {
          var xm = x + w / 2;
          A.yuz([[x1, y, z], [x1, y1, z], [xm, y1, z + rh], [xm, y, z + rh]], mat, 2);
          A.yuz([[x, y1, z], [xm, y1, z + rh], [x1, y1, z]], mat, 1);
          A.yuz([[x1, y, z], [x1, y1, z], [x1, y1, z - 0.22], [x1, y, z - 0.22]], mat, 2);
        }
      },

      /* Yassi tom: gzyms, ruberoid qoplama, parapet. Ma'muriy va ko'p qavatli binolarda. */
      tekisTom: function (x, y, z, w, d, mat) {
        var tp = 0.32, hp = 0.62, kh = 0.19, x1 = x + w, y1 = y + d;
        A.quti(x - 0.22, y - 0.22, z, w + 0.44, d + 0.44, kh, "beton", { ustsiz: true });
        A.yuz([[x, y + tp, z + kh], [x1, y + tp, z + kh], [x1, y + tp, z + kh + hp], [x, y + tp, z + kh + hp]], mat, 1);
        A.yuz([[x + tp, y1, z + kh], [x + tp, y, z + kh], [x + tp, y, z + kh + hp], [x + tp, y1, z + kh + hp]], mat, 2);
        A.yuz([[x + tp, y + tp, z + kh], [x1 - tp, y + tp, z + kh], [x1 - tp, y1 - tp, z + kh], [x + tp, y1 - tp, z + kh]], "ruberoid", 0);
        A.quti(x, y1 - tp, z + kh, w, tp, hp, mat, { ustMat: "beton" });
        A.quti(x1 - tp, y, z + kh, tp, d - tp, hp, mat, { ustMat: "beton" });
      },

      /* Sokol — devorning quyi qismidagi to'q rangli tosh belbog' */
      sokol: function (x, y, w, d, h) {
        A.chapda(x, y + d, 0, 0, 0, w, h, "tsokol", 1);
        A.ongda(x + w, y + d, 0, 0, 0, d, h, "tsokol", 2);
        A.chiziq([[x, y + d, h], [x + w, y + d, h]], { op: 0.22, sw: 0.7 });
        A.chiziq([[x + w, y + d, h], [x + w, y, h]], { op: 0.22, sw: 0.7 });
      },

      /* Yassi maydon — asfalt yoki beton qoplama */
      maydon: function (x, y, w, d, mat) {
        A.yuz([[x, y, 0.02], [x + w, y, 0.02], [x + w, y + d, 0.02], [x, y + d, 0.02]], mat || "asfalt", 0, { sw: 0.5 });
      },

      /* Bir nishabli tom (sex, ombor uchun) */
      nishab: function (x, y, z, w, d, rh, mat) {
        var x1 = x + w, y1 = y + d;
        A.yuz([[x, y, z + rh], [x1, y, z + rh], [x1, y1, z], [x, y1, z]], mat, 0);
        A.yuz([[x1, y, z + rh], [x1, y1, z], [x1, y1, z - 0.2], [x1, y, z + rh - 0.2]], mat, 2);
        A.yuz([[x, y1, z], [x1, y1, z], [x1, y1, z - 0.2], [x, y1, z - 0.2]], mat, 1);
        for (var i = 1; i * 0.6 < w; i++) A.chiziq([[x + i * 0.6, y, z + rh], [x + i * 0.6, y1, z]], { op: 0.14, sw: 0.5 });
      },

      /* Chap yuzdagi (y=y1) to'rtburchak: u — x bo'ylab, v — balandlik */
      chapda: function (x, y1, z, u, v, w, h, mat, yuz) {
        A.yuz([[x + u, y1, z + v], [x + u + w, y1, z + v], [x + u + w, y1, z + v + h], [x + u, y1, z + v + h]], mat, yuz == null ? 1 : yuz);
      },
      /* O'ng yuzdagi (x=x1) to'rtburchak: u — y1 dan kamayib boradi */
      ongda: function (x1, y1, z, u, v, w, h, mat, yuz) {
        A.yuz([[x1, y1 - u, z + v], [x1, y1 - u - w, z + v], [x1, y1 - u - w, z + v + h], [x1, y1 - u, z + v + h]], mat, yuz == null ? 2 : yuz);
      },

      /* Silindr: oq — 'x' | 'y' | 'z' */
      silindr: function (p, rad, uz, oq, mat) {
        var n = 18, i, t, yon = [], qopqoq = [];
        var nuq = function (t, l) {
          if (oq === "z") return [p[0] + rad * Math.cos(t), p[1] + rad * Math.sin(t), p[2] + l];
          if (oq === "x") return [p[0] + l, p[1] + rad * Math.cos(t), p[2] + rad * Math.sin(t)];
          return [p[0] + rad * Math.cos(t), p[1] + l, p[2] + rad * Math.sin(t)];
        };
        for (i = 0; i <= n; i++) qopqoq.push(nuq(i / n * Math.PI * 2, uz));
        var a0 = -Math.PI / 4, a1 = Math.PI * 0.75;
        if (oq !== "z") { a0 = -Math.PI / 4; a1 = Math.PI * 0.75; }
        for (i = 0; i <= 11; i++) { t = a0 + (a1 - a0) * i / 11; yon.push(nuq(t, 0)); }
        for (i = 11; i >= 0; i--) { t = a0 + (a1 - a0) * i / 11; yon.push(nuq(t, uz)); }
        A.yuz(yon, mat, 1);
        A.yuz(qopqoq, mat, 0);
      }
    };
    return A;
  }

  /* ------------------------------------------------------------ Tafsilot */

  /* Bir qator deraza: chap yoki o'ng yuzda */
  function derazalar(s, tomon, x, y1, z, uzunlik, qavat, balandlik, mat) {
    var soni = Math.max(2, Math.round(uzunlik / 3.1)), qad = uzunlik / soni, q, i;
    for (q = 0; q < qavat; q++) {
      for (i = 0; i < soni; i++) {
        var u = i * qad + qad * 0.28, v = z + q * balandlik + balandlik * 0.34;
        var w = qad * 0.44, h = balandlik * 0.40;
        if (tomon === "chap") {
          s.chapda(x, y1, 0, u, v, w, h, mat || "oyna", 1);
          s.chapda(x, y1, 0, u - 0.09, v - 0.09, w + 0.18, 0.09, "oq", 1);
        } else {
          s.ongda(x, y1, 0, u, v, w, h, mat || "oyna", 2);
          s.ongda(x, y1, 0, u - 0.09, v - 0.09, w + 0.18, 0.09, "oq", 2);
        }
      }
    }
  }

  /* Terak — bo'yi baland, ingichka; tanasining pasti oqlangan.
     Ikkita kesishgan siluet: izometriyada hajmli ko'rinadi, vazni yengil. */
  function terak(s, x, y, h) {
    var i, t, rr, n = 9, R = h * 0.108, z0 = h * 0.26, ch = h - z0;
    var egri = function (u) { return R * Math.pow(Math.sin(Math.PI * (0.05 + u * 0.95)), 0.6); };
    s.quti(x - 0.11, y - 0.11, 0, 0.22, 0.22, z0 * 0.66, "oq");
    s.quti(x - 0.10, y - 0.10, z0 * 0.66, 0.20, 0.20, z0 * 0.40, "tana");
    var a = [], b = [];
    for (i = 0; i <= n; i++) { t = i / n; rr = egri(t); a.push([x - rr, y, z0 + t * ch]); b.push([x, y - rr, z0 + t * ch]); }
    for (i = n; i >= 0; i--) { t = i / n; rr = egri(t); a.push([x + rr, y, z0 + t * ch]); b.push([x, y + rr, z0 + t * ch]); }
    s.yuz(b, "barg", 2);
    s.yuz(a, "yaproq", 1);
  }

  /* Uzum so'risi — hovlida yog'och ustunlar ustidagi tok soyabon */
  function sori(s, x, y, w, d) {
    var i, j;
    for (i = 0; i <= 1; i++) for (j = 0; j <= 1; j++) s.silindr([x + i * w, y + j * d, 0], 0.09, 2.35, "z", "tana");
    for (i = 0; i <= 3; i++) s.chiziq([[x - 0.25, y + d * i / 3, 2.4], [x + w + 0.25, y + d * i / 3, 2.4]], { sw: 0.8, op: 0.4, stroke: "#8D8272" });
    s.yuz([[x - 0.25, y - 0.25, 2.48], [x + w + 0.25, y - 0.25, 2.48], [x + w + 0.25, y + d + 0.25, 2.48], [x - 0.25, y + d + 0.25, 2.48]], "yaproq", 0, { op: 0.92 });
    for (i = 1; i < 4; i++) s.chiziq([[x - 0.25 + (w + 0.5) * i / 4, y - 0.25, 2.49], [x - 0.25 + (w + 0.5) * i / 4, y + d + 0.25, 2.49]], { sw: 0.7, op: 0.22, stroke: "#3E4A38" });
  }

  /* Hovli devori va yashil metall darvoza */
  function devor(s, x, y, w, d, h, darvozaX) {
    s.quti(x, y + d - 0.22, 0, w, 0.22, h, "suvoq");
    s.quti(x + w - 0.22, y, 0, 0.22, d, h, "suvoq");
    if (darvozaX != null) {
      s.chapda(x, y + d, 0, darvozaX, 0, 3.2, h * 0.86, "darvoza", 1);
      s.chapda(x, y + d, 0, darvozaX + 1.58, 0, 0.05, h * 0.86, "qoraMetall", 1);
      s.chapda(x, y + d, 0, darvozaX - 0.12, h * 0.86, 3.44, 0.14, "qoraMetall", 1);
    }
  }

  /* Konditsioner bloki fasadda */
  function konditsioner(s, tomon, x, y1, u, v) {
    if (tomon === "chap") s.chapda(x, y1, 0, u, v, 0.8, 0.5, "oq", 1);
    else s.ongda(x, y1, 0, u, v, 0.8, 0.5, "oq", 2);
  }

  /* Zina va kirish soyaboni */
  function zina(s, x, y, w, n) {
    for (var i = 0; i < n; i++) s.quti(x, y + i * 0.34, 0, w, 0.34 * (n - i), 0.17 * (n - i), "beton");
  }

  /* Nazorat ustuni: kamera va quyosh paneli */
  function ustun(s, x, y, h, quyoshli) {
    s.silindr([x, y, 0], 0.13, h, "z", "metall");
    s.quti(x - 0.28, y - 0.2, h - 0.5, 0.75, 0.4, 0.4, "oq");
    s.yuz([[x + 0.47, y + 0.2, h - 0.34], [x + 1.05, y + 0.2, h - 0.5], [x + 1.05, y - 0.2, h - 0.5], [x + 0.47, y - 0.2, h - 0.34]], "qoraMetall", 0);
    if (quyoshli) {
      s.yuz([[x - 1.5, y - 0.1, h + 0.05], [x + 0.2, y - 0.1, h + 0.62], [x + 0.2, y + 1.5, h + 0.62], [x - 1.5, y + 1.5, h + 0.05]], "kok", 0);
    }
  }

  /* G'ildirak */
  function gildirak(s, x, y, z, rad, en) {
    s.silindr([x, y, z], rad, en, "y", "qoraMetall");
    s.silindr([x, y + en * 0.02, z], rad * 0.46, en * 0.96, "y", "metall");
  }

  /* ------------------------------------------------------------- Modellar */
  var MODEL = {

    /* Ma'muriy bino — reyestrdagi eng ko'p uchraydigan tur (62 ta) */
    mamuriy: function (s, r) {
      var w = 15 + r() * 6, d = 9.5, qavat = 2 + Math.round(r()), h = qavat * 3.4;
      var mat = r() < 0.55 ? "suvoq" : "silikat";
      terak(s, -2.4, -1.4, 9.5);                               /* orqa hovlidagi terak */
      s.maydon(-3, d + 0.5, w + 8, 3.4);
      s.quti(0, 0, 0, w, d, h, mat);
      s.tekisTom(0, 0, h, w, d, mat);
      derazalar(s, "chap", 0, d, 0, w, qavat, 3.4);
      derazalar(s, "ong", w, d, 0, d, qavat, 3.4);
      s.sokol(0, 0, w, d, 0.9);
      konditsioner(s, "chap", 0, d, w * 0.70, 4.1);
      konditsioner(s, "chap", 0, d, w * 0.78, 7.5);
      konditsioner(s, "ong", w, d, d * 0.45, 4.1);
      /* kirish tamburi — old tomonga chiqarilgan shishali qism */
      var kx = w * 0.30, kw = 4.8;
      s.quti(kx, d, 0, kw, 1.6, 3.9, mat, { ustMat: "beton" });
      s.chapda(kx, d + 1.6, 0, 0.4, 0.75, kw - 0.8, 2.5, "tunOyna", 1);
      s.chapda(kx, d + 1.6, 0, kw / 2 - 0.55, 0.75, 1.1, 2.5, "metall", 1);
      s.chapda(kx, d + 1.6, 0, 0.5, 3.35, kw - 1, 0.42, "mkb", 1);       /* peshtaxta yozuvi */
      s.ongda(kx + kw, d + 1.6, 0, 0.35, 0.75, 0.85, 2.5, "tunOyna", 2);
      zina(s, kx + kw * 0.26, d + 1.6, kw * 0.48, 3);
      terak(s, w + 2.8, d * 0.2, 9);
      terak(s, w + 2.6, d * 0.85, 7.4);
      ustun(s, -2, d + 2.2, 5.4);
      return [w + 4.5, d + 4];
    },

    /* Ko'p qavatli uydagi xonadon — yig'ma panel uy */
    kopqavat: function (s, r) {
      var w = 20 + r() * 6, d = 11, qavat = 4 + Math.round(r() * 5), h = qavat * 2.9;
      var bMat = r() < 0.5 ? "gisht" : "silikat";
      terak(s, -2.6, -1.8, 12);
      s.maydon(-3, d + 0.6, w + 8, 3.6);
      s.quti(0, 0, 0, w, d, h, "panel");
      s.tekisTom(0, 0, h, w, d, "panel");
      for (var q = 1; q < qavat; q++) s.chiziq([[0, d, q * 2.9], [w, d, q * 2.9]], { op: 0.26, sw: 0.5 });
      for (var x = 3.4; x < w - 0.5; x += 3.4) s.chiziq([[x, d, 0], [x, d, h]], { op: 0.2, sw: 0.5 });
      /* balkonlar: g'ishtlab, shishalab olingan — O'zbekiston uylarida odatiy */
      var b1 = w * 0.09, b2 = w * 0.30, b3 = w * 0.66, b4 = w * 0.87;
      derazalar(s, "chap", b2, d, 0, b3 - b2, qavat, 2.9);
      derazalar(s, "ong", w, d, 0, d, qavat, 2.9);
      for (var b = 1; b < qavat; b++) {
        [[b1, b2], [b3, b4]].forEach(function (p, j) {
          var z0 = b * 2.9 + 0.15, chuq = 1.2;
          s.chapda(0, d, 0, p[0], z0, p[1] - p[0], 2.3, "tunOyna", 1);          /* balkon ichi */
          s.yuz([[p[0], d, z0], [p[1], d, z0], [p[1], d + chuq, z0], [p[0], d + chuq, z0]], "beton", 0);
          s.yuz([[p[0], d + chuq, z0], [p[1], d + chuq, z0], [p[1], d + chuq, z0 + 1.05], [p[0], d + chuq, z0 + 1.05]], (b + j) % 2 ? bMat : "panel", 1);
          s.yuz([[p[0], d, z0], [p[0], d + chuq, z0], [p[0], d + chuq, z0 + 1.05], [p[0], d, z0 + 1.05]], "panel", 2);
          s.yuz([[p[0], d + chuq, z0 + 1.05], [p[1], d + chuq, z0 + 1.05], [p[1], d, z0 + 1.05], [p[0], d, z0 + 1.05]], "beton", 0);
        });
      }
      s.sokol(0, 0, w, d, 1.0);
      /* podyezd — ustunli soyabon */
      var px = w * 0.42;
      s.chapda(0, d, 0, px + 0.5, 1.0, 1.4, 2.4, "tunOyna", 1);
      s.silindr([px + 0.3, d + 1.7, 0], 0.11, 2.9, "z", "metall");
      s.silindr([px + 2.6, d + 1.7, 0], 0.11, 2.9, "z", "metall");
      s.yuz([[px - 0.2, d, 3.05], [px + 3.1, d, 3.05], [px + 3.1, d + 1.9, 2.9], [px - 0.2, d + 1.9, 2.9]], "metall", 0);
      zina(s, px + 0.6, d, 1.9, 3);
      terak(s, w + 3, d * 0.3, 10.5);
      return [w + 4.5, d + 4.5];
    },

    /* Xususiy uy — g'ishtli, ayvonli, devor bilan o'ralgan hovli */
    uy: function (s, r) {
      var w = 10 + r() * 3, d = 7.6, h = 3.1;
      var q = r();
      var tomMat = q < 0.4 ? "kokTom" : (q < 0.72 ? "qizilTom" : "shifer");
      var devMat = r() < 0.55 ? "suvoq" : "gisht";
      var hx = -4.6, hy = -3.2, hw = w + 10, hd = d + 11, rise = d * 0.46;

      terak(s, hx + 1.5, hy + 1.2, 9);
      s.maydon(hx, hy, hw, hd, "yer");
      s.maydon(w * 0.46, d + 2.2, 1.7, 5.6, "beton");
      s.quti(0, 0, 0, w, d, h, devMat, { ustsiz: true });
      s.tom(-0.6, -0.6, h, w + 1.2, d + 1.2, rise, tomMat, "x");
      s.quti(w * 0.26, d * 0.56, h + rise * 0.7, 0.72, 0.72, 1.45, "gisht");
      s.quti(w * 0.26 - 0.11, d * 0.56 - 0.11, h + rise * 0.7 + 1.45, 0.94, 0.94, 0.15, "beton");
      derazalar(s, "chap", 0, d, 0, w * 0.56, 1, h);
      s.ongda(w, d, 0, d * 0.26, 1.2, 1.5, 1.3, "oyna", 2);
      s.ongda(w, d, 0, d * 0.26 - 0.1, 1.1, 1.7, 0.1, "oq", 2);
      s.sokol(0, 0, w, d, 0.55);

      /* ayvon — old tomondagi ustunli savag'ich */
      var ax = w * 0.56, aw = w * 0.44 + 0.5;
      s.chapda(0, d, 0, ax + 0.55, 0.55, 1.05, 2.2, "tana", 1);
      s.silindr([ax + 0.25, d + 2.15, 0], 0.1, 2.6, "z", "oq");
      s.silindr([ax + aw - 0.45, d + 2.15, 0], 0.1, 2.6, "z", "oq");
      s.nishab(ax - 0.25, d, 2.6, aw, 2.5, 0.6, tomMat);
      s.maydon(ax - 0.5, d + 2.5, aw + 1, 2.2, "beton");
      zina(s, ax + 0.45, d + 2.5, 1.5, 2);

      sori(s, w + 2.4, 0.4, 3.4, d - 0.8);
      /* hovlidagi garaj */
      s.quti(hx + 0.7, d + 1.4, 0, 4.3, 3.4, 2.4, devMat, { ustsiz: true });
      s.nishab(hx + 0.5, d + 1.2, 2.4, 4.7, 3.8, 0.55, tomMat);
      s.chapda(hx + 0.7, d + 4.8, 0, 0.55, 0, 3.2, 2.0, "darvoza", 1);
      devor(s, hx, hy, hw, hd, 1.9, w * 0.48 + 4.6);
      return [w, d];
    },

    /* Savdo do'koni — alyumin vitrina, yo'l-yo'l soyabon, peshtaxta yozuvi */
    dokon: function (s, r) {
      var w = 11 + r() * 4, d = 7.4, h = 3.9;
      var mat = r() < 0.5 ? "suvoq" : "silikat", i;
      s.maydon(-2.6, d + 0.25, w + 6.5, 3.8);
      s.quti(0, 0, 0, w, d, h, mat);
      s.tekisTom(0, 0, h, w, d, mat);
      /* vitrina */
      s.chapda(0, d, 0, 0.7, 0.6, w - 1.4, 2.3, "oyna", 1);
      for (i = 1; i < 5; i++) s.chapda(0, d, 0, 0.7 + (w - 1.4) * i / 5, 0.52, 0.08, 2.46, "metall", 1);
      s.chapda(0, d, 0, w * 0.44, 0.52, 1.2, 2.46, "metall", 1);
      s.chapda(0, d, 0, w * 0.455, 0.6, 0.98, 2.3, "tunOyna", 1);
      s.sokol(0, 0, w, d, 0.52);
      /* peshtaxta yozuvi */
      s.chapda(0, d, 0, 0.35, 3.08, w - 0.7, 0.6, "mkb", 1);
      s.ongda(w, d, 0, 0.35, 3.08, d - 0.7, 0.6, "mkb", 2);
      /* yo'l-yo'l soyabon */
      var sn = Math.max(6, Math.round(w / 0.85)), sw = (w - 0.6) / sn;
      for (i = 0; i < sn; i++) {
        var x0 = 0.3 + i * sw;
        s.yuz([[x0, d, 2.98], [x0 + sw, d, 2.98], [x0 + sw, d + 1.4, 2.66], [x0, d + 1.4, 2.66]], i % 2 ? "qizil" : "oq", 0, { sw: 0 });
        s.yuz([[x0, d + 1.4, 2.66], [x0 + sw, d + 1.4, 2.66], [x0 + sw, d + 1.4, 2.42], [x0, d + 1.4, 2.42]], i % 2 ? "qizil" : "oq", 1, { sw: 0 });
      }
      s.ongda(w, d, 0, d * 0.28, 1.25, d * 0.34, 1.5, "oyna", 2);
      zina(s, w * 0.42, d, 2.2, 2);
      /* tashqaridagi jihoz */
      s.quti(w + 0.9, d - 1.4, 0, 1.1, 1.1, 1.1, "tana");
      s.quti(w + 0.8, d + 0.1, 0, 1.1, 1.1, 0.7, "tana");
      ustun(s, -1.9, d + 3.2, 4.6);
      return [w, d];
    },

    /* Ishlab chiqarish sexi — arra tishli tom, rulonli darvoza, shamollatish */
    sex: function (s, r) {
      var w = 20 + r() * 7, d = 13, h = 6.2, tish = 4;
      s.quti(0, 0, 0, w, d, h, "silikat", { ustsiz: true });
      for (var i = 0; i < tish; i++) {
        var x = i * w / tish, tw = w / tish;
        s.nishab(x, 0, h, tw, d, 2.3, "kokTom");
        s.yuz([[x, d, h], [x, d, h + 2.3], [x + tw, d, h]], "silikat", 1);
        if (i === tish - 1) s.yuz([[x + tw, d, h], [x + tw, 0, h], [x + tw, 0, h + 2.3]], "silikat", 2);
        s.yuz([[x, 0, h + 2.3], [x, d, h + 2.3], [x, d, h], [x, 0, h]], "tunOyna", 2);
      }
      /* rulonli darvoza va eshik */
      s.chapda(0, d, 0, w * 0.12, 0, 4.4, 4.4, "metall", 1);
      for (var q = 0; q < 10; q++) s.chiziq([[w * 0.12, d, 0.42 * q + 0.2], [w * 0.12 + 4.4, d, 0.42 * q + 0.2]], { op: 0.3, sw: 0.5 });
      s.chapda(0, d, 0, w * 0.62, 0, 1.15, 2.4, "darvoza", 1);
      derazalar(s, "chap", 0, d, 4.7, w, 1, 1.5);
      derazalar(s, "ong", w, d, 1.2, d, 1, 3.4);
      /* transformator xonasi va mo'ri */
      s.quti(w + 1.6, 1.5, 0, 4.5, 4.5, 3.4, "suvoq", { ustsiz: true });
      s.nishab(w + 1.4, 1.3, 3.4, 4.9, 4.9, 0.8, "kokTom");
      s.silindr([w + 3.4, 9.5, 0], 0.45, 11, "z", "metall");
      s.quti(-1.6, d + 1.2, 0, w + 6, 3.2, 0.05, "asfalt");
      ustun(s, w + 5.4, d + 3.4, 6.2, true);
      return [w + 7, d + 4.8];
    },

    /* Omborxona — keng oraliqli angar, yuklash platformasi, rulonli darvozalar */
    ombor: function (s, r) {
      var w = 22 + r() * 7, d = 12, h = 4.8, i, q;
      s.maydon(-2.6, d + 2.9, w + 9, 5.4);
      s.quti(0, 0, 0, w, d, h, "silikat", { ustsiz: true });
      s.tom(-0.7, -0.7, h, w + 1.4, d + 1.4, 2.6, "kokTom", "x");
      derazalar(s, "ong", w, d, 3.3, d, 1, 1.4);
      s.ongda(w, d, 0, d * 0.34, 1.35, 1.2, 2.2, "darvoza", 2);
      /* rulonli darvozalar */
      [0.09, 0.58].forEach(function (p) {
        var x0 = w * p;
        s.chapda(0, d, 0, x0 - 0.22, 1.15, 5.44, 3.6, "beton", 1);
        s.chapda(0, d, 0, x0, 1.15, 5.0, 3.4, "qoraMetall", 1);
        for (q = 1; q < 10; q++) s.chiziq([[x0, d, 1.15 + 3.4 * q / 10], [x0 + 5, d, 1.15 + 3.4 * q / 10]], { op: 0.4, sw: 0.6, stroke: "#CDD1CD" });
      });
      /* yuklash platformasi */
      s.quti(-0.25, d, 0, w + 0.5, 2.8, 1.15, "beton");
      for (i = 1; i * 4 < w; i++) s.chiziq([[i * 4, d + 2.8, 0], [i * 4, d + 2.8, 1.15]], { op: 0.2, sw: 0.6 });
      /* konteyner va palletlar */
      s.quti(w + 1.2, 1.5, 0, 6, 2.5, 2.6, "qizil");
      for (i = 1; i < 7; i++) s.chiziq([[w + 1.2 + i * 0.85, 4, 0], [w + 1.2 + i * 0.85, 4, 2.6]], { op: 0.28, sw: 0.6 });
      s.quti(w * 0.30, d + 3.4, 0, 1.25, 1.25, 1.0, "tana");
      s.quti(w * 0.30 + 1.5, d + 3.6, 0, 1.25, 1.25, 0.6, "tana");
      ustun(s, w + 4.6, d + 3.6, 6, true);
      return [w, d];
    },

    /* Sut-tovar fermasi — ikki uzun molxona, suv minorasi, panjarali qo'ra */
    ferma: function (s, r) {
      var w = 26 + r() * 6, d = 7.5;
      [0, 11].forEach(function (y) {
        s.quti(0, y, 0, w, d, 3.2, "suvoq", { ustsiz: true });
        s.tom(-0.6, y - 0.6, 3.2, w + 1.2, d + 1.2, 1.9, "shifer", "x");
        /* ochiq yon — havo almashinuvi uchun panjara */
        for (var x = 1.4; x < w - 1; x += 2.6) s.chapda(0, y + d, 0, x, 1.5, 1.7, 1.2, "qoraMetall", 1);
        s.chapda(0, y + d, 0, w * 0.45, 0, 1.4, 2.5, "darvoza", 1);
      });
      /* suv minorasi */
      s.silindr([w + 4.5, 3.5, 0], 0.16, 7.5, "z", "metall");
      s.silindr([w + 6.9, 3.5, 0], 0.16, 7.5, "z", "metall");
      s.silindr([w + 4.5, 5.9, 0], 0.16, 7.5, "z", "metall");
      s.silindr([w + 5.7, 4.7, 7.4], 2.1, 2.8, "z", "metall");
      s.silindr([w + 5.7, 4.7, 10.2], 2.1, 0.1, "z", "kokTom");
      /* pichan g'aramlari */
      s.silindr([w + 3.5, 13.5, 0], 1.25, 1.5, "y", "sariq");
      s.silindr([w + 3.5, 16.5, 0], 1.25, 1.5, "y", "sariq");
      /* qo'ra panjarasi */
      for (var i = 0; i <= 12; i++) s.silindr([-4.5 + i * 0.9, d + 3, 0], 0.06, 1.5, "z", "tana");
      s.quti(-4.6, d + 2.94, 1.35, 11, 0.08, 0.12, "tana");
      ustun(s, w + 9, 12, 6, true);
      return [w + 9.5, 19];
    },

    /* Issiqxona — polietilen tonnel qatorlari */
    issiqxona: function (s, r) {
      var w = 24 + r() * 6, d = 6.4, n = 3, k, i;
      for (k = 0; k < n; k++) {
        var y0 = k * (d + 0.9), seg = 9, kesim = [];
        for (i = 0; i <= seg; i++) {
          var t = Math.PI * i / seg;
          kesim.push([y0 + d / 2 - Math.cos(t) * d / 2, Math.sin(t) * 3.1 + 0.9]);
        }
        for (i = seg - 1; i >= 0; i--) {
          var a = kesim[i], b = kesim[i + 1];
          s.yuz([[0, a[0], a[1]], [w, a[0], a[1]], [w, b[0], b[1]], [0, b[0], b[1]]], "oyna", i < seg / 2 ? 2 : 1, { op: 0.88 });
        }
        s.yuz([[w, y0, 0]].concat(kesim.map(function (q) { return [w, q[0], q[1]]; })).concat([[w, y0 + d, 0]]), "oyna", 2, { op: 0.9 });
        /* yoy karkasi */
        for (var x = 2.2; x < w; x += 2.2) s.chiziq(kesim.map(function (q) { return [x, q[0], q[1]]; }), { op: 0.28, sw: 0.6, stroke: "#8C9A93" });
        /* poydevor */
        s.quti(-0.15, y0 - 0.15, 0, w + 0.3, d + 0.3, 0.9, "beton", { ustsiz: true });
      }
      s.quti(-1.2, 0, 0, 0.9, n * (d + 0.9), 0.05, "asfalt");
      ustun(s, w + 2.2, n * (d + 0.9) - 1, 5.4, true);
      return [w + 3, n * (d + 0.9)];
    },

    /* Asbob-uskuna — stanok, boshqaruv shkafi, rolikli konveyer */
    uskuna: function (s, r) {
      s.maydon(-3.9, -0.8, 10.6, 5.4, "beton");
      s.quti(0, 0, 0, 4.4, 3.2, 0.32, "asfalt");                       /* betonlangan poydevor */
      s.quti(0.3, 0.3, 0.32, 3.1, 2.5, 2.2, "kok");                    /* stanok korpusi */
      s.quti(0.15, 0.15, 2.52, 3.4, 2.8, 0.26, "qoraMetall");
      s.chapda(0.3, 2.8, 0.32, 0.38, 0.6, 2.25, 1.15, "tunOyna", 1);   /* himoya oynasi */
      s.chapda(0.3, 2.8, 0.32, 0.55, 1.88, 0.55, 0.07, "metall", 1);
      s.ongda(3.4, 2.8, 0.32, 0.4, 0.55, 1.6, 1.2, "qoraMetall", 2);
      s.silindr([1.85, 1.5, 2.78], 0.3, 1.4, "z", "metall");           /* shpindel */
      s.silindr([1.85, 1.5, 4.18], 0.52, 0.22, "z", "qoraMetall");
      /* boshqaruv shkafi */
      s.quti(4.05, 0.55, 0.32, 1.5, 1.95, 2.45, "metall");
      s.chapda(4.05, 2.5, 0.32, 0.3, 1.3, 0.95, 0.75, "tunOyna", 1);
      s.chapda(4.05, 2.5, 0.32, 0.38, 0.62, 0.22, 0.22, "mkb", 1);
      s.chapda(4.05, 2.5, 0.32, 0.8, 0.62, 0.22, 0.22, "sariq", 1);
      /* rolikli konveyer */
      s.silindr([-3.3, 1.7, 0], 0.07, 0.92, "z", "metall");
      s.silindr([-0.35, 1.7, 0], 0.07, 0.92, "z", "metall");
      s.silindr([-3.3, 0.85, 0], 0.07, 0.92, "z", "metall");
      s.quti(-3.5, 0.75, 0.92, 3.3, 1.35, 0.14, "qoraMetall");
      for (var i = 0; i < 9; i++) s.silindr([-3.4 + i * 0.36, 0.78, 1.14], 0.09, 1.3, "y", "metall");
      s.quti(-2.9, 0.95, 1.24, 0.85, 0.95, 0.72, "tana");
      s.quti(-1.55, 0.95, 1.24, 0.85, 0.95, 0.72, "tana");
      return [0, 0];
    },

    /* Avtotransport — yengil avtomobil */
    avto: function (s, r) {
      var L = 4.4, W2 = 1.82, T = 0.2;
      var rang = ["kumush", "kok", "qoraMetall", "qizil", "oq"][Math.floor(r() * 5)];
      s.maydon(-0.9, -0.9, L + 1.8, W2 + 1.9, "beton");
      gildirak(s, 1.05, 0.0, 0.34, 0.34, 0.2);                         /* uzoq g'ildiraklar */
      gildirak(s, 3.2, 0.0, 0.34, 0.34, 0.2);
      s.quti(0.35, 0.1, 0.28, L - 0.7, W2 - 0.2, 0.18, "qoraMetall");  /* shassi */
      s.quti(0.1, 0.06, 0.4, L - 0.2, W2 - 0.12, 0.58, rang, { ustsiz: true });
      s.yuz([[0.1, 0.06, 0.98], [L - 0.1, 0.06, 0.98], [L - 0.1, W2 - 0.06, 0.98], [0.1, W2 - 0.06, 0.98]], rang, 0);
      /* salon */
      var g0 = 1.0, g1 = 3.05, yg = W2 - 0.22;
      s.yuz([[g0, yg, 0.98], [g1, yg, 0.98], [g1 - 0.3, yg, 1.66], [g0 + 0.36, yg, 1.66]], "tunOyna", 1);
      s.yuz([[g0, yg, 0.98], [g0 + 0.36, yg, 1.66], [g0 + 0.36, T, 1.66], [g0, T, 0.98]], rang, 2);
      s.yuz([[g1, yg, 0.98], [g1 - 0.3, yg, 1.66], [g1 - 0.3, T, 1.66], [g1, T, 0.98]], rang, 2);
      s.yuz([[g0 + 0.36, T, 1.66], [g1 - 0.3, T, 1.66], [g1 - 0.3, yg, 1.66], [g0 + 0.36, yg, 1.66]], rang, 0);
      s.yuz([[g0 + 1.05, yg, 0.98], [g0 + 1.12, yg, 1.66], [g0 + 1.12, T, 1.66], [g0 + 1.05, T, 0.98]], rang, 2);
      /* old va orqa tafsilotlar */
      s.ongda(L - 0.1, W2 - 0.06, 0, 0.22, 0.62, 0.42, 0.2, "oq", 2);
      s.ongda(L - 0.1, W2 - 0.06, 0, 1.06, 0.62, 0.42, 0.2, "oq", 2);
      s.ongda(L - 0.1, W2 - 0.06, 0, 0.12, 0.4, 1.46, 0.16, "qoraMetall", 2);
      s.chapda(0.1, W2 - 0.06, 0, 0.9, 0.42, 0.06, 0.34, "metall", 1);
      gildirak(s, 1.05, W2 - 0.26, 0.34, 0.34, 0.2);                   /* yaqin g'ildiraklar */
      gildirak(s, 3.2, W2 - 0.26, 0.34, 0.34, 0.2);
      return [0, 0];
    },

    /* Yuk avtomobili — furgonli */
    yuk: function (s, r) {
      var W2 = 2.35, i;
      s.maydon(-1.0, -1.0, 10.6, W2 + 2.1, "beton");
      [1.5, 2.72, 7.3].forEach(function (x) { gildirak(s, x, 0.02, 0.52, 0.52, 0.28); });
      s.quti(0.4, 0.18, 0.5, 8.1, W2 - 0.36, 0.24, "qoraMetall");      /* rama */
      s.quti(0.4, 0, 0.74, 5.6, W2, 2.6, "oq");                        /* furgon */
      s.chapda(0.4, W2, 0.74, 0.35, 0.45, 4.9, 1.7, "oq", 1);
      s.chapda(0.4, W2, 0.74, 1.15, 0.75, 3.3, 0.95, "mkb", 1);
      s.chapda(0.4, W2, 0.74, 0.35, 2.28, 4.9, 0.05, "metall", 1);
      s.ongda(6.0, W2, 0.74, 0.3, 0.45, W2 - 0.6, 1.7, "oq", 2);
      s.quti(6.15, 0.06, 0.74, 2.3, W2 - 0.12, 1.95, "kok");           /* kabina */
      s.yuz([[6.4, W2 - 0.06, 2.69], [8.45, W2 - 0.06, 2.69], [8.45, W2 - 0.06, 3.22], [6.62, W2 - 0.06, 3.22]], "tunOyna", 1);
      s.yuz([[6.4, W2 - 0.06, 2.69], [6.62, W2 - 0.06, 3.22], [6.62, 0.06, 3.22], [6.4, 0.06, 2.69]], "kok", 2);
      s.yuz([[6.62, 0.06, 3.22], [8.45, 0.06, 3.22], [8.45, W2 - 0.06, 3.22], [6.62, W2 - 0.06, 3.22]], "kok", 0);
      s.ongda(8.45, W2 - 0.06, 0, 0.22, 1.5, W2 - 0.5, 0.82, "tunOyna", 2);
      s.ongda(8.45, W2 - 0.06, 0, 0.18, 0.86, 0.55, 0.3, "oq", 2);
      s.ongda(8.45, W2 - 0.06, 0, 1.5, 0.86, 0.55, 0.3, "oq", 2);
      s.ongda(8.45, W2 - 0.06, 0, 0.12, 0.5, 2.0, 0.24, "qoraMetall", 2);
      [1.5, 2.72, 7.3].forEach(function (x) { gildirak(s, x, W2 - 0.34, 0.52, 0.52, 0.28); });
      return [0, 0];
    },

    /* Maxsus texnika — ekskavator-yuklagich */
    texnika: function (s, r) {
      s.maydon(-4.9, -0.9, 11.2, 4.4, "beton");
      gildirak(s, 1.9, 0.08, 0.68, 0.68, 0.36);
      gildirak(s, 4.65, 0.0, 0.88, 0.88, 0.44);
      s.quti(1.2, 0.25, 0.6, 3.9, 1.8, 0.52, "qoraMetall");
      s.quti(2.0, 0.3, 1.12, 2.1, 1.7, 1.0, "sariq");                  /* motor bloki */
      s.quti(3.85, 0.3, 1.12, 1.6, 1.7, 1.9, "sariq", { ustsiz: true });
      s.yuz([[3.95, 2.0, 1.75], [5.35, 2.0, 1.75], [5.35, 2.0, 2.92], [3.95, 2.0, 2.92]], "tunOyna", 1);
      s.ongda(5.45, 2.0, 0, 0.22, 1.75, 1.35, 1.17, "tunOyna", 2);
      s.quti(3.78, 0.22, 3.02, 1.74, 1.86, 0.14, "qoraMetall");        /* kabina tomi */
      /* strela */
      s.yuz([[1.85, 0.72, 2.12], [2.48, 0.72, 2.34], [0.12, 0.72, 4.55], [-0.42, 0.72, 4.3]], "sariq", 1);
      s.yuz([[2.48, 0.72, 2.34], [2.48, 1.32, 2.34], [0.12, 1.32, 4.55], [0.12, 0.72, 4.55]], "sariq", 0);
      s.yuz([[1.85, 1.32, 2.12], [2.48, 1.32, 2.34], [0.12, 1.32, 4.55], [-0.42, 1.32, 4.3]], "sariq", 1);
      s.silindr([1.4, 0.68, 2.9], 0.11, 0.72, "y", "metall");          /* gidrosilindr */
      s.yuz([[-0.42, 1.32, 4.3], [0.12, 1.32, 4.55], [-2.6, 1.32, 2.98], [-2.92, 1.32, 3.32]], "sariq", 1);
      s.yuz([[-0.42, 0.72, 4.3], [0.12, 0.72, 4.55], [-2.6, 0.72, 2.98], [-2.92, 0.72, 3.32]], "sariq", 1);
      s.yuz([[-2.6, 0.72, 2.98], [-2.6, 1.32, 2.98], [-2.92, 1.32, 3.32], [-2.92, 0.72, 3.32]], "sariq", 0);
      /* cho'mich */
      s.yuz([[-2.92, 0.5, 3.3], [-2.6, 0.5, 2.96], [-3.52, 0.5, 2.08], [-4.18, 0.5, 2.82]], "qoraMetall", 1);
      s.yuz([[-2.92, 1.56, 3.3], [-2.6, 1.56, 2.96], [-3.52, 1.56, 2.08], [-4.18, 1.56, 2.82]], "qoraMetall", 1);
      s.yuz([[-3.52, 0.5, 2.08], [-3.52, 1.56, 2.08], [-4.18, 1.56, 2.82], [-4.18, 0.5, 2.82]], "qoraMetall", 0);
      gildirak(s, 1.9, 1.7, 0.68, 0.68, 0.36);
      gildirak(s, 4.65, 1.68, 0.88, 0.88, 0.44);
      return [0, 0];
    }
  };

  /* ---------------------------------------------------------- Chiqarish */

  function joylashtir(sh, W, H, chet) {
    var a = Infinity, b = Infinity, c = -Infinity, d = -Infinity, i, j;
    var pr = function (p) { return [(p[0] - p[1]) * C, (p[0] + p[1]) * S - (p[2] || 0)]; };
    for (i = 0; i < sh.length; i++) {
      sh[i].ekran = [];
      for (j = 0; j < sh[i].pts.length; j++) {
        var q = pr(sh[i].pts[j]);
        sh[i].ekran.push(q);
        if (q[0] < a) a = q[0]; if (q[1] < b) b = q[1];
        if (q[0] > c) c = q[0]; if (q[1] > d) d = q[1];
      }
    }
    var k = Math.min((W - chet * 2) / (c - a), (H - chet * 2) / (d - b));
    var ox = (W - (c - a) * k) / 2 - a * k, oy = (H - (d - b) * k) / 2 - b * k;
    return sh.map(function (f) {
      var pts = f.ekran.map(function (p) { return Math.round(p[0] * k + ox) + "," + Math.round(p[1] * k + oy); }).join(" ");
      if (!f.yopiq) {
        return '<polyline points="' + pts + '" fill="none" stroke="' + f.stroke + '" stroke-width="' + f.sw +
          '" opacity="' + f.op + '"' + (f.dash ? ' stroke-dasharray="' + f.dash + '"' : "") + "/>";
      }
      return '<polygon points="' + pts + '" fill="url(#p' + f.kalit + ')"' +
        (f.op != null ? ' fill-opacity="' + f.op + '"' : "") +
        ' stroke="' + soya(f.asos, -0.075) + '" stroke-width="' + (f.sw == null ? 0.7 : f.sw) + '" stroke-linejoin="round"/>';
    }).join("");
  }

  var TURLAR = ["mamuriy", "kopqavat", "uy", "dokon", "sex", "ombor", "ferma", "issiqxona", "uskuna", "avto", "yuk", "texnika"];

  var NOM = {
    mamuriy: "Ma'muriy bino", kopqavat: "Ko'p qavatli uydagi xonadon", uy: "Turar joy",
    dokon: "Savdo do'koni", sex: "Ishlab chiqarish sexi", ombor: "Omborxona",
    ferma: "Chorvachilik fermasi", issiqxona: "Issiqxona", uskuna: "Asbob-uskuna",
    avto: "Avtotransport", yuk: "Yuk avtomobili", texnika: "Maxsus texnika"
  };

  function chiz(tur, urug, opt) {
    opt = opt || {};
    var W = opt.en || 640, H = opt.boy || 360;
    var r = tasodif(urug || 1);
    var model = Sahna();
    (MODEL[tur] || MODEL.uskuna)(model, r);

    /* Modelning yer bo'yicha haqiqiy chegarasi */
    var ax = Infinity, ay = Infinity, bx = -Infinity, by = -Infinity;
    model.sh.forEach(function (f) {
      f.pts.forEach(function (p) {
        if (p[0] < ax) ax = p[0]; if (p[0] > bx) bx = p[0];
        if (p[1] < ay) ay = p[1]; if (p[1] > by) by = p[1];
      });
    });

    /* Poydevor plitasi — obyekt oq fonda osilib qolmasligi uchun */
    var plita = Sahna();
    var chet = Math.max(0.8, (bx - ax) * 0.055);
    var x0 = ax - chet, y0 = ay - chet, pw = (bx - ax) + chet * 2, pd = (by - ay) + chet * 2, qal = Math.max(0.3, pw * 0.013);
    plita.quti(x0, y0, -qal, pw, pd, qal, "oq", { ustMat: "yer", sw: 0.6 });
    plita.chiziq([[x0 + 0.8, y0 + 0.8, 0.01], [x0 + pw - 0.8, y0 + 0.8, 0.01], [x0 + pw - 0.8, y0 + pd - 0.8, 0.01],
      [x0 + 0.8, y0 + pd - 0.8, 0.01], [x0 + 0.8, y0 + 0.8, 0.01]], { dash: "4 4", op: 0.3, sw: 0.7, stroke: "#8F897C" });

    var soyaSh = Sahna();
    soyaSh.yuz([[x0 + 0.5, y0 + 0.5, -qal], [x0 + pw + 0.5, y0 + 0.5, -qal], [x0 + pw + 0.5, y0 + pd + 0.5, -qal], [x0 + 0.5, y0 + pd + 0.5, -qal]], "oq", 0, { sw: 0 });

    var barcha = opt.plitasiz ? model.sh.slice() : soyaSh.sh.concat(plita.sh, model.sh);
    var tana = joylashtir(barcha, W, H, opt.qisqaChet ? 6 : 14);

    /* soya — birinchi shakl; blur filtri bilan qaytadan chiqariladi */
    var soyaTana = "";
    if (!opt.plitasiz) {
      var birinchi = tana.slice(0, tana.indexOf("/>") + 2);
      tana = tana.slice(birinchi.length);
      soyaTana = birinchi.replace(/fill="[^"]*"/, 'fill="#3C3A33"').replace(/stroke="[^"]*"/, 'stroke="none"');
    }

    var ishl = {};
    if (!opt.plitasiz) Object.keys(plita.ishl).forEach(function (k) { ishl[k] = plita.ishl[k]; });
    Object.keys(model.ishl).forEach(function (k) { ishl[k] = model.ishl[k]; });

    var defs = Object.keys(ishl).map(function (k) {
      var c0 = ishl[k], yuz = k.slice(-1);
      var yuqori = yuz === "0" ? soya(c0, 0.018) : soya(c0, 0.045);
      var past = yuz === "0" ? soya(c0, -0.012) : soya(c0, -0.062);
      return '<linearGradient id="p' + k + '" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0" stop-color="' + yuqori + '"/><stop offset="1" stop-color="' + past + '"/></linearGradient>';
    }).join("");

    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + W + " " + H + '" width="' + W + '" height="' + H +
      '" role="img" aria-label="' + (opt.nom || NOM[tur] || "Obyekt") + '">' +
      "<defs>" + defs +
      '<filter id="soya" x="-30%" y="-30%" width="160%" height="180%">' +
      '<feGaussianBlur stdDeviation="' + (W * 0.022).toFixed(1) + '"/></filter></defs>' +
      '<rect width="' + W + '" height="' + H + '" fill="#FFFFFF"/>' +
      '<g filter="url(#soya)" opacity="0.17">' + soyaTana + "</g>" + tana + "</svg>";
  }

  var API = { chiz: chiz, TURLAR: TURLAR, NOM: NOM };
  if (typeof module !== "undefined" && module.exports) module.exports = API;
  if (global) global.MKB_OBYEKT_RASM = API;
})(typeof window !== "undefined" ? window : null);
