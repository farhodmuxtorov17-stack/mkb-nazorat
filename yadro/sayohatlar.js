/* ============================================================
   sayohatlar.js — yo'l ko'rsatuvchi sayohatlar matni (dvigatel: MKB.sayohat, yadro/ux.js)
   window.MKB_SAYOHATLAR[id] = {rol: [..] | "hammasi", sarlavha, tavsif, birinchi, rejim: "sayohat" | "namoyish",
     qadamlar: [{sahifa, nishon, sarlavha, matn, joy?, amal?, kutish?}]}
   Nishonlar sahifadagi data-sayohat (ba'zan data-tur) atributlari. Rol ocha olmaydigan sahifadagi
   qadam va sahifada topilmagan nishon dvigatel tomonidan jimgina o'tkazib yuboriladi.
   Matnlar ikki tilda: T("o'zbekcha", "русский"); ruscha MKB_LUGAT ga qo'shiladi.
   "Qanday ishlaydi" (namoyish) sayohatlari faqat ko'rinishni almashtiradi, yozuv qilmaydi.
   ============================================================ */
(function(){
  const L = window.MKB_LUGAT = window.MKB_LUGAT || {};
  const T = typeof window.mkbIkkiTil === "function" ? window.mkbIkkiTil
    : (uz, ru) => { if (ru && L[uz] == null) L[uz] = ru; return uz; };
  const S = v => '[data-sayohat="' + v + '"]';
  const R = v => '[data-tur="' + v + '"]';

  /* Qadam: sahifa — satr yoki funksiya (ochilish paytida hisoblanadi) */
  function Q(sahifa, nishon, su, sr, mu, mr, qosh){
    const q = Object.assign({nishon, sarlavha: T(su, sr), matn: T(mu, mr)}, qosh || {});
    if (typeof sahifa === "function") Object.defineProperty(q, "sahifa", {get: sahifa, enumerable: true});
    else q.sahifa = sahifa;
    return q;
  }
  /* Rolga ko'rinadigan birinchi mos yozuvning sahifasi (hodisa, qurilma, ko'rik uchun) */
  function birinchi(kol, shart, sahifa, zaxira){
    return function(){
      try{
        const D = window.MKB_DATA || {};
        const r = (window.MKB && typeof MKB.doira === "function" ? MKB.doira(D[kol] || []) : (D[kol] || []));
        const x = r.find(y => y && (!shart || shart(y)));
        return x ? sahifa + "?id=" + encodeURIComponent(x.id) : zaxira;
      }catch(_){ return zaxira; }
    };
  }
  const OCHIQ_HODISA = birinchi("XAVFSIZLIK_HODISALARI", h => h.holat === "ochiq", "hodisa.html", "hodisalar.html");
  const QULF = birinchi("QURILMALAR", q => q.tur === "aqlli-qulf" || q.tur === "faceid-terminal", "qurilma.html", "qurilmalar.html");
  const REJADAGI_KORIK = birinchi("KORIKLAR", k => k.holat === "rejada" || k.holat === "kechikkan", "korik-otkazish.html", "korik-rejasi.html");
  const OBYEKT = "obyekt.html?id={birinchiObyekt}";
  const ELON_LOT = birinchi("LOTLAR", l => l.holat === "elon", "lot.html", "lotlar.html");
  const CHIQIMGA_TAYYOR = birinchi("YOZUVLAR", y => y.holat === "Davaktivga o'tkazilgan", "chiqim-tasdiqlash.html", "chiqim-tasdiqlash.html");

window.MKB_SAYOHATLAR = {

  /* ======================= Rollar bo'yicha tanishuv ======================= */
  "rahbariyat-tanishuv": {
    rol: ["rahbariyat"], birinchi: true, rejim: "sayohat",
    sarlavha: T("Rahbariyat paneli bilan tanishuv", "Знакомство с панелью руководства"),
    tavsif: T("Bugungi qarorlar, muddati o'tgan ishlar va kengashga hisobot. 2 daqiqa", "Решения на сегодня, просроченные дела и отчёт для правления. 2 минуты"),
    qadamlar: [
      Q("panel.html", S("bugun"), "Bugun", "Сегодня", "Kunni shu blokdan boshlang. To'rt qatorda qaroringizni kutayotgan so'rovlar, kechadan beri muddati o'tgan ishlar, qiymati pasaygan obyektlar va eng katta xavflar turadi. Qatorni bossangiz, ro'yxat ochiladi.",
        "Начинайте день с этого блока. В четырёх строках — запросы, ждущие вашего решения, дела, просроченные со вчера, объекты с упавшей стоимостью и крупнейшие риски. Нажмите на строку, чтобы открыть список."),
      Q("panel.html", S("asosiy-amal"), "Qarorlarni ko'rib chiqish", "Qarorlarni ko'rib chiqish", "Asosiy tugma sizni kutayotgan so'rovlarga olib boradi. Ish bor bo'lsa, u doim shu yerda turadi.",
        "Главная кнопка ведёт к запросам, которые ждут вас. Если есть работа, она всегда здесь."),
      Q("panel.html", S("kpi"), "Asosiy ko'rsatkichlar", "Основные показатели", "Balans qiymati, zaxira yuki, 90 kunda umidsizga o'tadigan aktivlar, yillik reja va oylik saqlash xarajati. Har raqam o'z ro'yxatiga olib boradi.",
        "Балансовая стоимость, резервная нагрузка, активы, которые через 90 дней станут безнадёжными, годовой план и расходы на содержание. Каждая цифра ведёт к своему списку."),
      Q("panel.html", S("xavflar"), "Umidsizga o'tish arafasida", "На пороге безнадёжной категории", "Chegaraga eng yaqin aktivlar. Umidsiz toifada zaxira 100% bo'ladi, shuning uchun bu aktivlar bo'yicha sotuvni tezlashtirish kerak.",
        "Активы, ближайшие к порогу. В безнадёжной категории резерв 100%, поэтому по ним нужно ускорить продажу."),
      Q("panel.html", S("kengash-hisobot"), "Kengash uchun hisobot", "Отчёт для правления", "Panel raqamlaridan bir sahifalik A4 varaq tuziladi. Varaqda kim va qachon chop etgani yoziladi.",
        "Из цифр панели собирается одностраничный лист A4. На нём указано, кто и когда распечатал."),
      Q("tasdiqlar.html", S("korinish"), "Uch ko'rinish", "Три представления", "«Mendan kutilmoqda» — sizning qaroringiz kerak. «Men yuborganlar» — siz yuborgan so'rovlar. «Hal qilinganlar» — oxirgi 90 kun.",
        "«Mendan kutilmoqda» — нужно ваше решение. «Men yuborganlar» — ваши запросы. «Hal qilinganlar» — последние 90 дней."),
      Q("tasdiqlar.html", S("qaror-karta"), "Qaror kartasi", "Карточка решения", "Har so'rovda summa, muallif va javob muddati bor. «Tasdiqlash» oynasi nima o'zgarishini ko'rsatadi. «Rad etish» uchun sabab yozasiz.",
        "В каждом запросе есть сумма, автор и срок ответа. Окно «Tasdiqlash» показывает, что изменится. Для «Rad etish» нужно написать причину."),
      Q("tasdiqlar.html", S("orinbosar"), "O'rinbosar", "Заместитель", "Ta'tilga chiqsangiz, o'rinbosar tayinlang. Shu davrda qarorni u qabul qiladi, qarorda «o'rinbosar sifatida» deb yoziladi.",
        "Если уходите в отпуск, назначьте заместителя. В этот период решения принимает он, в решении указывается «o'rinbosar sifatida»."),
      Q("hisobot-mb.html", S("muddat"), "MB oylik hisoboti", "Ежемесячный отчёт ЦБ", "Hisobot har oyning 10-sanasigacha topshiriladi. Qolgan kun shu yerda ko'rinadi. Tanishuv tugadi, yordam har sahifada shapkadagi «?» tugmasida.",
        "Отчёт сдаётся до 10-го числа каждого месяца. Здесь видно, сколько дней осталось. Знакомство окончено, помощь — кнопка «?» в шапке каждой страницы."),
    ],
  },

  "admin-tanishuv": {
    rol: ["admin"], birinchi: true, rejim: "sayohat",
    sarlavha: T("Administrator ish joyi bilan tanishuv", "Знакомство с рабочим местом администратора"),
    tavsif: T("Hisoblar, rollar, qoidalar va amallar tarixi. 2 daqiqa", "Учётные записи, роли, правила и журнал действий. 2 минуты"),
    qadamlar: [
      Q("panel.html", S("bugun"), "Bugun", "Сегодня", "Siz hamma bo'limni ko'rasiz. Bu blok bankning bugungi holatini ko'rsatadi, lekin sizning asosiy ishingiz Sozlamalar bo'limida.",
        "Вы видите все разделы. Этот блок показывает состояние банка на сегодня, но ваша основная работа — в разделе Настройки."),
      Q("foydalanuvchilar.html", S("qoshish"), "Foydalanuvchi qo'shish", "Foydalanuvchi qo'shish", "Yangi xodimga hisob oching: ism, login, rol, filial va bo'lim. Filial rahbari faqat o'z filialini ko'radi.",
        "Откройте учётную запись новому сотруднику: имя, логин, роль, филиал и подразделение. Руководитель филиала видит только свой филиал."),
      Q("foydalanuvchilar.html", S("jadval"), "Hisoblar ro'yxati", "Список учётных записей", "Qatordagi «Bloklash» ishdan ketgan xodimni tizimdan chiqaradi, sabab majburiy. Amallar tarixi saqlanib qoladi.",
        "Кнопка «Bloklash» в строке отключает уволенного сотрудника, причина обязательна. Журнал действий сохраняется."),
      Q("rollar.html", S("matritsa"), "Huquqlar matritsasi", "Матрица прав", "O'nta rol va har birining bo'limlardagi huquqi: ko'radi, yozadi, tasdiqlaydi. Xodimga boshqa huquq kerak bo'lsa, mos rol bering.",
        "Десять ролей и права каждой в разделах: видит, пишет, утверждает. Если сотруднику нужны другие права, назначьте подходящую роль."),
      Q("sozlamalar.html", S("menyu"), "Sozlamalar bo'limlari", "Разделы настроек", "Eskalatsiya qoidalari, me'yoriy parametrlar va shaxsiy ma'lumotlar shu yerda. Parametr o'zgarishi amallar tarixiga yoziladi.",
        "Здесь правила эскалации, нормативные параметры и персональные данные. Изменение параметра записывается в журнал."),
      Q("sozlamalar.html", S("sayohatlar"), "Tanishuv sayohatlari", "Ознакомительные туры", "«Qayta ko'rsatish» bosilsa, ko'rilgan sayohatlar yana taklif qilinadi. Yangi xodimga shuni tavsiya qiling.",
        "После «Qayta ko'rsatish» просмотренные туры предлагаются снова. Порекомендуйте это новому сотруднику."),
      Q("amallar-tarixi.html", S("davr"), "Amallar tarixi", "Журнал действий", "Kim, qachon, nimani o'zgartirgani. Davrni tanlang va rad etilgan kirishlar ko'rinishini oching.",
        "Кто, когда и что изменил. Выберите период и откройте представление отклонённых входов."),
      Q("amallar-tarixi.html", S("jadval"), "Eski va yangi qiymat", "Старое и новое значение", "Har yozuvda o'zgarishdan oldingi va keyingi qiymat bor. CSV faqat filtrlangan qatorlarni oladi.",
        "В каждой записи есть значение до и после изменения. CSV выгружает только отфильтрованные строки."),
    ],
  },

  "filial-tanishuv": {
    rol: ["filial"], birinchi: true, rejim: "sayohat",
    sarlavha: T("Filial rahbari ish joyi bilan tanishuv", "Знакомство с рабочим местом руководителя филиала"),
    tavsif: T("Filialingiz aktivlari, kechikkan ko'riklar va qarorlar. 2 daqiqa", "Активы филиала, просроченные осмотры и решения. 2 минуты"),
    qadamlar: [
      Q("panel.html", S("bugun"), "Filial doirasida", "В рамках филиала", "Tizim sizga faqat o'z filialingiz yozuvlarini ko'rsatadi. Bu blokda bugungi qarorlar, muddati o'tgan ishlar va xavflar.",
        "Система показывает вам только записи вашего филиала. В этом блоке — решения, просроченные дела и риски на сегодня."),
      Q("panel.html", S("kpi"), "Filial raqamlari", "Цифры филиала", "Balans qiymati, zaxira yuki va 90 kunda umidsizga o'tadiganlar. Raqamni bossangiz, ro'yxat ochiladi.",
        "Балансовая стоимость, резервная нагрузка и активы, которые через 90 дней станут безнадёжными. Нажмите на цифру, чтобы открыть список."),
      Q("obyektlar.html", S("korinish"), "Tayyor ko'rinishlar", "Готовые представления", "«Umidsizga 90 kun qolgan», «Qo'riqsiz», «Kommunal uzilgan». O'z filtringizni nom bilan saqlab, havolasini yuborishingiz mumkin.",
        "«Umidsizga 90 kun qolgan», «Qo'riqsiz», «Kommunal uzilgan». Свой фильтр можно сохранить под именем и отправить ссылку."),
      Q("obyektlar.html", S("tanlash"), "Bir nechta aktivga birdan", "Сразу нескольким активам", "Qatorlarni belgilang: tepada «Ko'rik tayinlash» va «Vazifa berish» chiqadi. Oynada nechta aktiv tanlangani ko'rinadi.",
        "Отметьте строки: сверху появятся «Ko'rik tayinlash» и «Vazifa berish». В окне видно, сколько активов выбрано."),
      Q("korik-kechikkan.html", S("ommaviy-sana"), "Kechikkan ko'riklarni ko'chirish", "Перенос просроченных осмотров", "Ko'riklarni belgilang, yangi sanani tanlang va «Ko'chirish»ni bosing. Sabab tarixda qoladi.",
        "Отметьте осмотры, выберите новую дату и нажмите «Ko'chirish». Причина останется в истории."),
      Q("tasdiqlar.html", S("korinish"), "Qarorlar", "Решения", "Siz yuborgan qabul va chiqim so'rovlari «Men yuborganlar»da. O'z so'rovingizni tasdiqlay olmaysiz: uni boshqa xodim tasdiqlaydi.",
        "Ваши запросы на приём и списание — в «Men yuborganlar». Свой запрос утвердить нельзя: его утверждает другой сотрудник."),
      Q("vazifalar.html", S("qoshish"), "Vazifa qo'shish", "Добавить задачу", "Xodimga muddatli vazifa bering. Bajarilgan vazifa belgisini 8 soniya ichida qaytarish mumkin.",
        "Поставьте сотруднику задачу со сроком. Отметку о выполнении можно отменить в течение 8 секунд."),
    ],
  },

  "obyekt-tanishuv": {
    rol: ["obyekt"], birinchi: true, rejim: "sayohat",
    sarlavha: T("Obyekt menejeri paneli bilan tanishuv", "Знакомство с панелью менеджера по объектам"),
    tavsif: T("Navbatingiz, balansga qabul va obyekt kartochkasi. 2 daqiqa", "Ваша очередь, приём на баланс и карточка объекта. 2 минуты"),
    qadamlar: [
      Q("panel-obyekt.html", S("navbat"), "Mening navbatim", "Моя очередь", "Bugun qilinadigan ishlar muddat tartibida. Belgini bossangiz vazifa bajariladi, «Qoldirish» uni tanlangan sanagacha olib turadi.",
        "Дела на сегодня по срокам. Нажмите отметку — задача выполнена; «Qoldirish» убирает её до выбранной даты."),
      Q("panel-obyekt.html", S("qabul-navbati"), "Balansga qabul navbati", "Очередь приёма на баланс", "Ijro bosqichiga yetgan undiruv ishlari. «Qabul qilish» qabul formasini ish ma'lumoti bilan ochadi.",
        "Дела о взыскании на этапе исполнения. «Qabul qilish» открывает форму приёма с данными дела."),
      Q("panel-obyekt.html", S("balansga-qabul"), "Balansga qabul", "Приём на баланс", "Yangi obyektni qabul qilish shu tugmadan boshlanadi. Uch qadam, kiritilgan narsa qoralama bo'lib saqlanadi.",
        "Приём нового объекта начинается с этой кнопки. Три шага, введённое сохраняется как черновик."),
      Q("panel-obyekt.html", S("yaqinda"), "Yaqinda ochilganlar", "Недавно открытые", "Siz oxirgi ochgan obyektlar. Tez qaytish uchun.", "Объекты, которые вы открывали последними. Чтобы быстро вернуться."),
      Q(OBYEKT, S("keyingi-amal"), "Keyingi qadam", "Следующий шаг", "Kartochkada tizim eng muhim ishni aytadi, masalan yetishmayotgan hujjat, va tugma bilan o'sha ishga olib boradi.",
        "В карточке система называет самое важное дело, например недостающий документ, и кнопкой ведёт к нему."),
      Q(OBYEKT, S("tablar"), "Kartochka tablari", "Вкладки карточки", "Suratlar, Moliya, Hujjatlar, Ko'riklar, Xarajatlar, Kommunal, Himoya, Sotuv va Tarix. Hammasi shu aktiv bo'yicha.",
        "Фото, финансы, документы, осмотры, расходы, коммунальные, охрана, продажа и история. Всё по этому активу."),
      Q(OBYEKT, S("muddat-lenta"), "Me'yoriy muddatlar", "Нормативные сроки", "Balansda necha kun turgani va umidsiz toifagacha qancha qolgani. Yaqinlashsa, sotuvni tezlashtiring.",
        "Сколько дней актив на балансе и сколько осталось до безнадёжной категории. Если срок близко, ускорьте продажу."),
    ],
  },

  "nazorat-tanishuv": {
    rol: ["nazorat"], birinchi: true, rejim: "sayohat",
    sarlavha: T("Inspektor paneli bilan tanishuv", "Знакомство с панелью инспектора"),
    tavsif: T("Ko'rik navbati, kechikkanlar, inventarizatsiya va hodisalar. 2 daqiqa", "Очередь осмотров, просроченные, инвентаризация и инциденты. 2 минуты"),
    qadamlar: [
      Q("panel-nazorat.html", S("kpi"), "Bugungi raqamlar", "Цифры на сегодня", "7 kundagi ko'riklar, kechikkanlar, ochiq hodisalar va sug'urtasiz aktivlar.", "Осмотры на 7 дней, просроченные, открытые инциденты и активы без страховки."),
      Q("panel-nazorat.html", S("bugun-koriklar"), "Ko'rik navbati", "Очередь осмотров", "Kechikkan, bugungi va rejadagi ko'riklar. «Ko'rikni boshlash» eng shoshilinchining dalolatnomasini ochadi.",
        "Просроченные, сегодняшние и плановые осмотры. «Ko'rikni boshlash» открывает акт самого срочного."),
      Q("panel-nazorat.html", S("hodisalar"), "Ochiq hodisalar", "Открытые инциденты", "Jiddiylik bo'yicha. Hodisani bossangiz, uning varaqasi ochiladi.", "По важности. Нажмите на инцидент, чтобы открыть его карточку."),
      Q("korik-rejasi.html", S("jadval"), "Ko'rik rejasi", "План осмотров", "Rejadagi hamma ko'rik. Qatordagi «O'tkazish» dalolatnoma formasini ochadi.", "Все плановые осмотры. «O'tkazish» в строке открывает форму акта."),
      Q("korik-kechikkan.html", S("ommaviy-sana"), "Kechikkanlar", "Просроченные", "O'tkazib bo'lmaydigan ko'rikni sababini yozib yangi sanaga ko'chiring. Kechikish filial rahbariga eskalatsiya bo'ladi.",
        "Осмотр, который нельзя провести, перенесите на новую дату с причиной. Просрочка эскалируется руководителю филиала."),
      Q("inventarizatsiya.html", S("sanash"), "Inventarizatsiya", "Инвентаризация", "«Sanashni boshlash» birliklar ro'yxatini ochadi. Har birini «Topildi» yoki «Topilmadi» deb belgilaysiz.",
        "«Sanashni boshlash» открывает список единиц. Каждую отмечаете «Topildi» или «Topilmadi»."),
      Q("hodisalar.html", S("qayd"), "Hodisa qayd etish", "Регистрация инцидента", "Ko'rikda buzilish topsangiz, hodisa oching. Yuqori jiddiylikda xavfsizlik xizmatiga bildirishnoma ketadi.",
        "Если при осмотре нашли нарушение, откройте инцидент. При высокой важности служба безопасности получает уведомление."),
    ],
  },

  "baholash-tanishuv": {
    rol: ["baholash"], birinchi: true, rejim: "sayohat",
    sarlavha: T("Baholovchi ish joyi bilan tanishuv", "Знакомство с рабочим местом оценщика"),
    tavsif: T("Baholash reyestri, buyurtma va hisobotni tasdiqqa yuborish. 2 daqiqa", "Реестр оценки, заказ и отправка отчёта на утверждение. 2 минуты"),
    qadamlar: [
      Q("baholash.html", S("kpi"), "Baholash holati", "Состояние оценки", "Amaldagi baho, 30 kunda tugaydiganlar, eskirgan va baholanmaganlar. Baholanmagan aktiv auksionga chiqmaydi.",
        "Действующие оценки, истекающие через 30 дней, устаревшие и неоценённые. Неоценённый актив не выходит на аукцион."),
      Q("baholash.html", S("jadval"), "Baholangan aktivlar", "Оценённые активы", "Qatordagi «Buyurtma» shu aktivga baholash buyurtmasini ochadi.", "Кнопка «Buyurtma» в строке открывает заказ оценки для этого актива."),
      Q("baholash-buyurtma.html", S("forma"), "Buyurtma", "Заказ", "Obyekt, sabab, baholovchi tashkilot, narx, muddat va texnik topshiriq. Narx xarajatlarga to'lanmagan deb yoziladi.",
        "Объект, причина, оценочная организация, цена, срок и техническое задание. Цена записывается в расходы как неоплаченная."),
      Q("baholash-hisobot-kiritish.html", S("forma"), "Hisobot kiritish", "Ввод отчёта", "Bozor va tugatish qiymati, raqam, sana va PDF fayl. Tugatish qiymati bozordan oshmaydi.",
        "Рыночная и ликвидационная стоимость, номер, дата и PDF-файл. Ликвидационная не выше рыночной."),
      Q("baholash-hisobot-kiritish.html", S("yuborish"), "Tasdiqqa yuborish", "Отправить на утверждение", "Baho darhol aktivga o'tmaydi: uni Rahbariyat yoki Buxgalteriya tasdiqlaydi. O'z bahongizni tasdiqlay olmaysiz.",
        "Оценка не переходит в актив сразу: её утверждает Руководство или Бухгалтерия. Свою оценку утвердить нельзя."),
      Q("tasdiqlar.html", S("korinish"), "Men yuborganlar", "Men yuborganlar", "Yuborgan so'rovlaringiz holati shu ko'rinishda: kutilmoqda, tasdiqlangan yoki rad etilgan va sababi.",
        "Статус ваших запросов — в этом представлении: ожидает, утверждён или отклонён с причиной."),
    ],
  },

  "realizatsiya-tanishuv": {
    rol: ["realizatsiya"], birinchi: true, rejim: "sayohat",
    sarlavha: T("Realizatsiya ish joyi bilan tanishuv", "Знакомство с рабочим местом реализации"),
    tavsif: T("Sotuv rejasi, lotlar, takliflar va shartnomalar. 2 daqiqa", "План продаж, лоты, предложения и договоры. 2 минуты"),
    qadamlar: [
      Q("realizatsiya.html", S("reja"), "Yillik reja va fakt", "Годовой план и факт", "Sotilgan aktivlar va tushum. Reja kiritilmagan bo'lsa, ijro foizi hisoblanmaydi.", "Проданные активы и выручка. Если план не внесён, процент исполнения не считается."),
      Q("realizatsiya.html", S("doska"), "Bosqichlar doskasi", "Доска этапов", "Obyektlar sotuvga tayyorlash, lot va shartnoma bosqichlarida. Usul va hudud bo'yicha filtr bor.",
        "Объекты на этапах подготовки, лота и договора. Есть фильтр по способу и региону."),
      Q("lotlar.html", S("yaratish"), "Lot yaratish", "Создать лот", "Boshlang'ich narx, zakalat va sanalar. E'londan savdogacha kamida 30 kun bo'lishini tizim maydon ostida tekshiradi.",
        "Начальная цена, задаток и даты. Система под полем проверяет, что от объявления до торгов не меньше 30 дней."),
      Q("lotlar.html", S("korinish"), "Lot ko'rinishlari", "Представления лотов", "«Savdo o'tkazilmagan» va «E'lon qilinmagan» — eng ko'p ish talab qiladigan lotlar.", "«Savdo o'tkazilmagan» и «E'lon qilinmagan» — лоты, требующие больше всего работы."),
      Q("takliflar.html", S("taklif"), "Taklif kiritish", "Внести предложение", "Xaridor taklifini qayd eting, AML tekshiruvidan keyin Rahbariyat qaroriga yuboring.", "Зафиксируйте предложение покупателя и после проверки ПОД/ФТ отправьте на решение Руководства."),
      Q("shartnomalar.html", S("korinish"), "Shartnomalar", "Договоры", "«Kechikkan to'lov» ko'rinishi muddati o'tgan to'lovlarni ko'rsatadi. To'liq to'langan shartnoma balansdan chiqarishga tayyor.",
        "Представление «Kechikkan to'lov» показывает просроченные платежи. Полностью оплаченный договор готов к списанию."),
    ],
  },

  "yurist-tanishuv": {
    rol: ["yurist"], birinchi: true, rejim: "sayohat",
    sarlavha: T("Yurist ish joyi bilan tanishuv", "Знакомство с рабочим местом юриста"),
    tavsif: T("Undiruv ishlari, ish varaqasi va sud kalendari. 2 daqiqa", "Дела о взыскании, карточка дела и судебный календарь. 2 минуты"),
    qadamlar: [
      Q("undiruv.html", S("doska"), "Bosqichlar doskasi", "Доска этапов", "Ustunlar ish bosqichlari: ogohlantirish, da'vo, sud, qaror, ijro. Kartani keyingi bosqichga o'tkazsangiz, yangi nazorat muddati so'raladi.",
        "Колонки — этапы дела: предупреждение, иск, суд, решение, исполнение. При переводе карточки на следующий этап запрашивается новый контрольный срок."),
      Q("undiruv.html", S("korinish"), "Doska yoki jadval", "Доска или таблица", "Bir ro'yxat ikki ko'rinishda. Jadvalda ishlarni bosqich bo'yicha saralash mumkin.",
        "Один список в двух видах. В таблице дела можно отсортировать по этапу."),
      Q("ish.html?id={birinchiIsh}", S("keyingi-amal"), "Keyingi qadam", "Следующий шаг", "Ish varaqasida bosqichga mos bitta tugma turadi: da'vo tayyorlash, qaror kiritish, ijroga topshirish yoki balansga qabul.",
        "В карточке дела одна кнопка по этапу: подготовить иск, внести решение, передать на исполнение или принять на баланс."),
      Q("ish.html?id={birinchiIsh}", S("majlis"), "Sud majlislari", "Судебные заседания", "Ish bo'yicha majlislar. Majlis tugagach natijasini kiriting.", "Заседания по делу. После заседания внесите результат."),
      Q("sud-kalendar.html", S("hafta"), "Yaqin 7 kun", "Ближайшие 7 дней", "Keyingi hafta majlislari: sana, sud, zal va advokat.", "Заседания на следующую неделю: дата, суд, зал и адвокат."),
      Q("davo-tayyorlash.html", S("forma"), "Da'vo tayyorlash", "Подготовка иска", "Qarz, garov va shartnoma ishdan olinadi. «Da'voni ro'yxatga olish» ishni keyingi bosqichga o'tkazadi.",
        "Долг, залог и договор берутся из дела. «Da'voni ro'yxatga olish» переводит дело на следующий этап."),
    ],
  },

  "buxgalteriya-tanishuv": {
    rol: ["buxgalteriya"], birinchi: true, rejim: "sayohat",
    sarlavha: T("Buxgalteriya va risk ish joyi bilan tanishuv", "Знакомство с рабочим местом бухгалтерии и рисков"),
    tavsif: T("Zaxira, soliq va MB oylik hisoboti. 2 daqiqa", "Резерв, налог и ежемесячный отчёт ЦБ. 2 минуты"),
    qadamlar: [
      Q("zaxira.html", S("kpi"), "Zaxira yuki", "Резервная нагрузка", "«Taxminiy» belgisi stavka hali tasdiqlanmaganini bildiradi. Tasdiqlangan raqam belgisiz bo'ladi.",
        "Отметка «Taxminiy» означает, что ставка ещё не утверждена. Утверждённая цифра — без отметки."),
      Q("zaxira.html", S("stavka"), "Zaxira stavkalari", "Ставки резерва", "Oraliq stavkani siz taklif qilasiz va «Tasdiqqa yuborish»ni bosasiz. Rahbariyat tasdiqlaguncha stavka taxminiy.",
        "Промежуточную ставку предлагаете вы и нажимаете «Tasdiqqa yuborish». До утверждения Руководством ставка предварительная."),
      Q("soliq.html", S("kpi"), "Mol-mulk solig'i", "Налог на имущество", "Chorak bo'yicha soliq, to'lanmaganlar va imtiyozi 30 kunda tugaydiganlar.", "Налог за квартал, неоплаченные и активы, у которых льгота заканчивается через 30 дней."),
      Q("hisobot-mb.html", S("hisobot"), "MB oylik hisoboti", "Ежемесячный отчёт ЦБ", "Oyni tanlang. Raqamlar reyestrdan olinadi, 1-darajali kapital kiritilsa nisbat hisoblanadi.",
        "Выберите месяц. Цифры берутся из реестра, при внесённом капитале первого уровня считается отношение."),
      Q("hisobot-mb.html", S("muddat"), "Topshirish muddati", "Срок сдачи", "Har oyning 10-sanasigacha. Topshirgach «Topshirildi deb belgilash»ni bosing.", "До 10-го числа каждого месяца. После сдачи нажмите «Topshirildi deb belgilash»."),
      Q("hisobot-xarajat.html", S("filtr"), "Saqlash xarajatlari", "Расходы на содержание", "Davr, filial va toifa bo'yicha. CSV faqat ko'rinib turgan ustunlarni oladi.", "По периоду, филиалу и категории. CSV выгружает только видимые столбцы."),
    ],
  },

  "xavfsizlik-tanishuv": {
    rol: ["xavfsizlik"], birinchi: true, rejim: "sayohat",
    sarlavha: T("Monitoring markazi bilan tanishuv", "Знакомство с центром мониторинга"),
    tavsif: T("Qurilmalar, signallar, hodisalar va ruxsatlar. 2 daqiqa", "Устройства, сигналы, инциденты и допуски. 2 минуты"),
    qadamlar: [
      Q("himoya.html", S("holat-xarita"), "Qurilmalar holati", "Состояние устройств", "Aloqadagi qurilmalar, 24 soatdan ortiq jimlar, batareyasi pastlar va qo'riqlanmayotgan obyektlar.",
        "Устройства на связи, молчащие больше 24 часов, с низким зарядом и объекты без охраны."),
      Q("himoya.html", S("signal-navbat"), "So'nggi signallar", "Последние сигналы", "Qurilma va kirish signallari vaqt bo'yicha. Jiddiy signal bo'lsa, hodisa oching.", "Сигналы устройств и доступа по времени. Если сигнал серьёзный, откройте инцидент."),
      Q("himoya.html", S("yangilandi"), "Yangilandi", "Обновлено", "Ma'lumot qachon olingani. Tizim jonli video ko'rsatmaydi, faqat qurilmaning oxirgi signal vaqtini.",
        "Когда получены данные. Система не показывает живое видео, только время последнего сигнала устройства."),
      Q("hodisalar.html", S("doska"), "Hodisalar doskasi", "Доска инцидентов", "Yangi, Tekshiruvda, Bartaraf etilmoqda, Hal qilindi, Yopildi. Hal qilish va yopishda chora majburiy yoziladi.",
        "Новые, на проверке, устраняются, решены, закрыты. При решении и закрытии меры описываются обязательно."),
      Q("qurilmalar.html", S("holat"), "Qurilmalar", "Устройства", "Batareyasi 20% dan past va uzoq jim qurilmalar. Ularga servis topshirig'i bering.", "Устройства с зарядом ниже 20% и долго молчащие. Оформите им сервисное задание."),
      Q("ruxsatlar.html", R("ruxsatlar-kpi"), "Ruxsatlar", "Допуски", "Kimga qaysi obyektga kirish ruxsati berilgan. 7 kunda tugaydiganlarni uzaytiring yoki to'xtating.",
        "Кому выдан допуск и на какой объект. Истекающие через 7 дней продлите или остановите."),
      Q("kirish-voqealari.html", R("kirish-voqealari-filtr"), "Signallar va voqealar", "Сигналы и события", "Qurilmadan kelgan yozuv o'zgartirilmaydi. Voqeani ochib, operator qarorini qo'shasiz.",
        "Запись от устройства не меняется. Откройте событие и добавьте решение оператора."),
    ],
  },

  /* ======================= Vazifalar bo'yicha sayohatlar ======================= */
  "balansga-qabul": {
    rol: ["obyekt", "filial", "yurist", "admin"], rejim: "sayohat",
    sarlavha: T("Balansga qabul", "Приём на баланс"),
    tavsif: T("Aktivni bank balansiga uch qadamda olish", "Приём актива на баланс банка в три шага"),
    qadamlar: [
      Q("panel-obyekt.html", S("qabul-navbati"), "Qabul navbati", "Очередь приёма", "Undiruvdan kelgan garov shu yerda kutadi. «Qabul qilish» formani ish ma'lumoti bilan ochadi.", "Залог из дела о взыскании ждёт здесь. «Qabul qilish» открывает форму с данными дела."),
      Q("qabul-boshlash.html", S("qadamlar"), "Uch qadam", "Три шага", "1 — asos va obyekt, 2 — hujjatlar, komissiya va hisoblagichlar, 3 — balans qiymati. Qoralama har bir o'zgarishda saqlanadi.",
        "1 — основание и объект, 2 — документы, комиссия и счётчики, 3 — балансовая стоимость. Черновик сохраняется при каждом изменении."),
      Q("qabul-boshlash.html", S("manba"), "Nima qabul qilinadi", "Что принимается", "Yangi obyekt, undiruv ishidan yoki reyestrdagi dalolatnomasiz obyekt. Undiruvdan kelganda asos va sud qarori ishdan olinadi.",
        "Новый объект, из дела о взыскании или объект из реестра без акта. Для взыскания основание и решение суда берутся из дела."),
      Q("qabul-boshlash.html", S("asos"), "Qabul asosi", "Основание приёма", "Asos umidsiz toifagacha muddatni belgilaydi: sud qarori — 1 yil, ixtiyoriy topshirish — 3 yil. Hujjat raqami va sanasini yozing.",
        "Основание задаёт срок до безнадёжной категории: решение суда — 1 год, добровольная передача — 3 года. Укажите номер и дату документа."),
      Q("qabul-boshlash.html", S("davom"), "Davom etish", "Продолжить", "Tugma maydonlarni tekshiradi. Keyin hujjat va komissiya, oxirida «Balansga qabul qilish» tasdiqlash oynasi bilan. Qabuldan keyin 72 soatlik ko'rik vazifasi ochiladi.",
        "Кнопка проверяет поля. Затем документы и комиссия, в конце — «Balansga qabul qilish» с окном подтверждения. После приёма открывается задача осмотра за 72 часа."),
      Q("rasmiylashtirish.html", S("kpi"), "Keyin: huquqni rasmiylashtirish", "Далее: оформление права", "Qabul qilingan obyekt shu navbatga tushadi. Transport 10 kun ichida YHXXda qayta qayd etiladi.",
        "Принятый объект попадает в эту очередь. Транспорт перерегистрируется в ГУБДД в течение 10 дней."),
    ],
  },

  "obyekt-kartochkasi": {
    rol: "hammasi", rejim: "sayohat",
    sarlavha: T("Obyekt kartochkasi", "Карточка объекта"),
    tavsif: T("Aktiv haqida hamma narsa bir ekranda", "Всё об активе на одном экране"),
    qadamlar: [
      Q("obyektlar.html", S("jadval"), "Reyestrdan tanlash", "Выбор в реестре", "Obyektni qidiruv yoki filtr bilan toping va qatorni bosing: kartochka ochiladi.", "Найдите объект поиском или фильтром и нажмите на строку: откроется карточка."),
      Q(OBYEKT, S("shapka"), "Shapka", "Шапка", "Nomi, raqami, holati, turi va nazorat indeksi. Raqamni hujjatlarda shu ko'rinishda yozing.", "Название, номер, статус, тип и индекс контроля. В документах пишите номер в таком виде."),
      Q(OBYEKT, S("tablar"), "Tablar", "Вкладки", "Har tab bitta mavzu: suratlar, moliya, hujjatlar, ko'riklar, xarajatlar, kommunal, himoya, sotuv, tarix.", "Каждая вкладка — одна тема: фото, финансы, документы, осмотры, расходы, коммунальные, охрана, продажа, история."),
      Q(OBYEKT, S("keyingi-amal"), "Keyingi qadam", "Следующий шаг", "Tizim eng muhim ishni aytadi va tugma bilan o'sha joyga olib boradi.", "Система называет самое важное дело и кнопкой ведёт к нему."),
      Q(OBYEKT, S("yol"), "Aktiv yo'li", "Путь актива", "Yetti bosqich: qabul, rasmiylashtirish, baholash, sotuvga tayyorlash, lot, shartnoma, chiqim. Har o'tish sanasi bilan.",
        "Семь этапов: приём, оформление, оценка, подготовка к продаже, лот, договор, выбытие. Каждый переход с датой."),
      Q(OBYEKT, S("muddat-lenta"), "Me'yoriy muddatlar", "Нормативные сроки", "Balansda necha kun, umidsizgacha qancha kun va 3 yil chegarasi.", "Сколько дней на балансе, сколько до безнадёжной категории и порог 3 лет."),
      Q(OBYEKT, S("holat"), "Joriy holat", "Текущее состояние", "Qo'riqlash, qurilmalar, sug'urta va realizatsiya bir qarashda.", "Охрана, устройства, страховка и реализация с одного взгляда."),
      Q(OBYEKT, S("indeks"), "Nazorat indeksi", "Индекс контроля", "0 dan 100 gacha. Ko'rik 25%, sug'urta 25%, baho 20%, hujjatlar 15%, qo'riqlash 15%. Past band qizil bilan ajratiladi.",
        "От 0 до 100. Осмотр 25%, страховка 25%, оценка 20%, документы 15%, охрана 15%. Слабый пункт выделен красным."),
      Q(OBYEKT, S("pasport"), "Pasport", "Паспорт", "Aktivning bir varaqli pasporti chop etish uchun.", "Паспорт актива на одном листе для печати."),
    ],
  },

  "korik-otkazish": {
    rol: ["nazorat", "obyekt", "filial", "admin"], rejim: "sayohat",
    sarlavha: T("Ko'rik o'tkazish", "Проведение осмотра"),
    tavsif: T("Rejadan dalolatnomagacha", "От плана до акта"),
    qadamlar: [
      Q("panel-nazorat.html", S("bugun-koriklar"), "Ko'rik navbati", "Очередь осмотров", "Kechikkan va bugungi ko'riklar tepada. «Ko'rikni boshlash» eng shoshilinchini ochadi.", "Просроченные и сегодняшние осмотры сверху. «Ko'rikni boshlash» открывает самый срочный."),
      Q("korik-rejasi.html", S("jadval"), "Rejadan tanlash", "Выбор из плана", "Ko'rikni rejadan tanlab «O'tkazish»ni bosing.", "Выберите осмотр в плане и нажмите «O'tkazish»."),
      Q(REJADAGI_KORIK, S("chek-list"), "Nazorat bandlari", "Контрольные пункты", "Har bandni belgilang: Joyida, Kamchilik yoki Tekshirilmadi. Hammasi joyida bo'lsa, «Barchasi joyida» bir bosishda belgilaydi.",
        "Отметьте каждый пункт: на месте, недостаток или не проверен. Если всё в порядке, «Barchasi joyida» отметит всё одним нажатием."),
      Q(REJADAGI_KORIK, S("surat"), "Suratlar va joylashuv", "Фото и местоположение", "Kamchilik belgilansa, har biriga surat kerak. «Aniqlash» ko'rik obyektda o'tkazilganini tasdiqlaydi.",
        "Если отмечен недостаток, к каждому нужно фото. «Aniqlash» подтверждает, что осмотр прошёл на объекте."),
      Q(REJADAGI_KORIK, S("yakunlash"), "Dalolatnomani yakunlash", "Завершить акт", "Tizim suratlarni tekshiradi va tasdiqlash oynasini ochadi. Baho 2 yoki 1 bo'lsa, hodisa o'zi ochiladi. Aloqa uzilsa ham qoralama shu qurilmada qoladi.",
        "Система проверяет фото и открывает окно подтверждения. При оценке 2 или 1 инцидент открывается сам. Даже при обрыве связи черновик остаётся на устройстве."),
    ],
  },

  "inventarizatsiya": {
    rol: ["nazorat", "obyekt", "filial", "admin"], rejim: "sayohat",
    sarlavha: T("Inventarizatsiya", "Инвентаризация"),
    tavsif: T("Ko'char mulkni sanash va dalolatnoma", "Пересчёт движимого имущества и акт"),
    qadamlar: [
      Q("inventarizatsiya.html", S("kpi"), "Qamrov", "Охват", "Nechta birlik bor, nechtasiga raqam berilgan va nechtasi 12 oyda sanalmagan.", "Сколько единиц, скольким присвоен номер и сколько не пересчитано за 12 месяцев."),
      Q("inventarizatsiya.html", S("boshlash"), "Yangi inventarizatsiya", "Новая инвентаризация", "Tur, sana, obyektlar va komissiyani tanlab rejani saqlang.", "Выберите вид, дату, объекты и комиссию и сохраните план."),
      Q("inventarizatsiya.html", S("sanash"), "Sanashni boshlash", "Начать пересчёт", "Birliklar ro'yxati ochiladi. Inventar raqamini yozing yoki kamera bilan QR yorliqni o'qing.", "Открывается список единиц. Введите инвентарный номер или считайте QR-этикетку камерой."),
      Q("inventarizatsiya.html", S("royxat"), "Inventarizatsiyalar", "Инвентаризации", "Har birida sanalgan, kamomad va ortiqcha. Yakunlangani uchun dalolatnoma ochiladi.", "У каждой — пересчитано, недостача и излишек. Для завершённой открывается акт."),
      Q("inventarizatsiya.html", S("jadval"), "Inventar ro'yxati", "Инвентарный список", "«QR yorliqlar» chop etish uchun. Topilmagan birlik kamomad bo'lib dalolatnomaga kiradi va hodisa ochiladi.",
        "«QR yorliqlar» — для печати. Ненайденная единица попадает в акт как недостача, открывается инцидент."),
    ],
  },

  "himoya-qurilma": {
    rol: ["xavfsizlik", "obyekt", "filial", "nazorat", "admin"], rejim: "sayohat",
    sarlavha: T("Himoya komplekti va qurilma o'rnatish", "Комплект охраны и установка устройства"),
    tavsif: T("Smetadan qurilmani ro'yxatga olishgacha", "От сметы до регистрации устройства"),
    qadamlar: [
      Q("obyekt-himoya.html?id={birinchiObyekt}", S("smeta"), "Himoya komplekti", "Комплект охраны", "Obyekt turiga mos komplekt va taxminiy narx. Narx katalogdan, aniq summa yetkazib beruvchi taklifida.",
        "Комплект по типу объекта и примерная цена. Цена из каталога, точная сумма — в предложении поставщика."),
      Q("obyekt-himoya.html?id={birinchiObyekt}", S("qurilmalar"), "O'rnatilgan qurilmalar", "Установленные устройства", "Har qurilmaning aloqasi va batareyasi. «Onlayn» faqat haqiqiy signal bo'lsa yoziladi.", "Связь и заряд каждого устройства. «Onlayn» пишется только при реальном сигнале."),
      Q("obyekt-himoya.html?id={birinchiObyekt}", S("ornatish"), "Qurilma o'rnatish", "Установить устройство", "Tugma o'rnatish formasini shu obyekt bilan ochadi.", "Кнопка открывает форму установки с этим объектом."),
      Q("qurilma-ornatish.html", R("qurilma-ornatish-forma"), "O'rnatish formasi", "Форма установки", "Joy, qurilma turi va modeli, quvvat, aloqa va o'rnatish sanasi.", "Место, тип и модель устройства, питание, связь и дата установки."),
      Q("qurilma-ornatish.html", R("qurilma-ornatish-xulosa"), "Xulosa", "Итог", "Kiritganingiz shu yerda yig'iladi. Obyekt va kirish nuqtasini tekshiring.", "Здесь сводится всё введённое. Проверьте объект и точку входа."),
      Q("qurilma-ornatish.html", R("qurilma-ornatish-saqlash"), "Ro'yxatga olish", "Зарегистрировать", "Qurilma saqlanadi va uning sahifasi ochiladi. Obyekt himoyada hisoblanadi.", "Устройство сохраняется, открывается его страница. Объект считается под охраной."),
    ],
  },

  "hodisa-hal-qilish": {
    rol: ["xavfsizlik", "nazorat", "obyekt", "filial", "admin"], rejim: "sayohat",
    sarlavha: T("Hodisani hal qilish", "Решение инцидента"),
    tavsif: T("Qayd etishdan yopishgacha", "От регистрации до закрытия"),
    qadamlar: [
      Q("hodisalar.html", S("qayd"), "Hodisa qayd etish", "Регистрация инцидента", "Obyekt, tur, jiddiylik va tavsif. Hodisa «Yangi» ustuniga tushadi.", "Объект, тип, важность и описание. Инцидент попадает в колонку «Yangi»."),
      Q("hodisalar.html", S("doska"), "Doska", "Доска", "Ustunlar hodisa bosqichlari. Bosqichlar ketma-ket o'tkaziladi.", "Колонки — этапы инцидента. Этапы проходятся по порядку."),
      Q(OCHIQ_HODISA, S("bosqich"), "Bosqichlar", "Этапы", "Yangi → Tekshiruvda → Bartaraf etilmoqda → Hal qilindi → Yopildi.", "Новый → на проверке → устраняется → решён → закрыт."),
      Q(OCHIQ_HODISA, R("hodisa-keyingi"), "Keyingi bosqich tugmasi", "Кнопка следующего этапа", "«Qabul qilish» hodisani tekshiruvga oladi, mas'ul bo'lmasa siz mas'ul bo'lasiz. 8 soniya ichida qaytarish mumkin.",
        "«Qabul qilish» берёт инцидент на проверку; если ответственного нет, им становитесь вы. Отменить можно в течение 8 секунд."),
      Q(OCHIQ_HODISA, S("masul"), "Mas'ul", "Ответственный", "«Almashtirish» mas'ulni o'zgartiradi, yangi mas'ulga bildirishnoma ketadi.", "«Almashtirish» меняет ответственного, новому ответственному уходит уведомление."),
      Q(OCHIQ_HODISA, S("chora"), "Ko'rilgan chora", "Принятые меры", "Nima qilinganini yozing. Hal qilish va yopishda chora majburiy, kamida 5 belgi.", "Опишите, что сделано. При решении и закрытии меры обязательны, не меньше 5 символов."),
      Q(OCHIQ_HODISA, R("hodisa-dalillar"), "Dalillar", "Доказательства", "Surat, dalolatnoma yoki IIB arizasi nusxasini yuklang. Zarar bo'lsa, sug'urta da'vosini shu varaqadan oching.",
        "Загрузите фото, акт или копию заявления в ОВД. Если есть ущерб, откройте страховое требование из этой карточки."),
    ],
  },

  "eshik-ochish": {
    rol: ["xavfsizlik", "nazorat", "obyekt", "filial", "admin"], rejim: "sayohat",
    sarlavha: T("Eshikni masofadan ochish", "Удалённое открытие двери"),
    tavsif: T("Ruxsatni tekshirish, asos va jurnal", "Проверка допуска, основание и журнал"),
    qadamlar: [
      Q(QULF, S("holat"), "Qurilma holati", "Состояние устройства", "Oxirgi signal, aloqa va batareya. Qulf jim bo'lsa, masofadan qaror bermang.", "Последний сигнал, связь и заряд. Если замок молчит, не принимайте решение удалённо."),
      Q(QULF, S("masofadan"), "Masofadan ochish", "Удалённое открытие", "Uch qadam: eshik oldini ko'rish, kim kiradi, qaror. Qulf tizimga ulanmagan: tizim relega buyruq yubormaydi, eshikni joyidagi xodim ochadi.",
        "Три шага: осмотр входа, кто входит, решение. Замок не подключён к системе: она не отправляет команду на реле, дверь открывает сотрудник на месте."),
      Q(QULF, R("qurilma-ochish"), "Tasdiqlash bosqichi", "Шаг подтверждения", "Shaxsda amaldagi ruxsat bo'lmasa, tizim to'xtatadi. Tasdiqlash oynasida obyekt, qurilma, eshik va shaxs ko'rinadi, asos majburiy. Qaror ismingiz bilan jurnalga yoziladi.",
        "Если у человека нет действующего допуска, система остановит. В окне подтверждения видны объект, устройство, дверь и человек, основание обязательно. Решение пишется в журнал с вашим именем."),
      Q(QULF, S("jurnal"), "Voqealar jurnali", "Журнал событий", "Kim, qachon, qaysi usul bilan kirgan yoki rad etilgan. Yozuv o'chirilmaydi.", "Кто, когда и каким способом вошёл или получил отказ. Запись не удаляется."),
      Q("ruxsatlar.html", R("ruxsatlar-berish"), "Ruxsat berish", "Выдать допуск", "Ruxsati yo'q shaxs uchun avval shu yerda ruxsat bering: shaxs, obyekt, usul va muddat.", "Человеку без допуска сначала выдайте его здесь: человек, объект, способ и срок."),
    ],
  },

  "lot-chiqarish": {
    rol: ["realizatsiya", "admin"], rejim: "sayohat",
    sarlavha: T("Lot chiqarish", "Выставление лота"),
    tavsif: T("Lot yaratish, e'lon, savdo va g'olib", "Создание лота, объявление, торги и победитель"),
    qadamlar: [
      Q("lotlar.html", S("kpi"), "Lotlar holati", "Статус лотов", "Tayyorlanmoqda, E'lon qilingan, Savdo o'tkazilmagan va Sotildi.", "Готовится, опубликован, торги не состоялись и продан."),
      Q("lotlar.html", S("yaratish"), "Lot yaratish", "Создать лот", "Aktiv, usul, boshlang'ich narx, zakalat va sanalar. Baholanmagan aktivga lot yaratilmaydi.", "Актив, способ, начальная цена, задаток и даты. Для неоценённого актива лот не создаётся."),
      Q(ELON_LOT, S("bosqichlar"), "Lot bosqichlari", "Этапы лота", "Tayyorlash, E'lon, Savdo, G'olib, Sotildi. Har bosqich sanasi bilan.", "Подготовка, объявление, торги, победитель, продан. Каждый этап с датой."),
      Q(ELON_LOT, S("muddatlar"), "VM 18 muddatlari", "Сроки ПКМ 18", "E'londan savdogacha kamida 30 kun. 3 oy sotilmasa narx Rahbariyat qarori bilan pasaytiriladi.", "От объявления до торгов не меньше 30 дней. Если лот не продан 3 месяца, цена снижается решением Руководства."),
      Q(ELON_LOT, S("amallar"), "Boshqa amallar", "Другие действия", "E'lon qilish, Savdo o'tkazilmadi, Narxni pasaytirish, Lotni bekor qilish. Har biri tasdiqlash oynasi bilan.",
        "Опубликовать, торги не состоялись, снизить цену, отменить лот. Каждое — с окном подтверждения."),
      Q(ELON_LOT, S("golib"), "G'olib taklifini kiritish", "Внести предложение победителя", "G'olib va yakuniy narx. G'olib 5 ish kunida to'laydi, shartnoma 10 ish kunida tuziladi.",
        "Победитель и итоговая цена. Победитель платит в течение 5 рабочих дней, договор — в течение 10 рабочих дней."),
    ],
  },

  "taklif-tasdiqlash": {
    rol: ["realizatsiya", "rahbariyat", "admin"], rejim: "sayohat",
    sarlavha: T("Taklifni tasdiqlash", "Утверждение предложения"),
    tavsif: T("Xaridor taklifidan shartnomagacha", "От предложения покупателя до договора"),
    qadamlar: [
      Q("takliflar.html", S("kpi"), "Takliflar holati", "Статус предложений", "Yangi, qarorda, tasdiqlangan lekin shartnomasiz va AML tekshiruvidagilar.", "Новые, на решении, утверждённые без договора и на проверке ПОД/ФТ."),
      Q("takliflar.html", S("korinish"), "Qaror kutilmoqda", "Ожидают решения", "Bu ko'rinish Rahbariyatga yuborilgan takliflarni ko'rsatadi. Taklifni yuborgan xodim uni tasdiqlay olmaydi.",
        "Это представление показывает предложения, отправленные Руководству. Отправивший сотрудник не может их утвердить."),
      Q("tasdiqlar.html", S("qaror-karta"), "Qarorlar ro'yxati", "Список решений", "Taklif summasi, xaridor, muallif va javob muddati.", "Сумма предложения, покупатель, автор и срок ответа."),
      Q("tasdiqlar.html", S("qaror-karta"), "Qarorni oching", "Откройте решение", "Qatorni bosing: tafsilot o'ng tomonda ochiladi. Keyin «Keyingi» tugmasini bosing.",
        "Нажмите на строку: подробности откроются справа. Затем нажмите «Keyingi».", {amal: {tur: "bos"}, kutish: S("nima-ozgaradi")}),
      Q("tasdiqlar.html", S("nima-ozgaradi"), "Nima o'zgaradi", "Что изменится", "Tasdiqlagach lot va taklif holati qanday o'zgarishi oldin va keyin ko'rinishida.", "Как изменится статус лота и предложения после утверждения — в виде «до и после»."),
      Q("tasdiqlar.html", ".yon-panel .ts-izoh:not(.xavf):not(.yashil)", "Tasdiqlansa nima bo'ladi", "Что будет после утверждения", "Qaror qabul qilingach qaysi yozuvlar o'zgarishi va kimga vazifa ketishi shu yerda yozilgan.",
        "Здесь написано, какие записи изменятся после решения и кому уйдёт задача."),
      Q("tasdiqlar.html", S("tasdiqlash"), "Tasdiqlash", "Утвердить", "Tasdiqlash oynasi o'zgarishlarni yana bir bor ko'rsatadi. Keyin realizatsiya mutaxassisi 10 ish kunida shartnoma tuzadi.",
        "Окно подтверждения ещё раз показывает изменения. Затем специалист по реализации заключает договор в течение 10 рабочих дней."),
      Q("tasdiqlar.html", S("rad"), "Rad etish", "Отклонить", "Sabab majburiy, u muallifga ko'rinadi.", "Причина обязательна, её увидит автор."),
    ],
  },

  "zaxira-muddatlar": {
    rol: ["buxgalteriya", "rahbariyat", "filial", "admin"], rejim: "sayohat",
    sarlavha: T("Zaxira va muddatlar", "Резерв и сроки"),
    tavsif: T("Umidsiz toifa chegarasi va zaxira stavkalari", "Порог безнадёжной категории и ставки резерва"),
    qadamlar: [
      Q("muddatlar.html", S("otish"), "Umidsiz toifaga o'tadi", "Перейдут в безнадёжную категорию", "30, 60 va 90 kun ichida chegaraga yetadigan aktivlar. Chegaradan keyin zaxira 100%.", "Активы, которые достигнут порога за 30, 60 и 90 дней. После порога резерв 100%."),
      Q("muddatlar.html", S("jadval"), "Obyektlar muddati", "Сроки объектов", "Qabul sanasi, chegara sanasi va qolgan kun har aktiv uchun.", "Дата приёма, дата порога и оставшиеся дни по каждому активу."),
      Q("muddatlar.html", S("qoidalar"), "Hisob qoidalari", "Правила расчёта", "Undiruvdan olingan mulk 365 kun, boshqa mulk 1095 kun, soliq imtiyozi 6 oy.", "Имущество из взыскания — 365 дней, прочее — 1095 дней, налоговая льгота — 6 месяцев."),
      Q("zaxira.html", S("kpi"), "Zaxira yuki", "Резервная нагрузка", "Balans qiymatiga nisbatan zaxira. «Taxminiy» — stavka hali tasdiqlanmagan.", "Резерв относительно балансовой стоимости. «Taxminiy» — ставка ещё не утверждена."),
      Q("zaxira.html", S("stavka"), "Stavkalar", "Ставки", "Buxgalteriya oraliq stavkani taklif qiladi, Rahbariyat tasdiqlaydi. Taklif qilgan xodim o'zi tasdiqlay olmaydi.",
        "Бухгалтерия предлагает промежуточную ставку, Руководство утверждает. Предложивший сотрудник не может утвердить сам."),
    ],
  },

  "mb-hisobot": {
    rol: ["buxgalteriya", "rahbariyat", "admin"], rejim: "sayohat",
    sarlavha: T("MB oylik hisoboti", "Ежемесячный отчёт ЦБ"),
    tavsif: T("Raqamlarni tekshirish va topshirilgan deb belgilash", "Проверка цифр и отметка о сдаче"),
    qadamlar: [
      Q("hisobotlar.html", S("mb"), "Majburiy hisobot", "Обязательный отчёт", "Hisobotlar markazida MB hisoboti tepada, topshirish muddati bilan.", "В центре отчётности отчёт ЦБ стоит сверху, со сроком сдачи."),
      Q("hisobot-mb.html", S("hisobot"), "Davr va raqamlar", "Период и цифры", "Tepada oyni tanlang: joriy oy dastlabki, oy yopilgach raqamlar yakuniy. Obyektlar soni, balans qiymati, kapitalga nisbat va umidsiz toifa reyestrdan olinadi.",
        "Вверху выберите месяц: текущий — предварительный, после закрытия месяца цифры окончательные. Число объектов, балансовая стоимость, отношение к капиталу и безнадёжная категория берутся из реестра."),
      Q("hisobot-mb.html", S("kapital"), "Kapitalni kiritish", "Внести капитал", "1-darajali kapitalsiz nisbat bo'sh qoladi. Avval kapitalni kiriting.", "Без капитала первого уровня отношение пустое. Сначала внесите капитал."),
      Q("hisobot-mb.html", S("muddat"), "Topshirish", "Сдача", "Muddat — har oyning 10-sanasi. Topshirgach «Topshirildi deb belgilash»: oynada davr va raqamlar ko'rinadi, xato bo'lsa «Belgini bekor qilish».",
        "Срок — 10-е число каждого месяца. После сдачи — «Topshirildi deb belgilash»: в окне видны период и цифры, при ошибке — «Belgini bekor qilish»."),
      Q("hisobot-mb.html", S("tarix"), "Hisobotlar tarixi", "История отчётов", "Qaysi oy qachon topshirilgani va o'z vaqtida bo'lganmi.", "Какой месяц когда сдан и вовремя ли."),
    ],
  },

  /* Qaror qabul qiladigan rollar: admin va tasdiq huquqi borlar (tasdiqlar.html dagi qarorQiladi bilan bir xil) */
  "tasdiqlar-maker-checker": {
    rol: ["rahbariyat", "filial", "buxgalteriya", "admin"], rejim: "sayohat",
    sarlavha: T("Qarorlar va to'rt ko'z qoidasi", "Решения и принцип четырёх глаз"),
    tavsif: T("Bir xodim so'raydi, boshqasi tasdiqlaydi", "Один сотрудник запрашивает, другой утверждает"),
    qadamlar: [
      Q("tasdiqlar.html", S("korinish"), "Uch ko'rinish", "Три представления", "«Mendan kutilmoqda», «Men yuborganlar», «Hal qilinganlar». Tanlovingiz eslab qolinadi.", "«Mendan kutilmoqda», «Men yuborganlar», «Hal qilinganlar». Ваш выбор запоминается."),
      Q("tasdiqlar.html", S("filtr"), "Turi", "Тип", "Xaridor taklifi, narx pasaytirish, baholash natijasi, balansga qabul, balansdan chiqarish, zaxira stavkasi.", "Предложение покупателя, снижение цены, результат оценки, приём на баланс, списание, ставка резерва."),
      Q("tasdiqlar.html", S("orinbosar"), "O'rinbosar", "Заместитель", "Ta'til vaqtida qarorni o'rinbosar qabul qiladi.", "На время отпуска решения принимает заместитель."),
      Q("tasdiqlar.html", S("qaror-karta"), "Qarorlar ro'yxati", "Список решений", "Muallif, summa va javob muddati: o'tgan bo'lsa qizil, 1 ish kuni qolsa sariq. Katakchalar bilan bir turdagi so'rovlarni birdan tasdiqlash mumkin, balansdan chiqarish bundan mustasno.",
        "Автор, сумма и срок ответа: красный, если прошёл, жёлтый, если остался 1 рабочий день. Флажками можно утвердить однотипные запросы сразу, кроме списания."),
      Q("tasdiqlar.html", S("qaror-karta"), "Qarorni oching", "Откройте решение", "Qatorni bosing: qaror tafsiloti o'ng tomonda ochiladi. Keyin «Keyingi» tugmasini bosing.",
        "Нажмите на строку: подробности решения откроются справа. Затем нажмите «Keyingi».", {amal: {tur: "bos"}, kutish: S("nima-ozgaradi")}),
      Q("tasdiqlar.html", S("nima-ozgaradi"), "Nima o'zgaradi", "Что изменится", "Qiymat, narx yoki holat oldin va keyin. O'z so'rovingizda tugmalar o'rniga «Siz yuborgansiz. Boshqa xodim tasdiqlaydi» yozuvi turadi.",
        "Стоимость, цена или статус до и после. В своём запросе вместо кнопок написано «Siz yuborgansiz. Boshqa xodim tasdiqlaydi»."),
      Q("tasdiqlar.html", ".yon-panel .ts-izoh:not(.xavf):not(.yashil)", "Tasdiqlansa nima bo'ladi", "Что будет после утверждения", "Qaror qabul qilingach qaysi yozuvlar o'zgarishi va kimga vazifa ketishi shu yerda yozilgan.",
        "Здесь написано, какие записи изменятся после решения и кому уйдёт задача."),
      Q("tasdiqlar.html", S("tasdiqlash"), "Tasdiqlash", "Утвердить", "Oyna o'zgarishlarni takrorlaydi. Balansdan chiqarishda obyekt raqamini yozib tasdiqlaysiz.", "Окно повторяет изменения. Для списания нужно ввести номер объекта."),
      Q("tasdiqlar.html", S("rad"), "Rad etish", "Отклонить", "Sabab majburiy, kamida 5 belgi.", "Причина обязательна, не меньше 5 символов."),
    ],
  },

  /* Qaror qabul qilmaydigan rollar: «Mendan kutilmoqda» ro'yxati ularda bo'sh, shuning uchun alohida qisqa sayohat */
  "tasdiqlar-yuborganlarim": {
    rol: ["obyekt", "nazorat", "baholash", "realizatsiya", "yurist", "xavfsizlik"], rejim: "sayohat",
    sarlavha: T("Yuborgan so'rovlaringiz", "Ваши отправленные запросы"),
    tavsif: T("Qarorni boshqa xodim qabul qiladi, so'rov holati shu sahifada ko'rinadi",
      "Решение принимает другой сотрудник, статус запроса виден на этой странице"),
    qadamlar: [
      Q("tasdiqlar.html", S("korinish"), "Uch ko'rinish", "Три представления",
        "«Mendan kutilmoqda» ro'yxati sizda bo'sh turadi: narx, baholash va balansdan chiqarish bo'yicha qarorni Rahbariyat, filial rahbari yoki buxgalteriya qabul qiladi. O'zingiz yuborgan so'rovlar «Men yuborganlar» da, javob olganlari «Hal qilinganlar» da.",
        "Список «Mendan kutilmoqda» у вас пуст: решения по цене, оценке и списанию с баланса принимают Руководство, руководитель филиала или бухгалтерия. Отправленные вами запросы — в «Men yuborganlar», получившие ответ — в «Hal qilinganlar»."),
      Q("tasdiqlar.html", S("filtr"), "Turi va qidiruv", "Тип и поиск",
        "Turi bo'yicha filtr masalalarni ajratadi. Qidiruv maydoni obyekt nomi, masala turi va so'rov raqami bo'yicha ishlaydi.",
        "Фильтр по типу отбирает вопросы. Поле поиска работает по названию объекта, типу вопроса и номеру запроса."),
      Q("tasdiqlar.html", null, "So'rov holati", "Статус запроса",
        "So'rov yuborilgach «Men yuborganlar» ro'yxatida javob muddati bilan turadi. Qaror chiqqach bildirishnoma keladi va so'rov «Hal qilinganlar» ga o'tadi. O'z so'rovingizni o'zingiz tasdiqlay olmaysiz — to'rt ko'z qoidasi shu.",
        "После отправки запрос стоит в списке «Men yuborganlar» со сроком ответа. После решения приходит уведомление, и запрос переходит в «Hal qilinganlar». Свой запрос утвердить нельзя — в этом и состоит принцип четырёх глаз."),
    ],
  },

  "chiqim": {
    rol: ["obyekt", "filial", "yurist", "admin"], rejim: "sayohat",
    sarlavha: T("Balansdan chiqarish", "Списание с баланса"),
    tavsif: T("So'rov, tasdiq va arxiv", "Запрос, утверждение и архив"),
    qadamlar: [
      Q("arxiv.html", S("tayyor"), "Chiqimga tayyor", "Готовы к выбытию", "To'lovi yopilgan yoki davaktivga o'tkazilgan aktivlar shu yerda.", "Активы с закрытой оплатой или переданные в давактив — здесь."),
      Q("arxiv.html", S("chiqim"), "Balansdan chiqarish", "Списать с баланса", "Tugma chiqim formasini ochadi.", "Кнопка открывает форму выбытия."),
      Q(CHIQIMGA_TAYYOR, S("usul"), "Chiqarish asosi", "Основание выбытия", "Obyekt nomzodlar ro'yxatidan tanlanadi. Usul va sana, shartnoma bo'lsa uning raqami.", "Объект выбирается из списка кандидатов. Способ и дата, при наличии договора — его номер."),
      Q(CHIQIMGA_TAYYOR, S("xulosa"), "Moliyaviy natija", "Финансовый результат", "Tushum, balans qiymati, xarajat va tiklanadigan zaxira. Qo'riqlash shartnomasi va polis chiqim bilan yopiladi.",
        "Выручка, балансовая стоимость, расходы и восстанавливаемый резерв. Договор охраны и полис закрываются вместе с выбытием."),
      Q(CHIQIMGA_TAYYOR, S("yuborish"), "Qaror so'rovini yuborish", "Отправить запрос на решение", "So'rov Rahbariyatga ketadi. Tasdiqlashda obyekt raqami yozib tasdiqlanadi, aktiv arxivga o'tadi.",
        "Запрос уходит Руководству. При утверждении вводится номер объекта, актив переходит в архив."),
    ],
  },

  "undiruv-qabul": {
    rol: ["yurist", "rahbariyat", "obyekt", "admin"], rejim: "sayohat",
    sarlavha: T("Undiruvdan balansga qabul", "Из взыскания на баланс"),
    tavsif: T("Yurist, Rahbariyat va obyekt menejeri o'rtasida garovni topshirish", "Передача залога между юристом, руководством и менеджером по объектам"),
    qadamlar: [
      Q("undiruv.html", S("doska"), "Ijro bosqichi", "Этап исполнения", "«Qaror ijrosi» ustunidagi ishlar balansga qabulga tayyorlanadi.", "Дела в колонке «Qaror ijrosi» готовятся к приёму на баланс."),
      Q("ish.html?id={birinchiIsh}", S("keyingi-amal"), "Rahbariyat qarorini so'rash", "Запросить решение Руководства", "Ijrodagi ishda «Balansga qabul qilish» Rahbariyat qarorini so'raydi. So'rov holati ishda ko'rinadi.",
        "В деле на исполнении «Balansga qabul qilish» запрашивает решение Руководства. Статус запроса виден в деле."),
      Q("tasdiqlar.html", S("qaror-karta"), "Rahbariyat qarori", "Решение Руководства", "«Garovni balansga qabul qilish» so'rovi shu yerda tasdiqlanadi.", "Запрос «Garovni balansga qabul qilish» утверждается здесь."),
      Q("panel-obyekt.html", S("qabul-navbati"), "Obyekt menejeri navbati", "Очередь менеджера по объектам", "Tasdiqlangan garov qabul navbatiga tushadi. «Qabul qilish» formani ish ma'lumoti bilan ochadi.", "Утверждённый залог попадает в очередь приёма. «Qabul qilish» открывает форму с данными дела."),
      Q("qabul-boshlash.html", S("manba"), "Undiruv ishidan", "Из дела о взыскании", "Asos va sud qarori ishdan olinadi, qolgan ikki qadam odatdagidek.", "Основание и решение суда берутся из дела, остальные два шага — как обычно."),
    ],
  },

  /* ======================= Qanday ishlaydi (namoyish) ======================= */
  "qanday-qarorlar": {
    rol: "hammasi", rejim: "namoyish",
    sarlavha: T("Qarorlar sahifasi qanday ishlaydi", "Как работает страница решений"),
    tavsif: T("Ko'rinishlar o'zi almashadi, siz kuzatasiz", "Представления переключаются сами, вы наблюдаете"),
    qadamlar: [
      Q("tasdiqlar.html", S("korinish"), "Ko'rinishlar", "Представления", "Sahifa uchta ro'yxatdan iborat. Hozir ularni navbat bilan ochamiz.", "Страница состоит из трёх списков. Сейчас откроем их по очереди."),
      Q("tasdiqlar.html", '[data-k="yuborgan"]', "Men yuborganlar", "Men yuborganlar", "Siz yuborgan so'rovlar va ularning holati.", "Ваши запросы и их статус.", {amal: {tur: "bos"}}),
      Q("tasdiqlar.html", S("qaror-karta"), "So'rov holati", "Статус запроса", "Kutilmoqda, tasdiqlangan yoki rad etilgan. Rad etilganda sabab ko'rinadi.", "Ожидает, утверждён или отклонён. У отклонённого видна причина."),
      Q("tasdiqlar.html", '[data-k="hal"]', "Hal qilinganlar", "Hal qilinganlar", "Oxirgi 90 kundagi qarorlar: kim, qachon, qanday qaror qildi.", "Решения за последние 90 дней: кто, когда и какое решение принял.", {amal: {tur: "bos"}}),
      Q("tasdiqlar.html", '[data-k="kutilmoqda"]', "Mendan kutilmoqda", "Mendan kutilmoqda", "Asosiy ro'yxatga qaytamiz: bu yerda sizning qaroringiz kerak.", "Возвращаемся к основному списку: здесь нужно ваше решение.", {amal: {tur: "bos"}}),
      Q("tasdiqlar.html", S("qaror-karta"), "Tasdiqlash va rad etish", "Утверждение и отклонение", "Har tasdiqlashda oyna nima o'zgarishini ko'rsatadi. O'z so'rovingizni tasdiqlay olmaysiz.", "При каждом утверждении окно показывает, что изменится. Свой запрос утвердить нельзя."),
    ],
  },

  "qanday-monitoring": {
    rol: ["xavfsizlik", "nazorat", "obyekt", "filial", "rahbariyat", "admin"], rejim: "namoyish",
    sarlavha: T("Monitoring markazi qanday ishlaydi", "Как работает центр мониторинга"),
    tavsif: T("Signal filtrlari o'zi almashadi", "Фильтры сигналов переключаются сами"),
    qadamlar: [
      Q("himoya.html", S("holat-xarita"), "Qurilmalar holati", "Состояние устройств", "Raqamlar qurilmalarning oxirgi qaydidan olinadi. Tizim jonli video ko'rsatmaydi.", "Цифры берутся из последней отметки устройств. Система не показывает живое видео."),
      Q("himoya.html", '[data-lenta="qurilma"]', "Qurilma signallari", "Сигналы устройств", "Faqat qurilma signallari: batareya, aloqa uzilishi, datchik.", "Только сигналы устройств: заряд, обрыв связи, датчик.", {amal: {tur: "bos"}}),
      Q("himoya.html", '[data-lenta="kirish"]', "Kirish signallari", "Сигналы доступа", "Eshik ochilishi va rad etilgan kirishlar.", "Открытия дверей и отклонённые входы.", {amal: {tur: "bos"}}),
      Q("himoya.html", '[data-lenta=""]', "Hammasi", "Все", "Ikkala tur birga, vaqt bo'yicha.", "Оба типа вместе, по времени.", {amal: {tur: "bos"}}),
      Q("himoya.html", S("signal-navbat"), "Signaldan hodisaga", "От сигнала к инциденту", "Jiddiy signalni bossangiz, u haqida batafsil ma'lumot ochiladi, kerak bo'lsa hodisa qayd etasiz.", "Нажмите на серьёзный сигнал, чтобы открыть подробности и при необходимости зарегистрировать инцидент."),
    ],
  },

  "qanday-muddatlar": {
    rol: "hammasi", rejim: "namoyish",
    sarlavha: T("Muddatlar sahifasi qanday ishlaydi", "Как работает страница сроков"),
    tavsif: T("Jadval va oylar ko'rinishi o'zi almashadi", "Таблица и вид по месяцам переключаются сами"),
    qadamlar: [
      Q("muddatlar.html", S("otish"), "Chegaraga yaqinlar", "Близкие к порогу", "30, 60 va 90 kunda umidsiz toifaga o'tadigan aktivlar.", "Активы, которые перейдут в безнадёжную категорию через 30, 60 и 90 дней."),
      Q("muddatlar.html", '[data-kor="kalendar"]', "Oylar bo'yicha", "По месяцам", "Qaysi oyda nechta aktiv chegaraga yetishi.", "Сколько активов достигнет порога в каждом месяце.", {amal: {tur: "bos"}}),
      Q("muddatlar.html", "#kalendar-joy", "Oylar kesimi", "Разрез по месяцам", "Eng og'ir oylarni oldindan ko'rib, sotuvni rejalashtiring.", "Заранее увидьте самые тяжёлые месяцы и планируйте продажу."),
      Q("muddatlar.html", '[data-kor="jadval"]', "Jadval", "Таблица", "Jadvalga qaytamiz: har aktiv alohida qatorda.", "Возвращаемся к таблице: каждый актив в отдельной строке.", {amal: {tur: "bos"}}),
      Q("muddatlar.html", S("qoidalar"), "Hisob qoidalari", "Правила расчёта", "Chegaralar qanday hisoblanishi shu yerda yozilgan.", "Здесь описано, как считаются пороги."),
    ],
  },

  "qanday-obyekt": {
    rol: "hammasi", rejim: "namoyish",
    sarlavha: T("Obyekt kartochkasi qanday ishlaydi", "Как работает карточка объекта"),
    tavsif: T("Kartochka bloklari o'zi yoritiladi", "Блоки карточки подсвечиваются сами"),
    qadamlar: [
      Q(OBYEKT, S("shapka"), "Shapka", "Шапка", "Aktiv nomi, raqami, holati va nazorat indeksi.", "Название, номер, статус и индекс контроля актива."),
      Q(OBYEKT, S("keyingi-amal"), "Keyingi qadam", "Следующий шаг", "Tizim hozir eng muhim ishni aytadi.", "Система называет самое важное дело сейчас."),
      Q(OBYEKT, S("yol"), "Aktiv yo'li", "Путь актива", "Qabuldan chiqimgacha yetti bosqich, joriy bosqich ajratilgan.", "Семь этапов от приёма до выбытия, текущий выделен."),
      Q(OBYEKT, S("muddat-lenta"), "Muddatlar", "Сроки", "Umidsiz toifagacha qolgan kun chiziqda.", "Дни до безнадёжной категории на шкале."),
      Q(OBYEKT, S("indeks"), "Nazorat indeksi", "Индекс контроля", "Beshta band va har birining holati.", "Пять пунктов и состояние каждого."),
    ],
  },
};

if (typeof window.mkbYordamTuzat === "function") window.mkbYordamTuzat();

/* Tor ekranda sayohat kartasi pastki varaq bo'lib turadi. Sahifa oxiridagi nishon (masalan, forma
   oxiridagi tugma) varaq ostida qolmasligi uchun sahifa pastiga vaqtincha joy qo'shiladi va nishon
   varaq ustiga suriladi. Dvigatel scroll hodisasida teshikni o'zi qayta joylaydi. */
(function(){
  if (!window.MutationObserver || !document.documentElement) return;
  let joy = null;
  function tekshir(){
    const k = document.querySelector(".sayohat-karta.varaq");
    const h = document.querySelector(".sayohat-halqa");
    if (!k){ if (joy){ joy.remove(); joy = null; } return; }
    if (!h || h.style.display === "none") return;
    const kr = k.getBoundingClientRect(), hr = h.getBoundingClientRect();
    const kerak = hr.top + Math.min(hr.height, 120) + 16 - kr.top;
    if (kerak <= 0) return;
    if (!joy){ joy = document.createElement("div"); joy.setAttribute("aria-hidden", "true"); joy.className = "sayohat-bosh-joy"; document.body.appendChild(joy); }
    joy.style.height = Math.ceil(kr.height + 24) + "px";
    const yuqori = Math.max(0, hr.top - 16);
    window.scrollBy(0, Math.min(kerak, yuqori));
  }
  let rej = 0;
  const kuz = new MutationObserver(ozg => {
    if (!ozg.some(o => [...o.addedNodes, ...o.removedNodes].some(n => n.nodeType === 1 && /sayohat-/.test(n.className || "")))) return;
    clearTimeout(rej); rej = setTimeout(tekshir, 450);
  });
  const ula = () => kuz.observe(document.body, {childList: true});
  if (document.body) ula(); else document.addEventListener("DOMContentLoaded", ula, {once: true});
})();
})();
