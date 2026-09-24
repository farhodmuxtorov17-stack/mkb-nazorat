# Контракт серверного API
## Система управления активами на балансе «Микрокредитбанк»

Версия 0.5 · Редакция от 21.09.2026

---

## 1. Назначение

Документ описывает интерфейс между клиентом и сервером данных: методы, формат
ответов, аутентификацию, проверку записей, состав коллекций и работу без
сервера. Разделы 2–11 описывают реализованное поведение `server/server.js` и
`yadro/api.js`. Раздел 12 — требования к промышленному контуру, которые
предстоит выполнить при переносе в сеть банка.

### 1.1 Режимы клиента

Страницы не обращаются к сети напрямую: единственная точка доступа —
`MKBapi` из `yadro/api.js`.

| Режим | Условие | Источник данных |
|---|---|---|
| `server` | `GET /api/salomat` ответил `{"holat":"ok"}` быстрее 700 мс и поддерживает текущий источник | REST-хранилище сервера |
| `snapshot` | ответа нет, ошибка или превышено ожидание | `window.MKB_DATA` + слой правок в браузере |

Режим доступен через промис `MKBapi.tayyor`, метод `MKBapi.rejim()` и событие
`mkb:rejim` на `document`.

### 1.2 Источники данных

Независимо от режима существует два источника (`MKBapi.manba()`,
`MKB_DATA.MANBA`): `shartli` — демонстрационные данные и `mahalliy` —
фактический реестр из `mahalliy/obyektlar.json`, доступный только с адреса
самого компьютера. Правки, журнал и файлы двух источников хранятся раздельно.

---

## 2. Общие соглашения

| Параметр | Значение |
|---|---|
| Базовый путь | `/api` |
| Формат | `application/json; charset=utf-8`, ответы с `Cache-Control: no-store` |
| Идентификаторы | строки: `AK-2026/4471` (актив), `UI-2026/0412` (дело взыскания), `LOT-…`, `TK-…`, `SH-…`; «/» в сегменте пути кодируется как `%2F` |
| Даты | `ДД.ММ.ГГГГ`, время — `ДД.ММ.ГГГГ ЧЧ:ММ` |
| Суммы | число в миллионах сумов; форматирует клиент |
| Размер тела | JSON — до 4 МБ, файл — до 20 МБ |

Запуск: `node server/server.js`. Переменные окружения: `PORT` (по умолчанию
8790), `MKB_HOST` (по умолчанию `127.0.0.1`), `MKB_PAROL` (начальный пароль
учётных записей из исходных данных; если не задан — создаётся случайный и
печатается в консоль один раз), `MKB_BUGUN` (фиксированная дата для проверок).

Статика: «/» отдаёт `kirish.html`, отсутствующий файл — `xato-404.html` с
кодом 404. Пути `/server/` и скрытые файлы не отдаются. Путь `/mahalliy/`
отдаётся только запросам с `127.0.0.1` или `::1`, остальным — 404.

### 2.1 Хранилище

Для каждого источника каталог `server/malumotlar/<источник>/`:

| Файл | Содержание |
|---|---|
| `ozgarishlar.json` | слой правок `{коллекция: {id: правка}}`; `{"__yangi": {...}}` — новая запись, признак `__ochirilgan` — удалённая |
| `versiya.json` | отпечаток модулей данных; при изменении модели несовместимые поля и оборванные правки отбрасываются |
| `amallar.json` | журнал действий, последние 5000 записей |
| `parollar.json` | хеши паролей (scrypt с солью) |
| `fayllar/` | загруженные файлы |

Исходные данные при каждом запуске строятся из модулей `malumot*.js` в
изолированном контексте, затем поверх накладывается слой правок. Вычисляемые
показатели (сроки, резерв, индекс контроля, сводки) не хранятся и считаются
на клиенте.

---

## 3. Аутентификация и сессии

```
POST /api/kirish    {login, parol, manba?}  → {token, id, login, ism, rol, filial, filialKod, manba, tugash}
POST /api/chiqish                           → {holat: "ok"}
POST /api/parol     {eski, yangi}           → {holat: "ok"}
GET  /api/salomat                           → {holat: "ok", vaqt, manbalar}
```

