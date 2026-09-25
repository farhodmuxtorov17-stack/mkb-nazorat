/* ============================================================
   qollanma.js — yordam markazi ma'lumoti.
   window.MKB_QOLLANMA — har bir rol uchun ish tartibi (shapkadagi yordam paneli va qollanma.html).
   window.MKB_YORDAM   — har bir sahifa uchun maqola (yordam paneli "Shu sahifa" va qollanma.html#<fayl>).
   Matnlar ikki tilda yoziladi: X("o'zbekcha", "русский"). Ruscha matn shu yerning o'zida
   MKB_LUGAT ga qo'shiladi (lug'atda bor kalit almashtirilmaydi), tarjimaQil uni o'zi topadi.
   Me'yorlar PARAMETRLAR va QOIDALAR dagi qiymatlar bilan bir xil yoziladi.
   Havolalar faqat mavjud sahifalarga olib boradi.
   ============================================================ */
(function(){
  const L = window.MKB_LUGAT = window.MKB_LUGAT || {};
  /* X(uz, ru): o'zbekcha matnni qaytaradi, ruschasini lug'atga yozadi */
  const YANGI = window.__mkbYordamKalitlar = window.__mkbYordamKalitlar || new Set();
  function X(uz, ru){
    if (typeof uz === "string" && typeof ru === "string" && ru && L[uz] == null){ L[uz] = ru; YANGI.add(uz); }
    return uz;
  }
  /* Ruscha matndagi «tugma nomi» ekranda ko'rinadigan ruscha nomga almashtiriladi (lug'atda bo'lsa) */
  window.mkbYordamTuzat = function(){
    const apos = t => t.replace(/[’ʼʻ`´]/g, "'");
    YANGI.forEach(k => {
      const v = L[k];
      if (typeof v !== "string" || v.indexOf("«") < 0) return;
      const t = v.replace(/«([^«»]+)»/g, (m, q) => {
        const r = L[q] != null ? L[q] : L[apos(q)];
        return typeof r === "string" && r !== q ? "«" + r + "»" : m;
      });
      if (t !== v) L[k] = t;
    });
  };
  /* B(nomUz, nomRu, izohUz, izohRu): {nom, izoh} bandi */
  const B = (nu, nr, iu, ir) => ({nom: X(nu, nr), izoh: X(iu, ir)});
  window.mkbIkkiTil = X;
  window.mkbIkkiBand = B;

window.MKB_QOLLANMA = {

  admin: {
    nom: "Administrator",
    maqsad: X("Siz hisoblar, rollar va tizim qoidalarini yuritasiz. Ma'lumotni bo'lim xodimlari kiritadi, " +
            "siz kim nimani ko'rishi va o'zgartirishini belgilaysiz.",
            "Вы ведёте учётные записи, роли и правила системы. Данные вносят сотрудники подразделений, а вы определяете, кто что видит и что может менять."),
    qadamlar: [
      {nom: X("Yangi xodimga hisob oching", "Откройте учётную запись новому сотруднику"),
       izoh: X("Rol va filialni biriktiring. Server rejimida vaqtinchalik parol bering, xodim kirgach uni almashtiradi.",
               "Назначьте роль и филиал. В серверном режиме выдайте временный пароль: сотрудник сменит его при первом входе."),
       havola: "foydalanuvchilar.html", havolaNomi: X("Foydalanuvchilar", "Пользователи"), rasm: "assets/yordam/admin-foydalanuvchilar.webp"},
      {nom: X("Ishdan ketgan xodim hisobini bloklang", "Заблокируйте учётную запись уволенного сотрудника"),
       izoh: X("Bloklangan hisob tizimga kira olmaydi. Uning amallar tarixi saqlanib qoladi.",
               "Заблокированная запись не может войти в систему. История её действий сохраняется."),
       havola: "foydalanuvchilar.html", havolaNomi: X("Foydalanuvchilar", "Пользователи")},
      {nom: X("Eskalatsiya qoidalarini sozlang", "Настройте правила эскалации"),
       izoh: X("Muddatdan necha kun oldin kimga bildirishnoma yoki vazifa ketishini va javob bo'lmasa kimga o'tishini belgilang.",
               "Укажите, за сколько дней до срока и кому уходит уведомление или задача и к кому она переходит, если ответа нет."),
       havola: "sozlamalar.html#qoidalar", havolaNomi: X("Eskalatsiya qoidalari", "Правила эскалации"), rasm: "assets/yordam/admin-qoidalar.webp"},
      {nom: X("Me'yoriy parametrlarni yangilang", "Обновите нормативные параметры"),
       izoh: X("Muddat, zaxira, soliq va savdo hisoblari shu qiymatlardan olinadi. Taxminiy qiymat buxgalteriya tasdiqlagach amalga kiradi.",
               "Из этих значений считаются сроки, резерв, налог и торги. Предварительное значение вступает в силу после утверждения бухгалтерией."),
       havola: "sozlamalar.html#parametrlar", havolaNomi: X("Parametrlar", "Параметры")},
      {nom: X("Amallar tarixini tekshiring", "Проверьте журнал действий"),
       izoh: X("Rad etilgan kirishlar va kutilmagan o'zgarishlarni ko'rib chiqing. Har bir yozuvda eski va yangi qiymat bor.",
               "Просмотрите отклонённые входы и неожиданные изменения. В каждой записи есть прежнее и новое значение."),
       havola: "amallar-tarixi.html", havolaNomi: X("Amallar tarixi", "Журнал действий"), rasm: "assets/yordam/admin-tarix.webp"},
    ],
    javobgarlik: [
      X("Hisoblar, rollar va filial biriktiruvining to'g'riligi", "Правильность учётных записей, ролей и привязки к филиалам"),
      X("Eskalatsiya qoidalari va me'yoriy parametrlarning dolzarbligi", "Актуальность правил эскалации и нормативных параметров"),
      X("Shaxsga doir ma'lumotlarni saqlash muddatlari", "Сроки хранения персональных данных"),
    ],
    meyor: [
      X("Ishdan ketgan xodim hisobi o'sha kuni bloklanadi", "Учётная запись уволенного сотрудника блокируется в тот же день"),
      X("Parol kamida 8 belgi, unda harf va raqam bo'ladi", "Пароль не короче 8 символов, в нём есть буквы и цифры"),
      X("Kamera video arxivining muddati Sozlamalarda qayd etiladi va kamera tizimida o'rnatiladi", "Срок хранения видеоархива фиксируется в Настройках и выставляется в системе видеонаблюдения"),
    ],
    yopiq: [],
    kunlik: [
      X("Yangi xodimlar va lavozim o'zgarishlari bo'yicha hisoblarni yangilang", "Обновите учётные записи по новым сотрудникам и кадровым изменениям"),
      X("Amallar tarixida rad etilgan kirishlarni ko'ring", "Просмотрите отклонённые входы в журнале действий"),
    ],
    haftalik: [
      X("Bloklangan va uzoq vaqt kirmagan hisoblarni tekshiring", "Проверьте заблокированные и давно не входившие учётные записи"),
      X("O'chirilgan yozuvlar ko'rinishida kimning nima o'chirganini ko'ring", "В представлении «O'chirilgan yozuvlar» посмотрите, кто и что удалил"),
    ],
    oylik: [
      X("Eskalatsiya qoidalari va me'yoriy parametrlarni bank buyruqlari bilan solishtiring", "Сверьте правила эскалации и нормативные параметры с приказами банка"),
      X("Muddati o'tgan tashrifchi ma'lumotlarini anonimlashtiring", "Обезличьте данные посетителей с истёкшим сроком хранения"),
    ],
    ekranlar: ["panel.html", "foydalanuvchilar.html", "foydalanuvchi.html", "rollar.html", "filiallar.html", "sozlamalar.html", "amallar-tarixi.html", "integratsiyalar.html"],
    mumkin: [
      X("Hamma bo'limni ko'radi va istalgan yozuvni o'zgartira oladi", "Видит все разделы и может менять любую запись"),
      X("Hisob ochadi, rol beradi, bloklaydi va vaqtinchalik parol o'rnatadi", "Открывает учётные записи, назначает роли, блокирует и выставляет временный пароль"),
      X("Eskalatsiya qoidalari va me'yoriy parametrlarni o'zgartiradi", "Меняет правила эскалации и нормативные параметры"),
      X("O'chirilgan yozuvni tiklaydi", "Восстанавливает удалённую запись"),
    ],
    mumkinEmas: [
      X("O'z so'rovini o'zi tasdiqlay olmaydi: qarorni boshqa xodim qabul qiladi", "Не может утвердить собственный запрос: решение принимает другой сотрудник"),
      X("O'z rolini o'zgartira olmaydi", "Не может изменить собственную роль"),
    ],
    sayohat: "admin-tanishuv",
  },

  rahbariyat: {
    nom: "Rahbariyat",
    maqsad: X("Siz portfelni kuzatasiz va qarorlarni tasdiqlaysiz: xaridor taklifi, lot narxini pasaytirish, baho va balansdan chiqarish. " +
            "Formalarni bo'lim xodimlari to'ldiradi.",
            "Вы следите за портфелем и утверждаете решения: предложение покупателя, снижение цены лота, оценку и списание с баланса. Формы заполняют сотрудники подразделений."),
    qadamlar: [
      {nom: X("Boshqaruv panelini oching", "Откройте панель управления"),
       izoh: X("Balans qiymati, zaxira yuki va 90 kunda umidsizga o'tadigan aktivlar bir ekranda.",
               "Балансовая стоимость, резервная нагрузка и активы, которые через 90 дней станут безнадёжными, — на одном экране."),
       havola: "panel.html", havolaNomi: X("Boshqaruv paneli", "Панель управления"), rasm: "assets/yordam/rahbariyat-bugun.webp"},
      {nom: X("Qarorlar navbatini ko'rib chiqing", "Рассмотрите очередь решений"),
       izoh: X("Har bir so'rovda asos, summa va javob muddati ko'rsatilgan. Rad etsangiz, sababini yozing.",
               "В каждом запросе указаны основание, сумма и срок ответа. Если отклоняете, напишите причину."),
       havola: "tasdiqlar.html", havolaNomi: X("Qarorlar", "Решения"), rasm: "assets/yordam/rahbariyat-qaror.webp"},
      {nom: X("Muddatlarni nazorat qiling", "Контролируйте сроки"),
       izoh: X("Umidsiz toifaga yaqinlashgan aktivlar ro'yxat boshida turadi.",
               "Активы, которые приближаются к безнадёжной категории, стоят в начале списка."),
       havola: "muddatlar.html", havolaNomi: X("Muddatlar", "Сроки")},
      {nom: X("Sotuv rejasining bajarilishini kuzating", "Следите за выполнением плана продаж"),
       izoh: X("Lotlar, takliflar va shartnomalar bosqichma-bosqich ko'rinadi.",
               "Лоты, предложения и договоры видны по этапам."),
       havola: "realizatsiya.html", havolaNomi: X("Realizatsiya", "Реализация")},
      {nom: X("Markaziy bankka oylik hisobotni ko'ring", "Просмотрите ежемесячный отчёт для Центрального банка"),
       izoh: X("Hisobot balans aktivlari va umidsiz toifadagilar bo'yicha tuziladi.",
               "Отчёт составляется по активам на балансе и по активам безнадёжной категории."),
       havola: "hisobot-mb.html", havolaNomi: X("MB oylik hisoboti", "Ежемесячный отчёт ЦБ"), rasm: "assets/yordam/rahbariyat-mb.webp"},
    ],
    javobgarlik: [
      X("Qarorlarning javob muddatida qabul qilinishi", "Принятие решений в срок ответа"),
      X("Sotuv usuli va narx bo'yicha yakuniy qaror", "Окончательное решение по способу продажи и цене"),
      X("Balansdan chiqarishni tasdiqlash", "Утверждение списания с баланса"),
    ],
    meyor: [
      X("Undiruv natijasida olingan mulk balansga olingandan 365 kun o'tgach umidsiz toifaga o'tadi, zaxira 100% (MB 2696)", "Имущество, полученное при взыскании, через 365 дней после принятия на баланс переходит в безнадёжную категорию, резерв 100% (ЦБ 2696)"),
      X("MB hisoboti har oyning 10-sanasigacha topshiriladi", "Отчёт ЦБ сдаётся до 10-го числа каждого месяца"),
      X("E-auksion g'olibi 5 ish kunida to'laydi, shartnoma 10 ish kunida tuziladi (VM 18)", "Победитель электронного аукциона оплачивает в течение 5 рабочих дней, договор заключается в течение 10 рабочих дней (ПКМ 18)"),
    ],
    yopiq: [X("Foydalanuvchilar, rollar va integratsiyalarni boshqarish", "Управление пользователями, ролями и интеграциями")],
    kunlik: [
      X("Panelning «Bugun» blokidan boshlang: qarorlar, muddati o'tgan ishlar, qiymati pasaygan obyektlar", "Начните с блока «Bugun» на панели: решения, просроченные дела, объекты с упавшей стоимостью"),
      X("«Qarorlar» sahifasida «Mendan kutilmoqda» ro'yxatini bo'shating", "На странице «Qarorlar» разберите список «Mendan kutilmoqda»"),
    ],
    haftalik: [
      X("Umidsizga o'tish arafasidagi aktivlar bo'yicha sotuv choralarini so'rang", "Запросите меры по продаже активов, которые вот-вот станут безнадёжными"),
      X("Realizatsiya voronkasi va muddati o'tgan to'lovlarni ko'ring", "Просмотрите воронку реализации и просроченные платежи"),
    ],
    oylik: [
      X("10-sanagacha MB oylik hisoboti topshirilganini tekshiring", "Проверьте, что ежемесячный отчёт ЦБ сдан до 10-го числа"),
      X("Kengash uchun bir sahifalik hisobotni chop eting", "Распечатайте одностраничный отчёт для правления"),
      X("Buxgalteriya yuborgan zaxira stavkalarini tasdiqlang", "Утвердите ставки резерва, которые прислала бухгалтерия"),
    ],
    ekranlar: ["panel.html", "tasdiqlar.html", "muddatlar.html", "realizatsiya.html", "zaxira.html", "hisobot-mb.html", "amallar-tarixi.html"],
    mumkin: [
      X("Hamma bo'limni ko'radi, filial cheklovisiz", "Видит все разделы без ограничения по филиалу"),
      X("Taklif, narx pasaytirish, baho, balansga qabul, balansdan chiqarish va zaxira stavkasini tasdiqlaydi yoki rad etadi", "Утверждает или отклоняет предложение, снижение цены, оценку, приём на баланс, списание и ставку резерва"),
      X("O'rinbosar tayinlaydi: ta'til vaqtida qarorni o'rinbosar qabul qiladi", "Назначает заместителя: на время отпуска решения принимает заместитель"),
      X("Xodimga vazifa beradi", "Даёт задачи сотрудникам"),
    ],
    mumkinEmas: [
      X("Formalarni to'ldirmaydi: aktiv, lot va hisobotni bo'lim xodimi kiritadi", "Не заполняет формы: актив, лот и отчёт вносит сотрудник подразделения"),
      X("O'zi yuborgan so'rovni tasdiqlay olmaydi", "Не может утвердить запрос, который отправил сам"),
    ],
    sayohat: "rahbariyat-tanishuv",
  },

  filial: {
    nom: "Filial rahbari",
    maqsad: X("Siz filialingiz balansidagi aktivlar uchun javob berasiz. Tizim sizga faqat o'z filialingiz yozuvlarini ko'rsatadi.",
            "Вы отвечаете за активы на балансе своего филиала. Система показывает вам только записи вашего филиала."),
    qadamlar: [
      {nom: X("Boshqaruv panelini ko'ring", "Просмотрите панель управления"),
       izoh: X("Filialingiz aktivlari, balans qiymati, zaxira, muddatlar va nazorat indeksi past obyektlar bir ekranda.",
               "Активы филиала, балансовая стоимость, резерв, сроки и объекты с низким индексом контроля — на одном экране."),
       havola: "panel.html", havolaNomi: X("Boshqaruv paneli", "Панель управления"), rasm: "assets/yordam/filial-panel.webp"},
      {nom: X("Muddati yaqinlashgan aktivlarni ko'ring", "Просмотрите активы с приближающимся сроком"),
       izoh: X("90 kunda umidsizga o'tadigan aktivlar bo'yicha sotuv yoki ijara choralarini boshlang.",
               "По активам, которые через 90 дней станут безнадёжными, начните продажу или сдачу в аренду."),
       havola: "muddatlar.html", havolaNomi: X("Muddatlar", "Сроки")},
      {nom: X("Ko'rik rejasining bajarilishini tekshiring", "Проверьте выполнение плана осмотров"),
       izoh: X("Kechikkan ko'rik aktivning nazorat indeksini pasaytiradi.",
               "Просроченный осмотр снижает индекс контроля актива."),
       havola: "korik-kechikkan.html", havolaNomi: X("Kechikkan ko'riklar", "Просроченные осмотры"), rasm: "assets/yordam/filial-kechikkan.webp"},
      {nom: X("Qarorlar holatini kuzating", "Следите за статусом решений"),
       izoh: X("Filialingiz aktivlari bo'yicha yuborilgan so'rovlar va javob muddati.",
               "Запросы по активам филиала и срок ответа."),
       havola: "tasdiqlar.html", havolaNomi: X("Qarorlar", "Решения")},
      {nom: X("Xodimlarga vazifa bering", "Поставьте задачи сотрудникам"),
       izoh: X("Reyestrda bir nechta qatorni belgilab, ko'rik yoki vazifani birdan bering.",
               "Отметьте в реестре несколько строк и назначьте осмотр или задачу сразу всем."),
       havola: "vazifalar.html", havolaNomi: X("Vazifalar", "Задачи"), rasm: "assets/yordam/filial-reyestr.webp"},
    ],
    javobgarlik: [
      X("Filial aktivlarining saqlanishi va ko'rik rejasi", "Сохранность активов филиала и план осмотров"),
      X("Filial aktivlari bo'yicha qarorlar holatini kuzatib borish", "Контроль статуса решений по активам филиала"),
      X("Filial xodimlariga vazifa taqsimoti", "Распределение задач между сотрудниками филиала"),
    ],
    meyor: [
      X("Binoli aktiv 90 kunda, transport 30 kunda bir marta ko'rikdan o'tadi", "Актив со зданием осматривается раз в 90 дней, транспорт — раз в 30 дней"),
      X("Balansga qabuldan keyin birinchi ko'rik 72 soat ichida o'tkaziladi", "Первый осмотр проводится в течение 72 часов после приёма на баланс"),
      X("Sug'urta polisi tugashidan 30 kun oldin yangilanadi", "Страховой полис продлевается за 30 дней до окончания"),
    ],
    yopiq: [X("Boshqa filiallar yozuvlari", "Записи других филиалов"), X("Foydalanuvchilar, rollar va integratsiyalarni boshqarish", "Управление пользователями, ролями и интеграциями")],
    kunlik: [
      X("Panelda filialingiz bo'yicha «Bugun» blokini ko'ring", "Просмотрите на панели блок «Bugun» по своему филиалу"),
      X("Kechikkan ko'riklarni inspektorga qayta tayinlang yoki yangi sanaga ko'chiring", "Переназначьте просроченные осмотры инспектору или перенесите их на новую дату"),
    ],
    haftalik: [
      X("Reyestrda «Umidsizga 90 kun qolgan» ko'rinishini oching", "Откройте в реестре представление «Umidsizga 90 kun qolgan»"),
      X("Sug'urta polisi 30 kunda tugaydigan aktivlarni tekshiring", "Проверьте активы, у которых полис истекает через 30 дней"),
      X("Balansga qabul va chiqim so'rovlarining holatini ko'ring", "Проверьте статус запросов на приём и списание"),
    ],
    oylik: [
      X("Filial aktivlarining nazorat indeksini hududlar kesimida solishtiring", "Сравните индекс контроля активов филиала в разрезе регионов"),
      X("Saqlash xarajatlarini filial kesimida ko'ring", "Просмотрите расходы на содержание в разрезе филиала"),
    ],
    ekranlar: ["panel.html", "obyektlar.html", "muddatlar.html", "korik-kechikkan.html", "tasdiqlar.html", "vazifalar.html", "filiallar.html"],
    mumkin: [
      X("O'z filiali aktivlarini qabul qiladi, tahrirlaydi va chiqim so'rovini yuboradi", "Принимает, редактирует активы своего филиала и отправляет запрос на списание"),
      X("Himoya, ko'rik va inventarizatsiya yozuvlarini kiritadi", "Вносит записи по охране, осмотрам и инвентаризации"),
      X("Xodimlarga ko'rik va vazifa beradi, vazifani yopadi", "Назначает сотрудникам осмотры и задачи, закрывает задачи"),
    ],
    mumkinEmas: [
      X("Boshqa filiallar yozuvlarini ko'rmaydi", "Не видит записи других филиалов"),
      X("Baho, lot va undiruv ishlarini faqat ko'radi", "Оценку, лоты и дела о взыскании только просматривает"),
      X("O'z so'rovini o'zi tasdiqlay olmaydi", "Не может утвердить собственный запрос"),
    ],
    sayohat: "filial-tanishuv",
  },

  obyekt: {
    nom: "Obyekt menejeri",
    maqsad: X("Siz aktivni balansga qabul qilasiz va sotilguncha yuritasiz: hujjatlar, suratlar, xarajatlar, kommunal xizmatlar va qo'riqlash.",
            "Вы принимаете актив на баланс и ведёте его до продажи: документы, фотографии, расходы, коммунальные услуги и охрана."),
    qadamlar: [
      {nom: X("Panelingizni oching", "Откройте свою панель"),
       izoh: X("Hujjati to'liq bo'lmagan, surati yo'q va muddati yaqin aktivlar ro'yxat boshida turadi.",
               "Активы с неполными документами, без фото и с близким сроком стоят в начале списка."),
       havola: "panel-obyekt.html", havolaNomi: X("Panelim", "Моя панель"), rasm: "assets/yordam/obyekt-navbat.webp"},
      {nom: X("Aktivni balansga qabul qiling", "Примите актив на баланс"),
       izoh: X("Qabul asosi, balans qiymati va dalolatnoma kiritiladi. Undiruv ishidan kelgan aktivda asos va sud qarori ishdan olinadi.",
               "Вносятся основание приёма, балансовая стоимость и акт. Для актива из дела о взыскании основание и решение суда берутся из дела."),
       havola: "qabul-boshlash.html", havolaNomi: X("Balansga qabul", "Приём на баланс"), rasm: "assets/yordam/obyekt-qabul.webp"},
      {nom: X("Huquqni bank nomiga rasmiylashtiring", "Оформите право на банк"),
       izoh: X("Ko'chmas mulk kadastrda, transport YHXXda qayd etiladi. Qayd sanasi va reyestr ko'chirmasini kiriting.",
               "Недвижимость регистрируется в кадастре, транспорт — в ГУБДД. Внесите дату регистрации и выписку из реестра."),
       havola: "rasmiylashtirish.html", havolaNomi: X("Huquqni rasmiylashtirish", "Оформление права")},
      {nom: X("Aktiv kartochkasini yuriting", "Ведите карточку актива"),
       izoh: X("Hujjat, surat va xarajatlarni aktivga bog'lang. Majburiy hujjatlar ro'yxati bosqichga qarab ko'rsatiladi.",
               "Привязывайте к активу документы, фото и расходы. Список обязательных документов зависит от этапа."),
       havola: "obyektlar.html", havolaNomi: X("Reyestr", "Реестр"), rasm: "assets/yordam/obyekt-kartochka.webp"},
      {nom: X("Kommunal xizmatlar va qo'riqlashni nazorat qiling", "Контролируйте коммунальные услуги и охрану"),
       izoh: X("Hisoblagich ko'rsatkichi, qarz yo'qligi ma'lumotnomasi va qo'riqlash shartnomasi muddati.",
               "Показания счётчиков, справка об отсутствии долга и срок договора охраны."),
       havola: "kommunal.html", havolaNomi: X("Kommunal holat", "Коммунальное состояние")},
    ],
    javobgarlik: [
      X("Reyestr yozuvining to'liqligi va dolzarbligi", "Полнота и актуальность записи в реестре"),
      X("Majburiy hujjatlar va suratlar", "Обязательные документы и фотографии"),
      X("Saqlash xarajatlarining aktivga to'g'ri bog'lanishi", "Правильная привязка расходов на содержание к активу"),
    ],
    meyor: [
      X("Balansga qabuldan keyin birinchi ko'rik 72 soat ichida o'tkaziladi", "Первый осмотр проводится в течение 72 часов после приёма на баланс"),
      X("Transport YHXXda 10 kun ichida qayta qayd etiladi (VM 683)", "Транспорт перерегистрируется в ГУБДД в течение 10 дней (ПКМ 683)"),
      X("Mol-mulk solig'i bo'yicha imtiyoz balansga olingandan 6 oy amal qiladi", "Льгота по налогу на имущество действует 6 месяцев после принятия на баланс"),
    ],
    yopiq: [X("Undiruv va sud", "Взыскание и суд"), X("Foydalanuvchilar, rollar va integratsiyalarni boshqarish", "Управление пользователями, ролями и интеграциями")],
    kunlik: [
      X("«Mening navbatim» ro'yxatini muddat bo'yicha yoping: bajarilgan vazifani belgilang yoki sanaga qoldiring", "Закрывайте список «Mening navbatim» по срокам: отмечайте выполненные задачи или откладывайте их на дату"),
      X("Balansga qabul navbatidagi ishlarni qabul qiling", "Примите дела из очереди приёма на баланс"),
    ],
    haftalik: [
      X("Yetishmayotgan majburiy hujjatlarni yuklang", "Загрузите недостающие обязательные документы"),
      X("Kommunal arizalar va qo'riqlanmayotgan obyektlarni tekshiring", "Проверьте коммунальные заявки и объекты без охраны"),
      X("Saqlash xarajatlarini aktivlarga yozing", "Внесите расходы на содержание по активам"),
    ],
    oylik: [
      X("Hisoblagich ko'rsatkichlarini kiriting", "Внесите показания счётчиков"),
      X("Suratlarni yangilang: asosiy surat obyektning hozirgi holatini ko'rsatsin", "Обновите фотографии: главное фото должно показывать текущее состояние объекта"),
    ],
    ekranlar: ["panel-obyekt.html", "obyektlar.html", "obyekt.html", "qabul-boshlash.html", "rasmiylashtirish.html", "kommunal.html", "vazifalar.html"],
    mumkin: [
      X("Aktivni balansga qabul qiladi, kartochkani tahrirlaydi, hujjat va surat yuklaydi", "Принимает актив на баланс, редактирует карточку, загружает документы и фото"),
      X("Xarajat, kommunal ariza, qo'riqlash shartnomasi va qurilmani kiritadi", "Вносит расходы, коммунальные заявки, договоры охраны и устройства"),
      X("Ko'rik tayinlaydi va balansdan chiqarish so'rovini yuboradi", "Назначает осмотр и отправляет запрос на списание с баланса"),
    ],
    mumkinEmas: [
      X("Undiruv va sud bo'limini ko'rmaydi", "Не видит раздел взыскания и суда"),
      X("Baho, lot va zaxirani faqat ko'radi", "Оценку, лоты и резерв только просматривает"),
      X("Balansdan chiqarishni tasdiqlamaydi: buni Rahbariyat qiladi", "Не утверждает списание: это делает Руководство"),
    ],
    sayohat: "obyekt-tanishuv",
  },

  nazorat: {
    nom: "Ko'rik va xavfsizlik inspektori",
    maqsad: X("Siz aktivning jismoniy holatini nazorat qilasiz: rejali va navbatdan tashqari ko'rik, inventarizatsiya va hodisalar.",
            "Вы контролируете физическое состояние актива: плановые и внеочередные осмотры, инвентаризацию и инциденты."),
    qadamlar: [
      {nom: X("Panelingizni oching", "Откройте свою панель"),
       izoh: X("Bugungi va kechikkan ko'riklar, ochiq hodisalar.", "Сегодняшние и просроченные осмотры, открытые инциденты."),
       havola: "panel-nazorat.html", havolaNomi: X("Panelim", "Моя панель"), rasm: "assets/yordam/nazorat-panel.webp"},
      {nom: X("Ko'rik rejasini bajaring", "Выполняйте план осмотров"),
       izoh: X("Ko'rikni rejadan boshlang: chek-list, suratlar va holat bali. Dalolatnoma saqlangach ko'rik yakunlanadi.",
               "Начинайте осмотр из плана: чек-лист, фото и оценка состояния. Осмотр завершается после сохранения акта."),
       havola: "korik-rejasi.html", havolaNomi: X("Ko'rik rejasi", "План осмотров"), rasm: "assets/yordam/nazorat-cheklist.webp"},
      {nom: X("Kechikkan ko'riklarni yoping", "Закройте просроченные осмотры"),
       izoh: X("Muddati o'tgan ko'rik filial rahbariga eskalatsiya bo'ladi.", "Просроченный осмотр эскалируется руководителю филиала."),
       havola: "korik-kechikkan.html", havolaNomi: X("Kechikkanlar", "Просроченные")},
      {nom: X("Inventarizatsiya o'tkazing", "Проведите инвентаризацию"),
       izoh: X("Uskuna va transportni inventar raqami bo'yicha sanang. Kamomad va ortiqcha dalolatnomaga yoziladi.",
               "Пересчитайте оборудование и транспорт по инвентарным номерам. Недостача и излишки попадают в акт."),
       havola: "inventarizatsiya.html", havolaNomi: X("Inventarizatsiya", "Инвентаризация"), rasm: "assets/yordam/nazorat-inventar.webp"},
      {nom: X("Hodisani qayd eting", "Зарегистрируйте инцидент"),
       izoh: X("Ko'rikda aniqlangan kamchilik yoki buzilishni hodisa sifatida oching. Kerak bo'lsa IIB arizasi raqamini kiriting.",
               "Недостаток или нарушение, найденное при осмотре, оформите как инцидент. При необходимости внесите номер заявления в ОВД."),
       havola: "hodisalar.html", havolaNomi: X("Hodisalar", "Инциденты")},
    ],
    javobgarlik: [
      X("Ko'rik rejasining muddatida bajarilishi", "Выполнение плана осмотров в срок"),
      X("Ko'rik dalolatnomasi va suratlarning to'liqligi", "Полнота акта осмотра и фотографий"),
      X("Aniqlangan kamchiliklarning hodisa sifatida qayd etilishi", "Регистрация найденных недостатков как инцидентов"),
    ],
    meyor: [
      X("Binoli aktiv 90 kunda, transport 30 kunda bir marta ko'rikdan o'tadi", "Актив со зданием осматривается раз в 90 дней, транспорт — раз в 30 дней"),
      X("Balansga qabuldan keyin birinchi ko'rik 72 soat ichida o'tkaziladi", "Первый осмотр проводится в течение 72 часов после приёма на баланс"),
    ],
    yopiq: [X("Realizatsiya", "Реализация"), X("Undiruv va sud", "Взыскание и суд"), X("Foydalanuvchilar, rollar va integratsiyalarni boshqarish", "Управление пользователями, ролями и интеграциями")],
    kunlik: [
      X("Panelda bugungi ko'riklarni oching va «Ko'rikni boshlash» tugmasini bosing", "Откройте на панели сегодняшние осмотры и нажмите «Ko'rikni boshlash»"),
      X("Ochiq hodisalarni qabul qiling va chorani yozing", "Примите открытые инциденты и опишите принятые меры"),
    ],
    haftalik: [
      X("Kechikkan ko'riklarni o'tkazing yoki sababini yozib ko'chiring", "Проведите просроченные осмотры или перенесите их с указанием причины"),
      X("Qurilma nosozliklarini xavfsizlik xizmatiga yetkazing", "Передайте неисправности устройств службе безопасности"),
    ],
    oylik: [
      X("Rejadagi inventarizatsiyani o'tkazing va dalolatnomani yakunlang", "Проведите плановую инвентаризацию и завершите акт"),
      X("Sug'urtasiz aktivlar ro'yxatini obyekt menejeriga bering", "Передайте список активов без страховки менеджеру по объектам"),
    ],
    ekranlar: ["panel-nazorat.html", "korik-rejasi.html", "korik-otkazish.html", "korik-kechikkan.html", "inventarizatsiya.html", "hodisalar.html"],
    mumkin: [
      X("Ko'rik o'tkazadi, dalolatnomani imzolaydi va ko'rikni tayinlaydi", "Проводит осмотр, подписывает акт и назначает осмотры"),
      X("Inventarizatsiyani boshlaydi, sanaydi va yakunlaydi", "Начинает, проводит и завершает инвентаризацию"),
      X("Hodisa ochadi, masofadan ochish qarorini qayd etadi", "Открывает инциденты, фиксирует решение об удалённом открытии"),
    ],
    mumkinEmas: [
      X("Realizatsiya va undiruv bo'limlarini ko'rmaydi", "Не видит разделы реализации и взыскания"),
      X("Aktiv kartochkasini tahrirlamaydi", "Не редактирует карточку актива"),
    ],
    sayohat: "nazorat-tanishuv",
  },

  baholash: {
    nom: "Baholovchi",
    maqsad: X("Siz aktivlarning bozor qiymatini dolzarb holda ushlab turasiz: baholash buyurtmasi, hisobotni kiritish va sug'urta summasi.",
            "Вы поддерживаете рыночную стоимость активов в актуальном состоянии: заказ оценки, ввод отчёта и страховая сумма."),
    qadamlar: [
      {nom: X("Baholash reyestrini oching", "Откройте реестр оценки"),
       izoh: X("Baholanmagan va bahosi eskirayotgan aktivlar ro'yxat boshida turadi.", "Неоценённые активы и активы с устаревающей оценкой стоят в начале списка."),
       havola: "baholash.html", havolaNomi: X("Baholash reyestri", "Реестр оценки"), rasm: "assets/yordam/baholash-reyestr.webp"},
      {nom: X("Baholash buyurtmasini bering", "Оформите заказ на оценку"),
       izoh: X("Aktiv, baholovchi tashkilot va muddat ko'rsatiladi.", "Указываются актив, оценочная организация и срок."),
       havola: "baholash-buyurtma.html", havolaNomi: X("Baholash buyurtmasi", "Заказ на оценку"), rasm: "assets/yordam/baholash-buyurtma.webp"},
      {nom: X("Baholash hisobotini kiriting", "Внесите отчёт об оценке"),
       izoh: X("Bozor va tugatish qiymati, hisobot raqami va sanasi. Yangi baho rahbariyat tasdig'idan keyin aktivga o'tadi.",
               "Рыночная и ликвидационная стоимость, номер и дата отчёта. Новая оценка переходит в актив после утверждения руководством."),
       havola: "baholash-hisobot-kiritish.html", havolaNomi: X("Hisobot kiritish", "Ввод отчёта")},
      {nom: X("Sug'urta summasini tekshiring", "Проверьте страховую сумму"),
       izoh: X("Polis summasi dolzarb bozor qiymatiga mos bo'lsin.", "Сумма полиса должна соответствовать актуальной рыночной стоимости."),
       havola: "sugurta.html", havolaNomi: X("Sug'urta polislari", "Страховые полисы")},
    ],
    javobgarlik: [
      X("Har bir aktivda amaldagi baho bo'lishi", "Действующая оценка у каждого актива"),
      X("Baholash hisobotlarining to'liqligi", "Полнота отчётов об оценке"),
    ],
    meyor: [
      X("Baho 12 oy amal qiladi, muddati tugashidan 30 kun oldin bildirishnoma keladi", "Оценка действует 12 месяцев, за 30 дней до окончания приходит уведомление"),
      X("Baholanmagan aktiv auksionga chiqarilmaydi", "Неоценённый актив не выставляется на аукцион"),
    ],
    yopiq: [X("Boshqaruv paneli", "Панель управления"), X("Himoya va monitoring", "Охрана и мониторинг"), X("Ko'rik va inventarizatsiya", "Осмотры и инвентаризация"), X("Undiruv va sud", "Взыскание и суд"), X("Foydalanuvchilar, rollar va integratsiyalarni boshqarish", "Управление пользователями, ролями и интеграциями")],
    kunlik: [
      X("Baholash reyestrida «30 kunda tugaydi» va «Eskirgan» ko'rinishlarini ko'ring", "Просмотрите в реестре оценки представления «30 kunda tugaydi» и «Eskirgan»"),
      X("Kelgan hisobotlarni kiriting va tasdiqqa yuboring", "Внесите поступившие отчёты и отправьте их на утверждение"),
    ],
    haftalik: [
      X("Ochiq buyurtmalarning hisobot muddatini tekshiring", "Проверьте срок отчёта по открытым заказам"),
      X("«Qarorlar» sahifasida «Men yuborganlar» ro'yxatidan javobni kuzating", "Следите за ответом в списке «Men yuborganlar» на странице «Qarorlar»"),
    ],
    oylik: [
      X("Baholanmagan aktivlarga buyurtma bering", "Оформите заказы на неоценённые активы"),
      X("Sug'urta summasi bahodan past polislarni obyekt menejeriga bildiring", "Сообщите менеджеру по объектам о полисах со страховой суммой ниже оценки"),
    ],
    ekranlar: ["baholash.html", "baholash-buyurtma.html", "baholash-hisobot-kiritish.html", "baholash-hisobot.html", "sugurta.html", "tasdiqlar.html"],
    mumkin: [
      X("Baholash buyurtmasi beradi va hisobot kiritadi", "Оформляет заказ на оценку и вносит отчёт"),
      X("Sug'urta polisi va zaxira ma'lumotini kiritadi", "Вносит страховые полисы и данные по резерву"),
    ],
    mumkinEmas: [
      X("O'z bahosini o'zi tasdiqlay olmaydi: uni Rahbariyat yoki Buxgalteriya tasdiqlaydi", "Не может утвердить собственную оценку: её утверждает Руководство или Бухгалтерия"),
      X("Himoya, ko'rik va undiruv bo'limlarini ko'rmaydi", "Не видит разделы охраны, осмотров и взыскания"),
    ],
    sayohat: "baholash-tanishuv",
  },

  realizatsiya: {
    nom: "Realizatsiya mutaxassisi",
    maqsad: X("Siz aktivni sotishgacha olib borasiz: sotish usuli, lot, xaridor taklifi, shartnoma va to'lovlar.",
            "Вы доводите актив до продажи: способ продажи, лот, предложение покупателя, договор и платежи."),
    qadamlar: [
      {nom: X("Sotuv rejasini tuzing", "Составьте план продаж"),
       izoh: X("Har bir aktiv uchun sotish usulini tanlang: E-auksion, to'g'ridan-to'g'ri, bo'lib to'lash, lizing yoki ijara.",
               "Для каждого актива выберите способ продажи: электронный аукцион, прямая продажа, рассрочка, лизинг или аренда."),
       havola: "realizatsiya.html", havolaNomi: X("Sotuv rejasi", "План продаж"), rasm: "assets/yordam/realizatsiya-doska.webp"},
      {nom: X("Lot yarating", "Создайте лот"),
       izoh: X("Boshlang'ich narx, zakalat va sanalarni kiriting. Tizim e'lon va savdo orasidagi muddatni tekshiradi.",
               "Внесите начальную цену, задаток и даты. Система проверяет срок между объявлением и торгами."),
       havola: "lotlar.html", havolaNomi: X("E-auksion lotlari", "Лоты электронного аукциона"), rasm: "assets/yordam/realizatsiya-lot.webp"},
      {nom: X("Takliflarni qarorga yuboring", "Отправляйте предложения на решение"),
       izoh: X("Xaridorni AML va affillanganlik bo'yicha tekshiring. Taklif rahbariyat qarori bilan qabul qilinadi.",
               "Проверьте покупателя на ПОД/ФТ и аффилированность. Предложение принимается решением руководства."),
       havola: "takliflar.html", havolaNomi: X("Takliflar", "Предложения"), rasm: "assets/yordam/realizatsiya-taklif.webp"},
      {nom: X("Shartnoma va to'lovlarni yuriting", "Ведите договоры и платежи"),
       izoh: X("Bo'lib to'lashda to'lov jadvali tuziladi, kechikkan to'lov alohida belgilanadi.",
               "При рассрочке составляется график платежей, просроченный платёж отмечается отдельно."),
       havola: "shartnomalar.html", havolaNomi: X("Shartnomalar", "Договоры")},
    ],
    javobgarlik: [
      X("Sotuv rejasining bajarilishi", "Выполнение плана продаж"),
      X("Lot muddatlarining VM 18 talablariga mosligi", "Соответствие сроков лота требованиям ПКМ 18"),
      X("Shartnoma bo'yicha to'lovlar nazorati", "Контроль платежей по договорам"),
    ],
    meyor: [
      X("E'londan savdogacha kamida 30 kun o'tadi", "От объявления до торгов проходит не меньше 30 дней"),
      X("O'tkazilmagan savdodan keyin takroriy savdo kamida 10 kundan keyin", "Повторные торги — не раньше чем через 10 дней после несостоявшихся"),
      X("G'olib 5 ish kunida to'laydi, shartnoma 10 ish kunida tuziladi", "Победитель оплачивает в течение 5 рабочих дней, договор заключается в течение 10 рабочих дней"),
      X("Bo'lib to'lashda avans kamida 15%", "При рассрочке аванс не меньше 15%"),
    ],
    yopiq: [X("Boshqaruv paneli", "Панель управления"), X("Himoya va monitoring", "Охрана и мониторинг"), X("Ko'rik va inventarizatsiya", "Осмотры и инвентаризация"), X("Undiruv va sud", "Взыскание и суд"), X("Foydalanuvchilar, rollar va integratsiyalarni boshqarish", "Управление пользователями, ролями и интеграциями")],
    kunlik: [
      X("Yangi takliflarni ko'rib chiqing: AML natijasi, keyin qarorga yuboring", "Рассмотрите новые предложения: результат ПОД/ФТ, затем отправка на решение"),
      X("Muddati o'tgan to'lovlar bo'yicha xaridor bilan bog'laning", "Свяжитесь с покупателями по просроченным платежам"),
    ],
    haftalik: [
      X("Savdo sanasi yaqin lotlarning shartlarini tekshiring", "Проверьте условия лотов с близкой датой торгов"),
      X("O'tkazilmagan savdolar bo'yicha takroriy savdo yoki narx pasaytirishni tayyorlang", "По несостоявшимся торгам подготовьте повторные торги или снижение цены"),
    ],
    oylik: [
      X("3 oy sotilmagan lotlar uchun narx pasaytirish so'rovini yuboring", "Отправьте запрос на снижение цены по лотам, не проданным 3 месяца"),
      X("Ijara to'lovlari va sotilguncha ijara shartnomalarini solishtiring", "Сверьте арендные платежи и договоры аренды до продажи"),
    ],
    ekranlar: ["realizatsiya.html", "lotlar.html", "lot.html", "takliflar.html", "shartnomalar.html", "shartnoma.html", "ijara.html"],
    mumkin: [
      X("Lot yaratadi, e'lon qiladi va savdo natijasini kiritadi", "Создаёт лот, публикует его и вносит результат торгов"),
      X("Taklif kiritadi va Rahbariyat qaroriga yuboradi", "Вносит предложение и отправляет его на решение Руководства"),
      X("Shartnoma tuzadi, to'lovni qabul qiladi, ijaraga beradi", "Заключает договор, принимает платежи, сдаёт в аренду"),
      X("Narx pasaytirish va balansdan chiqarish so'rovini yuboradi", "Отправляет запросы на снижение цены и на списание"),
    ],
    mumkinEmas: [
      X("Taklif va narx pasaytirishni o'zi tasdiqlamaydi: buni Rahbariyat qiladi", "Не утверждает предложение и снижение цены сам: это делает Руководство"),
      X("Himoya, ko'rik va undiruv bo'limlarini ko'rmaydi", "Не видит разделы охраны, осмотров и взыскания"),
    ],
    sayohat: "realizatsiya-tanishuv",
  },

  yurist: {
    nom: "Yurist",
    maqsad: X("Siz muammoli kreditni undiruvdan balansga qabulgacha olib borasiz va qabul qilingan aktivning huquqini rasmiylashtirasiz.",
            "Вы ведёте проблемный кредит от взыскания до приёма на баланс и оформляете право на принятый актив."),
    qadamlar: [
      {nom: X("Undiruv ishlarini yuriting", "Ведите дела о взыскании"),
       izoh: X("Ish bosqichlari: ogohlantirish, da'vo, sud, qaror, ijro. Har bir o'tish ish tarixiga yoziladi.",
               "Этапы дела: предупреждение, иск, суд, решение, исполнение. Каждый переход записывается в историю дела."),
       havola: "undiruv.html", havolaNomi: X("Undiruv ishlari", "Дела о взыскании"), rasm: "assets/yordam/yurist-doska.webp"},
      {nom: X("Da'vo tayyorlang", "Подготовьте иск"),
       izoh: X("Qarz, garov va shartnoma ma'lumotlari ishdan olinadi.", "Данные о долге, залоге и договоре берутся из дела."),
       havola: "davo-tayyorlash.html", havolaNomi: X("Da'vo tayyorlash", "Подготовка иска")},
      {nom: X("Sud majlislarini kuzating", "Следите за судебными заседаниями"),
       izoh: X("Majlis sanasi, sud, zal va advokat kalendarda ko'rinadi.", "Дата заседания, суд, зал и адвокат видны в календаре."),
       havola: "sud-kalendar.html", havolaNomi: X("Sud kalendari", "Судебный календарь"), rasm: "assets/yordam/yurist-kalendar.webp"},
      {nom: X("Huquqni rasmiylashtiring", "Оформите право"),
       izoh: X("Ijro tugagach aktiv balansga qabul qilinadi. Keyin kadastr yoki YHXXda bank nomiga qayd etiladi.",
               "После исполнения актив принимается на баланс. Затем он регистрируется на банк в кадастре или ГУБДД."),
       havola: "rasmiylashtirish.html", havolaNomi: X("Huquqni rasmiylashtirish", "Оформление права"), rasm: "assets/yordam/yurist-rasmiylashtirish.webp"},
    ],
    javobgarlik: [
      X("Undiruv ishlarining bosqich muddatlari", "Сроки этапов дел о взыскании"),
      X("Sud hujjatlari va qarorlarning to'liqligi", "Полнота судебных документов и решений"),
      X("Balansga olingan aktiv huquqining rasmiylashtirilishi", "Оформление права на актив, принятый на баланс"),
    ],
    meyor: [
      X("Transport YHXXda 10 kun ichida qayta qayd etiladi (VM 683)", "Транспорт перерегистрируется в ГУБДД в течение 10 дней (ПКМ 683)"),
      X("Ko'chmas mulkka huquq kadastr reyestriga kiritilgandan keyin kuchga kiradi", "Право на недвижимость возникает после внесения в кадастровый реестр"),
    ],
    yopiq: [X("Boshqaruv paneli", "Панель управления"), X("Himoya va monitoring", "Охрана и мониторинг"), X("Ko'rik va inventarizatsiya", "Осмотры и инвентаризация"), X("Qiymat, zaxira va sug'urta", "Стоимость, резерв и страхование"), X("Foydalanuvchilar, rollar va integratsiyalarni boshqarish", "Управление пользователями, ролями и интеграциями")],
    kunlik: [
      X("«Yaqin majlislar» blokini ko'ring va natijasi kiritilmagan majlisni yoping", "Просмотрите блок «Yaqin majlislar» и закройте заседания без внесённого результата"),
      X("Nazorat muddati yaqin ishlarni keyingi bosqichga o'tkazing", "Переведите дела с близким контрольным сроком на следующий этап"),
    ],
    haftalik: [
      X("Talabnoma yuborilgan ishlar bo'yicha da'vo tayyorlang", "Подготовьте иски по делам, где направлено требование"),
      X("Qonuniy kuchga kirgan qarorlar bo'yicha ijroga topshiring", "Передайте на исполнение решения, вступившие в силу"),
    ],
    oylik: [
      X("Undiruv hisobotida bosqichlar va filiallar kesimini ko'ring", "Просмотрите в отчёте по взысканию разрез по этапам и филиалам"),
      X("Rasmiylashtirilmagan transport va ko'chmas mulk navbatini bo'shating", "Разберите очередь неоформленного транспорта и недвижимости"),
    ],
    ekranlar: ["undiruv.html", "ish.html", "davo-tayyorlash.html", "sud-kalendar.html", "sud-majlis.html", "qaror-kiritish.html", "rasmiylashtirish.html"],
    mumkin: [
      X("Undiruv ishini ochadi, bosqichini o'zgartiradi va yopadi", "Открывает дело о взыскании, меняет его этап и закрывает"),
      X("Da'vo, majlis va sud qarorini kiritadi", "Вносит иск, заседание и решение суда"),
      X("Garovni balansga qabul qilish uchun Rahbariyat qarorini so'raydi", "Запрашивает решение Руководства о приёме залога на баланс"),
      X("Huquqni rasmiylashtirilgan deb belgilaydi", "Отмечает право как оформленное"),
    ],
    mumkinEmas: [
      X("Garovni balansga qabul qilishni o'zi tasdiqlamaydi", "Не утверждает приём залога на баланс сам"),
      X("Himoya, ko'rik va qiymat bo'limlarini ko'rmaydi", "Не видит разделы охраны, осмотров и стоимости"),
    ],
    sayohat: "yurist-tanishuv",
  },

  buxgalteriya: {
    nom: "Buxgalteriya va risk",
    maqsad: X("Siz zaxira, soliq va Markaziy bank hisobotini yuritasiz. Aktiv qiymati va muddatlari shu hisoblarning asosi.",
            "Вы ведёте резерв, налоги и отчётность для Центрального банка. Стоимость и сроки активов — основа этих расчётов."),
    qadamlar: [
      {nom: X("Zaxira hisobini tekshiring", "Проверьте расчёт резерва"),
       izoh: X("Toifalar bo'yicha zaxira, umidsiz toifaga o'tadigan aktivlar va zaxira yuki dinamikasi.",
               "Резерв по категориям, активы, переходящие в безнадёжную категорию, и динамика резервной нагрузки."),
       havola: "zaxira.html", havolaNomi: X("Zaxira", "Резерв"), rasm: "assets/yordam/buxgalteriya-stavka.webp"},
      {nom: X("Soliq hisobini yuriting", "Ведите налоговый учёт"),
       izoh: X("Mol-mulk solig'i chorak bo'yicha hisoblanadi. Imtiyoz davri tugaydigan aktivlar alohida ko'rsatiladi.",
               "Налог на имущество считается поквартально. Активы, у которых заканчивается льгота, показаны отдельно."),
       havola: "soliq.html", havolaNomi: X("Soliq", "Налог"), rasm: "assets/yordam/buxgalteriya-soliq.webp"},
      {nom: X("MB oylik hisobotini tayyorlang", "Подготовьте ежемесячный отчёт ЦБ"),
       izoh: X("Hisobot oyning 10-sanasigacha topshiriladi. Topshirilgach, uni belgilang.",
               "Отчёт сдаётся до 10-го числа. После сдачи отметьте его."),
       havola: "hisobot-mb.html", havolaNomi: X("MB oylik hisoboti", "Ежемесячный отчёт ЦБ"), rasm: "assets/yordam/buxgalteriya-mb.webp"},
      {nom: X("Saqlash xarajatlarini tahlil qiling", "Проанализируйте расходы на содержание"),
       izoh: X("Qo'riqlash, kommunal, soliq va sug'urta xarajatlari aktiv va toifa kesimida.",
               "Расходы на охрану, коммунальные услуги, налог и страхование в разрезе активов и категорий."),
       havola: "hisobot-xarajat.html", havolaNomi: X("Xarajatlar", "Расходы")},
      {nom: X("Taxminiy parametrlarni tasdiqlang", "Утвердите предварительные параметры"),
       izoh: X("Zaxira oraliq stavkalari va boshqa taxminiy qiymatlarni tekshirib, tasdiqlangan deb belgilang.",
               "Проверьте промежуточные ставки резерва и другие предварительные значения и отметьте их как утверждённые."),
       havola: "sozlamalar.html#parametrlar", havolaNomi: X("Parametrlar", "Параметры")},
    ],
    javobgarlik: [
      X("Zaxira hisobining MB 2696 talablariga mosligi", "Соответствие расчёта резерва требованиям ЦБ 2696"),
      X("Soliq hisobi va to'lov muddatlari", "Налоговый учёт и сроки уплаты"),
      X("MB hisobotining o'z vaqtida topshirilishi", "Своевременная сдача отчёта ЦБ"),
    ],
    meyor: [
      X("Undiruv natijasida olingan mulk 365 kundan keyin umidsiz toifaga o'tadi, zaxira 100%", "Имущество, полученное при взыскании, через 365 дней переходит в безнадёжную категорию, резерв 100%"),
      X("Boshqa foydalanilmayotgan mulk uchun chegara 3 yil", "Для прочего неиспользуемого имущества порог — 3 года"),
      X("MB hisoboti har oyning 10-sanasigacha", "Отчёт ЦБ — до 10-го числа каждого месяца"),
    ],
    yopiq: [X("Boshqaruv paneli", "Панель управления"), X("Himoya va monitoring", "Охрана и мониторинг"), X("Ko'rik va inventarizatsiya", "Осмотры и инвентаризация"), X("Undiruv va sud", "Взыскание и суд"), X("Foydalanuvchilar, rollar va integratsiyalarni boshqarish", "Управление пользователями, ролями и интеграциями")],
    kunlik: [
      X("Zaxira sahifasida «Taxminiy» belgisi bor qiymatlarni ko'ring", "Просмотрите на странице резерва значения с отметкой «Taxminiy»"),
      X("Sotilgan aktivlar bo'yicha QQS bazasini tekshiring", "Проверьте базу НДС по проданным активам"),
    ],
    haftalik: [
      X("Imtiyoz davri 30 kunda tugaydigan aktivlarni ko'ring", "Просмотрите активы, у которых льгота заканчивается через 30 дней"),
      X("To'lanmagan hisob-fakturalarni xarajatlar hisobotida toping", "Найдите неоплаченные счета-фактуры в отчёте по расходам"),
    ],
    oylik: [
      X("Oy yopilgach MB hisoboti raqamlarini yangilang va 10-sanagacha topshiring", "После закрытия месяца обновите цифры отчёта ЦБ и сдайте его до 10-го числа"),
      X("Chorak oxirida soliq hisobini saqlang va to'lovni qayd eting", "В конце квартала сохраните расчёт налога и зафиксируйте оплату"),
      X("Zaxira stavkasi o'zgarsa, Rahbariyat tasdig'iga yuboring", "Если меняется ставка резерва, отправьте её на утверждение Руководства"),
    ],
    ekranlar: ["zaxira.html", "soliq.html", "hisobot-mb.html", "hisobot-xarajat.html", "hisobotlar.html", "hisobot-eksport.html"],
    mumkin: [
      X("Zaxira va soliq hisobini yuritadi, stavka taklifini Rahbariyatga yuboradi", "Ведёт расчёт резерва и налога, отправляет предложение по ставке Руководству"),
      X("Baholash natijasini tasdiqlaydi (Baholovchi yuborgan bo'lsa)", "Утверждает результат оценки (если его прислал Оценщик)"),
      X("MB hisobotini topshirilgan deb belgilaydi, 1-darajali kapitalni kiritadi", "Отмечает отчёт ЦБ как сданный, вносит капитал первого уровня"),
    ],
    mumkinEmas: [
      X("O'zi yuborgan stavka so'rovini tasdiqlay olmaydi", "Не может утвердить запрос по ставке, который отправил сам"),
      X("Boshqaruv paneli, himoya, ko'rik va undiruv bo'limlarini ko'rmaydi", "Не видит панель управления, разделы охраны, осмотров и взыскания"),
    ],
    sayohat: "buxgalteriya-tanishuv",
  },

  xavfsizlik: {
    nom: "Xavfsizlik xizmati",
    maqsad: X("Siz bo'sh turgan aktivlarning himoyasini kuzatasiz: kameralar va datchiklar, qo'riqlash shartnomalari, signallar va hodisalar.",
            "Вы отвечаете за охрану пустующих активов: камеры и датчики, договоры охраны, сигналы и инциденты."),
    qadamlar: [
      {nom: X("Monitoring markazini oching", "Откройте центр мониторинга"),
       izoh: X("Aloqasiz qurilmalar, ochiq hodisalar va qo'riqlanmagan aktivlar bir ekranda.", "Устройства без связи, открытые инциденты и активы без охраны — на одном экране."),
       havola: "himoya.html", havolaNomi: X("Monitoring markazi", "Центр мониторинга"), rasm: "assets/yordam/xavfsizlik-markaz.webp"},
      {nom: X("Signallarga javob bering", "Реагируйте на сигналы"),
       izoh: X("Har bir signalni tekshiring va natijasini yozing. Jiddiy holatda hodisa oching.", "Проверяйте каждый сигнал и записывайте результат. В серьёзном случае откройте инцидент."),
       havola: "kirish-voqealari.html", havolaNomi: X("Signallar va voqealar", "Сигналы и события")},
      {nom: X("Hodisalarni yuriting", "Ведите инциденты"),
       izoh: X("Yuqori jiddiylikdagi hodisa sizga bildirishnoma bilan keladi. IIB arizasi raqami va sanasini kiriting.",
               "Инцидент высокой важности приходит вам уведомлением. Внесите номер и дату заявления в ОВД."),
       havola: "hodisalar.html", havolaNomi: X("Hodisalar", "Инциденты"), rasm: "assets/yordam/xavfsizlik-hodisa.webp"},
      {nom: X("Qurilmalar holatini nazorat qiling", "Контролируйте состояние устройств"),
       izoh: X("Batareyasi past va uzoq vaqt aloqasiz qurilmalar uchun servis topshirig'i bering.", "Для устройств с низким зарядом и долго без связи оформите сервисное задание."),
       havola: "qurilmalar.html", havolaNomi: X("Qurilmalar", "Устройства"), rasm: "assets/yordam/xavfsizlik-qurilmalar.webp"},
      {nom: X("Qo'riqlash shartnomalarini kuzating", "Следите за договорами охраны"),
       izoh: X("Qo'riqlash turi, ijrochi, oylik to'lov va shartnoma muddati.", "Вид охраны, исполнитель, ежемесячный платёж и срок договора."),
       havola: "qoriqlash.html", havolaNomi: X("Qo'riqlash shartnomalari", "Договоры охраны")},
    ],
    javobgarlik: [
      X("Qurilmalarning aloqada bo'lishi", "Связь с устройствами"),
      X("Hodisalarga o'z vaqtida javob", "Своевременная реакция на инциденты"),
      X("Qo'riqlash shartnomalarining uzluksizligi", "Непрерывность договоров охраны"),
    ],
    meyor: [
      X("Qurilma 24 soatdan ortiq aloqasiz bo'lsa, vazifa ochiladi", "Если устройство без связи больше 24 часов, открывается задача"),
      X("Kamera video arxivining muddati Sozlamalarda qayd etiladi va kamera tizimida o'rnatiladi", "Срок хранения видеоархива фиксируется в Настройках и выставляется в системе видеонаблюдения"),
    ],
    yopiq: [X("Boshqaruv paneli", "Панель управления"), X("Qiymat, zaxira va sug'urta", "Стоимость, резерв и страхование"), X("Realizatsiya", "Реализация"), X("Undiruv va sud", "Взыскание и суд"), X("Foydalanuvchilar, rollar va integratsiyalarni boshqarish", "Управление пользователями, ролями и интеграциями")],
    kunlik: [
      X("Monitoring markazida so'nggi signallar va 24 soatdan ortiq jim qurilmalarni ko'ring", "Просмотрите в центре мониторинга последние сигналы и устройства, молчащие больше 24 часов"),
      X("Yangi hodisalarni qabul qiling, mas'ul belgilang va chorani yozing", "Примите новые инциденты, назначьте ответственного и опишите меры"),
      X("Kirish so'rovlarini tasdiqlang yoki sababini yozib rad eting", "Утвердите запросы на доступ или отклоните их с указанием причины"),
    ],
    haftalik: [
      X("Batareyasi 20% dan past qurilmalarga servis topshirig'i bering", "Оформите сервисные задания для устройств с зарядом ниже 20%"),
      X("7 kunda tugaydigan ruxsatlarni uzaytiring yoki to'xtating", "Продлите или остановите допуски, которые истекают через 7 дней"),
    ],
    oylik: [
      X("30 kunda tugaydigan qo'riqlash shartnomalarini uzaytiring", "Продлите договоры охраны, которые истекают через 30 дней"),
      X("Himoya hisobotida hal qilish vaqti va rad etilgan kirishlarni tahlil qiling", "Проанализируйте в отчёте по охране время решения и отклонённые входы"),
    ],
    ekranlar: ["himoya.html", "hodisalar.html", "hodisa.html", "qurilmalar.html", "qurilma.html", "kirish-voqealari.html", "ruxsatlar.html", "tashriflar.html", "qoriqlash.html"],
    mumkin: [
      X("Qurilma o'rnatadi, servis topshirig'i beradi, qurilma holatini o'zgartiradi", "Устанавливает устройства, даёт сервисные задания, меняет состояние устройства"),
      X("Hodisani qabul qiladi, mas'ul belgilaydi, hal qiladi va yopadi", "Принимает инцидент, назначает ответственного, решает и закрывает его"),
      X("Kirish so'rovini tasdiqlaydi, ruxsat beradi va to'xtatadi", "Утверждает запрос на доступ, выдаёт и останавливает допуски"),
      X("Masofadan ochish qarorini asos bilan jurnalga yozadi", "Записывает в журнал решение об удалённом открытии с основанием"),
    ],
    mumkinEmas: [
      X("Qiymat, realizatsiya va undiruv bo'limlarini ko'rmaydi", "Не видит разделы стоимости, реализации и взыскания"),
      X("Aktiv kartochkasini tahrirlamaydi", "Не редактирует карточку актива"),
    ],
    sayohat: "xavfsizlik-tanishuv",
  },
};

/* ------------------------------------------------------------
   Sahifa maqolalari. Kalit — fayl nomi. Maydonlar:
   sarlavha, nimaUchun, bloklar [{nom, izoh}], amallar [{nom, izoh}] (izohda: bosilgach nima bo'ladi),
   xatolar [..] (ko'p uchraydigan xatolar), qoidalar [..], bogliq [fayllar].
   Kim ishlatishi qollanma.html da rollar huquqidan hisoblanadi.
   ------------------------------------------------------------ */
window.MKB_YORDAM = {

  /* ================= Boshqaruv paneli ================= */
  "panel.html": {
    sarlavha: X("Boshqaruv paneli", "Панель управления"),
    nimaUchun: X("Rahbariyat va filial rahbari kunni shu yerdan boshlaydi. Panel bugun nima qaror kutayotganini, qaysi muddat o'tganini va qayerda xavf borligini ko'rsatadi. Filial rahbari faqat o'z filiali raqamlarini ko'radi.",
                 "Руководство и руководитель филиала начинают день отсюда. Панель показывает, какие решения ждут сегодня, какие сроки прошли и где есть риск. Руководитель филиала видит только цифры своего филиала."),
    bloklar: [
      B("Bugun", "Сегодня", "To'rt qator: qaroringizni kutayotgan so'rovlar, kechadan beri muddati o'tgan ishlar, qiymati pasaygan obyektlar va eng katta xavflar. Qatorni bossangiz, filtrlangan ro'yxat ochiladi.",
        "Четыре строки: запросы, ждущие вашего решения, дела, просроченные со вчерашнего дня, объекты с упавшей стоимостью и крупнейшие риски. Нажмите на строку, чтобы открыть отфильтрованный список."),
      B("Asosiy ko'rsatkichlar", "Основные показатели", "Balans qiymati, zaxira yuki, 90 kunda umidsizga o'tadigan aktivlar, yillik reja va oylik saqlash xarajati. Har bir raqam o'z ro'yxatiga olib boradi.",
        "Балансовая стоимость, резервная нагрузка, активы, которые через 90 дней станут безнадёжными, годовой план и ежемесячные расходы на содержание. Каждая цифра ведёт к своему списку."),
      B("Qarorlar navbati", "Очередь решений", "Muddati eng yaqin so'rovlar. «Tasdiqlash» va «Rad etish» shu yerda ham ishlaydi va «Qarorlar» sahifasidagi oyna bilan bir xil.",
        "Запросы с ближайшим сроком. Кнопки «Tasdiqlash» и «Rad etish» работают и здесь — так же, как на странице «Qarorlar»."),
      B("Umidsizga o'tish arafasida", "На пороге безнадёжной категории", "Chegaraga eng yaqin aktivlar va 100% zaxiraga o'tganda qo'shiladigan summa.",
        "Активы, ближайшие к порогу, и сумма, которая добавится при переходе на резерв 100%."),
      B("Muddat kesimi, realizatsiya voronkasi, hudud kesimi", "Разрез по срокам, воронка реализации, разрез по регионам", "Portfel qayerda to'planganini ko'rsatadi. Bloklarni «Panel bloklarini tanlash» tugmasi bilan yashirish yoki qaytarish mumkin.",
        "Показывают, где сосредоточен портфель. Блоки можно скрыть или вернуть кнопкой «Panel bloklarini tanlash»."),
    ],
    amallar: [
      B("Qarorlarni ko'rib chiqish", "Рассмотреть решения", "«Qarorlar» sahifasi «Mendan kutilmoqda» ko'rinishida ochiladi.", "Открывается страница «Qarorlar» в представлении «Mendan kutilmoqda»."),
      B("Tasdiqlash", "Утвердить", "Oynada «Nima o'zgaradi» qatorlari chiqadi: summa, holat va lot narxi. Tasdiqlagach so'rov «Hal qilinganlar»ga o'tadi, bog'liq yozuv (lot, taklif, aktiv) darhol yangilanadi.",
        "В окне появляются строки «Nima o'zgaradi»: сумма, статус и цена лота. После утверждения запрос переходит в «Hal qilinganlar», связанная запись (лот, предложение, актив) обновляется сразу."),
      B("Rad etish", "Отклонить", "Sabab majburiy, kamida 5 belgi. Sabab so'rov muallifiga ko'rinadi.", "Причина обязательна, не меньше 5 символов. Её увидит автор запроса."),
      B("Kengash uchun hisobot", "Отчёт для правления", "Panel raqamlaridan bir sahifalik A4 varaq tuziladi va chop etish oynasi ochiladi. Varaqda kim va qachon chop etgani yoziladi.",
        "Из цифр панели собирается одностраничный лист A4 и открывается окно печати. На листе указано, кто и когда его распечатал."),
    ],
    xatolar: [
      X("O'zingiz yuborgan so'rovda tasdiqlash tugmasi bo'lmaydi. Bu xato emas: so'rovni boshqa xodim tasdiqlaydi", "В запросе, который вы отправили сами, кнопки утверждения нет. Это не ошибка: запрос утверждает другой сотрудник"),
      X("«Yillik realizatsiya rejasi» bo'sh bo'lsa, ijro foizi hisoblanmaydi. Rejani «Rejani kiritish» orqali kiriting", "Если «Yillik realizatsiya rejasi» пуст, процент исполнения не считается. Внесите план через «Rejani kiritish»"),
    ],
    qoidalar: [
      X("Panel ma'lumoti har ochilganda qayta hisoblanadi. «Yangilandi» yonidagi tugma raqamlarni qo'lda yangilaydi", "Данные панели пересчитываются при каждом открытии. Кнопка рядом с «Yangilandi» обновляет цифры вручную"),
    ],
    bogliq: ["tasdiqlar.html", "muddatlar.html", "realizatsiya.html", "hisobot-mb.html"],
  },

  "panel-obyekt.html": {
    sarlavha: X("Obyekt menejeri paneli", "Панель менеджера по объектам"),
    nimaUchun: X("Obyekt menejerining ish navbati. Bu yerda bugun nima qilish kerakligi muddat tartibida turadi: vazifalar, qabul navbati, rasmiylashtirish va kommunal arizalar.",
                 "Рабочая очередь менеджера по объектам. Здесь по срокам выстроено всё, что нужно сделать сегодня: задачи, очередь приёма, оформление и коммунальные заявки."),
    bloklar: [
      B("Mening navbatim", "Моя очередь", "Sizga biriktirilgan vazifalar, muddati eng yaqini tepada. Belgini bossangiz vazifa bajarildi deb yoziladi.", "Назначенные вам задачи, ближайшие по сроку — сверху. Нажмите отметку, и задача запишется как выполненная."),
      B("Balansga qabul navbati", "Очередь приёма на баланс", "Ijro bosqichiga yetgan undiruv ishlari. «Qabul qilish» tugmasi qabul formasini shu ish ma'lumoti bilan ochadi.", "Дела о взыскании на этапе исполнения. Кнопка «Qabul qilish» открывает форму приёма с данными этого дела."),
      B("Rasmiylashtirish", "Оформление", "Huquqi ro'yxatdan o'tmagan obyektlar va yetishmayotgan hujjatlar soni.", "Объекты без зарегистрированного права и число недостающих документов."),
      B("Yaqinda ochilganlar", "Недавно открытые", "Siz oxirgi ochgan obyekt, lot va ishlar. Ro'yxat faqat sizga ko'rinadi.", "Объекты, лоты и дела, которые вы открывали последними. Список виден только вам."),
      B("Kommunal arizalar, qo'riqlanmayotgan obyektlar", "Коммунальные заявки, объекты без охраны", "Muddati o'tgan arizalar va na shartnoma, na qurilma bo'lmagan obyektlar.", "Просроченные заявки и объекты, где нет ни договора, ни устройства."),
    ],
    amallar: [
      B("Vazifani bajarildi deb belgilash", "Отметить задачу выполненной", "Vazifa darhol yopiladi. Pastda «Qaytarish» tugmasi 8 soniya turadi: adashsangiz bosing yoki Ctrl+Z.", "Задача закрывается сразу. Внизу 8 секунд видна кнопка «Qaytarish»: если ошиблись, нажмите её или Ctrl+Z."),
      B("Qoldirish", "Отложить", "Vazifani tanlangan sanagacha navbatdan olib turadi. Sana kelganda vazifa qaytib chiqadi.", "Убирает задачу из очереди до выбранной даты. В этот день она вернётся."),
      B("Balansga qabul", "Приём на баланс", "Uch qadamli qabul formasi ochiladi.", "Открывается трёхшаговая форма приёма."),
    ],
    xatolar: [X("Qoldirilgan vazifa «Barcha vazifalar» sahifasida ko'rinadi, navbatda esa sanasi kelguncha chiqmaydi", "Отложенная задача видна на странице «Barcha vazifalar», а в очереди появится только в назначенный день")],
    qoidalar: [X("Balansga qabuldan keyin birinchi ko'rik 72 soat ichida o'tkaziladi", "Первый осмотр проводится в течение 72 часов после приёма на баланс")],
    bogliq: ["vazifalar.html", "qabul-boshlash.html", "rasmiylashtirish.html", "kommunal.html"],
  },

  "panel-nazorat.html": {
    sarlavha: X("Ko'rik va xavfsizlik paneli", "Панель осмотров и безопасности"),
    nimaUchun: X("Inspektorning ish kuni shu yerdan boshlanadi: bugungi va kechikkan ko'riklar, ochiq hodisalar, nosoz qurilmalar va sug'urtasiz aktivlar.",
                 "Рабочий день инспектора начинается здесь: сегодняшние и просроченные осмотры, открытые инциденты, неисправные устройства и активы без страховки."),
    bloklar: [
      B("Ko'riklar doirasi", "Охват осмотров", "Sizga tayinlangan ko'rik bo'lsa, tepada tanlov chiqadi: «Mening ko'riklarim» — sizga tayinlanganlari, «Barcha ko'riklar» — filialdagi hammasi. Tanlov raqamlarga ham ta'sir qiladi va eslab qolinadi.",
        "Если у вас есть назначенные осмотры, вверху появляется переключатель: «Mening ko'riklarim» — назначенные вам, «Barcha ko'riklar» — все по филиалу. Выбор влияет и на цифры, и запоминается."),
      B("Ko'rsatkichlar qatori", "Строка показателей", "Besh raqam: 7 kundagi rejadagi ko'riklar, kechikkanlar, ochiq hodisalar, sug'urtasiz aktivlar va 24 soatdan ortiq aloqasiz qurilmalar. Har biri o'z ro'yxatini ochadi.",
        "Пять цифр: плановые осмотры на 7 дней, просроченные, открытые инциденты, активы без страховки и устройства без связи более 24 часов. Каждая открывает свой список."),
      B("Ko'rik navbati", "Очередь осмотров", "Uch guruh: Kechikkan, Bugun, Rejada. Har qatorda inspektor va qancha kun o'tgani yoki qolgani yozilgan.", "Три группы: Просроченные, Сегодня, По плану. В каждой строке — инспектор и сколько дней прошло или осталось."),
      B("Ochiq hodisalar", "Открытые инциденты", "Jiddiylik bo'yicha tartiblangan. Hodisani bossangiz, uning sahifasi ochiladi.", "Отсортированы по важности. Нажмите на инцидент, чтобы открыть его страницу."),
      B("Qurilma nosozliklari", "Неисправности устройств", "Uzoq aloqasiz va batareyasi past qurilmalar.", "Устройства, долго находящиеся без связи, и устройства с низким зарядом."),
      B("Sug'urtasiz aktivlar", "Активы без страховки", "Talab qilingan polis amalda bo'lmagan aktivlar.", "Активы, у которых нет действующего обязательного полиса."),
    ],
    amallar: [
      B("Ko'rikni boshlash", "Начать осмотр", "Eng shoshilinch ko'rikning dalolatnoma formasi ochiladi.", "Открывается форма акта самого срочного осмотра."),
      B("O'tkazish", "Провести", "Tanlangan ko'rikning dalolatnoma formasi ochiladi.", "Открывается форма акта выбранного осмотра."),
    ],
    xatolar: [X("Kechikkan ko'rik filial rahbariga eskalatsiya bo'ladi. Ko'rikni o'tkazolmasangiz, «Kechikkanlar» sahifasida sababini yozib ko'chiring", "Просроченный осмотр эскалируется руководителю филиала. Если провести его нельзя, перенесите на странице «Kechikkanlar» с указанием причины")],
    qoidalar: [X("Binoli aktiv 90 kunda, transport 30 kunda bir marta ko'rikdan o'tadi", "Актив со зданием осматривается раз в 90 дней, транспорт — раз в 30 дней")],
    bogliq: ["korik-rejasi.html", "korik-otkazish.html", "hodisalar.html", "sugurta.html"],
  },

  /* ================= Balans aktivlari ================= */
  "obyektlar.html": {
    sarlavha: X("Aktivlar reyestri", "Реестр активов"),
    nimaUchun: X("Bank balansidagi barcha aktivlar ro'yxati. Shu yerdan aktivni topasiz, kartochkasini ochasiz, bir nechta aktivga birdan ko'rik yoki vazifa berasiz.",
                 "Список всех активов на балансе банка. Здесь вы находите актив, открываете его карточку и назначаете осмотр или задачу сразу нескольким активам."),
    bloklar: [
      B("Ko'rsatkichlar", "Показатели", "Balansdagi aktivlar, umidsiz toifadagilar, 90 kunda umidsizga o'tadiganlar va baholanmaganlar. Kartani bossangiz, jadval shu bo'yicha filtrlanadi.", "Активы на балансе, безнадёжные, переходящие в безнадёжные через 90 дней и неоценённые. Нажмите на карточку, чтобы отфильтровать таблицу."),
      B("Ko'rinish", "Представление", "Tayyor ko'rinishlar: «Umidsizga 90 kun qolgan», «Qo'riqsiz», «Kommunal uzilgan». O'z filtrlaringizni nom berib saqlashingiz mumkin, havolasini hamkasbga yuborsa bo'ladi.", "Готовые представления: «Umidsizga 90 kun qolgan», «Qo'riqsiz», «Kommunal uzilgan». Свои фильтры можно сохранить под именем и отправить коллеге ссылку."),
      B("Jadval va Kartalar", "Таблица и карточки", "Bir xil ro'yxat ikki ko'rinishda. «Ustunlar» tugmasi bilan kerakli ustunlarni tanlaysiz; CSV faqat ko'rinib turgan ustunlarni oladi.", "Один и тот же список в двух видах. Кнопкой «Ustunlar» выберите нужные столбцы; CSV выгружает только видимые столбцы."),
    ],
    amallar: [
      B("Balansga qabul qilish", "Принять на баланс", "Uch qadamli qabul formasi ochiladi.", "Открывается трёхшаговая форма приёма."),
      B("CSV fayldan qo'shish", "Добавить из CSV-файла", "To'rt qadam: fayl, ustunlarni moslash, tekshiruv va saqlash. Faqat xatosiz qatorlar yoziladi, rad etilganlari alohida CSV bo'lib yuklab olinadi.", "Четыре шага: файл, сопоставление столбцов, проверка и сохранение. Записываются только строки без ошибок, отклонённые можно скачать отдельным CSV."),
      B("Qatorlarni belgilab «Ko'rik tayinlash» yoki «Vazifa berish»", "Отметить строки и выбрать «Ko'rik tayinlash» или «Vazifa berish»", "Oynada nechta aktiv tanlangani va birinchi nomlar ko'rsatiladi. Tasdiqlagach har bir aktivga alohida yozuv ochiladi, xato bo'lgan qator ro'yxatda qoladi.", "В окне видно, сколько активов выбрано, и первые названия. После подтверждения по каждому активу создаётся отдельная запись, строки с ошибкой остаются в списке."),
    ],
    xatolar: [
      X("Filtr qo'yilganini unutib, aktiv «yo'qolgan» deb o'ylash. Jadval ustidagi «Filtrlarni tozalash» tugmasini bosing", "Забыть про фильтр и решить, что актив «пропал». Нажмите «Filtrlarni tozalash» над таблицей"),
      X("CSV faylni Excel'dan boshqa kodlashda saqlash. UTF-8 va Windows-1251 ikkalasi ham o'qiladi, ajratgich nuqtali vergul yoki vergul", "Сохранять CSV из Excel в другой кодировке. Читаются и UTF-8, и Windows-1251, разделитель — точка с запятой или запятая"),
    ],
    qoidalar: [X("Filial rahbari faqat o'z filiali aktivlarini ko'radi", "Руководитель филиала видит только активы своего филиала")],
    bogliq: ["obyekt.html", "qabul-boshlash.html", "muddatlar.html", "xarita.html"],
  },

  "muddatlar.html": {
    sarlavha: X("Muddatlar", "Сроки"),
    nimaUchun: X("Har bir aktiv balansda qancha turgani va qachon umidsiz toifaga o'tishi. Umidsiz toifada zaxira balans qiymatining 100% bo'ladi, shuning uchun bu sahifa sotuvni qachon tezlashtirish kerakligini ko'rsatadi.",
                 "Сколько каждый актив находится на балансе и когда он перейдёт в безнадёжную категорию. В безнадёжной категории резерв равен 100% балансовой стоимости, поэтому страница показывает, когда нужно ускорить продажу."),
    bloklar: [
      B("Umidsiz toifaga o'tadi", "Перейдут в безнадёжную категорию", "30, 60 va 90 kun ichida chegaraga yetadigan aktivlar. «Ro'yxatni ko'rish» jadvalni shu guruh bilan filtrlaydi.", "Активы, которые достигнут порога в течение 30, 60 и 90 дней. «Ro'yxatni ko'rish» фильтрует таблицу по этой группе."),
      B("Obyektlar muddati", "Сроки объектов", "Jadvalda qabul sanasi, chegara sanasi va qolgan kun. «Oylar bo'yicha» ko'rinishi qaysi oyda nechta aktiv o'tishini ko'rsatadi.", "В таблице — дата приёма, дата порога и оставшиеся дни. Вид «Oylar bo'yicha» показывает, сколько активов перейдёт в каждом месяце."),
      B("Hisob qoidalari", "Правила расчёта", "Chegaralar qanday hisoblanishi: undiruvdan olingan mulk 365 kun, boshqa mulk 3 yil, soliq imtiyozi 6 oy.", "Как считаются пороги: имущество из взыскания — 365 дней, прочее имущество — 3 года, налоговая льгота — 6 месяцев."),
    ],
    amallar: [B("Qatorni bosish", "Нажать на строку", "Aktiv kartochkasi ochiladi, u yerda keyingi qadam tugmasi turadi.", "Открывается карточка актива, там есть кнопка следующего шага.")],
    xatolar: [X("Balans sanasi kiritilmagan aktiv hisobga kirmaydi. Uni «Balans sanasi kiritilmagan» holatida topib, kartochkada sanani kiriting", "Актив без даты приёма на баланс не попадает в расчёт. Найдите его по статусу «Balans sanasi kiritilmagan» и внесите дату в карточке")],
    qoidalar: [
      X("Undiruv natijasida olingan mulk 365 kundan keyin umidsiz toifaga o'tadi (MB 2696)", "Имущество, полученное при взыскании, через 365 дней переходит в безнадёжную категорию (ЦБ 2696)"),
      X("Boshqa foydalanilmayotgan mulk uchun chegara 1095 kun", "Для прочего неиспользуемого имущества порог — 1095 дней"),
    ],
    bogliq: ["zaxira.html", "realizatsiya.html", "obyektlar.html"],
  },

  "xarita.html": {
    sarlavha: X("Obyektlar xaritasi", "Карта объектов"),
    nimaUchun: X("Aktivlar joylashuvi xaritada. Rang muddat holati, qo'riqlash yoki kommunal holatni ko'rsatadi, qatlamni tepadagi tugmalar bilan almashtirasiz.",
                 "Расположение активов на карте. Цвет показывает статус срока, охрану или коммунальное состояние; слой переключается кнопками сверху."),
    bloklar: [
      B("Qatlamlar", "Слои", "«Muddat holati», «Qo'riqlash», «Kommunal». Legenda xarita yonida turadi.", "«Muddat holati», «Qo'riqlash», «Kommunal». Легенда — рядом с картой."),
      B("Taxminiy joy", "Примерное место", "Koordinatasi kiritilmagan obyektlar hudud markazida uzuq chiziqli doira bilan jamlanadi.", "Объекты без координат собираются в центре региона пунктирным кругом."),
      B("Koordinatasi kiritilmagan", "Координаты не внесены", "Bunday obyektlar ro'yxati. «Kiritish» tugmasi tahrir formasini ochadi.", "Список таких объектов. Кнопка «Kiritish» открывает форму редактирования."),
    ],
    amallar: [B("Kiritish", "Внести", "Obyekt tahriri ochiladi, kenglik va uzunlikni yozasiz. Saqlangach nuqta xaritada aniq joyga o'tadi.", "Открывается редактирование объекта, вы вносите широту и долготу. После сохранения точка переносится на точное место.")],
    xatolar: [X("Kenglik va uzunlikni almashtirib yozish. O'zbekiston uchun kenglik 37–46, uzunlik 55–74 oralig'ida", "Перепутать широту и долготу. Для Узбекистана широта 37–46, долгота 55–74")],
    qoidalar: [],
    bogliq: ["obyektlar.html", "obyekt-tahrir.html"],
  },

  "qabul-boshlash.html": {
    sarlavha: X("Balansga qabul: 1-qadam", "Приём на баланс: шаг 1"),
    nimaUchun: X("Aktivni bank balansiga olish uch qadamda bajariladi. Birinchi qadamda nima qabul qilinishini, qabul asosini va obyekt ma'lumotlarini kiritasiz.",
                 "Приём актива на баланс банка проходит в три шага. На первом шаге вы указываете, что принимается, основание приёма и данные объекта."),
    bloklar: [
      B("Nima qabul qilinadi", "Что принимается", "Yangi obyekt, undiruv ishidan (sud qarori ijrosi tugagan) yoki reyestrdagi dalolatnomasiz obyekt.", "Новый объект, объект из дела о взыскании (исполнение решения завершено) или объект из реестра без акта."),
      B("Qabul asosi", "Основание приёма", "Asos umidsiz toifagacha muddatni belgilaydi: sud qarori, notarial kelishuv va o'zida qoldirish — 1 yil; ixtiyoriy topshirish va boshqa mulk — 3 yil.", "Основание определяет срок до безнадёжной категории: решение суда, нотариальное соглашение и оставление за собой — 1 год; добровольная передача и прочее имущество — 3 года."),
      B("Obyekt ma'lumotlari", "Данные объекта", "Nomi, turi, hududi, mas'ul filial va manzil. Qo'shimcha maydonlar yopiq bo'limda turadi.", "Название, тип, регион, ответственный филиал и адрес. Дополнительные поля — в свёрнутом блоке."),
    ],
    amallar: [
      B("Davom etish", "Продолжить", "Maydonlar tekshiriladi. Xato bo'lsa, forma tepasida ro'yxat chiqadi. Hammasi to'g'ri bo'lsa, 2-qadam ochiladi.", "Поля проверяются. Если есть ошибки, сверху появляется их список. Если всё верно, открывается шаг 2."),
      B("Bekor qilish", "Отмена", "Formadan chiqasiz. Kiritilgan ma'lumot qoralama bo'lib shu qurilmada 7 kun saqlanadi.", "Вы выходите из формы. Введённые данные сохраняются как черновик на этом устройстве на 7 дней."),
    ],
    xatolar: [
      X("Undiruv ishidan kelgan aktivni «Yangi obyekt» sifatida kiritish. Unda asos va sud qarori ishdan olinmaydi", "Вносить актив из дела о взыскании как «Yangi obyekt». Тогда основание и решение суда не подтянутся из дела"),
      X("Sud qarorida undiruv garovga qaratilmagan bo'lsa, ish qabul uchun taklif qilinmaydi. Avval qarorni to'g'rilang", "Если в решении суда взыскание не обращено на залог, дело не предлагается к приёму. Сначала исправьте решение"),
    ],
    qoidalar: [X("Qoralama har 1,5 soniyada saqlanadi. Tab yopilsa ham ma'lumot yo'qolmaydi", "Черновик сохраняется каждые 1,5 секунды. Данные не пропадут, даже если закрыть вкладку")],
    bogliq: ["qabul-hujjatlar.html", "qabul-tasdiqlash.html", "ish.html"],
  },

  "qabul-hujjatlar.html": {
    sarlavha: X("Balansga qabul: 2-qadam", "Приём на баланс: шаг 2"),
    nimaUchun: X("Qabul-topshirish ma'lumotlari: hujjatlar, komissiya a'zolari, hisoblagich ko'rsatkichlari, kalitlar va fotojadval. Ular dalolatnomaga kiradi.",
                 "Данные приёма-передачи: документы, члены комиссии, показания счётчиков, ключи и фототаблица. Всё это войдёт в акт."),
    bloklar: [
      B("Hujjatlar", "Документы", "Asos hujjati va boshqa fayllar. Fayl darhol saqlanadi, qoralama faqat uning raqamini eslab qoladi.", "Документ-основание и другие файлы. Файл сохраняется сразу, черновик запоминает только его номер."),
      B("Komissiya", "Комиссия", "Qabulda qatnashgan xodimlar. Ular dalolatnomada imzo qatorida chiqadi.", "Сотрудники, участвовавшие в приёме. Они появятся в строке подписей акта."),
      B("Hisoblagichlar, kalitlar va jihozlar", "Счётчики, ключи и оборудование", "Binoli obyekt uchun ko'rsatkichlar, kalitlar soni va topshirilgan jihozlar.", "Для объекта со зданием — показания, количество ключей и переданное оборудование."),
      B("Fotojadval va joylashuv", "Фототаблица и местоположение", "«Joriy joylashuvni olish» telefon yoki noutbuk joylashuvini yozadi.", "«Joriy joylashuvni olish» записывает местоположение телефона или ноутбука."),
    ],
    amallar: [
      B("Davom etish", "Продолжить", "3-qadam ochiladi: balans ma'lumotlari.", "Открывается шаг 3: балансовые данные."),
      B("Orqaga", "Назад", "1-qadamga qaytasiz, kiritilgan narsa saqlanib qoladi.", "Возврат к шагу 1, введённое сохраняется."),
    ],
    xatolar: [X("Sahifani to'g'ridan-to'g'ri ochsangiz «Avval 1-qadamni to'ldiring» degan yozuv chiqadi. Qabulni 1-qadamdan boshlang", "Если открыть страницу напрямую, появится «Avval 1-qadamni to'ldiring». Начинайте приём с шага 1")],
    qoidalar: [],
    bogliq: ["qabul-boshlash.html", "qabul-tasdiqlash.html"],
  },

  "qabul-tasdiqlash.html": {
    sarlavha: X("Balansga qabul: 3-qadam", "Приём на баланс: шаг 3"),
    nimaUchun: X("Oxirgi qadam: balans qiymati va sanasi, hisobvaraq va qabul xulosasi. Tizim shu ma'lumotdan umidsiz toifa sanasini va soliq imtiyozi muddatini hisoblaydi.",
                 "Последний шаг: балансовая стоимость и дата, счёт и итог приёма. По этим данным система рассчитывает дату безнадёжной категории и срок налоговой льготы."),
    bloklar: [
      B("Balans ma'lumotlari", "Балансовые данные", "Balans qiymati (mln so'm), qabul sanasi (bugundan keyin bo'lishi mumkin emas) va hisobvaraq.", "Балансовая стоимость (млн сум), дата приёма (не позже сегодняшней) и счёт."),
      B("Qabul xulosasi", "Итог приёма", "Uch qadamda kiritilgan hamma narsa bir joyda: obyekt, asos, hujjatlar, komissiya.", "Всё, что внесено на трёх шагах, в одном месте: объект, основание, документы, комиссия."),
      B("Muddatlar", "Сроки", "Umidsiz toifa, 3 yil chegarasi va soliq imtiyozi tugaydigan sanalar.", "Даты безнадёжной категории, порога 3 лет и окончания налоговой льготы."),
    ],
    amallar: [
      B("Balansga qabul qilish", "Принять на баланс", "Tasdiqlash oynasi obyekt, qiymat va hujjatlar ro'yxatini ko'rsatadi. Tasdiqlagach aktiv reyestrga yoziladi, 72 soatlik birlamchi ko'rik va rasmiylashtirish vazifalari ochiladi.",
        "Окно подтверждения показывает объект, стоимость и список документов. После подтверждения актив записывается в реестр, открываются задачи первичного осмотра за 72 часа и оформления права."),
      B("Dalolatnomani chop etish", "Распечатать акт", "Qabul-topshirish dalolatnomasi ochiladi.", "Открывается акт приёма-передачи."),
    ],
    xatolar: [X("Undiruv ishidan kelgan garov Yurist so'rovi bilan qabul qilinsa, avval Rahbariyat qarori kerak. Qaror kutilayotganda qabul tugmasi o'rniga so'rov holati chiqadi", "Если залог из дела о взыскании принимается по запросу Юриста, сначала нужно решение Руководства. Пока решение ожидается, вместо кнопки приёма показан статус запроса")],
    qoidalar: [
      X("Balansga qabuldan keyin birinchi ko'rik 72 soat ichida o'tkaziladi", "Первый осмотр проводится в течение 72 часов после приёма на баланс"),
      X("Mol-mulk solig'i bo'yicha imtiyoz balansga olingandan 6 oy amal qiladi", "Льгота по налогу на имущество действует 6 месяцев после принятия на баланс"),
    ],
    bogliq: ["qabul-dalolatnoma.html", "obyekt.html", "rasmiylashtirish.html"],
  },

  "qabul-dalolatnoma.html": {
    sarlavha: X("Qabul-topshirish dalolatnomasi", "Акт приёма-передачи"),
    nimaUchun: X("Balansga qabul hujjati: obyekt, asos va balans qiymati, komissiya, hisoblagichlar, kalitlar, fotojadval va imzolar. Chop etib, imzolatasiz.",
                 "Документ о приёме на баланс: объект, основание и балансовая стоимость, комиссия, счётчики, ключи, фототаблица и подписи. Распечатайте и подпишите."),
    bloklar: [B("Dalolatnoma bo'limlari", "Разделы акта", "Raqamlangan bo'limlar qabul formasidan to'ldiriladi. Bo'sh bo'lim chiqmaydi.", "Нумерованные разделы заполняются из формы приёма. Пустые разделы не выводятся.")],
    amallar: [
      B("Chop etish", "Печать", "A4 varaq ochiladi, tepasida bank nomi va kim chop etgani yoziladi.", "Открывается лист A4, сверху — название банка и кто распечатал."),
      B("Dalolatnomani rasmiylashtirish", "Оформить акт", "Imzolangan dalolatnoma rasmiylashtirilgan deb belgilanadi va obyekt hujjatlariga kiradi.", "Подписанный акт отмечается как оформленный и попадает в документы объекта."),
    ],
    xatolar: [X("Dalolatnoma faqat mavjud qabul uchun ochiladi. Manzilda obyekt raqami bo'lmasa, 404 sahifasi chiqadi", "Акт открывается только для существующего приёма. Если в адресе нет номера объекта, откроется страница 404")],
    qoidalar: [],
    bogliq: ["qabul-tasdiqlash.html", "obyekt-hujjatlar.html"],
  },

  "rasmiylashtirish.html": {
    sarlavha: X("Huquqni rasmiylashtirish", "Оформление права"),
    nimaUchun: X("Balansga olingan aktiv bank nomiga qayd etilishi kerak: ko'chmas mulk kadastrda, transport YHXXda. Bu sahifa navbat va kechikishlarni ko'rsatadi.",
                 "Принятый на баланс актив нужно зарегистрировать на банк: недвижимость — в кадастре, транспорт — в ГУБДД. Страница показывает очередь и просрочки."),
    bloklar: [
      B("Ko'rsatkichlar", "Показатели", "Rasmiylashtirilmagan obyektlar, YHXX muddati o'tgan transport, 10 kun ichida qayd etilganlar va taqiqi yechilmaganlar.", "Неоформленные объекты, транспорт с просроченным сроком ГУБДД, зарегистрированные в течение 10 дней и объекты с неснятым запретом."),
      B("Navbat", "Очередь", "Kechikkan kun soni bo'yicha tartiblangan. Filtrlar: tur, muddat va taqiq.", "Отсортирована по дням просрочки. Фильтры: тип, срок и запрет."),
      B("Qonuniy talablar", "Требования закона", "Kadastr va YHXX muddatlari qisqacha.", "Кратко о сроках кадастра и ГУБДД."),
    ],
    amallar: [B("Rasmiylashtirish", "Оформить", "Oynada qayd sanasi va reyestr ko'chirmasi so'raladi. Tasdiqlagach obyekt navbatdan chiqadi, holati «Balansda» bo'ladi va tarixga yoziladi.", "В окне запрашиваются дата регистрации и выписка из реестра. После подтверждения объект уходит из очереди, получает статус «Balansda», запись попадает в историю.")],
    xatolar: [X("YHXX qayd sanasini balansga qabul sanasidan oldin kiritish. Qayd sanasi qabuldan keyin bo'ladi", "Вносить дату регистрации в ГУБДД раньше даты приёма на баланс. Регистрация бывает после приёма")],
    qoidalar: [X("Transport YHXXda 10 kun ichida qayta qayd etiladi (VM 683)", "Транспорт перерегистрируется в ГУБДД в течение 10 дней (ПКМ 683)")],
    bogliq: ["obyekt-hujjatlar.html", "integratsiyalar.html"],
  },

  "arxiv.html": {
    sarlavha: X("Arxiv va chiqim", "Архив и выбытие"),
    nimaUchun: X("Balansdan chiqarilgan aktivlar va chiqimga tayyor turganlar. Har bir chiqimning iqtisodiy natijasi ko'rinadi: tushum, balans qiymati, xarajat va foyda yoki zarar.",
                 "Активы, списанные с баланса, и активы, готовые к выбытию. Виден экономический результат каждого выбытия: выручка, балансовая стоимость, расходы, прибыль или убыток."),
    bloklar: [
      B("Chiqimga tayyor", "Готовы к выбытию", "To'lovi yopilgan yoki davaktivga o'tkazilgan aktivlar.", "Активы с закрытой оплатой или переданные в давактив."),
      B("Balansdan chiqarilgan obyektlar", "Списанные объекты", "Yil va usul bo'yicha filtr. Qatorni bossangiz, arxiv yozuvi ochiladi.", "Фильтр по году и способу. Нажмите на строку, чтобы открыть архивную запись."),
    ],
    amallar: [B("Balansdan chiqarish", "Списать с баланса", "Chiqim formasi ochiladi: obyekt tanlanadi, asos va natija ko'rsatiladi, keyin qaror so'rovi yuboriladi.", "Открывается форма выбытия: выбирается объект, показываются основание и результат, затем отправляется запрос на решение.")],
    xatolar: [],
    qoidalar: [X("Chiqarilgan aktiv o'chirilmaydi, u arxivda saqlanadi", "Списанный актив не удаляется, он хранится в архиве")],
    bogliq: ["chiqim-tasdiqlash.html", "arxiv-obyekt.html", "hisobot-kpi.html"],
  },

  "arxiv-obyekt.html": {
    sarlavha: X("Arxiv yozuvi", "Архивная запись"),
    nimaUchun: X("Balansdan chiqarilgan bitta aktivning yakuniy hisobi: qancha turdi, qancha sarflandi, qanchaga sotildi va qancha zaxira tiklandi.",
                 "Итоговый расчёт по одному списанному активу: сколько находился на балансе, сколько потрачено, за сколько продан и сколько резерва восстановлено."),
    bloklar: [
      B("Iqtisodiy natija", "Экономический результат", "Tushum minus balans qiymati minus saqlash xarajatlari. QQS taxminiy, buxgalteriya tasdiqlaydi.", "Выручка минус балансовая стоимость минус расходы на содержание. НДС предварительный, его подтверждает бухгалтерия."),
      B("Chiqim, balansda, xarajatlar tarkibi, hujjatlar", "Выбытие, период на балансе, структура расходов, документы", "Usul, xaridor, shartnoma; qabul va chiqish sanalari; xarajat toifalari va chiqim hujjatlari.", "Способ, покупатель, договор; даты приёма и выбытия; категории расходов и документы выбытия."),
    ],
    amallar: [],
    xatolar: [],
    qoidalar: [X("Tiklangan zaxira joriy davr daromadiga o'tadi", "Восстановленный резерв относится на доходы текущего периода")],
    bogliq: ["arxiv.html", "hisobot-kpi.html"],
  },

  "chiqim-tasdiqlash.html": {
    sarlavha: X("Balansdan chiqarish", "Списание с баланса"),
    nimaUchun: X("Aktivni balansdan chiqarish ikki kishi bilan bajariladi. Bir xodim so'rov yuboradi, boshqasi (Rahbariyat) tasdiqlaydi. Tasdiqlangach aktiv arxivga o'tadi.",
                 "Списание актива с баланса выполняют два человека. Один сотрудник отправляет запрос, другой (Руководство) утверждает. После утверждения актив переходит в архив."),
    bloklar: [
      B("Chiqimga tayyor obyektlar", "Объекты, готовые к выбытию", "Shartnoma to'lovi yopilgan yoki davaktivdagi aktivlar. «Boshqa obyektni tanlash» reyestrdagi istalgan aktivni hisobdan chiqarish uchun.", "Активы с оплаченным договором или в давактиве. «Boshqa obyektni tanlash» — для списания любого актива из реестра."),
      B("Chiqarish asosi va Moliyaviy natija", "Основание и финансовый результат", "Usul, sana, shartnoma va hisob-kitob: tushum, balans qiymati, xarajat, tiklanadigan zaxira.", "Способ, дата, договор и расчёт: выручка, балансовая стоимость, расходы, восстанавливаемый резерв."),
      B("Yopiladigan shartnomalar", "Закрываемые договоры", "Qo'riqlash shartnomasi va sug'urta polisi chiqim bilan birga yopiladi.", "Договор охраны и страховой полис закрываются вместе с выбытием."),
    ],
    amallar: [
      B("Qaror so'rovini yuborish", "Отправить запрос на решение", "So'rov «Qarorlar»ga tushadi, sizga «So'rov yuborildi» kartasi va javob muddati ko'rinadi. Siz uni tasdiqlay olmaysiz.", "Запрос попадает в «Qarorlar», вы видите карточку «So'rov yuborildi» и срок ответа. Утвердить его сами вы не можете."),
      B("Chiqarishni tasdiqlash", "Утвердить выбытие", "Faqat Rahbariyat uchun. Oynada obyekt raqamini yozib tasdiqlaysiz, bu qaytarib bo'lmaydigan amal. Aktiv arxivga o'tadi.", "Только для Руководства. В окне нужно ввести номер объекта — действие необратимо. Актив переходит в архив."),
      B("Rad etish", "Отклонить", "Sabab majburiy, kamida 5 belgi.", "Причина обязательна, не меньше 5 символов."),
    ],
    xatolar: [X("Yozib tasdiqlash maydoniga obyekt nomini yozish. Obyekt raqamini yozing, masalan AK-2025/1370", "Вписывать в поле подтверждения название объекта. Нужен номер объекта, например AK-2025/1370")],
    qoidalar: [X("Balansdan chiqarish hech qachon ommaviy tasdiqlanmaydi: har bir aktiv alohida", "Списание никогда не утверждается массово: каждый актив отдельно")],
    bogliq: ["tasdiqlar.html", "arxiv.html", "shartnoma.html"],
  },

  "obyekt.html": {
    sarlavha: X("Obyekt kartochkasi", "Карточка объекта"),
    nimaUchun: X("Bitta aktiv haqida hamma narsa. Umumiy tabda keyingi qadam, aktiv yo'li, me'yoriy muddatlar, joriy holat va nazorat indeksi turadi. Qolgan tablar tafsilotga olib boradi.",
                 "Всё об одном активе. Во вкладке «Umumiy» — следующий шаг, путь актива, нормативные сроки, текущее состояние и индекс контроля. Остальные вкладки ведут к деталям."),
    bloklar: [
      B("Shapka", "Шапка", "Nomi, raqami, holati, turi va nazorat indeksi. Tablar: Umumiy, Suratlar, Moliya, Hujjatlar, Ko'riklar, Xarajatlar, Kommunal, Himoya, Sotuv, Tarix.", "Название, номер, статус, тип и индекс контроля. Вкладки: Umumiy, Suratlar, Moliya, Hujjatlar, Ko'riklar, Xarajatlar, Kommunal, Himoya, Sotuv, Tarix."),
      B("Keyingi qadam", "Следующий шаг", "Tizim aktiv uchun eng muhim ishni aytadi, masalan «1 ta majburiy hujjat yetishmaydi», va tugma bilan o'sha ishga olib boradi.", "Система называет самое важное дело по активу, например «1 ta majburiy hujjat yetishmaydi», и кнопкой ведёт к нему."),
      B("Aktiv yo'li", "Путь актива", "Yetti bosqich: balansga qabul, huquqni rasmiylashtirish, baholash, sotuvga tayyorlash, lot, shartnoma, balansdan chiqarish. Joriy bosqich ajratilgan.", "Семь этапов: приём, оформление права, оценка, подготовка к продаже, лот, договор, выбытие. Текущий этап выделен."),
      B("Me'yoriy muddatlar", "Нормативные сроки", "Balansda necha kun turgani, umidsizgacha qolgan kun va 3 yil chegarasi chiziqda.", "Сколько дней на балансе, сколько осталось до безнадёжной категории и порог 3 лет — на шкале."),
      B("Nazorat indeksi", "Индекс контроля", "0 dan 100 gacha: ko'rik, sug'urta, baho, hujjatlar, qo'riqlash. Past ball qaysi band bo'yicha ekanini ochib ko'rsatadi.", "От 0 до 100: осмотр, страховка, оценка, документы, охрана. При низком балле видно, по какому пункту."),
    ],
    amallar: [
      B("Tahrirlash", "Редактировать", "Tahrir formasi ochiladi. Saqlashdan oldin eski va yangi qiymatlar yonma-yon ko'rinadi.", "Открывается форма редактирования. Перед сохранением прежние и новые значения видны рядом."),
      B("Pasport", "Паспорт", "Chop etishga tayyor bir varaqli obyekt pasporti.", "Паспорт объекта на одном листе, готовый к печати."),
      B("Keyingi qadam tugmasi", "Кнопка следующего шага", "Kerakli tab yoki forma ochiladi, masalan «Hujjatlarni yuklash».", "Открывается нужная вкладка или форма, например «Hujjatlarni yuklash»."),
    ],
    xatolar: [X("Holatni tahrirda qo'lda «Lotda» yoki «Chiqarildi» qilishga urinish. Bu holatlar lot, ijara va chiqim amallari orqali o'rnatiladi", "Пытаться вручную поставить статус «Lotda» или «Chiqarildi» в редактировании. Эти статусы ставятся через действия с лотом, арендой и выбытием")],
    qoidalar: [X("Nazorat indeksi saqlanmaydi, har ochilganda joriy ma'lumotdan hisoblanadi", "Индекс контроля не хранится, он считается из текущих данных при каждом открытии")],
    bogliq: ["obyekt-tahrir.html", "obyekt-hujjatlar.html", "obyekt-moliya.html", "obyekt-tarix.html"],
  },

  "obyekt-suratlar.html": {
    sarlavha: X("Obyekt suratlari", "Фотографии объекта"),
    nimaUchun: X("Aktivning haqiqiy suratlari va joylashuv sxemasi. Asosiy surat reyestr, kartochka va pasportda chiqadi.",
                 "Реальные фотографии актива и схема расположения. Главное фото показывается в реестре, карточке и паспорте."),
    bloklar: [B("Galereya", "Галерея", "Har bir surat tagida turi va sanasi. Surat bank tarmog'ida saqlanadi.", "Под каждым фото — тип и дата. Фото хранится в сети банка.")],
    amallar: [
      B("Surat qo'shish", "Добавить фото", "Faylni tashlang yoki tanlang: JPG, PNG yoki WEBP, 20 MB gacha. Fayl darhol saqlanadi.", "Перетащите или выберите файл: JPG, PNG или WEBP до 20 МБ. Файл сохраняется сразу."),
      B("Asosiy qilish", "Сделать главным", "Surat reyestr va kartochkada birinchi bo'lib chiqadi.", "Фото показывается первым в реестре и карточке."),
      B("O'chirish", "Удалить", "Surat galereyadan olinadi, pastda «Qaytarish» tugmasi chiqadi. Fayl o'zi fayllar omborida qoladi.", "Фото убирается из галереи, внизу появляется «Qaytarish». Сам файл остаётся в хранилище."),
    ],
    xatolar: [X("Internetdan olingan yoki boshqa obyekt suratini yuklash. Faqat shu obyektning o'zida olingan suratni qo'ying", "Загружать фото из интернета или другого объекта. Ставьте только снимки, сделанные на самом объекте")],
    qoidalar: [],
    bogliq: ["obyekt.html", "korik-otkazish.html"],
  },

  "obyekt-moliya.html": {
    sarlavha: X("Obyekt moliyasi", "Финансы объекта"),
    nimaUchun: X("Aktiv qiymati va unga bog'liq pul: balans va bozor qiymati, qadrsizlanish, zaxira, saqlash xarajati, sug'urta va soliq.",
                 "Стоимость актива и связанные с ним деньги: балансовая и рыночная стоимость, обесценение, резерв, расходы на содержание, страховка и налог."),
    bloklar: [
      B("Qiymat va qadrsizlanish (MHXS 5)", "Стоимость и обесценение (МСФО 5)", "Aktiv balans qiymati va sof sotish qiymatining kichigida aks etadi.", "Актив отражается по меньшей из балансовой стоимости и чистой стоимости продажи."),
      B("Kutilgan sof natija", "Ожидаемый чистый результат", "Sotuvdan kutilgan natija: ijara daromadi va saqlash xarajati hisobga olinadi.", "Ожидаемый результат продажи с учётом арендного дохода и расходов на содержание."),
      B("Zaxira", "Резерв", "Aktiv toifasi va stavkasi. «Taxminiy» belgisi bo'lsa, stavka hali tasdiqlanmagan.", "Категория и ставка актива. Отметка «Taxminiy» означает, что ставка ещё не утверждена."),
      B("Baholash tarixi, sug'urta polisi, mol-mulk solig'i", "История оценок, страховой полис, налог на имущество", "Oxirgi hisobotlar, amaldagi polis va chorak soliq.", "Последние отчёты, действующий полис и квартальный налог."),
    ],
    amallar: [
      B("Baholashga buyurtma", "Заказать оценку", "Buyurtma formasi shu obyekt bilan ochiladi.", "Открывается форма заказа с этим объектом."),
      B("Polis kiritish", "Внести полис", "Yangi polis formasi ochiladi.", "Открывается форма нового полиса."),
    ],
    xatolar: [],
    qoidalar: [X("Oraliq zaxira stavkasi buxgalteriya tasdiqlagach amalga kiradi. Chegaradan keyin zaxira 100%", "Промежуточная ставка резерва вступает в силу после утверждения бухгалтерией. После порога резерв 100%")],
    bogliq: ["zaxira.html", "baholash.html", "sugurta.html", "soliq.html"],
  },

  "obyekt-hujjatlar.html": {
    sarlavha: X("Obyekt hujjatlari", "Документы объекта"),
    nimaUchun: X("Aktivga tegishli hamma hujjat va joriy bosqichgacha talab qilinadigan majburiy hujjatlar ro'yxati. Yetishmayotgan hujjat nazorat indeksini pasaytiradi.",
                 "Все документы по активу и список обязательных документов до текущего этапа. Недостающий документ снижает индекс контроля."),
    bloklar: [
      B("Obyekt hujjatlari", "Документы объекта", "Bosqich bo'yicha filtr, CSV.", "Фильтр по этапу, CSV."),
      B("Majburiy hujjatlar", "Обязательные документы", "Har bosqich uchun ro'yxat. Yetishmayotgan hujjat yonida «Yuklash» tugmasi turadi.", "Список для каждого этапа. Рядом с недостающим документом — кнопка «Yuklash»."),
    ],
    amallar: [
      B("Hujjat yuklash", "Загрузить документ", "Hujjat turi va faylni tanlaysiz. Saqlangach hujjat ro'yxatga tushadi va majburiy band yopiladi.", "Выберите тип документа и файл. После сохранения документ попадает в список, обязательный пункт закрывается."),
      B("Hujjatni tasdiqlash", "Подтвердить документ", "Hujjat tekshirilgan deb belgilanadi.", "Документ отмечается как проверенный."),
      B("Hujjatni o'chirish", "Удалить документ", "Tasdiqlash oynasi chiqadi, chunki boshqa xodimlar bu hujjatga tayanadi.", "Появляется окно подтверждения: на этот документ опираются другие сотрудники."),
    ],
    xatolar: [X("Hujjatni noto'g'ri turda yuklash: majburiy band yopilmaydi. Turini to'g'ri tanlang", "Загружать документ не того типа: обязательный пункт не закроется. Выберите правильный тип")],
    qoidalar: [],
    bogliq: ["obyekt.html", "rasmiylashtirish.html"],
  },

  "obyekt-koriklar.html": {
    sarlavha: X("Obyekt ko'riklari", "Осмотры объекта"),
    nimaUchun: X("Aktivning barcha ko'riklari va oxirgi ko'rik chek-listi. Keyingi ko'rik sanasi ham shu yerda.",
                 "Все осмотры актива и чек-лист последнего осмотра. Здесь же дата следующего осмотра."),
    bloklar: [
      B("Ko'riklar tarixi", "История осмотров", "Rejadagi, o'tkazilgan va kechikkan ko'riklar, har birining xulosasi.", "Плановые, проведённые и просроченные осмотры с выводами."),
      B("Oxirgi ko'rik chek-listi", "Чек-лист последнего осмотра", "Har band: joyida yoki kamchilik.", "Каждый пункт: на месте или недостаток."),
    ],
    amallar: [B("Ko'rik tayinlash", "Назначить осмотр", "Tayinlash formasi shu obyekt bilan ochiladi.", "Открывается форма назначения с этим объектом.")],
    xatolar: [],
    qoidalar: [X("Binoli aktiv 90 kunda, transport 30 kunda bir marta ko'rikdan o'tadi", "Актив со зданием осматривается раз в 90 дней, транспорт — раз в 30 дней")],
    bogliq: ["korik-tayinlash.html", "korik-akti.html"],
  },

  "obyekt-xarajatlar.html": {
    sarlavha: X("Obyekt xarajatlari", "Расходы по объекту"),
    nimaUchun: X("Aktivni saqlash uchun sarflangan hamma pul: qo'riqlash, kommunal, soliq, sug'urta, baholash, ta'mir va boshqalar.",
                 "Все деньги, потраченные на содержание актива: охрана, коммунальные услуги, налог, страховка, оценка, ремонт и прочее."),
    bloklar: [
      B("Ko'rsatkichlar", "Показатели", "Jami xarajat, oyiga o'rtacha, 1 m² ga va to'lanmagan summa.", "Всего расходов, в среднем в месяц, на 1 м² и неоплаченная сумма."),
      B("Xarajatlar ro'yxati va toifalar", "Список расходов и категории", "Toifa va holat bo'yicha filtr.", "Фильтр по категории и статусу."),
    ],
    amallar: [
      B("Xarajat qo'shish", "Добавить расход", "Sana, toifa, summa va kontragent. Saqlangach xarajat hisobotlarga kiradi.", "Дата, категория, сумма и контрагент. После сохранения расход попадает в отчёты."),
      B("To'landi deb belgilash", "Отметить оплаченным", "Xarajat to'langan bo'ladi.", "Расход становится оплаченным."),
      B("O'chirish", "Удалить", "O'zingiz kiritgan xarajat o'chadi va 8 soniya «Qaytarish» mumkin.", "Внесённый вами расход удаляется, 8 секунд можно нажать «Qaytarish»."),
    ],
    xatolar: [X("Bitta hisob-fakturani ikki marta kiritish. Qo'shishdan oldin ro'yxatni sana bo'yicha ko'ring", "Вносить один счёт-фактуру дважды. Перед добавлением проверьте список по дате")],
    qoidalar: [],
    bogliq: ["hisobot-xarajat.html"],
  },

  "obyekt-kommunal.html": {
    sarlavha: X("Obyekt kommunal xizmatlari", "Коммунальные услуги объекта"),
    nimaUchun: X("Elektr, gaz va suv: ulanish holati, avvalgi egasidan qolgan qarz, hisoblagich ko'rsatkichlari va ta'minotchiga arizalar. Binosiz aktivda bu tab qo'llanmaydi.",
                 "Электричество, газ и вода: статус подключения, долг прежнего владельца, показания счётчиков и заявки поставщику. Для актива без здания вкладка не применяется."),
    bloklar: [
      B("Xizmatlar", "Услуги", "Har xizmat bo'yicha holat, qarz va oxirgi ko'rsatkich.", "По каждой услуге — статус, долг и последнее показание."),
      B("Arizalar", "Заявки", "Shaxsiy hisobni qayta rasmiylashtirish, texnik shart va boshqa arizalar.", "Переоформление лицевого счёта, технические условия и другие заявки."),
    ],
    amallar: [
      B("Ariza qo'shish", "Добавить заявку", "Xizmat, ariza turi va muddat. Muddati o'tsa ariza «Kechikdi» bo'ladi.", "Услуга, вид заявки и срок. При просрочке заявка получает статус «Kechikdi»."),
      B("Ko'rsatkich kiritish", "Внести показание", "Hisoblagich ko'rsatkichi va sanasi saqlanadi.", "Сохраняются показание и дата."),
      B("Arizani yopish", "Закрыть заявку", "Ariza bajarilgan bo'ladi.", "Заявка становится выполненной."),
    ],
    xatolar: [],
    qoidalar: [],
    bogliq: ["kommunal.html"],
  },

  "obyekt-himoya.html": {
    sarlavha: X("Obyekt himoyasi", "Охрана объекта"),
    nimaUchun: X("Aktiv qanday qo'riqlanayotgani: qo'riqlash shartnomasi, o'rnatilgan qurilmalar, ochiq hodisalar, tashriflar va himoya komplekti smetasi.",
                 "Как охраняется актив: договор охраны, установленные устройства, открытые инциденты, посещения и смета комплекта охраны."),
    bloklar: [
      B("Qo'riqlash shartnomasi", "Договор охраны", "Amaldagi shartnoma yoki uning yo'qligi.", "Действующий договор или его отсутствие."),
      B("Qurilmalar", "Устройства", "Har qurilmaning turi, quvvati, aloqasi va batareyasi, «Onlayn» faqat haqiqiy signal bo'lsa.", "Тип, питание, связь и заряд каждого устройства; «Onlayn» — только при реальном сигнале."),
      B("Himoya komplekti va smeta", "Комплект охраны и смета", "Obyekt turiga mos komplekt va taxminiy narx. Narx katalogdan olinadi, aniq summa yetkazib beruvchi taklifida.", "Комплект по типу объекта и примерная цена. Цена берётся из каталога, точная сумма — в предложении поставщика."),
    ],
    amallar: [
      B("Qurilma o'rnatish", "Установить устройство", "O'rnatish formasi shu obyekt bilan ochiladi.", "Открывается форма установки с этим объектом."),
      B("Shartnoma qo'shish", "Добавить договор", "Qo'riqlash shartnomasi saqlanadi va obyekt himoyada hisoblanadi.", "Договор охраны сохраняется, объект считается под охраной."),
      B("Andozani saqlash", "Сохранить шаблон", "Tanlangan komplekt obyekt uchun andoza bo'lib qoladi.", "Выбранный комплект сохраняется как шаблон для объекта."),
    ],
    xatolar: [],
    qoidalar: [X("Qurilma 24 soatdan ortiq aloqasiz bo'lsa, vazifa ochiladi", "Если устройство без связи больше 24 часов, открывается задача")],
    bogliq: ["qurilma-ornatish.html", "qoriqlash.html", "himoya.html"],
  },

  "obyekt-sotuv.html": {
    sarlavha: X("Obyekt sotuvi", "Продажа объекта"),
    nimaUchun: X("Aktivning realizatsiya holati: joriy lot, takliflar, narx pasaytirish, shartnoma va ijara bir joyda.",
                 "Статус реализации актива: текущий лот, предложения, снижение цены, договор и аренда в одном месте."),
    bloklar: [
      B("Realizatsiya holati", "Статус реализации", "Sotish usuli, bozor qiymati, joriy narx va savdogacha qolgan kun.", "Способ продажи, рыночная стоимость, текущая цена и дни до торгов."),
      B("Joriy lot, takliflar, lotlar tarixi", "Текущий лот, предложения, история лотов", "Lot yaratilgach narx, sanalar va takliflar shu yerda chiqadi.", "После создания лота здесь появляются цена, даты и предложения."),
    ],
    amallar: [B("Sotuvga chiqarish", "Выставить на продажу", "Tasdiqlash oynasidan keyin lot yaratiladi va «Tayyorlanmoqda» holatida ochiladi.", "После окна подтверждения создаётся лот в статусе «Tayyorlanmoqda».")],
    xatolar: [X("Baholanmagan aktivni sotuvga chiqarish. Avval amaldagi baho kerak", "Выставлять на продажу неоценённый актив. Сначала нужна действующая оценка")],
    qoidalar: [X("Baholanmagan aktiv auksionga chiqarilmaydi", "Неоценённый актив не выставляется на аукцион")],
    bogliq: ["lot.html", "takliflar.html", "shartnoma.html"],
  },

  "obyekt-tarix.html": {
    sarlavha: X("Obyekt tarixi", "История объекта"),
    nimaUchun: X("Aktiv bilan bog'liq hamma voqea oy bo'yicha: qabul, ko'rik, xarajat, baholash, hodisa, hujjat va sug'urta.",
                 "Все события по активу по месяцам: приём, осмотры, расходы, оценка, инциденты, документы и страховка."),
    bloklar: [B("Voqealar", "События", "Tur bo'yicha filtr: Aktiv, Ko'rik, Xarajat, Baholash, Hodisa, Hujjat, Sug'urta.", "Фильтр по типу: Aktiv, Ko'rik, Xarajat, Baholash, Hodisa, Hujjat, Sug'urta.")],
    amallar: [B("CSV yuklab olish", "Скачать CSV", "Filtrlangan voqealar faylga yoziladi.", "Отфильтрованные события выгружаются в файл.")],
    xatolar: [],
    qoidalar: [],
    bogliq: ["amallar-tarixi.html"],
  },

  "obyekt-pasport.html": {
    sarlavha: X("Obyekt pasporti", "Паспорт объекта"),
    nimaUchun: X("Aktivning bir varaqli pasporti: umumiy ma'lumot, ro'yxat ma'lumotlari, balans va qiymat, sug'urta, kommunal va himoya. Kengash yoki xaridor uchun chop etiladi.",
                 "Паспорт актива на одном листе: общие сведения, регистрационные данные, баланс и стоимость, страховка, коммунальные услуги и охрана. Печатается для правления или покупателя."),
    bloklar: [],
    amallar: [
      B("Chop etish", "Печать", "A4 varaq, pastida mas'ul saqlovchi va tuzgan xodim.", "Лист A4, внизу — ответственный хранитель и составивший сотрудник."),
      B("Kartochkaga qaytish", "Вернуться в карточку", "Obyekt kartochkasi ochiladi.", "Открывается карточка объекта."),
    ],
    xatolar: [],
    qoidalar: [X("Eksportda niqoblash yoqilgan bo'lsa, shaxsiy ma'lumot chop etishda ham yashiriladi", "Если включено маскирование при экспорте, персональные данные скрываются и при печати")],
    bogliq: ["obyekt.html"],
  },

  "obyekt-tahrir.html": {
    sarlavha: X("Obyektni tahrirlash", "Редактирование объекта"),
    nimaUchun: X("Aktiv ma'lumotlarini o'zgartirish: nomi, turi, manzili, koordinatasi, balansi, huquq ma'lumotlari va mas'ul xodim.",
                 "Изменение данных актива: название, тип, адрес, координаты, баланс, данные о праве и ответственный сотрудник."),
    bloklar: [
      B("Aktiv ma'lumotlari", "Данные актива", "Guruhlar: Asosiy, Joylashuv, Balans, Huquq, Mas'uliyat va holat.", "Группы: Основное, Расположение, Баланс, Право, Ответственность и статус."),
      B("Saqlanadigan o'zgarishlar", "Сохраняемые изменения", "Siz o'zgartirgan har maydonning eski va yangi qiymati.", "Прежнее и новое значение каждого изменённого поля."),
      B("Oxirgi tahrirlar", "Последние правки", "Kim va qachon nimani o'zgartirgan.", "Кто, когда и что менял."),
    ],
    amallar: [
      B("Saqlash", "Сохранить", "O'zgarish yoziladi va amallar tarixiga tushadi. Ctrl+S ham ishlaydi.", "Изменение записывается и попадает в журнал действий. Работает и Ctrl+S."),
      B("Bekor qilish", "Отмена", "Saqlanmagan o'zgarish bo'lsa, tizim chiqishdan oldin so'raydi.", "Если есть несохранённые изменения, система спросит перед выходом."),
    ],
    xatolar: [X("Pul maydoniga so'mda yozish. Balans qiymati mln so'mda kiritiladi: 1 234,5 = 1,23 mlrd so'm", "Писать сумму в сумах. Балансовая стоимость вносится в млн сум: 1 234,5 = 1,23 млрд сум")],
    qoidalar: [X("Lot, ijara va balansdan chiqarish holati tegishli amal orqali o'rnatiladi", "Статусы лота, аренды и выбытия ставятся соответствующим действием")],
    bogliq: ["obyekt.html", "obyekt-tarix.html"],
  },

  /* ================= Himoya va monitoring ================= */
  "himoya.html": {
    sarlavha: X("Monitoring markazi", "Центр мониторинга"),
    nimaUchun: X("Xavfsizlik xizmatining bosh ekrani. Qurilmalar aloqasi, so'nggi signallar, ochiq hodisalar, masofaviy ko'riklar va qo'riqlanmayotgan obyektlar bir joyda.",
                 "Главный экран службы безопасности. Связь с устройствами, последние сигналы, открытые инциденты, дистанционные осмотры и объекты без охраны — в одном месте."),
    bloklar: [
      B("Ko'rsatkichlar", "Показатели", "Aloqadagi qurilmalar, 24 soatdan ortiq jim, batareyasi 20% dan past, qo'riqlanmayotgan obyektlar va ochiq hodisalar. Kartani bossangiz, ro'yxat ochiladi.", "Устройства на связи, молчащие больше 24 часов, с зарядом ниже 20%, объекты без охраны и открытые инциденты. Нажмите на карточку, чтобы открыть список."),
      B("So'nggi signallar", "Последние сигналы", "Qurilma va kirish signallari vaqt bo'yicha. Filtr: Hammasi, Qurilma, Kirish.", "Сигналы устройств и доступа по времени. Фильтр: Hammasi, Qurilma, Kirish."),
      B("Uzoq jim turgan qurilmalar", "Долго молчащие устройства", "Oxirgi signal vaqti bilan. Vaqt qurilmadan kelgan haqiqiy qayd.", "С временем последнего сигнала. Время — реальная отметка от устройства."),
      B("Masofaviy ko'riklar, qo'riqlanmayotgan obyektlar, himoya smetasi", "Дистанционные осмотры, объекты без охраны, смета охраны", "Bugungi va jarayondagi ko'riklar; na shartnoma, na qurilma bo'lmagan obyektlar; komplekt narxi.", "Сегодняшние и текущие осмотры; объекты без договора и без устройств; стоимость комплекта."),
    ],
    amallar: [
      B("Qurilma o'rnatish", "Установить устройство", "Qurilmani ro'yxatga olish formasi ochiladi.", "Открывается форма регистрации устройства."),
      B("Hodisa qayd etish", "Зарегистрировать инцидент", "Hodisa formasi ochiladi: obyekt, turi, jiddiylik va tavsif.", "Открывается форма инцидента: объект, тип, важность и описание."),
      B("Yangilash", "Обновить", "Ma'lumot qayta yuklanadi, «Yangilandi» vaqti o'zgaradi.", "Данные загружаются заново, время «Yangilandi» меняется."),
    ],
    xatolar: [X("«Onlayn» belgisini jonli video deb tushunish. Tizim videoni ko'rsatmaydi, faqat qurilmaning oxirgi signal vaqtini ko'rsatadi", "Понимать отметку «Onlayn» как живое видео. Система не показывает видео, только время последнего сигнала устройства")],
    qoidalar: [X("Qurilma 24 soatdan ortiq aloqasiz bo'lsa, vazifa ochiladi", "Если устройство без связи больше 24 часов, открывается задача")],
    bogliq: ["hodisalar.html", "qurilmalar.html", "kirish-voqealari.html", "qoriqlash.html"],
  },

  "qoriqlash.html": {
    sarlavha: X("Qo'riqlash shartnomalari", "Договоры охраны"),
    nimaUchun: X("Har bir obyekt qanday qo'riqlanayotgani: post, pult, mobil guruh, avtonom kamera va datchiklar yoki bank xodimi nazorati. Shartnoma muddati va oylik to'lov.",
                 "Как охраняется каждый объект: пост, пульт, мобильная группа, автономные камеры и датчики или контроль сотрудником банка. Срок договора и ежемесячный платёж."),
    bloklar: [
      B("Qamrov turlar bo'yicha", "Охват по видам", "Nechta obyekt qaysi turda qo'riqlanadi va nechtasi qo'riqlanmaydi.", "Сколько объектов под каким видом охраны и сколько без охраны."),
      B("30 kunda tugaydi", "Истекают через 30 дней", "Uzaytirish kerak bo'lgan shartnomalar.", "Договоры, которые нужно продлить."),
      B("Shartnomalar reyestri", "Реестр договоров", "Tur va holat bo'yicha filtr.", "Фильтр по виду и статусу."),
    ],
    amallar: [
      B("Shartnoma qo'shish", "Добавить договор", "Obyekt, tur, ijrochi, oylik to'lov va muddat. Saqlangach obyekt himoyada hisoblanadi.", "Объект, вид, исполнитель, ежемесячный платёж и срок. После сохранения объект считается под охраной."),
      B("Xarajatga yozish", "Записать в расходы", "Oylik to'lov obyekt xarajatlariga yoziladi.", "Ежемесячный платёж записывается в расходы объекта."),
      B("Shartnomani bekor qilish", "Расторгнуть договор", "Tasdiqlash oynasidan keyin shartnoma yopiladi, obyekt qo'riqlanmayotganlar ro'yxatiga tushishi mumkin.", "После окна подтверждения договор закрывается, объект может попасть в список неохраняемых."),
    ],
    xatolar: [],
    qoidalar: [X("Post, pult va mobil guruh xizmati IIV huzuridagi Qo'riqlash departamenti bilan shartnoma asosida ko'rsatiladi", "Услуги поста, пульта и мобильной группы оказываются по договору с Департаментом охраны при МВД")],
    bogliq: ["himoya.html", "obyekt-himoya.html"],
  },

  "kommunal.html": {
    sarlavha: X("Kommunal holat", "Коммунальное состояние"),
    nimaUchun: X("Barcha binoli obyektlarning elektr, gaz va suv holati, avvalgi egasidan qolgan qarz va ta'minotchiga ochiq arizalar.",
                 "Состояние электричества, газа и воды по всем объектам со зданием, долг прежнего владельца и открытые заявки поставщикам."),
    bloklar: [
      B("Xizmatlar kartalari", "Карточки услуг", "Ulangan, uzilgan va to'xtatilgan obyektlar soni, qarz summasi.", "Число подключённых, отключённых и приостановленных объектов, сумма долга."),
      B("Ochiq arizalar", "Открытые заявки", "Xizmat bo'yicha filtr. Kechikkan ariza qizil belgilanadi.", "Фильтр по услуге. Просроченная заявка отмечена красным."),
      B("Obyektlar bo'yicha", "По объектам", "Har obyektda uch xizmatning holati.", "Состояние трёх услуг по каждому объекту."),
    ],
    amallar: [B("Bajarildi deb yopish", "Закрыть как выполненную", "Ariza yopiladi va obyekt kartochkasida ham yangilanadi.", "Заявка закрывается и обновляется в карточке объекта.")],
    xatolar: [],
    qoidalar: [],
    bogliq: ["obyekt-kommunal.html"],
  },

  "qurilmalar.html": {
    sarlavha: X("Qurilmalar", "Устройства"),
    nimaUchun: X("Obyektlarda o'rnatilgan hamma kamera, datchik, qulf, shlyuz va GPS-treker. Aloqa, batareya va holat bir jadvalda.",
                 "Все камеры, датчики, замки, шлюзы и GPS-трекеры на объектах. Связь, заряд и состояние в одной таблице."),
    bloklar: [
      B("Ko'rsatkichlar", "Показатели", "Jami qurilmalar, aloqadagilar, 24 soatdan ortiq jim va almashtirish kerak bo'lganlar.", "Всего устройств, на связи, молчащие больше 24 часов и требующие замены."),
      B("Jadval", "Таблица", "Filtr: holat, tur, quvvat, aloqa, obyekt. Qatorni bossangiz, qurilma sahifasi ochiladi.", "Фильтр: состояние, тип, питание, связь, объект. Нажмите на строку, чтобы открыть страницу устройства."),
    ],
    amallar: [B("Qurilma o'rnatish", "Установить устройство", "Ro'yxatga olish formasi ochiladi.", "Открывается форма регистрации.")],
    xatolar: [],
    qoidalar: [X("Aloqa holati oxirgi holat qaydidan olinadi. Tizim ulanmagan qurilmaga «onlayn» yozmaydi", "Статус связи берётся из последней отметки. Система не пишет «onlayn» для неподключённого устройства")],
    bogliq: ["qurilma.html", "qurilma-ornatish.html", "servis-topshirigi.html"],
  },

  "qurilma.html": {
    sarlavha: X("Qurilma", "Устройство"),
    nimaUchun: X("Bitta qurilma: oxirgi signal, aloqa va batareya, voqealar jurnali, signallar, pasport va servis ishlari. Aqlli qulf va yuzni tanish terminalida masofadan ochish bloki bor.",
                 "Одно устройство: последний сигнал, связь и заряд, журнал событий, сигналы, паспорт и сервисные работы. У умного замка и терминала распознавания лиц есть блок удалённого открытия."),
    bloklar: [
      B("Holat", "Состояние", "Oxirgi signal vaqti, aloqa, batareya, quvvat turi.", "Время последнего сигнала, связь, заряд, тип питания."),
      B("Masofadan ochish", "Удалённое открытие", "Uch qadam: eshik oldini ko'rish, kim kiradi, qaror. Qulf tizimga ulanmagan: tizim relega buyruq yubormaydi, qaror jurnalga yoziladi va eshikni joyidagi xodim ochadi.",
        "Три шага: осмотр входа, кто входит, решение. Замок не подключён к системе: она не отправляет команду на реле, решение записывается в журнал, дверь открывает сотрудник на месте."),
      B("Voqealar jurnali", "Журнал событий", "Kim, qachon, qaysi usul bilan kirgan yoki rad etilgan.", "Кто, когда и каким способом вошёл или получил отказ."),
    ],
    amallar: [
      B("Ochishga ruxsatni qayd etish", "Зафиксировать разрешение на открытие", "Shaxs tanlanadi. Unda amaldagi ruxsat bo'lmasa, tizim to'xtatadi. Tasdiqlash oynasida obyekt, qurilma, eshik va shaxs ko'rinadi, asos majburiy. Qaror kirish jurnaliga ismingiz bilan yoziladi.",
        "Выбирается человек. Если у него нет действующего допуска, система остановит. В окне подтверждения видны объект, устройство, дверь и человек, основание обязательно. Решение пишется в журнал доступа с вашим именем."),
      B("Rad etish", "Отклонить", "Rad etish sababi bilan jurnalga yoziladi, eshik yopiq qoladi.", "Отказ с причиной записывается в журнал, дверь остаётся закрытой."),
      B("Servis topshirig'i", "Сервисное задание", "Qurilma bo'yicha topshiriq formasi ochiladi.", "Открывается форма задания по устройству."),
      B("Qo'shimcha", "Дополнительно", "Holatni o'zgartirish, boshqa obyektga ko'chirish, ro'yxatdan chiqarish. Har biri tasdiqlash oynasi bilan.", "Смена состояния, перенос на другой объект, снятие с учёта. Каждое действие — с окном подтверждения."),
    ],
    xatolar: [
      X("Kamera yo'q obyektda eshikni ko'rmasdan ochishga ruxsat berish. Tizim buni tavsiya etmaydi", "Разрешать открытие без просмотра входа на объекте без камеры. Система этого не рекомендует"),
      X("Ruxsati yo'q shaxsga ochish. Avval «Ruxsatlar» sahifasida ruxsat bering", "Открывать человеку без допуска. Сначала выдайте допуск на странице «Ruxsatlar»"),
    ],
    qoidalar: [X("Masofadan ochish qarori faqat asos bilan qayd etiladi va o'chirilmaydi", "Решение об удалённом открытии фиксируется только с основанием и не удаляется")],
    bogliq: ["ruxsatlar.html", "kirish-voqealari.html", "servis-topshirigi.html"],
  },

  "qurilma-ornatish.html": {
    sarlavha: X("Qurilma o'rnatish", "Установка устройства"),
    nimaUchun: X("Obyektga yangi qurilmani ro'yxatga olish: joy, qurilma turi va modeli, quvvat, aloqa va o'rnatish ma'lumoti.",
                 "Регистрация нового устройства на объекте: место, тип и модель, питание, связь и данные установки."),
    bloklar: [B("Bo'limlar", "Разделы", "Joy, Qurilma, Quvvat, Aloqa, O'rnatish va Xulosa. Xulosa kiritilgan narsani yig'ib ko'rsatadi.", "Место, Устройство, Питание, Связь, Установка и Итог. Итог сводит всё введённое.")],
    amallar: [
      B("Ro'yxatga olish", "Зарегистрировать", "Qurilma saqlanadi va uning sahifasi ochiladi. Obyekt himoyada hisoblanadi.", "Устройство сохраняется, открывается его страница. Объект считается под охраной."),
      B("Bekor qilish", "Отмена", "Formadan chiqasiz, qoralama shu qurilmada qoladi.", "Выход из формы, черновик остаётся на этом устройстве."),
    ],
    xatolar: [X("Qurilmani noto'g'ri obyektga yozish. Joy bo'limida obyekt raqamini tekshiring", "Записать устройство не на тот объект. Проверьте номер объекта в разделе «Joy»")],
    qoidalar: [],
    bogliq: ["qurilma.html", "obyekt-himoya.html"],
  },

  "servis-topshirigi.html": {
    sarlavha: X("Servis topshirig'i", "Сервисное задание"),
    nimaUchun: X("Qurilmaga xizmat: batareya almashtirish, ta'mir yoki ko'chirish. Topshiriq beriladi, ish boshlanadi va natija va xarajat bilan yakunlanadi.",
                 "Обслуживание устройства: замена батареи, ремонт или перенос. Задание выдаётся, работа начинается и завершается результатом и расходом."),
    bloklar: [B("Topshiriq, Qurilma, Natija va xarajat", "Задание, Устройство, Результат и расход", "Nima qilish kerak, qaysi qurilmada va ish natijasi. Qurilmaning servis tarixi pastda.", "Что сделать, на каком устройстве и результат работ. Ниже — сервисная история устройства.")],
    amallar: [
      B("Topshiriq berish", "Выдать задание", "Topshiriq saqlanadi, ijrochiga ko'rinadi.", "Задание сохраняется и становится видно исполнителю."),
      B("Ishni boshlash", "Начать работу", "Qurilma «xizmatda» holatiga o'tadi. 8 soniya «Qaytarish» mumkin.", "Устройство переходит в состояние «в обслуживании». 8 секунд можно нажать «Qaytarish»."),
      B("Ishni yakunlash", "Завершить работу", "Natija va xarajat kiritiladi, xarajat obyekt xarajatlariga yoziladi.", "Вносятся результат и расход, расход записывается на объект."),
      B("Topshiriqni bekor qilish", "Отменить задание", "Tasdiqlash oynasi bilan.", "С окном подтверждения."),
    ],
    xatolar: [],
    qoidalar: [],
    bogliq: ["qurilma.html", "qurilmalar.html"],
  },

  "hodisalar.html": {
    sarlavha: X("Hodisalar", "Инциденты"),
    nimaUchun: X("Barcha xavfsizlik hodisalari doskada. Ustunlar hodisaning bosqichi: Yangi, Tekshiruvda, Bartaraf etilmoqda, Hal qilindi, Yopildi.",
                 "Все инциденты безопасности на доске. Колонки — этапы инцидента: Yangi, Tekshiruvda, Bartaraf etilmoqda, Hal qilindi, Yopildi."),
    bloklar: [
      B("Doska", "Доска", "Har karta: sarlavha, obyekt, jiddiylik va mas'ul. Kartani keyingi ustunga surish yoki tugma bilan o'tkazish mumkin.", "Каждая карточка: заголовок, объект, важность и ответственный. Карточку можно перетащить в следующую колонку или перевести кнопкой."),
      B("Filtrlar", "Фильтры", "Holat va jiddiylik; «Boshqa filtrlar» ichida obyekt va manba.", "Статус и важность; в «Boshqa filtrlar» — объект и источник."),
    ],
    amallar: [
      B("Hodisa qayd etish", "Зарегистрировать инцидент", "Obyekt, tur, jiddiylik va tavsif. Hodisa «Yangi» ustuniga tushadi, yuqori jiddiylikda xavfsizlik xizmatiga bildirishnoma ketadi.", "Объект, тип, важность и описание. Инцидент попадает в колонку «Yangi», при высокой важности службе безопасности уходит уведомление."),
      B("Qabul qilish", "Принять", "Hodisa «Tekshiruvda»ga o'tadi, mas'ul bo'lmasa siz mas'ul bo'lasiz. 8 soniya «Qaytarish» mumkin.", "Инцидент переходит в «Tekshiruvda»; если ответственного нет, им становитесь вы. 8 секунд можно нажать «Qaytarish»."),
      B("Hal qilindi yoki Yopildi ustuniga o'tkazish", "Перевести в «Hal qilindi» или «Yopildi»", "Ko'rilgan chorani yozish majburiy oyna ochiladi.", "Открывается окно, где обязательно описать принятые меры."),
    ],
    xatolar: [X("Hodisani bosqichlardan sakratib yopish. Bosqichlar ketma-ket o'tkaziladi", "Закрывать инцидент, перескакивая этапы. Этапы проходятся по порядку")],
    qoidalar: [X("Hal qilish va yopishda ko'rilgan chora majburiy yoziladi", "При решении и закрытии принятые меры описываются обязательно")],
    bogliq: ["hodisa.html", "himoya.html", "kirish-hisoboti.html"],
  },

  "hodisa.html": {
    sarlavha: X("Hodisa", "Инцидент"),
    nimaUchun: X("Bitta hodisaning to'liq varaqasi: bosqich, mas'ul, ko'rilgan chora, dalillar, zarar va sug'urta, vazifalar va o'zgarishlar tarixi.",
                 "Полная карточка одного инцидента: этап, ответственный, принятые меры, доказательства, ущерб и страховка, задачи и история изменений."),
    bloklar: [
      B("Bosqich chizig'i", "Шкала этапов", "Yangi → Tekshiruvda → Bartaraf etilmoqda → Hal qilindi → Yopildi. Keyingi bosqich tugmasi tepada turadi.", "Yangi → Tekshiruvda → Bartaraf etilmoqda → Hal qilindi → Yopildi. Кнопка следующего этапа — сверху."),
      B("Hodisa ma'lumoti", "Сведения об инциденте", "Obyekt, manzil, qayd vaqti, manba va mas'ul. «Almashtirish» mas'ulni o'zgartiradi.", "Объект, адрес, время регистрации, источник и ответственный. «Almashtirish» меняет ответственного."),
      B("Ko'rilgan chora", "Принятые меры", "Nima qilingani. «Izoh qo'shish» bilan to'ldiriladi.", "Что сделано. Заполняется через «Izoh qo'shish»."),
      B("Dalil fayllari, zarar va sug'urta, vazifalar", "Доказательства, ущерб и страховка, задачи", "Surat va IIB arizasi nusxasi; sug'urta da'vosi; bog'liq vazifalar.", "Фото и копия заявления в ОВД; страховое требование; связанные задачи."),
    ],
    amallar: [
      B("Qabul qilish", "Принять", "Hodisa «Tekshiruvda» bo'ladi.", "Инцидент переходит в «Tekshiruvda»."),
      B("Bartaraf etishga o'tkazish", "Перевести на устранение", "Hodisa «Bartaraf etilmoqda» bo'ladi.", "Инцидент переходит в «Bartaraf etilmoqda»."),
      B("Hal qilindi deb belgilash", "Отметить решённым", "Chora matni majburiy. Hal qilish vaqti hisobotga yoziladi.", "Текст мер обязателен. Время решения попадает в отчёт."),
      B("Hodisani yopish", "Закрыть инцидент", "Chora matni majburiy. Yopilgan hodisani «Qayta ochish» mumkin.", "Текст мер обязателен. Закрытый инцидент можно «Qayta ochish»."),
      B("Sug'urta da'vosi yaratish", "Создать страховое требование", "Zarar summasi bilan da'vo polisga bog'lanadi.", "Требование с суммой ущерба привязывается к полису."),
      B("Vazifa yaratish", "Создать задачу", "Mas'ulga muddatli vazifa ketadi.", "Ответственному уходит задача со сроком."),
    ],
    xatolar: [X("Chorani yozmasdan yopishga urinish: tugma ishlamaydi. Kamida 5 belgi yozing", "Пытаться закрыть без описания мер: кнопка не сработает. Напишите не меньше 5 символов")],
    qoidalar: [X("Har bosqich o'zgarishi o'zgarishlar tarixiga yoziladi", "Каждая смена этапа записывается в историю изменений")],
    bogliq: ["hodisalar.html", "sugurta-polis.html", "vazifalar.html"],
  },

  "tashriflar.html": {
    sarlavha: X("Tashriflar", "Посещения"),
    nimaUchun: X("Obyektlarga kim, qachon va nima maqsadda kelgani: xaridor, baholovchi, usta, kadastr muhandisi. Hozir obyektda turganlar alohida ko'rinadi.",
                 "Кто, когда и зачем приходил на объекты: покупатель, оценщик, мастер, кадастровый инженер. Те, кто сейчас на объекте, видны отдельно."),
    bloklar: [
      B("Ko'rsatkichlar", "Показатели", "Jami tashriflar, hozir obyektda, rejalashtirilgan va bugungilar.", "Всего посещений, сейчас на объекте, запланированные и сегодняшние."),
      B("Jadval", "Таблица", "Maqsad va holat bo'yicha filtr. Qatorni bossangiz, tashrif sahifasi ochiladi.", "Фильтр по цели и статусу. Нажмите на строку, чтобы открыть страницу посещения."),
    ],
    amallar: [B("Kirish so'rovi", "Запрос на доступ", "Yangi tashrif uchun so'rov formasi ochiladi. Tashrif so'rov tasdiqlangach rejalashtiriladi.", "Открывается форма запроса на новое посещение. Посещение планируется после утверждения запроса.")],
    xatolar: [],
    qoidalar: [X("Saqlash muddati o'tgan tashrifchi ma'lumotlarini administrator Sozlamalarda anonimlashtiradi", "Данные посетителей с истёкшим сроком хранения администратор обезличивает в Настройках")],
    bogliq: ["kirish-soravi.html", "tashrif-jonli.html", "ruxsatlar.html"],
  },

  "tashrif-jonli.html": {
    sarlavha: X("Tashrif", "Посещение"),
    nimaUchun: X("Bitta tashrif: kim obyektda, qachon kirgan, kim hamroh, qaysi ruxsat bilan. Faollik jurnali har qaydni vaqti bilan saqlaydi.",
                 "Одно посещение: кто на объекте, когда вошёл, кто сопровождает, по какому допуску. Журнал активности хранит каждую отметку со временем."),
    bloklar: [B("Obyektda, Faollik jurnali, Tashrifchi, Ruxsat", "На объекте, журнал активности, посетитель, допуск", "Kamera bo'lsa, uning oxirgi signali; kirish va chiqish vaqti; tashrifchi hujjati niqoblangan holda.", "Если есть камера — её последний сигнал; время входа и выхода; документ посетителя в маскированном виде.")],
    amallar: [
      B("Kirishni qayd etish", "Отметить вход", "Kirish vaqti jurnalga yoziladi, 8 soniya «Qaytarish» mumkin.", "Время входа пишется в журнал, 8 секунд можно нажать «Qaytarish»."),
      B("Qayd qo'shish", "Добавить запись", "Tashrif davomidagi izoh jurnalga tushadi.", "Комментарий во время посещения попадает в журнал."),
      B("Chiqishni rasmiylashtirish", "Оформить выход", "Chiqish sahifasi ochiladi: obyektni topshirish bandlari va dalolatnoma.", "Открывается страница выхода: пункты сдачи объекта и акт."),
      B("Bekor qilish", "Отменить", "Tashrif bekor qilinadi, tasdiqlash oynasi bilan.", "Посещение отменяется, с окном подтверждения."),
    ],
    xatolar: [],
    qoidalar: [],
    bogliq: ["tashrif-chiqish.html", "tashriflar.html"],
  },

  "tashrif-chiqish.html": {
    sarlavha: X("Tashrif chiqishi", "Выход посетителя"),
    nimaUchun: X("Tashrif tugaganda obyekt qanday holatda topshirilganini qayd etish. Bandlar belgilangach chiqish dalolatnomasi avtomatik tuziladi.",
                 "Фиксация того, в каком состоянии объект сдан после посещения. После отметки пунктов акт выхода составляется автоматически."),
    bloklar: [B("Obyektni topshirish bandlari", "Пункты сдачи объекта", "Masalan, eshiklar yopildi, elektr va suv o'chirildi.", "Например, двери закрыты, электричество и вода отключены.")],
    amallar: [B("Chiqishni rasmiylashtirish", "Оформить выход", "Chiqish vaqti yoziladi, dalolatnoma saqlanadi va yuklab olish mumkin bo'ladi.", "Записывается время выхода, акт сохраняется и становится доступен для скачивания.")],
    xatolar: [],
    qoidalar: [],
    bogliq: ["tashrif-jonli.html"],
  },

  "kirish-soravi.html": {
    sarlavha: X("Kirish so'rovi", "Запрос на доступ"),
    nimaUchun: X("Obyektga kirish uchun so'rov: kim, qachon, nima maqsadda. So'rovni xavfsizlik xizmati yoki Rahbariyat tasdiqlaydi yoki rad etadi.",
                 "Запрос на вход на объект: кто, когда и зачем. Запрос утверждает или отклоняет служба безопасности или Руководство."),
    bloklar: [
      B("Yangi so'rov", "Новый запрос", "Obyekt, shaxs, sana va maqsad.", "Объект, человек, дата и цель."),
      B("Tasdiq kutayotgan so'rovlar", "Запросы, ожидающие утверждения", "Har birida tasdiqlash va rad etish tugmalari.", "У каждого — кнопки утверждения и отклонения."),
      B("Ko'rib chiqilganlar", "Рассмотренные", "Qaror va sabab bilan.", "С решением и причиной."),
    ],
    amallar: [
      B("So'rov yuborish", "Отправить запрос", "So'rov tasdiq kutayotganlar ro'yxatiga tushadi.", "Запрос попадает в список ожидающих утверждения."),
      B("Tasdiqlash", "Утвердить", "Tashrif rejalashtiriladi.", "Посещение планируется."),
      B("Rad etish", "Отклонить", "Sabab majburiy, kamida 5 belgi.", "Причина обязательна, не меньше 5 символов."),
    ],
    xatolar: [],
    qoidalar: [],
    bogliq: ["tashriflar.html", "ruxsatlar.html"],
  },

  "ruxsatlar.html": {
    sarlavha: X("Ruxsatlar", "Допуски"),
    nimaUchun: X("Kimga qaysi obyektga qaysi usul bilan kirish ruxsati berilgan: kalit, bir martalik kod, yuz, masofadan ochish. Muddati tugayotganlar alohida.",
                 "Кому и на какой объект выдан допуск и каким способом: ключ, одноразовый код, лицо, удалённое открытие. Истекающие показаны отдельно."),
    bloklar: [
      B("Ko'rsatkichlar", "Показатели", "Jami, amalda, 7 kunda tugaydi, muddati tugagan.", "Всего, действуют, истекают через 7 дней, истекли."),
      B("Jadval", "Таблица", "Usul va daraja bo'yicha filtr; har qatorda qolgan kun.", "Фильтр по способу и уровню; в каждой строке — оставшиеся дни."),
    ],
    amallar: [
      B("Ruxsat berish", "Выдать допуск", "Shaxs, obyekt, usul, daraja va muddat. Saqlangach shaxs masofadan ochishda tanlanishi mumkin.", "Человек, объект, способ, уровень и срок. После сохранения человека можно выбрать при удалённом открытии."),
      B("Muddatni uzaytirish", "Продлить срок", "Yangi tugash sanasi yoziladi.", "Записывается новая дата окончания."),
      B("Ruxsatni to'xtatish", "Остановить допуск", "Tasdiqlash oynasidan keyin ruxsat darhol yopiladi.", "После окна подтверждения допуск закрывается сразу."),
    ],
    xatolar: [],
    qoidalar: [X("Muddati o'tgan ruxsatlar sahifa ochilganda avtomatik yopiladi", "Истёкшие допуски закрываются автоматически при открытии страницы")],
    bogliq: ["qurilma.html", "kirish-soravi.html"],
  },

  "kirish-voqealari.html": {
    sarlavha: X("Signallar va voqealar", "Сигналы и события"),
    nimaUchun: X("Qurilmalardan kelgan hamma yozuv: eshik ochilishi, kirish va rad etilgan kirish, qurilma signallari. Yozuvlar o'zgartirilmaydi, operator faqat qarorini qo'shadi.",
                 "Все записи от устройств: открытие дверей, входы и отклонённые входы, сигналы устройств. Записи не меняются, оператор только добавляет своё решение."),
    bloklar: [B("Kirish voqealari va Qurilma signallari", "События доступа и сигналы устройств", "Ikki ko'rinish. Filtr: obyekt, usul, yo'nalish, natija.", "Два представления. Фильтр: объект, способ, направление, результат.")],
    amallar: [B("Qatorni bosish", "Нажать на строку", "Voqea sahifasi ochiladi, u yerda operator qarorini qayd etasiz.", "Открывается страница события, где вы фиксируете решение оператора.")],
    xatolar: [],
    qoidalar: [],
    bogliq: ["kirish-voqea.html", "kirish-hisoboti.html", "himoya.html"],
  },

  "kirish-voqea.html": {
    sarlavha: X("Kirish voqeasi", "Событие доступа"),
    nimaUchun: X("Bitta voqea: qurilma yozuvi (o'zgarmaydi), operator qarori, shaxs va shu kuni shu obyektdagi boshqa voqealar.",
                 "Одно событие: запись устройства (не меняется), решение оператора, человек и другие события на этом объекте в тот же день."),
    bloklar: [B("Qurilma yozuvi va Operator qarori", "Запись устройства и решение оператора", "Eshik datchigi faqat ochilish faktini yozadi, shaxsni aniqlamaydi.", "Датчик двери фиксирует только факт открытия, человека не определяет.")],
    amallar: [B("Qaror qayd etish", "Зафиксировать решение", "Natija va izoh yoziladi. Kerak bo'lsa shu yerdan hodisa ochiladi.", "Записываются результат и комментарий. При необходимости отсюда открывается инцидент.")],
    xatolar: [],
    qoidalar: [],
    bogliq: ["kirish-voqealari.html", "hodisalar.html"],
  },

  "masofaviy-korik.html": {
    sarlavha: X("Masofaviy ko'rik", "Дистанционный осмотр"),
    nimaUchun: X("Kamerasi bor obyektni joyga bormasdan ko'rikdan o'tkazish. Sessiya rejalashtiriladi, bosqichlar belgilanadi va natija ko'rik sifatida yoziladi.",
                 "Осмотр объекта с камерой без выезда на место. Сессия планируется, этапы отмечаются, результат записывается как осмотр."),
    bloklar: [
      B("Sessiyalar", "Сессии", "Rejadagi, jarayondagi va yakunlangan ko'riklar.", "Запланированные, текущие и завершённые осмотры."),
      B("Ko'rikni rejalashtirish", "Планирование осмотра", "Faqat kamerasi bor obyektlar ro'yxatda chiqadi.", "В списке только объекты с камерами."),
      B("Bosqichlar va Ko'rik natijasi", "Этапы и результат осмотра", "Har bosqichni belgilaysiz, oxirida xulosa yozasiz.", "Вы отмечаете каждый этап и в конце пишете вывод."),
    ],
    amallar: [
      B("Ko'rikni rejalashtirish", "Запланировать осмотр", "Sessiya rejaga tushadi.", "Сессия попадает в план."),
      B("Ko'rikni yakunlash", "Завершить осмотр", "Natija ko'rik sifatida saqlanadi. Kamchilik bo'lsa hodisa ochiladi.", "Результат сохраняется как осмотр. При недостатках открывается инцидент."),
      B("Ko'rikni bekor qilish", "Отменить осмотр", "Tasdiqlash oynasi bilan.", "С окном подтверждения."),
    ],
    xatolar: [X("Masofaviy ko'rikni jonli video deb kutish. Tizim videoni o'zi ko'rsatmaydi: kamera ilovasida ko'rib, natijani shu yerga yozasiz", "Ждать живое видео. Система сама видео не показывает: смотрите в приложении камеры, а результат записывайте здесь")],
    qoidalar: [],
    bogliq: ["himoya.html", "obyekt-himoya.html"],
  },

  /* ================= Ko'rik va inventarizatsiya ================= */
  "korik-rejasi.html": {
    sarlavha: X("Ko'rik rejasi", "План осмотров"),
    nimaUchun: X("Rejadagi hamma ko'rik sana bo'yicha. Chastota qoidasi har aktiv uchun navbatdagi ko'rik sanasini hisoblaydi.",
                 "Все плановые осмотры по датам. Правило периодичности рассчитывает дату следующего осмотра для каждого актива."),
    bloklar: [
      B("Ko'rsatkichlar", "Показатели", "Rejadagi ko'riklar, shu oyda o'tkazilgan, kechikkan va rejali ko'rik qamrovi.", "Плановые осмотры, проведённые в этом месяце, просроченные и охват плановыми осмотрами."),
      B("Rejadagi ko'riklar", "Плановые осмотры", "Tur va inspektor bo'yicha filtr. «O'tkazish» dalolatnoma formasini ochadi.", "Фильтр по типу и инспектору. «O'tkazish» открывает форму акта."),
      B("Chastota qoidalari va Rejadan tashqarida", "Правила периодичности и вне плана", "Bino 90 kunda, transport 30 kunda. Ochiq ko'rigi yo'q aktivlar ro'yxati.", "Здания — раз в 90 дней, транспорт — раз в 30 дней. Список активов без открытого осмотра."),
    ],
    amallar: [
      B("Ko'rik tayinlash", "Назначить осмотр", "Tayinlash formasi ochiladi.", "Открывается форма назначения."),
      B("Rejani to'ldirish", "Заполнить план", "Rejadan tashqaridagi aktivlarga qoida bo'yicha ko'rik qo'shiladi.", "Активам вне плана добавляются осмотры по правилу."),
    ],
    xatolar: [],
    qoidalar: [X("Davrni Sozlamalar → Me'yoriy parametrlar bo'limida o'zgartirish mumkin", "Период можно изменить в Настройках → Нормативные параметры")],
    bogliq: ["korik-otkazish.html", "korik-kechikkan.html", "korik-tayinlash.html"],
  },

  "korik-kechikkan.html": {
    sarlavha: X("Kechikkan ko'riklar", "Просроченные осмотры"),
    nimaUchun: X("Reja sanasi o'tgan, lekin o'tkazilmagan ko'riklar. Bu yerda ularni o'tkazasiz yoki bir nechtasini birdan yangi sanaga ko'chirasiz.",
                 "Осмотры, у которых прошла плановая дата, но они не проведены. Здесь их можно провести или перенести сразу несколько на новую дату."),
    bloklar: [
      B("Ko'rsatkichlar", "Показатели", "Reja sanasi o'tgan, 30 kundan ortiq, inspektor tayinlanmagan va eng uzoq kechikish.", "Просроченные, больше 30 дней, без инспектора и самая долгая просрочка."),
      B("Ro'yxat va Inspektorlar bo'yicha", "Список и по инспекторам", "Kim qancha kechiktirgani.", "Кто сколько просрочил."),
    ],
    amallar: [
      B("Ko'chirish", "Перенести", "Qatorlarni belgilab, yangi sana va sababni yozasiz. Tasdiqlagach har ko'rik yangi sanaga o'tadi.", "Отметьте строки, укажите новую дату и причину. После подтверждения каждый осмотр переносится."),
      B("O'tkazish", "Провести", "Dalolatnoma formasi ochiladi.", "Открывается форма акта."),
    ],
    xatolar: [X("Ko'rikni sababsiz qayta-qayta ko'chirish. Har ko'chirish tarixda qoladi va filial rahbari ko'radi", "Переносить осмотр снова и снова без причины. Каждый перенос остаётся в истории, его видит руководитель филиала")],
    qoidalar: [X("Muddati o'tgan ko'rik filial rahbariga eskalatsiya bo'ladi", "Просроченный осмотр эскалируется руководителю филиала")],
    bogliq: ["korik-rejasi.html", "korik-otkazish.html"],
  },

  "korik-tarixi.html": {
    sarlavha: X("Ko'riklar tarixi", "История осмотров"),
    nimaUchun: X("O'tkazilgan hamma ko'rik: sana, inspektor, baho va xulosa. Oylar bo'yicha grafik va kamchilik ulushi.",
                 "Все проведённые осмотры: дата, инспектор, оценка и вывод. График по месяцам и доля осмотров с недостатками."),
    bloklar: [B("Ko'rsatkichlar, Oylar bo'yicha, Jadval", "Показатели, по месяцам, таблица", "Davr, tur, inspektor va natija bo'yicha filtr. Qatorni bossangiz, dalolatnoma ochiladi.", "Фильтр по периоду, типу, инспектору и результату. Нажмите на строку, чтобы открыть акт.")],
    amallar: [],
    xatolar: [],
    qoidalar: [],
    bogliq: ["korik-akti.html"],
  },

  "korik-tayinlash.html": {
    sarlavha: X("Ko'rik tayinlash", "Назначение осмотра"),
    nimaUchun: X("Aktivga ko'rik tayinlash: tur, sana va inspektor. O'ng tomonda inspektorlar bandligi ko'rinadi.",
                 "Назначение осмотра активу: тип, дата и инспектор. Справа видна загрузка инспекторов."),
    bloklar: [
      B("Yangi ko'rik", "Новый осмотр", "Ko'rik turlari: Rejali, Birlamchi, Navbatdan tashqari, Sotuv oldi.", "Типы осмотра: плановый, первичный, внеочередной, предпродажный."),
      B("Inspektorlar bandligi", "Загрузка инспекторов", "Har inspektorda rejadagi va kechikkan ko'riklar soni.", "Число плановых и просроченных осмотров у каждого инспектора."),
    ],
    amallar: [B("Tayinlash", "Назначить", "Ko'rik rejaga tushadi va inspektorga vazifa bo'lib ko'rinadi.", "Осмотр попадает в план и виден инспектору как задача.")],
    xatolar: [X("Rejalashtirilgan sanani o'tgan kun qilib qo'yish. Sana bugundan oldin bo'lishi mumkin emas", "Ставить плановую дату в прошлом. Дата не может быть раньше сегодняшней")],
    qoidalar: [],
    bogliq: ["korik-rejasi.html", "obyekt-koriklar.html"],
  },

  "korik-otkazish.html": {
    sarlavha: X("Ko'rik o'tkazish", "Проведение осмотра"),
    nimaUchun: X("Joyida to'ldiriladigan ko'rik dalolatnomasi: nazorat bandlari, hisoblagichlar, suratlar va joylashuv, xulosa. Forma qoralama bo'lib saqlanadi, aloqa uzilsa ham yo'qolmaydi.",
                 "Акт осмотра, заполняемый на месте: контрольные пункты, счётчики, фото и местоположение, вывод. Форма сохраняется как черновик и не пропадёт при обрыве связи."),
    bloklar: [
      B("Nazorat bandlari", "Контрольные пункты", "Har band: Joyida, Kamchilik yoki Tekshirilmadi. «Barchasi joyida» hamma bandni birdan belgilaydi.", "Каждый пункт: на месте, недостаток или не проверен. «Barchasi joyida» отмечает все пункты сразу."),
      B("Hisoblagichlar", "Счётчики", "Binoli obyektda elektr, gaz va suv ko'rsatkichi va plomba holati.", "Для объекта со зданием — показания электричества, газа и воды и состояние пломбы."),
      B("Suratlar va joylashuv", "Фото и местоположение", "Kamchilik belgilansa, har biriga surat kerak. «Aniqlash» joylashuvni yozadi va ko'rik obyektda o'tkazilganini tasdiqlaydi.", "Если отмечен недостаток, к каждому нужно фото. «Aniqlash» записывает местоположение и подтверждает, что осмотр был на объекте."),
      B("Xulosa", "Вывод", "Umumiy holat bahosi 5 dan 1 gacha, xulosa matni va keyingi ko'rik sanasi.", "Общая оценка состояния от 5 до 1, текст вывода и дата следующего осмотра."),
    ],
    amallar: [
      B("Dalolatnomani yakunlash", "Завершить акт осмотра", "Tizim suratlar qoidasini tekshiradi. Tasdiqlash oynasidan keyin dalolatnoma imzolanadi, ko'rik o'tkazilgan bo'ladi va dalolatnoma sahifasi ochiladi. 2 yoki 1 baho qo'yilsa, hodisa avtomatik ochiladi.",
        "Система проверяет правило о фото. После окна подтверждения акт подписывается, осмотр считается проведённым и открывается страница акта. При оценке 2 или 1 инцидент открывается автоматически."),
      B("Keyinroq", "Позже", "Forma yopiladi, qoralama shu qurilmada qoladi.", "Форма закрывается, черновик остаётся на этом устройстве."),
    ],
    xatolar: [
      X("Kamchilik belgilab, suratsiz yakunlash: tizim ruxsat bermaydi", "Отметить недостаток и завершить без фото: система не позволит"),
      X("Joylashuvni aniqlamasdan yakunlash. Joylashuv ko'rik obyektda o'tkazilganini tasdiqlaydi va dalolatnomaga yoziladi", "Завершать, не определив местоположение. Оно подтверждает, что осмотр прошёл на объекте, и записывается в акт"),
    ],
    qoidalar: [X("Nuqsonli yoki avariya holati hodisa sifatida qayd etiladi va xavfsizlik xizmatiga yuboriladi", "Дефектное или аварийное состояние регистрируется как инцидент и направляется службе безопасности")],
    bogliq: ["korik-akti.html", "korik-rejasi.html", "hodisalar.html"],
  },

  "korik-akti.html": {
    sarlavha: X("Ko'rik dalolatnomasi", "Акт осмотра"),
    nimaUchun: X("Imzolangan ko'rik dalolatnomasi: xulosa, kamchiliklar, nazorat bandlari, hisoblagichlar, joylashuv va fotojadval. Chop etishga tayyor.",
                 "Подписанный акт осмотра: вывод, недостатки, контрольные пункты, счётчики, местоположение и фототаблица. Готов к печати."),
    bloklar: [],
    amallar: [
      B("Chop etish", "Печать", "A4 varaq.", "Лист A4."),
      B("Hodisani ochish", "Открыть инцидент", "Ko'rik natijasida ochilgan hodisa sahifasi.", "Страница инцидента, открытого по итогам осмотра."),
    ],
    xatolar: [],
    qoidalar: [X("Imzolangan dalolatnoma o'zgartirilmaydi. Xato bo'lsa, qayta ko'rik tayinlang", "Подписанный акт не меняется. Если есть ошибка, назначьте повторный осмотр")],
    bogliq: ["korik-tarixi.html", "obyekt-koriklar.html"],
  },

  "inventarizatsiya.html": {
    sarlavha: X("Inventarizatsiya", "Инвентаризация"),
    nimaUchun: X("Ko'char mulk (uskuna, transport, texnika) inventar raqami bo'yicha sanaladi. Topilmagani kamomad, ro'yxatda yo'g'i ortiqcha bo'lib dalolatnomaga yoziladi.",
                 "Движимое имущество (оборудование, транспорт, техника) пересчитывается по инвентарным номерам. Ненайденное становится недостачей, лишнее — излишком, всё попадает в акт."),
    bloklar: [
      B("Navbatdagi inventarizatsiya", "Следующая инвентаризация", "Tur, obyektlar soni va komissiya.", "Вид, число объектов и комиссия."),
      B("Inventarizatsiyalar", "Инвентаризации", "Rejadagi va yakunlangan, har birida sanalgan, kamomad va ortiqcha.", "Плановые и завершённые, в каждой — сколько пересчитано, недостача и излишек."),
      B("Inventar ro'yxati", "Инвентарный список", "12 oyda sanalmagan va inventarga olinmagan birliklar alohida. «QR yorliqlar» chop etish uchun.", "Отдельно — единицы, не пересчитанные за 12 месяцев, и не взятые на учёт. «QR yorliqlar» — для печати."),
      B("Birlikni topish", "Поиск единицы", "Inventar raqamini yozasiz yoki kamera bilan QR yorliqni o'qiysiz.", "Введите инвентарный номер или считайте QR-этикетку камерой."),
    ],
    amallar: [
      B("Yangi inventarizatsiya", "Новая инвентаризация", "Tur, sana, obyektlar va komissiya tanlanadi, reja saqlanadi.", "Выбираются вид, дата, объекты и комиссия, план сохраняется."),
      B("Sanashni boshlash", "Начать пересчёт", "Birliklar ro'yxati ochiladi. Har birida «Topildi» yoki «Topilmadi»; har belgini 8 soniya qaytarish mumkin.", "Открывается список единиц. У каждой — «Topildi» или «Topilmadi»; каждую отметку можно отменить в течение 8 секунд."),
      B("Ortiqcha birlik", "Лишняя единица", "Ro'yxatda yo'q, lekin joyida topilgan narsa qayd etiladi.", "Регистрируется то, чего нет в списке, но что найдено на месте."),
      B("Yakunlash", "Завершить", "Tasdiqlash oynasida kamomad va ortiqcha soni ko'rinadi. Tasdiqlagach dalolatnoma tuziladi.", "В окне подтверждения видно число недостач и излишков. После подтверждения составляется акт."),
    ],
    xatolar: [X("Birlikni topmay turib «Topildi» deb belgilash. Belgi dalolatnomaga kiradi, adashsangiz darhol «Qaytarish»ni bosing", "Отмечать «Topildi», не найдя единицу. Отметка попадает в акт; если ошиблись, сразу нажмите «Qaytarish»")],
    qoidalar: [X("Har bir birlik kamida 12 oyda bir marta sanaladi", "Каждая единица пересчитывается не реже раза в 12 месяцев")],
    bogliq: ["inventar-dalolatnoma.html", "hodisalar.html"],
  },

  "inventar-dalolatnoma.html": {
    sarlavha: X("Inventarizatsiya dalolatnomasi", "Акт инвентаризации"),
    nimaUchun: X("Yakunlangan inventarizatsiya natijasi: hisob bo'yicha, haqiqatda topilgan, kamomad va ortiqcha, xulosa va solishtirma qaydnoma.",
                 "Итог завершённой инвентаризации: по учёту, фактически найдено, недостача и излишек, вывод и сличительная ведомость."),
    bloklar: [],
    amallar: [
      B("Qaydnomani yuklab olish", "Скачать ведомость", "Solishtirma qaydnoma CSV fayl bo'lib yuklanadi.", "Сличительная ведомость скачивается CSV-файлом."),
      B("Chop etish", "Печать", "Dalolatnoma A4 varaqda.", "Акт на листе A4."),
    ],
    xatolar: [],
    qoidalar: [X("Kamomad bo'yicha hodisa qayd etiladi, javobgar shaxslardan tushuntirish xati olinadi", "По недостаче регистрируется инцидент, от ответственных лиц берётся объяснительная")],
    bogliq: ["inventarizatsiya.html"],
  },

  /* ================= Qiymat, zaxira va sug'urta ================= */
  "baholash.html": {
    sarlavha: X("Baholash reyestri", "Реестр оценки"),
    nimaUchun: X("Har aktivning amaldagi bahosi va keyingi baholash sanasi. Baholanmagan aktiv auksionga chiqarilmaydi, eskirgan baho nazorat indeksini tushiradi.",
                 "Действующая оценка каждого актива и дата следующей оценки. Неоценённый актив не выставляется на аукцион, устаревшая оценка снижает индекс контроля."),
    bloklar: [
      B("Ko'rsatkichlar", "Показатели", "Amaldagi baho, 30 kunda tugaydi, eskirgan, baholanmagan va ochiq buyurtmalar.", "Действующая оценка, истекает через 30 дней, устаревшая, неоценённые и открытые заказы."),
      B("Baholangan aktivlar", "Оценённые активы", "Tayyor ko'rinishlar: «30 kunda tugaydi», «Eskirgan». Qatordagi «Buyurtma» shu aktivga buyurtma beradi.", "Готовые представления: «30 kunda tugaydi», «Eskirgan». Кнопка «Buyurtma» в строке оформляет заказ на этот актив."),
      B("Baholanmagan aktivlar", "Неоценённые активы", "Birinchi baholash kerak bo'lganlar.", "Те, кому нужна первая оценка."),
    ],
    amallar: [
      B("Buyurtma berish", "Оформить заказ", "Buyurtma formasi ochiladi.", "Открывается форма заказа."),
      B("Hisobot kiritish", "Внести отчёт", "Hisobot formasi ochiladi.", "Открывается форма отчёта."),
    ],
    xatolar: [],
    qoidalar: [X("Baho 12 oy amal qiladi", "Оценка действует 12 месяцев")],
    bogliq: ["baholash-buyurtma.html", "baholash-hisobot-kiritish.html"],
  },

  "baholash-buyurtma.html": {
    sarlavha: X("Baholash buyurtmasi", "Заказ на оценку"),
    nimaUchun: X("Baholovchi tashkilotga buyurtma: obyekt, sabab, tashkilot, xizmat narxi, hisobot muddati va texnik topshiriq.",
                 "Заказ оценочной организации: объект, причина, организация, стоимость услуги, срок отчёта и техническое задание."),
    bloklar: [
      B("Yangi buyurtma", "Новый заказ", "Sabablar: Birlamchi, Qayta, Sotuv oldi baholash, MHXS bo'yicha qadrsizlanish testi.", "Причины: первичная, повторная, предпродажная оценка, тест на обесценение по МСФО."),
      B("Buyurtmalar", "Заказы", "Holat bo'yicha filtr. «Hisobot kiritish» buyurtmani hisobot formasiga olib o'tadi.", "Фильтр по статусу. «Hisobot kiritish» переносит заказ в форму отчёта."),
    ],
    amallar: [
      B("Buyurtma berish", "Оформить заказ", "Buyurtma saqlanadi, xizmat narxi xarajatlar reyestriga to'lanmagan deb yoziladi.", "Заказ сохраняется, стоимость услуги записывается в реестр расходов как неоплаченная."),
      B("Buyurtmani bekor qilish", "Отменить заказ", "Tasdiqlash oynasi bilan.", "С окном подтверждения."),
    ],
    xatolar: [],
    qoidalar: [],
    bogliq: ["baholash.html", "baholash-hisobot-kiritish.html"],
  },

  "baholash-hisobot-kiritish.html": {
    sarlavha: X("Baholash hisobotini kiritish", "Ввод отчёта об оценке"),
    nimaUchun: X("Baholovchidan kelgan hisobotni tizimga kiritish. Yangi baho darhol aktivga o'tmaydi: u boshqa xodim tasdig'iga yuboriladi.",
                 "Ввод в систему отчёта оценщика. Новая оценка не переходит в актив сразу: она отправляется на утверждение другому сотруднику."),
    bloklar: [
      B("Hisobot ma'lumotlari", "Данные отчёта", "Raqam, sana, bozor va tugatish qiymati (tugatish bozordan oshmaydi), tashkilot, litsenziya, yondashuv va PDF fayl.", "Номер, дата, рыночная и ликвидационная стоимость (ликвидационная не выше рыночной), организация, лицензия, подход и PDF-файл."),
      B("Natija", "Результат", "Balans qiymatiga nisbat va qadrsizlanish oldindan hisoblanadi.", "Заранее рассчитываются отношение к балансовой стоимости и обесценение."),
    ],
    amallar: [B("Tasdiqqa yuborish", "Отправить на утверждение", "Qaror so'rovi ochiladi. Sizga «Qaror so'rovi yuborildi» kartasi va javob muddati ko'rinadi, «Hozir tasdiqlash» tugmasi muallifga chiqmaydi.", "Открывается запрос на решение. Вы видите карточку «Qaror so'rovi yuborildi» и срок ответа, кнопки «Hozir tasdiqlash» у автора нет.")],
    xatolar: [X("Tugatish qiymatini bozor qiymatidan yuqori kiritish: maydon xato ko'rsatadi", "Вносить ликвидационную стоимость выше рыночной: поле покажет ошибку")],
    qoidalar: [X("Yangi baho rahbariyat tasdig'idan keyin aktivga o'tadi. Balans qiymatidan past baho qadrsizlanish sifatida ko'rsatiladi", "Новая оценка переходит в актив после утверждения руководством. Оценка ниже балансовой показывается как обесценение")],
    bogliq: ["baholash-hisobot.html", "tasdiqlar.html"],
  },

  "baholash-hisobot.html": {
    sarlavha: X("Baholash hisoboti", "Отчёт об оценке"),
    nimaUchun: X("Bitta hisobot: qiymatlar, qadrsizlanish, baholovchi, amal qilish muddati, fayllar va aktivning baholash tarixi.",
                 "Один отчёт: стоимости, обесценение, оценщик, срок действия, файлы и история оценок актива."),
    bloklar: [],
    amallar: [
      B("Tasdiqlash", "Утвердить", "Faqat tasdiq huquqi bor va muallif bo'lmagan xodimga. Baho aktivga o'tadi.", "Только сотруднику с правом утверждения, который не является автором. Оценка переходит в актив."),
      B("Rad etish", "Отклонить", "Sabab majburiy.", "Причина обязательна."),
      B("Qayta baholashga buyurtma", "Заказать переоценку", "Buyurtma formasi ochiladi.", "Открывается форма заказа."),
    ],
    xatolar: [],
    qoidalar: [],
    bogliq: ["baholash.html", "obyekt-moliya.html"],
  },

  "zaxira.html": {
    sarlavha: X("Zaxira (MB 2696)", "Резерв (ЦБ 2696)"),
    nimaUchun: X("Balansdagi aktivlar bo'yicha zaxira: toifalar, stavkalar, zaxira yuki dinamikasi va toifalar migratsiyasi. Oraliq stavkalarni Buxgalteriya va risk taklif qiladi, Rahbariyat tasdiqlaydi.",
                 "Резерв по активам на балансе: категории, ставки, динамика резервной нагрузки и миграция категорий. Промежуточные ставки предлагает Бухгалтерия и риски, утверждает Руководство."),
    bloklar: [
      B("Ko'rsatkichlar", "Показатели", "Zaxira yuki (Taxminiy belgisi bilan, agar stavka tasdiqlanmagan bo'lsa), umidsiz toifa, 90 kunda o'tadiganlar va kapitalga nisbat.", "Резервная нагрузка (с отметкой «Taxminiy», если ставка не утверждена), безнадёжная категория, переходящие через 90 дней и отношение к капиталу."),
      B("Zaxira stavkalari", "Ставки резерва", "Substandart, Qoniqarsiz, Shubhali va Umidsiz. Tasdiqlanmagan stavka «Taxminiy» chipi bilan.", "Субстандартная, неудовлетворительная, сомнительная и безнадёжная. Неутверждённая ставка — с чипом «Taxminiy»."),
      B("Toifalar migratsiyasi", "Миграция категорий", "Tanlangan oy va bugungi holat solishtiriladi: qancha aktiv og'irlashgan.", "Сравнение выбранного месяца с сегодняшним состоянием: сколько активов ухудшилось."),
    ],
    amallar: [
      B("Tasdiqqa yuborish", "Отправить на утверждение", "Buxgalteriya stavka taklifini Rahbariyatga yuboradi. Tasdiqlanguncha stavka «Taxminiy».", "Бухгалтерия отправляет предложение по ставке Руководству. До утверждения ставка «Taxminiy»."),
      B("Tasdiqlash", "Утвердить", "Rahbariyat uchun. Stavka amalga kiradi, «Taxminiy» belgisi olinadi.", "Для Руководства. Ставка вступает в силу, отметка «Taxminiy» снимается."),
      B("Rad etish", "Отклонить", "Sabab majburiy.", "Причина обязательна."),
      B("Hisobni yuklab olish", "Скачать расчёт", "Obyektlar bo'yicha zaxira CSV fayl bo'lib yuklanadi.", "Резерв по объектам скачивается CSV-файлом."),
    ],
    xatolar: [X("Taxminiy zaxirani yakuniy raqam deb hisobotga olish. «Taxminiy» chipi bor raqam tasdiqlanmagan", "Брать предварительный резерв в отчёт как окончательный. Цифра с чипом «Taxminiy» не утверждена")],
    qoidalar: [
      X("Undiruv natijasida olingan mulk 365 kundan, boshqa foydalanilmayotgan mulk 1095 kundan keyin umidsiz toifaga o'tadi, zaxira 100%", "Имущество из взыскания через 365 дней, прочее неиспользуемое через 1095 дней переходит в безнадёжную категорию, резерв 100%"),
      X("Stavka so'rovini yuborgan xodim uni o'zi tasdiqlay olmaydi", "Сотрудник, отправивший запрос по ставке, не может сам его утвердить"),
    ],
    bogliq: ["muddatlar.html", "hisobot-mb.html", "tasdiqlar.html"],
  },

  "soliq.html": {
    sarlavha: X("Mol-mulk solig'i", "Налог на имущество"),
    nimaUchun: X("Balansdagi binolar bo'yicha chorak soliq hisobi. Balansga olingandan keyin 6 oy imtiyoz amal qiladi, keyin soliq hisoblanadi.",
                 "Квартальный расчёт налога по зданиям на балансе. 6 месяцев после принятия на баланс действует льгота, затем налог начисляется."),
    bloklar: [
      B("Ko'rsatkichlar", "Показатели", "Chorak bo'yicha soliq (taxminiy), to'lanmagan, imtiyoz davrida va 30 kunda imtiyozi tugaydiganlar.", "Налог за квартал (предварительный), неоплаченный, в периоде льготы и с окончанием льготы через 30 дней."),
      B("Obyektlar bo'yicha hisob", "Расчёт по объектам", "Holat va hudud toifasi bo'yicha filtr.", "Фильтр по статусу и категории региона."),
      B("Hisob qoidalari", "Правила расчёта", "Stavka 1,5%, konservatsiyadagi obyekt 0,7%, 1 m² minimal qiymati hududga qarab.", "Ставка 1,5%, объект на консервации 0,7%, минимальная стоимость 1 м² зависит от региона."),
    ],
    amallar: [
      B("Chorak hisobini saqlash", "Сохранить расчёт за квартал", "Hisob saqlanadi va xarajatlarga tushadi.", "Расчёт сохраняется и попадает в расходы."),
      B("To'landi", "Оплачено", "To'lov sanasi qayd etiladi.", "Фиксируется дата оплаты."),
    ],
    xatolar: [],
    qoidalar: [X("Mol-mulk va yer solig'idan imtiyoz balansga olingandan 6 oy", "Льгота по налогу на имущество и земельному налогу — 6 месяцев после принятия на баланс")],
    bogliq: ["zaxira.html", "hisobot-xarajat.html"],
  },

  "sugurta.html": {
    sarlavha: X("Sug'urta polislari", "Страховые полисы"),
    nimaUchun: X("Aktivlar sug'urtasi: amaldagi polislar, 30 kunda tugaydiganlar, muddati tugaganlar, sug'urtasiz aktivlar va da'volar.",
                 "Страхование активов: действующие полисы, истекающие через 30 дней, истёкшие, активы без страховки и страховые требования."),
    bloklar: [
      B("Polislar", "Полисы", "Holat, tur va kompaniya bo'yicha filtr.", "Фильтр по статусу, типу и компании."),
      B("Sug'urtasiz aktivlar", "Активы без страховки", "Transportga OSAGO, boshqasiga mol-mulk polisi kerak. «Polis qo'shish» shu aktiv bilan formani ochadi.", "Для транспорта нужно ОСАГО, для остального — полис имущества. «Polis qo'shish» открывает форму с этим активом."),
    ],
    amallar: [
      B("Yangi polis", "Новый полис", "Polis formasi ochiladi.", "Открывается форма полиса."),
      B("Yangilash", "Продлить", "Eski polis ma'lumoti bilan yangi polis formasi ochiladi.", "Открывается форма нового полиса с данными старого."),
    ],
    xatolar: [],
    qoidalar: [X("Sug'urta polisi tugashidan 30 kun oldin yangilanadi", "Страховой полис продлевается за 30 дней до окончания")],
    bogliq: ["sugurta-polis.html", "sugurta-yangilash.html"],
  },

  "sugurta-polis.html": {
    sarlavha: X("Sug'urta polisi", "Страховой полис"),
    nimaUchun: X("Bitta polis: kompaniya, summa, mukofot, muddat, da'volar va polis nusxasi.",
                 "Один полис: компания, сумма, премия, срок, требования и копия полиса."),
    bloklar: [],
    amallar: [
      B("Polisni yangilash", "Продлить полис", "Yangi polis formasi ochiladi.", "Открывается форма нового полиса."),
      B("Da'vo qo'shish", "Добавить требование", "Zarar summasi va sababi bilan da'vo saqlanadi.", "Требование сохраняется с суммой и причиной ущерба."),
      B("To'landi yoki Rad etildi", "Оплачено или Отклонено", "Da'vo natijasi qayd etiladi.", "Фиксируется результат требования."),
    ],
    xatolar: [],
    qoidalar: [],
    bogliq: ["sugurta.html", "hodisa.html"],
  },

  "sugurta-yangilash.html": {
    sarlavha: X("Polisni yangilash", "Продление полиса"),
    nimaUchun: X("Yangi polisni kiritish: obyekt, tur (Mol-mulk, OSAGO, XICHO), raqam, kompaniya, summa, mukofot va muddat.",
                 "Ввод нового полиса: объект, тип (имущество, ОСАГО, ОСГОР), номер, компания, сумма, премия и срок."),
    bloklar: [],
    amallar: [B("Polisni saqlash", "Сохранить полис", "Polis saqlanadi, mukofot xarajatlar reyestriga yoziladi, aktivning sug'urta bandi yangilanadi.", "Полис сохраняется, премия записывается в реестр расходов, пункт страховки у актива обновляется.")],
    xatolar: [X("Sug'urta summasini bozor qiymatidan past qilish. Nazorat indeksi buni kamchilik deb hisoblaydi", "Ставить страховую сумму ниже рыночной стоимости. Индекс контроля считает это недостатком")],
    qoidalar: [],
    bogliq: ["sugurta.html", "sugurta-polis.html"],
  },

  /* ================= Realizatsiya ================= */
  "realizatsiya.html": {
    sarlavha: X("Sotuv rejasi", "План продаж"),
    nimaUchun: X("Realizatsiya bo'limining bosh sahifasi: yillik reja va fakt, sotish usullari, obyektlar bosqichlar bo'yicha doskada va tayyor biznes paketlari.",
                 "Главная страница реализации: годовой план и факт, способы продажи, объекты по этапам на доске и готовые бизнес-пакеты."),
    bloklar: [
      B("Ko'rsatkichlar", "Показатели", "Realizatsiyadagi obyektlar, savdoga chiqarilgan lotlar, qaror kutayotgan takliflar va muddati o'tgan to'lovlar.", "Объекты в реализации, выставленные лоты, предложения в ожидании решения и просроченные платежи."),
      B("Yillik reja va fakt", "Годовой план и факт", "Sotilgan aktivlar va tushum. Reja kiritilmagan bo'lsa, «Rejani kiritish» tugmasi chiqadi.", "Проданные активы и выручка. Если план не внесён, появляется кнопка «Rejani kiritish»."),
      B("Obyektlar bosqichlar bo'yicha", "Объекты по этапам", "Doska: sotuvga tayyorlash, lot, shartnoma. Usul va hudud bo'yicha filtr.", "Доска: подготовка к продаже, лот, договор. Фильтр по способу и региону."),
      B("Tayyor biznes paketlari", "Готовые бизнес-пакеты", "Bir nechta aktiv bitta lotga birlashtiriladi, masalan ferma va uning texnikasi.", "Несколько активов объединяются в один лот, например ферма и её техника."),
    ],
    amallar: [
      B("Lot yaratish", "Создать лот", "Lot formasi ochiladi.", "Открывается форма лота."),
      B("Paket yaratish", "Создать пакет", "Aktivlarni tanlab paket saqlaysiz, keyin paketdan lot yaratiladi.", "Выберите активы и сохраните пакет, затем из пакета создаётся лот."),
    ],
    xatolar: [],
    qoidalar: [X("Davaktivga o'tkazilgan aktiv 1 yilda sotilmasa bankka qaytariladi", "Актив, переданный в давактив, возвращается банку, если не продан за год")],
    bogliq: ["lotlar.html", "takliflar.html", "shartnomalar.html", "ijara.html"],
  },

  "lotlar.html": {
    sarlavha: X("E-auksion lotlari", "Лоты электронного аукциона"),
    nimaUchun: X("Hamma lot holati bo'yicha: Tayyorlanmoqda, E'lon qilingan, Savdo o'tkazilmagan, Sotildi.",
                 "Все лоты по статусам: готовится, опубликован, торги не состоялись, продан."),
    bloklar: [
      B("Ko'rsatkichlar", "Показатели", "Har holat bo'yicha lotlar soni va boshlang'ich narx summasi.", "Число лотов и сумма начальных цен по каждому статусу."),
      B("Jadval", "Таблица", "Ko'rinish, holat va usul bo'yicha filtr. Qatorni bossangiz, lot sahifasi ochiladi.", "Фильтр по представлению, статусу и способу. Нажмите на строку, чтобы открыть лот."),
    ],
    amallar: [B("Lot yaratish", "Создать лот", "Aktiv, usul, boshlang'ich narx, zakalat va sanalar. Tizim VM 18 talablarini maydon ostida tekshiradi. Saqlangach lot «Tayyorlanmoqda» bo'ladi.", "Актив, способ, начальная цена, задаток и даты. Система проверяет требования ПКМ 18 под полями. После сохранения лот получает статус «Tayyorlanmoqda».")],
    xatolar: [X("Savdo sanasini e'londan 30 kundan kam qilib qo'yish: maydon ostida xato chiqadi va lot saqlanmaydi", "Ставить дату торгов меньше чем через 30 дней после объявления: под полем появится ошибка, лот не сохранится")],
    qoidalar: [X("E'londan savdogacha kamida 30 kun o'tadi", "От объявления до торгов проходит не меньше 30 дней")],
    bogliq: ["lot.html", "realizatsiya.html"],
  },

  "lot.html": {
    sarlavha: X("Lot", "Лот"),
    nimaUchun: X("Bitta lot: bosqichlar (Tayyorlash, E'lon, Savdo, G'olib, Sotildi), shartlar, takliflar, VM 18 muddatlari va narx pasaytirish tarixi.",
                 "Один лот: этапы (подготовка, объявление, торги, победитель, продан), условия, предложения, сроки по ПКМ 18 и история снижения цены."),
    bloklar: [
      B("Lot shartlari", "Условия лота", "E-auksion raqami, realizatsiya qarori, boshlang'ich va minimal narx, zakalat, auksion qadami.", "Номер на электронном аукционе, решение о реализации, начальная и минимальная цена, задаток, шаг аукциона."),
      B("Muddatlar", "Сроки", "Savdo sanasi va e'londan necha kun keyin ekani; keyingi narx pasaytirishgacha qolgan kun.", "Дата торгов и через сколько дней после объявления; дни до следующего снижения цены."),
      B("Takliflar va Narx pasaytirish tarixi", "Предложения и история снижения цены", "Ishtirokchilar va har pasaytirish qaror raqami bilan.", "Участники и каждое снижение с номером решения."),
    ],
    amallar: [
      B("E'lon qilish", "Опубликовать", "«Boshqa amallar» ichida. Tasdiqlash oynasidan keyin lot «E'lon qilingan» bo'ladi, savdogacha muddat sanala boshlaydi.", "В меню «Boshqa amallar». После окна подтверждения лот становится «E'lon qilingan», начинается отсчёт до торгов."),
      B("G'olib taklifini kiritish", "Внести предложение победителя", "G'olib va yakuniy narx yoziladi, lot «G'olib aniqlangan» bo'ladi. G'olib 5 ish kunida to'laydi.", "Записываются победитель и итоговая цена, лот получает статус «G'olib aniqlangan». Победитель оплачивает в течение 5 рабочих дней."),
      B("Savdo o'tkazilmadi", "Торги не состоялись", "Lot «Savdo o'tkazilmagan» bo'ladi. Keyin takroriy savdo (kamida 10 kundan keyin) yoki narx pasaytirish.", "Лот получает статус «Savdo o'tkazilmagan». Далее — повторные торги (не раньше чем через 10 дней) или снижение цены."),
      B("Narxni pasaytirish", "Снизить цену", "Rahbariyatga so'rov ketadi. Tasdiqlangach yangi narx lotga yoziladi va tarixda qoladi.", "Руководству уходит запрос. После утверждения новая цена записывается в лот и остаётся в истории."),
      B("Shartnoma tuzish", "Заключить договор", "Shartnoma formasi g'olib ma'lumoti bilan ochiladi. Shartnoma 10 ish kunida tuziladi.", "Открывается форма договора с данными победителя. Договор заключается в течение 10 рабочих дней."),
      B("Lotni bekor qilish", "Отменить лот", "Sabab va lot raqamini yozib tasdiqlaysiz.", "Нужно указать причину и ввести номер лота."),
    ],
    xatolar: [X("Narx pasaytirish so'rovi yuborilgach narxni qo'lda o'zgartirishga urinish. Narx faqat qaror tasdiqlangach o'zgaradi", "Пытаться менять цену вручную после отправки запроса на снижение. Цена меняется только после утверждения решения")],
    qoidalar: [
      X("Lot 3 oy sotilmasa narx rahbariyat qarori bilan 10% ga pasaytiriladi", "Если лот не продан 3 месяца, цена снижается на 10% решением руководства"),
      X("Auksion qadami 10%, 2000 BHM dan yuqori lotda 5%", "Шаг аукциона 10%, для лота дороже 2000 БРВ — 5%"),
    ],
    bogliq: ["lotlar.html", "takliflar.html", "shartnoma.html", "tasdiqlar.html"],
  },

  "takliflar.html": {
    sarlavha: X("Takliflar", "Предложения"),
    nimaUchun: X("Xaridorlardan kelgan takliflar. Taklif AML tekshiruvidan o'tadi, Rahbariyat qaroriga yuboriladi va tasdiqlangach shartnoma tuziladi.",
                 "Предложения от покупателей. Предложение проходит проверку ПОД/ФТ, отправляется на решение Руководства и после утверждения оформляется договором."),
    bloklar: [
      B("Ko'rsatkichlar", "Показатели", "Yangi, qarorda, tasdiqlangan lekin shartnomasiz va AML tekshiruvidagi takliflar.", "Новые, на решении, утверждённые без договора и на проверке ПОД/ФТ."),
      B("Jadval", "Таблица", "Ko'rinish: «Qaror kutilmoqda», «Shartnoma tuzilmagan». Har qatorda keyingi qadam tugmasi.", "Представления: «Qaror kutilmoqda», «Shartnoma tuzilmagan». В каждой строке — кнопка следующего шага."),
    ],
    amallar: [
      B("Taklif kiritish", "Внести предложение", "Xaridor, lot yoki obyekt, summa va to'lov sharti. Taklif «Yangi» bo'ladi.", "Покупатель, лот или объект, сумма и условия оплаты. Предложение получает статус «Yangi»."),
      B("Ko'rib chiqishga olish", "Взять на рассмотрение", "Taklif «Ko'rib chiqilmoqda» bo'ladi, 8 soniya «Qaytarish» mumkin.", "Предложение переходит в «Ko'rib chiqilmoqda», 8 секунд можно нажать «Qaytarish»."),
      B("Yuborish", "Отправить", "Taklif Rahbariyat qaroriga ketadi. Muallif uni o'zi tasdiqlay olmaydi.", "Предложение уходит на решение Руководства. Автор не может утвердить его сам."),
      B("Taklifni tasdiqlash yoki Rad etish", "Утвердить или отклонить предложение", "Rahbariyat uchun. Rad etishda sabab majburiy.", "Для Руководства. При отклонении причина обязательна."),
      B("Shartnomani imzolash", "Подписать договор", "Tasdiqlangan taklif bo'yicha shartnoma tuziladi va lot sotilgan bo'ladi.", "По утверждённому предложению заключается договор, лот становится проданным."),
    ],
    xatolar: [X("AML natijasi «Shubhali» taklifni qarorga yuborish. Avval tekshiruvni yakunlang", "Отправлять на решение предложение с результатом ПОД/ФТ «Shubhali». Сначала завершите проверку")],
    qoidalar: [X("Shartnoma taklif tasdiqlangandan keyin 10 ish kunida tuziladi", "Договор заключается в течение 10 рабочих дней после утверждения предложения")],
    bogliq: ["tasdiqlar.html", "shartnomalar.html", "lot.html"],
  },

  "shartnomalar.html": {
    sarlavha: X("Shartnomalar va to'lovlar", "Договоры и платежи"),
    nimaUchun: X("Sotuv shartnomalari: kutilayotgan tushum, muddati o'tgan to'lovlar, to'liq to'langan va balansdan chiqarishga tayyorlari.",
                 "Договоры продажи: ожидаемая выручка, просроченные платежи, полностью оплаченные и готовые к списанию."),
    bloklar: [B("Jadval", "Таблица", "Ko'rinish: «Kechikkan to'lov», «Taqiq qo'yilgan». Filtr: holat, usul, to'lov, taqiq.", "Представления: «Kechikkan to'lov», «Taqiq qo'yilgan». Фильтр: статус, способ, оплата, запрет.")],
    amallar: [B("Shartnoma tuzish", "Заключить договор", "Shartnoma formasi ochiladi: xaridor, obyekt, narx, to'lov sharti. Bo'lib to'lashda jadval tuziladi.", "Открывается форма договора: покупатель, объект, цена, условия оплаты. При рассрочке составляется график.")],
    xatolar: [],
    qoidalar: [X("Bo'lib to'lashda avans kamida 15%, mulk to'lov tugaguncha taqiqda", "При рассрочке аванс не меньше 15%, имущество под запретом до полной оплаты")],
    bogliq: ["shartnoma.html", "chiqim-tasdiqlash.html"],
  },

  "shartnoma.html": {
    sarlavha: X("Shartnoma", "Договор"),
    nimaUchun: X("Bitta sotuv shartnomasi: narx, to'langan, qoldiq, kechikish, to'lov jadvali, taqiq va soliq bazasi.",
                 "Один договор продажи: цена, оплачено, остаток, просрочка, график платежей, запрет и налоговая база."),
    bloklar: [
      B("To'lov jadvali", "График платежей", "Har to'lovning sanasi, summasi va holati.", "Дата, сумма и статус каждого платежа."),
      B("Soliq va balans", "Налог и баланс", "Narx va balans farqi va QQS bazasi (taxminiy, buxgalteriya tasdiqlaydi).", "Разница цены и баланса и база НДС (предварительная, подтверждает бухгалтерия)."),
    ],
    amallar: [
      B("Keyingi to'lovni qabul qilish", "Принять следующий платёж", "To'lov qayd etiladi, qoldiq kamayadi.", "Платёж фиксируется, остаток уменьшается."),
      B("Belgini olib tashlash", "Снять отметку", "Adashib qabul qilingan to'lov bekor qilinadi.", "Ошибочно принятый платёж отменяется."),
      B("Taqiqni yechish", "Снять запрет", "To'lov to'liq bo'lganda. Tasdiqlash oynasi bilan.", "Когда оплата полная. С окном подтверждения."),
      B("Balansdan chiqarish", "Списать с баланса", "Chiqim formasi shu shartnoma bilan ochiladi.", "Открывается форма выбытия с этим договором."),
      B("Shartnomani yakunlash", "Завершить договор", "Sabab va shartnoma raqami bilan tasdiqlanadi.", "Подтверждается с причиной и номером договора."),
    ],
    xatolar: [],
    qoidalar: [],
    bogliq: ["shartnomalar.html", "chiqim-tasdiqlash.html"],
  },

  "ijara.html": {
    sarlavha: X("Ijara", "Аренда"),
    nimaUchun: X("Sotilguncha ijaraga berilgan binolar: maydon, oylik tushum, kechikkan to'lovlar va saqlash xarajatini qancha qoplashi.",
                 "Здания, сданные в аренду до продажи: площадь, ежемесячная выручка, просроченные платежи и насколько аренда покрывает расходы на содержание."),
    bloklar: [B("Jadval", "Таблица", "Ko'rinish: «Qarzi bor». Filtr: holat va qarz.", "Представление: «Qarzi bor». Фильтр: статус и долг.")],
    amallar: [
      B("Ijaraga berish", "Сдать в аренду", "Ijarachi, bino, oylik to'lov va muddat. Aktiv «Ijarada» bo'ladi.", "Арендатор, здание, ежемесячная плата и срок. Актив получает статус «Ijarada»."),
      B("To'lovni qabul qilish", "Принять платёж", "Oylik to'lov qayd etiladi.", "Фиксируется ежемесячный платёж."),
      B("Ijarani yakunlash", "Завершить аренду", "Tasdiqlash oynasi bilan, aktiv sotuvga qaytadi.", "С окном подтверждения, актив возвращается в продажу."),
    ],
    xatolar: [],
    qoidalar: [X("Ijara sotuvga to'sqinlik qilmaydi", "Аренда не мешает продаже")],
    bogliq: ["realizatsiya.html", "obyekt-sotuv.html"],
  },

  /* ================= Undiruv va sud ================= */
  "undiruv.html": {
    sarlavha: X("Undiruv ishlari", "Дела о взыскании"),
    nimaUchun: X("Muammoli kreditlar bo'yicha hamma ish bosqichlar doskasida: Ogohlantirish, Da'vo arizasi, Sud jarayonida, Sud qarori, Qaror ijrosi, Balansga qabul.",
                 "Все дела по проблемным кредитам на доске этапов: предупреждение, иск, судебный процесс, решение суда, исполнение, приём на баланс."),
    bloklar: [
      B("Ko'rsatkichlar", "Показатели", "Faol ishlar, undiruvdagi qarz, nazorat muddati yaqinlari va 7 kundagi majlislar.", "Активные дела, долг во взыскании, близкие контрольные сроки и заседания на 7 дней."),
      B("Yaqin majlislar", "Ближайшие заседания", "7 kun ichidagi va natijasi kiritilmagan majlislar.", "Заседания в ближайшие 7 дней и без внесённого результата."),
      B("Doska va Jadval", "Доска и таблица", "Bir ro'yxat ikki ko'rinishda. Kartani keyingi ustunga o'tkazganda yangi bosqich va nazorat muddati so'raladi.", "Один список в двух видах. При переводе карточки в следующую колонку запрашиваются новый этап и контрольный срок."),
    ],
    amallar: [B("Yangi ish ochish", "Открыть новое дело", "Qarzdor, kredit shartnomasi, qarz va garov. Ish «Ogohlantirish» bosqichida ochiladi.", "Должник, кредитный договор, долг и залог. Дело открывается на этапе «Ogohlantirish».")],
    xatolar: [],
    qoidalar: [X("Har bosqich o'tishi ish tarixiga yoziladi", "Каждый переход этапа записывается в историю дела")],
    bogliq: ["ish.html", "sud-kalendar.html", "hisobot-undiruv.html"],
  },

  "ish.html": {
    sarlavha: X("Ish varaqasi", "Карточка дела"),
    nimaUchun: X("Bitta undiruv ishi: keyingi qadam, qarzdor, kredit, qarz, garov, sud, hujjatlar, majlislar, muloqot va restrukturizatsiya.",
                 "Одно дело о взыскании: следующий шаг, должник, кредит, долг, залог, суд, документы, заседания, переговоры и реструктуризация."),
    bloklar: [
      B("Keyingi qadam", "Следующий шаг", "Bosqichga qarab bitta tugma: «Da'vo tayyorlash», «Sud qabul qilganini qayd etish», «Qaror kiritish», «Ijroga topshirish» yoki «Balansga qabul qilish».", "Одна кнопка по этапу: «Da'vo tayyorlash», «Sud qabul qilganini qayd etish», «Qaror kiritish», «Ijroga topshirish» или «Balansga qabul qilish»."),
      B("Qarzdor bilan muloqot va Restrukturizatsiya", "Переговоры и реструктуризация", "Qo'ng'iroq, uchrashuv va xatlar; qarzdor jadvalni o'zgartirishni so'rasa, taklif.", "Звонки, встречи и письма; предложение, если должник просит изменить график."),
    ],
    amallar: [
      B("Balansga qabul qilish", "Принять на баланс", "Garovni balansga olish uchun Rahbariyat qarori so'raladi. So'rov holati ishda ko'rinadi, tasdiqlangach obyekt menejeri qabulni rasmiylashtiradi.", "Запрашивается решение Руководства о приёме залога на баланс. Статус запроса виден в деле, после утверждения менеджер по объектам оформляет приём."),
      B("Majlis tayinlash", "Назначить заседание", "Sana, sud, zal va advokat. Majlis kalendarga tushadi.", "Дата, суд, зал и адвокат. Заседание попадает в календарь."),
      B("Qayd etish", "Зафиксировать", "Qarzdor bilan muloqot yoziladi.", "Записываются переговоры с должником."),
      B("Ishni yopish", "Закрыть дело", "Sabab va ish raqami bilan tasdiqlanadi.", "Подтверждается с причиной и номером дела."),
    ],
    xatolar: [X("Sud qarorida undiruv garovga qaratilmagan bo'lsa, balansga qabul taklif qilinmaydi", "Если в решении суда взыскание не обращено на залог, приём на баланс не предлагается")],
    qoidalar: [],
    bogliq: ["undiruv.html", "davo-tayyorlash.html", "qaror-kiritish.html", "qabul-boshlash.html"],
  },

  "sud-kalendar.html": {
    sarlavha: X("Sud kalendari", "Судебный календарь"),
    nimaUchun: X("Hamma sud majlislari: yaqin 7 kun tepada, pastda oy kalendari va ro'yxat. Advokat bo'yicha filtr bor.",
                 "Все судебные заседания: ближайшие 7 дней сверху, ниже календарь месяца и список. Есть фильтр по адвокату."),
    bloklar: [
      B("Yaqin 7 kun", "Ближайшие 7 дней", "Sana, mavzu, sud, zal va advokat.", "Дата, тема, суд, зал и адвокат."),
      B("Oy kalendari", "Календарь месяца", "Kunni bossangiz, o'sha kun majlislari chiqadi. «Natija kiritilmagan» belgisi o'tgan majlisda.", "Нажмите на день, чтобы увидеть его заседания. Отметка «Natija kiritilmagan» — у прошедших заседаний."),
    ],
    amallar: [B("Majlis tayinlash", "Назначить заседание", "Ish, sana va vaqt, sud, zal va advokat. Sana o'tgan kun bo'lishi mumkin emas.", "Дело, дата и время, суд, зал и адвокат. Дата не может быть в прошлом.")],
    xatolar: [X("Majlis o'tgach natijani kiritmaslik. Bunday majlis «Yaqin majlislar» blokida qoladi", "Не вносить результат после заседания. Такое заседание остаётся в блоке «Yaqin majlislar»")],
    qoidalar: [],
    bogliq: ["sud-majlis.html", "ish.html"],
  },

  "sud-majlis.html": {
    sarlavha: X("Sud majlisi", "Судебное заседание"),
    nimaUchun: X("Bitta majlis: ish, sud, sana va vaqt, zal, advokat va natija.", "Одно заседание: дело, суд, дата и время, зал, адвокат и результат."),
    bloklar: [],
    amallar: [
      B("Natijani saqlash", "Сохранить результат", "Masalan, «Keyingi majlis belgilandi» yoki «Qaror e'lon qilindi». Qaror e'lon qilinsa, qaror kiritish taklif qilinadi.", "Например, «Keyingi majlis belgilandi» или «Qaror e'lon qilindi». Если решение объявлено, предлагается внести его."),
      B("Majlisni ko'chirish", "Перенести заседание", "Yangi sana yoziladi, eski sana tarixda qoladi.", "Записывается новая дата, прежняя остаётся в истории."),
      B("Qaror kiritish", "Внести решение", "Sud qarori formasi shu ish bilan ochiladi.", "Открывается форма решения суда по этому делу."),
    ],
    xatolar: [],
    qoidalar: [],
    bogliq: ["sud-kalendar.html", "qaror-kiritish.html"],
  },

  "davo-tayyorlash.html": {
    sarlavha: X("Da'vo tayyorlash", "Подготовка иска"),
    nimaUchun: X("Talabnoma yuborilgan, lekin sudga berilmagan ish bo'yicha da'voni ro'yxatga olish. Qarz, garov va shartnoma ma'lumoti ishdan olinadi.",
                 "Регистрация иска по делу, где направлено требование, но иск ещё не подан. Долг, залог и договор берутся из дела."),
    bloklar: [
      B("Da'vo arizasi", "Исковое заявление", "Ish, sud, da'vo summasi (qarz yordamchi qatorda), topshirilgan sana, advokat, nazorat muddati, asos va imzolangan nusxa.", "Дело, суд, сумма иска (долг — в подсказке), дата подачи, адвокат, контрольный срок, основание и подписанная копия."),
      B("Tanlangan ish va Ishdagi hujjatlar", "Выбранное дело и документы", "Qarzdor, kredit, garov, kechikish va mas'ul.", "Должник, кредит, залог, просрочка и ответственный."),
    ],
    amallar: [B("Da'voni ro'yxatga olish", "Зарегистрировать иск", "Ish «Da'vo arizasi» bosqichiga o'tadi, nazorat muddati ishda ko'rinadi.", "Дело переходит на этап «Da'vo arizasi», контрольный срок виден в деле.")],
    xatolar: [],
    qoidalar: [],
    bogliq: ["ish.html", "undiruv.html"],
  },

  "qaror-kiritish.html": {
    sarlavha: X("Sud qarorini kiritish", "Ввод решения суда"),
    nimaUchun: X("Sudda ko'rilayotgan ish bo'yicha qarorni kiritish: raqam, sana, natija, undiriladigan summa, qonuniy kuchga kirish sanasi va garovga qaratilgani.",
                 "Ввод решения по делу в суде: номер, дата, результат, сумма взыскания, дата вступления в силу и обращение на залог."),
    bloklar: [B("Qaror rekvizitlari", "Реквизиты решения", "Natija: to'liq yoki qisman qanoatlantirildi, kelishuv bitimi, rad etildi.", "Результат: удовлетворено полностью или частично, мировое соглашение, отказано.")],
    amallar: [B("Qarorni saqlash", "Сохранить решение", "Ish «Sud qarori» bosqichiga o'tadi. «Undiruv garov mulkiga qaratildi» belgilansa, keyinroq garov balansga qabul uchun taklif qilinadi.", "Дело переходит на этап «Sud qarori». Если отмечено «Undiruv garov mulkiga qaratildi», позже залог будет предложен к приёму на баланс.")],
    xatolar: [X("«Undiruv garov mulkiga qaratildi» belgisini unutish: garov qabul navbatiga tushmaydi", "Забыть отметку «Undiruv garov mulkiga qaratildi»: залог не попадёт в очередь приёма")],
    qoidalar: [],
    bogliq: ["ish.html", "sud-majlis.html"],
  },

  /* ================= Hisobotlar ================= */
  "hisobotlar.html": {
    sarlavha: X("Hisobotlar markazi", "Центр отчётности"),
    nimaUchun: X("Bankning hamma hisoboti bir joyda. Tepada majburiy MB oylik hisoboti va uning muddati, pastda guruhlangan hisobotlar: CSV, chop etish yoki ochish.",
                 "Все отчёты банка в одном месте. Сверху — обязательный ежемесячный отчёт ЦБ и его срок, ниже — отчёты по группам: CSV, печать или открытие."),
    bloklar: [
      B("Markaziy bank oylik hisoboti", "Ежемесячный отчёт ЦБ", "Joriy davr, topshirish muddati va oxirgi topshirilgan hisobot.", "Текущий период, срок сдачи и последний сданный отчёт."),
      B("Hisobotlar ro'yxati", "Список отчётов", "Guruhlar: Balans aktivlari va Markaziy bank, Realizatsiya, Saqlash va himoya, Nazorat, Boshqaruv. Davr filtri hammasiga qo'llanadi.", "Группы: активы на балансе и ЦБ, реализация, содержание и охрана, контроль, управление. Фильтр периода применяется ко всем."),
    ],
    amallar: [
      B("CSV", "CSV", "Hisobot faylga yuklanadi. Niqoblash yoqilgan bo'lsa, shaxsiy ma'lumot yashiriladi.", "Отчёт выгружается в файл. Если включено маскирование, персональные данные скрыты."),
      B("Chop etish", "Печать", "Barcha filtrlangan qatorlar chop etiladi.", "Печатаются все отфильтрованные строки."),
      B("Ma'lumot eksporti", "Экспорт данных", "Istalgan to'plamni fayl qilib olish sahifasi.", "Страница выгрузки любого набора данных в файл."),
    ],
    xatolar: [],
    qoidalar: [],
    bogliq: ["hisobot-mb.html", "hisobot-eksport.html"],
  },

  "hisobot-portfel.html": {
    sarlavha: X("Balans aktivlari hisoboti", "Отчёт по активам на балансе"),
    nimaUchun: X("Portfelning to'liq surati: aktivlar soni, balans va bozor qiymati, zaxira, toifalar, holatlar, mulk turlari va me'yoriy muddatlar.",
                 "Полная картина портфеля: число активов, балансовая и рыночная стоимость, резерв, категории, статусы, виды имущества и нормативные сроки."),
    bloklar: [B("Grafiklar va jadval", "Графики и таблица", "Balans qiymati dinamikasi oy oxiri bo'yicha; pastda aktivlar ro'yxati tur va holat filtrlari bilan.", "Динамика балансовой стоимости на конец месяца; ниже — список активов с фильтрами по типу и статусу.")],
    amallar: [B("Chop etish", "Печать", "Hisobot A4 da, filtrlar sarlavhada yoziladi.", "Отчёт на A4, фильтры указаны в заголовке.")],
    xatolar: [],
    qoidalar: [],
    bogliq: ["hisobotlar.html", "zaxira.html"],
  },

  "hisobot-mb.html": {
    sarlavha: X("MB oylik hisoboti", "Ежемесячный отчёт ЦБ"),
    nimaUchun: X("Markaziy bankka har oy topshiriladigan hisobot (MB 3441-son nizom, 16-band): oy oxirida balansdagi obyektlar, jami qiymat, 1-darajali kapitalga nisbat va umidsiz toifa.",
                 "Отчёт, который ежемесячно сдаётся в ЦБ (положение ЦБ № 3441, п. 16): объекты на балансе на конец месяца, общая стоимость, отношение к капиталу первого уровня и безнадёжная категория."),
    bloklar: [
      B("Hisobot davri", "Отчётный период", "Oy tanlanadi. Joriy oy «dastlabki» deb belgilanadi.", "Выбирается месяц. Текущий месяц отмечен как «dastlabki» (предварительный)."),
      B("Ko'rsatkichlar", "Показатели", "Obyektlar soni, jami balans qiymati (16701 hisobvarag'i), kapitalga nisbat, umidsiz toifa.", "Число объектов, общая балансовая стоимость (счёт 16701), отношение к капиталу, безнадёжная категория."),
      B("Muddat", "Срок", "Har oyning 10-sanasigacha; dam olish kuniga to'g'ri kelsa, keyingi ish kuni.", "До 10-го числа каждого месяца; если это выходной, то следующий рабочий день."),
      B("Hisobotlar tarixi", "История отчётов", "Qaysi oy qachon topshirilgani va o'z vaqtida bo'lganmi.", "Какой месяц когда сдан и вовремя ли."),
    ],
    amallar: [
      B("Raqamlarni yangilash", "Обновить цифры", "Hisobot raqamlari reyestrdan qayta olinadi. Farq bo'lmasa, shuni aytadi.", "Цифры отчёта заново берутся из реестра. Если разницы нет, так и сообщается."),
      B("Kapitalni kiritish", "Внести капитал", "1-darajali kapital saqlanadi, nisbat hisoblanadi.", "Сохраняется капитал первого уровня, считается отношение."),
      B("Topshirildi deb belgilash", "Отметить как сданный", "Tasdiqlash oynasida davr va raqamlar ko'rinadi. Bu amal qaytarib bo'lmaydigan tugma bilan emas, «Belgini bekor qilish» orqali bekor qilinadi.", "В окне подтверждения видны период и цифры. Отмена — только через «Belgini bekor qilish», а не кнопкой возврата."),
      B("Ilovani yuklab olish", "Скачать приложение", "Hisobot ilovasi CSV fayl bo'lib yuklanadi.", "Приложение к отчёту скачивается CSV-файлом."),
    ],
    xatolar: [X("Kapital kiritilmasa, nisbat bo'sh qoladi va hisobot to'liq emas. Avval «Kapitalni kiritish»", "Без капитала отношение остаётся пустым и отчёт неполный. Сначала «Kapitalni kiritish»")],
    qoidalar: [X("MB hisoboti har oyning 10-sanasigacha topshiriladi (MB 3441, 16-band)", "Отчёт ЦБ сдаётся до 10-го числа каждого месяца (ЦБ 3441, п. 16)")],
    bogliq: ["hisobotlar.html", "zaxira.html"],
  },

  "hisobot-xarajat.html": {
    sarlavha: X("Xarajatlar hisoboti", "Отчёт по расходам"),
    nimaUchun: X("Saqlash xarajatlari: oylar, toifalar, filiallar va obyektlar kesimida; to'lanmagan hisob-fakturalar va balans qiymatiga nisbat.",
                 "Расходы на содержание по месяцам, категориям, филиалам и объектам; неоплаченные счета-фактуры и отношение к балансовой стоимости."),
    bloklar: [B("Kesimlar", "Разрезы", "Davr, filial va toifa filtri hamma blokka qo'llanadi. Eng katta xarajatli obyektlar pastda.", "Фильтр периода, филиала и категории применяется ко всем блокам. Объекты с наибольшими расходами — внизу.")],
    amallar: [B("Barcha yozuvlar, CSV", "Все записи, CSV", "Filtrlangan xarajat yozuvlari faylga yuklanadi.", "Отфильтрованные записи расходов выгружаются в файл.")],
    xatolar: [],
    qoidalar: [],
    bogliq: ["obyekt-xarajatlar.html", "hisobotlar.html"],
  },

  "hisobot-kpi.html": {
    sarlavha: X("Samaradorlik ko'rsatkichlari", "Показатели эффективности"),
    nimaUchun: X("Sotuv tezligi va sifati, nazorat indeksi va uning tarkibi, hududlar bo'yicha indeks.",
                 "Скорость и качество продаж, индекс контроля и его состав, индекс по регионам."),
    bloklar: [
      B("Sotuv ko'rsatkichlari", "Показатели продаж", "O'rtacha sotuv muddati, me'yoriy muddatda sotilganlar, narxning baho va balansga nisbati, saqlash xarajati.", "Средний срок продажи, проданные в нормативный срок, отношение цены к оценке и балансу, расходы на содержание."),
      B("Nazorat indeksi", "Индекс контроля", "Beshta band: ko'rik 25%, sug'urta 25%, baho 20%, hujjatlar 15%, qo'riqlash va qurilmalar 15%.", "Пять пунктов: осмотр 25%, страховка 25%, оценка 20%, документы 15%, охрана и устройства 15%."),
    ],
    amallar: [B("Chop etish", "Печать", "Tanlangan davr bo'yicha.", "За выбранный период.")],
    xatolar: [],
    qoidalar: [],
    bogliq: ["hisobot-hudud.html", "obyekt.html"],
  },

  "hisobot-hudud.html": {
    sarlavha: X("Hududlar kesimi", "Разрез по регионам"),
    nimaUchun: X("Aktivlar soni, qiymati va umidsiz ulushi hududlar va filiallar bo'yicha. Qaysi hududda xavf to'planganini ko'rsatadi.",
                 "Число, стоимость и доля безнадёжных активов по регионам и филиалам. Показывает, где сосредоточен риск."),
    bloklar: [B("Hududlar reytingi va jadvallar", "Рейтинг регионов и таблицы", "Reytingni soni, qiymati yoki umidsiz ulushi bo'yicha saralaysiz.", "Рейтинг сортируется по числу, стоимости или доле безнадёжных.")],
    amallar: [
      B("Xaritada ko'rish", "Смотреть на карте", "Obyektlar xaritasi ochiladi.", "Открывается карта объектов."),
      B("Chop etish", "Печать", "Hisobot A4 da.", "Отчёт на A4."),
    ],
    xatolar: [],
    qoidalar: [],
    bogliq: ["xarita.html", "filiallar.html"],
  },

  "hisobot-eksport.html": {
    sarlavha: X("Ma'lumot eksporti", "Экспорт данных"),
    nimaUchun: X("Istalgan to'plamni fayl qilib olish: reyestr, hujjatlar, xarajatlar, ko'riklar, lotlar, shartnomalar, hodisalar va boshqalar.",
                 "Выгрузка любого набора в файл: реестр, документы, расходы, осмотры, лоты, договоры, инциденты и другое."),
    bloklar: [
      B("Nimani yuklab olasiz", "Что выгружаете", "To'plam, davr, ustunlar (asosiy yoki barcha maydonlar) va format (CSV yoki JSON).", "Набор, период, столбцы (основные или все поля) и формат (CSV или JSON)."),
      B("Oldindan ko'rish", "Предпросмотр", "Birinchi qatorlar, yozuvlar va ustunlar soni, fayl nomi.", "Первые строки, число записей и столбцов, имя файла."),
    ],
    amallar: [B("Faylni yuklab olish", "Скачать файл", "Fayl kompyuteringizga saqlanadi. Tanlangan davrda yozuv bo'lmasa, fayl tuzilmaydi.", "Файл сохраняется на ваш компьютер. Если за период нет записей, файл не формируется.")],
    xatolar: [],
    qoidalar: [X("Eksportda niqoblash yoqilgan bo'lsa, telefon va hujjat raqamlari yashiriladi", "Если включено маскирование, номера телефонов и документов скрываются")],
    bogliq: ["hisobotlar.html"],
  },

  "hisobot-undiruv.html": {
    sarlavha: X("Undiruv hisoboti", "Отчёт по взысканию"),
    nimaUchun: X("Undiruv natijalari: faol ishlar va qarz, garov bilan qoplanish, balansga qabul qilinganlar, bosqichlar va filiallar kesimi.",
                 "Результаты взыскания: активные дела и долг, покрытие залогом, принятые на баланс, разрез по этапам и филиалам."),
    bloklar: [B("Grafiklar va jadvallar", "Графики и таблицы", "Oylar bo'yicha ochilgan va yopilgan ishlar; bosqichlar; filiallar; yopilgan ishlar.", "Открытые и закрытые дела по месяцам; этапы; филиалы; закрытые дела.")],
    amallar: [B("Chop etish", "Печать", "Tanlangan davr bo'yicha.", "За выбранный период.")],
    xatolar: [],
    qoidalar: [],
    bogliq: ["undiruv.html"],
  },

  "kirish-hisoboti.html": {
    sarlavha: X("Himoya hisoboti", "Отчёт по охране"),
    nimaUchun: X("Himoya qamrovi, davrdagi hodisalar, o'rtacha hal qilish vaqti, aloqasiz qurilmalar va rad etilgan kirishlar.",
                 "Охват охраной, инциденты за период, среднее время решения, устройства без связи и отклонённые входы."),
    bloklar: [B("Qamrov va Obyektlar kesimida", "Охват и разрез по объектам", "Davr: 7, 30 yoki 90 kun. Hal qilish vaqti hodisa qayd etilgandan «Hal qilindi» yoki «Yopildi» bo'lguncha.", "Период: 7, 30 или 90 дней. Время решения — от регистрации инцидента до статуса «Hal qilindi» или «Yopildi».")],
    amallar: [],
    xatolar: [],
    qoidalar: [],
    bogliq: ["himoya.html", "hodisalar.html"],
  },

  /* ================= Vazifalar ================= */
  "vazifalar.html": {
    sarlavha: X("Vazifalar", "Задачи"),
    nimaUchun: X("Sizga va jamoangizga biriktirilgan vazifalar. Ko'pini qoidalar o'zi yaratadi: kechikkan ko'rik, eskirgan baho, tugayotgan polis.",
                 "Задачи вам и вашей команде. Большинство создают правила сами: просроченный осмотр, устаревшая оценка, истекающий полис."),
    bloklar: [
      B("Filtr", "Фильтр", "Ochiq, Muddati o'tgan, Bugun va ertaga, Barchasi. Doira: Menga tegishli yoki Barcha vazifalar.", "Открытые, просроченные, сегодня и завтра, все. Охват: мои или все задачи."),
      B("Vazifa kartasi", "Карточка задачи", "Nomi, obyekt, rol, ustuvorlik va muddat.", "Название, объект, роль, приоритет и срок."),
    ],
    amallar: [
      B("Vazifa qo'shish", "Добавить задачу", "Nomi, obyekt, ijrochi va muddat.", "Название, объект, исполнитель и срок."),
      B("Belgi (bajarildi)", "Отметка (выполнено)", "Vazifa yopiladi, 8 soniya «Qaytarish» yoki Ctrl+Z.", "Задача закрывается, 8 секунд доступны «Qaytarish» или Ctrl+Z."),
      B("Qoldirish", "Отложить", "Vazifa tanlangan sanagacha yashirinadi.", "Задача скрывается до выбранной даты."),
      B("O'chirish", "Удалить", "O'z vazifangiz o'chadi, «Qaytarish» mumkin.", "Ваша задача удаляется, доступно «Qaytarish»."),
    ],
    xatolar: [X("Qoida yaratgan vazifani sababini tuzatmasdan yopish. Muammo qolsa, qoida vazifani qayta ochadi", "Закрывать задачу от правила, не устранив причину. Если проблема останется, правило снова откроет задачу")],
    qoidalar: [],
    bogliq: ["tasdiqlar.html", "bildirishnomalar.html", "panel-obyekt.html"],
  },

  "tasdiqlar.html": {
    sarlavha: X("Qarorlar", "Решения"),
    nimaUchun: X("To'rt ko'z qoidasi bo'yicha qarorlar: bir xodim so'rov yuboradi, boshqasi tasdiqlaydi. Taklif, narx pasaytirish, baho, balansga qabul, balansdan chiqarish va zaxira stavkasi shu yerdan o'tadi.",
                 "Решения по принципу четырёх глаз: один сотрудник отправляет запрос, другой утверждает. Здесь проходят предложения, снижение цены, оценка, приём на баланс, списание и ставка резерва."),
    bloklar: [
      B("Ko'rinishlar", "Представления", "Mendan kutilmoqda (sizning qaroringiz), Men yuborganlar (sizning so'rovlaringiz holati), Hal qilinganlar (oxirgi 90 kun).", "Mendan kutilmoqda (ваше решение), Men yuborganlar (статус ваших запросов), Hal qilinganlar (последние 90 дней)."),
      B("Qaror kartasi", "Карточка решения", "Tur, sarlavha, summa, muallif (ism, rol, sana) va javob muddati: o'tgan bo'lsa qizil, 1 ish kuni qolsa sariq.", "Тип, заголовок, сумма, автор (имя, роль, дата) и срок ответа: красный, если прошёл, жёлтый, если остался 1 рабочий день."),
      B("Nima o'zgaradi", "Что изменится", "Oldin → keyin: qiymat, narx yoki holat.", "До → после: стоимость, цена или статус."),
    ],
    amallar: [
      B("Tasdiqlash", "Утвердить", "Oynada «Nima o'zgaradi» qatorlari takrorlanadi. Tasdiqlagach bog'liq yozuv darhol o'zgaradi. Balansdan chiqarish uchun obyekt raqamini yozasiz.", "В окне повторяются строки «Nima o'zgaradi». После утверждения связанная запись меняется сразу. Для списания нужно ввести номер объекта."),
      B("Rad etish", "Отклонить", "Sabab majburiy, kamida 5 belgi, muallifga ko'rinadi.", "Причина обязательна, не меньше 5 символов, её видит автор."),
      B("Bir nechtasini birdan", "Несколько сразу", "Faqat «Mendan kutilmoqda»da, bir turdagi so'rovlar uchun. Oynada soni va jami summa. Balansdan chiqarish ommaviy tasdiqlanmaydi.", "Только в «Mendan kutilmoqda» и для запросов одного типа. В окне — количество и общая сумма. Списание массово не утверждается."),
      B("O'rinbosar tayinlash", "Назначить заместителя", "Ta'til vaqtida qarorni o'rinbosar qabul qiladi. Qarorda «o'rinbosar» deb yoziladi.", "На время отпуска решения принимает заместитель. В решении указывается «в качестве заместителя»."),
    ],
    xatolar: [X("O'z so'rovingizda tasdiqlash tugmasini qidirish. Uning o'rnida «Siz yuborgansiz. Boshqa xodim tasdiqlaydi» yozuvi turadi", "Искать кнопку утверждения в своём запросе. Вместо неё написано «Siz yuborgansiz. Boshqa xodim tasdiqlaydi»")],
    qoidalar: [X("Bitta login o'z so'rovini hech qachon tasdiqlay olmaydi, administrator ham", "Один логин никогда не утверждает свой запрос, даже администратор")],
    bogliq: ["panel.html", "takliflar.html", "lot.html", "zaxira.html", "chiqim-tasdiqlash.html"],
  },

  "bildirishnomalar.html": {
    sarlavha: X("Bildirishnomalar", "Уведомления"),
    nimaUchun: X("Qoidalar yuborgan eslatmalar: umidsizgacha qolgan kun, tugayotgan polis va baho, kechikkan ko'rik, aloqasiz qurilma, soliq imtiyozi.",
                 "Напоминания от правил: дни до безнадёжной категории, истекающие полис и оценка, просроченный осмотр, устройство без связи, налоговая льгота."),
    bloklar: [B("Ro'yxat", "Список", "O'qilmagan va Barchasi; kun bo'yicha guruhlangan. Bildirishnomani bossangiz, bog'liq sahifa ochiladi.", "Непрочитанные и все; сгруппированы по дням. Нажмите на уведомление, чтобы открыть связанную страницу.")],
    amallar: [B("Barchasini o'qilgan qilish", "Отметить все прочитанными", "Hammasi o'qilgan bo'ladi, 8 soniya «Qaytarish» mumkin.", "Все становятся прочитанными, 8 секунд можно нажать «Qaytarish».")],
    xatolar: [],
    qoidalar: [],
    bogliq: ["vazifalar.html", "sozlamalar.html"],
  },

  /* ================= Sozlamalar ================= */
  "sozlamalar.html": {
    sarlavha: X("Sozlamalar", "Настройки"),
    nimaUchun: X("Shaxsiy profil va ish qulayligi hamma uchun. Eskalatsiya qoidalari, me'yoriy parametrlar va shaxsiy ma'lumotlar administratorga (parametrlarni Buxgalteriya ham o'zgartiradi).",
                 "Личный профиль и удобство работы — для всех. Правила эскалации, нормативные параметры и персональные данные — для администратора (параметры меняет и Бухгалтерия)."),
    bloklar: [
      B("Profil va Aloqa", "Профиль и контакты", "Telefon va elektron pochta xodimlar ro'yxatida ko'rinadi.", "Телефон и почта видны в списке сотрудников."),
      B("Ish qulayligi", "Удобство работы", "Interfeys tili, bildirishnomalar va «Tanishuv sayohatlari»: «Qayta ko'rsatish» hamma sayohatni yana taklif qiladi.", "Язык интерфейса, уведомления и «Tanishuv sayohatlari»: «Qayta ko'rsatish» снова предлагает все туры."),
      B("O'rinbosar", "Заместитель", "Davr va o'rinbosar. Shu davrda o'rinbosar sizning qarorlaringizni qabul qiladi.", "Период и заместитель. В этот период заместитель принимает ваши решения."),
      B("Eskalatsiya qoidalari va Me'yoriy parametrlar", "Правила эскалации и нормативные параметры", "Muddat qoidalari va hisob parametrlari: zaxira stavkasi, ko'rik davri, savdo muddatlari.", "Правила сроков и параметры расчётов: ставка резерва, период осмотров, сроки торгов."),
    ],
    amallar: [
      B("Saqlash", "Сохранить", "Aloqa ma'lumoti saqlanadi.", "Контакты сохраняются."),
      B("O'rinbosarni saqlash", "Сохранить заместителя", "O'rinbosar faqat boshqa faol xodim bo'la oladi, davr boshlanishi tugashidan oldin.", "Заместителем может быть только другой активный сотрудник, начало периода — раньше окончания."),
      B("Parametrni o'zgartirish", "Изменить параметр", "Yangi qiymat saqlanadi va amallar tarixiga yoziladi. Zaxira va soliq stavkasi Rahbariyat tasdig'idan keyin kuchga kiradi.", "Новое значение сохраняется и записывается в журнал. Ставки резерва и налога вступают в силу после утверждения Руководством."),
      B("Anonimlashtirish", "Обезличить", "Muddati o'tgan tashrifchi ma'lumoti o'chiriladi. Sabab va loginni yozib tasdiqlanadi.", "Данные посетителей с истёкшим сроком удаляются. Подтверждается причиной и вводом логина."),
    ],
    xatolar: [],
    qoidalar: [],
    bogliq: ["foydalanuvchilar.html", "tasdiqlar.html"],
  },

  "foydalanuvchilar.html": {
    sarlavha: X("Foydalanuvchilar", "Пользователи"),
    nimaUchun: X("Barcha xodim hisoblari: rol, filial, bo'lim va holat. Faqat administrator ochadi.",
                 "Все учётные записи сотрудников: роль, филиал, подразделение и статус. Открывает только администратор."),
    bloklar: [B("Jadval", "Таблица", "Ko'rinish: «Bloklangan hisoblar», «Filial rahbarlari». Filtr: rol, holat, filial.", "Представления: «Bloklangan hisoblar», «Filial rahbarlari». Фильтр: роль, статус, филиал.")],
    amallar: [
      B("Foydalanuvchi qo'shish", "Добавить пользователя", "Ism, login, rol, filial va bo'lim. «Hisob ochish» bosilgach xodim tizimga kira oladi.", "Имя, логин, роль, филиал и подразделение. После «Hisob ochish» сотрудник может войти."),
      B("Bloklash", "Заблокировать", "Sabab majburiy. Xodim kira olmaydi, tarixi saqlanadi.", "Причина обязательна. Сотрудник не сможет войти, его история сохраняется."),
      B("Faollashtirish", "Активировать", "Hisob yana kira oladi.", "Учётная запись снова может входить."),
    ],
    xatolar: [],
    qoidalar: [X("Ishdan ketgan xodim hisobi o'sha kuni bloklanadi", "Учётная запись уволенного сотрудника блокируется в тот же день")],
    bogliq: ["foydalanuvchi.html", "rollar.html"],
  },

  "foydalanuvchi.html": {
    sarlavha: X("Foydalanuvchi", "Пользователь"),
    nimaUchun: X("Bitta xodim hisobi: rol, filial, lavozim, aloqa, hisob xavfsizligi, rol huquqlari va oxirgi amallari.",
                 "Одна учётная запись: роль, филиал, должность, контакты, безопасность, права роли и последние действия."),
    bloklar: [B("Rol huquqlari", "Права роли", "Tanlangan rol qaysi bo'limda nima qila olishi.", "Что может выбранная роль в каждом разделе.")],
    amallar: [
      B("O'zgarishlarni saqlash", "Сохранить изменения", "Rol yoki filial o'zgarsa, oynada «Rol o'zgaradi: X → Y» ko'rinadi. Xodim keyingi kirishda yangi huquqlar bilan ishlaydi.", "Если меняются роль или филиал, в окне видно «Rol o'zgaradi: X → Y». Сотрудник получит новые права при следующем входе."),
      B("Parol o'rnatish", "Установить пароль", "Server rejimida vaqtinchalik parol beriladi, xodim kirgach almashtiradi.", "В серверном режиме выдаётся временный пароль, сотрудник меняет его после входа."),
    ],
    xatolar: [],
    qoidalar: [X("O'z rolingizni o'zgartira olmaysiz", "Вы не можете изменить собственную роль")],
    bogliq: ["foydalanuvchilar.html"],
  },

  "rollar.html": {
    sarlavha: X("Rollar va huquqlar", "Роли и права"),
    nimaUchun: X("O'nta rol va har birining bo'limlardagi huquqi: ko'radi, yozadi, tasdiqlaydi. Xodimga boshqa huquq kerak bo'lsa, unga mos rol beriladi.",
                 "Десять ролей и права каждой в разделах: видит, пишет, утверждает. Если сотруднику нужны другие права, ему назначают подходящую роль."),
    bloklar: [B("Huquqlar matritsasi va Rollar", "Матрица прав и роли", "K — ko'radi, Y — yozadi, T — tasdiqlaydi. Har rol kartasida uning vazifasi va bosh sahifasi.", "К — видит, Y — пишет, T — утверждает. В карточке каждой роли — её задача и главная страница.")],
    amallar: [],
    xatolar: [],
    qoidalar: [X("Filial rahbari faqat o'z filiali yozuvlarini ko'radi va o'zgartiradi", "Руководитель филиала видит и меняет только записи своего филиала")],
    bogliq: ["foydalanuvchilar.html"],
  },

  "filiallar.html": {
    sarlavha: X("Filiallar", "Филиалы"),
    nimaUchun: X("Bank filiallari va ularning balansidagi aktivlar: soni, qiymati, umidsizga yaqinlari, baholanmaganlar va xodimlar.",
                 "Филиалы банка и активы на их балансе: число, стоимость, близкие к безнадёжным, неоценённые и сотрудники."),
    bloklar: [B("Jadval", "Таблица", "Hudud va tur bo'yicha filtr.", "Фильтр по региону и типу.")],
    amallar: [],
    xatolar: [],
    qoidalar: [X("Bosh ofis xodimlari filialga biriktirilmaydi", "Сотрудники головного офиса не привязываются к филиалу")],
    bogliq: ["hisobot-hudud.html"],
  },

  "integratsiyalar.html": {
    sarlavha: X("Integratsiyalar", "Интеграции"),
    nimaUchun: X("Tashqi tizimlar ro'yxati: E-auksion, kadastr, YHXX, bank ABS, kommunal ta'minotchilar, NVR va IoT shlyuzi, SMS. Hozir hech biri ulanmagan, ularning ma'lumoti tegishli sahifada qo'lda kiritiladi.",
                 "Список внешних систем: электронный аукцион, кадастр, ГУБДД, АБС банка, коммунальные поставщики, NVR и IoT-шлюз, SMS. Сейчас ни одна не подключена, их данные вносятся вручную на соответствующих страницах."),
    bloklar: [B("Tizim kartalari", "Карточки систем", "Nima keladi, hozir qanday kiritiladi va qaysi sahifada.", "Что поступает, как это вносится сейчас и на какой странице.")],
    amallar: [],
    xatolar: [],
    qoidalar: [X("Har ulanish uchun axborot xavfsizligi xizmatining roziligi va shartnoma kerak", "Для каждого подключения нужны согласие службы информационной безопасности и договор")],
    bogliq: ["rasmiylashtirish.html", "lotlar.html", "qurilmalar.html"],
  },

  "amallar-tarixi.html": {
    sarlavha: X("Amallar tarixi", "Журнал действий"),
    nimaUchun: X("Tizimdagi har bir o'zgarish: kim, qachon, qaysi yozuvda nimani eski qiymatdan yangisiga o'zgartirgan. «Buni kim o'zgartirdi?» degan savolga javob shu yerda.",
                 "Каждое изменение в системе: кто, когда и в какой записи что поменял со старого значения на новое. Ответ на вопрос «кто это изменил?» — здесь."),
    bloklar: [
      B("Davr va ko'rinish", "Период и представление", "Bugun, 7 kun, 30 kun yoki oraliq. Tayyor ko'rinishlar: rad etilgan kirishlar, hisoblar, parametr va qoidalar, o'chirilgan yozuvlar.", "Сегодня, 7 дней, 30 дней или интервал. Готовые представления: отклонённые входы, учётные записи, параметры и правила, удалённые записи."),
      B("Jadval", "Таблица", "Filtr: amal, bo'lim, xodim.", "Фильтр: действие, раздел, сотрудник."),
    ],
    amallar: [
      B("CSV", "CSV", "Filtrlangan jurnal faylga yuklanadi.", "Отфильтрованный журнал выгружается в файл."),
      B("Chop etish", "Печать", "Filtrlar sarlavhada yoziladi.", "Фильтры указываются в заголовке."),
    ],
    xatolar: [],
    qoidalar: [X("Server rejimida jurnal serverda yoziladi va o'chirilmaydi", "В серверном режиме журнал ведётся на сервере и не удаляется")],
    bogliq: ["foydalanuvchilar.html"],
  },

  "qollanma.html": {
    sarlavha: X("Yordam markazi", "Центр помощи"),
    nimaUchun: X("Tizim bo'yicha hamma yo'riqnoma: rollar, sahifalar, jarayonlar, atamalar, savollar va sayohatlar.",
                 "Все инструкции по системе: роли, страницы, процессы, термины, вопросы и туры."),
    bloklar: [],
    amallar: [
      B("Qidiruv", "Поиск", "Yozgan so'zingiz hamma maqolada darhol qidiriladi, topilgan joy ajratiladi.", "Введённое слово сразу ищется по всем статьям, найденное выделяется."),
      B("Sayohatni boshlash", "Начать тур", "Ekran qorayadi va kerakli joy yoritiladi. Keyingi qadam uchun «Keyingi» yoki → tugmasi, to'xtatish uchun Esc.", "Экран затемняется, нужное место подсвечивается. Для следующего шага — «Keyingi» или →, для остановки — Esc."),
    ],
    xatolar: [],
    qoidalar: [],
    bogliq: ["sozlamalar.html"],
  },

  /* ================= Kirish ================= */
  "kirish.html": {
    sarlavha: X("Tizimga kirish", "Вход в систему"),
    nimaUchun: X("Login va parol bilan kirish. Kirgach tizim sizni rolingizning bosh sahifasiga olib boradi.",
                 "Вход по логину и паролю. После входа система открывает главную страницу вашей роли."),
    bloklar: [],
    amallar: [B("Kirish", "Войти", "Login va parol tekshiriladi. Sessiya 30 daqiqa harakatsizlikdan keyin yopiladi, ish shu sahifadan davom etadi.", "Проверяются логин и пароль. Сессия закрывается после 30 минут бездействия, работа продолжается с той же страницы.")],
    xatolar: [X("Parolni unutgan bo'lsangiz, elektron pochta orqali tiklanmaydi: administratorga murojaat qiling", "Забытый пароль не восстанавливается по почте: обратитесь к администратору")],
    qoidalar: [X("Parol kamida 8 belgi, unda harf va raqam bo'ladi", "Пароль не короче 8 символов, в нём есть буквы и цифры")],
    bogliq: ["parol-tiklash.html"],
  },

  "parol-tiklash.html": {
    sarlavha: X("Parolni tiklash", "Восстановление пароля"),
    nimaUchun: X("Parolni tizim administratori tiklaydi. Tizim parolni pochta yoki SMS orqali yubormaydi.",
                 "Пароль восстанавливает администратор системы. Система не отправляет пароль по почте или SMS."),
    bloklar: [],
    amallar: [B("Uch qadam", "Три шага", "Administratorga loginingizni ayting, vaqtinchalik parol oling, kirgach o'z parolingizni o'rnating.", "Сообщите администратору логин, получите временный пароль, после входа установите свой.")],
    xatolar: [],
    qoidalar: [],
    bogliq: ["parol-yangilash.html", "kirish.html"],
  },

  "parol-yangilash.html": {
    sarlavha: X("Parolni almashtirish", "Смена пароля"),
    nimaUchun: X("Vaqtinchalik parol bilan kirgan bo'lsangiz, shu yerda o'z parolingizni o'rnatasiz.", "Если вы вошли с временным паролем, установите здесь свой."),
    bloklar: [],
    amallar: [B("Parolni saqlash", "Сохранить пароль", "Yangi parol talablarga javob bersa saqlanadi.", "Новый пароль сохраняется, если соответствует требованиям.")],
    xatolar: [],
    qoidalar: [X("Namoyish rejimida parol almashtirilmaydi", "В демонстрационном режиме пароль не меняется")],
    bogliq: ["kirish.html"],
  },

  "xato-403.html": {
    sarlavha: X("Ruxsat yo'q", "Нет доступа"),
    nimaUchun: X("Sahifa sizning rolingizga yopiq. Sahifada uni kim ochishi mumkinligi yozilgan.", "Страница закрыта для вашей роли. На странице указано, кто может её открыть."),
    bloklar: [],
    amallar: [B("Orqaga qaytish", "Вернуться назад", "Oldingi sahifaga qaytasiz.", "Возврат на предыдущую страницу.")],
    xatolar: [],
    qoidalar: [X("Boshqa huquq kerak bo'lsa, administrator sizga mos rol beradi", "Если нужны другие права, администратор назначит подходящую роль")],
    bogliq: ["rollar.html"],
  },

  "xato-404.html": {
    sarlavha: X("Sahifa topilmadi", "Страница не найдена"),
    nimaUchun: X("Manzil xato yozilgan yoki yozuv o'chirilgan. Balansdan chiqarilgan aktiv arxivda saqlanadi.", "Адрес набран с ошибкой или запись удалена. Списанный актив хранится в архиве."),
    bloklar: [],
    amallar: [B("Bosh sahifa", "Главная страница", "Rolingizning bosh sahifasi ochiladi.", "Открывается главная страница вашей роли.")],
    xatolar: [],
    qoidalar: [],
    bogliq: ["arxiv.html"],
  },
};

/* Maqola havolasi: yordam paneli "Qo'llanmada batafsil" tugmasi shu manzilni ochadi */
Object.keys(window.MKB_YORDAM).forEach(f => { window.MKB_YORDAM[f].havola = "qollanma.html#" + f; });
window.mkbYordamTuzat();

})();

/* Xodimlarning ish suratlari: F.I.Sh. -> fayl.
   Surat qo'shilsa shapkadagi profil va foydalanuvchilar ro'yxati avtomatik yangilanadi. */
window.MKB_XODIM_RASMLARI = window.MKB_XODIM_RASMLARI || {};
