/* Yechim 07 — ko'chma quvvat stansiyasi. Sahifadagi bosiladigan bloklar. */
window.MKB_BATAFSIL = Object.assign(window.MKB_BATAFSIL || {}, {

"y07.yuk": {
  yorliq: "Montajchi uchun", sarlavha: "Yigirma vatt qayerdan yig'iladi",
  tana: "<p>Avtonomiya hisobining birinchi raqami — yuk. U o'lchovdan olinadi: bazadagi sutkalik sinovda stansiyaning o'z displeyi haqiqiy chiqish quvvatini ko'rsatadi.</p>" +
    "<table><tr><th>Iste'molchi</th><th>Vt</th></tr>" +
    "<tr><td>IP kamera, 2 dona, tunda IR bilan</td><td class='n'>10</td></tr>" +
    "<tr><td>4G router</td><td class='n'>5</td></tr>" +
    "<tr><td>Video domofon, kutish rejimi</td><td class='n'>3</td></tr>" +
    "<tr><td>Datchiklar hubi</td><td class='n'>2</td></tr>" +
    "<tr class='jami'><td>Jami · sutkasiga 0,48 kVt·soat</td><td class='n'>20</td></tr></table>" +
    "<h4>Nima yukni oshiradi</h4>" +
    "<ul><li>Uchinchi va to'rtinchi kamera: har biri IR bilan 5 Vt.</li>" +
    "<li>Doimiy yoqilgan IR yoritgich. Hovlida chiroq bo'lsa, kamera oq yorug'likda ishlaydi va IR o'chadi.</li>" +
    "<li>PTZ kamera: aylanish paytida 15–25 Vt, ya'ni butun komplekt yukiga teng.</li></ul>" +
    "<p class='ogoh'>Yukni 30 Vt dan 20 Vt ga tushirish jadvalni uch kundan besh kunga uzaytiradi va oyiga to'rtta qatnovni tejaydi. Bu stansiya sig'imini oshirishdan ancha arzon.</p>",
  manba: [],
  ru: {yorliq: "Для монтажника", sarlavha: "Из чего складываются двадцать ватт",
    tana: "<p>Первая цифра в расчёте автономии — нагрузка. Она берётся не из паспорта оборудования, а из замера: на суточном испытании на базе собственный дисплей станции показывает фактическую выходную мощность.</p>" +
      "<table><tr><th>Потребитель</th><th>Вт</th></tr>" +
      "<tr><td>IP-камера, 2 шт., ночью с ИК</td><td class='n'>10</td></tr>" +
      "<tr><td>4G-маршрутизатор</td><td class='n'>5</td></tr>" +
      "<tr><td>Видеодомофон, режим ожидания</td><td class='n'>3</td></tr>" +
      "<tr><td>Хаб датчиков</td><td class='n'>2</td></tr>" +
      "<tr class='jami'><td>Итого · 0,48 кВт·ч в сутки</td><td class='n'>20</td></tr></table>" +
      "<h4>Что увеличивает нагрузку</h4>" +
      "<ul><li>Третья и четвёртая камеры: по 5 Вт каждая с ИК.</li>" +
      "<li>Постоянно включённый ИК-прожектор. Если во дворе есть фонарь, камера работает в белом свете, а ИК выключается.</li>" +
      "<li>PTZ-камера: до 15–25 Вт при повороте, то есть на уровне всего комплекта.</li></ul>" +
      "<p class='ogoh'>Снижение нагрузки с 30 до 20 Вт растягивает график с трёх суток до пяти и экономит четыре выезда в месяц. Это заметно дешевле, чем наращивать ёмкость станции.</p>"}
},

"y07.avtonom": {
  yorliq: "Montajchi uchun", sarlavha: "Qishki avtonomiya qanday hisoblanadi",
  tana: "<p>Hisob uch bosqichdan iborat va har bosqichda sig'imning bir qismi yo'qoladi. Yozgi katalog raqamini to'g'ridan-to'g'ri jadvalga qo'yish — yanvarda obyektni nazoratsiz qoldirishning eng oddiy yo'li.</p>" +
    "<ol><li><b>Nominal sig'im</b> — masalan 2 048 Vt·soat.</li>" +
    "<li><b>Foydali qism, 85 foiz</b> — BMS quyi chegarani ushlab turadi va DC o'zgartkich yo'qotadi: 1 740 Vt·soat.</li>" +
    "<li><b>Qishki tuzatish, yana 10 foiz</b> — 0…+5 °C da litiy-temir-fosfat elementining ichki qarshiligi o'sadi: 1 566 Vt·soat.</li></ol>" +
    "<p>Bu 20 vattlik yukka bo'linganda 78 soat, ya'ni 3,1 kun chiqadi. Jadval esa 3 kunga tuziladi: oxirgi bir necha soat qatnovning kechikishiga zaxira bo'lib qoladi.</p>" +
    "<table><tr><th>Sig'im</th><th>20 Vt</th><th>30 Vt</th></tr>" +
    "<tr><td>1 kVt·soat</td><td class='n'>1,6 kun</td><td class='n'>1,1 kun</td></tr>" +
    "<tr><td>2 kVt·soat</td><td class='n'>3,1 kun</td><td class='n'>2,1 kun</td></tr>" +
    "<tr><td>4 kVt·soat</td><td class='n'>6,2 kun</td><td class='n'>4,2 kun</td></tr></table>" +
    "<p class='ogoh'>Stansiya isitilmaydigan xonada tursa, qishki tuzatish 15–20 foizgacha chiqadi. Shuning uchun u imkon qadar bino ichiga, tashqi devordan uzoqroqqa qo'yiladi.</p>",
  manba: [["EcoFlow DELTA 2 Max", "https://us.ecoflow.com/products/delta-2-max-portable-power-station"]],
  ru: {yorliq: "Для монтажника", sarlavha: "Как считается зимняя автономия",
    tana: "<p>Расчёт состоит из трёх шагов, и на каждом теряется часть ёмкости. Подставить в график летнюю цифру из каталога — самый простой способ оставить объект без контроля в январе.</p>" +
      "<ol><li><b>Номинальная ёмкость</b> — например, 2 048 Вт·ч.</li>" +
      "<li><b>Полезная часть, 85%</b> — BMS удерживает нижний порог, DC-преобразователь теряет своё: 1 740 Вт·ч.</li>" +
      "<li><b>Зимняя поправка, ещё 10%</b> — при 0…+5 °C растёт внутреннее сопротивление литий-железо-фосфатного элемента: 1 566 Вт·ч.</li></ol>" +
      "<p>При нагрузке 20 Вт это 78 часов, то есть 3,1 суток. График при этом строится на 3 суток: последние часы остаются запасом на опоздание выезда.</p>" +
      "<table><tr><th>Ёмкость</th><th>20 Вт</th><th>30 Вт</th></tr>" +
      "<tr><td>1 кВт·ч</td><td class='n'>1,6 сут</td><td class='n'>1,1 сут</td></tr>" +
      "<tr><td>2 кВт·ч</td><td class='n'>3,1 сут</td><td class='n'>2,1 сут</td></tr>" +
      "<tr><td>4 кВт·ч</td><td class='n'>6,2 сут</td><td class='n'>4,2 сут</td></tr></table>" +
      "<p class='ogoh'>Если станция стоит в неотапливаемом помещении, зимняя поправка составляет не 10, а 15–20%. Поэтому её размещают внутри здания, подальше от наружной стены.</p>"}
},

"y07.almash": {
  yorliq: "Montajchi uchun", sarlavha: "Almashtirish tartibi: qirq daqiqa",
  tana: "<p>Almashtirishni bank xodimining o'zi bajaradi, pudratchi jalb qilinmaydi. Tartib yozma va o'zgarmas.</p>" +
    "<ol><li>Chiqishdan oldin platformada komplekt raqami, obyekt manzili va kalit kimdaligi tekshiriladi.</li>" +
    "<li>Quti ochiladi — bu ochilish datchigi orqali hodisa bo'lib tushadi va vazifaga bog'lanadi, shuning uchun soxta signal chiqmaydi.</li>" +
    "<li>To'la stansiya yoniga qo'yiladi va 12 V chiqish ulanadi, keyingina bo'shagani uziladi. Shunda kameralar umuman o'chmaydi.</li>" +
    "<li>Ulanish tartibi buzilsa, uzilish 20 soniyagacha cho'ziladi; platforma buni «qisqa uzilish» deb belgilaydi va hodisa ochmaydi.</li>" +
    "<li>Yangi zaryad foizi, komplekt raqami va vaqt telefondan reyestrga yoziladi. Vazifa shu yozuv bilan yopiladi.</li>" +
    "<li>Bo'shagan stansiya mashinada tik holatda, qo'zg'almas qilib mahkamlanadi.</li></ol>" +
    "<p class='ogoh'>Vazifa «bajarildi» deb faqat platformadagi zaryad foizi yangilangandan keyin yopiladi. Og'zaki hisobot qabul qilinmaydi: aynan shu yerda ikki kunlik uzilishlar paydo bo'ladi.</p>",
  manba: [],
  ru: {yorliq: "Для монтажника", sarlavha: "Порядок замены: сорок минут",
    tana: "<p>Замену выполняет сотрудник банка, подрядчик к этому не привлекается. Порядок письменный и неизменный.</p>" +
      "<ol><li>Перед выездом на платформе проверяются номер комплекта, адрес объекта и то, у кого ключ.</li>" +
      "<li>Открывается ящик — это проходит событием с датчика вскрытия и привязывается к задаче, поэтому ложного сигнала не возникает.</li>" +
      "<li>Полная станция ставится рядом и подключается к линии 12 В, и только затем отключается разряженная. При таком порядке камеры не гаснут вовсе.</li>" +
      "<li>При нарушении порядка перерыв растягивается до 20 секунд; платформа помечает это как «короткий перерыв» и события не открывает.</li>" +
      "<li>Новый процент заряда, номер комплекта и время вносятся в реестр с телефона. Задача закрывается этой записью.</li>" +
      "<li>Разряженная станция перевозится в вертикальном положении и закрепляется.</li></ol>" +
      "<p class='ogoh'>Задача считается выполненной только после обновления процента заряда на платформе. Устный отчёт не принимается: именно здесь возникают двухсуточные перерывы.</p>"}
},

"y07.narx": {
  yorliq: "Moliya va huquq", sarlavha: "Narxni nima belgilaydi",
  tana: "<p>Smetaning yarmidan ko'pi ikkita stansiyaga to'g'ri keladi. Qolgan qatorlar boshqa yechimlar bilan bir xil.</p>" +
    "<table><tr><th>Omil</th><th>Ta'siri</th></tr>" +
    "<tr><td class='b'>Sig'im</td><td>2 kVt·soatdan 4 kVt·soatga o'tish stansiya narxini ikki barobarga yaqin oshiradi va jadvalni atigi uch kunga uzaytiradi</td></tr>" +
    "<tr><td class='b'>Ikkinchi stansiya</td><td>Majburiy. Bittasi bilan obyekt zaryadlash vaqtida nazoratsiz qoladi</td></tr>" +
    "<tr><td class='b'>Kamera soni</td><td>Har qo'shimcha kamera 0,5–1 mln so'm va jadvaldan yarim kun</td></tr>" +
    "<tr><td class='b'>Komplektlar soni</td><td>Viloyatga 5–10 komplekt olinsa, sozlash va o'qitish bir marta qilinadi</td></tr></table>" +
    "<h4>Nima hisobga kirmaydi</h4>" +
    "<p>Smetada ko'rinmaydigan, lekin eng katta doimiy xarajat — qatnov. Uch kunlik jadvalda oyiga o'nta qatnov chiqadi va bu 1,5–3 mln so'm. Yechimni taqqoslashda u albatta qo'shiladi, aks holda ko'chma stansiya qog'ozda LiFePO4 shkafidan arzon ko'rinadi.</p>" +
    "<p class='ogoh'>Uch oydan ortiq muddatga bu yechim tanlanmaydi. Chegarani logistika qo'yadi: to'rtinchi oyda qatnovlar 04-yechimning butun smetasini yeb qo'yadi.</p>",
  manba: [["EcoFlow DELTA 2 Max", "https://us.ecoflow.com/products/delta-2-max-portable-power-station"]],
  ru: {yorliq: "Финансы и право", sarlavha: "Что определяет стоимость",
    tana: "<p>Больше половины сметы приходится на две станции. Остальные статьи те же, что и в других решениях.</p>" +
      "<table><tr><th>Фактор</th><th>Влияние</th></tr>" +
      "<tr><td class='b'>Ёмкость</td><td>Переход с 2 на 4 кВт·ч почти удваивает стоимость станции и растягивает график всего на трое суток</td></tr>" +
      "<tr><td class='b'>Вторая станция</td><td>Обязательна. С одной объект остаётся без контроля на время зарядки</td></tr>" +
      "<tr><td class='b'>Количество камер</td><td>Каждая дополнительная камера — 0,5–1 млн сумов и полсуток графика</td></tr>" +
      "<tr><td class='b'>Количество комплектов</td><td>При закупке 5–10 комплектов на область настройка и обучение делаются один раз</td></tr></table>" +
      "<h4>Что не попадает в смету</h4>" +
      "<p>Самый крупный постоянный расход в смете не виден — это выезды. При трёхсуточном графике их выходит десять в месяц, то есть 1,5–3 млн сумов. При сравнении решений эту сумму обязательно добавляют, иначе на бумаге мобильная станция выглядит дешевле шкафа LiFePO4.</p>" +
      "<p class='ogoh'>На срок свыше трёх месяцев это решение не выбирают. Предел не в цене, а в логистике: на четвёртый месяц выезды съедают всю смету решения 04.</p>"}
},

"y07.stansiya": {
  yorliq: "Montajchi uchun", sarlavha: "Stansiyaga qo'yiladigan talablar",
  tana: "<p>Bozorda o'nlab model bor va ularning ko'pchiligi bu ish uchun yaramaydi. Tanlov beshta shart bo'yicha qilinadi.</p>" +
    "<ul><li><b>Kimyo — LiFePO4.</b> NMC elementli stansiya arzonroq, lekin 800–1 000 sikldan keyin sig'imini yo'qotadi va sovuqqa yomonroq chidaydi.</li>" +
    "<li><b>Sikl resursi kamida 3 000</b>, 80 foiz razryadda o'lchangan holda.</li>" +
    "<li><b>12 V DC chiqish kamida 10 A uzluksiz.</b> Katalogdagi cho'qqi qiymat bu yerda hisobga olinmaydi.</li>" +
    "<li><b>Chiqishning avtomatik o'chirish taymerini butunlay o'chirish imkoni.</b> Bu shartsiz talab.</li>" +
    "<li><b>Hujjatlashtirilgan API.</b> Bo'lmasa, zaryad platformada ko'rinmaydi.</li></ul>" +
    "<h4>Namuna</h4>" +
    "<p>EcoFlow DELTA 2 Max shu talablarga mos keladigan sinf: 2 048 Vt·soat, 3 000 sikl, ochiq dasturchi platformasi. Bu tanlangan model emas — tender uchun mo'ljal.</p>" +
    "<p class='ogoh'>Og'irlik ham talab: 4 kVt·soatlik stansiya 30 kg dan ortiq bo'ladi va uni yolg'iz xodim zinapoyadan ko'tara olmaydi. 2 kVt·soat sinfi bir kishilik almashtirish uchun chegara.</p>",
  manba: [["EcoFlow DELTA 2 Max", "https://us.ecoflow.com/products/delta-2-max-portable-power-station"]],
  ru: {yorliq: "Для монтажника", sarlavha: "Требования к станции",
    tana: "<p>На рынке десятки моделей, и большинство для этой задачи не годится. Выбор делается по пяти условиям.</p>" +
      "<ul><li><b>Химия — LiFePO4.</b> Станция на NMC дешевле, но теряет ёмкость после 800–1 000 циклов и хуже переносит холод.</li>" +
      "<li><b>Ресурс не менее 3 000 циклов</b>, измеренный при глубине разряда 80%.</li>" +
      "<li><b>Выход 12 В DC не менее 10 А длительно.</b> Не пиковое значение, а длительное.</li>" +
      "<li><b>Возможность полностью отключить таймер автоотключения выхода.</b> Требование безусловное.</li>" +
      "<li><b>Документированный API.</b> Без него заряд на платформе не виден.</li></ul>" +
      "<h4>Ориентир</h4>" +
      "<p>EcoFlow DELTA 2 Max — класс, отвечающий этим требованиям: 2 048 Вт·ч, 3 000 циклов, открытая платформа для разработчиков. Это не выбранная модель, а ориентир для тендера.</p>" +
      "<p class='ogoh'>Вес — тоже требование: станция на 4 кВт·ч весит более 30 кг, и один сотрудник не поднимет её по лестнице. Класс 2 кВт·ч — предел для замены силами одного человека.</p>"}
},

"y07.kamera": {
  yorliq: "Jamoa rahbarlari uchun", sarlavha: "Kamera nega SD kartaga ham yozadi",
  tana: "<p>Ko'chma komplektda NVR yo'q: u qo'shimcha 6–10 vatt yeydi va jadvalni qisqartiradi. Uning o'rnini kameraning o'z kartasi bosadi.</p>" +
    "<h4>Ikki qavatli yozuv</h4>" +
    "<ul><li><b>Joyda:</b> kamera harakat aniqlanganda SD kartaga yozadi. Aloqa uzilsa ham yozuv yo'qolmaydi.</li>" +
    "<li><b>Serverda:</b> platforma hodisa kadrini va so'ralgan klipni bank omboriga oladi. Sudda dalil sifatida shu nusxa ishlatiladi, chunki uning xeshi qabul paytida hisoblangan.</li></ul>" +
    "<h4>Karta haqida</h4>" +
    "<p>Doimiy qayta yozuv oddiy kartani 12–18 oyda ishdan chiqaradi. Kuzatuv uchun mo'ljallangan, yuqori chidamli karta olinadi va servis jadvaliga almashtirish kiritiladi. Karta o'lgani platformada ko'rinmaydi — shuning uchun almashtirish kalendar bo'yicha qilinadi.</p>" +
    "<p class='ogoh'>Komplekt yechib olinganda karta formatlanadi. Oldingi obyektning kadrlari keyingi obyektga o'tib qolishi mumkin emas.</p>",
  manba: [],
  ru: {yorliq: "Для тимлида", sarlavha: "Почему камера пишет ещё и на карту",
    tana: "<p>В мобильном комплекте нет NVR: он добавляет 6–10 Вт и укорачивает график. Его роль берёт на себя карта самой камеры.</p>" +
      "<h4>Двухслойная запись</h4>" +
      "<ul><li><b>Локально:</b> камера пишет на SD-карту при детекции движения. Даже при обрыве связи запись не теряется.</li>" +
      "<li><b>На сервере:</b> платформа забирает кадр события и запрошенный клип в хранилище банка. В суде доказательством служит именно эта копия, поскольку её хеш вычислен в момент приёма.</li></ul>" +
      "<h4>О карте</h4>" +
      "<p>Постоянная перезапись выводит обычную карту из строя за 12–18 месяцев. Берётся карта повышенной выносливости, рассчитанная на видеонаблюдение, а замена вносится в график обслуживания. Отказ карты на платформе не виден — поэтому меняют по календарю.</p>" +
      "<p class='ogoh'>При демонтаже комплекта карта форматируется. Кадры предыдущего объекта не должны переходить на следующий.</p>"}
},

"y07.router": {
  yorliq: "Jamoa rahbarlari uchun", sarlavha: "Router: ikki SIM, watchdog va tunnel",
  tana: "<p>Ko'chma komplektda router yagona chiqish nuqtasi, shuning uchun unga qo'yiladigan talablar kameradan qat'iyroq.</p>" +
    "<ul><li><b>9–30 V DC kirish.</b> AC adapter bilan keladigan router bu yechimga yaramaydi: invertor yoqishga majbur qiladi.</li>" +
    "<li><b>Ikki SIM.</b> Asosiy operator signali yo'qolsa, ikkinchisiga o'tadi. Ko'rikda ikkala operatorning RSRP qiymati o'lchanadi va dalolatnomaga yoziladi.</li>" +
    "<li><b>Watchdog.</b> Belgilangan manzil 10 daqiqa javob bermasa, modem qayta yuklanadi. Bu bo'sh obyektdagi eng foydali funksiya: joyga borib qayta yoqadigan odam yo'q.</li>" +
    "<li><b>WireGuard yoki IPsec.</b> Kameralar ochiq internetga chiqmaydi, port ochilmaydi.</li>" +
    "<li><b>SNMP v3.</b> Signal darajasi, ishlash vaqti va SIM holati platformaga shu orqali keladi.</li></ul>" +
    "<h4>Trafik</h4>" +
    "<p>Faqat hodisa va kadr rejimida oyiga 0,8 GB. Kuniga 30 daqiqa jonli video ko'rilsa, 4,3 GB. Tarif shu ikkinchi raqamga qarab olinadi, aks holda oy oxirida tezlik cheklanadi va jonli oqim ochilmaydi.</p>",
  manba: [],
  ru: {yorliq: "Для тимлида", sarlavha: "Маршрутизатор: две SIM, watchdog и туннель",
    tana: "<p>В мобильном комплекте маршрутизатор — единственная точка выхода, поэтому требования к нему жёстче, чем к камере.</p>" +
      "<ul><li><b>Вход 9–30 В DC.</b> Маршрутизатор с сетевым адаптером для этого решения не подходит: он вынуждает включать инвертор.</li>" +
      "<li><b>Две SIM.</b> При пропадании сигнала основного оператора происходит переход на второго. На осмотре замеряются значения RSRP обоих операторов и вносятся в акт.</li>" +
      "<li><b>Watchdog.</b> Если заданный адрес не отвечает 10 минут, модем перезагружается. На пустом объекте это самая полезная функция: перезагрузить вручную некому.</li>" +
      "<li><b>WireGuard или IPsec.</b> Камеры не выходят в открытый интернет, порты не пробрасываются.</li>" +
      "<li><b>SNMP v3.</b> Уровень сигнала, время работы и состояние SIM приходят на платформу именно отсюда.</li></ul>" +
      "<h4>Трафик</h4>" +
      "<p>В режиме только событий и кадров — 0,8 ГБ в месяц. При просмотре живого видео по 30 минут в сутки — 4,3 ГБ. Тариф подбирается по второй цифре, иначе в конце месяца скорость урежут и живой поток не откроется.</p>"}
},

"y07.quti": {
  yorliq: "Montajchi uchun", sarlavha: "Po'lat quti va uning ichidagi tartib",
  tana: "<p>Quti stansiyani o'g'irlikdan saqlaydi va bir vaqtning o'zida montajni tartibga soladi: hamma ulanish bitta joyda bo'ladi va keyingi xodim uni o'zi tushunadi.</p>" +
    "<h4>Talablar</h4>" +
    "<ul><li>Polga yoki ko'tarmaydigan devorga to'rt nuqtada ankerlanadi. Gipsokarton devorga o'rnatilmaydi.</li>" +
    "<li>Ichida stansiya beton poldan yog'och yoki plastik taglikda turadi: beton sovuqni tortadi va qishda sig'imni yeydi.</li>" +
    "<li>Qopqog'ida ochilish datchigi. Uning hodisasi almashtirish vazifasiga bog'lanadi, shuning uchun rejali ochilish signal bermaydi.</li>" +
    "<li>Kabel kiritish pastdan, salniklar bilan. Yuqoridan kirgan kabel bo'ylab kondensat ichkariga oqadi.</li>" +
    "<li>Qutiga kameralardan biri qaratiladi.</li></ul>" +
    "<h4>Joy tanlash</h4>" +
    "<p>Quti ko'chadan yoki derazadan ko'rinmaydigan ichki xonaga qo'yiladi. Ko'rinadigan joydagi quti o'g'ri uchun ishora bo'lib xizmat qiladi: u aynan shu yerda qimmat narsa borligini aytadi.</p>" +
    "<p class='ogoh'>Komplekt sug'urtalanadi. Sug'urta shartnomasida jihoz ko'chib yurishi alohida band bo'lib yoziladi, aks holda talab boshqa manzilda sodir bo'lgan voqea uchun rad etilishi mumkin.</p>",
  manba: [],
  ru: {yorliq: "Для монтажника", sarlavha: "Стальной ящик и порядок внутри него",
    tana: "<p>Ящик защищает станцию от кражи и одновременно упорядочивает монтаж: все соединения оказываются в одном месте, и следующий сотрудник разбирается в них сам.</p>" +
      "<h4>Требования</h4>" +
      "<ul><li>Анкерится в четырёх точках к полу или к несущей стене. На гипсокартон не ставится.</li>" +
      "<li>Внутри станция стоит на деревянной или пластиковой подложке, не на бетонном полу: бетон вытягивает тепло и зимой съедает ёмкость.</li>" +
      "<li>На крышке — датчик вскрытия. Его событие привязывается к задаче замены, поэтому плановое открытие сигнала не даёт.</li>" +
      "<li>Ввод кабеля снизу, через сальники. По кабелю, введённому сверху, внутрь стекает конденсат.</li>" +
      "<li>На ящик направляется одна из камер.</li></ul>" +
      "<h4>Выбор места</h4>" +
      "<p>Ящик ставится во внутреннем помещении, не просматриваемом с улицы и из окна. Ящик на виду работает подсказкой для вора: он прямо указывает, где лежит дорогая вещь.</p>" +
      "<p class='ogoh'>Комплект страхуется. В договоре страхования отдельным пунктом указывается, что оборудование перемещается между адресами, иначе в выплате могут отказать.</p>"}
},

"y07.dc": {
  yorliq: "Texnik izoh", sarlavha: "Nega 12 V DC, invertor emas",
  tana: "<p>Stansiya AC rozetkasi orqali ishlatilsa, invertor bo'sh turganda ham o'nlab vatt yeydi. 20 vattlik komplektda bu yukni ikki barobar oshiradi va uch kunlik jadvalni bir yarim kunga tushiradi.</p>" +
    "<h4>Amalda nima qilinadi</h4>" +
    "<ul><li>Kamera, kommutator, router va domofon 12 V DC chiqishdan oziqlanadi. Har qurilmaning zavod adapteri ishlatilmaydi.</li>" +
    "<li>Kuchlanish farqi bo'lsa, DC-DC o'zgartkich qo'yiladi. Uning o'z yo'qotishi 5–10 foiz va bu hisobga kiritiladi.</li>" +
    "<li>Har liniyaga saqlagich qo'yiladi. Qisqa tutashuv butun komplektni o'chirmaydi, faqat bitta kamerani.</li>" +
    "<li>AC chiqish butunlay o'chiriladi: tasodifan ulangan bitta qurilma jadvalni buzadi.</li></ul>" +
    "<p class='ogoh'>Chiqishning «kutishda o'chirish» taymeri ham shu yerda o'chiriladi. U past yukda portni uzadi va 20 vattlik komplekt aynan shu chegara ostida turadi.</p>",
  manba: [],
  ru: {yorliq: "Техническая справка", sarlavha: "Почему 12 В DC, а не инвертор",
    tana: "<p>Если станция работает через розетку переменного тока, инвертор потребляет десятки ватт даже на холостом ходу. Для комплекта в 20 Вт это удваивает нагрузку и сокращает трёхсуточный график до полутора суток.</p>" +
      "<h4>Что делается на практике</h4>" +
      "<ul><li>Камера, коммутатор, маршрутизатор и домофон питаются от выхода 12 В DC. Заводские адаптеры устройств не используются.</li>" +
      "<li>При несовпадении напряжения ставится DC-DC преобразователь. Его собственные потери 5–10% и учитываются в расчёте.</li>" +
      "<li>На каждую линию ставится предохранитель. Короткое замыкание гасит одну камеру, а не весь комплект.</li>" +
      "<li>Выход переменного тока отключается полностью: одно случайно подключённое устройство ломает график.</li></ul>" +
      "<p class='ogoh'>Здесь же отключается таймер «выключение в режиме ожидания». Он снимает питание с порта при низкой нагрузке, а комплект в 20 Вт находится как раз ниже этого порога.</p>"}
},

"y07.sovuq": {
  yorliq: "Montajchi uchun", sarlavha: "Sovuq stansiyaga nima qiladi",
  tana: "<p>LiFePO4 uchun sovuqning ikki xil ta'siri bor va ularni aralashtirmaslik kerak.</p>" +
    "<table><tr><th>Jarayon</th><th>Chegara</th><th>Oqibati</th></tr>" +
    "<tr><td class='b'>Razryad</td><td>Odatda −10 °C gacha</td><td>Ishlaydi, lekin foydali sig'im 10–20 foiz kam</td></tr>" +
    "<tr><td class='b'>Zaryad</td><td>0 °C dan past — mumkin emas</td><td>BMS zaryadni butunlay to'xtatadi</td></tr></table>" +
    "<p>Shuning uchun zaryadlash faqat bazada, issiq xonada qilinadi. Obyektda stansiya zaryadlanmaydi va bu yechimning qoidasi.</p>" +
    "<h4>Kondensat</h4>" +
    "<p>Sovuqdan issiq xonaga kirgan stansiya korpusida namlik hosil bo'ladi. U darhol zaryadga ulansa, namlik konnektor va plataga tushadi. Tartib sodda: ikki soat issiq xonada tursin, keyin zaryadga.</p>" +
    "<h4>Obyektdagi joy</h4>" +
    "<ul><li>Beton polga to'g'ridan-to'g'ri qo'yilmaydi: yog'och yoki plastik taglik.</li>" +
    "<li>Tashqi devorga tegib turmaydi, 10–15 sm oraliq qoldiriladi.</li>" +
    "<li>Isitilmaydigan omborda stansiya izolyatsiyali qutida turadi; izolyatsiya uning o'z issiqligini ushlab qoladi.</li></ul>",
  manba: [],
  ru: {yorliq: "Для монтажника", sarlavha: "Что холод делает со станцией",
    tana: "<p>У холода два разных воздействия на LiFePO4, и смешивать их нельзя.</p>" +
      "<table><tr><th>Процесс</th><th>Предел</th><th>Последствие</th></tr>" +
      "<tr><td class='b'>Разряд</td><td>Обычно до −10 °C</td><td>Работает, но полезная ёмкость на 10–20% меньше</td></tr>" +
      "<tr><td class='b'>Заряд</td><td>Ниже 0 °C — невозможен</td><td>BMS полностью прекращает заряд</td></tr></table>" +
      "<p>Поэтому зарядка выполняется только на базе, в тёплом помещении. На объекте станция не заряжается — это правило решения.</p>" +
      "<h4>Конденсат</h4>" +
      "<p>На корпусе станции, внесённой с мороза в тёплое помещение, образуется влага. Если сразу поставить её на заряд, влага попадёт на разъём и плату. Порядок простой: два часа в тепле, затем на заряд.</p>" +
      "<h4>Место на объекте</h4>" +
      "<ul><li>Не ставится прямо на бетонный пол: только на деревянную или пластиковую подложку.</li>" +
      "<li>Не прилегает к наружной стене, оставляется зазор 10–15 см.</li>" +
      "<li>На неотапливаемом складе станция стоит в утеплённом ящике; утепление удерживает её собственное тепло.</li></ul>"}
},

"y07.jadval": {
  yorliq: "Rahbariyat uchun", sarlavha: "Qatnov jadvali va uning narxi",
  tana: "<p>Bu yechimda asosiy xarajat qatnovda yig'iladi. Uni oldindan hisoblab qo'ymaslik — eng ko'p uchraydigan xato.</p>" +
    "<table><tr><th>Jadval</th><th>Oyiga qatnov</th><th>Oyiga so'm</th></tr>" +
    "<tr><td>Uch kunlik</td><td class='n'>10</td><td class='n'>1,5–3,0 mln</td></tr>" +
    "<tr><td>Besh kunlik, yuk 20 Vt</td><td class='n'>6</td><td class='n'>0,9–1,8 mln</td></tr>" +
    "<tr><td>Yetti kunlik, 4 kVt·soat</td><td class='n'>4</td><td class='n'>0,6–1,2 mln</td></tr></table>" +
    "<p>Bitta qatnov transport, yonilg'i va xodim vaqti bilan 150–300 ming so'mga baholanadi. Masofa 50 km dan oshsa, yuqori chegara olinadi.</p>" +
    "<h4>Marshrutga birlashtirish</h4>" +
    "<p>Bir viloyatdagi to'rt-besh obyekt bitta kunga yig'ilsa, qatnov narxi obyektlarga bo'linadi va ikki-uch barobar tushadi. Buning uchun jadvallar bir-biriga moslashtiriladi: obyektlar bir xil kunda 30–40 foizga tushishi uchun ular bir xil sig'im va bir xil yuk bilan jihozlanadi.</p>" +
    "<p class='ogoh'>Uch oydan ortiq muddat — to'xtash nuqtasi. To'rtinchi oyda faqat qatnovlarga sarflangan pul 04-yechimning butun smetasiga teng bo'ladi.</p>",
  manba: [],
  ru: {yorliq: "Для правления", sarlavha: "График выездов и его стоимость",
    tana: "<p>Основной расход этого решения не в оборудовании, а в выездах. Не посчитать их заранее — самая частая ошибка.</p>" +
      "<table><tr><th>График</th><th>Выездов в месяц</th><th>Сумов в месяц</th></tr>" +
      "<tr><td>Трёхсуточный</td><td class='n'>10</td><td class='n'>1,5–3,0 млн</td></tr>" +
      "<tr><td>Пятисуточный, нагрузка 20 Вт</td><td class='n'>6</td><td class='n'>0,9–1,8 млн</td></tr>" +
      "<tr><td>Семисуточный, 4 кВт·ч</td><td class='n'>4</td><td class='n'>0,6–1,2 млн</td></tr></table>" +
      "<p>Один выезд с учётом транспорта, топлива и времени сотрудника оценивается в 150–300 тыс. сумов. При расстоянии свыше 50 км берётся верхняя граница.</p>" +
      "<h4>Объединение в маршрут</h4>" +
      "<p>Если четыре-пять объектов одной области собрать в один день, стоимость выезда делится между ними и падает в два-три раза. Для этого графики согласуют между собой: объекты оснащают станциями одной ёмкости и одинаковой нагрузкой, чтобы они выходили на 30–40% в один день.</p>" +
      "<p class='ogoh'>Три месяца — точка остановки. На четвёртый месяц сумма, потраченная только на выезды, сравнивается со всей сметой решения 04.</p>"}
},

"y07.api": {
  yorliq: "Jamoa rahbarlari uchun", sarlavha: "Stansiya holati platformaga qanday keladi",
  tana: "<p>EcoFlow ochiq dasturchi platformasiga ega: ilova HTTP yoki MQTT orqali ishlaydi, kirish accessKey va secretKey bilan beriladi. Ko'rsatkichlar quyidagi mavzuga keladi:</p>" +
    "<pre><code>/open/{sertifikat_akkaunti}/{seriya_raqami}/quota</code></pre>" +
    "<h4>Adapter nima qiladi</h4>" +
    "<ol><li>Mavzuga obuna bo'ladi va xabarni kutadi.</li>" +
    "<li>Zaryad foizi, kirish va chiqish quvvati, batareya haroratini ajratib oladi.</li>" +
    "<li>MKB formatida qayta yozadi: <code>mkb/v1/{obyekt}/{device_id}/quvvat</code>.</li>" +
    "<li>Qoidalarni qo'llaydi: 30 foizdan past — almashtirish vazifasi, 15 foizdan past — shoshilinch.</li></ol>" +
    "<h4>Cheklovlar va ularning oqibati</h4>" +
    "<ul><li>Ma'lumot ishlab chiqaruvchi buluti orqali o'tadi. Bu biometrik ma'lumot emas, O'RQ-1125 lokalizatsiya talabi bu kanalga tegmaydi.</li>" +
    "<li>Bulut ishlamay qolsa, video va hodisa yo'li buzilmaydi — faqat zaryad ko'rinmaydi. Bunda jadval kalendarga o'tadi: oxirgi ma'lum zaryaddan hisoblanadi.</li>" +
    "<li>Boshqa brendda API bo'lmasligi mumkin. Xariddan oldin hujjatlashtirilgan API talab qilinadi.</li></ul>" +
    "<p class='ogoh'>Zaxira belgi har doim bor: router quvvati o'chsa, platforma «aloqa yo'q» hodisasini oladi. Bu kech, lekin kafolatlangan signal.</p>",
  manba: [["EcoFlow Developer", "https://developer.ecoflow.com/us/document/introduction"]],
  ru: {yorliq: "Для тимлида", sarlavha: "Как состояние станции попадает на платформу",
    tana: "<p>У EcoFlow есть открытая платформа для разработчиков: приложение работает по HTTP или MQTT, доступ выдаётся по accessKey и secretKey. Показатели приходят в топик:</p>" +
      "<pre><code>/open/{аккаунт_сертификата}/{серийный_номер}/quota</code></pre>" +
      "<h4>Что делает адаптер</h4>" +
      "<ol><li>Подписывается на топик и ждёт сообщений.</li>" +
      "<li>Выделяет процент заряда, входную и выходную мощность, температуру батареи.</li>" +
      "<li>Переписывает в формате МКБ: <code>mkb/v1/{obyekt}/{device_id}/quvvat</code>.</li>" +
      "<li>Применяет правила: ниже 30% — задача на замену, ниже 15% — срочная.</li></ol>" +
      "<h4>Ограничения и их последствия</h4>" +
      "<ul><li>Данные идут через облако производителя. Это не биометрические данные, требование локализации по ЗРУ-1125 этого канала не касается.</li>" +
      "<li>При отказе облака путь видео и событий не нарушается — не виден только заряд. В этом случае график переходит на календарный, отсчитываемый от последнего известного заряда.</li>" +
      "<li>У другого бренда API может не оказаться вовсе. До закупки требуется документированный API.</li></ul>" +
      "<p class='ogoh'>Резервный признак есть всегда: при пропадании питания маршрутизатора платформа получает событие «нет связи». Это поздний, но гарантированный сигнал.</p>"}
},

"y07.adapter": {
  yorliq: "Jamoa rahbarlari uchun", sarlavha: "Ikki kanalni bitta obyektga bog'lash",
  tana: "<p>Adapter oldida shu yechimga xos vazifa turadi: video va telemetriya turli manbadan, turli identifikator bilan keladi va ularni bitta obyektga bog'lash kerak.</p>" +
    "<table><tr><th>Manba</th><th>Kalit</th><th>Qayerdan</th></tr>" +
    "<tr><td class='b'>Kamera</td><td><code>device_id</code></td><td>Qurilmalar reyestri</td></tr>" +
    "<tr><td class='b'>Router</td><td><code>device_id</code></td><td>Qurilmalar reyestri</td></tr>" +
    "<tr><td class='b'>Stansiya</td><td>Seriya raqami</td><td>Komplekt kartochkasi</td></tr></table>" +
    "<p>Komplekt kartochkasi — bu yechimning o'ziga xos jadvali. Unda komplekt raqami, ikkita stansiya seriyasi va joriy obyekt kodi turadi. Almashtirishda faqat shu kartochkadagi bitta qator o'zgaradi, qurilmalar reyestri tegilmaydi.</p>" +
    "<h4>Nega shunday</h4>" +
    "<p>Stansiya komplektga tegishli. Agar u to'g'ridan-to'g'ri obyektga bog'lansa, har almashtirishda ikkita yozuv o'zgaradi va tarix chalkashadi: qaysi stansiya qaysi obyektda necha kun turgani ko'rinmay qoladi. Servis va kafolat masalasi aynan shu tarixga tayanadi.</p>" +
    "<p class='ogoh'>Obyekt sotilganda komplekt kartochkasi «bazada» holatiga o'tadi, arxivga emas. Qurilmalar reyestridan esa obyekt bog'lanishi uziladi.</p>",
  manba: [],
  ru: {yorliq: "Для тимлида", sarlavha: "Привязка двух каналов к одному объекту",
    tana: "<p>Перед адаптером стоит характерная для этого решения задача: видео и телеметрия приходят из разных источников и с разными идентификаторами, а привязать их нужно к одному объекту.</p>" +
      "<table><tr><th>Источник</th><th>Ключ</th><th>Откуда</th></tr>" +
      "<tr><td class='b'>Камера</td><td><code>device_id</code></td><td>Реестр устройств</td></tr>" +
      "<tr><td class='b'>Маршрутизатор</td><td><code>device_id</code></td><td>Реестр устройств</td></tr>" +
      "<tr><td class='b'>Станция</td><td>Серийный номер</td><td>Карточка комплекта</td></tr></table>" +
      "<p>Карточка комплекта — отдельная таблица этого решения. В ней номер комплекта, серийные номера двух станций и код текущего объекта. При замене меняется одна строка в этой карточке, реестр устройств не трогается.</p>" +
      "<h4>Почему именно так</h4>" +
      "<p>Станция принадлежит комплекту. При прямой привязке к объекту каждая замена меняла бы две записи, и история путалась бы: становится не видно, какая станция сколько дней простояла на каком объекте. Вопросы обслуживания и гарантии опираются именно на эту историю.</p>" +
      "<p class='ogoh'>При продаже объекта карточка комплекта переходит в состояние «на базе» и остаётся в работе. В реестре устройств привязка к объекту при этом снимается.</p>"}
},

"y07.operator": {
  yorliq: "Rahbariyat uchun", sarlavha: "Operator ekranidagi qo'shimcha ustun",
  tana: "<p>Ko'chma komplekt bilan ishlaganda operator ekranida odatiy video nazoratdan tashqari yana bitta ma'lumot bor: komplekt zaryadi va keyingi almashtirish muddati.</p>" +
    "<h4>Kundalik ish</h4>" +
    "<ul><li>Ertalab navbatchi barcha komplektlar ro'yxatini ochadi va zaryadi 40 foizdan past bo'lganlarini ko'radi.</li>" +
    "<li>Hodisa kelganda jonli oqim ochiladi, kerak bo'lsa domofon karnayidan ogohlantirish beriladi.</li>" +
    "<li>Kechikkan almashtirish vazifalari alohida ro'yxatda turadi va oylik hisobotga chiqadi.</li></ul>" +
    "<h4>Nima qilib bo'lmaydi</h4>" +
    "<p>Stansiyani masofadan zaryadlash, uni o'chirib-yoqish yoki jadvalni o'zgartirmasdan avtonomiyani uzaytirish. Zaryad tugasa obyekt nazoratdan chiqadi va buni faqat odam tiklaydi.</p>" +
    "<p class='ogoh'>Shuning uchun almashtirish vazifasining muddati alohida nazoratda turadi. Bu yechimning yagona haqiqiy xatari — kechikish.</p>",
  manba: [],
  ru: {yorliq: "Для правления", sarlavha: "Дополнительная колонка на экране оператора",
    tana: "<p>При работе с мобильным комплектом на экране оператора помимо обычного видеонаблюдения есть ещё одна величина: заряд комплекта и срок следующей замены.</p>" +
      "<h4>Ежедневная работа</h4>" +
      "<ul><li>Утром дежурный открывает список всех комплектов и видит те, у которых заряд ниже 40%.</li>" +
      "<li>При поступлении события открывается живой поток, при необходимости через громкоговоритель домофона даётся предупреждение.</li>" +
      "<li>Просроченные задачи на замену стоят отдельным списком и выходят в месячный отчёт.</li></ul>" +
      "<h4>Чего сделать нельзя</h4>" +
      "<p>Зарядить станцию удалённо, включить или выключить её, продлить автономию без изменения графика. Когда заряд кончается, объект выходит из-под контроля, и восстановить это может только человек.</p>" +
      "<p class='ogoh'>Поэтому срок задачи на замену держится на отдельном контроле. Единственный настоящий риск этого решения — опоздание.</p>"}
},

"y07.montaj": {
  yorliq: "Montajchi uchun", sarlavha: "Bazadagi sutkalik sinov",
  tana: "<p>Obyektga chiqishdan oldin komplekt bazada to'liq yig'iladi va bir sutka ishlatib ko'riladi. Bu bosqichni o'tkazib yuborish ikkinchi chiqishga olib keladi.</p>" +
    "<h4>Sinovda tekshiriladigan beshta narsa</h4>" +
    "<ol><li>Chiqish taymeri o'chirilganmi: 24 soat davomida kameralar bir marta ham o'chmasligi kerak.</li>" +
    "<li>Haqiqiy yuk: stansiya displeyidagi vatt qiymati hisoblangandan 15 foizdan ko'proq farq qilsa, sabab qidiriladi.</li>" +
    "<li>Sutkada sarflangan foiz: u avtonomiya jadvalini tasdiqlaydi yoki rad etadi.</li>" +
    "<li>VPN tunneli uzilib-ulanganda o'zi tiklanadimi. Router modemi qo'lda o'chirib-yoqib sinaladi.</li>" +
    "<li>Platformada barcha qurilmalar «onlayn», sinov hodisasi va kadr kelgan.</li></ol>" +
    "<h4>Obyektda</h4>" +
    "<p>Birinchi o'rnatish ikki kishi bilan 2–3 soat. Kabel faqat bino ichida yotadi, kameralar qisqich yoki vaqtinchalik kronshteynda. Fasad teshilmaydi — bu sotuvdan oldingi ko'rinishni saqlaydi va yechib olishni ham tezlashtiradi.</p>" +
    "<p class='ogoh'>Ketishdan oldin beshta belgi tekshiriladi: kameralar ko'rinishi, SD kartaga yozuv, «onlayn» holati, stansiya foizi va sinov hodisasi. Bittasi bo'lmasa, dalolatnoma imzolanmaydi.</p>",
  manba: [],
  ru: {yorliq: "Для монтажника", sarlavha: "Суточное испытание на базе",
    tana: "<p>До выезда на объект комплект полностью собирается на базе и сутки работает. Пропуск этого этапа приводит ко второму выезду.</p>" +
      "<h4>Пять пунктов испытания</h4>" +
      "<ol><li>Отключён ли таймер выхода: за 24 часа камеры не должны погаснуть ни разу.</li>" +
      "<li>Фактическая нагрузка: если ватты на дисплее станции расходятся с расчётом более чем на 15%, ищется причина.</li>" +
      "<li>Израсходованный за сутки процент: он подтверждает или опровергает график автономии.</li>" +
      "<li>Восстанавливается ли VPN-туннель сам после обрыва. Модем маршрутизатора выключается и включается вручную.</li>" +
      "<li>На платформе все устройства «онлайн», пришли тестовое событие и кадр.</li></ol>" +
      "<h4>На объекте</h4>" +
      "<p>Первая установка — два человека, 2–3 часа. Кабель идёт только внутри здания, камеры на струбцинах или временных кронштейнах. Фасад не сверлится — это сохраняет предпродажный вид и ускоряет демонтаж.</p>" +
      "<p class='ogoh'>Перед уходом проверяются пять признаков: картинка с камер, запись на SD-карту, статус «онлайн», процент станции и тестовое событие. При отсутствии любого из них акт не подписывается.</p>"}
},

"y07.taymer": {
  yorliq: "Nosozlik", sarlavha: "Chiqish taymeri kameralarni o'chirib qo'yadi",
  tana: "<p>Belgisi: ertalab kameralar o'chgan, platformada «aloqa yo'q», lekin stansiya zaryadi 80 foiz. Jihoz butun, hech narsa buzilmagan.</p>" +
    "<h4>Sababi</h4>" +
    "<p>Ko'p ko'chma stansiyalarda chiqish porti bir necha soat davomida past yukda turgan bo'lsa, avtomatik o'chadi. Bu telefon va noutbuk zaryadlash uchun o'ylangan tejash funksiyasi: ishlab chiqaruvchi 20 vattlik doimiy yukni kutmagan. Chegara modelga qarab 5 dan 30 vattgacha bo'ladi va komplekt aynan shu oraliqda turadi.</p>" +
    "<h4>Oldini olish</h4>" +
    "<ul><li>Taymer ishlab chiqaruvchi ilovasida o'chiriladi. Sozlama har yangilanishdan keyin tekshiriladi.</li>" +
    "<li>Bazada sutkalik sinov o'tkaziladi: 24 soat ichida bir marta ham uzilish bo'lmasligi kerak.</li>" +
    "<li>Xarid shartida bu sozlamaning mavjudligi majburiy band bo'lib yoziladi.</li>" +
    "<li>Taymerni o'chirib bo'lmaydigan modelda yuk sun'iy oshiriladi — bu esa avtonomiyani qisqartiradi, ya'ni bunday model umuman olinmaydi.</li></ul>" +
    "<p class='ogoh'>Sinovsiz komplekt obyektga chiqarilmaydi. Bu qoida bitta jumla, lekin u eng ko'p uchraydigan nosozlikni butunlay yopadi.</p>",
  manba: [],
  ru: {yorliq: "Отказ", sarlavha: "Таймер выхода гасит камеры",
    tana: "<p>Признак: утром камеры погасли, на платформе «нет связи», при этом заряд станции 80%. Оборудование цело, ничего не сломалось.</p>" +
      "<h4>Причина</h4>" +
      "<p>У многих мобильных станций выходной порт автоматически отключается, если несколько часов держится низкая нагрузка. Это функция энергосбережения, рассчитанная на зарядку телефона и ноутбука: производитель не предполагал постоянной нагрузки в 20 Вт. Порог в зависимости от модели составляет от 5 до 30 Вт, и комплект попадает ровно в этот диапазон.</p>" +
      "<h4>Профилактика</h4>" +
      "<ul><li>Таймер отключается в приложении производителя. Настройка проверяется после каждого обновления.</li>" +
      "<li>На базе проводится суточное испытание: за 24 часа не должно быть ни одного перерыва.</li>" +
      "<li>Наличие такой настройки вносится в условия закупки обязательным пунктом.</li>" +
      "<li>Если таймер отключить нельзя, нагрузку приходится повышать искусственно — а это сокращает автономию, то есть такая модель просто не закупается.</li></ul>" +
      "<p class='ogoh'>Комплект без испытания на объект не выдаётся. Это правило укладывается в одну фразу, но полностью закрывает самый частый отказ.</p>"}
},

"y07.muddat": {
  yorliq: "Nosozlik", sarlavha: "Almashtirish kechikdi",
  tana: "<p>Belgisi: obyekt ikki kun «aloqa yo'q» holatida turdi. Sababi hech qanday texnik nosozlik emas — hech kim bormadi.</p>" +
    "<h4>Nega bu eng jiddiy xatar</h4>" +
    "<p>Boshqa yechimlarda quvvat o'zi tiklanadi: quyosh chiqadi, panel zaryadlaydi. Bu yerda tiklanish yo'q. Zaryad tugasa obyekt nazoratdan chiqadi va uni faqat odam qaytaradi. Ya'ni yechimning ishonchliligi jihozga emas, tartibga bog'liq.</p>" +
    "<h4>Oldini olish</h4>" +
    "<ul><li>30 foizda vazifa 12 soatlik muddat bilan ochiladi va aniq xodimga biriktiriladi.</li>" +
    "<li>15 foizda vazifa shoshilinchga o'tadi va bo'lim boshlig'iga ham ketadi.</li>" +
    "<li>Har komplektda ikkita stansiya: bo'shagani bilan to'lasi almashadi, kutish yo'q.</li>" +
    "<li>Kechikkan vazifa oylik hisobotga chiqadi va bo'lim ko'rsatkichiga ta'sir qiladi.</li>" +
    "<li>Bir viloyatdagi obyektlar bitta marshrutga yig'iladi: bir kunda to'rt-besh nuqta aylanib chiqiladi.</li></ul>" +
    "<p class='ogoh'>Pilotda aynan shu ko'rsatkich o'lchanadi: olti hafta ichida nechta almashtirish muddatida bajarildi. Raqam 90 foizdan past bo'lsa, bu yechim kengaytirilmaydi.</p>",
  manba: [],
  ru: {yorliq: "Отказ", sarlavha: "Замена просрочена",
    tana: "<p>Признак: объект двое суток простоял в состоянии «нет связи». Причина не в технической неисправности — просто никто не приехал.</p>" +
      "<h4>Почему это самый серьёзный риск</h4>" +
      "<p>В других решениях питание восстанавливается само: выходит солнце, панель заряжает. Здесь самовосстановления нет. Когда заряд кончается, объект выходит из-под контроля, и вернуть его может только человек. То есть надёжность решения держится не на оборудовании, а на дисциплине.</p>" +
      "<h4>Профилактика</h4>" +
      "<ul><li>На 30% открывается задача со сроком 12 часов и закрепляется за конкретным сотрудником.</li>" +
      "<li>На 15% задача переходит в срочные и дублируется руководителю подразделения.</li>" +
      "<li>В каждом комплекте две станции: разряженная меняется на полную, ожидания нет.</li>" +
      "<li>Просроченная задача выходит в месячный отчёт и влияет на показатель подразделения.</li>" +
      "<li>Объекты одной области собираются в маршрут: за день объезжается четыре-пять точек.</li></ul>" +
      "<p class='ogoh'>На пилоте измеряется именно этот показатель: сколько замен из общего числа выполнено в срок за шесть недель. Если цифра ниже 90%, решение не масштабируется.</p>"}
},

"y07.ogirlik": {
  yorliq: "Nosozlik", sarlavha: "Stansiyaning o'zi o'g'irlanishi",
  tana: "<p>Bo'sh binoda 15–20 kg og'irlikdagi, 10 mln so'mga yaqin turadigan va hech qanday kalitsiz olib ketiladigan qurilma turadi. Boshqa yechimlarda bunday xatar yo'q: ularning jihozi devorga o'rnatilgan va yechish uchun asbob kerak.</p>" +
    "<h4>Oldini olish</h4>" +
    "<ul><li>Po'lat quti polga yoki ko'tarmaydigan devorga to'rt nuqtada ankerlanadi.</li>" +
    "<li>Qutiga ochilish datchigi qo'yiladi va unga kameralardan biri qaratiladi.</li>" +
    "<li>Quti ko'chadan yoki derazadan ko'rinmaydigan ichki xonada turadi.</li>" +
    "<li>Komplekt sug'urtalanadi; shartnomada jihozning ko'chib yurishi alohida band bo'lib yoziladi.</li>" +
    "<li>Obyekt kalitlari reyestrda yuritiladi: kalit kimdaligi ko'rinmasa, o'g'irlik tekshiruvi boshi berk ko'chaga kiradi.</li></ul>" +
    "<h4>O'g'irlik sodir bo'lsa</h4>" +
    "<p>Kamera SD kartaga yozgan klip joyida qoladi — o'g'ri stansiyani olib ketsa ham kamera o'z akkumulyatorida bo'lmaydi, shuning uchun eng muhimi kadr allaqachon serverga ketganidir. Qutining ochilish hodisasi va oxirgi kadr shu daqiqada operatorga chiqadi.</p>" +
    "<p class='ogoh'>Stansiya yo'qolganda komplekt kartochkasi «yo'qotilgan» holatiga o'tadi va ikkinchi stansiya avtomatik ravishda zaxirasiz qoladi. Shu holat viloyat bo'yicha ko'rinadi.</p>",
  manba: [],
  ru: {yorliq: "Отказ", sarlavha: "Кража самой станции",
    tana: "<p>В пустом здании стоит устройство весом 15–20 кг и стоимостью около 10 млн сумов, которое выносится без всякого ключа. В других решениях такого риска нет: их оборудование закреплено на стене, и для демонтажа нужен инструмент.</p>" +
      "<h4>Профилактика</h4>" +
      "<ul><li>Стальной ящик анкерится в четырёх точках к полу или к несущей стене.</li>" +
      "<li>На ящик ставится датчик вскрытия, и на него направляется одна из камер.</li>" +
      "<li>Ящик стоит во внутреннем помещении, не просматриваемом с улицы и из окна.</li>" +
      "<li>Комплект страхуется; в договоре отдельным пунктом указывается перемещение оборудования между адресами.</li>" +
      "<li>Ключи от объекта ведутся в реестре: если не видно, у кого ключ, расследование кражи упирается в тупик.</li></ul>" +
      "<h4>Если кража произошла</h4>" +
      "<p>Клип, записанный камерой на SD-карту, остаётся на месте, но главное в другом: кадр уже ушёл на сервер. Событие вскрытия ящика и последний кадр выходят оператору в ту же минуту.</p>" +
      "<p class='ogoh'>При утрате станции карточка комплекта переходит в состояние «утрачена», и вторая станция автоматически остаётся без резерва. Это состояние видно в разрезе области.</p>"}
},

"y07.servis": {
  yorliq: "Moliya va huquq", sarlavha: "Besh yillik xarajat tuzilmasi",
  tana: "<p>Jihoz tomonidan bu eng arzon yechimlardan biri. Uch-to'rt kunlik jadvalda stansiya yiliga taxminan 100 sikl ko'radi, ya'ni besh yilda 3 000 sikllik resursning beshdan bir qismi sarflanadi — akkumulyator almashtirilmaydi.</p>" +
    "<table><tr><th>Modda</th><th>Besh yilda</th></tr>" +
    "<tr><td>SIM va trafik</td><td class='n'>3–6 mln so'm</td></tr>" +
    "<tr><td>SD kartalar, har 12–18 oyda</td><td class='n'>0,4–0,8 mln so'm</td></tr>" +
    "<tr><td>DC kabel, saqlagich, konnektor</td><td class='n'>0,3–0,5 mln so'm</td></tr>" +
    "<tr><td>Stansiya akkumulyatori</td><td class='n'>0</td></tr>" +
    "<tr class='jami'><td>Almashtirish qatnovlari</td><td class='n'>Eng katta qator</td></tr></table>" +
    "<p>Qatnov xarajati komplekt necha oy band bo'lganiga bog'liq. Yilda olti obyektga xizmat qilgan komplekt yiliga taxminan 8–12 mln so'mlik qatnov talab qiladi — bu jihoz narxidan ham ko'p.</p>" +
    "<h4>Omborda turadigan zaxira</h4>" +
    "<ul><li>Bitta zaxira stansiya har o'n komplektga: ta'mirdagi stansiya butun jadvalni buzadi.</li>" +
    "<li>Yuqori chidamli SD kartalar.</li>" +
    "<li>12 V kabel, saqlagich va salniklar to'plami.</li>" +
    "<li>Zaxira 4G antenna: signal kuchsiz obyektda kerak bo'lib qoladi.</li></ul>",
  manba: [],
  ru: {yorliq: "Финансы и право", sarlavha: "Структура расходов за пять лет",
    tana: "<p>По оборудованию это одно из самых дешёвых решений. При графике в трое-четверо суток станция проходит около 100 циклов в год, то есть за пять лет расходуется пятая часть ресурса в 3 000 циклов — аккумулятор не меняется.</p>" +
      "<table><tr><th>Статья</th><th>За пять лет</th></tr>" +
      "<tr><td>SIM и трафик</td><td class='n'>3–6 млн сумов</td></tr>" +
      "<tr><td>SD-карты, каждые 12–18 месяцев</td><td class='n'>0,4–0,8 млн сумов</td></tr>" +
      "<tr><td>Кабель DC, предохранители, разъёмы</td><td class='n'>0,3–0,5 млн сумов</td></tr>" +
      "<tr><td>Аккумулятор станции</td><td class='n'>0</td></tr>" +
      "<tr class='jami'><td>Выезды на замену</td><td class='n'>Самая крупная статья</td></tr></table>" +
      "<p>Стоимость выездов зависит от того, сколько месяцев комплект занят. Комплект, обслуживший за год шесть объектов, требует примерно 8–12 млн сумов выездов — больше, чем стоит само оборудование.</p>" +
      "<h4>Что держится на складе</h4>" +
      "<ul><li>Одна подменная станция на каждые десять комплектов: станция в ремонте ломает весь график.</li>" +
      "<li>SD-карты повышенной выносливости.</li>" +
      "<li>Комплект кабеля 12 В, предохранителей и сальников.</li>" +
      "<li>Запасная антенна 4G: на объекте со слабым сигналом она понадобится.</li></ul>"}
},

"y07.qayta": {
  yorliq: "Rahbariyat uchun", sarlavha: "Qayta ishlatish hisobi",
  tana: "<p>Bu yechimning iqtisodi komplektning yillik bandligiga tayanadi.</p>" +
    "<table><tr><th>Yilda nechta obyekt</th><th>Bir obyektga jihoz qiymati</th></tr>" +
    "<tr><td>2 obyekt</td><td class='n'>3,5–8,0 mln</td></tr>" +
    "<tr><td>4 obyekt</td><td class='n'>1,8–4,0 mln</td></tr>" +
    "<tr><td>6 obyekt</td><td class='n'>1,2–2,7 mln</td></tr></table>" +
    "<p>Komplekt yiliga ikkitagina obyektga xizmat qilsa, u statsionar yechimdan arzon emas. Foyda faqat bandlik yuqori bo'lganda paydo bo'ladi.</p>" +
    "<h4>Bank hal qiladigan savol</h4>" +
    "<p>Har viloyatga 5–10 komplektlik pul ajratiladi. Komplektlar obyektdan obyektga o'tadi va yil davomida o'nlab obyektni qamraydi. Buyruq bilan uchta narsa belgilanadi: pul kimga biriktiriladi, almashtirishni kim qiladi va komplekt bo'sh turganda u qayerda saqlanadi.</p>" +
    "<p class='ogoh'>Komplektlar bo'lim balansida yuritiladi va inventarizatsiyada boshqa asosiy vositalar bilan bir qatorda sanaladi. Ular ko'chib yurgani uchun inventarizatsiya komplekt raqami bo'yicha qilinadi.</p>",
  manba: [],
  ru: {yorliq: "Для правления", sarlavha: "Расчёт повторного использования",
    tana: "<p>Экономика этого решения опирается не на один объект, а на годовую загрузку комплекта.</p>" +
      "<table><tr><th>Объектов в год</th><th>Стоимость оборудования на объект</th></tr>" +
      "<tr><td>2 объекта</td><td class='n'>3,5–8,0 млн</td></tr>" +
      "<tr><td>4 объекта</td><td class='n'>1,8–4,0 млн</td></tr>" +
      "<tr><td>6 объектов</td><td class='n'>1,2–2,7 млн</td></tr></table>" +
      "<p>Если комплект обслуживает за год всего два объекта, он не дешевле стационарного решения. Выигрыш появляется только при высокой загрузке.</p>" +
      "<h4>Вопрос, который решает банк</h4>" +
      "<p>На каждую область выделяются средства на 5–10 комплектов. Комплекты переходят с объекта на объект и за год охватывают десятки объектов. Приказом определяются три вещи: за кем закреплены средства, кто выполняет замену и где хранится комплект в период простоя.</p>" +
      "<p class='ogoh'>Комплекты учитываются на балансе подразделения и при инвентаризации пересчитываются наравне с прочими основными средствами. Поскольку они перемещаются, инвентаризация ведётся по номеру комплекта.</p>"}
}
});

