/* ============================================================
   taqdimot-moslama.js — loyiha taqdimoti uchun ma'lumot va yordamchilar.
   Raqamlar tizimning o'z ma'lumotidan (MKB_DATA) olinadi, shuning uchun
   taqdimot va boshqaruv paneli bir xil ko'rsatkichni ko'rsatadi.
   ============================================================ */
(function(){
  const D = window.MKB_DATA || {};
  const P = D.PORTFEL || {balansda: 0};
  const son = (n, kasr) => new Intl.NumberFormat("ru-RU", {minimumFractionDigits: kasr || 0, maximumFractionDigits: kasr || 0}).format(n).replace(/[  ]/g, " ");
  const rus = () => { try{ return localStorage.getItem("mkb-til") === "ru"; }catch(_){ return false; } };
  const B = () => rus() ? {mlrd: " млрд", mln: " млн", ming: " тыс.", som: " сум"} : {mlrd: " mlrd", mln: " mln", ming: " ming", som: " so'm"};
  function pul(mln){
    if (mln == null) return "—";
    const b = B();
    if (Math.abs(mln) >= 1000) return son(mln / 1000, mln >= 100000 ? 1 : 2) + b.mlrd + b.som;
    if (Math.abs(mln) >= 1) return son(mln, mln < 100 ? 1 : 0) + b.mln + b.som;
    return son(mln * 1000, 0) + b.ming + b.som;
  }
  function pulQisqa(mln){
    if (mln == null) return "—";
    const b = B();
    return Math.abs(mln) >= 1000 ? son(mln / 1000, mln >= 100000 ? 0 : 1) + b.mlrd : son(mln, mln < 10 ? 1 : 0) + b.mln;
  }

  /* Balansdagi mulk qiymati — boshqaruv panelidagi hisob bilan bir xil */
  const balansdagilar = (D.YOZUVLAR || []).filter(y => ["musodara", "balans"].includes(y.ish.bosqich));
  /* ikki rejimda ham reyestrdagi balans qiymatlari yig'indisi — ekstrapolyatsiya qilinmaydi */
  const balansQiymat = Math.round(balansdagilar.reduce((a, y) => a + y.qarz.jami, 0));

  /* Plitka-xarita: hudud nomi -> [belgi, x, y] */
  const JOY = {"Qoraqalpog'iston R.": ["QQR", 0, 0], "Xorazm viloyati": ["XOR", 1, 1], "Navoiy viloyati": ["NAV", 2, 0], "Buxoro viloyati": ["BUX", 2, 1],
    "Samarqand viloyati": ["SAM", 3, 1], "Qashqadaryo viloyati": ["QASH", 3, 2], "Surxondaryo viloyati": ["SUR", 4, 2], "Jizzax viloyati": ["JIZ", 4, 1],
    "Sirdaryo viloyati": ["SIR", 5, 1], "Toshkent shahri": ["TSH", 5, 0], "Toshkent viloyati": ["TVL", 6, 0], "Namangan viloyati": ["NAM", 7, 0],
    "Farg'ona viloyati": ["FAR", 7, 1], "Andijon viloyati": ["AND", 8, 1]};
  const hududlar = (D.HUDUDLAR || []).filter(h => JOY[h[0]]).map(h => ({nom: h[0], belgi: JOY[h[0]][0], x: JOY[h[0]][1], y: JOY[h[0]][2],
    soni: parseFloat(String(h[1]).replace(/\s/g, "")) || 0}));

  /* Himoya darajalari bo'yicha taqsimot: balansdagi obyektlar qiymat oralig'i bo'yicha */
  const ulush = {A: .08, B: .37, C: .25, S: .30};
  const daraja = [];
  const balansSoni = balansdagilar.length;
  Object.keys(ulush).forEach(k => { for (let i = 0; i < Math.round(balansSoni * ulush[k]); i++) daraja.push({himoya: k}); });

  window.MKB_TAQDIMOT = {
    BUGUN: new Date(), HUDUDLAR: hududlar,
    HIMOYA_NOMI: {A: "To'liq himoya", B: "Standart himoya", C: "Asosiy himoya", S: "Saqlash maydonchasi"},
    jamlanma(){ return {soni: balansdagilar.length, qiymat: balansQiymat}; },
    hududStatistikasi(){ return hududlar; },
    faolObyektlar(){ return daraja; },
    sana(d){ return String(d.getDate()).padStart(2, "0") + "." + String(d.getMonth() + 1).padStart(2, "0") + "." + d.getFullYear(); },
    son, pul, pulQisqa,
  };

  /* Asosiy qobiqda yo'q yordamchilar */
  const M = window.MKB = window.MKB || {};
  if (!M.himoya) M.himoya = d => '<span class="himoya" data-d="' + d + '" data-tarjimasiz>' + d + "</span>";
  if (!M.csv) M.csv = function(nom, sarlavhalar, qatorlar){
    const e = v => '"' + String(v == null ? "" : v).replace(/"/g, '""') + '"';
    const matn = "\uFEFF" + [sarlavhalar.map(e).join(";")].concat(qatorlar.map(r => r.map(e).join(";"))).join("\r\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([matn], {type: "text/csv;charset=utf-8"}));
    a.download = nom; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };

  /* Taqdimotda ishlatiladigan qo'shimcha ikonkalar */
  const sprite = '<svg xmlns="http://www.w3.org/2000/svg" style="display:none" aria-hidden="true">' +
    '<symbol id="i-batareya" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="2" y="7" width="17" height="10" rx="2.5"/><path d="M22 10.5v3M6 10.5v3M9.5 10.5v3"/></g></symbol>' +
    '<symbol id="i-quyosh" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.5 1.5M17.2 17.2l1.5 1.5M18.7 5.3l-1.5 1.5M6.8 17.2l-1.5 1.5"/></g></symbol>' +
    '<symbol id="i-olov" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" d="M12 3c.6 3.4 5 5.6 5 10.2a5 5 0 0 1-10 0c0-2 .9-3.3 2-4.3.3 1.7 1.1 2.5 2 2.8-.7-3 .1-6.2 1-8.7Z"/></symbol>' +
    '<symbol id="i-nfc" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="4"/><path d="M8 15V9l4 6V9M15.5 9.5a5 5 0 0 1 0 5"/></g></symbol>' +
    "</svg>";
  document.addEventListener("DOMContentLoaded", () => { const d = document.createElement("div"); d.innerHTML = sprite; document.body.prepend(d); });
})();
