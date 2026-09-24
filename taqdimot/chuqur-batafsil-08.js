/* Yechim 08 — metanolli EFOY yoqilg'i elementi. Sahifadagi bosiladigan bloklar. */
window.MKB_BATAFSIL = Object.assign(window.MKB_BATAFSIL || {}, {

"y08.element": {
  yorliq: "Jamoa rahbarlari uchun", sarlavha: "Yoqilg'i elementi zaryadlagich, generator emas",
  tana: "<p>To'g'ridan-to'g'ri metanolli yoqilg'i elementi membranada metanol va suvni reaksiyaga kiritadi; natijada elektr, suv bug'i, CO₂ va issiqlik hosil bo'ladi. Uning quvvati doimiy va uni oshirib bo'lmaydi: bu generator emas, akkumulyator zaryadlagichi.</p>" +
    "<table><tr><th>Model</th><th>Nominal quvvat</th><th>Sutkasiga</th></tr>" +
    "<tr><td class='b'>EFOY Pro 900</td><td class='n'>42 Vt</td><td class='n'>1,0 kVt·soat</td></tr>" +
    "<tr><td class='b'>EFOY Pro 1800</td><td class='n'>82 Vt</td><td class='n'>2,0 kVt·soat</td></tr>" +
    "<tr><td class='b'>EFOY Pro 2800</td><td class='n'>125 Vt</td><td class='n'>3,0 kVt·soat</td></tr></table>" +
    "<h4>Model qanday tanlanadi</h4>" +
    "<p>Nominal quvvat sutkalik o'rtacha yukdan kamida 1,5 barobar katta olinadi. 30 vattlik yukka Pro 900 chegarada ishlaydi, Pro 1800 esa zaxira bilan. Cho'qqi quvvatga qarab tanlanmaydi: PTZ aylanishidagi 25 vattni element emas, akkumulyator ko'taradi.</p>" +
    "<p class='ogoh'>Element sutkasiga bir necha marta yonadi va o'chadi — bu normal ish tartibi. Uni doim yoqib qo'yish mumkin emas va shart ham emas: har ishga tushish sikli issiqlik va yoqilg'i talab qiladi, shuning uchun juda tez-tez yonib-o'chish akkumulyator kichikligini bildiradi.</p>",
  manba: [["EFOY Pro modellari", "https://www.efoy-pro.com/en/efoy/efoy-efoypro/"]],
  ru: {yorliq: "Для тимлида", sarlavha: "Топливный элемент — зарядное устройство, а не генератор",
    tana: "<p>Прямой метанольный топливный элемент проводит на мембране реакцию метанола и воды; на выходе — электричество, водяной пар, CO₂ и тепло. Его мощность постоянна и увеличить её нельзя: это не генератор, а зарядное устройство для аккумулятора.</p>" +
      "<table><tr><th>Модель</th><th>Номинальная мощность</th><th>В сутки</th></tr>" +
      "<tr><td class='b'>EFOY Pro 900</td><td class='n'>42 Вт</td><td class='n'>1,0 кВт·ч</td></tr>" +
      "<tr><td class='b'>EFOY Pro 1800</td><td class='n'>82 Вт</td><td class='n'>2,0 кВт·ч</td></tr>" +
      "<tr><td class='b'>EFOY Pro 2800</td><td class='n'>125 Вт</td><td class='n'>3,0 кВт·ч</td></tr></table>" +
      "<h4>Как выбирается модель</h4>" +
      "<p>Номинальная мощность берётся минимум в 1,5 раза больше среднесуточной нагрузки. Для нагрузки 30 Вт Pro 900 работает на пределе, Pro 1800 — с запасом. По пиковой мощности выбор не делается: 25 Вт при повороте PTZ берёт на себя аккумулятор, а не элемент.</p>" +
      "<p class='ogoh'>Элемент включается и выключается несколько раз в сутки — это штатный режим. Держать его включённым постоянно нельзя, да и незачем: каждый пуск требует тепла и топлива, поэтому слишком частые циклы означают, что аккумулятор мал.</p>"}
},

"y08.kartrij": {
  yorliq: "Montajchi uchun", sarlavha: "M28 kartriji va yoqilg'i hisobi",
  tana: "<p>M28 — 28 litrli kartrij: 23,4 kg og'irlik, 31,1 kVt·soat energiya. Nominal sarf har kVt·soatga 0,9 litr metanol.</p>" +
    "<table><tr><th>O'rtacha yuk</th><th>Sutkasiga</th><th>M28 yetadi</th></tr>" +
    "<tr><td>55 Vt</td><td class='n'>1,3 kVt·soat</td><td class='n'>24 kun</td></tr>" +
    "<tr><td>40 Vt</td><td class='n'>0,96 kVt·soat</td><td class='n'>33 kun</td></tr>" +
    "<tr><td>30 Vt</td><td class='n'>0,72 kVt·soat</td><td class='n'>43 kun</td></tr></table>" +
    "<h4>Fuel Manager</h4>" +
    "<p>Fuel Manager moduli 8 tagacha kartrijni ketma-ket ulaydi: biri tugaganda element o'zi keyingisiga o'tadi. To'rtta M28 bilan 30 vattlik yuk qariyb 170 kun ishlaydi, ya'ni obyektga yiliga ikki marta borilsa yetadi. Chekkadagi obyektda bu asosiy tejash: qatnov yoqilg'idan qimmatga tushishi mumkin.</p>" +
    "<p class='ogoh'>Kartrij element yonida emas, qulflangan alohida bo'limda turadi. Bo'lim ochilishiga datchik qo'yiladi va u platformaga hodisa bo'lib tushadi.</p>",
  manba: [["EFOY kartrijlari", "https://www.efoy-pro.com/en/efoy/fuel-cartridges/"]],
  ru: {yorliq: "Для монтажника", sarlavha: "Картридж M28 и расчёт топлива",
    tana: "<p>M28 — картридж на 28 литров: масса 23,4 кг, энергия 31,1 кВт·ч. Номинальный расход — 0,9 литра метанола на каждый кВт·ч.</p>" +
      "<table><tr><th>Средняя нагрузка</th><th>В сутки</th><th>M28 хватает на</th></tr>" +
      "<tr><td>55 Вт</td><td class='n'>1,3 кВт·ч</td><td class='n'>24 суток</td></tr>" +
      "<tr><td>40 Вт</td><td class='n'>0,96 кВт·ч</td><td class='n'>33 суток</td></tr>" +
      "<tr><td>30 Вт</td><td class='n'>0,72 кВт·ч</td><td class='n'>43 суток</td></tr></table>" +
      "<h4>Fuel Manager</h4>" +
      "<p>Модуль Fuel Manager подключает последовательно до восьми картриджей: при опустошении одного элемент сам переходит на следующий. С четырьмя M28 нагрузка в 30 Вт обеспечивается почти 170 суток, то есть на объект достаточно выезжать дважды в год. Для удалённого объекта это и есть основная экономия: выезд может стоить дороже топлива.</p>" +
      "<p class='ogoh'>Картридж хранится не рядом с элементом, а в отдельном запираемом отсеке. На отсек ставится датчик вскрытия, его срабатывание уходит событием на платформу.</p>"}
},

"y08.akb": {
  yorliq: "Montajchi uchun", sarlavha: "Akkumulyator nega kerak va u qanday tanlanadi",
  tana: "<p>Element doimiy quvvat beradi, yuk esa tebranib turadi. Bu farqni akkumulyator yopadi va u ikkita vazifani bajaradi.</p>" +
    "<ul><li><b>Cho'qqilarni ko'tarish.</b> PTZ aylanishi, IR yoritgichning yonishi va NVR yozuvi qisqa vaqtga 25–40 vattlik cho'qqi beradi. Element buni ta'qib qilmaydi.</li>" +
    "<li><b>Sikl sonini kamaytirish.</b> Sig'im katta bo'lsa, element kuniga to'rt marta emas, ikki marta yonadi. Har ishga tushish yoqilg'i va resurs sarflaydi.</li></ul>" +
    "<h4>Sovuq masalasi</h4>" +
    "<p>LiFePO4 0 °C dan past zaryadlanmaydi. Isitilmaydigan shkafda bu qishda zaryadni butunlay to'xtatadi va element bekorga ishlaydi. Ikki yo'l bor: past harorat himoyali va isitgichli akkumulyator olish yoki shkafni izolyatsiyalab, element issiqligini ichkarida ushlab qolish. Amalda ikkalasi ham qilinadi.</p>" +
    "<p class='ogoh'>Isitgich akkumulyatorning o'zidan oziqlanmaydi: bu aylanma sarf hosil qiladi. U elementning issiqligidan yoki quyosh panelidan oziqlanadi.</p>",
  manba: [],
  ru: {yorliq: "Для монтажника", sarlavha: "Зачем нужен аккумулятор и как он выбирается",
    tana: "<p>Элемент отдаёт постоянную мощность, а нагрузка колеблется. Эту разницу закрывает аккумулятор, и у него две задачи.</p>" +
      "<ul><li><b>Принимать пики.</b> Поворот PTZ, включение ИК-прожектора и запись NVR дают кратковременные пики в 25–40 Вт. Элемент за ними не следует.</li>" +
      "<li><b>Сокращать число циклов.</b> Чем больше ёмкость, тем реже пуски: не четыре раза в сутки, а два. Каждый пуск расходует топливо и ресурс.</li></ul>" +
      "<h4>Вопрос холода</h4>" +
      "<p>LiFePO4 не заряжается при температуре ниже 0 °C. В неотапливаемом шкафу это полностью останавливает заряд зимой, и элемент работает впустую. Есть два пути: взять аккумулятор с низкотемпературной защитой и подогревом или утеплить шкаф, удерживая внутри тепло самого элемента. На практике делается и то, и другое.</p>" +
      "<p class='ogoh'>Подогрев не питается от самого аккумулятора: это создаёт замкнутый расход. Он питается от тепла элемента или от солнечной панели.</p>"}
},

"y08.yuk": {
  yorliq: "Montajchi uchun", sarlavha: "Yukni 55 vattdan 30 vattga tushirish",
  tana: "<p>Metanol har vatt uchun pul, shuning uchun komplekt tanlashdan oldin yuk hisoblanadi va keyin maqsadli ravishda kamaytiriladi.</p>" +
    "<table><tr><th>Qurilma</th><th>Vt</th></tr>" +
    "<tr><td>PTZ kamera, kechasi IR bilan</td><td class='n'>15–25</td></tr>" +
    "<tr><td>Statik IP kamera, 2 dona</td><td class='n'>8–10</td></tr>" +
    "<tr><td>NVR, SSD bilan</td><td class='n'>6–10</td></tr>" +
    "<tr><td>Router</td><td class='n'>5</td></tr>" +
    "<tr><td>Domofon va datchiklar</td><td class='n'>4–5</td></tr>" +
    "<tr class='jami'><td>Jami</td><td class='n'>38–55</td></tr></table>" +
    "<h4>Uchta qaror</h4>" +
    "<ul><li>PTZ kechasi bitta nuqtada turadi; aylanish faqat hodisada. Bu 10 vattgacha tejaydi.</li>" +
    "<li>NVR qattiq disk emas, SSD bilan yig'iladi: kam quvvat va sovuqqa chidamli.</li>" +
    "<li>IR yoritgich faqat hovli chirog'i yetmaydigan kamerada yoqiladi, qolganlari yorug' tomonga qaraydi.</li></ul>" +
    "<p class='ogoh'>Maqsad — o'rtacha 30 vatt. Shunda M28 kartrij 24 kun emas, 43 kun yetadi va yillik yoqilg'i qariyb ikki barobar kamayadi. Montajdan keyingi birinchi haftada haqiqiy iste'mol Modbus orqali o'lchanadi va jadval shunga qarab tuzatiladi.</p>",
  manba: [],
  ru: {yorliq: "Для монтажника", sarlavha: "Снижение нагрузки с 55 до 30 ватт",
    tana: "<p>Метанол — это деньги за каждый ватт, поэтому до выбора комплекта нагрузка считается, а затем целенаправленно снижается.</p>" +
      "<table><tr><th>Устройство</th><th>Вт</th></tr>" +
      "<tr><td>PTZ-камера, ночью с ИК</td><td class='n'>15–25</td></tr>" +
      "<tr><td>Статичная IP-камера, 2 шт.</td><td class='n'>8–10</td></tr>" +
      "<tr><td>NVR с SSD</td><td class='n'>6–10</td></tr>" +
      "<tr><td>Маршрутизатор</td><td class='n'>5</td></tr>" +
      "<tr><td>Домофон и датчики</td><td class='n'>4–5</td></tr>" +
      "<tr class='jami'><td>Итого</td><td class='n'>38–55</td></tr></table>" +
      "<h4>Три решения</h4>" +
      "<ul><li>Ночью PTZ стоит в одной точке; поворот — только по событию. Это экономит до 10 Вт.</li>" +
      "<li>NVR собирается с SSD, а не с жёстким диском: меньше потребление и лучше стойкость к холоду.</li>" +
      "<li>ИК-прожектор включается только на камере, которой не хватает дворового освещения; остальные смотрят в освещённую сторону.</li></ul>" +
      "<p class='ogoh'>Цель — в среднем 30 Вт. Тогда картриджа M28 хватает не на 24, а на 43 суток, и годовой расход топлива падает почти вдвое. В первую неделю после монтажа фактическое потребление замеряется по Modbus, и график корректируется по нему.</p>"}
},

"y08.yoqilgi": {
  yorliq: "Moliya va huquq", sarlavha: "Bir kartrij, bir yil, besh yil",
  tana: "<p>M28 kartriji Yevropada taxminan 294 yevro, ya'ni 4 mln so'm atrofida turadi. Yillik hisob shundan chiqadi.</p>" +
    "<table><tr><th>Sxema</th><th>Yiliga</th><th>Besh yilda</th></tr>" +
    "<tr><td class='b'>Faqat element, 30 Vt</td><td class='n'>≈34 mln so'm</td><td class='n'>≈170 mln so'm</td></tr>" +
    "<tr><td class='b'>Quyosh bilan gibrid</td><td class='n'>11–14 mln so'm</td><td class='n'>≈55 mln so'm</td></tr></table>" +
    "<p>Faqat element bilan ishlaganda yillik yoqilg'i 42 ta M28 ga, ya'ni 1 314 kVt·soatga teng bo'ladi. Gibrid sxemada element asosan noyabr–fevralda ishlaydi va kartrijlar soni 14 taga tushadi.</p>" +
    "<h4>Qaror uchun raqam</h4>" +
    "<p>Besh yillik yoqilg'i xarajati jihoz narxiga teng yoki undan ko'p bo'lishi mumkin. Shuning uchun taqqoslash xarid narxi bo'yicha emas, besh yillik to'liq egalik qiymati bo'yicha qilinadi. Shu hisobda quyosh paneli 3–5 mln so'mga birinchi yildayoq o'zini qoplaydi.</p>" +
    "<p class='ogoh'>Muzlashdan himoya rejimining sarfi jadvalga kirmagan. Qish oylarida u yillik hisobga yana 5–10 foiz qo'shadi va bu raqam yetkazuvchidan hujjat bilan so'raladi.</p>",
  manba: [["EFOY kartrijlari", "https://www.efoy-pro.com/en/efoy/fuel-cartridges/"]],
  ru: {yorliq: "Финансы и право", sarlavha: "Один картридж, год, пять лет",
    tana: "<p>Картридж M28 в Европе стоит около 294 евро, то есть примерно 4 млн сумов. Из этого и складывается годовой расчёт.</p>" +
      "<table><tr><th>Схема</th><th>В год</th><th>За пять лет</th></tr>" +
      "<tr><td class='b'>Только элемент, 30 Вт</td><td class='n'>≈34 млн сумов</td><td class='n'>≈170 млн сумов</td></tr>" +
      "<tr><td class='b'>Гибрид с солнечной панелью</td><td class='n'>11–14 млн сумов</td><td class='n'>≈55 млн сумов</td></tr></table>" +
      "<p>При работе только от элемента годовой расход составляет 42 картриджа M28, то есть 1 314 кВт·ч. В гибридной схеме элемент работает в основном с ноября по февраль, и число картриджей падает до четырнадцати.</p>" +
      "<h4>Цифра для решения</h4>" +
      "<p>Расход топлива за пять лет может сравняться со стоимостью оборудования или превысить её. Поэтому сравнение ведётся не по цене закупки, а по полной стоимости владения за пять лет. При таком счёте солнечная панель за 3–5 млн сумов окупается уже в первый год.</p>" +
      "<p class='ogoh'>Расход в режиме защиты от замерзания в таблицу не включён. В зимние месяцы он добавляет к годовому счёту ещё 5–10%, и эту цифру запрашивают у поставщика документально.</p>"}
},

"y08.gibrid": {
  yorliq: "Jamoa rahbarlari uchun", sarlavha: "Gibrid sxema: panel elementni to'xtatadi",
  tana: "<p>Panel va yoqilg'i elementi bir akkumulyatorga ishlaydi va ular o'rtasida hech qanday boshqaruv mantig'i kerak emas: kuchlanish yuqori chegaraga chiqqanda element o'zi o'chadi.</p>" +
    "<h4>Nima beradi</h4>" +
    "<ul><li>Yozda element deyarli butunlay to'xtaydi: panel kunlik ehtiyojni to'liq qoplaydi.</li>" +
    "<li>Dekabrda Toshkent insolyatsiyasi 1,62 kVt·soat/m². 400 Vt panel yo'qotishlar bilan sutkasiga taxminan 0,45 kVt·soat beradi — bu 30 vattlik yukning uchdan bir qismidan ko'prog'i.</li>" +
    "<li>Yillik yoqilg'i 42 ta kartrijdan 14 taga tushadi.</li></ul>" +
    "<h4>Qo'shimcha foyda</h4>" +
    "<p>Element kamroq ishga tushadi, demak servis muddati uzayadi va ishlagan soatlar sekinroq to'planadi. Panel bir vaqtning o'zida akkumulyator isitgichini ham oziqlantiradi.</p>" +
    "<p class='ogoh'>Panelga joy topilmasa (soya, tog' oralig'i, tom holati), gibrid sxema ishlamaydi — aynan shunday obyektlarda bu yechim tanlanadi. Shuning uchun panel imkoniyati ko'rikda alohida qayd etiladi.</p>",
  manba: [],
  ru: {yorliq: "Для тимлида", sarlavha: "Гибридная схема: панель останавливает элемент",
    tana: "<p>Панель и топливный элемент работают на один аккумулятор, и никакой управляющей логики между ними не требуется: когда напряжение доходит до верхнего порога, элемент выключается сам.</p>" +
      "<h4>Что это даёт</h4>" +
      "<ul><li>Летом элемент практически не работает: панель полностью покрывает суточную потребность.</li>" +
      "<li>В декабре инсоляция в Ташкенте — 1,62 кВт·ч/м². Панель 400 Вт с учётом потерь даёт около 0,45 кВт·ч в сутки — это больше трети нагрузки в 30 Вт.</li>" +
      "<li>Годовой расход падает с 42 картриджей до 14.</li></ul>" +
      "<h4>Дополнительная выгода</h4>" +
      "<p>Элемент запускается реже, значит, сервисный интервал растягивается и моточасы набираются медленнее. Панель одновременно питает и подогрев аккумулятора.</p>" +
      "<p class='ogoh'>Если места под панель нет (тень, ущелье, состояние кровли), гибридная схема не работает — а именно на таких объектах это решение и выбирают. Поэтому возможность установки панели отдельно фиксируется на осмотре.</p>"}
},

"y08.sovuq": {
  yorliq: "Montajchi uchun", sarlavha: "Muzlashdan himoya va uning narxi",
  tana: "<p>Element ichida suv aylanadi, shuning uchun u muzlashdan himoyalanadi. Harorat chegaradan pastga tushganda qurilma o'zini isitish uchun yoqilg'i sarflay boshlaydi — bu akkumulyatorni zaryadlamaydi va foydali ish bermaydi, faqat qurilmani saqlaydi.</p>" +
    "<h4>Nima qilinadi</h4>" +
    "<ul><li>Shkaf izolyatsiyalanadi. Elementning o'z issiqligi izolyatsiyali shkafda ichki haroratni tashqaridan 10–15 daraja yuqori ushlab turadi va himoya rejimi deyarli yoqilmaydi.</li>" +
    "<li>Shkaf imkon qadar bino ichiga qo'yiladi; tashqarida bo'lsa, shimol tomonga emas, shamoldan yopiq joyga.</li>" +
    "<li>Egzoz quvuri pastga qiyalik bilan chiqariladi: kondensat muzlab, chiqishni yopib qo'yishi mumkin.</li></ul>" +
    "<h4>Hisobga olish</h4>" +
    "<p>Muzlashdan himoya sarfi katalogdagi asosiy jadvalda ko'rsatilmaydi. Qish oylarida u yillik yoqilg'iga 5–10 foiz qo'shadi. Yetkazuvchidan bu raqam alohida so'raladi va smetaga kiritiladi.</p>" +
    "<p class='ogoh'>Element −20 °C gacha ishlaydi. Undan sovuqroq joyda izolyatsiyali va isitiladigan shkaf shartsiz talab bo'lib qoladi.</p>",
  manba: [["EFOY Pro modellari", "https://www.efoy-pro.com/en/efoy/efoy-efoypro/"]],
  ru: {yorliq: "Для монтажника", sarlavha: "Защита от замерзания и её стоимость",
    tana: "<p>Внутри элемента циркулирует вода, поэтому он защищён от замерзания. При падении температуры ниже порога устройство начинает расходовать топливо на собственный обогрев — аккумулятор при этом не заряжается и полезной работы нет, сохраняется только сам аппарат.</p>" +
      "<h4>Что делается</h4>" +
      "<ul><li>Шкаф утепляется. Собственное тепло элемента в утеплённом шкафу удерживает внутреннюю температуру на 10–15 градусов выше наружной, и режим защиты почти не включается.</li>" +
      "<li>Шкаф по возможности размещается внутри здания; если снаружи — то не с северной стороны, а в месте, закрытом от ветра.</li>" +
      "<li>Выхлопная труба выводится с уклоном вниз: конденсат может замёрзнуть и перекрыть выход.</li></ul>" +
      "<h4>Что учесть</h4>" +
      "<p>Расход на защиту от замерзания в основной таблице каталога не показан. В зимние месяцы он добавляет к годовому расходу 5–10%. Эта цифра запрашивается у поставщика отдельно и вносится в смету.</p>" +
      "<p class='ogoh'>Элемент работает до −20 °C. В более холодном месте утеплённый и обогреваемый шкаф становится безусловным требованием.</p>"}
},

"y08.shkaf": {
  yorliq: "Montajchi uchun", sarlavha: "Shkaf, egzoz va havo kirishi",
  tana: "<p>Element ishlaganda suv bug'i va karbonat angidrid chiqaradi, shuning uchun shkaf germetik bo'lmaydi: unga kirish va chiqish kerak.</p>" +
    "<h4>Egzoz quvuri</h4>" +
    "<ul><li>Tashqariga pastga qiyalik bilan chiqariladi. Gorizontal quvurda kondensat yig'iladi va qishda muzlaydi.</li>" +
    "<li>Uchi qiya kesiladi va yon tomonga qaratiladi, shamolga qarshi emas.</li>" +
    "<li>Qor to'planadigan joyga, tomning quyi qismiga chiqarilmaydi.</li>" +
    "<li>Chiqish og'zi odam yurmaydigan balandlikda bo'ladi.</li></ul>" +
    "<h4>Havo kirishi</h4>" +
    "<p>Element toza havo oladi. Kirish filtr bilan qilinadi, aks holda chang ichkariga kiradi. O'zbekiston sharoitida filtr yiliga bir-ikki marta, changli hududda ko'proq almashtiriladi: to'lgan filtr elementni quvvatdan tushiradi va xato kodi beradi.</p>" +
    "<h4>Ichki tartib</h4>" +
    "<p>Kartrij element yonida emas, qulflangan alohida bo'limda. Bo'limda ochilish datchigi. Akkumulyator pastda, kabel kiritishlar salnik bilan, hamma liniyada saqlagich.</p>" +
    "<p class='ogoh'>Shkaf yonida yonuvchi material saqlanmaydi. Ogohlantirish belgisi va xavfsizlik ma'lumotlari varaqasi shkaf eshigining ichki tomonida turadi.</p>",
  manba: [],
  ru: {yorliq: "Для монтажника", sarlavha: "Шкаф, выхлоп и приток воздуха",
    tana: "<p>При работе элемент выделяет водяной пар и углекислый газ, поэтому шкаф не делается герметичным: нужны приток и выход.</p>" +
      "<h4>Выхлопная труба</h4>" +
      "<ul><li>Выводится наружу с уклоном вниз. В горизонтальной трубе скапливается конденсат, который зимой замерзает.</li>" +
      "<li>Срез делается косым и направляется вбок, а не навстречу ветру.</li>" +
      "<li>Не выводится туда, где скапливается снег, и не в нижнюю часть кровли.</li>" +
      "<li>Выходное отверстие располагается на высоте, где не ходят люди.</li></ul>" +
      "<h4>Приток воздуха</h4>" +
      "<p>Элементу нужен чистый воздух. Приток делается через фильтр, иначе внутрь попадает пыль. В условиях Узбекистана фильтр меняется раз-два в год, в запылённых районах чаще: забитый фильтр снижает мощность элемента и вызывает код ошибки.</p>" +
      "<h4>Внутренний порядок</h4>" +
      "<p>Картридж — не рядом с элементом, а в отдельном запираемом отсеке. В отсеке датчик вскрытия. Аккумулятор внизу, вводы кабеля через сальники, на каждой линии предохранитель.</p>" +
      "<p class='ogoh'>Рядом со шкафом не хранятся горючие материалы. Предупреждающий знак и паспорт безопасности размещаются с внутренней стороны дверцы шкафа.</p>"}
},

"y08.modbus": {
  yorliq: "Jamoa rahbarlari uchun", sarlavha: "Modbus orqali telemetriya",
  tana: "<p>EFOY Pro'da RS-232 ma'lumot porti bor va masofadan kuzatish shu port orqali Modbus RTU yoki SIO protokolida ishlaydi. IP interfeysi yo'q, shuning uchun sxemaga bitta qurilma qo'shiladi.</p>" +
    "<h4>Ulanish</h4>" +
    "<ol><li>RS-232 porti RS-232 → Ethernet shlyuziga ulanadi: Modbus RTU Modbus TCP ga aylanadi.</li>" +
    "<li>Adapter har 60 soniyada o'qiydi: akkumulyator kuchlanishi, ish holati, kartrijdagi yoqilg'i, xato kodi va ishlagan soatlar.</li>" +
    "<li>Natija MKB formatida yoziladi: <code>mkb/v1/{obyekt}/{device_id}/quvvat</code>.</li></ol>" +
    "<h4>Qoidalar</h4>" +
    "<ul><li>Yoqilg'i 30 foizdan kam — kartrij buyurtmasi. Chegara 20 emas, 30 foiz: import va ADR tashuvi uch haftagacha cho'ziladi.</li>" +
    "<li>Xato kodi — servis vazifasi va distribyutorga xabar.</li>" +
    "<li>Akkumulyator kuchlanishi pasaymoqda, element esa yonmayapti — shoshilinch.</li>" +
    "<li>Ishlagan soatlar servis muddatiga yaqinlashdi — rejali servis vazifasi.</li></ul>" +
    "<p class='ogoh'>Registrlar xaritasi dasturiy ta'minot versiyasiga bog'liq. Yetkazuvchidan aynan yetkaziladigan versiyaning xaritasi hujjat bilan talab qilinadi; boshqa versiyaning xaritasi bilan adapter noto'g'ri qiymat o'qiydi va bu darhol bilinmaydi.</p>",
  manba: [["EFOY Pro qo'llanmasi, Modbus RTU", "https://www.manualslib.com/manual/1496312/Efoy-Pro-800-Pro-800-Duo-Pro-2400-Pro-2400-Duo.html?page=81"]],
  ru: {yorliq: "Для тимлида", sarlavha: "Телеметрия по Modbus",
    tana: "<p>У EFOY Pro есть порт данных RS-232, и удалённый мониторинг работает через него по протоколу Modbus RTU или SIO. IP-интерфейса нет, поэтому в схему добавляется одно устройство.</p>" +
      "<h4>Подключение</h4>" +
      "<ol><li>Порт RS-232 подключается к шлюзу RS-232 → Ethernet: Modbus RTU превращается в Modbus TCP.</li>" +
      "<li>Адаптер опрашивает каждые 60 секунд: напряжение аккумулятора, состояние работы, остаток топлива в картридже, код ошибки и моточасы.</li>" +
      "<li>Результат публикуется в формате МКБ: <code>mkb/v1/{obyekt}/{device_id}/quvvat</code>.</li></ol>" +
      "<h4>Правила</h4>" +
      "<ul><li>Топливо ниже 30% — заказ картриджа. Порог именно 30, а не 20 процентов: импорт и перевозка по ADR занимают до трёх недель.</li>" +
      "<li>Код ошибки — сервисная задача и уведомление дистрибьютору.</li>" +
      "<li>Напряжение аккумулятора падает, а элемент не запускается — срочно.</li>" +
      "<li>Моточасы подошли к сервисному интервалу — плановая сервисная задача.</li></ul>" +
      "<p class='ogoh'>Карта регистров привязана к версии программного обеспечения. У поставщика документально запрашивается карта именно поставляемой версии; с картой другой версии адаптер читает неверные значения, и обнаруживается это не сразу.</p>"}
},

"y08.video": {
  yorliq: "Jamoa rahbarlari uchun", sarlavha: "Video, PTZ va joyida yozuv",
  tana: "<p>Bu yechimda quvvat yetarli, shuning uchun video qismi to'liq: doimiy yozuv, PTZ boshqaruvi va kamera analitikasi.</p>" +
    "<ul><li><b>ONVIF Profile S</b> — video oqimi. <b>Profile T</b> — analitika va metama'lumot: chiziq kesish, hudud, obyekt turi.</li>" +
    "<li><b>ONVIF PTZ</b> — burish va presetlar. Operator 4–6 ta preset bilan ishlaydi, har biri muhim nuqtaga qaratilgan.</li>" +
    "<li><b>NVR SSD bilan</b> — aloqa uzilsa ham yozuv joyida qoladi va tiklangach platforma uni oladi.</li></ul>" +
    "<h4>Analitika kamerada hisoblanadi</h4>" +
    "<p>Chiziq kesish va hudud hodisalari serverda emas, kameraning o'zida aniqlanadi. Bu ikki sababdan muhim: trafik tejaladi va aloqa uzilganda ham hodisa yozib qo'yiladi. Serverda faqat natija qabul qilinadi va yagona hodisa sxemasiga keltiriladi.</p>" +
    "<h4>Trafik</h4>" +
    "<p>Doimiy oqim bu yerda ham yoqilmaydi. Asos — hodisa, kadr va talab bo'yicha klip. Jonli oqim operator ochganda ishlaydi va u qo'shimcha oqimdan olinadi: 1–2 Mbit/s.</p>",
  manba: [],
  ru: {yorliq: "Для тимлида", sarlavha: "Видео, PTZ и локальная запись",
    tana: "<p>В этом решении мощности достаточно, поэтому видеочасть полная: постоянная запись, управление PTZ и аналитика камеры.</p>" +
      "<ul><li><b>ONVIF Profile S</b> — видеопоток. <b>Profile T</b> — аналитика и метаданные: пересечение линии, зона, тип объекта.</li>" +
      "<li><b>ONVIF PTZ</b> — повороты и пресеты. Оператор работает с 4–6 пресетами, каждый направлен на значимую точку.</li>" +
      "<li><b>NVR с SSD</b> — при обрыве связи запись остаётся на месте, а после восстановления платформа её забирает.</li></ul>" +
      "<h4>Аналитика считается в камере</h4>" +
      "<p>Пересечение линии и зональные события определяются не на сервере, а в самой камере. Это важно по двум причинам: экономится трафик и событие фиксируется даже при обрыве связи. На сервере принимается только результат и приводится к единой схеме события.</p>" +
      "<h4>Трафик</h4>" +
      "<p>Постоянный поток и здесь не включается. Основа — событие, кадр и клип по запросу. Живой поток работает, когда его открывает оператор, и берётся из дополнительного потока: 1–2 Мбит/с.</p>"}
},

"y08.tarmoq": {
  yorliq: "Jamoa rahbarlari uchun", sarlavha: "Chekkadagi obyektda tarmoq",
  tana: "<p>Bu yechim tanlanadigan obyektlar odatda chekkada joylashadi va u yerda 4G signali kuchsiz bo'ladi. Tarmoq qismi shuning uchun alohida ishlanadi.</p>" +
    "<ul><li><b>Ko'rikda o'lchov.</b> Ikkala operator uchun RSRP va SINR o'lchanadi va dalolatnomaga yoziladi. −115 dBm dan yomon bo'lsa, tashqi yo'naltirilgan antenna rejalashtiriladi.</li>" +
    "<li><b>Tashqi antenna.</b> Machtaga chiqariladi va eng yaqin baza stansiyasiga yo'naltiriladi. Bu 10–15 dB beradi va ko'pincha masalani hal qiladi.</li>" +
    "<li><b>Ikki SIM.</b> Chekkada bitta operator qamrovi bo'lmasligi mumkin, shuning uchun ikkinchisi majburiy.</li>" +
    "<li><b>Watchdog.</b> Joyga borib router yoqadigan odam yo'q.</li>" +
    "<li><b>VPN.</b> Modbus va NVR portlari internetga chiqmaydi va faqat tunnel ichida ochiladi. Standart sozlamada Modbus autentifikatsiyasiz ishlaydi.</li></ul>" +
    "<p class='ogoh'>Aloqa umuman bo'lmasa, bu yechim ham ishlamaydi: quvvat bor, lekin ma'lumot chiqmaydi. Bunday obyektda joyida yozuv qoladi va u faqat ko'rikda olinadi — nazorat emas, hujjat bo'ladi.</p>",
  manba: [],
  ru: {yorliq: "Для тимлида", sarlavha: "Сеть на удалённом объекте",
    tana: "<p>Объекты, для которых выбирают это решение, обычно расположены на отшибе, и сигнал 4G там слабый. Поэтому сетевая часть прорабатывается отдельно.</p>" +
      "<ul><li><b>Замер на осмотре.</b> По обоим операторам замеряются RSRP и SINR и вносятся в акт. Если хуже −115 dBm, планируется внешняя направленная антенна.</li>" +
      "<li><b>Внешняя антенна.</b> Выносится на мачту и наводится на ближайшую базовую станцию. Это даёт 10–15 дБ и чаще всего снимает вопрос.</li>" +
      "<li><b>Две SIM.</b> На отшибе покрытия одного оператора может не быть вовсе, поэтому второй обязателен.</li>" +
      "<li><b>Watchdog.</b> Приехать и перезагрузить маршрутизатор некому.</li>" +
      "<li><b>VPN.</b> Порты Modbus и NVR не выходят в интернет и открываются только внутри туннеля. В заводской конфигурации Modbus работает без аутентификации.</li></ul>" +
      "<p class='ogoh'>Если связи нет вовсе, не работает и это решение: питание есть, а данные не уходят. На таком объекте остаётся локальная запись, которую забирают только при осмотре, — это уже не контроль, а документирование.</p>"}
},

"y08.qoida": {
  yorliq: "Jamoa rahbarlari uchun", sarlavha: "Adapter qoidalari va ularning muddatlari",
  tana: "<p>Telemetriya o'z-o'zidan foyda bermaydi: uni harakatga aylantiradigan qoidalar kerak. Bu yechimda ular yetkazish muddatiga moslab yoziladi.</p>" +
    "<table><tr><th>Shart</th><th>Nima bo'ladi</th><th>Muddat</th></tr>" +
    "<tr><td>Yoqilg'i &lt; 30%</td><td>Kartrij buyurtmasi</td><td class='n'>3 ish kuni</td></tr>" +
    "<tr><td>Yoqilg'i &lt; 10%</td><td>Shoshilinch, bo'lim boshlig'iga</td><td class='n'>24 soat</td></tr>" +
    "<tr><td>Xato kodi</td><td>Servis vazifasi, distribyutorga</td><td class='n'>48 soat</td></tr>" +
    "<tr><td>Kuchlanish tushmoqda, element yonmayapti</td><td>Shoshilinch chiqish</td><td class='n'>24 soat</td></tr>" +
    "<tr><td>Ishlagan soat servis chegarasida</td><td>Rejali servis</td><td class='n'>30 kun</td></tr></table>" +
    "<h4>Nega chegara 30 foiz</h4>" +
    "<p>Kartrij import qilinadi va ADR tashuvchisi bilan keltiriladi. Buyurtmadan obyektga yetgunicha uch haftagacha vaqt ketadi. 30 foiz 30 vattlik yukda taxminan 13 kunga teng — bu yetkazish muddatini qoplaydi va zaxira qoldiradi. 20 foizda buyurtma berilsa, obyekt yetkazishni kutib jim qolishi mumkin.</p>" +
    "<p class='ogoh'>Har qoidaning muddati shartnomadagi yetkazish muddati bilan solishtiriladi. Yetkazuvchi almashsa, qoidalar ham qayta hisoblanadi.</p>",
  manba: [],
  ru: {yorliq: "Для тимлида", sarlavha: "Правила адаптера и их сроки",
    tana: "<p>Телеметрия сама по себе пользы не приносит: нужны правила, превращающие её в действие. В этом решении они пишутся под срок поставки.</p>" +
      "<table><tr><th>Условие</th><th>Что происходит</th><th>Срок</th></tr>" +
      "<tr><td>Топливо &lt; 30%</td><td>Заказ картриджа</td><td class='n'>3 рабочих дня</td></tr>" +
      "<tr><td>Топливо &lt; 10%</td><td>Срочно, руководителю отдела</td><td class='n'>24 часа</td></tr>" +
      "<tr><td>Код ошибки</td><td>Сервисная задача, дистрибьютору</td><td class='n'>48 часов</td></tr>" +
      "<tr><td>Напряжение падает, элемент не запускается</td><td>Срочный выезд</td><td class='n'>24 часа</td></tr>" +
      "<tr><td>Моточасы у сервисного порога</td><td>Плановый сервис</td><td class='n'>30 суток</td></tr></table>" +
      "<h4>Почему порог 30 процентов</h4>" +
      "<p>Картридж ввозится и доставляется перевозчиком с допуском ADR. От заказа до объекта проходит до трёх недель. 30% при нагрузке 30 Вт — это примерно 13 суток, чего хватает на срок поставки и остаётся запас. Если заказывать на 20%, объект может замолчать в ожидании доставки.</p>" +
      "<p class='ogoh'>Срок каждого правила сверяется со сроком поставки по договору. При смене поставщика правила пересчитываются.</p>"}
},

"y08.operator": {
  yorliq: "Rahbariyat uchun", sarlavha: "Obyekt kartochkasidagi yoqilg'i ustuni",
  tana: "<p>Bu yechimda operator uchun asosiy savol bitta: kartrij necha kunga yetadi va buyurtma berilganmi. Qolgan hamma narsa odatiy video nazorat.</p>" +
    "<h4>Kartochkada nima turadi</h4>" +
    "<ul><li>Kartrijdagi yoqilg'i foizda va qolgan kun sonida. Kun soni oxirgi yetti kunlik haqiqiy sarf bo'yicha hisoblanadi, katalog raqami bilan emas.</li>" +
    "<li>Element holati: ishlayapti, kutmoqda, xato. Xato bo'lsa — kodi bilan.</li>" +
    "<li>Ishlagan soatlar va keyingi servisgacha qolgan soat.</li>" +
    "<li>Akkumulyator kuchlanishi va zaryadi.</li>" +
    "<li>Oxirgi buyurtma sanasi va kutilayotgan yetkazish sanasi.</li></ul>" +
    "<h4>Nima qilib bo'lmaydi</h4>" +
    "<p>Elementni masofadan yoqish yoki o'chirish. U akkumulyator kuchlanishi bo'yicha o'zi qaror qiladi va bu mantiqqa aralashish qurilmani buzadi. Kartrij almashtirish ham faqat joyida, qo'lda bajariladi.</p>" +
    "<p class='ogoh'>Yoqilg'i qoldig'i kunlarda ko'rsatilgani muhim: foiz o'zi hech narsa aytmaydi, chunki sarf yukka bog'liq va yozda kuzdagidan ikki barobar sekin bo'ladi.</p>",
  manba: [],
  ru: {yorliq: "Для правления", sarlavha: "Колонка топлива в карточке объекта",
    tana: "<p>В этом решении у оператора один основной вопрос: на сколько суток хватит картриджа и сделан ли заказ. Всё остальное — обычное видеонаблюдение.</p>" +
      "<h4>Что в карточке</h4>" +
      "<ul><li>Топливо в картридже в процентах и в оставшихся сутках. Число суток считается по фактическому расходу за последние семь дней, а не по каталожной цифре.</li>" +
      "<li>Состояние элемента: работает, ожидает, ошибка. При ошибке — с её кодом.</li>" +
      "<li>Моточасы и остаток до следующего сервиса.</li>" +
      "<li>Напряжение и заряд аккумулятора.</li>" +
      "<li>Дата последнего заказа и ожидаемая дата поставки.</li></ul>" +
      "<h4>Чего сделать нельзя</h4>" +
      "<p>Включить или выключить элемент удалённо. Он принимает решение сам по напряжению аккумулятора, и вмешательство в эту логику выводит аппарат из строя. Замена картриджа также выполняется только на месте, вручную.</p>" +
      "<p class='ogoh'>Важно, что остаток топлива показан в сутках: сам по себе процент ничего не говорит, поскольку расход зависит от нагрузки и летом идёт вдвое медленнее, чем осенью.</p>"}
},

"y08.montaj": {
  yorliq: "Montajchi uchun", sarlavha: "Ikki brigada, bir kun",
  tana: "<p>Montajda ikkita mas'uliyat chegarasi bor va ular aralashmasligi kerak: shkaf, kabel va kamera integratorda, elementning o'zi distribyutorda.</p>" +
    "<table><tr><th>Ish</th><th>Kim</th><th>Nima bilan yopiladi</th></tr>" +
    "<tr><td class='b'>Shkaf, egzoz, havo kirishi</td><td>Integrator</td><td>Yashirin ishlar dalolatnomasi</td></tr>" +
    "<tr><td class='b'>Kamera, NVR, router, kabel</td><td>Integrator</td><td>Sinov hodisasi va kadr</td></tr>" +
    "<tr><td class='b'>Elementni ishga tushirish</td><td>Distribyutor</td><td>Kafolat ochiladigan dalolatnoma</td></tr>" +
    "<tr><td class='b'>Telemetriya sinovi</td><td>Jamoa rahbari masofadan</td><td>Platformada barcha registrlar</td></tr></table>" +
    "<h4>Dalolatnomaga yoziladigan ikkita raqam</h4>" +
    "<ol><li>Ishlagan soatlar hisoblagichining boshlang'ich qiymati — servis muddati shundan hisoblanadi.</li>" +
    "<li>Registrlar xaritasining versiyasi — adapterning to'g'ri ishlashi shunga bog'liq.</li></ol>" +
    "<p>Ikkalasi ham keyinchalik qurilmadan o'qib bo'lmaydi va ularsiz servis masalasi bahsga aylanadi.</p>" +
    "<p class='ogoh'>Birinchi haftada haqiqiy iste'mol o'lchanadi. Loyihadagi hisob bilan joydagi o'lchov o'rtasidagi farq odatda 10–20 foiz bo'ladi va kartrij jadvali shunga qarab tuzatiladi.</p>",
  manba: [],
  ru: {yorliq: "Для монтажника", sarlavha: "Две бригады, один день",
    tana: "<p>В монтаже есть две границы ответственности, и смешивать их нельзя: шкаф, кабель и камеры — за интегратором, сам элемент — за дистрибьютором.</p>" +
      "<table><tr><th>Работа</th><th>Кто</th><th>Чем закрывается</th></tr>" +
      "<tr><td class='b'>Шкаф, выхлоп, приток воздуха</td><td>Интегратор</td><td>Акт скрытых работ</td></tr>" +
      "<tr><td class='b'>Камеры, NVR, маршрутизатор, кабель</td><td>Интегратор</td><td>Тестовое событие и кадр</td></tr>" +
      "<tr><td class='b'>Пуск элемента</td><td>Дистрибьютор</td><td>Акт, открывающий гарантию</td></tr>" +
      "<tr><td class='b'>Проверка телеметрии</td><td>Тимлид удалённо</td><td>Все регистры на платформе</td></tr></table>" +
      "<h4>Две цифры, которые вносятся в акт</h4>" +
      "<ol><li>Начальное значение счётчика моточасов — от него отсчитывается сервисный интервал.</li>" +
      "<li>Версия карты регистров — от неё зависит корректная работа адаптера.</li></ol>" +
      "<p>Ни ту, ни другую впоследствии из аппарата не прочитать, а без них вопрос обслуживания превращается в спор.</p>" +
      "<p class='ogoh'>В первую неделю замеряется фактическое потребление. Расхождение проектного расчёта с замером на месте обычно составляет 10–20%, и график картриджей корректируется по нему.</p>"}
},

"y08.huquq": {
  yorliq: "Moliya va huquq", sarlavha: "Metanol: shartnomaga yoziladigan bandlar",
  tana: "<p>Metanol UN 1230 raqamli xavfli yuk: 3-sinf yonuvchan suyuqlik, qo'shimcha xavfi zaharli. EFOY kartrijlari dengiz, avtomobil va havo yo'li bilan tashish uchun tasdiqqa ega, lekin bu bankni saqlash qoidalaridan ozod qilmaydi.</p>" +
    "<h4>Shartnomada aniq yoziladi</h4>" +
    "<ol><li>Kartrijni obyektga yetkazuvchi o'zi olib boradi va o'zi ulaydi. Yo'lda va almashtirishda javobgarlik yetkazuvchida.</li>" +
    "<li>Tashishni ADR ruxsati bor tashuvchi bajaradi; ruxsat nusxasi shartnomaga ilova qilinadi.</li>" +
    "<li>Bo'sh kartrij yetkazuvchiga qaytariladi va bu xizmat narxga kiritiladi.</li>" +
    "<li>Xavfsizlik ma'lumotlari varaqasi rus yoki o'zbek tilida beriladi.</li>" +
    "<li>Yetkazish muddati va uning buzilishi uchun javobgarlik raqam bilan yoziladi.</li></ol>" +
    "<h4>Obyektdagi tartib</h4>" +
    "<ul><li>Bank omborida zaxira saqlanmaydi yoki alohida shamollatiladigan joyda, cheklangan miqdorda saqlanadi.</li>" +
    "<li>Yong'in xavfsizligi talablari VMQ-649 qoidalari bo'yicha aniqlanadi.</li>" +
    "<li>Kartrij bo'limi qulflanadi, ogohlantirish belgisi qo'yiladi, ochilish datchigi platformaga ulanadi.</li></ul>" +
    "<p class='ogoh'>Metanol ichilsa o'limga olib keladi. Bank yuristi va yong'in xavfsizligi mas'uli shartnomani imzolashdan oldin ko'rib chiqadi — bu texnik emas, javobgarlik masalasi.</p>",
  manba: [["EFOY kartrijlari", "https://www.efoy-pro.com/en/efoy/fuel-cartridges/"]],
  ru: {yorliq: "Финансы и право", sarlavha: "Метанол: пункты, вносимые в договор",
    tana: "<p>Метанол — опасный груз UN 1230: легковоспламеняющаяся жидкость класса 3 с дополнительной опасностью «токсично». Картриджи EFOY имеют допуск к перевозке морским, автомобильным и воздушным транспортом, но это не освобождает банк от правил хранения.</p>" +
      "<h4>Что прямо вносится в договор</h4>" +
      "<ol><li>Картридж на объект привозит и подключает сам поставщик. Ответственность в пути и при замене — на поставщике.</li>" +
      "<li>Перевозку выполняет перевозчик с допуском ADR; копия допуска прикладывается к договору.</li>" +
      "<li>Пустой картридж возвращается поставщику, и эта услуга включается в цену.</li>" +
      "<li>Паспорт безопасности предоставляется на русском или узбекском языке.</li>" +
      "<li>Срок поставки и ответственность за его нарушение прописываются цифрами.</li></ol>" +
      "<h4>Порядок на объекте</h4>" +
      "<ul><li>Запас на складе банка не хранится либо хранится в отдельном проветриваемом помещении и в ограниченном количестве.</li>" +
      "<li>Требования пожарной безопасности определяются по правилам ВМQ-649.</li>" +
      "<li>Отсек картриджа запирается, вывешивается предупреждающий знак, датчик вскрытия подключается к платформе.</li></ul>" +
      "<p class='ogoh'>Приём метанола внутрь смертелен. Юрист банка и ответственный за пожарную безопасность рассматривают договор до подписания — это вопрос не техники, а ответственности.</p>"}
},

"y08.qachon": {
  yorliq: "Rahbariyat uchun", sarlavha: "To'rt shart bir vaqtda bajarilishi kerak",
  tana: "<p>Bu yechim boshqa variantlar ishlamaganda tanlanadi. Qaror ketma-ket to'rtta savolga javob berish bilan qabul qilinadi va bittasiga «yo'q» degan javob butun variantni yopadi.</p>" +
    "<ol><li><b>Obyektni elektrga qayta ulab bo'ladimi?</b> Qayta ulash texnik sharti 39 600 so'm va uch ish kuni turadi. Bu har doim birinchi tekshiriladi va ko'p holatda shu yerda to'xtaydi.</li>" +
    "<li><b>Quyosh paneliga joy bormi?</b> Soya, tog' oralig'i, tom holati yoki ruxsat masalasi. Panel qo'yilsa, 04-yechim o'n barobar arzon.</li>" +
    "<li><b>Obyekt shunchalik uzoqdami?</b> Servis qatnovi qimmat bo'lsa, oylab ishlaydigan manba mantiqqa keladi.</li>" +
    "<li><b>Aktiv qiymati yuqorimi?</b> Nazorat xarajati yo'qotish xatari bilan solishtiriladi.</li></ol>" +
    "<h4>Balansdan misol</h4>" +
    "<p>Chekkadagi ishlab chiqarish sexi yoki uzoq chorvachilik fermasi, ichida qimmat uskuna qolgan. Ma'muriy bino, xonadon va do'kon uchun bu yechim ortiqcha.</p>" +
    "<p class='ogoh'>Pilotda bu yechim bitta obyektda sinaladi. Uning maqsadi narxni tekshirish emas: haqiqiy yoqilg'i sarfi, qishki ish tartibi va yetkazish muddati o'lchanadi. Uchtasi ham hujjatdagi raqamdan farq qiladi.</p>",
  manba: [],
  ru: {yorliq: "Для правления", sarlavha: "Четыре условия должны выполняться одновременно",
    tana: "<p>Это решение выбирают, когда не сработали остальные. Решение принимается последовательными ответами на четыре вопроса, и «нет» на любом из них закрывает весь вариант.</p>" +
      "<ol><li><b>Можно ли вернуть объекту электроснабжение?</b> Технические условия на повторное подключение стоят 39 600 сумов и три рабочих дня. Это проверяется первым и в большинстве случаев на этом всё и заканчивается.</li>" +
      "<li><b>Есть ли место под солнечную панель?</b> Тень, ущелье, состояние кровли или вопрос разрешения. Если панель ставится, решение 04 дешевле в десять раз.</li>" +
      "<li><b>Насколько объект удалён?</b> Если выезд на обслуживание дорог, источник, работающий месяцами, становится оправданным.</li>" +
      "<li><b>Высока ли стоимость актива?</b> Затраты на контроль сопоставляются с риском утраты.</li></ol>" +
      "<h4>Пример с баланса</h4>" +
      "<p>Удалённый производственный цех или отдалённая животноводческая ферма с оставшимся внутри дорогим оборудованием. Для административного здания, квартиры и магазина это решение избыточно.</p>" +
      "<p class='ogoh'>В пилоте решение испытывается на одном объекте. Его цель не в проверке цены: измеряются фактический расход топлива, зимний режим работы и срок поставки. Все три отличаются от цифр в документации.</p>"}
},

"y08.narx": {
  yorliq: "Moliya va huquq", sarlavha: "Narx qanday yig'iladi",
  tana: "<p>Hisob ochiq narxlar bo'yicha, yevro kursi taxminan 13 600 so'm.</p>" +
    "<table><tr><th>Qator</th><th>mln so'm</th></tr>" +
    "<tr><td>EFOY Pro 2800, Yevropa chakana narxi ≈ 9 800 yevro</td><td class='n'>≈133</td></tr>" +
    "<tr><td>Ulgurji mo'ljal: 180 dona buyurtmada ≈ 5 600 yevro dona</td><td class='n'>≈76</td></tr>" +
    "<tr><td>Import QQS 12% va bojxona rasmiylashtiruvi</td><td class='n'>+9–16</td></tr>" +
    "<tr><td>Akkumulyator, shkaf, kameralar, NVR, router</td><td class='n'>12–25</td></tr>" +
    "<tr class='jami'><td>Bir obyektga</td><td class='n'>80–170</td></tr></table>" +
    "<h4>Narxni nima belgilaydi</h4>" +
    "<ul><li><b>Model.</b> Pro 900 sezilarli arzon, lekin uning rasmiy chakana narxi e'lon qilinmagan — tijorat taklifi so'raladi.</li>" +
    "<li><b>Partiya hajmi.</b> Bir dona xarid bilan yuzta xarid orasidagi farq 40 foizgacha yetadi.</li>" +
    "<li><b>Kartrijlar soni.</b> To'rtta M28 va Fuel Manager qatnovlarni ikki barobar kamaytiradi, lekin boshlang'ich smetaga 16 mln so'm qo'shadi.</li>" +
    "<li><b>Yoqilg'i.</b> Jadvalga kirmaydi va bu eng katta yillik xarajat.</li></ul>" +
    "<p class='ogoh'>Taqqoslash xarid narxi bo'yicha emas, besh yillik to'liq egalik qiymati bo'yicha qilinadi. Faqat element bilan ishlaganda yoqilg'i besh yilda jihoz narxidan oshib ketadi.</p>",
  manba: [["Seashop: EFOY Pro 2800", "https://www.seashop.com/en/efoy-pro-2800-fuel-cell"],
          ["SFC Energy: 180 dona buyurtma", "https://www.sfc.com/news/sfc-energy-receives-another-order-from-linc-polska-of-180-efoy-pro-2800-fuel-cells-worth-more-than-eur-1-million/"]],
  ru: {yorliq: "Финансы и право", sarlavha: "Как складывается стоимость",
    tana: "<p>Расчёт по открытым ценам, курс евро принят около 13 600 сумов.</p>" +
      "<table><tr><th>Статья</th><th>млн сумов</th></tr>" +
      "<tr><td>EFOY Pro 2800, розничная цена в Европе ≈ 9 800 евро</td><td class='n'>≈133</td></tr>" +
      "<tr><td>Оптовый ориентир: при заказе 180 шт. ≈ 5 600 евро за штуку</td><td class='n'>≈76</td></tr>" +
      "<tr><td>Импортный НДС 12% и таможенное оформление</td><td class='n'>+9–16</td></tr>" +
      "<tr><td>Аккумулятор, шкаф, камеры, NVR, маршрутизатор</td><td class='n'>12–25</td></tr>" +
      "<tr class='jami'><td>На один объект</td><td class='n'>80–170</td></tr></table>" +
      "<h4>Что определяет цену</h4>" +
      "<ul><li><b>Модель.</b> Pro 900 заметно дешевле, но его официальная розничная цена не публикуется — запрашивается коммерческое предложение.</li>" +
      "<li><b>Объём партии.</b> Разница между покупкой одной штуки и сотни доходит до 40%.</li>" +
      "<li><b>Число картриджей.</b> Четыре M28 и Fuel Manager сокращают выезды вдвое, но добавляют к начальной смете 16 млн сумов.</li>" +
      "<li><b>Топливо.</b> В таблицу не входит и составляет самый крупный годовой расход.</li></ul>" +
      "<p class='ogoh'>Сравнение ведётся не по цене закупки, а по полной стоимости владения за пять лет. При работе только от элемента топливо за пять лет превышает стоимость самого оборудования.</p>"}
},

"y08.servis": {
  yorliq: "Moliya va huquq", sarlavha: "Besh yillik xarajat va servis",
  tana: "<table><tr><th>Modda</th><th>Besh yilda</th></tr>" +
    "<tr><td>Metanol, faqat element bilan</td><td class='n'>≈170 mln so'm</td></tr>" +
    "<tr><td>Metanol, quyosh bilan gibrid</td><td class='n'>≈55 mln so'm</td></tr>" +
    "<tr><td>Havo filtri, yiliga 1–2 marta</td><td class='n'>0,5–1,0 mln so'm</td></tr>" +
    "<tr><td>SIM va trafik</td><td class='n'>3–6 mln so'm</td></tr>" +
    "<tr><td>LiFePO4 akkumulyator</td><td class='n'>0</td></tr></table>" +
    "<h4>Element servisi</h4>" +
    "<p>Ishlab chiqaruvchi belgilangan ish soatida servis to'plamini almashtirishni talab qiladi. Aniq soat va to'plam narxi tijorat taklifida hujjat bilan so'raladi — bu besh yillik hisobning ko'pincha unutiladigan qatori. Servisni distribyutor bajaradi: bu jihozni mahalliy usta ta'mirlamaydi.</p>" +
    "<h4>Qatnov</h4>" +
    "<p>Chekkadagi obyektga bir marta borish 300–600 ming so'mga tushadi. To'rtta kartrij va Fuel Manager bilan yiliga ikki qatnov yetadi; bitta kartrij bilan esa yiliga sakkiz-o'n marta borishga to'g'ri keladi va bu logistika yoqilg'i narxiga qo'shiladi.</p>" +
    "<p class='ogoh'>Bo'sh kartrijlarni qaytarish ham qatnov talab qiladi. Uni yetkazuvchi yangi partiya bilan birga olib ketadigan qilib shartnomaga yoziladi.</p>",
  manba: [],
  ru: {yorliq: "Финансы и право", sarlavha: "Расходы и сервис за пять лет",
    tana: "<table><tr><th>Статья</th><th>За пять лет</th></tr>" +
      "<tr><td>Метанол, только элемент</td><td class='n'>≈170 млн сумов</td></tr>" +
      "<tr><td>Метанол, гибрид с солнечной панелью</td><td class='n'>≈55 млн сумов</td></tr>" +
      "<tr><td>Воздушный фильтр, 1–2 раза в год</td><td class='n'>0,5–1,0 млн сумов</td></tr>" +
      "<tr><td>SIM и трафик</td><td class='n'>3–6 млн сумов</td></tr>" +
      "<tr><td>Аккумулятор LiFePO4</td><td class='n'>0</td></tr></table>" +
      "<h4>Сервис элемента</h4>" +
      "<p>Производитель требует замены сервисного комплекта по достижении заданной наработки. Точное число моточасов и стоимость комплекта запрашиваются документально в коммерческом предложении — это статья, о которой в пятилетнем расчёте чаще всего забывают. Сервис выполняет дистрибьютор: местный мастер этот аппарат не ремонтирует.</p>" +
      "<h4>Выезды</h4>" +
      "<p>Одна поездка на удалённый объект обходится в 300–600 тыс. сумов. С четырьмя картриджами и Fuel Manager достаточно двух выездов в год; с одним картриджем приходится ездить восемь-десять раз, и эта логистика прибавляется к стоимости топлива.</p>" +
      "<p class='ogoh'>Возврат пустых картриджей тоже требует выезда. В договоре это оформляется так, чтобы поставщик забирал их вместе с доставкой новой партии.</p>"}
},

"y08.n1": {
  yorliq: "Nosozlik", sarlavha: "Egzoz quvuri muzlab qoldi",
  tana: "<p>Belgisi: yanvar tunida element xato kodi bilan to'xtaydi, akkumulyator asta bo'shay boshlaydi. Yoqilg'i esa joyida — kartrij yarim to'la.</p>" +
    "<h4>Sababi</h4>" +
    "<p>Element chiqargan suv bug'i quvurda kondensatga aylanadi. Quvur gorizontal yotqizilgan yoki uchi yuqoriga qaragan bo'lsa, kondensat pastda yig'iladi va sovuqda muzlaydi. Chiqish yopilganda element o'zini himoya qilib o'chadi.</p>" +
    "<h4>Oldini olish</h4>" +
    "<ul><li>Quvur butun uzunligi bo'yicha tashqariga pastga qiyalik bilan yotqiziladi. Gorizontal uchastka qoldirilmaydi.</li>" +
    "<li>Uchi qiya kesiladi va yon tomonga, shamolga qarshi emas, qaratiladi.</li>" +
    "<li>Chiqish qor to'planadigan joyga, tomning quyi qismiga chiqarilmaydi.</li>" +
    "<li>Har servisda quvur ichi ko'zdan kechiriladi va tozalanadi.</li></ul>" +
    "<p class='ogoh'>Bu nosozlik faqat qishda va faqat noto'g'ri montajda yuz beradi. Uni montaj kunida bir marta to'g'ri qilib butunlay yopib qo'yish mumkin — lekin keyin tuzatish uchun yana bir marta chekkadagi obyektga borish kerak bo'ladi.</p>",
  manba: [],
  ru: {yorliq: "Отказ", sarlavha: "Замёрзла выхлопная труба",
    tana: "<p>Признак: январской ночью элемент останавливается с кодом ошибки, аккумулятор постепенно разряжается. Топливо при этом на месте — картридж наполовину полон.</p>" +
      "<h4>Причина</h4>" +
      "<p>Водяной пар, выделяемый элементом, превращается в трубе в конденсат. Если труба уложена горизонтально или её срез направлен вверх, конденсат скапливается внизу и на морозе замерзает. При перекрытии выхода элемент выключается, защищая себя.</p>" +
      "<h4>Профилактика</h4>" +
      "<ul><li>Труба укладывается наружу с уклоном вниз по всей длине. Горизонтальных участков не оставляют.</li>" +
      "<li>Срез делается косым и направляется вбок, а не навстречу ветру.</li>" +
      "<li>Выход не выводится туда, где скапливается снег, и не в нижнюю часть кровли.</li>" +
      "<li>На каждом сервисе труба осматривается изнутри и прочищается.</li></ul>" +
      "<p class='ogoh'>Этот отказ случается только зимой и только при неправильном монтаже. Его можно закрыть навсегда, один раз сделав правильно в день монтажа, — иначе для исправления придётся ещё раз ехать на удалённый объект.</p>"}
},

"y08.n2": {
  yorliq: "Nosozlik", sarlavha: "Kartrij vaqtida yetib kelmadi",
  tana: "<p>Belgisi: yoqilg'i tugadi, element to'xtadi, akkumulyator ikki kunda bo'shadi va obyekt nazoratdan chiqdi. Texnik nosozlik yo'q.</p>" +
    "<h4>Sababi</h4>" +
    "<p>Kartrij import qilinadi va ADR ruxsati bor tashuvchi bilan keltiriladi. Buyurtmadan obyektga yetgunicha uch haftagacha vaqt ketadi. Agar buyurtma 20 foizda berilgan bo'lsa, 30 vattlik yukda bu atigi to'qqiz kun — yetkazish muddatidan kam.</p>" +
    "<h4>Oldini olish</h4>" +
    "<ul><li>Buyurtma vazifasi 30 foizda ochiladi. Bu 30 vattlik yukda taxminan 13 kun va u yetkazishni qoplaydi.</li>" +
    "<li>Shartnomaga yetkazish muddati va uning buzilishi uchun javobgarlik raqam bilan yoziladi.</li>" +
    "<li>Fuel Manager bilan to'rtta kartrij ulanadi: zaxira obyektning o'zida turadi va buyurtma kechikishi xatarli bo'lmaydi.</li>" +
    "<li>Yetkazuvchi almashsa, qoidalar muddati qayta hisoblanadi.</li></ul>" +
    "<p class='ogoh'>Bu nosozlik logistikada, texnikada emas. Shuning uchun uni yetkazuvchi tanlash bosqichida yopish kerak: yetkazish muddati aniq bo'lmagan taklif qabul qilinmaydi.</p>",
  manba: [],
  ru: {yorliq: "Отказ", sarlavha: "Картридж не пришёл вовремя",
    tana: "<p>Признак: топливо закончилось, элемент остановился, аккумулятор разрядился за двое суток, объект вышел из-под контроля. Технической неисправности нет.</p>" +
      "<h4>Причина</h4>" +
      "<p>Картридж ввозится и доставляется перевозчиком с допуском ADR. От заказа до объекта проходит до трёх недель. Если заказ сделан на отметке 20%, при нагрузке 30 Вт это всего девять суток — меньше срока поставки.</p>" +
      "<h4>Профилактика</h4>" +
      "<ul><li>Задача на заказ открывается на 30%. При нагрузке 30 Вт это около 13 суток, чего хватает на доставку.</li>" +
      "<li>Срок поставки и ответственность за его нарушение прописываются в договоре цифрами.</li>" +
      "<li>Через Fuel Manager подключаются четыре картриджа: запас стоит на самом объекте, и задержка заказа перестаёт быть критичной.</li>" +
      "<li>При смене поставщика сроки правил пересчитываются.</li></ul>" +
      "<p class='ogoh'>Этот отказ лежит в логистике, а не в технике. Поэтому закрывать его нужно на этапе выбора поставщика: предложение без явного срока поставки не принимается.</p>"}
},

"y08.n3": {
  yorliq: "Nosozlik", sarlavha: "Kartrij bo'limi ochildi",
  tana: "<p>Belgisi: tunda kartrij bo'limining ochilish datchigi ishlaydi, kamera esa hech kimni ko'rmaydi yoki aksincha — kadrda odam bor.</p>" +
    "<h4>Nega bu alohida xatar</h4>" +
    "<p>Metanol suyuq yoqilg'i sifatida qiziqish uyg'otadi. U rangsiz va spirtga o'xshaydi, lekin ichilsa o'limga olib keladi. Bo'sh obyektda qulflanmagan kartrij bank uchun jihoz yo'qotishdan ham og'irroq masala — bu insoniy va huquqiy javobgarlik.</p>" +
    "<h4>Oldini olish</h4>" +
    "<ul><li>Kartrij element yonida emas, qulflangan alohida bo'limda turadi.</li>" +
    "<li>Bo'limda ochilish datchigi, unga kameralardan biri qaratilgan. Hodisa darhol operatorga chiqadi.</li>" +
    "<li>Bo'lim eshigida ogohlantirish belgisi va xavfsizlik ma'lumotlari varaqasi.</li>" +
    "<li>Zaxira kartrij obyektda emas, yetkazuvchida saqlanadi.</li>" +
    "<li>Obyekt hududiga ruxsatsiz kirish holatlari alohida hisobga olinadi va takrorlansa, obyekt uchun boshqa yechim ko'rib chiqiladi.</li></ul>" +
    "<p class='ogoh'>Agar obyektga muntazam begona odam kiradigan bo'lsa, bu yechim umuman tanlanmaydi. Metanol nazoratsiz joyda turmaydi.</p>",
  manba: [],
  ru: {yorliq: "Отказ", sarlavha: "Отсек картриджа вскрыт",
    tana: "<p>Признак: ночью срабатывает датчик вскрытия отсека картриджа, при этом камера никого не видит — или, наоборот, в кадре человек.</p>" +
      "<h4>Почему это отдельный риск</h4>" +
      "<p>Метанол вызывает интерес как жидкое топливо. Он бесцветен и похож на спирт, но приём внутрь смертелен. Незапертый картридж на пустом объекте — вопрос более тяжёлый, чем утрата оборудования: это человеческая и правовая ответственность.</p>" +
      "<h4>Профилактика</h4>" +
      "<ul><li>Картридж хранится не рядом с элементом, а в отдельном запираемом отсеке.</li>" +
      "<li>В отсеке датчик вскрытия, на него направлена одна из камер. Событие немедленно выходит оператору.</li>" +
      "<li>На дверце отсека — предупреждающий знак и паспорт безопасности.</li>" +
      "<li>Запасной картридж хранится не на объекте, а у поставщика.</li>" +
      "<li>Случаи несанкционированного доступа на территорию учитываются отдельно, и при повторении для объекта рассматривается другое решение.</li></ul>" +
      "<p class='ogoh'>Если на объект регулярно заходят посторонние, это решение не выбирается вовсе. Метанол не остаётся в бесконтрольном месте.</p>"}
}
});

