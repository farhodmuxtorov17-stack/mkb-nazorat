"use strict";
/* ============================================================
   Jonli namuna qatlami (yadro/jonli.js): hisoblar, MQTT paketlari,
   kamera ro'yxati va sahifalarga ulanishi. Brauzer va internet kerak emas.

       node tests/jonli.test.js
   ============================================================ */
const fs = require("fs"), path = require("path"), vm = require("vm");
const ILDIZ = path.join(__dirname, "..");
const matn = f => fs.readFileSync(path.join(ILDIZ, f), "utf8");
const S = require(path.join(ILDIZ, "yadro", "jonli.js"));

let otdi = 0, yiqildi = 0;
function tekshir(nom, fn){
  try { fn(); otdi++; console.log("  [OK]   " + nom); }
  catch (e) { yiqildi++; console.log("  [XATO] " + nom + "\n         " + e.message); }
}
function talab(shart, xabar){ if (!shart) throw new Error(xabar); }
const teng = (a, b, xabar) => talab(a === b, (xabar || "") + " kutilgan " + JSON.stringify(b) + ", chiqdi " + JSON.stringify(a));

console.log("\n1. Quyosh va akkumulyator");
tekshir("taqdimotdagi 1-profil: dekabr 1,62 → 104 Vt, iyun 7,60 → 22 Vt, akkumulyator 450 Vt·soat", () => {
  const d = S.quvvatHisobi(1.62), i = S.quvvatHisobi(7.60);
  teng(d.panelVt, 104, "dekabr paneli"); teng(i.panelVt, 22, "iyun paneli");
  teng(d.akkumulyatorVtSoat, 450, "akkumulyator"); teng(d.tiklashVtSoat, 45, "tiklash ulushi");
  teng(S.quvvatHisobi(0), null, "nol nurlanish"); teng(S.quvvatHisobi(NaN), null, "son emas");
});
tekshir("22 Vt panel dekabrda sutkasiga 25 Vt·soat beradi (PR 0,7)", () => {
  teng(S.quyoshHosili(1.62, 22), 25);
  teng(S.quyoshHosili(5.24), Math.round(104 * 5.24 * 0.7), "standart panel");
  teng(S.quyoshHosili(null), null, "ma'lumot yo'q");
});
tekshir("litiy akkumulyator 0 °C dan past zaryad olmaydi", () => {
  teng(S.zaryad(-3).toxtatilgan, true, "−3 °C");
  teng(S.zaryad(-0.1).toxtatilgan, true, "−0,1 °C");
  teng(S.zaryad(0).toxtatilgan, false, "0 °C");
  teng(S.zaryad(12).toxtatilgan, false, "12 °C");
  teng(S.zaryad(undefined), null, "harorat yo'q");
});
tekshir("MJ/m² kVt·soat/m² ga o'tadi (3,6 ga bo'linadi)", () => {
  teng(Math.round(S.mjdanKvt(18.87) * 100) / 100, 5.24); teng(S.mjdanKvt(null), null);
});

console.log("\n2. Navbatdan tashqari ko'rik asosi");
tekshir("chegaradan o'tsa asos bor, chegaraning o'zida yo'q", () => {
  teng(S.korikAsoslari({shamolMaks: 72, yoginJami: 20, haroratMin: -10}).length, 0, "chegara qiymatlari");
  const r = S.korikAsoslari({shamolMaks: 80, yoginJami: 25.4, haroratMin: -12});
  teng(r.map(x => x.kalit).join(","), "shamol,yogin,sovuq");
  teng(S.korikAsoslari(null).length, 0, "prognoz yo'q");
});
tekshir("ekrandagi son: −0,4 °C «−0» bo'lmaydi, chegaradan o'tgan qiymat chegaradan farqli ko'rinadi", () => {
  teng(S.sonMatn(-0.4, 1), "−0,4", "−0,4 bir kasr bilan");
  teng(S.sonMatn(-0.4, 0), "0", "butungacha yaxlitlangan −0,4");
  teng(S.sonMatn(-3.46, 1), "−3,5", "manfiy son");
  teng(S.sonMatn(undefined), "—", "son yo'q");
  const a = S.korikAsoslari({shamolMaks: 72.4})[0];
  talab(a && S.sonMatn(a.qiymat, 1) !== S.sonMatn(a.chegara, 1), "72,4 zarb chegara (72) bilan bir xil ko'rinmoqda");
  /* Chiplar bir kasr bilan chiqadi: Open-Meteo harorat va zarbni bir kasr bilan beradi */
  const j = matn("yadro/jonli.js");
  talab(/asosChip = a => [^\n]*son\(a\.qiymat, 1\)/.test(j), "asos chipi yaxlitlab ko'rsatmoqda");
  talab((j.match(/Zaryad [^\n]*son\(h\.harorat, 1\)/g) || []).length === 2, "zaryad chipi yaxlitlab ko'rsatmoqda");
});
tekshir("24 soatlik xulosa: eng katta zarb, jami yog'in, eng past harorat", () => {
  const soat = {wind_gusts_10m: [10, 90, 30], precipitation: [0.4, 1.2, null, 3], temperature_2m: [-2, -11.5, 4]};
  const x = S.kunlikXulosa(soat);
  teng(x.shamolMaks, 90); teng(x.yoginJami, 4.6); teng(x.haroratMin, -11.5);
  teng(S.kunlikXulosa({}), null, "bo'sh prognoz");
  const uzun = {temperature_2m: Array.from({length: 48}, (_, i) => i === 30 ? -40 : 5)};
  teng(S.kunlikXulosa(uzun).haroratMin, 5, "25-soatdan keyingisi hisobga olinmaydi");
});

