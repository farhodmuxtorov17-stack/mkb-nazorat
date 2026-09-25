/* Yechim 09 — mobil kuzatuv minorasi. Sahifadagi bosiladigan bloklar. */
window.MKB_BATAFSIL = Object.assign(window.MKB_BATAFSIL || {}, {

"y09.yuk": {
  yorliq: "Montajchi uchun", sarlavha: "45 vattdan 55 vattgacha: yuk qayerdan yig'iladi",
  tana: "<p>Minorada yuk sutka davomida o'zgaradi va bu o'zgarish energiya balansining o'zagi. Kunduzi IR yoritgichlar o'chiq, kechasi ular yonadi va iste'mol o'ndan ortiq vattga ko'tariladi.</p>" +
    "<table><tr><th>Qurilma</th><th class='n'>Kunduzi, Vt</th><th class='n'>Kechasi, Vt</th></tr>" +
    "<tr><td>360° PTZ kamera</td><td class='n'>12</td><td class='n'>18–22</td></tr>" +
    "<tr><td>Statik kamera, 2 dona</td><td class='n'>9</td><td class='n'>13</td></tr>" +
    "<tr><td>NVR, SSD bilan</td><td class='n'>7</td><td class='n'>7</td></tr>" +
    "<tr><td>4G router</td><td class='n'>5</td><td class='n'>5</td></tr>" +
    "<tr><td>Kontroller va BMS o'z ehtiyoji</td><td class='n'>4</td><td class='n'>4</td></tr>" +
    "<tr class='jami'><td>Jami</td><td class='n'>37</td><td class='n'>47–51</td></tr></table>" +
    "<h4>Yukni tushiradigan uchta qaror</h4>" +
    "<ul><li><b>PTZ kechasi patrulda yurmaydi.</b> Zavod sozlamasida PTZ tinimsiz aylanib chiqadi va har aylanish dvigatelga 8–10 vatt qo'shadi. Kechasi kamera bitta presetda turadi, burilish faqat statik kamera hodisasi bo'yicha bo'ladi.</li>" +
    "<li><b>NVR sanoat SSD'si bilan yig'iladi.</b> Aylanuvchi disk 6–8 vatt oladi va minus haroratda ishga tushmay qolishi mumkin; sanoat SSD si 2 vattdan kam oladi.</li>" +
    "<li><b>IR yoritgich faqat qorong'i sektorga qaratilgan kamerada yoqiladi.</b> Hovli chirog'i yoritib turgan tomonda IR ni o'chirish sutkasiga 0,1 kVt·soatgacha tejaydi.</li></ul>" +
    "<p class='ogoh'>Loyihaga 55 vatt yoziladi, ish rejimi esa 45 vatt atrofida bo'ladi. Bu farq qasddan qoldiriladi: birinchi qishdan keyin kontroller telemetriyasidan haqiqiy iste'mol olinadi va hisob shunga qarab tuzatiladi.</p>",
  manba: [],
  ru: {yorliq: "Для монтажника", sarlavha: "От 45 до 55 Вт: из чего складывается нагрузка",
    tana: "<p>Нагрузка вышки меняется в течение суток, и эта разница — основа энергетического баланса. Днём ИК-прожекторы выключены, ночью они включаются и потребление поднимается больше чем на десяток ватт.</p>" +
      "<table><tr><th>Устройство</th><th class='n'>Днём, Вт</th><th class='n'>Ночью, Вт</th></tr>" +
      "<tr><td>Камера PTZ 360°</td><td class='n'>12</td><td class='n'>18–22</td></tr>" +
      "<tr><td>Статичные камеры, 2 шт.</td><td class='n'>9</td><td class='n'>13</td></tr>" +
      "<tr><td>NVR с SSD</td><td class='n'>7</td><td class='n'>7</td></tr>" +
      "<tr><td>Роутер 4G</td><td class='n'>5</td><td class='n'>5</td></tr>" +
      "<tr><td>Собственные нужды контроллера и BMS</td><td class='n'>4</td><td class='n'>4</td></tr>" +
      "<tr class='jami'><td>Итого</td><td class='n'>37</td><td class='n'>47–51</td></tr></table>" +
      "<h4>Три решения, которые снижают нагрузку</h4>" +
      "<ul><li><b>Ночью PTZ не ходит по патрулю.</b> В заводской настройке PTZ непрерывно обходит сектора, и каждый обход добавляет 8–10 Вт на привод. Ночью камера стоит на одном пресете, поворот выполняется только по событию статичной камеры.</li>" +
      "<li><b>NVR собирается на промышленном SSD.</b> Шпиндельный диск берёт 6–8 Вт и на морозе может не раскрутиться; промышленный SSD потребляет меньше 2 Вт.</li>" +
      "<li><b>ИК-прожектор включается только на камере, смотрящей в тёмный сектор.</b> Отключение ИК там, где светит дворовый фонарь, экономит до 0,1 кВт·ч в сутки.</li></ul>" +
      "<p class='ogoh'>В проект закладывается 55 Вт, рабочий режим выходит около 45 Вт. Этот зазор оставляется намеренно: после первой зимы из телеметрии контроллера берётся фактическое потребление и расчёт уточняется.</p>"}
},

"y09.dekabr": {
  yorliq: "Texnik izoh", sarlavha: "1,7 kVt·soat: dekabr ishlab chiqarishi qanday hisoblangan",
  tana: "<p>Raqam katalogdan olinmaydi, u to'rt bosqichda hisoblanadi va har bosqich tekshiriladigan manbaga tayanadi.</p>" +
    "<table><tr><th>Bosqich</th><th class='n'>Qiymat</th></tr>" +
    "<tr><td>Panel quvvati: 3 × 470 Vt</td><td class='n'>1,41 kVt</td></tr>" +
    "<tr><td>Toshkent, dekabr insolyatsiyasi, 55° burchakda</td><td class='n'>1,62 kVt·soat/m² kuniga</td></tr>" +
    "<tr><td>Nazariy ishlab chiqarish</td><td class='n'>2,28 kVt·soat</td></tr>" +
    "<tr><td>Yo'qotishlar: kontroller, kabel, chang, harorat, panel qarishi</td><td class='n'>−25 %</td></tr>" +
    "<tr class='jami'><td>Hisobga olinadigan qiymat</td><td class='n'>1,7 kVt·soat</td></tr></table>" +
    "<h4>Yigirma besh foiz nimadan yig'iladi</h4>" +
    "<ul><li>MPPT kontrolleri va DC tarmoqda 7–9 foiz.</li>" +
    "<li>Panel sirtidagi chang va qish shudringi 5–8 foiz; hovlida texnika yursa, chang ulushi ikki barobar ko'p bo'ladi.</li>" +
    "<li>Panellarning o'zaro va machta soyasi 3–5 foiz — panel machtaning shimoliy tomoniga o'tqaziladi.</li>" +
    "<li>Besh yillik qarish 2–3 foiz.</li></ul>" +
    "<p class='ogoh'>Hisobda bulut alohida qo'shilmaydi: 1,62 raqami ko'p yillik o'rtacha, ya'ni bulutli kunlar unga allaqachon kiritilgan. Loyihada tekshiriladigan narsa boshqa — ketma-ket besh bulutli kun, ya'ni eng yomon holat.</p>",
  manba: [["PVGIS, Yevropa komissiyasi", "https://re.jrc.ec.europa.eu/pvg_tools/en/"]],
  ru: {yorliq: "Техническая справка", sarlavha: "1,7 кВт·ч: как посчитана декабрьская выработка",
    tana: "<p>Цифра не берётся из каталога — она считается в четыре шага, и каждый шаг опирается на проверяемый источник.</p>" +
      "<table><tr><th>Шаг</th><th class='n'>Значение</th></tr>" +
      "<tr><td>Мощность панелей: 3 × 470 Вт</td><td class='n'>1,41 кВт</td></tr>" +
      "<tr><td>Ташкент, инсоляция в декабре при угле 55°</td><td class='n'>1,62 кВт·ч/м² в сутки</td></tr>" +
      "<tr><td>Теоретическая выработка</td><td class='n'>2,28 кВт·ч</td></tr>" +
      "<tr><td>Потери: контроллер, кабель, пыль, температура, деградация</td><td class='n'>−25 %</td></tr>" +
      "<tr class='jami'><td>Расчётное значение</td><td class='n'>1,7 кВт·ч</td></tr></table>" +
      "<h4>Из чего складываются 25 процентов</h4>" +
      "<ul><li>MPPT-контроллер и потери в цепях постоянного тока — 7–9 процентов.</li>" +
      "<li>Пыль на стекле и зимняя роса — 5–8 процентов; если по двору ходит техника, доля пыли удваивается.</li>" +
      "<li>Взаимное затенение панелей и тень мачты — 3–5 процентов, поэтому панели ставят с северной стороны мачты.</li>" +
      "<li>Деградация за пять лет — 2–3 процента.</li></ul>" +
      "<p class='ogoh'>Облачность в расчёт отдельно не добавляется: 1,62 — многолетнее среднее, пасмурные дни в него уже входят. В проекте проверяется другое — пять пасмурных суток подряд, то есть не среднее, а худший случай.</p>"}
},

"y09.akb": {
  yorliq: "Montajchi uchun", sarlavha: "9,6 kVt·soat blok: nega aynan shuncha va nega 24 volt",
  tana: "<p>Akkumulyator sig'imi bitta kechaga tegishli ham emas: u quyoshsiz haftaga hisoblanadi. Toshkentda dekabrda ketma-ket to'rt-besh bulutli kun oddiy hodisa.</p>" +
    "<table><tr><th>Hisob</th><th class='n'>Qiymat</th></tr>" +
    "<tr><td>Sutkalik sarf, 50 Vt o'rtacha</td><td class='n'>1,2 kVt·soat</td></tr>" +
    "<tr><td>Besh bulutli kun</td><td class='n'>6,0 kVt·soat</td></tr>" +
    "<tr><td>Ruxsat etilgan razryad: 80 foiz</td><td class='n'>÷ 0,8</td></tr>" +
    "<tr><td>Kerakli sig'im</td><td class='n'>7,5 kVt·soat</td></tr>" +
    "<tr class='jami'><td>4 × 200 A·soat, 2S2P: 24 V, 400 A·soat</td><td class='n'>9,6 kVt·soat</td></tr></table>" +
    "<h4>Nega 24 volt</h4>" +
    "<p>50 vattlik yuk 12 voltda 4,2 amper, 24 voltda 2,1 amper tortadi. Zaryad tokida farq kattaroq: 1,41 kilovattlik panel 12 voltda 100 amperdan oshadi, bu esa qalin kabel, yirik kontroller va har ulanishda isish demakdir. Tirkamada kabel uzunligi ikki metrdan oshadi, shuning uchun 24 volt standart tanlov.</p>" +
    "<h4>Sovuq: asosiy shart</h4>" +
    "<p>LiFePO4 elementi 0 °C dan past zaryadni qabul qilmaydi — bu kimyoning cheklovi, sozlama emas. Isitgichsiz blok yanvarda kunduzi quyosh chiqib turganda ham zaryadlanmaydi va besh kunlik zaxira ikki kunga tushadi. Shuning uchun past harorat himoyasi va isitgichi bor blok olinadi; isitgich panel tokidan oziqlanadi, akkumulyatordan emas.</p>" +
    "<p class='ogoh'>Yetkazib beruvchidan akkumulyator sertifikatida ishchi harorat oralig'i alohida so'raladi: zaryad va razryad uchun raqamlar har xil bo'ladi va tijorat taklifida ko'pincha faqat razryad oralig'i yoziladi.</p>",
  manba: [],
  ru: {yorliq: "Для монтажника", sarlavha: "Банк на 9,6 кВт·ч: почему столько и почему 24 вольта",
    tana: "<p>Ёмкость аккумулятора считается не на ночь, а на неделю без солнца. В Ташкенте четыре-пять пасмурных суток подряд в декабре — обычное дело.</p>" +
      "<table><tr><th>Расчёт</th><th class='n'>Значение</th></tr>" +
      "<tr><td>Суточный расход при средних 50 Вт</td><td class='n'>1,2 кВт·ч</td></tr>" +
      "<tr><td>Пять пасмурных суток</td><td class='n'>6,0 кВт·ч</td></tr>" +
      "<tr><td>Допустимая глубина разряда — 80 процентов</td><td class='n'>÷ 0,8</td></tr>" +
      "<tr><td>Требуемая ёмкость</td><td class='n'>7,5 кВт·ч</td></tr>" +
      "<tr class='jami'><td>4 × 200 А·ч, 2S2P: 24 В, 400 А·ч</td><td class='n'>9,6 кВт·ч</td></tr></table>" +
      "<h4>Почему 24 вольта</h4>" +
      "<p>Нагрузка в 50 Вт при 12 В берёт 4,2 ампера, при 24 В — 2,1. В зарядном токе разница ещё заметнее: панели на 1,41 кВт при 12 В дают за 100 ампер, а это толстый кабель, крупный контроллер и нагрев на каждом соединении. На прицепе длина кабеля больше двух метров, поэтому 24 вольта — стандартный выбор.</p>" +
      "<h4>Холод — главное условие</h4>" +
      "<p>Элемент LiFePO4 не принимает заряд при температуре ниже 0 °C: это ограничение самой химии, настройкой его не обойти. Банк без подогрева в январе не заряжается даже в солнечный день, и пятидневный запас превращается в двухдневный. Поэтому берётся банк с низкотемпературной защитой и подогревом, причём подогрев питается от тока панелей: иначе банк греет сам себя и уходит в минус за двое суток.</p>" +
      "<p class='ogoh'>У поставщика отдельно запрашивается рабочий диапазон температур из сертификата: для заряда и для разряда цифры разные, а в коммерческом предложении обычно указывают только разряд.</p>"}
},

"y09.narx": {
  yorliq: "Moliya va huquq", sarlavha: "40 dan 120 mln so'mgacha: farqni nima hosil qiladi",
  tana: "<p>Uch barobarlik tarqoqlik tasodif emas. U to'rtta qarordan chiqadi va har biri tekshirilishi mumkin.</p>" +
    "<table><tr><th>Qaror</th><th>Arzon variant</th><th>Qimmat variant</th></tr>" +
    "<tr><td class='b'>Tirkama va machta</td><td>Mahalliy yig'ilgan, qo'lda ko'tariladigan machta</td><td>Import tirkama, gidravlik machta, sertifikat bilan</td></tr>" +
    "<tr><td class='b'>Akkumulyator</td><td>Isitgichsiz LiFePO4 yoki gel</td><td>Past harorat himoyasi va isitgichi bor blok</td></tr>" +
    "<tr><td class='b'>Kamera</td><td>2 MP statik, oddiy PTZ</td><td>4 MP, kameradagi analitika, avtomatik kuzatuv</td></tr>" +
    "<tr><td class='b'>Zaxira manba</td><td>Yo'q</td><td>Dizel agregat yoki yoqilg'i elementi</td></tr></table>" +
    "<h4>Arzon variantda nima yo'qoladi</h4>" +
    "<p>Qo'lda ko'tariladigan machta bo'ron ogohlantirishida ikki kishi va 20 daqiqa talab qiladi; gidravlikasi bor machtada bu ish bir kishining uch daqiqasi. Isitgichsiz akkumulyator yanvarda zaxirani yarmiga tushiradi. Kamerada analitika bo'lmasa, chiziq kesish serverda hisoblanadi va bu doimiy video oqimini talab qiladi — 4G trafigi oyiga bir necha barobar oshadi.</p>" +
    "<p class='ogoh'>Yetkazish va bojxona jadvalda alohida qator bo'lib turadi (4–17 mln so'm) va u ko'pincha tijorat taklifiga kirmaydi. Taklif so'ralganda «DDP Toshkent» sharti aniq yoziladi, aks holda hisob bojxonada o'zgaradi.</p>",
  manba: [],
  ru: {yorliq: "Финансы и право", sarlavha: "От 40 до 120 млн сумов: чем объясняется разброс",
    tana: "<p>Трёхкратный разброс не случаен. Он складывается из четырёх решений, и каждое можно проверить.</p>" +
      "<table><tr><th>Решение</th><th>Дешёвый вариант</th><th>Дорогой вариант</th></tr>" +
      "<tr><td class='b'>Прицеп и мачта</td><td>Местная сборка, мачта поднимается вручную</td><td>Импортный прицеп, гидравлическая мачта, с сертификатом</td></tr>" +
      "<tr><td class='b'>Аккумулятор</td><td>LiFePO4 без подогрева или гель</td><td>Банк с низкотемпературной защитой и подогревом</td></tr>" +
      "<tr><td class='b'>Камеры</td><td>2 Мп статичные, простая PTZ</td><td>4 Мп, аналитика в камере, автосопровождение</td></tr>" +
      "<tr><td class='b'>Резервный источник</td><td>Нет</td><td>Дизель-генератор или топливный элемент</td></tr></table>" +
      "<h4>Что теряется в дешёвом варианте</h4>" +
      "<p>Мачта с ручным подъёмом при штормовом предупреждении требует двух человек и 20 минут; с гидравликой это три минуты работы одного. Аккумулятор без подогрева в январе срезает запас вдвое. Без аналитики в камере пересечение линии считается на сервере, а это постоянный видеопоток — трафик 4G вырастает в разы.</p>" +
      "<p class='ogoh'>Доставка и таможня стоят в смете отдельной строкой (4–17 млн сумов) и в коммерческое предложение обычно не входят. В запросе прямо указывается условие «DDP Ташкент», иначе расчёт изменится уже на таможне.</p>"}
},

"y09.ptz": {
  yorliq: "Jamoa rahbarlari uchun", sarlavha: "PTZ kamera: presetlar, ONVIF va kuzatuv rejimi",
  tana: "<p>PTZ minoraning asosiy ko'zi, lekin uning qiymati optikada emas — presetlarni platformadan boshqara olishda. Buning uchun kamera ikki profilni qo'llab-quvvatlashi kerak.</p>" +
    "<table><tr><th>Profil</th><th>Nima uchun kerak</th></tr>" +
    "<tr><td class='b'>ONVIF Profile S</td><td>Video oqimi va qurilma ma'lumotlari</td></tr>" +
    "<tr><td class='b'>ONVIF Profile T</td><td>H.265, metama'lumot oqimi, kameradagi analitika hodisalari</td></tr>" +
    "<tr><td class='b'>ONVIF PTZ xizmati</td><td>GotoPreset, AbsoluteMove, presetlar ro'yxati</td></tr></table>" +
    "<h4>Presetlar qanday yoziladi</h4>" +
    "<p>Montajda 4–6 preset yoziladi va ularning raqami platformada obyekt kartochkasiga bog'lanadi: 1 — darvoza, 2 va 3 — burchaklar, 4 — texnika turadigan joy, 5 — omborning eshigi. Statik kameradan chiziq kesish hodisasi kelganda platforma qaysi sektor ekanini biladi va PTZ ga <code>GotoPreset</code> yuboradi. Burilish 2–4 soniya oladi.</p>" +
    "<h4>Avtomatik kuzatuv haqida</h4>" +
    "<p>Ko'p PTZ kameralarda harakatni avtomatik kuzatish rejimi bor. Ochiq hovlida u itga, daraxt soyasiga va yorug'lik o'zgarishiga ergashib ketadi, natijada dvigatel tinmay ishlaydi va sutkalik sarf 0,2 kVt·soatgacha oshadi. Amalda bu rejim o'chiriladi: burilish faqat statik kamera bergan hodisa bo'yicha qilinadi.</p>" +
    "<p class='ogoh'>Kamera parolini zavod holatida qoldirib bo'lmaydi va ONVIF uchun alohida foydalanuvchi yaratiladi: faqat oqim va PTZ huquqi bilan, sozlamalarni o'zgartirish huquqisiz.</p>",
  manba: [["ONVIF Profile T", "https://www.onvif.org/profiles/profile-t/"]],
  ru: {yorliq: "Для тимлида", sarlavha: "Камера PTZ: пресеты, ONVIF и режим автосопровождения",
    tana: "<p>PTZ — главный глаз вышки, но её ценность не в оптике, а в возможности управлять пресетами с платформы. Для этого камера должна поддерживать два профиля.</p>" +
      "<table><tr><th>Профиль</th><th>Зачем нужен</th></tr>" +
      "<tr><td class='b'>ONVIF Profile S</td><td>Видеопоток и сведения об устройстве</td></tr>" +
      "<tr><td class='b'>ONVIF Profile T</td><td>H.265, поток метаданных, события аналитики камеры</td></tr>" +
      "<tr><td class='b'>Служба ONVIF PTZ</td><td>GotoPreset, AbsoluteMove, список пресетов</td></tr></table>" +
      "<h4>Как записываются пресеты</h4>" +
      "<p>При монтаже записывается 4–6 пресетов, и их номера привязываются на платформе к карточке объекта: 1 — ворота, 2 и 3 — углы, 4 — площадка техники, 5 — дверь склада. Когда со статичной камеры приходит событие пересечения линии, платформа знает сектор и отправляет камере <code>GotoPreset</code>. Поворот занимает 2–4 секунды.</p>" +
      "<h4>Об автосопровождении</h4>" +
      "<p>У большинства PTZ есть режим автоматического сопровождения движения. На открытом дворе он уходит за собакой, тенью дерева и сменой освещения — привод работает без остановки, и суточный расход растёт до 0,2 кВт·ч. На практике режим отключают: поворот выполняется только по событию со статичной камеры.</p>" +
      "<p class='ogoh'>Заводской пароль камеры оставлять нельзя, а для ONVIF заводится отдельный пользователь: только поток и PTZ, без права менять настройки.</p>"}
},

"y09.karnay": {
  yorliq: "Jamoa rahbarlari uchun", sarlavha: "Karnay: bir gapning narxi va uning hujjati",
  tana: "<p>Ovozli ogohlantirish minorani passiv kuzatuvdan ta'sir vositasiga aylantiradi. Amalda hodisalarning katta qismi shu bosqichda tugaydi: odam kamerani ko'rmasligi mumkin, lekin ovozni eshitadi va ketadi.</p>" +
    "<h4>Ulash uchun uch yo'l</h4>" +
    "<ul><li><b>Kameraning audio chiqishi.</b> Eng sodda: operator platformadagi tugmani bosadi, ovoz kameraning kuchaytirgichiga boradi. Cheklovi — quvvat 10–15 vatt, ochiq maydonda 30 metrgacha eshitiladi.</li>" +
    "<li><b>Routerning rele chiqishi.</b> Sirena alohida oziqlanadi va 100 vattgacha bo'ladi. Buyruq tunnel orqali routerga boradi.</li>" +
    "<li><b>Oldindan yozilgan xabar.</b> Operator bo'sh bo'lmasa, kamera hodisada o'zi yozuvni qo'yadi. Reaksiya vaqti nolga tushadi.</li></ul>" +
    "<h4>Har yoqilish jurnalga tushadi</h4>" +
    "<p>Platforma sirena va karnayning har yoqilishini kim, qachon, qaysi hodisa bo'yicha qilganini yozib qo'yadi. Bu keyingi bahsda kerak bo'ladi: ovozli ogohlantirish qo'shni bilan nizoga aylanishi mumkin va bank tomonidan bir gap — hodisa qaydi bilan birga — butun masalani yopadi.</p>" +
    "<p class='ogoh'>Doimiy ovoz yozish alohida masala: kamera mikrofoni yoqilgan bo'lsa, bu shaxsiy hayotga taalluqli ma'lumot yig'ish deb qaraladi. Minorada mikrofon o'chirilgan holda qoldiriladi, karnay esa faqat chiqish sifatida ishlatiladi.</p>",
  manba: [],
  ru: {yorliq: "Для тимлида", sarlavha: "Громкоговоритель: цена одной фразы и её документ",
    tana: "<p>Голосовое предупреждение превращает вышку из пассивного наблюдения в средство воздействия. На практике значительная часть инцидентов заканчивается именно здесь: камеру человек может не заметить, а голос слышит и уходит.</p>" +
      "<h4>Три способа подключения</h4>" +
      "<ul><li><b>Аудиовыход камеры.</b> Самый простой: оператор нажимает кнопку на платформе, звук идёт на усилитель камеры. Ограничение — мощность 10–15 Вт, на открытой площадке слышно метров на тридцать.</li>" +
      "<li><b>Релейный выход роутера.</b> Сирена питается отдельно и может быть до 100 Вт. Команда идёт на роутер через туннель.</li>" +
      "<li><b>Заранее записанное сообщение.</b> Если оператор занят, камера сама проигрывает запись по событию. Время реакции падает до нуля.</li></ul>" +
      "<h4>Каждое включение попадает в журнал</h4>" +
      "<p>Платформа фиксирует каждое включение сирены и громкоговорителя: кто, когда и по какому событию. Это понадобится в последующем разборе: голосовое предупреждение может перерасти в конфликт с соседями, и одна фраза со стороны банка вместе с записью события закрывает вопрос.</p>" +
      "<p class='ogoh'>Постоянная аудиозапись — отдельная тема: включённый микрофон камеры означает сбор данных, относящихся к частной жизни. На вышке микрофон оставляют отключённым, а громкоговоритель используют только как выход.</p>"}
},

"y09.panel": {
  yorliq: "Montajchi uchun", sarlavha: "Qishki burchak 55 daraja va qor masalasi",
  tana: "<p>Panel burchagi minorada ikki vazifani bir vaqtda hal qiladi va shuning uchun u qishki quyosh balandligiga sozlanadi.</p>" +
    "<table><tr><th>Burchak</th><th>Dekabrda beradi</th><th>Qor</th></tr>" +
    "<tr><td>25° (yozgi)</td><td class='n'>1,15 kVt·soat</td><td>Ustida qoladi</td></tr>" +
    "<tr><td>40° (o'rtacha)</td><td class='n'>1,5 kVt·soat</td><td>Qisman qoladi</td></tr>" +
    "<tr><td class='b'>55° (qishki)</td><td class='n'>1,7 kVt·soat</td><td>O'zi sirg'alib tushadi</td></tr></table>" +
    "<h4>Nega qor burchakdan muhimroq</h4>" +
    "<p>Bir barmoq qalinlikdagi qor qatlami ishlab chiqarishni nolga tushiradi — panel ishlab chiqarishni butunlay to'xtatadi. Toshkentda qor uzoq turmaydi, lekin uch kun ham dekabrda zaxirani yarmiga yeydi. Ellik besh daraja burchakda qor o'z og'irligi bilan sirg'alib tushadi va servisga borish shart bo'lmaydi.</p>" +
    "<h4>Panel va machta</h4>" +
    "<p>Panellar machtaning shimoliy tomoniga qo'yiladi: janubiy tomonda machta kun bo'yi soya tashlaydi va bitta elementga tushgan soya panelning butun qatorini pasaytiradi. Ramka shamolda tebranmasligi uchun tirkamaning ramasiga tortiladi, panel ostiga esa qor qatlami yig'ilmasligi uchun bo'shliq qoldiriladi.</p>" +
    "<p class='ogoh'>Ko'chirishdan oldin panel burchagi vaqtincha gorizontal holatga tushiriladi. Ko'tarilgan panel yo'lda shamol kuchini ko'taradi va tirkamani chayqatadi.</p>",
  manba: [],
  ru: {yorliq: "Для монтажника", sarlavha: "Зимний угол 55 градусов и вопрос снега",
    tana: "<p>Угол наклона панелей решает на вышке сразу две задачи, поэтому его выставляют под высоту зимнего солнца.</p>" +
      "<table><tr><th>Угол</th><th>Выработка в декабре</th><th>Снег</th></tr>" +
      "<tr><td>25° (летний)</td><td class='n'>1,15 кВт·ч</td><td>Остаётся на стекле</td></tr>" +
      "<tr><td>40° (средний)</td><td class='n'>1,5 кВт·ч</td><td>Частично остаётся</td></tr>" +
      "<tr><td class='b'>55° (зимний)</td><td class='n'>1,7 кВт·ч</td><td>Сходит сам</td></tr></table>" +
      "<h4>Почему снег важнее угла</h4>" +
      "<p>Слой снега толщиной в палец обнуляет выработку — панель останавливается не на четверть, а полностью. В Ташкенте снег лежит недолго, но и трое суток в декабре съедают половину запаса. При 55 градусах снег сходит под собственным весом, и выезжать на объект не приходится.</p>" +
      "<h4>Панели и мачта</h4>" +
      "<p>Панели ставятся с северной стороны мачты: с южной мачта весь день даёт тень, а тень на одном элементе снижает выработку всей цепочки. Рама притягивается к раме прицепа, чтобы не гуляла на ветру, а под панелями оставляется просвет, чтобы там не копился снег.</p>" +
      "<p class='ogoh'>Перед перевозкой панели переводят в горизонтальное положение. Поднятая панель в дороге работает как парус и раскачивает прицеп.</p>"}
},

"y09.kontroller": {
  yorliq: "Texnik izoh", sarlavha: "Quvvat kontrolleri: Modbus TCP va MQTT, qaysi registrlar kerak",
  tana: "<p>Minorada quvvat qismi ko'pincha Victron GX oilasidagi kontroller bilan boshqariladi. Undan ma'lumot olishning ikki rasmiy yo'li bor va ikkalasi ham zavod holatida o'chiq turadi — sozlamada qo'lda yoqiladi.</p>" +
    "<table><tr><th>Yo'l</th><th>Port</th><th>Qachon tanlanadi</th></tr>" +
    "<tr><td class='b'>Modbus TCP</td><td class='n'>502</td><td>Platforma o'zi 60 soniyada bir so'raganda</td></tr>" +
    "<tr><td class='b'>MQTT</td><td class='n'>1883 / 8883</td><td>O'zgarish bo'lganda darhol xabar kerak bo'lganda</td></tr></table>" +
    "<h4>Qaysi qiymatlar olinadi</h4>" +
    "<ul><li><b>Akkumulyator zaryadi, foiz.</b> Asosiy ko'rsatkich; 40 foizdan pastga tushsa ogohlantirish, 25 foizda hodisa.</li>" +
    "<li><b>Akkumulyator kuchlanishi va toki.</b> Foizga ishonmaslik uchun: BMS hisobi adashishi mumkin, kuchlanish esa haqiqatni ko'rsatadi.</li>" +
    "<li><b>Panel quvvati va kunlik ishlab chiqarish.</b> Qor yoki chang panelni yopganini shu qiymat ochib beradi — ishlab chiqarish quyoshli kunda kutilgandan ikki barobar past bo'ladi.</li>" +
    "<li><b>Harorat.</b> Nolga yaqinlashganda zaryad to'xtaydi; operator buni oldindan ko'rishi kerak.</li></ul>" +
    "<h4>MQTT ning bitta o'ziga xosligi</h4>" +
    "<p>Victron MQTT brokeri nashrni o'zi to'xtatadi: obunachi har 30 soniyada <code>R/{portal_id}/keepalive</code> mavzusiga xabar yubormasa, qiymatlar kelishdan to'xtaydi. Adapterga shu takrorlanuvchi xabar kiritilmasa, telemetriya bir daqiqada jimib qoladi va buni nosozlik deb o'ylashadi.</p>" +
    "<p class='ogoh'>Kontrollerning bulutli portali (VRM) bank tomonidan ishlatilmaydi: ma'lumot chet eldagi serverga chiqmasligi kerak. Modbus va MQTT faqat tunnel ichida ochiladi, tashqi interfeysda bu portlar yopiq qoladi.</p>",
  manba: [["Victron GX Modbus-TCP", "https://www.victronenergy.com/live/ccgx:modbustcp_faq"], ["Victron dbus-flashmq", "https://github.com/victronenergy/dbus-flashmq"]],
  ru: {yorliq: "Техническая справка", sarlavha: "Контроллер питания: Modbus TCP и MQTT, какие регистры нужны",
    tana: "<p>Энергетическую часть вышки чаще всего ведёт контроллер семейства Victron GX. Забрать из него данные можно двумя штатными способами, и оба в заводском состоянии выключены — включаются вручную в настройках.</p>" +
      "<table><tr><th>Способ</th><th>Порт</th><th>Когда выбирают</th></tr>" +
      "<tr><td class='b'>Modbus TCP</td><td class='n'>502</td><td>Платформа сама опрашивает раз в 60 секунд</td></tr>" +
      "<tr><td class='b'>MQTT</td><td class='n'>1883 / 8883</td><td>Нужно сообщение сразу при изменении</td></tr></table>" +
      "<h4>Какие значения снимаются</h4>" +
      "<ul><li><b>Заряд аккумулятора в процентах.</b> Главный показатель: ниже 40 процентов — предупреждение, на 25 — событие.</li>" +
      "<li><b>Напряжение и ток аккумулятора.</b> Чтобы не верить одним процентам: расчёт BMS может уплыть, а напряжение показывает факт.</li>" +
      "<li><b>Мощность панелей и суточная выработка.</b> Именно это значение выдаёт снег или пыль на стекле — в солнечный день выработка вдвое ниже ожидаемой.</li>" +
      "<li><b>Температура.</b> У нуля заряд прекращается, и оператор должен видеть это заранее.</li></ul>" +
      "<h4>Одна особенность MQTT</h4>" +
      "<p>Брокер Victron сам останавливает публикацию: если подписчик не отправляет каждые 30 секунд сообщение в тему <code>R/{portal_id}/keepalive</code>, значения перестают приходить. Если этот повторяющийся запрос не заложен в адаптер, телеметрия смолкает через минуту, и это принимают за отказ.</p>" +
      "<p class='ogoh'>Облачный портал контроллера (VRM) банком не используется: данные не должны уходить на зарубежный сервер. Modbus и MQTT открываются только внутри туннеля, на внешнем интерфейсе эти порты остаются закрытыми.</p>"}
},

"y09.shamol": {
  yorliq: "Nosozlik", sarlavha: "Shamol chegarasi: raqam reglamentda turishi kerak",
  tana: "<p>Ko'tarilgan machta — minoraning eng zaif qismi. Bo'ronda u sinadi va yiqilganda kameralarni, ba'zan tirkamaning o'zini ham olib ketadi. Buni oldini oladigan yagona narsa — oldindan yozilgan raqam va unga amal qilish tartibi.</p>" +
    "<table><tr><th>Holat</th><th>Nima qilinadi</th></tr>" +
    "<tr><td>Shamol chegaradan past</td><td>Machta ko'tarilgan holda qoladi</td></tr>" +
    "<tr><td>Ob-havo ogohlantirishi keldi</td><td>Obyektga odam boradi va machtani tushiradi</td></tr>" +
    "<tr><td>Og'ish datchigi ishladi</td><td>Platformada hodisa, mas'ul xodimga qo'ng'iroq</td></tr>" +
    "<tr><td>Machta tushirilgan</td><td>Kameralar past turadi, ko'rish maydoni tor — bu vaqtincha holat</td></tr></table>" +
    "<h4>Nega masofadan tushirib bo'lmaydi</h4>" +
    "<p>Machtani tushirish oldidan uning atrofi bo'sh ekaniga ishonch hosil qilinishi kerak: odam, texnika, elektr simi. Shuning uchun ishlab chiqaruvchilar bu amalni masofadan boshqarishga chiqarmaydi. Amalda bu shuni bildiradi: minora qo'yiladigan obyektga yetib borish vaqti oldindan o'lchanadi va reglamentga yoziladi. Ikki soatdan uzoq obyektda bu yechim xatarli bo'ladi.</p>" +
    "<p class='ogoh'>Og'ish datchigi tirkamaning ramasiga qo'yiladi va u ikki vazifani bajaradi: bo'ronda machtaning qiyshayishini, o'g'irlikda esa tirkamaning ko'tarilishini ko'rsatadi. Ikkala holatda ham platformaga darhol hodisa tushadi.</p>",
  manba: [["Armorlogix AL3000", "https://armorlogix.com/product/al3000/"]],
  ru: {yorliq: "Отказ", sarlavha: "Ветровой предел: цифра должна стоять в регламенте",
    tana: "<p>Поднятая мачта — самая уязвимая часть вышки. В шторм она складывается и при падении забирает камеры, а иногда и сам прицеп. Единственное, что это предотвращает, — заранее записанная цифра и порядок её соблюдения.</p>" +
      "<table><tr><th>Ситуация</th><th>Что делается</th></tr>" +
      "<tr><td>Ветер ниже предела</td><td>Мачта остаётся поднятой</td></tr>" +
      "<tr><td>Пришло штормовое предупреждение</td><td>На объект выезжает человек и опускает мачту</td></tr>" +
      "<tr><td>Сработал датчик наклона</td><td>Событие на платформе, звонок ответственному</td></tr>" +
      "<tr><td>Мачта опущена</td><td>Камеры стоят низко, обзор узкий — это временное состояние</td></tr></table>" +
      "<h4>Почему нельзя опустить дистанционно</h4>" +
      "<p>Перед опусканием нужно убедиться, что вокруг мачты пусто: люди, техника, провода. Поэтому производители не выводят эту операцию на дистанционное управление. На практике это значит: время доезда до объекта, где стоит вышка, измеряется заранее и записывается в регламент. Если ехать дольше двух часов, решение становится рискованным.</p>" +
      "<p class='ogoh'>Датчик наклона ставится на раму прицепа и решает две задачи: в шторм показывает крен мачты, при краже — подъём прицепа. В обоих случаях событие приходит на платформу немедленно.</p>"}
},

"y09.hodisa": {
  yorliq: "Jamoa rahbarlari uchun", sarlavha: "03:40 dagi hodisa: 60 soniyaning taqsimoti",
  tana: "<p>Chiziq kesilgan paytdan operatorning ovozli javobigacha bo'lgan yo'l bir daqiqaga sig'adi. Har bosqichning o'z vaqti bor va u o'lchanadi.</p>" +
    "<table><tr><th>Bosqich</th><th class='n'>Vaqt</th></tr>" +
    "<tr><td>Kamera chiziq kesilganini hisoblaydi</td><td class='n'>0,3–0,8 s</td></tr>" +
    "<tr><td>ONVIF hodisasi NVR ga va tunnelga chiqadi</td><td class='n'>1–2 s</td></tr>" +
    "<tr><td>Adapter hodisani yagona sxemaga o'giradi</td><td class='n'>&lt; 1 s</td></tr>" +
    "<tr><td>Platforma PTZ ga preset buyrug'ini yuboradi</td><td class='n'>2–4 s</td></tr>" +
    "<tr><td>Operatorga bildirishnoma va klip</td><td class='n'>5–8 s</td></tr>" +
    "<tr class='jami'><td>Operator ko'rgunga qadar</td><td class='n'>10–15 s</td></tr></table>" +
    "<h4>Nega klip darhol yuborilmaydi</h4>" +
    "<p>To'liq video 4G kanalida vaqt oladi va dekabr kechasida trafik pulga tushadi. Shuning uchun platformaga avval hodisa yozuvi va bitta kadr boradi, klip esa operator so'ragandagina yuboriladi. Yozuvning o'zi minoradagi NVR da qoladi va u yerda 14 kun saqlanadi.</p>" +
    "<h4>Noto'g'ri hodisa bilan nima bo'ladi</h4>" +
    "<p>It, qush yoki shamolda tebrangan branzent birinchi haftada kuniga o'nlab hodisa beradi. Ular o'chirilmaydi, balki chegara sozlanadi: minimal obyekt o'lchami, kesish yo'nalishi va kunning vaqti. Bir haftadan keyin oqim sutkasiga bir-ikki hodisaga tushadi — shundan keyingina operatorga bildirishnoma yoqiladi.</p>",
  manba: [],
  ru: {yorliq: "Для тимлида", sarlavha: "Событие в 03:40: как распределяется минута",
    tana: "<p>Путь от пересечения линии до голосового ответа оператора укладывается в минуту. У каждого шага своё время, и оно измеряется.</p>" +
      "<table><tr><th>Шаг</th><th class='n'>Время</th></tr>" +
      "<tr><td>Камера обсчитывает пересечение линии</td><td class='n'>0,3–0,8 с</td></tr>" +
      "<tr><td>Событие ONVIF уходит в NVR и туннель</td><td class='n'>1–2 с</td></tr>" +
      "<tr><td>Адаптер приводит событие к единой схеме</td><td class='n'>&lt; 1 с</td></tr>" +
      "<tr><td>Платформа отправляет PTZ команду на пресет</td><td class='n'>2–4 с</td></tr>" +
      "<tr><td>Уведомление и кадр оператору</td><td class='n'>5–8 с</td></tr>" +
      "<tr class='jami'><td>Пока оператор не увидел</td><td class='n'>10–15 с</td></tr></table>" +
      "<h4>Почему клип не отправляется сразу</h4>" +
      "<p>Полное видео занимает время в канале 4G, а декабрьской ночью трафик стоит денег. Поэтому на платформу сначала уходит запись события и один кадр, а клип отправляется только по запросу оператора. Сама запись остаётся на NVR вышки и хранится там 14 суток.</p>" +
      "<h4>Что происходит с ложными событиями</h4>" +
      "<p>Собака, птица или качающийся на ветру брезент в первую неделю дают десятки событий в сутки. Их не отключают, а настраивают пороги: минимальный размер объекта, направление пересечения и время суток. Через неделю поток падает до одного-двух событий в сутки — и только после этого включаются уведомления оператору.</p>"}
},

"y09.zaxira": {
  yorliq: "Rahbariyat uchun", sarlavha: "Zaxira manba: qishda yagona kafolat",
  tana: "<p>Quyosh paneli dekabrda yukni zo'rg'a qoplaydi. Uch kunlik qor yoki bulutli hafta zaxirani yeb qo'yadi va bu yerda tanlov ikkitaga qisqaradi: joyga borib akkumulyatorni zaryadlash yoki tirkamada avtomatik yonadigan manba saqlash.</p>" +
    "<table><tr><th>Variant</th><th>Qo'shimcha narx</th><th>Cheklovi</th></tr>" +
    "<tr><td class='b'>Dizel agregat</td><td class='n'>10–20 mln so'm</td><td>Yoqilg'i quyish uchun qatnov, shovqin, o'g'irlik xatari</td></tr>" +
    "<tr><td class='b'>Metanolli element</td><td class='n'>25–40 mln so'm</td><td>Kartrij tashish va saqlash qoidalari</td></tr>" +
    "<tr><td class='b'>Zaxirasiz</td><td class='n'>0</td><td>Qishda 5–6 kunda bir qatnov</td></tr></table>" +
    "<h4>Qachon yonadi</h4>" +
    "<p>Zaxira manba akkumulyator 30 foizga tushganda avtomatik ishga tushadi va 80 foizda o'chadi. Bu oraliq ataylab keng olinadi: har ishga tushish resurs sarflaydi, shuning uchun manba kuniga bir marta uzoq ishlagani qisqa-qisqa o'n marta yongandan yaxshiroq. Har yonish va o'chish platformaga hodisa bo'lib tushadi.</p>" +
    "<p class='ogoh'>Zaxirasiz minora ham ishlaydi, lekin unda qishki reglament boshqacha bo'ladi: akkumulyator 40 foizga tushganda mas'ul xodimga vazifa ochiladi va u 24 soat ichida joyga boradi. Bu qaror hisobda alohida raqam bilan turadi: yiliga 8–12 qo'shimcha qatnov.</p>",
  manba: [],
  ru: {yorliq: "Для правления", sarlavha: "Резервный источник: единственная гарантия зимой",
    tana: "<p>Солнечная панель в декабре едва закрывает нагрузку. Три дня снега или пасмурная неделя съедают запас, и выбор здесь сводится к двум вариантам: ехать на объект и заряжать аккумулятор или держать на прицепе источник, который включается сам.</p>" +
      "<table><tr><th>Вариант</th><th>Доплата</th><th>Ограничение</th></tr>" +
      "<tr><td class='b'>Дизель-генератор</td><td class='n'>10–20 млн сумов</td><td>Выезд для заправки, шум, риск кражи</td></tr>" +
      "<tr><td class='b'>Метанольный элемент</td><td class='n'>25–40 млн сумов</td><td>Правила перевозки и хранения картриджей</td></tr>" +
      "<tr><td class='b'>Без резерва</td><td class='n'>0</td><td>Зимой выезд раз в 5–6 суток</td></tr></table>" +
      "<h4>Когда включается</h4>" +
      "<p>Резервный источник запускается автоматически при заряде 30 процентов и останавливается на 80. Интервал берётся широким намеренно: каждый пуск расходует ресурс, поэтому один долгий сеанс в сутки лучше десяти коротких. Каждый пуск и останов приходят на платформу событием.</p>" +
      "<p class='ogoh'>Вышка работает и без резерва, но тогда зимний регламент другой: при заряде 40 процентов ответственному открывается задача, и он выезжает в течение суток. Это решение стоит в расчёте отдельной цифрой: 8–12 дополнительных выездов в год.</p>"}
},

"y09.tarmoq": {
  yorliq: "Texnik izoh", sarlavha: "NVR, router va tunnel: nima ichkarida qoladi",
  tana: "<p>Minora ochiq maydonda turadi va uning tarmog'i bankning ichki tarmog'i sifatida qaraladi. Bu quyidagi qoidalarga aylanadi.</p>" +
    "<ul><li><b>Yozuv joyida qoladi.</b> NVR 14 kunlik arxivni SSD da saqlaydi. Platformaga faqat hodisa yozuvi va kadr ketadi; to'liq klip so'rov bo'yicha yuboriladi.</li>" +
    "<li><b>Portlar tashqariga chiqmaydi.</b> Modbus (502), RTSP (554) va kameraning veb-interfeysi faqat VPN ichida ochiq. Tashqi IP dan bu portlarga murojaat qilib bo'lmaydi.</li>" +
    "<li><b>Ikki SIM.</b> Ikki operator, avtomatik o'tish. Bitta operator hududda yo'qolsa — bu chekkada odatiy hol — kanal ikkinchisiga o'tadi.</li>" +
    "<li><b>Router SNMP v3 bilan.</b> Signal darajasi, operator nomi va trafik hisobi platformaga tushadi. v2c ishlatilmaydi: unda parol ochiq ketadi.</li></ul>" +
    "<h4>Trafik hisobi</h4>" +
    "<p>Doimiy oqim bo'lmagan holatda minora oyiga 8–15 GB sarflaydi: telemetriya, hodisa kadrlari va operator so'ragan kliplar. Operator kun bo'yi jonli video ko'rsa, bu raqam 100 GB dan oshadi. Shuning uchun tarifda qattiq cheklov o'rniga ogohlantirish qo'yiladi va oylik hisob platformada obyekt kartochkasida ko'rinadi.</p>" +
    "<p class='ogoh'>Router va NVR tirkamaning qulflanadigan bo'limida turadi. Bo'lim ochilishiga datchik qo'yiladi: jihozga qo'l urilgani platformada video hodisasidan oldin ko'rinadi.</p>",
  manba: [],
  ru: {yorliq: "Техническая справка", sarlavha: "NVR, роутер и туннель: что остаётся внутри",
    tana: "<p>Вышка стоит на открытой площадке, и её сеть рассматривается как внутренняя сеть банка. Из этого следуют правила.</p>" +
      "<ul><li><b>Запись остаётся на месте.</b> NVR хранит 14-суточный архив на SSD. На платформу уходят только запись события и кадр; полный клип отправляется по запросу.</li>" +
      "<li><b>Порты наружу не выходят.</b> Modbus (502), RTSP (554) и веб-интерфейс камеры открыты только внутри VPN. С внешнего адреса обратиться к ним нельзя.</li>" +
      "<li><b>Две SIM-карты.</b> Два оператора с автоматическим переключением. Если один оператор в районе пропал — на выселках это обычное дело — канал уходит на второго.</li>" +
      "<li><b>Роутер с SNMP v3.</b> Уровень сигнала, имя оператора и счётчик трафика приходят на платформу. v2c не используется: там пароль идёт открытым текстом.</li></ul>" +
      "<h4>Учёт трафика</h4>" +
      "<p>Без постоянного потока вышка расходует 8–15 ГБ в месяц: телеметрия, кадры событий и запрошенные оператором клипы. Если оператор весь день смотрит живое видео, цифра переваливает за 100 ГБ. Поэтому в тарифе ставится не отсечка, а предупреждение, а месячный расход виден на платформе в карточке объекта.</p>" +
      "<p class='ogoh'>Роутер и NVR стоят в запираемом отсеке прицепа. На отсек ставится датчик вскрытия: попытка добраться до оборудования видна на платформе раньше, чем событие с камеры.</p>"}
},

"y09.adapter": {
  yorliq: "Texnik izoh", sarlavha: "Adapter: ikki manbani bitta kartochkaga yig'adi",
  tana: "<p>Minorada ikki xil ma'lumot bor va ular bir-biriga o'xshamaydi: kameradan hodisa, kontrollerdan o'lchov. Adapterning vazifasi — ikkalasini yagona sxemaga keltirish va bitta minora kartochkasiga bog'lash.</p>" +
    "<table><tr><th>Manba</th><th>Nima keladi</th><th>Nimaga aylanadi</th></tr>" +
    "<tr><td>Kamera, ONVIF</td><td>Chiziq kesish, hudud, tamper</td><td>Hodisa: turi, vaqti, kadri</td></tr>" +
    "<tr><td>Kontroller, Modbus/MQTT</td><td>Foiz, kuchlanish, quvvat, harorat</td><td>O'lchov qatori, 60 soniyada</td></tr>" +
    "<tr><td>Router, SNMP v3</td><td>Signal, operator, trafik</td><td>Aloqa holati</td></tr>" +
    "<tr><td>Og'ish va bo'lim datchiklari</td><td>Quruq kontakt</td><td>Hodisa: yuqori darajali</td></tr></table>" +
    "<h4>Minora kartochkasi obyektdan mustaqil</h4>" +
    "<p>Bu yechimning asosiy farqi shunda: minora ko'chib yuradi. Shuning uchun u alohida reyestrda turadi va obyektga vaqtincha bog'lanadi. Ko'chirilganda eski bog'lanish yopiladi, yangisi ochiladi, tarixda esa qaysi minora qaysi obyektda qancha turgani qoladi. Bu ma'lumot keyin ijara yoki xarid qarorini asoslashda ishlatiladi.</p>" +
    "<p class='ogoh'>Har qurilma o'z <code>device_id</code> siga ega bo'ladi va u minora kartochkasiga bog'lanadi. Obyekt kodi esa o'zgaruvchan maydon: u ko'chirishda almashadi. Shu tuzilish buzilsa, ko'chirishdan keyin eski obyektda ham hodisa ko'rinib turadi.</p>",
  manba: [],
  ru: {yorliq: "Техническая справка", sarlavha: "Адаптер: сводит два источника в одну карточку",
    tana: "<p>На вышке два разных типа данных, и они не похожи друг на друга: события с камеры и измерения с контроллера. Задача адаптера — привести оба к единой схеме и привязать к одной карточке вышки.</p>" +
      "<table><tr><th>Источник</th><th>Что приходит</th><th>Во что превращается</th></tr>" +
      "<tr><td>Камера, ONVIF</td><td>Пересечение линии, зона, вскрытие</td><td>Событие: тип, время, кадр</td></tr>" +
      "<tr><td>Контроллер, Modbus/MQTT</td><td>Процент, напряжение, мощность, температура</td><td>Строка измерений, раз в 60 секунд</td></tr>" +
      "<tr><td>Роутер, SNMP v3</td><td>Сигнал, оператор, трафик</td><td>Состояние связи</td></tr>" +
      "<tr><td>Датчики наклона и отсека</td><td>Сухой контакт</td><td>Событие высокого приоритета</td></tr></table>" +
      "<h4>Карточка вышки не зависит от объекта</h4>" +
      "<p>В этом главное отличие решения: вышка переезжает. Поэтому она хранится не внутри карточки объекта, а в отдельном реестре и привязывается к объекту временно. При перемещении старая привязка закрывается, открывается новая, а в истории остаётся, какая вышка на каком объекте и сколько простояла. Эти данные потом используются при обосновании аренды или покупки.</p>" +
      "<p class='ogoh'>У каждого устройства свой <code>device_id</code>, и он привязан к карточке вышки. Код объекта — изменяемое поле: он меняется при перемещении. Если нарушить эту структуру, после переезда события продолжат отображаться и на старом объекте.</p>"}
},

"y09.operator": {
  yorliq: "Jamoa rahbarlari uchun", sarlavha: "Operator ekrani: nima ko'rinadi va nima qilinadi",
  tana: "<p>Minora kartochkasi oddiy obyekt kartochkasidan uch narsa bilan farq qiladi: PTZ boshqaruvi, karnay tugmasi va quvvat grafigi.</p>" +
    "<table><tr><th>Amal</th><th>Kim qila oladi</th><th>Jurnalga yoziladimi</th></tr>" +
    "<tr><td>Jonli oqimni ochish</td><td>Operator, mas'ul xodim</td><td>Ha</td></tr>" +
    "<tr><td>PTZ ni burish va presetga qaytarish</td><td>Operator</td><td>Ha</td></tr>" +
    "<tr><td>Karnaydan ogohlantirish</td><td>Operator</td><td>Ha, matni bilan</td></tr>" +
    "<tr><td>Sirenani yoqish</td><td>Xavfsizlik xizmati</td><td>Ha</td></tr>" +
    "<tr><td>Arxivdan klip so'rash</td><td>Operator, tekshiruvchi</td><td>Ha</td></tr>" +
    "<tr><td>Minorani boshqa obyektga bog'lash</td><td>Aktiv menejeri</td><td>Ha, tarix bilan</td></tr></table>" +
    "<h4>Uch kunlik tendensiya</h4>" +
    "<p>Akkumulyator foizining bir lahzalik qiymati kam narsa aytadi: kunduzi u ko'tariladi, kechasi tushadi. Kartochkada uch kunlik grafik ko'rsatiladi va operator asosiy narsani shundan ko'radi — har kuni ertalabki eng past nuqta oldingi kunnikidan pastroq bo'lsa, minora zaxirani yeyapti va bir hafta ichida o'chadi.</p>" +
    "<p class='ogoh'>Karnay va sirena tugmasi operatorda bo'ladi, lekin uni bosish tartibi yozma reglamentda turadi: qaysi hodisada, necha marta, qanday matn bilan. Reglamentsiz bu tugma bir necha hafta ichida ishlatilmay qoladi.</p>",
  manba: [],
  ru: {yorliq: "Для тимлида", sarlavha: "Экран оператора: что видно и что можно сделать",
    tana: "<p>Карточка вышки отличается от обычной карточки объекта тремя вещами: управление PTZ, кнопка громкоговорителя и график питания.</p>" +
      "<table><tr><th>Действие</th><th>Кто может</th><th>Пишется в журнал</th></tr>" +
      "<tr><td>Открыть живой поток</td><td>Оператор, ответственный</td><td>Да</td></tr>" +
      "<tr><td>Повернуть PTZ и вернуть на пресет</td><td>Оператор</td><td>Да</td></tr>" +
      "<tr><td>Дать предупреждение в громкоговоритель</td><td>Оператор</td><td>Да, с текстом</td></tr>" +
      "<tr><td>Включить сирену</td><td>Служба безопасности</td><td>Да</td></tr>" +
      "<tr><td>Запросить клип из архива</td><td>Оператор, проверяющий</td><td>Да</td></tr>" +
      "<tr><td>Привязать вышку к другому объекту</td><td>Менеджер активов</td><td>Да, с историей</td></tr></table>" +
      "<h4>Трёхдневный тренд</h4>" +
      "<p>Мгновенное значение заряда говорит мало: днём оно растёт, ночью падает. В карточке показывается график за трое суток, и главное оператор видит именно там — если каждое утро нижняя точка ниже вчерашней, вышка проедает запас и через неделю выключится.</p>" +
      "<p class='ogoh'>Кнопка громкоговорителя и сирены есть у оператора, но порядок её нажатия закреплён письменным регламентом: при каком событии, сколько раз, с каким текстом. Без регламента этой кнопкой перестают пользоваться уже через пару недель.</p>"}
},

"y09.montaj": {
  yorliq: "Montajchi uchun", sarlavha: "Joyiga qo'yish kuni: ikki kishi, olti soat",
  tana: "<p>Minora bir kunda ishga tushadi. Vaqt taqsimoti quyidagicha va u birinchi obyektdan keyin deyarli o'zgarmaydi.</p>" +
    "<table><tr><th>Ish</th><th class='n'>Vaqt</th></tr>" +
    "<tr><td>Joy tanlash, tirkamani qo'yish va gorizontallash</td><td class='n'>60 daq</td></tr>" +
    "<tr><td>Yerga ulash qozig'i va o'lchov</td><td class='n'>40 daq</td></tr>" +
    "<tr><td>Panel burchagini qishki holatga sozlash</td><td class='n'>30 daq</td></tr>" +
    "<tr><td>Machtani ko'tarish va kameralarni yo'naltirish</td><td class='n'>90 daq</td></tr>" +
    "<tr><td>Presetlar, chiziqlar va hududlarni yozish</td><td class='n'>60 daq</td></tr>" +
    "<tr><td>Tunnel, platformada tekshirish, dalolatnoma</td><td class='n'>60 daq</td></tr>" +
    "<tr class='jami'><td>Jami, ikki kishi</td><td class='n'>≈ 6 soat</td></tr></table>" +
    "<h4>Joy tanlashda uchta xato</h4>" +
    "<ul><li><b>Yumshoq tuproq.</b> Tirkama bahorda cho'kadi va gorizontallik buziladi — machta ko'tarilmay qoladi. Qattiq yer yoki beton plita kerak.</li>" +
    "<li><b>Daraxt ostiga qo'yish.</b> Yozda soya panelni yarmiga tushiradi, kuzda barg ustiga yotadi, qishda esa singan shox panelni sindiradi.</li>" +
    "<li><b>Chuqurlik.</b> Yomg'irdan keyin suv to'planadi va tirkamaning ostki qismi zanglaydi. Yuqoriroq nuqta tanlanadi.</li></ul>" +
    "<h4>Yerga ulash</h4>" +
    "<p>Ko'tarilgan machta atrofdagi eng baland nuqtaga aylanadi va chaqmoqni o'ziga tortadi. Yerga ulash qozig'i qoqiladi va qarshiligi o'lchanadi; o'lchov natijasi dalolatnomaga yoziladi. Bu ishni o'tkazib yuborish tez-tez uchraydi va birinchi bahorgi momaqaldiroqda butun elektronikani kuydiradi.</p>",
  manba: [],
  ru: {yorliq: "Для монтажника", sarlavha: "День установки: два человека, шесть часов",
    tana: "<p>Вышка вводится в работу за один день. Время распределяется так, и после первого объекта эта раскладка почти не меняется.</p>" +
      "<table><tr><th>Работа</th><th class='n'>Время</th></tr>" +
      "<tr><td>Выбор места, установка прицепа и выравнивание</td><td class='n'>60 мин</td></tr>" +
      "<tr><td>Заземляющий штырь и замер сопротивления</td><td class='n'>40 мин</td></tr>" +
      "<tr><td>Перевод панелей на зимний угол</td><td class='n'>30 мин</td></tr>" +
      "<tr><td>Подъём мачты и наведение камер</td><td class='n'>90 мин</td></tr>" +
      "<tr><td>Запись пресетов, линий и зон</td><td class='n'>60 мин</td></tr>" +
      "<tr><td>Туннель, проверка на платформе, акт</td><td class='n'>60 мин</td></tr>" +
      "<tr class='jami'><td>Итого, вдвоём</td><td class='n'>≈ 6 часов</td></tr></table>" +
      "<h4>Три ошибки при выборе места</h4>" +
      "<ul><li><b>Мягкий грунт.</b> Весной прицеп просядет, горизонт уйдёт — мачта перестанет подниматься. Нужен твёрдый грунт или бетонная плита.</li>" +
      "<li><b>Под деревом.</b> Летом тень срезает выработку вдвое, осенью листва ложится на стекло, зимой сломанная ветка бьёт панель.</li>" +
      "<li><b>Низина.</b> После дождя собирается вода, и низ прицепа начинает ржаветь. Выбирается точка повыше.</li></ul>" +
      "<h4>Заземление</h4>" +
      "<p>Поднятая мачта становится самой высокой точкой вокруг и притягивает молнию. Забивается заземляющий штырь и замеряется сопротивление; результат замера вносится в акт. Этот шаг пропускают чаще всего — и первая же весенняя гроза выжигает всю электронику.</p>"}
},

"y09.model": {
  yorliq: "Moliya va huquq", sarlavha: "Ijara yoki xarid: hisobning o'zi",
  tana: "<p>Qaror texnik emas. U bitta savolga bog'liq: minora yilda necha oy band bo'ladi.</p>" +
    "<table><tr><th>Modda</th><th class='n'>Qiymat</th></tr>" +
    "<tr><td>Xarid narxi</td><td class='n'>80 mln so'm</td></tr>" +
    "<tr><td>Besh yildan keyingi qoldiq qiymati</td><td class='n'>16 mln so'm</td></tr>" +
    "<tr><td>Besh yillik amortizatsiya</td><td class='n'>64 mln so'm</td></tr>" +
    "<tr><td>Yillik egalik narxi</td><td class='n'>12,8 mln so'm</td></tr>" +
    "<tr><td>Servis va SIM, yiliga</td><td class='n'>2,5–4 mln so'm</td></tr>" +
    "<tr class='jami'><td>Yillik to'liq narx</td><td class='n'>15–17 mln so'm</td></tr></table>" +
    "<h4>Chegara nuqtasi</h4>" +
    "<p>Bozorda oylik ijara taxminan 2–3,5 mln so'm. Demak minora yilda oltidan ko'p oy band bo'lsa, xarid arzonroq; oltidan kam bo'lsa ijara. Bank uchun amaliy javob ko'pincha oraliqda bo'ladi: ikki-uchta minora sotib olinadi va ular yil bo'yi obyektdan obyektga ko'chib yuradi, mavsumiy ehtiyoj esa ijara bilan yopiladi.</p>" +
    "<h4>Ko'chirish narxi hisobga kiradi</h4>" +
    "<p>Har ko'chirish 1–3 mln so'm: ilgakli avtomobil, tegishli toifadagi haydovchi va ikki kishining yarim kuni. Minora yiliga to'rt marta ko'chsa, bu yillik narxga 4–12 mln so'm qo'shadi — ya'ni egalik narxining qariyb yarmi. Shuning uchun ko'chirish jadvali oldindan tuziladi va bir yo'nalishdagi obyektlar ketma-ket olinadi.</p>",
  manba: [],
  ru: {yorliq: "Финансы и право", sarlavha: "Аренда или покупка: сам расчёт",
    tana: "<p>Решение не техническое. Оно упирается в один вопрос: сколько месяцев в году вышка будет занята.</p>" +
      "<table><tr><th>Статья</th><th class='n'>Значение</th></tr>" +
      "<tr><td>Цена покупки</td><td class='n'>80 млн сумов</td></tr>" +
      "<tr><td>Остаточная стоимость через пять лет</td><td class='n'>16 млн сумов</td></tr>" +
      "<tr><td>Амортизация за пять лет</td><td class='n'>64 млн сумов</td></tr>" +
      "<tr><td>Годовая стоимость владения</td><td class='n'>12,8 млн сумов</td></tr>" +
      "<tr><td>Сервис и SIM в год</td><td class='n'>2,5–4 млн сумов</td></tr>" +
      "<tr class='jami'><td>Полная годовая стоимость</td><td class='n'>15–17 млн сумов</td></tr></table>" +
      "<h4>Точка перелома</h4>" +
      "<p>Аренда на рынке стоит примерно 2–3,5 млн сумов в месяц. Значит, при занятости больше шести месяцев в году дешевле купить, меньше шести — арендовать. Для банка практический ответ обычно посередине: покупаются две-три вышки, которые весь год кочуют с объекта на объект, а сезонная потребность закрывается арендой.</p>" +
      "<h4>Стоимость перемещения входит в расчёт</h4>" +
      "<p>Каждый переезд — это 1–3 млн сумов: автомобиль с фаркопом, водитель нужной категории и полдня работы двоих. При четырёх переездах в год это добавляет к годовой стоимости 4–12 млн сумов, то есть почти половину стоимости владения. Поэтому график перемещений составляется заранее, а объекты берутся подряд по одному маршруту.</p>"}
},

"y09.meyor": {
  yorliq: "Moliya va huquq", sarlavha: "Nega minora bitta obyekt hisobiga olinmaydi",
  tana: "<p>Bank balansiga o'tgan nomoliyaviy aktiv uchun qat'iy muddat ishlaydi: belgilangan muddatda sotilmagan aktiv toifasi pasayadi va u bo'yicha zaxira oshadi, oxir-oqibat to'liq zaxira talab qilinadi.</p>" +
    "<h4>Nazorat jihozining muddati boshqacha</h4>" +
    "<p>Minora besh yil va undan ko'p ishlaydi, obyekt esa bir yil ichida sotiladi. Jihoz obyekt hisobiga olingan bo'lsa, obyekt realizatsiya qilinganda jihoz bilan nima qilish noaniq bo'lib qoladi: uni obyekt bilan birga berish yo'qotish, hisobdan chiqarish esa asossiz.</p>" +
    "<h4>To'g'ri tuzilish</h4>" +
    "<ul><li>Minora bo'lim yoki filialning asosiy vositasi sifatida balansda turadi va o'z inventar raqamiga ega bo'ladi.</li>" +
    "<li>Obyektga bog'lanish vaqtinchalik: platformada sana bilan ochiladi va yopiladi.</li>" +
    "<li>Nazorat xarajati obyektning ushlab turish xarajatiga kiritiladi — bu realizatsiya hisobida to'g'ri ko'rinadi.</li>" +
    "<li>Obyekt sotilganda minora bo'shaydi va navbatdagi obyektga ko'chiriladi; uning qoldiq qiymati o'zgarmaydi.</li></ul>" +
    "<p class='ogoh'>Buxgalteriya bilan bu tuzilish loyihaning boshida kelishiladi. Keyinchalik jihozni bir hisobdan boshqasiga o'tkazish hujjat bilan mumkin, lekin u vaqt oladi va ko'pincha minora shu vaqt ichida bo'sh turadi.</p>",
  manba: [],
  ru: {yorliq: "Финансы и право", sarlavha: "Почему вышку не ставят на учёт одного объекта",
    tana: "<p>Для нефинансового актива, перешедшего на баланс банка, действует жёсткий срок: непроданный в отведённое время актив понижается в категории, резерв по нему растёт и в итоге требуется полное резервирование.</p>" +
      "<h4>У контрольного оборудования другой срок</h4>" +
      "<p>Вышка работает пять лет и больше, а объект продаётся в течение года. Если оборудование учтено за объектом, то при реализации становится непонятно, что с ним делать: отдать вместе с объектом — прямой убыток, списать — нет оснований.</p>" +
      "<h4>Правильная структура</h4>" +
      "<ul><li>Вышка стоит на балансе как основное средство подразделения или филиала и имеет собственный инвентарный номер.</li>" +
      "<li>Привязка к объекту временная: на платформе она открывается и закрывается датой.</li>" +
      "<li>Затраты на контроль относятся на расходы по содержанию объекта — в расчёте реализации это отражается корректно.</li>" +
      "<li>После продажи объекта вышка освобождается и переезжает на следующий; её остаточная стоимость не меняется.</li></ul>" +
      "<p class='ogoh'>Эта структура согласовывается с бухгалтерией в начале проекта. Перевести оборудование с одного учёта на другой можно и позже, документом, но это занимает время, и вышка обычно всё это время простаивает.</p>"}
},

"y09.servis": {
  yorliq: "Montajchi uchun", sarlavha: "Besh yil: nima sarflanadi va nima almashtirilmaydi",
  tana: "<p>Minora servisi kam, lekin u tartibli bo'lishi kerak. Yillik ko'rikda uch narsa tekshiriladi: machta mexanizmi, panel sirti va akkumulyator kontaktlari.</p>" +
    "<table><tr><th>Modda</th><th>Oraliq</th><th class='n'>Besh yilda</th></tr>" +
    "<tr><td>SIM va trafik, ikki operator</td><td>Oyma-oy</td><td class='n'>6–12 mln so'm</td></tr>" +
    "<tr><td>Panel tozalash</td><td>Yiliga 2 marta</td><td class='n'>Servis qatnovi ichida</td></tr>" +
    "<tr><td>Machta mexanizmi: moylash, trosni ko'rish</td><td>Yiliga 1 marta</td><td class='n'>3–6 mln so'm</td></tr>" +
    "<tr><td>Akkumulyator kontaktlari va BMS jurnali</td><td>Yiliga 1 marta</td><td class='n'>2–4 mln so'm</td></tr>" +
    "<tr><td>Ko'chirish</td><td>Har safar</td><td class='n'>1–3 mln so'm har safar</td></tr>" +
    "<tr><td>LiFePO4 akkumulyator</td><td>Besh yilda almashtirilmaydi</td><td class='n'>0</td></tr></table>" +
    "<h4>Nega akkumulyator besh yilda almashtirilmaydi</h4>" +
    "<p>LiFePO4 kamida 3000 to'liq sikl beradi. Minorada sutkasiga bitta to'liq siklga yaqin razryad bo'ladi va u ham atigi 30–40 foizgacha. Besh yilda bu 1800 siklga ham yetmaydi — element sig'imining 85 foizidan ko'pini saqlab qoladi. Almashtirish sababi ko'pincha sovuqda noto'g'ri zaryad yoki BMS nosozligi bo'ladi.</p>" +
    "<p class='ogoh'>Machta trosi — hech kim eslamaydigan qism. U zanglaydi va eskiradi, uzilgani esa machtani tushirishni imkonsiz qiladi. Yillik ko'rikda tros holati fotosurat bilan hujjatlashtiriladi.</p>",
  manba: [],
  ru: {yorliq: "Для монтажника", sarlavha: "Пять лет: что расходуется и что не меняется",
    tana: "<p>Обслуживания у вышки немного, но оно должно быть регулярным. На годовом осмотре проверяются три вещи: механизм мачты, поверхность панелей и контакты аккумулятора.</p>" +
      "<table><tr><th>Статья</th><th>Периодичность</th><th class='n'>За пять лет</th></tr>" +
      "<tr><td>SIM и трафик, два оператора</td><td>Ежемесячно</td><td class='n'>6–12 млн сумов</td></tr>" +
      "<tr><td>Мойка панелей</td><td>2 раза в год</td><td class='n'>В стоимости выезда</td></tr>" +
      "<tr><td>Механизм мачты: смазка, осмотр троса</td><td>1 раз в год</td><td class='n'>3–6 млн сумов</td></tr>" +
      "<tr><td>Контакты аккумулятора и журнал BMS</td><td>1 раз в год</td><td class='n'>2–4 млн сумов</td></tr>" +
      "<tr><td>Перемещение</td><td>Каждый раз</td><td class='n'>1–3 млн сумов за раз</td></tr>" +
      "<tr><td>Аккумулятор LiFePO4</td><td>За пять лет не меняется</td><td class='n'>0</td></tr></table>" +
      "<h4>Почему аккумулятор не меняют за пять лет</h4>" +
      "<p>LiFePO4 выдерживает не менее 3000 полных циклов. На вышке в сутки происходит примерно один цикл, причём разряд идёт не до 80, а до 30–40 процентов. За пять лет не набирается и 1800 циклов — банк сохраняет больше 85 процентов ёмкости. Причиной замены обычно становится не старение, а неправильный заряд на морозе или отказ BMS.</p>" +
      "<p class='ogoh'>Трос мачты — узел, о котором никто не вспоминает. Он ржавеет и вытягивается, а обрыв делает опускание мачты невозможным. На годовом осмотре состояние троса фиксируется фотографией.</p>"}
},

"y09.sugurta": {
  yorliq: "Moliya va huquq", sarlavha: "Sug'urta: ko'chib yuruvchi aktivning bandi",
  tana: "<p>Standart mulk sug'urtasi aktivni qat'iy manzilga bog'laydi. Minora esa manzilni o'zgartirib turadi va aynan shu yerda talab rad etiladi: voqea polisda ko'rsatilgan manzildan boshqa joyda sodir bo'lgan bo'ladi.</p>" +
    "<h4>Shartnomaga kiritiladigan uchta band</h4>" +
    "<ul><li><b>Qamrov manzilga emas, aktivga beriladi.</b> Polisda inventar raqami ko'rsatiladi va «bank balansidagi istalgan obyekt hududida» degan shart yoziladi.</li>" +
    "<li><b>Yo'ldagi holat.</b> Tortib borilayotgan tirkama ko'pincha alohida turga kiradi. Buni sug'urtachidan yozma so'rash kerak, chunki ko'chirish yilda bir necha marta bo'ladi.</li>" +
    "<li><b>Ko'tarilgan machta.</b> Ayrim polislarda ochiq turgan mexanizmga yetkazilgan zarar istisnoga chiqariladi. Shamol chegarasi reglamentda bo'lsa, buni bandda ko'rsatib, istisnoni olib tashlash mumkin.</li></ul>" +
    "<h4>Platforma nima beradi</h4>" +
    "<p>Har ko'chirish sana, obyekt kodi va mas'ul xodim bilan qayd etiladi. Voqea bo'lganda sug'urtachiga minoraning qayerda va qachondan beri turgani hujjat bilan ko'rsatiladi. Bu bahsni bir necha haftadan bir necha kunga qisqartiradi.</p>" +
    "<p class='ogoh'>Sug'urta summasi almashtirish narxiga qarab olinadi: uchinchi yilda yo'qolgan minorani qoldiq qiymatiga qayta sotib bo'lmaydi.</p>",
  manba: [],
  ru: {yorliq: "Финансы и право", sarlavha: "Страхование: пункт для перемещаемого актива",
    tana: "<p>Стандартный полис имущества привязывает актив к конкретному адресу. Вышка адрес меняет — и отказ по выплате приходит именно здесь: событие произошло не по адресу из полиса, а в другом месте.</p>" +
      "<h4>Три пункта, которые вносятся в договор</h4>" +
      "<ul><li><b>Покрытие даётся активу, а не адресу.</b> В полисе указывается инвентарный номер и формулировка «на территории любого объекта на балансе банка».</li>" +
      "<li><b>Состояние в пути.</b> Буксируемый прицеп часто относится к отдельному виду. Это нужно запросить у страховщика письменно: переезды случаются несколько раз в год.</li>" +
      "<li><b>Поднятая мачта.</b> В части полисов ущерб раскрытому механизму выводится в исключения. Если ветровой предел закреплён регламентом, на это можно сослаться в пункте и исключение снять.</li></ul>" +
      "<h4>Что даёт платформа</h4>" +
      "<p>Каждое перемещение фиксируется датой, кодом объекта и ответственным. При страховом случае страховщику документально показывается, где и с какого числа стояла вышка. Это сокращает спор с нескольких недель до нескольких дней.</p>" +
      "<p class='ogoh'>Страховая сумма берётся не от остаточной стоимости вышки, а от стоимости замещения: утраченную на третий год вышку по остаточной стоимости заново не купить.</p>"}
},

"y09.n1": {
  yorliq: "Nosozlik", sarlavha: "Qor panelni yopdi: to'rt kunning hisobi",
  tana: "<p>Bu nosozlik sekin va shovqinsiz keladi, shuning uchun eng ko'p uchraydigani ham shu.</p>" +
    "<table><tr><th>Kun</th><th>Ishlab chiqarish</th><th>Zaryad</th></tr>" +
    "<tr><td>Qor yoqqan kun</td><td class='n'>0,2 kVt·soat</td><td class='n'>88 → 79 %</td></tr>" +
    "<tr><td>2-kun</td><td class='n'>0</td><td class='n'>79 → 66 %</td></tr>" +
    "<tr><td>3-kun</td><td class='n'>0</td><td class='n'>66 → 53 %</td></tr>" +
    "<tr><td>4-kun</td><td class='n'>0</td><td class='n'>53 → 40 %</td></tr>" +
    "<tr class='jami'><td>6-kun</td><td class='n'>0</td><td class='n'>Zaxira manba yoki o'chish</td></tr></table>" +
    "<h4>Nima to'xtatadi</h4>" +
    "<ul><li><b>55 daraja burchak.</b> Qor o'z og'irligi bilan sirg'alib tushadi va ishlab chiqarish ikkinchi kuni qaytadi.</li>" +
    "<li><b>Uch kunlik tendensiya.</b> Operator ekranida ertalabki eng past nuqta ketma-ket pasayib borayotgani ko'rinadi — bu birinchi kundayoq ma'lum bo'ladi.</li>" +
    "<li><b>Zaxira manba 30 foizda.</b> Bo'lsa, minora umuman o'chmaydi.</li>" +
    "<li><b>Servis rejasida qor bandi.</b> Qor yoqqanidan keyin panelni tozalash mas'ul xodimning vazifasiga aylanadi.</li></ul>" +
    "<p class='ogoh'>Eng yomon variant — panel qor ostida, operator esa buni ko'rmaydi. Shuning uchun platformada quyoshli kunda kutilgan va haqiqiy ishlab chiqarish solishtiriladi: farq ikki barobardan oshsa, avtomatik vazifa ochiladi.</p>",
  manba: [],
  ru: {yorliq: "Отказ", sarlavha: "Снег закрыл панели: расчёт четырёх суток",
    tana: "<p>Этот отказ приходит медленно и без шума — поэтому он и встречается чаще других.</p>" +
      "<table><tr><th>Сутки</th><th>Выработка</th><th>Заряд</th></tr>" +
      "<tr><td>День снегопада</td><td class='n'>0,2 кВт·ч</td><td class='n'>88 → 79 %</td></tr>" +
      "<tr><td>2-е сутки</td><td class='n'>0</td><td class='n'>79 → 66 %</td></tr>" +
      "<tr><td>3-и сутки</td><td class='n'>0</td><td class='n'>66 → 53 %</td></tr>" +
      "<tr><td>4-е сутки</td><td class='n'>0</td><td class='n'>53 → 40 %</td></tr>" +
      "<tr class='jami'><td>6-е сутки</td><td class='n'>0</td><td class='n'>Резервный источник или отключение</td></tr></table>" +
      "<h4>Что это останавливает</h4>" +
      "<ul><li><b>Угол 55 градусов.</b> Снег сходит под собственным весом, и выработка возвращается на вторые сутки.</li>" +
      "<li><b>Трёхдневный тренд.</b> На экране оператора видно, что утренний минимум падает день за днём, — это заметно уже в первые сутки.</li>" +
      "<li><b>Резервный источник на 30 процентах.</b> Если он есть, вышка не выключается вовсе.</li>" +
      "<li><b>Пункт о снеге в плане обслуживания.</b> После снегопада очистка панелей становится задачей ответственного.</li></ul>" +
      "<p class='ogoh'>Худший вариант — панели под снегом, а оператор этого не видит. Поэтому на платформе сравнивается ожидаемая и фактическая выработка в солнечный день: при расхождении больше чем вдвое задача открывается автоматически.</p>"}
},

"y09.ogirlik": {
  yorliq: "Nosozlik", sarlavha: "Minoraning o'zi olib ketildi",
  tana: "<p>Tirkama g'ildirakda turadi, og'irligi 1 300 kg va uni ilgakli har qanday yengil yuk mashinasi tortib keta oladi. Bo'sh obyektdagi eng qimmat bitta buyum — ko'pincha obyektning o'zidan qimmatroq bo'lgan nazorat vositasi.</p>" +
    "<table><tr><th>Chora</th><th>Nimani to'xtatadi</th></tr>" +
    "<tr><td class='b'>Ilgak qulfi va g'ildirak qulfi</td><td>Tez va shovqinsiz olib ketishni</td></tr>" +
    "<tr><td class='b'>GPS treker, alohida akkumulyator bilan</td><td>Olib ketilgandan keyin izlashni</td></tr>" +
    "<tr><td class='b'>Og'ish va harakat datchigi</td><td>Ko'tarilish va tortishni darhol bildiradi</td></tr>" +
    "<tr><td class='b'>Machta pastiga qaratilgan kamera</td><td>Avtomobil raqamini yozib qoladi</td></tr></table>" +
    "<h4>Treker alohida oziqlanadi</h4>" +
    "<p>Bu asosiy shart. Umumiy akkumulyatordan oziqlangan treker birinchi ish sifatida uzib qo'yiladigan simda turadi. Treker o'z ichki batareyasida ishlashi va uni topish qiyin bo'lgan joyga o'rnatilishi kerak — masalan, ramaning ichki bo'shlig'iga.</p>" +
    "<h4>Hodisa qanday ko'rinadi</h4>" +
    "<p>Og'ish datchigi ishlaganda platformada yuqori darajali hodisa ochiladi va u minora kartochkasida turadi. Xavfsizlik xizmatiga darhol bildirishnoma boradi, GPS koordinatasi esa har daqiqada yangilanadi. Bu hodisa hech qachon avtomatik yopilmaydi: uni faqat odam yopadi.</p>",
  manba: [],
  ru: {yorliq: "Отказ", sarlavha: "Увезли саму вышку",
    tana: "<p>Прицеп стоит на колёсах, весит 1 300 кг, и утащить его может любой лёгкий грузовик с фаркопом. Это самый дорогой единичный предмет на пустом объекте — средство контроля, которое нередко стоит дороже самого объекта.</p>" +
      "<table><tr><th>Мера</th><th>Что останавливает</th></tr>" +
      "<tr><td class='b'>Замок на сцепное и блокиратор колеса</td><td>Быстрый и тихий угон</td></tr>" +
      "<tr><td class='b'>GPS-трекер с собственной батареей</td><td>Поиск после угона</td></tr>" +
      "<tr><td class='b'>Датчик наклона и движения</td><td>Сразу сообщает о подъёме и буксировке</td></tr>" +
      "<tr><td class='b'>Камера, направленная на основание мачты</td><td>Фиксирует номер автомобиля</td></tr></table>" +
      "<h4>Трекер питается отдельно</h4>" +
      "<p>Это главное условие. Трекер, запитанный от общего аккумулятора, висит на проводе, который перерезают первым делом. Трекер должен работать от внутренней батареи и стоять там, где его трудно найти, — например, во внутренней полости рамы.</p>" +
      "<h4>Как выглядит событие</h4>" +
      "<p>При срабатывании датчика наклона на платформе открывается событие высокого приоритета, и оно висит не на карточке объекта, а на карточке вышки. Служба безопасности получает уведомление немедленно, координата GPS обновляется каждую минуту. Такое событие никогда не закрывается автоматически — только человеком.</p>"}
}

});