- **А-1.** Роль берётся только из учётной записи; поле `rol` в теле входа
  игнорируется. Роль вне перечня (раздел 4) — 403.
- **А-2.** Неизвестный логин, отключённая или удалённая учётная запись и
  неверный пароль дают одинаковый ответ 401; отказ пишется в журнал.
- **А-3.** Пять неудачных попыток подряд блокируют логин на 15 минут (429).
- **А-4.** Токен — 24 случайных байта в шестнадцатеричной записи. Сессия
  живёт 8 часов и хранится в памяти процесса. Токен передаётся заголовком
  `X-Sessiya` или cookie `mkb_s` (`HttpOnly; SameSite=Strict`).
- **А-5.** Вход в источник `mahalliy` разрешён только с адреса компьютера
  (иначе 403).
- **А-6.** Получив 401, клиент очищает сессию и открывает `kirish.html`.
- **А-7.** Новый пароль — не менее 8 символов. В режиме `snapshot` пароль не
  меняется: все учётные записи входят с демонстрационным паролем.

---

## 4. Разграничение доступа

Роли: `Administrator`, `Rahbariyat`, `Filial rahbari`, `Obyekt menejeri`,
`Ko'rik va xavfsizlik inspektori`, `Baholovchi`, `Realizatsiya mutaxassisi`,
`Yurist`, `Buxgalteriya va risk`, `Xavfsizlik xizmati`. Разделы: `panel`,
`aktivlar`, `himoya`, `korik`, `qiymat`, `realizatsiya`, `yuridik`, `hisobot`,
`vazifa`, `sozlama`.

Клиентская матрица (`ROL_RUXSAT` в `yadro/app.js`) строит меню и скрывает
кнопки; решение принимает сервер (`ROL_BOLIMLAR`): для каждой роли — список
разделов на чтение и на запись. Каждая коллекция отнесена к разделу:

| Раздел | Коллекции |
|---|---|
| `aktivlar` | `yozuvlar`, `hujjatlar`, `fayllar`, `arxiv`, `xarajatlar`, `hududlar` |
| `korik` | `koriklar`, `inventar`, `inventarizatsiyalar` |
| `qiymat` | `baholashlar`, `sugurtalar` (`polislar`), `sugurta_davolari`, `soliq`, `zaxira_tarix` |
| `hisobot` | `mb_hisobotlar`, `hisobotlar` |
| `realizatsiya` | `lotlar` (`sotuv`), `takliflar`, `xaridorlar`, `shartnomalar`, `ijara`, `paketlar` |
| `yuridik` | `undiruv_ishlar`, `sud_majlislar`, `advokatlar`, `restrukturizatsiya`, `muloqotlar` |
| `himoya` | `hodisalar`, `qoriqlash`, `kommunal_arizalar`, `qurilma_katalog`, `himoya_andozalari`, `shaxslar`, `kirish_nuqtalari`, `qurilmalar`, `kirish_voqealari`, `ruxsatlar`, `kirish_sorovlari`, `tashriflar`, `xavfsizlik_hodisalari`, `masofaviy_sessiyalar`, `xizmat_ishlari` |
| `vazifa` | `tasdiqlar`, `mening_vazifalarim` (`vazifalar`), `bildirishlar` |
| `sozlama` | `foydlar`, `filiallar`, `parametrlar`, `bayramlar`, `qoidalar`, `integratsiyalar` |

В скобках — псевдонимы. Дополнительные правила:

- **Р-1.** Закрытый раздел — 403 `bu bo'lim rolingizga yopiq` до чтения
  хранилища.
- **Р-2.** `parametrlar` изменяют администратор и «Buxgalteriya va risk».
- **Р-3.** «Xavfsizlik xizmati» может создать страховую претензию и читать
  полисы, хотя раздел `qiymat` ему закрыт.
- **Р-4.** `foydlar` изменяет только администратор; пароль в ответах не
  возвращается.
- **Р-5.** «Filial rahbari» изменяет только записи своего филиала: для
  активов и дел — по `filialKod`, для остальных — по активу из `obyektId`
  или `aktivId`. Чужой филиал — 403 `boshqa filial obyekti`.
- **Р-6.** Коллекции `hududlar`, `hisobotlar`, `qurilma_katalog`,
  `himoya_andozalari` только для чтения (405 на запись).

