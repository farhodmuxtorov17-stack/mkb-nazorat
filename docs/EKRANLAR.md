# Ekranlar reyestri

Jami: **101 ekran**. Qobiq ichida 94 ta, ochiq sahifalar 7 ta.
Bo'limlar: **olti ish bo'limi** (`aktivlar`, `nazorat`, `qiymat`, `sotuv`, `ishlar`, `hisobot`), ularning ustida rol paneli (`panel`) va pastki sozlama bloki (`sozlama`).
Har bir qobiq sahifasi `yadro/daraxt.js` da qayd etilgan: bo'lim markazidan ochiladigan sahifa (`MKB_DARAXT`) yoki bo'limning ichki sahifasi (`MKB_ICHKI`).
Sahifaning `data-sahifa` kaliti shu bo'lim kalitiga teng yoki `yadro/app.js` dagi `BOLIM_TAXALLUS` orqali unga keltiriladi. Buni `tests/sahifalar.test.js` tekshiradi.

## Yon panel va ekranlar munosabati

Yon panel yassi: **bir bo'lim — bir band**, va hech bir rol 6 banddan ko'p ko'rmaydi (`yadro/app.js`, `ROL_YON`, `ROL_YON_MAX`).
Bo'limning qolgan sahifalari yo'qolmaydi. Ular to'rt yo'l bilan ochiladi:

1. **Bo'lim tasmasi** — har bir bo'lim sahifasining tepasidagi `nav.bolim-tablar`. Bandlari o'z bo'limidagi sahifaga olib borishini `tests/sahifalar.test.js` tekshiradi.
2. **`Ctrl+K` buyruqlar oynasi** — ro'yxat to'g'ridan-to'g'ri `MKB_DARAXT` dan olinadi (`yadro/ux.js`), shuning uchun daraxtdagi har bir sahifa shu yerdan topiladi.
3. **Obyekt kartochkasi** — aktivga bog'liq sahifalar (ko'rik, hujjat, xarajat, sotuv) kartochka tablaridan.
4. **To'g'ridan-to'g'ri havola** — sahifalar o'chirilmagani uchun eski havolalar ishlayveradi.

Hisobotlar bo'limida bundan tashqari **«Bo'lim sahifalari» kartasi** bor (`hisobotlar.html`): u ro'yxatni `MKB_DARAXT.hisobot` dan oladi, shuning uchun daraxtga yangi hisobot qo'shilsa, markazda o'zi paydo bo'ladi.

| Rol | Yon paneldagi bandlar | Bosh sahifa |
|---|---|---|
| Rahbariyat | Panel · Qarorlar · Aktivlar · Nazorat · Sotuv · Hisobotlar | `panel.html` |
| Obyekt menejeri | Panel · Aktivlar · Moliya · Sotuv · Ishlar · Hisobotlar | `panel-obyekt.html` |
| Ko'rik va xavfsizlik inspektori | Panel · Nazorat · Aktivlar · Ishlar · Hisobotlar | `panel-nazorat.html` |
| Buxgalteriya va risk | Panel · Moliya · Sotuv · Aktivlar · Ishlar · Hisobotlar | `panel-moliya.html` |
| Administrator | Panel · Qarorlar · Hisobotlar | `panel.html` |

## Ochiq sahifalar (7)

| Fayl | Ekran | Izoh |
|---|---|---|
| `index.html` | Balans aktivlari | qobiqsiz |
| `kirish.html` | Tizimga kirish | qobiqsiz |
| `parol-tiklash.html` | Parolni tiklash | qobiqsiz |
| `parol-yangilash.html` | Parolni almashtirish | qobiqsiz |
| `taqdimot.html` | Loyiha taqdimoti | qobiqsiz |
| `xato-403.html` | Ruxsat yo'q | qobiqsiz |
| `xato-404.html` | Sahifa topilmadi | qobiqsiz |

## Rol panellari (`panel`, 4)

Har bir rol o'z panelidan boshlaydi. Panel — bo'lim emas, rolning bosh sahifasi: bugungi ish, muddat va so'rovlar.

| Fayl | Ekran | Kimga |
|---|---|---|
| `panel.html` | Rahbariyat paneli | Rahbariyat, Administrator |
| `panel-obyekt.html` | Obyekt menejeri paneli | Obyekt menejeri |
| `panel-nazorat.html` | Ko'rik va xavfsizlik paneli | Ko'rik va xavfsizlik inspektori |
| `panel-moliya.html` | Moliya paneli | Buxgalteriya va risk |

