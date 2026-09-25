/* ============================================================
   yadro.test.js — yadro integratsiyasi: muallif maydonlari, to'rt ko'z (kirish so'rovi, balansdan chiqarish),
   vazifani o'chirish, buxgalteriya to'lov belgisi, bildirishnoma sozlamasi, sud majlisi qoidasi,
   sana oralig'i xatosi, qurilma holati va yangi shaxs qidiruvi.
   Ishga tushirish: node tests/yadro.test.js (server shu jarayonda 8793-portda ko'tariladi)
   ============================================================ */
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm");
const ILDIZ = path.join(__dirname, "..");
const PORT = 8793;
const PAROL = "sinov-parol-8793";
process.env.MKB_PAROL = PAROL;
process.env.MKB_BUGUN = process.env.MKB_BUGUN || "2026-09-21";
let otdi = 0, yiqildi = 0;
function tekshir(nom, fn){
  try{ fn(); otdi++; console.log("  [OK]   " + nom); }
  catch(e){ yiqildi++; console.log("  [XATO] " + nom + "\n         " + e.message); }
}
async function tekshirA(nom, fn){
  try{ await fn(); otdi++; console.log("  [OK]   " + nom); }
  catch(e){ yiqildi++; console.log("  [XATO] " + nom + "\n         " + e.message); }
}
function talab(shart, xabar){ if (!shart) throw new Error(xabar); }
const teng = (a, b, nom) => talab(JSON.stringify(a) === JSON.stringify(b), (nom || "") + " kutilgan " + JSON.stringify(b) + ", keldi " + JSON.stringify(a));
const matn = f => fs.readFileSync(path.join(ILDIZ, f), "utf8");

