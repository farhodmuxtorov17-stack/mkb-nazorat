/* Yechim 06 — Milesight LoRaWAN. Sahifadagi bosiladigan bloklar va ruscha matn. */
window.MKB_BATAFSIL = Object.assign(window.MKB_BATAFSIL || {}, {

"y06.gw": {
  yorliq: "Jamoa rahbarlari uchun",
  sarlavha: "UG65 shlyuzi ichida uchta alohida qurilma bor",
  tana: "<p>Tashqaridan bu bitta quti, lekin ichida uch xil vazifa bajariladi va nosozlikni izlashda ularni ajratib olish kerak.</p>" +
    "<table><tr><th>Qism</th><th>Nima qiladi</th></tr>" +
    "<tr><td class='b'>Konsentrator</td><td>SX1302 chipi sakkizta kanalni bir vaqtda tinglaydi. Efirdagi paketni ushlaydi, RSSI va SNR ni o'lchaydi</td></tr>" +
    "<tr><td class='b'>Paket uzatuvchi</td><td>Ushlangan paketni tarmoq serveriga beradi. Shu yerda takror nusxa yo'qolmaydi: bitta xabarni ikki shlyuz eshitsa, ikkalasi ham yuboradi</td></tr>" +
    "<tr><td class='b'>Tarmoq serveri</td><td>Shlyuz ichiga o'rnatilgan. MIC imzosini NwkSKey bilan tekshiradi, takrorni yo'qotadi, payload'ni AppSKey bilan ochadi, dekoder orqali JSON qiladi va MQTT'ga yozadi</td></tr></table>" +
    "<h4>Nega bu muhim</h4>" +
    "<p>Tarmoq serveri shlyuz ichida turgani uchun ishlab chiqaruvchi buluti umuman kerak emas. Shlyuz to'g'ridan-to'g'ri bank brokeriga ulanadi, ma'lumot O'zbekistondan chiqmaydi. Buning evaziga shlyuz yagona nuqta bo'lib qoladi: u tushsa, unga tegishli hamma obyekt jim bo'ladi.</p>" +
    "<p class='ogoh'>Xarid shartiga yoziladi: ichki tarmoq serveri ishlashi, MQTT mijoz sertifikati qo'llab-quvvatlanishi va konfiguratsiyani faylga saqlash imkoni. Uchtasi ham bo'lmasa, tashqi tarmoq serveri uchun alohida server ajratishga to'g'ri keladi.</p>",
  manba: [["Milesight UG65", "https://www.milesight.com/iot/product/lorawan-gateway/ug65"]],
  ru: {
    yorliq: "Для тимлида",
    sarlavha: "Внутри шлюза UG65 работают три независимых узла",
    tana: "<p>Снаружи это один корпус, но внутри выполняются три разные задачи, и при поиске неисправности их нужно различать.</p>" +
      "<table><tr><th>Узел</th><th>Что делает</th></tr>" +
      "<tr><td class='b'>Концентратор</td><td>Чип SX1302 слушает восемь каналов одновременно. Захватывает пакет из эфира, измеряет RSSI и SNR</td></tr>" +
      "<tr><td class='b'>Пакетный форвардер</td><td>Передаёт захваченный пакет сетевому серверу. Здесь дубликаты не теряются: если одно сообщение услышали два шлюза, отправят оба</td></tr>" +
      "<tr><td class='b'>Сетевой сервер</td><td>Встроен в шлюз. Проверяет подпись MIC ключом NwkSKey, отбрасывает дубликаты, расшифровывает payload ключом AppSKey, приводит его декодером к JSON и публикует в MQTT</td></tr></table>" +
      "<h4>Почему это важно</h4>" +
      "<p>Поскольку сетевой сервер находится внутри шлюза, облако производителя не требуется вовсе. Шлюз подключается напрямую к брокеру банка, данные не покидают Узбекистан. Плата за это — шлюз становится единой точкой отказа: при его выходе из строя замолкают все привязанные к нему объекты.</p>" +
      "<p class='ogoh'>В условия закупки вносится: работающий встроенный сетевой сервер, поддержка клиентского сертификата MQTT и выгрузка конфигурации в файл. Без этих трёх пунктов придётся выделять отдельный сервер под внешний сетевой сервер.</p>"
  }
},

"y06.ws301": {
  yorliq: "Montajchi uchun",
  sarlavha: "Eshik datchigini metall darvozaga qanday qo'yiladi",
  tana: "<p>WS301 — ikki qismli qurilma: korpus va magnit. Korpus qo'zg'almas ramkaga, magnit ochiladigan tabaqaga qo'yiladi. Ombor darvozasida ikkita muammo chiqadi.</p>" +
    "<h4>Birinchisi — metall antennani bo'g'adi</h4>" +
    "<p>868 MHz antenna metall yuzaga tegib tursa, rezonans siljiydi va chiqish quvvatining katta qismi yo'qoladi. Amaliy natija: xuddi shu joyda RSSI −95 dBm o'rniga −118 dBm chiqadi. Yechim — korpusni metalldan 20–30 mm uzoqlashtiradigan plastik yoki yog'och taglik. Taglik montaj komplektiga oldindan kiritiladi, joyida axtarilmaydi.</p>" +
    "<h4>Ikkinchisi — yopishqoq lenta sovuqda ushlamaydi</h4>" +
    "<p>Akril lenta +10 °C dan past yuzada birinchi kundan yopishmaydi va yanvarda tabaqa bilan birga tushadi. Isitilmaydigan obyektda datchik faqat vint bilan mahkamlanadi. Lenta qishki montajda umuman ishlatilmaydi.</p>" +
    "<h4>Tirqish</h4>" +
    "<p>Magnit bilan korpus orasidagi masofa har modelda boshqacha va u ochiq-yopiq holatni aniqlaydigan yagona parametr. Sozlash oddiy: montajchi eshikni yopadi, keyin ochadi va platformada ikkala holat ham o'zgarganini ko'radi. Darvoza shamolda 3–4 sm qimirlaydigan joyda magnit tabaqaning ichki chetiga surilади, aks holda tizim kuniga o'nlab soxta hodisa chiqaradi.</p>" +
    "<p class='ogoh'>Har datchikning DevEUI yorlig'i korpusni ochishdan oldin skanerlanadi. Ichkariga qo'yilgandan keyin yorliqqa yetib bo'lmaydi va reyestrga qo'lda kiritishga to'g'ri keladi — xato shu yerda paydo bo'ladi.</p>",
  manba: [["Milesight WS301", "https://www.milesight.com/iot/product/lorawan-sensor/ws301"]],
  ru: {
    yorliq: "Для монтажника",
    sarlavha: "Как ставить датчик открытия на металлические ворота",
    tana: "<p>WS301 состоит из двух частей: корпуса и магнита. Корпус крепится на неподвижную раму, магнит — на открывающуюся створку. На складских воротах возникают две проблемы.</p>" +
      "<h4>Первая — металл глушит антенну</h4>" +
      "<p>Если антенна 868 МГц прилегает к металлической поверхности, резонанс смещается и большая часть излучаемой мощности теряется. Практический результат: в одной и той же точке вместо −95 dBm прибор показывает −118 dBm. Решение — пластиковая или деревянная подложка, отодвигающая корпус от металла на 20–30 мм. Подложка закладывается в монтажный комплект заранее, а не ищется на месте.</p>" +
      "<h4>Вторая — клейкая лента не держит на морозе</h4>" +
      "<p>Акриловая лента не схватывается на поверхности холоднее +10 °C и в январе отваливается вместе со створкой. На неотапливаемом объекте датчик крепится только винтами. При зимнем монтаже лента не применяется вовсе.</p>" +
      "<h4>Зазор</h4>" +
      "<p>Расстояние между магнитом и корпусом у каждой модели своё, и это единственный параметр, определяющий состояние «открыто — закрыто». Настройка простая: монтажник закрывает дверь, затем открывает и убеждается, что на платформе сменились оба состояния. Там, где ворота ходят от ветра на 3–4 см, магнит сдвигается к внутреннему краю створки, иначе система будет выдавать десятки ложных событий в сутки.</p>" +
      "<p class='ogoh'>Этикетка DevEUI считывается до установки корпуса. После монтажа до неё не добраться, и данные приходится вносить в реестр вручную — именно здесь появляется ошибка.</p>"
  }
},

"y06.batareya": {
  yorliq: "Montajchi uchun",
  sarlavha: "Li-SOCl₂ batareyasi: passivatsiya va sovuq",
  tana: "<p>Datchiklardagi tionilxlorid batareya besh yil ishlaydi va yiliga bir foizdan kam o'z-o'zidan bo'shaydi. Lekin uning ikkita xususiyati montajni buzishi mumkin.</p>" +
    "<h4>Passivatsiya</h4>" +
    "<p>Batareya uzoq turganda anod sirtida litiy xlorid qatlami hosil bo'ladi. U batareyani saqlaydi, lekin birinchi katta tok talab qilinganda kuchlanish cho'kadi. Amalda bu shunday ko'rinadi: yangi datchik yoqiladi, indikator yonadi, ammo OTAA join oxirigacha bormaydi va qurilma qayta-qayta uriniб turadi. Yechim — montajdan oldin har datchikni 10–15 daqiqa yoqib qo'yish: bir necha uzatish qatlamni yemiradi va kuchlanish tiklanadi. Omborda olti oydan ortiq turgan partiya montaj kunidan bir kun oldin shu tartibda «uyg'otiladi».</p>" +
    "<h4>Sovuq</h4>" +
    "<p>−20 °C da batareyaning sig'imi emas, impuls berish qobiliyati pasayadi. Uzatish paytidagi qisqa tok kuchlanishni pasaytiradi va datchik qayta yuklanishi mumkin. Shuning uchun qishda uzatish intervalini qisqartirish eng yomon qaror: har bir qo'shimcha uzatish xatarni oshiradi. Aksincha, yanvarda interval 10 daqiqadan 20 daqiqaga uzaytiriladi, bahorda qaytariladi.</p>" +
    "<h4>Almashtirish</h4>" +
    "<p>Batareya «past» signalini kutib emas, kalendar bo'yicha almashtiriladi: beshinchi yilning bahorida hamma datchik bir yo'la yangilanadi. Sabab sodda — past batareya signali sovuqda kech keladi, ko'pincha qurilma butunlay jim bo'lgandan keyin. Zaxira batareya omborda +25 °C dan issiq bo'lmagan joyda saqlanadi.</p>" +
    "<p class='ogoh'>Boshqa kimyodagi batareya qo'yilmaydi. Bir xil o'lchamdagi ishqoriy yoki litiy-ion element kuchlanishi boshqa: qurilma yo ishlamaydi, yo bir necha haftada o'chadi.</p>",
  manba: [["Milesight WS301", "https://www.milesight.com/iot/product/lorawan-sensor/ws301"],
          ["Milesight EM300-TH", "https://www.milesight.com/iot/product/lorawan-sensor/em300-th"]],
  ru: {
    yorliq: "Для монтажника",
    sarlavha: "Батарея Li-SOCl₂: пассивация и холод",
    tana: "<p>Тионилхлоридная батарея в датчиках служит пять лет и саморазряжается менее чем на один процент в год. Но два её свойства способны сорвать монтаж.</p>" +
      "<h4>Пассивация</h4>" +
      "<p>При длительном хранении на поверхности анода образуется слой хлорида лития. Он сохраняет батарею, но при первом же большом токе напряжение проседает. На практике это выглядит так: новый датчик включается, индикатор горит, однако процедура OTAA join не доходит до конца и устройство повторяет попытки. Решение — перед монтажом подержать каждый датчик включённым 10–15 минут: несколько передач разрушают слой и напряжение восстанавливается. Партию, пролежавшую на складе больше полугода, «будят» таким образом за сутки до выезда.</p>" +
      "<h4>Холод</h4>" +
      "<p>При −20 °C падает не ёмкость батареи, а её способность отдавать импульс. Короткий ток в момент передачи просаживает напряжение, и датчик может уйти в перезагрузку. Поэтому сокращать интервал передачи зимой — худшее из решений: каждая дополнительная передача увеличивает риск. Наоборот, в январе интервал увеличивают с 10 до 20 минут, а весной возвращают обратно.</p>" +
      "<h4>Замена</h4>" +
      "<p>Батарею меняют не по сигналу «низкий заряд», а по календарю: весной пятого года обновляют все датчики разом. Причина простая — сигнал о низком заряде на морозе приходит поздно, чаще всего уже после того, как устройство окончательно замолчало. Запасные батареи хранятся на складе при температуре не выше +25 °C.</p>" +
      "<p class='ogoh'>Батарея другой химии не ставится. Щелочной или литий-ионный элемент того же типоразмера имеет другое напряжение: устройство либо не заработает, либо погаснет через несколько недель.</p>"
  }
},

"y06.sutka": {
  yorliq: "Jamoa rahbarlari uchun",
  sarlavha: "Tungi hodisaning vaqt byudjeti",
  tana: "<p>Eshik ochilganidan operator ekranida kadr paydo bo'lgunicha o'tadigan vaqt to'rtta bo'lakdan yig'iladi. Har birining o'z chegarasi bor va qaysi biri oshib ketgani jurnaldan aniq ko'rinadi.</p>" +
    "<table><tr><th>Bo'lak</th><th>Odatda</th><th>Nima cho'zadi</th></tr>" +
    "<tr><td class='b'>Datchik → efir</td><td class='n'>&lt;1 s</td><td>Passivatsiya, past batareya</td></tr>" +
    "<tr><td class='b'>Efir → shlyuz</td><td class='n'>0,2–1,5 s</td><td>SF12 ga tushish: efir vaqti 185 ms dan 1,3 s gacha o'sadi</td></tr>" +
    "<tr><td class='b'>Shlyuz → broker</td><td class='n'>0,3–2 s</td><td>4G qayta ulanishi, TLS qo'l berishi</td></tr>" +
    "<tr><td class='b'>Kadr so'rovi</td><td class='n'>4–25 s</td><td>Uyqudagi kamerani uyg'otish</td></tr></table>" +
    "<p>Ya'ni hodisa yozuvi 3 soniyada, kadr esa yarim daqiqagacha kelishi mumkin. Operator interfeysida ular alohida ko'rsatiladi: hodisa darhol chiqadi, kadr joyi «yuklanmoqda» bo'lib turadi. Aks holda operator hodisani kadr kelmaguncha ko'rmaydi.</p>" +
    "<h4>Downlink boshqacha ishlaydi</h4>" +
    "<p>A sinfidagi datchikka buyruq yuborish uchun uning navbatdagi uzatishini kutish kerak. Interval 10 daqiqa bo'lsa, sozlamani o'zgartirish buyrug'i o'rtacha 5 daqiqadan keyin yetadi. Shuning uchun hech qanday «datchikni hozir so'rash» tugmasi qo'yilmaydi — u ishlamaydi va operatorni aldaydi.</p>",
  manba: [],
  ru: {
    yorliq: "Для тимлида",
    sarlavha: "Бюджет времени ночного события",
    tana: "<p>Время от открытия двери до появления кадра на экране оператора складывается из четырёх отрезков. У каждого свой предел, и какой именно превышен — однозначно видно в журнале.</p>" +
      "<table><tr><th>Отрезок</th><th>Обычно</th><th>Что растягивает</th></tr>" +
      "<tr><td class='b'>Датчик → эфир</td><td class='n'>&lt;1 с</td><td>Пассивация, низкий заряд</td></tr>" +
      "<tr><td class='b'>Эфир → шлюз</td><td class='n'>0,2–1,5 с</td><td>Переход на SF12: время в эфире растёт со 185 мс до 1,3 с</td></tr>" +
      "<tr><td class='b'>Шлюз → брокер</td><td class='n'>0,3–2 с</td><td>Переподключение 4G, рукопожатие TLS</td></tr>" +
      "<tr><td class='b'>Запрос кадра</td><td class='n'>4–25 с</td><td>Пробуждение спящей камеры</td></tr></table>" +
      "<p>То есть запись о событии приходит за 3 секунды, а кадр — в пределах полуминуты. В интерфейсе оператора они разделены: событие появляется сразу, на месте кадра стоит индикатор загрузки. Иначе оператор не увидит событие до прихода кадра.</p>" +
      "<h4>Downlink устроен иначе</h4>" +
      "<p>Чтобы отправить команду устройству класса A, нужно дождаться его очередной передачи. При интервале 10 минут команда на изменение настройки доходит в среднем через 5 минут. Поэтому кнопка «опросить датчик сейчас» не делается вовсе — она не работает и вводит оператора в заблуждение.</p>"
  }
},

"y06.byudjet": {
  yorliq: "Montajchi uchun",
  sarlavha: "Shlyuz avtonom turganda dekabr hisobi",
  tana: "<p>Eng yaxshi holat — shlyuz filialda yoki elektr bor qo'shni nuqtada. Unda dekabr quvvat byudjeti nolga teng: datchiklar o'z batareyasida, shlyuz rozetkada. Radiusda elektr topilmasa, hisob quyidagicha.</p>" +
    "<table><tr><th>Modda</th><th>Qiymat</th></tr>" +
    "<tr><td>UG65, odatiy iste'mol 2,9 Vt</td><td class='n'>70 Vt·soat/sutka</td></tr>" +
    "<tr><td>4G router, 3 Vt</td><td class='n'>72 Vt·soat/sutka</td></tr>" +
    "<tr class='jami'><td>Jami</td><td class='n'>142 Vt·soat/sutka</td></tr></table>" +
    "<h4>Panel</h4>" +
    "<p>Toshkentda dekabr insolyatsiyasi 1,62 kVt·soat/m². 200 Vt panel yo'qotishlar bilan (kontroller, harorat, chang, qishki burchak xatosi — jami 30%) sutkasiga taxminan 227 Vt·soat beradi. Zaxira 1,6 barobar. 150 Vt panelda zaxira 1,2 barobar qoladi va uch kunlik bulut byudjetni yeydi.</p>" +
    "<h4>Akkumulyator</h4>" +
    "<p>12 V 100 A·soatlik LiFePO4 — 1 280 Vt·soat, foydali 80% bilan 1 024 Vt·soat. Bu 142 Vt·soatga bo'linganda quyoshsiz 7,2 kun chiqadi.</p>" +
    "<p class='ogoh'>Akkumulyator tashqi shkafda tursa, yanvar ertalabida BMS zaryadni bermaydi: LiFePO4 0 °C dan past zaryadlanmaydi. Quyoshli kunning birinchi ikki soati shu bilan yo'qoladi. Shuning uchun akkumulyator shlyuz bilan bitta izolyatsiyali shkafda, past harorat himoyasi va isitgich bilan turadi, isitgich esa akkumulyatordan emas, to'g'ridan-to'g'ri paneldan oziqlanadi.</p>",
  manba: [],
  ru: {
    yorliq: "Для монтажника",
    sarlavha: "Декабрьский расчёт, если шлюз работает автономно",
    tana: "<p>Лучший вариант — шлюз в филиале или в соседней точке с электроснабжением. Тогда декабрьский энергобюджет равен нулю: датчики на собственных батареях, шлюз в розетке. Если в радиусе действия электричества нет, расчёт выглядит так.</p>" +
      "<table><tr><th>Статья</th><th>Значение</th></tr>" +
      "<tr><td>UG65, типовое потребление 2,9 Вт</td><td class='n'>70 Вт·ч/сут</td></tr>" +
      "<tr><td>4G-маршрутизатор, 3 Вт</td><td class='n'>72 Вт·ч/сут</td></tr>" +
      "<tr class='jami'><td>Итого</td><td class='n'>142 Вт·ч/сут</td></tr></table>" +
      "<h4>Панель</h4>" +
      "<p>Декабрьская инсоляция в Ташкенте — 1,62 кВт·ч/м². Панель 200 Вт с учётом потерь (контроллер, нагрев, запылённость, ошибка зимнего угла — в сумме 30%) даёт около 227 Вт·ч в сутки. Запас — 1,6 раза. У панели 150 Вт запас остаётся 1,2 раза, и три пасмурных дня съедают бюджет.</p>" +
      "<h4>Аккумулятор</h4>" +
      "<p>LiFePO4 12 В 100 А·ч — это 1 280 Вт·ч, при полезной глубине 80% — 1 024 Вт·ч. Делением на 142 Вт·ч получаем 7,2 суток без солнца.</p>" +
      "<p class='ogoh'>Если аккумулятор стоит в наружном шкафу, январским утром BMS не примет заряд: LiFePO4 не заряжается при температуре ниже 0 °C. Первые два часа солнечного дня теряются. Поэтому аккумулятор размещают со шлюзом в одном утеплённом шкафу, с низкотемпературной защитой и подогревом, причём подогрев питается напрямую от панели, а не от аккумулятора.</p>"
  }
},

"y06.radio": {
  yorliq: "Jamoa rahbarlari uchun",
  sarlavha: "SF, efir vaqti va nega interval 10 daqiqa",
  tana: "<p>LoRa'da uzatish tezligi bilan masofa almashtiriladi. Buni tarqalish koeffitsienti (SF) belgilaydi, uni esa adaptiv tezlik (ADR) mexanizmi o'zi tanlaydi.</p>" +
    "<table><tr><th>SF</th><th>12 baytlik xabar efirda</th><th>Amaliy masofa</th></tr>" +
    "<tr><td class='b'>SF7</td><td class='n'>≈46 ms</td><td>Shlyuzga yaqin, ko'rinish bor</td></tr>" +
    "<tr><td class='b'>SF9</td><td class='n'>≈185 ms</td><td>Shahar ichi, 1–2 km</td></tr>" +
    "<tr><td class='b'>SF12</td><td class='n'>≈1,3 s</td><td>Chegara, ombor ichidan</td></tr></table>" +
    "<h4>Nega bu narxga ta'sir qiladi</h4>" +
    "<p>Efir vaqti uzaygan sari batareya tezroq tugaydi va kanal bandroq bo'ladi. Bir foizli efir chegarasida SF12 ga tushgan datchik uzatgandan keyin taxminan ikki daqiqa efirga chiqa olmaydi. Chegaradagi o'nta datchik bir vaqtda uyg'onsa, ularning bir qismi navbatda qoladi.</p>" +
    "<p>Shuning uchun montajda SF12 qabul qilinmaydi. RSSI −115 dBm dan yaxshi va SNR noldan yuqori bo'lgandagina nuqta yopiladi. Bu shart bajarilmasa, datchik ko'chiriladi yoki shlyuz antennasi ko'tariladi — sozlama bilan tuzatib bo'lmaydi.</p>" +
    "<h4>Interval</h4>" +
    "<p>10 daqiqalik holat xabari — ikki talab orasidagi muvozanat: batareya besh yil chidaydi va aloqasiz qolgan datchik yarim soat ichida aniqlanadi. Ketma-ket uchta xabar kelmasa, platforma «aloqa yo'q» hodisasini ochadi. Eshik ochilishi esa intervalga bog'liq emas: u hodisa sifatida darhol yuboriladi.</p>",
  manba: [["LoRa Alliance RP002-1.0.2", "https://lora-alliance.org/wp-content/uploads/2020/11/RP_2-1.0.2.pdf"]],
  ru: {
    yorliq: "Для тимлида",
    sarlavha: "SF, время в эфире и почему интервал равен 10 минутам",
    tana: "<p>В LoRa скорость передачи обменивается на дальность. Это задаёт коэффициент расширения (SF), а выбирает его механизм адаптивной скорости (ADR).</p>" +
      "<table><tr><th>SF</th><th>Сообщение 12 байт в эфире</th><th>Практическая дальность</th></tr>" +
      "<tr><td class='b'>SF7</td><td class='n'>≈46 мс</td><td>Рядом со шлюзом, прямая видимость</td></tr>" +
      "<tr><td class='b'>SF9</td><td class='n'>≈185 мс</td><td>Городская застройка, 1–2 км</td></tr>" +
      "<tr><td class='b'>SF12</td><td class='n'>≈1,3 с</td><td>Предел, изнутри склада</td></tr></table>" +
      "<h4>Почему это влияет на стоимость</h4>" +
      "<p>Чем дольше передача в эфире, тем быстрее садится батарея и тем плотнее занят канал. При ограничении в один процент эфирного времени датчик, ушедший на SF12, после передачи не может выйти в эфир около двух минут. Если десять таких датчиков просыпаются одновременно, часть из них встаёт в очередь.</p>" +
      "<p>Поэтому SF12 при монтаже не принимается. Точка закрывается только при RSSI лучше −115 dBm и SNR выше нуля. Если условие не выполнено, датчик переносят или поднимают антенну шлюза — настройками это не лечится.</p>" +
      "<h4>Интервал</h4>" +
      "<p>Статусное сообщение раз в 10 минут — баланс двух требований: батареи хватает на пять лет, а пропавший датчик обнаруживается в пределах получаса. Если подряд не приходят три сообщения, платформа открывает событие «нет связи». Открытие двери от интервала не зависит: оно уходит событием немедленно.</p>"
  }
},

"y06.mqtt": {
  yorliq: "Jamoa rahbarlari uchun",
  sarlavha: "Shlyuzdan brokergacha: mavzular, TLS va LWT",
  tana: "<p>Shlyuz dekodlangan xabarni MQTT(s) orqali bank brokeriga yozadi. Mavzu tuzilmasi obyekt va qurilma bo'yicha bo'linadi, shuning uchun huquqni mavzu darajasida cheklash mumkin.</p>" +
    "<pre><code>mkb/v1/{obyekt}/{device_id}/hodisa\nmkb/v1/{obyekt}/{device_id}/holat\nmkb/v1/shlyuz/{gw_id}/lwt</code></pre>" +
    "<pre><code>{\"obyekt\":\"AK-2025/0934\",\"device_id\":\"DAT-0012\",\n \"tur\":\"eshik\",\"qiymat\":\"ochiq\",\"batareya\":87,\n \"rssi\":-108,\"snr\":4.5,\"fcnt\":1532,\n \"vaqt\":\"2026-01-14T02:13:05Z\"}</code></pre>" +
    "<h4>Qat'iy qoidalar</h4>" +
    "<ul><li>QoS 1 va doimiy sessiya: aloqa uzilsa broker xabarni saqlaydi, shlyuz tiklanganda navbatni bo'shatadi.</li>" +
    "<li>TLS 1.2 dan past emas, har shlyuzga alohida mijoz sertifikati. Broker ACL shlyuzga faqat o'z obyektlari mavzusiga yozishga ruxsat beradi: bitta o'g'irlangan shlyuz butun tizimga yozolmaydi.</li>" +
    "<li>LWT: shlyuz tushsa, broker <code>lwt</code> mavzusiga «offline» yozadi. Platforma bitta klaster ogohlantirishi chiqaradi, har datchik uchun alohida emas — aks holda operator o'ttizta soxta «aloqa yo'q» ni ko'radi.</li>" +
    "<li>Iste'molchi idempotent: <code>DevEUI + fcnt</code> juftligi takrorlansa, yozuv qayta yaratilmaydi.</li></ul>" +
    "<h4>Fcnt haqida bitta tuzoq</h4>" +
    "<p>Batareya almashtirilgach ayrim datchiklar kadr hisoblagichini noldan boshlaydi. Ishlab chiqarish sozlamasida takrorni himoya qiluvchi qoida yoqiq bo'ladi va bunday xabarlar rad etiladi — datchik «jim» bo'lib qoladi. Shuning uchun batareya almashtirilgan har bir qurilma qayta ro'yxatdan o'tkaziladi, bu servis varaqasining majburiy bandi.</p>",
  manba: [],
  ru: {
    yorliq: "Для тимлида",
    sarlavha: "От шлюза до брокера: топики, TLS и LWT",
    tana: "<p>Шлюз публикует декодированное сообщение по MQTT(s) в брокер банка. Структура топиков разделена по объекту и устройству, поэтому права ограничиваются на уровне топика.</p>" +
      "<pre><code>mkb/v1/{obyekt}/{device_id}/hodisa\nmkb/v1/{obyekt}/{device_id}/holat\nmkb/v1/shlyuz/{gw_id}/lwt</code></pre>" +
      "<pre><code>{\"obyekt\":\"AK-2025/0934\",\"device_id\":\"DAT-0012\",\n \"tur\":\"eshik\",\"qiymat\":\"ochiq\",\"batareya\":87,\n \"rssi\":-108,\"snr\":4.5,\"fcnt\":1532,\n \"vaqt\":\"2026-01-14T02:13:05Z\"}</code></pre>" +
      "<h4>Жёсткие правила</h4>" +
      "<ul><li>QoS 1 и постоянная сессия: при обрыве связи брокер сохраняет сообщения, после восстановления шлюз разбирает очередь.</li>" +
      "<li>TLS не ниже 1.2, на каждый шлюз — отдельный клиентский сертификат. ACL брокера разрешает шлюзу публикацию только в топики своих объектов: один похищенный шлюз не сможет писать во всю систему.</li>" +
      "<li>LWT: при падении шлюза брокер публикует «offline» в топик <code>lwt</code>. Платформа выдаёт одно кластерное предупреждение, а не по одному на каждый датчик — иначе оператор увидит тридцать ложных «нет связи».</li>" +
      "<li>Потребитель идемпотентен: при повторе пары <code>DevEUI + fcnt</code> запись не создаётся заново.</li></ul>" +
      "<h4>Одна ловушка со счётчиком кадров</h4>" +
      "<p>После замены батареи часть датчиков начинает счётчик кадров с нуля. В заводской конфигурации защита от повтора включена, и такие сообщения отбрасываются — датчик «замолкает». Поэтому каждое устройство с заменённой батареей проходит повторную регистрацию; это обязательный пункт сервисного листа.</p>"
  }
},

"y06.operator": {
  yorliq: "Rahbariyat uchun",
  sarlavha: "Operator ekranida nima ko'rinadi va nimani bosadi",
  tana: "<p>LoRaWAN datchiklari jonli video bermaydi, shuning uchun operator ekrani boshqacha tuziladi: markazda hodisa va obyekt holati, video esa talab bo'yicha ochiladigan ilova.</p>" +
    "<table><tr><th>Ko'rinadi</th><th>Qayerdan keladi</th></tr>" +
    "<tr><td class='b'>Eshik holati</td><td>WS301, hodisa va har 10 daqiqada holat</td></tr>" +
    "<tr><td class='b'>Ombor harorati va namligi</td><td>EM300-TH, grafik 30 kunlik</td></tr>" +
    "<tr><td class='b'>Suv sizishi</td><td>Zond datchigi, faqat hodisa</td></tr>" +
    "<tr><td class='b'>Har datchik batareyasi</td><td>Foizda, holat xabari bilan</td></tr>" +
    "<tr><td class='b'>Signal sifati</td><td>RSSI va SNR, oxirgi 24 soat</td></tr></table>" +
    "<h4>Masofadan nima qilinadi</h4>" +
    "<ul><li>Hodisaga qarab kadr so'rash: platforma bog'langan kameradan 30–60 soniyalik klip oladi.</li>" +
    "<li>Uzatish intervalini o'zgartirish — buyruq navbatga qo'yiladi va datchikning keyingi uzatishida yetadi.</li>" +
    "<li>Harorat chegarasini qo'yish: masalan +5 °C dan pastga tushsa, quvur muzlashi xatari bo'yicha vazifa ochiladi.</li>" +
    "<li>Datchikni vaqtincha e'tibordan chiqarish: ta'mir ishlari davrida eshik ochiq turadi, hodisa oqimi to'xtatiladi va sabab yozib qo'yiladi.</li></ul>" +
    "<h4>Nima qilib bo'lmaydi</h4>" +
    "<p>Eshikni masofadan yopish, sirena yoqish yoki obyektni ko'rib chiqish. Bu yechim faqat o'lchaydi va xabar qiladi. Ta'sir qilish kerak bo'lsa, obyektga 05-yechimning relesi yoki 10-klaster shkafi qo'shiladi.</p>",
  manba: [],
  ru: {
    yorliq: "Для правления",
    sarlavha: "Что оператор видит на экране и что может нажать",
    tana: "<p>Датчики LoRaWAN не дают живого видео, поэтому экран оператора построен иначе: в центре — событие и состояние объекта, а видео открывается по запросу как приложение к событию.</p>" +
      "<table><tr><th>Что видно</th><th>Откуда приходит</th></tr>" +
      "<tr><td class='b'>Состояние двери</td><td>WS301, событие и статус каждые 10 минут</td></tr>" +
      "<tr><td class='b'>Температура и влажность склада</td><td>EM300-TH, график за 30 дней</td></tr>" +
      "<tr><td class='b'>Протечка воды</td><td>Датчик-зонд, только событие</td></tr>" +
      "<tr><td class='b'>Заряд каждого датчика</td><td>В процентах, со статусным сообщением</td></tr>" +
      "<tr><td class='b'>Качество сигнала</td><td>RSSI и SNR за последние 24 часа</td></tr></table>" +
      "<h4>Что делается удалённо</h4>" +
      "<ul><li>Запрос кадра по событию: платформа забирает с привязанной камеры клип на 30–60 секунд.</li>" +
      "<li>Изменение интервала передачи — команда ставится в очередь и доходит со следующей передачей датчика.</li>" +
      "<li>Установка температурного порога: например, при падении ниже +5 °C открывается задача по риску размораживания трубопровода.</li>" +
      "<li>Временное отключение датчика: на время ремонта дверь стоит открытой, поток событий приостанавливается с указанием причины.</li></ul>" +
      "<h4>Чего сделать нельзя</h4>" +
      "<p>Закрыть дверь дистанционно, включить сирену или осмотреть объект. Это решение только измеряет и сообщает. Если нужно воздействие, к объекту добавляется реле из решения 05 или кластерный шкаф из решения 10.</p>"
  }
},

"y06.montaj": {
  yorliq: "Montajchi uchun",
  sarlavha: "Brigada, vaqt va qabul mezoni",
  tana: "<p>Klaster bitta shlyuz va 5–10 obyektdan iborat. Ish ikki bosqichda boradi va ular bir kunga sig'maydi.</p>" +
    "<table><tr><th>Bosqich</th><th>Kim</th><th>Vaqt</th></tr>" +
    "<tr><td class='b'>Shlyuz nuqtasi</td><td>2 kishi, biri balandlikda ishlash ruxsati bilan</td><td class='n'>4–5 soat</td></tr>" +
    "<tr><td class='b'>Bir obyekt, 5 datchik</td><td>2 kishi</td><td class='n'>45–70 daqiqa</td></tr>" +
    "<tr><td class='b'>10 obyektlik klaster</td><td>2 kishi</td><td class='n'>3 ish kuni</td></tr></table>" +
    "<h4>Shlyuz nuqtasida tartib</h4>" +
    "<ol><li>Antenna tik holatda, tomdan kamida 1,5 m yuqorida va metall panjaradan 1 m uzoqda mahkamlanadi.</li>" +
    "<li>Koaksial kabel 5 m dan oshmaydi: har qo'shimcha metr 868 MHz da signalni yeydi. Uzunroq kerak bo'lsa, shlyuzning o'zi machtaga chiqariladi.</li>" +
    "<li>Konnektor pastga qaratilib, o'z-o'zidan yopishadigan lenta bilan yopiladi. Suv kirgan konnektor bir mavsumda aloqani yarmiga tushiradi.</li>" +
    "<li>Chaqmoqdan himoya: antenna kabeliga razryadnik, shkafda yer ulanishi. Shlyuz tomda bo'lsa bu majburiy.</li>" +
    "<li>Standart parol almashtiriladi, ishlatilmaydigan xizmatlar o'chiriladi, NTP qo'yiladi. Vaqti noto'g'ri shlyuz hodisalar tartibini buzadi.</li></ol>" +
    "<h4>Obyektda tartib</h4>" +
    "<ol><li>Har datchikning DevEUI yorlig'i skanerlanadi va reyestrga yoziladi: <code>DAT-0012 → AK-2025/0934</code>.</li>" +
    "<li>Datchik OTAA bilan ro'yxatdan o'tadi va bir marta ishga tushiriladi.</li>" +
    "<li>Shlyuz panelida RSSI va SNR yozib olinadi. Chegara: −115 dBm va SNR &gt; 0.</li>" +
    "<li>Eshik yopilib ochiladi, platformada ikkala holat ham ko'rinadi.</li>" +
    "<li>Sinov hodisasi operator ekraniga chiqqanidan keyingina dalolatnoma imzolanadi.</li></ol>" +
    "<p class='ogoh'>Ombor ichida javon ko'chirilsa yoki tovar to'ldirilsa signal 10–15 dB pasayishi mumkin. Shuning uchun o'lchov bo'sh omborda emas, ish holatidagi omborda qilinadi.</p>",
  manba: [],
  ru: {
    yorliq: "Для монтажника",
    sarlavha: "Бригада, сроки и критерий приёмки",
    tana: "<p>Кластер состоит из одного шлюза и 5–10 объектов. Работа идёт в два этапа, и в один день они не укладываются.</p>" +
      "<table><tr><th>Этап</th><th>Кто</th><th>Время</th></tr>" +
      "<tr><td class='b'>Точка шлюза</td><td>2 человека, один с допуском к работам на высоте</td><td class='n'>4–5 ч</td></tr>" +
      "<tr><td class='b'>Один объект, 5 датчиков</td><td>2 человека</td><td class='n'>45–70 мин</td></tr>" +
      "<tr><td class='b'>Кластер из 10 объектов</td><td>2 человека</td><td class='n'>3 рабочих дня</td></tr></table>" +
      "<h4>Порядок на точке шлюза</h4>" +
      "<ol><li>Антенна крепится вертикально, не ниже 1,5 м над кровлей и не ближе 1 м к металлическому ограждению.</li>" +
      "<li>Коаксиальный кабель не длиннее 5 м: на 868 МГц каждый лишний метр съедает сигнал. Если нужно больше — на мачту выносится сам шлюз.</li>" +
      "<li>Разъём направляется вниз и закрывается самослипающейся лентой. Разъём с попавшей водой за один сезон вдвое сокращает дальность.</li>" +
      "<li>Молниезащита: разрядник на антенном кабеле, заземление в шкафу. Для шлюза на кровле это обязательно.</li>" +
      "<li>Меняется заводской пароль, отключаются неиспользуемые службы, настраивается NTP. Шлюз с неверным временем ломает порядок событий.</li></ol>" +
      "<h4>Порядок на объекте</h4>" +
      "<ol><li>Этикетка DevEUI каждого датчика сканируется и вносится в реестр: <code>DAT-0012 → AK-2025/0934</code>.</li>" +
      "<li>Датчик регистрируется по OTAA и однократно запускается.</li>" +
      "<li>В панели шлюза фиксируются RSSI и SNR. Порог: −115 dBm и SNR &gt; 0.</li>" +
      "<li>Дверь закрывается и открывается, на платформе видны оба состояния.</li>" +
      "<li>Акт подписывается только после того, как тестовое событие дошло до экрана оператора.</li></ol>" +
      "<p class='ogoh'>Если внутри склада переставят стеллаж или заполнят его товаром, сигнал может упасть на 10–15 дБ. Поэтому замеры делаются не на пустом складе, а на складе в рабочем состоянии.</p>"
  }
},

"y06.narx": {
  yorliq: "Moliya va huquq",
  sarlavha: "Narxni nima belgilaydi",
  tana: "<p>Bir obyektga 3 dan 8 mln so'mgacha. Farq brendda emas, to'rtta omilda.</p>" +
    "<table><tr><th>Omil</th><th>Ta'siri</th></tr>" +
    "<tr><td class='b'>Datchiklar soni</td><td>Har qo'shimcha nuqta 400–800 ming so'm. Uchta eshikli ombor to'rtta eshiklisidan arzon</td></tr>" +
    "<tr><td class='b'>Klaster kattaligi</td><td>Shlyuz 6–9 mln. Uch obyektga bo'linsa 2–3 mln, o'n obyektga bo'linsa 0,6–0,9 mln</td></tr>" +
    "<tr><td class='b'>Kamera bormi</td><td>Obyektda kamera bo'lsa, qator nolga tushadi. Yo'q bo'lsa 1,5–2,5 mln qo'shiladi</td></tr>" +
    "<tr><td class='b'>Partiya hajmi</td><td>20 donalik buyurtma birlik narxida 200 donalikdan taxminan 15% qimmat: logistika va bojxona rasmiylashtiruvi partiyaga emas, jo'natmaga to'g'ri keladi</td></tr></table>" +
    "<h4>Amaliy xulosa</h4>" +
    "<p>Bu yechimning iqtisodi klasterga asoslangan. Bitta uzoq obyektga shlyuz qo'yish — eng qimmat variant: obyektga 9–15 mln tushadi va bu LiFePO4 shkafidan ham qimmat. Shuning uchun ko'rikda avval xaritaga qaraladi: 2 km radiusda kamida uchta obyekt bormi. Bo'lmasa, 02 yoki 04-yechim tanlanadi.</p>" +
    "<p class='ogoh'>Tenderga chiqishdan oldin datchik va shlyuz bitta chastota variantida ekani tekshiriladi. Turli variantdagi qurilma bir-birini umuman ko'rmaydi va bu faqat montaj kunida ma'lum bo'ladi.</p>",
  manba: [],
  ru: {
    yorliq: "Финансы и право",
    sarlavha: "Что определяет стоимость",
    tana: "<p>От 3 до 8 млн сумов на объект. Разница не в бренде, а в четырёх факторах.</p>" +
      "<table><tr><th>Фактор</th><th>Влияние</th></tr>" +
      "<tr><td class='b'>Количество датчиков</td><td>Каждая дополнительная точка — 400–800 тыс. сумов. Склад с тремя воротами дешевле склада с четырьмя</td></tr>" +
      "<tr><td class='b'>Размер кластера</td><td>Шлюз стоит 6–9 млн. На три объекта это 2–3 млн, на десять — 0,6–0,9 млн</td></tr>" +
      "<tr><td class='b'>Есть ли камера</td><td>Если камера на объекте уже стоит, статья обнуляется. Если нет — добавляется 1,5–2,5 млн</td></tr>" +
      "<tr><td class='b'>Объём партии</td><td>Заказ на 20 штук в пересчёте на единицу дороже заказа на 200 примерно на 15%: логистика и таможенное оформление приходятся на отправку, а не на партию</td></tr></table>" +
      "<h4>Практический вывод</h4>" +
      "<p>Экономика этого решения держится на кластере. Ставить шлюз ради одного удалённого объекта — самый дорогой вариант: на объект ложится 9–15 млн, дороже, чем шкаф LiFePO4. Поэтому на осмотре сначала смотрят на карту: есть ли в радиусе 2 км хотя бы три объекта. Если нет — выбирается решение 02 или 04.</p>" +
      "<p class='ogoh'>До выхода на тендер проверяется, что датчики и шлюз заказаны в одном частотном исполнении. Устройства разных исполнений не видят друг друга вовсе, и выясняется это только в день монтажа.</p>"
  }
},

"y06.servis": {
  yorliq: "Moliya va huquq",
  sarlavha: "Besh yillik xizmat va sarf materiallari",
  tana: "<table><tr><th>Modda</th><th>Qachon</th><th>mln so'm</th></tr>" +
    "<tr><td class='b'>Datchik batareyalari</td><td>5-yil bahorida, hammasi bir yo'la</td><td class='n'>0,2–0,4</td></tr>" +
    "<tr><td class='b'>Shlyuz SIM ulushi</td><td>Oyma-oy, obyektlarga bo'linadi</td><td class='n'>0,4–1,2</td></tr>" +
    "<tr><td class='b'>Kamera 4G SIM</td><td>Kamera bo'lsa, eng katta qator</td><td class='n'>3–6</td></tr>" +
    "<tr><td class='b'>Shlyuz ko'rigi</td><td>Yiliga bir marta</td><td class='n'>0,3–0,6</td></tr></table>" +
    "<h4>Trafik nima uchun arzon</h4>" +
    "<p>O'ttiz obyektli klaster kuniga taxminan 21 600 ta kichik xabar yuboradi. TLS ustamasi bilan bu sutkasiga 5–6 MB, oyiga 200 MB dan kam. Eng arzon M2M tarif yetadi. Trafikni kamera oshiradi, datchiklar emas.</p>" +
    "<h4>Omborda turadigan zaxira</h4>" +
    "<ul><li>Har 20 datchikka 2–3 ta zaxira batareya, ikkala tipdan.</li>" +
    "<li>Plastik tagliklar va vintlar: metall eshikka o'tqazish uchun.</li>" +
    "<li>Shlyuz antennasi va pigteyl: konnektorga suv kirsa, joyida almashtiriladi.</li>" +
    "<li>Bitta butun zaxira shlyuz. Import muddati 4–8 hafta, klasterni shuncha kutib turib bo'lmaydi.</li></ul>" +
    "<h4>Yillik ko'rikda</h4>" +
    "<p>Antenna konnektori va lentasi ko'zdan kechiriladi, shkaf ichidagi namlik yutuvchi almashtiriladi, RSSI jadvali bir yil oldingisi bilan solishtiriladi. 6 dB dan ortiq pasayish — antenna yoki atrofdagi to'siq o'zgargani belgisi.</p>",
  manba: [],
  ru: {
    yorliq: "Финансы и право",
    sarlavha: "Пятилетнее обслуживание и расходные материалы",
    tana: "<table><tr><th>Статья</th><th>Когда</th><th>млн сумов</th></tr>" +
      "<tr><td class='b'>Батареи датчиков</td><td>Весной пятого года, все сразу</td><td class='n'>0,2–0,4</td></tr>" +
      "<tr><td class='b'>Доля SIM шлюза</td><td>Ежемесячно, делится на объекты</td><td class='n'>0,4–1,2</td></tr>" +
      "<tr><td class='b'>SIM камеры 4G</td><td>Если есть камера — самая крупная статья</td><td class='n'>3–6</td></tr>" +
      "<tr><td class='b'>Осмотр шлюза</td><td>Раз в год</td><td class='n'>0,3–0,6</td></tr></table>" +
      "<h4>Почему трафик дешёвый</h4>" +
      "<p>Кластер из тридцати объектов отправляет около 21 600 коротких сообщений в сутки. С накладными расходами TLS это 5–6 МБ в сутки и менее 200 МБ в месяц. Достаточно самого дешёвого M2M-тарифа. Трафик наращивает камера, а не датчики.</p>" +
      "<h4>Что держится на складе</h4>" +
      "<ul><li>На каждые 20 датчиков — 2–3 запасные батареи обоих типов.</li>" +
      "<li>Пластиковые подложки и винты: для установки на металлические двери.</li>" +
      "<li>Антенна шлюза и пигтейл: при попадании воды в разъём заменяются на месте.</li>" +
      "<li>Один полный запасной шлюз. Срок поставки 4–8 недель, столько кластер ждать не может.</li></ul>" +
      "<h4>На годовом осмотре</h4>" +
      "<p>Осматриваются разъём и лента антенны, меняется влагопоглотитель в шкафу, таблица RSSI сравнивается с прошлогодней. Падение более чем на 6 дБ — признак того, что изменилась антенна или появилось препятствие.</p>"
  }
},

"y06.chastota": {
  yorliq: "Moliya va huquq",
  sarlavha: "Chastota ruxsati: xariddan oldin yopiladigan savol",
  tana: "<p>LoRa Alliance'ning RP002-1.0.2 mintaqaviy jadvalida O'zbekiston uchun faqat EU433 (433,05–434,79 MHz) yozilgan. Bozordagi Milesight datchiklari esa asosan EU868 va RU864 variantlarida keladi, 433 MHz variant ro'yxatda yo'q.</p>" +
    "<h4>Nima qilinadi</h4>" +
    "<ol><li>Bank aloqa sohasidagi vakolatli organdan tanlangan diapazonda foydalanish maqomini yozma tasdiqlab oladi. Javob pilotdan oldin kerak.</li>" +
    "<li>Ruxsat berilgan diapazon tender texnik topshirig'iga aniq raqam bilan yoziladi.</li>" +
    "<li>Yetkazib beruvchidan aynan shu variantdagi qurilmaning yetkazish muddati so'raladi: chastota varianti ishlab chiqarishda belgilanadi, keyin o'zgartirib bo'lmaydi.</li></ol>" +
    "<p class='ogoh'>Ruxsatsiz o'rnatilgan tarmoq tekshiruvda o'chirilishi mumkin, jihoz esa qaytarilmaydi. Bu yechimning yagona haqiqiy to'suvchi xatari shu — texnik emas, huquqiy.</p>" +
    "<h4>Zaxira yo'l</h4>" +
    "<p>Ruxsat olinmasa, xuddi shu vazifani 05-yechimning batareyali datchiklari bajaradi: ular qo'riqlash sanoatining o'z diapazonida ishlaydi va hub orqali ulanadi. Narxi yuqoriroq, batareya muddati qisqaroq, lekin huquqiy savol yo'q.</p>",
  manba: [["LoRa Alliance RP002-1.0.2", "https://lora-alliance.org/wp-content/uploads/2020/11/RP_2-1.0.2.pdf"]],
  ru: {
    yorliq: "Финансы и право",
    sarlavha: "Разрешение на частоту: вопрос, закрываемый до закупки",
    tana: "<p>В региональной таблице RP002-1.0.2 консорциума LoRa Alliance для Узбекистана указан только диапазон EU433 (433,05–434,79 МГц). Датчики Milesight на рынке поставляются преимущественно в исполнениях EU868 и RU864; исполнения на 433 МГц в перечне нет.</p>" +
      "<h4>Что делается</h4>" +
      "<ol><li>Банк получает письменное подтверждение уполномоченного органа в области связи о статусе использования выбранного диапазона. Ответ нужен до пилота.</li>" +
      "<li>Разрешённый диапазон вносится в техническое задание тендера конкретными цифрами.</li>" +
      "<li>У поставщика запрашивается срок поставки оборудования именно в этом исполнении: частотное исполнение задаётся на производстве и потом не меняется.</li></ol>" +
      "<p class='ogoh'>Сеть, развёрнутая без разрешения, может быть отключена по результатам проверки, а оборудование возврату не подлежит. Это единственный по-настоящему блокирующий риск решения — не технический, а правовой.</p>" +
      "<h4>Запасной путь</h4>" +
      "<p>Если разрешение не получено, ту же задачу решают батарейные датчики из решения 05: они работают в собственном диапазоне охранной отрасли и подключаются через хаб. Цена выше, срок службы батареи короче, зато правовой вопрос снят.</p>"
  }
},

"y06.n1": {
  yorliq: "Nosozlik",
  sarlavha: "Yanvarda bir nechta datchik birdan jim bo'ldi",
  tana: "<p>Belgisi: 8–12 yanvar oralig'ida to'rt-besh datchik ketma-ket «aloqa yo'q» holatiga o'tadi, shlyuz esa onlayn va boshqa obyektlar ishlayapti.</p>" +
    "<h4>Sababi</h4>" +
    "<p>Deyarli har doim batareya. Sovuqda Li-SOCl₂ elementining impuls berish qobiliyati pasayadi; agar element passivatsiyadan to'liq chiqmagan bo'lsa, uzatish paytida kuchlanish tanqidiy chegaradan pastga tushadi va qurilma qayta yuklanadi. Ikkinchi ehtimol — batareya almashtirilgandan keyin kadr hisoblagichi nolga tushgan va takrordan himoya qoidasi xabarlarni rad etmoqda.</p>" +
    "<h4>Oldini olish</h4>" +
    "<ul><li>Montajdan oldin passivatsiyani yechish: har datchik 10–15 daqiqa yoqib qo'yiladi.</li>" +
    "<li>Batareya kalendar bo'yicha, beshinchi yil bahorida almashtiriladi, «past batareya» signali kutilmaydi.</li>" +
    "<li>Qishda interval uzaytiriladi, qisqartirilmaydi.</li>" +
    "<li>Batareya almashtirilgan har qurilma qayta ro'yxatdan o'tkaziladi.</li></ul>" +
    "<p class='ogoh'>Bir necha datchik bir kunda jim bo'lsa, birinchi tekshiriladigan narsa — ular bir partiyadan yoki bir kunda o'rnatilganmi. Agar shunday bo'lsa, sabab batareya, obyekt emas.</p>",
  manba: [],
  ru: {
    yorliq: "Отказ",
    sarlavha: "В январе сразу несколько датчиков замолчали",
    tana: "<p>Признак: в период с 8 по 12 января четыре-пять датчиков подряд переходят в состояние «нет связи», при этом шлюз в сети и другие объекты работают.</p>" +
      "<h4>Причина</h4>" +
      "<p>Практически всегда батарея. На морозе элемент Li-SOCl₂ хуже отдаёт импульс; если он не вышел из пассивации полностью, в момент передачи напряжение падает ниже критического порога и устройство перезагружается. Вторая вероятная причина — после замены батареи счётчик кадров сбросился в ноль, и защита от повтора отбрасывает сообщения.</p>" +
      "<h4>Профилактика</h4>" +
      "<ul><li>Снятие пассивации до монтажа: каждый датчик держат включённым 10–15 минут.</li>" +
      "<li>Батареи меняются по календарю, весной пятого года, а не по сигналу «низкий заряд».</li>" +
      "<li>Зимой интервал увеличивают, а не сокращают.</li>" +
      "<li>Каждое устройство с заменённой батареей проходит повторную регистрацию.</li></ul>" +
      "<p class='ogoh'>Если несколько датчиков замолчали в один день, первое, что проверяют, — из одной ли они партии и не ставились ли в один день. Если да, причина в батарее, а не в объекте.</p>"
  }
},

"y06.n2": {
  yorliq: "Nosozlik",
  sarlavha: "Shlyuz tushdi — butun klaster ko'rinmay qoldi",
  tana: "<p>Belgisi: bir vaqtning o'zida sakkiz obyekt «aloqa yo'q» ga o'tadi. Aslida obyektlarda hech narsa bo'lmagan — shlyuzning 4G aloqasi, quvvati yoki o'zi ishdan chiqqan.</p>" +
    "<h4>Nega bu jiddiy</h4>" +
    "<p>Shlyuz — bu yechimning yagona nuqtasi. U ishlamagan vaqtda datchiklar hodisani ushlайdi, lekin uni hech kim eshitmaydi: A sinfidagi qurilmada joyida saqlash yo'q. Ya'ni shlyuzsiz o'tgan olti soat — bu nazoratsiz o'tgan olti soat.</p>" +
    "<h4>Oldini olish</h4>" +
    "<ul><li>Ikki operator SIM'i va watchdog: aloqa 10 daqiqa yo'qolsa, modem qayta yuklanadi.</li>" +
    "<li>DC UPS tarmoqdagi 4–8 soatlik uzilishni yopadi.</li>" +
    "<li>LWT va mustaqil heartbeat: platforma shlyuz tushganini o'zi aytadi, datchiklarning jimligidan taxmin qilmaydi.</li>" +
    "<li>Omborda butun zaxira shlyuz turadi va konfiguratsiya fayli saqlanadi — almashtirish 40 daqiqa, qayta sozlash emas.</li>" +
    "<li>10 obyektdan katta klasterga ikkinchi shlyuz qo'yiladi: qamrov bir-birini qoplaydi, bitta tushsa ikkinchisi eshitib turadi.</li></ul>" +
    "<p class='ogoh'>Shartnomada shlyuz uchun alohida reaksiya muddati yoziladi: 24 soat. Bitta datchik uchun bu muddat 5 ish kuni bo'lishi mumkin, shlyuz uchun emas.</p>",
  manba: [],
  ru: {
    yorliq: "Отказ",
    sarlavha: "Упал шлюз — из виду пропал весь кластер",
    tana: "<p>Признак: одновременно восемь объектов переходят в состояние «нет связи». На самих объектах при этом ничего не произошло — отказали связь 4G, питание или сам шлюз.</p>" +
      "<h4>Почему это серьёзно</h4>" +
      "<p>Шлюз — единственная точка отказа этого решения. Пока он не работает, датчики фиксируют события, но их никто не слышит: у устройств класса A нет локального хранения. То есть шесть часов без шлюза — это шесть часов без контроля.</p>" +
      "<h4>Профилактика</h4>" +
      "<ul><li>Две SIM разных операторов и watchdog: при пропадании связи на 10 минут модем перезагружается.</li>" +
      "<li>DC UPS закрывает отключение сети на 4–8 часов.</li>" +
      "<li>LWT и независимый heartbeat: платформа сама сообщает о падении шлюза, а не догадывается по молчанию датчиков.</li>" +
      "<li>На складе лежит полный запасной шлюз и сохранённый файл конфигурации — замена занимает 40 минут, а не повторную настройку.</li>" +
      "<li>На кластер больше десяти объектов ставится второй шлюз: зоны покрытия перекрываются, и при падении одного слышит второй.</li></ul>" +
      "<p class='ogoh'>В договоре для шлюза прописывается отдельный срок реакции — 24 часа. Для одного датчика этот срок может составлять 5 рабочих дней, для шлюза — нет.</p>"
  }
},

"y06.n3": {
  yorliq: "Nosozlik",
  sarlavha: "Bitta datchik kuniga o'nlab soxta hodisa yuboradi",
  tana: "<p>Belgisi: ombor darvozasidagi datchik tunda ham, kunduzi ham «ochildi — yopildi» yuboraveradi. Operator uch kundan keyin bu obyektga qarashni to'xtatadi — eng xavfli oqibat shu.</p>" +
    "<h4>Sababi</h4>" +
    "<p>Magnit bilan korpus orasidagi tirqish chegarada. Darvoza shamolda qimirlaydi yoki harorat o'zgarishida metall kengayadi, tirqish esa ishlash chegarasidan o'tib-o'tib turadi. Ikkinchi sabab — suv sizish zondi nam polga tekkan holda qo'yilgan: yuvish yoki kondensat uni ishga tushiradi.</p>" +
    "<h4>Oldini olish</h4>" +
    "<ul><li>Magnit tabaqaning ichki chetiga suriladi, tirqish eng kichik holatga keltiriladi.</li>" +
    "<li>Darvoza qimirlaydigan joyda hodisa platformada 60 soniyalik filtr bilan birlashtiriladi: bir daqiqa ichidagi ochilish-yopilish bitta yozuv bo'ladi.</li>" +
    "<li>Suv zondi poldan 3–5 mm ko'tariladi va quvur ostiga emas, suv yig'iladigan eng past nuqtaga qo'yiladi.</li>" +
    "<li>Platformada har datchik uchun haftalik hodisa soni kuzatiladi. Chegaradan oshgani servis vazifasini o'zi ochadi.</li></ul>" +
    "<p class='ogoh'>Soxta hodisani sozlama bilan «o'chirib qo'yish» taqiqlanadi. Datchik jim qilingani reyestrda ko'rinmasa, obyekt nazoratda deb hisoblanadi, aslida esa emas.</p>",
  manba: [],
  ru: {
    yorliq: "Отказ",
    sarlavha: "Один датчик шлёт десятки ложных событий в сутки",
    tana: "<p>Признак: датчик на складских воротах и ночью, и днём непрерывно шлёт «открыто — закрыто». Через три дня оператор перестаёт смотреть на этот объект — это и есть самое опасное последствие.</p>" +
      "<h4>Причина</h4>" +
      "<p>Зазор между магнитом и корпусом на границе срабатывания. Ворота ходят от ветра или металл расширяется при перепаде температуры, и зазор то входит, то выходит за порог. Вторая причина — зонд протечки уложен вплотную к влажному полу: его запускают мойка или конденсат.</p>" +
      "<h4>Профилактика</h4>" +
      "<ul><li>Магнит сдвигается к внутреннему краю створки, зазор доводится до минимума.</li>" +
      "<li>Там, где ворота подвижны, события объединяются на платформе фильтром в 60 секунд: открытие и закрытие в пределах минуты становятся одной записью.</li>" +
      "<li>Зонд протечки приподнимается на 3–5 мм над полом и ставится не под трубой, а в самой низкой точке, где собирается вода.</li>" +
      "<li>На платформе отслеживается недельное число событий по каждому датчику. Превышение порога само открывает сервисную задачу.</li></ul>" +
      "<p class='ogoh'>Отключать ложные события настройкой запрещено. Если заглушенный датчик не виден в реестре, объект считается под контролем, хотя фактически контроля нет.</p>"
  }
}
});

