/* ============================================================
   malumot-kirish.js — himoya qurilmalari va obyektga kirish
   malumot-kengaytma.js dan KEYIN ulanadi.

   Obyektlar odatda elektrsiz: qurilmalar quyosh paneli yoki akkumulyatorda
   ishlaydi, aloqa 4G yoki LoRaWAN orqali. Binoli obyektda 1–3 kirish nuqtasi
   (eshik yoki darvoza) bo'ladi, binosiz aktivda (transport, texnika, uskuna)
   kirish nuqtasi yo'q, uning o'rniga GPS-treker va titrash datchigi turadi.
   Obyektga odam faqat tashrif bilan keladi: xaridor, baholovchi, inspektor, usta.

   Mahalliy (haqiqiy) rejimda barcha to'plamlar bo'sh boshlanadi: "onlayn"
   ko'rsatkichi faqat haqiqatda kiritilgan qurilmalardan hisoblanadi.
   ============================================================ */
(function () {
  const D = window.MKB_DATA;
  if (!D || D.__kirishNazorati) return;
  D.__kirishNazorati = true;

  const namoyish = D.MANBA !== "mahalliy";
  const {sanaYoz, vaqtYoz, kunQosh, sanaOqi} = D;
  const BUGUN = D.BUGUN;
  /* Namoyish ma'lumotining holat vaqti: bugungi kunning 09:00 i. Tashrif va voqea vaqtlari shu lahzadan keyin tushmaydi.
     NVR/IoT shlyuzi ulanmagan: qurilma holati jonli signal emas, xodim qo'lda kiritgan oxirgi qayd (holatQayd).
     Qayd bugundan 1–5 kun oldingi ish vaqtida bo'ladi; oxirgiSignal va oflaynSoat shu qaydda yozilgan qiymatlar. */
  const HOZIR = new Date(BUGUN.getFullYear(), BUGUN.getMonth(), BUGUN.getDate(), 9, 0);

  let urug = 30260826;
  const rnd = () => { urug = (urug * 1103515245 + 12345) & 0x7fffffff; return urug / 0x7fffffff; };
  const tanla = a => a[Math.floor(rnd() * a.length)];
  const oraliq = (a, b) => a + Math.floor(rnd() * (b - a + 1));
  const ehtimol = p => rnd() < p;

  const SHAXSLAR = [], KIRISH_NUQTALARI = [], QURILMALAR = [], RUXSATLAR = [], KIRISH_SOROVLARI = [], TASHRIFLAR = [],
        KIRISH_VOQEALARI = [], XAVFSIZLIK_HODISALARI = [], MASOFAVIY_SESSIYALAR = [], XIZMAT_ISHLARI = [];

  const MAQSADLAR = ["Xaridorga ko'rsatish", "Baholovchi ko'rigi", "Rejali ko'rik", "Kommunal xizmat", "Ta'mirlash ishlari",
                     "Qurilmaga xizmat ko'rsatish", "Kadastr o'lchovi", "Sug'urtachi ko'rigi"];
  /* Tashrif maqsadlari ma'lumotnomasi: majburiy to'rttasi birinchi */
  const TASHRIF_MAQSADLARI = ["Baholovchi ko'rigi", "Sug'urtachi ko'rigi", "Ijarachiga ko'rsatish", "Xaridorga ko'rsatish",
                              "Rejali ko'rik", "Kommunal xizmat", "Ta'mirlash ishlari", "Qurilmaga xizmat ko'rsatish", "Kadastr o'lchovi"];
  /* Ruxsatdagi kirish usullari (RUXSATLAR.usul) */
  const KIRISH_USULLARI = ["Kalit", "Masofadan ochish", "Face ID"];
  /* Ochiq hodisa: yagona ta'rif (hal qilingan va yopilganlar sanalmaydi) */
  const OCHIQ_XH_HOLAT = ["ochiq", "tekshiruvda", "bartaraf"];
  const OCHIQ_HODISA_USTUN = ["yangi", "tekshirilmoqda", "bartaraf"];
  const QURILMA_NOMI = {};
  D.QURILMA_TURLARI.forEach(t => { QURILMA_NOMI[t.kalit] = t.nom; });

  if (namoyish) {
    /* ---------- shaxslar: bank xodimlari, pudratchilar va tashrifchilar ---------- */
    const ISMLAR = ["Aliyev Sardor", "Karimova Nilufar", "To'xtayev Bekzod", "Yusupova Dilnoza", "Rahimov Jasur", "Ergasheva Malika",
      "Sattorov Javohir", "Nazarova Zilola", "Umarov Sanjar", "Qodirova Ozoda", "Islomov Doniyor", "Xolmatova Sevara",
      "Toshpo'latov Rustam", "Mirzayeva Gulnora", "Abdullayev Aziz", "Sharipova Nodira", "Jo'rayev Ulug'bek", "Hakimova Feruza",
      "Nurmatov Otabek", "Sodiqova Kamola", "Bekmurodov Shohruh", "Yo'ldosheva Mavluda", "Qosimov Farrux", "Tursunova Zebo",
      "Ochilov Bahodir", "G'aniyeva Munisa", "Xudoyberdiyev Alisher", "Saidova Nasiba", "Muhammadiyev Temur", "Rasulova Shahnoza"];
    const LAVOZIM = {
      xodim: ["Obyekt menejeri", "Ko'rik va xavfsizlik inspektori", "Baholovchi", "Realizatsiya mutaxassisi", "Yurist"],
      pudratchi: ["Qurilma o'rnatuvchisi", "Elektrik", "Ta'mirchi", "Akkumulyator xizmati ustasi"],
      tashrifchi: ["Potensial xaridor", "Xaridor vakili", "Mustaqil baholovchi", "Kadastr muhandisi", "Sug'urta eksperti"]
    };
    const TASHKILOT = {pudratchi: ["SAT Solutions", "Hikvision PG", "Baraka Profit", "TESCOM Engineering"],
                       tashrifchi: ["Jismoniy shaxs", "«Baholash Servis» MChJ", "Kadastr xizmati", "O'zbekinvest"]};
    /* tashrifchining tashkiloti lavozimiga mos keladi */
    const TASHRIFCHI_TASHKILOTI = {"Potensial xaridor": "Jismoniy shaxs", "Xaridor vakili": "«Mega Savdo» MChJ",
      "Mustaqil baholovchi": "«Baholash Servis» MChJ", "Kadastr muhandisi": "Kadastr xizmati", "Sug'urta eksperti": "O'zbekinvest"};
    /* Bank xodimlari tizim foydalanuvchilaridan olinadi: ism, lavozim va rol ikki ro'yxatda bir xil */
    (D.FOYDLAR || []).forEach(f => {
      SHAXSLAR.push({id: "SH-" + String(SHAXSLAR.length + 1).padStart(3, "0"), ism: f.nom,
        belgi: f.nom.split(" ").map(x => x[0]).join("").toUpperCase(), tur: "xodim", lavozim: f.lavozim, rol: f.rol,
        tashkilot: "Mikrokreditbank", rasm: f.rasm || null, hujjat: "AA " + oraliq(1000000, 9999999), tel: f.tel || "", faol: f.faol !== false});
    });
    ISMLAR.forEach((ism, i) => {
      if (i < 12) return;   /* birinchi 12 ism avval xodim edi: endi xodimlar FOYDLAR dan */
      const tur = i < 18 ? "pudratchi" : "tashrifchi";
      const lavozim = tanla(LAVOZIM[tur]);
      const tashkilotT = tur === "xodim" ? "Mikrokreditbank" : tanla(TASHKILOT[tur]);
      SHAXSLAR.push({id: "SH-" + String(SHAXSLAR.length + 1).padStart(3, "0"), ism, belgi: ism.split(" ").map(x => x[0]).join("").toUpperCase(),
        tur, lavozim, tashkilot: tur === "tashrifchi" ? (TASHRIFCHI_TASHKILOTI[lavozim] || tashkilotT) : tashkilotT,
        rasm: "assets/xodim_" + ((i % 10) + 1) + ".webp", hujjat: "AA " + oraliq(1000000, 9999999),
        tel: "+998 " + oraliq(90, 99) + " " + oraliq(100, 999) + " " + oraliq(10, 99) + " " + oraliq(10, 99), faol: ehtimol(0.9)});
    });
    /* Joyga chiqadigan faol xodimlar; ko'rik inspektori va xavfsizlik xizmati alohida */
    const faolXodim = SHAXSLAR.filter(s => s.tur === "xodim" && s.faol);
    const rolli = (...r) => { const x = faolXodim.filter(s => r.indexOf(s.rol) >= 0); return x.length ? x : faolXodim; };
    const xodimlar = rolli("Obyekt menejeri", "Ko'rik va xavfsizlik inspektori", "Xavfsizlik xizmati");
    const inspektorlar = rolli("Ko'rik va xavfsizlik inspektori", "Xavfsizlik xizmati");
    const xavfsizlar = rolli("Xavfsizlik xizmati");
    const sorovchilar = rolli("Obyekt menejeri", "Realizatsiya mutaxassisi", "Baholovchi", "Ko'rik va xavfsizlik inspektori");

    /* ---------- kirish nuqtalari va qurilmalar ---------- */
    let qN = 0;
    const qurilmaQosh = (y, katalogId, nuqta, shlyuz, elektrBor) => {
      const k = D.katalog(katalogId);
      qN++;
      const tarmoq = elektrBor && ["shlyuz", "kamera-4G", "faceid-terminal"].indexOf(k.tur) >= 0 && ehtimol(0.4);
      const quvvat = tarmoq ? "tarmoq" : k.quvvat;
      const r = rnd();
      const oflaynSoat = r < 0.84 ? 0 : r < 0.92 ? oraliq(1, 20) : oraliq(24, 220);
      const holat = oflaynSoat === 0 ? (ehtimol(0.02) ? "xizmatda" : "onlayn") : (oflaynSoat >= 24 && ehtimol(0.25) ? "nosoz" : "oflayn");
      const ornatilgan = kunQosh(y.balans.sana, oraliq(3, Math.max(4, Math.min(200, D.kunFarqi(y.balans.sana, BUGUN) - 2))));
      const q = {
        id: "QR-" + String(qN).padStart(4, "0"), obyektId: y.id, kirishNuqtaId: nuqta ? nuqta.id : null, shlyuzId: shlyuz ? shlyuz.id : null,
        tur: k.tur, turNomi: QURILMA_NOMI[k.tur], katalogId: k.id, ishlabChiqaruvchi: k.ishlabChiqaruvchi, model: k.model,
        seriya: "SN" + oraliq(100000, 999999), ornatilgan: sanaYoz(ornatilgan),
        quvvat, aloqa: k.aloqa, simRaqam: k.aloqa === "4G" && ["shlyuz", "kamera-4G", "faceid-terminal", "GPS-treker"].indexOf(k.tur) >= 0
          ? "+998 " + tanla(["90", "93", "97", "99"]) + " " + oraliq(100, 999) + " " + oraliq(10, 99) + " " + oraliq(10, 99) : null,
        batareya: quvvat === "tarmoq" ? null : (ehtimol(0.1) ? oraliq(5, 19) : oraliq(35, 100))
      };
      /* Qo'lda qayd vaqti bugundan 1–5 kun oldingi ish vaqti. rnd() avvalgi joyida (batareyadan keyin) bir marta
         chaqiriladi: qolgan namoyish yozuvlari (ID, seriya, sanalar) o'zgarmaydi */
      const r2 = rnd();
      const qayd = kunQosh(BUGUN, -Math.max(1, Math.min(1 + Math.floor(r2 * 5), D.kunFarqi(ornatilgan, BUGUN))));
      qayd.setHours(9 + Math.floor((r2 * 37) % 1 * 8), Math.floor((r2 * 101) % 1 * 60));
      Object.assign(q, {
        /* aloqada: qayd paytida aloqa bor edi; aloqasiz: oxirgi aloqa qayddan oflaynSoat soat oldin */
        oxirgiSignal: vaqtYoz(new Date(qayd.getTime() - (oflaynSoat ? (oflaynSoat + r2 * 0.9) * 3600e3 : 0))),
        oflaynSoat, holat, holatQayd: vaqtYoz(qayd),
        proshivka: "v" + oraliq(1, 4) + "." + oraliq(0, 9) + "." + oraliq(0, 9),
        keyingiXizmat: sanaYoz(kunQosh(BUGUN, oraliq(-20, 160)))
      });
      if (k.tur === "faceid-terminal") q.yuzBaza = {oflayn: true, saqlashJoyi: "O'zbekiston hududidagi server", yozuvlar: oraliq(4, 18)};
      QURILMALAR.push(q);
      return q;
    };

    D.YOZUVLAR.forEach(y => {
      const binoli = D.binolimi(y);
      const elektrBor = (y.kommunal || []).some(k => k.xizmat === "elektr" && k.holat === "ulangan");
      const nuqtalar = [];
      if (binoli) {
        const soni = y.rasmTuri === "kopqavat" ? 1 : ["uy", "dokon", "mamuriy"].indexOf(y.rasmTuri) >= 0 ? oraliq(1, 2) : oraliq(2, 3);
        const NOMLAR = y.rasmTuri === "kopqavat" ? [["Kirish eshigi", "eshik"]]
          : [["Asosiy eshik", "eshik"], ["Darvoza", "darvoza"], [["ombor", "sex", "ferma"].indexOf(y.rasmTuri) >= 0 ? "Yuk darvozasi" : "Yon eshik", "eshik"]];
        for (let i = 0; i < soni; i++) {
          const [nom, tur] = NOMLAR[i];
          const n = {id: y.id.replace("/", "-") + "-KN" + String(i + 1).padStart(2, "0"), obyektId: y.id, nom, tur,
            turNomi: tur === "darvoza" ? "Darvoza" : "Eshik", rejim: "Mexanik qulf", holat: "qurilmasiz", qurilmalar: [],
            kunlikOtish: 0, oxirgiAloqa: null};
          KIRISH_NUQTALARI.push(n);
          nuqtalar.push(n);
        }
      }
      /* komplekt o'rnatilganmi: qo'riqlash turiga bog'liq */
      const t = y.himoya.qoriqlashTuri;
      const ehtimolK = t === "avtonom" ? 1 : t === "pult" ? 0.7 : t === "post" || t === "mobil" ? 0.3 : 0.12;
      if (!ehtimol(ehtimolK)) { y.himoya.qurilmaSoni = 0; return; }
      const andoza = D.HIMOYA_ANDOZALARI.find(a => a.id === y.himoya.andoza) || D.himoyaAndozasi(y);
      const bu = [];
      let shlyuz = null;
      andoza.tarkib.forEach(([kid, dona]) => {
        for (let d = 0; d < dona; d++) {
          const q = qurilmaQosh(y, kid, null, null, elektrBor);
          if (q.tur === "shlyuz" && !shlyuz) shlyuz = q;
          bu.push(q);
        }
      });
      /* LoRaWAN datchiklari shlyuz orqali ulanadi, eshik datchiklari kirish nuqtasiga biriktiriladi */
      bu.forEach(q => { if (q.aloqa === "LoRaWAN" && q.tur !== "shlyuz" && shlyuz) q.shlyuzId = shlyuz.id; });
      nuqtalar.forEach((n, i) => {
        let eshik = bu.find(q => q.tur === "eshik-datchigi" && !q.kirishNuqtaId);
        if (!eshik) eshik = qurilmaQosh(y, andoza.aloqa === "LoRaWAN" ? "ms-door" : "ajax-door", n, andoza.aloqa === "LoRaWAN" ? shlyuz : null, elektrBor);
        eshik.kirishNuqtaId = n.id;
        n.qurilmalar.push(eshik.id);
        if (i === 0 && ehtimol(0.35)) { const q = qurilmaQosh(y, "ajax-relay", n, null, elektrBor); n.qurilmalar.push(q.id); n.rejim = "Aqlli qulf"; }
        if (i === 0 && (y.holat === "Lotda" || (y.balans.qiymat || 0) > 5000) && ehtimol(0.35)) {
          const q = qurilmaQosh(y, "hik-kirish", n, null, elektrBor); n.qurilmalar.push(q.id); n.rejim = "Face ID";
        }
        if (n.rejim === "Mexanik qulf") n.rejim = "Mexanik qulf va datchik";
      });
      y.himoya.qurilmaSoni = QURILMALAR.filter(q => q.obyektId === y.id).length;
    });
    /* kirish nuqtasi holati uning qurilmalaridan */
    const QI = {};
    QURILMALAR.forEach(q => { QI[q.id] = q; });
    KIRISH_NUQTALARI.forEach(n => {
      if (!n.qurilmalar.length) return;
      const qs = n.qurilmalar.map(id => QI[id]);
      n.holat = qs.every(q => q.holat === "onlayn") ? "onlayn" : qs.some(q => q.holat === "nosoz") ? "nosoz" : "oflayn";
      n.oxirgiAloqa = qs.map(q => q.oxirgiSignal).sort((a, b) => sanaOqi(b) - sanaOqi(a))[0];
    });

    /* ---------- hodisalar: qurilma signali faqat obyektda shu turdagi qurilma bo'lsa ----------
       Hodisalar malumot-kengaytma.js da qurilmalardan oldin yaratiladi. Bu yerda har bir "qurilma" hodisasi
       obyektdagi mos qurilmaga bog'lanadi (qurilmaId). Mos qurilma bo'lmasa hodisa shu jiddiylikdagi
       ko'rik topilmasiga aylanadi: signal yo'q qurilmadan kelgandek ko'rsatilmaydi. rnd() chaqirilmaydi. */
    const HODISA_QURILMA = [
      [/Tutun datchigi/, q => q.tur === "tutun-datchigi" || q.tur === "yongin-datchigi"],
      [/Harakat datchigi/, q => q.tur === "harakat-datchigi"],
      [/Kamera .*aloqasiz/, q => q.tur === "kamera-4G", q => q.oflaynSoat >= 24],
      [/Avtomobil saqlash joyidan|GPS-treker/, q => q.tur === "GPS-treker" || q.tur === "titrash-datchigi"],
      [/batareyasi/, q => q.batareya != null, q => q.batareya < 20],
      [/suv bosgan|Suv sizishi/i, q => q.tur === "suv-datchigi"]
    ];
    const KORIK_TOPILMA = {
      bino:   {"yuqori": "Eshik plombasi buzilgan", "o'rta": "Hududda ruxsatsiz qurilish boshlangan", "past": "Tomdan suv o'tayotgani aniqlandi"},
      binosiz: {"yuqori": "Eshik plombasi buzilgan", "o'rta": "Butlovchi qism yetishmasligi aniqlandi", "past": "Korroziya belgilari aniqlandi"}
    };
    (D.HODISALAR || []).forEach(h => {
      if (h.manba !== "qurilma") return;
      const moslik = HODISA_QURILMA.find(m => m[0].test(h.hodisa));
      const bor = moslik ? QURILMALAR.filter(q => q.obyektId === h.obyektId && moslik[1](q)) : [];
      const q = (moslik && moslik[2] && bor.find(moslik[2])) || bor[0];
      if (q) { h.qurilmaId = q.id; return; }
      const y = D.YOZUVLAR.find(x => x.id === h.obyektId);
      const matn = KORIK_TOPILMA[y && D.binolimi(y) ? "bino" : "binosiz"][h.jiddiylik] || KORIK_TOPILMA.bino.yuqori;
      h.manba = "korik";
      h.qurilmaId = null;
      h.hodisa = matn;
      if (h.sarlavha) h.sarlavha = (y ? y.qisqa + " — " : "") + matn;
    });

    /* ---------- ruxsatlar va tashrif so'rovlari ---------- */
    const obyektlar = D.YOZUVLAR.filter(y => D.binolimi(y));
    obyektlar.forEach((y, i) => {
      if (i % 3) return;
      const sh = tanla(SHAXSLAR);
      const bosh = kunQosh(BUGUN, -oraliq(5, 200));
      const tugash = kunQosh(bosh, oraliq(20, 300));
      const nuq = KIRISH_NUQTALARI.filter(k => k.obyektId === y.id);
      RUXSATLAR.push({id: "RX-" + String(RUXSATLAR.length + 1).padStart(4, "0"), shaxsId: sh.id, obyektId: y.id,
        nuqtalar: nuq.slice(0, 1).map(k => k.id), daraja: sh.tur === "xodim" ? "To'liq kirish" : "Hamrohlik bilan",
        usul: nuq[0] && nuq[0].rejim === "Face ID" ? "Face ID" : nuq[0] && nuq[0].rejim === "Aqlli qulf" ? "Masofadan ochish" : "Kalit",
        boshlanish: sanaYoz(bosh), tugash: sanaYoz(tugash),
        holat: tugash < BUGUN ? "muddati tugagan" : ehtimol(0.06) ? "to'xtatilgan" : "amalda", bergan: tanla(xavfsizlar).ism});
    });
    for (let i = 0; i < 36; i++) {
      const y = tanla(D.YOZUVLAR);
      const sh = tanla(SHAXSLAR.filter(s => s.tur !== "xodim"));
      const sana = kunQosh(BUGUN, oraliq(-6, 9));
      const soat = oraliq(9, 17), daq = tanla([0, 30]);
      const payt = new Date(sana.getFullYear(), sana.getMonth(), sana.getDate(), soat, daq);
      /* holat vaqtdan keyingi tashrif hali bajarilmagan */
      const holat = payt > HOZIR ? tanla(["kutilmoqda", "kutilmoqda", "tasdiqlangan"]) : tanla(["tasdiqlangan", "bajarildi", "bajarildi", "rad etilgan"]);
      KIRISH_SOROVLARI.push({id: "KS-" + BUGUN.getFullYear() + "/" + String(1200 + i), sana: sanaYoz(sana),
        vaqt: String(soat).padStart(2, "0") + ":" + String(daq).padStart(2, "0"), shaxsId: sh.id, obyektId: y.id,
        maqsad: sh.lavozim === "Potensial xaridor" || sh.lavozim === "Xaridor vakili" ? "Xaridorga ko'rsatish" : tanla(MAQSADLAR),
        muddat: oraliq(1, 3) + " soat", sorovchi: tanla(sorovchilar).ism,
        tasdiqlovchi: holat === "kutilmoqda" ? null : tanla(xavfsizlar).ism, holat,
        izoh: holat === "rad etilgan" ? tanla(["Hamroh xodim yo'q", "Vaqt mos kelmadi", "Obyekt lotda, ko'rik kuni belgilangan"]) : ""});
    }

    /* ---------- tashriflar: odam obyektga faqat hamroh xodim bilan keladi ---------- */
    for (let i = 0; i < 90; i++) {
      const y = tanla(D.YOZUVLAR);
      /* xodim obyektga faqat ko'rik uchun boradi: tashrifchi xodim ham joyga chiqadigan faol xodim */
      const sh = tanla(SHAXSLAR.filter(x => x.tur !== "xodim").concat(inspektorlar));
      const kun = oraliq(-21, 0);
      let kirdi = kunQosh(BUGUN, kun); kirdi.setHours(oraliq(9, 17), oraliq(0, 59));
      /* bugungi tashrif holat vaqtidan keyin boshlanmaydi */
      if (kirdi > HOZIR) kirdi = new Date(HOZIR.getTime() - oraliq(20, 180) * 60e3);
      const davom = oraliq(20, 150);
      const chiqdi = new Date(kirdi.getTime() + davom * 60e3);
      const tugadi = chiqdi <= HOZIR;
      TASHRIFLAR.push({id: "TR-" + String(4200 + i), obyektId: y.id, shaxsId: sh.id, sana: sanaYoz(kirdi),
        kirish: vaqtYoz(kirdi).slice(11), chiqish: tugadi ? vaqtYoz(chiqdi).slice(11) : null,
        davomiylik: tugadi ? davom + " daqiqa" : "davom etmoqda",
        maqsad: sh.tur === "pudratchi" ? tanla(["Qurilmaga xizmat ko'rsatish", "Ta'mirlash ishlari", "Kommunal xizmat"])
          : sh.tur === "tashrifchi" ? (/xaridor/i.test(sh.lavozim) ? "Xaridorga ko'rsatish" : /baholovchi/i.test(sh.lavozim) ? "Baholovchi ko'rigi" : tanla(MAQSADLAR))
          : "Rejali ko'rik",
        hamroh: sh.tur === "xodim" ? null : tanla(xodimlar).ism, holat: tugadi ? "yakunlandi" : "obyektda"});
    }
    /* bugun hech kim obyektda bo'lmasa, holat shunday qoladi: o'tgan kungi tashrif "obyektda" deb ko'rsatilmaydi */

    /* ---------- kirish voqealari: aqlli qulf, Face ID va eshik datchiklaridan ---------- */
    const faolNuqtalar = KIRISH_NUQTALARI.filter(n => n.qurilmalar.length);
    for (let i = 0; i < 420 && faolNuqtalar.length; i++) {
      const n = tanla(faolNuqtalar);
      const qs = n.qurilmalar.map(id => QURILMALAR.find(q => q.id === id));
      const faceid = qs.find(q => q.tur === "faceid-terminal");
      const qulf = qs.find(q => q.tur === "aqlli-qulf");
      const manba = faceid || qulf || qs[0];
      const vaqt = kunQosh(BUGUN, oraliq(-7, 0)); vaqt.setHours(oraliq(6, 21), oraliq(0, 59));
      /* shlyuz ulanmagan: voqea jurnali qurilmadan qo'lda qayd paytida olinadi, oxirgi aloqadan keyingi voqea bo'lmaydi */
      if (vaqt > (sanaOqi(manba.oxirgiSignal) || HOZIR)) continue;
      const sh = tanla(SHAXSLAR);
      const r = rnd();
      const natija = manba.tur === "eshik-datchigi" ? (vaqt.getHours() < 8 || vaqt.getHours() > 19 ? "ogohlantirish" : "qayd etildi")
        : r < 0.85 ? "ruxsat" : r < 0.95 ? "rad" : "ogohlantirish";
      const yuz = manba.tur === "faceid-terminal";
      KIRISH_VOQEALARI.push({id: "KV-" + String(90000 + i), vaqt: vaqtYoz(vaqt), sana: sanaYoz(vaqt), soat: vaqtYoz(vaqt).slice(11),
        obyektId: n.obyektId, kirishNuqtaId: n.id, qurilmaId: manba.id, nuqtaNomi: n.nom,
        shaxsId: manba.tur === "eshik-datchigi" || (natija === "rad" && ehtimol(0.5)) ? null : sh.id,
        usul: yuz ? "Face ID" : manba.tur === "aqlli-qulf" ? tanla(["Masofadan ochish", "Bir martalik kod"]) : "Eshik ochildi",
        yuzMoslik: yuz ? (natija === "rad" ? oraliq(41, 74) : oraliq(90, 99)) : null,
        natija, sabab: natija === "rad" ? tanla(yuz ? ["Yuz mos kelmadi", "Ruxsat muddati tugagan"] : ["Kod eskirgan", "Ruxsat muddati tugagan"])
          : natija === "ogohlantirish" ? "Ish vaqtidan tashqari ochilish" : "",
        yonalish: ehtimol(0.55) ? "kirish" : "chiqish"});
    }
    KIRISH_VOQEALARI.sort((a, b) => sanaOqi(b.vaqt) - sanaOqi(a.vaqt));
    const bugunS = sanaYoz(BUGUN);
    KIRISH_VOQEALARI.forEach(v => { if (v.sana === bugunS) { const n = KIRISH_NUQTALARI.find(k => k.id === v.kirishNuqtaId); if (n) n.kunlikOtish++; } });

    /* ---------- xavfsizlik hodisalari: qurilma signallaridan ---------- */
    const HODISA_TURI = {
      "harakat-datchigi": ["Tunda harakat aniqlandi", "yuqori"], "eshik-datchigi": ["Eshik ish vaqtidan tashqari ochildi", "yuqori"],
      "kamera-4G": ["Kamera odamni aniqladi", "o'rta"], "tutun-datchigi": ["Tutun aniqlandi", "yuqori"],
      "yongin-datchigi": ["Harorat keskin oshdi", "yuqori"], "suv-datchigi": ["Suv sizishi", "o'rta"],
      "titrash-datchigi": ["Titrash yoki og'ish aniqlandi", "yuqori"], "GPS-treker": ["Saqlash hududidan chiqish", "yuqori"],
      "faceid-terminal": ["Yuz mos kelmadi, 3 urinish", "o'rta"], "aqlli-qulf": ["Qulf buzishga urinish", "yuqori"],
      "shlyuz": ["Shlyuz aloqasi uzildi", "o'rta"], "quvvat": ["Akkumulyator zaryadi past", "past"]
    };
    let xN = 300;
    QURILMALAR.forEach(q => {
      const hodisalar = [];
      /* hodisa vaqti: aloqasizlik oxirgi signaldan 24 soat o'tgan payt, qolganlari holat vaqtidan oldin */
      if (q.oflaynSoat >= 24) hodisalar.push(["Qurilma 24 soatdan ortiq aloqasiz", "o'rta", new Date(sanaOqi(q.oxirgiSignal).getTime() + 24 * 3600e3), false]);
      /* past zaryad qo'lda qayd paytida yozilgan; boshqa hodisalar ham qayddan keyin tushmaydi.
         oraliq() chaqiruvi namoyish ketma-ketligini saqlash uchun qoldirilgan */
      const qayd = sanaOqi(q.holatQayd);
      oraliq(15, 20 * 60);
      if (q.batareya != null && q.batareya < 20) hodisalar.push(["Batareya zaryadi " + q.batareya + "%", "past", qayd, false]);
      if (ehtimol(0.05)) {
        const v = kunQosh(BUGUN, -oraliq(0, 30)); v.setHours(oraliq(0, 23), oraliq(0, 59));
        hodisalar.push(HODISA_TURI[q.tur].concat([v > qayd ? new Date(qayd.getTime() - oraliq(5, 8 * 60) * 60e3) : v, true]));
      }
      hodisalar.forEach(([hodisa, jiddiylik, vaqtT, yopiladi]) => {
        xN++;
        const kunOldin = Math.round((BUGUN - new Date(vaqtT.getFullYear(), vaqtT.getMonth(), vaqtT.getDate())) / 864e5);
        const holat = yopiladi && kunOldin > 7 ? "yopildi" : tanla(["ochiq", "ochiq", "tekshiruvda", "bartaraf"]);
        XAVFSIZLIK_HODISALARI.push({id: "XH-" + BUGUN.getFullYear() + "/" + xN, vaqt: vaqtYoz(vaqtT), sana: sanaYoz(vaqtT),
          obyektId: q.obyektId, qurilmaId: q.id, kirishNuqtaId: q.kirishNuqtaId, hodisa, jiddiylik, holat,
          masul: tanla(inspektorlar).ism, chora: holat === "yopildi"
            ? tanla(["Mobil guruh yuborildi, obyekt joyida", "Batareya almashtirildi", "Qurilma qayta ishga tushirildi", "Soxta signal: hayvon"]) : ""});
      });
    });

    /* ---------- masofaviy ko'rik: faqat kamerasi bor obyektlarda ---------- */
    const kamerali = D.YOZUVLAR.filter(y => QURILMALAR.some(q => q.obyektId === y.id && q.tur === "kamera-4G" && q.holat === "onlayn"));
    const SESSIYA_BOSQICH = ["Aloqa o'rnatildi", "Kameralar aylanib chiqildi", "Perimetr ko'rildi", "Ko'rik yakunlandi"];
    for (let i = 0; i < Math.min(24, kamerali.length); i++) {
      const y = kamerali[(i * 7) % kamerali.length];
      const kun = oraliq(-40, 6);
      const holat = kun > 0 ? "rejalashtirilgan" : kun === 0 ? "jarayonda" : "yakunlandi";
      MASOFAVIY_SESSIYALAR.push({id: "MS-" + BUGUN.getFullYear() + "/" + String(140 + i), obyektId: y.id, sana: sanaYoz(kunQosh(BUGUN, kun)),
        vaqt: holat === "jarayonda" ? String(HOZIR.getHours() - 1).padStart(2, "0") + ":" + tanla(["15", "30", "40"])
          : String(oraliq(9, 16)).padStart(2, "0") + ":00", inspektor: tanla(inspektorlar).ism, holat,
        bosqich: holat === "yakunlandi" ? SESSIYA_BOSQICH.length : holat === "jarayonda" ? oraliq(1, 3) : 0, bosqichlar: SESSIYA_BOSQICH,
        kameralar: QURILMALAR.filter(q => q.obyektId === y.id && q.tur === "kamera-4G").length,
        davomiylik: holat === "yakunlandi" ? oraliq(8, 30) + " daqiqa" : holat === "jarayonda" ? "davom etmoqda" : "—"});
    }

    /* ---------- qurilmalarga xizmat ko'rsatish ---------- */
    const XIZMAT = ["Batareyani almashtirish", "Quyosh panelini tozalash", "Dasturiy ta'minotni yangilash", "Nosozlikni bartaraf etish", "O'rnatish"];
    const ustalar = SHAXSLAR.filter(s => s.tur === "pudratchi");
    QURILMALAR.filter(q => q.holat !== "onlayn" || (q.batareya != null && q.batareya < 20)).forEach((q, i) => {
      const kun = oraliq(-10, 12);
      XIZMAT_ISHLARI.push({id: "XI-" + BUGUN.getFullYear() + "/" + String(700 + i), qurilmaId: q.id, obyektId: q.obyektId, kirishNuqtaId: q.kirishNuqtaId,
        tur: q.batareya != null && q.batareya < 20 ? "Batareyani almashtirish" : tanla(XIZMAT), sana: sanaYoz(kunQosh(BUGUN, kun)),
        usta: tanla(ustalar).ism, holat: kun > 0 ? "rejada" : kun > -3 ? "bajarilmoqda" : "bajarildi",
        ehtiyotQismlar: q.batareya != null && q.batareya < 20 ? ["LiFePO4 akkumulyator"] : [], izoh: ""});
    });
  }

  /* ---------- indekslar va yordamchilar ---------- */
  const SHAXS_INDEKS = {}, NUQTA_INDEKS = {}, QURILMA_INDEKS = {};
  SHAXSLAR.forEach(s => { SHAXS_INDEKS[s.id] = s; });
  KIRISH_NUQTALARI.forEach(k => { NUQTA_INDEKS[k.id] = k; });
  QURILMALAR.forEach(q => { QURILMA_INDEKS[q.id] = q; });

  /* Qurilma holati: oxirgi qo'lda qayd etilgan holat. Shlyuz ulanmagan, shuning uchun sahifa soatiga qarab
     qayta hisoblanmaydi. Aloqasizlik soati qaydda yozilgan (oflaynSoat); u bo'lmasa qayd vaqti va oxirgi aloqa
     orasidan olinadi. qayd = holat kiritilgan vaqt (dd.mm.yyyy HH:MM) yoki null. */
  function qurilmaHolati(q) {
    if (!q) return null;
    const s = sanaOqi(q.oxirgiSignal), qayd = sanaOqi(q.holatQayd);
    const soat = !s ? null : typeof q.oflaynSoat === "number" ? q.oflaynSoat
      : Math.max(0, Math.floor(((qayd || HOZIR) - s) / 3600e3));
    const holat = q.holat === "nosoz" || q.holat === "xizmatda" ? q.holat : soat == null ? "aloqa yo'q" : soat >= 1 ? "oflayn" : "onlayn";
    /* Hozirgi vaqtga nisbatan: oxirgi signaldan beri o'tgan soat va qayd eskirganmi (24 soatdan ortiq).
       Jonli shlyuz ulanmagan: "onlayn" qayd paytidagi holat, eskirgan bo'lsa sahifa "Qayd bo'yicha" deb ko'rsatadi */
    const hozir = new Date(Math.max(Date.now(), HOZIR.getTime()));
    const signalSoat = s ? Math.max(0, Math.floor((hozir - s) / 3600e3)) : null;
    const qaydSoat = qayd ? Math.max(0, Math.floor((hozir - qayd) / 3600e3)) : null;
    return {holat, oflaynSoat: soat, batareyaPast: q.batareya != null && q.batareya < 20, uzoqOflayn: soat != null && soat >= 24,
      qayd: q.holatQayd || null, signalSoat, qaydSoat, eskirgan: qaydSoat == null || qaydSoat >= 24,
      aloqada: holat === "onlayn" && signalSoat != null && signalSoat < 24};
  }

  Object.assign(D, {
    SHAXSLAR, SHAXS_INDEKS, KIRISH_NUQTALARI, NUQTA_INDEKS, QURILMALAR, QURILMA_INDEKS, RUXSATLAR, KIRISH_SOROVLARI, TASHRIFLAR,
    KIRISH_VOQEALARI, XAVFSIZLIK_HODISALARI, MASOFAVIY_SESSIYALAR, XIZMAT_ISHLARI, TASHRIF_MAQSADLARI, KIRISH_USULLARI, OCHIQ_XH_HOLAT, OCHIQ_HODISA_USTUN,
    /* HODISALAR yozuvi (ustun bor) yoki XAVFSIZLIK_HODISALARI yozuvi uchun */
    ochiqHodisami: h => !!h && (h.ustun !== undefined ? OCHIQ_HODISA_USTUN.indexOf(h.ustun) >= 0 : OCHIQ_XH_HOLAT.indexOf(h.holat) >= 0),
    KIRISH_BUGUN: sanaYoz(BUGUN), HOZIR,
    /* Indeks yuklanganda quriladi; shu seansda qo'shilgan shaxs D.SHAXSLAR dan topiladi */
    shaxs: id => SHAXS_INDEKS[id] || (D.SHAXSLAR || []).find(s => s && s.id === id && !s.__ochirilgan) || null,
    shaxsNomi: id => { const s = D.shaxs(id); return s ? s.ism : "Aniqlanmagan"; },
    kirishNuqtasi: id => NUQTA_INDEKS[id] || (D.KIRISH_NUQTALARI || []).find(k => k.id === id) || null,
    qurilma: id => QURILMA_INDEKS[id] || (D.QURILMALAR || []).find(q => q.id === id) || null,
    obyektNuqtalari: obyektId => (D.KIRISH_NUQTALARI || []).filter(k => k.obyektId === obyektId),
    obyektQurilmalari: obyektId => (D.QURILMALAR || []).filter(q => q.obyektId === obyektId),
    obyektVoqealari: obyektId => (D.KIRISH_VOQEALARI || []).filter(k => k.obyektId === obyektId),
    qurilmaHolati,
    kirishJamlama: function () {
      const QS = D.QURILMALAR || [], KN = D.KIRISH_NUQTALARI || [];
      const qurilmali = new Set(QS.map(q => q.obyektId));
      return {
        nuqta: KN.length,
        onlayn: KN.filter(k => k.holat === "onlayn").length,
        oflayn: KN.filter(k => k.holat !== "onlayn").length,
        qurilmasizNuqta: KN.filter(k => !(k.qurilmalar || []).length).length,
        qurilma: QS.length,
        onlaynQurilma: QS.filter(q => q.holat === "onlayn").length,
        oflayn24: QS.filter(q => (q.oflaynSoat || 0) >= 24).length,
        nosoz: QS.filter(q => q.holat === "nosoz").length,
        batareyaPast: QS.filter(q => q.batareya != null && q.batareya < 20).length,
        quyosh: QS.filter(q => q.quvvat === "quyosh+akkumulyator").length,
        akkumulyator: QS.filter(q => q.quvvat === "akkumulyator").length,
        tarmoq: QS.filter(q => q.quvvat === "tarmoq").length,
        himoyalanganObyekt: qurilmali.size,
        qurilmasizObyekt: D.YOZUVLAR.filter(y => !qurilmali.has(y.id)).length,
        bugungiVoqea: (D.KIRISH_VOQEALARI || []).filter(v => v.sana === sanaYoz(BUGUN)).length,
        rad: (D.KIRISH_VOQEALARI || []).filter(v => v.natija === "rad").length,
        obyektda: (D.TASHRIFLAR || []).filter(t => t.holat === "obyektda").length,
        kutilayotganSorov: (D.KIRISH_SOROVLARI || []).filter(s => s.holat === "kutilmoqda").length,
        /* signal hodisalari va qayd etilgan hodisalar birga */
        ochiqHodisa: (D.XAVFSIZLIK_HODISALARI || []).filter(h => OCHIQ_XH_HOLAT.indexOf(h.holat) >= 0).length +
          (D.HODISALAR || []).filter(h => OCHIQ_HODISA_USTUN.indexOf(h.ustun) >= 0).length,
        amaldagiRuxsat: (D.RUXSATLAR || []).filter(r => r.holat === "amalda").length
      };
    }
  });
})();