/* --- ilgari yozilgan sahifalardan olingan umumiy iboralar --- */
Object.assign(window.MKB_LUGAT = window.MKB_LUGAT || {}, {
"Slaydga qaytish ·": "Вернуться к слайду ·",
"Komplekt": "Комплект",
"Qishki sutka": "Зимние сутки",
"Dekabr balansi": "Декабрьский баланс",
"Besh yil": "Пять лет",
"Nosozlik": "Отказы",
"Savollar": "Вопросы",
"Solishtirish": "Сравнение",
"Dona": "Шт.",
"tun": "ночь",
"hodisa": "событие",
"tong": "утро",
"kunduz": "день",
"yakun": "итог",
"Yadro va ekranlar": "Ядро и экраны",
"Operator nima ko'radi va nima qila oladi": "Что видит оператор и что он может сделать",
"Manbasi": "Источник",
"Yangilanishi": "Обновление",
"Kamera RTSP va ONVIF PTZ": "Камера по RTSP и ONVIF PTZ",
"Kamera analitikasi": "Аналитика камеры",
"Masofadan qilinadi": "Делается удалённо",
"Qilib bo'lmaydi": "Сделать нельзя",
"Qator": "Статья",
"Besh yil ichida nima sarflanadi": "Что расходуется за пять лет",
"Modda": "Статья",
"Qachon": "Когда",
"Besh yilda": "За пять лет",
"Uchta nosozlik va ularning oldini olish": "Три отказа и их предупреждение",
"Nosozlik 1": "Отказ 1",
"Oldini olish": "Профилактика",
"Nosozlik 2": "Отказ 2",
"Nosozlik 3": "Отказ 3",
"Qaysi obyektga mos, qaysi biriga emas": "Каким объектам подходит, а каким нет",
"Mos keladi": "Подходит",
"Mos emas": "Не подходит",
"Yetkazib beruvchidan so'raladigan savollar": "Вопросы, которые задают поставщику",
"Birinchi savol dekabr balansi, uchinchisi machtaning shamol chegarasi haqida. Bu ikkisiga raqam bilan javob bo'lmasa, qolganini so'rashning hojati yo'q.": "Первый вопрос — про декабрьский баланс, третий — про ветровой предел мачты. Если на них нет ответа в цифрах, остальные можно не задавать.",
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
"Joyiga qo'yish": "Установка",
"Xarid yoki ijara": "Покупка или аренда",
"Bitta nuqtadan butun hovlini ko'radigan tirkama":
 "Прицеп, который видит весь двор из одной точки",
"Minora bir gektarlik maydonni bir kunda qamrab oladi va hovli bo'ylab tarqatilgan sakkizta statik kameraning ishini bajaradi. U binoni emas, maydonni qo'riqlaydi — shuning uchun uni ichki xonaga qo'yish mantiqsiz.":
 "Вышка закрывает гектар площади за один день и делает работу восьми статичных камер, расставленных по двору. Она охраняет не здание, а площадку — поэтому ставить её во внутреннем помещении бессмысленно.",
"komplekt yuki": "нагрузка комплекта",
"dekabrda panel beradi": "даёт панель в декабре",
"quyoshsiz zaxira": "запас без солнца",
"yoki oylik ijara": "или помесячная аренда",
"Teleskopik machta, 360° PTZ kamera, karnay va akkumulyatorga zaxira beruvchi quyosh panellari":
 "Телескопическая мачта, камера PTZ 360°, громкоговоритель и солнечные панели, подзаряжающие аккумулятор",

/* --- 01 komplekt --- */
"Tirkamada nima bor": "Что стоит на прицепе",
"Namuna sifatida AL3000 sinfidagi tirkama olingan: uch dona 470 vattli panel, to'rt dona 200 amper-soatlik akkumulyator va yetti metrdan baland teleskopik machta. Bozorda mahalliy yig'ilgan variantlar ham bor va ular ikki barobar arzon.":
 "За образец взят прицеп класса AL3000: три панели по 470 Вт, четыре аккумулятора по 200 А·ч и телескопическая мачта выше семи метров. На рынке есть и варианты местной сборки, они вдвое дешевле.",
"360° PTZ kamera, IR bilan": "Камера PTZ 360°, с ИК",
"Butun maydonni aylanib ko'radi va hodisaga buriladi":
 "Обходит всю площадку и разворачивается на событие",
"4–6 ta preset yoziladi: darvoza, burchak, texnika turgan joy":
 "Записывается 4–6 пресетов: ворота, угол, площадка техники",
"ONVIF Profile S va T, ONVIF PTZ": "ONVIF Profile S и T, ONVIF PTZ",
"Statik kamera": "Статичная камера",
"Chiziq kesish analitikasi kamerada": "Аналитика пересечения линии — в камере",
"Operator ovozli ogohlantirish beradi": "Оператор даёт голосовое предупреждение",
"Kamera signal chiqishi yoki router relesi orqali":
 "Через сигнальный выход камеры или реле роутера",
"Quyoshsiz kunlarni ko'taradi": "Держит дни без солнца",
"4 × 200 A·soat, 2S2P: 24 V da 400 A·soat, ya'ni 9,6 kVt·soat": "4 × 200 А·ч, 2S2P: при 24 В это 400 А·ч, то есть 9,6 кВт·ч",
"Isitgichli yoki past harorat himoyali BMS": "С подогревом или с низкотемпературной защитой BMS",
"Kunduzi akkumulyatorni to'ldiradi": "Днём пополняет аккумулятор",
"3 × 470 Vt, qishki burchakka sozlanadigan ramka":
 "3 × 470 Вт, рама с регулировкой под зимний угол",
"Quvvat kontrolleri": "Контроллер питания",
"Zaryadni boshqaradi va telemetriya beradi": "Управляет зарядом и отдаёт телеметрию",
"Modbus TCP yoki MQTT chiqishi bilan": "С выходом Modbus TCP или MQTT",
"4G yoki 5G router va NVR": "Роутер 4G или 5G и NVR",
"Tunnel va joyida yozuv": "Туннель и запись на месте",
"Ikki SIM, VPN; NVR SSD bilan": "Две SIM, VPN; NVR на SSD",
"AL3000 sinfidagi tirkama taxminan 1 300 kg. Uni tortish uchun ilgakli avtomobil va tegishli toifadagi haydovchi kerak — bu ko'chirish xarajatining asosiy qismi.":
 "Прицеп класса AL3000 весит около 1 300 кг. Для буксировки нужны автомобиль с фаркопом и водитель соответствующей категории — это и есть основная часть стоимости переезда.",
"Machta faqat ishlab chiqaruvchi belgilagan shamol chegarasidan past bo'lganda ko'tariladi. Ko'tarilgan machta bo'ronda tirkamani ham, kameralarni ham birdan yo'q qiladi — bu yechimning eng qimmat nosozligi.":
 "Мачта поднимается только при ветре ниже предела, заданного производителем. В шторм поднятая мачта разом уносит и прицеп, и камеры — это самый дорогой отказ данного решения.",

/* --- 02 qishki sutka --- */
"Qishki sutka: qurilish maydoni, 21-dekabr": "Зимние сутки: стройплощадка, 21 декабря",
"Eng qisqa kun. Minora bu sutkada zaryadga emas, zaxiraga yashaydi: panel bergan energiya kunning atigi olti soatida keladi, qolgan o'n sakkiz soat butun yuk akkumulyatorda turadi.":
 "Самый короткий день. В эти сутки вышка живёт не зарядом, а запасом: энергия от панелей приходит всего шесть часов, остальные восемнадцать вся нагрузка держится на аккумуляторе.",
"Akkumulyator 71 foizda": "Аккумулятор на 71 проценте",
"PTZ kechasi bitta nuqtada turadi va aylanmaydi — bu 10 vattgacha tejaydi. Yuk 45 Vt: PTZ IR bilan, ikki statik kamera, NVR va router. Tunda sarf 0,81 kVt·soat.":
 "Ночью PTZ стоит на одной точке и не вращается — это экономит до 10 Вт. Нагрузка 45 Вт: PTZ с ИК, две статичные камеры, NVR и роутер. За ночь расход 0,81 кВт·ч.",
"Tungi sarf: 45 Vt × 18 soat": "Ночной расход: 45 Вт × 18 часов",
"Chiziq kesildi va PTZ buriladi": "Пересечена линия, PTZ разворачивается",
"Darvoza, burchak va texnika turgan joyni doim ko'rib turadi": "Держит под постоянным обзором ворота, угол и площадку с техникой",
"Statik kamera hovli chegarasida chiziq kesilganini aniqlaydi. Platforma PTZ ni shu presetga buradi va klipni saqlaydi. Operator odamni ko'radi va karnaydan ogohlantirish beradi: «Hudud videokuzatuv ostida». Ko'p hollarda bu yetarli bo'ladi va odam ketadi.":
 "Статичная камера фиксирует пересечение линии по границе двора. Платформа разворачивает PTZ на нужный пресет и сохраняет клип. Оператор видит человека и даёт предупреждение в громкоговоритель: «Территория под видеонаблюдением». В большинстве случаев этого достаточно, и человек уходит.",
"Epizod: PTZ aylanishi va karnay 0,02 kVt·soat":
 "Эпизод: поворот PTZ и громкоговоритель — 0,02 кВт·ч",
"Quyosh chiqadi, panel hali bermaydi": "Солнце взошло, панель ещё не даёт",
"Toshkentda 21-dekabrda quyosh 07:50 da chiqadi va peshinda ufqdan atigi 25 daraja ko'tariladi. Birinchi soatda panel deyarli hech narsa bermaydi: nur burchagi juda past va sovuq panel sirtida shudring bo'ladi.":
 "В Ташкенте 21 декабря солнце встаёт в 07:50 и к полудню поднимается над горизонтом всего на 25 градусов. В первый час панель почти ничего не отдаёт: угол падения луча слишком мал, а на холодном стекле стоит роса.",
"Panel kunlik ulushini beradi": "Панель отдаёт свою дневную долю",
"Uch dona 470 vattli panel qishki burchakka o'rnatilgan. Dekabr insolyatsiyasi 1,62 kVt·soat/m², yo'qotishlar 25 foiz: sutkasiga taxminan 1,7 kVt·soat. Bu 45 vattlik yukning 1,08 kVt·soatidan katta, lekin zaxira atigi 30–55 foiz.":
 "Три панели по 470 Вт выставлены на зимний угол. Инсоляция в декабре — 1,62 кВт·ч/м², потери 25 процентов: около 1,7 кВт·ч в сутки. Это больше, чем 1,08 кВт·ч нагрузки в 45 Вт, но запас составляет всего 30–55 процентов.",
"Kunlik ishlab chiqarish: 1,7 kVt·soat": "Суточная выработка: 1,7 кВт·ч",
"kech": "вечер",
"Quyosh botadi, IR yonadi": "Солнце садится, включается ИК",
"Kun 9 soat 25 daqiqa davom etdi. IR yoritgich yonadi va yuk 45 vattdan 55 vattga chiqadi. Akkumulyator 88 foizda — kunduzgi ortiqcha energiya zaxirani biroz to'ldirdi.":
 "День длился 9 часов 25 минут. Включается ИК-прожектор, и нагрузка поднимается с 45 до 55 Вт. Аккумулятор на 88 процентах — дневной избыток немного пополнил запас.",
"Sutkalik balans": "Баланс за сутки",
"Ishlab chiqarish 1,7 kVt·soat, sarf 1,2 kVt·soat. Ortiqcha 0,5 kVt·soat zaxiraga ketdi. Bulutli hafta boshlansa, shu zaxira va akkumulyatorning 9,6 kVt·soati besh-olti kunga yetadi — keyin zaxira manba kerak bo'ladi.":
 "Выработка 1,7 кВт·ч, расход 1,2 кВт·ч. Избыток в 0,5 кВт·ч ушёл в запас. Если начнётся пасмурная неделя, этого запаса и 9,6 кВт·ч аккумулятора хватит на пять-шесть суток — дальше понадобится резервный источник.",
"Sutkalik balans: +0,5 kVt·soat": "Баланс за сутки: +0,5 кВт·ч",

/* --- 03 dekabr balansi --- */
"Dekabr balansi: eng tor joy": "Декабрьский баланс: самое узкое место",
"Minora yozda ortiqcha energiya bilan ishlaydi va hech qanday savol tug'dirmaydi. Butun loyiha dekabr bilan tekshiriladi: iyun hisobi bilan kelgan minora yanvarda o'chadi.":
 "Летом вышка работает с избытком энергии и вопросов не вызывает. Весь проект проверяется декабрём: вышка, пришедшая с июньским расчётом, в январе выключится.",
"Sutkalik yuk 1,2 kVt·soat": "Суточная нагрузка 1,2 кВт·ч",
"Dekabr zaxirasi atigi 40 foiz": "Декабрьский запас — всего 40 процентов",
"Iyunda panel dekabrdagidan 2,5 barobar ko'p beradi. Loyiha esa dekabr ustuniga qarab tekshiriladi: shu ustun qizil chiziqdan past bo'lsa, minora qishda o'chadi.":
 "В июне панель даёт в 2,5 раза больше, чем в декабре. А проверяется проект по декабрьскому столбцу: если он окажется ниже красной черты, зимой вышка погаснет.",
"Bulutli hafta": "Пасмурная неделя",
"Ketma-ket besh bulutli kun 55 vattlik yukda 6,6 kVt·soat talab qiladi. Ruxsat etilgan 80 foiz razryad bilan kamida 8,3 kVt·soat o'rnatilishi kerak; 4 × 200 A·soatlik blok 2S2P sxemasida 24 voltda 9,6 kVt·soat beradi — zaxira 16 foiz.":
 "Пять пасмурных суток подряд при нагрузке 55 Вт требуют 6,6 кВт·ч. При допустимой глубине разряда 80 процентов ставится не менее 8,3 кВт·ч; банк 4 × 200 А·ч по схеме 2S2P при 24 В даёт 9,6 кВт·ч — запас 16 процентов.",
"Qishki burchak": "Зимний угол",
"Toshkent kengligida qishki burchak taxminan 55 daraja. Bu nafaqat quvvatni oshiradi: shunday burchakda qor panelda turmaydi va o'zi sirg'alib tushadi.":
 "На широте Ташкента зимний угол составляет около 55 градусов. Он не только поднимает выработку: при таком наклоне снег на панели не задерживается и сходит сам.",
"Zaxira manba": "Резервный источник",
"Ayrim komplektlarda dizel agregat yoki yoqilg'i elementi bor. U akkumulyator 30 foizga tushganda avtomatik yonadi. Bu qo'shimcha narx, lekin qishda u yagona ishonchli zaxira.":
 "В части комплектов есть дизель-генератор или топливный элемент. Он включается автоматически, когда аккумулятор падает до 30 процентов. Это доплата, но зимой — единственный надёжный резерв.",

/* --- 04 ma'lumot yo'li --- */
"Ikki manba: kamera va quvvat kontrolleri": "Два источника: камера и контроллер питания",
"Minorada video va quvvat telemetriyasi ikki alohida qurilmadan keladi, lekin ikkalasi ham bitta tunneldan o'tadi. Yashil halqali bo'g'inni bosing.":
 "Видео и телеметрия питания приходят с двух разных устройств, но идут через один туннель. Нажмите на звено с зелёным кружком.",
"PTZ va statik kameralar": "PTZ и статичные камеры",
"Chiziq kesish va hudud hodisalari kameraning o'zida hisoblanadi":
 "Пересечение линии и зональные события считаются в самой камере",
"Kameraning signal chiqishi yoki routerning relesi bilan yoqiladi":
 "Включается сигнальным выходом камеры или реле роутера",
"Buyruq platformadan": "Команда с платформы",
"Har yoqilish jurnalga yoziladi": "Каждое включение пишется в журнал",
"Akkumulyator foizi, kuchlanish, panel quvvati va zaryad holati":
 "Процент заряда, напряжение, мощность панелей и состояние заряда",
"Yoki MQTT nashri": "Либо публикация в MQTT",
"NVR, router va tunnel": "NVR, роутер и туннель",
"Yozuv joyida qoladi, Modbus va MQTT portlari faqat tunnel ichida ochiladi":
 "Запись остаётся на месте, порты Modbus и MQTT открыты только внутри туннеля",
"Ikki SIM, 4G yoki 5G": "Две SIM, 4G или 5G",
"Video hodisasini va quvvat telemetriyasini bitta minora kartochkasiga bog'laydi":
 "Связывает событие с видео и телеметрию питания в одной карточке вышки",
"Minora kartochkasi obyektdan mustaqil: u qaysi obyektda turgani tarixda ko'rinadi":
 "Карточка вышки не зависит от объекта: где она стоит, видно в истории",
"Minoralar reyestri": "Реестр вышек",
"Ko'chirishlar tarixi bilan": "С историей перемещений",
"Kontroller sozlamasida Modbus xizmati va MQTT nashri qo'lda yoqiladi; ular zavod holatida o'chiq turadi.":
 "В настройках контроллера служба Modbus и публикация MQTT включаются вручную; в заводском состоянии они выключены.",
"Ko'p minoralar quvvat qismini Victron GX oilasidagi kontroller bilan boshqaradi. Undan ma'lumot olishning ikki rasmiy yo'li bor: Modbus TCP va MQTT.":
 "Энергетическую часть большинства вышек ведёт контроллер семейства Victron GX. Штатных способов забрать из него данные два: Modbus TCP и MQTT.",

/* --- 05 operator --- */
"Minora operatorga karnay beradi: 03:40 da chiziq kesilganda u PTZ ni presetga buradi va «Hudud videokuzatuv ostida» ogohlantirishini yoqadi. Ko'p hollarda odam shu ogohlantirishdan keyin ketadi va hodisa qo'riqlash chaqiruvisiz yopiladi.":
 "Вышка даёт оператору громкоговоритель: при пересечении линии в 03:40 он разворачивает PTZ на пресет и включает предупреждение «Территория под видеонаблюдением». Чаще всего человек после него уходит, и инцидент закрывается без вызова охраны.",
"Jonli video, PTZ va presetlar": "Живое видео, PTZ и пресеты",
"Talab bo'yicha": "По запросу",
"Chiziq kesish va hudud hodisalari": "События пересечения линии и зоны",
"Darhol": "Сразу",
"Akkumulyator foizi va kuchlanishi": "Процент заряда и напряжение аккумулятора",
"Kontroller, Modbus yoki MQTT": "Контроллер, Modbus или MQTT",
"Panel quvvati va kunlik ishlab chiqarish": "Мощность панелей и суточная выработка",
"Kontroller": "Контроллер",
"Zaxira manba holati": "Состояние резервного источника",
"Kontroller yoki alohida rele": "Контроллер или отдельное реле",
"4G signal darajasi": "Уровень сигнала 4G",
"Router SNMP": "Роутер, SNMP",
"Minora qaysi obyektda": "На каком объекте стоит вышка",
"Ko'chirishda": "При перемещении",
"PTZ ni burish va presetga qaytarish, jonli oqim va arxivni ochish, karnaydan ogohlantirish berish, sirenani yoqish. Har yoqilish jurnalga kim va qachon qilgani bilan yoziladi — bu keyinchalik bahsda kerak bo'ladi.":
 "Повернуть PTZ и вернуть её на пресет, открыть живой поток и архив, дать предупреждение в громкоговоритель, включить сирену. Каждое включение пишется в журнал с именем и временем — это понадобится при последующем разборе.",
"Machtani masofadan tushirish. Bo'ron haqida ogohlantirish kelganda joyga odam borishi kerak. Shuning uchun minora qo'yiladigan obyektga yetib borish vaqti oldindan belgilanadi va reglamentga yoziladi.":
 "Опустить мачту дистанционно. При штормовом предупреждении на место должен выехать человек. Поэтому время доезда до объекта, где стоит вышка, определяется заранее и вносится в регламент.",

/* --- 06 joyiga qo'yish --- */
"Joyiga qo'yish va ko'chirish": "Установка и перемещение",
"Minora bir kunda ishga tushadi, lekin bu kun tartibli o'tishi kerak: yetti qadamning har biri keyingi olti oyning ishonchliligini belgilaydi.":
 "Вышка вводится в работу за один день, но этот день должен пройти по порядку: каждый из семи шагов определяет надёжность следующих шести месяцев.",
"Tekis va qattiq joy tanlanadi. Suv to'planadigan chuqurlik, yumshoq tuproq va daraxt ostiga qo'yilmaydi: bahorda tirkama cho'kadi, kuzda barg panelni yopadi.":
 "Выбирается ровная и твёрдая площадка. Низина, где собирается вода, мягкий грунт и место под деревом не подходят: весной прицеп просядет, осенью листва закроет панель.",
"Tayanch oyoqlar chiqariladi va tirkama gorizontal qilinadi. Qiyshiq turgan tirkamada machta ko'tarilmaydi.":
 "Выдвигаются опорные ноги, прицеп выставляется по горизонту. На перекошенном прицепе мачта не поднимется.",
"Yerga ulash qoziq bilan qilinadi. Machta atrofdagi eng baland nuqtaga aylanadi va chaqmoqni o'ziga tortadi.":
 "Заземление делается штырём. Мачта становится самой высокой точкой вокруг и притягивает молнию.",
"Machta faqat shamol ishlab chiqaruvchi belgilagan chegaradan past bo'lganda ko'tariladi. Chegara reglamentga raqam bilan yoziladi.":
 "Мачта поднимается только при ветре ниже предела, заданного производителем. Предел вносится в регламент конкретной цифрой.",
"G'ildirak va ilgak qulflanadi, GPS treker yoqiladi, og'ish datchigi sozlanadi.":
 "Запираются колесо и сцепное, включается GPS-трекер, настраивается датчик наклона.",
"Kameralar yo'naltiriladi va PTZ ga 4–6 ta preset yoziladi: darvoza, burchaklar, texnika turgan joy.":
 "Наводятся камеры, в PTZ записываются 4–6 пресетов: ворота, углы, площадка техники.",
"Platformada video, quvvat va signal ko'rinadi — shundan keyin dalolatnoma imzolanadi.":
 "На платформе видны видео, питание и сигнал — только после этого подписывается акт.",
"Ko'chirishda tartib teskari: machta tushiriladi, kameralar yig'iladi, platformada minora «ko'chirilmoqda» holatiga o'tadi va yangi obyekt kodiga bog'lanadi. Ko'chirish tarixi minora kartochkasida saqlanadi.":
 "При переезде порядок обратный: мачта опускается, камеры снимаются, на платформе вышка переводится в состояние «перемещается» и привязывается к новому коду объекта. История переездов хранится в карточке вышки.",

/* --- 07 narx --- */
"Narx: 40–120 mln so'm": "Цена: 40–120 млн сумов",
"Pastki chegara — mahalliy yig'ilgan machta, yuqorisi — import tirkama. Farq ikki barobardan ko'p va u asosan konstruksiya hamda yetkazishda.":
 "Нижняя граница — мачта местной сборки, верхняя — импортный прицеп. Разница больше чем вдвое, и складывается она в основном из конструкции и доставки.",
"Tirkama va teleskopik machta": "Прицеп и телескопическая мачта",
"Panel, akkumulyator, kontroller": "Панели, аккумулятор, контроллер",
"PTZ va statik kameralar": "PTZ и статичные камеры",
"Router, NVR, sirena": "Роутер, NVR, сирена",
"Yetkazish, bojxona, ishga tushirish": "Доставка, таможня, пусконаладка",
"Taxminiy baho, 2026-yil sentabr holatiga. Zaxira manba (dizel agregat yoki yoqilg'i elementi) bu jadvalga kirmaydi va u 10–40 mln so'm qo'shadi.":
 "Оценка ориентировочная, по состоянию на сентябрь 2026 года. Резервный источник (дизель-генератор или топливный элемент) в таблицу не входит и добавляет 10–40 млн сумов.",

/* --- 08 xarid yoki ijara --- */
"Xarid, ijara yoki ko'chirish": "Покупка, аренда или переезд",
"Bu yechimda asosiy qaror bitta: minora qanday egalik modelida ishlaydi — xarid, ijara yoki obyektdan obyektga ko'chirish. Xato model tanlansa, jihoz yilning yarmida bo'sh turadi.": "Главное решение здесь одно: в какой модели владения работает вышка — покупка, аренда или переезд с объекта на объект. Ошибка в модели — и техника половину года простаивает.",
"Qachon tanlanadi": "Когда выбирают",
"Nimaga e'tibor": "На что смотреть",
"Oyma-oy ijara": "Помесячная аренда",
"Minora yilda olti oydan kam kerak": "Вышка нужна меньше шести месяцев в году",
"Ijara shartnomasida servis va ko'chirish kim zimmasida ekani":
 "Кто по договору аренды отвечает за сервис и переезды",
"Bankning 2–4 minoralik puli": "Собственный парк банка из 2–4 вышек",
"Katta maydonli obyektlar doim bor": "Объекты с большой площадью есть всегда",
"Minoralar bo'lim balansida, obyekt hisobida emas":
 "Вышки на балансе подразделения, а не на учёте объекта",
"Bitta obyektga xarid": "Покупка под один объект",
"Tavsiya etilmaydi": "Не рекомендуется",
"Obyekt bir yilda sotiladi, minora esa besh yil ishlaydi":
 "Объект продаётся за год, а вышка работает пять лет",
"Lizing": "Лизинг",
"Bir yo'la bir necha minora kerak bo'lganda": "Когда нужно сразу несколько вышек",
"Qarz balansda qoladi va zaxira hisobiga ta'sir qiladi":
 "Долг остаётся на балансе и влияет на расчёт резервов",
"Hisob qoidasi": "Правило расчёта",
"Nega bitta obyektga olinmaydi": "Почему не берут под один объект",
"Markaziy bank nizomi bo'yicha balansga olinganiga bir yil to'lib sotilmagan aktiv «umidsiz» toifaga o'tadi va to'liq zaxira talab qiladi. Nazorat jihozi esa besh yil va undan ko'p ishlaydi. Minorani bitta obyekt hisobiga olish uni bir yildan keyin bo'sh qoldiradi.":
 "По положению Центрального банка актив, не проданный в течение года с момента постановки на баланс, переходит в категорию «безнадёжных» и требует полного резервирования. Контрольное оборудование при этом служит пять лет и больше. Учтённая за одним объектом вышка через год окажется не у дел.",

/* --- 09 besh yil --- */
"SIM va trafik": "SIM и трафик",
"Oyma-oy, 100–200 ming so'm": "Ежемесячно, 100–200 тысяч сумов",
"6–12 mln so'm": "6–12 млн сумов",
"Servis: panel tozalash, machta mexanizmi, akkumulyator ko'rigi":
 "Сервис: мойка панелей, механизм мачты, осмотр аккумулятора",
"Yiliga 1–2 marta": "1–2 раза в год",
"5–10 mln so'm": "5–10 млн сумов",
"Ko'chirish": "Перемещение",
"Har safar transport va 2–4 soat ish": "Каждый раз транспорт и 2–4 часа работы",
"1–3 mln so'm har safar": "1–3 млн сумов за раз",
"Qor tozalash": "Очистка от снега",
"Qor yoqqandan keyin, servis rejasida": "После снегопада, по плану обслуживания",
"Qatnov narxida": "В стоимости выезда",
"LiFePO4 akkumulyator": "Аккумулятор LiFePO4",
"Besh yilda almashtirilmaydi": "За пять лет не меняется",
"Minora qorovulsiz joyda turadi va u ham qimmat aktiv. Sug'urta shartnomasida uning ko'chib yurishi alohida band bo'lib yoziladi, aks holda talab boshqa manzildagi voqea uchun rad etilishi mumkin.":
 "Вышка стоит там, где нет охраны, и сама является дорогим активом. В договоре страхования её перемещения прописываются отдельным пунктом, иначе в выплате по событию на другом адресе могут отказать.",

/* --- 10 nosozlik --- */
"Qor panelni yopdi va minora to'rt kunda o'chdi":
 "Снег закрыл панели, и через четверо суток вышка погасла",
"Dekabrda zaxira atigi 40 foiz. Panel qor bilan qoplansa, ishlab chiqarish nolga tushadi va akkumulyator besh-olti kunda bo'shaydi. Bulutli hafta bunga qo'shilsa, muddat yanada qisqaradi.":
 "В декабре запас составляет всего 40 процентов. Если панель укрыта снегом, выработка падает до нуля и аккумулятор опустошается за пять-шесть суток. Если к этому добавится пасмурная неделя, срок сократится ещё.",
"Panel qishki 55 daraja burchakka o'rnatiladi va qor o'zi sirg'alib tushadi. Qor tozalash servis rejasiga kiritiladi. Zaxira manba 30 foizda avtomatik yonadi. Operator akkumulyator foizining uch kunlik tendensiyasini ko'radi.":
 "Панель выставляется на зимний угол 55 градусов, и снег сходит сам. Очистка от снега вносится в план обслуживания. Резервный источник включается автоматически на 30 процентах. Оператор видит трёхдневный тренд заряда аккумулятора.",
"Machta ko'tarilgan holda bo'ron boshlandi": "Шторм начался при поднятой мачте",
"Bu yechimning eng qimmat nosozligi: bo'ron ko'tarilgan machtani ham, undagi kameralarni ham, ba'zan tirkamaning o'zini ham yo'q qiladi. Jihoz sug'urtalangan bo'lsa ham, obyekt bir necha hafta nazoratsiz qoladi.":
 "Самый дорогой отказ этого решения: шторм уничтожает и поднятую мачту, и камеры на ней, а иногда и сам прицеп. Даже если оборудование застраховано, объект останется без контроля на несколько недель.",
"Shamol chegarasi reglamentga raqam bilan yoziladi. Og'ish datchigi platformaga hodisa beradi. Obyektga yetib borish vaqti oldindan belgilanadi: machtani masofadan tushirib bo'lmaydi.":
 "Ветровой предел вносится в регламент конкретной цифрой. Датчик наклона отправляет событие на платформу. Время доезда до объекта определяется заранее: опустить мачту дистанционно нельзя.",
"Minoraning o'zi olib ketildi": "Увезли саму вышку",
"Tirkama g'ildirakda turadi va uni ilgakli har qanday avtomobil tortib ketishi mumkin. Bu bo'sh obyektdagi eng qimmat bitta buyum.":
 "Прицеп стоит на колёсах, и утащить его может любой автомобиль с фаркопом. Это самый дорогой единичный предмет на пустом объекте.",
"G'ildirak va ilgak qulfi, GPS treker, og'ish va harakat datchigi, machta pastiga qaratilgan kamera. Minora balansda asosiy vosita sifatida yuritiladi va sug'urtalanadi. Har ko'chirish platformada qayd etiladi.":
 "Замок на колесо и сцепное, GPS-трекер, датчики наклона и движения, камера на основание мачты. Вышка числится на балансе как основное средство и страхуется. Каждый переезд фиксируется на платформе.",

/* --- 11 qaysi obyektga --- */
"Bir gektardan katta ochiq maydon: ishlab chiqarish hovlisi, texnika turadigan joy, ochiq ombor.":
 "Открытая площадка больше гектара: производственный двор, стоянка техники, открытый склад.",
"Tugallanmagan qurilish: devor va darvoza hali yo'q, perimetrni chizib bo'lmaydi.":
 "Незавершённое строительство: забора и ворот ещё нет, периметр не очертить.",
"O'g'irlik urinishi bo'lgan obyekt: bir necha hafta kuchaytirilgan nazorat kerak.":
 "Объект, где была попытка кражи: на несколько недель нужен усиленный контроль.",
"Balansdagi ishlab chiqarish sexlari va chorvachilik fermalari hududlari.":
 "Территории производственных цехов и животноводческих ферм на балансе.",
"Ichki xonalar va omborlar: minora ular uchun hech narsa qilmaydi, u yerga datchik yoki LiFePO4 shkafi qo'yiladi.":
 "Внутренние помещения и склады: вышка для них ничего не даёт, туда ставят датчики или шкаф LiFePO4.",
"Tor hovli va shahar ichidagi kichik uchastka: bitta statik kamera arzonroq va yetarli.":
 "Тесный двор и небольшой участок в черте города: одна статичная камера дешевле и достаточна.",
"Tirkama kira olmaydigan joy: tor ko'cha, ko'prik cheklovi, yumshoq tuproq.":
 "Место, куда прицеп не заедет: узкая улица, ограничение по мосту, мягкий грунт.",
"Bir oydan kam nazorat kerak bo'lgan obyekt: yetkazish va ko'chirish o'zini oqlamaydi.":
 "Объект, где контроль нужен меньше месяца: доставка и переезд себя не оправдают.",

/* --- 12 savollar --- */
"Energiya balansi hisobi dekabr uchun berilganmi?":
 "Дан ли расчёт энергетического баланса на декабрь?",
"Iyun hisobi bilan kelgan minora yanvarda o'chadi. Hisob oylar kesimida so'raladi.":
 "Вышка с июньским расчётом в январе погаснет. Расчёт запрашивается в разрезе месяцев.",
"Akkumulyator qaysi kimyoda va isitgichi bormi?":
 "На какой химии аккумулятор и есть ли у него подогрев?",
"LiFePO4 nol darajadan past zaryadlanmaydi; GEL sovuqqa chidamliroq, lekin og'irroq va sikli kam.":
 "LiFePO4 не заряжается ниже нуля; гелевый устойчивее к холоду, но тяжелее и выдерживает меньше циклов.",
"Machta ko'tarilgan holdagi shamol chegarasi qancha?":
 "Каков ветровой предел при поднятой мачте?",
"Bu raqam reglamentga tushadi va minorani saqlab qoladigan yagona shart.":
 "Эта цифра идёт в регламент и остаётся единственным условием, которое сохранит вышку.",
"Machtani ko'tarish va tushirish qancha vaqt oladi va necha kishi kerak?":
 "Сколько времени занимает подъём и опускание мачты и сколько человек для этого нужно?",
"Bo'ron ogohlantirishi kelganda bu vaqt hal qiluvchi bo'ladi.":
 "При штормовом предупреждении именно это время становится решающим.",
"Quvvat kontrolleridan Modbus TCP yoki MQTT orqali ma'lumot olish mumkinmi?":
 "Можно ли забрать данные из контроллера питания по Modbus TCP или MQTT?",
"Yopiq kontroller bilan akkumulyator holati platformada ko'rinmaydi.":
 "С закрытым контроллером состояние аккумулятора на платформе не видно.",
"Zaxira manba bormi va u necha foizda avtomatik yonadi?":
 "Есть ли резервный источник и при каком проценте заряда он включается сам?",
"Qishda bu yagona ishonchli zaxira.": "Зимой это единственный надёжный резерв.",
"Tirkamaning to'liq og'irligi qancha va qaysi toifadagi haydovchi kerak?":
 "Какова полная масса прицепа и водитель какой категории нужен?",
"Ko'chirish xarajatining asosiy qismi shu javobdan chiqadi.":
 "Основная часть стоимости переезда следует именно из этого ответа.",
"Karnay va sirenani platformadan boshqarish uchun qanday interfeys bor?":
 "Какой интерфейс есть для управления громкоговорителем и сиреной с платформы?",
"Rele chiqishi bo'lmasa, ogohlantirish faqat joyda beriladi.":
 "Без релейного выхода предупреждение можно дать только на месте.",
"Servis oralig'i qancha va O'zbekistonda kim bajaradi?":
 "Каков межсервисный интервал и кто выполняет обслуживание в Узбекистане?",
"Machta mexanizmi yillik ko'rik talab qiladi.":
 "Механизм мачты требует ежегодного осмотра.",
"Oylik ijara varianti bormi va unga servis kiradimi?":
 "Есть ли вариант помесячной аренды и входит ли в неё обслуживание?",
"Ijara ko'p hollarda xariddan foydaliroq chiqadi.":
 "Аренда во многих случаях оказывается выгоднее покупки.",

/* --- 13 solishtirish --- */
"Ofis va qimmat obyekt": "Офис и дорогой объект",
"Katta ombor, texnik xona": "Большой склад, техпомещение",
"Ko'chma stansiya": "Мобильная станция",
"Qisqa muddatli aktiv": "Краткосрочный актив",
"Chekka va qimmat obyekt": "Удалённый и дорогой объект",
"Mobil minora": "Мобильная вышка",
"Katta maydon": "Большая площадь",
"Klaster shkafi": "Кластерный шкаф"
});

Object.assign(window.MKB_LUGAT, {
"Oylik ijara × oylar < xarid narxi − qoldiq qiymati bo'lsa, ijara foydali. Misol: 80 mln so'mlik minora besh yil ishlaydi va 16 mln so'mga sotiladi. Yillik egalik narxi 12,8 mln so'm, har ko'chirish yana 1–3 mln. Minora yil bo'yi band bo'lmasa, ijara arzonroq.":
 "Если месячная аренда × число месяцев < цена покупки − остаточная стоимость, аренда выгоднее. Пример: вышка за 80 млн сумов служит пять лет и продаётся за 16 млн. Годовая стоимость владения — 12,8 млн сумов, каждый переезд добавляет ещё 1–3 млн. Если вышка занята не круглый год, аренда дешевле."
});