---

## 5. Методы

| Метод | Путь | Доступ | Результат |
|---|---|---|---|
| GET | `/api/salomat` | без сессии | доступность и список источников |
| POST | `/api/kirish` | без сессии | сессия |
| POST | `/api/chiqish` | сессия | завершение сессии |
| POST | `/api/parol` | сессия | смена собственного пароля |
| GET | `/api/amallar` | администратор | журнал действий |
| POST | `/api/amallar/tizim` | сессия | одна сводная запись движка правил: `{hisob: {КОЛЛЕКЦИЯ: число}}` |
| GET | `/api/ozgarishlar` | сессия | слой правок по доступным роли коллекциям |
| GET | `/api/{коллекция}` | раздел: чтение | массив записей без удалённых |
| GET | `/api/{коллекция}/{id}` | раздел: чтение | запись; 404, если нет или удалена |
| POST | `/api/{коллекция}` | раздел: запись | 201, созданная запись |
| PATCH | `/api/{коллекция}/{id}` | раздел: запись | обновлённая запись |
| DELETE | `/api/{коллекция}/{id}` | раздел: запись | `{id, ochirildi: true}` |
| POST | `/api/{коллекция}/{id}/tiklash` | администратор | восстановление удалённой записи |
| POST | `/api/fayllar/yukla` | раздел `aktivlar`: запись | 201, запись `FAYLLAR` |
| GET | `/api/fayllar/{id}/xom` | раздел `aktivlar`: чтение | содержимое файла |

Прочие методы — 405, неизвестная коллекция — 404.

### 5.1 Выборка

`GET /api/koriklar?holat=rejada&obyektId=AK-2026%2F4471` — фильтр по
равенству строкового значения поля, `q=` — поиск подстроки по всей записи,
параметры соединяются по «и». Администратор может запросить удалённые записи
параметром `ochirilgan=1`. Постраничной выдачи нет.

### 5.2 Создание и изменение

- Если `id` не передан, сервер формирует его из префикса коллекции (`BM`,
  `FL`, `LOT`, `TK`, `SH`, `UI`, `HD`, `KR`, `TS` или первые две буквы имени) и
  отметки времени. Занятый `id` — 409.
- Вложенные объекты (`balans`, `qiymat`, `huquq` и т. п.) сливаются на один
  уровень, массивы заменяются целиком. `id` в теле PATCH игнорируется.
- PATCH без фактических изменений не сохраняется и в журнал не попадает.

### 5.3 Проверка записи

Одинаковые правила применяют сервер и `api.js` (в режиме `snapshot`):

- поле должно входить в схему коллекции `MKB_DATA.SXEMA` (или в
  `QOSHIMCHA_MAYDONLAR`); иначе 400 `noma'lum maydon: <поле>`;
- тип значения совпадает с типом поля в исходных данных; нечисловые и
  бесконечные числа отклоняются;
- поля `sana`, `boshlanish`, `tugash` и `…Sana` должны читаться как дата;
- путь `assets/obyekt/` отклоняется (выведенные чертежи);
- `YOZUVLAR`: статус из `HOLATLAR`, этап из `BOSQICHLAR`, `balans.qiymat` —
  положительное число, `balans.sana` — дата; новая запись требует названия,
  даты и стоимости постановки на баланс;
- поля, начинающиеся с `__`, записывать нельзя.

### 5.4 Удаление

Удаление мягкое: запись получает `__ochirilgan`, `ochirilganSana`, `ochirgan`
и исчезает из выдачи. Администратор восстанавливает её методом `tiklash`.
Нельзя удалить собственную учётную запись; удаление учётной записи закрывает
её сессии.

### 5.5 Файлы

`POST /api/fayllar/yukla` принимает тело файла; тип — из `Content-Type`
(JPEG, PNG, WEBP, GIF, PDF, DOC/DOCX, XLS/XLSX, TXT, CSV), имя — заголовок
`X-Fayl-Nom`, привязка — `X-ObyektId`, `X-Kolleksiya`, `X-YozuvId`. Ответ —
запись `FAYLLAR` с путём `api/fayllar/<id>/xom`. Изображения и PDF отдаются
для просмотра, остальное — вложением; `?yuklab=1` — всегда вложением.
В режиме `snapshot` файлы хранятся в IndexedDB браузера (`MKBapi.fayl`).

