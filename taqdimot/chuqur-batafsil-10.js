/* Yechim 10 — umumiy klaster shkafi. Sahifadagi bosiladigan bloklar. */
window.MKB_BATAFSIL = Object.assign(window.MKB_BATAFSIL || {}, {

"y10.yuk": {
  yorliq: "Montajchi uchun", sarlavha: "70 dan 90 vattgacha: klaster yuki qayerdan yig'iladi",
  tana: "<p>Klaster shkafi to'rtta obyektni bir vaqtda boqadi. Uning yuki oddiy quyosh-4G kamerasinikidan besh barobar katta va shuning uchun energiya hisobi bu yechimda birinchi o'ringa chiqadi.</p>" +
    "<table><tr><th>Qurilma</th><th class='n'>Kunduzi, Vt</th><th class='n'>Kechasi, Vt</th></tr>" +
    "<tr><td>Oltita kamera, IR bilan</td><td class='n'>27</td><td class='n'>42</td></tr>" +
    "<tr><td>PoE kommutator, o'z ehtiyoji</td><td class='n'>8</td><td class='n'>8</td></tr>" +
    "<tr><td>PoE o'girishdagi yo'qotish, 15 foiz</td><td class='n'>4</td><td class='n'>6</td></tr>" +
    "<tr><td>NVR, SSD bilan</td><td class='n'>7</td><td class='n'>7</td></tr>" +
    "<tr><td>LTE router</td><td class='n'>5</td><td class='n'>5</td></tr>" +
    "<tr><td>Ikkita radio ko'prik, yaqin uchlari</td><td class='n'>12</td><td class='n'>12</td></tr>" +
    "<tr><td>Termostat isitgichi, dekabr o'rtachasi</td><td class='n'>8</td><td class='n'>10</td></tr>" +
    "<tr class='jami'><td>Jami</td><td class='n'>71</td><td class='n'>90</td></tr></table>" +
    "<h4>Inversor qo'yilmaydi</h4>" +
    "<p>Shkafdagi hamma jihoz doimiy tokda ishlaydi: kommutator 54 voltda, NVR va router 12 voltda, ko'priklar PoE dan. Inversor qo'shilsa, u yuk bo'lmaganda ham o'zi uchun 15–20 vatt yeydi — sutkasiga 0,4 kVt·soat. Bu dekabrdagi butun ortiqcha energiyadan katta, ya'ni bitta ortiqcha qurilma butun balansni manfiyga aylantiradi.</p>" +
    "<p class='ogoh'>Isitgich hisobda o'rtacha qiymat bilan turadi: u sutkasiga uzluksiz emas, uch-to'rt soat ishlaydi. Sovuq kelganda bu raqam ikki barobar oshadi, shuning uchun dekabr balansi eng sovuq haftaga qarab ham tekshiriladi.</p>",
  manba: [],
  ru: {yorliq: "Для монтажника", sarlavha: "От 70 до 90 Вт: из чего складывается нагрузка кластера",
    tana: "<p>Кластерный шкаф кормит не один объект, а четыре. Его нагрузка впятеро больше, чем у обычной солнечной камеры с 4G, поэтому энергетический расчёт в этом решении выходит на первое место.</p>" +
      "<table><tr><th>Устройство</th><th class='n'>Днём, Вт</th><th class='n'>Ночью, Вт</th></tr>" +
      "<tr><td>Шесть камер, с ИК</td><td class='n'>27</td><td class='n'>42</td></tr>" +
      "<tr><td>PoE-коммутатор, собственные нужды</td><td class='n'>8</td><td class='n'>8</td></tr>" +
      "<tr><td>Потери преобразования PoE, 15 процентов</td><td class='n'>4</td><td class='n'>6</td></tr>" +
      "<tr><td>NVR с SSD</td><td class='n'>7</td><td class='n'>7</td></tr>" +
      "<tr><td>Роутер LTE</td><td class='n'>5</td><td class='n'>5</td></tr>" +
      "<tr><td>Два радиомоста, ближние концы</td><td class='n'>12</td><td class='n'>12</td></tr>" +
      "<tr><td>Подогрев по термостату, среднее за декабрь</td><td class='n'>8</td><td class='n'>10</td></tr>" +
      "<tr class='jami'><td>Итого</td><td class='n'>71</td><td class='n'>90</td></tr></table>" +
      "<h4>Инвертор не ставится</h4>" +
      "<p>Всё оборудование в шкафу работает на постоянном токе: коммутатор на 54 вольтах, NVR и роутер на 12, мосты — от PoE. Если добавить инвертор, он и без нагрузки съест на себя 15–20 Вт, то есть 0,4 кВт·ч в сутки. Это больше всего декабрьского избытка: одно лишнее устройство переводит весь баланс в минус.</p>" +
      "<p class='ogoh'>Подогрев стоит в расчёте средним значением: он работает не круглые сутки, а три-четыре часа. В морозы эта цифра удваивается, поэтому декабрьский баланс проверяется ещё и по самой холодной неделе.</p>"}
},

"y10.dekabr": {
  yorliq: "Texnik izoh", sarlavha: "2,28 kVt·soat: dekabr ishlab chiqarishi va 14 foizlik zaxira",
  tana: "<p>Hisob boshqa yechimlardagidek to'rt bosqichli, lekin natijasi keskin farq qiladi: bu yerda ortiqcha energiya deyarli qolmaydi.</p>" +
    "<table><tr><th>Bosqich</th><th class='n'>Qiymat</th></tr>" +
    "<tr><td>Panel quvvati: 4 × 470 Vt</td><td class='n'>1,88 kVt</td></tr>" +
    "<tr><td>Toshkent, dekabr insolyatsiyasi, 55° burchakda</td><td class='n'>1,62 kVt·soat/m² kuniga</td></tr>" +
    "<tr><td>Yo'qotishlar: kontroller, kabel, chang, harorat</td><td class='n'>−25 %</td></tr>" +
    "<tr><td>Ishlab chiqarish</td><td class='n'>2,28 kVt·soat</td></tr>" +
    "<tr><td>Sutkalik sarf</td><td class='n'>2,0 kVt·soat</td></tr>" +
    "<tr class='jami'><td>Ortiqcha</td><td class='n'>0,28 kVt·soat · 14 %</td></tr></table>" +
    "<h4>Nima uchun bu tor joy</h4>" +
    "<p>O'n to'rt foizlik zaxira degani — bitta qo'shimcha kamera yoki bitta unutilgan qurilma balansni nolga tushiradi. Amalda bu shunday ko'rinadi: klaster bir yil yaxshi ishlaydi, keyin beshinchi obyekt qo'shiladi va yanvar oyida shkaf har kuni ertalab ikki foizdan pastga tusha boshlaydi.</p>" +
    "<h4>Beshinchi panelning joyi</h4>" +
    "<p>Ramkaga to'rtta panel qo'yilsa ham, beshinchisining o'rni va kabeli qoldiriladi. Bu montaj paytida qo'shimcha 300 ming so'm turadi, keyinchalik esa butun ramkani qayta yig'ishdan saqlaydi. Obyekt qo'shilganda panel bir soatda o'rnatiladi.</p>" +
    "<p class='ogoh'>Klaster tarmoqdan quvvat oladigan joyda bu bo'lim umuman kerak emas — shkaf oddiy zaxira manbaga ulanadi. Panel va akkumulyator faqat langar obyektda elektr bo'lmaganda qo'yiladi va ular smetaning yarmini tashkil qiladi.</p>",
  manba: [["PVGIS, Yevropa komissiyasi", "https://re.jrc.ec.europa.eu/pvg_tools/en/"]],
  ru: {yorliq: "Техническая справка", sarlavha: "2,28 кВт·ч: декабрьская выработка и запас в 14 процентов",
    tana: "<p>Расчёт такой же четырёхшаговый, как в других решениях, но результат принципиально другой: избытка здесь почти не остаётся.</p>" +
      "<table><tr><th>Шаг</th><th class='n'>Значение</th></tr>" +
      "<tr><td>Мощность панелей: 4 × 470 Вт</td><td class='n'>1,88 кВт</td></tr>" +
      "<tr><td>Ташкент, инсоляция в декабре при угле 55°</td><td class='n'>1,62 кВт·ч/м² в сутки</td></tr>" +
      "<tr><td>Потери: контроллер, кабель, пыль, температура</td><td class='n'>−25 %</td></tr>" +
      "<tr><td>Выработка</td><td class='n'>2,28 кВт·ч</td></tr>" +
      "<tr><td>Суточный расход</td><td class='n'>2,0 кВт·ч</td></tr>" +
      "<tr class='jami'><td>Избыток</td><td class='n'>0,28 кВт·ч · 14 %</td></tr></table>" +
      "<h4>Почему это узкое место</h4>" +
      "<p>Запас в 14 процентов означает, что одна лишняя камера или одно забытое устройство обнуляют баланс. На практике это выглядит так: кластер год работает нормально, потом добавляют пятый объект — и в январе шкаф каждое утро оказывается на два процента ниже вчерашнего.</p>" +
      "<h4>Место под пятую панель</h4>" +
      "<p>Даже если ставится четыре панели, место и кабель под пятую оставляются. При монтаже это лишние 300 тысяч сумов, зато потом не придётся пересобирать всю раму. При добавлении объекта панель ставится за час.</p>" +
      "<p class='ogoh'>Там, где кластер питается от сети, этот раздел не нужен вовсе — шкаф подключается к обычному источнику бесперебойного питания. Панели и аккумулятор ставятся только если на якорном объекте нет электричества, и они составляют половину сметы.</p>"}
},

"y10.akb": {
  yorliq: "Montajchi uchun", sarlavha: "48 volt va 13,4 kVt·soat: nega aynan shunday",
  tana: "<p>Klaster shkafida kuchlanish tanlovi boshqa yechimlardagidan muhimroq, chunki bu yerda yuk katta va kabel uzun.</p>" +
    "<table><tr><th>Kuchlanish</th><th>90 Vt yukda tok</th><th>Kabeldagi isish</th></tr>" +
    "<tr><td>12 V</td><td class='n'>7,5 A</td><td class='n'>16 barobar</td></tr>" +
    "<tr><td>24 V</td><td class='n'>3,8 A</td><td class='n'>4 barobar</td></tr>" +
    "<tr><td class='b'>48 V</td><td class='n'>1,9 A</td><td class='n'>asos</td></tr></table>" +
    "<h4>Qo'shimcha sabab: PoE</h4>" +
    "<p>PoE liniyasi 48–57 volt bilan ishlaydi. Blok ham 48 voltda bo'lsa, kommutator oddiy DC-DC orqali, deyarli yo'qotishsiz oziqlanadi. 12 voltli blokda esa avval 12 dan 54 voltga ko'tarish kerak bo'ladi va bu har vattda 10–12 foiz yo'qotadi — ya'ni sutkasiga qariyb 0,2 kVt·soat.</p>" +
    "<h4>Sig'im hisobi</h4>" +
    "<p>Ketma-ket besh bulutli kun 2,0 kVt·soatdan 10 kVt·soat talab qiladi. Ruxsat etilgan razryad 80 foiz bo'lgani uchun kerakli sig'im 12,5 kVt·soat. 48 voltda 280 amper-soatlik blok 13,4 kVt·soat beradi — besh-olti kunlik zaxira.</p>" +
    "<p class='ogoh'>Blok shkafning pastki qismida, kommutator va NVR dan ajratilgan bo'limda turadi. Sababi ikkita: og'irlik markazi pastda bo'lishi kerak va akkumulyator issiqlikni yuqoriga beradi — u elektronikaning ostida turgani ma'qul.</p>",
  manba: [],
  ru: {yorliq: "Для монтажника", sarlavha: "48 вольт и 13,4 кВт·ч: почему именно так",
    tana: "<p>В кластерном шкафу выбор напряжения важнее, чем в других решениях: здесь большая нагрузка и длинные кабели.</p>" +
      "<table><tr><th>Напряжение</th><th>Ток при 90 Вт</th><th>Нагрев в кабеле</th></tr>" +
      "<tr><td>12 В</td><td class='n'>7,5 А</td><td class='n'>в 16 раз</td></tr>" +
      "<tr><td>24 В</td><td class='n'>3,8 А</td><td class='n'>в 4 раза</td></tr>" +
      "<tr><td class='b'>48 В</td><td class='n'>1,9 А</td><td class='n'>база</td></tr></table>" +
      "<h4>Дополнительная причина: PoE</h4>" +
      "<p>Линия PoE работает на 48–57 вольтах. Если банк тоже на 48, коммутатор питается через простой DC-DC практически без потерь. С банком на 12 вольтах приходится сначала поднимать напряжение до 54, и это съедает 10–12 процентов на каждом ватте — почти 0,2 кВт·ч в сутки.</p>" +
      "<h4>Расчёт ёмкости</h4>" +
      "<p>Пять пасмурных суток подряд при 2,0 кВт·ч требуют 10 кВт·ч. При допустимом разряде 80 процентов нужная ёмкость — 12,5 кВт·ч. Банк на 280 А·ч при 48 вольтах даёт 13,4 кВт·ч, то есть запас на пять-шесть суток.</p>" +
      "<p class='ogoh'>Банк стоит в нижней части шкафа, в отсеке, отделённом от коммутатора и NVR. Причин две: центр тяжести должен быть внизу, а аккумулятор отдаёт тепло вверх — ему лучше стоять под электроникой.</p>"}
},

"y10.narx": {
  yorliq: "Moliya va huquq", sarlavha: "Klasterni bir martalik narx bo'yicha solishtirib bo'lmaydi",
  tana: "<p>Yigirma milliondan qirq milliongacha — bu butun klasterning infratuzilmasi, kameralarsiz. Uni bitta kamera komplekti bilan yonma-yon qo'yish noto'g'ri taqqoslash bo'ladi; solishtirish besh yillik egalik narxida qilinadi.</p>" +
    "<table><tr><th>Modda, besh yil</th><th class='n'>8 ta alohida</th><th class='n'>Klaster</th></tr>" +
    "<tr><td>Jihoz</td><td class='n'>50–70 mln</td><td class='n'>36–60 mln</td></tr>" +
    "<tr><td>SIM va trafik</td><td class='n'>86 mln</td><td class='n'>18 mln</td></tr>" +
    "<tr><td>Servis qatnovlari</td><td class='n'>20–30 mln</td><td class='n'>6–10 mln</td></tr>" +
    "<tr class='jami'><td>Jami</td><td class='n'>156–186 mln</td><td class='n'>60–88 mln</td></tr></table>" +
    "<h4>Raqamlar qayerdan</h4>" +
    "<p>Jihoz qatorida klaster uchun 20–40 mln shkaf va har obyektga 2–3 mln kamera olingan. SIM qatori sakkiz obyektga oyiga 180 ming so'mdan, klasterga esa bitta kengaytirilgan tarif 300 ming so'mdan hisoblangan. Servis qatorida alohida komplektlarga yiliga 8–12 qatnov, klasterga 2–3 qatnov kiritilgan.</p>" +
    "<p class='ogoh'>Bu hisob faqat obyektlar bir-biriga yaqin bo'lganda o'rinli. Ular orasidagi masofa kabel va ko'prik chegarasidan oshsa, klaster tarqalib ketadi va ustunlik yo'qoladi — shuning uchun birinchi ish masofani o'lchash, smeta tuzish emas.</p>",
  manba: [],
  ru: {yorliq: "Финансы и право", sarlavha: "Кластер нельзя сравнивать по разовой цене",
    tana: "<p>От двадцати до сорока миллионов — это инфраструктура всего кластера, без камер. Ставить её рядом с комплектом на одну камеру некорректно; сравнение делается по стоимости владения за пять лет.</p>" +
      "<table><tr><th>Статья, пять лет</th><th class='n'>8 отдельных</th><th class='n'>Кластер</th></tr>" +
      "<tr><td>Оборудование</td><td class='n'>50–70 млн</td><td class='n'>36–60 млн</td></tr>" +
      "<tr><td>SIM и трафик</td><td class='n'>86 млн</td><td class='n'>18 млн</td></tr>" +
      "<tr><td>Сервисные выезды</td><td class='n'>20–30 млн</td><td class='n'>6–10 млн</td></tr>" +
      "<tr class='jami'><td>Итого</td><td class='n'>156–186 млн</td><td class='n'>60–88 млн</td></tr></table>" +
      "<h4>Откуда цифры</h4>" +
      "<p>В строке оборудования для кластера взяты 20–40 млн на шкаф и по 2–3 млн на камеры каждого объекта. Строка SIM посчитана из 180 тысяч сумов в месяц на восемь объектов и одного расширенного тарифа на 300 тысяч для кластера. В сервисе для отдельных комплектов заложено 8–12 выездов в год, для кластера — 2–3.</p>" +
      "<p class='ogoh'>Этот расчёт верен только при близком расположении объектов. Если расстояние между ними выходит за пределы кабеля и радиомоста, кластер рассыпается и преимущество исчезает — поэтому смету открывают только после того, как расстояния промерены на месте.</p>"}
},

"y10.shkaf": {
  yorliq: "Montajchi uchun", sarlavha: "Tashqi shkaf: himoya darajasi, o'lcham va joylashuv",
  tana: "<p>Shkaf bu yechimda oddiy quti emas — u butun klasterning ishlash sharti. Uning uchta o'lchovi tanlanadi va uchalasi ham keyin o'zgartirilmaydi.</p>" +
    "<table><tr><th>O'lchov</th><th>Talab</th><th>Nega</th></tr>" +
    "<tr><td class='b'>Himoya darajasi</td><td>IP55 dan past emas</td><td>Chang va yon tomondan uradigan yomg'ir</td></tr>" +
    "<tr><td class='b'>Balandlik</td><td>12U</td><td>Kommutator, NVR, router, DC-DC va zaxira joy</td></tr>" +
    "<tr><td class='b'>Devor</td><td>Shimoliy tomon, soyabon bilan</td><td>Yozda ichkari 60 °C ga chiqmasligi uchun</td></tr></table>" +
    "<h4>Ikki bo'lim</h4>" +
    "<p>Shkaf ichi ikkiga bo'linadi: pastda akkumulyator, yuqorida elektronika. Sabab faqat og'irlik emas — akkumulyator zaryadlanayotganda issiqlik chiqaradi va u yuqoriga ko'tariladi. Elektronika uning ustida tursa, yozda bu qo'shimcha yigirma daraja beradi.</p>" +
    "<h4>Eshik datchigi</h4>" +
    "<p>Eshikka quruq kontaktli datchik qo'yiladi va u kamera hodisasi bilan bir darajada turadi. Shkafga qo'l urilgani platformada darhol ko'rinadi, chunki bu to'rtta obyektni bir vaqtda o'chirishga urinish bo'lishi mumkin.</p>" +
    "<p class='ogoh'>Shkaf kaliti ikki nusxada chiqariladi: bittasi brigadada, ikkinchisi filial seyfida. Amalda eng ko'p yo'qoladigan narsa aynan kalit — montajchi ishdan ketadi va shkaf bir oy ochilmay turadi.</p>",
  manba: [],
  ru: {yorliq: "Для монтажника", sarlavha: "Уличный шкаф: степень защиты, размер и место",
    tana: "<p>Шкаф в этом решении не просто короб — это условие работы всего кластера. У него выбираются три параметра, и все три потом не меняются.</p>" +
      "<table><tr><th>Параметр</th><th>Требование</th><th>Почему</th></tr>" +
      "<tr><td class='b'>Степень защиты</td><td>Не ниже IP55</td><td>Пыль и косой дождь</td></tr>" +
      "<tr><td class='b'>Высота</td><td>12U</td><td>Коммутатор, NVR, роутер, DC-DC и запас места</td></tr>" +
      "<tr><td class='b'>Стена</td><td>Северная сторона, с козырьком</td><td>Чтобы летом внутри не было 60 °C</td></tr></table>" +
      "<h4>Два отсека</h4>" +
      "<p>Шкаф делится надвое: внизу аккумулятор, вверху электроника. Дело не только в весе — при заряде аккумулятор отдаёт тепло, и оно идёт вверх. Если электроника стоит над ним, летом это добавляет лишние двадцать градусов.</p>" +
      "<h4>Датчик двери</h4>" +
      "<p>На дверь ставится датчик на сухом контакте, и он приравнивается по важности к событию с камеры. Попытка добраться до шкафа видна на платформе сразу: это может быть попытка отключить четыре объекта одновременно.</p>" +
      "<p class='ogoh'>Ключей от шкафа делается не один, а два, и второй хранится в филиале. На практике чаще всего теряется не оборудование, а ключ: монтажник уволился — и шкаф месяц стоит неоткрытым.</p>"}
},

"y10.kommutator": {
  yorliq: "Texnik izoh", sarlavha: "PoE kommutator: byudjet, standart va VLAN",
  tana: "<p>Kommutator klasterning markazi va uning uchta xususiyati loyihaga yoziladi: PoE byudjeti, standarti va boshqariluvi.</p>" +
    "<table><tr><th>Standart</th><th>Portga beradi</th><th>Qurilma oladi</th></tr>" +
    "<tr><td class='b'>802.3af</td><td class='n'>15,4 Vt</td><td class='n'>12,95 Vt</td></tr>" +
    "<tr><td class='b'>802.3at</td><td class='n'>30 Vt</td><td class='n'>25,5 Vt</td></tr>" +
    "<tr><td class='b'>802.3bt</td><td class='n'>60–90 Vt</td><td class='n'>51–71 Vt</td></tr></table>" +
    "<h4>Byudjet portlar yig'indisi emas</h4>" +
    "<p>Sakkiz portli kommutatorda umumiy PoE byudjeti ko'pincha 60–120 vatt bo'ladi, ya'ni hamma portdan bir vaqtda 30 vattdan berib bo'lmaydi. Kameralar 5–8 vatt oladi, shuning uchun bu yetadi; lekin isitgichli kamera qo'shilsa, u kechasi 20 vattgacha chiqadi va byudjet tugaydi. Loyihaga hamma qurilmaning kechki iste'moli yig'indisi yoziladi, kunduzgisi emas.</p>" +
    "<h4>Boshqariladigan bo'lishi shart</h4>" +
    "<p>VLAN, port bo'yicha PoE ni qayta yoqish va port statistikasi — uchalasi ham faqat boshqariladigan kommutatorda bor. Osilib qolgan kamerani masofadan qayta yuklash aynan shu funksiya orqali qilinadi: portdagi PoE o'chiriladi va besh soniyadan keyin qaytariladi. Boshqarilmaydigan kommutatorda buning uchun obyektga borish kerak.</p>" +
    "<p class='ogoh'>Kommutatorning boshqaruv interfeysi alohida VLAN da turadi va u kameralar tarmog'idan ko'rinmaydi. Buzilgan kamera orqali kommutatorga kirish yo'li shu bilan yopiladi.</p>",
  manba: [["IEEE 802.3", "https://www.ieee802.org/3/"]],
  ru: {yorliq: "Техническая справка", sarlavha: "PoE-коммутатор: бюджет, стандарт и VLAN",
    tana: "<p>Коммутатор — центр кластера, и три его свойства попадают в проект: бюджет PoE, стандарт и управляемость.</p>" +
      "<table><tr><th>Стандарт</th><th>Отдаёт в порт</th><th>Получает устройство</th></tr>" +
      "<tr><td class='b'>802.3af</td><td class='n'>15,4 Вт</td><td class='n'>12,95 Вт</td></tr>" +
      "<tr><td class='b'>802.3at</td><td class='n'>30 Вт</td><td class='n'>25,5 Вт</td></tr>" +
      "<tr><td class='b'>802.3bt</td><td class='n'>60–90 Вт</td><td class='n'>51–71 Вт</td></tr></table>" +
      "<h4>Бюджет — это не сумма портов</h4>" +
      "<p>У восьмипортового коммутатора общий бюджет PoE обычно 60–120 Вт, то есть выдать по 30 Вт со всех портов одновременно нельзя. Камеры берут 5–8 Вт, и этого хватает; но стоит добавить камеру с подогревом — ночью она уходит под 20 Вт, и бюджет заканчивается. В проект записывается сумма ночного потребления всех устройств: днём нагрузка ниже и запас кажется больше, чем он есть.</p>" +
      "<h4>Управляемость обязательна</h4>" +
      "<p>VLAN, перезапуск PoE по порту и статистика по портам есть только у управляемого коммутатора. Зависшая камера перезагружается именно так: PoE на порту гасится и через пять секунд возвращается. С неуправляемым коммутатором для этого нужно ехать на объект.</p>" +
      "<p class='ogoh'>Интерфейс управления коммутатора живёт в отдельном VLAN и из сети камер не виден. Так закрывается путь к коммутатору через скомпрометированную камеру.</p>"}
},

"y10.nvr": {
  yorliq: "Texnik izoh", sarlavha: "NVR: nima yoziladi, qancha turadi va nima tashqariga chiqadi",
  tana: "<p>Klasterda NVR to'rtta obyektning yozuvini bir joyda saqlaydi. Bu qulay, lekin unga ikki qoida qo'yiladi.</p>" +
    "<h4>Birinchi qoida: yozuv hududdan chiqmaydi</h4>" +
    "<p>Doimiy oqim tashqariga uzatilmaydi. Platformaga hodisa yozuvi, bitta kadr va telemetriya boradi; to'liq klip faqat operator so'raganda yuboriladi. Sabab ikkita: 4G da doimiy oqim oyiga yuz gigabaytdan oshadi va dekabrdagi quvvat balansi buni ko'tarmaydi.</p>" +
    "<h4>Ikkinchi qoida: SSD, disk emas</h4>" +
    "<p>Aylanuvchi disk 6–8 vatt oladi va tashqi shkafda minus haroratda ishga tushmay qolishi mumkin. Sanoat SSD si 2 vattdan kam oladi va sovuqqa befarq. To'rtta obyektning oltita kamerasi 14 kunlik arxiv uchun 2 terabaytli SSD talab qiladi — buni hodisali yozuv rejimi bilan uch barobar kamaytirish mumkin.</p>" +
    "<h4>Uchinchi nusxa kamerada</h4>" +
    "<p>Har kameraga microSD karta qo'yiladi. Shkaf o'chganda yoki aloqa uzilganda kamera o'z kartasiga yozishda davom etadi va aloqa tiklanganda yozuvni NVR ga o'tkazadi. Bu bitta buzilish nuqtasi muammosining eng arzon yechimi: karta 200–300 ming so'm turadi.</p>" +
    "<p class='ogoh'>Arxiv muddatini bank ichki qarori belgilaydi. Amalda 14 kun yetarli: bo'sh obyektdagi voqea odatda bir-ikki kun ichida aniqlanadi. Muddatni uzaytirish SSD narxini ham, quvvat sarfini ham oshiradi.</p>",
  manba: [],
  ru: {yorliq: "Техническая справка", sarlavha: "NVR: что пишется, сколько хранится и что уходит наружу",
    tana: "<p>В кластере NVR хранит записи четырёх объектов в одном месте. Это удобно, но на него накладываются два правила.</p>" +
      "<h4>Первое правило: запись не покидает площадку</h4>" +
      "<p>Постоянный поток наружу не передаётся. На платформу уходят запись события, один кадр и телеметрия; полный клип отправляется только по запросу оператора. Причин две: постоянный поток в 4G — это больше ста гигабайт в месяц, и декабрьский энергобаланс этого не выдержит.</p>" +
      "<h4>Второе правило: только промышленный SSD</h4>" +
      "<p>Шпиндельный диск берёт 6–8 Вт и в уличном шкафу на морозе может не раскрутиться. Промышленный SSD потребляет меньше 2 Вт и к холоду равнодушен. Шесть камер четырёх объектов на 14 суток архива требуют SSD на 2 ТБ — запись по событию сокращает эту цифру втрое.</p>" +
      "<h4>Третья копия — в камере</h4>" +
      "<p>В каждую камеру ставится карта microSD. При отключении шкафа или обрыве связи камера продолжает писать на карту и передаёт запись в NVR, когда связь восстановится. Это самое дешёвое решение проблемы единой точки отказа: карта стоит 200–300 тысяч сумов.</p>" +
      "<p class='ogoh'>Срок хранения архива задаётся не законом, а решением банка. На практике 14 суток достаточно: происшествие на пустом объекте обычно вскрывается за день-два. Увеличение срока поднимает и цену SSD, и расход энергии.</p>"}
},

"y10.sim": {
  yorliq: "Rahbariyat uchun", sarlavha: "Bitta SIM: besh yilda 68 mln so'm farq",
  tana: "<p>Bu yechimning asosiy iqtisodiy dalili oylik to'lovda yig'iladi. Har obyektga alohida router qo'yilsa, har biriga alohida abonent to'lovi ham boradi.</p>" +
    "<table><tr><th>Variant</th><th>Oyiga</th><th class='n'>Besh yilda</th></tr>" +
    "<tr><td>8 obyekt, 8 SIM, 180 ming so'mdan</td><td class='n'>1,44 mln</td><td class='n'>86 mln so'm</td></tr>" +
    "<tr><td class='b'>Klaster, 1 SIM, kengaytirilgan tarif</td><td class='n'>300 ming</td><td class='n'>18 mln so'm</td></tr>" +
    "<tr class='jami'><td>Farq</td><td class='n'>1,14 mln</td><td class='n'>68 mln so'm</td></tr></table>" +
    "<h4>Ikkinchi SIM nima uchun</h4>" +
    "<p>Klasterda aloqa yagona nuqtaga yig'ilgani uchun uning uzilishi to'rtta obyektni birdan o'chiradi. Shuning uchun routerga ikki operatorning SIM i qo'yiladi va birinchisi yo'qolganda ikkinchisi avtomatik ulanadi. Ikkinchi SIM minimal tarifda turadi va oyiga 60–80 ming so'm qo'shadi — bu 68 millionlik tejashning yonida sezilmaydi.</p>" +
    "<h4>Trafik hisobi</h4>" +
    "<p>Doimiy oqimsiz klaster oyiga 20–35 GB sarflaydi: to'rt obyektning hodisalari, kadrlari va telemetriyasi. Operator jonli video ko'rganda bu raqam keskin o'sadi. Tarifga qattiq cheklov qo'yilmaydi, ogohlantirish qo'yiladi: trafik oylik normadan oshsa, platformada vazifa ochiladi va sabab tekshiriladi.</p>" +
    "<p class='ogoh'>SIM lar bank nomiga rasmiylashtiriladi va ularning ro'yxati platformada klaster kartochkasida turadi. Xodim nomidagi SIM bilan ishlagan klaster o'sha xodim ishdan ketganda bir kunda o'chishi mumkin.</p>",
  manba: [],
  ru: {yorliq: "Для правления", sarlavha: "Одна SIM: разница в 68 млн сумов за пять лет",
    tana: "<p>Главный экономический аргумент решения лежит не в оборудовании, а в абонентской плате. Если на каждый объект поставить свой роутер, за каждый придётся платить отдельно.</p>" +
      "<table><tr><th>Вариант</th><th>В месяц</th><th class='n'>За пять лет</th></tr>" +
      "<tr><td>8 объектов, 8 SIM по 180 тысяч</td><td class='n'>1,44 млн</td><td class='n'>86 млн сумов</td></tr>" +
      "<tr><td class='b'>Кластер, 1 SIM, расширенный тариф</td><td class='n'>300 тысяч</td><td class='n'>18 млн сумов</td></tr>" +
      "<tr class='jami'><td>Разница</td><td class='n'>1,14 млн</td><td class='n'>68 млн сумов</td></tr></table>" +
      "<h4>Зачем вторая SIM</h4>" +
      "<p>Раз связь в кластере сведена в одну точку, её обрыв гасит сразу четыре объекта. Поэтому в роутер ставятся SIM двух операторов, и при пропадании первого автоматически подключается второй. Вторая SIM держится на минимальном тарифе и добавляет 60–80 тысяч сумов в месяц — на фоне экономии в 68 миллионов это незаметно.</p>" +
      "<h4>Учёт трафика</h4>" +
      "<p>Без постоянного потока кластер расходует 20–35 ГБ в месяц: события, кадры и телеметрия четырёх объектов. Когда оператор смотрит живое видео, цифра резко растёт. В тарифе ставится не отсечка, а предупреждение: при превышении месячной нормы на платформе открывается задача и выясняется причина.</p>" +
      "<p class='ogoh'>SIM-карты оформляются на банк, и их список хранится на платформе в карточке кластера. Кластер, работающий на SIM сотрудника, может погаснуть в один день — когда этот сотрудник уволится.</p>"}
},

"y10.dc": {
  yorliq: "Montajchi uchun", sarlavha: "MPPT va DC-DC: bitta yo'qotish zanjiri",
  tana: "<p>Quvvat panelidan kameragacha bo'lgan yo'lda uchta o'girish bor va ularning har biri foizini oladi. Klaster shkafida bu foizlar jamlanib, dekabr balansini hal qiladi.</p>" +
    "<table><tr><th>Bosqich</th><th>Foydali ish koeffitsienti</th></tr>" +
    "<tr><td>Panel → 48 V blok, MPPT</td><td class='n'>94–97 %</td></tr>" +
    "<tr><td>48 V → 54 V, PoE uchun DC-DC</td><td class='n'>92–95 %</td></tr>" +
    "<tr><td>PoE → kamera, kabeldagi tushish</td><td class='n'>85–92 %</td></tr>" +
    "<tr class='jami'><td>Umumiy</td><td class='n'>74–85 %</td></tr></table>" +
    "<h4>Nima qilish mumkin</h4>" +
    "<ul><li><b>MPPT ni PWM bilan almashtirmaslik.</b> PWM kontrolleri arzon, lekin qishda 15–20 foizni yo'qotadi: u panelning maksimal quvvat nuqtasini qidirmaydi.</li>" +
    "<li><b>Kabelni qisqartirish.</b> PoE dagi yo'qotish uzunlikka to'g'ri proporsional. 90 metrlik liniya 30 metrlikdan uch barobar ko'p yo'qotadi.</li>" +
    "<li><b>Telemetriyani olish.</b> MPPT dan Modbus yoki MQTT orqali zaryad, panel quvvati va harorat olinadi. Bu bo'lmasa, dekabrdagi pasayishni faqat obyektga borib bilish mumkin.</li></ul>" +
    "<p class='ogoh'>DC-DC moduli zaxirasi bilan olinadi: nominal quvvati kechki cho'qqidan kamida 1,5 barobar katta. Chegarada ishlaydigan modul yozda isib o'chadi va butun klaster to'xtaydi.</p>",
  manba: [],
  ru: {yorliq: "Для монтажника", sarlavha: "MPPT и DC-DC: одна цепочка потерь",
    tana: "<p>На пути от панели до камеры стоят три преобразования, и каждое забирает свой процент. В кластерном шкафу эти проценты складываются и решают судьбу декабрьского баланса.</p>" +
      "<table><tr><th>Ступень</th><th>КПД</th></tr>" +
      "<tr><td>Панель → банк 48 В, MPPT</td><td class='n'>94–97 %</td></tr>" +
      "<tr><td>48 В → 54 В, DC-DC для PoE</td><td class='n'>92–95 %</td></tr>" +
      "<tr><td>PoE → камера, падение в кабеле</td><td class='n'>85–92 %</td></tr>" +
      "<tr class='jami'><td>Суммарно</td><td class='n'>74–85 %</td></tr></table>" +
      "<h4>Что можно сделать</h4>" +
      "<ul><li><b>Не менять MPPT на PWM.</b> Контроллер PWM дешевле, но зимой теряет 15–20 процентов: он не ищет точку максимальной мощности панели.</li>" +
      "<li><b>Укоротить кабель.</b> Потери в PoE прямо пропорциональны длине. Линия в 90 метров теряет втрое больше, чем в 30.</li>" +
      "<li><b>Снимать телеметрию.</b> С MPPT по Modbus или MQTT берутся заряд, мощность панелей и температура. Без этого декабрьский провал можно обнаружить только выехав на объект.</li></ul>" +
      "<p class='ogoh'>Модуль DC-DC берётся с запасом: номинал минимум в 1,5 раза выше ночного пика. Работающий на пределе модуль летом перегревается и уходит в защиту, а вместе с ним встаёт весь кластер.</p>"}
},

"y10.poe": {
  yorliq: "Montajchi uchun", sarlavha: "100 metr va alyuminiy kabel masalasi",
  tana: "<p>Ethernet segmenti 100 metr bilan cheklangan va bu standartning o'zgarmas raqami: 90 metr qat'iy tortilgan kabel va ikki uchida 5 metrdan patch-kord. Loyihada ham xuddi shu taqsimot ishlatiladi.</p>" +
    "<h4>Amalda chegarani nima buzadi</h4>" +
    "<p>Bozordagi arzon kabelning katta qismi mis emas — u alyuminiy o'zakli, ustiga mis qoplangan. Bunday kabelning qarshiligi toza misdan qariyb bir yarim barobar yuqori. Ma'lumot 100 metrda ham o'tadi, lekin PoE kuchlanishi yo'lda tushib ketadi va kamera 60–70 metrdayoq qayta-qayta o'chib-yona boshlaydi. Buni tashxis qilish qiyin: liniya «ba'zan ishlaydi».</p>" +
    "<table><tr><th>Ko'rsatkich</th><th>Toza mis</th><th>Alyuminiy o'zak</th></tr>" +
    "<tr><td>Kesim</td><td class='n'>24 AWG</td><td class='n'>24 AWG</td></tr>" +
    "<tr><td>100 metrdagi qarshilik</td><td class='n'>≈ 9,4 Om</td><td class='n'>≈ 14 Om</td></tr>" +
    "<tr><td>PoE ishonchli masofa</td><td class='n'>90 m</td><td class='n'>60–70 m</td></tr></table>" +
    "<h4>Qabul qilishda nima tekshiriladi</h4>" +
    "<ul><li>Kabelning o'rami va sertifikati: «CCA» belgisi bo'lsa, u alyuminiy o'zakli.</li>" +
    "<li>Bir necha santimetr kesib olinadi va o'zak ko'riladi: mis qoplama ostidagi kumush rang — alyuminiy.</li>" +
    "<li>Har liniya uzunligi o'lchanadi va dalolatnomaga yoziladi.</li></ul>" +
    "<p class='ogoh'>100 metrdan uzoq masofa uchun «PoE kengaytirgich» qo'yish vaqtinchalik yechim: u qo'shimcha quvvat yeydi va yangi buzilish nuqtasi hosil qiladi. To'g'ri yo'l — optika yoki radio ko'prik.</p>",
  manba: [["IEEE 802.3", "https://www.ieee802.org/3/"]],
  ru: {yorliq: "Для монтажника", sarlavha: "Сто метров и вопрос алюминиевого кабеля",
    tana: "<p>Сегмент Ethernet ограничен ста метрами, и это неизменная цифра стандарта: 90 метров стационарной прокладки и по 5 метров патч-корда с каждой стороны. В проекте используется ровно такая же раскладка.</p>" +
      "<h4>Что ломает предел на практике</h4>" +
      "<p>Значительная часть дешёвого кабеля на рынке — не медь, а алюминий с медным покрытием. Сопротивление такого кабеля примерно в полтора раза выше, чем у чистой меди. Данные пройдут и на ста метрах, но напряжение PoE просядет в пути, и камера начнёт циклически перезагружаться уже на 60–70 метрах. Диагностировать это тяжело: линия «иногда работает».</p>" +
      "<table><tr><th>Показатель</th><th>Чистая медь</th><th>Алюминиевая жила</th></tr>" +
      "<tr><td>Сечение</td><td class='n'>24 AWG</td><td class='n'>24 AWG</td></tr>" +
      "<tr><td>Сопротивление на 100 м</td><td class='n'>≈ 9,4 Ом</td><td class='n'>≈ 14 Ом</td></tr>" +
      "<tr><td>Надёжная дальность PoE</td><td class='n'>90 м</td><td class='n'>60–70 м</td></tr></table>" +
      "<h4>Что проверяется при приёмке</h4>" +
      "<ul><li>Бухта и сертификат: маркировка «CCA» означает алюминиевую жилу.</li>" +
      "<li>Отрезается несколько сантиметров и осматривается жила: серебристый цвет под медным покрытием — алюминий.</li>" +
      "<li>Длина каждой линии измеряется и вносится в акт.</li></ul>" +
      "<p class='ogoh'>Ставить «удлинитель PoE» на дистанции больше ста метров — временное решение: он сам ест питание и создаёт новую точку отказа. Правильный путь — оптика или радиомост.</p>"}
},

"y10.optika": {
  yorliq: "Montajchi uchun", sarlavha: "Ikki bino orasida faqat optika",
  tana: "<p>Bu bandni ko'pincha tejash uchun buzishadi va aynan shu tejash keyin eng qimmatga tushadi.</p>" +
    "<h4>Muammoning fizikasi</h4>" +
    "<p>Har binoning o'z yer konturi bor va ularning potensiallari bir xil emas. Oddiy sharoitda farq bir necha voltdan oshmaydi. Yaqin joyga yashin tushganda esa bu farq bir necha kilovoltga chiqadi va u mis kabel orqali oqim bo'lib o'tadi. Yo'lda turgan yagona narsa — kommutatorning porti. Amalda kuyadigan narsa bitta port bo'lib chiqmaydi: butun kommutator platasi ketadi va u bilan birga to'rtta obyekt o'chadi.</p>" +
    "<h4>Optikada bu yo'l yo'q</h4>" +
    "<p>Optik tolada metall yo'q, demak potensial ham o'tmaydi. Ikki bino orasidagi 85 metrga bir juft mediakonverter va zirhli optik kabel kerak bo'ladi: taxminan 1,5–2,5 mln so'm. Bu kuygan kommutator va uch kunlik to'xtashdan arzon.</p>" +
    "<h4>Optika imkonsiz bo'lsa</h4>" +
    "<ul><li>Ekranli kabel olinadi va ekran faqat bitta uchida yerga ulanadi — ikki uchida ulansa, o'sha oqim uchun yo'l ochiladi.</li>" +
    "<li>Ikki uchiga gaz razryadli himoya moduli qo'yiladi.</li>" +
    "<li>Kabel imkon boricha past, devor bo'ylab tortiladi.</li></ul>" +
    "<p class='ogoh'>Bu qoida bino ichidagi qavatlar orasiga taalluqli emas: bitta binoning yer konturi bitta. U faqat alohida poydevorli binolar orasida ishlaydi.</p>",
  manba: [],
  ru: {yorliq: "Для монтажника", sarlavha: "Между зданиями — только оптика",
    tana: "<p>Этот пункт чаще всего нарушают из экономии, и именно эта экономия потом обходится дороже всего.</p>" +
      "<h4>Физика проблемы</h4>" +
      "<p>У каждого здания свой контур заземления, и их потенциалы не совпадают. В обычных условиях разница не превышает нескольких вольт. Но при близком ударе молнии она подскакивает до нескольких киловольт и проходит током по медному кабелю. Единственное, что стоит у него на пути, — порт коммутатора. На практике выгорает не один порт, а вся плата, и вместе с ней гаснут четыре объекта.</p>" +
      "<h4>В оптике такого пути нет</h4>" +
      "<p>В оптическом волокне нет металла, значит, потенциал не передаётся. На 85 метров между зданиями нужны пара медиаконвертеров и бронированный оптический кабель — примерно 1,5–2,5 млн сумов. Это дешевле сгоревшего коммутатора и трёх суток простоя.</p>" +
      "<h4>Если оптика невозможна</h4>" +
      "<ul><li>Берётся экранированный кабель, и экран заземляется только с одной стороны — при заземлении с двух сторон для тока как раз открывается путь.</li>" +
      "<li>На обоих концах ставятся газоразрядные модули защиты.</li>" +
      "<li>Кабель прокладывается не по воздуху, а как можно ниже и вдоль стены.</li></ul>" +
      "<p class='ogoh'>К этажам внутри одного здания правило не относится: контур заземления у здания один. Оно работает только между строениями с отдельными фундаментами.</p>"}
},

"y10.kopruk": {
  yorliq: "Texnik izoh", sarlavha: "Radio ko'prik: diapazon, masofa va nurning yo'li",
  tana: "<p>Ko'prik ikki nuqta o'rtasida bir-birini to'g'ridan-to'g'ri ko'rishni talab qiladi. Buni buzadigan narsa ko'p, shuning uchun diapazon joyning sharoitiga qarab tanlanadi.</p>" +
    "<table><tr><th>Diapazon</th><th>Amaliy masofa</th><th>Zaifligi</th></tr>" +
    "<tr><td class='b'>5 GHz</td><td class='n'>0,3–5 km</td><td>Atrofdagi Wi-Fi shovqini</td></tr>" +
    "<tr><td class='b'>60 GHz</td><td class='n'>100–500 m</td><td>Kuchli yomg'ir va tuman, juda tor nur</td></tr></table>" +
    "<h4>Qaysi biri qachon</h4>" +
    "<p>60 gigagerts gigabitli tezlik beradi va shovqindan xoli, lekin uning nuri juda tor: mahkamlash qattiq bo'lmasa, shamolda antenna bir necha darajaga qimirlaydi va aloqa uziladi. Shuning uchun u faqat 300 metrgacha va faqat qattiq, tebranmaydigan tayanchga qo'yiladi. Qolgan hamma holatda 5 gigagerts olinadi.</p>" +
    "<h4>Nurning yo'lida zaxira kerak</h4>" +
    "<p>Ikki antenna orasidagi to'g'ri chiziq bo'sh bo'lishi yetarli emas: nur shu chiziq atrofida ma'lum radiusdagi bo'shliqni talab qiladi. Bir kilometrlik masofada bu radius o'rtada bir necha metr bo'ladi. Shuning uchun antennalar olti metrdan baland qo'yiladi va daraxt uchi, devor yoki turadigan yuk mashinasi uchun zaxira qoldiriladi.</p>" +
    "<p class='ogoh'>Chastotani ishlatish sharti mahalliy tartibda belgilanadi. Yetkazib beruvchidan yozma javob olinadi: qaysi diapazon, qaysi quvvat va ruxsat talab qilinadimi. Bu savol shartnoma imzolangunga qadar yopilishi kerak.</p>",
  manba: [["MikroTik Wireless Wire", "https://mikrotik.com/product/wireless_wire"]],
  ru: {yorliq: "Техническая справка", sarlavha: "Радиомост: диапазон, дальность и трасса луча",
    tana: "<p>Мост требует прямой видимости между двумя точками. Помешать этому может многое, поэтому диапазон выбирают не по расстоянию, а по условиям.</p>" +
      "<table><tr><th>Диапазон</th><th>Практическая дальность</th><th>Слабое место</th></tr>" +
      "<tr><td class='b'>5 ГГц</td><td class='n'>0,3–5 км</td><td>Помехи от окружающего Wi-Fi</td></tr>" +
      "<tr><td class='b'>60 ГГц</td><td class='n'>100–500 м</td><td>Сильный дождь и туман, очень узкий луч</td></tr></table>" +
      "<h4>Что и когда</h4>" +
      "<p>60 гигагерц даёт гигабитную скорость и свободен от помех, но луч у него крайне узкий: при нежёстком креплении антенна на ветру уходит на пару градусов, и связь рвётся. Поэтому его ставят только до 300 метров и только на жёсткое, не качающееся основание. Во всех остальных случаях берут 5 гигагерц.</p>" +
      "<h4>Трассе луча нужен запас</h4>" +
      "<p>Мало, чтобы прямая между антеннами была свободна: лучу нужен свободный объём вокруг этой прямой определённого радиуса. На километровой дистанции этот радиус в середине составляет несколько метров. Поэтому антенны поднимают выше шести метров и оставляют запас на верхушку дерева, забор или припаркованный грузовик.</p>" +
      "<p class='ogoh'>Условия использования частот задаются местным порядком. От поставщика берётся письменный ответ: какой диапазон, какая мощность и требуется ли разрешение. Этот вопрос закрывается до подписания договора.</p>"}
},

"y10.chekka": {
  yorliq: "Montajchi uchun", sarlavha: "1,2 kilometrdagi obyekt: ko'prik quvvat bermaydi",
  tana: "<p>Eng ko'p uchraydigan tushunmovchilik shu: radio ko'prik ikki obyektni bog'ladi, demak uzoqdagisi ham ta'minlandi deb o'ylashadi. Ko'prik faqat ma'lumot uzatadi. Uzoq uchdagi antenna ham, kamera ham o'sha joyda oziqlanishi kerak.</p>" +
    "<table><tr><th>Uzoq uchdagi komplekt</th><th class='n'>Vt</th></tr>" +
    "<tr><td>Ko'prikning uzoq uchi</td><td class='n'>6</td></tr>" +
    "<tr><td>Ikki kamera, kechasi IR bilan</td><td class='n'>14</td></tr>" +
    "<tr><td>Kichik PoE injektor</td><td class='n'>2</td></tr>" +
    "<tr class='jami'><td>Jami</td><td class='n'>22</td></tr></table>" +
    "<h4>Mini komplekt</h4>" +
    "<p>Yigirma ikki vattlik yuk sutkasiga 0,53 kVt·soat talab qiladi. Dekabrda buni qoplash uchun 470 vattli bitta panel (0,57 kVt·soat) chegarada, ikkitasi zaxira bilan yetadi. Akkumulyator: 24 voltda 100 amper-soat, ya'ni 2,4 kVt·soat — to'rt-besh kunlik zaxira. Butun mini komplekt kameralar bilan birga taxminan 4–6 mln so'm.</p>" +
    "<h4>Nima yutiladi</h4>" +
    "<p>Bu obyektning o'z SIM i va o'z tunneli bo'lmaydi: u klasterning bir qismi bo'lib qoladi. Besh yilda bu bitta abonent to'lovini tejaydi — 11 mln so'm. Mini komplektning narxi ikki yilda o'zini qoplaydi.</p>" +
    "<p class='ogoh'>Uzoq uchdagi akkumulyator va panel ham platformada ko'rinishi kerak. Aks holda bu obyekt «ko'rinmas» bo'lib qoladi: uning kamerasi jim bo'lganda buning sababi aloqami yoki quvvatmi — bilib bo'lmaydi.</p>",
  manba: [],
  ru: {yorliq: "Для монтажника", sarlavha: "Объект в 1,2 километра: мост не передаёт питание",
    tana: "<p>Самое частое недоразумение: раз радиомост связал два объекта, значит, дальний обеспечен. Мост передаёт только данные. И антенна на дальнем конце, и камеры должны питаться на месте.</p>" +
      "<table><tr><th>Комплект на дальнем конце</th><th class='n'>Вт</th></tr>" +
      "<tr><td>Дальний конец моста</td><td class='n'>6</td></tr>" +
      "<tr><td>Две камеры, ночью с ИК</td><td class='n'>14</td></tr>" +
      "<tr><td>Небольшой PoE-инжектор</td><td class='n'>2</td></tr>" +
      "<tr class='jami'><td>Итого</td><td class='n'>22</td></tr></table>" +
      "<h4>Мини-комплект</h4>" +
      "<p>Нагрузка в 22 Вт требует 0,53 кВт·ч в сутки. В декабре одна панель на 470 Вт (0,57 кВт·ч) закрывает это впритык, две — с запасом. Аккумулятор: 100 А·ч при 24 В, то есть 2,4 кВт·ч — запас на четыре-пять суток. Весь мини-комплект вместе с камерами обходится примерно в 4–6 млн сумов.</p>" +
      "<h4>Что это даёт</h4>" +
      "<p>У этого объекта не будет своей SIM и своего туннеля: он остаётся частью кластера. За пять лет это экономит одну абонентскую плату — 11 млн сумов. Мини-комплект окупается за два года.</p>" +
      "<p class='ogoh'>Аккумулятор и панель на дальнем конце тоже должны быть видны на платформе. Иначе объект становится «слепым»: когда его камера замолчит, будет непонятно, связь это или питание.</p>"}
},

"y10.vlan": {
  yorliq: "Texnik izoh", sarlavha: "Har obyektga o'z VLAN i: nega bu bankda majburiy",
  tana: "<p>Klasterda to'rtta obyektning qurilmalari bitta kommutatorga ulanadi. Hech narsa qilinmasa, ular bitta tarmoqda bo'ladi — ya'ni bir obyektdagi kamera boshqa obyektdagi kamerani, NVR ni va routerni ko'radi.</p>" +
    "<h4>Nima uchun bu xatarli</h4>" +
    "<p>Kamera — sodda kompyuter va uning proshivkasida zaiflik topiladi. Buzilgan kamera orqali tarmoqqa kirgan odam bir zumda to'rtala obyektga ham chiqadi. Bank uchun bu shunchaki texnik masala emas: bir obyektdagi hodisa butun guruh bo'yicha tekshiruvga aylanadi.</p>" +
    "<h4>Qanday quriladi</h4>" +
    "<table><tr><th>VLAN</th><th>Nima turadi</th><th>Kim bilan gaplashadi</th></tr>" +
    "<tr><td class='b' data-tarjimasiz>11–14</td><td>Har obyektning kameralari</td><td>Faqat NVR va shlyuz bilan</td></tr>" +
    "<tr><td class='b' data-tarjimasiz>20</td><td>NVR va klaster shlyuzi</td><td>Kameralar va router bilan</td></tr>" +
    "<tr><td class='b' data-tarjimasiz>99</td><td>Boshqaruv: kommutator, router, ko'prik</td><td>Faqat texnik xodim, tunnel orqali</td></tr></table>" +
    "<h4>Yana bir foyda</h4>" +
    "<p>Obyekt sotilganda uning VLAN i o'chiriladi va kameralari yechib olinadi. Qolgan obyektlarga bu umuman ta'sir qilmaydi: hech qanday sozlamani qayta yozish kerak emas. VLAN siz qurilgan klasterda har chiqish butun tarmoqni qayta ko'rib chiqishni talab qiladi.</p>" +
    "<p class='ogoh'>Boshqaruv VLAN i tashqi tarmoqdan ko'rinmaydi va unga faqat tunnel ichidan kirish mumkin. Kameraning veb-interfeysi ham shu qoidaga bo'ysunadi: uni internetdan ochib bo'lmaydi.</p>",
  manba: [],
  ru: {yorliq: "Техническая справка", sarlavha: "Свой VLAN на каждый объект: почему в банке это обязательно",
    tana: "<p>В кластере устройства четырёх объектов подключены к одному коммутатору. Если ничего не делать, они окажутся в одной сети — то есть камера одного объекта увидит камеру другого, NVR и роутер.</p>" +
      "<h4>Чем это опасно</h4>" +
      "<p>Камера — это простой компьютер, и в её прошивке находят уязвимости. Тот, кто попал в сеть через скомпрометированную камеру, окажется не на одном объекте, а на всех. Для банка это не только техническая проблема: инцидент на одном объекте превращается в проверку по всей группе.</p>" +
      "<h4>Как это строится</h4>" +
      "<table><tr><th>VLAN</th><th>Что в нём</th><th>С кем общается</th></tr>" +
      "<tr><td class='b' data-tarjimasiz>11–14</td><td>Камеры каждого объекта</td><td>Только с NVR и шлюзом</td></tr>" +
      "<tr><td class='b' data-tarjimasiz>20</td><td>NVR и шлюз кластера</td><td>С камерами и роутером</td></tr>" +
      "<tr><td class='b' data-tarjimasiz>99</td><td>Управление: коммутатор, роутер, мосты</td><td>Только техперсонал, через туннель</td></tr></table>" +
      "<h4>Ещё одна польза</h4>" +
      "<p>При продаже объекта его VLAN выключается, а камеры снимаются. На остальные объекты это никак не влияет: переписывать настройки не нужно. В кластере, построенном без VLAN, каждый выход требует пересмотра всей сети.</p>" +
      "<p class='ogoh'>Управляющий VLAN не виден из внешней сети, попасть в него можно только изнутри туннеля. Веб-интерфейс камеры подчиняется тому же правилу: из интернета его не открыть.</p>"}
},

"y10.kamera": {
  yorliq: "Jamoa rahbarlari uchun", sarlavha: "Hodisa kamerada hisoblanadi, serverda emas",
  tana: "<p>Klasterda bu qoida boshqa yechimlardagidan ham qattiqroq turadi, chunki bu yerda kamera oltita va ular bitta kanalni bo'lishadi.</p>" +
    "<table><tr><th>Qayerda hisoblanadi</th><th>Kanalga yuk</th><th>Quvvatga yuk</th></tr>" +
    "<tr><td>Kamerada, ONVIF Profile T</td><td class='n'>20–35 GB/oy</td><td class='n'>asos</td></tr>" +
    "<tr><td>Serverda, doimiy oqim bilan</td><td class='n'>400+ GB/oy</td><td class='n'>+15 Vt</td></tr></table>" +
    "<h4>Kameradan nima talab qilinadi</h4>" +
    "<ul><li><b>ONVIF Profile S va T.</b> Profile T metama'lumot oqimini va kameradagi analitika hodisalarini beradi; usiz hodisani faqat serverda hisoblash qoladi.</li>" +
    "<li><b>Chiziq kesish va hudud.</b> Oddiy piksel harakati emas — u shamolda tebrangan har narsaga ishlaydi.</li>" +
    "<li><b>microSD karta uyasi.</b> Shkaf o'chganda yozuv shu yerda qoladi.</li>" +
    "<li><b>Alohida ONVIF foydalanuvchisi.</b> Faqat oqim va hodisa huquqi bilan, sozlamalarni o'zgartirmaydigan.</li></ul>" +
    "<h4>Birinchi hafta</h4>" +
    "<p>Montajdan keyingi birinchi haftada noto'g'ri hodisalar oqimi ko'p bo'ladi: it, qush, shamolda uchgan paket. Chegaralar shu hafta davomida sozlanadi — minimal obyekt o'lchami, kesish yo'nalishi va vaqt oralig'i. Operatorga bildirishnoma oqim sutkasiga bir-ikkitaga tushgandan keyin yoqiladi, avvalroq emas.</p>",
  manba: [["ONVIF Profile T", "https://www.onvif.org/profiles/profile-t/"]],
  ru: {yorliq: "Для тимлида", sarlavha: "Событие считается в камере, а не на сервере",
    tana: "<p>В кластере это правило действует ещё жёстче, чем в других решениях: здесь шесть камер и они делят один канал.</p>" +
      "<table><tr><th>Где считается</th><th>Нагрузка на канал</th><th>Нагрузка на питание</th></tr>" +
      "<tr><td>В камере, ONVIF Profile T</td><td class='n'>20–35 ГБ/мес</td><td class='n'>база</td></tr>" +
      "<tr><td>На сервере, с постоянным потоком</td><td class='n'>400+ ГБ/мес</td><td class='n'>+15 Вт</td></tr></table>" +
      "<h4>Что требуется от камеры</h4>" +
      "<ul><li><b>ONVIF Profile S и T.</b> Profile T даёт поток метаданных и события аналитики камеры; без него остаётся только счёт на сервере.</li>" +
      "<li><b>Пересечение линии и зона.</b> Не простое движение по пикселям — оно срабатывает на всё, что качается на ветру.</li>" +
      "<li><b>Слот microSD.</b> При отключении шкафа запись останется здесь.</li>" +
      "<li><b>Отдельный пользователь ONVIF.</b> Только поток и события, без права менять настройки.</li></ul>" +
      "<h4>Первая неделя</h4>" +
      "<p>В первую неделю после монтажа поток ложных событий велик: собака, птица, летящий по ветру пакет. Пороги настраиваются как раз в эту неделю — минимальный размер объекта, направление пересечения и временной интервал. Уведомления оператору включаются после того, как поток упадёт до одного-двух в сутки, и не раньше.</p>"}
},

"y10.hodisa": {
  yorliq: "Jamoa rahbarlari uchun", sarlavha: "Ko'prik ortidagi obyektda hodisa: nima o'zgaradi",
  tana: "<p>Kabel bilan ulangan obyekt va radio ko'prik ortidagi obyekt platformada bir xil ko'rinadi. Farq faqat ikki joyda seziladi.</p>" +
    "<table><tr><th>Ko'rsatkich</th><th>Kabel</th><th>Ko'prik</th></tr>" +
    "<tr><td>Hodisaning kechikishi</td><td class='n'>&lt; 1 ms</td><td class='n'>3–6 ms</td></tr>" +
    "<tr><td>Kanal kengligi</td><td class='n'>1 Gbit/s</td><td class='n'>100–500 Mbit/s</td></tr>" +
    "<tr><td>Ob-havoga bog'liqlik</td><td>Yo'q</td><td>Kuchli yomg'irda pasayadi</td></tr>" +
    "<tr><td>Nazorat qilinadigan ko'rsatkich</td><td>Port holati</td><td>Signal darajasi va sifati</td></tr></table>" +
    "<h4>Uch-olti millisekund muhimmi</h4>" +
    "<p>Yo'q. Operator uchun bu sezilmaydi va hodisa zanjirining umumiy vaqti 10–15 soniya. Ko'prikning kechikishi faqat bitta holatda ahamiyatli bo'ladi: bir necha kamera bir vaqtda jonli oqim bersa, kanal to'lib qoladi va tasvir uzilib-uzilib keladi. Shuning uchun operator interfeysida bir vaqtda ikkitadan ortiq oqim ochilmaydi.</p>" +
    "<h4>Ko'prik ortidagi obyektning yozuvi</h4>" +
    "<p>Yozuv shkafdagi NVR ga boradi, lekin kameraning kartasida ham qoladi. Ko'prik uzilganda kamera yozishda davom etadi va aloqa tiklanganda bo'shliqni to'ldiradi. Bu «yo'qolgan yarim soat» muammosini yopadi — tekshiruvda aynan shu yarim soat kerak bo'lishi mumkin.</p>",
  manba: [],
  ru: {yorliq: "Для тимлида", sarlavha: "Событие на объекте за мостом: что меняется",
    tana: "<p>Объект на кабеле и объект за радиомостом выглядят на платформе одинаково. Разница заметна только в двух местах.</p>" +
      "<table><tr><th>Показатель</th><th>Кабель</th><th>Мост</th></tr>" +
      "<tr><td>Задержка события</td><td class='n'>&lt; 1 мс</td><td class='n'>3–6 мс</td></tr>" +
      "<tr><td>Ширина канала</td><td class='n'>1 Гбит/с</td><td class='n'>100–500 Мбит/с</td></tr>" +
      "<tr><td>Зависимость от погоды</td><td>Нет</td><td>Падает при сильном дожде</td></tr>" +
      "<tr><td>Что контролируется</td><td>Состояние порта</td><td>Уровень и качество сигнала</td></tr></table>" +
      "<h4>Важны ли три-шесть миллисекунд</h4>" +
      "<p>Нет. Для оператора это незаметно, а вся цепочка события занимает 10–15 секунд. Задержка моста имеет значение только в одном случае: если несколько камер одновременно отдают живой поток, канал забивается и картинка начинает рваться. Поэтому в интерфейсе оператора одновременно не открывается больше двух потоков.</p>" +
      "<h4>Запись объекта за мостом</h4>" +
      "<p>Запись идёт на NVR в шкафу, но остаётся и на карте камеры. При обрыве моста камера продолжает писать, а после восстановления связи заполняет пробел. Это закрывает проблему «пропавшего получаса» — а в разборе может понадобиться именно он.</p>"}
},

"y10.iqlim": {
  yorliq: "Montajchi uchun", sarlavha: "Shkaf ichidagi iqlim: kondensat sovuqdan xavfliroq",
  tana: "<p>Tashqi shkafda elektronikani namlik o'ldiradi; sovuqning o'zi faqat shu jarayonni tezlashtiradi. Havo soviganda ichkaridagi bug' sirtga o'tiradi va plataning oyoqchalari orasida ingichka suv pardasi hosil qiladi. Bir mavsumdan keyin plata korroziyaga uchraydi.</p>" +
    "<table><tr><th>Element</th><th>Sozlama</th><th>Vazifasi</th></tr>" +
    "<tr><td class='b'>Termostat isitgichi</td><td class='n'>+5 °C da yonadi</td><td>Shudring nuqtasidan uzoqlashtiradi</td></tr>" +
    "<tr><td class='b'>Ventilyator</td><td class='n'>+35 °C da yonadi</td><td>Yozgi issiqni chiqaradi</td></tr>" +
    "<tr><td class='b'>Silikagel</td><td>Yiliga almashtiriladi</td><td>Qolgan namlikni yig'adi</td></tr>" +
    "<tr><td class='b'>Zichlagich</td><td>Yiliga ko'riladi</td><td>Yorilgani namlikni kiritadi</td></tr></table>" +
    "<h4>Isitgich akkumulyator uchun emas</h4>" +
    "<p>Ko'pincha isitgichni faqat LiFePO4 bloki uchun deb o'ylashadi. Aslida uning birinchi vazifasi kommutator va NVR platalarini quruq saqlash. Akkumulyatorning o'z isitgichi alohida bo'ladi va u BMS tomonidan boshqariladi.</p>" +
    "<h4>Yozgi masala</h4>" +
    "<p>Quyosh ostidagi shkaf ichida harorat 60 darajaga chiqadi. Bu SSD ning resursini qisqartiradi va akkumulyatorni tez eskirtiradi. Yechim arzon: shimoliy devor va shkaf ustiga soyabon. Konditsioner qo'yish bu yechimda mumkin emas — u butun quvvat balansini buzadi.</p>" +
    "<p class='ogoh'>Shkaf ichidagi harorat va namlik platformaga chiqariladi. Namlik uch kun ketma-ket 80 foizdan yuqori tursa, vazifa ochiladi: zichlagich yorilgan yoki silikagel to'yingan bo'ladi.</p>",
  manba: [],
  ru: {yorliq: "Для монтажника", sarlavha: "Климат в шкафу: конденсат опаснее мороза",
    tana: "<p>В уличном шкафу электронику убивает не холод, а влага. При остывании воздуха пар оседает на поверхности и образует тонкую плёнку воды между выводами платы. Через сезон плата уходит в коррозию.</p>" +
      "<table><tr><th>Элемент</th><th>Настройка</th><th>Задача</th></tr>" +
      "<tr><td class='b'>Подогрев по термостату</td><td class='n'>включается при +5 °C</td><td>Уводит от точки росы</td></tr>" +
      "<tr><td class='b'>Вентилятор</td><td class='n'>включается при +35 °C</td><td>Выводит летнее тепло</td></tr>" +
      "<tr><td class='b'>Силикагель</td><td>Меняется раз в год</td><td>Забирает остаточную влагу</td></tr>" +
      "<tr><td class='b'>Уплотнитель</td><td>Осматривается раз в год</td><td>Трещина впускает влагу</td></tr></table>" +
      "<h4>Подогрев не для аккумулятора</h4>" +
      "<p>Часто считают, что подогрев нужен только банку LiFePO4. На деле его первая задача — держать сухими платы коммутатора и NVR. У аккумулятора свой отдельный подогрев, и им управляет BMS.</p>" +
      "<h4>Летняя задача</h4>" +
      "<p>В шкафу под солнцем температура доходит до 60 градусов. Это съедает ресурс SSD и ускоренно старит аккумулятор. Решение дешёвое: северная стена и козырёк над шкафом. Ставить кондиционер в этом решении нельзя — он ломает весь энергобаланс.</p>" +
      "<p class='ogoh'>Температура и влажность внутри шкафа выводятся на платформу. Если влажность трое суток подряд держится выше 80 процентов, открывается задача: либо треснул уплотнитель, либо насытился силикагель.</p>"}
},

"y10.adapter": {
  yorliq: "Texnik izoh", sarlavha: "Adapter: bitta ulanish, to'rtta obyekt kartochkasi",
  tana: "<p>Klasterda bank serveriga bitta shlyuz ulanadi, lekin platformada har obyekt o'z kartochkasida turishi kerak. Bu ikkisini bog'laydigan narsa — qurilma identifikatori va uning obyektga bog'lanishi.</p>" +
    "<h4>Bog'lanish qanday saqlanadi</h4>" +
    "<p>Har kamera, datchik va ko'prik o'z <code>device_id</code> siga ega. Reyestrda har identifikator uchun ikkita maydon turadi: qaysi obyektga tegishli va qaysi klaster orqali keladi. Adapter kelgan hodisadan identifikatorni oladi, reyestrdan obyekt kodini topadi va hodisani o'sha kartochkaga qo'yadi.</p>" +
    "<table><tr><th>Maydon</th><th>Misol</th><th>O'zgaradimi</th></tr>" +
    "<tr><td class='b' data-tarjimasiz>device_id</td><td data-tarjimasiz>KAM-0412-03</td><td>Yo'q, qurilmaning umri davomida</td></tr>" +
    "<tr><td class='b'>Obyekt kodi</td><td data-tarjimasiz>OB-0412</td><td>Qurilma ko'chirilsa</td></tr>" +
    "<tr><td class='b'>Klaster kodi</td><td data-tarjimasiz>KL-07</td><td>Shkaf almashsa</td></tr></table>" +
    "<h4>Ikki xil hodisa</h4>" +
    "<p>Obyekt hodisasi (harakat, eshik, tamper) obyekt kartochkasiga tushadi. Klaster hodisasi (shkaf eshigi, zaryadning pasayishi, ko'prik signali, shlyuzning jimligi) esa alohida klaster kartochkasiga. Farq muhim: zaryad pasayishi to'rttala obyektning muammosi bo'ladi va ekranda ham shunday ko'rsatiladi.</p>" +
    "<p class='ogoh'>Klaster hodisasi bo'lganda platforma unga tegishli barcha obyekt kartochkalarida ogohlantirish chizig'ini ko'rsatadi. Bu bo'lmasa, mas'ul xodim o'z obyektiga qarab «hammasi joyida» deb o'ylaydi, aslida shkaf allaqachon zaxirada ishlab turgan bo'ladi.</p>",
  manba: [],
  ru: {yorliq: "Техническая справка", sarlavha: "Адаптер: одно подключение, десять карточек объектов",
    tana: "<p>В кластере к серверу банка подключается один шлюз, но на платформе каждый объект должен жить в своей карточке. Связывают эти две вещи идентификатор устройства и его привязка к объекту.</p>" +
      "<h4>Как хранится привязка</h4>" +
      "<p>У каждой камеры, датчика и моста есть свой <code>device_id</code>. В реестре для каждого идентификатора хранятся два поля: к какому объекту он относится и через какой кластер приходит. Адаптер берёт идентификатор из пришедшего события, находит в реестре код объекта и кладёт событие в нужную карточку.</p>" +
      "<table><tr><th>Поле</th><th>Пример</th><th>Меняется ли</th></tr>" +
      "<tr><td class='b' data-tarjimasiz>device_id</td><td data-tarjimasiz>KAM-0412-03</td><td>Нет, на всё время жизни устройства</td></tr>" +
      "<tr><td class='b'>Код объекта</td><td data-tarjimasiz>OB-0412</td><td>При переносе устройства</td></tr>" +
      "<tr><td class='b'>Код кластера</td><td data-tarjimasiz>KL-07</td><td>При смене шкафа</td></tr></table>" +
      "<h4>Два типа событий</h4>" +
      "<p>Событие объекта (движение, дверь, вскрытие) попадает в карточку объекта. Событие кластера (дверь шкафа, падение заряда, уровень сигнала моста, молчание шлюза) — в отдельную карточку кластера. Разница существенна: падение заряда — проблема не одного объекта, а четырёх, и показывать её нужно именно так.</p>" +
      "<p class='ogoh'>При событии кластера платформа выводит предупреждающую полосу во всех относящихся к нему карточках объектов. Без этого ответственный смотрит на свой объект, видит «всё в порядке», а шкаф в это время уже работает на резерве.</p>"}
},

"y10.operator": {
  yorliq: "Jamoa rahbarlari uchun", sarlavha: "Operator ekrani: obyekt kartochkasi ustida klaster kartochkasi",
  tana: "<p>Klasterda operatorda qo'shimcha bitta ob'ekt paydo bo'ladi — shkafning o'zi. U bank balansida turgan aktiv emas, lekin uning holati to'rtta aktivning ko'rinishini belgilaydi.</p>" +
    "<table><tr><th>Amal</th><th>Kim qila oladi</th><th>Jurnalga yoziladimi</th></tr>" +
    "<tr><td>Jonli oqim va arxivni ochish</td><td>Operator, mas'ul xodim</td><td>Ha</td></tr>" +
    "<tr><td>Bitta kamerani qayta yuklash</td><td>Operator</td><td>Ha</td></tr>" +
    "<tr><td>Ko'prik signalining grafigini ko'rish</td><td>Operator, texnik xodim</td><td>Yo'q</td></tr>" +
    "<tr><td>Kamera sozlamalarini o'zgartirish</td><td>Faqat texnik xodim</td><td>Ha</td></tr>" +
    "<tr><td>Obyektni klasterga qo'shish yoki chiqarish</td><td>Aktiv menejeri</td><td>Ha, sana bilan</td></tr></table>" +
    "<h4>Kamerani qayta yuklash</h4>" +
    "<p>Osilib qolgan kamera klasterda alohida muammo emas: kommutatordagi portning PoE si o'chiriladi va besh soniyadan keyin qaytariladi. Kamera qayta yuklanadi. Bu amal operatorda bo'ladi va jurnalga tushadi, chunki u obyektni bir daqiqaga ko'r qoldiradi.</p>" +
    "<h4>Nima qilib bo'lmaydi</h4>" +
    "<p>Shkafning o'zini masofadan qayta yuklash mumkin emas: routerni o'chirsa, o'chirish buyrug'i o'sha router orqali kelgan bo'ladi. Shuning uchun routerga apparat kuzatuvchi qo'yiladi — u besh daqiqa aloqa bo'lmasa, quvvatni o'zi uzib-ulaydi. Bu 400–600 ming so'mlik qurilma va u yiliga bir-ikki marta obyektga borishni ortiqcha qiladi.</p>",
  manba: [],
  ru: {yorliq: "Для тимлида", sarlavha: "Экран оператора: над карточкой объекта — карточка кластера",
    tana: "<p>В кластере у оператора появляется ещё один объект — сам шкаф. Это не актив на балансе банка, но его состояние определяет видимость четырёх активов.</p>" +
      "<table><tr><th>Действие</th><th>Кто может</th><th>Пишется в журнал</th></tr>" +
      "<tr><td>Открыть живой поток и архив</td><td>Оператор, ответственный</td><td>Да</td></tr>" +
      "<tr><td>Перезагрузить одну камеру</td><td>Оператор</td><td>Да</td></tr>" +
      "<tr><td>Посмотреть график сигнала моста</td><td>Оператор, техперсонал</td><td>Нет</td></tr>" +
      "<tr><td>Изменить настройки камеры</td><td>Только техперсонал</td><td>Да</td></tr>" +
      "<tr><td>Добавить объект в кластер или вывести</td><td>Менеджер активов</td><td>Да, с датой</td></tr></table>" +
      "<h4>Перезагрузка камеры</h4>" +
      "<p>Зависшая камера в кластере — не отдельная проблема: PoE на порту коммутатора гасится и через пять секунд возвращается, камера перезагружается. Это действие доступно оператору и пишется в журнал, потому что на минуту оставляет объект без обзора.</p>" +
      "<h4>Чего сделать нельзя</h4>" +
      "<p>Перезагрузить сам шкаф дистанционно невозможно: команда на выключение роутера придёт через этот же роутер. Поэтому на роутер ставится аппаратный сторож — при отсутствии связи пять минут он сам снимает и подаёт питание. Устройство стоит 400–600 тысяч сумов и снимает один-два выезда на объект в год.</p>"}
},

"y10.montaj": {
  yorliq: "Montajchi uchun", sarlavha: "Ikki kun, uch kishi: vaqt qayerga ketadi",
  tana: "<p>Klaster bir kunda tugamaydi va buni oldindan rejalashtirmaslik eng ko'p uchraydigan xato: brigada kechqurun ishni tugatolmay, ertasi kuni boshqa obyektga ketadi va klaster yarim yig'ilgan holda qoladi.</p>" +
    "<table><tr><th>Ish</th><th class='n'>Vaqt</th><th>Kim</th></tr>" +
    "<tr><td>Shkafni o'rnatish, panel va akkumulyator</td><td class='n'>5 soat</td><td>Ikki kishi</td></tr>" +
    "<tr><td>Bino ichida kabel: har liniya</td><td class='n'>1–2 soat</td><td>Bir kishi</td></tr>" +
    "<tr><td>Optika: tortish va ulash</td><td class='n'>3 soat</td><td>Ikki kishi, asbob bilan</td></tr>" +
    "<tr><td>Ikkita ko'prikni o'rnatish va yo'naltirish</td><td class='n'>4 soat</td><td>Ikki kishi, biri balandda</td></tr>" +
    "<tr><td>Kommutator, VLAN, tunnel, platforma</td><td class='n'>3 soat</td><td>Bir kishi</td></tr>" +
    "<tr class='jami'><td>Jami</td><td class='n'>≈ 2 kun</td><td>Uch kishi</td></tr></table>" +
    "<h4>Nima oldindan tayyorlanadi</h4>" +
    "<ul><li><b>Masofalar o'lchanadi.</b> Masofa joyida, ruletka va dalnomer bilan o'lchanadi. Ko'prik uchun ikki nuqta o'rtasida ko'rinish bor-yo'qligi ham joyida tekshiriladi.</li>" +
    "<li><b>VLAN sxemasi yoziladi.</b> Qaysi obyekt qaysi raqamda — bu joyda o'ylab topilmaydi.</li>" +
    "<li><b>Langar obyekt tasdiqlanadi.</b> Shkaf qayerda turishi aktivlar bo'limi bilan kelishilgan bo'lishi kerak.</li></ul>" +
    "<p class='ogoh'>Ijro sxemasi va kabel jurnali dalolatnomaning bir qismi bo'ladi: har liniyaning uzunligi, turi va qaysi portga ulangani. Ikki yildan keyin nosozlik izlash vaqti to'liq shu hujjatga bog'liq bo'ladi.</p>",
  manba: [],
  ru: {yorliq: "Для монтажника", sarlavha: "Два дня, три человека: куда уходит время",
    tana: "<p>Кластер не собирается за день, и не заложить это в план — самая частая ошибка: бригада не успевает к вечеру, назавтра уезжает на другой объект, и кластер остаётся собранным наполовину.</p>" +
      "<table><tr><th>Работа</th><th class='n'>Время</th><th>Кто</th></tr>" +
      "<tr><td>Установка шкафа, панели и аккумулятор</td><td class='n'>5 часов</td><td>Двое</td></tr>" +
      "<tr><td>Кабель внутри здания: каждая линия</td><td class='n'>1–2 часа</td><td>Один</td></tr>" +
      "<tr><td>Оптика: прокладка и сварка</td><td class='n'>3 часа</td><td>Двое, с инструментом</td></tr>" +
      "<tr><td>Установка и юстировка двух мостов</td><td class='n'>4 часа</td><td>Двое, один на высоте</td></tr>" +
      "<tr><td>Коммутатор, VLAN, туннель, платформа</td><td class='n'>3 часа</td><td>Один</td></tr>" +
      "<tr class='jami'><td>Итого</td><td class='n'>≈ 2 дня</td><td>Трое</td></tr></table>" +
      "<h4>Что готовится заранее</h4>" +
      "<ul><li><b>Меряются расстояния.</b> Не по карте, а на месте. Наличие прямой видимости между точками моста тоже проверяется на месте.</li>" +
      "<li><b>Пишется схема VLAN.</b> Какой объект под каким номером — это не придумывают на площадке.</li>" +
      "<li><b>Утверждается якорный объект.</b> Где стоит шкаф, должно быть согласовано с подразделением активов.</li></ul>" +
      "<p class='ogoh'>Исполнительная схема и кабельный журнал входят в акт: длина каждой линии, её тип и порт подключения. Через два года время поиска неисправности будет зависеть исключительно от этого документа.</p>"}
},

"y10.langar": {
  yorliq: "Moliya va huquq", sarlavha: "Langar obyekt: shkaf qayerda turishi kerak",
  tana: "<p>Bu yechimdagi eng muhim qaror texnik emas. Klaster shkafi qaysi obyektda turishi loyihaning umrini belgilaydi.</p>" +
    "<h4>Xato: eng qulay obyekt</h4>" +
    "<p>Odatda shkaf eng qulay joyga qo'yiladi: elektr bor, yo'l yaqin, xodim tez-tez keladi. Bir yildan keyin shu obyekt birinchi bo'lib sotiladi — chunki u eng yaxshi obyekt edi. Butun klasterni ko'chirish kerak bo'ladi: bu ikki kunlik ish, yangi kabel, ko'priklarni qayta yo'naltirish va qolgan uchta obyektning bir necha kunlik to'xtashi.</p>" +
    "<h4>To'g'ri: eng oxirida sotiladigan obyekt</h4>" +
    "<p>Shkaf realizatsiya rejasida eng oxirida turgan obyektga, yoki eng yaxshisi — bankning o'z filial binosiga o'rnatiladi. Filial binosi sotilmaydi, unda elektr va qo'riqlash bor, xodim har kuni u yerda bo'ladi. Klaster shu binodan boshqarilsa, uning umri obyektlar aylanmasidan uzoq bo'ladi.</p>" +
    "<table><tr><th>Langar</th><th>Xatar</th></tr>" +
    "<tr><td>Filial binosi</td><td class='n'>Eng past</td></tr>" +
    "<tr><td>Uzoq muddat balansda turadigan obyekt</td><td class='n'>Past</td></tr>" +
    "<tr><td>Sotuvga tayyorlanayotgan obyekt</td><td class='n'>Yuqori</td></tr></table>" +
    "<p class='ogoh'>Klaster tuzilishidan oldin realizatsiya rejasi ko'riladi: qaysi obyekt qachon sotiladi. Bu ma'lumot platformada bor va u shkafning joyini texnik qulaylikdan ko'ra to'g'riroq belgilaydi.</p>",
  manba: [],
  ru: {yorliq: "Финансы и право", sarlavha: "Якорный объект: где должен стоять шкаф",
    tana: "<p>Главное решение в этом варианте — не техническое. От того, на каком объекте стоит кластерный шкаф, зависит срок жизни всего проекта.</p>" +
      "<h4>Ошибка: самый удобный объект</h4>" +
      "<p>Обычно шкаф ставят туда, где удобнее: есть электричество, рядом дорога, часто бывает сотрудник. Через год этот объект продаётся первым — именно потому, что он был лучшим. Приходится переносить весь кластер: два дня работы, новый кабель, повторная юстировка мостов и несколько суток простоя трёх оставшихся объектов.</p>" +
      "<h4>Правильно: объект, который продадут последним</h4>" +
      "<p>Шкаф ставится на объект, стоящий в плане реализации последним, а лучше — в здании филиала банка. Здание филиала не продаётся, в нём есть электричество и охрана, сотрудник там каждый день. Если кластер ведётся из этого здания, он переживает оборот объектов.</p>" +
      "<table><tr><th>Якорь</th><th>Риск</th></tr>" +
      "<tr><td>Здание филиала</td><td class='n'>Минимальный</td></tr>" +
      "<tr><td>Объект, который долго пробудет на балансе</td><td class='n'>Низкий</td></tr>" +
      "<tr><td>Объект, готовящийся к продаже</td><td class='n'>Высокий</td></tr></table>" +
      "<p class='ogoh'>Перед сборкой кластера смотрится план реализации: какой объект когда продаётся. Эти данные есть на платформе, и они определяют место шкафа вернее, чем техническое удобство.</p>"}
},

"y10.servis": {
  yorliq: "Montajchi uchun", sarlavha: "Besh yil: bitta nuqtaga boriladi",
  tana: "<p>Klasterning asosiy ustunligi servisda ko'rinadi: yillik ishning hammasi bitta shkafda bajariladi va brigada to'rt obyektga alohida bormaydi.</p>" +
    "<h4>Yillik ko'rikda nima qilinadi</h4>" +
    "<ul><li>Shkaf eshigining zichlagichi ko'riladi va yorilgani almashtiriladi.</li>" +
    "<li>Silikagel almashtiriladi, ventilyator filtri tozalanadi.</li>" +
    "<li>Akkumulyator kontaktlari tortiladi, BMS jurnali olinadi va sig'im o'lchanadi.</li>" +
    "<li>Kommutator, router va ko'priklarning proshivkasi yangilanadi, parollar almashtiriladi.</li>" +
    "<li>Ko'priklarning signal darajasi o'lchanadi va oldingi yil qiymati bilan solishtiriladi.</li>" +
    "<li>Nurning yo'li fotosuratga olinadi: o'sgan daraxt va yangi qurilish shu yerda ko'rinadi.</li></ul>" +
    "<h4>Nima almashtirilmaydi</h4>" +
    "<p>48 voltli LiFePO4 blok besh yilda almashtirilmaydi. Klasterda sutkalik razryad chuqur emas — 100 foizdan 76 foizga tushadi, ya'ni chorak sikl. Besh yilda bu 500 siklga ham yetmaydi, element esa kamida 3000 siklga mo'ljallangan.</p>" +
    "<p class='ogoh'>NVR ning SSD si — bu yechimda eng ko'p yozish yuki tushadigan qism: oltita kamera, uzluksiz. Besh yilda bir marta almashtirish smetaga oldindan kiritiladi, aks holda u kutilmagan xarajat bo'lib chiqadi.</p>",
  manba: [],
  ru: {yorliq: "Для монтажника", sarlavha: "Пять лет: выезжать нужно в одну точку",
    tana: "<p>Главное преимущество кластера проявляется в обслуживании: годовые работы выполняются не на восьми объектах, а в одном шкафу.</p>" +
      "<h4>Что делается на годовом осмотре</h4>" +
      "<ul><li>Осматривается уплотнитель двери шкафа, треснувший меняется.</li>" +
      "<li>Меняется силикагель, чистится фильтр вентилятора.</li>" +
      "<li>Протягиваются контакты аккумулятора, снимается журнал BMS, измеряется ёмкость.</li>" +
      "<li>Обновляются прошивки коммутатора, роутера и мостов, меняются пароли.</li>" +
      "<li>Замеряется уровень сигнала мостов и сравнивается с прошлогодним.</li>" +
      "<li>Фотографируется трасса луча: выросшее дерево и новая стройка видны именно здесь.</li></ul>" +
      "<h4>Что не меняется</h4>" +
      "<p>Банк LiFePO4 на 48 вольт за пять лет не меняется. Суточный разряд в кластере неглубокий — со 100 до 76 процентов, то есть четверть цикла. За пять лет не набирается и 500 циклов, а элемент рассчитан минимум на 3000.</p>" +
      "<p class='ogoh'>SSD в NVR — самая нагруженная записью деталь этого решения: шесть камер, непрерывно. Замена раз в пять лет закладывается в смету заранее, иначе она станет неожиданным расходом.</p>"}
},

"y10.n1": {
  yorliq: "Nosozlik", sarlavha: "Bitta shkaf — bitta buzilish nuqtasi",
  tana: "<p>Markazlashtirish tejaydi va shu bilan birga yangi xatar yaratadi: shkafdagi bitta qurilma to'rtta obyektni bir vaqtda o'chiradi. Buni tan olish va unga qarshi qurish kerak, yashirish emas.</p>" +
    "<table><tr><th>Nima buziladi</th><th>Nima qoladi</th></tr>" +
    "<tr><td>LTE router osilib qoldi</td><td>Yozuv NVR da va kamera kartasida davom etadi</td></tr>" +
    "<tr><td>Kommutator kuydi</td><td>Faqat kamera kartasidagi yozuv</td></tr>" +
    "<tr><td>Akkumulyator BMS i o'chdi</td><td>Hech narsa: hamma jihoz to'xtaydi</td></tr>" +
    "<tr><td>Shkaf eshigi ochildi</td><td>Hodisa allaqachon platformaga ketgan</td></tr></table>" +
    "<h4>To'rtta chora</h4>" +
    "<ul><li><b>Kameradagi karta.</b> Har kamerada microSD: shkaf o'chsa ham yozuv qoladi. 200–300 ming so'm.</li>" +
    "<li><b>Apparat kuzatuvchi.</b> Router besh daqiqa aloqasiz qolsa, kuzatuvchi quvvatni uzib-ulaydi. 400–600 ming so'm.</li>" +
    "<li><b>Shlyuz jimligi bo'yicha hodisa.</b> Platforma besh daqiqa xabar kelmasa, klaster kartochkasida hodisa ochadi va u bog'langan barcha obyektlarda ko'rinadi.</li>" +
    "<li><b>Zaxira jihoz.</b> Bitta kommutator va bitta router omborda turadi. Almashtirish bir soatlik ish, sotib olish esa ikki hafta.</li></ul>" +
    "<p class='ogoh'>Zaxira jihoz sozlamasi bilan birga saqlanadi: konfiguratsiya fayli klaster kartochkasiga ilova qilinadi. Zaxira kommutator bo'lib, uni noldan sozlash kerak bo'lsa, u zaxira emas.</p>",
  manba: [],
  ru: {yorliq: "Отказ", sarlavha: "Один шкаф — одна точка отказа",
    tana: "<p>Централизация экономит и одновременно создаёт новый риск: одно устройство в шкафу гасит четыре объекта разом. Это нужно признать и заложить в проект с самого начала.</p>" +
      "<table><tr><th>Что отказало</th><th>Что остаётся</th></tr>" +
      "<tr><td>Завис роутер LTE</td><td>Запись продолжается на NVR и на карте камеры</td></tr>" +
      "<tr><td>Сгорел коммутатор</td><td>Только запись на карте камеры</td></tr>" +
      "<tr><td>Отключился BMS аккумулятора</td><td>Ничего: встаёт всё оборудование</td></tr>" +
      "<tr><td>Открыли дверь шкафа</td><td>Событие уже ушло на платформу</td></tr></table>" +
      "<h4>Четыре меры</h4>" +
      "<ul><li><b>Карта в камере.</b> microSD в каждой камере: запись сохранится даже при выключенном шкафе. 200–300 тысяч сумов.</li>" +
      "<li><b>Аппаратный сторож.</b> Если роутер пять минут без связи, сторож снимает и подаёт питание. 400–600 тысяч сумов.</li>" +
      "<li><b>Событие по молчанию шлюза.</b> Если пять минут нет сообщений, платформа открывает событие в карточке кластера, и оно видно во всех привязанных объектах.</li>" +
      "<li><b>Подменное оборудование.</b> Один коммутатор и один роутер лежат на складе. Замена — час работы, закупка — две недели.</li></ul>" +
      "<p class='ogoh'>Подменное оборудование хранится вместе с настройками: файл конфигурации прикладывается к карточке кластера. Если подменный коммутатор нужно настраивать с нуля, это не подменный коммутатор.</p>"}
},

"y10.n2": {
  yorliq: "Nosozlik", sarlavha: "Ko'prik ko'rinish chizig'ini yo'qotdi",
  tana: "<p>Bu nosozlik birdan kelmaydi va aynan shuning uchun uni oldindan ko'rish mumkin.</p>" +
    "<table><tr><th>Sabab</th><th>Qanchada</th><th>Signalga ta'siri</th></tr>" +
    "<tr><td>Hovliga qo'yilgan yuk mashinasi</td><td>Bir kunda</td><td class='n'>−10…−20 dB</td></tr>" +
    "<tr><td>O'sgan terak yoki tol</td><td>Ikki-uch yilda</td><td class='n'>−3…−8 dB, asta</td></tr>" +
    "<tr><td>Qo'shni qurgan yangi devor</td><td>Bir oyda</td><td class='n'>−15 dB va undan ko'p</td></tr>" +
    "<tr><td>Kuchli yomg'ir, 60 GHz da</td><td>Bir soatda</td><td class='n'>vaqtincha</td></tr></table>" +
    "<h4>Nima qilinadi</h4>" +
    "<ul><li><b>Asos qiymat.</b> Montajdan keyingi signal darajasi platformada saqlanadi. Undan 6 detsibel pasayish ogohlantirish, 12 detsibel hodisa beradi.</li>" +
    "<li><b>Balandlik.</b> Antenna olti metrdan baland qo'yiladi: shunda yerdagi to'siqlar nurning yo'liga kirmaydi.</li>" +
    "<li><b>Zaxira.</b> Nur atrofidagi bo'shliqqa qo'shimcha zaxira qoldiriladi — daraxt uch yilda ikki metr o'sadi.</li>" +
    "<li><b>Yillik fotosurat.</b> Nurning yo'li har yili bir xil nuqtadan suratga olinadi va oldingisi bilan solishtiriladi.</li></ul>" +
    "<p class='ogoh'>60 gigagertsli ko'prik kuchli yomg'irda vaqtincha sekinlashadi va bu normal. Agar bu klaster uchun qabul qilinmas bo'lsa, o'sha yo'nalishga 5 gigagerts qo'yiladi: u sekinroq, lekin ob-havoga befarq.</p>",
  manba: [],
  ru: {yorliq: "Отказ", sarlavha: "Мост потерял прямую видимость",
    tana: "<p>Этот отказ не приходит внезапно — и именно поэтому его можно увидеть заранее.</p>" +
      "<table><tr><th>Причина</th><th>За какой срок</th><th>Влияние на сигнал</th></tr>" +
      "<tr><td>Припаркованный во дворе грузовик</td><td>За день</td><td class='n'>−10…−20 дБ</td></tr>" +
      "<tr><td>Выросший тополь или ива</td><td>За два-три года</td><td class='n'>−3…−8 дБ, постепенно</td></tr>" +
      "<tr><td>Новая стена у соседа</td><td>За месяц</td><td class='n'>−15 дБ и больше</td></tr>" +
      "<tr><td>Сильный дождь на 60 ГГц</td><td>За час</td><td class='n'>временно</td></tr></table>" +
      "<h4>Что делается</h4>" +
      "<ul><li><b>Базовое значение.</b> Уровень сигнала после монтажа сохраняется на платформе. Падение на 6 дБ даёт предупреждение, на 12 — событие.</li>" +
      "<li><b>Высота.</b> Антенна ставится выше шести метров: тогда наземные препятствия не попадают в трассу луча.</li>" +
      "<li><b>Запас.</b> Вокруг луча оставляется дополнительный свободный объём — дерево вырастает на два метра за три года.</li>" +
      "<li><b>Ежегодное фото.</b> Трасса луча снимается каждый год из одной и той же точки и сравнивается с прошлогодней.</li></ul>" +
      "<p class='ogoh'>Мост на 60 ГГц при сильном дожде временно замедляется, и это нормально. Если для кластера такое недопустимо, на это направление ставится 5 ГГц: медленнее, но к погоде равнодушен.</p>"}
},

"y10.n3": {
  yorliq: "Nosozlik", sarlavha: "Yashin mis kabel orqali kirdi",
  tana: "<p>Bu nosozlik bir soniyada bo'ladi va uni tuzatish uchun jihozni almashtirishdan boshqa yo'l qolmaydi.</p>" +
    "<h4>Nima sodir bo'ladi</h4>" +
    "<p>Yashin binoning yoniga tushadi. Bir binoning yer konturi bir lahzada bir necha kilovoltga ko'tariladi, ikkinchisiniki esa joyida qoladi. Ikki binoni bog'lab turgan mis kabel bu farq uchun yagona yo'l bo'ladi. Oqim kabel orqali o'tadi va yo'ldagi kommutatorni kuydiradi. Ko'pincha butun plata ishdan chiqadi va u bilan birga to'rtta obyekt o'chadi.</p>" +
    "<h4>Uch chora, muhimlik tartibida</h4>" +
    "<ul><li><b>Optika.</b> Binolar orasida faqat optik tola. Metall yo'q — potensial o'tmaydi. Bu yagona to'liq yechim.</li>" +
    "<li><b>Gaz razryadli himoya.</b> Mis kabel majburiy bo'lsa, ikki uchiga qo'yiladi. U oqimni yerga yo'naltiradi, lekin kafolat bermaydi.</li>" +
    "<li><b>Bitta nuqtada yerga ulash.</b> Ekranli kabelning ekrani faqat bitta uchida ulanadi. Ikki uchida ulansa, ekranning o'zi oqim yo'liga aylanadi.</li></ul>" +
    "<h4>Shkafning o'zi</h4>" +
    "<p>Shkaf ham yerga ulanadi va qarshilik o'lchovi dalolatnomaga yoziladi. Panellarning ramkasi ham shu konturga ulanadi: u tomda yoki devorda eng baland metall bo'lib turadi.</p>" +
    "<p class='ogoh'>Bu nosozlikning eng noxush tomoni — u sug'urta hodisasi sifatida tan olinmasligi mumkin. Yashindan himoya loyihada ko'rsatilgan va bajarilgan bo'lishi kerak; bajarilmagan bo'lsa, sug'urtachi buni ekspluatatsiya qoidasining buzilishi deb baholaydi.</p>",
  manba: [],
  ru: {yorliq: "Отказ", sarlavha: "Молния вошла по медному кабелю",
    tana: "<p>Этот отказ происходит за секунду, и устранить его иначе, чем заменой оборудования, уже нельзя.</p>" +
      "<h4>Что происходит</h4>" +
      "<p>Молния бьёт рядом со зданием. Контур заземления одного здания мгновенно поднимается на несколько киловольт, у второго остаётся на месте. Медный кабель, связывающий два здания, оказывается единственным путём для этой разницы. Ток проходит по кабелю и выжигает стоящий на его пути коммутатор. Чаще всего страдает не один порт, а вся плата, и вместе с ней гаснут четыре объекта.</p>" +
      "<h4>Три меры, по значимости</h4>" +
      "<ul><li><b>Оптика.</b> Между зданиями — только оптоволокно. Металла нет, потенциал не проходит. Это единственное полное решение.</li>" +
      "<li><b>Газоразрядная защита.</b> Если медь неизбежна, ставится на обоих концах. Она отводит ток в землю, но гарантии не даёт.</li>" +
      "<li><b>Заземление в одной точке.</b> Экран экранированного кабеля соединяется с землёй только на одном конце. При заземлении с двух сторон сам экран становится путём для тока.</li></ul>" +
      "<h4>Сам шкаф</h4>" +
      "<p>Шкаф тоже заземляется, и результат замера сопротивления вносится в акт. К этому же контуру подключается рама панелей: на крыше или стене она оказывается самым высоким металлом.</p>" +
      "<p class='ogoh'>Самое неприятное в этом отказе — его могут не признать страховым случаем. Молниезащита должна быть предусмотрена проектом и выполнена; если она не выполнена, страховщик расценит это как нарушение правил эксплуатации.</p>"}
}

});