## Balans aktivlari (`aktivlar`, 23)

Bo'lim markazi: `obyektlar.html`.

| Fayl | Ekran | Joyi |
|---|---|---|
| `obyektlar.html` | Reyestr | bo'lim markazi |
| `muddatlar.html` | Muddatlar | bo'lim markazi |
| `xarita.html` | Xaritada | bo'lim markazi |
| `qabul-boshlash.html` | Balansga qabul | bo'lim markazi |
| `rasmiylashtirish.html` | Huquqni rasmiylashtirish | bo'lim markazi |
| `arxiv.html` | Arxiv va chiqim | bo'lim markazi |
| `obyekt.html` | Obyekt kartochkasi | ichki sahifa |
| `obyekt-suratlar.html` | Obyekt suratlari | ichki sahifa |
| `obyekt-moliya.html` | Obyekt moliyasi | ichki sahifa |
| `obyekt-hujjatlar.html` | Obyekt hujjatlari | ichki sahifa |
| `obyekt-koriklar.html` | Obyekt ko'riklari | ichki sahifa |
| `obyekt-xarajatlar.html` | Obyekt xarajatlari | ichki sahifa |
| `obyekt-kommunal.html` | Obyekt kommunal xizmatlari | ichki sahifa |
| `obyekt-himoya.html` | Obyekt himoyasi | ichki sahifa |
| `obyekt-sotuv.html` | Obyekt sotuvi | ichki sahifa |
| `obyekt-tarix.html` | Obyekt tarixi | ichki sahifa |
| `obyekt-pasport.html` | Obyekt pasporti | ichki sahifa |
| `obyekt-tahrir.html` | Obyektni tahrirlash | ichki sahifa |
| `qabul-hujjatlar.html` | Qabul hujjatlari | ichki sahifa |
| `qabul-tasdiqlash.html` | Balansga olish | ichki sahifa |
| `qabul-dalolatnoma.html` | Qabul dalolatnomasi | ichki sahifa |
| `arxiv-obyekt.html` | Arxiv yozuvi | ichki sahifa |
| `chiqim-tasdiqlash.html` | Balansdan chiqarish | ichki sahifa |

## Nazorat va himoya (`nazorat`, 25)

Bo'lim markazi: `himoya.html`. Eski `himoya` va `korik` bo'limlari shu yerga birlashtirildi; sahifalarning `data-sahifa` kaliti o'zgarmadi, `BOLIM_TAXALLUS` ularni `nazorat` ga keltiradi.

| Fayl | Ekran | Joyi |
|---|---|---|
| `himoya.html` | Monitoring markazi | bo'lim markazi |
| `korik-rejasi.html` | Ko'rik rejasi | bo'lim markazi |
| `inventarizatsiya.html` | Inventarizatsiya | bo'lim markazi |
| `qurilmalar.html` | Qurilmalar | bo'lim markazi |
| `hodisalar.html` | Hodisalar | bo'lim markazi |
| `qoriqlash.html` | Qo'riqlash | bo'lim markazi |
| `korik-kechikkan.html` | Kechikkan ko'riklar | bo'lim markazi |
| `korik-tarixi.html` | Ko'riklar tarixi | bo'lim markazi |
| `korik-tayinlash.html` | Ko'rik tayinlash | bo'lim markazi |
| `masofaviy-korik.html` | Masofaviy ko'rik | bo'lim markazi |
| `kommunal.html` | Kommunal | bo'lim markazi |
| `ruxsatlar.html` | Ruxsatlar | bo'lim markazi |
| `tashriflar.html` | Tashriflar | bo'lim markazi |
| `kirish-voqealari.html` | Signallar | bo'lim markazi |
| `korik-otkazish.html` | Ko'rik o'tkazish | ichki sahifa |
| `korik-akti.html` | Ko'rik dalolatnomasi | ichki sahifa |
| `inventar-dalolatnoma.html` | Inventarizatsiya dalolatnomasi | ichki sahifa |
| `qurilma.html` | Qurilma | ichki sahifa |
| `qurilma-ornatish.html` | Qurilma o'rnatish | ichki sahifa |
| `servis-topshirigi.html` | Servis topshirig'i | ichki sahifa |
| `hodisa.html` | Hodisa | ichki sahifa |
| `kirish-soravi.html` | Kirish so'rovi | ichki sahifa |
| `tashrif-jonli.html` | Tashrif | ichki sahifa |
| `tashrif-chiqish.html` | Tashrif chiqishi | ichki sahifa |
| `kirish-voqea.html` | Kirish voqeasi | ichki sahifa |

