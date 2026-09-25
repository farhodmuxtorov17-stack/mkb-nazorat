/* ============================================================
   tizim-batafsil.js — tizim-ishlashi.html sahifasidagi bloklarning mazmuni.

   Kalit HTML dagi data-batafsil bilan bir xil. Tuzilishi taqdimot-batafsil.js
   dagidek: { yorliq, sarlavha, tana (HTML), ru: {...}, manba: [[nom, url], ...] }.
   Uzun matn lug'atdan o'tkazilmaydi: ruscha varianti shu yozuvning o'zida turadi.
   ============================================================ */
window.MKB_BATAFSIL = Object.assign(window.MKB_BATAFSIL || {}, {

/* ---------- Bosh raqamlar ---------- */

"ti.son-41": {
  yorliq: "Jamoa rahbarlari uchun",
  sarlavha: "41 soniya: har bir bo'lak qayerdan olingan",
  tana: "<p>Bu yig'indi hisob, bitta o'lchov emas. Har bo'lak o'z manbasidan olingan va pilotda qayta o'lchanadi.</p>" +
    "<table><tr><th>Bo'lak</th><th>Manba</th><th>Soniya</th></tr>" +
    "<tr><td>Kamera uyg'onishi</td><td>Batareyali kamera datasheeti</td><td class='n'>1,4</td></tr>" +
    "<tr><td>Kamerada tasnif</td><td>Qurilma ichidagi tahlil</td><td class='n'>0,9</td></tr>" +
    "<tr><td>Modemning PSM dan chiqishi</td><td>Operator tarmog'i, RSRP &minus;89 dBm</td><td class='n'>4,6</td></tr>" +
    "<tr><td>TLS tiklash va POST</td><td>Sessiya kaliti saqlangan holat</td><td class='n'>3,0</td></tr>" +
    "<tr><td>Kadr yuklash</td><td>148 KB, uplink 1,1 Mbit/s</td><td class='n'>1,1</td></tr>" +
    "<tr><td>Adapter va shina</td><td>Server o'lchovi</td><td class='n'>0,4</td></tr>" +
    "<tr><td>Qoida va voqea</td><td>Server o'lchovi</td><td class='n'>0,6</td></tr>" +
    "<tr><td>Xabarnomaning yetishi</td><td>Push xizmati statistikasi</td><td class='n'>1,0</td></tr>" +
    "<tr><td>Navbatchining javobi</td><td>Tungi smena o'lchovi</td><td class='n'>24,0</td></tr>" +
    "<tr><td>Jonli videoning birinchi kadri</td><td>WebRTC sessiyasi</td><td class='n'>4,0</td></tr></table>" +
    "<p class='ogoh'>Bu raqam SLA emas. Shartnomaga boshqa ko'rsatkich kiradi: hodisa kelganidan operator javob berguncha 5 daqiqa. 41 soniya &mdash; texnik imkoniyat, 5 daqiqa &mdash; majburiyat.</p>",
  ru: {
    yorliq: "Для тимлида",
    sarlavha: "41 секунда: откуда взята каждая часть",
    tana: "<p>Это расчёт по частям. Каждая часть взята из своего источника и будет перемерена на пилоте.</p>" +
      "<table><tr><th>Часть</th><th>Источник</th><th>Секунд</th></tr>" +
      "<tr><td>Пробуждение камеры</td><td>Даташит батарейной камеры</td><td class='n'>1,4</td></tr>" +
      "<tr><td>Классификация в камере</td><td>Аналитика на устройстве</td><td class='n'>0,9</td></tr>" +
      "<tr><td>Выход модема из PSM</td><td>Сеть оператора, RSRP &minus;89 дБм</td><td class='n'>4,6</td></tr>" +
      "<tr><td>Возобновление TLS и POST</td><td>Сохранённый ключ сессии</td><td class='n'>3,0</td></tr>" +
      "<tr><td>Загрузка кадра</td><td>148 КБ при аплинке 1,1 Мбит/с</td><td class='n'>1,1</td></tr>" +
      "<tr><td>Адаптер и шина</td><td>Замер на сервере</td><td class='n'>0,4</td></tr>" +
      "<tr><td>Правила и инцидент</td><td>Замер на сервере</td><td class='n'>0,6</td></tr>" +
      "<tr><td>Доставка уведомления</td><td>Статистика push-сервиса</td><td class='n'>1,0</td></tr>" +
      "<tr><td>Реакция дежурного</td><td>Замер ночной смены</td><td class='n'>24,0</td></tr>" +
      "<tr><td>Первый кадр живого видео</td><td>Сессия WebRTC</td><td class='n'>4,0</td></tr></table>" +
      "<p class='ogoh'>Это не SLA. В договор идёт другой показатель: пять минут от события до ответа оператора. 41 секунда — техническая возможность, пять минут — обязательство.</p>"
  },
  manba: []
},

"ti.son-ulush": {
  yorliq: "Jamoa rahbarlari uchun",
  sarlavha: "Platformaning ulushi olti soniya. Nega uni qisqartirish shoshilinch emas",
  tana: "<p>Server tomonida bajariladigan ish: adapterda normallashtirish 0,4 s, qoidalar va voqea yaratish 0,6 s, xabarnomani yuborish 1,0 s, media sessiyasini ochish 4,0 s. Jami 6,0 soniya, shundan to'rttasi kameraning o'ziga ulanishga ketadi.</p>" +
    "<h4>Nima tezlashtiriladi va qancha turadi</h4>" +
    "<table><tr><th>Chora</th><th>Tejaladi</th><th>Narxi</th></tr>" +
    "<tr><td>Modemni uyg'oq tutish</td><td class='n'>4,6 s</td><td>Kunlik sarf 2,5 barobar oshadi</td></tr>" +
    "<tr><td>Kadrni kutmay xabar berish</td><td class='n'>1,1 s</td><td>Operator rasmsiz qaror qabul qiladi</td></tr>" +
    "<tr><td>Oqimni oldindan ochib qo'yish</td><td class='n'>4,0 s</td><td>Kamera uxlamaydi, batareya bir necha kunda tugaydi</td></tr>" +
    "<tr><td>Smena jadvalini to'g'rilash</td><td class='n'>10&ndash;15 s</td><td>Tashkiliy qaror, jihoz talab qilmaydi</td></tr></table>" +
    "<p>Uchta texnik chora ham quvvat hisobini buzadi. Eng katta va eng arzon yutuq &mdash; to'rtinchisi.</p>",
  ru: {
    yorliq: "Для тимлида",
    sarlavha: "Доля платформы — шесть секунд. Почему её сокращение не срочно",
    tana: "<p>Что делается на стороне сервера: нормализация в адаптере 0,4 с, правила и создание инцидента 0,6 с, отправка уведомления 1,0 с, открытие медиасессии 4,0 с. Итого 6,0 секунды, и четыре из них — подключение к самой камере.</p>" +
      "<h4>Что можно ускорить и какой ценой</h4>" +
      "<table><tr><th>Мера</th><th>Выигрыш</th><th>Цена</th></tr>" +
      "<tr><td>Держать модем активным</td><td class='n'>4,6 с</td><td>Суточное потребление вырастет в 2,5 раза</td></tr>" +
      "<tr><td>Слать тревогу, не дожидаясь кадра</td><td class='n'>1,1 с</td><td>Оператор решает, не видя картинки</td></tr>" +
      "<tr><td>Держать поток открытым заранее</td><td class='n'>4,0 с</td><td>Камера не спит, батарея садится за несколько дней</td></tr>" +
      "<tr><td>Поправить график смен</td><td class='n'>10–15 с</td><td>Организационное решение, без оборудования</td></tr></table>" +
      "<p>Первые три меры ломают энергетический баланс. Самый крупный и самый дешёвый выигрыш — четвёртая.</p>"
  },
  manba: []
},

"ti.son-148": {
  yorliq: "Moliya va aloqa uchun",
  sarlavha: "148 kilobayt: bitta hodisaning tannarxi",
  tana: "<p>Markazga hodisa yozuvi va bitta kalit kadr boradi. Video klip obyektda qoladi va faqat so'ralganda yuklanadi.</p>" +
    "<table><tr><th>Nima</th><th>Hajmi</th></tr>" +
    "<tr><td>JSON yozuv</td><td class='n'>412 B</td></tr>" +
    "<tr><td>Kalit kadr, 1280&times;720, sifat 75</td><td class='n'>148 KB</td></tr>" +
    "<tr><td>Talab bo'yicha 10 soniyalik klip</td><td class='n'>3,1 MB</td></tr>" +
    "<tr><td>Bitta puls</td><td class='n'>180 B</td></tr></table>" +
    "<h4>Nega kadr yuboriladi, klip esa yo'q</h4>" +
    "<p>Kadr operatorga qaror uchun yetarli va u zaif signalda ham bir soniyada o'tadi. O'sha klipni shu kanalda yuborish 22 soniya oladi va batareyadan taxminan 0,2 Vt&middot;soat yeydi. Shuning uchun klip tunda navbatda turadi; tong otgach yoki operator so'raganda yuboriladi.</p>" +
    "<p>267 obyektda kuniga 30 tadan hodisa bilan bu 1,2 GB kunlik kiruvchi trafik degani &mdash; bank kanalida sezilmaydigan hajm.</p>",
  ru: {
    yorliq: "Для финансов и связи",
    sarlavha: "148 килобайт: себестоимость одного события",
    tana: "<p>В центр уходит запись о событии и один ключевой кадр. Видеоклип остаётся на объекте и загружается только по запросу.</p>" +
      "<table><tr><th>Что</th><th>Объём</th></tr>" +
      "<tr><td>JSON-запись</td><td class='n'>412 Б</td></tr>" +
      "<tr><td>Ключевой кадр, 1280&times;720, качество 75</td><td class='n'>148 КБ</td></tr>" +
      "<tr><td>Клип 10 секунд по запросу</td><td class='n'>3,1 МБ</td></tr>" +
      "<tr><td>Один импульс состояния</td><td class='n'>180 Б</td></tr></table>" +
      "<h4>Почему кадр уходит, а клип нет</h4>" +
      "<p>Кадра оператору достаточно для решения, и он проходит за секунду даже на слабом сигнале. Тот же клип в этом канале займёт 22 секунды и около 0,2 Вт&middot;ч батареи. Поэтому ночью клип ждёт в очереди и уходит утром или по запросу оператора.</p>" +
      "<p>На 267 объектах при 30 событиях в сутки это 1,2 ГБ входящего трафика в день — незаметный объём для банковского канала.</p>"
  },
  manba: []
},

"ti.son-qatlam": {
  yorliq: "Rahbariyat uchun",
  sarlavha: "Olti qatlam — olti xil shartnoma",
  tana: "<p>Qatlamlarga bo'lish texnik moda emas, javobgarlik chegarasi. Kamera ishlamay qolsa, kim keladi va qancha vaqtda &mdash; shu bo'linishdan kelib chiqadi.</p>" +
    "<ul><li>Qurilma va mahalliy tugun &mdash; yetkazuvchi kafolati va integrator servisi.</li>" +
    "<li>Kanal &mdash; aloqa operatori bilan SIM shartnomasi va yopiq APN.</li>" +
    "<li>Adapter, yadro va ish joyi &mdash; bankning o'z jamoasi.</li></ul>" +
    "<p>Bitta bosh integrator modelida birinchi ikki qatlam bitta shartnomaga yig'iladi: nosozlikda bank bitta savol beradi: qachon tuzatiladi.</p>" +
    "<p>Muhim chegara: yadro bankda qoladi. Aks holda yetkazuvchi almashtirilganda butun nazorat tizimi qaytadan quriladi.</p>",
  ru: {
    yorliq: "Для правления",
    sarlavha: "Шесть слоёв — шесть разных договоров",
    tana: "<p>Деление на слои — не техническая мода, а граница ответственности. Если камера встала, именно оно определяет, кто приедет и в какой срок.</p>" +
      "<ul><li>Устройство и локальный узел — гарантия поставщика и сервис интегратора.</li>" +
      "<li>Канал — договор на SIM и закрытый APN с оператором связи.</li>" +
      "<li>Адаптер, ядро и рабочее место — собственная команда банка.</li></ul>" +
      "<p>В модели одного генерального интегратора первые два слоя сводятся в один договор: при отказе банк спрашивает не кто виноват, а когда будет исправлено.</p>" +
      "<p>Важная граница: ядро остаётся у банка. Иначе смена поставщика означает построить систему контроля заново.</p>"
  },
  manba: []
},

/* ---------- Hodisaning yo'li ---------- */

"ti.q01": {
  yorliq: "Montajchilar uchun",
  sarlavha: "PIR datchik: nimani ko'radi va nimani ko'rmaydi",
  tana: "<p>Piroelektrik sensor infraqizil nurlanishning siljishini sezadi. Shuning uchun u qimirlamay turgan odamni bir necha soniyadan keyin yo'qotadi, lekin uyqu rejimida deyarli energiya yemaydi.</p>" +
    "<h4>Montajda hal qilinadigan uchta narsa</h4>" +
    "<ul><li><b>Balandlik 2,5&ndash;3 m.</b> Pastroqda it va qo'y ham signal beradi, balandroqda odam sezish zonasidan chiqib ketadi.</li>" +
    "<li><b>Burchak.</b> Sensor o'ziga tik kelayotgan odamni yomon, ko'ndalang o'tayotganini yaxshi sezadi. Kameraning o'qi yo'lakka burchak ostida qaratiladi.</li>" +
    "<li><b>Zonani kesish.</b> Ko'chadagi yo'l, qo'shni darvoza va daraxt shoxi sozlamada zonadan chiqariladi.</li></ul>" +
    "<p class='ogoh'>Qishda PIR yaxshiroq ishlaydi: fon sovuq, odam issiq. Yozda +40 &deg;C da fon bilan tana harorati yaqinlashadi va sezuvchanlik pasayadi &mdash; bu yechim tanlashda hisobga olinadi.</p>",
  ru: {
    yorliq: "Для монтажников",
    sarlavha: "PIR-датчик: что он видит и чего не видит",
    tana: "<p>Пироэлектрический датчик реагирует не на температуру, а на перемещение источника инфракрасного излучения. Поэтому неподвижного человека он теряет через несколько секунд, зато в спящем режиме почти не потребляет энергии.</p>" +
      "<h4>Три вещи, которые решаются на монтаже</h4>" +
      "<ul><li><b>Высота 2,5&ndash;3 м.</b> Ниже — сработки на собак и овец, выше — человек выходит из зоны обнаружения.</li>" +
      "<li><b>Угол.</b> Датчик плохо видит идущего прямо на него и хорошо — пересекающего зону. Ось камеры ставится к проходу под углом.</li>" +
      "<li><b>Обрезка зоны.</b> Проезжая часть, соседние ворота и ветка дерева исключаются из зоны в настройках.</li></ul>" +
      "<p class='ogoh'>Зимой PIR работает лучше: фон холодный, человек тёплый. Летом при +40 &deg;C температура фона и тела сближаются, чувствительность падает — это учитывается при выборе решения.</p>"
  },
  manba: []
},

"ti.q02": {
  yorliq: "Jamoa rahbarlari uchun",
  sarlavha: "Nega yozuv avval obyektda boshlanadi",
  tana: "<p>Kamera uyg'onganda birinchi ishi &mdash; SD kartaga yozishni boshlash, markazga ulanish emas. Sabab oddiy: ulanish amalga oshmasligi mumkin, dalil esa har holda kerak.</p>" +
    "<h4>Buferdagi oldingi kadrlar</h4>" +
    "<p>Yaxshi kameralar signal kelishidan 2&ndash;5 soniya oldingi kadrlarni ham saqlaydi: xotirada aylanma bufer turadi. Shu sabab yozuvda odamning kadrga kirib kelgan payti ham qoladi, faqat ketayotgani emas. Bu xususiyat yetkazuvchidan so'raladigan ro'yxatda turadi.</p>" +
    "<h4>Karta hajmi</h4>" +
    "<table><tr><th>Karta</th><th>H.265, 2 Mbit/s</th><th>Hodisa arxivi</th></tr>" +
    "<tr><td>64 GB</td><td class='n'>71 soat</td><td class='n'>~2 oy</td></tr>" +
    "<tr><td>128 GB</td><td class='n'>142 soat</td><td class='n'>~4 oy</td></tr></table>" +
    "<p class='ogoh'>Oddiy telefon kartasi doimiy yozuvda 6&ndash;9 oyda ishdan chiqadi. Faqat yuqori chidamlilik turkumidagi karta olinadi va uning holati telemetriyada kuzatiladi.</p>",
  ru: {
    yorliq: "Для тимлида",
    sarlavha: "Почему запись начинается на объекте",
    tana: "<p>Проснувшись, камера первым делом пишет на SD-карту. Причина простая: подключение может не состояться, а доказательство нужно в любом случае.</p>" +
      "<h4>Кадры до срабатывания</h4>" +
      "<p>Хорошие камеры сохраняют 2&ndash;5 секунд до сигнала: в памяти держится кольцевой буфер. Благодаря этому в записи остаётся сам момент входа человека в кадр. Этот пункт входит в список вопросов поставщику.</p>" +
      "<h4>Объём карты</h4>" +
      "<table><tr><th>Карта</th><th>H.265, 2 Мбит/с</th><th>Архив событий</th></tr>" +
      "<tr><td>64 ГБ</td><td class='n'>71 час</td><td class='n'>~2 месяца</td></tr>" +
      "<tr><td>128 ГБ</td><td class='n'>142 часа</td><td class='n'>~4 месяца</td></tr></table>" +
      "<p class='ogoh'>Обычная телефонная карта при постоянной записи умирает за 6&ndash;9 месяцев. Берётся только карта класса high endurance, её состояние отслеживается в телеметрии.</p>"
  },
  manba: []
},

"ti.q03": {
  yorliq: "Jamoa rahbarlari uchun",
  sarlavha: "Tasnif kamerada bajariladi, markazda emas",
  tana: "<p>Kamera ichidagi tahlil odam, transport va hayvonni ajratadi. Bu markazga yuboriladigan hodisa sonini taxminan sakkiz barobar kamaytiradi va batareyani tejaydi: yuborilmagan har bir kadr &mdash; tejalgan quvvat.</p>" +
    "<h4>Ishonch chegarasi qanday tanlanadi</h4>" +
    "<table><tr><th>Chegara</th><th>Natija</th></tr>" +
    "<tr><td>0,50</td><td>Yolg'on signal ko'p, navbatchi ishonchini yo'qotadi</td></tr>" +
    "<tr><td>0,70</td><td>Ishchi qiymat: tungi obyektlar uchun muvozanat</td></tr>" +
    "<tr><td>0,85</td><td>Qorong'ida va yomg'irda haqiqiy hodisa o'tkazib yuboriladi</td></tr></table>" +
    "<p>Chegara har obyektga alohida qo'yiladi va pilotning birinchi oyida sozlanadi. Chegaradan past hodisalar ham saqlanadi, lekin navbatga chiqmaydi: ular keyin tahlil uchun kerak bo'ladi.</p>" +
    "<p class='ogoh'>Videoni markazda tahlil qilish varianti ham bor, lekin u doimiy oqimni talab qiladi. Batareyali obyektda bu mumkin emas &mdash; shuning uchun tahlilning qurilmada bo'lishi yechim tanlash mezoniga kiritilgan.</p>",
  ru: {
    yorliq: "Для тимлида",
    sarlavha: "Классификация выполняется на борту камеры",
    tana: "<p>Аналитика на борту отделяет человека от транспорта и животного. Это примерно в восемь раз сокращает число отправляемых событий и бережёт батарею: каждый неотправленный кадр — сэкономленная энергия.</p>" +
      "<h4>Как выбирается порог уверенности</h4>" +
      "<table><tr><th>Порог</th><th>Результат</th></tr>" +
      "<tr><td>0,50</td><td>Много ложных тревог, дежурный перестаёт доверять сигналу</td></tr>" +
      "<tr><td>0,70</td><td>Рабочее значение: баланс для ночных объектов</td></tr>" +
      "<tr><td>0,85</td><td>В темноте и под дождём реальное событие пропускается</td></tr></table>" +
      "<p>Порог задаётся по объекту и настраивается в первый месяц пилота. События ниже порога сохраняются, но не попадают в очередь: они понадобятся для анализа.</p>" +
      "<p class='ogoh'>Анализировать видео в центре тоже можно, но это требует постоянного потока. На батарейном объекте это исключено — поэтому наличие аналитики на устройстве внесено в критерии выбора решения.</p>"
  },
  manba: []
},

"ti.q04": {
  yorliq: "Jamoa rahbarlari uchun",
  sarlavha: "PSM: modem nega darhol javob bermaydi",
  tana: "<p>Power Saving Mode &mdash; 4G modemning chuqur uyqusi. Unda radio o'chadi, qurilma tarmoq uchun yo'q bo'lib qoladi va mikroamper darajasida quvvat yeydi. Uyg'onganda modem qaytadan ro'yxatdan o'tishi kerak.</p>" +
    "<h4>Vaqtga nima ta'sir qiladi</h4>" +
    "<table><tr><th>Sharoit</th><th>Ulanish</th></tr>" +
    "<tr><td>RSRP &minus;70&hellip;&minus;90 dBm, shahar</td><td class='n'>3&ndash;5 s</td></tr>" +
    "<tr><td>RSRP &minus;90&hellip;&minus;105 dBm, tuman</td><td class='n'>5&ndash;8 s</td></tr>" +
    "<tr><td>RSRP &minus;105 dBm dan past</td><td class='n'>10&ndash;20 s</td></tr></table>" +
    "<h4>Muqobil rejim</h4>" +
    "<p>eDRX rejimida modem butunlay uxlamaydi, tarmoqni qisqa oraliqlarda tekshirib turadi: uyg'onish 1&ndash;2 soniya, sarf esa PSM dagidan 3&ndash;4 barobar yuqori. Elektr tortilgan obyektda eDRX, batareyada PSM tanlanadi. Bu sozlama montaj varag'ida yoziladi.</p>",
  ru: {
    yorliq: "Для тимлида",
    sarlavha: "PSM: почему модем отвечает не сразу",
    tana: "<p>Power Saving Mode — глубокий сон 4G-модема. Радио выключено, для сети устройство отсутствует, потребление на уровне микроампер. При пробуждении модем заново регистрируется в сети.</p>" +
      "<h4>Что влияет на время</h4>" +
      "<table><tr><th>Условия</th><th>Подключение</th></tr>" +
      "<tr><td>RSRP &minus;70&hellip;&minus;90 дБм, город</td><td class='n'>3&ndash;5 с</td></tr>" +
      "<tr><td>RSRP &minus;90&hellip;&minus;105 дБм, район</td><td class='n'>5&ndash;8 с</td></tr>" +
      "<tr><td>Ниже &minus;105 дБм</td><td class='n'>10&ndash;20 с</td></tr></table>" +
      "<h4>Альтернативный режим</h4>" +
      "<p>В eDRX модем не засыпает полностью и проверяет сеть через короткие интервалы: пробуждение 1&ndash;2 секунды, потребление в 3&ndash;4 раза выше, чем в PSM. На объекте с электричеством выбирают eDRX, на батарее — PSM. Настройка фиксируется в листе монтажа.</p>"
  },
  manba: []
},

"ti.q05": {
  yorliq: "Xavfsizlik uchun",
  sarlavha: "mTLS: qurilma o'zini tanishtiradi, markaz ham",
  tana: "<p>Oddiy HTTPS da faqat server o'zini isbotlaydi. Bu yerda ikki tomon ham sertifikat ko'rsatadi: shlyuzda bank CA imzolagan mijoz sertifikati turadi, qurilma esa faqat o'z markaziga ulanadi.</p>" +
    "<h4>Amalda nima beradi</h4>" +
    "<ul><li>O'g'irlangan qurilmaning sertifikati bekor qilinadi va u o'sha daqiqadan boshlab hech narsa yubora olmaydi.</li>" +
    "<li>Soxta serverga ulanish ishlamaydi: mijoz sertifikat zanjirini tekshiradi.</li>" +
    "<li>Login va parol yo'q, demak o'g'irlanadigan parol ham yo'q.</li></ul>" +
    "<h4>Ekspluatatsiya narxi</h4>" +
    "<p>Sertifikatning amal muddati bir yil. 267 obyektda bu yiliga bir marta mingga yaqin sertifikatni avtomatik yangilash degani. Jarayon skript bilan bajariladi, monitoringda esa &laquo;30 kundan kam qoldi&raquo; ogohlantirishi turadi.</p>" +
    "<p class='ogoh'>Sertifikat muddatining o'tib ketishi &mdash; bu turdagi tizimlarda ommaviy uzilishning eng ko'p uchraydigan sababi. Shuning uchun u alohida nazoratga qo'yiladi.</p>",
  ru: {
    yorliq: "Для безопасности",
    sarlavha: "mTLS: устройство предъявляет себя, центр тоже",
    tana: "<p>В обычном HTTPS себя доказывает только сервер. Здесь сертификат предъявляют обе стороны: на шлюзе лежит клиентский сертификат, подписанный CA банка, а устройство подключается только к своему центру.</p>" +
      "<h4>Что это даёт на практике</h4>" +
      "<ul><li>Сертификат украденного устройства отзывается, и с этой минуты оно ничего не отправит.</li>" +
      "<li>Подключение к поддельному серверу не пройдёт: клиент проверяет цепочку.</li>" +
      "<li>Логина и пароля нет — значит, нечего красть.</li></ul>" +
      "<h4>Цена эксплуатации</h4>" +
      "<p>Срок действия сертификата — год. На 267 объектах это ежегодное автоматическое обновление около тысячи сертификатов. Процедура выполняется скриптом, а в мониторинге висит предупреждение «осталось меньше 30 дней».</p>" +
      "<p class='ogoh'>Истёкший сертификат — самая частая причина массовых отказов в системах такого рода. Поэтому он стоит на отдельном контроле.</p>"
  },
  manba: []
},

"ti.q06": {
  yorliq: "Aloqa uchun",
  sarlavha: "Kadr o'lchami va zaif signal",
  tana: "<p>148 KB &mdash; 1280&times;720 o'lchamdagi JPEG, sifat koeffitsiyenti 75. Bu operator vaziyatni ko'rishi uchun yetarli: nechta odam, qayerda turibdi, texnika bormi.</p>" +
    "<table><tr><th>Signal</th><th>Amaldagi uplink</th><th>148 KB yuklash</th></tr>" +
    "<tr><td>&minus;75 dBm</td><td class='n'>4 Mbit/s</td><td class='n'>0,3 s</td></tr>" +
    "<tr><td>&minus;89 dBm</td><td class='n'>1,1 Mbit/s</td><td class='n'>1,1 s</td></tr>" +
    "<tr><td>&minus;105 dBm</td><td class='n'>0,2 Mbit/s</td><td class='n'>6,0 s</td></tr></table>" +
    "<h4>Kadr o'tmasa nima bo'ladi</h4>" +
    "<p>Hodisa yozuvi baribir yuboriladi: u atigi 412 bayt va deyarli har qanday signalda o'tadi. Kadr navbatda qoladi va qayta uriniladi. Operator kartochkada &laquo;rasm yuklanmoqda&raquo; belgisini ko'radi va kerak bo'lsa darrov jonli videoga o'tadi.</p>" +
    "<p>Signal doimo &minus;100 dBm dan past bo'lgan obyektda kadr o'lchami 640&times;360 ga tushiriladi: 40 KB, ikki soniya. Sifat pasayadi, lekin hodisa ko'rinadi.</p>",
  ru: {
    yorliq: "Для связи",
    sarlavha: "Размер кадра и слабый сигнал",
    tana: "<p>148 КБ — это JPEG 1280&times;720 с качеством 75. Оператору этого достаточно, чтобы увидеть обстановку: сколько людей, где стоят, есть ли техника.</p>" +
      "<table><tr><th>Сигнал</th><th>Реальный аплинк</th><th>Загрузка 148 КБ</th></tr>" +
      "<tr><td>&minus;75 дБм</td><td class='n'>4 Мбит/с</td><td class='n'>0,3 с</td></tr>" +
      "<tr><td>&minus;89 дБм</td><td class='n'>1,1 Мбит/с</td><td class='n'>1,1 с</td></tr>" +
      "<tr><td>&minus;105 дБм</td><td class='n'>0,2 Мбит/с</td><td class='n'>6,0 с</td></tr></table>" +
      "<h4>Что если кадр не прошёл</h4>" +
      "<p>Запись о событии уходит в любом случае: это всего 412 байт, они проходят почти при любом сигнале. Кадр остаётся в очереди и отправляется повторно. Оператор видит в карточке пометку «изображение загружается» и при необходимости сразу открывает живое видео.</p>" +
      "<p>На объекте, где сигнал стабильно ниже &minus;100 дБм, размер кадра снижается до 640&times;360: 40 КБ и две секунды. Качество хуже, но событие видно.</p>"
  },
  manba: []
},

"ti.q07": {
  yorliq: "Jamoa rahbarlari uchun",
  sarlavha: "Adapter nimani tashlaydi va nimani qo'shadi",
  tana: "<p>Hikvision hodisasi XML ko'rinishida yigirmadan ortiq maydon bilan keladi: kanal raqami, qoida nomi, zona koordinatalari, ichki hisoblagichlar. Ulardan sakkiztasi saqlanadi, qolgani tashlanadi.</p>" +
    "<h4>Nima qo'shiladi</h4>" +
    "<ul><li><code>obyekt_id</code> &mdash; reyestrdan, qurilma qaysi aktivga biriktirilganiga qarab.</li>" +
    "<li><code>sxema</code> versiyasi va qabul qilingan vaqt.</li>" +
    "<li>Qurilma soati 2 daqiqadan ko'p adashgan bo'lsa, <code>vaqt_shubhali</code> belgisi.</li></ul>" +
    "<h4>Nima o'zgartirilmaydi</h4>" +
    "<p>Qurilma bergan vaqt va ishonch koeffitsiyenti asl holicha qoladi. Adapter ularni to'g'rilashi mumkin emas: keyin aslida nima bo'lganini tekshirib bo'lmay qoladi.</p>" +
    "<p class='ogoh'>Asl xabar ham 30 kun saqlanadi. Brend bilan bahs chiqsa yoki adapterda xato topilsa, hodisani asl ma'lumotdan qayta ishlash mumkin bo'ladi.</p>",
  ru: {
    yorliq: "Для тимлида",
    sarlavha: "Что адаптер отбрасывает и что добавляет",
    tana: "<p>Событие Hikvision приходит в XML с двумя десятками полей: номер канала, имя правила, координаты зоны, внутренние счётчики. Из них сохраняются восемь, остальное отбрасывается.</p>" +
      "<h4>Что добавляется</h4>" +
      "<ul><li><code>obyekt_id</code> — из реестра, по привязке устройства к активу.</li>" +
      "<li>Версия <code>sxema</code> и время приёма.</li>" +
      "<li>Пометка <code>vaqt_shubhali</code>, если часы устройства разошлись больше чем на 2 минуты.</li></ul>" +
      "<h4>Что не меняется</h4>" +
      "<p>Время устройства и коэффициент уверенности остаются как есть. Адаптер не вправе их исправлять: иначе потом невозможно разобрать, что произошло на самом деле.</p>" +
      "<p class='ogoh'>Исходное сообщение хранится 30 дней. При споре с брендом или найденной ошибке в адаптере событие можно переобработать из исходных данных.</p>"
  },
  manba: []
},

"ti.q08": {
  yorliq: "Xavfsizlik uchun",
  sarlavha: "Qoidalar: qaysi hodisa navbatchini uyg'otadi",
  tana: "<p>Hodisalarning hammasi ham voqea emas. Qoidalar xizmati to'rt narsani ketma-ket tekshiradi.</p>" +
    "<table><tr><th>Tekshiruv</th><th>Namunadagi qiymat</th></tr>" +
    "<tr><td>Obyekt rejimi</td><td>Tungi qo'riq, 19:00&ndash;07:00</td></tr>" +
    "<tr><td>Hodisa turi</td><td>Harakat, sinf odam</td></tr>" +
    "<tr><td>Ishonch</td><td>0,87 &ge; chegara 0,70</td></tr>" +
    "<tr><td>Takror</td><td>Oxirgi 10 daqiqada shunday voqea yo'q</td></tr></table>" +
    "<h4>Qoida tekshiruvdan o'tmasa</h4>" +
    "<p>Hodisa yo'qolmaydi: u obyekt tasmasida qoladi va ertalabki ro'yxatda ko'rinadi. Faqat tungi xabarnoma yuborilmaydi. Kunduzi ishlab turgan omborda harakat odatiy hol &mdash; u yerda qoida boshqacha: faqat ish vaqtidan tashqari harakat voqea yaratadi.</p>" +
    "<p>Rejim jadvali obyekt kartochkasida turadi va uni obyekt menejeri o'zgartiradi. Har o'zgarish jurnalga tushadi: kim, qachon va qaysi obyektda nazoratni yumshatgani keyin ko'rinadi.</p>",
  ru: {
    yorliq: "Для безопасности",
    sarlavha: "Правила: какое событие будит дежурного",
    tana: "<p>Не всякое событие становится инцидентом. Сервис правил последовательно проверяет четыре условия.</p>" +
      "<table><tr><th>Проверка</th><th>Значение в примере</th></tr>" +
      "<tr><td>Режим объекта</td><td>Ночная охрана, 19:00&ndash;07:00</td></tr>" +
      "<tr><td>Тип события</td><td>Движение, класс «человек»</td></tr>" +
      "<tr><td>Уверенность</td><td>0,87 &ge; порога 0,70</td></tr>" +
      "<tr><td>Повтор</td><td>За последние 10 минут такого инцидента не было</td></tr></table>" +
      "<h4>Если условие не выполнено</h4>" +
      "<p>Событие не пропадает: оно остаётся в ленте объекта и попадает в утренний список. Не отправляется только ночное уведомление. На работающем днём складе движение — норма, и правило там другое: инцидент создаётся только вне рабочего времени.</p>" +
      "<p>Расписание режимов лежит в карточке объекта, его меняет менеджер объекта. Каждое изменение пишется в журнал: потом видно, кто и когда ослабил контроль и на каком объекте.</p>"
  },
  manba: []
},

"ti.q09": {
  yorliq: "Xavfsizlik uchun",
  sarlavha: "Xabarnoma: uch kanal va dublyaj",
  tana: "<p>Xabarnoma uch yo'l bilan boradi va ularning ishonchliligi har xil.</p>" +
    "<table><tr><th>Kanal</th><th>Yetish vaqti</th><th>Zaif tomoni</th></tr>" +
    "<tr><td>Mobil ilova, push</td><td class='n'>0,5&ndash;2 s</td><td>Telefonda internet bo'lmasa kelmaydi</td></tr>" +
    "<tr><td>Veb-panel ovozi</td><td class='n'>&lt; 1 s</td><td>Operator ish joyida bo'lishi kerak</td></tr>" +
    "<tr><td>SMS</td><td class='n'>5&ndash;30 s</td><td>Operator tarmog'iga bog'liq, rasm yo'q</td></tr></table>" +
    "<h4>Dublyaj qoidasi</h4>" +
    "<p>Push yuborilgach 60 soniya kutiladi. Ochilmasa SMS ketadi, yana 60 soniyadan keyin smena boshlig'iga xabar beriladi. Har qadam voqea tarixiga yoziladi va oylik SLA hisobotida ko'rinadi.</p>" +
    "<p class='ogoh'>Tunda telefonning ovozsiz rejimda qolib ketishi &mdash; amalda eng ko'p uchraydigan sabab. Shuning uchun navbatchining telefoni ish telefoni bo'ladi va uning rejimi smena boshida tekshiriladi.</p>",
  ru: {
    yorliq: "Для безопасности",
    sarlavha: "Уведомление: три канала и эскалация",
    tana: "<p>Уведомление идёт тремя путями, и надёжность у них разная.</p>" +
      "<table><tr><th>Канал</th><th>Доставка</th><th>Слабое место</th></tr>" +
      "<tr><td>Мобильное приложение, push</td><td class='n'>0,5&ndash;2 с</td><td>Без интернета на телефоне не придёт</td></tr>" +
      "<tr><td>Звук в веб-панели</td><td class='n'>&lt; 1 с</td><td>Оператор должен быть на рабочем месте</td></tr>" +
      "<tr><td>SMS</td><td class='n'>5&ndash;30 с</td><td>Зависит от сети оператора, без изображения</td></tr></table>" +
      "<h4>Правило эскалации</h4>" +
      "<p>После push ждём 60 секунд. Не открыли — уходит SMS, ещё через 60 секунд уведомляется начальник смены. Каждый шаг пишется в историю инцидента и виден в месячном отчёте по SLA.</p>" +
      "<p class='ogoh'>Телефон, оставленный ночью в беззвучном режиме, — самая частая причина пропуска на практике. Поэтому у дежурного рабочий телефон, и его режим проверяется в начале смены.</p>"
  },
  manba: []
},

"ti.q10": {
  yorliq: "Rahbariyat uchun",
  sarlavha: "24 soniya: zanjirdagi eng qimmat bo'lak",
  tana: "<p>Tungi smenada javob vaqti odamning holatiga bog'liq: uxlayotgan bo'lsa 40 soniyagacha, uyg'oq bo'lsa 10 soniyagacha. O'rtacha 24 soniya &mdash; ikki navbatchili markaz uchun kutiladigan qiymat.</p>" +
    "<h4>Nima yordam beradi</h4>" +
    "<ul><li><b>Xabarnomadagi kadr.</b> Operator ilovani ochmasdan turib nima bo'layotganini ko'radi: 5&ndash;8 soniya tejaladi.</li>" +
    "<li><b>Bitta bosish bilan javob.</b> Ko'rish va yolg'on signal tugmalari bevosita xabarnomada turadi.</li>" +
    "<li><b>Ikkinchi navbatchi.</b> Birinchisi javob bermasa, 60 soniyadan keyin ikkinchisiga xabar boradi.</li></ul>" +
    "<p>Pilotning vazifalaridan biri &mdash; shu vaqtni o'lchash. Agar o'rtacha javob 2 daqiqadan oshsa, muammo texnikada emas: smena tartibi yoki hodisalar oqimi qayta ko'riladi.</p>",
  ru: {
    yorliq: "Для правления",
    sarlavha: "24 секунды: самая дорогая часть цепочки",
    tana: "<p>Ночью время ответа зависит от состояния человека: спит — до 40 секунд, бодрствует — до 10. Среднее в 24 секунды — ожидаемое значение для центра с двумя дежурными.</p>" +
      "<h4>Что помогает</h4>" +
      "<ul><li><b>Кадр прямо в уведомлении.</b> Оператор видит обстановку, не открывая приложение: экономия 5&ndash;8 секунд.</li>" +
      "<li><b>Ответ в одно касание.</b> Кнопки «смотреть» и «ложная тревога» находятся в самом уведомлении.</li>" +
      "<li><b>Второй дежурный.</b> Если первый не отреагировал, через 60 секунд уведомление уходит ему.</li></ul>" +
      "<p>Одна из задач пилота — измерить это время. Если средний ответ превышает две минуты, дело не в технике: пересматривается график смен или поток событий.</p>"
  },
  manba: []
},

"ti.q11": {
  yorliq: "Jamoa rahbarlari uchun",
  sarlavha: "Media shlyuz: oqim faqat so'ralganda ochiladi",
  tana: "<p>Shlyuz sifatida MediaMTX yoki go2rtc ishlatiladi &mdash; ikkalasi ham ochiq kodli, MIT litsenziyasida. Ular kameraga operator obyektni ochganda ulanadi, oyna yopilganda ulanishni uzadi.</p>" +
    "<h4>Nega bu muhim</h4>" +
    "<ul><li>Batareyali kamera doimiy oqimda bir-ikki kunda o'chadi.</li>" +
    "<li>Yuzta kameraning doimiy oqimi markaz kanalida 50 Mbit/s ni egallaydi va uni hech kim ko'rmaydi.</li>" +
    "<li>Kameraga ulanish har safar sessiya tokeni bilan ochiladi: kim, qachon va qancha ko'rgani jurnalda qoladi.</li></ul>" +
    "<h4>Uyg'oqlik oynasi</h4>" +
    "<p>Kamera hodisadan keyin 90 soniya uyg'oq turadi &mdash; bu shlyuzga qoldirilgan zaxira. Oyna 30 hodisali sutkada sarfga taxminan 0,4 Vt&middot;soat qo'shadi va 06-bo'limdagi 4,2 Vt&middot;soatlik kunlik balansga sig'adi. Uni 40 soniyaga qisqartirish kuniga 0,2 Vt&middot;soat tejaydi, lekin navbatchi kechikkan har uchinchi hodisada birinchi kadr qayta uyg'onishni 1,4 soniya kutadi.</p>" +
    "<h4>Texnik chegara</h4>" +
    "<p>Uy shlyuzlari orqali ishlaydigan kameralarda RTSP sessiyasi 3&ndash;5 daqiqada uziladi. Bu kamchilik emas, ishlab chiqaruvchining quvvatni tejash qarori. Operator kerak bo'lsa sessiyani qayta ochadi; uzoq kuzatuv talab qilinadigan obyektga boshqa yechim tanlanadi.</p>",
  ru: {
    yorliq: "Для тимлида",
    sarlavha: "Медиашлюз: поток открывается только по запросу",
    tana: "<p>В качестве шлюза используется MediaMTX или go2rtc — оба с открытым кодом и лицензией MIT. Они подключаются к камере, когда оператор открыл объект, и разрывают соединение, когда окно закрыто.</p>" +
      "<h4>Почему это важно</h4>" +
      "<ul><li>Батарейная камера на постоянном потоке садится за сутки-двое.</li>" +
      "<li>Постоянный поток со ста камер занимает 50 Мбит/с канала центра, и его никто не смотрит.</li>" +
      "<li>Подключение открывается по сессионному токену: кто, когда и сколько смотрел — остаётся в журнале.</li></ul>" +
      "<h4>Окно бодрствования</h4>" +
      "<p>После события камера остаётся активной 90 секунд &mdash; это запас, оставленный шлюзу. Окно добавляет к расходу около 0,4 Вт&middot;ч в сутки с тридцатью событиями и укладывается в дневной баланс 4,2 Вт&middot;ч из раздела 06. Сокращение до 40 секунд экономит 0,2 Вт&middot;ч в сутки, но на каждом третьем событии, где дежурный задержался, первый кадр ждёт повторного пробуждения 1,4 секунды.</p>" +
      "<h4>Техническое ограничение</h4>" +
      "<p>У камер, работающих через домашние хабы, RTSP-сессия обрывается через 3&ndash;5 минут. Это не дефект, а решение производителя ради экономии энергии. Оператор при необходимости открывает сессию заново; для объектов с длительным наблюдением выбирается другое решение.</p>"
  },
  manba: [["MediaMTX", "https://github.com/bluenviron/mediamtx"], ["go2rtc", "https://github.com/AlexxIT/go2rtc"]]
},

"ti.q12": {
  yorliq: "Xavfsizlik uchun",
  sarlavha: "Buyruq: ikki marta bosilsa ham bir marta bajariladi",
  tana: "<p>Har buyruqqa mijoz tomonidan <code>Idempotency-Key</code> beriladi. Server shu kalit bo'yicha javobni 24 soat eslab qoladi: takroriy so'rov eski javobni qaytaradi.</p>" +
    "<h4>Nega bu kerak</h4>" +
    "<p>Zaif aloqada operator tugma ishlamadi deb o'ylab ikki-uch marta bosadi. Idempotentliksiz sirena uch marta yoqiladi yoki eshik yopilgach qayta ochiladi.</p>" +
    "<h4>Buyruq bajarilganini nima tasdiqlaydi</h4>" +
    "<ul><li>Shlyuz bajarish natijasini qaytaradi: rele holati, PTZ pozitsiyasi, xato kodi.</li>" +
    "<li>Javob 15 soniyada kelmasa, buyruq noma'lum holatida qoladi va operator ekranida shunday ko'rinadi &mdash; bajarildi deb ko'rsatilmaydi.</li>" +
    "<li>Eshik buyrug'idan keyin kadr olinadi: kim kirgani yozuvda qoladi.</li></ul>" +
    "<p class='ogoh'>Eng xavfli xato &mdash; bajarilmagan buyruqni bajarilgan deb ko'rsatish. Shuning uchun holat uch xil bo'ladi: bajarildi, bajarilmadi, noma'lum.</p>",
  ru: {
    yorliq: "Для безопасности",
    sarlavha: "Команда: нажали дважды — выполнится один раз",
    tana: "<p>К каждой команде клиент добавляет <code>Idempotency-Key</code>. Сервер запоминает ответ по этому ключу на 24 часа: повторный запрос не создаёт новое действие, а возвращает прежний ответ.</p>" +
      "<h4>Зачем это нужно</h4>" +
      "<p>На слабой связи оператор решает, что кнопка не сработала, и нажимает два-три раза. Без идемпотентности сирена включится трижды, а дверь откроется снова после закрытия.</p>" +
      "<h4>Чем подтверждается выполнение</h4>" +
      "<ul><li>Шлюз возвращает результат: состояние реле, позиция PTZ, код ошибки.</li>" +
      "<li>Если ответа нет 15 секунд, команда остаётся в статусе «неизвестно» и именно так показывается оператору — не «выполнено».</li>" +
      "<li>После команды на дверь снимается кадр: кто вошёл, остаётся в записи.</li></ul>" +
      "<p class='ogoh'>Самая опасная ошибка — показать невыполненную команду как выполненную. Поэтому статусов три: выполнено, не выполнено, неизвестно.</p>"
  },
  manba: []
},

"ti.q13": {
  yorliq: "Obyekt menejeri uchun",
  sarlavha: "Tungi hodisadan qaysi hujjat qoladi",
  tana: "<p>Tunda texnik yozuv yaratiladi, ertalab u bankning hujjatiga aylanadi. Zanjir shunday:</p>" +
    "<ol><li>Voqea yopiladi: sabab, operator ismi va bajarilgan buyruqlar bilan.</li>" +
    "<li>Klip va kadrlar dalil omboriga tushadi, xesh bilan.</li>" +
    "<li>Inspektorga joyida ko'rik topshirig'i ochiladi, muddati 72 soat.</li>" +
    "<li>Ko'rik dalolatnomasi imzolanadi, suratlar biriktiriladi.</li>" +
    "<li>Zarar aniqlansa, obyekt kartochkasida xarajat yoki sug'urta ishi ochiladi.</li></ol>" +
    "<h4>Nima uchun bu muhim</h4>" +
    "<p>Sug'urta kompaniyasi ham, sud ham rasmiylashtirilgan hujjatni so'raydi. Video shu hujjatning ilovasi bo'ladi: vaqt tamg'asi, uzluksiz yozuv va o'zgartirilmaganligini tasdiqlovchi xesh bilan.</p>" +
    "<p class='ogoh'>Yozuv qonun buzilmasdan olingan bo'lishi kerak: obyekt kirishida videokuzatuv haqida ogohlantirish lavhasi turishi, kamera faqat o'z hududiga qaratilgan bo'lishi shart.</p>",
  ru: {
    yorliq: "Для менеджера объекта",
    sarlavha: "Какой документ остаётся после ночного события",
    tana: "<p>Ночью создаётся техническая запись, утром она становится документом банка. Цепочка такая:</p>" +
      "<ol><li>Инцидент закрывается: причина, имя оператора, выполненные команды.</li>" +
      "<li>Клип и кадры попадают в хранилище доказательств с хешем.</li>" +
      "<li>Инспектору открывается задание на осмотр, срок — 72 часа.</li>" +
      "<li>Подписывается акт осмотра, прикладываются фотографии.</li>" +
      "<li>При обнаружении ущерба в карточке объекта открывается расход или страховое дело.</li></ol>" +
      "<h4>Почему это важно</h4>" +
      "<p>И страховая компания, и суд спрашивают не видео, а оформленный документ. Видео становится приложением к нему: с отметкой времени, непрерывной записью и хешем, подтверждающим неизменность.</p>" +
      "<p class='ogoh'>Запись должна быть получена без нарушения закона: на входе — предупреждающая табличка о видеонаблюдении, камера направлена только на свою территорию.</p>"
  },
  manba: []
},

"ti.taqsimot": {
  yorliq: "Rahbariyat uchun",
  sarlavha: "Vaqt taqsimoti nimani ko'rsatadi",
  tana: "<p>Qirq bir soniyaning tarkibi: odam 24,0 s, kanal 8,7 s, platforma 6,0 s, qurilma 2,3 s. Bu taqsimot loyihaning pulni qayerga sarflashi kerakligini aytadi.</p>" +
    "<table><tr><th>Bo'lak</th><th>Soniya</th><th>Ulush</th></tr>" +
    "<tr><td>Navbatchining javobi</td><td class='n'>24,0</td><td class='n'>59%</td></tr>" +
    "<tr><td>Modem va kanal</td><td class='n'>8,7</td><td class='n'>21%</td></tr>" +
    "<tr><td>Platforma</td><td class='n'>6,0</td><td class='n'>15%</td></tr>" +
    "<tr><td>Qurilma</td><td class='n'>2,3</td><td class='n'>6%</td></tr></table>" +
    "<p>Server quvvatini oshirish bu raqamni sezilarli o'zgartirmaydi. Navbatchi smenasini to'g'ri tashkil qilish esa javob vaqtini ikki barobar qisqartiradi va hech qanday jihoz talab qilmaydi.</p>",
  ru: {
    yorliq: "Для правления",
    sarlavha: "Что показывает распределение времени",
    tana: "<p>Состав 41 секунды: человек 24,0 с, канал 8,7 с, платформа 6,0 с, устройство 2,3 с. Это распределение подсказывает, куда проекту тратить деньги.</p>" +
      "<table><tr><th>Часть</th><th>Секунд</th><th>Доля</th></tr>" +
      "<tr><td>Реакция дежурного</td><td class='n'>24,0</td><td class='n'>59%</td></tr>" +
      "<tr><td>Модем и канал</td><td class='n'>8,7</td><td class='n'>21%</td></tr>" +
      "<tr><td>Платформа</td><td class='n'>6,0</td><td class='n'>15%</td></tr>" +
      "<tr><td>Устройство</td><td class='n'>2,3</td><td class='n'>6%</td></tr></table>" +
      "<p>Наращивание мощности серверов эту цифру заметно не изменит. А правильно организованная смена дежурных сокращает время ответа вдвое и не требует оборудования.</p>"
  },
  manba: []
},

"ti.ogoh-vaqt": {
  yorliq: "Jamoa rahbarlari uchun",
  sarlavha: "Zaif signalli obyektda vaqt qanday o'zgaradi",
  tana: "<table><tr><th>Bo'lak</th><th>&minus;89 dBm</th><th>&minus;110 dBm</th></tr>" +
    "<tr><td>Modem ulanishi</td><td class='n'>4,6 s</td><td class='n'>18 s</td></tr>" +
    "<tr><td>TLS va POST</td><td class='n'>3,0 s</td><td class='n'>6 s</td></tr>" +
    "<tr><td>Kadr yuklash</td><td class='n'>1,1 s</td><td class='n'>9 s</td></tr>" +
    "<tr><td>Jami texnik vaqt</td><td class='n'>17,0 s</td><td class='n'>45 s</td></tr></table>" +
    "<h4>Nima qilinadi</h4>" +
    "<ul><li>Montajdan oldin RSRP va SINR o'lchanadi, natija montaj varag'iga yoziladi.</li>" +
    "<li>&minus;105 dBm dan past bo'lsa: tashqi yo'naltirilgan antenna, boshqa operator SIM kartasi yoki qo'shni obyektda klaster shkafi.</li>" +
    "<li>Shu obyekt uchun kadr o'lchami kichraytiriladi.</li></ul>" +
    "<p class='ogoh'>Signali o'lchanmagan obyektga jihoz buyurtma qilinmaydi. Bu qoida buzilsa, brigadaga ikkinchi marta borishga to'g'ri keladi &mdash; bu bitta obyekt bo'yicha smetani 15&ndash;20 foizga oshiradi.</p>",
  ru: {
    yorliq: "Для тимлида",
    sarlavha: "Как меняется время на объекте со слабым сигналом",
    tana: "<table><tr><th>Часть</th><th>&minus;89 дБм</th><th>&minus;110 дБм</th></tr>" +
      "<tr><td>Подключение модема</td><td class='n'>4,6 с</td><td class='n'>18 с</td></tr>" +
      "<tr><td>TLS и POST</td><td class='n'>3,0 с</td><td class='n'>6 с</td></tr>" +
      "<tr><td>Загрузка кадра</td><td class='n'>1,1 с</td><td class='n'>9 с</td></tr>" +
      "<tr><td>Итого техническое время</td><td class='n'>17,0 с</td><td class='n'>45 с</td></tr></table>" +
      "<h4>Что делается</h4>" +
      "<ul><li>До монтажа измеряются RSRP и SINR, результат заносится в лист монтажа.</li>" +
      "<li>Ниже &minus;105 дБм: внешняя направленная антенна, SIM другого оператора или кластерный шкаф на соседнем объекте.</li>" +
      "<li>Для такого объекта уменьшается размер кадра.</li></ul>" +
      "<p class='ogoh'>Оборудование не заказывается на объект, где сигнал не измерен. Нарушение этого правила означает повторный выезд бригады — плюс 15–20% к смете по объекту.</p>"
  },
  manba: []
}

});

