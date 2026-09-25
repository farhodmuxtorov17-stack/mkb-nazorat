/* ============================================================
   boshqaruv-batafsil.js — tizim-boshqaruv.html sahifasidagi bloklar mazmuni.
   Kalit HTML dagi data-batafsil bilan bir xil ("tb." prefiksi).
   ============================================================ */
window.MKB_BATAFSIL = Object.assign(window.MKB_BATAFSIL || {}, {

"tb.son-indeks": {
  yorliq: "Obyekt menejeri uchun",
  sarlavha: "Beshta tekshiruv va ularning og'irliklari",
  tana: "<table><tr><th>Tekshiruv</th><th>Og'irligi</th><th>Nimani o'lchaydi</th></tr>" +
    "<tr><td>Ko'rik dolzarbligi</td><td class='n'>25</td><td>Oxirgi dalolatnomadan o'tgan kun</td></tr>" +
    "<tr><td>Sug'urta himoyasi</td><td class='n'>25</td><td>Polis amaldami va summasi yetarlimi</td></tr>" +
    "<tr><td>Baho dolzarbligi</td><td class='n'>20</td><td>Baholash hisobotining yoshi</td></tr>" +
    "<tr><td>Hujjatlar to'liqligi</td><td class='n'>15</td><td>Bosqichga ko'ra majburiy hujjatlar</td></tr>" +
    "<tr><td>Qo'riqlash va qurilmalar</td><td class='n'>15</td><td>Shartnoma, onlayn qurilmalar, batareya</td></tr></table>" +
    "<p>Qurilmalar faqat oxirgi bandga ta'sir qiladi. Shuning uchun kamera qo'yish indeksni 100 ga chiqarmaydi: hujjat, polis va ko'rik baribir kerak.</p>" +
    "<p class='ogoh'>Indeks saqlanmaydi. U har ochilganda joriy ma'lumotdan hisoblanadi &mdash; shu sababli uni qo'lda tuzatib bo'lmaydi.</p>",
  ru: {
    yorliq: "Для менеджера объекта",
    sarlavha: "Пять проверок и их веса",
    tana: "<table><tr><th>Проверка</th><th>Вес</th><th>Что измеряет</th></tr>" +
      "<tr><td>Актуальность осмотра</td><td class='n'>25</td><td>Дней с последнего акта</td></tr>" +
      "<tr><td>Страховая защита</td><td class='n'>25</td><td>Действует ли полис и достаточна ли сумма</td></tr>" +
      "<tr><td>Актуальность оценки</td><td class='n'>20</td><td>Возраст отчёта об оценке</td></tr>" +
      "<tr><td>Полнота документов</td><td class='n'>15</td><td>Обязательные документы по этапу</td></tr>" +
      "<tr><td>Охрана и устройства</td><td class='n'>15</td><td>Договор, устройства онлайн, батарея</td></tr></table>" +
      "<p>Устройства влияют только на последний пункт. Поэтому установка камеры не выводит индекс на 100: документы, полис и осмотр всё равно нужны.</p>" +
      "<p class='ogoh'>Индекс не хранится. Он пересчитывается из текущих данных при каждом открытии — поэтому подправить его вручную нельзя.</p>"
  },
  manba: []
},

"tb.son-rol": {
  yorliq: "Rahbariyat uchun",
  sarlavha: "Bitta kartochka, yetti xil maqsad",
  tana: "<p>Obyekt kartochkasini kim ochsa, o'z ishi uchun ochadi. Shuning uchun kartochka tablarga bo'lingan va har rolga o'z tabi ochiladi.</p>" +
    "<table><tr><th>Rol</th><th>Kartochkada qaysi tab</th></tr>" +
    "<tr><td>Obyekt menejeri</td><td>Umumiy, xarajatlar, servis</td></tr>" +
    "<tr><td>Ko'rik inspektori</td><td>Ko'riklar, suratlar</td></tr>" +
    "<tr><td>Xavfsizlik xizmati</td><td>Hodisalar, kameralar</td></tr>" +
    "<tr><td>Buxgalteriya va risk</td><td>Moliya, zaxira</td></tr>" +
    "<tr><td>Yurist</td><td>Hujjatlar, sud ishlari</td></tr>" +
    "<tr><td>Realizatsiya</td><td>Lot, e'lon, tashriflar</td></tr>" +
    "<tr><td>Auditor</td><td>Tarix: kim, qachon, nimani o'zgartirgan</td></tr></table>" +
    "<p>Ma'lumot bitta, ko'rinish har xil. Bu ikki xil xatarni bir vaqtda kamaytiradi: ma'lumotning ikki joyda ikki xil bo'lishini va keraksiz ma'lumotga kirishni.</p>",
  ru: {
    yorliq: "Для правления",
    sarlavha: "Одна карточка, семь разных задач",
    tana: "<p>Карточку объекта каждый открывает ради своей работы. Поэтому она разделена на вкладки, и каждой роли открывается своя.</p>" +
      "<table><tr><th>Роль</th><th>Вкладка в карточке</th></tr>" +
      "<tr><td>Менеджер объекта</td><td>Общее, расходы, сервис</td></tr>" +
      "<tr><td>Инспектор по осмотрам</td><td>Осмотры, фотографии</td></tr>" +
      "<tr><td>Служба безопасности</td><td>События, камеры</td></tr>" +
      "<tr><td>Бухгалтерия и риск</td><td>Финансы, резерв</td></tr>" +
      "<tr><td>Юрист</td><td>Документы, судебные дела</td></tr>" +
      "<tr><td>Реализация</td><td>Лот, объявление, визиты</td></tr>" +
      "<tr><td>Аудитор</td><td>История: кто, когда и что менял</td></tr></table>" +
      "<p>Данные одни, представления разные. Это одновременно снижает два риска: расхождение данных в двух местах и доступ к лишнему.</p>"
  },
  manba: []
},

"tb.son-server": {
  yorliq: "Jamoa rahbarlari uchun",
  sarlavha: "Oltita virtual mashina nimaga ketadi",
  tana: "<table><tr><th>Mashina</th><th>Nima ishlaydi</th><th>vCPU / RAM</th></tr>" +
    "<tr><td>Ilova &times; 2</td><td>API, veb-panel, qoidalar</td><td class='n'>8 / 16</td></tr>" +
    "<tr><td>Baza &times; 2</td><td>PostgreSQL va TimescaleDB, asosiy va nusxa</td><td class='n'>8 / 32</td></tr>" +
    "<tr><td>Media</td><td>Media shlyuz, WebRTC</td><td class='n'>8 / 16</td></tr>" +
    "<tr><td>Ombor va broker</td><td>MinIO, navbat, monitoring</td><td class='n'>8 / 16</td></tr></table>" +
    "<p>Jami 48 vCPU va 128 GB RAM &mdash; bu bank ma'lumotlar markazi uchun kichik konfiguratsiya. Pilot bosqichida hamma xizmat bitta mashinada ishlaydi: 8 vCPU, 16 GB, 0,5 TB disk.</p>" +
    "<p class='ogoh'>Disk boshqa hisob: 267 obyekt uchun 90 kunlik dalil arxivi 1 TB dan oshadi va u har chorakda o'sib boradi. Diskni kengaytirish rejasi birinchi yildayoq tuziladi.</p>",
  ru: {
    yorliq: "Для тимлида",
    sarlavha: "На что уходят шесть виртуальных машин",
    tana: "<table><tr><th>Машина</th><th>Что работает</th><th>vCPU / RAM</th></tr>" +
      "<tr><td>Приложение &times; 2</td><td>API, веб-панель, правила</td><td class='n'>8 / 16</td></tr>" +
      "<tr><td>База &times; 2</td><td>PostgreSQL и TimescaleDB, основная и реплика</td><td class='n'>8 / 32</td></tr>" +
      "<tr><td>Медиа</td><td>Медиашлюз, WebRTC</td><td class='n'>8 / 16</td></tr>" +
      "<tr><td>Хранилище и брокер</td><td>MinIO, очередь, мониторинг</td><td class='n'>8 / 16</td></tr></table>" +
      "<p>Итого 48 vCPU и 128 ГБ RAM — небольшая конфигурация для банковского дата-центра. На пилоте все сервисы работают на одной машине: 8 vCPU, 16 ГБ, 0,5 ТБ диска.</p>" +
      "<p class='ogoh'>Диск — отдельный расчёт: архив доказательств за 90 дней для 267 объектов превышает 1 ТБ и растёт каждый квартал. План расширения диска составляется уже в первый год.</p>"
  },
  manba: []
},

"tb.son-joy": {
  yorliq: "Xavfsizlik uchun",
  sarlavha: "Ma'lumot bank konturidan chiqmaydi",
  tana: "<p>Kadr, klip, telemetriya va reyestr bank ma'lumotlar markazidagi omborda saqlanadi. Yetkazuvchining buluti faqat ikki holatda ishlatiladi: qurilmani birinchi marta sozlashda va proshivkani yangilashda.</p>" +
    "<h4>Nima uchun bu printsipial</h4>" +
    "<ul><li>Dalil sifatida faqat bank konturidagi nusxa ishlatiladi: uning butunligini bank o'zi isbotlay oladi.</li>" +
    "<li>Yetkazuvchi bozorni tark etsa yoki bulut xizmati yopilsa, arxiv yo'qolmaydi.</li>" +
    "<li>Shaxsga doir ma'lumotni O'zbekiston hududidagi bazada qayta ishlash talabi bajariladi.</li></ul>" +
    "<h4>Nima hisobga olinadi</h4>" +
    "<p>Ba'zi brendlar bulutsiz to'liq ishlamaydi: Ajax ning boshqaruv qismi shunga misol. Bunday yechimlar tanlovda alohida belgilanadi va ular uchun dalil zanjiri mahalliy yozuvdan quriladi.</p>",
  ru: {
    yorliq: "Для безопасности",
    sarlavha: "Данные не выходят за контур банка",
    tana: "<p>Кадры, клипы, телеметрия и реестр хранятся в хранилище дата-центра банка. Облако поставщика используется в двух случаях: при первичной настройке устройства и при обновлении прошивки.</p>" +
      "<h4>Почему это принципиально</h4>" +
      "<ul><li>Доказательством служит только копия внутри контура: её целостность банк может доказать сам.</li>" +
      "<li>Если поставщик уходит с рынка или закрывает облачный сервис, архив не пропадает.</li>" +
      "<li>Выполняется требование обрабатывать персональные данные в базе на территории Узбекистана.</li></ul>" +
      "<h4>Что учитывается</h4>" +
      "<p>Некоторые бренды без облака работают не полностью: пример — управляющая часть Ajax. Такие решения отдельно отмечаются при выборе, и цепочка доказательств для них строится от локальной записи.</p>"
  },
  manba: []
},

"tb.ekran-panel": {
  yorliq: "Rahbariyat uchun",
  sarlavha: "Boshqaruv paneli: bitta ekranda nima turadi",
  tana: "<p>Panel uchta savolga javob beradi: bugun nima qilish kerak, qayerda muddat o'tib ketyapti, portfel qanday o'zgaryapti.</p>" +
    "<h4>Bloklari</h4>" +
    "<ul><li><b>Balans va zaxira.</b> Aktivlar qiymati va hisoblangan zaxira; toifalar bo'yicha taqsimot.</li>" +
    "<li><b>Qarorlar navbati.</b> Tasdiqlashni kutayotgan hujjatlar: bir bosishda tasdiqlanadi yoki rad etiladi.</li>" +
    "<li><b>12 oylik sanoq.</b> Umidsiz toifaga o'tishga qancha qolgani; oldindan ogohlantiradi.</li>" +
    "<li><b>Muddatlar.</b> Ko'rik, polis va baholash muddati o'tayotgan obyektlar.</li></ul>" +
    "<h4>Qurilmalar ulangach nima qo'shiladi</h4>" +
    "<p>Panelga to'rtta raqam chiqadi: aloqada bo'lgan qurilmalar ulushi, aloqasiz obyektlar soni, ochiq voqealar va o'rtacha javob vaqti. Bu ko'rsatkichlar oylik hisobotga ham tushadi.</p>",
  ru: {
    yorliq: "Для правления",
    sarlavha: "Панель управления: что стоит на одном экране",
    tana: "<p>Панель отвечает на три вопроса: что делать сегодня, где горят сроки и как меняется портфель.</p>" +
      "<h4>Блоки</h4>" +
      "<ul><li><b>Баланс и резерв.</b> Стоимость активов и рассчитанный резерв; распределение по категориям.</li>" +
      "<li><b>Очередь решений.</b> Документы, ждущие утверждения: одним нажатием утверждаются или отклоняются.</li>" +
      "<li><b>Счётчик 12 месяцев.</b> Сколько осталось до перехода в безнадёжную категорию; предупреждает заранее.</li>" +
      "<li><b>Сроки.</b> Объекты, у которых истекают осмотр, полис и оценка.</li></ul>" +
      "<h4>Что добавится после подключения устройств</h4>" +
      "<p>На панель выйдут четыре числа: доля устройств на связи, количество объектов без связи, открытые инциденты и среднее время ответа. Эти же показатели попадут в месячный отчёт.</p>"
  },
  manba: []
},

"tb.ekran-reyestr": {
  yorliq: "Obyekt menejeri uchun",
  sarlavha: "Reyestr: montaj marshruti shu yerdan tuziladi",
  tana: "<p>Reyestr balansdagi har bir aktivning ro'yxati: surat, qiymat, tur, hudud, bosqich va nazorat indeksi. Filtr va xarita shu yerda.</p>" +
    "<h4>Montaj uchun nima beradi</h4>" +
    "<ul><li>Xaritada yonma-yon turgan obyektlar bitta brigadaga beriladi: kuniga bir-ikki obyekt o'rniga uchtasi ulguriladi.</li>" +
    "<li>Qo'shni obyektlarni bitta klaster shkafiga ulash imkoniyati shu yerda ko'rinadi.</li>" +
    "<li>Obyekt turi va maydoni bo'yicha yechim komplekti oldindan tanlanadi: brigada kerakli jihoz bilan chiqadi.</li></ul>" +
    "<h4>Filtrning amaliy qiymati</h4>" +
    "<p>Qurilmalar ulangach reyestrga ikkita filtr qo'shiladi: qurilmasi yo'q obyektlar va aloqasi uzilgan obyektlar. Birinchisi joriy etish rejasini, ikkinchisi servis marshrutini beradi.</p>",
  ru: {
    yorliq: "Для менеджера объекта",
    sarlavha: "Реестр: отсюда строится маршрут монтажа",
    tana: "<p>Реестр — список каждого актива на балансе: фото, стоимость, тип, регион, этап и индекс контроля. Здесь же фильтры и карта.</p>" +
      "<h4>Что он даёт для монтажа</h4>" +
      "<ul><li>Объекты, стоящие рядом на карте, отдаются одной бригаде: вместо одного-двух объектов в день выходит три.</li>" +
      "<li>Здесь же видно, какие соседние объекты можно подключить к одному кластерному шкафу.</li>" +
      "<li>По типу и площади объекта заранее подбирается комплект: бригада выезжает с нужным оборудованием.</li></ul>" +
      "<h4>Практическая польза фильтров</h4>" +
      "<p>После подключения устройств в реестре появятся два фильтра: объекты без устройств и объекты без связи. Первый даёт план внедрения, второй — маршрут сервиса.</p>"
  },
  manba: []
},

"tb.ekran-obyekt": {
  yorliq: "Obyekt menejeri uchun",
  sarlavha: "Obyekt kartochkasi: hodisa qayerda ko'rinadi",
  tana: "<p>Kartochka sarlavhasida identifikator, filial, tur, maydon, balans qiymati, balansda necha kun turgani va nazorat indeksi bo'ladi.</p>" +
    "<h4>Qurilmalar ulangach qo'shiladigan bo'limlar</h4>" +
    "<ul><li><b>Kameralar.</b> Oxirgi kadr, batareya, signal, oxirgi aloqa vaqti; jonli videoni ochish tugmasi.</li>" +
    "<li><b>Hodisalar tasmasi.</b> Vaqt bo'yicha ro'yxat: kadr, tur, kim javob bergan, qanday yopilgan.</li>" +
    "<li><b>Masofaviy ko'rik.</b> Kamera orqali o'tkazilgan ko'rik va unga biriktirilgan kadrlar.</li></ul>" +
    "<h4>Nima o'zgarmaydi</h4>" +
    "<p>Hujjatlar, moliya, sug'urta va tarix bo'limlari o'z joyida qoladi. Qurilmalar mavjud kartochkaga qo'shimcha bo'lib keladi, alohida tizim yaratilmaydi &mdash; bu joriy etishning eng arzon qismi.</p>",
  ru: {
    yorliq: "Для менеджера объекта",
    sarlavha: "Карточка объекта: где виден инцидент",
    tana: "<p>В шапке карточки — идентификатор, филиал, тип, площадь, балансовая стоимость, сколько дней актив на балансе и индекс контроля.</p>" +
      "<h4>Разделы, которые добавятся после подключения устройств</h4>" +
      "<ul><li><b>Камеры.</b> Последний кадр, батарея, сигнал, время последней связи; кнопка живого видео.</li>" +
      "<li><b>Лента событий.</b> Список по времени: кадр, тип, кто ответил, как закрыто.</li>" +
      "<li><b>Дистанционный осмотр.</b> Осмотр через камеру и приложенные к нему кадры.</li></ul>" +
      "<h4>Что не меняется</h4>" +
      "<p>Разделы документов, финансов, страхования и истории остаются на месте. Устройства добавляются в существующую карточку, отдельная система не создаётся — это самая дешёвая часть внедрения.</p>"
  },
  manba: []
}

});