/* --- boshqa yechim sahifalaridan olingan umumiy iboralar --- */
Object.assign(window.MKB_LUGAT = window.MKB_LUGAT || {}, {
"Slaydga qaytish ·": "Вернуться к слайду ·",
"Komplekt": "Комплект",
"Qishki sutka": "Зимние сутки",
"Dekabr balansi": "Декабрьский баланс",
"Besh yil": "Пять лет",
"Nosozlik": "Отказы",
"Savollar": "Вопросы",
"Solishtirish": "Сравнение",
"dekabrda panel beradi": "даёт панель в декабре",
"Dona": "Шт.",
"NVR, SSD bilan": "NVR с SSD",
"Quyoshsiz kunlarni ko'taradi": "Держит дни без солнца",
"Isitgichli yoki past harorat himoyali BMS": "С подогревом или с низкотемпературной защитой BMS",
"tun": "ночь",
"hodisa": "событие",
"sovuq": "холод",
"tong": "утро",
"kunduz": "день",
"yakun": "итог",
"Yadro va ekranlar": "Ядро и экраны",
"Operator nima ko'radi va nima qila oladi": "Что видит оператор и что он может сделать",
"Manbasi": "Источник",
"Yangilanishi": "Обновление",
"Masofadan qilinadi": "Делается удалённо",
"Qilib bo'lmaydi": "Сделать нельзя",
"Qator": "Статья",
"Besh yil ichida nima sarflanadi": "Что расходуется за пять лет",
"Modda": "Статья",
"Qachon": "Когда",
"Besh yilda": "За пять лет",
"Qatnov narxida": "В стоимости выезда",
"Besh yilda almashtirilmaydi": "За пять лет не меняется",
"Uchta nosozlik va ularning oldini olish": "Три отказа и их предупреждение",
"Nosozlik 1": "Отказ 1",
"Oldini olish": "Профилактика",
"Nosozlik 2": "Отказ 2",
"Nosozlik 3": "Отказ 3",
"Qaysi obyektga mos, qaysi biriga emas": "Каким объектам подходит, а каким нет",
"Mos keladi": "Подходит",
"Mos emas": "Не подходит",
"Yetkazib beruvchidan so'raladigan savollar": "Вопросы, которые задают поставщику",
"Savollarning yarmi kabel va radioga tegishli. Xato tanlangan trassa birinchi qishda yoki birinchi momaqaldiroqda o'zini ko'rsatadi va kommutator bilan birga yonadi.": "Половина вопросов — про кабель и радио. Ошибка в трассе проявится в первую же зиму или первую грозу и унесёт с собой коммутатор.",
"O'nta yechim orasida": "Среди десяти решений",
"Uy va kichik ofis": "Дом и малый офис",
"Tashqi perimetr": "Наружный периметр",
"Tashqi perimetr, PTZ": "Наружный периметр, PTZ",
"Ko'p qurilmali obyekt": "Объект с множеством устройств",
"Bir hududdagi obyektlar": "Объекты в одной локации",
"Taqdimotga qaytish ·": "Вернуться к презентации ·",});