(async function(){
  console.log("\n1. Sof mantiq: sana oralig'i xatosi");
  const qum = {window: {}, console};
  vm.runInNewContext(matn("yadro/ux.js"), qum, {filename: "ux.js"});
  const S = qum.window.MKB_UX_SOF;
  tekshir("sana oralig'i: maydon yorlig'idan olingan matn, berilmasa eski matn", () => {
    teng(S.sanaXatosi("2026-09-10", {dan: "2026-09-12", danXato: "Savdo sanasi e'lon sanasidan oldin bo'lishi mumkin emas"}),
      "Savdo sanasi e'lon sanasidan oldin bo'lishi mumkin emas");
    teng(S.sanaXatosi("2026-09-10", {dan: "2026-09-12"}), "Tugash sanasi boshlanish sanasidan oldin bo'lishi mumkin emas");
    teng(S.sanaXatosi("2026-09-12", {dan: "2026-09-12", danXato: "x"}), "");
  });
  tekshir("app.js: ketishMumkinmi navbatda, formaQoriqla va formaTekshir ux.js gacha xavfsiz", () => {
    const a = matn("yadro/app.js");
    talab(/\["tasdiqla", "band", "sahifaYukla", "qaytarish", "ketishMumkinmi"\]/.test(a), "ketishMumkinmi navbatda emas");
    talab(/if \(!MKB\.formaQoriqla\)/.test(a) && /if \(!MKB\.formaTekshir\)/.test(a), "vaqtinchalik formaQoriqla/formaTekshir yo'q");
    talab(/xato-403\.html\?sahifa=/.test(a), "403 sahifasiga sahifa nomi uzatilmaydi");
  });
  tekshir("amal.js: to'g'ridan-to'g'ri MKB.chiqim yo'q, chiqim so'rovi sotuv bo'limidan ham yuboriladi", () => {
    const a = matn("yadro/amal.js");
    talab(/MKB\.chiqim = function\(\)\{ return Promise\.reject/.test(a), "MKB.chiqim hali to'g'ridan-to'g'ri chiqaradi");
    talab(/TASDIQ_SORUV_BOLIM = \{chiqim: \["aktivlar", "sotuv"\]\}/.test(a), "sotuv bo'limidan chiqim so'rovi yuborilmaydi");
    talab(/ZAXIRA_QOSHIMCHA = \["soliqImtiyozOy"\]/.test(a), "soliqImtiyozOy tasdiqqa yuborilmaydi");
  });

  console.log("\n2. Ma'lumot: parametrlar, sud majlisi qoidasi, qurilma holati, shaxs");
  const {server, urugla, omborOl} = require(path.join(ILDIZ, "server", "server.js"));
  urugla();
  const O = omborOl("shartli");
  const D = O.D;
  tekshir("PARAMETRLAR: ko'rikdagi eng kam surat soni (bino, transport)", () => {
    const b = D.PARAMETRLAR.find(p => p.id === "korikSuratBino"), t = D.PARAMETRLAR.find(p => p.id === "korikSuratTransport");
    talab(b && t && b.qiymat > 0 && t.qiymat > 0 && b.guruh === "korik", "parametr yo'q");
  });
  tekshir("Q-MAJLIS: majlisdan bir kun oldin va majlis kuni obyekt menejeriga eslatma, o'tgan majlis natijasiz bo'lsa vazifa", () => {
    talab((D.QOIDALAR || []).some(q => q.id === "Q-MAJLIS" && q.qabulQiluvchiRol === "Obyekt menejeri"), "qoida yo'q");
    const m = (D.SUD_MAJLISLAR || []).find(x => x.holat === "rejada");
    talab(m, "rejadagi majlis yo'q");
    const s = D.sanaOqi(m.sana);
    const oldin = D.sanaYoz(D.kunQosh(s, -1)), kuni = m.sana, keyin = D.sanaYoz(D.kunQosh(s, 3));
    const n1 = D.qoidaNatijalari(oldin).filter(n => n.qoidaId === "Q-MAJLIS" && n.havola.indexOf(encodeURIComponent(m.id)) >= 0);
    const n2 = D.qoidaNatijalari(kuni).filter(n => n.qoidaId === "Q-MAJLIS" && n.havola.indexOf(encodeURIComponent(m.id)) >= 0);
    const n3 = D.qoidaNatijalari(keyin).filter(n => n.qoidaId === "Q-MAJLIS" && n.havola.indexOf(encodeURIComponent(m.id)) >= 0);
    teng(n1.map(n => [n.tur, n.sarlavha, n.rol]), [["bildirish", "Sud majlisi ertaga", "Obyekt menejeri"]], "bir kun oldin");
    teng(n2.map(n => [n.tur, n.sarlavha]), [["bildirish", "Sud majlisi bugun"]], "majlis kuni");
    teng(n3.map(n => [n.tur, n.sarlavha]), [["vazifa", "Majlis natijasini kiriting"]], "o'tgan majlis");
    talab(/^Ish \S+: .+, \d{2}\.\d{2}\.\d{4}( \d{2}:\d{2})?\.$/.test(n1[0].matn), "matn ko'rinishi: " + n1[0].matn);
  });
  tekshir("qurilma holati: oxirgi signaldan hozirgacha o'tgan soat va qayd eskirganmi", () => {
    const q = (D.QURILMALAR || []).find(x => x.oxirgiSignal);
    const h = D.qurilmaHolati(q);
    talab(typeof h.signalSoat === "number" && typeof h.eskirgan === "boolean" && typeof h.aloqada === "boolean", JSON.stringify(h));
    talab(h.signalSoat >= (h.oflaynSoat || 0), "signalSoat qayddagi soatdan kam bo'lmasin");
  });
  tekshir("D.shaxs: shu seansda qo'shilgan shaxs ham topiladi", () => {
    const yangi = {id: "SH-SINOV-1", ism: "Sinov Shaxs", tur: "tashrifchi"};
    D.SHAXSLAR.push(yangi);
    try{
      teng(D.shaxs("SH-SINOV-1") && D.shaxs("SH-SINOV-1").ism, "Sinov Shaxs");
      teng(D.shaxsNomi("SH-SINOV-1"), "Sinov Shaxs");
    } finally { D.SHAXSLAR.splice(D.SHAXSLAR.indexOf(yangi), 1); }
  });

  console.log("\n3. Server: muallif, to'rt ko'z, vazifa, to'lov belgisi, bildirishnoma sozlamasi");
  const oz = path.join(O.dir, "ozgarishlar.json");
  const aslOzg = fs.existsSync(oz) ? fs.readFileSync(oz, "utf8") : null;
  await new Promise(h => server.listen(PORT, "127.0.0.1", h));
  const ASOS = "http://127.0.0.1:" + PORT;
  const kirish = async login => (await fetch(ASOS + "/api/kirish", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({login, parol: PAROL})})).json();
  const so = (s, yol, usul, tana) => fetch(ASOS + "/api/" + yol, {method: usul || "GET", headers: {"X-Sessiya": s.token, "Content-Type": "application/json"}, body: tana ? JSON.stringify(tana) : undefined});
  const yol = (kol, id) => kol + "/" + encodeURIComponent(id);
  try{
    const adm = await kirish("o.ismoilov"), rah = await kirish("a.rahmonov"), om = await kirish("n.ismoilova"), om2 = await kirish("b.tosheva");
    const xav = await kirish("sh.qurbonov"), bux = await kirish("z.xolmatova");
    await tekshirA("xarajat qatori: muallif sessiyadan yoziladi va keyin o'zgarmaydi", async () => {
      const ob = D.YOZUVLAR.find(y => y.holat !== "Chiqarildi");
      const r = await so(om, "xarajatlar", "POST", {obyektId: ob.id, sana: "21.09.2026", summa: 1.2, muallifLogin: "a.rahmonov"});
      const x = await r.json();
      teng([r.status, x.muallifLogin], [201, "n.ismoilova"], "yaratish");
      teng((await so(om, yol("xarajatlar", x.id), "PATCH", {muallifLogin: "b.tosheva"})).status, 403, "muallifni almashtirish");
    });
    await tekshirA("kirish so'rovi: so'rovchi o'zi tasdiqlamaydi, boshqa xodim tasdiqlaydi", async () => {
      const namuna = D.KIRISH_SOROVLARI[0];
      const r = await so(xav, "kirish_sorovlari", "POST", {sana: "23.09.2026", vaqt: "10:00", shaxsId: namuna.shaxsId, obyektId: namuna.obyektId,
        maqsad: namuna.maqsad, muddat: "1 soat", sorovchi: "Qurbonov Sh.", holat: "kutilmoqda", izoh: ""});
      const k = await r.json();
      teng([r.status, k.muallifLogin], [201, "sh.qurbonov"], "yaratish");
      teng((await so(xav, yol("kirish_sorovlari", k.id), "PATCH", {holat: "tasdiqlangan"})).status, 403, "o'z so'rovi");
      teng((await so(adm, yol("kirish_sorovlari", k.id), "PATCH", {holat: "tasdiqlangan"})).status, 200, "boshqa xodim");
    });
    await tekshirA("vazifa: boshqa xodim bergan vazifani ijrochi o'chirmaydi, muallif o'chiradi", async () => {
      const v = await (await so(om2, "mening_vazifalarim", "POST", {nom: "Sinov topshirig'i (yadro)", tur: "sinov", sana: "21.09.2026", ijrochi: "n.ismoilova", bajarildi: false})).json();
      teng(v.muallifLogin, "b.tosheva", "muallif");
      teng((await so(om, yol("mening_vazifalarim", v.id), "DELETE")).status, 403, "ijrochi o'chiradi");
      teng((await so(om2, yol("mening_vazifalarim", v.id), "DELETE")).status, 200, "muallif o'chiradi");
    });
    await tekshirA("balansdan chiqarish: so'rovsiz yopiq, o'z so'rovini o'zi bajarmaydi, boshqa xodim tasdiq bilan bajaradi", async () => {
      const ob = D.YOZUVLAR.find(y => y.holat !== "Chiqarildi" && !(D.TASDIQLAR || []).some(t => t.tur === "chiqim" && (t.obyektId === y.id || t.manbaId === y.id)));
      teng((await so(rah, yol("yozuvlar", ob.id), "PATCH", {holat: "Chiqarildi", bosqich: "chiqim"})).status, 403, "so'rovsiz");
      teng((await so(rah, "arxiv", "POST", {id: ob.id, obyektId: ob.id, nom: ob.nom})).status, 403, "so'rovsiz ARXIV");
      const t = await (await so(om, "tasdiqlar", "POST", {tur: "chiqim", manbaKol: "YOZUVLAR", manbaId: ob.id, obyektId: ob.id, sarlavha: "Sinov chiqim (yadro)",
        masulRol: "Rahbariyat", holat: "kutilmoqda", sana: "21.09.2026"})).json();
      talab(t && t.id, "so'rov yaratilmadi");
      const o1 = await so(om, yol("yozuvlar", ob.id), "PATCH", {holat: "Chiqarildi", bosqich: "chiqim"});
      teng(o1.status, 403, "so'rov muallifi o'zi chiqaradi");
      teng((await so(rah, yol("yozuvlar", ob.id), "PATCH", {holat: "Chiqarildi", bosqich: "chiqim"})).status, 200, "boshqa xodim");
    });
    await tekshirA("buxgalteriya: ijara to'lov jadvaliga belgi qo'yadi, boshqa maydonni o'zgartirmaydi", async () => {
      const ij = D.IJARA.find(x => Array.isArray(x.tolovlar));
      talab(ij, "ijara yo'q");
      teng((await so(bux, yol("ijara", ij.id), "PATCH", {tolovlar: ij.tolovlar, holat: ij.holat})).status, 200, "to'lov belgisi");
      teng((await so(bux, yol("ijara", ij.id), "PATCH", {oylikIjara: 1})).status, 403, "boshqa maydon");
      teng((await so(bux, "lotlar", "POST", {obyektId: ij.obyektId})).status, 403, "realizatsiyaga yangi yozuv");
    });
    await tekshirA("bildirishnoma sozlamasi: xodim o'z yozuvida saqlaydi, noto'g'ri qiymat rad etiladi", async () => {
      teng((await so(om, yol("foydlar", om.id), "PATCH", {bildirishSozlama: {olinmaydi: ["Q-POLIS", "Q-MAJLIS"]}})).status, 200, "saqlash");
      teng((await so(om, yol("foydlar", om.id), "PATCH", {bildirishSozlama: {olinmaydi: ["<x>"]}})).status, 400, "noto'g'ri");
      teng((await so(om, yol("foydlar", om.id), "PATCH", {bildirishSozlama: {olinmaydi: []}})).status, 200, "tozalash");
    });
  }catch(e){ yiqildi++; console.log("  [XATO] kutilmagan xato: " + (e && e.stack || e)); }
  finally{
    server.close();
    try{ if (aslOzg != null) fs.writeFileSync(oz, aslOzg); else fs.rmSync(oz, {force: true}); }catch(_){ }
  }
  console.log("\nYakun: o'tdi " + otdi + ", yiqildi " + yiqildi + ", jami " + (otdi + yiqildi));
  process.exitCode = yiqildi ? 1 : 0;
})();