/* ---------- Rollar, indeks va muddatlar ---------- */
window.MKB_BATAFSIL = Object.assign(window.MKB_BATAFSIL || {}, {

"tb.r-rahbariyat": {
  yorliq: "Rahbariyat uchun",
  sarlavha: "Rahbariyat: oyiga o'n daqiqalik ekran",
  tana: "<p>Rahbariyat kundalik hodisalarni ko'rmaydi. Uning ekranida to'rtta raqam turadi va aynan shular oylik hisobotga chiqadi.</p>" +
    "<table><tr><th>Ko'rsatkich</th><th>Maqsad</th></tr>" +
    "<tr><td>Aloqada bo'lish</td><td class='n'>&ge; 98%</td></tr>" +
    "<tr><td>O'rtacha javob vaqti</td><td class='n'>&le; 5 daqiqa</td></tr>" +
    "<tr><td>Obyektga yolg'on signal</td><td class='n'>&le; 4 / oy</td></tr>" +
    "<tr><td>Smetadan og'ish</td><td class='n'>&le; 10%</td></tr></table>" +
    "<h4>Qaror talab qiladigan holatlar</h4>" +
    "<ul><li>Pilot darvozasidan o'tish yoki o'tmaslik.</li>" +
    "<li>Qo'riqlash shartnomasi: u nazorat indeksining 7,5 balliga va tungi javob tezligiga bevosita ta'sir qiladi.</li>" +
    "<li>Jihoz byudjetining qayta taqsimlanishi: qaysi obyektga qimmat komplekt, qaysisiga arzon.</li></ul>" +
    "<p class='ogoh'>Rahbariyat jonli videoni ko'ra oladi, lekin bu kundalik ish emas. Har ochish jurnalga tushadi &mdash; xodimlar uchun ham, rahbariyat uchun ham bir xil qoida.</p>",
  ru: {
    yorliq: "Для правления",
    sarlavha: "Правление: экран на десять минут в месяц",
    tana: "<p>Правление не смотрит повседневные события. На его экране четыре числа, и именно они идут в месячный отчёт.</p>" +
      "<table><tr><th>Показатель</th><th>Цель</th></tr>" +
      "<tr><td>Доля на связи</td><td class='n'>&ge; 98%</td></tr>" +
      "<tr><td>Среднее время ответа</td><td class='n'>&le; 5 минут</td></tr>" +
      "<tr><td>Ложных тревог на объект</td><td class='n'>&le; 4 / месяц</td></tr>" +
      "<tr><td>Отклонение от сметы</td><td class='n'>&le; 10%</td></tr></table>" +
      "<h4>Что требует решения</h4>" +
      "<ul><li>Пройден порог пилота или нет.</li>" +
      "<li>Договор охраны: он прямо влияет на 7,5 балла индекса контроля и на скорость ночного реагирования.</li>" +
      "<li>Перераспределение бюджета на оборудование: какому объекту дорогой комплект, какому дешёвый.</li></ul>" +
      "<p class='ogoh'>Правление может открыть живое видео, но это не повседневная работа. Каждое открытие пишется в журнал — правило одинаково и для сотрудников, и для руководства.</p>"
  },
  manba: []
},

"tb.r-menejer": {
  yorliq: "Obyekt menejeri uchun",
  sarlavha: "Obyekt menejeri: kunlik ish ro'yxati",
  tana: "<p>Menejer tizimni ertalab ochadi va to'rtta ro'yxatni ko'radi.</p>" +
    "<ol><li>Tunda yopilmagan voqealar.</li>" +
    "<li>Batareyasi 30% dan past va aloqasi uzilgan qurilmalar.</li>" +
    "<li>Muddati yaqinlashgan ko'rik, polis va baholash.</li>" +
    "<li>Tasdiqlashni kutayotgan xarajatlar.</li></ol>" +
    "<h4>Qurilmalar uning ishini qanday o'zgartiradi</h4>" +
    "<p>Ilgari obyektda nima bo'layotganini bilish uchun joyiga borish yoki qo'shniga qo'ng'iroq qilish kerak edi. Endi tunda sodir bo'lgan voqea ertalab ekranda kadr bilan turadi va inspektor allaqachon topshiriq olgan bo'ladi.</p>" +
    "<p>Menejer tizimda buyruq bera olmaydi: sirena va eshik xavfsizlik xizmatining huquqi. U servis arizasi ochadi, montaj topshirig'i beradi va xarajatni kiritadi.</p>",
  ru: {
    yorliq: "Для менеджера объекта",
    sarlavha: "Менеджер объекта: ежедневный список работ",
    tana: "<p>Менеджер открывает систему утром и видит четыре списка.</p>" +
      "<ol><li>Инциденты, не закрытые за ночь.</li>" +
      "<li>Устройства с зарядом ниже 30% и потерявшие связь.</li>" +
      "<li>Приближающиеся сроки осмотра, полиса и оценки.</li>" +
      "<li>Расходы, ожидающие утверждения.</li></ol>" +
      "<h4>Как устройства меняют его работу</h4>" +
      "<p>Раньше, чтобы узнать, что происходит на объекте, надо было съездить туда или позвонить соседям. Теперь ночное происшествие утром лежит на экране с кадром, а инспектор уже получил задание.</p>" +
      "<p>Команды менеджер не отдаёт: сирена и дверь — право службы безопасности. Он открывает сервисную заявку, выдаёт задание на монтаж и вносит расход.</p>"
  },
  manba: []
},

"tb.r-inspektor": {
  yorliq: "Inspektor uchun",
  sarlavha: "Inspektor: masofaviy ko'rik nimani almashtiradi",
  tana: "<p>Bino ko'rigi har 90 kunda o'tkaziladi. 267 obyekt uchun bu yiliga mingdan ortiq tashrif: har biriga yo'l, vaqt va yonilg'i.</p>" +
    "<h4>Kamera nimani beradi</h4>" +
    "<ul><li>Oraliq tekshiruv: obyekt joyida turibdimi, darvoza yopiqmi, atrofda o'zgarish bormi.</li>" +
    "<li>Sanasi ko'rinadigan kadrlar ko'rik hujjatiga ilova qilinadi.</li>" +
    "<li>Hodisadan keyingi tezkor tekshiruv: joyiga bormasdan vaziyatni baholash.</li></ul>" +
    "<h4>Nimani almashtirmaydi</h4>" +
    "<p>Tomning holati, devordagi yoriq, ichki xonalar va hisoblagichlar kamerada ko'rinmaydi. Masofaviy ko'rik joyidagi ko'rikning o'rnini to'liq bosadimi &mdash; bu bankning ichki me'yorida hal qilinadi, tizim esa ikkala turni ham alohida yozadi.</p>" +
    "<p class='ogoh'>Ko'rik davri (bino uchun 90 kun) ichki me'yor sifatida sozlamalarda turadi va tasdiqlanishi kerak.</p>",
  ru: {
    yorliq: "Для инспектора",
    sarlavha: "Инспектор: что заменяет дистанционный осмотр",
    tana: "<p>Осмотр здания проводится каждые 90 дней. Для 267 объектов это больше тысячи выездов в год: дорога, время и топливо на каждый.</p>" +
      "<h4>Что даёт камера</h4>" +
      "<ul><li>Промежуточная проверка: объект на месте, ворота закрыты, вокруг ничего не изменилось.</li>" +
      "<li>Кадры с видимой датой прикладываются к документу осмотра.</li>" +
      "<li>Быстрая проверка после инцидента: оценить обстановку, не выезжая.</li></ul>" +
      "<h4>Чего не заменяет</h4>" +
      "<p>Состояние кровли, трещина в стене, внутренние помещения и счётчики в камеру не видны. Заменяет ли дистанционный осмотр выездной полностью — решается внутренней нормой банка; система фиксирует оба вида отдельно.</p>" +
      "<p class='ogoh'>Периодичность осмотра (90 дней для зданий) лежит в настройках как внутренняя норма и подлежит утверждению.</p>"
  },
  manba: []
},

"tb.r-xavfsizlik": {
  yorliq: "Xavfsizlik uchun",
  sarlavha: "Xavfsizlik xizmati: yagona rol, buyruq bera oladi",
  tana: "<p>Sirena, eshik, shlagbaum, PTZ va qo'riqlashga xabar &mdash; faqat shu rolning huquqi. Buyruq berish uchun ikkinchi omil bilan tasdiqlangan sessiya talab qilinadi.</p>" +
    "<h4>Navbatchining ish tartibi</h4>" +
    "<ol><li>Xabarnoma keladi, kadr ko'rinadi.</li>" +
    "<li>Jonli video ochiladi, vaziyat baholanadi.</li>" +
    "<li>Qaror: yolg'on signal, kuzatuv yoki chora.</li>" +
    "<li>Chora bo'lsa: sirena, keyin qo'riqlash xizmatiga va zarurat bo'lsa 102 ga xabar.</li>" +
    "<li>Voqea sabab bilan yopiladi.</li></ol>" +
    "<h4>Nimani ko'rmaydi</h4>" +
    "<p>Obyektning balans qiymati, baholash hisoboti va sud ishlari xavfsizlik xodimiga ochilmaydi. Unga manzil, kirish sxemasi, kalit kimda ekani va kontakt raqamlari kerak &mdash; shular ko'rinadi.</p>",
  ru: {
    yorliq: "Для безопасности",
    sarlavha: "Служба безопасности: единственная роль с правом команд",
    tana: "<p>Сирена, дверь, шлагбаум, PTZ и вызов охраны — право только этой роли. Для команды требуется сессия, подтверждённая вторым фактором.</p>" +
      "<h4>Порядок работы дежурного</h4>" +
      "<ol><li>Приходит уведомление, виден кадр.</li>" +
      "<li>Открывается живое видео, оценивается обстановка.</li>" +
      "<li>Решение: ложная тревога, наблюдение или меры.</li>" +
      "<li>Если меры: сирена, затем сообщение охране и при необходимости в 102.</li>" +
      "<li>Инцидент закрывается с указанием причины.</li></ol>" +
      "<h4>Чего не видит</h4>" +
      "<p>Балансовая стоимость объекта, отчёт об оценке и судебные дела сотруднику охраны не открываются. Ему нужны адрес, схема подхода, у кого ключи и контактные телефоны — это и показывается.</p>"
  },
  manba: []
},

"tb.r-buxgalter": {
  yorliq: "Moliya uchun",
  sarlavha: "Buxgalteriya: nazorat zaxira hisobiga qanday tegadi",
  tana: "<p>Zaxira aktivning balansda turgan muddatiga qarab hisoblanadi. Nazorat qurilmalari bu muddatga bevosita ta'sir qilmaydi &mdash; ular ikkinchi yo'l bilan ta'sir qiladi.</p>" +
    "<table><tr><th>Ta'sir</th><th>Qanday</th></tr>" +
    "<tr><td>Yo'qotishning oldini olish</td><td>O'g'irlangan jihoz va buzilgan bino balans qiymatini kamaytiradi</td></tr>" +
    "<tr><td>Realizatsiya tezligi</td><td>Holati yaxshi obyekt tezroq sotiladi va umidsiz toifaga yetib bormaydi</td></tr>" +
    "<tr><td>Sug'urta</td><td>Nazorat qilinadigan obyektga polis arzonroq va hodisada dalil bo'ladi</td></tr>" +
    "<tr><td>Xarajat hisobi</td><td>Servis va SIM xarajatlari obyekt bo'yicha ko'rinadi</td></tr></table>" +
    "<h4>Nima qila olmaydi</h4>" +
    "<p>Buxgalteriya qurilmaga buyruq bermaydi va jonli videoni ochmaydi. Uning ekranida raqamlar: obyekt bo'yicha xarajatlar, zaxira toifasi va muddatlar.</p>",
  ru: {
    yorliq: "Для финансов",
    sarlavha: "Бухгалтерия: как контроль влияет на расчёт резерва",
    tana: "<p>Резерв считается от срока нахождения актива на балансе. Устройства контроля на этот срок напрямую не влияют — они действуют иначе.</p>" +
      "<table><tr><th>Влияние</th><th>Каким образом</th></tr>" +
      "<tr><td>Предотвращение потерь</td><td>Украденное оборудование и разрушенное здание снижают балансовую стоимость</td></tr>" +
      "<tr><td>Скорость реализации</td><td>Объект в хорошем состоянии продаётся быстрее и не доходит до безнадёжной категории</td></tr>" +
      "<tr><td>Страхование</td><td>Для контролируемого объекта полис дешевле, а при событии есть доказательство</td></tr>" +
      "<tr><td>Учёт расходов</td><td>Затраты на сервис и SIM видны в разрезе объекта</td></tr></table>" +
      "<h4>Чего не может</h4>" +
      "<p>Бухгалтерия не отдаёт команды устройствам и не открывает живое видео. На её экране цифры: расходы по объекту, категория резерва и сроки.</p>"
  },
  manba: []
},

"tb.r-realizatsiya": {
  yorliq: "Marketing uchun",
  sarlavha: "Realizatsiya: kamera sotuvga qanday yordam beradi",
  tana: "<p>Uchta amaliy foyda bor va ularning hammasi o'lchanadi.</p>" +
    "<ul><li><b>Yangi surat.</b> E'longa qo'yiladigan kadr bugungi holatni ko'rsatadi; obyektga borish shart emas.</li>" +
    "<li><b>Xavfsiz tashrif.</b> Xaridor bilan tashrif belgilanadi, kelgani kamerada ko'rinadi, kalit topshirish tartibi jurnalga yoziladi.</li>" +
    "<li><b>Obyektning saqlanishi.</b> Talon-taroj qilingan bino narxini yo'qotadi: o'g'irlangan simlar va sindirilgan eshik e'londagi rasmni ham, bahoni ham tushiradi.</li></ul>" +
    "<h4>Nima taqiqlanadi</h4>" +
    "<p>Odam tushgan yozuv e'longa qo'yilmaydi. E'lon uchun faqat bo'sh obyekt kadrlari ishlatiladi, ular ham obyekt menejerining tasdig'i bilan.</p>" +
    "<p class='ogoh'>&laquo;MKBANK nazoratida&raquo; lavhasi obyektning egasiz emasligini ko'rsatadi va lavhada lot raqami turadi &mdash; bu bir vaqtning o'zida e'lon ham.</p>",
  ru: {
    yorliq: "Для маркетинга",
    sarlavha: "Реализация: чем камера помогает продаже",
    tana: "<p>Пользы три, и все они измеримы.</p>" +
      "<ul><li><b>Свежее фото.</b> Кадр для объявления показывает сегодняшнее состояние; ехать на объект не нужно.</li>" +
      "<li><b>Безопасный показ.</b> Визит с покупателем назначается, приезд виден на камере, порядок передачи ключей пишется в журнал.</li>" +
      "<li><b>Сохранность объекта.</b> Разграбленное здание теряет в цене: снятая проводка и выломанная дверь портят и фотографию в объявлении, и оценку.</li></ul>" +
      "<h4>Что запрещено</h4>" +
      "<p>Запись с людьми в объявление не идёт. Для объявления используются только кадры пустого объекта и только с подтверждения менеджера объекта.</p>" +
      "<p class='ogoh'>Табличка «под контролем MKBANK» показывает, что объект не бесхозный, и содержит номер лота — это одновременно и объявление.</p>"
  },
  manba: []
},

"tb.r-admin": {
  yorliq: "Administrator uchun",
  sarlavha: "Administrator: reyestrni to'g'ri tutish",
  tana: "<p>Administratorning asosiy mas'uliyati &mdash; qurilma, SIM va sertifikat reyestrining haqiqatga mos bo'lishi. Bu ro'yxat noto'g'ri bo'lsa, qolgan hamma narsa noto'g'ri ishlaydi.</p>" +
    "<h4>Har qurilma yozuvida nima bo'ladi</h4>" +
    "<ul><li>Obyekt, seriya raqami, model, o'rnatilgan sana va joyi.</li>" +
    "<li>SIM raqami, operatori, tarifi va to'lov sanasi.</li>" +
    "<li>Sertifikat va uning tugash sanasi.</li>" +
    "<li>Proshivka versiyasi va oxirgi yangilanish.</li></ul>" +
    "<h4>Nima qila olmaydi</h4>" +
    "<p>Administrator audit jurnalini tahrirlay olmaydi va o'chira olmaydi. U rol bera oladi, lekin o'ziga yangi huquq qo'sha olmaydi: bunday so'rov ikkinchi xodim tasdig'idan o'tadi.</p>",
  ru: {
    yorliq: "Для администратора",
    sarlavha: "Администратор: держать реестр в соответствии с реальностью",
    tana: "<p>Главная ответственность администратора — чтобы реестр устройств, SIM и сертификатов соответствовал действительности. Если этот список неверен, неправильно работает всё остальное.</p>" +
      "<h4>Что в записи каждого устройства</h4>" +
      "<ul><li>Объект, серийный номер, модель, дата и место установки.</li>" +
      "<li>Номер SIM, оператор, тариф и дата платежа.</li>" +
      "<li>Сертификат и срок его действия.</li>" +
      "<li>Версия прошивки и дата последнего обновления.</li></ul>" +
      "<h4>Чего не может</h4>" +
      "<p>Администратор не может редактировать и удалять журнал аудита. Он выдаёт роли, но не может добавить права себе: такой запрос проходит подтверждение вторым сотрудником.</p>"
  },
  manba: []
},

"tb.kecha-kim": {
  yorliq: "Xavfsizlik uchun",
  sarlavha: "Tungi xabarnoma kimga va qanday tartibda boradi",
  tana: "<table><tr><th>Vaqt</th><th>Kim</th><th>Nima ko'radi</th></tr>" +
    "<tr><td>03:12</td><td>Navbatchi xavfsizlik xodimi</td><td>Push, kadr, ikki tugma</td></tr>" +
    "<tr><td>03:13</td><td>Smena boshlig'i</td><td>Faqat javob bo'lmasa</td></tr>" +
    "<tr><td>08:30</td><td>Obyekt menejeri</td><td>Ertalabki ro'yxatda voqea</td></tr>" +
    "<tr><td>08:30</td><td>Ko'rik inspektori</td><td>Joyida ko'rik topshirig'i</td></tr>" +
    "<tr><td>Oy oxiri</td><td>Rahbariyat</td><td>Jamlangan raqam hisobotda</td></tr></table>" +
    "<h4>Nega hamma uyg'otilmaydi</h4>" +
    "<p>Tunda beshta odamga xabar yuborish ikki natija beradi: hech kim javob bermaydi yoki hammasi bir vaqtda javob beradi. Ikkalasi ham yomon. Javobgar bitta bo'ladi, qolganlari esa muddatida javob kelmasa xabar oladi.</p>" +
    "<p class='ogoh'>Bir hududdagi bir necha obyekt birdan aloqadan chiqsa, qoida boshqacha: bu darhol smena boshlig'iga va ertalab administratorga ko'tariladi &mdash; bu ommaviy uzilish belgisi.</p>",
  ru: {
    yorliq: "Для безопасности",
    sarlavha: "Кому и в каком порядке уходит ночное уведомление",
    tana: "<table><tr><th>Время</th><th>Кто</th><th>Что видит</th></tr>" +
      "<tr><td>03:12</td><td>Дежурный сотрудник охраны</td><td>Push, кадр, две кнопки</td></tr>" +
      "<tr><td>03:13</td><td>Начальник смены</td><td>Только если нет ответа</td></tr>" +
      "<tr><td>08:30</td><td>Менеджер объекта</td><td>Инцидент в утреннем списке</td></tr>" +
      "<tr><td>08:30</td><td>Инспектор по осмотрам</td><td>Задание на выездной осмотр</td></tr>" +
      "<tr><td>Конец месяца</td><td>Правление</td><td>Сводная цифра в отчёте</td></tr></table>" +
      "<h4>Почему не будят всех</h4>" +
      "<p>Ночное уведомление пятерым даёт один из двух результатов: не отвечает никто или отвечают все сразу. Оба плохи. Ответственный один, остальные получают уведомление, если в срок ответа не было.</p>" +
      "<p class='ogoh'>Если разом пропадают несколько объектов одного района, правило другое: эскалация сразу к начальнику смены и утром к администратору — это признак массовой аварии.</p>"
  },
  manba: []
},

"tb.jurnal": {
  yorliq: "Auditorlar uchun",
  sarlavha: "Jurnal: nima yoziladi va kim o'chira olmaydi",
  tana: "<table><tr><th>Amal</th><th>Yoziladigan ma'lumot</th></tr>" +
    "<tr><td>Jonli video ochish</td><td>Kim, qachon, qaysi kamera, necha soniya</td></tr>" +
    "<tr><td>Arxivdan kadr olish</td><td>Kim, qaysi vaqt oralig'i, sababi</td></tr>" +
    "<tr><td>Eshik va sirena buyrug'i</td><td>Kim, natija, idempotentlik kaliti</td></tr>" +
    "<tr><td>Rejimni o'zgartirish</td><td>Kim, eski va yangi jadval</td></tr>" +
    "<tr><td>Rol berish</td><td>Kim bergan, kimga, qaysi asosda</td></tr></table>" +
    "<h4>Jurnalning himoyasi</h4>" +
    "<ul><li>Yozuv qo'shiladi, o'zgartirilmaydi va o'chirilmaydi &mdash; administrator uchun ham.</li>" +
    "<li>Nusxasi alohida omborda saqlanadi.</li>" +
    "<li>Saqlash muddati 5 yil; bank hujjat aylanishi qoidalariga muvofiq uzaytirilishi mumkin.</li></ul>" +
    "<p>Jurnal ikki tomonga ishlaydi: suiiste'molni ko'rsatadi va xodimni asossiz ayblovdan himoya qiladi. &laquo;O'sha kuni kim ko'rgan&raquo; degan savolga aniq javob bo'ladi.</p>",
  ru: {
    yorliq: "Для аудиторов",
    sarlavha: "Журнал: что пишется и кто не может стереть",
    tana: "<table><tr><th>Действие</th><th>Что записывается</th></tr>" +
      "<tr><td>Открытие живого видео</td><td>Кто, когда, какая камера, сколько секунд</td></tr>" +
      "<tr><td>Выгрузка кадра из архива</td><td>Кто, какой интервал, основание</td></tr>" +
      "<tr><td>Команда на дверь и сирену</td><td>Кто, результат, ключ идемпотентности</td></tr>" +
      "<tr><td>Изменение режима</td><td>Кто, старое и новое расписание</td></tr>" +
      "<tr><td>Выдача роли</td><td>Кто выдал, кому, на каком основании</td></tr></table>" +
      "<h4>Защита журнала</h4>" +
      "<ul><li>Запись добавляется, но не меняется и не удаляется — в том числе администратором.</li>" +
      "<li>Копия хранится в отдельном хранилище.</li>" +
      "<li>Срок хранения 5 лет; может быть продлён по правилам документооборота банка.</li></ul>" +
      "<p>Журнал работает в обе стороны: показывает злоупотребление и защищает сотрудника от необоснованного обвинения. На вопрос «кто смотрел в тот день» есть точный ответ.</p>"
  },
  manba: []
},

"tb.i-korik": {
  yorliq: "Obyekt menejeri uchun",
  sarlavha: "Ko'rik dolzarbligi: 25 ball qanday taqsimlanadi",
  tana: "<p>Ball oxirgi imzolangan dalolatnomadan o'tgan kunga qarab pog'onali tushadi. Bino uchun me'yor 90 kun.</p>" +
    "<table><tr><th>O'tgan kun</th><th>Ulush</th><th>Ball</th></tr>" +
    "<tr><td>90 gacha</td><td class='n'>1,0</td><td class='n'>25,0</td></tr>" +
    "<tr><td>91&ndash;135</td><td class='n'>0,6</td><td class='n'>15,0</td></tr>" +
    "<tr><td>136&ndash;180</td><td class='n'>0,3</td><td class='n'>7,5</td></tr>" +
    "<tr><td>180 dan ortiq</td><td class='n'>0</td><td class='n'>0</td></tr></table>" +
    "<p>Namunadagi obyektda oxirgi ko'rik 118 kun oldin bo'lgan: bu ikkinchi pog'ona, 15 ball. Bitta ko'rik o'tkazish 10 ball qaytaradi &mdash; indeksni ko'tarishning eng arzon yo'li.</p>" +
    "<p class='ogoh'>Rejadagi ko'rik kechikkan holatga o'tsa, ulush 0,3 dan oshmaydi: sana bo'yicha yaqin bo'lsa ham.</p>",
  ru: {
    yorliq: "Для менеджера объекта",
    sarlavha: "Актуальность осмотра: как распределяются 25 баллов",
    tana: "<p>Балл снижается ступенями по числу дней с последнего подписанного акта. Норма для здания — 90 дней.</p>" +
      "<table><tr><th>Прошло дней</th><th>Доля</th><th>Баллов</th></tr>" +
      "<tr><td>до 90</td><td class='n'>1,0</td><td class='n'>25,0</td></tr>" +
      "<tr><td>91&ndash;135</td><td class='n'>0,6</td><td class='n'>15,0</td></tr>" +
      "<tr><td>136&ndash;180</td><td class='n'>0,3</td><td class='n'>7,5</td></tr>" +
      "<tr><td>больше 180</td><td class='n'>0</td><td class='n'>0</td></tr></table>" +
      "<p>В примере последний осмотр был 118 дней назад: это вторая ступень, 15 баллов. Один проведённый осмотр возвращает 10 баллов — самый дешёвый способ поднять индекс.</p>" +
      "<p class='ogoh'>Если плановый осмотр перешёл в статус просроченного, доля не поднимается выше 0,3, даже когда дата близка.</p>"
  },
  manba: []
},

"tb.i-sugurta": {
  yorliq: "Moliya uchun",
  sarlavha: "Sug'urta: 25 ball nimaga bog'liq",
  tana: "<table><tr><th>Holat</th><th>Ulush</th><th>Ball</th></tr>" +
    "<tr><td>Polis amalda, 30 kundan ko'p qolgan, summa bahodan kam emas</td><td class='n'>1,0</td><td class='n'>25,0</td></tr>" +
    "<tr><td>Polis amalda, lekin summa baholangan qiymatdan past</td><td class='n'>0,65</td><td class='n'>16,3</td></tr>" +
    "<tr><td>Polis amalda, 30 kundan kam qolgan</td><td class='n'>0,5</td><td class='n'>12,5</td></tr>" +
    "<tr><td>Muddati o'tgan polis</td><td class='n'>0,1</td><td class='n'>2,5</td></tr>" +
    "<tr><td>Polis yo'q</td><td class='n'>0</td><td class='n'>0</td></tr></table>" +
    "<h4>Sug'urta summasi nega muhim</h4>" +
    "<p>Baholangan qiymatdan past summaga sug'urtalangan obyekt yonib ketsa, bank farqni o'z zarariga yozadi. Shuning uchun summa baholash hisoboti bilan solishtiriladi va mos kelmasa, ball to'liq berilmaydi.</p>" +
    "<p>Transport uchun boshqa qoida: amaldagi OSAGO yetarli.</p>",
  ru: {
    yorliq: "Для финансов",
    sarlavha: "Страхование: от чего зависят 25 баллов",
    tana: "<table><tr><th>Ситуация</th><th>Доля</th><th>Баллов</th></tr>" +
      "<tr><td>Полис действует, осталось больше 30 дней, сумма не ниже оценки</td><td class='n'>1,0</td><td class='n'>25,0</td></tr>" +
      "<tr><td>Полис действует, но сумма ниже оценочной стоимости</td><td class='n'>0,65</td><td class='n'>16,3</td></tr>" +
      "<tr><td>Полис действует, осталось меньше 30 дней</td><td class='n'>0,5</td><td class='n'>12,5</td></tr>" +
      "<tr><td>Срок полиса истёк</td><td class='n'>0,1</td><td class='n'>2,5</td></tr>" +
      "<tr><td>Полиса нет</td><td class='n'>0</td><td class='n'>0</td></tr></table>" +
      "<h4>Почему важна страховая сумма</h4>" +
      "<p>Если объект, застрахованный ниже оценочной стоимости, сгорит, разницу банк спишет в убыток. Поэтому сумма сверяется с отчётом об оценке, и при несоответствии балл даётся не полностью.</p>" +
      "<p>Для транспорта правило другое: достаточно действующего ОСАГО.</p>"
  },
  manba: []
},

"tb.i-baho": {
  yorliq: "Moliya uchun",
  sarlavha: "Baho dolzarbligi: 20 ball va 12 oylik muddat",
  tana: "<p>Baholash hisoboti 12 oy davomida dolzarb hisoblanadi. Keyin ball ko'rik bilan bir xil pog'onalar bo'yicha tushadi.</p>" +
    "<table><tr><th>Hisobot yoshi</th><th>Ulush</th><th>Ball</th></tr>" +
    "<tr><td>365 kungacha</td><td class='n'>1,0</td><td class='n'>20,0</td></tr>" +
    "<tr><td>366&ndash;547</td><td class='n'>0,6</td><td class='n'>12,0</td></tr>" +
    "<tr><td>548&ndash;730</td><td class='n'>0,3</td><td class='n'>6,0</td></tr>" +
    "<tr><td>730 dan ortiq</td><td class='n'>0</td><td class='n'>0</td></tr></table>" +
    "<p>Eskirgan baho ikki tomonga xavfli: past ko'rsatilgan qiymat aktivni arzonga sotishga olib keladi, yuqori ko'rsatilgani esa e'lonni javobsiz qoldiradi va zaxira hisobini buzadi.</p>" +
    "<p class='ogoh'>Muddat tugashiga 30 kun qolganda tizim ogohlantiradi: yangi baholashni buyurtma qilishga ulguriladi.</p>",
  ru: {
    yorliq: "Для финансов",
    sarlavha: "Актуальность оценки: 20 баллов и срок в 12 месяцев",
    tana: "<p>Отчёт об оценке считается актуальным 12 месяцев. Дальше балл снижается теми же ступенями, что и у осмотра.</p>" +
      "<table><tr><th>Возраст отчёта</th><th>Доля</th><th>Баллов</th></tr>" +
      "<tr><td>до 365 дней</td><td class='n'>1,0</td><td class='n'>20,0</td></tr>" +
      "<tr><td>366&ndash;547</td><td class='n'>0,6</td><td class='n'>12,0</td></tr>" +
      "<tr><td>548&ndash;730</td><td class='n'>0,3</td><td class='n'>6,0</td></tr>" +
      "<tr><td>больше 730</td><td class='n'>0</td><td class='n'>0</td></tr></table>" +
      "<p>Устаревшая оценка опасна в обе стороны: заниженная стоимость ведёт к продаже дешевле рынка, завышенная оставляет объявление без откликов и искажает расчёт резерва.</p>" +
      "<p class='ogoh'>За 30 дней до истечения срока система предупреждает: новую оценку успевают заказать.</p>"
  },
  manba: []
},

"tb.i-hujjat": {
  yorliq: "Yuristlar uchun",
  sarlavha: "Hujjatlar to'liqligi: ro'yxat bosqichga bog'liq",
  tana: "<p>Majburiy hujjatlar ro'yxati aktivning qaysi bosqichda ekaniga qarab tuziladi: balansga qabul, baholash, realizatsiya, chiqim. O'tilgan har bosqichning hujjatlari ro'yxatga qo'shiladi.</p>" +
    "<h4>Hisob</h4>" +
    "<p>Ball to'g'ridan-to'g'ri nisbat bilan hisoblanadi: mavjud hujjatlar soni majburiylar soniga bo'linadi. Namunada 11 tadan 9 tasi bor: 9 / 11 = 0,82, ya'ni 12,3 ball.</p>" +
    "<h4>Nega bu qism tez to'g'rilanadi</h4>" +
    "<p>Yetishmayotgan hujjatlar ro'yxati kartochkada aniq ko'rsatiladi. Ular odatda arxivda bor, faqat tizimga yuklanmagan. Bitta xodimning bir kunlik ishi 267 obyektning o'nlab ballini qaytaradi.</p>" +
    "<p class='ogoh'>Skaner nusxasi yuklanishi yetarli emas: hujjat turi to'g'ri tanlanishi kerak, aks holda tizim uni majburiy ro'yxatga bog'lay olmaydi.</p>",
  ru: {
    yorliq: "Для юристов",
    sarlavha: "Полнота документов: список зависит от этапа",
    tana: "<p>Список обязательных документов формируется по этапу актива: приём на баланс, оценка, реализация, списание. Документы каждого пройденного этапа добавляются в список.</p>" +
      "<h4>Расчёт</h4>" +
      "<p>Балл считается прямой пропорцией: число имеющихся документов делится на число обязательных. В примере есть 9 из 11: 9 / 11 = 0,82, то есть 12,3 балла.</p>" +
      "<h4>Почему эта часть правится быстро</h4>" +
      "<p>Список недостающих документов прямо показан в карточке. Обычно они есть в архиве и просто не загружены в систему. День работы одного сотрудника возвращает десятки баллов по 267 объектам.</p>" +
      "<p class='ogoh'>Загрузить скан недостаточно: нужно верно выбрать тип документа, иначе система не свяжет его с обязательным списком.</p>"
  },
  manba: []
},

"tb.i-himoya": {
  yorliq: "Xavfsizlik uchun",
  sarlavha: "Qo'riqlash va qurilmalar: 15 ballning formulasi",
  tana: "<p>Ulush uch qo'shiluvchidan yig'iladi va 1 dan oshmaydi:</p>" +
    "<pre><code>ulush = 0,50 &times; (qo'riqlash shartnomasi bormi)\n      + 0,35 &times; (onlayn qurilmalar / jami qurilmalar)\n      + 0,15 &times; (batareyasi 20% dan yuqori / batareyali qurilmalar)</code></pre>" +
    "<h4>Namunadagi hisob</h4>" +
    "<p>Shartnoma yo'q (0), to'rtta qurilmadan uchtasi onlayn (0,35 &times; 0,75 = 0,2625), batareyali uchta qurilmadan ikkitasining zaryadi yetarli (0,15 &times; 0,667 = 0,1). Yig'indi 0,3625, ya'ni 15 balldan 5,4 tasi.</p>" +
    "<h4>Nima o'zgartiradi</h4>" +
    "<ul><li>Servis chiqib to'rtinchi qurilmani tiklasa: ulush 0,5 ga, ball 7,5 ga chiqadi.</li>" +
    "<li>Qo'riqlash shartnomasi tuzilsa: yana 7,5 ball qo'shiladi va band to'liq yopiladi.</li></ul>" +
    "<p class='ogoh'>Qurilmasi ham, shartnomasi ham yo'q obyektda bu band &laquo;kiritilmagan&raquo; deb belgilanadi: nol ball beriladi va ekranda sababi ko'rsatiladi.</p>",
  ru: {
    yorliq: "Для безопасности",
    sarlavha: "Охрана и устройства: формула 15 баллов",
    tana: "<p>Доля складывается из трёх слагаемых и не превышает 1:</p>" +
      "<pre><code>доля = 0,50 &times; (есть ли договор охраны)\n     + 0,35 &times; (устройств онлайн / всего устройств)\n     + 0,15 &times; (заряд выше 20% / устройств с батареей)</code></pre>" +
      "<h4>Расчёт в примере</h4>" +
      "<p>Договора нет (0), из четырёх устройств три онлайн (0,35 &times; 0,75 = 0,2625), из трёх батарейных у двух достаточный заряд (0,15 &times; 0,667 = 0,1). Сумма 0,3625, то есть 5,4 балла из 15.</p>" +
      "<h4>Что это меняет</h4>" +
      "<ul><li>Сервис восстановил четвёртое устройство: доля 0,5, балл 7,5.</li>" +
      "<li>Заключён договор охраны: добавляется ещё 7,5 балла, пункт закрывается полностью.</li></ul>" +
      "<p class='ogoh'>Если нет ни устройств, ни договора, пункт помечается как «не заполнено»: балл нулевой, а причина показывается на экране.</p>"
  },
  manba: []
},

"tb.i-hisob": {
  yorliq: "Obyekt menejeri uchun",
  sarlavha: "Indeks qachon qayta hisoblanadi",
  tana: "<p>Indeks bazada saqlanmaydi. U kartochka yoki reyestr ochilganda joriy ma'lumotdan hisoblanadi, shuning uchun har doim bugungi holatni ko'rsatadi.</p>" +
    "<h4>Nimadan keyin darhol o'zgaradi</h4>" +
    "<ul><li>Ko'rik dalolatnomasi imzolandi.</li>" +
    "<li>Sug'urta polisi yuklandi yoki muddati tugadi.</li>" +
    "<li>Baholash hisoboti kiritildi.</li>" +
    "<li>Hujjat qo'shildi yoki turi to'g'rilandi.</li>" +
    "<li>Qurilma onlayn bo'ldi yoki aloqadan chiqdi; batareya 20% chegarasidan o'tdi.</li></ul>" +
    "<h4>Nimaga ta'sir qiladi</h4>" +
    "<p>Indeks reyestrda saralash uchun, panelda esa e'tiborni qaratish uchun ishlatiladi. U jarima emas: past indeks obyektda bajarilmagan ish borligini bildiradi va uning ro'yxati shu yerda ko'rinadi.</p>",
  ru: {
    yorliq: "Для менеджера объекта",
    sarlavha: "Когда индекс пересчитывается",
    tana: "<p>Индекс не хранится в базе. Он считается из текущих данных при открытии карточки или реестра, поэтому всегда показывает сегодняшнее состояние.</p>" +
      "<h4>После чего меняется сразу</h4>" +
      "<ul><li>Подписан акт осмотра.</li>" +
      "<li>Загружен страховой полис или истёк его срок.</li>" +
      "<li>Внесён отчёт об оценке.</li>" +
      "<li>Добавлен документ или исправлен его тип.</li>" +
      "<li>Устройство вышло на связь или пропало; заряд пересёк порог 20%.</li></ul>" +
      "<h4>На что влияет</h4>" +
      "<p>Индекс используется для сортировки в реестре и для расстановки внимания на панели. Это не штраф: низкий индекс означает, что по объекту есть невыполненная работа, и её список виден здесь же.</p>"
  },
  manba: []
},

"tb.i-servis": {
  yorliq: "Servis uchun",
  sarlavha: "Bir servis tashrifining ball qiymati",
  tana: "<p>To'rtinchi qurilma tiklangach ikkita nisbat o'zgaradi va ball 5,4 dan 7,5 ga ko'tariladi &mdash; obyekt indeksi 70 dan 72 ga chiqadi.</p>" +
    "<table><tr><th>Ko'rsatkich</th><th>Oldin</th><th>Keyin</th></tr>" +
    "<tr><td>Onlayn qurilmalar</td><td class='n'>3 / 4</td><td class='n'>4 / 4</td></tr>" +
    "<tr><td>Batareyasi yetarli</td><td class='n'>2 / 3</td><td class='n'>3 / 3</td></tr>" +
    "<tr><td>Himoya ulushi</td><td class='n'>0,36</td><td class='n'>0,50</td></tr>" +
    "<tr><td>Ball</td><td class='n'>5,4</td><td class='n'>7,5</td></tr></table>" +
    "<p>Ikki ball ko'p emas. Lekin 267 obyektga ko'paytirilsa, bu portfel bo'yicha sezilarli farq &mdash; va eng muhimi, aloqasiz qurilma ortida ko'rinmaydigan obyekt turadi.</p>" +
    "<p class='ogoh'>Servis marshruti xavfga qarab tuziladi: qiymati yuqori va chekka obyektlar birinchi navbatda.</p>",
  ru: {
    yorliq: "Для сервиса",
    sarlavha: "Сколько баллов стоит один выезд сервиса",
    tana: "<p>После восстановления четвёртого устройства меняются два отношения, и балл растёт с 5,4 до 7,5 — индекс объекта поднимается с 70 до 72.</p>" +
      "<table><tr><th>Показатель</th><th>До</th><th>После</th></tr>" +
      "<tr><td>Устройств онлайн</td><td class='n'>3 / 4</td><td class='n'>4 / 4</td></tr>" +
      "<tr><td>Заряд достаточен</td><td class='n'>2 / 3</td><td class='n'>3 / 3</td></tr>" +
      "<tr><td>Доля по защите</td><td class='n'>0,36</td><td class='n'>0,50</td></tr>" +
      "<tr><td>Балл</td><td class='n'>5,4</td><td class='n'>7,5</td></tr></table>" +
      "<p>Два балла — немного. Но в пересчёте на 267 объектов это заметная разница по портфелю, и, главное, за устройством без связи стоит объект, которого не видно.</p>" +
      "<p class='ogoh'>Маршрут сервиса строится не по индексу, а по риску: дорогие и отдалённые объекты идут первыми.</p>"
  },
  manba: []
},

"tb.i-shartnoma": {
  yorliq: "Rahbariyat uchun",
  sarlavha: "Nega qurilmalar yolg'iz 7,5 balldan oshmaydi",
  tana: "<p>Himoya bandining yarmi qo'riqlash shartnomasiga ajratilgan. Bu ataylab qilingan: kamera hodisani ko'rsatadi, lekin joyiga hech kim bormasa, aktivning himoyasi to'liq emas.</p>" +
    "<h4>Huquqiy tomoni</h4>" +
    "<p>O'zbekistonda shartnomaviy qo'riqlash faqat davlat xizmati tomonidan amalga oshiriladi. Xususiy kompaniya obyektni qo'riqlay olmaydi &mdash; u jihozni o'rnatadi va servis qiladi.</p>" +
    "<h4>Amaliy qaror</h4>" +
    "<p>267 obyektning hammasiga shartnoma tuzish qimmat. Shuning uchun taqsimot xavf bo'yicha qilinadi: qiymati yuqori va chekka obyektlarga shartnoma, qolganlariga qurilma va navbatchi markazi. Bu qaror rahbariyat darajasida qabul qilinadi.</p>",
  ru: {
    yorliq: "Для правления",
    sarlavha: "Почему одни устройства не дают больше 7,5 балла",
    tana: "<p>Половина пункта по защите отведена договору охраны. Это сделано намеренно: камера показывает событие, но если на место никто не выезжает, защита актива неполная.</p>" +
      "<h4>Правовая сторона</h4>" +
      "<p>В Узбекистане договорная охрана осуществляется только государственной службой. Частная компания объект охранять не может — она ставит оборудование и обслуживает его.</p>" +
      "<h4>Практическое решение</h4>" +
      "<p>Заключать договор на все 267 объектов дорого. Поэтому распределение идёт по риску: дорогим и отдалённым объектам — договор, остальным — устройства и дежурный центр. Это решение принимается на уровне правления.</p>"
  },
  manba: []
},

"tb.m-korik": {
  yorliq: "Inspektor uchun",
  sarlavha: "Ko'rik davri: 90 kun qayerdan va u qanday sanaladi",
  tana: "<p>Sanoq oxirgi <b>imzolangan</b> dalolatnoma sanasidan boshlanadi. Rejalashtirilgan, lekin o'tkazilmagan ko'rik sanoqni qayta boshlamaydi.</p>" +
    "<table><tr><th>Obyekt turi</th><th>Davr</th></tr>" +
    "<tr><td>Bino va inshoot</td><td class='n'>90 kun</td></tr>" +
    "<tr><td>Transport va uskuna</td><td class='n'>30 kun</td></tr>" +
    "<tr><td>Balansga qabuldan keyingi birlamchi ko'rik</td><td class='n'>72 soat</td></tr></table>" +
    "<h4>Nima talab qilinadi</h4>" +
    "<p>Dalolatnomaga kamida oltita surat biriktiriladi: bino uchun to'rt tomon, kirish va ichki xona; transport uchun to'rt tomon, spidometr va VIN.</p>" +
    "<p class='ogoh'>Davrlar bankning ichki me'yori sifatida sozlamalarda turadi va tasdiqlanishi kerak. Ular qonun bilan belgilanmagan &mdash; bu hujjatda shunday yozilgan.</p>",
  ru: {
    yorliq: "Для инспектора",
    sarlavha: "Периодичность осмотра: откуда 90 дней и как они считаются",
    tana: "<p>Отсчёт идёт от даты последнего <b>подписанного</b> акта. Запланированный, но не проведённый осмотр отсчёт не обнуляет.</p>" +
      "<table><tr><th>Тип объекта</th><th>Период</th></tr>" +
      "<tr><td>Здания и сооружения</td><td class='n'>90 дней</td></tr>" +
      "<tr><td>Транспорт и оборудование</td><td class='n'>30 дней</td></tr>" +
      "<tr><td>Первичный осмотр после приёма на баланс</td><td class='n'>72 часа</td></tr></table>" +
      "<h4>Что требуется</h4>" +
      "<p>К акту прикладывается не менее шести фотографий: для здания — четыре стороны, вход и внутреннее помещение; для транспорта — четыре стороны, одометр и VIN.</p>" +
      "<p class='ogoh'>Периоды лежат в настройках как внутренняя норма банка и подлежат утверждению. Законом они не установлены — в документе это указано прямо.</p>"
  },
  manba: []
},

"tb.m-baho": {
  yorliq: "Moliya uchun",
  sarlavha: "Baholash muddati va 30 kunlik ogohlantirish",
  tana: "<p>Hisobot sanasidan 12 oy o'tgach muddat tugaydi. Tizim 30 kun qolganda ogohlantiradi &mdash; bu yangi baholashni buyurtma qilish, o'tkazish va hisobotni olishga yetadigan minimal vaqt.</p>" +
    "<h4>Muddat o'tib ketsa</h4>" +
    "<ul><li>Indeksdagi 20 ball pog'onali tushadi.</li>" +
    "<li>Obyektni savdoga qo'yish uchun yangi hisobot talab qilinadi.</li>" +
    "<li>Zaxira hisobida eskirgan qiymat ishlatiladi va bu hisobot aniqligini buzadi.</li></ul>" +
    "<p class='ogoh'>12 oylik muddat ichki me'yor va Yagona milliy baholash standartiga tayanadi; u sozlamalarda o'zgartiriladi.</p>",
  ru: {
    yorliq: "Для финансов",
    sarlavha: "Срок оценки и предупреждение за 30 дней",
    tana: "<p>Срок истекает через 12 месяцев от даты отчёта. Система предупреждает за 30 дней — это минимум, которого хватает, чтобы заказать оценку, провести её и получить отчёт.</p>" +
      "<h4>Если срок пропущен</h4>" +
      "<ul><li>20 баллов индекса снижаются ступенями.</li>" +
      "<li>Для выставления объекта на торги потребуется новый отчёт.</li>" +
      "<li>В расчёте резерва используется устаревшая стоимость, и это искажает отчётность.</li></ul>" +
      "<p class='ogoh'>Срок в 12 месяцев опирается на внутреннюю норму и Единый национальный стандарт оценки; он меняется в настройках.</p>"
  },
  manba: []
},

"tb.m-sugurta": {
  yorliq: "Moliya uchun",
  sarlavha: "Polis muddati: nega 30 kun oldin ogohlantiriladi",
  tana: "<p>Yangi polis rasmiylashtirish uchun baholash hisoboti, obyekt holati to'g'risidagi ma'lumot va ichki tasdiq kerak. Bir hafta yetmaydi.</p>" +
    "<h4>Muddat tugagan kun nima bo'ladi</h4>" +
    "<ul><li>Indeksdagi 25 balldan 2,5 tasi qoladi.</li>" +
    "<li>Obyekt panelda &laquo;polissiz&raquo; ro'yxatiga tushadi.</li>" +
    "<li>Hodisa yuz bersa, zarar to'liq bankning hisobiga yoziladi.</li></ul>" +
    "<h4>Amaliy qoida</h4>" +
    "<p>Polislarni bir kunga jamlab yangilash arzonroq va boshqarish osonroq. Muddatlar ro'yxati shuning uchun bitta ekranda ko'rsatiladi.</p>",
  ru: {
    yorliq: "Для финансов",
    sarlavha: "Срок полиса: почему предупреждение за 30 дней",
    tana: "<p>Для нового полиса нужны отчёт об оценке, сведения о состоянии объекта и внутреннее согласование. Недели на это не хватает.</p>" +
      "<h4>Что происходит в день истечения</h4>" +
      "<ul><li>Из 25 баллов индекса остаётся 2,5.</li>" +
      "<li>Объект попадает в список «без полиса» на панели.</li>" +
      "<li>При происшествии ущерб целиком ложится на банк.</li></ul>" +
      "<h4>Практическое правило</h4>" +
      "<p>Обновлять полисы пакетом на одну дату дешевле и проще в управлении. Поэтому список сроков показывается на одном экране.</p>"
  },
  manba: []
},

"tb.m-zaxira": {
  yorliq: "Moliya uchun",
  sarlavha: "Balansda turish muddati va zaxira toifalari",
  tana: "<p>Zaxira stavkasi aktivning balansda turgan kuniga qarab oshib boradi. Undiruv natijasida olingan mulk uchun chegara &mdash; bir yil.</p>" +
    "<table><tr><th>Balansda</th><th>Toifa</th><th>Stavka</th></tr>" +
    "<tr><td>90 kungacha</td><td>Substandart</td><td class='n'>10%</td></tr>" +
    "<tr><td>180 kungacha</td><td>Qoniqarsiz</td><td class='n'>25%</td></tr>" +
    "<tr><td>365 kungacha</td><td>Shubhali</td><td class='n'>50%</td></tr>" +
    "<tr><td>365 kundan ortiq</td><td>Umidsiz</td><td class='n'>100%</td></tr></table>" +
    "<h4>Nazorat bu muddatga qanday tegadi</h4>" +
    "<p>Bevosita tegmaydi: muddat sanoqda turadi. Lekin holati saqlangan obyekt tezroq sotiladi va shu chegaraga yetib bormaydi. Talon-taroj qilingan bino esa xaridor topolmay yillab turadi.</p>" +
    "<p class='ogoh'>Boshqa turdagi foydalanilmayotgan mulk uchun muddat uzunroq &mdash; uch yil. Ikkala muddat ham Markaziy bank hujjatlaridan keladi va tizimda o'zgartirilmaydi.</p>",
  ru: {
    yorliq: "Для финансов",
    sarlavha: "Срок нахождения на балансе и категории резерва",
    tana: "<p>Ставка резерва растёт по мере нахождения актива на балансе. Для имущества, полученного при взыскании, порог — один год.</p>" +
      "<table><tr><th>На балансе</th><th>Категория</th><th>Ставка</th></tr>" +
      "<tr><td>до 90 дней</td><td>Субстандартный</td><td class='n'>10%</td></tr>" +
      "<tr><td>до 180 дней</td><td>Неудовлетворительный</td><td class='n'>25%</td></tr>" +
      "<tr><td>до 365 дней</td><td>Сомнительный</td><td class='n'>50%</td></tr>" +
      "<tr><td>больше 365 дней</td><td>Безнадёжный</td><td class='n'>100%</td></tr></table>" +
      "<h4>Как контроль влияет на этот срок</h4>" +
      "<p>Напрямую — никак: срок идёт по календарю. Но сохранный объект продаётся быстрее и до этого порога не доходит. Разграбленное здание, наоборот, стоит годами без покупателя.</p>" +
      "<p class='ogoh'>Для прочего неиспользуемого имущества срок длиннее — три года. Оба срока идут из документов Центрального банка и в системе не меняются.</p>"
  },
  manba: []
},

"tb.m-hodisa": {
  yorliq: "Xavfsizlik uchun",
  sarlavha: "Javob muddati: besh daqiqa qanday sanaladi",
  tana: "<p>Sanoq voqea yaratilgan soniyadan boshlanadi va operator voqeani ochgan paytda to'xtaydi. Hisobga aynan ochilgan vaqt olinadi, xabarnoma yuborilgani sanalmaydi.</p>" +
    "<h4>Muddat o'tib ketsa</h4>" +
    "<ul><li>Voqea smena boshlig'iga dublyaj qilinadi.</li>" +
    "<li>Yozuv oylik SLA hisobotiga tushadi.</li>" +
    "<li>Sabab so'raladi: xabarnoma kelmadimi, ochilmadimi yoki operator band edimi.</li></ul>" +
    "<h4>Nega besh daqiqa</h4>" +
    "<p>Bu chekka obyektda qandaydir chora ko'rishga imkon beradigan eng qisqa real muddat: sirena yoqish, qo'riqlashga xabar berish, jonli videoni kuzatish. Undan qisqasi tungi smenada bajarilmaydi va shartnomaga yozilsa, birinchi oydayoq buziladi.</p>",
  ru: {
    yorliq: "Для безопасности",
    sarlavha: "Срок ответа: как считаются пять минут",
    tana: "<p>Отсчёт начинается в секунду создания инцидента и останавливается, когда оператор его открыл. Считается именно момент открытия инцидента.</p>" +
      "<h4>Если срок пропущен</h4>" +
      "<ul><li>Инцидент дублируется начальнику смены.</li>" +
      "<li>Запись попадает в месячный отчёт по SLA.</li>" +
      "<li>Выясняется причина: уведомление не пришло, не открыли или оператор был занят.</li></ul>" +
      "<h4>Почему пять минут</h4>" +
      "<p>Это самый короткий реальный срок, за который на отдалённом объекте можно что-то предпринять: включить сирену, сообщить охране, посмотреть живое видео. Более короткий в ночную смену не выполняется и, будучи записанным в договор, нарушается в первый же месяц.</p>"
  },
  manba: []
}

});

