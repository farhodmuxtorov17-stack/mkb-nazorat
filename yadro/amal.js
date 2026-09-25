/* ============================================================
   amal.js — umumiy biznes amallari
   MKB.tasdiq.qabul / rad / sorov · MKB.chiqim (+ sorov) · MKB.lot.yarat / otkazilmadi ·
   MKB.shartnoma.yarat · MKB.hodisa.yarat · MKB.qoidalar (bildirishnoma va vazifalar)
   Sahifalar bu mantiqni o'zi yozmaydi, faqat shu funksiyalarni chaqiradi.
   Har bir yozuv MKBapi orqali; xato bo'lsa Error tashlanadi, matni foydalanuvchiga ko'rsatiladi.
   ============================================================ */
/* To'rt ko'z qoidasining sof qismi (DOM va sessiyasiz): testlar va server bilan bir xil mantiq.
   ozimi — so'rov shu xodimniki; orinbosarFaolmi — o'rinbosarlik davri bugunni o'z ichiga oladi;
   orinbosarlar — shu xodim bugun kimning o'rinbosari. */
window.MKB_TORT_KOZ = (function(){
  const kichik = x => String(x == null ? "" : x).trim().toLowerCase();
  function sanaOqi(x){
    if (x && typeof x.getFullYear === "function") return x;
    const m = /^(\d{1,2})\.(\d{1,2})\.(\d{4})$/.exec(String(x || "").trim());
    return m ? new Date(+m[3], +m[2] - 1, +m[1]) : null;
  }
  function ozimi(t, s){
    if (!t || !s) return false;
    if (t.muallifLogin) return kichik(t.muallifLogin) === kichik(s.login);
    return !!t.muallif && !!s.ism && String(t.muallif).trim() === String(s.ism).trim();
  }
  function orinbosarFaolmi(o, bugun){
    if (!o || typeof o !== "object" || !o.login) return false;
    const dan = sanaOqi(o.dan), gacha = sanaOqi(o.gacha);
    if (!dan || !gacha || gacha < dan) return false;
    const b = bugun && typeof bugun.getFullYear === "function" ? new Date(bugun.getFullYear(), bugun.getMonth(), bugun.getDate()) : sanaOqi(bugun);
    return !!b && b >= dan && b <= gacha;
  }
  function orinbosarlar(foydlar, login, bugun){
    const l = kichik(login);
    if (!l) return [];
    return (foydlar || []).filter(f => f && f.faol !== false && kichik(f.login) !== l &&
      f.orinbosar && kichik(f.orinbosar.login) === l && orinbosarFaolmi(f.orinbosar, bugun));
  }
  /* O'rinbosarlik yozuvini tekshirish: xato matni yoki null (null — o'rinbosarlik bekor qilindi) */
  function orinbosarXatosi(o, ozLogin, foydlar){
    if (o === null) return null;
    if (!o || typeof o !== "object" || Array.isArray(o)) return "O'rinbosar ma'lumoti noto'g'ri";
    const l = kichik(o.login);
    if (!l) return "O'rinbosarni tanlang";
    if (l === kichik(ozLogin)) return "O'zingizni o'rinbosar qilib bo'lmaydi";
    if (foydlar && !foydlar.some(f => f && kichik(f.login) === l && f.faol !== false)) return "Bunday faol xodim yo'q";
    const dan = sanaOqi(o.dan), gacha = sanaOqi(o.gacha);
    if (!dan || !gacha) return "O'rinbosarlik davrini kiriting";
    if (gacha < dan) return "Tugash sanasi boshlanishdan oldin bo'lishi mumkin emas";
    return null;
  }
  return {ozimi, orinbosarFaolmi, orinbosarlar, orinbosarXatosi, sanaOqi,
    XATO_OZ: "O'z so'rovingizni o'zingiz tasdiqlay olmaysiz"};
})();

/* Bildirishnoma kimga boradi (sof qism, DOM va sessiyasiz; qo'ng'iroq, bildirishnomalar sahifasi va testlar shu mantiqni ishlatadi).
   Xabar o'z roliga yozilgan xodimga boradi. Boshqa rolning obyekt bo'yicha eslatmasi faqat yuqoriga o'tkazilganda keladi:
   qoidaning eskalatsiyaRol i shu rol, bog'liq vazifa (id "V|" + xabar id) yopilmagan va muddatidan
   max(3, eskalatsiyaKun) kundan ko'p o'tgan. Rahbariyat bundan tashqari bank darajasidagi xabarni (obyektsiz, masalan MB hisoboti)
   va jiddiy hodisani ko'radi; qolgan obyekt eslatmalari haftalik xulosaga tushadi. Administrator biznes xabarini olmaydi.
   holat(b, k) -> "oz" | "bank" | "hodisa" | "eskalatsiya" | "xulosa" | null
   k = {rol: rol kaliti, rolNomi: xodimning to'liq rol nomi, bugun: Date, qoida: id -> qoida, vazifa: id -> vazifa, kanon: eski rol nomini yangisiga} */
window.MKB_BILDIRISH_DOIRA = (function(){
  const ESKALATSIYA_MIN_KUN = 3;
  const sanaOqi = window.MKB_TORT_KOZ.sanaOqi;
  const kunBoshi = d => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  function otganKun(b, k){
    const v = b && k && k.vazifa ? k.vazifa("V|" + b.id) : null;
    const m = v && sanaOqi(v.muddat);
    if (!m || !k.bugun) return null;
    return Math.round((kunBoshi(k.bugun) - kunBoshi(m)) / 864e5);
  }
  function holat(b, k){
    if (!b || !k) return null;
    const kn = x => String((k.kanon ? k.kanon(x) : x) || "").trim();
    const ozi = !b.rol || kn(b.rol) === kn(k.rolNomi);
    const biznes = !!(b.qoidaId || b.obyektId);
    if (k.rol === "admin") return !biznes && ozi ? "oz" : null;
    if (ozi) return "oz";
    const rahbar = k.rol === "rahbariyat";
    if (rahbar && !b.obyektId) return "bank";
    if (rahbar && !b.qoidaId) return "hodisa";
    const q = b.qoidaId && k.qoida ? k.qoida(b.qoidaId) : null;
    const xulosa = rahbar ? "xulosa" : null;
    if (!q || !q.eskalatsiyaRol || kn(q.eskalatsiyaRol) !== kn(k.rolNomi)) return xulosa;
    const v = k.vazifa ? k.vazifa("V|" + b.id) : null;
    if (!v || v.bajarildi) return xulosa;
    const otgan = otganKun(b, k);
    const chegara = Math.max(ESKALATSIYA_MIN_KUN, Number(q.eskalatsiyaKun) || 0);
    return otgan != null && otgan > chegara ? "eskalatsiya" : xulosa;
  }
  const KORINADI = ["oz", "bank", "hodisa", "eskalatsiya"];
  return {holat, otganKun, korinadimi: (b, k) => KORINADI.indexOf(holat(b, k)) >= 0, ESKALATSIYA_MIN_KUN};
})();