/* ---------- Olti qatlam ---------- */
window.MKB_BATAFSIL = Object.assign(window.MKB_BATAFSIL || {}, {

"ti.qat1": {
  yorliq: "Qatlam 1",
  sarlavha: "Qurilma: energiya va dalil shu yerda hal bo'ladi",
  tana: "<p>Bu qatlamda kamera, PIR va eshik datchigi, domofon, elektr qulf va rele turadi. Ularning vazifasi &mdash; hodisani sezish, joyida yozib qo'yish va aloqa bo'lganda xabar berish.</p>" +
    "<table><tr><th>Talab</th><th>Qiymat</th></tr>" +
    "<tr><td>Ishlash harorati</td><td>&minus;25&hellip;+55 &deg;C</td></tr>" +
    "<tr><td>Himoya darajasi</td><td>IP65 va undan yuqori</td></tr>" +
    "<tr><td>Joyida yozuv</td><td>SD karta, high endurance</td></tr>" +
    "<tr><td>Protokol</td><td>ONVIF yoki hujjatlashtirilgan API</td></tr>" +
    "<tr><td>Kutish sarfi</td><td>0,08&ndash;0,3 Vt</td></tr></table>" +
    "<h4>Nima buziladi</h4>" +
    "<ul><li>Akkumulyator sig'imi sovuqda pasayadi: &minus;10 &deg;C da nominaldan 20&ndash;30% kam.</li>" +
    "<li>SD karta doimiy yozuvdan eskiradi; telemetriyada uning holati kuzatiladi.</li>" +
    "<li>Linza changlaydi va o'rgimchak to'r tortadi &mdash; tunda IR yoritgichda bu yolg'on signal beradi.</li></ul>" +
    "<p class='ogoh'>Bu qatlamdagi har bir qurilma yetkazuvchi kafolatida bo'ladi, lekin kafolat pochta orqali ishlamaydi: shartnomada almashtirish muddati va zaxira komplekt soni yoziladi.</p>",
  ru: {
    yorliq: "Слой 1",
    sarlavha: "Устройство: здесь решаются энергия и доказательство",
    tana: "<p>В этом слое камера, PIR и датчик двери, домофон, электрозамок и реле. Их задача — заметить событие, записать его на месте и сообщить, когда есть связь.</p>" +
      "<table><tr><th>Требование</th><th>Значение</th></tr>" +
      "<tr><td>Рабочая температура</td><td>&minus;25&hellip;+55 &deg;C</td></tr>" +
      "<tr><td>Класс защиты</td><td>IP65 и выше</td></tr>" +
      "<tr><td>Запись на месте</td><td>SD-карта класса high endurance</td></tr>" +
      "<tr><td>Протокол</td><td>ONVIF или документированный API</td></tr>" +
      "<tr><td>Потребление в ожидании</td><td>0,08&ndash;0,3 Вт</td></tr></table>" +
      "<h4>Что ломается</h4>" +
      "<ul><li>Ёмкость аккумулятора падает на холоде: при &minus;10 &deg;C на 20&ndash;30% ниже номинала.</li>" +
      "<li>SD-карта изнашивается от постоянной записи; её состояние отслеживается в телеметрии.</li>" +
      "<li>Линза пылится и затягивается паутиной — ночью в ИК-подсветке это даёт ложные сработки.</li></ul>" +
      "<p class='ogoh'>Каждое устройство этого слоя на гарантии поставщика, но гарантия не работает по почте: в договоре пишутся срок замены и количество подменного комплекта.</p>"
  },
  manba: []
},

"ti.qat2": {
  yorliq: "Qatlam 2",
  sarlavha: "Mahalliy tugun: aloqa yo'q paytdagi xotira",
  tana: "<p>Shlyuz, NVR yoki 4G router obyektdagi qurilmalarni bitta nuqtaga yig'adi. Eng muhim vazifasi &mdash; aloqa uzilganda hodisalarni o'z navbatida saqlash va tiklanganda tartib bilan yuborish.</p>" +
    "<h4>Navbat qoidalari</h4>" +
    "<ul><li>Har xabarda ketma-ket raqam bor; platforma tartibni shu raqam bo'yicha tiklaydi.</li>" +
    "<li>Navbatda ustuvorlik: avval signal, keyin holat, oxirida klip.</li>" +
    "<li>Bitta shlyuz soniyasiga 5 tadan ortiq xabar yubormaydi: yuzlab obyekt birga tiklansa, markaz tiqilib qolmaydi.</li>" +
    "<li>Navbat to'lsa, eng eski holat xabarlari o'chiriladi, signal hodisalari esa saqlanadi.</li></ul>" +
    "<h4>Quvvat</h4>" +
    "<p>Doimiy ishlaydigan shlyuz sutkasiga 5&ndash;12 Vt&middot;soat yeydi &mdash; bu bitta batareyali kameradan ko'p. Shuning uchun mahalliy tugun faqat obyektda bir nechta qurilma bo'lganda yoki elektr mavjud bo'lganda qo'yiladi.</p>" +
    "<p class='ogoh'>Obyektda bitta kamera bo'lsa, alohida shlyuz qo'yilmaydi: kameraning o'zi to'g'ridan-to'g'ri markazga ulanadi.</p>",
  ru: {
    yorliq: "Слой 2",
    sarlavha: "Локальный узел: память на время без связи",
    tana: "<p>Шлюз, NVR или 4G-роутер собирают устройства объекта в одну точку. Главная задача — держать события в своей очереди, пока связи нет, и выгрузить их по порядку, когда она вернётся.</p>" +
      "<h4>Правила очереди</h4>" +
      "<ul><li>В каждом сообщении есть порядковый номер; платформа восстанавливает порядок по нему.</li>" +
      "<li>Приоритет: сначала тревоги, затем состояние, клипы в конце.</li>" +
      "<li>Один шлюз отправляет не больше 5 сообщений в секунду: если сотни объектов вернутся в сеть одновременно, центр не захлебнётся.</li>" +
      "<li>При переполнении очереди удаляются самые старые сообщения о состоянии, тревоги сохраняются.</li></ul>" +
      "<h4>Питание</h4>" +
      "<p>Постоянно работающий шлюз съедает 5&ndash;12 Вт&middot;ч в сутки — больше, чем батарейная камера. Поэтому локальный узел ставится только там, где несколько устройств или есть электричество.</p>" +
      "<p class='ogoh'>Если на объекте одна камера, отдельный шлюз не ставится: камера подключается к центру напрямую.</p>"
  },
  manba: []
},

"ti.qat3": {
  yorliq: "Qatlam 3",
  sarlavha: "Kanal: yopiq APN va ikki SIM",
  tana: "<p>SIM kartalar operatorning yopiq APN iga ulanadi: qurilma faqat bank manzillari bilan gaplashadi va tashqi tarmoqdan ko'rinmaydi.</p>" +
    "<table><tr><th>Sozlama</th><th>Qiymat</th></tr>" +
    "<tr><td>APN</td><td>Yopiq, korporativ shartnomada</td></tr>" +
    "<tr><td>Ikkinchi SIM</td><td>Boshqa operator, avtomatik o'tish</td></tr>" +
    "<tr><td>O'tish vaqti</td><td>30&ndash;90 soniya</td></tr>" +
    "<tr><td>Oylik trafik, kamerali tugun</td><td>4,3 GB: hodisa 0,8 va jonli video 3,5</td></tr>" +
    "<tr><td>Oylik trafik, datchikli tugun</td><td>30 MB dan kam &mdash; video yo'q</td></tr></table>" +
    "<h4>Nima buziladi</h4>" +
    "<ul><li>Bitta operatorning bazaviy stansiyasi ta'mirga to'xtaydi &mdash; ikkinchi SIM shuning uchun kerak.</li>" +
    "<li>SIM balansi tugaydi: reyestrda har SIM ning tarifi va to'lov sanasi turadi.</li>" +
    "<li>Operator IP manzilni almashtirib yuboradi &mdash; shuning uchun qurilma markazga ulanadi, teskarisi emas.</li></ul>" +
    "<p class='ogoh'>Yopiq APN sozlash bir necha hafta oladi va tender hujjatlariga oldindan kiritiladi. Ochiq internetdagi vaqtinchalik yechim pilotda ham qo'llanmaydi.</p>",
  ru: {
    yorliq: "Слой 3",
    sarlavha: "Канал: закрытый APN и две SIM",
    tana: "<p>SIM-карты подключаются не к обычному интернету, а к закрытому APN оператора: устройство общается только с адресами банка и не видно из внешней сети.</p>" +
      "<table><tr><th>Настройка</th><th>Значение</th></tr>" +
      "<tr><td>APN</td><td>Закрытый, по корпоративному договору</td></tr>" +
      "<tr><td>Вторая SIM</td><td>Другой оператор, автопереключение</td></tr>" +
      "<tr><td>Время переключения</td><td>30&ndash;90 секунд</td></tr>" +
      "<tr><td>Трафик в месяц, узел с камерой</td><td>4,3 ГБ: события 0,8 и живое видео 3,5</td></tr>" +
      "<tr><td>Трафик в месяц, узел с датчиками</td><td>меньше 30 МБ &mdash; видео нет</td></tr></table>" +
      "<h4>Что ломается</h4>" +
      "<ul><li>Базовая станция одного оператора уходит в ремонт — для этого и нужна вторая SIM.</li>" +
      "<li>Заканчивается баланс SIM: в реестре хранятся тариф и дата платежа по каждой карте.</li>" +
      "<li>Оператор меняет IP-адрес — поэтому соединение всегда начинает устройство.</li></ul>" +
      "<p class='ogoh'>Настройка закрытого APN занимает несколько недель и закладывается в тендерные документы заранее. Временное решение через открытый интернет не применяется даже на пилоте.</p>"
  },
  manba: []
},

"ti.qat4": {
  yorliq: "Qatlam 4",
  sarlavha: "Adapter: bankni brendga bog'lanishdan saqlaydigan qatlam",
  tana: "<p>Adapter &mdash; har brend uchun alohida jarayon. U brend protokolini biladi va yagona sxemani biladi, boshqa hech narsani bilmaydi.</p>" +
    "<h4>Nega u alohida jarayon</h4>" +
    "<ul><li>Bitta brend API si o'zgarsa, faqat o'sha adapter yangilanadi; qolgan 266 obyekt ishlab turaveradi.</li>" +
    "<li>Yuk oshsa, o'sha brendning adapteri ikkinchi nusxada ishga tushiriladi.</li>" +
    "<li>Adapter ishdan chiqsa, hodisalar shlyuz navbatida kutadi va tiklanganda qayta ishlanadi.</li></ul>" +
    "<h4>Strategik ma'nosi</h4>" +
    "<p>Bugun bozorda eng qulay brend uch yildan keyin qimmatlashishi yoki bozorni tark etishi mumkin. Adapter qatlami bo'lgani uchun almashtirish bitta xizmatni qayta yozish bilan cheklanadi: interfeys, hisobotlar va tarix o'z joyida qoladi.</p>" +
    "<p class='ogoh'>Adapterlarni tashqi pudratchiga berish mumkin, lekin kodning egaligi va manba matni bankda qolishi shartnomada yoziladi.</p>",
  ru: {
    yorliq: "Слой 4",
    sarlavha: "Адаптер: слой, который не даёт банку привязаться к бренду",
    tana: "<p>Адаптер — отдельный процесс на каждый бренд. Он знает протокол бренда и единую схему, больше ничего.</p>" +
      "<h4>Почему это отдельный процесс</h4>" +
      "<ul><li>Если API одного бренда изменился, обновляется только его адаптер; остальные 266 объектов продолжают работать.</li>" +
      "<li>При росте нагрузки адаптер этого бренда запускается во втором экземпляре.</li>" +
      "<li>Если адаптер упал, события ждут в очереди шлюза и обрабатываются после восстановления.</li></ul>" +
      "<h4>Стратегический смысл</h4>" +
      "<p>Самый удобный сегодня бренд через три года может подорожать или уйти с рынка. Благодаря слою адаптеров замена сводится к переписыванию одного сервиса: интерфейс, отчёты и история остаются на месте.</p>" +
      "<p class='ogoh'>Адаптеры можно отдать подрядчику, но принадлежность кода и исходники остаются у банка — это пишется в договоре.</p>"
  },
  manba: []
},

"ti.qat5": {
  yorliq: "Qatlam 5",
  sarlavha: "Yadro: bank o'zi yozadigan va o'zida saqlaydigan qism",
  tana: "<p>Yadro beshta xizmatdan iborat va ularning har biri alohida vazifani bajaradi.</p>" +
    "<table><tr><th>Xizmat</th><th>Vazifasi</th><th>Asos</th></tr>" +
    "<tr><td>Reyestr</td><td>Obyekt, qurilma, SIM, sertifikat</td><td>Mavjud MKB bazasi</td></tr>" +
    "<tr><td>Hodisa shinasi</td><td>Navbat, filtr, yo'naltirish</td><td>RabbitMQ yoki Kafka</td></tr>" +
    "<tr><td>Qoidalar</td><td>Hodisadan voqea yasash</td><td>O'z kodi</td></tr>" +
    "<tr><td>Media shlyuz</td><td>RTSP &rarr; WebRTC va HLS</td><td>MediaMTX yoki go2rtc</td></tr>" +
    "<tr><td>Buyruq xizmati</td><td>Eshik, PTZ, sirena, jurnal</td><td>O'z kodi</td></tr></table>" +
    "<h4>Nega u bankda qoladi</h4>" +
    "<p>Yadro obyekt bilan qurilma o'rtasidagi bog'lanishni, jurnalni va dalil omborini saqlaydi. Bu ma'lumot bankning aktivlari haqidagi ma'lumot: u pudratchi serverida turmaydi.</p>" +
    "<p>Ish hajmi: pilot uchun minimal yadro va 2&ndash;3 adapter 3&ndash;4 haftada yig'iladi, 100 dan ortiq obyektga tayyor versiya 3&ndash;4 kishilik jamoa uchun 3&ndash;4 oy.</p>",
  ru: {
    yorliq: "Слой 5",
    sarlavha: "Ядро: то, что банк пишет сам и держит у себя",
    tana: "<p>Ядро состоит из пяти сервисов, у каждого своя задача.</p>" +
      "<table><tr><th>Сервис</th><th>Задача</th><th>Основа</th></tr>" +
      "<tr><td>Реестр</td><td>Объект, устройство, SIM, сертификат</td><td>Существующая база MKB</td></tr>" +
      "<tr><td>Шина событий</td><td>Очередь, фильтр, маршрутизация</td><td>RabbitMQ или Kafka</td></tr>" +
      "<tr><td>Правила</td><td>Превращение события в инцидент</td><td>Собственный код</td></tr>" +
      "<tr><td>Медиашлюз</td><td>RTSP &rarr; WebRTC и HLS</td><td>MediaMTX или go2rtc</td></tr>" +
      "<tr><td>Сервис команд</td><td>Дверь, PTZ, сирена, журнал</td><td>Собственный код</td></tr></table>" +
      "<h4>Почему оно остаётся у банка</h4>" +
      "<p>Ядро хранит связь объекта с устройством, журнал и хранилище доказательств. Это данные об активах банка — им не место на сервере подрядчика.</p>" +
      "<p>Объём работ: минимальное ядро и 2&ndash;3 адаптера для пилота собираются за 3&ndash;4 недели, версия для сотни с лишним объектов — 3&ndash;4 месяца для команды из 3&ndash;4 человек.</p>"
  },
  manba: []
},

"ti.qat6": {
  yorliq: "Qatlam 6",
  sarlavha: "Ish joyi: ekranda nima ko'rinishi kerak",
  tana: "<p>Interfeysning vazifasi &mdash; yuzta jonli videoni ko'rsatish emas. Operator ekranida obyekt kartochkalari turadi: oxirgi kadr, batareya, signal va oxirgi hodisa. Video obyekt ochilganda yoqiladi.</p>" +
    "<h4>Uchta ish joyi</h4>" +
    "<ul><li><b>Veb-panel</b> &mdash; navbatchi va obyekt menejeri uchun asosiy joy: hodisalar navbati, obyekt kartochkasi, arxiv.</li>" +
    "<li><b>Mobil ilova</b> &mdash; tungi xabarnoma, kadr, bitta bosishli javob va jonli video.</li>" +
    "<li><b>Hisobotlar</b> &mdash; oylik SLA, yolg'on signal statistikasi, servis tashriflari; buxgalteriya va rahbariyat uchun.</li></ul>" +
    "<h4>Nima ko'rsatilmaydi</h4>" +
    "<p>Xavfsizlik xodimi obyektning balans qiymatini va sudga oid ma'lumotini ko'rmaydi. Realizatsiya mutaxassisiga esa hodisalar navbati ochilmaydi. Har rol o'z ishiga kerak bo'lgan maydonni ko'radi.</p>",
  ru: {
    yorliq: "Слой 6",
    sarlavha: "Рабочее место: что должно быть на экране",
    tana: "<p>Задача интерфейса — не показать сто живых видеопотоков. На экране оператора карточки объектов: последний кадр, батарея, сигнал и последнее событие. Видео включается при открытии объекта.</p>" +
      "<h4>Три рабочих места</h4>" +
      "<ul><li><b>Веб-панель</b> — основное место дежурного и менеджера объекта: очередь инцидентов, карточка объекта, архив.</li>" +
      "<li><b>Мобильное приложение</b> — ночное уведомление, кадр, ответ в одно касание и живое видео.</li>" +
      "<li><b>Отчёты</b> — месячный SLA, статистика ложных тревог, выезды сервиса; для бухгалтерии и правления.</li></ul>" +
      "<h4>Что не показывается</h4>" +
      "<p>Сотрудник охраны не видит балансовую стоимость объекта и сведения по судебным делам. Специалисту по реализации не открывается очередь инцидентов. Каждая роль видит только нужные ей поля.</p>"
  },
  manba: []
},

/* ---------- Qatlamlar jadvali ---------- */

"ti.j-qurilma": {
  yorliq: "Servis uchun",
  sarlavha: "Qurilma nosozligi: 72 soatlik muddat qayerdan",
  tana: "<p>Servis muddati obyektning joylashuviga qarab uch toifaga bo'linadi va shartnomada shunday yoziladi.</p>" +
    "<table><tr><th>Toifa</th><th>Chiqish muddati</th></tr>" +
    "<tr><td>Shahar va viloyat markazi</td><td class='n'>24 soat</td></tr>" +
    "<tr><td>Tuman markazi</td><td class='n'>72 soat</td></tr>" +
    "<tr><td>Chekka qishloq va uzoq obyekt</td><td class='n'>5 ish kuni</td></tr></table>" +
    "<h4>Nima qilinadi</h4>" +
    "<p>Servis brigadasi bir chiqishda bir nechta ishni bajaradi: qurilmani almashtiradi, linzani tozalaydi, SD karta holatini tekshiradi, batareya kontaktlarini ko'radi. Bir obyektga ikki marta borish smetani buzadi, shuning uchun marshrut haftalik rejalashtiriladi.</p>" +
    "<p class='ogoh'>Zaxira komplekt omborda turishi shart: yetkazuvchidan yangi kamera kutish 3&ndash;6 hafta oladi va bu muddatda obyekt nazoratsiz qoladi.</p>",
  ru: {
    yorliq: "Для сервиса",
    sarlavha: "Отказ устройства: откуда взялись 72 часа",
    tana: "<p>Срок сервиса делится на три категории по расположению объекта и так же пишется в договоре.</p>" +
      "<table><tr><th>Категория</th><th>Срок выезда</th></tr>" +
      "<tr><td>Город и областной центр</td><td class='n'>24 часа</td></tr>" +
      "<tr><td>Районный центр</td><td class='n'>72 часа</td></tr>" +
      "<tr><td>Отдалённое село и дальний объект</td><td class='n'>5 рабочих дней</td></tr></table>" +
      "<h4>Что делается</h4>" +
      "<p>За один выезд бригада выполняет несколько работ: меняет устройство, чистит линзу, проверяет состояние SD-карты, осматривает контакты батареи. Второй выезд на тот же объект ломает смету, поэтому маршрут планируется на неделю.</p>" +
      "<p class='ogoh'>Подменный комплект обязан лежать на складе: ожидание новой камеры от поставщика занимает 3&ndash;6 недель, и всё это время объект остаётся без контроля.</p>"
  },
  manba: []
},

"ti.j-tugun": {
  yorliq: "Servis uchun",
  sarlavha: "last_seen: aloqasizlik qachon e'lon qilinadi",
  tana: "<p>Elektr bilan ta'minlangan tugun 60 soniyada, batareyali qurilma 15 daqiqada puls yuboradi. Bitta pulsning yo'qolishi normal hol: mobil tarmoqda paket yo'qoladi. Uchta ketma-ket puls kelmasa, qurilma aloqasiz deb belgilanadi &mdash; birinchi holatda 15, ikkinchisida 45 daqiqada.</p>" +
    "<h4>Nega darrov emas</h4>" +
    "<p>Chegara 3 daqiqaga qo'yilsa, 267 obyektda kuniga o'nlab yolg'on ogohlantirish chiqadi va navbatchi ularga e'tibor bermay qo'yadi. 15 daqiqa &mdash; tarmoqning qisqa uzilishlari bilan haqiqiy nosozlik orasidagi chegara.</p>" +
    "<h4>Nima ko'rinadi</h4>" +
    "<ul><li>Obyekt kartochkasida qurilma kulrang bo'ladi va oxirgi aloqa vaqti yoziladi.</li>" +
    "<li>Panelda &laquo;aloqada emas&raquo; obyektlar hisoblagichi o'sadi.</li>" +
    "<li>Ikki soatdan keyin servis arizasi avtomatik ochiladi.</li></ul>",
  ru: {
    yorliq: "Для сервиса",
    sarlavha: "last_seen: когда объявляется потеря связи",
    tana: "<p>Узел с электропитанием шлёт импульс раз в 60 секунд, батарейное устройство — раз в 15 минут. Потеря одного импульса нормальна: в мобильной сети пакеты теряются. Если не пришли три подряд, устройство помечается как потерявшее связь — в первом случае через 15 минут, во втором через 45.</p>" +
      "<h4>Почему не сразу</h4>" +
      "<p>При пороге в 3 минуты на 267 объектах будут десятки ложных предупреждений в сутки, и дежурный перестанет их замечать. 15 минут — граница между короткими провалами сети и настоящим отказом.</p>" +
      "<h4>Что видно</h4>" +
      "<ul><li>В карточке объекта устройство становится серым, указывается время последней связи.</li>" +
      "<li>На панели растёт счётчик объектов «нет связи».</li>" +
      "<li>Через два часа автоматически открывается сервисная заявка.</li></ul>"
  },
  manba: []
},

"ti.j-kanal": {
  yorliq: "Aloqa uchun",
  sarlavha: "Operator bilan SLA: nimani talab qilish mumkin",
  tana: "<p>Korporativ M2M shartnomasida uchta band muhim: uzilish haqida xabar berish tartibi, tiklash muddati va ommaviy uzilishda kompensatsiya.</p>" +
    "<table><tr><th>Band</th><th>Talab qilinadigan qiymat</th></tr>" +
    "<tr><td>Nosozlikka javob</td><td>4 soat ichida</td></tr>" +
    "<tr><td>Tiklash</td><td>24 soat</td></tr>" +
    "<tr><td>Rejali ishlar haqida ogohlantirish</td><td>5 kun oldin</td></tr>" +
    "<tr><td>SIM boshqaruvi</td><td>Shaxsiy kabinet va API</td></tr></table>" +
    "<h4>Bank tomonidan nima qilinadi</h4>" +
    "<p>Har SIM reyestrda obyekt va qurilma bilan bog'lanadi. Trafik oyiga bir marta tekshiriladi: kutilganidan ko'p sarflagan SIM sozlama xatosini yoki uzluksiz qayta ulanishni ko'rsatadi.</p>" +
    "<p class='ogoh'>Bitta operatorga to'liq bog'lanish xavfli: viloyat darajasidagi uzilishda barcha obyekt birdan yo'qoladi. Ikkinchi SIM boshqa operatordan olinadi.</p>",
  ru: {
    yorliq: "Для связи",
    sarlavha: "SLA с оператором: что можно требовать",
    tana: "<p>В корпоративном M2M-договоре важны три пункта: порядок уведомления об авариях, срок восстановления и компенсация при массовом отказе.</p>" +
      "<table><tr><th>Пункт</th><th>Требуемое значение</th></tr>" +
      "<tr><td>Реакция на инцидент</td><td>в течение 4 часов</td></tr>" +
      "<tr><td>Восстановление</td><td>24 часа</td></tr>" +
      "<tr><td>Предупреждение о плановых работах</td><td>за 5 дней</td></tr>" +
      "<tr><td>Управление SIM</td><td>личный кабинет и API</td></tr></table>" +
      "<h4>Что делает банк</h4>" +
      "<p>Каждая SIM в реестре связана с объектом и устройством. Трафик проверяется раз в месяц: карта, израсходовавшая больше ожидаемого, указывает на ошибку настройки или постоянные переподключения.</p>" +
      "<p class='ogoh'>Полная привязка к одному оператору опасна: при областной аварии разом пропадают все объекты. Вторая SIM берётся у другого оператора.</p>"
  },
  manba: []
},

"ti.j-adapter": {
  yorliq: "Jamoa rahbarlari uchun",
  sarlavha: "Adapter to'xtaganda nima bo'ladi",
  tana: "<p>Adapter yiqilsa, hodisalar yo'qolmaydi: ular shlyuz navbatida va broker navbatida qoladi. Muammo boshqacha ko'rinadi &mdash; navbat o'sa boshlaydi.</p>" +
    "<h4>Ogohlantirish chegaralari</h4>" +
    "<table><tr><th>Ko'rsatkich</th><th>Chegara</th></tr>" +
    "<tr><td>Navbatdagi xabarlar</td><td>10 000 dan ko'p</td></tr>" +
    "<tr><td>Qayta ishlanmagan xabar yoshi</td><td>5 daqiqadan ortiq</td></tr>" +
    "<tr><td>Rad etilgan sxema</td><td>1% dan ko'p</td></tr></table>" +
    "<h4>Eng ko'p uchraydigan sabab</h4>" +
    "<p>Brend proshivkani yangilaydi va hodisa maydonini o'zgartiradi. Shuning uchun proshivka avval bitta sinov qurilmasida tekshiriladi, keyin obyektlarga tarqatiladi. Yangilanish oynasi &mdash; ish kuni, tungi vaqtda emas.</p>" +
    "<p class='ogoh'>Uch marta qayta ishlanmagan xabar dead-letter navbatiga tushadi va navbatchiga ko'rinadi: u yo'qolgan emas, kutayotgan hisoblanadi.</p>",
  ru: {
    yorliq: "Для тимлида",
    sarlavha: "Что происходит, когда адаптер останавливается",
    tana: "<p>Если адаптер упал, события не теряются: они остаются в очереди шлюза и в очереди брокера. Проблема выглядит иначе — начинает расти очередь.</p>" +
      "<h4>Пороги предупреждений</h4>" +
      "<table><tr><th>Показатель</th><th>Порог</th></tr>" +
      "<tr><td>Сообщений в очереди</td><td>больше 10 000</td></tr>" +
      "<tr><td>Возраст необработанного сообщения</td><td>больше 5 минут</td></tr>" +
      "<tr><td>Отклонено по схеме</td><td>больше 1%</td></tr></table>" +
      "<h4>Самая частая причина</h4>" +
      "<p>Бренд обновляет прошивку и меняет поле события. Поэтому прошивка сначала проверяется на одном тестовом устройстве и только затем раскатывается на объекты. Окно обновления — рабочий день, не ночь.</p>" +
      "<p class='ogoh'>Сообщение, трижды не обработанное, уходит в dead-letter-очередь и становится видно дежурному: оно не потеряно, а ждёт.</p>"
  },
  manba: []
},

"ti.j-yadro": {
  yorliq: "Jamoa rahbarlari uchun",
  sarlavha: "Yadro nosozligi: bir soatlik muddat qayerdan",
  tana: "<p>Yadro bank ma'lumotlar markazida ishlaydi, shuning uchun unga javob berish tezroq: joyiga chiqish kerak emas. Bir soat &mdash; navbatchi muhandisning aralashuvi bilan tiklanadigan muddat.</p>" +
    "<h4>Nima zaxiralanadi</h4>" +
    "<ul><li>Baza: har kecha to'liq nusxa, WAL uzluksiz; tiklash oyiga bir marta sinaladi.</li>" +
    "<li>Xizmatlar: ikki nusxada ishlaydi, bittasi to'xtasa yuk ikkinchisiga o'tadi.</li>" +
    "<li>Dalil ombori: ikkinchi diskka nusxalanadi.</li></ul>" +
    "<h4>Uzilish paytida nima yo'qolmaydi</h4>" +
    "<p>Hodisalar shlyuz va broker navbatida kutadi. Yadro tiklangach, ular tartib bilan qayta ishlanadi. Yo'qoladigan yagona narsa &mdash; o'sha daqiqalardagi jonli video: uni qayta ko'rish uchun kameradagi yozuvdan olinadi.</p>",
  ru: {
    yorliq: "Для тимлида",
    sarlavha: "Отказ ядра: откуда взялся один час",
    tana: "<p>Ядро работает в дата-центре банка, поэтому реакция быстрее: выезжать никуда не нужно. Час — срок восстановления силами дежурного инженера.</p>" +
      "<h4>Что резервируется</h4>" +
      "<ul><li>База: полная копия каждую ночь, WAL непрерывно; восстановление проверяется раз в месяц.</li>" +
      "<li>Сервисы: работают в двух экземплярах, при остановке одного нагрузка уходит на второй.</li>" +
      "<li>Хранилище доказательств: копируется на второй диск.</li></ul>" +
      "<h4>Что не теряется во время сбоя</h4>" +
      "<p>События ждут в очередях шлюза и брокера. После восстановления ядра они обрабатываются по порядку. Теряется только живое видео за эти минуты: чтобы его посмотреть, запись берут из камеры.</p>"
  },
  manba: []
},

"ti.j-ish": {
  yorliq: "Jamoa rahbarlari uchun",
  sarlavha: "Interfeys xatosi: nega bir ish kuni",
  tana: "<p>Ish joyidagi nosozlik hodisani yo'qotmaydi: ma'lumot bazada turadi, xabarnoma mobil ilovaga boradi. Shuning uchun muddat boshqa qatlamlardagidan yumshoqroq.</p>" +
    "<h4>Istisno</h4>" +
    "<p>Ikki holat shoshilinch hisoblanadi va bir soatda tuzatiladi: hodisalar navbati ochilmayotgan bo'lsa yoki buyruq tugmasi ishlamayotgan bo'lsa. Qolgan xatolar navbatdagi chiqarishga qo'shiladi.</p>" +
    "<h4>Yangi versiya qanday chiqadi</h4>" +
    "<ul><li>Sinov muhitida tekshiriladi, keyin ish muhitiga chiqariladi.</li>" +
    "<li>Chiqarish ish kunining birinchi yarmida bajariladi: muammo chiqsa, jamoa joyida bo'ladi.</li>" +
    "<li>Oldingi versiyaga qaytish yo'li har chiqarishdan oldin tekshiriladi.</li></ul>",
  ru: {
    yorliq: "Для тимлида",
    sarlavha: "Ошибка интерфейса: почему один рабочий день",
    tana: "<p>Сбой на рабочем месте не теряет события: данные лежат в базе, уведомления уходят в мобильное приложение. Поэтому срок мягче, чем на других слоях.</p>" +
      "<h4>Исключение</h4>" +
      "<p>Два случая считаются срочными и чинятся за час: не открывается очередь инцидентов и не работает кнопка команды. Остальные ошибки попадают в ближайший релиз.</p>" +
      "<h4>Как выходит новая версия</h4>" +
      "<ul><li>Проверяется на тестовом контуре, затем выкатывается на рабочий.</li>" +
      "<li>Выкатка — в первой половине рабочего дня: если что-то пойдёт не так, команда на месте.</li>" +
      "<li>Путь отката проверяется перед каждой выкаткой.</li></ul>"
  },
  manba: []
},

/* ---------- Hodisa sxemasi ---------- */

"ti.m-sxema": {
  yorliq: "Jamoa rahbarlari uchun",
  sarlavha: "sxema: versiyasi yo'q yozuv qabul qilinmaydi",
  tana: "<p>Maydon qiymati <code>mkb.hodisa.v1</code> ko'rinishida. Platforma har xabarda uni tekshiradi va noma'lum versiyani 400 xatosi bilan rad etadi.</p>" +
    "<h4>Nega shunday qat'iy</h4>" +
    "<p>Bir necha yildan keyin arxivda bir nechta versiyadagi yozuvlar yonma-yon turadi. Versiyasi yo'q yozuvni keyin qanday o'qish kerakligini hech kim bilmaydi &mdash; bu ma'lumotni yo'qotishning eng sekin va eng qimmat usuli.</p>" +
    "<h4>Versiyalar qanday yashaydi</h4>" +
    "<ul><li>v1 va v2 kamida olti oy yonma-yon qabul qilinadi.</li>" +
    "<li>Eski versiya o'chirilishidan uch oy oldin adapterlar egalariga xabar beriladi.</li>" +
    "<li>Arxivdagi eski yozuvlar o'z versiyasida qoladi, qayta yozilmaydi.</li></ul>",
  ru: {
    yorliq: "Для тимлида",
    sarlavha: "sxema: запись без версии не принимается",
    tana: "<p>Значение поля выглядит как <code>mkb.hodisa.v1</code>. Платформа проверяет его в каждом сообщении и отклоняет неизвестную версию ошибкой 400.</p>" +
      "<h4>Почему так строго</h4>" +
      "<p>Через несколько лет в архиве будут лежать записи разных версий. Как читать запись без версии, потом не знает никто — это самый медленный и самый дорогой способ потерять данные.</p>" +
      "<h4>Как живут версии</h4>" +
      "<ul><li>v1 и v2 принимаются параллельно минимум шесть месяцев.</li>" +
      "<li>За три месяца до отключения старой версии владельцы адаптеров получают уведомление.</li>" +
      "<li>Старые записи в архиве остаются в своей версии и не переписываются.</li></ul>"
  },
  manba: []
},

"ti.m-id": {
  yorliq: "Jamoa rahbarlari uchun",
  sarlavha: "hodisa_id: takrorni tashlashning kaliti",
  tana: "<p>Identifikator qurilmada yoki adapterda yaratiladi va vaqt bo'yicha tartiblanadigan formatda bo'ladi (ULID yoki UUIDv7). Bu bazada indeks bo'yicha tez qidirish imkonini beradi.</p>" +
    "<h4>Nega tasodifiy UUID emas</h4>" +
    "<p>Tasodifiy identifikatorlar bilan indeks tarqoq bo'ladi va yozish sekinlashadi. Vaqt bo'yicha o'suvchi identifikator yangi yozuvlarni indeksning oxiriga qo'yadi.</p>" +
    "<h4>Takrorni tashlash qoidasi</h4>" +
    "<ul><li>Bir xil <code>hodisa_id</code> ikkinchi marta kelsa, yozuv qabul qilinadi va tashlab yuboriladi; javob 200 bo'ladi, xato emas.</li>" +
    "<li>Takror soni qurilma bo'yicha hisoblanadi: uning o'sishi kanal muammosini ko'rsatadi.</li>" +
    "<li>Identifikator bo'lmasa, adapter uni <code>qurilma_id + vaqt + tur</code> dan yasaydi.</li></ul>",
  ru: {
    yorliq: "Для тимлида",
    sarlavha: "hodisa_id: ключ для отсечения повторов",
    tana: "<p>Идентификатор создаётся на устройстве или в адаптере и имеет сортируемый по времени формат (ULID или UUIDv7). Это позволяет быстро искать по индексу в базе.</p>" +
      "<h4>Почему не случайный UUID</h4>" +
      "<p>Со случайными идентификаторами индекс фрагментируется и запись замедляется. Возрастающий по времени идентификатор кладёт новые записи в конец индекса.</p>" +
      "<h4>Правило отсечения повторов</h4>" +
      "<ul><li>Если тот же <code>hodisa_id</code> приходит повторно, запись принимается и отбрасывается, ответ всё равно 200.</li>" +
      "<li>Число повторов считается по устройству: его рост указывает на проблему канала.</li>" +
      "<li>Если идентификатора нет, адаптер собирает его из <code>qurilma_id + vaqt + tur</code>.</li></ul>"
  },
  manba: []
},

"ti.m-obyekt": {
  yorliq: "Obyekt menejeri uchun",
  sarlavha: "obyekt_id: qurilma aktivga qanday bog'lanadi",
  tana: "<p>Bog'lanish montaj paytida bir marta qilinadi: montajchi ilovada obyektni tanlaydi, qurilmadagi QR-yorliqni skanerlaydi va bog'lanish reyestrga yoziladi.</p>" +
    "<h4>Nega bu eng muhim yozuv</h4>" +
    "<p>Noto'g'ri bog'langan kamera butun zanjirni buzadi: hodisa boshqa obyektga tushadi, inspektor boshqa manzilga boradi, nazorat indeksi noto'g'ri hisoblanadi. Buni keyin topish qiyin, chunki texnik jihatdan hammasi ishlab turgandek ko'rinadi.</p>" +
    "<h4>Nima bilan tekshiriladi</h4>" +
    "<ul><li>Qabul paytida sinov hodisasi yuboriladi va u kerakli obyekt kartochkasida paydo bo'lishi ko'ziga qaraladi.</li>" +
    "<li>Birinchi kadr obyekt suratlari bilan solishtiriladi.</li>" +
    "<li>Qurilma ko'chirilsa, bog'lanish yangilanadi va eski yozuv tarixda qoladi.</li></ul>",
  ru: {
    yorliq: "Для менеджера объекта",
    sarlavha: "obyekt_id: как устройство привязывается к активу",
    tana: "<p>Привязка делается один раз при монтаже: монтажник выбирает объект в приложении, сканирует QR-метку на устройстве, и связь записывается в реестр.</p>" +
      "<h4>Почему это самая важная запись</h4>" +
      "<p>Неверно привязанная камера ломает всю цепочку: событие попадает на другой объект, инспектор едет по другому адресу, индекс контроля считается неправильно. Найти это потом трудно — технически всё выглядит работающим.</p>" +
      "<h4>Чем проверяется</h4>" +
      "<ul><li>При приёмке отправляется тестовое событие, и глазами проверяется, что оно появилось в нужной карточке.</li>" +
      "<li>Первый кадр сверяется с фотографиями объекта.</li>" +
      "<li>При переносе устройства привязка обновляется, старая запись остаётся в истории.</li></ul>"
  },
  manba: []
},

"ti.m-vaqt": {
  yorliq: "Jamoa rahbarlari uchun",
  sarlavha: "vaqt: UTC va NTP, boshqa variant yo'q",
  tana: "<p>Qurilma vaqtni UTC da, ISO 8601 formatida beradi. Mahalliy vaqtga o'tkazish faqat ekranda bajariladi.</p>" +
    "<h4>Soat adashsa nima bo'ladi</h4>" +
    "<ul><li>Hodisalar tartibi buziladi va voqea tarixi noto'g'ri o'qiladi.</li>" +
    "<li>Sud yoki sug'urta ishida yozuvning vaqti shubha ostiga tushadi.</li>" +
    "<li>Takrorni tashlash oynasi noto'g'ri ishlaydi.</li></ul>" +
    "<h4>Nima qilinadi</h4>" +
    "<p>Montaj varag'ida NTP sozlash majburiy band. Platforma har xabarda qurilma vaqti bilan qabul vaqtini solishtiradi; farq 2 daqiqadan oshsa, yozuvga belgi qo'yiladi va qurilma sozlash ro'yxatiga tushadi.</p>" +
    "<p class='ogoh'>Batareyali kamerada soat uzoq uyqudan keyin suriladi. Shuning uchun u har uyg'onganda vaqtni tarmoqdan oladi.</p>",
  ru: {
    yorliq: "Для тимлида",
    sarlavha: "vaqt: UTC и NTP, других вариантов нет",
    tana: "<p>Устройство отдаёт время в UTC, в формате ISO 8601. Перевод в местное время делается только на экране.</p>" +
      "<h4>Что будет, если часы сбиты</h4>" +
      "<ul><li>Нарушается порядок событий, история инцидента читается неверно.</li>" +
      "<li>В суде или страховом деле время записи ставится под сомнение.</li>" +
      "<li>Неправильно работает окно отсечения повторов.</li></ul>" +
      "<h4>Что делается</h4>" +
      "<p>Настройка NTP — обязательный пункт листа монтажа. Платформа в каждом сообщении сравнивает время устройства и время приёма; при расхождении больше двух минут запись помечается, а устройство попадает в список на настройку.</p>" +
      "<p class='ogoh'>У батарейной камеры часы уходят после долгого сна. Поэтому она берёт время из сети при каждом пробуждении.</p>"
  },
  manba: []
},

"ti.m-ishonch": {
  yorliq: "Xavfsizlik uchun",
  sarlavha: "ishonch: raqam bilan filtr, his-tuyg'u bilan emas",
  tana: "<p>Koeffitsiyent 0 dan 1 gacha va uni qurilmaning o'z tahlili beradi. Platforma uni o'zgartirmaydi, faqat chegara bilan solishtiradi.</p>" +
    "<h4>Amaliy qoidalar</h4>" +
    "<ul><li>Chegara obyekt turiga qarab qo'yiladi: shahar ichidagi ofisda yuqoriroq, chekka omborda pastroq.</li>" +
    "<li>Chegaradan past hodisalar saqlanadi va haftalik tahlilda ko'riladi: ular orasida haqiqiy holat chiqsa, chegara pasaytiriladi.</li>" +
    "<li>Koeffitsiyent bermaydigan qurilmalarda maydon <code>null</code> bo'ladi va filtr faqat hodisa turi bo'yicha ishlaydi.</li></ul>" +
    "<p class='ogoh'>Turli brendlarning koeffitsiyentlari bir xil shkalada emas. Shuning uchun chegara har brend uchun alohida sozlanadi va bu adapter hujjatida yoziladi.</p>",
  ru: {
    yorliq: "Для безопасности",
    sarlavha: "ishonch: фильтр по числу",
    tana: "<p>Коэффициент от 0 до 1 выдаёт собственная аналитика устройства. Платформа его не меняет, только сравнивает с порогом.</p>" +
      "<h4>Практические правила</h4>" +
      "<ul><li>Порог задаётся по типу объекта: в городском офисе выше, на отдалённом складе ниже.</li>" +
      "<li>События ниже порога сохраняются и просматриваются на недельном разборе: если среди них попадаются настоящие, порог снижают.</li>" +
      "<li>У устройств, не выдающих коэффициент, поле равно <code>null</code>, и фильтр работает только по типу события.</li></ul>" +
      "<p class='ogoh'>Коэффициенты разных брендов не лежат на одной шкале. Поэтому порог настраивается отдельно для каждого бренда и фиксируется в документации адаптера.</p>"
  },
  manba: []
},

"ti.m-kadr": {
  yorliq: "Xavfsizlik uchun",
  sarlavha: "kadr_url: rasm qayerda saqlanadi",
  tana: "<p>Maydon dalil omboridagi manzilni saqlaydi. Fayl bank ichidagi obyekt omborida (MinIO yoki shunga o'xshash S3 mos ombor) yotadi.</p>" +
    "<h4>Kirish qoidalari</h4>" +
    "<ul><li>Havola vaqtinchalik: token 15 daqiqada tugaydi, shuning uchun nusxalangan manzil keyin ochilmaydi.</li>" +
    "<li>Har ochish jurnalga yoziladi: kim, qachon, qaysi obyekt.</li>" +
    "<li>Saqlash muddati 90 kun; voqea bilan bog'langan fayl ish yopilgunicha saqlanadi.</li></ul>" +
    "<h4>Kadr kelmasa</h4>" +
    "<p>Maydon <code>null</code> bo'ladi va operator ekranida rasm o'rniga holat ko'rsatiladi. Hodisa baribir ishlanadi: rasmsiz signal ham signal.</p>",
  ru: {
    yorliq: "Для безопасности",
    sarlavha: "kadr_url: где хранится изображение",
    tana: "<p>Поле хранит не сам файл, а его адрес в хранилище доказательств. Файл лежит в объектном хранилище внутри банка (MinIO или другое S3-совместимое).</p>" +
      "<h4>Правила доступа</h4>" +
      "<ul><li>Ссылка временная: токен истекает через 15 минут, поэтому скопированный адрес потом не откроется.</li>" +
      "<li>Каждое открытие пишется в журнал: кто, когда, по какому объекту.</li>" +
      "<li>Срок хранения 90 дней; файл, связанный с инцидентом, хранится до закрытия дела.</li></ul>" +
      "<h4>Если кадр не пришёл</h4>" +
      "<p>Поле равно <code>null</code>, и на экране оператора вместо изображения показывается статус. Событие всё равно обрабатывается: тревога без картинки — тоже тревога.</p>"
  },
  manba: []
},

"ti.m-sha": {
  yorliq: "Yuristlar uchun",
  sarlavha: "sha256: dalilning butunligini nima isbotlaydi",
  tana: "<p>Xesh fayl obyektda yozilgan paytda hisoblanadi va hodisa yozuvi bilan birga yuboriladi. Markazda fayl qabul qilinganda xesh qayta hisoblanib solishtiriladi.</p>" +
    "<h4>Nima isbotlanadi va nima yo'q</h4>" +
    "<ul><li><b>Isbotlanadi:</b> markazga kelgan fayl qurilmada yozilganidan keyin o'zgartirilmagan.</li>" +
    "<li><b>Isbotlanmaydi:</b> qurilmaning o'zi to'g'ri ishlaganligi. Buning uchun qurilma jurnali, sertifikat va montaj dalolatnomasi kerak.</li></ul>" +
    "<h4>Zanjirni qanday kuchaytirish mumkin</h4>" +
    "<p>Kunlik xeshlar ro'yxati alohida jurnalda saqlanadi va uning o'zi ham imzolanadi. Bu yozuvni keyinchalik almashtirish imkonini yo'qotadi: bitta faylni o'zgartirish butun kunlik jurnalni mos kelmaydigan qiladi.</p>" +
    "<p class='ogoh'>Sud ishida video yozuv qonun buzilmasdan olingani ham tekshiriladi: ogohlantirish lavhasi, kameraning yo'nalishi va obyektga egalik hujjati.</p>",
  ru: {
    yorliq: "Для юристов",
    sarlavha: "sha256: чем доказывается целостность",
    tana: "<p>Хеш считается в момент записи файла на объекте и отправляется вместе с записью о событии. В центре при приёме файла хеш пересчитывается и сверяется.</p>" +
      "<h4>Что доказывается и что нет</h4>" +
      "<ul><li><b>Доказывается:</b> пришедший в центр файл не изменялся после записи на устройстве.</li>" +
      "<li><b>Не доказывается:</b> что само устройство работало исправно. Для этого нужны журнал устройства, сертификат и акт монтажа.</li></ul>" +
      "<h4>Как усилить цепочку</h4>" +
      "<p>Список хешей за сутки хранится в отдельном журнале, который сам подписывается. Это лишает возможности подменить запись задним числом: изменение одного файла ломает сходимость всего дневного журнала.</p>" +
      "<p class='ogoh'>В суде проверяется и законность получения записи: предупреждающая табличка, направление камеры и документ о праве на объект.</p>"
  },
  manba: []
},

"ti.m-holat": {
  yorliq: "Servis uchun",
  sarlavha: "batareya va signal: nosozlikni oldindan ko'rish",
  tana: "<p>Bu ikki raqam har hodisa va har telemetriya o'lchovi bilan keladi. Ular bo'yicha nosozlik bo'lishidan oldin chora ko'riladi.</p>" +
    "<table><tr><th>Holat</th><th>Chegara</th><th>Amal</th></tr>" +
    "<tr><td>Batareya</td><td>30%</td><td>Servis arizasi ochiladi</td></tr>" +
    "<tr><td>Batareya</td><td>20%</td><td>Nazorat indeksi tushadi</td></tr>" +
    "<tr><td>Signal</td><td>&minus;105 dBm</td><td>Antennani tekshirish ro'yxatiga</td></tr>" +
    "<tr><td>Harorat</td><td>&minus;15 &deg;C dan past</td><td>Zaryadlash to'xtatiladi, BMS ishlaydi</td></tr></table>" +
    "<h4>Grafik nimani ko'rsatadi</h4>" +
    "<p>Bir haftalik zaryad grafigi panelning ishlayotganini aniq ko'rsatadi: kunduzi ko'tarilmayotgan chiziq changlagan panel yoki uzilgan simni bildiradi. Bu servis brigadasi chiqishidan oldin bilib olinadi.</p>",
  ru: {
    yorliq: "Для сервиса",
    sarlavha: "batareya и signal: увидеть отказ заранее",
    tana: "<p>Эти два числа приходят с каждым событием и каждым замером телеметрии. По ним принимаются меры до того, как случится отказ.</p>" +
      "<table><tr><th>Показатель</th><th>Порог</th><th>Действие</th></tr>" +
      "<tr><td>Батарея</td><td>30%</td><td>Открывается сервисная заявка</td></tr>" +
      "<tr><td>Батарея</td><td>20%</td><td>Снижается индекс контроля</td></tr>" +
      "<tr><td>Сигнал</td><td>&minus;105 дБм</td><td>В список на проверку антенны</td></tr>" +
      "<tr><td>Температура</td><td>ниже &minus;15 &deg;C</td><td>Заряд прекращается, работает BMS</td></tr></table>" +
      "<h4>Что показывает график</h4>" +
      "<p>Недельный график заряда прямо показывает, работает ли панель: линия, не растущая днём, означает запылённую панель или оборванный провод. Это выясняется до выезда сервисной бригады.</p>"
  },
  manba: []
},

"ti.versiya": {
  yorliq: "Jamoa rahbarlari uchun",
  sarlavha: "Sxemani o'zgartirish tartibi",
  tana: "<p>Qo'shimcha maydon qo'shish buzuvchi o'zgarish emas: eski adapterlar ishlashda davom etadi, yangi maydonni bilmaganlar uni e'tiborsiz qoldiradi.</p>" +
    "<h4>Buzuvchi o'zgarishlar ro'yxati</h4>" +
    "<ul><li>Maydonni o'chirish yoki nomini o'zgartirish.</li>" +
    "<li>Maydon turini o'zgartirish: raqam o'rniga matn.</li>" +
    "<li>Qiymatlar ro'yxatidan birortasini olib tashlash.</li>" +
    "<li>Majburiy bo'lmagan maydonni majburiy qilish.</li></ul>" +
    "<h4>Tartib</h4>" +
    "<p>Buzuvchi o'zgarish uchun v2 chiqadi. Ikkala versiya kamida olti oy qabul qilinadi, keyin eskisi o'chiriladi. Adapterlar bir-bir ko'chiriladi, hammasi birdan emas.</p>",
  ru: {
    yorliq: "Для тимлида",
    sarlavha: "Порядок изменения схемы",
    tana: "<p>Добавление поля не является ломающим изменением: старые адаптеры продолжают работать и просто игнорируют незнакомое поле.</p>" +
      "<h4>Список ломающих изменений</h4>" +
      "<ul><li>Удаление поля или переименование.</li>" +
      "<li>Смена типа: вместо числа строка.</li>" +
      "<li>Удаление значения из списка допустимых.</li>" +
      "<li>Превращение необязательного поля в обязательное.</li></ul>" +
      "<h4>Порядок</h4>" +
      "<p>Под ломающее изменение выпускается v2. Обе версии принимаются минимум шесть месяцев, затем старая отключается. Адаптеры переводятся по одному.</p>"
  },
  manba: []
},

"ti.takror": {
  yorliq: "Jamoa rahbarlari uchun",
  sarlavha: "Takror hodisa: sabab va o'lchov",
  tana: "<p>Bitta hodisaning ikki marta kelishi ikki holatda yuz beradi: shlyuz javobni olmasdan qayta yuborgan yoki adapter obunani qayta tiklaganda eski xabarlarni ham o'qigan.</p>" +
    "<h4>Nima qilinadi</h4>" +
    "<ul><li>Takror <code>hodisa_id</code> bo'yicha tashlanadi, javob 200 qaytadi.</li>" +
    "<li>Takror hisoblagichi qurilma bo'yicha yuritiladi.</li>" +
    "<li>Bir kunda 5% dan ortiq takror &mdash; kanal yoki adapter muammosining belgisi.</li></ul>" +
    "<h4>Nega takror yaxshi belgi</h4>" +
    "<p>Takror bo'lishi &mdash; shlyuz xabarni yo'qotmaganini bildiradi. Yo'qolgan hodisani bilib bo'lmaydi, takrorni esa sanash mumkin. Shuning uchun tizim takrorga toqat qiladi, lekin yo'qotishga yo'l qo'ymaydi.</p>",
  ru: {
    yorliq: "Для тимлида",
    sarlavha: "Повторное событие: причина и измерение",
    tana: "<p>Одно событие приходит дважды в двух случаях: шлюз отправил повторно, не получив ответа, или адаптер при восстановлении подписки вычитал ещё и старые сообщения.</p>" +
      "<h4>Что делается</h4>" +
      "<ul><li>Повтор отсекается по <code>hodisa_id</code>, ответ 200.</li>" +
      "<li>Счётчик повторов ведётся по устройству.</li>" +
      "<li>Больше 5% повторов за сутки — признак проблемы канала или адаптера.</li></ul>" +
      "<h4>Почему повтор — хороший признак</h4>" +
      "<p>Повтор означает, что шлюз не потерял сообщение. Потерянное событие узнать нельзя, а повторы можно посчитать. Поэтому система терпима к повторам и нетерпима к потерям.</p>"
  },
  manba: []
},

"ti.dalil": {
  yorliq: "Yuristlar uchun",
  sarlavha: "Dalil zanjiri: kadrdan sud ishigacha",
  tana: "<p>Yozuvning dalil sifatidagi kuchi uch narsaga bog'liq: qonuniy olinganligi, o'zgartirilmaganligi va vaqtining aniqligi.</p>" +
    "<table><tr><th>Talab</th><th>Tizimda qanday bajariladi</th></tr>" +
    "<tr><td>Qonuniylik</td><td>Ogohlantirish lavhasi, kamera o'z hududiga qaratilgan</td></tr>" +
    "<tr><td>Butunlik</td><td>SHA-256 va kunlik imzolangan jurnal</td></tr>" +
    "<tr><td>Vaqt</td><td>UTC, NTP bilan sinxronlangan soat</td></tr>" +
    "<tr><td>Manba</td><td>Qurilma sertifikati va reyestrdagi bog'lanish</td></tr>" +
    "<tr><td>Uzluksizlik</td><td>Yozuv nomeri ketma-ket, bo'shliq ko'rinadi</td></tr></table>" +
    "<p>Eksport rasmiy tartibda bajariladi: fayl, xesh, vaqt oraliqlari va jurnal ko'chirmasi bir paketda beriladi. Xodimning telefoniga nusxalangan video dalil hisoblanmaydi.</p>",
  ru: {
    yorliq: "Для юристов",
    sarlavha: "Цепочка доказательства: от кадра до судебного дела",
    tana: "<p>Сила записи как доказательства зависит от трёх вещей: законности получения, неизменности и точности времени.</p>" +
      "<table><tr><th>Требование</th><th>Как выполняется в системе</th></tr>" +
      "<tr><td>Законность</td><td>Предупреждающая табличка, камера направлена на свою территорию</td></tr>" +
      "<tr><td>Целостность</td><td>SHA-256 и подписанный суточный журнал</td></tr>" +
      "<tr><td>Время</td><td>UTC, часы синхронизированы по NTP</td></tr>" +
      "<tr><td>Источник</td><td>Сертификат устройства и привязка в реестре</td></tr>" +
      "<tr><td>Непрерывность</td><td>Последовательная нумерация записей, пропуск виден</td></tr></table>" +
      "<p>Выгрузка делается официально: файл, хеш, временные границы и выписка из журнала передаются одним пакетом. Видео, скопированное на телефон сотрудника, доказательством не считается.</p>"
  },
  manba: []
}

});

