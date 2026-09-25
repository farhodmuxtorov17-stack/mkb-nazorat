/* Tizim xaritalaridagi yangi tugunlar uchun batafsil yozuvlari (yechim-01…05).
   Kalit: y0N.x-<tugun>. Ruscha matn yozuvning ru maydonida. */
window.MKB_BATAFSIL = window.MKB_BATAFSIL || {};
Object.assign(window.MKB_BATAFSIL, {

/* ======================= Yechim 01 · ma'lumot yo'li ======================= */

"y01.x-quvvat": {
  yorliq: "Montajchi uchun", sarlavha: "12 V shkaf: shinaga nima ulanadi",
  tana: "<p>Shkaf obyektning butun elektr tizimi o'rnida turadi. Unda beshta element bor va ularning har biri smetaning alohida qatori.</p>" +
    "<table><tr><th>Element</th><th>Nima qiladi</th></tr>" +
    "<tr><td>LiFePO4 12 V 100 A·soat</td><td>1 150 Vt·soat foydali zaxira</td></tr>" +
    "<tr><td>MPPT kontroller, 20 A</td><td>paneldan zaryad, PWM dan 20–25% samaraliroq</td></tr>" +
    "<tr><td>BMS, past harorat himoyasi bilan</td><td>0 °C dan past haroratda zaryadni to'xtatadi</td></tr>" +
    "<tr><td>DC-DC 12 V → 12 V barqarorlashtirilgan</td><td>hub va router uchun kuchlanish</td></tr>" +
    "<tr><td>Ikki avtomat: panel va yuklama</td><td>servis vaqtida alohida uziladi</td></tr></table>" +
    "<h4>Shinaga nima ulanadi</h4><p>Faqat ikkita qurilma: Home Hub va 4G router, jami 6,5 Vt. Kameralar shinaga ulanmaydi — ular o'z akkumulyatorida ishlaydi va bu butun yechimning asosiy g'oyasi.</p>" +
    "<p class='ogoh'>Shkafning o'zi issiqlikdan himoyalanadi. Yozda janubga qaragan devorga osilgan metall shkaf ichida harorat +60 °C ga chiqadi va LiFePO4 blokning muddati ikki barobar qisqaradi. Shkaf shimoliy devorga yoki soyaga o'rnatiladi, tepasiga kichik kozirek qo'yiladi.</p>",
  ru: { yorliq: "Для монтажника", sarlavha: "Шкаф 12 В: что подключено к шине",
    tana: "<p>Шкаф заменяет объекту всю электрическую систему. В нём пять элементов, и каждый — отдельная строка сметы.</p>" +
      "<table><tr><th>Элемент</th><th>Что делает</th></tr>" +
      "<tr><td>LiFePO4 12 В 100 А·ч</td><td>1 150 Вт·ч полезного запаса</td></tr>" +
      "<tr><td>Контроллер MPPT, 20 А</td><td>заряд от панели, на 20–25% эффективнее PWM</td></tr>" +
      "<tr><td>BMS с защитой по низкой температуре</td><td>запрещает заряд ниже 0 °C</td></tr>" +
      "<tr><td>DC-DC 12 В → стабилизированные 12 В</td><td>напряжение для хаба и роутера</td></tr>" +
      "<tr><td>Два автомата: панель и нагрузка</td><td>раздельное отключение на время сервиса</td></tr></table>" +
      "<h4>Что подключено к шине</h4><p>Только два устройства: Home Hub и 4G-роутер, суммарно 6,5 Вт. Камеры к шине не подключаются — они живут на собственном аккумуляторе, и в этом основная идея всего решения.</p>" +
      "<p class='ogoh'>Сам шкаф защищают от нагрева. Летом внутри металлического шкафа на южной стене температура доходит до +60 °C, и ресурс блока LiFePO4 сокращается вдвое. Шкаф вешают на северную стену или в тень и ставят сверху небольшой козырёк.</p>" }
},

"y01.x-lte": {
  yorliq: "Montajchi uchun", sarlavha: "LTE bazasi: nima tekshiriladi va nima qilinadi",
  tana: "<p>Bu yo'lning bank ixtiyoridan tashqaridagi birinchi bo'g'ini. Obyektni tanlashdan oldin emas, <b>o'rnatishdan oldin</b> tekshiriladi — chunki qoplama xarita bo'yicha emas, joyida o'lchanadi.</p>" +
    "<table><tr><th>Ko'rsatkich</th><th>Yaxshi</th><th>Chegara</th></tr>" +
    "<tr><td>RSRP</td><td class='n'>−85…−95 dBm</td><td class='n'>−105 dBm</td></tr>" +
    "<tr><td>SINR</td><td class='n'>15 dB dan yuqori</td><td class='n'>5 dB</td></tr>" +
    "<tr><td>Yuklash tezligi</td><td class='n'>8 Mbit/s</td><td class='n'>2 Mbit/s</td></tr></table>" +
    "<h4>Chegaradan past bo'lsa</h4><ol><li>Tashqi yo'naltirilgan antenna qo'yiladi: 9–12 dBi, bazaga qaratiladi. Bu odatda 8–12 dB qo'shadi va masalani yopadi.</li>" +
    "<li>Antenna tomga chiqariladi: har metr balandlik shahar chekkasida 1–2 dB beradi.</li>" +
    "<li>Ikkinchi operator sinaladi: bitta obyektda ikki operator o'rtasidagi farq 15 dB ga yetishi mumkin.</li></ol>" +
    "<p class='ogoh'>Zaif signal faqat tezlikni emas, quvvatni ham yeydi. RSRP −105 dBm dan past bo'lganda router uzatgichni to'liq quvvatga chiqaradi va sutkalik sarfi 30–40% ortadi — bu esa avtonomiya hisobini buzadi. Shuning uchun zaif signalli obyektda akkumulyator sig'imi oshiriladi, xohish bo'lsa emas, hisob bo'yicha.</p>",
  ru: { yorliq: "Для монтажника", sarlavha: "Базовая станция LTE: что проверяют и что делают",
    tana: "<p>Это первое звено пути, находящееся вне распоряжения банка. Его проверяют не перед выбором объекта, а <b>перед установкой</b> — потому что покрытие меряют на месте, а не по карте.</p>" +
      "<table><tr><th>Показатель</th><th>Хорошо</th><th>Предел</th></tr>" +
      "<tr><td>RSRP</td><td class='n'>−85…−95 дБм</td><td class='n'>−105 дБм</td></tr>" +
      "<tr><td>SINR</td><td class='n'>выше 15 дБ</td><td class='n'>5 дБ</td></tr>" +
      "<tr><td>Скорость отдачи</td><td class='n'>8 Мбит/с</td><td class='n'>2 Мбит/с</td></tr></table>" +
      "<h4>Если ниже предела</h4><ol><li>Ставят внешнюю направленную антенну: 9–12 дБи, ориентированную на базовую станцию. Обычно это добавляет 8–12 дБ и закрывает вопрос.</li>" +
      "<li>Антенну выносят на крышу: на окраине каждый метр высоты даёт 1–2 дБ.</li>" +
      "<li>Пробуют второго оператора: разница между операторами на одном объекте доходит до 15 дБ.</li></ol>" +
      "<p class='ogoh'>Слабый сигнал съедает не только скорость, но и питание. При RSRP ниже −105 дБм роутер выводит передатчик на полную мощность, и суточный расход растёт на 30–40% — это ломает расчёт автономии. Поэтому на объекте со слабым сигналом ёмкость аккумулятора увеличивают не по желанию, а по расчёту.</p>" }
},

"y01.x-nat": {
  yorliq: "Arxitektor uchun", sarlavha: "Operator NAT'i: nega ulanishni obyekt boshlaydi",
  tana: "<p>Oddiy SIM-kartaga oq IP berilmaydi. Router operatorning umumiy NAT'i ortida turadi: unga tashqaridan murojaat qilib bo'lmaydi, chunki uning global manzili yo'q.</p>" +
    "<h4>Bu nimani anglatadi</h4><ul><li>Bank serveridan obyektga ulanish tashabbusi bilan borish mumkin emas</li><li>Port forwarding ishlamaydi — forward qiladigan tashqi manzil yo'q</li><li>Har qanday sxema obyektdan chiqadigan ulanishga asoslanishi shart</li></ul>" +
    "<h4>Uchta chiqish yo'li</h4><table><tr><th>Yo'l</th><th>Narxi</th><th>Kamchiligi</th></tr>" +
    "<tr><td>Chiquvchi VPN tunnel</td><td class='n'>qo'shimcha to'lovsiz</td><td>obyektda router kerak</td></tr>" +
    "<tr><td>Oq IP xizmati</td><td class='n'>oyiga 25–60 ming so'm</td><td>tashqi perimetrda port ochiladi</td></tr>" +
    "<tr><td>Korporativ APN</td><td class='n'>shartnoma bo'yicha</td><td>operator bilan alohida kelishuv</td></tr></table>" +
    "<p class='ogoh'>Oq IP eng oson ko'ringan yo'l va u eng xavflisi. Oq IP li kamera internetdan ko'rinadi, uning veb-interfeysi esa bir necha oy ichida avtomatik skanerlar tomonidan topiladi. Bank obyektlarida bu yo'l ishlatilmaydi: ulanish har doim obyektdan boshlanadi va bankning tashqi perimetrida birorta port ochilmaydi.</p>",
  ru: { yorliq: "Для архитектора", sarlavha: "NAT оператора: почему соединение начинает объект",
    tana: "<p>Обычной SIM-карте белый IP не выдаётся. Роутер стоит за общим NAT оператора: обратиться к нему снаружи нельзя, потому что глобального адреса у него нет.</p>" +
      "<h4>Что это означает</h4><ul><li>Инициировать соединение с сервера банка к объекту невозможно</li><li>Проброс портов не работает — нет внешнего адреса, куда пробрасывать</li><li>Любая схема должна опираться на исходящее соединение с объекта</li></ul>" +
      "<h4>Три выхода</h4><table><tr><th>Путь</th><th>Цена</th><th>Недостаток</th></tr>" +
      "<tr><td>Исходящий VPN-туннель</td><td class='n'>без доплат</td><td>на объекте нужен роутер</td></tr>" +
      "<tr><td>Услуга белого IP</td><td class='n'>25–60 тыс. сум в месяц</td><td>на внешнем периметре открывается порт</td></tr>" +
      "<tr><td>Корпоративный APN</td><td class='n'>по договору</td><td>отдельное соглашение с оператором</td></tr></table>" +
      "<p class='ogoh'>Белый IP кажется самым простым путём и является самым опасным. Камера с белым IP видна из интернета, а её веб-интерфейс за несколько месяцев находят автоматические сканеры. На объектах банка этот путь не используется: соединение всегда начинается с объекта, и на внешнем периметре банка не открывается ни один порт.</p>" }
},

"y01.x-vpn": {
  yorliq: "Xavfsizlik uchun", sarlavha: "VPN konsentrator: kalit obyektni yoqadi va o'chiradi",
  tana: "<p>Konsentrator bank DMZ'ida turadi va obyektlardan keladigan tunnellarni qabul qiladi. Uning uchta xossasi butun sxemaning xavfsizligini belgilaydi.</p>" +
    "<h4>Har obyektga alohida kalit</h4><p>Bitta umumiy kalit ishlatilmaydi. Har obyektning o'z juftligi bor va u obyekt kartasiga bog'langan. Router yo'qolsa yoki o'g'irlansa, shu bitta kalit bekor qilinadi va obyekt bir daqiqada tarmoqdan uziladi — qolgan 266 obyekt buni sezmaydi ham.</p>" +
    "<h4>Manzil bo'yicha ajratish</h4><p>Har obyekt /32 manzil oladi va tunnel ichida faqat adapterning manzilini ko'radi. Bir obyekt ikkinchisini ko'ra olmaydi: buzib kirilgan bitta obyekt boshqalarga yo'l ochmaydi.</p>" +
    "<h4>Nazorat</h4><p>Konsentrator har tunnelning oxirgi qo'l siqishini yozadi. Tunnel 10 daqiqadan ortiq ko'tarilmasa, platformada «aloqa yo'q» hodisasi ochiladi — bu 4G uzilishini ham, routerning quvvatsiz qolishini ham bir xil ko'rsatadi.</p>" +
    "<p class='ogoh'>Konsentratorning o'zi ham yagona nuqta. U ikkita nusxada, ikkita jismoniy serverda ishlaydi va obyekt routerlarida ikkala manzil ham yozilgan bo'ladi. Aks holda bitta serverning yangilanishi butun 267 obyektni bir vaqtda ko'r qiladi.</p>",
  ru: { yorliq: "Для безопасности", sarlavha: "VPN-концентратор: ключ включает и выключает объект",
    tana: "<p>Концентратор стоит в DMZ банка и принимает туннели с объектов. Три его свойства определяют безопасность всей схемы.</p>" +
      "<h4>Отдельный ключ на каждый объект</h4><p>Общий ключ не используется. У каждого объекта своя пара, привязанная к его карточке. Если роутер потерян или украден, отзывается один этот ключ и объект отключается от сети за минуту — остальные 266 этого даже не замечают.</p>" +
      "<h4>Разделение по адресам</h4><p>Каждый объект получает адрес /32 и видит внутри туннеля только адрес адаптера. Один объект не видит другой: взломанный объект не открывает дорогу к остальным.</p>" +
      "<h4>Контроль</h4><p>Концентратор пишет время последнего рукопожатия по каждому туннелю. Если туннель не поднимается больше 10 минут, в платформе открывается событие «нет связи» — оно одинаково показывает и обрыв 4G, и потерю питания роутером.</p>" +
      "<p class='ogoh'>Сам концентратор — тоже единая точка. Он работает в двух экземплярах на двух физических серверах, и в роутерах объектов прописаны оба адреса. Иначе обновление одного сервера ослепит все 267 объектов одновременно.</p>" }
},

/* ======================= Yechim 02 · uchta ulanish yo'li ======================= */

"y02.x-isup": {
  yorliq: "Arxitektor uchun", sarlavha: "ISUP qabul qiluvchi: kamera o'zi keladi",
  tana: "<p>ISUP — Hikvision'ning o'z protokoli. Kamera server manzilini biladi va har 30 soniyada o'zi ulanadi; server esa kamerani hech qachon qidirmaydi. Shu sababli kulrang IP ham, NAT ham to'siq bo'lmaydi.</p>" +
    "<table><tr><th>Nima kiritiladi</th><th>Qayerda</th></tr>" +
    "<tr><td>Server manzili va porti (7660)</td><td>kamera sozlamasida</td></tr>" +
    "<tr><td>Qurilma identifikatori</td><td>obyekt kartasiga bog'lanadi</td></tr>" +
    "<tr><td>Shifrlash kaliti</td><td>har obyektga alohida</td></tr></table>" +
    "<h4>Video ham shu kanalda</h4><p>ISUP nafaqat hodisani, video oqimini ham o'tkazadi. Bu qulay, lekin cheklov bor: oqim serverdan qayta uzatiladi va yuz obyektdan keyin adapter mashinasining tarmoq kanali chegaraga yetadi.</p>" +
    "<p class='ogoh'>Bu yo'lning asosiy kamchiligi — u bitta brendga bog'langan. Keyingi tenderda Dahua yoki boshqa ishlab chiqaruvchi g'olib chiqsa, ISUP qabul qiluvchi ishlamaydi va adapterga yangi blok yoziladi. Pilot uchun bu maqbul; portfelning yarmi uchun emas.</p>",
  ru: { yorliq: "Для архитектора", sarlavha: "Приёмник ISUP: камера приходит сама",
    tana: "<p>ISUP — собственный протокол Hikvision. Камера знает адрес сервера и подключается сама каждые 30 секунд; сервер камеру никогда не ищет. Поэтому ни серый IP, ни NAT препятствием не становятся.</p>" +
      "<table><tr><th>Что вводится</th><th>Где</th></tr>" +
      "<tr><td>Адрес и порт сервера (7660)</td><td>в настройках камеры</td></tr>" +
      "<tr><td>Идентификатор устройства</td><td>привязывается к карточке объекта</td></tr>" +
      "<tr><td>Ключ шифрования</td><td>отдельный на каждый объект</td></tr></table>" +
      "<h4>Видео идёт тем же каналом</h4><p>ISUP пропускает не только событие, но и видеопоток. Это удобно, но есть ограничение: поток ретранслируется сервером, и после сотни объектов сетевой канал машины адаптера упирается в предел.</p>" +
      "<p class='ogoh'>Главный недостаток этого пути — привязка к одному бренду. Если следующий тендер выиграет Dahua или другой производитель, приёмник ISUP работать не будет и в адаптер придётся дописывать новый блок. Для пилота это приемлемо; для половины портфеля — нет.</p>" }
},

"y02.x-router": {
  yorliq: "Moliya uchun", sarlavha: "Router va VPN: nima uchun to'lanadi",
  tana: "<p>Uchinchi yo'l eng universal va eng qimmat. U obyektga yana bitta qurilma va yana bitta doimiy iste'molchi qo'shadi.</p>" +
    "<table><tr><th>Qo'shimcha</th><th>Bir obyektga</th></tr>" +
    "<tr><td>4G router, sanoat sinfi</td><td class='n'>1,8–2,6 mln so'm</td></tr>" +
    "<tr><td>Quvvatga +3,2 Vt</td><td class='n'>+77 Vt·soat/sutka</td></tr>" +
    "<tr><td>Akkumulyator sig'imining oshishi</td><td class='n'>+1,4 mln so'm</td></tr>" +
    "<tr><td>Kabel, ulagich, montaj</td><td class='n'>+0,4 mln so'm</td></tr></table>" +
    "<p>Ya'ni bir obyektga taxminan 4 mln so'm. 267 obyektning hammasiga qo'llanilsa — bu butun loyihaning eng katta yagona qatori bo'ladi.</p>" +
    "<h4>Nima uchun baribir kerak</h4><p>Router brenddan mustaqillikni beradi. Obyektda Hikvision, Dahua va boshqa kamera aralash turgan portfelda bitta sxema ishlaydi va adapterga har brend uchun alohida kirish nuqtasi yozilmaydi. Bundan tashqari, obyektda kameradan boshqa qurilma — NVR, datchik, hisoblagich — bo'lsa, ularning hammasi shu bitta tunneldan yuradi.</p>" +
    "<p class='ogoh'>To'g'ri qaror — aralash: aholisi ko'p bitta qurilmali obyektlarda ISUP yoki APN, ko'p qurilmali obyektlarda router. Portfelning taxminan 30% i routerga muhtoj bo'ladi va smeta shu nisbatda tuziladi.</p>",
  ru: { yorliq: "Для финансов", sarlavha: "Роутер и VPN: за что платят",
    tana: "<p>Третий путь самый универсальный и самый дорогой. Он добавляет на объект ещё одно устройство и ещё одного постоянного потребителя.</p>" +
      "<table><tr><th>Добавка</th><th>На объект</th></tr>" +
      "<tr><td>4G-роутер промышленного класса</td><td class='n'>1,8–2,6 млн сум</td></tr>" +
      "<tr><td>К потреблению +3,2 Вт</td><td class='n'>+77 Вт·ч/сутки</td></tr>" +
      "<tr><td>Увеличение ёмкости аккумулятора</td><td class='n'>+1,4 млн сум</td></tr>" +
      "<tr><td>Кабель, разъёмы, монтаж</td><td class='n'>+0,4 млн сум</td></tr></table>" +
      "<p>То есть около 4 млн сум на объект. Если применить ко всем 267 объектам, это станет самой крупной единичной строкой всего проекта.</p>" +
      "<h4>Зачем он всё-таки нужен</h4><p>Роутер даёт независимость от бренда. В портфеле, где на объектах стоят вперемешку Hikvision, Dahua и другие камеры, работает одна схема, и в адаптер не приходится вписывать отдельную точку входа под каждый бренд. Кроме того, если на объекте есть что-то помимо камеры — регистратор, датчик, счётчик, — всё это идёт через тот же туннель.</p>" +
      "<p class='ogoh'>Правильное решение — смешанное: на объектах с одним устройством ISUP или APN, на объектах с несколькими — роутер. Роутер потребуется примерно 30% портфеля, и смета составляется в этой пропорции.</p>" }
},

"y02.x-vpn": {
  yorliq: "Xavfsizlik uchun", sarlavha: "VPN konsentrator: brenddan mustaqil chegara",
  tana: "<p>Konsentrator bank DMZ'ida turadi va obyekt routerlaridan keladigan tunnellarni qabul qiladi. Uning qiymati bitta xossada: <b>tunnelning ikkala uchi ham bank ixtiyorida.</b></p>" +
    "<h4>Har obyektga alohida kalit</h4><p>Router yo'qolsa yoki o'g'irlansa, shu bitta kalit bekor qilinadi va obyekt bir daqiqada tarmoqdan uziladi. Qolgan obyektlar buni sezmaydi.</p>" +
    "<h4>Obyektlar bir-birini ko'rmaydi</h4><p>Har obyekt /32 manzil oladi va tunnel ichida faqat adapterning manzilini ko'radi. Buzib kirilgan bitta obyekt boshqalarga yo'l ochmaydi — bu ISUP va APN yo'llarida avtomatik ta'minlanmaydi va alohida sozlanadi.</p>" +
    "<h4>Uzilish ko'rinadi</h4><p>Konsentrator har tunnelning oxirgi qo'l siqishini yozadi. Tunnel 10 daqiqadan ortiq ko'tarilmasa, platformada «aloqa yo'q» hodisasi ochiladi.</p>" +
    "<p class='ogoh'>Konsentratorning o'zi ham yagona nuqta. U ikkita jismoniy serverda ishlaydi va obyekt routerlarida ikkala manzil ham yozilgan bo'ladi. Aks holda bitta serverning rejali yangilanishi butun portfelni bir vaqtda ko'r qiladi.</p>",
  ru: { yorliq: "Для безопасности", sarlavha: "VPN-концентратор: граница, не зависящая от бренда",
    tana: "<p>Концентратор стоит в DMZ банка и принимает туннели с объектовых роутеров. Его ценность в одном свойстве: <b>оба конца туннеля находятся в распоряжении банка.</b></p>" +
      "<h4>Отдельный ключ на объект</h4><p>Если роутер потерян или украден, отзывается один этот ключ и объект отключается от сети за минуту. Остальные объекты этого не замечают.</p>" +
      "<h4>Объекты не видят друг друга</h4><p>Каждый объект получает адрес /32 и видит внутри туннеля только адрес адаптера. Взломанный объект не открывает дорогу к остальным — на путях ISUP и APN это не обеспечивается автоматически и настраивается отдельно.</p>" +
      "<h4>Обрыв виден</h4><p>Концентратор пишет время последнего рукопожатия по каждому туннелю. Если туннель не поднимается больше 10 минут, в платформе открывается событие «нет связи».</p>" +
      "<p class='ogoh'>Сам концентратор — тоже единая точка. Он работает на двух физических серверах, и в роутерах объектов прописаны оба адреса. Иначе плановое обновление одного сервера ослепит весь портфель одновременно.</p>" }
},

/* ======================= Yechim 03 · Auto Register ketma-ketligi ======================= */

"y03.x-sessiya": {
  yorliq: "Arxitektor uchun", sarlavha: "Sessiya ochildi: shu lahzada nima bog'lanadi",
  tana: "<p>Kamera ulanganda serverga seriya raqamini va qurilma identifikatorini beradi. Adapter bu raqamni obyektlar ro'yxatidan qidiradi va uchta narsani bir vaqtda bajaradi.</p>" +
    "<ol><li>Kamerani obyekt kartasiga bog'laydi — shundan keyin har hodisa aniq obyektga tushadi.</li>" +
    "<li>Qurilma holatini «aloqada» ga o'tkazadi va oxirgi ulanish vaqtini yozadi.</li>" +
    "<li>Sessiyani oqim va buyruq uchun ochiq ushlab turadi.</li></ol>" +
    "<h4>Seriya raqami ro'yxatda bo'lmasa</h4><p>Ulanish rad etiladi va «notanish qurilma» hodisasi ochiladi. Bu himoyaning muhim qismi: adapter manzilini bilgan istalgan kamera tizimga kira olmaydi.</p>" +
    "<p class='ogoh'>Seriya raqamlari qabul dalolatnomasidan platformaga qo'lda emas, fayl bilan kiritiladi. Qo'lda kiritishda bitta belgi xatosi obyektni oylab «aloqasiz» holatda ushlab turadi va buni faqat obyektga borib aniqlash mumkin bo'ladi.</p>",
  ru: { yorliq: "Для архитектора", sarlavha: "Сессия открыта: что связывается в этот момент",
    tana: "<p>При подключении камера передаёт серверу серийный номер и идентификатор устройства. Адаптер ищет этот номер в списке объектов и делает три вещи одновременно.</p>" +
      "<ol><li>Привязывает камеру к карточке объекта — после этого каждое событие попадает на конкретный объект.</li>" +
      "<li>Переводит состояние устройства в «на связи» и записывает время последнего подключения.</li>" +
      "<li>Держит сессию открытой для потока и команд.</li></ol>" +
      "<h4>Если серийного номера нет в списке</h4><p>Подключение отклоняется и открывается событие «неизвестное устройство». Это важная часть защиты: произвольная камера, знающая адрес адаптера, в систему не попадёт.</p>" +
      "<p class='ogoh'>Серийные номера переносят из акта приёмки в платформу файлом, а не руками. При ручном вводе ошибка в одном символе месяцами держит объект в состоянии «нет связи», и выясняется это только выездом.</p>" }
},

"y03.x-kod": {
  yorliq: "Arxitektor uchun", sarlavha: "Hodisa kodlari: brend tilidan yagona sxemaga",
  tana: "<p>Kamera o'z kodlarini yuboradi. Adapter ularni platformaning yagona ro'yxatiga keltiradi — platforma qaysi brend turganini bilmaydi.</p>" +
    "<table><tr><th>Dahua</th><th>Hikvision</th><th>Platformada</th></tr>" +
    "<tr><td>VideoMotion</td><td>VMD</td><td>harakat</td></tr>" +
    "<tr><td>CrossLineDetection</td><td>linedetection</td><td>chiziqni kesish</td></tr>" +
    "<tr><td>CrossRegionDetection</td><td>fielddetection</td><td>hududga kirish</td></tr>" +
    "<tr><td>VideoBlind</td><td>tamperdetection</td><td>niqoblash</td></tr>" +
    "<tr><td>heartbeat yo'q</td><td>alertStream uzildi</td><td>aloqa yo'q</td></tr></table>" +
    "<h4>Nima uchun bu muhim</h4><p>Keyingi tenderda brend o'zgarsa, adapterning bitta bloki qayta yoziladi. Hisobotlar, obyekt kartalari, vazifalar va nazorat indeksi — hammasi o'zgarishsiz qoladi. Aks holda har brend almashuvi butun hisobot tizimini qayta qurishni talab qiladi.</p>" +
    "<p class='ogoh'>Ro'yxat qisqa qoldiriladi. Kameralarning o'nlab maxsus kodlari bor, lekin platformaga faqat javob chorasi farq qiladigan turlar kiritiladi. Ro'yxat uzaysa, operator qaysi hodisaga qanday javob berishni eslay olmay qoladi.</p>",
  ru: { yorliq: "Для архитектора", sarlavha: "Коды событий: с языка бренда в единую схему",
    tana: "<p>Камера присылает свои коды. Адаптер приводит их к единому списку платформы — платформа не знает, какой бренд стоит на объекте.</p>" +
      "<table><tr><th>Dahua</th><th>Hikvision</th><th>В платформе</th></tr>" +
      "<tr><td>VideoMotion</td><td>VMD</td><td>движение</td></tr>" +
      "<tr><td>CrossLineDetection</td><td>linedetection</td><td>пересечение линии</td></tr>" +
      "<tr><td>CrossRegionDetection</td><td>fielddetection</td><td>вход в зону</td></tr>" +
      "<tr><td>VideoBlind</td><td>tamperdetection</td><td>засветка объектива</td></tr>" +
      "<tr><td>нет heartbeat</td><td>оборван alertStream</td><td>нет связи</td></tr></table>" +
      "<h4>Почему это важно</h4><p>Если на следующем тендере сменится бренд, переписывается один блок адаптера. Отчёты, карточки объектов, задачи и индекс контроля остаются без изменений. Иначе каждая смена бренда потребует перестройки всей системы отчётности.</p>" +
      "<p class='ogoh'>Список держат коротким. У камер есть десятки специальных кодов, но в платформу заводят только те типы, для которых различается реакция. Если список удлинить, оператор перестаёт помнить, как отвечать на каждое событие.</p>" }
},

"y03.x-oqim": {
  yorliq: "Operator uchun", sarlavha: "Oqim faqat so'ralganda: nega shunday",
  tana: "<p>Kamera doimiy yozmaydi va oqimni doimiy uzatmaydi. Oqim faqat operator hodisa kartasida «ko'rish» tugmasini bosganda ochiladi.</p>" +
    "<table><tr><th>Rejim</th><th>Sutkalik energiya</th><th>Sutkalik trafik</th></tr>" +
    "<tr><td>Doimiy oqim, 1080p</td><td class='n'>168 Vt·soat</td><td class='n'>21 GB</td></tr>" +
    "<tr><td>Faqat hodisada, 20 s</td><td class='n'>11 Vt·soat</td><td class='n'>0,4 GB</td></tr></table>" +
    "<p>Farq o'n besh barobar. Quyosh paneli bilan ishlaydigan obyektda doimiy oqim variantini tanlash avtonomiyani ikki kunga tushiradi va butun yechimning ma'nosini yo'qotadi.</p>" +
    "<h4>Ikki oqim</h4><p>Panelda har doim qo'shimcha oqim (subtype=1, 704 × 576) ochiladi. Asosiy 4 MP oqim faqat operator kattalashtirganda so'raladi va bu harakat jurnalga yoziladi: kim, qachon, qaysi obyektni ko'rgan.</p>" +
    "<p class='ogoh'>Jonli oqimni ochish hodisadan mustaqil ham mumkin, lekin u har doim sababni ko'rsatishni talab qiladi. Sababsiz ko'rish tarixi bo'sh qoladi va bu tekshiruvda savol tug'diradi: obyektda nima bo'lganini bilmagan holda kim nima uchun qaragan.</p>",
  ru: { yorliq: "Для оператора", sarlavha: "Поток только по запросу: почему так",
    tana: "<p>Камера не пишет постоянно и не передаёт поток постоянно. Поток открывается только тогда, когда оператор нажимает «смотреть» в карточке события.</p>" +
      "<table><tr><th>Режим</th><th>Энергия в сутки</th><th>Трафик в сутки</th></tr>" +
      "<tr><td>Постоянный поток, 1080p</td><td class='n'>168 Вт·ч</td><td class='n'>21 ГБ</td></tr>" +
      "<tr><td>Только по событию, 20 с</td><td class='n'>11 Вт·ч</td><td class='n'>0,4 ГБ</td></tr></table>" +
      "<p>Разница пятнадцатикратная. На объекте, живущем от солнечной панели, выбор постоянного потока сокращает автономию до двух дней и лишает всё решение смысла.</p>" +
      "<h4>Два потока</h4><p>В панели всегда открывается дополнительный поток (subtype=1, 704 × 576). Основной поток 4 Мп запрашивается только при увеличении, и это действие пишется в журнал: кто, когда и какой объект смотрел.</p>" +
      "<p class='ogoh'>Живой просмотр можно открыть и вне события, но он всегда требует указания причины. Просмотр без причины оставляет пустую строку в истории, и при проверке это вызывает вопрос: кто и зачем смотрел объект, на котором ничего не произошло.</p>" }
},

/* ======================= Yechim 04 · shkaf ichi ======================= */

"y04.x-avtomat": {
  yorliq: "Montajchi uchun", sarlavha: "Ikki avtomat: nega aynan ikkita",
  tana: "<p>Shkafda ikkita alohida uzgich turadi va ularning vazifasi bir xil emas.</p>" +
    "<table><tr><th>Avtomat</th><th>Nominal</th><th>Nimani uzadi</th></tr>" +
    "<tr><td>Panel tomoni</td><td class='n'>16 A</td><td>quyosh panelidan kontrollergacha</td></tr>" +
    "<tr><td>Yuklama tomoni</td><td class='n'>10 A</td><td>blokdan router va injektorgacha</td></tr></table>" +
    "<h4>Nima uchun alohida</h4><p>Servischi blokni almashtirayotganda yuklamani uzadi, lekin panel kontrollerga ulangan qoladi — kontroller kuchlanishsiz qolmaydi va sozlamasini yo'qotmaydi. Aksincha, panelni tozalash yoki almashtirishda yuklama ishlab turadi va obyekt aloqasiz qolmaydi.</p>" +
    "<h4>Nominal qanday tanlanadi</h4><p>Panel tomoni: 2 × 200 Vt panel 48 V da qisqa tutashuv tokini taxminan 11 A beradi, avtomat 1,4 koeffitsiyent bilan 16 A olinadi. Yuklama tomoni: 30 Vt yuklama 48 V da 0,6 A, lekin PoE ishga tushish toki uch barobar oshadi — 10 A zaxira bilan olinadi.</p>" +
    "<p class='ogoh'>Doimiy tok uchun mo'ljallangan avtomat ishlatiladi. O'zgaruvchan tok avtomati 48 V doimiy tokda yoyni o'chira olmaydi va kontaktlar yopishib qoladi. Bu qism arzon, lekin uni almashtirish shkafni butunlay ochishni talab qiladi.</p>",
  ru: { yorliq: "Для монтажника", sarlavha: "Два автомата: почему именно два",
    tana: "<p>В шкафу стоят два отдельных выключателя, и задачи у них разные.</p>" +
      "<table><tr><th>Автомат</th><th>Номинал</th><th>Что отключает</th></tr>" +
      "<tr><td>Сторона панели</td><td class='n'>16 А</td><td>от солнечной панели до контроллера</td></tr>" +
      "<tr><td>Сторона нагрузки</td><td class='n'>10 А</td><td>от блока до роутера и инжектора</td></tr></table>" +
      "<h4>Почему раздельно</h4><p>При замене блока сервисник снимает нагрузку, но панель остаётся подключённой к контроллеру — тот не обесточивается и не теряет настройки. И наоборот: при чистке или замене панели нагрузка работает и объект не остаётся без связи.</p>" +
      "<h4>Как выбирают номинал</h4><p>Сторона панели: две панели по 200 Вт при 48 В дают ток короткого замыкания около 11 А, автомат берут с коэффициентом 1,4 — 16 А. Сторона нагрузки: 30 Вт при 48 В это 0,6 А, но пусковой ток PoE втрое выше — берут 10 А с запасом.</p>" +
      "<p class='ogoh'>Ставят автомат, рассчитанный на постоянный ток. Автомат переменного тока при 48 В постоянного не гасит дугу, и контакты сваривает. Деталь дешёвая, но её замена требует полного вскрытия шкафа.</p>" }
},

"y04.x-mppt": {
  yorliq: "Montajchi uchun", sarlavha: "MPPT: 22% farq qayerdan keladi",
  tana: "<p>PWM kontroller panelni akkumulyatorning kuchlanishiga majburan tushiradi. MPPT esa panelni o'zining eng samarali nuqtasida ushlab turadi va ortiqcha kuchlanishni tokka aylantiradi.</p>" +
    "<table><tr><th>Sharoit</th><th>PWM</th><th>MPPT</th></tr>" +
    "<tr><td>Iyul, quyosh tik</td><td class='n'>100%</td><td class='n'>+8%</td></tr>" +
    "<tr><td>Dekabr, quyosh past</td><td class='n'>100%</td><td class='n'>+22%</td></tr>" +
    "<tr><td>Bulutli kun, sovuq</td><td class='n'>100%</td><td class='n'>+30%</td></tr></table>" +
    "<p>Farq aynan qishda eng katta: sovuq panelning kuchlanishi ko'tariladi va PWM bu ortiqchani isrof qiladi. Butun avtonomiya hisobi esa dekabr bo'yicha tuziladi.</p>" +
    "<h4>Nominal</h4><p>48 V / 30 A kontroller 1 400 Vt gacha panelni ko'taradi — ya'ni 400 Vt li to'plamda uch barobar zaxira bor. Zaxira keraksiz emas: obyektga keyinchalik kamera qo'shilsa, panel quvvati oshiriladi va kontroller almashtirilmaydi.</p>" +
    "<p class='ogoh'>Kontroller past haroratdagi zaryad taqiqini qo'llab-quvvatlashi shart. Bu funksiya yo'q bo'lsa, u sovuq kunda BMS ogohlantirishini e'tiborsiz qoldirib zaryadni davom ettiradi va LiFePO4 blok bir qishda sig'imining uchdan birini qaytarib bo'lmaydigan darajada yo'qotadi.</p>",
  ru: { yorliq: "Для монтажника", sarlavha: "MPPT: откуда берутся 22%",
    tana: "<p>Контроллер PWM принудительно опускает панель до напряжения аккумулятора. MPPT удерживает панель в её собственной точке максимальной мощности и превращает избыток напряжения в ток.</p>" +
      "<table><tr><th>Условия</th><th>PWM</th><th>MPPT</th></tr>" +
      "<tr><td>Июль, солнце высоко</td><td class='n'>100%</td><td class='n'>+8%</td></tr>" +
      "<tr><td>Декабрь, солнце низко</td><td class='n'>100%</td><td class='n'>+22%</td></tr>" +
      "<tr><td>Пасмурно, холодно</td><td class='n'>100%</td><td class='n'>+30%</td></tr></table>" +
      "<p>Разница максимальна именно зимой: на холоде напряжение панели растёт, и PWM этот избыток выбрасывает. А весь расчёт автономии строится по декабрю.</p>" +
      "<h4>Номинал</h4><p>Контроллер 48 В / 30 А поднимает до 1 400 Вт панелей — то есть на комплекте в 400 Вт запас трёхкратный. Запас не лишний: если на объект позже добавят камеру, мощность панелей увеличат, а контроллер менять не придётся.</p>" +
      "<p class='ogoh'>Контроллер обязан поддерживать запрет заряда при низкой температуре. Без этой функции он в морозный день игнорирует предупреждение BMS и продолжает заряд, а блок LiFePO4 за одну зиму безвозвратно теряет треть ёмкости.</p>" }
},

"y04.x-router": {
  yorliq: "Servis uchun", sarlavha: "Router SNMP orqali nima aytadi",
  tana: "<p>Router bu yechimda faqat kanal emas — u obyektning radio sharoiti haqidagi asosiy manba. Adapter uni har besh daqiqada SNMP v3 bilan so'raydi.</p>" +
    "<table><tr><th>Maydon</th><th>Nimaga kerak</th></tr>" +
    "<tr><td>RSRP, dBm</td><td>signal pasayishi — antenna burildi yoki panel soya tashladi</td></tr>" +
    "<tr><td>SINR, dB</td><td>shovqin ortishi — yaqinda yangi qurilish boshlangan</td></tr>" +
    "<tr><td>Faol SIM</td><td>zaxira SIM'ga o'tish — birinchi operatorda muammo</td></tr>" +
    "<tr><td>Oylik trafik</td><td>tarif chegarasiga yaqinlashish</td></tr>" +
    "<tr><td>Ish vaqti</td><td>qayta yuklanish — quvvat uzilgan yoki qurilma qizigan</td></tr></table>" +
    "<h4>Nima uchun bu servis rejasini tuzadi</h4><p>RSRP ikki hafta ichida 10 dBm ga pasaysa, bu antennaning burilgani yoki ulagichga suv kirgani demak. Platforma bu tendensiyani o'zi ko'radi va aloqa butunlay uzilishidan oldin servis vazifasini ochadi.</p>" +
    "<p class='ogoh'>SNMP v3 talab qilinadi, v2c emas. v2c da parol tarmoq bo'ylab ochiq yuriladi. Tunnel ichida bu kamroq xavfli, lekin xarid shartida v3 yozilishi kerak: bu qo'shimcha pul turmaydi va keyinchalik almashtirish qurilmani qayta sotib olishni anglatadi.</p>",
  ru: { yorliq: "Для сервиса", sarlavha: "Что роутер сообщает по SNMP",
    tana: "<p>Роутер в этом решении не только канал — он основной источник данных о радиообстановке на объекте. Адаптер опрашивает его каждые пять минут по SNMP v3.</p>" +
      "<table><tr><th>Поле</th><th>Зачем</th></tr>" +
      "<tr><td>RSRP, дБм</td><td>падение сигнала — развернуло антенну или панель дала тень</td></tr>" +
      "<tr><td>SINR, дБ</td><td>рост помех — рядом началась стройка</td></tr>" +
      "<tr><td>Активная SIM</td><td>переход на резервную — проблема у первого оператора</td></tr>" +
      "<tr><td>Трафик за месяц</td><td>приближение к лимиту тарифа</td></tr>" +
      "<tr><td>Время работы</td><td>перезагрузка — пропадало питание или перегрев</td></tr></table>" +
      "<h4>Почему это формирует сервисный план</h4><p>Если RSRP за две недели упал на 10 дБм, значит развернуло антенну или в разъём попала вода. Платформа видит этот тренд сама и открывает сервисную задачу до того, как связь пропадёт совсем.</p>" +
      "<p class='ogoh'>Требуется SNMP v3, а не v2c. В v2c пароль идёт по сети открытым текстом. Внутри туннеля это менее опасно, но в условиях закупки нужно писать v3: он не стоит дополнительных денег, а замена потом означает повторную покупку устройства.</p>" }
}

});