/* ------------------------------------------------------------------
   Sahifa matnining ruscha tarjimasi. Kalit — o'zbekcha matn tugunining
   aynan o'zi; uzun batafsil matnlari yozuvlarning "ru" maydonida turadi.
   ------------------------------------------------------------------ */
Object.assign(window.MKB_LUGAT, {

/* --- yo'lakcha va sarlavha --- */
"Narx va iqtisod": "Цена и экономика",
"To'rt obyekt, bitta shkaf va bitta SIM": "Четыре объекта, один шкаф и одна SIM",
"Bu yechimda tejaladigan narsa kamera emas — ulanish. Bir-biriga yaqin turgan uchtadan beshtagacha obyekt bitta shkafga yig'iladi va bankda ular uchun bitta tunnel, bitta abonent to'lovi va bitta servis nuqtasi qoladi. Besh yilda faqat abonent to'lovidagi tejam shkaf narxining katta qismini qoplaydi.":
 "Экономится здесь не камера, а подключение. От трёх до пяти близко стоящих объектов сводятся в один шкаф, и у банка остаются один туннель, одна абонентская плата и одна точка обслуживания. За пять лет одна только экономия на абонентской плате покрывает большую часть стоимости шкафа.",
"butun klaster yuki": "нагрузка всего кластера",
"to'rttasi o'rniga": "вместо четырёх",
"Markaziy klaster shkafi: PoE kommutator, NVR, ikki SIM li LTE router va 48 voltli akkumulyator bir korpusda":
 "Центральный кластерный шкаф: PoE-коммутатор, NVR, LTE-роутер с двумя SIM и аккумулятор на 48 вольт в одном корпусе",

/* --- 01 komplekt --- */
"Shkafda nima bor": "Что стоит в шкафу",
"Namuna sifatida to'rtta obyektli klaster olingan: markaziy ombor, undan 85 metrdagi sex, hovlining narigi boshidagi garaj va 1,2 kilometrdagi chekka uchastka. Shkaf markaziy omborning devoriga o'rnatiladi.":
 "За образец взят кластер из четырёх объектов: центральный склад, цех в 85 метрах от него, гараж в дальнем конце двора и удалённый участок в 1,2 километра. Шкаф крепится на стену центрального склада.",
"Tashqi shkaf, 12U": "Уличный шкаф, 12U",
"Hamma jihozni bir joyda saqlaydi": "Держит всё оборудование в одном месте",
"Termostatli isitgich va ventilyator bilan": "С подогревом по термостату и вентилятором",
"Kamida IP55, quyoshdan soyabon bilan": "Не ниже IP55, с козырьком от солнца",
"Kameralarni ham ulaydi, ham oziqlantiradi": "И подключает камеры, и питает их",
"802.3at, VLAN, boshqariladigan": "802.3at, VLAN, управляемый",
"Yozuvni joyida saqlaydi": "Хранит запись на месте",
"ONVIF, 14 kunlik arxiv, SSD": "ONVIF, архив на 14 суток, SSD",
"Butun klaster uchun yagona tunnel": "Единственный туннель на весь кластер",
"VPN, SNMP v3, sanoat korpusi": "VPN, SNMP v3, промышленное исполнение",
"48 V LiFePO4 blok": "Банк LiFePO4 на 48 В",
"280 A·soat, taxminan 13,4 kVt·soat": "280 А·ч, около 13,4 кВт·ч",
"MPPT kontroller va DC-DC": "Контроллер MPPT и DC-DC",
"Panelni va 54 voltli PoE liniyasini boshqaradi": "Ведёт панели и линию PoE на 54 вольта",
"Modbus yoki MQTT chiqishi bilan": "С выходом Modbus или MQTT",
"Kunduzi blokni to'ldiradi": "Днём пополняет банк",
"Qishki burchakka sozlanadigan ramka": "Рама с регулировкой под зимний угол",
"Radio ko'prik, juft": "Радиомост, комплект",
"Kabel tortib bo'lmaydigan obyektni ulaydi": "Подключает объект, куда не протянуть кабель",
"Ko'rish chizig'i, qattiq mahkamlash": "Прямая видимость, жёсткое крепление",
"Kameralar bu jadvalga kirmaydi: ular har obyektga alohida hisoblanadi va odatda obyektiga ikkitadan to'rttagacha bo'ladi. Sakkiz portli kommutator to'rt obyektga ikkitadan kamerani ko'taradi; kamera soni sakkizdan oshsa, smetaga ikkinchi kommutator va uning 8 vattlik iste'moli kiritiladi. Klaster shkafining o'zi 20–40 mln so'm turadi, kameralar har obyektga yana 2–3 mln so'm qo'shadi.":
 "Камеры в эту таблицу не входят: они считаются по каждому объекту отдельно, обычно от двух до четырёх на объект. Восьмипортовый коммутатор вытягивает по две камеры на четырёх объектах; если камер больше восьми, в смету входит второй коммутатор и его 8 Вт потребления. Сам кластерный шкаф стоит 20–40 млн сумов, камеры добавляют ещё 2–3 млн на объект.",
"Shkaf eng oxirida sotiladigan obyektga o'rnatiladi. Langar obyekt realizatsiya qilinsa, butun klaster ko'chadi: bu ikki kunlik ish va yangi ko'prik yo'nalishini qaytadan o'lchash.": "Шкаф ставится на тот объект, который продадут последним. Если якорный объект реализуют, переезжает весь кластер: это двухдневная работа и повторный замер новых направлений мостов.",

/* --- 02 ulanish --- */
"To'rt obyekt to'rt xil usulda ulanadi": "Четыре объекта подключаются четырьмя разными способами",
"Ulanish turini masofa belgilaydi. Bu yerdagi xato butun klasterda eng qimmatga tushadi: noto'g'ri tortilgan mis kabel birinchi momaqaldiroqda kommutatorni kuydiradi. Sxemadagi yashil halqali bo'g'inni bosing.":
 "Тип связи определяет расстояние. Ошибка здесь обходится дороже всего в кластере: неправильно протянутый медный кабель выжигает коммутатор при первой же грозе. Нажмите на звено с зелёным кружком.",
"Obyekt A · markaziy ombor": "Объект A · центральный склад",
"4 kamera, mis kabel 45 m, PoE": "4 камеры, медный кабель 45 м, PoE",
"Obyekt B · sex": "Объект B · цех",
"Alohida bino, 85 m — optika bilan": "Отдельное здание, 85 м — по оптике",
"Obyekt C · garaj": "Объект C · гараж",
"240 m, radio ko'prik, o'z oziqlanishi": "240 м, радиомост, своё питание",
"Obyekt D · chekka uchastka": "Объект D · удалённый участок",
"1,2 km, radio ko'prik va o'z paneli": "1,2 км, радиомост и своя панель",
"KLASTER SHKAFI": "КЛАСТЕРНЫЙ ШКАФ",
"PoE kommutator · 8 port": "PoE-коммутатор · 8 портов",
"Har obyektga o'z VLAN i": "Каждому объекту свой VLAN",
"NVR · SSD, 14 kun": "NVR · SSD, 14 суток",
"Yozuv hududdan chiqmaydi": "Запись не покидает площадку",
"LTE router · ikki SIM": "LTE-роутер · две SIM",
"Butun klasterga bitta tunnel": "Один туннель на весь кластер",
"48 V LiFePO4 · 13,4 kVt·soat": "LiFePO4 48 В · 13,4 кВт·ч",
"Isitgichli, 5–6 kunlik zaxira": "С подогревом, запас на 5–6 суток",
"MPPT va DC-DC": "MPPT и DC-DC",
"Inversor yo'q: hamma narsa doimiy tokda": "Инвертора нет: всё на постоянном токе",
"Bank serveri va MKB": "Сервер банка и MKB",
"Bitta ulanish, to'rtta obyekt kartochkasi": "Одно подключение, четыре карточки объектов",
"Optika": "Оптика",
"Radio": "Радио",
"Uzluksiz chiziq — mis va optika, uzuq chiziq — radio. Radio ko'prik faqat ma'lumot uzatadi, quvvat emas.":
 "Сплошная линия — медь и оптика, пунктир — радио. Радиомост передаёт только данные, но не питание.",
"To'rt xil ulanish: bino ichida mis kabel va PoE, qo'shni binoga optika, hovli bo'ylab va uzoqqa radio ko'prik. Har biri o'z masofa chegarasiga va o'z nosozligiga ega.":
 "Четыре типа подключения: медь и PoE внутри здания, оптика в соседнее здание, радиомост через двор и на дальнюю дистанцию. У каждого свой предел по расстоянию и свой отказ.",
"Mis kabel va PoE": "Медный кабель и PoE",
"m, qat'iy chegara": "м, жёсткий предел",
"Ethernet segmenti 100 metr bilan cheklangan va bu standartning o'zgarmas raqami. Amalda alyuminiy o'zakli arzon kabelda PoE 60–70 metrdayoq uziladi.":
 "Сегмент Ethernet ограничен ста метрами, и это неизменная цифра стандарта. На практике на дешёвом кабеле с алюминиевой жилой PoE отваливается уже на 60–70 метрах.",
"Alohida binoga optika": "В отдельное здание — оптика",
"volt aloqasi": "вольт связи",
"Ikki bino orasidagi mis kabel ikki yerning potensiallarini ulaydi. Optikada metall yo'q — momaqaldiroq kommutatorga yetib bormaydi.":
 "Медный кабель между двумя зданиями соединяет потенциалы двух контуров заземления. В оптике металла нет — гроза до коммутатора не доходит.",
"Radio ko'prik": "Радиомост",
"dB tushsa — ogohlantirish": "дБ падения — предупреждение",
"Ko'prik signal darajasi montajdan keyin asos qiymat sifatida saqlanadi. Undan 6 detsibel pastga tushish ko'rinish chizig'i yopilganini bildiradi.":
 "Уровень сигнала моста сохраняется после монтажа как базовое значение. Падение от него на 6 децибел означает, что прямая видимость перекрыта.",

/* --- 03 qishki sutka --- */
"Qishki sutka: ishlab chiqarish hovlisi, 21-dekabr":
 "Зимние сутки: производственный двор, 21 декабря",
"Klaster shkafi o'nta yechim orasida eng og'ir yukni ko'taradi: bitta manba to'rtta obyektni boqadi. Eng qisqa kunda balans musbat qoladi, lekin zaxirasi atigi 14 foiz — bu butun loyihadagi eng tor joy.": "Кластерный шкаф несёт самую тяжёлую нагрузку из десяти решений: один источник питает четыре объекта. В самый короткий день баланс остаётся положительным, но запас всего 14 процентов — это самое узкое место во всём проекте.",
"Blok 76 foizda, yuk 90 vatt": "Банк на 76 процентах, нагрузка 90 Вт",
"Kechasi oltita kameraning IR yoritgichi yonadi va yuk 71 vattdan 90 vattga chiqadi. Shkaf ichida harorat +3 °C, termostat isitgichni hali yoqmagan.":
 "Ночью включаются ИК-прожекторы шести камер, и нагрузка поднимается с 71 до 90 Вт. Внутри шкафа +3 °C, термостат подогрев ещё не включил.",
"Tungi sarf: 90 Vt × 14,5 soat": "Ночной расход: 90 Вт × 14,5 часа",
"Garajda harakat, radio ko'prik orqali": "Движение в гараже, через радиомост",
"Obyekt C dagi kamera harakatni o'zi hisoblaydi va hodisani radio ko'prik orqali shkafga yuboradi. Ko'prikda qo'shilgan kechikish 3–6 millisekund — bu operator uchun sezilmaydi. Yozuv garajdagi kameraning kartasida ham, shkafdagi NVR da ham qoladi.":
 "Камера на объекте C сама обсчитывает движение и отправляет событие в шкаф через радиомост. Задержка, добавленная мостом, — 3–6 миллисекунд, для оператора она незаметна. Запись остаётся и на карте камеры в гараже, и на NVR в шкафу.",
"Epizod: hodisa va kadr, 40 kilobayt": "Эпизод: событие и кадр, 40 килобайт",
"Shkaf ichida nol daraja, isitgich yonadi": "В шкафу ноль градусов, включается подогрев",
"Tashqarida minus to'rt. Termostat +5 °C da 30 vattli isitgichni yoqadi va u tongga qadar taxminan uch soat ishlaydi. Isitgichning birinchi vazifasi — kommutator platasini shudringdan saqlash: kondensat elektronikani sovuqdan tezroq o'ldiradi.": "На улице минус четыре. Термостат при +5 °C включает обогреватель на 30 Вт, и до утра тот работает около трёх часов. Первая его задача — уберечь плату коммутатора от росы: конденсат убивает электронику быстрее мороза.",
"Isitgich: 0,09 kVt·soat": "Подогрев: 0,09 кВт·ч",
"Quyosh chiqadi, IR o'chadi": "Солнце взошло, ИК выключается",
"Yuk 90 vattdan 71 vattga tushadi. Panel birinchi soatda deyarli hech narsa bermaydi: Toshkentda 21-dekabrda quyosh peshinda ufqdan atigi 25 daraja ko'tariladi.":
 "Нагрузка падает с 90 до 71 Вт. В первый час панель почти ничего не отдаёт: в Ташкенте 21 декабря солнце к полудню поднимается над горизонтом всего на 25 градусов.",
"To'rt panel kunlik ulushini beradi": "Четыре панели отдают свою дневную долю",
"1,88 kilovattlik panel qishki burchakda dekabrda 2,28 kVt·soat beradi. Bu sutkalik 2,0 kVt·soat sarfdan katta, lekin zaxira atigi 0,28 kVt·soat — ya'ni 14 foiz.":
 "Панели на 1,88 кВт при зимнем угле дают в декабре 2,28 кВт·ч. Это больше суточного расхода в 2,0 кВт·ч, но запас составляет всего 0,28 кВт·ч — то есть 14 процентов.",
"Kunlik ishlab chiqarish: 2,28 kVt·soat": "Суточная выработка: 2,28 кВт·ч",
"Sutkalik balans va zaxira": "Баланс за сутки и запас",
"Ishlab chiqarish 2,28, sarf 2,0 kVt·soat. Ortiqcha 0,28 kVt·soat blokka ketdi. Ketma-ket besh bulutli kun boshlansa, 13,4 kVt·soatlik blok besh-olti kunga yetadi — keyin operator obyektga chiqishi kerak.":
 "Выработка 2,28, расход 2,0 кВт·ч. Избыток в 0,28 кВт·ч ушёл в банк. Если начнутся пять пасмурных суток подряд, банка на 13,4 кВт·ч хватит на пять-шесть дней — дальше оператору придётся выехать на объект.",
"Sutkalik balans: +0,28 kVt·soat": "Баланс за сутки: +0,28 кВт·ч",

/* --- 04 dekabr balansi --- */
"Dekabr balansi: 14 foizlik zaxira": "Декабрьский баланс: запас в 14 процентов",
"Klaster shkafi to'rt obyektni boqadi va shuning uchun uning yuki alohida kameranikidan besh barobar katta. Qishki hisobda bu farq darhol ko'rinadi: dekabr ustuni qizil chiziqdan atigi bir barmoq baland turadi.":
 "Кластерный шкаф кормит четыре объекта, поэтому его нагрузка впятеро больше, чем у отдельной камеры. В зимнем расчёте эта разница видна сразу: декабрьский столбец стоит над красной чертой всего на палец.",
"Klaster yuki 2,0 kVt·soat": "Нагрузка кластера 2,0 кВт·ч",
"Dekabrda zaxira atigi 14 foiz": "В декабре запас всего 14 процентов",
"Yozda panel klaster yukidan qariyb uch barobar ko'p beradi, dekabrda esa ortiqcha atigi 0,28 kVt·soat qoladi. Shu sababli beshinchi panel kerak bo'lmagan taqdirda ham ramkada uning joyi qoldiriladi.":
 "Летом панели дают почти втрое больше нагрузки кластера, а в декабре избытка остаётся всего 0,28 кВт·ч. Поэтому место под пятую панель оставляют в раме, даже если она пока не нужна.",
"Inversor yo'q": "Инвертора нет",
"Vt bekorga": "Вт впустую",
"Shkafdagi hamma jihoz doimiy tokda ishlaydi: kommutator 54 voltda, NVR va router 12 voltda. Inversor qo'yilsa, u yuk bo'lmaganda ham 15–20 vatt yeydi — bu sutkasiga 0,4 kVt·soat, ya'ni dekabrdagi butun zaxiradan katta.":
 "Всё оборудование в шкафу работает на постоянном токе: коммутатор на 54 вольтах, NVR и роутер на 12. Инвертор, если его поставить, съест 15–20 Вт даже без нагрузки — это 0,4 кВт·ч в сутки, больше всего декабрьского запаса.",
"Nega 48 volt": "Почему 48 вольт",
"amper, 7,5 o'rniga": "ампера вместо 7,5",
"90 vattlik yuk 12 voltda 7,5 amper, 48 voltda 1,9 amper tortadi. Kabeldagi isish tokning kvadratiga bog'liq, ya'ni o'n olti barobar kamayadi. Bundan tashqari 48 volt PoE liniyasiga to'g'ridan-to'g'ri, kam yo'qotish bilan o'giriladi.":
 "Нагрузка в 90 Вт при 12 вольтах берёт 7,5 ампера, при 48 — 1,9. Нагрев в кабеле зависит от квадрата тока, то есть падает в шестнадцать раз. Кроме того, 48 вольт преобразуются в линию PoE напрямую и почти без потерь.",
"Uzoq obyekt o'zini boqadi": "Дальний объект питается сам",
"km — kabel emas": "км — это не кабель",
"Radio ko'prik ma'lumot uzatadi, quvvat emas. 1,2 kilometrdagi uchastkaga o'z paneli, 100 amper-soatlik akkumulyatori va ko'prikning uzoq uchi qo'yiladi: taxminan 4–6 mln so'mlik alohida mini komplekt.":
 "Радиомост передаёт данные, но не питание. На участок в 1,2 километра ставятся своя панель, аккумулятор на 100 А·ч и дальний конец моста — отдельный мини-комплект примерно на 4–6 млн сумов."
});