Фото актива записываются в `rasmlar[] {yol, tur}`; основное фото — `rasm` и
`rasmKichik`, источник — `rasmManba`, признак общего фото для нескольких
объектов — `rasmUmumiy`.

---

## 6. Коды ответов

Ошибка — объект `{"xato": "<текст>"}`.

| HTTP | Когда |
|---|---|
| 200 / 201 | успешное чтение, изменение / создание |
| 400 | неверное тело, неизвестное поле, неверный тип или дата, нарушено правило записи |
| 401 | нет сессии или истёк срок; неверный логин или пароль |
| 403 | раздел закрыт роли, чужой филиал, действие только для администратора, вход в `mahalliy` не с компьютера |
| 404 | нет коллекции, записи или файла |
| 405 | метод не поддержан или коллекция только для чтения |
| 409 | занятый `id` или логин |
| 413 / 415 | файл больше 20 МБ / тип файла не принимается |
| 429 | логин временно заблокирован |

---

## 7. Журнал действий

`GET /api/amallar` (администратор) возвращает записи от новых к старым:
`id`, `vaqt` (`ДД.ММ.ГГГГ ЧЧ:ММ`), `kim`, `rol`, `kolleksiya` (для входа —
`SESSIYA`), `obyektId`, `turi` (`kirish`, `chiqish`, `kirish rad etildi`,
`yaratish`, `yangilash`, `o'chirish`, `tiklash`, `fayl yuklash`,
`parol almashtirildi`), `tafsilot` (имена полей), `ozgarish` (старое и новое
значение каждого поля). Автоматические записи движка правил в коллекции
уведомлений, задач, срезов резерва и отчётов ЦБ не пишутся по одной:
клиент отправляет одну сводку `POST /api/amallar/tizim`.

В режиме `snapshot` журнал ведётся в браузере (ключ `mkb4-amallar`, 400
последних записей) и читается `MKBapi.amallar()`.

---

## 8. Работа без сервера

Слой правок хранится в `localStorage` под ключом `mkb4-ozgarishlar`
(для локального реестра — `mkb4-ozgarishlar-mahalliy`) в том же формате, что и
`ozgarishlar.json`. При загрузке страницы слой накладывается на
`MKB_DATA`, поэтому экраны и производные показатели видят правки.

| Метод `MKBapi` | Режим `server` | Режим `snapshot` |
|---|---|---|
| `royxat(коллекция, фильтр)` | `GET` с параметрами | массив со слоем правок |
| `bitta(коллекция, id)` | `GET /…/{id}` | поиск по `id` |
| `yangi(коллекция, объект, opts)` | `POST` | запись в слой |
| `yangilash(коллекция, id, патч, opts)` | `PATCH` | наложение в слое |
| `ochir(коллекция, id)` / `tiklash(коллекция, id)` | `DELETE` / `POST …/tiklash` | признак в слое |
| `fayl.saqla(файл, meta)` / `fayl.ol(id)` | `POST /api/fayllar/yukla` / `GET …/xom` | IndexedDB |
| `kirish(login, parol)` / `chiqish()` / `sessiya()` | сервер | учётная запись из `FOYDLAR`, демонстрационный пароль |
| `parolAlmashtir(eski, yangi)` | `POST /api/parol` | недоступно |
| `amallar()` / `tizimQayd(hisob)` | сервер | браузер |

Имя коллекции передаётся в верхнем регистре; псевдонимы `POLISLAR`, `SOTUV`,
`VAZIFALAR` приводятся к основным именам.

---

## 9. Коллекции

### 9.1 Активы на балансе

**`YOZUVLAR`** — актив. Поля: `id`, `nom`, `qisqa`, `tur`, `turKalit`,
`rasmTuri`, `binoli`, `hudud`, `hududKod`, `hududToliq`, `tuman`, `manzil`,
`joy`, `filial`, `filialKod`, `sobiqEga`, `tafsilot`, `holat`, `bosqich`,
`masul`, `balans`, `qiymat`, `maydon`, `huquq`, `kommunal`, `himoya`, `sotuv`,
`konservatsiya`, `rasm`, `rasmKichik`, `rasmlar`, `rasmManba`, `rasmUmumiy`,
`tarix`, `izoh`, `qabul`. Состав вложенных групп — `docs/ARXITEKTURA.md`,
раздел 3.3. Полей кредита в активе нет.

