/* ============================================================
   REST server tekshiruvi: node tests/server.test.js
   Server shu jarayonning o'zida ko'tariladi (8791-port): sessiya
   muddatini tekshirish uchun soat (Date.now) vaqtincha suriladi.
   Ombor: server/malumotlar/shartli (namoyish). Sinov yozuvlari
   oxirida o'chiriladi yoki asl qiymatiga qaytariladi.
   ============================================================ */
"use strict";
const path = require("path");
const {Writable} = require("stream");

const PORT = 8791;
const PAROL = "sinov-parol-8791";
process.env.MKB_PAROL = PAROL;
process.env.MKB_BUGUN = process.env.MKB_BUGUN || "2026-09-21";
const {server, urugla, omborOl} = require(path.join(__dirname, "..", "server", "server.js"));
const fs = require("fs");
const ASOS = "http://127.0.0.1:" + PORT;

let otdi = 0, yiqildi = 0;
function tekshir(nom, shart, izoh){
  if (shart){ otdi++; console.log("  [OK]   " + nom); }
  else { yiqildi++; console.log("  [XATO] " + nom + (izoh ? "\n         " + izoh : "")); }
}

/* Tarmoqqa chiqmasdan so'rov: tashqi manzildan kelgan so'rovni taqlid qilish uchun */
function ichkiSorov(url, manzil){
  return new Promise(hal => {
    const res = new Writable({write(_c, _e, cb){ cb(); }});
    res.holat = 0;
    res.headersSent = false;
    res.writeHead = kod => { res.holat = kod; res.headersSent = true; return res; };
    const tugat = res.end.bind(res);
    res.end = (...a) => { tugat(...a); hal(res.holat); return res; };
    res.on("finish", () => hal(res.holat));
    server.emit("request", {url, method: "GET", headers: {}, socket: {remoteAddress: manzil}, on(){ }}, res);
  });
}

async function kirish(login, parol, qoshimcha){
  const r = await fetch(ASOS + "/api/kirish", {method: "POST", headers: {"Content-Type": "application/json"},
    body: JSON.stringify(Object.assign({login, parol}, qoshimcha || {}))});
  return {status: r.status, j: await r.json().catch(() => ({}))};
}