/* ---------- Masshtab, xavfsizlik va ekspluatatsiya ---------- */
window.MKB_BATAFSIL = Object.assign(window.MKB_BATAFSIL || {}, {

"tb.s-qurilma": {
  yorliq: "Jamoa rahbarlari uchun",
  sarlavha: "Obyektga o'rtacha to'rtta qurilma",
  tana: "<p>To'rtta &mdash; o'rtacha qiymat. Amalda taqsimot notekis va bu smetani ham, serverdagi yukni ham belgilaydi.</p>" +
    "<table><tr><th>Obyekt turi</th><th>Qurilma</th><th>Nimalar</th></tr>" +
    "<tr><td>Uy, kvartira</td><td class='n'>1&ndash;2</td><td>Kamera, eshik datchigi</td></tr>" +
    "<tr><td>Ofis</td><td class='n'>3&ndash;4</td><td>Ikki kamera, domofon, datchiklar</td></tr>" +
    "<tr><td>Ombor va sex</td><td class='n'>5&ndash;8</td><td>Perimetr kameralari, shlyuz, datchiklar</td></tr>" +
    "<tr><td>Yer uchastkasi</td><td class='n'>1</td><td>Ustunga o'rnatilgan avtonom kamera</td></tr></table>" +
    "<p>Balansdagi 267 obyekt uchun bu taxminan 900&ndash;1 100 qurilma. Hisob-kitoblar 1 200 qurilma bo'yicha, ya'ni zaxira bilan olib borilgan.</p>",
  ru: {
    yorliq: "Для тимлида",
    sarlavha: "В среднем четыре устройства на объект",
    tana: "<p>Четыре — это среднее. На практике распределение неровное, и оно определяет и смету, и нагрузку на сервер.</p>" +
      "<table><tr><th>Тип объекта</th><th>Устройств</th><th>Что именно</th></tr>" +
      "<tr><td>Дом, квартира</td><td class='n'>1&ndash;2</td><td>Камера, датчик двери</td></tr>" +
      "<tr><td>Офис</td><td class='n'>3&ndash;4</td><td>Две камеры, домофон, датчики</td></tr>" +
      "<tr><td>Склад и цех</td><td class='n'>5&ndash;8</td><td>Камеры по периметру, шлюз, датчики</td></tr>" +
      "<tr><td>Земельный участок</td><td class='n'>1</td><td>Автономная камера на опоре</td></tr></table>" +
      "<p>Для 267 объектов баланса это примерно 900&ndash;1 100 устройств. Расчёты ведутся по 1 200 устройствам, то есть с запасом.</p>"
  },
  manba: []
},

"tb.s-puls": {
  yorliq: "Jamoa rahbarlari uchun",
  sarlavha: "Puls oqimi: hisob yuqori chegara bo'yicha",
  tana: "<p>Jadvaldagi raqamlar hamma qurilma 60 soniyada puls yuboradi degan farazda hisoblangan. Bu eng yomon holat.</p>" +
    "<p>Amalda batareyali qurilmalar 15 daqiqada bir marta xabar beradi, shuning uchun haqiqiy oqim taxminan uch barobar past bo'ladi. Serverni yuqori chegara bo'yicha o'lchash to'g'ri: keyin qurilma turi o'zgarsa, qayta hisoblash shart bo'lmaydi.</p>" +
    "<h4>Puls bilan nima qilinadi</h4>" +
    "<ul><li>Qurilmaning <code>last_seen</code> maydoni yangilanadi.</li>" +
    "<li>Bazaga yozilmaydi: aks holda kuniga 1,7 million keraksiz qator to'planadi.</li>" +
    "<li>Kutilgan vaqtda puls kelmasa, tizim sukut voqeasini yaratadi.</li></ul>",
  ru: {
    yorliq: "Для тимлида",
    sarlavha: "Поток импульсов: расчёт по верхней границе",
    tana: "<p>Цифры в таблице посчитаны из допущения, что все устройства шлют импульс раз в 60 секунд. Это худший случай.</p>" +
      "<p>На практике батарейные устройства отчитываются раз в 15 минут, поэтому реальный поток примерно втрое ниже. Считать сервер по верхней границе правильно: при смене состава устройств пересчёт не понадобится.</p>" +
      "<h4>Что делается с импульсом</h4>" +
      "<ul><li>Обновляется поле <code>last_seen</code> устройства.</li>" +
      "<li>В базу не пишется: иначе набегает 1,7 миллиона лишних строк в сутки.</li>" +
      "<li>Если импульс не пришёл вовремя, система создаёт инцидент тишины.</li></ul>"
  },
  manba: []
},

"tb.s-hodisa": {
  yorliq: "Jamoa rahbarlari uchun",
  sarlavha: "Kuniga 36 000 hodisa, navbatga 300 tasi",
  tana: "<p>Qurilmaga kuniga o'rtacha 30 hodisa &mdash; bu kamera ichidagi tahlirdan o'tgan, ya'ni allaqachon filtrlangan oqim.</p>" +
    "<table><tr><th>Bosqich</th><th>Kuniga</th></tr>" +
    "<tr><td>Qurilma qayd etgan harakat</td><td class='n'>~250 000</td></tr>" +
    "<tr><td>Tasnifdan o'tib yuborilgan hodisa</td><td class='n'>36 000</td></tr>" +
    "<tr><td>Qoidalardan o'tib voqea bo'lgan</td><td class='n'>~300</td></tr>" +
    "<tr><td>Chora talab qilgan</td><td class='n'>5&ndash;15</td></tr></table>" +
    "<p>Har bosqichda oqim taxminan o'n barobar qisqaradi. Aynan shu filtrlash zanjiri navbatchining ishini bajarilishi mumkin holatga keltiradi.</p>" +
    "<p class='ogoh'>Cho'qqi oqim tekis emas: tong va shom, shamolli kunlar va bayram kechalari yuk bir necha barobar oshadi. Server cho'qqi yuklama bo'yicha o'lchanadi.</p>",
  ru: {
    yorliq: "Для тимлида",
    sarlavha: "36 000 событий в сутки, в очередь попадает 300",
    tana: "<p>В среднем 30 событий на устройство в сутки — это поток уже после аналитики в камере, то есть отфильтрованный.</p>" +
      "<table><tr><th>Этап</th><th>В сутки</th></tr>" +
      "<tr><td>Движение, замеченное устройством</td><td class='n'>~250 000</td></tr>" +
      "<tr><td>Прошло классификацию и отправлено</td><td class='n'>36 000</td></tr>" +
      "<tr><td>Прошло правила и стало инцидентом</td><td class='n'>~300</td></tr>" +
      "<tr><td>Потребовало действий</td><td class='n'>5&ndash;15</td></tr></table>" +
      "<p>На каждом этапе поток сокращается примерно в десять раз. Именно эта цепочка фильтров делает работу дежурного выполнимой.</p>" +
      "<p class='ogoh'>Пик неравномерен: на рассвете и в сумерках, в ветреные дни и праздничные ночи нагрузка вырастает в несколько раз. Сервер считается по пиковой нагрузке.</p>"
  },
  manba: []
},

"tb.s-video": {
  yorliq: "Jamoa rahbarlari uchun",
  sarlavha: "Jonli video: hisob ochilgan oqim soniga qurilgan",
  tana: "<p>Media shlyuzning yuki bir vaqtda ochilgan oqimlarga bog'liq. Ming obyekt bo'lsa ham, agar bir paytda uchta oqim ochilgan bo'lsa, yuk uchta oqimga teng.</p>" +
    "<table><tr><th>Holat</th><th>Oqim</th><th>Kanal</th></tr>" +
    "<tr><td>Tunda, tinch</td><td class='n'>1&ndash;2</td><td class='n'>1 Mbit/s</td></tr>" +
    "<tr><td>Kunduzi, odatiy</td><td class='n'>4&ndash;8</td><td class='n'>4 Mbit/s</td></tr>" +
    "<tr><td>Cho'qqi, 10 operator</td><td class='n'>40</td><td class='n'>20,5 Mbit/s</td></tr></table>" +
    "<h4>Chegara qayerda</h4>" +
    "<p>Bitta media shlyuz nusxasi o'nlab bir vaqtdagi oqimni bemalol uzatadi. Undan yuqorisi uchun ikkinchi nusxa qo'shiladi &mdash; bu konfiguratsiya darajasidagi ish.</p>" +
    "<p class='ogoh'>Arxivni ko'rish jonli oqimdan farq qiladi: u obyekt omboridan HLS bilan beriladi va kameraga umuman tegmaydi.</p>",
  ru: {
    yorliq: "Для тимлида",
    sarlavha: "Живое видео: важно не число объектов, а число открытых потоков",
    tana: "<p>Нагрузка на медиашлюз зависит от одновременно открытых потоков. Даже при тысяче объектов, если открыто три потока, нагрузка равна трём потокам.</p>" +
      "<table><tr><th>Ситуация</th><th>Потоков</th><th>Канал</th></tr>" +
      "<tr><td>Ночь, спокойно</td><td class='n'>1&ndash;2</td><td class='n'>1 Мбит/с</td></tr>" +
      "<tr><td>День, обычная работа</td><td class='n'>4&ndash;8</td><td class='n'>4 Мбит/с</td></tr>" +
      "<tr><td>Пик, 10 операторов</td><td class='n'>40</td><td class='n'>20,5 Мбит/с</td></tr></table>" +
      "<h4>Где предел</h4>" +
      "<p>Один экземпляр медиашлюза спокойно отдаёт десятки одновременных потоков. Выше — добавляется второй экземпляр: это работа на уровне конфигурации.</p>" +
      "<p class='ogoh'>Просмотр архива отличается от живого потока: он отдаётся из объектного хранилища по HLS и камеру не трогает вовсе.</p>"
  },
  manba: []
},

"tb.s-dalil": {
  yorliq: "Jamoa rahbarlari uchun",
  sarlavha: "Dalil arxivi: eng tez o'sadigan hajm",
  tana: "<p>Kadr va klip obyekt omborida yotadi. 90 kunlik saqlash muddatida hajm quyidagicha bo'ladi.</p>" +
    "<table><tr><th>Obyekt</th><th>Kuniga</th><th>90 kun</th><th>Yiliga</th></tr>" +
    "<tr><td>10</td><td class='n'>0,4 GB</td><td class='n'>0,03 TB</td><td class='n'>0,13 TB</td></tr>" +
    "<tr><td>300</td><td class='n'>11 GB</td><td class='n'>0,97 TB</td><td class='n'>3,9 TB</td></tr>" +
    "<tr><td>1 000</td><td class='n'>36 GB</td><td class='n'>3,24 TB</td><td class='n'>13 TB</td></tr></table>" +
    "<h4>Nima hajmni oshiradi</h4>" +
    "<ul><li>Yolg'on signal: har biri kadr va ba'zan klip qoldiradi.</li>" +
    "<li>Sud ishlari: ular bo'yicha fayl 90 kundan keyin ham saqlanadi.</li>" +
    "<li>Kadr o'lchamini oshirish: 1280&times;720 dan 1920&times;1080 ga o'tish hajmni ikki barobardan ko'proq oshiradi.</li></ul>" +
    "<p class='ogoh'>Saqlash siyosati birinchi kundan yoziladi: nima 90 kun, nima ish yopilgunicha, nima arxivga o'tadi. Keyin yozish qiyin va qimmat bo'ladi.</p>",
  ru: {
    yorliq: "Для тимлида",
    sarlavha: "Архив доказательств: самый быстрорастущий объём",
    tana: "<p>Кадры и клипы лежат не в базе, а в объектном хранилище. При сроке хранения 90 дней объёмы такие.</p>" +
      "<table><tr><th>Объектов</th><th>В сутки</th><th>90 дней</th><th>В год</th></tr>" +
      "<tr><td>10</td><td class='n'>0,4 ГБ</td><td class='n'>0,03 ТБ</td><td class='n'>0,13 ТБ</td></tr>" +
      "<tr><td>300</td><td class='n'>11 ГБ</td><td class='n'>0,97 ТБ</td><td class='n'>3,9 ТБ</td></tr>" +
      "<tr><td>1 000</td><td class='n'>36 ГБ</td><td class='n'>3,24 ТБ</td><td class='n'>13 ТБ</td></tr></table>" +
      "<h4>Что увеличивает объём</h4>" +
      "<ul><li>Ложные тревоги: каждая оставляет кадр, иногда клип.</li>" +
      "<li>Судебные дела: файлы по ним хранятся и после 90 дней.</li>" +
      "<li>Увеличение размера кадра: переход с 1280&times;720 на 1920&times;1080 больше чем удваивает объём.</li></ul>" +
      "<p class='ogoh'>Политика хранения пишется с первого дня: что 90 дней, что до закрытия дела, что уходит в архив. Позже это писать трудно и дорого.</p>"
  },
  manba: []
},

"tb.s-kanal": {
  yorliq: "Jamoa rahbarlari uchun",
  sarlavha: "Markaz kanali: nimadan yig'iladi",
  tana: "<table><tr><th>Tarkib</th><th>300 obyekt</th></tr>" +
    "<tr><td>Jonli video, cho'qqida</td><td class='n'>8,2 Mbit/s</td></tr>" +
    "<tr><td>Kadr va klip yuklash</td><td class='n'>6 Mbit/s</td></tr>" +
    "<tr><td>Hodisa va telemetriya</td><td class='n'>&lt; 1 Mbit/s</td></tr>" +
    "<tr><td>Zaxira nusxa va xizmat trafigi</td><td class='n'>3 Mbit/s</td></tr>" +
    "<tr><td>Ikki barobar zaxira bilan</td><td class='n'>36 Mbit/s</td></tr></table>" +
    "<p>Bu bank ma'lumotlar markazi uchun kichik raqam. Diqqat qilinadigan joy boshqa: kanal simmetrik bo'lishi kerak, chunki asosiy oqim ichkariga kiradi.</p>" +
    "<p class='ogoh'>Kanal kengligi bitta obyektning ulanishini yaxshilamaydi. Zaif signalli obyektda muammo uchidagi radioda bo'ladi.</p>",
  ru: {
    yorliq: "Для тимлида",
    sarlavha: "Канал центра: из чего складывается",
    tana: "<table><tr><th>Составляющая</th><th>300 объектов</th></tr>" +
      "<tr><td>Живое видео на пике</td><td class='n'>8,2 Мбит/с</td></tr>" +
      "<tr><td>Загрузка кадров и клипов</td><td class='n'>6 Мбит/с</td></tr>" +
      "<tr><td>События и телеметрия</td><td class='n'>&lt; 1 Мбит/с</td></tr>" +
      "<tr><td>Резервные копии и служебный трафик</td><td class='n'>3 Мбит/с</td></tr>" +
      "<tr><td>С двукратным запасом</td><td class='n'>36 Мбит/с</td></tr></table>" +
      "<p>Для банковского дата-центра это небольшая цифра. Внимание стоит обратить на другое: канал должен быть симметричным, потому что основной поток идёт внутрь.</p>" +
      "<p class='ogoh'>Ширина канала центра не улучшает связь отдельного объекта. На объекте со слабым сигналом проблема не в центре, а в радио на конце линии.</p>"
  },
  manba: []
},

"tb.s-server": {
  yorliq: "Jamoa rahbarlari uchun",
  sarlavha: "Serverlar: pilotdan ming obyektgacha",
  tana: "<table><tr><th>Bosqich</th><th>VM</th><th>vCPU</th><th>RAM</th><th>Disk</th></tr>" +
    "<tr><td>Pilot, 10 obyekt</td><td class='n'>1</td><td class='n'>8</td><td class='n'>16 GB</td><td class='n'>0,5 TB</td></tr>" +
    "<tr><td>Balans, 267&ndash;300</td><td class='n'>6</td><td class='n'>48</td><td class='n'>128 GB</td><td class='n'>1 + 3 TB</td></tr>" +
    "<tr><td>1 000 obyekt</td><td class='n'>12</td><td class='n'>96</td><td class='n'>256 GB</td><td class='n'>2 + 8 TB</td></tr></table>" +
    "<h4>Arxitektura nega o'zgarmaydi</h4>" +
    "<p>O'sish nusxa qo'shish bilan bajariladi: yana bitta adapter ishchisi, yana bitta media shlyuz, bazaga yana bitta o'quvchi nusxa. Kodni qayta yozish talab qilinmaydi, chunki hodisa oqimi allaqachon navbat orqali o'tadi.</p>" +
    "<p class='ogoh'>Ming obyektda o'zgaradigan yagona jiddiy narsa &mdash; ekspluatatsiya: monitoring, navbatchilik va yangilash tartibi rasmiy jarayonga aylanadi.</p>",
  ru: {
    yorliq: "Для тимлида",
    sarlavha: "Серверы: от пилота до тысячи объектов",
    tana: "<table><tr><th>Этап</th><th>ВМ</th><th>vCPU</th><th>RAM</th><th>Диск</th></tr>" +
      "<tr><td>Пилот, 10 объектов</td><td class='n'>1</td><td class='n'>8</td><td class='n'>16 ГБ</td><td class='n'>0,5 ТБ</td></tr>" +
      "<tr><td>Баланс, 267&ndash;300</td><td class='n'>6</td><td class='n'>48</td><td class='n'>128 ГБ</td><td class='n'>1 + 3 ТБ</td></tr>" +
      "<tr><td>1 000 объектов</td><td class='n'>12</td><td class='n'>96</td><td class='n'>256 ГБ</td><td class='n'>2 + 8 ТБ</td></tr></table>" +
      "<h4>Почему архитектура не меняется</h4>" +
      "<p>Рост обеспечивается добавлением экземпляров: ещё один обработчик адаптера, ещё один медиашлюз, ещё одна читающая реплика базы. Переписывать код не нужно, потому что поток событий уже идёт через очередь.</p>" +
      "<p class='ogoh'>Единственное, что серьёзно меняется на тысяче объектов, — эксплуатация: мониторинг, дежурства и порядок обновлений становятся формальным процессом.</p>"
  },
  manba: []
},

"tb.s-jamoa": {
  yorliq: "Xavfsizlik uchun",
  sarlavha: "Navbatchi smenasi: nechta odam kerak",
  tana: "<p>Hisob sutkalik qoplashga bog'liq. Kun-tun navbatchilik uchun bitta o'rinni yopish 4&ndash;5 shtat birligini talab qiladi: smenalar, dam olish va ta'til.</p>" +
    "<table><tr><th>Obyekt</th><th>Bir smenada</th><th>Kuniga voqea</th></tr>" +
    "<tr><td>10</td><td class='n'>1</td><td class='n'>~10</td></tr>" +
    "<tr><td>300</td><td class='n'>2</td><td class='n'>~300</td></tr>" +
    "<tr><td>1 000</td><td class='n'>4</td><td class='n'>~1 000</td></tr></table>" +
    "<h4>Chegara qayerda</h4>" +
    "<p>Bir kishi tungi smenada 40&ndash;60 tadan ortiq voqeani sifatli ko'ra olmaydi. Shundan oshsa, u ro'yxatni tez yopishga o'tadi va bu xavfli: yolg'on signal bilan haqiqiysini ajratmay qo'yadi.</p>" +
    "<p class='ogoh'>Voqealar sonini kamaytirish smena qo'shishdan arzon: filtrni sozlash, takrorni yig'ish va eng ko'p yolg'on signal beradigan uchta kamerani to'g'rilash.</p>",
  ru: {
    yorliq: "Для безопасности",
    sarlavha: "Дежурная смена: сколько нужно людей",
    tana: "<p>Расчёт зависит не от числа событий, а от круглосуточного покрытия. Чтобы закрыть одно место в режиме 24/7, нужно 4&ndash;5 штатных единиц: смены, выходные и отпуска.</p>" +
      "<table><tr><th>Объектов</th><th>В смену</th><th>Инцидентов в сутки</th></tr>" +
      "<tr><td>10</td><td class='n'>1</td><td class='n'>~10</td></tr>" +
      "<tr><td>300</td><td class='n'>2</td><td class='n'>~300</td></tr>" +
      "<tr><td>1 000</td><td class='n'>4</td><td class='n'>~1 000</td></tr></table>" +
      "<h4>Где предел</h4>" +
      "<p>За ночную смену один человек качественно обрабатывает не больше 40&ndash;60 инцидентов. Сверх этого он переходит к быстрому закрытию списка, а это опасно: перестаёт отличать ложное от настоящего.</p>" +
      "<p class='ogoh'>Сократить число инцидентов дешевле, чем добавить смену: настроить фильтры, склеивать повторы и починить три камеры, дающие больше всего ложных срабатываний.</p>"
  },
  manba: []
},

"tb.o-tor": {
  yorliq: "Jamoa rahbarlari uchun",
  sarlavha: "Disk: o'sish rejasi birinchi yildan tuziladi",
  tana: "<p>Protsessor va xotira uzoq yillar yetadi, disk esa doimiy o'sadi. 267 obyekt uchun 90 kunlik arxiv 1 TB dan oshadi va har chorakda 0,8 TB qo'shiladi.</p>" +
    "<h4>Nima qilinadi</h4>" +
    "<ul><li>Saqlash siyosati: 90 kundan keyin kadr qoladi, klip o'chadi &mdash; agar voqea bilan bog'lanmagan bo'lsa.</li>" +
    "<li>Sud va sug'urta ishlari bilan bog'langan fayllar alohida belgilanadi va o'chirilmaydi.</li>" +
    "<li>Obyekt ombori kengaytiriladigan qilib quriladi: yangi disk qo'shish to'xtatishni talab qilmaydi.</li></ul>" +
    "<p class='ogoh'>Diskni to'lib qolgandan keyin kengaytirish &mdash; eng yomon variant: shu paytda yozuv to'xtaydi va dalil yo'qoladi. Chegara 70% da ogohlantirish beradi.</p>",
  ru: {
    yorliq: "Для тимлида",
    sarlavha: "Диск: план роста составляется с первого года",
    tana: "<p>Процессора и памяти хватает надолго, а диск растёт постоянно. Для 267 объектов архив за 90 дней превышает 1 ТБ и прибавляет 0,8 ТБ каждый квартал.</p>" +
      "<h4>Что делается</h4>" +
      "<ul><li>Политика хранения: через 90 дней кадр остаётся, клип удаляется — если он не привязан к инциденту.</li>" +
      "<li>Файлы по судебным и страховым делам помечаются отдельно и не удаляются.</li>" +
      "<li>Объектное хранилище строится расширяемым: добавление диска не требует остановки.</li></ul>" +
      "<p class='ogoh'>Расширять диск после переполнения — худший вариант: в этот момент запись останавливается и доказательства теряются. Предупреждение подаётся на отметке 70%.</p>"
  },
  manba: []
},

"tb.o-media": {
  yorliq: "Jamoa rahbarlari uchun",
  sarlavha: "Media shlyuz: ikkinchi nusxa qachon kerak",
  tana: "<p>Bitta nusxa o'nlab bir vaqtdagi oqimni uzatadi. Ikkinchi nusxa ikki sababga ko'ra qo'shiladi: yuk va uzluksizlik.</p>" +
    "<table><tr><th>Sabab</th><th>Belgisi</th></tr>" +
    "<tr><td>Yuk</td><td>Cho'qqida 40 dan ortiq bir vaqtdagi oqim</td></tr>" +
    "<tr><td>Uzluksizlik</td><td>Yangilash paytida video to'xtamasligi kerak</td></tr>" +
    "<tr><td>Kechikish</td><td>Filiallar uchun alohida nusxa yaqinroq turadi</td></tr></table>" +
    "<h4>Nima o'zgarmaydi</h4>" +
    "<p>Nusxa qo'shish konfiguratsiya masalasi: kameralar reyestrda qoladi, sessiya tokenlari bir xil ishlaydi, interfeys o'zgarmaydi. Shuning uchun bu qaror keyinga qoldirilishi mumkin.</p>",
  ru: {
    yorliq: "Для тимлида",
    sarlavha: "Медиашлюз: когда нужен второй экземпляр",
    tana: "<p>Один экземпляр отдаёт десятки одновременных потоков. Второй добавляется по двум причинам: нагрузка и непрерывность.</p>" +
      "<table><tr><th>Причина</th><th>Признак</th></tr>" +
      "<tr><td>Нагрузка</td><td>На пике больше 40 одновременных потоков</td></tr>" +
      "<tr><td>Непрерывность</td><td>Видео не должно прерываться во время обновления</td></tr>" +
      "<tr><td>Задержка</td><td>Для филиалов отдельный экземпляр стоит ближе</td></tr></table>" +
      "<h4>Что не меняется</h4>" +
      "<p>Добавление экземпляра — вопрос конфигурации: камеры остаются в реестре, сессионные токены работают так же, интерфейс не меняется. Поэтому решение можно отложить.</p>"
  },
  manba: []
},

"tb.o-odam": {
  yorliq: "Xavfsizlik uchun",
  sarlavha: "Navbatchining e'tibori: haqiqiy chegara",
  tana: "<p>Server yukini pul bilan hal qilish mumkin, odamning e'tiborini emas. Shuning uchun filtrlash zanjiri tashkiliy talab bo'lib qoladi.</p>" +
    "<table><tr><th>Bosqich</th><th>Kuniga</th><th>Kim ko'radi</th></tr>" +
    "<tr><td>Yuborilgan hodisa</td><td class='n'>36 000</td><td>Hech kim, bazada qoladi</td></tr>" +
    "<tr><td>Voqea</td><td class='n'>~300</td><td>Navbatchi ro'yxatda</td></tr>" +
    "<tr><td>Xabarnoma</td><td class='n'>40&ndash;60</td><td>Navbatchi telefonda</td></tr>" +
    "<tr><td>Chora</td><td class='n'>5&ndash;15</td><td>Navbatchi va qo'riqlash</td></tr></table>" +
    "<h4>Nima buzadi</h4>" +
    "<p>Bitta sozlanmagan kamera kuniga o'nlab yolg'on xabarnoma beradi va butun smenani ishdan chiqaradi. Haftalik tahlilda eng ko'p signal beradigan uchta kamera aniqlanadi va keyingi servis chiqishida to'g'rilanadi.</p>",
  ru: {
    yorliq: "Для безопасности",
    sarlavha: "Внимание дежурного: настоящее ограничение",
    tana: "<p>Нагрузку на сервер можно решить деньгами, внимание человека — нет. Поэтому цепочка фильтров — требование не техническое, а организационное.</p>" +
      "<table><tr><th>Этап</th><th>В сутки</th><th>Кто видит</th></tr>" +
      "<tr><td>Отправленное событие</td><td class='n'>36 000</td><td>Никто, остаётся в базе</td></tr>" +
      "<tr><td>Инцидент</td><td class='n'>~300</td><td>Дежурный в списке</td></tr>" +
      "<tr><td>Уведомление</td><td class='n'>40&ndash;60</td><td>Дежурный на телефоне</td></tr>" +
      "<tr><td>Действие</td><td class='n'>5&ndash;15</td><td>Дежурный и охрана</td></tr></table>" +
      "<h4>Что ломает схему</h4>" +
      "<p>Одна ненастроенная камера даёт десятки ложных уведомлений в сутки и выводит из строя всю смену. На недельном разборе определяются три самые «шумные» камеры, и их правят при ближайшем выезде сервиса.</p>"
  },
  manba: []
},

"tb.x-kanal": {
  yorliq: "Xavfsizlik uchun",
  sarlavha: "Qurilmadan markazgacha bo'lgan yo'lning himoyasi",
  tana: "<table><tr><th>Chora</th><th>Nimadan himoya qiladi</th></tr>" +
    "<tr><td>Yopiq APN</td><td>Qurilma ochiq internetdan ko'rinmaydi</td></tr>" +
    "<tr><td>mTLS, bank CA</td><td>Soxta qurilma va soxta server</td></tr>" +
    "<tr><td>Sertifikatni bekor qilish</td><td>O'g'irlangan qurilma</td></tr>" +
    "<tr><td>Chiquvchi ulanish</td><td>Tashqaridan kirish yo'li yo'q</td></tr>" +
    "<tr><td>So'rov chegarasi</td><td>Buzilgan qurilmaning markazni to'ldirishi</td></tr></table>" +
    "<h4>Sertifikatni boshqarish</h4>" +
    "<p>Har shlyuzga alohida sertifikat, amal muddati bir yil. Yangilash avtomatik, monitoringda 30 kunlik ogohlantirish. Bekor qilingan sertifikatlar ro'yxati markazda saqlanadi va ulanishda tekshiriladi.</p>" +
    "<p class='ogoh'>Sertifikat muddatining o'tishi &mdash; ommaviy uzilishning eng ko'p uchraydigan sababi. Shu sababli u alohida ko'rsatkich sifatida panelda turadi.</p>",
  ru: {
    yorliq: "Для безопасности",
    sarlavha: "Защита пути от устройства до центра",
    tana: "<table><tr><th>Мера</th><th>От чего защищает</th></tr>" +
      "<tr><td>Закрытый APN</td><td>Устройство не видно из открытого интернета</td></tr>" +
      "<tr><td>mTLS с CA банка</td><td>Поддельное устройство и поддельный сервер</td></tr>" +
      "<tr><td>Отзыв сертификата</td><td>Украденное устройство</td></tr>" +
      "<tr><td>Только исходящие соединения</td><td>Входящего пути снаружи нет</td></tr>" +
      "<tr><td>Ограничение частоты запросов</td><td>Взломанное устройство не зальёт центр</td></tr></table>" +
      "<h4>Управление сертификатами</h4>" +
      "<p>На каждый шлюз отдельный сертификат сроком на год. Обновление автоматическое, в мониторинге предупреждение за 30 дней. Список отозванных сертификатов хранится в центре и проверяется при подключении.</p>" +
      "<p class='ogoh'>Истечение сертификата — самая частая причина массовых отказов. Поэтому он вынесен на панель отдельным показателем.</p>"
  },
  manba: []
},

"tb.x-kirish": {
  yorliq: "Xavfsizlik uchun",
  sarlavha: "Xodim tomonidan kirish: AD, rol va ikkinchi omil",
  tana: "<p>Tizimda alohida parol yaratilmaydi. Kirish bank AD hisobi orqali, rol esa AD guruhidan olinadi.</p>" +
    "<table><tr><th>Talab</th><th>Qiymat</th></tr>" +
    "<tr><td>Sessiya muddati</td><td>8 soat</td></tr>" +
    "<tr><td>Ikkinchi omil</td><td>Buyruq beradigan rollar uchun majburiy</td></tr>" +
    "<tr><td>Rolni o'zgartirish</td><td>AD guruhida, ikkinchi xodim tasdig'i bilan</td></tr>" +
    "<tr><td>Ishdan bo'shash</td><td>AD da o'chirilgach, kirish avtomatik yopiladi</td></tr></table>" +
    "<h4>Nega bu muhim</h4>" +
    "<p>Alohida parollar tizimida ishdan ketgan xodimning hisobi yillab ochiq qoladi. AD orqali kirishda bu muammo yo'q: kadrlar bo'limining amali darhol kuchga kiradi.</p>",
  ru: {
    yorliq: "Для безопасности",
    sarlavha: "Доступ сотрудника: AD, роль и второй фактор",
    tana: "<p>Отдельный пароль в системе не заводится. Вход через учётную запись AD банка, роль берётся из группы AD.</p>" +
      "<table><tr><th>Требование</th><th>Значение</th></tr>" +
      "<tr><td>Срок сессии</td><td>8 часов</td></tr>" +
      "<tr><td>Второй фактор</td><td>Обязателен для ролей с правом команд</td></tr>" +
      "<tr><td>Смена роли</td><td>В группе AD, с подтверждением вторым сотрудником</td></tr>" +
      "<tr><td>Увольнение</td><td>После отключения в AD доступ закрывается автоматически</td></tr></table>" +
      "<h4>Почему это важно</h4>" +
      "<p>В системе с собственными паролями учётка уволившегося сотрудника остаётся открытой годами. При входе через AD этой проблемы нет: действие кадровой службы вступает в силу сразу.</p>"
  },
  manba: []
},

"tb.x-joy": {
  yorliq: "Yuristlar uchun",
  sarlavha: "Ma'lumot qayerda saqlanadi va nega bu talab",
  tana: "<p>Kadr, klip, telemetriya, reyestr va jurnal bank ma'lumotlar markazidagi omborda saqlanadi. Bu texnik afzallik emas, huquqiy talab: O'zbekiston fuqarolarining shaxsga doir ma'lumotlari mamlakat hududidagi bazalarda qayta ishlanishi kerak.</p>" +
    "<h4>Videoyozuv shaxsga doir ma'lumotmi</h4>" +
    "<p>Odam tushgan yozuv shaxsga doir ma'lumot hisoblanadi. Shuning uchun uchta qoida amal qiladi: obyekt kirishida ogohlantirish lavhasi, kirish huquqining rol bo'yicha cheklanishi va saqlash muddatining belgilanganligi.</p>" +
    "<h4>Bulut qanday ishlatiladi</h4>" +
    "<ul><li>Qurilmani birinchi sozlashda va proshivka yangilashda.</li>" +
    "<li>Dalil sifatida bulutdagi nusxa ishlatilmaydi.</li>" +
    "<li>Bulutsiz to'liq ishlamaydigan brendlar tanlovda alohida belgilanadi.</li></ul>",
  ru: {
    yorliq: "Для юристов",
    sarlavha: "Где хранятся данные и почему это требование",
    tana: "<p>Кадры, клипы, телеметрия, реестр и журнал хранятся в хранилище дата-центра банка. Это не техническое предпочтение, а правовое требование: персональные данные граждан Узбекистана обрабатываются в базах на территории страны.</p>" +
      "<h4>Является ли видеозапись персональными данными</h4>" +
      "<p>Запись, на которой виден человек, относится к персональным данным. Поэтому действуют три правила: предупреждающая табличка на входе, ограничение доступа по ролям и установленный срок хранения.</p>" +
      "<h4>Как используется облако</h4>" +
      "<ul><li>При первичной настройке устройства и обновлении прошивки.</li>" +
      "<li>Копия в облаке доказательством не служит.</li>" +
      "<li>Бренды, не работающие без облака полностью, отдельно отмечаются при выборе.</li></ul>"
  },
  manba: []
},

"tb.x-qurilma": {
  yorliq: "Montajchilar uchun",
  sarlavha: "Qurilmani himoyalash: montaj varag'idagi majburiy bandlar",
  tana: "<table><tr><th>Band</th><th>Nima qilinadi</th></tr>" +
    "<tr><td>Parol</td><td>Zavod paroli almashtiriladi, yangi parol omborda saqlanadi</td></tr>" +
    "<tr><td>Xizmatlar</td><td>UPnP, Telnet va keraksiz portlar o'chiriladi</td></tr>" +
    "<tr><td>Proshivka</td><td>Yetkazuvchi saytidan yangilanadi, versiya reyestrga yoziladi</td></tr>" +
    "<tr><td>Vaqt</td><td>NTP sozlanadi, soat tekshiriladi</td></tr>" +
    "<tr><td>Sertifikat</td><td>Shlyuzga bank sertifikati o'rnatiladi</td></tr>" +
    "<tr><td>Yorliq</td><td>QR-yorliq yopishtiriladi va reyestrga bog'lanadi</td></tr></table>" +
    "<p>Bu bandlar bajarilmagan qurilma tizimga ulanmaydi va qabul dalolatnomasi imzolanmaydi. Tekshiruv montajchining ilovasida ro'yxat ko'rinishida turadi.</p>" +
    "<p class='ogoh'>Zavod paroli bilan qolgan kamera internetda bir necha soat ichida topiladi. Bu nazariy xatar emas: ommaviy skanerlar shu bilan shug'ullanadi.</p>",
  ru: {
    yorliq: "Для монтажников",
    sarlavha: "Защита устройства: обязательные пункты листа монтажа",
    tana: "<table><tr><th>Пункт</th><th>Что делается</th></tr>" +
      "<tr><td>Пароль</td><td>Заводской пароль меняется, новый хранится в хранилище секретов</td></tr>" +
      "<tr><td>Службы</td><td>Отключаются UPnP, Telnet и лишние порты</td></tr>" +
      "<tr><td>Прошивка</td><td>Обновляется с сайта поставщика, версия пишется в реестр</td></tr>" +
      "<tr><td>Время</td><td>Настраивается NTP, проверяются часы</td></tr>" +
      "<tr><td>Сертификат</td><td>На шлюз ставится сертификат банка</td></tr>" +
      "<tr><td>Метка</td><td>Клеится QR-метка и привязывается к реестру</td></tr></table>" +
      "<p>Устройство, на котором эти пункты не выполнены, к системе не подключается и акт приёмки не подписывается. Проверка выводится списком в приложении монтажника.</p>" +
      "<p class='ogoh'>Камера с заводским паролем находится в интернете за несколько часов. Это не теоретический риск: массовые сканеры занимаются именно этим.</p>"
  },
  manba: []
},

"tb.x-taqiq": {
  yorliq: "Yuristlar uchun",
  sarlavha: "Taqiqlar ro'yxati va ularning sababi",
  tana: "<table><tr><th>Taqiq</th><th>Sababi</th></tr>" +
    "<tr><td>Yuzni tanish bazasi yuritilmaydi</td><td>Biometrik ma'lumotni qayta ishlash alohida huquqiy asos talab qiladi</td></tr>" +
    "<tr><td>Doimiy jonli translyatsiya berilmaydi</td><td>Kuzatuvning maqsadi aktivni himoya qilish, odamni kuzatish emas</td></tr>" +
    "<tr><td>Klip messenjerga yuborilmaydi</td><td>Nusxa nazoratdan chiqadi va dalil kuchini yo'qotadi</td></tr>" +
    "<tr><td>Kamera qo'shni hududga qaratilmaydi</td><td>Uchinchi shaxs huquqining buzilishi</td></tr>" +
    "<tr><td>Yozuv ogohlantirishsiz olinmaydi</td><td>Ogohlantirish lavhasi majburiy</td></tr></table>" +
    "<h4>Rasmiy eksport qanday bo'ladi</h4>" +
    "<p>So'rov tizimda rasmiylashtiriladi: kim so'ragan, qaysi ish uchun, qaysi vaqt oralig'i. Fayl suv belgisi va vaqt tamg'asi bilan beriladi, xesh va jurnal ko'chirmasi ilova qilinadi. Har eksport jurnalda qoladi.</p>",
  ru: {
    yorliq: "Для юристов",
    sarlavha: "Список запретов и причины",
    tana: "<table><tr><th>Запрет</th><th>Причина</th></tr>" +
      "<tr><td>Не ведётся база распознавания лиц</td><td>Обработка биометрии требует отдельного правового основания</td></tr>" +
      "<tr><td>Не выдаётся постоянная трансляция</td><td>Цель наблюдения — защита актива, а не слежка за человеком</td></tr>" +
      "<tr><td>Клип не отправляется в мессенджер</td><td>Копия выходит из-под контроля и теряет доказательственную силу</td></tr>" +
      "<tr><td>Камера не направляется на соседнюю территорию</td><td>Нарушение прав третьих лиц</td></tr>" +
      "<tr><td>Запись не ведётся без предупреждения</td><td>Предупреждающая табличка обязательна</td></tr></table>" +
      "<h4>Как выглядит официальная выгрузка</h4>" +
      "<p>Запрос оформляется в системе: кто запросил, по какому делу, за какой интервал. Файл выдаётся с водяным знаком и отметкой времени, прикладываются хеш и выписка из журнала. Каждая выгрузка остаётся в журнале.</p>"
  },
  manba: []
},

"tb.e-navbatchi": {
  yorliq: "Xavfsizlik uchun",
  sarlavha: "Navbatchi smenasi: bu ishni pudratchiga berib bo'lmaydi",
  tana: "<p>Texnik navbatchilikni autsorsingga berish mumkin, lekin aktiv bo'yicha qaror qabul qilishni emas: sirena yoqish, qo'riqlashni chaqirish va yolg'on signal deb yopish bankning javobgarligi.</p>" +
    "<h4>Smenada nima qilinadi</h4>" +
    "<ul><li>Voqealarga javob berish va sabab bilan yopish.</li>" +
    "<li>Smena oxirida qisqa hisobot: nechta voqea, nechtasi yolg'on, nimaga chora ko'rilgan.</li>" +
    "<li>Aloqasi uzilgan obyektlar ro'yxatini ertalab servisga uzatish.</li></ul>" +
    "<h4>Bajarilmasa</h4>" +
    "<p>Hodisalar keladi, lekin ularga hech kim javob bermaydi. Olti oydan keyin tizim &laquo;ishlamaydi&raquo; deb baholanadi, holbuki u ishlayapti &mdash; faqat uning natijasini hech kim ko'rmayapti.</p>",
  ru: {
    yorliq: "Для безопасности",
    sarlavha: "Дежурная смена: эту работу нельзя отдать подрядчику",
    tana: "<p>Техническое дежурство можно отдать на аутсорс, а принятие решений по активу — нет: включить сирену, вызвать охрану и закрыть как ложную тревогу — ответственность банка.</p>" +
      "<h4>Что делается в смену</h4>" +
      "<ul><li>Ответ на инциденты и закрытие их с указанием причины.</li>" +
      "<li>Короткий отчёт в конце смены: сколько инцидентов, сколько ложных, по чему приняты меры.</li>" +
      "<li>Передача списка объектов без связи утренней сервисной службе.</li></ul>" +
      "<h4>Если не выполняется</h4>" +
      "<p>События приходят, но на них никто не отвечает. Через полгода система будет признана «неработающей», хотя она работает — просто её результат никто не смотрит.</p>"
  },
  manba: []
},

"tb.e-reyestr": {
  yorliq: "Administrator uchun",
  sarlavha: "Reyestr: ma'lumot eskirsa, hamma narsa buziladi",
  tana: "<p>Reyestr qurilma, SIM, sertifikat va obyekt bog'lanishini saqlaydi. U haqiqatdan orqada qolsa, hodisa noto'g'ri obyektga tushadi va servis noto'g'ri manzilga chiqadi.</p>" +
    "<h4>Eng ko'p uchraydigan xatolar</h4>" +
    "<ul><li>Qurilma boshqa obyektga ko'chirilgan, reyestr yangilanmagan.</li>" +
    "<li>SIM almashtirilgan, eski raqam yozuvda qolgan.</li>" +
    "<li>Servis kamerani almashtirgan, seriya raqami eski.</li></ul>" +
    "<h4>Nima yordam beradi</h4>" +
    "<p>Har qurilmada QR-yorliq bo'ladi: montajchi yoki servis xodimi uni skanerlaydi va yozuv ilovada darrov yangilanadi. Qog'ozda to'ldirib, keyin kiritish tartibi ishlamaydi &mdash; amalda yarim yozuv kiritilmay qoladi.</p>",
  ru: {
    yorliq: "Для администратора",
    sarlavha: "Реестр: устарел он — ломается всё остальное",
    tana: "<p>Реестр хранит связь устройства, SIM, сертификата и объекта. Если он отстал от реальности, событие попадает не на тот объект, а сервис едет не по тому адресу.</p>" +
      "<h4>Самые частые ошибки</h4>" +
      "<ul><li>Устройство перенесли на другой объект, реестр не обновили.</li>" +
      "<li>Заменили SIM, в записи остался старый номер.</li>" +
      "<li>Сервис поменял камеру, серийный номер остался прежним.</li></ul>" +
      "<h4>Что помогает</h4>" +
      "<p>На каждом устройстве QR-метка: монтажник или сервисный сотрудник сканирует её, и запись обновляется в приложении сразу. Схема «заполнить на бумаге, внести потом» не работает — на практике половина записей так и не вносится.</p>"
  },
  manba: []
},

"tb.e-sertifikat": {
  yorliq: "Administrator uchun",
  sarlavha: "Sertifikat almashtirish: bir kunda yuzta obyekt uzilmasligi uchun",
  tana: "<p>Agar hamma sertifikat bitta kunda berilgan bo'lsa, ular ham bitta kunda tugaydi. Bu klassik nosozlik: bir kechada butun tarmoq uziladi.</p>" +
    "<h4>Qanday oldini olinadi</h4>" +
    "<ul><li>Amal muddatlari qasddan taqsimlanadi: har hafta bir guruh yangilanadi.</li>" +
    "<li>Yangilash avtomatik, muddat tugashiga 30 kun qolganda boshlanadi.</li>" +
    "<li>Monitoringda ikkita ko'rsatkich: eng yaqin tugash sanasi va 30 kundan kam qolgan qurilmalar soni.</li></ul>" +
    "<p class='ogoh'>Sertifikatlarning bank ichida chiqarilishi muhim: tashqi xizmatga bog'lanish yangilashni tashqi shartnomaga bog'lab qo'yadi.</p>",
  ru: {
    yorliq: "Для администратора",
    sarlavha: "Смена сертификатов: чтобы за один день не отвалилась сотня объектов",
    tana: "<p>Если все сертификаты выпущены в один день, истекут они тоже в один день. Это классический отказ: за одну ночь отваливается вся сеть.</p>" +
      "<h4>Как это предотвращается</h4>" +
      "<ul><li>Сроки намеренно разносятся: каждую неделю обновляется своя группа.</li>" +
      "<li>Обновление автоматическое, запускается за 30 дней до истечения.</li>" +
      "<li>В мониторинге два показателя: ближайшая дата истечения и число устройств, у которых осталось меньше 30 дней.</li></ul>" +
      "<p class='ogoh'>Важно, чтобы сертификаты выпускались внутри банка: привязка к внешнему сервису ставит обновление в зависимость от стороннего договора.</p>"
  },
  manba: []
},

"tb.e-zaxira": {
  yorliq: "Jamoa rahbarlari uchun",
  sarlavha: "Zaxira nusxa: sinalmagan zaxira mavjud emas",
  tana: "<p>Baza har kecha to'liq nusxalanadi, tranzaksiya jurnali uzluksiz yoziladi. Lekin asosiy qoida boshqa: tiklash oyiga kamida bir marta amalda sinaladi.</p>" +
    "<h4>Sinov nimani tekshiradi</h4>" +
    "<ul><li>Nusxa ochiladimi va baza ishga tushadimi.</li>" +
    "<li>Tiklash qancha vaqt oladi &mdash; bu raqam rejada turishi kerak.</li>" +
    "<li>Obyekt omboridagi fayllar bilan bazadagi manzillar mos keladimi.</li></ul>" +
    "<h4>Nimalar nusxalanadi</h4>" +
    "<table><tr><th>Ma'lumot</th><th>Davriyligi</th><th>Saqlash</th></tr>" +
    "<tr><td>Baza</td><td>Har kecha to'liq, WAL uzluksiz</td><td>30 kun</td></tr>" +
    "<tr><td>Dalil fayllari</td><td>Ikkinchi diskka doimiy</td><td>90 kun</td></tr>" +
    "<tr><td>Jurnal</td><td>Har kecha, alohida omborga</td><td>5 yil</td></tr></table>",
  ru: {
    yorliq: "Для тимлида",
    sarlavha: "Резервные копии: непроверенной копии не существует",
    tana: "<p>База копируется полностью каждую ночь, журнал транзакций пишется непрерывно. Но главное правило другое: восстановление проверяется на практике не реже раза в месяц.</p>" +
      "<h4>Что проверяет учебное восстановление</h4>" +
      "<ul><li>Открывается ли копия и поднимается ли база.</li>" +
      "<li>Сколько занимает восстановление — эта цифра должна быть в плане.</li>" +
      "<li>Сходятся ли файлы в объектном хранилище с адресами в базе.</li></ul>" +
      "<h4>Что копируется</h4>" +
      "<table><tr><th>Данные</th><th>Периодичность</th><th>Хранение</th></tr>" +
      "<tr><td>База</td><td>Полная копия ночью, WAL непрерывно</td><td>30 дней</td></tr>" +
      "<tr><td>Файлы доказательств</td><td>Постоянно на второй диск</td><td>90 дней</td></tr>" +
      "<tr><td>Журнал</td><td>Ночью, в отдельное хранилище</td><td>5 лет</td></tr></table>"
  },
  manba: []
},

"tb.e-adapter": {
  yorliq: "Jamoa rahbarlari uchun",
  sarlavha: "Proshivka yangilash: sinovdan keyin va ish kunida",
  tana: "<p>Yetkazuvchi proshivkani o'zgartirganda hodisa maydonlari ham o'zgarishi mumkin. Shuning uchun tartib qat'iy.</p>" +
    "<ol><li>Yangi proshivka stoldagi sinov qurilmasiga o'rnatiladi.</li>" +
    "<li>Hodisa, kadr, buyruq va video sinovdan o'tkaziladi.</li>" +
    "<li>Pilot obyektlarining bittasiga chiqariladi va bir hafta kuzatiladi.</li>" +
    "<li>Keyin guruhlar bo'yicha tarqatiladi, ish kunining birinchi yarmida.</li></ol>" +
    "<h4>Nega tunda emas</h4>" +
    "<p>Tunda chiqarilgan yangilanish xato bersa, uni ertalabgacha hech kim ko'rmaydi va shu vaqt ichida obyektlar nazoratsiz qoladi. Kunduzi jamoa joyida bo'ladi.</p>" +
    "<p class='ogoh'>Avtomatik yangilanish qurilmalarda o'chiriladi: yangilanish vaqtini bank o'zi belgilaydi.</p>",
  ru: {
    yorliq: "Для тимлида",
    sarlavha: "Обновление прошивок: после испытаний и в рабочий день",
    tana: "<p>Меняя прошивку, поставщик может изменить и поля событий. Поэтому порядок жёсткий.</p>" +
      "<ol><li>Новая прошивка ставится на стендовое устройство.</li>" +
      "<li>Проверяются события, кадр, команды и видео.</li>" +
      "<li>Выкатывается на один пилотный объект и наблюдается неделю.</li>" +
      "<li>Затем раскатывается группами, в первой половине рабочего дня.</li></ol>" +
      "<h4>Почему не ночью</h4>" +
      "<p>Ошибка ночного обновления до утра остаётся незамеченной, и всё это время объекты без контроля. Днём команда на месте.</p>" +
      "<p class='ogoh'>Автообновление на устройствах отключается: время обновления определяет банк.</p>"
  },
  manba: []
},

"tb.e-yolgon": {
  yorliq: "Inspektor uchun",
  sarlavha: "Haftalik tahlil: o'n besh daqiqalik ish, katta natija",
  tana: "<p>Haftada bir marta yolg'on signallar kamera bo'yicha guruhlanadi va ro'yxatning birinchi uchtasi ko'riladi.</p>" +
    "<table><tr><th>Ko'rsatkich</th><th>Nimani ko'rsatadi</th></tr>" +
    "<tr><td>Kamera bo'yicha yolg'on signal soni</td><td>Qaysi kamerani sozlash kerak</td></tr>" +
    "<tr><td>Sabablar taqsimoti</td><td>Hayvon, shamol, yorug'lik, yog'ingarchilik</td></tr>" +
    "<tr><td>Vaqt bo'yicha taqsimot</td><td>Tong va shom cho'qqilari sozlash kerakligini bildiradi</td></tr>" +
    "<tr><td>Yopilmagan voqealar</td><td>Smena tartibidagi muammo</td></tr></table>" +
    "<p>Uchta eng shovqinli kamerani to'g'rilash odatda umumiy yolg'on signal sonini yarmiga tushiradi. Bu ishning qiymati bir soatdan kam, foydasi esa butun smenaga tegadi.</p>",
  ru: {
    yorliq: "Для инспектора",
    sarlavha: "Недельный разбор: пятнадцать минут работы, большой эффект",
    tana: "<p>Раз в неделю ложные тревоги группируются по камерам, и разбираются первые три строки списка.</p>" +
      "<table><tr><th>Показатель</th><th>Что показывает</th></tr>" +
      "<tr><td>Ложных тревог по камере</td><td>Какую камеру надо настроить</td></tr>" +
      "<tr><td>Распределение причин</td><td>Животные, ветер, свет, осадки</td></tr>" +
      "<tr><td>Распределение по времени</td><td>Пики на рассвете и в сумерках говорят о необходимости настройки</td></tr>" +
      "<tr><td>Незакрытые инциденты</td><td>Проблема в организации смен</td></tr></table>" +
      "<p>Настройка трёх самых шумных камер обычно вдвое сокращает общее число ложных тревог. Работы здесь меньше чем на час, а выигрыш получает вся смена.</p>"
  },
  manba: []
},

"tb.e-sla": {
  yorliq: "Rahbariyat uchun",
  sarlavha: "Oylik hisobot: pudratchi bilan bahsdagi dalil",
  tana: "<p>Hisobot avtomatik yig'iladi va oyning birinchi ish kunida tayyor bo'ladi.</p>" +
    "<table><tr><th>Ko'rsatkich</th><th>Manba</th></tr>" +
    "<tr><td>Aloqada bo'lish foizi</td><td>Qurilmalar telemetriyasi</td></tr>" +
    "<tr><td>O'rtacha va eng yomon javob vaqti</td><td>Voqealar jurnali</td></tr>" +
    "<tr><td>Yolg'on signal, obyektga</td><td>Yopilgan voqealar sabablari</td></tr>" +
    "<tr><td>Servis chiqishlari va muddatlari</td><td>Servis arizalari</td></tr>" +
    "<tr><td>Obyekt bo'yicha xarajat</td><td>Xarajatlar moduli</td></tr></table>" +
    "<h4>Nima uchun kerak</h4>" +
    "<p>Pudratchi muddatni buzganini yoki jihoz tez-tez ishdan chiqayotganini raqam bilan ko'rsatish kerak. Shartnomadagi jarima bandi ana shu hisobotga tayanadi.</p>",
  ru: {
    yorliq: "Для правления",
    sarlavha: "Месячный отчёт: аргумент в споре с подрядчиком",
    tana: "<p>Отчёт собирается автоматически и готов в первый рабочий день месяца.</p>" +
      "<table><tr><th>Показатель</th><th>Источник</th></tr>" +
      "<tr><td>Процент времени на связи</td><td>Телеметрия устройств</td></tr>" +
      "<tr><td>Среднее и худшее время ответа</td><td>Журнал инцидентов</td></tr>" +
      "<tr><td>Ложных тревог на объект</td><td>Причины закрытых инцидентов</td></tr>" +
      "<tr><td>Выезды сервиса и сроки</td><td>Сервисные заявки</td></tr>" +
      "<tr><td>Расходы по объекту</td><td>Модуль расходов</td></tr></table>" +
      "<h4>Зачем это нужно</h4>" +
      "<p>Нарушение сроков подрядчиком или частые отказы оборудования показывают цифрой. Пункт договора о неустойке опирается именно на этот отчёт.</p>"
  },
  manba: []
},

"tb.e-jamoa": {
  yorliq: "Jamoa rahbarlari uchun",
  sarlavha: "Jamoa tarkibi va u nima bilan band",
  tana: "<table><tr><th>Rol</th><th>Soni</th><th>Asosiy ish</th></tr>" +
    "<tr><td>Backend</td><td class='n'>2</td><td>Yadro xizmatlari, API, qoidalar</td></tr>" +
    "<tr><td>Frontend</td><td class='n'>1</td><td>Panel, hodisalar navbati, kartochka</td></tr>" +
    "<tr><td>DevOps</td><td class='n'>1</td><td>Serverlar, monitoring, zaxira, chiqarish</td></tr>" +
    "<tr><td>QA</td><td class='n'>1</td><td>Sinovlar, qabul, nosozlik stsenariylari</td></tr>" +
    "<tr><td>Integratsiya muhandisi</td><td class='n'>1</td><td>Adapterlar, brendlar, qurilmalar stendi</td></tr>" +
    "<tr><td>Loyiha menejeri</td><td class='n'>1</td><td>Pudratchilar, muddatlar, hujjatlar</td></tr></table>" +
    "<h4>Joriy etishdan keyin</h4>" +
    "<p>267 obyekt ulangach tarkib kamayadi: qo'llab-quvvatlash uchun 2&ndash;3 kishi yetadi. Lekin integratsiya muhandisi qoladi &mdash; yangi brendlar va proshivkalar doimiy ish beradi.</p>",
  ru: {
    yorliq: "Для тимлида",
    sarlavha: "Состав команды и чем она занята",
    tana: "<table><tr><th>Роль</th><th>Кол-во</th><th>Основная работа</th></tr>" +
      "<tr><td>Backend</td><td class='n'>2</td><td>Сервисы ядра, API, правила</td></tr>" +
      "<tr><td>Frontend</td><td class='n'>1</td><td>Панель, очередь инцидентов, карточка</td></tr>" +
      "<tr><td>DevOps</td><td class='n'>1</td><td>Серверы, мониторинг, копии, выкатки</td></tr>" +
      "<tr><td>QA</td><td class='n'>1</td><td>Тесты, приёмка, сценарии отказов</td></tr>" +
      "<tr><td>Инженер по интеграции</td><td class='n'>1</td><td>Адаптеры, бренды, стенд с устройствами</td></tr>" +
      "<tr><td>Руководитель проекта</td><td class='n'>1</td><td>Подрядчики, сроки, документы</td></tr></table>" +
      "<h4>После внедрения</h4>" +
      "<p>Когда 267 объектов подключены, состав сокращается: для поддержки достаточно 2&ndash;3 человек. Но инженер по интеграции остаётся — новые бренды и прошивки дают постоянную работу.</p>"
  },
  manba: []
},

"tb.e-tavakkal": {
  yorliq: "Rahbariyat uchun",
  sarlavha: "Eng katta tavakkal texnik emas",
  tana: "<p>Jihoz o'rnatiladi, tizim ishlaydi, lekin mas'ul bo'linma tayinlanmaydi va smena jadvali tuzilmaydi. Olti oydan keyin natija shunday bo'ladi:</p>" +
    "<ul><li>Voqealar ochiq qoladi, javob vaqti o'lchanmaydi.</li>" +
    "<li>Batareyasi tugagan qurilmalar almashtirilmaydi, aloqada bo'lish 70% ga tushadi.</li>" +
    "<li>Yolg'on signallar sozlanmaydi, navbatchi xabarnomalarni o'chirib qo'yadi.</li>" +
    "<li>Xulosa: &laquo;tizim ishlamadi&raquo; &mdash; holbuki ishlamagan narsa boshqa.</li></ul>" +
    "<h4>Nima qilinadi</h4>" +
    "<p>Pilot qaroriga uchta band kiritiladi: mas'ul bo'linma, smena jadvali va oylik hisobotni kim ko'rib chiqishi. Bu bandlarsiz jihoz byudjetini tasdiqlash tavakkalni oshiradi.</p>",
  ru: {
    yorliq: "Для правления",
    sarlavha: "Самый большой риск — не технический",
    tana: "<p>Оборудование поставлено, система работает, но ответственное подразделение не назначено и график смен не составлен. Через полгода результат такой:</p>" +
      "<ul><li>Инциденты остаются открытыми, время ответа не измеряется.</li>" +
      "<li>Устройства с севшими батареями не меняются, доля на связи падает до 70%.</li>" +
      "<li>Ложные тревоги не настраиваются, дежурный отключает уведомления.</li>" +
      "<li>Вывод: «система не заработала» — хотя не заработало другое.</li></ul>" +
      "<h4>Что делается</h4>" +
      "<p>В решение по пилоту вносятся три пункта: ответственное подразделение, график смен и кто рассматривает месячный отчёт. Без этих пунктов утверждение бюджета на оборудование увеличивает риск.</p>"
  },
  manba: []
},

/* ---------- Yo'naltirish xaritasi ---------- */

"tb.y-hodisa": {
  yorliq: "Kirish",
  sarlavha: "Bitta hodisa: ekranga tushguncha nima ma'lum",
  tana: "<p>Navbatchi ekranida hodisa uchta raqam bilan paydo bo'ladi: turi, sinfi va ishonch darajasi. Uchalasi ham kameraning o'zidan keladi &mdash; markaz hech narsani qayta tanimaydi.</p>" +
    "<table><tr><th>Maydon</th><th>Qiymat</th><th>Nimaga ta'sir qiladi</th></tr>" +
    "<tr><td><code>tur</code></td><td>harakat</td><td>Qaysi qoida ishga tushishini belgilaydi</td></tr>" +
    "<tr><td><code>sinf</code></td><td>odam</td><td>Hayvon va mashina tunda navbatchini uyg'otmaydi</td></tr>" +
    "<tr><td><code>ishonch</code></td><td>0,87</td><td>0,70 dan past bo'lsa voqea ochilmaydi, yozuv qoladi</td></tr></table>" +
    "<p><b>Nima qo'shiladi.</b> Reyestrdan obyektning toifasi, qo'riqlanadimi yoki yo'qligi va oxirgi ko'rik sanasi olinadi. Shuning uchun bir xil signal qo'riqlanadigan filial binosida va bo'sh omborda boshqacha yo'l tutadi.</p>" +
    "<p class='ogoh'>Ishonch darajasi past hodisa ham yo'qolmaydi. U obyekt kartochkasida qoladi va haftalik tahlilda ko'riladi: agar bitta kamerada past ishonchli signal ko'payib ketsa, demak linza changlagan yoki burchak noto'g'ri.</p>",
  ru: {
    yorliq: "Вход",
    sarlavha: "Одно событие: что известно к моменту появления на экране",
    tana: "<p>На экране дежурного событие появляется с тремя значениями: тип, класс и уверенность. Все три приходят от самой камеры &mdash; центр ничего не распознаёт заново.</p>" +
      "<table><tr><th>Поле</th><th>Значение</th><th>На что влияет</th></tr>" +
      "<tr><td><code>tur</code></td><td>движение</td><td>Определяет, какое правило сработает</td></tr>" +
      "<tr><td><code>sinf</code></td><td>человек</td><td>Животное и машина ночью дежурного не будят</td></tr>" +
      "<tr><td><code>ishonch</code></td><td>0,87</td><td>Ниже 0,70 инцидент не открывается, запись остаётся</td></tr></table>" +
      "<p><b>Что добавляется.</b> Из реестра подтягиваются категория объекта, наличие охраны и дата последнего осмотра. Поэтому один и тот же сигнал в охраняемом здании филиала и на пустом складе идёт разными путями.</p>" +
      "<p class='ogoh'>Событие с низкой уверенностью тоже не пропадает. Оно остаётся в карточке объекта и разбирается на недельном обзоре: если по одной камере таких сигналов стало много, значит, запылилась линза или выбран неверный угол.</p>"
  },
  manba: []
},

"tb.y-qoida": {
  yorliq: "Yo'naltirish",
  sarlavha: "Qoidalar mexanizmi: kimni uyg'otish va kimni uyg'otmaslik",
  tana: "<p>Qoida to'rtta shartni birga ko'radi: vaqt, sinf, obyektning holati va hodisa turi. Shartlar mos kelsa voqea ochiladi, mas'ul belgilanadi va muddat qo'yiladi. Mos kelmasa hodisa faqat yozuv bo'lib qoladi.</p>" +
    "<h4>Amaldagi qoidalar</h4>" +
    "<table><tr><th>Shart</th><th>Natija</th></tr>" +
    "<tr><td>Tun (20:00&ndash;08:00) + sinf odam + qo'riqlanmaydigan obyekt</td><td>Navbatchiga darhol, muddat 5 daqiqa</td></tr>" +
    "<tr><td>Kunduz + sinf odam + bo'sh obyekt</td><td>Kunlik ro'yxatga, muddat 4 soat</td></tr>" +
    "<tr><td>Sinf mashina yoki hayvon</td><td>Faqat yozuv, xabar yuborilmaydi</td></tr>" +
    "<tr><td>Eshik ochilishi + ish vaqti emas</td><td>Navbatchiga darhol, muddat 5 daqiqa</td></tr>" +
    "<tr><td>Uch puls kelmadi</td><td>Servisga ariza, muddat 72 soat</td></tr></table>" +
    "<p><b>Nega qoidani soddaligicha saqlash kerak.</b> Qoida qancha murakkab bo'lsa, tunda nima uchun xabar kelgani yoki kelmaganini tushuntirish shuncha qiyin bo'ladi. Beshta qoida barcha 267 obyektga yetadi; obyektga xos istisno reyestrdagi belgi bilan beriladi, kodda emas.</p>" +
    "<p class='ogoh'>Qoidani o'zgartirish administratorning bir o'zida emas: o'zgarish jurnalga tushadi, yigirmadan ortiq obyektga tegsa, ikkinchi imzo talab qilinadi. Tungi xabarnomani jimgina o'chirib qo'yish mumkin bo'lmasligi kerak.</p>",
  ru: {
    yorliq: "Маршрутизация",
    sarlavha: "Механизм правил: кого будить, а кого нет",
    tana: "<p>Правило смотрит на четыре условия сразу: время, класс, состояние объекта и тип события. Совпало &mdash; открывается инцидент, назначается ответственный, ставится срок. Не совпало &mdash; событие остаётся просто записью.</p>" +
      "<h4>Действующие правила</h4>" +
      "<table><tr><th>Условие</th><th>Результат</th></tr>" +
      "<tr><td>Ночь (20:00&ndash;08:00) + класс человек + объект без охраны</td><td>Дежурному сразу, срок 5 минут</td></tr>" +
      "<tr><td>День + класс человек + пустой объект</td><td>В суточный список, срок 4 часа</td></tr>" +
      "<tr><td>Класс машина или животное</td><td>Только запись, уведомление не уходит</td></tr>" +
      "<tr><td>Открытие двери вне рабочего времени</td><td>Дежурному сразу, срок 5 минут</td></tr>" +
      "<tr><td>Три пропущенных пульса</td><td>Заявка в сервис, срок 72 часа</td></tr></table>" +
      "<p><b>Почему правила надо держать простыми.</b> Чем сложнее правило, тем труднее объяснить, почему ночью уведомление пришло или не пришло. Пяти правил хватает на все 267 объектов; исключение для конкретного объекта задаётся меткой в реестре.</p>" +
      "<p class='ogoh'>Менять правило администратор в одиночку не может: изменение пишется в журнал, а если оно задевает больше двадцати объектов, требуется вторая подпись. Возможности тихо отключить ночное уведомление быть не должно.</p>"
  },
  manba: []
},

"tb.y-ertalab": {
  yorliq: "Pog'ona 2",
  sarlavha: "Ertalabki ro'yxat: tunda bo'lgan hamma narsa bitta ekranda",
  tana: "<p>Soat 08:00 da obyekt menejeri va ko'rik inspektori bitta ro'yxatni ochadi: kecha kechqurundan beri bo'lgan barcha voqealar, har biri holati va mas'uli bilan. Bu ro'yxat pochta orqali kelmaydi va uni qidirib topish kerak emas &mdash; panelning birinchi ekranida turadi.</p>" +
    "<h4>Ro'yxatdan nima chiqadi</h4>" +
    "<table><tr><th>Holat</th><th>Keyingi qadam</th><th>Muddat</th></tr>" +
    "<tr><td>Yopilgan, yolg'on signal</td><td>Sabab belgilangan, kamera sozlash ro'yxatiga tushadi</td><td class='n'>&mdash;</td></tr>" +
    "<tr><td>Yopilmagan, kirish tasdiqlangan</td><td>Ko'rik topshirig'i, obyektga chiqish</td><td class='n'>48 soat</td></tr>" +
    "<tr><td>Qurilma javob bermayapti</td><td>Servis arizasi, zaxira komplekt</td><td class='n'>72 soat</td></tr>" +
    "<tr><td>Zarar aniqlangan</td><td>Dalolatnoma, xarajat yozuvi, sug'urta xabari</td><td class='n'>5 kun</td></tr></table>" +
    "<p>Inspektor uchun bu ro'yxatning asosiy natijasi &mdash; ko'rik rejasining qayta tartiblanishi. Tunda signal bergan obyekt rejaning boshiga chiqadi, hodisasiz obyekt esa keyingi oyga suriladi. Reja shu tartibda tuziladi.</p>" +
    "<p class='ogoh'>Ertalabki ro'yxat tungi voqeani takrorlamaydi: agar navbatchi uni tunda yopgan bo'lsa, ro'yxatda faqat qisqa satr qoladi. Ikki marta ko'rib chiqish ishga ham, ishonchga ham zarar.</p>",
  ru: {
    yorliq: "Ступень 2",
    sarlavha: "Утренний список: всё, что было ночью, на одном экране",
    tana: "<p>В 08:00 менеджер объекта и инспектор осмотра открывают один список: все инциденты со вчерашнего вечера, каждый со статусом и ответственным. Список не приходит почтой и его не нужно искать &mdash; он на первом экране панели.</p>" +
      "<h4>Что выходит из списка</h4>" +
      "<table><tr><th>Статус</th><th>Следующий шаг</th><th>Срок</th></tr>" +
      "<tr><td>Закрыт, ложное срабатывание</td><td>Причина отмечена, камера попадает в список настройки</td><td class='n'>&mdash;</td></tr>" +
      "<tr><td>Не закрыт, проникновение подтверждено</td><td>Задание на осмотр, выезд на объект</td><td class='n'>48 часов</td></tr>" +
      "<tr><td>Устройство не отвечает</td><td>Заявка в сервис, запасной комплект</td><td class='n'>72 часа</td></tr>" +
      "<tr><td>Выявлен ущерб</td><td>Акт, запись расхода, уведомление страховщику</td><td class='n'>5 дней</td></tr></table>" +
      "<p>Для инспектора главный результат этого списка &mdash; пересборка плана осмотров. Объект, подавший сигнал ночью, поднимается в начало плана, а объект без событий сдвигается на следующий месяц. План составляется этим порядком.</p>" +
      "<p class='ogoh'>Утренний список не повторяет ночной инцидент: если дежурный закрыл его ночью, в списке остаётся только короткая строка. Разбирать одно и то же дважды вредно и для работы, и для доверия.</p>"
  },
  manba: []
},

"tb.y-oy": {
  yorliq: "Pog'ona 3",
  sarlavha: "Oylik jamlama: rahbariyat tendensiyani ko'radi",
  tana: "<p>Kengashga ayrim signal chiqmaydi. Oylik hisobotda to'rtta raqam turadi va ularning har biri qaror uchun kerak.</p>" +
    "<table><tr><th>Ko'rsatkich</th><th>Nimani hal qiladi</th></tr>" +
    "<tr><td>Kirish tasdiqlangan voqealar soni, hududlar bo'yicha</td><td>Qaysi viloyatda qo'shimcha qurilma yoki jismoniy qo'riqlash kerak</td></tr>" +
    "<tr><td>Yolg'on signal ulushi</td><td>Sozlash ishining sifati; 15 foizdan oshsa, pudratchi bilan suhbat</td></tr>" +
    "<tr><td>Nazorat indeksi past obyektlar soni</td><td>Zaxira toifasini qayta ko'rish va auditor savoliga javob</td></tr>" +
    "<tr><td>Qurilma ishdan chiqishi va tiklash vaqti</td><td>Servis shartnomasini uzaytirish yoki almashtirish</td></tr></table>" +
    "<p>Buxgalteriya va risk bo'limi uchun bir xil ma'lumotning boshqa kesimi chiqadi: obyektning holati zaxira toifasini asoslaydi, qurilma xarajati esa saqlash xarajatlari tarkibiga kiradi. Ikkalasi ham bitta manbadan olinadi, shuning uchun hisobotlar bir-biriga zid bo'lmaydi.</p>" +
    "<p class='ogoh'>Oylik raqam bitta obyektning nomini ochmaydi. Rahbariyat kesimni ko'radi; aniq obyektga kirish huquqi obyekt menejerida va inspektorda qoladi. Bu cheklov ataylab qo'yilgan: hisobot boshqaruv quroli, kuzatuv quroli emas.</p>",
  ru: {
    yorliq: "Ступень 3",
    sarlavha: "Месячная сводка: правление видит не событие, а тенденцию",
    tana: "<p>На правление отдельные сигналы не выходят. В месячном отчёте стоят четыре показателя, и каждый нужен для решения.</p>" +
      "<table><tr><th>Показатель</th><th>Что решает</th></tr>" +
      "<tr><td>Число подтверждённых проникновений по регионам</td><td>Где нужны дополнительные устройства или физическая охрана</td></tr>" +
      "<tr><td>Доля ложных срабатываний</td><td>Качество настройки; выше 15 процентов &mdash; разговор с подрядчиком</td></tr>" +
      "<tr><td>Число объектов с низким индексом контроля</td><td>Пересмотр категории резерва и ответ на вопрос аудитора</td></tr>" +
      "<tr><td>Отказы устройств и время восстановления</td><td>Продлевать сервисный договор или менять исполнителя</td></tr></table>" +
      "<p>Для бухгалтерии и риска из тех же данных выходит другой срез: состояние объекта обосновывает категорию резерва, а расходы на устройства входят в затраты на содержание. Оба берутся из одного источника, поэтому отчёты не противоречат друг другу.</p>" +
      "<p class='ogoh'>Месячная цифра не раскрывает имя конкретного объекта. Правление видит срез; доступ к конкретному объекту остаётся у менеджера и инспектора. Ограничение поставлено сознательно: отчёт &mdash; инструмент управления, а не наблюдения за людьми.</p>"
  },
  manba: []
},

"tb.y-kormaydi": {
  yorliq: "Chegara",
  sarlavha: "Kim ko'rmaydi va nega bu muhim",
  tana: "<p>Realizatsiya mutaxassisiga e'lon uchun faqat odam tushmagan kadr chiqadi: ochiq savdo e'lonida begona shaxs tasviri chop etilsa, bank shaxsiy ma'lumotlar rejimini buzadi. Quyidagi beshta cheklovning har biri xuddi shunday aniq huquqiy yoki tashkiliy sababdan kelib chiqqan.</p>" +
    "<table><tr><th>Kim</th><th>Nimani ko'rmaydi</th><th>Sabab</th></tr>" +
    "<tr><td>Realizatsiya mutaxassisi</td><td>Hodisa navbati va jonli video</td><td>Unga faqat e'longa yaroqli, odam tushmagan kadr kerak</td></tr>" +
    "<tr><td>Xavfsizlik xizmati</td><td>Obyektning baholangan qiymati va zaxira toifasi</td><td>Baholangan qiymat &mdash; savdo bo'yicha qaror, xavfsizlik xizmatining ishi emas</td></tr>" +
    "<tr><td>Buxgalteriya</td><td>Qurilmaga buyruq berish</td><td>Moliyaviy rol texnik boshqaruvga tegmaydi</td></tr>" +
    "<tr><td>Administrator</td><td>Audit jurnalini tahrirlash</td><td>O'z izini o'chira oladigan rol bo'lmasligi kerak</td></tr>" +
    "<tr><td>Yetkazuvchi va pudratchi</td><td>Reyestr, qiymat, hujjatlar</td><td>Ularga faqat o'z qurilmasining telemetriyasi ochiladi</td></tr></table>" +
    "<p><b>Qanday ta'minlanadi.</b> Cheklov API darajasida ishlaydi: rolga kirmaydigan ma'lumot so'ralganda server <code>403</code> qaytaradi va urinish jurnalga yoziladi. Shuning uchun havolani qo'lda yozib kirib bo'lmaydi.</p>" +
    "<p class='ogoh'>Eng ko'p uchraydigan xato &mdash; sinov davrida hammaga to'liq huquq berib, keyin uni qaytarib olishni unutish. Shuning uchun pilot bosqichida ham rollar haqiqiy holicha qo'yiladi, keyin emas.</p>",
  ru: {
    yorliq: "Граница",
    sarlavha: "Кто не видит и почему это важно",
    tana: "<p>Специалисту по реализации в объявление уходит только кадр без людей: снимок с посторонним лицом в публичном объявлении о торгах &mdash; нарушение режима персональных данных. Каждое из пяти ограничений ниже имеет такую же конкретную правовую или организационную причину.</p>" +
      "<table><tr><th>Кто</th><th>Чего не видит</th><th>Причина</th></tr>" +
      "<tr><td>Специалист по реализации</td><td>Очередь событий и живое видео</td><td>Ему нужен только кадр без людей, пригодный для объявления</td></tr>" +
      "<tr><td>Служба безопасности</td><td>Оценочную стоимость объекта и категорию резерва</td><td>Стоимость &mdash; решение по продаже, а не работа охраны</td></tr>" +
      "<tr><td>Бухгалтерия</td><td>Отправку команд на устройство</td><td>Финансовая роль не касается технического управления</td></tr>" +
      "<tr><td>Администратор</td><td>Редактирование журнала аудита</td><td>Роли, способной стереть свой след, быть не должно</td></tr>" +
      "<tr><td>Поставщик и подрядчик</td><td>Реестр, стоимость, документы</td><td>Им открыта только телеметрия собственного оборудования</td></tr></table>" +
      "<p><b>Как это обеспечено.</b> Ограничение работает не скрытием экрана, а на уровне API: при запросе данных вне роли сервер возвращает <code>403</code>, а попытка пишется в журнал. Поэтому зайти, набрав ссылку руками, не получится.</p>" +
      "<p class='ogoh'>Самая частая ошибка &mdash; выдать всем полные права на время испытаний и забыть их снять. Поэтому роли ставятся в боевом виде уже на пилоте.</p>"
  },
  manba: []
},
"tb.y-ozgarmas": {
  yorliq: "Barqaror qism",
  sarlavha: "O'n barobar o'sganda nima o'zgarmaydi va nega bu muhim",
  tana: "<p>Masshtab haqidagi savolning javobi odatda &laquo;server qo'shamiz&raquo; bo'ladi. Aslida muhimi boshqasi: o'sishda nimani qayta yozish kerak emasligi. Quyidagilar o'n obyektda ham, ming obyektda ham o'zgarmaydi.</p>" +
    "<table><tr><th>Qism</th><th>Nega o'zgarmaydi</th></tr>" +
    "<tr><td>Arxitektura</td><td>Qatlamlar soni obyektlar soniga bog'liq emas. Ko'payadigan narsa &mdash; har qatlamning nusxasi</td></tr>" +
    "<tr><td>Hodisa sxemasi</td><td>Yozuv brendga ham, obyektlar soniga ham bog'lanmagan; faqat maydon qo'shiladi</td></tr>" +
    "<tr><td>Adapter kodi</td><td>Bitta brend uchun bir marta yoziladi; obyekt qo'shilsa faqat sozlama qo'shiladi</td></tr>" +
    "<tr><td>Rollar va ekranlar</td><td>Etti rol o'n obyektga ham, minggasiga ham yetadi; kesim o'zgaradi, ekran emas</td></tr>" +
    "<tr><td>Montaj tartibi</td><td>Bitta obyektning montaj varag'i universal: o'lchov, surat, akt</td></tr>" +
    "<tr><td>Shartnoma shakli</td><td>Yetkazuvchi, integrator va aloqa operatori bilan shartnoma bandlari takrorlanadi</td></tr></table>" +
    "<p><b>Nima o'zgaradi.</b> Virtual mashina soni, disk hajmi, media shlyuz nusxasi va navbatchilar soni. Hammasi &mdash; raqam, kod emas. Shuning uchun o'sish rejasini moliyaviy tilda tuzish mumkin: har yuz obyektga qancha disk, qancha kanal va qancha odam.</p>" +
    "<p class='ogoh'>Pilot ikki narsani beradi: SLA ga qo'yiladigan o'lchangan vaqtlar va shu olti bandning o'zgarmasligini tasdiqlash. Ikkinchisi muhimroq &mdash; o'sishda ulardan birortasini qayta yozish kerak bo'lsa, demak pilotda xato qilingan.</p>",
  ru: {
    yorliq: "Устойчивая часть",
    sarlavha: "Что не меняется при росте в десять раз и почему это важно",
    tana: "<p>На вопрос о масштабе обычно отвечают &laquo;добавим серверов&raquo;. На деле важнее другое: что при росте не придётся переписывать. Перечисленное ниже одинаково и для десяти объектов, и для тысячи.</p>" +
      "<table><tr><th>Часть</th><th>Почему не меняется</th></tr>" +
      "<tr><td>Архитектура</td><td>Число слоёв не зависит от числа объектов. Растёт лишь количество экземпляров каждого слоя</td></tr>" +
      "<tr><td>Схема события</td><td>Запись не привязана ни к бренду, ни к числу объектов; поля только добавляются</td></tr>" +
      "<tr><td>Код адаптера</td><td>Пишется один раз на бренд; при добавлении объекта добавляется только настройка</td></tr>" +
      "<tr><td>Роли и экраны</td><td>Семи ролей хватает и на десять объектов, и на тысячу; меняется срез, экран остаётся тем же</td></tr>" +
      "<tr><td>Порядок монтажа</td><td>Лист монтажа одного объекта универсален: замер, фотографии, акт</td></tr>" +
      "<tr><td>Форма договора</td><td>Пункты договоров с поставщиком, интегратором и оператором связи повторяются</td></tr></table>" +
      "<p><b>Что меняется.</b> Число виртуальных машин, объём диска, экземпляры медиашлюза и количество дежурных. Всё это цифры в смете. Поэтому план роста можно составить на финансовом языке: сколько диска, канала и людей на каждую сотню объектов.</p>" +
      "<p class='ogoh'>Пилот даёт две вещи: измеренные времена, которые ставятся в SLA, и подтверждение того, что эти шесть пунктов не меняются. Второе важнее &mdash; если при росте приходится переписывать любой из них, значит, на пилоте была допущена ошибка.</p>"
  },
  manba: []
}

});