Object.assign(window.MKB_LUGAT, {

/* --- 05 ma'lumot yo'li --- */
"Hodisa shkafdan platformagacha": "Событие от шкафа до платформы",
"Klasterda bankka bitta ulanish chiqadi, lekin platformada to'rtta alohida obyekt kartochkasi turadi. Buni ushlab turadigan narsa — VLAN va qurilma identifikatori. Yashil halqali bo'g'inni bosing.":
 "В кластере наружу идёт одно подключение, а на платформе живут четыре отдельные карточки объектов. Держатся они на VLAN и идентификаторе устройства. Нажмите на звено с зелёным кружком.",
"Kamera, obyekt ichida": "Камера, внутри объекта",
"Harakat va chiziq kesish kameraning o'zida hisoblanadi, yozuv kartada dublikat qilinadi":
 "Движение и пересечение линии считаются в самой камере, запись дублируется на карту",
"Oqim shkafdan tashqariga chiqmaydi": "Поток за пределы шкафа не выходит",
"PoE kommutator va VLAN": "PoE-коммутатор и VLAN",
"Har obyekt o'z VLAN ida: bir obyektning kamerasi boshqasining qurilmasini ko'rmaydi":
 "Каждый объект в своём VLAN: камера одного объекта не видит устройства другого",
"Boshqaruv VLAN i alohida": "Управляющий VLAN отдельно",
"NVR va klaster shlyuzi": "NVR и шлюз кластера",
"Yozuv joyida qoladi; tashqariga hodisa yozuvi, kadr va telemetriya chiqadi":
 "Запись остаётся на месте; наружу уходят запись события, кадр и телеметрия",
"Klip faqat so'rov bo'yicha": "Клип — только по запросу",
"LTE router va tunnel": "LTE-роутер и туннель",
"Butun klaster uchun bitta VPN; ikkinchi SIM birinchisi yo'qolganda avtomatik ulanadi":
 "Один VPN на весь кластер; вторая SIM подключается автоматически при пропадании первой",
"Ikki operator, avtomatik o'tish": "Два оператора, автоматическое переключение",
"Qurilma identifikatoridan obyekt kodini topadi va hodisani kerakli kartochkaga qo'yadi":
 "По идентификатору устройства находит код объекта и кладёт событие в нужную карточку",
"To'rtta obyekt kartochkasi va ularning ustida bitta klaster kartochkasi":
 "Четыре карточки объектов и одна карточка кластера над ними",
"Klaster reyestri": "Реестр кластеров",
"Shkaf holati barcha obyektga ta'sir qiladi": "Состояние шкафа влияет на все объекты",
"Kamera tashqi tarmoqqa umuman chiqmaydi: u faqat o'z VLAN ida NVR va shlyuz bilan gaplashadi.":
 "Камера во внешнюю сеть не выходит вовсе: она общается только с NVR и шлюзом внутри своего VLAN.",
"Klasterning butun ma'nosi shu sxemada: tashqariga bitta ulanish chiqadi, ichkarida esa obyektlar bir-biridan VLAN bilan ajratilgan holda qoladi.":
 "Весь смысл кластера в этой схеме: наружу идёт одно подключение, а внутри объекты остаются разделёнными между собой через VLAN.",

/* --- 06 operator --- */
"Klasterda operatorda qo'shimcha bitta ekran paydo bo'ladi: shkafning o'zi. Balansda u alohida aktiv sifatida turmaydi, lekin uning holati to'rtta obyektning ko'rinishini belgilaydi.": "В кластере у оператора появляется ещё один экран — сам шкаф. На балансе он отдельным активом не стоит, но от его состояния зависит видимость четырёх объектов.",
"Har obyektning hodisalari va jonli oqimi": "События и живой поток каждого объекта",
"Shkaf akkumulyatorining zaryadi": "Заряд аккумулятора шкафа",
"MPPT, Modbus": "MPPT, Modbus",
"Shkaf ichidagi harorat va namlik": "Температура и влажность внутри шкафа",
"Termostat datchigi": "Датчик термостата",
"Har ko'prikning signal darajasi": "Уровень сигнала каждого моста",
"Ko'prik SNMP": "Мост, SNMP",
"Qaysi SIM faol va trafik hisobi": "Какая SIM активна и счётчик трафика",
"Router SNMP v3": "Роутер, SNMP v3",
"Shkaf eshigining ochilishi": "Открытие двери шкафа",
"Quruq kontakt datchigi": "Датчик на сухом контакте",
"Qaysi kamera qaysi obyektga tegishli": "Какая камера к какому объекту относится",
"O'zgarishda": "При изменении",
"Jonli oqim va arxivni ochish, klip so'rash, bitta kamerani qayta yuklash, ko'prik signalining haftalik grafigini ko'rish, shkafning quvvat tarixini ochish. Kamera sozlamalarini o'zgartirish huquqi texnik xodimga beriladi va har o'zgarish jurnalga tushadi.": "Открыть живой поток и архив, запросить клип, перезагрузить одну камеру, посмотреть недельный график сигнала моста, открыть историю питания шкафа. Право менять настройки камеры отдано техническому персоналу, и каждое изменение попадает в журнал.",
"Shkafni masofadan qayta yuklash. LTE router osilib qolsa, uni faqat joyda o'chirib-yoqish mumkin. Shuning uchun routerga apparat kuzatuvchi qo'yiladi: u besh daqiqa aloqa bo'lmasa, quvvatni o'zi uzib-ulaydi.":
 "Перезагрузить шкаф дистанционно. Если LTE-роутер завис, снять и подать питание можно только на месте. Поэтому на роутер ставится аппаратный сторож: при отсутствии связи пять минут он сам передёргивает питание.",

/* --- 07 montaj --- */
"Montaj: ikki kun, uch kishi": "Монтаж: два дня, три человека",
"Klaster bir kunda tugamaydi: kabel tortish, optikani ulash va ikkita ko'prikni yo'naltirish alohida vaqt oladi. Ishning tartibi quyidagicha.":
 "За один день кластер не собрать: прокладка кабеля, сварка оптики и юстировка двух мостов требуют отдельного времени. Порядок работ такой.",
"Langar obyekt tanlanadi: klaster shkafi eng oxirida sotiladigan obyektga o'rnatiladi, eng qulayiga emas. Bu qaror aktivlar bo'limi bilan kelishiladi.":
 "Выбирается якорный объект: кластерный шкаф ставится на тот объект, который продадут последним, а не на самый удобный. Это решение согласуется с подразделением активов.",
"Shkaf shimoliy devorga, quyoshdan soyabon bilan o'rnatiladi. Kunduzgi quyosh ostida shkaf ichi 60 darajaga chiqadi va SSD bilan akkumulyatorni birdan eskirtiradi.":
 "Шкаф крепится на северную стену, с козырьком от солнца. Под дневным солнцем внутри шкафа доходит до 60 градусов, и это разом старит и SSD, и аккумулятор.",
"Bino ichida mis kabel tortiladi: faqat toza mis, 24 AWG. Har liniyaning uzunligi o'lchanadi va dalolatnomaga yoziladi.":
 "Внутри здания прокладывается медный кабель: только чистая медь, 24 AWG. Длина каждой линии измеряется и вносится в акт.",
"Alohida binoga optika tortiladi. Mis kabel ikki binoni bog'lamaydi — bu qoida buziladigan joy va u eng qimmatga tushadi.":
 "В отдельное здание прокладывается оптика. Медь два здания не связывает — именно это правило нарушают чаще всего, и обходится это дороже всего.",
"Ko'priklar olti metrdan baland qo'yiladi va yo'naltiriladi. Montajdan keyingi signal darajasi asos qiymat sifatida platformaga yoziladi.":
 "Мосты поднимаются выше шести метров и юстируются. Уровень сигнала после монтажа заносится на платформу как базовое значение.",
"Panel va akkumulyator ulanadi, MPPT dan telemetriya olinadi, shkaf eshigiga datchik qo'yiladi va yerga ulash qarshiligi o'lchanadi.":
 "Подключаются панели и аккумулятор, снимается телеметрия с MPPT, на дверь шкафа ставится датчик, замеряется сопротивление заземления.",
"Har kamera o'z VLAN iga kiritiladi, platformada to'rt obyekt kartochkasi ochiladi va har birida video ko'rinadi — shundan keyin dalolatnoma imzolanadi.":
 "Каждая камера заводится в свой VLAN, на платформе открываются четыре карточки объектов и в каждой появляется видео — только после этого подписывается акт.",
"Har liniyaning uzunligi va turi ijro sxemasiga tushadi. Ikki yildan keyin nosozlik bo'lganda bu sxema bir kunlik izlanishni bir soatga aylantiradi — montajchi esa allaqachon boshqa ishda bo'ladi.":
 "Длина и тип каждой линии попадают в исполнительную схему. Через два года, когда случится отказ, эта схема превратит день поисков в час — монтажник к тому времени будет уже на другой работе.",

/* --- 08 narx --- */
"Narx: 20–40 mln so'm va besh yillik farq": "Цена: 20–40 млн сумов и разница за пять лет",
"Jadvaldagi summa butun klasterga tegishli — kameralarsiz. Tejam takrorlanmaydigan qatorlardan chiqadi: bitta router, bitta NVR, bitta SIM va bitta servis nuqtasi, shuning uchun uni bir martalik narx bo'yicha solishtirish noto'g'ri bo'ladi.": "Сумма в таблице относится ко всему кластеру — без камер. Экономия возникает на неповторяющихся строках: один роутер, один NVR, одна SIM и одна точка обслуживания, поэтому сравнивать это решение по разовой цене неверно.",
"Tashqi shkaf 12U, termostat, isitgich, ventilyator":
 "Уличный шкаф 12U, термостат, подогрев, вентилятор",
"Panel 4 × 470 Vt va qishki ramka": "Панели 4 × 470 Вт и зимняя рама",
"48 V LiFePO4 13,4 kVt·soat va MPPT": "LiFePO4 48 В на 13,4 кВт·ч и MPPT",
"PoE kommutator, NVR, LTE router, DC-DC": "PoE-коммутатор, NVR, LTE-роутер, DC-DC",
"Radio ko'prik, ikki juft": "Радиомосты, два комплекта",
"Optika, mis kabel, yashin himoyasi, montaj":
 "Оптика, медный кабель, молниезащита, монтаж",
"Jami, bir klaster": "Итого, один кластер",
"Taxminiy baho, 2026-yil sentabr holatiga. Har obyektga kamera va kabel yana 2–3 mln so'm qo'shadi. 1,2 kilometrdagi uchastkaning o'z paneli va akkumulyatori alohida 4–6 mln so'm.":
 "Оценка ориентировочная, по состоянию на сентябрь 2026 года. Камеры и кабель добавляют на каждый объект ещё 2–3 млн сумов. Своя панель и аккумулятор участка в 1,2 километра — отдельные 4–6 млн сумов.",
"Besh yillik abonent to'lovi": "Абонентская плата за пять лет",
"mln → 18 mln": "млн → 18 млн",
"To'rt obyekt alohida ulansa, to'rtta SIM kerak: oyiga 180 ming so'mdan, besh yilda 43 mln so'm. Klasterda bitta SIM qoladi — kengaytirilgan tarifda oyiga 300 ming, besh yilda 18 mln so'm. Faqat shu qatorda 25 mln so'm farq bor: bu shkaf narxining yarmidan ko'pi.":
 "Если четыре объекта подключать по отдельности, нужны четыре SIM: по 180 тысяч сумов в месяц, за пять лет 43 млн. В кластере остаётся одна SIM — на расширенном тарифе 300 тысяч в месяц, за пять лет 18 млн. Только на этой строке разница 25 млн сумов — больше половины стоимости шкафа.",
"Servis nuqtasi": "Точка обслуживания",
"ta, 4 ta o'rniga": "вместо четырёх",
"Yillik ko'rik, parol almashtirish, proshivka yangilash va akkumulyator tekshiruvi bitta shkafda bajariladi. Amalda bu yiliga 6–8 qatnovni ikkitaga tushiradi.": "Годовой осмотр, смена паролей, обновление прошивок и проверка аккумулятора выполняются в одном шкафу. На практике это сокращает 6–8 выездов в год до двух.",
"Klaster narxi obyektlar orasida qanday taqsimlanishi buxgalteriya bilan oldindan kelishiladi. Eng sodda va bahs chiqarmaydigan yo'l: shkaf langar obyektning hisobida turadi, qolgan obyektlarga esa faqat o'z kameralari va kabeli yoziladi.":
 "Как стоимость кластера распределяется между объектами, согласуется с бухгалтерией заранее. Самый простой и не вызывающий споров путь: шкаф числится за якорным объектом, а на остальные относятся только их камеры и кабель.",

/* --- 09 besh yil --- */
"SIM va trafik, bitta kengaytirilgan tarif": "SIM и трафик, один расширенный тариф",
"Oyma-oy, 250–350 ming so'm": "Ежемесячно, 250–350 тысяч сумов",
"15–21 mln so'm": "15–21 млн сумов",
"Shkaf servisi: zichlagich, ventilyator filtri, silikagel":
 "Обслуживание шкафа: уплотнитель, фильтр вентилятора, силикагель",
"Yiliga 1 marta": "1 раз в год",
"3–6 mln so'm": "3–6 млн сумов",
"Panel tozalash": "Мойка панелей",
"Yiliga 2 marta": "2 раза в год",
"Ko'priklarni qayta yo'naltirish": "Повторная юстировка мостов",
"Bo'rondan keyin, o'rtacha 2 marta": "После шторма, в среднем 2 раза",
"1–3 mln so'm": "1–3 млн сумов",
"NVR ning SSD si": "SSD в NVR",
"Besh yilda 1 marta": "1 раз за пять лет",
"1–2 mln so'm": "1–2 млн сумов",
"48 V LiFePO4 blok ": "Банк LiFePO4 на 48 В ",
"Shkafning zichlagichi va silikageli eng arzon, lekin eng ko'p unutiladigan modda. Zichlagich qotib yorilsa, shkaf ichiga namlik kiradi va bir mavsumda kommutator platasi ishdan chiqadi: 3 million so'mlik ta'mir bilan birga to'rtta obyekt bir necha kun nazoratsiz qoladi.": "Уплотнитель шкафа и силикагель — самое дешёвое и самое забываемое. Если уплотнитель задубел и потрескался, внутрь идёт влага, и за один сезон плата коммутатора выходит из строя: вместе с ремонтом на 3 млн сумов четыре объекта на несколько дней остаются без контроля.",

/* --- 10 nosozlik --- */
"Shkaf o'chdi va to'rt obyekt birdan ko'r bo'ldi":
 "Шкаф выключился, и четыре объекта разом ослепли",
"Bu yechimning tug'ma zaifligi: markazlashtirish tejaydi, lekin u bilan birga yagona buzilish nuqtasini ham yaratadi. Router osilib qolishi, akkumulyator BMS ining o'chishi yoki shkaf eshigining ochilishi to'rtta obyektni bir vaqtda nazoratsiz qoldiradi.":
 "Врождённая слабость этого решения: централизация экономит, но вместе с тем создаёт единую точку отказа. Зависший роутер, отключившийся BMS аккумулятора или вскрытая дверь шкафа оставляют четыре объекта без контроля одновременно.",
"Har kamerada microSD karta bo'ladi va yozuv shkafdan mustaqil davom etadi. Routerga apparat kuzatuvchi qo'yiladi: besh daqiqa aloqa bo'lmasa, u quvvatni uzib-ulaydi. Shlyuz jim qolgan besh daqiqadan keyin platformada hodisa ochiladi va klaster kartochkasiga yoziladi, shunda operator to'rtta alohida ogohlantirish o'rniga bittasini ko'radi. Zaxira kommutator va router omborda saqlanadi.": "В каждой камере стоит microSD, и запись продолжается независимо от шкафа. На роутер ставится аппаратный сторож: если связи нет пять минут, он передёргивает питание. Через пять минут молчания шлюза платформа открывает событие и пишет его в карточку кластера — оператор видит одно предупреждение вместо четырёх. Запасной коммутатор и роутер лежат на складе.",
"Ko'prik ko'rinish chizig'ini yo'qotdi": "Мост потерял прямую видимость",
"Radio ko'prik ikki nuqta o'rtasida to'siqsiz ko'rinishni talab qiladi. Uni yopadigan narsalar odatdagi: hovliga qo'yilgan yuk mashinasi, uch yilda o'sgan terak, qo'shni qurgan yangi devor. Daraja bir necha hafta davomida asta pasayadi, keyin bir kunda chegaradan o'tib aloqa uziladi.": "Радиомост требует прямой видимости между двумя точками. Перекрывает её обычное: поставленный во дворе грузовик, выросший за три года тополь, новая стена у соседа. Уровень неделями сползает вниз, а потом за сутки переходит порог, и связь обрывается.",
"Ko'prik olti metrdan baland qo'yiladi va nurning yo'lida chetiga qadar zaxira qoldiriladi. Montajdan keyingi signal darajasi asos qiymat sifatida saqlanadi; undan 6 detsibel pasayish platformada ogohlantirish beradi. Yillik ko'rikda nurning yo'li fotosuratga olinadi va oldingi yil bilan solishtiriladi.":
 "Мост поднимается выше шести метров, а на трассе луча оставляется запас до краёв. Уровень сигнала после монтажа сохраняется как базовый; падение от него на 6 децибел даёт предупреждение на платформе. На годовом осмотре трасса луча фотографируется и сравнивается с прошлым годом.",
"Yashin mis kabel orqali kirdi": "Молния вошла по медному кабелю",
"Ikki bino orasida tortilgan mis kabel ikkala binoning yer konturini bir-biriga ulaydi. Yaqin tushgan yashin ikki yer o'rtasida bir necha kilovoltlik farq hosil qiladi va bu farq kabel orqali kommutatorning portlarini kuydiradi. Amalda butun plata ishdan chiqadi va kommutator almashtiriladi.": "Медный кабель между двумя зданиями соединяет их контуры заземления. Близкий разряд молнии создаёт между двумя землями разницу в несколько киловольт, и она через кабель выжигает порты коммутатора. На практике выходит из строя вся плата, и коммутатор меняют целиком.",
"Binolar orasida faqat optika tortiladi: unda metall yo'q va potensial o'tmaydi. Optika imkonsiz bo'lgan joyda ikki uchiga gaz razryadli himoya qo'yiladi va ekranli kabel bitta nuqtada yerga ulanadi. Shkafning o'zi ham yerga ulanadi va qarshilik o'lchovi dalolatnomaga yoziladi.":
 "Между зданиями прокладывается только оптика: металла в ней нет и потенциал не проходит. Там, где оптика невозможна, на оба конца ставится газоразрядная защита, а экранированный кабель заземляется в одной точке. Сам шкаф тоже заземляется, и результат замера сопротивления вносится в акт.",

/* --- 11 qaysi obyektga --- */
"Bitta ishlab chiqarish hovlisidagi bir nechta bino: ombor, sex, garaj, nazorat punkti.":
 "Несколько зданий в одном производственном дворе: склад, цех, гараж, контрольный пункт.",
"Bir mahalla yoki bir ko'cha bo'yidagi uchtadan beshtagacha obyekt: ular orasida ko'rinish chizig'i bor.":
 "От трёх до пяти объектов в одной махалле или вдоль одной улицы: между ними есть прямая видимость.",
"Bankning bitta filialiga biriktirilgan va yaqin joylashgan obyektlar guruhi.":
 "Группа близко расположенных объектов, закреплённых за одним филиалом банка.",
"Obyektlari uzoq vaqt balansda turadigan va tez sotilmaydigan guruh.":
 "Группа, объекты которой долго стоят на балансе и быстро не продаются.",
"Viloyat bo'ylab tarqalgan obyektlar: ko'rinish chizig'i yo'q, radio ko'prik ishlamaydi.":
 "Объекты, разбросанные по области: прямой видимости нет, радиомост не работает.",
"Yakka obyekt: bitta obyekt uchun klaster shkafi qimmat va ortiqcha.":
 "Одиночный объект: кластерный шкаф под один объект дорог и избыточен.",
"Zich shahar qurilishi: binolar nurni to'sadi va yangi qurilish har yili vaziyatni o'zgartiradi.":
 "Плотная городская застройка: здания перекрывают луч, а новое строительство каждый год меняет картину.",
"Bir necha oy ichida sotiladigan obyektlar guruhi: klaster tarqalib ketadi va shkaf bo'sh qoladi.":
 "Группа объектов, которые продадут в ближайшие месяцы: кластер распадётся и шкаф останется не у дел.",

/* --- 12 savollar --- */
"Kabel toza misdanmi va uning kesimi qancha?":
 "Кабель из чистой меди и какое у него сечение?",
"Alyuminiy o'zakli kabelda PoE 60–70 metrdayoq uziladi. Sertifikat va namuna so'raladi.":
 "На кабеле с алюминиевой жилой PoE отваливается уже на 60–70 метрах. Запрашиваются сертификат и образец.",
"Binolar orasiga optika tortiladimi yoki mis kabel?":
 "Между зданиями прокладывается оптика или медь?",
"Mis kabel bo'lsa, yashindan himoya va yerga ulash sxemasi alohida so'raladi.":
 "Если медь, отдельно запрашиваются схема молниезащиты и заземления.",
"Ko'prik uchun ko'rinish chizig'i hisobi berilganmi?":
 "Дан ли расчёт прямой видимости для моста?",
"Masofa, balandlik va yo'ldagi to'siqlar hisobi taklifga ilova qilinadi.":
 "Расчёт расстояния, высоты и препятствий на трассе прикладывается к предложению.",
"Radio ko'prik qaysi diapazonda ishlaydi va uni ishlatish uchun ruxsat kerakmi?":
 "В каком диапазоне работает радиомост и нужно ли разрешение на его использование?",
"Chastota masalasi aloqa idorasidan yozma tasdiqlanadi, og'zaki javob yetarli emas.":
 "Вопрос частот подтверждается письменно в ведомстве связи, устного ответа недостаточно.",
"Kommutator boshqariladiganmi va VLAN ni qo'llab-quvvatlaydimi?":
 "Коммутатор управляемый и поддерживает ли он VLAN?",
"VLAN bo'lmasa, bir obyektning kamerasi boshqasining tarmog'ini ko'radi.":
 "Без VLAN камера одного объекта видит сеть другого.",
"Shkafning himoya darajasi va isitgichi bormi?":
 "Какая у шкафа степень защиты и есть ли подогрев?",
"IP55 dan past shkafda birinchi qish namlikni ichkariga kiritadi.":
 "В шкафу ниже IP55 первая же зима заведёт влагу внутрь.",
"Dekabr uchun energiya balansi hisobi berilganmi?":
 "Дан ли расчёт энергетического баланса на декабрь?",
"Bu yechimda yuk boshqa yechimlardan ikki-uch barobar katta, shuning uchun qishki hisob majburiy.":
 "Нагрузка здесь в два-три раза выше, чем в других решениях, поэтому зимний расчёт обязателен.",
"Kameralarda microSD karta va undagi yozuvni platformadan olish imkoni bormi?":
 "Есть ли в камерах карта microSD и можно ли забрать запись с неё через платформу?",
"Shkaf o'chganda yozuvni faqat shu karta saqlab qoladi.":
 "Когда шкаф выключен, запись сохранит только эта карта.",
"Routerda apparat kuzatuvchi bormi?": "Есть ли в роутере аппаратный сторож?",
"Aloqa uzilganda qayta yuklashning masofadan boshqa yo'li yo'q.":
 "При обрыве связи другого способа перезагрузить его удалённо нет.",
"Ijro sxemasi va kabel jurnali topshiriladimi?":
 "Передаются ли исполнительная схема и кабельный журнал?",
"Ikki yildan keyingi nosozlikni izlash vaqti shu hujjatga bog'liq.":
 "Время поиска отказа через два года зависит именно от этого документа."
});