/* ---- Sahifadagi matnning ruscha varianti ---- */
window.MKB_LUGAT = Object.assign(window.MKB_LUGAT || {}, {
"Yechim 06 · Milesight LoRaWAN": "Решение 06 · Milesight LoRaWAN",
"Slaydga qaytish": "Вернуться к слайду",
"Batafsil": "Подробно",
"Oldingi": "Назад",
"Keyingi": "Далее",
"Kengaytirish": "Развернуть",
"Yig'ish": "Свернуть",
"Manba": "Источник",
"Yopish": "Закрыть",

"Yechim 06 · Katta ombor, texnik xona": "Решение 06 · Большой склад, техническое помещение",
"Datchiklar besh yil gapiradi, shlyuz esa bitta rozetkada turadi":
  "Датчики говорят пять лет, а шлюз стоит в одной розетке",
"Bu yechimda obyektda umuman elektr kerak emas. Batareyali datchiklar ombor ichidan eshik, harorat, namlik va suv haqida xabar beradi; ularning hammasini bir necha kilometr narida, elektr bor nuqtada turgan bitta shlyuz eshitadi. Video faqat hodisa kelganda ochiladi.":
  "В этом решении электричество на объекте не требуется вовсе. Батарейные датчики сообщают изнутри склада о двери, температуре, влажности и воде; всех их слышит один шлюз, стоящий за несколько километров в точке с электроснабжением. Видео открывается только при поступлении события.",
"Milesight UG65 shlyuzi va WS-seriyali datchiklar. Fotosurat ko'rgazma komplektidan.":
  "Шлюз Milesight UG65 и датчики серии WS. Фотография из демонстрационного комплекта.",
"Har bir blok bosiladi: hisob, protokol va montaj tartibi shu yerda ochiladi.":
  "Любой блок открывается: расчёт, протокол и порядок монтажа — внутри.",

"obyektda quvvat sarfi": "потребление энергии на объекте",
"yil batareya": "года работы батареи",
"obyekt bir shlyuzda": "объектов на один шлюз",
"mln so'm obyektga": "млн сумов на объект",
"MB oyiga, butun klaster": "МБ в месяц на весь кластер",

"Komplekt": "Комплект",
"Qishki sutka": "Зимние сутки",
"Quvvat": "Энергия",
"Ma'lumot yo'li": "Путь данных",
"Operator": "Оператор",
"Montaj": "Монтаж",
"Narx": "Стоимость",
"Bozor": "Рынок",
"Xizmat": "Обслуживание",
"Nosozlik": "Отказы",
"Mos obyektlar": "Подходящие объекты",
"Savollar": "Вопросы",
"Solishtirish": "Сравнение",

"Komplekt nimadan iborat": "Из чего состоит комплект",
"500–1000 m² li ombor yoki isitilmaydigan texnik xona uchun odatiy tarkib. Aniq son obyekt ko'rigida belgilanadi: har eshik, har lyuk va suv yig'iladigan har nuqta alohida datchik oladi.":
  "Типовой состав для склада площадью 500–1000 м² или неотапливаемого технического помещения. Точное количество определяется на осмотре объекта: отдельный датчик получает каждая дверь, каждый люк и каждая точка, где скапливается вода.",

"Eshik va darvoza datchigi": "Датчик двери и ворот",
"Ikki qismli magnit kontakt. Korpus ramkaga, magnit tabaqaga qo'yiladi. Ichida ER14250 batareya, sozlamaga qarab 3,5 yildan 6,8 yilgacha ishlaydi.":
  "Двухсоставной магнитный контакт. Корпус ставится на раму, магнит — на створку. Внутри батарея ER14250, в зависимости от настроек служит от 3,5 до 6,8 года.",
"Harorat va namlik datchigi": "Датчик температуры и влажности",
"Ombordagi eng sovuq yoki eng nam nuqtaga qo'yiladi. ER18505 batareyada 10 daqiqalik intervalda besh yil ishlaydi. Qish uchun asosiy qurilma: quvur muzlashi shu yerdan ko'rinadi.":
  "Ставится в самой холодной или самой влажной точке склада. На батарее ER18505 при интервале 10 минут служит пять лет. Главный прибор для зимы: именно здесь видно приближение размораживания труб.",
"Suv sizish zondi": "Зонд протечки",
"Podvalda, quvur kirgan joyda va suv yig'iladigan eng past nuqtada. Poldan 3–5 mm ko'tarib qo'yiladi, aks holda yuvish ham hodisa beradi.":
  "В подвале, в месте ввода труб и в самой низкой точке, где собирается вода. Приподнимается на 3–5 мм над полом, иначе событие будет давать даже мойка.",
"Tutun datchigi": "Датчик дыма",
"Har yopiq xonaga kamida bittadan. EN 14604 sertifikati talab qilinadi: bu nafaqat aloqa, balki yong'in xavfsizligi majburiyati masalasi.":
  "Не менее одного на каждое закрытое помещение. Требуется сертификат EN 14604: это вопрос не только связи, но и обязательств по пожарной безопасности.",
"Tasdiqlovchi kamera": "Подтверждающая камера",
"Asosiy kirishga qaratilgan 1–2 kamera. Doimiy oqim bermaydi: eshik ochilganda platforma undan 30–60 soniyalik klip so'raydi. Obyektda kamera bo'lsa, yangisi olinmaydi.":
  "Одна-две камеры, направленные на основной вход. Постоянного потока не дают: при открытии двери платформа запрашивает у них клип на 30–60 секунд. Если камера на объекте уже есть, новая не закупается.",
"Shlyuz": "Шлюз",
"Butun klasterga bitta. Elektr bor nuqtada: filial tomida, qo'shni tashkilotda yoki elektrga ulangan obyektda. 2,9 Vt iste'mol qiladi, ichida tarmoq serveri bor — bulut kerak emas.":
  "Один на весь кластер. В точке с электроснабжением: на кровле филиала, в соседней организации или на объекте, подключённом к сети. Потребляет 2,9 Вт, внутри — сетевой сервер, облако не требуется.",

"Soni": "Количество",
"Batareya": "Батарея",
"Qayerga": "Куда",
"Iste'mol": "Потребление",

"Qishki sutka: 14-yanvar, Toshkent atrofidagi ombor":
  "Зимние сутки: 14 января, склад в окрестностях Ташкента",
"Bir sutkada nima bo'ladi va har bosqichda qancha energiya sarflanadi. Tashqarida tunda −11 °C, kunduzi +2 °C; obyektda elektr yo'q va hech qachon bo'lmaydi.":
  "Что происходит за сутки и сколько энергии тратится на каждом этапе. На улице ночью −11 °C, днём +2 °C; электроснабжения на объекте нет и не будет.",

"Datchiklar uxlamaydi, ular shunchaki jim turadi. Har biri mikroamper darajasidagi tok yeydi, o'n daqiqada bir marta uyg'onib holatini yuboradi. Ombor ichida +3 °C — kechagidan 1,5 daraja past.":
  "Датчики не спят — они просто молчат. Каждый потребляет ток на уровне микроампер и раз в десять минут просыпается, чтобы отправить статус. Внутри склада +3 °C — на полтора градуса ниже, чем накануне.",
"Sarf: besh datchikka sutkasiga taxminan 0,2 Vt·soat": "Расход: около 0,2 Вт·ч в сутки на пять датчиков",

"Yon eshik ochiladi. Magnit kontakt uziladi, WS301 bir soniyadan kam vaqt ichida efirga chiqadi. Xabar SF9 da 185 millisekund uchadi va shlyuzga −108 dBm, SNR +4,5 bilan yetadi.":
  "Открывается боковая дверь. Магнитный контакт размыкается, WS301 выходит в эфир меньше чем за секунду. Сообщение летит на SF9 185 миллисекунд и приходит на шлюз с уровнем −108 dBm и SNR +4,5.",
"Shlyuz imzoni tekshiradi, payload'ni ochadi va MQTT orqali brokerga yozadi. Platformada hodisa 02:13:07 da paydo bo'ladi — eshik ochilganidan ikki soniya keyin.":
  "Шлюз проверяет подпись, расшифровывает payload и публикует сообщение брокеру по MQTT. На платформе событие появляется в 02:13:07 — через две секунды после открытия двери.",

"Platforma reyestrdan shu datchikka bog'langan kamerani topadi va undan klip so'raydi. Kamera uyquda edi: uyg'onish va birinchi kadr 9 soniya oladi. Operator ekranida hodisa allaqachon turibdi, kadr joyida yuklanish belgisi aylanadi.":
  "Платформа находит в реестре камеру, привязанную к этому датчику, и запрашивает клип. Камера была в спящем режиме: пробуждение и первый кадр занимают 9 секунд. На экране оператора событие уже стоит, а на месте кадра крутится индикатор загрузки.",
"Sarf: kameraning 20 soniyalik uyg'oqligi 0,04 Vt·soat": "Расход: 20 секунд бодрствования камеры — 0,04 Вт·ч",

"Harorat datchigi ombor ichida +1,2 °C ni ko'rsatadi. Platformadagi chegara +5 °C: vazifa avtomatik ochiladi va obyekt menejeriga suv tizimini bo'shatish kerakligi haqida topshiriq tushadi.":
  "Датчик температуры показывает внутри склада +1,2 °C. Порог на платформе — +5 °C: задача открывается автоматически, и менеджеру объекта поступает поручение слить воду из системы.",
"Quyosh chiqadi, lekin bu yechimda hech narsani o'zgartirmaydi: obyektda quyosh paneli yo'q va kerak emas. Shlyuz filial rozetkasida ishlayapti.":
  "Восходит солнце, но в этом решении это ничего не меняет: солнечной панели на объекте нет и не требуется. Шлюз работает от розетки в филиале.",
"Kunlik holat to'plami: besh datchikning batareya foizi, RSSI va SNR qiymatlari platformaga tushadi. Bitta datchikning signali bir hafta ichida 7 dB pasaygan — servis vazifasi o'zi ochiladi.":
  "Суточный набор статусов: проценты заряда пяти датчиков, значения RSSI и SNR уходят на платформу. У одного датчика сигнал за неделю упал на 7 дБ — сервисная задача открывается сама.",
"Sutka yakuni: obyekt 0,24 Vt·soat sarfladi. Bu bitta LED chiroqning bir daqiqalik ishiga teng.":
  "Итог суток: объект израсходовал 0,24 Вт·ч. Это равно минуте работы одной светодиодной лампы.",

"Dekabr quvvat byudjeti": "Декабрьский энергобюджет",
"Bu yechimning asosiy afzalligi shu: obyektda quvvat masalasi umuman yo'q. Panel ham, akkumulyator ham, shkaf ham talab qilinmaydi. Quvvat faqat shlyuzga kerak, u esa boshqa joyda turadi.":
  "Главное преимущество этого решения именно в этом: на объекте вопрос энергоснабжения не стоит вовсе. Не нужны ни панель, ни аккумулятор, ни шкаф. Питание требуется только шлюзу, а он стоит в другом месте.",
"Obyektda": "На объекте",
"Besh datchik sutkasiga 0,2 Vt·soat sarflaydi va bu energiya ularning o'z batareyasidan olinadi. Besh yil davomida obyektga bironta simni tortish kerak emas.":
  "Пять датчиков расходуют 0,2 Вт·ч в сутки, и эта энергия берётся из их собственных батарей. За пять лет на объект не нужно протягивать ни одного провода.",
"Shlyuz nuqtasida": "В точке шлюза",
"Shlyuz va 4G router birgalikda 142 Vt·soat/sutka oladi. Rozetka bo'lsa, bu hisob umuman yopiladi. Bo'lmasa — 200 Vt panel va 12 V 100 A·soatlik LiFePO4, quyoshsiz 7 kunga yetadi.":
  "Шлюз и 4G-маршрутизатор вместе потребляют 142 Вт·ч в сутки. При наличии розетки расчёт закрывается целиком. При её отсутствии — панель 200 Вт и LiFePO4 12 В 100 А·ч, хватает на 7 суток без солнца.",
"Kamerada": "На камере",
"Agar tasdiqlovchi kamera quyosh-4G bo'lsa, uning byudjeti alohida hisoblanadi va oyiga 30 hodisada 0,2 GB trafik bilan cheklanadi. Doimiy oqim bu yechimda yoqilmaydi.":
  "Если подтверждающая камера солнечно-4G, её бюджет считается отдельно и при 30 событиях в месяц ограничивается 0,2 ГБ трафика. Постоянный поток в этом решении не включается.",

"Datchikdan MKB platformasigacha": "От датчика до платформы МКБ",
"Yo'l oltita bo'lakdan iborat va har biri boshqasidan mustaqil almashtiriladi. Datchik brendi o'zgarsa, faqat birinchi ikki bo'lak o'zgaradi; qolgan to'rttasi joyida qoladi.":
  "Путь состоит из шести участков, и каждый заменяется независимо от остальных. При смене бренда датчика меняются только первые два участка; остальные четыре остаются на месте.",
"LoRa radiokanali: 868 MHz, SF7–SF12, 125 kHz. Payload 12 bayt, AppSKey bilan shifrlangan, MIC imzosi NwkSKey bilan. Shlyuz qabul qiladi, dekoder JSON'ga aylantiradi, MQTT(s) mijoz sertifikati bilan MKB brokeriga yozadi. Adapter yagona hodisa sxemasiga keltiradi, yadro obyektga bog'laydi va ekranga chiqaradi.":
  "Радиоканал LoRa: 868 МГц, SF7–SF12, полоса 125 кГц. Payload 12 байт, зашифрован ключом AppSKey, подпись MIC — ключом NwkSKey. Шлюз принимает пакет, декодер приводит его к JSON, публикация в брокер МКБ идёт по MQTT(s) с клиентским сертификатом. Адаптер приводит данные к единой схеме события, ядро привязывает его к объекту и выводит на экран.",

"Operator nima ko'radi va nima qila oladi": "Что видит оператор и что он может сделать",
"Bu yechim ko'rsatmaydi, o'lchaydi. Shuning uchun ekranning markazida video emas, obyektning holati turadi: eshik yopiqmi, ichkarida necha daraja, suv bormi, datchiklar tirikmi.":
  "Это решение не показывает, а измеряет. Поэтому в центре экрана не видео, а состояние объекта: закрыта ли дверь, сколько градусов внутри, нет ли воды, живы ли датчики.",

"Montaj: kim, qancha vaqtda, nimani tekshiradi":
  "Монтаж: кто, за какое время и что проверяет",
"Ish klaster bo'yicha rejalashtiriladi, obyekt bo'yicha emas. Shlyuz nuqtasi birinchi kuni yopiladi, obyektlar keyin ketma-ket ulanadi.":
  "Работа планируется по кластеру, а не по объекту. Точка шлюза закрывается в первый день, объекты подключаются затем один за другим.",

"Narx: 3–8 mln so'm bir obyektga": "Стоимость: 3–8 млн сумов на объект",
"Datchiklar, 4–6 dona": "Датчики, 4–6 шт.",
"Shlyuz ulushi, 5–10 obyektga bo'linadi": "Доля шлюза, делится на 5–10 объектов",
"Tasdiqlovchi kamera, obyektda bo'lsa 0": "Подтверждающая камера, при наличии — 0",
"Montaj, sozlash, reyestrga kiritish": "Монтаж, настройка, внесение в реестр",
"Jami": "Итого",
"mln so'm": "млн сумов",
"Qator": "Статья",
"2026-yil sentabr holatiga bozor bahosi. Yakuniy narx tender bo'yicha kamida uchta tijorat taklifidan olinadi.":
  "Рыночные цены по состоянию на сентябрь 2026 года. Окончательная стоимость определяется по тендеру не менее чем из трёх коммерческих предложений.",

"Kim sotadi, kim o'rnatadi": "Кто продаёт и кто монтирует",
"Milesight qurilmalari O'zbekistonda rasmiy distribyutor orqali import qilinadi. Yetkazish muddati odatda 4–8 hafta; kichik partiya aviajo'natma bilan ikki haftada keladi, lekin birlik narxi qimmatroq tushadi.":
  "Оборудование Milesight ввозится в Узбекистан через официального дистрибьютора. Срок поставки обычно 4–8 недель; небольшая партия авиаотправкой приходит за две недели, но единица обходится дороже.",
"Kim yetkazadi": "Кто поставляет",
"Rasmiy distribyutor orqali import. Datchik, shlyuz va zaxira batareya bitta partiyada, bitta chastota variantida buyuriladi.":
  "Импорт через официального дистрибьютора. Датчики, шлюз и запасные батареи заказываются одной партией и в одном частотном исполнении.",
"Kim o'rnatadi": "Кто монтирует",
"Birinchi klasterni IoT integratori quradi: shlyuz, tarmoq serveri va MQTT ulanishi tajriba talab qiladi. Keyingi obyektlarni o'qitilgan bank montajchisi o'zi ulaydi — datchik o'rnatish bir soatlik ish.":
  "Первый кластер разворачивает IoT-интегратор: шлюз, сетевой сервер и подключение MQTT требуют опыта. Последующие объекты подключает обученный монтажник банка — установка датчика занимает час.",
"Kim javob beradi": "Кто отвечает",
"Shartnomada shlyuz va datchik uchun alohida reaksiya muddati yoziladi. Shlyuz — 24 soat, datchik — 5 ish kuni. Bitta umumiy muddat yozilsa, klaster butun hafta jim turishi mumkin.":
  "В договоре прописываются отдельные сроки реакции на шлюз и на датчик. Шлюз — 24 часа, датчик — 5 рабочих дней. При одном общем сроке кластер может простоять в молчании всю неделю.",

"Besh yil ichida nima sarflanadi": "Что расходуется за пять лет",
"Bu yechimning asosiy afzalligi uzoq muddatda ko'rinadi: harakatlanadigan qismi yo'q, yoqilg'i yo'q, almashtiriladigan akkumulyator yo'q. Besh yilda bitta jiddiy ish bor — batareya almashtirish.":
  "Главное преимущество этого решения проявляется на длинной дистанции: нет движущихся частей, нет топлива, нет заменяемых аккумуляторов. За пять лет предстоит одна серьёзная работа — замена батарей.",

"Uchta nosozlik va ularning oldini olish": "Три отказа и их предупреждение",
"Quyidagilar nazariy xatarlar emas: har uchalasi LoRaWAN tarmoqlarida muntazam uchraydi va har birining oldini olish usuli aniq.":
  "Перечисленное — не теоретические риски: все три регулярно встречаются в сетях LoRaWAN, и способ предупреждения каждого известен точно.",
"Oldini olish": "Профилактика",

"Qaysi obyektga mos, qaysi biriga emas": "Каким объектам подходит, а каким нет",
"Mos keladi": "Подходит",
"Mos emas": "Не подходит",
"Bir tumandagi bir nechta ombor yoki sex: bitta shlyuz hammasini eshitadi va narx bo'linadi.":
  "Несколько складов или цехов в одном районе: один шлюз слышит все, и стоимость делится.",
"Isitilmaydigan ombor: qishda haroratni kuzatish quvur yorilishidan qimmatroq zararning oldini oladi.":
  "Неотапливаемый склад: наблюдение за температурой зимой предотвращает ущерб дороже, чем разрыв трубы.",
"Ko'p eshikli obyekt: har eshikka alohida datchik qo'yish kameradan besh barobar arzon.":
  "Объект со множеством дверей: отдельный датчик на каждую дверь в пять раз дешевле камеры.",
"Filialdan 2 km radiusdagi obyekt: shlyuz filial tomida turadi va quvvat masalasi umuman yo'q.":
  "Объект в радиусе 2 км от филиала: шлюз ставится на кровле филиала, и вопрос питания снимается полностью.",
"Yolg'iz turgan uzoq obyekt: shlyuz narxi bitta obyektga tushadi va yechim 04-variantdan qimmatlashadi.":
  "Одиночный удалённый объект: стоимость шлюза ложится на один объект, и решение становится дороже варианта 04.",
"Katta ochiq maydon: datchik hududni emas, faqat eshik va xonani ko'radi. Bunga 09-minora kerak.":
  "Большая открытая территория: датчик видит не периметр, а только дверь и помещение. Для этого нужна вышка из решения 09.",
"Doimiy video talab qilinadigan qimmat obyekt: LoRaWAN kanali video ko'tarmaydi.":
  "Дорогой объект, где требуется постоянное видео: канал LoRaWAN видео не несёт.",
"Davlat qo'riqlash pultiga ulanishi shart bo'lgan obyekt: pult SIA DC-09 kutadi, buni 05-yechim beradi.":
  "Объект, который обязан быть подключён к пульту государственной охраны: пульт ожидает SIA DC-09, это даёт решение 05.",

"Yetkazib beruvchidan so'raladigan savollar": "Вопросы, которые задают поставщику",
"Tijorat taklifi olinishidan oldin yoziladi. Javoblar shartnomaga ilova qilinadi.":
  "Задаются до получения коммерческого предложения. Ответы прикладываются к договору.",
"Qurilmalar qaysi chastota variantida yetkaziladi va bu variant O'zbekistonda ruxsat etilganini nima tasdiqlaydi?":
  "В каком частотном исполнении поставляется оборудование и чем подтверждается, что это исполнение разрешено в Узбекистане?",
"Shlyuzning ichki tarmoq serveri bulutsiz ishlaydimi va MQTT mijoz sertifikatini qo'llab-quvvatlaydimi?":
  "Работает ли встроенный сетевой сервер шлюза без облака и поддерживает ли он клиентский сертификат MQTT?",
"Payload dekoderi qanday beriladi: tayyor JavaScript faylimi yoki hujjatdagi bayt jadvalimi?":
  "В каком виде предоставляется декодер payload: готовым файлом JavaScript или таблицей байтов в документации?",
"Datchiklarning batareya resursi qaysi interval va qaysi haroratda hisoblangan?":
  "Для какого интервала передачи и какой температуры рассчитан заявленный ресурс батарей?",
"Konfiguratsiyani faylga saqlab, zaxira shlyuzga bir amalda tiklash mumkinmi?":
  "Можно ли сохранить конфигурацию в файл и одним действием восстановить её на запасном шлюзе?",
"Dasturiy ta'minot yangilanishi necha yil davomida beriladi va u qanday yetkaziladi?":
  "Сколько лет предоставляются обновления программного обеспечения и каким образом они доставляются?",
"Shlyuz ishdan chiqsa, almashtirish muddati nechchi kun va zaxira jihoz qayerda turadi?":
  "Какой срок замены при выходе шлюза из строя и где хранится подменное оборудование?",
"Tutun datchigi EN 14604 sertifikatiga egami va sertifikat nusxasi beriladimi?":
  "Имеет ли датчик дыма сертификат EN 14604 и предоставляется ли его копия?",
"Bir shlyuzga necha qurilma ulanishi 10 daqiqalik intervalda sinovdan o'tgan?":
  "Сколько устройств на один шлюз проверено испытанием при интервале 10 минут?",
"Zaxira batareyalar qaysi shartlarda saqlanadi va yetkazish muddati qancha?":
  "В каких условиях хранятся запасные батареи и каков срок их поставки?",

"O'nta yechim orasida": "Среди десяти решений",
"Yechim": "Решение",
"Reolink va Home Hub": "Reolink и Home Hub",
"Hikvision quyosh-4G": "Hikvision солнце-4G",
"Dahua quyosh-4G": "Dahua солнце-4G",
"LiFePO4 shkafi": "Шкаф LiFePO4",
"Ajax datchiklari": "Датчики Ajax",
"Milesight LoRaWAN": "Milesight LoRaWAN",
"Ko'chma stansiya": "Мобильная станция",
"EFOY yoqilg'i elementi": "Топливный элемент EFOY",
"Mobil minora": "Мобильная вышка",
"Klaster shkafi": "Кластерный шкаф",
"Uy va kichik ofis": "Дом и малый офис",
"Tashqi perimetr": "Наружный периметр",
"Tashqi perimetr, PTZ": "Наружный периметр, PTZ",
"Ko'p qurilmali obyekt": "Объект с множеством устройств",
"Ofis va qimmat obyekt": "Офис и дорогой объект",
"Katta ombor, texnik xona": "Большой склад, техническое помещение",
"Qisqa muddatli aktiv": "Краткосрочный актив",
"Chekka va qimmat obyekt": "Удалённый и дорогой объект",
"Katta maydon": "Большая территория",
"Bir hududdagi obyektlar": "Объекты в одной локации",

"Ichki foydalanish uchun · Sentabr 2026": "Для внутреннего пользования · Сентябрь 2026",
"MKBANK · Aktivlar nazorati": "MKBANK · Контроль активов"
});

