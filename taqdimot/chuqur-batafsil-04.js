/* Yechim 04 (LiFePO4 shkafi) chuqur sahifasidagi batafsil yozuvlari. */
window.MKB_BATAFSIL = window.MKB_BATAFSIL || {};
Object.assign(window.MKB_BATAFSIL, {

"y04.r-yuklama": {
  yorliq: "Montajchi uchun", sarlavha: "30 Vt qayerdan chiqdi",
  tana: "<table><tr><th>Iste'molchi</th><th>Vt</th></tr>" +
    "<tr><td>2 ta PoE IP kamera, IR bilan</td><td class='n'>8–12</td></tr>" +
    "<tr><td>4 kanalli NVR, disk bilan</td><td class='n'>6–10</td></tr>" +
    "<tr><td>Ikki SIM'li 4G router</td><td class='n'>3–6</td></tr>" +
    "<tr><td>DC-DC o'zgartirgich yo'qotishi</td><td class='n'>1–2</td></tr>" +
    "<tr><td><b>Hisobga olinadigan jami</b></td><td class='n'><b>≈30</b></td></tr></table>" +
    "<p>Bu odatiy to'plam uchun. To'rt kamerali obyektda yuklama 40–45 Vt ga chiqadi va avtonomiya to'rt kunga tushadi.</p>" +
    "<p class='ogoh'>Raqam ampermetr bilan o'lchanadi va dalolatnomaga yoziladi. Butun rotatsiya jadvali shu bitta o'lchovga tayanadi: 15% xato bir hafta o'rniga besh kun degani va bu marshrut rejasini buzadi.</p>",
  ru: { yorliq: "Для монтажника", sarlavha: "Откуда взялись 30 Вт",
    tana: "<table><tr><th>Потребитель</th><th>Вт</th></tr>" +
      "<tr><td>2 PoE IP-камеры с ИК</td><td class='n'>8–12</td></tr>" +
      "<tr><td>4-канальный NVR с диском</td><td class='n'>6–10</td></tr>" +
      "<tr><td>4G-роутер с двумя SIM</td><td class='n'>3–6</td></tr>" +
      "<tr><td>Потери DC-DC преобразователя</td><td class='n'>1–2</td></tr>" +
      "<tr><td><b>Расчётный итог</b></td><td class='n'><b>≈30</b></td></tr></table>" +
      "<p>Это для типового набора. На объекте с четырьмя камерами нагрузка вырастает до 40–45 Вт, и автономия падает до четырёх дней.</p>" +
      "<p class='ogoh'>Цифру измеряют амперметром и вносят в акт. Весь график ротации держится на этом единственном замере: ошибка в 15% превращает неделю в пять дней и ломает план маршрута.</p>" }
},

"y04.r-kun": {
  yorliq: "Montajchi uchun", sarlavha: "6 kun: sig'imdan avtonomiyagacha",
  tana: "<p>48 V 100 A·soat blokda 5,12 kVt·soat bor. Undan foydali qismi qanday hisoblanadi:</p>" +
    "<table><tr><th>Bosqich</th><th>Qiymat</th></tr>" +
    "<tr><td>Nominal sig'im</td><td class='n'>5,12 kVt·soat</td></tr>" +
    "<tr><td>BMS chegarasi, 90%</td><td class='n'>4,61 kVt·soat</td></tr>" +
    "<tr><td>DC-DC yo'qotishi, 5%</td><td class='n'>4,38 kVt·soat</td></tr>" +
    "<tr><td>30 Vt yuklamada</td><td class='n'>6,1 kun</td></tr></table>" +
    "<p>Sovuqda LiFePO4 sig'imining bir qismini vaqtincha bermaydi: −10 °C da bu taxminan 10–15%. Ya'ni qishda olti kun besh kunga aylanadi va rotatsiya jadvali shu bo'yicha tuziladi.</p>" +
    "<p class='ogoh'>Yo'qotish qaytariladi: blok iliq bazaga qaytgach sig'im to'liq tiklanadi. Shuning uchun qishki jadval yozgi jadvaldan farq qiladi va bu farq oldindan rejalashtiriladi, nosozlik sifatida emas.</p>",
  ru: { yorliq: "Для монтажника", sarlavha: "6 дней: от ёмкости к автономии",
    tana: "<p>В блоке 48 В 100 А·ч — 5,12 кВт·ч. Полезная часть считается так:</p>" +
      "<table><tr><th>Этап</th><th>Значение</th></tr>" +
      "<tr><td>Номинальная ёмкость</td><td class='n'>5,12 кВт·ч</td></tr>" +
      "<tr><td>Ограничение BMS, 90%</td><td class='n'>4,61 кВт·ч</td></tr>" +
      "<tr><td>Потери DC-DC, 5%</td><td class='n'>4,38 кВт·ч</td></tr>" +
      "<tr><td>При нагрузке 30 Вт</td><td class='n'>6,1 дн.</td></tr></table>" +
      "<p>На холоде LiFePO4 временно не отдаёт часть ёмкости: при −10 °C это около 10–15%. То есть зимой шесть дней превращаются в пять, и график ротации строят по этому значению.</p>" +
      "<p class='ogoh'>Потеря обратима: вернувшись на тёплую базу, блок восстанавливает ёмкость полностью. Поэтому зимний график отличается от летнего, и эту разницу планируют заранее, а не считают неисправностью.</p>" }
},

"y04.r-ogirlik": {
  yorliq: "Montajchi uchun", sarlavha: "40–45 kg: loyihada hisobga olinadigan raqam",
  tana: "<p>48 V 100 A·soat LiFePO4 blokning og'irligi energiya zichligidan kelib chiqadi: 5,12 kVt·soat va 110–130 Vt·soat/kg — bu 40–47 kg.</p>" +
    "<table><tr><th>Sharoit</th><th>Kim ko'taradi</th></tr>" +
    "<tr><td>Birinchi qavat, tekis yo'l</td><td>Ikki kishi, aravacha bilan bir kishi</td></tr>" +
    "<tr><td>Zinapoya, ikkinchi qavat</td><td>Ikki kishi, qiyin</td></tr>" +
    "<tr><td>Tor koridor, yerto'la</td><td>Amalda bajarilmaydi</td></tr></table>" +
    "<p>Murakkab joyda blok ikkita 24 V modulga bo'linadi: har biri 22–24 kg va ularni bir kishi ketma-ket ko'taradi.</p>" +
    "<p class='ogoh'>Bu qaror ko'rik bosqichida qabul qilinadi, montajdan keyin emas. Yo'l o'lchanadi va dalolatnomaga yoziladi: eshik eni, zinapoya bormi, aravacha o'tadimi. Aks holda muammo birinchi almashtirish kunida, ya'ni obyekt allaqachon jihozlangandan keyin ma'lum bo'ladi.</p>",
  ru: { yorliq: "Для монтажника", sarlavha: "40–45 кг: цифра, которую закладывают в проект",
    tana: "<p>Вес блока LiFePO4 48 В 100 А·ч следует из плотности энергии: 5,12 кВт·ч при 110–130 Вт·ч/кг — это 40–47 кг.</p>" +
      "<table><tr><th>Условие</th><th>Кто поднимает</th></tr>" +
      "<tr><td>Первый этаж, ровный путь</td><td>Двое, с тележкой — один</td></tr>" +
      "<tr><td>Лестница, второй этаж</td><td>Двое, тяжело</td></tr>" +
      "<tr><td>Узкий коридор, подвал</td><td>Практически невыполнимо</td></tr></table>" +
      "<p>В сложных местах блок делят на два модуля по 24 В: каждый 22–24 кг, и их переносят поочерёдно вдвоём или по одному.</p>" +
      "<p class='ogoh'>Это решение принимают на осмотре, а не после монтажа. Путь замеряют и вносят в акт: ширина двери, есть ли лестница, пройдёт ли тележка. Иначе проблема выяснится в день первой замены — когда объект уже оснащён.</p>" }
},

"y04.r-narx": {
  yorliq: "Moliya va huquq", sarlavha: "12–20 mln so'm va undan keyingi qator",
  tana: "<p>Boshlang'ich smeta ro'yxatdagi eng katta. Lekin qaror boshqa qatorda qabul qilinadi: rotatsiya fondi va tashriflar.</p>" +
    "<table><tr><th>Qator</th><th>mln so'm</th></tr>" +
    "<tr><td>Obyekt jihozi va montaji</td><td class='n'>12–20</td></tr>" +
    "<tr><td>Rotatsiya uchun zaxira blok ulushi</td><td class='n'>2–4,5</td></tr>" +
    "<tr><td>SIM, besh yilda</td><td class='n'>3,6–6,0</td></tr>" +
    "<tr><td>Almashtirish tashriflari</td><td class='n'>asosiy o'zgaruvchi</td></tr></table>" +
    "<p>Zaxira blok qatorisiz rotatsiya sxemasi ishlamaydi: brigada bo'shagan blokni olib, o'rniga zaryadlanganini qo'yishi kerak, ikkinchi safar kelmasligi uchun.</p>" +
    "<p class='ogoh'>Bu yechim faqat obyekt qiymati yuqori bo'lganda oqlanadi. Nazorat xarajati aktiv qiymatining bir foizidan oshsa, savolni boshqacha qo'yish kerak: obyektni tezroq sotish yoki arzonroq nazorat darajasiga rozi bo'lish.</p>",
  ru: { yorliq: "Финансы и право", sarlavha: "12–20 млн сум и строка после них",
    tana: "<p>Стартовая смета здесь самая большая в списке. Но решение принимается по другой строке: фонд ротации и выезды.</p>" +
      "<table><tr><th>Строка</th><th>млн сум</th></tr>" +
      "<tr><td>Оборудование объекта и монтаж</td><td class='n'>12–20</td></tr>" +
      "<tr><td>Доля резервного блока на ротацию</td><td class='n'>2–4,5</td></tr>" +
      "<tr><td>SIM за пять лет</td><td class='n'>3,6–6,0</td></tr>" +
      "<tr><td>Выезды на замену</td><td class='n'>основная переменная</td></tr></table>" +
      "<p>Без строки резервного блока схема ротации не работает: бригада должна забрать разряженный блок и оставить заряженный, чтобы не приезжать второй раз.</p>" +
      "<p class='ogoh'>Решение оправдано только при высокой стоимости объекта. Если затраты на контроль превышают процент от стоимости актива, вопрос ставят иначе: продавать объект быстрее или согласиться на более дешёвый уровень контроля.</p>" }
},

"y04.k-blok": {
  yorliq: "Montajchi uchun", sarlavha: "Blokka qo'yiladigan talablar",
  tana: "<p>Blok shkafning yuragi va unga qo'yiladigan talablar odatiy akkumulyatordagidan boshqacha: u har hafta ulanadi va uziladi.</p>" +
    "<table><tr><th>Talab</th><th>Qiymat</th></tr>" +
    "<tr><td>Kuchlanish va sig'im</td><td>48 V, 100 A·soat</td></tr>" +
    "<tr><td>Tsikl resursi</td><td>kamida 3 000</td></tr>" +
    "<tr><td>Ulagich</td><td>tez uziladigan, qutb xatosiga qarshi</td></tr>" +
    "<tr><td>BMS aloqasi</td><td>Modbus RTU, registr xaritasi bilan</td></tr>" +
    "<tr><td>Razryad harorati</td><td>−20 °C dan</td></tr>" +
    "<tr><td>Korpus</td><td>ko'tarish tutqichlari bilan</td></tr></table>" +
    "<p>Tutqich ahamiyatsiz tafsilotdek ko'rinadi, lekin 45 kg yukni tor shkafdan chiqarishda u xavfsizlik masalasiga aylanadi.</p>" +
    "<p class='ogoh'>Tsikl resursi haftalik almashtirish uchun hisoblanadi: yiliga 52 tsikl, besh yilda 260. 3 000 tsikl resursi bu tartibda o'n yildan ortiq xizmat degani — ya'ni blok jihozdan uzoqroq yashaydi.</p>",
  ru: { yorliq: "Для монтажника", sarlavha: "Требования к блоку",
    tana: "<p>Блок — сердце шкафа, и требования к нему другие, чем к обычному аккумулятору: его подключают и отключают каждую неделю.</p>" +
      "<table><tr><th>Требование</th><th>Значение</th></tr>" +
      "<tr><td>Напряжение и ёмкость</td><td>48 В, 100 А·ч</td></tr>" +
      "<tr><td>Ресурс циклов</td><td>не менее 3 000</td></tr>" +
      "<tr><td>Разъём</td><td>быстроразъёмный, с защитой от переполюсовки</td></tr>" +
      "<tr><td>Связь BMS</td><td>Modbus RTU с картой регистров</td></tr>" +
      "<tr><td>Температура разряда</td><td>от −20 °C</td></tr>" +
      "<tr><td>Корпус</td><td>с ручками для переноски</td></tr></table>" +
      "<p>Ручки кажутся мелочью, но при извлечении 45 кг из тесного шкафа это уже вопрос безопасности.</p>" +
      "<p class='ogoh'>Ресурс циклов считают под еженедельную замену: 52 цикла в год, 260 за пять лет. Ресурс в 3 000 циклов при таком режиме означает больше десяти лет службы — то есть блок переживёт оборудование.</p>" }
},

"y04.k-poe": {
  yorliq: "Jamoa rahbarlari uchun", sarlavha: "48 V PoE: bir bosqich kam",
  tana: "<p>Standart PoE 44–57 V oralig'ida ishlaydi. Shkafdagi 48 V shina aynan shu oraliqqa tushadi, ya'ni kameralarni to'g'ridan-to'g'ri boqish mumkin.</p>" +
    "<table><tr><th>Sxema</th><th>Bosqichlar</th><th>Yo'qotish</th></tr>" +
    "<tr><td>48 V → 12 V → PoE injektor</td><td>ikki o'zgartirish</td><td class='n'>10–12%</td></tr>" +
    "<tr><td>48 V → PoE kommutator</td><td>bitta</td><td class='n'>4–6%</td></tr></table>" +
    "<p>30 Vt yuklamada 6% farq sutkasiga 43 Vt·soatni tejaydi. Olti kunlik avtonomiyada bu qo'shimcha yarim kun beradi.</p>" +
    "<p class='ogoh'>Sxemani tanlash montajdan oldin hal qilinadi: 48 V kirishli PoE kommutator ko'p uchramaydi va uni oldindan buyurtma qilish kerak. Obyektda 12 V variantni yig'ib bo'lgandan keyin qayta qilish ikkinchi tashrif degani.</p>",
  ru: { yorliq: "Для тимлида", sarlavha: "PoE от 48 В: на одно преобразование меньше",
    tana: "<p>Стандартный PoE работает в диапазоне 44–57 В. Шина 48 В в шкафу попадает ровно в него, то есть камеры можно питать напрямую.</p>" +
      "<table><tr><th>Схема</th><th>Ступеней</th><th>Потери</th></tr>" +
      "<tr><td>48 В → 12 В → PoE-инжектор</td><td>два преобразования</td><td class='n'>10–12%</td></tr>" +
      "<tr><td>48 В → PoE-коммутатор</td><td>одно</td><td class='n'>4–6%</td></tr></table>" +
      "<p>При нагрузке 30 Вт разница в 6% экономит 43 Вт·ч в сутки. На шестидневной автономии это добавляет полсуток.</p>" +
      "<p class='ogoh'>Схему выбирают до монтажа: PoE-коммутаторы с входом 48 В встречаются нечасто, и их заказывают заранее. Переделывать на объекте уже собранный вариант на 12 В — это второй выезд.</p>" }
},

"y04.s-ir": {
  yorliq: "Montajchi uchun", sarlavha: "IR yoritgich: doimiy emas, hodisa bo'yicha",
  tana: "<p>Tunda IR yoritgich kameraning sarfini ikki-uch barobar oshiradi. Ikki kamerali obyektda bu sutkasiga 60–90 Vt·soat qo'shimcha — avtonomiyaning bir kundan ko'prog'i.</p>" +
    "<h4>Uchta rejim</h4><table><tr><th>Rejim</th><th>Sarf</th><th>Nima ko'rinadi</th></tr>" +
    "<tr><td>IR doimiy</td><td class='n'>eng yuqori</td><td>To'liq tungi tasvir</td></tr>" +
    "<tr><td>IR harakatda</td><td class='n'>o'rtacha</td><td>Hodisa payti to'liq tasvir</td></tr>" +
    "<tr><td>IR o'chiq</td><td class='n'>eng past</td><td>Faqat siluet, ko'cha yorug'ida</td></tr></table>" +
    "<p>Ikkinchi rejim ko'p obyektga to'g'ri keladi: harakat aniqlanganda yoritgich yoqiladi va yozuv to'liq sifatda ketadi.</p>" +
    "<p class='ogoh'>Uchinchi rejim ham bekor emas. «Kimdir keldi» savoliga javob berish uchun siluet yetarli, xususan obyekt ko'cha chirog'i yonida bo'lsa. Bu tanlov obyekt qiymatiga qarab qilinadi va loyiha hujjatiga yoziladi.</p>",
  ru: { yorliq: "Для монтажника", sarlavha: "ИК-подсветка: не постоянно, а по событию",
    tana: "<p>Ночью ИК-подсветка увеличивает расход камеры в два-три раза. На объекте с двумя камерами это плюс 60–90 Вт·ч в сутки — больше суток автономии.</p>" +
      "<h4>Три режима</h4><table><tr><th>Режим</th><th>Расход</th><th>Что видно</th></tr>" +
      "<tr><td>ИК постоянно</td><td class='n'>максимальный</td><td>Полная ночная картинка</td></tr>" +
      "<tr><td>ИК по движению</td><td class='n'>средний</td><td>Полная картинка в момент события</td></tr>" +
      "<tr><td>ИК выключена</td><td class='n'>минимальный</td><td>Только силуэт, при уличном свете</td></tr></table>" +
      "<p>Второй режим подходит большинству объектов: при обнаружении движения подсветка включается и запись идёт в полном качестве.</p>" +
      "<p class='ogoh'>Третий режим тоже не бесполезен. Чтобы ответить на вопрос «кто-то приходил», силуэта достаточно — особенно если объект стоит у уличного фонаря. Выбор делают по стоимости объекта и записывают в проект.</p>" }
},

"y04.s-disk": {
  yorliq: "Montajchi uchun", sarlavha: "HDD, SSD yoki microSD",
  tana: "<p>Aylanadigan disk uzluksiz 4–7 Vt oladi va sovuqda ishga tushmasligi mumkin: ko'p modellar 0 °C dan past haroratda ishlashga mo'ljallanmagan.</p>" +
    "<table><tr><th>Yozuv joyi</th><th>Sarf</th><th>Sovuqda</th></tr>" +
    "<tr><td>2,5\" HDD</td><td class='n'>4–7 Vt</td><td>Ishga tushmasligi mumkin</td></tr>" +
    "<tr><td>SSD</td><td class='n'>≈1 Vt</td><td>Ishlaydi</td></tr>" +
    "<tr><td>Kameraning microSD'si</td><td class='n'>0 Vt qo'shimcha</td><td>Sanoat sinfi kerak</td></tr></table>" +
    "<p>To'rt kamerali obyektda HDD dan SSD ga o'tish avtonomiyani bir kunga uzaytiradi — bu yiliga sakkiz-o'nta tashrifni olib tashlaydi.</p>" +
    "<p class='ogoh'>SSD hajmi HDD dan kichik va arxiv muddati qisqaradi. Amaliy yechim aralash: hodisa kliplari SSD'da uzoq saqlanadi, uzluksiz yozuv esa qisqa aylanma bilan yuritiladi. Muddat loyihada aniq belgilanadi, chunki nizoda birinchi savol «qaysi kungacha arxiv bor» bo'ladi.</p>",
  ru: { yorliq: "Для монтажника", sarlavha: "HDD, SSD или microSD",
    tana: "<p>Вращающийся диск непрерывно берёт 4–7 Вт и может не запуститься на морозе: многие модели не рассчитаны на работу ниже 0 °C.</p>" +
      "<table><tr><th>Носитель</th><th>Расход</th><th>На морозе</th></tr>" +
      "<tr><td>2,5\" HDD</td><td class='n'>4–7 Вт</td><td>Может не запуститься</td></tr>" +
      "<tr><td>SSD</td><td class='n'>≈1 Вт</td><td>Работает</td></tr>" +
      "<tr><td>microSD камеры</td><td class='n'>0 Вт сверху</td><td>Нужен индустриальный класс</td></tr></table>" +
      "<p>На объекте с четырьмя камерами переход с HDD на SSD добавляет сутки автономии — это минус восемь-десять выездов в год.</p>" +
      "<p class='ogoh'>Объём SSD меньше, и глубина архива сокращается. Практичное решение — смешанное: клипы событий лежат на SSD долго, а непрерывная запись идёт коротким циклом. Глубину архива фиксируют в проекте, потому что в споре первый вопрос — «за какое число есть запись».</p>" }
},

"y04.s-bitreyt": {
  yorliq: "Jamoa rahbarlari uchun", sarlavha: "Bitreyt: sarfga ham, arxivga ham ta'sir qiladi",
  tana: "<p>Kamera kunduzi past bitreytda yozadi, hodisa aniqlanganda esa to'liq sifatga o'tadi. Bu uchta narsani bir vaqtda tejaydi.</p>" +
    "<table><tr><th>Nima tejaladi</th><th>Qanday</th></tr>" +
    "<tr><td>Quvvat</td><td>Kodlash va yozish kamroq protsessor vaqti oladi</td></tr>" +
    "<tr><td>Disk joyi</td><td>Arxiv chuqurligi ikki-uch barobar oshadi</td></tr>" +
    "<tr><td>4G trafigi</td><td>Uzatiladigan klip hajmi kichrayadi</td></tr></table>" +
    "<p>Sozlama kamerada bir marta qilinadi va montaj shabloniga kiritiladi: keyingi obyektlarda u nusxa ko'chiriladi.</p>" +
    "<p class='ogoh'>Past bitreytdagi yozuvda tafsilot yo'qoladi: yuz tanilmaydi, raqam o'qilmaydi. Shuning uchun hodisa aniqlanganda to'liq sifatga o'tish majburiy bo'ladi va uning ishlashi qabul qilishda alohida tekshiriladi.</p>",
  ru: { yorliq: "Для тимлида", sarlavha: "Битрейт влияет и на расход, и на архив",
    tana: "<p>Днём камера пишет с низким битрейтом, а при обнаружении события переходит на полное качество. Это экономит сразу три вещи.</p>" +
      "<table><tr><th>Что экономится</th><th>Как</th></tr>" +
      "<tr><td>Энергия</td><td>Кодирование и запись берут меньше процессорного времени</td></tr>" +
      "<tr><td>Место на диске</td><td>Глубина архива растёт в два-три раза</td></tr>" +
      "<tr><td>Трафик 4G</td><td>Передаваемый клип становится меньше</td></tr></table>" +
      "<p>Настройку делают на камере один раз и вносят в монтажный шаблон: на следующих объектах её просто копируют.</p>" +
      "<p class='ogoh'>В записи с низким битрейтом теряются детали: лицо не узнать, номер не прочитать. Поэтому переход на полное качество при обнаружении события обязателен, и его работу отдельно проверяют при приёмке.</p>" }
},

"y04.q-30": {
  yorliq: "Montajchi uchun", sarlavha: "30 Vt: haftalik tashrif rejimi",
  tana: "<p>To'liq to'plam — ikkita IR kamera, NVR disk bilan va router — 30 Vt atrofida oladi. Bu 4,38 kVt·soatlik foydali sig'imda olti kun degani.</p>" +
    "<p>Amalda olti kun haftalik marshrutga to'g'ri kelmaydi: zaxira qoldirish kerak. Shuning uchun vazifa qolgan kun uchdan kam bo'lganda ochiladi va marshrut haftaning boshida tuziladi.</p>" +
    "<table><tr><th>Ko'rsatkich</th><th>Qiymat</th></tr>" +
    "<tr><td>Yiliga tashrif</td><td class='n'>≈52</td></tr>" +
    "<tr><td>Besh yilda</td><td class='n'>≈260</td></tr>" +
    "<tr><td>Bitta marshrutda obyekt</td><td class='n'>5–8</td></tr></table>" +
    "<p class='ogoh'>Bu rejim faqat servis bazasiga yaqin, marshrutga tushadigan obyektlar uchun mos. Uzoqdagi yolg'iz obyektda haftalik tashrif iqtisodiy jihatdan mumkin emas — u yerda yuklama 15 Vt ga tushiriladi yoki boshqa yechim tanlanadi.</p>",
  ru: { yorliq: "Для монтажника", sarlavha: "30 Вт: режим еженедельных выездов",
    tana: "<p>Полный набор — две ИК-камеры, NVR с диском и роутер — берёт около 30 Вт. При полезной ёмкости 4,38 кВт·ч это шесть суток.</p>" +
      "<p>На практике шесть суток не ложатся в недельный маршрут: нужен запас. Поэтому задачу открывают, когда остаётся меньше трёх дней, а маршрут собирают в начале недели.</p>" +
      "<table><tr><th>Показатель</th><th>Значение</th></tr>" +
      "<tr><td>Выездов в год</td><td class='n'>≈52</td></tr>" +
      "<tr><td>За пять лет</td><td class='n'>≈260</td></tr>" +
      "<tr><td>Объектов в одном маршруте</td><td class='n'>5–8</td></tr></table>" +
      "<p class='ogoh'>Этот режим подходит только объектам вблизи сервисной базы, которые ложатся в маршрут. Для удалённого одиночного объекта еженедельный выезд экономически невозможен — там нагрузку снижают до 15 Вт или выбирают другое решение.</p>" }
},

"y04.q-15": {
  yorliq: "Jamoa rahbarlari uchun", sarlavha: "15 Vt: yuklamani qanday yarimlatish mumkin",
  tana: "<p>30 Vt dan 15 Vt ga tushish avtonomiyani olti kundan o'n ikki kunga cho'zadi va besh yilda 130 ga yaqin tashrifni olib tashlaydi.</p>" +
    "<table><tr><th>Qaror</th><th>Tejaladi</th></tr>" +
    "<tr><td>NVR o'rniga kameraning microSD'si</td><td class='n'>6–10 Vt</td></tr>" +
    "<tr><td>IR jadval bo'yicha</td><td class='n'>3–5 Vt</td></tr>" +
    "<tr><td>48 V PoE, DC-DC siz</td><td class='n'>1–2 Vt</td></tr>" +
    "<tr><td>Kunduzgi past bitreyt</td><td class='n'>1–2 Vt</td></tr></table>" +
    "<p>Birinchi qator eng katta, lekin u eng ko'p narsani o'zgartiradi: markazlashgan arxiv yo'qoladi va klip har kameradan alohida olinadi.</p>" +
    "<p class='ogoh'>Yuklamani kamaytirish nazoratni ham kamaytiradi va buni ochiq aytish kerak. Qaror obyekt qiymati bo'yicha qabul qilinadi: qimmat obyektda to'liq to'plam va haftalik tashrif, o'rta qiymatli obyektda esa yengil to'plam va oylik tashrif.</p>",
  ru: { yorliq: "Для тимлида", sarlavha: "15 Вт: как вдвое снизить нагрузку",
    tana: "<p>Снижение с 30 до 15 Вт растягивает автономию с шести до двенадцати суток и убирает около 130 выездов за пять лет.</p>" +
      "<table><tr><th>Решение</th><th>Экономия</th></tr>" +
      "<tr><td>Вместо NVR — microSD камер</td><td class='n'>6–10 Вт</td></tr>" +
      "<tr><td>ИК по расписанию</td><td class='n'>3–5 Вт</td></tr>" +
      "<tr><td>PoE от 48 В, без DC-DC</td><td class='n'>1–2 Вт</td></tr>" +
      "<tr><td>Низкий дневной битрейт</td><td class='n'>1–2 Вт</td></tr></table>" +
      "<p>Первая строка крупнейшая, но она меняет больше всего: пропадает централизованный архив, и клип забирают с каждой камеры отдельно.</p>" +
      "<p class='ogoh'>Снижение нагрузки снижает и уровень контроля — об этом нужно говорить прямо. Решение принимают по стоимости объекта: на дорогом — полный набор и еженедельный выезд, на среднем — облегчённый набор и ежемесячный.</p>" }
},

"y04.q-sovuq": {
  yorliq: "Rahbariyat uchun", sarlavha: "Nega sovuq bu yechimga ta'sir qilmaydi",
  tana: "<p>Boshqa yechimlarda qishning asosiy muammosi zaryad: litiy akkumulyatorni 0 °C dan past haroratda zaryadlash uni buzadi. Bu yerda muammo yo'q, chunki obyektda zaryad umuman bo'lmaydi.</p>" +
    "<table><tr><th>Jarayon</th><th>Qayerda</th><th>Harorat</th></tr>" +
    "<tr><td>Razryad</td><td>Obyektda</td><td>−20 °C gacha ruxsat</td></tr>" +
    "<tr><td>Zaryad</td><td>Bazada</td><td>isitiladigan xona</td></tr></table>" +
    "<p>Sovuqda blok sig'imining 10–15% ini vaqtincha bermaydi va bu qaytariladigan yo'qotish. Blok iliq bazaga qaytgach sig'im to'liq tiklanadi.</p>" +
    "<p class='ogoh'>Aynan shu sabab bu yechim isitilmaydigan ombor va sovutkichli ombor uchun tanlanadi. U yerda quyoshli komplekt ham, ichki makon uchun mo'ljallangan jihoz ham ishlamaydi, LiFePO4 shkafi esa hech qanday qo'shimcha chorasiz ishlaydi.</p>",
  ru: { yorliq: "Для правления", sarlavha: "Почему мороз не мешает этому решению",
    tana: "<p>В остальных решениях главная зимняя проблема — заряд: заряжать литиевый аккумулятор при температуре ниже 0 °C нельзя. Здесь проблемы нет, потому что на объекте заряда не происходит вообще.</p>" +
      "<table><tr><th>Процесс</th><th>Где</th><th>Температура</th></tr>" +
      "<tr><td>Разряд</td><td>На объекте</td><td>разрешён до −20 °C</td></tr>" +
      "<tr><td>Заряд</td><td>На базе</td><td>отапливаемое помещение</td></tr></table>" +
      "<p>На морозе блок временно не отдаёт 10–15% ёмкости, и эта потеря обратима. Вернувшись в тепло, блок восстанавливает ёмкость полностью.</p>" +
      "<p class='ogoh'>Именно поэтому решение выбирают для неотапливаемых и холодильных складов. Там не работает ни солнечный комплект, ни оборудование для помещений, а шкаф LiFePO4 работает без каких-либо дополнительных мер.</p>" }
},

"y04.b-ogirlik": {
  yorliq: "Montajchi uchun", sarlavha: "Yo'lni o'lchash: ko'rik bosqichidagi ish",
  tana: "<p>Ko'rikda shkafgacha bo'lgan yo'l o'lchanadi va dalolatnomaga yoziladi. Bu ish montajchining emas, obyekt menejerining vazifasi va u jihoz buyurtma qilinishidan oldin bajariladi.</p>" +
    "<h4>Nima yoziladi</h4><ul><li>eshiklar eni va balandligi;</li><li>zinapoya bor-yo'qligi, pog'onalar soni;</li><li>burilishlar radiusi — 45 kg yukni tor burchakda burib bo'lmaydi;</li><li>mashina qayergacha kela oladi;</li><li>aravacha o'tadimi.</li></ul>" +
    "<p>Bu ma'lumot bo'yicha blok konfiguratsiyasi tanlanadi: bitta 48 V blok yoki ikkita 24 V modul.</p>" +
    "<p class='ogoh'>O'lchov qilinmagan obyektda birinchi almashtirish kuni brigada blokni ko'tara olmasligi ma'lum bo'ladi. Shu paytda shkaf allaqachon o'rnatilgan, kabel yotqizilgan va obyekt platformada ro'yxatga olingan bo'ladi — ya'ni tuzatish butun montajni qayta qilish degani.</p>",
  ru: { yorliq: "Для монтажника", sarlavha: "Замер пути: работа на этапе осмотра",
    tana: "<p>На осмотре замеряют путь до шкафа и вносят его в акт. Это задача не монтажника, а менеджера объекта, и выполняется она до заказа оборудования.</p>" +
      "<h4>Что фиксируют</h4><ul><li>ширину и высоту дверных проёмов;</li><li>наличие лестницы и число ступеней;</li><li>радиусы поворотов — 45 кг в тесном углу не развернуть;</li><li>докуда подъезжает машина;</li><li>проходит ли тележка.</li></ul>" +
      "<p>По этим данным выбирают конфигурацию блока: один блок 48 В или два модуля по 24 В.</p>" +
      "<p class='ogoh'>Если замер не сделан, о невозможности поднять блок узнают в день первой замены. К этому моменту шкаф уже стоит, кабель проложен, объект зарегистрирован в платформе — то есть исправление означает переделку всего монтажа.</p>" }
},

"y04.b-ulagich": {
  yorliq: "Montajchi uchun", sarlavha: "Ulagich: o'n daqiqa va yigirma daqiqa orasidagi farq",
  tana: "<p>Almashtirish tezligini ulagich turi belgilaydi. Vintli klemma bilan har almashtirish yigirma daqiqaga cho'ziladi va har safar kontakt sifati pasayadi.</p>" +
    "<table><tr><th>Ulagich</th><th>Almashtirish</th><th>Qutb xatosi</th></tr>" +
    "<tr><td>Vintli klemma</td><td class='n'>15–20 daqiqa</td><td>Mumkin</td></tr>" +
    "<tr><td>Tez uziladigan ulagich</td><td class='n'>2–3 daqiqa</td><td>Konstruksiya bilan istisno</td></tr></table>" +
    "<p>Bir obyektda o'n daqiqalik farq besh yilda 260 tashrifda 43 soatga aylanadi — bu ikki ish haftasidan ko'p, faqat vint burash uchun.</p>" +
    "<p class='ogoh'>Ulagich toki yuklamaga emas, eng yuqori qisqa muddatli tokka hisoblanadi. Ulanish paytidagi uchqun kontaktni asta-sekin kuydiradi, shuning uchun ulagich zaxira bilan tanlanadi va uning kontaktlari yiliga bir marta ko'zdan kechiriladi.</p>",
  ru: { yorliq: "Для монтажника", sarlavha: "Разъём: разница между десятью и двадцатью минутами",
    tana: "<p>Скорость замены определяет тип разъёма. С винтовой клеммой каждая замена растягивается до двадцати минут, и качество контакта с каждым разом падает.</p>" +
      "<table><tr><th>Разъём</th><th>Замена</th><th>Переполюсовка</th></tr>" +
      "<tr><td>Винтовая клемма</td><td class='n'>15–20 минут</td><td>Возможна</td></tr>" +
      "<tr><td>Быстроразъёмное соединение</td><td class='n'>2–3 минуты</td><td>Исключена конструкцией</td></tr></table>" +
      "<p>Десять минут разницы на одном объекте за 260 выездов превращаются в 43 часа — больше двух рабочих недель, потраченных только на закручивание винтов.</p>" +
      "<p class='ogoh'>Ток разъёма считают не по нагрузке, а по максимальному кратковременному току. Искра в момент подключения постепенно выжигает контакт, поэтому разъём берут с запасом и раз в год осматривают его контактные группы.</p>" }
},

"y04.b-uzluksiz": {
  yorliq: "Jamoa rahbarlari uchun", sarlavha: "Almashtirish paytida tizim o'chmasligi kerak",
  tana: "<p>Blok uzilganda butun shkaf o'chadi: kameralar, NVR va router. Qayta yuklanish uch-besh daqiqa davom etadi va shu vaqtda obyekt nazoratsiz qoladi.</p>" +
    "<h4>Nima qilinadi</h4><p>Shkafda kichik zaxira akkumulyator qoldiriladi — 12 V 7–12 A·soat yetarli. U besh-o'n daqiqa yuklamani ushlab turadi, ya'ni almashtirish uzilishsiz o'tadi.</p>" +
    "<table><tr><th>Zaxirasiz</th><th>Zaxira bilan</th></tr>" +
    "<tr><td>Har almashtirishda qayta yuklanish</td><td>Uzilish yo'q</td></tr>" +
    "<tr><td>NVR yozuvida bo'shliq</td><td>Yozuv uzluksiz</td></tr>" +
    "<tr><td>Tunnel qayta ko'tariladi</td><td>Tunnel saqlanadi</td></tr></table>" +
    "<p class='ogoh'>Zaxira akkumulyator arzon, lekin u ham parvarish talab qiladi: ikki-uch yilda almashtiriladi. Uni servis jadvaliga kiritish kerak, aks holda u aynan kerak bo'lgan kuni ishlamaydi.</p>",
  ru: { yorliq: "Для тимлида", sarlavha: "Во время замены система не должна выключаться",
    tana: "<p>При отключении блока выключается весь шкаф: камеры, NVR и роутер. Перезагрузка занимает три-пять минут, и всё это время объект без контроля.</p>" +
      "<h4>Что делают</h4><p>В шкафу оставляют небольшой резервный аккумулятор — достаточно 12 В 7–12 А·ч. Он держит нагрузку пять-десять минут, то есть замена проходит без перерыва.</p>" +
      "<table><tr><th>Без резерва</th><th>С резервом</th></tr>" +
      "<tr><td>Перезагрузка при каждой замене</td><td>Перерыва нет</td></tr>" +
      "<tr><td>Пропуск в записи NVR</td><td>Запись непрерывна</td></tr>" +
      "<tr><td>Туннель поднимается заново</td><td>Туннель сохраняется</td></tr></table>" +
      "<p class='ogoh'>Резервный аккумулятор дёшев, но тоже требует ухода: его меняют раз в два-три года. Это вносят в сервисный график, иначе он не сработает именно в тот день, когда понадобится.</p>" }
},

"y04.b-marshrut": {
  yorliq: "Jamoa rahbarlari uchun", sarlavha: "Marshrut platformadan tuziladi",
  tana: "<p>Adapter har obyektning zaryadini va qolgan kunini biladi. Marshrut shu ma'lumot bo'yicha tuziladi — taqvim bo'yicha emas.</p>" +
    "<h4>Qanday ishlaydi</h4><ol><li>Adapter har obyekt uchun <code>qolgan_kun</code> ni hisoblaydi: qolgan energiya bo'linadi oxirgi 24 soatdagi o'rtacha sarfga.</li>" +
    "<li>Qolgan kun uchdan kam bo'lsa, servis vazifasi avtomatik ochiladi.</li>" +
    "<li>Ochiq vazifalar hududiy yaqinlik bo'yicha guruhlanadi.</li>" +
    "<li>Brigada bitta chiqishda besh-sakkiz obyektga xizmat ko'rsatadi.</li></ol>" +
    "<p>Har almashtirish platformada qayd etiladi: qaysi blok olib ketildi, qaysi blok qo'yildi, qaysi vaqtda. Shunday qilib har blokning joyi va tsikl soni ma'lum bo'ladi.</p>" +
    "<p class='ogoh'>Taqvim bo'yicha rotatsiya ikki tomondan zarar keltiradi: bir obyektga erta boriladi va blok yarim zaryad bilan almashtiriladi, boshqasiga esa kech qolinadi. Ma'lumotga asoslangan marshrut tashrif sonini taxminan uchdan bir qismga kamaytiradi.</p>",
  ru: { yorliq: "Для тимлида", sarlavha: "Маршрут строит платформа",
    tana: "<p>Адаптер знает заряд и остаток дней по каждому объекту. Маршрут строится по этим данным, а не по календарю.</p>" +
      "<h4>Как это работает</h4><ol><li>Адаптер считает по каждому объекту <code>qolgan_kun</code>: остаток энергии делится на средний расход за последние 24 часа.</li>" +
      "<li>Если остаётся меньше трёх дней, сервисная задача открывается автоматически.</li>" +
      "<li>Открытые задачи группируются по территориальной близости.</li>" +
      "<li>Бригада за один выезд обслуживает пять-восемь объектов.</li></ol>" +
      "<p>Каждая замена фиксируется в платформе: какой блок увезли, какой поставили, в какое время. Так по каждому блоку известно его местонахождение и число циклов.</p>" +
      "<p class='ogoh'>Календарная ротация вредит с двух сторон: на один объект приезжают рано и меняют наполовину заряженный блок, на другой опаздывают. Маршрут по данным сокращает число выездов примерно на треть.</p>" }
},

"y04.b-fond": {
  yorliq: "Moliya va huquq", sarlavha: "Rotatsiya fondi: qancha zaxira blok kerak",
  tana: "<p>Fond hajmi ikki narsaga bog'liq: almashtirish chastotasi va blokning bazada zaryadlanish vaqti.</p>" +
    "<table><tr><th>Ko'rsatkich</th><th>Qiymat</th></tr>" +
    "<tr><td>Zaryadlash vaqti, 20 A tok bilan</td><td class='n'>5–6 soat</td></tr>" +
    "<tr><td>Marshrutda o'tadigan vaqt</td><td class='n'>1 kun</td></tr>" +
    "<tr><td>Zaxira blok, har 2–3 obyektga</td><td class='n'>1 dona</td></tr></table>" +
    "<p>O'ttiz obyektli pilot uchun bu 10–15 zaxira blok degani. Blok narxi 6–9 mln so'mdan, ya'ni fond 60–135 mln so'm — jiddiy alohida qator.</p>" +
    "<p class='ogoh'>Fondni kamaytirishning yagona yo'li yuklamani kamaytirish. 15 Vt rejimida almashtirish ikki barobar kam bo'ladi va fond ham ikki barobar kichrayadi. Shuning uchun yuklamani kamaytirish qarori jihoz qaroridan oldin qabul qilinadi.</p>",
  ru: { yorliq: "Финансы и право", sarlavha: "Фонд ротации: сколько резервных блоков нужно",
    tana: "<p>Размер фонда зависит от двух вещей: частоты замен и времени заряда блока на базе.</p>" +
      "<table><tr><th>Показатель</th><th>Значение</th></tr>" +
      "<tr><td>Время заряда током 20 А</td><td class='n'>5–6 часов</td></tr>" +
      "<tr><td>Время в маршруте</td><td class='n'>1 сутки</td></tr>" +
      "<tr><td>Резервный блок на 2–3 объекта</td><td class='n'>1 шт.</td></tr></table>" +
      "<p>Для пилота на тридцать объектов это 10–15 резервных блоков. Цена блока от 6–9 млн сум, то есть фонд — 60–135 млн сум: серьёзная отдельная строка.</p>" +
      "<p class='ogoh'>Единственный способ уменьшить фонд — снизить нагрузку. В режиме 15 Вт замен вдвое меньше, и фонд вдвое меньше. Поэтому решение о снижении нагрузки принимают раньше, чем решение об оборудовании.</p>" }
},

"y04.b-transport": {
  yorliq: "Moliya va huquq", sarlavha: "Litiy blokni tashish: nima talab qilinadi",
  tana: "<p>Litiy-ion va LiFePO4 akkumulyatorlar xavfli yuk sifatida tasniflanadi. Ichki tashish uchun talablar yengilroq, lekin ular bor va ularni servis shartnomasida yozib qo'yish kerak.</p>" +
    "<h4>Amaliy talablar</h4><ul><li>blok transportda mahkamlanadi, sirg'anmaydi va ag'darilmaydi;</li>" +
    "<li>qutblar qopqoq yoki ulagich bilan yopiladi;</li>" +
    "<li>shikastlangan blok alohida, yong'inga chidamli idishda tashiladi;</li>" +
    "<li>mashinada kukunli o't o'chirgich bo'ladi;</li>" +
    "<li>haydovchi va montajchi qisqa yo'riqnomadan o'tadi.</li></ul>" +
    "<p class='ogoh'>Shikastlangan yoki shishgan blok hech qanday holatda oddiy tartibda tashilmaydi va zaryadlanmaydi. U obyektda yong'inga chidamli joyda qoldiriladi va utilizatsiya bo'yicha alohida tartib qo'llanadi. Bu tartib servis shartnomasida oldindan yoziladi, hodisa paytida emas.</p>",
  ru: { yorliq: "Финансы и право", sarlavha: "Перевозка литиевого блока: что требуется",
    tana: "<p>Литий-ионные и LiFePO4 аккумуляторы относятся к опасным грузам. Для внутренних перевозок требования мягче, но они есть, и их прописывают в сервисном договоре.</p>" +
      "<h4>Практические требования</h4><ul><li>блок закрепляют в транспорте так, чтобы он не скользил и не опрокидывался;</li>" +
      "<li>полюса закрывают колпачком или разъёмом;</li>" +
      "<li>повреждённый блок везут отдельно, в огнестойкой таре;</li>" +
      "<li>в машине есть порошковый огнетушитель;</li>" +
      "<li>водитель и монтажник проходят короткий инструктаж.</li></ul>" +
      "<p class='ogoh'>Повреждённый или вздувшийся блок ни при каких условиях не везут обычным порядком и не заряжают. Его оставляют на объекте в огнестойком месте и применяют отдельный порядок утилизации. Этот порядок прописывают в сервисном договоре заранее, а не в момент происшествия.</p>" }
},

"y04.y-bms": {
  yorliq: "Jamoa rahbarlari uchun", sarlavha: "BMS: registr xaritasi va o'qish tartibi",
  tana: "<p>BMS odatda RS-485 orqali Modbus RTU beradi. Shkafdagi kichik shlyuz uni Modbus TCP'ga o'giradi, adapter tunnel orqali har besh daqiqada o'qiydi.</p>" +
    "<table><tr><th>Registr</th><th>Nima</th></tr>" +
    "<tr><td>SOC</td><td>Zaryad darajasi, foizda</td></tr>" +
    "<tr><td>Voltage</td><td>Umumiy kuchlanish</td></tr>" +
    "<tr><td>Current</td><td>Tok; manfiy qiymat razryadni bildiradi</td></tr>" +
    "<tr><td>Temp</td><td>Hujayra harorati</td></tr>" +
    "<tr><td>Cycle count</td><td>Bajarilgan tsikllar soni</td></tr>" +
    "<tr><td>Alarm</td><td>Xatolar bayrog'i</td></tr></table>" +
    "<p>Har ishlab chiqaruvchining registr manzillari boshqacha. Xaritasiz bu ma'lumotlarning hech biri olinmaydi.</p>" +
    "<p class='ogoh'>Tsikl hisoblagichiga alohida e'tibor bering: u blokning haqiqiy holatini ko'rsatadi va kafolat bo'yicha nizoda hal qiluvchi dalil bo'ladi. Bu registr xaritada bo'lishi xarid shartiga alohida yoziladi.</p>",
  ru: { yorliq: "Для тимлида", sarlavha: "BMS: карта регистров и порядок опроса",
    tana: "<p>BMS обычно отдаёт Modbus RTU по RS-485. Небольшой шлюз в шкафу переводит его в Modbus TCP, и адаптер читает данные через туннель каждые пять минут.</p>" +
      "<table><tr><th>Регистр</th><th>Что это</th></tr>" +
      "<tr><td>SOC</td><td>Уровень заряда в процентах</td></tr>" +
      "<tr><td>Voltage</td><td>Суммарное напряжение</td></tr>" +
      "<tr><td>Current</td><td>Ток; отрицательное значение — разряд</td></tr>" +
      "<tr><td>Temp</td><td>Температура ячеек</td></tr>" +
      "<tr><td>Cycle count</td><td>Число выполненных циклов</td></tr>" +
      "<tr><td>Alarm</td><td>Флаги ошибок</td></tr></table>" +
      "<p>Адреса регистров у каждого производителя свои. Без карты ни одно из этих значений получить нельзя.</p>" +
      "<p class='ogoh'>Отдельно следите за счётчиком циклов: он показывает реальное состояние блока и становится решающим доказательством в гарантийном споре. Наличие этого регистра в карте вносят в условия закупки отдельной строкой.</p>" }
},

"y04.p-bms": {
  yorliq: "Jamoa rahbarlari uchun", sarlavha: "qolgan_kun: qanday hisoblanadi",
  tana: "<p>Bu maydon qurilmadan kelmaydi. Uni adapter hisoblaydi va aynan u butun servis rejasini boshqaradi.</p>" +
    "<pre><code>qolgan_kun = (SOC − 10%) × sig'im / oxirgi_24soat_o'rtacha_sarf</code></pre>" +
    "<h4>Nega 10% ayiriladi</h4><p>BMS chegarasi va xavfsizlik zaxirasi. Nol foizga hisoblash blokni to'liq razryadga olib boradi va uning resursini qisqartiradi.</p>" +
    "<h4>Nega oxirgi 24 soat</h4><p>Yuklama o'zgaradi: qishda IR ko'proq ishlaydi, yozda kamroq. O'rtacha sarfni jonli o'lchash prognozni haqiqatga yaqinlashtiradi. O'zgarish keskin bo'lsa — masalan, kamera nosozligi tufayli sarf ikki barobar oshsa — prognoz ham darhol o'zgaradi va bu o'zi ogohlantirish bo'lib xizmat qiladi.</p>" +
    "<p class='ogoh'>Prognoz uch kundan kam bo'lganda vazifa ochiladi. Bu uch kun brigadaga marshrutni rejalashtirish uchun vaqt beradi — ya'ni tizim shoshilinch chiqishlarni umuman istisno qiladi.</p>",
  ru: { yorliq: "Для тимлида", sarlavha: "qolgan_kun: как это считается",
    tana: "<p>Это поле не приходит с устройства. Его вычисляет адаптер, и именно оно управляет всем сервисным планом.</p>" +
      "<pre><code>qolgan_kun = (SOC − 10%) × ёмкость / средний_расход_за_24_часа</code></pre>" +
      "<h4>Почему вычитают 10%</h4><p>Это порог BMS и запас безопасности. Расчёт до нуля доводит блок до полного разряда и сокращает его ресурс.</p>" +
      "<h4>Почему именно последние 24 часа</h4><p>Нагрузка меняется: зимой ИК работает больше, летом меньше. Измерение среднего расхода вживую приближает прогноз к реальности. Если изменение резкое — например, из-за неисправности камеры расход вырос вдвое — прогноз меняется сразу и сам служит предупреждением.</p>" +
      "<p class='ogoh'>Задача открывается, когда прогноз опускается ниже трёх дней. Эти три дня дают бригаде время спланировать маршрут — то есть система полностью исключает срочные выезды.</p>" }
},

"y04.p-registr": {
  yorliq: "Moliya va huquq", sarlavha: "Registr xaritasi: xarid shartining majburiy bandi",
  tana: "<p>Talab quyidagicha yoziladi: <b>yetkazib beruvchi BMS ning Modbus registr xaritasini hujjat sifatida taqdim etadi; xaritada zaryad darajasi, kuchlanish, tok, hujayra harorati, tsikl soni va xato bayroqlari bo'lishi shart.</b></p>" +
    "<h4>Nega bu shunchalik muhim</h4><p>Xaritasiz zaryadni faqat obyektga borib ko'rish mumkin. U holda rotatsiya taqvim bo'yicha olib boriladi va tashrif soni taxminan uchdan bir qismga oshadi — bu besh yilda o'nlab million so'm.</p>" +
    "<h4>Qabul qilishda tekshiriladi</h4><p>Adapter BMS'dan haqiqiy qiymat o'qiyotgani platformada ko'rsatiladi va dalolatnomaga yoziladi. «Ulandi» degan yozuv yetarli emas: aniq zaryad foizi ekranda ko'rinishi kerak.</p>" +
    "<p class='ogoh'>Zaxira chora sifatida shkafga alohida kuchlanish o'lchagich qo'yiladi. U aniq zaryadni bermaydi, lekin blok bo'shayotganini ko'rsatadi va BMS ishdan chiqqan holatda ham obyektni ko'r qoldirmaydi.</p>",
  ru: { yorliq: "Финансы и право", sarlavha: "Карта регистров: обязательный пункт закупки",
    tana: "<p>Формулировка такая: <b>поставщик предоставляет карту регистров Modbus для BMS в виде документа; в карте обязаны присутствовать уровень заряда, напряжение, ток, температура ячеек, число циклов и флаги ошибок.</b></p>" +
      "<h4>Почему это настолько важно</h4><p>Без карты уровень заряда можно узнать только на объекте. Тогда ротация идёт по календарю, и число выездов растёт примерно на треть — за пять лет это десятки миллионов сум.</p>" +
      "<h4>Что проверяют при приёмке</h4><p>В платформе показывают, что адаптер читает с BMS реальные значения, и вносят это в акт. Записи «подключено» недостаточно: на экране должен быть виден конкретный процент заряда.</p>" +
      "<p class='ogoh'>В качестве резервной меры в шкаф ставят отдельный вольтметр. Точного заряда он не даёт, но показывает, что блок разряжается, и не оставляет объект слепым даже при отказе BMS.</p>" }
},

"y04.o-zaryad": {
  yorliq: "Texnik izoh", sarlavha: "Zaryad va qolgan kun operator ekranida",
  tana: "<p>Obyekt kartasida quvvat alohida blok bo'lib turadi va u operator uchun eng muhim ko'rsatkich hisoblanadi: kameralar ishlayaptimi degan savolga javob shu yerda.</p>" +
    "<table><tr><th>Ko'rsatkich</th><th>Yangilanish</th></tr>" +
    "<tr><td>Zaryad, foizda</td><td>Har 5 daqiqada</td></tr>" +
    "<tr><td>Qolgan kun</td><td>Har 5 daqiqada, qayta hisoblanadi</td></tr>" +
    "<tr><td>Hujayra harorati</td><td>Har 5 daqiqada</td></tr>" +
    "<tr><td>Tsikl soni</td><td>Almashtirish paytida</td></tr></table>" +
    "<h4>Uchta chegara</h4><ul><li>qolgan kun 5 dan kam — obyekt kuzatuv ro'yxatiga tushadi;</li>" +
    "<li>qolgan kun 3 dan kam — servis vazifasi avtomatik ochiladi;</li>" +
    "<li>zaryad 15% dan past — ustuvor vazifa, marshrutdan tashqari chiqish.</li></ul>" +
    "<p class='ogoh'>Uchinchi chegara juda kam ishlashi kerak. Agar u oyiga bir necha marta ishlasa, demak yuklama noto'g'ri hisoblangan yoki marshrut sxemasi ishlamayapti — muammo blokdagi emas, jarayondagi.</p>",
  ru: { yorliq: "Техническая справка", sarlavha: "Заряд и остаток дней на экране оператора",
    tana: "<p>В карточке объекта питание вынесено в отдельный блок и для оператора это главный показатель: ответ на вопрос «работают ли камеры» находится именно здесь.</p>" +
      "<table><tr><th>Показатель</th><th>Обновление</th></tr>" +
      "<tr><td>Заряд в процентах</td><td>Каждые 5 минут</td></tr>" +
      "<tr><td>Остаток дней</td><td>Каждые 5 минут, пересчёт</td></tr>" +
      "<tr><td>Температура ячеек</td><td>Каждые 5 минут</td></tr>" +
      "<tr><td>Число циклов</td><td>При замене</td></tr></table>" +
      "<h4>Три порога</h4><ul><li>остаток меньше 5 дней — объект попадает в список наблюдения;</li>" +
      "<li>остаток меньше 3 дней — сервисная задача открывается автоматически;</li>" +
      "<li>заряд ниже 15% — приоритетная задача, выезд вне маршрута.</li></ul>" +
      "<p class='ogoh'>Третий порог должен срабатывать крайне редко. Если он срабатывает несколько раз в месяц, значит нагрузка посчитана неверно или схема маршрутов не работает — проблема не в блоке, а в процессе.</p>" }
},

"y04.m-joy": {
  yorliq: "Montajchi uchun", sarlavha: "Shkaf joyi: bir marta tanlanadi",
  tana: "<p>Shkafni keyin ko'chirish butun kabel tarmog'ini qayta qilish degani. Shuning uchun joy montajdan oldin, ko'rik bosqichida tanlanadi.</p>" +
    "<h4>Talablar</h4><ul><li>ko'zga tashlanmaydigan, lekin xizmat ko'rsatish uchun qulay joy;</li>" +
    "<li>kameralargacha kabel uzunligi 90 metrdan oshmasin;</li>" +
    "<li>eshikdan blok o'tadigan yo'l bo'lsin;</li>" +
    "<li>devor ankerlash uchun mustahkam bo'lsin;</li>" +
    "<li>suv oqmaydigan, namlik to'planmaydigan joy.</li></ul>" +
    "<p>Shkaf devorga ankerlanadi va ochilish datchigi bilan jihozlanadi. Bloklarga seriya raqami va MKB belgisi tushiriladi.</p>" +
    "<p class='ogoh'>Akkumulyator shkafi o'g'rilar uchun qimmat va tanish o'lja. Uni ko'rinadigan joyga qo'yish — obyektga e'lon osish bilan barobar. Eng yaxshi joy — texnik xona yoki ichki koridor, tashqi devor emas.</p>",
  ru: { yorliq: "Для монтажника", sarlavha: "Место шкафа выбирают один раз",
    tana: "<p>Перенести шкаф позже — значит переделать всю кабельную сеть. Поэтому место выбирают до монтажа, на этапе осмотра.</p>" +
      "<h4>Требования</h4><ul><li>место незаметное, но удобное для обслуживания;</li>" +
      "<li>длина кабеля до камер не больше 90 метров;</li>" +
      "<li>через дверной проём должен проходить блок;</li>" +
      "<li>стена должна держать анкер;</li>" +
      "<li>без протечек и скопления влаги.</li></ul>" +
      "<p>Шкаф крепят анкерами к стене и оснащают датчиком вскрытия. На блоки наносят серийный номер и знак MKBANK.</p>" +
      "<p class='ogoh'>Шкаф с аккумуляторами — дорогая и узнаваемая добыча. Поставить его на виду — всё равно что повесить на объект объявление. Лучшее место — техническое помещение или внутренний коридор, а не наружная стена.</p>" }
},

"y04.m-tok": {
  yorliq: "Montajchi uchun", sarlavha: "Kutish tokini o'lchash: eng muhim o'lchov",
  tana: "<p>Butun rotatsiya jadvali shu bitta raqamga tayanadi. Katalogdagi qiymatlar taxminiy: haqiqiy sarf kabel uzunligi, kamera sozlamasi va router signaliga bog'liq.</p>" +
    "<h4>Qanday o'lchanadi</h4><ol><li>Tizim to'liq ishga tushiriladi va 30 daqiqa barqarorlashadi.</li>" +
    "<li>Blok chiqishida ampermetr bilan tok o'lchanadi, kuchlanish bilan ko'paytiriladi.</li>" +
    "<li>Ikki holat o'lchanadi: IR o'chiq (kunduzgi) va IR yoqiq (tungi).</li>" +
    "<li>Sutkalik o'rtacha hisoblanadi va dalolatnomaga yoziladi.</li></ol>" +
    "<p>Hisobdagi 30 Vt bilan farq 15% dan oshsa, rotatsiya jadvali shu obyekt uchun qaytadan tuziladi.</p>" +
    "<p class='ogoh'>O'lchovni birinchi kunda bajarish shart. Uch oydan keyin obyektda nima o'zgargani esdan chiqadi va sarfning ortishi sababini topish qiyinlashadi. Boshlang'ich qiymat — keyingi barcha taqqoslashning asosi.</p>",
  ru: { yorliq: "Для монтажника", sarlavha: "Замер тока покоя — самый важный замер",
    tana: "<p>Весь график ротации держится на этом единственном числе. Каталожные значения приблизительны: реальный расход зависит от длины кабеля, настроек камер и уровня сигнала роутера.</p>" +
      "<h4>Как измеряют</h4><ol><li>Систему полностью запускают и дают ей 30 минут стабилизироваться.</li>" +
      "<li>На выходе блока амперметром меряют ток и умножают на напряжение.</li>" +
      "<li>Меряют два состояния: ИК выключена (день) и ИК включена (ночь).</li>" +
      "<li>Считают среднесуточное значение и вносят в акт.</li></ol>" +
      "<p>Если расхождение с расчётными 30 Вт превышает 15%, график ротации для этого объекта пересчитывают.</p>" +
      "<p class='ogoh'>Замер обязательно делают в первый день. Через три месяца никто не вспомнит, что на объекте менялось, и найти причину роста расхода будет трудно. Исходное значение — база для всех последующих сравнений.</p>" }
},

"y04.n-fond": {
  yorliq: "Moliya va huquq", sarlavha: "Zaxira blok: unutiladigan va hal qiluvchi qator",
  tana: "<p>Rotatsiya sxemasi zaxira bloksiz ishlamaydi. Brigada obyektga kelib, bo'shagan blokni olib, o'rniga zaryadlanganini qo'yishi kerak — aks holda u ikkinchi safar kelishga majbur bo'ladi.</p>" +
    "<table><tr><th>Obyekt soni</th><th>Zaxira blok</th><th>Qiymati, mln so'm</th></tr>" +
    "<tr><td class='n'>10</td><td class='n'>4–5</td><td class='n'>24–45</td></tr>" +
    "<tr><td class='n'>30</td><td class='n'>10–15</td><td class='n'>60–135</td></tr>" +
    "<tr><td class='n'>50</td><td class='n'>17–25</td><td class='n'>100–225</td></tr></table>" +
    "<p>Fond obyektga taqsimlanganda 2–4,5 mln so'm qo'shadi. Bu smetada alohida qator bo'lishi kerak, jihoz narxi ichida yashirilmasligi.</p>" +
    "<p class='ogoh'>Fondga zaryadlash bazasi ham qo'shiladi: isitiladigan xona, zaryadlagichlar va saqlash javonlari. Bu bir martalik umumiy xarajat va u pilotning boshida, birinchi obyektdan oldin qilinadi.</p>",
  ru: { yorliq: "Финансы и право", sarlavha: "Резервный блок: забываемая и решающая строка",
    tana: "<p>Без резервного блока схема ротации не работает. Бригада должна приехать, забрать разряженный блок и оставить заряженный — иначе она вынуждена приезжать второй раз.</p>" +
      "<table><tr><th>Объектов</th><th>Резервных блоков</th><th>Стоимость, млн сум</th></tr>" +
      "<tr><td class='n'>10</td><td class='n'>4–5</td><td class='n'>24–45</td></tr>" +
      "<tr><td class='n'>30</td><td class='n'>10–15</td><td class='n'>60–135</td></tr>" +
      "<tr><td class='n'>50</td><td class='n'>17–25</td><td class='n'>100–225</td></tr></table>" +
      "<p>В пересчёте на объект фонд добавляет 2–4,5 млн сум. Эта строка должна стоять в смете отдельно, а не прятаться внутри цены оборудования.</p>" +
      "<p class='ogoh'>К фонду добавляется и зарядная база: отапливаемое помещение, зарядные устройства и стеллажи хранения. Это разовый общий расход, и его делают в начале пилота, до первого объекта.</p>" }
},

"y04.v-tashrif": {
  yorliq: "Moliya va huquq", sarlavha: "Tashrif narxi: nimadan iborat va qanday o'lchanadi",
  tana: "<p>Bu yechimning besh yillik xarajatidagi asosiy o'zgaruvchi. Uni taxmin qilish emas, o'lchash kerak.</p>" +
    "<table><tr><th>Modda</th><th>Izoh</th></tr>" +
    "<tr><td>Yo'l</td><td>Yoqilg'i va vaqt, marshrut uzunligiga qarab</td></tr>" +
    "<tr><td>Ikki kishining ish vaqti</td><td>Obyektda 20–30 daqiqa, yo'lda ko'proq</td></tr>" +
    "<tr><td>Blokni ko'tarish va almashtirish</td><td>10 daqiqa, agar yo'l tayyor bo'lsa</td></tr>" +
    "<tr><td>Ko'rik va dalolatnoma</td><td>Kadr, mahkamlash, shkaf holati</td></tr></table>" +
    "<p>Bir marshrutda besh-sakkiz obyekt yig'ilsa, yo'l xarajati shu obyektlarga bo'linadi va bitta tashrif narxi uch-to'rt barobar tushadi.</p>" +
    "<p class='ogoh'>Pilotda har chiqish uchun vaqt, masofa va bajarilgan ish yoziladi. Shu ma'lumotsiz 267 obyektning servis byudjetini tuzib bo'lmaydi — taxminiy raqam esa ikki barobargacha xato beradi va butun iqtisodiy asosni buzadi.</p>",
  ru: { yorliq: "Финансы и право", sarlavha: "Стоимость выезда: из чего состоит и как её мерят",
    tana: "<p>Это главная переменная пятилетних затрат в данном решении. Её нужно не оценивать, а измерять.</p>" +
      "<table><tr><th>Статья</th><th>Пояснение</th></tr>" +
      "<tr><td>Дорога</td><td>Топливо и время, по длине маршрута</td></tr>" +
      "<tr><td>Рабочее время двух человек</td><td>На объекте 20–30 минут, в дороге больше</td></tr>" +
      "<tr><td>Подъём и замена блока</td><td>10 минут, если путь подготовлен</td></tr>" +
      "<tr><td>Осмотр и акт</td><td>Кадр, крепления, состояние шкафа</td></tr></table>" +
      "<p>Если в маршрут собрать пять-восемь объектов, дорожные расходы делятся между ними, и стоимость одного выезда падает в три-четыре раза.</p>" +
      "<p class='ogoh'>В пилоте по каждому выезду фиксируют время, расстояние и выполненную работу. Без этих данных сервисный бюджет на 267 объектов не построить, а оценка «на глаз» ошибается вдвое и разрушает всё экономическое обоснование.</p>" }
},

"y04.x-marshrut": {
  yorliq: "Jamoa rahbarlari uchun", sarlavha: "Marshrut kechikdi: nima bo'ladi",
  tana: "<p>Sabab har xil bo'lishi mumkin: yo'l yopiq, brigada band, zaxira blok bo'shatilmagan. Natija bitta — akkumulyator tugaydi va obyekt bir necha kun nazoratsiz qoladi.</p>" +
    "<h4>Uch bosqichli himoya</h4><ol><li><b>Uch kunlik zaxira.</b> Vazifa qolgan kun uchdan kam bo'lganda ochiladi, nolda emas.</li>" +
    "<li><b>Haftalik rejalashtirish.</b> Marshrut dushanba kuni tuziladi va dam olish kunlariga qoldirilmaydi.</li>" +
    "<li><b>Ustuvor chegarasi.</b> Zaryad 15% dan pastga tushsa, obyekt marshrutdan chiqariladi va alohida chiqish tayinlanadi.</li></ol>" +
    "<p class='ogoh'>Eng ko'p uchraydigan amaliy sabab — zaxira blokning zaryadlanmagani. Bazada blok qaytgan zahoti zaryadga qo'yiladi, «keyinroq» qoldirilmaydi. Bazadagi tartib obyektdagi tartibdan kam ahamiyatli emas va u ham servis shartnomasida yoziladi.</p>",
  ru: { yorliq: "Для тимлида", sarlavha: "Маршрут сорвался: что происходит",
    tana: "<p>Причина может быть любой: перекрыта дорога, бригада занята, резервный блок не заряжен. Результат один — аккумулятор садится, и объект несколько дней без контроля.</p>" +
      "<h4>Трёхступенчатая защита</h4><ol><li><b>Трёхдневный запас.</b> Задача открывается при остатке меньше трёх дней, а не на нуле.</li>" +
      "<li><b>Недельное планирование.</b> Маршрут собирают в понедельник и не переносят на выходные.</li>" +
      "<li><b>Приоритетный порог.</b> При заряде ниже 15% объект выводят из маршрута и назначают отдельный выезд.</li></ol>" +
      "<p class='ogoh'>Самая частая практическая причина — незаряженный резервный блок. На базе блок ставят на заряд сразу по возвращении, а не «потом». Порядок на базе важен не меньше, чем порядок на объекте, и его тоже прописывают в сервисном договоре.</p>" }
},

"y04.x-bms": {
  yorliq: "Jamoa rahbarlari uchun", sarlavha: "BMS ma'lumot bermaydi: zaxira yo'l",
  tana: "<p>Uchta sabab bo'lishi mumkin va ular boshqacha hal qilinadi.</p>" +
    "<table><tr><th>Sabab</th><th>Alomat</th><th>Chora</th></tr>" +
    "<tr><td>Registr xaritasi yo'q</td><td>Adapter ulanadi, lekin qiymatlar ma'nosiz</td><td>Yetkazuvchidan hujjat talab qilinadi</td></tr>" +
    "<tr><td>RS-485 shlyuzi ishlamaydi</td><td>Ulanish umuman bo'lmaydi</td><td>Shlyuz almashtiriladi, kabel tekshiriladi</td></tr>" +
    "<tr><td>BMS aloqa portiga ega emas</td><td>Portning o'zi yo'q</td><td>Blok almashtiriladi</td></tr></table>" +
    "<p>Uchinchi holat eng yomoni va u xarid bosqichida oldini olinadi: aloqa porti bor BMS talab qilinadi.</p>" +
    "<p class='ogoh'>Zaxira chora sifatida shkafga kuchlanish o'lchagich qo'yiladi va uning qiymati routerning analog kirishiga ulanadi. U aniq foiz bermaydi, lekin kuchlanish pasayishi blok bo'shayotganini ko'rsatadi. Bu taxminiy, ammo hech narsadan ko'ra yaxshi.</p>",
  ru: { yorliq: "Для тимлида", sarlavha: "BMS не отдаёт данные: запасной путь",
    tana: "<p>Причин может быть три, и решаются они по-разному.</p>" +
      "<table><tr><th>Причина</th><th>Признак</th><th>Мера</th></tr>" +
      "<tr><td>Нет карты регистров</td><td>Адаптер подключается, но значения бессмысленны</td><td>Требовать документ у поставщика</td></tr>" +
      "<tr><td>Не работает шлюз RS-485</td><td>Соединения нет вовсе</td><td>Заменить шлюз, проверить кабель</td></tr>" +
      "<tr><td>У BMS нет порта связи</td><td>Порта физически нет</td><td>Заменить блок</td></tr></table>" +
      "<p>Третий случай худший, и его предотвращают на этапе закупки: требуют BMS с портом связи.</p>" +
      "<p class='ogoh'>В качестве резервной меры в шкаф ставят вольтметр и заводят его значение на аналоговый вход роутера. Точного процента он не даёт, но падение напряжения показывает, что блок разряжается. Это приблизительно, но лучше, чем ничего.</p>" }
},

"y04.x-ogirlik": {
  yorliq: "Montajchi uchun", sarlavha: "Blokni ko'tarib bo'lmaydi: keyin nima qilinadi",
  tana: "<p>Muammo montajdan keyin, birinchi almashtirish kunida ma'lum bo'ladi. Shu paytda shkaf o'rnatilgan, kabel yotqizilgan va obyekt platformada ro'yxatga olingan.</p>" +
    "<h4>Uchta chiqish yo'li</h4><table><tr><th>Yechim</th><th>Narxi</th></tr>" +
    "<tr><td>Blokni ikkita 24 V modulga bo'lish</td><td>Yangi bloklar, eskisi fondga qaytadi</td></tr>" +
    "<tr><td>Shkafni kirishga yaqinroq ko'chirish</td><td>Kabel tarmog'i qayta yotqiziladi</td></tr>" +
    "<tr><td>Yuklamani kamaytirib, sig'imni tushirish</td><td>Nazorat darajasi pasayadi</td></tr></table>" +
    "<p>Uchalasi ham qimmat va uchalasi ham ko'rik bosqichidagi bitta o'lchov bilan oldini olinar edi.</p>" +
    "<p class='ogoh'>Shuning uchun yo'l o'lchovi ko'rik dalolatnomasining majburiy bandi bo'lishi kerak. Bu o'n daqiqalik ish va u birinchi almashtirish kunidagi ikki kunlik qayta montajdan ancha arzon.</p>",
  ru: { yorliq: "Для монтажника", sarlavha: "Блок не поднять: что делать потом",
    tana: "<p>Проблема выясняется после монтажа, в день первой замены. К этому моменту шкаф установлен, кабель проложен, объект зарегистрирован в платформе.</p>" +
      "<h4>Три выхода</h4><table><tr><th>Решение</th><th>Цена</th></tr>" +
      "<tr><td>Разделить блок на два модуля по 24 В</td><td>Новые блоки, старый уходит в фонд</td></tr>" +
      "<tr><td>Перенести шкаф ближе ко входу</td><td>Перекладка кабельной сети</td></tr>" +
      "<tr><td>Снизить нагрузку и уменьшить ёмкость</td><td>Падает уровень контроля</td></tr></table>" +
      "<p>Все три дороги дороги, и все три предотвращались одним замером на этапе осмотра.</p>" +
      "<p class='ogoh'>Поэтому замер пути должен быть обязательным пунктом акта осмотра. Это десять минут работы — и они гораздо дешевле двухдневной переделки в день первой замены.</p>" }
},

"y04.g-ha": {
  yorliq: "Rahbariyat uchun", sarlavha: "Bu yechim qachon tanlanadi",
  tana: "<p>LiFePO4 shkafi ro'yxatdagi eng qimmat va eng imkoniyatli yechim. U ikki holatdan biri bo'lganda tanlanadi.</p>" +
    "<ol><li><b>Quyosh panelini qo'yib bo'lmaydi.</b> Shimoliy tomon, ijaradagi tom, ruxsat berilmagan fasad, ichki xona.</li>" +
    "<li><b>Uzluksiz yozuv haqiqatan kerak.</b> Ya'ni hodisa kliplari yetarli emas va nizoda kerakli soatni topib ko'rish talab qilinadi.</li></ol>" +
    "<p>Bu ikki shartning hech biri bo'lmasa, quyoshli yechim bir necha barobar arzon chiqadi. Shkafni «eng yaxshi variant» sifatida tanlash iqtisodiy xato bo'ladi.</p>" +
    "<h4>Eng mos obyektlar</h4><p>Isitilmaydigan ombor va sovutkichli ombor, ishlab chiqarish sexi, texnika ombori — ya'ni sovuq, qimmat va ichkarida bir necha kamera talab qiladigan joylar.</p>" +
    "<p class='ogoh'>Yana bir shart: obyekt servis marshrutiga tushishi kerak. Uzoqdagi yolg'iz obyektda haftalik tashrif iqtisodiy jihatdan mumkin emas, qancha qimmat bo'lmasin.</p>",
  ru: { yorliq: "Для правления", sarlavha: "Когда выбирают это решение",
    tana: "<p>Шкаф LiFePO4 — самое дорогое и самое возможностное решение в списке. Его выбирают, когда выполняется одно из двух условий.</p>" +
      "<ol><li><b>Солнечную панель поставить негде.</b> Северная сторона, арендованная крыша, фасад без разрешения, внутреннее помещение.</li>" +
      "<li><b>Непрерывная запись действительно нужна.</b> То есть клипов событий недостаточно и в споре требуется найти и посмотреть конкретный час.</li></ol>" +
      "<p>Если ни одно из условий не выполняется, солнечное решение выходит в несколько раз дешевле. Выбирать шкаф как «лучший вариант» — экономическая ошибка.</p>" +
      "<h4>Самые подходящие объекты</h4><p>Неотапливаемые и холодильные склады, производственные цеха, склады техники — то есть места холодные, дорогие и требующие нескольких камер внутри.</p>" +
      "<p class='ogoh'>Есть и второе условие: объект должен попадать в сервисный маршрут. Для удалённого одиночного объекта еженедельный выезд экономически невозможен, каким бы дорогим он ни был.</p>" }
},

"y04.g-yoq": {
  yorliq: "Rahbariyat uchun", sarlavha: "Qaerda shkaf tanlanmaydi",
  tana: "<table><tr><th>Obyekt</th><th>Nega mos emas</th><th>Nima olinadi</th></tr>" +
    "<tr><td>Marshrutdan uzoq yolg'iz obyekt</td><td>Haftalik tashrif iqtisodiy mumkin emas</td><td>Yechim 02</td></tr>" +
    "<tr><td>Kichik qiymatli obyekt</td><td>Nazorat narxi aktiv qiymatiga nomutanosib</td><td>Yechim 05 yoki plomba</td></tr>" +
    "<tr><td>Quyoshga ochiq joy bor</td><td>Quyoshli komplekt bir necha barobar arzon</td><td>Yechim 02 yoki 03</td></tr>" +
    "<tr><td>Shkafgacha yo'l tor yoki zinapoyali</td><td>Blok almashtirish amalda bajarilmaydi</td><td>24 V modul yoki boshqa yechim</td></tr>" +
    "<tr><td>Bir-ikki oyda sotilishi kutilayotgan obyekt</td><td>Montaj va demontaj o'zini oqlamaydi</td><td>Yechim 05 yoki ko'chma komplekt</td></tr></table>" +
    "<p class='ogoh'>Oxirgi qatorga alohida e'tibor: bu yechim uzoq muddatli. Uni qo'yish va olib tashlash ikki kunlik ish va u obyekt tez sotilganda o'zini oqlamaydi. Sotuvga yaqin obyektlarga tez o'rnatiladigan va tez ko'chiriladigan yechim tanlanadi.</p>",
  ru: { yorliq: "Для правления", sarlavha: "Где шкаф не выбирают",
    tana: "<table><tr><th>Объект</th><th>Почему не подходит</th><th>Что берут</th></tr>" +
      "<tr><td>Одиночный объект вдали от маршрута</td><td>Еженедельный выезд экономически невозможен</td><td>Решение 02</td></tr>" +
      "<tr><td>Объект небольшой стоимости</td><td>Цена контроля несоразмерна стоимости актива</td><td>Решение 05 или пломба</td></tr>" +
      "<tr><td>Есть открытое солнцу место</td><td>Солнечный комплект в разы дешевле</td><td>Решение 02 или 03</td></tr>" +
      "<tr><td>Узкий путь или лестница до шкафа</td><td>Замена блока практически невыполнима</td><td>Модули 24 В или другое решение</td></tr>" +
      "<tr><td>Объект планируют продать за месяц-два</td><td>Монтаж и демонтаж себя не оправдают</td><td>Решение 05 или переносной комплект</td></tr></table>" +
      "<p class='ogoh'>Последняя строка требует отдельного внимания: это решение долгосрочное. Установка и демонтаж — два дня работы, и при быстрой продаже они не окупаются. Объектам, близким к продаже, подбирают то, что ставится и переезжает быстро.</p>" }
}

});
