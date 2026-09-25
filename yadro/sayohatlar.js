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
    tavsif: T("Bugungi qarorlar, muddatlar va kengashga hisobot. 2 daqiqa", "Решения на сегодня, сроки и отчёт для правления. 2 минуты"),
    qadamlar: [
      Q("panel.html", S("bugun"), "Bugun", "Сегодня", "Kunni shu blokdan boshlang. To'rt qatorda qaroringizni kutayotgan so'rovlar, kechadan beri muddati o'tgan ishlar, qiymati pasaygan obyektlar va eng katta xavflar turadi. Qatorni bossangiz, ro'yxat ochiladi.",
        "Начинайте день с этого блока. В четырёх строках — запросы, ждущие вашего решения, дела, просроченные со вчера, объекты с упавшей стоимостью и крупнейшие риски. Нажмите на строку, чтобы открыть список."),
      Q("panel.html", S("kpi"), "Asosiy ko'rsatkichlar", "Основные показатели", "Balans qiymati, zaxira yuki, 90 kunda umidsizga o'tadigan aktivlar, yillik reja va oylik saqlash xarajati. Har raqam o'z ro'yxatiga olib boradi.",
        "Балансовая стоимость, резервная нагрузка, активы, которые через 90 дней станут безнадёжными, годовой план и расходы на содержание. Каждая цифра ведёт к своему списку."),
      Q("panel.html", S("xavflar"), "Umidsizga o'tish arafasida", "На пороге безнадёжной категории", "Chegaraga eng yaqin aktivlar. Umidsiz toifada zaxira 100% bo'ladi, shuning uchun bu aktivlar bo'yicha sotuvni tezlashtirish kerak.",
        "Активы, ближайшие к порогу. В безнадёжной категории резерв 100%, поэтому по ним нужно ускорить продажу."),
      Q("tasdiqlar.html", S("korinish"), "Uch ko'rinish", "Три представления", "«Mendan kutilmoqda» — sizning qaroringiz kerak. «Men yuborganlar» — siz yuborgan so'rovlar. «Hal qilinganlar» — oxirgi 90 kun.",
        "«Mendan kutilmoqda» — нужно ваше решение. «Men yuborganlar» — ваши запросы. «Hal qilinganlar» — последние 90 дней."),
      Q("tasdiqlar.html", S("qaror-karta"), "Qaror kartasi", "Карточка решения", "Har so'rovda summa, muallif va javob muddati bor. So'rovni obyekt menejeri yoki buxgalteriya yuboradi, qarorni siz qabul qilasiz. «Rad etish» uchun sabab yozasiz.",
        "В каждом запросе есть сумма, автор и срок ответа. Запрос отправляет менеджер по объектам или бухгалтерия, решение принимаете вы. Для «Rad etish» нужно написать причину."),
      Q("tasdiqlar.html", S("orinbosar"), "O'rinbosar", "Заместитель", "Ta'tilga chiqsangiz, o'rinbosar tayinlang. Shu davrda qarorni u qabul qiladi, qarorda «o'rinbosar sifatida» deb yoziladi.",
        "Если уходите в отпуск, назначьте заместителя. В этот период решения принимает он, в решении указывается «o'rinbosar sifatida»."),
      Q("korik-kechikkan.html", S("jadval"), "Kechikkan ko'riklar", "Просроченные осмотры", "Muddati o'tgan ko'rik sizga eskalatsiya bo'ladi. Qatorlarni belgilang, yangi sanani tanlang va «Ko'chirish»ni bosing: sabab tarixda qoladi.",
        "Просроченный осмотр эскалируется вам. Отметьте строки, выберите новую дату и нажмите «Ko'chirish»: причина останется в истории."),
      Q("hisobot-mb.html", S("muddat"), "MB oylik hisoboti", "Ежемесячный отчёт ЦБ", "Hisobot har oyning 10-sanasigacha topshiriladi, qolgan kun shu yerda ko'rinadi. Yon panelda olti band qoldi: qolgan sahifalar bo'lim tasmasida va Ctrl+K da, yordam esa har sahifada «?» tugmasida.",
        "Отчёт сдаётся до 10-го числа каждого месяца, здесь видно, сколько дней осталось. В боковом меню осталось шесть пунктов: остальные страницы — в ленте раздела и в Ctrl+K, помощь — кнопка «?» на каждой странице."),
    ],
  },

  "obyekt-tanishuv": {
    rol: ["obyekt"], birinchi: true, rejim: "sayohat",
    sarlavha: T("Obyekt menejeri paneli bilan tanishuv", "Знакомство с панелью менеджера по объектам"),
    tavsif: T("Navbatingiz, balansga qabul, baholash, sotuv va obyekt kartochkasi. 2 daqiqa", "Ваша очередь, приём на баланс, оценка, продажа и карточка объекта. 2 минуты"),
    qadamlar: [
      Q("panel-obyekt.html", S("navbat"), "Mening navbatim", "Моя очередь", "Bugun qilinadigan ishlar muddat tartibida. Belgini bossangiz vazifa bajariladi, «Qoldirish» uni tanlangan sanagacha olib turadi.",
        "Дела на сегодня по срокам. Нажмите отметку — задача выполнена; «Qoldirish» убирает её до выбранной даты."),
      Q("panel-obyekt.html", S("qabul-navbati"), "Balansga qabul navbati", "Очередь приёма на баланс", "Ijro bosqichiga yetgan va Rahbariyat tasdiqlagan undiruv ishlari. «Qabul qilish» qabul formasini ish ma'lumoti bilan ochadi.",
        "Дела о взыскании на этапе исполнения, утверждённые Руководством. «Qabul qilish» открывает форму приёма с данными дела."),
      Q("panel-obyekt.html", S("balansga-qabul"), "Balansga qabul", "Приём на баланс", "Yangi obyektni qabul qilish shu tugmadan boshlanadi. Uch qadam, kiritilgan narsa qoralama bo'lib saqlanadi.",
        "Приём нового объекта начинается с этой кнопки. Три шага, введённое сохраняется как черновик."),
      Q("panel-obyekt.html", S("baholash"), "Baholash navbati", "Очередь оценки", "Bahosi yo'q va bahosi eskirayotgan aktivlar. Buyurtmani siz berasiz, kelgan hisobotni kiritasiz; yangi baho Rahbariyat yoki buxgalteriya tasdig'idan keyin aktivga o'tadi.",
        "Активы без оценки и с устаревающей оценкой. Заказ оформляете вы, полученный отчёт вносите сами; новая оценка переходит в актив после утверждения Руководством или бухгалтерией."),
      Q("panel-obyekt.html", S("sotuv"), "Sotuv bosqichlari", "Этапы продажи", "Lot, taklif va shartnoma bo'yicha sizdan kutilayotgan ishlar. Taklifni AML tekshiruvidan keyin Rahbariyat qaroriga yuborasiz.",
        "Дела по лоту, предложению и договору, которые ждут вас. Предложение после проверки ПОД/ФТ отправляете на решение Руководства."),
      Q(OBYEKT, S("keyingi-amal"), "Keyingi qadam", "Следующий шаг", "Kartochkada tizim eng muhim ishni aytadi, masalan yetishmayotgan hujjat, va tugma bilan o'sha ishga olib boradi.",
        "В карточке система называет самое важное дело, например недостающий документ, и кнопкой ведёт к нему."),
      Q(OBYEKT, S("tablar"), "Kartochka tablari", "Вкладки карточки", "Suratlar, Moliya, Hujjatlar, Ko'riklar, Xarajatlar, Kommunal, Himoya, Sotuv va Tarix. Yon panelda bo'lmagan sahifalar shu tablarda ochiladi.",
        "Фото, финансы, документы, осмотры, расходы, коммунальные, охрана, продажа и история. Страницы, которых нет в боковом меню, открываются в этих вкладках."),
      Q(OBYEKT, S("muddat-lenta"), "Me'yoriy muddatlar", "Нормативные сроки", "Balansda necha kun turgani va umidsiz toifagacha qancha qolgani. Yaqinlashsa, sotuvni tezlashtiring.",
        "Сколько дней актив на балансе и сколько осталось до безнадёжной категории. Если срок близко, ускорьте продажу."),
    ],
  },

  "nazorat-tanishuv": {
    rol: ["nazorat"], birinchi: true, rejim: "sayohat",
    sarlavha: T("Ko'rik va xavfsizlik paneli bilan tanishuv", "Знакомство с панелью осмотров и безопасности"),
    tavsif: T("Ko'rik navbati, hodisalar, qurilmalar va inventarizatsiya. 2 daqiqa", "Очередь осмотров, инциденты, устройства и инвентаризация. 2 минуты"),
    qadamlar: [
      Q("panel-nazorat.html", S("doira"), "Ko'riklar doirasi", "Охват осмотров", "«Mening ko'riklarim» sizga tayinlanganlarini, «Barcha ko'riklar» filialdagi hammasini ko'rsatadi. Tanlov raqamlarga ham ta'sir qiladi va eslab qolinadi.",
        "«Mening ko'riklarim» показывает назначенные вам осмотры, «Barcha ko'riklar» — все по филиалу. Выбор влияет и на цифры, и запоминается."),
      Q("panel-nazorat.html", S("kpi"), "Bugungi raqamlar", "Цифры на сегодня", "7 kundagi ko'riklar, kechikkanlar, ochiq hodisalar, sug'urtasiz aktivlar va 24 soatdan ortiq aloqasiz qurilmalar.",
        "Осмотры на 7 дней, просроченные, открытые инциденты, активы без страховки и устройства без связи более 24 часов."),
      Q("panel-nazorat.html", S("bugun-koriklar"), "Ko'rik navbati", "Очередь осмотров", "Kechikkan, bugungi va rejadagi ko'riklar. «Ko'rikni boshlash» eng shoshilinchining dalolatnomasini ochadi.",
        "Просроченные, сегодняшние и плановые осмотры. «Ko'rikni boshlash» открывает акт самого срочного."),
      Q("panel-nazorat.html", S("hodisalar"), "Ochiq hodisalar", "Открытые инциденты", "Jiddiylik bo'yicha. Hodisani bossangiz, uning varaqasi ochiladi. Hodisa endi shu roldan boshlanib shu rolda yopiladi.",
        "По важности. Нажмите на инцидент, чтобы открыть его карточку. Инцидент теперь открывается и закрывается в этой же роли."),
      Q("panel-nazorat.html", S("qurilmalar"), "Qurilmalar", "Устройства", "24 soatdan ortiq jim turgan va batareyasi 20% dan past qurilmalar. Ularga servis topshirig'i berasiz; qo'riqlash va kirish ruxsatlari ham sizda.",
        "Устройства, молчащие больше 24 часов, и с зарядом ниже 20%. Вы оформляете им сервисное задание; охрана и допуски тоже на вас."),
      Q("korik-rejasi.html", S("jadval"), "Ko'rik rejasi", "План осмотров", "Rejadagi hamma ko'rik. Qatordagi «O'tkazish» dalolatnoma formasini ochadi; baho 2 yoki 1 bo'lsa hodisa o'zi ochiladi.",
        "Все плановые осмотры. «O'tkazish» в строке открывает форму акта; при оценке 2 или 1 инцидент откроется сам."),
      Q("inventarizatsiya.html", S("sanash"), "Inventarizatsiya", "Инвентаризация", "«Sanashni boshlash» birliklar ro'yxatini ochadi. Har birini «Topildi» yoki «Topilmadi» deb belgilaysiz.",
        "«Sanashni boshlash» открывает список единиц. Каждую отмечаете «Topildi» или «Topilmadi»."),
      Q("himoya.html", S("signal-navbat"), "Monitoring markazi", "Центр мониторинга", "Qurilma va kirish signallari vaqt bo'yicha. Tizim jonli video ko'rsatmaydi: qurilmaning oxirgi signal vaqti turadi. Jiddiy signalda hodisa oching.",
        "Сигналы устройств и доступа по времени. Система не показывает живое видео: видно время последнего сигнала устройства. При серьёзном сигнале откройте инцидент."),
    ],
  },

  "buxgalteriya-tanishuv": {
    rol: ["buxgalteriya"], birinchi: true, rejim: "sayohat",
    sarlavha: T("Moliya paneli bilan tanishuv", "Знакомство с финансовой панелью"),
    tavsif: T("Zaxira, soliq, MB hisoboti va to'lovlar. 2 daqiqa", "Резерв, налог, отчёт ЦБ и платежи. 2 минуты"),
    qadamlar: [
      Q("panel-moliya.html", S("bugun"), "Bugun", "Сегодня", "Kunni shu blokdan boshlang: MB hisoboti muddati, tasdiq kutayotgan stavka, to'lanmagan soliq va kechikkan to'lov. Qatorni bossangiz, tegishli ro'yxat ochiladi.",
        "Начинайте день с этого блока: срок отчёта ЦБ, ставка на утверждении, неуплаченный налог и просроченный платёж. Нажмите на строку — откроется нужный список."),
      Q("panel-moliya.html", S("kpi"), "To'rt raqam", "Четыре цифры", "Zaxira yuki, MB hisoboti topshirilgunicha qolgan kun, to'lanmagan chorak solig'i va kechikkan to'lovlar. «Taxminiy» belgisi stavka hali tasdiqlanmaganini bildiradi.",
        "Резервная нагрузка, дни до сдачи отчёта ЦБ, неуплаченный налог за квартал и просроченные платежи. Отметка «Taxminiy» означает, что ставка ещё не утверждена."),
      Q("panel-moliya.html", S("stavkalar"), "Zaxira stavkalari", "Ставки резерва", "Toifalar bo'yicha amaldagi stavka. Oraliq stavkani siz taklif qilasiz, Rahbariyat tasdiqlaydi.",
        "Действующая ставка по категориям. Промежуточную ставку предлагаете вы, утверждает Руководство."),
      Q("panel-moliya.html", S("sorovlarim"), "Mening so'rovlarim", "Мои запросы", "Yuborgan so'rovlaringiz holati javob muddati bilan. O'z so'rovingizni o'zingiz tasdiqlay olmaysiz — to'rt ko'z qoidasi shu.",
        "Статус отправленных запросов со сроком ответа. Свой запрос утвердить нельзя — в этом и состоит принцип четырёх глаз."),
      Q("panel-moliya.html", S("tolovlar"), "Kechikkan to'lovlar", "Просроченные платежи", "Bo'lib to'lash va ijara jadvalidagi muddati o'tgan oylar. Shartnomani ochib to'lovga belgi qo'yasiz.",
        "Просроченные месяцы из графиков рассрочки и аренды. Откройте договор и отметьте платёж."),
      Q("zaxira.html", S("stavka"), "Stavkani tasdiqqa yuborish", "Отправить ставку на утверждение", "Oraliq stavkani kiriting va «Tasdiqqa yuborish»ni bosing. Rahbariyat tasdiqlaguncha qiymat «Taxminiy» bo'lib turadi.",
        "Внесите промежуточную ставку и нажмите «Tasdiqqa yuborish». До утверждения Руководством значение остаётся с отметкой «Taxminiy»."),
      Q("hisobot-mb.html", S("muddat"), "Topshirish muddati", "Срок сдачи", "Har oyning 10-sanasigacha. Topshirgach «Topshirildi deb belgilash»ni bosing; xato belgini bekor qilish mumkin. Qolgan hisobotlar «Hisobotlar» markazida.",
        "До 10-го числа каждого месяца. После сдачи нажмите «Topshirildi deb belgilash»; ошибочную отметку можно снять. Остальные отчёты — в центре «Hisobotlar»."),
    ],
  },

  "admin-tanishuv": {
    rol: ["admin"], birinchi: true, rejim: "sayohat",
    sarlavha: T("Administrator ish joyi bilan tanishuv", "Знакомство с рабочим местом администратора"),
    tavsif: T("Hisoblar, rollar, qoidalar va amallar tarixi. 2 daqiqa", "Учётные записи, роли, правила и журнал действий. 2 минуты"),
    qadamlar: [
      Q("panel.html", S("bugun"), "Bugun", "Сегодня", "Siz hamma bo'limni ko'rasiz. Bu blok bankning bugungi holatini ko'rsatadi, lekin sizning asosiy ishingiz Sozlamalar bo'limida.",
        "Вы видите все разделы. Этот блок показывает состояние банка на сегодня, но ваша основная работа — в разделе Настройки."),
      Q("foydalanuvchilar.html", S("qoshish"), "Foydalanuvchi qo'shish", "Добавить пользователя", "Yangi xodimga hisob oching: ism, login, rol, filial va bo'lim. Rol ro'yxatida to'rt ish roli va administrator bor.",
        "Откройте учётную запись новому сотруднику: имя, логин, роль, филиал и подразделение. В списке ролей — четыре рабочие роли и администратор."),
      Q("foydalanuvchilar.html", S("jadval"), "Hisoblar ro'yxati", "Список учётных записей", "Qatordagi «Bloklash» ishdan ketgan xodimni tizimdan chiqaradi, sabab majburiy. Amallar tarixi saqlanib qoladi.",
        "Кнопка «Bloklash» в строке отключает уволенного сотрудника, причина обязательна. Журнал действий сохраняется."),
      Q("rollar.html", S("matritsa"), "Huquqlar matritsasi", "Матрица прав", "To'rt ish roli va administrator, har birining bo'limlardagi huquqi: ko'radi, yozadi, tasdiqlaydi. Xodimga boshqa huquq kerak bo'lsa, mos rol bering.",
        "Четыре рабочие роли и администратор, права каждой в разделах: видит, пишет, утверждает. Если сотруднику нужны другие права, назначьте подходящую роль."),
      Q("sozlamalar.html", S("menyu"), "Sozlamalar bo'limlari", "Разделы настроек", "«Eskalatsiya qoidalari» — muddatdan necha kun oldin kimga bildirishnoma yoki vazifa ketishi va javob bo'lmasa kimga o'tishi. «Me'yoriy parametrlar» — muddat, zaxira va savdo hisoblari shu qiymatlardan olinadi. Har o'zgarish amallar tarixiga yoziladi.",
        "«Eskalatsiya qoidalari» — за сколько дней до срока и кому уходит уведомление или задача и к кому она переходит без ответа. «Me'yoriy parametrlar» — из этих значений считаются сроки, резерв и торги. Каждое изменение записывается в журнал."),
      Q("sozlamalar.html", S("sayohatlar"), "Tanishuv sayohatlari", "Ознакомительные туры", "«Qayta ko'rsatish» bosilsa, ko'rilgan sayohatlar yana taklif qilinadi. Yangi xodimga shuni tavsiya qiling.",
        "После «Qayta ko'rsatish» просмотренные туры предлагаются снова. Порекомендуйте это новому сотруднику."),
      Q("amallar-tarixi.html", S("jadval"), "Eski va yangi qiymat", "Старое и новое значение", "Kim, qachon, nimani o'zgartirgani. Har yozuvda o'zgarishdan oldingi va keyingi qiymat bor, CSV faqat filtrlangan qatorlarni oladi.",
        "Кто, когда и что изменил. В каждой записи есть значение до и после изменения, CSV выгружает только отфильтрованные строки."),
    ],
  },

  /* ======================= Vazifalar bo'yicha sayohatlar ======================= */
  /* Yon panel qisqardi: bu sayohat yon paneldan tushgan sahifani qayerdan ochishni ko'rsatadi */
  "navigatsiya": {
    rol: "hammasi", rejim: "sayohat",
    sarlavha: T("Kerakli sahifani topish", "Как найти нужную страницу"),
    tavsif: T("Bo'lim tasmasi, Ctrl+K va obyekt kartochkasi. 1 daqiqa", "Лента раздела, Ctrl+K и карточка объекта. 1 минута"),
    qadamlar: [
      Q("obyektlar.html", ".bolim-tablar", "Bo'lim tasmasi", "Лента раздела", "Yon panelda har bir rolga ko'pi bilan olti band qoldi. Sahifa tepasidagi tasma esa shu bo'limning hamma sahifasini ko'rsatadi: reyestr, muddatlar, xarita, qabul, rasmiylashtirish, arxiv.",
        "В боковом меню у каждой роли осталось не больше шести пунктов. А лента вверху страницы показывает все страницы раздела: реестр, сроки, карта, приём, оформление, архив."),
      Q("obyektlar.html", "#global-izlash-qutisi", "Ctrl+K qidiruvi", "Поиск Ctrl+K", "Ctrl+K yoki / bosing va obyekt raqamini, sahifa nomini yoki amalni yozing, masalan «zaxira» yoki AK-2026/3775. Enter birinchi natijani ochadi.",
        "Нажмите Ctrl+K или / и введите номер объекта, название страницы или действие, например «zaxira» или AK-2026/3775. Enter откроет первый результат."),
      Q("obyektlar.html", "#izlash-tugma", "Telefonda qidiruv", "Поиск на телефоне", "Tor ekranda qidiruv maydoni shu tugma ostida turadi. Bosing va yozishni boshlang.",
        "На узком экране поле поиска спрятано под этой кнопкой. Нажмите и начните вводить."),
      Q("obyektlar.html", S("jadval"), "Reyestrdan kartochkaga", "Из реестра в карточку", "Qatorni bossangiz obyekt kartochkasi ochiladi. Moliya, Hujjatlar, Ko'riklar, Kommunal, Himoya va Sotuv sahifalari shu kartochkaning tablarida.",
        "Нажмите на строку — откроется карточка объекта. Страницы «Финансы», «Документы», «Осмотры», «Коммунальные», «Охрана» и «Продажа» — во вкладках этой карточки."),
      Q("obyektlar.html", "#yordam-tugma", "Yordam tugmasi", "Кнопка помощи", "Har sahifada «?» tugmasi shu sahifa bo'yicha maqola va sayohatni ochadi. To'liq qo'llanma esa Sozlamalar bo'limidagi «Qo'llanma» sahifasida.",
        "На каждой странице кнопка «?» открывает статью и тур по этой странице. Полное руководство — на странице «Qo'llanma» в разделе Настройки."),
    ],
  },

  "balansga-qabul": {
    rol: ["obyekt", "admin"], rejim: "sayohat",
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
    rol: ["nazorat", "obyekt", "admin"], rejim: "sayohat",
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
    rol: ["nazorat", "obyekt", "admin"], rejim: "sayohat",
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
    rol: ["nazorat", "obyekt", "admin"], rejim: "sayohat",
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
    rol: ["nazorat", "obyekt", "admin"], rejim: "sayohat",
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
    rol: ["nazorat", "obyekt", "admin"], rejim: "sayohat",
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
    rol: ["obyekt", "admin"], rejim: "sayohat",
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
      Q("takliflar.html", S("taklif"), "Taklifni qarorga yuborish", "Отправить предложение на решение", "To'g'ridan-to'g'ri sotishda xaridor taklifini shu yerdan kiritasiz. AML tekshiruvi tugagach taklif Rahbariyat qaroriga ketadi: o'zingiz yuborgan taklifni o'zingiz tasdiqlay olmaysiz.",
        "При прямой продаже предложение покупателя вносится здесь. После проверки ПОД/ФТ предложение уходит на решение Руководства: своё предложение утвердить нельзя."),
    ],
  },

  /* Qarorni faqat Rahbariyat qabul qiladi: taklifni yuborish qadamlari lot-chiqarish sayohatida */
  "taklif-tasdiqlash": {
    rol: ["rahbariyat", "admin"], rejim: "sayohat",
    sarlavha: T("Taklifni tasdiqlash", "Утверждение предложения"),
    tavsif: T("Xaridor taklifidan shartnomagacha", "От предложения покупателя до договора"),
    qadamlar: [
      Q("takliflar.html", S("kpi"), "Takliflar holati", "Статус предложений", "Yangi, qarorda, tasdiqlangan lekin shartnomasiz va AML tekshiruvidagilar.", "Новые, на решении, утверждённые без договора и на проверке ПОД/ФТ."),
      Q("takliflar.html", S("korinish"), "Qaror kutilmoqda", "Ожидают решения", "Bu ko'rinish Rahbariyatga yuborilgan takliflarni ko'rsatadi. Taklifni yuborgan xodim uni tasdiqlay olmaydi.",
        "Это представление показывает предложения, отправленные Руководству. Отправивший сотрудник не может их утвердить."),
      Q("tasdiqlar.html", S("qaror-karta"), "Qarorlar ro'yxati", "Список решений", "Taklif summasi, xaridor, muallif va javob muddati.", "Сумма предложения, покупатель, автор и срок ответа."),
      Q("tasdiqlar.html", S("qaror-karta"), "Qarorni oching", "Откройте решение", "Qatorni bosing: tafsilot o'ng tomonda ochiladi. Keyin «Keyingi» tugmasini bosing.",
        "Нажмите на строку: подробности откроются справа. Затем нажмите «Keyingi».", {amal: {tur: "bos"}, kutish: ".yon-panel"}),
      Q("tasdiqlar.html", '[data-sayohat="nima-ozgaradi"], .yon-panel .ts-izoh:not(.xavf):not(.yashil)', "Tasdiqlansa nima bo'ladi", "Что будет после утверждения",
        "Lot narxi va taklif holati oldin va keyin ko'rinishida, ostida esa tasdiqdan keyin qaysi yozuvlar o'zgarishi. Qiymat o'zgarmaydigan so'rovda faqat oqibat yoziladi.",
        "Цена лота и статус предложения в виде «до и после», ниже — какие записи изменятся после утверждения. Если запрос не меняет сумму, остаётся только последствие."),
      Q("tasdiqlar.html", S("tasdiqlash"), "Tasdiqlash", "Утвердить", "Tasdiqlash oynasi o'zgarishlarni yana bir bor ko'rsatadi. Keyin obyekt menejeri 10 ish kunida shartnoma tuzadi.",
        "Окно подтверждения ещё раз показывает изменения. Затем менеджер по объектам заключает договор в течение 10 рабочих дней."),
      Q("tasdiqlar.html", S("rad"), "Rad etish", "Отклонить", "Sabab majburiy, u muallifga ko'rinadi.", "Причина обязательна, её увидит автор."),
    ],
  },

  "zaxira-muddatlar": {
    rol: ["buxgalteriya", "rahbariyat", "admin"], rejim: "sayohat",
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
    rol: ["rahbariyat", "admin"], rejim: "sayohat",
    sarlavha: T("Qarorlar va to'rt ko'z qoidasi", "Решения и принцип четырёх глаз"),
    tavsif: T("Bir xodim so'raydi, boshqasi tasdiqlaydi", "Один сотрудник запрашивает, другой утверждает"),
    qadamlar: [
      Q("tasdiqlar.html", S("korinish"), "Uch ko'rinish", "Три представления", "«Mendan kutilmoqda», «Men yuborganlar», «Hal qilinganlar». Tanlovingiz eslab qolinadi.", "«Mendan kutilmoqda», «Men yuborganlar», «Hal qilinganlar». Ваш выбор запоминается."),
      Q("tasdiqlar.html", S("filtr"), "Turi", "Тип", "Xaridor taklifi, narx pasaytirish, baholash natijasi, balansga qabul, balansdan chiqarish, zaxira stavkasi.", "Предложение покупателя, снижение цены, результат оценки, приём на баланс, списание, ставка резерва."),
      Q("tasdiqlar.html", S("orinbosar"), "O'rinbosar", "Заместитель", "Ta'til vaqtida qarorni o'rinbosar qabul qiladi.", "На время отпуска решения принимает заместитель."),
      Q("tasdiqlar.html", S("qaror-karta"), "Qarorlar ro'yxati", "Список решений", "Muallif, summa va javob muddati: o'tgan bo'lsa qizil, 1 ish kuni qolsa sariq. Katakchalar bilan bir turdagi so'rovlarni birdan tasdiqlash mumkin, balansdan chiqarish bundan mustasno.",
        "Автор, сумма и срок ответа: красный, если прошёл, жёлтый, если остался 1 рабочий день. Флажками можно утвердить однотипные запросы сразу, кроме списания."),
      Q("tasdiqlar.html", S("qaror-karta"), "Qarorni oching", "Откройте решение", "Qatorni bosing: qaror tafsiloti o'ng tomonda ochiladi. Keyin «Keyingi» tugmasini bosing.",
        "Нажмите на строку: подробности решения откроются справа. Затем нажмите «Keyingi».", {amal: {tur: "bos"}, kutish: ".yon-panel"}),
      Q("tasdiqlar.html", '[data-sayohat="nima-ozgaradi"], .yon-panel .ts-izoh:not(.xavf):not(.yashil)', "Tasdiqlansa nima bo'ladi", "Что будет после утверждения",
        "Qiymat, narx yoki holat oldin va keyin, ostida esa qaror qabul qilingach qaysi yozuvlar o'zgarishi va kimga vazifa ketishi. O'z so'rovingizda tugmalar o'rniga «Siz yuborgansiz. Boshqa xodim tasdiqlaydi» yozuvi turadi.",
        "Стоимость, цена или статус до и после, ниже — какие записи изменятся после решения и кому уйдёт задача. В своём запросе вместо кнопок написано «Siz yuborgansiz. Boshqa xodim tasdiqlaydi»."),
      Q("tasdiqlar.html", S("tasdiqlash"), "Tasdiqlash", "Утвердить", "Oyna o'zgarishlarni takrorlaydi. Balansdan chiqarishda obyekt raqamini yozib tasdiqlaysiz.", "Окно повторяет изменения. Для списания нужно ввести номер объекта."),
      Q("tasdiqlar.html", S("rad"), "Rad etish", "Отклонить", "Sabab majburiy, kamida 5 belgi.", "Причина обязательна, не меньше 5 символов."),
    ],
  },

  /* Qaror qabul qilmaydigan rollar: «Mendan kutilmoqda» ro'yxati ularda bo'sh, shuning uchun alohida qisqa sayohat */
  "tasdiqlar-yuborganlarim": {
    rol: ["obyekt", "nazorat", "buxgalteriya"], rejim: "sayohat",
    sarlavha: T("Yuborgan so'rovlaringiz", "Ваши отправленные запросы"),
    tavsif: T("Qarorni boshqa xodim qabul qiladi, so'rov holati shu sahifada ko'rinadi",
      "Решение принимает другой сотрудник, статус запроса виден на этой странице"),
    qadamlar: [
      Q("tasdiqlar.html", S("korinish"), "Uch ko'rinish", "Три представления",
        "«Mendan kutilmoqda» ro'yxatida faqat sizning qaroringiz kerak bo'lgan so'rovlar turadi; narx, baholash, balansga qabul va balansdan chiqarish bo'yicha qarorni Rahbariyat qabul qiladi, shuning uchun ro'yxat ko'pincha bo'sh. O'zingiz yuborgan so'rovlar «Men yuborganlar» da, javob olganlari «Hal qilinganlar» da.",
        "В списке «Mendan kutilmoqda» стоят только запросы, где нужно ваше решение; решения по цене, оценке, приёму и списанию принимает Руководство, поэтому список чаще всего пуст. Отправленные вами запросы — в «Men yuborganlar», получившие ответ — в «Hal qilinganlar»."),
      Q("tasdiqlar.html", S("filtr"), "Turi va qidiruv", "Тип и поиск",
        "Turi bo'yicha filtr masalalarni ajratadi. Qidiruv maydoni obyekt nomi, masala turi va so'rov raqami bo'yicha ishlaydi.",
        "Фильтр по типу отбирает вопросы. Поле поиска работает по названию объекта, типу вопроса и номеру запроса."),
      Q("tasdiqlar.html", null, "So'rov holati", "Статус запроса",
        "So'rov yuborilgach «Men yuborganlar» ro'yxatida javob muddati bilan turadi. Qaror chiqqach bildirishnoma keladi va so'rov «Hal qilinganlar» ga o'tadi. O'z so'rovingizni o'zingiz tasdiqlay olmaysiz — to'rt ko'z qoidasi shu.",
        "После отправки запрос стоит в списке «Men yuborganlar» со сроком ответа. После решения приходит уведомление, и запрос переходит в «Hal qilinganlar». Свой запрос утвердить нельзя — в этом и состоит принцип четырёх глаз."),
    ],
  },

  "chiqim": {
    rol: ["obyekt", "admin"], rejim: "sayohat",
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
    rol: ["obyekt", "rahbariyat", "admin"], rejim: "sayohat",
    sarlavha: T("Undiruvdan balansga qabul", "Из взыскания на баланс"),
    tavsif: T("Obyekt menejeri so'raydi, Rahbariyat tasdiqlaydi", "Менеджер по объектам запрашивает, Руководство утверждает"),
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
    rol: ["nazorat", "obyekt", "rahbariyat", "admin"], rejim: "namoyish",
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