/* ---------- Adapterlar, buzilishlar va bir kunlik hisob ---------- */
window.MKB_BATAFSIL = Object.assign(window.MKB_BATAFSIL || {}, {

"ti.a-hik": {
  yorliq: "Jamoa rahbarlari uchun",
  sarlavha: "Hikvision: ochiq oqim, lekin uzilishni o'zi aytmaydi",
  tana: "<p>ISAPI <code>alertStream</code> &mdash; uzilmaydigan HTTP ulanish: kamera hodisani multipart oqimda yuboradi. Adapter shu ulanishni ushlab turadi.</p>" +
    "<h4>Amaliy tafsilotlar</h4>" +
    "<ul><li>Ulanish uzilganini TCP darajasida darrov bilib bo'lmaydi. Shuning uchun adapter 30 soniyada bir marta kelgan baytni tekshiradi va sukut cho'zilsa, ulanishni qayta ochadi.</li>" +
    "<li>Kadr alohida so'rov bilan olinadi: <code>/ISAPI/Streaming/channels/101/picture</code>.</li>" +
    "<li>Digest autentifikatsiya ishlatiladi, parol montajda almashtiriladi.</li></ul>" +
    "<h4>Ish hajmi</h4>" +
    "<p>3&ndash;4 hafta. Vaqtning yarmi hodisa turlarini moslashtirishga ketadi: bitta kamerada yigirmadan ortiq qoida turi bor va ularning aksariyati bizga kerak emas.</p>",
  ru: {
    yorliq: "Для тимлида",
    sarlavha: "Hikvision: открытый поток, но об обрыве не сообщает",
    tana: "<p>ISAPI <code>alertStream</code> — непрерывное HTTP-соединение: камера шлёт события multipart-потоком. Адаптер держит это соединение открытым.</p>" +
      "<h4>Практические детали</h4>" +
      "<ul><li>Обрыв соединения не всегда виден на уровне TCP. Поэтому адаптер раз в 30 секунд проверяет, приходили ли байты, и при затянувшейся тишине переоткрывает поток.</li>" +
      "<li>Кадр запрашивается отдельно: <code>/ISAPI/Streaming/channels/101/picture</code>.</li>" +
      "<li>Используется digest-аутентификация, пароль меняется при монтаже.</li></ul>" +
      "<h4>Объём работ</h4>" +
      "<p>3&ndash;4 недели. Половина времени уходит на сопоставление типов событий: у одной камеры больше двадцати типов правил, и большинство нам не нужны.</p>"
  },
  manba: []
},

"ti.a-dahua": {
  yorliq: "Jamoa rahbarlari uchun",
  sarlavha: "Dahua: obuna oqimi va nomlar farqi",
  tana: "<p>HTTP API da <code>eventManager</code> orqali obuna ochiladi va hodisalar shu ulanishda keladi. Mantiq Hikvision bilan o'xshash, nomlar boshqa.</p>" +
    "<h4>Nimaga e'tibor beriladi</h4>" +
    "<ul><li>Hodisa nomlari modelga qarab farq qiladi: <code>CrossRegionDetection</code>, <code>CrossLineDetection</code>, <code>VideoMotion</code>. Moslik jadvali adapter sozlamasida turadi, kodda emas.</li>" +
    "<li>Hodisa boshlanishi va tugashi alohida keladi: adapter faqat boshlanishini hodisa deb hisoblaydi.</li>" +
    "<li>Kadr <code>snapshot</code> so'rovi bilan olinadi.</li></ul>" +
    "<p class='ogoh'>Yangi model kelganda nomlar jadvalini to'ldirish kerak bo'ladi. Shuning uchun qabul sinovida aynan o'sha model ishlatiladi, boshqasi emas.</p>",
  ru: {
    yorliq: "Для тимлида",
    sarlavha: "Dahua: поток подписки и разница в названиях",
    tana: "<p>В HTTP API подписка открывается через <code>eventManager</code>, события приходят в этом же соединении. Логика близка к Hikvision, названия другие.</p>" +
      "<h4>На что обращать внимание</h4>" +
      "<ul><li>Имена событий отличаются от модели к модели: <code>CrossRegionDetection</code>, <code>CrossLineDetection</code>, <code>VideoMotion</code>. Таблица соответствия лежит в настройках адаптера.</li>" +
      "<li>Начало и конец события приходят раздельно: адаптер считает событием только начало.</li>" +
      "<li>Кадр берётся запросом <code>snapshot</code>.</li></ul>" +
      "<p class='ogoh'>С новой моделью таблицу названий придётся дополнить. Поэтому в приёмочных испытаниях используется именно та модель, которая пойдёт на объекты.</p>"
  },
  manba: []
},

"ti.a-reolink": {
  yorliq: "Jamoa rahbarlari uchun",
  sarlavha: "Reolink: Home Hub orqali ishlash sharti",
  tana: "<p>Batareyali Reolink kameralari to'g'ridan-to'g'ri RTSP bermaydi: oqim Home Hub orqali olinadi. Hub obyektda turadi va elektrga ulangan bo'lishi kerak.</p>" +
    "<h4>Nimasi qulay</h4>" +
    "<ul><li>HTTP API va ONVIF ochiq, hujjatlar mavjud.</li>" +
    "<li>Hub bir nechta kamerani yig'adi va yozuvni o'zida saqlaydi.</li>" +
    "<li>Narxi bo'yicha bu eng arzon ishlaydigan variantlardan biri.</li></ul>" +
    "<h4>Nimasi cheklaydi</h4>" +
    "<p>Hub orqali RTSP sessiyasi 3&ndash;5 daqiqada uziladi va uni qayta ochish kerak bo'ladi. Uzoq muddatli kuzatuv talab qiladigan obyektga bu yechim tanlanmaydi.</p>" +
    "<p class='ogoh'>Hub elektrsiz obyektda ham quvvat talab qiladi: uning sarfi quvvat hisobiga kiritiladi, aks holda akkumulyator hisobi ikki barobar xato bo'ladi.</p>",
  ru: {
    yorliq: "Для тимлида",
    sarlavha: "Reolink: работа только через Home Hub",
    tana: "<p>Батарейные камеры Reolink не отдают RTSP напрямую: поток берётся через Home Hub. Хаб стоит на объекте и должен быть запитан.</p>" +
      "<h4>Что удобно</h4>" +
      "<ul><li>HTTP API и ONVIF открыты, документация есть.</li>" +
      "<li>Хаб собирает несколько камер и хранит запись у себя.</li>" +
      "<li>По цене это один из самых дешёвых работающих вариантов.</li></ul>" +
      "<h4>Что ограничивает</h4>" +
      "<p>RTSP-сессия через хаб обрывается за 3&ndash;5 минут, её приходится переоткрывать. Для объектов с длительным наблюдением это решение не выбирают.</p>" +
      "<p class='ogoh'>Хаб потребляет энергию и на объекте без электричества: его расход вносится в энергобаланс, иначе расчёт аккумулятора ошибётся вдвое.</p>"
  },
  manba: []
},

"ti.a-ajax": {
  yorliq: "Jamoa rahbarlari uchun",
  sarlavha: "Ajax: signalizatsiya tili, video emas",
  tana: "<p>Ajax &mdash; signalizatsiya tizimi: datchiklar, klaviatura, sirena. Kamera alohida qo'yiladi.</p>" +
    "<h4>Hodisa qanday olinadi</h4>" +
    "<ul><li><code>SIA DC-09</code> &mdash; qo'riqlash sanoatining standart protokoli. Hodisa qisqa kod bilan keladi: <code>BA</code> &mdash; bosqin signali, <code>BR</code> &mdash; tiklanish, <code>OP</code>/<code>CL</code> &mdash; qo'riqdan olish va qo'yish.</li>" +
    "<li>Bu kanal markaziy kuzatuv stansiyalari uchun mo'ljallangan, shuning uchun ishonchli va sodda.</li>" +
    "<li>Kengaytirilgan ma'lumot uchun Enterprise API bor, lekin u bulut orqali ishlaydi.</li></ul>" +
    "<p class='ogoh'>To'liq bulutsiz ishlash Ajax uchun qisman bajariladi: signal kanali mahalliy, boshqaruvning bir qismi baribir bulutga bog'liq. Bu tanlovda alohida ko'riladi.</p>",
  ru: {
    yorliq: "Для тимлида",
    sarlavha: "Ajax: язык сигнализации, а не видео",
    tana: "<p>Ajax — система сигнализации: датчики, клавиатура, сирена. Камера в неё не входит и ставится отдельно.</p>" +
      "<h4>Как получаются события</h4>" +
      "<ul><li><code>SIA DC-09</code> — стандартный протокол охранной отрасли. Событие приходит коротким кодом: <code>BA</code> — тревога взлома, <code>BR</code> — восстановление, <code>OP</code>/<code>CL</code> — снятие и постановка на охрану.</li>" +
      "<li>Канал рассчитан на пультовые компании, поэтому надёжен и прост.</li>" +
      "<li>Для расширенных данных есть Enterprise API, но он работает через облако.</li></ul>" +
      "<p class='ogoh'>Полностью без облака Ajax работает лишь частично: канал тревог локальный, часть управления всё равно завязана на облако. Это отдельно учитывается при выборе.</p>"
  },
  manba: []
},

"ti.a-milesight": {
  yorliq: "Jamoa rahbarlari uchun",
  sarlavha: "Milesight: eng arzon adapter, eng kam ma'lumot",
  tana: "<p>LoRaWAN datchiklari shlyuz orqali MQTT ga yozadi. Adapter faqat mavzuga obuna bo'ladi va JSON ni o'giradi &mdash; shuning uchun ish hajmi 1&ndash;2 hafta.</p>" +
    "<h4>Qaysi hodisalar keladi</h4>" +
    "<table><tr><th>Datchik</th><th>Hodisa</th></tr>" +
    "<tr><td>Eshik kontakti</td><td>ochildi, yopildi</td></tr>" +
    "<tr><td>Harakat</td><td>harakat bor</td></tr>" +
    "<tr><td>Harorat va namlik</td><td>chegaradan chiqish</td></tr>" +
    "<tr><td>Suv bosishi</td><td>suv aniqlandi</td></tr></table>" +
    "<p>LoRaWAN datchigining batareyasi 3&ndash;5 yil ishlaydi va signal binoning ichkarisidan ham o'tadi. Lekin u rasm bermaydi: nima bo'lganini ko'rish uchun baribir kamera kerak.</p>" +
    "<p class='ogoh'>Shu sababli LoRaWAN datchiklari kameraga qo'shimcha sifatida qo'yiladi: ular arzon va ko'p nuqtani qamrab oladi.</p>",
  ru: {
    yorliq: "Для тимлида",
    sarlavha: "Milesight: самый дешёвый адаптер и меньше всего данных",
    tana: "<p>Датчики LoRaWAN пишут через шлюз в MQTT. Адаптер только подписывается на топик и преобразует JSON — отсюда объём работ в 1&ndash;2 недели.</p>" +
      "<h4>Какие события приходят</h4>" +
      "<table><tr><th>Датчик</th><th>Событие</th></tr>" +
      "<tr><td>Контакт двери</td><td>открыта, закрыта</td></tr>" +
      "<tr><td>Движение</td><td>есть движение</td></tr>" +
      "<tr><td>Температура и влажность</td><td>выход за порог</td></tr>" +
      "<tr><td>Протечка</td><td>обнаружена вода</td></tr></table>" +
      "<p>Батареи LoRaWAN-датчика хватает на 3&ndash;5 лет, сигнал проходит и изнутри здания. Но картинки он не даёт: чтобы увидеть, что случилось, всё равно нужна камера.</p>" +
      "<p class='ogoh'>Поэтому LoRaWAN-датчики ставят не вместо камеры, а в дополнение: они дёшевы и закрывают много точек.</p>"
  },
  manba: []
},

"ti.a-onvif": {
  yorliq: "Jamoa rahbarlari uchun",
  sarlavha: "ONVIF: umumiy til, lekin har brendda o'z shevasi",
  tana: "<p>ONVIF &mdash; kameralar uchun sanoat standarti. Profile S video oqimini, Profile T esa hodisalar va tahlilni qamrab oladi. Hodisalar <code>PullPoint</code> obunasi orqali olinadi.</p>" +
    "<h4>Amalda nima bo'ladi</h4>" +
    "<ul><li>Standart bir xil, lekin hodisa nomlari va maydonlari brendga qarab farq qiladi. Universal adapter yozib bo'lmaydi: har brend uchun moslik jadvali kerak.</li>" +
    "<li>Ba'zi kameralar Profile T ni to'liq qo'llab-quvvatlamaydi va hodisani faqat o'z API si orqali beradi.</li>" +
    "<li>Obuna muddati bor: uni vaqti-vaqti bilan yangilab turish kerak, aks holda oqim jimgina to'xtaydi.</li></ul>" +
    "<p><b>Xarid qoidasi:</b> ONVIF qo'llab-quvvatlanishi texnik topshiriqda yoziladi, lekin qabulda amalda tekshiriladi. Qutidagi yozuv yetarli emas.</p>",
  ru: {
    yorliq: "Для тимлида",
    sarlavha: "ONVIF: общий язык, но у каждого бренда свой диалект",
    tana: "<p>ONVIF — отраслевой стандарт для камер. Profile S покрывает видеопоток, Profile T — события и аналитику. События получают через подписку <code>PullPoint</code>.</p>" +
      "<h4>Что происходит на практике</h4>" +
      "<ul><li>Стандарт один, но имена и поля событий у брендов различаются. Универсальный адаптер написать нельзя: на каждый бренд нужна таблица соответствия.</li>" +
      "<li>Часть камер не поддерживает Profile T полностью и отдаёт события только через собственный API.</li>" +
      "<li>У подписки есть срок: её нужно периодически продлевать, иначе поток тихо прекращается.</li></ul>" +
      "<p><b>Правило закупки:</b> поддержка ONVIF пишется в техзадании, но проверяется на приёмке фактически. Надписи на коробке недостаточно.</p>"
  },
  manba: [["ONVIF Profile S", "https://www.onvif.org/profiles/profile-s/"]]
},

"ti.ad1": {
  yorliq: "Jamoa rahbarlari uchun",
  sarlavha: "Qabul: obuna uzilganini qanday bilish mumkin",
  tana: "<p>Eng yomon nosozlik &mdash; jimgina to'xtagan obuna: adapter ishlayotgandek ko'rinadi, lekin hodisa kelmaydi.</p>" +
    "<h4>Uchta himoya</h4>" +
    "<ul><li><b>Sukut taymeri.</b> Kameradan 30 daqiqa hech narsa kelmasa (hodisa ham, puls ham), adapter ulanishni qayta ochadi.</li>" +
    "<li><b>Sinov hodisasi.</b> Kuniga bir marta kameraga sun'iy hodisa so'rovi yuboriladi va u zanjirdan o'tishi tekshiriladi.</li>" +
    "<li><b>Qayta urinish.</b> 5 soniyadan boshlab ikki barobar oshib boruvchi kechikish, 5 daqiqada cheklanadi.</li></ul>" +
    "<p class='ogoh'>Adapterning &laquo;ishlayapti&raquo; holati hodisa kelayotganini bildirmaydi. Monitoringda ikkita alohida ko'rsatkich bo'ladi: xizmat tirikmi va oxirgi hodisa qachon kelgan.</p>",
  ru: {
    yorliq: "Для тимлида",
    sarlavha: "Приём: как узнать, что подписка оборвалась",
    tana: "<p>Худший отказ — тихо остановившаяся подписка: адаптер выглядит работающим, а события не идут.</p>" +
      "<h4>Три защиты</h4>" +
      "<ul><li><b>Таймер тишины.</b> Если от камеры 30 минут нет ничего — ни событий, ни импульсов, — адаптер переоткрывает соединение.</li>" +
      "<li><b>Тестовое событие.</b> Раз в сутки камере отправляется запрос на искусственное событие и проверяется его проход по цепочке.</li>" +
      "<li><b>Повторные попытки.</b> Задержка с 5 секунд, удваивается, ограничена пятью минутами.</li></ul>" +
      "<p class='ogoh'>Статус «работает» у адаптера не означает, что события идут. В мониторинге два разных показателя: жив ли сервис и когда пришло последнее событие.</p>"
  },
  manba: []
},

"ti.ad2": {
  yorliq: "Jamoa rahbarlari uchun",
  sarlavha: "Normallashtirish: nomlar jadvali sozlama faylida",
  tana: "<p>Brend hodisasini yagona turga o'girish jadvali sozlama faylida saqlanadi. Yangi model chiqqanda kodni o'zgartirmasdan, jadvalga qator qo'shiladi.</p>" +
    "<table><tr><th>Brend hodisasi</th><th>Yagona tur</th><th>Sinf</th></tr>" +
    "<tr><td>fielddetection</td><td>harakat</td><td>odam</td></tr>" +
    "<tr><td>linedetection</td><td>chiziq</td><td>odam</td></tr>" +
    "<tr><td>tamperdetection</td><td>buzish</td><td>&mdash;</td></tr>" +
    "<tr><td>videoloss</td><td>nosozlik</td><td>&mdash;</td></tr></table>" +
    "<p>Jadvalda yo'q hodisa <code>tur: boshqa</code> bilan saqlanadi va navbatga chiqmaydi. Haftalik tahlilda shunday yozuvlar ko'riladi: ular orasida kerakli hodisa bo'lsa, jadvalga qo'shiladi.</p>",
  ru: {
    yorliq: "Для тимлида",
    sarlavha: "Нормализация: таблица имён в файле настроек",
    tana: "<p>Таблица перевода событий бренда в единый тип лежит в файле настроек. При выходе новой модели строка добавляется в таблицу, код не меняется.</p>" +
      "<table><tr><th>Событие бренда</th><th>Единый тип</th><th>Класс</th></tr>" +
      "<tr><td>fielddetection</td><td>движение</td><td>человек</td></tr>" +
      "<tr><td>linedetection</td><td>пересечение линии</td><td>человек</td></tr>" +
      "<tr><td>tamperdetection</td><td>вскрытие</td><td>&mdash;</td></tr>" +
      "<tr><td>videoloss</td><td>неисправность</td><td>&mdash;</td></tr></table>" +
      "<p>Событие, которого нет в таблице, сохраняется с <code>tur: boshqa</code> и не попадает в очередь. Такие записи просматриваются на недельном разборе: если среди них есть нужное, оно добавляется в таблицу.</p>"
  },
  manba: []
},

"ti.ad3": {
  yorliq: "Xavfsizlik uchun",
  sarlavha: "Takrorni yig'ish: nega 10 daqiqa",
  tana: "<p>Kamera oldida turgan odam bir daqiqada o'n martagacha hodisa yaratadi. Ularning har biri alohida voqea bo'lsa, navbatchi bitta holat uchun o'n xabarnoma oladi.</p>" +
    "<h4>Yig'ish qoidasi</h4>" +
    "<ul><li>Bitta qurilmadan bir xil turdagi hodisalar 10 daqiqalik oynada bitta voqeaga yig'iladi.</li>" +
    "<li>Voqeada takror soni va oxirgi hodisa vaqti ko'rsatiladi.</li>" +
    "<li>Yangi kadr qo'shiladi, lekin yangi xabarnoma yuborilmaydi.</li></ul>" +
    "<h4>Istisno</h4>" +
    "<p>Turi boshqa hodisa (masalan, harakatdan keyin eshik ochilishi) yig'ilmaydi va yangi voqea yaratadi: bu vaziyatning kuchayishini bildiradi va operator buni darrov bilishi kerak.</p>",
  ru: {
    yorliq: "Для безопасности",
    sarlavha: "Склейка повторов: почему десять минут",
    tana: "<p>Человек, стоящий перед камерой, за минуту создаёт до десяти событий. Если каждое станет инцидентом, дежурный получит десять уведомлений об одной ситуации.</p>" +
      "<h4>Правило склейки</h4>" +
      "<ul><li>События одного типа с одного устройства склеиваются в один инцидент в окне 10 минут.</li>" +
      "<li>В инциденте показываются число повторов и время последнего события.</li>" +
      "<li>Новый кадр добавляется, новое уведомление не отправляется.</li></ul>" +
      "<h4>Исключение</h4>" +
      "<p>Событие другого типа (например, открытие двери после движения) не склеивается и создаёт новый инцидент: это признак развития ситуации, и оператор должен узнать о нём сразу.</p>"
  },
  manba: []
},

"ti.ad4": {
  yorliq: "Jamoa rahbarlari uchun",
  sarlavha: "Shina: nega hodisa to'g'ridan-to'g'ri bazaga yozilmaydi",
  tana: "<p>Adapter yozuvni brokerga qo'yadi, keyin uni bir nechta iste'molchi oladi: bazaga yozuvchi, qoidalar xizmati, xabarnoma xizmati, hisobot yig'uvchi.</p>" +
    "<h4>Nima yutuq beradi</h4>" +
    "<ul><li>Baza yangilanish uchun to'xtatilsa, hodisalar navbatda kutadi va yo'qolmaydi.</li>" +
    "<li>Yangi iste'molchi qo'shish adapterni o'zgartirmaydi.</li>" +
    "<li>Xabar kaliti <code>obyekt_id</code>: bitta obyektning hodisalari tartib bilan ishlanadi.</li></ul>" +
    "<h4>Narxi</h4>" +
    "<p>Broker &mdash; yana bitta ekspluatatsiya qilinadigan tizim: uni kuzatish, zaxiralash va yangilash kerak. Shuning uchun bankda allaqachon ishlab turgan broker tanlanadi; ikkinchi turini olib kelish qo'shimcha xarajat.</p>",
  ru: {
    yorliq: "Для тимлида",
    sarlavha: "Шина: почему событие не пишется сразу в базу",
    tana: "<p>Адаптер кладёт запись в брокер, а дальше её забирают несколько потребителей: писатель в базу, сервис правил, сервис уведомлений, сборщик отчётов.</p>" +
      "<h4>Что это даёт</h4>" +
      "<ul><li>Если база остановлена на обновление, события ждут в очереди и не теряются.</li>" +
      "<li>Добавление нового потребителя не требует менять адаптер.</li>" +
      "<li>Ключ сообщения — <code>obyekt_id</code>: события одного объекта обрабатываются по порядку.</li></ul>" +
      "<h4>Цена</h4>" +
      "<p>Брокер — ещё одна система в эксплуатации: её нужно мониторить, резервировать и обновлять. Поэтому берётся тот брокер, который уже работает в банке; второй тип — дополнительные расходы.</p>"
  },
  manba: []
},

"ti.yangi-brend": {
  yorliq: "Jamoa rahbarlari uchun",
  sarlavha: "Yangi brendni ulash: ish rejasi",
  tana: "<table><tr><th>Bosqich</th><th>Nima qilinadi</th><th>Kun</th></tr>" +
    "<tr><td>Hujjat va sinov qurilmasi</td><td>API hujjati, bitta namuna qurilma stolda</td><td class='n'>2&ndash;3</td></tr>" +
    "<tr><td>Hodisa va kadr</td><td>Obuna, normallashtirish, kadr olish</td><td class='n'>4&ndash;6</td></tr>" +
    "<tr><td>Buyruq va video</td><td>PTZ, rele, RTSP media shlyuzga</td><td class='n'>3&ndash;5</td></tr>" +
    "<tr><td>Nosozlik sinovlari</td><td>Uzilish, past batareya, adashgan soat, ikki hodisa birga</td><td class='n'>4&ndash;6</td></tr>" +
    "<tr><td>Pilotda ish</td><td>O'nta obyektda bir hafta kuzatuv</td><td class='n'>7</td></tr></table>" +
    "<p>Jami 20&ndash;27 kun, ya'ni 3&ndash;4 hafta. Hujjati yo'q yoki yopiq bulutga bog'langan brendda bu muddat ikki barobar oshadi va ba'zan umuman imkonsiz bo'ladi.</p>" +
    "<p class='ogoh'>Shuning uchun xarid qilishdan oldin uchta savol beriladi: API hujjati bormi, bulutsiz ishlaydimi, hodisani qanday yuboradi. Javoblar shartnomaga ilova qilinadi.</p>",
  ru: {
    yorliq: "Для тимлида",
    sarlavha: "Подключение нового бренда: план работ",
    tana: "<table><tr><th>Этап</th><th>Что делается</th><th>Дней</th></tr>" +
      "<tr><td>Документация и образец</td><td>Описание API, одно устройство на столе</td><td class='n'>2&ndash;3</td></tr>" +
      "<tr><td>События и кадр</td><td>Подписка, нормализация, получение кадра</td><td class='n'>4&ndash;6</td></tr>" +
      "<tr><td>Команды и видео</td><td>PTZ, реле, RTSP в медиашлюз</td><td class='n'>3&ndash;5</td></tr>" +
      "<tr><td>Испытания на отказ</td><td>Обрыв, низкая батарея, сбитые часы, два события сразу</td><td class='n'>4&ndash;6</td></tr>" +
      "<tr><td>Работа на пилоте</td><td>Неделя наблюдения на десяти объектах</td><td class='n'>7</td></tr></table>" +
      "<p>Итого 20&ndash;27 дней, то есть 3&ndash;4 недели. У бренда без документации или с жёсткой привязкой к закрытому облаку срок удваивается, а иногда задача становится нерешаемой.</p>" +
      "<p class='ogoh'>Поэтому до закупки задаются три вопроса: есть ли документация на API, работает ли без облака, как отдаёт события. Ответы прикладываются к договору.</p>"
  },
  manba: []
},

"ti.qabul-sharti": {
  yorliq: "Jamoa rahbarlari uchun",
  sarlavha: "Qabul sinovlari: aniq nima o'lchanadi",
  tana: "<table><tr><th>Ko'rsatkich</th><th>Qanday o'lchanadi</th><th>Chegara</th></tr>" +
    "<tr><td>Yo'qolgan hodisa</td><td>100 ta sun'iy hodisa yuboriladi</td><td class='n'>0</td></tr>" +
    "<tr><td>Takror</td><td>Shu 100 tadan nechtasi ikki marta kelgan</td><td class='n'>&le; 5%</td></tr>" +
    "<tr><td>Kechikish</td><td>Qurilma vaqti va qabul vaqti farqi, mediana</td><td class='n'>&le; 3 s</td></tr>" +
    "<tr><td>Uzilishdan tiklanish</td><td>Kabel uzib qo'yiladi va ulanadi</td><td class='n'>&le; 2 daqiqa</td></tr>" +
    "<tr><td>Buyruq javobi</td><td>50 ta rele buyrug'i</td><td class='n'>100% javob</td></tr></table>" +
    "<h4>Bir haftalik pilot sinovi</h4>" +
    "<p>Stol sinovlaridan o'tgan adapter o'nta obyektda bir hafta ishlaydi. Shu hafta ichida bitta ham yo'qolgan hodisa bo'lmasligi va navbatning o'sib ketmasligi talab qilinadi. Shundan keyingina adapter qolgan obyektlarga tarqatiladi.</p>",
  ru: {
    yorliq: "Для тимлида",
    sarlavha: "Приёмочные испытания: что именно измеряется",
    tana: "<table><tr><th>Показатель</th><th>Как измеряется</th><th>Порог</th></tr>" +
      "<tr><td>Потерянные события</td><td>Отправляются 100 искусственных событий</td><td class='n'>0</td></tr>" +
      "<tr><td>Повторы</td><td>Сколько из этих 100 пришли дважды</td><td class='n'>&le; 5%</td></tr>" +
      "<tr><td>Задержка</td><td>Медиана разницы времени устройства и приёма</td><td class='n'>&le; 3 с</td></tr>" +
      "<tr><td>Восстановление после обрыва</td><td>Кабель выдёргивается и возвращается</td><td class='n'>&le; 2 минуты</td></tr>" +
      "<tr><td>Ответ на команду</td><td>50 команд на реле</td><td class='n'>100% ответов</td></tr></table>" +
      "<h4>Недельная проверка на пилоте</h4>" +
      "<p>Прошедший стендовые тесты адаптер неделю работает на десяти объектах. За эту неделю не должно быть ни одного потерянного события и роста очереди. Только после этого адаптер раскатывается на остальные объекты.</p>"
  },
  manba: []
},

"ti.b-aloqa": {
  yorliq: "Servis uchun",
  sarlavha: "Aloqa uzilishi: eng ko'p uchraydigan nosozlik",
  tana: "<p>Uzilishning sabablari bir xil emas va ularning har biriga boshqa javob beriladi.</p>" +
    "<table><tr><th>Sabab</th><th>Belgisi</th><th>Javob</th></tr>" +
    "<tr><td>Bazaviy stansiya ta'mirda</td><td>Bir hududdagi bir necha obyekt birga yo'qoldi</td><td>Ikkinchi SIM ga o'tish, operatorga murojaat</td></tr>" +
    "<tr><td>SIM balansi tugadi</td><td>Bitta obyekt, tarmoq ko'rinadi</td><td>To'lov, reyestrdagi sanani tuzatish</td></tr>" +
    "<tr><td>Antenna yoki kabel</td><td>Signal asta-sekin pasaygan</td><td>Servis chiqishi</td></tr>" +
    "<tr><td>Quvvat tugadi</td><td>Batareya oldindan pasayib borgan</td><td>Panel va akkumulyatorni tekshirish</td></tr></table>" +
    "<h4>Uzilish paytida nima ishlaydi</h4>" +
    "<p>Kamera yozishni davom ettiradi, shlyuz hodisalarni navbatga yozadi. Aloqa tiklangach, navbat darhol bo'shamaydi: shlyuz 0 dan 120 soniyagacha tasodifiy kutadi va soniyasiga beshta hodisa yuboradi, aks holda butun hudud bir vaqtda ulanib markazni bosib qoladi. 5 daqiqadan eski hodisalar kechikkan belgisi bilan alohida ro'yxatga tushadi &mdash; ular jonli signal emas.</p>" +
    "<p class='ogoh'>Puls davri qurilma turiga qarab boshqacha: elektr bilan ta'minlangan tugun 60 soniyada, batareyali kamera 15 daqiqada xabar beradi. Shuning uchun aloqasizlikni e'lon qilish muddati ham har xil: 15 va 45 daqiqa.</p>",
  ru: {
    yorliq: "Для сервиса",
    sarlavha: "Обрыв связи: самый частый отказ",
    tana: "<p>Причины обрыва разные, и ответ на каждую свой.</p>" +
      "<table><tr><th>Причина</th><th>Признак</th><th>Ответ</th></tr>" +
      "<tr><td>Базовая станция в ремонте</td><td>Несколько объектов одного района пропали разом</td><td>Переход на вторую SIM, обращение к оператору</td></tr>" +
      "<tr><td>Кончился баланс SIM</td><td>Один объект, сеть при этом есть</td><td>Платёж, исправление даты в реестре</td></tr>" +
      "<tr><td>Антенна или кабель</td><td>Сигнал падал постепенно</td><td>Выезд сервиса</td></tr>" +
      "<tr><td>Кончилось питание</td><td>Батарея снижалась заранее</td><td>Проверка панели и аккумулятора</td></tr></table>" +
      "<h4>Что работает во время обрыва</h4>" +
      "<p>Камера продолжает писать, шлюз складывает события в очередь. После восстановления очередь выгружается не залпом: шлюз ждёт случайные 0–120 секунд и отдаёт по пять событий в секунду, иначе целый регион подключится одновременно и накроет центр. События старше пяти минут попадают в отдельный список с пометкой «запоздало» — это не живая тревога.</p>" +
      "<p class='ogoh'>Период импульса зависит от типа устройства: узел с электропитанием отчитывается раз в 60 секунд, батарейная камера — раз в 15 минут. Поэтому и срок объявления потери связи разный: 15 и 45 минут.</p>"
  },
  manba: []
},

"ti.b-batareya": {
  yorliq: "Servis uchun",
  sarlavha: "Batareya: o'lim belgilari uch hafta oldin ko'rinadi",
  tana: "<p>Akkumulyator to'satdan o'lmaydi. Telemetriya grafigida uchta belgi ketma-ket paydo bo'ladi.</p>" +
    "<ol><li><b>Kunduzgi zaryad to'liq tiklanmaydi.</b> Panel changlagan, soya tushgan yoki ulanish oksidlangan.</li>" +
    "<li><b>Tungi pasayish tezlashadi.</b> Sovuqda ichki qarshilik oshadi, sig'im kamayadi.</li>" +
    "<li><b>Kunlik amplituda torayadi.</b> Akkumulyator sig'imini yo'qotgan: almashtirish kerak.</li></ol>" +
    "<h4>Chegaralar va amallar</h4>" +
    "<table><tr><th>Zaryad</th><th>Nima bo'ladi</th></tr>" +
    "<tr><td>30%</td><td>Servis arizasi ochiladi, marshrutga qo'shiladi</td></tr>" +
    "<tr><td>20%</td><td>Jonli video o'chadi, nazorat indeksi tushadi</td></tr>" +
    "<tr><td>10%</td><td>Faqat signal hodisalari yuboriladi</td></tr>" +
    "<tr><td>5%</td><td>Qurilma o'chadi, yozuv SD kartada qoladi</td></tr></table>" +
    "<p class='ogoh'>LiFePO4 akkumulyator 0 &deg;C dan past haroratda zaryadlanmaydi. Past haroratli himoyali BMS olinadi, aks holda dekabrda panel quyoshda ishlaydi, akkumulyator esa zaryad olmaydi.</p>",
  ru: {
    yorliq: "Для сервиса",
    sarlavha: "Батарея: признаки смерти видны за три недели",
    tana: "<p>Аккумулятор не умирает внезапно. На графике телеметрии последовательно появляются три признака.</p>" +
      "<ol><li><b>Дневной заряд не восстанавливается полностью.</b> Панель запылилась, попала в тень или окислился контакт.</li>" +
      "<li><b>Ночное падение ускоряется.</b> На холоде растёт внутреннее сопротивление, ёмкость снижается.</li>" +
      "<li><b>Суточная амплитуда сужается.</b> Аккумулятор потерял ёмкость: пора менять.</li></ol>" +
      "<h4>Пороги и действия</h4>" +
      "<table><tr><th>Заряд</th><th>Что происходит</th></tr>" +
      "<tr><td>30%</td><td>Открывается сервисная заявка, объект ставится в маршрут</td></tr>" +
      "<tr><td>20%</td><td>Отключается живое видео, снижается индекс контроля</td></tr>" +
      "<tr><td>10%</td><td>Отправляются только тревожные события</td></tr>" +
      "<tr><td>5%</td><td>Устройство выключается, запись остаётся на SD-карте</td></tr></table>" +
      "<p class='ogoh'>LiFePO4 не заряжается при температуре ниже 0 &deg;C. Берётся BMS с низкотемпературной защитой, иначе в декабре панель работает на солнце, а аккумулятор заряд не принимает.</p>"
  },
  manba: []
},

"ti.b-yolgon": {
  yorliq: "Xavfsizlik uchun",
  sarlavha: "Yolg'on signal: sabablari va davosi",
  tana: "<table><tr><th>Sabab</th><th>Qachon</th><th>Davosi</th></tr>" +
    "<tr><td>Hayvon</td><td>Tunda, past balandlikda</td><td>Zonani ko'tarish, sinf filtri</td></tr>" +
    "<tr><td>Shamolda shox</td><td>Kuz va bahor</td><td>Zonani kesish, shoxni kesish</td></tr>" +
    "<tr><td>Faralar yorug'i</td><td>Yo'lga qaragan kamera</td><td>Burchakni o'zgartirish, zonani kesish</td></tr>" +
    "<tr><td>Yomg'ir va qor IR yoritgichda</td><td>Tunda, yog'ingarchilikda</td><td>Yoritgich quvvatini pasaytirish, kozirek</td></tr>" +
    "<tr><td>O'rgimchak to'ri</td><td>Yozda, linza oldida</td><td>Profilaktik tozalash</td></tr></table>" +
    "<h4>Nega bu shunchaki bezovtalik emas</h4>" +
    "<p>Oyiga to'rttadan ortiq yolg'on signal olgan navbatchi xabarnomalarni jiddiy qabul qilmay qo'yadi. Shundan keyin haqiqiy hodisa ham e'tibordan chetda qoladi. Shuning uchun yolg'on signal soni pilotning darvoza ko'rsatkichlaridan biri.</p>" +
    "<p>Har yolg'on signal sababi bilan yopiladi va haftalik hisobotda kamera bo'yicha guruhlanadi. Ro'yxatning birinchi uchtasi keyingi servis chiqishida sozlanadi.</p>",
  ru: {
    yorliq: "Для безопасности",
    sarlavha: "Ложная тревога: причины и лечение",
    tana: "<table><tr><th>Причина</th><th>Когда</th><th>Лечение</th></tr>" +
      "<tr><td>Животное</td><td>Ночью, при низкой установке</td><td>Поднять зону, фильтр по классу</td></tr>" +
      "<tr><td>Ветка на ветру</td><td>Осень и весна</td><td>Обрезать зону, обрезать ветку</td></tr>" +
      "<tr><td>Свет фар</td><td>Камера смотрит на дорогу</td><td>Изменить угол, обрезать зону</td></tr>" +
      "<tr><td>Дождь и снег в ИК-подсветке</td><td>Ночью, в осадки</td><td>Снизить мощность подсветки, козырёк</td></tr>" +
      "<tr><td>Паутина</td><td>Летом, перед линзой</td><td>Профилактическая чистка</td></tr></table>" +
      "<h4>Почему это не просто неудобство</h4>" +
      "<p>Дежурный, получающий больше четырёх ложных тревог в месяц, перестаёт относиться к уведомлениям серьёзно. После этого пропускается и настоящее событие. Поэтому число ложных тревог — один из пороговых показателей пилота.</p>" +
      "<p>Каждая ложная тревога закрывается с указанием причины и группируется по камерам в недельном отчёте. Первые три строки этого списка настраиваются при ближайшем выезде сервиса.</p>"
  },
  manba: []
},

"ti.ogoh-sukut": {
  yorliq: "Xavfsizlik uchun",
  sarlavha: "Sukut nazorati: signal yo'qligi ham hodisa",
  tana: "<p>Kamera o'chirilgan, kabeli uzilgan yoki batareyasi tugagan obyekt hech qanday signal bermaydi. Faqat hodisalarni kuzatadigan tizim buni ko'rmaydi.</p>" +
    "<h4>Qanday tekshiriladi</h4>" +
    "<ul><li>Har qurilmadan puls kutiladi: elektrli tugun 60 soniyada, batareyali qurilma 15 daqiqada.</li>" +
    "<li>Kutilgan vaqtda puls kelmasa, tizimning o'zi voqea yaratadi &mdash; huddi signal kelgandek.</li>" +
    "<li>Voqeaning muddati ham shunday: 5 daqiqa ichida navbatchi ko'rishi kerak.</li></ul>" +
    "<h4>Nima bilan farq qiladi</h4>" +
    "<p>Bosqin signalidan farqli o'laroq, sukut voqeasi tunda telefonni jiringlatmaydi: u navbatchining ekranidagi ro'yxatga tushadi va ertalab servis arizasiga aylanadi. Faqat bir hududdagi bir necha obyekt birga yo'qolsa, bu darhol yuqori darajaga ko'tariladi.</p>" +
    "<p class='ogoh'>Aynan shu qoida qurilmani ataylab o'chirib qo'yishdan himoya qiladi: o'chirilgan kamera &mdash; ko'rinadigan hodisa.</p>",
  ru: {
    yorliq: "Для безопасности",
    sarlavha: "Контроль тишины: отсутствие сигнала — тоже событие",
    tana: "<p>Объект с выключенной камерой, перерезанным кабелем или севшей батареей не даёт никаких сигналов. Система, следящая только за событиями, этого не заметит.</p>" +
      "<h4>Как проверяется</h4>" +
      "<ul><li>От каждого устройства ждут импульс: узел с питанием — раз в 60 секунд, батарейное устройство — раз в 15 минут.</li>" +
      "<li>Если импульс не пришёл вовремя, система сама создаёт инцидент — как при тревоге.</li>" +
      "<li>Срок тот же: дежурный должен увидеть его за пять минут.</li></ul>" +
      "<h4>Чем отличается</h4>" +
      "<p>В отличие от тревоги о проникновении, инцидент тишины не звонит ночью: он попадает в список на экране дежурного и утром превращается в сервисную заявку. Исключение — когда разом пропадают несколько объектов одного района: тогда эскалация немедленная.</p>" +
      "<p class='ogoh'>Именно это правило защищает от намеренного отключения устройства: выключенная камера — заметное событие.</p>"
  },
  manba: []
},

"ti.k-trafik": {
  yorliq: "Moliya va aloqa uchun",
  sarlavha: "Bir kunlik trafik: qayerdan yig'iladi",
  tana: "<table><tr><th>Manba</th><th>Hisob</th><th>Hajmi</th></tr>" +
    "<tr><td>Hodisa kadrlari</td><td>30 &times; 148 KB</td><td class='n'>4,4 MB</td></tr>" +
    "<tr><td>Jonli video</td><td>30 s &times; 512 kbit/s</td><td class='n'>1,9 MB</td></tr>" +
    "<tr><td>Talab bo'yicha klip</td><td>haftada bitta, 3,1 MB</td><td class='n'>0,4 MB</td></tr>" +
    "<tr><td>Puls va telemetriya</td><td>96 &times; 200 B</td><td class='n'>0,02 MB</td></tr>" +
    "<tr><td><b>Jami</b></td><td></td><td class='n'><b>6,8 MB</b></td></tr></table>" +
    "<p>Oyiga taxminan 0,2 GB &mdash; lekin bu hisob kuniga atigi 30 soniyalik jonli videoga qurilgan. Operator obyektni kuniga 30 daqiqa ochsa (tavsiya etilgan rejim), jonli video oyiga 3,5 GB qo'shadi va jami 4,3 GB chiqadi. SIM tarifi kattaroq raqamga olinadi: sarflanmagan trafik arzon, yetmagan trafik esa uzilish.</p>" +
    "<h4>Qachon bu raqam oshadi</h4>" +
    "<ul><li>Operator obyektni tez-tez ochsa: har daqiqa jonli video 3,8 MB qo'shadi.</li>" +
    "<li>Yolg'on signal ko'p bo'lsa: har ortiqcha hodisa 148 KB.</li>" +
    "<li>Sud yoki sug'urta ishi uchun arxiv yuklansa: bir soatlik yozuv 900 MB.</li></ul>",
  ru: {
    yorliq: "Для финансов и связи",
    sarlavha: "Суточный трафик: из чего складывается",
    tana: "<table><tr><th>Источник</th><th>Расчёт</th><th>Объём</th></tr>" +
      "<tr><td>Кадры событий</td><td>30 &times; 148 КБ</td><td class='n'>4,4 МБ</td></tr>" +
      "<tr><td>Живое видео</td><td>30 с &times; 512 кбит/с</td><td class='n'>1,9 МБ</td></tr>" +
      "<tr><td>Клип по запросу</td><td>один в неделю, 3,1 МБ</td><td class='n'>0,4 МБ</td></tr>" +
      "<tr><td>Импульсы и телеметрия</td><td>96 &times; 200 Б</td><td class='n'>0,02 МБ</td></tr>" +
      "<tr><td><b>Итого</b></td><td></td><td class='n'><b>6,8 МБ</b></td></tr></table>" +
      "<p>Около 0,2 ГБ в месяц &mdash; но этот расчёт построен всего на 30 секундах живого видео в сутки. Если оператор держит объект открытым 30 минут в сутки (рекомендуемый режим), живое видео добавляет 3,5 ГБ в месяц и в итоге выходит 4,3 ГБ. Тариф SIM берётся по большему числу: неизрасходованный трафик — не деньги, а нехватка трафика — это обрыв.</p>" +
      "<h4>Когда цифра вырастет</h4>" +
      "<ul><li>Оператор часто открывает объект: каждая минута живого видео добавляет 3,8 МБ.</li>" +
      "<li>Много ложных тревог: каждое лишнее событие — 148 КБ.</li>" +
      "<li>Выгрузка архива для суда или страховой: час записи — 900 МБ.</li></ul>"
  },
  manba: []
},

"ti.k-energiya": {
  yorliq: "Montajchilar uchun",
  sarlavha: "Dekabr kunidagi energiya balansi",
  tana: "<table><tr><th>Sarf</th><th>Hisob</th><th>Vt&middot;soat</th></tr>" +
    "<tr><td>Kutish rejimi</td><td>0,08 Vt &times; 24 soat</td><td class='n'>1,9</td></tr>" +
    "<tr><td>30 ta hodisa</td><td>40 s uyg'oq, 3,5 Vt</td><td class='n'>1,4</td></tr>" +
    "<tr><td>Puls va telemetriya</td><td>96 &times; 12 s, 2,0 Vt</td><td class='n'>0,7</td></tr>" +
    "<tr><td>Jonli video</td><td>30 s, 5,5 Vt</td><td class='n'>0,2</td></tr>" +
    "<tr><td><b>Jami</b></td><td></td><td class='n'><b>4,2</b></td></tr></table>" +
    "<h4>Nima balansni buzadi</h4>" +
    "<ul><li>Puls davrini 60 soniyaga tushirish: sarf ikki barobardan ko'proq oshadi. Shuning uchun batareyali qurilmada davr 15 daqiqa.</li>" +
    "<li>Kuniga 30 daqiqalik jonli video: qo'shimcha 2,8 Vt&middot;soat.</li>" +
    "<li>Sovuqda akkumulyator sig'imi 20&ndash;30% kamayadi &mdash; bu zaxiraning qisqarishi.</li></ul>" +
    "<p class='ogoh'>Panel va akkumulyator o'lchami dekabrdagi quyoshsiz kunlar ketma-ketligidan hisoblanadi. Hisob taqdimotning quvvat slaydida turadi.</p>",
  ru: {
    yorliq: "Для монтажников",
    sarlavha: "Энергобаланс декабрьских суток",
    tana: "<table><tr><th>Расход</th><th>Расчёт</th><th>Вт&middot;ч</th></tr>" +
      "<tr><td>Режим ожидания</td><td>0,08 Вт &times; 24 часа</td><td class='n'>1,9</td></tr>" +
      "<tr><td>30 событий</td><td>40 с активности, 3,5 Вт</td><td class='n'>1,4</td></tr>" +
      "<tr><td>Импульсы и телеметрия</td><td>96 &times; 12 с, 2,0 Вт</td><td class='n'>0,7</td></tr>" +
      "<tr><td>Живое видео</td><td>30 с, 5,5 Вт</td><td class='n'>0,2</td></tr>" +
      "<tr><td><b>Итого</b></td><td></td><td class='n'><b>4,2</b></td></tr></table>" +
      "<h4>Что ломает баланс</h4>" +
      "<ul><li>Снижение периода импульса до 60 секунд: расход вырастает больше чем вдвое. Поэтому у батарейных устройств период 15 минут.</li>" +
      "<li>30 минут живого видео в сутки: плюс 2,8 Вт&middot;ч.</li>" +
      "<li>На холоде ёмкость аккумулятора падает на 20&ndash;30% — это не расход, а сокращение запаса.</li></ul>" +
      "<p class='ogoh'>Размер панели и аккумулятора считается не от суточной цифры, а от череды пасмурных декабрьских дней. Расчёт приведён на слайде мощности в презентации.</p>"
  },
  manba: []
},

"ti.k-yozuv": {
  yorliq: "Jamoa rahbarlari uchun",
  sarlavha: "Bazaga nima yoziladi, nima yozilmaydi",
  tana: "<table><tr><th>Yozuv</th><th>Kuniga</th><th>Qayerda saqlanadi</th></tr>" +
    "<tr><td>Hodisa</td><td class='n'>30</td><td>PostgreSQL, 3 yil</td></tr>" +
    "<tr><td>Telemetriya</td><td class='n'>96</td><td>TimescaleDB, 7 kundan keyin siqiladi</td></tr>" +
    "<tr><td>Puls</td><td class='n'>&mdash;</td><td>Bazaga yozilmaydi: qurilma holatini yangilaydi</td></tr>" +
    "<tr><td>Operator amali</td><td class='n'>1&ndash;3</td><td>Jurnal, 5 yil</td></tr></table>" +
    "<h4>Nega puls yozilmaydi</h4>" +
    "<p>1 200 qurilmadan har daqiqada kelgan puls kuniga 1,7 million qator beradi va bazani hech qanday foydasiz o'stiradi. Uning yagona vazifasi &mdash; qurilmaning <code>last_seen</code> maydonini yangilash. Tarix uchun 15 daqiqalik telemetriya yetadi.</p>" +
    "<p>Dalil fayllari obyekt omborida yotadi: bazada faqat manzil va xesh saqlanadi. Bu bazani kichik va tez tutadi.</p>",
  ru: {
    yorliq: "Для тимлида",
    sarlavha: "Что пишется в базу, а что нет",
    tana: "<table><tr><th>Запись</th><th>В сутки</th><th>Где хранится</th></tr>" +
      "<tr><td>Событие</td><td class='n'>30</td><td>PostgreSQL, 3 года</td></tr>" +
      "<tr><td>Телеметрия</td><td class='n'>96</td><td>TimescaleDB, сжатие через 7 дней</td></tr>" +
      "<tr><td>Импульс</td><td class='n'>&mdash;</td><td>В базу не пишется: обновляет состояние устройства</td></tr>" +
      "<tr><td>Действие оператора</td><td class='n'>1&ndash;3</td><td>Журнал, 5 лет</td></tr></table>" +
      "<h4>Почему импульс не пишется</h4>" +
      "<p>Импульсы с 1 200 устройств раз в минуту дают 1,7 миллиона строк в сутки и бесполезно раздувают базу. Их единственная задача — обновить поле <code>last_seen</code>. Для истории достаточно телеметрии с шагом 15 минут.</p>" +
      "<p>Файлы доказательств лежат не в базе, а в объектном хранилище: в базе только адрес и хеш. Это держит базу маленькой и быстрой.</p>"
  },
  manba: [["TimescaleDB", "https://docs.timescale.com/"]]
},

"ti.xulosa": {
  yorliq: "Rahbariyat uchun",
  sarlavha: "Nega bu sxema doimiy keng kanalsiz ishlaydi",
  tana: "<p>An'anaviy videokuzatuv markazga uzluksiz oqim yuboradi va shuning uchun elektr, kabel va keng kanalni talab qiladi. Bu yerda boshqacha: markazga hodisa boradi, video esa so'ralganda.</p>" +
    "<table><tr><th></th><th>Doimiy oqim</th><th>Hodisa asosida</th></tr>" +
    "<tr><td>Bir obyekt, oyiga</td><td class='n'>160 GB</td><td class='n'>0,2 GB</td></tr>" +
    "<tr><td>Kanal</td><td>Simli internet</td><td>4G, hatto zaif signal</td></tr>" +
    "<tr><td>Quvvat</td><td>Doimiy 220 V</td><td>Quyosh va akkumulyator</td></tr>" +
    "<tr><td>Markaz diski, 90 kun</td><td class='n'>o'nlab TB</td><td class='n'>0,97 TB</td></tr></table>" +
    "<p>Bank balansidagi obyektlarning aksariyatida elektr ham, internet ham yo'q. Shuning uchun tanlov texnik did masalasi emas: doimiy oqimli sxema bu obyektlarda umuman ishlamaydi.</p>",
  ru: {
    yorliq: "Для правления",
    sarlavha: "Почему эта схема работает без постоянного широкого канала",
    tana: "<p>Классическое видеонаблюдение шлёт в центр непрерывный поток и потому требует электричества, кабеля и широкого канала. Здесь иначе: в центр идёт событие, видео — по запросу.</p>" +
      "<table><tr><th></th><th>Постоянный поток</th><th>По событиям</th></tr>" +
      "<tr><td>Один объект, в месяц</td><td class='n'>160 ГБ</td><td class='n'>0,2 ГБ</td></tr>" +
      "<tr><td>Канал</td><td>Проводной интернет</td><td>4G, даже слабый сигнал</td></tr>" +
      "<tr><td>Питание</td><td>Постоянные 220 В</td><td>Солнце и аккумулятор</td></tr>" +
      "<tr><td>Диск в центре, 90 дней</td><td class='n'>десятки ТБ</td><td class='n'>0,97 ТБ</td></tr></table>" +
      "<p>На большинстве объектов банковского баланса нет ни электричества, ни интернета. Поэтому выбор здесь — не вопрос технического вкуса: схема с постоянным потоком на этих объектах просто не работает.</p>"
  },
  manba: []
},

/* ---------- Tizim xaritasi: konturlar va oqimlar ---------- */

"ti.x-kontur-obyekt": {
  yorliq: "Kontur 1",
  sarlavha: "Obyekt konturi: elektr ham, internet ham, odam ham yo'q joyda nima ishlaydi",
  tana: "<p>Balansdagi 267 obyektning ko'pchiligi &mdash; tuman markazidan uzoqdagi ombor, tegirmon, sex va yer uchastkasi. Ular kredit bo'yicha o'tgan kunda elektr allaqachon uzilgan, shartnomasi bekor qilingan, qorovul ishdan bo'shagan. Shu sababli bu konturdagi hamma narsa uchta shartga bo'ysunadi: o'zining quvvati bilan ishlaydi, aloqasiz ham ishlaydi, kimdir borib tugmasini bosishini kutmaydi.</p>" +
    "<h4>Konturdan nima chiqadi va nima chiqmaydi</h4>" +
    "<table><tr><th>Chiqadi</th><th>Chiqmaydi</th></tr>" +
    "<tr><td>Hodisa yozuvi, 412 bayt JSON</td><td>Uzluksiz video oqimi</td></tr>" +
    "<tr><td>Bitta kadr, 148 KB</td><td>Kunlik to'liq arxiv</td></tr>" +
    "<tr><td>Puls va telemetriya: zaryad, RSRP, SD holati</td><td>Shaxsiy ma'lumot va yuz tasviri</td></tr>" +
    "<tr><td>Operator so'raganda &mdash; jonli sessiya</td><td>Xodim ismi, telefon raqami</td></tr></table>" +
    "<p>Arxiv obyektda qoladi. Buni tejamkorlik deb o'qish xato: aloqa uzilgan paytda ham dalil yo'qolmasligi kerak. NVR yoki SD karta joyida yozadi, markazga faqat ustidagi qatlam &mdash; nima bo'lgani haqidagi yozuv &mdash; ko'chadi.</p>" +
    "<h4>Bu konturda bank nimani boshqara olmaydi</h4>" +
    "<ul><li><b>Havo.</b> Dekabrda quyoshdan kuniga atigi 1,62 kVt&middot;soat/m&sup2; tushadi, qor panelni yopadi. Quvvat hisobi shu eng yomon oyga quriladi va zaxira 5 sutkaga olinadi.</li>" +
    "<li><b>Odam.</b> Qo'shni obyektdan kabel tortish, panelni burish, kamerani o'girish &mdash; hammasi uchraydi. Montaj varag'ida antivandal qutisi, tortish momenti va surat bilan qabul majburiy.</li>" +
    "<li><b>Masofa.</b> Chekka tumandagi obyektga brigada 5 ish kunigacha yetib boradi. Shuning uchun zaxira komplekt viloyat markazida saqlanadi, obyektda emas.</li></ul>" +
    "<p class='ogoh'>Konturning chegarasi shartnomada ham chizilgan: bu yerdagi jihoz yetkazuvchi kafolatida, montaj integrator zimmasida, elektr va aloqa esa bankning o'z hisobidan. Chegara aniq bo'lmasa, birinchi nosozlikdayoq uchala tomon bir-biriga ko'rsatadi.</p>",
  ru: {
    yorliq: "Контур 1",
    sarlavha: "Контур объекта: что работает там, где нет ни электричества, ни интернета, ни человека",
    tana: "<p>Большая часть из 267 объектов на балансе &mdash; склад, мельница, цех или участок далеко от райцентра. К моменту перехода по кредиту свет там уже отключён, договор расторгнут, сторож уволен. Поэтому всё в этом контуре подчинено трём условиям: работает на своей энергии, работает без связи, не ждёт, пока кто-то приедет и нажмёт кнопку.</p>" +
      "<h4>Что выходит из контура, а что нет</h4>" +
      "<table><tr><th>Выходит</th><th>Не выходит</th></tr>" +
      "<tr><td>Запись события, 412 байт JSON</td><td>Непрерывный видеопоток</td></tr>" +
      "<tr><td>Один кадр, 148 КБ</td><td>Полный суточный архив</td></tr>" +
      "<tr><td>Пульс и телеметрия: заряд, RSRP, состояние SD</td><td>Персональные данные и изображения лиц</td></tr>" +
      "<tr><td>Живая сессия &mdash; по запросу оператора</td><td>Имя сотрудника, номер телефона</td></tr></table>" +
      "<p>Архив остаётся на объекте. Это не экономия, а правило: доказательство не должно пропасть в момент обрыва связи. NVR или SD-карта пишут на месте, в центр уходит только верхний слой &mdash; запись о том, что произошло.</p>" +
      "<h4>Чем в этом контуре банк управлять не может</h4>" +
      "<ul><li><b>Погода.</b> В декабре приход солнца — всего 1,62 кВт&middot;ч/м&sup2; в сутки, снег закрывает панель. Энергорасчёт строится по этому худшему месяцу, запас берётся на 5 суток.</li>" +
      "<li><b>Человек.</b> Кабель к соседнему объекту, развёрнутая панель, повёрнутая камера &mdash; всё это встречается. В листе монтажа обязательны антивандальный бокс, момент затяжки и приёмка по фотографиям.</li>" +
      "<li><b>Расстояние.</b> До объекта в отдалённом районе бригада едет до 5 рабочих дней. Поэтому запасной комплект хранится в областном центре.</li></ul>" +
      "<p class='ogoh'>Граница контура прочерчена и в договоре: оборудование здесь на гарантии поставщика, монтаж &mdash; на интеграторе, электричество и связь &mdash; за счёт банка. Если граница размыта, при первой же неисправности все трое показывают друг на друга.</p>"
  },
  manba: []
},

"ti.x-kontur-operator": {
  yorliq: "Kontur 2",
  sarlavha: "Aloqa operatori tarmog'i: bankka tegishli emas, lekin javobgarligi shartnomada",
  tana: "<p>Qurilma bilan markaz o'rtasidagi yagona bo'g'in &mdash; uyali tarmoq. Uni bank sozlamaydi va ta'mirlamaydi, shuning uchun bu yerda shartnoma qarori ishlaydi.</p>" +
    "<h4>Shartnomaga aynan nima yoziladi</h4>" +
    "<table><tr><th>Band</th><th>Talab</th></tr>" +
    "<tr><td>APN</td><td>Yopiq, internetga chiqmaydigan. SIM o'g'irlansa ham boshqa hech qayerga ulanmaydi</td></tr>" +
    "<tr><td>Manzil</td><td>Doimiy ichki IP yoki tunnel, NAT ortidan kirish talab qilinmaydi</td></tr>" +
    "<tr><td>Tiklash muddati</td><td>24 soat, yakka obyekt uchun; 4 soat, bitta bazaviy stansiyada 10 dan ortiq obyekt uzilsa</td></tr>" +
    "<tr><td>Hisobot</td><td>Oylik uzilishlar jurnali, obyekt bo'yicha, bank tomonida tekshiriladi</td></tr>" +
    "<tr><td>Trafik</td><td>Kamerali obyektga oyiga 5 GB paket: 0,8 GB hodisa, 3,5 GB jonli video va zaxira. Ortiqchasi tarif ichida, jarimasiz</td></tr></table>" +
    "<h4>Nega ikkita operator</h4>" +
    "<p>Bitta operatorning viloyatdagi uzilishi o'nlab obyektni bir vaqtda ko'r qiladi. Modemda ikkita SIM turadi: asosiysi 3 marta ketma-ket ulanolmasa, ikkinchisiga o'tadi va 6 soatdan keyin asosiysini qayta sinaydi. Ikkinchi SIM oyiga taxminan 12 ming so'm turadi &mdash; bitta obyektga chiqishning narxidan yuz barobar arzon.</p>" +
    "<p><b>Imzolashdan oldin o'lchanadi.</b> Har bir obyektda montajdan oldin RSRP, SINR va uzluksiz 15 daqiqalik yuklash sinovi bajariladi, natija montaj varag'iga yoziladi. &minus;110 dBm dan past joyda tashqi antenna yoki mast kerak bo'ladi va bu smetaga oldindan kiritiladi &mdash; keyin emas.</p>" +
    "<p class='ogoh'>Operatorning &laquo;qamrov xaritasi&raquo; dalil emas. Xaritada yashil bo'lgan joyda ombor devori ichida signal umuman bo'lmasligi mumkin; o'lchov faqat qurilma turadigan nuqtada, o'sha balandlikda qilinadi.</p>",
  ru: {
    yorliq: "Контур 2",
    sarlavha: "Сеть оператора связи: банку не принадлежит, но ответственность прописана в договоре",
    tana: "<p>Единственное звено между устройством и центром &mdash; сотовая сеть. Банк её не настраивает и не чинит, поэтому здесь работает не техническое решение, а договорное.</p>" +
      "<h4>Что именно пишется в договор</h4>" +
      "<table><tr><th>Пункт</th><th>Требование</th></tr>" +
      "<tr><td>APN</td><td>Закрытый, без выхода в интернет. Даже украденная SIM никуда больше не подключится</td></tr>" +
      "<tr><td>Адресация</td><td>Постоянный внутренний IP или туннель, вход из-за NAT не требуется</td></tr>" +
      "<tr><td>Срок восстановления</td><td>24 часа для одиночного объекта; 4 часа, если на одной базовой станции отвалилось больше 10</td></tr>" +
      "<tr><td>Отчётность</td><td>Ежемесячный журнал обрывов по объектам, сверяется на стороне банка</td></tr>" +
      "<tr><td>Трафик</td><td>Пакет 5 ГБ в месяц на объект с камерой: 0,8 ГБ событий, 3,5 ГБ живого видео и запас. Превышение внутри тарифа, без штрафа</td></tr></table>" +
      "<h4>Зачем два оператора</h4>" +
      "<p>Один сбой оператора в области ослепляет десятки объектов одновременно. В модеме стоят две SIM: если основная три раза подряд не подключилась, модем уходит на вторую и через 6 часов пробует основную снова. Вторая SIM стоит около 12 тысяч сумов в месяц &mdash; в сто раз дешевле одного выезда на объект.</p>" +
      "<p><b>Измеряется до подписания.</b> На каждом объекте перед монтажом снимаются RSRP, SINR и 15-минутный тест непрерывной отдачи, результат заносится в лист монтажа. Ниже &minus;110 дБм нужна внешняя антенна или мачта &mdash; и это закладывается в смету заранее.</p>" +
      "<p class='ogoh'>&laquo;Карта покрытия&raquo; оператора доказательством не является. Там, где на карте зелено, внутри стен склада сигнала может не быть вовсе; замер делается только в той точке и на той высоте, где встанет устройство.</p>"
  },
  manba: []
},

"ti.x-kontur-bank": {
  yorliq: "Kontur 3",
  sarlavha: "Bank konturi: ma'lumot qayerda yotadi va unga kim tegadi",
  tana: "<p>Adapterdan boshlab hamma narsa bankning o'z perimetrida ishlaydi: virtual mashinalar bankning ma'lumot markazida, baza bankning disklarida, zaxira nusxa bankning arxivida. Bulutli xizmat ham, yetkazuvchining serveri ham bu yerda ishtirok etmaydi.</p>" +
    "<h4>Segmentlar va ular orasidagi qoida</h4>" +
    "<table><tr><th>Segment</th><th>Nima turadi</th><th>Kim kiradi</th></tr>" +
    "<tr><td>DMZ</td><td>Shlyuz, qurilmalarning mTLS ulanishi</td><td>Hech kim; faqat qurilma sertifikati</td></tr>" +
    "<tr><td>Ilova</td><td>Adapter, shina, qoidalar, API</td><td>Ma'muriy tarmoqdan, ikkinchi omil bilan</td></tr>" +
    "<tr><td>Ma'lumot</td><td>Reyestr bazasi, jurnal, media</td><td>Faqat ilova segmentidan</td></tr>" +
    "<tr><td>Ish joyi</td><td>Panel va mobil ilova</td><td>AD hisobi, rol bo'yicha</td></tr></table>" +
    "<p>Segmentlar orasida faqat ro'yxatga olingan port va yo'nalish ochiladi. Qurilma hech qachon baza bilan bevosita gaplashmaydi: u shlyuzga keladi, undan narisiga faqat tekshirilgan yozuv o'tadi.</p>" +
    "<h4>Bank o'zi yuritadigan uchta ish</h4>" +
    "<ul><li><b>Sertifikat.</b> Har bir qurilmaning o'z mijoz sertifikati bor, amal muddati 2 yil. Almashtirish bosqichma-bosqich, haftasiga 40 obyektdan, aks holda bir kunda yuzta obyekt uzilib qoladi.</li>" +
    "<li><b>Zaxira.</b> Baza har kuni, media haftasiga. Sinalmagan zaxira mavjud emas: chorakda bir marta boshqa serverga tiklab ko'riladi va natija akt bilan qayd etiladi.</li>" +
    "<li><b>Jurnal.</b> Kim qaysi obyektni ko'rgani, qaysi videoni so'ragani, qaysi buyruqni yuborgani o'zgartirib bo'lmaydigan jurnalga yoziladi va 5 yil saqlanadi.</li></ul>" +
    "<p class='ogoh'>Ma'lumot mamlakat ichida saqlanishi qonun talabi. Shuning uchun xaritada bu kontur alohida chizilgan: undan tashqariga faqat bankning o'zi ruxsat bergan eksport chiqadi.</p>",
  ru: {
    yorliq: "Контур 3",
    sarlavha: "Контур банка: где лежат данные и кто к ним прикасается",
    tana: "<p>Начиная с адаптера всё работает внутри собственного периметра банка: виртуальные машины в ЦОД банка, база на дисках банка, резервные копии в архиве банка. Ни облачный сервис, ни сервер поставщика здесь не участвуют.</p>" +
      "<h4>Сегменты и правило между ними</h4>" +
      "<table><tr><th>Сегмент</th><th>Что стоит</th><th>Кто входит</th></tr>" +
      "<tr><td>DMZ</td><td>Шлюз, mTLS-подключения устройств</td><td>Никто; только сертификат устройства</td></tr>" +
      "<tr><td>Приложение</td><td>Адаптер, шина, правила, API</td><td>Из административной сети, со вторым фактором</td></tr>" +
      "<tr><td>Данные</td><td>База реестра, журнал, медиа</td><td>Только из сегмента приложения</td></tr>" +
      "<tr><td>Рабочее место</td><td>Панель и мобильное приложение</td><td>Учётная запись AD, по роли</td></tr></table>" +
      "<p>Между сегментами открыты только перечисленные порты и направления. Устройство никогда не разговаривает с базой напрямую: оно приходит на шлюз, дальше проходит только проверенная запись.</p>" +
      "<h4>Три работы, которые банк ведёт сам</h4>" +
      "<ul><li><b>Сертификаты.</b> У каждого устройства свой клиентский сертификат сроком на 2 года. Замена идёт волнами, по 40 объектов в неделю, иначе за один день отвалится сотня.</li>" +
      "<li><b>Резервные копии.</b> База ежедневно, медиа еженедельно. Непроверенной копии не существует: раз в квартал восстановление на другой сервер с оформлением акта.</li>" +
      "<li><b>Журнал.</b> Кто какой объект смотрел, какое видео запрашивал, какую команду отправил &mdash; пишется в неизменяемый журнал и хранится 5 лет.</li></ul>" +
      "<p class='ogoh'>Хранение данных внутри страны &mdash; не выбор, а требование. Поэтому на карте этот контур выделен отдельно: наружу уходит только тот экспорт, который банк разрешил сам.</p>"
  },
  manba: []
},

"ti.x-oqim-yuqori": {
  yorliq: "Oqim 1",
  sarlavha: "Hodisa va telemetriya: pastdan yuqoriga, yo'qolishsiz",
  tana: "<p>Bu oqim doim bitta yo'nalishda yuradi &mdash; qurilmadan markazga. Uning ikkita turi bor va ularni aralashtirmaslik kerak: hodisa (nimadir sodir bo'ldi) va telemetriya (qurilma o'zi haqida xabar beradi).</p>" +
    "<h4>Nima va qancha</h4>" +
    "<table><tr><th>Yozuv</th><th>Hajmi</th><th>Qanchada bir</th></tr>" +
    "<tr><td>Hodisa, JSON</td><td>412 bayt</td><td>Sodir bo'lganda</td></tr>" +
    "<tr><td>Hodisa kadri, JPEG</td><td>148 KB</td><td>Hodisa bilan birga</td></tr>" +
    "<tr><td>Puls, elektrli tugun</td><td>96 bayt</td><td>60 soniyada</td></tr>" +
    "<tr><td>Puls, batareyali qurilma</td><td>96 bayt</td><td>15 daqiqada</td></tr>" +
    "<tr><td>Telemetriya: zaryad, RSRP, harorat, SD holati</td><td>210 bayt</td><td>Soatiga</td></tr></table>" +
    "<p>Shu oqimning &mdash; hodisa va telemetriyaning &mdash; bir obyektdagi dekabr trafigi 240&ndash;300 MB. Uning 90 foizdan ko'pi hodisa kadrlariga ketadi, qolgani puls va telemetriya. Jonli video bu oqimga kirmaydi: u alohida kanal va operator obyektni kuniga 30 daqiqa ochsa, oyiga yana 3,5 GB qo'shadi.</p>" +
    "<h4>Yo'qolmasligi qanday ta'minlanadi</h4>" +
    "<ul><li><b>Navbat pastda.</b> Aloqa uzilsa, shlyuz hodisalarni o'z xotirasida 72 soat saqlaydi va tiklanganda tartib bilan yuboradi.</li>" +
    "<li><b>Kamida bir marta.</b> Qurilma javob olmaguncha qayta yuboradi, shuning uchun takror kelishi mumkin. Har yozuvda qurilma bergan <code>hodisa_id</code> turadi; adapter shu kalit bo'yicha takrorni tashlaydi.</li>" +
    "<li><b>Tartib buzilishi.</b> Uzilgan obyektdan hodisalar kechikib keladi va boshqalaridan keyin tushadi. Shuning uchun saralash qurilma soati bo'yicha bajariladi, soat farqi esa alohida maydonda saqlanadi.</li>" +
    "<li><b>Bosim.</b> Bitta obyekt soatiga 200 dan ortiq hodisa yubora boshlasa, u &laquo;sozlash kerak&raquo; ro'yxatiga tushadi va oqimi cheklanadi &mdash; aks holda bitta nosoz kamera butun navbatni to'sib qo'yadi.</li></ul>" +
    "<p class='ogoh'>Signal kelmasligi ham hodisa. Uch marta puls kelmasa, tizim &laquo;aloqada emas&raquo; voqeasini ochadi. Shuning uchun bu oqimning qiymati uzluksizligida.</p>",
  ru: {
    yorliq: "Поток 1",
    sarlavha: "События и телеметрия: снизу вверх, без потерь",
    tana: "<p>Этот поток всегда идёт в одну сторону &mdash; от устройства в центр. В нём два типа записей, и смешивать их нельзя: событие (что-то произошло) и телеметрия (устройство отчитывается о себе).</p>" +
      "<h4>Что и сколько</h4>" +
      "<table><tr><th>Запись</th><th>Размер</th><th>Как часто</th></tr>" +
      "<tr><td>Событие, JSON</td><td>412 байт</td><td>По факту</td></tr>" +
      "<tr><td>Кадр события, JPEG</td><td>148 КБ</td><td>Вместе с событием</td></tr>" +
      "<tr><td>Пульс, узел с питанием</td><td>96 байт</td><td>Раз в 60 секунд</td></tr>" +
      "<tr><td>Пульс, батарейное устройство</td><td>96 байт</td><td>Раз в 15 минут</td></tr>" +
      "<tr><td>Телеметрия: заряд, RSRP, температура, состояние SD</td><td>210 байт</td><td>Раз в час</td></tr></table>" +
      "<p>Декабрьский трафик именно этого потока &mdash; событий и телеметрии &mdash; составляет 240&ndash;300 МБ на объект. Больше 90 процентов приходится на кадры событий, остальное &mdash; пульс и телеметрия. Живое видео в этот поток не входит: это отдельный канал, и при 30 минутах просмотра в сутки он добавляет ещё 3,5 ГБ в месяц.</p>" +
      "<h4>Как обеспечивается сохранность</h4>" +
      "<ul><li><b>Очередь внизу.</b> При обрыве шлюз держит события в своей памяти 72 часа и после восстановления отдаёт их по порядку.</li>" +
      "<li><b>Не менее одного раза.</b> Устройство повторяет отправку, пока не получит ответ, поэтому дубли возможны. В каждой записи есть <code>hodisa_id</code>, присвоенный устройством; по этому ключу адаптер гасит повтор.</li>" +
      "<li><b>Нарушение порядка.</b> С отключённого объекта события приходят с опозданием, позже остальных. Поэтому сортировка идёт не по времени приёма, а по часам устройства, а расхождение часов хранится отдельным полем.</li>" +
      "<li><b>Давление.</b> Если объект начинает слать больше 200 событий в час, он попадает в список &laquo;требует настройки&raquo;, а его поток ограничивается &mdash; иначе одна неисправная камера забьёт всю очередь.</li></ul>" +
      "<p class='ogoh'>Отсутствие сигнала &mdash; тоже событие. После трёх пропущенных пульсов система открывает инцидент &laquo;нет связи&raquo;. Ценность этого потока не в событиях, а в его непрерывности.</p>"
  },
  manba: []
},

"ti.x-oqim-past": {
  yorliq: "Oqim 2",
  sarlavha: "Buyruq va sozlama: yuqoridan pastga, har biri jurnalda",
  tana: "<p>Pastga tushadigan har bir narsa obyektdagi jihozning xulqini o'zgartiradi, shuning uchun bu oqimning qoidasi qattiqroq: imzolangan, jurnalga yozilgan va qaytarib olinadigan bo'lishi shart.</p>" +
    "<h4>Qanday buyruqlar bor</h4>" +
    "<table><tr><th>Buyruq</th><th>Kim beradi</th><th>Qanday bajariladi</th></tr>" +
    "<tr><td>Jonli sessiyani ochish</td><td>Navbatchi operator</td><td>Darhol, token 10 daqiqa amal qiladi</td></tr>" +
    "<tr><td>Sezish zonasi va chegarani o'zgartirish</td><td>Servis muhandisi</td><td>Navbatda, qurilma uyg'onganda</td></tr>" +
    "<tr><td>Soatni to'g'rilash</td><td>Tizim, avtomatik</td><td>Har ulanishda, farq 2 daqiqadan oshsa</td></tr>" +
    "<tr><td>Proshivkani yangilash</td><td>Bank jamoasi</td><td>Ish kunida, bosqichma-bosqich, orqaga qaytarish bilan</td></tr>" +
    "<tr><td>Sertifikatni almashtirish</td><td>Bank jamoasi</td><td>Haftasiga 40 obyekt, eskisi 14 kun ishlaydi</td></tr></table>" +
    "<h4>Uchta qoida</h4>" +
    "<ul><li><b>Sukut bilan bajarilmaydi.</b> Har bir buyruq kim, qachon va nima uchun berganini yozib qoldiradi. Videoni ochish ham buyruq: kim ko'rgani jurnalda qoladi.</li>" +
    "<li><b>Ommaviy buyruq ikki imzo bilan.</b> 20 dan ortiq obyektga tegadigan har qanday o'zgarish ikkinchi xodim tasdig'isiz ketmaydi. Bitta noto'g'ri sozlama yuzlab obyektni bir vaqtda ko'r qilishi mumkin.</li>" +
    "<li><b>Bosqichma-bosqich.</b> Proshivka avval 5 obyektda, keyin 40 da, keyin qolganida. Har bosqichdan keyin 48 soat kuzatiladi: puls chastotasi, batareya sarfi va yolg'on signal soni solishtiriladi.</li></ul>" +
    "<p>Batareyali qurilma doim uxlab yotgani uchun buyruq darhol yetmaydi: u navbatda turadi va qurilma keyingi ulanishida oladi. Operator ekranda &laquo;navbatda&raquo; holatini ko'radi va buyruq yo'qolgan deb o'ylamaydi.</p>" +
    "<p class='ogoh'>Bu oqimni yetkazuvchiga ochib bo'lmaydi. Masofadan sozlash huquqi faqat bank jamoasida qoladi; yetkazuvchi kerak bo'lsa, unga vaqtincha va jurnalga yoziladigan kirish beriladi.</p>",
  ru: {
    yorliq: "Поток 2",
    sarlavha: "Команды и настройки: сверху вниз, каждая в журнале",
    tana: "<p>Всё, что идёт вниз, меняет поведение оборудования на объекте, поэтому правило здесь жёстче: команда должна быть подписана, записана в журнал и обратима.</p>" +
      "<h4>Какие бывают команды</h4>" +
      "<table><tr><th>Команда</th><th>Кто отдаёт</th><th>Как исполняется</th></tr>" +
      "<tr><td>Открыть живую сессию</td><td>Дежурный оператор</td><td>Сразу, токен действует 10 минут</td></tr>" +
      "<tr><td>Изменить зону детекции и порог</td><td>Сервисный инженер</td><td>Из очереди, при пробуждении устройства</td></tr>" +
      "<tr><td>Выровнять часы</td><td>Система, автоматически</td><td>При каждом подключении, если расхождение больше 2 минут</td></tr>" +
      "<tr><td>Обновить прошивку</td><td>Команда банка</td><td>В рабочий день, волнами, с откатом</td></tr>" +
      "<tr><td>Заменить сертификат</td><td>Команда банка</td><td>По 40 объектов в неделю, старый живёт 14 дней</td></tr></table>" +
      "<h4>Три правила</h4>" +
      "<ul><li><b>Молча не исполняется.</b> Каждая команда оставляет след: кто, когда и зачем. Открытие видео &mdash; тоже команда: кто смотрел, остаётся в журнале.</li>" +
      "<li><b>Массовая команда &mdash; в две подписи.</b> Любое изменение, затрагивающее больше 20 объектов, не уходит без подтверждения второго сотрудника. Одна неверная настройка способна ослепить сотни объектов разом.</li>" +
      "<li><b>Волнами.</b> Прошивка сначала на 5 объектах, затем на 40, затем на остальных. После каждой волны 48 часов наблюдения: частота пульса, расход батареи и число ложных срабатываний сравниваются с прежними.</li></ul>" +
      "<p>Батарейное устройство спит, поэтому команда доходит не мгновенно: она ждёт в очереди и забирается при следующем подключении. Оператор видит на экране статус &laquo;в очереди&raquo; и не считает команду потерянной.</p>" +
      "<p class='ogoh'>Этот поток нельзя открывать поставщику. Право удалённой настройки остаётся у команды банка; поставщику при необходимости выдаётся временный доступ, который пишется в журнал.</p>"
  },
  manba: []
},

"ti.x-oqim-video": {
  yorliq: "Oqim 3",
  sarlavha: "Video: so'rov bo'yicha ochiladigan sessiya",
  tana: "<p>267 obyektdan uzluksiz video olish na kanal, na quvvat, na disk bo'yicha ko'tarilmaydi. Shu sababli video alohida oqim sifatida ishlaydi va faqat operator so'raganda ochiladi.</p>" +
    "<h4>Sessiya qanday ochiladi</h4>" +
    "<table><tr><th>Qadam</th><th>Nima bo'ladi</th><th>Vaqt</th></tr>" +
    "<tr><td>1</td><td>Operator hodisa kartochkasida &laquo;Jonli ko'rish&raquo; ni bosadi</td><td>&mdash;</td></tr>" +
    "<tr><td>2</td><td>Yadro qurilmaga uyg'onish buyrug'ini yuboradi va vaqtinchalik token beradi</td><td>0,4 s</td></tr>" +
    "<tr><td>3</td><td>Media shlyuz qurilma oqimini qabul qiladi va brauzerga WebRTC bilan uzatadi</td><td>3,6 s</td></tr>" +
    "<tr><td>4</td><td>Token 10 daqiqada kuchini yo'qotadi, sessiya avtomatik yopiladi</td><td>10 daq</td></tr></table>" +
    "<p>Brauzer kameraga bevosita ulanmaydi: oradagi media shlyuz qurilmaning manzilini yashiradi va oqimga foydalanuvchi nomi bilan vaqt belgisini bosadi. Ekrandan olingan surat ham shu belgi bilan chiqadi.</p>" +
    "<h4>Narxi va cheklovlari</h4>" +
    "<ul><li>Bitta 5 daqiqalik sessiya 2 Mbit/s oqimda 75 MB trafik oladi &mdash; obyektning oylik limitining chorak qismi. Shuning uchun sessiya faqat hodisaga bog'liq holda ochiladi.</li>" +
    "<li>Batareyali kamerada jonli oqim quvvatni 12 barobar ko'p yeydi: 10 daqiqalik ko'rish dekabr zaxirasidan taxminan yarim soatlik ishni oladi.</li>" +
    "<li>Zaryad 20 foizdan tushganda jonli ko'rish o'chadi va tugma ekranda faolsiz bo'lib qoladi. Bu himoya ishlagani: yozuv davom etadi.</li></ul>" +
    "<p><b>Arxiv ko'chmaydi.</b> Sud yoki tekshiruv uchun kerak bo'lsa, operator aniq oraliqni belgilab klip so'raydi; qurilma faqat shu bo'lakni yuklaydi. 3 MB lik klip bir daqiqada keladi, butun kunlik arxiv esa hech qachon markazga ko'chirilmaydi.</p>",
  ru: {
    yorliq: "Поток 3",
    sarlavha: "Видео: не постоянный поток, а сессия по запросу",
    tana: "<p>Непрерывное видео с 267 объектов не вытягивают ни канал, ни энергия, ни диски. Поэтому видео работает отдельным потоком и открывается только по запросу оператора.</p>" +
      "<h4>Как открывается сессия</h4>" +
      "<table><tr><th>Шаг</th><th>Что происходит</th><th>Время</th></tr>" +
      "<tr><td>1</td><td>Оператор нажимает &laquo;Живой просмотр&raquo; в карточке события</td><td>&mdash;</td></tr>" +
      "<tr><td>2</td><td>Ядро посылает устройству команду пробуждения и выдаёт временный токен</td><td>0,4 с</td></tr>" +
      "<tr><td>3</td><td>Медиашлюз принимает поток устройства и отдаёт в браузер по WebRTC</td><td>3,6 с</td></tr>" +
      "<tr><td>4</td><td>Через 10 минут токен теряет силу, сессия закрывается сама</td><td>10 мин</td></tr></table>" +
      "<p>Браузер не подключается к камере напрямую: медиашлюз между ними скрывает адрес устройства и накладывает на поток имя пользователя и метку времени. Снимок с экрана выходит с той же меткой.</p>" +
      "<h4>Цена и ограничения</h4>" +
      "<ul><li>Одна пятиминутная сессия при потоке 2 Мбит/с берёт 75 МБ &mdash; четверть месячного лимита объекта. Поэтому сессия открывается только в привязке к событию.</li>" +
      "<li>На батарейной камере живой поток тратит энергию в 12 раз быстрее: 10 минут просмотра забирают из декабрьского запаса около получаса работы.</li>" +
      "<li>Ниже 20 процентов заряда живой просмотр отключается, кнопка на экране становится неактивной. Это не сбой, а защита: запись при этом продолжается.</li></ul>" +
      "<p><b>Архив не переезжает.</b> Если запись нужна для суда или проверки, оператор указывает точный интервал и запрашивает клип; устройство отдаёт только этот фрагмент. Клип на 3 МБ приходит за минуту, а суточный архив в центр не копируется никогда.</p>"
  },
  manba: []
},

/* ---------- Adapter xaritasi: modul, chiqish, iste'molchilar ---------- */

"ti.x-adapter": {
  yorliq: "Adapter",
  sarlavha: "Adapter nima va u qayerda ishlaydi",
  tana: "<p>Adapter brendga bittadan kichik moduldan iborat. Har biri o'z jarayonida ishlaydi va faqat o'z brendini biladi. Hikvision moduli ishdan chiqsa, Ajax va Milesight oqimi buzilmaydi &mdash; bu shunday bo'lingan yagona sabab.</p>" +
    "<h4>Qayerda turadi</h4>" +
    "<table><tr><th>Savol</th><th>Javob</th></tr>" +
    "<tr><td>Joyi</td><td>Bank ma'lumot markazi, ilova segmenti</td></tr>" +
    "<tr><td>Nusxa soni</td><td>Har brendga 2 ta, bir-birini ko'tarib turadi</td></tr>" +
    "<tr><td>Bitta nusxa ko'taradi</td><td>200 obyekt yoki sekundiga 50 hodisa</td></tr>" +
    "<tr><td>Yangilash</td><td>Boshqasini to'xtatmasdan, birma-bir</td></tr>" +
    "<tr><td>Kuzatuv</td><td>Navbat uzunligi, rad etilgan yozuv, o'rtacha kechikish</td></tr></table>" +
    "<h4>Yangi brend qo'shilganda nima o'zgaradi</h4>" +
    "<p>Faqat yangi modul yoziladi. Yadro, baza, ekranlar va hisobotlar tegilmaydi &mdash; ular brend haqida umuman bilmaydi. Shu sababli beshinchi brendni ulash birinchisidan qiyin emas: ish hajmi hujjatning sifatiga bog'liq.</p>" +
    "<p class='ogoh'>Adapterning eng xavfli xatosi &mdash; sekin ishlash emas, jimgina yutib yuborish. Shuning uchun sxemadan o'tmagan yozuv tashlab yuborilmaydi: u karantin jadvaliga tushadi, ustida ogohlantirish yonadi va muhandis uni qo'lda ko'radi.</p>",
  ru: {
    yorliq: "Адаптер",
    sarlavha: "Что такое адаптер и где он работает",
    tana: "<p>Адаптер &mdash; не одна большая программа, а по маленькому модулю на бренд. Каждый работает в своём процессе и знает только свой бренд. Если модуль Hikvision упал, потоки Ajax и Milesight не страдают &mdash; ради этого разделение и сделано.</p>" +
      "<h4>Где стоит</h4>" +
      "<table><tr><th>Вопрос</th><th>Ответ</th></tr>" +
      "<tr><td>Место</td><td>ЦОД банка, сегмент приложений</td></tr>" +
      "<tr><td>Число экземпляров</td><td>По 2 на бренд, страхуют друг друга</td></tr>" +
      "<tr><td>Один экземпляр держит</td><td>200 объектов или 50 событий в секунду</td></tr>" +
      "<tr><td>Обновление</td><td>По одному, без остановки остальных</td></tr>" +
      "<tr><td>Наблюдение</td><td>Длина очереди, отклонённые записи, средняя задержка</td></tr></table>" +
      "<h4>Что меняется при добавлении бренда</h4>" +
      "<p>Пишется только новый модуль. Ядро, база, экраны и отчёты не трогаются &mdash; они о брендах вообще не знают. Поэтому пятый бренд подключается не тяжелее первого: объём работы зависит не от протокола, а от качества документации.</p>" +
      "<p class='ogoh'>Самая опасная ошибка адаптера &mdash; не медленная работа, а тихое проглатывание. Поэтому запись, не прошедшая схему, не выбрасывается: она попадает в карантинную таблицу, по ней загорается предупреждение, и инженер разбирает её руками.</p>"
  },
  manba: []
},

"ti.x-chiqish": {
  yorliq: "Chiqish",
  sarlavha: "Chiqishdagi yozuv: nima brendga bog'liq emas",
  tana: "<p>Adapterdan chiqadigan yozuv hech qaysi brendning atamasini saqlamaydi. U 412 bayt atrofida bo'ladi va o'n yildan keyin ham ochilib o'qiladigan qilib tuzilgan: maydonlar o'chirilmaydi, faqat qo'shiladi.</p>" +
    "<table><tr><th>Maydon</th><th>Nima uchun kerak</th></tr>" +
    "<tr><td><code>sxema</code></td><td>Versiya. Eski yozuvlar yangi kod bilan ham o'qiladi</td></tr>" +
    "<tr><td><code>hodisa_id</code></td><td>Qurilma bergan kalit. Takrorni aynan shu ushlaydi</td></tr>" +
    "<tr><td><code>obyekt_id</code></td><td>Reyestrdagi obyekt. Shina navbati shu kalit bo'yicha bo'linadi</td></tr>" +
    "<tr><td><code>vaqt</code></td><td>Qurilma soati bo'yicha, UTC da. Saralash shu bo'yicha</td></tr>" +
    "<tr><td><code>tur</code>, <code>sinf</code></td><td>Harakat, eshik, signal; odam, mashina, hayvon</td></tr>" +
    "<tr><td><code>ishonch</code></td><td>Qurilma bergan baho. Chegara 0,70; pastdagisi voqea ochmaydi</td></tr>" +
    "<tr><td><code>sha256</code></td><td>Rasm o'zgarmaganining dalili. Sudda shu tekshiriladi</td></tr>" +
    "<tr><td><code>manba_brend</code></td><td>Kelib chiqishi. Yetkazuvchi bilan bahsda kerak bo'ladi</td></tr></table>" +
    "<p><b>Nima yo'q.</b> Yozuvda shaxs nomi, telefon raqami va yuz tasviri bo'lmaydi. Kadr saqlanadi, lekin unga tanib olish tahlili qo'llanilmaydi &mdash; bu ataylab qo'yilgan chegara.</p>" +
    "<p class='ogoh'>Sxema o'zgarganda eski maydon olib tashlanmaydi. Yangi maydon qo'shiladi, eskisi esa to'ldirilishda davom etadi va faqat hamma iste'molchi ko'chgandan keyin so'nadi. Aks holda o'tgan yilgi hisobot bugungi kod bilan ochilmay qoladi.</p>",
  ru: {
    yorliq: "Выход",
    sarlavha: "Запись на выходе: что в ней не зависит от бренда",
    tana: "<p>Запись, выходящая из адаптера, не содержит терминов ни одного бренда. Она занимает около 412 байт и построена так, чтобы её открыли и прочитали через десять лет: поля не удаляются, только добавляются.</p>" +
      "<table><tr><th>Поле</th><th>Зачем нужно</th></tr>" +
      "<tr><td><code>sxema</code></td><td>Версия. Старые записи читаются и новым кодом</td></tr>" +
      "<tr><td><code>hodisa_id</code></td><td>Ключ, присвоенный устройством. Именно он ловит повтор</td></tr>" +
      "<tr><td><code>obyekt_id</code></td><td>Объект в реестре. По этому ключу делится очередь шины</td></tr>" +
      "<tr><td><code>vaqt</code></td><td>По часам устройства, в UTC. Сортировка идёт по нему</td></tr>" +
      "<tr><td><code>tur</code>, <code>sinf</code></td><td>Движение, дверь, тревога; человек, машина, животное</td></tr>" +
      "<tr><td><code>ishonch</code></td><td>Оценка устройства. Порог 0,70; ниже инцидент не открывается</td></tr>" +
      "<tr><td><code>sha256</code></td><td>Доказательство неизменности кадра. В суде проверяют его</td></tr>" +
      "<tr><td><code>manba_brend</code></td><td>Происхождение. Пригодится в споре с поставщиком</td></tr></table>" +
      "<p><b>Чего в ней нет.</b> В записи нет имени человека, номера телефона и изображения лица. Кадр хранится, но распознавание к нему не применяется &mdash; это не вопрос технической возможности, а сознательно поставленная граница.</p>" +
      "<p class='ogoh'>При изменении схемы старое поле не убирают. Добавляется новое, старое продолжает заполняться и гаснет только после перехода всех потребителей. Иначе прошлогодний отчёт перестанет открываться сегодняшним кодом.</p>"
  },
  manba: []
},

"ti.x-isteomol": {
  yorliq: "Iste'molchilar",
  sarlavha: "Yozuvni kim oladi va nima uchun to'rttasi alohida",
  tana: "<p>Adapter yozuvni to'g'ridan-to'g'ri bazaga yozmaydi. U shinaga qo'yadi, shinadan esa to'rtta mustaqil iste'molchi o'qiydi. Biri sekinlashsa yoki to'xtasa, qolganlari ishlashda davom etadi.</p>" +
    "<table><tr><th>Iste'molchi</th><th>Nima qiladi</th><th>To'xtasa nima bo'ladi</th></tr>" +
    "<tr><td>Qoidalar mexanizmi</td><td>Voqea ochadi, muddat qo'yadi, mas'ulni belgilaydi</td><td>Hodisa yozilaveradi, lekin navbatchi xabar olmaydi</td></tr>" +
    "<tr><td>Obyekt reyestri</td><td>Obyekt kartochkasidagi holat va nazorat indeksini yangilaydi</td><td>Kartochka eskiradi, hodisalar yo'qolmaydi</td></tr>" +
    "<tr><td>Bildirishnoma xizmati</td><td>Push va SMS yuboradi, yetganini qayd etadi</td><td>Ekranda ko'rinadi, telefonga bormaydi</td></tr>" +
    "<tr><td>O'zgarmas jurnal</td><td>Yozuvni tegib bo'lmaydigan holda saqlaydi</td><td>Ogohlantirish beriladi va qabul to'xtatiladi</td></tr></table>" +
    "<p><b>Kamida bir marta.</b> Shina yetkazishni kafolatlaydi, lekin bir martalikni emas: iste'molchi to'xtab qolib qayta ishga tushsa, ba'zi yozuvlarni ikkinchi marta oladi. Shuning uchun har bir iste'molchi <code>hodisa_id</code> ni tekshiradi va ikkinchi marta hech narsa qilmaydi.</p>" +
    "<p><b>Tartib.</b> Navbat <code>obyekt_id</code> bo'yicha bo'linadi. Bitta obyektning hodisalari doim tartib bilan keladi; turli obyektlarniki aralashishi mumkin va bu hech narsani buzmaydi.</p>" +
    "<p class='ogoh'>Navbat uzunligi asosiy ogohlantirish ko'rsatkichi. U 10 000 dan oshsa, demak iste'molchilardan biri yiqilgan yoki bitta obyekt oqimni bosib ketgan. Ikkalasi ham darhol ko'rinadi, chunki navbat obyekt kesimida o'lchanadi.</p>",
  ru: {
    yorliq: "Потребители",
    sarlavha: "Кто забирает запись и зачем их четверо",
    tana: "<p>Адаптер не пишет запись прямо в базу. Он кладёт её в шину, а из шины читают четыре независимых потребителя. Если один замедлился или встал, остальные продолжают работать.</p>" +
      "<table><tr><th>Потребитель</th><th>Что делает</th><th>Что будет, если встанет</th></tr>" +
      "<tr><td>Механизм правил</td><td>Открывает инцидент, ставит срок, назначает ответственного</td><td>События пишутся, но дежурный не получает сигнала</td></tr>" +
      "<tr><td>Реестр объектов</td><td>Обновляет состояние и индекс контроля в карточке</td><td>Карточка устаревает, события не теряются</td></tr>" +
      "<tr><td>Служба уведомлений</td><td>Шлёт push и SMS, отмечает доставку</td><td>На экране видно, на телефон не уходит</td></tr>" +
      "<tr><td>Неизменяемый журнал</td><td>Хранит запись в неприкасаемом виде</td><td>Поднимается тревога, приём останавливается</td></tr></table>" +
      "<p><b>Не менее одного раза.</b> Шина гарантирует доставку, но не однократность: если потребитель упал и поднялся, часть записей он получит повторно. Поэтому каждый потребитель сверяет <code>hodisa_id</code> и на втором разе ничего не делает.</p>" +
      "<p><b>Порядок.</b> Очередь делится по <code>obyekt_id</code>. События одного объекта всегда приходят по порядку; события разных объектов могут перемешиваться, и это ничего не ломает.</p>" +
      "<p class='ogoh'>Длина очереди &mdash; главный сигнальный показатель. Перевалила за 10 000 &mdash; значит, упал один из потребителей или один объект залил поток. И то и другое видно сразу, потому что очередь меряется в разрезе объектов.</p>"
  },
  manba: []
}

});
