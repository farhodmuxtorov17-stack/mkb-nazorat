/* Taqdimot: slayd elementlari bosilganda ochiladigan batafsil ma'lumot.
   Kalit: slayd id va element roli (masalan s-y01.band2) yoki data-batafsil qiymati. */
window.MKB_BATAFSIL = window.MKB_BATAFSIL || {};

/* ---- dasturchiA ---- */
/* dasturchiA: s-api, s-adapter, s-video va s-arx, s-savol nuqtalari */
window.MKB_BATAFSIL = window.MKB_BATAFSIL || {};
Object.assign(window.MKB_BATAFSIL, {
  "s-api.sxema": {"yorliq": "Jamoa rahbarlari uchun", "sarlavha": "Hodisa sxemasining har bir maydoni", "tana": "<p>Sxema brenddan mustaqil. Adapter qurilmadan kelgan xom ma'lumotni shu o'nta maydonga keltiradi, xom yozuv esa alohida jadvalda 30 kun saqlanadi: nosozlikni tekshirish uchun kerak, API'ga chiqmaydi.</p>\n<table><tr><th>Maydon</th><th>Qoida</th></tr>\n<tr><td><code>obyekt_id</code></td><td>Reyestrdagi kalit. Adapter uni qurilmalar reyestridan oladi, qurilmadan emas</td></tr>\n<tr><td><code>tur</code></td><td>Yopiq ro'yxat: harakat, eshik, tutun, buzish, batareya_past, aloqa_yoq</td></tr>\n<tr><td><code>vaqt</code></td><td>Qurilma vaqti, ISO-8601, faqat UTC va «Z». Server qabul vaqtini alohida yozadi</td></tr>\n<tr><td><code>ishonch</code></td><td>0 dan 1 gacha. Brend bermasa <code>null</code>, taxmin qo'yilmaydi</td></tr>\n<tr><td><code>kadr_url</code>, <code>klip_url</code></td><td>Ombordagi kalit, ochiq havola emas. Fayl imzoli, qisqa muddatli havola bilan olinadi</td></tr>\n<tr><td><code>sha256</code></td><td>Klipning 64 belgili hex xeshi, qabul paytida hisoblanadi</td></tr></table>\n<h4>Versiya</h4>\n<p>Har xabarda <code>sxema: \"1.0\"</code>. Yangi maydon faqat qo'shiladi, borini o'chirish yoki ma'nosini o'zgartirish <code>/api/v2</code> degani. JSON Schema fayli repozitoriyda turadi va har adapter sinovi unga qarshi o'tadi.</p>\n<p class='ogoh'>Qurilma soati adashishi mumkin. Farq 2 daqiqadan oshsa, server vaqti olinadi va hodisaga <code>vaqt_tuzatildi</code> belgisi qo'yiladi.</p>", "manba": [], "ru": {"yorliq": "Для тимлида", "sarlavha": "Каждое поле схемы события", "tana": "<p>Схема не зависит от бренда. Адаптер сводит сырые данные устройства к этим десяти полям, а сырая запись 30 дней хранится в отдельной таблице: она нужна для разбора сбоев и наружу через API не отдаётся.</p>\n<table><tr><th>Поле</th><th>Правило</th></tr>\n<tr><td><code>obyekt_id</code></td><td>Ключ из реестра. Адаптер берёт его из реестра устройств, а не с самого устройства</td></tr>\n<tr><td><code>tur</code></td><td>Закрытый перечень: движение, дверь, дым, вскрытие, низкий заряд, нет связи</td></tr>\n<tr><td><code>vaqt</code></td><td>Время устройства, ISO-8601, только UTC с «Z». Время приёма сервер пишет отдельно</td></tr>\n<tr><td><code>ishonch</code></td><td>От 0 до 1. Если бренд не отдаёт — <code>null</code>, без догадок</td></tr>\n<tr><td><code>kadr_url</code>, <code>klip_url</code></td><td>Ключ в хранилище, а не публичная ссылка. Файл выдаётся по подписанной краткосрочной ссылке</td></tr>\n<tr><td><code>sha256</code></td><td>Хеш клипа, 64 hex-символа, считается при приёме</td></tr></table>\n<h4>Версионирование</h4>\n<p>В каждом сообщении <code>sxema: \"1.0\"</code>. Новые поля только добавляются; удаление поля или смена его смысла означает <code>/api/v2</code>. JSON Schema лежит в репозитории, тесты каждого адаптера прогоняются против неё.</p>\n<p class='ogoh'>Часы устройства могут уходить. При расхождении больше 2 минут берётся время сервера, а событие получает отметку <code>vaqt_tuzatildi</code>.</p>"}},
  "s-api.hodisa": {"yorliq": "Jamoa rahbarlari uchun", "sarlavha": "POST /hodisa: so'rov, javob va xatolar", "tana": "<p>Adapter hodisani yuboradi va darhol <b>202</b> oladi: hodisa navbatga yozildi, qayta ishlash keyin. Maqsad: navbatgacha p95 300 ms dan kam.</p>\n<pre><code>POST /api/v1/hodisa\nContent-Type: application/json\n(mTLS: CN=adapter-hik-01)\n\n{ \"hodisa_id\": \"7f3c9a2e-...-41d0\",\n  \"obyekt_id\": \"AK-2025/0934\",\n  \"qurilma_id\": \"KAM-0007\",\n  \"tur\": \"harakat\",\n  \"vaqt\": \"2026-09-21T06:30:12Z\", ... }\n\n202 Accepted\n{ \"hodisa_id\": \"7f3c9a2e-...-41d0\", \"holat\": \"qabul\" }</code></pre>\n<h4>Takror</h4>\n<p><code>hodisa_id</code> adapterda yaratiladi. Shu id bilan ikkinchi xabar kelsa, yana 202 qaytadi va <code>\"takror\": true</code> qo'shiladi. 4G uzilib, adapter qayta yuborganda hodisa ikki marta ko'rinmaydi.</p>\n<h4>Xatolar (RFC 9457)</h4>\n<table><tr><th>Kod</th><th>Qachon</th></tr>\n<tr><td class='n'>400</td><td>Sxemaga mos emas; javobda qaysi maydon xato ekani</td></tr>\n<tr><td class='n'>403</td><td>Sertifikat boshqa obyektga tegishli</td></tr>\n<tr><td class='n'>413</td><td>Tana 256 KB dan katta: kadr va klip JSON ichida yuborilmaydi</td></tr>\n<tr><td class='n'>429</td><td>Adapter uchun 50 so'rov/soniya chegarasi, <code>Retry-After</code> bilan</td></tr></table>\n<p>Kadr va klip alohida yuklanadi: adapter imzolangan havola so'raydi va faylni omborga to'g'ridan-to'g'ri qo'yadi.</p>", "manba": [["RFC 9457", "https://www.rfc-editor.org/rfc/rfc9457"]], "ru": {"yorliq": "Для тимлида", "sarlavha": "POST /hodisa: запрос, ответ и ошибки", "tana": "<p>Адаптер отправляет событие и сразу получает <b>202</b>: событие записано в очередь, обработка идёт следом. Цель — p95 до очереди меньше 300 мс.</p>\n<pre><code>POST /api/v1/hodisa\nContent-Type: application/json\n(mTLS: CN=adapter-hik-01)\n\n{ \"hodisa_id\": \"7f3c9a2e-...-41d0\",\n  \"obyekt_id\": \"AK-2025/0934\",\n  \"qurilma_id\": \"KAM-0007\",\n  \"tur\": \"harakat\",\n  \"vaqt\": \"2026-09-21T06:30:12Z\", ... }\n\n202 Accepted\n{ \"hodisa_id\": \"7f3c9a2e-...-41d0\", \"holat\": \"qabul\" }</code></pre>\n<h4>Повторы</h4>\n<p><code>hodisa_id</code> создаёт адаптер. Если второе сообщение приходит с тем же id, снова возвращается 202 с пометкой <code>\"takror\": true</code>. Когда 4G рвётся и адаптер отправляет повторно, событие не задваивается.</p>\n<h4>Ошибки (RFC 9457)</h4>\n<table><tr><th>Код</th><th>Когда</th></tr>\n<tr><td class='n'>400</td><td>Не соответствует схеме; в ответе указано ошибочное поле</td></tr>\n<tr><td class='n'>403</td><td>Сертификат принадлежит другому объекту</td></tr>\n<tr><td class='n'>413</td><td>Тело больше 256 КБ: кадры и клипы внутри JSON не передаются</td></tr>\n<tr><td class='n'>429</td><td>Лимит адаптера 50 запросов/с, с заголовком <code>Retry-After</code></td></tr></table>\n<p>Кадр и клип загружаются отдельно: адаптер запрашивает подписанную ссылку и кладёт файл прямо в хранилище.</p>"}},
  "s-api.holat": {"yorliq": "Jamoa rahbarlari uchun", "sarlavha": "Qurilma holati qayerdan olinadi", "tana": "<pre><code>GET /api/v1/qurilma/KAM-0007/holat\n\n200 OK   ETag: \"h-1130\"\n{ \"qurilma_id\": \"KAM-0007\",\n  \"onlayn\": true,\n  \"last_seen\": \"2026-09-21T06:41:05Z\",\n  \"batareya\": 64, \"signal_dbm\": -89,\n  \"xotira_foiz\": 41, \"harorat_c\": 7,\n  \"manba\": \"mqtt\" }</code></pre>\n<h4>Ma'lumot manbasi</h4>\n<ul><li>MQTT shlyuzi bo'lsa, oxirgi saqlangan (retain) xabar.</li>\n<li>Push bermaydigan brend uchun adapter 5 daqiqada bir so'raydi.</li>\n<li>Batareyali kamera faqat uyg'onganda holat beradi. Panel «oxirgi ma'lum qiymat» va uning vaqtini ko'rsatadi, qiymatni yangidek ko'rsatmaydi.</li></ul>\n<h4>«Aloqada» qanday hisoblanadi</h4>\n<p>Router va shlyuz har 60 soniyada heartbeat yuboradi. <code>last_seen</code> 3 daqiqa yangilanmasa, holat «kechikmoqda», 15 daqiqa yangilanmasa «aloqa yo'q». Batareyali kamera o'zi heartbeat bermaydi: uning qiymatlari Home Hub yoki router orqali, uyg'ongan paytdagi holicha keladi.</p>\n<h4>Ro'yxat uchun</h4>\n<p>Panel 100 ta qurilmani bittalab so'ramaydi: <code>GET /qurilma?holat=aloqa_yoq&amp;kursor=...</code>, sahifada 100 ta. Javob 30 soniya keshlanadi, <code>ETag</code> o'zgarmagan bo'lsa 304 qaytadi.</p>", "manba": [], "ru": {"yorliq": "Для тимлида", "sarlavha": "Откуда берётся состояние устройства", "tana": "<pre><code>GET /api/v1/qurilma/KAM-0007/holat\n\n200 OK   ETag: \"h-1130\"\n{ \"qurilma_id\": \"KAM-0007\",\n  \"onlayn\": true,\n  \"last_seen\": \"2026-09-21T06:41:05Z\",\n  \"batareya\": 64, \"signal_dbm\": -89,\n  \"xotira_foiz\": 41, \"harorat_c\": 7,\n  \"manba\": \"mqtt\" }</code></pre>\n<h4>Источник данных</h4>\n<ul><li>Если есть MQTT-шлюз — последнее сохранённое (retain) сообщение.</li>\n<li>Для брендов без push адаптер опрашивает устройство раз в 5 минут.</li>\n<li>Камера на батарее отдаёт состояние только при пробуждении. Панель показывает «последнее известное значение» и его время, а не выдаёт его за свежее.</li></ul>\n<h4>Как считается «на связи»</h4>\n<p>Роутер и шлюз отправляют heartbeat каждые 60 секунд. Если <code>last_seen</code> не обновлялся 3 минуты, статус — «задерживается», если 15 минут — «нет связи». Камера на батарее сама heartbeat не шлёт: её значения приходят через Home Hub или роутер в том виде, в каком были при последнем пробуждении.</p>\n<h4>Для списков</h4>\n<p>Панель не опрашивает 100 устройств поштучно: <code>GET /qurilma?holat=aloqa_yoq&amp;kursor=...</code>, по 100 на страницу. Ответ кешируется на 30 секунд, при неизменном <code>ETag</code> возвращается 304.</p>"}},
  "s-api.buyruq": {"yorliq": "Jamoa rahbarlari uchun", "sarlavha": "Buyruq ikki marta bajarilmasligi uchun", "tana": "<p>Eshik ochish qaytarib bo'lmaydigan amal. Operator tugmani ikki marta bossa yoki tarmoq javobni yo'qotsa, rele ikki marta ishlamasligi kerak.</p>\n<pre><code>POST /api/v1/buyruq\nIdempotency-Key: 5b1e0c7a-9d2f-4e61-a3b8-0f6c2d9e7a41\n\n{ \"qurilma_id\": \"RELE-0012\",\n  \"amal\": \"eshik_och\",\n  \"muddat_s\": 5,\n  \"sabab\": \"Baholovchi tashrifi\" }\n\n202 Accepted\n{ \"buyruq_id\": \"B-88213\", \"holat\": \"yuborildi\" }</code></pre>\n<h4>Qoidalar</h4>\n<ul><li>Shu kalit 24 soat ichida qayta kelsa, yangi buyruq yaratilmaydi, birinchi javob qaytadi.</li>\n<li>Kalit bir xil, tana boshqa bo'lsa: <b>422</b>.</li>\n<li>Yakuniy holat webhook yoki <code>GET /buyruq/{id}</code> orqali: bajarildi, xato yoki 30 soniyada javob kelmadi.</li>\n<li>Eshik ochish uchun operator oxirgi 60 soniyada shu obyekt videosini ochgan bo'lishi shart.</li>\n<li>Bir operatorga daqiqasiga 10 ta buyruq.</li></ul>\n<p>Har buyruq jurnalga tushadi: kim, qachon, qaysi kadr ko'rilgan va natija.</p>", "manba": [["IETF: Idempotency-Key", "https://datatracker.ietf.org/doc/draft-ietf-httpapi-idempotency-key-header/"], ["RFC 9457", "https://www.rfc-editor.org/rfc/rfc9457"]], "ru": {"yorliq": "Для тимлида", "sarlavha": "Чтобы команда не выполнилась дважды", "tana": "<p>Открытие двери — необратимое действие. Если оператор нажал кнопку дважды или ответ потерялся в сети, реле не должно сработать второй раз.</p>\n<pre><code>POST /api/v1/buyruq\nIdempotency-Key: 5b1e0c7a-9d2f-4e61-a3b8-0f6c2d9e7a41\n\n{ \"qurilma_id\": \"RELE-0012\",\n  \"amal\": \"eshik_och\",\n  \"muddat_s\": 5,\n  \"sabab\": \"Baholovchi tashrifi\" }\n\n202 Accepted\n{ \"buyruq_id\": \"B-88213\", \"holat\": \"yuborildi\" }</code></pre>\n<h4>Правила</h4>\n<ul><li>Если тот же ключ приходит повторно в течение 24 часов, новая команда не создаётся — возвращается первый ответ.</li>\n<li>Ключ тот же, а тело другое — <b>422</b>.</li>\n<li>Итоговый статус приходит вебхуком или через <code>GET /buyruq/{id}</code>: выполнено, ошибка или нет ответа за 30 секунд.</li>\n<li>Открыть дверь можно, только если оператор смотрел видео этого объекта в последние 60 секунд.</li>\n<li>Не больше 10 команд в минуту на оператора.</li></ul>\n<p>Каждая команда пишется в журнал: кто, когда, какой кадр видел и чем всё закончилось.</p>"}},
  "s-api.video": {"yorliq": "Jamoa rahbarlari uchun", "sarlavha": "Video sessiyasi va qisqa token", "tana": "<p>Brauzer kameraga hech qachon to'g'ridan-to'g'ri ulanmaydi. U API'dan bir martalik token oladi va media shlyuzga shu token bilan boradi.</p>\n<pre><code>POST /api/v1/video/sessiya\n{ \"qurilma_id\": \"KAM-0007\", \"tur\": \"jonli\" }\n\n201 Created\n{ \"sessiya_id\": \"VS-40117\",\n  \"protokol\": \"webrtc\",\n  \"url\": \"https://media.mkb.local/KAM-0007/whep\",\n  \"token\": \"eyJhbGciOiJFUzI1NiIs...\",\n  \"amal_qiladi_s\": 60,\n  \"max_davomiylik_s\": 600 }</code></pre>\n<ul><li>Token 60 soniya ichida sessiyani boshlash uchun. Boshlangan oqim token eskirsa ham uzilmaydi.</li>\n<li>Jonli sessiya 10 daqiqagacha, keyin operator uzaytiradi. Reolink Home Hub orqali chegara 5 daqiqa.</li>\n<li>Bir kameraga bir vaqtda 2 tomoshabin: 4G yuqoriga kanali tor.</li>\n<li>Arxiv uchun <code>\"tur\": \"arxiv\"</code>, <code>dan</code> va <code>gacha</code> beriladi, javobda HLS manzili.</li></ul>\n<h4>Xatolar</h4>\n<p><b>409</b> kamera uxlayapti: shlyuz uni uyg'otadi, panel kutish belgisini ko'rsatadi. <b>503</b> kamera aloqada emas: panel oxirgi kadrni va uning vaqtini beradi.</p>\n<p>Kim, qachon va qancha tomosha qilgani <code>tarix</code>ga yoziladi.</p>", "manba": [["MediaMTX", "https://github.com/bluenviron/mediamtx"]], "ru": {"yorliq": "Для тимлида", "sarlavha": "Видеосессия и короткий токен", "tana": "<p>Браузер никогда не подключается к камере напрямую. Он получает одноразовый токен у API и с ним идёт в медиашлюз.</p>\n<pre><code>POST /api/v1/video/sessiya\n{ \"qurilma_id\": \"KAM-0007\", \"tur\": \"jonli\" }\n\n201 Created\n{ \"sessiya_id\": \"VS-40117\",\n  \"protokol\": \"webrtc\",\n  \"url\": \"https://media.mkb.local/KAM-0007/whep\",\n  \"token\": \"eyJhbGciOiJFUzI1NiIs...\",\n  \"amal_qiladi_s\": 60,\n  \"max_davomiylik_s\": 600 }</code></pre>\n<ul><li>Токен даёт 60 секунд на старт сессии. Начатый поток не обрывается, когда токен истекает.</li>\n<li>Живая сессия — до 10 минут, дальше оператор продлевает. Через Reolink Home Hub предел 5 минут.</li>\n<li>Не больше 2 зрителей на камеру одновременно: канал 4G на отдачу узкий.</li>\n<li>Для архива передаются <code>\"tur\": \"arxiv\"</code>, <code>dan</code> и <code>gacha</code>, в ответе адрес HLS.</li></ul>\n<h4>Ошибки</h4>\n<p><b>409</b> — камера спит: шлюз её будит, панель показывает ожидание. <b>503</b> — камера не на связи: панель отдаёт последний кадр и время его съёмки.</p>\n<p>Кто, когда и сколько смотрел — пишется в <code>tarix</code>.</p>"}},
  "s-api.tarix": {"yorliq": "Texnik izoh", "sarlavha": "Obyekt tarixi: audit va nizo uchun", "tana": "<p>Bitta so'rov obyekt bo'yicha hamma narsani vaqt tartibida qaytaradi: hodisalar, buyruqlar, video sessiyalar va qurilma holatining o'zgarishi. Ichki audit, sug'urta da'vosi yoki sud uchun shu yetadi.</p>\n<pre><code>GET /api/v1/obyekt/AK-2025-0934/tarix\n    ?dan=2026-09-01T00:00:00Z\n    &amp;gacha=2026-09-21T23:59:59Z\n    &amp;tur=hodisa,buyruq&amp;kursor=...\n\n200 OK\n{ \"yozuvlar\": [\n  { \"vaqt\": \"2026-09-21T06:30:12Z\", \"tur\": \"hodisa\",\n    \"qisqa\": \"harakat, KAM-0007\", \"sha256\": \"9f2c41...\" },\n  { \"vaqt\": \"2026-09-21T06:31:40Z\", \"tur\": \"video\",\n    \"kim\": \"operator: n.ismoilova\", \"davomiylik_s\": 94 } ],\n  \"keyingi\": \"c2VxPTQxMjc...\" }</code></pre>\n<ul><li>Sahifada 100 ta yozuv, kursor bilan. Sahifa raqami ishlatilmaydi: yangi yozuv qo'shilganda ro'yxat siljimaydi.</li>\n<li>Yozuv o'zgartirilmaydi va o'chirilmaydi, faqat qo'shiladi.</li>\n<li>Eksport CSV yoki PDF, ichida har klipning SHA-256 xeshi.</li></ul>\n<p class='ogoh'>Saqlash muddatini bank siyosati belgilaydi. Taklif: jurnal 5 yil, oddiy hodisa klipi 90 kun, nizoli holat klipi ish yopilgunicha.</p>", "manba": [], "ru": {"yorliq": "Техническая справка", "sarlavha": "История объекта: для аудита и споров", "tana": "<p>Один запрос возвращает всё по объекту в хронологическом порядке: события, команды, видеосессии и смены состояния устройств. Этого достаточно для внутреннего аудита, страхового случая или суда.</p>\n<pre><code>GET /api/v1/obyekt/AK-2025-0934/tarix\n    ?dan=2026-09-01T00:00:00Z\n    &amp;gacha=2026-09-21T23:59:59Z\n    &amp;tur=hodisa,buyruq&amp;kursor=...\n\n200 OK\n{ \"yozuvlar\": [\n  { \"vaqt\": \"2026-09-21T06:30:12Z\", \"tur\": \"hodisa\",\n    \"qisqa\": \"harakat, KAM-0007\", \"sha256\": \"9f2c41...\" },\n  { \"vaqt\": \"2026-09-21T06:31:40Z\", \"tur\": \"video\",\n    \"kim\": \"operator: n.ismoilova\", \"davomiylik_s\": 94 } ],\n  \"keyingi\": \"c2VxPTQxMjc...\" }</code></pre>\n<ul><li>100 записей на страницу, с курсором. Номера страниц не используются: при появлении новых записей список не сдвигается.</li>\n<li>Записи не изменяются и не удаляются, только добавляются.</li>\n<li>Экспорт в CSV или PDF, с хешем SHA-256 каждого клипа.</li></ul>\n<p class='ogoh'>Срок хранения определяет политика банка. Предложение: журнал 5 лет, клипы обычных событий 90 дней, клипы по спорным случаям — до закрытия дела.</p>"}},
  "s-api.obuna": {"yorliq": "Jamoa rahbarlari uchun", "sarlavha": "Webhook obunasini ochish va boshqarish", "tana": "<p>Tashqi tizim, masalan bankning xavfsizlik xizmati yoki servis pudratchisi, hodisalarni so'rab turmaydi: MKB o'zi yuboradi.</p>\n<pre><code>POST /api/v1/obuna\n{ \"url\": \"https://soc.bank.local/mkb/hook\",\n  \"turlar\": [\"buzish\", \"tutun\", \"aloqa_yoq\"],\n  \"tavsif\": \"Xavfsizlik xizmati navbatchisi\" }\n\n201 Created\n{ \"obuna_id\": \"OB-017\",\n  \"sir\": \"whsec_MfKQ9r8GKYqrTwjUPD8ILPZI...\" }</code></pre>\n<ul><li><code>sir</code> faqat bir marta ko'rsatiladi. Almashtirish: <code>POST /obuna/{id}/kalit</code>, eski kalit 24 soat birga ishlaydi.</li>\n<li>Manzil faqat HTTPS va ruxsat ro'yxatidagi domen. Ichki IP va localhost rad etiladi: bu SSRF hujumidan himoya.</li>\n<li><code>POST /obuna/{id}/sinov</code> sinov xabarini yuboradi, integratsiyani ulash vaqtida kerak.</li>\n<li>Ketma-ket 3 kun xato qaytgan obuna to'xtatiladi, administratorga xabar ketadi.</li></ul>\n<h4>Kim ochadi</h4>\n<p>Obunani faqat administrator roli ochadi. Har obuna nima yuborayotgani ro'yxatda ko'rinadi: bu shaxsiy ma'lumot oqimini nazorat qilish uchun.</p>", "manba": [["Standard Webhooks", "https://github.com/standard-webhooks/standard-webhooks/blob/main/spec/standard-webhooks.md"]], "ru": {"yorliq": "Для тимлида", "sarlavha": "Как оформить подписку на вебхуки", "tana": "<p>Внешняя система — например, служба безопасности банка или сервисный подрядчик — не опрашивает события: MKB отправляет их сама.</p>\n<pre><code>POST /api/v1/obuna\n{ \"url\": \"https://soc.bank.local/mkb/hook\",\n  \"turlar\": [\"buzish\", \"tutun\", \"aloqa_yoq\"],\n  \"tavsif\": \"Xavfsizlik xizmati navbatchisi\" }\n\n201 Created\n{ \"obuna_id\": \"OB-017\",\n  \"sir\": \"whsec_MfKQ9r8GKYqrTwjUPD8ILPZI...\" }</code></pre>\n<ul><li><code>sir</code> показывается один раз. Смена ключа — <code>POST /obuna/{id}/kalit</code>, старый ключ работает параллельно ещё 24 часа.</li>\n<li>Адрес — только HTTPS и домен из белого списка. Внутренние IP и localhost отклоняются: это защита от SSRF.</li>\n<li><code>POST /obuna/{id}/sinov</code> шлёт тестовое сообщение — пригодится при подключении.</li>\n<li>Если подписка три дня подряд отвечает ошибкой, она приостанавливается, администратор получает уведомление.</li></ul>\n<h4>Кто оформляет</h4>\n<p>Подписку создаёт только роль администратора. Что именно отправляет каждая подписка, видно в списке: так контролируется поток персональных данных.</p>"}},
  "s-api.webhook": {"yorliq": "Jamoa rahbarlari uchun", "sarlavha": "Qabul qiluvchi imzoni qanday tekshiradi", "tana": "<p>Format Standard Webhooks spetsifikatsiyasidan olingan: tayyor kutubxonalar bor, pudratchi uni noldan yozmaydi.</p>\n<pre><code>webhook-id: msg_2nQx7Rk...\nwebhook-timestamp: 1790059812\nwebhook-signature: v1,K5oZfzN95Z9UVu1EsfQmfVNQ...\n\nimzo = base64( HMAC-SHA256( sir,\n         id + \".\" + timestamp + \".\" + tana ) )</code></pre>\n<h4>Qabul qiluvchi tomonda</h4>\n<ol><li>Vaqt farqini tekshiradi: 5 daqiqadan oshsa, rad etadi. Bu eski xabarni qayta yuborishdan himoya.</li>\n<li>Imzoni o'zi hisoblaydi va doimiy vaqtli taqqoslash bilan solishtiradi.</li>\n<li><code>webhook-id</code> ni saqlaydi. Takror kelsa, qayta ishlamasdan 200 qaytaradi.</li>\n<li>15 soniya ichida 2xx qaytaradi, og'ir ishni navbatga qo'yadi.</li></ol>\n<h4>Qayta urinish</h4>\n<table><tr><th>Urinish</th><th>Kutish</th></tr>\n<tr><td>1–3</td><td class='n'>5 s, 5 daq, 30 daq</td></tr>\n<tr><td>4–7</td><td class='n'>2, 5, 10, 24 soat</td></tr></table>\n<p>Jami taxminan 42 soat. Undan keyin xabar 7 kun saqlanadi va administrator uni qo'lda qayta yuborishi mumkin.</p>", "manba": [["Standard Webhooks", "https://github.com/standard-webhooks/standard-webhooks/blob/main/spec/standard-webhooks.md"]], "ru": {"yorliq": "Для тимлида", "sarlavha": "Как получатель проверяет подпись", "tana": "<p>Формат взят из спецификации Standard Webhooks: есть готовые библиотеки, подрядчику не нужно писать проверку с нуля.</p>\n<pre><code>webhook-id: msg_2nQx7Rk...\nwebhook-timestamp: 1790059812\nwebhook-signature: v1,K5oZfzN95Z9UVu1EsfQmfVNQ...\n\nimzo = base64( HMAC-SHA256( sir,\n         id + \".\" + timestamp + \".\" + tana ) )</code></pre>\n<h4>На стороне получателя</h4>\n<ol><li>Проверить расхождение времени: больше 5 минут — отклонить. Это защита от повторной отправки старого сообщения.</li>\n<li>Посчитать подпись самостоятельно и сравнить её функцией сравнения за постоянное время.</li>\n<li>Сохранить <code>webhook-id</code>. Если пришёл повтор — вернуть 200 без повторной обработки.</li>\n<li>Ответить 2xx в течение 15 секунд, тяжёлую работу поставить в очередь.</li></ol>\n<h4>Повторные попытки</h4>\n<table><tr><th>Попытка</th><th>Пауза</th></tr>\n<tr><td>1–3</td><td class='n'>5 с, 5 мин, 30 мин</td></tr>\n<tr><td>4–7</td><td class='n'>2, 5, 10, 24 ч</td></tr></table>\n<p>Всего около 42 часов. Затем сообщение хранится 7 дней, и администратор может отправить его вручную.</p>"}},
  "s-api.mqtt": {"yorliq": "Jamoa rahbarlari uchun", "sarlavha": "MQTT: mavzular, ACL va uzilish", "tana": "<p>MQTT obyektdagi shlyuz uchun: 4G ulanishi uzilib-ulanib turadi, broker esa oxirgi holatni saqlaydi va uzilishni o'zi e'lon qiladi.</p>\n<ul><li><b>ACL.</b> Shlyuz sertifikatidagi CN obyekt kodiga teng. Shlyuz faqat <code>mkb/AK-2025-0934/+/hodisa</code>, <code>holat</code> va <code>javob</code> ga yozadi va faqat o'z <code>buyruq</code> mavzusini o'qiydi. Boshqa obyektga yozishga urinish uziladi va jurnalga tushadi.</li>\n<li><b>QoS 1.</b> Xabar kamida bir marta keladi, ya'ni ikki marta ham kelishi mumkin. Platforma <code>hodisa_id</code> bo'yicha saralaydi.</li>\n<li><b>Retain.</b> <code>holat</code> mavzusida oxirgi xabar saqlanadi: panel qayta ishga tushsa, darhol oxirgi holatni oladi.</li>\n<li><b>LWT.</b> Shlyuz ulanganda vasiyat xabarini beradi: <code>{\"onlayn\": false}</code>. Aloqa kutilmaganda uzilsa, broker shu xabarni <code>aloqa</code> mavzusiga o'zi yozadi.</li>\n<li><b>Keepalive 60 soniya.</b> Operator tarmog'i bo'sh ulanishni bir necha daqiqada uzishi mumkin, shu uchun oraliq qisqa.</li></ul>\n<h4>Broker</h4>\n<p>Mosquitto yoki EMQX sinfidagi broker bank serverida. Tanlashda ikki narsa tekshiriladi: klaster rejimi litsenziyasi va mijoz sertifikati bo'yicha ACL qo'llanishi.</p>\n<p class='ogoh'>Mavzuda «/» obyekt kodining ichida bo'lsa, daraxt buziladi. Shuning uchun <code>AK-2025/0934</code> mavzuda <code>AK-2025-0934</code> bo'ladi.</p>", "manba": [["MQTT 5.0 (OASIS)", "https://docs.oasis-open.org/mqtt/mqtt/v5.0/mqtt-v5.0.html"]], "ru": {"yorliq": "Для тимлида", "sarlavha": "MQTT: топики, ACL и обрывы связи", "tana": "<p>MQTT нужен для шлюза на объекте: соединение 4G то рвётся, то восстанавливается, а брокер хранит последнее состояние и сам объявляет об обрыве.</p>\n<ul><li><b>ACL.</b> CN в сертификате шлюза равен коду объекта. Шлюз пишет только в <code>mkb/AK-2025-0934/+/hodisa</code>, <code>holat</code> и <code>javob</code> и читает только свой топик <code>buyruq</code>. Попытка писать в чужой объект обрывает соединение и попадает в журнал.</li>\n<li><b>QoS 1.</b> Сообщение доставляется как минимум один раз, то есть может прийти и дважды. Платформа отсекает дубли по <code>hodisa_id</code>.</li>\n<li><b>Retain.</b> В топике <code>holat</code> хранится последнее сообщение: после перезапуска панель сразу получает актуальное состояние.</li>\n<li><b>LWT.</b> При подключении шлюз оставляет «завещание»: <code>{\"onlayn\": false}</code>. Если связь неожиданно пропадёт, брокер сам опубликует его в топике <code>aloqa</code>.</li>\n<li><b>Keepalive 60 секунд.</b> Сеть оператора может закрывать простаивающее соединение через несколько минут, поэтому интервал короткий.</li></ul>\n<h4>Брокер</h4>\n<p>Брокер класса Mosquitto или EMQX на сервере банка. При выборе проверяются две вещи: лицензия на кластерный режим и поддержка ACL по клиентскому сертификату.</p>\n<p class='ogoh'>Символ «/» внутри кода объекта ломает дерево топиков. Поэтому <code>AK-2025/0934</code> в топике записывается как <code>AK-2025-0934</code>.</p>"}},
  "s-api.mtls": {"yorliq": "Texnik izoh", "sarlavha": "mTLS: sertifikat har shlyuzga alohida", "tana": "<p>Qurilma va adapter parol bilan emas, sertifikat bilan kiradi. Parolni nusxalash mumkin, shlyuz ichida yaratilgan yopiq kalitni esa ko'chirib bo'lmaydi.</p>\n<h4>Hayot sikli</h4>\n<ol><li>Montajda shlyuz o'zida kalit yaratadi va imzolash so'rovini (CSR) beradi.</li>\n<li>Bankning ichki CA'si sertifikatni imzolaydi: CN = obyekt kodi yoki adapter nomi, muddat 1 yil.</li>\n<li>Muddat tugashidan 30 kun oldin shlyuz yangisini o'zi so'raydi, montajchi borishi shart emas.</li>\n<li>Qurilma o'g'irlansa yoki obyekt sotilsa, sertifikat bitta amal bilan bekor qilinadi (CRL yoki OCSP).</li></ol>\n<h4>Kamera haqida</h4>\n<p>Arzon kameralar mijoz sertifikatini qo'llamaydi. Shuning uchun mTLS obyektdagi router yoki shlyuzda tugaydi, kamera esa faqat VPN ichidagi yopiq tarmoqda gaplashadi. Kameraning o'z paroli har obyektda boshqacha va seyfda saqlanadi.</p>\n<h4>Bank qaror qiladi</h4>\n<ul><li>Mavjud korporativ CA ishlatiladimi yoki alohida kichik CA ochiladimi.</li>\n<li>CA kalitini kim saqlaydi: IT xavfsizlik bo'limi, HSM bilan yoki usiz.</li></ul>", "manba": [["RFC 8705", "https://www.rfc-editor.org/rfc/rfc8705"]], "ru": {"yorliq": "Техническая справка", "sarlavha": "mTLS: отдельный сертификат для каждого шлюза", "tana": "<p>Устройства и адаптеры входят не по паролю, а по сертификату. Пароль можно скопировать, а закрытый ключ, созданный внутри шлюза, вынести нельзя.</p>\n<h4>Жизненный цикл</h4>\n<ol><li>При монтаже шлюз сам создаёт ключ и выдаёт запрос на подпись (CSR).</li>\n<li>Внутренний CA банка подписывает сертификат: CN = код объекта или имя адаптера, срок 1 год.</li>\n<li>За 30 дней до истечения шлюз сам запрашивает новый, выезд монтажника не нужен.</li>\n<li>Если устройство украдено или объект продан, сертификат отзывается одним действием (CRL или OCSP).</li></ol>\n<h4>О камерах</h4>\n<p>Недорогие камеры клиентские сертификаты не поддерживают. Поэтому mTLS заканчивается на роутере или шлюзе объекта, а камера общается только внутри закрытой сети VPN. Пароль камеры на каждом объекте свой и хранится в сейфе паролей.</p>\n<h4>Что решает банк</h4>\n<ul><li>Использовать действующий корпоративный CA или завести отдельный небольшой.</li>\n<li>Кто хранит ключ CA: отдел ИБ, с HSM или без.</li></ul>"}},
  "s-api.oidc": {"yorliq": "Texnik izoh", "sarlavha": "Xodim kirishi: AD guruhlari rolga aylanadi", "tana": "<p>Alohida parol bazasi yaratilmaydi. Xodim bank Active Directory hisobi bilan kiradi: AD FS yoki Keycloak OIDC orqali token beradi, platforma faqat tokenni tekshiradi.</p>\n<table><tr><th>AD guruhi</th><th>Rol</th><th>Nima qila oladi</th></tr>\n<tr><td>MKB-Operator</td><td>operator</td><td>Video, buyruq, hodisani yopish</td></tr>\n<tr><td>MKB-Inspektor</td><td>inspektor</td><td>Holat va tarixni ko'rish, servis arizasi</td></tr>\n<tr><td>MKB-Auditor</td><td>auditor</td><td>Faqat o'qish va eksport</td></tr>\n<tr><td>MKB-Admin</td><td>admin</td><td>Qurilma reyestri, obuna, sertifikat</td></tr></table>\n<ul><li>Filial xodimi faqat o'z hududi obyektlarini ko'radi: tokendagi <code>filial</code> maydoni bo'yicha.</li>\n<li>Kirish tokeni 10 daqiqa, keyin yangilanadi. Xodim AD'da bloklansa, 10 daqiqadan keyin tizimga kira olmaydi.</li>\n<li>Eshik ochish uchun ikkinchi omil talab qilinadi.</li>\n<li>Adapter va tashqi tizimlar xodim nomidan emas, o'z xizmat hisobi bilan ishlaydi.</li></ul>\n<p class='ogoh'>Guruh nomlari misol. Aniq ro'yxatni IT xavfsizlik bo'limi tasdiqlaydi.</p>", "manba": [["OpenID Connect Core", "https://openid.net/specs/openid-connect-core-1_0.html"]], "ru": {"yorliq": "Техническая справка", "sarlavha": "Вход сотрудников: группы AD становятся ролями", "tana": "<p>Отдельная база паролей не создаётся. Сотрудник входит учётной записью Active Directory банка: токен выдаёт AD FS или Keycloak по OIDC, платформа только проверяет его.</p>\n<table><tr><th>Группа AD</th><th>Роль</th><th>Что может</th></tr>\n<tr><td>MKB-Operator</td><td>оператор</td><td>Видео, команды, закрытие событий</td></tr>\n<tr><td>MKB-Inspektor</td><td>инспектор</td><td>Просмотр состояния и истории, сервисные заявки</td></tr>\n<tr><td>MKB-Auditor</td><td>аудитор</td><td>Только чтение и экспорт</td></tr>\n<tr><td>MKB-Admin</td><td>администратор</td><td>Реестр устройств, подписки, сертификаты</td></tr></table>\n<ul><li>Сотрудник филиала видит только объекты своего региона — по полю <code>filial</code> в токене.</li>\n<li>Токен доступа живёт 10 минут, затем обновляется. Если сотрудника заблокировали в AD, через 10 минут он в систему уже не попадёт.</li>\n<li>Для открытия двери нужен второй фактор.</li>\n<li>Адаптеры и внешние системы работают не от имени сотрудников, а под своими сервисными учётными записями.</li></ul>\n<p class='ogoh'>Названия групп — пример. Точный перечень утверждает отдел информационной безопасности.</p>"}},
  "s-adapter.hikvision": {"yorliq": "Jamoa rahbarlari uchun", "sarlavha": "Hikvision adapteri: ISAPI yoki HikCentral", "tana": "<p>Ikki yo'l bor. Bank HikCentral sotib olmasa, adapter kameraga ISAPI orqali o'zi ulanadi. HikCentral bo'lsa, adapter uning OpenAPI'siga ulanadi va kameralar bilan bevosita gaplashmaydi.</p>\n<h4>ISAPI yo'li</h4>\n<pre><code>video:   rtsp://KAM:554/Streaming/Channels/101  (asosiy)\n         rtsp://KAM:554/Streaming/Channels/102  (sub)\nhodisa:  GET /ISAPI/Event/notification/alertStream\n         Accept: multipart/mixed, Digest auth</code></pre>\n<p><code>alertStream</code> ochiq turadigan HTTP ulanish. Kamera har hodisani uning ichida alohida qism qilib yuboradi, rasm bo'lsa ikkinchi qism bo'lib keladi. Adapter chegaralovchi qatorni o'qiydi, qismlarni yig'adi va ulanish uzilsa, 1 soniyadan 60 soniyagacha kutish bilan qayta ulanadi.</p>\n<h4>HikCentral yo'li</h4>\n<p>HikCentral Professional OpenAPI hodisa turlariga obuna beradi. Hujjat va kalit Hikvision TPP portalida ro'yxatdan o'tgandan keyin beriladi, OpenAPI moduli litsenziyasi smetaga alohida qator bo'lib kiradi.</p>\n<h4>Yetkazuvchidan so'raladi</h4>\n<ul><li>Quyosh-4G modeli past quvvat rejimida <code>alertStream</code> ulanishini ushlab turadimi yoki faqat Hik-Connect bulutiga xabar beradimi.</li>\n<li>ISAPI proshivkada yoqilganmi, bulut (P2P) o'chirilsa nima ishlamay qoladi.</li></ul>\n<p>Baho, bitta dasturchi: ISAPI 3 hafta, HikCentral bilan 4 hafta.</p>", "manba": [["Hikvision TPP: ISAPI", "https://tpp.hikvision.com/download/ISAPI_OTAP"], ["Hikvision TPP: HikCentral OpenAPI", "https://tpp.hikvision.com/tpp/HCPIntegration"]], "ru": {"yorliq": "Для тимлида", "sarlavha": "Адаптер Hikvision: ISAPI или HikCentral", "tana": "<p>Есть два пути. Если банк не покупает HikCentral, адаптер сам подключается к камере по ISAPI. Если HikCentral есть, адаптер работает с его OpenAPI и к камерам напрямую не обращается.</p>\n<h4>Путь через ISAPI</h4>\n<pre><code>video:   rtsp://KAM:554/Streaming/Channels/101  (основной)\n         rtsp://KAM:554/Streaming/Channels/102  (суб)\nhodisa:  GET /ISAPI/Event/notification/alertStream\n         Accept: multipart/mixed, Digest auth</code></pre>\n<p><code>alertStream</code> — постоянно открытое HTTP-соединение. Камера отправляет каждое событие отдельной частью, картинка приходит следующей частью. Адаптер читает разделитель, собирает части и при обрыве переподключается с паузой от 1 до 60 секунд.</p>\n<h4>Путь через HikCentral</h4>\n<p>HikCentral Professional OpenAPI даёт подписку на типы событий. Документацию и ключи выдают после регистрации на портале Hikvision TPP; лицензия модуля OpenAPI идёт в смету отдельной строкой.</p>\n<h4>Что спросить у поставщика</h4>\n<ul><li>Держит ли солнечная 4G-модель соединение <code>alertStream</code> в режиме экономии или шлёт события только в облако Hik-Connect.</li>\n<li>Включён ли ISAPI в прошивке и что перестанет работать при отключении облака (P2P).</li></ul>\n<p>Оценка на одного разработчика: ISAPI — 3 недели, с HikCentral — 4 недели.</p>"}},
  "s-adapter.dahua": {"yorliq": "Jamoa rahbarlari uchun", "sarlavha": "Dahua adapteri: eventManager va DSS", "tana": "<pre><code>video:  rtsp://KAM:554/cam/realmonitor?channel=1&amp;subtype=0\n        (subtype=1 — sub-oqim)\nhodisa: GET /cgi-bin/eventManager.cgi\n        ?action=attach&amp;codes=[All]&amp;heartbeat=5\n        Digest auth</code></pre>\n<p>Mantiq Hikvision'ga o'xshaydi: ochiq HTTP ulanish, ichida matnli bloklar. <code>heartbeat=5</code> kamerani har 5 soniyada «tirikman» deb yozishga majbur qiladi. Adapter shu belgini kutadi: 15 soniya kelmasa, ulanish o'lik deb hisoblanadi va qayta ochiladi.</p>\n<h4>Hodisa kodlari</h4>\n<p><code>VideoMotion</code>, <code>AlarmLocal</code>, <code>VideoBlind</code>, aqlli tahlil kodlari. Adapterda kodlar jadvali bor: kod → <code>tur</code>. Jadvalda yo'q kod xom jadvalga yoziladi va ogohlantirish beradi, jim tashlab yuborilmaydi.</p>\n<h4>DSS yo'li</h4>\n<p>DSS Pro'ning integratsiya platformasi API, SDK va ONVIF orqali ochiladi. To'liq API hujjati Dahua hamkorlik portalida ro'yxatdan o'tganga beriladi.</p>\n<h4>Yetkazuvchidan so'raladi</h4>\n<ul><li>Quyosh-4G komplekti uyqu rejimida HTTP API'ga javob beradimi.</li>\n<li>HTTP API versiyasi va proshivka yangilanganda kodlar o'zgarishi.</li></ul>\n<p class='ogoh'>Hikvision va Dahua adapterlari kodining taxminan yarmi umumiy: multipart o'qish, qayta ulanish, Digest. Ikkinchisi birinchisidan tezroq yoziladi.</p>\n<p>Baho: 3–4 hafta, Hikvision'dan keyin 2–3 hafta.</p>", "manba": [["Dahua: Integration with DSS", "https://www.dahuasecurity.com/products/software/ecosystem/integration-with-dss"], ["Dahua Partner Alliances", "https://depp.dahuasecurity.com/integration"]], "ru": {"yorliq": "Для тимлида", "sarlavha": "Адаптер Dahua: eventManager и DSS", "tana": "<pre><code>video:  rtsp://KAM:554/cam/realmonitor?channel=1&amp;subtype=0\n        (subtype=1 — субпоток)\nhodisa: GET /cgi-bin/eventManager.cgi\n        ?action=attach&amp;codes=[All]&amp;heartbeat=5\n        Digest auth</code></pre>\n<p>Логика как у Hikvision: открытое HTTP-соединение с текстовыми блоками внутри. <code>heartbeat=5</code> заставляет камеру каждые 5 секунд сообщать «жива». Адаптер ждёт этот сигнал: если его нет 15 секунд, соединение считается мёртвым и открывается заново.</p>\n<h4>Коды событий</h4>\n<p><code>VideoMotion</code>, <code>AlarmLocal</code>, <code>VideoBlind</code>, коды интеллектуальной аналитики. В адаптере есть таблица «код → <code>tur</code>». Неизвестный код пишется в сырую таблицу и поднимает предупреждение, а не молча отбрасывается.</p>\n<h4>Путь через DSS</h4>\n<p>Интеграционная платформа DSS Pro открывается через API, SDK и ONVIF. Полную документацию по API выдают после регистрации на партнёрском портале Dahua.</p>\n<h4>Что спросить у поставщика</h4>\n<ul><li>Отвечает ли солнечный 4G-комплект на HTTP API в спящем режиме.</li>\n<li>Версия HTTP API и меняются ли коды при обновлении прошивки.</li></ul>\n<p class='ogoh'>Примерно половина кода адаптеров Hikvision и Dahua общая: разбор multipart, переподключение, Digest. Второй пишется быстрее первого.</p>\n<p>Оценка: 3–4 недели, после Hikvision — 2–3 недели.</p>"}},
  "s-adapter.reolink": {"yorliq": "Jamoa rahbarlari uchun", "sarlavha": "Reolink adapteri: Home Hub orqali", "tana": "<p>Batareyali Reolink kamerasi o'zi RTSP bermaydi. Oqim Home Hub orqali olinadi va u yerda qat'iy chegara bor.</p>\n<pre><code>rtsp://HUB:554/Preview_01_sub    (kanal 1, sub-oqim)\nrtsp://HUB:554/Preview_01_main\nPOST /cgi-bin/api.cgi?cmd=Login   → token\nPOST /cgi-bin/api.cgi?cmd=...&amp;token=...</code></pre>\n<h4>Cheklovlar</h4>\n<ul><li>Home Hub orqali har ko'rish sessiyasi 5 daqiqagacha. Keyin kamera uxlaydi, RTSP uziladi. Adapter oqimni qayta so'raydi, panel foydalanuvchiga buni ko'rsatadi.</li>\n<li>Uxlayotgan kamerani uyg'otish vaqt oladi: birinchi kadr darhol chiqmaydi.</li>\n<li>HTTP API hujjati ommaviy emas, ishlab chiqaruvchi so'rov bo'yicha beradi. Proshivka yangilanishi buyruqlarni o'zgartirishi mumkin.</li></ul>\n<h4>Hodisa</h4>\n<p>ONVIF hodisa obunasini qo'llaydigan modelda PullPoint ishlatiladi. Qolganida adapter harakat holatini API orqali so'rab turadi. So'rov oralig'i batareyani yeydi, shuning uchun uni pilotda o'lchab tanlaymiz.</p>\n<p class='ogoh'>Reolink uy va kichik ofis uchun yechim (01). Kamera −10 °C gacha ishlaydi, qishda bino ichiga qo'yiladi.</p>\n<p>Baho: 2–3 hafta.</p>", "manba": [["Reolink: Introduction to RTSP", "https://support.reolink.com/articles/900000630706-Introduction-to-RTSP/"], ["Reolink: 3rd-party software", "https://support.reolink.com/articles/360004441753-Can-Reolink-Battery-Powered-Cameras-Work-with-3rd-Party-Software/"]], "ru": {"yorliq": "Для тимлида", "sarlavha": "Адаптер Reolink: через Home Hub", "tana": "<p>Камера Reolink на батарее сама RTSP не отдаёт. Поток берётся через Home Hub, и там жёсткий предел.</p>\n<pre><code>rtsp://HUB:554/Preview_01_sub    (канал 1, субпоток)\nrtsp://HUB:554/Preview_01_main\nPOST /cgi-bin/api.cgi?cmd=Login   → token\nPOST /cgi-bin/api.cgi?cmd=...&amp;token=...</code></pre>\n<h4>Ограничения</h4>\n<ul><li>Через Home Hub каждая сессия просмотра длится до 5 минут. Потом камера засыпает, RTSP обрывается. Адаптер запрашивает поток заново, панель показывает это пользователю.</li>\n<li>Разбудить спящую камеру — это время: первый кадр появляется не сразу.</li>\n<li>Документация HTTP API не публичная, производитель выдаёт её по запросу. Обновление прошивки может изменить команды.</li></ul>\n<h4>События</h4>\n<p>На моделях с подпиской на события ONVIF используется PullPoint. На остальных адаптер опрашивает состояние движения через API. Частый опрос съедает батарею, поэтому интервал подбираем замерами на пилоте.</p>\n<p class='ogoh'>Reolink — решение для дома и небольшого офиса (01). Камера работает до −10 °C, зимой её ставят внутри здания.</p>\n<p>Оценка: 2–3 недели.</p>"}},
  "s-adapter.ajax": {"yorliq": "Jamoa rahbarlari uchun", "sarlavha": "Ajax: hubda ochiq lokal API yo'q", "tana": "<p>Ajax hubi bilan to'g'ridan-to'g'ri gaplashadigan ochiq lokal API yo'q. Tanlov ikki yo'l orasida.</p>\n<h4>1. SIA DC-09, bulutsiz</h4>\n<p>Hub hodisani bankning qabul qiluvchisiga o'zi yuboradi, Ajax Cloud orqali emas. Buning uchun hub proshivkasi OS Malevich 2.7 yoki yangiroq bo'lishi kerak. Sozlash Ajax ilovasida: kuzatuv stansiyasi, protokol SIA DC-09, asosiy va zaxira IP.</p>\n<ul><li>MKB tomonida DC-09 qabul qiluvchi yoziladi: TCP yoki UDP, shifrlash kaliti bilan.</li>\n<li>Faqat hodisa kodlari keladi. Hubdan foto tasdiq bu yo'l bilan uzatilmaydi, shuning uchun video alohida IP kameradan olinadi.</li></ul>\n<h4>2. Enterprise API, bulut orqali</h4>\n<p>Hub sozlamalari, hodisalar lentasi, qo'riqlash rejimi va rele boshqaruvi. Lekin Ajax uni minglab tizimga xizmat qiladigan yirik xavfsizlik kompaniyalariga beradi. Bank 267 obyekt bilan bu shartga to'g'ri kelmasligi mumkin.</p>\n<h4>Bank qaror qiladi</h4>\n<ul><li>Buyruq (rele, qo'riqlash rejimi) kerakmi. Kerak bo'lmasa, DC-09 yetadi.</li>\n<li>Qo'riqlash departamenti pulti ham ulanadimi: hub ikkinchi manzilga ham hodisa yubora oladi.</li></ul>\n<p>Baho: DC-09 qabul qiluvchi 2–3 hafta.</p>", "manba": [["Ajax: SIA DC-09", "https://support.ajax.systems/en/how-to-use-sia-for-cms-connection/"], ["Ajax: Enterprise API", "https://ajax.systems/blog/enterprise-api/"]], "ru": {"yorliq": "Для тимлида", "sarlavha": "Ajax: открытого локального API на хабе нет", "tana": "<p>Открытого локального API для прямой работы с хабом Ajax нет. Выбирать приходится из двух путей.</p>\n<h4>1. SIA DC-09, без облака</h4>\n<p>Хаб сам отправляет события на приёмник банка, минуя Ajax Cloud. Нужна прошивка хаба OS Malevich 2.7 или новее. Настройка в приложении Ajax: станция мониторинга, протокол SIA DC-09, основной и резервный IP.</p>\n<ul><li>На стороне MKB пишется приёмник DC-09: TCP или UDP, с ключом шифрования.</li>\n<li>Приходят только коды событий. Фотоподтверждение с хаба этим путём не передаётся, поэтому видео берётся с отдельной IP-камеры.</li></ul>\n<h4>2. Enterprise API, через облако</h4>\n<p>Настройки хаба, лента событий, режим охраны и управление реле. Но Ajax выдаёт его крупным охранным компаниям, обслуживающим тысячи систем. Банк с 267 объектами под это условие может не подойти.</p>\n<h4>Что решает банк</h4>\n<ul><li>Нужны ли команды (реле, режим охраны). Если нет — достаточно DC-09.</li>\n<li>Подключать ли пульт Департамента охраны: хаб умеет слать события и на второй адрес.</li></ul>\n<p>Оценка: приёмник DC-09 — 2–3 недели.</p>"}},
  "s-adapter.milesight": {"yorliq": "Jamoa rahbarlari uchun", "sarlavha": "Milesight: shlyuzning o'zida tarmoq serveri", "tana": "<p>UG65 shlyuzi ichida LoRaWAN tarmoq serveri bor. Tashqi server kerak emas: shlyuz datchik paketini dekodlaydi va tayyor JSON'ni MQTT yoki HTTP(S) orqali yuboradi.</p>\n<pre><code>Uplink (datchik → MKB):  mkb/AK-2025-0934/lorawan/uplink\nDownlink (MKB → datchik): mkb/AK-2025-0934/lorawan/downlink/$deveui\nTLS, mijoz sertifikati, QoS 1, retain, Last Will</code></pre>\n<h4>Adapter nima qiladi</h4>\n<ul><li>Brokerga obuna bo'ladi, <code>devEUI</code> ni reyestr orqali <code>qurilma_id</code> ga o'giradi.</li>\n<li>Datchik maydonlarini sxemaga keltiradi: eshik → <code>eshik</code>, tutun → <code>tutun</code>, batareya foizi → <code>batareya</code>.</li>\n<li>Shlyuz uzilsa, Last Will xabari «aloqa yo'q» hodisasiga aylanadi.</li></ul>\n<h4>Nega eng arzon</h4>\n<p>Protokol ochiq va hujjatlashtirilgan, video yo'q. Dekoder shlyuzda ishlaydi, adapterga faqat nomlarni moslash qoladi.</p>\n<div class='raqamlar'><div><b>2000+</b><span>datchik bitta shlyuzda</span></div><div><b>−40…70 °C</b><span>shlyuz ish harorati</span></div><div><b>1–2</b><span>hafta ish</span></div></div>", "manba": [["Milesight UG65 User Guide", "https://resource.milesight.com/milesight/iot/document/ug65-user-guide-en.pdf"], ["Milesight UG MQTT API", "https://resource.milesight.com/milesight/iot/document/ug-mqtt-api-documentation-en.pdf"]], "ru": {"yorliq": "Для тимлида", "sarlavha": "Milesight: сетевой сервер прямо в шлюзе", "tana": "<p>Внутри шлюза UG65 есть сетевой сервер LoRaWAN. Внешний сервер не нужен: шлюз декодирует пакет датчика и отправляет готовый JSON по MQTT или HTTP(S).</p>\n<pre><code>Uplink (датчик → MKB):  mkb/AK-2025-0934/lorawan/uplink\nDownlink (MKB → датчик): mkb/AK-2025-0934/lorawan/downlink/$deveui\nTLS, клиентский сертификат, QoS 1, retain, Last Will</code></pre>\n<h4>Что делает адаптер</h4>\n<ul><li>Подписывается на брокер и через реестр переводит <code>devEUI</code> в <code>qurilma_id</code>.</li>\n<li>Приводит поля датчика к схеме: дверь → <code>eshik</code>, дым → <code>tutun</code>, заряд → <code>batareya</code>.</li>\n<li>При обрыве шлюза сообщение Last Will превращается в событие «нет связи».</li></ul>\n<h4>Почему это самый дешёвый адаптер</h4>\n<p>Протокол открытый и документированный, видео нет. Декодер работает на шлюзе, адаптеру остаётся только сопоставить названия.</p>\n<div class='raqamlar'><div><b>2000+</b><span>датчиков на один шлюз</span></div><div><b>−40…70 °C</b><span>рабочая температура шлюза</span></div><div><b>1–2</b><span>недели работы</span></div></div>"}},
  "s-adapter.onvif": {"yorliq": "Jamoa rahbarlari uchun", "sarlavha": "ONVIF: umumiy adapter, lekin sinov shart", "tana": "<p>ONVIF brend adapteri yo'q kameralar uchun zaxira yo'l. U standart, lekin har ishlab chiqaruvchi uni o'zicha to'liq yoki qisman bajaradi.</p>\n<table><tr><th>Profil</th><th>Bizga nima beradi</th></tr>\n<tr><td>S</td><td>Video oqim manzili, PTZ, oddiy hodisalar</td></tr>\n<tr><td>T</td><td>H.265, harakat va buzish hodisalari, HTTPS</td></tr>\n<tr><td>G</td><td>Kamera ichidagi SD yozuvni qidirish va yuklab olish</td></tr>\n<tr><td>M</td><td>Tahlil metama'lumoti: odam, mashina, obyekt</td></tr></table>\n<h4>Hodisa olish</h4>\n<p>PullPoint obunasi: adapter <code>CreatePullPointSubscription</code> chaqiradi, keyin <code>PullMessages</code> bilan navbatdagi xabarlarni o'zi tortib oladi. Kamera adapterga ulanmaydi, shuning uchun NAT va 4G ortida ham ishlaydi.</p>\n<h4>Xarid shartiga yoziladi</h4>\n<ul><li>Model onvif.org saytidagi mos mahsulotlar ro'yxatida S va T profili bilan bo'lishi.</li>\n<li>Pilotdan oldin har model bizning sinov to'plamidan o'tadi: oqim, hodisa, vaqt sinxroni, qayta ulanish.</li></ul>\n<p class='ogoh'>«ONVIF qo'llaydi» degan yozuv yetarli emas. Profil va mos kelish hujjati so'raladi.</p>\n<p>Baho: 3–4 hafta, keyin har yangi model uchun 2–3 kun sinov.</p>", "manba": [["ONVIF Profiles", "https://www.onvif.org/profiles/"]], "ru": {"yorliq": "Для тимлида", "sarlavha": "ONVIF: универсальный адаптер, но с проверкой", "tana": "<p>ONVIF — запасной путь для камер, под которые нет брендового адаптера. Это стандарт, но каждый производитель реализует его полностью или частично.</p>\n<table><tr><th>Профиль</th><th>Что даёт нам</th></tr>\n<tr><td>S</td><td>Адрес видеопотока, PTZ, простые события</td></tr>\n<tr><td>T</td><td>H.265, события движения и вскрытия, HTTPS</td></tr>\n<tr><td>G</td><td>Поиск и выгрузка записи с SD-карты камеры</td></tr>\n<tr><td>M</td><td>Метаданные аналитики: человек, машина, объект</td></tr></table>\n<h4>Получение событий</h4>\n<p>Подписка PullPoint: адаптер вызывает <code>CreatePullPointSubscription</code>, затем сам забирает сообщения через <code>PullMessages</code>. Камера к адаптеру не подключается, поэтому схема работает и за NAT, и через 4G.</p>\n<h4>Что прописать в условиях закупки</h4>\n<ul><li>Модель есть в списке совместимых продуктов на onvif.org с профилями S и T.</li>\n<li>До пилота каждая модель проходит наш тестовый набор: поток, события, синхронизация времени, переподключение.</li></ul>\n<p class='ogoh'>Надписи «поддерживает ONVIF» недостаточно. Запрашиваются профиль и документ о соответствии.</p>\n<p>Оценка: 3–4 недели, затем 2–3 дня тестов на каждую новую модель.</p>"}},
  "s-adapter.quvur": {"yorliq": "Jamoa rahbarlari uchun", "sarlavha": "Adapter ichidagi to'rt bosqich", "tana": "<ol><li><b>Qabul.</b> Push bor joyda obuna (alertStream, eventManager, MQTT, DC-09), yo'q joyda so'rov. Uzilishda qayta ulanish oralig'i 1 soniyadan 60 soniyagacha oshadi.</li>\n<li><b>Normallashtirish.</b> Brend kodi → <code>tur</code>, qurilma raqami → <code>qurilma_id</code>, mahalliy vaqt → UTC. Noma'lum kod xom jadvalga tushadi va ogohlantirish beradi.</li>\n<li><b>Takrorni tashlash.</b> Kalit: brendning hodisa raqami, u bo'lmasa <code>qurilma_id + tur + vaqt</code> soniyagacha. Kalit 10 daqiqa keshda saqlanadi. Kamera bir harakatga ketma-ket 5 xabar yuborsa, operator bittasini ko'radi.</li>\n<li><b>Shinaga.</b> Hodisa navbatga yoziladi va shundan keyingina manbaga «qabul» deyiladi. Navbat: NATS, RabbitMQ yoki Kafka, jamoa qaysi birini yuritishiga qarab.</li></ol>\n<h4>Kechikkan hodisa</h4>\n<p>Aloqa tiklanganda shlyuz saqlangan hodisalarni yuboradi. Ular <code>kechikkan: true</code> bilan keladi: panel ularni tarixga yozadi, lekin operatorga signal sifatida ko'rsatmaydi. Aks holda bir soatlik uzilishdan keyin operatorga 200 ta eski signal yog'iladi.</p>\n<h4>Kuzatuv</h4>\n<p>Har adapter o'lchov beradi: soniyadagi hodisa, xato, qayta ulanish, navbat uzunligi. Adapter 5 daqiqa jim bo'lsa, navbatchiga xabar ketadi.</p>", "manba": [], "ru": {"yorliq": "Для тимлида", "sarlavha": "Четыре этапа внутри адаптера", "tana": "<ol><li><b>Приём.</b> Где есть push — подписка (alertStream, eventManager, MQTT, DC-09), где нет — опрос. При обрыве пауза переподключения растёт от 1 до 60 секунд.</li>\n<li><b>Нормализация.</b> Код бренда → <code>tur</code>, номер устройства → <code>qurilma_id</code>, местное время → UTC. Неизвестный код уходит в сырую таблицу и поднимает предупреждение.</li>\n<li><b>Отсев дублей.</b> Ключ — номер события бренда, а если его нет — <code>qurilma_id + tur + vaqt</code> с точностью до секунды. Ключ хранится в кеше 10 минут. Камера шлёт 5 сообщений подряд на одно движение — оператор видит одно.</li>\n<li><b>В шину.</b> Событие пишется в очередь, и только после этого источнику отвечают «принято». Очередь — NATS, RabbitMQ или Kafka, в зависимости от того, что команда умеет сопровождать.</li></ol>\n<h4>Запоздавшие события</h4>\n<p>После восстановления связи шлюз досылает сохранённые события. Они приходят с <code>kechikkan: true</code>: панель пишет их в историю, но не показывает оператору как тревогу. Иначе после часового обрыва на оператора обрушатся 200 старых сигналов.</p>\n<h4>Наблюдаемость</h4>\n<p>Каждый адаптер отдаёт метрики: события в секунду, ошибки, переподключения, длина очереди. Если адаптер молчит 5 минут, дежурный получает уведомление.</p>"}},
  "s-adapter.sinov": {"yorliq": "Jamoa rahbarlari uchun", "sarlavha": "Adapter qachon qabul qilinadi", "tana": "<p>Adapter kod yozilgani uchun emas, uch sinovdan o'tgani uchun qabul qilinadi.</p>\n<h4>1. Shartnoma testi</h4>\n<p>Adapter chiqargan har xabar JSON Schema'ga qarshi tekshiriladi. Sxema o'zgarsa, eski adapterlarning hammasi CI'da qayta sinaladi.</p>\n<h4>2. Yozib olingan hodisalar</h4>\n<p>Pilot obyektidan haqiqiy oqim yoziladi: HTTP multipart, MQTT xabarlari, DC-09 paketlari. Keyin adapter shu yozuvlarda qurilmasiz sinaladi. Proshivka yangilansa, yangi yozuv olinadi va farq ko'rinadi.</p>\n<h4>3. Pilotda bir hafta</h4>\n<table><tr><th>Mezon</th><th>Chegara</th></tr>\n<tr><td>Yo'qolgan hodisa</td><td class='n'>0</td></tr>\n<tr><td>Ikki marta ko'ringan hodisa</td><td class='n'>1% dan kam</td></tr>\n<tr><td>4G uzilgandan keyin qayta ulanish</td><td class='n'>60 s dan tez</td></tr>\n<tr><td>Adapterdan panelgacha, p95</td><td class='n'>5 s dan kam</td></tr></table>\n<h4>Yuklama</h4>\n<p>Simulyator 100 obyekt va 400 qurilmani taqlid qiladi: har biri kuniga 30 hodisa, soat 07:00 da hammasi birdaniga. Navbat va baza shu cho'qqini ushlashi kerak.</p>\n<p class='ogoh'>Chegaralar taklif. Yakuniy qiymatlar pilot natijasi bilan SLA'ga yoziladi.</p>", "manba": [], "ru": {"yorliq": "Для тимлида", "sarlavha": "Когда адаптер считается принятым", "tana": "<p>Адаптер принимают не за то, что код написан, а за то, что он прошёл три проверки.</p>\n<h4>1. Контрактные тесты</h4>\n<p>Каждое сообщение адаптера проверяется против JSON Schema. При изменении схемы все прежние адаптеры заново прогоняются в CI.</p>\n<h4>2. Записанные события</h4>\n<p>С пилотного объекта записывается реальный трафик: HTTP multipart, сообщения MQTT, пакеты DC-09. Затем адаптер тестируется на этих записях без устройства. После обновления прошивки делается новая запись, и разница видна сразу.</p>\n<h4>3. Неделя на пилоте</h4>\n<table><tr><th>Критерий</th><th>Порог</th></tr>\n<tr><td>Потерянные события</td><td class='n'>0</td></tr>\n<tr><td>Задвоенные события</td><td class='n'>меньше 1%</td></tr>\n<tr><td>Переподключение после обрыва 4G</td><td class='n'>быстрее 60 с</td></tr>\n<tr><td>От адаптера до панели, p95</td><td class='n'>меньше 5 с</td></tr></table>\n<h4>Нагрузка</h4>\n<p>Симулятор изображает 100 объектов и 400 устройств: по 30 событий в сутки на каждое, а в 07:00 все разом. Очередь и база должны выдержать этот пик.</p>\n<p class='ogoh'>Пороги — предложение. Итоговые значения вносятся в SLA по результатам пилота.</p>"}},
  "s-video.kamera": {"yorliq": "Montajchi uchun", "sarlavha": "Kamerada ikki oqim sozlanadi", "tana": "<p>Kamera bir vaqtda ikki oqim beradi. Montajchi ikkalasini ham sozlab ketadi, standart zavod sozlamasi qoldirilmaydi.</p>\n<table><tr><th>Oqim</th><th>Qayerga</th><th>Sozlama</th></tr>\n<tr><td>Asosiy</td><td>SD karta</td><td>H.265, 1080p yoki 4 MP, 2 Mbit/s</td></tr>\n<tr><td>Sub</td><td>Operatorga jonli</td><td>H.264, 640×360 yoki 720p, 512 kbit/s</td></tr></table>\n<h4>Nega sub-oqim H.264</h4>\n<p>Brauzerlarning hammasi H.264'ni o'qiydi. H.265 WebRTC orqali hamma joyda ochilmaydi, uni o'girish esa serverda protsessor yeydi.</p>\n<h4>Montajda tekshiriladi</h4>\n<ul><li>Kalit kadr oralig'i 2 soniya: jonli video tez ochiladi.</li>\n<li>Ovoz o'chirilgan: trafik va maxfiylik.</li>\n<li>Vaqt NTP bo'yicha, mintaqa UTC+5. Kamera soati 2 daqiqadan ko'p adashsa, hodisa vaqti tuzatiladi va belgilanadi.</li>\n<li>Bulut (P2P) va UPnP o'chirilgan, zavod paroli almashtirilgan.</li>\n<li>4G yuqoriga tezligi joyida o'lchanadi. 1 Mbit/s dan past bo'lsa, sub-oqim 384 kbit/s ga tushiriladi.</li></ul>\n<p class='ogoh'>Batareyali kamera uxlaydi: oqim uyg'otilgandan keyin boshlanadi, birinchi kadr bir necha soniya kutiladi.</p>", "manba": [], "ru": {"yorliq": "Для монтажника", "sarlavha": "В камере настраиваются два потока", "tana": "<p>Камера одновременно отдаёт два потока. Монтажник настраивает оба, заводские значения не оставляются.</p>\n<table><tr><th>Поток</th><th>Куда</th><th>Настройка</th></tr>\n<tr><td>Основной</td><td>SD-карта</td><td>H.265, 1080p или 4 Мп, 2 Мбит/с</td></tr>\n<tr><td>Суб</td><td>Оператору в живом режиме</td><td>H.264, 640×360 или 720p, 512 кбит/с</td></tr></table>\n<h4>Почему субпоток H.264</h4>\n<p>H.264 читают все браузеры. H.265 через WebRTC открывается не везде, а перекодирование нагружает процессор сервера.</p>\n<h4>Что проверить при монтаже</h4>\n<ul><li>Интервал ключевых кадров 2 секунды: живое видео открывается быстро.</li>\n<li>Звук выключен: трафик и приватность.</li>\n<li>Время по NTP, часовой пояс UTC+5. Если часы камеры уходят больше чем на 2 минуты, время события исправляется и помечается.</li>\n<li>Облако (P2P) и UPnP отключены, заводской пароль заменён.</li>\n<li>Скорость 4G на отдачу замеряется на месте. Если меньше 1 Мбит/с, субпоток снижается до 384 кбит/с.</li></ul>\n<p class='ogoh'>Камера на батарее спит: поток начинается после пробуждения, первого кадра приходится ждать несколько секунд.</p>"}},
  "s-video.shlyuz": {"yorliq": "Jamoa rahbarlari uchun", "sarlavha": "Media shlyuz: oqim faqat tomoshabin bor paytda", "tana": "<p>Shlyuz kameradan RTSP oladi va uni kodlamasdan WebRTC yoki HLS ga qayta o'raydi. O'girish yo'q, shuning uchun protsessorga yuk kam.</p>\n<h4>MediaMTX misoli</h4>\n<pre><code>paths:\n  KAM-0007:\n    source: rtsp://10.20.7.11:554/Streaming/Channels/102\n    sourceOnDemand: yes     # tomoshabin kelganda ulanadi\nauthMethod: jwt\nauthJWTJWKS: https://api.mkb.local/.well-known/jwks.json</code></pre>\n<ul><li><code>sourceOnDemand</code>: kameraga faqat birinchi tomoshabin kelganda ulanadi, oxirgisi ketgach uziladi.</li>\n<li>JWT: shlyuz <code>/video/sessiya</code> bergan tokenni o'zi tekshiradi, har so'rovda API'ga murojaat qilmaydi.</li></ul>\n<h4>MediaMTX yoki go2rtc</h4>\n<p>Ikkalasi ham MIT litsenziyasida, bepul va kodi ochiq. MediaMTX yozish, arxivdan ijro va boshqaruv API'siga kuchli. go2rtc yengilroq, turli manbalarni yaxshi tushunadi. Pilotda bittasi tanlanadi, ikkinchisi zaxira.</p>\n<h4>Joylashuv va hajm</h4>\n<p>Bank data-markazida, VPN ichida, ikki nusxa. Kodlashsiz qayta o'rash yengil: bir necha o'nlab oqimga 4 vCPU'li virtual mashina yetishi kutiladi. Aniq son pilotda yuklama sinovi bilan o'lchanadi.</p>", "manba": [["MediaMTX", "https://github.com/bluenviron/mediamtx"], ["go2rtc", "https://github.com/AlexxIT/go2rtc"]], "ru": {"yorliq": "Для тимлида", "sarlavha": "Медиашлюз: поток есть, только пока есть зритель", "tana": "<p>Шлюз берёт RTSP с камеры и без перекодирования переупаковывает его в WebRTC или HLS. Перекодирования нет, поэтому нагрузка на процессор небольшая.</p>\n<h4>Пример для MediaMTX</h4>\n<pre><code>paths:\n  KAM-0007:\n    source: rtsp://10.20.7.11:554/Streaming/Channels/102\n    sourceOnDemand: yes     # подключаться при появлении зрителя\nauthMethod: jwt\nauthJWTJWKS: https://api.mkb.local/.well-known/jwks.json</code></pre>\n<ul><li><code>sourceOnDemand</code>: шлюз подключается к камере только с первым зрителем и отключается после ухода последнего.</li>\n<li>JWT: шлюз сам проверяет токен, выданный <code>/video/sessiya</code>, и не обращается к API на каждый запрос.</li></ul>\n<h4>MediaMTX или go2rtc</h4>\n<p>Оба под лицензией MIT, бесплатные, с открытым кодом. MediaMTX силён в записи, воспроизведении архива и API управления. go2rtc легче и хорошо понимает разнородные источники. На пилоте выбирается один, второй остаётся запасным.</p>\n<h4>Размещение и мощность</h4>\n<p>В дата-центре банка, внутри VPN, в двух экземплярах. Переупаковка без перекодирования лёгкая: на несколько десятков потоков ожидаемо хватит ВМ с 4 vCPU. Точную цифру даст нагрузочный тест на пилоте.</p>"}},
  "s-video.brauzer": {"yorliq": "Jamoa rahbarlari uchun", "sarlavha": "WebRTC jonli uchun, HLS arxiv uchun", "tana": "<table><tr><th></th><th>WebRTC</th><th>HLS</th></tr>\n<tr><td>Kechikish</td><td>1 soniyadan kam</td><td>bir necha soniya</td></tr>\n<tr><td>Vazifa</td><td>Jonli, domofon, eshik qarori</td><td>Arxiv, eksport, sekin tarmoq</td></tr>\n<tr><td>Tarmoq</td><td>UDP, kerak bo'lsa TURN</td><td>Oddiy HTTPS</td></tr></table>\n<h4>H.265 muammosi</h4>\n<p>Ko'p brauzer WebRTC orqali H.265 o'qimaydi. MediaMTX hujjatiga ko'ra Chrome buni faqat Windows'da va mos videokarta bo'lganda qiladi. go2rtc hujjati Chrome 136+ va Safari 18+ ni ko'rsatadi. Bank kompyuterlarida qaysi brauzer turgani oldindan ma'lum emas.</p>\n<h4>Qaror</h4>\n<ul><li>Jonli video: kameraning H.264 sub-oqimi, o'girishsiz.</li>\n<li>Kamera H.264 bera olmasa: faqat shu kamera uchun shlyuzda o'girish. Bu protsessorni ko'p yeydi, shuning uchun istisno.</li>\n<li>Arxiv klipi: markazda H.264 MP4 ga bir marta o'giriladi, asl fayl va uning xeshi o'zgarmaydi.</li></ul>\n<h4>Tarmoq</h4>\n<p>Operatorlar bank ichki tarmog'ida bo'lsa, TURN serveri shart emas. Mobil ilova tashqaridan ulanadigan bo'lsa, TURN bank perimetrida turadi.</p>", "manba": [["MediaMTX", "https://github.com/bluenviron/mediamtx"], ["go2rtc", "https://github.com/AlexxIT/go2rtc"]], "ru": {"yorliq": "Для тимлида", "sarlavha": "WebRTC для живого видео, HLS для архива", "tana": "<table><tr><th></th><th>WebRTC</th><th>HLS</th></tr>\n<tr><td>Задержка</td><td>меньше 1 секунды</td><td>несколько секунд</td></tr>\n<tr><td>Задача</td><td>Живое видео, домофон, решение по двери</td><td>Архив, экспорт, медленная сеть</td></tr>\n<tr><td>Сеть</td><td>UDP, при необходимости TURN</td><td>Обычный HTTPS</td></tr></table>\n<h4>Проблема H.265</h4>\n<p>Многие браузеры не воспроизводят H.265 через WebRTC. По документации MediaMTX Chrome делает это только в Windows и при подходящей видеокарте. В документации go2rtc указаны Chrome 136+ и Safari 18+. Какой браузер стоит на компьютерах банка, заранее не известно.</p>\n<h4>Решение</h4>\n<ul><li>Живое видео — субпоток камеры в H.264, без перекодирования.</li>\n<li>Если камера не умеет H.264 — перекодирование в шлюзе только для неё. Это дорого по процессору, поэтому исключение.</li>\n<li>Архивный клип один раз перекодируется в центре в H.264 MP4; исходный файл и его хеш не меняются.</li></ul>\n<h4>Сеть</h4>\n<p>Если операторы работают во внутренней сети банка, TURN-сервер не нужен. Если мобильное приложение подключается снаружи, TURN ставится на периметре банка.</p>"}},
  "s-video.hodisa": {"yorliq": "Texnik izoh", "sarlavha": "Faqat hodisa: hisob qanday chiqdi", "tana": "<p>Asos: kuniga 30 ta hodisa kadri va 10 ta qisqa klip. Bu taxmin, pilotda har obyekt turi uchun o'lchanadi.</p>\n<table><tr><th>Qism</th><th>Hisob</th><th>Kuniga</th></tr>\n<tr><td>Kadrlar</td><td>30 × 200 KB</td><td class='n'>6 MB</td></tr>\n<tr><td>Kliplar</td><td>10 × 2 MB</td><td class='n'>20 MB</td></tr>\n<tr><td>Jami</td><td>26 MB × 30 kun</td><td class='n'>780 MB</td></tr></table>\n<p>Oyiga taxminan 0,8 GB. Holat xabarlari (batareya, signal) kilobaytlarda, hisobga ta'sir qilmaydi. 4G va VPN ustki yuki uchun yana 10% qo'yiladi.</p>\n<h4>SIM uchun</h4>\n<ul><li>Faqat ma'lumot uchun korporativ SIM, yopiq APN bilan.</li>\n<li>Eng kichik oylik paket yetadi. Paket tugasa kamera jim qoladi, shuning uchun 80% sarfda ogohlantirish qo'yiladi.</li></ul>\n<h4>Quvvat uchun</h4>\n<p>Kamera kun bo'yi kutish rejimida, taxminan 80 mVt. Quyosh paneli va akkumulyator aynan shu rejimga hisoblanadi, shuning uchun dekabrda ham yetadi.</p>", "manba": [], "ru": {"yorliq": "Техническая справка", "sarlavha": "Только события: как получен расчёт", "tana": "<p>Основа: 30 кадров по событиям и 10 коротких клипов в сутки. Это допущение; на пилоте оно замеряется для каждого типа объекта.</p>\n<table><tr><th>Что</th><th>Расчёт</th><th>В сутки</th></tr>\n<tr><td>Кадры</td><td>30 × 200 КБ</td><td class='n'>6 МБ</td></tr>\n<tr><td>Клипы</td><td>10 × 2 МБ</td><td class='n'>20 МБ</td></tr>\n<tr><td>Итого</td><td>26 МБ × 30 дней</td><td class='n'>780 МБ</td></tr></table>\n<p>Около 0,8 ГБ в месяц. Сообщения о состоянии (заряд, сигнал) весят килобайты и на расчёт не влияют. На накладные расходы 4G и VPN добавляется ещё 10%.</p>\n<h4>Для SIM</h4>\n<ul><li>Корпоративная SIM только для данных, с закрытым APN.</li>\n<li>Хватает самого маленького месячного пакета. Если пакет закончится, камера замолчит, поэтому при расходе 80% ставится предупреждение.</li></ul>\n<h4>Для питания</h4>\n<p>Камера весь день в режиме ожидания, около 80 мВт. Солнечная панель и аккумулятор рассчитываются именно на этот режим, поэтому их хватает и в декабре.</p>"}},
  "s-video.talab": {"yorliq": "Texnik izoh", "sarlavha": "Talab bo'yicha: tavsiya etilgan rejim", "tana": "<p>Hodisa trafigiga operator ochgan jonli video qo'shiladi. Asos: kuniga o'rtacha 30 daqiqa, sub-oqim 512 kbit/s.</p>\n<pre><code>512 000 bit/s ÷ 8        = 64 000 bayt/s\n64 000 × 1 800 s         = 115 MB kuniga\n115 MB × 30 kun          = 3,46 GB oyiga\n0,78 GB + 3,46 GB        ≈ 4,3 GB oyiga</code></pre>\n<h4>Nazorat qanday ushlanadi</h4>\n<ul><li>Jonli sessiya 10 daqiqagacha, keyin operator uzaytiradi.</li>\n<li>Brauzer yorlig'i yashirilsa, oqim 30 soniyadan keyin to'xtaydi.</li>\n<li>Kamera oyiga 8 GB dan oshsa, panel ogohlantiradi: yo operator videoni ochiq qoldirgan, yo obyektda nimadir bo'layapti.</li></ul>\n<h4>Quvvat</h4>\n<p>Ishda kamera 1,85–7 Vt sarflaydi, kutishda 0,08 Vt. Kuniga yarim soat ish kunlik energiya sarfini sezilarli oshiradi, lekin panel va akkumulyator shu zaxira bilan tanlanadi.</p>\n<div class='raqamlar'><div><b>4,3 GB</b><span>bir kamera, oyiga</span></div><div><b>430 GB</b><span>100 kamera, oyiga</span></div></div>", "manba": [], "ru": {"yorliq": "Техническая справка", "sarlavha": "По запросу: рекомендуемый режим", "tana": "<p>К трафику событий добавляется живое видео, которое открывает оператор. Основа: в среднем 30 минут в сутки, субпоток 512 кбит/с.</p>\n<pre><code>512 000 бит/с ÷ 8        = 64 000 байт/с\n64 000 × 1 800 с         = 115 МБ в сутки\n115 МБ × 30 дней         = 3,46 ГБ в месяц\n0,78 ГБ + 3,46 ГБ        ≈ 4,3 ГБ в месяц</code></pre>\n<h4>Как держится лимит</h4>\n<ul><li>Живая сессия — до 10 минут, дальше оператор продлевает.</li>\n<li>Если вкладка браузера скрыта, поток останавливается через 30 секунд.</li>\n<li>Если камера превышает 8 ГБ в месяц, панель предупреждает: либо оператор оставил видео открытым, либо на объекте что-то происходит.</li></ul>\n<h4>Питание</h4>\n<p>В работе камера потребляет 1,85–7 Вт, в ожидании — 0,08 Вт. Полчаса работы в сутки заметно увеличивают суточный расход энергии, поэтому панель и аккумулятор подбираются с этим запасом.</p>\n<div class='raqamlar'><div><b>4,3 ГБ</b><span>одна камера в месяц</span></div><div><b>430 ГБ</b><span>100 камер в месяц</span></div></div>"}},
  "s-video.doimiy": {"yorliq": "Rahbariyat uchun", "sarlavha": "Doimiy video: nega tanlanmaydi", "tana": "<pre><code>64 000 bayt/s × 86 400 s = 5,53 GB kuniga\n5,53 GB × 30 kun         ≈ 166 GB oyiga</code></pre>\n<h4>Uch oqibat</h4>\n<ol><li><b>Aloqa.</b> Har kameraga oyiga 166 GB: cheksiz yoki juda katta tarif kerak. 100 kamera uchun markazga oyiga 16,6 TB kiradi.</li>\n<li><b>Quvvat.</b> Kamera kutish o'rniga doimo ishlaydi: 0,08 Vt emas, 1,85–7 Vt. Bu 23–87 barobar ko'p. Quyosh-4G komplekti dekabrda bunga chidamaydi.</li>\n<li><b>Saqlash.</b> 30 kunlik arxiv uchun markazda 16,6 TB disk, zaxira nusxa bilan ikki barobar.</li></ol>\n<h4>Qachon oqlanadi</h4>\n<p>Faqat elektrga qayta ulangan obyektda yoki klaster shkafi (yechim 10) LAN orqali bir necha obyektni birlashtirganda. Bunda ham yozuv joyidagi NVR'da, markazga faqat hodisa va so'ralgan video boradi.</p>\n<p class='ogoh'>Doimiy oqim tomosha qilinmaydi: 100 ta ekranni hech kim kuzatmaydi. Nazorat sifati hodisa filtri va javob tezligiga bog'liq.</p>", "manba": [], "ru": {"yorliq": "Для руководства", "sarlavha": "Непрерывное видео: почему его не выбираем", "tana": "<pre><code>64 000 байт/с × 86 400 с = 5,53 ГБ в сутки\n5,53 ГБ × 30 дней        ≈ 166 ГБ в месяц</code></pre>\n<h4>Три последствия</h4>\n<ol><li><b>Связь.</b> 166 ГБ в месяц на камеру — нужен безлимит или очень крупный тариф. Для 100 камер в центр приходит 16,6 ТБ в месяц.</li>\n<li><b>Питание.</b> Камера не ждёт, а работает постоянно: не 0,08 Вт, а 1,85–7 Вт. Это в 23–87 раз больше. Солнечный 4G-комплект в декабре такого не выдержит.</li>\n<li><b>Хранение.</b> Для архива на 30 дней в центре нужно 16,6 ТБ, с резервной копией вдвое больше.</li></ol>\n<h4>Когда оправдано</h4>\n<p>Только на объекте, заново подключённом к электросети, или когда кластерный шкаф (решение 10) объединяет несколько объектов по LAN. И даже тогда запись идёт на местный NVR, а в центр уходят только события и запрошенное видео.</p>\n<p class='ogoh'>Непрерывный поток никто не смотрит: за 100 экранами не уследить. Качество контроля определяют фильтр событий и скорость реакции.</p>"}},
  "s-video.sd": {"yorliq": "Montajchi uchun", "sarlavha": "SD karta: necha kunga yetadi", "tana": "<pre><code>128 000 000 000 bayt ÷ 64 000 bayt/s  = 2 000 000 s ≈ 23 kun\n128 000 000 000 bayt ÷ 250 000 bayt/s =   512 000 s ≈  6 kun</code></pre>\n<p>Birinchi qator 512 kbit/s, ikkinchisi 2 Mbit/s uzluksiz yozuv. Karta to'lganda eng eski yozuv ustidan yoziladi. Faqat hodisada yozilsa, karta oylarga yetadi.</p>\n<h4>Qanday karta olinadi</h4>\n<ul><li>Videokuzatuv uchun «high endurance» sinfidagi karta: oddiy karta uzluksiz yozuvda tez yeyiladi.</li>\n<li>Past harorat: kameraning ish diapazoniga mos, kamida −20 °C.</li>\n<li>Kamera qo'llaydigan maksimal hajm ko'rsatmada tekshiriladi.</li></ul>\n<h4>Montajda</h4>\n<ul><li>Karta kamerada formatlanadi, yozuv jadvali tekshiriladi.</li>\n<li>Kartaning holati (xato, to'lish) platformaga keladi. Xato ko'rsatsa, servis arizasi o'zi ochiladi.</li></ul>\n<p class='ogoh'>SD karta kamera bilan birga o'g'irlanishi mumkin. Shuning uchun hodisa klipi aloqa bo'lishi bilan markazga yuboriladi, karta faqat qo'shimcha nusxa.</p>", "manba": [], "ru": {"yorliq": "Для монтажника", "sarlavha": "SD-карта: на сколько дней хватит", "tana": "<pre><code>128 000 000 000 байт ÷ 64 000 байт/с  = 2 000 000 с ≈ 23 дня\n128 000 000 000 байт ÷ 250 000 байт/с =   512 000 с ≈  6 дней</code></pre>\n<p>Первая строка — непрерывная запись 512 кбит/с, вторая — 2 Мбит/с. Когда карта заполняется, запись идёт поверх самой старой. Если писать только по событиям, карты хватает на месяцы.</p>\n<h4>Какую карту брать</h4>\n<ul><li>Класса «high endurance» для видеонаблюдения: обычная карта при непрерывной записи быстро изнашивается.</li>\n<li>По температуре — под рабочий диапазон камеры, не хуже −20 °C.</li>\n<li>Максимальный поддерживаемый объём проверяется по инструкции камеры.</li></ul>\n<h4>При монтаже</h4>\n<ul><li>Карта форматируется в камере, расписание записи проверяется.</li>\n<li>Состояние карты (ошибки, заполнение) приходит на платформу. При ошибке сервисная заявка открывается автоматически.</li></ul>\n<p class='ogoh'>SD-карту могут украсть вместе с камерой. Поэтому клип события уходит в центр сразу, как только есть связь, а карта — лишь дополнительная копия.</p>"}},
  "s-video.dalil": {"yorliq": "Texnik izoh", "sarlavha": "Dalil zanjiri: xesh qachon va kim tomonidan", "tana": "<p>Klip nizoda dalil bo'lishi uchun uning markazga kelgandan keyin o'zgarmaganini isbotlash kerak.</p>\n<ol><li>Adapter klipni kameradan yoki shlyuzdan oladi va o'sha zahoti SHA-256 xeshini hisoblaydi.</li>\n<li>Fayl o'zgartirib bo'lmaydigan omborga yoziladi (object lock yoki WORM rejimi).</li>\n<li>Jurnalga xesh, qabul vaqti, manba qurilma va adapter versiyasi yoziladi.</li>\n<li>Har ko'rish va eksport ham jurnalga tushadi: kim, qachon, qaysi fayl.</li>\n<li>Eksportda manifest beriladi: fayl nomi va xeshi. Qabul qiluvchi xeshni o'zi hisoblab solishtiradi.</li></ol>\n<pre><code>sha256sum KAM-0007_20260921T063012Z.mp4\n9f2c41...d07e  KAM-0007_20260921T063012Z.mp4</code></pre>\n<h4>Chegarasi</h4>\n<p>Xesh markazga kelgandan keyingi yaxlitlikni isbotlaydi, kameradagi davrni emas. Ayrim kameralar yozuvga raqamli belgi qo'yadi. Bu imkoniyat yetkazuvchidan so'raladi va xarid shartiga yoziladi.</p>\n<p class='ogoh'>Klip saqlash muddati va sudga taqdim etish tartibi bank yuristlari bilan kelishiladi.</p>", "manba": [["NIST FIPS 180-4", "https://csrc.nist.gov/pubs/fips/180-4/upd1/final"]], "ru": {"yorliq": "Техническая справка", "sarlavha": "Цепочка доказательств: когда и кем считается хеш", "tana": "<p>Чтобы клип служил доказательством в споре, нужно показать, что после поступления в центр он не менялся.</p>\n<ol><li>Адаптер забирает клип с камеры или шлюза и сразу считает хеш SHA-256.</li>\n<li>Файл пишется в неизменяемое хранилище (object lock или режим WORM).</li>\n<li>В журнал заносятся хеш, время приёма, устройство-источник и версия адаптера.</li>\n<li>Каждый просмотр и экспорт тоже пишутся в журнал: кто, когда, какой файл.</li>\n<li>При экспорте прилагается манифест: имя файла и хеш. Получатель сам пересчитывает хеш и сверяет.</li></ol>\n<pre><code>sha256sum KAM-0007_20260921T063012Z.mp4\n9f2c41...d07e  KAM-0007_20260921T063012Z.mp4</code></pre>\n<h4>Ограничение</h4>\n<p>Хеш доказывает целостность с момента поступления в центр, но не период хранения на камере. Некоторые камеры ставят на запись цифровую метку. Эту возможность нужно запросить у поставщика и внести в условия закупки.</p>\n<p class='ogoh'>Срок хранения клипов и порядок их представления в суд согласуются с юристами банка.</p>"}},
  "s-arx.ustun1": {"yorliq": "Montajchi uchun", "sarlavha": "Obyektdagi qurilmaga talablar", "tana": "<p>Platforma istalgan kamerani qabul qilmaydi. Montajdan oldin har model shu ro'yxat bo'yicha tekshiriladi.</p>\n<table><tr><th>Qurilma</th><th>Majburiy</th></tr>\n<tr><td>IP kamera</td><td>ONVIF Profile S yoki T, RTSP, ikki oqim, SD karta, −20 °C</td></tr>\n<tr><td>Domofon</td><td>SIP yoki ONVIF, rele chiqishi yoki kirish kontrolleriga ulanish</td></tr>\n<tr><td>Datchik</td><td>Quruq kontakt, Zigbee yoki LoRaWAN shlyuz orqali, Modbus</td></tr></table>\n<h4>Har qurilma uchun reyestrga</h4>\n<ul><li>Model, proshivka versiyasi, seriya raqami va MAC.</li>\n<li>SIM bo'lsa: ICCID va IMEI.</li>\n<li>O'rnatilgan joy surati va ko'rish burchagi.</li>\n<li>Obyekt kodi: <code>AK-2025/0934</code>, qurilma kodi: <code>KAM-0007</code>.</li></ul>\n<h4>Topshirishdan oldin</h4>\n<ul><li>Zavod paroli almashtirilgan, bulut (P2P) va UPnP o'chirilgan.</li>\n<li>Vaqt NTP bo'yicha to'g'ri.</li>\n<li>Platformada qurilma «aloqada» va sinov hodisasi kelgan.</li></ul>\n<p class='ogoh'>Bitta obyektga har xil brend aralashtirilmaydi: servis va zaxira qism oddiylashadi.</p>", "manba": [["ONVIF Profiles", "https://www.onvif.org/profiles/"]], "ru": {"yorliq": "Для монтажника", "sarlavha": "Требования к устройствам на объекте", "tana": "<p>Платформа принимает не любую камеру. Перед монтажом каждая модель проверяется по этому списку.</p>\n<table><tr><th>Устройство</th><th>Обязательно</th></tr>\n<tr><td>IP-камера</td><td>ONVIF Profile S или T, RTSP, два потока, SD-карта, −20 °C</td></tr>\n<tr><td>Домофон</td><td>SIP или ONVIF, релейный выход или подключение к контроллеру доступа</td></tr>\n<tr><td>Датчик</td><td>Сухой контакт, Zigbee или LoRaWAN через шлюз, Modbus</td></tr></table>\n<h4>В реестр по каждому устройству</h4>\n<ul><li>Модель, версия прошивки, серийный номер и MAC.</li>\n<li>Если есть SIM: ICCID и IMEI.</li>\n<li>Фото места установки и угол обзора.</li>\n<li>Код объекта: <code>AK-2025/0934</code>, код устройства: <code>KAM-0007</code>.</li></ul>\n<h4>Перед сдачей</h4>\n<ul><li>Заводской пароль заменён, облако (P2P) и UPnP отключены.</li>\n<li>Время по NTP верное.</li>\n<li>На платформе устройство «на связи», тестовое событие пришло.</li></ul>\n<p class='ogoh'>На одном объекте бренды не смешиваются: так проще сервис и запчасти.</p>"}},
  "s-arx.ustun2": {"yorliq": "Montajchi uchun", "sarlavha": "Mahalliy tugun: hodisani joyida ushlab turadi", "tana": "<p>Tugun obyektdagi qurilmalarni bitta chiqish nuqtasiga yig'adi. Aloqa uzilsa, hodisa shu yerda kutib turadi.</p>\n<table><tr><th>Qism</th><th>Vazifa</th><th>Nimaga qaraladi</th></tr>\n<tr><td>Home Hub</td><td>Batareyali kameralar uchun shlyuz</td><td>RTSP berishi, 5 daqiqalik sessiya</td></tr>\n<tr><td>NVR</td><td>Video arxiv</td><td>12 V DC ta'minot, disk hajmi, ONVIF</td></tr>\n<tr><td>4G router</td><td>Aloqa</td><td>Ikki SIM, VPN, watchdog, SNMP yoki API</td></tr></table>\n<h4>Router tanlash</h4>\n<ul><li>Ikki SIM va avtomatik almashish: birinchi operator tarmog'i yo'qolsa, ikkinchisi.</li>\n<li>IPsec, OpenVPN yoki WireGuard, sertifikat bilan.</li>\n<li>Osilib qolsa, o'zini qayta yuklaydi (watchdog).</li>\n<li>12 V DC kirish: LiFePO4 shkafidan to'g'ridan-to'g'ri, invertorsiz.</li></ul>\n<h4>Quvvat</h4>\n<p>Tugun uzluksiz ishlaydi va obyekt quvvat byudjetining asosiy qismini oladi. Sarfi yetkazuvchi hujjatidan olinadi va quvvat hisobiga kiritiladi.</p>\n<p class='ogoh'>Tugun qutisi qulflanadi va ochilish datchigi qo'yiladi: quti ochilsa, hodisa ketadi.</p>", "manba": [["Reolink: Introduction to RTSP", "https://support.reolink.com/articles/900000630706-Introduction-to-RTSP/"]], "ru": {"yorliq": "Для монтажника", "sarlavha": "Локальный узел: держит событие на месте", "tana": "<p>Узел собирает устройства объекта в одну точку выхода. Если связь пропала, событие ждёт здесь.</p>\n<table><tr><th>Часть</th><th>Задача</th><th>На что смотреть</th></tr>\n<tr><td>Home Hub</td><td>Шлюз для камер на батарее</td><td>Отдаёт ли RTSP, сессия 5 минут</td></tr>\n<tr><td>NVR</td><td>Видеоархив</td><td>Питание 12 В DC, объём диска, ONVIF</td></tr>\n<tr><td>4G-роутер</td><td>Связь</td><td>Две SIM, VPN, watchdog, SNMP или API</td></tr></table>\n<h4>Выбор роутера</h4>\n<ul><li>Две SIM с автоматическим переключением: пропала сеть первого оператора — работает второй.</li>\n<li>IPsec, OpenVPN или WireGuard, с сертификатом.</li>\n<li>При зависании перезагружается сам (watchdog).</li>\n<li>Вход 12 В DC: питание прямо от шкафа LiFePO4, без инвертора.</li></ul>\n<h4>Питание</h4>\n<p>Узел работает непрерывно и забирает основную часть энергобюджета объекта. Потребление берётся из документации поставщика и закладывается в расчёт питания.</p>\n<p class='ogoh'>Корпус узла запирается, на него ставится датчик вскрытия: открыли корпус — ушло событие.</p>"}},
  "s-arx.ustun3": {"yorliq": "Texnik izoh", "sarlavha": "Xavfsiz kanal: kamera internetga chiqmaydi", "tana": "<p>Asosiy qoida: obyektdagi hech bir qurilmaga internetdan ulanib bo'lmaydi. Port ochish va ishlab chiqaruvchi buluti (P2P) ishlatilmaydi.</p>\n<h4>Ikki variant</h4>\n<table><tr><th></th><th>Yopiq APN</th><th>VPN</th></tr>\n<tr><td>Qanday</td><td>Operator SIM'larni alohida yopiq tarmoqqa chiqaradi</td><td>Router bank shlyuziga shifrlangan tunnel ochadi</td></tr>\n<tr><td>Afzallik</td><td>Qurilma umuman internetni ko'rmaydi</td><td>Istalgan operator va SIM bilan ishlaydi</td></tr>\n<tr><td>Kerak</td><td>Operator bilan shartnoma</td><td>Router VPN qo'llashi</td></tr></table>\n<p>Ikkalasini birga ishlatish mumkin: yopiq APN ichida VPN. Ilova ma'lumoti ustidan yana TLS.</p>\n<h4>Holat nazorati</h4>\n<p>Router har 60 soniyada yurak urishini beradi. 3 daqiqa jimlikda obyekt «kechikmoqda», 15 daqiqada «aloqa yo'q» holatiga o'tadi. Signal kuchi dBm'da keladi: −105 dBm dan past bo'lsa, montajchi tashqi antenna qo'yadi yoki joyini o'zgartiradi.</p>\n<h4>Bank qaror qiladi</h4>\n<ul><li>Qaysi operator bilan yopiq APN shartnomasi tuziladi.</li>\n<li>VPN konsentratori qayerda turadi va uni kim yuritadi.</li></ul>", "manba": [], "ru": {"yorliq": "Техническая справка", "sarlavha": "Защищённый канал: камера не выходит в интернет", "tana": "<p>Главное правило: ни к одному устройству на объекте нельзя подключиться из интернета. Проброс портов и облако производителя (P2P) не используются.</p>\n<h4>Два варианта</h4>\n<table><tr><th></th><th>Закрытый APN</th><th>VPN</th></tr>\n<tr><td>Как</td><td>Оператор выводит SIM в отдельную закрытую сеть</td><td>Роутер поднимает шифрованный туннель к шлюзу банка</td></tr>\n<tr><td>Плюс</td><td>Устройство вообще не видит интернет</td><td>Работает с любым оператором и SIM</td></tr>\n<tr><td>Нужно</td><td>Договор с оператором</td><td>Поддержка VPN в роутере</td></tr></table>\n<p>Можно сочетать: VPN внутри закрытого APN. Поверх данных приложения — ещё TLS.</p>\n<h4>Контроль состояния</h4>\n<p>Роутер шлёт heartbeat каждые 60 секунд. Через 3 минуты тишины объект получает статус «задерживается», через 15 минут — «нет связи». Уровень сигнала приходит в дБм: ниже −105 дБм монтажник ставит внешнюю антенну или переносит её.</p>\n<h4>Что решает банк</h4>\n<ul><li>С каким оператором заключается договор на закрытый APN.</li>\n<li>Где стоит VPN-концентратор и кто его сопровождает.</li></ul>"}},
  "s-arx.ustun4": {"yorliq": "Jamoa rahbarlari uchun", "sarlavha": "Integratsiya yadrosi: bank yozadigan qism", "tana": "<p>Bank yoki pudratchi o'zi yozadigan yagona qism shu. Qolgani tayyor mahsulot yoki ochiq kodli komponent.</p>\n<table><tr><th>Xizmat</th><th>Vazifa</th><th>Asos</th></tr>\n<tr><td>Reyestr</td><td>Obyekt, qurilma, SIM, sertifikat</td><td>Mavjud MKB bazasi</td></tr>\n<tr><td>Adapterlar</td><td>Brend → yagona sxema</td><td>Har brendga alohida xizmat</td></tr>\n<tr><td>Media shlyuz</td><td>RTSP → WebRTC, HLS</td><td>MediaMTX yoki go2rtc</td></tr>\n<tr><td>Hodisa shinasi</td><td>Navbat, filtr, yo'naltirish</td><td>NATS, RabbitMQ yoki Kafka</td></tr>\n<tr><td>Buyruq xizmati</td><td>Eshik, PTZ, sirena, jurnal</td><td>O'z kodi</td></tr></table>\n<h4>Ish hajmi</h4>\n<p>Pilot uchun minimal yadro va 2–3 adapter 3–4 haftada yig'iladi. 100+ obyektga tayyor versiya: yuklama sinovi, ikki nusxada ishlash, monitoring, hujjat. Taxminiy baho: 3–4 kishilik jamoa uchun 3–4 oy.</p>\n<h4>Jamoa rahbari hal qiladi</h4>\n<ul><li>Navbat texnologiyasi: jamoa qaysi birini yurita oladi.</li>\n<li>Monolit yoki alohida xizmatlar. 100 obyekt uchun modulli monolit ham yetadi, adapterlar esa baribir alohida jarayon.</li></ul>", "manba": [["MediaMTX", "https://github.com/bluenviron/mediamtx"]], "ru": {"yorliq": "Для тимлида", "sarlavha": "Интеграционное ядро: то, что пишет банк", "tana": "<p>Ядро — единственная часть, которую банк или подрядчик пишет сам. Всё остальное — готовые продукты или компоненты с открытым кодом.</p>\n<table><tr><th>Сервис</th><th>Задача</th><th>Основа</th></tr>\n<tr><td>Реестр</td><td>Объект, устройство, SIM, сертификат</td><td>Существующая база MKB</td></tr>\n<tr><td>Адаптеры</td><td>Бренд → единая схема</td><td>Отдельный сервис на бренд</td></tr>\n<tr><td>Медиашлюз</td><td>RTSP → WebRTC, HLS</td><td>MediaMTX или go2rtc</td></tr>\n<tr><td>Шина событий</td><td>Очередь, фильтр, маршрутизация</td><td>NATS, RabbitMQ или Kafka</td></tr>\n<tr><td>Сервис команд</td><td>Дверь, PTZ, сирена, журнал</td><td>Собственный код</td></tr></table>\n<h4>Объём работ</h4>\n<p>Минимальное ядро и 2–3 адаптера для пилота собираются за 3–4 недели. Версия для 100+ объектов — это нагрузочные тесты, работа в двух экземплярах, мониторинг, документация. Ориентировочно 3–4 месяца для команды из 3–4 человек.</p>\n<h4>Что решает тимлид</h4>\n<ul><li>Технология очереди: какую команда сможет сопровождать.</li>\n<li>Монолит или отдельные сервисы. Для 100 объектов хватит модульного монолита, а адаптеры всё равно остаются отдельными процессами.</li></ul>"}},
  "s-arx.ustun5": {"yorliq": "Rahbariyat uchun", "sarlavha": "Interfeys: kim nimani ko'radi", "tana": "<p>Veb-panel, mobil ilova va hisobotlar bitta API'dan oziqlanadi. Yangi ekran qo'shish qurilma yoki adapterga tegmaydi.</p>\n<table><tr><th>Kim</th><th>Nima ko'radi</th></tr>\n<tr><td>Operator</td><td>Signal navbati, jonli video, eshik va sirena buyrug'i</td></tr>\n<tr><td>Filial xodimi</td><td>O'z hududi obyektlari, holat va xabarnoma</td></tr>\n<tr><td>Rahbariyat</td><td>Hisobot: nechta obyekt nazoratda, hodisa, javob vaqti, servis</td></tr>\n<tr><td>Auditor</td><td>Obyekt tarixi va eksport</td></tr></table>\n<h4>Xabarnoma</h4>\n<p>Mobil ilovaga faqat operator qarori kerak bo'lgan hodisa keladi: buzish, tutun, ish vaqtidan tashqari eshik. Batareya pasayishi servis navbatiga tushadi, telefonni bezovta qilmaydi.</p>\n<h4>Oylik hisobotda</h4>\n<ul><li>Obyektlarning necha foizi aloqada bo'lgan.</li>\n<li>Signaldan operator javobigacha o'rtacha vaqt.</li>\n<li>Yolg'on signal ulushi va servis tashriflari soni.</li></ul>\n<p>Veb-panel ekranlari <a data-slayd=\"#s-platforma\" href=\"#\">«Platforma» slaydida</a>.</p>\n<p class='ogoh'>Filial xodimi boshqa hudud obyektini ko'rmaydi. Bu ham maxfiylik, ham ortiqcha xabardan himoya.</p>", "manba": [], "ru": {"yorliq": "Для руководства", "sarlavha": "Интерфейс: кто что видит", "tana": "<p>Веб-панель, мобильное приложение и отчёты питаются от одного API. Новый экран не требует трогать устройства или адаптеры.</p>\n<table><tr><th>Кто</th><th>Что видит</th></tr>\n<tr><td>Оператор</td><td>Очередь тревог, живое видео, команды на дверь и сирену</td></tr>\n<tr><td>Сотрудник филиала</td><td>Объекты своего региона, состояние и уведомления</td></tr>\n<tr><td>Руководство</td><td>Отчёт: сколько объектов под контролем, события, время реакции, сервис</td></tr>\n<tr><td>Аудитор</td><td>История объекта и экспорт</td></tr></table>\n<h4>Уведомления</h4>\n<p>В мобильное приложение приходят только события, где нужно решение оператора: вскрытие, дым, открытие двери в нерабочее время. Низкий заряд уходит в сервисную очередь и телефон не беспокоит.</p>\n<h4>В месячном отчёте</h4>\n<ul><li>Какая доля объектов была на связи.</li>\n<li>Среднее время от тревоги до ответа оператора.</li>\n<li>Доля ложных тревог и число сервисных выездов.</li></ul>\n<p>Экраны веб-панели — на <a data-slayd=\"#s-platforma\" href=\"#\">слайде «Платформа»</a>.</p>\n<p class='ogoh'>Сотрудник филиала не видит объекты чужого региона. Это и конфиденциальность, и защита от лишних уведомлений.</p>"}},
  "s-arx.oqimlar1": {"yorliq": "Jamoa rahbarlari uchun", "sarlavha": "Video oqimi: ochilganda yoqiladi", "tana": "<p>Video markazga doimiy oqmaydi. Operator obyekt kartochkasini ochganda panel <code>POST /video/sessiya</code> chaqiradi, media shlyuz kameraga ulanadi va RTSP'ni WebRTC'ga o'raydi. Oyna yopilsa, shlyuz kameradan uziladi.</p>\n<h4>Raqamlar</h4>\n<div class='raqamlar'><div><b>0,8 GB</b><span>faqat hodisa, oyiga</span></div><div><b>4,3 GB</b><span>+30 daqiqa jonli</span></div><div><b>166 GB</b><span>doimiy oqim</span></div></div>\n<h4>Nega ONVIF ham yozilgan</h4>\n<p>ONVIF kameradan RTSP manzilini so'rash va PTZ boshqarish uchun. Oqimning o'zi baribir RTSP orqali keladi.</p>\n<p>Batafsil hisob va H.265 masalasi <a data-slayd=\"#s-video\" href=\"#\">«Video» slaydida</a>.</p>\n<h4>Kim qancha ko'radi</h4>\n<p>Bir kameraga bir vaqtda ikki tomoshabin. Uchinchisi kelsa, panel kim ko'rayotganini ko'rsatadi. 4G yuqoriga kanali ko'pincha 1–5 Mbit/s, ikki 512 kbit/s oqim unga sig'adi, beshtasi sig'maydi.</p>\n<p class='ogoh'>Arxivni ko'rish ham trafik: SD kartadagi yozuvni markazga tortish jonli video kabi hisoblanadi. Shuning uchun avval hodisa klipi ko'riladi, to'liq arxiv faqat kerak bo'lganda.</p>", "manba": [["MediaMTX", "https://github.com/bluenviron/mediamtx"]], "ru": {"yorliq": "Для тимлида", "sarlavha": "Видеопоток: включается при открытии", "tana": "<p>Видео не течёт в центр постоянно. Когда оператор открывает карточку объекта, панель вызывает <code>POST /video/sessiya</code>, медиашлюз подключается к камере и переупаковывает RTSP в WebRTC. Окно закрыли — шлюз отключается от камеры.</p>\n<h4>Цифры</h4>\n<div class='raqamlar'><div><b>0,8 ГБ</b><span>только события, в месяц</span></div><div><b>4,3 ГБ</b><span>+30 минут живого видео</span></div><div><b>166 ГБ</b><span>непрерывный поток</span></div></div>\n<h4>Зачем здесь ONVIF</h4>\n<p>ONVIF нужен, чтобы запросить у камеры адрес RTSP и управлять PTZ. Сам поток всё равно идёт по RTSP.</p>\n<p>Подробный расчёт и вопрос H.265 — на <a data-slayd=\"#s-video\" href=\"#\">слайде «Видео»</a>.</p>\n<h4>Кто и сколько смотрит</h4>\n<p>Не больше двух зрителей на камеру одновременно. Если приходит третий, панель показывает, кто уже смотрит. Канал 4G на отдачу обычно 1–5 Мбит/с: два потока по 512 кбит/с в него помещаются, пять — нет.</p>\n<p class='ogoh'>Просмотр архива — тоже трафик: выгрузка записи с SD-карты в центр считается как живое видео. Поэтому сначала смотрят клип события, а полный архив — только при необходимости.</p>"}},
  "s-arx.oqimlar2": {"yorliq": "Jamoa rahbarlari uchun", "sarlavha": "Hodisa oqimi: uch kanal, bitta sxema", "tana": "<p>Hodisa platformaga uch yo'l bilan kiradi va hammasi bir xil JSON'ga aylanadi.</p>\n<table><tr><th>Kanal</th><th>Kim ishlatadi</th></tr>\n<tr><td><code>POST /hodisa</code></td><td>Markazdagi adapterlar: Hikvision, Dahua, Reolink</td></tr>\n<tr><td>MQTT</td><td>Obyektdagi shlyuz: Milesight, klaster shkafi</td></tr>\n<tr><td>SIA DC-09</td><td>Ajax hubi, alohida qabul qiluvchi orqali</td></tr></table>\n<h4>Shinada nima bo'ladi</h4>\n<ol><li>Takrorlar olib tashlanadi.</li>\n<li>Qoida qo'llanadi: ish vaqtida eshik ochilishi signal emas, tunda signal.</li>\n<li>Yo'naltiriladi: operator navbati, servis navbati yoki faqat tarix.</li>\n<li>Webhook obunachilariga yuboriladi.</li></ol>\n<p>Maydonlar va xatolar <a data-slayd=\"#s-api\" href=\"#\">«API» slaydida</a>.</p>\n<h4>Qoidani kim yozadi</h4>\n<p>Qoidalar kodda emas, sozlamada: obyekt turi, ish vaqti, hodisa turi va jiddiylik darajasi. Ularni administrator o'zgartiradi, har o'zgarish jurnalga yoziladi.</p>\n<p class='ogoh'>Yolg'on signal ulushi har hafta ko'rib chiqiladi. U oshsa, operator signalga ko'nikib qoladi va haqiqiy buzishni o'tkazib yuboradi.</p>", "manba": [["MQTT 5.0 (OASIS)", "https://docs.oasis-open.org/mqtt/mqtt/v5.0/mqtt-v5.0.html"]], "ru": {"yorliq": "Для тимлида", "sarlavha": "Поток событий: три канала, одна схема", "tana": "<p>События попадают на платформу тремя путями, и все превращаются в один и тот же JSON.</p>\n<table><tr><th>Канал</th><th>Кто использует</th></tr>\n<tr><td><code>POST /hodisa</code></td><td>Адаптеры в центре: Hikvision, Dahua, Reolink</td></tr>\n<tr><td>MQTT</td><td>Шлюз на объекте: Milesight, кластерный шкаф</td></tr>\n<tr><td>SIA DC-09</td><td>Хаб Ajax, через отдельный приёмник</td></tr></table>\n<h4>Что происходит в шине</h4>\n<ol><li>Отсеиваются дубли.</li>\n<li>Применяются правила: открытие двери в рабочее время — не тревога, ночью — тревога.</li>\n<li>Маршрутизация: очередь оператора, сервисная очередь или только история.</li>\n<li>Рассылка подписчикам вебхуков.</li></ol>\n<p>Поля и ошибки — на <a data-slayd=\"#s-api\" href=\"#\">слайде «API»</a>.</p>\n<h4>Кто пишет правила</h4>\n<p>Правила живут не в коде, а в настройках: тип объекта, рабочее время, тип события и уровень важности. Меняет их администратор, каждое изменение пишется в журнал.</p>\n<p class='ogoh'>Долю ложных тревог разбирают каждую неделю. Если она растёт, оператор привыкает к сигналам и пропускает настоящее вскрытие.</p>"}},
  "s-arx.oqimlar3": {"yorliq": "Texnik izoh", "sarlavha": "Buyruq oqimi: har amal jurnalda", "tana": "<p>Buyruqlar ham bitta API orqali: <code>POST /buyruq</code>. Buyruq xizmati uni kerakli brend adapteriga beradi, adapter esa qurilma tilida bajaradi.</p>\n<table><tr><th>Amal</th><th>Qurilma</th><th>Xavfsizlik</th></tr>\n<tr><td>Eshik ochish</td><td>Rele yoki kirish kontrolleri</td><td>Oxirgi 60 s ichida video ko'rilgan, ikkinchi omil</td></tr>\n<tr><td>PTZ burish</td><td>Aylanuvchi kamera</td><td>Faqat operator</td></tr>\n<tr><td>Sirena va ovoz</td><td>Rele, karnay</td><td>Operator, 60 soniyagacha</td></tr>\n<tr><td>Qayta yuklash</td><td>Router, NVR</td><td>Faqat administrator</td></tr></table>\n<h4>Jurnalda</h4>\n<p>Kim, qachon, qaysi qurilmaga, qanday sabab bilan va natija. Eshik ochilganda o'sha paytdagi kadr ham saqlanadi.</p>\n<p class='ogoh'>Aloqa yo'q paytda buyruq navbatda kutmaydi: 30 soniyada javob bo'lmasa, «bajarilmadi» deb yopiladi. Kechikib ochilgan eshik xavfli.</p>\n<h4>Ikki xil qulf</h4>\n<p>Qulf turi eshik vazifasiga qarab tanlanadi. Tok uzilganda ochiladigan qulf evakuatsiya yo'lida turadi, yopiq qoladigani ombor va kassa xonasida. Buyruq xizmati qaysi turdagi qulf bilan ishlayotganini reyestrdan biladi.</p>", "manba": [], "ru": {"yorliq": "Техническая справка", "sarlavha": "Поток команд: каждое действие в журнале", "tana": "<p>Команды тоже идут через один API: <code>POST /buyruq</code>. Сервис команд передаёт её нужному адаптеру бренда, а адаптер выполняет на языке устройства.</p>\n<table><tr><th>Действие</th><th>Устройство</th><th>Безопасность</th></tr>\n<tr><td>Открыть дверь</td><td>Реле или контроллер доступа</td><td>Видео просмотрено за последние 60 с, второй фактор</td></tr>\n<tr><td>Поворот PTZ</td><td>Поворотная камера</td><td>Только оператор</td></tr>\n<tr><td>Сирена и голос</td><td>Реле, громкоговоритель</td><td>Оператор, до 60 секунд</td></tr>\n<tr><td>Перезагрузка</td><td>Роутер, NVR</td><td>Только администратор</td></tr></table>\n<h4>В журнале</h4>\n<p>Кто, когда, на какое устройство, с какой причиной и чем закончилось. При открытии двери сохраняется и кадр того момента.</p>\n<p class='ogoh'>При отсутствии связи команда не ждёт в очереди: если за 30 секунд нет ответа, она закрывается как «не выполнена». Дверь, открывшаяся с опозданием, — это риск.</p>\n<h4>Два типа замков</h4>\n<p>Тип замка выбирается по назначению двери. Замок, открывающийся при пропадании тока, ставят на путь эвакуации, запертый при обесточивании — на склад и кассу. Сервис команд знает из реестра, с каким замком работает.</p>"}},
  "s-arx.oqimlar4": {"yorliq": "Montajchi uchun", "sarlavha": "Telemetriya: qachon servisga chiqiladi", "tana": "<p>Qurilma holati servis rejasini belgilaydi: montajchi jadval bo'yicha emas, ko'rsatkich bo'yicha boradi.</p>\n<table><tr><th>Ko'rsatkich</th><th>Chegara</th><th>Nima bo'ladi</th></tr>\n<tr><td>Batareya</td><td class='n'>20% dan past</td><td>Servis arizasi, SLA 24–72 soat</td></tr>\n<tr><td>Signal</td><td class='n'>−105 dBm dan past</td><td>Antenna yoki operator almashtiriladi</td></tr>\n<tr><td>last_seen</td><td class='n'>15 daqiqadan eski</td><td>Operatorga «aloqa yo'q»</td></tr>\n<tr><td>SD karta</td><td class='n'>xato</td><td>Karta almashtiriladi</td></tr>\n<tr><td>Harorat</td><td class='n'>0 °C dan past</td><td>LiFePO4 zaryadi to'xtaganini tekshirish</td></tr></table>\n<h4>Nega harorat</h4>\n<p>LiFePO4 akkumulyatorini 0 °C dan past haroratda zaryadlab bo'lmaydi. BMS zaryadni to'xtatadi va quyosh bo'lsa ham zaxira kamayadi. Qishda bu signal servisni oldindan rejalashtirishga yordam beradi.</p>\n<p class='ogoh'>Chegaralar taklif, pilotda aniqlanadi.</p>\n<h4>Qanchalik tez-tez</h4>\n<p>Router holatni har daqiqada beradi, batareyali kamera uyg'onganda. Datchik batareyasi haftasiga bir marta hisobot beradi: bu uning 5 yillik resursini saqlaydi.</p>\n<p>Servis arizasi montajchiga obyekt kodi, qurilma, oxirgi ko'rsatkich va kerakli ehtiyot qism bilan keladi. Montajchi bo'sh qo'l bilan bormaydi.</p>", "manba": [], "ru": {"yorliq": "Для монтажника", "sarlavha": "Телеметрия: когда выезжать на сервис", "tana": "<p>Состояние устройств определяет план обслуживания: монтажник едет не по графику, а по показателям.</p>\n<table><tr><th>Показатель</th><th>Порог</th><th>Что происходит</th></tr>\n<tr><td>Заряд</td><td class='n'>ниже 20%</td><td>Сервисная заявка, SLA 24–72 часа</td></tr>\n<tr><td>Сигнал</td><td class='n'>ниже −105 dBm</td><td>Меняется антенна или оператор</td></tr>\n<tr><td>last_seen</td><td class='n'>старше 15 минут</td><td>Оператору: «нет связи»</td></tr>\n<tr><td>SD-карта</td><td class='n'>ошибка</td><td>Карта меняется</td></tr>\n<tr><td>Температура</td><td class='n'>ниже 0 °C</td><td>Проверить, не остановлен ли заряд LiFePO4</td></tr></table>\n<h4>Зачем температура</h4>\n<p>Аккумулятор LiFePO4 нельзя заряжать ниже 0 °C. BMS останавливает заряд, и запас тает даже при солнце. Зимой этот сигнал помогает спланировать выезд заранее.</p>\n<p class='ogoh'>Пороги — предложение, уточняются на пилоте.</p>\n<h4>Как часто</h4>\n<p>Роутер отчитывается раз в минуту, камера на батарее — при пробуждении. Датчик сообщает о заряде раз в неделю: так сохраняется его пятилетний ресурс.</p>\n<p>Сервисная заявка приходит монтажнику с кодом объекта, устройством, последним показателем и нужной запчастью. Монтажник не едет с пустыми руками.</p>"}},
  "s-savol.park1": {"yorliq": "Rahbariyat uchun", "sarlavha": "Yuzta kamera: operator nimani ko'radi", "tana": "<p>Jadval tartibi holat bo'yicha: avval «aloqa yo'q», keyin «batareya past», keyin qolgani. Muammosiz obyektlar ro'yxat oxirida turadi va operatorni chalg'itmaydi.</p>\n<h4>Holatlar qanday belgilanadi</h4>\n<ul><li><b>Aloqada:</b> oxirgi yurak urishi kutilgan oraliqda keldi.</li>\n<li><b>Batareya past:</b> 20% dan kam. Servis arizasi o'zi ochiladi.</li>\n<li><b>Aloqa yo'q:</b> 15 daqiqa davomida xabar kelmadi. Operator oxirgi kadrga qaraydi va kerak bo'lsa inspektor yuboradi.</li></ul>\n<h4>Operator yuklamasi</h4>\n<p>Taxminiy hisob: obyektga kuniga 3–5 hodisa bo'lsa, 100 obyektdan 300–500 ta keladi. Qoidalar ish vaqtidagi eshikni va takrorlarni olib tashlaydi, operatorga kuniga bir necha o'nta signal qoladi. Buni navbatchi smenasi ko'taradi. Aniq son pilotda o'lchanadi.</p>\n<div class='raqamlar'><div><b>1</b><span>ekran, 100 ta kartochka</span></div><div><b>0</b><span>doimiy video oqimi</span></div></div>\n<p>Kartochkani bosish obyekt sahifasini ochadi: oxirgi kadr, hodisalar tarixi va «videoni ochish» tugmasi.</p>", "manba": [], "ru": {"yorliq": "Для руководства", "sarlavha": "Сто камер: что видит оператор", "tana": "<p>Таблица сортируется по состоянию: сначала «нет связи», потом «низкий заряд», затем остальные. Объекты без проблем стоят в конце списка и не отвлекают оператора.</p>\n<h4>Как определяются состояния</h4>\n<ul><li><b>На связи:</b> последний heartbeat пришёл в ожидаемый интервал.</li>\n<li><b>Низкий заряд:</b> меньше 20%. Сервисная заявка открывается автоматически.</li>\n<li><b>Нет связи:</b> 15 минут без сообщений. Оператор смотрит последний кадр и при необходимости направляет инспектора.</li></ul>\n<h4>Нагрузка на оператора</h4>\n<p>Оценка: если на объект приходится 3–5 событий в сутки, со 100 объектов придёт 300–500. Правила отсекают открытия дверей в рабочее время и дубли, у оператора остаётся несколько десятков тревог в сутки. Это по силам дежурной смене. Точную цифру даст пилот.</p>\n<div class='raqamlar'><div><b>1</b><span>экран, 100 карточек</span></div><div><b>0</b><span>непрерывных видеопотоков</span></div></div>\n<p>Клик по карточке открывает страницу объекта: последний кадр, история событий и кнопка «открыть видео».</p>"}},
  "s-savol.tunfakt1": {"yorliq": "Texnik izoh", "sarlavha": "80 mVt va 1,85–7 Vt: farq qayerdan", "tana": "<p>Raqamlar Hikvision DS-2XS2T41G1-ID/4G quyosh-4G kamerasining datasheet'idan: kutishda 80 mVt, odatiy ishda 1,85 Vt, eng ko'pi 7 Vt.</p>\n<table><tr><th>Rejim</th><th>Quvvat</th><th>Sutkada</th></tr>\n<tr><td>Kutish</td><td class='n'>0,08 Vt</td><td class='n'>1,9 Vt·soat</td></tr>\n<tr><td>Doimiy ish</td><td class='n'>1,85 Vt</td><td class='n'>44,4 Vt·soat</td></tr>\n<tr><td>Eng ko'p yuklama</td><td class='n'>7 Vt</td><td class='n'>168 Vt·soat</td></tr></table>\n<p>Doimiy ish kutishdan kamida 23 barobar ko'p energiya oladi. Dekabrda Toshkentda quyosh kuniga 1,62 kVt·soat/m², iyundagidan 4,7 marta kam. Kichik panel bunday sarfni qishda qoplamaydi.</p>\n<h4>Xulosa loyiha uchun</h4>\n<ul><li>Kamera hodisada uyg'onadi, kadr va klipni yuboradi, yana uxlaydi.</li>\n<li>Jonli video operator so'raganda, qisqa muddatga.</li>\n<li>Akkumulyator zaryadi 0…45 °C da: qishda panel bo'lsa ham zaryad to'xtashi mumkin.</li></ul>\n<p class='ogoh'>Boshqa model tanlansa, bu hisob uning datasheet'i bilan qayta qilinadi: kutish va ish rejimi sarfi talab qilinadi.</p>", "manba": [], "ru": {"yorliq": "Техническая справка", "sarlavha": "80 мВт и 1,85–7 Вт: откуда разница", "tana": "<p>Цифры из datasheet солнечной 4G-камеры Hikvision DS-2XS2T41G1-ID/4G: в ожидании 80 мВт, в обычной работе 1,85 Вт, максимум 7 Вт.</p>\n<table><tr><th>Режим</th><th>Мощность</th><th>За сутки</th></tr>\n<tr><td>Ожидание</td><td class='n'>0,08 Вт</td><td class='n'>1,9 Вт·ч</td></tr>\n<tr><td>Постоянная работа</td><td class='n'>1,85 Вт</td><td class='n'>44,4 Вт·ч</td></tr>\n<tr><td>Пиковая нагрузка</td><td class='n'>7 Вт</td><td class='n'>168 Вт·ч</td></tr></table>\n<p>Постоянная работа требует минимум в 23 раза больше энергии, чем ожидание. В декабре в Ташкенте солнце даёт 1,62 кВт·ч/м² в сутки — в 4,7 раза меньше, чем в июне. Небольшая панель зимой такой расход не покроет.</p>\n<h4>Вывод для проекта</h4>\n<ul><li>Камера просыпается по событию, отправляет кадр и клип и снова засыпает.</li>\n<li>Живое видео — по запросу оператора и ненадолго.</li>\n<li>Заряд аккумулятора — при 0…45 °C: зимой он может остановиться даже при наличии панели.</li></ul>\n<p class='ogoh'>Если выбрана другая модель, расчёт повторяется по её datasheet: запрашивается потребление в ожидании и в работе.</p>"}},
  "s-savol.tunfakt2": {"yorliq": "Jamoa rahbarlari uchun", "sarlavha": "Home Hub'ning 5 daqiqalik chegarasi", "tana": "<p>Reolink rasmiy yordam sahifasiga ko'ra, Home Hub orqali batareyali Wi-Fi kameraning har ko'rish sessiyasi 5 daqiqagacha davom etadi. Keyin kamera uyquga ketadi va RTSP ulanishi uziladi. Davom ettirish uchun oqim qayta so'raladi.</p><p>Home Hub Pro monitoriga ulanganda esa chegara 3 daqiqa.</p>\n<h4>Dasturda qanday hisobga olinadi</h4>\n<ul><li>Media shlyuz uzilishni xato deb emas, kutilgan holat deb qabul qiladi.</li>\n<li>Panel operatorga qolgan vaqtni ko'rsatadi va «uzaytirish» tugmasini beradi.</li>\n<li>Uyquda turgan kamerani uyg'otish vaqt oladi: panel kutish belgisini ko'rsatadi.</li></ul>\n<h4>Nega bu yomon emas</h4>\n<p>Cheklov batareyani tejash uchun qo'yilgan. Bizning model baribir hodisaga qurilgan: operator voqeani ko'rish, qaror qilish va eshik buyrug'i uchun odatda bir necha daqiqa sarflaydi.</p>\n<p class='ogoh'>Uzoq kuzatuv kerak bo'lgan obyektga Reolink emas, doimiy quvvatli yechim tanlanadi: LiFePO4 shkafi yoki klaster.</p>", "manba": [["Reolink: Introduction to RTSP", "https://support.reolink.com/articles/900000630706-Introduction-to-RTSP/"]], "ru": {"yorliq": "Для тимлида", "sarlavha": "Пятиминутный предел Home Hub", "tana": "<p>По официальной справке Reolink, через Home Hub каждая сессия просмотра камеры на батарее с Wi-Fi длится до 5 минут. Затем камера засыпает, соединение RTSP рвётся. Чтобы продолжить, поток запрашивается заново.</p><p>При подключении к монитору Home Hub Pro предел — 3 минуты.</p>\n<h4>Как это учитывается в ПО</h4>\n<ul><li>Медиашлюз воспринимает обрыв не как ошибку, а как ожидаемое состояние.</li>\n<li>Панель показывает оператору оставшееся время и кнопку «продлить».</li>\n<li>Разбудить спящую камеру — это время: панель показывает ожидание.</li></ul>\n<h4>Почему это не страшно</h4>\n<p>Ограничение введено ради экономии батареи. Наша модель и так строится на событиях: чтобы увидеть происходящее, принять решение и дать команду на дверь, оператору обычно хватает нескольких минут.</p>\n<p class='ogoh'>Для объекта, где нужно долгое наблюдение, выбирают не Reolink, а решение с постоянным питанием: шкаф LiFePO4 или кластер.</p>"}},
  "s-savol.tunfakt3": {"yorliq": "Rahbariyat uchun", "sarlavha": "Xarid sharti: brend emas, mezon", "tana": "<p>Tender shartiga brend nomi emas, tekshiriladigan talablar yoziladi. Shunda Hikvision, Dahua va boshqalar bir-biri bilan raqobatlashadi.</p>\n<table><tr><th>Mezon</th><th>Qanday tekshiriladi</th></tr>\n<tr><td>ONVIF S yoki T</td><td>onvif.org dagi mos mahsulotlar ro'yxati</td></tr>\n<tr><td>Ochiq API</td><td>Hujjat taklif bilan birga topshiriladi</td></tr>\n<tr><td>Joyida yozuv</td><td>SD yoki NVR, aloqasiz 7 kun</td></tr>\n<tr><td>−20 °C</td><td>Datasheet va sertifikat; akkumulyator zaryadlash harorati alohida</td></tr>\n<tr><td>Bulutsiz ishlash</td><td>P2P o'chirilganda sinovdan o'tadi</td></tr>\n<tr><td>Yangilanish</td><td>Proshivka va zaiflik tuzatish siyosati</td></tr></table>\n<h4>Yangi mahsulotlar</h4>\n<p>Ugreen SynCare kabi yangi tizimlar kuzatiladi, lekin hali sotuvda yo'q: yetkazish 2027-yil yanvarda e'lon qilingan. Ishlash harorati e'lon qilinmagan. Sotuvga chiqqach, shu jadval bo'yicha baholanadi.</p>\n<p class='ogoh'>Yuzni tanish yoqilsa, O'RQ-1125 bo'yicha biometrik ma'lumot O'zbekistonda saqlanadi: xorijiy bulutga tayanadigan mahsulot bu funksiya bilan olinmaydi.</p>\n<p>Har mezon ball emas, «o'tdi yoki o'tmadi». Bittasidan o'tmagan model narxidan qat'i nazar olinmaydi.</p>", "manba": [["ONVIF Profiles", "https://www.onvif.org/profiles/"]], "ru": {"yorliq": "Для руководства", "sarlavha": "Условие закупки: не бренд, а критерии", "tana": "<p>В тендер пишется не название бренда, а проверяемые требования. Тогда Hikvision, Dahua и другие конкурируют между собой.</p>\n<table><tr><th>Критерий</th><th>Как проверяется</th></tr>\n<tr><td>ONVIF S или T</td><td>Список совместимых продуктов на onvif.org</td></tr>\n<tr><td>Открытый API</td><td>Документация прикладывается к предложению</td></tr>\n<tr><td>Локальная запись</td><td>SD или NVR, 7 дней без связи</td></tr>\n<tr><td>−20 °C</td><td>Datasheet и сертификат; температура заряда аккумулятора отдельно</td></tr>\n<tr><td>Работа без облака</td><td>Проверка с отключённым P2P</td></tr>\n<tr><td>Обновления</td><td>Политика прошивок и исправления уязвимостей</td></tr></table>\n<h4>Новые продукты</h4>\n<p>Новые системы вроде Ugreen SynCare отслеживаются, но в продаже их ещё нет: поставки объявлены на январь 2027 года. Рабочая температура не опубликована. После выхода в продажу продукт оценивается по этой же таблице.</p>\n<p class='ogoh'>Если включено распознавание лиц, по O'RQ-1125 биометрические данные хранятся в Узбекистане: продукт, завязанный на зарубежное облако, с этой функцией не берётся.</p>\n<p>Каждый критерий оценивается не баллами, а по принципу «прошёл или нет». Модель, не прошедшая хотя бы один, не берётся независимо от цены.</p>"}},
  "s-savol.kod1": {"yorliq": "Jamoa rahbarlari uchun", "sarlavha": "Bitta hodisa: kameradan panelgacha", "tana": "<p>Slayddagi misol qisqartirilgan. To'liq sxemada <code>hodisa_id</code>, <code>vaqt</code>, <code>klip_url</code> va <code>sha256</code> ham bor.</p>\n<pre><code>POST /api/v1/hodisa\n{ \"hodisa_id\": \"7f3c9a2e-...-41d0\",\n  \"obyekt_id\": \"AK-2025/0934\",\n  \"qurilma_id\": \"KAM-0007\",\n  \"tur\": \"harakat\",\n  \"vaqt\": \"2026-09-21T06:30:12Z\",\n  \"batareya\": 64, \"signal_dbm\": -89,\n  \"kadr_url\": \"dalil/0007/063012.jpg\" }\n→ 202 { \"holat\": \"qabul\" }</code></pre>\n<h4>Vaqt chizig'i</h4>\n<table><tr><th>Bosqich</th><th>Kutilgan vaqt</th></tr>\n<tr><td>Kamera uyg'onadi va kadr oladi</td><td class='n'>1–3 s</td></tr>\n<tr><td>4G orqali adapterga</td><td class='n'>1–2 s</td></tr>\n<tr><td>Normallashtirish va navbat</td><td class='n'>0,3 s dan kam</td></tr>\n<tr><td>Panelda kartochka yangilanadi</td><td class='n'>1 s dan kam</td></tr></table>\n<p>Jami bir necha soniya. Pilot mezoni: p95 5 soniyadan kam. Vaqtlar taxmin, pilotda o'lchanadi.</p>\n<p>Barcha maydonlar <a data-slayd=\"#s-api\" href=\"#\">«API» slaydida</a>.</p>\n<p class='ogoh'>Eng sekin qism kamera uyg'onishi va 4G. Signal −105 dBm dan past bo'lsa, vaqt bir necha barobar oshadi.</p>", "manba": [], "ru": {"yorliq": "Для тимлида", "sarlavha": "Одно событие: от камеры до панели", "tana": "<p>Пример на слайде сокращён. В полной схеме есть также <code>hodisa_id</code>, <code>vaqt</code>, <code>klip_url</code> и <code>sha256</code>.</p>\n<pre><code>POST /api/v1/hodisa\n{ \"hodisa_id\": \"7f3c9a2e-...-41d0\",\n  \"obyekt_id\": \"AK-2025/0934\",\n  \"qurilma_id\": \"KAM-0007\",\n  \"tur\": \"harakat\",\n  \"vaqt\": \"2026-09-21T06:30:12Z\",\n  \"batareya\": 64, \"signal_dbm\": -89,\n  \"kadr_url\": \"dalil/0007/063012.jpg\" }\n→ 202 { \"holat\": \"qabul\" }</code></pre>\n<h4>Хронология</h4>\n<table><tr><th>Этап</th><th>Ожидаемое время</th></tr>\n<tr><td>Камера просыпается и делает кадр</td><td class='n'>1–3 с</td></tr>\n<tr><td>По 4G до адаптера</td><td class='n'>1–2 с</td></tr>\n<tr><td>Нормализация и очередь</td><td class='n'>меньше 0,3 с</td></tr>\n<tr><td>Обновление карточки в панели</td><td class='n'>меньше 1 с</td></tr></table>\n<p>Итого несколько секунд. Критерий пилота — p95 меньше 5 секунд. Времена оценочные, на пилоте замеряются.</p>\n<p>Все поля — на <a data-slayd=\"#s-api\" href=\"#\">слайде «API»</a>.</p>\n<p class='ogoh'>Самые медленные звенья — пробуждение камеры и 4G. При сигнале ниже −105 дБм время вырастает в разы.</p>"}}
});

/* ---- dasturchiB ---- */
/* Dasturchilar guruhi B: s-masshtab, s-yol, s-kirish, s-uzilish batafsil yozuvlari. */
window.MKB_BATAFSIL = window.MKB_BATAFSIL || {};
Object.assign(window.MKB_BATAFSIL, {

  "s-masshtab.puls": {
    yorliq: "Jamoa rahbarlari uchun",
    sarlavha: "Heartbeat: qurilma tirikligini bilish",
    tana: "<p>Heartbeat qurilma yoki uning shlyuzi yuboradigan kichik xabar: «men aloqadaman». Undan faqat <code>last_seen</code> maydoni yangilanadi. Tarix bazaga yozilmaydi, aks holda 1 000 obyektda kuniga 5,76 mln keraksiz qator yig'ilardi.</p><table><tr><th>Obyekt</th><th>Qurilma</th><th>Soniyada</th><th>Kuniga</th></tr><tr><td>100</td><td class='n'>400</td><td class='n'>6,7</td><td class='n'>576 000</td></tr><tr><td>300</td><td class='n'>1 200</td><td class='n'>20</td><td class='n'>1 728 000</td></tr><tr><td>1 000</td><td class='n'>4 000</td><td class='n'>67</td><td class='n'>5 760 000</td></tr></table><h4>Qanday ishlaydi</h4><ul><li>MQTT'da bu protokolning o'z keepalive'i, HTTP'da <code>POST /puls</code>. Xabar hajmi taxminan 0,5 KB.</li><li><code>last_seen</code> xotiradagi keshda turadi va bazaga 5 daqiqada bir marta tushiriladi.</li><li>3 daqiqa jimlik — «kechikmoqda», 15 daqiqa — «aloqa yo'q» ogohlantirishi.</li></ul><p class='ogoh'>Batareyali kamera har daqiqada uyg'onsa, batareyasi haftalar ichida tugaydi. Uning o'rniga Home Hub yoki router heartbeat yuboradi, kamera holati esa hodisa bilan birga keladi.</p>",
    manba: [],
    ru: {
      yorliq: "Для тимлида",
      sarlavha: "Heartbeat: как понять, что устройство живо",
      tana: "<p>Heartbeat — короткое сообщение от устройства или его шлюза: «я на связи». Оно обновляет только поле <code>last_seen</code>. Историю в базу не пишем, иначе на 1 000 объектов набиралось бы 5,76 млн лишних строк в сутки.</p><table><tr><th>Объектов</th><th>Устройств</th><th>В секунду</th><th>В сутки</th></tr><tr><td>100</td><td class='n'>400</td><td class='n'>6,7</td><td class='n'>576 000</td></tr><tr><td>300</td><td class='n'>1 200</td><td class='n'>20</td><td class='n'>1 728 000</td></tr><tr><td>1 000</td><td class='n'>4 000</td><td class='n'>67</td><td class='n'>5 760 000</td></tr></table><h4>Как устроено</h4><ul><li>В MQTT это штатный keepalive протокола, в HTTP — <code>POST /puls</code>. Размер сообщения около 0,5 КБ.</li><li><code>last_seen</code> хранится в кэше в памяти и сбрасывается в базу раз в 5 минут.</li><li>3 минуты тишины — статус «задерживается», 15 минут — тревога «нет связи».</li></ul><p class='ogoh'>Если батарейная камера будет просыпаться каждую минуту, батарея сядет за несколько недель. Heartbeat за неё шлёт Home Hub или роутер, а состояние камеры приходит вместе с событием.</p>"
    }
  },

  "s-masshtab.hodisa": {
    yorliq: "Jamoa rahbarlari uchun",
    sarlavha: "Hodisa oqimi va uning cho'qqisi",
    tana: "<p>Hisobda har qurilmaga kuniga 30 ta hodisa olingan: harakat, eshik, batareya, aloqa. O'rtacha oqim juda kichik: 1 000 obyektda soniyasiga 1,4 ta. Tizim o'rtachaga emas, cho'qqiga, ya'ni 10 barobariga hisoblanadi.</p><table><tr><th>Obyekt</th><th>Kuniga</th><th>O'rtacha, /s</th><th>Cho'qqi, /s</th></tr><tr><td>100</td><td class='n'>12 000</td><td class='n'>0,14</td><td class='n'>1,4</td></tr><tr><td>300</td><td class='n'>36 000</td><td class='n'>0,42</td><td class='n'>4,2</td></tr><tr><td>1 000</td><td class='n'>120 000</td><td class='n'>1,4</td><td class='n'>14</td></tr></table><h4>Cho'qqi qayerdan keladi</h4><ul><li>Tong va shom: yorug'lik keskin o'zgaradi, harakat detektori ko'p ishlaydi.</li><li>Shamol, qor, daraxt soyasi — yolg'on signalning asosiy manbai.</li><li>Operator tarmog'i tiklanganda shlyuzlar to'plangan navbatni birdan yuboradi.</li></ul><h4>Himoya</h4><ul><li>Takror hodisa <code>qurilma_id + tur + vaqt</code> kaliti bo'yicha tashlab yuboriladi.</li><li>Navbatdan kelgan eski hodisa «kechikkan» belgisini oladi va operatorga jonli signal bo'lib chiqmaydi.</li><li>Bitta shlyuzdan soniyasiga 5 tadan ortiq xabar navbatda kutadi.</li></ul>",
    manba: [],
    ru: {
      yorliq: "Для тимлида",
      sarlavha: "Поток событий и его пик",
      tana: "<p>В расчёте на каждое устройство заложено 30 событий в сутки: движение, дверь, батарея, связь. Средний поток очень мал: на 1 000 объектов — 1,4 события в секунду. Систему считаем не по среднему, а по пику — в 10 раз выше.</p><table><tr><th>Объектов</th><th>В сутки</th><th>Среднее, /с</th><th>Пик, /с</th></tr><tr><td>100</td><td class='n'>12 000</td><td class='n'>0,14</td><td class='n'>1,4</td></tr><tr><td>300</td><td class='n'>36 000</td><td class='n'>0,42</td><td class='n'>4,2</td></tr><tr><td>1 000</td><td class='n'>120 000</td><td class='n'>1,4</td><td class='n'>14</td></tr></table><h4>Откуда берётся пик</h4><ul><li>Рассвет и закат: освещённость резко меняется, детектор движения срабатывает чаще.</li><li>Ветер, снег, тень от деревьев — главный источник ложных тревог.</li><li>После восстановления сети оператора шлюзы разом отправляют накопленную очередь.</li></ul><h4>Защита</h4><ul><li>Повторы отсекаются по ключу <code>qurilma_id + tur + vaqt</code>.</li><li>Старое событие из очереди получает метку «запоздало» и не выводится оператору как живая тревога.</li><li>Всё, что сверх 5 сообщений в секунду от одного шлюза, ждёт в очереди.</li></ul>"
    }
  },

  "s-masshtab.jonli": {
    yorliq: "Jamoa rahbarlari uchun",
    sarlavha: "Jonli video: nega 512 kbit/s va 4 oqim",
    tana: "<p>Operator bir vaqtda 4 tadan ortiq oqim ko'rmaydi: ekran 2×2 bo'linadi. Har oqim kameraning ikkinchi, kichik oqimi: 640×360 yoki 720p, 10–15 kadr/s, taxminan 512 kbit/s. Asosiy 4 MP oqim faqat arxivdan klip yuklashda kerak.</p><table><tr><th>Obyekt</th><th>Smenada operator</th><th>Oqim</th><th>Kanal</th></tr><tr><td>100</td><td class='n'>2</td><td class='n'>8</td><td class='n'>4,1 Mbit/s</td></tr><tr><td>300</td><td class='n'>4</td><td class='n'>16</td><td class='n'>8,2 Mbit/s</td></tr><tr><td>1 000</td><td class='n'>10</td><td class='n'>40</td><td class='n'>20,5 Mbit/s</td></tr></table><h4>Qoidalar</h4><ul><li>Bitta kamerani ikki operator ochsa, kameradan bitta oqim olinadi, media shlyuz uni ikkiga tarqatadi.</li><li>Tomoshabin qolmasa, oqim 60 soniyadan keyin yopiladi. Batareya va SIM trafigi shu bilan tejaladi.</li><li>Kameradan H.264 olinadi. H.265 brauzerda hamma joyda ochilmaydi, uni qayta kodlash esa har oqimga bitta protsessor yadrosi yeydi.</li></ul><p>SIM uchun hisob 23-slayddagi bilan bir xil: kuniga 30 daqiqa jonli ko'rish 115 MB, oyiga taxminan 3,5 GB.</p>",
    manba: [],
    ru: {
      yorliq: "Для тимлида",
      sarlavha: "Живое видео: почему 512 кбит/с и 4 потока",
      tana: "<p>Оператор одновременно смотрит не больше 4 потоков: экран делится 2×2. Каждый поток — второй, облегчённый поток камеры: 640×360 или 720p, 10–15 кадров/с, около 512 кбит/с. Основной поток 4 Мп нужен только при выгрузке клипа из архива.</p><table><tr><th>Объектов</th><th>Операторов в смене</th><th>Потоков</th><th>Канал</th></tr><tr><td>100</td><td class='n'>2</td><td class='n'>8</td><td class='n'>4,1 Мбит/с</td></tr><tr><td>300</td><td class='n'>4</td><td class='n'>16</td><td class='n'>8,2 Мбит/с</td></tr><tr><td>1 000</td><td class='n'>10</td><td class='n'>40</td><td class='n'>20,5 Мбит/с</td></tr></table><h4>Правила</h4><ul><li>Если одну камеру открыли два оператора, с камеры берётся один поток, а медиашлюз раздаёт его обоим.</li><li>Если зрителей не осталось, поток закрывается через 60 секунд — так экономятся батарея и трафик SIM.</li><li>С камеры берём H.264. H.265 открывается не во всех браузерах, а его перекодирование съедает по ядру процессора на поток.</li></ul><p>Расчёт для SIM тот же, что на слайде 23: 30 минут живого просмотра в день — 115 МБ, около 3,5 ГБ в месяц.</p>"
    }
  },

  "s-masshtab.telemetriya": {
    yorliq: "Jamoa rahbarlari uchun",
    sarlavha: "Telemetriya: TimescaleDB hypertable",
    tana: "<p>Har qurilma 5 daqiqada bir o'lchov yuboradi, bir qatorda: batareya, kuchlanish, signal, harorat, xotira bandligi. Kuniga 288 qator. Qator hajmi indeks bilan taxminan 100 bayt deb olingan.</p><table><tr><th>Obyekt</th><th>Qator/kun</th><th>Siqilmagan</th><th>Siqilgan</th><th>Yiliga</th></tr><tr><td>100</td><td class='n'>115 200</td><td class='n'>11,5 MB</td><td class='n'>1,2 MB</td><td class='n'>0,4 GB</td></tr><tr><td>300</td><td class='n'>345 600</td><td class='n'>35 MB</td><td class='n'>3,5 MB</td><td class='n'>1,3 GB</td></tr><tr><td>1 000</td><td class='n'>1 152 000</td><td class='n'>115 MB</td><td class='n'>12 MB</td><td class='n'>4,4 GB</td></tr></table><h4>Sxema</h4><pre><code>SELECT create_hypertable('telemetriya', 'vaqt',\n  chunk_time_interval =&gt; INTERVAL '1 day');\nALTER TABLE telemetriya SET (timescaledb.compress,\n  timescaledb.compress_segmentby = 'qurilma_id');\nSELECT add_compression_policy('telemetriya', INTERVAL '7 days');</code></pre><ul><li>Oxirgi 7 kun siqilmagan: grafik tez chiziladi.</li><li>Soatlik o'rtacha continuous aggregate bilan alohida saqlanadi, hisobot undan o'qiladi.</li></ul><p class='ogoh'>90% siqish — taxminiy baho. Sekin o'zgaradigan raqamlar yaxshi siqiladi, lekin aniq koeffitsiyent pilotda o'lchanadi.</p>",
    manba: [["TimescaleDB: siqish qanday ishlaydi", "https://www.tigerdata.com/docs/use-timescale/latest/compression/about-compression"]],
    ru: {
      yorliq: "Для тимлида",
      sarlavha: "Телеметрия: hypertable в TimescaleDB",
      tana: "<p>Каждое устройство раз в 5 минут присылает замер одной строкой: батарея, напряжение, сигнал, температура, заполнение памяти. Это 288 строк в сутки. Размер строки с индексом принят около 100 байт.</p><table><tr><th>Объектов</th><th>Строк/сутки</th><th>Без сжатия</th><th>Сжато</th><th>В год</th></tr><tr><td>100</td><td class='n'>115 200</td><td class='n'>11,5 МБ</td><td class='n'>1,2 МБ</td><td class='n'>0,4 ГБ</td></tr><tr><td>300</td><td class='n'>345 600</td><td class='n'>35 МБ</td><td class='n'>3,5 МБ</td><td class='n'>1,3 ГБ</td></tr><tr><td>1 000</td><td class='n'>1 152 000</td><td class='n'>115 МБ</td><td class='n'>12 МБ</td><td class='n'>4,4 ГБ</td></tr></table><h4>Схема</h4><pre><code>SELECT create_hypertable('telemetriya', 'vaqt',\n  chunk_time_interval =&gt; INTERVAL '1 day');\nALTER TABLE telemetriya SET (timescaledb.compress,\n  timescaledb.compress_segmentby = 'qurilma_id');\nSELECT add_compression_policy('telemetriya', INTERVAL '7 days');</code></pre><ul><li>Последние 7 дней не сжимаются — графики строятся быстро.</li><li>Почасовые средние хранятся отдельно в continuous aggregate, отчёты читают их.</li></ul><p class='ogoh'>Сжатие на 90% — оценка. Медленно меняющиеся значения жмутся хорошо, но точный коэффициент покажет пилот.</p>"
    }
  },

  "s-masshtab.dalil": {
    yorliq: "Moliya va huquq",
    sarlavha: "Kadr va klip: hajm, muddat, qonun",
    tana: "<p>Disk hajmini deyarli butunlay dalil fayllari belgilaydi. Hisob obyekt kesimida: kuniga taxminan 36 MB kadr va klip. Bu 23-slayddagi kamera hisobiga mos keladi: bitta kamera kuniga 26 MB, obyektda o'rtacha 1–2 kamera, datchiklar kadr bermaydi. Saqlash muddati 90 kun.</p><table><tr><th>Obyekt</th><th>Kuniga</th><th>90 kunda</th><th>Xom disk</th></tr><tr><td>100</td><td class='n'>3,6 GB</td><td class='n'>0,32 TB</td><td class='n'>1 TB</td></tr><tr><td>300</td><td class='n'>10,8 GB</td><td class='n'>0,97 TB</td><td class='n'>3 TB</td></tr><tr><td>1 000</td><td class='n'>36 GB</td><td class='n'>3,24 TB</td><td class='n'>8 TB</td></tr></table><p>Xom disk foydali hajmdan taxminan 2 barobar katta: MinIO fayllarni erasure coding bilan bo'laklab yozadi va bitta disk yoki server ishdan chiqsa ham ma'lumot yo'qolmaydi.</p><h4>Nega bank ichida</h4><ul><li>O'RQ-1125: biometrik ma'lumot O'zbekistonda saqlanadi. Yuzni tanish yoqilsa, kadrning o'zi biometrik ma'lumotga aylanadi.</li><li>Oddiy videoni shartlar bilan chetda saqlash mumkin, lekin ikki xil tartib yuritish qimmatroq.</li></ul><h4>Qaror kerak</h4><ul><li>90 kun yetadimi yoki sug'urta va sud uchun uzoqroq kerakmi.</li><li>Hodisaga «dalil» belgisi qo'yilsa, fayl Object Lock bilan qulflanadi va 90 kundan keyin ham o'chmaydi.</li></ul>",
    manba: [["MinIO: erasure coding", "https://docs.min.io/community/minio-object-store/operations/concepts/erasure-coding.html"]],
    ru: {
      yorliq: "Финансы и право",
      sarlavha: "Кадры и клипы: объём, срок, закон",
      tana: "<p>Объём дисков почти полностью определяют файлы-доказательства. Расчёт в разрезе объекта: около 36 МБ кадров и клипов в сутки. Это согласуется с расчётом по камере на слайде 23: одна камера — 26 МБ в сутки, на объекте в среднем 1–2 камеры, датчики кадров не дают. Срок хранения 90 дней.</p><table><tr><th>Объектов</th><th>В сутки</th><th>За 90 дней</th><th>Сырой диск</th></tr><tr><td>100</td><td class='n'>3,6 ГБ</td><td class='n'>0,32 ТБ</td><td class='n'>1 ТБ</td></tr><tr><td>300</td><td class='n'>10,8 ГБ</td><td class='n'>0,97 ТБ</td><td class='n'>3 ТБ</td></tr><tr><td>1 000</td><td class='n'>36 ГБ</td><td class='n'>3,24 ТБ</td><td class='n'>8 ТБ</td></tr></table><p>Сырой диск примерно вдвое больше полезного объёма: MinIO пишет файлы частями с erasure coding, и данные переживают отказ диска или сервера.</p><h4>Почему внутри банка</h4><ul><li>ЗРУ-1125: биометрические данные хранятся в Узбекистане. Если включить распознавание лиц, сам кадр становится биометрией.</li><li>Обычное видео при соблюдении условий можно хранить за рубежом, но вести два режима дороже.</li></ul><h4>Нужно решение</h4><ul><li>Хватит ли 90 дней или для страховой и суда нужен больший срок.</li><li>Если событию присвоена метка «доказательство», файл блокируется через Object Lock и не удаляется по истечении 90 дней.</li></ul>"
    }
  },

  "s-masshtab.kanal": {
    yorliq: "Texnik izoh",
    sarlavha: "Ma'lumot markaziga qancha kanal kerak",
    tana: "<p>Markazga uchta oqim keladi: jonli video, dalil fayllari va xizmat xabarlari. Xizmat xabarlari hisobga deyarli ta'sir qilmaydi: 1 000 obyektda heartbeat va telemetriya 1 Mbit/s ga ham yetmaydi.</p><table><tr><th>Obyekt</th><th>Video</th><th>Dalil, cho'qqi</th><th>Jami</th><th>×2 zaxira</th></tr><tr><td>100</td><td class='n'>4,1</td><td class='n'>3,3</td><td class='n'>7,4</td><td class='n'>15</td></tr><tr><td>300</td><td class='n'>8,2</td><td class='n'>10</td><td class='n'>18,2</td><td class='n'>36</td></tr><tr><td>1 000</td><td class='n'>20,5</td><td class='n'>33</td><td class='n'>53,5</td><td class='n'>110</td></tr></table><p>Mbit/s da. Dalil cho'qqisi kunlik o'rtacha yuklashning 10 barobari deb olingan.</p><h4>Tavsiya</h4><ul><li>Ikki provayderdan ikki kanal, har biri to'liq yukni ko'taradi.</li><li>Obyektlardan keladigan trafik operatorning yopiq APN'i yoki IPsec VPN orqali bankning VPN konsentratoriga tushadi. Konsentrator 1 000 ta tunnelni ko'tarishi tenderda alohida talab.</li><li>Operator ekrani va media shlyuz bank ichki tarmog'ida: operatorga uzatiladigan video tashqi kanalni band qilmaydi.</li></ul>",
    manba: [],
    ru: {
      yorliq: "Техническая справка",
      sarlavha: "Какой канал нужен в дата-центре",
      tana: "<p>В центр приходят три потока: живое видео, файлы-доказательства и служебные сообщения. Служебные почти не влияют на расчёт: heartbeat и телеметрия с 1 000 объектов не дотягивают и до 1 Мбит/с.</p><table><tr><th>Объектов</th><th>Видео</th><th>Доказательства, пик</th><th>Итого</th><th>×2 запас</th></tr><tr><td>100</td><td class='n'>4,1</td><td class='n'>3,3</td><td class='n'>7,4</td><td class='n'>15</td></tr><tr><td>300</td><td class='n'>8,2</td><td class='n'>10</td><td class='n'>18,2</td><td class='n'>36</td></tr><tr><td>1 000</td><td class='n'>20,5</td><td class='n'>33</td><td class='n'>53,5</td><td class='n'>110</td></tr></table><p>В Мбит/с. Пик выгрузки доказательств принят равным 10-кратной среднесуточной нагрузке.</p><h4>Рекомендация</h4><ul><li>Два канала от двух провайдеров, каждый тянет полную нагрузку.</li><li>Трафик с объектов идёт через закрытый APN оператора или IPsec VPN на VPN-концентратор банка. Способность концентратора держать 1 000 туннелей — отдельное требование в тендере.</li><li>Рабочие места операторов и медиашлюз — во внутренней сети банка: видео для операторов не занимает внешний канал.</li></ul>"
    }
  },

  "s-masshtab.server": {
    yorliq: "Texnik izoh",
    sarlavha: "Serverlar: har ustun uchun tarkib",
    tana: "<p>Hisob bank ma'lumot markazidagi virtual mashinalar uchun. Protsessorni hodisa oqimi emas, media shlyuz va baza yeydi.</p><table><tr><th>Rol</th><th>100</th><th>300</th><th>1 000</th></tr><tr><td>Ilova: gateway, adapter, broker</td><td class='n'>1 × 8/16</td><td class='n'>2 × 8/16</td><td class='n'>3 × 8/16</td></tr><tr><td>PostgreSQL</td><td class='n'>1 × 8/32</td><td class='n'>2 × 8/32</td><td class='n'>2 × 16/64</td></tr><tr><td>Media shlyuz</td><td class='n'>1 × 8/16</td><td class='n'>1 × 8/16</td><td class='n'>2 × 8/16</td></tr><tr><td>MinIO</td><td class='n'>media bilan</td><td class='n'>1 × 8/16</td><td class='n'>4 × 4/8</td></tr><tr><td>Monitoring</td><td class='n'>ilova bilan</td><td class='n'>ilova bilan</td><td class='n'>1 × 8/16</td></tr></table><p>Format: VM soni × vCPU/GB RAM. 100 ustunida MinIO media shlyuz bilan bitta VM'da turadi.</p><h4>Hisobga kirmagan</h4><ul><li>Test muhiti: ishchi muhitning taxminan uchdan biri.</li><li>Zaxira nusxa uchun alohida disk yoki ikkinchi maydon.</li><li>1 000 ustunida Kubernetes: ilova qismini qayta qurmasdan nusxa qo'shiladi.</li></ul><p class='ogoh'>Raqamlar hisob-kitobga asoslangan taxmin. Pilotda yuk sinovi o'tkazilib, 300 ustuni tasdiqlanadi yoki tuzatiladi.</p>",
    manba: [],
    ru: {
      yorliq: "Техническая справка",
      sarlavha: "Серверы: состав по каждому сценарию",
      tana: "<p>Расчёт для виртуальных машин в дата-центре банка. Процессор нагружает не поток событий, а медиашлюз и база.</p><table><tr><th>Роль</th><th>100</th><th>300</th><th>1 000</th></tr><tr><td>Приложение: gateway, адаптеры, брокер</td><td class='n'>1 × 8/16</td><td class='n'>2 × 8/16</td><td class='n'>3 × 8/16</td></tr><tr><td>PostgreSQL</td><td class='n'>1 × 8/32</td><td class='n'>2 × 8/32</td><td class='n'>2 × 16/64</td></tr><tr><td>Медиашлюз</td><td class='n'>1 × 8/16</td><td class='n'>1 × 8/16</td><td class='n'>2 × 8/16</td></tr><tr><td>MinIO</td><td class='n'>с медиашлюзом</td><td class='n'>1 × 8/16</td><td class='n'>4 × 4/8</td></tr><tr><td>Мониторинг</td><td class='n'>с приложением</td><td class='n'>с приложением</td><td class='n'>1 × 8/16</td></tr></table><p>Формат: число ВМ × vCPU/ГБ RAM. В сценарии на 100 объектов MinIO живёт на одной ВМ с медиашлюзом.</p><h4>Не вошло в расчёт</h4><ul><li>Тестовая среда: примерно треть от рабочей.</li><li>Отдельный диск или вторая площадка для резервных копий.</li><li>На 1 000 объектов — Kubernetes: экземпляры приложения добавляются без перестройки.</li></ul><p class='ogoh'>Цифры — расчётная оценка. На пилоте проводим нагрузочный тест и подтверждаем или корректируем сценарий на 300 объектов.</p>"
    }
  },

  "s-masshtab.gateway": {
    yorliq: "Jamoa rahbarlari uchun",
    sarlavha: "API gateway: bitta eshik, uchta tekshiruv",
    tana: "<p>Shlyuz, adapter, veb-panel va tashqi tizim platformaga faqat gateway orqali kiradi. Ichki xizmatlar tashqaridan ko'rinmaydi.</p><h4>Nimani tekshiradi</h4><ul><li><b>Kim:</b> qurilma va adapter bank CA imzolagan mijoz sertifikati bilan (mTLS), xodim bank AD'dan olingan token bilan.</li><li><b>Qancha:</b> so'rov limiti. Masalan, bitta shlyuzga soniyasiga 20 so'rov, bitta operatorga daqiqasiga 300. Oshsa 429 javobi.</li><li><b>Nima:</b> so'rov hajmi (kadr 2 MB gacha), sxema bo'yicha tekshiruv, noma'lum maydon rad etiladi.</li></ul><h4>Tanlov</h4><p>Bankda gateway allaqachon bo'lsa, o'shani ishlatamiz. Bo'lmasa — Kong, NGINX yoki Apache APISIX sinfidagi ochiq kodli yechim. Mezon: mTLS, limit va Prometheus metrikasi qutidan chiqishi kerak.</p><p class='ogoh'>Sertifikat muddati tugashi eng ko'p uchraydigan sabab: yuzlab shlyuz bir kunda uziladi. Monitoring muddati 30 kundan kam qolgan sertifikatlar ro'yxatini har kuni chiqaradi.</p>",
    manba: [],
    ru: {
      yorliq: "Для тимлида",
      sarlavha: "API gateway: одна дверь, три проверки",
      tana: "<p>Шлюзы, адаптеры, веб-панель и внешние системы заходят на платформу только через gateway. Внутренние сервисы снаружи не видны.</p><h4>Что проверяет</h4><ul><li><b>Кто:</b> устройство и адаптер — клиентским сертификатом, подписанным CA банка (mTLS), сотрудник — токеном из AD банка.</li><li><b>Сколько:</b> лимит запросов. Например, 20 запросов в секунду на шлюз и 300 в минуту на оператора. Сверх лимита — ответ 429.</li><li><b>Что:</b> размер запроса (кадр до 2 МБ), проверка по схеме, неизвестные поля отклоняются.</li></ul><h4>Выбор</h4><p>Если в банке gateway уже есть, используем его. Если нет — открытое решение класса Kong, NGINX или Apache APISIX. Критерий: mTLS, лимиты и метрики Prometheus из коробки.</p><p class='ogoh'>Самая частая авария — истёкший сертификат: в один день отваливаются сотни шлюзов. Мониторинг ежедневно выдаёт список сертификатов, у которых осталось меньше 30 дней.</p>"
    }
  },

  "s-masshtab.adapter": {
    yorliq: "Jamoa rahbarlari uchun",
    sarlavha: "Adapter ishchilari: har brend alohida",
    tana: "<p>Adapter ishlab chiqaruvchi protokolini yagona sxemaga o'giradi. Har brend alohida jarayon: Hikvision adapteri yiqilsa, Ajax hodisalari kelaveradi.</p><table><tr><th>Brend</th><th>Hodisa qanday keladi</th></tr><tr><td>Hikvision</td><td>ISAPI <code>alertStream</code>: har qurilmaga doimiy HTTP ulanish</td></tr><tr><td>Dahua</td><td><code>eventManager</code> obunasi yoki DSS orqali</td></tr><tr><td>Ajax</td><td>SIA DC-09 qabul qiluvchi</td></tr><tr><td>Reolink</td><td>Home Hub orqali ONVIF hodisalari</td></tr><tr><td>Milesight</td><td>LoRaWAN tarmoq serveridan MQTT</td></tr></table><h4>Masshtab</h4><ul><li>Ishchi holat saqlamaydi: qurilmalar <code>device_id</code> xeshi bo'yicha bo'linadi, yangi nusxa qo'shilsa ulush qayta taqsimlanadi.</li><li>Bitta ishchi taxminan 500–1 000 doimiy ulanishni ushlaydi. 4 000 qurilmaga 4–8 nusxa yetadi.</li><li>Har adapterga shartnoma testi: brend proshivkasi yangilansa, avval test muhitida tekshiriladi.</li></ul><p class='ogoh'>Vendordan so'raladi: hodisa API hujjati, proshivka yangilanganda API o'zgarmasligi kafolati va test uchun bitta qurilma.</p>",
    manba: [],
    ru: {
      yorliq: "Для тимлида",
      sarlavha: "Адаптеры: по процессу на бренд",
      tana: "<p>Адаптер переводит протокол производителя в единую схему. Каждый бренд — отдельный процесс: если упал адаптер Hikvision, события Ajax продолжают приходить.</p><table><tr><th>Бренд</th><th>Как приходит событие</th></tr><tr><td>Hikvision</td><td>ISAPI <code>alertStream</code>: постоянное HTTP-соединение на устройство</td></tr><tr><td>Dahua</td><td>подписка <code>eventManager</code> или через DSS</td></tr><tr><td>Ajax</td><td>приёмник SIA DC-09</td></tr><tr><td>Reolink</td><td>события ONVIF через Home Hub</td></tr><tr><td>Milesight</td><td>MQTT от сетевого сервера LoRaWAN</td></tr></table><h4>Масштабирование</h4><ul><li>Воркер не хранит состояние: устройства делятся по хешу <code>device_id</code>, при добавлении экземпляра доли перераспределяются.</li><li>Один воркер держит примерно 500–1 000 постоянных соединений. На 4 000 устройств хватит 4–8 экземпляров.</li><li>На каждый адаптер — контрактный тест: после обновления прошивки бренда всё сначала проверяется на тестовой среде.</li></ul><p class='ogoh'>Что запросить у вендора: документацию API событий, гарантию неизменности API при обновлении прошивки и одно устройство для тестов.</p>"
    }
  },

  "s-masshtab.broker": {
    yorliq: "Jamoa rahbarlari uchun",
    sarlavha: "RabbitMQ yoki Kafka: qaror bank standartida",
    tana: "<p>Broker adapter bilan iste'molchilar orasida turadi. Baza yoki xabarnoma xizmati to'xtasa, hodisa yo'qolmaydi, navbatda kutadi.</p><table><tr><th></th><th>RabbitMQ</th><th>Kafka</th></tr><tr><td>Bizning yuk</td><td>100 xabar/s gacha: yetarli</td><td>100 xabar/s gacha: yetarli</td></tr><tr><td>Kuchli tomoni</td><td>Yo'naltirish, dead-letter, sodda ekspluatatsiya</td><td>Uzoq saqlash, tarixni qayta o'qish</td></tr><tr><td>Klaster</td><td>3 tugun, quorum navbat</td><td>3 broker, replikatsiya 3</td></tr></table><h4>Qanday tanlanadi</h4><ul><li>Bankda qaysi biri ishlab turgan va uni kim kuzatadi — shu hal qiladi. Ikkinchi broker yangi ekspluatatsiya xarajati.</li><li>Hech biri bo'lmasa, RabbitMQ: bizning hajmda Kafka ortiqcha murakkablik.</li></ul><h4>Kelishuvlar</h4><ul><li>Xabar kaliti <code>obyekt_id</code>: bitta obyekt hodisalari tartib bilan qayta ishlanadi.</li><li>Uch marta qayta ishlanmagan xabar dead-letter navbatiga tushadi va navbatchiga ko'rinadi.</li><li>Navbat 10 000 xabardan oshsa, Grafana ogohlantiradi.</li></ul>",
    manba: [],
    ru: {
      yorliq: "Для тимлида",
      sarlavha: "RabbitMQ или Kafka: решает стандарт банка",
      tana: "<p>Брокер стоит между адаптерами и потребителями. Если база или сервис уведомлений остановились, событие не теряется, а ждёт в очереди.</p><table><tr><th></th><th>RabbitMQ</th><th>Kafka</th></tr><tr><td>Наша нагрузка</td><td>до 100 сообщ./с: достаточно</td><td>до 100 сообщ./с: достаточно</td></tr><tr><td>Сильная сторона</td><td>маршрутизация, dead-letter, простая эксплуатация</td><td>долгое хранение, повторное чтение истории</td></tr><tr><td>Кластер</td><td>3 узла, quorum-очереди</td><td>3 брокера, репликация 3</td></tr></table><h4>Как выбрать</h4><ul><li>Решает то, какой из них уже работает в банке и кто его сопровождает. Второй брокер — новые расходы на эксплуатацию.</li><li>Если нет ни одного — RabbitMQ: на наших объёмах Kafka даёт лишнюю сложность.</li></ul><h4>Договорённости</h4><ul><li>Ключ сообщения — <code>obyekt_id</code>: события одного объекта обрабатываются по порядку.</li><li>Сообщение, трижды не обработанное, уходит в dead-letter-очередь и видно дежурному.</li><li>Если очередь превышает 10 000 сообщений, Grafana подаёт сигнал.</li></ul>"
    }
  },

  "s-masshtab.baza": {
    yorliq: "Jamoa rahbarlari uchun",
    sarlavha: "PostgreSQL va TimescaleDB: bitta baza",
    tana: "<p>Reyestr, hodisa, buyruq jurnali va telemetriya bitta PostgreSQL klasterida. TimescaleDB — PostgreSQL kengaytmasi, alohida baza emas: zaxira nusxa, huquqlar va SQL bitta.</p><h4>Jadvallar</h4><ul><li><code>obyekt</code>, <code>qurilma</code> — reyestr, bank tizimidagi obyekt raqamiga bog'langan.</li><li><code>hodisa</code> — oylik bo'laklarga ajratilgan. 1 000 obyektda yiliga taxminan 44 mln qator.</li><li><code>telemetriya</code> — hypertable, 7 kundan keyin siqiladi.</li><li><code>audit</code> — faqat qo'shiladi, o'zgartirish va o'chirish huquqi hech kimda yo'q.</li></ul><h4>Ishonchlilik</h4><ul><li>Asosiy va replika, streaming replikatsiya. Patroni asosiy tugun tushsa 30 soniya ichida replikani ko'taradi.</li><li>Hisobot va Grafana so'rovlari replikadan o'qiydi, operator ekrani sekinlashmaydi.</li></ul><p class='ogoh'>Bank DBA bilan oldindan kelishiladi: PostgreSQL versiyasi, TimescaleDB kengaytmasiga ruxsat va uning litsenziyasi. Kengaytma ruxsat etilmasa, telemetriya oddiy bo'lakli jadvalda saqlanadi, disk sarfi taxminan 10 barobar oshadi.</p>",
    manba: [],
    ru: {
      yorliq: "Для тимлида",
      sarlavha: "PostgreSQL и TimescaleDB: одна база",
      tana: "<p>Реестр, события, журнал команд и телеметрия — в одном кластере PostgreSQL. TimescaleDB — расширение PostgreSQL, а не отдельная база: резервные копии, права и SQL общие.</p><h4>Таблицы</h4><ul><li><code>obyekt</code>, <code>qurilma</code> — реестр, привязан к номеру объекта в системе банка.</li><li><code>hodisa</code> — секционирована по месяцам. На 1 000 объектов около 44 млн строк в год.</li><li><code>telemetriya</code> — hypertable, сжимается через 7 дней.</li><li><code>audit</code> — только добавление, прав на изменение и удаление нет ни у кого.</li></ul><h4>Надёжность</h4><ul><li>Основной узел и реплика, потоковая репликация. При падении основного Patroni поднимает реплику за 30 секунд.</li><li>Отчёты и Grafana читают с реплики, экран оператора не тормозит.</li></ul><p class='ogoh'>С DBA банка заранее согласуются: версия PostgreSQL, допуск расширения TimescaleDB и его лицензия. Если расширение не разрешат, телеметрия хранится в обычной секционированной таблице, расход диска вырастет примерно в 10 раз.</p>"
    }
  },

  "s-masshtab.ombor": {
    yorliq: "Moliya va huquq",
    sarlavha: "MinIO: S3 ombori bank serverida",
    tana: "<p>Kadr va klip bazada emas, obyekt omborida. MinIO Amazon S3 bilan bir xil API beradi, lekin bankning o'z serverlarida ishlaydi: fayl mamlakatdan chiqmaydi.</p><h4>Sozlash</h4><ul><li>4 server, erasure coding: bitta server yoki bir nechta disk ishdan chiqsa ham fayl o'qiladi.</li><li>Lifecycle qoidasi: 90 kundan keyin fayl avtomatik o'chiriladi.</li><li>Dalil belgisi qo'yilgan fayl Object Lock bilan qulflanadi: muddat tugaguncha uni administrator ham o'chira olmaydi.</li><li>Veb-panel faylga to'g'ridan-to'g'ri kirmaydi, API 60 soniyalik imzolangan havola beradi.</li><li>Har fayl SHA-256 xeshi bazada: sudda faylning o'zgarmaganini ko'rsatish mumkin.</li></ul><h4>Yuristga savol</h4><p>MinIO'ning ochiq versiyasi AGPLv3 litsenziyasida. Bank ichki foydalanishi uchun bu odatda muammo emas, lekin litsenziya shartlari va tijorat obunasi zarurati bank yuristi bilan tekshiriladi. Muqobil: Ceph RGW yoki bankda mavjud S3 mos ombor.</p>",
    manba: [["MinIO: erasure coding", "https://docs.min.io/community/minio-object-store/operations/concepts/erasure-coding.html"]],
    ru: {
      yorliq: "Финансы и право",
      sarlavha: "MinIO: хранилище S3 на серверах банка",
      tana: "<p>Кадры и клипы хранятся не в базе, а в объектном хранилище. MinIO даёт тот же API, что Amazon S3, но работает на собственных серверах банка: файлы не покидают страну.</p><h4>Настройка</h4><ul><li>4 сервера, erasure coding: файл читается даже при отказе одного сервера или нескольких дисков.</li><li>Правило lifecycle: через 90 дней файл удаляется автоматически.</li><li>Файл с меткой «доказательство» блокируется через Object Lock: до конца срока его не удалит даже администратор.</li><li>Веб-панель не обращается к файлу напрямую: API выдаёт подписанную ссылку на 60 секунд.</li><li>SHA-256 каждого файла лежит в базе: в суде можно показать, что файл не менялся.</li></ul><h4>Вопрос юристу</h4><p>Открытая версия MinIO распространяется по лицензии AGPLv3. Для внутреннего использования в банке это обычно не проблема, но условия лицензии и необходимость коммерческой подписки проверяет юрист банка. Альтернатива — Ceph RGW или уже имеющееся в банке S3-совместимое хранилище.</p>"
    }
  },

  "s-masshtab.media": {
    yorliq: "Jamoa rahbarlari uchun",
    sarlavha: "Media shlyuz: video faqat so'ralganda",
    tana: "<p>Kamera RTSP beradi, brauzer esa RTSP'ni ochmaydi. Media shlyuz oqimni kameradan olib, operatorga WebRTC'da uzatadi, u ishlamasa HLS'da.</p><h4>Sessiya qanday ochiladi</h4><ol><li>Operator obyektni ochadi, veb-panel <code>POST /video/sessiya</code> chaqiradi.</li><li>API huquqni tekshiradi va 60 soniyalik token qaytaradi.</li><li>Shlyuz VPN orqali kameraga ulanadi va oqimni o'zgartirmasdan uzatadi.</li><li>Tomoshabin qolmasa, 60 soniyadan keyin kameradan uziladi.</li></ol><h4>Tanlov</h4><p>Ochiq kodli MediaMTX sinfidagi server yoki vendorning VMS'i. Mezon: RTSP kiritish, WebRTC chiqarish, token bilan kirish, Prometheus metrikasi.</p><ul><li>Qayta kodlash yo'q: bitta 8 yadroli VM o'nlab oqimni uzatadi.</li><li>Kamera H.265 bersa, kichik oqimi H.264 ga o'tkaziladi. Bu montajchi sozlash varag'idagi majburiy band.</li></ul><p class='ogoh'>Home Hub orqali RTSP sessiyasi taxminan 5 daqiqa bilan cheklangan. Shlyuz uzilishni xato deb emas, kutilgan holat deb ko'rsatadi va operatorga «davom ettirish» tugmasini beradi.</p>",
    manba: [],
    ru: {
      yorliq: "Для тимлида",
      sarlavha: "Медиашлюз: видео только по запросу",
      tana: "<p>Камера отдаёт RTSP, а браузер RTSP не открывает. Медиашлюз забирает поток с камеры и передаёт оператору по WebRTC, а если он не работает — по HLS.</p><h4>Как открывается сессия</h4><ol><li>Оператор открывает объект, веб-панель вызывает <code>POST /video/sessiya</code>.</li><li>API проверяет права и возвращает токен на 60 секунд.</li><li>Шлюз через VPN подключается к камере и передаёт поток без изменений.</li><li>Когда зрителей не осталось, через 60 секунд шлюз отключается от камеры.</li></ol><h4>Выбор</h4><p>Открытый сервер класса MediaMTX или VMS вендора. Критерии: вход RTSP, выход WebRTC, доступ по токену, метрики Prometheus.</p><ul><li>Без перекодирования: одна ВМ на 8 ядер передаёт десятки потоков.</li><li>Если камера выдаёт H.265, её дополнительный поток переводится в H.264. Это обязательный пункт в листе настройки монтажника.</li></ul><p class='ogoh'>Через Home Hub RTSP-сессия ограничена примерно 5 минутами. Шлюз показывает обрыв не как ошибку, а как ожидаемое состояние и даёт оператору кнопку «продолжить».</p>"
    }
  },

  "s-masshtab.sso": {
    yorliq: "Texnik izoh",
    sarlavha: "SSO: kirish bank AD orqali",
    tana: "<p>Platformada alohida parol bazasi yo'q. Xodim bank domen hisobi bilan kiradi, rol AD guruhidan olinadi. Xodim bankdan ketib, hisobi o'chirilsa, platformaga kirishi ham o'sha daqiqada yopiladi.</p><table><tr><th>AD guruhi</th><th>Rol</th><th>Nima qila oladi</th></tr><tr><td>MKB-Nazorat-Operator</td><td>Operator</td><td>Video, hodisa, eshik buyrug'i</td></tr><tr><td>MKB-Nazorat-Inspektor</td><td>Inspektor</td><td>Ko'rish va hisobot</td></tr><tr><td>MKB-Nazorat-Admin</td><td>Administrator</td><td>Qurilma va sozlama, videosiz</td></tr><tr><td>MKB-Nazorat-Audit</td><td>Auditor</td><td>Faqat jurnal</td></tr></table><h4>Texnik yo'l</h4><ul><li>OIDC: bankdagi ADFS yoki AD bilan federatsiya qilingan Keycloak.</li><li>Operator va administratorga ikki bosqichli tasdiq majburiy.</li><li>Sessiya 8 soat, harakatsizlikda 15 daqiqada qulflanadi.</li></ul><p class='ogoh'>Guruh nomlari misol. Rollar bo'linishi axborot xavfsizligi bo'limi bilan kelishiladi: administrator videoni ko'rmasligi shu kelishuvning bir qismi.</p><h4>Xizmat hisoblari</h4><p>Adapter va integratsiyalar odam hisobidan foydalanmaydi. Ularga alohida mijoz sertifikati beriladi va yiliga bir marta yangilanadi.</p>",
    manba: [],
    ru: {
      yorliq: "Техническая справка",
      sarlavha: "SSO: вход через AD банка",
      tana: "<p>Своей базы паролей у платформы нет. Сотрудник входит доменной учётной записью банка, роль берётся из группы AD. Если сотрудник уволился и учётку отключили, доступ к платформе закрывается в ту же минуту.</p><table><tr><th>Группа AD</th><th>Роль</th><th>Что может</th></tr><tr><td>MKB-Nazorat-Operator</td><td>Оператор</td><td>видео, события, команда на дверь</td></tr><tr><td>MKB-Nazorat-Inspektor</td><td>Инспектор</td><td>просмотр и отчёты</td></tr><tr><td>MKB-Nazorat-Admin</td><td>Администратор</td><td>устройства и настройки, без видео</td></tr><tr><td>MKB-Nazorat-Audit</td><td>Аудитор</td><td>только журнал</td></tr></table><h4>Техническая схема</h4><ul><li>OIDC: ADFS банка или Keycloak в федерации с AD.</li><li>Для оператора и администратора обязательна двухфакторная аутентификация.</li><li>Сессия 8 часов, при бездействии блокируется через 15 минут.</li></ul><p class='ogoh'>Имена групп — пример. Разделение ролей согласуется со службой информационной безопасности; то, что администратор не видит видео, — часть этого согласования.</p><h4>Сервисные учётки</h4><p>Адаптеры и интеграции не используют учётки людей. Им выдаётся отдельный клиентский сертификат, который обновляется раз в год.</p>"
    }
  },

  "s-masshtab.monitoring": {
    yorliq: "Texnik izoh",
    sarlavha: "Prometheus va Grafana: kim nimani ko'radi",
    tana: "<p>Kuzatuvning ikki qatlami bor: platformaning o'zi va obyektlardagi qurilmalar. Ikkalasi bitta Prometheus'ga yig'iladi, lekin ogohlantirish har xil odamga boradi.</p><table><tr><th>Nima</th><th>Chegara</th><th>Kimga</th></tr><tr><td>API javob vaqti</td><td>p95 &gt; 1 soniya</td><td>DevOps</td></tr><tr><td>Broker navbati</td><td>&gt; 10 000 xabar</td><td>DevOps</td></tr><tr><td>Disk bandligi</td><td>&gt; 80%</td><td>DevOps</td></tr><tr><td>Aloqasiz qurilma</td><td>&gt; 15 daqiqa</td><td>Operator</td></tr><tr><td>Batareya</td><td>&lt; 15%</td><td>Servis</td></tr><tr><td>Sertifikat muddati</td><td>&lt; 30 kun</td><td>DevOps</td></tr></table><h4>Nima beradi</h4><ul><li>Qurilma bo'yicha oylik uptime avtomatik hisoblanadi. Bosqich darvozasidagi va SLA'dagi 98% shu yerdan olinadi.</li><li>Alertmanager bitta muammo bo'yicha takror xabarlarni birlashtiradi: bitta mintaqada aloqa uzilsa, 200 ta emas, bitta xabar keladi.</li></ul><p>Bankda SIEM bo'lsa, xavfsizlik jurnallari unga ham yuboriladi.</p><p>Grafana panellari uch xil: DevOps uchun texnik, operator uchun obyektlar xaritasi, rahbariyat uchun oylik uptime va xarajat.</p>",
    manba: [],
    ru: {
      yorliq: "Техническая справка",
      sarlavha: "Prometheus и Grafana: кто что видит",
      tana: "<p>Мониторинг двухслойный: сама платформа и устройства на объектах. Оба слоя собираются в один Prometheus, но тревоги уходят разным людям.</p><table><tr><th>Что</th><th>Порог</th><th>Кому</th></tr><tr><td>Время ответа API</td><td>p95 &gt; 1 с</td><td>DevOps</td></tr><tr><td>Очередь брокера</td><td>&gt; 10 000 сообщ.</td><td>DevOps</td></tr><tr><td>Заполнение диска</td><td>&gt; 80%</td><td>DevOps</td></tr><tr><td>Устройство без связи</td><td>&gt; 15 мин</td><td>Оператор</td></tr><tr><td>Батарея</td><td>&lt; 15%</td><td>Сервис</td></tr><tr><td>Срок сертификата</td><td>&lt; 30 дней</td><td>DevOps</td></tr></table><h4>Что это даёт</h4><ul><li>Месячный uptime по каждому устройству считается автоматически. Отсюда же берутся 98% для контрольной точки этапа и для SLA.</li><li>Alertmanager склеивает повторы по одной проблеме: если связь пропала в целом регионе, придёт одно сообщение, а не 200.</li></ul><p>Если в банке есть SIEM, журналы безопасности отправляются и туда.</p><p>Панели Grafana трёх видов: техническая для DevOps, карта объектов для оператора, месячный uptime и расходы для руководства.</p>"
    }
  },

  "s-masshtab.zaxira": {
    yorliq: "Texnik izoh",
    sarlavha: "Zaxira nusxa va tiklash sinovi",
    tana: "<p>Zaxira nusxa tiklanib ko'rilmaguncha zaxira hisoblanmaydi. Shuning uchun reja ikki qismdan iborat: nusxa olish va uni muntazam tiklash.</p><h4>Nima va qachon</h4><table><tr><th>Ma'lumot</th><th>Usul</th><th>Chastota</th></tr><tr><td>PostgreSQL</td><td>pgBackRest: to'liq va farqli nusxa</td><td>haftada va har kecha</td></tr><tr><td>WAL jurnali</td><td>uzluksiz arxiv</td><td>har 5 daqiqa yoki tezroq</td></tr><tr><td>Kadr va klip</td><td>ikkinchi maydonga replikatsiya</td><td>uzluksiz</td></tr><tr><td>Router va shlyuz sozlamasi</td><td>Git'dagi shablonlar</td><td>har o'zgarishda</td></tr></table><h4>Maqsadlar</h4><div class='raqamlar'><div><b>5 daqiqa</b><span>yo'qotilishi mumkin bo'lgan ma'lumot (RPO)</span></div><div><b>4 soat</b><span>to'liq tiklash vaqti (RTO)</span></div></div><ul><li>Oyda bir marta nusxa test serverga tiklanadi, natija jurnalga yoziladi.</li><li>Nusxalar asosiy ma'lumot markazidan tashqarida, alohida huquqlar bilan saqlanadi.</li></ul><p class='ogoh'>RPO va RTO taklif. Yakuniy qiymatni bankning uzluksizlik siyosati belgilaydi.</p>",
    manba: [],
    ru: {
      yorliq: "Техническая справка",
      sarlavha: "Резервные копии и проверка восстановления",
      tana: "<p>Резервная копия не считается копией, пока её не восстановили. Поэтому план из двух частей: снять копию и регулярно её восстанавливать.</p><h4>Что и когда</h4><table><tr><th>Данные</th><th>Способ</th><th>Частота</th></tr><tr><td>PostgreSQL</td><td>pgBackRest: полная и дифференциальная копия</td><td>раз в неделю и каждую ночь</td></tr><tr><td>Журнал WAL</td><td>непрерывный архив</td><td>каждые 5 минут или чаще</td></tr><tr><td>Кадры и клипы</td><td>репликация на вторую площадку</td><td>непрерывно</td></tr><tr><td>Настройки роутеров и шлюзов</td><td>шаблоны в Git</td><td>при каждом изменении</td></tr></table><h4>Цели</h4><div class='raqamlar'><div><b>5 минут</b><span>допустимая потеря данных (RPO)</span></div><div><b>4 часа</b><span>полное восстановление (RTO)</span></div></div><ul><li>Раз в месяц копия восстанавливается на тестовый сервер, результат пишется в журнал.</li><li>Копии хранятся вне основного дата-центра, с отдельными правами доступа.</li></ul><p class='ogoh'>RPO и RTO — предложение. Окончательные значения задаёт политика непрерывности банка.</p>"
    }
  },

  "s-yol.pilot": {
    yorliq: "Jamoa rahbarlari uchun",
    sarlavha: "Pilot: olti haftada nima quriladi",
    tana: "<p>Pilot maket emas, keyingi bosqichlar ustiga quriladigan poydevor. Shu olti haftada yozilgan kod 267 obyektda ham ishlaydi, faqat nusxalar soni o'zgaradi.</p><table><tr><th>Hafta</th><th>Dasturchilar</th><th>Obyektda</th></tr><tr><td>1</td><td>API shartnomasi, reyestr sxemasi, test muhiti</td><td>10 obyekt auditi, signal o'lchovi</td></tr><tr><td>2</td><td>Hikvision va Ajax adapterlari</td><td>Birinchi 5 obyektga montaj</td></tr><tr><td>3–4</td><td>Media shlyuz, hodisa shinasi, buyruq xizmati, SSO</td><td>Qolgan 5 obyekt, sozlash</td></tr><tr><td>5</td><td>Grafana panellari, yuk sinovi</td><td>O'lchov, yolg'on signallar tahlili</td></tr><tr><td>6</td><td>Ulanish standarti hujjati</td><td>Qabul akti</td></tr></table><h4>Pilotda qilinmaydi</h4><ul><li>To'liq yuqori mavjudlik: bitta baza, bitta media shlyuz.</li><li>Barcha brendlar uchun adapter: faqat pilotdagi 3–4 yechimniki.</li><li>Tashqi tizimlar bilan webhook integratsiyasi.</li></ul><p class='ogoh'>Asosiy xavf — qurilma yetkazib berish. Pilot uskunasi 1-haftadan oldin omborda bo'lishi kerak, aks holda jadval surilib ketadi.</p>",
    manba: [],
    ru: {
      yorliq: "Для тимлида",
      sarlavha: "Пилот: что строим за шесть недель",
      tana: "<p>Пилот — не макет, а фундамент для следующих этапов. Код, написанный за эти шесть недель, будет работать и на 267 объектах, меняется только число экземпляров.</p><table><tr><th>Неделя</th><th>Разработка</th><th>На объекте</th></tr><tr><td>1</td><td>контракт API, схема реестра, тестовая среда</td><td>аудит 10 объектов, замер сигнала</td></tr><tr><td>2</td><td>адаптеры Hikvision и Ajax</td><td>монтаж на первых 5 объектах</td></tr><tr><td>3–4</td><td>медиашлюз, шина событий, сервис команд, SSO</td><td>остальные 5 объектов, настройка</td></tr><tr><td>5</td><td>панели Grafana, нагрузочный тест</td><td>замеры, разбор ложных тревог</td></tr><tr><td>6</td><td>документ «стандарт подключения»</td><td>акт приёмки</td></tr></table><h4>Чего в пилоте нет</h4><ul><li>Полной отказоустойчивости: одна база, один медиашлюз.</li><li>Адаптеров под все бренды — только под 3–4 решения пилота.</li><li>Webhook-интеграции с внешними системами.</li></ul><p class='ogoh'>Главный риск — поставка оборудования. Техника для пилота должна быть на складе до начала первой недели, иначе график поедет.</p>"
    }
  },

  "s-yol.darvoza0": {
    yorliq: "Rahbariyat uchun",
    sarlavha: "Pilot darvozasi: nimani o'lchaymiz",
    tana: "<p>Pilot oxirida rahbariyat bitta savolga javob beradi: 50 obyektga o'tamizmi. Javob fikrga emas, avtomatik yig'ilgan raqamlarga tayanadi.</p><table><tr><th>Ko'rsatkich</th><th>Chegara</th><th>Qanday o'lchanadi</th></tr><tr><td>Uptime</td><td class='n'>≥ 98%</td><td>Heartbeat bo'yicha, har qurilma</td></tr><tr><td>Yolg'on signal</td><td class='n'>qayd etiladi</td><td>Operator belgisi: «haqiqiy» yoki «yolg'on»</td></tr><tr><td>Operator javobi</td><td class='n'>qayd etiladi</td><td>Hodisadan qabul qilishgacha</td></tr><tr><td>Obyekt narxi</td><td class='n'>qayd etiladi</td><td>Jihoz, montaj, trafik</td></tr></table><p>98% uptime qurilma oyiga 14,6 soatdan ko'p aloqasiz qolmasligini bildiradi. Integrator SLA'sidagi chegara ham shu (30-slayd).</p><p>Yolg'on signal, javob vaqti va narx pilot darvozasining sharti emas. Ular 1-bosqich darvozasi (obyektga oyiga ≤ 4 yolg'on signal, javob ≤ 5 daqiqa) uchun asos bo'ladi.</p><h4>Qaror varag'i</h4><ul><li>Qaysi obyekt turiga qaysi yechim.</li><li>1-bosqich byudjeti va bosh integrator modeli.</li><li>Ko'rsatkich bajarilmasa: pilot 2–4 haftaga uzaytiriladi, masshtab to'xtaydi.</li></ul>",
    manba: [],
    ru: {
      yorliq: "Для руководства",
      sarlavha: "Контрольная точка пилота: что измеряем",
      tana: "<p>В конце пилота руководство отвечает на один вопрос: переходим ли к 50 объектам. Ответ опирается не на мнения, а на автоматически собранные цифры.</p><table><tr><th>Показатель</th><th>Порог</th><th>Как измеряется</th></tr><tr><td>Uptime</td><td class='n'>≥ 98%</td><td>по heartbeat, по каждому устройству</td></tr><tr><td>Ложные тревоги</td><td class='n'>фиксируются</td><td>отметка оператора: «реальная» или «ложная»</td></tr><tr><td>Реакция оператора</td><td class='n'>фиксируется</td><td>от события до принятия в работу</td></tr><tr><td>Стоимость объекта</td><td class='n'>фиксируется</td><td>оборудование, монтаж, трафик</td></tr></table><p>Uptime 98% означает, что устройство не больше 14,6 часа в месяц находится без связи. Тот же порог стоит в SLA интегратора (слайд 30).</p><p>Ложные тревоги, время реакции и стоимость не входят в условия контрольной точки пилота. Они служат основой для контрольной точки этапа 1 (≤ 4 ложных тревог на объект в месяц, реакция ≤ 5 минут).</p><h4>Лист решения</h4><ul><li>Какое решение для какого типа объекта.</li><li>Бюджет первого этапа и модель генерального интегратора.</li><li>Если показатели не выполнены: пилот продлевается на 2–4 недели, масштабирование останавливается.</li></ul>"
    }
  },

  "s-yol.birinchi": {
    yorliq: "Rahbariyat uchun",
    sarlavha: "50 obyekt: kimdan boshlaymiz",
    tana: "<p>Birinchi 50 obyekt ro'yxati ikki mezon ko'paytmasidan tuziladi: balans qiymati va xavf darajasi. Qimmat, chekkada turgan va qo'shnisi yo'q bino ro'yxat boshiga chiqadi.</p><h4>Xavf balli</h4><ul><li>Ilgari buzib kirish yoki talon holati bo'lganmi.</li><li>Eng yaqin aholi punktigacha masofa.</li><li>Ichida qimmat jihoz yoki material qolganmi.</li><li>Balansga olinganiga necha oy bo'lgan: bir yilga yaqinlashgan obyekt zaxira talabi tufayli birinchi navbatda.</li></ul><h4>Shu bosqichda boshlanadi</h4><ul><li><b>Navbatchi smena.</b> Bitta post 24/7 ishlashi uchun 4–5 shtat birligi kerak: haftada 168 soat, bir xodimga 40 soat. Beshinchisi ta'til va kasallik uchun. 31-slayddagi hisobda 4 operator olingan.</li><li><b>Tender.</b> Bosh integrator uchun kamida uchta tijorat taklifi.</li><li><b>Qo'riqlash departamenti.</b> O'RQ-778 bo'yicha xabar kelganda chiqish faqat davlat qo'riqlash xizmati bilan shartnoma asosida.</li></ul><p class='ogoh'>Byudjet 50 obyektga tanlangan yechimlar aralashmasiga bog'liq: 18-slayddagi diapazonlar bo'yicha taxminan 0,4–1 mlrd so'm.</p>",
    manba: [],
    ru: {
      yorliq: "Для руководства",
      sarlavha: "50 объектов: с кого начинаем",
      tana: "<p>Список первых 50 объектов строится по произведению двух критериев: балансовой стоимости и уровня риска. Дорогое здание на отшибе без соседей оказывается в начале списка.</p><h4>Балл риска</h4><ul><li>Были ли ранее проникновения или хищения.</li><li>Расстояние до ближайшего населённого пункта.</li><li>Осталось ли внутри дорогое оборудование или материалы.</li><li>Сколько месяцев объект на балансе: те, кто подходит к году, идут первыми из-за требования о резерве.</li></ul><h4>Что стартует на этом этапе</h4><ul><li><b>Дежурная смена.</b> Для круглосуточного поста нужно 4–5 штатных единиц: 168 часов в неделю, 40 часов на сотрудника. Пятая — на отпуска и больничные. В расчёте на слайде 31 заложено 4 оператора.</li><li><b>Тендер.</b> Не менее трёх коммерческих предложений на генерального интегратора.</li><li><b>Департамент охраны.</b> По ЗРУ-778 выезд по тревоге — только по договору с государственной службой охраны.</li></ul><p class='ogoh'>Бюджет на 50 объектов зависит от набора решений: по диапазонам со слайда 18 — ориентировочно 0,4–1 млрд сумов.</p>"
    }
  },

  "s-yol.darvoza1": {
    yorliq: "Rahbariyat uchun",
    sarlavha: "1-bosqich darvozasi: signal va javob",
    tana: "<p>50 obyektda tizim birinchi marta navbatchi smena bilan ishlaydi. Endi texnik ko'rsatkichlarga operatsion ko'rsatkichlar qo'shiladi.</p><table><tr><th>Ko'rsatkich</th><th>Chegara</th></tr><tr><td>Uptime</td><td class='n'>≥ 98%</td></tr><tr><td>Yolg'on signal, bir obyektga oyiga</td><td class='n'>≤ 4</td></tr><tr><td>Hodisadan operator qaroriga</td><td class='n'>≤ 5 daqiqa</td></tr><tr><td>Servis tashrifi, bir obyektga oyiga</td><td class='n'>≤ 1</td></tr></table><h4>Nega aynan shu raqamlar</h4><ul><li>Oyiga 4 tadan ko'p yolg'on signal bo'lsa, operator signalga ishonmay qo'yadi. Haqiqiy buzib kirish shu fonda o'tkazib yuboriladi.</li><li>5 daqiqa — operator hodisani ko'rib, qo'riqlash xizmatini chaqirishga qaror qilishi uchun vaqt.</li><li>Oyiga bittadan ortiq tashrif avtonom yechim noto'g'ri tanlanganini bildiradi.</li></ul><p class='ogoh'>Chegaralar pilot natijasiga qarab tuzatiladi. Bu yerdagi qiymatlar boshlang'ich taklif.</p><p>Hisobot har hafta avtomatik chiqadi. Chegaradan chiqqan obyektlar ro'yxati sababi bilan birga beriladi: ko'pincha bu noto'g'ri burchak yoki shamolda tebranadigan daraxt.</p>",
    manba: [],
    ru: {
      yorliq: "Для руководства",
      sarlavha: "Контрольная точка этапа 1: тревоги и реакция",
      tana: "<p>На 50 объектах система впервые работает с дежурной сменой. К техническим показателям добавляются операционные.</p><table><tr><th>Показатель</th><th>Порог</th></tr><tr><td>Uptime</td><td class='n'>≥ 98%</td></tr><tr><td>Ложные тревоги на объект в месяц</td><td class='n'>≤ 4</td></tr><tr><td>От события до решения оператора</td><td class='n'>≤ 5 минут</td></tr><tr><td>Сервисные выезды на объект в месяц</td><td class='n'>≤ 1</td></tr></table><h4>Почему именно эти цифры</h4><ul><li>Если ложных тревог больше 4 в месяц, оператор перестаёт им доверять — и на этом фоне пропускает настоящее проникновение.</li><li>5 минут — время, чтобы оператор оценил событие и решил, вызывать ли охрану.</li><li>Больше одного выезда в месяц означает, что автономное решение подобрано неверно.</li></ul><p class='ogoh'>Пороги корректируются по итогам пилота. Здесь приведено стартовое предложение.</p><p>Отчёт выходит автоматически каждую неделю. Объекты за пределами порога приводятся списком с причиной: чаще всего это неудачный ракурс или дерево, которое качает ветер.</p>"
    }
  },

  "s-yol.balans": {
    yorliq: "Montajchi uchun",
    sarlavha: "217 obyekt: montaj qanday tashkil etiladi",
    tana: "<p>Ikkinchi bosqichda qolgan 217 obyekt ulanadi. Hal qiluvchi resurs — dasturchilar emas, montaj brigadalari.</p><table><tr><th>Brigada</th><th>Kuniga</th><th>Oyiga, 22 ish kuni</th><th>217 obyekt</th></tr><tr><td>2</td><td class='n'>3</td><td class='n'>66</td><td class='n'>3,3 oy</td></tr><tr><td>3</td><td class='n'>4,5</td><td class='n'>99</td><td class='n'>2,2 oy</td></tr></table><p>Hisobda brigadaga o'rtacha kuniga 1,5 obyekt. Viloyatlarga yo'l va ob-havo uchun jadvalga 1–2 oy zaxira qo'shilgan, shuning uchun bosqich 5–9-oy oralig'ida.</p><h4>Omborda oldindan</h4><ul><li>Komplekt yig'iladi va sinovdan o'tadi: SIM faollashgan, VPN sertifikati yozilgan, har jihozda <code>device_id</code> yorlig'i.</li><li>Brigada obyektga faqat o'rnatish va tekshirish uchun boradi.</li></ul><h4>Ko'char mulk</h4><p>79 ta transport va texnikaga kamera qo'yilmaydi: plomba, GPS treker va kuzov ochilish datchigi. Bir brigada kuniga 4–6 birlikni jihozlaydi.</p><p class='ogoh'>Montaj tartibi viloyat bo'yicha guruhlanadi, bitta safarda 3–5 obyekt.</p>",
    manba: [],
    ru: {
      yorliq: "Для монтажника",
      sarlavha: "217 объектов: как организован монтаж",
      tana: "<p>На втором этапе подключаются оставшиеся 217 объектов. Узкое место — не разработчики, а монтажные бригады.</p><table><tr><th>Бригад</th><th>В день</th><th>В месяц, 22 раб. дня</th><th>217 объектов</th></tr><tr><td>2</td><td class='n'>3</td><td class='n'>66</td><td class='n'>3,3 мес.</td></tr><tr><td>3</td><td class='n'>4,5</td><td class='n'>99</td><td class='n'>2,2 мес.</td></tr></table><p>В расчёте — в среднем 1,5 объекта на бригаду в день. На дорогу по областям и погоду в график заложен запас 1–2 месяца, поэтому этап укладывается в 5–9-й месяц.</p><h4>Заранее на складе</h4><ul><li>Комплект собирается и проверяется: SIM активирована, VPN-сертификат записан, на каждом устройстве наклейка с <code>device_id</code>.</li><li>Бригада едет на объект только ставить и проверять.</li></ul><h4>Движимое имущество</h4><p>На 79 единиц транспорта и техники камеры не ставятся: пломба, GPS-трекер и датчик вскрытия кузова. Одна бригада оснащает 4–6 единиц в день.</p><p class='ogoh'>Очерёдность монтажа группируется по областям: 3–5 объектов за одну поездку.</p>"
    }
  },

  "s-yol.darvoza2": {
    yorliq: "Moliya va huquq",
    sarlavha: "2-bosqich darvozasi: narx va hujjat",
    tana: "<p>Butun balans ulangach, asosiy savol moliyaviy: har obyekt rejalashtirilgan narxga tushdimi va jihoz bank hisobida to'g'ri turibdimi.</p><h4>Ko'rsatkichlar</h4><ul><li>Obyekt narxi pilot smetasidan 10% dan ortiq oshmaydi. Oshsa, sabab obyekt kartochkasida yoziladi.</li><li>Oylik ekspluatatsiya: SIM trafigi, servis tashrifi va akkumulyator almashtirish bir obyekt kesimida.</li><li>Uptime ≥ 98% va yolg'on signal chegarasi butun parkda saqlanadi.</li></ul><h4>Hujjatlar</h4><ul><li>Har obyekt bo'yicha montaj va qabul akti, jihoz seriya raqamlari bilan.</li><li>Jihoz bankning asosiy vositasi sifatida hisobga olinadi va obyekt sotilganda boshqa obyektga ko'chiriladi.</li><li>Kafolat va SLA muddatlari integrator shartnomasida.</li></ul><h4>Arzon muqobil</h4><p>Elektr tarmog'i yonida turgan obyektni qayta ulash ko'pincha avtonom komplektdan arzon: texnik shart 39 600 so'm, uch ish kuni. 40–60 Vt tugun oyiga taxminan 38 500 so'mlik elektr sarflaydi.</p>",
    manba: [],
    ru: {
      yorliq: "Финансы и право",
      sarlavha: "Контрольная точка этапа 2: цена и документы",
      tana: "<p>Когда подключён весь баланс, главный вопрос — финансовый: уложился ли каждый объект в плановую цену и правильно ли оборудование учтено в банке.</p><h4>Показатели</h4><ul><li>Стоимость объекта превышает смету пилота не более чем на 10%. При превышении причина записывается в карточке объекта.</li><li>Ежемесячная эксплуатация в разрезе объекта: трафик SIM, сервисные выезды, замена аккумуляторов.</li><li>Uptime ≥ 98% и порог ложных тревог выдерживаются по всему парку.</li></ul><h4>Документы</h4><ul><li>Акт монтажа и приёмки по каждому объекту, с серийными номерами оборудования.</li><li>Оборудование учитывается как основное средство банка и при продаже объекта переносится на другой.</li><li>Сроки гарантии и SLA — в договоре с интегратором.</li></ul><h4>Дешёвая альтернатива</h4><p>Объект рядом с электросетью часто дешевле подключить заново, чем ставить автономный комплект: техусловия 39 600 сумов, три рабочих дня. Узел на 40–60 Вт потребляет электроэнергии примерно на 38 500 сумов в месяц.</p>"
    }
  },

  "s-yol.standart": {
    yorliq: "Rahbariyat uchun",
    sarlavha: "Yangi aktiv: 10 ish kunida nazoratda",
    tana: "<p>Uchinchi bosqichda loyiha jarayonga aylanadi. Obyekt balansga qabul qilingan kuni tizimda ulanish vazifasi o'zi ochiladi.</p><table><tr><th>Ish kuni</th><th>Nima bo'ladi</th><th>Kim</th></tr><tr><td class='n'>1–3</td><td>Joyida ko'rik: signal, quvvat, eshiklar</td><td>Montajchi</td></tr><tr><td class='n'>3</td><td>Yechim tanlanadi, komplekt ombordan beriladi</td><td>Loyiha menejeri</td></tr><tr><td class='n'>4–8</td><td>Montaj va sozlash</td><td>Brigada</td></tr><tr><td class='n'>9–10</td><td>48 soatlik sinov va qabul akti</td><td>Operator, montajchi</td></tr></table><h4>Buning uchun kerak</h4><ul><li>Omborda 5–10 ta tayyor komplekt doim turadi.</li><li>Sotilgan obyektdan yechilgan jihoz tekshirilib, zaxiraga qaytadi.</li></ul><h4>Boshqa banklar</h4><p>PQ-142 davlat ulushi 50% va undan ko'p banklarga 2025–2026-yillarda kamida 4 trln so'mlik shunday mulkni sotish vazifasini qo'ygan: muammo bitta bankniki emas. Platforma har bank ma'lumotini alohida saqlaydigan qilib quriladi. Xizmat — nazorat va xabar berish. Qo'riqlash xizmati emas: O'RQ-778 bo'yicha u davlat vakolatida qoladi.</p>",
    manba: [],
    ru: {
      yorliq: "Для руководства",
      sarlavha: "Новый актив: под контролем за 10 рабочих дней",
      tana: "<p>На третьем этапе проект превращается в процесс. В день, когда объект принят на баланс, в системе автоматически открывается задача на подключение.</p><table><tr><th>Раб. день</th><th>Что происходит</th><th>Кто</th></tr><tr><td class='n'>1–3</td><td>осмотр на месте: сигнал, питание, двери</td><td>монтажник</td></tr><tr><td class='n'>3</td><td>выбор решения, выдача комплекта со склада</td><td>руководитель проекта</td></tr><tr><td class='n'>4–8</td><td>монтаж и настройка</td><td>бригада</td></tr><tr><td class='n'>9–10</td><td>48-часовой тест и акт приёмки</td><td>оператор, монтажник</td></tr></table><h4>Что для этого нужно</h4><ul><li>На складе постоянно 5–10 готовых комплектов.</li><li>Оборудование, снятое с проданного объекта, проверяется и возвращается в резерв.</li></ul><h4>Другие банки</h4><p>ПП-142 поставило банкам с госдолей 50% и более задачу продать в 2025–2026 годах такого имущества не менее чем на 4 трлн сумов: проблема не одного банка. Платформа строится так, чтобы данные каждого банка хранились отдельно. Услуга — мониторинг и оповещение, а не охрана: по ЗРУ-778 охрана остаётся за государством.</p>"
    }
  },

  "s-yol.darvoza3": {
    yorliq: "Rahbariyat uchun",
    sarlavha: "Doimiy rejim: choraklik nazorat",
    tana: "<p>3-bosqichda darvoza bir martalik emas. Har chorakda rahbariyatga bitta varaq chiqadi, raqamlar platformadan avtomatik olinadi.</p><table><tr><th>Ko'rsatkich</th><th>Maqsad</th></tr><tr><td>Balansga olingandan ulanishgacha</td><td class='n'>≤ 10 ish kuni</td></tr><tr><td>Ulangan obyekt ulushi</td><td class='n'>100%</td></tr><tr><td>Uptime</td><td class='n'>≥ 98%</td></tr><tr><td>Obyekt uchun oylik xarajat</td><td>chorakdan chorakka pasayadi</td></tr></table><h4>Bajarilmasa</h4><ul><li>10 kundan kechikkan har obyekt sababi bilan varaqda ko'rinadi: jihoz yo'q, kirishga ruxsat yo'q yoki qamrov yo'q.</li><li>Jihoz yetmasa, ombor zaxirasi oshiriladi. Qamrov yo'q bo'lsa, sun'iy yo'ldosh aloqasi yoki klaster shkafi ko'rib chiqiladi.</li></ul><p>Shu varaq xizmatni boshqa banklarga taklif qilishda ham asos bo'ladi: xaridor sotuvchining so'ziga emas, o'lchangan natijaga qaraydi.</p><p>Varaqni loyiha menejeri tayyorlaydi, rahbariyat chorak yig'ilishida ko'rib chiqadi.</p>",
    manba: [],
    ru: {
      yorliq: "Для руководства",
      sarlavha: "Постоянный режим: ежеквартальный контроль",
      tana: "<p>На этапе 3 контрольная точка не разовая. Раз в квартал руководство получает один лист, цифры в нём берутся из платформы автоматически.</p><table><tr><th>Показатель</th><th>Цель</th></tr><tr><td>От принятия на баланс до подключения</td><td class='n'>≤ 10 раб. дней</td></tr><tr><td>Доля подключённых объектов</td><td class='n'>100%</td></tr><tr><td>Uptime</td><td class='n'>≥ 98%</td></tr><tr><td>Ежемесячные расходы на объект</td><td>снижаются от квартала к кварталу</td></tr></table><h4>Если не выполнено</h4><ul><li>Каждый объект с задержкой больше 10 дней виден в листе с причиной: нет оборудования, нет доступа или нет покрытия.</li><li>Не хватает оборудования — увеличиваем складской резерв. Нет покрытия — рассматриваем спутниковую связь или кластерный шкаф.</li></ul><p>Этот же лист станет основой, когда услугу будут предлагать другим банкам: покупатель смотрит не на обещания, а на измеренный результат.</p><p>Лист готовит руководитель проекта, руководство рассматривает его на квартальном совещании.</p>"
    }
  },

  "s-yol.jamoa": {
    yorliq: "Jamoa rahbarlari uchun",
    sarlavha: "Jamoa: yetti kishi va ularning vazifasi",
    tana: "<table><tr><th>Rol</th><th>Soni</th><th>Asosiy ish</th></tr><tr><td>Backend</td><td class='n'>2</td><td>API, adapterlar, hodisa shinasi, buyruq xizmati</td></tr><tr><td>Frontend</td><td class='n'>1</td><td>Operator ekrani, video paneli, hisobotlar</td></tr><tr><td>DevOps / SRE</td><td class='n'>1</td><td>Serverlar, CI/CD, monitoring, zaxira nusxa</td></tr><tr><td>QA</td><td class='n'>1</td><td>Shartnoma testlari, yuk sinovi, qabul</td></tr><tr><td>Integratsiya muhandisi</td><td class='n'>1</td><td>Vendor API, router shablonlari, montajchilar bilan ish</td></tr><tr><td>Loyiha menejeri</td><td class='n'>1</td><td>Jadval, integrator, darvoza hisobotlari</td></tr></table><h4>Bosqichlar bo'yicha yuk</h4><ul><li>Pilot va 1-bosqichda butun jamoa to'liq band.</li><li>2-bosqichda yangi kod kamayadi, montaj va qo'llab-quvvatlash ko'payadi. Integratsiya muhandisi va QA montajni qabul qiladi.</li><li>3-bosqichda 3–4 kishi qoladi: backend, DevOps, integratsiya va menejer.</li></ul><p class='ogoh'>Navbatchi operatorlar bu ro'yxatga kirmaydi. Ular bankning xavfsizlik xizmati shtatida, 24/7 post uchun 4–5 shtat birligi.</p>",
    manba: [],
    ru: {
      yorliq: "Для тимлида",
      sarlavha: "Команда: семь человек и их задачи",
      tana: "<table><tr><th>Роль</th><th>Кол-во</th><th>Основная работа</th></tr><tr><td>Backend</td><td class='n'>2</td><td>API, адаптеры, шина событий, сервис команд</td></tr><tr><td>Frontend</td><td class='n'>1</td><td>экран оператора, видеопанель, отчёты</td></tr><tr><td>DevOps / SRE</td><td class='n'>1</td><td>серверы, CI/CD, мониторинг, резервные копии</td></tr><tr><td>QA</td><td class='n'>1</td><td>контрактные тесты, нагрузочный тест, приёмка</td></tr><tr><td>Инженер интеграции</td><td class='n'>1</td><td>API вендоров, шаблоны роутеров, работа с монтажниками</td></tr><tr><td>Руководитель проекта</td><td class='n'>1</td><td>график, интегратор, отчёты по контрольным точкам</td></tr></table><h4>Загрузка по этапам</h4><ul><li>На пилоте и этапе 1 команда занята полностью.</li><li>На этапе 2 нового кода меньше, больше монтажа и поддержки. Инженер интеграции и QA принимают монтаж.</li><li>На этапе 3 остаются 3–4 человека: backend, DevOps, интеграция и руководитель.</li></ul><p class='ogoh'>Дежурные операторы в этот список не входят. Они в штате службы безопасности банка: 4–5 штатных единиц на круглосуточный пост.</p>"
    }
  },

  "s-yol.montaj": {
    yorliq: "Montajchi uchun",
    sarlavha: "Brigada kuni: 1–2 obyekt qanday chiqadi",
    tana: "<p>Brigada ikki kishidan: montajchi va sozlovchi. Oddiy komplektda, masalan quyosh-4G kamera va datchiklarda, kuniga 2 obyekt. Shkaf, kabel va eshik qulfi bo'lgan obyektda 1 obyekt.</p><h4>Obyektdagi tartib</h4><ol><li>Kelish va surat: obyekt holati montajdan oldin.</li><li>Signal o'lchovi: ikkala SIM, eng yaxshi nuqta tanlanadi.</li><li>O'rnatish: kronshteyn, panel janubga, kabel himoyada.</li><li>Sozlash: jihoz reyestrdagi <code>device_id</code> bilan bog'lanadi, zavod paroli almashtiriladi.</li><li>Sinov: eshik ochiladi, harakat qilinadi, hodisa operator ekranida ko'rinishi kerak.</li><li>Yakun: surat hisobot va qabul aktining loyihasi.</li></ol><h4>Mashinada</h4><ul><li>Zaxira SIM, zaxira akkumulyator, sinov uchun ikkinchi router.</li><li>Balandlikda ishlash uchun narvon va xavfsizlik kamari.</li></ul><p class='ogoh'>Sinov hodisasi operator ekraniga chiqmaguncha brigada obyektdan ketmaydi.</p><p>Qabul aktiga surat hisobot, seriya raqamlari va sinov hodisasining vaqti kiritiladi. Akt platformada obyekt kartochkasiga biriktiriladi.</p>",
    manba: [],
    ru: {
      yorliq: "Для монтажника",
      sarlavha: "День бригады: как выходит 1–2 объекта",
      tana: "<p>Бригада из двух человек: монтажник и наладчик. На простом комплекте, например солнечная 4G-камера и датчики, — 2 объекта в день. Если есть шкаф, кабель и замок на двери — 1 объект.</p><h4>Порядок на объекте</h4><ol><li>Приезд и фото: состояние объекта до монтажа.</li><li>Замер сигнала по обеим SIM, выбор лучшей точки.</li><li>Установка: кронштейн, панель на юг, кабель в защите.</li><li>Настройка: устройство привязывается к <code>device_id</code> из реестра, заводской пароль меняется.</li><li>Проверка: открыть дверь, пройти перед камерой — событие должно появиться на экране оператора.</li><li>Завершение: фотоотчёт и проект акта приёмки.</li></ol><h4>В машине</h4><ul><li>Запасная SIM, запасной аккумулятор, второй роутер для проверки.</li><li>Стремянка и страховочный пояс для работы на высоте.</li></ul><p class='ogoh'>Пока тестовое событие не появилось на экране оператора, бригада с объекта не уезжает.</p><p>В акт приёмки входят фотоотчёт, серийные номера и время тестового события. Акт прикрепляется к карточке объекта на платформе.</p>"
    }
  },

  "s-kirish.qadam1": {
    yorliq: "Montajchi uchun",
    sarlavha: "Qo'ng'iroq: qaysi domofon elektrsiz ishlaydi",
    tana: "<p>Tashrif buyuruvchi tugmani bosadi, qo'ng'iroq platformaga keladi va navbatdagi bo'sh operatorga chiqadi. Operator telefoni emas, veb-panel jiringlaydi: kim qabul qilgani jurnalga tushadi.</p><h4>Ikki turdagi domofon</h4><table><tr><th></th><th>Batareyali</th><th>SIP, doimiy quvvat</th></tr><tr><td>Kutishda</td><td>uxlaydi, tugma uyg'otadi</td><td>doim tarmoqda, bir necha vatt</td></tr><tr><td>Qo'ng'iroq</td><td>vendor ilovasi yoki Hub orqali</td><td>to'g'ridan SIP, operator navbatiga</td></tr><tr><td>Rele chiqishi</td><td>ko'pincha yo'q</td><td>bor, qulfni o'zi ocha oladi</td></tr><tr><td>Qayerga</td><td>uy, kichik do'kon</td><td>LiFePO4 shkafli obyekt</td></tr></table><h4>Montajda</h4><ul><li>Domofon soyabon ostiga, yuz balandligiga, quyoshga qarshi emas.</li><li>Qo'ng'iroq 60 soniyada qabul qilinmasa, ikkinchi operatorga o'tadi. Buni montajdan keyin sinab ko'ring.</li><li>Kutish rejimidagi sarf datasheet'dan olinib, quvvat hisobiga kiritiladi.</li></ul><p class='ogoh'>Domofon karnayi qishda muzlab qolishi mumkin. −20 °C da ishlash sertifikati tenderda talab qilinadi.</p>",
    manba: [],
    ru: {
      yorliq: "Для монтажника",
      sarlavha: "Вызов: какой домофон работает без сети",
      tana: "<p>Посетитель нажимает кнопку, вызов приходит на платформу и попадает к первому свободному оператору. Звонит не телефон оператора, а веб-панель: кто принял вызов, фиксируется в журнале.</p><h4>Два типа домофонов</h4><table><tr><th></th><th>На батарее</th><th>SIP, постоянное питание</th></tr><tr><td>В ожидании</td><td>спит, кнопка будит</td><td>всегда в сети, несколько ватт</td></tr><tr><td>Вызов</td><td>через приложение вендора или Hub</td><td>напрямую по SIP в очередь операторов</td></tr><tr><td>Релейный выход</td><td>часто нет</td><td>есть, может сам открыть замок</td></tr><tr><td>Куда</td><td>дом, небольшой магазин</td><td>объект со шкафом LiFePO4</td></tr></table><h4>При монтаже</h4><ul><li>Домофон — под козырёк, на уровне лица, не против солнца.</li><li>Если вызов не принят за 60 секунд, он уходит второму оператору. Проверьте это после монтажа.</li><li>Потребление в ожидании берётся из даташита и закладывается в расчёт питания.</li></ul><p class='ogoh'>Динамик домофона зимой может обмерзнуть. В тендере требуем сертификат работы при −20 °C.</p>"
    }
  },

  "s-kirish.qadam2": {
    yorliq: "Rahbariyat uchun",
    sarlavha: "Tekshirish: operator nimaga qaraydi",
    tana: "<p>Operator tashrif buyuruvchini tanimaydi. U faqat tizimdagi yozuvga tayanadi: bu odam bugun shu obyektga kelishi kerakmi.</p><h4>Obyekt kartochkasida ko'rinadi</h4><ul><li>Bugungi rejalashtirilgan tashriflar: ko'rik, baholovchi, potentsial xaridor, montaj brigadasi.</li><li>Tashrifni kim tasdiqlagan va qaysi vaqt oralig'ida.</li><li>Oxirgi 5 ta hodisa va obyekt holati: qulf, batareya, signal.</li></ul><h4>Qanday tekshiriladi</h4><ol><li>Tashrif buyuruvchi hujjatini kameraga ko'rsatadi, operator ism-familiyani reja bilan solishtiradi.</li><li>Rejada yo'q bo'lsa, eshik ochilmaydi. Operator tashrif egasiga, masalan filial xodimiga qo'ng'iroq qiladi.</li></ol><p>Yuzni avtomatik tanish shart emas. Yoqilsa, bu biometrik ma'lumot: O'RQ-1125 bo'yicha faqat O'zbekistondagi serverda saqlanadi va shaxsning roziligi talab qilinadi.</p><p class='ogoh'>Rahbariyat qarori: kim tashrif tasdiqlashga haqli va tungi soatlarda qo'shimcha tasdiq kerakmi.</p>",
    manba: [],
    ru: {
      yorliq: "Для руководства",
      sarlavha: "Проверка: на что смотрит оператор",
      tana: "<p>Оператор посетителя не знает. Он опирается только на запись в системе: должен ли этот человек сегодня быть на этом объекте.</p><h4>Что видно в карточке объекта</h4><ul><li>Запланированные на сегодня визиты: осмотр, оценщик, потенциальный покупатель, монтажная бригада.</li><li>Кто согласовал визит и на какой интервал времени.</li><li>Последние 5 событий и состояние объекта: замок, батарея, сигнал.</li></ul><h4>Как проверяется</h4><ol><li>Посетитель показывает документ в камеру, оператор сверяет ФИО с планом.</li><li>Если в плане его нет, дверь не открывается. Оператор звонит владельцу визита, например сотруднику филиала.</li></ol><p>Автоматическое распознавание лиц не обязательно. Если его включить, это биометрические данные: по ЗРУ-1125 они хранятся только на сервере в Узбекистане, и нужно согласие человека.</p><p class='ogoh'>Решение руководства: кто вправе согласовывать визиты и нужно ли дополнительное подтверждение в ночные часы.</p>"
    }
  },

  "s-kirish.qadam3": {
    yorliq: "Rahbariyat uchun",
    sarlavha: "Qaror: kim ruxsat beradi va qanday",
    tana: "<p>Qaror operatorning shaxsiy fikri bo'lmasligi uchun qoidalar oldindan yoziladi va tizimga kiritiladi.</p><table><tr><th>Holat</th><th>Kim hal qiladi</th></tr><tr><td>Tashrif rejada, vaqt mos</td><td>Operator o'zi</td></tr><tr><td>Rejada, lekin vaqt boshqa</td><td>Operator va tashrif egasi</td></tr><tr><td>Rejada yo'q</td><td>Smena boshlig'i, yozma sabab bilan</td></tr><tr><td>Soat 22:00 dan 07:00 gacha</td><td>Ikki kishi tasdig'i</td></tr></table><h4>Rad etish ham qaror</h4><ul><li>Operator rad etsa, sababni ro'yxatdan tanlaydi: rejada yo'q, hujjat ko'rsatilmadi, shubhali xatti-harakat.</li><li>Shubhali holatda operator qo'riqlash xizmatini chaqiradi. O'RQ-778 bo'yicha chiqish faqat davlat qo'riqlash xizmati bilan shartnoma asosida.</li></ul><h4>Nazorat</h4><p>Oy oxirida hisobot: nechta ruxsat, nechta rad, qaysi operator qoidadan tashqari qaror qabul qilgan. Bu ichki audit uchun tayyor ma'lumot.</p><p class='ogoh'>Jadvaldagi vaqt oralig'i va tasdiq tartibi taklif. Yakuniy qoidani xavfsizlik xizmati tasdiqlaydi.</p>",
    manba: [],
    ru: {
      yorliq: "Для руководства",
      sarlavha: "Решение: кто разрешает и как",
      tana: "<p>Чтобы решение не зависело от личного мнения оператора, правила пишутся заранее и заносятся в систему.</p><table><tr><th>Ситуация</th><th>Кто решает</th></tr><tr><td>Визит в плане, время совпадает</td><td>оператор сам</td></tr><tr><td>В плане, но время другое</td><td>оператор и владелец визита</td></tr><tr><td>В плане нет</td><td>начальник смены, с письменной причиной</td></tr><tr><td>С 22:00 до 07:00</td><td>подтверждение двух человек</td></tr></table><h4>Отказ — тоже решение</h4><ul><li>Отказывая, оператор выбирает причину из списка: нет в плане, документ не предъявлен, подозрительное поведение.</li><li>При подозрении оператор вызывает охрану. По ЗРУ-778 выезд — только по договору с государственной службой охраны.</li></ul><h4>Контроль</h4><p>В конце месяца — отчёт: сколько разрешений, сколько отказов, какой оператор принимал решения вне правил. Готовые данные для внутреннего аудита.</p><p class='ogoh'>Интервалы времени и порядок подтверждения в таблице — предложение. Окончательные правила утверждает служба безопасности.</p>"
    }
  },

  "s-kirish.qadam4": {
    yorliq: "Montajchi uchun",
    sarlavha: "Bajarish: qulf, rele va kontroller",
    tana: "<p>Elektrsiz obyektda qulf tanlovi quvvat hisobini hal qiladi.</p><table><tr><th>Qulf</th><th>Tok uzilsa</th><th>Doimiy sarf</th></tr><tr><td>Elektromagnit, 272 kg</td><td>ochiladi (fail-safe)</td><td>12 V da 500 mA, sutkasiga 144 Vt·soat</td></tr><tr><td>Elektr zashyolka</td><td>yopiq qoladi (fail-secure)</td><td>faqat ochish paytida</td></tr><tr><td>Motorli qulf</td><td>yopiq qoladi</td><td>faqat ochish paytida</td></tr></table><p>Elektromagnit qulf bir o'zi butun kamera komplektidan ko'p yeydi. Tashqi eshikka elektr zashyolka yoki motorli qulf qo'yiladi.</p><h4>Rele yoki kontroller</h4><ul><li><b>Rele</b> (domofon chiqishi, Ajax Relay): arzon, bitta eshik, faqat «och» buyrug'i.</li><li><b>Kirish kontrolleri</b>: o'quvchi, eshik datchigi, chiqish tugmasi, aloqa uzilganda ham ishlaydigan ichki jurnal.</li><li>O'quvchi Wiegand emas, OSDP Secure Channel bilan ulanadi. Wiegand ochiq signal uzatadi, uni ko'chirib olish mumkin.</li></ul><h4>Quvvat</h4><p>Qulf zanjiri umumiy LiFePO4'dan alohida saqlagich orqali oladi. Akkumulyator tugasa, mexanik kalit muhrlangan qutida turadi.</p>",
    manba: [["SIA: OSDP standarti", "https://www.securityindustry.org/industry-standards/open-supervised-device-protocol/"], ["Visionis: 600 lbs qulf", "https://www.visionistech.com/en/product/indoor-electromagnetic-lock-vis-ml600led/"]],
    ru: {
      yorliq: "Для монтажника",
      sarlavha: "Исполнение: замок, реле и контроллер",
      tana: "<p>На объекте без электричества выбор замка решает весь расчёт питания.</p><table><tr><th>Замок</th><th>При пропадании тока</th><th>Постоянное потребление</th></tr><tr><td>Электромагнитный, 272 кг</td><td>открывается (fail-safe)</td><td>500 мА при 12 В, 144 Вт·ч в сутки</td></tr><tr><td>Электрозащёлка</td><td>остаётся закрытой (fail-secure)</td><td>только в момент открытия</td></tr><tr><td>Моторный замок</td><td>остаётся закрытым</td><td>только в момент открытия</td></tr></table><p>Один электромагнитный замок потребляет больше, чем весь комплект камер. На наружную дверь ставится электрозащёлка или моторный замок.</p><h4>Реле или контроллер</h4><ul><li><b>Реле</b> (выход домофона, Ajax Relay): дёшево, одна дверь, только команда «открыть».</li><li><b>Контроллер доступа</b>: считыватель, датчик двери, кнопка выхода, собственный журнал, который пишется и без связи.</li><li>Считыватель подключается по OSDP Secure Channel, а не по Wiegand. Wiegand передаёт открытый сигнал, его можно скопировать.</li></ul><h4>Питание</h4><p>Цепь замка берёт питание от общего LiFePO4 через отдельный предохранитель. На случай разряда механический ключ лежит в опломбированном ящике.</p>"
    }
  },

  "s-kirish.qadam5": {
    yorliq: "Moliya va huquq",
    sarlavha: "Jurnal: sud va sug'urta uchun dalil",
    tana: "<p>Har bir eshik ochilishi to'liq yozuv qoldiradi. Bu yozuv keyinchalik sug'urta da'vosi, ichki tekshiruv yoki sudda dalil bo'ladi.</p><h4>Yozuv tarkibi</h4><ul><li>Obyekt va eshik, masalan <code>AK-2025/0934</code>, asosiy eshik.</li><li>Qo'ng'iroq vaqti, qabul qilgan operator, qaror va sababi.</li><li>Tashrif buyuruvchi kadri va klip, SHA-256 xeshi bilan.</li><li>Qulf haqiqatan ochilgani: eshik datchigi signali, faqat buyruq emas.</li><li>Eshik qachon yopilgani.</li></ul><h4>O'zgarmasligi</h4><ul><li>Jurnal faqat qo'shiladi. O'zgartirish yoki o'chirish huquqi administratorda ham yo'q.</li><li>Har yozuv oldingisining xeshini saqlaydi: bitta satr o'zgartirilsa, zanjir buziladi va buni auditor ko'radi.</li></ul><h4>Qaror kerak</h4><p>Saqlash muddati bank ichki siyosatiga bog'liq. Kadrlar 90 kunda o'chadi, jurnal yozuvlari esa uzoqroq saqlanadi. Muddatni yuridik bo'lim belgilaydi.</p>",
    manba: [],
    ru: {
      yorliq: "Финансы и право",
      sarlavha: "Журнал: доказательство для суда и страховой",
      tana: "<p>Каждое открытие двери оставляет полную запись. Позже она становится доказательством в страховом споре, внутренней проверке или суде.</p><h4>Состав записи</h4><ul><li>Объект и дверь, например <code>AK-2025/0934</code>, главный вход.</li><li>Время вызова, принявший оператор, решение и причина.</li><li>Кадр и клип с посетителем, с хешем SHA-256.</li><li>Факт открытия замка — сигнал датчика двери, а не только команда.</li><li>Когда дверь закрылась.</li></ul><h4>Неизменность</h4><ul><li>Журнал только дополняется. Права на изменение или удаление нет даже у администратора.</li><li>Каждая запись хранит хеш предыдущей: если изменить одну строку, цепочка ломается, и аудитор это увидит.</li></ul><h4>Нужно решение</h4><p>Срок хранения зависит от внутренней политики банка. Кадры удаляются через 90 дней, записи журнала хранятся дольше. Срок устанавливает юридический отдел.</p>"
    }
  },

  "s-kirish.izoh1": {
    yorliq: "Montajchi uchun",
    sarlavha: "Qaysi eshik ochiq, qaysi yopiq qoladi",
    tana: "<p>Tok uzilganda eshik o'zini qanday tutishi xavfsizlik va yong'in talablari o'rtasidagi tanlov.</p><table><tr><th>Eshik</th><th>Rejim</th><th>Sabab</th></tr><tr><td>Tashqi kirish, odam yo'q bino</td><td>fail-secure</td><td>Akkumulyator tugasa ham bino yopiq</td></tr><tr><td>Server, kassa, qimmat jihoz xonasi</td><td>fail-secure</td><td>Qiymat ichkarida</td></tr><tr><td>Odam bo'ladigan binodagi evakuatsiya yo'li</td><td>fail-safe yoki mexanik chiqish</td><td>Yong'inda odam chiqa olishi kerak</td></tr></table><h4>Amaliy qoida</h4><ul><li>Fail-secure qulf ichkaridan har doim mexanik dastak bilan ochiladi. Ichkarida qolgan odam kalitsiz chiqadi.</li><li>Ko'rik yoki xaridor tashrifi paytida ichkarida odam bo'ladi: bu vaqtda eshik ochiq turadi va jurnalda «ichkarida odam bor» holati belgilanadi.</li></ul><p class='ogoh'>Evakuatsiya yo'lidagi eshik yong'in xavfsizligi qoidalariga muvofiq loyihalanadi. Montajdan oldin loyihachi bilan kelishing.</p><p>Tanlangan rejim obyekt kartochkasida har eshik uchun yoziladi, operator uni qaror oldidan ko'radi.</p>",
    manba: [],
    ru: {
      yorliq: "Для монтажника",
      sarlavha: "Какая дверь открывается, а какая остаётся закрытой",
      tana: "<p>Поведение двери при пропадании питания — это выбор между требованиями безопасности и пожарными нормами.</p><table><tr><th>Дверь</th><th>Режим</th><th>Почему</th></tr><tr><td>Наружный вход, в здании никого</td><td>fail-secure</td><td>даже при разряде аккумулятора здание закрыто</td></tr><tr><td>Серверная, касса, помещение с дорогим оборудованием</td><td>fail-secure</td><td>ценность внутри</td></tr><tr><td>Путь эвакуации в здании, где бывают люди</td><td>fail-safe или механический выход</td><td>при пожаре человек должен выйти</td></tr></table><h4>Практическое правило</h4><ul><li>Замок fail-secure изнутри всегда открывается механической ручкой. Оставшийся внутри человек выходит без ключа.</li><li>Во время осмотра или визита покупателя внутри есть люди: дверь в это время открыта, в журнале отмечается «внутри люди».</li></ul><p class='ogoh'>Дверь на пути эвакуации проектируется по правилам пожарной безопасности. Согласуйте с проектировщиком до монтажа.</p><p>Выбранный режим записывается в карточке объекта для каждой двери, и оператор видит его до принятия решения.</p>"
    }
  },

  "s-kirish.izoh2": {
    yorliq: "Jamoa rahbarlari uchun",
    sarlavha: "Masofaviy buyruq: yo'l va kechikish",
    tana: "<p>Hamma buyruq bitta <code>POST /buyruq</code> orqali o'tadi. Adapter uni brend tiliga o'giradi va natijani qaytaradi.</p><pre><code>{ \"obyekt_id\": \"AK-2025/0934\", \"qurilma_id\": \"ESH-0003\",\n  \"amal\": \"ochish\", \"sabab\": \"tashrif T-0412\" }\nIdempotency-Key: 7d1f…\n→ 202 { \"buyruq_id\": \"B-88213\", \"holat\": \"yuborildi\" }</code></pre><h4>Holatlar</h4><p>yuborildi → qurilma qabul qildi → bajarildi yoki xato. Operator ekranda «bajarildi»ni faqat eshik datchigidan tasdiq kelganda ko'radi.</p><h4>Kechikish</h4><ul><li>Doimiy ulangan router va kontroller: odatda 1–3 soniya.</li><li>Uxlayotgan batareyali qurilma: uyg'onishini kutadi, bir necha soniyadan daqiqagacha. Bunday qurilmaga shoshilinch buyruq berilmaydi.</li><li>30 soniyada javob kelmasa, buyruq «noma'lum» holatida yopiladi, takror yuborilmaydi: eshik ikki marta ochilmasligi kerak.</li></ul><h4>Huquq</h4><p>Eshik va sirena — faqat operator roli. Qayta ishga tushirish — administrator. Har buyruq jurnalga yoziladi.</p>",
    manba: [],
    ru: {
      yorliq: "Для тимлида",
      sarlavha: "Удалённая команда: путь и задержка",
      tana: "<p>Все команды идут через один <code>POST /buyruq</code>. Адаптер переводит её на язык бренда и возвращает результат.</p><pre><code>{ \"obyekt_id\": \"AK-2025/0934\", \"qurilma_id\": \"ESH-0003\",\n  \"amal\": \"ochish\", \"sabab\": \"tashrif T-0412\" }\nIdempotency-Key: 7d1f…\n→ 202 { \"buyruq_id\": \"B-88213\", \"holat\": \"yuborildi\" }</code></pre><h4>Статусы</h4><p>отправлена → принята устройством → выполнена или ошибка. «Выполнена» оператор видит только после подтверждения от датчика двери.</p><h4>Задержка</h4><ul><li>Постоянно подключённые роутер и контроллер: обычно 1–3 секунды.</li><li>Спящее устройство на батарее: команда ждёт пробуждения, от нескольких секунд до минуты. Срочные команды таким устройствам не даются.</li><li>Если ответа нет 30 секунд, команда закрывается со статусом «неизвестно» и повторно не отправляется: дверь не должна открыться дважды.</li></ul><h4>Права</h4><p>Дверь и сирена — только роль оператора. Перезагрузка — администратор. Каждая команда пишется в журнал.</p>"
    }
  },

  "s-uzilish.tamoyil1": {
    yorliq: "Montajchi uchun",
    sarlavha: "Joyida yozuv: karta, disk va sovuq",
    tana: "<p>Aloqa uzilgan paytdagi dalil faqat obyektning o'zida qoladi. Shuning uchun joyidagi xotira ham quvvat kabi hisoblanadi.</p><h4>Nima qo'yiladi</h4><table><tr><th>Qurilma</th><th>Xotira</th><th>Talab</th></tr><tr><td>Quyosh-4G kamera</td><td>SD karta</td><td>High Endurance sinfi, 128–256 GB</td></tr><tr><td>Home Hub</td><td>ichki xotira yoki SD</td><td>vendor ruxsat bergan hajm</td></tr><tr><td>NVR shkafda</td><td>SSD yoki sanoat SD</td><td>isitilmaydigan binoda HDD emas</td></tr></table><h4>Nega HDD emas</h4><p>Ko'p qattiq disklar 0 °C dan past haroratda ishlashga mo'ljallanmagan. Qishda isitilmaydigan omborda disk ishga tushmay qolishi mumkin. SSD va sanoat SD kartalar kengroq harorat oralig'ida ishlaydi, buni datasheet'da tekshiring.</p><h4>Montajda</h4><ul><li>Yozuv rejimi: hodisa bo'yicha, eski yozuv ustidan aylanma yozish yoqilgan.</li><li>Karta formatlanadi va platformada «xotira bandligi» ko'rinishi tekshiriladi.</li><li>Kamera ichidagi karta qulflanadigan qopqoq ostida bo'lsin.</li></ul>",
    manba: [],
    ru: {
      yorliq: "Для монтажника",
      sarlavha: "Локальная запись: карта, диск и мороз",
      tana: "<p>Доказательства за время обрыва связи остаются только на самом объекте. Поэтому локальную память считают так же тщательно, как питание.</p><h4>Что ставим</h4><table><tr><th>Устройство</th><th>Память</th><th>Требование</th></tr><tr><td>Солнечная 4G-камера</td><td>SD-карта</td><td>класс High Endurance, 128–256 ГБ</td></tr><tr><td>Home Hub</td><td>встроенная память или SD</td><td>объём, допустимый вендором</td></tr><tr><td>NVR в шкафу</td><td>SSD или промышленная SD</td><td>в неотапливаемом здании не HDD</td></tr></table><h4>Почему не HDD</h4><p>Многие жёсткие диски не рассчитаны на работу ниже 0 °C. Зимой в неотапливаемом складе диск может просто не запуститься. SSD и промышленные SD-карты работают в более широком диапазоне — проверяйте по даташиту.</p><h4>При монтаже</h4><ul><li>Режим записи — по событию, циклическая перезапись включена.</li><li>Карта форматируется, на платформе проверяется показатель «заполнение памяти».</li><li>Карта в камере должна быть под запираемой крышкой.</li></ul>"
    }
  },

  "s-uzilish.tamoyil2": {
    yorliq: "Jamoa rahbarlari uchun",
    sarlavha: "Saqlab yuborish: navbat, tartib, takror",
    tana: "<p>Shlyuz aloqa yo'qligida hodisalarni o'z navbatiga yozadi. Aloqa tiklangach, navbat tartib bilan bo'shatiladi.</p><h4>Qoidalar</h4><ul><li>Har xabarda qurilma bergan vaqt (UTC, NTP bilan) va ketma-ket raqam bor. Platforma tartibni raqam bo'yicha tiklaydi.</li><li>Takror yuborilgan xabar <code>qurilma_id + raqam</code> bo'yicha tashlab yuboriladi.</li><li>Navbatda ustuvorlik: avval signal hodisalari, keyin holat, oxirida klip.</li><li>Bitta shlyuz soniyasiga 5 ta xabardan ortiq yubormaydi: yuzlab obyekt birga tiklansa, markaz tiqilib qolmaydi.</li></ul><h4>Eski hodisa</h4><p>3 soat oldingi «harakat» hozirgi signal emas. 5 daqiqadan eski hodisa «kechikkan» belgisini oladi. Operator uni jonli navbatda emas, alohida ro'yxatda ko'radi va arxivdan tekshiradi.</p><pre><code>{ \"qurilma_id\": \"KAM-0007\", \"raqam\": 18344,\n  \"vaqt\": \"2026-09-21T03:12:40Z\",\n  \"qabul\": \"2026-09-21T06:31:02Z\", \"kechikkan\": true }</code></pre><p class='ogoh'>Qurilma soati noto'g'ri bo'lsa, tartib buziladi. NTP sinxronlash montaj varag'idagi majburiy band.</p>",
    manba: [],
    ru: {
      yorliq: "Для тимлида",
      sarlavha: "Store-and-forward: очередь, порядок, повторы",
      tana: "<p>Без связи шлюз пишет события в свою очередь. Когда связь восстанавливается, очередь выгружается по порядку.</p><h4>Правила</h4><ul><li>В каждом сообщении — время устройства (UTC, по NTP) и порядковый номер. Платформа восстанавливает порядок по номеру.</li><li>Повторно отправленное сообщение отсекается по <code>qurilma_id + raqam</code>.</li><li>Приоритет в очереди: сначала тревоги, затем состояние, клипы в конце.</li><li>Один шлюз отправляет не больше 5 сообщений в секунду: если сотни объектов вернутся в сеть одновременно, центр не захлебнётся.</li></ul><h4>Старое событие</h4><p>«Движение» трёхчасовой давности — не текущая тревога. Событие старше 5 минут получает метку «запоздало». Оператор видит его не в живой очереди, а в отдельном списке и проверяет по архиву.</p><pre><code>{ \"qurilma_id\": \"KAM-0007\", \"raqam\": 18344,\n  \"vaqt\": \"2026-09-21T03:12:40Z\",\n  \"qabul\": \"2026-09-21T06:31:02Z\", \"kechikkan\": true }</code></pre><p class='ogoh'>Если часы устройства сбиты, порядок нарушится. Синхронизация по NTP — обязательный пункт в листе монтажа.</p>"
    }
  },

  "s-uzilish.tamoyil3": {
    yorliq: "Texnik izoh",
    sarlavha: "Ikki SIM va VPN: aloqa zaxirasi",
    tana: "<p>Obyektdagi router ikki operatorning SIM kartasi bilan ishlaydi. Teltonika RUT955 sinfidagi sanoat routerlari SIM'ni kuchsiz signal, tarmoq yo'qligi yoki ma'lumot uzatish xatosida o'zi almashtiradi.</p><h4>Sozlash</h4><ul><li>SIM1 — obyektda signali kuchli operator, SIM2 — boshqasi. Tanlov montaj kuni o'lchov bilan qilinadi.</li><li>Ulanish tekshiruvi: router har daqiqada bank VPN konsentratoriga ping yuboradi. 3 ta javobsiz ping — SIM almashadi.</li><li>SIM1 tiklangach, router 30 daqiqadan keyin unga qaytadi.</li></ul><h4>Kanal</h4><table><tr><th>Variant</th><th>Qanday</th><th>Qachon</th></tr><tr><td>Yopiq APN</td><td>Operator tarmog'i ichida, internetsiz</td><td>Operator bilan korporativ shartnoma bo'lsa</td></tr><tr><td>IPsec yoki WireGuard</td><td>Oddiy SIM ustidan shifrlangan tunnel</td><td>Tez boshlash, pilot</td></tr></table><p>Ikki SIM bo'lsa, ikki APN yoki ikki tunnel kerak: zaxira operatorda ham kanal oldindan sozlangan bo'ladi.</p><p class='ogoh'>Operatordan so'raladi: yopiq APN narxi, statik IP, obyekt joylashgan hududdagi qamrov xaritasi.</p>",
    manba: [["Teltonika RUT955", "https://www.teltonika-networks.com/products/routers/rut955"]],
    ru: {
      yorliq: "Техническая справка",
      sarlavha: "Две SIM и VPN: резерв связи",
      tana: "<p>Роутер на объекте работает с SIM-картами двух операторов. Промышленные роутеры класса Teltonika RUT955 сами переключают SIM при слабом сигнале, отсутствии сети или ошибке передачи данных.</p><h4>Настройка</h4><ul><li>SIM1 — оператор с лучшим сигналом на объекте, SIM2 — другой. Выбор делается замером в день монтажа.</li><li>Проверка связи: роутер раз в минуту пингует VPN-концентратор банка. 3 пинга без ответа — переключение SIM.</li><li>Когда SIM1 восстанавливается, роутер возвращается на неё через 30 минут.</li></ul><h4>Канал</h4><table><tr><th>Вариант</th><th>Как</th><th>Когда</th></tr><tr><td>Закрытый APN</td><td>внутри сети оператора, без интернета</td><td>если есть корпоративный договор с оператором</td></tr><tr><td>IPsec или WireGuard</td><td>шифрованный туннель поверх обычной SIM</td><td>быстрый старт, пилот</td></tr></table><p>При двух SIM нужны два APN или два туннеля: канал на резервном операторе тоже настраивается заранее.</p><p class='ogoh'>Что запросить у оператора: стоимость закрытого APN, статический IP, карту покрытия в районе объекта.</p>"
    }
  },

  "s-uzilish.tamoyil4": {
    yorliq: "Jamoa rahbarlari uchun",
    sarlavha: "Holat nazorati: chegaralar jadvali",
    tana: "<p>Ogohlantirish ikki darajali: sariq — rejali servis, qizil — bugun chora ko'rish kerak.</p><table><tr><th>Ko'rsatkich</th><th>Sariq</th><th>Qizil</th></tr><tr><td>last_seen</td><td>&gt; 3 daqiqa</td><td>&gt; 15 daqiqa</td></tr><tr><td>Batareya</td><td>&lt; 30%</td><td>&lt; 15%</td></tr><tr><td>Xotira bandligi</td><td>&gt; 85%</td><td>yozuv to'xtagan</td></tr><tr><td>Signal, RSRP</td><td>&lt; −105 dBm</td><td>&lt; −115 dBm</td></tr><tr><td>Shkaf harorati</td><td>&lt; 0 °C</td><td>&lt; −15 °C yoki &gt; 50 °C</td></tr></table><h4>Mantiq</h4><ul><li>Shkaf 0 °C dan sovisa, LiFePO4 zaryadi to'xtaydi. Tizim buni «quyosh yo'q» deb emas, «zaryad bloklangan» deb ko'rsatadi.</li><li>Batareya pasayish tezligidan qolgan kunlar hisoblanadi: «5 kunda tugaydi» xabari «15%» dan foydaliroq.</li><li>Bitta obyektdagi bir nechta ogohlantirish bitta servis vazifasiga birlashadi.</li></ul><p class='ogoh'>Chegaralar boshlang'ich. Pilotning 5-haftasida yolg'on ogohlantirishlar sanaladi va raqamlar tuzatiladi.</p>",
    manba: [],
    ru: {
      yorliq: "Для тимлида",
      sarlavha: "Мониторинг состояния: таблица порогов",
      tana: "<p>Тревоги двух уровней: жёлтый — плановый сервис, красный — меры нужны сегодня.</p><table><tr><th>Показатель</th><th>Жёлтый</th><th>Красный</th></tr><tr><td>last_seen</td><td>&gt; 3 мин</td><td>&gt; 15 мин</td></tr><tr><td>Батарея</td><td>&lt; 30%</td><td>&lt; 15%</td></tr><tr><td>Заполнение памяти</td><td>&gt; 85%</td><td>запись остановлена</td></tr><tr><td>Сигнал, RSRP</td><td>&lt; −105 дБм</td><td>&lt; −115 дБм</td></tr><tr><td>Температура в шкафу</td><td>&lt; 0 °C</td><td>&lt; −15 °C или &gt; 50 °C</td></tr></table><h4>Логика</h4><ul><li>Если в шкафу ниже 0 °C, заряд LiFePO4 останавливается. Система показывает это не как «нет солнца», а как «заряд заблокирован».</li><li>По скорости разряда считается остаток дней: сообщение «сядет через 5 дней» полезнее, чем «15%».</li><li>Несколько тревог по одному объекту объединяются в одну сервисную задачу.</li></ul><p class='ogoh'>Пороги стартовые. На 5-й неделе пилота считаем ложные тревоги и корректируем цифры.</p>"
    }
  },

  "s-uzilish.tamoyil5": {
    yorliq: "Texnik izoh",
    sarlavha: "Kiberxavfsizlik: minimal talablar",
    tana: "<p>Yuzlab kamera va router — bankning tashqi chegarasidagi yuzlab kompyuter. Har biri bitta xatoda kirish eshigiga aylanadi.</p><h4>Parol va hisob</h4><ul><li>Zavod paroli montaj kuni almashtiriladi. Har qurilmaga alohida parol, parollar seyfda saqlanadi, Excel'da emas.</li><li>Platforma kameraga faqat ko'rish huquqi bor alohida ONVIF foydalanuvchisi bilan ulanadi.</li></ul><h4>Tarmoq</h4><ul><li>Kamera internetga chiqmaydi: faqat VPN orqali bank tarmog'iga.</li><li>Vendor buluti (P2P, Hik-Connect, Reolink ilovasi) va UPnP o'chiriladi.</li><li>Obyektlar alohida segmentda: bitta obyektdan boshqasiga yo'l yo'q.</li></ul><h4>Proshivka</h4><ul><li>Faqat vendor imzolagan proshivka.</li><li>Yangilanish chorakda bir ko'rib chiqiladi. Avval test qurilmasiga, keyin 5% parkka, bir haftadan keyin qolganiga.</li><li>Kritik zaiflik chiqsa — 14 kun ichida.</li></ul><p class='ogoh'>2-bosqichdan oldin mustaqil penetratsion test. Uni bankning axborot xavfsizligi bo'limi buyurtma qiladi.</p>",
    manba: [],
    ru: {
      yorliq: "Техническая справка",
      sarlavha: "Кибербезопасность: минимальные требования",
      tana: "<p>Сотни камер и роутеров — это сотни компьютеров на внешнем периметре банка. Любой из них из-за одной ошибки становится входной дверью.</p><h4>Пароли и учётки</h4><ul><li>Заводской пароль меняется в день монтажа. У каждого устройства свой пароль, пароли хранятся в сейфе паролей, а не в Excel.</li><li>Платформа подключается к камере отдельным пользователем ONVIF только с правами на просмотр.</li></ul><h4>Сеть</h4><ul><li>Камера не выходит в интернет — только через VPN в сеть банка.</li><li>Облако вендора (P2P, Hik-Connect, приложение Reolink) и UPnP отключаются.</li><li>Объекты в отдельных сегментах: с одного объекта на другой пути нет.</li></ul><h4>Прошивка</h4><ul><li>Только прошивка, подписанная вендором.</li><li>Обновления пересматриваются раз в квартал. Сначала на тестовое устройство, затем на 5% парка, через неделю — на остальные.</li><li>При критической уязвимости — в течение 14 дней.</li></ul><p class='ogoh'>До этапа 2 — независимый тест на проникновение. Его заказывает служба информационной безопасности банка.</p>"
    }
  },

  "s-uzilish.tamoyil6": {
    yorliq: "Moliya va huquq",
    sarlavha: "Trafik: bir obyektga oyiga qancha",
    tana: "<p>Doimiy video uzatilmagani uchun SIM trafigi kichik va oldindan hisoblanadi. Hisob 4 qurilmali obyekt uchun, taxminiy.</p><table><tr><th>Nima</th><th>Kuniga</th><th>Oyiga</th></tr><tr><td>Heartbeat va telemetriya</td><td class='n'>≈ 1,5 MB</td><td class='n'>≈ 45 MB</td></tr><tr><td>Hodisa kadrlari, 120 × 200 KB</td><td class='n'>24 MB</td><td class='n'>0,72 GB</td></tr><tr><td>Kliplar, 12 × 1 MB</td><td class='n'>12 MB</td><td class='n'>0,36 GB</td></tr><tr><td>Jonli ko'rish, 30 daqiqa</td><td class='n'>115 MB</td><td class='n'>3,45 GB</td></tr><tr><td>Jami</td><td class='n'>≈ 153 MB</td><td class='n'>≈ 4,6 GB</td></tr></table><p>Jonli ko'rish farazi 23-slayddagi bilan bir xil. VPN va TLS qo'shimchasi bilan 5–6 GB paket yetadi. Tarif cheklanmagan bo'lishi shart emas.</p><h4>Xarid uchun</h4><ul><li>Operator bilan korporativ shartnoma: barcha SIM bitta hisobda, oylik limit va ogohlantirish.</li><li>Trafik limitdan oshsa, platforma obyekt kesimida ko'rsatadi: odatda bu shamolda tebranayotgan daraxt tufayli ko'p hodisa beradigan kamera.</li></ul>",
    manba: [],
    ru: {
      yorliq: "Финансы и право",
      sarlavha: "Трафик: сколько на объект в месяц",
      tana: "<p>Постоянного видео нет, поэтому трафик SIM небольшой и считается заранее. Расчёт для объекта с 4 устройствами, ориентировочный.</p><table><tr><th>Что</th><th>В сутки</th><th>В месяц</th></tr><tr><td>Heartbeat и телеметрия</td><td class='n'>≈ 1,5 МБ</td><td class='n'>≈ 45 МБ</td></tr><tr><td>Кадры событий, 120 × 200 КБ</td><td class='n'>24 МБ</td><td class='n'>0,72 ГБ</td></tr><tr><td>Клипы, 12 × 1 МБ</td><td class='n'>12 МБ</td><td class='n'>0,36 ГБ</td></tr><tr><td>Живой просмотр, 30 минут</td><td class='n'>115 МБ</td><td class='n'>3,45 ГБ</td></tr><tr><td>Итого</td><td class='n'>≈ 153 МБ</td><td class='n'>≈ 4,6 ГБ</td></tr></table><p>Допущение по живому просмотру то же, что на слайде 23. С учётом накладных расходов VPN и TLS хватает пакета на 5–6 ГБ. Безлимит не обязателен.</p><h4>Для закупки</h4><ul><li>Корпоративный договор с оператором: все SIM на одном счёте, месячный лимит и уведомления.</li><li>Если трафик превышает лимит, платформа показывает это по объекту: обычно виновата камера, которая даёт много событий из-за качающегося на ветру дерева.</li></ul>"
    }
  }

});

/* ---- marketing ---- */
/* Marketing guruhi: s-mundarija, s-sotuv, s-faq va s-platforma ekranlari uchun batafsil yozuvlar. */
window.MKB_BATAFSIL = window.MKB_BATAFSIL || {};
Object.assign(window.MKB_BATAFSIL, {

  /* ===================== 02 · Mundarija ===================== */
  "s-mundarija.yordam": {
    yorliq: "Texnik izoh",
    sarlavha: "Taqdimotdan qanday foydalaniladi",
    tana: "<p>Taqdimot oddiy brauzerda ochiladi va proyektorda, noutbukda, telefonda bir xil ko'rinadi. Har slayddagi yashil <b>+</b> belgisi shu blok bo'yicha batafsil izohni ochadi: raqam, manba, kimga tegishli va nimani hal qilish kerak.</p><h4>Klavishlar</h4><table><tr><th>Klavish</th><th>Nima qiladi</th></tr><tr><td>← → yoki Probel</td><td>Oldingi va keyingi slayd</td></tr><tr><td>S</td><td>O'qish rejimi: slaydlar sahifa kabi aylantiriladi, telefonda qulay</td></tr><tr><td>M</td><td>Mundarija oynasi, istalgan slaydga o'tish</td></tr><tr><td>O</td><td>Barcha 40 slayd kichik ko'rinishda</td></tr><tr><td>F</td><td>To'liq ekran</td></tr><tr><td>P</td><td>PDF sifatida saqlash</td></tr><tr><td>Esc</td><td>Ochiq oynani yopish</td></tr></table><h4>Batafsil oynada</h4><ul><li>Oynadagi strelkalar shu slayddagi keyingi izohga o'tkazadi.</li><li>O'ng pastdagi UZ va RU tugmasi tilni almashtiradi, izohlar ham tarjima bo'ladi.</li><li>Manzilga slayd raqamini qo'shsangiz, havola to'g'ridan-to'g'ri o'sha slaydni ochadi: <code>taqdimot.html#39</code>.</li></ul><p class='ogoh'>PDF'ga faqat ochiq turgan tab chiqadi. Chop etishdan oldin kerakli yo'lni tanlab qo'ying.</p>",
    manba: [],
    ru: {
      yorliq: "Техническая справка",
      sarlavha: "Как пользоваться презентацией",
      tana: "<p>Презентация открывается в обычном браузере и одинаково выглядит на проекторе, ноутбуке и телефоне. Зелёный знак <b>+</b> на слайде открывает подробную справку по блоку: цифры, источник, для кого это и что нужно решить.</p><h4>Клавиши</h4><table><tr><th>Клавиша</th><th>Действие</th></tr><tr><td>← → или Пробел</td><td>Предыдущий и следующий слайд</td></tr><tr><td>S</td><td>Режим чтения: слайды прокручиваются как страница, удобно на телефоне</td></tr><tr><td>M</td><td>Оглавление, переход к любому слайду</td></tr><tr><td>O</td><td>Все 40 слайдов в миниатюрах</td></tr><tr><td>F</td><td>Полный экран</td></tr><tr><td>P</td><td>Сохранить в PDF</td></tr><tr><td>Esc</td><td>Закрыть открытое окно</td></tr></table><h4>В окне справки</h4><ul><li>Стрелки в окне переключают на следующую справку этого слайда.</li><li>Кнопки UZ и RU справа внизу меняют язык, справки тоже переводятся.</li><li>Номер слайда в адресе открывает нужный слайд сразу: <code>taqdimot.html#39</code>.</li></ul><p class='ogoh'>В PDF попадает только открытая вкладка. Перед печатью выберите нужный маршрут.</p>"
    }
  },

  /* ===================== 35 · Sotuv ===================== */
  "s-sotuv.elon": {
    yorliq: "Marketing uchun",
    sarlavha: "E'lon uchun surat va video kameradan olinadi",
    tana: "<p>Balansdagi obyekt e'loniga ko'pincha balansga olish kunidagi eski surat qo'yiladi. Xaridor keladi, qor bosgan tom yoki buzilgan darvozani ko'radi va ishonch yo'qoladi. Kamera o'rnatilgan obyektda yangi kadr istalgan kuni bor.</p><h4>Tartib</h4><ol><li>Realizatsiya mutaxassisi obyekt kartochkasidan har kameraning kunduzgi kadrini oladi. Hikvision quyosh-4G kamerasi 4 MP, e'lon uchun yetarli.</li><li>Operator tashqi ko'rinishdan 20–30 soniyalik klip yozadi: darvoza, hovli, fasad.</li><li>Ichki xonalar montajchi yoki ko'rik inspektori tashrifida telefon bilan suratga olinadi.</li><li>Kadrlar E-auksion lotiga va bank saytidagi sotuv sahifasiga yuklanadi, sanasi ko'rsatiladi.</li></ol><h4>Qoidalar</h4><ul><li>Kadrda odam, avtomobil raqami va qo'shni hovli bo'lmaydi.</li><li>Surat har oy va har hodisadan keyin yangilanadi.</li><li>E'longa «masofadan ko'rsatish mavjud» degan qator qo'shiladi.</li></ul><p class='ogoh'>Kamera kadri ichki holatni ko'rsatmaydi. Ichkarini ko'rsatish uchun 36-slayddagi 3D tur g'oyasi kerak bo'ladi.</p>",
    manba: [["MKBANK: E-auksion'dagi mulklar", "https://mkbank.uz/en/press_center/tenders/e-auksion/"]],
    ru: {
      yorliq: "Для маркетинга",
      sarlavha: "Фото и видео для объявления берутся с камеры",
      tana: "<p>В объявлении о залоговом объекте часто висит старое фото со дня постановки на баланс. Покупатель приезжает, видит просевшую кровлю или сломанные ворота, и доверие пропадает. На объекте с камерой свежий кадр доступен в любой день.</p><h4>Порядок</h4><ol><li>Специалист по реализации берёт дневной кадр каждой камеры из карточки объекта. Солнечная 4G-камера Hikvision даёт 4 Мп — для объявления достаточно.</li><li>Оператор записывает клип на 20–30 секунд снаружи: ворота, двор, фасад.</li><li>Помещения внутри снимает на телефон монтажник или инспектор во время визита.</li><li>Кадры загружаются в лот E-auksion и на страницу продаж банка с указанием даты.</li></ol><h4>Правила</h4><ul><li>В кадре нет людей, номеров машин и соседних дворов.</li><li>Фото обновляется каждый месяц и после каждого инцидента.</li><li>В объявление добавляется строка «доступен удалённый показ».</li></ul><p class='ogoh'>Камера не показывает помещения изнутри. Для этого нужна идея 3D-тура со слайда 36.</p>"
    }
  },

  "s-sotuv.korsatish": {
    yorliq: "Marketing uchun",
    sarlavha: "Masofadan ko'rsatish: xaridor keladi, xodim kelmaydi",
    tana: "<p>Bugun har bir ko'rsatish uchun xodim obyektga boradi. Viloyatdagi ombor uchun bu yarim kun va transport. Video domofon va elektr qulf bor obyektda xaridorni markazdagi operator kutib oladi.</p><h4>Qanday o'tadi</h4><ol><li>Xaridor lot sahifasi yoki telefon orqali vaqt oladi va pasport suratini oldindan yuboradi.</li><li>Belgilangan vaqtda darvozadagi domofonni bosadi. Operatorda jonli video va oldindan yuborilgan hujjat yonma-yon ochiladi.</li><li>Operator shaxsni tasdiqlaydi va eshikni ochadi. Kameralar yozadi.</li><li>Xaridor chiqqach, operator chiqishni rasmiylashtiradi. Tashrif vaqti va davomiyligi jurnalga tushadi.</li></ol><p>Bu oqim platformada allaqachon bor: «Jonli tashrif nazorati» ekranida hujjat surati, jonli kadr, «Eshikni ochish» va «Chiqishni rasmiylashtirish» tugmalari.</p><h4>Cheklovlar</h4><ul><li>Ichida qimmat jihoz qolgan obyektga xaridor yolg'iz kiritilmaydi, bank xodimi boradi.</li><li>Evakuatsiya eshigi tok uzilsa ochiladigan qulf bilan loyihalanadi.</li><li>Xaridorga tashrif yozib olinishi oldindan aytiladi.</li></ul>",
    manba: [],
    ru: {
      yorliq: "Для маркетинга",
      sarlavha: "Удалённый показ: покупатель приезжает, сотрудник нет",
      tana: "<p>Сегодня на каждый показ сотрудник выезжает на объект. Для склада в области это полдня и транспорт. Там, где есть видеодомофон и электрозамок, покупателя встречает оператор в центре.</p><h4>Как проходит показ</h4><ol><li>Покупатель записывается через страницу лота или по телефону и заранее отправляет фото паспорта.</li><li>В назначенное время он нажимает кнопку домофона у ворот. У оператора рядом открываются живое видео и присланный документ.</li><li>Оператор подтверждает личность и открывает дверь. Камеры ведут запись.</li><li>Когда покупатель вышел, оператор оформляет выход. Время и длительность визита попадают в журнал.</li></ol><p>Этот сценарий в платформе уже есть: экран «Контроль визита в реальном времени» с фото документа, живым кадром и кнопками «Открыть дверь» и «Оформить выход».</p><h4>Ограничения</h4><ul><li>Если внутри осталось ценное оборудование, покупателя одного не пускают, выезжает сотрудник банка.</li><li>Эвакуационная дверь проектируется с замком, который открывается при пропадании питания.</li><li>Покупателя заранее предупреждают, что визит записывается.</li></ul>"
    }
  },

  "s-sotuv.kun": {
    yorliq: "Marketing uchun",
    sarlavha: "Ko'rish kuni tashriflarni bir oynaga yig'adi",
    tana: "<p>Tarqoq ko'rsatishlar operatorni kun bo'yi band qiladi va xaridorlar bir-birini ko'rmaydi. Ko'rish kuni ikkala muammoni yechadi: bitta obyektga qiziqqanlar bir kunda keladi va raqobatni o'z ko'zi bilan ko'radi.</p><h4>Taklif etiladigan tartib</h4><ul><li>Har obyekt uchun haftada bitta kun, masalan payshanba 10:00–16:00.</li><li>30 daqiqalik oraliqlar, bir oraliqda bitta xaridor yoki bitta oila.</li><li>Bir kun oldin SMS eslatma, kelmaganlar alohida belgilanadi.</li><li>Bir operator shu kunda 3–4 obyektni navbat bilan ochadi.</li></ul><h4>Jurnal nima beradi</h4><div class='raqamlar'><div><b>Kim</b><span>tasdiqlangan shaxs</span></div><div><b>Qachon</b><span>kirish va chiqish vaqti</span></div><div><b>Qancha</b><span>obyektda o'tgan daqiqa</span></div></div><p>20 daqiqa ichkarida yurgan xaridor bilan 2 daqiqada qaytgan xaridor bir xil emas. Realizatsiya mutaxassisi qo'ng'iroqni birinchisidan boshlaydi.</p><p class='ogoh'>Oraliqlar soni va ish vaqti pilotda sinaladi. Qishda kunduzgi yorug'lik qisqa, ko'rish kuni erta tugaydi.</p>",
    manba: [],
    ru: {
      yorliq: "Для маркетинга",
      sarlavha: "День показа собирает визиты в одно окно",
      tana: "<p>Разрозненные показы занимают оператора весь день, а покупатели не видят друг друга. День показа решает обе проблемы: все, кто интересуется объектом, приходят в один день и видят конкуренцию своими глазами.</p><h4>Предлагаемый порядок</h4><ul><li>Один день в неделю на объект, например четверг 10:00–16:00.</li><li>Окна по 30 минут, в окне один покупатель или одна семья.</li><li>SMS-напоминание накануне, неявки отмечаются отдельно.</li><li>Один оператор в этот день по очереди открывает 3–4 объекта.</li></ul><h4>Что даёт журнал</h4><div class='raqamlar'><div><b>Кто</b><span>подтверждённая личность</span></div><div><b>Когда</b><span>время входа и выхода</span></div><div><b>Сколько</b><span>минут на объекте</span></div></div><p>Покупатель, который провёл внутри 20 минут, и тот, кто ушёл через 2, — разные покупатели. Специалист по реализации начинает звонки с первого.</p><p class='ogoh'>Количество окон и часы работы проверяются в пилоте. Зимой световой день короткий, показ заканчивается раньше.</p>"
    }
  },

  "s-sotuv.taklif": {
    yorliq: "Marketing uchun",
    sarlavha: "Narx qarori taxmin emas, raqamga tayanadi",
    tana: "<p>Lot sotilmay tursa, odatda narx pasaytiriladi. Lekin sabab har xil bo'ladi: e'lonni hech kim ko'rmagan, ko'rgan-u kelmagan yoki kelgan-u taklif bermagan. Har holatning davosi boshqa.</p><table><tr><th>Belgi</th><th>Ehtimoliy sabab</th><th>Harakat</th></tr><tr><td>Ko'rish kam</td><td>E'lon ko'rinmaydi</td><td>Surat, sarlavha, kanal</td></tr><tr><td>Ko'rish bor, tashrif yo'q</td><td>Surat yoki joy qo'rqitadi</td><td>Yangi kadr, video, ko'rish kuni</td></tr><tr><td>Tashrif bor, taklif yo'q</td><td>Narx yoki holat</td><td>Narxni qayta ko'rish, nuqsonni tuzatish</td></tr></table><h4>Ma'lumot qayerdan</h4><ul><li>Tashriflar — platformaning kirish jurnalidan, avtomatik.</li><li>Takliflar — «Takliflar» bo'limidan, lotga bog'langan.</li><li>E'lon ko'rishlari — E-auksion statistikasidan qo'lda kiritiladi, avtomatik ulanish alohida kelishiladi.</li></ul><p>2025-yil 1-maydan davlat ulushi 50% va undan ko'p bo'lgan banklar balansdagi mulkni bozor qiymatida to'g'ridan-to'g'ri sotishi mumkin. Tashrif jurnali to'g'ridan-to'g'ri sotuvda ham xaridorlar ro'yxati bo'lib ishlaydi.</p>",
    manba: [["PQ-142, lex.uz", "https://lex.uz/docs/-7479146"]],
    ru: {
      yorliq: "Для маркетинга",
      sarlavha: "Решение о цене опирается на цифры, а не на догадку",
      tana: "<p>Если лот не продаётся, обычно снижают цену. Но причины бывают разные: объявление никто не увидел, увидели, но не приехали, или приехали, но не сделали предложение. Лечится каждый случай по-своему.</p><table><tr><th>Признак</th><th>Вероятная причина</th><th>Действие</th></tr><tr><td>Мало просмотров</td><td>Объявление не видно</td><td>Фото, заголовок, канал</td></tr><tr><td>Просмотры есть, визитов нет</td><td>Отпугивает фото или место</td><td>Новый кадр, видео, день показа</td></tr><tr><td>Визиты есть, предложений нет</td><td>Цена или состояние</td><td>Пересмотр цены, устранение дефекта</td></tr></table><h4>Откуда данные</h4><ul><li>Визиты — из журнала доступа платформы, автоматически.</li><li>Предложения — из раздела «Предложения», привязаны к лоту.</li><li>Просмотры объявления — из статистики E-auksion, вносятся вручную; автоматическую связку согласуют отдельно.</li></ul><p>С 1 мая 2025 года банки с долей государства 50% и более вправе продавать имущество с баланса напрямую по рыночной стоимости. Журнал визитов служит списком покупателей и при прямой продаже.</p>"
    }
  },

  "s-sotuv.belgi": {
    yorliq: "Marketing uchun",
    sarlavha: "Lavha ikki ish qiladi: to'xtatadi va sotadi",
    tana: "<p>Bo'sh bino egasiz ko'rinadi. Darvozadagi lavha tasodifiy bosqinchiga obyekt kuzatuvda ekanini aytadi, o'tib ketayotgan odamga esa bino sotuvda ekanini bildiradi. Bitta lavha ham ogohlantiradi, ham reklama qiladi.</p><h4>Lavhada nima yoziladi</h4><ul><li>«Obyekt MKBANK nazoratida» va bank belgisi.</li><li>«Hudud videokuzatuv ostida» — yozuv ochiq olib borilishini aytadi.</li><li>«Sotuvda» va lot raqami. QR kod lot sahifasiga olib boradi.</li><li>Xodimning shaxsiy telefoni yozilmaydi, faqat bank aloqa markazi.</li></ul><h4>Qayerga va qanday</h4><ul><li>Darvozaga yoki kirish yo'lagiga, ko'cha tomondan ko'rinadigan balandlikda.</li><li>Katta obyektda ikkinchi lavha fasadga.</li><li>Kompozit yoki alyumin plastina, UV bosma, burchaklari parchinlangan.</li></ul><table><tr><th>Band</th><th>Taxminiy narx</th></tr><tr><td>Lavha, 60×40 sm</td><td class='n'>150–300 ming so'm</td></tr><tr><td>O'rnatish</td><td class='n'>montaj tashrifida</td></tr></table><p class='ogoh'>Narx 2026-yil bozor bahosi, taxminan. Lavha dizayni bank brendbuki bo'yicha marketing bo'limida tasdiqlanadi.</p>",
    manba: [],
    ru: {
      yorliq: "Для маркетинга",
      sarlavha: "Табличка работает дважды: отпугивает и продаёт",
      tana: "<p>Пустое здание выглядит бесхозным. Табличка на воротах говорит случайному нарушителю, что объект под наблюдением, а прохожему — что здание продаётся. Одна табличка и предупреждает, и рекламирует.</p><h4>Что на табличке</h4><ul><li>«Объект под контролем MKBANK» и логотип банка.</li><li>«Ведётся видеонаблюдение» — запись ведётся открыто.</li><li>«Продаётся» и номер лота. QR-код ведёт на страницу лота.</li><li>Личный телефон сотрудника не пишется, только контакт-центр банка.</li></ul><h4>Где и как</h4><ul><li>На воротах или у входа, на высоте, видной с улицы.</li><li>На крупном объекте — вторая табличка на фасаде.</li><li>Композит или алюминий, УФ-печать, углы на заклёпках.</li></ul><table><tr><th>Позиция</th><th>Ориентировочная цена</th></tr><tr><td>Табличка 60×40 см</td><td class='n'>150–300 тыс. сумов</td></tr><tr><td>Установка</td><td class='n'>во время монтажа</td></tr></table><p class='ogoh'>Цена — рыночная оценка 2026 года, ориентировочно. Дизайн утверждает отдел маркетинга по брендбуку банка.</p>"
    }
  },

  "s-sotuv.muddat": {
    yorliq: "Moliya va huquq",
    sarlavha: "365-kun: aktiv «umidsiz» toifaga o'tadi",
    tana: "<p>Markaziy bankning 2696-son nizomi, 20-band: garov hisobidan olingan mulk balansga olingan kundan bir yil ichida sotilmasa, aktiv «umidsiz» toifaga o'tadi va 100% zaxira talab qiladi. Sotuvdagi har kun shu chegaraga yaqinlashtiradi.</p><h4>Platforma nima qiladi</h4><ul><li>Obyekt kartochkasida «Balansda N kun» ko'rsatkichi har kuni yangilanadi.</li><li>Taklif: 180, 270 va 330-kunda realizatsiya mutaxassisi va rahbariyatga eslatma.</li><li>Reyestrda «balansda 270 kundan ko'p» filtri: sotuvni tezlashtirish ro'yxati.</li></ul><h4>Nazoratning hissasi</h4><p>Kamera obyektni o'zi sotmaydi. U uchta to'siqni olib tashlaydi: eski surat, ko'rsatish uchun xodimning safari va xaridorning «ichi talangan emasmi» degan shubhasi. Har bir to'siq sotuvni haftalarga cho'zadi.</p><p class='ogoh'>Markaziy bank 2026-yil 10-sentabrda yangi 3937-son tasniflash va zaxira nizomini ro'yxatdan o'tkazgan. Bir yillik qoida saqlanganini taqdimotdan oldin yuristlar tekshirishi kerak.</p>",
    manba: [["MB 2696-son nizom, lex.uz", "https://lex.uz/mact/-2703053"]],
    ru: {
      yorliq: "Финансы и право",
      sarlavha: "365-й день: актив становится «безнадёжным»",
      tana: "<p>Положение ЦБ № 2696, пункт 20: если имущество, полученное в счёт залога, не продано в течение года с даты постановки на баланс, актив переходит в категорию «безнадёжных» и требует резерва 100%. Каждый день в продаже приближает к этой границе.</p><h4>Что делает платформа</h4><ul><li>В карточке объекта ежедневно обновляется показатель «На балансе N дней».</li><li>Предложение: напоминание специалисту по реализации и руководству на 180, 270 и 330-й день.</li><li>Фильтр реестра «на балансе более 270 дней» — список для ускоренной продажи.</li></ul><h4>Вклад мониторинга</h4><p>Камера сама объект не продаёт. Она снимает три барьера: старое фото, выезд сотрудника на каждый показ и сомнение покупателя «а не разграблено ли внутри». Каждый барьер растягивает продажу на недели.</p><p class='ogoh'>10 сентября 2026 года ЦБ зарегистрировал новое положение № 3937 о классификации активов и резервах. Сохранилось ли правило одного года, юристы должны проверить до презентации.</p>"
    }
  },

  "s-sotuv.kpi": {
    yorliq: "Marketing uchun",
    sarlavha: "Uchta ko'rsatkich va ularni hisoblash usuli",
    tana: "<p>Sotuv tezlashganini his bilan emas, bir xil usulda hisoblangan raqam bilan ko'rsatish kerak. Pilot uchun uchta ko'rsatkich yetarli.</p><table><tr><th>Ko'rsatkich</th><th>Formula</th></tr><tr><td>Sotuv muddati</td><td>Shartnoma sanasi − e'lon sanasi, kunda. Obyekt turi bo'yicha mediana</td></tr><tr><td>Ko'rishdan tashrifga</td><td>Tasdiqlangan tashriflar ÷ e'lon ko'rishlari, %</td></tr><tr><td>Tashrifdan taklifga</td><td>Taklif bergan xaridorlar ÷ tashrif buyurganlar, %</td></tr></table><h4>Solishtirish</h4><ul><li>Asos: reyestrdagi oxirgi 12 oyda sotilgan shu turdagi obyektlar.</li><li>Pilotdagi 10 obyekt nazoratsiz o'xshash obyektlar bilan yonma-yon kuzatiladi.</li><li>Hisobot oyiga bir marta, realizatsiya paneliga chiqariladi.</li></ul><p class='ogoh'>10 obyekt statistik isbot uchun kam. Pilot natijasi yo'nalishni ko'rsatadi, yakuniy xulosa 50+ obyektdan keyin chiqariladi.</p>",
    manba: [],
    ru: {
      yorliq: "Для маркетинга",
      sarlavha: "Три показателя и как их считать",
      tana: "<p>Ускорение продаж нужно показать не ощущением, а цифрой, посчитанной одинаково. Для пилота достаточно трёх показателей.</p><table><tr><th>Показатель</th><th>Формула</th></tr><tr><td>Срок продажи</td><td>Дата договора − дата объявления, в днях. Медиана по типу объекта</td></tr><tr><td>Из просмотра в визит</td><td>Подтверждённые визиты ÷ просмотры объявления, %</td></tr><tr><td>Из визита в предложение</td><td>Покупатели с предложением ÷ посетившие объект, %</td></tr></table><h4>Сравнение</h4><ul><li>База: объекты того же типа, проданные за последние 12 месяцев, из реестра.</li><li>10 пилотных объектов отслеживаются рядом с похожими объектами без мониторинга.</li><li>Отчёт раз в месяц, выводится на панель реализации.</li></ul><p class='ogoh'>10 объектов мало для статистического доказательства. Пилот покажет направление, окончательный вывод — после 50+ объектов.</p>"
    }
  },

  /* ===================== 40 · Savol-javob ===================== */
  "s-faq.ogirlik": {
    yorliq: "Rahbariyat uchun",
    sarlavha: "Jihoz o'g'irlansa ham dalil qoladi",
    tana: "<p>Panel, akkumulyator va kamera bozorda likvid tovar, shuning uchun o'g'irlik xatari rejalashtiriladi, inkor qilinmaydi.</p><h4>Nima sodir bo'ladi</h4><ol><li>Hovliga kirgan odamni harakat datchigi yoki kamera ko'radi. Kadr va qisqa klip darhol serverga yuboriladi.</li><li>Shkaf ochilsa yoki kamera qiyshaysa, alohida signal keladi.</li><li>Qurilma aloqadan chiqsa, last_seen bo'yicha bir necha daqiqada «Aloqa yo'q» ogohlantirishi chiqadi.</li><li>Operator kadrni tekshiradi va Qo'riqlash departamenti yoki 102 ga xabar beradi.</li></ol><h4>Oldini olish</h4><ul><li>Kamera va panel 3–4 m balandlikda, antivandal qutida, maxsus boltlar bilan.</li><li>Jihoz bank mulki sifatida sug'urtalanadi.</li><li>Ijara modelida jihoz yetkazib beruvchi balansida, xatar ham unda.</li></ul><div class='raqamlar'><div><b>5–9 mln</b><span>so'm, quyosh-4G bilan bir obyekt</span></div><div><b>3–4 m</b><span>o'rnatish balandligi</span></div></div><p class='ogoh'>Pilotda o'g'irlik bo'lmasa ham, shkaf ochilishi va aloqa uzilishi signali sinab ko'riladi.</p>",
    manba: [],
    ru: {
      yorliq: "Для руководства",
      sarlavha: "Даже если оборудование украдут, доказательства останутся",
      tana: "<p>Панель, аккумулятор и камера — ликвидный товар, поэтому риск кражи закладывается в план, а не отрицается.</p><h4>Что происходит</h4><ol><li>Человека во дворе видит датчик движения или камера. Кадр и короткий клип сразу уходят на сервер.</li><li>Если шкаф открыли или камеру наклонили, приходит отдельный сигнал.</li><li>Если устройство пропало со связи, через несколько минут по last_seen появляется предупреждение «Нет связи».</li><li>Оператор проверяет кадр и сообщает в Департамент охраны или по 102.</li></ol><h4>Профилактика</h4><ul><li>Камера и панель на высоте 3–4 м, в антивандальном боксе, на специальных болтах.</li><li>Оборудование страхуется как имущество банка.</li><li>При аренде оборудование на балансе поставщика, риск тоже на нём.</li></ul><div class='raqamlar'><div><b>5–9 млн</b><span>сумов, объект с солнечной 4G-камерой</span></div><div><b>3–4 м</b><span>высота установки</span></div></div><p class='ogoh'>Даже без кражи в пилоте проверяются сигналы вскрытия шкафа и потери связи.</p>"
    }
  },

  "s-faq.tun": {
    yorliq: "Rahbariyat uchun",
    sarlavha: "Tungi signal: operator tekshiradi, davlat qo'riqlaydi",
    tana: "<p>O'RQ-778 bo'yicha shartnoma asosida qo'riqlashni faqat davlat ko'rsatadi. Shuning uchun vazifa ikkiga bo'linadi: signalni bank ko'radi, jismoniy javobni IIV huzuridagi Qo'riqlash departamenti beradi.</p><h4>Eskalatsiya tartibi</h4><ol><li>Hodisa platformaga keladi: kadr, qurilma, obyekt.</li><li>Navbatchi operator 1–2 daqiqada videoni tekshiradi.</li><li>Tasdiqlansa — departament pultiga yoki 102 ga qo'ng'iroq, obyekt menejeriga xabar.</li><li>Yolg'on bo'lsa — izoh bilan yopiladi. Yolg'on signallar ulushi pilotda o'lchanadi.</li></ol><h4>Bank tanlashi kerak</h4><table><tr><th>Variant</th><th>Mazmuni</th></tr><tr><td>Bankning 24/7 posti</td><td>3–4 smenali operator, barcha obyektlar bitta ekranda</td></tr><tr><td>Kunduz bank, tunda departament</td><td>Tungi signal to'g'ridan-to'g'ri departament pultiga</td></tr></table><p>Hodisaga asoslangan tizimda operator yuzta jonli videoni emas, faqat kelgan signallarni ko'radi. Shu sabab bitta smenaga bitta operator yetishi mumkin. Aniq soni pilotdagi signallar sonidan hisoblanadi.</p>",
    manba: [["O'RQ-778, lex.uz", "https://lex.uz/docs/-6066682"]],
    ru: {
      yorliq: "Для руководства",
      sarlavha: "Ночной сигнал: проверяет оператор, охраняет государство",
      tana: "<p>По ЗРУ-778 охрану по договору оказывает только государство. Поэтому задача делится на две части: сигнал видит банк, физически реагирует Департамент охраны при МВД.</p><h4>Порядок эскалации</h4><ol><li>Событие приходит в платформу: кадр, устройство, объект.</li><li>Дежурный оператор за 1–2 минуты проверяет видео.</li><li>Если подтвердилось — звонок на пульт департамента или по 102, уведомление менеджеру объекта.</li><li>Если ложное — закрывается с комментарием. Доля ложных срабатываний измеряется в пилоте.</li></ol><h4>Что должен выбрать банк</h4><table><tr><th>Вариант</th><th>Суть</th></tr><tr><td>Круглосуточный пост банка</td><td>Оператор в 3–4 смены, все объекты на одном экране</td></tr><tr><td>Днём банк, ночью департамент</td><td>Ночные сигналы уходят сразу на пульт департамента</td></tr></table><p>В системе на событиях оператор смотрит не сто живых видео, а только пришедшие сигналы. Поэтому одного оператора на смену может хватить. Точное число считается по количеству сигналов в пилоте.</p>"
    }
  },

  "s-faq.qayta": {
    yorliq: "Rahbariyat uchun",
    sarlavha: "Jihoz obyekt bilan birga sotilmaydi",
    tana: "<p>Obyekt bir yilda sotilishi kerak, kamera esa 5–7 yil ishlaydi. Demak bir komplekt hayoti davomida bir necha obyektga xizmat qiladi.</p><h4>Ko'chirish tartibi</h4><ol><li>Sotuv shartnomasiga «nazorat jihozlari bank mulki va sotuv tarkibiga kirmaydi» bandi yoziladi.</li><li>Montajchi jihozni yechadi. Batareyali va quyosh kamerasi uchun bu 1–2 soat.</li><li>Reyestrda qurilma eski obyektdan uziladi va omborga, keyin yangi obyektga bog'lanadi.</li><li>Parollar va VPN kaliti almashtiriladi, SD karta arxivlanib tozalanadi.</li></ol><p>Eski obyektning hodisa va video tarixi o'sha obyektda qoladi. Sud yoki sug'urta da'vosi chiqsa, dalil yo'qolmaydi.</p><h4>Nima ko'chmaydi</h4><ul><li>Elektr qulf va domofon kabeli — obyekt bilan qoladi, smetada alohida qator.</li><li>Lavha — yangi lot raqami bilan qayta bosiladi.</li></ul><p class='ogoh'>Buxgalteriya jihozni asosiy vosita sifatida hisobga oladi, obyekt balans qiymatiga qo'shmaydi.</p>",
    manba: [],
    ru: {
      yorliq: "Для руководства",
      sarlavha: "Оборудование не продаётся вместе с объектом",
      tana: "<p>Объект должен быть продан за год, а камера работает 5–7 лет. Значит, один комплект за свою жизнь обслужит несколько объектов.</p><h4>Порядок переноса</h4><ol><li>В договор купли-продажи вносится пункт: «оборудование мониторинга — собственность банка и в предмет продажи не входит».</li><li>Монтажник снимает оборудование. Для батарейной и солнечной камеры это 1–2 часа.</li><li>В реестре устройство отвязывается от старого объекта, числится на складе, затем привязывается к новому.</li><li>Пароли и ключ VPN меняются, SD-карта архивируется и очищается.</li></ol><p>История событий и видео остаётся у старого объекта. Если возникнет суд или страховой спор, доказательства не пропадут.</p><h4>Что не переносится</h4><ul><li>Электрозамок и кабель домофона остаются на объекте, в смете это отдельная строка.</li><li>Табличка перепечатывается с новым номером лота.</li></ul><p class='ogoh'>Бухгалтерия учитывает оборудование как основное средство и не добавляет к балансовой стоимости объекта.</p>"
    }
  },

  "s-faq.nega": {
    yorliq: "Rahbariyat uchun",
    sarlavha: "Pilot xatoni 10 obyekt byudjetida ushlaydi",
    tana: "<p>O'nta yechimning narxi bir obyekt uchun 3 mln so'mdan 100 mln so'mdan oshiqqacha. Qaysi obyektga qaysi biri mosligini qog'ozda aniq aytib bo'lmaydi: 4G signali, qishki quyosh, o'g'irlik xavfi va sotuv muddati har joyda boshqa.</p><h4>Pilot nimani o'lchaydi</h4><ul><li>Ishlash vaqti: qurilma necha foiz vaqt aloqada bo'ldi.</li><li>Avtonomlik: akkumulyator eng past zaryadi va qishdagi uzilishlar.</li><li>Yolg'on signallar soni va operator yuklamasi.</li><li>Oylik trafik va SIM xarajati.</li><li>Servis tashriflari soni.</li></ul><h4>Hisob</h4><p>Taxminiy hisob: 10 obyekt × 10–15 mln so'm = 100–150 mln so'm jihoz va montaj. SIM va olti haftalik servis bilan ko'pi bilan 200 mln so'm (39-slayd). Integratsiyani bankning o'z jamoasi qiladi. 267 obyektga birdan o'tilsa, xato yechim bir necha mlrd so'mlik xaridga aylanadi.</p><p class='ogoh'>Pilot 6 hafta davom etadi va qishni qamramasligi mumkin. Quyosh yechimlari bo'yicha yakuniy qaror birinchi dekabr-yanvar ma'lumotidan keyin tasdiqlanadi.</p>",
    manba: [],
    ru: {
      yorliq: "Для руководства",
      sarlavha: "Пилот удерживает ошибку в бюджете 10 объектов",
      tana: "<p>Десять решений стоят от 3 млн до более чем 100 млн сумов за объект. Какое подходит какому объекту, на бумаге точно не сказать: 4G-сигнал, зимнее солнце, риск кражи и срок продажи везде разные.</p><h4>Что измеряет пилот</h4><ul><li>Время работы: какой процент времени устройство было на связи.</li><li>Автономность: минимальный заряд аккумулятора и отключения зимой.</li><li>Количество ложных сигналов и нагрузка на оператора.</li><li>Месячный трафик и расходы на SIM.</li><li>Количество сервисных выездов.</li></ul><h4>Расчёт</h4><p>Ориентировочно: 10 объектов × 10–15 млн сумов = 100–150 млн сумов на оборудование и монтаж. С SIM и шестью неделями сервиса — не более 200 млн сумов (слайд 39). Интеграцию делает собственная команда банка. Если сразу перейти на 267 объектов, неверное решение превратится в закупку на несколько млрд сумов.</p><p class='ogoh'>Пилот длится 6 недель и может не захватить зиму. По солнечным решениям окончательное решение утверждается после первых данных за декабрь-январь.</p>"
    }
  },

  "s-faq.bulut": {
    yorliq: "Jamoa rahbarlari uchun",
    sarlavha: "Vendor buluti o'chsa ham oqim to'xtamaydi",
    tana: "<p>Ko'p kamera sukut bo'yicha ishlab chiqaruvchining P2P bulutiga ulanadi. Bu bulut bloklansa, narxini o'zgartirsa yoki ma'lumotni chet elda saqlasa, bank nazoratsiz qoladi. Shuning uchun arxitektura bulutga tayanmaydi.</p><h4>Qanday quriladi</h4><ul><li>Qurilma yopiq APN yoki VPN ichida, ochiq internetga chiqmaydi.</li><li>P2P xizmatlari (Hik-Connect va shunga o'xshash) o'chiriladi.</li><li>MKB adapteri kamera yoki shlyuz bilan to'g'ridan-to'g'ri gaplashadi: RTSP, ONVIF, ISAPI, CGI.</li><li>Hodisa adapterda yagona JSON sxemaga keltiriladi va hodisa shinasiga yoziladi.</li></ul><h4>Istisnolar</h4><table><tr><th>Brend</th><th>Bulutga bog'liqlik</th></tr><tr><td>Hikvision, Dahua</td><td>Yo'q, ISAPI va SDK mahalliy</td></tr><tr><td>Reolink</td><td>Home Hub orqali mahalliy RTSP</td></tr><tr><td>Ajax</td><td>Sozlash bulut orqali; hodisa SIA DC-09 bilan pultga</td></tr></table><p class='ogoh'>Pilot shartlaridan biri: internet tashqariga yopilgan holatda har yechim 24 soat ishlab turishi kerak.</p>",
    manba: [],
    ru: {
      yorliq: "Для тимлида",
      sarlavha: "Облако вендора отключат — поток не остановится",
      tana: "<p>Многие камеры по умолчанию подключаются к P2P-облаку производителя. Если облако заблокируют, изменят тариф или будут хранить данные за рубежом, банк останется без контроля. Поэтому архитектура на облако не опирается.</p><h4>Как устроено</h4><ul><li>Устройство работает внутри закрытого APN или VPN и не выходит в открытый интернет.</li><li>P2P-сервисы (Hik-Connect и подобные) отключаются.</li><li>Адаптер MKB общается с камерой или шлюзом напрямую: RTSP, ONVIF, ISAPI, CGI.</li><li>Событие приводится в адаптере к единой JSON-схеме и пишется в шину событий.</li></ul><h4>Исключения</h4><table><tr><th>Бренд</th><th>Зависимость от облака</th></tr><tr><td>Hikvision, Dahua</td><td>Нет, ISAPI и SDK локально</td></tr><tr><td>Reolink</td><td>Локальный RTSP через Home Hub</td></tr><tr><td>Ajax</td><td>Настройка через облако; события по SIA DC-09 на пульт</td></tr></table><p class='ogoh'>Одно из условий пилота: каждое решение должно проработать 24 часа при закрытом выходе в интернет.</p>"
    }
  },

  "s-faq.trafik": {
    yorliq: "Jamoa rahbarlari uchun",
    sarlavha: "Trafik: bir kamera oyiga 0,8–4,3 GB",
    tana: "<p>Doimiy oqim 4G kamerani ham, SIM byudjetini ham tez tugatadi. Hodisaga asoslangan tizimda trafik to'rt qismdan iborat. Farazlar 23-slayddagi video hisobi bilan bir xil, haqiqiy raqamni pilot beradi.</p><table><tr><th>Qism</th><th>Faraz</th><th>Oyiga</th></tr><tr><td>Holat signali</td><td>har 60 s, ~0,5 KB</td><td class='n'>~22 MB</td></tr><tr><td>Hodisa kadri</td><td>30 ta/kun × 200 KB</td><td class='n'>~180 MB</td></tr><tr><td>Klip</td><td>10 ta/kun × 2 MB</td><td class='n'>~600 MB</td></tr><tr><td>Jonli ko'rish</td><td>30 daq/kun × 512 kbit/s</td><td class='n'>~3,5 GB</td></tr><tr><td><b>Jami</b></td><td></td><td class='n'>~4,3 GB</td></tr></table><h4>Nimani boshqaramiz</h4><ul><li>Jonli sessiya 60 soniyalik token bilan ochiladi va o'zi yopiladi.</li><li>Klip uzunligi va bitreyt obyekt profilida sozlanadi.</li><li>Oylik limitning 80% iga yetganda platforma ogohlantiradi.</li></ul><p>Jonli video ochilmasa, oyiga 0,8 GB bilan eng kichik paket yetadi. Yopiq APN bilan korporativ tarif operator bilan markazdan kelishiladi. 31-slayddagi hisobda SIM va trafik uchun obyektga yiliga 1,2 mln so'm qo'yilgan.</p><p class='ogoh'>Shamol, hayvon yoki daraxt soyasi yolg'on harakat hodisasini ko'paytiradi. Detektor zonasi montajda sozlanmasa, trafik ikki-uch barobar oshadi.</p>",
    manba: [],
    ru: {
      yorliq: "Для тимлида",
      sarlavha: "Трафик: 0,8–4,3 ГБ на камеру в месяц",
      tana: "<p>Постоянный поток быстро съедает и 4G-камеру, и бюджет SIM. В системе на событиях трафик складывается из четырёх частей. Допущения те же, что в расчёте видео на слайде 23, реальные цифры даст пилот.</p><table><tr><th>Часть</th><th>Допущение</th><th>В месяц</th></tr><tr><td>Сигнал состояния</td><td>каждые 60 с, ~0,5 КБ</td><td class='n'>~22 МБ</td></tr><tr><td>Кадр события</td><td>30 в день × 200 КБ</td><td class='n'>~180 МБ</td></tr><tr><td>Клип</td><td>10 в день × 2 МБ</td><td class='n'>~600 МБ</td></tr><tr><td>Живой просмотр</td><td>30 мин в день × 512 кбит/с</td><td class='n'>~3,5 ГБ</td></tr><tr><td><b>Итого</b></td><td></td><td class='n'>~4,3 ГБ</td></tr></table><h4>Чем управляем</h4><ul><li>Живая сессия открывается токеном на 60 секунд и закрывается сама.</li><li>Длина клипа и битрейт задаются в профиле объекта.</li><li>При 80% месячного лимита платформа предупреждает.</li></ul><p>Если живое видео не открывать, 0,8 ГБ в месяц укладываются в самый малый пакет. Корпоративный тариф с закрытым APN согласуется с оператором централизованно. В расчёте на слайде 31 на SIM и трафик заложено 1,2 млн сумов в год на объект.</p><p class='ogoh'>Ветер, животные и тень деревьев умножают ложные события движения. Если зону детектора не настроить при монтаже, трафик вырастет в два-три раза.</p>"
    }
  },

  "s-faq.brend": {
    yorliq: "Jamoa rahbarlari uchun",
    sarlavha: "Yangi brend — bu yangi adapter, xolos",
    tana: "<p>Veb-panel va mobil ilova hech qachon kameraga to'g'ridan-to'g'ri murojaat qilmaydi. Ular faqat MKB API bilan ishlaydi. Shuning uchun yangi ishlab chiqaruvchi qo'shilganda o'zgaradigan yagona qism — adapter.</p><h4>Adapter nimani bajarishi shart</h4><ol><li>Hodisani yagona sxemaga o'tkazish: obyekt_id, qurilma_id, tur, vaqt UTC'da, kadr havolasi.</li><li>Holatni berish: batareya, signal, xotira, last_seen.</li><li>Buyruqni bajarish: eshik, PTZ, sirena. Natija jurnalga qaytadi.</li><li>Video manzilini media shlyuzga berish: RTSP yoki ONVIF profili.</li></ol><h4>Qabul testi</h4><ul><li>Shartnoma testlari: har xabar JSON Schema'dan o'tadi.</li><li>Yozib olingan haqiqiy hodisalarda qurilmasiz sinov.</li><li>Pilotda bir hafta: hodisa yo'qolmaydi, takror hodisa bitta yozuvga birlashadi.</li></ul><p>Taxminiy mehnat: hujjatlashgan API'li brend uchun 1–4 hafta, brendlar bo'yicha baho 22-slaydda. API yopiq bo'lsa, faqat ONVIF va RTSP darajasida ulanadi va hodisalar cheklangan bo'ladi.</p><p class='ogoh'>Tenderda ishlab chiqaruvchidan ochiq API hujjati va sinov qurilmasi talab qilinadi. Hujjat bermagan brend ro'yxatga kirmaydi.</p>",
    manba: [],
    ru: {
      yorliq: "Для тимлида",
      sarlavha: "Новый бренд — это просто новый адаптер",
      tana: "<p>Веб-панель и мобильное приложение никогда не обращаются к камере напрямую. Они работают только с MKB API. Поэтому при подключении нового производителя меняется одна часть — адаптер.</p><h4>Что обязан делать адаптер</h4><ol><li>Переводить событие в единую схему: объект_id, устройство_id, тип, время в UTC, ссылка на кадр.</li><li>Отдавать состояние: батарея, сигнал, память, last_seen.</li><li>Выполнять команды: дверь, PTZ, сирена. Результат возвращается в журнал.</li><li>Передавать адрес видео медиашлюзу: RTSP или профиль ONVIF.</li></ol><h4>Приёмочный тест</h4><ul><li>Контрактные тесты: каждое сообщение проходит JSON Schema.</li><li>Прогон на записанных реальных событиях без устройства.</li><li>Неделя на пилоте: события не теряются, повторы склеиваются в одну запись.</li></ul><p>Ориентировочная трудоёмкость — 1–4 недели для бренда с документированным API, оценки по брендам на слайде 22. Если API закрыт, подключение идёт только на уровне ONVIF и RTSP, события будут ограничены.</p><p class='ogoh'>В тендере от производителя требуют открытую документацию API и тестовое устройство. Бренд без документации в список не попадает.</p>"
    }
  },

  "s-faq.saqlash": {
    yorliq: "Jamoa rahbarlari uchun",
    sarlavha: "Ma'lumot uch joyda, hammasi O'zbekistonda",
    tana: "<p>2026-yil 26-martdagi O'RQ-1125 shaxsga doir ma'lumotlar qonunining 27-1-moddasini o'zgartirdi: majburiy lokalizatsiya endi biometrik, genetik va aloqa abonentlari ma'lumotiga tegishli. Yuzni tanish yoqilsa, shablonlar faqat O'zbekistonda turadi.</p><h4>Qatlamlar</h4><table><tr><th>Joy</th><th>Nima</th><th>Muddat (taklif)</th></tr><tr><td>SD karta, NVR</td><td>To'liq yozuv</td><td>Xotira to'lguncha, aylanma</td></tr><tr><td>Bank serveri</td><td>Hodisa, kadr, klip</td><td>90 kun</td></tr><tr><td>Dalil arxivi</td><td>Belgilangan klip va xeshi</td><td>Ish yopilguncha</td></tr></table><h4>Himoya</h4><ul><li>Klip saqlanganda SHA-256 xeshi yoziladi, keyingi o'zgarish aniqlanadi.</li><li>Ko'rish huquqi rol bo'yicha, har ochilish jurnalda.</li><li>Ishlab chiqaruvchi buluti o'chirilgan.</li></ul><p class='ogoh'>Saqlash muddatlari bank ichki hujjati bilan tasdiqlanadi. Jadvaldagi muddatlar boshlang'ich taklif.</p>",
    manba: [["Shaxsga doir ma'lumotlar qonuni, lex.uz", "https://lex.uz/docs/-4396419"]],
    ru: {
      yorliq: "Для тимлида",
      sarlavha: "Данные в трёх местах, все в Узбекистане",
      tana: "<p>ЗРУ-1125 от 26 марта 2026 года изменил статью 27-1 закона о персональных данных: обязательная локализация теперь касается биометрических, генетических данных и данных абонентов связи. Если включено распознавание лиц, шаблоны хранятся только в Узбекистане.</p><h4>Уровни</h4><table><tr><th>Место</th><th>Что</th><th>Срок (предложение)</th></tr><tr><td>SD-карта, NVR</td><td>Полная запись</td><td>По кругу, до заполнения</td></tr><tr><td>Сервер банка</td><td>События, кадры, клипы</td><td>90 дней</td></tr><tr><td>Архив доказательств</td><td>Отмеченный клип и его хеш</td><td>До закрытия дела</td></tr></table><h4>Защита</h4><ul><li>При сохранении клипа записывается хеш SHA-256, любое изменение обнаруживается.</li><li>Доступ к просмотру по ролям, каждое открытие в журнале.</li><li>Облако производителя отключено.</li></ul><p class='ogoh'>Сроки хранения утверждаются внутренним документом банка. Сроки в таблице — стартовое предложение.</p>"
    }
  },

  "s-faq.kalit": {
    yorliq: "Montajchi uchun",
    sarlavha: "Kalit, topshiriq va jurnal",
    tana: "<p>Balansdagi obyekt yopiq va muhrlangan. Montajchi unga faqat tizimdagi topshiriq bilan kiradi.</p><h4>Tartib</h4><ol><li>Obyekt menejeri platformada servis topshirig'ini ochadi: obyekt, sana, jihozlar ro'yxati, bajaruvchi.</li><li>Montajchi pasport ma'lumoti bilan topshiriqqa biriktiriladi.</li><li>Kalit dalolatnoma bilan beriladi yoki menejer obyektda kutib oladi.</li><li>Muhr ochilishi va yopilishi suratga olinadi va topshiriqqa yuklanadi.</li><li>Ish oxirida kalit qaytariladi, topshiriq yopiladi.</li></ol><h4>Montajchi nimani topshiradi</h4><ul><li>Oldingi va keyingi holat surati: har o'rnatish nuqtasi uchun.</li><li>Har qurilmaning seriya raqami va SIM ICCID.</li><li>Zavod paroli almashtirilgani haqida tasdiq.</li></ul><p class='ogoh'>Birinchi kamera ishga tushgach, keyingi kirishlar domofon orqali masofadan ochilishi mumkin. Kalit faqat avariya holatida kerak bo'ladi.</p>",
    manba: [],
    ru: {
      yorliq: "Для монтажника",
      sarlavha: "Ключ, задание и журнал",
      tana: "<p>Объект на балансе закрыт и опломбирован. Монтажник попадает туда только по заданию в системе.</p><h4>Порядок</h4><ol><li>Менеджер объекта открывает в платформе сервисное задание: объект, дата, список оборудования, исполнитель.</li><li>Монтажник привязывается к заданию по паспортным данным.</li><li>Ключ выдаётся по акту, или менеджер встречает на объекте.</li><li>Снятие и установка пломбы фотографируются и загружаются в задание.</li><li>По окончании работ ключ возвращается, задание закрывается.</li></ol><h4>Что сдаёт монтажник</h4><ul><li>Фото до и после по каждой точке установки.</li><li>Серийный номер каждого устройства и ICCID SIM.</li><li>Подтверждение смены заводского пароля.</li></ul><p class='ogoh'>Когда первая камера заработала, следующие входы можно открывать удалённо через домофон. Ключ нужен только в аварийной ситуации.</p>"
    }
  },

  "s-faq.qish": {
    yorliq: "Montajchi uchun",
    sarlavha: "Qishda akkumulyatorni nima himoya qiladi",
    tana: "<p>LiFePO4 akkumulyatorni 0 °C dan past haroratda zaryadlash uni qaytarilmas buzadi. Isitilmaydigan bo'sh binoda bu dekabrdan fevralgacha har kechasi takrorlanadi.</p><h4>Uch himoya qatlami</h4><ol><li><b>BMS</b> past haroratda zaryadni to'xtatadi. Shartnomada bu majburiy talab.</li><li><b>Joylashuv:</b> akkumulyator shkafi mumkin bo'lsa bino ichida, tashqi devordan uzoqda. Tashqarida bo'lsa — izolyatsiyalangan quti.</li><li><b>Isitgichli akkumulyator:</b> panel quvvatining bir qismini o'zini isitishga sarflaydi. Qimmatroq, lekin tashqi shkaf uchun to'g'ri tanlov.</li></ol><h4>Montajda tekshiriladi</h4><ul><li>Datasheet'da zaryad va razryad harorati alohida ko'rsatilgan. Hikvision 4G quyosh kamerasida zaryad 0…45 °C, razryad −20…50 °C.</li><li>Panel dekabr quyoshiga moslab qiyalatiladi, tik burchak qor va changni ham kamaytiradi.</li><li>Harorat telemetriyasi platformaga kelayotgani sinab ko'riladi.</li></ul><p class='ogoh'>Quvvat hisobi 29-slaydda: panel va akkumulyator yozga emas, dekabrga tanlanadi.</p>",
    manba: [],
    ru: {
      yorliq: "Для монтажника",
      sarlavha: "Что защищает аккумулятор зимой",
      tana: "<p>Заряд LiFePO4 при температуре ниже 0 °C необратимо его разрушает. В неотапливаемом пустом здании это повторяется каждую ночь с декабря по февраль.</p><h4>Три уровня защиты</h4><ol><li><b>BMS</b> прекращает заряд при низкой температуре. В договоре это обязательное требование.</li><li><b>Размещение:</b> шкаф с аккумулятором по возможности внутри здания, подальше от наружной стены. Если снаружи — утеплённый бокс.</li><li><b>Аккумулятор с подогревом:</b> тратит часть энергии панели на самоподогрев. Дороже, но правильный выбор для наружного шкафа.</li></ol><h4>Что проверяется при монтаже</h4><ul><li>В даташите температуры заряда и разряда указаны отдельно. У солнечной 4G-камеры Hikvision заряд 0…45 °C, разряд −20…50 °C.</li><li>Наклон панели подбирается под декабрьское солнце, крутой угол заодно уменьшает снег и пыль.</li><li>Проверяется, что телеметрия температуры доходит до платформы.</li></ul><p class='ogoh'>Расчёт питания — на слайде 29: панель и аккумулятор подбираются под декабрь, а не под лето.</p>"
    }
  },

  "s-faq.signal": {
    yorliq: "Montajchi uchun",
    sarlavha: "Signal o'rnatish nuqtasida o'lchanadi",
    tana: "<p>Telefon ko'chada to'rt tayoqcha ko'rsatishi omborning ichida signal borligini anglatmaydi. O'lchov kamera yoki router turadigan joyda, barcha operatorlar bo'yicha qilinadi.</p><h4>Nima o'lchanadi</h4><ul><li>RSRP — signal kuchi, RSRQ va SINR — sifati.</li><li>Har operator uchun alohida: Ucell, Beeline, Uzmobile, Mobiuz.</li><li>Kunduzi va kechqurun, chunki yuklama o'zgaradi.</li></ul><table><tr><th>RSRP</th><th>Qaror</th></tr><tr><td>−90 dBm dan yaxshi</td><td>Ichki antenna yetadi</td></tr><tr><td>−90…−105 dBm</td><td>Ishlaydi, video faqat hodisada</td></tr><tr><td>−105…−115 dBm</td><td>Tashqi yo'naltirilgan antenna yoki boshqa operator</td></tr><tr><td>−115 dBm dan yomon</td><td>LoRaWAN, radio ko'prik orqali klaster shkafi yoki yo'ldosh</td></tr></table><p>Shkala 27-slayddagi ko'rik shkalasi bilan bir xil.</p><p>Ikki SIM'li router asosiy operator tushib qolsa, ikkinchisiga o'tadi. Ikkala SIM turli operatordan olinadi.</p><p class='ogoh'>Chegaralar amaliy mo'ljal, aniq qiymat uskuna va operatorga bog'liq. Pilotda o'lchov natijasi har obyekt kartochkasiga yoziladi.</p>",
    manba: [],
    ru: {
      yorliq: "Для монтажника",
      sarlavha: "Сигнал измеряют в точке установки",
      tana: "<p>Четыре палочки на телефоне на улице не значат, что внутри склада есть сигнал. Измерение делается там, где будет стоять камера или роутер, по всем операторам.</p><h4>Что измеряется</h4><ul><li>RSRP — уровень сигнала, RSRQ и SINR — качество.</li><li>Отдельно для каждого оператора: Ucell, Beeline, Uzmobile, Mobiuz.</li><li>Днём и вечером, потому что нагрузка меняется.</li></ul><table><tr><th>RSRP</th><th>Решение</th></tr><tr><td>Лучше −90 дБм</td><td>Хватает встроенной антенны</td></tr><tr><td>−90…−105 дБм</td><td>Работает, видео только по событию</td></tr><tr><td>−105…−115 дБм</td><td>Внешняя направленная антенна или другой оператор</td></tr><tr><td>Хуже −115 дБм</td><td>LoRaWAN, радиомост до кластерного шкафа или спутник</td></tr></table><p>Шкала совпадает со шкалой обследования на слайде 27.</p><p>Роутер на две SIM переключается на вторую, если основной оператор пропал. Обе SIM берутся у разных операторов.</p><p class='ogoh'>Пороги — практический ориентир, точные значения зависят от оборудования и оператора. В пилоте результат замера записывается в карточку каждого объекта.</p>"
    }
  },

  "s-faq.qabul": {
    yorliq: "Montajchi uchun",
    sarlavha: "Qabul varag'i: nima ishlashi kerak",
    tana: "<p>Ish «kamera osildi» bilan emas, platformadagi sinov bilan topshiriladi. Qabulni obyekt menejeri va operator birga qiladi.</p><h4>Tekshiruv ro'yxati</h4><ol><li>Har qurilma reyestrda o'z obyektiga bog'langan, holati «Aloqada».</li><li>Sinov hodisasi: eshik ochiladi yoki harakat qilinadi, kadr platformaga keladi.</li><li>Kunduzgi va tungi kadr sifati tekshiriladi, yuz va darvoza ajralib ko'rinadi.</li><li>Eshik buyrug'i bajariladi va jurnalga tushadi.</li><li>Batareya, signal va harorat telemetriyasi ko'rinadi.</li><li>Zavod paroli almashtirilgan, P2P bulut o'chirilgan.</li><li>O'rnatish surati va seriya raqamlari topshiriqqa yuklangan.</li></ol><div class='raqamlar'><div><b>48 soat</b><span>montajdan keyin uzluksiz sinov</span></div><div><b>12 tekshiruv</b><span>to'liq ro'yxat 30-slaydda</span></div></div><p class='ogoh'>Bitta tekshiruv o'tmasa, dalolatnoma imzolanmaydi va to'lov bosqichi ochilmaydi.</p>",
    manba: [],
    ru: {
      yorliq: "Для монтажника",
      sarlavha: "Лист приёмки: что должно работать",
      tana: "<p>Работу сдают не словами «камера висит», а проверкой в платформе. Приёмку проводят менеджер объекта и оператор вместе.</p><h4>Чек-лист</h4><ol><li>Каждое устройство привязано в реестре к своему объекту, статус «На связи».</li><li>Тестовое событие: открывают дверь или проходят в зоне, кадр приходит в платформу.</li><li>Проверяется дневной и ночной кадр: различимы лицо и ворота.</li><li>Команда на дверь выполняется и попадает в журнал.</li><li>Видна телеметрия батареи, сигнала и температуры.</li><li>Заводской пароль заменён, P2P-облако отключено.</li><li>Фото установки и серийные номера загружены в задание.</li></ol><div class='raqamlar'><div><b>48 часов</b><span>непрерывного теста после монтажа</span></div><div><b>12 проверок</b><span>полный список на слайде 30</span></div></div><p class='ogoh'>Если не пройдена хотя бы одна проверка, акт не подписывается и этап оплаты не открывается.</p>"
    }
  },

  "s-faq.dalil": {
    yorliq: "Moliya va huquq",
    sarlavha: "Video dalil bo'lishi uchun uchta shart",
    tana: "<p>Oliy sud Plenumining 2020-yil 19-dekabrdagi 35-son qarori, 17-band: audio va video yozuvlar boshqa dalillar bilan birga baholanadi. Kuzatuv kamerasi yozuvi qonun hujjatlarini buzmagan holda olingan bo'lsagina maqbul dalil hisoblanadi. Yozuvni taqdim etgan tomon u qachon, kim tomonidan va qanday sharoitda olinganini ko'rsatadi.</p><h4>Tizim buni qanday ta'minlaydi</h4><ul><li><b>Qonuniylik:</b> kamera bank mulkida, «Hudud videokuzatuv ostida» lavhasi bilan, yozuv ochiq.</li><li><b>Kelib chiqish:</b> har klipda qurilma_id, obyekt_id, UTC vaqt va operator jurnali.</li><li><b>Butunlik:</b> saqlash paytida SHA-256 xeshi. Qalbakilikka shubha bo'lsa, ekspertiza shu xeshni solishtiradi.</li></ul><h4>Yurist uchun eksport paketi</h4><ol><li>Asl klip va xeshi.</li><li>Hodisa yozuvi: vaqt, qurilma, turi.</li><li>Kim ko'rgan va kim yuklab olganini ko'rsatuvchi jurnal ko'chirmasi.</li></ol><p class='ogoh'>Qarorda qalbakilik da'vo qilinsa, sud ekspertiza tayinlashi yoki boshqa dalil so'rashi mumkinligi aytilgan. Shuning uchun asl fayl o'zgartirilmasdan saqlanadi.</p>",
    manba: [["Plenum qarori № 35, lex.uz", "https://lex.uz/uz/docs/-5185744"]],
    ru: {
      yorliq: "Финансы и право",
      sarlavha: "Три условия, чтобы видео стало доказательством",
      tana: "<p>Постановление Пленума Верховного суда № 35 от 19 декабря 2020 года, пункт 17: аудио- и видеозаписи оцениваются в совокупности с другими доказательствами. Запись камеры наблюдения допустима, только если получена без нарушения законодательства. Сторона, представившая запись, указывает, когда, кем и при каких обстоятельствах она сделана.</p><h4>Как это обеспечивает система</h4><ul><li><b>Законность:</b> камера на имуществе банка, табличка «Ведётся видеонаблюдение», запись открытая.</li><li><b>Происхождение:</b> у каждого клипа устройство_id, объект_id, время UTC и журнал оператора.</li><li><b>Целостность:</b> при сохранении записывается хеш SHA-256. При сомнении в подлинности экспертиза сверяет этот хеш.</li></ul><h4>Пакет выгрузки для юриста</h4><ol><li>Исходный клип и его хеш.</li><li>Запись события: время, устройство, тип.</li><li>Выписка журнала: кто смотрел и кто скачивал.</li></ol><p class='ogoh'>В постановлении сказано, что при заявлении о подделке суд может назначить экспертизу или запросить другие доказательства. Поэтому исходный файл хранится без изменений.</p>"
    }
  },

  "s-faq.xususiy": {
    yorliq: "Moliya va huquq",
    sarlavha: "Kim nima qiladi: qo'riqlash va servis",
    tana: "<p>«Qo'riqlash faoliyati to'g'risida»gi O'RQ-778 qonunining 13-moddasi: shartnoma asosida qo'riqlash xizmatini faqat davlat organlari ko'rsatadi. Xususiy kompaniya bankning obyektini shartnoma bilan qo'riqlay olmaydi.</p><h4>Vazifalar taqsimoti</h4><table><tr><th>Ish</th><th>Kim</th></tr><tr><td>Jismoniy qo'riqlash, chaqiruvga chiqish</td><td>IIV huzuridagi Qo'riqlash departamenti</td></tr><tr><td>Signalni ko'rish va tekshirish</td><td>Bank operatori</td></tr><tr><td>Jihoz yetkazish, montaj, servis</td><td>Xususiy integrator, tender bilan</td></tr><tr><td>Platforma va integratsiya</td><td>Bank IT jamoasi</td></tr></table><h4>Shartnomada nimaga e'tibor beriladi</h4><ul><li>Integrator bilan shartnoma «qo'riqlash xizmati» emas, «jihoz yetkazish, o'rnatish va texnik xizmat» deb nomlanadi.</li><li>Integratordan qo'riqlash va yong'in signalizatsiyasi montajiga ruxsat hujjatlari so'raladi va tekshiriladi.</li><li>Departament bilan shartnomada signal qanday kanal orqali uzatilishi yoziladi.</li></ul>",
    manba: [["O'RQ-778, lex.uz", "https://lex.uz/docs/-6066682"]],
    ru: {
      yorliq: "Финансы и право",
      sarlavha: "Кто что делает: охрана и сервис",
      tana: "<p>Статья 13 ЗРУ-778 «Об охранной деятельности»: охрану по договору оказывают только государственные органы. Частная компания не может охранять объект банка по договору.</p><h4>Распределение задач</h4><table><tr><th>Работа</th><th>Кто</th></tr><tr><td>Физическая охрана, выезд по тревоге</td><td>Департамент охраны при МВД</td></tr><tr><td>Просмотр и проверка сигнала</td><td>Оператор банка</td></tr><tr><td>Поставка, монтаж, сервис</td><td>Частный интегратор, по тендеру</td></tr><tr><td>Платформа и интеграция</td><td>ИТ-команда банка</td></tr></table><h4>На что смотреть в договоре</h4><ul><li>Договор с интегратором называется не «охранные услуги», а «поставка, монтаж и техническое обслуживание оборудования».</li><li>У интегратора запрашивают и проверяют разрешительные документы на монтаж охранной и пожарной сигнализации.</li><li>В договоре с департаментом прописывается, по какому каналу передаётся сигнал.</li></ul>"
    }
  },

  "s-faq.zaxira": {
    yorliq: "Moliya va huquq",
    sarlavha: "Zaxira bo'yicha nazoratning hissasi",
    tana: "<p>MB 2696-son nizomi, 20-band: garov hisobidan olingan mulk balansga olingan kundan bir yil ichida sotilmasa, «umidsiz» toifaga o'tadi va 100% zaxira talab qiladi. Zaxira bankning kapitalidan ajratiladi.</p><h4>Nazorat qayerda ta'sir qiladi</h4><ul><li><b>Sotuv tezligi:</b> yangi surat, masofadan ko'rsatish va tashrif jurnali e'londan shartnomagacha bo'lgan muddatni qisqartiradi.</li><li><b>Qiymat saqlanishi:</b> talon-taroj qilingan bino arzonga ketadi. O'g'irlik va buzilishning oldi olinsa, boshlang'ich narxni pasaytirish kamroq kerak bo'ladi.</li><li><b>Sug'urta:</b> hodisa jurnali «bo'sh bino» shartlari bo'yicha da'vo rad etilish xavfini kamaytiradi.</li></ul><h4>Qanday o'lchanadi</h4><p>Pilotda 10 obyekt va o'xshash nazoratsiz obyektlar bo'yicha: balansda o'tgan kun, narx pasaytirishlar soni va sotuv narxining balans qiymatiga nisbati.</p><p class='ogoh'>MB 2026-yil 10-sentabrda yangi 3937-son nizomni ro'yxatdan o'tkazgan. Bir yillik qoidaning yangi tahriri yuristlar tomonidan solishtirilishi kerak.</p>",
    manba: [["MB 2696-son nizom, lex.uz", "https://lex.uz/mact/-2703053"]],
    ru: {
      yorliq: "Финансы и право",
      sarlavha: "Вклад мониторинга в резервы",
      tana: "<p>Положение ЦБ № 2696, пункт 20: если имущество, полученное в счёт залога, не продано в течение года с даты постановки на баланс, оно переходит в «безнадёжные» и требует резерва 100%. Резерв формируется за счёт капитала банка.</p><h4>Где влияет мониторинг</h4><ul><li><b>Скорость продажи:</b> свежие фото, удалённый показ и журнал визитов сокращают путь от объявления до договора.</li><li><b>Сохранность стоимости:</b> разграбленное здание уходит дёшево. Если предотвратить кражи и порчу, снижать стартовую цену приходится реже.</li><li><b>Страхование:</b> журнал событий снижает риск отказа по условиям «пустующего здания».</li></ul><h4>Как измеряется</h4><p>В пилоте по 10 объектам и похожим объектам без мониторинга: дни на балансе, число снижений цены и отношение цены продажи к балансовой стоимости.</p><p class='ogoh'>10 сентября 2026 года ЦБ зарегистрировал новое положение № 3937. Юристам нужно сверить, как в нём изложено правило одного года.</p>"
    }
  },

  "s-faq.ijara": {
    yorliq: "Moliya va huquq",
    sarlavha: "Sotib olish yoki ijara: mezon — muddat",
    tana: "<p>Obyekt balansda bir yildan kam turishi kerak, jihoz esa 5–7 yil ishlaydi. Qaror jihoz narxi va bir vaqtda nechta obyekt nazoratda bo'lishiga bog'liq.</p><table><tr><th>Jihoz</th><th>Narx, mln so'm</th><th>Tavsiya</th></tr><tr><td>Quyosh-4G kamera, datchik</td><td class='n'>3–12</td><td>Sotib olish, obyektdan obyektga ko'chirish</td></tr><tr><td>Ko'chma stansiya</td><td class='n'>7–16</td><td>Sotib olish, zaxira bloklar bilan</td></tr><tr><td>EFOY yoqilg'i elementi</td><td class='n'>80–170</td><td>Faqat qimmat chekka obyekt uchun, narx tuzatilgan baho</td></tr><tr><td>Mobil minora</td><td class='n'>40–120</td><td>Oylik ijara</td></tr></table><h4>Hisobda farq</h4><ul><li><b>Sotib olish</b> — asosiy vosita, amortizatsiya bilan. Jihoz bir necha obyektga xizmat qilsa, bir obyektga tushadigan ulush kamayadi.</li><li><b>Ijara</b> — oylik xarajat. Eskirish va buzilish xatari ijaraga beruvchida.</li></ul><p class='ogoh'>O'zbekistonda minora ijarasi bozori hali shakllanmagan. Ijara narxi tenderda kamida uchta taklif bilan aniqlanadi.</p>",
    manba: [],
    ru: {
      yorliq: "Финансы и право",
      sarlavha: "Купить или арендовать: решает срок",
      tana: "<p>Объект должен провести на балансе меньше года, а оборудование работает 5–7 лет. Решение зависит от цены оборудования и от того, сколько объектов одновременно под контролем.</p><table><tr><th>Оборудование</th><th>Цена, млн сумов</th><th>Рекомендация</th></tr><tr><td>Солнечная 4G-камера, датчики</td><td class='n'>3–12</td><td>Покупка, перенос с объекта на объект</td></tr><tr><td>Портативная станция</td><td class='n'>7–16</td><td>Покупка, с запасными блоками</td></tr><tr><td>Топливный элемент EFOY</td><td class='n'>80–170</td><td>Только для дорогого удалённого объекта, цена по уточнённой оценке</td></tr><tr><td>Мобильная вышка</td><td class='n'>40–120</td><td>Помесячная аренда</td></tr></table><h4>Разница в учёте</h4><ul><li><b>Покупка</b> — основное средство с амортизацией. Если оборудование служит нескольким объектам, доля на один объект снижается.</li><li><b>Аренда</b> — ежемесячный расход. Риск износа и поломки на арендодателе.</li></ul><p class='ogoh'>Рынок аренды вышек в Узбекистане ещё не сложился. Цена аренды определяется в тендере минимум по трём предложениям.</p>"
    }
  },

  "s-faq.lavha": {
    yorliq: "Marketing uchun",
    sarlavha: "Lavha bank brendini har obyektga olib chiqadi",
    tana: "<p>267 obyekt butun respublika bo'ylab joylashgan. Har birining darvozasida bir xil lavha turishi bank uchun tekin tashqi reklama: odamlar bankning balansdagi mulki tartibda ekanini ko'radi.</p><h4>Uch vazifa</h4><ol><li><b>To'xtatish.</b> Tasodifiy bosqinchi «egasiz bino» emas, kuzatuvdagi obyektni ko'radi.</li><li><b>Sotish.</b> «Sotuvda» va lot raqami, QR orqali lot sahifasi.</li><li><b>Shaffoflik.</b> Yozuv ochiq olib borilishi aytiladi, bu videoni dalil sifatida ishlatishda ham foydali.</li></ol><h4>Brend qoidalari</h4><ul><li>Bank belgisi, yashil va to'q ko'k ranglar, Manrope shrifti.</li><li>Matn uch qatordan oshmaydi, 10 metrdan o'qiladi.</li><li>Lot sotilgach, lavha yechiladi yoki «Sotildi» belgisi bilan bir hafta qoldiriladi.</li></ul><p class='ogoh'>Qo'shni aholi va sud ijrosi davom etayotgan obyektlarda lavha matni yurist bilan kelishiladi.</p>",
    manba: [],
    ru: {
      yorliq: "Для маркетинга",
      sarlavha: "Табличка выносит бренд банка на каждый объект",
      tana: "<p>267 объектов разбросаны по всей республике. Одинаковая табличка на воротах каждого — бесплатная наружная реклама банка: люди видят, что имущество на балансе банка в порядке.</p><h4>Три задачи</h4><ol><li><b>Остановить.</b> Случайный нарушитель видит не «бесхозное здание», а объект под наблюдением.</li><li><b>Продать.</b> «Продаётся» и номер лота, по QR — страница лота.</li><li><b>Прозрачность.</b> Сообщается, что запись ведётся открыто; это полезно и при использовании видео как доказательства.</li></ol><h4>Правила бренда</h4><ul><li>Логотип банка, зелёный и тёмно-синий цвета, шрифт Manrope.</li><li>Текст не длиннее трёх строк, читается с 10 метров.</li><li>После продажи табличку снимают или оставляют на неделю с отметкой «Продано».</li></ul><p class='ogoh'>Для объектов, где идёт исполнительное производство или рядом живут люди, текст таблички согласуется с юристом.</p>"
    }
  },

  "s-faq.video": {
    yorliq: "Marketing uchun",
    sarlavha: "Qaysi kadr e'longa chiqishi mumkin",
    tana: "<p>Kamera yozuvida odam yuzi, avtomobil raqami yoki qo'shni hovli bo'lsa, bu shaxsga doir ma'lumot. Uni reklama maqsadida ochiq e'longa qo'yish uchun asos yo'q. Bo'sh obyektning kadri esa oddiy mulk surati.</p><table><tr><th>Kadr</th><th>E'longa</th></tr><tr><td>Bo'sh hovli, fasad, darvoza</td><td>Mumkin</td></tr><tr><td>Tashrif paytidagi kadr</td><td>Yo'q</td></tr><tr><td>Ko'chadagi odam yoki mashina</td><td>Yo'q yoki xiralashtirilgan holda</td></tr><tr><td>Hodisa yozuvi</td><td>Yo'q, faqat ichki foydalanish</td></tr></table><h4>Ish tartibi</h4><ol><li>Realizatsiya mutaxassisi kadrni obyekt kartochkasidan tanlaydi.</li><li>Ikkinchi xodim uni tekshiradi: odam, raqam, qo'shni mulk yo'q.</li><li>Kadr sanasi bilan yuklanadi, tanlov jurnalga yoziladi.</li></ol><p class='ogoh'>E'longa qo'yiladigan videoni avval yuristlar bilan kelishilgan qoida bo'yicha tekshirish kerak. Ushbu jadval boshlang'ich taklif.</p>",
    manba: [["Shaxsga doir ma'lumotlar qonuni, lex.uz", "https://lex.uz/docs/-4396419"]],
    ru: {
      yorliq: "Для маркетинга",
      sarlavha: "Какой кадр можно ставить в объявление",
      tana: "<p>Если в записи есть лицо человека, номер машины или соседний двор, это персональные данные. Оснований публиковать их в рекламных целях нет. Кадр пустого объекта — обычная фотография имущества.</p><table><tr><th>Кадр</th><th>В объявление</th></tr><tr><td>Пустой двор, фасад, ворота</td><td>Можно</td></tr><tr><td>Кадр во время визита</td><td>Нельзя</td></tr><tr><td>Человек или машина на улице</td><td>Нельзя или с размытием</td></tr><tr><td>Запись инцидента</td><td>Нельзя, только для внутреннего пользования</td></tr></table><h4>Порядок</h4><ol><li>Специалист по реализации выбирает кадр в карточке объекта.</li><li>Второй сотрудник проверяет: нет людей, номеров и соседнего имущества.</li><li>Кадр загружается с датой, выбор фиксируется в журнале.</li></ol><p class='ogoh'>Видео для объявления нужно проверять по правилу, согласованному с юристами. Таблица — стартовое предложение.</p>"
    }
  },

  "s-faq.olchov": {
    yorliq: "Marketing uchun",
    sarlavha: "Taqqoslash guruhi bo'lmasa, natija yo'q",
    tana: "<p>Pilotdagi 10 obyekt tez sotilsa, bu kamera tufayli bo'lishi shart emas: narx, mavsum yoki joy ham ta'sir qiladi. Shuning uchun natija nazoratsiz o'xshash obyektlar bilan solishtiriladi.</p><h4>Dizayn</h4><ul><li>Har pilot obyekti uchun reyestrdan bir-ikki juft tanlanadi: tur, hudud, narx oralig'i va e'lon oyi bir xil.</li><li>Ikkala guruh bir xil kanal va bir xil tartibda sotuvga qo'yiladi.</li><li>Farq faqat nazorat: surat, masofadan ko'rsatish, lavha.</li></ul><h4>Ko'rsatkichlar</h4><table><tr><th>Nima</th><th>Qayerdan</th></tr><tr><td>E'londan shartnomagacha kun</td><td>Lot va shartnoma sanalari</td></tr><tr><td>Tashriflar soni</td><td>Kirish jurnali</td></tr><tr><td>Takliflar soni</td><td>«Takliflar» bo'limi</td></tr><tr><td>Narx pasaytirishlar</td><td>Lot tarixi</td></tr></table><p class='ogoh'>Kichik tanlovda bitta tez sotuv natijani buzadi. Mediana ishlatiladi, o'rtacha emas, va xulosa 50+ obyektdan keyin mustahkamlanadi.</p>",
    manba: [],
    ru: {
      yorliq: "Для маркетинга",
      sarlavha: "Без контрольной группы нет результата",
      tana: "<p>Если 10 пилотных объектов продадутся быстро, это не обязательно заслуга камер: влияют цена, сезон и место. Поэтому результат сравнивают с похожими объектами без мониторинга.</p><h4>Дизайн</h4><ul><li>К каждому пилотному объекту подбирается одна-две пары из реестра: тот же тип, регион, ценовой диапазон и месяц объявления.</li><li>Обе группы выставляются на продажу по одному каналу и в одном порядке.</li><li>Разница только в мониторинге: фото, удалённый показ, табличка.</li></ul><h4>Показатели</h4><table><tr><th>Что</th><th>Откуда</th></tr><tr><td>Дни от объявления до договора</td><td>Даты лота и договора</td></tr><tr><td>Количество визитов</td><td>Журнал доступа</td></tr><tr><td>Количество предложений</td><td>Раздел «Предложения»</td></tr><tr><td>Снижения цены</td><td>История лота</td></tr></table><p class='ogoh'>На малой выборке одна быстрая продажа искажает итог. Используется медиана, а не среднее, и вывод закрепляется после 50+ объектов.</p>"
    }
  },

  "s-faq.banklar": {
    yorliq: "Marketing uchun",
    sarlavha: "Platforma boshqa banklarga xizmat bo'lishi mumkin",
    tana: "<p>PQ-142 davlat ulushi 50% va undan ko'p banklarga 2025–2026-yillarda kamida 4 trln so'mlik qarz hisobiga olingan mulkni sotish vazifasini qo'ygan. Har bir bank bir xil muammoni alohida yechadi. Tayyor platforma bank tizimi uchun umumiy xizmat bo'lishi mumkin.</p><h4>Bugun nima qilinadi</h4><ul><li>Har yozuvda ijarachi belgisi: qaysi bankka tegishli.</li><li>Kalitlar, VPN va arxiv har bank uchun alohida.</li><li>Rollar bank ichida qoladi, bir bank boshqasining obyektini ko'rmaydi.</li></ul><p>Bu talablar hozir arzon, keyin qo'shish qimmat. Bitta bank uchun qurilgan tizimni ko'p ijarachiliga aylantirish ma'lumotlar bazasini qayta loyihalashni talab qiladi.</p><h4>Keyin hal qilinadi</h4><ul><li>Xizmat modeli: obyekt boshiga oylik to'lov yoki litsenziya.</li><li>Shaxsga doir ma'lumotlarni qayta ishlash bo'yicha banklararo shartnoma.</li><li>Qo'riqlash departamenti bilan umumiy yoki alohida shartnoma.</li></ul><p class='ogoh'>Bu istiqbol g'oyasi, pilot shartiga kirmaydi. Batafsil 36-slaydda.</p>",
    manba: [],
    ru: {
      yorliq: "Для маркетинга",
      sarlavha: "Платформа может стать услугой для других банков",
      tana: "<p>ПП-142 поставило банкам с госдолей 50% и более задачу продать в 2025–2026 годах не менее чем на 4 трлн сумов имущества, принятого в счёт долга. Каждый банк решает одну и ту же задачу в одиночку. Готовая платформа может стать общей услугой для банковской системы.</p><h4>Что закладывается сейчас</h4><ul><li>В каждой записи метка арендатора: к какому банку она относится.</li><li>Ключи, VPN и архив у каждого банка отдельные.</li><li>Роли внутри банка, один банк не видит объекты другого.</li></ul><p>Сейчас эти требования дешёвые, потом добавлять их дорого. Превратить систему одного банка в мультиарендную — значит перепроектировать базу данных.</p><h4>Что решается позже</h4><ul><li>Модель услуги: абонентская плата за объект или лицензия.</li><li>Межбанковский договор об обработке персональных данных.</li><li>Общий или отдельный договор с Департаментом охраны.</li></ul><p class='ogoh'>Это идея на перспективу, в условия пилота не входит. Подробнее — на слайде 36.</p>"
    }
  },

  "s-faq.qadam": {
    yorliq: "Rahbariyat uchun",
    sarlavha: "Pilotni boshlash uchun to'rtta qaror",
    tana: "<p>Pilot rahbariyat to'rtta qarorni tasdiqlagan kundan boshlanadi. Har biri uchun tayyor taklif bor, qaror bitta majlisda qabul qilinishi mumkin.</p><table><tr><th>Qaror</th><th>Taklif</th></tr><tr><td>10 ta pilot obyekt</td><td>Uy, ofis, ombor, ishlab chiqarish; kamida ikki viloyat</td></tr><tr><td>Byudjet oralig'i</td><td>Jihoz va montaj taxminan 100–150 mln so'm, SIM va servis bilan ko'pi bilan 200 mln so'm</td></tr><tr><td>Bosh integrator modeli</td><td>Bitta bosh integrator va ixtisoslashgan subpudratchilar</td></tr><tr><td>Ulanish standarti</td><td>Faqat MKB API orqali, vendor bulutisiz</td></tr></table><h4>Birinchi ikki hafta</h4><ol><li>1-hafta: 10 obyekt auditi, signal va quvvat o'lchovi.</li><li>2-hafta: kamida uchta integratordan tijorat taklifi, 3–4 yechim tanlovi.</li></ol><h4>Mas'ullar</h4><ul><li>Loyiha egasi — muammoli aktivlar bo'limi.</li><li>Integratsiya — IT departamenti.</li><li>Shartnoma va me'yor — yuridik departament.</li></ul><p class='ogoh'>6-hafta oxirida 267 obyekt uchun smeta, SLA va joriy etish standarti taqdim etiladi.</p>",
    manba: [],
    ru: {
      yorliq: "Для руководства",
      sarlavha: "Четыре пункта для старта пилота",
      tana: "<p>Пилот начинается в день, когда руководство утвердит четыре решения. По каждому есть готовое предложение, решения можно принять на одном совещании.</p><table><tr><th>Решение</th><th>Предложение</th></tr><tr><td>10 пилотных объектов</td><td>Дом, офис, склад, производство; не меньше двух областей</td></tr><tr><td>Бюджетный коридор</td><td>Оборудование и монтаж ориентировочно 100–150 млн сумов, с SIM и сервисом — не более 200 млн сумов</td></tr><tr><td>Модель генерального интегратора</td><td>Один генеральный интегратор и профильные субподрядчики</td></tr><tr><td>Стандарт подключения</td><td>Только через MKB API, без облака вендора</td></tr></table><h4>Первые две недели</h4><ol><li>1-я неделя: аудит 10 объектов, замер сигнала и питания.</li><li>2-я неделя: коммерческие предложения минимум от трёх интеграторов, выбор 3–4 решений.</li></ol><h4>Ответственные</h4><ul><li>Владелец проекта — отдел проблемных активов.</li><li>Интеграция — ИТ-департамент.</li><li>Договоры и нормы — юридический департамент.</li></ul><p class='ogoh'>В конце 6-й недели представляются смета, SLA и стандарт внедрения на 267 объектов.</p>"
    }
  },

  /* ===================== 37 · Platforma ekranlari ===================== */
  "s-platforma.ekran1": {
    yorliq: "Rahbariyat uchun",
    sarlavha: "Boshqaruv paneli: portfel bir qarashda",
    tana: "<p>Bosh ekran bank balansidagi barcha mulkning holatini ko'rsatadi. Rahbar tizimga kirganda birinchi shu ekranni ko'radi.</p><h4>Ekranda nima bor</h4><ul><li><b>Balansdagi mulk qiymati</b> va joriy yilda balansga olingan hamda sotilgan obyektlar soni.</li><li><b>Yillar bo'yicha diagramma:</b> olingan va sotilgan obyektlar yonma-yon. Qabul sotuvdan tez o'ssa, portfel shishadi.</li><li><b>Hududlar kesimi:</b> qaysi viloyatda nechta obyekt.</li><li><b>Nazorat qamrovi:</b> ko'rik muddatida, sug'urta amalda, baho dolzarb va kirish nazorati bor obyektlar ulushi.</li></ul><h4>Rollar bo'yicha</h4><table><tr><th>Rol</th><th>Nimani ko'radi</th></tr><tr><td>Rahbariyat</td><td>Butun bank, hisobot va ko'rsatkichlar</td></tr><tr><td>Filial rahbari</td><td>Faqat o'z filiali</td></tr><tr><td>Yurist, baholovchi, inspektor</td><td>O'z paneli: ishlar, muddatlar, ko'riklar</td></tr></table><p>Qurilmalar ulangach, panelga aloqadan chiqqan qurilmalar va ochiq hodisalar soni qo'shiladi. Rahbar kameraga emas, istisnolarga qaraydi.</p>",
    manba: [],
    ru: {
      yorliq: "Для руководства",
      sarlavha: "Панель управления: портфель с одного взгляда",
      tana: "<p>Главный экран показывает состояние всего имущества на балансе банка. Руководитель видит его первым при входе в систему.</p><h4>Что на экране</h4><ul><li><b>Стоимость имущества на балансе</b> и число объектов, принятых на баланс и проданных в текущем году.</li><li><b>Диаграмма по годам:</b> принятые и проданные объекты рядом. Если приём растёт быстрее продаж, портфель разбухает.</li><li><b>Разрез по регионам:</b> сколько объектов в каждой области.</li><li><b>Охват контроля:</b> доля объектов с осмотром в срок, действующей страховкой, актуальной оценкой и контролем доступа.</li></ul><h4>По ролям</h4><table><tr><th>Роль</th><th>Что видит</th></tr><tr><td>Руководство</td><td>Весь банк, отчёты и показатели</td></tr><tr><td>Руководитель филиала</td><td>Только свой филиал</td></tr><tr><td>Юрист, оценщик, инспектор</td><td>Свою панель: дела, сроки, осмотры</td></tr></table><p>Когда устройства подключат, на панель добавится число устройств без связи и открытых событий. Руководитель смотрит не на камеры, а на исключения.</p>"
    }
  },

  "s-platforma.ekran2": {
    yorliq: "Texnik izoh",
    sarlavha: "Obyektlar reyestri: 267 obyekt, bitta ro'yxat",
    tana: "<p>Reyestr — balansdagi har bir obyektning yagona ro'yxati. Bu yerdan istalgan obyekt kartochkasi ochiladi.</p><h4>Imkoniyatlar</h4><ul><li><b>Kartalar yoki jadval:</b> surat, nom, qiymat, tur, maydon va nazorat indeksi.</li><li><b>Filtrlar:</b> bosqich (balansda, sud jarayonida, qaror ijrosi, musodara) va hudud bo'yicha, matnli qidiruv.</li><li><b>Xaritada:</b> obyektlar joylashuvi. Montaj marshruti va klaster shkafi uchun qo'shni obyektlarni topish shu yerda.</li><li><b>Arxiv:</b> sotilgan va chiqarilgan obyektlar tarixi bilan.</li><li><b>Balansga qabul:</b> yangi obyekt hujjatlari bilan shu yerda kiritiladi.</li></ul><h4>Nazorat indeksi</h4><p>0 dan 100 gacha ball, beshta tekshiruvdan yig'iladi:</p><table><tr><th>Tekshiruv</th><th>Og'irlik</th></tr><tr><td>Ko'rik dolzarbligi</td><td class='n'>25</td></tr><tr><td>Sug'urta himoyasi</td><td class='n'>25</td></tr><tr><td>Baho dolzarbligi</td><td class='n'>20</td></tr><tr><td>Hujjatlar to'liqligi</td><td class='n'>15</td></tr><tr><td>Qo'riqlash va qurilmalar</td><td class='n'>15</td></tr></table><p>Kamera o'rnatilgan va aloqada bo'lgan obyekt oxirgi bandda to'liq ball oladi. Indeks saqlanmaydi, har safar joriy ma'lumotdan hisoblanadi.</p>",
    manba: [],
    ru: {
      yorliq: "Техническая справка",
      sarlavha: "Реестр объектов: 267 объектов в одном списке",
      tana: "<p>Реестр — единый список всех объектов на балансе. Отсюда открывается карточка любого объекта.</p><h4>Возможности</h4><ul><li><b>Карточки или таблица:</b> фото, название, стоимость, тип, площадь и индекс контроля.</li><li><b>Фильтры:</b> по стадии (на балансе, в суде, исполнение решения, конфискация) и региону, текстовый поиск.</li><li><b>На карте:</b> расположение объектов. Здесь же удобно строить маршрут монтажа и находить соседние объекты для кластерного шкафа.</li><li><b>Архив:</b> проданные и выбывшие объекты с историей.</li><li><b>Приём на баланс:</b> новый объект заводится здесь вместе с документами.</li></ul><h4>Индекс контроля</h4><p>Балл от 0 до 100, складывается из пяти проверок:</p><table><tr><th>Проверка</th><th>Вес</th></tr><tr><td>Актуальность осмотра</td><td class='n'>25</td></tr><tr><td>Страховая защита</td><td class='n'>25</td></tr><tr><td>Актуальность оценки</td><td class='n'>20</td></tr><tr><td>Полнота документов</td><td class='n'>15</td></tr><tr><td>Охрана и устройства</td><td class='n'>15</td></tr></table><p>Объект с установленной и работающей камерой получает полный балл по последнему пункту. Индекс не хранится, а каждый раз считается по текущим данным.</p>"
    }
  },

  "s-platforma.ekran3": {
    yorliq: "Texnik izoh",
    sarlavha: "Obyekt kartochkasi: bitta obyekt, barcha rollar",
    tana: "<p>Kartochka obyekt haqidagi hamma narsani bitta sahifaga yig'adi. Har rol o'z bo'limida ishlaydi, lekin ma'lumot umumiy.</p><h4>Sarlavha qismi</h4><ul><li>Identifikator va filial, masalan <code>AK-2025/0934</code>.</li><li>Tur, maydon, balans qiymati va baholangan qiymat.</li><li><b>Balansda necha kun</b> — bir yillik chegaraga qancha qolganini ko'rsatadi.</li><li>Nazorat indeksi foizda.</li></ul><h4>Tablar va kim ishlatadi</h4><table><tr><th>Tab</th><th>Asosiy foydalanuvchi</th></tr><tr><td>Umumiy, Moliya</td><td>Obyekt menejeri, buxgalteriya</td></tr><tr><td>Hujjatlar</td><td>Yurist</td></tr><tr><td>Ko'riklar</td><td>Ko'rik inspektori</td></tr><tr><td>Xarajatlar</td><td>Obyekt menejeri: kommunal, servis, qo'riqlash</td></tr><tr><td>3D navigator, Qavat rejasi</td><td>Realizatsiya, montajchi</td></tr><tr><td>Tarix</td><td>Auditor: kim, qachon, nimani o'zgartirgan</td></tr></table><p>Qurilmalar ulangach, kartochkada obyektning kameralari, oxirgi kadr, batareya va hodisalar tasmasi paydo bo'ladi. Operator shu yerdan jonli videoni ochadi va eshik buyrug'ini beradi.</p>",
    manba: [],
    ru: {
      yorliq: "Техническая справка",
      sarlavha: "Карточка объекта: один объект, все роли",
      tana: "<p>Карточка собирает всё об объекте на одной странице. Каждая роль работает в своём разделе, но данные общие.</p><h4>Шапка</h4><ul><li>Идентификатор и филиал, например <code>AK-2025/0934</code>.</li><li>Тип, площадь, балансовая и оценочная стоимость.</li><li><b>Сколько дней на балансе</b> — видно, сколько осталось до годовой границы.</li><li>Индекс контроля в процентах.</li></ul><h4>Вкладки и кто ими пользуется</h4><table><tr><th>Вкладка</th><th>Основной пользователь</th></tr><tr><td>Общее, Финансы</td><td>Менеджер объекта, бухгалтерия</td></tr><tr><td>Документы</td><td>Юрист</td></tr><tr><td>Осмотры</td><td>Инспектор осмотров</td></tr><tr><td>Расходы</td><td>Менеджер объекта: коммунальные, сервис, охрана</td></tr><tr><td>3D-навигатор, План этажа</td><td>Реализация, монтажник</td></tr><tr><td>История</td><td>Аудитор: кто, когда и что изменил</td></tr></table><p>После подключения устройств в карточке появятся камеры объекта, последний кадр, заряд и лента событий. Отсюда оператор открывает живое видео и отдаёт команду на дверь.</p>"
    }
  }
});

/* ---- moliya ---- */
/* Moliya va huquq guruhi: batafsil oynalar.
   s-meyor (33) — yangi slayd; s-bom (32), s-hamkor (34), s-istiqbol (36) — mavjud nuqtalar. */
window.MKB_BATAFSIL = window.MKB_BATAFSIL || {};
Object.assign(window.MKB_BATAFSIL, {

  /* ======================= 33 · Me'yorlar ======================= */
  "s-meyor.zaxira": {
    yorliq: "Moliya va huquq",
    sarlavha: "Bir yillik muddat zaxirani qanday oshiradi",
    tana: "<p>Markaziy bankning aktivlar sifatini tasniflash va zaxira shakllantirish nizomi (Adliya vazirligida 14.07.2015 da 2696-son bilan ro'yxatga olingan) 20-bandi: garov hisobidan undirilgan ko'chmas mulk va boshqa mol-mulk bank balansiga qabul qilingan kundan bir yil ichida sotilmasa, aktiv «umidsiz» toifaga o'tadi. 36-band bo'yicha bu toifa uchun zaxira 100%.</p>" +
      "<h4>Shartli misol</h4><p>Balans qiymati 800 mln so'm bo'lgan ombor 13-oyda sotilsa, bank undan oldin 800 mln so'mlik zaxirani xarajatga olgan bo'ladi. Shu ombor uchun nazorat to'plami 5–20 mln so'm. Nazoratning asosiy vazifasi — obyektni sotuvgacha butun va ko'rsatishga tayyor holda saqlash.</p>" +
      "<h4>Tizimda nima bo'ladi</h4><ul><li>Kartochkada balansga qabul qilingan sana va qolgan kunlar.</li><li>9-oyda sotuv bo'limi va rahbariyatga ogohlantirish, 11-oyda qayta.</li><li>Hisobotda 12 oyga yaqinlashgan obyektlar va ulardagi hodisalar alohida ro'yxatda.</li></ul>" +
      "<p class='ogoh'>Markaziy bank 10.09.2026 da 3937-son yangi tasniflash va zaxira nizomini ro'yxatdan o'tkazdi: toifalar bo'yicha zaxira 1, 10, 25, 50 va 100%. Bir yillik qoida yangi hujjatda qanday berilgani va o'tish muddatini buxgalteriya va risk bo'limi tekshiradi.</p>",
    manba: [["lex.uz: MB nizomi, 2696", "https://lex.uz/docs/-2703053"], ["Spot: 3937-son nizom", "https://www.spot.uz/oz/2026/09/14/bank-assets"]],
    ru: {
      yorliq: "Финансы и право",
      sarlavha: "Как годовой срок увеличивает резерв",
      tana: "<p>Положение ЦБ о классификации качества активов и формировании резервов (зарегистрировано Минюстом 14.07.2015 под № 2696), п. 20: если недвижимость и иное имущество, взысканные в счёт залога, не проданы в течение года со дня принятия на баланс, актив переходит в категорию «безнадёжных». По п. 36 резерв по этой категории — 100%.</p>" +
        "<h4>Условный пример</h4><p>Склад с балансовой стоимостью 800 млн сумов продан на 13-й месяц — к этому моменту банк уже отнёс на расходы резерв в 800 млн. Комплект мониторинга для этого склада стоит 5–20 млн сумов. Главная задача мониторинга — сохранить объект целым и готовым к показу до продажи.</p>" +
        "<h4>Что делает система</h4><ul><li>В карточке — дата принятия на баланс и оставшиеся дни.</li><li>На 9-м месяце — уведомление отделу продаж и руководству, на 11-м — повторное.</li><li>В отчёте отдельный список объектов, приближающихся к 12 месяцам, и событий по ним.</li></ul>" +
        "<p class='ogoh'>10.09.2026 ЦБ зарегистрировал новое положение № 3937 о классификации и резервах: резерв по категориям 1, 10, 25, 50 и 100%. Как в новом документе изложено годовое правило и каков переходный срок, проверяют бухгалтерия и риск-менеджмент.</p>"
    }
  },

  "s-meyor.qoriqlash": {
    yorliq: "Rahbariyat uchun",
    sarlavha: "Qo'riqlashni kim bajara oladi",
    tana: "<p>O'RQ-778 «Qo'riqlash faoliyati to'g'risida» (15.06.2022) qonunining 13-moddasi shartnoma asosida qo'riqlovchi subyektlarni sanaydi: Milliy gvardiya, Mudofaa vazirligi va Ichki ishlar vazirligi, har biri o'z obyektlari doirasida. Xususiy qo'riqlash kompaniyasi bu ro'yxatda yo'q. 12-modda tashkilotning o'z idoraviy qorovullik bo'linmasiga ruxsat beradi, lekin buning uchun doimiy shtat kerak.</p>" +
      "<h4>Loyiha uchun ma'nosi</h4><ul><li>Tizim qo'riqchini almashtirmaydi. U signal va dalil beradi, javob choralarini davlat qo'riqlash xizmati yoki bank xodimi ko'radi.</li><li>Integrator montaj va servis qiladi. Uning shartnomasida «qo'riqlash» xizmati bo'lmasligi kerak.</li><li>Bank operatori o'z mulkini kamera orqali kuzatadi. Bu shartnoma asosidagi qo'riqlash xizmati emasligini yuristlar yozma tasdiqlaydi.</li></ul>" +
      "<h4>Bank qaror qiladi</h4><p>Qaysi obyektlar IIV huzuridagi Qo'riqlash departamenti pultiga ulanadi: odatda shahardagi qimmat bino, tezkor javob guruhi yetib boradigan joy. Qolganlari MKB platformasida hodisa bo'yicha nazorat qilinadi. Departamentdan pultga ulanish texnik shartlari, signal protokoli va oylik to'lov yozma so'raladi.</p>",
    manba: [["lex.uz: O'RQ-778", "https://lex.uz/docs/-6066682"]],
    ru: {
      yorliq: "Для руководства",
      sarlavha: "Кто вправе осуществлять охрану",
      tana: "<p>Статья 13 Закона ЗРУ-778 «Об охранной деятельности» (15.06.2022) перечисляет субъекты охраны по договору: Национальная гвардия, Министерство обороны и МВД — каждый в пределах своих объектов. Частных охранных компаний в перечне нет. Статья 12 допускает собственную ведомственную сторожевую охрану организации, но для неё нужен постоянный штат.</p>" +
        "<h4>Что это значит для проекта</h4><ul><li>Система не заменяет охрану. Она даёт сигнал и доказательства, реагирует государственная охрана или сотрудник банка.</li><li>Интегратор монтирует и обслуживает. В его договоре не должно быть услуги «охраны».</li><li>Оператор банка наблюдает за собственным имуществом через камеры. То, что это не охрана по договору, юристы подтверждают письменно.</li></ul>" +
        "<h4>Решение банка</h4><p>Какие объекты подключаются к пульту Департамента охраны при МВД: как правило, дорогие здания в городе, куда успевает группа реагирования. Остальные контролируются по событиям на платформе MKB. У Департамента письменно запрашиваются технические условия подключения, протокол сигнала и ежемесячная плата.</p>"
    }
  },

  "s-meyor.shaxsiy": {
    yorliq: "Jamoa rahbarlari uchun",
    sarlavha: "Video, yuz shabloni va server qayerda turadi",
    tana: "<p>O'RQ-547 (02.07.2019) bo'yicha shaxsni aniqlash mumkin bo'lgan har qanday ma'lumot, jumladan kadrdagi tasvir, shaxsga doir ma'lumot. O'RQ-1125 (26.03.2026) 27-1-moddani yangiladi: biometrik va genetik ma'lumot hamda aloqa operatori abonentlari ma'lumoti faqat O'zbekiston hududida saqlanadi. Qolgan ma'lumot vakolatli organ tasdiqlagan shartlar bilan chet elda ham saqlanishi mumkin.</p>" +
      "<h4>Texnik talablar</h4><ul><li>Yuzni tanish shablonlari va videotahlil natijalari faqat bank serverida. Ishlab chiqaruvchi bulutiga sinxronlash o'chiriladi.</li><li>Oddiy video ham mahalliy saqlanadi: xorijga uzatish shartlarini isbotlashdan ko'ra arzon.</li><li>Arxivga kirish rolga bog'liq. Har ko'rish va eksport jurnalga yoziladi.</li><li>Saqlash muddati belgilanadi, muddati o'tgan klip avtomatik o'chadi. Dalil sifatida belgilangan klip bundan mustasno.</li></ul>" +
      "<h4>Huquq bo'limi bilan</h4><p>Video bazasini shaxsga doir ma'lumotlar bazalari davlat reyestriga kiritish va bank ichki nizomiga o'zgartish yuristlar bilan kelishiladi.</p>" +
      "<p class='ogoh'>Hikvision DS-K1T342MFWX terminali 1 500 tagacha yuz shablonini qurilmaning o'zida saqlaydi. Uni Hik-ProConnect bulutiga ulash lokalizatsiya talabiga zid bo'lishi mumkin.</p>",
    manba: [["lex.uz: O'RQ-547", "https://lex.uz/docs/-4396419"], ["lex.uz: O'RQ-1125", "https://lex.uz/doc-passport/-8099215"], ["Hikvision: DS-K1T342MFWX", "https://assets.hikvision.com/prd/normal/all/doc/m000054133/DS-K1T342MFWX_Datasheet_20260210.pdf"]],
    ru: {
      yorliq: "Для тимлида",
      sarlavha: "Где хранятся видео, шаблоны лиц и сервер",
      tana: "<p>По ЗРУ-547 (02.07.2019) персональными данными считается любая информация, позволяющая идентифицировать человека, в том числе изображение в кадре. ЗРУ-1125 (26.03.2026) обновил статью 27-1: биометрические и генетические данные, а также данные абонентов операторов связи хранятся только на территории Узбекистана. Остальные данные можно хранить за рубежом при условиях, утверждённых уполномоченным органом.</p>" +
        "<h4>Технические требования</h4><ul><li>Шаблоны лиц и результаты видеоаналитики — только на сервере банка. Синхронизация с облаком производителя отключается.</li><li>Обычное видео тоже хранится локально: это дешевле, чем доказывать соблюдение условий трансграничной передачи.</li><li>Доступ к архиву по ролям. Каждый просмотр и экспорт пишется в журнал.</li><li>Задаётся срок хранения, просроченные клипы удаляются автоматически. Клипы, помеченные как доказательство, — исключение.</li></ul>" +
        "<h4>С юридическим отделом</h4><p>Внесение видеобазы в государственный реестр баз персональных данных и изменения во внутреннее положение банка согласуются с юристами.</p>" +
        "<p class='ogoh'>Терминал Hikvision DS-K1T342MFWX хранит до 1 500 шаблонов лиц в самом устройстве. Подключение к облаку Hik-ProConnect может противоречить требованию о локализации.</p>"
    }
  },

  "s-meyor.belgi": {
    yorliq: "Moliya va huquq",
    sarlavha: "Ogohlantirish belgisini qonundan oldin qo'yamiz",
    tana: "<p>Amaldagi qonunchilikda obyektga kiruvchini videokuzatuv haqida ogohlantirish bo'yicha alohida norma yo'q. Adliya vazirligi 2025-yil martida «tasvirga bo'lgan huquq» qonun loyihasini muhokamaga chiqardi: jamoat joyidagi kamera oldida ko'rinadigan belgi, yashirin kamera uchun javobgarlik. Loyiha Fuqarolik, Mehnat va Ma'muriy javobgarlik kodekslariga o'zgartish kiritadi. Qonunchilik palatasi uni 07.10.2025 da qabul qilib, Senatga yubordi.</p>" +
      "<h4>Nega hozirdan</h4><ul><li>Kamera borligini ko'rsatish buzg'unchini to'xtatadi: belgi nazoratning bir qismi.</li><li>Kadrdagi odam O'RQ-547 bo'yicha shaxsga doir ma'lumot subyekti.</li><li>Qonun kuchga kirganda 267 obyektni qayta aylanib chiqishga to'g'ri kelmaydi.</li></ul>" +
      "<h4>Montajchiga qoida</h4><ul><li>Har kirish va darvozada, kamera ko'rish sohasiga kirishdan oldin, ko'z balandligida.</li><li>Matn o'zbek va rus tilida, mas'ul — bank.</li><li>Kamera qo'shni hovli, deraza va ko'chaga qaratilmaydi. Kerak bo'lsa kamera sozlamasida niqoblash zonasi yoqiladi.</li><li>Kiyinish joyi va hojatxona bo'lgan xonalarga kamera qo'yilmaydi.</li></ul>",
    manba: [["Gazeta.uz: loyiha Senatga yuborildi", "https://www.gazeta.uz/oz/2025/10/07/tasvir/"], ["Gazeta.uz: loyiha muhokamada", "https://www.gazeta.uz/oz/2025/03/17/foto-video/"], ["Legal Clinic: videokuzatuv asoslari", "https://legalclinic.uz/tpost/obk82iaa41-ozbekistonda-videokuzatuvning-qonunchili"]],
    ru: {
      yorliq: "Финансы и право",
      sarlavha: "Предупреждающую табличку ставим до закона",
      tana: "<p>В действующем законодательстве нет отдельной нормы, обязывающей предупреждать посетителей о видеонаблюдении. В марте 2025 года Минюст вынес на обсуждение законопроект о праве на изображение: заметная табличка у камер в общественных местах и ответственность за скрытые камеры. Проект меняет Гражданский, Трудовой кодексы и Кодекс об административной ответственности. Законодательная палата приняла его 07.10.2025 и направила в Сенат.</p>" +
        "<h4>Почему сейчас</h4><ul><li>Табличка сама по себе отпугивает нарушителя: это часть контроля.</li><li>Человек в кадре — субъект персональных данных по ЗРУ-547.</li><li>Когда закон вступит в силу, не придётся заново объезжать 267 объектов.</li></ul>" +
        "<h4>Правило для монтажника</h4><ul><li>На каждом входе и воротах, до зоны обзора камеры, на уровне глаз.</li><li>Текст на узбекском и русском, ответственный — банк.</li><li>Камера не направляется на соседний двор, окна и улицу. При необходимости в настройках включается маскирование зоны.</li><li>В раздевалках и санузлах камеры не ставятся.</li></ul>"
    }
  },

  "s-meyor.yongin": {
    yorliq: "Texnik izoh",
    sarlavha: "Elektr yo'q, yong'in javobgarligi qoladi",
    tana: "<p>Vazirlar Mahkamasining 20.10.2020 dagi 649-son qarori bilan tasdiqlangan Yong'in xavfsizligi qoidalari, 30-band: obyektlar avtomatik o'chirish va yong'in signalizatsiyasi bilan 9-ilovaga muvofiq jihozlanadi. Qoidalarga rioya qilish uchun tashkilot rahbari javob beradi. Bino bo'sh turgani yoki elektr uzilgani bu majburiyatni bekor qilmaydi.</p>" +
      "<h4>Amalda</h4><ul><li>188 bino ro'yxati 9-ilova bilan solishtiriladi: qaysi turda signalizatsiya majburiy, qaysida yo'q.</li><li>Majburiy bo'lmagan binoga batareyali tutun va harorat datchigi, signal MKB platformasiga.</li><li>Majburiy bo'lgan binoda avtonom datchik qoidani yopmaydi: loyiha va ruxsatnomasi bor tashkilot montaji kerak.</li></ul>" +
      "<p class='ogoh'>Ajax FireProtect 2 RB datasheet bo'yicha 0…+50 °C da ishlaydi. Isitilmaydigan binoda qishda harorat noldan tushadi. Sovuqqa chidamli datchik tanlanadi yoki bu cheklov shartnomada ochiq yoziladi.</p>",
    manba: [["lex.uz: VMQ-649", "https://lex.uz/docs/5056473"], ["Ajax: FireProtect 2 RB", "https://ajax.systems/products/specs/fireprotect-2-rb-smoke-heat-co/"]],
    ru: {
      yorliq: "Техническая справка",
      sarlavha: "Электричества нет, ответственность за пожар остаётся",
      tana: "<p>Правила пожарной безопасности, утверждённые постановлением Кабмина № 649 от 20.10.2020, п. 30: объекты оснащаются автоматическим пожаротушением и пожарной сигнализацией согласно приложению 9. За соблюдение правил отвечает руководитель организации. То, что здание пустует или обесточено, эту обязанность не снимает.</p>" +
        "<h4>На практике</h4><ul><li>Перечень из 188 зданий сверяется с приложением 9: где сигнализация обязательна, где нет.</li><li>В здания, где она не обязательна, ставятся автономные дымовые и тепловые датчики с выводом сигнала на платформу MKB.</li><li>Там, где обязательна, автономный датчик требование не закрывает: нужны проект и монтаж организацией с разрешением.</li></ul>" +
        "<p class='ogoh'>По даташиту Ajax FireProtect 2 RB работает при 0…+50 °C. В неотапливаемом здании зимой температура уходит в минус. Выбирается морозостойкий датчик или это ограничение прямо прописывается в договоре.</p>"
    }
  },

  "s-meyor.sotuv": {
    yorliq: "Marketing uchun",
    sarlavha: "Kamera sotuv e'lonini to'ldiradi",
    tana: "<p>E-auksion savdolari Vazirlar Mahkamasining 12.01.2022 dagi 18-son qarori bilan tasdiqlangan nizom bo'yicha o'tadi. Nizomning 22-bandi e'londa obyekt suratlari va geolokatsiyasini, obyektni oldindan ko'rish tartibini ko'rsatishni talab qiladi.</p>" +
      "<p>Prezidentning 15.04.2025 dagi PQ-142 qarori bilan 2025-yil 1-maydan ustav kapitalida davlat ulushi 50% va undan ko'p banklar qarz hisobiga olingan mulkni bozor qiymatida auksionsiz sotishi mumkin: to'g'ridan-to'g'ri, kreditga, bo'lib to'lashga yoki lizingga. Qarorda 2025–2026-yillarda kamida 4 trln so'mlik shunday mulkni sotish maqsadi bor.</p>" +
      "<h4>Loyiha nima beradi</h4><ul><li>Kameradan olingan yangi kadr va sana e'londagi eski suratni almashtiradi.</li><li>Ko'rish tartibi: xaridor belgilangan vaqtda videoni masofadan ko'radi yoki domofon orqali kiritiladi, tashrif jurnalga yoziladi.</li><li>To'g'ridan-to'g'ri sotuvda obyekt holati sotuv kunigacha yozuvda turadi.</li></ul>" +
      "<h4>Bank qaror qiladi</h4><p>Xaridorga jonli video kim ruxsati bilan, qancha vaqt va qaysi kameradan ko'rsatiladi. Ichkaridagi kamera mulkda qolgan buyumlar sababli alohida kelishiladi.</p>",
    manba: [["lex.uz: VMQ-18", "https://lex.uz/docs/-5819662"], ["lex.uz: PQ-142", "https://lex.uz/docs/-7479146"]],
    ru: {
      yorliq: "Для маркетинга",
      sarlavha: "Камера дополняет объявление о продаже",
      tana: "<p>Торги E-auksion проводятся по положению, утверждённому постановлением Кабмина № 18 от 12.01.2022. Пункт 22 положения требует указывать в объявлении фотографии и геолокацию объекта, а также порядок его предварительного осмотра.</p>" +
        "<p>Постановлением Президента ПП-142 от 15.04.2025 с 1 мая 2025 года банки с долей государства 50% и более могут продавать имущество, принятое в счёт долга, по рыночной стоимости без аукциона: напрямую, в кредит, в рассрочку или в лизинг. Цель постановления — продать в 2025–2026 годах такого имущества не менее чем на 4 трлн сумов.</p>" +
        "<h4>Что даёт проект</h4><ul><li>Свежий кадр с камеры и дата заменяют старое фото в объявлении.</li><li>Порядок осмотра: покупатель в назначенное время смотрит видео удалённо или его впускают через домофон, визит пишется в журнал.</li><li>При прямой продаже состояние объекта зафиксировано вплоть до дня сделки.</li></ul>" +
        "<h4>Решение банка</h4><p>Кто разрешает показ живого видео покупателю, на сколько времени и с какой камеры. Внутренние камеры обсуждаются отдельно — из-за оставшихся в помещении вещей.</p>"
    }
  },

  "s-meyor.xarid": {
    yorliq: "Moliya va huquq",
    sarlavha: "Jihoz qaysi tartibda sotib olinadi",
    tana: "<p>O'RQ-684 «Davlat xaridlari to'g'risida» (22.04.2021) qonunining 19-moddasi ustav kapitalida davlat ulushi 50% va undan ko'p yuridik shaxsni korporativ buyurtmachi deb belgilaydi. Bunday buyurtmachi xaridni qonundagi tartib-taomillar bilan o'tkazadi: elektron do'kon, auksion, tanlov yoki tender. Usul xarid summasi va tovar turiga bog'liq.</p>" +
      "<h4>Texnik topshiriqqa nima yoziladi</h4><ul><li>Brend emas, parametr: ONVIF yoki ochiq API, joyida yozuv, −20 °C da ishlash, past harorat himoyali BMS.</li><li>Rasmiy distribyutor hujjati va ishlab chiqaruvchi kafolati.</li><li>Montajchida amaldagi litsenziya va ruxsatnomalar nusxasi.</li><li>API tekshiruvi pilotda o'tadi, sinovdan o'tmagan model yakuniy smetaga kirmaydi.</li></ul>" +
      "<h4>Xatar va javob</h4><p>Faqat narx bilan g'olib aniqlanadigan usulda nomsiz 4G kamera kirib qolishi mumkin. Shuning uchun texnik mezonlar malaka talabi sifatida yoziladi, narx ulardan keyin solishtiriladi.</p>" +
      "<p class='ogoh'>Usul tanlovi va summa chegaralarini bankning xarid bo'limi qonunning amaldagi tahriri bo'yicha tekshiradi.</p>",
    manba: [["lex.uz: O'RQ-684", "https://lex.uz/docs/-5382974"], ["UZEX: xarid platformasi", "https://xarid.uzex.uz/"]],
    ru: {
      yorliq: "Финансы и право",
      sarlavha: "В каком порядке закупается оборудование",
      tana: "<p>Статья 19 Закона ЗРУ-684 «О государственных закупках» (22.04.2021) относит юрлиц с долей государства в уставном капитале 50% и более к корпоративным заказчикам. Такой заказчик закупает по процедурам закона: электронный магазин, аукцион, отбор или тендер. Процедура зависит от суммы и вида товара.</p>" +
        "<h4>Что пишется в техническом задании</h4><ul><li>Не бренд, а параметры: ONVIF или открытый API, локальная запись, работа при −20 °C, BMS с защитой от низкой температуры.</li><li>Документ официального дистрибьютора и гарантия производителя.</li><li>Копии действующих лицензий и разрешений монтажника.</li><li>Проверка API проходит на пилоте, модель без испытаний в итоговую смету не попадает.</li></ul>" +
        "<h4>Риск и ответ</h4><p>Если победителя определяет только цена, в закупку может попасть безымянная 4G-камера. Поэтому технические критерии записываются как квалификационные требования, а цены сравниваются после них.</p>" +
        "<p class='ogoh'>Выбор процедуры и пороговые суммы проверяет отдел закупок банка по действующей редакции закона.</p>"
    }
  },

  /* ======================= 32 · Smeta ======================= */
  "s-bom.bom1": {
    yorliq: "Texnik izoh",
    sarlavha: "Hikvision quyosh-4G: qutida nima bor",
    tana: "<p>Smetadagi narx bozordagi eng ko'p uchraydigan DS-2XS2T41G1-ID/4G modeliga olingan: 4 MP kamera, quyosh paneli, ichki akkumulyator va 4G modul bitta to'plamda, himoya IP67.</p>" +
      "<table><tr><th>Datasheet</th><th>Qiymat</th></tr><tr><td>Akkumulyator</td><td class='n'>51,46 Vt·soat</td></tr><tr><td>Kutish rejimi</td><td class='n'>80 mVt</td></tr><tr><td>4G ishlaganda</td><td class='n'>1,85 Vt</td></tr><tr><td>Eng ko'p sarf</td><td class='n'>7 Vt</td></tr><tr><td>Zaryad olish</td><td class='n'>0…+45 °C</td></tr><tr><td>Razryad</td><td class='n'>−20…+50 °C</td></tr><tr><td>Kutishda avtonomlik</td><td class='n'>11 kun</td></tr></table>" +
      "<h4>Narxni nima belgilaydi</h4><ul><li>Rasmiy kanal yoki kulrang import: hujjat va kafolat farqi.</li><li>Obyektiv 4 yoki 6 mm, qo'shimcha panel.</li><li>Ustun, kronshteyn va montaj bu narxga kirmaydi.</li></ul>" +
      "<h4>Muqobil</h4><p>Dahua quyosh-4G — tenderda ikkinchi brend. Katta perimetr uchun 80 Vt panelli DS-2XS6A47G1-IZS/C36S80, lekin narxi bir necha barobar yuqori.</p>" +
      "<p class='ogoh'>Akkumulyator 0 °C dan past haroratda zaryad olmaydi. Sovuq kunlarda kamera zaxirada ishlaydi. Kafolat muddati va qish sinovi natijasi tijorat taklifida yozma so'raladi.</p>",
    manba: [["Hikvision datasheet", "https://assets.hikvision.com/prd/normal/all/doc/m000060523/DS-2XS2T41G1-ID_4G_Datasheet_20250804.pdf"]],
    ru: {
      yorliq: "Техническая справка",
      sarlavha: "Hikvision солнечная 4G: что в коробке",
      tana: "<p>Цена в смете взята по самой распространённой на рынке модели DS-2XS2T41G1-ID/4G: камера 4 Мп, солнечная панель, встроенный аккумулятор и 4G-модуль в одном комплекте, защита IP67.</p>" +
        "<table><tr><th>Даташит</th><th>Значение</th></tr><tr><td>Аккумулятор</td><td class='n'>51,46 Вт·ч</td></tr><tr><td>Режим ожидания</td><td class='n'>80 мВт</td></tr><tr><td>При работе 4G</td><td class='n'>1,85 Вт</td></tr><tr><td>Максимум</td><td class='n'>7 Вт</td></tr><tr><td>Заряд</td><td class='n'>0…+45 °C</td></tr><tr><td>Разряд</td><td class='n'>−20…+50 °C</td></tr><tr><td>Автономность в ожидании</td><td class='n'>11 дней</td></tr></table>" +
        "<h4>Что определяет цену</h4><ul><li>Официальный канал или серый импорт: разница в документах и гарантии.</li><li>Объектив 4 или 6 мм, дополнительная панель.</li><li>Опора, кронштейн и монтаж в цену не входят.</li></ul>" +
        "<h4>Альтернатива</h4><p>Dahua солнечная 4G — второй бренд в тендере. Для большого периметра — комплект DS-2XS6A47G1-IZS/C36S80 с панелью 80 Вт, но он в разы дороже.</p>" +
        "<p class='ogoh'>Аккумулятор не заряжается ниже 0 °C. В морозные дни камера работает на запасе. Срок гарантии и результаты зимних испытаний письменно запрашиваются в коммерческом предложении.</p>"
    }
  },

  "s-bom.bom2": {
    yorliq: "Texnik izoh",
    sarlavha: "Dahua quyosh-4G: arzon, lekin qishda zaif",
    tana: "<p>Narx DH-IPC-HFW2431DG-4G-SP modeliga olingan: 4 MP, PIR datchik, 8 GB ichki xotira va 256 GB gacha microSD, ikki tomonlama ovoz, IP67.</p>" +
      "<table><tr><th>Datasheet</th><th>Qiymat</th></tr><tr><td>Akkumulyator</td><td class='n'>10 A·soat, Li-ion</td></tr><tr><td>Panel</td><td class='n'>5 Vt</td></tr><tr><td>Akkumulyator harorati</td><td class='n'>0…+50 °C</td></tr><tr><td>Uyqu rejimi, kuniga 1 soat video</td><td class='n'>10 kun</td></tr><tr><td>Doimiy rejim</td><td class='n'>15 soat</td></tr><tr><td>Resurs</td><td class='n'>500+ sikl</td></tr></table>" +
      "<h4>Nega smetada</h4><p>Hikvision'dan 300–400 ming so'm arzon va tenderda raqobat yaratadi. SAT Solutions Dahua'ning O'zbekistondagi tizim integratori, ya'ni hujjat va servis bor.</p>" +
      "<h4>Narxni nima belgilaydi</h4><ul><li>Obyektiv 2,8, 3,6 yoki 6 mm.</li><li>Tashqi panel va akkumulyator qo'shilsa, narx Hikvision'ga tenglashadi.</li></ul>" +
      "<p class='ogoh'>5 Vt panel dekabrda (Toshkentda kuniga 1,62 kVt·soat/m²) akkumulyatorni to'ldira olmaydi, akkumulyator esa 0 °C dan past haroratga mo'ljallanmagan. Bu model faqat qishda isitiladigan joyda yoki kuchaytirilgan quvvat bilan olinadi. Tenderda −20 °C sertifikati talab qilinadi.</p>",
    manba: [["Dahua datasheet", "https://material.dahuasecurity.com/uploads/cpq/prm-os-srv-res/smart/datasheetzipfiles/IPC-HFW2431DG-4G-SP-EAU-B_S0_datasheet_20230508.pdf"], ["SAT Solutions", "https://satsolutions.uz/en"]],
    ru: {
      yorliq: "Техническая справка",
      sarlavha: "Dahua солнечная 4G: дешевле, но слабее зимой",
      tana: "<p>Цена взята по модели DH-IPC-HFW2431DG-4G-SP: 4 Мп, PIR-датчик, 8 ГБ встроенной памяти и microSD до 256 ГБ, двусторонний звук, IP67.</p>" +
        "<table><tr><th>Даташит</th><th>Значение</th></tr><tr><td>Аккумулятор</td><td class='n'>10 А·ч, Li-ion</td></tr><tr><td>Панель</td><td class='n'>5 Вт</td></tr><tr><td>Температура аккумулятора</td><td class='n'>0…+50 °C</td></tr><tr><td>Сон, 1 час видео в сутки</td><td class='n'>10 дней</td></tr><tr><td>Постоянный режим</td><td class='n'>15 часов</td></tr><tr><td>Ресурс</td><td class='n'>500+ циклов</td></tr></table>" +
        "<h4>Зачем она в смете</h4><p>На 300–400 тыс. сумов дешевле Hikvision и создаёт конкуренцию в тендере. SAT Solutions — системный интегратор Dahua в Узбекистане, значит, есть документы и сервис.</p>" +
        "<h4>Что определяет цену</h4><ul><li>Объектив 2,8, 3,6 или 6 мм.</li><li>С внешней панелью и аккумулятором цена сравнивается с Hikvision.</li></ul>" +
        "<p class='ogoh'>Панель 5 Вт в декабре (1,62 кВт·ч/м² в сутки в Ташкенте) не восполняет заряд, а аккумулятор не рассчитан на минус. Модель берётся только для отапливаемых мест или с усиленным питанием. В тендере требуется сертификат на −20 °C.</p>"
    }
  },

  "s-bom.bom3": {
    yorliq: "Montajchi uchun",
    sarlavha: "Ajax Hub 2 (4G): elektrsiz obyektga moslash",
    tana: "<p>Hub — datchiklar tizimining markazi. Datasheet: 100 tagacha simsiz qurilma, 25 tagacha IP kamera, ikki micro-SIM va Ethernet, kanallar avtomatik almashadi. Hodisani SIA DC-09 va Contact ID orqali pultga yuboradi. Signal bilan 640×480 kadr 9 soniyagacha keladi. Kafolat 24 oy.</p>" +
      "<h4>Elektr yo'q joyda</h4><ul><li>Zavodda 110–240 V blok o'rnatilgan. O'rniga 12–24V PSU (type A) moduli qo'yiladi: kirish 8–32 V DC, ya'ni LiFePO4 akkumulyatordan to'g'ridan-to'g'ri.</li><li>Ichki 3 A·soat akkumulyator faqat SIM bilan 15 soatgacha yetadi. Bu zaxira, asosiy manba emas.</li><li>Haqiqiy sarf pilotda o'lchanadi, akkumulyator hajmi shunga qarab tanlanadi.</li></ul>" +
      "<p class='ogoh'>Hub ish harorati −10…+40 °C. Isitilmaydigan binoda hub va akkumulyator izolyatsiyalangan qutiga, eng issiq xonaga qo'yiladi.</p>" +
      "<h4>Narxni nima belgilaydi</h4><p>3,3 mln so'm — pastki bozor narxi, 5,5 mln — Yevropa narxi va import. PSU moduli alohida sotiladi. Ko'p datchikli katta obyektga Hub 2 Plus kerak bo'lishi mumkin.</p>",
    manba: [["Ajax: Hub 2 (4G)", "https://ajax.systems/products/specs/hub-2/"], ["Ajax: 12–24V PSU", "https://ajax.systems/products/specs/12-24vpsu-hub2/"]],
    ru: {
      yorliq: "Для монтажника",
      sarlavha: "Ajax Hub 2 (4G): адаптация к обесточенному объекту",
      tana: "<p>Хаб — центр системы датчиков. По даташиту: до 100 беспроводных устройств, до 25 IP-камер, две micro-SIM и Ethernet с автоматическим переключением каналов. События уходят на пульт по SIA DC-09 и Contact ID. Кадр 640×480 приходит вместе с тревогой за время до 9 секунд. Гарантия 24 месяца.</p>" +
        "<h4>Если электричества нет</h4><ul><li>С завода стоит блок 110–240 В. Вместо него ставится модуль 12–24V PSU (type A): вход 8–32 В DC, то есть напрямую от аккумулятора LiFePO4.</li><li>Встроенного аккумулятора 3 А·ч хватает до 15 часов только на SIM. Это резерв, а не основной источник.</li><li>Реальное потребление замеряется на пилоте, по нему подбирается ёмкость аккумулятора.</li></ul>" +
        "<p class='ogoh'>Рабочая температура хаба −10…+40 °C. В неотапливаемом здании хаб и аккумулятор ставятся в утеплённый бокс в самом тёплом помещении.</p>" +
        "<h4>Что определяет цену</h4><p>3,3 млн сумов — нижняя рыночная цена, 5,5 млн — европейская цена с импортом. Модуль PSU продаётся отдельно. Для большого объекта с множеством датчиков может понадобиться Hub 2 Plus.</p>"
    }
  },

  "s-bom.bom4": {
    yorliq: "Montajchi uchun",
    sarlavha: "DoorProtect Plus: ochilish, zarba va qiyalik",
    tana: "<p>Oddiy eshik datchigi faqat ochilishni sezadi. Plus modeli uchta hodisani qayd etadi: magnit kontakt ochilishni, akselerometr zarbani (uch sezgirlik darajasi) va 5° dan 25° gacha qiyalikni. Bo'sh binoda buzg'unchi eshikni ochmasdan buzadi yoki oynani sindiradi, shuning uchun zarba muhim.</p>" +
      "<table><tr><th>Datasheet</th><th>Qiymat</th></tr><tr><td>Batareya</td><td class='n'>CR123A, 5 yilgacha</td></tr><tr><td>Radio masofa</td><td class='n'>1 200 m gacha, ochiq joyda</td></tr><tr><td>Ish harorati</td><td class='n'>−10…+40 °C</td></tr><tr><td>Kafolat</td><td class='n'>24 oy</td></tr></table>" +
      "<h4>Qayerga qo'yiladi</h4><ul><li>Kirish eshigi, darvoza, birinchi qavat derazalari.</li><li>Bitta obyektga odatda 4–10 dona.</li><li>Ichki xona eshiklariga oddiy DoorProtect yetadi: taxminan 409 ming so'm.</li></ul>" +
      "<p class='ogoh'>Qishda −10 °C dan pastga tushadigan tashqi eshik va darvozalarda ishlash kafolatlanmagan. Datchik ichki tomonga o'rnatiladi, qish oylarida batareya holati platformada kuzatiladi.</p>",
    manba: [["Ajax: DoorProtect Plus", "https://ajax.systems/products/specs/doorprotectplus/"]],
    ru: {
      yorliq: "Для монтажника",
      sarlavha: "DoorProtect Plus: открытие, удар и наклон",
      tana: "<p>Обычный датчик двери видит только открытие. Модель Plus фиксирует три события: геркон — открытие, акселерометр — удар (три уровня чувствительности), и наклон от 5° до 25°. В пустом здании нарушитель чаще ломает дверь или бьёт стекло, чем открывает, поэтому удар важен.</p>" +
        "<table><tr><th>Даташит</th><th>Значение</th></tr><tr><td>Батарея</td><td class='n'>CR123A, до 5 лет</td></tr><tr><td>Радиосвязь</td><td class='n'>до 1 200 м на открытом месте</td></tr><tr><td>Рабочая температура</td><td class='n'>−10…+40 °C</td></tr><tr><td>Гарантия</td><td class='n'>24 месяца</td></tr></table>" +
        "<h4>Куда ставится</h4><ul><li>Входная дверь, ворота, окна первого этажа.</li><li>На объект обычно 4–10 штук.</li><li>Для внутренних дверей достаточно обычного DoorProtect — около 409 тыс. сумов.</li></ul>" +
        "<p class='ogoh'>На наружных дверях и воротах, где зимой ниже −10 °C, работа не гарантирована. Датчик ставится с внутренней стороны, зимой заряд батареи отслеживается на платформе.</p>"
    }
  },

  "s-bom.bom5": {
    yorliq: "Montajchi uchun",
    sarlavha: "FireProtect 2: qaysi variant kerak",
    tana: "<p>FireProtect 2 bir necha variantda chiqadi: faqat harorat, harorat va tutun, qo'shimcha is gazi (CO) sensori bilan. RB — almashtiriladigan batareyali versiya. Smetadagi 1,2–1,8 mln so'm tutun, harorat va CO variantiga to'g'ri keladi.</p>" +
      "<table><tr><th>Datasheet, RB Heat/Smoke/CO</th><th>Qiymat</th></tr><tr><td>Batareya</td><td class='n'>2 × CR123A, 7 yilgacha</td></tr><tr><td>Sirena</td><td class='n'>85 dB</td></tr><tr><td>Standart</td><td class='n'>EN 14604, EN 50291-1</td></tr><tr><td>Ish harorati</td><td class='n'>0…+50 °C</td></tr><tr><td>Kafolat</td><td class='n'>24 oy</td></tr></table>" +
      "<h4>Tejash mumkin bo'lgan joy</h4><p>Is gazi yonish manbai bor joyda xavfli: qozonxona, pech, gaz uskunasi. Gazi uzilgan bo'sh omborga harorat va tutun varianti yetadi, bu arzonroq. Asaxiy'da bazaviy variant 909 ming so'mdan.</p>" +
      "<h4>Joylashtirish</h4><ul><li>Taxminan har 60–80 m² ga bitta, shiftga.</li><li>Signal hub orqali MKB platformasiga va kerak bo'lsa pultga.</li></ul>" +
      "<p class='ogoh'>0 °C dan past haroratga mo'ljallanmagan. Isitilmaydigan binoda qishda ishonchsiz: ishlab chiqaruvchidan sovuqqa chidamli muqobil so'raladi yoki cheklov qabul dalolatnomasiga yoziladi.</p>",
    manba: [["Ajax: FireProtect 2 RB", "https://ajax.systems/products/specs/fireprotect-2-rb-smoke-heat-co/"]],
    ru: {
      yorliq: "Для монтажника",
      sarlavha: "FireProtect 2: какой вариант нужен",
      tana: "<p>FireProtect 2 выпускается в нескольких вариантах: только температура, температура и дым, плюс датчик угарного газа (CO). RB — версия со сменной батареей. 1,2–1,8 млн сумов в смете соответствуют варианту с дымом, температурой и CO.</p>" +
        "<table><tr><th>Даташит, RB Heat/Smoke/CO</th><th>Значение</th></tr><tr><td>Батарея</td><td class='n'>2 × CR123A, до 7 лет</td></tr><tr><td>Сирена</td><td class='n'>85 дБ</td></tr><tr><td>Стандарт</td><td class='n'>EN 14604, EN 50291-1</td></tr><tr><td>Рабочая температура</td><td class='n'>0…+50 °C</td></tr><tr><td>Гарантия</td><td class='n'>24 месяца</td></tr></table>" +
        "<h4>Где можно сэкономить</h4><p>Угарный газ опасен там, где есть источник горения: котельная, печь, газовое оборудование. Для пустого склада с отключённым газом хватит варианта «температура и дым», он дешевле. На Asaxiy базовый вариант — от 909 тыс. сумов.</p>" +
        "<h4>Размещение</h4><ul><li>Примерно один на 60–80 м², на потолок.</li><li>Сигнал через хаб на платформу MKB и при необходимости на пульт.</li></ul>" +
        "<p class='ogoh'>Не рассчитан на минусовые температуры. В неотапливаемом здании зимой ненадёжен: у производителя запрашивается морозостойкая альтернатива или ограничение вносится в акт приёмки.</p>"
    }
  },

  "s-bom.bom6": {
    yorliq: "Jamoa rahbarlari uchun",
    sarlavha: "Ajax Relay: platformadan eshik ochish",
    tana: "<p>Relay — quruq kontaktli simsiz rele. Platforma buyrug'i hub orqali relega boradi, rele elektromagnit qulf, darvoza yoki shlagbaum zanjirini yopadi. Aynan shu qurilma «Kirish nazorati» slaydidagi 4-qadamni bajaradi.</p>" +
      "<table><tr><th>Ishlab chiqaruvchi ma'lumoti</th><th>Qiymat</th></tr><tr><td>Quvvat</td><td class='n'>7–24 V DC</td></tr><tr><td>Rejim</td><td class='n'>impuls yoki bistabil</td></tr><tr><td>Yuklama</td><td class='n'>5 A, 36 V DC gacha</td></tr><tr><td>Resurs</td><td class='n'>200 000 ulanish</td></tr><tr><td>Radio masofa</td><td class='n'>1 000 m gacha</td></tr></table>" +
      "<h4>Integratsiya</h4><ul><li>Buyruq MKB buyruq xizmatidan Ajax integratsiyasi orqali, har amal jurnalga: kim, qachon, qaysi eshik.</li><li>Impuls rejimi qulf uchun: eshik bir necha soniya ochiq, keyin o'zi yopiladi.</li><li>Rele o'zi quvvat talab qiladi: shu LiFePO4 zanjiriga ulanadi.</li></ul>" +
      "<p class='ogoh'>Qulf turi oldindan tanlanadi. Tok uzilganda ochiladigan qulf evakuatsiya eshigiga, yopiq qoladigani ombor va kassaga. Akkumulyator tugaganda eshik qanday holatda qolishi qabul qilishda sinab ko'riladi.</p>",
    manba: [["Ajax: Relay", "https://ajax.systems/products/relay/"], ["Ajax: Relay qo'llanmasi", "https://support.ajax.systems/en/manuals/relay/"]],
    ru: {
      yorliq: "Для тимлида",
      sarlavha: "Ajax Relay: открыть дверь с платформы",
      tana: "<p>Relay — беспроводное реле с сухим контактом. Команда платформы через хаб доходит до реле, реле замыкает цепь электромагнитного замка, ворот или шлагбаума. Именно это устройство выполняет шаг 4 на слайде «Контроль доступа».</p>" +
        "<table><tr><th>Данные производителя</th><th>Значение</th></tr><tr><td>Питание</td><td class='n'>7–24 В DC</td></tr><tr><td>Режим</td><td class='n'>импульсный или бистабильный</td></tr><tr><td>Нагрузка</td><td class='n'>5 А, до 36 В DC</td></tr><tr><td>Ресурс</td><td class='n'>200 000 срабатываний</td></tr><tr><td>Радиосвязь</td><td class='n'>до 1 000 м</td></tr></table>" +
        "<h4>Интеграция</h4><ul><li>Команда идёт из сервиса команд MKB через интеграцию Ajax, каждое действие в журнале: кто, когда, какая дверь.</li><li>Импульсный режим для замка: дверь открыта несколько секунд и закрывается сама.</li><li>Реле само требует питания: подключается к той же цепи LiFePO4.</li></ul>" +
        "<p class='ogoh'>Тип замка выбирается заранее. Замок, открывающийся при пропадании тока, — для эвакуационной двери, остающийся закрытым — для склада и кассы. Положение двери при разряде аккумулятора проверяется при приёмке.</p>"
    }
  },

  "s-bom.bom7": {
    yorliq: "Moliya va huquq",
    sarlavha: "Yuz terminali: qachon kerak, qachon ortiqcha",
    tana: "<p>Narx Hikvision DS-K1T342MFWX sinfiga olingan: yuz, barmoq izi va M1 karta, 4,3 dyuymli sensorli ekran, RJ-45 va Wi-Fi, ISAPI va ISUP 5.0.</p>" +
      "<table><tr><th>Datasheet</th><th>Qiymat</th></tr><tr><td>Yuz shabloni</td><td class='n'>1 500</td></tr><tr><td>Barmoq izi / karta</td><td class='n'>3 000 / 3 000</td></tr><tr><td>Tanish masofasi</td><td class='n'>0,3–1,5 m</td></tr><tr><td>Quvvat</td><td class='n'>12 V DC, 1 A</td></tr><tr><td>Ish harorati</td><td class='n'>−30…+60 °C</td></tr></table>" +
      "<h4>Qachon kerak</h4><p>Obyektga odam muntazam kiradigan joyda: vaqtincha ijaraga berilgan ombor, baholovchi va xaridorlar tashrifi. Har kirish kadr bilan jurnalga tushadi.</p>" +
      "<h4>Qachon ortiqcha</h4><ul><li>Yiliga bir-ikki ko'rik bo'ladigan obyektda domofon va rele yetadi.</li><li>Terminal akkumulyatordan 12 V, 1 A gacha oladi: batareyali tugundagi eng katta iste'molchilardan biri.</li></ul>" +
      "<p class='ogoh'>Yuz shablon biometrik ma'lumot: O'RQ-1125 bo'yicha faqat O'zbekistonda saqlanadi. Terminal bank serveriga ulanadi, xorijiy bulutga emas. Rozilik va saqlash tartibi yuristlar bilan kelishiladi.</p>",
    manba: [["Hikvision: DS-K1T342MFWX", "https://assets.hikvision.com/prd/normal/all/doc/m000054133/DS-K1T342MFWX_Datasheet_20260210.pdf"], ["lex.uz: O'RQ-1125", "https://lex.uz/doc-passport/-8099215"]],
    ru: {
      yorliq: "Финансы и право",
      sarlavha: "Терминал распознавания лиц: когда нужен, когда лишний",
      tana: "<p>Цена взята по классу Hikvision DS-K1T342MFWX: лицо, отпечаток пальца и карта M1, сенсорный экран 4,3 дюйма, RJ-45 и Wi-Fi, ISAPI и ISUP 5.0.</p>" +
        "<table><tr><th>Даташит</th><th>Значение</th></tr><tr><td>Шаблоны лиц</td><td class='n'>1 500</td></tr><tr><td>Отпечатки / карты</td><td class='n'>3 000 / 3 000</td></tr><tr><td>Дистанция распознавания</td><td class='n'>0,3–1,5 м</td></tr><tr><td>Питание</td><td class='n'>12 В DC, 1 А</td></tr><tr><td>Рабочая температура</td><td class='n'>−30…+60 °C</td></tr></table>" +
        "<h4>Когда нужен</h4><p>Где люди приходят регулярно: временно сданный в аренду склад, визиты оценщиков и покупателей. Каждый вход попадает в журнал с кадром.</p>" +
        "<h4>Когда лишний</h4><ul><li>На объекте с одним-двумя осмотрами в год хватит домофона и реле.</li><li>Терминал берёт от аккумулятора до 1 А при 12 В — один из самых прожорливых потребителей автономного узла.</li></ul>" +
        "<p class='ogoh'>Шаблон лица — биометрические данные: по ЗРУ-1125 хранятся только в Узбекистане. Терминал подключается к серверу банка, а не к зарубежному облаку. Порядок согласия и хранения согласуется с юристами.</p>"
    }
  },

  "s-bom.chiplar1": {
    yorliq: "Moliya va huquq",
    sarlavha: "Jihozdan tashqari xarajat qanday hisoblanadi",
    tana: "<p>Jadvaldagi narxlar faqat jihozga tegishli. Qolgan qatorlar obyekt boshiga alohida hisoblanadi va tijorat taklifida ochiq ko'rsatiladi.</p>" +
      "<table><tr><th>Qator</th><th>Qanday hisoblanadi</th></tr>" +
      "<tr><td>Montaj va kabel</td><td>Ish va material alohida. Birlik: nuqta yoki brigada-kun. Pilotda haqiqiy vaqt o'lchanadi.</td></tr>" +
      "<tr><td>Shkaf va kronshteyn</td><td>4–6 m ustun, antivandal quti, korpus ochilish datchigi. Obyekt ko'rigidan keyin.</td></tr>" +
      "<tr><td>SIM va trafik</td><td>Oylik to'lov × 12 × obyekt. M2M tariflari: Ucell 9 500, Uzmobile 10 000 so'm/oy. Beeline 5 GB — 21 892 so'm/30 kun.</td></tr>" +
      "<tr><td>Transport</td><td>Masofa × tashrif soni. Viloyatlar bo'yicha guruhlab, bir chiqishda 3–5 obyekt.</td></tr>" +
      "<tr><td>Servis va SLA</td><td>Yillik: panelni ikki marta tozalash, akkumulyator tekshiruvi, nosozlikka chiqish muddati.</td></tr>" +
      "<tr><td>API integratsiyasi</td><td>Har brend uchun bir marta: adapter va test. Obyekt soniga bog'liq emas.</td></tr>" +
      "<tr><td>Logistika va bojxona</td><td>Import jihozda taxminan 1,3–1,5 barobar. Aniq ulushni broker taklifi beradi.</td></tr></table>" +
      "<p class='ogoh'>Uch yillik egalik qiymati so'raladi: jihoz, montaj, 36 oy aloqa va servis. Faqat jihoz narxi bo'yicha tanlangan taklif ikkinchi yili qimmatga tushadi.</p>",
    manba: [["Ucell: M2M Humo", "https://ucell.uz/uz/corporate/tariffs/m2mhumo"], ["Uzmobile: M2M", "https://uztelecom.uz/en/for-business/mobile-communication-2/gsm/tariffs/m2m-series-of-tariff-plans/"], ["Beeline: 30 kunlik paketlar", "https://b2b.beeline.uz/uz/products/services/internet-pakety-na-30-dney"]],
    ru: {
      yorliq: "Финансы и право",
      sarlavha: "Как считаются расходы помимо оборудования",
      tana: "<p>Цены в таблице — только за оборудование. Остальные строки считаются отдельно на объект и открыто указываются в коммерческом предложении.</p>" +
        "<table><tr><th>Строка</th><th>Как считается</th></tr>" +
        "<tr><td>Монтаж и кабель</td><td>Работа и материалы раздельно. Единица: точка или бригадо-день. Фактическое время замеряется на пилоте.</td></tr>" +
        "<tr><td>Шкаф и кронштейн</td><td>Опора 4–6 м, антивандальный бокс, датчик вскрытия корпуса. После обследования объекта.</td></tr>" +
        "<tr><td>SIM и трафик</td><td>Абонплата × 12 × объект. M2M-тарифы: Ucell 9 500, Uzmobile 10 000 сумов в месяц. Beeline 5 ГБ — 21 892 сума за 30 дней.</td></tr>" +
        "<tr><td>Транспорт</td><td>Расстояние × число выездов. С группировкой по областям — 3–5 объектов за выезд.</td></tr>" +
        "<tr><td>Сервис и SLA</td><td>В год: две чистки панели, проверка аккумулятора, срок выезда по неисправности.</td></tr>" +
        "<tr><td>Интеграция API</td><td>Один раз на бренд: адаптер и тест. От числа объектов не зависит.</td></tr>" +
        "<tr><td>Логистика и таможня</td><td>Для импортного оборудования примерно ×1,3–1,5. Точную долю даёт предложение брокера.</td></tr></table>" +
        "<p class='ogoh'>Запрашивается стоимость владения за три года: оборудование, монтаж, 36 месяцев связи и сервиса. Предложение, выбранное только по цене железа, на второй год обходится дороже.</p>"
    }
  },

  /* ======================= 34 · Hamkorlar ======================= */
  "s-hamkor.hamkor1": {
    yorliq: "Moliya va huquq",
    sarlavha: "SAT Solutions: bosh integrator nomzodi",
    tana: "<p>Kompaniya saytida e'lon qilingan ma'lumot: xavfsizlik va past kuchlanish tizimlarini loyihalash, o'rnatish va servis. Dahua'ning O'zbekistondagi strategik tizim integratori, Hikvision, ZKTeco, MikroTik, Ubiquiti va boshqa brendlar bilan ishlaydi.</p>" +
      "<h4>Loyihaga tegishli jihatlar</h4><ul><li>Qurilish maydonlari uchun avtonom 4G kamera yechimi saytda alohida ko'rsatilgan.</li><li>Qo'riqlash va yong'in xavfsizligi bo'yicha litsenziyalari borligini yozadi.</li><li>Banklar, omborlar va sanoat obyektlari uchun tarmoq yechimlari ro'yxatida.</li><li>Asosiy faoliyat Toshkentda.</li></ul>" +
      "<h4>Tender oldidan so'raladi</h4><ul><li>Litsenziya va ruxsatnomalar nusxasi, amal qilish muddati bilan.</li><li>Viloyatlardagi 3 ta referens va servis brigadasi joylashuvi.</li><li>Dahua DSS yoki qurilma API'siga kirish: MKB adapteri uchun.</li><li>Saytdagi 24/7 monitoring xizmati qanday tuzilgani: O'RQ-778 bo'yicha bu qo'riqlash emas, kuzatuv bo'lishi kerak.</li></ul>",
    manba: [["SAT Solutions", "https://satsolutions.uz/en"]],
    ru: {
      yorliq: "Финансы и право",
      sarlavha: "SAT Solutions: кандидат в генеральные интеграторы",
      tana: "<p>По данным сайта компании: проектирование, монтаж и обслуживание систем безопасности и слаботочных систем. Стратегический системный интегратор Dahua в Узбекистане, работает также с Hikvision, ZKTeco, MikroTik, Ubiquiti и другими брендами.</p>" +
        "<h4>Что важно для проекта</h4><ul><li>Автономные 4G-камеры для стройплощадок выделены на сайте отдельным решением.</li><li>Компания указывает наличие лицензий в сфере охранной и пожарной безопасности.</li><li>В списке отраслей — банки, склады и промышленные объекты.</li><li>Основная деятельность — в Ташкенте.</li></ul>" +
        "<h4>Что запросить до тендера</h4><ul><li>Копии лицензий и разрешений со сроком действия.</li><li>Три референса в областях и где базируются сервисные бригады.</li><li>Доступ к Dahua DSS или API устройств — для адаптера MKB.</li><li>Как устроена заявленная на сайте услуга мониторинга 24/7: по ЗРУ-778 это должно быть наблюдение, а не охрана.</li></ul>"
    }
  },

  "s-hamkor.hamkor2": {
    yorliq: "Moliya va huquq",
    sarlavha: "Hikvision PG: kanalni tekshirish kerak",
    tana: "<p>Bu nom bankka taqdim etilgan dastlabki ro'yxatdan olingan. Ochiq manbalarda «Hikvision PG» nomli alohida yuridik shaxs topilmadi. Tasdiqlangan fakt: Hikvision'ning Toshkentda vakolatxonasi bor, uzhikvision.uz rasmiy distribyutor sifatida ishlaydi.</p>" +
      "<h4>Nega bu muhim</h4><ul><li>Hikvision nomi bilan ishlovchi dilerlar ko'p. Kafolat va dasturiy yangilanish faqat rasmiy kanal orqali keladi.</li><li>Oldingi tekshiruvda rasmiy distribyutor katalogida quyosh-4G liniyasi ko'rinmadi. Bu modellarni rasmiy olib kela olishi alohida so'raladi.</li></ul>" +
      "<h4>Tender oldidan so'raladi</h4><ul><li>To'liq yuridik nomi, STIR va Hikvision avtorizatsiya xati.</li><li>DS-2XS2T41G1-ID/4G va kirish terminallari uchun yetkazish muddati.</li><li>Kalit topshirish tartibida montaj qilgan 3 ta obyekt.</li><li>ISAPI va HikCentral bo'yicha texnik yordam: adapter uchun.</li></ul>" +
      "<p class='ogoh'>Avtorizatsiya hujjati bo'lmasa, kompaniya oddiy montajchi sifatida ko'riladi.</p>",
    manba: [["Hikvision: rasmiy distribyutor", "https://uzhikvision.uz/en/"]],
    ru: {
      yorliq: "Финансы и право",
      sarlavha: "Hikvision PG: канал нужно проверить",
      tana: "<p>Название взято из первоначального списка, переданного банку. В открытых источниках отдельное юрлицо «Hikvision PG» не найдено. Подтверждено: у Hikvision есть представительство в Ташкенте, uzhikvision.uz работает как официальный дистрибьютор.</p>" +
        "<h4>Почему это важно</h4><ul><li>Дилеров под именем Hikvision много. Гарантия и обновления ПО приходят только через официальный канал.</li><li>При предыдущей проверке в каталоге официального дистрибьютора не было линейки солнечных 4G-камер. Возможность официальной поставки этих моделей уточняется отдельно.</li></ul>" +
        "<h4>Что запросить до тендера</h4><ul><li>Полное юридическое название, ИНН и авторизационное письмо Hikvision.</li><li>Сроки поставки DS-2XS2T41G1-ID/4G и терминалов доступа.</li><li>Три объекта, смонтированных «под ключ».</li><li>Техподдержку по ISAPI и HikCentral — для адаптера.</li></ul>" +
        "<p class='ogoh'>Без авторизационного документа компания рассматривается как обычный монтажник.</p>"
    }
  },

  "s-hamkor.hamkor3": {
    yorliq: "Moliya va huquq",
    sarlavha: "Baraka Profit: ochiq ma'lumot yo'q",
    tana: "<p>Kompaniya bankka taqdim etilgan dastlabki ro'yxatda Hikvision, Dahua va ZKTeco bilan ishlovchi, audit va monitoring tajribasi bor integrator sifatida ko'rsatilgan. Ochiq manbalarda bu da'volarni tasdiqlovchi sayt yoki reyestr yozuvi topilmadi.</p>" +
      "<h4>Qanday tekshiriladi</h4><ul><li>STIR bo'yicha davlat reyestridan: ro'yxatdan o'tgan sana, faoliyat turi, ustav kapitali.</li><li>Uch brend dilerlik sertifikati va amal qilish muddati.</li><li>Audit hisobotidan namuna: obyekt ko'rigi aktini qanday yozishini ko'rish uchun.</li><li>Soliq qarzi yo'qligi haqida ma'lumotnoma.</li></ul>" +
      "<h4>Qaysi rolda foydali</h4><p>Agar tekshiruvdan o'tsa — obyekt ko'rigi va audit bo'yicha subpudratchi: signal o'lchovi, quvvat hisobi, o'rnatish nuqtalari. Bosh integrator roli uchun tasdiqlangan referens talab qilinadi.</p>",
    manba: [],
    ru: {
      yorliq: "Финансы и право",
      sarlavha: "Baraka Profit: открытых данных нет",
      tana: "<p>В первоначальном списке, переданном банку, компания указана как интегратор Hikvision, Dahua и ZKTeco с опытом аудита и мониторинга. В открытых источниках сайт или запись реестра, подтверждающие эти данные, не найдены.</p>" +
        "<h4>Как проверить</h4><ul><li>По ИНН в государственном реестре: дата регистрации, вид деятельности, уставный капитал.</li><li>Дилерские сертификаты трёх брендов и срок их действия.</li><li>Образец аудиторского отчёта — чтобы увидеть, как составляется акт обследования объекта.</li><li>Справка об отсутствии налоговой задолженности.</li></ul>" +
        "<h4>В какой роли полезна</h4><p>Если проверка пройдена — субподрядчик по обследованию и аудиту: замер сигнала, расчёт питания, точки установки. Для роли генерального интегратора нужны подтверждённые референсы.</p>"
    }
  },

  "s-hamkor.hamkor4": {
    yorliq: "Jamoa rahbarlari uchun",
    sarlavha: "Adminz: tarmoq, VPN va kirish nazorati",
    tana: "<p>Adminz.uz saytida: IT autsorsing, strukturalangan kabel tizimi, serverlar, IP-telefoniya, videokuzatuv va kirish nazorati. Ubiquiti rasmiy hamkori, MikroTik va Cisco sertifikatlari bor. Videotahlil uchun Axis va Avigilon bilan ishlaydi. Saytda nosozlikka 2 soatda javob berish va 99,9% ishlash maqsadi yozilgan.</p>" +
      "<h4>Loyihadagi o'rni</h4><ul><li>MikroTik 4G routerlar, ikki SIM va VPN sozlamasi: obyektdan MKBgacha yopiq kanal.</li><li>Klaster yechimida radio ko'prik va VLAN.</li><li>Kirish nazorati kontrollerlarini platforma bilan bog'lash.</li></ul>" +
      "<p class='ogoh'>«i7 Team» nomi dastlabki ro'yxatda Adminz bilan birga keltirilgan, lekin ochiq manbalarda bu nom bilan kompaniya topilmadi. Ular o'rtasidagi bog'liqlik va shartnoma tomoni aniqlanadi.</p>" +
      "<h4>So'raladigan narsa</h4><p>VPN arxitekturasi namunasi, 100+ router uchun markaziy boshqaruv usuli, konfiguratsiya zaxirasi va zavod parolini almashtirish reglamenti.</p>",
    manba: [["Adminz.uz", "https://adminz.uz/en"]],
    ru: {
      yorliq: "Для тимлида",
      sarlavha: "Adminz: сеть, VPN и контроль доступа",
      tana: "<p>На сайте Adminz.uz: IT-аутсорсинг, СКС, серверы, IP-телефония, видеонаблюдение и контроль доступа. Официальный партнёр Ubiquiti, есть сертификаты MikroTik и Cisco. Для видеоаналитики работает с Axis и Avigilon. На сайте заявлены реакция на инцидент за 2 часа и целевая доступность 99,9%.</p>" +
        "<h4>Роль в проекте</h4><ul><li>4G-роутеры MikroTik, две SIM и настройка VPN: закрытый канал от объекта до MKB.</li><li>Радиомост и VLAN в кластерном решении.</li><li>Связка контроллеров доступа с платформой.</li></ul>" +
        "<p class='ogoh'>«i7 Team» указана в первоначальном списке вместе с Adminz, но в открытых источниках компания с таким названием не найдена. Связь между ними и сторона договора уточняются.</p>" +
        "<h4>Что запросить</h4><p>Пример архитектуры VPN, способ централизованного управления 100+ роутерами, резервное копирование конфигураций и регламент смены заводских паролей.</p>"
    }
  },

  "s-hamkor.hamkor5": {
    yorliq: "Montajchi uchun",
    sarlavha: "TESCOM Engineering: yong'in va kirish tizimlari",
    tana: "<p>Tescom.uz saytida: muhandislik tizimlarini loyihalash, montaj, ishga tushirish va servis. Videokuzatuv, kirish nazorati, qo'riqlash va yong'in signalizatsiyasi, SKS va optik tolali liniyalar. Kirish nazoratini video va yong'in tizimlari bilan bog'lashni alohida xizmat sifatida ko'rsatadi.</p>" +
      "<h4>O'zi haqida e'lon qilgan raqamlar</h4><div class='raqamlar'><div><b>56</b><span>xodim</span></div><div><b>86</b><span>tugatilgan loyiha</span></div></div><p>Mijozlar ro'yxatida EPAM, IT Park, Mobiuz, Yaponamama, GP Magnit. Bu kompaniyaning o'z ma'lumoti.</p>" +
      "<h4>Loyihadagi o'rni</h4><ul><li>VMQ-649 9-ilovasi bo'yicha signalizatsiya majburiy bo'lgan binolar: loyiha va montaj.</li><li>Elektr qulf, kontroller va evakuatsiya eshiklari bo'yicha xavfsiz holat sxemasi.</li></ul>" +
      "<h4>So'raladigan narsa</h4><p>Yong'in signalizatsiyasi bo'yicha ruxsatnoma, Toshkentdan tashqaridagi obyekt tajribasi va servisga chiqish muddati.</p>",
    manba: [["TESCOM Engineering", "https://tescom.uz/en/"]],
    ru: {
      yorliq: "Для монтажника",
      sarlavha: "TESCOM Engineering: пожарная сигнализация и СКУД",
      tana: "<p>На сайте tescom.uz: проектирование, монтаж, пусконаладка и сервис инженерных систем. Видеонаблюдение, СКУД, охранная и пожарная сигнализация, СКС и ВОЛС. Интеграцию СКУД с видео и пожарной системой компания выделяет как отдельную услугу.</p>" +
        "<h4>Цифры, заявленные компанией</h4><div class='raqamlar'><div><b>56</b><span>сотрудников</span></div><div><b>86</b><span>завершённых проектов</span></div></div><p>Среди клиентов названы EPAM, IT Park, Mobiuz, Yaponamama, GP Magnit. Это данные самой компании.</p>" +
        "<h4>Роль в проекте</h4><ul><li>Здания, где по приложению 9 к ППБ-649 сигнализация обязательна: проект и монтаж.</li><li>Схема безопасного состояния для электрозамков, контроллеров и эвакуационных дверей.</li></ul>" +
        "<h4>Что запросить</h4><p>Разрешение на пожарную сигнализацию, опыт объектов за пределами Ташкента и срок выезда сервиса.</p>"
    }
  },

  "s-hamkor.hamkor6": {
    yorliq: "Moliya va huquq",
    sarlavha: "Import kanali: nimani oldindan bilish kerak",
    tana: "<p>Reolink, Milesight, EFOY yoqilg'i elementi va mobil minoralarning O'zbekistonda rasmiy vakili yo'q yoki cheklangan. Ular distribyutor orqali olib kelinadi va mahalliy integrator o'rnatadi.</p>" +
      "<h4>Har biri bo'yicha</h4><ul><li>Reolink: batareyali kameralar −10 °C gacha, Home Hub orqali RTSP sessiyasi taxminan 5 daqiqa. Qishki cheklov shartnomaga yoziladi.</li><li>Milesight: LoRaWAN 868 MHz shlyuz va datchiklar. Diapazondan foydalanish ruxsati tekshiriladi.</li><li>EFOY: metanol kartrijlarini tashish va saqlash tartibi xariddan oldin kelishiladi.</li><li>Minora: Britaniyada ijara modeli keng tarqalgan, bizda sotib olish yoki ijara taklifi solishtiriladi.</li></ul>" +
      "<h4>Narx va muddat</h4><p>Olib kelish, bojxona va sertifikatlash bilan narx taxminan 1,3–1,5 barobar oshadi, yetkazish bir necha hafta. Kafolat bo'yicha almashtirish ham shu muddatga cho'ziladi, shuning uchun zaxira qurilma smetaga kiradi.</p>" +
      "<p class='ogoh'>Import qurilmaning LTE diapazonlari O'zbekiston operatorlari bilan mosligi datasheet bo'yicha xariddan oldin tekshiriladi.</p>",
    manba: [["WCCTV: bo'sh mulk uchun ijara", "https://www.wcctv.co.uk/our-sectors/vacant-property-security/"]],
    ru: {
      yorliq: "Финансы и право",
      sarlavha: "Импортный канал: что знать заранее",
      tana: "<p>У Reolink, Milesight, топливных элементов EFOY и мобильных вышек нет официального представительства в Узбекистане либо оно ограничено. Оборудование завозит дистрибьютор, устанавливает местный интегратор.</p>" +
        "<h4>По каждому</h4><ul><li>Reolink: аккумуляторные камеры до −10 °C, RTSP-сессия через Home Hub — около 5 минут. Зимнее ограничение прописывается в договоре.</li><li>Milesight: шлюз и датчики LoRaWAN 868 МГц. Проверяется разрешение на использование диапазона.</li><li>EFOY: порядок перевозки и хранения метанольных картриджей согласуется до закупки.</li><li>Мачта: в Великобритании распространена аренда, у нас сравниваются покупка и предложение аренды.</li></ul>" +
        "<h4>Цена и сроки</h4><p>С доставкой, таможней и сертификацией цена растёт примерно в 1,3–1,5 раза, поставка — несколько недель. Гарантийная замена занимает столько же, поэтому в смету закладывается резервное устройство.</p>" +
        "<p class='ogoh'>Совместимость LTE-диапазонов импортного устройства с операторами Узбекистана проверяется по даташиту до закупки.</p>"
    }
  },

  "s-hamkor.jarayon1": {
    yorliq: "Moliya va huquq",
    sarlavha: "Xarid jarayoni: olti qadam va natija",
    tana: "<p>Har qadam yozma natija bilan yopiladi. Natija bo'lmasa keyingi qadamga o'tilmaydi.</p>" +
      "<table><tr><th>Qadam</th><th>Kim</th><th>Natija</th></tr>" +
      "<tr><td>01 Joyida ko'rik</td><td>Integrator, filial</td><td>Signal dBm, soya, quvvat, o'rnatish nuqtasi, foto: ko'rik akti</td></tr>" +
      "<tr><td>02 Uchta taklif</td><td>Xarid bo'limi</td><td>Bitta texnik topshiriq bo'yicha: jihoz, montaj, 36 oylik aloqa va servis alohida</td></tr>" +
      "<tr><td>03 Pilot</td><td>2–3 yetkazuvchi</td><td>10 obyekt, 6 hafta, yechimlar yonma-yon</td></tr>" +
      "<tr><td>04 API tekshiruvi</td><td>MKB dasturchilari</td><td>Hodisa, video, holat va buyruq testi. O'tmagan model chiqadi</td></tr>" +
      "<tr><td>05 Yakuniy smeta</td><td>Moliya</td><td>Obyekt turi bo'yicha birlik narx va uch yillik egalik qiymati</td></tr>" +
      "<tr><td>06 SLA</td><td>Yuristlar</td><td>Chiqish muddati, almashtirish, jarima, ma'lumot egasi — bank</td></tr></table>" +
      "<h4>Qonun bilan bog'liqligi</h4><p>Bank korporativ buyurtmachi bo'lgani uchun 02 va 05-qadamlar O'RQ-684 tartib-taomillari orqali o'tadi. Pilot natijasi texnik topshiriqqa kiradi: g'olib pilotda sinalgan parametrlarni bajarishi shart.</p>",
    manba: [["lex.uz: O'RQ-684", "https://lex.uz/docs/-5382974"]],
    ru: {
      yorliq: "Финансы и право",
      sarlavha: "Процесс закупки: шесть шагов и результат",
      tana: "<p>Каждый шаг закрывается письменным результатом. Без него к следующему шагу не переходят.</p>" +
        "<table><tr><th>Шаг</th><th>Кто</th><th>Результат</th></tr>" +
        "<tr><td>01 Обследование</td><td>Интегратор, филиал</td><td>Сигнал в дБм, тень, питание, точка установки, фото: акт обследования</td></tr>" +
        "<tr><td>02 Три предложения</td><td>Отдел закупок</td><td>По одному ТЗ: оборудование, монтаж, 36 месяцев связи и сервиса отдельно</td></tr>" +
        "<tr><td>03 Пилот</td><td>2–3 поставщика</td><td>10 объектов, 6 недель, решения рядом</td></tr>" +
        "<tr><td>04 Проверка API</td><td>Разработчики MKB</td><td>Тест событий, видео, состояния и команд. Не прошедшая модель выбывает</td></tr>" +
        "<tr><td>05 Итоговая смета</td><td>Финансы</td><td>Цена за единицу по типу объекта и стоимость владения за три года</td></tr>" +
        "<tr><td>06 SLA</td><td>Юристы</td><td>Срок выезда, замена, штрафы, владелец данных — банк</td></tr></table>" +
        "<h4>Связь с законом</h4><p>Банк — корпоративный заказчик, поэтому шаги 02 и 05 проходят по процедурам ЗРУ-684. Результаты пилота входят в ТЗ: победитель обязан выполнить параметры, проверенные на пилоте.</p>"
    }
  },

  /* ======================= 36 · Istiqbol ======================= */
  "s-istiqbol.karta1": {
    yorliq: "Moliya va huquq",
    sarlavha: "Sug'urta: jurnal muzokaraga dalil",
    tana: "<p>AQSh uy-joy sug'urtasida markaziy pultga ulangan signalizatsiya uchun chegirma 5–20%: professional monitoring 5–15%, yong'in va is gazi datchigi bilan 10–20%. Bu xavfsizlik tizimi sotuvchisining ma'lumoti va faqat uy-joyga tegishli. O'zbekistonda bunday tarif jadvali ochiq e'lon qilinmagan.</p>" +
      "<h4>Bizda nimaga tayanamiz</h4><ul><li>Xorijiy polislarda mulk 30–60 kun bo'sh tursa yong'in va suv bo'yicha qoplov cheklanadi, davriy ko'rikni hujjatlashtirish talab qilinadi.</li><li>Kamera va datchik jurnali shu ko'rikni avtomatik hujjatlaydi: sana, kadr, holat.</li></ul>" +
      "<h4>Qadamlar</h4><ol><li>Pilotdan 6 oylik hodisa jurnali va nosozliklar statistikasi.</li><li>Bank sug'urtachisiga ikki savol: mukofotni kamaytirish va «bo'sh bino» istisnosini olib tashlash.</li><li>Kelishuv polisga yozma band bo'lib kiradi.</li></ol>" +
      "<p class='ogoh'>Sug'urtachi sertifikatlangan montajchi yoki pultga ulanishni shart qilishi mumkin. Pult esa O'RQ-778 bo'yicha faqat davlat qo'riqlash xizmatida.</p>",
    manba: [["Abode: sug'urta chegirmasi", "https://goabode.com/blog/home-security-insurance-discount/"], ["Watchman: bo'sh mulk da'volari", "https://www.watchmanservices.co.uk/news/unoccupied-residential-property-escape-of-water-claims"]],
    ru: {
      yorliq: "Финансы и право",
      sarlavha: "Страхование: журнал как аргумент на переговорах",
      tana: "<p>В страховании жилья в США скидка за сигнализацию с выводом на пульт — 5–15% за профессиональный мониторинг, 10–20% с датчиками пожара и угарного газа. Это данные продавца охранных систем, и они касаются только жилья. В Узбекистане такие тарифные таблицы публично не объявлены.</p>" +
        "<h4>На что опираемся</h4><ul><li>В зарубежных полисах, если объект пустует 30–60 дней, покрытие по пожару и воде ограничивается и требуется документировать периодические осмотры.</li><li>Журнал камер и датчиков документирует такой осмотр автоматически: дата, кадр, состояние.</li></ul>" +
        "<h4>Шаги</h4><ol><li>Журнал событий и статистика неисправностей за 6 месяцев пилота.</li><li>Два вопроса страховщику банка: снижение премии и снятие исключения «пустующее здание».</li><li>Договорённость фиксируется письменным пунктом полиса.</li></ol>" +
        "<p class='ogoh'>Страховщик может потребовать сертифицированного монтажника или вывод на пульт. По ЗРУ-778 пульт — только государственная охрана.</p>"
    }
  },

  "s-istiqbol.karta2": {
    yorliq: "Rahbariyat uchun",
    sarlavha: "Sotib olish yoki ijara: qanday hisoblaymiz",
    tana: "<p>Obyekt bir yilda sotilishi kerak, jihoz 5–7 yil ishlaydi. Sotib olingan to'plam obyekt sotilgach keyingisiga ko'chmasa, u bo'sh qoladi. Britaniyada bo'sh mulkni qo'riqlashning odatiy yo'li — ko'chma quyosh CCTV minorasini ijaraga olish: minora qisqa vaqtda ishga tushadi va obyekt sotilgach olib ketiladi.</p>" +
      "<h4>Hisob usuli</h4><table><tr><th>Ko'rsatkich</th><th>Sotib olish</th><th>Ijara</th></tr><tr><td>Boshlang'ich to'lov</td><td>Jihoz va montaj</td><td>Montaj</td></tr><tr><td>Oylik to'lov</td><td>Aloqa va servis</td><td>Ijara, aloqa</td></tr><tr><td>Eskirish xavfi</td><td>Bankda</td><td>Yetkazuvchida</td></tr><tr><td>Ko'chirish</td><td>Bank tashkil qiladi</td><td>Shartnomada</td></tr></table>" +
      "<h4>Tavsiya</h4><ul><li>Kichik standart to'plamlar sotib olinadi va obyektdan obyektga ko'chiriladi.</li><li>40–120 mln so'mlik minora va 80–170 mln so'mlik EFOY uchun ijara taklifi so'raladi.</li><li>O'zbekistondagi ijara narxi hozircha ma'lum emas, taklif olingach solishtiriladi.</li></ul>" +
      "<p class='ogoh'>Ijara shartnomasida jihoz yo'qolsa yoki buzilsa kim javob berishi alohida yoziladi.</p>",
    manba: [["WCCTV: bo'sh mulk uchun minora", "https://www.wcctv.co.uk/our-sectors/vacant-property-security/"]],
    ru: {
      yorliq: "Для руководства",
      sarlavha: "Покупка или аренда: как считаем",
      tana: "<p>Объект нужно продать за год, оборудование служит 5–7 лет. Если купленный комплект после продажи не переезжает на следующий объект, он простаивает. В Великобритании обычный способ охраны пустующей недвижимости — аренда мобильной солнечной CCTV-вышки: её быстро разворачивают и забирают после продажи объекта.</p>" +
        "<h4>Как считаем</h4><table><tr><th>Показатель</th><th>Покупка</th><th>Аренда</th></tr><tr><td>Стартовый платёж</td><td>Оборудование и монтаж</td><td>Монтаж</td></tr><tr><td>Ежемесячно</td><td>Связь и сервис</td><td>Аренда, связь</td></tr><tr><td>Риск устаревания</td><td>На банке</td><td>На поставщике</td></tr><tr><td>Перенос</td><td>Организует банк</td><td>По договору</td></tr></table>" +
        "<h4>Рекомендация</h4><ul><li>Небольшие стандартные комплекты покупаются и переносятся с объекта на объект.</li><li>На вышку за 40–120 млн и EFOY за 80–170 млн сумов запрашивается предложение аренды.</li><li>Цены аренды в Узбекистане пока неизвестны, сравнение — после получения предложений.</li></ul>" +
        "<p class='ogoh'>В договоре аренды отдельно прописывается ответственность за утрату или поломку оборудования.</p>"
    }
  },

  "s-istiqbol.karta3": {
    yorliq: "Marketing uchun",
    sarlavha: "3D tur: bir tashrifda ikki ish",
    tana: "<p>Montajchi kamera o'rnatish uchun obyektga baribir boradi. Shu tashrifda 360° skan olinadi va xaridor binoga bormasdan ichkarini ko'radi. E-auksion nizomi e'londa surat va ko'rish tartibini talab qiladi, 3D tur bu talabni to'liqroq bajaradi.</p>" +
      "<h4>Jarayon</h4><ol><li>Montaj kuni skan: har xona, tom, hovli. Taxminan 1–2 soat qo'shimcha ish.</li><li>Shaxsiy buyumlar, hujjatlar va qo'shnilar ko'rinmasligi tekshiriladi.</li><li>Havola sotuv e'loniga va bank saytiga qo'yiladi.</li><li>Kamera kadri turning yonida: «bugungi holat».</li></ol>" +
      "<h4>Samarasi haqida</h4><p>Matterport o'z tadqiqotida 3D turli e'lonlar tezroq va qimmatroq sotilishini yozadi. Bu platforma sotuvchisining ma'lumoti, mustaqil tasdiq emas. Pilotda o'zimiz o'lchaymiz: e'lonni ko'rishlar, qo'ng'iroqlar va sotuvgacha kunlar, turli va tursiz obyektlar solishtiriladi.</p>" +
      "<p class='ogoh'>E-auksion e'loniga tashqi havola qo'yish mumkinligi platforma operatori bilan aniqlanadi.</p>",
    manba: [["lex.uz: VMQ-18, E-auksion nizomi", "https://lex.uz/docs/-5819662"], ["Matterport blogi", "https://matterport.com/blog/3d-tours-properties-sell-31-faster-and-higher-price"]],
    ru: {
      yorliq: "Для маркетинга",
      sarlavha: "3D-тур: два дела за один выезд",
      tana: "<p>Монтажник всё равно едет на объект ставить камеру. В тот же визит снимается 360° скан, и покупатель видит помещения, не приезжая. Положение об E-auksion требует фото и порядок осмотра в объявлении, и 3D-тур закрывает это требование полнее.</p>" +
        "<h4>Процесс</h4><ol><li>Скан в день монтажа: все помещения, крыша, двор. Около 1–2 часов дополнительной работы.</li><li>Проверка, что в кадр не попали личные вещи, документы и соседи.</li><li>Ссылка размещается в объявлении и на сайте банка.</li><li>Рядом с туром — кадр с камеры: «состояние на сегодня».</li></ol>" +
        "<h4>Об эффекте</h4><p>Matterport в своём исследовании пишет, что объявления с 3D-туром продаются быстрее и дороже. Это данные продавца платформы, а не независимое подтверждение. На пилоте измеряем сами: просмотры объявления, звонки и дни до продажи для объектов с туром и без.</p>" +
        "<p class='ogoh'>Можно ли ставить внешнюю ссылку в объявление E-auksion, уточняется у оператора площадки.</p>"
    }
  },

  "s-istiqbol.karta4": {
    yorliq: "Moliya va huquq",
    sarlavha: "Sotilguncha ijara: foyda va shartlar",
    tana: "<p>Ombor yoki ustaxonani sotuvgacha arzon ijaraga berish ikki narsa beradi: kichik daromad va obyektda doimiy odam. Ijarachi elektrni o'z nomiga qayta ulaydi. Texnik shart 39 600 so'm va uch ish kuni, shundan keyin kameralar tarmoqdan quvvat oladi.</p>" +
      "<h4>Shartnomaga nima yoziladi</h4><ul><li>Obyekt sotilsa ijara 30 kunda bekor qilinadi.</li><li>Xaridorlarni ko'rsatish uchun kirish ruxsati.</li><li>Kommunal to'lov va yong'in xavfsizligi ijarachida.</li><li>Kamera va datchiklarga tegmaslik, ularning quvvati uzilmasligi.</li></ul>" +
      "<h4>Yuristlar ko'rib chiqadi</h4><ul><li>Bank faoliyatiga qo'yilgan cheklovlar doirasida mulkni ijaraga berish mumkinligi.</li><li>Ijara daromadining soliq va buxgalteriya hisobi.</li><li>Ijara sotuv muddatini cho'zmasligi: MB nizomidagi bir yillik muddat o'zgarmaydi.</li></ul>" +
      "<p class='ogoh'>Ijarachi borligi xaridor uchun ham, bank uchun ham xatar: ijarachini chiqarish qiyin bo'lsa, sotuv to'xtaydi. Shuning uchun qisqa muddat va aniq chiqish sharti.</p>",
    manba: [],
    ru: {
      yorliq: "Финансы и право",
      sarlavha: "Аренда до продажи: выгода и условия",
      tana: "<p>Сдать склад или мастерскую недорого до продажи — это небольшой доход и постоянное присутствие людей на объекте. Арендатор переоформляет электричество на себя. Техусловия — 39 600 сумов и три рабочих дня, после этого камеры питаются от сети.</p>" +
        "<h4>Что пишется в договоре</h4><ul><li>При продаже объекта аренда расторгается за 30 дней.</li><li>Доступ для показа покупателям.</li><li>Коммунальные платежи и пожарная безопасность на арендаторе.</li><li>Запрет трогать камеры и датчики и отключать их питание.</li></ul>" +
        "<h4>Проверяют юристы</h4><ul><li>Допустима ли сдача имущества в аренду с учётом ограничений банковской деятельности.</li><li>Налоговый и бухгалтерский учёт арендного дохода.</li><li>Аренда не должна затягивать продажу: годовой срок по положению ЦБ не меняется.</li></ul>" +
        "<p class='ogoh'>Арендатор — риск и для покупателя, и для банка: если его трудно выселить, продажа встаёт. Поэтому короткий срок и чёткое условие выезда.</p>"
    }
  },

  "s-istiqbol.karta5": {
    yorliq: "Jamoa rahbarlari uchun",
    sarlavha: "5G ga o'tish: nimani almashtiramiz",
    tana: "<p>Kamera 5–7 yil ishlaydi. Shu davrda operatorlar tarmoqni yangilaydi. 5G RedCap — kamera va datchik kabi qurilmalar uchun soddalashtirilgan 5G standarti. Bugun 4G olish to'g'ri, kutish kerak emas.</p>" +
      "<h4>Arxitekturadagi qaror</h4><ul><li>Aloqa kameraning ichida emas, alohida routerda bo'lsa, 5G ga o'tishda faqat router almashadi.</li><li>Ichki 4G modulli quyosh kameralar bu yo'lni yopadi. Ular qisqa muddatli obyektga, ko'chiriladigan to'plamga olinadi.</li><li>Adapter va platforma aloqa turiga bog'liq emas: MKB tomonida o'zgarish yo'q.</li></ul>" +
      "<h4>Shartnomaga</h4><ul><li>Router ikki SIM va almashtiriladigan modul bilan.</li><li>Yetkazuvchidan 5G ga o'tish yo'l xaritasi va narxi.</li><li>SIM shartnomasida tarif kafolati va operator o'zgarsa almashtirish tartibi.</li></ul>",
    manba: [["Hologram: IoT tendensiyalari", "https://www.hologram.io/blog/cellular-iot-trends/"]],
    ru: {
      yorliq: "Для тимлида",
      sarlavha: "Переход на 5G: что будем менять",
      tana: "<p>Камера служит 5–7 лет. За это время операторы обновят сеть. 5G RedCap — упрощённый стандарт 5G для таких устройств, как камеры и датчики. Брать 4G сегодня правильно, ждать не нужно.</p>" +
        "<h4>Архитектурное решение</h4><ul><li>Если связь не внутри камеры, а в отдельном роутере, при переходе на 5G меняется только роутер.</li><li>Солнечные камеры со встроенным 4G этот путь закрывают. Их берут для краткосрочных объектов и переносных комплектов.</li><li>Адаптер и платформа от типа связи не зависят: на стороне MKB изменений нет.</li></ul>" +
        "<h4>В договор</h4><ul><li>Роутер на две SIM со сменным модулем.</li><li>Дорожная карта и стоимость перехода на 5G от поставщика.</li><li>Гарантия тарифа в договоре на SIM и порядок замены при смене оператора.</li></ul>"
    }
  },

  "s-istiqbol.karta6": {
    yorliq: "Rahbariyat uchun",
    sarlavha: "Platformani boshqa banklarga taklif qilish",
    tana: "<p>Muammo faqat bizda emas. PQ-142 barcha banklar uchun 2025–2026-yillarda qarz hisobiga olingan kamida 4 trln so'mlik mulkni sotish maqsadini qo'ygan.</p>" +
      "<h4>Xalqaro namuna</h4><p>AQShda banklar balansidagi mulkni ko'pincha o'zi boshqarmaydi: ixtisoslashgan kompaniyalar ko'rik, konservatsiya va ta'mirni shartnoma asosida bajaradi. Masalan, Safeguard Properties Bank of America'ning dala xizmatini sotib olgan.</p>" +
      "<h4>Bugun nima qilinadi</h4><ul><li>Platforma boshidan ko'p ijarachili: har bank ma'lumoti alohida, alohida kalit va rollar.</li><li>Qurilma reyestri va API bank nomiga bog'lanmaydi.</li></ul>" +
      "<h4>Ochiq savollar</h4><ul><li>Qaysi yuridik shaxs xizmat ko'rsatadi: bank yoki uning investitsiya kompaniyasi.</li><li>Bank siri: boshqa bank obyektlari ma'lumotiga kirish taqiqlanadi.</li><li>Narx modeli: obyekt boshiga oylik to'lov.</li></ul>",
    manba: [["lex.uz: PQ-142", "https://lex.uz/docs/-7479146"], ["Safeguard Properties", "https://safeguardproperties.com/safeguard-acquires-bank-of-americas-field-service-operations/"]],
    ru: {
      yorliq: "Для руководства",
      sarlavha: "Предложить платформу другим банкам",
      tana: "<p>Проблема не только у нас. ПП-142 поставил всем банкам цель продать в 2025–2026 годах не менее чем на 4 трлн сумов имущества, принятого в счёт долга.</p>" +
        "<h4>Международный пример</h4><p>В США банки часто не управляют такими объектами сами: осмотры, консервацию и ремонт по договору выполняют специализированные компании. Например, Safeguard Properties купила полевую службу Bank of America.</p>" +
        "<h4>Что делаем сегодня</h4><ul><li>Платформа изначально мультиарендная: данные каждого банка отдельно, свои ключи и роли.</li><li>Реестр устройств и API не привязаны к названию банка.</li></ul>" +
        "<h4>Открытые вопросы</h4><ul><li>Какое юрлицо оказывает услугу: банк или его инвестиционная компания.</li><li>Банковская тайна: доступ к объектам другого банка запрещён.</li><li>Модель цены: ежемесячная плата за объект.</li></ul>"
    }
  }
});

/* ---- montaj ---- */
/* Montaj va servis bobi: batafsil oynasi yozuvlari */
Object.assign(window.MKB_BATAFSIL = window.MKB_BATAFSIL || {}, {
 "s-korik.alo": {
  "yorliq": "Montajchi uchun",
  "sarlavha": "−90 dBm dan yaxshi: SIM yetadi",
  "tana": "<p>RSRP — LTE tayanch signalining kuchi. −90 dBm dan yuqori qiymat baza stansiyasi yaqinligini bildiradi: kamera ichki antenna bilan ishlaydi, operator jonli videoni ochganda oqim uzilmaydi.</p><h4>O'lchash tartibi</h4><ul><li>O'lchov kamera turadigan nuqtada, 3–4 m balandlikda olinadi. Yerda olingan qiymat 5–10 dB yomonroq chiqadi.</li><li>Har operator SIM-kartasi bilan uch marta o'lchanadi, har safar kamida bir daqiqa kutiladi.</li><li>Asbob: LTE router yoki signal ko'rsatadigan servis ilovasi. RSRP va SINR alohida yoziladi.</li></ul><h4>Qaror</h4><p>Eng kuchli operatorning SIM-kartasi qo'yiladi. Ikkinchi o'rindagi operator zaxira sifatida ko'rik shakliga yoziladi: ikki SIM'li router qo'yilsa, u ishga tushadi.</p><h4>Ko'rik shakliga yoziladi</h4><p>Operator, RSRP, SINR, o'lchov vaqti va balandligi. Bir operator bir necha marta o'lchangan bo'lsa, eng yomon qiymat olinadi: loyiha o'rtacha emas, yomon kun uchun quriladi.</p><p class='ogoh'>Bir martalik o'lchov kafolat emas. Kechqurun tarmoq yuklanganda SINR tushadi, shuning uchun pilot obyektlarda o'lchov kunduzi va kechqurun qaytariladi.</p>",
  "manba": [
   [
    "Simology: RSRP, RSRQ, SINR",
    "https://simology.io/blog/coverage-metrics-decoded-rsrp-rsrq-sinr-plain-english"
   ]
  ],
  "ru": {
   "yorliq": "Для монтажника",
   "sarlavha": "Лучше −90 dBm: хватает обычной SIM",
   "tana": "<p>RSRP — мощность опорного сигнала LTE. Значение выше −90 dBm означает, что базовая станция рядом: камера работает на встроенной антенне, и живое видео не рвётся, когда его открывает оператор.</p><h4>Как измерять</h4><ul><li>Замер делают в точке установки камеры, на высоте 3–4 м. У земли значение получается на 5–10 dB хуже.</li><li>Каждого оператора замеряют трижды со своей SIM-картой, каждый раз выжидая не меньше минуты.</li><li>Прибор: LTE-роутер или сервисное приложение, показывающее сигнал. RSRP и SINR записывают отдельно.</li></ul><h4>Решение</h4><p>Ставят SIM-карту самого сильного оператора. Второй по силе записывают в форму обследования как резервный: если роутер с двумя SIM, он включится при сбое.</p><h4>Что записать в форму обследования</h4><p>Оператор, RSRP, SINR, время и высота замера. Если оператор замерялся несколько раз, берётся худшее значение: проект строится не на среднем, а на плохом дне.</p><p class='ogoh'>Разовый замер ничего не гарантирует. Вечером сеть нагружена и SINR падает, поэтому на пилотных объектах замер повторяют днём и вечером.</p>"
  }
 },
 "s-korik.yaxshi": {
  "yorliq": "Montajchi uchun",
  "sarlavha": "−90…−105 dBm: hodisa yetadi, video cheklanadi",
  "tana": "<p>Bu oraliqda hodisa, kadr va telemetriya ishonchli yetib boradi. Doimiy jonli videoda bitreyt tushadi va oqim uziladi. Shuning uchun bunday obyektda nazorat hodisaga quriladi: harakat bo'lsa kadr va 10–20 soniyalik klip keladi, jonli video operator ochganda yoqiladi.</p><h4>Umumiy ma'lumotnoma shkalasi</h4><table><tr><th>RSRP, dBm</th><th>Baho</th></tr><tr><td>−65 … −75</td><td>A'lo</td></tr><tr><td>−75 … −85</td><td>Yaxshi</td></tr><tr><td>−85 … −95</td><td>O'rtacha</td></tr><tr><td>−95 … −105</td><td>Past</td></tr><tr><td>−105 … −115</td><td>Juda past</td></tr><tr><td>−115 dan past</td><td>Xizmat yo'q</td></tr></table><p>Loyiha shkalasi ma'lumotnomadan yumshoqroq: bizga keng kanal emas, hodisa kerak. Chegaralar pilotda o'lchangan paket yo'qotishi bilan tasdiqlanadi yoki suriladi.</p><h4>Montajchi uchun amaliy qoida</h4><ul><li>Kamera klip sifatini «hodisa» profilida 1–2 Mbit/s ga cheklaydi.</li><li>Jonli videoning ikkinchi oqimi (sub-stream) past sifatda ochiladi.</li><li>Ikki SIM'li routerda ikkinchi operator ham shu oraliqda bo'lsa, zaxira sifatida qoldiriladi.</li></ul>",
  "manba": [
   [
    "Simology: RSRP, RSRQ, SINR",
    "https://simology.io/blog/coverage-metrics-decoded-rsrp-rsrq-sinr-plain-english"
   ]
  ],
  "ru": {
   "yorliq": "Для монтажника",
   "sarlavha": "−90…−105 dBm: события доходят, видео ограничено",
   "tana": "<p>В этом диапазоне события, кадры и телеметрия доходят надёжно. Непрерывное живое видео теряет битрейт и обрывается. Поэтому контроль на таком объекте строится на событиях: при движении приходят кадр и клип на 10–20 секунд, живое видео включается, когда его открывает оператор.</p><h4>Общая справочная шкала</h4><table><tr><th>RSRP, dBm</th><th>Оценка</th></tr><tr><td>−65 … −75</td><td>Отлично</td></tr><tr><td>−75 … −85</td><td>Хорошо</td></tr><tr><td>−85 … −95</td><td>Средне</td></tr><tr><td>−95 … −105</td><td>Слабо</td></tr><tr><td>−105 … −115</td><td>Очень слабо</td></tr><tr><td>ниже −115</td><td>Нет сервиса</td></tr></table><p>Шкала проекта мягче справочной: нам нужен не широкий канал, а доставка событий. Границы подтверждаются или сдвигаются по потерям пакетов, измеренным на пилоте.</p><h4>Практическое правило для монтажника</h4><ul><li>Качество клипа в профиле «событие» ограничивается 1–2 Мбит/с.</li><li>Живое видео открывается по второму потоку (sub-stream) в низком качестве.</li><li>Если второй оператор тоже в этом диапазоне, его SIM оставляют в роутере как резерв.</li></ul>"
  }
 },
 "s-korik.chegara": {
  "yorliq": "Montajchi uchun",
  "sarlavha": "−105…−115 dBm: tashqi antenna qo'yiladi",
  "tana": "<p>Bu darajada kamera yoki routerning ichki antennasi tez-tez uziladi. Yechim — tashqi yo'naltirilgan LTE antenna: u baza stansiyasiga qaratiladi va signalni sezilarli ko'taradi.</p><h4>Montajchi nima qiladi</h4><ul><li>Antenna tom yoki ustun tepasiga, baza stansiyasi tomonga o'rnatiladi. Yo'nalish 10–15° qadam bilan burab, RSRP eng yuqori bo'lgan holatda qotiriladi.</li><li>Kabel iloji boricha qisqa: har metr koaksial kabel signalni kamaytiradi. 5 m dan uzun chiqsa, router antenna yoniga, germetik qutiga ko'chiriladi.</li><li>Ikki kanalli (MIMO) antennaning ikkala ulagichi ham ulanadi.</li><li>O'lchov takrorlanadi va ko'rik shakliga «antennagacha» va «antennadan keyin» qiymati yoziladi.</li></ul><p>Antenna, kabel va mahkamlagich smetaga alohida qator bo'lib kiradi. Ko'rikda montajchi antenna turadigan joyni va kabel uzunligini aniq yozadi, aks holda montaj kuni qo'shimcha xarid kerak bo'ladi.</p><p class='ogoh'>Antenna bilan ham −115 dBm dan yomon bo'lsa, obyekt «qamrov yo'q» toifasiga o'tadi. Bunday joyda jonli video va'da qilinmaydi.</p>",
  "manba": [
   [
    "Simology: RSRP, RSRQ, SINR",
    "https://simology.io/blog/coverage-metrics-decoded-rsrp-rsrq-sinr-plain-english"
   ]
  ],
  "ru": {
   "yorliq": "Для монтажника",
   "sarlavha": "−105…−115 dBm: ставим внешнюю антенну",
   "tana": "<p>На таком уровне встроенная антенна камеры или роутера часто теряет связь. Решение — внешняя направленная LTE-антенна: её разворачивают на базовую станцию, и сигнал заметно растёт.</p><h4>Что делает монтажник</h4><ul><li>Антенну ставят на крышу или верх опоры в сторону базовой станции. Направление подбирают поворотом с шагом 10–15° и фиксируют в положении с максимальным RSRP.</li><li>Кабель — как можно короче: каждый метр коаксиала ослабляет сигнал. Если выходит длиннее 5 м, роутер переносят к антенне, в герметичный бокс.</li><li>У двухканальной (MIMO) антенны подключают оба разъёма.</li><li>Замер повторяют и записывают в форму обследования значения «до антенны» и «после».</li></ul><p>Антенна, кабель и крепёж идут в смету отдельной строкой. При обследовании монтажник точно записывает место антенны и длину кабеля, иначе в день монтажа придётся докупать.</p><p class='ogoh'>Если и с антенной хуже −115 дБм, объект переводится в категорию «нет покрытия». Живое видео там не обещают.</p>"
  }
 },
 "s-korik.yoq": {
  "yorliq": "Montajchi uchun",
  "sarlavha": "Qamrov yo'q: uchta muqobil yo'l",
  "tana": "<p>−115 dBm dan past qiymatda LTE ishonchli emas. Tanlov obyekt qiymati va qo'shnilariga bog'liq.</p><table><tr><th>Yo'l</th><th>Qachon mos</th></tr><tr><td>LoRaWAN datchiklari, Yechim 06</td><td>Ochiq joyda taxminan 2–5 km ichida LTE bor nuqta topilsa. Shlyuz o'sha yerga, datchiklar obyektga</td></tr><tr><td>Klaster radio ko'prigi, Yechim 10</td><td>Qo'shni obyektda aloqa va quvvat bor, orada to'g'ri ko'rinish</td></tr><tr><td>Sun'iy yo'ldosh terminali</td><td>Qimmat aktiv, atrofda aloqa yo'q. Terminal modeliga qarab 25–100 Vt oladi, quyosh hisobi alohida</td></tr></table><p>Uchala holatda ham asos jonli video emas, hodisa va kadr. Video joyida SD karta yoki NVR'ga yoziladi va servis tashrifida olinadi.</p><p>Bunday obyekt uchun qabul testi ham boshqacha: jonli video tekshiruvi o'rniga hodisaning shlyuz yoki yo'ldosh orqali kelish vaqti o'lchanadi.</p><p class='ogoh'>Sun'iy yo'ldosh terminalidan foydalanish uchun ruxsat va litsenziya masalasi yuridik bo'lim bilan oldindan kelishiladi.</p>",
  "manba": [],
  "ru": {
   "yorliq": "Для монтажника",
   "sarlavha": "Нет покрытия: три обходных пути",
   "tana": "<p>Ниже −115 dBm LTE ненадёжен. Выбор зависит от стоимости объекта и его соседей.</p><table><tr><th>Путь</th><th>Когда подходит</th></tr><tr><td>Датчики LoRaWAN, решение 06</td><td>Если на открытой местности примерно в 2–5 км есть точка с LTE. Шлюз ставят там, датчики — на объекте</td></tr><tr><td>Радиомост кластера, решение 10</td><td>У соседнего объекта есть связь и питание, между ними прямая видимость</td></tr><tr><td>Спутниковый терминал</td><td>Дорогой актив, связи вокруг нет. Терминал берёт 25–100 Вт в зависимости от модели, солнечный расчёт отдельный</td></tr></table><p>Во всех трёх случаях основа — не живое видео, а события и кадры. Видео пишется на месте, на SD-карту или NVR, и забирается при сервисном выезде.</p><p>Приёмочный тест для такого объекта тоже другой: вместо проверки живого видео измеряется время доставки события через шлюз или спутник.</p><p class='ogoh'>Разрешение и лицензия на спутниковый терминал заранее согласуются с юридическим отделом.</p>"
  }
 },
 "s-korik.sinr": {
  "yorliq": "Montajchi uchun",
  "sarlavha": "SINR: signal kuchli, lekin toza emas",
  "tana": "<p>RSRP signal qanchalik kuchli ekanini ko'rsatadi. SINR esa foydali signal shovqin va qo'shni hujayralar ustidan qanchalik ustun ekanini. Kuchli, lekin iflos signal ham videoni uzadi.</p><table><tr><th>SINR, dB</th><th>Holat</th><th>Harakat</th></tr><tr><td>20 dan yuqori</td><td>A'lo</td><td>—</td></tr><tr><td>13–20</td><td>Yaxshi</td><td>—</td></tr><tr><td>0–13</td><td>O'rtacha</td><td>Hodisa yetadi, video sifati past</td></tr><tr><td>0 dan past</td><td>Shovqin signaldan kuchli</td><td>Yo'naltirilgan antenna yoki boshqa operator</td></tr></table><p>Tipik holat: tepalikdagi obyekt bir nechta baza stansiyasini bir xil kuchda ko'radi. RSRP −85 dBm, SINR esa 2 dB. Yo'naltirilgan antenna bitta stansiyani tanlaydi va SINR ko'tariladi.</p><p>Ko'rik shaklida RSRP ham, SINR ham majburiy maydon: bittasi bo'sh bo'lsa, shakl saqlanmaydi.</p><p>Operatorlar orasida tanlovda avval SINR, keyin RSRP qaraladi: −95 dBm va 15 dB signal −85 dBm va 1 dB signaldan yaxshiroq ishlaydi.</p>",
  "manba": [
   [
    "Simology: RSRP, RSRQ, SINR",
    "https://simology.io/blog/coverage-metrics-decoded-rsrp-rsrq-sinr-plain-english"
   ]
  ],
  "ru": {
   "yorliq": "Для монтажника",
   "sarlavha": "SINR: сигнал сильный, но грязный",
   "tana": "<p>RSRP показывает, насколько сигнал сильный. SINR — насколько полезный сигнал превышает шум и помехи соседних сот. Сильный, но грязный сигнал тоже обрывает видео.</p><table><tr><th>SINR, dB</th><th>Состояние</th><th>Действие</th></tr><tr><td>выше 20</td><td>Отлично</td><td>—</td></tr><tr><td>13–20</td><td>Хорошо</td><td>—</td></tr><tr><td>0–13</td><td>Средне</td><td>События доходят, качество видео низкое</td></tr><tr><td>ниже 0</td><td>Шум сильнее сигнала</td><td>Направленная антенна или другой оператор</td></tr></table><p>Типичный случай: объект на возвышенности видит несколько базовых станций с одинаковой силой. RSRP −85 dBm, а SINR 2 dB. Направленная антенна выбирает одну станцию, и SINR растёт.</p><p>В форме обследования RSRP и SINR — обязательные поля: если одно пустое, форма не сохраняется.</p><p>При выборе оператора сначала смотрят SINR, потом RSRP: сигнал −95 dBm при 15 dB работает лучше, чем −85 dBm при 1 dB.</p>"
  }
 },
 "s-korik.quyosh": {
  "yorliq": "Montajchi uchun",
  "sarlavha": "Quyosh: dekabr soyasi va 55° burchak",
  "tana": "<p>Toshkent 41,3° shimoliy kenglikda. Dekabrda quyosh tushda ufqdan taxminan 25° balandlikda, soat 10:00 va 15:00 da esa 15–18°. Yozda ochiq turgan joy qishda daraxt yoki qo'shni tom soyasida qoladi.</p><h4>Tekshiruv</h4><ul><li>Panel janubga qaraydi, og'ish ±15° dan oshmaydi. Yo'nalish telefon kompasi bilan o'lchanadi.</li><li>Janub tomondagi to'siq paneldan kamida to'rtta balandlik farqi uzoqlikda turishi kerak. Paneldan 5 m baland daraxt 20 m ichida bo'lsa, joy yaroqsiz.</li><li>Qishki burchak: kenglik + 15°, ya'ni taxminan 55°. Tik panelda qor ham tez sirg'aladi.</li><li>Janub tomonga uchta foto: soat 10, 12 va 15 dagi quyosh yo'nalishi bo'yicha.</li></ul><p class='ogoh'>Ko'rik yozda o'tsa ham, soya dekabr quyoshi balandligi bo'yicha baholanadi. Bargsiz daraxt shoxi ham panel quvvatini sezilarli tushiradi.</p>",
  "manba": [
   [
    "Renogy: panel qiyaligi",
    "https://www.renogy.com/blogs/buyers-guide/how-to-calculate-solar-panel-tilt-angle"
   ]
  ],
  "ru": {
   "yorliq": "Для монтажника",
   "sarlavha": "Солнце: декабрьская тень и угол 55°",
   "tana": "<p>Ташкент лежит на 41,3° северной широты. В декабре солнце в полдень поднимается примерно на 25° над горизонтом, а в 10:00 и 15:00 — лишь на 15–18°. Место, открытое летом, зимой оказывается в тени дерева или соседней крыши.</p><h4>Что проверить</h4><ul><li>Панель смотрит на юг, отклонение не больше ±15°. Направление измеряют компасом телефона.</li><li>Препятствие с южной стороны должно стоять от панели дальше, чем четыре его превышения над ней. Дерево на 5 м выше панели в пределах 20 м делает место непригодным.</li><li>Зимний угол: широта + 15°, то есть около 55°. С крутой панели и снег сходит быстрее.</li><li>Три фото в южную сторону — по направлению солнца в 10, 12 и 15 часов.</li></ul><p class='ogoh'>Даже если обследование проходит летом, тень оценивается по высоте декабрьского солнца. Голые ветви зимой тоже заметно снижают выработку.</p>"
  }
 },
 "s-korik.nuqta": {
  "yorliq": "Montajchi uchun",
  "sarlavha": "O'rnatish nuqtasi: balandlik, masofa va asos",
  "tana": "<p>Nuqta uchta shartga javob beradi: kirgan odamning yuzi taniladi, qurilmaga qo'l yetmaydi, servisda narvon bilan yetish mumkin.</p><ul><li><b>Balandlik 3–4 m.</b> Pastroqda qurilmani burish yoki sindirish oson, balandroqda yuz kadrga tepadan tushadi.</li><li><b>Eshikgacha 5–10 m.</b> Kirgan odam kadrda bir necha soniya turadi.</li><li><b>Quyoshga qarshi emas.</b> Past qishki quyosh kadrni oqartirib yuboradi.</li><li><b>Asos:</b> g'isht, beton yoki metall ustun. Shifer, gipsokarton va yog'och karniz yaroqsiz.</li><li><b>Kabel yo'li</b> o'lchanadi: kamera, akkumulyator qutisi va antenna orasidagi masofa smetaga kiradi.</li></ul><p>Har nuqta platformadagi «Ko'rik o'tkazish» shaklida fotoga belgilanadi. Montaj brigadasi aynan shu joyni topadi, qayta qidirmaydi.</p><p>Ko'char mulk uchun nuqta boshqa: transport va texnikaga kamera emas, plomba va GPS kuzatuvchi qo'yiladi. Ko'rikda uning yashirin joyi va antennaning osmonni ko'rishi tekshiriladi.</p>",
  "manba": [],
  "ru": {
   "yorliq": "Для монтажника",
   "sarlavha": "Точка установки: высота, дистанция, основание",
   "tana": "<p>Точка должна отвечать трём условиям: лицо входящего различимо, до устройства не дотянуться рукой, а сервисник достаёт до него со стремянки.</p><ul><li><b>Высота 3–4 м.</b> Ниже устройство легко развернуть или разбить, выше лицо попадает в кадр сверху.</li><li><b>До двери 5–10 м.</b> Входящий остаётся в кадре несколько секунд.</li><li><b>Не против солнца.</b> Низкое зимнее солнце засвечивает кадр.</li><li><b>Основание:</b> кирпич, бетон или металлическая опора. Шифер, гипсокартон и деревянный карниз не годятся.</li><li><b>Трасса кабеля</b> измеряется: расстояния между камерой, аккумуляторным боксом и антенной идут в смету.</li></ul><p>Каждую точку отмечают на фото в форме «Проведение обследования» на платформе. Монтажная бригада находит именно это место и не ищет заново.</p><p>Для движимого имущества точка другая: на транспорт и технику ставят не камеру, а пломбу и GPS-трекер. При обследовании проверяют скрытое место установки и то, что антенна видит небо.</p>"
  }
 },
 "s-korik.eshik": {
  "yorliq": "Montajchi uchun",
  "sarlavha": "Eshik va qulf: masofadan ochish mumkinmi",
  "tana": "<p>Masofadan ochish uchun eshikda elektr ijrochi qurilma kerak. Ko'rikda eshikning o'zi baholanadi, qulf keyin tanlanadi.</p><table><tr><th>Eshik</th><th>Mos ijrochi</th></tr><tr><td>Metall, bir tabaqali</td><td>Elektromexanik qulf yoki elektr zasov</td></tr><tr><td>Darvoza, ombor darvozasi</td><td>Rele orqali yuritma yoki shlagbaum</td></tr><tr><td>Shisha yoki alyuminiy</td><td>Faqat ichki eshikda, elektromagnit qulf</td></tr><tr><td>Eski yog'och</td><td>Almashtirish kerak, aktda qayd etiladi</td></tr></table><p>Elektromagnit qulf tok uzilsa ochiladi. Elektrsiz obyektda bu xavfli, shuning uchun tashqi eshikka tok yo'qolganda yopiq qoladigan qulf qo'yiladi.</p><p>Ko'rikda eshik va qulf suratga olinadi, eshik qalinligi va ochilish tomoni yoziladi. Bu ma'lumotsiz yetkazuvchi to'g'ri qulfni tanlay olmaydi.</p><p class='ogoh'>Qulf va rele 12 V zanjirdan quvvat oladi. Ularning sarfi quvvat hisobiga qo'shiladi: ochish paytidagi tok ko'p, lekin o'rtacha quvvat kichik.</p>",
  "manba": [],
  "ru": {
   "yorliq": "Для монтажника",
   "sarlavha": "Дверь и замок: можно ли открыть удалённо",
   "tana": "<p>Чтобы открывать удалённо, на двери нужен электрический исполнительный механизм. При обследовании оценивают саму дверь, замок подбирают потом.</p><table><tr><th>Дверь</th><th>Подходящий исполнитель</th></tr><tr><td>Металлическая, одностворчатая</td><td>Электромеханический замок или электрозасов</td></tr><tr><td>Ворота, складские ворота</td><td>Привод через реле или шлагбаум</td></tr><tr><td>Стекло или алюминий</td><td>Только внутренняя дверь, электромагнитный замок</td></tr><tr><td>Старая деревянная</td><td>Нужна замена, фиксируется в акте</td></tr></table><p>Электромагнитный замок открывается при пропадании тока. На объекте без электричества это опасно, поэтому на наружную дверь ставят замок, который без питания остаётся закрытым.</p><p>При обследовании дверь и замок фотографируют, записывают толщину полотна и сторону открывания. Без этих данных поставщик не подберёт правильный замок.</p><p class='ogoh'>Замок и реле питаются от цепи 12 В. Их потребление входит в расчёт питания: ток в момент открытия большой, но средняя мощность мала.</p>"
  }
 },
 "s-korik.muhit": {
  "yorliq": "Montajchi uchun",
  "sarlavha": "Muhit: chang, namlik, hayvon va vandal",
  "tana": "<ul><li><b>Chang.</b> Sex, don ombori yoki tuproq yo'l yonida panel tez ifloslanadi. Tozalash profilaktika jadvaliga kiradi, panel zaxirasi 20–30% ga oshiriladi.</li><li><b>Namlik.</b> Issiqxona va yerto'lada IP66 qutiga nafas oluvchi klapan qo'yiladi, aks holda ichida kondensat to'planadi.</li><li><b>Ferma.</b> Ammiak ulagich va platani zanglatadi, kemiruvchilar kabelni kesadi. Kabel metall gofrada, mahkamlagichlar zanglamaydigan po'latdan.</li><li><b>Vandal xavfi.</b> Yaqinda turar joy yo'q yoki oldin o'g'irlik bo'lgan obyekt. Bu yerda IK10 korpus, 4 m balandlik va maxsus boshli boltlar.</li><li><b>Issiqlik.</b> Tomdagi yopiq quti yozda taxminan 60 °C gacha qiziydi. Akkumulyator soyaga yoki shkafga qo'yiladi.</li></ul><p>Har xavf ko'rik shaklida belgilanadi va yechim tanlashda hisobga olinadi. Masalan, fermada batareyali kamera o'rniga ustun va shkaf tanlanadi.</p>",
  "manba": [],
  "ru": {
   "yorliq": "Для монтажника",
   "sarlavha": "Среда: пыль, влага, животные, вандалы",
   "tana": "<ul><li><b>Пыль.</b> Рядом с цехом, зерновым складом или грунтовой дорогой панель быстро загрязняется. Очистку вносят в график профилактики, запас по панели увеличивают на 20–30%.</li><li><b>Влага.</b> В теплице и подвале бокс IP66 оснащают дыхательным клапаном, иначе внутри копится конденсат.</li><li><b>Ферма.</b> Аммиак разъедает разъёмы и платы, грызуны перекусывают кабель. Кабель — в металлической гофре, крепёж — из нержавеющей стали.</li><li><b>Вандализм.</b> Рядом нет жилья или уже были кражи. Здесь нужны корпус IK10, высота 4 м и болты со специальной головкой.</li><li><b>Жара.</b> Закрытый бокс на крыше летом нагревается примерно до 60 °C. Аккумулятор ставят в тень или в шкаф.</li></ul><p>Каждый риск отмечают в форме обследования, и он учитывается при выборе решения. Например, на ферме вместо батарейной камеры выбирают опору со шкафом.</p>"
  }
 },
 "s-montaj.batareya": {
  "yorliq": "Montajchi uchun",
  "sarlavha": "Batareyali kamera: 100 daqiqa nimaga ketadi",
  "tana": "<p>Norma ikki kishilik brigada uchun, obyekt ichidagi ish. Yo'l vaqti alohida hisoblanadi.</p><table><tr><th>Ish</th><th>Daqiqa</th></tr><tr><td>Nuqtani tekshirish, signal va Wi-Fi o'lchovi</td><td class='n'>15</td></tr><tr><td>Ikki kamera kronshteyni</td><td class='n'>30</td></tr><tr><td>Home Hub, router va kichik LiFePO4 bloki</td><td class='n'>20</td></tr><tr><td>Ulash va reyestrga bog'lash</td><td class='n'>15</td></tr><tr><td>Qabul testi, foto va belgi</td><td class='n'>20</td></tr><tr><td><b>Jami</b></td><td class='n'>100</td></tr></table><p>Kamera va hub ofisda sozlangan bo'lsa, norma ushlanadi. Joyida proshivka yangilash har kameraga 10–15 daqiqa qo'shadi va 4G trafikni yeydi.</p><h4>Kim nima qiladi</h4><p>Birinchi montajchi kronshteyn va kameralarni o'rnatadi. Ikkinchisi shu vaqtda hub, router va reyestrni sozlaydi. Ish parallel bo'lmasa, norma 2,5–3 soatga cho'ziladi.</p><p class='ogoh'>Normalar reja qiymati. Pilotda har brigadaning haqiqiy vaqti platformadagi tashrif yozuvidan olinadi va yakuniy smetaga shu raqam kiradi.</p>",
  "manba": [],
  "ru": {
   "yorliq": "Для монтажника",
   "sarlavha": "Батарейная камера: на что уходят 100 минут",
   "tana": "<p>Норма дана для бригады из двух человек, работа на объекте. Дорога считается отдельно.</p><table><tr><th>Работа</th><th>Минут</th></tr><tr><td>Проверка точки, замер сигнала и Wi-Fi</td><td class='n'>15</td></tr><tr><td>Кронштейны двух камер</td><td class='n'>30</td></tr><tr><td>Home Hub, роутер и небольшой блок LiFePO4</td><td class='n'>20</td></tr><tr><td>Подключение и привязка в реестре</td><td class='n'>15</td></tr><tr><td>Приёмочный тест, фото и табличка</td><td class='n'>20</td></tr><tr><td><b>Итого</b></td><td class='n'>100</td></tr></table><p>Норма выдерживается, если камеры и хаб настроены в офисе. Обновление прошивки на месте добавляет 10–15 минут на камеру и съедает 4G-трафик.</p><h4>Кто что делает</h4><p>Первый монтажник ставит кронштейны и камеры. Второй в это время настраивает хаб, роутер и привязку в реестре. Без параллельной работы норма растягивается до 2,5–3 часов.</p><p class='ogoh'>Нормы плановые. На пилоте фактическое время каждой бригады берётся из записи визита на платформе, и в итоговую смету идёт именно оно.</p>"
  }
 },
 "s-montaj.ustun": {
  "yorliq": "Montajchi uchun",
  "sarlavha": "Quyosh ustuni: vaqt poydevorga ketadi",
  "tana": "<p>Ustun yerga o'rnatilsa, eng ko'p vaqtni poydevor oladi. Beton bir kundan ortiq qotadi, shuning uchun poydevor oldindan quyiladi yoki vintli qoziq ishlatiladi.</p><h4>Tartib</h4><ol><li>Qoziq yoki ankerli poydevor, ustun vertikalligi sathlagich bilan tekshiriladi.</li><li>Panel janubga, qishki burchak taxminan 55°.</li><li>Kamera, akkumulyator qutisi va antenna.</li><li>Yerga ulash va razryadnik.</li><li>Zaryad kontrolleri panel tokini ko'rsatishi tekshiriladi.</li></ol><div class='raqamlar'><div><b>4–6 soat</b><span>tayyor poydevorda</span></div><div><b>+1 kun</b><span>beton quyilsa</span></div><div><b>2–3 soat</b><span>devorga o'rnatilsa</span></div></div><p>Poydevor uchun joy va yer turi ko'rikda aniqlanadi: toshloq yerga vintli qoziq kirmaydi, u yerda beton quyiladi.</p><p class='ogoh'>Ustun 4 m dan baland bo'lsa, avtominora yoki ko'targich kerak. Bu ko'rik bosqichida smetaga kiritiladi, montaj kuni emas.</p>",
  "manba": [],
  "ru": {
   "yorliq": "Для монтажника",
   "sarlavha": "Солнечная опора: время уходит на фундамент",
   "tana": "<p>Если опору ставят в грунт, больше всего времени занимает фундамент. Бетон схватывается дольше суток, поэтому фундамент заливают заранее или используют винтовую сваю.</p><h4>Порядок</h4><ol><li>Свая или анкерный фундамент, вертикальность опоры проверяют уровнем.</li><li>Панель на юг, зимний угол около 55°.</li><li>Камера, аккумуляторный бокс и антенна.</li><li>Заземление и разрядник.</li><li>Проверка, что контроллер заряда показывает ток панели.</li></ol><div class='raqamlar'><div><b>4–6 ч</b><span>на готовом фундаменте</span></div><div><b>+1 день</b><span>если заливать бетон</span></div><div><b>2–3 ч</b><span>при монтаже на стену</span></div></div><p>Место и тип грунта под фундамент определяют при обследовании: в каменистый грунт винтовая свая не войдёт, там заливают бетон.</p><p class='ogoh'>Для опоры выше 4 м нужна автовышка или подъёмник. Это закладывается в смету на этапе обследования, а не в день монтажа.</p>"
  }
 },
 "s-montaj.shkaf": {
  "yorliq": "Montajchi uchun",
  "sarlavha": "Shkaf: bir ish kuni",
  "tana": "<p>LiFePO4 yoki klaster shkafi — bir nechta qurilma uchun umumiy quvvat va aloqa tuguni. Ertalab mahkamlash, tushdan keyin ulash va test.</p><ul><li>Shkaf devorga yoki poydevorga, yerdan kamida 0,5 m baland: suv bosmasin.</li><li>Akkumulyator bloklari alohida tashiladi va joyida qo'yiladi. Turiga qarab har biri 10–45 kg.</li><li>Ichida: BMS, DC-DC o'zgartirgich, ikki SIM'li router, NVR va avtomatlar.</li><li>Klaster shkafida qo'shni obyektlarga radio ko'prik sozlanadi, har biriga yana 1–2 soat.</li><li>BMS holati Modbus orqali platformaga ulanadi va shu kuni sinaladi.</li></ul><p>Shkaf kaliti bankda va integratorda turadi, ochilishi eshik datchigi orqali platformaga hodisa bo'lib keladi. Ruxsatsiz ochish servis tashrifi bilan solishtiriladi.</p><p class='ogoh'>Shkaf ichida harorat 0 °C dan pastga tushadigan joyda isitgichli blok yoki issiqlik izolyatsiyasi majburiy. Aks holda qishda zaryad to'xtaydi.</p>",
  "manba": [],
  "ru": {
   "yorliq": "Для монтажника",
   "sarlavha": "Шкаф: один рабочий день",
   "tana": "<p>Шкаф LiFePO4 или кластерный шкаф — общий узел питания и связи для нескольких устройств. Утром крепёж, после обеда подключение и тест.</p><ul><li>Шкаф на стену или фундамент, не ниже 0,5 м от земли, чтобы не подтопило.</li><li>Аккумуляторные блоки везут отдельно и ставят на месте. В зависимости от типа каждый весит 10–45 кг.</li><li>Внутри: BMS, DC-DC преобразователь, роутер на две SIM, NVR и автоматы.</li><li>В кластерном шкафу настраивают радиомосты к соседним объектам, плюс 1–2 часа на каждый.</li><li>Состояние BMS выводится на платформу по Modbus и проверяется в тот же день.</li></ul><p>Ключ от шкафа хранится у банка и интегратора, а вскрытие приходит на платформу событием от датчика двери. Несанкционированное вскрытие сверяется с графиком сервисных визитов.</p><p class='ogoh'>Если внутри шкафа температура опускается ниже 0 °C, обязателен блок с подогревом или теплоизоляция. Иначе зимой заряд остановится.</p>"
  }
 },
 "s-montaj.tayyor": {
  "yorliq": "Montajchi uchun",
  "sarlavha": "Ofisda tayyorlash: obyektga sozlangan qurilma boradi",
  "tana": "<p>Obyektda vaqt qimmat, aloqa zaif. Shuning uchun sozlashning hammasi integrator omborida bajariladi.</p><h4>Nazorat ro'yxati</h4><ul><li>Proshivka oxirgi barqaror versiyaga yangilanadi, versiya reyestrga yoziladi.</li><li>Zavod paroli o'chiriladi. Har qurilmaga alohida kuchli parol, u parollar omborida saqlanadi, qog'ozda emas.</li><li>Keraksiz xizmatlar o'chiriladi: P2P bulut, UPnP, Telnet, ochiq veb-port.</li><li>SIM-karta faollashtiriladi, bankning yopiq APN'i va VPN profili yoziladi.</li><li>NTP serveri sozlanadi: hodisa vaqti to'g'ri va UTC'da keladi.</li><li>QR yorliq korpusga va qopqoqning ichki tomoniga yopishtiriladi.</li></ul><p>Tayyor qurilma 30 daqiqa stendda ishlaydi va platformaga sinov hodisasini yuboradi.</p><p>Parollar ombori faqat integratorning mas'ul xodimi va bankning axborot xavfsizligi bo'limiga ochiq. Montajchi parolni ko'rmaydi: qurilma unga sozlangan holda beriladi.</p><p class='ogoh'>Zavod paroli bilan chiqqan qurilma qabul testidan o'tmaydi. Bu bandda istisno yo'q.</p>",
  "manba": [],
  "ru": {
   "yorliq": "Для монтажника",
   "sarlavha": "Подготовка в офисе: на объект едет настроенное устройство",
   "tana": "<p>На объекте время дорого, а связь слабая. Поэтому вся настройка делается на складе интегратора.</p><h4>Чек-лист</h4><ul><li>Прошивка обновляется до последней стабильной версии, версия записывается в реестр.</li><li>Заводской пароль удаляется. У каждого устройства свой стойкий пароль, он хранится в хранилище паролей, а не на бумаге.</li><li>Лишние сервисы отключаются: P2P-облако, UPnP, Telnet, открытый веб-порт.</li><li>SIM-карта активируется, прописываются закрытый APN банка и VPN-профиль.</li><li>Настраивается NTP-сервер: время события приходит точным и в UTC.</li><li>QR-этикетка клеится на корпус и на внутреннюю сторону крышки.</li></ul><p>Готовое устройство 30 минут работает на стенде и отправляет на платформу тестовое событие.</p><p>Хранилище паролей доступно только ответственному сотруднику интегратора и службе информационной безопасности банка. Монтажник пароль не видит: устройство выдаётся ему уже настроенным.</p><p class='ogoh'>Устройство с заводским паролем приёмочный тест не проходит. Исключений нет.</p>"
  }
 },
 "s-montaj.mahkam": {
  "yorliq": "Montajchi uchun",
  "sarlavha": "Mahkamlash: balandlik, burchak va korpus",
  "tana": "<table><tr><th>Talab</th><th>Qiymat</th></tr><tr><td>Balandlik</td><td>3–4 m</td></tr><tr><td>Pastga qiyalik</td><td>15–30°</td></tr><tr><td>Chang va suvdan himoya</td><td>IP66</td></tr><tr><td>Zarbaga chidamlilik</td><td>IK10, 20 J</td></tr><tr><td>Ish harorati</td><td>−20 °C va undan past</td></tr></table><p>IP66 — chang umuman kirmaydi, kuchli suv oqimiga chidaydi. IK10 — korpus 5 kg yukning 40 sm balandlikdan tushishiga teng zarbaga chidaydi.</p><ul><li>Kronshteyn ankerga mahkamlanadi, plastik dyubelga emas.</li><li>Ufq kadrning yuqori chetidan pastda: osmon ekspozitsiyani buzmasin.</li><li>Kadrda darvoza yoki obyekt raqami ko'rinadi: dalil uchun joy aniq bo'lishi kerak.</li><li>Kamera tunda ko'radigan masofada yoritiladigan fon bo'lmasin: IK nuri devordan qaytib, kadrni oqartiradi.</li></ul><p>Montajdan keyin kadr platformada ochilib ko'riladi va burchak shu yerda to'g'rilanadi: brigada ketganidan keyin kamerani burish uchun yana tashrif kerak bo'ladi.</p>",
  "manba": [],
  "ru": {
   "yorliq": "Для монтажника",
   "sarlavha": "Крепление: высота, наклон, корпус",
   "tana": "<table><tr><th>Требование</th><th>Значение</th></tr><tr><td>Высота</td><td>3–4 м</td></tr><tr><td>Наклон вниз</td><td>15–30°</td></tr><tr><td>Защита от пыли и воды</td><td>IP66</td></tr><tr><td>Ударопрочность</td><td>IK10, 20 Дж</td></tr><tr><td>Рабочая температура</td><td>не хуже −20 °C</td></tr></table><p>IP66 — полная пылезащита и стойкость к сильным струям воды. IK10 — корпус выдерживает удар, равный падению груза 5 кг с высоты 40 см.</p><ul><li>Кронштейн крепится на анкер, а не на пластиковый дюбель.</li><li>Горизонт ниже верхнего края кадра, чтобы небо не сбивало экспозицию.</li><li>В кадре видны ворота или номер объекта: для доказательства место должно быть однозначным.</li><li>Рядом с камерой не должно быть близкой стены в зоне ночной подсветки: ИК-луч отражается и засвечивает кадр.</li></ul><p>После монтажа кадр открывают на платформе и угол доводят сразу: чтобы повернуть камеру после отъезда бригады, понадобится ещё один выезд.</p>"
  }
 },
 "s-montaj.kabel": {
  "yorliq": "Montajchi uchun",
  "sarlavha": "Kabel, yerga ulash va razryadnik",
  "tana": "<p>Elektrsiz obyektda nosozlikning ko'pi ulanish joyida: nam kirgan ulagich, kemirilgan kabel, chaqmoqdan kuygan kontroller.</p><ul><li>Tashqi kabel metall gofra yoki UV'ga chidamli kanalda.</li><li>Ulanishlar IP66 qutida, kabel qutiga pastdan, germetik salnik orqali kiradi.</li><li>Kabelda tomchi halqasi qilinadi: suv ulagichga oqmaydi, pastga tomadi.</li><li>Quyosh ustuni alohida yerga ulash elektrodiga ulanadi, qarshilik o'lchanadi va aktga yoziladi.</li><li>Panel va kontroller orasiga DC razryadnik, LTE antenna kabeliga koaksial razryadnik qo'yiladi.</li></ul><p>Razryadnik va yerga ulash smetada alohida qator. Ularsiz arzon taklif keyin chaqmoqdan kuygan kontroller va kamera narxida qaytadi.</p><p class='ogoh'>Ustun obyektdagi eng baland nuqta bo'lsa, chaqmoq xavfi yuqori. Bunday joyda yerga ulashsiz montaj qabul qilinmaydi.</p>",
  "manba": [],
  "ru": {
   "yorliq": "Для монтажника",
   "sarlavha": "Кабель, заземление и разрядник",
   "tana": "<p>На объекте без электричества большинство отказов — в местах соединений: намокший разъём, погрызенный кабель, контроллер, сгоревший от молнии.</p><ul><li>Наружный кабель — в металлической гофре или в стойком к ультрафиолету канале.</li><li>Соединения — в боксе IP66, кабель заходит снизу через герметичный сальник.</li><li>На кабеле делают каплеотводную петлю: вода стекает вниз, а не в разъём.</li><li>Солнечная опора подключается к отдельному заземлителю, сопротивление измеряют и вносят в акт.</li><li>Между панелью и контроллером ставят DC-разрядник, на кабель LTE-антенны — коаксиальный.</li></ul><p>Разрядник и заземление — отдельные строки сметы. Дешёвое предложение без них потом обходится стоимостью сгоревших от молнии контроллера и камеры.</p><p class='ogoh'>Если опора — самая высокая точка объекта, риск удара молнии высок. Монтаж без заземления там не принимается.</p>"
  }
 },
 "s-montaj.aloqa": {
  "yorliq": "Montajchi uchun",
  "sarlavha": "Aloqa: ko'rikdagi o'lchov qayta tekshiriladi",
  "tana": "<ol><li>Qurilma joyida yoqiladi, RSRP va SINR ko'rikdagi qiymat bilan solishtiriladi. Farq 6 dB dan katta bo'lsa, sababi topiladi: antenna yo'nalishi, metall to'siq yoki boshqa hujayra.</li><li>Router yopiq APN orqali ulanadi, VPN tunnel ko'tariladi. Ochiq IP va port yo'naltirish ishlatilmaydi.</li><li>Platformada qurilma «aloqada» holatiga o'tadi, last_seen yangilanadi.</li><li>Sinov hodisasi: montajchi kadr oldidan o'tadi, hodisa platformaga kelgan vaqt yoziladi.</li><li>Ikki SIM'li routerda SIM1 o'chirib ko'riladi, SIM2 ga o'tish vaqti qayd etiladi.</li></ol><p>Natija «Qurilma o'rnatish» sahifasidagi «Ulanish testi» tugmasi orqali saqlanadi. Test o'tmasa, qurilma reyestrda «o'rnatilgan» holatiga o'tmaydi.</p><h4>Test o'tmasa</h4><p>Avval antenna yo'nalishi va SIM holati tekshiriladi, keyin APN va VPN profili. Sabab 30 daqiqada topilmasa, montajchi jamoa rahbariga qo'ng'iroq qiladi: platforma tomonidagi xato obyektda tuzatilmaydi.</p>",
  "manba": [],
  "ru": {
   "yorliq": "Для монтажника",
   "sarlavha": "Связь: повторная проверка замера обследования",
   "tana": "<ol><li>Устройство включают на месте, RSRP и SINR сравнивают со значениями обследования. При разнице больше 6 dB ищут причину: направление антенны, металлическое препятствие или другая сота.</li><li>Роутер подключается через закрытый APN, поднимается VPN-туннель. Публичный IP и проброс портов не используются.</li><li>На платформе устройство переходит в статус «на связи», обновляется last_seen.</li><li>Тестовое событие: монтажник проходит перед камерой, фиксируется время прихода события на платформу.</li><li>На роутере с двумя SIM отключают SIM1 и записывают время перехода на SIM2.</li></ol><p>Результат сохраняется кнопкой «Тест подключения» на странице «Установка устройства». Если тест не пройден, устройство в реестре не переходит в статус «установлено».</p><h4>Если тест не пройден</h4><p>Сначала проверяют направление антенны и состояние SIM, затем APN и VPN-профиль. Если за 30 минут причина не найдена, монтажник звонит тимлиду: ошибку на стороне платформы на объекте не исправить.</p>"
  }
 },
 "s-montaj.reyestr": {
  "yorliq": "Jamoa rahbarlari uchun",
  "sarlavha": "QR yorliq: qurilma qaysi obyektda",
  "tana": "<p>100+ obyektda qurilmalar ko'chadi, almashtiriladi, ta'mirga ketadi. Qurilma va obyekt bog'lanishi faqat yorliq va reyestr orqali ishonchli saqlanadi.</p><h4>Yorliqda</h4><ul><li>QR kod: qurilma ID, masalan KAM-0007.</li><li>Matn: qurilma ID va servis telefoni. Obyekt raqami va manzil yozilmaydi.</li><li>Material: UV va namlikka chidamli.</li></ul><h4>Jarayon</h4><ol><li>Montajchi telefonda QR'ni skanerlaydi.</li><li>Platforma seriya raqamini tekshiradi: reyestrda takror bo'lsa, rad etadi.</li><li>Qurilma obyektga biriktiriladi: <code>KAM-0007 → AK-2025/0934</code>, vaqt va montajchi ismi bilan.</li></ol><p>Zaxiradan olingan qurilma ham shu tartibda biriktiriladi. Ta'mirdagi qurilma reyestrda «servisda» holatida turadi va hech bir obyektga bog'lanmaydi.</p><p class='ogoh'>Qurilma boshqa obyektga ko'chirilsa, eski bog'lanish yopiladi va tarixda qoladi. Aks holda yangi joy hodisalari eski obyekt kartochkasiga yozilib ketadi.</p>",
  "manba": [],
  "ru": {
   "yorliq": "Для тимлида",
   "sarlavha": "QR-этикетка: на каком объекте устройство",
   "tana": "<p>На 100+ объектах устройства переезжают, меняются, уходят в ремонт. Связь устройства с объектом надёжно держится только через этикетку и реестр.</p><h4>На этикетке</h4><ul><li>QR-код: ID устройства, например KAM-0007.</li><li>Текст: ID устройства и телефон сервиса. Номер объекта и адрес не пишутся.</li><li>Материал: стойкий к ультрафиолету и влаге.</li></ul><h4>Процесс</h4><ol><li>Монтажник сканирует QR телефоном.</li><li>Платформа проверяет серийный номер: при дубле в реестре отказывает.</li><li>Устройство привязывается к объекту: <code>KAM-0007 → AK-2025/0934</code>, со временем и именем монтажника.</li></ol><p>Устройство из резерва привязывается так же. Устройство в ремонте стоит в реестре со статусом «в сервисе» и ни к одному объекту не привязано.</p><p class='ogoh'>При переносе на другой объект старая привязка закрывается и остаётся в истории. Иначе события с нового места попадут в карточку старого объекта.</p>"
  }
 },
 "s-montaj.topshir": {
  "yorliq": "Montajchi uchun",
  "sarlavha": "Topshirish paketi: belgi, foto, sxema",
  "tana": "<p>Montaj brigada ketganda emas, topshirish paketi platformaga yuklanganda tugaydi.</p><ul><li><b>Ogohlantirish belgisi</b> kirishda, ko'rinadigan joyda: hudud videokuzatuvda. Belgining o'zi ham o'g'rini to'xtatadi.</li><li><b>Oldin va keyin fotolar</b>: har nuqta bir xil burchakdan, umumiy va yaqin plan.</li><li><b>Ulanish sxemasi</b>: qaysi qurilma qayerda, kabel yo'li, avtomat va quti joyi.</li><li><b>Kadr namunasi</b>: har kameradan kunduzgi va tungi kadr.</li><li><b>O'lchovlar</b>: RSRP, SINR, yerga ulash qarshiligi, panel toki.</li></ul><p>Paket to'liq bo'lmasa, qabul testi boshlanmaydi.</p><p>Fotolar keyinchalik sug'urta, sud yoki sotuvda obyekt holatining dalili bo'lib xizmat qiladi.</p><p class='ogoh'>Belgi matnini yuridik bo'lim tasdiqlaydi: u shaxsga doir ma'lumotlar qonunchiligiga mos bo'lishi kerak.</p>",
  "manba": [],
  "ru": {
   "yorliq": "Для монтажника",
   "sarlavha": "Пакет сдачи: табличка, фото, схема",
   "tana": "<p>Монтаж заканчивается не когда уехала бригада, а когда пакет сдачи загружен на платформу.</p><ul><li><b>Предупреждающая табличка</b> у входа, на видном месте: территория под видеонаблюдением. Табличка сама по себе отпугивает вора.</li><li><b>Фото до и после</b>: каждая точка с одного ракурса, общий и крупный план.</li><li><b>Схема подключения</b>: где какое устройство, трасса кабеля, место автоматов и боксов.</li><li><b>Образец кадра</b>: дневной и ночной кадр с каждой камеры.</li><li><b>Замеры</b>: RSRP, SINR, сопротивление заземления, ток панели.</li></ul><p>Без полного пакета приёмочный тест не начинается.</p><p>Позже эти фото служат доказательством состояния объекта для страховой, суда или продажи.</p><p class='ogoh'>Текст таблички утверждает юридический отдел: он должен соответствовать законодательству о персональных данных.</p>"
  }
 },
 "s-quvvat.kunlik": {
  "yorliq": "Texnik izoh",
  "sarlavha": "O'rtacha quvvat qanday aniqlanadi",
  "tana": "<p>Datasheet'dagi eng yuqori quvvat bilan hisoblansa, panel 2–3 barobar katta chiqadi. Kutish rejimidagi qiymat bilan esa yetmay qoladi. To'g'ri qiymat — sutka bo'yicha o'rtacha.</p><h4>Misol: Hikvision quyosh-4G kamerasi</h4><table><tr><th>Rejim</th><th>Quvvat</th><th>Soat</th><th>Vt·soat</th></tr><tr><td>Kutish</td><td class='n'>0,08 Vt</td><td class='n'>22</td><td class='n'>1,8</td></tr><tr><td>Ish, 4G</td><td class='n'>1,85 Vt</td><td class='n'>1,5</td><td class='n'>2,8</td></tr><tr><td>Tungi yoritgich va video</td><td class='n'>7 Vt</td><td class='n'>0,5</td><td class='n'>3,5</td></tr><tr><td><b>Sutka</b></td><td></td><td class='n'>24</td><td class='n'>8,1</td></tr></table><p>Hodisa kam bo'lgan obyektda kamera sutkasiga 8–10 Vt·soat oladi. Slayddagi 3 Vt, ya'ni 72 Vt·soat, tez-tez ochiladigan video, kichik router va qish zaxirasi bilan olingan. Soatlar taxminiy namuna.</p><p class='ogoh'>Pilotda o'rtacha quvvat taxmin qilinmaydi: u telemetriyadagi batareya grafigidan o'lchanadi va keyingi xaridlar shu raqamga hisoblanadi.</p>",
  "manba": [],
  "ru": {
   "yorliq": "Техническая справка",
   "sarlavha": "Как определить среднюю мощность",
   "tana": "<p>Если считать по максимальной мощности из даташита, панель выйдет в 2–3 раза больше нужного. По мощности в режиме ожидания — не хватит. Правильная величина — средняя за сутки.</p><h4>Пример: солнечная 4G-камера Hikvision</h4><table><tr><th>Режим</th><th>Мощность</th><th>Часов</th><th>Вт·ч</th></tr><tr><td>Ожидание</td><td class='n'>0,08 Вт</td><td class='n'>22</td><td class='n'>1,8</td></tr><tr><td>Работа, 4G</td><td class='n'>1,85 Вт</td><td class='n'>1,5</td><td class='n'>2,8</td></tr><tr><td>Ночная подсветка и видео</td><td class='n'>7 Вт</td><td class='n'>0,5</td><td class='n'>3,5</td></tr><tr><td><b>Сутки</b></td><td></td><td class='n'>24</td><td class='n'>8,1</td></tr></table><p>На объекте с редкими событиями камера берёт 8–10 Вт·ч в сутки. Заложенные на слайде 3 Вт, то есть 72 Вт·ч, учитывают частые просмотры видео, небольшой роутер и зимний запас. Часы в таблице — условный пример.</p><p class='ogoh'>На пилоте среднюю мощность не угадывают, а измеряют по графику батареи в телеметрии. Дальнейшие закупки считаются по этому числу.</p>"
  }
 },
 "s-quvvat.panel": {
  "yorliq": "Texnik izoh",
  "sarlavha": "Nega aynan 1,62 va 0,7",
  "tana": "<p><b>1,62</b> — Toshkentda dekabrda gorizontal yuzaga tushadigan kunlik quyosh energiyasi, kVt·soat/m². Uni «to'liq quyosh soati» deb o'qish mumkin: panel kuniga 1,62 soat nominal quvvatda ishlaganga teng. Iyunda bu 7,60.</p><p>55° qiyalikdagi panelga dekabrda gorizontal yuzadan ko'proq energiya tushadi. Bu farq ataylab zaxira sifatida qoldiriladi: bulutli haftalar, qor va chang uchun.</p><h4>0,7 ga nima kiradi</h4><ul><li>Panel harorati va eskirishi.</li><li>Chang va qor qatlami.</li><li>Zaryad kontrolleri va kabel yo'qotishi. PWM kontrollerda yo'qotish MPPT'dan ancha katta.</li><li>Akkumulyatorning zaryad-razryad samaradorligi.</li></ul><p>Iyun uchun xuddi shu formula 7,60 bilan hisoblanadi va panel 4,7 barobar kichik chiqadi. Zavod komplektlari ko'pincha shunday tanlanadi, shuning uchun tenderda panel quvvati alohida tekshiriladi.</p><p class='ogoh'>Panel standart qatordan yuqoriga tanlanadi: 64 Vt chiqsa, 80 Vt olinadi. Shartnomaga MPPT kontroller yoziladi.</p>",
  "manba": [
   [
    "Renogy: panel qiyaligi",
    "https://www.renogy.com/blogs/buyers-guide/how-to-calculate-solar-panel-tilt-angle"
   ]
  ],
  "ru": {
   "yorliq": "Техническая справка",
   "sarlavha": "Почему именно 1,62 и 0,7",
   "tana": "<p><b>1,62</b> — суточная солнечная энергия на горизонтальную поверхность в Ташкенте в декабре, кВт·ч/м². Её можно читать как «пиковые солнечные часы»: панель будто работает 1,62 часа в сутки на номинальной мощности. В июне — 7,60.</p><p>На панель с наклоном 55° в декабре приходит больше энергии, чем на горизонталь. Эта разница сознательно оставлена в запас: на облачные недели, снег и пыль.</p><h4>Что входит в 0,7</h4><ul><li>Нагрев и старение панели.</li><li>Пыль и снег.</li><li>Потери в контроллере заряда и кабеле. У PWM-контроллера они заметно выше, чем у MPPT.</li><li>КПД заряда-разряда аккумулятора.</li></ul><p>Для июня та же формула с 7,60 даёт панель в 4,7 раза меньше. Заводские комплекты часто подобраны именно так, поэтому в тендере мощность панели проверяется отдельно.</p><p class='ogoh'>Панель выбирается из стандартного ряда с округлением вверх: вышло 64 Вт — берём 80 Вт. В договор вписывается MPPT-контроллер.</p>"
  }
 },
 "s-quvvat.akb": {
  "yorliq": "Texnik izoh",
  "sarlavha": "Akkumulyator: kunlar, 0,8 va 12,8 V",
  "tana": "<p><b>Kunlar</b> — quyoshsiz o'tadigan kunlar soni. Dekabrda bir necha kun ketma-ket bulut va tuman bo'lishi odatiy. Loyiha qiymati 5 kun, tog'li va chekka hududda 7 kun.</p><p><b>0,8</b> — razryad chuqurligi. LiFePO4 to'liq razryadga chidaydi, lekin BMS o'chirish chegarasi, sovuqda sig'im kamayishi va eskirish uchun 20% qoldiriladi.</p><p><b>12,8 V</b> — ketma-ket ulangan to'rtta LiFePO4 elementining nominal kuchlanishi. 24 V tizimda 25,6 V, 48 V tizimda 51,2 V olinadi.</p><h4>Misol</h4><pre><code>72 Vt·soat × 5 kun ÷ 0,8 = 450 Vt·soat\n450 ÷ 12,8 V = 35,2 → 36 A·soat\nstandart blok: 40 A·soat</code></pre><p class='ogoh'>Qo'rg'oshin-kislotali akkumulyator bu hisobga to'g'ri kelmaydi: unga faqat 50% razryad beriladi va sovuqda sig'imi keskin tushadi.</p>",
  "manba": [],
  "ru": {
   "yorliq": "Техническая справка",
   "sarlavha": "Аккумулятор: дни, 0,8 и 12,8 В",
   "tana": "<p><b>Дни</b> — сколько дней подряд может не быть солнца. В декабре несколько облачных и туманных дней подряд — обычное дело. В проекте закладываем 5 дней, для горных и отдалённых районов 7.</p><p><b>0,8</b> — глубина разряда. LiFePO4 выдерживает полный разряд, но 20% оставляем на порог отключения BMS, потерю ёмкости на морозе и старение.</p><p><b>12,8 В</b> — номинальное напряжение четырёх последовательных ячеек LiFePO4. Для системы 24 В берут 25,6 В, для 48 В — 51,2 В.</p><h4>Пример</h4><pre><code>72 Вт·ч × 5 дней ÷ 0,8 = 450 Вт·ч\n450 ÷ 12,8 В = 35,2 → 36 А·ч\nстандартный блок: 40 А·ч</code></pre><p class='ogoh'>Свинцово-кислотный аккумулятор в этот расчёт не вписывается: ему допустим разряд лишь на 50%, а на морозе ёмкость резко падает.</p>"
  }
 },
 "s-quvvat.sovuq": {
  "yorliq": "Texnik izoh",
  "sarlavha": "0 °C dan past zaryad akkumulyatorni buzadi",
  "tana": "<p>LiFePO4 elementi 0 °C dan past zaryadlansa, anodda metall litiy qatlami o'tiradi. Sig'im qaytmas darajada tushadi, ichki qisqa tutashuv xavfi paydo bo'ladi. Razryad esa sovuqda ham mumkin: kamera tunda ishlaydi, lekin ertalab panel zaryad bera olmaydi.</p><h4>Shartnomaga yoziladi</h4><ul><li>BMS'da past harorat himoyasi: 0 °C dan past zaryad avtomatik to'xtaydi.</li><li>Yoki isitgichli blok: isitgich paneldan quvvat olib elementni qizdiradi va shundan keyin zaryadni yoqadi.</li><li>Akkumulyator harorati telemetriyada: platforma zaryad to'xtab qolganini ko'rsatadi.</li></ul><h4>Yetkazuvchidan olinadi</h4><ul><li>Datasheet'dagi zaryad harorati oralig'i.</li><li>Himoya qayerda: BMS'da yoki kontrollerda.</li><li>Isitgichning sutkalik energiya sarfi.</li></ul><p class='ogoh'>Hikvision 4G quyosh kamerasida akkumulyator 0…45 °C oralig'ida zaryadlanadi. Dekabr tongida zaryad kechikadi, bu quvvat hisobidagi zaxiraga kiradi.</p>",
  "manba": [],
  "ru": {
   "yorliq": "Техническая справка",
   "sarlavha": "Заряд ниже 0 °C губит аккумулятор",
   "tana": "<p>Если ячейку LiFePO4 заряжать ниже 0 °C, на аноде осаждается металлический литий. Ёмкость падает необратимо, появляется риск внутреннего замыкания. Разряд на морозе при этом возможен: камера ночью работает, а утром панель не может её зарядить.</p><h4>Что вписать в договор</h4><ul><li>Защиту BMS от низкой температуры: заряд ниже 0 °C автоматически прекращается.</li><li>Или блок с подогревом: нагреватель берёт энергию от панели, прогревает ячейки и только потом включает заряд.</li><li>Температуру аккумулятора в телеметрии: платформа покажет, что заряд остановился.</li></ul><h4>Что запросить у поставщика</h4><ul><li>Диапазон температуры заряда по даташиту.</li><li>Где реализована защита: в BMS или в контроллере.</li><li>Суточный расход энергии на подогрев.</li></ul><p class='ogoh'>У солнечной 4G-камеры Hikvision аккумулятор заряжается в диапазоне 0…45 °C. Декабрьским утром заряд начинается позже, это учтено в запасе расчёта.</p>"
  }
 },
 "s-quvvat.p3": {
  "yorliq": "Montajchi uchun",
  "sarlavha": "1-profil: hodisali 4G kamera",
  "tana": "<p>Bitta quyosh-4G kamera, video faqat hodisada va operator ochganda. Binolarning ko'pchiligi uchun asosiy profil.</p><table><tr><th>Ko'rsatkich</th><th>Dekabr</th><th>Iyun</th></tr><tr><td>Kunlik ehtiyoj</td><td class='n'>72 Vt·soat</td><td class='n'>72 Vt·soat</td></tr><tr><td>Quyosh soati</td><td class='n'>1,62</td><td class='n'>7,60</td></tr><tr><td>Kerakli panel</td><td class='n'>64 Vt</td><td class='n'>14 Vt</td></tr></table><p>Iyunga tanlangan 14 Vt panel dekabrda kuniga taxminan 16 Vt·soat beradi, ya'ni ehtiyojning 22%. Akkumulyator bir-ikki haftada tugaydi va kamera bahorgacha jim qoladi.</p><h4>Tender sharti</h4><ul><li>Komplekt paneli va akkumulyator sig'imi raqam bilan yoziladi.</li><li>Zavod paneli kichik bo'lsa, qo'shimcha panel ulash imkoniyati.</li><li>Akkumulyator 5 kunlik avtonomiyaga: 450 Vt·soat dan kam emas.</li></ul><p>Panel va blok narxi farqi kichik: 64 Vt o'rniga 80 Vt panel olish komplekt narxini sezilarli oshirmaydi, lekin qishki uzilishlarni yo'qotadi.</p>",
  "manba": [],
  "ru": {
   "yorliq": "Для монтажника",
   "sarlavha": "Профиль 1: 4G-камера по событиям",
   "tana": "<p>Одна солнечная 4G-камера, видео только по событию и когда его открывает оператор. Основной профиль для большинства зданий.</p><table><tr><th>Показатель</th><th>Декабрь</th><th>Июнь</th></tr><tr><td>Суточная потребность</td><td class='n'>72 Вт·ч</td><td class='n'>72 Вт·ч</td></tr><tr><td>Солнечные часы</td><td class='n'>1,62</td><td class='n'>7,60</td></tr><tr><td>Нужная панель</td><td class='n'>64 Вт</td><td class='n'>14 Вт</td></tr></table><p>Подобранная по июню панель на 14 Вт в декабре даёт около 16 Вт·ч в сутки — 22% потребности. Аккумулятор садится за одну-две недели, и камера молчит до весны.</p><h4>Условие тендера</h4><ul><li>Мощность панели и ёмкость аккумулятора указываются цифрами.</li><li>Если штатная панель мала — возможность подключить дополнительную.</li><li>Аккумулятор на 5 суток автономии: не меньше 450 Вт·ч.</li></ul><p>Разница в цене панели и блока невелика: панель на 80 Вт вместо 64 Вт почти не меняет цену комплекта, но снимает зимние отключения.</p>"
  }
 },
 "s-quvvat.p9": {
  "yorliq": "Montajchi uchun",
  "sarlavha": "2-profil: kamera, router va domofon",
  "tana": "<p>Kirish nazorati bor obyekt: 1–2 kamera, 4G router, video domofon va rele. Router doim yoniq, shuning uchun o'rtacha quvvat 8–10 Vt.</p><table><tr><th>Qurilma</th><th>O'rtacha, Vt</th></tr><tr><td>4G router, doim aloqada</td><td class='n'>3–4</td></tr><tr><td>IP kamera, 1–2 dona</td><td class='n'>3–4</td></tr><tr><td>Video domofon, kutish rejimi</td><td class='n'>1–2</td></tr><tr><td>Rele va qulf, o'rtacha</td><td class='n'>0,2</td></tr></table><p>Natija: 200 Vt panel va 12,8 V 120 A·soat blok. Panel maydoni taxminan 1 m², unga shamolga chidamli ustun va poydevor kerak. Qiymatlar baho, pilotda o'lchanadi.</p><p class='ogoh'>Tejash yo'li: router uyqu rejimida, kamera hodisada uyg'onadi. O'rtacha quvvat 5 Vt atrofiga tushadi, lekin eshikni ochish buyrug'i 10–30 soniya kechikadi. Qaysi biri muhimligini bank hal qiladi.</p>",
  "manba": [],
  "ru": {
   "yorliq": "Для монтажника",
   "sarlavha": "Профиль 2: камера, роутер и домофон",
   "tana": "<p>Объект с контролем доступа: 1–2 камеры, 4G-роутер, видеодомофон и реле. Роутер включён всегда, поэтому средняя мощность 8–10 Вт.</p><table><tr><th>Устройство</th><th>Среднее, Вт</th></tr><tr><td>4G-роутер, постоянно на связи</td><td class='n'>3–4</td></tr><tr><td>IP-камера, 1–2 шт.</td><td class='n'>3–4</td></tr><tr><td>Видеодомофон в режиме ожидания</td><td class='n'>1–2</td></tr><tr><td>Реле и замок, в среднем</td><td class='n'>0,2</td></tr></table><p>Итог: панель 200 Вт и блок 12,8 В на 120 А·ч. Площадь панели около 1 м², нужна ветроустойчивая опора с фундаментом. Цифры — оценка, на пилоте их измеряют.</p><p class='ogoh'>Как сэкономить: роутер в спящем режиме, камера просыпается по событию. Средняя мощность падает примерно до 5 Вт, но команда на открытие двери задерживается на 10–30 секунд. Что важнее, решает банк.</p>"
  }
 },
 "s-quvvat.p50": {
  "yorliq": "Rahbariyat uchun",
  "sarlavha": "3-profil: 50 Vt shkaf elektrga ulanadi",
  "tana": "<p>NVR, 3–4 kamera, router, domofon va datchiklar bitta shkafda. O'rtacha 50 Vt — kuniga 1,2 kVt·soat.</p><table><tr><th>Variant</th><th>Nima kerak</th><th>Natija</th></tr><tr><td>Quyosh</td><td>1,1 kVt panel, 5–6 m², va 7,5 kVt·soat blok</td><td>Qimmat, o'g'irlik xavfi</td></tr><tr><td>Almashtiriladigan blok</td><td>5 kVt·soat blok taxminan 3–4 kunga yetadi</td><td>Haftasiga 2 tashrif</td></tr><tr><td>Elektrga qayta ulash</td><td>Texnik shart 39 600 so'm, 3 ish kuni</td><td>Oyiga taxminan 38 500 so'm</td></tr></table><p>Bunday tugun elektrga ulanadi. Ulash imkoni bo'lmasa, yuklama 10 Vt gacha qisqartiriladi va obyekt 2-profilga o'tadi: NVR o'rniga SD karta, doimiy video o'rniga hodisa.</p><p class='ogoh'>Qayta ulashda shartnoma bank nomiga rasmiylashtiriladi. Tarmoqdagi uzilishlarga qarshi shkafda 1–2 kunlik LiFePO4 bufer qoladi.</p>",
  "manba": [],
  "ru": {
   "yorliq": "Для руководства",
   "sarlavha": "Профиль 3: шкаф на 50 Вт подключаем к сети",
   "tana": "<p>NVR, 3–4 камеры, роутер, домофон и датчики в одном шкафу. В среднем 50 Вт — 1,2 кВт·ч в сутки.</p><table><tr><th>Вариант</th><th>Что нужно</th><th>Итог</th></tr><tr><td>Солнце</td><td>Панели на 1,1 кВт, 5–6 м², и блок на 7,5 кВт·ч</td><td>Дорого, риск кражи</td></tr><tr><td>Сменный блок</td><td>Блока на 5 кВт·ч хватает примерно на 3–4 дня</td><td>Два выезда в неделю</td></tr><tr><td>Повторное подключение к сети</td><td>Техусловия 39 600 сумов, 3 рабочих дня</td><td>Около 38 500 сумов в месяц</td></tr></table><p>Такой узел подключают к сети. Если подключить нельзя, нагрузку урезают до 10 Вт и объект переходит в профиль 2: SD-карта вместо NVR, события вместо непрерывного видео.</p><p class='ogoh'>При подключении договор оформляется на банк. На случай отключений в сети в шкафу остаётся буфер LiFePO4 на 1–2 суток.</p>"
  }
 },
 "s-quvvat.hisob": {
  "yorliq": "Montajchi uchun",
  "sarlavha": "Kalkulyator ko'rikda qanday ishlatiladi",
  "tana": "<p>Kalkulyator slayddagi uchta formulani bajaradi: o'rtacha quvvat va quyoshsiz kunlar kiritiladi, panel va akkumulyator chiqadi.</p><ul><li>Quyosh soati 1,62 va yo'qotish 0,7 o'zgarmaydi: hisob doim dekabrga.</li><li>Razryad chuqurligi 0,8, kuchlanish 12,8 V.</li><li>Natija yuqoriga yaxlitlanadi, keyin standart qatordan tanlanadi: panel 50, 80, 100, 150, 200 Vt; blok 20, 40, 50, 100, 120 A·soat.</li></ul><h4>Ko'rikda</h4><p>Montajchi yuklama ro'yxatini tuzadi, o'rtacha quvvatni kiritadi va natijani ko'rik shakliga yozadi. Panel 250 Vt dan yoki blok 150 A·soat dan oshsa, obyekt shkaf yoki elektrga ulash variantiga o'tadi.</p><p class='ogoh'>Kalkulyator soya va panel yo'nalishini hisobga olmaydi. Soya tushadigan joyda natija haqiqatga to'g'ri kelmaydi.</p>",
  "manba": [],
  "ru": {
   "yorliq": "Для монтажника",
   "sarlavha": "Как пользоваться калькулятором при обследовании",
   "tana": "<p>Калькулятор выполняет три формулы со слайда: вводятся средняя мощность и число дней без солнца, на выходе — панель и аккумулятор.</p><ul><li>Солнечные часы 1,62 и потери 0,7 не меняются: расчёт всегда на декабрь.</li><li>Глубина разряда 0,8, напряжение 12,8 В.</li><li>Результат округляется вверх, затем выбирается из стандартного ряда: панели 50, 80, 100, 150, 200 Вт; блоки 20, 40, 50, 100, 120 А·ч.</li></ul><h4>При обследовании</h4><p>Монтажник составляет список нагрузки, вводит среднюю мощность и записывает результат в форму обследования. Если панель больше 250 Вт или блок больше 150 А·ч, объект переводится на шкаф или подключение к сети.</p><p class='ogoh'>Калькулятор не учитывает тень и ориентацию панели. Там, где есть тень, результат не соответствует реальности.</p>"
  }
 },
 "s-qabul.video": {
  "yorliq": "Montajchi uchun",
  "sarlavha": "1–3 tekshiruv: video va buyruq",
  "tana": "<table><tr><th>No</th><th>Qanday tekshiriladi</th><th>Mezon</th></tr><tr><td>1</td><td>Bank xodimi platformada obyektni ochib, jonli videoni yoqadi</td><td>Kadr 15 soniyada chiqadi, 2 daqiqa uzilmaydi</td></tr><tr><td>2</td><td>Montajchi kadr oldidan o'tadi, vaqt belgilanadi</td><td>Hodisa kadr bilan 10 soniyadan tez keladi</td></tr><tr><td>3</td><td>Operator eshikni ochish buyrug'ini beradi</td><td>Qulf ochiladi, jurnalda operator, vaqt va kadr</td></tr></table><p>Batareyali kamera uyqudan uyg'onishga vaqt sarflaydi, shuning uchun jonli videoga 15 soniya berilgan. Hodisani kamera o'zi uyg'onib yuboradi, u tezroq keladi.</p><p>Har tekshiruv uch marta takrorlanadi. Uchtadan bittasi o'tmasa ham, sabab aniqlanmaguncha qabul to'xtaydi.</p><p>Natija platformadagi qabul shakliga vaqt belgisi bilan yoziladi. Keyinchalik SLA bo'yicha nizo bo'lsa, qabul kunidagi ko'rsatkich solishtirish uchun asos bo'ladi.</p>",
  "manba": [],
  "ru": {
   "yorliq": "Для монтажника",
   "sarlavha": "Проверки 1–3: видео и команда",
   "tana": "<table><tr><th>№</th><th>Как проверяем</th><th>Критерий</th></tr><tr><td>1</td><td>Сотрудник банка открывает объект на платформе и включает живое видео</td><td>Кадр появляется за 15 секунд, 2 минуты без обрыва</td></tr><tr><td>2</td><td>Монтажник проходит перед камерой, время фиксируется</td><td>Событие с кадром приходит быстрее 10 секунд</td></tr><tr><td>3</td><td>Оператор даёт команду открыть дверь</td><td>Замок открывается, в журнале оператор, время и кадр</td></tr></table><p>Батарейной камере нужно время, чтобы проснуться, поэтому на живое видео даётся 15 секунд. Событие камера отправляет сама, проснувшись, — оно приходит быстрее.</p><p>Каждую проверку повторяют трижды. Если не прошла хотя бы одна из трёх, приёмка стоит, пока не найдена причина.</p><p>Результаты записываются в форму приёмки на платформе с отметкой времени. При будущем споре по SLA показатели дня приёмки служат базой для сравнения.</p>"
  }
 },
 "s-qabul.aloqasiz": {
  "yorliq": "Montajchi uchun",
  "sarlavha": "4–6 tekshiruv: aloqa yo'qligida",
  "tana": "<p>Bu test tizimning asosiy va'dasini tekshiradi: internet uzilganda dalil yo'qolmaydi.</p><ol><li>SIM-karta routerdan 30 daqiqaga olinadi. Shu vaqtda montajchi uch marta kadr oldidan o'tadi va eshikni ochadi.</li><li>SIM qaytariladi. 15 daqiqa ichida uchala hodisa platformaga keladi. Vaqti yuborilgan payt emas, hodisa sodir bo'lgan payt bo'yicha.</li><li>Quvvat bir daqiqaga uziladi. Qurilma o'zi yuklanadi, VPN ko'tariladi va qo'l tegmasdan «aloqada» holatiga qaytadi.</li></ol><p>Platforma buferdan kelgan hodisalarni «kechikib keldi» belgisi bilan ko'rsatadi: operator ular jonli emasligini ko'radi.</p><p>Test uchun jami 50–60 daqiqa ajratiladi. Bank xodimi shu vaqtda platformada hodisalar oqimini kuzatadi va natijani qabul shakliga belgilaydi.</p><p class='ogoh'>Hodisa yo'qolsa yoki vaqti yuborilgan paytga almashsa, qurilma sozlamasi yoki adapter qaytariladi. Bu testdan o'tmagan model loyihaga kirmaydi.</p>",
  "manba": [],
  "ru": {
   "yorliq": "Для монтажника",
   "sarlavha": "Проверки 4–6: без связи",
   "tana": "<p>Этот тест проверяет главное обещание системы: при обрыве интернета доказательства не теряются.</p><ol><li>SIM-карту вынимают из роутера на 30 минут. За это время монтажник трижды проходит перед камерой и открывает дверь.</li><li>SIM возвращают. За 15 минут все три события приходят на платформу — со временем самого события, а не отправки.</li><li>Питание снимают на минуту. Устройство само загружается, поднимает VPN и без вмешательства возвращается в статус «на связи».</li></ol><p>События из буфера платформа показывает с пометкой «пришло с задержкой»: оператор видит, что они не живые.</p><p>На тест закладывают 50–60 минут. Сотрудник банка в это время следит за потоком событий на платформе и отмечает результат в форме приёмки.</p><p class='ogoh'>Если событие потерялось или его время подменилось временем отправки, настройка устройства или адаптер отправляется на доработку. Модель, не прошедшая этот тест, в проект не попадает.</p>"
  }
 },
 "s-qabul.telemetriya": {
  "yorliq": "Jamoa rahbarlari uchun",
  "sarlavha": "7–9 tekshiruv: telemetriya",
  "tana": "<p>100 obyektni odam emas, telemetriya kuzatadi. Shuning uchun uning to'liqligi video bilan teng talab.</p><table><tr><th>Maydon</th><th>Mezon</th></tr><tr><td><code>batareya</code></td><td>foiz, kuchlanish va harorat, 15 daqiqada kamida bir marta</td></tr><tr><td><code>signal_dbm</code>, <code>sinr</code></td><td>har aloqa seansida</td></tr><tr><td><code>last_seen</code></td><td>15 daqiqadan eskirsa, platforma «aloqa yo'q» ogohlantirishini beradi</td></tr><tr><td><code>xotira</code></td><td>SD yoki NVR bo'sh joyi, foizda</td></tr></table><p>Tekshiruv usuli: platformadagi qurilma kartochkasi ochiladi, qiymat qurilmaning o'z ilovasidagi qiymat bilan solishtiriladi. Farq 5% dan oshmasin.</p><p>Jamoa rahbari qabuldan oldin adapter jurnalida shu qurilmadan kelgan xabarlarni ko'radi: bo'sh maydon yoki noto'g'ri birlik, masalan foiz o'rniga millivolt, shu bosqichda ushlanadi.</p><p class='ogoh'>Ba'zi batareyali kameralar telemetriyani faqat o'z bulutiga yuboradi. Bunday modelda adapter qiymatni so'rov bilan oladi. Buning iloji bo'lmasa, model qabul qilinmaydi.</p>",
  "manba": [],
  "ru": {
   "yorliq": "Для тимлида",
   "sarlavha": "Проверки 7–9: телеметрия",
   "tana": "<p>За 100 объектами следит не человек, а телеметрия. Поэтому её полнота — такое же требование, как видео.</p><table><tr><th>Поле</th><th>Критерий</th></tr><tr><td><code>batareya</code></td><td>процент, напряжение и температура, не реже раза в 15 минут</td></tr><tr><td><code>signal_dbm</code>, <code>sinr</code></td><td>в каждом сеансе связи</td></tr><tr><td><code>last_seen</code></td><td>старше 15 минут — платформа выдаёт тревогу «нет связи»</td></tr><tr><td><code>xotira</code></td><td>свободное место на SD или NVR, в процентах</td></tr></table><p>Способ проверки: открывают карточку устройства на платформе и сверяют значение с тем, что показывает родное приложение устройства. Расхождение — не больше 5%.</p><p>Перед приёмкой тимлид смотрит в журнале адаптера сообщения от этого устройства: пустые поля или не те единицы, например милливольты вместо процентов, ловятся на этом этапе.</p><p class='ogoh'>Некоторые батарейные камеры шлют телеметрию только в своё облако. Для таких моделей адаптер забирает значения запросом. Если это невозможно, модель не принимается.</p>"
  }
 },
 "s-qabul.hujjat": {
  "yorliq": "Moliya va huquq",
  "sarlavha": "10–12 tekshiruv va dalolatnoma",
  "tana": "<ul><li><b>10. Parol va proshivka.</b> Zavod paroli bilan kirishga urinish rad etilishi kerak. Proshivka versiyasi reyestrdagi bilan mos. VPN'dan tashqarida skaner ochiq port topmaydi.</li><li><b>11. QR yorliq.</b> Bank xodimi telefonda skanerlaydi, platforma to'g'ri qurilma va obyektni ochadi.</li><li><b>12. Paket.</b> Oldin va keyin fotolar, sxema, o'lchovlar va belgi fotosi platformada.</li></ul><h4>Dalolatnoma</h4><p>Akt platformada shakllanadi va ikki tomon imzolaydi: integrator montajchisi va bankning aktivlar bo'limi xodimi. Kafolat va SLA muddati shu kundan boshlanadi, to'lov ham shu aktga bog'lanadi.</p><p>Imzolangan akt bilan obyekt kartochkasida himoya holati «nazoratda» ga o'tadi va bu hisobotlarda ko'rinadi.</p><p class='ogoh'>Bitta tekshiruv o'tmasa, akt imzolanmaydi. Integrator kamchilikni 5 ish kunida tuzatadi, test faqat o'tmagan bandlar bo'yicha qaytariladi.</p>",
  "manba": [],
  "ru": {
   "yorliq": "Финансы и право",
   "sarlavha": "Проверки 10–12 и акт",
   "tana": "<ul><li><b>10. Пароль и прошивка.</b> Попытка входа с заводским паролем должна отклоняться. Версия прошивки совпадает с реестром. Сканер вне VPN не находит открытых портов.</li><li><b>11. QR-этикетка.</b> Сотрудник банка сканирует её телефоном, платформа открывает нужное устройство и объект.</li><li><b>12. Пакет.</b> Фото до и после, схема, замеры и фото таблички загружены на платформу.</li></ul><h4>Акт</h4><p>Акт формируется на платформе и подписывается двумя сторонами: монтажником интегратора и сотрудником отдела активов банка. С этой даты идут гарантия и SLA, к этому же акту привязана оплата.</p><p>С подписанным актом статус защиты в карточке объекта меняется на «под контролем», и это видно в отчётах.</p><p class='ogoh'>Если не пройдена хотя бы одна проверка, акт не подписывается. Интегратор устраняет замечания за 5 рабочих дней, повторно проверяются только непройденные пункты.</p>"
  }
 },
 "s-qabul.kritik": {
  "yorliq": "Moliya va huquq",
  "sarlavha": "Kritik nosozlik: 4, 24 va 48 soat",
  "tana": "<p>Kritik nosozlik — obyekt platformada ko'rinmaydi: last_seen 1 soatdan eski, video yo'q yoki quvvat tugagan. Bunday obyekt amalda nazoratsiz. Obyektdagi yagona kamera yoki kirish nazorati ishlamasa ham kritik hisoblanadi.</p><h4>Hudud toifasi</h4><table><tr><th>Toifa</th><th>Ta'rif</th><th>Kelish</th></tr><tr><td>Shahar</td><td>Toshkent va viloyat markazlari</td><td class='n'>4 soat</td></tr><tr><td>Tuman</td><td>Viloyat markazidan 150 km gacha</td><td class='n'>24 soat</td></tr><tr><td>Chekka</td><td>150 km dan uzoq yoki tog'li hudud</td><td class='n'>48 soat</td></tr></table><p>Muddat platformadagi avtomatik ogohlantirishdan hisoblanadi, bankning qo'ng'irog'idan emas. Kelgandan keyin 4 soat ichida obyekt ishlashi yoki qurilma zaxiradan almashtirilishi kerak.</p><p class='ogoh'>Har obyektning toifasi shartnoma ilovasida ro'yxat bilan beriladi. Toifa bo'yicha nizo keyin emas, imzolashda hal qilinadi.</p>",
  "manba": [],
  "ru": {
   "yorliq": "Финансы и право",
   "sarlavha": "Критический отказ: 4, 24 и 48 часов",
   "tana": "<p>Критический отказ — объект не виден на платформе: last_seen старше часа, нет видео или сел аккумулятор. Фактически объект без контроля. Критическим считается и отказ единственной камеры или контроля доступа на объекте.</p><h4>Категории территорий</h4><table><tr><th>Категория</th><th>Определение</th><th>Прибытие</th></tr><tr><td>Город</td><td>Ташкент и областные центры</td><td class='n'>4 ч</td></tr><tr><td>Район</td><td>До 150 км от областного центра</td><td class='n'>24 ч</td></tr><tr><td>Отдалённый</td><td>Дальше 150 км или горная местность</td><td class='n'>48 ч</td></tr></table><p>Срок отсчитывается от автоматической тревоги на платформе, а не от звонка банка. После прибытия за 4 часа объект должен заработать, или устройство меняется из резерва.</p><p class='ogoh'>Категория каждого объекта фиксируется списком в приложении к договору. Спор о категории решается при подписании, а не потом.</p>"
  }
 },
 "s-qabul.oddiy": {
  "yorliq": "Moliya va huquq",
  "sarlavha": "Oddiy nosozlik: 2, 3 va 5 ish kuni",
  "tana": "<p>Obyekt ko'rinib turadi, lekin bitta qurilma ishlamaydi yoki sifat tushgan: kamera loyqa, bitta datchik jim, signal pasaygan.</p><ul><li>Masofadan birinchi yordam 4 soat ichida: qayta yuklash, sozlama, proshivka.</li><li>Yordam bermasa, tashrif keyingi rejali marshrutga qo'shiladi. Shuning uchun muddat ish kunida o'lchanadi.</li><li>Bir obyektda 30 kun ichida ikkinchi marta bir xil nosozlik takroriy hisoblanadi va KPI'ga tushadi.</li></ul><p>Muddatlar alohida tashrifni emas, marshrutni hisobga oladi: bitta mashina bir kunda 4–6 obyektni aylanadi va servis narxi shu bilan pasayadi.</p><p>Har ariza platformadagi «Servis topshirig'i» orqali ochiladi va yopiladi. Yopishda montajchi sabab, bajarilgan ish va almashtirilgan qism seriya raqamini yozadi.</p>",
  "manba": [],
  "ru": {
   "yorliq": "Финансы и право",
   "sarlavha": "Обычный отказ: 2, 3 и 5 рабочих дней",
   "tana": "<p>Объект виден, но одно устройство не работает или упало качество: камера мутная, датчик молчит, ослаб сигнал.</p><ul><li>Удалённая помощь — в течение 4 часов: перезагрузка, настройка, прошивка.</li><li>Если не помогло, выезд включается в ближайший плановый маршрут. Поэтому срок считается в рабочих днях.</li><li>Повтор той же неисправности на объекте в течение 30 дней считается повторным отказом и попадает в KPI.</li></ul><p>Сроки рассчитаны под маршрут, а не под отдельный выезд: одна машина за день объезжает 4–6 объектов, и сервис дешевеет.</p><p>Каждая заявка открывается и закрывается через «Сервисное задание» на платформе. При закрытии монтажник указывает причину, выполненную работу и серийный номер заменённой детали.</p>"
  }
 },
 "s-qabul.akb": {
  "yorliq": "Montajchi uchun",
  "sarlavha": "Batareya 20% da: nima qilinadi",
  "tana": "<p>Ogohlantirish 20% da beriladi. 1-profilda bu taxminan bir kunlik zaxira, shuning uchun muddat kritik nosozlikka yaqin.</p><h4>Harakat</h4><ul><li>Quyosh komplektida: panel tozalanadi, soya va burchak tekshiriladi. Sabab topilmasa, panel kattalashtiriladi.</li><li>Almashtiriladigan blokli shkafda: zaryadlangan blok olib kelinadi, bo'shi olib ketiladi.</li><li>Batareyali kamerada: akkumulyator yoki kamera zaxiradan almashtiriladi.</li></ul><h4>Rejali almashtirish</h4><table><tr><th>Turi</th><th>Taxminiy xizmat muddati</th></tr><tr><td>LiFePO4 blok</td><td>2 000+ sikl yoki sig'im 80% ga tushguncha</td></tr><tr><td>Kamera ichki akkumulyatori</td><td>2–3 yil, bozor bahosi</td></tr></table><p>Almashtirilgan har blok seriya raqami bilan reyestrga yoziladi. Shunday qilib blokning qaysi obyektlarda qancha ishlagani ko'rinadi.</p><p class='ogoh'>Qishda 20% ogohlantirishlari bir hafta ichida keskin ko'payadi. Integrator zaxira bloklarni noyabrgacha viloyatlarga olib borib qo'yadi.</p>",
  "manba": [],
  "ru": {
   "yorliq": "Для монтажника",
   "sarlavha": "Батарея на 20%: что делать",
   "tana": "<p>Тревога приходит на 20%. В профиле 1 это примерно сутки запаса, поэтому срок близок к критическому отказу.</p><h4>Действия</h4><ul><li>Солнечный комплект: чистят панель, проверяют тень и угол. Если причина не найдена, панель увеличивают.</li><li>Шкаф со сменными блоками: привозят заряженный блок, разряженный забирают.</li><li>Батарейная камера: меняют аккумулятор или камеру из резерва.</li></ul><h4>Плановая замена</h4><table><tr><th>Тип</th><th>Ориентировочный срок службы</th></tr><tr><td>Блок LiFePO4</td><td>2 000+ циклов или до падения ёмкости до 80%</td></tr><tr><td>Встроенный аккумулятор камеры</td><td>2–3 года, рыночная оценка</td></tr></table><p>Каждый заменённый блок записывается в реестр с серийным номером. Так видно, на каких объектах и сколько он проработал.</p><p class='ogoh'>Зимой число тревог «заряд 20%» за неделю резко растёт. Интегратор до ноября развозит резервные блоки по областям.</p>"
  }
 },
 "s-qabul.profilaktika": {
  "yorliq": "Montajchi uchun",
  "sarlavha": "Chorakda bir tashrif: tartib",
  "tana": "<ul><li>Panel va kamera oynasi tozalanadi.</li><li>Mahkamlagich, ulagich va germetiklik tekshiriladi, zang tozalanadi.</li><li>Akkumulyator sig'imi BMS ma'lumoti bo'yicha baholanadi.</li><li>Proshivka va parollar siyosati tekshiriladi.</li><li>RSRP va SINR qayta o'lchanadi: operator tarmog'i o'zgargan bo'lishi mumkin.</li><li>Obyektning o'zi suratga olinadi: eshik, deraza, tom holati.</li></ul><p>Oxirgi band bankka qo'shimcha foyda beradi: profilaktika aktivlar bo'limining davriy ko'rigi bilan birlashtiriladi, alohida yo'l xarajati kerak bo'lmaydi.</p><h4>Noyabr tashrifi majburiy</h4><p>Panel qishki burchakka keltiriladi, isitgich va past harorat himoyasi tekshiriladi.</p><div class='raqamlar'><div><b>4</b><span>tashrif yiliga</span></div><div><b>30–60</b><span>daqiqa bir obyektda, baho</span></div></div><p>Tashrif natijasi platformada foto bilan yopiladi. Foto bo'lmasa, tashrif bajarilmagan hisoblanadi va SLA'ga tushadi.</p>",
  "manba": [],
  "ru": {
   "yorliq": "Для монтажника",
   "sarlavha": "Раз в квартал: порядок визита",
   "tana": "<ul><li>Чистка панели и стекла камеры.</li><li>Проверка крепежа, разъёмов и герметичности, удаление ржавчины.</li><li>Оценка ёмкости аккумулятора по данным BMS.</li><li>Проверка прошивки и парольной политики.</li><li>Повторный замер RSRP и SINR: сеть оператора могла измениться.</li><li>Фотофиксация самого объекта: двери, окна, крыша.</li></ul><p>Последний пункт — дополнительная польза для банка: профилактика совмещается с плановым осмотром отдела активов, отдельные дорожные расходы не нужны.</p><h4>Ноябрьский визит обязателен</h4><p>Панель переводят на зимний угол, проверяют подогрев и защиту от низкой температуры.</p><div class='raqamlar'><div><b>4</b><span>визита в год</span></div><div><b>30–60</b><span>минут на объект, оценка</span></div></div><p>Визит закрывается на платформе с фото. Без фото визит считается невыполненным и попадает в SLA.</p>"
  }
 },
 "s-qabul.kpi": {
  "yorliq": "Rahbariyat uchun",
  "sarlavha": "KPI va jarima: integrator nima uchun javob beradi",
  "tana": "<p>Integrator ishi oylik baholanadi va to'lov shu baholarga bog'lanadi.</p><table><tr><th>Ko'rsatkich</th><th>Maqsad</th><th>O'lchov</th></tr><tr><td>Aloqadagi vaqt</td><td class='n'>≥ 98%</td><td>last_seen bo'yicha, har obyekt alohida</td></tr><tr><td>SLA bajarilishi</td><td class='n'>≥ 95%</td><td>muddatida yopilgan arizalar ulushi</td></tr><tr><td>Takroriy nosozlik</td><td class='n'>≤ 5%</td><td>30 kun ichida bir xil nosozlik</td></tr><tr><td>Zaxira fondi</td><td class='n'>5%</td><td>qurilmalar soniga nisbatan, viloyatlarda</td></tr></table><p>98% — oyiga 14,6 soatdan ko'p uzilmaslik. Chekkadagi bitta kritik nosozlik 48 soatda yopilsa ham, bu chegara buziladi. Shuning uchun chekka obyektlarga zaxira qurilma oldindan qo'yiladi.</p><h4>Jarima</h4><p>SLA buzilgan har kun uchun shu obyekt oylik servis to'lovining 1%. Jami jarima oylik to'lovning 10% idan oshmaydi.</p><p class='ogoh'>Raqamlar taklif. Yakuniy qiymat pilot natijasi va tender bo'yicha kelishiladi.</p>",
  "manba": [],
  "ru": {
   "yorliq": "Для руководства",
   "sarlavha": "KPI и штрафы: за что отвечает интегратор",
   "tana": "<p>Работа интегратора оценивается ежемесячно, и оплата привязана к этим оценкам.</p><table><tr><th>Показатель</th><th>Цель</th><th>Как измеряется</th></tr><tr><td>Время на связи</td><td class='n'>≥ 98%</td><td>по last_seen, по каждому объекту отдельно</td></tr><tr><td>Выполнение SLA</td><td class='n'>≥ 95%</td><td>доля заявок, закрытых в срок</td></tr><tr><td>Повторные отказы</td><td class='n'>≤ 5%</td><td>та же неисправность в течение 30 дней</td></tr><tr><td>Резервный фонд</td><td class='n'>5%</td><td>от числа устройств, по областям</td></tr></table><p>98% — это не больше 14,6 часа простоя в месяц. Один критический отказ на отдалённом объекте с выездом за 48 часов эту планку уже нарушает, поэтому на такие объекты резервное устройство завозят заранее.</p><h4>Штраф</h4><p>За каждый день нарушения SLA — 1% месячной сервисной платы по этому объекту. В сумме штраф не превышает 10% месячной платы.</p><p class='ogoh'>Цифры — предложение. Окончательные значения согласуются по итогам пилота и тендера.</p>"
  }
 },
 "s-shart.shart1": {
  "yorliq": "Montajchi uchun",
  "sarlavha": "Quvvat: ko'rikda nima aniqlanadi",
  "tana": "<p>Quvvat manbasini brend emas, yuklama, quyosh va servis imkoni tanlaydi.</p><ol><li>Yuklama, ya'ni qurilmalarning o'rtacha quvvati. 5 Vt gacha — batareyali kamera yoki kichik quyosh komplekti. 5–15 Vt — quyosh ustuni. 15 Vt dan ko'p — shkaf yoki elektrga ulash.</li><li>Quyosh: janub tomoni ochiqmi, dekabrda soya tushmaydimi.</li><li>Servis: obyektga qancha tez-tez borish mumkin.</li></ol><table><tr><th>Manba</th><th>Odatiy qurilma</th><th>Tuzoq</th></tr><tr><td>Batareya</td><td>Reolink, Ajax datchiklari</td><td>Qattiq sovuqqa chidamaydi</td></tr><tr><td>Quyosh-4G</td><td>Hikvision, Dahua komplekti</td><td>Panel yozga hisoblangan</td></tr><tr><td>LiFePO4 shkaf</td><td>12, 24, 48 V bloklar va BMS</td><td>0 °C dan past zaryad</td></tr><tr><td>Ko'chma stansiya</td><td>1–4 kVt·soat</td><td>Almashtirish jadvali buzilsa, o'chadi</td></tr><tr><td>Yoqilg'i elementi</td><td>EFOY, metanol</td><td>Kartrij logistikasi</td></tr></table><p>Qaror ko'rik shaklida yoziladi va keyingi slaydlardagi quvvat hisobi bilan tekshiriladi.</p>",
  "manba": [],
  "ru": {
   "yorliq": "Для монтажника",
   "sarlavha": "Питание: что выясняется при обследовании",
   "tana": "<p>Источник питания выбирает не бренд, а нагрузка, солнце и возможность обслуживания.</p><ol><li>Нагрузка, то есть средняя мощность устройств. До 5 Вт — батарейная камера или малый солнечный комплект. 5–15 Вт — солнечная опора. Больше 15 Вт — шкаф или подключение к сети.</li><li>Солнце: открыт ли юг, нет ли тени в декабре.</li><li>Сервис: как часто можно приезжать на объект.</li></ol><table><tr><th>Источник</th><th>Типичное устройство</th><th>Ловушка</th></tr><tr><td>Батарея</td><td>Reolink, датчики Ajax</td><td>Не держит сильный мороз</td></tr><tr><td>Солнце и 4G</td><td>Комплект Hikvision, Dahua</td><td>Панель рассчитана на лето</td></tr><tr><td>Шкаф LiFePO4</td><td>Блоки 12, 24, 48 В и BMS</td><td>Заряд ниже 0 °C</td></tr><tr><td>Портативная станция</td><td>1–4 кВт·ч</td><td>Сбой графика замены — отключение</td></tr><tr><td>Топливный элемент</td><td>EFOY, метанол</td><td>Логистика картриджей</td></tr></table><p>Решение фиксируется в форме обследования и проверяется расчётом питания на следующих слайдах.</p>"
  }
 },
 "s-shart.shart2": {
  "yorliq": "Montajchi uchun",
  "sarlavha": "Kamera: nimaga qarab tanlanadi",
  "tana": "<ul><li>ONVIF Profile S yoki ochiq API bo'lishi shart. Busiz MKB adapterini yozib bo'lmaydi va qurilma faqat o'z ilovasida qoladi.</li><li>Joyida yozuv: SD karta 128–256 GB, aylanma yozuv.</li><li>Tungi ko'rish: IK yoritgich 20–30 m, lekin eng ko'p quvvatni u oladi.</li><li>Harorat −20 °C dan yomon emas. Akkumulyatorning zaryad oralig'i alohida tekshiriladi.</li><li>Korpus IP66, vandal xavfi bor joyda IK10.</li><li>Videotahlil odam va transportni ajratadi: yolg'on hodisa kamayadi, batareya tejaladi.</li></ul><h4>Ko'p uchraydigan xato</h4><p>Harakat sezgirligi yuqori qo'yiladi: shamolda daraxt, mushuk, tungi hasharot hodisa beradi. Yuzlab yolg'on hodisa operatorni charchatadi va batareyani bir haftada tugatadi. Zonalar va odam filtri montaj kuni sozlanadi va qabul testida tekshiriladi.</p>",
  "manba": [],
  "ru": {
   "yorliq": "Для монтажника",
   "sarlavha": "Камера: по каким признакам выбирать",
   "tana": "<ul><li>Обязательно ONVIF Profile S или открытый API. Иначе адаптер MKB не написать, и устройство останется только в своём приложении.</li><li>Локальная запись: SD-карта на 128–256 ГБ, циклическая запись.</li><li>Ночное видение: ИК-подсветка на 20–30 м, но больше всего энергии уходит именно на неё.</li><li>Температура не хуже −20 °C. Диапазон заряда аккумулятора проверяют отдельно.</li><li>Корпус IP66, там, где есть риск вандализма, — IK10.</li><li>Видеоаналитика отличает людей от транспорта: ложных событий меньше, батарея живёт дольше.</li></ul><h4>Частая ошибка</h4><p>Чувствительность детектора движения ставят высокой: срабатывают дерево на ветру, кошка, ночные насекомые. Сотни ложных событий утомляют оператора и сажают батарею за неделю. Зоны и фильтр людей настраивают в день монтажа и проверяют на приёмке.</p>"
  }
 },
 "s-shart.shart3": {
  "yorliq": "Montajchi uchun",
  "sarlavha": "Kirish: domofon, kontroller va qulf",
  "tana": "<p>Video domofon faqat ko'rsatadi va gapiradi. Eshikni ochish uchun zanjir kerak: platforma → kontroller yoki rele → elektr qulf.</p><ul><li>Rele quruq kontakt bilan qulf zanjirini yopadi. Ochiq turish vaqti 3–5 soniyaga sozlanadi.</li><li>Kontroller hodisani o'zi saqlaydi: aloqa bo'lmasa ham kim, qachon kirgani yo'qolmaydi.</li><li>Qulf tok yo'qolganda yopiq qoladigan turdan: elektrsiz obyektda boshqa yo'l yo'q.</li><li>Eshik holati datchigi qo'yiladi: eshik ochiq qolsa, platforma ogohlantiradi.</li></ul><h4>Tuzoq</h4><p>Domofon ishlab chiqaruvchisining bulutli ilovasi orqali ochish. Bunday buyruq MKB jurnaliga tushmaydi va bank nazoratidan chiqadi. Ochish faqat MKB buyruq xizmati orqali, ilovadagi funksiya montajda o'chiriladi.</p><p>Ko'rikda eshik turi, qulf joyi va kabel yo'li yoziladi. Qulf va kontroller quvvati quvvat hisobiga qo'shiladi.</p>",
  "manba": [],
  "ru": {
   "yorliq": "Для монтажника",
   "sarlavha": "Доступ: домофон, контроллер и замок",
   "tana": "<p>Видеодомофон только показывает и даёт говорить. Чтобы открыть дверь, нужна цепочка: платформа → контроллер или реле → электрозамок.</p><ul><li>Реле сухим контактом замыкает цепь замка. Время удержания открытым настраивается на 3–5 секунд.</li><li>Контроллер сам хранит события: даже без связи не теряется, кто и когда вошёл.</li><li>Замок — из тех, что без питания остаются закрытыми: на объекте без электричества иначе нельзя.</li><li>Ставится датчик положения двери: если дверь осталась открытой, платформа выдаёт тревогу.</li></ul><h4>Ловушка</h4><p>Открытие через облачное приложение производителя домофона. Такая команда не попадает в журнал MKB и уходит из-под контроля банка. Открывать можно только через командный сервис MKB, функцию в приложении отключают при монтаже.</p><p>При обследовании фиксируют тип двери, место замка и трассу кабеля. Питание замка и контроллера добавляется в расчёт.</p>"
  }
 },
 "s-shart.shart4": {
  "yorliq": "Montajchi uchun",
  "sarlavha": "Aloqa: SIM, APN va zaxira kanal",
  "tana": "<ul><li>SIM korporativ, bank nomiga, trafik paketi va qurilma IMEI'siga bog'lanish bilan. Operator bilan yopiq APN kelishiladi.</li><li>Faqat hodisada bitta kamera oyiga taxminan 0,8 GB sarflaydi, operator kuniga 30 daqiqa jonli video ochsa 4,3 GB (23-slayddagi hisob). Paket pilotdagi haqiqiy trafik bo'yicha tanlanadi.</li><li>Ikki SIM'li routerga ikki xil operator qo'yiladi: bitta operator avariyasi obyektni ko'r qilmaydi.</li><li>Nuqtadan-nuqtaga Wi-Fi ko'prik qo'shni bino yoki klaster shkafi bilan bir necha kilometrgacha ishlaydi, lekin to'g'ri ko'rinish shart.</li><li>Qamrov yo'q joyda — LoRaWAN yoki sun'iy yo'ldosh.</li></ul><p>Operator tanlovi ko'rikdagi RSRP va SINR o'lchovidan kelib chiqadi, shartnoma esa bank va operator o'rtasida markazdan tuziladi.</p><p class='ogoh'>SIM PIN kodi o'chirilmaydi: o'g'irlangan SIM boshqa qurilmada ishlamasin. PIN'ni router o'zi kiritadi.</p>",
  "manba": [],
  "ru": {
   "yorliq": "Для монтажника",
   "sarlavha": "Связь: SIM, APN и резервный канал",
   "tana": "<ul><li>SIM корпоративная, на банк, с пакетом трафика и привязкой к IMEI устройства. С оператором согласуется закрытый APN.</li><li>Только на событиях камера расходует около 0,8 ГБ в месяц, а если оператор открывает живое видео на 30 минут в день — 4,3 ГБ (расчёт на слайде 23). Пакет подбирается по фактическому трафику пилота.</li><li>В роутер с двумя SIM ставят двух разных операторов: авария одного не ослепит объект.</li><li>Wi-Fi мост точка-точка до соседнего здания или кластерного шкафа работает на несколько километров, но нужна прямая видимость.</li><li>Там, где нет покрытия, — LoRaWAN или спутник.</li></ul><p>Оператор выбирается по замерам RSRP и SINR при обследовании, а договор заключается централизованно между банком и оператором.</p><p class='ogoh'>PIN-код SIM не отключают: украденная SIM не должна работать в чужом устройстве. PIN вводит сам роутер.</p>"
  }
 },
 "s-shart.shart5": {
  "yorliq": "Montajchi uchun",
  "sarlavha": "Aloqasiz ish: nima joyida saqlanadi",
  "tana": "<table><tr><th>Qurilma</th><th>Nima saqlaydi</th><th>Qancha</th></tr><tr><td>Kamera SD kartasi</td><td>Hodisa klipi, ayrim modelda uzluksiz</td><td>Kunlar yoki haftalar</td></tr><tr><td>NVR</td><td>Barcha kamera, uzluksiz</td><td>Disk hajmiga qarab, odatda haftalar</td></tr><tr><td>Home Hub</td><td>Batareyali kamera klipi</td><td>Ichki xotira yoki disk</td></tr><tr><td>Kirish kontrolleri</td><td>Kirish jurnali</td><td>Minglab yozuv</td></tr></table><p>Aloqa tiklanganda hamma narsa birdan yuborilmaydi: avval hodisa metama'lumoti, keyin kadr, klip esa operator so'raganda yoki tunda. Aks holda 4G kanal bir necha soat band bo'ladi.</p><p>Qabul testida SIM-karta 30 daqiqaga chiqarib olinadi: hodisa yo'qolmasligi va to'g'ri vaqt bilan kelishi kerak.</p><p class='ogoh'>SD karta — eng ko'p buziladigan qism. Montajda uzluksiz yozish uchun mo'ljallangan sanoat sinfidagi karta qo'yiladi, holati telemetriyada kuzatiladi.</p>",
  "manba": [],
  "ru": {
   "yorliq": "Для монтажника",
   "sarlavha": "Работа без связи: что хранится на месте",
   "tana": "<table><tr><th>Устройство</th><th>Что хранит</th><th>Сколько</th></tr><tr><td>SD-карта камеры</td><td>Клипы событий, у части моделей непрерывно</td><td>Дни или недели</td></tr><tr><td>NVR</td><td>Все камеры, непрерывно</td><td>Зависит от диска, обычно недели</td></tr><tr><td>Home Hub</td><td>Клипы батарейных камер</td><td>Внутренняя память или диск</td></tr><tr><td>Контроллер доступа</td><td>Журнал проходов</td><td>Тысячи записей</td></tr></table><p>После восстановления связи всё не отправляется разом: сначала метаданные событий, затем кадры, а клипы — по запросу оператора или ночью. Иначе 4G-канал будет занят несколько часов.</p><p>На приёмке SIM вынимают на 30 минут: события не должны потеряться и должны прийти с верным временем.</p><p class='ogoh'>SD-карта ломается чаще всего. При монтаже ставят промышленную карту, рассчитанную на непрерывную запись, и следят за её состоянием в телеметрии.</p>"
  }
 },
 "s-shart.shart6": {
  "yorliq": "Jamoa rahbarlari uchun",
  "sarlavha": "Integratsiya: xariddan oldin stend testi",
  "tana": "<p>Model xarid qilinishidan oldin jamoa rahbari uni stendda sinaydi. Tekshiruvga bir kun ketadi, lekin u keyingi oylarda chiqadigan muammolarni oldindan ko'rsatadi.</p><ul><li>RTSP oqimi olinadi va media shlyuz orqali brauzerda ochiladi.</li><li>Hodisa ONVIF event, ISAPI yoki webhook orqali keladi va MKB sxemasiga o'giriladi.</li><li>Buyruq: rele, PTZ yoki sirena API orqali bajariladi.</li><li>Telemetriya: batareya, signal va xotira qurilmaning o'zidan olinadi, bulutdan emas.</li><li>Router SNMP yoki API bilan, BMS Modbus bilan o'qiladi.</li></ul><p>Jamoa rahbari natijani qisqa protokol qilib platformaning integratsiyalar bo'limiga yozadi. Tenderda shu protokol talab bo'lib ishlatiladi.</p><p class='ogoh'>Faqat ishlab chiqaruvchi bulutida ishlaydigan qurilma rad etiladi: bulut API'si ogohlantirishsiz o'zgarishi va ma'lumot chet elga chiqishi mumkin.</p>",
  "manba": [],
  "ru": {
   "yorliq": "Для тимлида",
   "sarlavha": "Интеграция: стендовый тест до закупки",
   "tana": "<p>До закупки модели тимлид проверяет её на стенде. Проверка занимает день и заранее показывает проблемы, которые иначе всплыли бы через несколько месяцев.</p><ul><li>RTSP-поток открывается в браузере через медиашлюз.</li><li>Событие приходит через ONVIF event, ISAPI или webhook и преобразуется в схему MKB.</li><li>Команда: реле, PTZ или сирена выполняются через API.</li><li>Телеметрия: батарея, сигнал и память берутся с самого устройства, а не из облака.</li><li>Роутер читается по SNMP или API, BMS — по Modbus.</li></ul><p>Тимлид оформляет результат коротким протоколом в разделе интеграций на платформе. В тендере этот протокол становится требованием.</p><p class='ogoh'>Устройство, работающее только через облако производителя, отклоняется: облачный API может измениться без предупреждения, а данные — уйти за рубеж.</p>"
  }
 }
});

/* ---- rahbariyat ---- */
/* Rahbariyat guruhi: batafsil oyna matnlari.
   s-iqtisod (yangi slayd) va mavjud s-muqova, s-muammo, s-tarkib, s-xatar, s-pilot nuqtalari. */
Object.assign(window.MKB_BATAFSIL = window.MKB_BATAFSIL || {}, {
  /* ======================= 31 · s-iqtisod ======================= */
  "s-iqtisod.xodim": {
    yorliq: "Moliya va huquq",
    sarlavha: "O'z qorovuli: bitta post yiliga 145 mln so'm",
    tana: "<p>Qonun bankka o'z mulkini o'z xodimlari bilan qo'riqlashni taqiqlamaydi. O'RQ-778 ning 12-moddasi tashkilotga <b>idoraviy qorovullik bo'linmasi</b> tuzishga ruxsat beradi. Tartibi bankning ichki hujjatida belgilanadi.</p><h4>Hisob qanday chiqdi</h4><table><tr><th>Qator</th><th>Qiymat</th></tr><tr><td>Sutkalik post, 12 soatlik smena</td><td class='n'>4 xodim</td></tr><tr><td>Hisoblangan ish haqi, bir xodim</td><td class='n'>2,7 mln</td></tr><tr><td>Ijtimoiy soliq 12%, to'rt xodimga</td><td class='n'>1,3 mln</td></tr><tr><td>Oyiga, bitta post</td><td class='n'>12,1 mln</td></tr><tr><td>Yiliga, bitta post</td><td class='n'>145 mln</td></tr></table><p>Ish haqi Toshkentdagi qo'riqchi vakansiyalaridan olingan: oyiga 2,4–3,0 mln so'm (2026-yil sentabr). Eng kam ish haqi 1-sentabrdan 1 360 000 so'm. Daromad solig'i 12% shu summadan ushlanadi, ijtimoiy soliq 12% ustiga qo'shiladi.</p><h4>Hisobga kirmagan</h4><ul><li>Kiyim, aloqa, xodimni obyektga olib borish.</li><li>Ta'til va kasallik kunlari uchun zaxira xodim.</li><li>Kadrlar va buxgalteriya ishi, 267 ta alohida mehnat shartnomasi.</li></ul><p class='ogoh'>Elektrsiz obyektda qorovul qorong'ida va isitishsiz o'tiradi. Xodim bunday postda uzoq turmaydi, tunda esa uning o'zi xavf ostida qoladi.</p>",
    manba: [["lex.uz: O'RQ-778", "https://lex.uz/uz/docs/-6066682"], ["goldenpages.uz", "https://www.goldenpages.uz/en/zarplata/"], ["bizreg.uz", "https://www.bizreg.uz/en/blog/socialnyy-nalog-uzbekistan"]],
    ru: {
      yorliq: "Финансы и право",
      sarlavha: "Собственный сторож: один пост — 145 млн сумов в год",
      tana: "<p>Закон не запрещает банку охранять своё имущество собственными работниками. Статья 12 ЗРУ-778 разрешает организации создать <b>ведомственное сторожевое подразделение</b>. Порядок его работы определяется внутренним документом банка.</p><h4>Как получена сумма</h4><table><tr><th>Строка</th><th>Значение</th></tr><tr><td>Круглосуточный пост, смены по 12 часов</td><td class='n'>4 работника</td></tr><tr><td>Начисленная зарплата одного работника</td><td class='n'>2,7 млн</td></tr><tr><td>Социальный налог 12%, на четырёх работников</td><td class='n'>1,3 млн</td></tr><tr><td>В месяц, один пост</td><td class='n'>12,1 млн</td></tr><tr><td>В год, один пост</td><td class='n'>145 млн</td></tr></table><p>Зарплата взята из вакансий сторожей в Ташкенте: 2,4–3,0 млн сумов в месяц (сентябрь 2026 года). Минимальная зарплата с 1 сентября — 1 360 000 сумов. НДФЛ 12% удерживается из этой суммы, социальный налог 12% начисляется сверху.</p><h4>Что не учтено</h4><ul><li>Форма, связь, доставка работника на объект.</li><li>Подменный работник на отпуска и больничные.</li><li>Кадровый и бухгалтерский учёт, 267 отдельных трудовых договоров.</li></ul><p class='ogoh'>На обесточенном объекте сторож сидит в темноте и без отопления. На таком посту люди долго не задерживаются, а ночью под угрозой оказывается сам работник.</p>"
    }
  },
  "s-iqtisod.davlat": {
    yorliq: "Moliya va huquq",
    sarlavha: "Qo'riqlash departamenti: yagona shartnomaviy variant",
    tana: "<p>Shartnoma asosida qo'riqlash xizmatini faqat qonunda sanalgan davlat organlari ko'rsatadi (O'RQ-778, 13-modda). Xususiy qo'riqlash kompaniyasi bilan shartnoma tuzilmaydi. Bank uchun amaldagi hamkor — IIV huzuridagi Qo'riqlash departamenti.</p><h4>Departament kalkulyatori, 24/7 post</h4><table><tr><th>Xizmat turi</th><th>Oyiga</th><th>Yiliga</th></tr><tr><td>Qorovul bo'linmasi</td><td class='n'>4,6 mln</td><td class='n'>55 mln</td></tr><tr><td>Harbiylashtirilgan bo'linma</td><td class='n'>8,8 mln</td><td class='n'>106 mln</td></tr><tr><td>Saf bo'linmasi</td><td class='n'>16,5 mln</td><td class='n'>198 mln</td></tr></table><p>Raqamlar qbb.uz saytidagi onlayn kalkulyatordan: haftada 168 soat qo'riqlash tanlangan (2026-yil sentabr). Yakuniy narx shartnomada, obyekt ko'rigidan keyin belgilanadi.</p><h4>Rahbariyat nimani hal qiladi</h4><ul><li>Qaysi obyektga odam kerak: qimmat va shahar ichidagi 5–10 ta obyekt.</li><li>Qolganlari masofaviy nazoratda, signal kelganda departament guruhi chaqiriladi.</li><li>Departamentning texnik markaz orqali qo'riqlash tarifini alohida so'rash: elektrsiz obyektda signal Ajax yoki boshqa hub orqali uzatiladi.</li></ul><p class='ogoh'>Slayddagi 55 mln so'm eng arzon odamli variant. Shunda ham u masofaviy nazoratdan yetti baravar qimmat.</p>",
    manba: [["lex.uz: O'RQ-778", "https://lex.uz/uz/docs/-6066682"], ["qbb.uz/calc", "https://qbb.uz/ru/calc"]],
    ru: {
      yorliq: "Финансы и право",
      sarlavha: "Департамент охраны: единственный договорной вариант",
      tana: "<p>Охранные услуги по договору оказывают только государственные органы, перечисленные в законе (ЗРУ-778, статья 13). Договор с частным охранным предприятием заключить нельзя. Реальный партнёр банка — Департамент охраны при МВД.</p><h4>Калькулятор департамента, пост 24/7</h4><table><tr><th>Вид охраны</th><th>В месяц</th><th>В год</th></tr><tr><td>Сторожевое подразделение</td><td class='n'>4,6 млн</td><td class='n'>55 млн</td></tr><tr><td>Военизированное подразделение</td><td class='n'>8,8 млн</td><td class='n'>106 млн</td></tr><tr><td>Строевое подразделение</td><td class='n'>16,5 млн</td><td class='n'>198 млн</td></tr></table><p>Цифры получены в онлайн-калькуляторе на qbb.uz при охране 168 часов в неделю (сентябрь 2026 года). Окончательная цена фиксируется в договоре после обследования объекта.</p><h4>Что решает руководство</h4><ul><li>Какому объекту нужен человек: 5–10 дорогих объектов в городах.</li><li>Остальные — под удалённым контролем, по тревоге вызывается группа департамента.</li><li>Отдельно запросить тариф охраны через технический центр: на обесточенном объекте сигнал передаёт хаб Ajax или аналог.</li></ul><p class='ogoh'>55 млн сумов на слайде — самый дешёвый вариант с человеком. И он всё равно в семь раз дороже удалённого контроля.</p>"
    }
  },
  "s-iqtisod.komplekt": {
    yorliq: "Rahbariyat uchun",
    sarlavha: "Yiliga 7,4 mln so'm nimalardan yig'iladi",
    tana: "<p>Masofaviy nazoratning narxi uch qismdan iborat. Hisob 100 obyekt va o'rtacha 10 mln so'mlik komplekt uchun.</p><table><tr><th>Qism</th><th>Bir obyekt, yiliga</th></tr><tr><td>Komplekt: 10 mln so'm 5 yilga bo'lingan</td><td class='n'>2,0 mln</td></tr><tr><td>SIM va trafik, taxminan 100 ming so'm oyiga</td><td class='n'>1,2 mln</td></tr><tr><td>Servis: chorakda bir profilaktik tashrif, akkumulyator va ta'mir zaxirasi</td><td class='n'>1,8 mln</td></tr><tr><td>Operatorlar markazi ulushi: 240 mln so'm / 100</td><td class='n'>2,4 mln</td></tr><tr><td><b>Jami</b></td><td class='n'>7,4 mln</td></tr></table><h4>Nega 5 yil</h4><p>Kamera va router 5–7 yil ishlaydi, obyekt esa bir yil ichida sotilishi kerak. Komplekt sotilgan obyektdan olinib, keyingisiga o'rnatiladi. Shuning uchun narx bitta obyektga emas, jihozning xizmat muddatiga bo'linadi.</p><h4>Markaz</h4><p>Sutkalik operator posti: 4 operator, har biriga 4,5 mln so'm va 12% ijtimoiy soliq. Bu xarajat obyektlar soniga bog'liq emas. 267 obyektda ulush 0,9 mln so'mgacha tushadi.</p><p class='ogoh'>7,4 mln ga platforma jamoasi, serverlar va jihoz sug'urtasi kirmaydi: ular dastur byudjetida alohida qator. Markaz ulushi faqat navbatchi operatorlar.</p><p class='ogoh'>SIM va servis narxlari taxminiy. Aniq qiymat operatorning korporativ tarifi va integrator bilan tuzilgan SLA'dan keyin chiqadi.</p>",
    manba: [],
    ru: {
      yorliq: "Для руководства",
      sarlavha: "Из чего складываются 7,4 млн сумов в год",
      tana: "<p>Стоимость удалённого контроля состоит из трёх частей. Расчёт — на 100 объектов при среднем комплекте за 10 млн сумов.</p><table><tr><th>Часть</th><th>Один объект в год</th></tr><tr><td>Комплект: 10 млн сумов на 5 лет</td><td class='n'>2,0 млн</td></tr><tr><td>SIM и трафик, около 100 тыс. сумов в месяц</td><td class='n'>1,2 млн</td></tr><tr><td>Сервис: профилактический выезд раз в квартал, резерв на аккумулятор и ремонт</td><td class='n'>1,8 млн</td></tr><tr><td>Доля операторского центра: 240 млн / 100</td><td class='n'>2,4 млн</td></tr><tr><td><b>Итого</b></td><td class='n'>7,4 млн</td></tr></table><h4>Почему 5 лет</h4><p>Камера и роутер служат 5–7 лет, а объект нужно продать в течение года. После продажи комплект снимают и ставят на следующий объект. Поэтому цена делится не на один объект, а на срок службы оборудования.</p><h4>Центр</h4><p>Круглосуточный пост: 4 оператора по 4,5 млн сумов плюс 12% социального налога. Эти расходы не зависят от числа объектов. При 267 объектах доля падает до 0,9 млн сумов.</p><p class='ogoh'>В 7,4 млн не входят команда платформы, серверы и страхование оборудования: это отдельные строки бюджета программы. Доля центра — только дежурные операторы.</p><p class='ogoh'>Цены на SIM и сервис оценочные. Точные цифры появятся после корпоративного тарифа оператора и SLA с интегратором.</p>"
    }
  },
  "s-iqtisod.tejash": {
    yorliq: "Rahbariyat uchun",
    sarlavha: "Qo'riqchi posti bilan farq: formula va chegaralar",
    tana: "<p>Kalkulyator ikki variantning yillik xarajatini solishtiradi: har obyektga qo'riqchi qo'yish yoki shu obyektlarni masofadan nazorat qilish.</p><pre><code>qo'riqlash = N × oylik narx × 12\nnazorat    = N × komplekt / 5\n           + N × 3 mln + 240 mln\nfarq       = qo'riqlash − nazorat</code></pre><div class='raqamlar'><div><b>4 780</b><span>mln so'm, 100 obyekt</span></div><div><b>13 160</b><span>mln so'm, 267 obyekt</span></div><div><b>260</b><span>mln so'm, 10 obyekt</span></div></div><h4>Qanday o'qiladi</h4><p>Bu bank bugun to'layotgan puldan tejam emas: obyektlar hozir umuman qo'riqlanmaydi. Raqam boshqa narsani ko'rsatadi. Nazorat kerak bo'lsa, eng arzon yo'l qaysi.</p><p>Obyekt kam bo'lsa, markaz xarajati og'ir tushadi. 10 obyektda farq 260 mln so'mga tushadi. Shunda markaz o'rniga mavjud navbatchi xizmatidan foydalanish arzonroq.</p><p class='ogoh'>Kalkulyator jarima, o'g'irlik zarari va sug'urta to'lovini hisobga olmaydi. Ular faqat nazorat foydasiga ishlaydi.</p>",
    manba: [],
    ru: {
      yorliq: "Для руководства",
      sarlavha: "Разница с постом охраны: формула и границы",
      tana: "<p>Калькулятор сравнивает годовые расходы двух вариантов: сторож на каждом объекте или удалённый контроль тех же объектов.</p><pre><code>охрана   = N × цена в месяц × 12\nконтроль = N × комплект / 5\n         + N × 3 млн + 240 млн\nразница = охрана − контроль</code></pre><div class='raqamlar'><div><b>4 780</b><span>млн сумов, 100 объектов</span></div><div><b>13 160</b><span>млн сумов, 267 объектов</span></div><div><b>260</b><span>млн сумов, 10 объектов</span></div></div><h4>Как читать</h4><p>Это не экономия от того, что банк платит сегодня: сейчас объекты не охраняются вовсе. Цифра отвечает на другой вопрос — какой путь дешевле, если контроль нужен.</p><p>При малом числе объектов расходы на центр становятся ощутимыми. На 10 объектах разница падает до 260 млн сумов. Тогда дешевле опереться на существующую дежурную службу, чем создавать центр.</p><p class='ogoh'>Калькулятор не учитывает штрафы, ущерб от краж и страховые выплаты. Все они работают только в пользу контроля.</p>"
    }
  },
  "s-iqtisod.qoplash": {
    yorliq: "Moliya va huquq",
    sarlavha: "Nazorat bank byudjetiga qanday kiradi",
    tana: "<p>Bugun obyektlar qo'riqlanmaydi va bank ularni qo'riqlashga pul to'lamaydi. Shuning uchun masofaviy nazorat tejam emas, yangi xarajat. Hisob 267 obyekt va o'rtacha 10 mln so'mlik komplekt uchun.</p><pre><code>kapital = 267 × 10 mln         = 2 670 mln\njoriy   = 267 × 3 mln + 240 mln = 1 041 mln yiliga\nyiliga  = 2 670 / 5 + 1 041     = 1 575 mln</code></pre><h4>Byudjetga qanday kiradi</h4><ul><li><b>Kapital xarajat:</b> 267 komplekt, 2 670 mln so'm. Asosiy vosita sifatida hisobga olinadi va xizmat muddati davomida eskiradi.</li><li><b>Joriy xarajat:</b> SIM, servis va markaz, yiliga 1 041 mln so'm.</li><li><b>Ijara varianti:</b> minora va ko'chma stansiya sotib olinmaydi. Oylik to'lov kapital xarajatni kamaytiradi.</li></ul><h4>Bu pul nima beradi</h4><p>Asosiy qiymat: obyekt talon-taroj qilinmaydi, holati dalil bilan qayd etiladi, xaridor uni masofadan ko'radi. Zaxira va sotuv muddatiga ta'siri pilotda o'lchanadi.</p><p class='ogoh'>Platforma jamoasi, serverlar va jihoz sug'urtasi bu hisobga kirmaydi. Ular dastur byudjetida alohida qator bo'lib, pilot smetasida aniqlanadi. Eskirish muddati bank hisob siyosatiga ko'ra belgilanadi, 5 yil boshqaruv hisobi uchun.</p>",
    manba: [],
    ru: {
      yorliq: "Финансы и право",
      sarlavha: "Как контроль входит в бюджет банка",
      tana: "<p>Сегодня объекты не охраняются, и банк не платит за их охрану. Поэтому удалённый контроль — не экономия, а новый расход. Расчёт — на 267 объектов при среднем комплекте за 10 млн сумов.</p><pre><code>капитальные = 267 × 10 млн         = 2 670 млн\nтекущие     = 267 × 3 млн + 240 млн = 1 041 млн в год\nв год       = 2 670 / 5 + 1 041     = 1 575 млн</code></pre><h4>Как это входит в бюджет</h4><ul><li><b>Капитальные затраты:</b> 267 комплектов, 2 670 млн сумов. Учитываются как основное средство и амортизируются в течение срока службы.</li><li><b>Текущие расходы:</b> SIM, сервис и центр — 1 041 млн сумов в год.</li><li><b>Вариант аренды:</b> вышку и портативную станцию не покупают. Ежемесячный платёж снижает капзатраты.</li></ul><h4>Что дают эти деньги</h4><p>Главное: объект не разграбят, его состояние зафиксировано с доказательствами, покупатель смотрит его удалённо. Влияние на резерв и срок продажи измеряется в пилоте.</p><p class='ogoh'>Команда платформы, серверы и страхование оборудования в расчёт не входят. Это отдельные строки бюджета программы, их уточняет смета пилота. Срок амортизации определяет учётная политика банка; 5 лет — для управленческого расчёта.</p>"
    }
  },
  "s-iqtisod.farazlar": {
    yorliq: "Texnik izoh",
    sarlavha: "Kalkulyatorning uchta faraz qiymati",
    tana: "<p>Kalkulyatorda uchta qiymat qat'iy. Pilotdan keyin ular haqiqiy raqamlar bilan almashtiriladi.</p><table><tr><th>Faraz</th><th>Qiymat</th><th>Pilotda nima o'lchanadi</th></tr><tr><td>Xizmat muddati</td><td class='n'>5 yil</td><td>Akkumulyator sig'imi qishdan keyin qancha qoldi</td></tr><tr><td>SIM va servis</td><td class='n'>3 mln</td><td>Haqiqiy trafik, servisga chiqishlar soni va masofa</td></tr><tr><td>Markaz</td><td class='n'>240 mln</td><td>Bir operator nechta obyektni ushlay oladi</td></tr></table><h4>Nimadan olingan</h4><ul><li>Trafik: kamera hodisa va kadr yuboradi, jonli video faqat operator ochganda. Oyiga bir necha gigabayt yetadi.</li><li>Servis: chorakda bir rejali tashrif, 30-slayddagi SLA bo'yicha. Noyabrdagisi qish oldidan majburiy: akkumulyator va panel tekshiruvi. Tashriflar bankning davriy ko'rigi bilan birlashtiriladi, alohida yo'l xarajati kam.</li><li>Markaz: 4 operator sutkalik postni yopadi. Hodisaga asoslangan nazoratda bir operator 100 dan ortiq obyektni ko'radi.</li></ul><p class='ogoh'>Uchala qiymat bozor bahosi, 2026. Tender va pilot natijasida ular 30% gacha o'zgarishi mumkin, lekin xulosa o'zgarmaydi: 55 mln so'mlik qo'riqlash bilan farq baribir bir necha baravar.</p>",
    manba: [],
    ru: {
      yorliq: "Техническая справка",
      sarlavha: "Три допущения калькулятора",
      tana: "<p>Три значения в калькуляторе зафиксированы. После пилота их заменят фактическими цифрами.</p><table><tr><th>Допущение</th><th>Значение</th><th>Что измеряется в пилоте</th></tr><tr><td>Срок службы</td><td class='n'>5 лет</td><td>Сколько ёмкости аккумулятора осталось после зимы</td></tr><tr><td>SIM и сервис</td><td class='n'>3 млн</td><td>Фактический трафик, число выездов и расстояния</td></tr><tr><td>Центр</td><td class='n'>240 млн</td><td>Сколько объектов держит один оператор</td></tr></table><h4>Откуда цифры</h4><ul><li>Трафик: камера шлёт события и кадры, живое видео — только когда его открывает оператор. Хватает нескольких гигабайт в месяц.</li><li>Сервис: плановый выезд раз в квартал по SLA со слайда 30. Ноябрьский обязателен перед зимой: проверка аккумулятора и панели. Выезды совмещаются с периодическим осмотром банка, поэтому отдельных транспортных расходов мало.</li><li>Центр: 4 оператора закрывают круглосуточный пост. При контроле по событиям один оператор видит более 100 объектов.</li></ul><p class='ogoh'>Все три значения — рыночная оценка 2026 года. По итогам тендера и пилота они могут сдвинуться до 30%, но вывод не меняется: разница с охраной за 55 млн сумов остаётся многократной.</p>"
    }
  },
  "s-iqtisod.zaxira": {
    yorliq: "Moliya va huquq",
    sarlavha: "Zaxira: nazorat sotuv muddatini qanday himoyalaydi",
    tana: "<p class='ogoh'>Shartli misol. Summalar o'ylab topilgan va real obyektga tegishli emas.</p><p>MB Boshqaruvining 2696-son nizomi, 20-band: garov hisobidan undirilgan ko'chmas mulk balansga qabul qilingan kundan bir yil ichida sotilmasa, «umidsiz» deb tasniflanadi. «Umidsiz» aktivga 100% zaxira yaratiladi.</p><h4>Misol</h4><table><tr><th>Holat</th><th>Zaxira</th></tr><tr><td>Obyekt 800 mln so'm, 10-oyda sotildi</td><td class='n'>100% yo'q</td></tr><tr><td>Obyekt 800 mln so'm, 12 oyda sotilmadi</td><td class='n'>800 mln</td></tr><tr><td>Komplekt narxi</td><td class='n'>10 mln</td></tr></table><h4>Nazorat bu yerda nima beradi</h4><ul><li>Obyekt talon-taroj qilinmaydi: baholash qiymati va auksion narxi saqlanadi.</li><li>Xaridor obyektni video orqali oldindan ko'radi, ko'rsatuv tashriflari kamayadi.</li><li>Obyekt holati jurnalda: auksionda yoki sudda nizo chiqsa, dalil bor.</li></ul><p>Zaxira zarar emas, lekin kapital va foydaga bosim. Obyekt sotilsa, zaxira tiklanadi.</p><p class='ogoh'>MB 2026-yil 10-sentabrda aktivlarni tasniflash bo'yicha yangi nizomni ro'yxatdan o'tkazdi (3937-son). Taqdimotdan oldin moliya bo'limi 20-band qoidasi yangi hujjatda qanday berilganini tekshirishi kerak.</p>",
    manba: [["lex.uz: 2696", "https://lex.uz/docs/-2703053"], ["spot.uz: 3937", "https://www.spot.uz/oz/2026/09/14/bank-assets"]],
    ru: {
      yorliq: "Финансы и право",
      sarlavha: "Резерв: как контроль защищает срок продажи",
      tana: "<p class='ogoh'>Условный пример. Суммы придуманы и не относятся к реальному объекту.</p><p>Положение ЦБ № 2696, пункт 20: недвижимость, взысканная в счёт залога, если она не продана в течение года со дня принятия на баланс, классифицируется как «безнадёжная». По «безнадёжному» активу создаётся резерв 100%.</p><h4>Пример</h4><table><tr><th>Ситуация</th><th>Резерв</th></tr><tr><td>Объект за 800 млн сумов продан на 10-м месяце</td><td class='n'>100% не нужен</td></tr><tr><td>Объект за 800 млн сумов не продан за 12 месяцев</td><td class='n'>800 млн</td></tr><tr><td>Стоимость комплекта</td><td class='n'>10 млн</td></tr></table><h4>Что здесь даёт контроль</h4><ul><li>Объект не разграбят: оценочная стоимость и цена на аукционе сохраняются.</li><li>Покупатель заранее смотрит объект по видео, показов на месте меньше.</li><li>Состояние объекта в журнале: при споре на аукционе или в суде есть доказательства.</li></ul><p>Резерв — не убыток, но давление на капитал и прибыль. После продажи объекта резерв восстанавливается.</p><p class='ogoh'>10 сентября 2026 года ЦБ зарегистрировал новое положение о классификации активов (№ 3937). До презентации финансовому блоку нужно проверить, как норма пункта 20 изложена в новом документе.</p>"
    }
  },

  /* ======================= 01 · s-muqova ======================= */
  "s-muqova.korsat1": {
    yorliq: "Rahbariyat uchun",
    sarlavha: "267 obyekt: nima kiradi va nima kirmaydi",
    tana: "<p>Bu bank balansiga olingan va hali sotilmagan aktivlar: 188 bino va inshoot, 79 ko'char mulk. Bo'sh yer uchastkalari kamera talab qilmaydi va nazorat rejasiga kirmaydi.</p><h4>Ro'yxat har oy o'zgaradi</h4><ul><li>Yangi aktiv balansga olinadi: sud qarori yoki garovni undirish tugagach.</li><li>Sotilgan aktiv chiqadi, uning komplekti yechib olinib, keyingi obyektga o'rnatiladi.</li><li>Shuning uchun loyiha qat'iy 267 ta nuqtaga emas, oqimga hisoblanadi.</li></ul><h4>Rejalashtirish uchun uch guruh</h4><table><tr><th>Guruh</th><th>Yechim</th></tr><tr><td>Bino, qo'shnisi va aloqasi bor</td><td>Batareyali kamera yoki elektrga qayta ulash</td></tr><tr><td>Chekka bino va hovli</td><td>Quyosh-4G yoki LiFePO4 shkaf</td></tr><tr><td>Transport va texnika</td><td>GPS treker, plomba, qo'riqlanadigan maydon</td></tr></table><h4>Rahbariyat nimani kuzatadi</h4><p>Panelda uchta raqam: nazoratdagi obyektlar ulushi, oxirgi 7 kundagi hodisalar va aloqadan chiqqan qurilmalar. Maqsad: balansdagi har bir binoda kamida bitta ishlayotgan kamera.</p><p class='ogoh'>Aniq taqsimot joyida ko'rikdan keyin chiqadi. Pilotdagi 10 obyekt har guruhdan tanlanadi.</p>",
    manba: [],
    ru: {
      yorliq: "Для руководства",
      sarlavha: "267 объектов: что входит и что нет",
      tana: "<p>Сюда входят активы, которые банк принял на баланс и ещё не продал: 188 зданий и сооружений, 79 единиц движимого имущества. Пустые земельные участки камеры не требуют и в план контроля не входят.</p><h4>Список меняется каждый месяц</h4><ul><li>Новый актив принимается на баланс после решения суда или обращения взыскания на залог.</li><li>Проданный актив выбывает, комплект снимают и ставят на следующий объект.</li><li>Поэтому проект считается не на жёсткие 267 точек, а на поток.</li></ul><h4>Три группы для планирования</h4><table><tr><th>Группа</th><th>Решение</th></tr><tr><td>Здание с соседями и связью</td><td>Камера на батарее или повторное подключение к сети</td></tr><tr><td>Удалённое здание и двор</td><td>Солнечная 4G-камера или шкаф LiFePO4</td></tr><tr><td>Транспорт и техника</td><td>GPS-трекер, пломба, охраняемая площадка</td></tr></table><h4>Что отслеживает руководство</h4><p>На панели три цифры: доля объектов под контролем, события за последние 7 дней и устройства без связи. Цель — хотя бы одна работающая камера на каждом здании баланса.</p><p class='ogoh'>Точное распределение станет известно после обследования на месте. 10 пилотных объектов берутся из каждой группы.</p>"
    }
  },
  "s-muqova.korsat2": {
    yorliq: "Rahbariyat uchun",
    sarlavha: "O'nta yechim: nega bittasi yetmaydi",
    tana: "<p>Obyektlar quvvat, aloqa va qiymat bo'yicha keskin farq qiladi. Shaharda qo'shnisi bor xonadonga 40 mln so'mlik minora kerak emas. Chekkadagi fermaga Wi-Fi kamera yaramaydi.</p><h4>Yechimlar uch narx pog'onasida</h4><table><tr><th>Pog'ona</th><th>Yechimlar</th><th>Bir obyekt</th></tr><tr><td>Asosiy</td><td>Milesight, Hikvision, Dahua, Ajax, Reolink</td><td class='n'>3–12 mln</td></tr><tr><td>O'rta</td><td>Ko'chma stansiya, LiFePO4 shkaf</td><td class='n'>7–20 mln</td></tr><tr><td>Maxsus</td><td>Klaster, EFOY, mobil minora</td><td class='n'>20 mln dan yuqori</td></tr></table><p>Yettita yechim 20 mln so'mgacha turadi. Qimmat uchtasi faqat tanlangan obyektlarga qo'yiladi yoki ijaraga olinadi.</p><h4>Kim tanlaydi</h4><p>Obyekt ko'rigida montajchi oltita savolga javob yozadi: quvvat, kamera, kirish, aloqa, aloqasiz ish, integratsiya. Javoblar jadvali yechimni o'zi ko'rsatadi, brendni emas.</p><h4>Nimani so'rash kerak</h4><ul><li>Yetkazuvchidan: ONVIF yoki API hujjati, −20 °C da ishlash, joyida yozuv.</li><li>Integratordan: har yechim uchun alohida narx va servis muddati.</li><li>Bankdan: qaysi obyekt qancha turishi — qisqa muddatli aktivga qimmat komplekt qo'yilmaydi.</li></ul>",
    manba: [],
    ru: {
      yorliq: "Для руководства",
      sarlavha: "Десять решений: почему одного мало",
      tana: "<p>Объекты сильно различаются по питанию, связи и стоимости. Городской квартире с соседями не нужна вышка за 40 млн сумов. Удалённой ферме не подходит Wi-Fi-камера.</p><h4>Три ценовых уровня</h4><table><tr><th>Уровень</th><th>Решения</th><th>Один объект</th></tr><tr><td>Базовый</td><td>Milesight, Hikvision, Dahua, Ajax, Reolink</td><td class='n'>3–12 млн</td></tr><tr><td>Средний</td><td>Портативная станция, шкаф LiFePO4</td><td class='n'>7–20 млн</td></tr><tr><td>Особый</td><td>Кластер, EFOY, мобильная вышка</td><td class='n'>от 20 млн</td></tr></table><p>Семь решений стоят до 20 млн сумов. Три дорогих ставятся только на отобранные объекты или берутся в аренду.</p><h4>Кто выбирает</h4><p>При обследовании монтажник отвечает на шесть вопросов: питание, камера, доступ, связь, работа без связи, интеграция. Таблица ответов указывает на решение, а не на бренд.</p><h4>Что спросить</h4><ul><li>У поставщика: документацию ONVIF или API, работу при −20 °C, запись на месте.</li><li>У интегратора: отдельную цену и срок сервиса по каждому решению.</li><li>Внутри банка: сколько простоит объект — на краткосрочный актив дорогой комплект не ставят.</li></ul>"
    }
  },
  "s-muqova.korsat3": {
    yorliq: "Jamoa rahbarlari uchun",
    sarlavha: "Bitta platforma: brenddan qat'i nazar",
    tana: "<p>O'nta yechim o'nta ilova degani emas. Operator bitta MKB veb-panelida ishlaydi, har bir ishlab chiqaruvchi esa adapter orqali ulanadi.</p><h4>Platformada nima bor</h4><ul><li>Qurilmalar reyestri har kamera va datchikni obyekt kartochkasiga bog'laydi.</li><li>Hodisa shinasi Hikvision, Dahua, Ajax va Reolink hodisalarini bitta JSON sxemaga keltiradi.</li><li>Media shlyuz RTSP oqimini brauzerda WebRTC yoki HLS ko'rinishida ochadi.</li><li>Buyruq xizmati eshik, PTZ va sirenani boshqaradi, har amalni jurnalga yozadi.</li></ul><h4>Bank uchun foydasi</h4><p>Bank tenderda bitta brendga bog'lanib qolmaydi. Ertaga Dahua arzonlashsa, faqat adapter qo'shiladi, operator interfeysi o'zgarmaydi. Reyestr, obyekt kartochkasi va boshqaruv paneli allaqachon ishlaydi (37-slayd).</p><h4>Jamoa uchun chegaralar</h4><p>Birinchi versiyada to'rt adapter: Hikvision ISAPI, Dahua, Ajax va Reolink. Har yangi brend uchun adapter alohida vazifa, platforma yadrosi o'zgarmaydi.</p><p class='ogoh'>Asosiy talab yetkazuvchiga: ONVIF yoki ochiq API. Yopiq bulutli ilova orqali ishlaydigan kamera tenderga qo'yilmaydi.</p>",
    manba: [],
    ru: {
      yorliq: "Для тимлида",
      sarlavha: "Одна платформа независимо от бренда",
      tana: "<p>Десять решений не означают десять приложений. Оператор работает в одной веб-панели MKB, а каждый производитель подключается через адаптер.</p><h4>Что есть в платформе</h4><ul><li>Реестр устройств привязывает каждую камеру и датчик к карточке объекта.</li><li>Шина событий сводит события Hikvision, Dahua, Ajax и Reolink к одной JSON-схеме.</li><li>Медиашлюз открывает поток RTSP в браузере как WebRTC или HLS.</li><li>Сервис команд управляет дверью, PTZ и сиреной и пишет каждое действие в журнал.</li></ul><h4>Что это даёт банку</h4><p>В тендере банк не привязан к одному бренду. Если завтра подешевеет Dahua, добавится только адаптер, интерфейс оператора не изменится. Реестр, карточка объекта и панель управления уже работают (слайд 37).</p><h4>Границы для команды</h4><p>В первой версии четыре адаптера: Hikvision ISAPI, Dahua, Ajax и Reolink. Каждый новый бренд — отдельная задача на адаптер, ядро платформы не меняется.</p><p class='ogoh'>Главное требование к поставщику — ONVIF или открытый API. Камеры, работающие только через закрытое облачное приложение, к тендеру не допускаются.</p>"
    }
  },

  /* ======================= 03 · s-muammo ======================= */
  "s-muammo.fakt1": {
    yorliq: "Montajchi uchun",
    sarlavha: "Elektr yo'q: quvvat obyektning o'zida",
    tana: "<p>Mulk bankka o'tganda hisoblagich ko'rsatkichi nolga tushiriladi, oldingi egasining shartnomasi bekor bo'ladi. Ko'p obyektda hisoblagich umuman olib qo'yilgan.</p><h4>Ikki yo'l</h4><table><tr><th>Yo'l</th><th>Qachon</th><th>Narxi</th></tr><tr><td>Qayta ulash</td><td>Tarmoq joyida, obyekt bir necha oy turadi</td><td class='n'>39 600 so'm texnik shart</td></tr><tr><td>Avtonom quvvat</td><td>Tarmoq uzoq yoki ulash imkonsiz</td><td class='n'>batareya, quyosh, shkaf</td></tr></table><p>Qayta ulashda texnik shart uch ish kunida beriladi. 40–60 Vt nazorat tuguni oyiga taxminan 38 500 so'mlik elektr sarflaydi. Bu ko'p obyekt uchun eng arzon variant.</p><h4>Avtonom quvvatda nimaga qaraladi</h4><ul><li>Qishki quyosh: dekabrda iyundagidan 4,7 marta kam.</li><li>LiFePO4 0 °C dan past haroratda zaryadlanmaydi, BMS himoyasi shart.</li><li>Iste'mol: hodisaga asoslangan kamera, doimiy video emas.</li></ul><p class='ogoh'>Qaror obyekt bo'yicha qabul qilinadi: ko'rik varag'ida «qayta ulash mumkin» yoki «avtonom» belgilanadi. Bir xil yechimni hammaga qo'llash xarajatni oshiradi.</p>",
    manba: [],
    ru: {
      yorliq: "Для монтажника",
      sarlavha: "Нет электричества: питание на самом объекте",
      tana: "<p>При переходе имущества к банку показания счётчика обнуляются, договор прежнего владельца расторгается. На многих объектах счётчик вообще снят.</p><h4>Два пути</h4><table><tr><th>Путь</th><th>Когда</th><th>Цена</th></tr><tr><td>Повторное подключение</td><td>Сеть рядом, объект простоит несколько месяцев</td><td class='n'>39 600 сумов за ТУ</td></tr><tr><td>Автономное питание</td><td>Сеть далеко или подключение невозможно</td><td class='n'>батарея, солнце, шкаф</td></tr></table><p>Технические условия выдаются за три рабочих дня. Узел контроля на 40–60 Вт потребляет электроэнергии примерно на 38 500 сумов в месяц. Для многих объектов это самый дешёвый вариант.</p><h4>На что смотреть при автономном питании</h4><ul><li>Зимнее солнце: в декабре в 4,7 раза меньше, чем в июне.</li><li>LiFePO4 нельзя заряжать ниже 0 °C, нужна защита BMS.</li><li>Потребление: камера работает по событиям, а не в режиме постоянного видео.</li></ul><p class='ogoh'>Решение принимается по каждому объекту: в листе обследования отмечается «можно подключить» или «автономно». Одно решение для всех увеличивает расходы.</p>"
    }
  },
  "s-muammo.fakt2": {
    yorliq: "Montajchi uchun",
    sarlavha: "Aloqa yo'q: signalni joyida o'lchash",
    tana: "<p>Simli internet oldingi egasi bilan birga uziladi. Mobil qamrov xaritada bor bo'lsa ham, bino ichida yoki pastlikda signal bo'lmasligi mumkin.</p><h4>Ko'rikda nima o'lchanadi</h4><ul><li>To'rtta operatorning signal darajasi: RSRP, RSRQ va SINR, kamera turadigan nuqtada.</li><li>Yuqoriga yuklash tezligi: jonli video uchun kamida 1 Mbit/s.</li><li>Kun va kechqurun farqi: kechqurun tarmoq yuklangan bo'ladi.</li></ul><h4>Signal zaif bo'lsa</h4><table><tr><th>Holat</th><th>Yechim</th></tr><tr><td>−105 dBm dan yomon</td><td>Tashqi yo'naltirilgan antenna</td></tr><tr><td>Bitta operator ishlamaydi</td><td>Ikki SIM'li router</td></tr><tr><td>Qo'shni obyektda aloqa bor</td><td>Wi-Fi ko'prik yoki klaster</td></tr><tr><td>Qamrov umuman yo'q</td><td>Sun'iy yo'ldosh zaxirasi, faqat hodisa va kadr</td></tr></table><h4>SIM tanlash</h4><p>Korporativ tarif, statik IP yoki yopiq APN. Trafik limiti oyiga bir necha gigabayt: hodisa va kadr doim, jonli video faqat operator ochganda.</p><p class='ogoh'>Aloqa uzilsa ham dalil yo'qolmaydi: SD karta yoki NVR hodisani saqlaydi va aloqa tiklanganda yuboradi.</p>",
    manba: [],
    ru: {
      yorliq: "Для монтажника",
      sarlavha: "Нет связи: сигнал измеряют на месте",
      tana: "<p>Проводной интернет отключается вместе с прежним владельцем. Даже если мобильное покрытие есть на карте, внутри здания или в низине сигнала может не быть.</p><h4>Что измеряется при обследовании</h4><ul><li>Уровень сигнала четырёх операторов — RSRP, RSRQ и SINR — в точке установки камеры.</li><li>Скорость отдачи: для живого видео не менее 1 Мбит/с.</li><li>Разница днём и вечером: вечером сеть загружена.</li></ul><h4>Если сигнал слабый</h4><table><tr><th>Ситуация</th><th>Решение</th></tr><tr><td>Хуже −105 дБм</td><td>Внешняя направленная антенна</td></tr><tr><td>Один оператор не работает</td><td>Роутер на две SIM</td></tr><tr><td>На соседнем объекте связь есть</td><td>Wi-Fi-мост или кластер</td></tr><tr><td>Покрытия нет совсем</td><td>Спутниковый резерв, только события и кадры</td></tr></table><h4>Выбор SIM</h4><p>Корпоративный тариф, статический IP или закрытый APN. Лимит трафика — несколько гигабайт в месяц: события и кадры всегда, живое видео только по запросу оператора.</p><p class='ogoh'>Даже при обрыве связи доказательства не теряются: SD-карта или NVR сохраняют событие и отправляют его, когда связь восстановится.</p>"
    }
  },
  "s-muammo.fakt3": {
    yorliq: "Rahbariyat uchun",
    sarlavha: "Qarovsiz obyekt: xavf qayerdan keladi",
    tana: "<p>Bo'sh obyekt ikki-uch hafta ichida ko'zga tashlanadi. Birinchi bo'lib yechib olinadigan narsalar: kabel va mis, radiator, eshik va rom, tom qoplamasi, sex jihozi.</p><h4>Hozirgi tartibning kamchiligi</h4><ul><li>Ko'rik davriy: xodim oyda yoki chorakda bir boradi.</li><li>Ikki ko'rik orasida nima bo'lganini hech kim bilmaydi.</li><li>Zarar aniqlanganda sana va aybdorni tiklab bo'lmaydi.</li></ul><h4>Nazorat nimani o'zgartiradi</h4><table><tr><th>Ko'rsatkich</th><th>Hozir</th><th>Nazorat bilan</th></tr><tr><td>Hodisa qachon ma'lum bo'ladi</td><td>Keyingi ko'rikda</td><td>Bir daqiqa ichida</td></tr><tr><td>Dalil</td><td>Yo'q</td><td>Kadr, klip, vaqt</td></tr><tr><td>Xodim tashrifi</td><td>Jadval bo'yicha</td><td>Signal bo'yicha</td></tr></table><h4>Javob kimdan</h4><p>Signal kelganda operator kadrni ko'radi va qaror qiladi: yolg'on signal, xodimni yuborish yoki Qo'riqlash departamentini chaqirish. Har qaror obyekt tarixida qoladi.</p><p class='ogoh'>Kamera qo'riqchi emas. U buzilishni to'xtatmaydi, lekin darhol xabar beradi va dalil qoldiradi. Javob choralari Qo'riqlash departamenti yoki ichki xavfsizlik xizmati bilan kelishiladi.</p>",
    manba: [],
    ru: {
      yorliq: "Для руководства",
      sarlavha: "Объект без присмотра: откуда угроза",
      tana: "<p>Пустующий объект становится заметен за две-три недели. Первым снимают кабель и медь, радиаторы, двери и рамы, кровлю, оборудование цехов.</p><h4>Слабость нынешнего порядка</h4><ul><li>Осмотр периодический: сотрудник выезжает раз в месяц или квартал.</li><li>Что происходит между осмотрами, никто не знает.</li><li>Когда ущерб обнаружен, дату и виновного установить нельзя.</li></ul><h4>Что меняет контроль</h4><table><tr><th>Показатель</th><th>Сейчас</th><th>С контролем</th></tr><tr><td>Когда становится известно о событии</td><td>На следующем осмотре</td><td>В течение минуты</td></tr><tr><td>Доказательства</td><td>Нет</td><td>Кадр, клип, время</td></tr><tr><td>Выезд сотрудника</td><td>По графику</td><td>По сигналу</td></tr></table><h4>Кто реагирует</h4><p>По сигналу оператор смотрит кадр и решает: ложная тревога, выезд сотрудника или вызов Департамента охраны. Каждое решение остаётся в истории объекта.</p><p class='ogoh'>Камера — не охранник. Она не остановит взлом, но сразу сообщит о нём и сохранит доказательства. Меры реагирования согласуются с Департаментом охраны или службой безопасности банка.</p>"
    }
  },
  "s-muammo.fakt4": {
    yorliq: "Moliya va huquq",
    sarlavha: "Javobgarlik: egasi bank, xatar ham bankda",
    tana: "<p>Aktiv balansga olingan kundan bank uning mulkdori. Obyektda nima bo'lsa, oqibati bankka tushadi.</p><h4>To'rt yo'nalish</h4><ul><li>Talon-taroj qilingan bino baholash qiymatini yo'qotadi: auksionda arzon ketadi yoki umuman sotilmaydi.</li><li>Elektr uzilgani yong'in xavfsizligi majburiyatini bekor qilmaydi. Signalizatsiya talabini VMQ-649 qoidalarining 9-ilovasi obyekt turiga qarab belgilaydi.</li><li>Qarovsiz bo'sh bino uchun sug'urtachi shartlarni qattiqlashtiradi yoki to'lovni rad etadi. Obyekt holatini jurnal va video isbotlaydi.</li><li>Qulagan devor yoki ochiq quduqdan jarohat olgan odam egasiga, ya'ni bankka da'vo qiladi.</li></ul><h4>Bank nima qila oladi</h4><p>Nazorat tizimi obyekt holatini har kuni qayd etadi. Bu sug'urta va sud jarayonida bankning ehtiyotkorligini ko'rsatadigan hujjat bo'ladi.</p><h4>Hujjatlar</h4><p>Qabul akti, ko'rik fotosi va kamera jurnali bitta obyekt kartochkasida saqlanadi. Sug'urta hodisasida ular bir necha daqiqada eksport qilinadi.</p><p class='ogoh'>Sug'urta shartlari bo'yicha aniq talablarni bankning sug'urtachisidan yozma olish kerak.</p>",
    manba: [],
    ru: {
      yorliq: "Финансы и право",
      sarlavha: "Ответственность: собственник — банк, и риск тоже его",
      tana: "<p>С момента принятия актива на баланс банк является его собственником. Всё, что случится на объекте, ложится на банк.</p><h4>Четыре направления</h4><ul><li>Разграбленное здание теряет оценочную стоимость: на аукционе оно уходит дёшево или не продаётся вовсе.</li><li>Отключение электричества не снимает обязанностей по пожарной безопасности. Требования к сигнализации задаёт приложение 9 к правилам ПКМ-649 в зависимости от типа объекта.</li><li>Для пустующего здания без присмотра страховщик ужесточает условия или отказывает в выплате. Состояние объекта подтверждают журнал и видео.</li><li>Пострадавший от обрушения стены или открытого колодца предъявит иск владельцу, то есть банку.</li></ul><h4>Что может сделать банк</h4><p>Система контроля ежедневно фиксирует состояние объекта. В страховом и судебном споре это документ, подтверждающий добросовестность банка.</p><h4>Документы</h4><p>Акт приёмки, фото осмотра и журнал камеры хранятся в одной карточке объекта. При страховом случае их выгружают за несколько минут.</p><p class='ogoh'>Конкретные требования по условиям страхования нужно получить у страховщика банка письменно.</p>"
    }
  },
  "s-muammo.yozuv1": {
    yorliq: "Rahbariyat uchun",
    sarlavha: "Kamera majburiy: istisno faqat bo'sh yer",
    tana: "<p>Qoida sodda: obyektda devor, tom yoki jihoz bo'lsa, u kamera bilan kuzatiladi. Bo'sh yer uchastkasida o'g'irlanadigan narsa yo'q, u davriy ko'rik bilan cheklanadi.</p><h4>Kamera nima beradi</h4><ul><li>Hodisa bo'yicha kadr va 10–30 soniyalik klip.</li><li>Obyektga kim va qachon kirgani, kirish nazorati bilan birga.</li><li>Holat tarixi: bino qaysi kuni qanday bo'lgani, sotuvda va sudda dalil.</li><li>Masofaviy ko'rsatuv: xaridor obyektni borishdan oldin ko'radi.</li></ul><h4>Qayerda kamera yetmaydi</h4><table><tr><th>Obyekt</th><th>Qo'shimcha</th></tr><tr><td>Ofis, qimmat ichki jihoz</td><td>Eshik va tutun datchigi</td></tr><tr><td>Katta ombor</td><td>LoRaWAN datchiklari</td></tr><tr><td>Transport</td><td>GPS treker va plomba</td></tr></table><h4>Qancha kamera</h4><p>Odatda 1–4 ta: har kirish nuqtasiga bittadan, katta hovliga bitta tashqi. Aniq son ko'rik varag'idagi eshik va darvozalar soniga qarab belgilanadi.</p><p class='ogoh'>Kamera ko'p qavatli uyning umumiy joyiga qaratilmaydi: faqat xonadon eshigi va ichki qismi. Qo'shnilar huquqi alohida hisobga olinadi.</p>",
    manba: [],
    ru: {
      yorliq: "Для руководства",
      sarlavha: "Камера обязательна, исключение — пустая земля",
      tana: "<p>Правило простое: если на объекте есть стены, крыша или оборудование, за ним наблюдает камера. На пустом земельном участке красть нечего, его достаточно периодически осматривать.</p><h4>Что даёт камера</h4><ul><li>Кадр по событию и клип на 10–30 секунд.</li><li>Кто и когда вошёл на объект — вместе с контролем доступа.</li><li>История состояния: каким было здание в любой день, доказательство при продаже и в суде.</li><li>Удалённый показ: покупатель видит объект до поездки.</li></ul><h4>Где одной камеры мало</h4><table><tr><th>Объект</th><th>Дополнительно</th></tr><tr><td>Офис, дорогое оборудование внутри</td><td>Датчики двери и дыма</td></tr><tr><td>Большой склад</td><td>Датчики LoRaWAN</td></tr><tr><td>Транспорт</td><td>GPS-трекер и пломба</td></tr></table><h4>Сколько камер</h4><p>Обычно 1–4: по одной на каждую точку входа и одна наружная на большой двор. Точное число зависит от количества дверей и ворот в листе обследования.</p><p class='ogoh'>В многоквартирном доме камера не направляется на места общего пользования: только на дверь квартиры и внутрь. Права соседей учитываются отдельно.</p>"
    }
  },

  /* ======================= 04 · s-tarkib ======================= */
  "s-tarkib.korsat1": {
    yorliq: "Rahbariyat uchun",
    sarlavha: "188 bino: kamera va quvvat masalasi",
    tana: "<p>Bino va inshootlar loyihaning asosiy qismi. Ularda kamera majburiy, farq faqat quvvat va aloqada.</p><h4>Taqsimot</h4><table><tr><th>Tur</th><th>Soni</th><th>Asosiy yechim</th></tr><tr><td>Ma'muriy bino</td><td class='n'>62</td><td>LiFePO4 shkaf yoki qayta ulash</td></tr><tr><td>Chorvachilik fermasi</td><td class='n'>32</td><td>Quyosh-4G kamera</td></tr><tr><td>Ishlab chiqarish sexi</td><td class='n'>24</td><td>Shkaf yoki klaster</td></tr><tr><td>Xonadon</td><td class='n'>18</td><td>Batareyali kamera</td></tr><tr><td>Do'kon</td><td class='n'>18</td><td>Batareyali kamera va datchik</td></tr><tr><td>Turar joy</td><td class='n'>16</td><td>Quyosh-4G va batareyali kamera</td></tr><tr><td>Omborxona</td><td class='n'>12</td><td>Quyosh-4G va LoRaWAN</td></tr><tr><td>Issiqxona</td><td class='n'>6</td><td>Mobil minora, ijara</td></tr></table><h4>Byudjet uchun</h4><p>Binolar uchun o'rtacha komplekt 8–15 mln so'm oralig'ida kutiladi. Qayta ulangan binolarda narx pastroq, fermalar va omborlarda yuqoriroq. Aniq qiymat pilotdan keyin chiqadi.</p><p class='ogoh'>Shahar ichidagi bino uchun avval qayta ulash ko'rib chiqiladi: texnik shart 39 600 so'm va oyiga taxminan 38 500 so'mlik elektr. Avtonom komplekt faqat bu imkonsiz bo'lsa.</p>",
    manba: [],
    ru: {
      yorliq: "Для руководства",
      sarlavha: "188 зданий: вопрос камеры и питания",
      tana: "<p>Здания и сооружения — основная часть проекта. Камера на них обязательна, разница только в питании и связи.</p><h4>Распределение</h4><table><tr><th>Тип</th><th>Кол-во</th><th>Основное решение</th></tr><tr><td>Административное здание</td><td class='n'>62</td><td>Шкаф LiFePO4 или подключение к сети</td></tr><tr><td>Животноводческая ферма</td><td class='n'>32</td><td>Солнечная 4G-камера</td></tr><tr><td>Производственный цех</td><td class='n'>24</td><td>Шкаф или кластер</td></tr><tr><td>Квартира</td><td class='n'>18</td><td>Камера на батарее</td></tr><tr><td>Магазин</td><td class='n'>18</td><td>Камера на батарее и датчик</td></tr><tr><td>Жилой дом</td><td class='n'>16</td><td>Солнечная 4G-камера и камера на батарее</td></tr><tr><td>Склад</td><td class='n'>12</td><td>Солнечная 4G-камера и LoRaWAN</td></tr><tr><td>Теплица</td><td class='n'>6</td><td>Мобильная вышка, аренда</td></tr></table><h4>Для бюджета</h4><p>Средний комплект для здания ожидается в диапазоне 8–15 млн сумов. На подключённых к сети зданиях дешевле, на фермах и складах дороже. Точная цифра появится после пилота.</p><p class='ogoh'>Для здания в городе сначала рассматривается подключение к сети: ТУ за 39 600 сумов и электроэнергия примерно на 38 500 сумов в месяц. Автономный комплект — только если это невозможно.</p>"
    }
  },
  "s-tarkib.korsat2": {
    yorliq: "Rahbariyat uchun",
    sarlavha: "79 ko'char mulk: kamera emas, joy va treker",
    tana: "<p>Avtomobil, texnika va uskuna ko'chadi, shuning uchun uni joyida kamera bilan kuzatish ma'nosiz. Asosiy qaror: <b>aktiv qayerda turadi</b>.</p><h4>Taqsimot</h4><table><tr><th>Tur</th><th>Soni</th></tr><tr><td>Avtotransport</td><td class='n'>42</td></tr><tr><td>Asbob-uskuna</td><td class='n'>30</td></tr><tr><td>Yuk avtomobili</td><td class='n'>6</td></tr><tr><td>Maxsus texnika</td><td class='n'>1</td></tr></table><h4>Nazorat uch qatlamda</h4><ul><li>Iloji bo'lsa, aktiv qo'riqlanadigan maydonga yoki bank omboriga ko'chiriladi. Bitta maydonni bitta kamera tizimi yopadi.</li><li>O'z batareyasidagi yashirin GPS treker kuniga bir-ikki marta joylashuvni yuboradi, aktiv qo'zg'alsa signal beradi.</li><li>Eshik, yoqilg'i qopqog'i va kapotga raqamli plomba qo'yiladi. Ko'rikda inspektor uning holatini suratga oladi.</li></ul><h4>Platformada</h4><p>Treker ham qurilma sifatida reyestrga yoziladi. Operator xaritada joylashuvni, batareyani va oxirgi harakatni ko'radi.</p><p class='ogoh'>Uskuna ko'pincha qarz oluvchining binosida qoladi. Bunday holatda u xatlov dalolatnomasi bo'yicha foto bilan qayd etiladi va bino kamerasining ko'rish maydoniga kiritiladi.</p>",
    manba: [],
    ru: {
      yorliq: "Для руководства",
      sarlavha: "79 единиц движимого имущества: место и трекер вместо камеры",
      tana: "<p>Автомобиль, техника и оборудование перемещаются, поэтому наблюдать за ними камерой на месте бессмысленно. Главное решение — <b>где актив хранится</b>.</p><h4>Распределение</h4><table><tr><th>Тип</th><th>Кол-во</th></tr><tr><td>Автотранспорт</td><td class='n'>42</td></tr><tr><td>Оборудование</td><td class='n'>30</td></tr><tr><td>Грузовой автомобиль</td><td class='n'>6</td></tr><tr><td>Спецтехника</td><td class='n'>1</td></tr></table><h4>Контроль в три слоя</h4><ul><li>По возможности актив перевозят на охраняемую площадку или склад банка. Одну площадку закрывает одна система камер.</li><li>Скрытый GPS-трекер на собственной батарее передаёт координаты один-два раза в сутки, а при движении подаёт сигнал.</li><li>На двери, крышку бензобака и капот ставят номерные пломбы. При осмотре инспектор фотографирует их состояние.</li></ul><h4>В платформе</h4><p>Трекер тоже вносится в реестр как устройство. Оператор видит на карте координаты, заряд батареи и последнее перемещение.</p><p class='ogoh'>Оборудование часто остаётся в здании заёмщика. Тогда оно фиксируется с фото по акту описи и включается в поле зрения камеры здания.</p>"
    }
  },
  "s-tarkib.qator1": {
    yorliq: "Montajchi uchun",
    sarlavha: "Ma'muriy bino: 62 obyekt, eng katta guruh",
    tana: "<p>Ofis va idora binolari odatda shahar yoki tuman markazida turadi. Tarmoq yaqin, mobil aloqa yaxshi, lekin bino katta va kirish joylari ko'p.</p><h4>Mos yechim</h4><ul><li>Bino uzoq turadigan bo'lsa, eng arzoni elektrga qayta ulash va oddiy IP kameralar.</li><li>Ulab bo'lmasa, LiFePO4 shkafi (yechim 04): 2–4 kamera, NVR va ikki SIM'li router.</li><li>Kichik binoga Reolink batareyali kameralari va Home Hub (yechim 01) yetadi.</li><li>Ichkarida qimmat jihoz qolgan bo'lsa, Ajax eshik va tutun datchiklari qo'shiladi (yechim 05).</li></ul><h4>Tipik xavflar</h4><ul><li>Oyna sindirish va orqa eshikdan kirish.</li><li>Radiator, kabel, santexnika va eshiklarni yechib olish.</li><li>Tunash uchun kirib qolgan begona shaxslar, yong'in xavfi.</li></ul><h4>Yetkazuvchiga savol</h4><p>Kamera IK yoritgichi bilan necha metrni ko'radi va qish kechasida batareya qancha yetadi.</p><p class='ogoh'>Kamera har bir kirish nuqtasini ko'rishi kerak. Ko'rikda eshik va derazalar soni sanaladi, kamera soni shunga qarab belgilanadi.</p>",
    manba: [],
    ru: {
      yorliq: "Для монтажника",
      sarlavha: "Административное здание: 62 объекта, самая большая группа",
      tana: "<p>Офисные и административные здания обычно стоят в центре города или района. Сеть рядом, мобильная связь хорошая, но здание большое и входов много.</p><h4>Подходящее решение</h4><ul><li>Если здание простоит долго, дешевле всего подключить его к сети и поставить обычные IP-камеры.</li><li>Если подключить нельзя — шкаф LiFePO4 (решение 04): 2–4 камеры, NVR и роутер на две SIM.</li><li>Для небольшого здания хватит камер Reolink на батарее и Home Hub (решение 01).</li><li>Если внутри осталось дорогое оборудование, добавляют датчики двери и дыма Ajax (решение 05).</li></ul><h4>Типичные риски</h4><ul><li>Разбитые окна и проникновение через задний вход.</li><li>Демонтаж радиаторов, кабеля, сантехники и дверей.</li><li>Посторонние, ночующие в здании, и риск пожара.</li></ul><h4>Вопрос поставщику</h4><p>На сколько метров видит камера с ИК-подсветкой и на сколько хватает батареи зимней ночью.</p><p class='ogoh'>Камера должна видеть каждую точку входа. При обследовании считают двери и окна, от этого зависит число камер.</p>"
    }
  },
  "s-tarkib.qator2": {
    yorliq: "Montajchi uchun",
    sarlavha: "Avtotransport: 42 ta, treker va maydon",
    tana: "<p>Yengil avtomobil uchun kamera kerak emas. Nazorat uchta vosita bilan quriladi.</p><h4>Tartib</h4><ol><li>Avtomobil qo'riqlanadigan avtoturargohga yoki bank maydoniga olib boriladi.</li><li>Yashirin joyga o'z batareyasidagi GPS treker o'rnatiladi. Avtomobil akkumulyatoriga ulanmaydi: u uzoq turganda o'tirib qoladi.</li><li>Eshik, yoqilg'i qopqog'i va kapotga raqamli plomba. Plomba raqami obyekt kartochkasiga yoziladi.</li><li>Hujjatlar, kalit va ehtiyot kalit bank seyfida.</li></ol><h4>Treker tanlash</h4><ul><li>Avtonom rejim: kuniga bir-ikki xabarda batareya bir necha yil ishlaydi.</li><li>Harakat va qiyalik datchigi: evakuatorga ortish yoki g'ildirak yechish signali.</li><li>MKB platformasiga MQTT yoki HTTP orqali ulanadi.</li></ul><h4>Tipik xavflar</h4><p>Akkumulyator, g'ildirak va oynalarni yechish, yoqilg'ini to'kish, ehtiyot qismlarni almashtirish. Uzoq turgan avtomobil texnik holatini ham yo'qotadi, shuning uchun uni tezroq sotish muhim.</p><p class='ogoh'>Treker narxi va aloqa tarifi tender takliflaridan olinadi, bu yerda raqam berilmaydi.</p>",
    manba: [],
    ru: {
      yorliq: "Для монтажника",
      sarlavha: "Автотранспорт: 42 единицы, трекер и площадка",
      tana: "<p>Легковому автомобилю камера не нужна. Контроль строится на трёх средствах.</p><h4>Порядок</h4><ol><li>Автомобиль перегоняют на охраняемую стоянку или площадку банка.</li><li>В скрытом месте ставят GPS-трекер на собственной батарее. К аккумулятору машины его не подключают: при долгой стоянке тот садится.</li><li>Номерные пломбы на двери, крышку бензобака и капот. Номер пломбы заносится в карточку объекта.</li><li>Документы, ключ и запасной ключ — в сейфе банка.</li></ol><h4>Выбор трекера</h4><ul><li>Автономный режим: при одном-двух сообщениях в сутки батареи хватает на несколько лет.</li><li>Датчики движения и наклона: сигнал при погрузке на эвакуатор или снятии колеса.</li><li>Подключение к платформе MKB по MQTT или HTTP.</li></ul><h4>Типичные риски</h4><p>Снятие аккумулятора, колёс и стёкол, слив топлива, подмена запчастей. Долго стоящая машина теряет и техническое состояние, поэтому важно продать её быстрее.</p><p class='ogoh'>Цена трекера и тариф связи берутся из тендерных предложений, здесь цифры не приводятся.</p>"
    }
  },
  "s-tarkib.qator3": {
    yorliq: "Montajchi uchun",
    sarlavha: "Chorvachilik fermasi: katta hudud, chang va hayvon",
    tana: "<p>32 ferma asosan qishloq joyida: tarmoq uzoq, aloqa zaif, hudud keng va ochiq. Bu guruh uchun asosiy yechim quyosh-4G kamerasi (yechim 02 yoki 03).</p><h4>Fermaning o'ziga xosligi</h4><ul><li>Chang panelni tez qoplaydi va quvvat tushadi. Servis jadvaliga panel tozalash kiradi, IP66 dan past himoya qabul qilinmaydi.</li><li>Oddiy harakat datchigi it, mushuk va qushga ishlab, yolg'on signal beradi. Shuning uchun kamerada odam va transportni ajratadigan videotahlil yoqiladi.</li><li>Pastlikdagi fermada signal bo'lmasligi mumkin. Montajchi ko'rikda yo'naltirilgan antennani yoki qo'shni obyekt orqali ko'prikni sinab ko'radi.</li><li>Butun perimetr kuzatilmaydi: darvoza va ombor eshigiga ikki kamera qaratiladi.</li></ul><h4>Tipik xavflar</h4><p>Tom tunukasi, metall konstruksiya, suv quvuri va sug'orish jihozini yechib olish. Quruq pichan va xashak yong'in xavfini oshiradi.</p><p class='ogoh'>Dekabrda quyosh iyundagidan 4,7 marta kam. Ferma komplekti panel va akkumulyator bo'yicha qishga hisoblanadi.</p>",
    manba: [],
    ru: {
      yorliq: "Для монтажника",
      sarlavha: "Животноводческая ферма: большая территория, пыль и животные",
      tana: "<p>32 фермы в основном в сельской местности: сеть далеко, связь слабая, территория большая и открытая. Основное решение для этой группы — солнечная 4G-камера (решение 02 или 03).</p><h4>Особенности фермы</h4><ul><li>Пыль быстро оседает на панели, и выработка падает. Очистка панели входит в график сервиса, защита ниже IP66 не принимается.</li><li>Обычный датчик движения срабатывает на собак, кошек и птиц. Поэтому в камере включают видеоаналитику, которая отличает человека и транспорт.</li><li>В низине сигнала может не быть. На обследовании монтажник пробует направленную антенну или мост через соседний объект.</li><li>Весь периметр не охватывают: две камеры смотрят на ворота и дверь склада.</li></ul><h4>Типичные риски</h4><p>Демонтаж кровельного железа, металлоконструкций, водопровода и поливочного оборудования. Сухое сено и корма повышают риск пожара.</p><p class='ogoh'>В декабре солнца в 4,7 раза меньше, чем в июне. Панель и аккумулятор для фермы рассчитываются на зиму.</p>"
    }
  },
  "s-tarkib.qator4": {
    yorliq: "Montajchi uchun",
    sarlavha: "Asbob-uskuna: 30 birlik, avval joyini aniqlash",
    tana: "<p>Uskuna mustaqil obyekt emas: u biror bino ichida turadi. Nazorat uning qayerda ekanidan boshlanadi.</p><h4>Uch holat</h4><table><tr><th>Qayerda</th><th>Nima qilinadi</th></tr><tr><td>Bankka tegishli binoda</td><td>Bino kamerasi uskunani ko'radigan qilib o'rnatiladi</td></tr><tr><td>Qarz oluvchining binosida</td><td>Xatlov, foto, plomba, tebranish datchigi</td></tr><tr><td>Ko'chirish mumkin</td><td>Bank omboriga olib boriladi, bitta tizim bilan nazorat</td></tr></table><h4>Datchiklar</h4><ul><li>Tebranish va qiyalik datchigi: stanokni joyidan siljitish yoki kesish signali.</li><li>LoRaWAN datchigi batareyada 5 yilgacha ishlaydi, bitta shlyuz butun sexni yopadi (yechim 06).</li></ul><h4>Tipik xavflar</h4><p>Qimmat qismlarni yechib olish: dvigatel, elektronika, mis o'ram. Uskuna metallomga topshirilishi mumkin.</p><h4>Kim javob beradi</h4><p>Xatlov va plombani bank xodimi qiladi, datchikni montajchi o'rnatadi. Datchik signali obyekt kartochkasiga tushadi.</p><p class='ogoh'>Har bir birlikka inventar raqam va QR yorliq qo'yiladi. Ko'rikda inspektor QR orqali kartochkani ochadi va holatni suratga oladi.</p>",
    manba: [],
    ru: {
      yorliq: "Для монтажника",
      sarlavha: "Оборудование: 30 единиц, сначала определить место",
      tana: "<p>Оборудование не самостоятельный объект: оно стоит внутри какого-то здания. Контроль начинается с того, где именно.</p><h4>Три случая</h4><table><tr><th>Где</th><th>Что делается</th></tr><tr><td>В здании банка</td><td>Камера здания ставится так, чтобы видеть оборудование</td></tr><tr><td>В здании заёмщика</td><td>Опись, фото, пломба, датчик вибрации</td></tr><tr><td>Можно перевезти</td><td>На склад банка, контроль одной системой</td></tr></table><h4>Датчики</h4><ul><li>Датчик вибрации и наклона: сигнал при сдвиге станка или резке.</li><li>Датчик LoRaWAN работает на батарее до 5 лет, один шлюз закрывает весь цех (решение 06).</li></ul><h4>Типичные риски</h4><p>Снятие дорогих узлов: двигателя, электроники, медной обмотки. Оборудование могут сдать в металлолом.</p><h4>Кто отвечает</h4><p>Опись и пломбирование делает сотрудник банка, датчик ставит монтажник. Сигнал датчика попадает в карточку объекта.</p><p class='ogoh'>Каждой единице присваивается инвентарный номер и QR-метка. При осмотре инспектор открывает карточку по QR и фотографирует состояние.</p>"
    }
  },
  "s-tarkib.qator5": {
    yorliq: "Montajchi uchun",
    sarlavha: "Ishlab chiqarish sexi: 24 obyekt, metall va stanok",
    tana: "<p>Sex ichida qimmat va og'ir jihoz qoladi. U odatda sanoat zonasida: yaqinda boshqa korxonalar va kuchli elektr tarmog'i bor.</p><h4>Mos yechim</h4><ul><li>Sanoat zonasida tarmoq yonida, shuning uchun ko'pincha eng arzoni qayta ulash.</li><li>Ulab bo'lmasa, LiFePO4 shkafi (yechim 04): 2–4 kamera va NVR, blok servis jadvali bo'yicha almashtiriladi.</li><li>Bir zonada 3–10 obyekt bo'lsa, klaster (yechim 10): bitta shkaf va radio ko'prik.</li><li>Darvozaga eshik datchigi, stanoklarga tebranish datchigi qo'yiladi.</li></ul><h4>Tipik xavflar</h4><ul><li>Kabel, mis shina va transformator qismlarini kesib olish.</li><li>Stanokni bir necha kechada bo'laklab olib chiqish.</li><li>Katta darvoza orqali yuk mashinasi bilan olib chiqish.</li></ul><h4>Yetkazuvchiga savol</h4><p>Shkaf blokini almashtirish qancha vaqt oladi va BMS ma'lumoti qaysi protokol orqali beriladi.</p><p class='ogoh'>Kamera darvoza va yuk tushirish joyini ko'rishi shart: katta jihoz faqat shu yerdan chiqadi. Tunda IK yoritish masofasi ko'rikda tekshiriladi.</p>",
    manba: [],
    ru: {
      yorliq: "Для монтажника",
      sarlavha: "Производственный цех: 24 объекта, металл и станки",
      tana: "<p>В цехе остаётся дорогое и тяжёлое оборудование. Обычно это промзона: рядом другие предприятия и мощная электросеть.</p><h4>Подходящее решение</h4><ul><li>В промзоне сеть рядом, поэтому чаще всего дешевле подключиться к ней.</li><li>Если подключить нельзя — шкаф LiFePO4 (решение 04): 2–4 камеры и NVR, блок меняют по графику сервиса.</li><li>Если в одной зоне 3–10 объектов — кластер (решение 10): один шкаф и радиомост.</li><li>На ворота ставят датчик двери, на станки — датчики вибрации.</li></ul><h4>Типичные риски</h4><ul><li>Срезка кабеля и медных шин, части трансформатора.</li><li>Разборка станка по частям за несколько ночей.</li><li>Вывоз грузовиком через большие ворота.</li></ul><h4>Вопрос поставщику</h4><p>Сколько времени занимает замена блока в шкафу и по какому протоколу BMS отдаёт данные.</p><p class='ogoh'>Камера обязательно видит ворота и зону погрузки: крупное оборудование выходит только там. Дальность ИК-подсветки ночью проверяется при обследовании.</p>"
    }
  },
  "s-tarkib.qator6": {
    yorliq: "Montajchi uchun",
    sarlavha: "Ko'p qavatli uydagi xonadon: qo'shnilar va boshqaruv",
    tana: "<p>18 xonadon texnik jihatdan eng oson guruh: aloqa bor, tarmoq yonida. Qiyinligi boshqa joyda: uy umumiy mulk, unda qo'shnilar yashaydi.</p><h4>Qoidalar</h4><ul><li>Kamera xonadon ichida o'rnatiladi va kirish eshigiga ichkaridan qaraydi.</li><li>Zinapoya va hovli kabi umumiy joylarga kamera qo'yish uchun uy-joy mulkdorlari shirkati yoki boshqaruv kompaniyasi bilan kelishiladi.</li><li>Qo'shni eshigi va derazasi kadrga tushmaydi.</li></ul><h4>Mos yechim</h4><ul><li>Reolink batareyali kamera va Home Hub (yechim 01) yoki elektrni qayta ulash.</li><li>Eshik datchigi va suv sizishi datchigi: yuqoridan suv bosishi xonadon uchun eng ko'p uchraydigan zarar.</li></ul><h4>Tipik xavflar</h4><p>Ruxsatsiz kirib yashash, qo'shnilar bilan nizo, kommunal qarz, suv bosishi va quvur yorilishi qishda.</p><p>Kalit va umumiy eshik kodi shirkatdan olinadi: servis tashrifida montajchi yo'lda qolmaydi.</p><p class='ogoh'>Shirkat raisi bilan tanishish foydali: u bo'sh xonadondagi shovqin yoki suvni birinchi bo'lib ko'radi va bankka xabar beradi.</p>",
    manba: [],
    ru: {
      yorliq: "Для монтажника",
      sarlavha: "Квартира в многоэтажке: соседи и управление домом",
      tana: "<p>18 квартир — технически самая простая группа: связь есть, сеть рядом. Сложность в другом: дом — общая собственность, в нём живут соседи.</p><h4>Правила</h4><ul><li>Камера ставится внутри квартиры и смотрит на входную дверь изнутри.</li><li>Камеру в местах общего пользования — подъезд, двор — согласовывают с товариществом собственников жилья или управляющей компанией.</li><li>Дверь и окна соседей в кадр не попадают.</li></ul><h4>Подходящее решение</h4><ul><li>Камера Reolink на батарее и Home Hub (решение 01) или подключение к сети.</li><li>Датчики двери и протечки: залив сверху — самый частый ущерб для квартиры.</li></ul><h4>Типичные риски</h4><p>Самовольное вселение, конфликты с соседями, коммунальные долги, залив и прорыв труб зимой.</p><p>Ключи и код подъезда берут в товариществе: монтажник не застрянет у двери при сервисном выезде.</p><p class='ogoh'>Полезно познакомиться с председателем товарищества: он первым заметит шум или воду в пустой квартире и сообщит банку.</p>"
    }
  },
  "s-tarkib.qator7": {
    yorliq: "Montajchi uchun",
    sarlavha: "Savdo do'koni: ko'cha, oyna va xaridor",
    tana: "<p>18 do'kon odatda ko'cha bo'yida, oldi oyna va jalyuzi bilan. Joyi yaxshi bo'lgani uchun do'kon tezroq sotiladi, demak uni ko'rkam holatda saqlash kerak.</p><h4>Mos yechim</h4><ul><li>Batareyali kamera va Home Hub (yechim 01) yoki elektrni qayta ulash.</li><li>Ajax eshik va oyna sinishi datchiklari (yechim 05): oyna sinsa, datchik signali kamera klipidan oldin keladi.</li><li>Tashqarida ko'rinib turgan kamera va «Kuzatuv olib borilmoqda» yozuvi o'zi bir qism buzuqchini qaytaradi.</li></ul><h4>Tipik xavflar</h4><ul><li>Vitrina sindirish, graffiti va vandalizm.</li><li>Jalyuzi qulfini buzish.</li><li>E'lon osish va ijaraga ruxsatsiz berish.</li></ul><h4>Sotuvga foydasi</h4><p>Ichki kamera xaridorga do'konni masofadan ko'rsatadi. Joyida ko'rsatuv uchun xodimni chaqirish shart bo'lmaydi.</p><p>Oyna sinishi datchigi va kamera bitta hodisaga birlashtiriladi: operator signal bilan birga kadrni ko'radi.</p><p class='ogoh'>Kamera ko'chaning o'zini emas, vitrina va eshikni olishi kerak: begona o'tkinchilarni doimiy yozish talab qilinmaydi.</p>",
    manba: [],
    ru: {
      yorliq: "Для монтажника",
      sarlavha: "Магазин: улица, витрина и покупатель",
      tana: "<p>18 магазинов обычно стоят на улице, фасад из стекла и роллет. Место хорошее, такой объект продаётся быстрее, поэтому его нужно держать в приличном виде.</p><h4>Подходящее решение</h4><ul><li>Камера на батарее и Home Hub (решение 01) или подключение к сети.</li><li>Датчики двери и разбития стекла Ajax (решение 05): сигнал о разбитой витрине приходит раньше клипа с камеры.</li><li>Заметная камера снаружи и табличка «Ведётся видеонаблюдение» сами отпугивают часть нарушителей.</li></ul><h4>Типичные риски</h4><ul><li>Разбитая витрина, граффити и вандализм.</li><li>Взлом замка роллеты.</li><li>Расклейка объявлений и самовольная сдача в аренду.</li></ul><h4>Польза для продажи</h4><p>Внутренняя камера показывает магазин покупателю удалённо. Вызывать сотрудника на показ не обязательно.</p><p>Датчик разбития стекла и камера объединяются в одно событие: оператор видит кадр вместе с сигналом.</p><p class='ogoh'>Камера снимает витрину и дверь, а не саму улицу: постоянно записывать прохожих не требуется.</p>"
    }
  },
  "s-tarkib.qator8": {
    yorliq: "Montajchi uchun",
    sarlavha: "Turar joy: hovli, devor va mahalla",
    tana: "<p>16 xususiy uy hovli, devor va darvoza bilan. Uy ichi ko'chadan ko'rinmaydi, shuning uchun buzilish kunlab sezilmay qolishi mumkin.</p><h4>Mos yechim</h4><ul><li>Hovliga quyosh-4G kamera (yechim 02): darvoza va uy eshigini oladi.</li><li>Uy ichida bitta batareyali kamera yoki eshik datchigi.</li><li>Elektr ustuni yonida bo'lsa, qayta ulash arzonroq.</li></ul><h4>Tipik xavflar</h4><ul><li>Qarindosh yoki sobiq egasi tomonidan ruxsatsiz egallash.</li><li>Qo'shnilar tomonidan qurilish materiali, darvoza va quvurni olib ketish.</li><li>Tomdan suv o'tishi va qishda isitishsiz qolgan quvur yorilishi.</li></ul><h4>Mahalla bilan ishlash</h4><p>Mahalla raisi va qo'shnilar uyning bankka o'tganini bilishi foydali. Ular begona odamni birinchi bo'lib ko'radi.</p><p>Kamera qo'shni hovlisiga qaramasligi kerak. O'rnatishda burchak shunday tanlanadi, qo'shni hovli kadrga tushmaydi.</p><p class='ogoh'>Sobiq egasi bilan nizo bo'lsa, kamera yozuvi ijro jarayonida dalil bo'ladi. Klip xeshi bilan saqlanadi.</p>",
    manba: [],
    ru: {
      yorliq: "Для монтажника",
      sarlavha: "Жилой дом: двор, стена и махалля",
      tana: "<p>16 частных домов — со двором, стеной и воротами. Изнутри с улицы не видно, поэтому проникновение может оставаться незамеченным днями.</p><h4>Подходящее решение</h4><ul><li>Солнечная 4G-камера во дворе (решение 02): видит ворота и дверь дома.</li><li>Внутри дома — одна камера на батарее или датчик двери.</li><li>Если рядом столб электросети, дешевле подключиться.</li></ul><h4>Типичные риски</h4><ul><li>Самовольное занятие родственниками или бывшим владельцем.</li><li>Соседи уносят стройматериалы, ворота и трубы.</li><li>Протечка кровли, прорыв труб без отопления зимой.</li></ul><h4>Работа с махаллей</h4><p>Полезно, чтобы председатель махалли и соседи знали, что дом перешёл банку. Они первыми замечают посторонних.</p><p>Камера не должна смотреть в соседний двор. Угол при установке выбирают так, чтобы чужой двор не попадал в кадр.</p><p class='ogoh'>При споре с бывшим владельцем запись с камеры станет доказательством в исполнительном производстве. Клип хранится с хешем.</p>"
    }
  },
  "s-tarkib.qator9": {
    yorliq: "Montajchi uchun",
    sarlavha: "Omborxona: darvoza va katta ichki hajm",
    tana: "<p>12 ombor asosan sanoat zonasida yoki shahar chetida. Ichki hajm katta, kirish esa bir-ikki darvozadan.</p><h4>Mos yechim</h4><ul><li>Tashqarida quyosh-4G kamera (yechim 02 yoki 03): darvoza va yuk maydonchasi.</li><li>Ichkarida LoRaWAN eshik, tutun va harorat datchiklari (yechim 06): trafik deyarli yo'q, batareya 5 yilgacha.</li><li>Bir zonada bir nechta ombor bo'lsa: klaster shkafi (yechim 10).</li></ul><h4>Tipik xavflar</h4><ul><li>Darvoza qulfini kesish, tunda yuk mashinasi bilan kirish.</li><li>Devor tunukasi va tom qoplamasini yechish.</li><li>Ichkarida qolgan yukning buzilishi: namlik va kemiruvchi.</li></ul><h4>Yetkazuvchiga savol</h4><p>LoRaWAN shlyuzi ombor devori orqali necha metrni oladi va 4G uzilganda hodisalarni qancha saqlaydi.</p><p class='ogoh'>Ombor ichidagi yuk kimga tegishli ekanini ko'rikdan oldin aniqlash kerak. Uchinchi shaxs mulki bo'lsa, u alohida dalolatnoma bilan qayd etiladi.</p>",
    manba: [],
    ru: {
      yorliq: "Для монтажника",
      sarlavha: "Склад: ворота и большой внутренний объём",
      tana: "<p>12 складов в основном в промзоне или на окраине города. Внутренний объём большой, а вход — через одни-двое ворот.</p><h4>Подходящее решение</h4><ul><li>Снаружи солнечная 4G-камера (решение 02 или 03): ворота и погрузочная площадка.</li><li>Внутри датчики двери, дыма и температуры LoRaWAN (решение 06): трафика почти нет, батарея до 5 лет.</li><li>Если в одной зоне несколько складов — кластерный шкаф (решение 10).</li></ul><h4>Типичные риски</h4><ul><li>Срезка замка на воротах, ночной заезд грузовика.</li><li>Демонтаж профнастила стен и кровли.</li><li>Порча оставшегося груза: влага и грызуны.</li></ul><h4>Вопрос поставщику</h4><p>Какую дальность даёт шлюз LoRaWAN через стены склада и сколько событий он хранит при обрыве 4G.</p><p class='ogoh'>До осмотра нужно выяснить, кому принадлежит груз внутри склада. Если это имущество третьего лица, его фиксируют отдельным актом.</p>"
    }
  },
  "s-tarkib.qator10": {
    yorliq: "Montajchi uchun",
    sarlavha: "Issiqxona: oyna, maydon va sovuq",
    tana: "<p>6 issiqxona uzun, shaffof va devorsiz. Kamerani mahkamlash joyi kam, yorug'lik va shamol ko'p.</p><h4>Mos yechim</h4><ul><li>Katta maydon uchun mobil minora (yechim 09), ijaraga. Bir yil ichida sotiladigan obyektga minora sotib olish oqlanmaydi.</li><li>Kichik issiqxonada: kirish yo'lagiga qaratilgan bitta-ikki quyosh-4G kamera, alohida ustunda.</li></ul><h4>Tipik xavflar</h4><ul><li>Oyna yoki polikarbonat varaqlarini yechib olish.</li><li>Isitish qozoni, nasos va quvurlar.</li><li>Qishda qor og'irligidan karkas bukilishi: bu o'g'irlik emas, lekin qiymat yo'qotiladi.</li></ul><h4>Qaror</h4><p>6 obyekt uchun alohida minora olish shart emas. Bitta ijara minorasi navbat bilan ko'chiriladi yoki issiqxona tezkor sotuv ro'yxatiga qo'yiladi.</p><p>Ijara shartnomasiga oylik narx, yetkazish va qaytarish xarajati, minorani kim sug'urtalashi yoziladi.</p><p class='ogoh'>Kamera kunduzi quyoshga qarab qolmasligi kerak: ko'rikda yo'nalish tong va kechki nurga qarab tanlanadi.</p>",
    manba: [],
    ru: {
      yorliq: "Для монтажника",
      sarlavha: "Теплица: стекло, площадь и холод",
      tana: "<p>6 теплиц — длинные, прозрачные, без стен. Крепить камеру почти некуда, много света и ветра.</p><h4>Подходящее решение</h4><ul><li>Для большой площади — мобильная вышка (решение 09) в аренду. Покупать вышку ради объекта, который продадут в течение года, невыгодно.</li><li>Для небольшой теплицы — одна-две солнечные 4G-камеры на отдельной опоре, направленные на въезд.</li></ul><h4>Типичные риски</h4><ul><li>Демонтаж стекла или листов поликарбоната.</li><li>Котёл отопления, насос и трубы.</li><li>Прогиб каркаса под снегом зимой: это не кража, но стоимость теряется.</li></ul><h4>Решение</h4><p>Покупать отдельную вышку на 6 объектов не нужно. Одна арендованная вышка переставляется по очереди, или теплица включается в список срочной продажи.</p><p>В договоре аренды вышки прописывают месячную плату, доставку и возврат, а также кто страхует вышку.</p><p class='ogoh'>Днём камера не должна смотреть против солнца: направление выбирают при осмотре с учётом утреннего и вечернего света.</p>"
    }
  },
  "s-tarkib.qator11": {
    yorliq: "Montajchi uchun",
    sarlavha: "Yuk avtomobili: 6 ta, yoqilg'i va ehtiyot qism",
    tana: "<p>Yuk mashinasi yengil avtomobildan qimmat va uni qismlarga bo'lish osonroq. Nazorat tartibi xuddi shunday, lekin qattiqroq.</p><h4>Tartib</h4><ul><li>Faqat qo'riqlanadigan maydonda saqlash. Ochiq hovlida qoldirilmaydi.</li><li>Ikkita yashirin GPS treker: biri kabinada, biri ramada. Bittasi topilsa, ikkinchisi ishlaydi.</li><li>Yoqilg'i baki, kabina va akkumulyator qutisiga raqamli plomba.</li><li>G'ildiraklar soni va shina holati ko'rikda suratga olinadi.</li></ul><h4>Tipik xavflar</h4><ul><li>Dizel yoqilg'isini to'kish.</li><li>G'ildirak, akkumulyator, starter va elektr uskunalarini almashtirish.</li><li>Uzoq turishdan tormoz va shinalarning ishdan chiqishi.</li></ul><h4>Maydon tanlash</h4><p>Maydon yirik shaharda bo'lsa yaxshi: xaridor mashinani ko'rishga keladi va sotuv tezlashadi. Maydonda bitta kamera tizimi barcha transportni yopadi.</p><p class='ogoh'>Yuk mashinasi uchun maydon ijarasi va yillik texnik ko'rik xarajati sotuv narxi bilan solishtiriladi. Uzoq saqlash qiymatni yeydi.</p>",
    manba: [],
    ru: {
      yorliq: "Для монтажника",
      sarlavha: "Грузовик: 6 единиц, топливо и запчасти",
      tana: "<p>Грузовик дороже легкового автомобиля, и его проще разобрать на части. Порядок контроля тот же, только строже.</p><h4>Порядок</h4><ul><li>Хранение только на охраняемой площадке. Во дворе без охраны не оставляют.</li><li>Два скрытых GPS-трекера: один в кабине, другой на раме. Найдут один — работает второй.</li><li>Номерные пломбы на топливный бак, кабину и ящик аккумулятора.</li><li>Число колёс и состояние шин фотографируются при осмотре.</li></ul><h4>Типичные риски</h4><ul><li>Слив дизельного топлива.</li><li>Подмена колёс, аккумулятора, стартера и электрооборудования.</li><li>Отказ тормозов и шин от длительного простоя.</li></ul><h4>Выбор площадки</h4><p>Лучше площадка в крупном городе: покупатель приезжает посмотреть машину, и продажа ускоряется. Одна система камер на площадке закрывает весь транспорт.</p><p class='ogoh'>Аренду площадки и годовой техосмотр грузовика сравнивают с ценой продажи. Долгое хранение съедает стоимость.</p>"
    }
  },
  "s-tarkib.qator12": {
    yorliq: "Montajchi uchun",
    sarlavha: "Maxsus texnika: bitta birlik, alohida yondashuv",
    tana: "<p>Balansda bitta maxsus texnika bor: traktor, ekskavator yoki shunga o'xshash mashina. Birlik bitta bo'lsa ham, qiymati bir nechta avtomobilga teng bo'lishi mumkin.</p><h4>Nazorat</h4><ul><li>Qo'riqlanadigan maydonga ko'chirish. Ko'chirib bo'lmasa, turgan joyiga quyosh-4G kamera.</li><li>O'z batareyasidagi yashirin GPS treker va qiyalik datchigi: tralga ortilsa signal keladi.</li><li>Gidravlika, kabina va yoqilg'i bakiga plomba.</li></ul><h4>Tipik xavflar</h4><p>Gidravlik nasos, silindr, cho'mich va akkumulyatorni yechish. Bu qismlar alohida yaxshi sotiladi.</p><h4>Qaror</h4><p>Bitta birlik uchun alohida yechim loyihalash qimmat. Eng tejamli yo'l: texnikani yaqin qo'riqlanadigan maydonga olib borish va tezkor sotuv ro'yxatiga qo'yish.</p><p>Treker signali kelsa, operator darhol ichki xavfsizlik xizmatiga xabar beradi: texnika tez olib ketiladi.</p><p class='ogoh'>Texnikani ko'chirish uchun tral va haydovchi kerak. Bu xarajat ko'chirish qarorida hisobga olinadi.</p>",
    manba: [],
    ru: {
      yorliq: "Для монтажника",
      sarlavha: "Спецтехника: одна единица, особый подход",
      tana: "<p>На балансе одна единица спецтехники: трактор, экскаватор или подобная машина. Единица одна, но стоить она может как несколько автомобилей.</p><h4>Контроль</h4><ul><li>Перевезти на охраняемую площадку. Если нельзя — солнечная 4G-камера на месте стоянки.</li><li>Скрытый GPS-трекер на собственной батарее и датчик наклона: при погрузке на трал приходит сигнал.</li><li>Пломбы на гидравлику, кабину и топливный бак.</li></ul><h4>Типичные риски</h4><p>Снятие гидронасоса, цилиндров, ковша и аккумулятора. Эти узлы хорошо продаются по отдельности.</p><h4>Решение</h4><p>Проектировать отдельное решение ради одной единицы дорого. Самый экономный путь — перевезти технику на ближайшую охраняемую площадку и включить в список срочной продажи.</p><p>При сигнале трекера оператор сразу сообщает в службу безопасности банка: технику увозят быстро.</p><p class='ogoh'>Для перевозки нужны трал и водитель. Эти расходы учитываются при решении о перемещении.</p>"
    }
  },

  /* ======================= 05 · s-xatar ======================= */
  "s-xatar.karta1": {
    yorliq: "Texnik izoh",
    sarlavha: "LiFePO4 va qish: nega zaryad to'xtatiladi",
    tana: "<p>LiFePO4 akkumulyator sovuqda razryad bera oladi, lekin zaryad ololmaydi. 0 °C dan past haroratda zaryad toki anodda metall litiy qatlamini hosil qiladi. Sig'im qaytmas darajada yo'qoladi, ichki qisqa tutashuv xavfi paydo bo'ladi.</p><h4>Ishlab chiqaruvchi nima deydi</h4><p>Hikvision DS-2XS2T41G1-ID/4G quyosh kamerasining datasheet'ida akkumulyator zaryadi 0…45 °C, razryadi −20…50 °C oralig'ida berilgan. Ya'ni kamera qishda ishlaydi, lekin sovuq tongda panel zaryad bermaydi.</p><h4>Shartnomaga yoziladigan talablar</h4><ul><li>BMS 0 °C dan past haroratda zaryadni avtomatik to'xtatadi.</li><li>Isitish plyonkali akkumulyator yoki issiqlik izolyatsiyali shkaf: panel energiyasining bir qismi avval isitishga ketadi.</li><li>Zavod hujjatida zaryad va razryad harorati alohida ko'rsatiladi.</li><li>Kafolat qish mavsumini ham qamraydi.</li></ul><h4>Nima o'lchanadi</h4><p>Pilotda har bir akkumulyatorning harorati va zaryad holati telemetriyaga keladi. Qishdan keyin sig'im qancha qolgani komplekt tanlovini tasdiqlaydi yoki rad etadi.</p><p class='ogoh'>Himoyasiz arzon akkumulyator birinchi qishda ishdan chiqadi va butun komplekt narxi yo'qotiladi.</p>",
    manba: [],
    ru: {
      yorliq: "Техническая справка",
      sarlavha: "LiFePO4 и зима: почему заряд отключают",
      tana: "<p>Аккумулятор LiFePO4 на морозе отдаёт энергию, но принимать заряд не может. Ток заряда ниже 0 °C осаждает на аноде металлический литий. Ёмкость теряется безвозвратно, появляется риск внутреннего замыкания.</p><h4>Что говорит производитель</h4><p>В datasheet солнечной камеры Hikvision DS-2XS2T41G1-ID/4G заряд аккумулятора указан в диапазоне 0…45 °C, разряд — −20…50 °C. То есть зимой камера работает, но холодным утром панель её не заряжает.</p><h4>Требования в договор</h4><ul><li>BMS автоматически прекращает заряд ниже 0 °C.</li><li>Аккумулятор с подогревающей плёнкой или утеплённый шкаф: часть энергии панели сначала идёт на подогрев.</li><li>Температура заряда и разряда указаны в заводской документации отдельно.</li><li>Гарантия распространяется и на зимний сезон.</li></ul><h4>Что измеряется</h4><p>В пилоте температура и степень заряда каждого аккумулятора передаются в телеметрию. Остаточная ёмкость после зимы подтвердит или отменит выбор комплекта.</p><p class='ogoh'>Дешёвый аккумулятор без защиты выходит из строя в первую же зиму, и теряется стоимость всего комплекта.</p>"
    }
  },
  "s-xatar.karta2": {
    yorliq: "Montajchi uchun",
    sarlavha: "Panel va akkumulyator dekabrga hisoblanadi",
    tana: "<p>Toshkentda gorizontal yuzaga tushadigan quyosh energiyasi dekabrda kuniga 1,62 kVt·soat/m², iyunda 7,60. Farq 4,7 baravar. Zavod komplekti ko'pincha o'rtacha yillik qiymatga hisoblanadi va qishda o'chib qoladi.</p><h4>Hisob misoli</h4><table><tr><th>Ko'rsatkich</th><th>Dekabr</th><th>Iyun</th></tr><tr><td>Kamera iste'moli, 1,85 Vt × 24 soat</td><td class='n'>44 Vt·soat</td><td class='n'>44 Vt·soat</td></tr><tr><td>Quyosh, kVt·soat/m² kuniga</td><td class='n'>1,62</td><td class='n'>7,60</td></tr><tr><td>Kerakli panel, tizim FIK 70%</td><td class='n'>≈ 39 Vt</td><td class='n'>≈ 8 Vt</td></tr></table><p>Bulutli kunlar uchun zaxira: 5 kun × 44 Vt·soat, 0,8 razryad chuqurligi bilan 275 Vt·soat, ya'ni 12,8 V da 22 A·soat. Kalkulyator va uchta profil 29-slaydda.</p><h4>Montajchi uchun</h4><ul><li>Panel janubga, qishki burchakda: Toshkent kengligida taxminan 55°.</li><li>Soya tekshiruvi 21-dekabr quyoshi bo'yicha: daraxt va qo'shni bino.</li><li>Qor va chang tozalash servis jadvalida.</li></ul><p>Panel va akkumulyator hajmi tender shartida vatt va amper-soat bilan yoziladi, «quyosh komplekti» degan umumiy so'z bilan emas.</p><p class='ogoh'>Hisob taxminiy. Aniq qiymat obyekt koordinatasi bo'yicha PVGIS yoki shunga o'xshash xizmatda olinadi.</p>",
    manba: [["PVGIS, JRC", "https://re.jrc.ec.europa.eu/pvg_tools/en/"]],
    ru: {
      yorliq: "Для монтажника",
      sarlavha: "Панель и аккумулятор считают по декабрю",
      tana: "<p>В Ташкенте на горизонтальную поверхность в декабре приходится 1,62 кВт·ч/м² солнечной энергии в сутки, в июне — 7,60. Разница в 4,7 раза. Заводской комплект часто рассчитан на среднегодовое значение и зимой отключается.</p><h4>Пример расчёта</h4><table><tr><th>Показатель</th><th>Декабрь</th><th>Июнь</th></tr><tr><td>Потребление камеры, 1,85 Вт × 24 ч</td><td class='n'>44 Вт·ч</td><td class='n'>44 Вт·ч</td></tr><tr><td>Солнце, кВт·ч/м² в сутки</td><td class='n'>1,62</td><td class='n'>7,60</td></tr><tr><td>Нужная панель при КПД системы 70%</td><td class='n'>≈ 39 Вт</td><td class='n'>≈ 8 Вт</td></tr></table><p>Запас на пасмурные дни: 5 дней × 44 Вт·ч при глубине разряда 0,8 — 275 Вт·ч, то есть 22 А·ч при 12,8 В. Калькулятор и три профиля — на слайде 29.</p><h4>Монтажнику</h4><ul><li>Панель на юг, под зимним углом: для широты Ташкента около 55°.</li><li>Проверка тени по солнцу 21 декабря: деревья и соседние здания.</li><li>Очистка от снега и пыли — в графике сервиса.</li></ul><p>Мощность панели и ёмкость аккумулятора в тендере указывают в ваттах и ампер-часах, а не общим словом «солнечный комплект».</p><p class='ogoh'>Расчёт оценочный. Точные значения берутся по координатам объекта в PVGIS или аналогичном сервисе.</p>"
    }
  },
  "s-xatar.karta3": {
    yorliq: "Moliya va huquq",
    sarlavha: "O'RQ-778: kim qo'riqlay oladi",
    tana: "<p>«Qo'riqlash faoliyati to'g'risida»gi qonun 2022-yil 15-iyunda qabul qilingan va 16-sentabrdan kuchga kirgan.</p><h4>Asosiy moddalar</h4><table><tr><th>Modda</th><th>Mazmuni</th></tr><tr><td>9</td><td>Qo'riqlashni davlat organlarining qo'riqlash bo'linmalari, idoraviy harbiylashtirilgan va idoraviy qorovullik bo'linmalari olib boradi</td></tr><tr><td>12</td><td>Tashkilot o'z obyektini qo'riqlash uchun idoraviy qorovullik bo'linmasi tuza oladi</td></tr><tr><td>13</td><td>Shartnoma asosida qo'riqlash xizmatini qonunda ko'rsatilgan davlat organlari ko'rsatadi, jumladan IIV</td></tr></table><h4>Bank uchun xulosa</h4><ul><li>Xususiy qo'riqlash kompaniyasi bilan shartnoma tuzilmaydi.</li><li>Tanlov ikkita: o'z qorovuli yoki IIV huzuridagi Qo'riqlash departamenti.</li><li>Kamera va datchik tizimi qo'riqlash xizmati emas, bank o'zi o'rnatadi va o'zi kuzatadi.</li><li>Signal kelganda tezkor javob guruhini chaqirish departament bilan alohida shartnomada kelishiladi.</li></ul><p>Tezkor javob guruhi shartnomasida chaqiruv tartibi, kelish vaqti va narxi yoziladi.</p><p class='ogoh'>Integrator bilan tuzilgan shartnomada «qo'riqlash» so'zi ishlatilmaydi: predmet — jihozni yetkazish, o'rnatish va servis.</p>",
    manba: [["lex.uz: O'RQ-778", "https://lex.uz/uz/docs/-6066682"]],
    ru: {
      yorliq: "Финансы и право",
      sarlavha: "ЗРУ-778: кто вправе охранять",
      tana: "<p>Закон «Об охранной деятельности» принят 15 июня 2022 года и вступил в силу с 16 сентября.</p><h4>Ключевые статьи</h4><table><tr><th>Статья</th><th>Содержание</th></tr><tr><td>9</td><td>Охрану осуществляют охранные подразделения государственных органов, ведомственные военизированные и ведомственные сторожевые подразделения</td></tr><tr><td>12</td><td>Организация вправе создать ведомственное сторожевое подразделение для охраны своих объектов</td></tr><tr><td>13</td><td>Охрану по договору оказывают государственные органы, указанные в законе, в том числе МВД</td></tr></table><h4>Вывод для банка</h4><ul><li>Договор с частной охранной компанией не заключается.</li><li>Выбор из двух: собственные сторожа или Департамент охраны при МВД.</li><li>Система камер и датчиков — не охранная услуга: банк сам её ставит и сам наблюдает.</li><li>Выезд группы реагирования по тревоге согласуется с департаментом отдельным договором.</li></ul><p>В договоре на группу реагирования прописывают порядок вызова, время прибытия и цену.</p><p class='ogoh'>В договоре с интегратором слово «охрана» не используется: предмет — поставка, монтаж и сервис оборудования.</p>"
    }
  },
  "s-xatar.karta4": {
    yorliq: "Moliya va huquq",
    sarlavha: "O'RQ-1125: biometrik ma'lumot mamlakat ichida",
    tana: "<p>O'RQ-1125 (2026-yil 26-mart) shaxsga doir ma'lumotlar qonunining 27-1-moddasini o'zgartirdi. Majburiy lokalizatsiya endi biometrik, genetik ma'lumotga va aloqa operatori abonentlari ma'lumotiga tegishli.</p><h4>Loyiha uchun nimani anglatadi</h4><table><tr><th>Ma'lumot</th><th>Qayerda saqlanadi</th></tr><tr><td>Yuzni tanish shabloni, barmoq izi</td><td>Faqat O'zbekistonda, bank serverida</td></tr><tr><td>Oddiy video va kadr</td><td>Qonun shartlari bilan, lekin bankda saqlash tavsiya etiladi</td></tr><tr><td>Qurilma telemetriyasi</td><td>Shaxsga doir emas, cheklov yo'q</td></tr></table><h4>Amaliy qoidalar</h4><ul><li>Kirish terminalida yuzni tanish yoqilsa, shablon ishlab chiqaruvchining bulutiga yuborilmaydi.</li><li>Kamera va hub bulut xizmati o'chirilgan holda sozlanadi, ma'lumot VPN orqali bankka keladi.</li><li>Smetaga bank serveri va zaxira nusxasi alohida qator bo'lib kiradi.</li><li>Kirish huquqi rollar bilan cheklanadi, har bir ko'rish jurnalda.</li></ul><p>Video saqlash muddati ichki hujjatda belgilanadi: masalan, oddiy hodisa 90 kun, nizoli hodisa sud tugaguncha.</p><p class='ogoh'>Yuzni tanish majburiy emas. Pilotda uni o'chirib qo'yish huquqiy talablarni soddalashtiradi, kerak bo'lsa keyin yoqiladi.</p>",
    manba: [],
    ru: {
      yorliq: "Финансы и право",
      sarlavha: "ЗРУ-1125: биометрия хранится внутри страны",
      tana: "<p>ЗРУ-1125 (26 марта 2026 года) изменил статью 27-1 закона о персональных данных. Обязательная локализация теперь касается биометрических и генетических данных, а также данных абонентов операторов связи.</p><h4>Что это значит для проекта</h4><table><tr><th>Данные</th><th>Где хранятся</th></tr><tr><td>Шаблон лица, отпечаток пальца</td><td>Только в Узбекистане, на сервере банка</td></tr><tr><td>Обычное видео и кадры</td><td>На условиях закона, но рекомендуется хранить в банке</td></tr><tr><td>Телеметрия устройств</td><td>Не персональные данные, ограничений нет</td></tr></table><h4>Практические правила</h4><ul><li>Если на терминале доступа включено распознавание лиц, шаблон не отправляется в облако производителя.</li><li>Камеры и хабы настраиваются с отключённым облачным сервисом, данные идут в банк через VPN.</li><li>Сервер банка и резервная копия — отдельной строкой в смете.</li><li>Доступ ограничен ролями, каждый просмотр — в журнале.</li></ul><p>Срок хранения видео задаётся внутренним документом: например, обычное событие 90 дней, спорное — до конца суда.</p><p class='ogoh'>Распознавание лиц не обязательно. Если выключить его в пилоте, правовые требования упрощаются; при необходимости его включат позже.</p>"
    }
  },
  "s-xatar.karta5": {
    yorliq: "Moliya va huquq",
    sarlavha: "2696-son nizom: bir yillik muddat",
    tana: "<p>MB Boshqaruvining 2015-yil 14-iyuldagi 2696-son nizomi tijorat banklarida aktivlar sifatini tasniflash va zaxira yaratish tartibini belgilaydi.</p><h4>20-band</h4><p>Garov hisobidan undirilgan ko'chmas mulk va boshqa mol-mulk balansga qabul qilingan kundan bir yil ichida sotilmasa, «umidsiz» deb tasniflanadi. Garovga aloqasi bo'lmagan va foydalanilmayotgan bank mulki uchun muddat uch yil.</p><h4>Zaxira stavkalari</h4><table><tr><th>Toifa</th><th>Zaxira</th></tr><tr><td>Standart</td><td class='n'>1%</td></tr><tr><td>Substandart</td><td class='n'>10%</td></tr><tr><td>Qoniqarsiz</td><td class='n'>25%</td></tr><tr><td>Shubhali</td><td class='n'>50%</td></tr><tr><td>Umidsiz</td><td class='n'>100%</td></tr></table><h4>Nazorat bilan bog'liqligi</h4><p>Muddatni nazorat uzaytirmaydi. U obyekt qiymatini saqlaydi va sotuvni tezlashtiradi: xaridor obyektni video orqali ko'radi, auksionda talon-taroj qilingan bino chiqmaydi.</p><p>Muddat hisobi platformada ko'rinadi: obyekt kartochkasida balansga olingan sana va «umidsiz» toifagacha qolgan kunlar.</p><p class='ogoh'>2026-yil 10-sentabrda MB 3937-son yangi tasniflash nizomini ro'yxatdan o'tkazdi. Unda ham besh toifa va 1–100% stavkalar saqlangan. Balansga olingan mulk bo'yicha qoida yangi matnda tekshirilishi kerak.</p>",
    manba: [["lex.uz: 2696", "https://lex.uz/docs/-2703053"], ["spot.uz: 3937", "https://www.spot.uz/oz/2026/09/14/bank-assets"]],
    ru: {
      yorliq: "Финансы и право",
      sarlavha: "Положение № 2696: срок в один год",
      tana: "<p>Положение Правления ЦБ № 2696 от 14 июля 2015 года устанавливает порядок классификации качества активов и формирования резервов в коммерческих банках.</p><h4>Пункт 20</h4><p>Недвижимость и иное имущество, взысканные в счёт залога, если они не проданы в течение года со дня принятия на баланс, классифицируются как «безнадёжные». Для неиспользуемого имущества банка, не связанного с залогом, срок — три года.</p><h4>Ставки резерва</h4><table><tr><th>Категория</th><th>Резерв</th></tr><tr><td>Стандартные</td><td class='n'>1%</td></tr><tr><td>Субстандартные</td><td class='n'>10%</td></tr><tr><td>Неудовлетворительные</td><td class='n'>25%</td></tr><tr><td>Сомнительные</td><td class='n'>50%</td></tr><tr><td>Безнадёжные</td><td class='n'>100%</td></tr></table><h4>Связь с контролем</h4><p>Контроль срок не продлевает. Он сохраняет стоимость объекта и ускоряет продажу: покупатель смотрит объект по видео, на аукцион не выходит разграбленное здание.</p><p>Отсчёт срока виден в платформе: в карточке объекта — дата принятия на баланс и дни до категории «безнадёжные».</p><p class='ogoh'>10 сентября 2026 года ЦБ зарегистрировал новое положение о классификации № 3937. В нём сохранены пять категорий и ставки 1–100%. Норму о принятом на баланс имуществе нужно сверить с новым текстом.</p>"
    }
  },
  "s-xatar.karta6": {
    yorliq: "Rahbariyat uchun",
    sarlavha: "Qayta ulash: ko'p obyektda eng arzon yo'l",
    tana: "<p>Avtonom quvvat har doim ham kerak emas. Shahar va tuman markazidagi bino tarmoqdan bir necha metr narida turadi. Uni qayta ulasangiz, komplekt ancha soddalashadi.</p><h4>Taqqoslash, bir obyekt</h4><table><tr><th>Qator</th><th>Qayta ulash</th><th>Avtonom</th></tr><tr><td>Boshlang'ich xarajat</td><td class='n'>39 600 so'm texnik shart va hisoblagich</td><td class='n'>panel, akkumulyator, shkaf</td></tr><tr><td>Oylik xarajat</td><td class='n'>≈ 38 500 so'm</td><td class='n'>servis tashrifi</td></tr><tr><td>Qish</td><td>farqi yo'q</td><td>quyosh 4,7 baravar kam</td></tr><tr><td>Muddati</td><td>3 ish kuni</td><td>ko'rik va yetkazish</td></tr></table><p>38 500 so'm: 40–60 Vt tugun oyiga taxminan 30–45 kVt·soat sarflaydi, yuridik shaxs tarifi bo'yicha.</p><h4>Qachon ulanmaydi</h4><ul><li>Tarmoq uzoq: ustun va kabel tortish qimmat.</li><li>Obyekt qarzi yoki huquqiy nizo bor.</li><li>Obyekt bir-ikki oyda sotiladi: ko'chma stansiya tezroq.</li></ul><p>Qaror energetika bo'limi bilan birga qabul qilinadi: hisoblagich kimning nomiga ochiladi va to'lov qaysi hisobdan.</p><p class='ogoh'>Ulangan obyektda yong'in xavfi paydo bo'ladi. Faqat nazorat tuguni liniyasi yoqiladi, qolgan guruhlar o'chirilib, plomba qo'yiladi.</p>",
    manba: [],
    ru: {
      yorliq: "Для руководства",
      sarlavha: "Подключение к сети: для многих объектов дешевле всего",
      tana: "<p>Автономное питание нужно не всегда. Здание в центре города или района стоит в нескольких метрах от сети. Повторное подключение сильно упрощает комплект.</p><h4>Сравнение, один объект</h4><table><tr><th>Строка</th><th>Подключение</th><th>Автономно</th></tr><tr><td>Начальные затраты</td><td class='n'>39 600 сумов за ТУ и счётчик</td><td class='n'>панель, аккумулятор, шкаф</td></tr><tr><td>В месяц</td><td class='n'>≈ 38 500 сумов</td><td class='n'>выезды сервиса</td></tr><tr><td>Зима</td><td>без разницы</td><td>солнца в 4,7 раза меньше</td></tr><tr><td>Срок</td><td>3 рабочих дня</td><td>обследование и поставка</td></tr></table><p>38 500 сумов: узел на 40–60 Вт потребляет примерно 30–45 кВт·ч в месяц по тарифу для юрлиц.</p><h4>Когда не подключают</h4><ul><li>Сеть далеко: столб и кабель обходятся дорого.</li><li>У объекта долги или правовой спор.</li><li>Объект продадут за один-два месяца: портативная станция быстрее.</li></ul><p>Решение принимают вместе с энергетиками: на кого открывается счётчик и с какого счёта идёт оплата.</p><p class='ogoh'>На подключённом объекте появляется риск пожара. Включается только линия узла контроля, остальные группы отключают и пломбируют.</p>"
    }
  },

  /* ======================= 39 · s-pilot ======================= */
  "s-pilot.pilot1": {
    yorliq: "Montajchi uchun",
    sarlavha: "1-hafta: audit, o'nta obyekt joyida",
    tana: "<p>Pilot obyektlari hujjatdan emas, joyida tanlanadi. Birinchi hafta montajchi va bank xodimi har bir obyektga boradi.</p><h4>Obyekt tanlash mezoni</h4><ul><li>Kamida bitta: xonadon, ma'muriy bino, ombor, sex, ferma, do'kon.</li><li>Kamida ikkitasi aloqa zaif hududda.</li><li>Kamida bittasi qayta ulash mumkin bo'lgan bino: taqqoslash uchun.</li><li>Bitta ko'char mulk: treker va plomba sinovi.</li></ul><h4>Ko'rik varag'i</h4><table><tr><th>Nima</th><th>Qanday</th></tr><tr><td>Aloqa</td><td>To'rt operator, RSRP, SINR va tezlik, kamera nuqtasida</td></tr><tr><td>Quvvat</td><td>Eng yaqin tarmoq, panel uchun janub tomoni va soya</td></tr><tr><td>Kirish nuqtalari</td><td>Eshik, deraza, darvoza soni</td></tr><tr><td>Holat</td><td>Foto, tom, oyna, qulf</td></tr></table><p>Ko'rikka ikki kishi boradi: montajchi o'lchaydi, bank xodimi kalit va hujjat bilan kiradi. Bir kunda 2–3 obyekt.</p><p class='ogoh'>Natija: har obyekt uchun bir sahifali varaq va tavsiya etilgan yechim raqami. 2-haftada shu varaqlar asosida jihoz buyurtma qilinadi.</p>",
    manba: [],
    ru: {
      yorliq: "Для монтажника",
      sarlavha: "Неделя 1: аудит десяти объектов на месте",
      tana: "<p>Пилотные объекты выбирают не по документам, а на месте. В первую неделю монтажник и сотрудник банка выезжают на каждый объект.</p><h4>Критерии отбора</h4><ul><li>Минимум по одному: квартира, административное здание, склад, цех, ферма, магазин.</li><li>Не меньше двух — в зоне слабой связи.</li><li>Хотя бы одно здание, которое можно подключить к сети, — для сравнения.</li><li>Одна единица движимого имущества: проверка трекера и пломб.</li></ul><h4>Лист обследования</h4><table><tr><th>Что</th><th>Как</th></tr><tr><td>Связь</td><td>Четыре оператора, RSRP, SINR и скорость в точке камеры</td></tr><tr><td>Питание</td><td>Ближайшая сеть, южная сторона и тени для панели</td></tr><tr><td>Точки входа</td><td>Число дверей, окон, ворот</td></tr><tr><td>Состояние</td><td>Фото, кровля, окна, замки</td></tr></table><p>На обследование выезжают двое: монтажник измеряет, сотрудник банка обеспечивает доступ с ключами и документами. За день 2–3 объекта.</p><p class='ogoh'>Итог: лист на одну страницу по каждому объекту и номер рекомендованного решения. На второй неделе по этим листам заказывается оборудование.</p>"
    }
  },
  "s-pilot.pilot2": {
    yorliq: "Rahbariyat uchun",
    sarlavha: "2-hafta: to'rt yechim yonma-yon",
    tana: "<p>Pilotda o'nta yechimning hammasi sinalmaydi. Bozorda eng ko'p ishlatiladigan va 20 mln so'mgacha turadigan to'rttasi olinadi.</p><table><tr><th>Yechim</th><th>Obyekt</th><th>Nimani tekshiradi</th></tr><tr><td>01 Reolink va Home Hub</td><td>Xonadon, do'kon</td><td>Batareya muddati, hodisa tezligi</td></tr><tr><td>02 Hikvision quyosh-4G</td><td>Ferma, ombor</td><td>Qishki quyosh, 4G barqarorligi</td></tr><tr><td>05 Ajax datchiklari</td><td>Ofis</td><td>Yolg'on signal, SIA DC-09 orqali ulanish</td></tr><tr><td>04 LiFePO4 shkafi</td><td>Sex, katta bino</td><td>Almashtirish davri, BMS telemetriyasi</td></tr></table><h4>Jihoz qanday olinadi</h4><p>Pilot uchun integrator jihozni sinov shartnomasi bilan beradi yoki bank kichik xarid qiladi. Uchta tijorat taklifi olinadi, bir brendga bog'lanilmaydi.</p><p>O'rnatish har obyektda bir kun. Montajdan keyin 48 soat sinov: kamera, hodisa va buyruq tekshiriladi, keyin qabul akti imzolanadi.</p><p class='ogoh'>Qimmat yechimlar (EFOY, minora, klaster) pilotga kirmaydi. Ular pilot natijasida zarur obyektlar aniqlangach, alohida ko'riladi.</p>",
    manba: [],
    ru: {
      yorliq: "Для руководства",
      sarlavha: "Неделя 2: четыре решения рядом",
      tana: "<p>В пилоте проверяют не все десять решений. Берут четыре самых распространённых, стоимостью до 20 млн сумов.</p><table><tr><th>Решение</th><th>Объект</th><th>Что проверяется</th></tr><tr><td>01 Reolink и Home Hub</td><td>Квартира, магазин</td><td>Срок работы батареи, скорость событий</td></tr><tr><td>02 Hikvision солнце-4G</td><td>Ферма, склад</td><td>Зимнее солнце, стабильность 4G</td></tr><tr><td>05 Датчики Ajax</td><td>Офис</td><td>Ложные тревоги, подключение по SIA DC-09</td></tr><tr><td>04 Шкаф LiFePO4</td><td>Цех, большое здание</td><td>Интервал замены, телеметрия BMS</td></tr></table><h4>Как получить оборудование</h4><p>Для пилота интегратор предоставляет оборудование по договору на тестирование, либо банк делает небольшую закупку. Берутся три коммерческих предложения, привязки к одному бренду нет.</p><p>Монтаж — один день на объект. После него 48 часов теста: проверяют камеру, события и команды, затем подписывают акт приёмки.</p><p class='ogoh'>Дорогие решения (EFOY, вышка, кластер) в пилот не входят. Их рассматривают отдельно, когда пилот покажет, каким объектам они нужны.</p>"
    }
  },
  "s-pilot.pilot3": {
    yorliq: "Jamoa rahbarlari uchun",
    sarlavha: "3–4-hafta: to'rt xizmat va qabul mezoni",
    tana: "<p>Integratsiya ikki haftada tugashi uchun ish chegarasi oldindan qat'iy belgilanadi. Maqsad to'liq mahsulot emas, to'rtta ishlaydigan xizmat.</p><h4>Nima quriladi</h4><ul><li><b>Qurilmalar reyestri:</b> qurilma, obyekt, SIM va seriya raqami. Ko'rik varag'idan import.</li><li><b>Hodisa shinasi:</b> to'rt brendning hodisasi bitta JSON sxemada, <code>POST /api/v1/hodisa</code>.</li><li><b>Media shlyuz:</b> RTSP oqimi brauzerda WebRTC bo'lib ochiladi, faqat operator so'raganda.</li><li><b>Buyruq xizmati:</b> rele, sirena, kadr olish, har amal jurnalda.</li></ul><h4>Qabul mezoni</h4><table><tr><th>Talab</th><th>Chegara</th></tr><tr><td>Hodisadan panelgacha, kadr bilan</td><td class='n'>10 soniyadan kam</td></tr><tr><td>Jonli video ochilishi</td><td class='n'>15 soniyadan kam</td></tr><tr><td>Aloqa uzilgandagi hodisa</td><td class='n'>yo'qolmaydi</td></tr></table><h4>Jamoa</h4><p>Taxminan 2–3 dasturchi va bitta tester. Har kuni qisqa uchrashuv, hafta oxirida namoyish.</p><p class='ogoh'>Adapterlar yetkazuvchining ochiq API'siga yoziladi. Hujjati bo'lmagan qurilma pilotdan chiqariladi.</p>",
    manba: [],
    ru: {
      yorliq: "Для тимлида",
      sarlavha: "Недели 3–4: четыре сервиса и критерии приёмки",
      tana: "<p>Чтобы интеграция уложилась в две недели, границы работ фиксируются заранее. Цель — не готовый продукт, а четыре работающих сервиса.</p><h4>Что строится</h4><ul><li><b>Реестр устройств:</b> устройство, объект, SIM и серийный номер. Импорт из листов обследования.</li><li><b>Шина событий:</b> события четырёх брендов в одной JSON-схеме, <code>POST /api/v1/hodisa</code>.</li><li><b>Медиашлюз:</b> поток RTSP открывается в браузере как WebRTC, только по запросу оператора.</li><li><b>Сервис команд:</b> реле, сирена, снимок кадра, каждое действие в журнале.</li></ul><h4>Критерии приёмки</h4><table><tr><th>Требование</th><th>Порог</th></tr><tr><td>От события до панели, с кадром</td><td class='n'>менее 10 секунд</td></tr><tr><td>Открытие живого видео</td><td class='n'>менее 15 секунд</td></tr><tr><td>Событие при обрыве связи</td><td class='n'>не теряется</td></tr></table><h4>Команда</h4><p>Примерно 2–3 разработчика и один тестировщик. Ежедневная короткая встреча, в конце недели показ.</p><p class='ogoh'>Адаптеры пишутся под открытый API поставщика. Устройство без документации исключается из пилота.</p>"
    }
  },
  "s-pilot.pilot4": {
    yorliq: "Rahbariyat uchun",
    sarlavha: "5-hafta: qaror oltita raqamga tayanadi",
    tana: "<p>Pilot tugaganda har yechim bo'yicha bitta jadval chiqadi. Qaror taassurotga emas, o'lchangan raqamga tayanadi.</p><table><tr><th>Ko'rsatkich</th><th>Qanday o'lchanadi</th><th>Maqsad</th></tr><tr><td>Ishlash vaqti</td><td>last_seen bo'yicha aloqada bo'lgan soat ulushi</td><td class='n'>≥ 98%</td></tr><tr><td>Avtonomlik</td><td>Batareya zaryadining kunlik tushishi</td><td class='n'>qishda ham musbat balans</td></tr><tr><td>Yolg'on signal</td><td>Operator «asossiz» deb belgilagan hodisalar</td><td class='n'>≤ 10%</td></tr><tr><td>Trafik</td><td>SIM operatori hisobi</td><td class='n'>tarif ichida</td></tr><tr><td>Javob tezligi</td><td>Hodisadan operator ko'rgunicha</td><td class='n'>≤ 1 daqiqa</td></tr><tr><td>Servis</td><td>Rejadan tashqari tashriflar soni</td><td class='n'>0–1</td></tr></table><p>Maqsad qiymatlar boshlang'ich taklif. Ularni bank pilot boshlanishidan oldin tasdiqlaydi.</p><p>Hisobot rahbariyatga bir sahifada beriladi: har yechim bo'yicha oltita raqam va tavsiya.</p><p class='ogoh'>5 hafta qishni to'liq ko'rsatmaydi. Pilot kuzda boshlansa, qishki ko'rsatkichlar yanvarda qo'shimcha tekshiriladi.</p>",
    manba: [],
    ru: {
      yorliq: "Для руководства",
      sarlavha: "Неделя 5: решение по шести цифрам",
      tana: "<p>По итогам пилота по каждому решению составляется одна таблица. Решение принимается не по впечатлениям, а по измеренным цифрам.</p><table><tr><th>Показатель</th><th>Как измеряется</th><th>Цель</th></tr><tr><td>Время работы</td><td>Доля часов на связи по last_seen</td><td class='n'>≥ 98%</td></tr><tr><td>Автономность</td><td>Суточное падение заряда батареи</td><td class='n'>положительный баланс и зимой</td></tr><tr><td>Ложные тревоги</td><td>События, отмеченные оператором как «без оснований»</td><td class='n'>≤ 10%</td></tr><tr><td>Трафик</td><td>Счёт оператора SIM</td><td class='n'>в пределах тарифа</td></tr><tr><td>Скорость реакции</td><td>От события до просмотра оператором</td><td class='n'>≤ 1 минуты</td></tr><tr><td>Сервис</td><td>Число внеплановых выездов</td><td class='n'>0–1</td></tr></table><p>Целевые значения — стартовое предложение. Банк утверждает их до начала пилота.</p><p>Отчёт для руководства — на одной странице: шесть цифр и рекомендация по каждому решению.</p><p class='ogoh'>Пять недель не покажут зиму полностью. Если пилот начнётся осенью, зимние показатели дополнительно проверяют в январе.</p>"
    }
  },
  "s-pilot.pilot5": {
    yorliq: "Rahbariyat uchun",
    sarlavha: "6-hafta: smeta, SLA va joriy etish standarti",
    tana: "<p>Oxirgi hafta pilot natijasini 267 obyektga ko'chiriladigan uchta hujjatga aylantiradi.</p><h4>Hujjatlar</h4><ul><li><b>Smeta:</b> har yechim uchun jihoz bo'yicha alohida narx, montaj, SIM va servis. Paket narxi emas.</li><li><b>SLA:</b> kritik nosozlikka kelish shaharda 4, tumanda 24, chekkada 48 soat (30-slayd), zaxira jihoz, jarima.</li><li><b>Joriy etish standarti:</b> obyekt turiga qarab yechim tanlash jadvali, ko'rik varag'i, qabul akti, qurilmani platformaga ulash tartibi.</li></ul><h4>Keyingi bosqich</h4><table><tr><th>Bosqich</th><th>Obyekt</th></tr><tr><td>Pilot, 1–6-hafta</td><td class='n'>10</td></tr><tr><td>1-bosqich: eng qimmat va xavfli, 2–4-oy</td><td class='n'>50 gacha</td></tr><tr><td>2-bosqich: butun balans, ko'char mulk bilan, 5–9-oy</td><td class='n'>267</td></tr><tr><td>3-bosqich: har yangi aktiv</td><td class='n'>10 ish kunida</td></tr></table><p>Obyekt soni yig'ma: jadval 38-slayddagi yo'l xaritasi bilan bir xil.</p><p>Hujjatlarni bank tomonidan loyiha rahbari, IT va xarid bo'limi birgalikda imzolaydi.</p><p class='ogoh'>Bosqichlar hajmi taxminiy va pilot natijasiga qarab o'zgaradi. Har bosqich oldidan kamida uchta tijorat taklifi olinadi.</p>",
    manba: [],
    ru: {
      yorliq: "Для руководства",
      sarlavha: "Неделя 6: смета, SLA и стандарт внедрения",
      tana: "<p>Последняя неделя превращает итоги пилота в три документа, которые переносятся на 267 объектов.</p><h4>Документы</h4><ul><li><b>Смета:</b> по каждому решению — отдельная цена за единицу оборудования, монтаж, SIM и сервис. Не пакетная цена.</li><li><b>SLA:</b> выезд при критической неисправности — 4 часа в городе, 24 в районе, 48 на отдалённых объектах (слайд 30), резервное оборудование, штрафы.</li><li><b>Стандарт внедрения:</b> таблица выбора решения по типу объекта, лист обследования, акт приёмки, порядок подключения устройства к платформе.</li></ul><h4>Следующий этап</h4><table><tr><th>Этап</th><th>Объектов</th></tr><tr><td>Пилот, недели 1–6</td><td class='n'>10</td></tr><tr><td>Этап 1: самые дорогие и рискованные, месяцы 2–4</td><td class='n'>до 50</td></tr><tr><td>Этап 2: весь баланс вместе с движимым имуществом, месяцы 5–9</td><td class='n'>267</td></tr><tr><td>Этап 3: каждый новый актив</td><td class='n'>за 10 раб. дней</td></tr></table><p>Число объектов нарастающим итогом: таблица совпадает с дорожной картой на слайде 38.</p><p>Документы со стороны банка совместно подписывают руководитель проекта, IT и отдел закупок.</p><p class='ogoh'>Объёмы этапов ориентировочные и зависят от итогов пилота. Перед каждым этапом собираются не менее трёх коммерческих предложений.</p>"
    }
  },
  "s-pilot.qaror1": {
    yorliq: "Rahbariyat uchun",
    sarlavha: "Bugun tasdiqlanadigan to'rt qaror",
    tana: "<p>Pilot boshlanishi uchun rahbariyatdan to'rtta qaror kerak. Har biriga mas'ul bo'linma va muddat biriktiriladi.</p><table><tr><th>Qaror</th><th>Mas'ul</th></tr><tr><td>10 ta pilot obyekt ro'yxati</td><td>Muammoli aktivlar bilan ishlash bo'linmasi</td></tr><tr><td>Byudjet oralig'i</td><td>Moliya bo'limi</td></tr><tr><td>Bosh integrator modeli</td><td>Xarid bo'limi, xavfsizlik xizmati</td></tr><tr><td>Platformaga ulanish standarti</td><td>IT departamenti</td></tr></table><h4>Byudjet mantig'i</h4><ul><li>Jihoz: 10 obyekt × 5–20 mln so'm, yechimga qarab.</li><li>Montaj, SIM va 6 haftalik servis: integrator taklifidan.</li><li>Integratsiya: bankning o'z dasturchilar jamoasi, tashqi xarajat yo'q.</li><li>Pilotdan keyin jihoz obyektlarda qoladi va ishlashda davom etadi.</li></ul><h4>Nima tasdiqlanmaydi</h4><p>267 obyektga to'liq xarid bu bosqichda so'ralmaydi. U pilot natijasi va tender asosida alohida qaror bo'ladi.</p><p>Taxminiy pilot byudjeti: jihoz 100–150 mln so'm, montaj va servis bilan birga ko'pi bilan 200 mln so'm (bozor bahosi, 2026).</p><p class='ogoh'>Eng ko'p kechikish obyektga kirish ruxsatidan chiqadi. Pilot obyektlari kaliti va hujjati birinchi hafta boshlanguncha tayyor bo'lishi kerak.</p>",
    manba: [],
    ru: {
      yorliq: "Для руководства",
      sarlavha: "Четыре пункта на утверждение сегодня",
      tana: "<p>Для старта пилота от руководства нужны четыре решения. За каждым закрепляются ответственное подразделение и срок.</p><table><tr><th>Решение</th><th>Ответственный</th></tr><tr><td>Список 10 пилотных объектов</td><td>Подразделение по работе с проблемными активами</td></tr><tr><td>Диапазон бюджета</td><td>Финансовый департамент</td></tr><tr><td>Модель генерального интегратора</td><td>Отдел закупок, служба безопасности</td></tr><tr><td>Стандарт подключения к платформе</td><td>IT-департамент</td></tr></table><h4>Логика бюджета</h4><ul><li>Оборудование: 10 объектов × 5–20 млн сумов в зависимости от решения.</li><li>Монтаж, SIM и сервис на 6 недель — по предложению интегратора.</li><li>Интеграция: собственная команда разработчиков банка, внешних затрат нет.</li><li>После пилота оборудование остаётся на объектах и продолжает работать.</li></ul><h4>Что не утверждается</h4><p>Полная закупка на 267 объектов на этом этапе не запрашивается. Это отдельное решение по итогам пилота и тендера.</p><p>Ориентировочный бюджет пилота: оборудование 100–150 млн сумов, вместе с монтажом и сервисом — не более 200 млн сумов (рыночная оценка, 2026).</p><p class='ogoh'>Чаще всего пилот задерживается из-за доступа на объект. Ключи и документы по пилотным объектам должны быть готовы к началу первой недели.</p>"
    }
  }

});

/* ---- yechimA ---- */
/* yechimA: 07-11 slaydlar (s-y01..s-y05) nuqtalari uchun batafsil yozuvlar. */
window.MKB_BATAFSIL = window.MKB_BATAFSIL || {};
(function () {
var M = {
  reoRtsp: ["Reolink: Introduction to RTSP", "https://support.reolink.com/articles/900000630706-Introduction-to-RTSP/"],
  reo3: ["Reolink: batareyali kamera va uchinchi tomon dasturi", "https://support.reolink.com/articles/360004441753-Can-Reolink-Battery-Powered-Cameras-Work-with-3rd-Party-Software/"],
  reoHub: ["Reolink Home Hub", "https://reolink.com/product/reolink-home-hub/"],
  reoArgus: ["Reolink Argus 4 Pro", "https://reolink.com/product/argus-4-pro/"],
  haReo: ["Home Assistant: Reolink", "https://www.home-assistant.io/integrations/reolink/"],
  hik41: ["Hikvision DS-2XS2T41G1-ID/4G datasheet", "https://assets.hikvision.com/prd/normal/all/doc/m000060523/DS-2XS2T41G1-ID_4G_Datasheet_20250804.pdf"],
  hik80: ["Hikvision DS-2XS6A46G1/P-IZS/C36S80 datasheet", "https://assets.hikvision.com/prd/public/all/doc/m000069241/DS-2XS6A46G1_P-IZS_C36S80_Datasheet_20240402.pdf"],
  hikUz: ["Hikvision rasmiy distributori (UZ)", "https://uzhikvision.uz/en/"],
  dhKit: ["Dahua KIT/DH-PFM378-B125-CB datasheet", "https://material.dahuasecurity.com/uploads/cpq/prm-os-srv-res/smart/datasheetzipfiles/KITKIT_DH-PFM378-B125-CB_DH-SD49425DB-HNY-GQ-LA_datasheet_20240125.pdf"],
  dhBat: ["Dahua PFM372-L45-4S14P datasheet", "https://www.dahuasecurity.com/asset/upload/uploads/soft/20200925/PFM372-L45-4S14P_datasheet_20200811.pdf"],
  dhUz: ["Dahua rasmiy distributori (UZ)", "https://uzdahua.uz/en/"],
  sat: ["SAT Solutions", "https://satsolutions.uz/en"],
  dhNarx: ["Orbita Digital: 125 Vt komplekt narxi", "https://www.orbitadigital.com/en/cctv-accessories/solar-panels-cctv/55968-dahua-kit-pfm378-b125-cb-sd49425db-hny-gq-eau-integrated-solar.html"],
  ajHub: ["Ajax Hub 2 (4G): spetsifikatsiya", "https://ajax.systems/products/specs/hub-2/"],
  ajSia: ["Ajax: SIA DC-09 orqali pultga ulash", "https://support.ajax.systems/en/how-to-use-sia-for-cms-connection/"],
  ajPsu: ["Ajax 12-24V PSU for Hub 2", "https://ajax.systems/products/12-24vpsu-hub2/"],
  ajCam: ["Ajax MotionCam: spetsifikatsiya", "https://ajax.systems/products/specs/motioncam/"],
  ajBat: ["Ajax: batareya muddati", "https://ajax.systems/support/posts/how-long-operate-from-batteries/"],
  ajUz: ["Ajax distributori (UZ)", "https://www.ajax-systems.uz/en"],
  vmq: ["VMQ 649-son, Yong'in xavfsizligi qoidalari", "https://lex.uz/docs/-5056473"]
};

Object.assign(window.MKB_BATAFSIL, {

/* ============================== s-y01 · Reolink ============================== */
"s-y01.band1": {
  yorliq: "Montajchi uchun",
  sarlavha: "Kamera o'z akkumulyatorida, Home Hub'ga manba kerak",
  tana: "<p>Kamera va hub energiyani har xil oladi. Kamera ichki akkumulyatorda uxlab turadi va PIR datchik uyg'otgandagina yozadi. Home Hub va 4G router esa sutka bo'yi yoqiq turadi, obyektdagi asosiy iste'molchi shular.</p>" +
    "<table><tr><th>Qism</th><th>Ta'minot</th><th>Harorat</th></tr>" +
    "<tr><td>Argus 4 Pro kamera</td><td>5000 mA·soat ichki akkumulyator, 6 Vt'li Solar Panel 2 ulanadi</td><td class='n'>−10…+55 °C</td></tr>" +
    "<tr><td>Home Hub</td><td>12 V / 1 A kirish</td><td class='n'>−10…+45 °C</td></tr>" +
    "<tr><td>4G router</td><td>12 V DC</td><td class='n'>modelga qarab</td></tr></table>" +
    "<h4>Hisob</h4><p>Hub va router birga taxminan 5–8 Vt oladi, bu sutkasiga 120–190 Vt·soat. 12 V 100 A·soat LiFePO4 (1,28 kVt·soat) 90% razryadda 6–9 kun yetadi. 12 V 50 A·soatlik blok 3–4 kunda tugaydi. Iste'molni o'rnatishdan oldin ampermetr bilan o'lchang: taxminiy raqam montajchining kafolati emas.</p>" +
    "<h4>Nima olinadi</h4><ul><li>12 V 100 A·soat LiFePO4, BMS'da past haroratda zaryadni to'xtatish funksiyasi bilan.</li><li>Hub va router uchun 12 V taqsimlash bloki va 3 A saqlagich.</li><li>Iloji bo'lsa 50–100 Vt panel va MPPT kontroller: shunda akkumulyator almashtirish oyiga bir martagacha kamayadi.</li></ul>" +
    "<p class='ogoh'>Hub ham, kamera ham −10 °C dan pastga mo'ljallanmagan. Isitilmaydigan binoda qishda hub va akkumulyator ichki xonaga, tashqi devordan uzoqqa qo'yiladi.</p>",
  manba: [M.reoHub, M.reoArgus],
  ru: {
    yorliq: "Для монтажника",
    sarlavha: "Камера на своём аккумуляторе, хабу нужен источник",
    tana: "<p>Камера и хаб питаются по-разному. Камера спит на встроенном аккумуляторе и пишет, только когда её будит PIR-датчик. Home Hub и 4G-роутер работают круглосуточно, поэтому именно они главные потребители на объекте.</p>" +
      "<table><tr><th>Узел</th><th>Питание</th><th>Температура</th></tr>" +
      "<tr><td>Камера Argus 4 Pro</td><td>встроенный аккумулятор 5000 мА·ч, подключается панель Solar Panel 2 на 6 Вт</td><td class='n'>−10…+55 °C</td></tr>" +
      "<tr><td>Home Hub</td><td>вход 12 В / 1 А</td><td class='n'>−10…+45 °C</td></tr>" +
      "<tr><td>4G-роутер</td><td>12 В DC</td><td class='n'>зависит от модели</td></tr></table>" +
      "<h4>Расчёт</h4><p>Хаб с роутером потребляют примерно 5–8 Вт, это 120–190 Вт·ч в сутки. LiFePO4 12 В 100 А·ч (1,28 кВт·ч) при разряде до 90% хватает на 6–9 дней, блока 12 В 50 А·ч — на 3–4 дня. Перед монтажом измерьте ток амперметром: оценка не заменяет замера.</p>" +
      "<h4>Что закупить</h4><ul><li>LiFePO4 12 В 100 А·ч с BMS, которая запрещает заряд на морозе.</li><li>Распределительный блок 12 В для хаба и роутера, предохранитель 3 А.</li><li>По возможности панель 50–100 Вт и MPPT-контроллер: замена аккумулятора сократится до раза в месяц.</li></ul>" +
      "<p class='ogoh'>Ни хаб, ни камера не рассчитаны на температуру ниже −10 °C. В неотапливаемом здании зимой хаб и аккумулятор ставят во внутреннее помещение, подальше от наружной стены.</p>"
  }
},

"s-y01.band2": {
  yorliq: "Jamoa rahbarlari uchun",
  sarlavha: "Kameradan platformagacha to'rt bo'g'in",
  tana: "<p>Batareyali Reolink kamerasi o'zi RTSP ham, ONVIF ham bermaydi. Uchinchi tomon protokollari faqat Home Hub orqali ochiladi, shuning uchun hub zanjirning majburiy bo'g'ini.</p>" +
    "<ol><li><b>Kamera → Home Hub.</b> Wi-Fi 6 (2,4/5 GHz). Hub 8 tagacha kamerani oladi va ikkita microSD'ga (har biri 1 TB gacha) yozadi.</li><li><b>Hub → 4G router.</b> Hub'ning RJ45 WAN porti orqali kabel bilan.</li><li><b>Router → MKB.</b> Router MKB VPN serveriga WireGuard yoki IPsec tunnel ochadi. Operator SIM'ga oq IP bermaydi, shuning uchun ulanishni doim obyekt tomoni boshlaydi.</li><li><b>MKB media shlyuzi.</b> Adapter hub'ga tunnel ichidagi manzil bo'yicha murojaat qiladi va oqimni platformaga beradi.</li></ol>" +
    "<h4>Tunnel ichidagi portlar</h4><p>HTTP 80, HTTPS 443, RTSP 554, ONVIF 8000, Reolink TCP 9000. Internetga hech qaysi port ochilmaydi.</p>" +
    "<h4>Trafik</h4><p>Hodisaga asoslangan rejimda obyekt oyiga bir necha gigabayt ishlatadi. Asosiy hajmni operatorlar ko'rgan jonli video beradi. Tarif pilotdagi haqiqiy sarf bo'yicha tanlanadi.</p>",
  manba: [M.reo3, M.reoHub, M.haReo],
  ru: {
    yorliq: "Для тимлидов",
    sarlavha: "Четыре звена от камеры до платформы",
    tana: "<p>Батарейная камера Reolink сама не отдаёт ни RTSP, ни ONVIF. Сторонние протоколы доступны только через Home Hub, поэтому хаб — обязательное звено цепочки.</p>" +
      "<ol><li><b>Камера → Home Hub.</b> Wi-Fi 6 (2,4/5 ГГц). Хаб принимает до 8 камер и пишет на две microSD до 1 ТБ каждая.</li><li><b>Хаб → 4G-роутер.</b> Кабелем через WAN-порт RJ45 хаба.</li><li><b>Роутер → MKB.</b> Роутер поднимает туннель WireGuard или IPsec до VPN-сервера MKB. Белого IP на SIM оператор не даёт, поэтому соединение всегда инициирует объект.</li><li><b>Медиашлюз MKB.</b> Адаптер обращается к хабу по адресу внутри туннеля и передаёт поток на платформу.</li></ol>" +
      "<h4>Порты внутри туннеля</h4><p>HTTP 80, HTTPS 443, RTSP 554, ONVIF 8000, TCP 9000 Reolink. В интернет не открывается ни один порт.</p>" +
      "<h4>Трафик</h4><p>В событийном режиме объект расходует несколько гигабайт в месяц. Основной объём дают просмотры живого видео операторами. Тариф подбирается по фактическому расходу на пилоте.</p>"
  }
},

"s-y01.band3": {
  yorliq: "Jamoa rahbarlari uchun",
  sarlavha: "RTSP va HTTP API: adapter nima qiladi",
  tana: "<h4>Video</h4><pre><code>rtsp://user:pass@10.8.0.12:554/Preview_01_main\nrtsp://user:pass@10.8.0.12:554/Preview_01_sub</code></pre>" +
    "<p>Kanal raqami 1 dan boshlanadi, API esa kanalni 0 dan qaytaradi: URL tuzishda 1 qo'shiladi. Uxlab turgan kamera uyg'onishi uchun vaqt kerak, RTSP so'rovida kutish vaqti kamida 20 soniya qo'yiladi.</p>" +
    "<h4>Hodisalar</h4><p>Hub HTTP API'si <code>/api.cgi?cmd=...</code> ko'rinishida ishlaydi: <code>GetMdState</code> harakatni, <code>GetAiState</code> odam va mashinani qaytaradi. Ochiq manbali Reolink integratsiyalari hodisani avval TCP push yoki ONVIF push bilan oladi, bo'lmasa 5 soniyalik so'rovga o'tadi. Bizning adapter ham shu tartibda ishlaydi.</p>" +
    "<h4>Cheklov va uni aylanib o'tish</h4><ul><li>Batareyali kamera sessiyasi taxminan 5 daqiqadan keyin uziladi. Adapter uzilishni xato emas, normal holat deb biladi va operator so'rasa oqimni qayta so'raydi.</li><li>Holat so'rovi kamerani uyg'otmaydi: hub kameraning oxirgi holatini beradi.</li><li>Hodisa kelganda adapter klipni hub'dagi microSD'dan oladi, jonli oqimni kutmaydi.</li></ul>" +
    "<p class='ogoh'>Reolink API'ning rasmiy hujjati to'liq emas, buyruqlar mikrodastur versiyasiga qarab o'zgaradi. Pilotda hub mikrodasturi bir versiyada qotiriladi va yangilanish avval test hub'da sinaladi.</p>",
  manba: [M.reoRtsp, M.haReo],
  ru: {
    yorliq: "Для тимлидов",
    sarlavha: "RTSP и HTTP API: что делает адаптер",
    tana: "<h4>Видео</h4><pre><code>rtsp://user:pass@10.8.0.12:554/Preview_01_main\nrtsp://user:pass@10.8.0.12:554/Preview_01_sub</code></pre>" +
      "<p>Номер канала в URL начинается с 1, а API отдаёт каналы с 0, поэтому при сборке URL прибавляется единица. Спящей камере нужно время на пробуждение: таймаут RTSP-запроса — не меньше 20 секунд.</p>" +
      "<h4>События</h4><p>HTTP API хаба работает через <code>/api.cgi?cmd=...</code>: <code>GetMdState</code> возвращает движение, <code>GetAiState</code> — человека и машину. Открытые интеграции Reolink сначала пробуют TCP push или ONVIF push и только потом переходят на опрос раз в 5 секунд. Наш адаптер работает в том же порядке.</p>" +
      "<h4>Ограничение и обход</h4><ul><li>Сессия батарейной камеры рвётся примерно через 5 минут. Адаптер считает это штатной ситуацией и запрашивает поток заново, если оператор продолжает смотреть.</li><li>Опрос состояния не будит камеру: хаб отдаёт её последнее известное состояние.</li><li>По событию адаптер забирает клип с microSD хаба и не ждёт живого потока.</li></ul>" +
      "<p class='ogoh'>Официальная документация API Reolink неполная, команды меняются от прошивки к прошивке. На пилоте прошивку хаба фиксируют, а обновления сначала проверяют на тестовом хабе.</p>"
  }
},

"s-y01.band4": {
  yorliq: "Texnik izoh",
  sarlavha: "Masofadan nima qilinadi, eshik qanday ochiladi",
  tana: "<table><tr><th>Amal</th><th>Qanday</th></tr>" +
    "<tr><td>Jonli video</td><td>So'rov bo'yicha, har sessiya taxminan 5 daqiqa</td></tr>" +
    "<tr><td>Arxiv</td><td>Hub'dagi microSD'dan klip, hodisa vaqti bo'yicha</td></tr>" +
    "<tr><td>Hodisa</td><td>Harakat, odam va mashina, platformaga push</td></tr>" +
    "<tr><td>Ovoz</td><td>Ikki tomonlama gaplashish, tashqi sirena</td></tr>" +
    "<tr><td>Eshik</td><td>Reolink'da rele yo'q, alohida kontroller kerak</td></tr></table>" +
    "<h4>Eshik uchun qo'shimcha jihoz</h4><ul><li>12 V kirish kontrolleri, tarmoqli yoki 4G rele bilan.</li><li>Zamok iste'molsiz bo'lishi kerak: elektromexanik zamok yoki motorli zamok faqat ochish paytida tok oladi.</li><li>Kontroller o'sha LiFePO4 blokidan, alohida saqlagich bilan oziqlanadi.</li></ul>" +
    "<p class='ogoh'>Elektromagnit zamok yopiq holatini ushlab turish uchun doim tok oladi, 12 V'da odatda 3–6 Vt. Bu hub va routerning butun sarfiga teng, akkumulyator ikki baravar tez tugaydi. Elektrsiz obyektda bunday zamok qo'yilmaydi.</p>" +
    "<p>Ochish buyrug'i platformadan kontrollerga tunnel orqali boradi va jurnalga kim, qachon, qaysi arizaga ko'ra ochgani yoziladi. Kirish tartibi <a href='#' data-slayd='#s-kirish'>kirish nazorati slaydida</a>.</p>",
  manba: [M.reoRtsp],
  ru: {
    yorliq: "Техническая справка",
    sarlavha: "Что доступно удалённо и как открыть дверь",
    tana: "<table><tr><th>Действие</th><th>Как</th></tr>" +
      "<tr><td>Живое видео</td><td>По запросу, сессия около 5 минут</td></tr>" +
      "<tr><td>Архив</td><td>Клип с microSD хаба по времени события</td></tr>" +
      "<tr><td>События</td><td>Движение, человек, машина, push на платформу</td></tr>" +
      "<tr><td>Звук</td><td>Двусторонняя связь, внешняя сирена</td></tr>" +
      "<tr><td>Дверь</td><td>Реле у Reolink нет, нужен отдельный контроллер</td></tr></table>" +
      "<h4>Дополнительное оборудование для двери</h4><ul><li>Контроллер доступа 12 В с сетевым или 4G-реле.</li><li>Замок без постоянного потребления: электромеханический или моторный, ток только в момент открытия.</li><li>Контроллер питается от того же блока LiFePO4 через отдельный предохранитель.</li></ul>" +
      "<p class='ogoh'>Электромагнитный замок всё время потребляет ток, чтобы держать дверь, обычно 3–6 Вт при 12 В. Это столько же, сколько хаб с роутером, и аккумулятор садится вдвое быстрее. На объекте без электричества такой замок не ставят.</p>" +
      "<p>Команда на открытие идёт с платформы на контроллер через туннель, в журнал пишется, кто, когда и по какой заявке открыл. Порядок доступа — на <a href='#' data-slayd='#s-kirish'>слайде о контроле доступа</a>.</p>"
  }
},

"s-y01.narx1": {
  yorliq: "Moliya va huquq",
  sarlavha: "3 kamerali obyekt: smeta va 5 yil",
  tana: "<table><tr><th>Qator</th><th>mln so'm</th></tr>" +
    "<tr><td>Home Hub</td><td class='n'>1,2–1,5</td></tr>" +
    "<tr><td>3 ta batareyali kamera (Argus seriyasi)</td><td class='n'>4,5–6,0</td></tr>" +
    "<tr><td>4G router</td><td class='n'>0,5–0,8</td></tr>" +
    "<tr><td>LiFePO4 12 V 100 A·soat va zaryadlagich</td><td class='n'>1,2–2,0</td></tr>" +
    "<tr><td>Montaj va sozlash</td><td class='n'>0,6–1,2</td></tr>" +
    "<tr><td><b>Jami</b></td><td class='n'>8,0–11,5</td></tr></table>" +
    "<p>Taxminiy bozor narxi, 2026. O'zbekistonda Reolink'ning rasmiy distributorini topmadik: jihoz import yoki marketpleys orqali keladi, kafolat sotuvchining zimmasida. Shartnomaga almashtirish fondi va 12 oylik kafolat yoziladi.</p>" +
    "<h4>Oylik xarajat</h4><ul><li>4G SIM: taxminan 50–100 ming so'm, pilotdagi trafikka qarab.</li><li>Akkumulyatorni zaryadlash uchun borish: panelsiz haftasiga bir marta, panel bilan oyiga bir martagacha.</li></ul>" +
    "<div class='raqamlar'><div><b>≈10 mln</b><span>boshlang'ich xarajat</span></div><div><b>20–28 mln</b><span>5 yillik jami, taxminan</span></div></div>" +
    "<p>Obyekt balansda bir yil turadi, jihoz esa keyingi obyektga ko'chadi. Bir komplekt 5 yilda 3–4 obyektga xizmat qilsa, bitta obyekt yiliga 5–7 mln so'mga tushadi.</p>",
  manba: [M.reoHub],
  ru: {
    yorliq: "Финансы и право",
    sarlavha: "Объект на 3 камеры: смета и 5 лет",
    tana: "<table><tr><th>Статья</th><th>млн сум</th></tr>" +
      "<tr><td>Home Hub</td><td class='n'>1,2–1,5</td></tr>" +
      "<tr><td>3 батарейные камеры (серия Argus)</td><td class='n'>4,5–6,0</td></tr>" +
      "<tr><td>4G-роутер</td><td class='n'>0,5–0,8</td></tr>" +
      "<tr><td>LiFePO4 12 В 100 А·ч и зарядное</td><td class='n'>1,2–2,0</td></tr>" +
      "<tr><td>Монтаж и настройка</td><td class='n'>0,6–1,2</td></tr>" +
      "<tr><td><b>Итого</b></td><td class='n'>8,0–11,5</td></tr></table>" +
      "<p>Оценка по рынку, 2026. Официального дистрибьютора Reolink в Узбекистане мы не нашли: оборудование приходит импортом или через маркетплейсы, гарантию несёт продавец. В договор закладываются подменный фонд и гарантия 12 месяцев.</p>" +
      "<h4>Ежемесячно</h4><ul><li>4G SIM: около 50–100 тыс. сумов, по фактическому трафику пилота.</li><li>Выезды на зарядку аккумулятора: без панели раз в неделю, с панелью до раза в месяц.</li></ul>" +
      "<div class='raqamlar'><div><b>≈10 млн</b><span>начальные затраты</span></div><div><b>20–28 млн</b><span>итого за 5 лет, оценка</span></div></div>" +
      "<p>Объект стоит на балансе год, а комплект переезжает на следующий. Если он за 5 лет обслужит 3–4 объекта, один объект обходится в 5–7 млн сумов в год.</p>"
  }
},

"s-y01.diqqat1": {
  yorliq: "Rahbariyat uchun",
  sarlavha: "Bu kuzatuv emas, hodisaga javob",
  tana: "<p>Yechim qayerga yaroqli ekanini ikki cheklov belgilaydi. Ularni hisobga olib tanlasangiz, u arzon va tez ishlaydi.</p>" +
    "<h4>1. Sovuq</h4><p>Argus 4 Pro kamerasi −10…+55 °C, Home Hub −10…+45 °C ga mo'ljallangan. Toshkentda qishki tunlar ko'pincha shu chegaraga yaqin, viloyatlarda undan past tushadi. Shuning uchun Reolink ichki makon uchun: do'kon, ofis, kvartira. Tashqi perimetrga Hikvision yoki Dahua'ning −20 °C sinfidagi komplekti qo'yiladi.</p>" +
    "<h4>2. Doimiy video yo'q</h4><p>Batareyali kamera uxlab turadi. Hub orqali har jonli sessiya taxminan 5 daqiqa davom etadi, keyin kamera yana uxlaydi. Kamera 24 soat yozmaydi, harakat bo'lganda yozadi va xabar yuboradi.</p>" +
    "<table><tr><th>Savol</th><th>Javob</th></tr>" +
    "<tr><td>Kimdir kirsa bilamizmi?</td><td>Ha, bir necha soniyada</td></tr>" +
    "<tr><td>Kechagi kunni to'liq ko'ra olamizmi?</td><td>Yo'q, faqat hodisa kliplari</td></tr>" +
    "<tr><td>Operator istagancha jonli ko'radimi?</td><td>5 daqiqalik bo'laklar bilan</td></tr></table>" +
    "<p>Uzluksiz yozuv talab qilinadigan obyektga <a href='#' data-slayd='#s-y04'>LiFePO4 shkafi</a> yoki klaster shkafi olinadi.</p>",
  manba: [M.reoArgus, M.reoHub, M.reoRtsp],
  ru: {
    yorliq: "Для руководства",
    sarlavha: "Это реакция на событие, а не наблюдение",
    tana: "<p>Где решение уместно, определяют два ограничения. Если выбирать с оглядкой на них, оно работает дёшево и быстро.</p>" +
      "<h4>1. Холод</h4><p>Камера Argus 4 Pro рассчитана на −10…+55 °C, Home Hub — на −10…+45 °C. В Ташкенте зимние ночи часто подходят к этой границе, в областях бывает холоднее. Поэтому Reolink — для помещений: магазин, офис, квартира. На наружный периметр ставят комплект Hikvision или Dahua класса −20 °C.</p>" +
      "<h4>2. Нет непрерывного видео</h4><p>Батарейная камера спит. Живая сессия через хаб длится около 5 минут, потом камера засыпает. Круглосуточной записи нет: камера пишет при движении и присылает уведомление.</p>" +
      "<table><tr><th>Вопрос</th><th>Ответ</th></tr>" +
      "<tr><td>Узнаем ли мы о проникновении?</td><td>Да, за несколько секунд</td></tr>" +
      "<tr><td>Можно посмотреть весь вчерашний день?</td><td>Нет, только клипы событий</td></tr>" +
      "<tr><td>Оператор смотрит живое видео сколько нужно?</td><td>Отрезками по 5 минут</td></tr></table>" +
      "<p>Для объекта, где нужна непрерывная запись, берут <a href='#' data-slayd='#s-y04'>шкаф LiFePO4</a> или кластерный шкаф.</p>"
  }
},

/* ============================== s-y02 · Hikvision ============================== */
"s-y02.band1": {
  yorliq: "Montajchi uchun",
  sarlavha: "Ixcham model qishga yetmaydi: ikki sinf",
  tana: "<p>Hikvision'ning quyosh-4G liniyasida ikki sinf bor. Farq dekabr va sovuqda ko'rinadi.</p>" +
    "<table><tr><th></th><th>DS-2XS2T41G1-ID/4G</th><th>DS-2XS6A46G1/P-IZS/C36S80</th></tr>" +
    "<tr><td>Panel</td><td class='n'>6,5 Vt</td><td class='n'>80 Vt</td></tr>" +
    "<tr><td>Akkumulyator</td><td class='n'>51,46 Vt·soat, NMC</td><td class='n'>360 Vt·soat</td></tr>" +
    "<tr><td>Ishlash harorati</td><td class='n'>0…+50 °C</td><td class='n'>−20…+60 °C</td></tr>" +
    "<tr><td>Zaryad harorati</td><td class='n'>0…+45 °C</td><td class='n'>−20…+45 °C</td></tr>" +
    "<tr><td>Quyoshsiz, faol rejim</td><td class='n'>1,5 kun</td><td class='n'>8 kun</td></tr>" +
    "<tr><td>Quyoshsiz, kutish</td><td class='n'>11 kun</td><td class='n'>80 kun</td></tr></table>" +
    "<h4>Dekabr hisobi</h4><p>Toshkentda dekabrda 1,62 kVt·soat/m² quyosh tushadi. 6,5 Vt panel yo'qotishlar bilan sutkasiga taxminan 7 Vt·soat beradi. Kamera kutishda 80 mVt, 4G ishlaganda 1,85 Vt, ko'pi bilan 7 Vt oladi. Demak dekabrda sutkasiga 3 soatcha faol ishlash mumkin, qolgan vaqtda kamera uyqu rejimida.</p>" +
    "<h4>Nima olinadi</h4><ul><li>Ixcham model: qishda 0 °C dan past tushmaydigan yopiq ayvon yoki ichki hovli.</li><li>Ochiq perimetr va viloyat: 80 Vt'li C36S80 sinfi.</li><li>Panel janubga, 40–45° qiyalikda. Qishda qor va chang tozalanishi servis jadvaliga kiritiladi.</li></ul>",
  manba: [M.hik41, M.hik80],
  ru: {
    yorliq: "Для монтажника",
    sarlavha: "Компактной модели зимой мало: два класса",
    tana: "<p>В солнечной 4G-линейке Hikvision два класса. Разница видна в декабре и на морозе.</p>" +
      "<table><tr><th></th><th>DS-2XS2T41G1-ID/4G</th><th>DS-2XS6A46G1/P-IZS/C36S80</th></tr>" +
      "<tr><td>Панель</td><td class='n'>6,5 Вт</td><td class='n'>80 Вт</td></tr>" +
      "<tr><td>Аккумулятор</td><td class='n'>51,46 Вт·ч, NMC</td><td class='n'>360 Вт·ч</td></tr>" +
      "<tr><td>Рабочая температура</td><td class='n'>0…+50 °C</td><td class='n'>−20…+60 °C</td></tr>" +
      "<tr><td>Температура заряда</td><td class='n'>0…+45 °C</td><td class='n'>−20…+45 °C</td></tr>" +
      "<tr><td>Без солнца, активный режим</td><td class='n'>1,5 дня</td><td class='n'>8 дней</td></tr>" +
      "<tr><td>Без солнца, ожидание</td><td class='n'>11 дней</td><td class='n'>80 дней</td></tr></table>" +
      "<h4>Декабрьский расчёт</h4><p>В декабре в Ташкенте приходит 1,62 кВт·ч/м² в сутки. Панель 6,5 Вт с учётом потерь даёт около 7 Вт·ч в сутки. Камера в ожидании потребляет 80 мВт, при работе 4G — 1,85 Вт, максимум 7 Вт. Значит, в декабре она может активно работать около 3 часов в сутки, остальное время спит.</p>" +
      "<h4>Что закупить</h4><ul><li>Компактная модель: закрытый навес или внутренний двор, где зимой не ниже 0 °C.</li><li>Открытый периметр и области: класс C36S80 с панелью 80 Вт.</li><li>Панель на юг, наклон 40–45°. Очистку от снега и пыли зимой включают в график сервиса.</li></ul>"
  }
},

"s-y02.band2": {
  yorliq: "Jamoa rahbarlari uchun",
  sarlavha: "Oq IP yo'q: APN, VPN yoki ISUP",
  tana: "<p>4G kamerada router yo'q, modem kameraning ichida. Operator SIM'ga oq IP bermaydi, shuning uchun markaz kameraga o'zi ulana olmaydi. Uchta ish yo'li bor.</p>" +
    "<table><tr><th>Yo'l</th><th>Qanday ishlaydi</th><th>Kimga mos</th></tr>" +
    "<tr><td>Korporativ APN</td><td>Operator SIM'larni bankning yopiq tarmog'iga ulaydi, kamera 10.x manzil oladi</td><td>100+ obyekt, operator bilan shartnoma</td></tr>" +
    "<tr><td>VPN router</td><td>Kamera LAN orqali 4G routerga ulanadi, router tunnel ochadi</td><td>Obyektda boshqa qurilmalar ham bo'lsa</td></tr>" +
    "<tr><td>ISUP</td><td>Kameraning o'zi platformaga chiquvchi ulanish ochadi</td><td>HikCentral yoki ISUP qabul qiluvchi adapter</td></tr></table>" +
    "<h4>Tavsiya</h4><p>Pilotda ISUP: SIM oddiy, operator bilan kelishuv shart emas. Kamera datasheet'ida API sifatida ISAPI, SDK, ISUP va OTAP ko'rsatilgan. 100 obyektdan keyin korporativ APN'ga o'tiladi, shunda ISAPI va RTSP adapterdan to'g'ridan-to'g'ri ishlaydi.</p>" +
    "<p class='ogoh'>Ixcham modelda ONVIF yo'q, faqat ISAPI, SDK va ISUP. Katta C36S80 komplektida ONVIF Profile S, G, T bor. Brenddan mustaqil bo'lish muhim bo'lsa, tenderda ONVIF talab qilinadi.</p>",
  manba: [M.hik41, M.hik80],
  ru: {
    yorliq: "Для тимлидов",
    sarlavha: "Белого IP нет: APN, VPN или ISUP",
    tana: "<p>У 4G-камеры нет роутера, модем встроен. Белого IP на SIM оператор не даёт, поэтому центр не может подключиться к камере сам. Рабочих вариантов три.</p>" +
      "<table><tr><th>Путь</th><th>Как работает</th><th>Кому подходит</th></tr>" +
      "<tr><td>Корпоративный APN</td><td>Оператор заводит SIM в закрытую сеть банка, камера получает адрес 10.x</td><td>100+ объектов, договор с оператором</td></tr>" +
      "<tr><td>VPN-роутер</td><td>Камера подключается к 4G-роутеру по LAN, роутер поднимает туннель</td><td>Если на объекте есть и другие устройства</td></tr>" +
      "<tr><td>ISUP</td><td>Камера сама устанавливает исходящее соединение с платформой</td><td>HikCentral или адаптер, принимающий ISUP</td></tr></table>" +
      "<h4>Рекомендация</h4><p>На пилоте — ISUP: SIM обычная, договариваться с оператором не нужно. В datasheet камеры как API указаны ISAPI, SDK, ISUP и OTAP. После 100 объектов переходим на корпоративный APN, и тогда ISAPI и RTSP работают из адаптера напрямую.</p>" +
      "<p class='ogoh'>В компактной модели нет ONVIF, только ISAPI, SDK и ISUP. В большом комплекте C36S80 есть ONVIF Profile S, G, T. Если важна независимость от бренда, ONVIF прописывают в тендере.</p>"
  }
},

"s-y02.band3": {
  yorliq: "Jamoa rahbarlari uchun",
  sarlavha: "ISAPI: oqim, hodisa, holat",
  tana: "<h4>Video</h4><pre><code>rtsp://user:pass@10.20.0.41:554/Streaming/Channels/101   # asosiy\nrtsp://user:pass@10.20.0.41:554/Streaming/Channels/102   # qo'shimcha</code></pre>" +
    "<p>Asosiy oqim 2560×1440, 50 Hz'da 12,5 kadr/s. Qo'shimcha oqim 1280×720 gacha. Platforma panelida qo'shimcha oqim ochiladi, asosiysi faqat kattalashtirishda. 4G trafigi shu bilan tejaladi.</p>" +
    "<h4>Hodisalar</h4><pre><code>GET /ISAPI/Event/notification/alertStream\n→ multipart oqim, har hodisa XML: eventType, dateTime, channelID</code></pre>" +
    "<p>Adapter bitta uzun HTTP ulanishni ochiq ushlaydi. Ulanish uzilsa, 5, 15, 60 soniyalik oraliqlar bilan qayta ulanadi va uzilish vaqtini kamera holati sifatida yozadi.</p>" +
    "<h4>Adapter chiqaradigan yagona hodisa</h4><pre><code>{ \"obyekt\": \"AK-2025/0934\", \"qurilma\": \"KAM-0007\",\n  \"tur\": \"harakat\", \"vaqt\": \"2026-12-14T03:12:40+05:00\",\n  \"klip\": \"/media/KAM-0007/20261214-031240.mp4\" }</code></pre>" +
    "<p class='ogoh'>Datasheet eslatmasi: uyqu rejimida yozuv kamera uyg'ongandan keyin boshlanadi. Hodisaning birinchi soniyalari klipga tushmasligi mumkin. Radar va PIR datchik bu kechikishni qisqartiradi, lekin nolga tushirmaydi.</p>",
  manba: [M.hik41],
  ru: {
    yorliq: "Для тимлидов",
    sarlavha: "ISAPI: поток, события, состояние",
    tana: "<h4>Видео</h4><pre><code>rtsp://user:pass@10.20.0.41:554/Streaming/Channels/101   # основной\nrtsp://user:pass@10.20.0.41:554/Streaming/Channels/102   # дополнительный</code></pre>" +
      "<p>Основной поток 2560×1440, 12,5 кадра/с при 50 Гц, дополнительный — до 1280×720. В панели платформы открывается дополнительный поток, основной — только при увеличении. Так экономится 4G-трафик.</p>" +
      "<h4>События</h4><pre><code>GET /ISAPI/Event/notification/alertStream\n→ multipart-поток, каждое событие в XML: eventType, dateTime, channelID</code></pre>" +
      "<p>Адаптер держит одно долгое HTTP-соединение. При обрыве переподключается с паузами 5, 15, 60 секунд и пишет время обрыва в состояние камеры.</p>" +
      "<h4>Единое событие на выходе адаптера</h4><pre><code>{ \"obyekt\": \"AK-2025/0934\", \"qurilma\": \"KAM-0007\",\n  \"tur\": \"harakat\", \"vaqt\": \"2026-12-14T03:12:40+05:00\",\n  \"klip\": \"/media/KAM-0007/20261214-031240.mp4\" }</code></pre>" +
      "<p class='ogoh'>Примечание в datasheet: в спящем режиме запись начинается после пробуждения камеры. Первые секунды события могут не попасть в клип. Радар и PIR-датчик сокращают задержку, но не убирают её.</p>"
  }
},

"s-y02.band4": {
  yorliq: "Montajchi uchun",
  sarlavha: "Domofon va zamok: alohida DC zanjir",
  tana: "<p>Quyosh kamerasining akkumulyatori faqat kamera uchun hisoblangan. Unda rele chiqishi yo'q, domofon yoki zamokni undan oziqlantirib bo'lmaydi. Kirish uchun alohida zanjir yig'iladi.</p>" +
    "<h4>Zanjir tarkibi</h4><ul><li>12 V LiFePO4 50–100 A·soat, past haroratda zaryadni to'xtatadigan BMS bilan.</li><li>30–60 Vt panel va MPPT kontroller.</li><li>4G router, video domofon yoki yuz terminali, 12 V kirish kontrolleri.</li><li>Elektromexanik yoki motorli zamok: tok faqat ochish paytida.</li></ul>" +
    "<h4>Buyruq yo'li</h4><p>Platforma ISAPI orqali domofon yoki terminalga eshikni ochish buyrug'ini yuboradi. Terminal o'z relesi bilan zamokni 3–5 soniyaga ochadi. Buyruq, operator va ariza raqami jurnalga yoziladi.</p>" +
    "<h4>Montajchi tekshiradi</h4><ul><li>Zamokning ochish toki va kontroller relesining toki mosligi.</li><li>Kutish rejimidagi umumiy tok: ampermetr bilan, o'rnatishdan keyin.</li><li>Zamok tokdan qolsa eshik yopiq qolishi (fail-secure).</li></ul>" +
    "<p class='ogoh'>Yuz terminali biometrik ma'lumot yig'adi. O'RQ-1125 bo'yicha u O'zbekistondagi serverda saqlanadi, bulutli xizmat bunga javob berishi tekshiriladi.</p>",
  manba: [M.hik41],
  ru: {
    yorliq: "Для монтажника",
    sarlavha: "Домофон и замок: отдельная цепь DC",
    tana: "<p>Аккумулятор солнечной камеры рассчитан только на камеру. Релейного выхода у неё нет, питать от неё домофон или замок нельзя. Для доступа собирается отдельная цепь.</p>" +
      "<h4>Состав цепи</h4><ul><li>LiFePO4 12 В 50–100 А·ч с BMS, которая останавливает заряд на морозе.</li><li>Панель 30–60 Вт и MPPT-контроллер.</li><li>4G-роутер, видеодомофон или терминал распознавания лиц, контроллер доступа 12 В.</li><li>Электромеханический или моторный замок: ток только в момент открытия.</li></ul>" +
      "<h4>Путь команды</h4><p>Платформа отправляет домофону или терминалу команду на открытие через ISAPI. Терминал своим реле открывает замок на 3–5 секунд. Команда, оператор и номер заявки пишутся в журнал.</p>" +
      "<h4>Что проверяет монтажник</h4><ul><li>Совпадают ли ток открытия замка и допустимый ток реле контроллера.</li><li>Суммарный ток в режиме ожидания — амперметром, после монтажа.</li><li>При пропадании питания дверь остаётся закрытой (fail-secure).</li></ul>" +
      "<p class='ogoh'>Терминал распознавания лиц собирает биометрию. По ЗРУ-1125 она хранится на сервере в Узбекистане; облачный сервис проверяют на соответствие.</p>"
  }
},

"s-y02.narx1": {
  yorliq: "Moliya va huquq",
  sarlavha: "Bir kamerali obyekt: smeta va 5 yil",
  tana: "<table><tr><th>Qator</th><th>mln so'm</th></tr>" +
    "<tr><td>Quyosh-4G komplekti (ixcham model)</td><td class='n'>3,8–5,2</td></tr>" +
    "<tr><td>Kronshteyn, ustun yoki devor mahkamlagichi</td><td class='n'>0,3–0,8</td></tr>" +
    "<tr><td>microSD 128–256 GB</td><td class='n'>0,2–0,4</td></tr>" +
    "<tr><td>Montaj, yo'naltirish, sozlash</td><td class='n'>0,7–1,5</td></tr>" +
    "<tr><td>Zaxira: qo'shimcha panel yoki ikkinchi kamera</td><td class='n'>0–2,0</td></tr>" +
    "<tr><td><b>Jami</b></td><td class='n'>5–9</td></tr></table>" +
    "<p>Taxminiy bozor narxi, 2026. 80 Vt'li C36S80 sinfidagi komplekt ancha qimmat va alohida so'raladi.</p>" +
    "<h4>Qayerdan olinadi</h4><ul><li>Hikvision'ning O'zbekistondagi rasmiy distributori (uzhikvision.uz).</li><li>SAT Solutions: loyihalash, yetkazish, montaj va servis bir shartnomada.</li></ul>" +
    "<h4>5 yillik xarajat</h4><ul><li>4G SIM: oyiga taxminan 50–80 ming so'm, 5 yilda 3,0–4,8 mln.</li><li>Akkumulyator 800 tsiklga mo'ljallangan, 2–3 yilda bir marta almashtirish.</li><li>Yiliga bir servis tashrifi: panelni tozalash, mahkamlashni tekshirish.</li></ul>" +
    "<div class='raqamlar'><div><b>5–9 mln</b><span>boshlang'ich</span></div><div><b>10–16 mln</b><span>5 yillik jami, taxminan</span></div></div>" +
    "<p class='ogoh'>Sotuvchidan so'raladi: O'zbekiston uchun rasmiy kafolat, 4G chastotalari (LTE B1/B3/B8/B20) mahalliy operatorga mosligi va akkumulyatorni alohida sotib olish imkoni.</p>",
  manba: [M.hikUz, M.sat, M.hik41],
  ru: {
    yorliq: "Финансы и право",
    sarlavha: "Объект на одну камеру: смета и 5 лет",
    tana: "<table><tr><th>Статья</th><th>млн сум</th></tr>" +
      "<tr><td>Солнечный 4G-комплект (компактная модель)</td><td class='n'>3,8–5,2</td></tr>" +
      "<tr><td>Кронштейн, мачта или крепёж на стену</td><td class='n'>0,3–0,8</td></tr>" +
      "<tr><td>microSD 128–256 ГБ</td><td class='n'>0,2–0,4</td></tr>" +
      "<tr><td>Монтаж, наведение, настройка</td><td class='n'>0,7–1,5</td></tr>" +
      "<tr><td>Резерв: доп. панель или вторая камера</td><td class='n'>0–2,0</td></tr>" +
      "<tr><td><b>Итого</b></td><td class='n'>5–9</td></tr></table>" +
      "<p>Оценка по рынку, 2026. Комплект класса C36S80 с панелью 80 Вт заметно дороже, его запрашивают отдельно.</p>" +
      "<h4>Где купить</h4><ul><li>Официальный дистрибьютор Hikvision в Узбекистане (uzhikvision.uz).</li><li>SAT Solutions: проект, поставка, монтаж и сервис одним договором.</li></ul>" +
      "<h4>Расходы за 5 лет</h4><ul><li>4G SIM: около 50–80 тыс. сумов в месяц, за 5 лет 3,0–4,8 млн.</li><li>Аккумулятор рассчитан на 800 циклов, замена раз в 2–3 года.</li><li>Один сервисный выезд в год: очистка панели, проверка крепежа.</li></ul>" +
      "<div class='raqamlar'><div><b>5–9 млн</b><span>начальные</span></div><div><b>10–16 млн</b><span>итого за 5 лет, оценка</span></div></div>" +
      "<p class='ogoh'>Спросить у поставщика: официальную гарантию для Узбекистана, совместимость 4G-диапазонов (LTE B1/B3/B8/B20) с местным оператором и возможность купить аккумулятор отдельно.</p>"
  }
},

"s-y02.diqqat1": {
  yorliq: "Texnik izoh",
  sarlavha: "Dekabr va sovuq: qanday hisoblanadi",
  tana: "<div class='raqamlar'><div><b>1,62</b><span>kVt·soat/m², dekabr</span></div><div><b>7,60</b><span>kVt·soat/m², iyun</span></div><div><b>4,7×</b><span>farq</span></div></div>" +
    "<p>Komplekt iyunga qarab tanlansa, dekabrda akkumulyator bir necha kunda bo'shaydi. Hisob eng qorong'i oydan boshlanadi.</p>" +
    "<h4>Hisob tartibi</h4><ol><li>Kameraning sutkalik sarfi: kutish soatlari × kutish quvvati + faol soatlar × ish quvvati.</li><li>Panel beradigan energiya: panel quvvati × 1,62 × 0,7 (issiqlik, chang, burchak yo'qotishi).</li><li>Ikkinchisi birinchisidan kam bo'lmasligi kerak, aks holda panel kattalashtiriladi yoki faol vaqt qisqartiriladi.</li><li>Akkumulyator quyoshsiz kamida 5 kunga yetishi kerak.</li></ol>" +
    "<h4>Nega past harorat himoyasi</h4><p>Ixcham modelning NMC akkumulyatori 0 °C dan past zaryadlanmaydi, ishlash harorati ham 0 °C dan boshlanadi. Sovuqda zaryad kontroller tomonidan to'xtatilmasa, akkumulyator tez eskiradi. C36S80 komplekti −20 °C da ham zaryadlanadi va ishlaydi.</p>" +
    "<p class='ogoh'>Tender shartiga yoziladi: ishlash harorati −20 °C dan, zaryad harorati datasheet'da alohida ko'rsatilgan, quyoshsiz avtonomiya kamida 5 kun.</p>",
  manba: [M.hik41, M.hik80],
  ru: {
    yorliq: "Техническая справка",
    sarlavha: "Декабрь и мороз: как считать",
    tana: "<div class='raqamlar'><div><b>1,62</b><span>кВт·ч/м², декабрь</span></div><div><b>7,60</b><span>кВт·ч/м², июнь</span></div><div><b>4,7×</b><span>разница</span></div></div>" +
      "<p>Если подобрать комплект по июню, в декабре аккумулятор сядет за несколько дней. Расчёт начинают с самого тёмного месяца.</p>" +
      "<h4>Порядок расчёта</h4><ol><li>Суточное потребление камеры: часы ожидания × мощность ожидания + активные часы × рабочая мощность.</li><li>Энергия от панели: мощность панели × 1,62 × 0,7 (потери на нагрев, пыль, угол).</li><li>Второе не должно быть меньше первого, иначе увеличивают панель или сокращают активное время.</li><li>Аккумулятора должно хватать минимум на 5 дней без солнца.</li></ol>" +
      "<h4>Зачем защита от холода</h4><p>NMC-аккумулятор компактной модели не заряжается ниже 0 °C, и рабочая температура тоже начинается с 0 °C. Если контроллер не остановит заряд на морозе, аккумулятор быстро деградирует. Комплект C36S80 заряжается и работает до −20 °C.</p>" +
      "<p class='ogoh'>В условия тендера записывают: рабочая температура от −20 °C, температура заряда отдельно указана в datasheet, автономность без солнца не меньше 5 дней.</p>"
  }
},

/* ============================== s-y03 · Dahua ============================== */
"s-y03.band1": {
  yorliq: "Montajchi uchun",
  sarlavha: "125 Vt panel va 45 A·soat LiFePO4",
  tana: "<p>Aylanuvchi kamera qo'zg'almas kameradan ko'proq quvvat oladi, shuning uchun komplekt kattaroq. Dahua'ning integratsiyalashgan komplekti ustunga o'rnatiladi.</p>" +
    "<table><tr><th>Qism</th><th>Parametr</th></tr>" +
    "<tr><td>Panel</td><td>125 Vt, monokristall, 18,8 V</td></tr>" +
    "<tr><td>Kontroller</td><td>MPPT, 12 V, 10 A, RS-485, past harorat himoyasi</td></tr>" +
    "<tr><td>Akkumulyator</td><td>PFM372-L45-4S14P: 12,8 V, 45 A·soat (≈576 Vt·soat), alohida sotiladi</td></tr>" +
    "<tr><td>Kamera</td><td>4 MP, 25× zum, IR 100 m, 4G</td></tr>" +
    "<tr><td>Ishlash harorati</td><td>−20…+60 °C</td></tr></table>" +
    "<h4>Kamera sarfi</h4><p>Chuqur uyqu 0,05 Vt, yengil uyqu 2,5 Vt. Oqim uzatmasdan 3,75 Vt, 4G oqim bilan 4,54 Vt, IR yoqiq holda 7,98 Vt. Eng ko'pi 15,49 Vt: IR, burilish va oqim birga.</p>" +
    "<h4>Dekabr hisobi</h4><p>125 Vt × 1,62 × 0,75 ≈ 150 Vt·soat sutkasiga. Kamera tunda 14 soat IR bilan va kunduzi 10 soat oddiy ishlasa, taxminan 150 Vt·soat oladi. Balans nolga teng: bulutli kunlar akkumulyatordan yopiladi, u taxminan 3,5 kunga yetadi.</p>" +
    "<p class='ogoh'>Datasheet komplektni sutkasiga 3,5 soatdan ko'p quyosh tushadigan joylar uchun belgilaydi. Dekabrda Toshkent bu chegaradan past. Qishda kamera jadval bo'yicha yengil uyquga o'tkaziladi yoki ikkinchi akkumulyator qo'shiladi.</p>",
  manba: [M.dhKit, M.dhBat],
  ru: {
    yorliq: "Для монтажника",
    sarlavha: "Панель 125 Вт и LiFePO4 45 А·ч",
    tana: "<p>Поворотная камера потребляет больше неподвижной, поэтому и комплект крупнее. Интегрированный комплект Dahua монтируется на мачту.</p>" +
      "<table><tr><th>Узел</th><th>Параметр</th></tr>" +
      "<tr><td>Панель</td><td>125 Вт, монокристалл, 18,8 В</td></tr>" +
      "<tr><td>Контроллер</td><td>MPPT, 12 В, 10 А, RS-485, защита от холода</td></tr>" +
      "<tr><td>Аккумулятор</td><td>PFM372-L45-4S14P: 12,8 В, 45 А·ч (≈576 Вт·ч), продаётся отдельно</td></tr>" +
      "<tr><td>Камера</td><td>4 Мп, зум 25×, ИК 100 м, 4G</td></tr>" +
      "<tr><td>Рабочая температура</td><td>−20…+60 °C</td></tr></table>" +
      "<h4>Потребление камеры</h4><p>Глубокий сон 0,05 Вт, лёгкий сон 2,5 Вт. Без передачи потока 3,75 Вт, с потоком по 4G 4,54 Вт, с ИК-подсветкой 7,98 Вт. Максимум 15,49 Вт: подсветка, поворот и поток одновременно.</p>" +
      "<h4>Декабрьский расчёт</h4><p>125 Вт × 1,62 × 0,75 ≈ 150 Вт·ч в сутки. Если камера 14 часов ночью работает с подсветкой и 10 часов днём в обычном режиме, она тратит около 150 Вт·ч. Баланс нулевой: пасмурные дни покрывает аккумулятор, его хватает примерно на 3,5 дня.</p>" +
      "<p class='ogoh'>По datasheet комплект предназначен для мест, где солнце светит больше 3,5 часа в сутки. В декабре Ташкент ниже этой границы. Зимой камеру по расписанию переводят в лёгкий сон или ставят второй аккумулятор.</p>"
  }
},

"s-y03.band2": {
  yorliq: "Jamoa rahbarlari uchun",
  sarlavha: "Auto Register: kamera o'zi chiqadi",
  tana: "<p>Hikvision'dagi kabi, 4G SIM'da oq IP yo'q. Dahua kamerasida buning uchun chiquvchi ulanish rejimi bor: kamera o'zi DSS serveriga yoki uni qabul qiluvchi adapterga ro'yxatdan o'tadi.</p>" +
    "<table><tr><th>Yo'l</th><th>Afzalligi</th><th>Kamchiligi</th></tr>" +
    "<tr><td>Auto Register → DSS</td><td>SIM oddiy, sozlash tez</td><td>DSS litsenziyasi va serveri kerak</td></tr>" +
    "<tr><td>Korporativ APN</td><td>RTSP, CGI, ONVIF to'g'ridan-to'g'ri</td><td>Operator bilan shartnoma</td></tr>" +
    "<tr><td>4G router va VPN</td><td>Istalgan brend, bitta sxema</td><td>Qo'shimcha qurilma va sarf</td></tr></table>" +
    "<h4>Dahua va Hikvision birga</h4><p>Ikkala brend ham ISUP yoki Auto Register bilan o'z platformasiga chiqadi. Ikkita vendor platformasini saqlamaslik uchun MKB adapteri o'zi qabul qiluvchi bo'ladi yoki korporativ APN olinadi. Tender tanlovi platformaga ta'sir qilmasligi kerak.</p>" +
    "<h4>Trafik</h4><p>Kamera har doim oqim bermaydi. Platforma qo'shimcha oqimni (D1 yoki 720p) so'raydi, asosiy 4 MP oqim faqat operator zumlaganda ochiladi.</p>",
  manba: [M.dhKit],
  ru: {
    yorliq: "Для тимлидов",
    sarlavha: "Auto Register: камера выходит сама",
    tana: "<p>Как и у Hikvision, белого IP на 4G SIM нет. У камеры Dahua для этого есть режим исходящего подключения: камера сама регистрируется на сервере DSS или на адаптере, который его принимает.</p>" +
      "<table><tr><th>Путь</th><th>Плюс</th><th>Минус</th></tr>" +
      "<tr><td>Auto Register → DSS</td><td>Обычная SIM, быстрая настройка</td><td>Нужны лицензия и сервер DSS</td></tr>" +
      "<tr><td>Корпоративный APN</td><td>RTSP, CGI, ONVIF напрямую</td><td>Договор с оператором</td></tr>" +
      "<tr><td>4G-роутер и VPN</td><td>Любой бренд, одна схема</td><td>Лишнее устройство и потребление</td></tr></table>" +
      "<h4>Dahua и Hikvision вместе</h4><p>Оба бренда через ISUP или Auto Register выходят на собственную платформу. Чтобы не держать две вендорские платформы, адаптер MKB сам выступает принимающей стороной или берётся корпоративный APN. Выбор в тендере не должен влиять на платформу.</p>" +
      "<h4>Трафик</h4><p>Камера не отдаёт поток постоянно. Платформа запрашивает дополнительный поток (D1 или 720p), основной 4 Мп открывается только при увеличении оператором.</p>"
  }
},

"s-y03.band3": {
  yorliq: "Jamoa rahbarlari uchun",
  sarlavha: "Dahua CGI: oqim, hodisa, PTZ",
  tana: "<h4>Video</h4><pre><code>rtsp://user:pass@10.20.0.52:554/cam/realmonitor?channel=1&amp;subtype=0   # asosiy\nrtsp://user:pass@10.20.0.52:554/cam/realmonitor?channel=1&amp;subtype=1   # qo'shimcha</code></pre>" +
    "<h4>Hodisalarga obuna</h4><pre><code>GET /cgi-bin/eventManager.cgi?action=attach&amp;codes=[All]&amp;heartbeat=5\n→ multipart oqim: Code=VideoMotion;action=Start;index=0</code></pre>" +
    "<p>Heartbeat har 5 soniyada keladi. Adapter 3 ta heartbeat kelmasa, kamerani «aloqasiz» deb belgilaydi va qayta ulanadi.</p>" +
    "<h4>PTZ</h4><pre><code>GET /cgi-bin/ptz.cgi?action=start&amp;channel=1&amp;code=GotoPreset&amp;arg1=0&amp;arg2=3&amp;arg3=0</code></pre>" +
    "<p>Kamerada 300 ta preset va 8 ta tur bor. Hodisa bo'lganda adapter kamerani darvoza presetiga buradi.</p>" +
    "<h4>Yagona format</h4><p>Dahua'ning <code>VideoMotion</code>, <code>CrossLineDetection</code> kodlari va Hikvision'ning <code>VMD</code>, <code>linedetection</code> turlari adapterda bitta ro'yxatga keltiriladi: harakat, chiziqni kesish, hudud, niqoblash, aloqa. Platforma brendni bilmaydi.</p>" +
    "<p class='ogoh'>Datasheet'da interoperabillik: CGI, SDK va ONVIF Profile S, G, T. Aniq CGI sintaksisi mikrodastur versiyasiga bog'liq, pilotda sinab tasdiqlanadi.</p>",
  manba: [M.dhKit],
  ru: {
    yorliq: "Для тимлидов",
    sarlavha: "Dahua CGI: поток, события, PTZ",
    tana: "<h4>Видео</h4><pre><code>rtsp://user:pass@10.20.0.52:554/cam/realmonitor?channel=1&amp;subtype=0   # основной\nrtsp://user:pass@10.20.0.52:554/cam/realmonitor?channel=1&amp;subtype=1   # дополнительный</code></pre>" +
      "<h4>Подписка на события</h4><pre><code>GET /cgi-bin/eventManager.cgi?action=attach&amp;codes=[All]&amp;heartbeat=5\n→ multipart-поток: Code=VideoMotion;action=Start;index=0</code></pre>" +
      "<p>Heartbeat приходит каждые 5 секунд. Если нет трёх подряд, адаптер помечает камеру как «без связи» и переподключается.</p>" +
      "<h4>PTZ</h4><pre><code>GET /cgi-bin/ptz.cgi?action=start&amp;channel=1&amp;code=GotoPreset&amp;arg1=0&amp;arg2=3&amp;arg3=0</code></pre>" +
      "<p>В камере 300 пресетов и 8 туров. По событию адаптер поворачивает камеру на пресет ворот.</p>" +
      "<h4>Единый формат</h4><p>Коды Dahua <code>VideoMotion</code>, <code>CrossLineDetection</code> и типы Hikvision <code>VMD</code>, <code>linedetection</code> адаптер сводит к одному списку: движение, пересечение линии, зона, закрытие объектива, связь. Платформа о бренде не знает.</p>" +
      "<p class='ogoh'>В datasheet совместимость: CGI, SDK и ONVIF Profile S, G, T. Точный синтаксис CGI зависит от прошивки, его подтверждают на пилоте.</p>"
  }
},

"s-y03.band4": {
  yorliq: "Jamoa rahbarlari uchun",
  sarlavha: "Aloqa yo'qolganda nima yo'qolmaydi",
  tana: "<p>4G signal qishda, yomg'irda yoki operator ishlarida yo'qoladi. Kamera buni sezmaydi: yozuv microSD'da davom etadi.</p>" +
    "<h4>Joyida saqlash</h4><ul><li>microSD 512 GB gacha, yoki FTP va NAS.</li><li>Hodisa bo'yicha yozuvda 256 GB bir necha haftaga yetadi. Uzluksiz 1080p yozuvda taxminan 1–2 hafta: bitreytga bog'liq.</li></ul>" +
    "<h4>Aloqa tiklangach</h4><ol><li>Kamera qayta ro'yxatdan o'tadi yoki adapter hodisa oqimiga qayta ulanadi.</li><li>Adapter aloqa uzilgan oraliqni biladi va shu oraliqdagi hodisalar ro'yxatini so'raydi.</li><li>Har hodisa uchun klip kameraning playback oqimidan olinadi:<pre><code>rtsp://…/cam/playback?channel=1&amp;starttime=2026_12_14_03_10_00&amp;endtime=2026_12_14_03_12_00</code></pre></li><li>Hodisa platformaga asl vaqti bilan, «kechikib keldi» belgisi bilan yoziladi.</li></ol>" +
    "<div class='raqamlar'><div><b>2 daqiqa</b><span>bir hodisa klipi</span></div><div><b>≈15 MB</b><span>D1 oqimda, taxminan</span></div></div>" +
    "<p class='ogoh'>microSD qishda tez ishdan chiqadi. Sanoat sinfidagi karta olinadi, adapter kartaning holatini kuzatadi: kamera «SD xatosi» hodisasini beradi.</p>",
  manba: [M.dhKit],
  ru: {
    yorliq: "Для тимлидов",
    sarlavha: "Что не теряется, когда пропала связь",
    tana: "<p>4G пропадает зимой, в дождь или при работах оператора. Камера этого не замечает: запись на microSD продолжается.</p>" +
      "<h4>Хранение на месте</h4><ul><li>microSD до 512 ГБ, либо FTP и NAS.</li><li>При записи по событиям 256 ГБ хватает на несколько недель. При непрерывной записи 1080p — примерно на 1–2 недели, в зависимости от битрейта.</li></ul>" +
      "<h4>После восстановления связи</h4><ol><li>Камера заново регистрируется или адаптер переподключается к потоку событий.</li><li>Адаптер знает интервал обрыва и запрашивает список событий за него.</li><li>Клип по каждому событию берётся из playback-потока камеры:<pre><code>rtsp://…/cam/playback?channel=1&amp;starttime=2026_12_14_03_10_00&amp;endtime=2026_12_14_03_12_00</code></pre></li><li>Событие попадает на платформу с исходным временем и пометкой «доставлено с опозданием».</li></ol>" +
      "<div class='raqamlar'><div><b>2 минуты</b><span>клип одного события</span></div><div><b>≈15 МБ</b><span>в потоке D1, оценка</span></div></div>" +
      "<p class='ogoh'>Зимой microSD быстро выходит из строя. Берут карту промышленного класса, а адаптер следит за её состоянием: камера отдаёт событие «ошибка SD».</p>"
  }
},

"s-y03.narx1": {
  yorliq: "Moliya va huquq",
  sarlavha: "Ikki narx sinfi: ixcham va 125 Vt'li",
  tana: "<p>Slayddagi 3,5–4,8 mln ixcham PT kamera komplektiga tegishli: kichik panel, ichki akkumulyator. U hovli yoki kichik ombor uchun. Katta perimetrda 25× zumli, 125 Vt'li komplekt kerak, u boshqa narx sinfida.</p>" +
    "<table><tr><th>Qator</th><th>Ixcham PT</th><th>125 Vt komplekt</th></tr>" +
    "<tr><td>Kamera va panel</td><td class='n'>3,5–4,8</td><td class='n'>so'rov bo'yicha</td></tr>" +
    "<tr><td>Akkumulyator</td><td class='n'>ichida</td><td class='n'>alohida</td></tr>" +
    "<tr><td>Ustun, poydevor, yerga ulash</td><td class='n'>1,0–2,5</td><td class='n'>2,0–4,0</td></tr>" +
    "<tr><td>Montaj va sozlash</td><td class='n'>1,0–2,0</td><td class='n'>1,5–3,0</td></tr>" +
    "<tr><td><b>Obyekt, mln so'm</b></td><td class='n'>7–12</td><td class='n'>ancha yuqori</td></tr></table>" +
    "<p>125 Vt komplektning Yevropa chakana narxi akkumulyatorsiz taxminan 1&nbsp;725 yevro. O'zbekistonda narx rasmiy distributordan so'raladi.</p>" +
    "<h4>Kim yetkazadi</h4><ul><li>Dahua'ning O'zbekistondagi rasmiy distributori (uzdahua.uz).</li><li>SAT Solutions: o'zini Dahua'ning strategik tizim integratori deb ko'rsatadi, loyihadan servisgacha ishlaydi.</li></ul>" +
    "<h4>5 yil</h4><p>SIM oyiga taxminan 50–80 ming so'm, yiliga bir servis, 3–4 yilda akkumulyator almashtirish. Ixcham komplekt uchun 5 yillik jami taxminan 12–18 mln so'm.</p>" +
    "<p class='ogoh'>Tenderda Hikvision va Dahua bir xil texnik shart bilan chaqiriladi: −20 °C, ONVIF, joyida yozuv, quyoshsiz 5 kun. Shunda narx raqobati haqiqiy bo'ladi.</p>",
  manba: [M.dhUz, M.sat, M.dhNarx],
  ru: {
    yorliq: "Финансы и право",
    sarlavha: "Два ценовых класса: компакт и 125 Вт",
    tana: "<p>Цифра 3,5–4,8 млн на слайде относится к компактному PT-комплекту: маленькая панель, встроенный аккумулятор. Он для двора или небольшого склада. Для большого периметра нужен комплект с зумом 25× и панелью 125 Вт, это другой ценовой класс.</p>" +
      "<table><tr><th>Статья</th><th>Компактный PT</th><th>Комплект 125 Вт</th></tr>" +
      "<tr><td>Камера и панель</td><td class='n'>3,5–4,8</td><td class='n'>по запросу</td></tr>" +
      "<tr><td>Аккумулятор</td><td class='n'>встроен</td><td class='n'>отдельно</td></tr>" +
      "<tr><td>Мачта, фундамент, заземление</td><td class='n'>1,0–2,5</td><td class='n'>2,0–4,0</td></tr>" +
      "<tr><td>Монтаж и настройка</td><td class='n'>1,0–2,0</td><td class='n'>1,5–3,0</td></tr>" +
      "<tr><td><b>Объект, млн сум</b></td><td class='n'>7–12</td><td class='n'>заметно выше</td></tr></table>" +
      "<p>Розничная цена комплекта 125 Вт в Европе без аккумулятора — около 1&nbsp;725 евро. Цену для Узбекистана запрашивают у официального дистрибьютора.</p>" +
      "<h4>Кто поставляет</h4><ul><li>Официальный дистрибьютор Dahua в Узбекистане (uzdahua.uz).</li><li>SAT Solutions: заявлен как стратегический системный интегратор Dahua, работает от проекта до сервиса.</li></ul>" +
      "<h4>5 лет</h4><p>SIM около 50–80 тыс. сумов в месяц, один сервисный выезд в год, замена аккумулятора через 3–4 года. Для компактного комплекта итог за 5 лет — примерно 12–18 млн сумов.</p>" +
      "<p class='ogoh'>В тендер Hikvision и Dahua приглашают с одинаковым ТЗ: −20 °C, ONVIF, локальная запись, 5 дней без солнца. Только тогда ценовая конкуренция настоящая.</p>"
  }
},

"s-y03.diqqat1": {
  yorliq: "Texnik izoh",
  sarlavha: "Sovuqda zaryad: nimani talab qilish",
  tana: "<p>Litiy akkumulyatorni 0 °C dan past zaryadlash anodda metall litiy yig'ilishiga olib keladi. Sig'im qaytmas darajada yo'qoladi, eng yomon holatda ichki qisqa tutashuv bo'ladi. Razryad esa sovuqda xavfsiz, faqat sig'im kamayadi.</p>" +
    "<table><tr><th>Komplekt</th><th>Zaryad</th><th>Ishlash</th></tr>" +
    "<tr><td>Hikvision ixcham, NMC</td><td class='n'>0…+45 °C</td><td class='n'>0…+50 °C</td></tr>" +
    "<tr><td>Hikvision C36S80</td><td class='n'>−20…+45 °C</td><td class='n'>−20…+60 °C</td></tr>" +
    "<tr><td>Dahua 125 Vt kontroller</td><td class='n'>past harorat himoyasi</td><td class='n'>−20…+60 °C</td></tr></table>" +
    "<h4>Tender shartiga</h4><ul><li>Kontroller yoki BMS 0 °C dan past zaryadni to'xtatadi yoki akkumulyatorni oldin isitadi.</li><li>Ishlash harorati −20 °C dan, datasheet'da yozilgan bo'lishi kerak, og'zaki va'da emas.</li><li>Quyoshsiz avtonomiya: dekabr sharoitida kamida 5 kun.</li><li>Sotuvchi qishki sinov natijasini yoki xuddi shu iqlimdagi mijoz referensini beradi.</li></ul>" +
    "<p>«Sertifikat» deganda ko'pincha sotuvchi datasheet'ni tushunadi. Talab aniq yoziladi: harorat oralig'i zaryad va ishlash uchun alohida ko'rsatilgan rasmiy datasheet.</p>",
  manba: [M.hik41, M.hik80, M.dhKit],
  ru: {
    yorliq: "Техническая справка",
    sarlavha: "Заряд на морозе: что требовать",
    tana: "<p>Заряд литиевого аккумулятора ниже 0 °C приводит к осаждению металлического лития на аноде. Ёмкость теряется безвозвратно, в худшем случае возникает внутреннее замыкание. Разряд на холоде безопасен, просто ёмкость ниже.</p>" +
      "<table><tr><th>Комплект</th><th>Заряд</th><th>Работа</th></tr>" +
      "<tr><td>Hikvision компактный, NMC</td><td class='n'>0…+45 °C</td><td class='n'>0…+50 °C</td></tr>" +
      "<tr><td>Hikvision C36S80</td><td class='n'>−20…+45 °C</td><td class='n'>−20…+60 °C</td></tr>" +
      "<tr><td>Контроллер Dahua 125 Вт</td><td class='n'>защита от холода</td><td class='n'>−20…+60 °C</td></tr></table>" +
      "<h4>В условия тендера</h4><ul><li>Контроллер или BMS останавливает заряд ниже 0 °C либо сначала подогревает аккумулятор.</li><li>Рабочая температура от −20 °C, записанная в datasheet, а не устное обещание.</li><li>Автономность без солнца — не меньше 5 дней в декабрьских условиях.</li><li>Поставщик даёт результаты зимних испытаний или референс клиента в таком же климате.</li></ul>" +
      "<p>Под «сертификатом» поставщик часто понимает datasheet. Требование пишут точно: официальный datasheet, где диапазоны для заряда и для работы указаны отдельно.</p>"
  }
},

/* ============================== s-y04 · LiFePO4 shkafi ============================== */
"s-y04.diqqat1": {
  yorliq: "Texnik izoh",
  sarlavha: "Sovuq va blok almashtirish marshruti",
  tana: "<p>Blok obyektda faqat razryad bo'ladi. LiFePO4 razryadi −20 °C gacha ruxsat etiladi, 0 °C dan past zaryad taqiqi esa bazada hal bo'ladi: bo'shagan blok isitiladigan xonada zaryadlanadi.</p>" +
    "<h4>Almashtirish qanday rejalashtiriladi</h4>" +
    "<ol><li>Adapter har obyektning zaryadini va qolgan kunini ko'rsatadi.</li>" +
    "<li>Qolgan kun 3 dan kam bo'lsa, servis vazifasi ochiladi.</li>" +
    "<li>Bir yo'nalishdagi obyektlar bitta marshrutga yig'iladi.</li>" +
    "<li>Zaryadlangan blok qo'yiladi, bo'sh blok bazaga qaytadi.</li></ol>" +
    "<div class='raqamlar'><div><b>6 kun</b><span>30 Vt yuklamada</span></div><div><b>12 kun</b><span>15 Vt'ga tushirilsa</span></div></div>" +
    "<p class='ogoh'>Tashrif soni yuklamaga bog'liq: 30 Vt da haftada bir marta, 15 Vt da ikki baravar kam. Rotatsiya fondi — har 2–3 obyektga bitta zaxira blok.</p>",
  manba: [],
  ru: {
    yorliq: "Техническая справка",
    sarlavha: "Холод и маршрут замены блока",
    tana: "<p>На объекте блок только разряжается. Разряд LiFePO4 допустим до −20 °C, а запрет на заряд ниже 0 °C снимается на базе: разряженный блок заряжают в отапливаемом помещении.</p>" +
      "<h4>Как планируется замена</h4>" +
      "<ol><li>Адаптер показывает заряд и оставшиеся дни по каждому объекту.</li>" +
      "<li>Если остаётся меньше трёх дней, открывается сервисная задача.</li>" +
      "<li>Объекты одного направления собираются в общий маршрут.</li>" +
      "<li>Ставится заряженный блок, разряженный уезжает на базу.</li></ol>" +
      "<div class='raqamlar'><div><b>6 дней</b><span>при нагрузке 30 Вт</span></div><div><b>12 дней</b><span>если снизить до 15 Вт</span></div></div>" +
      "<p class='ogoh'>Число выездов зависит от нагрузки: при 30 Вт — раз в неделю, при 15 Вт — вдвое реже. Ротационный фонд — один запасной блок на 2–3 объекта.</p>"
  }
},

"s-y04.band1": {
  yorliq: "Montajchi uchun",
  sarlavha: "Shkaf ichida nima va qancha yetadi",
  tana: "<table><tr><th>Iste'molchi</th><th>Taxminiy quvvat</th></tr>" +
    "<tr><td>2 ta PoE IP kamera, IR bilan</td><td class='n'>8–12 Vt</td></tr>" +
    "<tr><td>4 kanalli NVR, disk bilan</td><td class='n'>6–10 Vt</td></tr>" +
    "<tr><td>Ikki SIM'li 4G router</td><td class='n'>3–6 Vt</td></tr>" +
    "<tr><td>DC-DC o'zgartirgich yo'qotishi</td><td class='n'>1–2 Vt</td></tr>" +
    "<tr><td><b>Jami</b></td><td class='n'>≈30 Vt</td></tr></table>" +
    "<h4>Avtonomiya</h4><p>30 Vt × 24 soat = 0,72 kVt·soat sutkasiga. 5,12 kVt·soatlik 48 V 100 A·soat blok BMS chegarasi (90%) va DC-DC yo'qotishi (5%) bilan taxminan 4,4 kVt·soat beradi. Bu 6 kun.</p>" +
    "<div class='raqamlar'><div><b>6 kun</b><span>30 Vt yuklamada</span></div><div><b>12 kun</b><span>15 Vt'ga tushirilsa</span></div></div>" +
    "<h4>Yuklamani kamaytirish</h4><ul><li>NVR'da HDD o'rniga SSD yoki kameraning microSD'si.</li><li>IR faqat harakatda yoqiladi, kunduzi kamera past bitreytda.</li><li>48 V blokdan to'g'ridan-to'g'ri 48 V PoE: bir bosqich o'zgartirish kamroq.</li></ul>" +
    "<p class='ogoh'>Sovuq bu yechimga zarar qilmaydi. Akkumulyator obyektda faqat razryad bo'ladi, zaryad esa isitiladigan bazada. LiFePO4 razryadi −20 °C da ruxsat etiladi, 0 °C dan past zaryad taqiqi bu yerda muammo emas.</p>",
  manba: [],
  ru: {
    yorliq: "Для монтажника",
    sarlavha: "Что внутри шкафа и на сколько хватает",
    tana: "<table><tr><th>Потребитель</th><th>Мощность, оценка</th></tr>" +
      "<tr><td>2 IP-камеры PoE с ИК</td><td class='n'>8–12 Вт</td></tr>" +
      "<tr><td>4-канальный NVR с диском</td><td class='n'>6–10 Вт</td></tr>" +
      "<tr><td>4G-роутер на две SIM</td><td class='n'>3–6 Вт</td></tr>" +
      "<tr><td>Потери DC-DC</td><td class='n'>1–2 Вт</td></tr>" +
      "<tr><td><b>Итого</b></td><td class='n'>≈30 Вт</td></tr></table>" +
      "<h4>Автономность</h4><p>30 Вт × 24 ч = 0,72 кВт·ч в сутки. Блок 48 В 100 А·ч на 5,12 кВт·ч с учётом порога BMS (90%) и потерь DC-DC (5%) отдаёт около 4,4 кВт·ч. Это 6 дней.</p>" +
      "<div class='raqamlar'><div><b>6 дней</b><span>при 30 Вт</span></div><div><b>12 дней</b><span>если снизить до 15 Вт</span></div></div>" +
      "<h4>Как снизить нагрузку</h4><ul><li>В NVR SSD вместо HDD или запись на microSD камеры.</li><li>ИК включается только по движению, днём камера на низком битрейте.</li><li>PoE 48 В прямо от блока 48 В: на одну ступень преобразования меньше.</li></ul>" +
      "<p class='ogoh'>Холод этому решению не вредит. На объекте аккумулятор только разряжается, а заряжается на отапливаемой базе. Разряд LiFePO4 допустим до −20 °C, запрет заряда ниже 0 °C здесь не мешает.</p>"
  }
},

"s-y04.band2": {
  yorliq: "Montajchi uchun",
  sarlavha: "Shkafni yig'ish: ro'yxat va tartib",
  tana: "<h4>Tarkib</h4><ul><li>IP55 yoki undan yuqori metall shkaf, qulf va ochilish datchigi bilan.</li><li>48 V LiFePO4 blok, tez uziladigan ulagich bilan: almashtirish 10 daqiqadan oshmasligi kerak.</li><li>DC taqsimlash: saqlagichlar, 48→12 V o'zgartirgich.</li><li>4 portli PoE kommutator yoki PoE'li NVR.</li><li>2–4 ONVIF kamera, qo'zg'almas yoki PTZ.</li><li>Ikki SIM'li 4G router, tashqi antenna bilan.</li><li>Ixtiyoriy: video domofon, eshik va harakat datchiklari.</li></ul>" +
    "<h4>Montaj tartibi</h4><ol><li>Shkafni ichki xonaga yoki yashirin joyga qo'yish.</li><li>Kameralarga kabel: ichki devor bo'ylab, tashqi qismi gofra ichida.</li><li>Antennani signal eng kuchli nuqtaga chiqarish, ikki operatorda o'lchash.</li><li>Kamera va routerni MKB platformasida ro'yxatdan o'tkazish.</li><li>Kutish tokini o'lchab, dalolatnomaga yozish.</li></ol>" +
    "<p class='ogoh'>Akkumulyator shkafi o'g'rilar uchun qimmat o'lja. Shkaf devorga ankerlanadi, ochilish datchigi platformaga signal beradi, bloklarda seriya raqami va MKB belgisi bo'ladi.</p>",
  manba: [],
  ru: {
    yorliq: "Для монтажника",
    sarlavha: "Сборка шкафа: состав и порядок",
    tana: "<h4>Состав</h4><ul><li>Металлический шкаф IP55 или выше, с замком и датчиком вскрытия.</li><li>Блок LiFePO4 48 В с быстроразъёмным соединителем: замена не дольше 10 минут.</li><li>Распределение DC: предохранители, преобразователь 48→12 В.</li><li>4-портовый PoE-коммутатор или NVR с PoE.</li><li>2–4 ONVIF-камеры, неподвижные или PTZ.</li><li>4G-роутер на две SIM с внешней антенной.</li><li>Опционально: видеодомофон, датчики двери и движения.</li></ul>" +
      "<h4>Порядок монтажа</h4><ol><li>Поставить шкаф во внутреннее помещение или в скрытое место.</li><li>Кабели к камерам: по внутренней стене, снаружи в гофре.</li><li>Вынести антенну в точку лучшего сигнала, замерить у двух операторов.</li><li>Зарегистрировать камеры и роутер на платформе MKB.</li><li>Замерить ток ожидания и записать в акт.</li></ol>" +
      "<p class='ogoh'>Шкаф с аккумулятором — ценная добыча для воров. Шкаф анкеруют к стене, датчик вскрытия шлёт сигнал на платформу, на блоках серийный номер и маркировка MKB.</p>"
  }
},

"s-y04.band3": {
  yorliq: "Jamoa rahbarlari uchun",
  sarlavha: "Uch protokol: video, tarmoq, quvvat",
  tana: "<table><tr><th>Qurilma</th><th>Protokol</th><th>Adapter nimani oladi</th></tr>" +
    "<tr><td>Kamera</td><td>ONVIF Profile S/T, RTSP</td><td>Oqim, harakat hodisasi, kamera holati</td></tr>" +
    "<tr><td>NVR</td><td>ONVIF Profile G yoki vendor API</td><td>Arxivdan klip</td></tr>" +
    "<tr><td>Router</td><td>SNMP v3, HTTP API</td><td>Signal (RSRP, SINR), faol SIM, trafik</td></tr>" +
    "<tr><td>BMS</td><td>Modbus RTU (RS-485) yoki CAN</td><td>Zaryad %, kuchlanish, tok, harorat, xatolar</td></tr></table>" +
    "<h4>BMS qanday o'qiladi</h4><p>BMS odatda RS-485 orqali Modbus RTU beradi. Router yoki shkafdagi kichik shlyuz uni Modbus TCP'ga o'giradi, adapter tunnel orqali har 5 daqiqada o'qiydi.</p>" +
    "<pre><code>{ \"qurilma\": \"BAT-0012\", \"zaryad\": 41, \"kuchlanish\": 51.2,\n  \"tok\": -0.6, \"harorat\": -4, \"qolgan_kun\": 2.4 }</code></pre>" +
    "<p><code>qolgan_kun</code> adapterda hisoblanadi: qolgan energiya / oxirgi 24 soatdagi o'rtacha sarf. 3 kundan kam bo'lsa, servis vazifasi o'zi ochiladi.</p>" +
    "<p class='ogoh'>Modbus registr xaritasi har ishlab chiqaruvchida boshqa. Xarid shartiga yoziladi: sotuvchi registr xaritasini hujjat sifatida beradi. Xaritasiz BMS olinmaydi.</p>",
  manba: [],
  ru: {
    yorliq: "Для тимлидов",
    sarlavha: "Три протокола: видео, сеть, питание",
    tana: "<table><tr><th>Устройство</th><th>Протокол</th><th>Что берёт адаптер</th></tr>" +
      "<tr><td>Камера</td><td>ONVIF Profile S/T, RTSP</td><td>Поток, событие движения, состояние</td></tr>" +
      "<tr><td>NVR</td><td>ONVIF Profile G или API вендора</td><td>Клипы из архива</td></tr>" +
      "<tr><td>Роутер</td><td>SNMP v3, HTTP API</td><td>Сигнал (RSRP, SINR), активная SIM, трафик</td></tr>" +
      "<tr><td>BMS</td><td>Modbus RTU (RS-485) или CAN</td><td>Заряд %, напряжение, ток, температура, ошибки</td></tr></table>" +
      "<h4>Как читается BMS</h4><p>BMS обычно отдаёт Modbus RTU по RS-485. Роутер или небольшой шлюз в шкафу переводит его в Modbus TCP, адаптер опрашивает через туннель раз в 5 минут.</p>" +
      "<pre><code>{ \"qurilma\": \"BAT-0012\", \"zaryad\": 41, \"kuchlanish\": 51.2,\n  \"tok\": -0.6, \"harorat\": -4, \"qolgan_kun\": 2.4 }</code></pre>" +
      "<p><code>qolgan_kun</code> считает адаптер: остаток энергии / средний расход за последние 24 часа. Если меньше 3 дней, сервисная задача создаётся автоматически.</p>" +
      "<p class='ogoh'>Карта регистров Modbus у каждого производителя своя. В условиях закупки пишут: поставщик передаёт карту регистров документом. BMS без карты не покупают.</p>"
  }
},

"s-y04.band4": {
  yorliq: "Rahbariyat uchun",
  sarlavha: "Vendorga bog'lanmaslik va servis rejasi",
  tana: "<p>Shkaf standart qismlardan yig'iladi. Kamera ONVIF bo'yicha, router SNMP bo'yicha, BMS Modbus bo'yicha ulanadi. Istalgan qismni boshqa ishlab chiqaruvchinikiga almashtirish platformani o'zgartirmaydi.</p>" +
    "<h4>Almashtirish qanday rejalashtiriladi</h4><ol><li>Adapter har obyektning zaryadini va qolgan kunini ko'rsatadi.</li><li>Qolgan kun 3 dan kam bo'lsa, servis vazifasi ochiladi.</li><li>Servis bir yo'nalishdagi obyektlarni bitta marshrutga yig'adi.</li><li>Zaryadlangan blok qo'yiladi, bo'sh blok bazaga qaytadi.</li></ol>" +
    "<h4>Rahbariyat nimani hal qiladi</h4><ul><li>Rotatsiya fondi: har 2–3 obyektga bitta zaxira blok.</li><li>Kim almashtiradi: bank xodimi yoki servis shartnomasi bilan integrator.</li><li>Qaysi obyektlar shkafga mos: panel qo'yib bo'lmaydigan, lekin uzluksiz yozuv kerak bo'lganlar.</li></ul>" +
    "<p class='ogoh'>30 Vt yuklamada almashtirish haftada bir marta. Bu servis xarajatining asosiy qismi. Yuklama 15 Vt'ga tushirilsa, tashriflar ikki baravar kamayadi.</p>",
  manba: [],
  ru: {
    yorliq: "Для руководства",
    sarlavha: "Независимость от вендора и план сервиса",
    tana: "<p>Шкаф собирается из стандартных компонентов. Камера подключается по ONVIF, роутер по SNMP, BMS по Modbus. Замена любого узла на другой бренд не меняет платформу.</p>" +
      "<h4>Как планируется замена</h4><ol><li>Адаптер показывает заряд и оставшиеся дни по каждому объекту.</li><li>Если осталось меньше 3 дней, открывается сервисная задача.</li><li>Сервис объединяет объекты одного направления в один маршрут.</li><li>Ставится заряженный блок, разряженный возвращается на базу.</li></ol>" +
      "<h4>Что решает руководство</h4><ul><li>Обменный фонд: один резервный блок на 2–3 объекта.</li><li>Кто меняет: сотрудник банка или интегратор по сервисному договору.</li><li>Какие объекты подходят: где панель не поставить, а непрерывная запись нужна.</li></ul>" +
      "<p class='ogoh'>При нагрузке 30 Вт замена нужна раз в неделю. Это основная статья сервисных расходов. Если снизить нагрузку до 15 Вт, выездов станет вдвое меньше.</p>"
  }
},

"s-y04.narx1": {
  yorliq: "Moliya va huquq",
  sarlavha: "Smeta: jihoz arzon, servis qimmat",
  tana: "<table><tr><th>Qator</th><th>mln so'm</th></tr>" +
    "<tr><td>48 V 100 A·soat LiFePO4, Modbus BMS bilan</td><td class='n'>6–9</td></tr>" +
    "<tr><td>Shkaf, DC taqsimlash, o'zgartirgich</td><td class='n'>1,5–2,5</td></tr>" +
    "<tr><td>2 ta ONVIF kamera va NVR</td><td class='n'>2,5–4,5</td></tr>" +
    "<tr><td>Ikki SIM'li 4G router</td><td class='n'>1,0–2,0</td></tr>" +
    "<tr><td>Montaj va sozlash</td><td class='n'>1,0–2,0</td></tr>" +
    "<tr><td><b>Jami</b></td><td class='n'>12–20</td></tr></table>" +
    "<p>Taxminiy bozor narxi, 2026. Rotatsiya uchun har 2–3 obyektga bitta zaxira blok qo'shiladi: obyektga 2–4,5 mln.</p>" +
    "<h4>5 yillik xarajat</h4><table><tr><th>Qator</th><th>mln so'm</th></tr>" +
    "<tr><td>Boshlang'ich va zaxira blok</td><td class='n'>14–24</td></tr>" +
    "<tr><td>SIM, oyiga 60–100 ming</td><td class='n'>3,6–6,0</td></tr>" +
    "<tr><td>Almashtirish tashriflari, 15 Vt yuklamada yiliga ≈30 marta</td><td class='n'>asosiy o'zgaruvchi</td></tr></table>" +
    "<p>Bitta tashrif narxi masofa va marshrutga bog'liq. Bir marshrutda 5–8 obyekt yig'ilsa, tashrif xarajati obyektlarga bo'linadi. Pilotda haqiqiy narx o'lchanadi.</p>" +
    "<h4>Kim yetkazadi</h4><p>Past kuchlanish tizimlari integratori shkafni yig'adi, LiFePO4 blokni sanoat akkumulyator yetkazuvchisi beradi. Shartnomada BMS registr xaritasi, 3 yil kafolat va kamida 3 000 tsikl yoziladi.</p>",
  manba: [],
  ru: {
    yorliq: "Финансы и право",
    sarlavha: "Смета: железо дёшево, сервис дорог",
    tana: "<table><tr><th>Статья</th><th>млн сум</th></tr>" +
      "<tr><td>LiFePO4 48 В 100 А·ч с Modbus BMS</td><td class='n'>6–9</td></tr>" +
      "<tr><td>Шкаф, распределение DC, преобразователь</td><td class='n'>1,5–2,5</td></tr>" +
      "<tr><td>2 ONVIF-камеры и NVR</td><td class='n'>2,5–4,5</td></tr>" +
      "<tr><td>4G-роутер на две SIM</td><td class='n'>1,0–2,0</td></tr>" +
      "<tr><td>Монтаж и настройка</td><td class='n'>1,0–2,0</td></tr>" +
      "<tr><td><b>Итого</b></td><td class='n'>12–20</td></tr></table>" +
      "<p>Оценка по рынку, 2026. Для ротации добавляется один резервный блок на 2–3 объекта: 2–4,5 млн на объект.</p>" +
      "<h4>Расходы за 5 лет</h4><table><tr><th>Статья</th><th>млн сум</th></tr>" +
      "<tr><td>Начальные и резервный блок</td><td class='n'>14–24</td></tr>" +
      "<tr><td>SIM, 60–100 тыс. в месяц</td><td class='n'>3,6–6,0</td></tr>" +
      "<tr><td>Выезды на замену, при 15 Вт ≈30 в год</td><td class='n'>главная переменная</td></tr></table>" +
      "<p>Стоимость выезда зависит от расстояния и маршрута. Если в маршрут собрать 5–8 объектов, затраты делятся между ними. Реальную цену выезда замеряют на пилоте.</p>" +
      "<h4>Кто поставляет</h4><p>Шкаф собирает интегратор слаботочных систем, блок LiFePO4 поставляет поставщик промышленных аккумуляторов. В договоре: карта регистров BMS, гарантия 3 года и не меньше 3 000 циклов.</p>"
  }
},

/* ============================== s-y05 · Ajax ============================== */
"s-y05.band1": {
  yorliq: "Montajchi uchun",
  sarlavha: "Hub'ni DC'ga o'tkazish va hisob",
  tana: "<p>Ajax Hub 2 (4G) zavoddan 110–240 V tarmoqqa mo'ljallangan. Elektrsiz obyektda montajchi standart ta'minot platasini alohida sotiladigan modulga almashtiradi.</p>" +
    "<table><tr><th>Variant</th><th>Kirish</th></tr>" +
    "<tr><td>6V PSU (type A)</td><td>6 V DC</td></tr>" +
    "<tr><td>12–24V PSU (type A)</td><td>12–24 V DC</td></tr>" +
    "<tr><td>Ichki zaxira akkumulyator</td><td>3,7 V, 3 A·soat, faqat SIM'da 15 soatgacha</td></tr></table>" +
    "<h4>Hisob</h4><p>Ichki akkumulyator 3,7 V × 3 A·soat ≈ 11 Vt·soat va Ajax ma'lumotiga ko'ra 15 soat yetadi. Demak hub o'rtacha taxminan 0,75 Vt oladi. 12 V 50 A·soat LiFePO4 (640 Vt·soat, 90% razryad) bir oydan ko'proqqa yetadi. Doimiy yoqiq IP kamera qo'shilsa, bu muddat bir necha barobar qisqaradi.</p>" +
    "<h4>Datchiklar</h4><ul><li>DoorProtect: 7 yilgacha.</li><li>MotionCam (foto bilan): 2 × CR123A, 4 yilgacha.</li><li>FireProtect 2 almashtiriladigan batareyada: 5 yilgacha.</li></ul>" +
    "<p class='ogoh'>Hub va datchiklar −10…+40 °C ga mo'ljallangan. Sovuqda batareya muddati qisqaradi. Isitilmaydigan binoda hub ichki xonaga qo'yiladi, platforma har datchikning batareya foizini kuzatadi.</p>",
  manba: [M.ajHub, M.ajPsu, M.ajCam, M.ajBat],
  ru: {
    yorliq: "Для монтажника",
    sarlavha: "Перевод хаба на DC и расчёт",
    tana: "<p>Ajax Hub 2 (4G) с завода рассчитан на сеть 110–240 В. На объекте без электричества штатную плату питания меняют на модуль, который продаётся отдельно.</p>" +
      "<table><tr><th>Вариант</th><th>Вход</th></tr>" +
      "<tr><td>6V PSU (type A)</td><td>6 В DC</td></tr>" +
      "<tr><td>12–24V PSU (type A)</td><td>12–24 В DC</td></tr>" +
      "<tr><td>Встроенный резервный аккумулятор</td><td>3,7 В, 3 А·ч, до 15 часов только на SIM</td></tr></table>" +
      "<h4>Расчёт</h4><p>Встроенный аккумулятор 3,7 В × 3 А·ч ≈ 11 Вт·ч по данным Ajax держит 15 часов. Значит, хаб в среднем потребляет около 0,75 Вт. LiFePO4 12 В 50 А·ч (640 Вт·ч, разряд до 90%) хватает больше чем на месяц. Постоянно включённая IP-камера сократит этот срок в разы.</p>" +
      "<h4>Датчики</h4><ul><li>DoorProtect: до 7 лет.</li><li>MotionCam (с фото): 2 × CR123A, до 4 лет.</li><li>FireProtect 2 на сменных батареях: до 5 лет.</li></ul>" +
      "<p class='ogoh'>Хаб и датчики рассчитаны на −10…+40 °C. На холоде батареи служат меньше. В неотапливаемом здании хаб ставят во внутреннее помещение, а платформа следит за зарядом батареи каждого датчика.</p>"
  }
},

"s-y05.band2": {
  yorliq: "Montajchi uchun",
  sarlavha: "Qaysi datchik qayerga",
  tana: "<table><tr><th>Datchik</th><th>Joy</th><th>Nima beradi</th></tr>" +
    "<tr><td>DoorProtect</td><td>Kirish eshigi, darvoza, deraza</td><td>Ochilish lahzasi</td></tr>" +
    "<tr><td>MotionCam</td><td>Koridor, ombor kirishi</td><td>Harakat va surat seriyasi</td></tr>" +
    "<tr><td>FireProtect 2</td><td>Har xona shipi</td><td>Tutun, harorat, variantga qarab is gazi</td></tr>" +
    "<tr><td>IP kamera</td><td>Asosiy kirish</td><td>Hodisadan keyin video tasdiq</td></tr></table>" +
    "<h4>Video tasdiq ikki yo'l bilan</h4><ul><li><b>MotionCam surati.</b> Kamera kerak emas, energiya kam. Surat 640×480 gacha, eng past sifatda 7 soniyagacha, eng yuqorisida 20 soniyagacha yetkaziladi.</li><li><b>RTSP kamera.</b> Hub'ga 25 tagacha kamera ulanadi. Kamera doim yoqiq bo'lsa, qo'shimcha quvvat kerak.</li></ul>" +
    "<h4>Obyekt uchun odatiy to'plam</h4><p>Hub, 2 ta DoorProtect, 2 ta MotionCam, har xonaga FireProtect 2, ichki sirena. Hub 100 tagacha qurilmani oladi, kichik obyektda zaxira katta.</p>" +
    "<p class='ogoh'>Signal masofasini o'rnatishdan oldin tekshiring: qalin devorli omborda ReX 2 radio kengaytirgichi kerak bo'lishi mumkin. Ilova har datchik uchun signal kuchini ko'rsatadi.</p>",
  manba: [M.ajHub, M.ajCam],
  ru: {
    yorliq: "Для монтажника",
    sarlavha: "Какой датчик куда",
    tana: "<table><tr><th>Датчик</th><th>Место</th><th>Что даёт</th></tr>" +
      "<tr><td>DoorProtect</td><td>Входная дверь, ворота, окно</td><td>Момент открытия</td></tr>" +
      "<tr><td>MotionCam</td><td>Коридор, вход в склад</td><td>Движение и серия снимков</td></tr>" +
      "<tr><td>FireProtect 2</td><td>Потолок каждого помещения</td><td>Дым, температура, в некоторых версиях CO</td></tr>" +
      "<tr><td>IP-камера</td><td>Главный вход</td><td>Видеоподтверждение после события</td></tr></table>" +
      "<h4>Два способа видеоподтверждения</h4><ul><li><b>Снимок MotionCam.</b> Камера не нужна, энергии мало. Снимок до 640×480, при минимальном качестве доставляется до 7 секунд, при максимальном — до 20.</li><li><b>RTSP-камера.</b> К хабу подключается до 25 камер. Если камера включена постоянно, нужна дополнительная мощность.</li></ul>" +
      "<h4>Типовой набор на объект</h4><p>Хаб, 2 DoorProtect, 2 MotionCam, FireProtect 2 в каждое помещение, внутренняя сирена. Хаб держит до 100 устройств, для небольшого объекта запас большой.</p>" +
      "<p class='ogoh'>Проверьте дальность связи до монтажа: на складе с толстыми стенами может понадобиться ретранслятор ReX 2. Приложение показывает уровень сигнала для каждого датчика.</p>"
  }
},

"s-y05.band3": {
  yorliq: "Jamoa rahbarlari uchun",
  sarlavha: "SIA DC-09 qabul qiluvchi adapter",
  tana: "<p>Ajax hub'i hodisani pultga o'zi yuboradi. Qo'llanadigan protokollar: SIA DC-09, SurGard (Contact ID), ADEMCO 685. Bizda pult o'rnida MKB adapteri turadi.</p>" +
    "<h4>Qanday ishlaydi</h4><ol><li>Adapter TCP portda SIA DC-09 qabul qiluvchini ishga tushiradi.</li><li>Hub sozlamasida pult manzili sifatida VPN yoki korporativ APN ichidagi adapter manzili, hisob raqami va shifrlash kaliti kiritiladi.</li><li>Hub hodisani yuboradi, adapter tasdiq (ACK) qaytaradi. Tasdiq kelmasa, hub qayta yuboradi.</li><li>Hub vaqti-vaqti bilan test xabari yuboradi. Xabar kelmasa, adapter «aloqa yo'q» hodisasini ochadi.</li></ol>" +
    "<pre><code>\"SIA-DCS\"0042L0#AK0934[#AK0934|Nri1/BA05]\n→ { \"obyekt\": \"AK-2025/0934\", \"tur\": \"buzib_kirish\", \"zona\": 5 }</code></pre>" +
    "<h4>Video</h4><p>SIA DC-09 faqat hodisa beradi. Video uchun adapter obyektdagi RTSP kamera oqimini o'zi ochadi va hodisa kartasiga klipni bog'laydi.</p>" +
    "<p class='ogoh'>Hodisa kodlari (BA, FA, YT va boshqalar) jadvali adapterda saqlanadi. Hub mikrodasturi yangilanganda kodlar ro'yxati test hub'da tekshiriladi.</p>",
  manba: [M.ajHub, M.ajSia],
  ru: {
    yorliq: "Для тимлидов",
    sarlavha: "Адаптер-приёмник SIA DC-09",
    tana: "<p>Хаб Ajax сам отправляет события на пульт. Поддерживаются протоколы SIA DC-09, SurGard (Contact ID), ADEMCO 685. У нас роль пульта выполняет адаптер MKB.</p>" +
      "<h4>Как работает</h4><ol><li>Адаптер поднимает приёмник SIA DC-09 на TCP-порту.</li><li>В настройках хаба адресом пульта указывают адрес адаптера внутри VPN или корпоративного APN, номер объекта и ключ шифрования.</li><li>Хаб отправляет событие, адаптер возвращает подтверждение (ACK). Нет подтверждения — хаб повторяет отправку.</li><li>Хаб периодически шлёт тестовое сообщение. Если его нет, адаптер создаёт событие «нет связи».</li></ol>" +
      "<pre><code>\"SIA-DCS\"0042L0#AK0934[#AK0934|Nri1/BA05]\n→ { \"obyekt\": \"AK-2025/0934\", \"tur\": \"buzib_kirish\", \"zona\": 5 }</code></pre>" +
      "<h4>Видео</h4><p>SIA DC-09 передаёт только событие. За видео адаптер сам открывает RTSP-поток камеры на объекте и прикрепляет клип к карточке события.</p>" +
      "<p class='ogoh'>Таблица кодов событий (BA, FA, YT и другие) хранится в адаптере. При обновлении прошивки хаба список кодов проверяют на тестовом хабе.</p>"
  }
},

"s-y05.band4": {
  yorliq: "Texnik izoh",
  sarlavha: "Masofadan boshqaruv: nima mumkin",
  tana: "<table><tr><th>Amal</th><th>Qanday</th></tr>" +
    "<tr><td>Qo'riqqa qo'yish va olish</td><td>Ajax PRO ilovasi yoki platformadan</td></tr>" +
    "<tr><td>Surat so'rash</td><td>MotionCam'dan talab bo'yicha surat</td></tr>" +
    "<tr><td>Holat</td><td>Har datchik: batareya, signal, qopqoq, oxirgi aloqa</td></tr>" +
    "<tr><td>Buyruq</td><td>Relay yoki WallSwitch orqali: zamok, sirena, chiroq</td></tr></table>" +
    "<h4>Foydalanuvchilar va huquqlar</h4><p>Hub 50 tagacha foydalanuvchini oladi. Filial xodimi faqat o'z obyektini ko'radi, markaz operatori hammasini. Qo'riqdan olish kim tomonidan qilingani jurnalga yoziladi.</p>" +
    "<h4>Ko'rik kuni</h4><ol><li>Xaridor ko'rikka keladi, operator ariza bo'yicha qo'riqni olib qo'yadi.</li><li>Eshik relesi ochiladi, MotionCam kirishni suratga oladi.</li><li>Ko'rik tugagach, qo'riq qayta yoqiladi. Unutilsa, platforma 30 daqiqadan keyin eslatadi.</li></ol>" +
    "<p class='ogoh'>Relay moduli ham tok oladi. Zamok iste'molsiz turdagi bo'lishi kerak: elektromagnit zamok akkumulyatorni tez bo'shatadi.</p>",
  manba: [M.ajHub],
  ru: {
    yorliq: "Техническая справка",
    sarlavha: "Удалённое управление: что можно",
    tana: "<table><tr><th>Действие</th><th>Как</th></tr>" +
      "<tr><td>Постановка и снятие с охраны</td><td>Приложение Ajax PRO или платформа</td></tr>" +
      "<tr><td>Запрос снимка</td><td>Снимок MotionCam по требованию</td></tr>" +
      "<tr><td>Состояние</td><td>Каждый датчик: батарея, сигнал, тампер, последний выход на связь</td></tr>" +
      "<tr><td>Команда</td><td>Через Relay или WallSwitch: замок, сирена, свет</td></tr></table>" +
      "<h4>Пользователи и права</h4><p>Хаб поддерживает до 50 пользователей. Сотрудник филиала видит только свой объект, оператор центра — все. Кто снял охрану, фиксируется в журнале.</p>" +
      "<h4>День осмотра</h4><ol><li>Покупатель приезжает на осмотр, оператор по заявке снимает охрану.</li><li>Открывается реле двери, MotionCam фотографирует вход.</li><li>После осмотра охрана включается снова. Если забыли, платформа напомнит через 30 минут.</li></ol>" +
      "<p class='ogoh'>Модуль Relay тоже потребляет ток. Замок нужен без постоянного потребления: электромагнитный быстро разрядит аккумулятор.</p>"
  }
},

"s-y05.narx1": {
  yorliq: "Moliya va huquq",
  sarlavha: "Ajax to'plami: smeta va 5 yil",
  tana: "<table><tr><th>Qator</th><th>mln so'm</th></tr>" +
    "<tr><td>Hub 2 (4G)</td><td class='n'>3,3–5,5</td></tr>" +
    "<tr><td>12–24V PSU moduli</td><td class='n'>so'rov bo'yicha</td></tr>" +
    "<tr><td>2 ta DoorProtect, har biri ≈0,63</td><td class='n'>1,2–1,3</td></tr>" +
    "<tr><td>2 ta FireProtect 2, har biri ≈0,91</td><td class='n'>1,8–1,9</td></tr>" +
    "<tr><td>MotionCam, sirena</td><td class='n'>bozor narxi</td></tr>" +
    "<tr><td>LiFePO4 12 V 50 A·soat</td><td class='n'>0,8–1,3</td></tr>" +
    "<tr><td>Montaj va sozlash</td><td class='n'>0,8–1,5</td></tr>" +
    "<tr><td><b>Obyekt jami</b></td><td class='n'>7–10</td></tr></table>" +
    "<p>Hub va datchik narxlari 2026-yil bozor kuzatuvidan, qolgani taxminiy.</p>" +
    "<h4>Qayerdan olinadi</h4><p>Ajax'ning O'zbekistondagi distribyutsiya sayti ajax-systems.uz, uni ERC yuritadi. Hamkor bo'lish, texnik maslahat va pultga ulash bo'yicha yordam shu yerda. Montajni Ajax hamkori bo'lgan xavfsizlik integratori qiladi.</p>" +
    "<h4>5 yil</h4><ul><li>SIM: hub trafigi kichik, oyiga taxminan 30–60 ming so'm.</li><li>Ajax ilovasi va bulutining asosiy funksiyalari obunasiz.</li><li>Datchik batareyalari 4–7 yilda bir marta almashtiriladi, CR123A arzon.</li><li>LiFePO4 oyiga bir marta zaryadlanadi yoki kichik panel qo'yiladi.</li></ul>" +
    "<div class='raqamlar'><div><b>7–10 mln</b><span>boshlang'ich</span></div><div><b>10–14 mln</b><span>5 yillik jami, taxminan</span></div></div>",
  manba: [M.ajUz, M.ajHub],
  ru: {
    yorliq: "Финансы и право",
    sarlavha: "Комплект Ajax: смета и 5 лет",
    tana: "<table><tr><th>Статья</th><th>млн сум</th></tr>" +
      "<tr><td>Hub 2 (4G)</td><td class='n'>3,3–5,5</td></tr>" +
      "<tr><td>Модуль 12–24V PSU</td><td class='n'>по запросу</td></tr>" +
      "<tr><td>2 DoorProtect, ≈0,63 за штуку</td><td class='n'>1,2–1,3</td></tr>" +
      "<tr><td>2 FireProtect 2, ≈0,91 за штуку</td><td class='n'>1,8–1,9</td></tr>" +
      "<tr><td>MotionCam, сирена</td><td class='n'>по рынку</td></tr>" +
      "<tr><td>LiFePO4 12 В 50 А·ч</td><td class='n'>0,8–1,3</td></tr>" +
      "<tr><td>Монтаж и настройка</td><td class='n'>0,8–1,5</td></tr>" +
      "<tr><td><b>Итого на объект</b></td><td class='n'>7–10</td></tr></table>" +
      "<p>Цены хаба и датчиков — по мониторингу рынка 2026 года, остальное — оценка.</p>" +
      "<h4>Где купить</h4><p>Дистрибьюторский сайт Ajax в Узбекистане — ajax-systems.uz, его ведёт ERC. Там оформляют партнёрство, получают техконсультацию и помощь с подключением к пульту. Монтирует интегратор безопасности, партнёр Ajax.</p>" +
      "<h4>5 лет</h4><ul><li>SIM: трафик хаба небольшой, около 30–60 тыс. сумов в месяц.</li><li>Базовые функции приложения и облака Ajax без подписки.</li><li>Батареи датчиков меняют раз в 4–7 лет, CR123A недорогие.</li><li>LiFePO4 заряжают раз в месяц или ставят небольшую панель.</li></ul>" +
      "<div class='raqamlar'><div><b>7–10 млн</b><span>начальные</span></div><div><b>10–14 млн</b><span>итого за 5 лет, оценка</span></div></div>"
  }
},

"s-y05.diqqat1": {
  yorliq: "Moliya va huquq",
  sarlavha: "Yong'in talabi va qo'riqlash chegarasi",
  tana: "<h4>Yong'in signalizatsiyasi</h4><p>VMQning 2020-yil 20-oktyabrdagi 649-son qarori bilan tasdiqlangan Yong'in xavfsizligi qoidalarining 30-bandi obyektlarni 9-ilovaga muvofiq avtomatik yong'in signalizatsiyasi bilan jihozlashni talab qiladi. 9-ilova bino va xonalar turlarini sanaydi. Talab obyekt turiga bog'liq, elektr bor-yo'qligiga emas.</p>" +
    "<h4>Bank nima qiladi</h4><ol><li>Balansdagi har obyekt turini 9-ilova bilan solishtiradi.</li><li>Talab bo'lgan obyektda loyiha bo'yicha signalizatsiya o'rnatiladi. Batareyali datchik bu talabni yopishi qoidalarda yozilmagan, IIV yong'in xavfsizligi organi bilan kelishiladi.</li><li>Talab bo'lmagan obyektda Ajax datchiklari ixtiyoriy himoya sifatida qo'yiladi.</li></ol>" +
    "<h4>Qo'riqlash</h4><p>O'RQ-778 bo'yicha shartnoma asosida qo'riqlash faqat davlat ishi: uni IIV huzuridagi Qo'riqlash departamenti bajaradi. Bank o'z mulkini o'zi kuzatishi mumkin, lekin hodisaga javob choralarini xususiy xizmatga topshira olmaydi. Qimmat obyektda signal Qo'riqlash departamenti pultiga ham chiqarilishi mumkin, bu alohida shartnoma.</p>" +
    "<p class='ogoh'>Yuridik xizmat ikki narsani yozma tasdiqlaydi: har obyekt turi uchun signalizatsiya talabi va hodisaga kim javob berishi.</p>",
  manba: [M.vmq, M.ajSia],
  ru: {
    yorliq: "Финансы и право",
    sarlavha: "Пожарные требования и граница охраны",
    tana: "<h4>Пожарная сигнализация</h4><p>Пункт 30 Правил пожарной безопасности, утверждённых постановлением КМ № 649 от 20 октября 2020 года, требует оснащать объекты автоматической пожарной сигнализацией по приложению 9. В приложении 9 перечислены типы зданий и помещений. Требование зависит от типа объекта, а не от наличия электричества.</p>" +
      "<h4>Что делает банк</h4><ol><li>Сверяет тип каждого объекта на балансе с приложением 9.</li><li>Где требование есть, сигнализация ставится по проекту. Закрывает ли его батарейный датчик, в Правилах не сказано, это согласуют с органом пожарной безопасности МВД.</li><li>Где требования нет, датчики Ajax ставят как добровольную защиту.</li></ol>" +
      "<h4>Охрана</h4><p>По ЗРУ-778 охрану по договору осуществляет только государство — Департамент охраны при МВД. Банк может наблюдать за своим имуществом сам, но не может передать реагирование частной службе. Для дорогого объекта сигнал можно вывести и на пульт Департамента охраны, это отдельный договор.</p>" +
      "<p class='ogoh'>Юридическая служба письменно подтверждает две вещи: требование к сигнализации для каждого типа объекта и кто реагирует на событие.</p>"
  }
}

});
})();

/* ---- yechimB ---- */
/* yechimB: 12–16 va 18-slaydlar (s-y06..s-y10, s-narx) uchun batafsil yozuvlar.
   Narxlar — 2026-yil bozor bahosi, taxminiy oraliq. Yevro kursi taxminan 13 600 so'm (MB, 2026-sentabr). */
window.MKB_BATAFSIL = window.MKB_BATAFSIL || {};
Object.assign(window.MKB_BATAFSIL, {

  /* ============================ s-y06 · Milesight LoRaWAN ============================ */
  "s-y06.band1": {
    yorliq: "Montajchi uchun",
    sarlavha: "Datchik batareyasi va shlyuz quvvati",
    tana: "<p>Datchik elektrga ulanmaydi. Ichida zavod o'rnatgan Li-SOCl₂ batareya turadi: WS301 eshik datchigida 1200 mA·soatlik ER14250, EM300-TH harorat va namlik datchigida 4000 mA·soatlik ER18505. Milesight hisobida WS301 sozlamaga qarab 3,5–6,8 yil, EM300-TH 10 daqiqalik intervalda 5 yil ishlaydi.</p>" +
      "<h4>Quvvat shlyuzga kerak</h4><p>UG65 shlyuzi odatda 2,9 Vt, eng ko'pi 4,2 Vt oladi. Shuning uchun u elektr bor eng yaqin nuqtaga qo'yiladi: filial, qo'shni tashkilot yoki elektrga ulangan obyekt. DC UPS faqat tarmoqdagi uzilishni yopadi. Radiusda elektr bo'lmasa, shlyuz o'z paneli va akkumulyatori bilan ishlaydi:</p>" +
      "<table><tr><th>Iste'molchi</th><th>Sutkasiga</th></tr><tr><td>UG65 shlyuz, 2,9 Vt</td><td class='n'>70 Vt·soat</td></tr><tr><td>4G router, taxminan 3 Vt</td><td class='n'>72 Vt·soat</td></tr><tr><td>Jami</td><td class='n'>0,14 kVt·soat</td></tr></table>" +
      "<p>Dekabrda (1,62 kVt·soat/m²) buni 150–200 Vt panel va 12 V 100 A·soatlik LiFePO4 yopadi. Akkumulyator quyoshsiz 7–8 kun yetadi.</p>" +
      "<h4>Sovuqda</h4><p>WS301 −20…+60 °C da ishlaydi, sovuqda batareya sig'imi pasayadi. Qishda uzatish intervalini qisqartirmang. Shlyuzning LiFePO4 akkumulyatori 0 °C dan past zaryadlanmaydi: past harorat himoyali BMS yoki isitgichli blok oling.</p>" +
      "<p class='ogoh'>Har 20 datchikka 2–3 ta zaxira ER14250 va ER18505 batareya omborda turadi. Boshqa kimyodagi batareya qo'yilmaydi.</p>",
    manba: [["Milesight WS301", "https://www.milesight.com/iot/product/lorawan-sensor/ws301"], ["Milesight UG65", "https://www.milesight.com/iot/product/lorawan-gateway/ug65"], ["Milesight EM300-TH", "https://www.milesight.com/iot/product/lorawan-sensor/em300-th"]],
    ru: {
      yorliq: "Для монтажника",
      sarlavha: "Питание датчиков и шлюза",
      tana: "<p>Датчики к сети не подключаются. В каждом стоит заводская батарея Li-SOCl₂: в датчике двери WS301 — ER14250 на 1200 мА·ч, в датчике температуры и влажности EM300-TH — ER18505 на 4000 мА·ч. По данным Milesight, WS301 работает 3,5–6,8 года в зависимости от настроек, EM300-TH — 5 лет при интервале 10 минут.</p>" +
        "<h4>Питание нужно шлюзу</h4><p>Шлюз UG65 потребляет обычно 2,9 Вт, максимум 4,2 Вт. Поэтому его ставят в ближайшей точке с электричеством: филиал, соседняя организация или объект с подключением. DC UPS закрывает только перебои в сети. Если электричества в радиусе нет, шлюз работает от собственной панели и аккумулятора:</p>" +
        "<table><tr><th>Потребитель</th><th>В сутки</th></tr><tr><td>Шлюз UG65, 2,9 Вт</td><td class='n'>70 Вт·ч</td></tr><tr><td>4G-роутер, около 3 Вт</td><td class='n'>72 Вт·ч</td></tr><tr><td>Итого</td><td class='n'>0,14 кВт·ч</td></tr></table>" +
        "<p>В декабре (1,62 кВт·ч/м²) это покрывают панель 150–200 Вт и LiFePO4 12 В на 100 А·ч. Без солнца аккумулятора хватает на 7–8 суток.</p>" +
        "<h4>Зимой</h4><p>WS301 рассчитан на −20…+60 °C, на морозе ёмкость батареи падает. Интервал передачи зимой не сокращайте. LiFePO4 шлюза нельзя заряжать ниже 0 °C: берите BMS с защитой от низкой температуры или блок с подогревом.</p>" +
        "<p class='ogoh'>На каждые 20 датчиков на складе держат 2–3 запасные батареи ER14250 и ER18505. Батареи другой химии не ставятся.</p>"
    }
  },

  "s-y06.band2": {
    yorliq: "Montajchi uchun",
    sarlavha: "Bitta ombor uchun datchiklar ro'yxati",
    tana: "<p>500–1000 m² li ombor yoki texnik xona uchun odatiy tarkib. Aniq son obyekt ko'rigida belgilanadi.</p>" +
      "<table><tr><th>Qurilma</th><th>Soni</th><th>Qayerga</th></tr>" +
      "<tr><td>Eshik magnit kontakti (WS301)</td><td class='n'>2–4</td><td>Har eshik, darvoza va lyuk</td></tr>" +
      "<tr><td>Harorat va namlik (EM300-TH)</td><td class='n'>1</td><td>Eng nam yoki eng sovuq xona</td></tr>" +
      "<tr><td>Suv sizish datchigi</td><td class='n'>1</td><td>Podval, quvur kirgan joy</td></tr>" +
      "<tr><td>Tutun datchigi</td><td class='n'>1+</td><td>Har yopiq xonaga kamida bitta</td></tr>" +
      "<tr><td>Tasdiqlovchi kamera</td><td class='n'>1–2</td><td>Asosiy kirishga qaratib</td></tr></table>" +
      "<h4>O'rnatish tartibi</h4><ol><li>Har datchikning DevEUI yorlig'i skanerlanadi va reyestrga yoziladi, masalan <code>DAT-0012 → AK-2025/0934</code>.</li><li>Datchik shlyuzda OTAA bilan ro'yxatdan o'tadi.</li><li>Har datchik bir marta ishga tushiriladi va shlyuz panelida signal tekshiriladi. Amaliy chegara: RSSI −115 dBm dan yaxshi, SNR noldan yuqori.</li><li>Signal past bo'lsa, datchik metall eshikdan uzoqroqqa yoki shlyuzga qaragan devorga ko'chiriladi.</li><li>Platformada test hodisasi ko'rinmaguncha montaj yopilmaydi.</li></ol>" +
      "<h4>Xarid qilishda</h4><p>Datchik va shlyuz bitta chastota variantida olinadi. Buyurtmadan oldin qaysi diapazonga ruxsat borligi aniqlanadi (LoRaWAN oqimi haqidagi izohga qarang). Datchiklar −20 °C da ishlashi kerak.</p>",
    manba: [["Milesight WS301", "https://www.milesight.com/iot/product/lorawan-sensor/ws301"]],
    ru: {
      yorliq: "Для монтажника",
      sarlavha: "Набор датчиков для одного склада",
      tana: "<p>Типовой состав для склада или техпомещения на 500–1000 м². Точное количество определяется на обследовании.</p>" +
        "<table><tr><th>Устройство</th><th>Кол-во</th><th>Куда</th></tr>" +
        "<tr><td>Магнитный контакт двери (WS301)</td><td class='n'>2–4</td><td>Каждая дверь, ворота, люк</td></tr>" +
        "<tr><td>Температура и влажность (EM300-TH)</td><td class='n'>1</td><td>Самое влажное или холодное помещение</td></tr>" +
        "<tr><td>Датчик протечки</td><td class='n'>1</td><td>Подвал, ввод труб</td></tr>" +
        "<tr><td>Датчик дыма</td><td class='n'>1+</td><td>Минимум один на закрытое помещение</td></tr>" +
        "<tr><td>Камера подтверждения</td><td class='n'>1–2</td><td>На главный вход</td></tr></table>" +
        "<h4>Порядок монтажа</h4><ol><li>Сканируется наклейка DevEUI каждого датчика и заносится в реестр, например <code>DAT-0012 → AK-2025/0934</code>.</li><li>Датчик регистрируется на шлюзе через OTAA.</li><li>Каждый датчик срабатывает один раз, уровень сигнала проверяется в панели шлюза. Рабочий порог: RSSI лучше −115 дБм, SNR выше нуля.</li><li>При слабом сигнале датчик переносят дальше от металлической двери или на стену, обращённую к шлюзу.</li><li>Монтаж не закрывается, пока тестовое событие не появится на платформе.</li></ol>" +
        "<h4>При закупке</h4><p>Датчики и шлюз берутся в одном частотном исполнении. До заказа выясняется, на какой диапазон есть разрешение (см. пояснение к потоку LoRaWAN). Датчики должны работать при −20 °C.</p>"
    }
  },

  "s-y06.narx1": {
    yorliq: "Moliya va huquq",
    sarlavha: "3–8 mln so'm nimalardan yig'iladi",
    tana: "<p>Bir obyekt narxi. Shlyuz 5–10 obyektga umumiy, shuning uchun uning narxi bo'lib hisoblanadi.</p>" +
      "<table><tr><th>Qator</th><th>mln so'm</th></tr>" +
      "<tr><td>Datchiklar, 4–6 dona</td><td class='n'>2,0–4,0</td></tr>" +
      "<tr><td>Shlyuz ulushi (UG65 sinfi 6–9 mln, 5–10 obyektga)</td><td class='n'>0,6–1,5</td></tr>" +
      "<tr><td>Tasdiqlovchi kamera (obyektda bo'lsa, 0)</td><td class='n'>0–2,5</td></tr>" +
      "<tr><td>Montaj, sozlash, reyestrga kiritish</td><td class='n'>0,4–0,8</td></tr>" +
      "<tr><td>Jami</td><td class='n'>3–8</td></tr></table>" +
      "<p>Oraliq taxminiy, 2026-yil bozor bahosi. Yakuniy narx tenderdagi tijorat takliflaridan olinadi.</p>" +
      "<h4>Qayerdan olinadi</h4><p>Milesight rasmiy distribyutori orqali import yoki Toshkentdagi IoT integratori. Datchik, shlyuz va zaxira batareya bitta partiyada, bitta chastota variantida buyuriladi. O'rnatishni integrator qiladi, keyingi obyektlarni o'qitilgan bank montajchisi qila oladi.</p>" +
      "<h4>Besh yillik xarajat</h4><ul><li>Batareya almashtirish bir marta: 0,2–0,4 mln.</li><li>Shlyuz SIM kartasi obyektlarga bo'linadi: besh yilda 0,4–1,2 mln.</li><li>Kamerada 4G bo'lsa, eng katta qator shu: oyiga taxminan 50–100 ming, besh yilda 3–6 mln.</li></ul>" +
      "<p>Obyekt sotilgach datchiklar yechib olinadi va keyingi obyektga o'tadi. Bank bitta komplektni bir necha marta ishlatadi.</p>",
    manba: [],
    ru: {
      yorliq: "Финансы и право",
      sarlavha: "Из чего складываются 3–8 млн сумов",
      tana: "<p>Цена на один объект. Шлюз общий на 5–10 объектов, поэтому его стоимость делится.</p>" +
        "<table><tr><th>Статья</th><th>млн сумов</th></tr>" +
        "<tr><td>Датчики, 4–6 шт.</td><td class='n'>2,0–4,0</td></tr>" +
        "<tr><td>Доля шлюза (класс UG65 6–9 млн на 5–10 объектов)</td><td class='n'>0,6–1,5</td></tr>" +
        "<tr><td>Камера подтверждения (0, если уже есть)</td><td class='n'>0–2,5</td></tr>" +
        "<tr><td>Монтаж, настройка, внесение в реестр</td><td class='n'>0,4–0,8</td></tr>" +
        "<tr><td>Итого</td><td class='n'>3–8</td></tr></table>" +
        "<p>Диапазон ориентировочный, рыночная оценка 2026 года. Итоговая цена берётся из коммерческих предложений тендера.</p>" +
        "<h4>Где купить</h4><p>Импорт через официального дистрибьютора Milesight или IoT-интегратор в Ташкенте. Датчики, шлюз и запасные батареи заказываются одной партией и в одном частотном исполнении. Первый монтаж делает интегратор, следующие объекты может ставить обученный монтажник банка.</p>" +
        "<h4>Затраты за пять лет</h4><ul><li>Одна замена батарей: 0,2–0,4 млн.</li><li>SIM-карта шлюза делится между объектами: 0,4–1,2 млн за пять лет.</li><li>Если у камеры 4G, это самая крупная статья: около 50–100 тыс. в месяц, 3–6 млн за пять лет.</li></ul>" +
        "<p>После продажи объекта датчики снимают и переносят на следующий. Один комплект банк использует несколько раз.</p>"
    }
  },

  "s-y06.oqim1": {
    yorliq: "Jamoa rahbarlari uchun",
    sarlavha: "LoRaWAN: A sinf, OTAA va chastota ruxsati",
    tana: "<p>Batareyali datchiklar LoRaWAN'ning <b>A sinfida</b> ishlaydi. Datchik o'zi xabar yuborgandan keyingina ikki qisqa qabul oynasini ochadi. Serverdan yuborilgan buyruq datchikning navbatdagi xabarini kutadi: sozlamani zudlik bilan o'zgartirib bo'lmaydi. B va C sinflari tezroq, lekin batareyani ko'p yeydi.</p>" +
      "<h4>Ulanish</h4><ul><li>OTAA: DevEUI, JoinEUI va AppKey. AppKey reyestrda shifrlangan holda saqlanadi, Excel'da yuritilmaydi.</li><li>Payload baytlarda keladi. Shlyuz ichidagi dekoder uni JSON'ga aylantiradi.</li><li>Takror xabar <code>DevEUI + fCnt</code> juftligi bo'yicha tashlab yuboriladi.</li><li>Har datchik davriy holat yuboradi. Ketma-ket uchta xabar kelmasa, platforma «aloqa yo'q» hodisasini ochadi.</li></ul>" +
      "<h4>Chastota — hal qilinmagan savol</h4><p>LoRa Alliance'ning RP002 jadvalida O'zbekiston uchun faqat EU433 (433,05–434,79 MHz) yozilgan. Milesight datchiklari esa EU868, RU864 va boshqa variantlarda chiqadi, 433 MHz variant ro'yxatda yo'q. Shuning uchun 868 MHz qurilma xarididan oldin bank chastotadan foydalanish ruxsatini tasdiqlab olishi kerak. Ruxsat berilgan diapazon tender shartiga yoziladi.</p>" +
      "<p class='ogoh'>Chastota ruxsatisiz o'rnatilgan tarmoq tekshiruvda o'chirilishi mumkin. Bu savol pilotdan oldin yopiladi.</p>",
    manba: [["LoRa Alliance RP002-1.0.2", "https://lora-alliance.org/wp-content/uploads/2020/11/RP_2-1.0.2.pdf"], ["Milesight WS301", "https://www.milesight.com/iot/product/lorawan-sensor/ws301"]],
    ru: {
      yorliq: "Для тимлида",
      sarlavha: "LoRaWAN: класс A, OTAA и частотное разрешение",
      tana: "<p>Батарейные датчики работают в <b>классе A</b> LoRaWAN. Датчик открывает два коротких окна приёма только после собственной передачи. Команда с сервера ждёт следующего сообщения датчика: мгновенно поменять настройку нельзя. Классы B и C быстрее, но заметно сильнее разряжают батарею.</p>" +
        "<h4>Подключение</h4><ul><li>OTAA: DevEUI, JoinEUI и AppKey. AppKey хранится в реестре в зашифрованном виде, а не в Excel.</li><li>Payload приходит в байтах, декодер на шлюзе переводит его в JSON.</li><li>Дубликаты отбрасываются по паре <code>DevEUI + fCnt</code>.</li><li>Каждый датчик периодически шлёт состояние. Если три сообщения подряд не пришли, платформа открывает событие «нет связи».</li></ul>" +
        "<h4>Частота — открытый вопрос</h4><p>В таблице RP002 LoRa Alliance для Узбекистана указан только EU433 (433,05–434,79 МГц). Датчики Milesight выпускаются в исполнениях EU868, RU864 и других, варианта на 433 МГц в списке нет. Поэтому до закупки устройств на 868 МГц банк должен подтвердить разрешение на использование частоты. Разрешённый диапазон прописывается в условиях тендера.</p>" +
        "<p class='ogoh'>Сеть без частотного разрешения при проверке могут отключить. Вопрос закрывается до пилота.</p>"
    }
  },

  "s-y06.oqim2": {
    yorliq: "Montajchi uchun",
    sarlavha: "Shlyuzni o'rnatish va qamrovni tekshirish",
    tana: "<p>Bitta UG65 shlyuzi 10 daqiqalik intervalda taxminan 2000 ta qurilmani ko'taradi. Bir tumandagi hamma omborlar uchun bitta-ikkita shlyuz yetadi. Cheklov qurilma soni emas, masofa va to'siqlar.</p>" +
      "<div class='raqamlar'><div><b>2,9 Vt</b><span>odatiy iste'mol</span></div><div><b>IP65</b><span>tashqariga qo'yiladi</span></div><div><b>−40…+70 °C</b><span>ishlash harorati</span></div></div>" +
      "<h4>Qayerga qo'yiladi</h4><ul><li>Imkon qadar baland: tom, machta yoki suv minorasi. Antenna tik turadi.</li><li>Elektr bor nuqtada, 9–24 V DC yoki PoE orqali. DC UPS 4–8 soatlik uzilishni yopadi.</li><li>Shaharda qamrov taxminan 1–2 km, ochiq joyda 5 km va undan ko'p. Aniq radius joyida o'lchanadi.</li><li>Internet: 4G yoki Ethernet. 4G bo'lsa, SIM ikki operatordan tanlanadi.</li></ul>" +
      "<h4>Tekshirish</h4><ol><li>Standart parol almashtiriladi, ishlatilmaydigan xizmatlar o'chiriladi.</li><li>NTP sozlanadi: vaqti noto'g'ri shlyuz hodisa tartibini buzadi.</li><li>Har obyektdagi datchik ishga tushiriladi va shlyuz panelida RSSI va SNR yozib olinadi.</li><li>Natija dalolatnomaga ilova qilinadi.</li></ol>",
    manba: [["Milesight UG65", "https://www.milesight.com/iot/product/lorawan-gateway/ug65"]],
    ru: {
      yorliq: "Для монтажника",
      sarlavha: "Установка шлюза и проверка покрытия",
      tana: "<p>Один шлюз UG65 при интервале 10 минут держит около 2000 устройств. На все склады района хватает одного-двух шлюзов. Ограничение — не число устройств, а расстояние и препятствия.</p>" +
        "<div class='raqamlar'><div><b>2,9 Вт</b><span>обычное потребление</span></div><div><b>IP65</b><span>ставится снаружи</span></div><div><b>−40…+70 °C</b><span>рабочая температура</span></div></div>" +
        "<h4>Где ставить</h4><ul><li>Как можно выше: крыша, мачта, водонапорная башня. Антенна вертикально.</li><li>В точке с электричеством, через 9–24 В DC или PoE. DC UPS перекрывает отключения на 4–8 часов.</li><li>Покрытие в городе около 1–2 км, на открытой местности 5 км и больше. Точный радиус замеряют на месте.</li><li>Интернет: 4G или Ethernet. Для 4G SIM-карту выбирают из двух операторов.</li></ul>" +
        "<h4>Проверка</h4><ol><li>Сменить заводской пароль, отключить неиспользуемые сервисы.</li><li>Настроить NTP: шлюз с неверным временем ломает порядок событий.</li><li>На каждом объекте вызвать срабатывание датчика и записать RSSI и SNR в панели шлюза.</li><li>Результат приложить к акту.</li></ol>"
    }
  },

  "s-y06.oqim3": {
    yorliq: "Jamoa rahbarlari uchun",
    sarlavha: "MQTT mavzulari va hodisa formati",
    tana: "<p>UG65 ichidagi tarmoq serveri dekodlangan xabarni MQTT(s) yoki HTTP(s) bilan uzatadi. Bulut kerak emas: shlyuz to'g'ridan-to'g'ri MKB brokeriga ulanadi. Taklif qilinayotgan mavzu tuzilmasi:</p>" +
      "<pre><code>mkb/v1/{obyekt}/{device_id}/hodisa\nmkb/v1/{obyekt}/{device_id}/holat\nmkb/v1/shlyuz/{gw_id}/lwt</code></pre>" +
      "<pre><code>{\"obyekt\":\"AK-2025/0934\",\"device_id\":\"DAT-0012\",\n \"tur\":\"eshik\",\"qiymat\":\"ochiq\",\"batareya\":87,\n \"rssi\":-108,\"snr\":4.5,\"fcnt\":1532,\n \"vaqt\":\"2026-01-14T02:13:05+05:00\"}</code></pre>" +
      "<h4>Qoidalar</h4><ul><li>QoS 1, sessiya saqlanadi: aloqa uzilsa broker xabarni yo'qotmaydi.</li><li>TLS 1.2 va undan yuqori, har shlyuzga alohida mijoz sertifikati. Broker ACL shlyuzga faqat o'z obyektlariga yozishga ruxsat beradi.</li><li>LWT: shlyuz tushib qolsa, broker <code>lwt</code> mavzusiga «offline» yozadi va platforma bitta ogohlantirish chiqaradi, har datchik uchun emas.</li><li>Iste'molchi idempotent: <code>DevEUI + fcnt</code> bo'yicha takror yozilmaydi.</li></ul>" +
      "<p>HTTP varianti ham shu JSON'ni yuboradi, faqat HMAC imzo sarlavhasi bilan. Qaysi biri tanlansa ham, platformadagi hodisa modeli bitta.</p><h4>Yuklama</h4><p>Obyektda 5 datchik, har biri 10 daqiqada holat yuboradi: bu kuniga 720 ta xabar. 188 bino uchun sutkasiga taxminan 140 ming kichik xabar chiqadi, buni bitta broker bemalol ko'taradi.</p>",
    manba: [["Milesight UG65", "https://www.milesight.com/iot/product/lorawan-gateway/ug65"]],
    ru: {
      yorliq: "Для тимлида",
      sarlavha: "Топики MQTT и формат события",
      tana: "<p>Встроенный сетевой сервер UG65 передаёт декодированное сообщение по MQTT(s) или HTTP(s). Облако не нужно: шлюз подключается напрямую к брокеру MKB. Предлагаемая структура топиков:</p>" +
        "<pre><code>mkb/v1/{obyekt}/{device_id}/hodisa\nmkb/v1/{obyekt}/{device_id}/holat\nmkb/v1/shlyuz/{gw_id}/lwt</code></pre>" +
        "<pre><code>{\"obyekt\":\"AK-2025/0934\",\"device_id\":\"DAT-0012\",\n \"tur\":\"eshik\",\"qiymat\":\"ochiq\",\"batareya\":87,\n \"rssi\":-108,\"snr\":4.5,\"fcnt\":1532,\n \"vaqt\":\"2026-01-14T02:13:05+05:00\"}</code></pre>" +
        "<h4>Правила</h4><ul><li>QoS 1 с сохранением сессии: при обрыве связи брокер не теряет сообщение.</li><li>TLS 1.2 и выше, отдельный клиентский сертификат на каждый шлюз. ACL брокера разрешает шлюзу писать только в топики своих объектов.</li><li>LWT: если шлюз пропал, брокер пишет «offline» в топик <code>lwt</code>, и платформа выдаёт одно предупреждение, а не по каждому датчику.</li><li>Потребитель идемпотентен: повтор по <code>DevEUI + fcnt</code> не записывается.</li></ul>" +
        "<p>Вариант HTTP отправляет тот же JSON, только с заголовком подписи HMAC. Что бы ни выбрали, модель события на платформе одна.</p><h4>Нагрузка</h4><p>На объекте 5 датчиков, каждый шлёт состояние раз в 10 минут: 720 сообщений в сутки. На 188 зданий это около 140 тысяч мелких сообщений в сутки, с ними спокойно справляется один брокер.</p>"
    }
  },

  "s-y06.oqim4": {
    yorliq: "Jamoa rahbarlari uchun",
    sarlavha: "Hodisadan videoga: RTSP qachon ochiladi",
    tana: "<p>Datchik hodisasi videoni chaqiradi, aksincha emas. Reyestrda har datchik kameraga bog'lanadi: <code>DAT-0012 → KAM-0007</code>. Eshik ochilsa, platforma shu kameradan 30–60 soniyalik klip so'raydi.</p>" +
      "<h4>Kamera quvvatiga qarab ikki yo'l</h4><ul><li><b>Doimiy quvvatli kamera</b> (shlyuz nuqtasida yoki shkafda): platforma RTSP'ni darhol ochadi, klipni o'zi yozadi.</li><li><b>Quyosh yoki batareyali 4G kamera</b> uyquda turadi. Hikvision'ning quyosh-4G kamerasi kutishda 80 mVt, ishda 1,85–7 Vt sarflaydi. Bunday kamera avval uyg'otiladi yoki o'z PIR hodisasi bilan SD kartaga yozadi, klip keyin olinadi.</li></ul>" +
      "<h4>Trafik</h4><p>Qo'shimcha oqim 0,5–1 Mbit/s: bir daqiqalik klip 4–8 MB. Oyiga 30 hodisa bo'lsa, 0,2 GB atrofida. Doimiy oqim esa oyiga yuzlab gigabayt va batareyani bir necha kunda tugatadi.</p>" +
      "<h4>Yetkazuvchidan so'raladigan savollar</h4><ul><li>Uyqudagi kamerani API orqali uyg'otish mumkinmi va qancha vaqt oladi?</li><li>RTSP sessiyasi necha daqiqada uziladi?</li><li>SD kartadagi klipni tarmoq orqali olish mumkinmi?</li></ul>",
    manba: [],
    ru: {
      yorliq: "Для тимлида",
      sarlavha: "От события к видео: когда открывается RTSP",
      tana: "<p>Событие датчика вызывает видео, а не наоборот. В реестре каждый датчик привязан к камере: <code>DAT-0012 → KAM-0007</code>. При открытии двери платформа запрашивает у этой камеры клип на 30–60 секунд.</p>" +
        "<h4>Два пути в зависимости от питания камеры</h4><ul><li><b>Камера с постоянным питанием</b> (у шлюза или в шкафу): платформа сразу открывает RTSP и сама пишет клип.</li><li><b>Солнечная или батарейная 4G-камера</b> спит. Солнечная 4G-камера Hikvision в ожидании потребляет 80 мВт, в работе 1,85–7 Вт. Такую камеру сначала будят, либо она пишет на SD-карту по своему PIR-событию, а клип забирают позже.</li></ul>" +
        "<h4>Трафик</h4><p>Дополнительный поток 0,5–1 Мбит/с: минутный клип 4–8 МБ. При 30 событиях в месяц — около 0,2 ГБ. Постоянный поток — это сотни гигабайт в месяц и разряд батареи за несколько дней.</p>" +
        "<h4>Вопросы поставщику</h4><ul><li>Можно ли разбудить спящую камеру через API и сколько это занимает?</li><li>Через сколько минут обрывается RTSP-сессия?</li><li>Можно ли забрать клип с SD-карты по сети?</li></ul>"
    }
  },

  /* ============================ s-y07 · Ko'chma stansiya ============================ */
  "s-y07.diqqat1": {
    yorliq: "Texnik izoh",
    sarlavha: "Nega 12 V DC, invertor emas",
    tana: "<p>Stansiya AC rozetkasi orqali ishlatilsa, invertor bo'sh turganda ham o'nlab vatt yeydi va avtonomiyani ikki baravar qisqartiradi. Shuning uchun kamera, router va domofon 12 V DC chiqishdan oziqlanadi.</p>" +
      "<h4>Sozlashda</h4>" +
      "<ul><li>Chiqishning «kutishda o'chirish» taymeri o'chiriladi: aks holda stansiya bir necha soatdan keyin kamerani o'chiradi.</li>" +
      "<li>Har obyektga ikkita stansiya rejalashtiriladi: biri ishlaydi, ikkinchisi bazada zaryadlanadi.</li>" +
      "<li>Hisobda sig'imning 85 foizi olinadi: BMS chegarasi va DC o'zgartkich yo'qotishi.</li></ul>" +
      "<p class='ogoh'>Qishda stansiya bazada, issiq xonada zaryadlanadi: LiFePO4 0 °C dan past zaryadlanmaydi.</p>",
    manba: [],
    ru: {
      yorliq: "Техническая справка",
      sarlavha: "Почему 12 В DC, а не инвертор",
      tana: "<p>Если питать оборудование от розетки станции, инвертор тратит десятки ватт даже вхолостую и сокращает автономность вдвое. Поэтому камера, роутер и видеодомофон питаются от выхода 12 В постоянного тока.</p>" +
        "<h4>При настройке</h4>" +
        "<ul><li>Таймер «отключение в режиме ожидания» на выходе отключается: иначе станция через несколько часов обесточит камеру.</li>" +
        "<li>На объект планируются две станции: одна работает, вторая заряжается на базе.</li>" +
        "<li>В расчёт берут 85% ёмкости: предел BMS и потери DC-преобразователя.</li></ul>" +
        "<p class='ogoh'>Зимой станцию заряжают на базе, в тёплом помещении: LiFePO4 не заряжается ниже 0 °C.</p>"
    }
  },

  "s-y07.band1": {
    yorliq: "Montajchi uchun",
    sarlavha: "Stansiya obyektda necha kun yetadi",
    tana: "<p>Hisob yukdan boshlanadi. Odatiy komplekt:</p>" +
      "<table><tr><th>Iste'molchi</th><th>Vt</th></tr><tr><td>IP kamera, 2 dona, IR bilan</td><td class='n'>10</td></tr><tr><td>4G router</td><td class='n'>5</td></tr><tr><td>Video domofon, kutish rejimi</td><td class='n'>3</td></tr><tr><td>Datchiklar hubi</td><td class='n'>2</td></tr><tr><td>Jami, sutkasiga 0,48 kVt·soat</td><td class='n'>20</td></tr></table>" +
      "<table><tr><th>Stansiya sig'imi</th><th>20 Vt</th><th>30 Vt</th></tr><tr><td>1 kVt·soat</td><td class='n'>1,8 kun</td><td class='n'>1,2 kun</td></tr><tr><td>2 kVt·soat</td><td class='n'>3,5 kun</td><td class='n'>2,4 kun</td></tr><tr><td>4 kVt·soat</td><td class='n'>7 kun</td><td class='n'>4,7 kun</td></tr></table>" +
      "<p>Hisobda sig'imning 85 foizi olingan: BMS chegarasi va DC o'zgartkich yo'qotishi.</p>" +
      "<h4>Ulash qoidalari</h4><ul><li>Qurilmalar 12 V DC chiqishdan oziqlanadi. AC invertor bo'sh turganda ham o'nlab vatt yeydi va avtonomiyani ikki barobar qisqartiradi.</li><li>Chiqishni «kutishda o'chirish» taymeri o'chiriladi, aks holda stansiya bir necha soatdan keyin kamerani o'chiradi.</li><li>Har obyektga ikkita stansiya: biri ishlaydi, ikkinchisi bazada zaryadlanadi.</li></ul>" +
      "<h4>Qishda</h4><p>LiFePO4 0 °C dan past zaryadlanmaydi, shuning uchun zaryad issiq bazada qilinadi. Ko'p modellarda razryad chegarasi −10 °C. Isitilmaydigan binoda stansiya izolyatsiyali qutida, beton polda emas, yog'och taglikda turadi.</p>" +
      "<h4>Nima olinadi</h4><p>LiFePO4, 80 foiz sig'imgacha kamida 3000 sikl, 12 V DC chiqish kamida 10 A, ochiq API. EcoFlow DELTA 2 Max bu talablarga mos keladigan namuna: 2048 Vt·soat, 3000 sikl.</p>",
    manba: [["EcoFlow DELTA 2 Max", "https://us.ecoflow.com/products/delta-2-max-portable-power-station"]],
    ru: {
      yorliq: "Для монтажника",
      sarlavha: "На сколько дней хватает станции",
      tana: "<p>Расчёт начинается с нагрузки. Типовой комплект:</p>" +
        "<table><tr><th>Потребитель</th><th>Вт</th></tr><tr><td>IP-камеры, 2 шт., с ИК</td><td class='n'>10</td></tr><tr><td>4G-роутер</td><td class='n'>5</td></tr><tr><td>Видеодомофон в режиме ожидания</td><td class='n'>3</td></tr><tr><td>Хаб датчиков</td><td class='n'>2</td></tr><tr><td>Итого, 0,48 кВт·ч в сутки</td><td class='n'>20</td></tr></table>" +
        "<table><tr><th>Ёмкость станции</th><th>20 Вт</th><th>30 Вт</th></tr><tr><td>1 кВт·ч</td><td class='n'>1,8 сут.</td><td class='n'>1,2 сут.</td></tr><tr><td>2 кВт·ч</td><td class='n'>3,5 сут.</td><td class='n'>2,4 сут.</td></tr><tr><td>4 кВт·ч</td><td class='n'>7 сут.</td><td class='n'>4,7 сут.</td></tr></table>" +
        "<p>В расчёте взято 85% ёмкости: порог BMS и потери DC-преобразователя.</p>" +
        "<h4>Правила подключения</h4><ul><li>Устройства питаются от выхода 12 В DC. Инвертор AC даже без нагрузки съедает десятки ватт и вдвое сокращает автономность.</li><li>Таймер «отключения при простое» выключают, иначе станция через несколько часов обесточит камеру.</li><li>На объект — две станции: одна работает, вторая заряжается на базе.</li></ul>" +
        "<h4>Зимой</h4><p>LiFePO4 нельзя заряжать ниже 0 °C, поэтому заряд идёт на тёплой базе. У многих моделей нижний предел разряда −10 °C. В неотапливаемом здании станцию ставят в утеплённый ящик на деревянный поддон, а не на бетон.</p>" +
        "<h4>Что покупать</h4><p>LiFePO4, не меньше 3000 циклов до 80% ёмкости, выход 12 В DC от 10 А, открытый API. EcoFlow DELTA 2 Max — пример, который подходит: 2048 Вт·ч, 3000 циклов.</p>"
    }
  },

  "s-y07.band2": {
    yorliq: "Montajchi uchun",
    sarlavha: "Bir kunda qo'yiladigan va yechiladigan komplekt",
    tana: "<p>Komplekt bitta chemodanda saqlanadi va obyektga to'liq sozlangan holda olib boriladi. Maqsad: kelgan kuni ishga tushirish, sotilgan kuni yechib olish.</p>" +
      "<table><tr><th>Qurilma</th><th>Talab</th></tr>" +
      "<tr><td>IP kamera, 2–4 dona</td><td>ONVIF, SD karta, IR bilan 5 Vt gacha</td></tr>" +
      "<tr><td>PoE kommutator</td><td>12–24 V DC kirish, 4–5 port</td></tr>" +
      "<tr><td>4G router</td><td>9–30 V DC kirish, ikki SIM, watchdog, VPN</td></tr>" +
      "<tr><td>Video domofon</td><td>SIP yoki ilova orqali qo'ng'iroq, rele chiqishi</td></tr>" +
      "<tr><td>Datchiklar</td><td>Eshik va harakat, batareyali</td></tr></table>" +
      "<h4>O'rnatish</h4><ol><li>Kameralar qisqich yoki vaqtinchalik kronshteynga qo'yiladi. Qisqa muddatli obyektda fasadni teshish shart emas.</li><li>Kabel faqat bino ichida yotadi, stansiya qulflangan xonada turadi.</li><li>Ketishdan oldin tekshiriladi: kameralar ko'rinishi, SD kartaga yozuv, platformada «onlayn» holati va stansiya foizi.</li></ol>" +
      "<p class='ogoh'>Komplekt raqamlanadi, masalan <code>KMP-03</code>. Platformada komplekt qaysi obyektda turgani doim ko'rinadi.</p><h4>Yechib olish</h4><p>Obyekt sotilganda komplekt dalolatnoma bilan yechiladi. SD kartadagi yozuv arxivga ko'chiriladi, karta formatlanadi. Komplekt bazada zaryadlanadi va keyingi obyekt kodiga bog'lanadi.</p>",
    manba: [],
    ru: {
      yorliq: "Для монтажника",
      sarlavha: "Комплект, который ставят и снимают за день",
      tana: "<p>Комплект хранится в одном кейсе и едет на объект полностью настроенным. Цель: запустить в день приезда и снять в день продажи.</p>" +
        "<table><tr><th>Устройство</th><th>Требование</th></tr>" +
        "<tr><td>IP-камеры, 2–4 шт.</td><td>ONVIF, SD-карта, с ИК до 5 Вт</td></tr>" +
        "<tr><td>PoE-коммутатор</td><td>Вход 12–24 В DC, 4–5 портов</td></tr>" +
        "<tr><td>4G-роутер</td><td>Вход 9–30 В DC, две SIM, watchdog, VPN</td></tr>" +
        "<tr><td>Видеодомофон</td><td>Вызов по SIP или в приложение, релейный выход</td></tr>" +
        "<tr><td>Датчики</td><td>Дверь и движение, на батарейках</td></tr></table>" +
        "<h4>Монтаж</h4><ol><li>Камеры ставят на струбцины или временные кронштейны. На краткосрочном объекте сверлить фасад не обязательно.</li><li>Кабель идёт только внутри здания, станция стоит в запертом помещении.</li><li>Перед уходом проверяют: обзор камер, запись на SD, статус «онлайн» на платформе и процент заряда станции.</li></ol>" +
        "<p class='ogoh'>Комплекту присваивают номер, например <code>KMP-03</code>. На платформе всегда видно, на каком объекте он стоит.</p><h4>Демонтаж</h4><p>После продажи объекта комплект снимают по акту. Запись с SD-карты переносят в архив, карту форматируют. Комплект заряжают на базе и привязывают к коду следующего объекта.</p>"
    }
  },

  "s-y07.band3": {
    yorliq: "Jamoa rahbarlari uchun",
    sarlavha: "Stansiya holati platformaga qanday keladi",
    tana: "<p>EcoFlow ochiq dasturchi platformasiga ega: ilova HTTP yoki MQTT orqali ishlaydi, kirish accessKey va secretKey bilan. Stansiya ko'rsatkichlari MQTT'da quyidagi mavzuga keladi:</p>" +
      "<pre><code>/open/{sertifikat_akkaunti}/{seriya_raqami}/quota</code></pre>" +
      "<h4>Adapter nima qiladi</h4><ol><li>EcoFlow mavzusiga obuna bo'ladi.</li><li>Zaryad foizi, kirish va chiqish quvvati, batareya haroratini ajratadi.</li><li>MKB formatida qayta yozadi: <code>mkb/v1/{obyekt}/{device_id}/quvvat</code>.</li><li>Qoidalar: zaryad 30% dan past — almashtirish vazifasi, 15% dan past — shoshilinch.</li></ol>" +
      "<h4>Cheklovlar</h4><ul><li>Ma'lumot ishlab chiqaruvchi buluti orqali o'tadi. Bu biometrik ma'lumot emas, O'RQ-1125 lokalizatsiya talabi tegmaydi, lekin bulut ishlamasa, holat ko'rinmaydi.</li><li>Boshqa brendlarda ochiq API bo'lmasligi mumkin. Xariddan oldin hujjatlashtirilgan API talab qilinadi.</li><li>API bo'lmasa, zaxira belgi: router quvvati o'chsa, platforma «aloqa yo'q» hodisasini oladi.</li></ul>" +
      "<h4>Video va tarmoq</h4><p>Kameralar ONVIF Profile S va RTSP bilan ulanadi. Router MKB bilan WireGuard yoki IPsec tunnel quradi, kameralar internetga ochilmaydi.</p>",
    manba: [["EcoFlow Developer", "https://developer.ecoflow.com/us/document/introduction"]],
    ru: {
      yorliq: "Для тимлида",
      sarlavha: "Как состояние станции попадает на платформу",
      tana: "<p>У EcoFlow есть открытая платформа для разработчиков: приложение работает по HTTP или MQTT, доступ по accessKey и secretKey. Показатели станции приходят в MQTT в топик:</p>" +
        "<pre><code>/open/{certificate_account}/{device_sn}/quota</code></pre>" +
        "<h4>Что делает адаптер</h4><ol><li>Подписывается на топик EcoFlow.</li><li>Выделяет процент заряда, входную и выходную мощность, температуру батареи.</li><li>Переписывает в формат MKB: <code>mkb/v1/{obyekt}/{device_id}/quvvat</code>.</li><li>Правила: заряд ниже 30% — задача на замену, ниже 15% — срочная.</li></ol>" +
        "<h4>Ограничения</h4><ul><li>Данные идут через облако производителя. Это не биометрия, требование локализации O'RQ-1125 не касается, но при сбое облака состояние не видно.</li><li>У других брендов открытого API может не быть. До закупки требуется документированный API.</li><li>Если API нет, резервный признак: при отключении питания роутера платформа получает событие «нет связи».</li></ul>" +
        "<h4>Видео и сеть</h4><p>Камеры подключаются по ONVIF Profile S и RTSP. Роутер строит туннель WireGuard или IPsec до MKB, камеры в интернет не открываются.</p>"
    }
  },

  "s-y07.band4": {
    yorliq: "Rahbariyat uchun",
    sarlavha: "Ko'chma stansiya qaysi aktivga to'g'ri keladi",
    tana: "<p>Stansiya qisqa nazorat uchun. U doimiy yechim tanlanguncha yoki obyekt sotilguncha bo'shliqni yopadi.</p>" +
      "<h4>Mos holatlar</h4><ul><li>Yangi balansga olingan obyektning birinchi 2–4 haftasi, ko'rik va komplekt tanlangunicha.</li><li>Sud yoki ijro jarayonidagi obyekt, uzoq montajga ruxsat yo'q.</li><li>Auksion e'lon qilingan, sotuvgacha bir oydan kam qolgan obyekt.</li></ul>" +
      "<h4>Qachon to'xtatiladi</h4><p>Stansiya 3–4 kunda almashtiriladi, bu oyiga taxminan 8 qatnov. Bitta qatnov transport va xodim vaqti bilan 150–300 ming so'm atrofida baholanadi, ya'ni oyiga 1,2–2,4 mln. Ikki-uch oydan keyin logistika statsionar LiFePO4 shkafi (04) yoki quyosh-4G kamerasidan (02) qimmatga tushadi.</p>" +
      "<div class='raqamlar'><div><b>1–30 kun</b><span>asosiy muddat</span></div><div><b>≈8</b><span>qatnov oyiga</span></div><div><b>2–3 oy</b><span>chegara</span></div></div>" +
      "<h4>Bank qaror qiladigan savol</h4><p>Har viloyatga 5–10 komplektlik pul. Komplektlar bir obyektdan boshqasiga o'tadi va yil davomida o'nlab obyektni qamraydi. Pul kimga biriktirilishi va almashtirishni kim qilishi buyruq bilan belgilanadi.</p>",
    manba: [],
    ru: {
      yorliq: "Для руководства",
      sarlavha: "Какому активу подходит переносная станция",
      tana: "<p>Станция — для краткого контроля. Она закрывает паузу, пока не выбрано постоянное решение или пока объект не продан.</p>" +
        "<h4>Когда подходит</h4><ul><li>Первые 2–4 недели после принятия объекта на баланс, до обследования и выбора комплекта.</li><li>Объект в судебном или исполнительном производстве, разрешения на долгий монтаж нет.</li><li>Аукцион объявлен, до продажи меньше месяца.</li></ul>" +
        "<h4>Когда остановиться</h4><p>Станцию меняют раз в 3–4 дня, это около 8 выездов в месяц. Один выезд с транспортом и временем сотрудника оценивается примерно в 150–300 тыс. сумов, то есть 1,2–2,4 млн в месяц. Через два-три месяца логистика обходится дороже стационарного шкафа LiFePO4 (04) или солнечной 4G-камеры (02).</p>" +
        "<div class='raqamlar'><div><b>1–30 дней</b><span>основной срок</span></div><div><b>≈8</b><span>выездов в месяц</span></div><div><b>2–3 мес.</b><span>предел</span></div></div>" +
        "<h4>Что решает банк</h4><p>Пул из 5–10 комплектов на область. Комплекты переходят с объекта на объект и за год покрывают десятки объектов. За кем закреплён пул и кто делает замену, определяется приказом.</p>"
    }
  },

  "s-y07.narx1": {
    yorliq: "Moliya va huquq",
    sarlavha: "7–16 mln so'm va qayta ishlatish hisobi",
    tana: "<table><tr><th>Qator</th><th>mln so'm</th></tr>" +
      "<tr><td>LiFePO4 stansiya, 1–2 kVt·soat</td><td class='n'>5,0–11,0</td></tr>" +
      "<tr><td>IP kamera, 2 dona</td><td class='n'>1,0–2,0</td></tr>" +
      "<tr><td>4G router, ikki SIM</td><td class='n'>0,8–1,5</td></tr>" +
      "<tr><td>Video domofon yoki datchiklar</td><td class='n'>0,6–1,0</td></tr>" +
      "<tr><td>Sozlash va birinchi o'rnatish</td><td class='n'>0,3–0,5</td></tr>" +
      "<tr><td>Jami</td><td class='n'>7–16</td></tr></table>" +
      "<p>Taxminiy bozor bahosi, 2026. Mo'ljal uchun: EcoFlow DELTA 2 Max (2 kVt·soat) AQSh do'konida 1 029 dollar. 4 kVt·soatlik stansiya olinsa, yuqori chegara oshadi.</p>" +
      "<h4>Obyektga tushadigan narx</h4><p>Komplekt obyektdan obyektga o'tadi. Yilda 6 obyektga xizmat qilsa, bitta obyektga 1,2–2,7 mln to'g'ri keladi. Asosiy doimiy xarajat — almashtirish qatnovlari va SIM.</p>" +
      "<h4>Besh yil</h4><p>Almashtirish har 3–4 kunda bo'lsa, stansiya yiliga taxminan 100 sikl ko'radi. 3000 sikllik resurs besh yildan ancha ortiq. Besh yil ichida stansiya akkumulyatori almashtirilmaydi, faqat SD kartalar.</p>" +
      "<h4>Qayerdan va kim</h4><p>EcoFlow va Bluetti O'zbekistonda dilerlar va marketpleyslar orqali sotiladi. Xaridda rasmiy kafolat va servis manzili tekshiriladi. Komplektni CCTV integratori yig'adi, keyingi almashtirishni bank xodimi qiladi. Ijara bozori kichik, taklif integratordan so'raladi.</p>",
    manba: [["EcoFlow DELTA 2 Max", "https://us.ecoflow.com/products/delta-2-max-portable-power-station"]],
    ru: {
      yorliq: "Финансы и право",
      sarlavha: "7–16 млн сумов и расчёт повторного использования",
      tana: "<table><tr><th>Статья</th><th>млн сумов</th></tr>" +
        "<tr><td>Станция LiFePO4, 1–2 кВт·ч</td><td class='n'>5,0–11,0</td></tr>" +
        "<tr><td>IP-камеры, 2 шт.</td><td class='n'>1,0–2,0</td></tr>" +
        "<tr><td>4G-роутер на две SIM</td><td class='n'>0,8–1,5</td></tr>" +
        "<tr><td>Видеодомофон или датчики</td><td class='n'>0,6–1,0</td></tr>" +
        "<tr><td>Настройка и первая установка</td><td class='n'>0,3–0,5</td></tr>" +
        "<tr><td>Итого</td><td class='n'>7–16</td></tr></table>" +
        "<p>Ориентировочная рыночная оценка, 2026. Для сравнения: EcoFlow DELTA 2 Max (2 кВт·ч) в американском магазине стоит 1 029 долларов. Со станцией на 4 кВт·ч верхняя граница растёт.</p>" +
        "<h4>Цена на один объект</h4><p>Комплект переходит с объекта на объект. Если за год он обслужит 6 объектов, на один приходится 1,2–2,7 млн. Главные постоянные расходы — выезды на замену и SIM.</p>" +
        "<h4>Пять лет</h4><p>При замене раз в 3–4 дня станция проходит около 100 циклов в год. Ресурс в 3000 циклов намного больше пяти лет. Аккумулятор станции за пять лет не меняют, только SD-карты.</p>" +
        "<h4>Где и кто</h4><p>EcoFlow и Bluetti продаются в Узбекистане через дилеров и маркетплейсы. При покупке проверяют официальную гарантию и адрес сервиса. Комплект собирает CCTV-интегратор, дальнейшие замены делает сотрудник банка. Рынок аренды небольшой, предложение запрашивают у интегратора.</p>"
    }
  },

  /* ============================ s-y08 · EFOY ============================ */
  "s-y08.band1": {
    yorliq: "Montajchi uchun",
    sarlavha: "Yoqilg'i elementi, akkumulyator va kartrij",
    tana: "<p>Sxema: yoqilg'i elementi akkumulyatorni zaryadlaydi, qurilmalar akkumulyatordan oziqlanadi. Kuchlanish belgilangan chegaraga tushganda element o'zi yonadi, akkumulyator to'lganda o'chadi.</p>" +
      "<table><tr><th>Model</th><th>Nominal quvvat</th></tr><tr><td>EFOY Pro 900</td><td class='n'>42 Vt</td></tr><tr><td>EFOY Pro 1800</td><td class='n'>82 Vt</td></tr><tr><td>EFOY Pro 2800</td><td class='n'>125 Vt</td></tr></table>" +
      "<h4>Yoqilg'i hisobi</h4><p>Nominal sarf 1 kVt·soatga 0,9 litr metanol. M28 kartrij: 28 litr, 23,4 kg, 31,1 kVt·soat. 50 Vt yukda u 622 soat, ya'ni taxminan 26 kun yetadi, 30 Vt yukda 43 kun atrofida. Fuel Manager 8 tagacha kartrijni ulaydi: to'rtta M28 bilan 30 Vt yuk qariyb 170 kun ishlaydi.</p>" +
      "<h4>Model tanlash</h4><p>Nominal quvvat o'rtacha yukdan kamida 1,5 barobar katta olinadi. 30 Vt yukka Pro 900 chegarada, Pro 1800 zaxira bilan.</p>" +
      "<h4>Sovuq</h4><ul><li>Element −20…+50 °C da ishlaydi. Undan sovuq joyda izolyatsiyali shkaf kerak, elementning o'z issiqligi ichki haroratni ko'taradi.</li><li>Element suv bug'i va CO₂ chiqaradi: shkafda chiqish quvuri tashqariga olib chiqiladi, qishda muzlab qolmasligi tekshiriladi.</li><li>LiFePO4 0 °C dan past zaryadlanmaydi. Isitgichli yoki past harorat himoyali akkumulyator olinadi, EFOY'ning o'z litiy batareyasi ham bor.</li></ul>",
    manba: [["EFOY Pro modellari", "https://www.efoy-pro.com/en/efoy/efoy-efoypro/"], ["EFOY kartrijlari", "https://www.efoy-pro.com/en/efoy/fuel-cartridges/"]],
    ru: {
      yorliq: "Для монтажника",
      sarlavha: "Топливный элемент, аккумулятор и картридж",
      tana: "<p>Схема: топливный элемент заряжает аккумулятор, устройства питаются от аккумулятора. Когда напряжение падает до заданного порога, элемент включается сам и выключается, когда аккумулятор заряжен.</p>" +
        "<table><tr><th>Модель</th><th>Номинальная мощность</th></tr><tr><td>EFOY Pro 900</td><td class='n'>42 Вт</td></tr><tr><td>EFOY Pro 1800</td><td class='n'>82 Вт</td></tr><tr><td>EFOY Pro 2800</td><td class='n'>125 Вт</td></tr></table>" +
        "<h4>Расчёт топлива</h4><p>Номинальный расход — 0,9 литра метанола на 1 кВт·ч. Картридж M28: 28 литров, 23,4 кг, 31,1 кВт·ч. При нагрузке 50 Вт его хватает на 622 часа, то есть около 26 суток, при 30 Вт — примерно на 43 суток. Fuel Manager подключает до 8 картриджей: с четырьмя M28 нагрузка 30 Вт работает почти 170 суток.</p>" +
        "<h4>Выбор модели</h4><p>Номинал берут минимум в 1,5 раза выше средней нагрузки. Для 30 Вт Pro 900 на пределе, Pro 1800 — с запасом.</p>" +
        "<h4>Холод</h4><ul><li>Элемент работает при −20…+50 °C. Где холоднее, нужен утеплённый шкаф, собственное тепло элемента поднимает температуру внутри.</li><li>Элемент выделяет водяной пар и CO₂: выхлопную трубку выводят наружу и зимой проверяют, не замерзает ли она.</li><li>LiFePO4 нельзя заряжать ниже 0 °C. Берут аккумулятор с подогревом или защитой от низкой температуры, у EFOY есть и собственная литиевая батарея.</li></ul>"
    }
  },

  "s-y08.band2": {
    yorliq: "Montajchi uchun",
    sarlavha: "Korporativ komplekt va uning iste'moli",
    tana: "<p>Metanol har vatt uchun pul. Shuning uchun komplekt tanlashdan oldin yuk hisoblanadi.</p>" +
      "<table><tr><th>Qurilma</th><th>Vt, taxminan</th></tr>" +
      "<tr><td>PTZ kamera, kechasi IR bilan</td><td class='n'>15–25</td></tr>" +
      "<tr><td>Statik IP kamera, 2 dona</td><td class='n'>8–10</td></tr>" +
      "<tr><td>NVR, SSD bilan</td><td class='n'>6–10</td></tr>" +
      "<tr><td>Router</td><td class='n'>5</td></tr>" +
      "<tr><td>Domofon va datchiklar</td><td class='n'>4–5</td></tr>" +
      "<tr><td>Jami</td><td class='n'>38–55</td></tr></table>" +
      "<p>55 Vt sutkasiga 1,3 kVt·soat va 1,2 litr metanol degani: M28 kartrij 24 kun yetadi. Aniq qiymat har qurilmaning datasheet'idan olinadi.</p>" +
      "<h4>Yukni kamaytirish</h4><ul><li>PTZ kechasi bitta nuqtada turadi, aylanish faqat hodisada.</li><li>NVR disk emas, SSD bilan: kam quvvat va sovuqqa chidamli.</li><li>IR faqat kerakli kamerada yoqiladi, boshqasi hovli chirog'i bor tomonga qaraydi.</li><li>Quyosh paneli qo'shilsa, element yozda deyarli ishlamaydi.</li></ul>" +
      "<p class='ogoh'>Maqsad: o'rtacha yuk 30 Vt atrofida. Shunda M28 kartrij 24 kun emas, 43 kun yetadi.</p><p>Montajdan keyingi birinchi haftada haqiqiy iste'mol Modbus orqali o'lchanadi va kartrij jadvali shunga qarab tuzatiladi.</p>",
    manba: [],
    ru: {
      yorliq: "Для монтажника",
      sarlavha: "Корпоративный комплект и его потребление",
      tana: "<p>Метанол — это деньги за каждый ватт. Поэтому до выбора комплекта считают нагрузку.</p>" +
        "<table><tr><th>Устройство</th><th>Вт, ориентир</th></tr>" +
        "<tr><td>PTZ-камера с ИК ночью</td><td class='n'>15–25</td></tr>" +
        "<tr><td>Стационарные IP-камеры, 2 шт.</td><td class='n'>8–10</td></tr>" +
        "<tr><td>NVR с SSD</td><td class='n'>6–10</td></tr>" +
        "<tr><td>Роутер</td><td class='n'>5</td></tr>" +
        "<tr><td>Домофон и датчики</td><td class='n'>4–5</td></tr>" +
        "<tr><td>Итого</td><td class='n'>38–55</td></tr></table>" +
        "<p>55 Вт — это 1,3 кВт·ч и 1,2 литра метанола в сутки: картриджа M28 хватает на 24 дня. Точные цифры берутся из даташитов каждого устройства.</p>" +
        "<h4>Как снизить нагрузку</h4><ul><li>Ночью PTZ стоит в одной позиции, поворачивается только по событию.</li><li>NVR с SSD вместо диска: меньше потребление, лучше переносит холод.</li><li>ИК включают только на нужной камере, другая смотрит на освещённую часть двора.</li><li>С солнечной панелью элемент летом почти не работает.</li></ul>" +
        "<p class='ogoh'>Цель — средняя нагрузка около 30 Вт. Тогда картриджа M28 хватает не на 24, а на 43 дня.</p><p>В первую неделю после монтажа фактическое потребление замеряют по Modbus и по нему уточняют график картриджей.</p>"
    }
  },

  "s-y08.band3": {
    yorliq: "Jamoa rahbarlari uchun",
    sarlavha: "EFOY holatini Modbus orqali o'qish",
    tana: "<p>EFOY Pro'da RS-232 ma'lumot porti bor. Masofadan kuzatish shu port orqali Modbus RTU yoki SIO (oddiy matn) protokolida ishlaydi. Ishlab chiqaruvchining EFOY Cloud xizmati ham bor, lekin u bulut va modem talab qiladi.</p>" +
      "<h4>Ulanish sxemasi</h4><ol><li>RS-232 porti routerning seriya portiga yoki RS-232 → Ethernet shlyuziga ulanadi (Modbus RTU → Modbus TCP).</li><li>Adapter har 60 soniyada o'qiydi: akkumulyator kuchlanishi, ish holati, kartrijdagi yoqilg'i, xato kodi, ishlagan soatlar.</li><li>Natija MKB formatida yoziladi: <code>mkb/v1/{obyekt}/{device_id}/quvvat</code>.</li></ol>" +
      "<h4>Ogohlantirish qoidalari</h4><ul><li>Yoqilg'i 20% dan kam — kartrij buyurtmasi, yetkazish muddati hisobga olinadi.</li><li>Xato kodi — servis vazifasi va integratorga xabar.</li><li>Akkumulyator kuchlanishi pasaymoqda, element esa yonmayapti — shoshilinch.</li></ul>" +
      "<h4>Tarmoq</h4><p>Router holati SNMP v3 bilan olinadi: signal, uptime, SIM. Video ONVIF va RTSP. Modbus porti internetga ochilmaydi, faqat VPN ichida ishlaydi.</p>" +
      "<p class='ogoh'>Registrlar xaritasi dasturiy ta'minot versiyasiga bog'liq. Yetkazuvchidan aynan yetkaziladigan versiyaning xaritasi talab qilinadi.</p>",
    manba: [["EFOY Pro qo'llanmasi, Modbus RTU", "https://www.manualslib.com/manual/1496312/Efoy-Pro-800-Pro-800-Duo-Pro-2400-Pro-2400-Duo.html?page=81"]],
    ru: {
      yorliq: "Для тимлида",
      sarlavha: "Чтение состояния EFOY по Modbus",
      tana: "<p>У EFOY Pro есть порт данных RS-232. Удалённый мониторинг идёт через него по протоколу Modbus RTU или SIO (простой текст). Есть и сервис производителя EFOY Cloud, но он требует облака и модема.</p>" +
        "<h4>Схема подключения</h4><ol><li>RS-232 подключается к последовательному порту роутера или к шлюзу RS-232 → Ethernet (Modbus RTU → Modbus TCP).</li><li>Адаптер каждые 60 секунд читает: напряжение аккумулятора, режим работы, остаток топлива, код ошибки, наработку.</li><li>Результат пишется в формате MKB: <code>mkb/v1/{obyekt}/{device_id}/quvvat</code>.</li></ol>" +
        "<h4>Правила оповещений</h4><ul><li>Топлива меньше 20% — заказ картриджа с учётом срока поставки.</li><li>Код ошибки — сервисная задача и сообщение интегратору.</li><li>Напряжение падает, а элемент не включается — срочно.</li></ul>" +
        "<h4>Сеть</h4><p>Состояние роутера берётся по SNMP v3: сигнал, uptime, SIM. Видео — ONVIF и RTSP. Порт Modbus в интернет не открывается, работает только внутри VPN.</p>" +
        "<p class='ogoh'>Карта регистров зависит от версии прошивки. У поставщика требуют карту именно для поставляемой версии.</p>"
    }
  },

  "s-y08.band4": {
    yorliq: "Rahbariyat uchun",
    sarlavha: "Yoqilg'i elementi qachon o'zini oqlaydi",
    tana: "<p>Bu yechim boshqa variantlar ishlamaganda tanlanadi. To'rt shart bir vaqtda bajarilishi kerak:</p>" +
      "<ol><li>Obyektni elektrga qayta ulab bo'lmaydi. Qayta ulash texnik sharti 39 600 so'm va uch ish kuni, bu har doim birinchi tekshiriladi.</li><li>Quyosh qishda yetmaydi: soya, tog' oralig'i, panel qo'yishga joy yo'q.</li><li>Obyekt uzoqda, servis qatnovi qimmat.</li><li>Aktiv qiymati yuqori va yo'qotish xatari real.</li></ol>" +
      "<h4>Yoqilg'i narxi</h4><p>M28 kartrij Yevropada taxminan 294 yevro, ya'ni 4 mln so'm atrofida. 30 Vt yil bo'yi element bilan ishlasa, oyiga taxminan 2,8 mln so'mlik metanol ketadi. Quyosh bilan gibrid sxemada element asosan noyabr–fevralda ishlaydi va yillik yoqilg'i 11–14 mln gacha tushadi.</p>" +
      "<div class='raqamlar'><div><b>≈4 mln</b><span>bitta M28</span></div><div><b>≈2,8 mln</b><span>oyiga, faqat element</span></div><div><b>11–14 mln</b><span>yiliga, gibrid</span></div></div>" +
      "<h4>Balansdan misol</h4><p>Chekkadagi ishlab chiqarish sexi yoki uzoq chorvachilik fermasi, ichida qimmat uskuna qolgan. Ma'muriy bino, xonadon va do'kon uchun bu yechim ortiqcha.</p>",
    manba: [["EFOY kartrijlari", "https://www.efoy-pro.com/en/efoy/fuel-cartridges/"]],
    ru: {
      yorliq: "Для руководства",
      sarlavha: "Когда топливный элемент оправдан",
      tana: "<p>Это решение выбирают, когда другие варианты не работают. Должны одновременно выполняться четыре условия:</p>" +
        "<ol><li>Объект нельзя повторно подключить к сети. Техусловия на подключение — 39 600 сумов и три рабочих дня, это проверяется первым.</li><li>Солнца зимой не хватает: тень, ущелье, некуда поставить панель.</li><li>Объект далеко, сервисный выезд дорогой.</li><li>Актив ценный, и риск потери реален.</li></ol>" +
        "<h4>Цена топлива</h4><p>Картридж M28 в Европе стоит около 294 евро, то есть примерно 4 млн сумов. Если нагрузка 30 Вт круглый год идёт от элемента, метанола уходит примерно на 2,8 млн сумов в месяц. В гибридной схеме с солнцем элемент работает в основном с ноября по февраль, и годовые расходы на топливо снижаются до 11–14 млн.</p>" +
        "<div class='raqamlar'><div><b>≈4 млн</b><span>один M28</span></div><div><b>≈2,8 млн</b><span>в месяц, только элемент</span></div><div><b>11–14 млн</b><span>в год, гибрид</span></div></div>" +
        "<h4>Пример с баланса</h4><p>Удалённый производственный цех или дальняя животноводческая ферма, где осталось дорогое оборудование. Для административного здания, квартиры и магазина это решение избыточно.</p>"
    }
  },

  "s-y08.narx1": {
    yorliq: "Moliya va huquq",
    sarlavha: "EFOY xarajati: element, jihoz va yoqilg'i",
    tana: "<p>Ochiq narxlar bo'yicha hisob, yevro kursi taxminan 13 600 so'm:</p>" +
      "<table><tr><th>Qator</th><th>mln so'm</th></tr>" +
      "<tr><td>EFOY Pro 2800, Yevropa chakana narxi ≈ 9 800 yevro</td><td class='n'>≈133</td></tr>" +
      "<tr><td>Yoki ulgurji mo'ljal: 180 dona buyurtma 1 mln yevrodan ortiq, ≈ 5 600 yevro dona</td><td class='n'>≈76</td></tr>" +
      "<tr><td>Import QQS 12% va bojxona rasmiylashtiruvi</td><td class='n'>+9–16</td></tr>" +
      "<tr><td>Akkumulyator, shkaf, kameralar, NVR, router</td><td class='n'>12–25</td></tr></table>" +
      "<p>Real oraliq bir obyektga taxminan 80–170 mln so'm. Kichik model (Pro 900) arzonroq, lekin rasmiy narxi e'lon qilinmagan: tijorat taklifi so'raladi.</p>" +
      "<h4>Besh yillik yoqilg'i</h4><ul><li>30 Vt yil bo'yi faqat element bilan: 1 314 kVt·soat, 42 ta M28, taxminan 170 mln so'm.</li><li>Quyosh bilan gibrid: taxminan 14 ta M28, 55 mln so'm atrofida.</li></ul>" +
      "<h4>Kim yetkazadi</h4><p>SFC Energy distribyutori orqali import. Kartrijlar xavfli yuk sifatida alohida keladi. Montajni CCTV integratori qiladi, elementni distribyutor ishga tushiradi. Ijara yoki lizing bo'yicha taklif distribyutordan alohida so'raladi.</p>",
    manba: [["Seashop: EFOY Pro 2800", "https://www.seashop.com/en/efoy-pro-2800-fuel-cell"], ["SFC Energy: 180 dona buyurtma", "https://www.sfc.com/news/sfc-energy-receives-another-order-from-linc-polska-of-180-efoy-pro-2800-fuel-cells-worth-more-than-eur-1-million/"], ["EFOY kartrijlari", "https://www.efoy-pro.com/en/efoy/fuel-cartridges/"]],
    ru: {
      yorliq: "Финансы и право",
      sarlavha: "Затраты на EFOY: элемент, оборудование, топливо",
      tana: "<p>Расчёт по открытым ценам, курс около 13 600 сумов за евро:</p>" +
        "<table><tr><th>Статья</th><th>млн сумов</th></tr>" +
        "<tr><td>EFOY Pro 2800, розница в Европе ≈ 9 800 евро</td><td class='n'>≈133</td></tr>" +
        "<tr><td>Или оптовый ориентир: заказ на 180 шт. дороже 1 млн евро, ≈ 5 600 евро за штуку</td><td class='n'>≈76</td></tr>" +
        "<tr><td>Импортный НДС 12% и таможенное оформление</td><td class='n'>+9–16</td></tr>" +
        "<tr><td>Аккумулятор, шкаф, камеры, NVR, роутер</td><td class='n'>12–25</td></tr></table>" +
        "<p>Реальный диапазон — около 80–170 млн сумов на объект. Младшая модель (Pro 900) дешевле, но официальная цена не опубликована: нужно коммерческое предложение.</p>" +
        "<h4>Топливо за пять лет</h4><ul><li>30 Вт круглый год только от элемента: 1 314 кВт·ч, 42 картриджа M28, около 170 млн сумов.</li><li>Гибрид с солнцем: около 14 картриджей M28, примерно 55 млн сумов.</li></ul>" +
        "<h4>Кто поставляет</h4><p>Импорт через дистрибьютора SFC Energy. Картриджи едут отдельно, как опасный груз. Монтаж делает CCTV-интегратор, элемент запускает дистрибьютор. Предложение по аренде или лизингу запрашивают у дистрибьютора отдельно.</p>"
    }
  },

  "s-y08.diqqat1": {
    yorliq: "Moliya va huquq",
    sarlavha: "Metanol: tashish, saqlash va javobgarlik",
    tana: "<p>Metanol UN 1230 raqamli xavfli yuk: 3-sinf yonuvchan suyuqlik, qo'shimcha xavfi zaharli (6.1). EFOY kartrijlari dengiz, avtomobil va havo yo'li bilan tashish uchun UN tasdig'iga ega, lekin bu bankni saqlash qoidalaridan ozod qilmaydi.</p>" +
      "<h4>Shartnomaga yoziladi</h4><ol><li>Kartrijni obyektga yetkazuvchi o'zi olib boradi. Bank omborida zaxira saqlanmaydi yoki alohida shamollatiladigan joyda, cheklangan miqdorda saqlanadi.</li><li>Tashishni ADR ruxsati bor tashuvchi qiladi. Yo'lda va almashtirishda javobgarlik yetkazuvchida.</li><li>Bo'sh kartrij yetkazuvchiga qaytariladi.</li><li>Xavfsizlik ma'lumotlari varaqasi (SDS) rus yoki o'zbek tilida beriladi.</li></ol>" +
      "<h4>Obyektdagi xatar</h4><ul><li>Kartrij o'g'irlanishi mumkin. Metanol ichilsa, o'limga olib keladi. Kartrij qulflangan shkafda, ogohlantirish belgisi bilan turadi.</li><li>Yong'in xavfsizligi VMQ-649 qoidalari bo'yicha: shkaf yonida yonuvchi material saqlanmaydi.</li><li>Shkaf ochilishi datchik orqali platformaga hodisa bo'lib tushadi.</li></ul>" +
      "<p class='ogoh'>Bank yuristi va yong'in xavfsizligi mas'uli shartnomani imzolashdan oldin ko'rib chiqadi.</p>",
    manba: [["EFOY kartrijlari", "https://www.efoy-pro.com/en/efoy/fuel-cartridges/"]],
    ru: {
      yorliq: "Финансы и право",
      sarlavha: "Метанол: перевозка, хранение, ответственность",
      tana: "<p>Метанол — опасный груз UN 1230: класс 3, легковоспламеняющаяся жидкость, дополнительная опасность — токсичность (6.1). Картриджи EFOY имеют одобрение ООН для перевозки морем, автомобилем и авиа, но это не освобождает банк от правил хранения.</p>" +
        "<h4>Что прописать в договоре</h4><ol><li>Картридж на объект доставляет сам поставщик. На складе банка запас не хранится либо хранится в отдельном проветриваемом месте в ограниченном количестве.</li><li>Перевозит перевозчик с допуском ADR. Ответственность в пути и при замене — на поставщике.</li><li>Пустые картриджи возвращаются поставщику.</li><li>Паспорт безопасности (SDS) предоставляется на русском или узбекском языке.</li></ol>" +
        "<h4>Риски на объекте</h4><ul><li>Картридж могут украсть. Метанол при приёме внутрь смертелен. Картридж стоит в запертом шкафу с предупреждающим знаком.</li><li>Пожарная безопасность — по правилам ПКМ-649: рядом со шкафом горючие материалы не хранятся.</li><li>Открытие шкафа фиксируется датчиком и приходит событием на платформу.</li></ul>" +
        "<p class='ogoh'>Юрист банка и ответственный за пожарную безопасность смотрят договор до подписания.</p>"
    }
  },

  /* ============================ s-y09 · Mobil minora ============================ */
  "s-y09.band1": {
    yorliq: "Montajchi uchun",
    sarlavha: "Minora quvvati dekabrga hisoblanadi",
    tana: "<p>Namuna: AL3000 sinfidagi tirkama. Uch dona 470 Vt panel (1,41 kVt), 6 × 200 A·soat akkumulyator, machta 7 metrdan baland.</p>" +
      "<h4>Dekabr hisobi</h4><table><tr><th>Ko'rsatkich</th><th>Qiymat</th></tr>" +
      "<tr><td>Toshkent, dekabr insolyatsiyasi</td><td class='n'>1,62 kVt·soat/m²</td></tr>" +
      "<tr><td>Panel ishlab chiqarishi, yo'qotish 25%</td><td class='n'>≈1,7 kVt·soat/sutka</td></tr>" +
      "<tr><td>Yuk: PTZ, 2 kamera, NVR, router</td><td class='n'>45–55 Vt</td></tr>" +
      "<tr><td>Sutkalik iste'mol</td><td class='n'>1,1–1,3 kVt·soat</td></tr></table>" +
      "<p>Dekabrda zaxira atigi 30–55%. Bulutli kunlarni akkumulyator yopadi: 55 Vt × 24 soat × 5 kun ≈ 6,6 kVt·soat, 20% zaxira bilan kamida 8 kVt·soat.</p>" +
      "<h4>Qishda nima qilinadi</h4><ul><li>Panel qishki burchakka o'rnatiladi, Toshkent kengligida taxminan 55°.</li><li>Qor tushgandan keyin panel tozalanadi. Bu servis rejasiga kiradi.</li><li>LiFePO4 akkumulyator isitgichli yoki BMS 0 °C dan past zaryadni to'xtatadi. Ayrim minoralarda GEL akkumulyator: u sovuqqa chidamliroq, lekin og'irroq va sikli kamroq.</li><li>Zaxira manba (dizel agregat yoki yoqilg'i elementi) akkumulyator 30% ga tushganda avtomatik yonadi.</li></ul>" +
      "<p class='ogoh'>Yetkazuvchidan dekabr uchun hisob talab qilinadi. Iyun hisobi bilan kelgan minora qishda o'chadi.</p>",
    manba: [["Armorlogix AL3000", "https://armorlogix.com/product/al3000/"]],
    ru: {
      yorliq: "Для монтажника",
      sarlavha: "Питание вышки считают по декабрю",
      tana: "<p>Пример: прицеп класса AL3000. Три панели по 470 Вт (1,41 кВт), аккумуляторы 6 × 200 А·ч, мачта выше 7 метров.</p>" +
        "<h4>Расчёт на декабрь</h4><table><tr><th>Показатель</th><th>Значение</th></tr>" +
        "<tr><td>Ташкент, инсоляция в декабре</td><td class='n'>1,62 кВт·ч/м²</td></tr>" +
        "<tr><td>Выработка панелей, потери 25%</td><td class='n'>≈1,7 кВт·ч/сут.</td></tr>" +
        "<tr><td>Нагрузка: PTZ, 2 камеры, NVR, роутер</td><td class='n'>45–55 Вт</td></tr>" +
        "<tr><td>Суточное потребление</td><td class='n'>1,1–1,3 кВт·ч</td></tr></table>" +
        "<p>В декабре запас всего 30–55%. Пасмурные дни закрывает аккумулятор: 55 Вт × 24 ч × 5 суток ≈ 6,6 кВт·ч, с запасом 20% — не меньше 8 кВт·ч.</p>" +
        "<h4>Что делать зимой</h4><ul><li>Панели ставят под зимний угол, для широты Ташкента около 55°.</li><li>После снегопада панели чистят. Это входит в план обслуживания.</li><li>LiFePO4 с подогревом, либо BMS блокирует заряд ниже 0 °C. На некоторых вышках стоят GEL-аккумуляторы: они легче переносят мороз, но тяжелее и держат меньше циклов.</li><li>Резервный источник (дизельный агрегат или топливный элемент) включается автоматически при 30% заряда.</li></ul>" +
        "<p class='ogoh'>От поставщика требуют расчёт на декабрь. Вышка, рассчитанная по июню, зимой отключится.</p>"
    }
  },

  "s-y09.band2": {
    yorliq: "Montajchi uchun",
    sarlavha: "Minoradagi jihoz va joyiga qo'yish tartibi",
    tana: "<table><tr><th>Jihoz</th><th>Vazifasi</th></tr>" +
      "<tr><td>360° PTZ kamera, IR bilan</td><td>Butun maydonni aylanib ko'radi, hodisaga buriladi</td></tr>" +
      "<tr><td>2–4 statik kamera</td><td>Darvoza, burchak va texnika turgan joy</td></tr>" +
      "<tr><td>Karnay yoki sirena</td><td>Operator ovozli ogohlantirish beradi</td></tr>" +
      "<tr><td>4G yoki 5G router</td><td>Ikki SIM, VPN</td></tr>" +
      "<tr><td>NVR, SSD bilan</td><td>Aloqa uzilsa ham yozuv joyida qoladi</td></tr></table>" +
      "<h4>Joyiga qo'yish</h4><ol><li>Tekis va qattiq joy tanlanadi, suv to'planadigan chuqurlik emas.</li><li>Tayanch oyoqlar chiqariladi, tirkama gorizontal qilinadi.</li><li>Yerga ulash qoziq bilan qilinadi: machta chaqmoqni tortadi.</li><li>Machta faqat shamol ishlab chiqaruvchi chegarasidan past bo'lganda ko'tariladi.</li><li>G'ildirak va ilgak qulflanadi, GPS treker yoqiladi.</li><li>Kameralar yo'naltiriladi, PTZ'ga 4–6 ta preset yoziladi.</li><li>Platformada video, quvvat va signal ko'rinadi — shundan keyin dalolatnoma.</li></ol>" +
      "<p>AL3000 sinfidagi tirkama taxminan 1 300 kg. Uni tortish uchun ilgakli avtomobil va haydovchi kerak.</p><p>Ko'chirishda tartib teskari: machta tushiriladi, kameralar yig'iladi, platformada minora «ko'chirilmoqda» holatiga o'tadi va yangi obyekt kodiga bog'lanadi.</p>",
    manba: [["Armorlogix AL3000", "https://armorlogix.com/product/al3000/"]],
    ru: {
      yorliq: "Для монтажника",
      sarlavha: "Оборудование вышки и порядок установки",
      tana: "<table><tr><th>Оборудование</th><th>Назначение</th></tr>" +
        "<tr><td>PTZ-камера 360° с ИК</td><td>Обходит всю площадку, поворачивается на событие</td></tr>" +
        "<tr><td>2–4 стационарные камеры</td><td>Ворота, углы, место стоянки техники</td></tr>" +
        "<tr><td>Громкоговоритель или сирена</td><td>Оператор даёт голосовое предупреждение</td></tr>" +
        "<tr><td>4G- или 5G-роутер</td><td>Две SIM, VPN</td></tr>" +
        "<tr><td>NVR с SSD</td><td>При обрыве связи запись остаётся на месте</td></tr></table>" +
        "<h4>Установка</h4><ol><li>Выбирают ровное твёрдое место, не низину, где собирается вода.</li><li>Выдвигают опоры и выставляют прицеп по горизонту.</li><li>Делают заземление штырём: мачта притягивает молнию.</li><li>Мачту поднимают, только если ветер ниже предела производителя.</li><li>Колёса и сцепку запирают, включают GPS-трекер.</li><li>Наводят камеры, в PTZ записывают 4–6 пресетов.</li><li>Видео, питание и сигнал видны на платформе — только после этого акт.</li></ol>" +
        "<p>Прицеп класса AL3000 весит около 1 300 кг. Для буксировки нужен автомобиль с фаркопом и водитель.</p><p>При перевозке порядок обратный: мачту опускают, камеры складывают, на платформе вышка переходит в статус «перевозится» и привязывается к коду нового объекта.</p>"
    }
  },

  "s-y09.band3": {
    yorliq: "Jamoa rahbarlari uchun",
    sarlavha: "Minora kontrolleri va videoni ulash",
    tana: "<p>Ko'p minoralar quvvat qismini Victron GX kontrolleri (Cerbo GX va shunga o'xshash) bilan boshqaradi. Undan ma'lumot olishning ikki rasmiy yo'li bor.</p>" +
      "<h4>Modbus TCP</h4><p>Kontroller menyusida xizmat yoqiladi, port 502. Registrlar ro'yxati Victron'ning ochiq jadvalida. Adapter akkumulyator foizi, kuchlanish, panel quvvati va zaryad holatini o'qiydi.</p>" +
      "<h4>MQTT</h4><p>Venus OS 3.20 dan boshlab dbus-flashmq ishlatiladi. Qiymat o'zgarganda kontroller quyidagi mavzuga yozadi:</p>" +
      "<pre><code>N/{portal_id}/{xizmat_turi}/{instance}/{dbus_yo'li}\nmasalan: N/{portal_id}/battery/512/Soc</code></pre>" +
      "<p>Kontroller nashrni davom ettirishi uchun adapter vaqti-vaqti bilan <code>R/{portal_id}/keepalive</code> yuboradi. Adapter qiymatlarni <code>mkb/v1/{obyekt}/{device_id}/quvvat</code> ga ko'chiradi.</p>" +
      "<h4>Video va signal</h4><ul><li>Kameralar ONVIF Profile S va RTSP, PTZ ONVIF PTZ orqali boshqariladi.</li><li>Chiziq kesish va hudud hodisalari ONVIF voqealari yoki ishlab chiqaruvchi API'sidan olinadi.</li><li>Sirena kameraning signal chiqishi yoki routerning relesi bilan yoqiladi, buyruq platformadan keladi.</li></ul>" +
      "<p class='ogoh'>Modbus va MQTT porti faqat VPN ichida ochiladi. Standart sozlamada ular autentifikatsiyasiz.</p>",
    manba: [["Victron GX Modbus-TCP", "https://www.victronenergy.com/live/ccgx:modbustcp_faq"], ["Victron dbus-flashmq", "https://github.com/victronenergy/dbus-flashmq"]],
    ru: {
      yorliq: "Для тимлида",
      sarlavha: "Контроллер вышки и подключение видео",
      tana: "<p>Во многих вышках питанием управляет контроллер Victron GX (Cerbo GX и аналоги). Официально данные из него можно взять двумя способами.</p>" +
        "<h4>Modbus TCP</h4><p>Сервис включается в меню контроллера, порт 502. Список регистров — в открытой таблице Victron. Адаптер читает заряд аккумулятора, напряжение, мощность панелей и режим заряда.</p>" +
        "<h4>MQTT</h4><p>Начиная с Venus OS 3.20 используется dbus-flashmq. При изменении значения контроллер публикует в топик:</p>" +
        "<pre><code>N/{portal_id}/{service_type}/{instance}/{dbus_path}\nнапример: N/{portal_id}/battery/512/Soc</code></pre>" +
        "<p>Чтобы контроллер продолжал публикацию, адаптер периодически отправляет <code>R/{portal_id}/keepalive</code>. Значения адаптер переносит в <code>mkb/v1/{obyekt}/{device_id}/quvvat</code>.</p>" +
        "<h4>Видео и тревога</h4><ul><li>Камеры по ONVIF Profile S и RTSP, PTZ управляется через ONVIF PTZ.</li><li>Пересечение линии и вторжение в зону берутся из событий ONVIF или API производителя.</li><li>Сирена включается тревожным выходом камеры или реле роутера, команда приходит с платформы.</li></ul>" +
        "<p class='ogoh'>Порты Modbus и MQTT открываются только внутри VPN. В заводской настройке они без аутентификации.</p>"
    }
  },

  "s-y09.band4": {
    yorliq: "Rahbariyat uchun",
    sarlavha: "Minora binoni emas, maydonni qo'riqlaydi",
    tana: "<p>Minora ochiq hududni bir nuqtadan ko'radi. Bir minora hovli bo'ylab tarqatilgan 6–10 ta statik kameraning ishini qiladi va bir kunda joyiga qo'yiladi.</p>" +
      "<h4>Mos obyektlar</h4><ul><li>Bir gektardan katta ochiq maydon: ishlab chiqarish hovlisi, texnika turadigan joy.</li><li>Tugallanmagan qurilish: devor va darvoza hali yo'q.</li><li>O'g'irlik urinishi bo'lgan obyekt: bir necha hafta kuchaytirilgan nazorat.</li></ul>" +
      "<h4>Balansdan misol</h4><p>Ishlab chiqarish sexlari (24 ta) va chorvachilik fermalari (32 ta) hududlari. Ichki xonalar uchun minora kerak emas: u yerga datchik yoki LiFePO4 shkafi qo'yiladi.</p>" +
      "<h4>Bank hal qiladigan savollar</h4><ol><li>Sotib olish, ijara yoki 2–4 ta minoralik bank puli.</li><li>Kim ko'chiradi: xo'jalik bo'limi yoki yetkazuvchi xizmati.</li><li>Minoraning o'zi sug'urtalanadi, chunki qorovulsiz joyda u ham qimmat aktiv.</li><li>Ogohlantirish kelganda kim chiqadi: IIV huzuridagi Qo'riqlash departamenti bilan shartnoma.</li></ol><p>Minora uzoqdan ko'rinadi, bu o'zi ham to'xtatuvchi omil. Lekin u javob choralarini almashtirmaydi: signal kelganda kimdir obyektga yetib borishi kerak.</p>",
    manba: [],
    ru: {
      yorliq: "Для руководства",
      sarlavha: "Вышка охраняет площадку, а не здание",
      tana: "<p>Вышка видит открытую территорию из одной точки. Одна вышка заменяет 6–10 стационарных камер, разнесённых по двору, и ставится за день.</p>" +
        "<h4>Подходящие объекты</h4><ul><li>Открытая площадка больше гектара: производственный двор, стоянка техники.</li><li>Незавершённое строительство: забора и ворот ещё нет.</li><li>Объект, где была попытка кражи: несколько недель усиленного контроля.</li></ul>" +
        "<h4>Пример с баланса</h4><p>Территории производственных цехов (24) и животноводческих ферм (32). Для внутренних помещений вышка не нужна: там ставят датчики или шкаф LiFePO4.</p>" +
        "<h4>Что решает банк</h4><ol><li>Покупка, аренда или собственный пул из 2–4 вышек.</li><li>Кто перевозит: хозяйственный отдел или служба поставщика.</li><li>Саму вышку страхуют: на объекте без охраны это тоже дорогой актив.</li><li>Кто выезжает по тревоге: договор с Департаментом охраны при МВД.</li></ol><p>Вышку видно издалека, это само по себе сдерживает. Но она не заменяет реагирование: по сигналу кто-то должен приехать на объект.</p>"
    }
  },

  "s-y09.narx1": {
    yorliq: "Moliya va huquq",
    sarlavha: "Minora: xarid, ijara yoki ko'chirish",
    tana: "<table><tr><th>Qator</th><th>mln so'm</th></tr>" +
      "<tr><td>Tirkama va teleskopik machta</td><td class='n'>15–40</td></tr>" +
      "<tr><td>Panel, akkumulyator, kontroller</td><td class='n'>12–35</td></tr>" +
      "<tr><td>PTZ va statik kameralar</td><td class='n'>6–20</td></tr>" +
      "<tr><td>Router, NVR, sirena</td><td class='n'>3–8</td></tr>" +
      "<tr><td>Yetkazish, bojxona, ishga tushirish</td><td class='n'>4–17</td></tr>" +
      "<tr><td>Jami</td><td class='n'>40–120</td></tr></table>" +
      "<p>Taxminiy baho, 2026. Pastki chegara — mahalliy yig'ilgan machta, yuqorisi — import tirkama.</p>" +
      "<h4>Sotib olish yoki ijara</h4><p>Qoida oddiy: <b>oylik ijara × oylar &lt; xarid narxi − qoldiq qiymati</b> bo'lsa, ijara foydali. Misol: 80 mln lik minora besh yil ishlaydi va 16 mln ga sotiladi. Yillik egalik narxi 12,8 mln va har ko'chirish 1–3 mln. Minora yil bo'yi band bo'lmasa, ijara arzonroq.</p>" +
      "<h4>Besh yillik xarajat</h4><ul><li>SIM va trafik: oyiga taxminan 100–200 ming.</li><li>Yiliga bir-ikki servis: panel tozalash, machta mexanizmi, akkumulyator tekshiruvi.</li><li>Ko'chirish: har safar transport va 2–4 soat ish.</li></ul>" +
      "<p>Lizing kompaniyasi orqali olish ham mumkin: bank to'lovni oylarga bo'ladi, lekin qarz balansda qoladi.</p>",
    manba: [],
    ru: {
      yorliq: "Финансы и право",
      sarlavha: "Вышка: покупка, аренда или перевозка",
      tana: "<table><tr><th>Статья</th><th>млн сумов</th></tr>" +
        "<tr><td>Прицеп и телескопическая мачта</td><td class='n'>15–40</td></tr>" +
        "<tr><td>Панели, аккумуляторы, контроллер</td><td class='n'>12–35</td></tr>" +
        "<tr><td>PTZ и стационарные камеры</td><td class='n'>6–20</td></tr>" +
        "<tr><td>Роутер, NVR, сирена</td><td class='n'>3–8</td></tr>" +
        "<tr><td>Доставка, таможня, пусконаладка</td><td class='n'>4–17</td></tr>" +
        "<tr><td>Итого</td><td class='n'>40–120</td></tr></table>" +
        "<p>Ориентировочная оценка, 2026. Нижняя граница — мачта местной сборки, верхняя — импортный прицеп.</p>" +
        "<h4>Купить или арендовать</h4><p>Правило простое: если <b>аренда в месяц × месяцы &lt; цена покупки − остаточная стоимость</b>, выгоднее аренда. Пример: вышка за 80 млн работает пять лет и продаётся за 16 млн. Владение обходится в 12,8 млн в год плюс 1–3 млн за каждую перевозку. Если вышка занята не весь год, аренда дешевле.</p>" +
        "<h4>Затраты за пять лет</h4><ul><li>SIM и трафик: около 100–200 тыс. в месяц.</li><li>Один-два сервиса в год: чистка панелей, механизм мачты, проверка аккумуляторов.</li><li>Перевозка: каждый раз транспорт и 2–4 часа работы.</li></ul>" +
        "<p>Можно взять через лизинговую компанию: платёж делится на месяцы, но обязательство остаётся на балансе.</p>"
    }
  },

  "s-y09.diqqat1": {
    yorliq: "Rahbariyat uchun",
    sarlavha: "Minorani bitta obyektga bog'lab qo'ymaslik",
    tana: "<p>MB 2696-son nizomining 20-bandi bo'yicha balansga olinganiga bir yil to'lib sotilmagan aktiv «umidsiz» toifaga o'tadi va 100% zaxira talab qiladi. Nazorat jihozi esa besh yil va undan ko'p ishlaydi. Minorani bitta obyekt hisobiga olish uni bir yildan keyin bo'sh qoldiradi.</p>" +
      "<table><tr><th>Model</th><th>Qachon</th></tr>" +
      "<tr><td>Oyma-oy ijara</td><td>Minora yilda 6 oydan kam kerak</td></tr>" +
      "<tr><td>Bankning 2–4 minoralik puli</td><td>Katta maydonli obyektlar doim bor</td></tr>" +
      "<tr><td>Obyektga xarid</td><td>Tavsiya etilmaydi</td></tr></table>" +
      "<h4>Minoraning o'z xatari</h4><ul><li>Minora qorovulsiz joyda turadi. GPS treker, g'ildirak qulfi, og'ish datchigi va machta pastiga kamera qaratiladi.</li><li>Minora balansda asosiy vosita sifatida yuritiladi, sug'urtalanadi.</li><li>Har ko'chirish platformada qayd etiladi: minora qaysi obyektga qachondan bog'langani ko'rinadi.</li></ul>" +
      "<p class='ogoh'>MB 2026-yil sentabrda yangi 3937-son tasniflash va zaxira nizomini ro'yxatdan o'tkazdi. Bir yillik qoidani yangi hujjat bilan solishtirib chiqish kerak.</p><p>Moliya bo'limi uchun amaliy qoida: minora xarajati obyektning zaxira hisobiga emas, bankning umumiy xo'jalik xarajatiga yoziladi.</p>",
    manba: [],
    ru: {
      yorliq: "Для руководства",
      sarlavha: "Не привязывать вышку к одному объекту",
      tana: "<p>По пункту 20 Положения ЦБ № 2696 актив, не проданный через год после принятия на баланс, переходит в категорию «безнадёжных» и требует резерва 100%. А оборудование контроля работает пять лет и дольше. Если купить вышку под один объект, через год она будет простаивать.</p>" +
        "<table><tr><th>Модель</th><th>Когда</th></tr>" +
        "<tr><td>Помесячная аренда</td><td>Вышка нужна меньше 6 месяцев в году</td></tr>" +
        "<tr><td>Пул банка из 2–4 вышек</td><td>Объекты с большими площадками есть всегда</td></tr>" +
        "<tr><td>Покупка под объект</td><td>Не рекомендуется</td></tr></table>" +
        "<h4>Риски самой вышки</h4><ul><li>Вышка стоит на объекте без охраны. GPS-трекер, замок колёс, датчик наклона и камера на основание мачты.</li><li>Вышка учитывается как основное средство и страхуется.</li><li>Каждая перевозка фиксируется на платформе: видно, к какому объекту и с какой даты вышка привязана.</li></ul>" +
        "<p class='ogoh'>В сентябре 2026 года ЦБ зарегистрировал новое положение № 3937 о классификации и резервах. Правило одного года нужно сверить с новым документом.</p><p>Практическое правило для финансов: затраты на вышку относят не к резерву по объекту, а к общим хозяйственным расходам банка.</p>"
    }
  },

  /* ============================ s-y10 · Klaster shkafi ============================ */
  "s-y10.diqqat1": {
    yorliq: "Texnik izoh",
    sarlavha: "Radio ma'lumot uzatadi, quvvat emas",
    tana: "<p>Klaster shkafi faqat kabel yetadigan qurilmalarni oziqlaydi. Radio ko'prik ikki nuqta orasida ma'lumot uzatadi, quvvat uzatmaydi. Shuning uchun ikki holat bor:</p>" +
      "<ul><li><b>Bir hududdagi binolar</b>, 100 m gacha: kamera va radio shkafdan PoE kabel bilan oziqlanadi.</li>" +
      "<li><b>Uzoqroq obyekt</b>: joyida kichik 12 V LiFePO4 va 100–200 Vt panel qo'yiladi, shkafga faqat radio orqali ulanadi.</li></ul>" +
      "<p class='ogoh'>PoE segmenti 100 m bilan cheklangan. Loyihada har obyektgacha kabel uzunligi oldindan o'lchanadi, aks holda montaj kunida sxema o'zgaradi.</p>",
    manba: [],
    ru: {
      yorliq: "Техническая справка",
      sarlavha: "Радиомост передаёт данные, а не питание",
      tana: "<p>Кластерный шкаф питает только те устройства, до которых доходит кабель. Радиомост передаёт данные между двумя точками, но не питание. Отсюда два случая:</p>" +
        "<ul><li><b>Здания на одной территории</b>, до 100 м: камера и радио питаются от шкафа по кабелю PoE.</li>" +
        "<li><b>Дальний объект</b>: на месте ставят небольшой LiFePO4 на 12 В и панель 100–200 Вт, со шкафом его связывает только радио.</li></ul>" +
        "<p class='ogoh'>Сегмент PoE ограничен 100 м. Длину кабеля до каждого объекта замеряют заранее, иначе схему придётся менять в день монтажа.</p>"
    }
  },

  "s-y10.band1": {
    yorliq: "Montajchi uchun",
    sarlavha: "Bitta shkafdan bir nechta obyektga quvvat",
    tana: "<p>Shkaf faqat kabel yetadigan qurilmalarni oziqlaydi. Radio ko'prik ma'lumot uzatadi, quvvat emas. Shuning uchun ikki holat bor:</p>" +
      "<ul><li><b>Bir hududdagi binolar</b>, 100 m gacha: kamera va radio shkafdan PoE kabel bilan oziqlanadi. PoE segmenti 100 m bilan cheklangan.</li><li><b>Uzoqroq obyekt</b>: joyida kichik 12 V LiFePO4 va 100–200 Vt panel qo'yiladi, shkafga faqat radio orqali ulanadi.</li></ul>" +
      "<h4>Shkaf hisobi, 6 obyekt misolida</h4><table><tr><th>Iste'molchi</th><th>Vt</th></tr>" +
      "<tr><td>Kamera, 12 dona × 5 Vt</td><td class='n'>60</td></tr>" +
      "<tr><td>Radio, 7 dona × 7 Vt gacha</td><td class='n'>49</td></tr>" +
      "<tr><td>NVR va klaster routeri</td><td class='n'>18</td></tr>" +
      "<tr><td>Jami, sutkasiga ≈3 kVt·soat</td><td class='n'>≈127</td></tr></table>" +
      "<ul><li>Akkumulyator: uch kunlik zaxira bilan 48 V, taxminan 10 kVt·soat LiFePO4.</li><li>Panel: dekabrda 3 kVt·soat uchun 1,62 × 0,75 ga bo'lganda taxminan 2,5 kVt.</li><li>Shkaf izolyatsiyali, BMS 0 °C dan past zaryadni to'xtatadi, qishda isitgich akkumulyatordan emas, paneldan oziqlanadi.</li></ul>" +
      "<p class='ogoh'>Uzoq masofaga 12 V tortilmaydi: kuchlanish yo'qolishi katta. Kerak bo'lsa 48 V DC va kesimi hisoblangan kabel ishlatiladi.</p>",
    manba: [["MikroTik SXTsq 5 ac", "https://mikrotik.com/product/sxtsq_5_ac"]],
    ru: {
      yorliq: "Для монтажника",
      sarlavha: "Питание нескольких объектов от одного шкафа",
      tana: "<p>Шкаф питает только те устройства, до которых дотягивается кабель. Радиомост передаёт данные, а не энергию. Поэтому возможны два случая:</p>" +
        "<ul><li><b>Здания на одной территории</b>, до 100 м: камеры и радио питаются от шкафа по PoE. Сегмент PoE ограничен 100 м.</li><li><b>Объект дальше</b>: на месте ставят небольшой LiFePO4 на 12 В и панель 100–200 Вт, со шкафом его связывает только радио.</li></ul>" +
        "<h4>Расчёт шкафа на 6 объектов</h4><table><tr><th>Потребитель</th><th>Вт</th></tr>" +
        "<tr><td>Камеры, 12 шт. × 5 Вт</td><td class='n'>60</td></tr>" +
        "<tr><td>Радио, 7 шт. × до 7 Вт</td><td class='n'>49</td></tr>" +
        "<tr><td>NVR и роутер кластера</td><td class='n'>18</td></tr>" +
        "<tr><td>Итого, ≈3 кВт·ч в сутки</td><td class='n'>≈127</td></tr></table>" +
        "<ul><li>Аккумулятор: с запасом на трое суток — LiFePO4 48 В примерно на 10 кВт·ч.</li><li>Панели: для 3 кВт·ч в декабре, делённых на 1,62 × 0,75, — около 2,5 кВт.</li><li>Шкаф утеплён, BMS блокирует заряд ниже 0 °C, зимой подогрев питается от панелей, а не от аккумулятора.</li></ul>" +
        "<p class='ogoh'>На большое расстояние 12 В не тянут: велико падение напряжения. При необходимости — 48 В DC и кабель рассчитанного сечения.</p>"
    }
  },

  "s-y10.band2": {
    yorliq: "Montajchi uchun",
    sarlavha: "Radio ko'prik: ko'rinish, masofa, sozlash",
    tana: "<p>Sxema «nuqtadan ko'p nuqtaga»: shkafda bitta kirish nuqtasi, har obyektda mijoz radio. Namuna qurilmalar: MikroTik SXTsq 5 ac (16 dBi, 7 Vt gacha, −40…+70 °C) va Ubiquiti NanoStation 5AC Loco (10 km dan ortiq aloqa).</p>" +
      "<h4>Tekshiriladigan shartlar</h4><ul><li>To'g'ridan-to'g'ri ko'rinish. Daraxt, tom va minora chiziqni kesmasligi kerak.</li><li>Frenel zonasi kamida 60% bo'sh: 5,5 GHz'da 1 km aloqaning o'rtasida uning radiusi taxminan 3,7 m.</li><li>Maqsadli signal −65 dBm dan yaxshi. Undan past bo'lsa, antenna balandroq ko'tariladi.</li><li>5 GHz'dan tashqarida foydalanish shartlari va ruxsati xariddan oldin aniqlanadi.</li></ul>" +
      "<h4>Tarmoq sozlamasi</h4><ul><li>Har obyekt alohida VLAN oladi, masalan 101–110. Boshqaruv VLAN'i alohida.</li><li>Kamera qo'shimcha oqimi 1–2 Mbit/s, asosiy oqim 4 Mbit/s atrofida. 10 obyektning hammasiga 5 GHz aloqaning o'nlab megabiti yetadi.</li><li>Radiolar statik IP va NTP bilan, standart parol almashtiriladi.</li></ul>" +
      "<p>O'rnatishdan keyin har aloqaning signal darajasi va tezlik testi dalolatnomaga yoziladi.</p>",
    manba: [["MikroTik SXTsq 5 ac", "https://mikrotik.com/product/sxtsq_5_ac"], ["Ubiquiti Loco5AC", "https://techspecs.ui.com/uisp/wireless/loco5ac"]],
    ru: {
      yorliq: "Для монтажника",
      sarlavha: "Радиомост: видимость, дальность, настройка",
      tana: "<p>Схема «точка — многоточка»: в шкафу одна точка доступа, на каждом объекте клиентское радио. Примеры устройств: MikroTik SXTsq 5 ac (16 dBi, до 7 Вт, −40…+70 °C) и Ubiquiti NanoStation 5AC Loco (связь больше 10 км).</p>" +
        "<h4>Что проверить</h4><ul><li>Прямая видимость. Деревья, крыши и вышки не должны пересекать линию.</li><li>Зона Френеля свободна минимум на 60%: на 5,5 ГГц в середине пролёта 1 км её радиус около 3,7 м.</li><li>Целевой сигнал лучше −65 дБм. Если хуже, антенну поднимают выше.</li><li>Условия и разрешение на использование 5 ГГц вне помещений выясняются до закупки.</li></ul>" +
        "<h4>Настройка сети</h4><ul><li>Каждый объект получает свой VLAN, например 101–110. VLAN управления отдельный.</li><li>Дополнительный поток камеры 1–2 Мбит/с, основной около 4 Мбит/с. Для всех 10 объектов хватает десятков мегабит линка 5 ГГц.</li><li>Радио со статическим IP и NTP, заводской пароль меняется.</li></ul>" +
        "<p>После монтажа уровень сигнала и тест скорости каждого линка вносятся в акт.</p>"
    }
  },

  "s-y10.band3": {
    yorliq: "Jamoa rahbarlari uchun",
    sarlavha: "Klaster shlyuzi va device_id sxemasi",
    tana: "<p>Klasterda MKB bilan bitta VPN tunnel bor. Lekin platforma uchun har obyekt alohida: hodisa, hisobot va sotuv obyekt bo'yicha yuritiladi.</p>" +
      "<h4>Xaritalash jadvali shlyuzda</h4><pre><code>device_id  obyekt        vlan  ip\nKAM-0007   AK-2025/0934  101   10.1.1.11\nKAM-0008   AK-2025/0934  101   10.1.1.12\nKAM-0015   AK-2025/0951  102   10.1.2.11</code></pre>" +
      "<ul><li>Shlyuz har qurilma nomidan o'z mavzusiga yozadi: <code>mkb/v1/{obyekt}/{device_id}/...</code>. Brokerda ACL shlyuzga faqat jadvaldagi obyektlarni ochadi.</li><li>Video NVR kanallari orqali, RTSP shlyuzdagi proksi bilan beriladi. Kamera tunneldan tashqariga chiqmaydi.</li><li>Heartbeat qurilma bo'yicha: radio aloqa uzilsa, platforma «AK-2025/0951: aloqa yo'q» deydi, butun klaster emas.</li></ul>" +
      "<h4>Obyekt sotilganda</h4><ol><li>Uning device_id'lari reyestrda arxivga o'tadi.</li><li>VLAN o'chiriladi, ACL yangilanadi.</li><li>Radio va kameralar yechib olinadi yoki yangi egasiga dalolatnoma bilan qoldiriladi.</li></ol>" +
      "<p class='ogoh'>Shlyuz yagona nuqta. Ikki SIM, watchdog va zaxira LTE modem shart. Shlyuz tushsa, platforma buni har obyektga emas, bitta klaster hodisasi sifatida ko'rsatadi.</p>",
    manba: [],
    ru: {
      yorliq: "Для тимлида",
      sarlavha: "Шлюз кластера и схема device_id",
      tana: "<p>У кластера один VPN-туннель до MKB. Но для платформы каждый объект отдельный: события, отчёты и продажа ведутся по объекту.</p>" +
        "<h4>Таблица сопоставления на шлюзе</h4><pre><code>device_id  obyekt        vlan  ip\nKAM-0007   AK-2025/0934  101   10.1.1.11\nKAM-0008   AK-2025/0934  101   10.1.1.12\nKAM-0015   AK-2025/0951  102   10.1.2.11</code></pre>" +
        "<ul><li>Шлюз пишет от имени каждого устройства в его топик: <code>mkb/v1/{obyekt}/{device_id}/...</code>. ACL брокера открывает шлюзу только объекты из таблицы.</li><li>Видео — через каналы NVR, RTSP отдаётся прокси на шлюзе. Камера за пределы туннеля не выходит.</li><li>Heartbeat по каждому устройству: если пропал радиолинк, платформа сообщает «AK-2025/0951: нет связи», а не про весь кластер.</li></ul>" +
        "<h4>Когда объект продан</h4><ol><li>Его device_id переходят в архив реестра.</li><li>VLAN удаляется, ACL обновляется.</li><li>Радио и камеры снимают или оставляют новому владельцу по акту.</li></ol>" +
        "<p class='ogoh'>Шлюз — единая точка отказа. Обязательны две SIM, watchdog и резервный LTE-модем. Если шлюз упал, платформа показывает одно событие кластера, а не по каждому объекту.</p>"
    }
  },

  "s-y10.band4": {
    yorliq: "Rahbariyat uchun",
    sarlavha: "Klaster nimani tejaydi va qayerda ishlamaydi",
    tana: "<p>Tejash takrorlanadigan jihozdan keladi. Har obyektga alohida router, NVR va SIM o'rniga klasterda bittadan.</p>" +
      "<table><tr><th>10 obyektda tejaladi</th><th>mln so'm</th></tr>" +
      "<tr><td>Router, 9 dona × 0,8–1,5</td><td class='n'>7–14</td></tr>" +
      "<tr><td>NVR, 9 dona × 1,5–3,0</td><td class='n'>14–27</td></tr>" +
      "<tr><td>SIM, 9 dona, yiliga</td><td class='n'>5–11</td></tr></table>" +
      "<p>Servis ham bitta nuqtada: akkumulyator, internet va yozuv bir joyda tekshiriladi.</p>" +
      "<h4>Ishlamaydigan holatlar</h4><ul><li>Obyektlar orasi 2–3 km dan ko'p yoki ko'rinish yo'q.</li><li>Obyektlar turli vaqtda sotiladi. Shkaf turgan obyekt birinchi sotilsa, shkafni ko'chirish kerak bo'ladi. Shuning uchun shkaf eng oxirida sotiladigan obyektga yoki kelishilgan neytral joyga qo'yiladi.</li><li>Bir obyektni sotuvda ko'rsatish boshqa obyekt hududiga kirishni talab qilmasligi kerak.</li></ul>" +
      "<h4>Balansdan misol</h4><p>Bitta sanoat zonasidagi bir necha sex, bir massivdagi omborlar, bir tumandagi yonma-yon fermalar.</p><p>Klaster qarori ko'rik bosqichida qabul qilinadi: montajchi xaritada obyektlar orasidagi masofa va ko'rinishni belgilaydi, shundan keyin smeta tuziladi.</p>",
    manba: [],
    ru: {
      yorliq: "Для руководства",
      sarlavha: "Что экономит кластер и где он не работает",
      tana: "<p>Экономия идёт от повторяющегося оборудования. Вместо роутера, NVR и SIM на каждом объекте — по одному на кластер.</p>" +
        "<table><tr><th>Экономия на 10 объектах</th><th>млн сумов</th></tr>" +
        "<tr><td>Роутеры, 9 шт. × 0,8–1,5</td><td class='n'>7–14</td></tr>" +
        "<tr><td>NVR, 9 шт. × 1,5–3,0</td><td class='n'>14–27</td></tr>" +
        "<tr><td>SIM, 9 шт., в год</td><td class='n'>5–11</td></tr></table>" +
        "<p>Сервис тоже в одной точке: аккумулятор, интернет и запись проверяются в одном месте.</p>" +
        "<h4>Когда не работает</h4><ul><li>Между объектами больше 2–3 км или нет прямой видимости.</li><li>Объекты продаются в разное время. Если первым продадут объект со шкафом, шкаф придётся переносить. Поэтому его ставят на объект, который будет продан последним, или на согласованное нейтральное место.</li><li>Показ одного объекта покупателю не должен требовать доступа на территорию другого.</li></ul>" +
        "<h4>Пример с баланса</h4><p>Несколько цехов в одной промзоне, склады в одном массиве, соседние фермы в одном районе.</p><p>Решение о кластере принимают на этапе обследования: монтажник отмечает на карте расстояния и видимость между объектами, после этого составляют смету.</p>"
    }
  },

  "s-y10.narx1": {
    yorliq: "Moliya va huquq",
    sarlavha: "Klaster narxi obyektlarga bo'linganda",
    tana: "<table><tr><th>Qator</th><th>mln so'm</th></tr>" +
      "<tr><td>LiFePO4 shkaf, ≈10 kVt·soat, panellar bilan</td><td class='n'>9–15</td></tr>" +
      "<tr><td>Radio: kirish nuqtasi va 3–10 mijoz</td><td class='n'>2–5</td></tr>" +
      "<tr><td>NVR va disk</td><td class='n'>1,5–3</td></tr>" +
      "<tr><td>Klaster routeri, ikki SIM</td><td class='n'>1–2</td></tr>" +
      "<tr><td>Kameralar, obyektga 1–2 dona</td><td class='n'>3–10</td></tr>" +
      "<tr><td>Montaj, kabel, sozlash</td><td class='n'>3–5</td></tr>" +
      "<tr><td>Jami</td><td class='n'>20–40</td></tr></table>" +
      "<p>Taxminiy baho, 2026. Pastki chegara — 3 obyekt va qisqa kabellar, yuqorisi — 10 obyekt va uzoq radio aloqalar.</p>" +
      "<div class='raqamlar'><div><b>2–4 mln</b><span>10 obyektli klasterda bittasiga</span></div><div><b>7–13 mln</b><span>3 obyektli klasterda bittasiga</span></div></div>" +
      "<p>Uch obyektda klaster alohida LiFePO4 shkaflaridan (12–20 mln) sezilarli arzon emas. Foyda beshta va undan ko'p obyektda boshlanadi.</p>" +
      "<h4>Qayerdan va kim</h4><p>MikroTik va Ubiquiti Toshkentdagi distribyutorlarda bor. LiFePO4 shkafni mahalliy integrator yig'adi. Radio tajribasi bor integrator tanlanadi: aloqa sifati montajga bog'liq.</p>" +
      "<h4>Besh yil</h4><p>Bitta SIM: besh yilda taxminan 3–6 mln. LiFePO4 akkumulyator besh yilda almashtirilmaydi, kameralar va radio ham. Servis: yiliga ikki marta panel tozalash va shkaf ko'rigi.</p>",
    manba: [],
    ru: {
      yorliq: "Финансы и право",
      sarlavha: "Цена кластера в пересчёте на объект",
      tana: "<table><tr><th>Статья</th><th>млн сумов</th></tr>" +
        "<tr><td>Шкаф LiFePO4, ≈10 кВт·ч, с панелями</td><td class='n'>9–15</td></tr>" +
        "<tr><td>Радио: точка доступа и 3–10 клиентов</td><td class='n'>2–5</td></tr>" +
        "<tr><td>NVR и диск</td><td class='n'>1,5–3</td></tr>" +
        "<tr><td>Роутер кластера на две SIM</td><td class='n'>1–2</td></tr>" +
        "<tr><td>Камеры, 1–2 шт. на объект</td><td class='n'>3–10</td></tr>" +
        "<tr><td>Монтаж, кабель, настройка</td><td class='n'>3–5</td></tr>" +
        "<tr><td>Итого</td><td class='n'>20–40</td></tr></table>" +
        "<p>Ориентировочная оценка, 2026. Нижняя граница — 3 объекта и короткие кабели, верхняя — 10 объектов и дальние радиолинки.</p>" +
        "<div class='raqamlar'><div><b>2–4 млн</b><span>на объект в кластере из 10</span></div><div><b>7–13 млн</b><span>на объект в кластере из 3</span></div></div>" +
        "<p>На трёх объектах кластер заметно не дешевле отдельных шкафов LiFePO4 (12–20 млн). Выгода начинается с пяти объектов.</p>" +
        "<h4>Где и кто</h4><p>MikroTik и Ubiquiti есть у дистрибьюторов в Ташкенте. Шкаф LiFePO4 собирает местный интегратор. Нужен интегратор с опытом радиосвязи: качество линка зависит от монтажа.</p>" +
        "<h4>Пять лет</h4><p>Одна SIM: около 3–6 млн за пять лет. Аккумулятор LiFePO4 за пять лет не меняют, камеры и радио тоже. Сервис: дважды в год чистка панелей и осмотр шкафа.</p>"
    }
  },

  /* ============================ s-narx · Narx oraliqlari ============================ */
  "s-narx.diapazon1": {
    yorliq: "Rahbariyat uchun",
    sarlavha: "Milesight LoRaWAN: eng arzon, lekin videosiz",
    tana: "<p>Obyektda ko'p eshik va xona bor, lekin doimiy video shart emas: eshik ochilishi, namlik, harorat va tutunni bilish yetadi. Video faqat hodisani tasdiqlash uchun.</p>" +
      "<h4>Narx nimaga bog'liq</h4><ul><li>Datchiklar soni: har eshik va har yopiq xona. 3 mln — 4 datchik va kamerasiz, 8 mln — 6 datchik va bitta 4G kamera.</li><li>Shlyuz umumiymi: bir tumanda 5–10 obyekt bo'lsa, shlyuz ulushi 1 mln dan kam.</li><li>Tasdiqlovchi kamera — eng qimmat qator.</li></ul>" +
      "<h4>Balansdan qaysi obyekt</h4><p>Omborxonalar (12), ishlab chiqarish sexlarining ichki xonalari (24), issiqxonalar (6) — harorat va namlik u yerda asosiy xatar.</p>" +
      "<p class='ogoh'>Xariddan oldin LoRaWAN chastotasiga ruxsat masalasi hal qilinadi. Bu hal bo'lmaguncha yechim pilotga kirmaydi.</p><h4>Tijorat taklifida so'raladi</h4><ul><li>Datchik va shlyuzning chastota varianti va sertifikati.</li><li>Batareya muddatining hisob sharti: interval va SF.</li><li>Shlyuzning MQTT sozlamasi va dekoderlari narxga kiradimi.</li></ul>",
    manba: [],
    ru: {
      yorliq: "Для руководства",
      sarlavha: "Milesight LoRaWAN: дешевле всех, но без видео",
      tana: "<p>На объекте много дверей и помещений, но постоянное видео не требуется: достаточно знать об открытии двери, влажности, температуре и дыме. Видео — только для подтверждения события.</p>" +
        "<h4>От чего зависит цена</h4><ul><li>Число датчиков: на каждую дверь и закрытое помещение. 3 млн — 4 датчика без камеры, 8 млн — 6 датчиков и одна 4G-камера.</li><li>Общий ли шлюз: при 5–10 объектах в районе доля шлюза меньше 1 млн.</li><li>Камера подтверждения — самая дорогая строка.</li></ul>" +
        "<h4>Какие объекты с баланса</h4><p>Склады (12), внутренние помещения производственных цехов (24), теплицы (6) — там главный риск связан с температурой и влажностью.</p>" +
        "<p class='ogoh'>До закупки решается вопрос с разрешением на частоту LoRaWAN. Пока разрешения нет, LoRaWAN в пилот не включаем.</p><h4>Что запросить в коммерческом предложении</h4><ul><li>Частотное исполнение и сертификат датчиков и шлюза.</li><li>Условия расчёта срока батареи: интервал и SF.</li><li>Входят ли в цену настройка MQTT и декодеры шлюза.</li></ul>"
    }
  },

  "s-narx.diapazon2": {
    yorliq: "Rahbariyat uchun",
    sarlavha: "Hikvision quyosh-4G: tashqi hovli uchun asosiy",
    tana: "<p>Kamera tashqarida turadi, yaqinda elektr va kabel yo'q, 4G qamrovi bor. Kabel tortilmaydi: kamera, panel va akkumulyator bitta ustunda.</p>" +
      "<h4>Narx nimaga bog'liq</h4><ul><li>Dekabrga yetadigan panel va akkumulyator. Zavod komplekti yozga hisoblangan, qishki komplekt qimmatroq.</li><li>Ustun yoki kronshteyn: devorga qo'yish arzon, alohida ustun narxni 1–2 mln oshiradi.</li><li>SD karta hajmi va 4G tarif.</li></ul>" +
      "<p>Kutishda kamera 80 mVt, ishda 1,85–7 Vt oladi. Shuning uchun u hodisaga yozadi, doimiy video bermaydi.</p>" +
      "<h4>Balansdan qaysi obyekt</h4><p>Chorvachilik fermalari (32), omborxonalar (12) va uzoqdagi sexlarning hovlisi. Bitta obyektga odatda 1–2 kamera.</p>" +
      "<p class='ogoh'>Akkumulyator faqat 0 °C dan yuqorida zaryadlanadi. Tender shartiga −20 °C da ishlash talabi yoziladi.</p><h4>Tijorat taklifida so'raladi</h4><ul><li>Dekabr uchun energiya hisobi: panel, akkumulyator, bulutli kunlar.</li><li>ISAPI va ONVIF qo'llanishi.</li></ul><p>Kamera 5–7 yil ishlaydi, obyekt esa bir yilda sotilishi kerak. Komplekt sotuvdan keyin yechib olinadi va keyingi obyektga o'tadi.</p>",
    manba: [],
    ru: {
      yorliq: "Для руководства",
      sarlavha: "Солнечная 4G-камера Hikvision: основа для двора",
      tana: "<p>Камера стоит снаружи, рядом нет ни электричества, ни кабеля, но есть покрытие 4G. Кабель не тянут: камера, панель и аккумулятор на одной опоре.</p>" +
        "<h4>От чего зависит цена</h4><ul><li>Панель и аккумулятор, которых хватит в декабре. Заводской комплект рассчитан на лето, зимний дороже.</li><li>Опора или кронштейн: на стену дешевле, отдельная опора добавляет 1–2 млн.</li><li>Объём SD-карты и тариф 4G.</li></ul>" +
        "<p>В ожидании камера потребляет 80 мВт, в работе 1,85–7 Вт. Поэтому она пишет по событию и не даёт постоянного видео.</p>" +
        "<h4>Какие объекты с баланса</h4><p>Животноводческие фермы (32), склады (12) и дворы удалённых цехов. На объект обычно 1–2 камеры.</p>" +
        "<p class='ogoh'>Аккумулятор заряжается только выше 0 °C. В условия тендера вносится работа при −20 °C.</p><h4>Что запросить в коммерческом предложении</h4><ul><li>Энергобаланс на декабрь: панель, аккумулятор, пасмурные дни.</li><li>Поддержка ISAPI и ONVIF.</li></ul><p>Камера работает 5–7 лет, а объект должен быть продан за год. После продажи комплект снимают и переносят на следующий объект.</p>"
    }
  },

  "s-narx.diapazon3": {
    yorliq: "Rahbariyat uchun",
    sarlavha: "Dahua quyosh-4G: katta hudud va perimetr",
    tana: "<p>Hudud katta, bir kamera uni yopmaydi, perimetr bo'ylab bir necha nuqta kerak. Hikvision variantidan qimmatroq, chunki komplekt kattaroq va ko'pincha burilma kamera bilan.</p>" +
      "<h4>Narx nimaga bog'liq</h4><ul><li>Kameralar soni va turi: statik yoki PTZ. PTZ ko'p quvvat oladi va katta panel talab qiladi.</li><li>Perimetrdagi ustunlar soni.</li><li>Qishki zaxira: akkumulyator 3–5 bulutli kunga hisoblanadi.</li></ul>" +
      "<h4>Balansdan qaysi obyekt</h4><p>Ishlab chiqarish sexlari (24) hududi, katta chorvachilik fermalari (32). Devori bor, lekin darvozasi ko'p yoki devori buzilgan obyektlar.</p>" +
      "<h4>Qaror</h4><p>Hudud bir gektardan katta va obyekt tez sotilmasa, bir nechta Dahua komplekti o'rniga ijaradagi minora (09) bilan solishtiriladi.</p><h4>Tijorat taklifida so'raladi</h4><ul><li>Har ustun uchun dekabr energiya hisobi.</li><li>PTZ tunda qancha quvvat olishi.</li><li>Hodisa API'si va ONVIF qo'llanishi.</li></ul><p>Perimetr bo'ylab 3–4 ustun qo'yilsa, narx oraliqning yuqori chegarasidan chiqadi. Bunday obyekt uchun smeta alohida tuziladi.</p>",
    manba: [],
    ru: {
      yorliq: "Для руководства",
      sarlavha: "Солнечная 4G-камера Dahua: большая территория",
      tana: "<p>Территория большая, одна камера её не закрывает, по периметру нужно несколько точек. Дороже варианта Hikvision: комплект больше и часто с поворотной камерой.</p>" +
        "<h4>От чего зависит цена</h4><ul><li>Число и тип камер: стационарные или PTZ. PTZ потребляет больше и требует большой панели.</li><li>Количество опор по периметру.</li><li>Зимний запас: аккумулятор считают на 3–5 пасмурных дней.</li></ul>" +
        "<h4>Какие объекты с баланса</h4><p>Территории производственных цехов (24), крупные животноводческие фермы (32). Объекты с забором, но множеством ворот или с разрушенным забором.</p>" +
        "<h4>Решение</h4><p>Если территория больше гектара, а объект быстро не продаётся, несколько комплектов Dahua сравнивают с арендованной вышкой (09).</p><h4>Что запросить в коммерческом предложении</h4><ul><li>Энергобаланс на декабрь для каждой опоры.</li><li>Потребление PTZ ночью.</li><li>API событий и поддержка ONVIF.</li></ul><p>Если по периметру нужно 3–4 опоры, цена выходит за верхнюю границу диапазона. Для такого объекта смету считают отдельно.</p>"
    }
  },

  "s-narx.diapazon4": {
    yorliq: "Rahbariyat uchun",
    sarlavha: "Ajax datchiklari: ichki xonalar va kirish nazorati",
    tana: "<p>Bino yopiq, qimmat ichki jihoz yoki ta'mir bor, xatar — eshik yoki derazadan kirish. Signalizatsiya kirishni aniqlaydi, MotionCam kabi datchik rasm bilan tasdiqlaydi.</p>" +
      "<h4>Narx nimaga bog'liq</h4><ul><li>Hub 2 (4G): 3,3–5,5 mln so'm, 100 tagacha qurilma. Narxning yarmi shu.</li><li>Eshik, harakat va tutun datchiklari soni.</li><li>Rasm bilan tasdiqlovchi datchik bor-yo'qligi.</li></ul>" +
      "<h4>Balansdan qaysi obyekt</h4><p>Ma'muriy binolar (62), savdo do'konlari (18), ko'p qavatli uydagi xonadonlar (18). Bu uch toifa balansdagi binolarning yarmidan ko'pi.</p>" +
      "<h4>Qaror</h4><p>Signal kelganda kim chiqishi hal qilinadi. Shartnoma bo'yicha qo'riqlashni faqat IIV huzuridagi Qo'riqlash departamenti qiladi (O'RQ-778). Signal ularning pultiga ham borishi kerak.</p><h4>Tijorat taklifida so'raladi</h4><ul><li>Hub va datchiklarning rasmiy kafolati va O'zbekistondagi servis.</li><li>Qo'riqlash departamenti pultiga ulanish imkoni.</li></ul><p>Datchiklar batareyada ishlaydi, hub esa o'z akkumulyatori bilan. Elektrsiz binoda hub uchun kichik zaxira manba kerak bo'ladi.</p>",
    manba: [],
    ru: {
      yorliq: "Для руководства",
      sarlavha: "Датчики Ajax: помещения и контроль входа",
      tana: "<p>Здание закрыто, внутри дорогое оборудование или ремонт, риск — проникновение через дверь или окно. Сигнализация фиксирует вход, датчик типа MotionCam подтверждает его снимком.</p>" +
        "<h4>От чего зависит цена</h4><ul><li>Hub 2 (4G): 3,3–5,5 млн сумов, до 100 устройств. Это половина цены.</li><li>Количество датчиков двери, движения и дыма.</li><li>Есть ли датчик с фотоподтверждением.</li></ul>" +
        "<h4>Какие объекты с баланса</h4><p>Административные здания (62), магазины (18), квартиры в многоэтажных домах (18). Эти три категории — больше половины зданий на балансе.</p>" +
        "<h4>Решение</h4><p>Нужно решить, кто выезжает по сигналу. Охрану по договору ведёт только Департамент охраны при МВД (O'RQ-778). Сигнал должен идти и на их пульт.</p><h4>Что запросить в коммерческом предложении</h4><ul><li>Официальная гарантия на хаб и датчики и сервис в Узбекистане.</li><li>Возможность вывода на пульт Департамента охраны.</li></ul><p>Датчики работают от батарей, хаб — от своего аккумулятора. В здании без электричества хабу нужен небольшой резервный источник.</p>"
    }
  },

  "s-narx.diapazon5": {
    yorliq: "Rahbariyat uchun",
    sarlavha: "Ko'chma stansiya: vaqtinchalik va qayta ishlatiladi",
    tana: "<p>Nazorat bir oydan kam kerak yoki doimiy yechim hali tanlanmagan. Stansiya obyektdan obyektga o'tadi, shuning uchun narx bir obyektga emas, pulga hisoblanadi.</p>" +
      "<h4>Narx nimaga bog'liq</h4><ul><li>Stansiya sig'imi: 1 kVt·soat pastki chegara, 4 kVt·soat yuqori chegara.</li><li>Kameralar soni: 2 yoki 4.</li><li>Almashtirish qatnovlari: 3–4 kunda bir marta, oyiga 1,2–2,4 mln. Bu raqam oraliqqa kirmaydi, lekin 2–3 oydan keyin asosiy xarajatga aylanadi.</li></ul>" +
      "<h4>Balansdan qaysi obyekt</h4><p>Yangi olingan har qanday bino birinchi haftalarda. Auksionga chiqqan ma'muriy bino, do'kon yoki turar joy (16). Sud jarayonidagi obyekt.</p>" +
      "<h4>Qaror</h4><p>Har viloyatga 5–10 komplektlik pul. Bir yilda u o'nlab obyektni qamraydi, bitta obyektga tushadigan narx 1–3 mln gacha kamayadi. Pul kimga biriktirilishi va almashtirishni kim qilishi buyruq bilan belgilanadi.</p>",
    manba: [],
    ru: {
      yorliq: "Для руководства",
      sarlavha: "Переносная станция: временно и многократно",
      tana: "<p>Контроль нужен меньше месяца или постоянное решение ещё не выбрано. Станция переходит с объекта на объект, поэтому цена считается не на объект, а на пул.</p>" +
        "<h4>От чего зависит цена</h4><ul><li>Ёмкость станции: 1 кВт·ч — нижняя граница, 4 кВт·ч — верхняя.</li><li>Количество камер: 2 или 4.</li><li>Выезды на замену: раз в 3–4 дня, 1,2–2,4 млн в месяц. В диапазон это не входит, но через 2–3 месяца становится главной статьёй.</li></ul>" +
        "<h4>Какие объекты с баланса</h4><p>Любое здание в первые недели после принятия. Административное здание, магазин или жильё (16), выставленные на аукцион. Объект в судебном процессе.</p>" +
        "<h4>Решение</h4><p>Пул из 5–10 комплектов на область. За год он охватывает десятки объектов, и цена на один объект падает до 1–3 млн. За кем закреплён пул и кто делает замену, определяет приказ.</p>"
    }
  },

  "s-narx.diapazon6": {
    yorliq: "Rahbariyat uchun",
    sarlavha: "Reolink va Home Hub: kichik bino, tez montaj",
    tana: "<p>Kichik bino yoki xonadon, 2–4 kamera yetadi, montaj bir kunda bo'lishi kerak. Kameralar batareyali, yozuv Home Hub'da joyida saqlanadi.</p>" +
      "<h4>Narx nimaga bog'liq</h4><ul><li>Kameralar soni va quyosh paneli qo'shilishi.</li><li>Home Hub turi va disk hajmi.</li><li>Internet: Wi-Fi bo'lmasa, 4G router qo'shiladi.</li></ul>" +
      "<h4>Cheklovlar</h4><ul><li>Batareyali kameralar −10 °C gacha ishlaydi. Qishda kamera bino ichiga qo'yiladi yoki boshqa yechim tanlanadi.</li><li>Hub orqali RTSP sessiyasi taxminan 5 daqiqa: bu doimiy kuzatuv emas, hodisa nazorati.</li></ul>" +
      "<h4>Balansdan qaysi obyekt</h4><p>Turar joylar (16), ko'p qavatli uydagi xonadonlar (18), kichik savdo do'konlari (18).</p><h4>Qaror</h4><p>Qishki cheklov sabab bu yechim asosan bino ichidagi kameralar uchun. Tashqi hovli kerak bo'lsa, quyosh-4G kamera (02) qo'shiladi.</p><p>Oraliq ichida narxni asosan kameralar soni belgilaydi: 8 mln — ikki kamera va Hub, 12 mln — to'rt kamera, panel va 4G router.</p>",
    manba: [],
    ru: {
      yorliq: "Для руководства",
      sarlavha: "Reolink и Home Hub: малое здание, быстрый монтаж",
      tana: "<p>Небольшое здание или квартира, хватает 2–4 камер, монтаж нужен за день. Камеры на батареях, запись хранится на месте в Home Hub.</p>" +
        "<h4>От чего зависит цена</h4><ul><li>Число камер и добавлены ли солнечные панели.</li><li>Модель Home Hub и объём диска.</li><li>Интернет: если нет Wi-Fi, добавляется 4G-роутер.</li></ul>" +
        "<h4>Ограничения</h4><ul><li>Батарейные камеры работают до −10 °C. Зимой камеру ставят внутри здания или выбирают другое решение.</li><li>RTSP-сессия через Hub — около 5 минут: это контроль по событиям, а не постоянное наблюдение.</li></ul>" +
        "<h4>Какие объекты с баланса</h4><p>Жильё (16), квартиры в многоэтажных домах (18), небольшие магазины (18).</p><h4>Решение</h4><p>Из-за зимнего ограничения это решение в основном для камер внутри здания. Если нужен двор, добавляют солнечную 4G-камеру (02).</p><p>Внутри диапазона цену в основном задаёт число камер: 8 млн — две камеры и Hub, 12 млн — четыре камеры, панели и 4G-роутер.</p>"
    }
  },

  "s-narx.diapazon7": {
    yorliq: "Rahbariyat uchun",
    sarlavha: "LiFePO4 shkafi: doimiy video, haftalik almashtirish",
    tana: "<p>Obyektga doimiy kamera va NVR kerak, obyekt bir necha oy balansda turadi, quyosh paneli qo'yish imkoni yo'q yoki qishda yetmaydi. Akkumulyator bloki bazada zaryadlanib, davriy almashtiriladi.</p>" +
      "<h4>Narx nimaga bog'liq</h4><ul><li>Sig'im: 30 Vt yukda 5 kVt·soatlik shkaf taxminan 6 kun yetadi. Sig'im ikki barobar bo'lsa, almashtirish ikki barobar kam.</li><li>Past harorat himoyali BMS va isitgich — majburiy qator.</li><li>Kameralar soni va NVR.</li></ul>" +
      "<h4>Balansdan qaysi obyekt</h4><p>Ma'muriy binolar (62) va ishlab chiqarish sexlari (24), ayniqsa ichida jihoz qolgan va sotuv bir necha oy davom etadiganlari.</p>" +
      "<h4>Qaror</h4><p>Obyektni elektrga qayta ulash (39 600 so'm, uch ish kuni) mumkin bo'lsa, shkaf o'rniga shu yo'l tanlanadi: 40–60 Vt tugun oyiga taxminan 38 500 so'mlik elektr sarflaydi.</p><h4>Tijorat taklifida so'raladi</h4><ul><li>BMS'ning past harorat himoyasi hujjat bilan.</li><li>Almashtiriladigan blok og'irligi: bir kishi ko'tara oladimi.</li></ul>",
    manba: [],
    ru: {
      yorliq: "Для руководства",
      sarlavha: "Шкаф LiFePO4: постоянное видео, замена раз в неделю",
      tana: "<p>Объекту нужны постоянные камеры и NVR, он несколько месяцев на балансе, а солнечную панель поставить нельзя или зимой её не хватает. Аккумуляторный блок заряжается на базе и периодически меняется.</p>" +
        "<h4>От чего зависит цена</h4><ul><li>Ёмкость: при нагрузке 30 Вт шкафа на 5 кВт·ч хватает примерно на 6 дней. Вдвое больше ёмкость — вдвое реже замена.</li><li>BMS с защитой от холода и подогрев — обязательная строка.</li><li>Число камер и NVR.</li></ul>" +
        "<h4>Какие объекты с баланса</h4><p>Административные здания (62) и производственные цеха (24), особенно с оставшимся оборудованием и продажей на несколько месяцев.</p>" +
        "<h4>Решение</h4><p>Если объект можно повторно подключить к сети (39 600 сумов, три рабочих дня), выбирают этот путь вместо шкафа: узел на 40–60 Вт потребляет электричества примерно на 38 500 сумов в месяц.</p><h4>Что запросить в коммерческом предложении</h4><ul><li>Документ о защите BMS от низкой температуры.</li><li>Вес сменного блока: поднимет ли его один человек.</li></ul>"
    }
  },

  "s-narx.diapazon8": {
    yorliq: "Rahbariyat uchun",
    sarlavha: "Klaster shkafi: qo'shni obyektlar guruhi",
    tana: "<p>Bir hududda 3–10 obyekt yonma-yon turadi va ular orasida to'g'ridan-to'g'ri ko'rinish bor. Router, NVR va SIM har obyektda emas, bitta shkafda.</p>" +
      "<h4>Narx nimaga bog'liq</h4><ul><li>Obyektlar soni: 20 mln — 3 obyekt, 40 mln — 10 obyekt.</li><li>Masofa: 100 m gacha kabel, undan uzoqqa radio va obyektda kichik akkumulyator.</li><li>Shkaf sig'imi: hamma obyekt kameralari bitta akkumulyatordan oziqlanadi.</li></ul>" +
      "<div class='raqamlar'><div><b>2–4 mln</b><span>obyektga, 10 ta bo'lsa</span></div><div><b>7–13 mln</b><span>obyektga, 3 ta bo'lsa</span></div></div>" +
      "<h4>Balansdan qaysi obyekt</h4><p>Bir sanoat zonasidagi sexlar, bir massivdagi omborlar, bir tumandagi fermalar.</p>" +
      "<h4>Qaror</h4><p>Shkaf eng oxirida sotiladigan obyektga qo'yiladi. Birinchi sotilgan obyektning jihozi qolganlariga xalaqit bermasligi kerak.</p><h4>Tijorat taklifida so'raladi</h4><ul><li>Har radio aloqa uchun ko'rinish va signal hisobi.</li><li>Shkafning dekabr energiya hisobi.</li></ul><p>Uch obyektda klaster alohida shkaflardan sezilarli arzon emas, foyda beshtadan boshlanadi.</p>",
    manba: [],
    ru: {
      yorliq: "Для руководства",
      sarlavha: "Кластерный шкаф: группа соседних объектов",
      tana: "<p>На одной территории рядом стоят 3–10 объектов, между ними есть прямая видимость. Роутер, NVR и SIM не на каждом объекте, а в одном шкафу.</p>" +
        "<h4>От чего зависит цена</h4><ul><li>Число объектов: 20 млн — 3 объекта, 40 млн — 10.</li><li>Расстояние: до 100 м — кабель, дальше — радио и небольшой аккумулятор на объекте.</li><li>Ёмкость шкафа: камеры всех объектов питаются от одного аккумулятора.</li></ul>" +
        "<div class='raqamlar'><div><b>2–4 млн</b><span>на объект при 10</span></div><div><b>7–13 млн</b><span>на объект при 3</span></div></div>" +
        "<h4>Какие объекты с баланса</h4><p>Цеха в одной промзоне, склады в одном массиве, фермы в одном районе.</p>" +
        "<h4>Решение</h4><p>Шкаф ставят на объект, который продадут последним. Оборудование первого проданного объекта не должно мешать остальным.</p><h4>Что запросить в коммерческом предложении</h4><ul><li>Расчёт видимости и уровня сигнала для каждого радиолинка.</li><li>Энергобаланс шкафа на декабрь.</li></ul><p>На трёх объектах кластер заметно не дешевле отдельных шкафов, выгода начинается с пяти.</p>"
    }
  },

  "s-narx.diapazon9": {
    yorliq: "Rahbariyat uchun",
    sarlavha: "EFOY yoqilg'i elementi: eng qimmat, istisno holat",
    tana: "<p>To'rt shart birga bajarilishi kerak: elektrga qayta ulash imkonsiz, quyosh qishda yetmaydi, obyekt uzoqda va aktiv qiymati yuqori.</p>" +
      "<h4>Narx nimaga bog'liq</h4><ul><li>Element modeli: 42, 82 yoki 125 Vt.</li><li>Kartrijlar soni va Fuel Manager: qatnovlar orasidagi vaqt shunga bog'liq.</li><li>Yoqilg'i: M28 kartrij taxminan 4 mln so'm. 30 Vt yil bo'yi element bilan ishlasa, oyiga 2,8 mln.</li></ul>" +
      "<p class='ogoh'>EFOY Pro 2800 Yevropada 9 800 yevro atrofida, ulgurji narxda ham 5 600 yevro atrofida. Jihoz bilan bir obyektga taxminan 80–170 mln so'm chiqadi. Yakuniy raqam tijorat taklifidan olinadi.</p>" +
      "<h4>Balansdan qaysi obyekt</h4><p>Chekkadagi ishlab chiqarish sexi yoki uzoq ferma, ichida qimmat uskuna bilan. Bunday obyektlar balansda bir nechta, ommaviy yechim emas.</p><h4>Tijorat taklifida so'raladi</h4><ul><li>Kafolatli ishlash soati va servis narxi.</li><li>Kartrij yetkazish muddati va xavfli yuk logistikasi.</li></ul>",
    manba: [["Seashop: EFOY Pro 2800", "https://www.seashop.com/en/efoy-pro-2800-fuel-cell"], ["EFOY kartrijlari", "https://www.efoy-pro.com/en/efoy/fuel-cartridges/"]],
    ru: {
      yorliq: "Для руководства",
      sarlavha: "Топливный элемент EFOY: дорого и в виде исключения",
      tana: "<p>Нужны сразу четыре условия: подключить к сети нельзя, зимой не хватает солнца, объект далеко, актив ценный.</p>" +
        "<h4>От чего зависит цена</h4><ul><li>Модель элемента: 42, 82 или 125 Вт.</li><li>Количество картриджей и Fuel Manager: от этого зависит интервал между выездами.</li><li>Топливо: картридж M28 около 4 млн сумов. Если нагрузка 30 Вт круглый год идёт от элемента, это 2,8 млн в месяц.</li></ul>" +
        "<p class='ogoh'>EFOY Pro 2800 в Европе стоит около 9 800 евро, даже оптом — около 5 600 евро. С оборудованием выходит примерно 80–170 млн сумов на объект. Окончательную цифру даст коммерческое предложение.</p>" +
        "<h4>Какие объекты с баланса</h4><p>Удалённый производственный цех или дальняя ферма с дорогим оборудованием внутри. Таких объектов на балансе единицы, это не массовое решение.</p><h4>Что запросить в коммерческом предложении</h4><ul><li>Гарантированный ресурс в часах и цена сервиса.</li><li>Сроки поставки картриджей и логистика опасного груза.</li></ul>"
    }
  },

  "s-narx.diapazon10": {
    yorliq: "Rahbariyat uchun",
    sarlavha: "Mobil minora: ijara yoki bank puli",
    tana: "<p>Ochiq maydon bir gektardan katta, devor yoki darvoza yo'q, yoki obyektda o'g'irlik urinishi bo'lgan. Minora bir kunda qo'yiladi va obyekt sotilgach keyingisiga ketadi.</p>" +
      "<h4>Narx nimaga bog'liq</h4><ul><li>Mahalliy yig'ilgan machta — 40 mln atrofida, import tirkama — 120 mln gacha.</li><li>Panel va akkumulyator dekabrga hisoblanganmi.</li><li>PTZ va kameralar soni, sirena, 5G.</li></ul>" +
      "<h4>Balansdan qaysi obyekt</h4><p>Ishlab chiqarish sexlari (24) va chorvachilik fermalari (32) hududlari, maxsus texnika to'plangan maydon.</p>" +
      "<h4>Qaror</h4><p>Obyekt bir yilda sotilishi kerak (MB 2696-son nizomi, 20-band). Shuning uchun minora obyektga emas, bankning 2–4 minoralik puliga yoki ijaraga olinadi. Ijara foydali bo'ladigan chegara: oylik ijara × oylar &lt; xarid − qoldiq qiymati.</p><h4>Tijorat taklifida so'raladi</h4><ul><li>Oylik ijara va minimal muddat.</li><li>Ko'chirish xizmati narxi.</li><li>Dekabr energiya hisobi.</li></ul><p>Minoraning o'zi ham sug'urtalanadi va GPS bilan kuzatiladi.</p>",
    manba: [],
    ru: {
      yorliq: "Для руководства",
      sarlavha: "Мобильная вышка: аренда или пул банка",
      tana: "<p>Открытая площадка больше гектара, нет забора или ворот, или на объекте была попытка кражи. Вышку ставят за день, после продажи объекта она уезжает на следующий.</p>" +
        "<h4>От чего зависит цена</h4><ul><li>Мачта местной сборки — около 40 млн, импортный прицеп — до 120 млн.</li><li>Рассчитаны ли панели и аккумулятор на декабрь.</li><li>Количество PTZ и камер, сирена, 5G.</li></ul>" +
        "<h4>Какие объекты с баланса</h4><p>Территории производственных цехов (24) и животноводческих ферм (32), площадки со спецтехникой.</p>" +
        "<h4>Решение</h4><p>Объект должен быть продан за год (Положение ЦБ № 2696, п. 20). Поэтому вышку берут не под объект, а в собственный пул банка из 2–4 вышек или в аренду. Аренда выгодна, пока: аренда в месяц × месяцы &lt; покупка − остаточная стоимость.</p><h4>Что запросить в коммерческом предложении</h4><ul><li>Месячная аренда и минимальный срок.</li><li>Стоимость перевозки.</li><li>Энергобаланс на декабрь.</li></ul><p>Саму вышку страхуют и отслеживают по GPS.</p>"
    }
  }
});