/* ---- Yechim 07 sahifasining ruscha matni ---- */
window.MKB_LUGAT = Object.assign(window.MKB_LUGAT || {}, {
"Yechim 07": "Решение 07",
"Slaydga qaytish ·": "Вернуться к слайду ·",
"Taqdimotga qaytish ·": "Вернуться к презентации ·",
"Bo'limlar": "Разделы",
"Chop etish": "Печать",
"Til": "Язык",
"Komplekt": "Комплект",
"Qishki sutka": "Зимние сутки",
"Dekabr balansi": "Декабрьский баланс",
"Ma'lumot yo'li": "Путь данных",
"Operator": "Оператор",
"O'rnatish": "Монтаж",
"Narx": "Стоимость",
"Kim sotadi": "Кто продаёт",
"Besh yil": "Пять лет",
"Nosozlik": "Отказы",
"Qaysi obyektga": "Каким объектам",
"Savollar": "Вопросы",
"Solishtirish": "Сравнение",
"Ishonchli texnologiyalar. Barqaror rivojlanish.": "Надёжные технологии. Устойчивое развитие.",
"Ichki foydalanish uchun · Sentabr 2026": "Для внутреннего пользования · Сентябрь 2026",
"Manba": "Источник",

"Yechim 07 · Qisqa muddatli aktiv": "Решение 07 · Краткосрочный актив",
"Nazorat obyektga kelgan kuni boshlanadi": "Контроль начинается в день приезда на объект",
"Panel qo'yishga ruxsat ham, vaqt ham yo'q bo'lganda komplekt chemodanda olib boriladi va ikki soatda ishga tushadi. Quvvat masalasi bitta savolga qisqaradi: bo'shagan stansiyani kim va qachon almashtiradi.":
 "Когда нет ни разрешения на установку панели, ни времени на неё, комплект привозится в кейсе и запускается за два часа. Вопрос энергоснабжения сводится к одному: кто и когда заменит разряженную станцию.",
"butun komplekt yuki": "нагрузка всего комплекта",
"2 kVt·soat qishda": "2 кВт·ч зимой",
"almashtirish vaqti": "время замены",
"komplekt narxi": "стоимость комплекта",
"Ko'chma stansiya, ikki SIM'li 4G router va eshik oldidagi video domofon":
 "Мобильная станция, 4G-маршрутизатор с двумя SIM и видеодомофон у входа",
"Ko'chma quvvat stansiyasi, 4G router va video domofon o'rnatilgan obyekt":
 "Объект с мобильной зарядной станцией, 4G-маршрутизатором и видеодомофоном",

"Chemodandagi komplekt": "Комплект в кейсе",
"Komplekt bazada to'liq yig'iladi va sozlanadi. Obyektga sozlanmagan jihoz olib borilmaydi: bir soatlik ish yarim kunga cho'zilishining eng ko'p uchraydigan sababi shu.":
 "Комплект полностью собирается и настраивается на базе. Ненастроенное оборудование на объект не везут: это самая частая причина, по которой часовая работа растягивается на полдня.",
"Qism": "Узел", "Nima qiladi": "Что делает", "Talab": "Требование", "Dona": "Шт.",
"LiFePO4 ko'chma stansiya": "Мобильная станция LiFePO4",
"Butun komplektni oziqlantiradi": "Питает весь комплект",
"Bazada zaryadlanadi, obyektda razryad bo'ladi": "Заряжается на базе, разряжается на объекте",
"1–4 kVt·soat, 12 V DC chiqish kamida 10 A, ochiq API":
 "1–4 кВт·ч, выход 12 В DC не менее 10 А, открытый API",
"IP kamera": "IP-камера",
"Kirish, hovli va ichki xonani ko'radi": "Просматривает вход, двор и внутреннее помещение",
"ONVIF, SD karta, IR bilan 5 Vt gacha": "ONVIF, SD-карта, до 5 Вт с ИК",
"PoE kommutator": "PoE-коммутатор",
"Kameralarni bitta kabel bilan oziqlantiradi": "Питает камеры одним кабелем",
"12–24 V DC kirish, 4–5 port": "Вход 12–24 В DC, 4–5 портов",
"Ikki SIM'li 4G router": "4G-маршрутизатор с двумя SIM",
"Tunnelni ushlab turadi, aloqa uzilsa o'zi qayta ulanadi":
 "Удерживает туннель, при обрыве связи переподключается сам",
"9–30 V DC kirish, watchdog, VPN": "Вход 9–30 В DC, watchdog, VPN",
"Video domofon": "Видеодомофон",
"Eshik oldidagi chaqiruv va ikki tomonlama gaplashish": "Вызов у двери и двусторонняя связь",
"SIP yoki ilova orqali, rele chiqishi bilan": "По SIP или через приложение, с релейным выходом",
"Qulflanadigan po'lat quti": "Запираемый стальной ящик",
"Stansiyani o'g'irlikdan saqlaydi": "Защищает станцию от кражи",
"Polga yoki devorga ankerlanadi, ochilish datchigi bilan":
 "Анкерится к полу или стене, с датчиком вскрытия",
"Har komplektga raqam beriladi, masalan": "Каждому комплекту присваивается номер, например",
". Platformada komplekt ayni damda qaysi obyektda turgani va uning zaryadi doim ko'rinadi.":
 ". На платформе всегда видно, на каком объекте сейчас стоит комплект и каков его заряд.",
"Qurilmalar faqat 12 V DC chiqishdan oziqlanadi. AC rozetka ishlatilsa, bo'sh turgan invertorning o'zi o'nlab vatt yeydi va avtonomiya ikki baravar qisqaradi.":
 "Устройства питаются только от выхода 12 В DC. При использовании розетки переменного тока инвертор на холостом ходу потребляет десятки ватт, и автономия сокращается вдвое.",

"Almashtirish kuni: 14-yanvar": "День замены: 14 января",
"Uchinchi kun. Stansiya tunda 38 foizga tushgan va platforma almashtirish vazifasini allaqachon ochgan. Kun shu vazifa bilan boshlanadi va shu bilan yopiladi.":
 "Третьи сутки. За ночь станция опустилась до 38%, и платформа уже открыла задачу на замену. День начинается с этой задачи и ею же закрывается.",
"tun": "ночь", "sovuq": "холод", "vazifa": "задача", "hodisa": "событие", "almashish": "замена", "baza": "база",
"Stansiya 38 foizda": "Станция на 38 процентах",
"Tashqarida −9 °C, qulflangan xonada +2 °C. Yuk o'zgarmas: ikki kamera IR bilan 10 Vt, router 5 Vt, domofon kutish rejimida 3 Vt, datchiklar hubi 2 Vt. Stansiya chiqishida 20 Vt, sutkasiga 0,48 kVt·soat.":
 "На улице −9 °C, в запертом помещении +2 °C. Нагрузка постоянна: две камеры с ИК — 10 Вт, маршрутизатор — 5 Вт, домофон в режиме ожидания — 3 Вт, хаб датчиков — 2 Вт. На выходе станции 20 Вт, за сутки 0,48 кВт·ч.",
"Qolgan zaxira: taxminan 19 soat": "Остаток запаса: около 19 часов",
"Sig'im sovuqda qisqaradi": "На холоде ёмкость сокращается",
"Xonada harorat +1 °C ga tushadi. LiFePO4 bu haroratda razryad bera oladi, lekin foydali sig'im nominaldan 8–10 foiz kam chiqadi. Shuning uchun almashtirish jadvali 3 kunga tuziladi: yozgi hisobdagi 3,5 kun yanvarda obyektni bir kecha nazoratsiz qoldiradi.": "В помещении температура падает до +1 °C. LiFePO4 при ней разряд отдаёт, но полезная ёмкость выходит на 8–10 процентов ниже номинала. Поэтому график замены строится на 3 суток: летние 3,5 суток в январе оставляют объект на ночь без контроля.",
"Zaryad 30 foizdan pastga tushadi": "Заряд опускается ниже 30 процентов",
"Adapter stansiya telemetriyasini har daqiqada o'qiydi. 30 foiz chegarasida platforma «komplektni almashtirish» vazifasini ochadi, muddatni 12 soat qilib qo'yadi va viloyat xo'jalik bo'limiga biriktiradi. 15 foizda vazifa shoshilinchga o'tadi va bo'lim boshlig'iga ham ketadi.":
 "Адаптер читает телеметрию станции каждую минуту. На отметке 30% платформа открывает задачу «заменить комплект», ставит срок 12 часов и закрепляет её за хозяйственным отделом области. На 15% задача переходит в срочные и дублируется руководителю отдела.",
"Hovliga notanish mashina kiradi": "Во двор въезжает незнакомая машина",
"Kamera harakatni aniqlaydi va klipni o'zi SD kartaga yozadi, bir vaqtning o'zida kadrni routerdan o'tkazib yuboradi. Operator jonli oqimni ochadi va domofon karnayidan ogohlantirish beradi. Bu 40 soniyalik epizod stansiyadan 0,01 kVt·soat oladi — jadvalga ta'sir qilmaydi.":
 "Камера фиксирует движение и сама пишет клип на SD-карту, одновременно отправляя кадр через маршрутизатор. Оператор открывает живой поток и даёт предупреждение через громкоговоритель домофона. Этот сорокасекундный эпизод забирает у станции 0,01 кВт·ч — на график он не влияет.",
"To'la stansiya keladi": "Приезжает заряженная станция",
"Xodim qutini ochadi, to'la stansiyani ulaydi, bo'shaganini oladi. Kameralar 12 V liniyasi uzilgan 20 soniya ichida o'chadi va qayta yonadi; platformada bu «qisqa uzilish» bo'lib qoladi, hodisa ochilmaydi. Komplekt raqami va yangi zaryad reyestrga yoziladi.":
 "Сотрудник открывает ящик, подключает полную станцию и забирает разряженную. Камеры гаснут и включаются в течение 20 секунд, пока разомкнута линия 12 В; на платформе это остаётся «коротким перерывом», событие не открывается. Номер комплекта и новый заряд вносятся в реестр.",
"Joyda ish: 40 daqiqa, bitta xodim": "Работа на месте: 40 минут, один сотрудник",
"Bo'shagan stansiya bazada": "Разряженная станция на базе",
"Sovuqdan kelgan stansiya darhol zaryadga qo'yilmaydi: korpusda kondensat bo'ladi va LiFePO4 0 °C dan past zaryadlanmaydi. Ikki soat issiq xonada turadi, keyin zaryadga ulanadi. To'lish 2,5–4 soat, ertalabga tayyor.":
 "Станцию, привезённую с мороза, сразу на заряд не ставят: на корпусе образуется конденсат, а LiFePO4 не заряжается при температуре ниже 0 °C. Два часа она стоит в тёплом помещении, затем подключается к зарядке. Полный заряд занимает 2,5–4 часа — к утру станция готова.",

"Dekabr balansi: quyosh yo'q, faqat sig'im": "Декабрьский баланс: солнца нет, только ёмкость",
"Bu yagona yechim bo'lib, unda quyosh umuman hisobga olinmaydi. Dekabrning qisqa kuni ham, bulutli hafta ham jadvalni o'zgartirmaydi: hamma narsani sig'im va qatnov belgilaydi.":
 "Это единственное решение, в котором солнце не учитывается вовсе. Ни короткий декабрьский день, ни пасмурная неделя графика не меняют: всё определяют ёмкость и выезды.",
"AVTONOMIYA, KUN · FOYDALI SIG'IMNING 85 FOIZI, QISHDA YANA 10 FOIZ KAM":
 "АВТОНОМИЯ, СУТКИ · 85% ПОЛЕЗНОЙ ЁМКОСТИ, ЗИМОЙ ЕЩЁ НА 10% МЕНЬШЕ",
"1 kVt·soat": "1 кВт·ч", "2 kVt·soat": "2 кВт·ч", "4 kVt·soat": "4 кВт·ч",
"1,6 kun": "1,6 сут", "1,1 kun": "1,1 сут", "3,1 kun": "3,1 сут",
"2,1 kun": "2,1 сут", "6,2 kun": "6,2 сут", "4,2 kun": "4,2 сут",
"20 Vt — ikki kamera, router, domofon, hub": "20 Вт — две камеры, маршрутизатор, домофон, хаб",
"30 Vt — to'rt kamera va doimiy IR": "30 Вт — четыре камеры и постоянный ИК",
"10 kun": "10 сут",
"Amaliy chegara — uch kunlik jadval": "Практический предел — трёхсуточный график",
"Hisobda sig'imning 85 foizi olingan: BMS chegarasi va DC o'zgartkich yo'qotishi. Qishki ustunlar yana 10 foizga qisqartirilgan.":
 "В расчёте взято 85% ёмкости: порог BMS и потери DC-преобразователя. Зимние столбцы сокращены ещё на 10%.",
"Qatnov hisobi": "Расчёт выездов",
"Uch kunlik jadval oyiga o'nta qatnov beradi. Bitta qatnov transport va xodim vaqti bilan 150–300 ming so'mga baholanadi, ya'ni oyiga 1,5–3 mln. Ikki-uch oydan keyin bu logistika 04-yechimning statsionar shkafidan ham, 02-yechimning quyosh-4G kamerasidan ham qimmatga tushadi.":
 "Трёхсуточный график даёт десять выездов в месяц. Один выезд с учётом транспорта и времени сотрудника оценивается в 150–300 тыс. сумов, то есть 1,5–3 млн в месяц. Через два-три месяца эта логистика обходится дороже и стационарного шкафа из решения 04, и солнечно-4G камеры из решения 02.",
"Nega ikkita stansiya": "Почему станций две",
"Bitta stansiya bilan ishlab bo'lmaydi: u obyektdan olinganidan keyin to'lguncha obyekt nazoratsiz qoladi. Shuning uchun har komplektda ikkita stansiya bo'ladi — biri ishlaydi, ikkinchisi bazada zaryadlanadi. Smetadagi eng katta qator ham shu.":
 "С одной станцией работать нельзя: после снятия с объекта и до окончания заряда объект остаётся без контроля. Поэтому в каждом комплекте две станции — одна работает, вторая заряжается на базе. Это же и самая крупная статья сметы.",

"Video bir yo'ldan, quvvat boshqa yo'ldan keladi": "Видео идёт одним путём, питание — другим",
"Bu yechimda ikkita mustaqil kanal bor va ularni ajratib tushunish kerak. Video va hodisa bank tunnelidan o'tadi; stansiya zaryadi esa ishlab chiqaruvchi buluti orqali keladi. Yashil halqali bo'g'inni bosing.":
 "В этом решении два независимых канала, и их следует различать. Видео и события идут через туннель банка; заряд станции приходит через облако производителя. Нажмите на звено с зелёным маркером.",
"Kamera": "Камера",
"Harakatni o'zi aniqlaydi, klipni SD kartaga yozadi va kadrni tarmoqqa uzatadi":
 "Сама определяет движение, пишет клип на SD-карту и передаёт кадр в сеть",
"Asosiy oqim 4 Mbit/s, qo'shimchasi 1 Mbit/s": "Основной поток 4 Мбит/с, дополнительный 1 Мбит/с",
"PoE kommutator va 12 V liniyasi": "PoE-коммутатор и линия 12 В",
"Kameralarni oziqlantiradi va bitta segmentga yig'adi, invertor ishlatilmaydi":
 "Питает камеры и сводит их в один сегмент, инвертор не используется",
"Segment uzunligi 100 m bilan cheklangan": "Длина сегмента ограничена 100 м",
"Ikki SIM'li router": "Маршрутизатор с двумя SIM",
"Bank tarmog'i bilan tunnel quradi, kameralar ochiq internetga chiqmaydi":
 "Строит туннель до сети банка, камеры в открытый интернет не выходят",
"Holati SNMP v3 orqali olinadi": "Состояние снимается по SNMP v3",
"Stansiya telemetriyasi": "Телеметрия станции",
"Zaryad foizi, kirish va chiqish quvvati, batareya harorati — alohida kanal":
 "Процент заряда, входная и выходная мощность, температура батареи — отдельный канал",
"Ishlab chiqaruvchi buluti": "Облако производителя",
"Adapter": "Адаптер",
"Ikkala kanalni bitta obyektga bog'laydi va yagona hodisa sxemasiga keltiradi":
 "Связывает оба канала с одним объектом и приводит их к единой схеме события",
"Bank serverida": "На сервере банка",
"Yadro va ekranlar": "Ядро и экраны",
"Zaryad 30 foizdan tushganda almashtirish vazifasi o'zi ochiladi va muddat qo'yiladi":
 "При падении заряда ниже 30% задача на замену открывается сама, и ей назначается срок",
"Komplektlar reyestri": "Реестр комплектов",
"Qaysi komplekt qaysi obyektda": "Какой комплект на каком объекте",
"Bulut ishlamay qolsa video va hodisa yo'li buzilmaydi: faqat zaryad foizi ko'rinmay qoladi va uning o'rniga qatnov jadvali ishlaydi.":
 "При отказе облака путь видео и событий не нарушается: пропадает только процент заряда, и вместо него работает график выездов.",
"Stansiya holati bulut orqali o'tadi, ammo bu biometrik ma'lumot emas va O'RQ-1125 lokalizatsiya talabi bu kanalga tegmaydi. Video bulutga umuman chiqmaydi.":
 "Состояние станции идёт через облако, но это не биометрические данные, и требование локализации по ЗРУ-1125 этого канала не касается. Видео в облако не выходит вовсе.",

"Operator nima ko'radi va nima qila oladi": "Что видит оператор и что он может сделать",
"Bu yechimda operator ekranida odatiy video nazoratdan tashqari yana bitta ustun bor: komplektning zaryadi va keyingi almashtirish muddati. Ustun komplekt kartochkasiga bog'lanadi, chunki komplekt obyektdan obyektga ko'chib yuradi.": "Здесь на экране оператора кроме обычного видеонаблюдения есть ещё один столбец: заряд комплекта и срок следующей замены. Столбец привязан к карточке комплекта, потому что сам комплект переезжает с объекта на объект.",
"Ko'rsatkich": "Показатель", "Manbasi": "Источник", "Yangilanishi": "Обновление",
"Jonli video va arxiv": "Живое видео и архив",
"Kamera RTSP orqali, arxiv SD kartada": "Камера по RTSP, архив на SD-карте",
"Talab bo'yicha": "По запросу",
"Harakat hodisasi va kadr": "Событие движения и кадр",
"Kameraning o'z analitikasi": "Собственная аналитика камеры",
"Darhol": "Немедленно",
"Stansiya zaryadi, foizda": "Заряд станции, в процентах",
"Ishlab chiqaruvchi API'si": "API производителя",
"1 daq": "1 мин", "30 s": "30 с",
"Chiqish quvvati, Vt": "Выходная мощность, Вт",
"Batareya harorati": "Температура батареи",
"Aloqa holati": "Состояние связи",
"Router SNMP va tunnel holati": "SNMP маршрутизатора и состояние туннеля",
"Komplekt qaysi obyektda": "На каком объекте комплект",
"Qurilmalar reyestri": "Реестр устройств",
"Almashtirishda": "При замене",
"Masofadan qilinadi": "Делается удалённо",
"Jonli oqimni ochish, arxivdan klip so'rash, domofon orqali gaplashish va karnaydan ogohlantirish berish. Kamerani qayta yuklash. Almashtirish vazifasini boshqa xodimga o'tkazish va muddatini o'zgartirish.":
 "Открыть живой поток, запросить клип из архива, поговорить через домофон и дать предупреждение через громкоговоритель. Перезагрузить камеру. Передать задачу на замену другому сотруднику и изменить её срок.",
"Qilib bo'lmaydi": "Сделать нельзя",
"Stansiyani masofadan zaryadlash yoki uni o'chirib-yoqish. Zaryad tugasa, obyekt nazoratdan chiqadi va buni faqat odam tiklaydi. Shuning uchun vazifa muddati yechimning eng nozik joyi.":
 "Зарядить станцию удалённо или выключить и включить её. Когда заряд кончается, объект выходит из-под контроля, и вернуть его может только человек. Поэтому срок задачи — самое уязвимое место решения.",

"O'rnatish va yechib olish": "Монтаж и демонтаж",
"Maqsad: kelgan kuni ishga tushirish, sotilgan kuni yechib olish. Fasadni teshish, shtroba ochish va kabel kanalini yotqizish bu yechimda umuman yo'q.":
 "Цель: запустить в день приезда, снять в день продажи. Сверления фасада, штробления и прокладки кабель-канала в этом решении нет вовсе.",
"Ish": "Работа", "Kim": "Кто", "Vaqt": "Время",
"Bazada yig'ish va sozlash, bir sutkalik sinov": "Сборка и настройка на базе, суточное испытание",
"CCTV integratori, bir marta": "CCTV-интегратор, один раз",
"1 ish kuni": "1 рабочий день",
"Obyektga birinchi o'rnatish": "Первая установка на объекте",
"2 kishi": "2 человека", "1 kishi": "1 человек",
"2–3 soat": "2–3 ч", "40 daqiqa": "40 мин", "1,5 soat": "1,5 ч",
"Stansiyani almashtirish": "Замена станции",
"Yechib olish va dalolatnoma": "Демонтаж и акт",
"Kameralar qisqich yoki vaqtinchalik kronshteynga qo'yiladi. Qisqa muddatli obyektda fasad teshilmaydi — bu sotuvdan oldingi ko'rinishni ham saqlaydi.":
 "Камеры ставятся на струбцины или временные кронштейны. На краткосрочном объекте фасад не сверлится — это сохраняет и предпродажный вид здания.",
"Kabel faqat bino ichida yotadi. Tashqariga chiqadigan kabel o'g'irlanadi yoki kesiladi va uni qayta tortish har safar yangi ish degani.":
 "Кабель прокладывается только внутри здания. Выведенный наружу кабель срезают или крадут, а его повторная прокладка — это каждый раз новая работа.",
"Stansiya qulflangan xonada, ankerlangan po'lat qutida, beton poldan yog'och taglikda turadi. Qutiga ochilish datchigi qo'yiladi.":
 "Станция стоит в запертом помещении, в анкерном стальном ящике, на деревянной подложке, приподнятой над бетонным полом. На ящик ставится датчик вскрытия.",
"Chiqishning «kutishda o'chirish» taymeri o'chiriladi va bu bazadagi sutkalik sinovda tekshiriladi. Tekshirilmagan taymer birinchi tunda kameralarni o'chiradi.":
 "Таймер «выключение в режиме ожидания» отключается, и это проверяется на суточном испытании на базе. Непроверенный таймер гасит камеры уже в первую ночь.",
"Ketishdan oldin tekshiriladi: kameralar ko'rinishi, SD kartaga yozuv, platformada «onlayn» holati va stansiya foizi. Beshtasi ham bo'lmasa, dalolatnoma imzolanmaydi.":
 "Перед уходом проверяются: картинка с камер, запись на SD-карту, статус «онлайн» на платформе и процент заряда станции. При отсутствии любого из признаков акт не подписывается.",
"Yechib olishda SD kartadagi yozuv arxivga ko'chiriladi va karta formatlanadi. Keyingi obyektda oldingi obyektning kadrlari qolib ketishi mumkin emas.":
 "При демонтаже запись с SD-карты переносится в архив, а карта форматируется. Кадры предыдущего объекта не должны оставаться на следующем.",

"Narx: 7–16 mln so'm komplektga": "Стоимость: 7–16 млн сумов за комплект",
"Bu narx bitta komplektning narxi. Komplekt obyektdan obyektga ko'chadi va yilda olti obyektga xizmat qilsa, bir obyektga tushadigan qiymat olti barobar kichik bo'ladi.": "Это цена одного комплекта. Комплект переезжает с объекта на объект, и если за год он обслуживает шесть объектов, доля на один объект выходит вшестеро меньше.",
"Qator": "Статья", "mln so'm": "млн сумов", "Jami": "Итого",
"LiFePO4 stansiya, 1–2 kVt·soat": "Станция LiFePO4, 1–2 кВт·ч",
"Ikkita stansiya: biri ishda, biri zaryadda": "Две станции: одна в работе, вторая на зарядке",
"IP kamera, 2 dona": "IP-камера, 2 шт.",
"4G router, ikki SIM": "4G-маршрутизатор, две SIM",
"Video domofon yoki datchiklar": "Видеодомофон или датчики",
"Sozlash va birinchi o'rnatish": "Настройка и первая установка",
"2026-yil sentabr holatiga bozor bahosi. Mo'ljal uchun: EcoFlow DELTA 2 Max (2 kVt·soat, 3000 sikl) AQSh do'konida 1 029 dollar.":
 "Рыночные цены по состоянию на сентябрь 2026 года. Для ориентира: EcoFlow DELTA 2 Max (2 кВт·ч, 3000 циклов) в магазине США стоит 1 029 долларов.",
"Obyektga tushadigan qiymat": "Стоимость в расчёте на объект",
"Komplekt yilda olti obyektga xizmat qilsa, jihoz qiymati shu darajaga bo'linadi. Doimiy xarajatning og'irligi almashtirish qatnovlariga tushadi: uch kunda bir tashrif yiliga 120 qatnov degani.": "Если комплект за год обслуживает шесть объектов, стоимость оборудования делится на это число. Основной вес постоянных затрат приходится на выезды по замене: визит раз в трое суток — это 120 выездов в год.",
"Narxni nima ko'taradi": "Что повышает стоимость",
"Eng katta qator — stansiya sig'imi. 2 kVt·soatdan 4 kVt·soatga o'tish narxni ikki barobarga yaqin oshiradi va jadvalni atigi uch kunga uzaytiradi. Yukni 55 vattdan 30 vattga tushirish esa o'sha uch kunni tekinga beradi.": "Самая крупная строка — ёмкость станции. Переход с 2 кВт·ч на 4 кВт·ч почти удваивает цену и растягивает график всего на трое суток. А снижение нагрузки с 55 до 30 Вт даёт те же трое суток бесплатно.",
"Nimani kamaytirish mumkin": "Что можно сократить",
"IR yoritgichni faqat kerakli kamerada yoqish, domofonni chaqiruv bo'lgandagina uyg'otish va to'rtinchi kameradan voz kechish yukni 30 Vt dan 20 Vt ga tushiradi. Bu jadvalni uch kundan besh kunga uzaytiradi va oyiga to'rtta qatnovni tejaydi.":
 "Включение ИК-прожектора только на нужной камере, пробуждение домофона лишь при вызове и отказ от четвёртой камеры снижают нагрузку с 30 до 20 Вт. Это растягивает график с трёх суток до пяти и экономит четыре выезда в месяц.",

"Kim sotadi, kim o'rnatadi, kim almashtiradi": "Кто продаёт, кто монтирует, кто меняет",
"Yetkazib berish": "Поставка",
"EcoFlow va Bluetti sinfidagi stansiyalar O'zbekistonda dilerlar va marketpleyslar orqali sotiladi, ya'ni import muddati kutilmaydi. Xaridda rasmiy kafolat va servis manzili tekshiriladi: kafolatsiz olingan stansiya buzilsa, u shunchaki yo'qotilgan pul.":
 "Станции класса EcoFlow и Bluetti продаются в Узбекистане через дилеров и маркетплейсы, то есть срок ввоза ждать не приходится. При покупке проверяются официальная гарантия и адрес сервиса: станция без гарантии при поломке превращается просто в потерянные деньги.",
"Yig'ish va sozlash": "Сборка и настройка",
"Birinchi komplektni CCTV integratori yig'adi: DC liniyasi, saqlagichlar, VPN va API ulanishi shu yerda bir marta to'g'rilanadi. Keyingi komplektlar shu yig'ilgan namuna bo'yicha takrorlanadi.":
 "Первый комплект собирает CCTV-интегратор: линия DC, предохранители, VPN и подключение API отлаживаются здесь один раз. Последующие комплекты повторяются по этому собранному образцу.",
"Almashtirish": "Замена",
"Almashtirishni bank xodimi qiladi: har safar integratorni tashqi shartnoma bo'yicha chaqirish tashrif narxini ikki barobar oshiradi. Xodim yarim kunlik o'qish va yozma tartibdan o'tadi.": "Замену выполняет сотрудник банка: вызывать интегратора по внешнему договору на каждую замену вдвое повышает стоимость выезда. Сотрудник проходит полудневное обучение и письменный регламент.",
"Ijara": "Аренда",
"O'zbekistonda ko'chma stansiya ijarasi bozori kichik va u asosan tadbir xizmatlariga qaratilgan. Uzoq muddatli ijara taklifi integratordan alohida so'raladi; odatda sotib olish arzonroq chiqadi.":
 "Рынок аренды мобильных станций в Узбекистане невелик и ориентирован в основном на обслуживание мероприятий. Предложение по долгосрочной аренде запрашивается у интегратора отдельно; обычно покупка обходится дешевле.",
"Xarid shartida ochiq va hujjatlashtirilgan API majburiy band bo'lib yoziladi. API'siz stansiya ham ishlaydi, lekin uning zaryadi platformada ko'rinmaydi va almashtirish jadvali kalendarga tayanib qoladi.":
 "Открытый и документированный API вносится в условия закупки обязательным пунктом. Станция без API тоже работает, но её заряд не виден на платформе, и график замен приходится вести по календарю.",

"Besh yil ichida nima sarflanadi": "Что расходуется за пять лет",
"Jihoz tomonidan bu eng arzon yechimlardan biri: besh yilda akkumulyator ham almashtirilmaydi. Butun og'irlik ish tomonida — qatnov, yonilg'i va xodim vaqti.":
 "По оборудованию это одно из самых дешёвых решений: за пять лет не меняется даже аккумулятор. Вся тяжесть на стороне работы — выезды, топливо и время сотрудника.",
"Modda": "Статья", "Qachon": "Когда", "Besh yilda": "За пять лет",
"Almashtirish qatnovlari": "Выезды на замену",
"Oyiga 8–10 marta, komplekt band bo'lgan oylarda": "8–10 раз в месяц в те месяцы, когда комплект занят",
"Eng katta qator": "Самая крупная статья",
"SIM va trafik": "SIM и трафик",
"Oyma-oy": "Ежемесячно",
"3–6 mln so'm": "3–6 млн сумов",
"SD kartalar": "SD-карты",
"Har 12–18 oyda": "Каждые 12–18 месяцев",
"0,4–0,8 mln so'm": "0,4–0,8 млн сумов",
"DC kabel, saqlagich, konnektor": "Кабель DC, предохранители, разъёмы",
"Ehtiyot qismlar sifatida": "В качестве запасных частей",
"0,3–0,5 mln so'm": "0,3–0,5 млн сумов",
"Stansiya akkumulyatori": "Аккумулятор станции",
"Almashtirilmaydi": "Не меняется",
"Uch-to'rt kunlik jadvalda stansiya yiliga taxminan 100 sikl ko'radi. 3 000 sikllik resurs besh yilda beshdan bir qismigina sarflanadi.":
 "При графике в трое-четверо суток станция проходит около 100 циклов в год. За пять лет расходуется лишь пятая часть ресурса в 3 000 циклов.",

"Uchta nosozlik va ularning oldini olish": "Три отказа и их предупреждение",
"Uchalasi ham quvvat bilan bog'liq emas: stansiya o'z ishini bajaradi. Muammo undan atrofdagi tartibda.":
 "Ни один из трёх не связан с питанием: станция свою работу выполняет. Проблема в порядке вокруг неё.",
"Nosozlik 1": "Отказ 1", "Nosozlik 2": "Отказ 2", "Nosozlik 3": "Отказ 3",
"Oldini olish": "Профилактика",
"Ertalab kameralar o'chib qolgan, stansiya esa 80 foizda": "Утром камеры погасли, а станция на 80 процентах",
"Ko'pchilik stansiyada chiqish quvvati bir necha soat davomida o'nlab vattdan past bo'lsa, port avtomatik o'chadi — bu telefon zaryadlash uchun o'ylangan tejash funksiyasi. 20 Vt lik komplekt ayni shu chegara ostida.":
 "У большинства станций выходной порт отключается автоматически, если несколько часов подряд мощность держится ниже нескольких десятков ватт, — это функция энергосбережения, задуманная для зарядки телефона. Комплект в 20 Вт находится как раз ниже этого порога.",
"Taymer ishlab chiqaruvchi ilovasida o'chiriladi va bazada bir sutkalik sinovdan o'tkaziladi. Sinovsiz komplekt obyektga chiqarilmaydi.":
 "Таймер отключается в приложении производителя и проверяется суточным испытанием на базе. Комплект без испытания на объект не выдаётся.",
"Almashtirish kechikdi va obyekt ikki kun nazoratsiz qoldi": "Замена просрочена, и объект двое суток был без контроля",
"Bu yechimning asosiy xatari jadvalning buzilishi. Zaryad tugagach obyekt oddiygina ko'rinmay qoladi va buni hech bir avtomatika tuzatmaydi: stansiyani faqat odam almashtiradi.": "Главный риск этого решения — сорванный график. Когда заряд кончается, объект просто перестаёт быть виден, и никакая автоматика это не исправит: станцию меняет только человек.",
"30 foizda vazifa 12 soatlik muddat bilan ochiladi, 15 foizda shoshilinchga o'tadi va bo'lim boshlig'iga ketadi. Har komplekt ikkita stansiya bilan ishlaydi. Kechikkan vazifa oylik hisobotga chiqadi.":
 "На 30% задача открывается со сроком 12 часов, на 15% переходит в срочные и дублируется руководителю отдела. Каждый комплект работает с двумя станциями. Просроченная задача выходит в месячный отчёт.",
"Stansiyaning o'zi o'g'irlandi": "Украли саму станцию",
"Bo'sh binoda turgan 15–20 kg og'irlikdagi va 10 mln so'mga yaqin turadigan ko'chma qurilma o'zi o'ljaga aylanadi. Bu boshqa yechimlarda yo'q xatar: ularning jihozi devorga o'rnatilgan.":
 "Переносное устройство весом 15–20 кг и стоимостью около 10 млн сумов, стоящее в пустом здании, само становится добычей. В других решениях такого риска нет: их оборудование закреплено на стене.",
"Po'lat quti polga yoki devorga ankerlanadi, qutiga ochilish datchigi qo'yiladi va unga kamera qaratiladi. Stansiya ko'chadan ko'rinadigan xonaga qo'yilmaydi. Komplekt sug'urtalanadi.":
 "Стальной ящик анкерится к полу или стене, на него ставится датчик вскрытия и направляется камера. Станция не размещается в помещении, просматриваемом с улицы. Комплект страхуется.",

"Qaysi obyektga mos, qaysi biriga emas": "Каким объектам подходит, а каким нет",
"Mos keladi": "Подходит", "Mos emas": "Не подходит",
"Balansga endi olingan obyektning birinchi ikki-to'rt haftasi: ko'rik o'tkazilib, doimiy komplekt tanlangunicha bo'shliqni yopadi.":
 "Первые две-четыре недели объекта, только принятого на баланс: закрывает пробел, пока идёт осмотр и выбирается постоянный комплект.",
"Sud yoki ijro jarayonidagi obyekt: uzoq montajga ruxsat yo'q, lekin nazorat bugundan kerak.":
 "Объект в судебном или исполнительном производстве: разрешения на длительный монтаж нет, а контроль нужен уже сегодня.",
"Auksion e'lon qilingan va sotuvgacha bir oydan kam qolgan obyekt.":
 "Объект, по которому объявлен аукцион и до продажи остаётся меньше месяца.",
"Fasadni teshish mumkin bo'lmagan obyekt: me'moriy yodgorlik, yangi ta'mirlangan bino, ijaraga berilgan qism.":
 "Объект, фасад которого нельзя сверлить: памятник архитектуры, недавно отремонтированное здание, сданная в аренду часть.",
"Bazadan ikki soatdan uzoqdagi obyekt: har uch kunda bir qatnov yechimning butun iqtisodini yo'q qiladi.":
 "Объект дальше двух часов от базы: выезд раз в трое суток уничтожает всю экономику решения.",
"Uch oydan ortiq nazoratda turadigan obyekt: bu muddatda 04-yechimning statsionar shkafi arzonroq.":
 "Объект, остающийся под контролем дольше трёх месяцев: на таком сроке стационарный шкаф из решения 04 дешевле.",
"Qulflanadigan xonasi yo'q obyekt: stansiyani xavfsiz qo'yadigan joy bo'lmasa, yechim ishlamaydi.":
 "Объект без запираемого помещения: если станцию негде разместить безопасно, решение не работает.",
"Katta ochiq maydon va doimiy PTZ talab qilinadigan obyekt: yuk 60 Vt dan oshadi va jadval bir kunga tushadi.":
 "Большая открытая территория с постоянной работой PTZ: нагрузка превышает 60 Вт, и график падает до суток.",

"Yetkazib beruvchidan so'raladigan savollar": "Вопросы, которые задают поставщику",
"Katalogda stansiya kVt·soat bilan sotiladi, bizga esa 12 V chiqishning uzluksiz toki va avtomatik o'chirish taymerini bekor qilish imkoni kerak. Shu ikkisiga yozma javob olinadi.": "В каталоге станцию продают по кВт·ч, а нам нужны длительный ток выхода 12 В и возможность отключить таймер автоотключения. По этим двум пунктам ответ берут письменно.",
"12 V DC chiqish uzluksiz necha amper beradi va u qancha vaqt davomida shu tokda ishlay oladi?":
 "Сколько ампер длительно отдаёт выход 12 В DC и как долго он способен работать при этом токе?",
"Katalogdagi cho'qqi qiymat emas, uzluksiz qiymat so'raladi.": "Запрашивается длительное значение, а не пиковое из каталога.",
"Chiqishning avtomatik o'chirish taymerini butunlay o'chirib qo'yish mumkinmi?":
 "Можно ли полностью отключить таймер автоматического выключения выхода?",
"Bu birinchi nosozlikning oldini oladigan yagona sozlama.": "Это единственная настройка, предотвращающая первый отказ.",
"Sikl resursi qaysi razryad chuqurligida e'lon qilingan?": "При какой глубине разряда заявлен ресурс в циклах?",
"3 000 sikl 80 foiz razryadda va 100 foiz razryadda bir xil raqam emas.":
 "3 000 циклов при разряде на 80% и при разряде на 100% — не одна и та же цифра.",
"Razryadning quyi harorat chegarasi qanday va isitilmaydigan xonada kafolat saqlanadimi?":
 "Каков нижний температурный предел разряда и сохраняется ли гарантия в неотапливаемом помещении?",
"Ko'p modellarda chegara −10 °C, undan pastda BMS chiqishni uzadi.":
 "У многих моделей предел −10 °C, ниже него BMS снимает нагрузку с выхода.",
"Zaryad va razryad ma'lumotini olish uchun hujjatlashtirilgan API bormi?":
 "Есть ли документированный API для получения данных о заряде и разряде?",
"Hujjatga havola so'raladi; «ilovada ko'rinadi» degan javob yaramaydi.":
 "Запрашивается ссылка на документацию; ответ «видно в приложении» не принимается.",
"API bulutsiz, mahalliy tarmoq orqali ham ishlaydimi?": "Работает ли API без облака, по локальной сети?",
"Ishlasa, telemetriya kanali ham bank tunneliga o'tadi.": "Если да, канал телеметрии тоже переводится в туннель банка.",
"O'zbekistonda kafolat xizmati qayerda va ta'mir muddati qancha?":
 "Где в Узбекистане находится гарантийный сервис и каков срок ремонта?",
"Ta'mirdagi stansiya bandligi butun jadvalni buzadi.": "Станция, застрявшая в ремонте, ломает весь график.",
"Zaryadlash vaqti nolda to'liqgacha qancha va uni cheklash mumkinmi?":
 "Сколько занимает заряд от нуля до полного и можно ли ограничить ток заряда?",
"Sekin zaryad batareyani saqlaydi, lekin bazadagi navbatni uzaytiradi.":
 "Медленный заряд бережёт батарею, но удлиняет очередь на базе.",
"Stansiya zaryadlanayotganda bir vaqtning o'zida yuk bera oladimi?":
 "Может ли станция отдавать нагрузку одновременно с зарядом?",
"Bu bazadagi sinovni ham, favqulodda holatni ham osonlashtiradi.":
 "Это упрощает и испытание на базе, и работу в нештатной ситуации.",
"Og'irligi qancha va uni bitta odam ko'tarib tushira oladimi?":
 "Каков вес и сможет ли один человек снести её вниз?",
"4 kVt·soatlik stansiya 30 kg dan ortiq bo'ladi va ikkinchi odam kerak bo'ladi.":
 "Станция на 4 кВт·ч весит более 30 кг, и понадобится второй человек.",

"O'nta yechim orasida": "Среди десяти решений",
"Uy va kichik ofis": "Дом и малый офис",
"Tashqi perimetr": "Наружный периметр",
"Tashqi perimetr, PTZ": "Наружный периметр, PTZ",
"Ko'p qurilmali obyekt": "Объект с множеством устройств",
"Ofis va qimmat obyekt": "Офис и дорогой объект",
"Katta ombor, texnik xona": "Большой склад, техническое помещение",
"Ko'chma stansiya": "Мобильная станция",
"Qisqa muddatli aktiv": "Краткосрочный актив",
"Chekka va qimmat obyekt": "Удалённый и дорогой объект",
"Mobil minora": "Мобильная вышка",
"Katta maydon": "Большая территория",
"Klaster shkafi": "Кластерный шкаф",
"Bir hududdagi obyektlar": "Объекты в одной локации",
"ta batafsil": "подробных справок"
});