| Коллекция | Поля |
|---|---|
| `ARXIV` | `id`, `obyektId`, `nom`, `tur`, `rasmTuri`, `hudud`, `filial`, `balansSana`, `balansQiymat`, `sotuvSana`, `sotuvNarxi`, `sotishUsuli`, `xaridor`, `jamiXarajat`, `tiklanganZaxira`, `foydaZarar`, `shartnomaId`, `lotId`, `turganKun` |
| `HUJJATLAR` | `id`, `obyektId`, `nom`, `tur`, `bosqich`, `raqam`, `sana`, `amalQilishTugash`, `holat`, `format`, `hajm`, `yuklagan`, `faylId` |
| `FAYLLAR` | `id`, `obyektId`, `kolleksiya`, `yozuvId`, `nom`, `tur`, `hajm`, `yuklangan`, `yuklagan`, `yol` |
| `XARAJATLAR` | `id`, `obyektId`, `toifa`, `summa`, `davr`, `sana`, `kontragent`, `hisobFaktura`, `tasdiqlovchi`, `holat` |

### 9.2 Осмотры, стоимость, налоги

| Коллекция | Поля |
|---|---|
| `KORIKLAR` | `id`, `obyektId`, `korikTuri`, `tur`, `sana`, `holat`, `inspektor`, `holatBall`, `chekList`, `kamchiliklar`, `xarajatTaklifi`, `keyingiKorikSana`, `xulosa` |
| `INVENTAR` | `id`, `obyektId`, `inventarRaqam`, `qrKod`, `nom`, `marka`, `model`, `yil`, `vin`, `motosoatYokiKm`, `butlik`, `butlikIzoh`, `akkumulyator`, `kalit`, `saqlashJoyi`, `holatBall`, `oxirgiSanash` |
| `INVENTARIZATSIYALAR` | `id`, `sana`, `turi`, `komissiya`, `obyektlar`, `natijalar`, `kamomad`, `ortiqcha`, `holat` |
| `BAHOLASHLAR` | `id`, `obyektId`, `sana`, `hisobotRaqami`, `bozorQiymati`, `tugatishQiymati`, `avvalgi`, `baholovchi`, `litsenziya`, `usul`, `amalQilishTugash`, `holat` |
| `SUGURTALAR` | `id`, `obyektId`, `polis`, `polisTuri`, `kompaniya`, `summa`, `mukofot`, `boshlanish`, `tugash`, `holat` |
| `SUGURTA_DAVOLARI` | `id`, `polisId`, `hodisaId`, `obyektId`, `sana`, `summa`, `holat` |
| `SOLIQ` | `id`, `obyektId`, `davr`, `baza`, `stavka`, `summa`, `imtiyoz`, `yerSoligi`, `holat` |
| `ZAXIRA_TARIX` | `id`, `davr`, `obyektId`, `toifa`, `foiz`, `summa` — ежемесячные срезы резерва |
| `MB_HISOBOTLAR` | `id`, `davr`, `muddat`, `topshirilganSana`, `obyektlarSoni`, `jamiBalansQiymat`, `kapital1Daraja`, `kapitalgaNisbat`, `umidsizSoni`, `holat` |

### 9.3 Реализация

| Коллекция | Поля |
|---|---|
| `LOTLAR` | `id`, `obyektId`, `eauksionLotRaqami`, `sotishUsuli`, `elonSana`, `savdoSana`, `boshlangichNarx`, `minimalNarx`, `zakalatFoiz`, `qadamFoiz`, `pasaytirishlar`, `keyingiPasaytirishSana`, `holat`, `golib`, `yakuniyNarx`, `bayonnomaSana`, `ishtirokchilarSoni`, `takroriySavdoSana`, `tolovMuddati`, `shartnomaMuddati`, `paketId`, `qarorRaqami` |
| `TAKLIFLAR` | `id`, `obyektId`, `lotId`, `xaridor`, `xaridorTuri`, `stirYokiPinfl`, `summa`, `tolovSharti`, `sana`, `amlNatija`, `affillanganlik`, `qarorRaqami`, `holat` |
| `SHARTNOMALAR` | `id`, `lotId`, `taklifId`, `obyektId`, `xaridor`, `narx`, `avans`, `sotishUsuli`, `sana`, `jadval`, `taqiqHolati`, `holat` |
| `IJARA` | `id`, `obyektId`, `ijarachi`, `maydon`, `oylikIjara`, `boshlanish`, `tugash`, `depozit`, `kommunalKimTolaydi`, `sotuvdaBekorQilishSharti`, `tolovlar`, `holat` |
| `PAKETLAR` | `id`, `nom`, `tarkib`, `investKompaniya`, `holat` |
| `XARIDORLAR` | покупатели, на которых ссылаются предложения |