(function(){
  "use strict";
  if (!window.MKB || window.MKB.tasdiq) return;
  const MKB = window.MKB;
  const D = () => window.MKB_DATA || {};

  /* ---------- Yordamchilar ---------- */
  function kerak(shart, xabar){ if (!shart) throw new Error(xabar); }
  const oqi = x => (D().sanaOqi ? D().sanaOqi(x) : MKB.sana.oqi(x));
  const yoz = d => (D().sanaYoz ? D().sanaYoz(d) : MKB.sana.yoz(d));
  const bugun = () => { const b = MKB.bugun(); return new Date(b.getFullYear(), b.getMonth(), b.getDate()); };
  const bugunMatn = () => yoz(bugun());
  const vaqtMatn = () => bugunMatn() + " " + MKB.soat();
  const param = (id, asl) => { const v = D().param ? D().param(id) : null; return v == null ? asl : v; };
  const kunQosh = (d, n) => (D().kunQosh ? D().kunQosh(d, n) : MKB.sana.kunQosh(d, n));
  const oyQosh = (d, n) => { if (D().oyQosh) return D().oyQosh(d, n); const x = new Date(d); x.setMonth(x.getMonth() + n); return x; };
  const ishKuniQosh = (d, n) => (D().ishKuniQosh ? D().ishKuniQosh(d, n) : MKB.sana.ishKuni(d, n));
  const kunFarqi = (a, b) => (D().kunFarqi ? D().kunFarqi(a, b) : MKB.sana.kunFarqi(a, b));
  const yil = () => bugun().getFullYear();
  const yaxlit = (n, k) => { const p = Math.pow(10, k == null ? 1 : k); return Math.round(n * p) / p; };
  const pul = n => MKB.pul(n);

  function hosilalar(){
    const d = D();
    if (d.nazoratKeshTozala) d.nazoratKeshTozala();
    if (d.portfelHisobla) try{ d.PORTFEL = d.portfelHisobla(); }catch(_){ }
    if (MKB.qongiroqYangila) MKB.qongiroqYangila();
    document.dispatchEvent(new CustomEvent("mkb:malumot"));
  }
  async function top(kol, id){
    if (!id) return null;
    const a = (D()[kol] || []).find(x => x && x.id === id);
    if (a) return a;
    try{ return await MKBapi.bitta(kol, id); }catch(_){ return null; }
  }
  function tarixQosh(y, voqea, izoh){
    return (Array.isArray(y.tarix) ? y.tarix : []).concat([{sana: bugunMatn(), voqea, izoh: izoh || ""}]);
  }
  function sxemadami(kol, maydon){
    const s = D().SXEMA && D().SXEMA[kol];
    return !s || s.indexOf(maydon) >= 0;
  }
  function usulNomi(k){
    if (k === "hisobdan") return "Hisobdan chiqarish";
    const u = (D().SOTISH_USULLARI || []).find(x => x.kalit === k);
    return u ? u.nom : k;
  }
  /* Tasdiqdan keyingi ish topshirig'i (MENING_VAZIFALARIM). Rahbariyatning vazifa bo'limidagi yozish
     huquqiga bog'liq emas: qaror bilan birga yoziladi. Xato bo'lsa qaror to'xtamaydi. */
  async function vazifaQosh(m){
    try{
      const id = await keyingi("MENING_VAZIFALARIM", "VZ-" + yil() + "-", 0);
      const s = MKBapi.sessiya() || {};
      return await MKBapi.yangi("MENING_VAZIFALARIM", {id, nom: m.nom, tur: m.tur || "Boshqa", obyektId: m.obyektId || null,
        kod: m.kod || m.obyektId || "", qoidaId: null, sana: bugunMatn(), muddat: m.muddat || null, ijrochi: m.ijrochi || null,
        rol: m.rol || null, muhimlik: m.muhimlik || "orta", bajarildi: false, izoh: m.izoh || ("Qaror asosida: " + (s.ism || "—"))});
    }catch(_){ return null; }
  }

  /* ============================================================
     Tasdiqlar (TASDIQLAR): taklif, pasaytirish, baho, qabul, chiqim, zaxira
     ============================================================ */
  const TASDIQ_BOLIM = {taklif: "sotuv", pasaytirish: "sotuv", baho: "qiymat", qabul: "aktivlar", chiqim: "aktivlar",
    zaxira: "qiymat"};
  /* Faqat shu rollar yubora oladigan so'rov turlari (qolganlari — bo'limda yozish huquqi bilan) */
  const TASDIQ_SORUVCHI = {zaxira: ["buxgalteriya", "admin"]};
  /* So'rovni shu bo'limlardan birida yozish huquqi bilan yuborish mumkin: balansdan chiqarishni
     obyekt menejeri reyestrdan (aktivlar) yoki sotuv natijasidan (sotuv) boshlaydi (UX 7.1) */
  const TASDIQ_SORUV_BOLIM = {chiqim: ["aktivlar", "sotuv"]};
  /* Zaxira va soliq guruhidan tashqari tasdiq bilan o'zgaradigan parametr: vaqtinchalik soliq imtiyozi muddati */
  const ZAXIRA_QOSHIMCHA = ["soliqImtiyozOy"];
  const TK = window.MKB_TORT_KOZ;

  /* Rol (to'liq nomi) bu qarorni o'zi hal qila oladimi: mas'ul rol yoki bo'limdagi tasdiq huquqi */
  function rolHalQiladimi(rolNomi, t){
    if (!rolNomi || !t) return false;
    const nom = MKB.rolNomi ? MKB.rolNomi(rolNomi) : rolNomi;
    if (nom === "Administrator") return true;
    if (t.masulRol) return (MKB.rolNomi ? MKB.rolNomi(t.masulRol) : t.masulRol) === nom;
    return MKB.rolHuquqi ? MKB.rolHuquqi(nom, TASDIQ_BOLIM[t.tur] || "ishlar", "tasdiq") : false;
  }
  /* Qaror vakolati: null — yo'q; {tur: "o'z"} yoki {tur: "o'rinbosar", nomidan: login, ism} */
  function vakolat(t){
    const s = MKBapi.sessiya();
    if (!s || !t) return null;
    /* To'rt ko'z: so'rov muallifi o'z so'rovini hal qilmaydi, administrator ham */
    if (TK.ozimi(t, s)) return null;
    if (MKB.rol() === "admin") return {tur: "o'z"};
    if (!MKB.doira([t]).length) return null;
    /* Mas'ul rol ko'rsatilgan qarorni faqat shu rol hal qiladi (bo'limdagi tasdiq huquqi yetarli emas) */
    if (t.masulRol ? rolHalQiladimi(s.rol, t) : MKB.huquq(TASDIQ_BOLIM[t.tur] || "ishlar", "tasdiq")) return {tur: "o'z"};
    /* O'rinbosarlik: vakolat bergan xodim bu qarorni hal qila olsa va so'rov uniki bo'lmasa */
    const ega = TK.orinbosarlar(D().FOYDLAR || [], s.login, bugun())
      .find(f => rolHalQiladimi(f.rol, t) && !TK.ozimi(t, {login: f.login, ism: f.nom || f.ism}));
    return ega ? {tur: "o'rinbosar", nomidan: ega.login, ism: ega.nom || ega.ism || ega.login} : null;
  }
  function tasdiqlayOladimi(t){ return !!vakolat(t); }
  function qarorBelgisi(t){
    const s = MKBapi.sessiya() || {};
    const v = vakolat(t) || {tur: "o'z"};
    const b = {qarorKim: s.login || null, qarorVakolat: v.tur};
    if (v.nomidan) b.qarorNomidan = v.nomidan;
    return b;
  }
  function tasdiqAsosi(t){
    if (t.asos && typeof t.asos === "object") return t.asos;
    try{ const j = JSON.parse(t.izoh || "null"); if (j && typeof j === "object") return j; }catch(_){ }
    return {};
  }

  /* Tasdiqdan keyingi o'zgarishlar. Avval tekshiriladi va bajariladi, keyin qaror yoziladi. */
  const TASIR = {
    async taklif(t){
      const tk = await top("TAKLIFLAR", t.manbaId);
      kerak(tk, "Taklif topilmadi: " + t.manbaId);
      kerak(tk.amlNatija !== "shubhali", "AML tekshiruvi shubhali natija bergan. Taklifni tasdiqlab bo'lmaydi");
      kerak(tk.amlNatija !== "tekshirilmoqda", "AML tekshiruvi tugamagan. Natijani kuting");
      if (tk.affillanganlik) kerak(tk.qarorRaqami, "Xaridor bank bilan affillangan. Kuzatuv kengashi qarori raqami kiritilmagan");
      await MKBapi.yangilash("TAKLIFLAR", tk.id, {holat: "tasdiqlangan"});
      const natija = {taklifId: tk.id};
      if (tk.lotId){
        const lot = await top("LOTLAR", tk.lotId);
        if (lot){
          const b = bugun();
          await MKBapi.yangilash("LOTLAR", lot.id, {holat: "golib", golib: tk.xaridor, yakuniyNarx: tk.summa, bayonnomaSana: yoz(b),
            tolovMuddati: yoz(ishKuniQosh(b, param("golibTolovIshKuni", 5))),
            shartnomaMuddati: yoz(ishKuniQosh(b, param("shartnomaIshKuni", 10)))});
          /* shu lotdagi boshqa ochiq takliflar rad etiladi */
          for (const x of (D().TAKLIFLAR || []).filter(x => x.lotId === lot.id && x.id !== tk.id &&
                ["yangi", "korib chiqilmoqda", "qo'mitada"].indexOf(x.holat) >= 0))
            await MKBapi.yangilash("TAKLIFLAR", x.id, {holat: "rad etilgan"});
          natija.lotId = lot.id;
        }
      }
      const y = await top("YOZUVLAR", tk.obyektId);
      if (y) await MKBapi.yangilash("YOZUVLAR", y.id, {tarix: tarixQosh(y, "Taklif tasdiqlandi", tk.xaridor + ", " + pul(tk.summa))});
      const lotYangi = natija.lotId ? await top("LOTLAR", natija.lotId) : null;
      const v = await vazifaQosh({nom: "Shartnoma tuzish: " + (y ? (y.qisqa || y.nom) : tk.obyektId), tur: "Realizatsiya",
        rol: "Obyekt menejeri", obyektId: tk.obyektId, kod: tk.id, muhimlik: "yuqori",
        muddat: lotYangi && lotYangi.shartnomaMuddati ? lotYangi.shartnomaMuddati : yoz(ishKuniQosh(bugun(), param("shartnomaIshKuni", 10))),
        izoh: "Taklif " + tk.id + " tasdiqlandi. Xaridor: " + tk.xaridor + ", " + pul(tk.summa)});
      if (v) natija.vazifaId = v.id;
      return natija;
    },
    async pasaytirish(t){
      const lot = await top("LOTLAR", t.manbaId);
      kerak(lot, "Lot topilmadi: " + t.manbaId);
      const narx = Number(t.summa);
      kerak(narx > 0 && narx < lot.boshlangichNarx, "Yangi narx joriy boshlang'ich narxdan past bo'lishi kerak");
      if (lot.minimalNarx) kerak(narx >= lot.minimalNarx, "Yangi narx minimal narxdan (" + pul(lot.minimalNarx) + ") past");
      const foiz = Math.round((1 - narx / lot.boshlangichNarx) * 100);
      await MKBapi.yangilash("LOTLAR", lot.id, {
        pasaytirishlar: (lot.pasaytirishlar || []).concat([{sana: bugunMatn(), foiz, narx, tasdiqId: t.id}]),
        boshlangichNarx: narx,
        keyingiPasaytirishSana: yoz(oyQosh(bugun(), param("pasaytirishOy", 3)))});
      return {lotId: lot.id, narx};
    },
    async baho(t){
      const b = await top("BAHOLASHLAR", t.manbaId);
      kerak(b, "Baholash hisoboti topilmadi: " + t.manbaId);
      kerak(b.bozorQiymati > 0, "Baholash hisobotida bozor qiymati yo'q");
      await MKBapi.yangilash("BAHOLASHLAR", b.id, {holat: "dolzarb"});
      const y = await top("YOZUVLAR", b.obyektId);
      if (y) await MKBapi.yangilash("YOZUVLAR", y.id, {
        qiymat: Object.assign({}, y.qiymat, {bozor: b.bozorQiymati, tugatish: b.tugatishQiymati || null, baholanmagan: false,
          bahoSana: b.sana, baholovchi: b.baholovchi}),
        tarix: tarixQosh(y, "Baholash natijasi tasdiqlandi", "Bozor qiymati " + pul(b.bozorQiymati))});
      return {obyektId: b.obyektId};
    },
    async qabul(t){
      const ish = await top("UNDIRUV_ISHLAR", t.manbaId);
      kerak(ish, "Undiruv ishi topilmadi: " + t.manbaId);
      kerak(!ish.aktivId, "Bu ish bo'yicha aktiv allaqachon balansga qabul qilingan");
      const havola = "qabul-boshlash.html?ish=" + encodeURIComponent(ish.id);
      const garov = (ish.garov && ish.garov.nom) || ish.id;
      const v = await vazifaQosh({nom: "Balansga qabul qilish: " + garov, tur: "Balansga qabul", rol: "Obyekt menejeri",
        kod: ish.id, muhimlik: "yuqori", muddat: yoz(ishKuniQosh(bugun(), 5)),
        izoh: "Undiruv ishi " + ish.id + ". Ustani ochish: " + havola});
      return {havola, vazifaId: v ? v.id : null};
    },
    async chiqim(t){
      const a = await chiqimBajar(t.obyektId || t.manbaId, tasdiqAsosi(t), t.id);
      return {arxivId: a.id};
    },
    /* Zaxira stavkasi yoki soliq bazasi: asos.parametrlar = [{id, qiymat}] PARAMETRLAR ga yoziladi, "taxminiy" belgisi olinadi */
    async zaxira(t){
      const r = zaxiraParametrlari(tasdiqAsosi(t));
      for (const p of r) await MKBapi.yangilash("PARAMETRLAR", p.id, {qiymat: p.qiymat, taxminiy: false});
      return {parametrlar: r.map(p => p.id)};
    },
  };
  /* Zaxira so'rovidagi parametrlar: zaxira yoki soliq guruhidagi mavjud parametr, qiymati manfiy bo'lmagan son */
  function zaxiraParametrlari(asos){
    const r = Array.isArray(asos && asos.parametrlar) ? asos.parametrlar : [];
    kerak(r.length, "So'rovda stavka ko'rsatilmagan");
    return r.map(p => {
      const x = (D().PARAMETRLAR || []).find(q => q && q.id === (p && p.id));
      kerak(x, "Parametr topilmadi: " + (p && p.id));
      kerak(["zaxira", "soliq"].indexOf(x.guruh) >= 0 || ZAXIRA_QOSHIMCHA.indexOf(x.id) >= 0, "Bu parametr zaxira yoki soliq guruhida emas: " + x.id);
      const q = Number(p.qiymat);
      kerak(Number.isFinite(q) && q >= 0, "Stavka qiymati noto'g'ri: " + x.nom);
      if (x.birlik === "%") kerak(q <= 100, "Stavka 100% dan oshmasin: " + x.nom);
      return {id: x.id, qiymat: q, nom: x.nom, eski: x.qiymat};
    });
  }

  async function keyingi(kol, old, uz){ return MKB.keyingiId(kol, old, uz); }

  MKB.tasdiq = {
    /* Tasdiqlay oladimi: sahifa tugmani shu orqali ko'rsatadi. O'z so'rovi uchun har doim false */
    mumkinmi: tasdiqlayOladimi,
    /* Vakolat turi: null | {tur: "o'z"} | {tur: "o'rinbosar", nomidan, ism} */
    vakolat,
    /* So'rov joriy xodimniki: sahifa tugma o'rniga "Siz yuborgansiz. Boshqa xodim tasdiqlaydi" deb yozadi */
    ozimi: t => TK.ozimi(t, MKBapi.sessiya()),
    async qabul(id){
      const t = await top("TASDIQLAR", id);
      kerak(t, "Qaror topilmadi: " + id);
      kerak(t.holat === "kutilmoqda", "Bu masala bo'yicha qaror allaqachon qabul qilingan");
      kerak(!TK.ozimi(t, MKBapi.sessiya()), TK.XATO_OZ);
      kerak(tasdiqlayOladimi(t), "Sizda bu qarorni tasdiqlash huquqi yo'q");
      const belgi = qarorBelgisi(t);
      const ish = TASIR[t.tur];
      const natija = ish ? await ish(t) : {};
      await MKBapi.yangilash("TASDIQLAR", id, Object.assign({holat: "tasdiqlangan", qaror: "tasdiqlandi", sabab: "", qarorSana: bugunMatn()}, belgi));
      hosilalar();
      return natija;
    },
    async rad(id, sabab){
      const t = await top("TASDIQLAR", id);
      kerak(t, "Qaror topilmadi: " + id);
      kerak(t.holat === "kutilmoqda", "Bu masala bo'yicha qaror allaqachon qabul qilingan");
      kerak(!TK.ozimi(t, MKBapi.sessiya()), TK.XATO_OZ);
      kerak(tasdiqlayOladimi(t), "Sizda bu qarorni rad etish huquqi yo'q");
      const belgi = qarorBelgisi(t);
      sabab = String(sabab || "").trim();
      kerak(sabab.length >= 5, "Rad etish sababini yozing");
      if (t.tur === "taklif" && t.manbaId && await top("TAKLIFLAR", t.manbaId))
        await MKBapi.yangilash("TAKLIFLAR", t.manbaId, {holat: "rad etilgan"});
      if (t.tur === "baho" && t.manbaId && await top("BAHOLASHLAR", t.manbaId))
        await MKBapi.yangilash("BAHOLASHLAR", t.manbaId, {holat: "rad etilgan"});
      await MKBapi.yangilash("TASDIQLAR", id, Object.assign({holat: "rad etilgan", qaror: "rad etildi", sabab, qarorSana: bugunMatn()}, belgi));
      hosilalar();
      return {id};
    },
    /* Yangi qaror so'rovi: {tur, manbaKol, manbaId, obyektId, sarlavha, tavsif, summa, masulRol, javobIshKuni, asos} */
    async sorov(m){
      m = m || {};
      kerak(TASDIQ_BOLIM[m.tur], "Qaror turi noto'g'ri: " + m.tur);
      kerak((TASDIQ_SORUV_BOLIM[m.tur] || [TASDIQ_BOLIM[m.tur]]).some(b => MKB.huquq(b, "yoz")), "Sizda bu masala bo'yicha qaror so'rash huquqi yo'q");
      if (TASDIQ_SORUVCHI[m.tur]) kerak(TASDIQ_SORUVCHI[m.tur].indexOf(MKB.rol()) >= 0, "Bu so'rovni Buxgalteriya va risk yuboradi");
      kerak(String(m.sarlavha || "").trim(), "Qaror sarlavhasi kiritilmagan");
      if (m.tur === "zaxira") zaxiraParametrlari(m.asos);
      const ochiq = (D().TASDIQLAR || []).find(x => x.holat === "kutilmoqda" && x.tur === m.tur && x.manbaId && x.manbaId === m.manbaId);
      kerak(!ochiq, "Bu masala bo'yicha qaror kutilmoqda: " + (ochiq && ochiq.id));
      const s = MKBapi.sessiya() || {};
      const yozuv = {
        id: await keyingi("TASDIQLAR", "TS-" + yil() + "/", 4),
        tur: m.tur, manbaKol: m.manbaKol || null, manbaId: m.manbaId || null, obyektId: m.obyektId || null,
        sarlavha: String(m.sarlavha).trim(), tavsif: String(m.tavsif || "").trim(),
        summa: m.summa != null && m.summa !== "" ? Number(m.summa) : null,
        muallif: s.ism || "—", muallifLogin: s.login || null, masulRol: m.masulRol || "Rahbariyat",
        javobMuddati: yoz(ishKuniQosh(bugun(), m.javobIshKuni || 5)),
        holat: "kutilmoqda", qaror: null, sabab: "", qarorSana: null, sana: bugunMatn(),
      };
      if (m.asos){
        if (sxemadami("TASDIQLAR", "asos")) yozuv.asos = m.asos;
        else yozuv.izoh = JSON.stringify(m.asos);
      }
      const r = await MKBapi.yangi("TASDIQLAR", yozuv);
      hosilalar();
      return r;
    },
  };

  /* ============================================================
     Balansdan chiqarish: ARXIV yozuvi, aktiv holati "Chiqarildi"
     asos: {usul, sana, narx, xaridor, shartnomaId, lotId, hujjat}
     ============================================================ */
  const PULLI_USUL = ["eauksion", "togridan", "bolib", "lizing", "biznes"];
  const CHIQIM_SOROV_XATO = "Balansdan chiqarish qaror so'rovi orqali bajariladi: so'rov yuboring, uni boshqa xodim tasdiqlaydi";
  async function chiqimBajar(obyektId, asos, tasdiqId){
    asos = asos || {};
    const y = await top("YOZUVLAR", obyektId);
    kerak(y, "Obyekt topilmadi: " + obyektId);
    kerak(y.holat !== "Chiqarildi", "Obyekt allaqachon balansdan chiqarilgan");
    /* To'rt ko'z: balansdan chiqarish faqat boshqa xodim tasdiqlagan qaror so'rovi orqali (server ham tekshiradi) */
    kerak(tasdiqId, CHIQIM_SOROV_XATO);
    kerak(MKB.doira([y]).length, "Obyekt sizning filialingizga tegishli emas");
    let sh = asos.shartnomaId ? await top("SHARTNOMALAR", asos.shartnomaId) : null;
    const usul = asos.usul || (sh && sh.sotishUsuli);
    kerak(usul && ((D().SOTISH_USULLARI || []).some(u => u.kalit === usul) || usul === "hisobdan"), "Chiqarish usuli tanlanmagan");
    const sana = oqi(asos.sana || (sh && sh.sana) || bugunMatn());
    kerak(sana, "Chiqarish sanasi noto'g'ri");
    kerak(sana <= bugun(), "Chiqarish sanasi kelajakda bo'lishi mumkin emas");
    const balans = y.balans || {};
    if (balans.sana) kerak(sana >= oqi(balans.sana), "Chiqarish sanasi balansga qabul sanasidan oldin");
    const narx = asos.narx != null && asos.narx !== "" ? Number(asos.narx) : (sh ? Number(sh.narx) : 0);
    kerak(Number.isFinite(narx) && narx >= 0, "Sotuv narxi noto'g'ri");
    if (PULLI_USUL.indexOf(usul) >= 0) kerak(narx > 0, "Sotuv narxi kiritilmagan");
    const balansQiymat = Number(balans.qiymat) || 0;
    const jamiXarajat = yaxlit((D().XARAJATLAR || []).filter(x => x.obyektId === y.id && x.holat !== "bekor")
      .reduce((s, x) => s + (Number(x.summa) || 0), 0), 1);
    let tiklanganZaxira = 0;
    try{ const z = D().zaxiraHisobi ? D().zaxiraHisobi(y, sana) : null; tiklanganZaxira = z && z.summa ? yaxlit(z.summa, 1) : 0; }catch(_){ }
    const arxiv = {
      id: y.id, obyektId: y.id, nom: y.nom, qisqa: y.qisqa || y.nom, tur: y.tur, turKalit: y.turKalit, rasmTuri: y.rasmTuri,
      hudud: y.hudud, hududKod: y.hududKod || null, filial: y.filial, filialKod: y.filialKod || null,
      balansSana: balans.sana || null, balansQiymat, sotuvSana: yoz(sana), sotuvNarxi: narx, sotishUsuli: usul,
      xaridor: asos.xaridor || (sh && sh.xaridor) || null, jamiXarajat, tiklanganZaxira,
      foydaZarar: yaxlit(narx - balansQiymat - jamiXarajat, 1),
      shartnomaId: asos.shartnomaId || null, lotId: asos.lotId || (sh && sh.lotId) || null,
      turganKun: balans.sana ? kunFarqi(oqi(balans.sana), sana) : null,
      rasm: y.rasm || "", rasmKichik: y.rasmKichik || "",
    };
    if (asos.hujjat) arxiv.izoh = String(asos.hujjat);
    await MKBapi.yangi("ARXIV", arxiv);
    await MKBapi.yangilash("YOZUVLAR", y.id, {holat: "Chiqarildi", bosqich: "chiqim",
      tarix: tarixQosh(y, "Balansdan chiqarildi", usulNomi(usul) + (narx ? ", " + pul(narx) : "") + (asos.hujjat ? ". " + asos.hujjat : ""))});
    if (arxiv.lotId && await top("LOTLAR", arxiv.lotId)) await MKBapi.yangilash("LOTLAR", arxiv.lotId, {holat: "sotildi", yakuniyNarx: narx || null});
    hosilalar();
    return arxiv;
  }
  /* To'g'ridan-to'g'ri chiqarish yo'q: MKB.chiqim.sorov bilan so'rov yuboriladi, uni boshqa xodim MKB.tasdiq.qabul bilan tasdiqlaydi */
  MKB.chiqim = function(){ return Promise.reject(new Error(CHIQIM_SOROV_XATO)); };
  /* Tasdiqlash huquqi bo'lmasa: rahbariyatga qaror so'rovi */
  MKB.chiqim.sorov = async function(obyektId, asos){
    asos = asos || {};
    const y = await top("YOZUVLAR", obyektId);
    kerak(y, "Obyekt topilmadi: " + obyektId);
    kerak(y.holat !== "Chiqarildi", "Obyekt allaqachon balansdan chiqarilgan");
    kerak(asos.usul, "Chiqarish usuli tanlanmagan");
    return MKB.tasdiq.sorov({tur: "chiqim", manbaKol: "YOZUVLAR", manbaId: y.id, obyektId: y.id,
      sarlavha: "Balansdan chiqarish: " + (y.qisqa || y.nom),
      tavsif: usulNomi(asos.usul) + (asos.narx ? ", " + pul(Number(asos.narx)) : "") + (asos.xaridor ? ", " + asos.xaridor : ""),
      summa: asos.narx != null && asos.narx !== "" ? Number(asos.narx) : null, masulRol: "Rahbariyat", asos});
  };

  /* ============================================================
     Lot (VM 18): e'londan savdogacha kamida elonMinKun kun, qadam 2000 BHM chegarasi bo'yicha
     m: {sotishUsuli, elonSana, savdoSana, boshlangichNarx, minimalNarx, zakalatFoiz, eauksionLotRaqami, qarorRaqami, paketId}
     ============================================================ */
  /* Faol lot: savdo o'tkazilmagan lot ham faol hisoblanadi — undan takroriy savdo yoki narx pasaytirish
     davom etadi. Yangi lot uchun avvalgisi "bekor" qilinadi yoki "sotildi" bo'ladi. */
  const FAOL_LOT = ["tayyorlanmoqda", "elon", "otkazilmagan", "golib"];
  MKB.FAOL_LOT = FAOL_LOT.slice();
  /* Obyektning faol loti; istisno — tahrir qilinayotgan lotning o'zi */
  const faolLot = (obyektId, istisno) => (D().LOTLAR || []).find(l => l.obyektId === obyektId && l.id !== istisno && FAOL_LOT.indexOf(l.holat) >= 0) || null;
  function lotTekshir(y, m){
    const xatolar = [];
    const usul = m.sotishUsuli || "eauksion";
    if (!(D().SOTISH_USULLARI || []).some(u => u.kalit === usul)) xatolar.push("Sotish usuli noto'g'ri");
    const narx = Number(m.boshlangichNarx);
    if (!(narx > 0)) xatolar.push("Boshlang'ich narx kiritilmagan");
    if (["eauksion", "togridan"].indexOf(usul) >= 0 && (!y.qiymat || y.qiymat.baholanmagan || !y.qiymat.bozor))
      xatolar.push("Obyekt baholanmagan. Boshlang'ich narx baholash hisobotiga asoslanadi");
    const minimal = m.minimalNarx != null && m.minimalNarx !== "" ? Number(m.minimalNarx) : null;
    if (minimal != null && !(minimal > 0 && minimal <= narx)) xatolar.push("Minimal narx boshlang'ich narxdan oshmasligi kerak");
    const elon = m.elonSana ? oqi(m.elonSana) : null, savdo = m.savdoSana ? oqi(m.savdoSana) : null;
    if (m.elonSana && !elon) xatolar.push("E'lon sanasi noto'g'ri");
    if (m.savdoSana && !savdo) xatolar.push("Savdo sanasi noto'g'ri");
    const minKun = param("elonMinKun", 30);
    if (usul === "eauksion"){
      if (!elon || !savdo) xatolar.push("E'lon va savdo sanalari kiritilmagan");
      else {
        const farq = kunFarqi(elon, savdo);
        if (farq < minKun) xatolar.push("E'londan savdogacha kamida " + minKun + " kun bo'lishi kerak (VM 18). Hozir " + farq + " kun");
      }
    }
    return {xatolar, usul, narx, minimal, elon, savdo};
  }
  MKB.lot = {
    /* Formada oldindan ko'rsatish uchun: xatolar ro'yxati, bo'sh bo'lsa lot yaratish mumkin */
    /* istisnoLotId: mavjud lotni tekshirishda (e'lon qilish) shu lotning o'zi faol lot sifatida hisoblanmaydi */
    tekshir(obyektId, m, istisnoLotId){
      const y = (D().YOZUVLAR || []).find(x => x.id === obyektId);
      if (!y) return ["Obyekt topilmadi"];
      const faol = faolLot(obyektId, istisnoLotId);
      return (faol ? ["Bu obyekt uchun faol lot bor: " + faol.id] : []).concat(lotTekshir(y, m || {}).xatolar);
    },
    /* Auksion qadami: 2000 BHM dan yuqori lotda kichik qadam */
    qadamFoiz(narx){
      const chegara = 2000 * param("bhmMing", 412) / 1000;
      return Number(narx) > chegara ? param("qadamFoizKatta", 5) : param("qadamFoiz", 10);
    },
    async yarat(obyektId, m){
      m = m || {};
      kerak(MKB.huquq("realizatsiya", "yoz"), "Sizda lot yaratish huquqi yo'q");
      const y = await top("YOZUVLAR", obyektId);
      kerak(y, "Obyekt topilmadi: " + obyektId);
      kerak(y.holat !== "Chiqarildi", "Obyekt balansdan chiqarilgan");
      kerak(MKB.doira([y]).length, "Obyekt sizning filialingizga tegishli emas");
      const faol = faolLot(obyektId);
      kerak(!faol, "Bu obyekt uchun faol lot bor: " + (faol && faol.id));
      const t = lotTekshir(y, m);
      kerak(!t.xatolar.length, t.xatolar.join(". "));
      const b = bugun();
      const lot = {
        id: await keyingi("LOTLAR", "LT-" + yil() + "/", 4), obyektId,
        eauksionLotRaqami: String(m.eauksionLotRaqami || "").trim() || null, sotishUsuli: t.usul,
        elonSana: t.elon ? yoz(t.elon) : null, savdoSana: t.savdo ? yoz(t.savdo) : null,
        boshlangichNarx: t.narx, minimalNarx: t.minimal,
        zakalatFoiz: m.zakalatFoiz != null && m.zakalatFoiz !== "" ? Number(m.zakalatFoiz) : param("zakalatFoiz", 10),
        qadamFoiz: MKB.lot.qadamFoiz(t.narx), pasaytirishlar: [],
        keyingiPasaytirishSana: yoz(oyQosh(t.elon || b, param("pasaytirishOy", 3))),
        holat: t.elon && t.elon <= b ? "elon" : "tayyorlanmoqda", golib: null, yakuniyNarx: null, bayonnomaSana: null,
        ishtirokchilarSoni: 0, takroriySavdoSana: null, tolovMuddati: null, shartnomaMuddati: null,
        paketId: m.paketId || null, qarorRaqami: String(m.qarorRaqami || "").trim() || null,
      };
      const r = await MKBapi.yangi("LOTLAR", lot);
      const holat = t.usul === "ijara" ? "Ijarada" : t.usul === "davaktiv" ? "Davaktivga o'tkazilgan" : "Lotda";
      await MKBapi.yangilash("YOZUVLAR", y.id, {holat, bosqich: "lot",
        sotuv: Object.assign({}, y.sotuv, {holat: lot.holat, usul: t.usul, lotId: lot.id}),
        tarix: tarixQosh(y, "Lot yaratildi", lot.id + ", " + usulNomi(t.usul) + ", " + pul(t.narx))});
      hosilalar();
      return r;
    },
    /* Savdo o'tkazilmadi: takroriy savdo kamida takroriySavdoMinKun kundan keyin */
    async otkazilmadi(lotId, takroriySana){
      kerak(MKB.huquq("realizatsiya", "yoz"), "Sizda lotni o'zgartirish huquqi yo'q");
      const lot = await top("LOTLAR", lotId);
      kerak(lot, "Lot topilmadi: " + lotId);
      kerak(["elon", "tayyorlanmoqda"].indexOf(lot.holat) >= 0, "Bu lot holatida savdo natijasini o'zgartirib bo'lmaydi");
      const patch = {holat: "otkazilmagan"};
      if (takroriySana){
        const t = oqi(takroriySana), s = oqi(lot.savdoSana) || bugun();
        kerak(t, "Takroriy savdo sanasi noto'g'ri");
        const min = param("takroriySavdoMinKun", 10);
        kerak(kunFarqi(s, t) >= min, "Takroriy savdo birinchi savdodan kamida " + min + " kun keyin bo'lishi kerak");
        patch.takroriySavdoSana = yoz(t);
      }
      await MKBapi.yangilash("LOTLAR", lot.id, patch);
      hosilalar();
      return lot;
    },
  };

  /* ============================================================
     Shartnoma: tasdiqlangan taklif asosida. Bo'lib to'lashda avans va oylik jadval.
     m: {sotishUsuli, oy, avans}
     ============================================================ */
  MKB.shartnoma = {
    async yarat(taklifId, m){
      m = m || {};
      kerak(MKB.huquq("realizatsiya", "yoz"), "Sizda shartnoma tuzish huquqi yo'q");
      const tk = await top("TAKLIFLAR", taklifId);
      kerak(tk, "Taklif topilmadi: " + taklifId);
      kerak(tk.holat === "tasdiqlangan", "Taklif hali tasdiqlanmagan");
      kerak(tk.amlNatija === "toza", "AML tekshiruvi yakunlanmagan yoki shubhali");
      if (tk.affillanganlik) kerak(tk.qarorRaqami, "Affillangan xaridor: kuzatuv kengashi qarori raqami kerak");
      const bor = (D().SHARTNOMALAR || []).find(s => s.taklifId === taklifId && s.holat !== "bekor");
      kerak(!bor, "Bu taklif bo'yicha shartnoma bor: " + (bor && bor.id));
      const lot = tk.lotId ? await top("LOTLAR", tk.lotId) : null;
      const b = bugun();
      if (lot && lot.shartnomaMuddati && oqi(lot.shartnomaMuddati))
        kerak(b <= oqi(lot.shartnomaMuddati), "Shartnoma tuzish muddati " + lot.shartnomaMuddati + " da tugagan (VM 18, " + param("shartnomaIshKuni", 10) + " ish kuni)");
      const usul = m.sotishUsuli || (/bo.?lib/i.test(tk.tolovSharti || "") ? "bolib" : lot ? lot.sotishUsuli : "togridan");
      const narx = Number(tk.summa);
      kerak(narx > 0, "Taklif summasi noto'g'ri");
      let avans = narx, jadval = [];
      if (usul === "bolib"){
        const oy = Number(m.oy) || Number((/(\d+)\s*oy/.exec(tk.tolovSharti || "") || [])[1]) || 12;
        kerak(oy >= 1 && oy <= 120, "To'lov muddati noto'g'ri");
        avans = m.avans != null && m.avans !== "" ? Number(m.avans) : yaxlit(narx * param("avansFoiz", 15) / 100, 1);
        kerak(avans >= 0 && avans < narx, "Avans summasi noto'g'ri");
        const oylik = yaxlit((narx - avans) / oy, 1);
        let qoldi = yaxlit(narx - avans, 1);
        for (let i = 1; i <= oy; i++){
          const s = i === oy ? yaxlit(qoldi, 1) : oylik;
          qoldi = yaxlit(qoldi - s, 1);
          jadval.push({sana: yoz(oyQosh(b, i)), summa: s, tolandi: false});
        }
      }
      const sh = {
        id: await keyingi("SHARTNOMALAR", "SH-" + yil() + "/", 4),
        lotId: tk.lotId || null, taklifId: tk.id, obyektId: tk.obyektId, xaridor: tk.xaridor, narx, avans,
        sotishUsuli: usul, sana: yoz(b), jadval, taqiqHolati: usul === "bolib" ? "taqiq qo'yilgan" : "yechilgan", holat: "faol",
      };
      const r = await MKBapi.yangi("SHARTNOMALAR", sh);
      await MKBapi.yangilash("TAKLIFLAR", tk.id, {holat: "shartnoma tuzilgan"});
      if (lot) await MKBapi.yangilash("LOTLAR", lot.id, {holat: "sotildi", yakuniyNarx: narx});
      const y = await top("YOZUVLAR", tk.obyektId);
      if (y){
        const patch = {bosqich: "shartnoma", sotuv: Object.assign({}, y.sotuv, {holat: "shartnoma", shartnomaId: sh.id}),
          tarix: tarixQosh(y, "Shartnoma tuzildi", sh.id + ", " + tk.xaridor + ", " + pul(narx))};
        if (usul === "bolib") patch.holat = "Bo'lib to'lashda";
        await MKBapi.yangilash("YOZUVLAR", y.id, patch);
      }
      hosilalar();
      return r;
    },
  };

  /* ============================================================
     Hodisa: {obyektId, hodisa, jiddiylik, tavsif, manba, masul, iibAriza:{raqam, sana}}
     ============================================================ */
  /* Saqlanadigan rang ekrandagi shkala bilan bir xil (yadro/app.css --jid-*, MKB.jiddiylik) */
  const JIDDIYLIK_RANG = {"yuqori": "var(--jid-yuqori)", "o'rta": "var(--jid-orta)", "past": "var(--jid-past)"};
  const HODISA_BOSQICH = ["yangi", "tekshiruvda", "bartaraf", "hal", "yopildi"];
  MKB.hodisa = {
    /* Holat o'tishi qoidasi (hodisa.html va hodisalar.html doskasi uchun yagona):
       faqat qo'shni bosqichga (oldinga yoki orqaga) yoki yopilgandan qayta ochish (tekshiruvda);
       "hal" va "yopildi" uchun ko'rilgan chora (chora/izoh) yozilgan bo'lishi shart.
       Qaytaradi: "" (ruxsat) | "chora" | "bosqich" */
    otishXatosi(yozuv, kol, eski, yangi){
      const i = HODISA_BOSQICH.indexOf(eski), j = HODISA_BOSQICH.indexOf(yangi);
      if (i < 0 || j < 0 || i === j) return "bosqich";
      if (!(Math.abs(i - j) === 1 || (eski === "yopildi" && yangi === "tekshiruvda"))) return "bosqich";
      const xulosa = (yozuv || {})[kol === "XAVFSIZLIK_HODISALARI" ? "chora" : "izoh"];
      if ((yangi === "hal" || yangi === "yopildi") && !String(xulosa || "").trim()) return "chora";
      return "";
    },
    async yarat(m){
      m = m || {};
      kerak(MKB.huquq("himoya", "yoz") || MKB.huquq("korik", "yoz") || MKB.huquq("aktivlar", "yoz"), "Sizda hodisa qayd etish huquqi yo'q");
      const y = await top("YOZUVLAR", m.obyektId);
      kerak(y, "Obyekt tanlanmagan");
      kerak(MKB.doira([y]).length, "Obyekt sizning filialingizga tegishli emas");
      const nom = String(m.hodisa || "").trim();
      kerak(nom.length >= 3, "Hodisa nomini yozing");
      const jid = m.jiddiylik || "o'rta";
      kerak(JIDDIYLIK_RANG[jid], "Jiddiylik darajasi noto'g'ri");
      let iib = null;
      if (m.iibAriza && (m.iibAriza.raqam || m.iibAriza.sana)){
        kerak(String(m.iibAriza.raqam || "").trim(), "IIB arizasi raqami kiritilmagan");
        const s = oqi(m.iibAriza.sana);
        kerak(s, "IIB arizasi sanasi noto'g'ri");
        iib = {raqam: String(m.iibAriza.raqam).trim(), sana: yoz(s)};
      }
      const s = MKBapi.sessiya() || {};
      const id = await keyingi("HODISALAR", "GH-" + yil() + "-", 5);
      const yozuv = {id, kod: "#" + id, obyektId: y.id, rang: JIDDIYLIK_RANG[jid], hodisa: nom, vaqt: vaqtMatn(),
        jiddiylik: jid, ustun: "yangi", holat: "Yangi", manba: m.manba || "qo'lda", tavsif: String(m.tavsif || "").trim(),
        masul: m.masul || s.ism || "—", bolim: s.filial || "", iibAriza: iib, bino: y.qisqa || y.nom,
        joy: y.hududToliq || y.hudud || "", sarlavha: (y.qisqa || y.nom) + " — " + nom};
      const r = await MKBapi.yangi("HODISALAR", yozuv);
      if (jid === "yuqori"){
        try{
          await MKBapi.yangi("BILDIRISHLAR", {id: "HODISA|" + id, qoidaId: null, obyektId: y.id,
            sarlavha: "Jiddiy hodisa: " + nom, matn: (y.qisqa || y.nom) + ". " + yozuv.tavsif.slice(0, 160),
            havola: "hodisa.html?id=" + encodeURIComponent(id), sana: bugunMatn(), rol: "Xavfsizlik xizmati", oqildi: false, ikon: "i-xavf"});
        }catch(_){ }
      }
      hosilalar();
      return r;
    },
  };

  /* ============================================================
     Qoidalar dvigateli: QOIDALAR asosida bildirishnoma va vazifalar (idempotent id bilan),
     oylik zaxira surati va o'tgan oy uchun MB hisoboti
     ============================================================ */
  let ishlamoqda = false;
  const TIZIM = {tizim: true};
  async function idlar(kol){
    if (MKBapi.rejim() === "server"){
      try{ return new Set((await MKBapi.royxat(kol)).map(x => x.id)); }catch(_){ }
    }
    return new Set((D()[kol] || []).map(x => x && x.id));
  }
  function nafas(){ return new Promise(r => setTimeout(r, 0)); }
  const oyKalit = d => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0");

  MKB.qoidalar = {
    natijalar(){
      const d = D();
      if (!d.qoidaNatijalari) return [];
      const faol = new Set((d.QOIDALAR || []).filter(q => q.faol !== false).map(q => q.id));
      return d.qoidaNatijalari().filter(n => !n.qoidaId || faol.has(n.qoidaId));
    },
    async ishgaTushir(){
      if (ishlamoqda || !window.MKBapi || !MKBapi.sessiya()) return null;
      ishlamoqda = true;
      const hisob = {bildirish: 0, vazifa: 0, zaxira: 0, mb: 0};
      try{
        await MKBapi.tayyor;
        const d = D();
        /* Server rejimida surat, MB hisoboti va boshqa filial obyektlari bo'yicha yozuvni faqat huquqi bor rol yozadi (boshqasi 403 oladi) */
        const server = MKBapi.rejim() === "server";
        const natijalar = server ? MKB.doira(MKB.qoidalar.natijalar()) : MKB.qoidalar.natijalar();
        const B = await idlar("BILDIRISHLAR"), V = await idlar("MENING_VAZIFALARIM");
        const qoidaNomi = id => ((d.QOIDALAR || []).find(q => q.id === id) || {}).nom || "Nazorat";
        let k = 0;
        for (const n of natijalar){
          try{
            if (n.tur === "bildirish" && !B.has(n.id)){
              await MKBapi.yangi("BILDIRISHLAR", {id: n.id, qoidaId: n.qoidaId || null, obyektId: n.obyektId || null,
                sarlavha: n.sarlavha, matn: n.matn || "", havola: n.havola || "", sana: n.sana || bugunMatn(),
                rol: n.rol || null, oqildi: false, ikon: n.ikon || "i-ogoh"}, TIZIM);
              B.add(n.id); hisob.bildirish++;
            } else if (n.tur === "vazifa" && !V.has(n.id)){
              await MKBapi.yangi("MENING_VAZIFALARIM", {id: n.id, nom: n.sarlavha, tur: qoidaNomi(n.qoidaId), obyektId: n.obyektId || null,
                kod: n.obyektId || "", qoidaId: n.qoidaId || null, sana: n.sana || bugunMatn(), muddat: n.muddat || null,
                ijrochi: null, rol: n.rol || null, muhimlik: n.muhimlik || "orta", bajarildi: false}, TIZIM);
              V.add(n.id); hisob.vazifa++;
            }
          }catch(_){ /* boshqa oynada yozilgan yoki server rad etgan — keyingisiga o'tiladi */ }
          if (++k % 25 === 0) await nafas();
        }
        /* Oylik zaxira surati: joriy oy uchun bir marta */
        const b = bugun(), davr = oyKalit(b);
        if (d.zaxiraTarixHisobla && (!server || MKB.huquq("qiymat", "yoz")) && !(d.ZAXIRA_TARIX || []).some(z => z.davr === davr)){
          const Z = await idlar("ZAXIRA_TARIX");
          for (const z of d.zaxiraTarixHisobla(davr) || []){
            if (Z.has(z.id)) continue;
            try{ await MKBapi.yangi("ZAXIRA_TARIX", z, TIZIM); hisob.zaxira++; }catch(_){ }
            if (hisob.zaxira % 25 === 0) await nafas();
          }
        }
        /* O'tgan oy uchun MB hisoboti (muddati keyingi oyning 10-sanasi) */
        const otgan = oyKalit(new Date(b.getFullYear(), b.getMonth() - 1, 1));
        if (d.mbHisobotHisobla && (!server || MKB.huquq("hisobot", "yoz")) && !(d.MB_HISOBOTLAR || []).some(m => m.davr === otgan)){
          try{ await MKBapi.yangi("MB_HISOBOTLAR", d.mbHisobotHisobla(otgan), TIZIM); hisob.mb++; }catch(_){ }
        }
        if (hisob.bildirish || hisob.vazifa || hisob.zaxira || hisob.mb){
          /* amallar jurnaliga yozuvlar soni bitta "Tizim" yozuvi bilan tushadi */
          if (MKBapi.tizimQayd) await MKBapi.tizimQayd({BILDIRISHLAR: hisob.bildirish, MENING_VAZIFALARIM: hisob.vazifa,
            ZAXIRA_TARIX: hisob.zaxira, MB_HISOBOTLAR: hisob.mb});
          hosilalar();
        }
        else if (MKB.qongiroqYangila) MKB.qongiroqYangila();
        document.dispatchEvent(new CustomEvent("mkb:qoidalar", {detail: hisob}));
      } finally { ishlamoqda = false; }
      return hisob;
    },
  };

  /* Har yuklanishda: sahifa chizilgach, fon rejimida */
  function boshla(){
    if (document.body && document.body.dataset.ochiq === "1") return;
    setTimeout(() => { MKB.qoidalar.ishgaTushir().catch(() => {}); }, 700);
  }
  if (window.MKB_TAYYOR) boshla();
  else document.addEventListener("mkb:tayyor", boshla, {once: true});
})();