/* ---- Yechim 08 sahifasining ruscha matni ---- */
window.MKB_LUGAT = Object.assign(window.MKB_LUGAT || {}, {
"Yechim 08": "Решение 08",
"Yoqilg'i hisobi": "Расчёт топлива",
"Metanol va huquq": "Метанол и право",
"Yechim 08 · Chekka va qimmat obyekt": "Решение 08 · Удалённый и дорогой объект",
"Quyoshga bog'liq bo'lmagan yagona avtonom manba": "Единственный автономный источник, не зависящий от солнца",
"Yoqilg'i elementi akkumulyatorni oylab zaryadlab turadi va dekabr bulutiga ham, qorli haftaga ham qaramaydi. Buning evaziga obyektda xavfli yuk paydo bo'ladi va yillik xarajat boshqa har qanday yechimdan o'n barobar katta chiqadi.":
 "Топливный элемент месяцами подзаряжает аккумулятор и не зависит ни от декабрьской облачности, ни от снежной недели. Платой за это становятся опасный груз на объекте и годовые расходы, вдесятеро превышающие любое другое решение.",
"maqsadli o'rtacha yuk": "целевая средняя нагрузка",
"bitta M28 kartrij": "один картридж M28",
"bir obyektga": "на один объект",
"yillik yoqilg'i, gibrid": "топливо в год, гибрид",
"Shkafda: yoqilg'i elementi, metanol kartriji, LiFePO4 akkumulyator, router va kommutator":
 "В шкафу: топливный элемент, картридж с метанолом, аккумулятор LiFePO4, маршрутизатор и коммутатор",
"Shkafda EFOY yoqilg'i elementi, LiFePO4 akkumulyator, router va kommutator":
 "Топливный элемент EFOY, аккумулятор LiFePO4, маршрутизатор и коммутатор в шкафу",

"Shkafda nima turadi": "Что стоит в шкафу",
"Yoqilg'i elementi quvvat manbai emas, zaryadlagich. U doimiy quvvat beradi va akkumulyatorni to'ldirib turadi; qurilmalar esa har doim akkumulyatordan oziqlanadi. Bu farqni tushunmaslik noto'g'ri model tanlashga olib keladi.":
 "Топливный элемент — не источник питания, а зарядное устройство. Он отдаёт постоянную мощность и подзаряжает аккумулятор; устройства же всегда питаются от аккумулятора. Непонимание этой разницы приводит к выбору не той модели.",
"EFOY Pro yoqilg'i elementi": "Топливный элемент EFOY Pro",
"Akkumulyator kuchlanishi tushganda o'zi yonadi va to'lganda o'chadi":
 "Запускается сам при падении напряжения аккумулятора и выключается при его заряде",
"Nominal quvvat o'rtacha yukdan kamida 1,5 barobar katta olinadi":
 "Номинальная мощность берётся минимум в 1,5 раза больше средней нагрузки",
"Pro 900 — 42 Vt, Pro 1800 — 82 Vt, Pro 2800 — 125 Vt": "Pro 900 — 42 Вт, Pro 1800 — 82 Вт, Pro 2800 — 125 Вт",
"Metanol kartriji M28": "Картридж с метанолом M28",
"Yoqilg'i zaxirasi": "Запас топлива",
"28 litr, 23,4 kg, 31,1 kVt·soat": "28 литров, 23,4 кг, 31,1 кВт·ч",
"Fuel Manager bilan 8 tagacha kartrij ulanadi": "Через Fuel Manager подключается до восьми картриджей",
"LiFePO4 akkumulyator": "Аккумулятор LiFePO4",
"Kunlik tebranishni va PTZ cho'qqilarini ko'taradi": "Принимает суточные колебания и пики PTZ",
"Past harorat himoyali BMS yoki isitgichli blok": "BMS с низкотемпературной защитой или блок с подогревом",
"Korporativ IP kamera va PTZ": "Корпоративная IP-камера и PTZ",
"Perimetr va kirish nazorati": "Контроль периметра и входа",
"ONVIF Profile S va T, tungi rejim": "ONVIF Profile S и T, ночной режим",
"NVR, SSD bilan": "NVR с SSD",
"Aloqa uzilsa ham yozuv joyida qoladi": "При обрыве связи запись остаётся на месте",
"Disk emas SSD: kam quvvat, sovuqqa chidamli": "SSD, а не жёсткий диск: меньше потребление, лучше на холоде",
"Izolyatsiyali shkaf va egzoz quvuri": "Утеплённый шкаф и выхлопная труба",
"Element issiqligini ushlab qoladi, suv bug'i va CO₂ ni tashqariga chiqaradi":
 "Удерживает тепло элемента, выводит наружу водяной пар и CO₂",
"Filtrli havo kirishi, pastga qiyalik bilan chiqish quvuri":
 "Приток воздуха через фильтр, выхлопная труба с уклоном вниз",
"Bu yechim ro'yxatdagi oxirgi variant. Undan oldin ikkita savol yopiladi: obyektni elektrga qayta ulash mumkinmi (texnik shart 39 600 so'm va uch ish kuni) va quyosh paneliga joy topiladimi.":
 "Это последний вариант в перечне. До него закрываются два вопроса: можно ли вернуть объекту электроснабжение (технические условия — 39 600 сумов и три рабочих дня) и найдётся ли место под солнечную панель.",

"Qishki sutka: chekkadagi sex, −15 °C": "Зимние сутки: удалённый цех, −15 °C",
"Element sutkada bir necha marta yonadi va o'chadi. Uning ishlash mantig'i quyosh panelidan butunlay boshqacha: bu yerda energiya jadval bo'yicha emas, akkumulyator kuchlanishi bo'yicha ishlab chiqariladi.":
 "За сутки элемент включается и выключается несколько раз. Логика его работы совершенно иная, чем у солнечной панели: энергия вырабатывается не по расписанию, а по напряжению аккумулятора.",
"tun": "ночь", "sovuq": "холод", "hodisa": "событие", "telemetriya": "телеметрия", "kunduz": "день", "yakun": "итог",
"Element o'zi yonadi": "Элемент запускается сам",
"Akkumulyator kuchlanishi belgilangan quyi chegaraga tushadi va element ishga tushadi. Sovuqda ishga tushish bir necha daqiqa oladi: avval ichki kontur isiydi. Shundan keyin u nominal quvvatda ishlay boshlaydi va akkumulyatorni to'ldiradi.":
 "Напряжение аккумулятора опускается до заданного нижнего порога, и элемент запускается. На морозе пуск занимает несколько минут: сначала прогревается внутренний контур. После этого элемент выходит на номинальную мощность и подзаряжает аккумулятор.",
"Shu sikl: taxminan 0,9 litr metanol har kVt·soatga": "Этот цикл: около 0,9 литра метанола на каждый кВт·ч",
"Muzlashdan himoya yoqiladi": "Включается защита от замерзания",
"Tashqarida −15 °C. Element ichida suv bor, shuning uchun u muzlashdan himoya rejimiga o'tadi va o'zini isitish uchun yoqilg'i sarflaydi. Bu rejim akkumulyatorni zaryadlamaydi — u faqat qurilmaning o'zini saqlaydi. Yillik yoqilg'i hisobiga shu sarf ham qo'shiladi va u ko'pincha e'tibordan chetda qoladi.":
 "На улице −15 °C. Внутри элемента есть вода, поэтому он переходит в режим защиты от замерзания и тратит топливо на собственный обогрев. Этот режим не заряжает аккумулятор — он лишь сохраняет сам аппарат. В годовой расчёт топлива этот расход тоже входит, и о нём чаще всего забывают.",
"PTZ chegarani kesib o'tgan odamga buriladi": "PTZ разворачивается на человека, пересёкшего линию",
"Kamera analitikasi chiziq kesilganini aniqlaydi, PTZ presetga buriladi va 25 vattlik cho'qqi paydo bo'ladi. Elementning nominal quvvati bunga yetmaydi va yetishi ham shart emas: cho'qqini akkumulyator ko'taradi. Element esa keyinroq, o'z tartibida uni qaytadan to'ldiradi.":
 "Аналитика камеры фиксирует пересечение линии, PTZ разворачивается на пресет, и возникает пик в 25 Вт. Номинальной мощности элемента на это не хватает, да и не должно хватать: пик принимает аккумулятор. А элемент восполнит его позже, в своём порядке.",
"Cho'qqi 25 Vt · davomiyligi 40 soniya": "Пик 25 Вт · длительность 40 секунд",
"Adapter kartrijdagi yoqilg'ini o'qiydi": "Адаптер считывает остаток топлива в картридже",
"Har 60 soniyada RS-232 porti orqali Modbus so'rovi ketadi: akkumulyator kuchlanishi, ish holati, kartrijdagi yoqilg'i, xato kodi va ishlagan soatlar. Yoqilg'i 30 foizga tushganda buyurtma vazifasi ochiladi — 20 emas, 30 foizda: yetkazish muddati import va ADR tashuvi bilan uch haftagacha cho'ziladi.":
 "Каждые 60 секунд через порт RS-232 уходит запрос Modbus: напряжение аккумулятора, состояние работы, остаток топлива, код ошибки и моточасы. При падении топлива до 30% открывается задача на заказ — именно до 30, а не до 20 процентов: срок поставки с учётом импорта и перевозки по ADR доходит до трёх недель.",
"Quyosh paneli elementni to'xtatadi": "Солнечная панель останавливает элемент",
"Gibrid sxemada panel akkumulyatorni zaryadlaydi va kuchlanish yuqori chegaraga chiqadi. Element o'chadi va yoqilg'i sarflamaydi. Dekabrda panel kunlik ehtiyojning uchdan bir qismini beradi — shu bilan yillik yoqilg'i uch barobarga kamayadi.":
 "В гибридной схеме панель заряжает аккумулятор, и напряжение доходит до верхнего порога. Элемент выключается и топливо не расходует. В декабре панель покрывает треть суточной потребности — за счёт этого годовой расход топлива падает втрое.",
"Sutkalik hisob": "Суточный итог",
"Yuk o'rtacha 30 Vt, sutkasiga 0,72 kVt·soat. Bundan paneldan 0,25 kVt·soat, elementdan 0,47 kVt·soat. Ya'ni sutkada taxminan 0,42 litr metanol: M28 kartrij shu tartibda 66 kun ishlaydi.":
 "Средняя нагрузка 30 Вт, за сутки 0,72 кВт·ч. Из них 0,25 кВт·ч даёт панель, 0,47 кВт·ч — элемент. То есть около 0,42 литра метанола в сутки: при таком режиме картриджа M28 хватает на 66 суток.",
"Kartrij hisobi platformada avtomatik yuritiladi": "Учёт картриджей ведётся на платформе автоматически",

"Yoqilg'i hisobi: har vatt uchun pul": "Расчёт топлива: деньги за каждый ватт",
"Boshqa yechimlarda ortiqcha vatt akkumulyator sig'imini yeydi. Bu yerda u to'g'ridan-to'g'ri pulga aylanadi: nominal sarf har kVt·soatga 0,9 litr metanol, M28 kartrij esa taxminan 4 mln so'm turadi.":
 "В других решениях лишний ватт съедает ёмкость аккумулятора. Здесь он прямо превращается в деньги: номинальный расход — 0,9 литра метанола на кВт·ч, а картридж M28 стоит около 4 млн сумов.",
"BITTA M28 KARTRIJ (31,1 kVt·soat) NECHA KUN YETADI": "НА СКОЛЬКО СУТОК ХВАТАЕТ ОДНОГО КАРТРИДЖА M28 (31,1 кВт·ч)",
"PTZ, 4 kamera, NVR": "PTZ, 4 камеры, NVR",
"Optimallashtirilgan": "После оптимизации",
"Maqsadli yuk": "Целевая нагрузка",
"24 kun": "24 суток", "33 kun": "33 суток", "43 kun": "43 суток", "66 kun": "66 суток",
"quyosh paneli bilan gibrid": "гибрид с солнечной панелью",
"100 kun": "100 суток",
"Nominal sarf: 1 kVt·soatga 0,9 litr metanol. Muzlashdan himoya rejimining sarfi bu jadvalga kirmaydi va qish oylarida u yana 5–10 foiz qo'shadi.":
 "Номинальный расход: 0,9 литра метанола на 1 кВт·ч. Расход в режиме защиты от замерзания в эту таблицу не входит и в зимние месяцы добавляет ещё 5–10%.",
"Yukni kamaytirish": "Снижение нагрузки",
"PTZ kechasi bitta nuqtada turadi va faqat hodisada aylanadi. NVR disk emas, SSD bilan yig'iladi. IR yoritgich faqat hovli chirog'i yetmaydigan kamerada yoqiladi. Shu uchta qaror 55 vattni 30 vattga tushiradi va yillik yoqilg'ini qariyb ikki barobar kamaytiradi.":
 "Ночью PTZ стоит в одной точке и разворачивается только по событию. NVR собирается с SSD, а не с жёстким диском. ИК-прожектор включается лишь на той камере, которой не хватает дворового света. Эти три решения снижают 55 Вт до 30 Вт и почти вдвое сокращают годовой расход топлива.",
"Gibrid sxema": "Гибридная схема",
"Panel yozda elementni deyarli butunlay to'xtatadi, dekabrda esa kunlik ehtiyojning uchdan bir qismini beradi. Element asosan noyabr–fevralda ishlaydi. Panelning o'zi 3–5 mln so'm turadi va birinchi yildayoq o'zini qoplaydi.":
 "Летом панель практически полностью останавливает элемент, а в декабре покрывает треть суточной потребности. Элемент работает в основном с ноября по февраль. Сама панель стоит 3–5 млн сумов и окупается уже в первый год.",
"mln so'm/yil": "млн сумов/год",

"Seriya portidan hodisalar doskasigacha": "От последовательного порта до доски событий",
"Yoqilg'i elementida IP interfeysi yo'q: u sanoat qurilmasi va RS-232 seriya porti orqali gaplashadi. Shuning uchun yo'lning birinchi bo'lagida bitta qo'shimcha qurilma paydo bo'ladi. Yashil halqali bo'g'inni bosing.":
 "У топливного элемента нет IP-интерфейса: это промышленный аппарат, и общается он через последовательный порт RS-232. Поэтому на первом участке пути появляется одно дополнительное устройство. Нажмите на звено с зелёным маркером.",
"Yoqilg'i elementi": "Топливный элемент",
"Akkumulyator kuchlanishi bo'yicha o'zi yonadi va o'chadi, tarmoqqa ulanmaydi":
 "Включается и выключается сам по напряжению аккумулятора, к сети не подключается",
"Seriya shlyuzi": "Шлюз последовательного порта",
"RS-232 ni Ethernetga chiqaradi, registrlar xaritasi dastur versiyasiga bog'langan":
 "Выводит RS-232 в Ethernet; карта регистров привязана к версии прошивки",
"So'rov har 60 soniyada": "Опрос каждые 60 секунд",
"Kameralar va NVR": "Камеры и NVR",
"Chiziq kesish va hudud hodisalari kameraning o'zida hisoblanadi, yozuv SSD'da qoladi":
 "Пересечение линии и зональные события считаются в самой камере, запись остаётся на SSD",
"Router va tunnel": "Маршрутизатор и туннель",
"Modbus porti internetga chiqmaydi va faqat tunnel ichida ochiladi":
 "Порт Modbus не выходит в интернет и открывается только внутри туннеля",
"Ikki SIM, tashqi antenna": "Две SIM, внешняя антенна",
"Adapter va qoidalar": "Адаптер и правила",
"Yoqilg'i 30 foizda buyurtma, xato kodida servis, kuchlanish tushsa shoshilinch":
 "На 30% топлива — заказ, при коде ошибки — сервис, при падении напряжения — срочно",
"Bank serverida": "На сервере банка",
"Yadro va ekranlar": "Ядро и экраны",
"Kartrij qoldig'i kunlarda ko'rsatiladi, buyurtma muddati yetkazish vaqtidan hisoblanadi":
 "Остаток картриджа показан в сутках, срок заказа отсчитывается от времени поставки",
"Obyekt kartochkasi": "Карточка объекта",
"Yoqilg'i · xato · ish soatlari": "Топливо · ошибка · моточасы",
"EFOY Cloud xizmati ham bor, lekin u bulut va alohida modem talab qiladi. Bank sxemasida telemetriya bank tunnelidan chiqmaydi.":
 "Есть и служба EFOY Cloud, но она требует облака и отдельного модема. В схеме банка телеметрия не выходит за пределы банковского туннеля.",
"Registrlar xaritasi dasturiy ta'minot versiyasiga bog'liq. Yetkazuvchidan aynan yetkaziladigan versiyaning xaritasi hujjat bilan talab qilinadi.":
 "Карта регистров зависит от версии программного обеспечения. У поставщика документально запрашивается карта именно поставляемой версии.",

"Bu yechimda obyekt kartochkasida video bilan bir qatorda yoqilg'i ustuni turadi. Operator uchun asosiy savol bitta: kartrij necha kunga yetadi va buyurtma berilganmi.":
 "В этом решении в карточке объекта рядом с видео стоит колонка топлива. У оператора один основной вопрос: на сколько суток хватит картриджа и сделан ли заказ.",
"Kartrijdagi yoqilg'i va qolgan kun": "Топливо в картридже и остаток в сутках",
"Modbus registri, sarf bo'yicha hisoblanadi": "Регистр Modbus, пересчёт по фактическому расходу",
"60 s": "60 с",
"Element holati: ishlayapti, kutmoqda, xato": "Состояние элемента: работает, ожидает, ошибка",
"Modbus registri": "Регистр Modbus",
"Xato kodi": "Код ошибки",
"Ishlagan soatlar": "Моточасы",
"Modbus registri, servis muddati uchun": "Регистр Modbus, для сервисного интервала",
"Akkumulyator kuchlanishi va zaryadi": "Напряжение и заряд аккумулятора",
"BMS yoki kontroller": "BMS или контроллер",
"Jonli video va PTZ boshqaruvi": "Живое видео и управление PTZ",
"Kamera RTSP va ONVIF PTZ": "Камера по RTSP и ONVIF PTZ",
"Chiziq kesish hodisalari": "События пересечения линии",
"Kamera analitikasi": "Аналитика камеры",
"PTZ ni burish va presetga qaytarish, jonli oqim va arxivni ochish, karnaydan ogohlantirish berish. Kartrij buyurtmasini tasdiqlash va yetkazish sanasini belgilash. Servis vazifasini integratorga yuborish.":
 "Повернуть PTZ и вернуть его на пресет, открыть живой поток и архив, дать предупреждение через громкоговоритель. Подтвердить заказ картриджа и назначить дату поставки. Направить сервисную задачу интегратору.",
"Elementni masofadan yoqish yoki o'chirish: u kuchlanish bo'yicha o'zi qaror qiladi va bu mantiqqa aralashilmaydi. Kartrijni almashtirish ham faqat joyida, qo'lda bajariladi.":
 "Включить или выключить элемент удалённо: он принимает решение сам по напряжению, и в эту логику не вмешиваются. Замена картриджа также выполняется только на месте, вручную.",

"O'rnatish va ishga tushirish": "Монтаж и пусконаладка",
"Montajni CCTV integratori bajaradi, elementni esa distribyutor ishga tushiradi va kafolatni shu dalolatnoma bilan ochadi. Ikkala ish bir kunga rejalashtiriladi.":
 "Монтаж выполняет CCTV-интегратор, а элемент запускает дистрибьютор и этим актом открывает гарантию. Обе работы планируются на один день.",
"Shkaf, egzoz quvuri, havo kirishi": "Шкаф, выхлопная труба, приток воздуха",
"Integrator, 2 kishi": "Интегратор, 2 человека",
"1–2 ish kuni": "1–2 рабочих дня",
"Kameralar, NVR, router, kabel": "Камеры, NVR, маршрутизатор, кабель",
"Elementni ishga tushirish va sozlash": "Пуск и настройка элемента",
"Distribyutor mutaxassisi": "Специалист дистрибьютора",
"3–4 soat": "3–4 ч", "2 soat": "2 ч",
"Telemetriya va adapter sinovi": "Проверка телеметрии и адаптера",
"Jamoa rahbari masofadan": "Тимлид удалённо",
"Egzoz quvuri tashqariga pastga qiyalik bilan chiqariladi va uchi shamolga qarshi emas, yon tomonga qaratiladi. Quvurda suv bug'i kondensatga aylanadi va qiyalik bo'lmasa u ichkariga qaytadi.":
 "Выхлопная труба выводится наружу с уклоном вниз, а её срез направляется вбок, а не навстречу ветру. В трубе водяной пар превращается в конденсат, и без уклона он стекает обратно внутрь.",
"Havo kirishi filtr bilan qilinadi. Chang ko'p hududda filtr servis jadvaliga kiritiladi: to'lgan filtr elementni quvvatdan tushiradi.":
 "Приток воздуха делается через фильтр. В запылённой местности фильтр вносится в график обслуживания: забитый фильтр снижает мощность элемента.",
"Kartrij element yonida emas, alohida bo'limda, qulf ostida turadi. Bo'lim ochilishiga datchik qo'yiladi va u platformaga hodisa bo'lib tushadi.":
 "Картридж стоит не рядом с элементом, а в отдельном отсеке под замком. На вскрытие отсека ставится датчик, и его срабатывание уходит событием на платформу.",
"Akkumulyator past harorat himoyali BMS bilan olinadi. Isitgich elementning o'z issiqligidan yoki paneldan oziqlanadi, akkumulyatordan emas.":
 "Аккумулятор берётся с BMS низкотемпературной защиты. Подогрев питается от собственного тепла элемента или от панели, а не от аккумулятора.",
"Ishga tushirish dalolatnomasiga ishlagan soatlar hisoblagichining boshlang'ich qiymati va registrlar xaritasining versiyasi yoziladi. Ikkalasi ham keyingi servis uchun kerak bo'ladi.":
 "В акт пусконаладки вносятся начальное показание счётчика моточасов и версия карты регистров. Оба значения понадобятся при последующем обслуживании.",
"Birinchi haftada haqiqiy iste'mol Modbus orqali o'lchanadi va kartrij jadvali shunga qarab tuzatiladi. Loyihadagi hisob va joydagi o'lchov o'rtasidagi farq odatda 10–20 foiz bo'ladi.":
 "В первую неделю фактическое потребление замеряется по Modbus, и график картриджей корректируется по нему. Расхождение проектного расчёта с замером на месте обычно составляет 10–20%.",

"Narx: 80–170 mln so'm bir obyektga": "Стоимость: 80–170 млн сумов на объект",
"Ochiq narxlar bo'yicha hisob, yevro kursi taxminan 13 600 so'm. Bu ro'yxatdagi eng qimmat yechim va uning har qatori tekshiriladi.":
 "Расчёт по открытым ценам, курс евро принят около 13 600 сумов. Это самое дорогое решение в перечне, и каждая его строка проверяется.",
"EFOY Pro 2800, Yevropa chakana narxi ≈ 9 800 yevro": "EFOY Pro 2800, розничная цена в Европе ≈ 9 800 евро",
"≈133": "≈133", "≈76": "≈76", "+9–16": "+9–16", "12–25": "12–25", "80–170": "80–170",
"Yoki ulgurji mo'ljal: 180 dona buyurtmada ≈ 5 600 yevro dona":
 "Либо оптовый ориентир: при заказе 180 шт. ≈ 5 600 евро за штуку",
"Import QQS 12% va bojxona rasmiylashtiruvi": "Импортный НДС 12% и таможенное оформление",
"Akkumulyator, shkaf, kameralar, NVR, router": "Аккумулятор, шкаф, камеры, NVR, маршрутизатор",
"Bir obyektga, jihoz tarkibiga qarab": "На один объект, в зависимости от состава оборудования",
"Kichik model (Pro 900) arzonroq, lekin uning rasmiy chakana narxi e'lon qilinmagan: tijorat taklifi so'raladi. Yoqilg'i bu jadvalga kirmaydi va u alohida yillik xarajat.":
 "Младшая модель (Pro 900) дешевле, но её официальная розничная цена не публикуется: запрашивается коммерческое предложение. Топливо в эту таблицу не входит и составляет отдельный годовой расход.",
"Qachon o'zini oqlaydi": "Когда решение оправдано",
"To'rt shart bir vaqtda bajarilganda: obyektni elektrga qayta ulab bo'lmaydi, quyosh qishda yetmaydi, obyekt uzoqda va servis qatnovi qimmat, aktiv qiymati yuqori. Bittasi ham bajarilmasa, arzonroq yechim bor.":
 "Когда одновременно выполняются четыре условия: объект нельзя вернуть к сети, зимой не хватает солнца, объект удалён и выезд на обслуживание дорог, стоимость актива высока. Если хотя бы одно не выполняется, есть решение дешевле.",
"Yillik yoqilg'i": "Топливо в год",
"30 vatt yil bo'yi faqat element bilan ishlasa, oyiga taxminan 2,8 mln so'mlik metanol ketadi. Quyosh bilan gibrid sxemada bu 11–14 mln so'mgacha tushadi. Farq beshinchi yilda 100 mln so'mdan oshadi.":
 "Если 30 Вт круглый год обеспечиваются только элементом, метанола уходит примерно на 2,8 млн сумов в месяц. В гибридной схеме с солнечной панелью это падает до 11–14 млн сумов в год. К пятому году разница превышает 100 млн сумов.",
"Ijara va lizing": "Аренда и лизинг",
"Distribyutordan ijara yoki lizing taklifi alohida so'raladi. Lizingda to'lov oylarga bo'linadi, lekin qarz balansda qoladi va aktivning bir yillik sotuv muddati bilan solishtiriladi.":
 "Предложение по аренде или лизингу запрашивается у дистрибьютора отдельно. При лизинге платёж разбивается помесячно, но задолженность остаётся на балансе и сопоставляется с годовым сроком реализации актива.",

"Metanol: tashish, saqlash va javobgarlik": "Метанол: перевозка, хранение и ответственность",
"Metanol UN 1230 raqamli xavfli yuk: 3-sinf yonuvchan suyuqlik, qo'shimcha xavfi zaharli. EFOY kartrijlari tashish uchun tasdiqqa ega, lekin bu bankni saqlash qoidalaridan ozod qilmaydi.":
 "Метанол — опасный груз UN 1230: легковоспламеняющаяся жидкость класса 3 с дополнительной опасностью «токсично». Картриджи EFOY имеют допуск к перевозке, но это не освобождает банк от правил хранения.",
"Kartrijni obyektga yetkazuvchi o'zi olib boradi. Bank omborida zaxira saqlanmaydi yoki alohida shamollatiladigan joyda, cheklangan miqdorda saqlanadi.":
 "Картридж на объект привозит сам поставщик. Запас на складе банка не хранится либо хранится в отдельном проветриваемом помещении и в ограниченном количестве.",
"Tashishni ADR ruxsati bor tashuvchi bajaradi. Yo'lda va almashtirishda javobgarlik yetkazuvchida bo'lishi shartnomada aniq yoziladi.":
 "Перевозку выполняет перевозчик с допуском ADR. Ответственность в пути и при замене прямо закрепляется за поставщиком в договоре.",
"Bo'sh kartrij yetkazuvchiga qaytariladi. Uni oddiy chiqindi sifatida tashlab yuborish mumkin emas.":
 "Пустой картридж возвращается поставщику. Выбросить его как обычный отход нельзя.",
"Xavfsizlik ma'lumotlari varaqasi rus yoki o'zbek tilida beriladi va obyekt hujjatlari papkasida saqlanadi.":
 "Паспорт безопасности предоставляется на русском или узбекском языке и хранится в папке документов объекта.",
"Yong'in xavfsizligi talablari VMQ-649 qoidalari bo'yicha aniqlanadi. Shkaf yonida yonuvchi material saqlanmaydi, ogohlantirish belgisi qo'yiladi.":
 "Требования пожарной безопасности определяются по правилам ВМQ-649. Рядом со шкафом не хранятся горючие материалы, вывешивается предупреждающий знак.",
"Metanol ichilsa o'limga olib keladi. Kartrij qulflangan bo'limda turadi, bo'lim ochilishi datchik orqali platformaga tushadi. Bank yuristi va yong'in xavfsizligi mas'uli shartnomani imzolashdan oldin ko'rib chiqadi.":
 "Приём метанола внутрь смертелен. Картридж хранится в запираемом отсеке, вскрытие отсека уходит на платформу через датчик. Юрист банка и ответственный за пожарную безопасность рассматривают договор до подписания.",
"Kim yetkazadi": "Кто поставляет",
"SFC Energy distribyutori orqali import. Element va kartrijlar alohida keladi: element odatiy yuk, kartrij xavfli yuk. Yetkazish muddati import va ADR tashuvi bilan uch haftagacha cho'ziladi va buyurtma jadvali shu muddatdan hisoblanadi.":
 "Импорт через дистрибьютора SFC Energy. Элемент и картриджи приходят отдельно: элемент — обычный груз, картридж — опасный. Срок поставки с учётом импорта и перевозки по ADR доходит до трёх недель, и график заказов отсчитывается именно от него.",
"Kim ishga tushiradi": "Кто выполняет пуск",
"Elementni distribyutor mutaxassisi ishga tushiradi va kafolat shu dalolatnoma bilan ochiladi. Montaj, kabel, kamera va shkaf CCTV integratorida. Servisni ham distribyutor bajaradi: bu jihozni mahalliy usta ta'mirlamaydi.":
 "Элемент запускает специалист дистрибьютора, и этим актом открывается гарантия. Монтаж, кабель, камеры и шкаф — на CCTV-интеграторе. Сервис также выполняет дистрибьютор: местный мастер этот аппарат не ремонтирует.",

"Bu yechimda xarid narxi boshlanish, yoqilg'i esa davomi. Besh yillik yoqilg'i xarajati jihoz narxiga teng yoki undan ko'p bo'lishi mumkin — qaror shu raqam bilan qabul qilinadi.":
 "В этом решении цена закупки — только начало, а топливо — продолжение. Расход топлива за пять лет может сравняться со стоимостью оборудования или превысить её, и решение принимается именно по этой цифре.",
"Metanol, faqat element bilan": "Метанол, только элемент",
"30 Vt yil bo'yi: 1 314 kVt·soat, 42 ta M28": "30 Вт круглый год: 1 314 кВт·ч, 42 картриджа M28",
"≈170 mln so'm": "≈170 млн сумов",
"Metanol, quyosh bilan gibrid": "Метанол, гибрид с солнечной панелью",
"Taxminan 14 ta M28": "Около 14 картриджей M28",
"≈55 mln so'm": "≈55 млн сумов",
"Element servisi": "Сервис элемента",
"Ishlagan soat bo'yicha, distribyutor tomonidan": "По моточасам, силами дистрибьютора",
"Shartnomada": "По договору",
"Havo filtri": "Воздушный фильтр",
"Yiliga 1–2 marta, changli hududda ko'proq": "1–2 раза в год, в запылённой местности чаще",
"0,5–1,0 mln so'm": "0,5–1,0 млн сумов",
"Akkumulyator": "Аккумулятор",
"LiFePO4 besh yilda almashtirilmaydi": "LiFePO4 за пять лет не меняется",
"Bo'sh kartrijlarni qaytarish va yangi partiyani yetkazish xarajati ham qo'shiladi: chekkadagi obyektga bir marta borish 300–600 ming so'mga tushadi.":
 "Добавляются и расходы на возврат пустых картриджей и доставку новой партии: одна поездка на удалённый объект обходится в 300–600 тыс. сумов.",

"Element o'zi ishonchli qurilma. Uchala nosozlik ham uning atrofidagi narsalarda: quvur, logistika va xavfsizlik.":
 "Сам элемент — надёжный аппарат. Все три отказа лежат вокруг него: труба, логистика и безопасность.",
"Egzoz quvuri muzlab qoldi va element to'xtadi": "Замёрзла выхлопная труба, и элемент остановился",
"Element chiqargan suv bug'i quvurda kondensatga aylanadi. Quvur gorizontal yotqizilgan yoki uchi yuqoriga qaragan bo'lsa, kondensat yig'iladi va −15 °C da muzlab qoladi. Element chiqishi yopilganini aniqlaydi va o'zini o'chiradi.":
 "Водяной пар, выделяемый элементом, превращается в трубе в конденсат. Если труба уложена горизонтально или её срез направлен вверх, конденсат скапливается и при −15 °C замерзает. Элемент определяет, что выход перекрыт, и выключается.",
"Quvur tashqariga pastga qiyalik bilan chiqariladi, uchi qiya kesiladi va yon tomonga qaratiladi. Qor to'planadigan joyga chiqarilmaydi. Har servisda quvur tekshiriladi.":
 "Труба выводится наружу с уклоном вниз, срез делается косым и направляется вбок. Не выводится туда, где скапливается снег. На каждом сервисе труба проверяется.",
"Kartrij vaqtida yetib kelmadi": "Картридж не пришёл вовремя",
"Yoqilg'i tugadi, element to'xtadi, akkumulyator ikki kunda bo'shadi va obyekt nazoratdan chiqdi. Sababi texnik emas: buyurtma kech berilgan yoki ADR tashuvi kechikkan.":
 "Топливо закончилось, элемент остановился, аккумулятор разрядился за двое суток, объект вышел из-под контроля. Причина не техническая: заказ сделан поздно или задержалась перевозка по ADR.",
"Buyurtma vazifasi 20 emas, 30 foizda ochiladi — bu uch haftalik yetkazishni qoplaydi. Shartnomaga yetkazish muddati va uning buzilishi uchun javobgarlik yoziladi. Har obyektga bitta zaxira kartrij rejalashtiriladi.":
 "Задача на заказ открывается на 30, а не на 20 процентах — этого хватает на трёхнедельную доставку. В договор вносятся срок поставки и ответственность за его нарушение. На каждый объект планируется один запасной картридж.",
"Kartrij o'g'irlandi yoki bo'lim ochildi": "Картридж украден или отсек вскрыт",
"Metanol suyuq yoqilg'i sifatida qiziqish uyg'otadi va uni ichgan odam o'ladi. Bo'sh obyektdagi qulflanmagan kartrij bank uchun huquqiy va insoniy javobgarlik masalasi.":
 "Метанол вызывает интерес как жидкое топливо, а выпивший его человек погибает. Незапертый картридж на пустом объекте — вопрос правовой и человеческой ответственности банка.",
"Kartrij qulflangan alohida bo'limda, ogohlantirish belgisi bilan turadi. Bo'limda ochilish datchigi, unga kamera qaratilgan. Zaxira kartrij obyektda emas, yetkazuvchida saqlanadi.":
 "Картридж хранится в отдельном запираемом отсеке с предупреждающим знаком. В отсеке датчик вскрытия, на него направлена камера. Запасной картридж хранится не на объекте, а у поставщика.",

"Chekkadagi ishlab chiqarish sexi: ichida qimmat uskuna qolgan, elektr uzilgan va qayta ulash imkoni yo'q.":
 "Удалённый производственный цех: внутри осталось дорогое оборудование, электроснабжение отключено и восстановить его нельзя.",
"Tog' oralig'idagi yoki soyadagi obyekt: quyosh paneli dekabrda kunlik ehtiyojning yarmini ham bermaydi.":
 "Объект в ущелье или в тени: в декабре солнечная панель не даёт и половины суточной потребности.",
"Servisga kam boriladigan uzoq obyekt: element oylab ishlaydi va qatnov talab qilmaydi.":
 "Удалённый объект, куда редко выезжают: элемент работает месяцами и выездов не требует.",
"Qiymati yuqori aktiv, undagi yo'qotish xatari real va sug'urta ham uni to'liq qoplamaydi.":
 "Актив высокой стоимости, где риск утраты реален и страхование покрывает его не полностью.",
"Ma'muriy bino, xonadon va do'kon: bu yechim ular uchun ortiqcha va asossiz qimmat.":
 "Административное здание, квартира и магазин: для них это решение избыточно и неоправданно дорого.",
"Elektrga qayta ulash mumkin bo'lgan obyekt: texnik shart 39 600 so'm va uch ish kuni turadi.":
 "Объект, который можно вновь подключить к сети: технические условия стоят 39 600 сумов и три рабочих дня.",
"Bir yildan kam nazoratda turadigan obyekt: xarid narxi shu muddatda qoplanmaydi.":
 "Объект, остающийся под контролем менее года: за этот срок цена закупки не окупается.",
"Yong'in xavfi yuqori yoki odam yashaydigan bino yonidagi obyekt: metanol saqlash sharti bajarilmaydi.":
 "Объект с высокой пожарной опасностью или рядом с жилым зданием: условие хранения метанола не выполняется.",

"Aynan yetkaziladigan dastur versiyasi uchun Modbus registrlari xaritasi beriladimi?":
 "Предоставляется ли карта регистров Modbus именно для поставляемой версии прошивки?",
"Xarita versiyaga bog'liq. Boshqa versiyaning xaritasi bilan adapter noto'g'ri qiymat o'qiydi.":
 "Карта привязана к версии. С картой другой версии адаптер читает неверные значения.",
"Servis to'plami necha ish soatida almashtiriladi va uning narxi qancha?":
 "При какой наработке меняется сервисный комплект и сколько он стоит?",
"Bu besh yillik xarajatning hisobga olinmagan qatori.": "Это статья пятилетних расходов, которую обычно не учитывают.",
"Muzlashdan himoya rejimi qancha yoqilg'i sarflaydi?": "Сколько топлива расходует режим защиты от замерзания?",
"Qish oylarida u yillik hisobga 5–10 foiz qo'shadi.": "В зимние месяцы он добавляет к годовому расчёту 5–10%.",
"Kartrijning yetkazish muddati qancha va ADR tashuvchisi kim?":
 "Каков срок поставки картриджа и кто выступает перевозчиком с допуском ADR?",
"Buyurtma chegarasi ayni shu muddatdan kelib chiqib belgilanadi.": "Порог заказа задаётся исходя именно из этого срока.",
"Bo'sh kartrijlar qanday qaytariladi va bu xizmat narxga kiradimi?":
 "Как возвращаются пустые картриджи и входит ли эта услуга в цену?",
"Ularni oddiy chiqindi sifatida tashlab bo'lmaydi.": "Выбросить их как обычный отход нельзя.",
"Xavfsizlik ma'lumotlari varaqasi rus yoki o'zbek tilida beriladimi?":
 "Предоставляется ли паспорт безопасности на русском или узбекском языке?",
"Yong'in xavfsizligi mas'uli shu hujjatga tayanadi.": "Ответственный за пожарную безопасность опирается именно на этот документ.",
"Elementni O'zbekistonda kim ishga tushiradi va servis qiladi?":
 "Кто в Узбекистане выполняет пуск элемента и его обслуживание?",
"Javob «Yevropadan mutaxassis keladi» bo'lsa, har servis qo'shimcha muddat va pul degani.":
 "Если ответ — «приедет специалист из Европы», каждый сервис означает дополнительный срок и деньги.",
"Quyosh paneli bilan gibrid ishlash qo'llab-quvvatlanadimi va kontroller qanday ulanadi?":
 "Поддерживается ли гибридная работа с солнечной панелью и как подключается контроллер?",
"Gibrid sxema yillik yoqilg'ini uch barobar kamaytiradi.": "Гибридная схема сокращает годовой расход топлива втрое.",
"Element ishlaganda shovqin darajasi qanday?": "Каков уровень шума при работе элемента?",
"Qo'shni bino yaqin bo'lsa, bu shikoyat sababi bo'lishi mumkin.": "Если рядом стоит соседнее здание, это может стать поводом для жалоб.",
"Kafolat muddati qancha va u isitilmaydigan shkafda saqlanadimi?":
 "Каков гарантийный срок и сохраняется ли гарантия в неотапливаемом шкафу?",
"Ko'p jihozda kafolat sharti ish sharoitiga bog'langan.": "У многих изделий условия гарантии привязаны к условиям эксплуатации."
});

