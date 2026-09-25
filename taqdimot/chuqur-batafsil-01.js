/* Yechim 01 (Reolink va Home Hub) chuqur sahifasidagi batafsil yozuvlari.
   Kalit: y01.<blok>. Ruscha matn yozuvning ichida, ru maydonida. */
window.MKB_BATAFSIL = window.MKB_BATAFSIL || {};
Object.assign(window.MKB_BATAFSIL, {

"y01.r-sutka": {
  yorliq: "Montajchi uchun", sarlavha: "156 Vt·soat qayerdan chiqdi",
  tana: "<p>Sutkalik sarf ikkita doim yoqiq qurilmadan yig'iladi. Kameralar bu hisobga kirmaydi: ular o'z akkumulyatorida ishlaydi.</p>" +
    "<table><tr><th>Qurilma</th><th>Vt</th><th>Vt·soat/sutka</th></tr>" +
    "<tr><td>Home Hub</td><td class='n'>2,5–4,0</td><td class='n'>60–96</td></tr>" +
    "<tr><td>4G router</td><td class='n'>2,5–4,0</td><td class='n'>60–96</td></tr>" +
    "<tr><td>DC-DC va kontroller yo'qotishi</td><td class='n'>0,3–0,6</td><td class='n'>7–14</td></tr>" +
    "<tr><td><b>Hisobga olinadigan o'rtacha</b></td><td class='n'><b>6,5</b></td><td class='n'><b>156</b></td></tr></table>" +
    "<h4>Nega o'rtacha 6,5 Vt</h4><p>Router zaif signalda uzatgichni to'liq quvvatga chiqaradi va sarfi 30–40% oshadi. Obyektda RSRP −105 dBm dan past bo'lsa, hisobga 8 Vt qo'yiladi.</p>" +
    "<p class='ogoh'>Katalogdagi raqam montajchining kafolati emas. Sarf o'rnatishdan keyin ampermetr bilan o'lchanadi va dalolatnomaga yoziladi: butun avtonomiya hisobi shu bitta o'lchovga tayanadi.</p>",
  ru: { yorliq: "Для монтажника", sarlavha: "Откуда взялись 156 Вт·ч",
    tana: "<p>Суточный расход складывается из двух постоянно включённых устройств. Камеры в него не входят: они живут на собственном аккумуляторе.</p>" +
      "<table><tr><th>Устройство</th><th>Вт</th><th>Вт·ч/сутки</th></tr>" +
      "<tr><td>Home Hub</td><td class='n'>2,5–4,0</td><td class='n'>60–96</td></tr>" +
      "<tr><td>4G-роутер</td><td class='n'>2,5–4,0</td><td class='n'>60–96</td></tr>" +
      "<tr><td>Потери DC-DC и контроллера</td><td class='n'>0,3–0,6</td><td class='n'>7–14</td></tr>" +
      "<tr><td><b>Расчётное среднее</b></td><td class='n'><b>6,5</b></td><td class='n'><b>156</b></td></tr></table>" +
      "<h4>Почему именно 6,5 Вт</h4><p>При слабом сигнале роутер выводит передатчик на полную мощность и потребляет на 30–40% больше. Если на объекте RSRP ниже −105 дБм, в расчёт закладывают 8 Вт.</p>" +
      "<p class='ogoh'>Цифра из каталога — не гарантия монтажника. Потребление измеряют амперметром после установки и вносят в акт: на этом единственном замере держится весь расчёт автономии.</p>" }
},

"y01.r-kun": {
  yorliq: "Montajchi uchun", sarlavha: "Zaryadsiz 27 kun: hisob zanjiri",
  tana: "<p>12 V 100 A·soat LiFePO4 blokda 1,28 kVt·soat bor. BMS 90% dan chuqur razryadga yo'l qo'ymaydi, demak foydali sig'im 1 150 Vt·soat.</p>" +
    "<table><tr><th>Sharoit</th><th>Sutkalik balans</th><th>Zaryadsiz</th></tr>" +
    "<tr><td>Panelsiz</td><td class='n'>−156 Vt·soat</td><td class='n'>7,4 kun</td></tr>" +
    "<tr><td>50 Vt panel</td><td class='n'>−99 Vt·soat</td><td class='n'>11,6 kun</td></tr>" +
    "<tr><td>100 Vt panel</td><td class='n'>−43 Vt·soat</td><td class='n'>27 kun</td></tr>" +
    "<tr><td>150 Vt panel</td><td class='n'>+14 Vt·soat</td><td class='n'>chegarasiz</td></tr></table>" +
    "<p>Servis tashrifining narxi yo'l va ikki kishining ish vaqtidan iborat. Haftalik tashrifni oylik tashrifga aylantiradigan 100 Vt panel bir yilda o'z narxini qoplaydi.</p>" +
    "<p class='ogoh'>27 kun — dekabrning o'rtacha quyoshi bo'yicha. Ketma-ket to'rt-besh bulutli kun tushsa, akkumulyator shu oraliqda 15–20% tezroq bo'shaydi; platforma zaryad 25% ga yetganda servis vazifasini o'zi ochadi.</p>",
  ru: { yorliq: "Для монтажника", sarlavha: "27 дней без подзарядки: цепочка расчёта",
    tana: "<p>В блоке LiFePO4 12 В 100 А·ч — 1,28 кВт·ч. BMS не допускает разряда глубже 90%, значит полезная ёмкость — 1 150 Вт·ч.</p>" +
      "<table><tr><th>Условие</th><th>Баланс за сутки</th><th>Без подзарядки</th></tr>" +
      "<tr><td>Без панели</td><td class='n'>−156 Вт·ч</td><td class='n'>7,4 дн.</td></tr>" +
      "<tr><td>Панель 50 Вт</td><td class='n'>−99 Вт·ч</td><td class='n'>11,6 дн.</td></tr>" +
      "<tr><td>Панель 100 Вт</td><td class='n'>−43 Вт·ч</td><td class='n'>27 дн.</td></tr>" +
      "<tr><td>Панель 150 Вт</td><td class='n'>+14 Вт·ч</td><td class='n'>без ограничения</td></tr></table>" +
      "<p>Стоимость выезда — это дорога и рабочее время двух человек. Панель на 100 Вт превращает еженедельный выезд в ежемесячный и окупается за первый год.</p>" +
      "<p class='ogoh'>27 дней посчитаны по среднему декабрьскому солнцу. Четыре-пять пасмурных суток подряд опустошают батарею на 15–20% быстрее; при заряде 25% платформа сама создаёт сервисную задачу.</p>" }
},

"y01.r-harorat": {
  yorliq: "Rahbariyat uchun", sarlavha: "Harorat chegarasi yechimning chegarasi",
  tana: "<p>Bu komplektdagi eng past chegara −10 °C. U kamera va hub datasheet'idan olingan qiymat.</p>" +
    "<table><tr><th>Qism</th><th>Ishlash</th><th>Zaryad</th></tr>" +
    "<tr><td>Batareyali kamera</td><td>−10…+55 °C</td><td>0…+45 °C</td></tr>" +
    "<tr><td>Home Hub</td><td>−10…+45 °C</td><td>—</td></tr>" +
    "<tr><td>LiFePO4 blok</td><td>−20…+55 °C</td><td>0…+45 °C</td></tr></table>" +
    "<h4>Toshkent dekabri</h4><p>Tungi harorat odatda −2…−6 °C, sovuq to'lqinda bir necha kecha −12…−15 °C. Viloyatlarning tog' oldi tumanlarida bundan past.</p>" +
    "<p>Demak Yechim 01 — isitiladigan yoki hech bo'lmasa nolga tushmaydigan bino uchun. Tashqi perimetr, isitilmaydigan ombor va viloyatning sovuq nuqtasi uchun −20 °C sinfidagi Yechim 02 yoki 03 olinadi.</p>",
  ru: { yorliq: "Для правления", sarlavha: "Температурный предел — это и есть предел решения",
    tana: "<p>Нижняя граница комплекта — −10 °C. Это не маркетинговая цифра, а значение из паспорта камеры и хаба.</p>" +
      "<table><tr><th>Компонент</th><th>Работа</th><th>Заряд</th></tr>" +
      "<tr><td>Аккумуляторная камера</td><td>−10…+55 °C</td><td>0…+45 °C</td></tr>" +
      "<tr><td>Home Hub</td><td>−10…+45 °C</td><td>—</td></tr>" +
      "<tr><td>Блок LiFePO4</td><td>−20…+55 °C</td><td>0…+45 °C</td></tr></table>" +
      "<h4>Декабрь в Ташкенте</h4><p>Ночью обычно −2…−6 °C, в холодную волну несколько ночей до −12…−15 °C. В предгорных районах областей — ниже.</p>" +
      "<p>Значит, решение 01 годится для отапливаемого или хотя бы не промерзающего здания. Для открытого периметра, холодного склада и морозной области берут комплект класса −20 °C: решение 02 или 03.</p>" }
},

"y01.r-narx": {
  yorliq: "Moliya va huquq", sarlavha: "8,0–11,5 mln so'mga nima kiradi va nima kirmaydi",
  tana: "<p>Raqam uch kamerali obyektning kalit topshirish narxi: jihoz, montaj, sozlash va platformada ro'yxatga olish.</p>" +
    "<h4>Kiradi</h4><ul><li>Home Hub, uchta batareyali kamera, 4G router;</li><li>LiFePO4 blok, MPPT kontroller va quyosh paneli;</li><li>kronshteyn, kabel, shkaf va montaj ishi;</li><li>sinov hodisasi va topshirish dalolatnomasi.</li></ul>" +
    "<h4>Kirmaydi</h4><ul><li>kirish kontrolleri va zamok — 2–4 mln so'm qo'shiladi;</li><li>video domofon — model bo'yicha alohida;</li><li>SIM va trafik — oyiga 50–100 ming so'm;</li><li>servis tashriflari — besh yillik xarajatning asosiy qismi.</li></ul>" +
    "<p class='ogoh'>Smetani zaryadsiz kun soniga bog'lab tuzing. To'rtinchi kamera narxni 1,5–2 mln so'mga oshiradi, avtonomiyani bir haftadan bir oyga cho'zish esa undan qimmat va aynan shu qator servis xarajatini belgilaydi.</p>",
  ru: { yorliq: "Финансы и право", sarlavha: "Что входит в 8,0–11,5 млн сум, а что нет",
    tana: "<p>Цифра — стоимость объекта с тремя камерами под ключ: оборудование, монтаж, настройка и регистрация в платформе.</p>" +
      "<h4>Входит</h4><ul><li>Home Hub, три аккумуляторные камеры, 4G-роутер;</li><li>блок LiFePO4, MPPT-контроллер и солнечная панель;</li><li>кронштейны, кабель, шкаф и монтажные работы;</li><li>тестовое событие и акт сдачи.</li></ul>" +
      "<h4>Не входит</h4><ul><li>контроллер доступа и замок — плюс 2–4 млн сум;</li><li>видеодомофон — отдельно, по модели;</li><li>SIM и трафик — 50–100 тыс. сум в месяц;</li><li>сервисные выезды — основная часть пятилетних затрат.</li></ul>" +
      "<p class='ogoh'>Стройте смету не от числа камер, а от числа дней без подзарядки. Четвёртая камера добавит 1,5–2 млн сум, а растянуть автономию с недели до месяца дороже — и именно эта строка определяет сервисные расходы.</p>" }
},

"y01.k-kamera": {
  yorliq: "Texnik izoh", sarlavha: "Batareyali kamera: nima qiladi va nima qilmaydi",
  tana: "<p>Kamera sutkaning katta qismini uyquda o'tkazadi. PIR datchik issiq jismning harakatini sezganda u 0,6 soniyada uyg'onadi, 20 soniya yozadi va yana uxlaydi.</p>" +
    "<table><tr><th>Ko'rsatkich</th><th>Qiymat</th></tr>" +
    "<tr><td>Akkumulyator</td><td>5 000 mA·soat, ≈18,5 Vt·soat</td></tr>" +
    "<tr><td>PIR masofasi</td><td>8–10 m, yon harakatga sezgirroq</td></tr>" +
    "<tr><td>Aloqa</td><td>Wi-Fi 6, faqat Home Hub bilan</td></tr>" +
    "<tr><td>Tungi tasvir</td><td>Yorug'lik bo'lsa rangli, bo'lmasa IR</td></tr>" +
    "<tr><td>Ishlash harorati</td><td>−10…+55 °C</td></tr></table>" +
    "<h4>Nima qilmaydi</h4><p>24 soat uzluksiz yozmaydi, o'zi RTSP bermaydi, rele chiqishi yo'q va harorat chegarasidan pastda ishlamaydi. Bu to'rttasi kamchilik emas, tanlov: shu evaziga obyektga kabel tortilmaydi.</p>",
  ru: { yorliq: "Техническая справка", sarlavha: "Аккумуляторная камера: что она делает и чего не делает",
    tana: "<p>Большую часть суток камера спит. Когда PIR ловит движение тёплого объекта, она просыпается за 0,6 секунды, пишет 20 секунд и засыпает снова.</p>" +
      "<table><tr><th>Параметр</th><th>Значение</th></tr>" +
      "<tr><td>Аккумулятор</td><td>5 000 мА·ч, ≈18,5 Вт·ч</td></tr>" +
      "<tr><td>Дальность PIR</td><td>8–10 м, лучше видит поперечное движение</td></tr>" +
      "<tr><td>Связь</td><td>Wi-Fi 6, только с Home Hub</td></tr>" +
      "<tr><td>Ночная картинка</td><td>При подсветке цветная, без неё ИК</td></tr>" +
      "<tr><td>Рабочая температура</td><td>−10…+55 °C</td></tr></table>" +
      "<h4>Чего она не делает</h4><p>Не пишет круглосуточно, не отдаёт RTSP напрямую, не имеет релейного выхода и не работает ниже своего температурного порога. Это не недостатки, а плата за то, что на объект не тянут кабель.</p>" }
},

"y01.k-hub": {
  yorliq: "Jamoa rahbarlari uchun", sarlavha: "Home Hub — zanjirning majburiy bo'g'ini",
  tana: "<p>Hub sakkiztagacha kamerani oladi, ikkita microSD kartaga (har biri 1 TB gacha) yozadi va tahlilni joyda bajaradi — odam, mashina, hayvon.</p>" +
    "<p>Eng muhimi: uchinchi tomon protokollari aynan shu yerda ochiladi. Adapter obyektdagi bitta IP manzil bilan ishlaydi, kameralar soni o'zgarsa ham bank tomonida hech nima o'zgarmaydi.</p>" +
    "<h4>Sozlashda nima qilinadi</h4><ul><li>tunnel ichidagi doimiy IP beriladi;</li><li>adapter uchun alohida, faqat o'qish huquqiga ega hisob yaratiladi;</li><li>NTP serveri bank tarmog'idagi manzilga qaratiladi;</li><li>mikrodastur versiyasi yozib olinadi va avtomatik yangilanish o'chiriladi.</li></ul>" +
    "<p class='ogoh'>Hub o'chsa obyekt butunlay ko'r qoladi: kameralarning o'zidan oqim olib bo'lmaydi. Shuning uchun hub va router 12 V liniyada alohida saqlagich bilan, shkaf esa ochilish datchigi bilan jihozlanadi.</p>",
  ru: { yorliq: "Для тимлида", sarlavha: "Home Hub — обязательное звено цепи",
    tana: "<p>Хаб держит до восьми камер, пишет на две карты microSD (до 1 ТБ каждая) и выполняет анализ на месте — человек, автомобиль, животное.</p>" +
      "<p>Главное: сторонние протоколы открываются именно здесь. Адаптер работает с одним IP-адресом на объекте, и при изменении числа камер на стороне банка не меняется ничего.</p>" +
      "<h4>Что делают при настройке</h4><ul><li>назначают постоянный адрес внутри туннеля;</li><li>заводят отдельную учётную запись адаптера только на чтение;</li><li>указывают NTP-сервер в сети банка;</li><li>фиксируют версию прошивки и отключают автообновление.</li></ul>" +
      "<p class='ogoh'>Если хаб выключится, объект слепнет целиком: поток с самих камер получить нельзя. Поэтому хаб и роутер получают отдельный предохранитель на линии 12 В, а шкаф — датчик вскрытия.</p>" }
},

"y01.k-router": {
  yorliq: "Montajchi uchun", sarlavha: "Router qanday tanlanadi",
  tana: "<p>Uy routerlari bu yerga yaramaydi: ular 230 V adapterga bog'langan va uzilishda o'zi ko'tarilmaydi. Talablar ro'yxati qisqa va qat'iy.</p>" +
    "<ul><li><b>12 V DC kirish</b> — akkumulyatordan to'g'ridan-to'g'ri, ortiqcha o'zgartirishsiz;</li>" +
    "<li><b>ikkita SIM uyasi</b> va ping bo'yicha avtomatik o'tish: asosiy operator yo'qolsa ikkinchisi ko'tariladi;</li>" +
    "<li><b>tashqi antenna chiqishi</b> — omborda va yerto'lada signalni faqat shu qutqaradi;</li>" +
    "<li><b>watchdog</b> — tunnel ko'tarilmasa router o'zini qayta yuklaydi;</li>" +
    "<li><b>SNMP yoki API</b> — RSRP, SINR, faol SIM va trafik platformaga chiqsin.</li></ul>" +
    "<p>Sanoat sinfidagi bunday modellar 3–6 Vt oladi. Aynan shu raqam ampermetr bilan tasdiqlanadi: bitta vatt farq bir yilda bir haftalik avtonomiyaga teng.</p>",
  ru: { yorliq: "Для монтажника", sarlavha: "Как выбирают роутер",
    tana: "<p>Бытовые роутеры сюда не годятся: они привязаны к адаптеру 230 В и сами не поднимаются после сбоя. Список требований короткий и жёсткий.</p>" +
      "<ul><li><b>вход 12 В DC</b> — напрямую от аккумулятора, без лишнего преобразования;</li>" +
      "<li><b>два слота SIM</b> и автопереключение по пингу: пропал основной оператор — поднимается второй;</li>" +
      "<li><b>разъёмы внешних антенн</b> — на складе и в подвале спасает только это;</li>" +
      "<li><b>watchdog</b> — если туннель не поднялся, роутер перезагружает себя сам;</li>" +
      "<li><b>SNMP или API</b> — RSRP, SINR, активная SIM и трафик должны уходить в платформу.</li></ul>" +
      "<p>Такие промышленные модели потребляют 3–6 Вт. Именно эту цифру подтверждают амперметром: разница в один ватт за год равна неделе автономии.</p>" }
},

"y01.k-akb": {
  yorliq: "Moliya va huquq", sarlavha: "Nega LiFePO4, nega 100 A·soat",
  tana: "<p>Gel akkumulyator boshlang'ich smetada 1,2–1,5 mln so'mga arzon, lekin 400–600 tsikldan keyin almashtiriladi. LiFePO4 esa 6 000 tsiklga mo'ljallangan: aylantirilgan bir kilovatt-soat narxi qariyb olti barobar past.</p>" +
    "<table><tr><th>Ko'rsatkich</th><th>LiFePO4 12 V 100 A·soat</th></tr>" +
    "<tr><td>Sig'im</td><td>1,28 kVt·soat, foydali 1,15</td></tr>" +
    "<tr><td>Razryad harorati</td><td>−20…+55 °C</td></tr>" +
    "<tr><td>Zaryad harorati</td><td>0…+45 °C, BMS pastda to'xtatadi</td></tr>" +
    "<tr><td>Bozor narxi</td><td>4,3 mln so'm atrofida</td></tr></table>" +
    "<p>100 A·soat — eng arzon sig'im emas, eng arzon servis. 50 A·soatlik blok smetani 1,5 mln so'mga tushiradi, lekin tashrif sonini ikki barobar oshiradi.</p>" +
    "<p class='ogoh'>Xarid shartiga BMS ning past harorat himoyasi majburiy talab sifatida kiritiladi va sotuvchidan BMS datasheet'i so'raladi. Og'zaki va'da bu yerda ishlamaydi.</p>",
  manba: [["LiFePO4 12 V 100 A·soat narxi", "https://vidcom.uz/shop/energosistemy/akkumulyatornye-batarei/rk-12v100ah-las-lifepo4"]],
  ru: { yorliq: "Финансы и право", sarlavha: "Почему LiFePO4 и почему 100 А·ч",
    tana: "<p>Гелевый аккумулятор дешевле в смете на 1,2–1,5 млн сум, но меняется через 400–600 циклов. LiFePO4 рассчитан на 6 000 циклов: стоимость одного прокачанного киловатт-часа почти в шесть раз ниже.</p>" +
      "<table><tr><th>Параметр</th><th>LiFePO4 12 В 100 А·ч</th></tr>" +
      "<tr><td>Ёмкость</td><td>1,28 кВт·ч, полезная 1,15</td></tr>" +
      "<tr><td>Температура разряда</td><td>−20…+55 °C</td></tr>" +
      "<tr><td>Температура заряда</td><td>0…+45 °C, ниже BMS запрещает</td></tr>" +
      "<tr><td>Рыночная цена</td><td>около 4,3 млн сум</td></tr></table>" +
      "<p>100 А·ч — это не самая дешёвая ёмкость, а самый дешёвый сервис. Блок на 50 А·ч снижает смету на 1,5 млн сум, но удваивает число выездов.</p>" +
      "<p class='ogoh'>В условия закупки вносят обязательное требование низкотемпературной защиты BMS и запрашивают у поставщика паспорт BMS. Устные заверения здесь не работают.</p>" }
},

"y01.k-ogoh": {
  yorliq: "Jamoa rahbarlari uchun", sarlavha: "Nega kameraga to'g'ridan-to'g'ri ulanib bo'lmaydi",
  tana: "<p>Batareyali kamera hub bilan ishlab chiqaruvchining o'z protokoli orqali gaplashadi. RTSP va ONVIF esa hub darajasida ochiladi — bu jihozning konstruktiv xususiyati, sozlamasi emas.</p>" +
    "<h4>Arxitektura uchun oqibati</h4><ul><li>Adapter obyektdagi bitta manzil bilan ishlaydi, o'nta emas.</li><li>Kamera qo'shilsa yoki almashtirilsa, bank tarmog'i tomonida hech nima o'zgarmaydi.</li><li>Hub yagona nosozlik nuqtasiga aylanadi va uni alohida nazorat qilish kerak bo'ladi.</li></ul>" +
    "<p>Shu sababli tender shartida «RTSP va ONVIF ochiq bo'lsin» degan jumla yetarli emas. Aniq yoziladi: qaysi qurilmada, qaysi port va qaysi mikrodastur versiyasida. Sinov stendida ko'rsatilsin.</p>",
  ru: { yorliq: "Для тимлида", sarlavha: "Почему нельзя подключиться к камере напрямую",
    tana: "<p>Аккумуляторная камера общается с хабом по собственному протоколу производителя. RTSP и ONVIF открываются на уровне хаба — это конструктивная особенность хаба.</p>" +
      "<h4>Что это значит для архитектуры</h4><ul><li>Адаптер работает с одним адресом на объекте.</li><li>Добавление или замена камеры ничего не меняет в сети банка.</li><li>Хаб становится единственной точкой отказа, и следить за ним нужно отдельно.</li></ul>" +
      "<p>Поэтому фразы «RTSP и ONVIF должны быть открыты» в тендере недостаточно. Пишут точно: на каком устройстве, через какой порт и на какой версии прошивки. И требуют показать на стенде.</p>" }
},

"y01.s-tun": {
  yorliq: "Texnik izoh", sarlavha: "Tunda nima yonib turadi, nima uxlaydi",
  tana: "<p>Tun — sutkaning eng uzun va eng qimmat qismi: 14,6 soat davomida panel nol beradi, yuklama esa o'zgarmaydi.</p>" +
    "<table><tr><th>Qurilma</th><th>Tunda</th></tr>" +
    "<tr><td>Home Hub</td><td>Yoqiq: Wi-Fi seanslari, microSD, tahlil</td></tr>" +
    "<tr><td>4G router</td><td>Yoqiq: tunnel va keepalive</td></tr>" +
    "<tr><td>Kamera</td><td>Uyquda, PIR kutadi</td></tr>" +
    "<tr><td>Quyosh kontrolleri</td><td>Kutish rejimi, 0,1 Vt dan kam</td></tr></table>" +
    "<h4>Hodisa bo'lganda</h4><p>PIR uyg'otadi, kamera 0,6 soniyada tiklanadi, yozuv 1–1,5 soniyadan keyin boshlanadi. Demak hodisaning birinchi lahzalari klipga tushmaydi. Buni oldindan bilish kerak: qo'shni kameraning kadri odatda shu bo'shliqni yopadi.</p>" +
    "<p>Bir tunda 30 ta hodisa kameraning akkumulyatoridan 0,33 Vt·soat oladi — hub va routerning bir soatlik sarfidan kam.</p>",
  ru: { yorliq: "Техническая справка", sarlavha: "Что ночью работает, а что спит",
    tana: "<p>Ночь — самая длинная и самая дорогая часть суток: 14,6 часа панель не даёт ничего, а нагрузка не меняется.</p>" +
      "<table><tr><th>Устройство</th><th>Ночью</th></tr>" +
      "<tr><td>Home Hub</td><td>Включён: сессии Wi-Fi, запись, анализ</td></tr>" +
      "<tr><td>4G-роутер</td><td>Включён: туннель и keepalive</td></tr>" +
      "<tr><td>Камера</td><td>Спит, ждёт PIR</td></tr>" +
      "<tr><td>Солнечный контроллер</td><td>Дежурный режим, менее 0,1 Вт</td></tr></table>" +
      "<h4>Когда происходит событие</h4><p>PIR будит камеру, она поднимается за 0,6 секунды, запись начинается ещё через 1–1,5 секунды. Значит, первые мгновения события в клип не попадают. Об этом нужно знать заранее: обычно этот провал закрывает кадр соседней камеры.</p>" +
      "<p>Тридцать событий за ночь отнимают у аккумулятора камеры 0,33 Вт·ч — меньше, чем хаб и роутер съедают за час.</p>" }
},

"y01.s-sovuq": {
  yorliq: "Montajchi uchun", sarlavha: "Sovuqda litiy: qaytariladigan va qaytarilmaydigan yo'qotish",
  tana: "<p>Ikki hodisani aralashtirmaslik kerak.</p>" +
    "<h4>Qaytariladigan</h4><p>Sovuqda elektrolitning qarshiligi oshadi va akkumulyator sig'imining bir qismini vaqtincha bermaydi. −4 °C da bu taxminan chorak qism. Harorat ko'tarilsa sig'im to'liq qaytadi, akkumulyator zarar ko'rmaydi.</p>" +
    "<h4>Qaytarilmaydigan</h4><p>0 °C dan past haroratda zaryadlash anodda metall litiy cho'ktiradi. Sig'im doimiy yo'qoladi, eng yomon holatda ichki qisqa tutashuv bo'ladi. Bu jarayon ko'rinmaydi va bir necha sovuq kunda yuzaga keladi.</p>" +
    "<p class='ogoh'>Kameraning o'z quyosh paneli ham shu xavfni tug'diradi. Sotuvchidan kamera mikrodasturida past harorat zaryad himoyasi borligini yozma tasdiqlashni so'rang; bo'lmasa qishda kichik panel uziladi va kamera qo'lda zaryadlanadi.</p>",
  ru: { yorliq: "Для монтажника", sarlavha: "Литий на морозе: обратимая и необратимая потеря",
    tana: "<p>Здесь нельзя путать два разных явления.</p>" +
      "<h4>Обратимая</h4><p>На холоде растёт сопротивление электролита, и часть ёмкости временно недоступна. При −4 °C это около четверти. Когда теплеет, ёмкость возвращается полностью, аккумулятор не страдает.</p>" +
      "<h4>Необратимая</h4><p>Заряд при температуре ниже 0 °C осаждает на аноде металлический литий. Ёмкость теряется навсегда, в худшем случае возникает внутреннее замыкание. Процесс невидим и разворачивается за несколько морозных дней.</p>" +
      "<p class='ogoh'>Собственная солнечная панель камеры создаёт ту же угрозу. Запросите у поставщика письменное подтверждение, что в прошивке камеры есть низкотемпературная блокировка заряда; если её нет — на зиму панель отключают, а камеру заряжают вручную.</p>" }
},

"y01.s-kun": {
  yorliq: "Montajchi uchun", sarlavha: "Panel burchagi: qishda 55°, yozda emas",
  tana: "<p>Toshkentda 21-dekabrda quyosh peshinda ufqdan 25,3° ko'tariladi. Yillik optimal 30–35° qiyalikka qo'yilgan panel dekabrda nurni juda qiya qabul qiladi.</p>" +
    "<table><tr><th>Qiyalik</th><th>Dekabrdagi unum</th></tr>" +
    "<tr><td>30° (yillik optimal)</td><td>asos</td></tr>" +
    "<tr><td>55–60° (qishki optimal)</td><td>+20…25%</td></tr></table>" +
    "<p>Tik qo'yilgan panelda qor o'zi sirg'alib tushadi va chang yomg'ir bilan yuviladi. Yo'nalish — janubga, og'ish ±15° gacha sezilarli zarar bermaydi.</p>" +
    "<p class='ogoh'>Soya alohida masala. Panel ichidagi hujayralar ketma-ket ulangan, shuning uchun bitta shox tushirgan soya butun panel quvvatini uchdan biriga tushiradi. O'rnatish joyi qish quyoshining past yo'li bo'yicha tanlanadi, yoz soyasi bo'yicha emas.</p>",
  ru: { yorliq: "Для монтажника", sarlavha: "Угол панели: 55° под зимнее солнце",
    tana: "<p>21 декабря в Ташкенте солнце в полдень поднимается на 25,3° над горизонтом. Панель, поставленная под годовой оптимум 30–35°, принимает декабрьский свет под очень скользящим углом.</p>" +
      "<table><tr><th>Наклон</th><th>Выработка в декабре</th></tr>" +
      "<tr><td>30° (годовой оптимум)</td><td>база</td></tr>" +
      "<tr><td>55–60° (зимний оптимум)</td><td>+20…25%</td></tr></table>" +
      "<p>С крутой панели снег сходит сам, а пыль смывает дождём. Ориентация — на юг, отклонение до ±15° заметного ущерба не даёт.</p>" +
      "<p class='ogoh'>Тень — отдельная тема. Ячейки внутри панели соединены последовательно, поэтому тень от одной ветки роняет мощность всей панели до трети. Место выбирают по низкой зимней траектории солнца.</p>" }
},

"y01.s-kamera": {
  yorliq: "Texnik izoh", sarlavha: "Kamera hisobi: nega u muammo emas",
  tana: "<p>Kameraning energiya balansi hub va routernikidan ikki tartib kichik.</p>" +
    "<table><tr><th>Modda</th><th>Qiymat</th></tr>" +
    "<tr><td>Akkumulyator</td><td>5 000 mA·soat ≈ 18,5 Vt·soat</td></tr>" +
    "<tr><td>Kutish</td><td>≈20 mVt → 0,48 Vt·soat/sutka</td></tr>" +
    "<tr><td>30 ta hodisa</td><td>30 × 20 s × 2 Vt ≈ 0,33 Vt·soat</td></tr>" +
    "<tr><td>Jami</td><td><b>0,8 Vt·soat/sutka</b></td></tr>" +
    "<tr><td>6 Vt panel, dekabr</td><td>6,8 Vt·soat/sutka</td></tr></table>" +
    "<p>Ya'ni kichik panel dekabrda ham sakkiz baravar zaxira bilan ishlaydi, panelsiz akkumulyator esa uch hafta yetadi.</p>" +
    "<p class='ogoh'>Balans faqat bitta holatda buziladi: kamera hub bilan aloqani yo'qotib, qayta ulanishga urinaversa. Shunda sarf o'n baravar oshadi va batareya bir kunda tugaydi. Signal darajasini kuzatish shuning uchun kerak.</p>",
  ru: { yorliq: "Техническая справка", sarlavha: "Расчёт по камере: почему она не проблема",
    tana: "<p>Энергобаланс камеры на два порядка меньше, чем у хаба с роутером.</p>" +
      "<table><tr><th>Статья</th><th>Значение</th></tr>" +
      "<tr><td>Аккумулятор</td><td>5 000 мА·ч ≈ 18,5 Вт·ч</td></tr>" +
      "<tr><td>Ожидание</td><td>≈20 мВт → 0,48 Вт·ч/сутки</td></tr>" +
      "<tr><td>30 событий</td><td>30 × 20 с × 2 Вт ≈ 0,33 Вт·ч</td></tr>" +
      "<tr><td>Итого</td><td><b>0,8 Вт·ч/сутки</b></td></tr>" +
      "<tr><td>Панель 6 Вт, декабрь</td><td>6,8 Вт·ч/сутки</td></tr></table>" +
      "<p>То есть маленькая панель даже в декабре работает с восьмикратным запасом, а без панели аккумулятора хватает на три недели.</p>" +
      "<p class='ogoh'>Баланс рушится в одном случае: камера потеряла хаб и бесконечно переподключается. Тогда расход вырастает в десять раз и батарея садится за сутки. Ради этого и следят за уровнем сигнала.</p>" }
},

"y01.q-panel": {
  yorliq: "Montajchi uchun", sarlavha: "113 Vt·soat: koeffitsiyent nimadan iborat",
  tana: "<p>Formula qisqa: <code>panel quvvati × insolyatsiya × 0,7</code>. Toshkentda dekabr insolyatsiyasi 1,62 kVt·soat/m² (NASA POWER, 2001–2020 klimatologiyasi).</p>" +
    "<h4>0,7 ichida nima bor</h4><ul><li>burchak va yo'nalish yo'qotishi;</li><li>chang va qor — qishda bu eng katta ulush;</li><li>MPPT kontroller foydali ish koeffitsiyenti, 0,94–0,97;</li><li>kabel va ulagichlardagi tushuv;</li><li>panel yuzasining eskirishi.</li></ul>" +
    "<p>100 Vt panel uchun: 100 × 1,62 × 0,7 ≈ 113 Vt·soat sutkasiga.</p>" +
    "<p class='ogoh'>Bu o'rtacha qiymat. Qalin bulutli kunda unum nominalning 20–25% iga, ya'ni 25–30 Vt·soatga tushadi. Dekabrda Toshkentda shunday kunlar o'ndan ortiq bo'ladi — akkumulyator aynan shular uchun katta olinadi.</p>",
  manba: [["NASA POWER insolyatsiya ma'lumotlari", "https://power.larc.nasa.gov/"]],
  ru: { yorliq: "Для монтажника", sarlavha: "113 Вт·ч: из чего состоит коэффициент",
    tana: "<p>Формула короткая: <code>мощность панели × инсоляция × 0,7</code>. Декабрьская инсоляция в Ташкенте — 1,62 кВт·ч/м² (NASA POWER, климатология 2001–2020).</p>" +
      "<h4>Что внутри 0,7</h4><ul><li>потери на угол и ориентацию;</li><li>пыль и снег — зимой это крупнейшая доля;</li><li>КПД MPPT-контроллера, 0,94–0,97;</li><li>падение на кабеле и разъёмах;</li><li>деградация поверхности панели.</li></ul>" +
      "<p>Для панели 100 Вт: 100 × 1,62 × 0,7 ≈ 113 Вт·ч в сутки.</p>" +
      "<p class='ogoh'>Это среднее. В плотную облачность выработка падает до 20–25% номинала, то есть до 25–30 Вт·ч. В декабре в Ташкенте таких дней больше десяти — именно ради них берут аккумулятор с запасом.</p>" }
},

"y01.q-balans": {
  yorliq: "Jamoa rahbarlari uchun", sarlavha: "Balans manfiy bo'lsa: uchta tutqich",
  tana: "<p>Sutkalik balans — panel unumi minus yuklama. Dekabrda u manfiy bo'lishi normal; savol shundaki, ayirma qancha kunda akkumulyatorni bo'shatadi.</p>" +
    "<table><tr><th>Tutqich</th><th>Ta'siri</th><th>Narxi</th></tr>" +
    "<tr><td>Panelni kattalashtirish</td><td>+56 Vt·soat har 50 Vt uchun</td><td>Vatt narxi eng past qator</td></tr>" +
    "<tr><td>Sig'imni oshirish</td><td>+1 150 Vt·soat har blokda</td><td>Eng qimmat qator</td></tr>" +
    "<tr><td>Yuklamani kamaytirish</td><td>Har 1 Vt = 24 Vt·soat</td><td>Deyarli bepul</td></tr></table>" +
    "<h4>Yuklamani qanday kamaytirish mumkin</h4><ul><li>routerni kechasi 5G/LTE o'rniga faqat LTE rejimida ushlash;</li><li>hub tahlilini faqat kerakli kameralarda yoqish;</li><li>12 V ni ortiqcha o'zgartirmaslik: qurilmalar bevosita 12 V dan oziqlansin.</li></ul>" +
    "<p class='ogoh'>Yozgi hisobga tuzilgan komplekt yanvarda uch kunda o'chadi. Hisobni har doim dekabrdan boshlang va pilotning birinchi qishida akkumulyatorning eng past zaryad jurnalini ko'ring.</p>",
  ru: { yorliq: "Для тимлида", sarlavha: "Если баланс отрицательный: три рычага",
    tana: "<p>Суточный баланс — это выработка панели минус нагрузка. В декабре он отрицательный, и это нормально; вопрос лишь в том, за сколько дней разница опустошит аккумулятор.</p>" +
      "<table><tr><th>Рычаг</th><th>Эффект</th><th>Цена</th></tr>" +
      "<tr><td>Увеличить панель</td><td>+56 Вт·ч на каждые 50 Вт</td><td>Самый дешёвый ватт в смете</td></tr>" +
      "<tr><td>Нарастить ёмкость</td><td>+1 150 Вт·ч на блок</td><td>Самая дорогая строка</td></tr>" +
      "<tr><td>Снизить нагрузку</td><td>Каждый 1 Вт = 24 Вт·ч</td><td>Практически бесплатно</td></tr></table>" +
      "<h4>Чем снижают нагрузку</h4><ul><li>ночью держат роутер в LTE, а не в 5G;</li><li>включают аналитику хаба только на нужных камерах;</li><li>не преобразуют 12 В лишний раз: устройства питаются напрямую.</li></ul>" +
      "<p class='ogoh'>Комплект, собранный по летнему расчёту, выключится в январе на третий день. Расчёт всегда начинают с декабря, а после первой зимы пилота смотрят журнал минимального заряда.</p>" }
},

"y01.q-bms": {
  yorliq: "Moliya va huquq", sarlavha: "Shartnomaga kiritiladigan bitta band",
  tana: "<p>Talab quyidagicha yoziladi: <b>akkumulyator batareyasining boshqaruv tizimi (BMS) harorat 0 °C dan pastga tushganda zaryadni avtomatik to'xtatishi va harorat +5 °C dan oshgach tiklashi shart.</b></p>" +
    "<h4>Qanday tekshiriladi</h4><ul><li>BMS datasheet'ida <code>charge low temperature protection</code> parametri bo'ladi: to'xtatish nuqtasi 0…+2 °C, tiklanish +5 °C atrofida;</li><li>blokda harorat datchigi qayerda turgani so'raladi — hujayra yonida bo'lishi kerak, korpusda emas;</li><li>pilotda birinchi sovuq tunda zaryad jarayoni jurnaldan ko'riladi.</li></ul>" +
    "<p class='ogoh'>Bu band bo'lmasa, quyosh kontrolleri sovuq kunda akkumulyatorni zaryadlaydi va bank bir qishda barcha bloklarni yo'qotishi mumkin. Blok narxi 4 mln so'mdan, 267 obyektda bu butun yillik servis byudjetiga teng summa.</p>",
  ru: { yorliq: "Финансы и право", sarlavha: "Один пункт, который вносят в договор",
    tana: "<p>Формулировка такая: <b>система управления батареей (BMS) обязана автоматически прекращать заряд при температуре ниже 0 °C и возобновлять его после +5 °C.</b></p>" +
      "<h4>Как это проверяют</h4><ul><li>в паспорте BMS есть параметр <code>charge low temperature protection</code>: порог отсечки 0…+2 °C, восстановление около +5 °C;</li><li>уточняют, где стоит датчик температуры — он должен быть у ячейки, а не на корпусе;</li><li>в пилоте после первой морозной ночи смотрят журнал заряда.</li></ul>" +
      "<p class='ogoh'>Без этого пункта солнечный контроллер зарядит батарею в мороз, и банк может за одну зиму потерять все блоки. Блок стоит от 4 млн сум — на 267 объектах это сумма годового сервисного бюджета целиком.</p>" }
},

"y01.y-kamera": {
  yorliq: "Montajchi uchun", sarlavha: "Kamera va hub orasidagi Wi-Fi",
  tana: "<p>Bu zanjirning eng nozik bo'g'ini, chunki uni operator ham, adapter ham ko'rmaydi — faqat hub ilovasidagi daraja ko'rsatadi.</p>" +
    "<table><tr><th>Daraja</th><th>Holat</th></tr>" +
    "<tr><td>−55…−65 dBm</td><td>Ishonchli, 4K oqim ham o'tadi</td></tr>" +
    "<tr><td>−65…−75 dBm</td><td>Ishlaydi, kadr tushishi bo'lishi mumkin</td></tr>" +
    "<tr><td>−75 dBm dan past</td><td>Qayta ulanish tsikli, batareya tez tugaydi</td></tr></table>" +
    "<p>2,4 GHz uzoqroqqa yetadi, 5 GHz esa yuqori ruxsatli oqim uchun. Metall darvoza, temir-beton devor va ombordagi metall javonlar signalni sezilarli yeydi.</p>" +
    "<p class='ogoh'>O'lchov montaj kunida, kamera doimiy joyiga mahkamlangandan keyin qilinadi. Qo'lda ushlab o'lchangan daraja haqiqiy holatni ko'rsatmaydi.</p>",
  ru: { yorliq: "Для монтажника", sarlavha: "Wi-Fi между камерой и хабом",
    tana: "<p>Самое хрупкое звено цепи: его не видит ни оператор, ни адаптер — только уровень в приложении хаба.</p>" +
      "<table><tr><th>Уровень</th><th>Состояние</th></tr>" +
      "<tr><td>−55…−65 дБм</td><td>Надёжно, проходит и поток 4K</td></tr>" +
      "<tr><td>−65…−75 дБм</td><td>Работает, возможны выпадения кадров</td></tr>" +
      "<tr><td>Ниже −75 дБм</td><td>Цикл переподключений, батарея садится быстро</td></tr></table>" +
      "<p>2,4 ГГц бьёт дальше, 5 ГГц нужен для потока высокого разрешения. Металлические ворота, железобетон и стеллажи на складе заметно съедают сигнал.</p>" +
      "<p class='ogoh'>Замер делают в день монтажа и уже после того, как камера закреплена на своём месте. Уровень, измеренный «с рук», реальной картины не показывает.</p>" }
},

"y01.y-hub": {
  yorliq: "Jamoa rahbarlari uchun", sarlavha: "Hub tomonidagi tarmoq sozlamasi",
  tana: "<p>Hub tunnel ichida doimiy manzil oladi va faqat shu manzil bo'yicha so'raladi. Obyektdan tashqariga hech qanday port ochilmaydi.</p>" +
    "<table><tr><th>Port</th><th>Nima uchun</th></tr>" +
    "<tr><td>443</td><td>Boshqaruv va <code>api.cgi</code> so'rovlari</td></tr>" +
    "<tr><td>554</td><td>RTSP oqimi</td></tr>" +
    "<tr><td>8000</td><td>ONVIF</td></tr>" +
    "<tr><td>9000</td><td>Hodisa push kanali</td></tr></table>" +
    "<h4>Hisob va vaqt</h4><p>Adapter uchun alohida hisob yaratiladi va unga faqat ko'rish huquqi beriladi: sozlamani o'zgartirish, kamerani o'chirish va yozuvni tozalash taqiqlanadi. NTP serveri bank tarmog'idagi manzilga qaratiladi, aks holda klip vaqti hodisa vaqtiga to'g'ri kelmaydi.</p>" +
    "<p class='ogoh'>Mikrodastur versiyasi topshirish dalolatnomasiga yoziladi va avtomatik yangilanish o'chiriladi. Yangi versiya avval sinov hub'ida tekshiriladi.</p>",
  ru: { yorliq: "Для тимлида", sarlavha: "Сетевые настройки на стороне хаба",
    tana: "<p>Хаб получает постоянный адрес внутри туннеля, и обращаются к нему только по этому адресу. Наружу с объекта не открывается ни один порт.</p>" +
      "<table><tr><th>Порт</th><th>Для чего</th></tr>" +
      "<tr><td>443</td><td>Управление и запросы <code>api.cgi</code></td></tr>" +
      "<tr><td>554</td><td>Поток RTSP</td></tr>" +
      "<tr><td>8000</td><td>ONVIF</td></tr>" +
      "<tr><td>9000</td><td>Канал push-событий</td></tr></table>" +
      "<h4>Учётная запись и время</h4><p>Для адаптера заводят отдельную запись только на просмотр: менять настройки, отключать камеры и чистить записи ей запрещено. NTP указывают на сервер в сети банка, иначе время клипа разойдётся со временем события.</p>" +
      "<p class='ogoh'>Версию прошивки вносят в акт сдачи, автообновление выключают. Новую версию сначала проверяют на тестовом хабе.</p>" }
},

"y01.y-router": {
  yorliq: "Jamoa rahbarlari uchun", sarlavha: "Tunnel: oq IP yo'q, ulanishni obyekt boshlaydi",
  tana: "<p>Mobil operator SIM-kartaga oq IP bermaydi, shuning uchun markaz obyektga o'zi ulana olmaydi. Router bank tomonidagi konsentratorga chiquvchi tunnel ochadi va uni tirik ushlab turadi.</p>" +
    "<table><tr><th>Parametr</th><th>Qiymat</th></tr>" +
    "<tr><td>Protokol</td><td>WireGuard yoki IPsec</td></tr>" +
    "<tr><td>Keepalive</td><td>25 soniya</td></tr>" +
    "<tr><td>MTU</td><td>1380, fragmentatsiyani oldini olish uchun</td></tr>" +
    "<tr><td>SIM o'tishi</td><td>Uch marta ping javobsiz qolsa</td></tr></table>" +
    "<p>Ikkinchi SIM boshqa operatorniki bo'lishi shart: bitta operatorning bazaviy stansiyasi ishdan chiqsa, ikkita SIM ham bir vaqtda yo'qoladi.</p>" +
    "<p class='ogoh'>Router SNMP yoki API orqali RSRP, SINR, faol SIM va trafikni beradi. Bu ma'lumot bo'lmasa, nosozlikni faqat obyektga borib aniqlash mumkin — bu esa har safar bir kunlik yo'l.</p>",
  ru: { yorliq: "Для тимлида", sarlavha: "Туннель: белого IP нет, соединение начинает объект",
    tana: "<p>Оператор не выдаёт SIM белый IP, поэтому центр не может подключиться к объекту сам. Роутер поднимает исходящий туннель к концентратору банка и удерживает его.</p>" +
      "<table><tr><th>Параметр</th><th>Значение</th></tr>" +
      "<tr><td>Протокол</td><td>WireGuard или IPsec</td></tr>" +
      "<tr><td>Keepalive</td><td>25 секунд</td></tr>" +
      "<tr><td>MTU</td><td>1380, чтобы избежать фрагментации</td></tr>" +
      "<tr><td>Переход на вторую SIM</td><td>После трёх неотвеченных пингов</td></tr></table>" +
      "<p>Вторая SIM обязательно другого оператора: при аварии одной базовой станции обе карты одного оператора пропадут одновременно.</p>" +
      "<p class='ogoh'>Роутер отдаёт по SNMP или API уровень RSRP, SINR, активную SIM и трафик. Без этих данных причину сбоя можно выяснить только на объекте — а это каждый раз полный день дороги.</p>" }
},

"y01.y-adapter": {
  yorliq: "Jamoa rahbarlari uchun", sarlavha: "Adapter: sessiya, qayta ulanish, vaqt",
  tana: "<p>Adapter hub bilan uchta holatda ishlaydi va uchalasi ham loyihalashtirilgan xulq.</p>" +
    "<h4>Sessiya</h4><p><code>POST /api.cgi?cmd=Login</code> bir soatlik token qaytaradi. Adapter tokenni muddati tugashidan besh daqiqa oldin yangilaydi.</p>" +
    "<h4>Qayta ulanish</h4><p>Push kanali uzilsa 5, 15 va 60 soniyalik oraliqlar bilan qayta urinadi. Uch urinish ham natija bermasa, obyekt bo'yicha <code>aloqa_yoq</code> hodisasi ochiladi va uzilish vaqti yoziladi.</p>" +
    "<h4>Vaqt</h4><p>Qurilma soati adashishi mumkin. Farq 2 daqiqadan oshsa server vaqti olinadi va hodisaga <code>vaqt_tuzatildi</code> belgisi qo'yiladi. Xom javob alohida jadvalda 30 kun saqlanadi va API'ga chiqmaydi.</p>" +
    "<p class='ogoh'>Uxlab turgan kamera sababli RTSP so'rovida kutish vaqti kamida 20 soniya qo'yiladi. Odatiy 5 soniyalik timeout bilan oqim hech qachon ochilmaydi va bu «nosozlik» deb qayd etiladi.</p>",
  ru: { yorliq: "Для тимлида", sarlavha: "Адаптер: сессия, переподключение, время",
    tana: "<p>Адаптер работает с хабом в трёх режимах, и все три — задуманное поведение.</p>" +
      "<h4>Сессия</h4><p><code>POST /api.cgi?cmd=Login</code> возвращает токен на час. Адаптер обновляет его за пять минут до истечения.</p>" +
      "<h4>Переподключение</h4><p>Если push-канал оборвался, повтор идёт через 5, 15 и 60 секунд. Когда и третья попытка не удалась, по объекту открывается событие <code>aloqa_yoq</code> и фиксируется время обрыва.</p>" +
      "<h4>Время</h4><p>Часы устройства могут уйти. При расхождении больше 2 минут берётся серверное время, а событию ставится отметка <code>vaqt_tuzatildi</code>. Сырой ответ хранится в отдельной таблице 30 дней и наружу не отдаётся.</p>" +
      "<p class='ogoh'>Камера спит, поэтому тайм-аут RTSP-запроса ставят не меньше 20 секунд. С привычными пятью секундами поток не откроется никогда, и это запишут как «неисправность».</p>" }
},

"y01.y-platforma": {
  yorliq: "Jamoa rahbarlari uchun", sarlavha: "Platforma tomonida nima bo'ladi",
  tana: "<p>Adapterdan narida brend tugaydi. Platforma har doim bir xil o'nta maydonli yozuvni oladi va uning ustida to'rtta ish bajaradi.</p>" +
    "<ol><li><b>Takrorni kesish.</b> Bir hodisa push va so'rov orqali ikki marta kelishi mumkin: qurilma, tur va vaqt bo'yicha 10 soniyalik oyna ichida birlashtiriladi.</li>" +
    "<li><b>Dalilni biriktirish.</b> Klip omborga yoziladi, sha256 xeshi hisoblanadi va hodisa kartasiga bog'lanadi.</li>" +
    "<li><b>Obyekt indeksini qayta hisoblash.</b> Hodisa turi va javob vaqti nazorat indeksiga kiradi.</li>" +
    "<li><b>Vazifa ochish.</b> Buzish, tutun yoki uzoq aloqasizlik bo'yicha mas'ul xodimga vazifa yaratiladi va muddat qo'yiladi.</li></ol>" +
    "<p class='ogoh'>Platformaga hodisa turi keladi, kamera modeli reyestrda qoladi. Shuning uchun keyingi tenderda brend almashsa, hisobotlar, indekslar va muddatlar o'zgarmaydi.</p>",
  ru: { yorliq: "Для тимлида", sarlavha: "Что происходит на стороне платформы",
    tana: "<p>За адаптером бренд заканчивается. Платформа всегда получает одну и ту же запись из десяти полей и делает с ней четыре вещи.</p>" +
      "<ol><li><b>Снимает дубли.</b> Одно событие может прийти дважды — через push и через опрос: записи склеиваются по устройству, типу и времени в окне 10 секунд.</li>" +
      "<li><b>Прикрепляет доказательство.</b> Клип уходит в хранилище, считается хеш sha256 и привязывается к карточке события.</li>" +
      "<li><b>Пересчитывает индекс объекта.</b> Тип события и время реакции входят в контрольный индекс.</li>" +
      "<li><b>Создаёт задачу.</b> По вскрытию, дыму и долгому отсутствию связи ответственному ставится задача со сроком.</li></ol>" +
      "<p class='ogoh'>В платформу приходит тип события; модель камеры остаётся в реестре. Поэтому смена бренда на следующем тендере не меняет ни отчёты, ни индексы, ни сроки.</p>" }
},

"y01.p-rtsp": {
  yorliq: "Jamoa rahbarlari uchun", sarlavha: "RTSP: kanal raqami va transport",
  tana: "<p>Ikkita nozik joy bor va ikkalasi ham birinchi integratsiyada vaqt yeydi.</p>" +
    "<h4>Kanal raqami</h4><p>URL'da kanal birdan boshlanadi (<code>h264Preview_01_main</code>), API javobida esa noldan (<code>channel=0</code>). Adapter URL tuzayotganda birni qo'shadi. Buni unutish — eng ko'p uchraydigan xato.</p>" +
    "<h4>Transport</h4><p>4G kanalida RTSP faqat TCP orqali so'raladi. UDP paketlari yo'qolganda tasvir buziladi va operator buni «kamera ishlamayapti» deb tushunadi.</p>" +
    "<h4>Qaysi oqim</h4><p>Panelda qo'shimcha oqim ochiladi, asosiysi faqat operator kattalashtirganda. Bu 4G trafigini bir necha barobar tejaydi.</p>" +
    "<p class='ogoh'>Sessiya taxminan besh daqiqadan keyin uziladi, chunki kamera uyquga qaytadi. Adapter buni xato deb belgilamaydi; operator yana so'rasa, oqim qaytadan ochiladi.</p>",
  ru: { yorliq: "Для тимлида", sarlavha: "RTSP: нумерация каналов и транспорт",
    tana: "<p>Здесь два тонких места, и оба съедают время на первой интеграции.</p>" +
      "<h4>Номер канала</h4><p>В URL канал считается с единицы (<code>h264Preview_01_main</code>), а в ответе API — с нуля (<code>channel=0</code>). Адаптер прибавляет единицу при сборке URL. Забыть об этом — самая частая ошибка.</p>" +
      "<h4>Транспорт</h4><p>В канале 4G поток запрашивают только по TCP. При потере UDP-пакетов картинка рассыпается, и оператор читает это как «камера не работает».</p>" +
      "<h4>Какой поток</h4><p>На панели открывают дополнительный поток, основной — только при увеличении. Это экономит трафик 4G в несколько раз.</p>" +
      "<p class='ogoh'>Сессия обрывается примерно через пять минут, потому что камера уходит в сон. Адаптер не считает это ошибкой; по новому запросу оператора поток открывается заново.</p>" }
},

"y01.p-hodisa": {
  yorliq: "Texnik izoh", sarlavha: "Hodisa qancha vaqtda operator ekraniga chiqadi",
  tana: "<p>Kechikish byudjeti bo'laklardan yig'iladi va har bo'lakning o'z sababi bor.</p>" +
    "<table><tr><th>Bosqich</th><th>Vaqt</th></tr>" +
    "<tr><td>PIR ishlashi va kamera uyg'onishi</td><td>0,6 s</td></tr>" +
    "<tr><td>Yozuvning boshlanishi</td><td>1,0–1,5 s</td></tr>" +
    "<tr><td>Hub tahlili (odam yoki mashina)</td><td>0,5–1,0 s</td></tr>" +
    "<tr><td>Push kanali orqali adapterga</td><td>0,3–1,0 s</td></tr>" +
    "<tr><td>Platformada yozish va bildirishnoma</td><td>1–3 s</td></tr>" +
    "<tr><td><b>Jami</b></td><td><b>4–8 soniya</b></td></tr></table>" +
    "<p>Push kanali ko'tarilmagan bo'lsa, adapter besh soniyalik so'rovga o'tadi va jami vaqt 10–13 soniyaga cho'ziladi.</p>" +
    "<p class='ogoh'>Klip xabardan kechroq keladi: adapter uni microSD'dan alohida oladi. Operator avval matnli xabarni ko'radi, video esa odatda 10–30 soniyadan keyin kartaga biriktiriladi.</p>",
  ru: { yorliq: "Техническая справка", sarlavha: "За сколько событие доходит до экрана оператора",
    tana: "<p>Бюджет задержки складывается из кусков, и у каждого куска своя причина.</p>" +
      "<table><tr><th>Этап</th><th>Время</th></tr>" +
      "<tr><td>Срабатывание PIR и пробуждение камеры</td><td>0,6 с</td></tr>" +
      "<tr><td>Начало записи</td><td>1,0–1,5 с</td></tr>" +
      "<tr><td>Анализ на хабе (человек или машина)</td><td>0,5–1,0 с</td></tr>" +
      "<tr><td>Push-канал до адаптера</td><td>0,3–1,0 с</td></tr>" +
      "<tr><td>Запись в платформу и уведомление</td><td>1–3 с</td></tr>" +
      "<tr><td><b>Итого</b></td><td><b>4–8 секунд</b></td></tr></table>" +
      "<p>Если push-канал не поднят, адаптер переходит на опрос раз в пять секунд, и общее время растягивается до 10–13 секунд.</p>" +
      "<p class='ogoh'>Клип приходит позже уведомления: адаптер забирает его с microSD отдельно. Оператор сначала видит текстовое сообщение, видео прикрепляется к карточке обычно через 10–30 секунд.</p>" }
},

"y01.p-sxema": {
  yorliq: "Jamoa rahbarlari uchun", sarlavha: "Yagona sxema: nima yuboriladi, nima yo'q",
  tana: "<p>Sxema brenddan mustaqil va yopiq. Yangi maydon faqat qo'shiladi; borini o'chirish yoki ma'nosini o'zgartirish <code>/api/v2</code> degani.</p>" +
    "<table><tr><th>Maydon</th><th>Qoida</th></tr>" +
    "<tr><td><code>obyekt_id</code></td><td>Reyestrdagi kalit; qiymat reyestrdan olinadi, qurilma yuborgani e'tiborga olinmaydi</td></tr>" +
    "<tr><td><code>tur</code></td><td>Yopiq ro'yxat: harakat, eshik, tutun, buzish, batareya_past, aloqa_yoq</td></tr>" +
    "<tr><td><code>vaqt</code></td><td>ISO-8601, faqat UTC va «Z»</td></tr>" +
    "<tr><td><code>ishonch</code></td><td>0–1; brend bermasa <code>null</code>, taxmin qo'yilmaydi</td></tr>" +
    "<tr><td><code>sha256</code></td><td>Klip xeshi, qabul paytida hisoblanadi</td></tr></table>" +
    "<h4>Yuborilmaydigan narsalar</h4><p>Xom vendor javobi, hisob paroli, kameraning ichki identifikatori va tunnel manzillari API'ga chiqmaydi. Klip havolasi ochiq emas: fayl imzoli va qisqa muddatli havola bilan olinadi.</p>",
  ru: { yorliq: "Для тимлида", sarlavha: "Единая схема: что уходит, а что нет",
    tana: "<p>Схема не зависит от бренда и закрыта. Новое поле можно только добавить; удалить существующее или изменить его смысл — это уже <code>/api/v2</code>.</p>" +
      "<table><tr><th>Поле</th><th>Правило</th></tr>" +
      "<tr><td><code>obyekt_id</code></td><td>Ключ из реестра; то, что прислало устройство, игнорируется</td></tr>" +
      "<tr><td><code>tur</code></td><td>Закрытый перечень: движение, дверь, дым, вскрытие, низкий заряд, нет связи</td></tr>" +
      "<tr><td><code>vaqt</code></td><td>ISO-8601, только UTC с «Z»</td></tr>" +
      "<tr><td><code>ishonch</code></td><td>0–1; если бренд не даёт — <code>null</code>, догадки не подставляются</td></tr>" +
      "<tr><td><code>sha256</code></td><td>Хеш клипа, считается при приёме</td></tr></table>" +
      "<h4>Что не уходит наружу</h4><p>Сырой ответ вендора, пароль учётной записи, внутренний идентификатор камеры и адреса туннеля в API не попадают. Ссылка на клип не публичная: файл забирают по подписанной короткоживущей ссылке.</p>" }
},

"y01.o-jonli": {
  yorliq: "Texnik izoh", sarlavha: "Jonli video: besh daqiqalik seans",
  tana: "<p>Operator «jonli» tugmasini bosganda hub kamerani uyg'otadi. Tasvir 3–6 soniyada keladi, seans taxminan besh daqiqa davom etadi, keyin kamera uyquga qaytadi.</p>" +
    "<table><tr><th>Ko'rsatkich</th><th>Qiymat</th></tr>" +
    "<tr><td>Ochilish vaqti</td><td>3–6 s</td></tr>" +
    "<tr><td>Qo'shimcha oqim tezligi</td><td>1,5–3 Mbit/s</td></tr>" +
    "<tr><td>Asosiy oqim tezligi</td><td>6–12 Mbit/s</td></tr>" +
    "<tr><td>Bir seansdagi trafik</td><td>60–130 MB</td></tr></table>" +
    "<p>Shuning uchun oylik trafikning asosiy hajmini operatorlarning jonli ko'rishlari beradi. Tarif pilotdagi haqiqiy sarf bo'yicha tanlanadi.</p>" +
    "<p class='ogoh'>Uzoq gaplashish va sirena kamera akkumulyatorini tez bo'shatadi. Ikki tomonlama ovoz — qisqa ogohlantirish uchun vosita, suhbat uchun emas.</p>",
  ru: { yorliq: "Техническая справка", sarlavha: "Живое видео: сессия на пять минут",
    tana: "<p>Когда оператор жмёт «живое видео», хаб будит камеру. Картинка приходит за 3–6 секунд, сессия длится около пяти минут, затем камера снова засыпает.</p>" +
      "<table><tr><th>Параметр</th><th>Значение</th></tr>" +
      "<tr><td>Время открытия</td><td>3–6 с</td></tr>" +
      "<tr><td>Битрейт дополнительного потока</td><td>1,5–3 Мбит/с</td></tr>" +
      "<tr><td>Битрейт основного потока</td><td>6–12 Мбит/с</td></tr>" +
      "<tr><td>Трафик за сессию</td><td>60–130 МБ</td></tr></table>" +
      "<p>Поэтому основной объём месячного трафика дают не события, а просмотры операторов. Тариф подбирают по фактическому расходу в пилоте.</p>" +
      "<p class='ogoh'>Долгий разговор и сирена быстро сажают аккумулятор камеры. Двусторонний звук — инструмент короткого предупреждения, а не беседы.</p>" }
},

"y01.o-eshik": {
  yorliq: "Montajchi uchun", sarlavha: "Eshikni ochish: zanjir va zamok tanlovi",
  tana: "<p>Reolink komplektida rele chiqishi yo'q, shuning uchun kirish uchun alohida zanjir yig'iladi: 12 V kirish kontrolleri va zamok, o'sha akkumulyatordan alohida saqlagich bilan oziqlanadi.</p>" +
    "<table><tr><th>Zamok turi</th><th>Kutish toki</th><th>Yaroqli</th></tr>" +
    "<tr><td>Elektromexanik</td><td>0 Vt</td><td>Ha</td></tr>" +
    "<tr><td>Motorli</td><td>0 Vt</td><td>Ha</td></tr>" +
    "<tr><td>Elektromagnit</td><td>3–6 Vt doimiy</td><td>Yo'q</td></tr></table>" +
    "<p>Elektromagnit zamok yopiq holatni ushlab turish uchun to'xtovsiz tok oladi va u yolg'iz o'zi hub bilan routerning butun sarfiga teng. Elektrsiz obyektda bunday zamok qo'yilmaydi.</p>" +
    "<p class='ogoh'>Ochish buyrug'i platformadan tunnel orqali boradi. Jurnalga kim, qachon va qaysi ariza bo'yicha ochgani yoziladi — ko'rikdan keyin xaridor da'vo qilsa, dalil shu yozuvdan olinadi.</p>",
  ru: { yorliq: "Для монтажника", sarlavha: "Открытие двери: цепь и выбор замка",
    tana: "<p>В комплекте Reolink нет релейного выхода, поэтому для доступа собирают отдельную цепь: контроллер 12 В и замок питаются от того же аккумулятора через собственный предохранитель.</p>" +
      "<table><tr><th>Тип замка</th><th>Ток покоя</th><th>Годится</th></tr>" +
      "<tr><td>Электромеханический</td><td>0 Вт</td><td>Да</td></tr>" +
      "<tr><td>Моторный</td><td>0 Вт</td><td>Да</td></tr>" +
      "<tr><td>Электромагнитный</td><td>3–6 Вт постоянно</td><td>Нет</td></tr></table>" +
      "<p>Электромагнитный замок потребляет ток непрерывно, чтобы удерживать дверь, и один съедает столько же, сколько хаб с роутером вместе. На объекте без электричества такой замок не ставят.</p>" +
      "<p class='ogoh'>Команда на открытие идёт из платформы через туннель. В журнал попадает, кто, когда и по какой заявке открыл, — если после осмотра покупатель предъявит претензию, доказательство берут из этой записи.</p>" }
},

"y01.m-brigada": {
  yorliq: "Moliya va huquq", sarlavha: "Brigada, litsenziya va topshirish",
  tana: "<p>Ish ikki kishiga bo'linadi va ularning mas'uliyati ham ajratiladi.</p>" +
    "<table><tr><th>Kim</th><th>Nima qiladi</th></tr>" +
    "<tr><td>Montajchi</td><td>Kronshteyn, kabel, shkaf, quvvat zanjiri</td></tr>" +
    "<tr><td>Tarmoq muhandisi</td><td>Hub, router, tunnel, platformada ro'yxatga olish</td></tr></table>" +
    "<h4>Litsenziya</h4><p>Qo'riqlash signalizatsiyasi va yong'inga qarshi avtomatikani loyihalash hamda montaj qilish litsenziyalanadigan faoliyat. Litsenziyasiz bajarilgan ish sug'urta hodisasida to'lovni rad etish asosi bo'lishi mumkin, shuning uchun litsenziya nusxasi shartnomaga ilova qilinadi.</p>" +
    "<p class='ogoh'>Topshirish dalolatnomasisiz obyekt qabul qilinmaydi. Dalolatnomada o'lchangan kutish toki, har kameraning Wi-Fi darajasi, RSRP qiymati, mikrodastur versiyasi va sinov hodisasining vaqti bo'ladi.</p>",
  manba: [["Litsenziyalash to'g'risidagi hujjat", "https://lex.uz/docs/-4029777"]],
  ru: { yorliq: "Финансы и право", sarlavha: "Бригада, лицензия и сдача объекта",
    tana: "<p>Работа делится на двоих, и ответственность тоже разделена.</p>" +
      "<table><tr><th>Кто</th><th>Что делает</th></tr>" +
      "<tr><td>Монтажник</td><td>Кронштейны, кабель, шкаф, силовая цепь</td></tr>" +
      "<tr><td>Сетевой инженер</td><td>Хаб, роутер, туннель, регистрация в платформе</td></tr></table>" +
      "<h4>Лицензия</h4><p>Проектирование и монтаж охранной сигнализации и противопожарной автоматики — лицензируемая деятельность. Работа без лицензии может стать основанием для отказа в страховой выплате, поэтому копию лицензии прикладывают к договору.</p>" +
      "<p class='ogoh'>Без акта сдачи объект не принимают. В акте — измеренный ток покоя, уровень Wi-Fi по каждой камере, значение RSRP, версия прошивки и время тестового события.</p>" }
},

"y01.m-mahkam": {
  yorliq: "Montajchi uchun", sarlavha: "Kronshteyn birinchi bo'lib ishdan chiqadi",
  tana: "<p>Kamera yengil, lekin kronshteyn shamol, qor va haroratning kunlik o'zgarishi ostida ishlaydi. Amalda eng ko'p uchraydigan nosozlik — kadrning siljishi.</p>" +
    "<ul><li>Uchta 6×40 dyubel, beton yoki g'ishtga. Pardoz qatlami va gips-karton hisobga olinmaydi.</li>" +
    "<li>Kabel pastdan kiritiladi: suv kronshteyn bo'ylab oqib, ulanishga tushmasin. Kabelda tomchi halqasi qoldiriladi.</li>" +
    "<li>Teshik atrofi neytral germetik bilan yopiladi. Sirka asosidagi germetik metall qismni yeydi.</li>" +
    "<li>Mahkamlash momenti ortiqcha bo'lmasin: plastik kronshteyn qattiq tortilganda sovuqda yorilib ketadi.</li></ul>" +
    "<p class='ogoh'>O'rnatilgandan keyin kadr ekrandan tasdiqlanadi va shu holat surati dalolatnomaga biriktiriladi. Keyingi ko'rikda kadr shu surat bilan solishtiriladi: siljish shu tarzda birinchi kunidayoq ko'rinadi.</p>",
  ru: { yorliq: "Для монтажника", sarlavha: "Первым выходит из строя кронштейн",
    tana: "<p>Камера лёгкая, но кронштейн живёт под ветром, снегом и суточными перепадами температуры. На практике самая частая неисправность — сползший кадр.</p>" +
      "<ul><li>Три дюбеля 6×40, в бетон или кирпич. Отделочный слой и гипсокартон в расчёт не идут.</li>" +
      "<li>Ввод кабеля снизу: вода не должна стекать по кронштейну в разъём. На кабеле оставляют каплесборную петлю.</li>" +
      "<li>Отверстие закрывают нейтральным герметиком. Уксусный разъедает металл.</li>" +
      "<li>Момент затяжки не завышают: перетянутый пластиковый кронштейн трескается на морозе.</li></ul>" +
      "<p class='ogoh'>После установки кадр подтверждают с экрана, и его снимок прикладывают к акту. На следующем осмотре кадр сверяют с этим снимком — так сползание замечают в первый же день.</p>" }
},

"y01.m-burchak": {
  yorliq: "Montajchi uchun", sarlavha: "PIR geometriyasi: kamera qayerga qaratiladi",
  tana: "<p>PIR datchik harorat farqining sensor zonalarini kesib o'tishini sezadi. Shuning uchun u yon tomondan o'tayotgan odamni ishonchli, to'g'ri kelayotganini ancha kech aniqlaydi.</p>" +
    "<ul><li>Balandlik 2,6–3,2 m: pastda kamera qo'l yetadigan joyda, balandda PIR maydoni yerdan uzoqlashadi.</li>" +
    "<li>Yo'lakka 30–45° burchak ostida qaratiladi, to'g'ri qarshisiga emas.</li>" +
    "<li>Kadrga daraxt shoxi, bayroq, ko'cha chiroqining nurida chayqaladigan narsa tushmasin: ularning har biri tunda o'nlab yolg'on hodisa beradi.</li>" +
    "<li>Isitish qurilmasi, mo'ri va quyoshda qiziydigan metall yuza PIR uchun issiqlik manbai hisoblanadi.</li></ul>" +
    "<p class='ogoh'>Yolg'on hodisalar akkumulyatorni yeydi va operatorni ko'niktiradi: haqiqiy signalga ham e'tibor bermay qo'yadi. Sezgirlikni pasaytirishdan oldin har doim kadr chegarasini tuzating.</p>",
  ru: { yorliq: "Для монтажника", sarlavha: "Геометрия PIR: куда направляют камеру",
    tana: "<p>PIR ловит пересечение своих зон объектом с иной температурой. Поэтому человека, идущего поперёк, он видит уверенно, а идущего прямо на камеру — с большим опозданием.</p>" +
      "<ul><li>Высота 2,6–3,2 м: ниже камера в пределах досягаемости руки, выше зона PIR уходит от земли.</li>" +
      "<li>Направляют под углом 30–45° к проходу.</li>" +
      "<li>В кадр не должны попадать ветка, флаг и всё, что качается в свете фонаря: каждый такой объект даёт за ночь десятки ложных событий.</li>" +
      "<li>Обогреватель, дымоход и нагретая солнцем металлическая поверхность для PIR — источники тепла.</li></ul>" +
      "<p class='ogoh'>Ложные события съедают заряд и приучают оператора не реагировать — в том числе на настоящий сигнал. Прежде чем снижать чувствительность, всегда сначала поправьте границы кадра.</p>" }
},

"y01.n-nima": {
  yorliq: "Moliya va huquq", sarlavha: "Smetani nima qimmatlashtiradi",
  tana: "<p>Odatiy xato — narxni kamera soni bo'yicha solishtirish. Bu yechimda kamera eng arzon o'zgaruvchi.</p>" +
    "<table><tr><th>Qaror</th><th>Smetaga ta'siri</th></tr>" +
    "<tr><td>To'rtinchi kamera</td><td>+1,5–2,0 mln so'm</td></tr>" +
    "<tr><td>Avtonomiya 7 kundan 27 kunga</td><td>+1,0–1,5 mln so'm, servisda −80%</td></tr>" +
    "<tr><td>Kirish kontrolleri va zamok</td><td>+2,0–4,0 mln so'm</td></tr>" +
    "<tr><td>Ikkinchi microSD, sanoat sinfi</td><td>+0,3–0,6 mln so'm</td></tr></table>" +
    "<p>Ikkinchi qator eng foydalisi: bir yillik tashriflar bitta panel narxidan bir necha barobar qimmat turadi.</p>" +
    "<p class='ogoh'>Xarid shartini «zaryadsiz kamida 25 kun» deb yozing. Shunda sotuvchi panelni va akkumulyatorni o'zi hisoblaydi va taklifni solishtirish oson bo'ladi.</p>",
  ru: { yorliq: "Финансы и право", sarlavha: "Что делает смету дороже",
    tana: "<p>Типичная ошибка — сравнивать цену по числу камер. В этом решении камера как раз самая дешёвая переменная.</p>" +
      "<table><tr><th>Решение</th><th>Влияние на смету</th></tr>" +
      "<tr><td>Четвёртая камера</td><td>+1,5–2,0 млн сум</td></tr>" +
      "<tr><td>Автономия с 7 до 27 дней</td><td>+1,0–1,5 млн сум, сервис −80%</td></tr>" +
      "<tr><td>Контроллер доступа и замок</td><td>+2,0–4,0 млн сум</td></tr>" +
      "<tr><td>Вторая карта microSD, индустриальная</td><td>+0,3–0,6 млн сум</td></tr></table>" +
      "<p>Самая выгодная — вторая строка: год выездов стоит в несколько раз дороже одной панели.</p>" +
      "<p class='ogoh'>Запишите в условия закупки «не менее 25 дней без подзарядки». Тогда поставщик сам посчитает панель и аккумулятор, а предложения станет легко сравнивать.</p>" }
},

"y01.n-kurs": {
  yorliq: "Moliya va huquq", sarlavha: "Kurs va yetkazib berish muddati",
  tana: "<p>Smetaning taxminan 60% i import qatorlaridan iborat: hub, kamera va router. Qolgani mahalliy — akkumulyator, panel, kronshteyn, kabel va ish haqi.</p>" +
    "<h4>Shartnomaga yoziladigan uch band</h4><ul><li>narx qaysi kunning Markaziy bank kursida hisoblangani;</li>" +
    "<li>taklif necha kun amal qilishi va kurs qancha o'zgarganda qayta ko'rilishi;</li>" +
    "<li>yetkazib berish muddati va kechikkanda jarima.</li></ul>" +
    "<p>Reolink rasmiy kanal orqali kelmagani uchun yetkazib berish muddati ko'pincha 4–8 haftaga cho'ziladi. Pilot rejasida bu muddat oldindan hisobga olinadi, aks holda montaj brigadasi bo'sh turadi.</p>" +
    "<p class='ogoh'>Almashtirish fondi ham kursga bog'liq qator. Kelishuvda uning narxi bir yilga qotiriladi, aks holda nosoz hub o'rniga yangisini olish keyingi yilda qimmatroqqa tushadi.</p>",
  ru: { yorliq: "Финансы и право", sarlavha: "Курс и сроки поставки",
    tana: "<p>Примерно 60% сметы — импортные строки: хаб, камеры и роутер. Остальное местное: аккумулятор, панель, кронштейны, кабель и работа.</p>" +
      "<h4>Три пункта в договор</h4><ul><li>на курс Центрального банка какого дня посчитана цена;</li>" +
      "<li>сколько дней действует предложение и при каком изменении курса оно пересматривается;</li>" +
      "<li>срок поставки и штраф за его нарушение.</li></ul>" +
      "<p>Reolink не идёт через официальный канал, поэтому поставка часто растягивается на 4–8 недель. В плане пилота этот срок учитывают заранее, иначе монтажная бригада будет простаивать.</p>" +
      "<p class='ogoh'>Подменный фонд — тоже курсовая строка. Его цену фиксируют на год, иначе замена неисправного хаба в следующем году обойдётся дороже.</p>" }
},

"y01.b-tender": {
  yorliq: "Moliya va huquq", sarlavha: "Texnik shartni qanday yozish kerak",
  tana: "<p>Brend nomi yozilgan shart bitta taklif keltiradi va narxni solishtirib bo'lmaydi. O'lchanadigan talablar esa uch-to'rt sotuvchini bir stolga o'tqazadi.</p>" +
    "<table><tr><th>Yomon</th><th>Yaxshi</th></tr>" +
    "<tr><td>«Reolink Home Hub»</td><td>«8 tagacha simsiz kamerani qabul qiluvchi, RTSP va ONVIF ochiq markaziy qurilma»</td></tr>" +
    "<tr><td>«Uzoq ishlaydigan akkumulyator»</td><td>«Dekabr sharoitida zaryadsiz kamida 25 kun»</td></tr>" +
    "<tr><td>«Sovuqqa chidamli»</td><td>«Ishlash va zaryad harorati datasheet'da alohida ko'rsatilgan»</td></tr>" +
    "<tr><td>«Kafolat bor»</td><td>«12 oy kafolat, nosoz jihoz 10 ish kunida almashtiriladi»</td></tr></table>" +
    "<p class='ogoh'>Har talabning tekshirish usuli ham yoziladi: sinov stendida ko'rsatish, rasmiy datasheet, o'lchov dalolatnomasi. Tekshirib bo'lmaydigan talab — talab emas, tilak.</p>",
  ru: { yorliq: "Финансы и право", sarlavha: "Как писать техническое задание",
    tana: "<p>Условие с названием бренда приносит одно предложение, и сравнивать цену не с чем. Измеримые требования сажают за стол трёх-четырёх поставщиков.</p>" +
      "<table><tr><th>Плохо</th><th>Хорошо</th></tr>" +
      "<tr><td>«Reolink Home Hub»</td><td>«Центральное устройство на восемь беспроводных камер с открытыми RTSP и ONVIF»</td></tr>" +
      "<tr><td>«Долгоиграющий аккумулятор»</td><td>«Не менее 25 дней без подзарядки в декабрьских условиях»</td></tr>" +
      "<tr><td>«Морозостойкий»</td><td>«Температуры работы и заряда указаны в паспорте по отдельности»</td></tr>" +
      "<tr><td>«Гарантия есть»</td><td>«12 месяцев, замена неисправного оборудования за 10 рабочих дней»</td></tr></table>" +
      "<p class='ogoh'>Рядом с каждым требованием пишут способ проверки: показ на стенде, официальный паспорт, акт измерения. Требование, которое нельзя проверить, — не требование, а пожелание.</p>" }
},

"y01.v-tashrif": {
  yorliq: "Moliya va huquq", sarlavha: "Tashrif narxi: besh yillik xarajatning yadrosi",
  tana: "<p>Jihoz bir marta sotib olinadi, tashrif esa har hafta yoki har oy takrorlanadi. Shuning uchun besh yillik jami boshlang'ich smetadan ikki-uch barobar katta chiqadi.</p>" +
    "<table><tr><th>Tartib</th><th>5 yilda tashrif</th></tr>" +
    "<tr><td>Panelsiz, haftada bir</td><td>≈260</td></tr>" +
    "<tr><td>100 Vt panel bilan, oyda bir</td><td>≈60</td></tr>" +
    "<tr><td>Faqat rejali ko'rik, yilda ikki</td><td>10</td></tr></table>" +
    "<h4>Tashrif nimadan iborat</h4><p>Yo'l, ikki kishining ish vaqti, akkumulyatorni almashtirish yoki zaryadlagichni ulash, panelni tozalash va kadrni tekshirish. Bir marshrutga besh-sakkiz obyekt yig'ilsa, xarajat shu obyektlarga bo'linadi. Bir tashrif shahar ichida 95 ming so'mdan, viloyat tumanida 160 ming so'mgacha turadi: oltmish tashrif besh yilda 5,7&ndash;9,7 mln so'm beradi.</p>" +
    "<p class='ogoh'>Pilotda tashrif narxi taxmin qilinmaydi, o'lchanadi: har chiqish uchun vaqt, masofa va bajarilgan ish yoziladi. Shu ma'lumotsiz 267 obyektning servis byudjetini tuzib bo'lmaydi.</p>",
  ru: { yorliq: "Финансы и право", sarlavha: "Стоимость выезда — ядро пятилетних затрат",
    tana: "<p>Оборудование покупают один раз, а выезд повторяется каждую неделю или каждый месяц. Поэтому итог за пять лет выходит в два-три раза больше стартовой сметы.</p>" +
      "<table><tr><th>Режим</th><th>Выездов за 5 лет</th></tr>" +
      "<tr><td>Без панели, раз в неделю</td><td>≈260</td></tr>" +
      "<tr><td>С панелью 100 Вт, раз в месяц</td><td>≈60</td></tr>" +
      "<tr><td>Только плановый осмотр, два раза в год</td><td>10</td></tr></table>" +
      "<h4>Из чего состоит выезд</h4><p>Дорога, рабочее время двух человек, замена аккумулятора или подключение зарядного, чистка панели и проверка кадра. Если в маршрут собрать пять-восемь объектов, затраты делятся между ними. Один выезд стоит от 95 тыс. сум в городе до 160 тыс. сум в районе области: шестьдесят выездов за пять лет дают 5,7&ndash;9,7 млн сум.</p>" +
      "<p class='ogoh'>В пилоте стоимость выезда не оценивают, а измеряют: по каждому выходу фиксируют время, расстояние и выполненную работу. Без этих данных сервисный бюджет на 267 объектов не построить.</p>" }
},

"y01.x-sovuq": {
  yorliq: "Montajchi uchun", sarlavha: "Sovuq: alomatlari va choralari",
  tana: "<h4>Qanday ko'rinadi</h4><p>Avval kadrda sun'iy shovqin ko'payadi va kechikish oshadi, keyin kamera hub ro'yxatida «oflayn» bo'lib qoladi. Kunduzi harorat ko'tarilsa o'zi qaytadi — bu sovuq ekanini tasdiqlaydigan eng aniq belgi.</p>" +
    "<h4>Nima qilinadi</h4><ul><li>Kamera ayvon tagiga, shamol va yog'indan berkitilgan joyga ko'chiriladi.</li>" +
    "<li>Hub va akkumulyator isitiladigan ichki xonaga, tashqi devordan uzoqroqqa qo'yiladi.</li>" +
    "<li>Platforma har kunning eng past harorati va oflayn oraliqlarini jurnalga yozadi; ketma-ket uch kecha takrorlansa obyekt boshqa yechimga o'tkaziladi.</li></ul>" +
    "<p class='ogoh'>Oynaning orqasiga qo'yish yechim emas: IR yoritgich oynadan qaytadi va tunda kadr butunlay oqarib ketadi. Kamera ochiq tirqishga yoki eshik tepasiga qo'yiladi.</p>",
  ru: { yorliq: "Для монтажника", sarlavha: "Мороз: признаки и меры",
    tana: "<h4>Как это выглядит</h4><p>Сначала в кадре растёт шум и увеличивается задержка, потом камера уходит в «офлайн» в списке хаба. Днём, когда теплеет, она возвращается сама — это самый надёжный признак того, что дело именно в холоде.</p>" +
      "<h4>Что делают</h4><ul><li>Камеру переносят под навес, в место, закрытое от ветра и осадков.</li>" +
      "<li>Хаб и аккумулятор ставят в отапливаемое помещение, подальше от наружной стены.</li>" +
      "<li>Платформа пишет в журнал минимальную температуру суток и интервалы офлайна; если это повторяется три ночи подряд, объект переводят на другое решение.</li></ul>" +
      "<p class='ogoh'>Ставить камеру за стекло — не решение: ИК-подсветка отражается от стекла и кадр ночью засвечивается целиком. Камеру выносят не к окну, а в открытый проём или над дверью.</p>" }
},

"y01.x-hub": {
  yorliq: "Jamoa rahbarlari uchun", sarlavha: "Hub o'chganda: aniqlash va tiklash",
  tana: "<p>Hub o'chsa obyekt butunlay ko'r qoladi. Sabablari uchta va ularni bir-biridan ajratish kerak.</p>" +
    "<table><tr><th>Sabab</th><th>Alomat</th></tr>" +
    "<tr><td>Akkumulyator bo'shagan</td><td>Zaryad foizi oldindan tushib borgan, router ham birga o'chgan</td></tr>" +
    "<tr><td>Saqlagich yoki ulagich</td><td>Router ishlayapti, hub javob bermaydi</td></tr>" +
    "<tr><td>Mikrodastur osilib qolgan</td><td>Hub pingga javob beradi, API javob bermaydi</td></tr></table>" +
    "<h4>Nima qilinadi</h4><ul><li>Adapter hub'ni har 60 soniyada so'raydi, uch javobsizlikdan keyin hodisa ochiladi.</li>" +
    "<li>Zaryad 25% ga tushganda servis vazifasi avtomatik yaratiladi — ya'ni to'liq o'chishgacha bir necha kun zaxira qoladi.</li>" +
    "<li>Routerning watchdog'i tunnel ko'tarilmasa o'zini qayta yuklaydi; hub uchun boshqariladigan rozetka yoki DC rele qo'yiladi.</li></ul>" +
    "<p class='ogoh'>Shkaf ochilish datchigi bilan jihozlanadi va u alohida hodisa beradi. Aks holda akkumulyator o'g'irlangani faqat keyingi ko'rikda ma'lum bo'ladi.</p>",
  ru: { yorliq: "Для тимлида", sarlavha: "Если хаб выключился: как понять и как поднять",
    tana: "<p>С выключенным хабом объект слепнет целиком. Причин три, и различать их обязательно.</p>" +
      "<table><tr><th>Причина</th><th>Признак</th></tr>" +
      "<tr><td>Аккумулятор разряжен</td><td>Заряд падал заранее, роутер выключился вместе с хабом</td></tr>" +
      "<tr><td>Предохранитель или разъём</td><td>Роутер работает, хаб не отвечает</td></tr>" +
      "<tr><td>Прошивка зависла</td><td>Хаб отвечает на ping, но не отвечает по API</td></tr></table>" +
      "<h4>Что делают</h4><ul><li>Адаптер опрашивает хаб раз в 60 секунд и после трёх неответов открывает событие.</li>" +
      "<li>При заряде 25% сервисная задача создаётся автоматически — то есть до полного выключения остаётся несколько дней запаса.</li>" +
      "<li>Watchdog роутера перезагружает его сам, если туннель не поднялся; для хаба ставят управляемую розетку или реле по DC.</li></ul>" +
      "<p class='ogoh'>Шкаф оснащают датчиком вскрытия, и он даёт отдельное событие. Иначе о краже аккумулятора узнают только на следующем осмотре.</p>" }
},

"y01.x-wifi": {
  yorliq: "Montajchi uchun", sarlavha: "Wi-Fi yo'qolganda batareya bir kunda tugaydi",
  tana: "<p>Kamera hub'ni topolmasa, u qayta ulanishga urinaveradi. Radiomodul deyarli to'xtovsiz ishlaydi va o'rtacha sarf o'n baravar oshadi: uch haftaga mo'ljallangan akkumulyator bir kunda tugaydi.</p>" +
    "<h4>Nima sababdan pasayadi</h4><ul><li>metall darvoza yoki panjara kamera bilan hub orasiga tushgan;</li>" +
    "<li>omborga javon qo'yilgan, yo'l to'silgan;</li>" +
    "<li>qo'shni Wi-Fi tarmoqlari kanalni band qilgan;</li>" +
    "<li>kamera kronshteyni siljigan va antenna yo'nalishi o'zgargan.</li></ul>" +
    "<h4>Qanday aniqlanadi</h4><p>Platforma har kameraning signal darajasini va batareya foizini kuzatadi. Daraja ketma-ket uch sutka pasaysa yoki batareya kutilganidan tez tushsa, obyekt ko'rik rejasiga kiritiladi.</p>" +
    "<p class='ogoh'>Wi-Fi kengaytirgichi qo'shimcha quvvat oladi va u ham hub bilan bir akkumulyatorga tushadi. Avval hub ko'chiriladi; kengaytirgich faqat boshqa yo'l qolmaganda qo'yiladi.</p>",
  ru: { yorliq: "Для монтажника", sarlavha: "Потеря Wi-Fi сажает батарею за сутки",
    tana: "<p>Если камера не находит хаб, она переподключается снова и снова. Радиомодуль работает почти непрерывно, и средний расход вырастает в десять раз: аккумулятора, рассчитанного на три недели, хватает на сутки.</p>" +
      "<h4>Почему падает уровень</h4><ul><li>между камерой и хабом оказались металлические ворота или решётка;</li>" +
      "<li>на складе переставили стеллажи и перекрыли трассу;</li>" +
      "<li>соседние сети Wi-Fi забили канал;</li>" +
      "<li>кронштейн сместился и антенна сменила ориентацию.</li></ul>" +
      "<h4>Как это ловят</h4><p>Платформа следит за уровнем сигнала и зарядом каждой камеры. Если уровень падает три ночи подряд или заряд уходит быстрее расчётного, объект попадает в план осмотра.</p>" +
      "<p class='ogoh'>Репитер Wi-Fi тоже потребляет энергию и садится на тот же аккумулятор, что и хаб. Сначала переносят хаб; репитер ставят, только когда других вариантов не осталось.</p>" }
},

"y01.g-ha": {
  yorliq: "Rahbariyat uchun", sarlavha: "Mos obyektni qanday tanib olish",
  tana: "<p>Uchta savolga «ha» deb javob berilsa, yechim mos keladi.</p>" +
    "<ol><li><b>Obyekt qishda nolga tushadimi?</b> Tushmasa — mos. Isitish saqlangan ofis, do'kon, kvartira va hovli-joy.</li>" +
    "<li><b>Nazorat hodisaga asoslanishi kifoya qiladimi?</b> Ya'ni «kimdir kirdimi» savoliga javob yetarlimi. Kifoya qilsa — mos.</li>" +
    "<li><b>4G qamrovi obyekt ichida ishonchlimi?</b> RSRP −100 dBm dan yuqori bo'lsa — mos.</li></ol>" +
    "<p>Bunday obyektlar bank balansida ko'p: shahar ichidagi kvartira va hovli-joy, savdo do'koni, ofis bloki, idora binosi. Ularda komplekt bir kunda o'rnatiladi va xaridor kelganda video domofon bilan ikki tomonlama muloqot ham ishlaydi.</p>" +
    "<p class='ogoh'>Obyekt sotilgach komplekt keyingisiga ko'chiriladi. Bitta komplekt besh yilda uch-to'rt obyektga xizmat qiladi — shuning uchun jihoz portfelga sotib olinadi.</p>",
  ru: { yorliq: "Для правления", sarlavha: "Как распознать подходящий объект",
    tana: "<p>Если на три вопроса ответ «да», решение подходит.</p>" +
      "<ol><li><b>Промерзает ли объект зимой?</b> Если нет — подходит. Офис с сохранённым отоплением, магазин, квартира, домовладение.</li>" +
      "<li><b>Достаточно ли контроля по событию?</b> То есть хватает ли ответа на вопрос «кто-то зашёл или нет». Если да — подходит.</li>" +
      "<li><b>Надёжно ли внутри объекта покрытие 4G?</b> RSRP выше −100 дБм — подходит.</li></ol>" +
      "<p>Таких объектов на балансе банка много: городские квартиры и домовладения, торговые точки, офисные блоки, конторские здания. Комплект ставится за день, а при визите покупателя работает и двусторонняя связь через видеодомофон.</p>" +
      "<p class='ogoh'>После продажи объекта комплект переезжает на следующий. За пять лет один комплект обслуживает три-четыре объекта — поэтому оборудование покупают не под объект, а под портфель.</p>" }
},

"y01.g-yoq": {
  yorliq: "Rahbariyat uchun", sarlavha: "Mos kelmaydigan obyektda nima olinadi",
  tana: "<p>Rad javobi ham qaror: noto'g'ri obyektga qo'yilgan komplekt birinchi qishda ishdan chiqadi va loyihaga ishonchni yo'qotadi.</p>" +
    "<table><tr><th>Obyekt</th><th>Nega mos emas</th><th>Nima olinadi</th></tr>" +
    "<tr><td>Ochiq perimetr, hovli</td><td>Kamera sovuqni ko'tarmaydi</td><td>Yechim 02 yoki 03</td></tr>" +
    "<tr><td>Isitilmaydigan ombor</td><td>Hub chegarasi −10 °C</td><td>Yechim 04</td></tr>" +
    "<tr><td>Uzluksiz yozuv kerak</td><td>Batareyali kamera 24 soat yozmaydi</td><td>Yechim 04</td></tr>" +
    "<tr><td>Yong'in talabi bor bino</td><td>Kamera yong'inni aniqlamaydi</td><td>Yechim 05</td></tr>" +
    "<tr><td>Yuz tanish kerak</td><td>Biometrika mahalliy serverda saqlanishi shart</td><td>Alohida loyiha</td></tr></table>" +
    "<p class='ogoh'>Obyektni tanlashda birinchi savol harorat bo'lishi kerak. Narx bo'yicha tanlangan komplekt dekabrda ishlamay qolsa, uning arzonligi ahamiyatsiz bo'lib qoladi.</p>",
  ru: { yorliq: "Для правления", sarlavha: "Что берут там, где это решение не годится",
    tana: "<p>Отказ — тоже решение: комплект, поставленный не на тот объект, откажет в первую же зиму и подорвёт доверие ко всему проекту.</p>" +
      "<table><tr><th>Объект</th><th>Почему не годится</th><th>Что берут</th></tr>" +
      "<tr><td>Открытый периметр, двор</td><td>Камера не переносит мороз</td><td>Решение 02 или 03</td></tr>" +
      "<tr><td>Неотапливаемый склад</td><td>Предел хаба −10 °C</td><td>Решение 04</td></tr>" +
      "<tr><td>Нужна непрерывная запись</td><td>Аккумуляторная камера не пишет круглосуточно</td><td>Решение 04</td></tr>" +
      "<tr><td>Здание с требованием по пожарной сигнализации</td><td>Камера не обнаруживает возгорание</td><td>Решение 05</td></tr>" +
      "<tr><td>Нужно распознавание лиц</td><td>Биометрию обязаны хранить на местном сервере</td><td>Отдельный проект</td></tr></table>" +
      "<p class='ogoh'>Первый вопрос при выборе объекта — не цена, а температура. Если выбранный по цене комплект встанет в декабре, его дешевизна уже не имеет значения.</p>" }
}

});