### 9.4 Взыскание и суд

| Коллекция | Поля |
|---|---|
| `UNDIRUV_ISHLAR` | `id`, `holat` (`faol`, `yopilgan`), `bosqich`, `qarzdor`, `shartnoma`, `qarz`, `garov`, `filial`, `filialKod`, `masul`, `advokatId`, `sud`, `qaror`, `ijro`, `muddat`, `tarix`, `hujjatlar`, `aktivId`, `yopilganSana` |
| `SUD_MAJLISLAR` | `id`, `ishId`, `sud`, `sana`, `soat`, `zal`, `advokatId`, `advokat`, `mavzu`, `holat`, `natija` |
| `ADVOKATLAR` | `id`, `ism`, `litsenziya`, `ixtisos`, `tel`, `tajriba` |
| `RESTRUKTURIZATSIYA`, `MULOQOTLAR` | предложения должника и контакты по делу, ссылка `ishId` |

### 9.5 Защита и мониторинг

| Коллекция | Поля |
|---|---|
| `HODISALAR` | `id`, `kod`, `obyektId`, `hodisa`, `sarlavha`, `tavsif`, `vaqt`, `jiddiylik`, `ustun`, `holat`, `manba`, `masul`, `iibAriza {raqam, sana}` |
| `QORIQLASH` | `id`, `obyektId`, `qoriqlashTuri`, `ijrochi`, `shartnomaRaqami`, `boshlanish`, `tugash`, `oylikTolov`, `javobVaqtiDaq`, `holat` |
| `KOMMUNAL_ARIZALAR` | `id`, `obyektId`, `xizmat`, `tur`, `raqam`, `sana`, `muddat`, `holat` |
| `QURILMALAR` | `id`, `obyektId`, `kirishNuqtaId`, `shlyuzId`, `tur`, `katalogId`, `ishlabChiqaruvchi`, `model`, `seriya`, `ornatilgan`, `quvvat`, `aloqa`, `simRaqam`, `batareya`, `oxirgiSignal`, `holat`, `keyingiXizmat` |
| `KIRISH_NUQTALARI` | `id`, `obyektId`, `nom`, `tur`, `rejim`, `holat`, `qurilmalar`, `kunlikOtish`, `oxirgiAloqa` — только у зданий |
| `SHAXSLAR`, `RUXSATLAR`, `KIRISH_SOROVLARI`, `TASHRIFLAR`, `KIRISH_VOQEALARI`, `XAVFSIZLIK_HODISALARI`, `MASOFAVIY_SESSIYALAR`, `XIZMAT_ISHLARI` | лица, допуски, заявки на доступ, посещения, события доступа, сигналы, дистанционные осмотры, сервисные работы |

Справочники защиты (`QURILMA_TURLARI`, `QURILMA_KATALOG`, `HIMOYA_ANDOZALARI`)
включают устройства для объектов без электроснабжения: 4G-камеры с солнечной
панелью, датчики LoRaWAN, терминал Face ID, пожарный датчик (дым,
температура, угарный газ), GPS-трекер, шлюз. `himoyaSmetasi(шаблон, n)`
считает смету: оборудование × цена + монтаж + связь на 12 месяцев.

### 9.6 Работа пользователя и настройки