console.log("\n3. Maxfiylik va kesh");
tekshir("tashqariga koordinata 0,1° aniqlikda chiqadi", () => {
  teng(S.koordinata(41.3516, 69.2856).join(","), "41.4,69.3");
  teng(S.koordinata("39.654", "66.975").join(","), "39.7,67");
});
tekshir("kesh 15 daqiqadan keyin eskiradi, kelajakdagi vaqt ham eskirgan", () => {
  const h = Date.now();
  teng(S.eskirganmi(h - 14 * 60e3, h), false); teng(S.eskirganmi(h - 16 * 60e3, h), true);
  teng(S.eskirganmi(h + 5 * 60e3, h), true); teng(S.eskirganmi(undefined, h), true);
});

console.log("\n4. MQTT 3.1.1 paketlari");
const hex = u => Buffer.from(u).toString("hex");
tekshir("CONNECT: protokol MQTT, 4-daraja, toza sessiya, 60 s", () => {
  teng(hex(S.mqtt.ulanish("ab", 60)), "100e00044d5154540402003c00026162");
});
tekshir("SUBSCRIBE: 0x82, paket ID, mavzu, QoS 0", () => {
  teng(hex(S.mqtt.obuna(1, "a/b")), "82080001000361" + "2f62" + "00");
});
tekshir("PUBLISH QoS 0 va qoldiq uzunligi 127 dan katta bo'lsa ikki bayt", () => {
  teng(hex(S.mqtt.nashr("t", "x")), "300400017478");
  const katta = S.mqtt.nashr("t", "x".repeat(200));
  teng(katta[1], 203 % 128 | 128, "1-bayt"); teng(katta[2], 1, "2-bayt");
  const r = S.mqtt.ajrat(katta);
  teng(r.paketlar[0].matn.length, 200); teng(r.qoldiq.length, 0);
});
tekshir("oqim bo'lib kelsa chala paket keyingi bo'lakkacha kutadi", () => {
  const p = S.mqtt.nashr("mkb/x", '{"a":1}');
  const r1 = S.mqtt.ajrat(p.slice(0, 5));
  teng(r1.paketlar.length, 0); teng(r1.qoldiq.length, 5);
  const bir = new Uint8Array([...r1.qoldiq, ...p.slice(5), 0x20, 2, 0, 0, 0x90, 3, 0, 1, 0, 0xD0, 0]);
  const r2 = S.mqtt.ajrat(bir);
  teng(r2.paketlar.map(x => x.tur).join(","), "publish,connack,suback,pingresp");
  teng(r2.paketlar[0].mavzu, "mkb/x"); teng(r2.paketlar[1].kod, 0); teng(r2.paketlar[2].id, 1);
});
tekshir("QoS 1 bilan kelgan PUBLISH dagi paket ID matnga qo'shilmaydi", () => {
  const u = new Uint8Array([0x32, 7, 0, 1, 0x74, 0, 9, 0x68, 0x69]);
  const r = S.mqtt.ajrat(u);
  teng(r.paketlar[0].mavzu, "t"); teng(r.paketlar[0].matn, "hi");
});

