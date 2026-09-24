/* ============================================================
   malumot-qoshimcha.js — undiruv va sud moduli
   malumot.js dan KEYIN ulanadi.

   Undiruv ishi aktiv emas: u kredit bo'yicha garovni undirish jarayoni.
   Oxirgi bosqich "Balansga qabul" — qabul ustasi (qabul-boshlash.html?ish=ID)
   ishni yopadi va YOZUVLAR ga yangi aktiv qo'shadi (balans.undiruvIshId).
   SUD_MAJLISLAR, RESTRUKTURIZATSIYA va MULOQOTLAR ishga ishId orqali bog'lanadi.
   Mahalliy (haqiqiy) rejimda bu to'plamlar bo'sh boshlanadi.
   ============================================================ */
(function () {
  const D = window.MKB_DATA;
  if (!D || D.__undiruv) return;
  D.__undiruv = true;

  const nisbiy = D.__nisbiy;
  /* Sud majlisi faqat ish kunida: dam olish yoki bayram kuni keyingi ish kuniga suriladi */
  const ishKuni = n => D.sanaYoz(D.ishKuniQosh(D.sanaOqi(nisbiy(n)), 0));
  const namoyish = D.MANBA !== "mahalliy";

  /* ---------- deterministik tasodif (undiruv uchun alohida urug') ---------- */
  let urug = 41260917;
  const rnd = () => { urug = (urug * 1103515245 + 12345) & 0x7fffffff; return urug / 0x7fffffff; };
  const tanla = a => a[Math.floor(rnd() * a.length)];
  const oraliq = (a, b) => a + Math.floor(rnd() * (b - a + 1));

  D.ADVOKATLAR = namoyish ? [
    {id: "AD-01", ism: "Rahimov Sherzod",  litsenziya: "AD 004112", ixtisos: "Fuqarolik ishlari", tel: "+998 90 711 24 08", tajriba: "11 yil"},
    {id: "AD-02", ism: "Karimova Nilufar", litsenziya: "AD 003877", ixtisos: "Iqtisodiy nizolar", tel: "+998 93 402 18 55", tajriba: "8 yil"},
    {id: "AD-03", ism: "To'xtayev Alisher", litsenziya: "AD 005204", ixtisos: "Ijro ishlari",     tel: "+998 97 133 90 12", tajriba: "14 yil"},
    {id: "AD-04", ism: "Salimova Gulnora", litsenziya: "AD 004930", ixtisos: "Bank huquqi",       tel: "+998 91 556 71 43", tajriba: "9 yil"},
    {id: "AD-05", ism: "Ergashev Bahodir", litsenziya: "AD 002641", ixtisos: "Mulk huquqi",       tel: "+998 99 810 33 67", tajriba: "17 yil"}
  ] : [];

  const UNDIRUV_ISHLAR = [];
  const SUD_MAJLISLAR = [];
  const RESTRUKTURIZATSIYA = [];
  const MULOQOTLAR = [];

  if (namoyish) {
    /* ---------- Yopilgan ishlar: sakkizta asosiy aktiv shu ishlardan balansga olingan ---------- */
    const YOPILGAN = [
      ["UI-2026/0412", "AK-2026/4471", {nom: "Karimov Javlon Anvarovich", tur: "Jismoniy shaxs"}, "IP-2023/4471", "Ipoteka krediti", 480.0, 486.2, "Yunusobod tumanlararo fuqarolik ishlari sudi", "2-1234/2026"],
      ["UI-2025/1187", "AK-2025/1187", {nom: "«Zarafshon Tekstil» MChJ", tur: "Yuridik shaxs"}, "IK-2022/1187", "Investitsiya krediti", 4200.0, 3840.4, "Samarqand viloyat iqtisodiy sudi", "4-0221/2025"],
      ["UI-2026/2210", "AK-2026/2210", {nom: "Ergasheva Dilnoza Baxtiyorovna", tur: "Jismoniy shaxs"}, "IS-2024/2210", "Iste'mol krediti", 95.0, 92.5, null, null],
      ["UI-2025/0934", "AK-2025/0934", {nom: "«Navruz Savdo» MChJ", tur: "Yuridik shaxs"}, "AM-2023/0934", "Aylanma mablag' krediti", 1350.0, 1260.6, "Toshkent shahar iqtisodiy sudi", "4-0512/2025"],
      ["UI-2026/5512", "AK-2026/5512", {nom: "To'xtasinov Sherzod Rustamovich", tur: "Jismoniy shaxs"}, "AV-2024/5512", "Avtokredit", 82.0, 168.0, null, null],
      ["UI-2026/3308", "AK-2025/3308", {nom: "Yusupova Nodira Alisherovna", tur: "Jismoniy shaxs"}, "IP-2023/3308", "Ipoteka krediti", 330.0, 312.4, "Sergeli tumanlararo fuqarolik ishlari sudi", "2-0908/2026"],
      ["UI-2025/0755", "AK-2023/0755", {nom: "«Bo'ston Agro» fermer xo'jaligi", tur: "Yuridik shaxs"}, "AG-2022/0755", "Agrokredit", 950.0, 890.0, "Toshkent viloyat iqtisodiy sudi", "4-0733/2023"],
      ["UI-2026/0141", "AK-2026/0141", {nom: "Rasulov Otabek Farhodovich", tur: "Jismoniy shaxs"}, "MQ-2025/0141", "Mikroqarz", 40.0, 38.6, null, null]
    ];
    YOPILGAN.forEach(([id, aktivId, qarzdor, shRaqam, shTur, berilgan, yopilgan, sud, qaror]) => {
      const a = D.topish(aktivId);
      if (!a) return;
      const qabul = a.balans.sana;
      UNDIRUV_ISHLAR.push({
        id, holat: "yopilgan", bosqich: "qabul",
        qarzdor: Object.assign({stirYokiPinfl: null, tel: null}, qarzdor),
        shartnoma: {raqam: shRaqam, tur: shTur, sana: null, berilgan},
        qarz: {asosiy: yopilgan, foiz: 0, jami: yopilgan, kechikishKun: null},
        garov: {nom: a.qisqa, tur: a.tur, rasmTuri: a.rasmTuri, hudud: a.hudud, manzil: a.manzil, bahoMln: a.qiymat.bozor, garovShartnoma: null},
        filial: a.filial, filialKod: a.filialKod, masul: "Sobirov Ulug'bek", advokatId: sud ? "AD-0" + (1 + UNDIRUV_ISHLAR.length % 5) : null,
        sud: sud ? {nomi: sud, ishRaqami: qaror} : null,
        qaror: qaror ? {raqam: qaror, sana: a.balans.asosHujjat.sana} : null,
        ijro: sud ? {raqam: "IH-" + qaror.split("/")[1] + "/" + id.slice(-4), mibIjrochi: null, sana: a.balans.asosHujjat.sana} : null,
        muddat: null,
        tarix: [{sana: qabul, voqea: "Garov balansga qabul qilindi", izoh: "Aktiv " + aktivId + " yaratildi, ish yopildi."}],
        hujjatlar: [],
        aktivId, yopilganSana: qabul
      });
    });

    /* ---------- Faol ishlar: 40 ta, bosqichlar bo'yicha ---------- */
    const QARZDOR_JIS = ["Islomov Bekzod", "Nazarova Malika", "Qodirov Alisher", "Sattorova Gulnoza", "Umarov Doniyor",
      "Hakimova Zulfiya", "Ochilov Sanjar", "Yo'ldosheva Sevara", "Aliyev Rustam", "Nurmatova Kamola", "Xolmatov Jasur",
      "Ibrohimova Nilufar", "Tursunov Farrux", "Mirzayeva Gulbahor", "Abdullayev Aziz", "Sharipova Nodira"];
    const QARZDOR_YUR = ["«Baraka Savdo» MChJ", "«Oq Tepa Servis» MChJ", "«Chust Textile» QK", "«Farovon Market» MChJ",
      "«Nurli Yo'l» QK", "«Sharq Logistika» MChJ", "«Temir Konstruksiya» MChJ", "«Mehr Oziq-ovqat» MChJ",
      "«Zamin Qurilish» MChJ", "«Sifat Print» MChJ"];
    const KREDIT_TUR = ["Mikroqarz", "Tadbirkorlik krediti", "Iste'mol krediti", "Ipoteka krediti", "Agrokredit", "Avtokredit"];
    const GAROVLAR = [
      ["Ma'muriy bino", "Noturar bino", "mamuriy"], ["Savdo do'koni", "Noturar bino", "dokon"], ["Omborxona", "Noturar bino", "ombor"],
      ["Tikuvchilik sexi", "Noturar bino", "sex"], ["Parrandachilik binosi", "Noturar bino", "ferma"], ["Issiqxona majmuasi", "Noturar bino", "issiqxona"],
      ["Ko'p qavatli uydagi xonadon", "Turar joy", "kopqavat"], ["Hovli-joy", "Turar joy", "uy"],
      ["Chevrolet Cobalt", "Transport vositasi", "avto"], ["Isuzu yuk avtomobili", "Transport vositasi", "yuk"],
      ["Un tortish liniyasi", "Asbob-uskuna", "uskuna"]];
    const HUDUDLAR = [["Toshkent sh.", "TS", "Toshkent shahar BXO", "TS-01"], ["Toshkent sh.", "TS", "Chilonzor BXM", "TS-03"],
      ["Toshkent vil.", "TV", "Toshkent viloyat BXO", "TV-01"], ["Samarqand", "SA", "Samarqand BXO", "SA-01"],
      ["Farg'ona", "FA", "Farg'ona BXO", "FA-01"], ["Namangan", "NA", "Namangan BXO", "NA-01"], ["Andijon", "AN", "Andijon BXO", "AN-01"],
      ["Buxoro", "BU", "Buxoro BXO", "BU-01"], ["Qashqadaryo", "QA", "Qarshi BXO", "QA-01"]];
    const SUDLAR = ["Toshkent shahar iqtisodiy sudi", "Yunusobod tumanlararo fuqarolik ishlari sudi", "Toshkent viloyat iqtisodiy sudi",
      "Samarqand viloyat iqtisodiy sudi", "Farg'ona tumanlararo fuqarolik ishlari sudi", "Namangan viloyat iqtisodiy sudi"];
    const YURISTLAR = ["Sobirov Ulug'bek", "Rahimov Bekzod"];
    const TAQSIMOT = [["ogohlantirish", 8], ["davo", 8], ["sud", 10], ["qaror", 6], ["ijro", 8]];
    const BOSQ_TARTIB = D.UNDIRUV_BOSQICHLAR.map(b => b.kalit);
    let n = 0;
    TAQSIMOT.forEach(([bosqich, soni]) => {
      for (let k = 0; k < soni; k++) {
        n++;
        const yur = rnd() < 0.45;
        const qarzdorNom = yur ? tanla(QARZDOR_YUR) : tanla(QARZDOR_JIS);
        const [garovNom, garovTur, rasmTuri] = tanla(GAROVLAR);
        const [hudud, hududKod, filial, filialKod] = tanla(HUDUDLAR);
        const berilgan = oraliq(40, 2400);
        const asosiy = Math.round(berilgan * (0.55 + rnd() * 0.35) * 10) / 10;
        const foiz = Math.round(asosiy * (0.06 + rnd() * 0.16) * 10) / 10;
        const bIndeks = BOSQ_TARTIB.indexOf(bosqich);
        const kechikish = [oraliq(35, 90), oraliq(90, 160), oraliq(150, 300), oraliq(260, 420), oraliq(380, 620)][bIndeks];
        const id = "UI-2026/" + String(500 + n * 7).padStart(4, "0");
        const sud = bIndeks >= 2 ? tanla(SUDLAR) : null;
        const qarorRaqam = bIndeks >= 3 ? (yur ? "4-" : "2-") + oraliq(1000, 1999) + "/2026" : null;
        const tarix = [{sana: nisbiy(-kechikish + oraliq(25, 35)), voqea: "Yozma ogohlantirish yuborildi", izoh: "Qarzdorga rasmiy talabnoma topshirildi."}];
        if (bIndeks >= 1) tarix.push({sana: nisbiy(-kechikish + oraliq(70, 100)), voqea: "Da'vo arizasi berildi", izoh: ""});
        if (bIndeks >= 2) tarix.push({sana: nisbiy(-kechikish + oraliq(110, 140)), voqea: "Sud ish yuritishni boshladi", izoh: sud});
        if (bIndeks >= 3) tarix.push({sana: nisbiy(-oraliq(20, 60)), voqea: "Sud qarori qabul qilindi", izoh: qarorRaqam});
        if (bIndeks >= 4) tarix.push({sana: nisbiy(-oraliq(3, 18)), voqea: "Ijro varaqasi MIBga topshirildi", izoh: ""});
        const muddatKun = oraliq(3, 45);
        const MUDDAT_IZOH = ["Talabnomaga javob muddati", "Da'vo arizasini ko'rib chiqish", "Navbatdagi sud majlisi",
          "Apellyatsiya muddati tugaydi", "Garovni realizatsiya yoki balansga qabul qarori"];
        UNDIRUV_ISHLAR.push({
          id, holat: "faol", bosqich,
          qarzdor: {nom: qarzdorNom, tur: yur ? "Yuridik shaxs" : "Jismoniy shaxs",
            stirYokiPinfl: yur ? "STIR " + oraliq(200, 599) + " " + oraliq(100, 999) + " " + oraliq(100, 999)
                               : "PINFL " + oraliq(3000, 5999) + " " + oraliq(1000, 9999) + " " + oraliq(1000, 9999),
            tel: "+998 " + tanla(["90", "93", "94", "97", "99"]) + " " + oraliq(100, 999) + " " + oraliq(10, 99) + " " + oraliq(10, 99)},
          shartnoma: {raqam: "KR-" + (2023 + (n % 3)) + "/" + oraliq(1000, 9999), tur: tanla(KREDIT_TUR),
            sana: nisbiy(-kechikish - oraliq(200, 900)), berilgan},
          qarz: {asosiy, foiz, jami: Math.round((asosiy + foiz) * 10) / 10, kechikishKun: kechikish},
          garov: {nom: garovNom, tur: garovTur, rasmTuri, hudud, manzil: hudud, bahoMln: Math.round((asosiy + foiz) * (0.9 + rnd() * 0.9)),
            garovShartnoma: "GSH-" + oraliq(1000, 9999)},
          filial, filialKod, masul: tanla(YURISTLAR), advokatId: bIndeks >= 1 ? D.ADVOKATLAR[n % D.ADVOKATLAR.length].id : null,
          sud: sud ? {nomi: sud, ishRaqami: (yur ? "4-" : "2-") + oraliq(100, 999) + "/2026"} : null,
          qaror: qarorRaqam ? {raqam: qarorRaqam, sana: tarix[3] ? tarix[3].sana : null} : null,
          ijro: bIndeks >= 4 ? {raqam: "IH-2026/" + oraliq(1000, 9999), mibIjrochi: tanla(["Karimov A.", "Nazarov B.", "Olimov S."]), sana: tarix[4].sana} : null,
          muddat: {sana: nisbiy(muddatKun), izoh: MUDDAT_IZOH[bIndeks]},
          tarix,
          hujjatlar: [{tur: "Kredit shartnomasi", nom: "Kredit shartnomasi", sana: null},
                      {tur: "Garov shartnomasi", nom: "Garov shartnomasi", sana: null}]
            .concat(bIndeks >= 1 ? [{tur: "Da'vo arizasi", nom: "Da'vo arizasi", sana: tarix[1].sana}] : [])
            .concat(bIndeks >= 3 ? [{tur: "Sud qarori", nom: "Sud qarori " + qarorRaqam, sana: tarix[3].sana}] : []),
          aktivId: null, yopilganSana: null
        });
      }
    });

    /* ---------- Sud majlislari ---------- */
    const ZALLAR = ["1-zal", "2-zal", "4-zal", "6-zal"];
    const SOATLAR = ["09:30", "11:00", "14:30", "16:00"];
    let m = 0;
    UNDIRUV_ISHLAR.filter(i => i.holat === "faol" && ["sud", "qaror", "ijro"].indexOf(i.bosqich) >= 0).forEach((ish, i) => {
      const avvalgi = oraliq(12, 60);
      const adv = D.ADVOKATLAR.find(a => a.id === ish.advokatId) || D.ADVOKATLAR[0];
      m++;
      SUD_MAJLISLAR.push({id: "SM-2026/" + String(140 + m).padStart(4, "0"), ishId: ish.id, sud: ish.sud.nomi,
        sana: ishKuni(-avvalgi), soat: SOATLAR[i % 4], zal: ZALLAR[i % 4], advokatId: adv.id, advokat: adv.ism,
        mavzu: "Dalillarni o'rganish", holat: "otkazildi", natija: "Keyingi majlis belgilandi"});
      if (ish.bosqich === "sud") {
        m++;
        SUD_MAJLISLAR.push({id: "SM-2026/" + String(140 + m).padStart(4, "0"), ishId: ish.id, sud: ish.sud.nomi,
          sana: ishKuni(oraliq(2, 40)), soat: SOATLAR[(i + 1) % 4], zal: ZALLAR[(i + 2) % 4], advokatId: adv.id, advokat: adv.ism,
          mavzu: tanla(["Asosiy muhokama", "Qaror e'lon qilish"]), holat: "rejada", natija: ""});
      }
    });

    /* ---------- Restrukturizatsiya arizalari (dastlabki bosqichlar) ---------- */
    UNDIRUV_ISHLAR.filter(i => i.holat === "faol" && ["ogohlantirish", "davo"].indexOf(i.bosqich) >= 0).forEach((ish, i) => {
      if (i % 3) return;
      RESTRUKTURIZATSIYA.push({id: "RS-2026/" + String(18 + i).padStart(4, "0"), ishId: ish.id,
        taklif: tanla(["Muddatni 18 oyga uzaytirish", "Yangi to'lov jadvali", "Imtiyozli davr, 6 oy"]),
        sana: nisbiy(-oraliq(3, 40)), holat: tanla(["korib chiqilmoqda", "kelishilgan", "rad etilgan"]), izoh: ""});
    });

    /* ---------- Qarzdor bilan muloqot ---------- */
    const KANAL = ["Telefon", "SMS", "Yozma talabnoma", "Uchrashuv"];
    const NATIJA = ["To'lov jadvali muhokama qilindi", "Aloqaga chiqmadi", "Rasmiy talabnoma topshirildi",
      "Qisman to'lov va'da qilindi", "Garovni ixtiyoriy topshirishga rozilik bildirildi"];
    UNDIRUV_ISHLAR.filter(i => i.holat === "faol").forEach((ish, i) => {
      const soni = oraliq(1, 3);
      for (let k = 0; k < soni; k++)
        MULOQOTLAR.push({id: "ML-" + ish.id.slice(3).replace("/", "-") + "-" + (k + 1), ishId: ish.id,
          sana: nisbiy(-oraliq(1, 60)), kanal: tanla(KANAL), natija: tanla(NATIJA)});
    });
  }

  D.UNDIRUV_ISHLAR = UNDIRUV_ISHLAR;
  D.SUD_MAJLISLAR = SUD_MAJLISLAR;
  D.RESTRUKTURIZATSIYA = RESTRUKTURIZATSIYA;
  D.MULOQOTLAR = MULOQOTLAR;

  D.undiruvIshi = id => D.UNDIRUV_ISHLAR.find(i => i.id === id) || null;
  D.ishBoyicha = D.undiruvIshi;
  D.ishMajlislari = id => D.SUD_MAJLISLAR.filter(s => s.ishId === id);
  D.ishMuloqoti = id => D.MULOQOTLAR.filter(s => s.ishId === id);
  D.advokat = id => D.ADVOKATLAR.find(a => a.id === id) || null;
  /* Faol undiruv kesimi (panel va yurist paneli uchun) */
  D.undiruvJamlama = function () {
    const faol = D.UNDIRUV_ISHLAR.filter(i => i.holat === "faol");
    const bosqichlar = D.UNDIRUV_BOSQICHLAR.map(b => ({kalit: b.kalit, nom: b.nom, rang: b.rang,
      son: faol.filter(i => i.bosqich === b.kalit).length,
      summa: Math.round(faol.filter(i => i.bosqich === b.kalit).reduce((s, i) => s + i.qarz.jami, 0) * 10) / 10}));
    return {faol: faol.length, yopilgan: D.UNDIRUV_ISHLAR.length - faol.length,
      qarzJami: Math.round(faol.reduce((s, i) => s + i.qarz.jami, 0) * 10) / 10,
      rejadagiMajlis: D.SUD_MAJLISLAR.filter(s => s.holat === "rejada").length, bosqichlar};
  };
})();