/* ---- sahifa matnining qolgan qismi ---- */
Object.assign(window.MKB_LUGAT, {
"Yechim 06": "Решение 06",
"Taqdimotga qaytish": "Вернуться к презентации",
"Bo'limlar": "Разделы",
"Chop etish": "Печать",
"Til": "Язык",
"ta batafsil": "подробных справок",
"Ishonchli texnologiyalar. Barqaror rivojlanish.": "Надёжные технологии. Устойчивое развитие.",
"Dekabr byudjeti": "Декабрьский бюджет",
"Narx va bozor": "Стоимость и рынок",
"Besh yil": "Пять лет",
"Nosozliklar": "Отказы",
"Qaysi obyektga": "Каким объектам",
"0 Vt": "0 Вт",

"Har yopiq xonaga kamida bittadan. Sertifikat talab qilinadi: bu nafaqat aloqa, balki yong'in xavfsizligi majburiyati masalasi.":
 "Не менее одного на каждое закрытое помещение. Требуется сертификат: это вопрос не только связи, но и обязательств по пожарной безопасности.",
"Asosiy kirishga qaratilgan kamera doimiy oqim bermaydi: eshik ochilganda platforma undan 30–60 soniyalik klip so'raydi. Obyektda kamera bo'lsa, yangisi olinmaydi.":
 "Камера, направленная на основной вход, постоянного потока не даёт: при открытии двери платформа запрашивает у неё клип на 30–60 секунд. Если камера на объекте уже есть, новая не закупается.",
"Elektr bor nuqtada: filial tomida, qo'shni tashkilotda yoki elektrga ulangan obyektda. 2,9 Vt iste'mol qiladi, ichida tarmoq serveri bor — bulut kerak emas.":
 "В точке с электроснабжением: на кровле филиала, в соседней организации или на объекте, подключённом к сети. Потребляет 2,9 Вт, внутри — сетевой сервер, облако не требуется.",
"Datchik va shlyuz bitta chastota variantida buyuriladi. Turli variantdagi qurilma bir-birini umuman ko'rmaydi va bu faqat montaj kunida ma'lum bo'ladi.":
 "Датчики и шлюз заказываются в одном частотном исполнении. Устройства разных исполнений не видят друг друга вовсе, и выясняется это только в день монтажа.",

"tun": "ночь", "hodisa": "событие", "kadr": "кадр", "tong": "утро", "kunduz": "день", "yakun": "итог",
"Besh datchik jim turadi": "Пять датчиков молчат",
"Datchiklar uxlamaydi, ular shunchaki gapirmaydi. Har biri mikroamper darajasidagi tok yeydi va o'n daqiqada bir marta uyg'onib holatini yuboradi. Ombor ichida +3 °C — kechagidan bir yarim daraja past.":
 "Датчики не спят — они просто не говорят. Каждый потребляет ток на уровне микроампер и раз в десять минут просыпается, чтобы отправить статус. Внутри склада +3 °C — на полтора градуса ниже вчерашнего.",
"Sutkasiga besh datchikka taxminan 0,2 Vt·soat": "На пять датчиков около 0,2 Вт·ч в сутки",
"Yon eshik ochiladi": "Открывается боковая дверь",
"Magnit kontakt uziladi va WS301 bir soniyadan kam vaqt ichida efirga chiqadi. Xabar SF9 da 185 millisekund uchadi, shlyuzga −108 dBm va SNR +4,5 bilan yetadi. Shlyuz imzoni tekshiradi, payload'ni ochadi va MQTT orqali brokerga yozadi. Platformada hodisa 02:13:07 da paydo bo'ladi.":
 "Магнитный контакт размыкается, и WS301 выходит в эфир меньше чем за секунду. Сообщение летит на SF9 185 миллисекунд и приходит на шлюз с уровнем −108 dBm и SNR +4,5. Шлюз проверяет подпись, расшифровывает payload и публикует его брокеру по MQTT. На платформе событие появляется в 02:13:07.",
"Bitta uzatish: 0,00002 Vt·soat": "Одна передача — 0,00002 Вт·ч",
"Kamera uyg'onadi": "Камера просыпается",
"Platforma reyestrdan shu datchikka bog'langan kamerani topadi va klip so'raydi. Kamera uyquda edi: uyg'onish va birinchi kadr to'qqiz soniya oladi. Operator ekranida hodisa allaqachon turibdi, kadr o'rnida yuklanish belgisi aylanadi.":
 "Платформа находит в реестре камеру, привязанную к этому датчику, и запрашивает клип. Камера была в спящем режиме: пробуждение и первый кадр занимают девять секунд. На экране оператора событие уже стоит, на месте кадра крутится индикатор загрузки.",
"Kameraning 20 soniyalik uyg'oqligi: 0,04 Vt·soat": "20 секунд бодрствования камеры — 0,04 Вт·ч",
"Harorat chegaradan o'tadi": "Температура пересекает порог",
"EM300-TH ombor ichida +1,2 °C ni ko'rsatadi. Platformadagi chegara +5 °C: vazifa avtomatik ochiladi va obyekt menejeriga suv tizimini bo'shatish topshirig'i tushadi. Bu kamera ko'rmaydigan zarar — quvur yorilsa, ta'mir jihoz narxidan qimmatga tushadi.":
 "EM300-TH показывает внутри склада +1,2 °C. Порог на платформе — +5 °C: задача открывается автоматически, и менеджеру объекта поступает поручение слить воду из системы. Этот ущерб камера не увидит — при разрыве трубы ремонт обойдётся дороже самого оборудования.",
"Quyosh chiqadi va hech narsa o'zgarmaydi": "Восходит солнце, и ничего не меняется",
"Obyektda quyosh paneli yo'q va kerak emas. Shlyuz filial rozetkasida ishlayapti, datchiklar esa o'z batareyasida. Dekabr quyoshining kamligi bu yechimga umuman ta'sir qilmaydi — 02 va 04-yechimlardan asosiy farqi shu.":
 "Солнечной панели на объекте нет и не требуется. Шлюз работает от розетки в филиале, датчики — от собственных батарей. Скудное декабрьское солнце на это решение не влияет вовсе — в этом его главное отличие от решений 02 и 04.",
"Kunlik holat to'plami": "Суточный набор статусов",
"Besh datchikning batareya foizi, RSSI va SNR qiymatlari platformaga tushadi. Bittasining signali bir hafta ichida 7 dB pasaygan: omborga tovar to'ldirilgan yoki javon ko'chirilgan. Servis vazifasi o'zi ochiladi.":
 "Проценты заряда пяти датчиков, значения RSSI и SNR уходят на платформу. У одного сигнал за неделю упал на 7 дБ: склад заполнили товаром или переставили стеллаж. Сервисная задача открывается сама.",
"Sutka yakuni: obyektda 0,24 Vt·soat": "Итог суток: 0,24 Вт·ч на объекте",

"Besh datchik shuncha sarflaydi va bu energiya ularning o'z batareyasidan olinadi. Besh yil davomida obyektga bironta simni tortish kerak emas.":
 "Столько расходуют пять датчиков, и эта энергия берётся из их собственных батарей. За пять лет на объект не нужно протягивать ни одного провода.",
"Shlyuz va 4G router birgalikda shuncha oladi. Rozetka bo'lsa, hisob shu yerda yopiladi. Bo'lmasa — 200 Vt panel va 12 V 100 A·soatlik LiFePO4, quyoshsiz yetti kunga yetadi.":
 "Столько потребляют шлюз и 4G-маршрутизатор вместе. При наличии розетки расчёт на этом закрывается. При её отсутствии — панель 200 Вт и LiFePO4 12 В 100 А·ч, хватает на семь суток без солнца.",
"Tasdiqlovchi kamera quyosh-4G bo'lsa, uning byudjeti alohida hisoblanadi: oyiga 30 hodisada shuncha trafik chiqadi. Doimiy oqim bu yechimda yoqilmaydi.":
 "Если подтверждающая камера солнечно-4G, её бюджет считается отдельно: при 30 событиях в месяц выходит такой трафик. Постоянный поток в этом решении не включается.",
"Ko'rikda birinchi tekshiriladigan narsa — 2 km radiusda elektr bor nuqta bormi. Bo'lsa, quvvat bo'limi butunlay yopiladi va smeta 3 mln so'mga tushadi.":
 "Первое, что проверяется на осмотре, — есть ли в радиусе 2 км точка с электроснабжением. Если есть, раздел энергоснабжения закрывается полностью, а смета опускается до 3 млн сумов.",

"Yo'l oltita bo'lakdan iborat va har biri boshqasidan mustaqil almashtiriladi. Datchik brendi o'zgarsa, faqat birinchi ikki bo'lak o'zgaradi; qolgan to'rttasi joyida qoladi. Yashil halqali bo'g'inni bosing.":
 "Путь состоит из шести участков, и каждый заменяется независимо от остальных. При смене бренда датчика меняются только первые два; остальные четыре остаются на месте. Нажмите на звено с зелёным маркером.",
"Datchik": "Датчик",
"WS301 magnit kontakti, ER14250 batareyada. Hodisani o'zi aniqlaydi, tarmoqqa ulanmaydi":
 "Магнитный контакт WS301 на батарее ER14250. Событие определяет сам, к сети не подключается",
"LoRaWAN A sinf": "LoRaWAN, класс A",
"Radiokanal": "Радиоканал",
"12 baytlik payload AppSKey bilan shifrlangan, MIC imzosi NwkSKey bilan qo'yilgan":
 "Payload на 12 байт зашифрован ключом AppSKey, подпись MIC поставлена ключом NwkSKey",
"SF7–SF12 · 46 ms – 1,3 s": "SF7–SF12 · 46 мс – 1,3 с",
"Shlyuz va tarmoq serveri": "Шлюз и сетевой сервер",
"Imzoni tekshiradi, takrorni yo'qotadi, payload'ni ochadi va dekoder orqali JSON qiladi":
 "Проверяет подпись, отбрасывает дубликаты, расшифровывает payload и приводит его декодером к JSON",
"UG65 · ichki server": "UG65 · встроенный сервер",
"Bulut talab qilinmaydi": "Облако не требуется",
"Transport": "Транспорт",
"Har shlyuzga alohida mijoz sertifikati, broker ACL faqat o'z obyektlariga yozishga ruxsat beradi":
 "На каждый шлюз отдельный клиентский сертификат, ACL брокера разрешает запись только в свои объекты",
"Adapter": "Адаптер",
"Milesight formatini yagona hodisa sxemasiga keltiradi: obyekt, tur, vaqt, ishonch, dalil":
 "Приводит формат Milesight к единой схеме события: объект, тип, время, достоверность, доказательство",
"Bank serverida": "На сервере банка",
"DevEUI + fcnt bo'yicha idempotent": "Идемпотентен по паре DevEUI + fcnt",
"Yadro va ekranlar": "Ядро и экраны",
"Hodisa obyektga bog'lanadi, muddat qo'yiladi, operator va obyekt menejeriga chiqadi":
 "Событие привязывается к объекту, назначается срок, оно выводится оператору и менеджеру объекта",
"Hodisalar doskasi": "Доска событий",
"Reyestr · vazifa · hisobot": "Реестр · задача · отчёт",
"Tungi hodisa uchun jami: eshik ochilganidan operator ekranidagi yozuvgacha 2–3 soniya, kadrgacha 25 soniyagacha.":
 "Итого по ночному событию: от открытия двери до записи на экране оператора 2–3 секунды, до кадра — до 25 секунд.",
"Ishlab chiqaruvchi buluti yo'lda yo'q: shlyuz to'g'ridan-to'g'ri bank brokeriga ulanadi va ma'lumot O'zbekistondan chiqmaydi.":
 "Облака производителя в этом пути нет: шлюз подключается напрямую к брокеру банка, и данные не покидают Узбекистан.",
"Datchikdan MKB platformasigacha": "От датчика до платформы МКБ",

"Ko'rsatkich": "Показатель", "Manbasi": "Источник", "Yangilanishi": "Обновление",
"Eshik va darvoza holati": "Состояние двери и ворот",
"WS301 magnit kontakti": "Магнитный контакт WS301",
"Hodisada · 10 daq": "По событию · 10 мин",
"Ombor harorati va namligi": "Температура и влажность склада",
"EM300-TH, 30 kunlik grafik": "EM300-TH, график за 30 дней",
"10 daq": "10 мин",
"Suv sizishi": "Протечка воды",
"Zond datchigi": "Датчик-зонд",
"Faqat hodisada": "Только по событию",
"Har datchikning batareyasi": "Заряд каждого датчика",
"Holat xabari, foizda": "Статусное сообщение, в процентах",
"Signal sifati": "Качество сигнала",
"Shlyuzdagi RSSI va SNR": "RSSI и SNR на шлюзе",
"Tasdiqlovchi kadr": "Подтверждающий кадр",
"Bog'langan kameradan klip": "Клип с привязанной камеры",
"Talab bo'yicha": "По запросу",
"Masofadan qilinadi": "Делается удалённо",
"Hodisaga qarab kadr so'rash. Uzatish intervalini o'zgartirish — buyruq navbatga qo'yiladi va datchikning keyingi uzatishida yetadi. Harorat chegarasini qo'yish. Ta'mir davriga datchikni sababi bilan to'xtatib turish.":
 "Запрос кадра по событию. Изменение интервала передачи — команда ставится в очередь и доходит со следующей передачей датчика. Установка температурного порога. Приостановка датчика на время ремонта с указанием причины.",
"Qilib bo'lmaydi": "Сделать нельзя",
"Eshikni masofadan yopish, sirena yoqish yoki obyektni aylanib ko'rish. Ta'sir qilish kerak bo'lsa, obyektga 05-yechimning relesi yoki 10-klaster shkafi qo'shiladi.":
 "Закрыть дверь дистанционно, включить сирену или обойти объект. Если нужно воздействие, к объекту добавляется реле из решения 05 или кластерный шкаф из решения 10.",

"Bosqich": "Этап", "Brigada": "Бригада", "Vaqt": "Время",
"Shlyuz nuqtasi: antenna, quvvat, SIM, sozlash": "Точка шлюза: антенна, питание, SIM, настройка",
"2 kishi, biri balandlikda ishlash ruxsati bilan": "2 человека, один с допуском к работам на высоте",
"4–5 soat": "4–5 ч",
"Bir obyekt: 5 datchik, reyestr, sinov": "Один объект: 5 датчиков, реестр, испытание",
"2 kishi": "2 человека",
"45–70 daqiqa": "45–70 мин",
"10 obyektlik klaster, boshidan oxirigacha": "Кластер из 10 объектов, от начала до конца",
"3 ish kuni": "3 рабочих дня",
"Antenna tik holatda, tomdan kamida 1,5 m yuqorida va metall panjaradan 1 m uzoqda mahkamlanadi. Koaksial kabel 5 m dan oshmaydi.":
 "Антенна крепится вертикально, не ниже 1,5 м над кровлей и не ближе 1 м к металлическому ограждению. Коаксиальный кабель не длиннее 5 м.",
"Konnektor pastga qaratilib, o'z-o'zidan yopishadigan lenta bilan yopiladi. Suv kirgan konnektor bir mavsumda aloqa masofasini yarmiga tushiradi.":
 "Разъём направляется вниз и закрывается самослипающейся лентой. Разъём с попавшей водой за один сезон вдвое сокращает дальность связи.",
"Har datchikning DevEUI yorlig'i korpusni yopishdan oldin skanerlanadi va reyestrga yoziladi.":
 "Этикетка DevEUI каждого датчика сканируется до закрытия корпуса и вносится в реестр.",
"Shlyuz panelida RSSI va SNR yozib olinadi. Chegara: −115 dBm dan yaxshi va SNR noldan yuqori. Chegaradan o'tmagan nuqta ko'chiriladi, sozlama bilan tuzatilmaydi.":
 "В панели шлюза фиксируются RSSI и SNR. Порог: лучше −115 dBm и SNR выше нуля. Точка, не прошедшая порог, переносится, а не правится настройками.",
"Eshik yopilib ochiladi, platformada ikkala holat ham ko'rinadi. Sinov hodisasi operator ekraniga chiqqanidan keyingina dalolatnoma imzolanadi.":
 "Дверь закрывается и открывается, на платформе видны оба состояния. Акт подписывается только после того, как тестовое событие вышло на экран оператора.",
"Signal o'lchovi bo'sh omborda emas, ish holatidagi omborda qilinadi. Javon ko'chirilsa yoki tovar to'ldirilsa, signal 10–15 dB pasayishi mumkin.":
 "Замер сигнала делается не на пустом складе, а на складе в рабочем состоянии. При перестановке стеллажа или заполнении товаром сигнал может упасть на 10–15 дБ.",

"Tasdiqlovchi kamera, obyektda bo'lsa nol": "Подтверждающая камера, при наличии — ноль",
"Rasmiy distribyutor orqali import. Yetkazish muddati odatda 4–8 hafta; kichik partiya aviajo'natma bilan ikki haftada keladi, lekin birlik narxi qimmatroq tushadi. Datchik, shlyuz va zaxira batareya bitta partiyada buyuriladi.":
 "Импорт через официального дистрибьютора. Срок поставки обычно 4–8 недель; небольшая партия авиаотправкой приходит за две недели, но единица обходится дороже. Датчики, шлюз и запасные батареи заказываются одной партией.",
"Shartnomada shlyuz va datchik uchun alohida reaksiya muddati yoziladi: shlyuz 24 soat, datchik 5 ish kuni. Bitta umumiy muddat yozilsa, klaster butun hafta jim turishi mumkin.":
 "В договоре прописываются отдельные сроки реакции на шлюз и на датчик: шлюз — 24 часа, датчик — 5 рабочих дней. При одном общем сроке кластер может простоять в молчании всю неделю.",
"Chastota ruxsati bu yechimning yagona to'suvchi sharti. U texnik emas, huquqiy savol va xariddan oldin yopiladi.":
 "Разрешение на частоту — единственное блокирующее условие этого решения. Вопрос не технический, а правовой, и закрывается он до закупки.",

"Bu yechimning afzalligi uzoq muddatda ko'rinadi: harakatlanadigan qismi yo'q, yoqilg'i yo'q, almashtiriladigan akkumulyator yo'q. Besh yilda bitta jiddiy ish bor — batareya almashtirish.":
 "Преимущество этого решения проявляется на длинной дистанции: нет движущихся частей, нет топлива, нет заменяемых аккумуляторов. За пять лет предстоит одна серьёзная работа — замена батарей.",
"Modda": "Статья", "Qachon": "Когда",
"Datchik batareyalari": "Батареи датчиков",
"Beshinchi yil bahorida, hammasi bir yo'la": "Весной пятого года, все сразу",
"Shlyuz SIM ulushi": "Доля SIM шлюза",
"Oyma-oy, obyektlarga bo'linadi": "Ежемесячно, делится на объекты",
"Kamera 4G SIM": "SIM камеры 4G",
"Kamera bo'lsa, eng katta qator": "При наличии камеры — самая крупная статья",
"Shlyuz ko'rigi va dasturiy yangilanish": "Осмотр шлюза и обновление ПО",
"Yiliga bir marta": "Раз в год",
"Obyekt sotilganda datchiklar yechib olinadi va keyingi obyektga o'tadi. Bank bitta komplektni besh yil ichida uch-to'rt marta ishlatadi — bu boshqa hech bir yechimda yo'q.":
 "При продаже объекта датчики демонтируются и переходят на следующий. За пять лет банк использует один комплект три-четыре раза — такого нет ни в одном другом решении.",

"Nosozlik 1": "Отказ 1", "Nosozlik 2": "Отказ 2", "Nosozlik 3": "Отказ 3",
"Yanvarda bir nechta datchik birdan jim bo'ldi": "В январе сразу несколько датчиков замолчали",
"Sovuqda batareyaning impuls berish qobiliyati pasayadi. Passivatsiyadan to'liq chiqmagan element uzatish paytida kuchlanishni tashlab yuboradi va qurilma qayta yuklanadi.":
 "На морозе батарея хуже отдаёт импульс. Элемент, не вышедший из пассивации полностью, в момент передачи роняет напряжение, и устройство уходит в перезагрузку.",
"Montajdan oldin har datchik 10–15 daqiqa yoqib qo'yiladi. Batareya kalendar bo'yicha almashtiriladi. Qishda interval uzaytiriladi, qisqartirilmaydi.":
 "Перед монтажом каждый датчик держат включённым 10–15 минут. Батареи меняются по календарю. Зимой интервал увеличивают, а не сокращают.",
"Shlyuz tushdi — butun klaster ko'rinmay qoldi": "Упал шлюз — из виду пропал весь кластер",
"Shlyuz bu yechimning yagona nuqtasi. U ishlamagan vaqtda A sinfidagi datchiklar hodisani joyida saqlab tura olmaydi: shlyuzsiz o'tgan olti soat nazoratsiz o'tgan olti soat degani.":
 "Шлюз — единственная точка отказа этого решения. Пока он не работает, датчики класса A не могут сохранить событие локально: шесть часов без шлюза означают шесть часов без контроля.",
"Ikki operator SIM'i va watchdog, DC UPS, LWT orqali mustaqil ogohlantirish, omborda butun zaxira shlyuz. 10 obyektdan katta klasterga ikkinchi shlyuz.":
 "Две SIM разных операторов и watchdog, DC UPS, независимое предупреждение через LWT, полный запасной шлюз на складе. На кластер больше десяти объектов — второй шлюз.",
"Bitta datchik kuniga o'nlab soxta hodisa yuboradi": "Один датчик шлёт десятки ложных событий в сутки",
"Magnit bilan korpus orasidagi tirqish ishlash chegarasida. Darvoza shamolda qimirlaydi yoki metall haroratdan kengayadi. Operator uch kundan keyin bu obyektga qarashni to'xtatadi.":
 "Зазор между магнитом и корпусом на границе срабатывания. Ворота ходят от ветра или металл расширяется от перепада температуры. Через три дня оператор перестаёт смотреть на этот объект.",
"Magnit tabaqaning ichki chetiga suriladi. Platformada 60 soniyalik birlashtirish filtri. Har datchik bo'yicha haftalik hodisa soni kuzatiladi.":
 "Магнит сдвигается к внутреннему краю створки. На платформе — фильтр объединения в 60 секунд. По каждому датчику отслеживается недельное число событий.",

"Javob hujjat bilan beriladi. Og'zaki tasdiq shartnomaga ilova qilinmaydi.":
 "Ответ предоставляется документом. Устное подтверждение к договору не прикладывается.",
"Ikkalasi ham bo'lmasa, tashqi tarmoq serveri uchun alohida server ajratishga to'g'ri keladi.":
 "Если нет ни того, ни другого, придётся выделять отдельный сервер под внешний сетевой сервер.",
"Bayt jadvali ham yetadi, lekin dekoderni yozish ishga ikki-uch kun qo'shadi.":
 "Таблицы байтов достаточно, но написание декодера добавит к работе два-три дня.",
"Batareya resursi qaysi interval va qaysi haroratda hisoblangan?":
 "Для какого интервала передачи и какой температуры рассчитан ресурс батареи?",
"+20 °C uchun hisoblangan raqam −20 °C da kamida chorak barobar qisqaradi.":
 "Цифра, рассчитанная для +20 °C, при −20 °C сокращается минимум на четверть.",
"Bu shlyuz almashtirish vaqtini 40 daqiqa yoki bir kun qilib belgilaydi.":
 "От этого зависит, займёт замена шлюза 40 минут или целый день.",
"Yangilanish bulut orqali kelsa, bulutsiz ishlash sharti buziladi.":
 "Если обновление приходит через облако, условие работы без облака нарушается.",
"Javob «import qilamiz» bo'lsa, zaxira shlyuz bank omborida turishi kerak.":
 "Если ответ — «завезём», запасной шлюз должен лежать на складе банка.",
"Tutun datchigi EN 14604 sertifikatiga egami va nusxasi beriladimi?":
 "Имеет ли датчик дыма сертификат EN 14604 и предоставляется ли его копия?",
"Yong'in xavfsizligi mas'uli shu hujjatga tayanadi.":
 "Ответственный за пожарную безопасность опирается именно на этот документ.",
"Bir shlyuzga necha qurilma 10 daqiqalik intervalda sinovdan o'tgan?":
 "Сколько устройств на один шлюз проверено испытанием при интервале 10 минут?",
"Katalogdagi maksimal son emas, sinov natijasi so'raladi.":
 "Запрашивается не максимум из каталога, а результат испытания.",
"Issiq omborda saqlangan batareya resursining bir qismini yo'qotadi.":
 "Батарея, хранившаяся на тёплом складе, теряет часть ресурса."
});