console.log("\n5. Qurilma xabari");
tekshir("xabar platforma sxemasida, obyekt maydoni bo'sh, namuna belgisi bor", () => {
  const v = S.voqea({qurilmaId: "SINOV-3F9C", tur: "eshik-datchigi", hodisa: "Eshik ochildi", jiddiylik: "o'rta", hozir: 1});
  teng(v.sxema, S.SXEMA); teng(v.obyektId, null); teng(v.namuna, true); teng(v.batareya, null);
  talab(S.voqeaTekshir(v), "o'z xabari tekshiruvdan o'tmadi");
});
tekshir("begona yoki buzilgan xabar rad etiladi", () => {
  const v = S.voqea({qurilmaId: "SINOV-1", tur: "x", hodisa: "y", hozir: 5});
  [null, "matn", {}, Object.assign({}, v, {sxema: "boshqa"}), Object.assign({}, v, {namuna: false}),
    Object.assign({}, v, {hodisa: "a".repeat(121)}), Object.assign({}, v, {yuborildi: "5"}), Object.assign({}, v, {qurilmaId: 7})]
    .forEach((x, i) => talab(!S.voqeaTekshir(x), i + "-holat o'tib ketdi"));
});
tekshir("mavzu faqat hex belgilardan: boshqa belgi yoki joker kirmaydi", () => {
  teng(S.mavzu("ab#+/zz09"), "mkb-nazorat/namuna/ab09");
  talab(!/[#+]/.test(S.mavzu("#")), "joker qoldi");
});

console.log("\n6. Kamera ro'yxati va sahifalar");
const R = JSON.parse(matn("assets/jonli/kameralar.json"));
tekshir("kameralar.json: har yozuvda egasi, havola, shartlar, sana va ruxsat etilgan tur", () => {
  talab(/^\d{2}\.\d{2}\.\d{4}$/.test(R.tekshirildi), "tekshiruv sanasi yo'q");
  (R.kameralar || []).forEach(k => {
    ["nom", "egasi", "havola", "shartlar", "tekshirildi"].forEach(m => talab(String(k[m] || "").trim(), k.nom + ": " + m + " yo'q"));
    talab(k.tur === "youtube" && /^[A-Za-z0-9_-]{11}$/.test(k.videoId) || k.tur === "youtube-kanal" && /^UC[A-Za-z0-9_-]{22}$/.test(k.kanalId) ||
      k.tur === "rasm" && /^https:\/\/volcanoes\.usgs\.gov\/[\w/.-]+\.jpe?g$/i.test(k.rasm), k.nom + ": tur noto'g'ri");
  });
  (R.rad_etilgan || []).forEach(k => talab(k.nom && k.sabab && k.tekshirildi, "rad etilgan yozuv to'liq emas: " + k.nom));
});
tekshir("himoyasiz kamera kataloglari va skaner manbalari hech qayerda ishlatilmaydi", () => {
  const taqiq = /insecam|shodan\.io|opentopia|earthcam\.net\/cams\/ip|:554\b|rtsp:\/\//i;
  ["yadro/jonli.js", "assets/jonli/kameralar.json"].forEach(f => talab(!taqiq.test(matn(f).replace(/Shodan, Insecam|Insecam, Shodan/g, "")), f));
  (R.kameralar || []).forEach(k => talab(!taqiq.test(JSON.stringify(k)), k.nom));
});
tekshir("jonli.js faqat ro'yxatdagi tashqi manzillarga murojaat qiladi", () => {
  const ruxsat = ["api.open-meteo.com", "open-meteo.com", "power.larc.nasa.gov", "test.mosquitto.org", "broker.emqx.io", "www.emqx.com", "www.youtube-nocookie.com", "volcanoes.usgs.gov"];
  const manzillar = [...matn("yadro/jonli.js").matchAll(/(?:https|wss):\/\/([a-z0-9.-]+)/gi)].map(m => m[1].toLowerCase());
  talab(manzillar.length >= 5, "manzil topilmadi");
  const begona = manzillar.filter(h => ruxsat.indexOf(h) < 0);
  talab(!begona.length, "begona manzil: " + begona.join(", "));
});
tekshir("sahifalar jonli.js ni amal.js dan keyin, bir xil kalit bilan yuklaydi", () => {
  ["himoya.html", "qurilmalar.html", "qurilma.html", "obyekt-himoya.html"].forEach(f => {
    const t = matn(f);
    const a = t.indexOf('src="yadro/amal.js'), j = t.indexOf('src="yadro/jonli.js');
    talab(a > 0 && j > a, f + ": tartib buzilgan");
    const v = [...t.matchAll(/\?v=(\d+)/g)].map(m => m[1]);
    talab(new Set(v).size === 1, f + ": turli kalit");
  });
});
tekshir("monitoring markazida signalsiz 'kadr beradi' yoki 'onlayn' yozuvi qolmagan", () => {
  const t = matn("himoya.html") + matn("obyekt-himoya.html");
  talab(!/Kadr beradi|Kadr beradigan|"Onlayn"|Qurilmalar onlayn/.test(t), "eski yozuv topildi");
  talab(/Ochishga ruxsatni qayd etish/.test(matn("himoya.html")), "eshik amali qurilma sahifasidagi nom bilan bir xil emas");
});
tekshir("jonli.js DOMsiz yuklanadi va sof qismni beradi", () => {
  const ctx = {window: {}, TextEncoder, TextDecoder};
  vm.runInNewContext(matn("yadro/jonli.js"), ctx);
  talab(ctx.window.MKB_JONLI_SOF && typeof ctx.window.MKB_JONLI_SOF.quvvatHisobi === "function", "MKB_JONLI_SOF yo'q");
});

console.log("\nYakun: o'tdi " + otdi + ", yiqildi " + yiqildi + ", jami " + (otdi + yiqildi));
process.exit(yiqildi ? 1 : 0);