## Qiymat va moliya (`qiymat`, 9)

Bo'lim markazi: `baholash.html`; buxgalteriya uchun `zaxira.html`.

| Fayl | Ekran | Joyi |
|---|---|---|
| `baholash.html` | Baholash | bo'lim markazi |
| `baholash-buyurtma.html` | Baholash buyurtmasi | bo'lim markazi |
| `zaxira.html` | Zaxira (MB 2696) | bo'lim markazi |
| `soliq.html` | Soliq | bo'lim markazi |
| `sugurta.html` | Sug'urta polislari | bo'lim markazi |
| `baholash-hisobot-kiritish.html` | Baholash hisobotini kiritish | ichki sahifa |
| `baholash-hisobot.html` | Baholash hisoboti | ichki sahifa |
| `sugurta-polis.html` | Sug'urta polisi | ichki sahifa |
| `sugurta-yangilash.html` | Polisni yangilash | ichki sahifa |

## Sotuv va undiruv (`sotuv`, 13)

Bo'lim markazi: `realizatsiya.html`; buxgalteriya uchun `shartnomalar.html`. Eski `realizatsiya` va `yuridik` bo'limlari shu yerga birlashtirildi.

| Fayl | Ekran | Joyi |
|---|---|---|
| `realizatsiya.html` | Sotuv rejasi | bo'lim markazi |
| `lotlar.html` | E-auksion lotlari | bo'lim markazi |
| `takliflar.html` | Takliflar | bo'lim markazi |
| `shartnomalar.html` | Shartnomalar va to'lovlar | bo'lim markazi |
| `ijara.html` | Ijara | bo'lim markazi |
| `undiruv.html` | Undiruv ishlari | bo'lim markazi |
| `sud-kalendar.html` | Sud kalendari | bo'lim markazi |
| `davo-tayyorlash.html` | Da'vo tayyorlash | bo'lim markazi |
| `lot.html` | Lot | ichki sahifa |
| `shartnoma.html` | Shartnoma | ichki sahifa |
| `ish.html` | Ish varaqasi | ichki sahifa |
| `sud-majlis.html` | Sud majlisi | ichki sahifa |
| `qaror-kiritish.html` | Sud qarorini kiritish | ichki sahifa |

## Ishlar va qarorlar (`ishlar`, 3)

Bo'lim markazi: `vazifalar.html`; rahbariyat va administrator uchun band to'g'ridan-to'g'ri `tasdiqlar.html` ni ochadi va «Qarorlar» deb nomlanadi.

| Fayl | Ekran | Joyi |
|---|---|---|
| `vazifalar.html` | Vazifalar | bo'lim markazi |
| `tasdiqlar.html` | Qarorlar | bo'lim markazi |
| `bildirishnomalar.html` | Bildirishnomalar | bo'lim markazi |

## Hisobotlar (`hisobot`, 9)

Bo'lim markazi — yagona **hisobot markazi** `hisobotlar.html`. Yon panelda bitta band turadi; qolgan sakkiz sahifa shu markazdagi kartalardan ochiladi.

| Fayl | Ekran | Joyi |
|---|---|---|
| `hisobotlar.html` | Hisobotlar markazi | bo'lim markazi |
| `hisobot-portfel.html` | Balans aktivlari | markaz kartasi |
| `hisobot-hudud.html` | Hududlar kesimi | markaz kartasi |
| `hisobot-xarajat.html` | Xarajatlar | markaz kartasi |
| `hisobot-kpi.html` | Nazorat indeksi | markaz kartasi |
| `hisobot-undiruv.html` | Undiruv va sud ishlari | markaz kartasi |
| `kirish-hisoboti.html` | Kirish nazorati | markaz kartasi |
| `hisobot-mb.html` | MB oylik hisoboti | markaz kartasi |
| `hisobot-eksport.html` | Ma'lumot eksporti | markaz kartasi |

## Sozlamalar (`sozlama`, 8)

Yon panelning pastki bloki. Ish bo'limi emas: hisob, qoida va ma'lumotnomalar.

| Fayl | Ekran | Joyi |
|---|---|---|
| `sozlamalar.html` | Profil va qoidalar | pastki blok |
| `foydalanuvchilar.html` | Foydalanuvchilar | pastki blok |
| `rollar.html` | Rollar | pastki blok |
| `filiallar.html` | Filiallar | pastki blok |
| `integratsiyalar.html` | Integratsiyalar | pastki blok |
| `amallar-tarixi.html` | Amallar tarixi | pastki blok |
| `qollanma.html` | Qo'llanma | pastki blok |
| `foydalanuvchi.html` | Foydalanuvchi | ichki sahifa |

