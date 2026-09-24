/* ============================================================
   olcham.mjs — sahifalar o'lchamini tekshirish (headless Edge).
   Har bir ish sahifasi 390, 768, 1280 va 1440 px kenglikda ochiladi:
   - gorizontal toshish yo'q: scrollWidth <= clientWidth;
   - 1024 px va kengroq ekranda shapka balandligi 72 px dan oshmaydi;
   - 390 px da jadval qidiruvi ko'rinib turadi (sahifada bo'lsa);
   - sahifa skriptida xato chiqmaydi.

   Ishga tushirish (Edge kerak):
       node tests/olcham.mjs
       node tests/olcham.mjs --sahifa=panel.html,obyektlar.html --kenglik=390,1440
   Xato topilsa chiqish kodi 1.
   ============================================================ */
import {ochish, sahifalarRoyxati, manzilQur, argumentlar} from "./brauzer.mjs";

const arg = argumentlar();
const sahifalar = sahifalarRoyxati(arg.sahifa ? arg.sahifa.split(",") : null);
const kengliklar = (arg.kenglik || "390,768,1280,1440").split(",").map(Number);
const BOY = 900;

/* Sahifa ichida bajariladi */
function olchash(en) {
  const de = document.documentElement;
  const natija = {toshish: de.scrollWidth - de.clientWidth, shapka: null, qidiruv: null, toshganlar: []};
  const sh = document.getElementById("shapka");
  if (sh && sh.offsetParent !== null) natija.shapka = Math.round(sh.getBoundingClientRect().height);
  if (natija.toshish > 1) {
    /* qaysi element chegaradan chiqqanini ko'rsatish uchun */
    document.querySelectorAll("body *").forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.width && r.right > de.clientWidth + 1 && getComputedStyle(el).position !== "fixed" && natija.toshganlar.length < 3)
        natija.toshganlar.push(el.tagName.toLowerCase() + (el.id ? "#" + el.id : "") + (el.className && typeof el.className === "string" ? "." + el.className.split(" ")[0] : "") + " " + Math.round(r.right) + "px");
    });
  }
  /* Jadval qidiruvi: jadvali ko'rinib turgan har bir qidiruv maydoni ham ko'rinishi kerak */
  const qidiruvlar = [...document.querySelectorAll("main input[data-jadval-qidiruv], main input[type=search]")];
  qidiruvlar.forEach(q => {
    /* yopiq tab yoki yashirin qadam ichidagi maydon hisobga olinmaydi */
    const or = q.parentElement.getBoundingClientRect();
    if (!(or.width > 0 && or.height > 0)) return;
    const r = q.getBoundingClientRect(), s = getComputedStyle(q);
    const kor = r.width > 40 && r.height > 10 && s.visibility !== "hidden";
    if (natija.qidiruv !== false) natija.qidiruv = kor;
  });
  return natija;
}

const b = await ochish();
const xatolar = [];
let tekshirildi = 0;
try {
  await b.sessiya("uz", arg.rol || "Administrator");
  const idlar = await b.idlar();
  for (const en of kengliklar) {
    await b.olcham(en, BOY);
    for (const f of sahifalar) {
      const skript = await b.kor(manzilQur(f, idlar), 600);
      let o;
      try { o = await b.baho("(" + olchash + ")(" + en + ")"); }
      catch (e) { xatolar.push(en + " " + f + ": o'lchab bo'lmadi (" + e.message + ")"); continue; }
      tekshirildi++;
      const m = [];
      if (o.toshish > 1) m.push("gorizontal toshish " + o.toshish + "px" + (o.toshganlar.length ? " [" + o.toshganlar.join(", ") + "]" : ""));
      if (en >= 1024 && o.shapka != null && o.shapka > 72) m.push("shapka " + o.shapka + "px");
      if (en <= 390 && o.qidiruv === false) m.push("qidiruv ko'rinmaydi");
      skript.forEach(x => m.push("skript xatosi: " + x));
      if (m.length) xatolar.push(String(en).padStart(4) + " " + f + ": " + m.join("; "));
    }
    process.stdout.write("  " + en + " px: tekshirildi\n");
  }
} finally {
  await b.yop();
}
xatolar.forEach(x => console.log("  [XATO] " + x));
console.log("\nYakun: " + tekshirildi + " o'lchov, xato: " + xatolar.length);
process.exit(xatolar.length ? 1 : 0);
