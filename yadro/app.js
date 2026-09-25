/* ============================================================
   app.js — tizim qobig'i v5
   Yon panel va shapka · rollar va huquqlar · UZ/RU tarjima ·
   umumiy UI qismlari (jadval, forma, halqa, zanjir, modal, toast,
   obyekt surati, galereya, obyekt tablari, fayl maydoni, muddat lentasi)
   Biznes amallari (tasdiq, chiqim, lot, shartnoma, hodisa, qoidalar) — yadro/amal.js
   Umumiy ish qulayligi (tasdiqlash oynasi, band tugma, qaytarish, qoralama, forma tekshiruvi, buyruqlar oynasi,
   sessiya, aloqa, sayohat, yordam) — yadro/ux.js; sayohat matnlari — yadro/sayohatlar.js
   ============================================================ */

/* Keshlash kaliti: sahifalardagi ?v= bilan bir xil */
const MKB_VERSIYA = "26092200";
/* Sahifa ochilgandagi so'rov qatori: sahifa skripti manzilni keyin almashtirsa ham (?sayohat=, ?korinish=) o'qiladi */
window.MKB_BOSH_URL = location.search;

/* ---------- Bo'limlar reyestri (yon panel tartibi) ----------
   Olti ish bo'limi + rolning bosh sahifasi (panel) + pastki blok (sozlama).
   Yon panelda bir bo'lim — bir band: bo'lim ichidagi sahifalar bo'lim markazida va Ctrl+K da. */
const BOLIMLAR = [
  {kalit: "panel",    yorliq: "Boshqaruv paneli",   qisqa: "Panel",      ikonka: "panel",    href: "panel.html"},
  {kalit: "aktivlar", yorliq: "Balans aktivlari",   qisqa: "Aktivlar",   ikonka: "aktivlar", href: "obyektlar.html"},
  {kalit: "nazorat",  yorliq: "Nazorat va himoya",  qisqa: "Nazorat",    ikonka: "qalqon",   href: "himoya.html"},
  {kalit: "qiymat",   yorliq: "Qiymat va moliya",   qisqa: "Moliya",     ikonka: "baholash", href: "baholash.html"},
  {kalit: "sotuv",    yorliq: "Sotuv va undiruv",   qisqa: "Sotuv",      ikonka: "savdo",    href: "realizatsiya.html"},
  {kalit: "ishlar",   yorliq: "Ishlar va qarorlar", qisqa: "Ishlar",     ikonka: "vazifa",   href: "vazifalar.html"},
  {kalit: "hisobot",  yorliq: "Hisobotlar",         qisqa: "Hisobotlar", ikonka: "hisobot",  href: "hisobotlar.html"},
];
/* Eski data-sahifa kalitlari yangi bo'limga tushadi (sahifalardagi data-sahifa o'zgarmaydi) */
const BOLIM_TAXALLUS = {kn: "nazorat", himoya: "nazorat", korik: "nazorat", baholash: "qiymat",
  realizatsiya: "sotuv", yuridik: "sotuv", vazifa: "ishlar"};
/* Bo'lim markazi rolga qarab boshqacha: buxgalteriya moliyada zaxiradan, sotuvda shartnomalardan boshlaydi;
   rahbariyat va administrator uchun "Ishlar" bandi to'g'ridan-to'g'ri qarorlar navbatini ochadi */
const BOLIM_BOSH_ROL = {
  qiymat: {buxgalteriya: "zaxira.html"},
  sotuv:  {buxgalteriya: "shartnomalar.html"},
  ishlar: {rahbariyat: "tasdiqlar.html", admin: "tasdiqlar.html"},
};
/* Yon panel bandining rolga bog'liq yorlig'i */
const BOLIM_YORLIQ_ROL = {ishlar: {rahbariyat: "Qarorlar", admin: "Qarorlar"}};

/* ---------- Rollar ----------
   To'rt ish roli (rahbariyat, obyekt, nazorat, buxgalteriya) va texnik administrator.
   Nomlar MKB_DATA.FOYDLAR va server bilan bir xil. Kalit bosh sahifani va huquqlarni belgilaydi. */
const ROL_KALIT = {
  "Administrator": "admin",
  "Rahbariyat": "rahbariyat",                        /* rais, boshqaruv a'zosi, filial rahbari: ko'radi va tasdiqlaydi */
  "Obyekt menejeri": "obyekt",                       /* reyestr, qabul, hujjat, baholash buyurtmasi, sotuv, ijara, undiruv */
  "Ko'rik va xavfsizlik inspektori": "nazorat",      /* ko'rik, inventarizatsiya, qurilma, hodisa, qo'riqlash */
  "Buxgalteriya va risk": "buxgalteriya",            /* zaxira, soliq, MB hisoboti, to'lovlar */
};
/* Eski rol nomlari yangi rolga o'tadi: saqlangan sessiya, eski yozuv va qoidalarda uchraydi.
   ROL_YANGI — nomni almashtirish jadvali; rolNomiKanon undan boshqa hech narsa qilmaydi. */
const ROL_YANGI = {
  "Filial rahbari": "Rahbariyat",
  "Baholovchi": "Obyekt menejeri",
  "Baholovchi mutaxassis": "Obyekt menejeri",
  "Realizatsiya mutaxassisi": "Obyekt menejeri",
  "Yurist": "Obyekt menejeri",
  "Xavfsizlik xizmati": "Ko'rik va xavfsizlik inspektori",
  "Ko'rik inspektori": "Ko'rik va xavfsizlik inspektori",
};
/* Sof funksiya: eski rol nomini yangisiga keltiradi, notanish nomni o'zgartirmaydi */
function rolNomiKanon(nom){ return ROL_YANGI[String(nom == null ? "" : nom).trim()] || nom; }
/* Eski rol nomi -> yangi rol kaliti (eski sessiya va yozuvlar uchun) */
const ROL_ESKI = (function(){
  const x = {};
  Object.keys(ROL_YANGI).forEach(k => { const y = ROL_KALIT[ROL_YANGI[k]]; if (y) x[k] = y; });
  return x;
})();
/* Bo'lim huquqlari: o — ko'rish, y — yozish, t — tasdiqlash. Ro'yxatda yo'q bo'lim yopiq.
   Rahbariyat forma to'ldirmaydi: "t" faqat tasdiq amali bor bo'limlarda, "y" esa faqat ishlarda
   (o'z vazifasini bajarildi deb belgilaydi va topshiriq beradi). */
const ROL_RUXSAT = {
  admin: null,
  rahbariyat:   {panel: "o", aktivlar: "ot", nazorat: "ot",  qiymat: "ot",  sotuv: "ot", hisobot: "o",  ishlar: "oyt", sozlama: "o"},
  obyekt:       {panel: "o", aktivlar: "oy", nazorat: "oyt", qiymat: "oy",  sotuv: "oy", hisobot: "o",  ishlar: "oy",  sozlama: "o"},
  nazorat:      {panel: "o", aktivlar: "o",  nazorat: "oy",  qiymat: "o",   sotuv: "o",  hisobot: "o",  ishlar: "oy",  sozlama: "o"},
  buxgalteriya: {panel: "o", aktivlar: "o",  nazorat: "o",   qiymat: "oyt", sotuv: "o",  hisobot: "oy", ishlar: "oy",  sozlama: "o"},
};
/* Yon panelda ko'rinadigan bo'limlar (faqat menyu; huquq ROL_RUXSAT da qoladi).
   Har bir rolda ko'pi bilan 6 band: qolgan sahifalar bo'lim markazida, obyekt kartochkasida,
   Ctrl+K qidiruvida va to'g'ridan-to'g'ri havolada ochiq turadi. */
const ROL_YON = {
  admin:        ["panel", "ishlar", "hisobot"],
  rahbariyat:   ["panel", "ishlar", "aktivlar", "nazorat", "sotuv", "hisobot"],
  obyekt:       ["panel", "aktivlar", "qiymat", "sotuv", "ishlar", "hisobot"],
  nazorat:      ["panel", "nazorat", "aktivlar", "ishlar", "hisobot"],
  buxgalteriya: ["panel", "qiymat", "sotuv", "aktivlar", "ishlar", "hisobot"],
};
const ROL_YON_MAX = 6;
/* Rolning bosh sahifasi: har bir rol o'z panelidan boshlaydi */
const ROL_BOSH = {
  admin: "panel.html", rahbariyat: "panel.html", obyekt: "panel-obyekt.html",
  nazorat: "panel-nazorat.html", buxgalteriya: "panel-moliya.html",
};
/* Faqat shu rollarga ochiq sahifalar (bo'lim huquqidan tashqari) */
const SAHIFA_MAXSUS = {
  "panel.html":              ["admin", "rahbariyat"],
  "panel-obyekt.html":       ["admin", "rahbariyat", "obyekt"],
  "panel-nazorat.html":      ["admin", "rahbariyat", "nazorat"],
  "panel-moliya.html":       ["admin", "rahbariyat", "buxgalteriya"],
  "foydalanuvchilar.html":   ["admin"],
  "foydalanuvchi.html":      ["admin"],
  "rollar.html":             ["admin"],
  "integratsiyalar.html":    ["admin"],
  "amallar-tarixi.html":     ["admin", "rahbariyat"],
  "filiallar.html":          ["admin", "rahbariyat"],
};
/* Forma sahifalari: o'z bo'limida yozish (yoki tasdiqlash) huquqi talab qilinadi */
const SAHIFA_AMAL = {
  "obyekt-tahrir.html": "yoz", "qabul-boshlash.html": "yoz", "qabul-hujjatlar.html": "yoz",
  "qabul-tasdiqlash.html": "yoz", "qabul-dalolatnoma.html": "yoz",
  /* chiqim-tasdiqlash: tasdiqlash huquqi bilan chiqariladi, yozish huquqi bilan qaror so'rovi yuboriladi */
  "chiqim-tasdiqlash.html": "yoz|tasdiq",
  /* kirish-soravi: yangi so'rov yozish huquqi bilan, kutilayotgan so'rovni tasdiqlash huquqi bilan ochiladi */
  "qurilma-ornatish.html": "yoz", "servis-topshirigi.html": "yoz", "kirish-soravi.html": "yoz|tasdiq",
  "korik-otkazish.html": "yoz", "korik-tayinlash.html": "yoz",
  "baholash-buyurtma.html": "yoz", "baholash-hisobot-kiritish.html": "yoz", "sugurta-yangilash.html": "yoz",
  "davo-tayyorlash.html": "yoz", "qaror-kiritish.html": "yoz",
};
/* Bo'limdan tashqari rol istisnosi. Obyekt menejeri endi aktivlar va sotuv bo'limlarida o'zi yozadi,
   shuning uchun ro'yxat bo'sh; tuzilma saqlanadi (sahifaRuxsatlimi shu jadvalni o'qiydi). */
const SAHIFA_AMAL_ROL = {};
const AMAL_HARF = {oqi: "o", yoz: "y", tasdiq: "t"};
/* Ikkinchi bo'lim talabi: hisobot bo'limidagi sahifa boshqa bo'lim ma'lumotini ochadi,
   shuning uchun o'sha bo'limni ko'rish huquqi ham kerak (server shu to'plamlarga 403 qaytaradi) */
const SAHIFA_BOLIM2 = {"hisobot-undiruv.html": "sotuv", "kirish-hisoboti.html": "nazorat"};
/* Bo'lim huquqidan tashqari yangi yozuv qo'shish (server/server.js YARATISH_ISTISNO bilan bir xil) */
const YARATISH_ISTISNO = {SUGURTA_DAVOLARI: ["nazorat"]};
/* Rahbariyat tasdiq amali uchun bo'limga yozadi, lekin shu to'plamlarni hech qachon o'zgartirmaydi
   (server/server.js ROL_KOL_TAQIQ bilan bir xil) */
const ROL_KOL_TAQIQ = {rahbariyat: ["KORIKLAR", "INVENTARIZATSIYALAR", "INVENTAR", "UNDIRUV_ISHLAR", "SUD_MAJLISLAR"]};

function joriySessiya(){ return window.MKBapi ? MKBapi.sessiya() : null; }
function joriyRolKalit(){
  const s = joriySessiya();
  if (!s) return null;
  /* Saqlangan sessiyada eski rol nomi bo'lishi mumkin: avval yangi nomga keltiriladi */
  return ROL_KALIT[rolNomiKanon(s.rol)] || ROL_ESKI[s.rol] || null;   /* noma'lum rol hech qanday huquq olmaydi */
}
function bolimKanon(k){ return BOLIM_TAXALLUS[k] || k || null; }
function huquqBor(rol, bolim, harf){
  if (!rol) return false;
  const r = ROL_RUXSAT[rol];
  if (r === null) return true;
  if (!r) return false;
  const b = bolimKanon(bolim);
  if (!b) return harf === "o";
  return (r[b] || "").indexOf(harf) >= 0;
}
function bolimRuxsatlimi(kalit, rol){ return huquqBor(rol, kalit, "o"); }
function faylNomi(href){
  const f = (href || location.pathname).split("/").pop().split("?")[0].split("#")[0];
  return f || "panel.html";
}
/* Fayl -> bo'lim kaliti: avval navigatsiya daraxti, keyin bo'limlar reyestri */
const FAYL_BOLIM = (function(){
  const x = {};
  const d = window.MKB_DARAXT || {};
  Object.keys(d).forEach(k => (d[k] || []).forEach(sh => { x[sh.f] = k; }));
  const ichki = window.MKB_ICHKI || {};
  Object.keys(ichki).forEach(k => (ichki[k] || []).forEach(f => { x[f] = k; }));
  return x;
})();
function bolimTopish(fayl){
  if (FAYL_BOLIM[fayl]) return FAYL_BOLIM[fayl];
  const bol = BOLIMLAR.find(b => faylNomi(b.href) === fayl);
  if (bol) return bol.kalit;
  if (/^(sozlama|foydalanuvchi|rollar|filiallar|amallar|integratsiya|qollanma)/.test(fayl)) return "sozlama";
  return null;
}
function joriyBolim(){
  return bolimTopish(faylNomi()) || bolimKanon(document.body && document.body.dataset.sahifa);
}
/* Sahifa shu rolga ochiqmi. rol berilmasa joriy sessiya roli olinadi (yon panel rolni o'zi uzatadi) */
function sahifaRuxsatlimi(href, rolKaliti){
  const rol = rolKaliti === undefined ? joriyRolKalit() : rolKaliti;
  if (!rol) return false;
  const fayl = faylNomi(href);
  if (SAHIFA_MAXSUS[fayl] && !SAHIFA_MAXSUS[fayl].includes(rol)) return false;
  const qoshimcha = SAHIFA_AMAL_ROL[fayl] && SAHIFA_AMAL_ROL[fayl][rol];
  if (qoshimcha && huquqBor(rol, qoshimcha, "y")) return true;
  const kalit = href ? bolimTopish(fayl) : joriyBolim();
  if (!kalit) return true;
  if (!huquqBor(rol, kalit, "o")) return false;
  if (SAHIFA_AMAL[fayl] && !SAHIFA_AMAL[fayl].split("|").some(a => huquqBor(rol, kalit, AMAL_HARF[a]))) return false;
  if (SAHIFA_BOLIM2[fayl] && !huquqBor(rol, SAHIFA_BOLIM2[fayl], "o")) return false;
  return true;
}
function rolBoshSahifasi(rol){ return ROL_BOSH[rol] || "kirish.html"; }

