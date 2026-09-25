/* Yechim 02 (Hikvision quyosh-4G) chuqur sahifasidagi batafsil yozuvlari. */
window.MKB_BATAFSIL = window.MKB_BATAFSIL || {};
Object.assign(window.MKB_BATAFSIL, {

"y02.r-panel": {
  yorliq: "Montajchi uchun", sarlavha: "7,4 Vt·soat: hisob va uning chegarasi",
  tana: "<p>Formula qisqa: <code>panel quvvati × insolyatsiya × 0,7</code>. Toshkentda dekabr insolyatsiyasi 1,62 kVt·soat/m² — yillik eng past qiymat.</p>" +
    "<table><tr><th>Oy</th><th>kVt·soat/m²</th><th>6,5 Vt panel beradi</th></tr>" +
    "<tr><td>Dekabr</td><td class='n'>1,62</td><td class='n'>7,4 Vt·soat</td></tr>" +
    "<tr><td>Mart</td><td class='n'>3,57</td><td class='n'>16,2 Vt·soat</td></tr>" +
    "<tr><td>Iyun</td><td class='n'>7,60</td><td class='n'>34,6 Vt·soat</td></tr></table>" +
    "<p>0,7 koeffitsiyenti burchak va yo'nalish yo'qotishini, chang va qorni, kontroller foydali ish koeffitsiyentini hamda kabeldagi tushuvni qamrab oladi.</p>" +
    "<p class='ogoh'>Qalin bulut ostida unum nominalning chorak qismiga tushadi: 1,9 Vt·soat. Bu faqat kutish rejimini qoplaydi, hodisalar esa akkumulyatordan yeb boriladi. Dekabrda Toshkentda shunday kunlar o'ndan ortiq bo'ladi.</p>",
  manba: [["NASA POWER insolyatsiya ma'lumotlari", "https://power.larc.nasa.gov/"]],
  ru: { yorliq: "Для монтажника", sarlavha: "7,4 Вт·ч: расчёт и его границы",
    tana: "<p>Формула короткая: <code>мощность панели × инсоляция × 0,7</code>. Декабрьская инсоляция в Ташкенте — 1,62 кВт·ч/м², минимум года.</p>" +
      "<table><tr><th>Месяц</th><th>кВт·ч/м²</th><th>Панель 6,5 Вт даёт</th></tr>" +
      "<tr><td>Декабрь</td><td class='n'>1,62</td><td class='n'>7,4 Вт·ч</td></tr>" +
      "<tr><td>Март</td><td class='n'>3,57</td><td class='n'>16,2 Вт·ч</td></tr>" +
      "<tr><td>Июнь</td><td class='n'>7,60</td><td class='n'>34,6 Вт·ч</td></tr></table>" +
      "<p>Коэффициент 0,7 закрывает потери на угол и ориентацию, пыль и снег, КПД контроллера и падение на кабеле.</p>" +
      "<p class='ogoh'>Под плотной облачностью выработка падает до четверти номинала — 1,9 Вт·ч. Этого хватает только на дежурный режим, а события съедаются из аккумулятора. В декабре в Ташкенте таких дней больше десяти.</p>" }
},

"y02.r-hodisa": {
  yorliq: "Texnik izoh", sarlavha: "Bir sutkada nechta hodisa ko'tariladi",
  tana: "<p>Hodisaning energiya narxi uning qachon sodir bo'lganiga bog'liq: tunda IR yoritgich yoqiladi va sarf to'rt barobar oshadi.</p>" +
    "<table><tr><th>Hodisa</th><th>Davomiyligi</th><th>Sarf</th></tr>" +
    "<tr><td>Kunduzgi</td><td>≈40 s, 1,85 Vt</td><td class='n'>0,021 Vt·soat</td></tr>" +
    "<tr><td>Tungi, IR bilan</td><td>≈40 s, 7 Vt</td><td class='n'>0,078 Vt·soat</td></tr>" +
    "<tr><td>Zaif signalda uyg'onish</td><td>+20 s tarmoq qidirish</td><td class='n'>+0,03 Vt·soat</td></tr></table>" +
    "<p>Kunlik 5,5 Vt·soatlik faol byudjetdan 40 ta tungi hodisa 3,1 Vt·soat oladi, 0,6 Vt·soat jonli videoga qoladi va 1,8 Vt·soat zaxira bo'lib qoladi.</p>" +
    "<p class='ogoh'>Qirqta hodisa ko'p tuyuladi, lekin bo'sh obyektda bu chegaraga faqat yolg'on signallar yetkazadi: shamolda chayqalgan shox, kadrga tushgan ko'cha chirog'i yoki daraxt soyasi. Kadr chegarasini to'g'ri qo'yish shu sababli energiya masalasi ham hisoblanadi.</p>",
  ru: { yorliq: "Техническая справка", sarlavha: "Сколько событий выдерживают сутки",
    tana: "<p>Энергетическая цена события зависит от времени суток: ночью включается ИК-подсветка и расход растёт вчетверо.</p>" +
      "<table><tr><th>Событие</th><th>Длительность</th><th>Расход</th></tr>" +
      "<tr><td>Дневное</td><td>≈40 с, 1,85 Вт</td><td class='n'>0,021 Вт·ч</td></tr>" +
      "<tr><td>Ночное, с ИК</td><td>≈40 с, 7 Вт</td><td class='n'>0,078 Вт·ч</td></tr>" +
      "<tr><td>Пробуждение при слабом сигнале</td><td>+20 с поиска сети</td><td class='n'>+0,03 Вт·ч</td></tr></table>" +
      "<p>Из дневного активного бюджета в 5,5 Вт·ч сорок ночных событий забирают 3,1 Вт·ч, 0,6 Вт·ч остаётся на живое видео и 1,8 Вт·ч уходит в запас.</p>" +
      "<p class='ogoh'>Сорок событий кажутся большим числом, но на пустом объекте до этого предела доводят именно ложные срабатывания: качающаяся ветка, попавший в кадр фонарь, тень дерева. Поэтому правильные границы кадра — тоже вопрос энергетики.</p>" }
},

"y02.r-sinf": {
  yorliq: "Rahbariyat uchun", sarlavha: "Ikki sinf: nima uchun tanlov shu yerda hal bo'ladi",
  tana: "<p>Ixcham va perimetr sinflari bir xil vazifani bajaradi, lekin ular bir xil iqlim uchun mo'ljallanmagan.</p>" +
    "<table><tr><th></th><th>Ixcham</th><th>Perimetr</th></tr>" +
    "<tr><td>Ishlash</td><td>0…+50 °C</td><td>−20…+60 °C</td></tr>" +
    "<tr><td>Zaryad</td><td>0…+45 °C</td><td>−20…+45 °C</td></tr>" +
    "<tr><td>Panel</td><td>6,5 Vt</td><td>80 Vt</td></tr>" +
    "<tr><td>Akkumulyator</td><td>51 Vt·soat</td><td>360 Vt·soat</td></tr></table>" +
    "<p>Toshkentda dekabr tunlari muntazam 0 °C dan pastga tushadi. Ixcham sinf shunday tunda ishlamaydi va ertasiga zaryad ham qabul qilmaydi — ya'ni bir sovuq to'lqin obyektni bir haftaga ko'r qoldiradi.</p>" +
    "<p class='ogoh'>Ixcham sinf bekor emas: u qishda nolga tushmaydigan yopiq ayvon, ichki hovli va isitiladigan bino devori uchun to'g'ri tanlov. Ochiq perimetr va viloyat nuqtalari uchun esa faqat perimetr sinfi ko'rib chiqiladi.</p>",
  ru: { yorliq: "Для правления", sarlavha: "Два класса: почему выбор решается именно здесь",
    tana: "<p>Компактный и периметровый классы решают одну задачу, но рассчитаны на разный климат.</p>" +
      "<table><tr><th></th><th>Компактный</th><th>Периметровый</th></tr>" +
      "<tr><td>Работа</td><td>0…+50 °C</td><td>−20…+60 °C</td></tr>" +
      "<tr><td>Заряд</td><td>0…+45 °C</td><td>−20…+45 °C</td></tr>" +
      "<tr><td>Панель</td><td>6,5 Вт</td><td>80 Вт</td></tr>" +
      "<tr><td>Аккумулятор</td><td>51 Вт·ч</td><td>360 Вт·ч</td></tr></table>" +
      "<p>Декабрьские ночи в Ташкенте регулярно уходят ниже нуля. Компактный класс в такую ночь не работает, а наутро ещё и не принимает заряд — одна холодная волна ослепляет объект на неделю.</p>" +
      "<p class='ogoh'>Компактный класс не бесполезен: это верный выбор для закрытой веранды, внутреннего двора и стены отапливаемого здания. Для открытого периметра и областных точек рассматривают только периметровый класс.</p>" }
},

"y02.r-narx": {
  yorliq: "Moliya va huquq", sarlavha: "5–9 mln so'mga nima kiradi",
  tana: "<p>Raqam bitta kamerali obyektning kalit topshirish narxi: komplekt, kronshteyn, microSD, montaj va platformada ro'yxatga olish.</p>" +
    "<h4>Kirmaydi</h4><ul><li>perimetr sinfidagi 80 Vt komplekt — u alohida so'raladi va ancha qimmat;</li>" +
    "<li>video domofon va kirish kontrolleri: ular alohida DC zanjirni talab qiladi;</li>" +
    "<li>SIM va trafik — oyiga 50–80 ming so'm;</li>" +
    "<li>ustun va poydevor, agar devorga qo'yish imkoni bo'lmasa.</li></ul>" +
    "<p>Besh yillik jami 10–16 mln so'm. Bu ro'yxatdagi eng past umumiy xarajatlardan biri, chunki obyektga yiliga bir marta boriladi.</p>" +
    "<p class='ogoh'>Narxni solishtirishda «komplekt narxi» emas, «obyekt narxi» olinadi. Ba'zi takliflarda kamera arzon, lekin kronshteyn, akkumulyator va montaj alohida qator bo'lib, jami ikki barobar oshadi.</p>",
  ru: { yorliq: "Финансы и право", sarlavha: "Что входит в 5–9 млн сум",
    tana: "<p>Цифра — стоимость объекта с одной камерой под ключ: комплект, кронштейн, microSD, монтаж и регистрация в платформе.</p>" +
      "<h4>Не входит</h4><ul><li>периметровый комплект на 80 Вт — он запрашивается отдельно и стоит заметно дороже;</li>" +
      "<li>видеодомофон и контроллер доступа: им нужна собственная цепь постоянного тока;</li>" +
      "<li>SIM и трафик — 50–80 тыс. сум в месяц;</li>" +
      "<li>опора и фундамент, если поставить на стену нельзя.</li></ul>" +
      "<p>Итог за пять лет — 10–16 млн сум. Это одна из самых низких сумм в списке, потому что на объект выезжают раз в год.</p>" +
      "<p class='ogoh'>Сравнивают не «цену комплекта», а «цену объекта». В части предложений камера дешёвая, но кронштейн, аккумулятор и монтаж идут отдельными строками, и итог удваивается.</p>" }
},

"y02.k-panel": {
  yorliq: "Montajchi uchun", sarlavha: "6,5 Vt panel nimaga yetadi",
  tana: "<p>Zavod paneli kameraning o'z iste'moli uchun hisoblangan va u yozda haqiqatan yetarli. Dekabrda esa unum besh barobar kamayadi va panel faqat kutish rejimini hamda bir necha o'nlab hodisani qoplaydi.</p>" +
    "<table><tr><th>Sharoit</th><th>Sutkalik unum</th></tr>" +
    "<tr><td>Iyun, ochiq havo</td><td class='n'>34,6 Vt·soat</td></tr>" +
    "<tr><td>Dekabr, ochiq havo</td><td class='n'>7,4 Vt·soat</td></tr>" +
    "<tr><td>Dekabr, qalin bulut</td><td class='n'>1,9 Vt·soat</td></tr>" +
    "<tr><td>Panel chang bosgan</td><td class='n'>−10…25%</td></tr></table>" +
    "<p class='ogoh'>Panelni kattaroq modelga almashtirish odatda mumkin emas: kontroller va korpus zavodda bitta quvvatga hisoblangan. Ko'proq energiya kerak bo'lsa boshqa sinf komplekti olinadi, panel o'zgartirilmaydi.</p>",
  ru: { yorliq: "Для монтажника", sarlavha: "На что хватает панели 6,5 Вт",
    tana: "<p>Заводская панель рассчитана на собственное потребление камеры, и летом её действительно достаточно. В декабре выработка падает впятеро, и панель закрывает только дежурный режим плюс несколько десятков событий.</p>" +
      "<table><tr><th>Условие</th><th>Выработка за сутки</th></tr>" +
      "<tr><td>Июнь, ясно</td><td class='n'>34,6 Вт·ч</td></tr>" +
      "<tr><td>Декабрь, ясно</td><td class='n'>7,4 Вт·ч</td></tr>" +
      "<tr><td>Декабрь, плотная облачность</td><td class='n'>1,9 Вт·ч</td></tr>" +
      "<tr><td>Запылённая панель</td><td class='n'>−10…25%</td></tr></table>" +
      "<p class='ogoh'>Заменить панель на более мощную обычно нельзя: контроллер и корпус рассчитаны на заводскую мощность. Если нужно больше энергии, берут комплект другого класса.</p>" }
},

"y02.k-akb": {
  yorliq: "Texnik izoh", sarlavha: "NMC va LiFePO4: nega bu farq muhim",
  tana: "<p>Ixcham komplektning ichki akkumulyatori NMC kimyosida. U ixcham va yengil, lekin sovuqqa chidamsiz. LiFePO4 esa og'irroq, ammo −20 °C gacha razryad beradi va tsikl resursi bir necha barobar yuqori.</p>" +
    "<table><tr><th></th><th>NMC</th><th>LiFePO4</th></tr>" +
    "<tr><td>Razryad harorati</td><td>0…+50 °C</td><td>−20…+55 °C</td></tr>" +
    "<tr><td>Tsikl resursi</td><td>≈800</td><td>3 000–6 000</td></tr>" +
    "<tr><td>Solishtirma sig'im</td><td>yuqori</td><td>o'rtacha</td></tr></table>" +
    "<p>800 tsikl deganda kameraning har kunlik zaryad-razryad tsikli nazarda tutiladi: bu ikki-uch yil degani. Uchinchi yilda akkumulyator almashtiriladi.</p>" +
    "<p class='ogoh'>Xarid shartida akkumulyatorni alohida sotib olish imkoni tekshiriladi. Ba'zi modellarda u korpusga payvandlangan va almashtirish butun kamerani almashtirish degani — bu besh yillik smetani ikki barobar oshiradi.</p>",
  ru: { yorliq: "Техническая справка", sarlavha: "NMC и LiFePO4: почему разница важна",
    tana: "<p>Внутренний аккумулятор компактного комплекта — NMC. Он лёгкий и компактный, но плохо переносит мороз. LiFePO4 тяжелее, зато разряжается до −20 °C и живёт в несколько раз больше циклов.</p>" +
      "<table><tr><th></th><th>NMC</th><th>LiFePO4</th></tr>" +
      "<tr><td>Температура разряда</td><td>0…+50 °C</td><td>−20…+55 °C</td></tr>" +
      "<tr><td>Ресурс циклов</td><td>≈800</td><td>3 000–6 000</td></tr>" +
      "<tr><td>Удельная ёмкость</td><td>высокая</td><td>средняя</td></tr></table>" +
      "<p>800 циклов — это ежедневный заряд-разряд камеры, то есть два-три года. На третий год аккумулятор меняют.</p>" +
      "<p class='ogoh'>В условиях закупки проверяют, продаётся ли аккумулятор отдельно. В части моделей он приварен к корпусу, и замена означает замену всей камеры — это удваивает пятилетнюю смету.</p>" }
},

"y02.k-harorat": {
  yorliq: "Montajchi uchun", sarlavha: "Harorat chegarasi qanday tekshiriladi",
  tana: "<p>Sotuvchi «−20 °C gacha ishlaydi» desa, bu javob qabul qilinmaydi. Ishlash va zaryad harorati ikki alohida parametr va ular datasheet'da alohida yoziladi.</p>" +
    "<h4>Nima so'raladi</h4><ul><li>rasmiy datasheet, unda <code>Operating temperature</code> va <code>Charging temperature</code> alohida qatorlar;</li>" +
    "<li>akkumulyator kimyosi va uning ishlab chiqaruvchisi;</li>" +
    "<li>xuddi shu iqlimdagi mijoz referensi yoki qishki sinov natijasi.</li></ul>" +
    "<p class='ogoh'>«Sertifikat» degan so'z ko'pincha sotuvchi tomonidan datasheet ma'nosida ishlatiladi. Talab aniq yoziladi: ishlab chiqaruvchining rasmiy hujjatida ikkita alohida harorat oralig'i ko'rsatilgan bo'lishi kerak. Bu bitta gap butun qishki xatarni yopadi.</p>",
  ru: { yorliq: "Для монтажника", sarlavha: "Как проверяют температурный предел",
    tana: "<p>Ответ «работает до −20 °C» не принимается. Температура работы и температура заряда — два разных параметра, и в паспорте они пишутся отдельно.</p>" +
      "<h4>Что запрашивают</h4><ul><li>официальный паспорт, где <code>Operating temperature</code> и <code>Charging temperature</code> — отдельные строки;</li>" +
      "<li>химию аккумулятора и его производителя;</li>" +
      "<li>референс клиента в том же климате или результат зимних испытаний.</li></ul>" +
      "<p class='ogoh'>Словом «сертификат» поставщики часто называют тот же паспорт. Требование формулируют точно: в официальном документе производителя должны быть указаны два отдельных температурных диапазона. Эта одна фраза закрывает весь зимний риск.</p>" }
},

"y02.k-onvif": {
  yorliq: "Jamoa rahbarlari uchun", sarlavha: "ONVIF bormi — bu strategik savol",
  tana: "<p>Ixcham modelda uchinchi tomon protokoli sifatida ISAPI, SDK va ISUP bor, ONVIF esa yo'q. Perimetr sinfida ONVIF Profile S, G va T bor.</p>" +
    "<table><tr><th>Protokol</th><th>Nimani beradi</th></tr>" +
    "<tr><td>ISAPI</td><td>Oqim, hodisa oqimi, holat, sozlama — lekin faqat shu brendda</td></tr>" +
    "<tr><td>ISUP</td><td>Kameraning o'zi chiquvchi ulanish ochadi</td></tr>" +
    "<tr><td>ONVIF S</td><td>Oqim, brenddan mustaqil</td></tr>" +
    "<tr><td>ONVIF G</td><td>Arxivdan yozuv olish</td></tr>" +
    "<tr><td>ONVIF T</td><td>Analitika hodisalari</td></tr></table>" +
    "<p class='ogoh'>ONVIF yo'qligi bugun muammo emas: adapter ISAPI bilan ham ishlaydi. Muammo keyingi tenderda paydo bo'ladi — ONVIF talab qilinmasa, har brend uchun alohida adapter yozishga to'g'ri keladi va bu ishlab chiqish byudjetiga har safar qo'shimcha qator qo'shadi.</p>",
  ru: { yorliq: "Для тимлида", sarlavha: "Есть ли ONVIF — это стратегический вопрос",
    tana: "<p>У компактной модели из сторонних протоколов есть ISAPI, SDK и ISUP, а ONVIF нет. У периметрового класса есть ONVIF Profile S, G и T.</p>" +
      "<table><tr><th>Протокол</th><th>Что даёт</th></tr>" +
      "<tr><td>ISAPI</td><td>Поток, лента событий, состояние, настройки — но только у этого бренда</td></tr>" +
      "<tr><td>ISUP</td><td>Камера сама открывает исходящее соединение</td></tr>" +
      "<tr><td>ONVIF S</td><td>Поток, независимо от бренда</td></tr>" +
      "<tr><td>ONVIF G</td><td>Выгрузка записи из архива</td></tr>" +
      "<tr><td>ONVIF T</td><td>События аналитики</td></tr></table>" +
      "<p class='ogoh'>Отсутствие ONVIF сегодня не проблема: адаптер работает и через ISAPI. Проблема возникнет на следующем тендере — без требования ONVIF под каждый бренд придётся писать отдельный адаптер, и это каждый раз новая строка в бюджете разработки.</p>" }
},

"y02.k-ogoh": {
  yorliq: "Rahbariyat uchun", sarlavha: "Bitta jumla, u bir yillik xatarni yopadi",
  tana: "<p>Texnik shartga quyidagi jumla kiritiladi: <b>ishlash harorati −20 °C dan past bo'lmasin, zaryad harorati datasheet'da alohida ko'rsatilsin, dekabr sharoitida quyoshsiz avtonomiya kamida besh kun bo'lsin.</b></p>" +
    "<h4>Nega aynan shunday</h4><ul><li>«sovuqqa chidamli» degan ta'rif o'lchanmaydi va tenderda himoya qilinmaydi;</li>" +
    "<li>ishlash harorati yozilgan, lekin zaryad harorati yozilmagan komplekt qishda zaryadlanmay qoladi;</li>" +
    "<li>avtonomiya faol rejim uchun o'lchanadi — ikkalasi o'rtasida yetti barobar farq bor.</li></ul>" +
    "<p class='ogoh'>Uchala talabning ham tekshirish usuli yoziladi: rasmiy datasheet, ishlab chiqaruvchi hujjati va pilotdagi birinchi qish jurnali. Tekshirib bo'lmaydigan talab tenderda hech qanday kuchga ega emas.</p>",
  ru: { yorliq: "Для правления", sarlavha: "Одна фраза, которая закрывает годовой риск",
    tana: "<p>В техническое задание вносят формулировку: <b>температура работы не выше −20 °C, температура заряда указана в паспорте отдельной строкой, автономия без солнца в декабрьских условиях — не менее пяти суток.</b></p>" +
      "<h4>Почему именно так</h4><ul><li>определение «морозостойкий» не измеряется и в тендере не защищается;</li>" +
      "<li>комплект с указанной рабочей температурой, но без температуры заряда, зимой просто не зарядится;</li>" +
      "<li>автономию меряют не в дежурном, а в активном режиме — между ними разница в семь раз.</li></ul>" +
      "<p class='ogoh'>Для каждого из трёх требований пишут способ проверки: официальный паспорт, документ производителя и журнал первой зимы в пилоте. Требование, которое нельзя проверить, в тендере не имеет силы.</p>" }
},

"y02.s-kutish": {
  yorliq: "Texnik izoh", sarlavha: "Kutish rejimi: 80 mVt nima qiladi",
  tana: "<p>Kutish rejimida kameraning radiomoduli o'chgan, protsessor esa faqat datchikni kuzatadi. Sarf 80 mVt atrofida — bu bir sutkada 1,9 Vt·soat.</p>" +
    "<h4>Amaliy oqibati</h4><p>Kamera bu holatda tarmoqda yo'q. Platforma unga so'rov yubora olmaydi va holat ma'lumotini ham ola olmaydi: holat hodisa bilan birga keladi.</p>" +
    "<p>Shuning uchun «kamera tirikmi» degan savolga javob boshqa yo'l bilan olinadi: kamera davriy ravishda o'zi uyg'onib, holat xabarini yuboradi. Oraliq sozlanadi va u to'g'ridan-to'g'ri energiyaga ta'sir qiladi.</p>" +
    "<table><tr><th>Xabar oralig'i</th><th>Sutkalik sarf</th></tr>" +
    "<tr><td>Har soatda</td><td class='n'>≈0,5 Vt·soat</td></tr>" +
    "<tr><td>Har olti soatda</td><td class='n'>≈0,08 Vt·soat</td></tr></table>" +
    "<p class='ogoh'>Oraliqni qisqartirish nosozlikni tezroq aniqlash imkonini beradi, lekin dekabrda byudjetning o'ndan birini yeb qo'yadi. Bank uchun olti soatlik oraliq yetarli: obyekt bo'sh turibdi va qaror soatlar bilan o'lchanadi.</p>",
  ru: { yorliq: "Техническая справка", sarlavha: "Дежурный режим: что делают 80 мВт",
    tana: "<p>В дежурном режиме радиомодуль камеры выключен, а процессор только следит за датчиком. Расход около 80 мВт — это 1,9 Вт·ч в сутки.</p>" +
      "<h4>Что это значит на практике</h4><p>В этом состоянии камеры нет в сети. Платформа не может послать ей запрос и не может получить состояние: состояние приходит вместе с событием.</p>" +
      "<p>Поэтому на вопрос «жива ли камера» отвечают иначе: камера сама периодически просыпается и шлёт сообщение о состоянии. Интервал настраивается и напрямую влияет на энергию.</p>" +
      "<table><tr><th>Интервал сообщений</th><th>Расход за сутки</th></tr>" +
      "<tr><td>Каждый час</td><td class='n'>≈0,5 Вт·ч</td></tr>" +
      "<tr><td>Каждые шесть часов</td><td class='n'>≈0,08 Вт·ч</td></tr></table>" +
      "<p class='ogoh'>Более частые сообщения быстрее выявляют сбой, но в декабре съедают десятую часть бюджета. Банку достаточно шестичасового интервала: объект пустует, и решения измеряются часами.</p>" }
},

"y02.s-uygonish": {
  yorliq: "Montajchi uchun", sarlavha: "Uyg'onish: eng qimmat soniyalar",
  tana: "<p>Kamera uyg'onganda modem tarmoqqa qaytadan ro'yxatdan o'tadi. Kuchli signalda bu 8 soniya, zaif signalda 30 soniyagacha davom etadi va shu vaqt ichida modem eng yuqori quvvatda ishlaydi.</p>" +
    "<table><tr><th>RSRP</th><th>Ro'yxatdan o'tish</th><th>Bir hodisaga qo'shimcha</th></tr>" +
    "<tr><td>−85 dBm dan yuqori</td><td>≈8 s</td><td class='n'>—</td></tr>" +
    "<tr><td>−95…−105 dBm</td><td>15–20 s</td><td class='n'>+0,02 Vt·soat</td></tr>" +
    "<tr><td>−105 dBm dan past</td><td>25–30 s</td><td class='n'>+0,03 Vt·soat</td></tr></table>" +
    "<p>Qirqta hodisada bu farq sutkasiga 1,2 Vt·soatga yetadi — kunlik byudjetning oltidan biri, faqat signal zaifligi uchun.</p>" +
    "<p class='ogoh'>Shu sababli tashqi antenna ulanadigan model afzal ko'riladi va antenna signal eng kuchli nuqtaga chiqariladi. Bu montajning eng arzon va eng ko'p foyda beradigan qismi.</p>",
  ru: { yorliq: "Для монтажника", sarlavha: "Пробуждение: самые дорогие секунды",
    tana: "<p>При пробуждении модем заново регистрируется в сети. При сильном сигнале это 8 секунд, при слабом — до 30, и всё это время модем работает на максимальной мощности.</p>" +
      "<table><tr><th>RSRP</th><th>Регистрация</th><th>Надбавка на событие</th></tr>" +
      "<tr><td>выше −85 дБм</td><td>≈8 с</td><td class='n'>—</td></tr>" +
      "<tr><td>−95…−105 дБм</td><td>15–20 с</td><td class='n'>+0,02 Вт·ч</td></tr>" +
      "<tr><td>ниже −105 дБм</td><td>25–30 с</td><td class='n'>+0,03 Вт·ч</td></tr></table>" +
      "<p>На сорока событиях разница доходит до 1,2 Вт·ч в сутки — шестая часть дневного бюджета, и только из-за слабого сигнала.</p>" +
      "<p class='ogoh'>Поэтому предпочитают модель с разъёмом внешней антенны и выносят антенну в точку с лучшим приёмом. Это самая дешёвая и самая выгодная часть монтажа.</p>" }
},

"y02.s-tun": {
  yorliq: "Texnik izoh", sarlavha: "IR yoritgich: to'rt barobar farq",
  tana: "<p>Kunduzgi hodisada kamera 1,85 Vt oladi, tungi hodisada IR yoritgich bilan 7 Vt gacha ko'tariladi. Dekabrda tun 14,6 soat davom etadi va hodisalarning ko'pchiligi aynan shu vaqtga to'g'ri keladi.</p>" +
    "<h4>Sarfni kamaytirish yo'llari</h4><ul><li><b>IR masofasini qisqartirish.</b> Yoritgich quvvati sozlanadi: 30 metrga o'rnatilgan yoritgich 50 metrlikdan ancha kam oladi va kirish nuqtasini yoritish uchun shuning o'zi yetarli.</li>" +
    "<li><b>Oq yorug'lik o'rniga IR.</b> Oq yoritgich rangli tasvir beradi, lekin sezilarli ko'proq energiya oladi va obyektga e'tibor tortadi.</li>" +
    "<li><b>Kadrni qisqartirish.</b> Ko'p hollarda kirish eshigini yoritish kifoya, butun hovlini emas.</li></ul>" +
    "<p class='ogoh'>Sozlashda oddiy qoida bor: tunda tanib bo'ladigan tasvir kerakmi yoki faqat harakat faktimi. Birinchisi uchun yoritgich va energiya kerak; ikkinchisi uchun kameraning o'zi yetarli va byudjet uch barobar tejaladi.</p>",
  ru: { yorliq: "Техническая справка", sarlavha: "ИК-подсветка: разница вчетверо",
    tana: "<p>На дневном событии камера берёт 1,85 Вт, на ночном с ИК-подсветкой — до 7 Вт. В декабре ночь длится 14,6 часа, и большинство событий приходится именно на неё.</p>" +
      "<h4>Чем снижают расход</h4><ul><li><b>Сокращают дальность ИК.</b> Мощность подсветки настраивается: выставленная на 30 метров она берёт заметно меньше, чем на 50, а для освещения входа этого достаточно.</li>" +
      "<li><b>Не включают белый свет.</b> Белая подсветка даёт цветную картинку, но берёт существенно больше энергии и привлекает внимание к объекту.</li>" +
      "<li><b>Сужают кадр.</b> Чаще всего нужно осветить входную дверь, а не весь двор.</li></ul>" +
      "<p class='ogoh'>При настройке работает простое правило: нужна ли ночью узнаваемая картинка или достаточно самого факта движения. В первом случае нужны подсветка и энергия; во втором хватает камеры, а бюджет экономится втрое.</p>" }
},

"y02.s-sovuq": {
  yorliq: "Montajchi uchun", sarlavha: "Sovuqda zaryad to'xtaydi: nima ko'rinadi",
  tana: "<p>Ixcham modelning NMC akkumulyatori 0 °C dan past haroratda zaryad qabul qilmaydi. Kontroller zaryadni to'xtatadi va quyosh chiqqan bo'lsa ham energiya akkumulyatorga kirmaydi.</p>" +
    "<h4>Grafikda qanday ko'rinadi</h4><p>Zaryad darajasi kunduzi ko'tarilmaydi, faqat tekis turadi yoki pasayishda davom etadi. Harorat nolga ko'tarilgan kuni grafik birdan tiklanadi. Bu belgi boshqa hech qanday nosozlikka o'xshamaydi va uni platformadagi harorat grafigi bilan solishtirib darhol tasdiqlash mumkin.</p>" +
    "<p>Amaliy oqibat oddiy: sovuq to'lqin bir necha kun davom etsa, akkumulyator asta-sekin bo'shaydi va kamera o'chadi. Isish boshlanganda u o'zi qaytadi.</p>" +
    "<p class='ogoh'>Bu nosozlik emas, balki jihoz o'z himoyasini ishga tushirgani. Xato montaj bosqichida qilingan: ixcham sinf sovuq joyga qo'yilgan. Uni sozlama bilan tuzatib bo'lmaydi — komplekt almashtiriladi.</p>",
  ru: { yorliq: "Для монтажника", sarlavha: "Мороз останавливает заряд: как это выглядит",
    tana: "<p>NMC-аккумулятор компактной модели не принимает заряд при температуре ниже 0 °C. Контроллер прекращает заряд, и даже на солнце энергия в батарею не идёт.</p>" +
      "<h4>Как это видно на графике</h4><p>Уровень заряда днём не растёт: он держится ровно или продолжает падать. В день, когда температура поднимается выше нуля, график резко восстанавливается. Этот признак не похож ни на какой другой сбой, и его сразу подтверждают, сверив с графиком температуры в платформе.</p>" +
      "<p>Практическое следствие простое: если холодная волна длится несколько дней, аккумулятор постепенно опустошается и камера выключается. С потеплением она возвращается сама.</p>" +
      "<p class='ogoh'>Это не поломка, а сработавшая защита оборудования. Ошибка была сделана на монтаже: компактный класс поставили в мороз. Настройками это не лечится — комплект меняют.</p>" }
},

"y02.q-hodisa": {
  yorliq: "Texnik izoh", sarlavha: "40 ta hodisa: byudjet qanday taqsimlanadi",
  tana: "<p>Kunlik 7,4 Vt·soatdan 1,9 Vt·soat kutishga ketadi, 5,5 Vt·soat esa faol ishga qoladi.</p>" +
    "<table><tr><th>Modda</th><th>Vt·soat</th></tr>" +
    "<tr><td>40 ta tungi hodisa, IR bilan</td><td class='n'>3,1</td></tr>" +
    "<tr><td>Jonli video, 8 daqiqa</td><td class='n'>0,6</td></tr>" +
    "<tr><td>Zaxira</td><td class='n'>1,8</td></tr></table>" +
    "<p>Zaxira bulutli kunlar uchun kerak. Uch kun ketma-ket bulut bo'lsa, akkumulyator 44 Vt·soatlik foydali sig'imining taxminan uchdan birini beradi.</p>" +
    "<p class='ogoh'>Byudjet qat'iy emas: platforma sutkalik hodisa sonini kuzatadi va u o'rtachadan ikki barobar oshsa, sabab qidiriladi. Ko'p hollarda sabab — kadrga tushgan daraxt yoki noto'g'ri qo'yilgan sezgirlik, haqiqiy harakat emas.</p>",
  ru: { yorliq: "Техническая справка", sarlavha: "40 событий: как делится бюджет",
    tana: "<p>Из суточных 7,4 Вт·ч на дежурный режим уходит 1,9 Вт·ч, а 5,5 Вт·ч остаётся на активную работу.</p>" +
      "<table><tr><th>Статья</th><th>Вт·ч</th></tr>" +
      "<tr><td>40 ночных событий с ИК</td><td class='n'>3,1</td></tr>" +
      "<tr><td>Живое видео, 8 минут</td><td class='n'>0,6</td></tr>" +
      "<tr><td>Запас</td><td class='n'>1,8</td></tr></table>" +
      "<p>Запас нужен на пасмурные дни. Три облачных дня подряд забирают примерно треть полезной ёмкости в 44 Вт·ч.</p>" +
      "<p class='ogoh'>Бюджет не жёсткий: платформа следит за числом событий в сутки, и если оно вдвое превышает среднее, ищут причину. Чаще всего это попавшее в кадр дерево или завышенная чувствительность, а не реальное движение.</p>" }
},

"y02.q-iyun": {
  yorliq: "Rahbariyat uchun", sarlavha: "Nega sinov yozda o'tkazilmaydi",
  tana: "<p>Iyunda o'sha panel 34,6 Vt·soat beradi — dekabrdagidan 4,7 barobar ko'p. Yozgi sinovda komplekt hech qanday cheklovni ko'rsatmaydi va butun tizim mukammal ishlayotgandek tuyuladi.</p>" +
    "<h4>Pilotni qanday rejalashtirish kerak</h4><ul><li>Montaj yozda yoki kuzda bajarilishi mumkin, lekin qabul qilish qarori qishdan keyin chiqariladi.</li>" +
    "<li>Dekabr va yanvar oylarida har obyekt bo'yicha akkumulyatorning kunlik eng past zaryadi jurnalga yoziladi.</li>" +
    "<li>Yakuniy hisobotda eng past zaryad 30% dan tushgan obyektlar alohida ro'yxat bo'lib chiqadi: ular panel yoki sinf o'zgartirishni talab qiladi.</li></ul>" +
    "<p class='ogoh'>Agar shartnoma yozgi sinov natijasi bo'yicha imzolansa, bank butun yechimni qishda qaytadan sotib olishga majbur bo'ladi. Pilot muddati kamida bitta to'liq qishni qamrab olishi shart.</p>",
  ru: { yorliq: "Для правления", sarlavha: "Почему испытания не проводят летом",
    tana: "<p>В июне та же панель даёт 34,6 Вт·ч — в 4,7 раза больше, чем в декабре. На летних испытаниях комплект не покажет ни одного ограничения, и вся система будет выглядеть безупречной.</p>" +
      "<h4>Как планировать пилот</h4><ul><li>Монтаж можно выполнить летом или осенью, но решение о приёмке принимают после зимы.</li>" +
      "<li>В декабре и январе по каждому объекту в журнал пишут минимальный суточный заряд аккумулятора.</li>" +
      "<li>В итоговом отчёте объекты, где заряд опускался ниже 30%, выделяют в отдельный список: им нужна замена панели или класса.</li></ul>" +
      "<p class='ogoh'>Если договор подписан по результатам летних испытаний, зимой банку придётся закупать решение заново. Пилот обязан охватить как минимум одну полную зиму.</p>" }
},

"y02.y-isup": {
  yorliq: "Jamoa rahbarlari uchun", sarlavha: "ISUP: pilot uchun eng tez yo'l",
  tana: "<p>ISUP rejimida kameraning o'zi serverga chiquvchi ulanish ochadi va ro'yxatdan o'tadi. Oq IP ham, korporativ APN ham kerak emas — oddiy M2M SIM yetarli.</p>" +
    "<h4>Sozlashda nima kiritiladi</h4><ul><li>server manzili va porti — bank tomonidagi adapter;</li>" +
    "<li>qurilma identifikatori, u reyestrdagi qurilma raqamiga to'g'ri keladi;</li>" +
    "<li>ro'yxatdan o'tish oralig'i va qayta ulanish siyosati.</li></ul>" +
    "<p>Adapter shu kanal orqali oqim so'rovi va hodisalarni oladi. Kamera tomonida hech qanday port ochilmaydi va operator tarmog'ida hech narsa o'zgarmaydi.</p>" +
    "<p class='ogoh'>Sotuvchidan ISUP ning qabul qiluvchi tomoni spetsifikatsiyasi so'raladi. Agar u berilmasa, ISUP faqat ishlab chiqaruvchining o'z platformasi bilan ishlaydi va bu litsenziya hamda alohida server degani.</p>",
  ru: { yorliq: "Для тимлида", sarlavha: "ISUP: самый быстрый путь для пилота",
    tana: "<p>В режиме ISUP камера сама открывает исходящее соединение к серверу и регистрируется. Ни белый IP, ни корпоративный APN не нужны — достаточно обычной M2M SIM.</p>" +
      "<h4>Что вводят при настройке</h4><ul><li>адрес и порт сервера — адаптера на стороне банка;</li>" +
      "<li>идентификатор устройства, совпадающий с номером в реестре;</li>" +
      "<li>интервал регистрации и политику переподключения.</li></ul>" +
      "<p>Через этот же канал адаптер запрашивает поток и получает события. На стороне камеры не открывается ни один порт, а в сети оператора ничего не меняется.</p>" +
      "<p class='ogoh'>У поставщика запрашивают спецификацию приёмной стороны ISUP. Если её не дают, ISUP работает только с платформой производителя — а это лицензия и отдельный сервер.</p>" }
},

"y02.y-apn": {
  yorliq: "Jamoa rahbarlari uchun", sarlavha: "Korporativ APN: yuz obyektdan keyingi qadam",
  tana: "<p>Korporativ APN'da operator SIM-kartalarni bankning yopiq tarmog'iga ulaydi. Kamera 10.x manzil oladi va adapter unga to'g'ridan-to'g'ri murojaat qiladi — ISAPI ham, RTSP ham hech qanday oraliq serversiz ishlaydi.</p>" +
    "<table><tr><th>Ko'rsatkich</th><th>ISUP</th><th>Korporativ APN</th></tr>" +
    "<tr><td>Operator bilan shartnoma</td><td>kerak emas</td><td>kerak</td></tr>" +
    "<tr><td>Oraliq server</td><td>adapter</td><td>yo'q</td></tr>" +
    "<tr><td>RTSP to'g'ridan-to'g'ri</td><td>yo'q</td><td>ha</td></tr>" +
    "<tr><td>Qulay miqyos</td><td>10–100 obyekt</td><td>100+ obyekt</td></tr></table>" +
    "<p>O'zbekistonda operatorlarning M2M va VPN tariflari mavjud: oyiga 10–30 ming so'm oralig'ida, paket hajmiga qarab.</p>" +
    "<p class='ogoh'>APN'ga o'tish qaroridan oldin qamrov masalasi hal qilinadi. Bitta operator butun respublikada bir xil ishlamaydi, ikkinchi operator esa boshqa APN degani — bu ikkita parallel shartnoma va ikkita marshrutlash sxemasi.</p>",
  ru: { yorliq: "Для тимлида", sarlavha: "Корпоративный APN: шаг после сотни объектов",
    tana: "<p>В корпоративном APN оператор включает SIM-карты в закрытую сеть банка. Камера получает адрес 10.x, и адаптер обращается к ней напрямую — ISAPI и RTSP работают без промежуточного сервера.</p>" +
      "<table><tr><th>Параметр</th><th>ISUP</th><th>Корпоративный APN</th></tr>" +
      "<tr><td>Договор с оператором</td><td>не нужен</td><td>нужен</td></tr>" +
      "<tr><td>Промежуточный сервер</td><td>адаптер</td><td>нет</td></tr>" +
      "<tr><td>RTSP напрямую</td><td>нет</td><td>да</td></tr>" +
      "<tr><td>Удобный масштаб</td><td>10–100 объектов</td><td>100+ объектов</td></tr></table>" +
      "<p>У операторов Узбекистана есть тарифы M2M и VPN: в диапазоне 10–30 тыс. сум в месяц в зависимости от объёма пакета.</p>" +
      "<p class='ogoh'>До решения о переходе на APN закрывают вопрос покрытия. Один оператор не работает одинаково по всей стране, а второй оператор — это второй APN, то есть два параллельных договора и две схемы маршрутизации.</p>" }
},

"y02.y-adapter": {
  yorliq: "Jamoa rahbarlari uchun", sarlavha: "Adapter: uzilish, qayta ulanish, vaqt",
  tana: "<p>Adapter bitta uzun HTTP ulanishni ochiq ushlab turadi va hodisalarni multipart oqim sifatida oladi. Ulanish uzilishi normal holat: 4G tarmog'ida bu kuniga bir necha marta sodir bo'ladi.</p>" +
    "<h4>Qayta ulanish</h4><p>5, 15 va 60 soniyalik oraliqlar bilan qayta urinadi. Uch urinish ham natija bermasa, obyekt bo'yicha <code>aloqa_yoq</code> hodisasi ochiladi va uzilish oralig'i kamera holati sifatida yoziladi.</p>" +
    "<h4>Kechikib kelgan hodisalar</h4><p>Aloqa tiklangach adapter uzilish oralig'idagi hodisalar ro'yxatini so'raydi va klipni microSD'dan oladi. Hodisa platformaga asl vaqti bilan, «kechikib keldi» belgisi bilan yoziladi.</p>" +
    "<p class='ogoh'>Uyqu rejimidagi kamera so'rovga darhol javob bermaydi. Adapterdagi kutish vaqti kamida 20 soniya qo'yiladi; odatiy besh soniyalik timeout bilan har so'rov nosozlik sifatida qayd etiladi va operator ishonchni yo'qotadi.</p>",
  ru: { yorliq: "Для тимлида", sarlavha: "Адаптер: обрыв, переподключение, время",
    tana: "<p>Адаптер держит открытым одно длинное HTTP-соединение и получает события как multipart-поток. Обрыв соединения — нормальное состояние: в сети 4G это происходит несколько раз в сутки.</p>" +
      "<h4>Переподключение</h4><p>Повтор идёт через 5, 15 и 60 секунд. Если и третья попытка неудачна, по объекту открывается событие <code>aloqa_yoq</code>, а интервал обрыва записывается как состояние камеры.</p>" +
      "<h4>Опоздавшие события</h4><p>После восстановления связи адаптер запрашивает список событий за время обрыва и забирает клипы с microSD. Событие записывается в платформу с исходным временем и отметкой «пришло с опозданием».</p>" +
      "<p class='ogoh'>Спящая камера не отвечает на запрос мгновенно. Тайм-аут в адаптере ставят не меньше 20 секунд; с привычными пятью каждый запрос фиксируется как сбой, и оператор перестаёт доверять системе.</p>" }
},

"y02.p-oqim": {
  yorliq: "Jamoa rahbarlari uchun", sarlavha: "Qaysi oqim qachon ochiladi",
  tana: "<p>Asosiy oqim 2560×1440, 50 Hz tarmoq chastotasida 12,5 kadr/s beradi. Qo'shimcha oqim 1280×720 gacha.</p>" +
    "<table><tr><th>Holat</th><th>Oqim</th><th>Trafik</th></tr>" +
    "<tr><td>Panelda ko'rish</td><td>qo'shimcha</td><td class='n'>1–2 Mbit/s</td></tr>" +
    "<tr><td>Kattalashtirish</td><td>asosiy</td><td class='n'>4–6 Mbit/s</td></tr>" +
    "<tr><td>Hodisa klipi</td><td>asosiy, qisqa</td><td class='n'>10–20 MB</td></tr></table>" +
    "<p>Har doim qo'shimcha oqim ochiladi. Asosiysi faqat operator tafsilotni ko'rishi kerak bo'lganda so'raladi — bu 4G trafigini ham, akkumulyatorni ham tejaydi.</p>" +
    "<p class='ogoh'>12,5 kadr/s odatiy 25 kadr/s dan past va harakat biroz uzuq ko'rinadi. Bu nosozlik emas: kamera energiyani ataylab tejaydi. Operatorlarni o'qitishda buni oldindan aytish kerak, aks holda birinchi haftada «video buzuq» degan shikoyat keladi.</p>",
  ru: { yorliq: "Для тимлида", sarlavha: "Какой поток и когда открывают",
    tana: "<p>Основной поток даёт 2560×1440 при 12,5 кадра в секунду на частоте сети 50 Гц. Дополнительный — до 1280×720.</p>" +
      "<table><tr><th>Ситуация</th><th>Поток</th><th>Трафик</th></tr>" +
      "<tr><td>Просмотр на панели</td><td>дополнительный</td><td class='n'>1–2 Мбит/с</td></tr>" +
      "<tr><td>Увеличение</td><td>основной</td><td class='n'>4–6 Мбит/с</td></tr>" +
      "<tr><td>Клип события</td><td>основной, короткий</td><td class='n'>10–20 МБ</td></tr></table>" +
      "<p>По умолчанию всегда открывается дополнительный поток. Основной запрашивают, только когда оператору нужны детали, — так экономятся и трафик 4G, и заряд.</p>" +
      "<p class='ogoh'>12,5 кадра в секунду ниже привычных 25, и движение выглядит слегка рваным. Это не дефект: камера намеренно экономит энергию. На обучении операторов об этом говорят заранее, иначе на первой неделе поступит жалоба «видео битое».</p>" }
},

"y02.p-hodisa": {
  yorliq: "Jamoa rahbarlari uchun", sarlavha: "alertStream: XML bo'lagi va yagona format",
  tana: "<p>Adapter <code>alertStream</code> kanalini ochiq ushlab turadi. Har hodisa XML bo'lagi bo'lib keladi va adapter uni yagona sxemaga keltiradi.</p>" +
    "<h4>Kamera beradigan maydonlar</h4><ul><li><code>eventType</code> — hodisa turi: VMD, linedetection, fielddetection, tamperdetection;</li>" +
    "<li><code>dateTime</code> — kamera vaqti, mahalliy zona bilan;</li>" +
    "<li><code>channelID</code> — kanal raqami;</li>" +
    "<li><code>activePostCount</code> — hodisa takrorlanish hisobi.</li></ul>" +
    "<h4>Adapter qo'shadigan maydonlar</h4><p>Obyekt identifikatori reyestrdan olinadi, qurilmadan emas. Klip havolasi ombordagi kalit sifatida yoziladi, sha256 xeshi qabul paytida hisoblanadi.</p>" +
    "<p class='ogoh'><code>activePostCount</code> maydoniga e'tibor bering: kamera bitta uzoq davom etgan harakatni o'nlab xabar bilan takrorlashi mumkin. Adapter ularni 10 soniyalik oyna ichida bitta hodisaga birlashtiradi, aks holda operator ekrani bir voqeadan yuzlab yozuv bilan to'lib ketadi.</p>",
  ru: { yorliq: "Для тимлида", sarlavha: "alertStream: фрагмент XML и единый формат",
    tana: "<p>Адаптер держит открытым канал <code>alertStream</code>. Каждое событие приходит фрагментом XML, и адаптер приводит его к единой схеме.</p>" +
      "<h4>Поля, которые даёт камера</h4><ul><li><code>eventType</code> — тип события: VMD, linedetection, fielddetection, tamperdetection;</li>" +
      "<li><code>dateTime</code> — время камеры с местной зоной;</li>" +
      "<li><code>channelID</code> — номер канала;</li>" +
      "<li><code>activePostCount</code> — счётчик повторов события.</li></ul>" +
      "<h4>Поля, которые добавляет адаптер</h4><p>Идентификатор объекта берётся из реестра. Ссылка на клип пишется как ключ в хранилище, хеш sha256 считается при приёме.</p>" +
      "<p class='ogoh'>Обратите внимание на <code>activePostCount</code>: камера может повторить одно длящееся движение десятками сообщений. Адаптер склеивает их в одно событие в окне 10 секунд — иначе экран оператора заполнят сотни записей об одном и том же.</p>" }
},

"y02.p-uyqu": {
  yorliq: "Texnik izoh", sarlavha: "Birinchi soniyalar: kechikishni qanday qisqartirish",
  tana: "<p>Uyqu rejimida yozuv kamera uyg'ongandan keyin boshlanadi. Demak hodisaning birinchi bir-ikki soniyasi klipga tushmaydi va ba'zan aynan shu soniyalarda odamning yuzi ko'rinadi.</p>" +
    "<h4>Nima yordam beradi</h4><ul><li><b>Radar datchigi.</b> PIR dan oldinroq ishlaydi va uyg'onishni bir necha yuz millisekundga tezlashtiradi.</li>" +
    "<li><b>Kadr geometriyasi.</b> Kamera kirish nuqtasiga olib boradigan yo'lakning boshiga qaratiladi: odam kadrga kirganda kamera allaqachon yozayotgan bo'ladi.</li>" +
    "<li><b>Ikkinchi kamera.</b> Qimmat obyektda ikkinchi kamera birinchisining ko'r vaqtini yopadi.</li></ul>" +
    "<p class='ogoh'>Kechikishni nolga tushirib bo'lmaydi va buni loyiha hujjatida ochiq yozish kerak. Aks holda birinchi jiddiy hodisadan keyin «kamera ishlamadi» degan xulosa chiqariladi, holbuki kamera aynan mo'ljallanganidek ishlagan.</p>",
  ru: { yorliq: "Техническая справка", sarlavha: "Первые секунды: как сократить задержку",
    tana: "<p>В спящем режиме запись начинается после пробуждения. Значит, первые одна-две секунды события в клип не попадают — а иногда именно в эти секунды видно лицо.</p>" +
      "<h4>Что помогает</h4><ul><li><b>Радарный датчик.</b> Срабатывает раньше PIR и ускоряет пробуждение на несколько сотен миллисекунд.</li>" +
      "<li><b>Геометрия кадра.</b> Камеру направляют не на сам вход, а на начало ведущего к нему прохода: когда человек входит в кадр, камера уже пишет.</li>" +
      "<li><b>Вторая камера.</b> На дорогом объекте она закрывает слепое время первой.</li></ul>" +
      "<p class='ogoh'>Свести задержку к нулю нельзя, и это нужно прямо написать в проектной документации. Иначе после первого серьёзного происшествия сделают вывод «камера не сработала», хотя камера отработала ровно так, как задумано.</p>" }
},

"y02.o-jadval": {
  yorliq: "Jamoa rahbarlari uchun", sarlavha: "Yozuv jadvali: byudjetni boshqarish vositasi",
  tana: "<p>Kameraning sezgirligi, IR masofasi va faol soatlari masofadan o'zgartiriladi. Bu quvvat byudjetini boshqarishning yagona operativ vositasi: panelni almashtirish uchun obyektga borish kerak, jadvalni o'zgartirish uchun esa emas.</p>" +
    "<table><tr><th>Sozlama</th><th>Ta'siri</th></tr>" +
    "<tr><td>Sezgirlikni pasaytirish</td><td>Yolg'on hodisalar kamayadi, byudjet bo'shaydi</td></tr>" +
    "<tr><td>IR masofasini qisqartirish</td><td>Tungi hodisa narxi 30–40% tushadi</td></tr>" +
    "<tr><td>Faol soatlarni cheklash</td><td>Kunduzgi hodisalar yozilmaydi</td></tr>" +
    "<tr><td>Hodisa klipini qisqartirish</td><td>40 s o'rniga 20 s — sarf yarmiga tushadi</td></tr></table>" +
    "<p class='ogoh'>Har o'zgarish jurnalga yoziladi: kim, qachon va nima uchun. Bu muhim, chunki hodisa bo'lganda birinchi savol «kamera nima uchun yozmadi» bo'ladi va javob shu jurnalda turadi.</p>",
  ru: { yorliq: "Для тимлида", sarlavha: "Расписание записи: инструмент управления бюджетом",
    tana: "<p>Чувствительность, дальность ИК и активные часы меняются дистанционно. Это единственный оперативный способ управлять энергобюджетом: чтобы заменить панель, нужно ехать на объект, а чтобы изменить расписание — нет.</p>" +
      "<table><tr><th>Настройка</th><th>Эффект</th></tr>" +
      "<tr><td>Снизить чувствительность</td><td>Меньше ложных событий, бюджет освобождается</td></tr>" +
      "<tr><td>Сократить дальность ИК</td><td>Цена ночного события падает на 30–40%</td></tr>" +
      "<tr><td>Ограничить активные часы</td><td>Дневные события не записываются</td></tr>" +
      "<tr><td>Укоротить клип события</td><td>20 с вместо 40 — расход вдвое меньше</td></tr></table>" +
      "<p class='ogoh'>Каждое изменение пишется в журнал: кто, когда и зачем. Это важно, потому что после происшествия первый вопрос будет «почему камера не записала», и ответ лежит именно в этом журнале.</p>" }
},

"y02.m-balandlik": {
  yorliq: "Montajchi uchun", sarlavha: "Balandlik: o'g'irlik va servis orasidagi tanlov",
  tana: "<p>3,5 metrdan past qo'yilgan komplekt narvonsiz olinadi. 4,5 metrdan baland esa har servis tashrifida ko'targich yoki uzun narvon talab qiladi va bu tashrif narxini ikki barobar oshiradi.</p>" +
    "<table><tr><th>Balandlik</th><th>O'g'irlik xatari</th><th>Servis</th></tr>" +
    "<tr><td>2,5–3,0 m</td><td>yuqori</td><td>oson</td></tr>" +
    "<tr><td>3,5–4,5 m</td><td>o'rtacha</td><td>narvon bilan</td></tr>" +
    "<tr><td>5 m dan baland</td><td>past</td><td>ko'targich kerak</td></tr></table>" +
    "<h4>Mahkamlash</h4><p>Kronshteyn ankerga o'rnatiladi, dyubel yetmaydi: komplekt og'irligi 5–8 kg va unga panelning shamol yuki qo'shiladi. Anti-vandal boltlar ishlatiladi, korpusga MKB belgisi va seriya raqami tushiriladi.</p>" +
    "<p class='ogoh'>Obyekt sotilgach komplekt ko'chiriladi. Shuning uchun mahkamlash demontaj qilinadigan bo'lishi kerak: payvand emas, boltli birikma.</p>",
  ru: { yorliq: "Для монтажника", sarlavha: "Высота: выбор между кражей и сервисом",
    tana: "<p>Комплект ниже 3,5 метра снимают без лестницы. Выше 4,5 метра каждый сервисный выезд требует подъёмника или длинной лестницы, и стоимость выезда удваивается.</p>" +
      "<table><tr><th>Высота</th><th>Риск кражи</th><th>Сервис</th></tr>" +
      "<tr><td>2,5–3,0 м</td><td>высокий</td><td>просто</td></tr>" +
      "<tr><td>3,5–4,5 м</td><td>средний</td><td>с лестницей</td></tr>" +
      "<tr><td>выше 5 м</td><td>низкий</td><td>нужен подъёмник</td></tr></table>" +
      "<h4>Крепление</h4><p>Кронштейн ставят на анкер, дюбеля недостаточно: комплект весит 5–8 кг, а сверху добавляется ветровая нагрузка панели. Используют антивандальные болты, на корпус наносят знак MKBANK и серийный номер.</p>" +
      "<p class='ogoh'>После продажи объекта комплект переезжает. Поэтому крепление должно разбираться: болтовое соединение, а не сварка.</p>" }
},

"y02.m-panel": {
  yorliq: "Montajchi uchun", sarlavha: "Panel burchagi va soya",
  tana: "<p>Toshkentda 21-dekabrda quyosh peshinda ufqdan 25,3° ko'tariladi. Yillik optimal 30–35° qiyalikka qo'yilgan panel dekabrda nurni juda qiya qabul qiladi.</p>" +
    "<table><tr><th>Qiyalik</th><th>Dekabrdagi unum</th></tr>" +
    "<tr><td>30° (yillik optimal)</td><td>asos</td></tr>" +
    "<tr><td>55–60° (qishki optimal)</td><td>+20…25%</td></tr></table>" +
    "<h4>Soya</h4><p>Panel ichidagi hujayralar ketma-ket ulangan. Shuning uchun bitta simning yoki shoxning soyasi butun panel quvvatini uchdan biriga tushirishi mumkin — soyalangan yuza qanchalik kichik bo'lishidan qat'i nazar.</p>" +
    "<p class='ogoh'>Joyni tanlashda qish quyoshining past yo'liga qaraladi, yoz soyasiga emas. Yozda soya bermaydigan devor yoki daraxt dekabrda kun bo'yi soya beradi: quyosh past yuradi va soyalar uzun bo'ladi.</p>",
  ru: { yorliq: "Для монтажника", sarlavha: "Угол панели и тень",
    tana: "<p>21 декабря в Ташкенте солнце в полдень поднимается на 25,3°. Панель под годовым оптимумом 30–35° принимает декабрьский свет под очень скользящим углом.</p>" +
      "<table><tr><th>Наклон</th><th>Выработка в декабре</th></tr>" +
      "<tr><td>30° (годовой оптимум)</td><td>база</td></tr>" +
      "<tr><td>55–60° (зимний оптимум)</td><td>+20…25%</td></tr></table>" +
      "<h4>Тень</h4><p>Ячейки внутри панели соединены последовательно. Поэтому тень от одного провода или ветки способна уронить мощность всей панели до трети — независимо от того, насколько мала затенённая площадь.</p>" +
      "<p class='ogoh'>Место выбирают по низкой зимней траектории солнца. Стена или дерево, которые летом не мешают, в декабре дают тень весь день: солнце идёт низко, и тени длинные.</p>" }
},

"y02.m-signal": {
  yorliq: "Montajchi uchun", sarlavha: "Signal o'lchovi: ikki operator, ikkita raqam",
  tana: "<p>O'lchov SIM solinishidan oldin, kamera o'rnatiladigan aniq nuqtada bajariladi. Ikki ko'rsatkich yoziladi: RSRP (signal kuchi) va SINR (signal-shovqin nisbati).</p>" +
    "<table><tr><th>RSRP</th><th>Holat</th></tr>" +
    "<tr><td>−85 dBm dan yuqori</td><td>Yaxshi: uyg'onish tez, sarf minimal</td></tr>" +
    "<tr><td>−85…−105 dBm</td><td>Ishlaydi, uyg'onish sekinroq</td></tr>" +
    "<tr><td>−105 dBm dan past</td><td>Tashqi antenna yoki boshqa joy kerak</td></tr></table>" +
    "<p>Ikkala operator uchun ham o'lchanadi va kuchliroqi asosiy SIM sifatida qo'yiladi. Natija dalolatnomaga yoziladi: bu raqam keyinchalik quvvat masalasini tekshirishda birinchi bo'lib ko'riladi.</p>" +
    "<p class='ogoh'>SINR ni unutmang. RSRP yaxshi, lekin SINR past bo'lgan joyda (masalan, bazaviy stansiyalar chegarasida) tezlik past bo'ladi va klip yuborish uzoq davom etadi — ya'ni energiya sarfi oshadi.</p>",
  ru: { yorliq: "Для монтажника", sarlavha: "Замер сигнала: два оператора, два числа",
    tana: "<p>Замер делают до установки SIM, в той самой точке, где встанет камера. Записывают два показателя: RSRP (уровень сигнала) и SINR (отношение сигнал-шум).</p>" +
      "<table><tr><th>RSRP</th><th>Состояние</th></tr>" +
      "<tr><td>выше −85 дБм</td><td>Хорошо: быстрое пробуждение, минимальный расход</td></tr>" +
      "<tr><td>−85…−105 дБм</td><td>Работает, пробуждение медленнее</td></tr>" +
      "<tr><td>ниже −105 дБм</td><td>Нужна внешняя антенна или другое место</td></tr></table>" +
      "<p>Меряют по обоим операторам, сильнейшего ставят основной SIM. Результат вносят в акт: именно к этой цифре возвращаются первой, когда разбирают проблему с энергией.</p>" +
      "<p class='ogoh'>Не забывайте про SINR. Там, где RSRP хороший, а SINR низкий (например, на стыке базовых станций), скорость падает и отправка клипа затягивается — то есть расход энергии растёт.</p>" }
},

"y02.n-sinf": {
  yorliq: "Moliya va huquq", sarlavha: "Narxni ishlagan kunlar bilan solishtirish",
  tana: "<p>Ikki sinfni narx bo'yicha solishtirish noto'g'ri xulosaga olib keladi. To'g'ri ko'rsatkich — bir yilda nechta kun ishlagani.</p>" +
    "<table><tr><th></th><th>Ixcham</th><th>Perimetr</th></tr>" +
    "<tr><td>Obyekt narxi</td><td>5–9 mln so'm</td><td>ancha yuqori</td></tr>" +
    "<tr><td>Ochiq joyda qishki ish</td><td>cheklangan</td><td>to'liq</td></tr>" +
    "<tr><td>Quyoshsiz, faol rejim</td><td>1,5 kun</td><td>8 kun</td></tr></table>" +
    "<p>Dekabr va yanvarda ixcham sinf ochiq joyda ishlamaydi. Ya'ni u yilning eng xatarli ikki oyida yo'q — aynan o'sha paytda obyektlar bo'sh, kunlar qisqa va xatar eng yuqori.</p>" +
    "<p class='ogoh'>Moliya uchun bu oddiy hisob: ishlamagan oylarni hisobga olsak, arzon komplektning bir kunlik narxi qimmatnikidan yuqori chiqadi. Solishtirishni shu ko'rinishda tayyorlash kerak, shunda qaror texnik bahsga aylanmaydi.</p>",
  ru: { yorliq: "Финансы и право", sarlavha: "Сравнивать цену нужно по отработанным дням",
    tana: "<p>Сравнение двух классов по цене ведёт к неверному выводу. Правильный показатель — сколько дней в году комплект действительно работал.</p>" +
      "<table><tr><th></th><th>Компактный</th><th>Периметровый</th></tr>" +
      "<tr><td>Цена объекта</td><td>5–9 млн сум</td><td>заметно выше</td></tr>" +
      "<tr><td>Зимняя работа на улице</td><td>ограниченно</td><td>полностью</td></tr>" +
      "<tr><td>Без солнца, активный режим</td><td>1,5 дн.</td><td>8 дн.</td></tr></table>" +
      "<p>В декабре и январе компактный класс на улице не работает. То есть его нет в два самых рискованных месяца года — как раз тогда, когда объекты пустуют, дни короткие, а риск максимален.</p>" +
      "<p class='ogoh'>Для финансов это простой расчёт: с учётом неотработанных месяцев день дешёвого комплекта выходит дороже дня дорогого. Сравнение готовят именно в таком виде — тогда решение не превращается в технический спор.</p>" }
},

"y02.b-distr": {
  yorliq: "Moliya va huquq", sarlavha: "Rasmiy kanal: nima so'raladi",
  tana: "<p>Hikvision'ning O'zbekistonda rasmiy distribyutori bor va bu Yechim 01 ga nisbatan katta afzallik: kafolat, hujjat va xizmat markazi rasmiy kanalda ishlaydi.</p>" +
    "<p>Ammo distribyutor katalogida quyosh va 4G liniyasi ko'rsatilmagan. Shuning uchun birinchi savol tijoriy bo'ladi.</p>" +
    "<h4>Yozma so'raladi</h4><ul><li>bu liniyani rasmiy olib kela olasizmi va qancha muddatda;</li>" +
    "<li>kafolat muddati va nosoz jihozni almashtirish tartibi;</li>" +
    "<li>zaxira qismlar: akkumulyator, panel, kronshteyn alohida sotiladimi;</li>" +
    "<li>O'zbekiston uchun 4G chastotalari ro'yxati.</li></ul>" +
    "<p class='ogoh'>Agar rasmiy kanal bu liniyani olib kela olmasa, jihoz Yechim 01 dagi kabi kulrang import orqali keladi va kafolat sotuvchining zimmasida qoladi. U holda ikki brendni solishtirishning ma'nosi yo'qoladi — shartlar teng bo'lmaydi.</p>",
  manba: [["uzhikvision.uz", "https://uzhikvision.uz/en/"]],
  ru: { yorliq: "Финансы и право", sarlavha: "Официальный канал: что запрашивают",
    tana: "<p>У Hikvision есть официальный дистрибьютор в Узбекистане, и это серьёзное преимущество перед решением 01: гарантия, документы и сервисный центр работают в официальном канале.</p>" +
      "<p>Но солнечно-4G линейка в каталоге дистрибьютора не указана. Поэтому первый вопрос не технический, а коммерческий.</p>" +
      "<h4>Запрашивают письменно</h4><ul><li>можете ли вы официально ввезти эту линейку и в какой срок;</li>" +
      "<li>срок гарантии и порядок замены неисправного оборудования;</li>" +
      "<li>продаются ли отдельно запчасти: аккумулятор, панель, кронштейн;</li>" +
      "<li>перечень частот 4G для Узбекистана.</li></ul>" +
      "<p class='ogoh'>Если официальный канал ввезти линейку не может, оборудование придёт серым импортом, как в решении 01, и гарантия ляжет на продавца. Тогда сравнение двух брендов теряет смысл — условия окажутся неравными.</p>" }
},

"y02.x-energiya": {
  yorliq: "Jamoa rahbarlari uchun", sarlavha: "Byudjet tugadi: alomatlar va choralar",
  tana: "<h4>Qanday ko'rinadi</h4><p>Kamera oflayn bo'lmaydi va xato bermaydi. U shunchaki kamroq hodisa yuboradi, keyin esa umuman yubormay qo'yadi. Platformada bu «obyekt tinch» degan ko'rinishni beradi — eng xavfli holat.</p>" +
    "<h4>Qanday aniqlanadi</h4><ul><li>zaryadning kunlik eng past qiymati kuzatiladi va grafikka yoziladi;</li>" +
    "<li>sutkalik hodisa soni o'rtachadan keskin kamaysa, ogohlantirish beriladi;</li>" +
    "<li>davriy holat xabari kelmasa, «aloqa yo'q» hodisasi ochiladi.</li></ul>" +
    "<h4>Nima qilinadi</h4><p>Birinchi navbatda jadval o'zgartiriladi: IR masofasi qisqartiriladi, faol soatlar cheklanadi. Bu masofadan bajariladi va darhol ta'sir qiladi. Uch kun ketma-ket zaryad 40% dan pastga tushsa, obyekt panel kattalashtirish yoki sinf almashtirish ro'yxatiga kiritiladi.</p>" +
    "<p class='ogoh'>«Hodisa yo'q» va «hodisa yuborilmayapti» — ikki boshqa holat va ularni ajratish tizimning asosiy vazifalaridan biri. Shu sababli davriy holat xabari o'chirilmaydi, u qancha energiya olmasin.</p>",
  ru: { yorliq: "Для тимлида", sarlavha: "Бюджет исчерпан: признаки и меры",
    tana: "<h4>Как это выглядит</h4><p>Камера не уходит в офлайн и не выдаёт ошибок. Она просто присылает меньше событий, а потом перестаёт присылать совсем. В платформе это читается как «на объекте спокойно» — самое опасное состояние.</p>" +
      "<h4>Как это ловят</h4><ul><li>следят за минимальным суточным зарядом и ведут по нему график;</li>" +
      "<li>если число событий за сутки резко падает ниже среднего, выдаётся предупреждение;</li>" +
      "<li>если не пришло периодическое сообщение о состоянии, открывается событие «нет связи».</li></ul>" +
      "<h4>Что делают</h4><p>Сначала меняют расписание: сокращают дальность ИК, ограничивают активные часы. Это делается дистанционно и действует сразу. Если заряд три дня подряд опускается ниже 40%, объект попадает в список на увеличение панели или смену класса.</p>" +
      "<p class='ogoh'>«Событий нет» и «события не отправляются» — два разных состояния, и различать их — одна из главных задач системы. Поэтому периодическое сообщение о состоянии не отключают, сколько бы энергии оно ни стоило.</p>" }
},

"y02.x-zaryad": {
  yorliq: "Moliya va huquq", sarlavha: "Sovuqdagi zaryad: shartnomaga nima yoziladi",
  tana: "<p>Talab quyidagicha yoziladi: <b>komplekt 0 °C dan past haroratda zaryadni avtomatik to'xtatishi yoki akkumulyatorni oldindan isitishi shart; ishlash harorati −20 °C dan past bo'lmasin; ikkala oraliq ishlab chiqaruvchining rasmiy datasheet'ida alohida ko'rsatilgan bo'lsin.</b></p>" +
    "<h4>Nega bu shunchalik muhim</h4><p>Litiy akkumulyatorni sovuqda zaryadlash anodda metall litiy cho'ktiradi. Sig'im qaytarib bo'lmaydigan darajada yo'qoladi, eng yomon holatda ichki qisqa tutashuv bo'ladi. Jarayon ko'rinmaydi: akkumulyator tashqi tomondan butun bo'lib turadi, lekin bahorda sig'imining yarmini bermaydi.</p>" +
    "<p class='ogoh'>267 obyektda bu xato butun akkumulyator parkini bir qishda yo'qotish degani. Shuning uchun band tender shartining majburiy qismiga kiritiladi va uning bajarilishi pilotning birinchi qishida jurnal bo'yicha tekshiriladi.</p>",
  ru: { yorliq: "Финансы и право", sarlavha: "Заряд на морозе: что пишут в договор",
    tana: "<p>Формулировка такая: <b>комплект обязан автоматически прекращать заряд при температуре ниже 0 °C либо предварительно подогревать аккумулятор; температура работы — не выше −20 °C; оба диапазона указаны в официальном паспорте производителя отдельными строками.</b></p>" +
      "<h4>Почему это настолько важно</h4><p>Заряд литиевого аккумулятора на морозе осаждает на аноде металлический литий. Ёмкость теряется безвозвратно, в худшем случае возникает внутреннее замыкание. Процесс невидим: снаружи аккумулятор цел, но весной отдаёт половину ёмкости.</p>" +
      "<p class='ogoh'>На 267 объектах эта ошибка означает потерю всего парка аккумуляторов за одну зиму. Поэтому пункт вносят в обязательную часть тендерного задания, а его выполнение проверяют по журналу первой зимы пилота.</p>" }
},

"y02.x-panel": {
  yorliq: "Montajchi uchun", sarlavha: "Chang, qor va o'g'irlik",
  tana: "<table><tr><th>Sabab</th><th>Unumga ta'siri</th><th>Chora</th></tr>" +
    "<tr><td>Chang qatlami</td><td>−10…25%</td><td>Tik burchak, yiliga bir tozalash</td></tr>" +
    "<tr><td>Yotgan qor</td><td>−100% qor erigunicha</td><td>55–60° qiyalik: qor o'zi sirg'aladi</td></tr>" +
    "<tr><td>Qush axlati</td><td>nuqtaviy soya, sezilarli</td><td>Panel ustiga qo'nish uchun joy qoldirilmaydi</td></tr>" +
    "<tr><td>O'g'irlik</td><td>−100%</td><td>Balandlik, anti-vandal bolt, belgi</td></tr></table>" +
    "<h4>O'g'irlik qanday aniqlanadi</h4><p>Kamera va panel bir korpusda: panelni yulish kamerani ham uzadi. Aloqa to'satdan, holat xabarisiz uzilsa, platforma buni oddiy uzilishdan farqlaydi va darhol vazifa ochadi.</p>" +
    "<p class='ogoh'>Yo'qolgan jihozni qaytarish ehtimoli past, lekin seriya raqami va MKB belgisi uni sotishni qiyinlashtiradi va sug'urta hamda ichki tekshiruv uchun zarur hujjat bo'lib qoladi.</p>",
  ru: { yorliq: "Для монтажника", sarlavha: "Пыль, снег и кража",
    tana: "<table><tr><th>Причина</th><th>Влияние на выработку</th><th>Мера</th></tr>" +
      "<tr><td>Слой пыли</td><td>−10…25%</td><td>Крутой угол, чистка раз в год</td></tr>" +
      "<tr><td>Лежащий снег</td><td>−100% до схода</td><td>Наклон 55–60°: снег сходит сам</td></tr>" +
      "<tr><td>Птичий помёт</td><td>точечная тень, заметно</td><td>Не оставляют места для посадки на панель</td></tr>" +
      "<tr><td>Кража</td><td>−100%</td><td>Высота, антивандальные болты, маркировка</td></tr></table>" +
      "<h4>Как выявляют кражу</h4><p>Камера и панель в одном корпусе: срывая панель, срывают и камеру. Если связь пропала внезапно, без сообщения о состоянии, платформа отличает это от обычного обрыва и сразу открывает задачу.</p>" +
      "<p class='ogoh'>Вернуть похищенное оборудование удаётся редко, но серийный номер и знак MKBANK затрудняют его сбыт и остаются необходимым документом для страховой и внутренней проверки.</p>" }
},

"y02.g-ha": {
  yorliq: "Rahbariyat uchun", sarlavha: "Mos obyektni qanday tanib olish",
  tana: "<p>Uchta savolga «ha» deb javob berilsa, yechim mos keladi.</p>" +
    "<ol><li><b>Panelga kun tushadimi?</b> Janubga ochiq devor yoki ustun bormi, dekabrda soya tushmaydimi.</li>" +
    "<li><b>Bitta kadr yetarlimi?</b> Kirish bitta bo'lsa yoki asosiy xatar bitta yo'nalishda bo'lsa — yetarli.</li>" +
    "<li><b>4G qamrovi ishonchlimi?</b> RSRP −100 dBm dan yuqori bo'lsa.</li></ol>" +
    "<p>Bunday obyektlar bank balansida ko'p: bir kirishli omborxona, hovli, qurilish materiallari sexi, viloyatdagi uzoq obyekt. Ularning ko'pchiligiga ichkariga kirish uchun kalit ham kerak emas — kamera tashqi devorga qo'yiladi.</p>" +
    "<p class='ogoh'>Yechimning eng katta amaliy afzalligi shu: montajchi obyektga bir marta boradi va keyin yiliga bir marta xizmat ko'rsatadi. Uzoq viloyat obyektlari uchun bu boshqa yechimlarga nisbatan hal qiluvchi ustunlik.</p>",
  ru: { yorliq: "Для правления", sarlavha: "Как распознать подходящий объект",
    tana: "<p>Если на три вопроса ответ «да», решение подходит.</p>" +
      "<ol><li><b>Попадает ли на панель солнце?</b> Есть ли открытая на юг стена или опора, нет ли декабрьской тени.</li>" +
      "<li><b>Достаточно ли одного кадра?</b> Если вход один или основной риск идёт с одного направления — достаточно.</li>" +
      "<li><b>Надёжно ли покрытие 4G?</b> RSRP выше −100 дБм.</li></ol>" +
      "<p>Таких объектов на балансе банка много: склад с одним въездом, двор, цех стройматериалов, удалённый объект в области. На многие из них даже не нужен ключ — камера ставится на наружную стену.</p>" +
      "<p class='ogoh'>Главное практическое преимущество решения именно в этом: монтажник приезжает один раз, а дальше обслуживает раз в год. Для удалённых областных объектов это решающий аргумент.</p>" }
},

"y02.g-yoq": {
  yorliq: "Rahbariyat uchun", sarlavha: "Mos kelmaydigan obyektda nima olinadi",
  tana: "<table><tr><th>Obyekt</th><th>Nega mos emas</th><th>Nima olinadi</th></tr>" +
    "<tr><td>Shimoliy devor, tor hovli</td><td>Panelga kun tushmaydi</td><td>Yechim 04</td></tr>" +
    "<tr><td>4G qamrovi zaif nuqta</td><td>Har uyg'onish tarmoq qidirishga aylanadi</td><td>Yechim 04, tashqi antenna bilan</td></tr>" +
    "<tr><td>Uzluksiz yozuv kerak</td><td>Kamera 24 soat yozmaydi</td><td>Yechim 04</td></tr>" +
    "<tr><td>Bir necha kirishli katta hudud</td><td>Bitta qo'zg'almas kadr yetmaydi</td><td>Yechim 03</td></tr>" +
    "<tr><td>Ichki makon, ofis</td><td>Quyosh yo'q, kamera ortiqcha</td><td>Yechim 01 yoki 05</td></tr></table>" +
    "<p class='ogoh'>Eng ko'p uchraydigan xato — panelni «yetarli yorug'lik bor» degan taassurot bo'yicha joylashtirish. Bahorda va yozda bu to'g'ri bo'ladi, dekabrda esa emas. Joy tanlashda faqat qish quyoshining yo'liga qaraladi va bu ko'rik dalolatnomasida qayd etiladi.</p>",
  ru: { yorliq: "Для правления", sarlavha: "Что берут там, где это решение не годится",
    tana: "<table><tr><th>Объект</th><th>Почему не годится</th><th>Что берут</th></tr>" +
      "<tr><td>Северная стена, узкий двор</td><td>На панель не попадает солнце</td><td>Решение 04</td></tr>" +
      "<tr><td>Точка со слабым 4G</td><td>Каждое пробуждение превращается в поиск сети</td><td>Решение 04 с внешней антенной</td></tr>" +
      "<tr><td>Нужна непрерывная запись</td><td>Камера не пишет круглосуточно</td><td>Решение 04</td></tr>" +
      "<tr><td>Большая территория с несколькими въездами</td><td>Одного неподвижного кадра мало</td><td>Решение 03</td></tr>" +
      "<tr><td>Помещение, офис</td><td>Солнца нет, камера избыточна</td><td>Решение 01 или 05</td></tr></table>" +
      "<p class='ogoh'>Самая частая ошибка — ставить панель по впечатлению «света достаточно». Весной и летом это верно, в декабре — нет. Место выбирают только по зимней траектории солнца, и это фиксируют в акте осмотра.</p>" }
}

});