`foydalanuvchilar.html`, `foydalanuvchi.html`, `rollar.html` va `integratsiyalar.html` faqat administratorga ochiq; `filiallar.html` va `amallar-tarixi.html` — administrator bilan rahbariyatga (`yadro/app.js`, `SAHIFA_MAXSUS`).

## Obyekt kartochkasi tablari

1. Umumiy — `obyekt.html`
2. Suratlar — `obyekt-suratlar.html`
3. Moliya — `obyekt-moliya.html`
4. Hujjatlar — `obyekt-hujjatlar.html`
5. Ko'riklar — `obyekt-koriklar.html`
6. Xarajatlar — `obyekt-xarajatlar.html`
7. Kommunal — `obyekt-kommunal.html`
8. Himoya — `obyekt-himoya.html`
9. Sotuv — `obyekt-sotuv.html`
10. Tarix — `obyekt-tarix.html`

Pasport (`obyekt-pasport.html`) va tahrir (`obyekt-tahrir.html`) kartochkadagi amal tugmalari orqali ochiladi.

## Yon paneldan chiqqan, lekin qolgan sahifalar

Soddalashtirishda **birorta sahifa o'chirilmadi**. Yon panelda bandlar soni kamaydi, sahifalar esa yuqorida sanalgan to'rt yo'l bilan ochiq qoldi. Har bir sahifa daraxtda qayd etilganini va bo'lim tasmasidagi bandlar o'z bo'limiga olib borishini `tests/sahifalar.test.js` tekshiradi.

To'qqizta alohida hisobot sahifasi o'rniga yon panelda bitta **hisobot markazi** turadi; sahifalarning o'zi markazdagi kartalardan ochiladi.

**Ochiq joy: birlashtirilgan bo'limlarda ikkita tasma.** `nazorat` va `sotuv` bo'limlari ikkitadan eski bo'limdan yig'ilgan, lekin tasmalar birlashtirilmagan:

| Bo'lim | Markaz | Tasmada bor | Tasmada yo'q |
|---|---|---|---|
| `nazorat` | `himoya.html` | qo'riqlash, kommunal, qurilmalar, hodisalar, tashriflar, masofaviy ko'rik, ruxsatlar, signallar | `korik-rejasi.html`, `korik-kechikkan.html`, `korik-tarixi.html`, `korik-tayinlash.html`, `inventarizatsiya.html` (ular `korik-rejasi.html` dagi ikkinchi tasmada) |
| `sotuv` | `realizatsiya.html` | lotlar, takliflar, shartnomalar, ijara | `undiruv.html`, `sud-kalendar.html`, `davo-tayyorlash.html` (ular `undiruv.html` dagi ikkinchi tasmada) |

Ya'ni ko'rik rejasiga `himoya.html` dan, undiruv ishlariga `realizatsiya.html` dan tasma orqali o'tib bo'lmaydi. Ko'rik guruhiga `panel-nazorat.html` va `obyektlar.html` dan havola bor; `undiruv.html` ga esa obyekt menejerining bosh sahifasi `panel-obyekt.html` dan havola yo'q — faqat `Ctrl+K`, ish kartochkasi yoki hisobot orqali ochiladi. «Rolning bosh sahifasidan uch bosishda» shartini to'liq bajarish uchun shu ikki tasmani birlashtirish yoki markazga bo'lim sahifalari kartasini qo'yish kerak.

## Olib tashlangan sahifalar

`obyekt-3d.html`, `obyekt-qavat.html` (3D navigator va qavat rejasi o'rniga haqiqiy suratlar tabi), `kirish-nazorati.html`, `kirish-nuqtalari.html`, `kirish-nuqtasi.html` (monitoring markazi va qurilmalar reyestriga birlashtirildi). Ularga havola qolmagan.

Rol panellari to'rtta: `panel.html`, `panel-obyekt.html`, `panel-nazorat.html`, `panel-moliya.html`. `panel-filial.html`, `panel-baholash.html`, `panel-realizatsiya.html`, `panel-yurist.html`, `panel-buxgalteriya.html` va `panel-xavfsizlik.html` olib tashlandi: ularning bloklari qolgan to'rt panelga va bo'lim markazlariga ko'chirildi. Filialga biriktirilgan rahbariyat hisobi `panel.html` da faqat o'sha filial raqamlarini ko'radi (`MKB.doira`).