/* ---- 07-sahifa bilan umumiy matnlar ---- */
window.MKB_LUGAT = Object.assign(window.MKB_LUGAT || {}, {
"Slaydga qaytish ·": "Вернуться к слайду ·",
"Komplekt": "Комплект",
"Qishki sutka": "Зимние сутки",
"Besh yil": "Пять лет",
"Nosozlik": "Отказы",
"Savollar": "Вопросы",
"Solishtirish": "Сравнение",
"Nima qiladi": "Что делает",
"Dona": "Шт.",
"tun": "ночь",
"sovuq": "холод",
"hodisa": "событие",
"Yadro va ekranlar": "Ядро и экраны",
"Operator nima ko'radi va nima qila oladi": "Что видит оператор и что он может сделать",
"Manbasi": "Источник",
"Yangilanishi": "Обновление",
"Masofadan qilinadi": "Делается удалённо",
"Qilib bo'lmaydi": "Сделать нельзя",
"Kim": "Кто",
"1 ish kuni": "1 рабочий день",
"Qator": "Статья",
"Besh yil ichida nima sarflanadi": "Что расходуется за пять лет",
"Modda": "Статья",
"Qachon": "Когда",
"Besh yilda": "За пять лет",
"Oyma-oy": "Ежемесячно",
"Uchta nosozlik va ularning oldini olish": "Три отказа и их предупреждение",
"Nosozlik 1": "Отказ 1",
"Oldini olish": "Профилактика",
"Nosozlik 2": "Отказ 2",
"Nosozlik 3": "Отказ 3",
"Qaysi obyektga mos, qaysi biriga emas": "Каким объектам подходит, а каким нет",
"Mos keladi": "Подходит",
"Mos emas": "Не подходит",
"Yetkazib beruvchidan so'raladigan savollar": "Вопросы, которые задают поставщику",
"Tijorat taklifi olinishidan oldin yoziladi. Javoblar shartnomaga ilova qilinadi.": "Задаются до получения коммерческого предложения. Ответы прикладываются к договору.",
"O'nta yechim orasida": "Среди десяти решений",
"Uy va kichik ofis": "Дом и малый офис",
"Tashqi perimetr": "Наружный периметр",
"Tashqi perimetr, PTZ": "Наружный периметр, PTZ",
"Ko'p qurilmali obyekt": "Объект с множеством устройств",
"Bir hududdagi obyektlar": "Объекты в одной локации",
"Taqdimotga qaytish ·": "Вернуться к презентации ·"
});