/* ---------- Tarjima (UZ -> RU) ---------- */
const TARJIMA_ATTR = ["placeholder", "title", "aria-label", "alt", "data-toast", "data-yorliq"];
function joriyTil(){ try{ return localStorage.getItem("mkb-til") === "ru" ? "ru" : "uz"; }catch(_){ return "uz"; } }
function lugat(){ return window.MKB_LUGAT || {}; }
/* Turli apostrof belgilarini yagona ko'rinishga keltirish */
function birXilApostrof(m){ return m.replace(/[’ʼʻ`´]/g, "'"); }

/* Qoidalar dvigateli (malumot-indeks.js, qoidaNatijalari) yig'adigan bildirishnoma matnlari.
   Obyekt nomi va qurilma turi lug'atdan alohida o'giriladi, sana va kodlar o'zgarmaydi. */
(function(){
  if (!Array.isArray(window.MKB_TARJIMA_QOIDALARI)) return;
  const tq = s => typeof window.mkbQism === "function" ? window.mkbQism(s) : s;
  const nom = s => String(s).split(", ").map(tq).join(", ");
  const POLIS = {mulk: "имущество", OSAGO: "ОСАГО", XICHO: "ОСГОР"};
  window.MKB_TARJIMA_QOIDALARI.unshift(
    [/^Bildirishnomalar: (\d+) ta o['’ʻʼ`]qilmagan$/, "Уведомления: $1 непрочитанных"],
    [/^Umidsiz toifagacha (\d+) kun qoldi$/, "До безнадёжной категории осталось $1 дн."],
    [/^Sug['’ʻʼ`]urta polisi (\d+) kunda tugaydi$/, "Страховой полис истекает через $1 дн."],
    [/^Baholash (\d+) kunda eskiradi$/, "Оценка устареет через $1 дн."],
    [/^Qurilma (\d+) soatdan beri aloqasiz$/, "Устройство без связи $1 ч"],
    [/^G['’ʻʼ`]olib to['’ʻʼ`]lovi muddati (\S+)$/, "Срок оплаты победителем $1"],
    [/^Soliq imtiyozi (\d+) kunda tugaydi$/, "Налоговая льгота истекает через $1 дн."],
    [/^Markaziy bank hisoboti: (\S+)$/, "Отчёт Центрального банка: $1"],
    [/^Narx pasaytirishni tasdiqqa yuborish$/, "Направить снижение цены на утверждение"],
    [/^Davaktivdan qaytarish so['’ʻʼ`]rovi$/, "Запрос на возврат из Давактива"],
    [/^Qishki konservatsiya chek-listi$/, "Чек-лист зимней консервации"],
    [/^Topshirish muddati (\S+)\.$/, "Срок сдачи $1."],
    [/^(.+?): (\S+?)(?:-| )dan 100% zaxira talab qilinadi\.$/, (_, a, d) => nom(a) + ": с " + d + " требуется резерв 100%."],
    [/^(.+?): (\S+) \((.+)\), (\S+) gacha\.$/, (_, a, p, t, d) => nom(a) + ": " + p + " (" + (POLIS[t] || tq(t)) + "), до " + d + "."],
    [/^(.+?): oxirgi baholash (\S+)\.$/, (_, a, d) => nom(a) + ": последняя оценка " + d + "."],
    [/^(.+?): (\S+?)(?:-| )dagi ko['’ʻʼ`]rik o['’ʻʼ`]tkazilmagan\.$/, (_, a, d) => nom(a) + ": осмотр " + d + " не проведён."],
    [/^(.+?): lot (\S+), g['’ʻʼ`]olib (.*)\.$/, (_, a, l, g) => nom(a) + ": лот " + l + ", победитель " + g + "."],
    [/^(.+?): muddat (\S+)\.$/, (_, a, d) => nom(a) + ": срок " + d + "."],
    [/^(.+?): imtiyoz (\S+) gacha\.$/, (_, a, d) => nom(a) + ": льгота до " + d + "."],
    [/^(.+?): lot (\d+) oydan beri sotilmadi\.$/, (_, a, n) => nom(a) + ": лот не продан " + n + " мес."],
    [/^(.+?): (\d+) oyda sotilmadi\.$/, (_, a, n) => nom(a) + ": не продан за " + n + " мес."],
    [/^(.+?): suv tizimini bo['’ʻʼ`]shatish, tom va eshiklarni tekshirish\.$/, (_, a) => nom(a) + ": слить воду из системы, проверить кровлю и двери."],
    [/^(.+?): (.+) \(([A-Z]{1,4}-[\w\/-]+)\)\.$/, (_, a, t, id) => nom(a) + ": " + tq(t) + " (" + id + ")."]
  );
})();

/* Yadro matnlari (ux.js, jadval, dialoglar, qoidalar dvigateli) uchun lug'at va o'zgaruvchan matn qoidalari.
   Lug'atda bo'lmagan kalitgina qo'shiladi: tarjima.js dagi yozuv ustun turadi */
(function(){
  const L = window.MKB_LUGAT;
  if (L && typeof L === "object"){
    const Y = {
      "Nima o'zgaradi": "Что изменится",
      "Ko'rinish:": "Вид:",
      "Mening ko'rinishlarim": "Мои виды",
      "Ko'rinish amallari": "Действия с видом",
      "Ko'rinishni saqlash": "Сохранить вид",
      "Nomini o'zgartirish": "Переименовать",
      "Ko'rinishni o'chirish": "Удалить вид",
      "Havolani nusxalash": "Копировать ссылку",
      "Ko'rinadigan ustunlar": "Видимые столбцы",
      "Asl holatiga qaytarish": "Вернуть по умолчанию",
      "Ko'rinish nomini o'zgartirish": "Переименование вида",
      "Havola nusxalandi": "Ссылка скопирована",
      "Nom yozing": "Введите название",
      "Tanlangan qatorlar": "Выбранные строки",
      "ta tanlandi": "выбрано",
      "Tanlovni bekor qilish": "Снять выбор",
      "Sahifadagi barcha qatorlarni tanlash": "Выбрать все строки на странице",
      "Tanlash:": "Выбор:",
      "Tanlangan qatorlarga bu amal qo'llanmaydi": "Это действие не применяется к выбранным строкам",
      "Bu amal qo'llanmaydi": "Действие не применяется",
      "Sahifa hali yuklanmoqda": "Страница ещё загружается",
      "Sahifa hali yuklanmoqda. Birozdan keyin qayta bosing": "Страница ещё загружается. Нажмите ещё раз чуть позже",
      "Sahifa to'liq yuklanmadi": "Страница загружена не полностью",
      "Jami summa": "Общая сумма",
      "Bajarilmadi": "Не выполнено",
      "Oldingi surat": "Предыдущее фото",
      "Keyingi surat": "Следующее фото",
      "Fayl saqlanmadi": "Файл не сохранён",
      "Saqlanmagan o'zgarishlar bor": "Есть несохранённые изменения",
      "Formada qolish": "Остаться в форме",
      "Chiqib ketish": "Уйти",
      "Forma": "Форма",
      "Qaytarish": "Вернуть",
      "Bekor qilindi": "Отменено",
      "Amal bajarilmadi. Qayta urinib ko'ring": "Действие не выполнено. Попробуйте ещё раз",
      "Variantni tanlang": "Выберите вариант",
      "Belgilang": "Отметьте",
      "Maydonni to'ldiring": "Заполните поле",
      "Raqam kiriting": "Введите число",
      "Butun son kiriting": "Введите целое число",
      "Elektron pochtani name@bank.uz ko'rinishida kiriting": "Введите электронную почту в виде name@bank.uz",
      "Sana bugundan keyin bo'lishi mumkin emas": "Дата не может быть позже сегодняшней",
      "Rejalashtirilgan sana o'tgan bo'lishi mumkin emas": "Плановая дата не может быть в прошлом",
      "Tugash sanasi boshlanish sanasidan oldin bo'lishi mumkin emas": "Дата окончания не может быть раньше даты начала",
      "Qoralama saqlandi": "Черновик сохранён",
      "Qoralamani tiklash": "Восстановить черновик",
      "Qoralama tiklandi": "Черновик восстановлен",
      "Qoralama o'chirildi": "Черновик удалён",
      "Saqlanmagan qoralama bor": "Есть несохранённый черновик",
      "Yaqinda ochilganlar": "Недавно открытые",
      "Aniq moslik": "Точное совпадение",
      "Klaviatura tugmalari": "Сочетания клавиш",
      "Sessiya uzaytirilmadi": "Сеанс не продлён",
      "Aloqa tiklanganda saqlash mumkin": "Сохранить можно после восстановления связи",
      "Yangilandi": "Обновлено",
      "Qadamlar": "Шаги",
      "Tekshiruv": "Проверка",
      "Tekshirish": "Проверить",
      "Faylda ma'lumot qatori yo'q": "В файле нет строк с данными",
      "Yozuvlarni qo'shish": "Добавление записей",
      "Saqlanmadi": "Не сохранено",
      "Sayohat topilmadi": "Тур не найден",
      "Namoyish faqat shartli ma'lumotda ishlaydi": "Демонстрация работает только на условных данных",
      "Bu sayohat sizning rolingiz uchun emas": "Этот тур не для вашей роли",
      "Pauza": "Пауза",
      "O'tkazib yuborish": "Пропустить",
      "Davom ettirish": "Продолжить",
      "Shu sahifa bo'yicha sayohat": "Тур по этой странице",
      "Qanday ishlaydi namoyishi": "Демонстрация: как это работает",
      "Yordam": "Справка",
      "Qo'riqlash shartnomasi qo'shish": "Добавить договор охраны",
      "Inventarizatsiya boshlash": "Начать инвентаризацию",
      "Sud majlisi eslatmasi": "Напоминание о судебном заседании",
      "Sud majlisi ertaga": "Судебное заседание завтра",
      "Sud majlisi bugun": "Судебное заседание сегодня",
      "Majlis natijasini kiriting": "Внесите результат заседания",
      "Bino ko'rigida kamida surat": "Минимум фото при осмотре здания",
      "Transport va uskuna ko'rigida kamida surat": "Минимум фото при осмотре транспорта и техники",
      "Xodim yozuvi topilmadi": "Запись сотрудника не найдена",
      "Balansdan chiqarish qaror so'rovi orqali bajariladi: so'rov yuboring, uni boshqa xodim tasdiqlaydi":
        "Списание с баланса выполняется через запрос на решение: отправьте запрос, его утвердит другой сотрудник",
      "O'z so'rovingizni o'zingiz tasdiqlay olmaysiz": "Нельзя утвердить собственный запрос",
      "Boshqa xodim bergan vazifani o'chira olmaysiz. Bajarildi deb belgilang": "Нельзя удалить задачу, поставленную другим сотрудником. Отметьте её выполненной",
      "Buxgalteriya faqat to'lov belgisini qo'yadi": "Бухгалтерия только отмечает платежи",
      "yozuv muallifi o'zgartirilmaydi": "автор записи не изменяется",
      "Majlis natijasi saqlandi": "Результат заседания сохранён",
      "Narx pasaytirish so'rovi Rahbariyatga yuborildi": "Запрос на снижение цены направлен руководству",
      "Ariza yopildi": "Заявка закрыта",
    };
    Object.keys(Y).forEach(k => { if (L[k] == null) L[k] = Y[k]; });
  }
  if (!Array.isArray(window.MKB_TARJIMA_QOIDALARI)) return;
  const tq = s => (typeof window.mkbQism === "function" ? window.mkbQism(s) : (L && L[s]) || s);
  /* Aniq qoidalar umumiy "X: Y" qoidasidan oldin turadi (u oxirgi chora sifatida qismlarni alohida o'giradi) */
  const Q = window.MKB_TARJIMA_QOIDALARI;
  let umumiy = Q.findIndex(r => r && r[0] instanceof RegExp && /^\^\(\[\^:\]/.test(r[0].source));
  if (umumiy < 0) umumiy = Q.length;
  Q.splice(umumiy, 0,
    [/^Kamida (\d[\d\s,]*) ta belgi yozing$/, "Введите не менее $1 символов"],
    [/^Kamida (-?\d[\d\s,]*)$/, "Не менее $1"],
    [/^(-?\d[\d\s,]*) dan oshmasin$/, "Не более $1"],
    [/^Sana (\S+) dan keyin bo['’ʻʼ`]lishi mumkin emas$/, "Дата не может быть позже $1"],
    [/^Sana (\S+) dan oldin bo['’ʻʼ`]lishi mumkin emas$/, "Дата не может быть раньше $1"],
    [/^Qaytarib bo['’ʻʼ`]lmadi: (.+)$/, (_, a) => "Не удалось вернуть: " + tq(a)],
    [/^Yangilab bo['’ʻʼ`]lmadi: (.+)$/, (_, a) => "Не удалось обновить: " + tq(a)],
    [/^Majburiy ustunni tanlang: (.+)$/, (_, a) => "Выберите обязательный столбец: " + a.split(", ").map(tq).join(", ")],
    [/^Ko['’ʻʼ`]rinish saqlandi: (.+)$/, "Вид сохранён: $1"],
    [/^Ko['’ʻʼ`]rinish nomi o['’ʻʼ`]zgardi: (.+)$/, "Вид переименован: $1"],
    [/^Ko['’ʻʼ`]rinish o['’ʻʼ`]chirildi: (.+)$/, "Вид удалён: $1"],
    [/^Havolani nusxalab bo['’ʻʼ`]lmadi: (.+)$/, "Не удалось скопировать ссылку: $1"],
    [/^(\d+) ta yozuv uchun bajariladi\.$/, "Будет выполнено для записей: $1."],
    [/^(.+?): (\d+) ta yozuv$/, (_, a, n) => { const k = +n % 10, y = +n % 100;
      return tq(a) + ": " + n + " " + (k === 1 && y !== 11 ? "запись" : k >= 2 && k <= 4 && (y < 12 || y > 14) ? "записи" : "записей"); }],
    /* qoidalar dvigateli: sud majlisi */
    [/^Ish (\S+): (.+), (\d{2}\.\d{2}\.\d{4})(?: (\d{2}:\d{2}))?\.$/, (_, id, sud, d, s) => "Дело " + id + ": " + tq(sud) + ", " + d + (s ? " " + s : "") + "."],
    /* undiruv sahifalari: o'zgaruvchan xabarlar */
    [/^Ish (\S+) ochildi$/, "Дело $1 открыто"],
    [/^Ish (\S+) yopildi$/, "Дело $1 закрыто"],
    [/^Majlis (\S+) (\d{1,2}:\d{2}) ga tayinlandi$/, "Заседание назначено на $1 $2"],
    [/^Natija saqlandi, keyingi majlis (\S+) ga tayinlandi$/, "Результат сохранён, следующее заседание назначено на $1"],
    [/^So['’ʻʼ`]rov (\S+) Rahbariyatga yuborildi$/, "Запрос $1 направлен руководству"],
    [/^Qaror (\S+) ish (\S+) ga kiritildi$/, "Решение $1 внесено в дело $2"],
    [/^Nazorat muddati (\S+) ga belgilandi$/, "Контрольный срок установлен на $1"],
    [/^Hodisa (\S+) hal qilindi$/, "Инцидент $1 решён"],
    [/^Hodisa (\S+) yopildi$/, "Инцидент $1 закрыт"],
    [/^Ariza (\S+) yopildi$/, "Заявка $1 закрыта"],
    [/^Bosqich o['’ʻʼ`]zgaradi: (.+?) → (.+?)\.(?: (.+))?$/, (_, a, b, c) => "Этап изменится: " + tq(a) + " → " + tq(b) + "." + (c ? " " + tq(c) : "")],
    [/^(Rol|Filial) o['’ʻʼ`]zgaradi: (.+?) → (.+?)\.$/, (_, t, a, b) => (t === "Rol" ? "Роль изменится: " : "Филиал изменится: ") + tq(a) + " → " + tq(b) + "."]
  );
})();
const ASL_MATN = new WeakMap();
/* Atributni joriy tilda qo'yish. Asl (o'zbekcha) matn data-asl-<atribut> da saqlanadi.
   uz berilsa — atribut yangi matn bilan qayta yoziladi (keyin o'zgargan title/aria-label o'zbekcha qolib ketmasin). */
function attrTarjima(el, a, uz){
  const kalitAttr = "data-asl-" + a;
  if (uz != null) el.setAttribute(kalitAttr, uz);
  else if (!el.hasAttribute(kalitAttr)) el.setAttribute(kalitAttr, el.getAttribute(a) || "");
  const asl = el.getAttribute(kalitAttr);
  if (joriyTil() !== "ru"){ el.setAttribute(a, asl); return; }
  const L = lugat();
  let tr = L[asl] != null ? L[asl] : L[birXilApostrof(asl)];
  if (tr == null){
    for (const [q2, alm] of (window.MKB_TARJIMA_QOIDALARI || [])){
      if (q2.test(asl)){ tr = asl.replace(q2, alm); break; }
    }
  }
  el.setAttribute(a, tr != null ? tr : asl);
}
function tarjimaQil(ildiz){
  const ru = joriyTil() === "ru", L = lugat();
  const yur = document.createTreeWalker(ildiz || document.body, NodeFilter.SHOW_TEXT);
  let n;
  while ((n = yur.nextNode())){
    const ota = n.parentElement;
    if (!ota || /^(SCRIPT|STYLE)$/.test(ota.tagName)) continue;
    /* raqam, kod va o'lchov birligi tarjima qilinmaydi */
    if (ota.closest && ota.closest("[data-tarjimasiz]")){
      /* raqam o'zgarmaydi, faqat pul, kun va oy birligi tarjima qilinadi */
      if (!ru && !ASL_MATN.has(n)) continue;
      if (!ASL_MATN.has(n)) ASL_MATN.set(n, n.nodeValue);
      const aslB = ASL_MATN.get(n);
      n.nodeValue = ru && typeof window.mkbBirlikTarjima === "function" ? window.mkbBirlikTarjima(aslB) : aslB;
      continue;
    }
    if (!ASL_MATN.has(n)) ASL_MATN.set(n, n.nodeValue);
    const asl = ASL_MATN.get(n);
    const k = asl.trim();
    if (!k) continue;
    if (ru){
      let t = L[k] != null ? L[k] : L[birXilApostrof(k)];
      if (t == null){
        for (const [q, alm] of (window.MKB_TARJIMA_QOIDALARI || [])){
          if (q.test(k)){ t = k.replace(q, alm); break; }
        }
      }
      /* "<b>4</b> ta hisobot": son alohida elementda, ibora uning shakliga keltiriladi */
      if (t != null && typeof window.mkbSonliIbora === "function") t = window.mkbSonliIbora(n, t);
      if (t != null) n.nodeValue = asl.replace(k, t);
    } else n.nodeValue = asl;
  }
  (ildiz || document).querySelectorAll(TARJIMA_ATTR.map(a => "[" + a + "]").join(",")).forEach(el => {
    TARJIMA_ATTR.forEach(a => { if (el.getAttribute(a)) attrTarjima(el, a); });
  });
  /* ekran o'quvchi matnni to'g'ri tilda o'qisin */
  document.documentElement.lang = ru ? "ru" : "uz";
  /* sahifa to'ldirmagan sarlavha izohi yolg'iz tire bo'lib qolmasin */
  const izoh = (ildiz || document).querySelector ? (ildiz || document).querySelector("#hs-meta") : null;
  if (izoh) izoh.hidden = izoh.textContent.trim() === "—";
  havolalarniTekshir(ildiz);
  /* sahifa sarlavhani keyin o'zgartirsa (hujjat raqami qo'shilsa), yangi matn asl sifatida olinadi */
  if (!document.body.dataset.aslTitle || document.title !== document.body.dataset.joriyTitle) document.body.dataset.aslTitle = document.title;
  const t = document.body.dataset.aslTitle;
  const [old, qism] = [t.split(" — ")[0], t.split(" — ").slice(1).join(" — ")];
  /* sarlavha ham matn tugunlari kabi o'giriladi: lug'at, keyin qoidalar ("Ko'rik dalolatnomasi KO-2026/0401") */
  const qismRu = !ru || !qism ? null : L[qism] != null ? L[qism] : L[birXilApostrof(qism)] != null ? L[birXilApostrof(qism)]
    : typeof window.mkbQism === "function" ? window.mkbQism(qism) : null;
  document.title = qismRu ? old + " — " + qismRu : t;
  document.body.dataset.joriyTitle = document.title;
}

/* Rolga yopiq sahifaga olib boruvchi havola va tugmalar: tugma yashiriladi, matn ichidagi havola oddiy matnga aylanadi */
function havolalarniTekshir(ildiz){
  if (document.body.dataset.ochiq === "1" || !joriySessiya()) return;
  const joy = ildiz && ildiz.querySelectorAll ? ildiz : document;
  joy.querySelectorAll("main a[href], .yon-panel a[href]").forEach(a => {
    const h = a.getAttribute("href");
    if (!h || /^(#|https?:|mailto:|tel:|blob:|data:)/.test(h) || !/\.html/.test(h)) return;
    if (/^(kirish\.html$|taqdimot|index|xato-)/.test(faylNomi(h))) return;
    if (sahifaRuxsatlimi(h)) return;
    if (/\b(tugma|pill|karta-havola|amal-doira)\b/.test(a.className)) a.remove();
    else { a.removeAttribute("href"); a.style.cursor = "default"; a.setAttribute("aria-disabled", "true"); }
  });
  huquqQolla(joy);
}
/* data-huquq="yoz" | "tasdiq" | "qiymat:yoz" — huquqi yo'q rolga element ko'rinmaydi */
function huquqQolla(joy){
  if (!joy || !joy.querySelectorAll) return;
  const royxat = joy.matches && joy.matches("[data-huquq]") ? [joy] : [];
  joy.querySelectorAll("[data-huquq]").forEach(el => royxat.push(el));
  royxat.forEach(el => {
    const q = el.getAttribute("data-huquq");
    const [a, b] = q.indexOf(":") > 0 ? q.split(":") : [null, q];
    if (!MKB.huquq(a, b)) el.hidden = true;
  });
}

/* ---------- Ikonka yordamchisi ----------
   Sprite belgilari "ik-" bilan boshlanadi. Ma'lumotdagi "i-bino" kabi eski nomlar ham qabul qilinadi. */
/* Eski yoki spriteda yo'q nomlar (saqlangan bildirishnomalarda uchraydi) */
const IK_TAXALLUS = {nom: "hujjat", nfc: "signal", kul: "info", asos: "info", bolg: "qurilma", tarozi: "karta-pul", aktiv: "aktivlar"};
function ikNomi(nom){
  const n = String(nom || "").replace(/^#?(ik|i)-/, "");
  return IK_TAXALLUS[n] || n;
}
function ik(nom, klass){
  return '<svg class="ic' + (klass ? " " + klass : "") + '" aria-hidden="true"><use href="#ik-' + ikNomi(nom) + '"/></svg>';
}
/* Sahifa markupidagi eski "#i-..." havolalarini yangi belgilarga o'tkazish */
function ikonkaHavolalari(joy){
  if (!joy || !joy.querySelectorAll) return;
  const royxat = joy.tagName && joy.tagName.toLowerCase() === "use" ? [joy] : joy.querySelectorAll("use");
  royxat.forEach(u => {
    const h = u.getAttribute("href") || u.getAttribute("xlink:href") || "";
    if (/^#i-/.test(h)) u.setAttribute("href", "#ik-" + ikNomi(h));
  });
}

/* ---------- Kichik yordamchilar ---------- */
function esc(m){
  return String(m == null ? "" : m).replace(/[&<>"']/g, c => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"})[c]);
}
function D_(){ return window.MKB_DATA || {}; }
function namoyishmi(){ return D_().MANBA !== "mahalliy"; }

/* ---------- Qobiq chizish ---------- */
/* Bank belgisi: kirish.html dagi bilan bir xil */
const LOGO_SVG =
  '<svg width="22" height="22" viewBox="0 0 44 44" aria-hidden="true">' +
  '<path d="M4 34 L4 8 L16 19 L16 39 Z" fill="#37A72E"/>' +
  '<path d="M16 19 L28 8 L28 34 L16 39 Z" fill="#8CC63F"/>' +
  '<path d="M30 8 L42 19 L42 39 L30 34 Z" fill="#2E9BD6"/></svg>';

function bolimNomi(kalit){
  const b = BOLIMLAR.find(x => x.kalit === bolimKanon(kalit));
  if (b) return b.yorliq;
  return kalit === "sozlama" ? "Sozlamalar" : "Tizim";
}

/* Bo'limning shu rol uchun kirish sahifasi: panel — rolning bosh sahifasi,
   qolganlari BOLIM_BOSH_ROL yoki reyestrdagi umumiy markaz */
function bolimHavolasi(kalit, rol){
  if (kalit === "panel") return rolBoshSahifasi(rol);
  const maxsus = BOLIM_BOSH_ROL[kalit] && BOLIM_BOSH_ROL[kalit][rol];
  if (maxsus) return maxsus;
  const b = BOLIMLAR.find(x => x.kalit === kalit);
  if (b) return b.href;
  const d = (window.MKB_DARAXT || {})[kalit] || [];
  return d.length ? d[0].f : null;
}
/* Bo'lim bandining shu rol uchun yorlig'i */
function bolimYorligi(kalit, rol){
  const maxsus = BOLIM_YORLIQ_ROL[kalit] && BOLIM_YORLIQ_ROL[kalit][rol];
  if (maxsus) return maxsus;
  const b = BOLIMLAR.find(x => x.kalit === kalit);
  return b ? b.yorliq : kalit === "sozlama" ? "Sozlamalar" : kalit;
}
/* Yon paneldagi bandlar ro'yxati (sof mantiq, DOMsiz — testlar shu funksiyani chaqiradi).
   ROL_YON menyuni qisqartiradi, ROL_RUXSAT esa o'zgarmaydi: menyuda yo'q sahifa ham ochiq turadi. */
function yonBandlar(rol){
  const tartib = ROL_YON[rol] || BOLIMLAR.map(b => b.kalit);
  const korilgan = new Set();
  const r = [];
  const panelSahifalari = ((window.MKB_DARAXT || {}).panel || []).map(x => x.f);
  tartib.forEach(kalit => {
    if (!bolimRuxsatlimi(kalit, rol)) return;
    const havola = bolimHavolasi(kalit, rol);
    if (!havola || !sahifaRuxsatlimi(havola, rol)) return;
    /* Rolning o'z paneli hali yo'q bo'lsa "Panel" bandi chizilmaydi: bosh sahifaga yon paneldagi
       belgi olib boradi, band esa o'sha sahifani ikkinchi marta takrorlamaydi */
    if (kalit === "panel" && panelSahifalari.indexOf(havola) < 0) return;
    /* Bir sahifaga ikki band olib bormaydi */
    if (korilgan.has(havola)) return;
    korilgan.add(havola);
    r.push({kalit, yorliq: bolimYorligi(kalit, rol), havola,
      ikonka: (BOLIMLAR.find(b => b.kalit === kalit) || {}).ikonka || "hujjat"});
  });
  return r.slice(0, ROL_YON_MAX);
}

function yonChiz(){
  const el = document.getElementById("yon");
  if (!el) return;
  const rol = joriyRolKalit();
  const bolim = joriyBolim();
  const joriyFayl = faylNomi();
  const daraxt = window.MKB_DARAXT || {};

  /* Yassi band: bir bo'lim — bir havola */
  const bandHTML = b => {
    const ochiq = b.kalit === bolim;
    return '<a class="yon-band' + (ochiq ? " faol" : "") + '" href="' + b.havola + '"' +
      (ochiq ? ' aria-current="page"' : "") + ">" + ik(b.ikonka) + "<span>" + b.yorliq + "</span></a>";
  };
  /* Pastki blok (Sozlamalar) bugungidek ochiladigan guruh bo'lib qoladi */
  const guruhHTML = (kalit, yorliq, ikonka) => {
    const sahifalar = (daraxt[kalit] || []).filter(s => sahifaRuxsatlimi(s.f));
    const ochiq = kalit === bolim;
    const havola = sahifalar.length ? sahifalar[0].f : (BOLIMLAR.find(b => b.kalit === kalit) || {}).href;
    if (sahifalar.length <= 1)
      return '<a class="yon-band' + (ochiq ? " faol" : "") + '" href="' + havola + '"' +
        (ochiq ? ' aria-current="page"' : "") + ">" + ik(ikonka) + "<span>" + yorliq + "</span></a>";
    return '<div class="yon-guruh">' +
      '<button type="button" class="yon-band' + (ochiq ? " faol" : "") + '" data-guruh="' + kalit +
      '" aria-expanded="' + ochiq + '">' + ik(ikonka) + "<span>" + yorliq + "</span>" +
      ik("past", "strelka") + "</button>" +
      '<div class="yon-ichki' + (ochiq ? " ochiq" : "") + '" data-ichki="' + kalit + '">' +
      sahifalar.map(s =>
        '<a href="' + s.f + '"' + (s.f === joriyFayl ? ' class="faol" aria-current="page"' : "") + ">" + s.n + "</a>").join("") +
      "</div></div>";
  };

  el.innerHTML =
    '<a class="yon-logo" href="' + rolBoshSahifasi(rol) + '">' +
      '<span class="belgi">' + LOGO_SVG + "</span>" +
      "<span class=\"yon-nom\"><b>Mikrokreditbank</b><span>Balans aktivlarini boshqarish tizimi</span></span></a>" +
    '<div class="yon-bandlar">' + yonBandlar(rol).map(bandHTML).join("") + "</div>" +
    '<div class="yon-past">' +
      guruhHTML("sozlama", "Sozlamalar", "sozlama") +
      '<div class="yon-juft">' +
        /* Taqdimot faqat ichki nusxada ochiladi: ommaviy saytda havola ko'rsatilmaydi */
        (MKB.ichkiNusxa() ? '<a class="yon-band ixcham" href="taqdimot.html">' + ik("grafik") + "<span>Taqdimot</span></a>" : "") +
        '<button type="button" class="yon-band ixcham" id="chiqish-tugma">' + ik("chiqish") + "<span>Chiqish</span></button>" +
      "</div>" +
    "</div>";

  el.querySelectorAll("[data-guruh]").forEach(b => b.addEventListener("click", () => {
    const ichki = el.querySelector('[data-ichki="' + b.dataset.guruh + '"]');
    const ochiq = ichki.classList.toggle("ochiq");
    b.setAttribute("aria-expanded", ochiq);
  }));
  const ch = document.getElementById("chiqish-tugma");
  if (ch) ch.addEventListener("click", () => tizimdanChiqish());
}

/* ?bugun= bilan qotirilgan sana: rejim belgisi yonida eslatma, bosilsa haqiqiy sanaga qaytadi */
function sanaBelgisi(joy){
  const D = D_();
  if (!D.BUGUN_QOTIRILGAN || !joy || joy.querySelector(".sana-belgisi")) return;
  const u = new URL(location.href);
  u.searchParams.set("bugun", "");
  const a = document.createElement("a");
  a.className = "sana-belgisi";
  a.href = u.pathname.split("/").pop() + u.search;
  a.title = "Hisob-kitoblar shu sanaga qotirilgan. Haqiqiy sanaga qaytish uchun bosing";
  a.setAttribute("aria-label", "Sana qotirilgan: " + MKB.sana.yoz(D.bugun()) + ". Haqiqiy sanaga qaytish");
  a.innerHTML = ik("kalendar") + "<b data-tarjimasiz>" + MKB.sana.yoz(D.bugun()) + "</b>";
  a.addEventListener("click", e => e.stopPropagation());
  joy.appendChild(a);
}

let yonPanelYop = null;
/* ---------- Dialog va yon panel uchun fokus boshqaruvi ----------
   Ochiq dialog ortidagi sahifa inert bo'ladi (sichqoncha va klaviatura yetmaydi),
   Tab va Shift+Tab dialog ichida aylanadi. Bir nechta dialog ustma-ust ochilsa, har biri o'z fonini yopadi. */
let dialogSanoq = 0;
const FOKUSLANUVCHI = 'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), ' +
  'textarea:not([disabled]), [tabindex]:not([tabindex="-1"]), [contenteditable="true"]';
function fonniInertQil(ochiqlar){
  const qilingan = [];
  Array.from(document.body.children).forEach(ch => {
    /* Toast qutisi hech qachon inert bo'lmaydi: dialog ochiq turganda ham xabar e'lon qilinadi va "Qaytarish" bosiladi.
       Sayohat qatlami ham chetda qoladi: amal qadami yon panel yoki oyna ochganda sayohat tugmalari ishlashda davom etadi */
    if (ch.classList && (ch.classList.contains("toast-qutisi") || ch.classList.contains("ux-elon") ||
      ch.classList.contains("sayohat-karta") || ch.classList.contains("sayohat-qatlam"))) return;
    if (/^(SCRIPT|STYLE|TEMPLATE)$/.test(ch.tagName) || ochiqlar.some(o => o === ch || ch.contains(o))) return;
    if (!ch.inert){ ch.inert = true; qilingan.push(ch); }
  });
  return () => qilingan.forEach(ch => { ch.inert = false; });
}
function fokusniTut(e, joy){
  if (e.key !== "Tab") return;
  const f = Array.from(joy.querySelectorAll(FOKUSLANUVCHI)).filter(x => !x.closest("[hidden]") && x.getClientRects().length);
  if (!f.length){ e.preventDefault(); return; }
  const bosh = f[0], oxir = f[f.length - 1], faol = document.activeElement;
  if (e.shiftKey && (faol === bosh || !joy.contains(faol))){ e.preventDefault(); oxir.focus(); }
  else if (!e.shiftKey && (faol === oxir || !joy.contains(faol))){ e.preventDefault(); bosh.focus(); }
}

/* Klaviatura bilan ishlaydigan foydalanuvchi qobiqni chetlab o'tadi: birinchi Tab — asosiy mazmun */
function otishHavolasi(){
  const main = document.querySelector("main.kontent") || document.querySelector("main");
  if (!main || document.querySelector("a.otish")) return;
  if (!main.id) main.id = "kontent";
  main.tabIndex = -1;
  const a = document.createElement("a");
  a.className = "otish";
  a.href = "#" + main.id;
  a.textContent = "Asosiy mazmunga o'tish";
  a.addEventListener("click", () => { setTimeout(() => main.focus(), 0); });
  document.body.prepend(a);
  tarjimaQil(a);
}

function shapkaChiz(){
  const el = document.getElementById("shapka");
  if (!el) return;
  const s = joriySessiya() || {ism: "Mehmon", rol: "-", filial: ""};
  const bosh = (s.ism || "M").split(" ").map(x => x[0]).join("").slice(0, 2).toUpperCase();
  const suratYol = xodimSurati(s.ism);
  /* Namoyish hisobi (malumot.js FOYDLAR namoyish:true): ism shartli, bank xodimi emas — profilda belgilanadi */
  const hisob = ((window.MKB_DATA && MKB_DATA.FOYDLAR) || []).find(f => (s.id && f.id === s.id) || (s.login && f.login === s.login));
  const namoyishHisob = !!(hisob && hisob.namoyish);
  const til = joriyTil();
  const rol = joriyRolKalit();
  const bolim = joriyBolim();
  const tezkor = BOLIMLAR.filter(b => bolimRuxsatlimi(b.kalit, rol)).slice(0, 3);

  el.innerHTML =
    '<button type="button" class="doira-tugma menyu-tugma" id="menyu-tugma" aria-label="Menyu" aria-expanded="false" aria-controls="yon">' + ik("menyu") + "</button>" +
    '<nav class="pill-nav" aria-label="Tezkor bo\'limlar">' +
      tezkor.map(b => {
        const manzil = b.kalit === "panel" ? rolBoshSahifasi(rol) : b.href;
        return '<a class="pill' + (b.kalit === bolim ? " faol" : "") + '" href="' + manzil + '" title="' + esc(b.yorliq) + '"' +
          (b.kalit === bolim ? ' aria-current="true"' : "") + ">" + b.qisqa + "</a>";
      }).join("") +
    "</nav>" +
    '<div class="shapka-ong">' +
      '<div class="izlash" id="global-izlash-qutisi">' + ik("izlash") +
        '<input type="search" id="global-izlash" autocomplete="off" placeholder="Obyekt, lot, qurilma yoki hujjat" aria-label="Qidirish">' +
        '<kbd aria-hidden="true">/</kbd>' +
        '<div class="izlash-natija" id="izlash-natija" role="listbox" hidden></div></div>' +
      '<button type="button" class="doira-tugma izlash-tugma" id="izlash-tugma" aria-label="Qidirish">' + ik("izlash") + "</button>" +
      '<div class="til-almash" role="group" aria-label="Interfeys tili">' +
        '<button type="button" data-til="uz" lang="uz" aria-pressed="' + (til === "uz") + '" class="' + (til === "uz" ? "faol" : "") + '">UZ</button>' +
        '<button type="button" data-til="ru" lang="ru" aria-pressed="' + (til === "ru") + '" class="' + (til === "ru" ? "faol" : "") + '">RU</button>' +
      "</div>" +
      '<button type="button" class="doira-tugma" id="yordam-tugma" '
        + 'aria-label="Tizimda qanday ishlash kerak" title="Tizimda qanday ishlash kerak">'
        + ik("yordam") + "</button>" +
      '<a class="doira-tugma" id="qongiroq" href="bildirishnomalar.html" aria-label="Bildirishnomalar">' +
        ik("qongiroq") + '<span class="nuqta" hidden></span></a>' +
      '<div class="profil-joy">' +
      '<button type="button" class="profil" id="profil-tugma" aria-expanded="false" aria-controls="profil-menyu"' +
        (namoyishHisob ? ' title="Namoyish hisobi"' : "") + ">" +
        '<span class="yuz">' + (suratYol
          ? '<img src="' + esc(suratYol) + '" alt="" loading="lazy" '
            + 'onerror="this.parentNode.textContent=this.dataset.bosh" data-bosh="' + esc(bosh) + '">'
          : esc(bosh)) + "</span>" +
        '<span class="kim"><b>' + esc(s.ism || "") + "</b><span>" + esc(s.rol || "") + "</span></span>" +
        ik("past") + "</button>" +
        '<div class="menyu-popover" id="profil-menyu" style="top:calc(100% + 10px);right:0">' +
          '<div class="menyu-sarlavha"><b>' + esc(s.ism || "") + "</b><span>" + esc(s.rol || "") + "</span></div>" +
          (namoyishHisob ? '<div class="menyu-belgi"><span class="chip chip-kichik chip-sariq">Namoyish hisobi</span></div>' : "") +
          '<a href="sozlamalar.html">' + ik("foyd") + "Profil sozlamalari</a>" +
          '<a href="qollanma.html">' + ik("yordam") + "Ish qo&#39;llanmasi</a>" +
          (sahifaRuxsatlimi("amallar-tarixi.html")
            ? '<a href="amallar-tarixi.html">' + ik("soat") + "Amallar tarixi</a>" : "") +
          '<div class="ajratgich"></div>' +
          '<button type="button" id="profil-chiqish">' + ik("chiqish") + "Tizimdan chiqish</button>" +
        "</div>" +
      "</div>" +
    "</div>";

  izlashUlash(el);

  /* Til */
  el.querySelectorAll(".til-almash button").forEach(b =>
    b.addEventListener("click", () => {
      try{ localStorage.setItem("mkb-til", b.dataset.til); }catch(_){ }
      el.querySelectorAll(".til-almash button").forEach(x => { x.classList.toggle("faol", x === b); x.setAttribute("aria-pressed", String(x === b)); });
      tarjimaQil();
      document.dispatchEvent(new CustomEvent("mkb:til", {detail: b.dataset.til}));
    }));
  const yt = document.getElementById("yordam-tugma");
  /* Yordam paneli (yadro/ux.js): shu sahifa, sayohat, ish tartibi, klaviatura. ux.js yuklanmagan bo'lsa — ish tartibi */
  if (yt) yt.addEventListener("click", () => { if (MKB.yordamOch) MKB.yordamOch(); else qollanmaOch(rol); });

  /* Profil menyu */
  const pt = document.getElementById("profil-tugma");
  const pm = document.getElementById("profil-menyu");
  const profilAlmash = ochiq => { pm.classList.toggle("ochiq", ochiq); pt.setAttribute("aria-expanded", String(ochiq)); };
  pt.addEventListener("click", () => profilAlmash(!pm.classList.contains("ochiq")));
  /* Escape menyu ichida ham ishlaydi va fokusni tugmaga qaytaradi */
  pt.parentNode.addEventListener("keydown", e => {
    if (e.key === "Escape" && pm.classList.contains("ochiq")){ profilAlmash(false); pt.focus(); }
  });
  pt.parentNode.addEventListener("focusout", e => {
    if (e.relatedTarget && !pt.parentNode.contains(e.relatedTarget)) profilAlmash(false);
  });
  document.addEventListener("click", e => {
    if (!e.target.closest(".profil-joy")) profilAlmash(false);
  });
  const pc = document.getElementById("profil-chiqish");
  if (pc) pc.addEventListener("click", () => tizimdanChiqish());

  /* Mobil menyu */
  const mt = document.getElementById("menyu-tugma");
  const yon = document.getElementById("yon");
  if (mt && yon){
    let parda = document.querySelector(".yon-parda");
    if (!parda){
      parda = document.createElement("div");
      parda.className = "yon-parda";
      /* yon panel bilan bir qatlamda: .qobiq alohida qatlam hosil qiladi */
      (yon.parentNode || document.body).appendChild(parda);
    }
    /* Ochiq menyu dialog kabi: orqa fon (shapka va kontent) inert, Tab panel ichida aylanadi */
    let fonniQaytar = null;
    const fonniYop = () => {
      const qaytar = [fonniInertQil([yon])];
      Array.from(yon.parentNode.children).forEach(ch => {
        if (ch === yon || ch === parda || ch.inert) return;
        ch.inert = true; qaytar.push(() => { ch.inert = false; });
      });
      return () => qaytar.forEach(f => f());
    };
    const tut = e => fokusniTut(e, yon);
    const almash = (ochiq, fokusQaytar) => {
      if (ochiq === yon.classList.contains("ochiq")) return;
      yon.classList.toggle("ochiq", ochiq);
      parda.classList.toggle("ochiq", ochiq);
      mt.setAttribute("aria-expanded", String(ochiq));
      /* ochilganda fokus panel ichiga o'tadi, yopilganda (Escape yoki parda) tugmaga qaytadi */
      if (ochiq){
        fonniQaytar = fonniYop();
        yon.addEventListener("keydown", tut);
        const b = yon.querySelector("a[href], button");
        if (b) b.focus();
      } else {
        if (fonniQaytar){ fonniQaytar(); fonniQaytar = null; }
        yon.removeEventListener("keydown", tut);
        if (fokusQaytar) mt.focus();
      }
    };
    mt.addEventListener("click", () => almash(!yon.classList.contains("ochiq")));
    parda.addEventListener("click", () => almash(false, true));
    document.addEventListener("keydown", e => { if (e.key === "Escape" && yon.classList.contains("ochiq")) almash(false, true); });
    /* ekran kengayib yon panel doimiy bo'lsa (1024px dan keng), ochiq menyu holati va inert fon bekor qilinadi */
    const keng = window.matchMedia("(min-width:1025px)");
    const kengOzgardi = () => { if (keng.matches) almash(false); };
    if (keng.addEventListener) keng.addEventListener("change", kengOzgardi); else if (keng.addListener) keng.addListener(kengOzgardi);
  }
  qongiroqYangila();
}

/* ---------- Shapka qidiruvi: obyekt, lot, qurilma, hujjat ---------- */
function izlashNatijalari(q){
  const D = D_(), s = q.toLowerCase(), n = 5;
  const mos = (...m) => m.some(v => v != null && String(v).toLowerCase().includes(s));
  const g = [];
  if (sahifaRuxsatlimi("obyekt.html")){
    const r = MKB.doira(D.YOZUVLAR || []).filter(y => mos(y.id, y.nom, y.qisqa, y.manzil, y.hudud, y.filial, y.tuman)).slice(0, n);
    if (r.length) g.push({nom: "Obyektlar", ikonka: "aktivlar", bandlar: r.map(y => ({
      havola: "obyekt.html?id=" + encodeURIComponent(y.id), sarlavha: y.qisqa || y.nom,
      izoh: y.id + " · " + (y.hudud || "") + (y.holat ? " · " + y.holat : "")}))});
  }
  if (sahifaRuxsatlimi("lotlar.html")){
    const r = MKB.doira(D.LOTLAR || []).filter(l => mos(l.id, l.eauksionLotRaqami, (D.obyektNomi ? D.obyektNomi(l.obyektId) : ""))).slice(0, n);
    if (r.length) g.push({nom: "Lotlar", ikonka: "savdo", bandlar: r.map(l => ({
      havola: (sahifaRuxsatlimi("lot.html") ? "lot.html?id=" : "lotlar.html?qidiruv=") + encodeURIComponent(l.id),
      sarlavha: l.id + (l.eauksionLotRaqami ? " · " + l.eauksionLotRaqami : ""),
      izoh: (D.obyektNomi ? D.obyektNomi(l.obyektId) : l.obyektId) + " · " + MKB.holatNomi(l.holat)}))});
  }
  if (sahifaRuxsatlimi("qurilma.html")){
    const r = MKB.doira(D.QURILMALAR || []).filter(x => mos(x.id, x.model, x.seriya, x.turNomi, x.ishlabChiqaruvchi)).slice(0, n);
    if (r.length) g.push({nom: "Qurilmalar", ikonka: "qurilma", bandlar: r.map(x => ({
      havola: "qurilma.html?id=" + encodeURIComponent(x.id), sarlavha: (x.turNomi || x.tur) + " · " + (x.model || x.id),
      izoh: x.id + " · " + (D.obyektNomi ? D.obyektNomi(x.obyektId) : x.obyektId)}))});
  }
  if (sahifaRuxsatlimi("obyekt-hujjatlar.html")){
    const r = MKB.doira(D.HUJJATLAR || []).filter(h => mos(h.nom, h.raqam, h.tur)).slice(0, n);
    if (r.length) g.push({nom: "Hujjatlar", ikonka: "hujjat", bandlar: r.map(h => ({
      havola: "obyekt-hujjatlar.html?id=" + encodeURIComponent(h.obyektId), sarlavha: h.nom + (h.raqam ? " № " + h.raqam : ""),
      izoh: (D.obyektNomi ? D.obyektNomi(h.obyektId) : h.obyektId) + (h.sana ? " · " + h.sana : "")}))});
  }
  return g;
}
function izlashUlash(el){
  const quti = document.getElementById("global-izlash-qutisi");
  const gi = document.getElementById("global-izlash");
  const oyna = document.getElementById("izlash-natija");
  const tugma = document.getElementById("izlash-tugma");
  if (!quti || !gi) return;
  /* Maydonning e'lon qilingan roli haqiqatga mos bo'lsin: buyruqlar oynasi bor bo'lsa u faqat oynani ochadi,
     ro'yxatli qidiruv (combobox) esa faqat ux.js yuklanmagan zaxira holatda ishlaydi */
  const rolniMoslash = () => {
    if (MKB.palitra){
      gi.readOnly = true;
      gi.setAttribute("aria-haspopup", "dialog");
      ["role", "aria-expanded", "aria-controls", "aria-autocomplete", "aria-activedescendant"].forEach(a => gi.removeAttribute(a));
      oyna.hidden = true;
    } else {
      gi.readOnly = false;
      gi.removeAttribute("aria-haspopup");
      gi.setAttribute("role", "combobox");
      gi.setAttribute("aria-expanded", "false");
      gi.setAttribute("aria-controls", "izlash-natija");
      gi.setAttribute("aria-autocomplete", "list");
    }
  };
  rolniMoslash();
  if (!window.MKB_UX_TAYYOR) document.addEventListener("mkb:ux", rolniMoslash, {once: true});
  let faol = -1, taymer = 0;
  const bandlar = () => Array.from(oyna.querySelectorAll("a.iz-band"));
  const yop = () => { oyna.hidden = true; gi.setAttribute("aria-expanded", "false"); gi.removeAttribute("aria-activedescendant"); faol = -1; };
  const belgila = i => {
    const b = bandlar();
    b.forEach((x, j) => x.classList.toggle("faol", j === i));
    if (b[i]){ b[i].scrollIntoView({block: "nearest"}); gi.setAttribute("aria-activedescendant", b[i].id); }
    faol = i;
  };
  const chiz = () => {
    const q = gi.value.trim();
    if (q.length < 2){ yop(); return; }
    gi.removeAttribute("aria-activedescendant");
    const g = izlashNatijalari(q);
    let k = 0;
    oyna.innerHTML = (g.length ? g.map(gr =>
      '<div class="iz-guruh natija-guruh"><span class="iz-nom natija-nom">' + gr.nom + "</span>" +
      gr.bandlar.map(b => '<a class="iz-band natija-band" role="option" id="iz-' + (k++) + '" href="' + esc(b.havola) + '">' +
        ik(gr.ikonka) + '<span class="matn"><b>' + MKB.matnQismlari(b.sarlavha) + "</b><span>" + MKB.matnQismlari(b.izoh) + "</span></span>" + ik("ong", "mitti") + "</a>").join("") +
      "</div>").join("")
      : '<div class="iz-bosh">Hech narsa topilmadi</div>') +
      (sahifaRuxsatlimi("obyektlar.html")
        ? '<a class="iz-hammasi" href="obyektlar.html?q=' + encodeURIComponent(q) + '">Reyestrda qidirish' + ik("ong", "mitti") + "</a>" : "");
    oyna.hidden = false;
    gi.setAttribute("aria-expanded", "true");
    faol = -1;
    tarjimaQil(oyna);
  };
  gi.addEventListener("input", () => { clearTimeout(taymer); taymer = setTimeout(chiz, 120); });
  gi.addEventListener("focus", () => { if (gi.value.trim().length >= 2) chiz(); });
  gi.addEventListener("keydown", e => {
    const b = bandlar();
    if (e.key === "ArrowDown"){ e.preventDefault(); if (oyna.hidden) chiz(); belgila(Math.min(faol + 1, b.length - 1)); }
    else if (e.key === "ArrowUp"){ e.preventDefault(); belgila(Math.max(faol - 1, 0)); }
    else if (e.key === "Escape"){ yop(); el.classList.remove("izlash-ochiq"); }
    else if (e.key === "Enter"){
      if (faol >= 0 && b[faol]){ e.preventDefault(); location.href = b[faol].getAttribute("href"); }
      else if (gi.value.trim() && sahifaRuxsatlimi("obyektlar.html"))
        location.href = "obyektlar.html?q=" + encodeURIComponent(gi.value.trim());
    }
  });
  document.addEventListener("click", e => {
    if (!e.target.closest("#global-izlash-qutisi") && !e.target.closest("#izlash-tugma")){ yop(); el.classList.remove("izlash-ochiq"); }
  });
  /* "/" va Ctrl+K buyruqlar oynasini ochadi (yadro/ux.js); u yuklanmagan bo'lsa shapka qidiruvi */
  document.addEventListener("keydown", e => {
    if (MKB.palitra) return;
    if (e.key === "/" && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName) && !document.activeElement.isContentEditable){
      e.preventDefault(); el.classList.add("izlash-ochiq"); gi.focus();
    }
  });
  /* Shapka qidiruvi — buyruqlar oynasining ko'rinadigan tugmasi: bosish yoki yozish oynani ochadi */
  quti.addEventListener("mousedown", e => {
    if (!MKB.palitra || e.target.closest(".izlash-natija")) return;
    e.preventDefault(); MKB.palitra.och(gi.value);
  });
  gi.addEventListener("keydown", e => {
    if (!MKB.palitra) return;
    const belgi = e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
    if (belgi || e.key === "ArrowDown" || e.key === "Enter"){
      e.preventDefault(); e.stopImmediatePropagation();
      MKB.palitra.och(gi.value + (belgi ? e.key : ""));
    }
  }, true);
  if (tugma) tugma.addEventListener("click", () => {
    if (MKB.palitra){ MKB.palitra.och(""); return; }
    const ochiq = el.classList.toggle("izlash-ochiq");
    if (ochiq) gi.focus(); else yop();
  });
}

/* Qo'ng'iroq nuqtasi: faqat shu rolga tegishli o'qilmagan bildirishnoma bo'lsa */
function oqilmaganlar(){
  const s = joriySessiya(), rol = joriyRolKalit();
  if (!s) return [];
  const hammasi = rol === "admin" || rol === "rahbariyat";
  const olinmaydi = new Set(bildirishSozlama().olinmaydi);
  return MKB.doira((D_().BILDIRISHLAR || []).filter(b => b && !bildirishOqildimi(b) && (hammasi || !b.rol || rolNomiKanon(b.rol) === rolNomiKanon(s.rol)) &&
    !(b.qoidaId && olinmaydi.has(b.qoidaId))));
}
/* Xodimning bildirishnoma sozlamasi (FOYDLAR.bildirishSozlama): {olinmaydi: [qoidaId, ...]} — shu qoidalar xabari qo'ng'iroqqa tushmaydi.
   Hodisa kabi qoidasiz xabarlar va vazifalar har doim keladi */
function ozYozuv(){
  const s = joriySessiya();
  if (!s) return null;
  return (D_().FOYDLAR || []).find(f => f && ((s.id != null && String(f.id) === String(s.id)) || (s.login && String(f.login || "").toLowerCase() === String(s.login).toLowerCase()))) || null;
}
function bildirishSozlama(){
  const f = ozYozuv();
  const b = f && f.bildirishSozlama && typeof f.bildirishSozlama === "object" ? f.bildirishSozlama : {};
  return {olinmaydi: Array.isArray(b.olinmaydi) ? b.olinmaydi.filter(x => typeof x === "string") : []};
}
async function bildirishSozlamaYoz(yangi){
  const f = ozYozuv();
  if (!f) throw new Error("Xodim yozuvi topilmadi");
  const olinmaydi = Array.from(new Set((yangi && Array.isArray(yangi.olinmaydi) ? yangi.olinmaydi : []).filter(x => typeof x === "string" && /^Q-[A-Z0-9-]+$/.test(x))));
  await MKBapi.yangilash("FOYDLAR", f.id, {bildirishSozlama: {olinmaydi}});
  f.bildirishSozlama = {olinmaydi};
  qongiroqYangila();
  return {olinmaydi};
}
/* O'qilganmi: har bir xodim uchun alohida (oqiganlar — loginlar). Eski umumiy oqildi:true hamma uchun o'qilgan. */
function bildirishOqildimi(b){
  if (!b) return true;
  if (b.oqildi === true) return true;
  const s = joriySessiya();
  return !!(s && Array.isArray(b.oqiganlar) && b.oqiganlar.indexOf(s.login) >= 0);
}
async function bildirishOqildiDeb(idOrB){
  const s = joriySessiya();
  if (!s) return false;
  const b = typeof idOrB === "object" ? idOrB : (D_().BILDIRISHLAR || []).find(x => x && x.id === idOrB);
  if (!b || bildirishOqildimi(b)) return false;
  await MKBapi.yangilash("BILDIRISHLAR", b.id, {oqiganlar: (Array.isArray(b.oqiganlar) ? b.oqiganlar : []).concat([s.login])});
  qongiroqYangila();
  return true;
}
function qongiroqYangila(){
  const q = document.getElementById("qongiroq");
  if (!q) return;
  const n = oqilmaganlar().length;
  q.querySelector(".nuqta").hidden = !n;
  attrTarjima(q, "aria-label", n ? "Bildirishnomalar: " + n + " ta o'qilmagan" : "Bildirishnomalar");
  attrTarjima(q, "title", n ? n + " ta o'qilmagan bildirishnoma" : "Yangi bildirishnoma yo'q");
}

/* ---------- Obyekt surati: haqiqiy surat yoki halol bo'sh holat ---------- */
const TUR_BELGI = {mamuriy: "bino", kopqavat: "aktivlar", uy: "uy", dokon: "dokon", sex: "zavod", ombor: "ombor",
  ferma: "ferma", issiqxona: "ferma", uskuna: "uskuna", avto: "avto", yuk: "mashina", texnika: "mashina"};
function suratYoqHTML(tur, o){
  o = o || {};
  const mahalliy = !namoyishmi();
  const matn = mahalliy ? "Surat yuklanmagan" : "Surat bank tarmog'ida saqlanadi";
  const qosh = mahalliy && !o.kichik && o.obyektId && MKB.huquq("aktivlar", "yoz") && sahifaRuxsatlimi("obyekt-suratlar.html")
    ? '<a class="tugma tugma-oq tugma-kichik" href="obyekt-suratlar.html?id=' + encodeURIComponent(o.obyektId) + '#qosh">' +
      ik("surat-qosh") + "Surat qo&#39;shish</a>" : "";
  return '<span class="surat-yoq' + (o.kichik ? " kichik" : "") + (o.sinf ? " " + esc(o.sinf) : "") + '"' +
    (o.id ? ' id="' + esc(o.id) + '"' : "") + ' role="img" aria-label="' + esc(matn) + '" title="' + esc(matn) + '">' +
    ik(TUR_BELGI[tur] || "aktivlar") + (o.kichik ? "" : "<span>" + matn + "</span>" + qosh) + "</span>";
}
/* Namoyish rejimida brauzerda saqlangan fayl: "fayllar/FL-..." manzili MKBapi.fayl.url orqali ochiladi */
function faylSuratlariniOch(joy){
  if (!joy || !joy.querySelectorAll || !window.MKBapi || !MKBapi.fayl) return;
  joy.querySelectorAll("img[data-fayl]:not([src]):not([data-fayl-kutilmoqda])").forEach(img => {
    const id = img.getAttribute("data-fayl");
    img.setAttribute("data-fayl-kutilmoqda", "1");
    MKBapi.fayl.url(id).then(u => { if (u) img.src = u; else MKB.suratYoq(img); }).catch(() => MKB.suratYoq(img));
  });
}
function suratManzili(yol){
  const y = String(yol || "");
  const m = /^fayllar\/([A-Za-z0-9_-]+)$/.exec(y);
  if (m && window.MKBapi && MKBapi.rejim && MKBapi.rejim() !== "server") return {fayl: m[1]};
  return {src: y};
}
function obyektSuratlari(m){
  m = m || {};
  const r = Array.isArray(m.rasmlar) ? m.rasmlar.filter(x => x && x.yol) : [];
  if (!r.length && m.rasm) r.push({yol: m.rasm, tur: "foto"});
  return r;
}

/* ---------- Holat nomlari ---------- */
const HOLAT_LUGAT = {
  "obyektda": "Obyektda", "muddati tugagan": "Muddati tugagan", "onlayn": "Onlayn", "oflayn": "Oflayn",
  "xizmatda": "Xizmatda", "faol": "Faol", "nofaol": "Nofaol", "kutilmoqda": "Kutilmoqda", "tasdiqlangan": "Tasdiqlangan",
  "rad etilgan": "Rad etilgan", "yangi": "Yangi", "yopildi": "Yopildi", "yopilgan": "Yopilgan", "bajarildi": "Bajarildi",
  "kechikkan": "Kechikkan", "yakunlangan": "Yakunlangan", "tolangan": "To'langan", "tolanmagan": "To'lanmagan",
  "dolzarb": "Dolzarb", "eskirgan": "Eskirgan", "topshirilgan": "Topshirilgan", "tayyorlanmoqda": "Tayyorlanmoqda",
  "korib chiqilmoqda": "Ko'rib chiqilmoqda", "qo'mitada": "Qarorda", "ishlayapti": "Ishlayapti", "nosoz": "Nosoz",
  "ogohlantirish": "Ogohlantirish", "ruxsat": "Ruxsat berildi", "rad": "Rad etildi", "toza": "Toza",
  "yuqori": "Yuqori", "o'rta": "O'rta", "orta": "O'rta", "past": "Past", "yechilgan": "Yechilgan",
  "o'rnatilgan": "O'rnatilgan", "shartnoma tuzilgan": "Shartnoma tuzilgan", "tekshirilmoqda": "Tekshirilmoqda",
  "bartaraf": "Bartaraf etilmoqda", "rejada": "Rejada", "otkazildi": "O'tkazildi", "bekor": "Bekor qilingan",
  "kiritilmagan": "Kiritilmagan", "malumotsiz": "Ma'lumot yo'q", "imtiyozda": "Soliq imtiyozi davrida",
  /* baholash, sug'urta, da'vo, inventarizatsiya */
  "buyurtma": "Buyurtma berilgan", "tasdiqda": "Tasdiqda", "30 kunda tugaydi": "30 kunda tugaydi",
  "almashtirilgan": "Almashtirilgan", "amalda": "Amalda", "yangilangan": "Yangilangan", "bekor qilingan": "Bekor qilingan",
  "jarayonda": "Jarayonda", "shubhali": "Shubhali",
  /* shartnoma va taqiq */
  "toliq tolangan": "To'liq to'langan", "taqiq qo'yilgan": "Taqiq qo'yilgan",
  /* xavfsizlik hodisalari */
  "ochiq": "Ochiq", "tekshiruvda": "Tekshiruvda", "hal": "Hal qilindi",
};
/* Eksportda niqoblanadigan ustun kalitlari */
const MAXFIY_KALIT = /^(tel|telefon|hujjat|pasport|pinfl|stirYokiPinfl|simRaqam|kartaRaqam)$/i;
/* Lug'atdagi holatlar rangi (ma'lumotnomada rangi bo'lmagan holatlar uchun) */
const HOLAT_CHIP = {
  "yangi": "chip-info", "kutilmoqda": "chip-sariq", "tasdiqlangan": "chip-yashil", "rad etilgan": "chip-xavf", "rad": "chip-xavf",
  "yopildi": "chip-kul", "yopilgan": "chip-kul", "bajarildi": "chip-yashil", "kechikkan": "chip-xavf", "yakunlangan": "chip-kul",
  "tolangan": "chip-yashil", "tolanmagan": "chip-sariq", "faol": "chip-yashil", "nofaol": "chip-kul",
  "dolzarb": "chip-yashil", "eskirgan": "chip-xavf", "30 kunda tugaydi": "chip-sariq", "almashtirilgan": "chip-kul",
  "buyurtma": "chip-info", "tasdiqda": "chip-sariq", "bekor": "chip-kul", "bekor qilingan": "chip-kul",
  "amalda": "chip-yashil", "yangilangan": "chip-kul", "muddati tugagan": "chip-xavf", "rejada": "chip-info",
  "topshirilgan": "chip-info", "korib chiqilmoqda": "chip-sariq", "jarayonda": "chip-sariq",
  "qo'mitada": "chip-binafsha", "shartnoma tuzilgan": "chip-kok",
  "tekshirilmoqda": "chip-sariq", "toza": "chip-yashil", "shubhali": "chip-xavf",
  "toliq tolangan": "chip-yashil", "taqiq qo'yilgan": "chip-sariq", "o'rnatilgan": "chip-sariq", "yechilgan": "chip-kul",
  "ochiq": "chip-xavf", "tekshiruvda": "chip-sariq", "bartaraf": "chip-sariq", "hal": "chip-yashil",
  "onlayn": "chip-yashil", "oflayn": "chip-xavf", "nosoz": "chip-xavf", "xizmatda": "chip-sariq", "obyektda": "chip-info",
  "otkazildi": "chip-yashil", "yuqori": "chip-xavf", "o'rta": "chip-sariq", "orta": "chip-sariq", "past": "chip-kul",
};
function holatTop(k){
  const D = D_();
  if (k == null || k === "") return null;
  const s = String(k);
  const qidir = r => Array.isArray(r) ? r.find(x => x && (x.kalit === s || x.nom === s)) : null;
  const r = qidir(D.HOLATLAR) || qidir(D.BOSQICHLAR) || qidir(D.LOT_HOLATLARI) || qidir(D.UNDIRUV_BOSQICHLAR) ||
    qidir(D.ZAXIRA_TOIFALARI) || qidir(D.SOTISH_USULLARI) || qidir(D.XARAJAT_TOIFALARI) || qidir(D.QORIQLASH_TURLARI);
  if (r) return r;
  if (D.MUDDAT_HOLATLARI && D.MUDDAT_HOLATLARI[s]) return D.MUDDAT_HOLATLARI[s];
  return null;
}

/* ---------- UI qismlari ---------- */
const MKB = {
  VERSIYA: MKB_VERSIYA,

  toast(matn, ikonka){
    let q = document.querySelector(".toast-qutisi");
    if (!q){ q = document.createElement("div"); q.className = "toast-qutisi"; q.setAttribute("role", "status"); q.setAttribute("aria-live", "polite"); document.body.appendChild(q); }
    const t = document.createElement("div");
    t.className = "toast" + (ikonka === "xavf" ? " xato" : "");
    t.innerHTML = ik(ikonka || "tasdiq") + "<span></span>";
    t.querySelector("span").textContent = matn;
    q.appendChild(t);
    tarjimaQil(t);
    setTimeout(() => { t.style.opacity = "0"; t.style.transition = "opacity .25s"; }, 3400);
    setTimeout(() => t.remove(), 3800);
  },

  modal(sarlavha, tanaHTML, opts){
    opts = opts || {};
    const oldingi = document.activeElement;
    const parda = document.createElement("div");
    const sid = "modal-sarlavha-" + (++dialogSanoq);
    parda.className = "modal-parda ochiq";
    parda.innerHTML =
      '<div class="modal" role="dialog" aria-modal="true" aria-labelledby="' + sid + '">' +
        '<div class="modal-bosh"><h3 id="' + sid + '"></h3>' +
        '<button type="button" class="modal-yop" aria-label="Yopish">' + ik("yopish") + "</button></div>" +
        '<div class="modal-tana">' + tanaHTML + "</div>" +
        '<div class="modal-oyoq">' +
          '<button type="button" class="tugma tugma-oq" data-amal="bekor"></button>' +
          '<button type="button" class="tugma ' + (opts.xavfli ? "tugma-xavf" : "tugma-asosiy") + '" data-amal="ok">' + (opts.okMatn || "Tasdiqlash") + "</button>" +
        "</div></div>";
    parda.querySelector("h3").textContent = sarlavha;
    parda.querySelector('[data-amal="bekor"]').textContent = opts.bekorMatn || "Bekor qilish";
    document.body.appendChild(parda);
    tarjimaQil(parda);
    const fonniQaytar = fonniInertQil([parda]);
    const modalEl = parda.querySelector(".modal");
    /* Escape faqat eng ustki dialogni yopadi: tugma bosilishi shu dialog ichida ushlanadi */
    const esc2 = e => {
      if (e.key === "Escape"){ e.stopPropagation(); bekorQil(); return; }
      fokusniTut(e, modalEl);
    };
    let yopildi = false;
    const yop = () => {
      if (yopildi) return;
      yopildi = true;
      parda.remove(); fonniQaytar();
      if (oldingi && oldingi.focus && document.contains(oldingi)) oldingi.focus();
    };
    /* 3 tadan ko'p maydonli forma-dialog: o'zgarish saqlanmagan bo'lsa bekor qilishdan oldin so'raladi */
    const maydonHolati = () => JSON.stringify(Array.from(parda.querySelectorAll(".modal-tana [name]")).map(m => m.type === "checkbox" || m.type === "radio" ? m.checked : m.value));
    let asos = null;
    setTimeout(() => { asos = maydonHolati(); }, 80);
    const bekorQil = async () => {
      if (yopildi) return;
      const soni = parda.querySelectorAll(".modal-tana [name]").length;
      if (soni > 3 && asos != null && maydonHolati() !== asos && MKB.tasdiqla){
        const r = await MKB.tasdiqla({sarlavha: "Saqlanmagan o'zgarishlar bor", ton: "xavfli",
          matn: "Formadagi o'zgarishlar saqlanmagan. Yopsangiz, ular yo'qoladi.", okMatn: "Yopish", bekorMatn: "Formada qolish"});
        if (!r) return;
      }
      yop();
    };
    parda.addEventListener("click", e => { if (e.target === parda) bekorQil(); });
    parda.querySelector(".modal-yop").addEventListener("click", bekorQil);
    parda.querySelector('[data-amal="bekor"]').addEventListener("click", bekorQil);
    const ok = parda.querySelector('[data-amal="ok"]');
    ok.addEventListener("click", async () => {
      if (!opts.ok) return yop();
      const ish = async () => { const r = await opts.ok(parda); if (r !== false) yop(); };
      if (MKB.band) return MKB.band(ok, ish).catch(e => MKB.toast(e && e.message ? e.message : "Saqlab bo'lmadi", "xavf"));
      ok.disabled = true;
      try{ await ish(); }
      finally{ ok.disabled = false; }
    });
    parda.addEventListener("keydown", esc2);
    const birinchi = parda.querySelector(".modal-tana input, .modal-tana select, .modal-tana textarea") || ok;
    setTimeout(() => birinchi.focus(), 30);
    return parda;
  },

  /* O'ngdan suriladigan panel (qo'llanma, tafsilot, tarix) */
  yonPanel(sarlavha, tanaHTML, opts){
    opts = opts || {};
    if (typeof yonPanelYop === "function") yonPanelYop(true);
    document.querySelectorAll(".yon-panel, .yon-panel-parda").forEach(x => x.remove());
    const oldingi = document.activeElement;
    const parda = document.createElement("div");
    parda.className = "yon-panel-parda";
    const panel = document.createElement("aside");
    const sid = "yp-sarlavha-" + (++dialogSanoq);
    panel.className = "yon-panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "true");
    panel.setAttribute("aria-labelledby", sid);
    panel.innerHTML =
      '<div class="yon-panel-bosh">' +
        '<div class="yp-nom"><span class="yorliq"></span><h3></h3></div>' +
        '<button type="button" class="modal-yop" aria-label="Yopish">' + ik("yopish") + "</button>" +
      "</div>" +
      '<div class="yon-panel-tana">' + tanaHTML + "</div>";
    panel.querySelector("h3").textContent = sarlavha;
    panel.querySelector("h3").id = sid;
    const yl = panel.querySelector(".yorliq");
    if (opts.yorliq) yl.textContent = opts.yorliq; else yl.remove();
    document.body.appendChild(parda);
    document.body.appendChild(panel);
    tarjimaQil(panel);
    requestAnimationFrame(() => { parda.classList.add("ochiq"); panel.classList.add("ochiq"); });
    const fonniQaytar = fonniInertQil([panel, parda]);
    const esc2 = e => {
      if (e.key === "Escape"){ e.stopPropagation(); soraYop(); return; }
      fokusniTut(e, panel);
    };
    let yopildi = false;
    /* Foydalanuvchi yopganda: panel ichidagi MKB.formaQoriqla formasi saqlanmagan bo'lsa so'raladi.
       Sahifa saqlagandan keyin chaqiradigan yop() so'ramaydi */
    let soralmoqda = false;
    const soraYop = async () => {
      if (yopildi || soralmoqda) return;
      if (window.MKB_UX_TAYYOR && typeof MKB.ketishMumkinmi === "function"){
        soralmoqda = true;
        let ok = true;
        try{ ok = await MKB.ketishMumkinmi({joy: panel}); }finally{ soralmoqda = false; }
        if (!ok) return;
      }
      if (typeof opts.yopilganda === "function") try{ opts.yopilganda(); }catch(_){ }
      yop();
    };
    /* almashtirilganda (yangi panel ochilganda) fokus qaytarilmaydi */
    const yop = almashtirish => {
      if (yopildi) return;
      yopildi = true;
      if (yonPanelYop === yop) yonPanelYop = null;
      panel.classList.remove("ochiq");
      parda.classList.remove("ochiq");
      fonniQaytar();
      if (almashtirish === true){ panel.remove(); parda.remove(); return; }
      setTimeout(() => { panel.remove(); parda.remove(); }, 280);
      if (oldingi && oldingi.focus && document.contains(oldingi)) oldingi.focus();
    };
    yonPanelYop = yop;
    parda.addEventListener("click", () => soraYop());
    panel.querySelector(".modal-yop").addEventListener("click", () => soraYop());
    panel.addEventListener("keydown", esc2);
    const birinchi = panel.querySelector("a, button");
    if (birinchi) birinchi.focus();
    return {panel, yop, soraYop};
  },

  /* Rang tokeni -> xom qiymat. "var(--holat-lotda)" yoki "--kok" ni hisoblangan rangga aylantiradi;
     SVG atributi va Leaflet fillColor var() ni yechmaydi, shuning uchun u yerlarda shu ishlatiladi */
  rangQiymat(r, zaxira){
    const m = /^\s*var\(\s*(--[\w-]+)\s*(?:,\s*([^)]+))?\)\s*$/.exec(String(r || "")) || (/^--[\w-]+$/.test(String(r || "")) ? [0, r] : null);
    if (!m) return r || zaxira || "";
    const q = getComputedStyle(document.documentElement).getPropertyValue(m[1]).trim();
    return q || (m[2] ? MKB.rangQiymat(m[2].trim(), zaxira) : (zaxira || ""));
  },

  /* Taqsimot barlari: [[nom, qiymat, rang?, izoh?], ...] */
  barlar(joy, juftlar, opts){
    const el = typeof joy === "string" ? document.getElementById(joy) : joy;
    if (!el) return;
    opts = opts || {};
    const qiymat = j => MKB.sonQiymat(Array.isArray(j) ? j[1] : j.qiymat);
    const maks = Math.max(...juftlar.map(qiymat), 1);
    el.classList.add("bar-royxat");
    if (!juftlar.length){ el.innerHTML = MKB.boshHolat("grafik", "Ma'lumot yo'q"); return; }
    el.innerHTML = juftlar.map((j, i) => {
      const nom = Array.isArray(j) ? j[0] : j.nom;
      const v = qiymat(j);
      const rang = (Array.isArray(j) ? j[2] : j.rang) || "var(--siyoh)";
      const izoh = (Array.isArray(j) ? j[3] : j.izoh) || "";
      /* nom chaqiruvchida escape qilingan bo'lishi mumkin: title uchun xom matn olinadi */
      const xomNom = (() => { const t = document.createElement("textarea"); t.innerHTML = String(nom).replace(/<[^>]+>/g, ""); return t.value; })();
      const matn = opts.format ? opts.format(v, j) : MKB.fmt(v);
      return '<' + (opts.href ? 'a class="bar-qator" href="' + opts.href + '"' : 'div class="bar-qator"') + '>' +
        '<span class="bar-nom" title="' + esc(xomNom) + '"><i style="background:' + rang + '"></i><span class="bar-nom-matn">' + nom + "</span></span>" +
        /* qiymat 0 bo'lsa bo'yalgan bar chizilmaydi: faqat bo'sh trek qoladi */
        '<span class="bar-iz">' + (v > 0 ? '<span style="width:' + Math.max(4, v / maks * 100) + "%;background:" + rang +
        ";animation-delay:" + (i * 55) + 'ms"></span>' : "") + '</span>' +
        '<span class="bar-son">' + matn + (izoh ? "<em>" + izoh + "</em>" : "") + "</span>" +
        "</" + (opts.href ? "a" : "div") + ">";
    }).join("");
    tarjimaQil(el);
  },

  /* Shtrix-ko'rsatkich: foiz -> mos-bar (jadval qatorlari uchun) */
  shtrix(foiz, soni){
    soni = soni || 14;
    if (foiz == null || isNaN(foiz)) return '<span class="shtrix bosh" title="Ma\'lumot kiritilmagan">—</span>';
    const toliq = Math.round(Math.max(0, Math.min(foiz, 100)) / 100 * soni);
    const zona = foiz >= 85 ? "z-yashil" : foiz >= 70 ? "z-sariq" : "z-xavf";
    let p = "";
    for (let i = 0; i < soni; i++) p += '<i class="' + (i < toliq ? 'f' : '') + '"></i>';
    return '<span class="shtrix ' + zona + '" role="img" aria-label="Nazorat indeksi ' + foiz + ' foiz">' +
      '<span class="panjara">' + p + "</span><b>" + foiz + "%</b></span>";
  },

  /* Qoplash halqasi: foiz -> SVG */
  halqa(foiz, olcham, qalinlik){
    olcham = olcham || 46; qalinlik = qalinlik || 4.5;
    const bosh = foiz == null || isNaN(foiz);
    const r = (olcham - qalinlik) / 2;
    const C = 2 * Math.PI * r;
    const ulush = bosh ? 0 : Math.max(0, Math.min(foiz, 100)) / 100;
    const zona = bosh ? "halqa-bosh" : foiz >= 85 ? "halqa-yashil" : foiz >= 70 ? "halqa-sariq" : "halqa-xavf";
    return '<span class="halqa ' + zona + '" role="img" aria-label="' + (bosh ? "Nazorat indeksi kiritilmagan" : "Nazorat indeksi " + foiz + " foiz") + '">' +
      '<svg width="' + olcham + '" height="' + olcham + '">' +
      '<circle class="h-iz" cx="' + olcham/2 + '" cy="' + olcham/2 + '" r="' + r + '" stroke-width="' + qalinlik + '"/>' +
      '<circle class="h-qiymat" cx="' + olcham/2 + '" cy="' + olcham/2 + '" r="' + r + '" stroke-width="' + qalinlik +
      '" stroke-dasharray="' + C + '" stroke-dashoffset="' + (C * (1 - ulush)) + '"/></svg>' +
      "<b>" + (bosh ? "—" : foiz) + "</b></span>";
  },

  /* Bosqich zanjiri */
  zanjir(bosqichlar, joriyIndeks){
    return '<div class="zanjir">' + bosqichlar.map((b, i) => {
      const holat = i < joriyIndeks ? "otildi" : i === joriyIndeks ? "joriy" : "";
      const ich = i < joriyIndeks ? ik("tasdiq") : String(i + 1);
      return '<div class="zanjir-bosqich ' + holat + '"' + (i === joriyIndeks ? ' aria-current="step"' : "") + ">" +
        '<span class="zanjir-shtamp">' + ich + "</span>" +
        '<span class="zanjir-nom">' + (b.nom || b) + "</span>" +
        (b.sana ? '<span class="zanjir-sana">' + b.sana + "</span>" : "") +
        "</div>";
    }).join("") + "</div>";
  },

  /* Jadval dvijoki.
     Ustun: {kalit, nom, chiz?(x), son?, tur?:'sana'|'son', oral?, saralash?:false, csv?:false|fn(x), majburiy?, yashirin?, maxfiy?}
     cfg: {qatorlar, ustunlar, qidiruv?[kalit], boshQidiruv?, filtrlar?, amallar?, csv?:false, csvNomi?, bosh?:{sarlavha, izoh},
           id?, sticky?:true, ustunTanlash?:true (id bilan), korinishlar?:{tayyor:[{nom, qidiruv?, filtrlar, saralash, yonalish}]},
           tanlash?:{amallar:[{nom, ikonka, ton, bajar(qatorlar,{sabab}) | birlab(x,{sabab}), mumkin?(x), ruxsat?, sabab?, okMatn?}],
                     nom?(x), summa?(x), keyin?()}}
     id — ustunlar tanlovi va saqlangan ko'rinishlar kaliti (xodim bo'yicha, shu brauzerda) */
  jadval(joy, cfg){
    const el = typeof joy === "string" ? document.getElementById(joy) : joy;
    if (!el) return null;
    const url = new URLSearchParams(location.search);
    /* ?qidiruv=... umumiy qidiruvdan kelgan so'z jadval qidiruviga tushadi */
    const urlQidiruv = cfg.qidiruv ? (url.get("qidiruv") || "") : "";
    const holat = {qidiruv: cfg.boshQidiruv != null ? String(cfg.boshQidiruv) : urlQidiruv, saralash: cfg.saralash || null,
      yonalish: cfg.yonalish || 1, sahifa: 1, filtrlar: {}, tanlangan: new Set(), korinish: "", chop: false, faolQator: null, ustunMenyu: false};
    const hajm = cfg.sahifaHajmi || 12;
    const SANA_RE = /^\d{1,2}[.\/-]\d{1,2}[.\/-]\d{4}/;
    const belgi = {};
    el._mkbJadval = belgi;

    /* ---------- Xodim sozlamalari: ko'rinadigan ustunlar va o'z ko'rinishlari ---------- */
    const sozKalit = cfg.id && window.MKBapi ? MKBapi.kalit("mkb4-jadval:" + ((joriySessiya() || {}).login || "-") + ":" + cfg.id) : null;
    function sozOqi(){ if (!sozKalit) return {}; try{ return JSON.parse(localStorage.getItem(sozKalit) || "{}") || {}; }catch(_){ return {}; } }
    function sozYoz(){ if (!sozKalit) return; try{ localStorage.setItem(sozKalit, JSON.stringify(soz)); }catch(_){ } }
    const soz = sozOqi();
    const ustunTanlashBor = !!(cfg.id && cfg.ustunTanlash !== false);
    const ustunKalit = u => String(u.kalit || String(u.nom || "").replace(/<[^>]+>/g, "").trim());
    const ustunNomi = u => String(u.nom || "").replace(/<[^>]+>/g, "").trim();
    function korinadimi(u){
      if (!ustunTanlashBor || u.majburiy) return true;
      const v = soz.ustunlar && soz.ustunlar[ustunKalit(u)];
      return v === undefined ? !u.yashirin : !!v;
    }
    const korUstunlar = () => cfg.ustunlar.filter(korinadimi);
    const tayyorlar = (cfg.korinishlar && Array.isArray(cfg.korinishlar.tayyor)) ? cfg.korinishlar.tayyor : [];
    const ozlar = () => Array.isArray(soz.korinishlar) ? soz.korinishlar : [];
    const korinishBor = !!(cfg.id && cfg.korinishlar);
    const qoshimchaFiltr = cfg.korinishlar && cfg.korinishlar.qoshimcha && typeof cfg.korinishlar.qoshimcha.qoy === "function" ? cfg.korinishlar.qoshimcha : null;
    const qoshimchaQoy = v => { if (qoshimchaFiltr) try{ qoshimchaFiltr.qoy(v === undefined ? null : v); }catch(_){ } };
    function korinishQolla(v){
      qoshimchaQoy(v.qoshimcha);
      holat.qidiruv = v.qidiruv || "";
      holat.filtrlar = Object.assign({}, v.filtrlar || {});
      holat.saralash = v.saralash || cfg.saralash || null;
      holat.yonalish = v.yonalish || cfg.yonalish || 1;
      if (v.ustunlar && ustunTanlashBor){ soz.ustunlar = Object.assign({}, v.ustunlar); sozYoz(); }
      holat.sahifa = 1;
      holat.korinish = v.nom || "";
    }
    function barchasi(){
      qoshimchaQoy(null);
      holat.qidiruv = ""; holat.filtrlar = {}; holat.saralash = cfg.saralash || null; holat.yonalish = cfg.yonalish || 1;
      holat.sahifa = 1; holat.korinish = "";
    }
    const urlKorinish = url.get("korinish") || new URLSearchParams(window.MKB_BOSH_URL || "").get("korinish");
    if (korinishBor && urlKorinish){
      const n = urlKorinish;
      const v = tayyorlar.concat(ozlar()).find(x => x.nom === n);
      if (v) korinishQolla(v);
    }

    /* ---------- Tanlash (bir nechta qatorga amal) ---------- */
    const ruxsatli = a => a && (a.ruxsat === undefined || (typeof a.ruxsat === "function" ? a.ruxsat() : !!a.ruxsat));
    const tanlashAmallari = () => (cfg.tanlash && Array.isArray(cfg.tanlash.amallar) ? cfg.tanlash.amallar : []).filter(ruxsatli);
    const tanlashBor = () => tanlashAmallari().length > 0;
    const qatorNomi = x => (cfg.tanlash && cfg.tanlash.nom ? cfg.tanlash.nom(x) : (x.qisqa || x.nom || x.sarlavha || x.id || ""));

    function qiymat(x, k){ const v = x[k]; return v == null ? "" : v; }
    function sanaKalit(v){
      const D = D_();
      const d = D.sanaOqi ? D.sanaOqi(v) : null;
      return d && !isNaN(d) ? d.getTime() : null;
    }
    function solishtir(a, b, u){
      const av = qiymat(a, u.kalit), bv = qiymat(b, u.kalit);
      if (u.tur === "sana" || (typeof av === "string" && typeof bv === "string" && SANA_RE.test(av) && SANA_RE.test(bv))){
        const x = sanaKalit(av), y = sanaKalit(bv);
        if (x == null && y == null) return 0;
        if (x == null) return 1;
        if (y == null) return -1;
        return x - y;
      }
      if (typeof av === "number" && typeof bv === "number") return av - bv;
      if (u.tur === "son") return MKB.sonQiymat(av) - MKB.sonQiymat(bv);
      if (av === "" && bv !== "") return 1;
      if (bv === "" && av !== "") return -1;
      return String(av).localeCompare(String(bv), "uz", {numeric: true});
    }
    function moslar(){
      let r = cfg.qatorlar.slice();
      if (holat.qidiruv && cfg.qidiruv){
        const q = holat.qidiruv.toLowerCase();
        r = r.filter(x => cfg.qidiruv.some(k => String(qiymat(x, k)).toLowerCase().includes(q)));
      }
      Object.entries(holat.filtrlar).forEach(([k, v]) => {
        if (v) r = r.filter(x => String(qiymat(x, k)) === v);
      });
      if (holat.saralash){
        const u = cfg.ustunlar.find(c => c.kalit === holat.saralash) || {kalit: holat.saralash};
        r = r.map((x, i) => [x, i]).sort((a, b) => (solishtir(a[0], b[0], u) * holat.yonalish) || (a[1] - b[1])).map(p => p[0]);
      }
      return r;
    }
    /* Eksportda niqoblash (Sozlamalar: eksportNiqob): ustun {maxfiy:true} yoki telefon/hujjat nomli kalit */
    const maxfiymi = u => u.maxfiy === true || (u.maxfiy !== false && MAXFIY_KALIT.test(String(u.kalit || "")));
    function csvQiymat(x, u, niqobla){
      const v = csvXom(x, u);
      return niqobla && maxfiymi(u) ? MKB.niqob(v) : v;
    }
    function csvXom(x, u){
      if (typeof u.csv === "function") return u.csv(x);
      const v = x[u.kalit];
      if (v != null && typeof v !== "object") return v;
      if (u.chiz){ const d = document.createElement("div"); d.innerHTML = u.chiz(x); return d.textContent.replace(/\s+/g, " ").trim(); }
      return "";
    }
    function csvYukla(){
      /* CSV faqat ko'rinayotgan ustunlarni oladi */
      const ust = korUstunlar().filter(u => u.csv !== false && ustunNomi(u));
      const yashirinBor = korUstunlar().length < cfg.ustunlar.length;
      const r = moslar();
      const niqobla = MKB.niqobYoqilgan() && ust.some(maxfiymi);
      const nom = (cfg.csvNomi || (document.title.split(" — ")[1] || document.title.split(" — ")[0] || "jadval"))
        .toLowerCase().replace(/[^a-z0-9а-яё]+/gi, "-").replace(/^-|-$/g, "") || "jadval";
      const D = D_();
      const b = D.bugun ? D.bugun() : new Date();
      const sana = b.getFullYear() + "-" + String(b.getMonth() + 1).padStart(2, "0") + "-" + String(b.getDate()).padStart(2, "0");
      MKB.csv(nom + "-" + sana + ".csv", ust.map(ustunNomi), r.map(x => ust.map(u => csvQiymat(x, u, niqobla))));
      MKB.toast("CSV fayl yuklab olindi: " + r.length + " ta qator" + (yashirinBor ? ", faqat ko'rinayotgan ustunlar" : "") +
        (niqobla ? ", shaxsiy raqamlar yashirilgan" : ""), "yuklab");
    }

    function asbobHTML(csvBor){
      const n = holat.tanlangan.size;
      if (n && tanlashBor()){
        return '<div class="jadval-asbob tanlov-panel" role="region" aria-label="Tanlangan qatorlar">' +
          '<b class="tanlov-soni" data-tarjimasiz>' + n + "</b><span>ta tanlandi</span>" +
          tanlashAmallari().map((a, i) => '<button type="button" class="tugma ' + (a.ton === "xavfli" ? "tugma-xavf" : "tugma-oq") +
            ' tugma-kichik" data-tanlov-amal="' + i + '">' + (a.ikonka ? ik(a.ikonka) : "") + esc(a.nom) + "</button>").join("") +
          '<div class="oraliq"></div>' +
          '<button type="button" class="tugma tugma-oq tugma-kichik" data-tanlov-bekor>' + ik("yopish") + "Tanlovni bekor qilish</button></div>";
      }
      const korinishHTML = korinishBor ?
        '<div class="tanlov korinish-tanlov" data-sayohat="korinish"><span class="t-old">Ko&#39;rinish:</span>' +
          '<select data-jadval-korinish aria-label="Ko\'rinish">' +
            '<option value="">Barchasi</option>' +
            tayyorlar.map((v, i) => '<option value="t' + i + '"' + (holat.korinish === v.nom ? " selected" : "") + ">" + esc(v.nom) + "</option>").join("") +
            (ozlar().length ? '<optgroup label="Mening ko\'rinishlarim">' + ozlar().map((v, i) =>
              '<option value="o' + i + '"' + (holat.korinish === v.nom && !tayyorlar.some(t => t.nom === v.nom) ? " selected" : "") + ">" + esc(v.nom) + "</option>").join("") + "</optgroup>" : "") +
          "</select></div>" +
          '<div class="tanlov-joy"><button type="button" class="doira-tugma kichik" data-jadval-korinish-menyu aria-label="Ko\'rinish amallari" aria-expanded="false" aria-controls="' +
            "jk-" + (dialogSanoq + 1) + '">' + ik("sozlama") + "</button>" +
            '<div class="menyu-popover" id="jk-' + (++dialogSanoq) + '" style="top:calc(100% + 6px);left:0">' +
              '<button type="button" data-korinish-saqla>' + ik("qoshish") + "Ko&#39;rinishni saqlash</button>" +
              (ozIndeks() >= 0 ? '<button type="button" data-korinish-nom>' + ik("tahrir") + "Nomini o&#39;zgartirish</button>" +
                '<button type="button" data-korinish-ochir>' + ik("ochirish") + "Ko&#39;rinishni o&#39;chirish</button>" : "") +
              (holat.korinish ? '<button type="button" data-korinish-havola>' + ik("ulashish") + "Havolani nusxalash</button>" : "") +
            "</div></div>" : "";
      const ustunHTML = ustunTanlashBor ? (() => {
        const pid = "ju-" + (++dialogSanoq);
        return '<div class="tanlov-joy" data-sayohat="ustunlar"><button type="button" class="tugma tugma-oq tugma-kichik" data-jadval-ustunlar aria-expanded="' +
          holat.ustunMenyu + '" aria-controls="' + pid + '">' + ik("jadval-ic") + "Ustunlar</button>" +
          '<div class="menyu-popover ustun-menyu' + (holat.ustunMenyu ? " ochiq" : "") + '" id="' + pid + '" role="group" aria-label="Ko\'rinadigan ustunlar" style="top:calc(100% + 6px);right:0">' +
          cfg.ustunlar.filter(u => ustunNomi(u)).map(u => '<label class="ustun-band"><input type="checkbox" data-ustun="' + esc(ustunKalit(u)) + '"' +
            (korinadimi(u) ? " checked" : "") + (u.majburiy ? " disabled" : "") + "><span>" + esc(ustunNomi(u)) + "</span></label>").join("") +
          '<div class="ajratgich"></div><button type="button" data-ustun-asl>' + ik("yangilash") + "Asl holatiga qaytarish</button></div></div>";
      })() : "";
      if (!(cfg.qidiruv || cfg.filtrlar || cfg.amallar || csvBor || korinishHTML || ustunHTML)) return "";
      return '<div class="jadval-asbob">' + korinishHTML +
        (cfg.qidiruv ? '<div class="izlash">' + ik("izlash") +
          '<input type="search" data-jadval-qidiruv aria-label="Jadvalda qidirish" placeholder="' + esc(cfg.qidiruvYozuvi || "Qidirish...") + '"></div>' : "") +
        /* Filtr: haqiqiy tugma va uning yonida (ichida emas) variantlar ro'yxati */
        (cfg.filtrlar || []).map(f => {
          const pid = "jf-" + (++dialogSanoq);
          const tanlangan = holat.filtrlar[f.kalit] || "";
          return '<div class="tanlov-joy">' +
            '<button type="button" class="tanlov" data-jadval-filtr="' + esc(f.kalit) + '" aria-expanded="false" aria-controls="' + pid + '">' +
              '<span class="t-old">' + f.nom + ':</span><span class="t-yorliq">' + esc(tanlangan || f.hamma || "Barchasi") + "</span>" + ik("past", "strelka") +
            "</button>" +
            '<div class="menyu-popover" id="' + pid + '" style="top:calc(100% + 6px);left:0">' +
              '<button type="button" data-qiymat="" aria-pressed="' + (!tanlangan) + '">' + (f.hamma || "Barchasi") + "</button>" +
              f.variantlar.map(v => '<button type="button" data-qiymat="' + esc(v) + '" aria-pressed="' + (tanlangan === String(v)) + '">' + esc(v) + "</button>").join("") +
            "</div></div>";
        }).join("") +
        '<div class="oraliq"></div>' + (cfg.amallar || "") + ustunHTML +
        (csvBor ? '<button type="button" class="tugma tugma-oq tugma-kichik" data-jadval-csv title="Joriy filtr bo\'yicha CSV fayl">' + ik("csv") + "CSV</button>" : "") +
        "</div>";
    }
    function ozIndeks(){ return ozlar().findIndex(v => v.nom === holat.korinish && !tayyorlar.some(t => t.nom === v.nom)); }

    function chiz(){
      const r = moslar();
      const jami = r.length;
      const sahifalar = holat.chop ? 1 : Math.max(1, Math.ceil(jami / hajm));
      holat.sahifa = Math.min(holat.sahifa, sahifalar);
      /* Chop etishda sahifalanmaydi: filtrlangan barcha qatorlar */
      const bolak = holat.chop ? r : r.slice((holat.sahifa - 1) * hajm, holat.sahifa * hajm);
      const csvBor = cfg.csv !== false;
      const ust = korUstunlar();
      const tanla = tanlashBor();
      const klaviatura = !!(cfg.bosilganda || tanla);
      /* ko'rinmay qolgan (filtrdan chiqqan) qatorlar tanlovdan olinadi */
      if (holat.tanlangan.size){ const bor = new Set(r.map(x => String(x.id))); holat.tanlangan.forEach(id => { if (!bor.has(id)) holat.tanlangan.delete(id); }); }
      const bosh = cfg.bosh || {};
      const boshSarlavha = cfg.qatorlar.length ? "Hech narsa topilmadi" : (bosh.sarlavha || "Hozircha yozuv yo'q");
      const boshIzoh = cfg.qatorlar.length ? "Qidiruv yoki filtr shartlarini o'zgartirib ko'ring" : (bosh.izoh || "");
      const niqobChop = holat.chop && MKB.niqobYoqilgan();
      const sahifaIdlar = bolak.map(x => String(x.id));
      const hammasiTanlangan = sahifaIdlar.length > 0 && sahifaIdlar.every(id => holat.tanlangan.has(id));
      const faol = sahifaIdlar.indexOf(String(holat.faolQator)) >= 0 ? String(holat.faolQator) : sahifaIdlar[0];

      el.innerHTML =
        '<div class="jadval-korpus' + (cfg.sticky === false ? "" : " yopishqoq") + '">' + asbobHTML(csvBor) +
        '<div class="jadval-orash"><table class="jadval"><thead><tr>' +
        (tanla ? '<th class="tanlash-ustun"><label class="tanlash-nishon"><input type="checkbox" data-tanla-hammasi data-sayohat="tanlash" aria-label="Sahifadagi barcha qatorlarni tanlash"' +
          (hammasiTanlangan ? " checked" : "") + "></label></th>" : "") +
        ust.map(u => {
          const sar = u.saralash !== false;
          const cls = [sar ? "saralanadi" : "", holat.saralash === u.kalit ? "faol" : "", u.oral ? "o-ral" : "", u.son ? "son" : ""].filter(Boolean).join(" ");
          return "<th" + (cls ? ' class="' + cls + '"' : "") + (sar ? ' data-kalit="' + u.kalit + '" tabindex="0" aria-sort="' +
            (holat.saralash === u.kalit ? (holat.yonalish > 0 ? "ascending" : "descending") : "none") + '"' : "") +
            '><span class="th-yon">' + u.nom +
            (sar ? ik(holat.saralash === u.kalit && holat.yonalish < 0 ? "yuqori" : "past") : "") +
            "</span></th>";
        }).join("") +
        "</tr></thead><tbody>" +
        (bolak.length ? bolak.map(x => {
          const id = String(x.id || "");
          const tanlangan = holat.tanlangan.has(id);
          return '<tr data-id="' + esc(id) + '"' + (klaviatura ? ' class="bosiladi' + (tanlangan ? " tanlangan" : "") + '" tabindex="' + (id === faol ? "0" : "-1") + '"' : "") +
            (tanla ? ' aria-selected="' + tanlangan + '"' : "") + ">" +
            (tanla ? '<td class="tanlash-ustun"><label class="tanlash-nishon"><input type="checkbox" data-tanla="' + esc(id) + '" tabindex="-1" aria-label="' + esc("Tanlash: " + qatorNomi(x)) + '"' +
              (tanlangan ? " checked" : "") + "></label></td>" : "") +
            ust.map(u =>
              "<td" + ((u.son || u.oral) ? ' class="' + [u.son ? "son" : "", u.oral ? "o-ral" : ""].filter(Boolean).join(" ") + '"' : "") + ">" +
              (niqobChop && maxfiymi(u) ? esc(MKB.niqob(csvXom(x, u))) : (u.chiz ? u.chiz(x) : esc(String(qiymat(x, u.kalit))))) + "</td>").join("") +
            "</tr>";
        }).join("")
        : '<tr class="bosh-qator"><td colspan="' + (ust.length + (tanla ? 1 : 0)) + '">' + MKB.boshHolat(bosh.ikonka || "hujjat", boshSarlavha, boshIzoh, cfg.qatorlar.length ? "" : (bosh.amal || "")) + "</td></tr>") +
        "</tbody></table></div>" +
        '<div class="jadval-past"><span class="jami">Jami: ' + jami + " ta yozuv</span>" +
        (sahifalar > 1 ? '<div class="sahifalash">' +
          '<button type="button" data-sahifa="old" aria-label="Oldingi sahifa"' + (holat.sahifa <= 1 ? " disabled" : "") + ">" + ik("chap") + "</button>" +
          Array.from({length: sahifalar}, (_, i) =>
            sahifalar > 7 && Math.abs(i + 1 - holat.sahifa) > 2 && i !== 0 && i !== sahifalar - 1
              ? (Math.abs(i + 1 - holat.sahifa) === 3 ? "<span>…</span>" : "")
              : '<button type="button" data-sahifa="' + (i + 1) + '"' + (i + 1 === holat.sahifa ? ' class="faol" aria-current="page"' : "") + ">" + (i + 1) + "</button>"
          ).join("") +
          '<button type="button" data-sahifa="keyin" aria-label="Keyingi sahifa"' + (holat.sahifa >= sahifalar ? " disabled" : "") + ">" + ik("ong") + "</button>" +
        "</div>" : "") + "</div></div>";

      const hammaQ = el.querySelector("[data-tanla-hammasi]");
      if (hammaQ) hammaQ.indeterminate = !hammasiTanlangan && sahifaIdlar.some(id => holat.tanlangan.has(id));

      el.querySelectorAll("th.saralanadi").forEach(th => {
        const bos = () => {
          const k = th.dataset.kalit;
          if (holat.saralash === k) holat.yonalish *= -1;
          else { holat.saralash = k; holat.yonalish = 1; }
          chiz();
          const yangiTh = el.querySelector('th[data-kalit="' + k + '"]');
          if (yangiTh) yangiTh.focus();
        };
        th.addEventListener("click", bos);
        th.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " "){ e.preventDefault(); bos(); } });
      });
      const q = el.querySelector("[data-jadval-qidiruv]");
      if (q){
        q.value = holat.qidiruv;
        q.addEventListener("input", () => {
          holat.qidiruv = q.value; holat.sahifa = 1;
          const p = q.selectionStart; chiz();
          const q2 = el.querySelector("[data-jadval-qidiruv]"); q2.focus(); q2.setSelectionRange(p, p);
        });
      }
      const cb = el.querySelector("[data-jadval-csv]");
      if (cb) cb.addEventListener("click", csvYukla);
      el.querySelectorAll("[data-jadval-filtr]").forEach(t => {
        const kalit = t.dataset.jadvalFiltr;
        const pop = t.parentNode.querySelector(".menyu-popover");
        popoverUla(t, pop);
        pop.querySelectorAll("button").forEach(b => b.addEventListener("click", () => {
          holat.filtrlar[kalit] = b.dataset.qiymat;
          holat.sahifa = 1;
          chiz();
          /* jadval qayta chizilgach fokus shu filtr tugmasiga qaytadi */
          const yangi = Array.from(el.querySelectorAll("[data-jadval-filtr]")).find(x => x.dataset.jadvalFiltr === kalit);
          if (yangi) yangi.focus();
        }));
      });
      /* Ko'rinishlar */
      const ks = el.querySelector("[data-jadval-korinish]");
      if (ks) ks.addEventListener("change", () => {
        const v = ks.value;
        if (!v) barchasi();
        else korinishQolla(v[0] === "t" ? tayyorlar[+v.slice(1)] : ozlar()[+v.slice(1)]);
        chiz();
        const y = el.querySelector("[data-jadval-korinish]"); if (y) y.focus();
      });
      const km = el.querySelector("[data-jadval-korinish-menyu]");
      if (km){
        const pop = km.parentNode.querySelector(".menyu-popover");
        popoverUla(km, pop);
        const saqlaB = pop.querySelector("[data-korinish-saqla]");
        if (saqlaB) saqlaB.addEventListener("click", () => korinishNomiSora("Ko'rinishni saqlash", "", nom => {
          const v = {nom, qidiruv: holat.qidiruv, filtrlar: Object.assign({}, holat.filtrlar), saralash: holat.saralash, yonalish: holat.yonalish,
            ustunlar: ustunTanlashBor ? Object.assign({}, soz.ustunlar || {}) : undefined,
            qoshimcha: qoshimchaFiltr && typeof qoshimchaFiltr.ol === "function" ? qoshimchaFiltr.ol() : undefined};
          soz.korinishlar = ozlar().filter(x => x.nom !== nom).concat([v]);
          sozYoz(); holat.korinish = nom; chiz();
          MKB.toast("Ko'rinish saqlandi: " + nom);
        }));
        const nomB = pop.querySelector("[data-korinish-nom]");
        if (nomB) nomB.addEventListener("click", () => {
          const i = ozIndeks(); if (i < 0) return;
          korinishNomiSora("Ko'rinish nomini o'zgartirish", ozlar()[i].nom, nom => {
            const r2 = ozlar().slice(); r2[i] = Object.assign({}, r2[i], {nom}); soz.korinishlar = r2; sozYoz();
            holat.korinish = nom; chiz(); MKB.toast("Ko'rinish nomi o'zgardi: " + nom);
          });
        });
        const ochB = pop.querySelector("[data-korinish-ochir]");
        if (ochB) ochB.addEventListener("click", () => {
          const i = ozIndeks(); if (i < 0) return;
          const eski = ozlar()[i];
          soz.korinishlar = ozlar().filter((_, j) => j !== i); sozYoz();
          barchasi(); chiz();
          const xabar = "Ko'rinish o'chirildi: " + eski.nom;
          if (MKB.qaytarish) MKB.qaytarish(xabar, {bekor: async () => { soz.korinishlar = ozlar().concat([eski]); sozYoz(); }, keyin: () => { korinishQolla(eski); chiz(); }});
          else MKB.toast(xabar);
        });
        const havB = pop.querySelector("[data-korinish-havola]");
        if (havB) havB.addEventListener("click", async () => {
          const u = new URL(location.href); u.searchParams.set("korinish", holat.korinish);
          try{ await navigator.clipboard.writeText(u.href); MKB.toast("Havola nusxalandi"); }
          catch(_){ MKB.toast("Havolani nusxalab bo'lmadi: " + u.href, "xavf"); }
          pop.classList.remove("ochiq"); km.setAttribute("aria-expanded", "false");
        });
      }
      /* Ustunlar tanlovi */
      const ub = el.querySelector("[data-jadval-ustunlar]");
      if (ub){
        const pop = ub.parentNode.querySelector(".menyu-popover");
        popoverUla(ub, pop, ochiq => { holat.ustunMenyu = ochiq; });
        if (pop.classList.contains("ochiq")) popoverSigdir(pop);
        pop.querySelectorAll("[data-ustun]").forEach(c => c.addEventListener("change", () => {
          soz.ustunlar = Object.assign({}, soz.ustunlar || {}, {[c.dataset.ustun]: c.checked});
          if (!korUstunlar().length){ soz.ustunlar[c.dataset.ustun] = true; }
          sozYoz(); holat.ustunMenyu = true; chiz();
          const y = el.querySelector('[data-ustun="' + (window.CSS && CSS.escape ? CSS.escape(c.dataset.ustun) : c.dataset.ustun) + '"]'); if (y) y.focus();
        }));
        const asl = pop.querySelector("[data-ustun-asl]");
        if (asl) asl.addEventListener("click", () => {
          delete soz.ustunlar; sozYoz(); holat.ustunMenyu = true; chiz();
          const y = el.querySelector("[data-ustun-asl]"); if (y) y.focus();
        });
      }
      /* Tanlash */
      if (hammaQ) hammaQ.addEventListener("change", () => {
        sahifaIdlar.forEach(id => { if (hammaQ.checked) holat.tanlangan.add(id); else holat.tanlangan.delete(id); });
        chiz();
        const y = el.querySelector("[data-tanla-hammasi]"); if (y) y.focus();
      });
      el.querySelectorAll("[data-tanla]").forEach(c => c.addEventListener("change", () => tanlovAlmash(c.dataset.tanla, c.checked)));
      const tb = el.querySelector("[data-tanlov-bekor]");
      if (tb) tb.addEventListener("click", () => { holat.tanlangan.clear(); chiz(); const y = el.querySelector("[data-tanla-hammasi]"); if (y) y.focus(); });
      el.querySelectorAll("[data-tanlov-amal]").forEach(b => b.addEventListener("click", () => tanlovAmali(tanlashAmallari()[+b.dataset.tanlovAmal], b)));

      el.querySelectorAll("[data-sahifa]").forEach(b => b.addEventListener("click", () => {
        const v = b.dataset.sahifa;
        holat.sahifa = v === "old" ? holat.sahifa - 1 : v === "keyin" ? holat.sahifa + 1 : +v;
        chiz();
        /* sahifa almashgach fokus sahifalagichda qoladi */
        const q2 = el.querySelector('[data-sahifa="' + v + '"]:not([disabled])') || el.querySelector(".sahifalash .faol") ||
          el.querySelector("[data-sahifa]:not([disabled])");
        if (q2) q2.focus();
      }));
      /* Qatorlar: bosish, klaviatura (↑ ↓ Home End — yurish, Enter — ochish, bo'sh joy — tanlash) */
      if (klaviatura){
        const tbody = el.querySelector("tbody");
        el.querySelectorAll("tbody tr.bosiladi").forEach(tr => {
          tr.addEventListener("click", e => {
            if (e.target.closest && e.target.closest("a, button, input, select, label")) return;
            holat.faolQator = tr.dataset.id;
            if (cfg.bosilganda){
              const x = cfg.qatorlar.find(y => String(y.id) === tr.dataset.id);
              if (x) cfg.bosilganda(x, tr);
            } else if (tanla) tanlovAlmash(tr.dataset.id, !holat.tanlangan.has(tr.dataset.id));
          });
          tr.addEventListener("focus", () => { holat.faolQator = tr.dataset.id; });
        });
        tbody.addEventListener("keydown", e => {
          const tr = e.target.closest && e.target.closest("tr.bosiladi");
          if (!tr || e.target !== tr) return;
          const qatorlar = Array.from(tbody.querySelectorAll("tr.bosiladi"));
          const i = qatorlar.indexOf(tr);
          let j = -1;
          if (e.key === "ArrowDown") j = Math.min(i + 1, qatorlar.length - 1);
          else if (e.key === "ArrowUp") j = Math.max(i - 1, 0);
          else if (e.key === "Home") j = 0;
          else if (e.key === "End") j = qatorlar.length - 1;
          if (j >= 0){
            e.preventDefault();
            qatorlar.forEach((q2, k) => { q2.tabIndex = k === j ? 0 : -1; });
            qatorlar[j].focus();
            holat.faolQator = qatorlar[j].dataset.id;
            return;
          }
          if (e.key === "Enter" && cfg.bosilganda){
            e.preventDefault();
            const x = cfg.qatorlar.find(y => String(y.id) === tr.dataset.id);
            if (x) cfg.bosilganda(x, tr);
          } else if (e.key === " " && tanla){
            e.preventDefault();
            tanlovAlmash(tr.dataset.id, !holat.tanlangan.has(tr.dataset.id));
          }
        });
      }
      tarjimaQil(el);
      const orash = el.querySelector(".jadval-orash");
      if (orash) orash.addEventListener("scroll", () => kenglikTekshir(false), {passive: true});
      kenglikTekshir();
      if (cfg.chizilganda) cfg.chizilganda(bolak, el);
    }

    /* Ochilgan menyu ekrandan chiqib ketmasin: sahifada gorizontal skroll yo'q, chiqqan qism umuman ko'rinmaydi */
    function popoverSigdir(pop){
      /* transform emas: ochilish animatsiyasi transform ni o'zi boshqaradi, translate esa uning ustiga qo'shiladi */
      pop.style.translate = "";
      const r = pop.getBoundingClientRect(), chekka = 12;
      let siljish = 0;
      if (r.right > window.innerWidth - chekka) siljish = window.innerWidth - chekka - r.right;
      if (r.left + siljish < chekka) siljish = chekka - r.left;
      if (siljish) pop.style.translate = Math.round(siljish) + "px";
    }
    /* Popover: ochish/yopish, Escape, strelkalar. holatFn(ochiq) — holatni eslab qolish uchun */
    function popoverUla(t, pop, holatFn){
      t.addEventListener("click", () => {
        document.querySelectorAll(".menyu-popover.ochiq").forEach(p => {
          if (p === pop) return;
          p.classList.remove("ochiq");
          const eg = p.id && document.querySelector('[aria-controls="' + p.id + '"]');
          if (eg) eg.setAttribute("aria-expanded", "false");
        });
        pop.classList.toggle("ochiq");
        const ochiq = pop.classList.contains("ochiq");
        t.setAttribute("aria-expanded", String(ochiq));
        if (holatFn) holatFn(ochiq);
        if (ochiq){
          popoverSigdir(pop);
          const b = pop.querySelector('[aria-pressed="true"]') || pop.querySelector("button, input:not([disabled])");
          if (b) b.focus();
        } else pop.style.translate = "";
      });
      pop.addEventListener("keydown", e => {
        if (e.key === "Escape"){ e.stopPropagation(); pop.classList.remove("ochiq"); pop.style.translate = ""; t.setAttribute("aria-expanded", "false"); if (holatFn) holatFn(false); t.focus(); }
        else if (e.key === "ArrowDown" || e.key === "ArrowUp"){
          const bb = Array.from(pop.querySelectorAll("button, input:not([disabled])")), i = bb.indexOf(document.activeElement);
          e.preventDefault();
          bb[(i + (e.key === "ArrowDown" ? 1 : -1) + bb.length) % bb.length].focus();
        }
      });
    }
    function tanlovAlmash(id, tanla){
      if (tanla) holat.tanlangan.add(String(id)); else holat.tanlangan.delete(String(id));
      holat.faolQator = String(id);
      chiz();
      const tr = Array.from(el.querySelectorAll("tbody tr")).find(x => x.dataset.id === String(id));
      if (tr) tr.focus();
    }
    /* Ko'rinish nomini so'rash: kichik dialog (MKB.tasdiqla emas) */
    function korinishNomiSora(sarlavha, asl, ok){
      const p = MKB.modal(sarlavha,
        '<label class="maydon"><span class="maydon-yorliq">Ko&#39;rinish nomi <b>*</b></span>' +
        '<span class="kirish"><input name="korinishNomi" maxlength="60" required autocomplete="off"></span></label>',
        {okMatn: "Saqlash", ok: parda => {
          const inp = parda.querySelector("input");
          const nom = inp.value.trim();
          if (!nom){ if (MKB.maydonXato) MKB.maydonXato(inp, "Nom yozing"); else inp.focus(); return false; }
          ok(nom);
        }});
      const inp = p.querySelector("input");
      inp.value = asl || "";
      inp.addEventListener("keydown", e => { if (e.key === "Enter"){ e.preventDefault(); p.querySelector('[data-amal="ok"]').click(); } });
    }
    /* Tanlangan qatorlarga amal: tasdiqlash, birma-bir bajarish, natija ro'yxati */
    async function tanlovAmali(a, tugma){
      if (!a) return;
      const hammasi = moslar().filter(x => holat.tanlangan.has(String(x.id)));
      const mos = hammasi.filter(x => !a.mumkin || a.mumkin(x));
      const otkazilgan = hammasi.filter(x => a.mumkin && !a.mumkin(x));
      if (!mos.length){ MKB.toast("Tanlangan qatorlarga bu amal qo'llanmaydi", "info"); return; }
      /* Tasdiqsiz amal (masalan tanlanganlar CSV si): darhol bajariladi, tanlov saqlanadi */
      if (a.tasdiqsiz){
        try{ await MKB.band(tugma, async () => { await (a.bajar ? a.bajar(mos, {}) : Promise.all(mos.map(x => a.birlab(x, {})))); }); }
        catch(e){ MKB.toast(e && e.message ? e.message : "Bajarilmadi", "xavf"); }
        return;
      }
      const nomlar = mos.slice(0, 5).map(qatorNomi);
      const summa = cfg.tanlash.summa ? mos.reduce((s, x) => s + (Number(cfg.tanlash.summa(x)) || 0), 0) : null;
      if (!MKB.tasdiqla){ MKB.toast("Sahifa hali yuklanmoqda", "info"); return; }
      const fn = v => (typeof v === "function" ? v(mos) : v);
      const ozMatn = fn(a.matn), ozTafsilot = fn(a.tafsilot), maydonlar = fn(a.maydonlar);
      const javob = await MKB.tasdiqla({
        sarlavha: a.nom, ton: a.ton || "oddiy",
        matn: (ozMatn ? ozMatn + " " : "") + mos.length + " ta yozuv uchun bajariladi." + (otkazilgan.length ? " " + otkazilgan.length + " tasiga bu amal qo'llanmaydi, ular o'tkazib yuboriladi." : ""),
        tafsilot: [["Yozuvlar", {matn: String(mos.length), tarjimasiz: true}]].concat(summa != null ? [["Jami summa", MKB.pul(Math.round(summa * 10) / 10)]] : [])
          .concat(Array.isArray(ozTafsilot) ? ozTafsilot : []),
        oqibat: nomlar.concat(mos.length > 5 ? ["va yana " + (mos.length - 5) + " ta"] : []),
        maydonlar: Array.isArray(maydonlar) ? maydonlar : undefined,
        sabab: a.sabab || null, okMatn: a.okMatn || a.nom, bekorMatn: a.bekorMatn,
      });
      if (!javob) return;
      const natija = [];
      const qiymatlar = javob.qiymatlar || {};
      await MKB.band(tugma, async () => {
        if (typeof a.birlab === "function"){
          for (const x of mos){
            try{ await a.birlab(x, {sabab: javob.sabab, qiymatlar}); natija.push({x, ok: true}); }
            catch(e){ natija.push({x, ok: false, xato: e && e.message ? e.message : "Bajarilmadi"}); }
          }
        } else {
          try{
            const r = await a.bajar(mos, {sabab: javob.sabab, qiymatlar});
            const xatolar = Array.isArray(r) ? r : [];
            mos.forEach(x => { const e = xatolar.find(y => y && String(y.id) === String(x.id) && y.xato); natija.push(e ? {x, ok: false, xato: e.xato} : {x, ok: true}); });
          }catch(e){ mos.forEach(x => natija.push({x, ok: false, xato: e && e.message ? e.message : "Bajarilmadi"})); }
        }
      });
      holat.tanlangan.clear();
      if (cfg.tanlash.keyin) try{ await cfg.tanlash.keyin(natija); }catch(_){ }
      chiz();
      const ok = natija.filter(n => n.ok).length, xato = natija.filter(n => !n.ok);
      if (!xato.length && !otkazilgan.length){ MKB.toast(a.nom + ": " + ok + " ta yozuv"); return; }
      MKB.modal(a.nom + ": natija",
        '<p class="tasdiqla-matn">' + ok + " ta bajarildi, " + xato.length + " ta bajarilmadi" + (otkazilgan.length ? ", " + otkazilgan.length + " ta o'tkazib yuborildi" : "") + ".</p>" +
        (xato.length ? '<ul class="natija-royxat">' + xato.map(n => '<li><b>' + esc(qatorNomi(n.x)) + "</b><span>" + esc(n.xato) + "</span></li>").join("") + "</ul>" : "") +
        (otkazilgan.length ? '<ul class="natija-royxat">' + otkazilgan.map(x => '<li><b>' + esc(qatorNomi(x)) + "</b><span>Bu amal qo&#39;llanmaydi</span></li>").join("") + "</ul>" : ""),
        {okMatn: "Yopish"});
    }

    /* Jadval kartadan kengmi: avval zich ko'rinishga o'tadi (kichik chekinish, matn qatorga o'raladi).
       Shunda ham sig'masa oxirgi ustun o'ngda qotadi va surish soyasi ko'rinadi.
       Sig'sa (.sigdi) sarlavha qatori sahifa aylantirilganda tepada qoladi */
    function kenglikTekshir(qaytaOlch){
      const o = el.querySelector(".jadval-orash");
      if (!o) return;
      if (qaytaOlch !== false){
        o.classList.remove("zich", "sigdi");
        if (o.scrollWidth > o.clientWidth + 1) o.classList.add("zich");
      }
      const t = o.querySelector(".jadval");
      const oxirgi = t && t.querySelector("tbody tr:not(.bosh-qator) td:last-child");
      const toshdi = o.scrollWidth > o.clientWidth + 1;
      const keng = toshdi && !!oxirgi && oxirgi.offsetWidth <= o.clientWidth * 0.4;
      o.classList.toggle("keng", keng);
      o.classList.toggle("oxirida", keng && o.scrollLeft + o.clientWidth >= o.scrollWidth - 1);
      if (qaytaOlch !== false) o.classList.toggle("sigdi", !toshdi);
    }
    if (window.ResizeObserver){
      let eni = 0;
      new ResizeObserver(() => { if (el.clientWidth !== eni){ eni = el.clientWidth; kenglikTekshir(); } }).observe(el);
    } else window.addEventListener("resize", () => kenglikTekshir());
    /* Chop etish: barcha filtrlangan qatorlar, ko'rinadigan ustunlar; keyin sahifalash qaytadi */
    window.addEventListener("beforeprint", () => { if (el._mkbJadval !== belgi || !el.isConnected) return; holat.chop = true; chiz(); });
    window.addEventListener("afterprint", () => { if (el._mkbJadval !== belgi || !holat.chop) return; holat.chop = false; chiz(); });

    chiz();
    return {
      yangila(qatorlar){ if (qatorlar) cfg.qatorlar = qatorlar; chiz(); },
      csv: csvYukla,
      moslar,
      holat,
      tanlangan: () => cfg.qatorlar.filter(x => holat.tanlangan.has(String(x.id))),
      /* Ko'rinadigan ustunlar (xodim tanlovi bo'yicha): [{kalit, nom, ...}] — chop etish va hisobotlar uchun */
      korUstunlar: () => korUstunlar().filter(u => ustunNomi(u)).map(u => Object.assign({}, u, {kalit: ustunKalit(u), nom: ustunNomi(u)})),
      /* Chop etishga tayyor jadval: filtrlangan barcha qatorlar, ko'rinadigan ustunlar (matn, HTML emas) */
      chopJadval(){
        const ust = korUstunlar().filter(u => ustunNomi(u) && u.csv !== false);
        const niqob = MKB.niqobYoqilgan() && ust.some(maxfiymi);
        const t = document.createElement("table");
        t.className = "jadval chop-jadval";
        t.innerHTML = "<thead><tr>" + ust.map(u => "<th>" + esc(ustunNomi(u)) + "</th>").join("") + "</tr></thead><tbody>" +
          moslar().map(x => "<tr>" + ust.map(u => "<td>" + esc(csvQiymat(x, u, niqob)) + "</td>").join("") + "</tr>").join("") + "</tbody>";
        return t;
      },
      korinish: nom => { const v = tayyorlar.concat(ozlar()).find(x => x.nom === nom); if (v){ korinishQolla(v); chiz(); } else { barchasi(); chiz(); } },
    };
  },

  /* Forma yig'ish + tekshirish */
  /* Eski chaqiruvlar uchun: majburiy maydonlar tekshiriladi, xato maydon ostida yoziladi (MKB.formaTekshir bilan bir xil ko'rinish) */
  forma(el, majburiy){
    const q = {};
    let birinchiXato = null;
    el.querySelectorAll("[name]").forEach(m => {
      const kirish = m.closest(".kirish") || m;
      if (MKB.maydonXato) MKB.maydonXato(m, null);
      kirish.classList.remove("xato");
      m.removeAttribute("aria-invalid");
      q[m.name] = m.type === "checkbox" ? m.checked : m.value.trim();
      if ((majburiy || []).includes(m.name) && !q[m.name]){
        if (MKB.maydonXato) MKB.maydonXato(m, m.getAttribute("data-xato") || (m.tagName === "SELECT" ? "Variantni tanlang" : "Maydonni to'ldiring"));
        kirish.classList.add("xato");
        m.setAttribute("aria-invalid", "true");
        if (!birinchiXato) birinchiXato = m;
      }
    });
    if (birinchiXato){ birinchiXato.focus(); return null; }
    return q;
  },

  /* CSV eksport (Excel uchun BOM va ";" ajratgich bilan) */
  csv(faylNomi, sarlavhalar, qatorlar){
    const e = v => '"' + String(v == null ? "" : v).replace(/"/g, '""') + '"';
    const matn = "﻿" + [sarlavhalar.map(e).join(";")].concat(qatorlar.map(r => r.map(e).join(";"))).join("\r\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([matn], {type: "text/csv;charset=utf-8"}));
    a.download = faylNomi;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  },

  /* Telefon, pasport, PINFL: oxirgi 2 raqam qoladi (telefonda +998 va operator kodi ham) */
  niqob(v){
    const m = String(v == null ? "" : v);
    const raqam = m.replace(/\D/g, "");
    if (raqam.length < 5) return m;
    const tel = /^998\d{9}$/.test(raqam);
    let i = 0;
    return m.replace(/\d/g, d => { i++; return (tel && i <= 5) || i > raqam.length - 2 ? d : "*"; });
  },
  niqobYoqilgan(){ const D = D_(); return !!(D.param && D.param("eksportNiqob")); },

  /* Pul: mln so'mda keladi. "412 mln so'm", "3,84 mlrd so'm"; oraliq: pul([12, 18]) -> "12–18 mln so'm" */
  pul(mln){
    const D = D_();
    if (Array.isArray(mln)){
      const [a, b] = mln.map(Number);
      if (!isFinite(a) || !isFinite(b)) return "—";
      if (a === b) return MKB.pul(a);
      const mlrd = Math.max(a, b) >= 1000;
      const f = v => mlrd ? (v / 1000).toFixed(2).replace(".", ",").replace(/,?0+$/, "") : (Math.round(v * 10) / 10).toString().replace(".", ",");
      return f(a) + "–" + f(b) + (mlrd ? " mlrd so'm" : " mln so'm");
    }
    if (D.pul) return D.pul(mln);
    if (mln == null || isNaN(mln)) return "—";
    return mln >= 1000 ? (mln / 1000).toFixed(2).replace(".", ",") + " mlrd so'm" : String(mln).replace(".", ",") + " mln so'm";
  },
  rol(){ return joriyRolKalit(); },
  /* Rolning to'liq nomi (eski nom yangisiga keltirilgan holda) */
  rolNomi(nom){ return rolNomiKanon(nom === undefined ? (joriySessiya() || {}).rol : nom); },
  /* Yon paneldagi bandlar (rol bo'yicha; sinov va sahifalar uchun) */
  yonBandlar(rol){ return yonBandlar(rol === undefined ? joriyRolKalit() : rol); },
  /* Matnni joriy tilda qaytaradi. Maydonning oldindan to'ldirilgan qiymati (input value) va
     shunga o'xshash joylar uchun: tarjimaQil faqat matn tugunlari va atributlar bilan ishlaydi. */
  matn(uz){
    const m = uz == null ? "" : String(uz);
    if (joriyTil() !== "ru" || !m.trim()) return m;
    if (typeof window.mkbQism === "function") return window.mkbQism(m);
    const L = lugat();
    const t = m.trim();
    return L[t] != null ? L[t] : L[birXilApostrof(t)] != null ? L[birXilApostrof(t)] : m;
  },
  ruxsat(href){ return sahifaRuxsatlimi(href); },
  fmt(son){ return new Intl.NumberFormat("ru-RU").format(son); },
  /* "3 840,4" -> 3840.4 */
  sonQiymat(x){
    const n = parseFloat(String(x == null ? "" : x).replace(/\s/g, "").replace(",", "."));
    return isNaN(n) ? 0 : n;
  },
  esc,
  ik,
  /* Yig'ma qator ("AK-2026/4471 · Toshkent sh. · Sotuvga tayyorlanmoqda", "Baholash hisoboti № BH-5323")
     lug'atga yaxlit holda tushsa hech qanday kalitga to'g'ri kelmaydi va rus tilida o'zbekcha qolib ketadi.
     Shuning uchun qator bo'laklarga ajratiladi: raqamli bo'lak (kod, raqam, sana) o'z holicha qoladi,
     qolgani (hudud, holat, hujjat nomi) lug'atdan o'giriladi. */
  matnQismlari(matn){
    const t = String(matn == null ? "" : matn);
    if (!t) return "";
    return t.split(/( · | № )/).map(q =>
      /^( · | № )$/.test(q) || /\d/.test(q)
        ? '<span data-tarjimasiz>' + esc(q) + "</span>"
        : "<span>" + esc(q) + "</span>").join("");
  },

  /* ---------- Huquqlar ----------
     MKB.huquq("qiymat", "yoz") · MKB.huquq("tasdiq") (joriy bo'lim) · amal: oqi | yoz | tasdiq */
  huquq(bolim, amal){
    if (amal == null && AMAL_HARF[bolim]){ amal = bolim; bolim = null; }
    return huquqBor(joriyRolKalit(), bolim || joriyBolim(), AMAL_HARF[amal || "oqi"] || "o");
  },
  /* Boshqa rol (to'liq nomi bilan) huquqi: MKB.rolHuquqi("Rahbariyat", "qiymat", "tasdiq") — o'rinbosarlik tekshiruvi uchun */
  rolHuquqi(rolNomi, bolim, amal){
    return huquqBor(ROL_KALIT[rolNomiKanon(rolNomi)] || ROL_ESKI[rolNomi] || null, bolim, AMAL_HARF[amal || "oqi"] || "o");
  },
  /* Bildirishnoma: MKB.bildirish.oqildimi(b) — joriy xodim uchun; await MKB.bildirish.oqildi(id|b) — o'qilgan deb belgilash */
  bildirish: {oqildimi: b => bildirishOqildimi(b), oqildi: x => bildirishOqildiDeb(x), oqilmaganlar: () => oqilmaganlar(),
    /* {olinmaydi: [qoidaId]} · await MKB.bildirish.sozlamaYoz({olinmaydi}) — o'z yozuviga saqlanadi (server OZ_MAYDONLAR) */
    sozlama: () => bildirishSozlama(), sozlamaYoz: x => bildirishSozlamaYoz(x)},
  /* To'lov jadvaliga belgi (IJARA.tolovlar, SHARTNOMALAR.jadval): realizatsiyada yozish huquqi yoki Buxgalteriya va risk
     (server TOLOV_ISTISNO bilan bir xil: buxgalteriya faqat to'lov maydonlari va holatni o'zgartiradi) */
  tolovBelgilaydimi(){ return MKB.huquq("sotuv", "yoz") || joriyRolKalit() === "buxgalteriya"; },
  /* To'plamga yangi yozuv qo'sha oladimi: bo'limda yozish huquqi yoki server bilan bir xil istisno.
     MKB.yaratadimi("SUGURTA_DAVOLARI", "qiymat") — ko'rik va xavfsizlik inspektori hodisadan da'vo ochadi */
  yaratadimi(kol, bolim){
    if (MKB.kolYopiqmi(kol)) return false;
    return MKB.huquq(bolim, "yoz") || (YARATISH_ISTISNO[kol] || []).indexOf(joriyRolKalit()) >= 0;
  },
  /* To'plam shu rolga butunlay yopiqmi (server ROL_KOL_TAQIQ bilan bir xil): bo'limlar birlashgani
     rahbariyatga ko'rik va undiruv yozuvlarini ochib yubormasligi kerak */
  kolYopiqmi(kol){ return (ROL_KOL_TAQIQ[joriyRolKalit()] || []).indexOf(kol) >= 0; },
  /* Filiali ko'rsatilgan hisob (masalan filial boshqaruvchisi) faqat o'z filiali yozuvlarini ko'radi.
     Filial endi rol emas, hisob belgisi: shuning uchun tekshiruv filialKod bo'yicha ketadi. */
  filialXodimi(){ return !!MKB.filialDoirasi(); },
  /* Doira uchun filial kodi: faqat hisobga biriktirilgan kod (bo'lim nomi bo'yicha taxmin qilinmaydi) */
  filialDoirasi(){
    const s = joriySessiya();
    if (!s) return null;
    if (s.filialKod) return s.filialKod;
    const D = D_();
    const f = (D.FOYDLAR || []).find(x => x && (s.login ? x.login === s.login : x.nom === s.ism));
    return (f && f.filialKod) || null;
  },
  /* Ko'rsatish uchun filial kodi: hisobda bo'lmasa, sessiyadagi bo'lim nomi bo'yicha topiladi */
  filialKod(){
    const s = joriySessiya();
    if (!s) return null;
    if (s.filialKod) return s.filialKod;
    const D = D_();
    const f = (D.FOYDLAR || []).find(x => x.nom === s.ism && x.rol === s.rol);
    if (f && f.filialKod) return f.filialKod;
    const fl = (D.FILIALLAR || []).find(x => x.nom === s.filial);
    return fl ? fl.id || fl.kod : null;
  },
  doira(royxat){
    if (!Array.isArray(royxat)) return royxat;
    const fk = MKB.filialDoirasi();
    if (!fk) return royxat;
    const D = D_();
    const obFilial = id => {
      const o = (D.OBYEKT_INDEKS && D.OBYEKT_INDEKS[id]) || (D.topish ? D.topish(id) : null);
      return o ? o.filialKod : undefined;
    };
    /* Yozuvning filiali: o'zida, obyekti orqali yoki manba yozuvi orqali (qaror so'rovi undiruv ishidan ochiladi) */
    const yozuvFilial = (x, chuqur) => {
      if (x.filialKod !== undefined && x.filialKod !== null) return x.filialKod;
      if (x.obyektId) return obFilial(x.obyektId);
      if (x.aktivId) return obFilial(x.aktivId);
      if (chuqur && x.manbaKol && x.manbaId){
        const m = (D[x.manbaKol] || []).find(r => r && r.id === x.manbaId);
        if (m) return yozuvFilial(m, false);
      }
      return undefined;
    };
    return royxat.filter(x => {
      if (!x || typeof x !== "object") return true;
      const k = yozuvFilial(x, true);
      return k === undefined || k === fk;
    });
  },

  /* ---------- Sana ---------- */
  bugun(){ const D = D_(); return D.bugun ? D.bugun() : new Date(); },

  /* ---------- Holat nomi va chipi ---------- */
  holatNomi(k){
    if (k == null || k === "") return "—";
    const r = holatTop(k);
    if (r && r.nom) return r.nom;
    const s = String(k).trim();
    if (HOLAT_LUGAT[s.toLowerCase()]) return HOLAT_LUGAT[s.toLowerCase()];
    const t = s.replace(/[-_]+/g, " ");
    return t.charAt(0).toUpperCase() + t.slice(1);
  },
  /* Jiddiylik (yuqori | o'rta | past): chip, .qator .belgi va bar/nuqta rangi uchun yagona xarita.
     Past jiddiylik neytral: mint faqat muvaffaqiyat va "Balansda" ma'nosida ishlatiladi. */
  jiddiylik(j){
    const k = String(j || "").replace(/&#39;|’/g, "'").trim().toLowerCase();
    if (k === "yuqori") return {kalit: "yuqori", nom: "Yuqori", chip: "chip-xavf", belgi: "pushti", rang: "var(--jid-yuqori)"};
    if (k === "past") return {kalit: "past", nom: "Past", chip: "chip-kul", belgi: "", rang: "var(--jid-past)"};
    return {kalit: "o'rta", nom: "O'rta", chip: "chip-sariq", belgi: "sariq", rang: "var(--jid-orta)"};
  },
  holatChip(k, kichik){
    const r = holatTop(k) || {};
    /* chip sinfi ma'lumotnomadagi holatning "chip" maydonidan: rang hex qiymatidan taxmin qilinmaydi */
    const chip = r.chip || (k != null ? HOLAT_CHIP[String(k).trim().toLowerCase()] : "") || "";
    return '<span class="chip' + (chip ? " " + chip : "") + (kichik ? " chip-kichik" : "") + '">' + esc(MKB.holatNomi(k)) + "</span>";
  },

  /* ---------- Holat qoliplari: bo'sh, yuklanish, xato ---------- */
  boshHolat(ikonka, sarlavha, izoh, amalHTML){
    return '<div class="bosh-holat">' + ik(ikonka || "hujjat") + "<b>" + esc(sarlavha || "Ma'lumot yo'q") + "</b>" +
      (izoh ? "<span>" + esc(izoh) + "</span>" : "") + (amalHTML || "") + "</div>";
  },
  skelet(qator, tur){
    qator = qator || 4;
    if (tur === "jadval") return '<div class="skelet-jadval" aria-busy="true" aria-label="Yuklanmoqda">' +
      '<div class="skelet-qator"><span class="skelet" style="width:30%"></span><span class="skelet" style="width:14%"></span></div>' +
      Array.from({length: qator === 4 ? 8 : qator}, () => '<div class="skelet-qator"><span class="skelet" style="width:24%"></span>' +
        '<span class="skelet" style="width:34%"></span><span class="skelet" style="width:16%"></span><span class="skelet" style="width:12%"></span></div>').join("") + "</div>";
    if (tur === "karta") return '<div class="skelet-kartalar" aria-busy="true" aria-label="Yuklanmoqda">' +
      Array.from({length: qator}, () => '<div class="skelet skelet-karta"></div>').join("") + "</div>";
    return '<div class="skelet-royxat" aria-busy="true" aria-label="Yuklanmoqda">' + Array.from({length: qator}, () =>
      '<div class="skelet-qator"><span class="skelet skelet-belgi"></span><span class="skelet-matn">' +
      '<span class="skelet" style="width:62%"></span><span class="skelet" style="width:38%"></span></span></div>').join("") + "</div>";
  },
  xatoHolat(joy, matn, qaytaFn){
    const el = typeof joy === "string" ? document.getElementById(joy) : joy;
    const html = '<div class="xato-holat" role="alert">' + ik("xavf") + "<b>Ma&#39;lumotni yuklab bo&#39;lmadi</b>" +
      "<span>" + esc(matn || "Aloqani tekshirib, qayta urinib ko'ring") + "</span>" +
      (qaytaFn ? '<button type="button" class="tugma tugma-oq tugma-kichik" data-qayta>' + ik("yangilash") + "Qayta urinish</button>" : "") + "</div>";
    if (!el) return html;
    el.innerHTML = html;
    const b = el.querySelector("[data-qayta]");
    if (b) b.addEventListener("click", qaytaFn);
    tarjimaQil(el);
    return html;
  },

  /* ---------- Obyekt surati ----------
     MKB.obyektSurati(m, {kichik, sinf, id}) — m: YOZUVLAR yozuvi yoki OBYEKT_INDEKS bandi */
  obyektSurati(m, o){
    m = m || {}; o = o || {};
    const yol = o.kichik ? (m.rasmKichik || m.rasm) : (m.rasm || m.rasmKichik);
    const tur = m.rasmTuri || "";
    if (!yol) return suratYoqHTML(tur, {kichik: o.kichik, sinf: o.sinf, id: o.id, obyektId: m.id});
    const man = suratManzili(yol);
    return '<img class="obyekt-surat' + (o.sinf ? " " + esc(o.sinf) : "") + '"' + (o.id ? ' id="' + esc(o.id) + '"' : "") +
      (man.fayl ? ' data-fayl="' + esc(man.fayl) + '"' : ' src="' + esc(man.src) + '"') +
      ' alt="' + esc(m.qisqa || m.nom || "") + '" loading="lazy" decoding="async" data-tur="' + esc(tur) + '"' +
      (o.kichik ? ' data-kichik="1"' : "") + (o.sinf ? ' data-sinf="' + esc(o.sinf) + '"' : "") + (m.id ? ' data-obyekt="' + esc(m.id) + '"' : "") +
      ' onerror="MKB.suratYoq(this)" onload="MKB.suratShakli(this)">';
  },
  /* Ochilmagan surat o'rniga bo'sh holat */
  suratYoq(img){
    if (!img || !img.parentNode) return;
    const t = document.createElement("span");
    t.innerHTML = suratYoqHTML(img.dataset.tur, {kichik: !!img.dataset.kichik, sinf: img.dataset.sinf, id: img.id, obyektId: img.dataset.obyekt});
    const yangi = t.firstChild;
    img.parentNode.replaceChild(yangi, img);
    tarjimaQil(yangi);
  },
  /* Tik (portret) surat kadrni to'ldirmaydi, to'liq ko'rinadi */
  suratShakli(img){
    if (img && img.naturalHeight > img.naturalWidth * 1.05) img.classList.add("tik");
  },
  suratlar: obyektSuratlari,

  /* Obyekt kartochkasi sarlavhasi: surat, holat, nom, manzil, nazorat indeksi.
     joy — section.foto-shapka (ko'rsatilmasa sahifadagi birinchisi) */
  fotoShapka(x, joy){
    const el = typeof joy === "string" ? document.querySelector(joy) : (joy || document.querySelector(".foto-shapka"));
    if (!el || !x) return;
    const D = D_();
    const nom = x.nom || (x.mulk && x.mulk.nom) || x.id;
    const manzil0 = x.manzil || (x.mulk && x.mulk.manzil) || "";
    /* Nomi manzilning o'zi bo'lsa (xonadon, hovli) manzil qayta yozilmaydi, o'rniga hudud */
    const manzil = manzil0 && manzil0.trim() === String(nom).trim() ? (x.hududToliq || x.hudud || "") : manzil0;
    const surat = obyektSuratlari(x)[0];
    const holat = x.holat ? MKB.holatChip(x.holat) : "";
    const tur = x.tur ? '<span class="chip chip-oq">' + esc(x.tur) + "</span>" : "";
    let halqa = "";
    /* Balansdan chiqarilgan obyekt (ARXIV yozuvi yoki holati "Chiqarildi") nazorat qilinmaydi: halqa chizilmaydi */
    const arxivda = x.holat === "Chiqarildi" || (!x.holat && x.sotuvSana !== undefined) ||
      (!!x.id && (D.ARXIV || []).some(a => a && a.id === x.id) && !(D.YOZUVLAR || []).some(y => y && y.id === x.id && y.holat !== "Chiqarildi"));
    try{
      const ix = !arxivda && D.nazoratIndeksi ? D.nazoratIndeksi(x) : null;
      if (ix){
        const ball = ix.daraja === "malumotsiz" ? null : ix.ball;
        halqa = '<div class="fs-halqa" title="' + esc("Nazorat indeksi: " + (ix.darajaNomi || "")) + '">' +
          MKB.halqa(ball, 74, 6).replace('class="halqa', 'class="halqa katta') + "<span>Nazorat indeksi</span></div>";
      }
    }catch(_){ }
    el.classList.add("foto-shapka");
    el.classList.toggle("suratsiz", !surat);
    let fon = "", kadr = "";
    if (surat){
      const man = suratManzili(surat.yol);
      const src = man.fayl ? ' data-fayl="' + esc(man.fayl) + '"' : ' src="' + esc(man.src) + '"';
      fon = '<img class="fs-fon"' + src + ' alt="" aria-hidden="true">';
      kadr = '<button type="button" class="fs-surat" data-fs-galereya aria-label="Suratni kattalashtirish">' +
        '<img' + src + ' alt="' + esc(nom) + '" data-tur="' + esc(x.rasmTuri || "") + '" data-kichik="1" onload="MKB.suratShakli(this)" onerror="MKB.suratYoq(this)">' +
        (obyektSuratlari(x).length > 1 ? '<span class="fs-soni">' + ik("galereya") + obyektSuratlari(x).length + "</span>" : "") + "</button>";
    }
    el.innerHTML = fon +
      '<div class="fs-ich">' + kadr +
        '<div class="fs-matn"><div class="fs-chiplar">' + holat + tur + "</div>" +
          "<h2>" + esc(nom) + "</h2>" +
          '<div class="fs-meta"><span class="kod-mono" data-tarjimasiz>' + esc(x.id || "") + "</span>" + (manzil ? " · " + esc(manzil) : "") + "</div></div>" +
        halqa + "</div>";
    const g = el.querySelector("[data-fs-galereya]");
    if (g) g.addEventListener("click", () => MKB.galereya(x, 0));
    faylSuratlariniOch(el);
    tarjimaQil(el);
  },

  /* Katta ko'rish: ← → va Esc bilan, manba izohi bilan */
  galereya(m, i){
    const r = obyektSuratlari(m);
    if (!r.length){ MKB.toast("Bu obyektda surat yo'q", "info"); return; }
    let joriy = Math.max(0, Math.min(i || 0, r.length - 1));
    const oldingi = document.activeElement;
    const d = document.createElement("dialog");
    d.className = "galereya";
    d.setAttribute("aria-label", "Obyekt suratlari");
    d.innerHTML =
      '<div class="gl-bosh"><span class="gl-soni" data-tarjimasiz></span><b class="gl-nom"></b>' +
        '<button type="button" class="gl-tugma" data-gl="yop" aria-label="Yopish">' + ik("yopish") + "</button></div>" +
      '<div class="gl-sahna">' +
        '<button type="button" class="gl-tugma gl-old" data-gl="old" aria-label="Oldingi surat">' + ik("chap") + "</button>" +
        '<img class="gl-surat" alt="">' +
        '<button type="button" class="gl-tugma gl-keyin" data-gl="keyin" aria-label="Keyingi surat">' + ik("ong") + "</button>" +
      "</div>" +
      '<div class="gl-izoh"></div>' +
      (r.length > 1 ? '<div class="gl-lenta">' + r.map((s, k) => {
        const man = suratManzili(s.yol);
        return '<button type="button" data-gl-k="' + k + '" aria-label="' + (k + 1) + '-surat"><img' +
          (man.fayl ? ' data-fayl="' + esc(man.fayl) + '"' : ' src="' + esc(man.src) + '"') + ' alt="" loading="lazy"></button>';
      }).join("") + "</div>" : "");
    document.body.appendChild(d);
    const img = d.querySelector(".gl-surat");
    const korsat = () => {
      const s = r[joriy];
      const man = suratManzili(s.yol);
      if (man.fayl){ img.removeAttribute("src"); MKBapi.fayl.url(man.fayl).then(u => { if (u) img.src = u; }); }
      else img.src = man.src;
      img.alt = (m.qisqa || m.nom || "") + ", " + (joriy + 1) + "-surat";
      d.querySelector(".gl-soni").textContent = (joriy + 1) + " / " + r.length;
      d.querySelector(".gl-nom").textContent = m.qisqa || m.nom || "";
      const izoh = [];
      if (s.tur === "sxema") izoh.push("Joylashuv sxemasi");
      if (m.rasmManba) izoh.push(m.rasmManba);
      if (m.rasmUmumiy && joriy === 0) izoh.push("Bu surat boshqa obyekt yozuvida ham bor");
      d.querySelector(".gl-izoh").textContent = izoh.join(" · ");
      d.querySelectorAll("[data-gl-k]").forEach(b => b.classList.toggle("faol", +b.dataset.glK === joriy));
      d.querySelector(".gl-old").hidden = d.querySelector(".gl-keyin").hidden = r.length < 2;
      tarjimaQil(d);
    };
    const yur = q => { joriy = (joriy + q + r.length) % r.length; korsat(); };
    d.addEventListener("click", e => {
      const b = e.target.closest("[data-gl]");
      if (b){ const a = b.dataset.gl; if (a === "yop") d.close(); else yur(a === "old" ? -1 : 1); return; }
      const k = e.target.closest("[data-gl-k]");
      if (k){ joriy = +k.dataset.glK; korsat(); return; }
      if (e.target === d) d.close();
    });
    d.addEventListener("keydown", e => {
      if (e.key === "ArrowLeft"){ e.preventDefault(); yur(-1); }
      if (e.key === "ArrowRight"){ e.preventDefault(); yur(1); }
    });
    d.addEventListener("close", () => { d.remove(); if (oldingi && oldingi.focus) oldingi.focus(); });
    faylSuratlariniOch(d);
    korsat();
    if (d.showModal) d.showModal(); else d.setAttribute("open", "");
    d.querySelector('[data-gl="yop"]').focus();
  },

  /* Obyekt kartochkasi tablari bitta ro'yxatdan: MKB.obyektTablar(id, "obyekt-moliya.html", "#tablar-joy") */
  obyektTablar(id, faol, joy){
    const T = window.MKB_OBYEKT_TABLAR || [];
    faol = faol || faylNomi();
    const D = D_();
    const y = D.topish ? D.topish(id) : null;
    const suratSoni = y ? obyektSuratlari(y).length : 0;
    const html = '<nav class="bolim-tablar obyekt-tablar" aria-label="Obyekt kartochkasi">' +
      T.filter(t => t.f === faol || sahifaRuxsatlimi(t.f)).map(t =>
        '<a href="' + t.f + "?id=" + encodeURIComponent(id || "") + '"' + (t.f === faol ? ' class="faol" aria-current="page"' : "") + ">" + t.n +
        (t.f === "obyekt-suratlar.html" && suratSoni ? '<span class="soni" data-tarjimasiz>' + suratSoni + "</span>" : "") + "</a>").join("") +
      "</nav>";
    const el = (typeof joy === "string" ? document.querySelector(joy) : joy) ||
      (joy === undefined ? document.querySelector("[data-obyekt-tablar], .obyekt-tablar") : null);
    if (el){ el.outerHTML = html; const yangi = document.querySelector(".obyekt-tablar"); if (yangi) tarjimaQil(yangi); }
    return html;
  },

  /* Fayl maydoni: sudrab tashlash yoki tanlash, MKBapi.fayl orqali saqlaydi.
     MKB.faylMaydon("#joy", {obyektId, kolleksiya, yozuvId, accept:"image/*", kop:true, yuklandi(yozuv)}) */
  faylMaydon(joy, o){
    const el = typeof joy === "string" ? document.querySelector(joy) : joy;
    if (!el) return null;
    o = o || {};
    const maks = window.MKBapi && MKBapi.fayl ? MKBapi.fayl.MAX_HAJM : 20 * 1024 * 1024;
    const izoh = o.izoh || (o.accept && /image/.test(o.accept) ? "JPG, PNG yoki WEBP" : "Surat, PDF, Word yoki Excel") +
      ", " + Math.round(maks / 1048576) + " MB gacha";
    el.innerHTML =
      '<label class="fayl-maydon">' +
        '<input type="file"' + (o.accept ? ' accept="' + esc(o.accept) + '"' : "") + (o.kop ? " multiple" : "") + ">" +
        '<span class="fm-belgi">' + ik("yuklash") + "</span>" +
        "<b>" + esc(o.sarlavha || "Faylni shu yerga tashlang yoki tanlang") + "</b>" +
        "<span>" + esc(izoh) + "</span>" +
      "</label>" +
      '<ul class="fm-royxat" aria-live="polite"></ul>';
    const label = el.querySelector(".fayl-maydon"), inp = el.querySelector("input"), ul = el.querySelector(".fm-royxat");
    const hajmMatn = n => n >= 1048576 ? (n / 1048576).toFixed(1).replace(".", ",") + " MB" : Math.max(1, Math.round(n / 1024)) + " KB";
    /* Bitta fayl: 1 MB dan katta faylda yuklash foizi, xato bo'lsa "Qayta urinish" */
    async function birFayl(f, li){
      const holat = li.querySelector(".matn > span");
      const katta = f.size > 1048576;
      li.className = "fm-band yuklanmoqda-band";
      li.querySelector(".ic use").setAttribute("href", "#ik-hujjat");
      holat.textContent = "Saqlanmoqda...";
      const eski = li.querySelector(".fm-qayta"); if (eski) eski.remove();
      let bar = li.querySelector(".fm-jarayon");
      if (katta && !bar){ bar = document.createElement("span"); bar.className = "fm-jarayon"; bar.setAttribute("role", "progressbar");
        bar.setAttribute("aria-valuemin", "0"); bar.setAttribute("aria-valuemax", "100"); bar.innerHTML = "<i></i>"; li.querySelector(".matn").appendChild(bar); }
      tarjimaQil(li);
      try{
        if (!window.MKBapi || !MKBapi.fayl) throw new Error("Fayl xizmati ulanmagan");
        if (o.accept && /image/.test(o.accept) && !/^image\//.test(f.type)) throw new Error("Faqat surat yuklash mumkin");
        const jarayon = katta ? foiz => {
          if (bar){ bar.querySelector("i").style.width = foiz + "%"; bar.setAttribute("aria-valuenow", String(foiz)); }
          holat.innerHTML = "<span>Saqlanmoqda...</span> <span data-tarjimasiz>" + foiz + "%</span>"; tarjimaQil(holat);
        } : null;
        const yozuv = await MKBapi.fayl.saqla(f, {obyektId: o.obyektId, kolleksiya: o.kolleksiya, yozuvId: o.yozuvId}, jarayon ? {jarayon} : undefined);
        if (bar) bar.remove();
        li.className = "fm-band tayyor";
        holat.innerHTML = '<span data-tarjimasiz>' + hajmMatn(f.size) + "</span> · <span>saqlandi</span>";
        li.querySelector(".ic use").setAttribute("href", "#ik-tasdiq");
        if (o.yuklandi) await o.yuklandi(yozuv, f);
      }catch(e){
        if (bar) bar.remove();
        li.className = "fm-band xato";
        holat.textContent = e.message || "Fayl saqlanmadi";
        li.querySelector(".ic use").setAttribute("href", "#ik-xavf");
        const q = document.createElement("button");
        q.type = "button"; q.className = "tugma tugma-oq tugma-kichik fm-qayta";
        q.innerHTML = ik("yangilash") + "Qayta urinish";
        q.addEventListener("click", () => birFayl(f, li));
        li.appendChild(q);
      }
      tarjimaQil(li);
    }
    async function yukla(fayllar){
      for (const f of Array.from(fayllar || [])){
        const li = document.createElement("li");
        li.className = "fm-band yuklanmoqda-band";
        li.innerHTML = ik("hujjat") + '<span class="matn"><b></b><span>Saqlanmoqda...</span></span>';
        li.querySelector("b").textContent = f.name;
        ul.appendChild(li);
        await birFayl(f, li);
      }
      inp.value = "";
    }
    inp.addEventListener("change", () => yukla(inp.files));
    ["dragenter", "dragover"].forEach(t => label.addEventListener(t, e => { e.preventDefault(); label.classList.add("ustida"); }));
    ["dragleave", "drop"].forEach(t => label.addEventListener(t, e => { e.preventDefault(); label.classList.remove("ustida"); }));
    label.addEventListener("drop", e => yukla(e.dataTransfer && e.dataTransfer.files));
    tarjimaQil(el);
    return {yukla};
  },

  /* Me'yoriy muddatlar lentasi: qabul -> soliq imtiyozi -> umidsiz -> 3 yil */
  muddatLenta(m){
    const D = D_();
    const h = D.muddatHisobi ? D.muddatHisobi(m) : null;
    if (!h || !h.balansSana) return MKB.boshHolat("kalendar", "Balans sanasi kiritilmagan", "Muddatlar balansga qabul sanasidan hisoblanadi");
    const oqi = s => D.sanaOqi(s);
    const bosh = oqi(h.balansSana), oxir = oqi(h.uchYilSana), bugun = MKB.bugun();
    const jami = Math.max(1, oxir - bosh);
    const joy = d => Math.max(0, Math.min(100, (d - bosh) / jami * 100));
    const nuqtalar = [
      {nom: "Balansga qabul", sana: h.balansSana},
      {nom: "Soliq imtiyozi tugaydi", sana: h.soliqImtiyozTugash},
      {nom: h.chegaraKun >= 1095 ? "1 yil" : "Umidsiz toifa, 100% zaxira", sana: h.umidsizSana, xavf: h.chegaraKun < 1095},
      {nom: h.chegaraKun >= 1095 ? "Umidsiz toifa, 100% zaxira" : "3 yil", sana: h.uchYilSana, xavf: h.chegaraKun >= 1095},
    ].filter(n => n.sana);
    const b = joy(bugun);
    const holat = (D.MUDDAT_HOLATLARI || {})[h.holat] || {};
    return '<div class="muddat-lenta">' +
      '<div class="ml-bosh"><span class="chip ' + (holat.chip || "") + '">' + esc(holat.nom || h.holatNomi || "") + "</span>" +
        '<span class="ml-kun">Balansda <b>' + h.turganKun + "</b> kun" +
        (h.qolganKun > 0 ? " · umidsizgacha <b>" + h.qolganKun + "</b> kun" : "") + "</span></div>" +
      '<div class="ml-iz" role="img" aria-label="Muddatlar lentasi">' +
        '<span class="ml-otgan" style="width:' + b + '%"></span>' +
        nuqtalar.map(n => '<i class="ml-nuqta' + (oqi(n.sana) <= bugun ? " otdi" : "") + (n.xavf ? " xavf" : "") + '" style="left:' + joy(oqi(n.sana)) + '%"></i>').join("") +
        '<span class="ml-bugun" style="left:' + b + '%"><em>Bugun</em></span>' +
      "</div>" +
      '<ol class="ml-yozuvlar">' + nuqtalar.map(n =>
        '<li class="' + (oqi(n.sana) <= bugun ? "otdi" : "") + (n.xavf ? " xavf" : "") + '"><b data-tarjimasiz>' + n.sana + "</b><span>" + n.nom + "</span></li>").join("") +
      "</ol></div>";
  },

  /* ---------- Saqlash yordamchilari (yozuv faqat MKBapi orqali) ---------- */
  /* Server rejimida to'plam xotiradagi nusxaga id bo'yicha qo'shib olinadi */
  async kolYukla(nomlar){
    await MKBapi.tayyor;
    if (MKBapi.rejim() !== "server") return;
    for (const k of nomlar){
      try{
        const asl = D_()[k], r = await MKBapi.royxat(k);
        if (!Array.isArray(asl) || !Array.isArray(r)) continue;
        const ix = new Map(asl.map(x => [x.id, x]));
        r.forEach(x => { const b = ix.get(x.id); if (b) Object.assign(b, x); else asl.push(x); });
      }catch(_){ }
    }
  },
  async yoz(k, id, patch){
    await MKBapi.yangilash(k, id, patch);
    return (D_()[k] || []).find(x => x.id === id) || null;
  },
  async qosh(k, obyekt){
    const j = await MKBapi.yangi(k, obyekt);
    const y = j && j.id ? j : obyekt;
    const a = D_()[k];
    return (Array.isArray(a) && a.find(x => x.id === y.id)) || y;
  },
  /* Keyingi raqam: shu old qo'shimchali id'larning eng katta soni + 1 */
  async keyingiId(k, old, uzunlik){
    const r = await MKBapi.royxat(k);
    let maks = 0;
    r.forEach(x => {
      const s = String(x.id || ""), m = /(\d+)$/.exec(s);
      if (m && s.indexOf(old) === 0) maks = Math.max(maks, +m[1]);
    });
    return old + String(maks + 1).padStart(uzunlik || 0, "0");
  },
  async saqla(ish, xabar){
    try{ const r = await ish(); if (xabar) MKB.toast(xabar); return r === undefined ? true : r; }
    catch(e){ MKB.toast(e && e.message ? e.message : "Saqlab bo'lmadi, qayta urinib ko'ring", "xavf"); return false; }
  },
  /* Ichki nusxa: bank tarmog'idagi yoki xodim kompyuteridagi ishga tushirish.
     Ommaviy namoyish saytida faqat tizimning o'zi ochiladi. */
  ichkiNusxa(){ return /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname) || location.protocol === "file:"; },
  kim(){ const s = joriySessiya(); return s && s.ism ? s.ism : "—"; },
  soat(){
    const d = new Date();
    return String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0");
  },
  qongiroqYangila,
};

/* Sana yordamchilari: MKB_DATA.sana bilan bir xil (oqi, yoz, vaqt, kunQosh, oyQosh, kunFarqi, ishKunimi, ishKuni, bugun) */
MKB.sana = (function(){
  const D = D_();
  if (D.sana) return D.sana;
  const ikki = n => String(n).padStart(2, "0");
  const oqi = x => {
    if (x instanceof Date) return x;
    const m = /^(\d{1,2})[.\/-](\d{1,2})[.\/-](\d{4})/.exec(String(x || ""));
    if (m) return new Date(+m[3], +m[2] - 1, +m[1]);
    const d = new Date(x);
    return isNaN(d) ? null : d;
  };
  return {oqi, yoz: d => { d = oqi(d) || new Date(); return ikki(d.getDate()) + "." + ikki(d.getMonth() + 1) + "." + d.getFullYear(); },
          bugun: () => new Date(), kunQosh: (d, n) => { d = new Date(oqi(d)); d.setDate(d.getDate() + n); return d; },
          kunFarqi: (a, b) => Math.round((oqi(b) - oqi(a)) / 864e5), ishKunimi: d => { const k = oqi(d).getDay(); return k !== 0 && k !== 6; },
          ishKuni: (d, n) => { d = new Date(oqi(d)); let q = Math.abs(n || 0); while (q > 0){ d.setDate(d.getDate() + (n > 0 ? 1 : -1)); if (d.getDay() % 6) q--; } return d; }};
})();

/* Himoya va monitoring sahifalari uchun umumiy yordamchilar */
MKB.kn = {
  NATIJA: {ruxsat: ["Ruxsat berildi", "chip-yashil"], rad: ["Rad etildi", "chip-xavf"], ogohlantirish: ["Ogohlantirish", "chip-sariq"]},
  HOLAT: {onlayn: ["Onlayn", "chip-yashil"], oflayn: ["Oflayn", "chip-xavf"], xizmatda: ["Xizmatda", "chip-sariq"]},
  QR_HOLAT: {ishlayapti: ["Ishlayapti", "chip-yashil"], ogohlantirish: ["Ogohlantirish", "chip-sariq"], nosoz: ["Nosoz", "chip-xavf"]},
  chip(xarita, kalit){
    const v = xarita[kalit] || [MKB.holatNomi(kalit), ""];
    return '<span class="chip ' + v[1] + '">' + v[0] + "</span>";
  },
  nuqtaIkonka(t){ return t === "darvoza" ? "zavod" : t === "shlagbaum" ? "mashina" : "eshik"; },
  shaxsSurati(sh, olcham){
    const o = olcham || 38;
    return sh && sh.rasm
      ? '<img class="shaxs-surat" src="' + esc(sh.rasm) + '" alt="" loading="lazy" style="width:' + o + "px;height:" + o + 'px">'
      : '<span class="belgi">' + esc(sh ? sh.belgi : "?") + "</span>";
  },
  shaxsQatori(sh, ong){
    if (!sh) return '<span class="matn"><b>Aniqlanmagan shaxs</b><span>Identifikatsiya o&#39;tmadi</span></span>';
    return MKB.kn.shaxsSurati(sh) +
      '<span class="matn"><b>' + esc(sh.ism) + "</b><span>" + esc(sh.lavozim) + " · " + esc(sh.tashkilot) + "</span></span>" + (ong || "");
  },
  obyektNomi(id){
    const D = D_();
    const o = D.OBYEKT_INDEKS && D.OBYEKT_INDEKS[id];
    return o ? o.qisqa : (D.obyektNomi ? D.obyektNomi(id) : id);
  },
  /* Tanlov va ro'yxatlar uchun ajraladigan yorliq: qisqa nomlar takrorlanadi, shuning uchun hudud va ID qo'shiladi */
  obyektYorligi(id){
    const D = D_();
    const o = D.OBYEKT_INDEKS && D.OBYEKT_INDEKS[id];
    return o ? [o.qisqa, o.hudud, o.id].filter(Boolean).join(" · ") : MKB.kn.obyektNomi(id);
  },
  voqeaQatori(v){
    const D = D_();
    const sh = D.shaxs ? D.shaxs(v.shaxsId) : null;
    return '<a class="qator" href="kirish-voqea.html?id=' + encodeURIComponent(v.id) + '">' +
      '<span class="belgi ' + (v.natija === "rad" ? "pushti" : v.natija === "ogohlantirish" ? "lavanda" : "mint") + '">' +
        ik(v.natija === "ruxsat" ? "tasdiq" : v.natija === "rad" ? "rad" : "xavf") + "</span>" +
      '<span class="matn"><b>' + esc(sh ? sh.ism : v.operator || "Aniqlanmagan shaxs") + "</b>" +
      "<span>" + esc(MKB.kn.obyektNomi(v.obyektId)) + " · " + esc(v.nuqtaNomi || "") + " · " + esc(v.usul || "") + "</span></span>" +
      '<span class="ong"><span class="vaqt">' + esc(v.soat || "") + "</span>" + MKB.kn.chip(MKB.kn.NATIJA, v.natija) + "</span></a>";
  },
  yukla: nomlar => MKB.kolYukla(nomlar),
  async yangila(k, id, patch){ return MKB.yoz(k, id, patch); },
  async yangi(k, obyekt){ return MKB.qosh(k, obyekt); },
  keyingiId: (k, old, uzunlik) => MKB.keyingiId(k, old, uzunlik),
  async saqla(ish){ return (await MKB.saqla(ish)) !== false; },
  kim: () => MKB.kim(),
  soat: () => MKB.soat(),
  /* "26.08.2026" + "14:05" -> saralash kaliti */
  vaqtKalit(sana, soat){ return String(sana || "").split(".").reverse().join("") + (soat || ""); },
};

window.MKB = MKB;
window.sahifaRuxsatlimi = sahifaRuxsatlimi;
window.tarjimaQil = tarjimaQil;
window.joriyTil = joriyTil;
window.ik = ik;

/* Umumiy biznes amallari, sayohat matnlari va ish qulayligi fayllari: sahifa ularni o'zi ulamagan bo'lsa qobiq ulaydi.
   Dinamik skriptlar yozilgan tartibda bajariladi (async = false) */
(function(){
  ["yadro/amal.js", "yadro/sayohatlar.js", "yadro/ux.js"].forEach(f => {
    if (document.querySelector('script[src*="' + f + '"]')) return;
    const s = document.createElement("script");
    s.src = f + "?v=" + MKB_VERSIYA;
    s.async = false;
    document.head.appendChild(s);
  });
})();
/* yadro/ux.js yuklanguncha chaqirilgan asinxron amallar kutib turadi (keyin haqiqiy funksiya bajariladi) */
["tasdiqla", "band", "sahifaYukla", "qaytarish", "ketishMumkinmi"].forEach(nom => {
  if (MKB[nom]) return;
  const vaqtincha = function(...a){
    return new Promise((hal, rad) => {
      const ishla = () => (MKB[nom] && MKB[nom] !== vaqtincha ? Promise.resolve(MKB[nom](...a)).then(hal, rad) : rad(new Error("Sahifa to'liq yuklanmadi")));
      if (window.MKB_UX_TAYYOR) ishla(); else document.addEventListener("mkb:ux", ishla, {once: true});
    });
  };
  MKB[nom] = vaqtincha;
});
/* Sinxron qiymat qaytaradiganlar. formaQoriqla: tutqich darhol qaytadi, ux.js yuklanganda haqiqiy qo'riq ulanadi
   va shu orada chaqirilgan toza/asos/saqla... tartib bilan qo'llanadi */
if (!MKB.formaQoriqla){
  const vaqtincha = function(forma, o){
    if (window.MKB_UX_TAYYOR && MKB.formaQoriqla !== vaqtincha) return MKB.formaQoriqla(forma, o);
    let asl = null;
    const navbat = [];
    const t = {forma, nom: (o && o.nom) || "Forma", qoralamaBor: !!(o && o.qoralama)};
    ["toza", "saqla", "asos", "fayllar", "qadam", "yoq"].forEach(m => { t[m] = (...a) => { if (asl) return asl[m](...a); navbat.push([m, a]); }; });
    t.iflosmi = () => (asl ? asl.iflosmi() : false);
    t.qoralama = () => (asl ? asl.qoralama() : null);
    const ula = () => {
      if (asl || MKB.formaQoriqla === vaqtincha) return;
      asl = MKB.formaQoriqla(forma, o);
      navbat.forEach(([m, a]) => { try{ asl[m](...a); }catch(_){ } });
      navbat.length = 0;
    };
    if (window.MKB_UX_TAYYOR) setTimeout(ula, 0); else document.addEventListener("mkb:ux", ula, {once: true});
    return t;
  };
  MKB.formaQoriqla = vaqtincha;
}
if (!MKB.formaTekshir){
  const tekshirVaqtincha = function(forma, qoidalar){
    if (window.MKB_UX_TAYYOR && MKB.formaTekshir !== tekshirVaqtincha) return MKB.formaTekshir(forma, qoidalar);
    MKB.toast("Sahifa hali yuklanmoqda. Birozdan keyin qayta bosing", "info");
    return null;
  };
  MKB.formaTekshir = tekshirVaqtincha;
}
/* Tizimdan chiqish: saqlanmagan forma bo'lsa so'raladi, qoralamalar o'chiriladi (yadro/ux.js) */
function tizimdanChiqish(){
  if (MKB.tizimdanChiq) return MKB.tizimdanChiq();
  MKBapi.chiqish(); location.href = "kirish.html";
}
/* Sessiya muddat tufayli yopilgan bo'lsa kirish sahifasi sababni aytadi va ish shu sahifadan davom etadi */
function kirishManzili(){
  const sabab = window.MKBapi && MKBapi.sessiyaSababi ? MKBapi.sessiyaSababi() : null;
  if (sabab !== "muddat") return "kirish.html";
  return "kirish.html?sabab=muddat&qaytish=" + encodeURIComponent(faylNomi() + location.search);
}

/* Ro'yxat qatorida kesilgan matn sichqoncha ustiga kelganda to'liq ko'rinadi */
document.addEventListener("mouseover", e => {
  const el = e.target.closest && e.target.closest(".qator .matn > b, .qator .matn > span");
  if (!el || el.hasAttribute("title")) return;
  if (el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 1) el.title = el.textContent.trim();
});

/* ---------- Qayta chizishda klaviatura fokusini saqlash ----------
   Filtr yoki holat tugmasi bosilganda ro'yxat innerHTML bilan qayta chiziladi va fokusdagi tugma
   DOMdan chiqadi. Tugma o'zining data-* atributlari (yo'q bo'lsa id, so'ng matni) bo'yicha eslab
   qolinadi va yangi chizilgan nusxasiga fokus qaytariladi: Tab boshidan boshlanmaydi,
   ekran o'quvchi yangi aria-pressed holatini e'lon qiladi. */
const FOKUS_TEG = "button,a[href],[role=button],[role=tab],[role=option],[tabindex]";
function fokusImzosi(el){
  if (!el || el === document.body || !el.matches || !el.matches(FOKUS_TEG)) return null;
  const data = [...el.attributes].filter(a => a.name.startsWith("data-") && a.name !== "data-tarjimasiz").map(a => [a.name, a.value]);
  const joy = el.parentElement && el.parentElement.closest("[id]");
  const sinf = fokusSinfi(el);
  /* Tartib raqami: tugma yangi ro'yxatda qolmasa (masalan bajarilgan vazifa filtrdan chiqsa) o'rnidagi qo'shnisiga o'tiladi */
  const tartib = joy && sinf ? [...joy.querySelectorAll(el.tagName)].filter(e => fokusSinfi(e) === sinf).indexOf(el) : -1;
  return {teg: el.tagName, id: el.id || "", data, matn: data.length || el.id ? "" : el.textContent.trim(),
    joy: joy ? joy.id : "", sinf, tartib, el};
}
function fokusSinfi(e){ return [...e.classList].filter(k => k !== "faol" && k !== "tanlangan").sort().join(" "); }
function fokusNomzodi(imzo, ildiz){
  if (!imzo) return null;
  ildiz = ildiz || document;
  if (imzo.id){ const e = document.getElementById(imzo.id); if (e && e.tagName === imzo.teg && ildiz.contains(e)) return e; }
  const mos = [...ildiz.querySelectorAll(imzo.teg)].filter(e => e !== imzo.el && !e.disabled &&
    (imzo.data.length ? imzo.data.every(([n, v]) => e.getAttribute(n) === v) : !imzo.id && e.textContent.trim() === imzo.matn));
  if (mos.length === 1) return mos[0];
  if (mos.length > 1){
    /* Bir xil kalit bir necha joyda (masalan filtr va doska sarlavhasi): avval o'sha konteyner, so'ng o'sha klass */
    const tor = mos.filter(e => (!imzo.joy || (e.parentElement && e.parentElement.closest("[id]") || {}).id === imzo.joy) && fokusSinfi(e) === imzo.sinf);
    return tor.length === 1 ? tor[0] : null;
  }
  /* Aynan o'sha tugma endi yo'q: o'sha konteynerdagi shu turdagi tugmalardan o'sha o'rindagisi */
  const joy = imzo.joy && document.getElementById(imzo.joy);
  if (!joy || !imzo.sinf || imzo.tartib < 0) return null;
  const qoshni = [...joy.querySelectorAll(imzo.teg)].filter(e => fokusSinfi(e) === imzo.sinf && !e.disabled);
  return qoshni.length ? qoshni[Math.min(imzo.tartib, qoshni.length - 1)] : null;
}
function fokusYoqoldimi(){ const a = document.activeElement; return !a || a === document.body || !a.isConnected; }
function fokusniTikla(imzo, ildiz){
  if (!imzo || imzo.el.isConnected || !fokusYoqoldimi()) return false;
  const e = fokusNomzodi(imzo, ildiz);
  if (!e) return false;
  e.focus({preventScroll: true});
  return document.activeElement === e;
}
/* Aniq chaqiruv: MKB.fokusniSaqla(konteyner, chiz) — sinxron va asinxron chizishni ham qo'llaydi */
MKB.fokusniSaqla = function(konteyner, chizFn){
  const a = document.activeElement;
  const imzo = konteyner && a && konteyner.contains(a) ? fokusImzosi(a) : null;
  const n = chizFn();
  if (n && typeof n.then === "function") return n.then(r => { fokusniTikla(imzo, konteyner); return r; });
  fokusniTikla(imzo, konteyner);
  return n;
};
/* Umumiy himoya: sahifa chizishni yordamchisiz qilsa ham fokus bosilgan tugma nusxasiga qaytadi.
   Chizish asinxron bo'lishi mumkin, shuning uchun bir necha kadr davomida tekshiriladi. */
document.addEventListener("click", e => {
  const el = e.target && e.target.closest ? e.target.closest(FOKUS_TEG) : null;
  if (!el || document.activeElement !== el) return;
  const imzo = fokusImzosi(el);
  if (!imzo) return;
  let urinish = 0;
  const tekshir = () => {
    /* Tugma o'chirildi: fokus yo'qolgan bo'lsa qaytariladi, boshqa joyga (masalan oynaga) o'tgan bo'lsa tegilmaydi */
    if (!imzo.el.isConnected){ fokusniTikla(imzo); return; }
    /* Tugma hali joyida: asinxron chizish (saqlash va qayta chizish) tugashini ~2 soniya kutamiz */
    if (++urinish <= 40) setTimeout(tekshir, 50);
  };
  setTimeout(tekshir, 0);
}, true);

/* ---------- Ishga tushirish ---------- */
document.addEventListener("DOMContentLoaded", () => {
  if (window.MKB_SPRITE && !document.getElementById("mkb-sprite")){
    const d = document.createElement("div");
    d.id = "mkb-sprite";
    d.hidden = true;
    d.innerHTML = window.MKB_SPRITE;
    document.body.prepend(d);
  }
  ikonkaHavolalari(document.body);

  const ochiq = document.body.dataset.ochiq === "1";
  const s = joriySessiya();

  if (!ochiq && !s){ location.replace(kirishManzili()); return; }
  /* Noma'lum rol: sessiya yopiladi, administrator huquqi berilmaydi */
  if (!ochiq && !joriyRolKalit()){ MKBapi.chiqish(); location.replace("kirish.html"); return; }
  if (!ochiq && !sahifaRuxsatlimi()){
    if (faylNomi() !== "xato-403.html"){ location.replace("xato-403.html?sahifa=" + encodeURIComponent(faylNomi())); return; }
  }

  if (!ochiq){
    yonChiz();
    shapkaChiz();
    otishHavolasi();
  }

  /* Rejim belgisi */
  const rejimBelgisi = rejim => {
    if (ochiq) return;
    let b = document.querySelector(".rejim-belgisi");
    if (!b){
      b = document.createElement("div");
      b.className = "rejim-belgisi";
      const joy = document.querySelector("#yon .yon-past") || document.body;
      joy.appendChild(b);
    }
    const server = rejim === "server";
    b.classList.toggle("snapshot", !server);
    const mahalliy = !namoyishmi();
    b.innerHTML = '<span class="nuqta"></span><span>' + (server ? "Server ulangan" : mahalliy ? "Mahalliy reyestr" : "Namoyish rejimi") + "</span>";
    sanaBelgisi(b);
    const lokal = /^(localhost|127\.0\.0\.1)$/.test(location.hostname);
    let shartliTanlangan = false;
    try{ shartliTanlangan = localStorage.getItem("mkb-manba") === "shartli"; }catch(_){}
    if (!server && lokal && (mahalliy || shartliTanlangan)){
      b.setAttribute("role", "button");
      b.tabIndex = 0;
      b.title = mahalliy ? "Ma'lumot faqat shu kompyuterda saqlanadi. Namoyish ma'lumotiga o'tish uchun bosing" : "Mahalliy reyestrga qaytish uchun bosing";
      const almash = () => {
        try{ if (mahalliy) localStorage.setItem("mkb-manba", "shartli"); else { localStorage.removeItem("mkb-manba"); sessionStorage.removeItem("mkb-mahalliy-yoq"); } }catch(_){}
        location.reload();
      };
      b.onclick = almash;
      b.onkeydown = e => { if (e.key === "Enter" || e.key === " "){ e.preventDefault(); almash(); } };
    }
    tarjimaQil(b);
  };
  document.addEventListener("mkb:rejim", e => rejimBelgisi(e.detail));
  if (window.MKBapi && MKBapi.tayyor) MKBapi.tayyor.then(r => rejimBelgisi(r));

  /* Bo'lim ichidagi tab tasmasi: rolga yopiq bandlar olib tashlanadi */
  if (!ochiq){
    /* faqat bandlari huquq tufayli olib tashlangan tasma yo'qoladi; bo'sh joy (MKB.obyektTablar uchun) qoladi */
    const qisqargan = new Set();
    document.querySelectorAll(".bolim-tablar a").forEach(a => {
      const manzil = a.getAttribute("href") || "";
      if (manzil && !sahifaRuxsatlimi(manzil)){ qisqargan.add(a.parentNode); a.remove(); }
    });
    qisqargan.forEach(t => { if (t && !t.children.length) t.remove(); });
  }

  /* Jadval filtrlari: tashqariga bosish va Escape yopadi, Enter/bo'sh joy ochadi */
  const filtrYop = () => document.querySelectorAll(".tanlov .menyu-popover.ochiq, .tanlov-joy .menyu-popover.ochiq").forEach(p => {
    p.classList.remove("ochiq");
    const t = p.closest(".tanlov[aria-expanded]") || (p.id && document.querySelector('[aria-controls="' + p.id + '"]'));
    if (t) t.setAttribute("aria-expanded", "false");
  });
  document.addEventListener("click", e => {
    if (!e.target.closest(".tanlov, .tanlov-joy")) filtrYop();
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") filtrYop();
    const t = e.target.closest && e.target.closest(".tanlov[role=button]");
    if (t && e.target === t && (e.key === "Enter" || e.key === " ")){ e.preventDefault(); t.click(); }
  });

  /* Keyin chiziladigan qismlar: eski ikonka havolalari, huquq belgilari, brauzerdagi fayl suratlari */
  if (window.MutationObserver){
    new MutationObserver(ozg => {
      for (const o of ozg) for (const n of o.addedNodes){
        if (n.nodeType !== 1) continue;
        ikonkaHavolalari(n);
        if (!ochiq && s) huquqQolla(n);
        faylSuratlariniOch(n.parentNode || n);
      }
    }).observe(document.body, {childList: true, subtree: true});
  }
  faylSuratlariniOch(document.body);

  tarjimaQil();
  window.MKB_TAYYOR = true;
  document.dispatchEvent(new CustomEvent("mkb:tayyor"));
  /* Sahifa skriptlari ma'lumotni keyin chizadi — tarjima ikki bosqichda takrorlanadi */
  setTimeout(tarjimaQil, 250);
  setTimeout(tarjimaQil, 1000);
});


/* ---------- Xodim surati ---------- */
function xodimSurati(ism){
  if (!ism) return null;
  const R = window.MKB_XODIM_RASMLARI || {};
  if (R[ism]) return R[ism];
  const F = (window.MKB_DATA && MKB_DATA.FOYDLAR) || [];
  const f = F.find(x => x.nom === ism || x.ism === ism || x.login === ism);
  return f && f.rasm ? f.rasm : null;
}

/* ---------- Rolga moslashgan qo'llanma ---------- */
function qollanmaOch(rol){
  const q = qollanmaHTML(rol);
  if (!q){
    MKB.toast("Qo'llanma topilmadi");
    return;
  }
  MKB.yonPanel(q.nom + " — qanday ishlash kerak", q.tana, {yorliq: "Ish tartibi"});
}
/* Rol qo'llanmasi: {nom, tana} yoki null. Yordam paneli (yadro/ux.js) ham shuni ishlatadi */
function qollanmaHTML(rol){
  const Q = (window.MKB_QOLLANMA || {})[rol] || (window.MKB_QOLLANMA || {}).admin;
  if (!Q) return null;
  const qadam = (x, i) =>
    '<li class="qol-qadam">' +
      '<span class="raqam">' + (i + 1) + "</span>" +
      '<span class="matn"><b>' + x.nom + "</b><span>" + x.izoh + "</span>" +
      (x.havola ? '<a href="' + x.havola + '">' + (x.havolaNomi || "Ochish") + ik("ong", "mitti") + "</a>" : "") +
      "</span></li>";
  const royxat = (nom, bandlar, kls) => bandlar && bandlar.length
    ? '<div class="qol-blok' + (kls ? " " + kls : "") + '"><h4>' + nom + "</h4><ul>" +
      bandlar.map(b => "<li>" + b + "</li>").join("") + "</ul></div>"
    : "";
  const tana =
    '<p class="qol-maqsad">' + Q.maqsad + "</p>" +
    '<div class="qol-blok"><h4>Kunlik ish tartibi</h4><ol class="qol-qadamlar">' +
      Q.qadamlar.map(qadam).join("") + "</ol></div>" +
    royxat("Sizning javobgarligingiz", Q.javobgarlik) +
    royxat("Muddat va me'yorlar", Q.meyor, "qol-meyor") +
    royxat("Sizga yopiq bo'limlar", Q.yopiq, "qol-yopiq") +
    '<a class="tugma tugma-oq qol-toliq" href="qollanma.html">' + ik("hujjat") +
      "To'liq qo'llanmani ochish</a>";
  return {nom: Q.nom, tana, Q};
}