| Коллекция | Поля |
|---|---|
| `TASDIQLAR` | `id`, `tur`, `manbaKol`, `manbaId`, `obyektId`, `sarlavha`, `tavsif`, `summa`, `muallif`, `masulRol`, `javobMuddati`, `holat`, `qaror`, `sabab`, `qarorSana` |
| `MENING_VAZIFALARIM` | `id`, `nom`, `tur`, `obyektId`, `kod`, `qoidaId`, `sana`, `muddat`, `ijrochi`, `rol`, `muhimlik`, `bajarildi` |
| `BILDIRISHLAR` | `id`, `qoidaId`, `obyektId`, `sarlavha`, `matn`, `havola`, `sana`, `rol`, `oqildi`, `oqiganlar` |
| `FOYDLAR` | `id`, `nom`, `login`, `rol`, `bolim`, `filialKod`, `lavozim`, `email`, `tel`, `faol` |
| `FILIALLAR` | `id`, `nom`, `hudud`, `hududNomi`, `turi` |
| `PARAMETRLAR` | `id`, `guruh`, `nom`, `qiymat`, `birlik`, `taxminiy`, `manba` — сроки, ставки резерва, налоги, торги, связь |
| `QOIDALAR` | `id`, `trigger`, `nom`, `kunlar`, `natija`, `qabulQiluvchiRol`, `eskalatsiyaRol`, `eskalatsiyaKun`, `faol`, `manba` |
| `BAYRAMLAR` | `id`, `sana`, `nom`, `taxminiy` |
| `INTEGRATSIYALAR` | `id`, `nom`, `holat`, `masul`, `oxirgiSinxron` |

---

## 10. Индекс контроля объекта

Считается на клиенте (`malumot-indeks.js`): осмотр 25, страхование 25,
оценка 20, документы 15, охрана и устройства 15. Уровни: 85 и выше — высокий,
от 70 — устойчивый, от 50 — требует внимания, ниже — критический.

```
MKB_DATA.nazoratIndeksi(объект) → {obyektId, ball, daraja, tarkib[], zaif[]}
MKB_DATA.nazoratJamlama()       → {ortacha, daraja, jami}
```

---

## 11. Инварианты данных

`moslikTekshiruvi()` — исполняемая спецификация целостности (перечень —
`docs/ARXITEKTURA.md`, раздел 3.6). Сервер уже применяет правила записи из
раздела 5.3; при переносе в промышленный контур каждый инвариант получает
серверную проверку до записи, частичное сохранение не допускается.

---

## 12. Требования к промышленному контуру

- **Н-1.** Все запросы поверх TLS 1.2+; HTTP — только перенаправление.
- **Н-2.** Токен только в cookie `HttpOnly; Secure; SameSite=Strict`, без
  копии в `localStorage`.
- **Н-3.** 30 минут бездействия завершают сессию. Блокировка после пяти
  неудачных попыток уже реализована.
- **Н-4.** Второй фактор для `Administrator`, `Rahbariyat`, `Filial rahbari`.
- **Н-5.** Ограничение частоты: 300 запросов в минуту на сессию, 10 в минуту
  на вход.
- **Н-6.** Заголовки `Content-Security-Policy`, `Referrer-Policy: same-origin`.
- **Н-7.** Персональные данные (ПИНФЛ, телефоны, изображения лиц) хранятся на
  серверах в Узбекистане (ЗРУ-547, ЗРУ-1125) и не попадают в журналы и адресную
  строку.
- **Н-8.** Журнал действий — только добавление, без `UPDATE` и `DELETE`.
- **Н-9.** Записи архива неизменяемы; исправление — новая корректирующая запись.

| Показатель | Значение |
|---|---|
| Ответ списочного метода | 95-й процентиль ≤ 400 мс |
| Ответ карточки объекта | 95-й процентиль ≤ 250 мс |
| Одновременные пользователи | 150 |
| Доступность в рабочие часы | 99,5 % |
| Восстановление после сбоя | RPO 15 минут, RTO 2 часа |

---

## 13. Вопросы к заказчику

1. Источник учётных записей: собственные записи, доменный каталог или единый вход.
2. Интеграции: ABS (остатки счетов 16701 и резерва), кадастр, ГУБДД, E-auksion,
   коммунальные поставщики, шлюз устройств — формат и порядок доступа.
3. Контур размещения и срок хранения журнала и архива.
4. Утверждение бухгалтерией промежуточных ставок резерва (сейчас `taxminiy`).
