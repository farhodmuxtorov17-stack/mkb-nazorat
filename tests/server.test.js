/* REST server tekshiruvi: node tests/server.test.js */
const {spawn} = require("child_process");
const path = require("path");

const PORT = 8791;
const ASOS = "http://localhost:" + PORT;
let otdi = 0, yiqildi = 0;

function tekshir(nom, shart){
  if (shart){ otdi++; console.log("  [OK]  ", nom); }
  else { yiqildi++; console.log("  [XATO]", nom); }
}

async function kut(ms){ return new Promise(r => setTimeout(r, ms)); }

(async () => {
  const server = spawn(process.execPath, [path.join(__dirname, "..", "server", "server.js")], {
    env: Object.assign({}, process.env, {PORT: String(PORT)}),
    stdio: "ignore",
  });
  try{
    /* ko'tarilishini kutamiz */
    let tayyor = false;
    for (let i = 0; i < 40 && !tayyor; i++){
      await kut(150);
      try{
        const j = await fetch(ASOS + "/api/salomat").then(r => r.json());
        tayyor = j.holat === "ok";
      }catch(_){ }
    }
    tekshir("server ko'tarildi (salomat)", tayyor);

    /* sessiyasiz himoya */
    const yopiq = await fetch(ASOS + "/api/yozuvlar");
    tekshir("sessiyasiz so'rov 401 qaytaradi", yopiq.status === 401);

    /* kirish */
    const s = await fetch(ASOS + "/api/kirish", {
      method: "POST", headers: {"Content-Type": "application/json"},
      body: JSON.stringify({login: "sinov", parol: "x", rol: "Administrator"}),
    }).then(r => r.json());
    tekshir("kirish token beradi", !!s.token && s.rol === "Administrator");
    const bosh = {"X-Sessiya": s.token, "Content-Type": "application/json"};

    /* ro'yxat */
    const yoz = await fetch(ASOS + "/api/yozuvlar", {headers: bosh}).then(r => r.json());
    tekshir("yozuvlar ro'yxati keladi (8 ta)", Array.isArray(yoz) && yoz.length >= 8);

    /* bitta */
    const id = yoz[0].id;
    const bitta = await fetch(ASOS + "/api/yozuvlar/" + encodeURIComponent(id), {headers: bosh}).then(r => r.json());
    tekshir("bitta yozuv id bo'yicha keladi", bitta.id === id);

    /* patch */
    const p = await fetch(ASOS + "/api/yozuvlar/" + encodeURIComponent(id), {
      method: "PATCH", headers: bosh, body: JSON.stringify({sinovBelgi: "ha"}),
    }).then(r => r.json());
    tekshir("PATCH maydonni saqlaydi", p.sinovBelgi === "ha");
    const qayta = await fetch(ASOS + "/api/yozuvlar/" + encodeURIComponent(id), {headers: bosh}).then(r => r.json());
    tekshir("o'zgarish diskka yozilgan", qayta.sinovBelgi === "ha");
    /* tozalash */
    await fetch(ASOS + "/api/yozuvlar/" + encodeURIComponent(id), {
      method: "PATCH", headers: bosh, body: JSON.stringify({sinovBelgi: ""}),
    });

    /* amallar jurnali faqat administratorga */
    const s2 = await fetch(ASOS + "/api/kirish", {
      method: "POST", headers: {"Content-Type": "application/json"},
      body: JSON.stringify({login: "yurist-sinov", parol: "x", rol: "Yurist"}),
    }).then(r => r.json());
    const taqiq = await fetch(ASOS + "/api/amallar", {headers: {"X-Sessiya": s2.token}});
    tekshir("amallar jurnali yuristga yopiq (403)", taqiq.status === 403);
    const ochiq = await fetch(ASOS + "/api/amallar", {headers: {"X-Sessiya": s.token}});
    tekshir("amallar jurnali administratorga ochiq", ochiq.status === 200);

    /* noma'lum kolleksiya */
    const yoq = await fetch(ASOS + "/api/mavjudmas", {headers: bosh});
    tekshir("noma'lum kolleksiya 404", yoq.status === 404);
  } finally {
    console.log("\nYakun: o'tdi " + otdi + ", yiqildi " + yiqildi + ", jami " + (otdi + yiqildi));
    server.kill();
    await kut(400);
  }
  process.exit(yiqildi ? 1 : 0);
})();