(async () => {
  urugla();
  await new Promise(hal => server.listen(PORT, "127.0.0.1", hal));
  const tozalash = [];
  const qabulSinov = {aktivlar: [], koriklar: [], ishOzg: null};
  try{
    const salom = await fetch(ASOS + "/api/salomat").then(r => r.json()).catch(() => ({}));
    tekshir("server ko'tarildi (salomat)", salom.holat === "ok");

    /* ---------- sessiya ---------- */
    tekshir("sessiyasiz so'rov 401 qaytaradi", (await fetch(ASOS + "/api/yozuvlar")).status === 401);
    const adm = await kirish("o.ismoilov", PAROL);
    tekshir("kirish token beradi, rol hisobdan olinadi", !!adm.j.token && adm.j.rol === "Administrator");
    const bosh = {"X-Sessiya": adm.j.token, "Content-Type": "application/json"};
    const ol = (yol, h) => fetch(ASOS + yol, {headers: h || bosh});

    const asl = Date.now;
    Date.now = () => asl() + 9 * 3600 * 1000;           /* 8 soatlik muddatdan keyin */
    let kechikkan;
    try{ kechikkan = (await ol("/api/yozuvlar")).status; } finally { Date.now = asl; }
    tekshir("sessiya muddati tugagach 401", kechikkan === 401, "holat: " + kechikkan);
    const qayta = await kirish("o.ismoilov", PAROL);
    const b2 = {"X-Sessiya": qayta.j.token, "Content-Type": "application/json"};
    const ol2 = yol => fetch(ASOS + yol, {headers: b2});

    /* ---------- o'qish ---------- */
    const yoz = await ol2("/api/yozuvlar").then(r => r.json());
    tekshir("reyestr to'liq keladi (200 dan ortiq aktiv)", Array.isArray(yoz) && yoz.length >= 200);
    tekshir("aktiv yozuvida kredit maydonlari yo'q", Array.isArray(yoz) && yoz.every(y => y.qarz === undefined && y.tasnif === undefined));
    const id = yoz[0].id;
    const bitta = await ol2("/api/yozuvlar/" + encodeURIComponent(id)).then(r => r.json());
    tekshir("bitta yozuv id bo'yicha keladi", bitta.id === id);
    const polis = await ol2("/api/polislar");
    const polisJ = await polis.json();
    tekshir("POLISLAR taxallusi 200 va ro'yxat qaytaradi", polis.status === 200 && Array.isArray(polisJ) && polisJ.length > 0);
    const ishlar = await ol2("/api/undiruv_ishlar").then(r => r.json());
    tekshir("UNDIRUV_ISHLAR alohida to'plam sifatida o'qiladi", Array.isArray(ishlar) && ishlar.length > 0 && ishlar.every(i => /^UI-/.test(i.id)));

    /* ---------- PATCH ---------- */
    const eskiIzoh = bitta.izoh == null ? "" : bitta.izoh;
    const patch = (yol, tana) => fetch(ASOS + yol, {method: "PATCH", headers: b2, body: JSON.stringify(tana)});
    const noma = await patch("/api/yozuvlar/" + encodeURIComponent(id), {sinovBelgi: "ha"});
    tekshir("noma'lum maydon uchun PATCH 400", noma.status === 400);
    const turi = await patch("/api/yozuvlar/" + encodeURIComponent(id), {balans: {qiymat: -5}});
    tekshir("noto'g'ri balans qiymati uchun PATCH 400", turi.status === 400);
    const holat = await patch("/api/yozuvlar/" + encodeURIComponent(id), {holat: "Musodara qilingan"});
    tekshir("ro'yxatda yo'q holat uchun PATCH 400", holat.status === 400);
    const eski = await patch("/api/yozuvlar/" + encodeURIComponent(id), {rasm: "assets/obyekt/ombor-1.svg"});
    tekshir("eski chizma yo'li rad etiladi", eski.status === 400);
    const p = await patch("/api/yozuvlar/" + encodeURIComponent(id), {izoh: "sinov izohi"}).then(r => r.json());
    tekshir("PATCH ruxsat etilgan maydonni saqlaydi", p.izoh === "sinov izohi");
    const q2 = await ol2("/api/yozuvlar/" + encodeURIComponent(id)).then(r => r.json());
    tekshir("o'zgarish qayta o'qilganda saqlangan", q2.izoh === "sinov izohi");
    await patch("/api/yozuvlar/" + encodeURIComponent(id), {izoh: eskiIzoh});

    /* ---------- POST va DELETE ---------- */
    const yangi = await fetch(ASOS + "/api/mening_vazifalarim", {method: "POST", headers: b2,
      body: JSON.stringify({nom: "Sinov vazifasi", tur: "sinov", sana: "21.09.2026", bajarildi: false})});
    const yJ = await yangi.json();
    tekshir("POST yangi yozuv yaratadi (201)", yangi.status === 201 && !!yJ.id, JSON.stringify(yJ));
    if (yJ.id){
      tozalash.push(yJ.id);
      const del = await fetch(ASOS + "/api/mening_vazifalarim/" + encodeURIComponent(yJ.id), {method: "DELETE", headers: b2});
      tekshir("DELETE yozuvni o'chiradi", del.status === 200);
      const keyin = await ol2("/api/mening_vazifalarim/" + encodeURIComponent(yJ.id));
      tekshir("o'chirilgan yozuv 404 qaytaradi", keyin.status === 404);
      const royxat = await ol2("/api/mening_vazifalarim").then(r => r.json());
      tekshir("o'chirilgan yozuv ro'yxatda ko'rinmaydi", !royxat.some(x => x.id === yJ.id));
    }
    const sanaXato = await fetch(ASOS + "/api/mening_vazifalarim", {method: "POST", headers: b2,
      body: JSON.stringify({nom: "Sinov", sana: "31.02.2026x"})});
    tekshir("o'qilmaydigan sana bilan POST 400", sanaXato.status === 400);

    /* ---------- rollar ---------- */
    const yur = await kirish("u.sobirov", PAROL);
    tekshir("yurist hisobi bilan kirish ishlaydi", !!yur.j.token && yur.j.rol === "Yurist");
    const by = {"X-Sessiya": yur.j.token};
    tekshir("amallar jurnali yuristga yopiq (403)", (await ol("/api/amallar", by)).status === 403);
    tekshir("yopiq bo'lim to'plami 403 qaytaradi", (await ol("/api/qurilmalar", by)).status === 403);
    tekshir("undiruv bo'limi yuristga ochiq (200)", (await ol("/api/sud_majlislar", by)).status === 200);
    tekshir("noto'g'ri parol 401 qaytaradi", (await kirish("u.sobirov", "noto'g'ri")).status === 401);
    tekshir("noma'lum login 401 qaytaradi", (await kirish("mavjud-emas", PAROL)).status === 401);
    /* Rahbariyat kirish so'rovini tasdiqlaydi (mijozda himoya: "ot"): so'rov, ruxsat va tashrif to'plamlariga yozadi */
    const rah = await kirish("a.rahmonov", PAROL);
    const br = {"X-Sessiya": rah.j.token, "Content-Type": "application/json"};
    const sorovlar = await ol("/api/kirish_sorovlari", br).then(r => r.json()).catch(() => []);
    const sorov = Array.isArray(sorovlar) ? sorovlar[0] : null;
    const rahPatch = sorov ? await fetch(ASOS + "/api/kirish_sorovlari/" + encodeURIComponent(sorov.id),
      {method: "PATCH", headers: br, body: JSON.stringify({holat: sorov.holat})}) : null;
    tekshir("rahbariyat kirish so'rovi holatini yoza oladi (himoya: tasdiq)", !!rahPatch && rahPatch.status === 200,
      rahPatch ? "holat: " + rahPatch.status : "so'rov topilmadi");
    const rahSozlama = await fetch(ASOS + "/api/filiallar", {method: "POST", headers: br, body: JSON.stringify({nom: "Sinov"})});
    tekshir("rahbariyatga sozlamalarga yozish yopiq (403)", rahSozlama.status === 403, "holat: " + rahSozlama.status);
    tekshir("rol mijoz so'rovidan olinmaydi", (await kirish("u.sobirov", PAROL, {rol: "Administrator"})).j.rol === "Yurist");
    tekshir("amallar jurnali administratorga ochiq", (await ol2("/api/amallar")).status === 200);
    tekshir("noma'lum to'plam 404", (await ol2("/api/mavjudmas")).status === 404);
    const faqat = await fetch(ASOS + "/api/qurilma_katalog", {method: "POST", headers: b2, body: "{}"});
    tekshir("faqat o'qiladigan to'plamga yozish 405", faqat.status === 405);

    /* ---------- balansga qabul: obyekt menejeri va yurist oxirigacha yetkaza oladi ---------- */
    const ochiqIshlar = ishlar.filter(i => !i.aktivId && i.holat !== "yopilgan");
    const oldinOzg = JSON.parse(JSON.stringify(omborOl("shartli").ozg.UNDIRUV_ISHLAR || {}));
    for (const [n, login] of [[0, "n.ismoilova"], [1, "u.sobirov"]]){
      const ish = ochiqIshlar[n];
      const k = await kirish(login, PAROL);
      const bh = {"X-Sessiya": k.j.token, "Content-Type": "application/json"};
      const rol = k.j.rol;
      if (!ish){ tekshir(rol + ": qabul uchun ochiq undiruv ishi bor", false); continue; }
      const post = (yol, tana) => fetch(ASOS + yol, {method: "POST", headers: bh, body: JSON.stringify(tana)});
      const ishYol = "/api/undiruv_ishlar/" + encodeURIComponent(ish.id);
      tekshir(rol + ": qabul qilinayotgan undiruv ishini o'qiydi", (await ol(ishYol, bh)).status === 200);
      const aktivId = "AK-2099/" + String(9001 + n);
      qabulSinov.aktivlar.push(aktivId);
      const ob = Object.assign(JSON.parse(JSON.stringify(yoz[0])), {id: aktivId, tarix: []});
      ob.balans = Object.assign({}, ob.balans, {qabulAsosi: "sud", undiruvIshId: ish.id});
      const yr = await post("/api/yozuvlar", ob);
      tekshir(rol + ": qabulda aktiv yaratadi", yr.status === 201, "holat: " + yr.status);
      const kr = await ol("/api/koriklar", bh);
      const krJ = await kr.json().catch(() => null);
      tekshir(rol + ": keyingi ko'rik raqami uchun ro'yxatni o'qiydi", kr.status === 200 && Array.isArray(krJ));
      if (rol === "Yurist")
        tekshir("yuristga ko'riklar ro'yxatidan faqat id beriladi", Array.isArray(krJ) && krJ.every(x => Object.keys(x).join() === "id"));
      const korikId = "KO-2099/" + String(9001 + n);
      qabulSinov.koriklar.push(korikId);
      const korik = {id: korikId, obyektId: aktivId, korikTuri: "Birlamchi", tur: "Birlamchi", sana: "01.10.2026", holat: "rejada",
        inspektor: null, holatBall: null, chekList: [], kamchiliklar: "", xarajatTaklifi: null, keyingiKorikSana: null, xulosa: "", izoh: "Sinov"};
      if (rol === "Yurist"){
        const boshqa = await post("/api/koriklar", Object.assign({}, korik, {id: korikId + "X", korikTuri: "Rejali", tur: "Rejali"}));
        tekshir("yurist birlamchidan boshqa ko'rik yarata olmaydi (403)", boshqa.status === 403, "holat: " + boshqa.status);
      }
      const kp = await post("/api/koriklar", korik);
      tekshir(rol + ": birlamchi ko'rikni rejalashtiradi", kp.status === 201, "holat: " + kp.status);
      const tarix = (ish.tarix || []).concat([{sana: "21.09.2026", voqea: "Garov balansga qabul qilindi", izoh: "Sinov"}]);
      const pt = tana => fetch(ASOS + ishYol, {method: "PATCH", headers: bh, body: JSON.stringify(tana)});
      if (rol === "Obyekt menejeri"){
        const begona = await pt({izoh: "sinov"});
        tekshir("obyekt menejeri undiruv ishining boshqa maydonini o'zgartira olmaydi (403)", begona.status === 403, "holat: " + begona.status);
      }
      const ip = await pt({holat: "yopilgan", bosqich: "qabul", aktivId, yopilganSana: "21.09.2026", tarix});
      tekshir(rol + ": qabul tugagach undiruv ishini yopadi", ip.status === 200, "holat: " + ip.status);
      const qayta = await pt({holat: "yopilgan", bosqich: "qabul", aktivId, yopilganSana: "21.09.2026", tarix});
      tekshir(rol + ": yopilgan ishni qayta yopish o'tmaydi", rol === "Yurist" || qayta.status === 403, "holat: " + qayta.status);
    }
    qabulSinov.ishOzg = oldinOzg;

    /* ---------- maxfiylik ---------- */
    tekshir("/mahalliy/ tashqi manzildan 404", await ichkiSorov("/mahalliy/obyektlar.json", "10.20.30.40") === 404);
    tekshir("/server/ ombori statik berilmaydi (404)", await ichkiSorov("/server/malumotlar/shartli/parollar.json", "127.0.0.1") === 404);
    tekshir("eski v8/ nusxasi statik berilmaydi (404)", await ichkiSorov("/v8/index.html", "127.0.0.1") === 404);
    const tashqiKirish = await new Promise(hal => {
      const res = new Writable({write(_c, _e, cb){ cb(); }});
      let kod = 0;
      res.headersSent = false;
      res.writeHead = k => { kod = k; res.headersSent = true; return res; };
      res.end = () => { hal(kod); return res; };
      const req = new (require("events").EventEmitter)();
      Object.assign(req, {url: "/api/kirish", method: "POST", headers: {"content-type": "application/json"},
        socket: {remoteAddress: "10.20.30.40"}});
      server.emit("request", req, res);
      process.nextTick(() => {
        req.emit("data", JSON.stringify({login: "o.ismoilov", parol: PAROL, manba: "mahalliy"}));
        req.emit("end");
      });
    });
    tekshir("haqiqiy reyestrga tashqi manzildan kirish 403", tashqiKirish === 403, "holat: " + tashqiKirish);
  } catch (e){
    yiqildi++;
    console.log("  [XATO] kutilmagan xato: " + (e && e.stack || e));
  } finally {
    console.log("\nYakun: o'tdi " + otdi + ", yiqildi " + yiqildi + ", jami " + (otdi + yiqildi));
    server.close();
    /* sinov vazifasi o'chirilgan belgisi bilan qoladi: omborni undan tozalaymiz */
    try{
      const o = omborOl("shartli");
      const f = path.join(o.dir, "ozgarishlar.json");
      const j = JSON.parse(fs.readFileSync(f, "utf8"));
      const v = j.MENING_VAZIFALARIM || {};
      Object.keys(v).forEach(id => {
        if (tozalash.includes(id) || (v[id].__yangi && v[id].__yangi.tur === "sinov" && v[id].__ochirilgan)) delete v[id];
      });
      /* qabul sinovi yozuvlari: aktiv, ko'rik va undiruv ishlari asl holiga qaytadi */
      qabulSinov.aktivlar.forEach(id => { if (j.YOZUVLAR) delete j.YOZUVLAR[id]; });
      qabulSinov.koriklar.forEach(id => { if (j.KORIKLAR) delete j.KORIKLAR[id]; });
      if (qabulSinov.ishOzg) j.UNDIRUV_ISHLAR = qabulSinov.ishOzg;
      ["YOZUVLAR", "KORIKLAR", "UNDIRUV_ISHLAR"].forEach(k => { if (j[k] && !Object.keys(j[k]).length) delete j[k]; });
      fs.writeFileSync(f, JSON.stringify(j, null, 1));
    }catch(_){ /* ombor yo'q bo'lsa tozalash shart emas */ }
  }
  process.exit(yiqildi ? 1 : 0);
})();
