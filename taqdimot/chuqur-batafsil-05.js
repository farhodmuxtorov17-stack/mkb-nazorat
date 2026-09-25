/* Yechim 05 (Ajax datchiklari va video tasdiq) chuqur sahifasidagi batafsil yozuvlari.
   Kalit: y05.<blok>. Ruscha matn yozuvning ichida, ru maydonida. */
window.MKB_BATAFSIL = window.MKB_BATAFSIL || {};
Object.assign(window.MKB_BATAFSIL, {

/* ============================ kirish raqamlari ============================ */

"y05.r-hub": {
  yorliq: "Montajchi uchun", sarlavha: "0,75 Vt: hub nimaga sarflaydi",
  tana: "<p>Hub 2 (4G) pasportda 110–240 V ga ulanadi, lekin ichida 5 V mantiq ishlaydi. O'rtacha iste'mol uch qismdan yig'iladi.</p>" +
    "<table><tr><th>Nima</th><th>Vt</th><th>Izoh</th></tr>" +
    "<tr><td>Radio qabul qilgich, doim ochiq</td><td class='n'>0,25</td><td>868 MGs, uzluksiz tinglash</td></tr>" +
    "<tr><td>4G modul, kutish rejimida</td><td class='n'>0,35</td><td>hodisa yuborilganda 1,8 Vt gacha ko'tariladi</td></tr>" +
    "<tr><td>Protsessor, ichki akkumulyator zaryadi</td><td class='n'>0,15</td><td>akkumulyator to'lgach 0,05 Vt ga tushadi</td></tr>" +
    "<tr><td><b>Sutkalik o'rtacha</b></td><td class='n'><b>0,75</b></td><td><b>18 Vt·soat/sutka</b></td></tr></table>" +
    "<h4>Nega bu raqam butun yechimni hal qiladi</h4><p>18 Vt·soat — Yechim 01 dagi hub va routerning sarfidan sakkiz barobar kam. Shuning uchun bu yerda 100 Vt li panel ham, 100 A·soatlik blok ham kerak emas: 50 A·soatlik LiFePO4 bir oydan ortiq yetadi va ko'rik jadvaliga qo'shimcha tashrif qo'shmaydi.</p>" +
    "<p class='ogoh'>Raqam signal kuchli bo'lgan obyekt uchun. RSRP −105 dBm dan past joyda 4G modul uzatgichni to'liq quvvatga chiqaradi va sutkalik sarf 24–28 Vt·soatga ko'tariladi. Shu sababli hub joyi tanlanganda signal hubning o'z diagnostikasida o'lchanadi.</p>",
  ru: { yorliq: "Для монтажника", sarlavha: "0,75 Вт: на что тратит хаб",
    tana: "<p>Hub 2 (4G) по паспорту питается от 110–240 В, но внутри работает 5-вольтовая логика. Среднее потребление складывается из трёх частей.</p>" +
      "<table><tr><th>Что</th><th>Вт</th><th>Примечание</th></tr>" +
      "<tr><td>Радиоприёмник, открыт постоянно</td><td class='n'>0,25</td><td>868 МГц, непрерывное прослушивание</td></tr>" +
      "<tr><td>Модуль 4G в режиме ожидания</td><td class='n'>0,35</td><td>при отправке события поднимается до 1,8 Вт</td></tr>" +
      "<tr><td>Процессор, заряд внутреннего аккумулятора</td><td class='n'>0,15</td><td>после зарядки падает до 0,05 Вт</td></tr>" +
      "<tr><td><b>Среднесуточное</b></td><td class='n'><b>0,75</b></td><td><b>18 Вт·ч/сутки</b></td></tr></table>" +
      "<h4>Почему эта цифра решает всё решение</h4><p>18 Вт·ч — в восемь раз меньше, чем хаб с роутером в Решении 01. Поэтому здесь не нужны ни панель на 100 Вт, ни блок на 100 А·ч: LiFePO4 на 50 А·ч держит больше месяца и не добавляет ни одного выезда в график осмотров.</p>" +
      "<p class='ogoh'>Цифра верна для объекта с уверенным сигналом. Там, где RSRP ниже −105 дБм, модуль 4G выводит передатчик на полную мощность и суточный расход растёт до 24–28 Вт·ч. Поэтому место хаба выбирают не по делениям на телефоне, а по собственной диагностике хаба.</p>" }
},

"y05.r-batareya": {
  yorliq: "Servis uchun", sarlavha: "4–7 yil: nimaga bog'liq",
  tana: "<p>Datchikdagi CR123A litiy elementi 1 500 mA·soat beradi. Muddat uchta narsaga bog'liq: so'rov oralig'i, ishga tushish soni va harorat.</p>" +
    "<table><tr><th>Datchik</th><th>Katalogda</th><th>Bank obyektida kutiladigan</th></tr>" +
    "<tr><td>DoorProtect</td><td class='n'>7 yil</td><td class='n'>5–6 yil</td></tr>" +
    "<tr><td>MotionProtect</td><td class='n'>5 yil</td><td class='n'>4–5 yil</td></tr>" +
    "<tr><td>MotionCam</td><td class='n'>4 yil</td><td class='n'>2,5–3 yil</td></tr>" +
    "<tr><td>FireProtect 2</td><td class='n'>5 yil</td><td class='n'>4–5 yil</td></tr></table>" +
    "<p>MotionCam eng tez tugaydi: har surat seriyasi kameraning yoritgichini va radio uzatgichni ishga tushiradi. Kuniga o'n hodisa muddatni chorak qismga qisqartiradi.</p>" +
    "<h4>Sovuq</h4><p>Isitilmaydigan xonada litiy elementning ichki qarshiligi ortadi va hub batareyani vaqtidan oldin «past» deb belgilaydi. −10 °C da real muddat katalogdagidan 30–40% qisqa bo'ladi. Platforma har datchikning foizini alohida kuzatadi va 15% dan pastga tushganda servis vazifasi ochiladi — bu esa navbatdagi ko'rikka qo'shib bajariladi, alohida tashrif talab qilmaydi.</p>",
  ru: { yorliq: "Для сервиса", sarlavha: "4–7 лет: от чего зависит",
    tana: "<p>Литиевый элемент CR123A даёт 1 500 мА·ч. Срок зависит от трёх вещей: интервала опроса, числа срабатываний и температуры.</p>" +
      "<table><tr><th>Датчик</th><th>В каталоге</th><th>Ожидаемое на объекте банка</th></tr>" +
      "<tr><td>DoorProtect</td><td class='n'>7 лет</td><td class='n'>5–6 лет</td></tr>" +
      "<tr><td>MotionProtect</td><td class='n'>5 лет</td><td class='n'>4–5 лет</td></tr>" +
      "<tr><td>MotionCam</td><td class='n'>4 года</td><td class='n'>2,5–3 года</td></tr>" +
      "<tr><td>FireProtect 2</td><td class='n'>5 лет</td><td class='n'>4–5 лет</td></tr></table>" +
      "<p>Быстрее всех садится MotionCam: каждая серия снимков включает подсветку камеры и радиопередатчик. Десять событий в сутки сокращают срок на четверть.</p>" +
      "<h4>Холод</h4><p>В неотапливаемом помещении внутреннее сопротивление литиевого элемента растёт, и хаб помечает батарею «разряженной» раньше срока. При −10 °C реальный ресурс на 30–40% короче каталожного. Платформа ведёт процент по каждому датчику отдельно и при падении ниже 15% открывает сервисную задачу — её выполняют попутно с ближайшим осмотром, отдельный выезд не нужен.</p>" }
},

"y05.r-surat": {
  yorliq: "Operator uchun", sarlavha: "7–20 soniya: surat qayerdan kechikadi",
  tana: "<p>MotionCam harakatni sezgach uch-beshta surat oladi va ularni radio orqali hubga yuboradi. Kechikish zanjiri quyidagicha.</p>" +
    "<table><tr><th>Bosqich</th><th>Vaqt</th></tr>" +
    "<tr><td>PIR ishga tushadi, kamera yoritgichi yonadi</td><td class='n'>0,3 s</td></tr>" +
    "<tr><td>Uch surat olinadi</td><td class='n'>1–2 s</td></tr>" +
    "<tr><td>868 MGs orqali hubga uzatiladi</td><td class='n'>4–12 s</td></tr>" +
    "<tr><td>Hub 4G orqali adapterga beradi</td><td class='n'>2–5 s</td></tr>" +
    "<tr><td>Platforma hodisa kartasiga qo'yadi</td><td class='n'>0,5 s</td></tr></table>" +
    "<p>Eng uzun bo'g'in — radio. 868 MGs kanalining o'tkazuvchanligi past, shuning uchun surat bo'laklab yuboriladi. Signal 2/3 bo'lsa uzatish ikki barobar cho'ziladi.</p>" +
    "<p class='ogoh'>Signalning o'zi suratdan oldin keladi: buzib kirish haqidagi xabar birinchi soniyada, surat esa keyin. Operator suratni kutib turmaydi — u signal kelishi bilan javob choralarini boshlaydi, surat esa kartaga o'zi biriktiriladi.</p>",
  ru: { yorliq: "Для оператора", sarlavha: "7–20 секунд: где теряется время",
    tana: "<p>MotionCam при обнаружении движения делает три-пять снимков и передаёт их по радио на хаб. Цепочка задержки такая.</p>" +
      "<table><tr><th>Этап</th><th>Время</th></tr>" +
      "<tr><td>Срабатывает ИК-датчик, включается подсветка</td><td class='n'>0,3 с</td></tr>" +
      "<tr><td>Делаются три снимка</td><td class='n'>1–2 с</td></tr>" +
      "<tr><td>Передача на хаб по 868 МГц</td><td class='n'>4–12 с</td></tr>" +
      "<tr><td>Хаб отдаёт адаптеру по 4G</td><td class='n'>2–5 с</td></tr>" +
      "<tr><td>Платформа кладёт в карточку события</td><td class='n'>0,5 с</td></tr></table>" +
      "<p>Самое длинное звено — радио. Пропускная способность канала 868 МГц мала, поэтому снимок идёт частями. При сигнале 2/3 передача растягивается вдвое.</p>" +
      "<p class='ogoh'>Сам сигнал приходит раньше снимка: сообщение о проникновении — в первую секунду, снимок — после. Оператор не ждёт картинку: он начинает реагировать по сигналу, а снимок прикрепляется к карточке сам.</p>" }
},

"y05.r-narx": {
  yorliq: "Moliya uchun", sarlavha: "7–10 mln so'm: smeta qanday yig'iladi",
  tana: "<p>Narx obyektning geometriyasiga bog'liq: nechta eshik, nechta xona, yong'in datchigi qayerga kerak.</p>" +
    "<table><tr><th>Modda</th><th>Soni</th><th class='n'>mln so'm</th></tr>" +
    "<tr><td>Hub 2 (4G) va DC ta'minot moduli</td><td>1</td><td class='n'>3,3–5,5</td></tr>" +
    "<tr><td>DoorProtect</td><td>2</td><td class='n'>1,2–1,3</td></tr>" +
    "<tr><td>MotionCam</td><td>2</td><td class='n'>2,6–3,2</td></tr>" +
    "<tr><td>FireProtect 2</td><td>3</td><td class='n'>2,1–2,7</td></tr>" +
    "<tr><td>LiFePO4 12 V 50 A·soat va korpus</td><td>1</td><td class='n'>1,6–2,1</td></tr>" +
    "<tr><td>O'rnatish va sozlash</td><td>—</td><td class='n'>0,8–1,2</td></tr></table>" +
    "<p>Diapazonning pastki chegarasi — bazaviy variantlar, yuqorisi — Plus variantlari (ikki chastotali radio, uzoq masofa). Bank obyektlari uchun bazaviy variant yetadi: masofa muammosi ReX bilan yopiladi va u Plus qurilmalar to'plamidan arzon.</p>" +
    "<p class='ogoh'>Smetada ko'pincha unutiladigan uch modda: ichki sirena (0,9–1,2 mln), yong'in organi bilan kelishuv hujjatlari, va SIM kartaning yillik abonenti. Uchtasi birgalikda smetaga 1,5–2 mln so'm qo'shadi.</p>",
  ru: { yorliq: "Для финансов", sarlavha: "7–10 млн сум: из чего складывается смета",
    tana: "<p>Цена зависит от геометрии объекта: сколько дверей, сколько помещений, где нужен пожарный извещатель.</p>" +
      "<table><tr><th>Статья</th><th>Кол-во</th><th class='n'>млн сум</th></tr>" +
      "<tr><td>Hub 2 (4G) и модуль питания DC</td><td>1</td><td class='n'>3,3–5,5</td></tr>" +
      "<tr><td>DoorProtect</td><td>2</td><td class='n'>1,2–1,3</td></tr>" +
      "<tr><td>MotionCam</td><td>2</td><td class='n'>2,6–3,2</td></tr>" +
      "<tr><td>FireProtect 2</td><td>3</td><td class='n'>2,1–2,7</td></tr>" +
      "<tr><td>LiFePO4 12 В 50 А·ч и корпус</td><td>1</td><td class='n'>1,6–2,1</td></tr>" +
      "<tr><td>Монтаж и настройка</td><td>—</td><td class='n'>0,8–1,2</td></tr></table>" +
      "<p>Нижняя граница диапазона — базовые версии, верхняя — версии Plus (двухчастотное радио, большая дальность). Объектам банка хватает базовых: вопрос дальности закрывается ретранслятором ReX, а он дешевле, чем набор устройств Plus.</p>" +
      "<p class='ogoh'>Три статьи, о которых в смете обычно забывают: внутренняя сирена (0,9–1,2 млн), документы согласования с органом пожнадзора и годовая абонплата за SIM. Вместе они добавляют к смете 1,5–2 млн сум.</p>" }
},

/* ============================ komplekt ============================ */

"y05.k-hub": {
  yorliq: "Montajchi uchun", sarlavha: "Hub 2 (4G): nega aynan shu variant",
  tana: "<p>Oiladagi to'rtta hubdan bank obyektiga mos keladigani bittasi. Tanlov mezoni — 4G moduli va zaxira kanal.</p>" +
    "<table><tr><th>Variant</th><th>Aloqa kanallari</th><th>Qurilma sig'imi</th></tr>" +
    "<tr><td>Hub</td><td>Ethernet, 2G</td><td class='n'>100</td></tr>" +
    "<tr><td>Hub Plus</td><td>Ethernet, Wi-Fi, 2 × 2G</td><td class='n'>150</td></tr>" +
    "<tr><td><b>Hub 2 (4G)</b></td><td><b>Ethernet, 2 × 4G</b></td><td class='n'><b>100</b></td></tr>" +
    "<tr><td>Hub 2 Plus</td><td>Ethernet, Wi-Fi, 2 × 4G</td><td class='n'>200</td></tr></table>" +
    "<h4>Nima uchun 2G yetarli emas</h4><p>MotionCam surati 2G kanalda 40–90 soniyada yuriladi — bu video tasdiqning butun ma'nosini yo'qotadi. Bundan tashqari, operatorlar 2G tarmoqni bosqichma-bosqich yopmoqda va besh yillik xizmat muddati mobaynida u obyektlarning bir qismida umuman qolmaydi.</p>" +
    "<p class='ogoh'>Hub metall shkaf ichiga qo'yilmaydi va derazadan 1 metrdan yaqinroqqa osilmaydi: birinchi holda radio yo'qoladi, ikkinchisida hub eng oson topiladigan va birinchi sindiriladigan qurilmaga aylanadi. To'g'ri joy — ichki xona, shift ostida, eshikdan ko'rinmaydigan devorda.</p>",
  ru: { yorliq: "Для монтажника", sarlavha: "Hub 2 (4G): почему именно он",
    tana: "<p>Из четырёх хабов линейки объекту банка подходит один. Критерий выбора — модуль 4G и резервный канал.</p>" +
      "<table><tr><th>Вариант</th><th>Каналы связи</th><th>Ёмкость</th></tr>" +
      "<tr><td>Hub</td><td>Ethernet, 2G</td><td class='n'>100</td></tr>" +
      "<tr><td>Hub Plus</td><td>Ethernet, Wi-Fi, 2 × 2G</td><td class='n'>150</td></tr>" +
      "<tr><td><b>Hub 2 (4G)</b></td><td><b>Ethernet, 2 × 4G</b></td><td class='n'><b>100</b></td></tr>" +
      "<tr><td>Hub 2 Plus</td><td>Ethernet, Wi-Fi, 2 × 4G</td><td class='n'>200</td></tr></table>" +
      "<h4>Почему 2G недостаточно</h4><p>Снимок MotionCam уходит по 2G за 40–90 секунд — это лишает видеоподтверждение всякого смысла. Кроме того, операторы постепенно закрывают сеть 2G, и за пять лет срока службы на части объектов её просто не останется.</p>" +
      "<p class='ogoh'>Хаб не ставят внутрь металлического шкафа и не вешают ближе метра к окну: в первом случае пропадает радио, во втором хаб становится самым заметным устройством и ломается первым. Правильное место — внутреннее помещение, под потолком, на стене, не просматриваемой от входа.</p>" }
},

"y05.k-yongin": {
  yorliq: "Yurist uchun", sarlavha: "FireProtect 2: qaysi variant olinadi",
  tana: "<p>Uchta variant bor va ular sensorlar soni bilan farqlanadi.</p>" +
    "<table><tr><th>Variant</th><th>Nimani sezadi</th><th>Qayerga</th></tr>" +
    "<tr><td>Heat</td><td>harorat</td><td>oshxona, qozonxona — tutun doim bo'ladigan joy</td></tr>" +
    "<tr><td>Smoke + Heat</td><td>tutun va harorat</td><td>xona, koridor, arxiv</td></tr>" +
    "<tr><td>Smoke + Heat + CO</td><td>tutun, harorat, is gazi</td><td>yerto'la, gaz qozoni bor bino</td></tr></table>" +
    "<p>Bank balansidagi obyektlarning ko'pchiligida Smoke + Heat yetadi. CO varianti faqat gaz jihozi qolgan binoda oqlanadi — u qimmatroq va sensori besh yildan keyin almashtirilishi kerak.</p>" +
    "<p class='ogoh'>Bu datchik yong'in signalizatsiyasi loyihasining o'rnini bosmaydi. Yong'in xavfsizligi qoidalari talab qiladigan obyektda loyiha va qabul dalolatnomasi baribir kerak, batareyali datchikning talabni yopishi esa IIV yong'in xavfsizligi organi bilan alohida kelishiladi. Kelishuvsiz obyekt hujjatda «himoyalangan» deb belgilanmaydi.</p>",
  ru: { yorliq: "Для юриста", sarlavha: "FireProtect 2: какой вариант брать",
    tana: "<p>Вариантов три, различаются набором сенсоров.</p>" +
      "<table><tr><th>Вариант</th><th>Что распознаёт</th><th>Куда</th></tr>" +
      "<tr><td>Heat</td><td>температура</td><td>кухня, котельная — там, где дым штатный</td></tr>" +
      "<tr><td>Smoke + Heat</td><td>дым и температура</td><td>помещение, коридор, архив</td></tr>" +
      "<tr><td>Smoke + Heat + CO</td><td>дым, температура, угарный газ</td><td>подвал, здание с газовым котлом</td></tr></table>" +
      "<p>Большинству объектов на балансе банка хватает Smoke + Heat. Вариант с CO оправдан только там, где осталось газовое оборудование: он дороже, а сенсор требует замены через пять лет.</p>" +
      "<p class='ogoh'>Этот извещатель не заменяет проект пожарной сигнализации. Там, где правила пожарной безопасности требуют её наличия, проект и акт приёмки нужны в любом случае, а возможность закрыть требование автономным извещателем согласуется с органом пожарного надзора МВД отдельно. Без согласования объект не отмечается в документах как «защищённый».</p>" }
},

/* ============================ radio xaritasi ============================ */

"y05.rd-hub": {
  yorliq: "Montajchi uchun", sarlavha: "Hub joyi: butun obyekt shu nuqtaga bog'lanadi",
  tana: "<p>Hub joyi birinchi tanlanadi va qolgan hamma narsa unga moslanadi. To'rtta talab bir vaqtda bajarilishi kerak.</p>" +
    "<ol><li><b>Geometrik markazga yaqin.</b> Chetga qo'yilsa uzoq datchiklar ReX talab qiladi va smeta 1,5 mln so'mga oshadi.</li>" +
    "<li><b>Ko'zdan yiroq.</b> Kirish yo'lakchasidan ko'rinadigan hub buzib kirganning birinchi nishoni bo'ladi.</li>" +
    "<li><b>Metall to'siqsiz.</b> Shkaf ichi, temir-beton to'sin ostidagi niche, ventilyatsiya qutisi — uchtasi ham radioni o'ldiradi.</li>" +
    "<li><b>4G signali borligi.</b> Hub diagnostikasida RSRP −100 dBm dan yuqori bo'lishi kerak.</li></ol>" +
    "<h4>Balandlik</h4><p>1,8–2,2 m — eng yaxshi oraliq. Shift ostiga chiqarilsa signal yaxshilanadi, lekin servis uchun narvon kerak bo'ladi; ko'z balandligidan pastga tushirilsa ko'rinib qoladi.</p>" +
    "<p class='ogoh'>Hub tashqi ta'minot platasi DC modulga korpus yopilmasdan oldin almashtiriladi. Keyin almashtirish korpusni qayta ochishni, qurilmani tarmoqdan uzishni va butun sinovni qaytarishni anglatadi — bu bir soatlik qo'shimcha ish.</p>",
  ru: { yorliq: "Для монтажника", sarlavha: "Место хаба: к этой точке привязан весь объект",
    tana: "<p>Место хаба выбирают первым, всё остальное подстраивают под него. Четыре требования должны выполняться одновременно.</p>" +
      "<ol><li><b>Ближе к геометрическому центру.</b> Если сдвинуть к краю, дальние датчики потребуют ReX и смета вырастет на 1,5 млн сум.</li>" +
      "<li><b>Вне поля зрения.</b> Хаб, видимый от входа, — первая цель того, кто проник внутрь.</li>" +
      "<li><b>Без металла вокруг.</b> Шкаф, ниша под железобетонной балкой, вентиляционный короб — любое из трёх убивает радио.</li>" +
      "<li><b>Наличие сигнала 4G.</b> По диагностике хаба RSRP должен быть выше −100 дБм.</li></ol>" +
      "<h4>Высота</h4><p>Лучший диапазон — 1,8–2,2 м. Выше, под потолок, — сигнал лучше, но для обслуживания нужна стремянка; ниже уровня глаз — хаб становится заметным.</p>" +
      "<p class='ogoh'>Штатную плату питания меняют на модуль DC до закрытия корпуса. Замена позже означает повторное вскрытие, снятие устройства с сети и полный повтор проверки — это лишний час работы.</p>" }
},

"y05.rd-rex": {
  yorliq: "Montajchi uchun", sarlavha: "ReX 2: qachon kerak va qayerga qo'yiladi",
  tana: "<p>Radio kengaytirgich signalni kuchaytirmaydi — u zanjirga yana bitta bo'g'in qo'shadi. Shuning uchun u aniq o'lchov natijasi bo'yicha qo'yiladi.</p>" +
    "<h4>Qachon</h4><p>Datchikda signal darajasi 1/3 bo'lsa yoki 2/3 bo'lib turib nam mavsumda 1/3 ga tushsa. G'ishtli devor namlanganda radio yo'qotishi 3–6 dB ga ortadi — shu sababli sinov eng yomon sharoitga zaxira bilan baholanadi.</p>" +
    "<h4>Qayerga</h4><p>ReX hub bilan datchik orasidagi yo'lning taxminan o'rtasiga, ochiq joyga qo'yiladi: eshik tepasi, yo'lak burchagi. Devorning narigi tomoniga qo'yilsa foyda bermaydi — u ham o'sha devor orqali gaplashadi.</p>" +
    "<p class='ogoh'>ReX doimiy quvvat talab qiladi (o'rtacha 0,4 Vt) va ichki akkumulyatori 35 soatga yetadi. Elektrsiz obyektda bu 12 V shinaga yana bitta iste'molchi qo'shilishini anglatadi va avtonomiya hisobi qayta ko'riladi.</p>",
  ru: { yorliq: "Для монтажника", sarlavha: "ReX 2: когда нужен и куда ставится",
    tana: "<p>Ретранслятор не усиливает сигнал — он добавляет в цепочку ещё одно звено. Поэтому его ставят не «на всякий случай», а по результату замера.</p>" +
      "<h4>Когда</h4><p>Если у датчика уровень 1/3, либо 2/3, который в сырой сезон опускается до 1/3. У намокшей кирпичной стены потери растут на 3–6 дБ — поэтому проверку оценивают с запасом на худшие условия.</p>" +
      "<h4>Куда</h4><p>ReX ставят примерно посередине пути между хабом и датчиком, на открытом месте: над дверью, в углу коридора. За той же стеной он бесполезен — он разговаривает через неё точно так же.</p>" +
      "<p class='ogoh'>ReX требует постоянного питания (в среднем 0,4 Вт), внутреннего аккумулятора хватает на 35 часов. На объекте без электричества это ещё один потребитель на шине 12 В, и расчёт автономии пересматривается.</p>" }
},

"y05.rd-sorov": {
  yorliq: "Arxitektor uchun", sarlavha: "36 soniya: oraliqning ikki tomoni",
  tana: "<p>Hub har datchikdan belgilangan oraliqda javob so'raydi. Oraliq 12 dan 300 soniyagacha sozlanadi va u ikkita qarama-qarshi narsani belgilaydi.</p>" +
    "<table><tr><th>Oraliq</th><th>Nosozlik aniqlanadi</th><th>Batareya muddati</th></tr>" +
    "<tr><td>12 soniya</td><td class='n'>36 soniyada</td><td class='n'>2–3 yil</td></tr>" +
    "<tr><td><b>36 soniya</b></td><td class='n'><b>1,8 daqiqada</b></td><td class='n'><b>4–7 yil</b></td></tr>" +
    "<tr><td>300 soniya</td><td class='n'>15 daqiqada</td><td class='n'>7–9 yil</td></tr></table>" +
    "<p>Nosozlik uchta javobsiz so'rovdan keyin e'lon qilinadi — shuning uchun jadvaldagi ikkinchi ustun oraliqdan uch barobar katta.</p>" +
    "<h4>Nega 36 soniya qoldiriladi</h4><p>Bank obyektida datchikning yo'qolishi hodisasi ikki daqiqa kechiksa ham hech narsa o'zgarmaydi: javob choralari baribir tashrifdan boshlanadi. Batareyaning ikki yilga qisqarishi esa besh yillik davrda obyektga ikkita qo'shimcha tashrif qo'shadi. Shuning uchun zavod qiymati o'zgartirilmaydi.</p>",
  ru: { yorliq: "Для архитектора", sarlavha: "36 секунд: две стороны интервала",
    tana: "<p>Хаб опрашивает каждый датчик с заданным интервалом. Интервал настраивается от 12 до 300 секунд и задаёт две противоположные вещи.</p>" +
      "<table><tr><th>Интервал</th><th>Неисправность видна через</th><th>Ресурс батареи</th></tr>" +
      "<tr><td>12 секунд</td><td class='n'>36 секунд</td><td class='n'>2–3 года</td></tr>" +
      "<tr><td><b>36 секунд</b></td><td class='n'><b>1,8 минуты</b></td><td class='n'><b>4–7 лет</b></td></tr>" +
      "<tr><td>300 секунд</td><td class='n'>15 минут</td><td class='n'>7–9 лет</td></tr></table>" +
      "<p>Неисправность объявляется после трёх неотвеченных опросов — поэтому второй столбец втрое больше интервала.</p>" +
      "<h4>Почему оставляют 36 секунд</h4><p>На объекте банка задержка события «датчик пропал» на две минуты ничего не меняет: реакция всё равно начинается с выезда. А сокращение ресурса батареи на два года добавляет за пятилетний срок два лишних выезда. Поэтому заводское значение не трогают.</p>" }
},

"y05.rd-masofa": {
  yorliq: "Montajchi uchun", sarlavha: "2 000 m dan 20 m gacha: yo'qotish qayerdan",
  tana: "<p>Katalogdagi 2 000 m — to'siqsiz maydon uchun. Bino ichida har to'siq o'z ulushini oladi.</p>" +
    "<table><tr><th>To'siq</th><th>Yo'qotish</th><th>Masofaga ta'siri</th></tr>" +
    "<tr><td>Yog'och eshik, gipsokarton</td><td class='n'>2–4 dB</td><td>deyarli sezilmaydi</td></tr>" +
    "<tr><td>G'isht devor, 25 sm</td><td class='n'>8–12 dB</td><td>uchdan biriga qisqaradi</td></tr>" +
    "<tr><td>Temir-beton devor</td><td class='n'>15–25 dB</td><td>o'ndan biriga qisqaradi</td></tr>" +
    "<tr><td>Metall javon, seyf, konteyner</td><td class='n'>20–30 dB</td><td>ortida deyarli o'tmaydi</td></tr></table>" +
    "<p>Shuning uchun 44 metrli omborda hubdan darvozagacha ikkita devor orqali 34 metr masofa ReXsiz yopilmaydi, ochiq zalda esa 28 metr bemalol ishlaydi.</p>" +
    "<p class='ogoh'>O'lchov qurilma o'rnatilgandan keyin, aynan o'rnatilgan joyida bajariladi. Datchikni qo'lda ushlab o'lchash noto'g'ri natija beradi: inson tanasi 868 MGs to'lqinni yutadi va ko'rsatkich bir tayoqchaga past chiqadi.</p>",
  ru: { yorliq: "Для монтажника", sarlavha: "От 2 000 м до 20 м: где теряется дальность",
    tana: "<p>Каталожные 2 000 м даны для открытой площадки. Внутри здания каждая преграда забирает свою долю.</p>" +
      "<table><tr><th>Преграда</th><th>Потери</th><th>Влияние на дальность</th></tr>" +
      "<tr><td>Деревянная дверь, гипсокартон</td><td class='n'>2–4 дБ</td><td>почти незаметно</td></tr>" +
      "<tr><td>Кирпичная стена, 25 см</td><td class='n'>8–12 дБ</td><td>падает до трети</td></tr>" +
      "<tr><td>Железобетонная стена</td><td class='n'>15–25 дБ</td><td>падает до десятой части</td></tr>" +
      "<tr><td>Металлический стеллаж, сейф, контейнер</td><td class='n'>20–30 дБ</td><td>за ними почти не проходит</td></tr></table>" +
      "<p>Поэтому на складе длиной 44 метра 34 метра от хаба до ворот через две стены без ReX не закрываются, а 28 метров по открытому залу работают спокойно.</p>" +
      "<p class='ogoh'>Замер делают после установки устройства и именно в той точке, где оно закреплено. Держать датчик в руке нельзя: тело человека поглощает волну 868 МГц и показание занижается на одно деление.</p>" }
},

"y05.x-darvoza": {
  yorliq: "Montajchi uchun", sarlavha: "DoorProtect darvozada: ikki tafsilot",
  tana: "<p>Eshik datchigi ikki qismdan iborat: qanotdagi magnit va g'ilofdagi qabul qilgich. Ular orasidagi masofa datasheet chegarasidan oshmasligi kerak — metall darvozada bu chegara ikki barobar qisqaradi.</p>" +
    "<table><tr><th>Yuza</th><th>Ruxsat etilgan oraliq</th></tr>" +
    "<tr><td>Yog'och yoki plastik eshik</td><td class='n'>20 mm gacha</td></tr>" +
    "<tr><td>Metall darvoza</td><td class='n'>9 mm gacha</td></tr></table>" +
    "<h4>Ikkinchi tafsilot — tamper</h4><p>Korpus ochilishi datchigi doim yoqiq qoldiriladi. Darvoza tashqaridan ko'rinadigan joyda bo'lsa, buzg'unchining birinchi harakati datchikni yulib olish bo'ladi; tamper shu lahzada TA kodi bilan hodisa ochadi.</p>" +
    "<p class='ogoh'>Metall darvozaga datchik to'g'ridan-to'g'ri yopishtirilmaydi: metall radioni yutadi va signal ikki tayoqchaga tushadi. To'g'ri usul — 10–15 mm qalinlikdagi plastik yoki yog'och prokladka orqali mahkamlash. Bu bir daqiqalik ish besh yillik ishonchli aloqani beradi.</p>",
  ru: { yorliq: "Для монтажника", sarlavha: "DoorProtect на воротах: две детали",
    tana: "<p>Дверной датчик состоит из двух частей: магнит на створке и приёмник на коробе. Зазор между ними не должен превышать предел из datasheet — на металлических воротах этот предел вдвое меньше.</p>" +
      "<table><tr><th>Поверхность</th><th>Допустимый зазор</th></tr>" +
      "<tr><td>Деревянная или пластиковая дверь</td><td class='n'>до 20 мм</td></tr>" +
      "<tr><td>Металлические ворота</td><td class='n'>до 9 мм</td></tr></table>" +
      "<h4>Вторая деталь — тампер</h4><p>Датчик вскрытия корпуса всегда оставляют включённым. Если ворота просматриваются снаружи, первое действие взломщика — сорвать датчик; тампер в этот же момент открывает событие с кодом TA.</p>" +
      "<p class='ogoh'>На металл датчик не клеят напрямую: металл поглощает радио и сигнал падает до двух делений. Правильный способ — крепление через пластиковую или деревянную прокладку 10–15 мм. Минута работы даёт пять лет устойчивой связи.</p>" }
},

"y05.x-harakat": {
  yorliq: "Montajchi uchun", sarlavha: "MotionProtect: 12 metr qayerga qaratiladi",
  tana: "<p>PIR datchik haroratning yon tomonga siljishini sezadi, to'g'ri o'ziga qarab kelayotgan harakatni esa yomon sezadi. Shuning uchun u kirish nuqtasiga qaratilmaydi — <b>kirish yo'nalishiga ko'ndalang</b> qo'yiladi.</p>" +
    "<table><tr><th>Parametr</th><th>Qiymat</th></tr>" +
    "<tr><td>Ko'rish burchagi</td><td class='n'>88,5°</td></tr>" +
    "<tr><td>Masofa</td><td class='n'>12 m gacha</td></tr>" +
    "<tr><td>O'rnatish balandligi</td><td class='n'>2,4 m</td></tr>" +
    "<tr><td>Ish harorati</td><td class='n'>−10…+40 °C</td></tr></table>" +
    "<h4>Nimaga qaratilmaydi</h4><p>Deraza (quyosh nuri), isitish batareyasi (issiq havo oqimi), konditsioner, kamin. Har biri yolg'on signalning doimiy manbai. Burchakka o'rnatilganda datchik zalning ikkita devorini ham qamrab oladi va bu joylardan chetlanadi.</p>" +
    "<p class='ogoh'>Sezgirlik «yuqori» darajada qoldirilmaydi. Bo'sh binoda kalamush va uchib kirgan qush o'rtacha sezgirlikda ham signal beradi; yuqori sezgirlikda esa operator haftada o'nlab yolg'on hodisani ko'radi va bir oydan keyin ularga qaramay qo'yadi.</p>",
  ru: { yorliq: "Для монтажника", sarlavha: "MotionProtect: куда направить 12 метров",
    tana: "<p>ИК-датчик чувствует поперечное движение тепла и плохо видит движение прямо на себя. Поэтому его не направляют на точку входа — его ставят <b>поперёк направления входа</b>.</p>" +
      "<table><tr><th>Параметр</th><th>Значение</th></tr>" +
      "<tr><td>Угол обзора</td><td class='n'>88,5°</td></tr>" +
      "<tr><td>Дальность</td><td class='n'>до 12 м</td></tr>" +
      "<tr><td>Высота установки</td><td class='n'>2,4 м</td></tr>" +
      "<tr><td>Рабочая температура</td><td class='n'>−10…+40 °C</td></tr></table>" +
      "<h4>Куда не направляют</h4><p>Окно (солнце), радиатор отопления (поток тёплого воздуха), кондиционер, камин. Каждое — постоянный источник ложных срабатываний. В углу помещения датчик охватывает сразу две стены зала и обходит эти места стороной.</p>" +
      "<p class='ogoh'>Чувствительность не оставляют на «высокой». В пустом здании крыса и залетевшая птица дают срабатывание и на средней; на высокой оператор получает десятки ложных событий в неделю и через месяц перестаёт на них смотреть.</p>" }
},

"y05.x-surat": {
  yorliq: "Operator uchun", sarlavha: "MotionCam: video tasdiqning arzon yo'li",
  tana: "<p>MotionCam — bu kamera emas, suratli harakat datchigi. U oqim bermaydi, jonli ko'rish imkoni yo'q; hodisa bo'lganda uch-beshta surat oladi va shu bilan tugaydi.</p>" +
    "<table><tr><th>Nima beradi</th><th>Qiymat</th></tr>" +
    "<tr><td>Surat o'lchami</td><td class='n'>320 × 240 yoki 640 × 480</td></tr>" +
    "<tr><td>Seriyadagi surat soni</td><td class='n'>1–5</td></tr>" +
    "<tr><td>Tungi yoritish</td><td class='n'>IR, 4 m gacha</td></tr>" +
    "<tr><td>Doimiy quvvat</td><td class='n'>kerak emas</td></tr></table>" +
    "<h4>Nima uchun bu yetadi</h4><p>Operatorga hodisa paytida bitta savolga javob kerak: bu odammi yoki yolg'on signalmi. 320 × 240 surat bu savolga javob beradi va yolg'on chaqiruvlarni to'sadi. Kimligini aniqlash — boshqa vazifa va u kamera bilan yopiladi.</p>" +
    "<p class='ogoh'>Surat hodisadan 7–20 soniya keyin keladi. Shuning uchun u boshlangan chorani tasdiqlash yoki bekor qilish uchun ishlatiladi. Operator ko'rsatmasida shu tartib aniq yozilishi kerak.</p>",
  ru: { yorliq: "Для оператора", sarlavha: "MotionCam: дешёвый путь к видеоподтверждению",
    tana: "<p>MotionCam — не камера, а датчик движения со снимком. Потока он не даёт, живой просмотр невозможен; при событии делает три-пять кадров и на этом заканчивает.</p>" +
      "<table><tr><th>Что даёт</th><th>Значение</th></tr>" +
      "<tr><td>Размер снимка</td><td class='n'>320 × 240 или 640 × 480</td></tr>" +
      "<tr><td>Кадров в серии</td><td class='n'>1–5</td></tr>" +
      "<tr><td>Ночная подсветка</td><td class='n'>ИК, до 4 м</td></tr>" +
      "<tr><td>Постоянное питание</td><td class='n'>не требуется</td></tr></table>" +
      "<h4>Почему этого достаточно</h4><p>Оператору в момент события нужен ответ на один вопрос: человек это или ложное срабатывание. Снимок 320 × 240 на этот вопрос отвечает и отсекает ложные вызовы. Установить личность — другая задача, и её закрывает камера.</p>" +
      "<p class='ogoh'>Снимок приходит через 7–20 секунд после события. Поэтому он служит не для начала реакции, а для подтверждения или отмены уже начатой. В инструкции оператора этот порядок должен быть записан прямо.</p>" }
},

"y05.x-olov": {
  yorliq: "Montajchi uchun", sarlavha: "FireProtect shifida: joy va sinov",
  tana: "<p>Tutun datchigi xonaning shipiga, devordan kamida 0,5 metr uzoqqa o'rnatiladi. Bitta datchik 30 m² gacha xonani qoplaydi; kattaroq xonaga ikkitasi kerak.</p>" +
    "<h4>Qayerga qo'yilmaydi</h4><p>Ventilyatsiya teshigining yoniga — havo oqimi tutunni datchikdan olib ketadi. Yorug'lik moslamasiga yaqin — issiqlik sensori noto'g'ri ishlaydi. Burchakka — u yerda havo turg'un bo'ladi.</p>" +
    "<h4>Sinov</h4><p>Har datchik o'rnatilgandan keyin aerozol bilan sinaladi va sinov vaqti dalolatnomaga yoziladi. Platforma bu sanani eslab qoladi: yillik sinov muddati yaqinlashganda mas'ul xodimga vazifa o'zi ochiladi.</p>" +
    "<p class='ogoh'>Ajax datchiklari o'zaro bog'langan: bitta xonada yong'in aniqlansa, butun obyektdagi barcha FireProtect sirenalari birga ishlaydi. Bu funksiya hub sozlamasida yoqilgan bo'lishi kerak — zavod holatida u o'chirilgan.</p>",
  ru: { yorliq: "Для монтажника", sarlavha: "FireProtect на потолке: место и проверка",
    tana: "<p>Дымовой извещатель ставят на потолок, не ближе 0,5 м к стене. Один извещатель закрывает до 30 м²; помещению больше нужны два.</p>" +
      "<h4>Куда не ставят</h4><p>Рядом с вентиляционным отверстием — поток уносит дым мимо. Близко к светильнику — врёт тепловой сенсор. В угол — там воздух застаивается.</p>" +
      "<h4>Проверка</h4><p>Каждый извещатель после установки проверяют аэрозолем, время проверки заносят в акт. Платформа запоминает эту дату: при приближении срока ежегодной проверки задача ответственному открывается сама.</p>" +
      "<p class='ogoh'>Извещатели Ajax связаны между собой: при обнаружении огня в одном помещении срабатывают сирены всех FireProtect объекта. Эту функцию нужно включить в настройках хаба — по умолчанию она выключена.</p>" }
},

"y05.x-suv": {
  yorliq: "Montajchi uchun", sarlavha: "LeaksProtect: arzon datchik, qimmat zarar",
  tana: "<p>Bu 1,2 mln so'mlik datchik bo'sh turgan binoda eng katta zararning oldini oladi. Qishda yorilgan isitish quvuri bir kechada polni, devor pardozini va podvaldagi mulkni buzadi — ta'mir 40–80 mln so'mga tushadi.</p>" +
    "<h4>Qayerga</h4><p>Isitish tuguni ostiga, suv hisoblagichi yoniga, podval polining eng past nuqtasiga, hojatxona stoyakasi ostiga. Datchik polga qo'yiladi, mahkamlanmaydi — u 2 mm suv qatlamini sezadi.</p>" +
    "<h4>Nima bo'ladi</h4><p>Signal WA kodi bilan keladi va platformada «suv bosishi» hodisasi ochiladi. Bu hodisa buzib kirish bilan bir xil ustuvorlikka ega: javob vaqti daqiqalar bilan o'lchanadi.</p>" +
    "<p class='ogoh'>Datchikning o'zi suvni to'xtatmaydi. Isitish tizimi qishda ishlab turgan obyektda uning yoniga elektr yuritmali kran qo'yish ma'noli — lekin u doimiy quvvat talab qiladi va elektrsiz obyektda ishlamaydi. Bunday obyektda tizim qishga kirishdan oldin bo'shatiladi va bu ko'rik ro'yxatining alohida bandi bo'ladi.</p>",
  ru: { yorliq: "Для монтажника", sarlavha: "LeaksProtect: дешёвый датчик, дорогой ущерб",
    tana: "<p>Датчик за 1,2 млн сум предотвращает самый крупный ущерб в пустующем здании. Лопнувшая зимой труба отопления за ночь портит пол, отделку стен и имущество в подвале — ремонт обходится в 40–80 млн сум.</p>" +
      "<h4>Куда</h4><p>Под узел отопления, рядом со счётчиком воды, в самую низкую точку пола подвала, под стояк санузла. Датчик кладут на пол, не крепят — он чувствует слой воды 2 мм.</p>" +
      "<h4>Что происходит</h4><p>Сигнал приходит с кодом WA, в платформе открывается событие «затопление». Приоритет у него такой же, как у проникновения: время реакции считается в минутах, а не в часах.</p>" +
      "<p class='ogoh'>Сам датчик воду не перекрывает. Там, где отопление зимой работает, рядом имеет смысл поставить кран с электроприводом — но он требует постоянного питания и на объекте без электричества не работает. На таком объекте систему сливают перед зимой, и это отдельный пункт списка осмотра.</p>" }
},

"y05.x-metall": {
  yorliq: "Montajchi uchun", sarlavha: "Javonlar ortidagi o'lik zona",
  tana: "<p>Metall javon 868 MGs to'lqinni aks ettiradi va yutadi: yo'qotish 20–30 dB, ya'ni quvvat yuzdan biriga tushadi. Javon qatorlari orasidagi yo'lak esa to'lqin uchun tor tuynuk bo'lib qoladi.</p>" +
    "<h4>Nima qilinmaydi</h4><p>Javonlar ortiga ReX qo'yilmaydi: kengaytirgichning o'zi ham o'sha metall orqali hub bilan gaplashadi va foyda bermaydi. Datchikni javon yuzasiga yopishtirib qo'yish ham yordam bermaydi — metall antennani «o'chiradi».</p>" +
    "<h4>Nima qilinadi</h4><p>Datchik javonlardan yuqoriga, javon ustidan hubga to'g'ridan-to'g'ri ko'rinadigan balandlikka chiqariladi. Ombor shipi 4,5 metr bo'lsa, 3,2 metrlik javon ustida 1,3 metrlik ochiq yo'lak qoladi va shu yo'lak orqali signal 3/3 ga chiqadi.</p>" +
    "<p class='ogoh'>Javonlarning joyi o'zgaradi. Ijaraga berilgan yoki mulk to'ldirilgan omborda bir yildan keyin datchik ishlamay qolishi mumkin. Shuning uchun har ko'rikda signal darajasi qayta o'qiladi va dalolatnomaga yoziladi — bu ro'yxatning majburiy bandi.</p>",
  ru: { yorliq: "Для монтажника", sarlavha: "Мёртвая зона за стеллажами",
    tana: "<p>Металлический стеллаж отражает и поглощает волну 868 МГц: потери 20–30 дБ, то есть мощность падает в сто раз. Проход между рядами стеллажей превращается для волны в узкую щель.</p>" +
      "<h4>Чего не делают</h4><p>За стеллажи не ставят ReX: ретранслятор общается с хабом через тот же металл и пользы не приносит. Приклеивать датчик к поверхности стеллажа тоже бесполезно — металл «глушит» антенну.</p>" +
      "<h4>Что делают</h4><p>Датчик поднимают выше стеллажей, на высоту прямой видимости хаба поверх них. При потолке склада 4,5 м и стеллаже 3,2 м остаётся открытый коридор 1,3 м, и через него сигнал выходит на 3/3.</p>" +
      "<p class='ogoh'>Стеллажи переставляют. На сданном в аренду или заполненном складе датчик через год может перестать отвечать. Поэтому уровень сигнала перечитывают на каждом осмотре и вносят в акт — это обязательный пункт списка.</p>" }
},

/* ============================ quvvat ============================ */

"y05.q-hisob": {
  yorliq: "Montajchi uchun", sarlavha: "0,75 Vt dan bir oygacha: hisob",
  tana: "<p>Hisob bitta iste'molchiga qisqaradi, chunki datchiklar 12 V shinaga umuman ulanmaydi.</p>" +
    "<table><tr><th>Qator</th><th class='n'>Qiymat</th></tr>" +
    "<tr><td>Hubning o'rtacha iste'moli</td><td class='n'>0,75 Vt</td></tr>" +
    "<tr><td>Sutkalik sarf</td><td class='n'>18 Vt·soat</td></tr>" +
    "<tr><td>DC-DC o'zgartirgich yo'qotishi</td><td class='n'>3 Vt·soat</td></tr>" +
    "<tr><td>Hisobga olinadigan sutkalik</td><td class='n'>21 Vt·soat</td></tr>" +
    "<tr><td>12 V 50 A·soat LiFePO4, foydali</td><td class='n'>576 Vt·soat</td></tr>" +
    "<tr><td><b>Zaryadsiz muddat</b></td><td class='n'><b>27 kun</b></td></tr></table>" +
    "<p>50 Vt li kichik panel dekabrda sutkasiga 57 Vt·soat beradi — bu yuklamadan uch barobar ko'p. Shuning uchun panelli variantda avtonomiya cheksiz bo'ladi va servis obyektga faqat rejali ko'rik bilan boradi.</p>" +
    "<p class='ogoh'>Doimiy yoqiq IP kamera qo'shilishi bu hisobni butunlay o'zgartiradi: kamera 5–7 Vt oladi, ya'ni hubdan sakkiz barobar ko'p, va avtonomiya 27 kundan 4–6 kunga tushadi. Kamera kerak bo'lsa, quvvat qismi Yechim 04 bo'yicha qayta loyihalanadi.</p>",
  ru: { yorliq: "Для монтажника", sarlavha: "От 0,75 Вт до месяца: расчёт",
    tana: "<p>Расчёт сводится к одному потребителю, потому что датчики к шине 12 В не подключаются вовсе.</p>" +
      "<table><tr><th>Строка</th><th class='n'>Значение</th></tr>" +
      "<tr><td>Среднее потребление хаба</td><td class='n'>0,75 Вт</td></tr>" +
      "<tr><td>Суточный расход</td><td class='n'>18 Вт·ч</td></tr>" +
      "<tr><td>Потери преобразователя DC-DC</td><td class='n'>3 Вт·ч</td></tr>" +
      "<tr><td>Расчётное суточное</td><td class='n'>21 Вт·ч</td></tr>" +
      "<tr><td>LiFePO4 12 В 50 А·ч, полезная ёмкость</td><td class='n'>576 Вт·ч</td></tr>" +
      "<tr><td><b>Срок без подзарядки</b></td><td class='n'><b>27 дней</b></td></tr></table>" +
      "<p>Небольшая панель на 50 Вт даёт в декабре 57 Вт·ч в сутки — втрое больше нагрузки. Поэтому в варианте с панелью автономия неограниченна, и сервис приезжает на объект только по плановому осмотру.</p>" +
      "<p class='ogoh'>Постоянно включённая IP-камера полностью меняет этот расчёт: она берёт 5–7 Вт, то есть в восемь раз больше хаба, и автономия падает с 27 дней до 4–6. Если камера нужна, силовую часть проектируют заново по Решению 04.</p>" }
},

"y05.q-oy": {
  yorliq: "Servis uchun", sarlavha: "Bir oy: bu raqam nimani anglatadi",
  tana: "<p>27 kunlik avtonomiya obyektni ko'rik jadvalidan tashqari tashriflardan ozod qiladi. Ko'rik davri bir oyda bir marta bo'lgan obyektda akkumulyator almashtirish yoki zaryadlash o'sha tashrifga qo'shiladi.</p>" +
    "<h4>Panelsiz variant</h4><p>Ikkita 50 A·soatlik blok rotatsiya bilan ishlatiladi: biri obyektda, ikkinchisi filialda zaryadlanadi. Har tashrifda ular almashtiriladi. Blok og'irligi 6,5 kg — bir kishi ko'taradi, avtomobil yukxonasida olib yuriladi.</p>" +
    "<h4>Panelli variant</h4><p>50 Vt panel va MPPT kontroller smetaga 2,4 mln so'm qo'shadi, lekin besh yillik davrda taxminan oltmishta blok almashtirishni bekor qiladi. Bir tashrifning tan narxi 180–350 ming so'm bo'lganda panel to'rtinchi oyda o'zini oqlaydi.</p>" +
    "<p class='ogoh'>Panel obyektda ko'rinadigan joyga o'rnatilsa, u o'g'irlanadigan buyumga aylanadi. Shu sababli panel tomga, chetdan ko'rinmaydigan qiyalikka qo'yiladi va kronshteyni antivandal murvat bilan mahkamlanadi.</p>",
  ru: { yorliq: "Для сервиса", sarlavha: "Месяц: что означает эта цифра",
    tana: "<p>Автономия в 27 дней освобождает объект от выездов вне графика осмотров. Там, где осмотр раз в месяц, замена или подзарядка аккумулятора совмещается с этим же выездом.</p>" +
      "<h4>Вариант без панели</h4><p>Два блока по 50 А·ч работают в ротации: один на объекте, второй заряжается в филиале. На каждом выезде их меняют местами. Вес блока 6,5 кг — поднимает один человек, возится в багажнике.</p>" +
      "<h4>Вариант с панелью</h4><p>Панель 50 Вт и контроллер MPPT добавляют к смете 2,4 млн сум, но за пять лет отменяют около шестидесяти замен блока. При себестоимости выезда 180–350 тыс. сум панель окупается на четвёртый месяц.</p>" +
      "<p class='ogoh'>Панель, установленная на виду, превращается в предмет для кражи. Поэтому её ставят на крышу, на скат, не просматриваемый со стороны, а кронштейн крепят антивандальным крепежом.</p>" }
},

"y05.q-ogoh": {
  yorliq: "Montajchi uchun", sarlavha: "−10 °C: harorat chegarasi qayerda buziladi",
  tana: "<p>Hub ham, datchiklar ham −10…+40 °C ga sertifikatlangan. O'zbekistonda isitilmaydigan ombor yanvarda −12…−15 °C gacha soviydi, ya'ni chegaradan chiqadi.</p>" +
    "<table><tr><th>Harorat</th><th>Nima bo'ladi</th></tr>" +
    "<tr><td>−5 °C</td><td>batareya sig'imi 15% ga tushadi, tiklanadi</td></tr>" +
    "<tr><td>−10 °C</td><td>hub batareyani «past» deb belgilaydi</td></tr>" +
    "<tr><td>−15 °C</td><td>datchik so'rovga javob bermay qolishi mumkin</td></tr></table>" +
    "<p>Yechim: hub isitiladigan yoki hech bo'lmaganda sovutilmaydigan ichki xonaga qo'yiladi — qorovulxona, texnik xona, yerto'la. Bunday xonada harorat tashqaridan 6–10 gradus yuqori turadi.</p>" +
    "<p class='ogoh'>Agar obyektda bunday xona bo'lmasa, bu yechim shu obyekt uchun to'g'ri tanlov emas. Isitilmaydigan katta ombor Yechim 04 yoki Yechim 02 bilan yopiladi. Bu qaror loyihalash bosqichida qabul qilinadi: qurilma olingandan keyin uni qaytarish mumkin emas.</p>",
  ru: { yorliq: "Для монтажника", sarlavha: "−10 °C: где ломается температурный предел",
    tana: "<p>И хаб, и датчики сертифицированы на −10…+40 °C. Неотапливаемый склад в Узбекистане в январе остывает до −12…−15 °C, то есть выходит за предел.</p>" +
      "<table><tr><th>Температура</th><th>Что происходит</th></tr>" +
      "<tr><td>−5 °C</td><td>ёмкость батареи падает на 15%, потом восстанавливается</td></tr>" +
      "<tr><td>−10 °C</td><td>хаб помечает батарею как разряженную</td></tr>" +
      "<tr><td>−15 °C</td><td>датчик может перестать отвечать на опрос</td></tr></table>" +
      "<p>Решение: хаб ставят в отапливаемое или хотя бы не выстывающее внутреннее помещение — сторожку, техническое помещение, подвал. Там держится на 6–10 градусов теплее, чем снаружи.</p>" +
      "<p class='ogoh'>Если такого помещения на объекте нет, это решение для него неверное. Неотапливаемый крупный склад закрывают Решением 04 или Решением 02. Такое решение принимают на стадии проекта: после закупки оборудование уже не вернуть.</p>" }
},

/* ============================ protokol ============================ */

"y05.p-dc09": {
  yorliq: "Arxitektor uchun", sarlavha: "SIA DC-09: nega bulut kerak emas",
  tana: "<p>Ajax hubi zavoddan ishlab chiqaruvchining buluti bilan ishlaydi. Bank uchun bu qabul qilinmaydi: hodisa ma'lumoti chet eldagi serverdan o'tadi va aloqa uzilsa obyekt butunlay sukut saqlaydi.</p>" +
    "<p>DC-09 — markazlashtirilgan kuzatuv pultlari uchun sanoat standarti. Hub uni bulutdan mustaqil qo'llaydi: sozlamada pult manzili sifatida bankning ichki adapteri ko'rsatiladi.</p>" +
    "<h4>Nima kiritiladi</h4><ul><li>Adapter manzili va porti (VPN yoki korporativ APN ichida)</li><li>Hisob raqami — obyektning platformadagi identifikatori</li><li>AES-128 shifrlash kaliti</li><li>Davriy test xabarining oralig'i: 180 soniya</li></ul>" +
    "<h4>Tasdiq</h4><p>Adapter har xabarga ACK qaytaradi. Tasdiq kelmasa hub xabarni qayta yuboradi, uch urinishdan keyin ikkinchi kanalga (zaxira SIM yoki Ethernet) o'tadi.</p>" +
    "<p class='ogoh'>Bulut butunlay o'chirilmaydi: mobil ilova orqali sozlash uchun u kerak. Lekin hodisa yo'li bulutdan mustaqil bo'ladi — adapter pult o'rnida turadi va xabar to'g'ridan-to'g'ri bankka keladi.</p>",
  ru: { yorliq: "Для архитектора", sarlavha: "SIA DC-09: почему облако не нужно",
    tana: "<p>С завода хаб Ajax работает с облаком производителя. Банку это не подходит: данные о событии проходят через сервер за рубежом, а при обрыве связи объект замолкает полностью.</p>" +
      "<p>DC-09 — промышленный стандарт для пультов централизованного наблюдения. Хаб поддерживает его независимо от облака: в настройках в качестве адреса пульта указывают внутренний адаптер банка.</p>" +
      "<h4>Что вводится</h4><ul><li>Адрес и порт адаптера (внутри VPN или корпоративного APN)</li><li>Номер учётной записи — идентификатор объекта в платформе</li><li>Ключ шифрования AES-128</li><li>Интервал периодического теста: 180 секунд</li></ul>" +
      "<h4>Подтверждение</h4><p>Адаптер отвечает ACK на каждое сообщение. Если подтверждение не пришло, хаб повторяет отправку, после трёх попыток переходит на второй канал (резервная SIM или Ethernet).</p>" +
      "<p class='ogoh'>Облако не отключают совсем: оно нужно для настройки через мобильное приложение. Но путь события от облака не зависит — адаптер стоит на месте пульта, и сообщение приходит в банк напрямую.</p>" }
},

"y05.p-yt": {
  yorliq: "Servis uchun", sarlavha: "YT kodi: past batareya vazifaga aylanadi",
  tana: "<p>YT — SIA standartidagi «batareya quvvati past» kodi. Hub uni datchik zaryadi 15% dan pastga tushganda yuboradi.</p>" +
    "<h4>Platforma nima qiladi</h4><ol><li>Hodisa kartasi ochiladi: qaysi obyekt, qaysi datchik, qaysi zona.</li><li>Servis vazifasi tuziladi va navbatdagi rejali ko'rikka biriktiriladi.</li><li>Agar ko'rikgacha o'ttiz kundan ko'p qolgan bo'lsa — alohida tashrif rejalashtiriladi.</li><li>Almashtirilgan sana qurilma kartasiga yoziladi va keyingi muddat shundan hisoblanadi.</li></ol>" +
    "<p>15% — bu o'rtacha 3–5 hafta zaxira. Shu vaqt ichida servis obyektga borishi mumkin: shoshilinch chiqish talab qilinmaydi.</p>" +
    "<p class='ogoh'>CR123A elementlari filialda zaxirada saqlanadi, lekin cheklangan miqdorda: litiy elementning javondagi muddati o'n yil bo'lsa ham, uch yildan ortiq turgan element sig'imining chorak qismini yo'qotadi. Bir obyektlik to'plam — beshta element, filial zaxirasi — o'nta, ko'proq emas.</p>",
  ru: { yorliq: "Для сервиса", sarlavha: "Код YT: разряд батареи становится задачей",
    tana: "<p>YT — код стандарта SIA «низкий заряд батареи». Хаб отправляет его, когда заряд датчика падает ниже 15%.</p>" +
      "<h4>Что делает платформа</h4><ol><li>Открывается карточка события: какой объект, какой датчик, какая зона.</li><li>Создаётся сервисная задача и привязывается к ближайшему плановому осмотру.</li><li>Если до осмотра больше тридцати дней — планируется отдельный выезд.</li><li>Дата замены записывается в карточку устройства, следующий срок считается от неё.</li></ol>" +
      "<p>15% — это в среднем 3–5 недель запаса. За это время сервис успевает приехать: срочный выезд не требуется.</p>" +
      "<p class='ogoh'>Элементы CR123A держат в филиале на складе, но в ограниченном количестве: даже при десятилетнем сроке хранения элемент, пролежавший больше трёх лет, теряет четверть ёмкости. Комплект на объект — пять элементов, запас филиала — десять, не больше.</p>" }
},

"y05.p-video": {
  yorliq: "Arxitektor uchun", sarlavha: "Video tasdiqning ikki yo'li",
  tana: "<p>DC-09 faqat hodisa kodini beradi. Tasvir ikki yo'ldan biri bilan keladi va ular narxi hamda energiyasi bilan keskin farqlanadi.</p>" +
    "<table><tr><th>Yo'l</th><th>Doimiy quvvat</th><th>Nima beradi</th><th>Kechikish</th></tr>" +
    "<tr><td>MotionCam surati</td><td>kerak emas</td><td>3–5 surat, 320 × 240</td><td class='n'>7–20 s</td></tr>" +
    "<tr><td>RTSP kamera klipi</td><td>5–7 Vt</td><td>15 s video, 1080p</td><td class='n'>3–6 s</td></tr></table>" +
    "<p>Birinchi yo'l butun yechimning quvvat hisobini saqlab qoladi. Ikkinchisi sifatli dalil beradi, lekin obyektni Yechim 04 ning quvvat qismiga o'tkazadi.</p>" +
    "<h4>Amaliy tanlov</h4><p>Obyektning asosiy kirishiga bitta RTSP kamera qo'yiladi va u alohida quvvat manbaidan oziqlanadi. Qolgan zonalar MotionCam bilan yopiladi. Shunda dalil bitta — eng muhim — nuqtada bo'ladi, quvvat hisobi esa buzilmaydi.</p>" +
    "<p class='ogoh'>Adapter kamera oqimini faqat hodisa kelganda ochadi. Doimiy yozuv bu yerda ma'nosiz: obyektda odam yo'q, oqim esa trafik va energiya sarflaydi.</p>",
  ru: { yorliq: "Для архитектора", sarlavha: "Два пути видеоподтверждения",
    tana: "<p>DC-09 передаёт только код события. Изображение приходит одним из двух путей, и они резко различаются по цене и энергии.</p>" +
      "<table><tr><th>Путь</th><th>Постоянное питание</th><th>Что даёт</th><th>Задержка</th></tr>" +
      "<tr><td>Снимок MotionCam</td><td>не нужно</td><td>3–5 кадров, 320 × 240</td><td class='n'>7–20 с</td></tr>" +
      "<tr><td>Клип с RTSP-камеры</td><td>5–7 Вт</td><td>15 с видео, 1080p</td><td class='n'>3–6 с</td></tr></table>" +
      "<p>Первый путь сохраняет весь энергетический расчёт решения. Второй даёт качественное доказательство, но переводит объект на силовую часть Решения 04.</p>" +
      "<h4>Практический выбор</h4><p>На главный вход ставят одну RTSP-камеру и питают её не от шины 12 В, а от отдельного источника. Остальные зоны закрывают MotionCam. Тогда доказательство есть в одной — самой важной — точке, а расчёт питания не ломается.</p>" +
      "<p class='ogoh'>Адаптер открывает поток камеры только при событии. Постоянная запись здесь бессмысленна: на объекте никого нет, а поток тратит трафик и энергию.</p>" }
},

/* ============================ ko'rik kuni ============================ */

"y05.o-ariza": {
  yorliq: "Operator uchun", sarlavha: "Ariza: qo'riqni olish tugmasi qayerdan paydo bo'ladi",
  tana: "<p>Qo'riqni olish — obyektni himoyasiz qoldiradigan amal, shuning uchun u hech qachon «shunchaki tugma» bo'lmaydi. Tugma faqat tasdiqlangan ariza mavjud bo'lganda ko'rinadi.</p>" +
    "<h4>Arizada nima bo'ladi</h4><ul><li>Obyekt va uning balans raqami</li><li>Kim keladi: xodim yoki tashqi shaxs, hujjat raqami bilan</li><li>Vaqt oralig'i: boshlanish va tugash soati</li><li>Maqsad: ko'rik, baholash, xaridorga ko'rsatish, ta'mir</li><li>Tasdiqlagan rahbar</li></ul>" +
    "<p>Vaqt oralig'i tugagandan keyin tugma yana yo'qoladi. Kechikkan tashrif uchun ariza uzaytiriladi va bu ham jurnalga tushadi.</p>" +
    "<p class='ogoh'>Ariza tizimisiz qo'riqni olish huquqi hammada bo'ladi va hodisa bo'lganda kim javobgarligini aniqlash mumkin emas. Bu texnik emas, tashkiliy nazorat — lekin aynan u sug'urta hodisasida bankning pozitsiyasini belgilaydi.</p>",
  ru: { yorliq: "Для оператора", sarlavha: "Заявка: откуда берётся кнопка снятия с охраны",
    tana: "<p>Снятие с охраны оставляет объект без защиты, поэтому это никогда не «просто кнопка». Кнопка появляется только при наличии подтверждённой заявки.</p>" +
      "<h4>Что в заявке</h4><ul><li>Объект и его балансовый номер</li><li>Кто приедет: сотрудник или внешнее лицо, с номером документа</li><li>Временной интервал: час начала и час окончания</li><li>Цель: осмотр, оценка, показ покупателю, ремонт</li><li>Руководитель, утвердивший заявку</li></ul>" +
      "<p>По истечении интервала кнопка снова исчезает. Для задержавшегося визита заявку продлевают, и это тоже попадает в журнал.</p>" +
      "<p class='ogoh'>Без системы заявок право снять охрану есть у всех, и при событии установить ответственного невозможно. Это контроль не технический, а организационный — но именно он определяет позицию банка при страховом случае.</p>" }
},

"y05.o-olish": {
  yorliq: "Operator uchun", sarlavha: "Qo'riq olindi: shu lahzada nima yoziladi",
  tana: "<p>Qo'riqni olish buyrug'i bir vaqtning o'zida to'rtta yozuvni hosil qiladi.</p>" +
    "<table><tr><th>Qayerda</th><th>Nima yoziladi</th></tr>" +
    "<tr><td>Hub jurnali</td><td>buyruq vaqti, kanal, foydalanuvchi</td></tr>" +
    "<tr><td>Obyekt kartasi</td><td>holat «qo'riqsiz», ariza raqami bilan</td></tr>" +
    "<tr><td>Amallar tarixi</td><td>kim, qachon, qaysi ariza bo'yicha</td></tr>" +
    "<tr><td>Eshik relesi</td><td>ochilish buyrug'i, agar rele o'rnatilgan bo'lsa</td></tr></table>" +
    "<p>Bu to'rttasi bir tranzaksiyada bajariladi: relening ochilishi jurnalga yozilmasdan sodir bo'lmaydi.</p>" +
    "<h4>MotionCam kirishni suratga oladi</h4><p>Qo'riq olingandan keyin ham MotionCam ishlashda qoladi va kirishni suratga oladi, lekin signal bermaydi. Surat hodisa kartasiga «tashrif» sifatida biriktiriladi. Keyinchalik obyektda kim bo'lganini isbotlash kerak bo'lsa, bu eng ishonchli dalil.</p>" +
    "<p class='ogoh'>Surat olish rejimi hub sozlamasida alohida yoqiladi. Zavod holatida qo'riq olinganda datchiklar butunlay o'chadi va tashrif hech qanday iz qoldirmaydi.</p>",
  ru: { yorliq: "Для оператора", sarlavha: "Охрана снята: что записывается в этот момент",
    tana: "<p>Команда снятия с охраны порождает одновременно четыре записи.</p>" +
      "<table><tr><th>Где</th><th>Что записывается</th></tr>" +
      "<tr><td>Журнал хаба</td><td>время команды, канал, пользователь</td></tr>" +
      "<tr><td>Карточка объекта</td><td>статус «без охраны», с номером заявки</td></tr>" +
      "<tr><td>История действий</td><td>кто, когда, по какой заявке</td></tr>" +
      "<tr><td>Дверное реле</td><td>команда открытия, если реле установлено</td></tr></table>" +
      "<p>Все четыре выполняются одной транзакцией: реле не откроется, пока запись не легла в журнал.</p>" +
      "<h4>MotionCam снимает вход</h4><p>После снятия с охраны MotionCam продолжает работать и снимает вход, но не даёт сигнала тревоги. Снимок прикрепляется к карточке как «визит». Если позже нужно доказать, кто был на объекте, это самое надёжное свидетельство.</p>" +
      "<p class='ogoh'>Режим съёмки включается в настройках хаба отдельно. По умолчанию при снятии с охраны датчики отключаются полностью и визит не оставляет следа.</p>" }
},

"y05.o-qaytarish": {
  yorliq: "Xatar uchun", sarlavha: "Qo'riqni qaytarish: eng ko'p unutiladigan amal",
  tana: "<p>Ko'rik tugagach qo'riqni qayta yoqish unutiladi — bu texnik nosozlik emas, lekin oqibati eng og'iri: datchiklar ishlaydi, hodisa esa qayd etilmaydi va obyekt kunlab himoyasiz turadi.</p>" +
    "<h4>Uch bosqichli eslatma</h4><table><tr><th>Vaqt</th><th>Nima bo'ladi</th></tr>" +
    "<tr><td>Ariza muddati + 30 daqiqa</td><td>ko'rikni o'tkazgan xodimga bildirishnoma</td></tr>" +
    "<tr><td>+ 2 soat</td><td>obyekt mas'uliga vazifa ochiladi</td></tr>" +
    "<tr><td>+ 12 soat</td><td>filial rahbariga xatar hodisasi, nazorat indeksi tushadi</td></tr></table>" +
    "<p>Uchinchi bosqich ataylab og'ir: qo'riqsiz qolgan obyekt hisobotda ko'rinadi va bu raqam filial bo'yicha yig'iladi.</p>" +
    "<p class='ogoh'>Avtomatik qayta yoqish qo'yilmaydi. Obyektda odam qolgan bo'lsa, avtomatik yoqilgan qo'riq darhol yolg'on signal beradi va operator ikki hafta ichida barcha signallarga ishonchini yo'qotadi. Qo'riqni odam yoqadi, tizim esa unutilganini eslatadi — bu taqsimot ataylab shunday.</p>",
  ru: { yorliq: "Для риска", sarlavha: "Постановка на охрану: самое забываемое действие",
    tana: "<p>После осмотра охрану забывают включить обратно — это не техническая неисправность, но последствия самые тяжёлые: датчики работают, событие не фиксируется, объект сутками стоит без защиты.</p>" +
      "<h4>Трёхступенчатое напоминание</h4><table><tr><th>Время</th><th>Что происходит</th></tr>" +
      "<tr><td>Срок заявки + 30 минут</td><td>уведомление проводившему осмотр</td></tr>" +
      "<tr><td>+ 2 часа</td><td>задача ответственному за объект</td></tr>" +
      "<tr><td>+ 12 часов</td><td>риск-событие руководителю филиала, индекс контроля снижается</td></tr></table>" +
      "<p>Третья ступень тяжёлая намеренно: объект без охраны виден в отчёте, и эта цифра суммируется по филиалу.</p>" +
      "<p class='ogoh'>Автоматическую постановку не делают. Если на объекте остался человек, автоматически включённая охрана сразу даст ложную тревогу, и за две недели оператор перестанет доверять сигналам вообще. Охрану ставит человек, а система напоминает о забытом — такое разделение сделано намеренно.</p>" }
},

/* ============================ huquq ============================ */

"y05.h-yongin": {
  yorliq: "Yurist uchun", sarlavha: "Yong'in signalizatsiyasi: talab nimaga bog'liq",
  tana: "<p>Yong'in xavfsizligi qoidalarining 30-bandi obyektlarni 9-ilovaga muvofiq avtomatik yong'in signalizatsiyasi bilan jihozlashni talab qiladi. 9-ilova bino va xonalar turlarini sanaydi.</p>" +
    "<p>Talab obyektning <b>turiga</b> bog'liq, uning ishlatilishiga yoki elektr bor-yo'qligiga emas. Bo'sh turgan, elektri uzilgan bino ham ro'yxatga kirsa, talab saqlanadi.</p>" +
    "<h4>Bank balansidagi obyektlar uchun amaliy xulosa</h4><ul><li>Ma'muriy bino, savdo maydoni, ombor — odatda ro'yxatda</li><li>Yordamchi qurilma, garaj, temir konteyner — odatda emas</li><li>Yer uchastkasi — talab yo'q</li></ul>" +
    "<p class='ogoh'>Har bir obyekt bo'yicha aniq javobni loyiha tashkiloti beradi. Bank balansidagi 267 obyekt uchun bu ish bir marta bajariladi va natija obyekt kartasiga yoziladi: «talab bor / talab yo'q / kelishilgan». Shundan keyin har sotib olish yoki qabul qilishda bu maydon to'ldiriladi.</p>",
  ru: { yorliq: "Для юриста", sarlavha: "Пожарная сигнализация: от чего зависит требование",
    tana: "<p>Пункт 30 правил пожарной безопасности требует оснащать объекты автоматической пожарной сигнализацией в соответствии с приложением 9. Приложение 9 перечисляет типы зданий и помещений.</p>" +
      "<p>Требование зависит от <b>типа</b> объекта, а не от того, используется он или есть ли электричество. Пустующее здание с отключённым электричеством, попавшее в перечень, требование сохраняет.</p>" +
      "<h4>Практический вывод для объектов на балансе банка</h4><ul><li>Административное здание, торговая площадь, склад — как правило, в перечне</li><li>Вспомогательное строение, гараж, металлический контейнер — как правило, нет</li><li>Земельный участок — требования нет</li></ul>" +
      "<p class='ogoh'>Точный ответ по каждому объекту даёт проектная организация. Для 267 объектов на балансе эта работа выполняется один раз, результат заносится в карточку объекта: «требуется / не требуется / согласовано». Дальше это поле заполняется при каждой покупке или приёмке.</p>" }
},

"y05.h-qoriq": {
  yorliq: "Yurist uchun", sarlavha: "Javob choralari: chegara qayerda",
  tana: "<p>Qo'riqlash faoliyati to'g'risidagi qonunga ko'ra shartnoma asosida qo'riqlash xizmatini faqat davlat organlari ko'rsatadi. Bu bankning imkoniyatlarini aniq ikkiga bo'ladi.</p>" +
    "<table><tr><th>Bank o'zi qila oladi</th><th>Faqat davlat organi</th></tr>" +
    "<tr><td>O'z mulkini texnik vositalar bilan kuzatish</td><td>Hodisaga chiqish va kuch ishlatish</td></tr>" +
    "<tr><td>Hodisani qayd etish va hujjatlashtirish</td><td>Shaxsni ushlab turish</td></tr>" +
    "<tr><td>Xodimini obyektga yuborish</td><td>Shartnoma asosida qo'riqlash xizmati</td></tr></table>" +
    "<p>Ya'ni platforma hodisani ko'radi, qayd etadi va javob choralarini boshlaydi — lekin javobning o'zi yo shartnoma tuzilgan davlat qo'riqlash xizmati, yo bankning o'z xodimi tomonidan bajariladi.</p>" +
    "<p class='ogoh'>Bu chegara texnik loyihaga ta'sir qiladi: hodisa kartasida «kimga yuborildi» maydoni majburiy bo'ladi va u ikki qiymatdan birini oladi. Shartnoma raqami kartaga bog'lanadi, shunda hodisa bo'yicha javob vaqti shartnoma shartlari bilan solishtiriladi.</p>",
  ru: { yorliq: "Для юриста", sarlavha: "Реагирование: где проходит граница",
    tana: "<p>По закону об охранной деятельности услуги охраны по договору оказывают только государственные органы. Это чётко делит возможности банка надвое.</p>" +
      "<table><tr><th>Банк может сам</th><th>Только государственный орган</th></tr>" +
      "<tr><td>Наблюдать за своим имуществом техническими средствами</td><td>Выезд на событие и применение силы</td></tr>" +
      "<tr><td>Фиксировать и документировать событие</td><td>Задержание лица</td></tr>" +
      "<tr><td>Направить на объект своего сотрудника</td><td>Охранная услуга по договору</td></tr></table>" +
      "<p>То есть платформа видит событие, фиксирует его и запускает реакцию — но саму реакцию выполняет либо государственная охрана по договору, либо собственный сотрудник банка.</p>" +
      "<p class='ogoh'>Эта граница влияет на технический проект: в карточке события поле «кому направлено» становится обязательным и принимает одно из двух значений. Номер договора привязывается к карточке, и тогда время реакции по событию сверяется с условиями договора.</p>" }
},

"y05.h-tasdiq": {
  yorliq: "Yurist uchun", sarlavha: "Kelishuvsiz obyekt «himoyalangan» hisoblanmaydi",
  tana: "<p>Batareyali avtonom datchik yong'in signalizatsiyasi talabini yopishi qoidalarda bevosita yozilmagan. Bu masala IIV yong'in xavfsizligi organi bilan alohida kelishiladi.</p>" +
    "<h4>Kelishuv nima beradi</h4><p>Kelishuv xati obyekt kartasiga biriktiriladi va shundan keyin obyekt hisobotda «himoyalangan» deb belgilanadi. Kelishuvsiz obyekt texnik jihatdan himoyalangan bo'lsa ham, hujjatda himoyalanmagan bo'lib qoladi — va tekshiruvda ham, sug'urta hodisasida ham aynan hujjat qaraladi.</p>" +
    "<h4>Nima taqdim etiladi</h4><ul><li>O'rnatilgan qurilmalarning ro'yxati va sertifikatlari</li><li>Datchiklar joylashuvi chizmasi</li><li>Hodisa yo'li tavsifi: signal kimga, qancha vaqtda yetadi</li><li>Aloqa uzilganda nima bo'lishining tavsifi</li></ul>" +
    "<p class='ogoh'>Oxirgi band eng ko'p savol tug'diradi. Javob aniq bo'lishi kerak: hub 4G ni yo'qotsa, ichki akkumulyator 15 soat ushlab turadi, davriy test xabari kelmasa platforma «aloqa yo'q» hodisasini ochadi va obyekt mas'uliga vazifa yuboradi. Bu tavsif kelishuv paketining majburiy qismi.</p>",
  ru: { yorliq: "Для юриста", sarlavha: "Без согласования объект не считается защищённым",
    tana: "<p>Возможность закрыть требование пожарной сигнализации автономным извещателем на батарее в правилах прямо не записана. Этот вопрос согласуется с органом пожарного надзора МВД отдельно.</p>" +
      "<h4>Что даёт согласование</h4><p>Письмо о согласовании прикрепляется к карточке объекта, и после этого объект отмечается в отчёте как «защищённый». Без согласования объект, технически защищённый, в документах остаётся незащищённым — а и при проверке, и при страховом случае смотрят именно документ.</p>" +
      "<h4>Что представляется</h4><ul><li>Перечень установленных устройств и их сертификаты</li><li>Схема размещения датчиков</li><li>Описание пути события: кому и за какое время приходит сигнал</li><li>Описание того, что происходит при обрыве связи</li></ul>" +
      "<p class='ogoh'>Последний пункт вызывает больше всего вопросов. Ответ должен быть точным: при потере 4G внутренний аккумулятор держит 15 часов, при непоступлении периодического теста платформа открывает событие «нет связи» и ставит задачу ответственному за объект. Это описание — обязательная часть пакета согласования.</p>" }
},

/* ============================ montaj ============================ */

"y05.m-hub": {
  yorliq: "Montajchi uchun", sarlavha: "Birinchi qadam: hub joyi va DC moduli",
  tana: "<p>Hub joyi tanlanmaguncha boshqa hech narsa o'rnatilmaydi — qolgan hamma masofa shu nuqtadan o'lchanadi.</p>" +
    "<h4>Tartib</h4><ol><li>Obyekt bo'ylab yurib, geometrik markazga yaqin ichki xona tanlanadi.</li><li>Shu nuqtada hub diagnostikasi bilan 4G signali o'lchanadi: RSRP −100 dBm dan yuqori bo'lishi kerak.</li><li>Korpus ochiladi, standart ta'minot platasi 12–24 V DC moduliga almashtiriladi.</li><li>Hub devorga mahkamlanadi, tamper kontakti devorga tegishi tekshiriladi.</li><li>SIM kartalar solinadi, korporativ APN parametrlari kiritiladi.</li><li>DC-09 sozlamasi kiritiladi va adapterga sinov xabari yuboriladi.</li></ol>" +
    "<p>Bu bosqich taxminan 50 daqiqa oladi va uni datchiklarni o'rnatishdan oldin tugatish kerak: har datchik hub bilan bog'lanish jarayonida ro'yxatdan o'tadi.</p>" +
    "<p class='ogoh'>DC moduli alohida buyurtma qilinadi va u komplektda kelmaydi. Uni oldindan olib kelmaslik — montaj kunini bekor qiladigan eng keng tarqalgan xato. Brigadaning tekshiruv ro'yxatida bu birinchi qator bo'lishi kerak.</p>",
  ru: { yorliq: "Для монтажника", sarlavha: "Первый шаг: место хаба и модуль DC",
    tana: "<p>Пока не выбрано место хаба, не ставят ничего: все остальные расстояния отмеряются от этой точки.</p>" +
      "<h4>Порядок</h4><ol><li>Проходят объект и выбирают внутреннее помещение ближе к геометрическому центру.</li><li>В этой точке диагностикой хаба замеряют сигнал 4G: RSRP должен быть выше −100 дБм.</li><li>Вскрывают корпус, меняют штатную плату питания на модуль 12–24 В DC.</li><li>Крепят хаб к стене, проверяют прилегание контакта тампера.</li><li>Ставят SIM-карты, вводят параметры корпоративного APN.</li><li>Вводят настройки DC-09 и отправляют адаптеру тестовое сообщение.</li></ol>" +
      "<p>Этот этап занимает около 50 минут, и завершить его нужно до установки датчиков: каждый датчик регистрируется в процессе привязки к хабу.</p>" +
      "<p class='ogoh'>Модуль DC заказывается отдельно и в комплект не входит. Не привезти его — самая частая ошибка, отменяющая день монтажа. В чек-листе бригады это должна быть первая строка.</p>" }
},

"y05.m-signal": {
  yorliq: "Montajchi uchun", sarlavha: "Ikki tayoqchadan past joy qabul qilinmaydi",
  tana: "<p>Har datchik o'rnatilgandan keyin hub ilovasida signal darajasi o'qiladi va dalolatnomaga yoziladi. Qoida qat'iy: 2/3 dan past daraja qabul qilinmaydi.</p>" +
    "<h4>Nega aynan shu chegara</h4><p>1/3 darajadagi datchik quruq kunda ishlaydi. Devor namlanganda yo'qotish 3–6 dB ga ortadi va u so'rovga javob bermay qoladi. Natija — platformada «qurilma yo'qoldi» hodisasi va servis tashrifi, garchi hech narsa buzilmagan bo'lsa ham. Bir yilda bunday soxta tashriflar qurilmaning o'z narxidan qimmatga tushadi.</p>" +
    "<h4>Nima qilinadi</h4><ul><li>Datchik 20–40 sm siljitiladi va qayta o'lchanadi</li><li>Metall yuzadan prokladka bilan uzoqlashtiriladi</li><li>Yordam bermasa — ReX qo'yiladi</li></ul>" +
    "<p class='ogoh'>O'lchov datchik mahkamlangan holda bajariladi. Inson tanasi 868 MGs to'lqinni yutadi va qo'lda o'lchash bir tayoqcha past natija beradi — bu esa keraksiz ReX xaridiga olib keladi.</p>",
  ru: { yorliq: "Для монтажника", sarlavha: "Место слабее двух делений не принимается",
    tana: "<p>После установки каждого датчика уровень сигнала считывают в приложении хаба и заносят в акт. Правило жёсткое: ниже 2/3 место не принимается.</p>" +
      "<h4>Почему именно этот порог</h4><p>Датчик с уровнем 1/3 работает в сухой день. При намокании стены потери растут на 3–6 дБ, и он перестаёт отвечать на опрос. Результат — событие «устройство пропало» и сервисный выезд, хотя ничего не сломалось. За год такие ложные выезды обходятся дороже самого устройства.</p>" +
      "<h4>Что делают</h4><ul><li>Сдвигают датчик на 20–40 см и замеряют снова</li><li>Отодвигают от металла через прокладку</li><li>Если не помогло — ставят ReX</li></ul>" +
      "<p class='ogoh'>Замер делают на закреплённом датчике. Тело человека поглощает волну 868 МГц, и замер с рук занижает результат на одно деление — а это ведёт к покупке ненужного ReX.</p>" }
},

/* ============================ narx ============================ */

"y05.n-hub": {
  yorliq: "Moliya uchun", sarlavha: "Hub narxidagi 3,3 dan 5,5 gacha farq",
  tana: "<p>Ikki barobardan ortiq farq uchta narsadan chiqadi.</p>" +
    "<table><tr><th>Omil</th><th>Narxga ta'siri</th></tr>" +
    "<tr><td>Hub 2 (4G) o'rniga Hub 2 Plus</td><td class='n'>+1,4 mln</td></tr>" +
    "<tr><td>Rasmiy distribyutor o'rniga kulrang import</td><td class='n'>−0,8 mln</td></tr>" +
    "<tr><td>Kafolat muddati: 1 yil o'rniga 2 yil</td><td class='n'>+0,3 mln</td></tr></table>" +
    "<p>Hub 2 Plus 200 ta qurilma va Wi-Fi zaxira kanalini beradi. Bank obyektida qurilmalar soni yigirmadan oshmaydi, Wi-Fi esa yo'q — shuning uchun qo'shimcha to'lovning asosi yo'q.</p>" +
    "<p class='ogoh'>Kulrang import bu yerda tejamkorlik emas. Rasmiy distribyutordan olinmagan qurilmaning seriya raqami ishlab chiqaruvchining tizimida ro'yxatdan o'tmasligi mumkin, bu esa proshivka yangilanishini ham, kafolat xizmatini ham to'sadi. Bank tenderida rasmiy distribyutor sertifikati majburiy shart bo'lishi kerak.</p>",
  ru: { yorliq: "Для финансов", sarlavha: "Разница от 3,3 до 5,5 в цене хаба",
    tana: "<p>Более чем двукратная разница складывается из трёх вещей.</p>" +
      "<table><tr><th>Фактор</th><th>Влияние на цену</th></tr>" +
      "<tr><td>Hub 2 Plus вместо Hub 2 (4G)</td><td class='n'>+1,4 млн</td></tr>" +
      "<tr><td>Серый импорт вместо официального дистрибьютора</td><td class='n'>−0,8 млн</td></tr>" +
      "<tr><td>Гарантия 2 года вместо 1 года</td><td class='n'>+0,3 млн</td></tr></table>" +
      "<p>Hub 2 Plus даёт 200 устройств и резервный канал Wi-Fi. На объекте банка устройств не больше двадцати, Wi-Fi нет — оснований для доплаты не возникает.</p>" +
      "<p class='ogoh'>Серый импорт здесь не экономия. Серийный номер устройства, купленного не у официального дистрибьютора, может не пройти регистрацию в системе производителя, а это закрывает и обновление прошивки, и гарантийное обслуживание. В тендере банка сертификат официального дистрибьютора должен быть обязательным условием.</p>" }
},

/* ============================ nosozliklar ============================ */

"y05.x-hub": {
  yorliq: "Xatar uchun", sarlavha: "Hub — yagona nuqta: nima bilan yopiladi",
  tana: "<p>Butun obyekt bitta qurilmaga bog'langan. Hub 4G ni yo'qotsa yoki quvvatsiz qolsa, obyekt xabar berishdan to'xtaydi — va tashqaridan bu «hammasi tinch» ko'rinadi.</p>" +
    "<h4>Uch qatlamli himoya</h4><table><tr><th>Qatlam</th><th>Nimani yopadi</th><th>Qancha vaqt</th></tr>" +
    "<tr><td>Ikkinchi SIM, boshqa operator</td><td>bitta operatorning uzilishi</td><td class='n'>darhol</td></tr>" +
    "<tr><td>Ichki akkumulyator</td><td>12 V shinaning uzilishi</td><td class='n'>15 soat</td></tr>" +
    "<tr><td>Davriy test xabari, 180 s</td><td>sukut qolganini aniqlash</td><td class='n'>9 daqiqa</td></tr></table>" +
    "<p>Uchinchi qatlam eng muhimi: hub o'zi gapira olmasa ham, uning <b>jim qolgani</b> hodisa bo'ladi. Uchta test xabari kelmasa platforma «aloqa yo'q» hodisasini ochadi.</p>" +
    "<p class='ogoh'>Ikkita SIM bitta operatordan olinmaydi. Bu eng ko'p uchraydigan xato: bitta operatorning bazaviy stansiyasi ishlamay qolsa, ikkala SIM ham bir vaqtda o'ladi va zaxira kanal degan narsa qog'ozda qoladi. Xarid shartida ikki operator talabi yoziladi.</p>",
  ru: { yorliq: "Для риска", sarlavha: "Хаб — единая точка: чем она закрывается",
    tana: "<p>Весь объект держится на одном устройстве. Если хаб теряет 4G или остаётся без питания, объект перестаёт сообщать — и снаружи это выглядит как «всё спокойно».</p>" +
      "<h4>Три слоя защиты</h4><table><tr><th>Слой</th><th>Что закрывает</th><th>Сколько держит</th></tr>" +
      "<tr><td>Вторая SIM другого оператора</td><td>сбой одного оператора</td><td class='n'>сразу</td></tr>" +
      "<tr><td>Внутренний аккумулятор</td><td>обрыв шины 12 В</td><td class='n'>15 часов</td></tr>" +
      "<tr><td>Периодический тест, 180 с</td><td>обнаружение молчания</td><td class='n'>9 минут</td></tr></table>" +
      "<p>Третий слой важнее всех: даже если хаб не может сказать ничего, само его <b>молчание</b> становится событием. После трёх неполученных тестов платформа открывает событие «нет связи».</p>" +
      "<p class='ogoh'>Две SIM не берут у одного оператора. Это самая частая ошибка: при отказе базовой станции обе умирают одновременно, и резервный канал остаётся только на бумаге. Требование двух операторов записывают в условия закупки.</p>" }
},

"y05.x-yolgon": {
  yorliq: "Operator uchun", sarlavha: "Yolg'on signal: eng sekin buziladigan narsa",
  tana: "<p>Yolg'on signal texnikani buzmaydi — u operatorni buzadi. Haftada o'nta yolg'on hodisadan keyin operator kartani ochmasdan yopa boshlaydi, va o'n birinchisi haqiqiy bo'ladi.</p>" +
    "<h4>Manbalar va ularning yechimi</h4><table><tr><th>Manba</th><th>Yechim</th></tr>" +
    "<tr><td>Deraza orqali quyosh nuri</td><td>datchikni derazadan burish</td></tr>" +
    "<tr><td>Isitish batareyasining issiq oqimi</td><td>datchikni 2 metrdan uzoqroqqa</td></tr>" +
    "<tr><td>Bo'sh binodagi kalamush</td><td>sezgirlikni o'rtachaga, balandlikni 2,4 m ga</td></tr>" +
    "<tr><td>Uchib kirgan qush</td><td>derazalarni yopish ko'rik ro'yxatiga kiritiladi</td></tr></table>" +
    "<h4>O'lchov</h4><p>Platforma har obyekt bo'yicha yolg'on signal ulushini hisoblaydi. Bir oyda o'ntadan ortiq tasdiqlanmagan hodisa bo'lsa, obyekt sozlash ro'yxatiga tushadi va montajchi qayta boradi. Bu raqam obyektning nazorat indeksiga kiradi.</p>" +
    "<p class='ogoh'>Yolg'on signalni «operator o'zi ajratadi» deb qoldirish — eng qimmat yechim. Uch oydan keyin obyekt bo'yicha butun signal oqimiga ishonch yo'qoladi va tizim faqat qog'ozda ishlaydi.</p>",
  ru: { yorliq: "Для оператора", sarlavha: "Ложная тревога: то, что ломается медленнее всего",
    tana: "<p>Ложная тревога не ломает технику — она ломает оператора. После десяти ложных событий в неделю он начинает закрывать карточку не открывая, и одиннадцатое окажется настоящим.</p>" +
      "<h4>Источники и что с ними делать</h4><table><tr><th>Источник</th><th>Решение</th></tr>" +
      "<tr><td>Солнце через окно</td><td>развернуть датчик от окна</td></tr>" +
      "<tr><td>Тёплый поток от радиатора</td><td>отнести датчик дальше двух метров</td></tr>" +
      "<tr><td>Крысы в пустом здании</td><td>средняя чувствительность, высота 2,4 м</td></tr>" +
      "<tr><td>Залетевшая птица</td><td>закрывание окон вносится в список осмотра</td></tr></table>" +
      "<h4>Измерение</h4><p>Платформа считает долю ложных тревог по каждому объекту. Если за месяц больше десяти неподтверждённых событий, объект попадает в список на донастройку и монтажник выезжает повторно. Эта цифра входит в индекс контроля объекта.</p>" +
      "<p class='ogoh'>Оставить ложные тревоги на «оператор сам разберётся» — самое дорогое решение. Через три месяца доверие ко всему потоку сигналов с объекта теряется, и система работает только на бумаге.</p>" }
},

"y05.x-qoriq": {
  yorliq: "Xatar uchun", sarlavha: "Qo'riqsiz qolgan obyekt: raqam bilan",
  tana: "<p>Bu texnik nosozlik emas, lekin balansdagi obyektlar bo'yicha eng katta ochiq xatar. Qo'riq olingan holida unutilgan obyekt datchiklari ishlab turgan holda himoyasiz qoladi.</p>" +
    "<h4>Platforma nima qiladi</h4><p>Qo'riq olingan vaqt ariza muddati bilan solishtiriladi. Muddat tugagach uch bosqichli eslatma boshlanadi: xodimga, mas'ulga, filial rahbariga. Har bosqich obyektning nazorat indeksini pasaytiradi.</p>" +
    "<h4>Hisobotda</h4><p>«Qo'riqsiz soatlar» ko'rsatkichi filial bo'yicha oylik yig'iladi va boshqaruv hisobotiga kiradi. Bu ko'rsatkich nolga intilishi kerak — va uni nolga olib boradigan yagona narsa shu raqamning ko'rinishi.</p>" +
    "<p class='ogoh'>Eng ko'p uchraydigan sabab — ko'rikni o'tkazgan xodimning obyektdan telefon aloqasi yo'q joyda chiqib ketishi. Shuning uchun qo'riqni qaytarish tugmasi mobil ilovada oflayn navbatga qo'yiladi: aloqa paydo bo'lishi bilan buyruq yuboriladi va vaqt xodim tugmani bosgan lahza bo'yicha yoziladi.</p>",
  ru: { yorliq: "Для риска", sarlavha: "Объект без охраны: в цифрах",
    tana: "<p>Это не техническая неисправность, а самый крупный открытый риск по объектам на балансе. Объект, забытый снятым с охраны, остаётся без защиты при полностью исправных датчиках.</p>" +
      "<h4>Что делает платформа</h4><p>Время снятия сверяется со сроком заявки. По истечении срока запускается трёхступенчатое напоминание: сотруднику, ответственному, руководителю филиала. Каждая ступень снижает индекс контроля объекта.</p>" +
      "<h4>В отчёте</h4><p>Показатель «часы без охраны» суммируется по филиалу за месяц и входит в отчёт правлению. Этот показатель должен стремиться к нулю — и единственное, что ведёт его к нулю, это сама его видимость.</p>" +
      "<p class='ogoh'>Самая частая причина — сотрудник уезжает с объекта там, где нет мобильной связи. Поэтому кнопка постановки на охрану в мобильном приложении ставится в офлайн-очередь: команда уходит при появлении связи, а время записывается по моменту нажатия.</p>" }
},

/* ============================ mos va mos emas ============================ */

"y05.g-ha": {
  yorliq: "Portfel uchun", sarlavha: "Qaysi obyektga bu yechim to'g'ri keladi",
  tana: "<p>Uchta shart bir vaqtda bajarilsa, bu yechim eng arzon va eng ishonchli variant bo'ladi.</p>" +
    "<ol><li><b>Bino ichi va isitish saqlangan.</b> Harorat −10 °C dan pastga tushmaydigan xona bor.</li>" +
    "<li><b>Kirish nuqtalari kam, xonalar ko'p.</b> Eshik va deraza soni beshdan oshmasa, datchiklar bilan butun perimetr yopiladi.</li>" +
    "<li><b>Uzluksiz video talab qilinmaydi.</b> Kerak bo'lgani — hodisa haqida tez xabar va uni tasdiqlaydigan surat.</li></ol>" +
    "<h4>Amaliy misollar</h4><ul><li>Bo'shatilgan idora binosi: xonalar ko'p, kirish bitta, isitish ishlaydi</li><li>Ichida mebel va texnika qolgan obyekt: qiymat ichkarida, perimetrda emas</li><li>Xaridor tez-tez keladigan obyekt: qo'riqni olish va qaytarish jurnali sotuv jarayonining dalili bo'ladi</li><li>Yong'in signalizatsiyasi talab qilinadigan bino: talab shu yechim bilan yopiladi</li></ul>" +
    "<p class='ogoh'>Yakuniy qaror obyektni ko'rgandan keyin qabul qilinadi. Reja bo'yicha mos ko'ringan bino ichida temir-beton to'siqlar bo'lsa, radio xaritasi butunlay boshqacha chiqadi va smetaga ikkita ReX qo'shiladi.</p>",
  ru: { yorliq: "Для портфеля", sarlavha: "Каким объектам это решение подходит",
    tana: "<p>Если три условия выполняются одновременно, это решение оказывается самым дешёвым и самым надёжным вариантом.</p>" +
      "<ol><li><b>Внутри здания, отопление сохранено.</b> Есть помещение, где температура не опускается ниже −10 °C.</li>" +
      "<li><b>Мало точек входа, много помещений.</b> Если дверей и окон не больше пяти, датчики закрывают весь периметр.</li>" +
      "<li><b>Непрерывное видео не требуется.</b> Нужны быстрое сообщение о событии и снимок, который его подтверждает.</li></ol>" +
      "<h4>Практические примеры</h4><ul><li>Освобождённое административное здание: помещений много, вход один, отопление работает</li><li>Объект с оставшейся мебелью и техникой: ценность внутри, а не на периметре</li><li>Объект, куда часто приезжают покупатели: журнал снятия и постановки становится доказательством хода продажи</li><li>Здание, где требуется пожарная сигнализация: требование закрывается этим же решением</li></ul>" +
      "<p class='ogoh'>Окончательное решение принимают после выезда на объект. Если в здании, подходящем по плану, обнаружатся железобетонные перегородки, радиокарта получится совсем другой и в смету добавятся два ReX.</p>" }
},

"y05.g-yoq": {
  yorliq: "Portfel uchun", sarlavha: "Qayerda bu yechim olinmaydi",
  tana: "<p>To'rtta holatda bu yechim noto'g'ri tanlov bo'ladi va uni boshqasi bilan almashtirish kerak.</p>" +
    "<table><tr><th>Holat</th><th>Nega</th><th>O'rniga</th></tr>" +
    "<tr><td>Ochiq hudud, perimetr</td><td>datchiklar bino ichi uchun</td><td>Yechim 02 yoki 03</td></tr>" +
    "<tr><td>Uzluksiz video kerak</td><td>surat dalil sifatida yetmaydi</td><td>Yechim 04</td></tr>" +
    "<tr><td>Isitilmaydigan ombor</td><td>−10 °C chegarasi buziladi</td><td>Yechim 02 yoki 04</td></tr>" +
    "<tr><td>Qalin devorli katta ombor</td><td>radio yetmaydi, ReX quvvat talab qiladi</td><td>Yechim 04</td></tr></table>" +
    "<p>Uchinchi va to'rtinchi qatorlar ko'pincha bitta obyektda birga uchraydi: katta isitilmaydigan ombor bu yechim uchun eng yomon holat.</p>" +
    "<p class='ogoh'>Qurilma sotib olingandan keyin uni boshqa obyektga ko'chirish mumkin, lekin o'rnatish ishi qaytadan to'lanadi. Shuning uchun obyekt turi loyihalash bosqichida, ko'rik dalolatnomasi asosida aniqlanadi — katalog bo'yicha emas.</p>",
  ru: { yorliq: "Для портфеля", sarlavha: "Где это решение не берут",
    tana: "<p>В четырёх случаях решение оказывается неверным и его нужно заменить другим.</p>" +
      "<table><tr><th>Случай</th><th>Почему</th><th>Вместо него</th></tr>" +
      "<tr><td>Открытая территория, периметр</td><td>датчики рассчитаны на помещения</td><td>Решение 02 или 03</td></tr>" +
      "<tr><td>Нужно непрерывное видео</td><td>снимка как доказательства мало</td><td>Решение 04</td></tr>" +
      "<tr><td>Неотапливаемый склад</td><td>нарушается предел −10 °C</td><td>Решение 02 или 04</td></tr>" +
      "<tr><td>Большой склад с толстыми стенами</td><td>радио не добивает, ReX требует питания</td><td>Решение 04</td></tr></table>" +
      "<p>Третья и четвёртая строки часто встречаются на одном объекте: большой неотапливаемый склад — худший случай для этого решения.</p>" +
      "<p class='ogoh'>Купленное оборудование можно перенести на другой объект, но монтаж оплачивается заново. Поэтому тип объекта определяют на стадии проекта, по акту осмотра.</p>" }
}

});
