/* Yechim 03 (Dahua quyosh-4G PTZ) chuqur sahifasidagi batafsil yozuvlari. */
window.MKB_BATAFSIL = window.MKB_BATAFSIL || {};
Object.assign(window.MKB_BATAFSIL, {

"y03.r-panel": {
  yorliq: "Montajchi uchun", sarlavha: "150 Vt·soat: hisob va bulutli kun",
  tana: "<p>125 Vt panel dekabrda sutkasiga <code>125 × 1,62 × 0,75 ≈ 150 Vt·soat</code> beradi. Koeffitsiyent Yechim 02 dagidan bir oz yuqori, chunki katta panel ustunga alohida burchak bilan qo'yiladi va soyasi hisobga olinadi.</p>" +
    "<table><tr><th>Sharoit</th><th>Sutkalik unum</th></tr>" +
    "<tr><td>Dekabr, ochiq havo</td><td class='n'>150 Vt·soat</td></tr>" +
    "<tr><td>Dekabr, qalin bulut</td><td class='n'>35–40 Vt·soat</td></tr>" +
    "<tr><td>Iyun, ochiq havo</td><td class='n'>712 Vt·soat</td></tr></table>" +
    "<p>Kameraning dekabrdagi chiqimi ham taxminan 150 Vt·soat. Ya'ni balans nolga teng va har bir bulutli kun to'g'ridan-to'g'ri akkumulyatordan olinadi.</p>" +
    "<p class='ogoh'>Datasheet komplektni sutkasiga 3,5 soatdan ko'p quyosh tushadigan joylar uchun belgilaydi. Toshkentda dekabrda bu ko'rsatkich chegaradan past — ya'ni ishlab chiqaruvchi shu sharoit uchun kafolat bermaydi. Qishki rejim yoki ikkinchi akkumulyator shundan kelib chiqadi.</p>",
  manba: [["NASA POWER insolyatsiya ma'lumotlari", "https://power.larc.nasa.gov/"]],
  ru: { yorliq: "Для монтажника", sarlavha: "150 Вт·ч: расчёт и пасмурный день",
    tana: "<p>Панель 125 Вт даёт в декабре <code>125 × 1,62 × 0,75 ≈ 150 Вт·ч</code> в сутки. Коэффициент чуть выше, чем в решении 02: большая панель ставится на опору под собственным углом, и тень учитывается отдельно.</p>" +
      "<table><tr><th>Условие</th><th>Выработка за сутки</th></tr>" +
      "<tr><td>Декабрь, ясно</td><td class='n'>150 Вт·ч</td></tr>" +
      "<tr><td>Декабрь, плотная облачность</td><td class='n'>35–40 Вт·ч</td></tr>" +
      "<tr><td>Июнь, ясно</td><td class='n'>712 Вт·ч</td></tr></table>" +
      "<p>Декабрьский расход камеры — тоже около 150 Вт·ч. То есть баланс нулевой, и каждый пасмурный день вычитается прямо из аккумулятора.</p>" +
      "<p class='ogoh'>Паспорт определяет комплект для мест, где солнце светит больше 3,5 часа в сутки. В декабре Ташкент ниже этого порога — то есть производитель для таких условий гарантий не даёт. Отсюда и зимний режим, и второй аккумулятор.</p>" }
},

"y03.r-sarf": {
  yorliq: "Texnik izoh", sarlavha: "Uch yuz barobar farq: rejimlar jadvali",
  tana: "<p>Aylanuvchi kamerada iste'mol o'zgarmas emas. Eng tejamkor va eng och rejim orasidagi farq uch yuz barobarga yetadi va qishki reja aynan shu jadvalga tayanadi.</p>" +
    "<table><tr><th>Rejim</th><th>Quvvat</th><th>Soatiga</th></tr>" +
    "<tr><td>Chuqur uyqu</td><td class='n'>0,05 Vt</td><td class='n'>0,05 Vt·soat</td></tr>" +
    "<tr><td>Yengil uyqu</td><td class='n'>2,5 Vt</td><td class='n'>2,5 Vt·soat</td></tr>" +
    "<tr><td>Ish, oqimsiz</td><td class='n'>3,75 Vt</td><td class='n'>3,75 Vt·soat</td></tr>" +
    "<tr><td>4G orqali oqim</td><td class='n'>4,54 Vt</td><td class='n'>4,54 Vt·soat</td></tr>" +
    "<tr><td>IR yoritgich yoqiq</td><td class='n'>7,98 Vt</td><td class='n'>7,98 Vt·soat</td></tr>" +
    "<tr><td>IR, burilish va oqim birga</td><td class='n'>15,49 Vt</td><td class='n'>eng yuqori</td></tr></table>" +
    "<p class='ogoh'>Loyihalashda eng yuqori qiymat o'rtacha sifatida olinmaydi, lekin uni butunlay e'tiborsiz qoldirish ham xato: operator faol tunda o'nlab marta zumlab va burib ko'radi, va bu soatlar byudjetda o'z o'rnini topishi kerak.</p>",
  ru: { yorliq: "Техническая справка", sarlavha: "Разница в триста раз: таблица режимов",
    tana: "<p>У поворотной камеры потребление непостоянно. Между самым экономным и самым прожорливым режимом разница доходит до трёхсот раз, и зимний план строится именно по этой таблице.</p>" +
      "<table><tr><th>Режим</th><th>Мощность</th><th>За час</th></tr>" +
      "<tr><td>Глубокий сон</td><td class='n'>0,05 Вт</td><td class='n'>0,05 Вт·ч</td></tr>" +
      "<tr><td>Лёгкий сон</td><td class='n'>2,5 Вт</td><td class='n'>2,5 Вт·ч</td></tr>" +
      "<tr><td>Работа без потока</td><td class='n'>3,75 Вт</td><td class='n'>3,75 Вт·ч</td></tr>" +
      "<tr><td>Поток по 4G</td><td class='n'>4,54 Вт</td><td class='n'>4,54 Вт·ч</td></tr>" +
      "<tr><td>Включена ИК-подсветка</td><td class='n'>7,98 Вт</td><td class='n'>7,98 Вт·ч</td></tr>" +
      "<tr><td>ИК, поворот и поток вместе</td><td class='n'>15,49 Вт</td><td class='n'>максимум</td></tr></table>" +
      "<p class='ogoh'>В проекте максимум не берут за среднее, но и игнорировать его нельзя: в активную ночь оператор десятки раз зумит и поворачивает камеру, и эти часы должны быть заложены в бюджет.</p>" }
},

"y03.r-avtonom": {
  yorliq: "Montajchi uchun", sarlavha: "3,5 kun: bu kam yoki ko'pmi",
  tana: "<p>45 A·soat akkumulyator 576 Vt·soat beradi, BMS chegarasi bilan foydali sig'im taxminan 520 Vt·soat. 150 Vt·soatlik sutkalik chiqimda bu 3,5 kun.</p>" +
    "<p>Toshkent dekabrida uch kun ketma-ket bulut odatiy hodisa, to'rt kunlik bulut ham har qishda bir-ikki marta bo'ladi. Ya'ni zaxira aniq yetarli emas.</p>" +
    "<table><tr><th>Chora</th><th>Natija</th><th>Narxi</th></tr>" +
    "<tr><td>Qishki tungi rejim</td><td>Chiqim 150 → 106 Vt·soat, zaxira 5 kun</td><td>Bepul, masofadan</td></tr>" +
    "<tr><td>Ikkinchi akkumulyator</td><td>Zaxira 7 kun</td><td>Smetaga qo'shimcha qator</td></tr>" +
    "<tr><td>Panelni kattalashtirish</td><td>Balans musbat bo'ladi</td><td>Ustun va poydevor qayta hisoblanadi</td></tr></table>" +
    "<p class='ogoh'>Birinchi chora eng arzoni va u pilotda birinchi sinaladi. Uchinchisi eng qimmati: panel yuzasi ortsa, shamol yuki va poydevor momenti ham ortadi — ya'ni bu jihoz emas, qurilish qarori.</p>",
  ru: { yorliq: "Для монтажника", sarlavha: "3,5 дня — это мало или достаточно",
    tana: "<p>Аккумулятор 45 А·ч даёт 576 Вт·ч, с учётом ограничения BMS полезная ёмкость около 520 Вт·ч. При суточном расходе 150 Вт·ч это 3,5 дня.</p>" +
      "<p>Три пасмурных дня подряд для декабрьского Ташкента — обычное дело, четырёхдневная облачность случается каждую зиму раз-другой. То есть запаса явно недостаточно.</p>" +
      "<table><tr><th>Мера</th><th>Результат</th><th>Цена</th></tr>" +
      "<tr><td>Зимний ночной режим</td><td>Расход 150 → 106 Вт·ч, запас 5 дней</td><td>Бесплатно, дистанционно</td></tr>" +
      "<tr><td>Второй аккумулятор</td><td>Запас 7 дней</td><td>Дополнительная строка сметы</td></tr>" +
      "<tr><td>Увеличить панель</td><td>Баланс становится положительным</td><td>Пересчёт опоры и фундамента</td></tr></table>" +
      "<p class='ogoh'>Первая мера самая дешёвая, её и проверяют в пилоте первой. Третья самая дорогая: с ростом площади панели растут ветровая нагрузка и момент на фундаменте — это уже не вопрос оборудования, а строительное решение.</p>" }
},

"y03.r-narx": {
  yorliq: "Moliya va huquq", sarlavha: "7–12 mln so'm: qaysi komplekt uchun",
  tana: "<p>Bu raqam ixcham PT komplektiga tegishli: kichik panel, ichki akkumulyator, hovli yoki kichik ombor uchun. 25× zumli 125 Vt'li komplekt boshqa narx toifasida.</p>" +
    "<table><tr><th>Qator</th><th>Ixcham PT</th><th>125 Vt</th></tr>" +
    "<tr><td>Kamera va panel</td><td class='n'>3,5–4,8</td><td class='n'>so'rov bo'yicha</td></tr>" +
    "<tr><td>Ustun, poydevor, yerga ulash</td><td class='n'>1,0–2,5</td><td class='n'>2,0–4,0</td></tr>" +
    "<tr><td>Montaj va sozlash</td><td class='n'>1,0–2,0</td><td class='n'>1,5–3,0</td></tr>" +
    "<tr><td><b>Obyekt, mln so'm</b></td><td class='n'><b>7–12</b></td><td class='n'><b>ancha yuqori</b></td></tr></table>" +
    "<p>125 Vt komplektning Yevropa chakana narxi akkumulyatorsiz taxminan 1 725 yevro. O'zbekistondagi narx rasmiy distribyutordan so'raladi va olib kelish hamda bojxona bilan hisoblanadi.</p>" +
    "<p class='ogoh'>Ustun va poydevor smetada ko'pincha unutiladi, keyin esa ular jihoz narxining uchdan biriga teng bo'lib chiqadi. Bu qatorni birinchi kundan alohida ko'rsating.</p>",
  ru: { yorliq: "Финансы и право", sarlavha: "7–12 млн сум: за какой комплект",
    tana: "<p>Цифра относится к компактному PT-комплекту: небольшая панель, встроенный аккумулятор, двор или малый склад. Комплект с 25-кратным зумом и панелью 125 Вт — другая ценовая категория.</p>" +
      "<table><tr><th>Строка</th><th>Компактный PT</th><th>125 Вт</th></tr>" +
      "<tr><td>Камера и панель</td><td class='n'>3,5–4,8</td><td class='n'>по запросу</td></tr>" +
      "<tr><td>Опора, фундамент, заземление</td><td class='n'>1,0–2,5</td><td class='n'>2,0–4,0</td></tr>" +
      "<tr><td>Монтаж и настройка</td><td class='n'>1,0–2,0</td><td class='n'>1,5–3,0</td></tr>" +
      "<tr><td><b>Объект, млн сум</b></td><td class='n'><b>7–12</b></td><td class='n'><b>заметно выше</b></td></tr></table>" +
      "<p>Европейская розничная цена комплекта 125 Вт без аккумулятора — около 1 725 евро. Цену в Узбекистане запрашивают у официального дистрибьютора и считают с ввозом и таможней.</p>" +
      "<p class='ogoh'>Опору и фундамент в смете часто забывают, а потом они оказываются равны трети стоимости оборудования. Показывайте эту строку отдельно с первого дня.</p>" }
},

"y03.k-akb": {
  yorliq: "Moliya va huquq", sarlavha: "Akkumulyator komplektga kirmaydi",
  tana: "<p>Bu yechimdagi eng ko'p uchraydigan smeta xatosi. Ishlab chiqaruvchining komplektida panel, kontroller va kamera bor, akkumulyator esa alohida sotiladi.</p>" +
    "<table><tr><th>Ko'rsatkich</th><th>Qiymat</th></tr>" +
    "<tr><td>Model</td><td>PFM372-L45-4S14P</td></tr>" +
    "<tr><td>Kuchlanish va sig'im</td><td>12,8 V, 45 A·soat</td></tr>" +
    "<tr><td>Energiya</td><td>≈576 Vt·soat</td></tr>" +
    "<tr><td>Foydali sig'im</td><td>≈520 Vt·soat</td></tr></table>" +
    "<p>Taklifni qabul qilishdan oldin akkumulyator qatori alohida so'raladi va uning kafolati hamda tsikl resursi yozib olinadi.</p>" +
    "<p class='ogoh'>Ikkinchi akkumulyator qo'shish qarori ham shu bosqichda qabul qilinadi: keyinchalik qo'shish qutini va ulash sxemasini qayta qilishni talab qiladi, ya'ni ikkinchi tashrif degani.</p>",
  ru: { yorliq: "Финансы и право", sarlavha: "Аккумулятор в комплект не входит",
    tana: "<p>Это самая частая ошибка сметы в этом решении. В заводском комплекте есть панель, контроллер и камера, а аккумулятор продаётся отдельно.</p>" +
      "<table><tr><th>Параметр</th><th>Значение</th></tr>" +
      "<tr><td>Модель</td><td>PFM372-L45-4S14P</td></tr>" +
      "<tr><td>Напряжение и ёмкость</td><td>12,8 В, 45 А·ч</td></tr>" +
      "<tr><td>Энергия</td><td>≈576 Вт·ч</td></tr>" +
      "<tr><td>Полезная ёмкость</td><td>≈520 Вт·ч</td></tr></table>" +
      "<p>До принятия предложения строку аккумулятора запрашивают отдельно и фиксируют его гарантию и ресурс циклов.</p>" +
      "<p class='ogoh'>Решение о втором аккумуляторе тоже принимают на этом этапе: добавить его позже — значит переделать бокс и схему подключения, то есть выехать на объект второй раз.</p>" }
},

"y03.k-kamera": {
  yorliq: "Texnik izoh", sarlavha: "25× zum: nima beradi va nimaga tegadi",
  tana: "<p>Optik zum uzoq masofadagi tafsilotni ko'rsatadi: 100 metrdan avtomobil raqamini, 50 metrdan odam yuzini. Bu bitta kamera bilan katta hududni qoplash imkonini beradi.</p>" +
    "<h4>Nima evaziga</h4><ul><li>Zumlangan holatda ko'rish maydoni tor bo'ladi: kamera bir tomonga qaraganda qolgan tomonlar ko'r zona.</li>" +
    "<li>Har burilish va har zum energiya oladi; eng yuqori iste'mol aynan shu paytda qayd etiladi.</li>" +
    "<li>Mexanik qismlar bor: motor, tishli uzatma, pozitsiya datchigi. Ular sovuqda va changda eskiradi.</li></ul>" +
    "<p class='ogoh'>Shuning uchun aylanuvchi kamera hech qachon yolg'iz qo'yilmaydi, agar obyektda uzluksiz nazorat kerak bo'lsa. U qo'zg'almas kamera yoki datchik bilan birga ishlaydi: datchik hodisani aniqlaydi, aylanuvchi kamera esa tafsilotni oladi.</p>",
  ru: { yorliq: "Техническая справка", sarlavha: "25-кратный зум: что даёт и чем платят",
    tana: "<p>Оптический зум показывает деталь на расстоянии: номер автомобиля со 100 метров, лицо человека с 50. Это позволяет закрыть большую территорию одной камерой.</p>" +
      "<h4>Чем платят</h4><ul><li>В приближении поле зрения узкое: пока камера смотрит в одну сторону, остальные направления — слепая зона.</li>" +
      "<li>Каждый поворот и каждый зум берут энергию; именно здесь фиксируется пиковое потребление.</li>" +
      "<li>Есть механика: мотор, редуктор, датчик положения. Они изнашиваются на морозе и в пыли.</li></ul>" +
      "<p class='ogoh'>Поэтому поворотную камеру не ставят в одиночку там, где нужен непрерывный контроль. Она работает в паре с неподвижной камерой или датчиком: датчик фиксирует событие, поворотная снимает деталь.</p>" }
},

"y03.k-ogoh": {
  yorliq: "Rahbariyat uchun", sarlavha: "Datasheet chegarasi: 3,5 quyoshli soat",
  tana: "<p>Ishlab chiqaruvchi komplektni sutkasiga 3,5 soatdan ko'p quyosh tushadigan joylar uchun belgilaydi. Bu shart bajarilmasa, ishlab chiqaruvchi kafolat bermaydi.</p>" +
    "<table><tr><th>Oy</th><th>Toshkentda quyoshli soat</th></tr>" +
    "<tr><td>Dekabr</td><td class='n'>≈2,5</td></tr>" +
    "<tr><td>Yanvar</td><td class='n'>≈2,9</td></tr>" +
    "<tr><td>Mart</td><td class='n'>≈5,5</td></tr></table>" +
    "<p>Ya'ni dekabr va yanvarda komplekt ishlab chiqaruvchi belgilagan shartdan tashqarida ishlaydi.</p>" +
    "<p class='ogoh'>Buni hujjatda ochiq yozish kerak. Yechim ikki chora bilan ishlaydi: qishki tungi rejim va ikkinchi akkumulyator. Ikkalasi ham loyihaga kiritiladi va pilot natijasi bo'yicha tasdiqlanadi. Shu ikkisisiz komplekt yanvarda to'xtaydi va bu sotuvchining aybi bo'lmaydi.</p>",
  ru: { yorliq: "Для правления", sarlavha: "Ограничение паспорта: 3,5 солнечных часа",
    tana: "<p>Производитель определяет комплект для мест, где солнце светит больше 3,5 часа в сутки. Если условие не выполняется, гарантия не действует.</p>" +
      "<table><tr><th>Месяц</th><th>Солнечных часов в Ташкенте</th></tr>" +
      "<tr><td>Декабрь</td><td class='n'>≈2,5</td></tr>" +
      "<tr><td>Январь</td><td class='n'>≈2,9</td></tr>" +
      "<tr><td>Март</td><td class='n'>≈5,5</td></tr></table>" +
      "<p>То есть в декабре и январе комплект работает за пределами заданных производителем условий.</p>" +
      "<p class='ogoh'>Это нужно не скрывать, а писать прямо. Решение работает за счёт двух мер: зимнего ночного режима и второго аккумулятора. Обе закладывают в проект и подтверждают по итогам пилота. Без них комплект встанет в январе, и вины поставщика в этом не будет.</p>" }
},

"y03.s-ir": {
  yorliq: "Texnik izoh", sarlavha: "IR yoritgich: byudjetning uchdan ikkisi",
  tana: "<p>IR yoqilganda kamera 7,98 Vt oladi. Dekabrda tun 14,6 soat davom etadi: agar yoritgich butun tun yonib tursa, u yolg'iz o'zi 116 Vt·soat oladi — panelning butun kunlik unumidan ko'p.</p>" +
    "<table><tr><th>Tungi rejim</th><th>Chiqim</th></tr>" +
    "<tr><td>IR doimiy yoqiq</td><td class='n'>116 Vt·soat</td></tr>" +
    "<tr><td>IR faqat hodisada, 40 ta hodisa</td><td class='n'>≈40 Vt·soat</td></tr>" +
    "<tr><td>Yengil uyqu + hodisada IR</td><td class='n'>≈48 Vt·soat</td></tr></table>" +
    "<p>Shuning uchun IR hech qachon doimiy yoqilmaydi. Kamera yengil uyquda turadi va faqat datchik ishlaganda to'liq quvvatga chiqadi.</p>" +
    "<p class='ogoh'>IR masofasi ham sozlanadi. 100 metrga o'rnatilgan yoritgich 40 metrlikdan ancha ko'p oladi. Ko'p obyektda 40 metr yetarli: bu darvoza va kirish yo'lini qoplaydi, uzoq perimetrni esa datchik kuzatadi.</p>",
  ru: { yorliq: "Техническая справка", sarlavha: "ИК-подсветка: две трети бюджета",
    tana: "<p>С включённой ИК камера берёт 7,98 Вт. В декабре ночь длится 14,6 часа: если подсветка горит всю ночь, она одна заберёт 116 Вт·ч — больше, чем панель вырабатывает за сутки.</p>" +
      "<table><tr><th>Ночной режим</th><th>Расход</th></tr>" +
      "<tr><td>ИК горит постоянно</td><td class='n'>116 Вт·ч</td></tr>" +
      "<tr><td>ИК только по событию, 40 событий</td><td class='n'>≈40 Вт·ч</td></tr>" +
      "<tr><td>Лёгкий сон + ИК по событию</td><td class='n'>≈48 Вт·ч</td></tr></table>" +
      "<p>Поэтому ИК никогда не оставляют включённой постоянно. Камера держится в лёгком сне и выходит на полную мощность только по срабатыванию датчика.</p>" +
      "<p class='ogoh'>Дальность ИК тоже настраивается. Подсветка, выставленная на 100 метров, берёт заметно больше, чем на 40. На большинстве объектов достаточно 40 метров: это закрывает ворота и подъезд, а дальний периметр контролирует датчик.</p>" }
},

"y03.s-tun": {
  yorliq: "Jamoa rahbarlari uchun", sarlavha: "Qishki tungi rejim: qanday ishlaydi",
  tana: "<p>Rejim kuz oxirida masofadan yoqiladi va mart oyida o'chiriladi. Uning mohiyati oddiy: kamera tunda o'z-o'zidan hech narsa qilmaydi va faqat tashqi sabab bo'lganda uyg'onadi.</p>" +
    "<h4>Rejim ichida nima o'zgaradi</h4><ul><li>18:00 dan 06:00 gacha kamera yengil uyquda turadi;</li>" +
    "<li>avtomatik tur va preset aylanishi o'chadi;</li>" +
    "<li>IR faqat harakat aniqlanganda yoqiladi;</li>" +
    "<li>hodisa klipi 40 soniya o'rniga 20 soniya bo'ladi;</li>" +
    "<li>operator jonli ko'rish imkonini saqlaydi, lekin platforma unga zaryadni ko'rsatadi.</li></ul>" +
    "<p>Natijada tungi chiqim 92 dan 48 Vt·soatga tushadi va sutkalik balans musbat bo'ladi.</p>" +
    "<p class='ogoh'>Rejim har obyekt uchun alohida yoqiladi, hammasiga birdaniga emas. Shaharning yorug' joyidagi obyektda IR umuman kerak bo'lmasligi mumkin, viloyatdagi qorong'i omborda esa rejim boshqacha sozlanadi.</p>",
  ru: { yorliq: "Для тимлида", sarlavha: "Зимний ночной режим: как он устроен",
    tana: "<p>Режим включают дистанционно в конце осени и снимают в марте. Суть простая: ночью камера ничего не делает по собственной инициативе и просыпается только по внешней причине.</p>" +
      "<h4>Что меняется внутри режима</h4><ul><li>с 18:00 до 06:00 камера держится в лёгком сне;</li>" +
      "<li>автоматические туры и обход пресетов выключаются;</li>" +
      "<li>ИК включается только при обнаружении движения;</li>" +
      "<li>клип события сокращается с 40 до 20 секунд;</li>" +
      "<li>живой просмотр оператору остаётся, но платформа показывает ему заряд.</li></ul>" +
      "<p>В итоге ночной расход падает с 92 до 48 Вт·ч, и суточный баланс становится положительным.</p>" +
      "<p class='ogoh'>Режим включают по каждому объекту отдельно, а не разом на всех. На объекте в освещённой части города ИК может не понадобиться вовсе, а на тёмном областном складе режим настраивают иначе.</p>" }
},

"y03.s-burilish": {
  yorliq: "Jamoa rahbarlari uchun", sarlavha: "Ko'r zona: aylanuvchi kameraning asosiy cheklovi",
  tana: "<p>Aylanuvchi kamera har doim bitta tomonga qaragan bo'ladi. Qolgan tomonlar shu payt ko'r zona: u yerda nima bo'layotganini kamera ham, platforma ham bilmaydi.</p>" +
    "<h4>Qanday yechiladi</h4><ul><li><b>Asosiy preset.</b> Kamera hodisa tugagach har doim asosiy presetga qaytadi — odatda bu asosiy darvoza.</li>" +
    "<li><b>Datchik bilan birga.</b> Perimetr datchigi yoki qo'zg'almas kamera hodisani aniqlaydi, aylanuvchi kamera esa tafsilotni oladi.</li>" +
    "<li><b>Qaytish nazorati.</b> Adapter preset buyrug'ining bajarilganini javobdan tasdiqlaydi. Tasdiq kelmasa hodisa kartasiga «kamera burilmadi» belgisi qo'yiladi.</li></ul>" +
    "<p class='ogoh'>Avtomatik tur (kamera presetlar bo'ylab doimiy aylanishi) qishda o'chiriladi. U energiyani ko'p oladi va ko'r zonani yo'qotmaydi — faqat uni vaqt bo'yicha ko'chiradi.</p>",
  ru: { yorliq: "Для тимлида", sarlavha: "Слепая зона: главное ограничение поворотной камеры",
    tana: "<p>Поворотная камера всегда смотрит в одну сторону. Остальные направления в этот момент — слепая зона: что там происходит, не знает ни камера, ни платформа.</p>" +
      "<h4>Как это решают</h4><ul><li><b>Основной пресет.</b> После события камера всегда возвращается в основное положение — обычно это главные ворота.</li>" +
      "<li><b>Связка с датчиком.</b> Периметровый датчик или неподвижная камера фиксируют событие, поворотная снимает деталь.</li>" +
      "<li><b>Контроль возврата.</b> Адаптер подтверждает выполнение команды пресета по ответу. Если подтверждения нет, на карточку события ставится отметка «камера не повернулась».</li></ul>" +
      "<p class='ogoh'>Автоматический тур (постоянный обход пресетов) зимой отключают. Он много ест и слепую зону не убирает — лишь сдвигает её во времени.</p>" }
},

"y03.q-tun": {
  yorliq: "Texnik izoh", sarlavha: "Tungi 92 Vt·soat nimadan iborat",
  tana: "<table><tr><th>Modda</th><th>Hisob</th><th>Vt·soat</th></tr>" +
    "<tr><td>Yengil uyqu, 14,6 soat</td><td>14,6 × 2,5</td><td class='n'>36,5</td></tr>" +
    "<tr><td>40 ta hodisa, IR bilan</td><td>40 × 40 s × 7,98 Vt</td><td class='n'>35,5</td></tr>" +
    "<tr><td>Burilish va preset</td><td>40 × 8 s × 15,5 Vt</td><td class='n'>13,8</td></tr>" +
    "<tr><td>Klip yuborish</td><td>4G oqim</td><td class='n'>6,2</td></tr>" +
    "<tr><td><b>Jami</b></td><td></td><td class='n'><b>92</b></td></tr></table>" +
    "<p>Eng katta uchta modda: yengil uyqu, IR va burilish. Ularning har biri sozlama bilan kamaytiriladi.</p>" +
    "<p class='ogoh'>Yengil uyquni chuqur uyquga almashtirish 36,5 Vt·soatni 0,7 Vt·soatga tushiradi, lekin shunda kamera masofadan buyruq qabul qilmaydi va operator jonli ko'ra olmaydi. Bu tanlov obyekt qiymatiga qarab qilinadi va loyiha hujjatiga yoziladi.</p>",
  ru: { yorliq: "Техническая справка", sarlavha: "Из чего складываются ночные 92 Вт·ч",
    tana: "<table><tr><th>Статья</th><th>Расчёт</th><th>Вт·ч</th></tr>" +
      "<tr><td>Лёгкий сон, 14,6 ч</td><td>14,6 × 2,5</td><td class='n'>36,5</td></tr>" +
      "<tr><td>40 событий с ИК</td><td>40 × 40 с × 7,98 Вт</td><td class='n'>35,5</td></tr>" +
      "<tr><td>Повороты и пресеты</td><td>40 × 8 с × 15,5 Вт</td><td class='n'>13,8</td></tr>" +
      "<tr><td>Отправка клипов</td><td>поток 4G</td><td class='n'>6,2</td></tr>" +
      "<tr><td><b>Итого</b></td><td></td><td class='n'><b>92</b></td></tr></table>" +
      "<p>Три крупнейшие статьи — лёгкий сон, ИК и повороты. Каждая уменьшается настройками.</p>" +
      "<p class='ogoh'>Замена лёгкого сна на глубокий снижает 36,5 Вт·ч до 0,7 Вт·ч, но тогда камера не принимает дистанционные команды и оператор не видит живую картинку. Этот выбор делают по стоимости объекта и записывают в проектную документацию.</p>" }
},

"y03.q-panel": {
  yorliq: "Montajchi uchun", sarlavha: "125 Vt panel: unum va uning dushmanlari",
  tana: "<p>Panel 0,6 m² yuzaga ega va uning unumi uch narsaga bog'liq: burchak, tozalik va soya.</p>" +
    "<table><tr><th>Omil</th><th>Unumga ta'siri</th></tr>" +
    "<tr><td>Qiyalik 30° o'rniga 55°</td><td class='n'>+20…25%</td></tr>" +
    "<tr><td>Chang qatlami</td><td class='n'>−10…25%</td></tr>" +
    "<tr><td>Yotgan qor</td><td class='n'>−100%</td></tr>" +
    "<tr><td>Bitta shox soyasi</td><td class='n'>−30…60%</td></tr>" +
    "<tr><td>Panel 20° burilgan</td><td class='n'>−6…10%</td></tr></table>" +
    "<p>Soya eng shafqatsiz omil: hujayralar ketma-ket ulangani uchun kichik soya butun panel quvvatini tushiradi.</p>" +
    "<p class='ogoh'>Unum grafigidagi to'satdan pasayish deyarli har doim ikki sababdan biri bilan izohlanadi: panel burilgan yoki uni biror narsa to'sgan. Platforma bu pasayishni avtomatik aniqlaydi va ko'rik vazifasini ochadi — obyektga aniq sabab bilan boriladi.</p>",
  ru: { yorliq: "Для монтажника", sarlavha: "Панель 125 Вт: выработка и её враги",
    tana: "<p>Площадь панели 0,6 м², и её выработка зависит от трёх вещей: угла, чистоты и тени.</p>" +
      "<table><tr><th>Фактор</th><th>Влияние на выработку</th></tr>" +
      "<tr><td>Наклон 55° вместо 30°</td><td class='n'>+20…25%</td></tr>" +
      "<tr><td>Слой пыли</td><td class='n'>−10…25%</td></tr>" +
      "<tr><td>Лежащий снег</td><td class='n'>−100%</td></tr>" +
      "<tr><td>Тень от одной ветки</td><td class='n'>−30…60%</td></tr>" +
      "<tr><td>Панель развернуло на 20°</td><td class='n'>−6…10%</td></tr></table>" +
      "<p>Тень — самый безжалостный фактор: ячейки соединены последовательно, поэтому небольшая тень роняет мощность всей панели.</p>" +
      "<p class='ogoh'>Резкое падение на графике выработки почти всегда объясняется одной из двух причин: панель развернуло или её что-то закрыло. Платформа выявляет такое падение автоматически и открывает задачу на осмотр — на объект едут не наугад, а с конкретной причиной.</p>" }
},

"y03.q-balans": {
  yorliq: "Jamoa rahbarlari uchun", sarlavha: "Nol balans nimani anglatadi",
  tana: "<p>Sutkalik balans nolga teng bo'lsa, tizim ideal ob-havoda ishlaydi va har bulutli kun akkumulyatordan olinadi. Bu barqaror holat emas, bu chegara holati.</p>" +
    "<table><tr><th>Ketma-ket bulutli kun</th><th>Zaryad</th></tr>" +
    "<tr><td>1</td><td class='n'>78%</td></tr>" +
    "<tr><td>2</td><td class='n'>56%</td></tr>" +
    "<tr><td>3</td><td class='n'>34%</td></tr>" +
    "<tr><td>4</td><td class='n'>12%</td></tr></table>" +
    "<p>To'rtinchi kuni kontroller yuklamani uzadi. Quyosh chiqqach akkumulyator to'lishi uchun bir necha ochiq kun kerak bo'ladi — ya'ni bitta bulutli hafta obyektni o'n kunga nazoratsiz qoldirishi mumkin.</p>" +
    "<p class='ogoh'>Loyihalash qoidasi oddiy: balans nolga teng bo'lmasin, kamida 20% musbat bo'lsin. Buni qishki rejim bilan, ikkinchi akkumulyator bilan yoki panel quvvatini oshirish bilan ta'minlash mumkin — uchala yo'l ham hisobda ko'rsatiladi va narxi bilan solishtiriladi.</p>",
  ru: { yorliq: "Для тимлида", sarlavha: "Что означает нулевой баланс",
    tana: "<p>Нулевой суточный баланс означает, что система работает при идеальной погоде, а каждый пасмурный день вычитается из аккумулятора. Это не устойчивое состояние, а граничное.</p>" +
      "<table><tr><th>Пасмурных дней подряд</th><th>Заряд</th></tr>" +
      "<tr><td>1</td><td class='n'>78%</td></tr>" +
      "<tr><td>2</td><td class='n'>56%</td></tr>" +
      "<tr><td>3</td><td class='n'>34%</td></tr>" +
      "<tr><td>4</td><td class='n'>12%</td></tr></table>" +
      "<p>На четвёртый день контроллер отключает нагрузку. Чтобы аккумулятор снова наполнился, нужно несколько ясных дней — то есть одна пасмурная неделя способна оставить объект без контроля на десять суток.</p>" +
      "<p class='ogoh'>Правило проектирования простое: баланс не должен быть нулевым, минимум +20%. Этого добиваются зимним режимом, вторым аккумулятором или большей панелью — все три пути показывают в расчёте и сравнивают по цене.</p>" }
},

"y03.q-rejim": {
  yorliq: "Jamoa rahbarlari uchun", sarlavha: "Rejimni kim va qachon yoqadi",
  tana: "<p>Qishki rejim mavsumiy operatsiya sifatida rasmiylashtiriladi, aks holda u unutiladi yoki noto'g'ri vaqtda yoqiladi.</p>" +
    "<table><tr><th>Sana</th><th>Amal</th><th>Kim</th></tr>" +
    "<tr><td>1-noyabr</td><td>Qishki rejim barcha quyoshli obyektlarda yoqiladi</td><td>Tizim ma'muri</td></tr>" +
    "<tr><td>Dekabr–yanvar</td><td>Zaryadning kunlik eng past qiymati kuzatiladi</td><td>Platforma avtomatik</td></tr>" +
    "<tr><td>15-mart</td><td>Rejim o'chiriladi, to'liq nazorat tiklanadi</td><td>Tizim ma'muri</td></tr></table>" +
    "<p>Har yoqish va o'chirish jurnalga yoziladi. Hodisa bo'lganda birinchi savol «kamera qaysi rejimda edi» bo'ladi va javob shu jurnalda turadi.</p>" +
    "<p class='ogoh'>Rejim nazoratni butunlay o'chirmaydi: datchik ishlaganda kamera to'liq quvvatga chiqadi va yozadi. U faqat kameraning o'z tashabbusi bilan qiladigan ishlarini — avtomatik tur, doimiy IR, uzun kliplarni — to'xtatadi.</p>",
  ru: { yorliq: "Для тимлида", sarlavha: "Кто и когда включает режим",
    tana: "<p>Зимний режим оформляют как сезонную операцию, иначе о нём забудут или включат не вовремя.</p>" +
      "<table><tr><th>Дата</th><th>Действие</th><th>Кто</th></tr>" +
      "<tr><td>1 ноября</td><td>Зимний режим включается на всех солнечных объектах</td><td>Администратор системы</td></tr>" +
      "<tr><td>Декабрь–январь</td><td>Ведётся минимальный суточный заряд</td><td>Платформа автоматически</td></tr>" +
      "<tr><td>15 марта</td><td>Режим снимается, контроль восстанавливается полностью</td><td>Администратор системы</td></tr></table>" +
      "<p>Каждое включение и выключение пишется в журнал. При происшествии первый вопрос — «в каком режиме была камера», и ответ лежит в этом журнале.</p>" +
      "<p class='ogoh'>Режим не отключает контроль: при срабатывании датчика камера выходит на полную мощность и пишет. Он останавливает только то, что камера делает по собственной инициативе, — автоматический тур, постоянную ИК, длинные клипы.</p>" }
},

"y03.u-ogoh": {
  yorliq: "Montajchi uchun", sarlavha: "Eski ustunga qo'yish: eng qimmat xato",
  tana: "<p>Maydonda turgan eski yoritish ustuni yoki devor kronshteyni bepul ko'rinadi. Amalda esa u 125 Vt panelning shamol yukiga hisoblanmagan.</p>" +
    "<h4>Nima bo'ladi</h4><ul><li>Bahorgi birinchi kuchli shamolda kronshteyn buraladi yoki uziladi.</li>" +
    "<li>Panel yerga tushadi, kamera kabeli bilan osilib qoladi.</li>" +
    "<li>Eski ustunning o'zi egiladi — u yengil yoritgichga hisoblangan.</li></ul>" +
    "<p>Tuzatish narxi yangi ustun, yangi panel va ikkinchi montaj brigadasidan iborat bo'ladi. Ya'ni «tejalgan» ikki million so'm o'rniga sakkiz million sarflanadi.</p>" +
    "<p class='ogoh'>Qoida oddiy: 125 Vt panel qo'yiladigan har ustun uchun loyihachi hisobi bo'lishi kerak va u kim tomonidan bajarilishi shartnomada yozilishi kerak. Ixcham PT komplektida (kichik panel) bu talab qo'llanmaydi — u devor kronshteyniga bemalol qo'yiladi.</p>",
  ru: { yorliq: "Для монтажника", sarlavha: "Поставить на старую опору — самая дорогая ошибка",
    tana: "<p>Стоящий на площадке старый фонарный столб или стеновой кронштейн выглядит бесплатным решением. На деле он не рассчитан на ветровую нагрузку панели 125 Вт.</p>" +
      "<h4>Что происходит</h4><ul><li>При первом сильном весеннем ветре кронштейн разворачивает или срывает.</li>" +
      "<li>Панель падает и повисает на кабеле камеры.</li>" +
      "<li>Сама старая опора гнётся — она считалась под лёгкий светильник.</li></ul>" +
      "<p>Исправление складывается из новой опоры, новой панели и второго выезда бригады. То есть вместо «сэкономленных» двух миллионов сум тратится восемь.</p>" +
      "<p class='ogoh'>Правило простое: под каждую опору с панелью 125 Вт нужен расчёт проектировщика, и в договоре должно быть записано, кто его делает. К компактному PT-комплекту с маленькой панелью это требование не относится — он спокойно ставится на стеновой кронштейн.</p>" }
},

"y03.y-auto": {
  yorliq: "Jamoa rahbarlari uchun", sarlavha: "Auto Register: kamera o'zi chiqadi",
  tana: "<p>SIM-kartada oq IP yo'q, shuning uchun markaz kameraga o'zi ulana olmaydi. Auto Register rejimida kamera serverga o'zi ro'yxatdan o'tadi va shundan keyin barcha buyruqlar shu kanal orqali yuriladi.</p>" +
    "<h4>Sozlashda nima kiritiladi</h4><ul><li>server manzili va porti;</li><li>qurilma identifikatori — reyestrdagi raqam bilan bir xil;</li><li>ro'yxatdan o'tish oralig'i va qayta ulanish siyosati.</li></ul>" +
    "<p>Ishlab chiqaruvchining o'z platformasi bu rolni bajaradi, lekin u litsenziya va alohida server talab qiladi. Adapter shu funksiyani o'zi bajarishi mumkin, agar qabul qiluvchi tomon protokoli ochiq bo'lsa.</p>" +
    "<p class='ogoh'>Protokol ochiqligi tender savoliga aylanadi. Yopiq bo'lsa, ikkita brend uchun ikkita vendor platformasini saqlashga to'g'ri keladi — bu bankka ikki litsenziya, ikki server va ikki xil operator interfeysi degani. Bunday holatda korporativ APN arzonroq chiqadi.</p>",
  ru: { yorliq: "Для тимлида", sarlavha: "Auto Register: камера выходит сама",
    tana: "<p>Белого IP у SIM нет, поэтому центр не может подключиться к камере. В режиме Auto Register камера сама регистрируется на сервере, и дальше все команды идут по этому каналу.</p>" +
      "<h4>Что вводят при настройке</h4><ul><li>адрес и порт сервера;</li><li>идентификатор устройства — совпадает с номером в реестре;</li><li>интервал регистрации и политику переподключения.</li></ul>" +
      "<p>Эту роль выполняет платформа производителя, но она требует лицензии и отдельного сервера. Адаптер может взять функцию на себя, если протокол приёмной стороны открыт.</p>" +
      "<p class='ogoh'>Открытость протокола становится тендерным вопросом. Если он закрыт, под два бренда придётся держать две вендорские платформы — две лицензии, два сервера и два разных интерфейса для оператора. В такой ситуации корпоративный APN выходит дешевле.</p>" }
},

"y03.y-apn": {
  yorliq: "Jamoa rahbarlari uchun", sarlavha: "Korporativ APN: brenddan mustaqillik",
  tana: "<p>Korporativ APN'da kamera bankning yopiq tarmog'ida 10.x manzil oladi. Adapter unga to'g'ridan-to'g'ri murojaat qiladi: RTSP, CGI va ONVIF hech qanday oraliq serversiz ishlaydi.</p>" +
    "<h4>Nima uchun bu muhim</h4><p>Ikkala brend ham o'z platformasiga chiqishni taklif qiladi. Ikkita vendor platformasini saqlash esa bankka ikki litsenziya va ikki xil ish tartibi degani. APN bu muammoni butunlay olib tashlaydi: qaysi brend turishidan qat'i nazar, adapter bitta sxema bilan ishlaydi.</p>" +
    "<p>Tenderda bu qaror narxga ham ta'sir qiladi: brenddan mustaqil sxemada Hikvision va Dahua bir xil shartda raqobatlashadi.</p>" +
    "<p class='ogoh'>APN'ga o'tishdan oldin qamrov masalasi hal qilinadi. Bitta operator butun respublikada bir xil ishlamaydi; ikkinchi operator esa ikkinchi APN va ikkinchi marshrutlash sxemasi degani.</p>",
  ru: { yorliq: "Для тимлида", sarlavha: "Корпоративный APN: независимость от бренда",
    tana: "<p>В корпоративном APN камера получает адрес 10.x в закрытой сети банка. Адаптер обращается к ней напрямую: RTSP, CGI и ONVIF работают без промежуточного сервера.</p>" +
      "<h4>Почему это важно</h4><p>Оба бренда предлагают выход на собственную платформу. Держать две вендорские платформы — это две лицензии и два разных порядка работы. APN снимает проблему целиком: какой бы бренд ни стоял, адаптер работает по одной схеме.</p>" +
      "<p>В тендере это решение влияет и на цену: в схеме, не зависящей от бренда, Hikvision и Dahua конкурируют на равных условиях.</p>" +
      "<p class='ogoh'>До перехода на APN закрывают вопрос покрытия. Один оператор не работает одинаково по всей стране; второй оператор — это второй APN и вторая схема маршрутизации.</p>" }
},

"y03.p-hodisa": {
  yorliq: "Jamoa rahbarlari uchun", sarlavha: "Yurak urishi: aloqani qanday tekshirish",
  tana: "<p>Adapter hodisalarga obuna bo'ladi va kameradan har besh soniyada yurak urishi signalini oladi. Uchta signal kelmasa kamera «aloqasiz» deb belgilanadi.</p>" +
    "<table><tr><th>Holat</th><th>Nima qilinadi</th></tr>" +
    "<tr><td>1–2 signal kelmadi</td><td>Kutiladi, holat o'zgarmaydi</td></tr>" +
    "<tr><td>3 signal kelmadi</td><td>«Aloqasiz» holati, qayta ulanish boshlanadi</td></tr>" +
    "<tr><td>5 daqiqa tiklanmadi</td><td><code>aloqa_yoq</code> hodisasi ochiladi</td></tr>" +
    "<tr><td>Tiklandi</td><td>Uzilish oralig'idagi hodisalar so'raladi</td></tr></table>" +
    "<p>Yurak urishi oralig'i sozlanadi. Uni qisqartirish uzilishni tezroq aniqlaydi, lekin trafikni va kameraning energiyasini oshiradi.</p>" +
    "<p class='ogoh'>4G tarmog'ida kuniga bir necha marta qisqa uzilish bo'lishi normal. Har uzilishni hodisa sifatida ochish operatorni ko'mib tashlaydi: shuning uchun besh daqiqalik chegara qo'yilgan va qisqa uzilishlar faqat statistika sifatida yig'iladi.</p>",
  ru: { yorliq: "Для тимлида", sarlavha: "Heartbeat: как проверяют связь",
    tana: "<p>Адаптер подписывается на события и получает от камеры сигнал heartbeat каждые пять секунд. Если не пришли три сигнала, камера помечается как «без связи».</p>" +
      "<table><tr><th>Ситуация</th><th>Что делается</th></tr>" +
      "<tr><td>Не пришли 1–2 сигнала</td><td>Ждём, состояние не меняется</td></tr>" +
      "<tr><td>Не пришли 3 сигнала</td><td>Состояние «без связи», начинается переподключение</td></tr>" +
      "<tr><td>Не восстановилось за 5 минут</td><td>Открывается событие <code>aloqa_yoq</code></td></tr>" +
      "<tr><td>Восстановилось</td><td>Запрашиваются события за время обрыва</td></tr></table>" +
      "<p>Интервал heartbeat настраивается. Сокращение ускоряет обнаружение обрыва, но увеличивает трафик и расход энергии камеры.</p>" +
      "<p class='ogoh'>В сети 4G несколько коротких обрывов в сутки — норма. Открывать событие на каждый обрыв — значит завалить оператора: поэтому и стоит пятиминутный порог, а короткие обрывы копятся только как статистика.</p>" }
},

"y03.p-ptz": {
  yorliq: "Jamoa rahbarlari uchun", sarlavha: "Preset ro'yxati: montajda tuziladi",
  tana: "<p>Kamerada 300 ta preset va sakkizta tur bor, lekin amalda 6–10 tasi ishlatiladi. Ular montajda tuziladi va har biriga nima ko'rinishi yozib olinadi.</p>" +
    "<table><tr><th>Preset</th><th>Nima ko'rinadi</th><th>Qachon chaqiriladi</th></tr>" +
    "<tr><td class='n'>1</td><td>Asosiy darvoza</td><td>Standart holat, hodisadan keyin qaytish</td></tr>" +
    "<tr><td class='n'>2</td><td>Orqa kirish</td><td>Orqa perimetr chizig'i kesilganda</td></tr>" +
    "<tr><td class='n'>3</td><td>Ombor eshigi</td><td>Eshik datchigi ishlaganda</td></tr>" +
    "<tr><td class='n'>4</td><td>Transport maydoni</td><td>Kechqurun, texnika turgan zona</td></tr></table>" +
    "<p>Ro'yxat adapterga kiritiladi va dalolatnomaga ilova qilinadi. Hodisa turi bilan preset o'rtasidagi bog'lanish shu jadvalda saqlanadi.</p>" +
    "<p class='ogoh'>Preset raqamlari mikrodastur yangilanganda saqlanadi, lekin kamera to'liq qayta sozlanganda yo'qoladi. Shuning uchun ro'yxat qog'ozda ham, platformada ham saqlanadi: uni tiklash uchun obyektga borish kerak bo'lmasin.</p>",
  ru: { yorliq: "Для тимлида", sarlavha: "Список пресетов: составляется на монтаже",
    tana: "<p>В камере 300 пресетов и восемь туров, но на практике используются 6–10. Их задают на монтаже и по каждому записывают, что именно попадает в кадр.</p>" +
      "<table><tr><th>Пресет</th><th>Что видно</th><th>Когда вызывается</th></tr>" +
      "<tr><td class='n'>1</td><td>Главные ворота</td><td>Штатное положение, возврат после события</td></tr>" +
      "<tr><td class='n'>2</td><td>Задний вход</td><td>При пересечении задней линии периметра</td></tr>" +
      "<tr><td class='n'>3</td><td>Ворота склада</td><td>При срабатывании дверного датчика</td></tr>" +
      "<tr><td class='n'>4</td><td>Площадка техники</td><td>Вечером, зона стоянки</td></tr></table>" +
      "<p>Список заносят в адаптер и прикладывают к акту. Связка «тип события — пресет» хранится в этой же таблице.</p>" +
      "<p class='ogoh'>Номера пресетов переживают обновление прошивки, но теряются при полном сбросе камеры. Поэтому список хранят и на бумаге, и в платформе: восстанавливать его выездом на объект недопустимо.</p>" }
},

"y03.p-yagona": {
  yorliq: "Jamoa rahbarlari uchun", sarlavha: "Ikki brend, bitta ro'yxat",
  tana: "<p>Adapter har brendning o'z kodlarini yagona ro'yxatga keltiradi. Platforma brendni bilmaydi va bilmasligi ham kerak.</p>" +
    "<table><tr><th>Yagona tur</th><th>Dahua</th><th>Hikvision</th></tr>" +
    "<tr><td>harakat</td><td><code>VideoMotion</code></td><td><code>VMD</code></td></tr>" +
    "<tr><td>chiziqni kesish</td><td><code>CrossLineDetection</code></td><td><code>linedetection</code></td></tr>" +
    "<tr><td>hudud</td><td><code>CrossRegionDetection</code></td><td><code>fielddetection</code></td></tr>" +
    "<tr><td>niqoblash</td><td><code>VideoBlind</code></td><td><code>tamperdetection</code></td></tr></table>" +
    "<p>Yangi brend qo'shilganda faqat shu jadvalga qator qo'shiladi. Platforma, hisobotlar, indekslar va muddatlar o'zgarmaydi.</p>" +
    "<p class='ogoh'>Aynan shu jadval keyingi tenderni ochiq qiladi. Uning yo'qligi esa bankni bir brendga bog'lab qo'yadi: adapter qayta yozilmaguncha boshqa jihoz olinmaydi, ya'ni narx raqobati yo'qoladi.</p>",
  ru: { yorliq: "Для тимлида", sarlavha: "Два бренда, один перечень",
    tana: "<p>Адаптер сводит коды каждого бренда к единому перечню. Платформа не знает бренда — и знать не должна.</p>" +
      "<table><tr><th>Единый тип</th><th>Dahua</th><th>Hikvision</th></tr>" +
      "<tr><td>движение</td><td><code>VideoMotion</code></td><td><code>VMD</code></td></tr>" +
      "<tr><td>пересечение линии</td><td><code>CrossLineDetection</code></td><td><code>linedetection</code></td></tr>" +
      "<tr><td>зона</td><td><code>CrossRegionDetection</code></td><td><code>fielddetection</code></td></tr>" +
      "<tr><td>саботаж</td><td><code>VideoBlind</code></td><td><code>tamperdetection</code></td></tr></table>" +
      "<p>При добавлении нового бренда в таблицу добавляется строка. Платформа, отчёты, индексы и сроки не меняются.</p>" +
      "<p class='ogoh'>Именно эта таблица делает следующий тендер открытым. Её отсутствие привязывает банк к одному бренду: пока адаптер не переписан, другое оборудование не закупить — то есть ценовая конкуренция исчезает.</p>" }
},

"y03.o-zum": {
  yorliq: "Texnik izoh", sarlavha: "Zum va burilish: eng qimmat amal",
  tana: "<p>Operator zumlab, burib ko'rganda kamera bir vaqtning o'zida motorni, IR yoritgichni va 4G oqimini ishlatadi. Bu 15,49 Vt gacha ko'tariladi — kutish rejimidan uch yuz barobar ko'p.</p>" +
    "<table><tr><th>Amal</th><th>Davomiyligi</th><th>Sarf</th></tr>" +
    "<tr><td>Bitta presetga burilish</td><td>≈8 s</td><td class='n'>0,034 Vt·soat</td></tr>" +
    "<tr><td>Qo'lda burish, 1 daqiqa</td><td>60 s</td><td class='n'>0,26 Vt·soat</td></tr>" +
    "<tr><td>Jonli ko'rish, 5 daqiqa</td><td>300 s</td><td class='n'>0,38 Vt·soat</td></tr></table>" +
    "<p>Bitta uzoq sessiya katta zarar qilmaydi. Muammo takrorlanishda: har kecha o'nta besh daqiqalik sessiya sutkalik byudjetning uchdan birini oladi.</p>" +
    "<p class='ogoh'>Platforma operatorga zaryad darajasini ko'rsatadi va u 30% dan pastga tushganda jonli ko'rishni cheklaydi: ruxsat faqat mas'ul xodim tasdig'i bilan beriladi. Bu cheklov qishda obyektni tirik saqlaydi.</p>",
  ru: { yorliq: "Техническая справка", sarlavha: "Зум и поворот: самое дорогое действие",
    tana: "<p>Когда оператор приближает и поворачивает камеру, одновременно работают мотор, ИК-подсветка и поток 4G. Потребление доходит до 15,49 Вт — в триста раз больше дежурного режима.</p>" +
      "<table><tr><th>Действие</th><th>Длительность</th><th>Расход</th></tr>" +
      "<tr><td>Переход на пресет</td><td>≈8 с</td><td class='n'>0,034 Вт·ч</td></tr>" +
      "<tr><td>Ручной поворот, 1 минута</td><td>60 с</td><td class='n'>0,26 Вт·ч</td></tr>" +
      "<tr><td>Живой просмотр, 5 минут</td><td>300 с</td><td class='n'>0,38 Вт·ч</td></tr></table>" +
      "<p>Одна долгая сессия большого вреда не наносит. Проблема в повторяемости: десять пятиминутных сессий за ночь забирают треть суточного бюджета.</p>" +
      "<p class='ogoh'>Платформа показывает оператору уровень заряда и ограничивает живой просмотр, когда он опускается ниже 30%: доступ даётся только с подтверждения ответственного сотрудника. Зимой это ограничение и сохраняет объект живым.</p>" }
},

"y03.o-preset": {
  yorliq: "Jamoa rahbarlari uchun", sarlavha: "Hodisa → preset → klip: uch bosqich",
  tana: "<p>Zanjir avtomatik ishlaydi va uning har bosqichi alohida tekshiriladi.</p>" +
    "<ol><li><b>Hodisa keladi.</b> Perimetr chizig'i kesildi yoki eshik datchigi ishladi.</li>" +
    "<li><b>Adapter presetni chaqiradi.</b> Hodisa turiga mos preset raqami jadvaldan olinadi.</li>" +
    "<li><b>Kamera buriladi va yozadi.</b> Buyruq bajarilgani javobdan tasdiqlanadi.</li>" +
    "<li><b>Klip hodisa kartasiga bog'lanadi.</b> Kamera asosiy presetga qaytadi.</li></ol>" +
    "<h4>Nima xato ketishi mumkin</h4><p>Burilish 3–8 soniya davom etadi. Agar odam tez harakatlansa, kamera yetib kelganda u allaqachon o'tib ketgan bo'ladi. Shuning uchun perimetr datchigi kirish nuqtasidan uzoqroqqa qo'yiladi: kameraga burilish uchun vaqt kerak.</p>" +
    "<p class='ogoh'>Tasdiq kelmasa hodisa kartasiga «kamera burilmadi» belgisi qo'yiladi. Bu belgi takrorlansa, motor yoki pozitsiya datchigi ishdan chiqqan degani va ko'rik vazifasi ochiladi.</p>",
  ru: { yorliq: "Для тимлида", sarlavha: "Событие → пресет → клип: три шага",
    tana: "<p>Цепочка работает автоматически, и каждый её шаг проверяется отдельно.</p>" +
      "<ol><li><b>Приходит событие.</b> Пересечена линия периметра или сработал дверной датчик.</li>" +
      "<li><b>Адаптер вызывает пресет.</b> Номер берётся из таблицы соответствия типу события.</li>" +
      "<li><b>Камера поворачивается и пишет.</b> Выполнение команды подтверждается ответом.</li>" +
      "<li><b>Клип привязывается к карточке события.</b> Камера возвращается в основной пресет.</li></ol>" +
      "<h4>Что может пойти не так</h4><p>Поворот занимает 3–8 секунд. Если человек идёт быстро, к моменту доворота он уже прошёл. Поэтому периметровый датчик ставят не у самого входа, а дальше от него: камере нужно время на поворот.</p>" +
      "<p class='ogoh'>Если подтверждение не пришло, на карточку ставится отметка «камера не повернулась». Повторение такой отметки означает отказ мотора или датчика положения, и открывается задача на осмотр.</p>" }
},

"y03.o-rejim": {
  yorliq: "Jamoa rahbarlari uchun", sarlavha: "Operator qishki rejimda nimani yo'qotadi",
  tana: "<p>Ochiq aytish kerak: qishki rejim nazoratni biroz zaiflashtiradi. Buni loyihada yashirish keyinchalik ishonchsizlikka olib keladi.</p>" +
    "<table><tr><th>Imkoniyat</th><th>Yozgi rejim</th><th>Qishki rejim</th></tr>" +
    "<tr><td>Hodisa yozuvi</td><td>to'liq</td><td>to'liq</td></tr>" +
    "<tr><td>Klip uzunligi</td><td>40 s</td><td>20 s</td></tr>" +
    "<tr><td>Avtomatik tur</td><td>ha</td><td>yo'q</td></tr>" +
    "<tr><td>Jonli ko'rish</td><td>cheklovsiz</td><td>zaryadga qarab</td></tr>" +
    "<tr><td>Javob vaqti</td><td>3–6 s</td><td>5–10 s</td></tr></table>" +
    "<p>Eng muhimi o'zgarmaydi: hodisa aniqlanadi, yoziladi va platformaga yetkaziladi. Qisqarish faqat qo'shimcha imkoniyatlarga tegadi.</p>" +
    "<p class='ogoh'>Agar obyekt shu darajadagi nazoratga ham rozi bo'lmasa, u boshqa yechimga o'tkaziladi: quyoshga tayangan komplekt dekabrda ko'proq bera olmaydi. Bu jihoz sifati masalasi emas, fizika masalasi.</p>",
  ru: { yorliq: "Для тимлида", sarlavha: "Что оператор теряет в зимнем режиме",
    tana: "<p>Говорить нужно прямо: зимний режим немного ослабляет контроль. Умолчать об этом в проекте — значит получить недоверие позже.</p>" +
      "<table><tr><th>Возможность</th><th>Летний режим</th><th>Зимний режим</th></tr>" +
      "<tr><td>Запись события</td><td>полная</td><td>полная</td></tr>" +
      "<tr><td>Длина клипа</td><td>40 с</td><td>20 с</td></tr>" +
      "<tr><td>Автоматический тур</td><td>да</td><td>нет</td></tr>" +
      "<tr><td>Живой просмотр</td><td>без ограничений</td><td>по уровню заряда</td></tr>" +
      "<tr><td>Время реакции</td><td>3–6 с</td><td>5–10 с</td></tr></table>" +
      "<p>Главное не меняется: событие обнаруживается, записывается и доходит до платформы. Урезаются только дополнительные возможности.</p>" +
      "<p class='ogoh'>Если объект не устраивает и такой уровень контроля, его переводят на другое решение: комплект на солнце в декабре больше дать не может. Это вопрос не качества оборудования, а физики.</p>" }
},

"y03.m-poydevor": {
  yorliq: "Montajchi uchun", sarlavha: "Poydevor: beton nechta kun quvvat oladi",
  tana: "<p>Ustunli variantda ish ikki kunga bo'linadi va bu rejaga oldindan kiritiladi.</p>" +
    "<table><tr><th>Bosqich</th><th>Muddat</th></tr>" +
    "<tr><td>Chuqur qazish va anker guruhini o'rnatish</td><td>3–4 soat</td></tr>" +
    "<tr><td>Beton quyish</td><td>1–2 soat</td></tr>" +
    "<tr><td>Beton quvvat olishi</td><td>kamida 7 kun</td></tr>" +
    "<tr><td>Ustun ko'tarish va jihoz montaji</td><td>4–6 soat</td></tr></table>" +
    "<p>Betonning yetti kunlik muddati shoshilinch ravishda qisqartirilmaydi. Yetarli quvvat olmagan poydevorda ustun birinchi shamol mavsumida egiladi va uni tuzatish butun konstruksiyani qayta qurish degani.</p>" +
    "<p class='ogoh'>Qishda beton quyish alohida masala: harorat +5 °C dan past bo'lsa, maxsus qo'shimchalar yoki isitish kerak bo'ladi. Montaj rejasi tuzilayotganda ustunli obyektlar iliq mavsumga qo'yiladi, qish esa devor kronshteynli obyektlarga qoldiriladi.</p>",
  ru: { yorliq: "Для монтажника", sarlavha: "Фундамент: сколько дней набирает бетон",
    tana: "<p>В варианте с опорой работа делится на два дня, и это закладывают в план заранее.</p>" +
      "<table><tr><th>Этап</th><th>Срок</th></tr>" +
      "<tr><td>Копка и установка анкерной группы</td><td>3–4 часа</td></tr>" +
      "<tr><td>Заливка бетона</td><td>1–2 часа</td></tr>" +
      "<tr><td>Набор прочности</td><td>не менее 7 дней</td></tr>" +
      "<tr><td>Подъём опоры и монтаж оборудования</td><td>4–6 часов</td></tr></table>" +
      "<p>Семь дней на набор прочности не сокращают в спешке. На недобравшем прочность фундаменте опора поведёт в первый же ветреный сезон, а исправление означает перестройку всей конструкции.</p>" +
      "<p class='ogoh'>Зимняя заливка — отдельная тема: при температуре ниже +5 °C нужны противоморозные добавки или прогрев. При составлении плана монтажа объекты с опорами ставят на тёплый сезон, а зиму оставляют объектам со стеновым кронштейном.</p>" }
},

"y03.m-yerga": {
  yorliq: "Montajchi uchun", sarlavha: "Yerga ulash: momaqaldiroq va eng baland nuqta",
  tana: "<p>Ochiq maydondagi to'rt metrli metall ustun atrofdagi eng baland nuqtaga aylanadi. Momaqaldiroq paytida u chaqmoq uchun tabiiy nishon bo'ladi.</p>" +
    "<h4>Nima qilinadi</h4><ul><li>yerga ulash konturi: kamida ikkita elektrod, o'zaro tutashtirilgan;</li>" +
    "<li>quvvat liniyasida uzatgich himoyasi (SPD), panel va akkumulyator zanjirida;</li>" +
    "<li>kamera korpusi ustunga ishonchli elektr bog'langan bo'lishi;</li>" +
    "<li>koaksial antenna kabelida ham himoya.</li></ul>" +
    "<p>Himoyasiz ustunda birinchi yozgi momaqaldiroq kontrollerni, kamerani va routerni bir vaqtda kuydiradi. Bu odatda kafolat hodisasi sifatida qabul qilinmaydi.</p>" +
    "<p class='ogoh'>Yerga ulash qarshiligi o'lchanadi va dalolatnomaga yoziladi. O'lchov natijasi yo'q bo'lsa, ish bajarilgan deb hisoblanmaydi: «yerga ulandi» degan yozuv o'lchovni almashtirmaydi.</p>",
  ru: { yorliq: "Для монтажника", sarlavha: "Заземление: гроза и самая высокая точка",
    tana: "<p>Четырёхметровая металлическая опора на открытой площадке становится самой высокой точкой вокруг. В грозу это естественная мишень для молнии.</p>" +
      "<h4>Что делают</h4><ul><li>контур заземления: не менее двух электродов, соединённых между собой;</li>" +
      "<li>устройства защиты от импульсных перенапряжений в цепи панели и аккумулятора;</li>" +
      "<li>надёжная электрическая связь корпуса камеры с опорой;</li>" +
      "<li>защита и на коаксиальном антенном кабеле.</li></ul>" +
      "<p>На незащищённой опоре первая летняя гроза выжигает контроллер, камеру и роутер разом. Страховым или гарантийным случаем это обычно не признают.</p>" +
      "<p class='ogoh'>Сопротивление заземления замеряют и вносят в акт. Без результата замера работа не считается выполненной: запись «заземлено» замер не заменяет.</p>" }
},

"y03.m-preset": {
  yorliq: "Montajchi uchun", sarlavha: "Presetlar montajda tuziladi va hujjatlashtiriladi",
  tana: "<p>Preset — bu kameraning saqlangan holati: burilish burchagi, qiyalik va zum darajasi. Ular obyekt geometriyasiga qarab tuziladi va ularni keyinchalik uzoqdan tiklash qiyin.</p>" +
    "<h4>Har preset uchun yoziladi</h4><ul><li>raqami;</li><li>nima ko'rinishi — bir jumla bilan;</li><li>qaysi hodisa turiga bog'langani;</li><li>kadr surati.</li></ul>" +
    "<p>Ro'yxat dalolatnomaga ilova qilinadi va platformaga kiritiladi. Kamera to'liq qayta sozlansa, presetlar shu ro'yxat bo'yicha tiklanadi.</p>" +
    "<p class='ogoh'>Montajda eng ko'p e'tibordan chetda qoladigan narsa — asosiy preset. Kamera hodisadan keyin qayerga qaytishi kerak degan savolga aniq javob bo'lishi shart, aks holda u oxirgi buyruq berilgan tomonda qolib ketadi va keyingi hodisa noto'g'ri tomonda yoziladi.</p>",
  ru: { yorliq: "Для монтажника", sarlavha: "Пресеты задают на монтаже и документируют",
    tana: "<p>Пресет — это сохранённое положение камеры: угол поворота, наклон и степень зума. Их задают по геометрии объекта, и восстановить их потом дистанционно трудно.</p>" +
      "<h4>По каждому пресету записывают</h4><ul><li>номер;</li><li>что попадает в кадр — одной фразой;</li><li>к какому типу события он привязан;</li><li>снимок кадра.</li></ul>" +
      "<p>Список прикладывают к акту и заносят в платформу. При полном сбросе камеры пресеты восстанавливают по этому списку.</p>" +
      "<p class='ogoh'>Чаще всего на монтаже упускают основной пресет. На вопрос, куда камера возвращается после события, должен быть однозначный ответ, иначе она останется в последнем заданном положении, и следующее событие запишется не в ту сторону.</p>" }
},

"y03.n-ustun": {
  yorliq: "Moliya va huquq", sarlavha: "Ustun va poydevor: unutiladigan qator",
  tana: "<p>Jihoz narxi tanish va tushunarli, ustun esa qurilish ishi va u boshqa smeta tili bilan yoziladi. Shuning uchun bu qator ko'pincha oxirgi paytda paydo bo'ladi.</p>" +
    "<table><tr><th>Qator</th><th>Ixcham PT</th><th>125 Vt</th></tr>" +
    "<tr><td>Ustun (quvur, flanets, bo'yash)</td><td class='n'>0,6–1,2</td><td class='n'>1,2–2,2</td></tr>" +
    "<tr><td>Poydevor va anker guruhi</td><td class='n'>0,3–1,0</td><td class='n'>0,6–1,4</td></tr>" +
    "<tr><td>Yerga ulash va uzatgich himoyasi</td><td class='n'>0,1–0,3</td><td class='n'>0,2–0,4</td></tr>" +
    "<tr><td><b>Jami, mln so'm</b></td><td class='n'><b>1,0–2,5</b></td><td class='n'><b>2,0–4,0</b></td></tr></table>" +
    "<p>Devor kronshteyniga qo'yish imkoni bo'lsa, bu qator butunlay yo'qoladi. Shuning uchun obyektni ko'rishda birinchi savol: mos devor bormi.</p>" +
    "<p class='ogoh'>Ustun qoladigan aktiv. Obyekt sotilganda kamera ko'chiriladi, ustun esa yerda qoladi va uning qiymati qaytmaydi. Bu narxni solishtirishda hisobga olinadi: devorga qo'yilgan komplekt keyingi obyektga to'liq ko'chadi.</p>",
  ru: { yorliq: "Финансы и право", sarlavha: "Опора и фундамент: забываемая строка",
    tana: "<p>Цена оборудования знакома и понятна, а опора — это строительная работа, и пишется она на другом языке сметы. Поэтому строка обычно появляется в последний момент.</p>" +
      "<table><tr><th>Строка</th><th>Компактный PT</th><th>125 Вт</th></tr>" +
      "<tr><td>Опора (труба, фланец, окраска)</td><td class='n'>0,6–1,2</td><td class='n'>1,2–2,2</td></tr>" +
      "<tr><td>Фундамент и анкерная группа</td><td class='n'>0,3–1,0</td><td class='n'>0,6–1,4</td></tr>" +
      "<tr><td>Заземление и защита от перенапряжений</td><td class='n'>0,1–0,3</td><td class='n'>0,2–0,4</td></tr>" +
      "<tr><td><b>Итого, млн сум</b></td><td class='n'><b>1,0–2,5</b></td><td class='n'><b>2,0–4,0</b></td></tr></table>" +
      "<p>Если есть возможность поставить на стеновой кронштейн, строка исчезает целиком. Поэтому первый вопрос при осмотре объекта: есть ли подходящая стена.</p>" +
      "<p class='ogoh'>Опора остаётся на объекте. При продаже камеру снимают, а опора остаётся в земле, и её стоимость не возвращается. Это учитывают при сравнении цен: комплект на стене переезжает на следующий объект целиком.</p>" }
},

"y03.v-servis": {
  yorliq: "Moliya va huquq", sarlavha: "Servis tashrifi: ko'targich narxi",
  tana: "<p>To'rt metrli ustundagi jihozga xizmat ko'rsatish uchun uzun narvon yoki ko'targich kerak. Bu tashrif narxini ikki-uch barobar oshiradi.</p>" +
    "<table><tr><th>Ish</th><th>Balandlikda</th></tr>" +
    "<tr><td>Panelni tozalash</td><td>ha</td></tr>" +
    "<tr><td>Kronshteyn mahkamligini tekshirish</td><td>ha</td></tr>" +
    "<tr><td>Akkumulyatorni almashtirish</td><td>quti balandligiga qarab</td></tr>" +
    "<tr><td>microSD almashtirish</td><td>ha</td></tr>" +
    "<tr><td>Yerga ulash qarshiligini o'lchash</td><td>yo'q</td></tr></table>" +
    "<p>Shuning uchun barcha ishlar bitta tashrifga yig'iladi va yiliga bir marta, bahorda bajariladi: shamol mavsumidan keyin va yozgi issiqlikdan oldin.</p>" +
    "<p class='ogoh'>Loyihalashda akkumulyator qutisini pastroq qo'yish imkoniyati ko'rib chiqiladi. Quti 1,5 metrda bo'lsa, akkumulyator almashtirish ko'targichsiz bajariladi va bu besh yilda bir necha tashrif narxini tejaydi.</p>",
  ru: { yorliq: "Финансы и право", sarlavha: "Сервисный выезд: цена подъёмника",
    tana: "<p>Для обслуживания оборудования на четырёхметровой опоре нужна длинная лестница или подъёмник. Это увеличивает стоимость выезда в два-три раза.</p>" +
      "<table><tr><th>Работа</th><th>На высоте</th></tr>" +
      "<tr><td>Чистка панели</td><td>да</td></tr>" +
      "<tr><td>Проверка затяжки кронштейна</td><td>да</td></tr>" +
      "<tr><td>Замена аккумулятора</td><td>по высоте бокса</td></tr>" +
      "<tr><td>Замена microSD</td><td>да</td></tr>" +
      "<tr><td>Замер сопротивления заземления</td><td>нет</td></tr></table>" +
      "<p>Поэтому все работы собирают в один выезд и выполняют раз в год, весной: после ветреного сезона и до летней жары.</p>" +
      "<p class='ogoh'>При проектировании рассматривают возможность опустить бокс с аккумулятором. Если бокс на высоте 1,5 метра, замена выполняется без подъёмника, и за пять лет это экономит стоимость нескольких выездов.</p>" }
},

"y03.x-byudjet": {
  yorliq: "Jamoa rahbarlari uchun", sarlavha: "Yuklama uzildi: nima bo'ladi va qanday tiklanadi",
  tana: "<p>Zaryad kritik darajaga yetganda kontroller yuklamani uzadi. Kamera to'liq o'chadi va uni masofadan yoqib bo'lmaydi — buyruq yuboriladigan qurilma o'chgan.</p>" +
    "<h4>Tiklanish qanday kechadi</h4><table><tr><th>Bosqich</th><th>Vaqt</th></tr>" +
    "<tr><td>Kontroller zaryadni tiklaydi</td><td>quyosh chiqishi bilan</td></tr>" +
    "<tr><td>Yuklama qayta ulanadi</td><td>zaryad 20–30% ga yetganda</td></tr>" +
    "<tr><td>Kamera tarmoqqa qaytadi</td><td>1–2 daqiqa</td></tr>" +
    "<tr><td>To'liq zaryad</td><td>2–4 ochiq kun</td></tr></table>" +
    "<p>Ya'ni bitta uzilish obyektni bir necha kunga zaif holatda qoldiradi: kamera ishlaydi, lekin zaxirasi yo'q.</p>" +
    "<p class='ogoh'>Oldini olish uzilishdan ancha oldin boshlanadi. Platforma zaryad 40% ga tushganda ogohlantiradi, 30% da jonli ko'rishni cheklaydi, 25% da servis vazifasini ochadi. Uch bosqichning har biri operatorga aniq amalni ko'rsatadi.</p>",
  ru: { yorliq: "Для тимлида", sarlavha: "Нагрузка отключена: что дальше и как восстановить",
    tana: "<p>При достижении критического заряда контроллер отключает нагрузку. Камера выключается полностью, и включить её дистанционно нельзя — устройство, которое принимает команду, обесточено.</p>" +
      "<h4>Как идёт восстановление</h4><table><tr><th>Этап</th><th>Время</th></tr>" +
      "<tr><td>Контроллер возобновляет заряд</td><td>с восходом солнца</td></tr>" +
      "<tr><td>Нагрузка подключается обратно</td><td>при заряде 20–30%</td></tr>" +
      "<tr><td>Камера возвращается в сеть</td><td>1–2 минуты</td></tr>" +
      "<tr><td>Полный заряд</td><td>2–4 ясных дня</td></tr></table>" +
      "<p>То есть одно отключение оставляет объект в уязвимом состоянии на несколько дней: камера работает, но запаса нет.</p>" +
      "<p class='ogoh'>Профилактика начинается задолго до отключения. Платформа предупреждает при 40%, ограничивает живой просмотр при 30% и открывает сервисную задачу при 25%. На каждом из трёх порогов оператор видит конкретное действие.</p>" }
},

"y03.x-shamol": {
  yorliq: "Montajchi uchun", sarlavha: "Shamol: alomatlar grafikda ko'rinadi",
  tana: "<p>Panelning burilishi ko'z bilan darhol sezilmaydi, lekin unum grafigida u aniq ko'rinadi.</p>" +
    "<table><tr><th>Alomat</th><th>Ehtimoliy sabab</th></tr>" +
    "<tr><td>Unum bir kunda 10–20% tushdi</td><td>Panel bir oz burildi</td></tr>" +
    "<tr><td>Unum ertalab yoki kechqurun tushdi</td><td>Yangi soya paydo bo'ldi</td></tr>" +
    "<tr><td>Unum kun bo'yi past</td><td>Chang, qor yoki qattiq burilish</td></tr>" +
    "<tr><td>Unum nolga tushdi</td><td>Kabel uzildi yoki panel tushdi</td></tr></table>" +
    "<p>Platforma unumning kunlik qiymatini saqlaydi va uni o'sha oyning o'rtachasi bilan solishtiradi. Chetlanish 15% dan oshsa, ko'rik vazifasi ochiladi.</p>" +
    "<p class='ogoh'>Har bahorda, shamol mavsumidan keyin barcha ustunli obyektlar ko'rikdan o'tkaziladi: xomutlar tortiladi, panel burchagi tekshiriladi, kronshteyn payvandi ko'riladi. Bu yiliga bir marta bajariladigan ish va u panel almashtirishdan bir necha barobar arzon.</p>",
  ru: { yorliq: "Для монтажника", sarlavha: "Ветер: признаки видны на графике",
    tana: "<p>Разворот панели глазом сразу не заметен, но на графике выработки он виден отчётливо.</p>" +
      "<table><tr><th>Признак</th><th>Вероятная причина</th></tr>" +
      "<tr><td>Выработка упала за сутки на 10–20%</td><td>Панель немного развернуло</td></tr>" +
      "<tr><td>Падение утром или вечером</td><td>Появилась новая тень</td></tr>" +
      "<tr><td>Выработка низкая весь день</td><td>Пыль, снег или сильный разворот</td></tr>" +
      "<tr><td>Выработка упала до нуля</td><td>Оборван кабель или упала панель</td></tr></table>" +
      "<p>Платформа хранит суточную выработку и сравнивает её со средней за тот же месяц. При отклонении больше 15% открывается задача на осмотр.</p>" +
      "<p class='ogoh'>Каждую весну, после ветреного сезона, все объекты с опорами проходят осмотр: подтягивают хомуты, проверяют угол панели, осматривают сварку кронштейна. Это работа раз в год, и она в несколько раз дешевле замены панели.</p>" }
},

"y03.x-sd": {
  yorliq: "Montajchi uchun", sarlavha: "microSD: nega sanoat sinfi kerak",
  tana: "<p>Aloqa uzilganda barcha yozuv microSD'ga tushadi. Uzluksiz yozuv esa kartani tez eskirtiradi: har hujayra chegaralangan yozuv sonidan keyin ishlamay qoladi.</p>" +
    "<table><tr><th></th><th>Chakana karta</th><th>Sanoat sinfi</th></tr>" +
    "<tr><td>Ishlash harorati</td><td>0…+60 °C</td><td>−25…+85 °C</td></tr>" +
    "<tr><td>Yozuv resursi</td><td>past</td><td>bir necha barobar yuqori</td></tr>" +
    "<tr><td>Uzluksiz yozuvda muddat</td><td>6–12 oy</td><td>3–5 yil</td></tr></table>" +
    "<h4>Nosozlik qanday ko'rinadi</h4><p>Avval alohida kliplar ochilmaydi, keyin kamera «SD xatosi» hodisasini beradi va oxirida karta umuman yozilmay qoladi. Eng yomoni, bu hodisa aynan aloqa uzilgan paytda ma'lum bo'ladi — ya'ni yozuv eng kerak bo'lganda.</p>" +
    "<p class='ogoh'>Kartaning TBW ko'rsatkichi xarid shartiga yoziladi. Adapter «SD xatosi» hodisasini alohida turga ajratadi va platformada u dalil yo'qolishi xatari sifatida ko'rsatiladi.</p>",
  ru: { yorliq: "Для монтажника", sarlavha: "microSD: почему нужен индустриальный класс",
    tana: "<p>При обрыве связи вся запись идёт на microSD. Непрерывная запись быстро изнашивает карту: каждая ячейка выдерживает ограниченное число перезаписей.</p>" +
      "<table><tr><th></th><th>Розничная карта</th><th>Индустриальная</th></tr>" +
      "<tr><td>Рабочая температура</td><td>0…+60 °C</td><td>−25…+85 °C</td></tr>" +
      "<tr><td>Ресурс записи</td><td>низкий</td><td>в разы выше</td></tr>" +
      "<tr><td>Срок при непрерывной записи</td><td>6–12 месяцев</td><td>3–5 лет</td></tr></table>" +
      "<h4>Как выглядит отказ</h4><p>Сначала не открываются отдельные клипы, потом камера выдаёт событие «ошибка SD», и в конце карта перестаёт писать вовсе. Хуже всего то, что выясняется это именно при обрыве связи — когда запись нужнее всего.</p>" +
      "<p class='ogoh'>Показатель TBW карты вносят в условия закупки. Адаптер выделяет «ошибку SD» в отдельный тип, и в платформе она показывается не как рядовая неисправность, а как риск потери доказательств.</p>" }
},

"y03.g-ha": {
  yorliq: "Rahbariyat uchun", sarlavha: "Aylanuvchi kamera qachon o'zini oqlaydi",
  tana: "<p>Bu ro'yxatdagi eng murakkab va eng qimmat quyoshli yechim. U faqat bitta holatda tanlanadi: qo'zg'almas kameralar bilan qoplash undan qimmatroq bo'lganda.</p>" +
    "<table><tr><th>Obyekt</th><th>Qo'zg'almas kamera</th><th>Aylanuvchi</th></tr>" +
    "<tr><td>Bir kirishli ombor</td><td>1 dona, arzon</td><td>ortiqcha</td></tr>" +
    "<tr><td>Katta hovlili sex</td><td>3–4 dona</td><td>1 dona, arzonroq</td></tr>" +
    "<tr><td>Uzun perimetr</td><td>5+ dona</td><td>1–2 dona</td></tr></table>" +
    "<p>Ikkinchi va uchinchi qatorlarda aylanuvchi kamera yutadi: bitta ustun, bitta panel, bitta SIM va bitta servis nuqtasi.</p>" +
    "<p class='ogoh'>Yana bir foyda: zum. Xaridor obyektni ko'rishga kelganda operator masofadan turib nomer belgisini yoki materiallarning holatini ko'ra oladi. Bu realizatsiya jarayonida vaqt tejaydi va ortiqcha chiqishlarni olib tashlaydi.</p>",
  ru: { yorliq: "Для правления", sarlavha: "Когда поворотная камера себя оправдывает",
    tana: "<p>Это самое сложное и дорогое солнечное решение в списке. Его выбирают в одном случае: когда закрыть объект неподвижными камерами выходит дороже.</p>" +
      "<table><tr><th>Объект</th><th>Неподвижные камеры</th><th>Поворотная</th></tr>" +
      "<tr><td>Склад с одним въездом</td><td>1 шт., дёшево</td><td>избыточна</td></tr>" +
      "<tr><td>Цех с большим двором</td><td>3–4 шт.</td><td>1 шт., дешевле</td></tr>" +
      "<tr><td>Длинный периметр</td><td>5+ шт.</td><td>1–2 шт.</td></tr></table>" +
      "<p>Во второй и третьей строке поворотная выигрывает: одна опора, одна панель, одна SIM и одна точка обслуживания.</p>" +
      "<p class='ogoh'>Есть и второй выигрыш — зум. Когда покупатель приезжает смотреть объект, оператор дистанционно видит номер машины или состояние материалов. В процессе реализации это экономит время и снимает лишние выезды.</p>" }
},

"y03.g-yoq": {
  yorliq: "Rahbariyat uchun", sarlavha: "Qaerda bu yechim tanlanmaydi",
  tana: "<table><tr><th>Obyekt</th><th>Nega mos emas</th><th>Nima olinadi</th></tr>" +
    "<tr><td>Kichik bir kirishli obyekt</td><td>Aylanish va zum ortiqcha, narx ikki barobar</td><td>Yechim 02</td></tr>" +
    "<tr><td>Ustun qo'yib bo'lmaydigan joy</td><td>Ijaradagi yer, ruxsat yo'q, tor hovli</td><td>Yechim 02, devor kronshteyni bilan</td></tr>" +
    "<tr><td>Panelga kun tushmaydi</td><td>Balans allaqachon nolga yaqin</td><td>Yechim 04</td></tr>" +
    "<tr><td>Uzluksiz yozuv kerak</td><td>Bu rejimda akkumulyator bir kunga ham yetmaydi</td><td>Yechim 04</td></tr>" +
    "<tr><td>Bino ichi</td><td>Quyosh yo'q, aylanish keraksiz</td><td>Yechim 01 yoki 05</td></tr></table>" +
    "<p class='ogoh'>Yana bir cheklov: obyekt yaqin oyda sotilishi kutilayotgan bo'lsa, ustunli variant o'zini oqlamaydi. Poydevor yerda qoladi va uning qiymati qaytmaydi. Bunday obyektga devorga qo'yiladigan komplekt tanlanadi — u keyingi obyektga to'liq ko'chadi.</p>",
  ru: { yorliq: "Для правления", sarlavha: "Где это решение не выбирают",
    tana: "<table><tr><th>Объект</th><th>Почему не подходит</th><th>Что берут</th></tr>" +
      "<tr><td>Маленький объект с одним входом</td><td>Поворот и зум избыточны, цена вдвое выше</td><td>Решение 02</td></tr>" +
      "<tr><td>Место, где нельзя поставить опору</td><td>Арендованная земля, нет разрешения, узкий двор</td><td>Решение 02 на стеновом кронштейне</td></tr>" +
      "<tr><td>На панель не попадает солнце</td><td>Баланс и так близок к нулю</td><td>Решение 04</td></tr>" +
      "<tr><td>Нужна непрерывная запись</td><td>В этом режиме аккумулятора не хватит и на сутки</td><td>Решение 04</td></tr>" +
      "<tr><td>Внутри здания</td><td>Солнца нет, поворот не нужен</td><td>Решение 01 или 05</td></tr></table>" +
      "<p class='ogoh'>Ещё одно ограничение: если объект планируют продать в ближайшие месяцы, вариант с опорой себя не оправдает. Фундамент останется в земле, и его стоимость не вернётся. Для такого объекта берут комплект на стену — он переезжает на следующий объект целиком.</p>" }
}

});
