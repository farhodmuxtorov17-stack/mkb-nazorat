# Jonli namuna qatlami: manbalar, shartlar va cheklovlar

`yadro/jonli.js` tashqi internetdan uch turdagi ochiq ma'lumot oladi. Ularning hech biri bank obyekti
emas va bank ma'lumotini tashqariga chiqarmaydi. Har manba ekranda nomi va litsenziyasi bilan
ko'rsatiladi. Tarmoq yopiq bo'lsa blok 8 soniyadan keyin "Internet yo'q: jonli namuna ko'rsatilmaydi"
deb yozadi va sahifaning qolgan qismi ishlashda davom etadi.

Tekshiruv sanasi: 26.09.2026.

Monitoring markazida bu manbalar sahifa oxiridagi yig'ilgan "Jonli ulanish namunalari" bo'limida
turadi (dastlab yopiq, holati brauzerda eslab qolinadi). Birinchi ekranda bank kameralari.

## 1. Ob-havo va quyosh: Open-Meteo

| | |
|---|---|
| Manzil | `https://api.open-meteo.com/v1/forecast` |
| Kalit | kerak emas; CORS ochiq (`access-control-allow-origin: *`) |
| Litsenziya | ma'lumot [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), manba ko'rsatilishi shart |
| Foydalanish sharti | bepul API tijoriy bo'lmagan foydalanish uchun, kuniga 10 000 so'rovgacha ([shartlar](https://open-meteo.com/en/terms)) |
| Bankda ishlatish | pullik API kaliti (`customer-api.open-meteo.com`) yoki o'z serveri: Open-Meteo kodi ochiq, AGPLv3 |
| Olinadigan maydonlar | `temperature_2m`, `cloud_cover`, `shortwave_radiation`, `wind_gusts_10m`, `precipitation` (hozir); keyingi 24 soatning soatbay harorati, yog'ini va shamol zarbi; kunlik `shortwave_radiation_sum` |
| Kesh | brauzerda 15 daqiqa, koordinatalar to'plami bo'yicha |

Qayerda ko'rinadi:

- Monitoring markazi, "Jonli ulanish namunalari": 14 hudud markazi bitta so'rovda, tugma bosilganda.
  Natija bitta jadval: hudud, harorat, bulut, quyosh nurlanishi (Vt/m²), zaryad olish mumkinmi.
  Prognoz chegaradan o'tgan hudud jadval ostida alohida qatorda chiqadi.
- Qurilma sahifasi: quyosh yoki akkumulyatordan ishlaydigan qurilma uchun obyekt hududidagi ob-havo.
- Obyekt kartochkasi, "Himoya" bo'limi: ob-havo va keyingi 24 soat prognozi.

Uchinchi tomonga obyektning aniq nuqtasi yuborilmaydi: koordinata 0,1° gacha (taxminan 11 km)
yaxlitlanadi, ob-havo uchun shu aniqlik yetarli.

Hisob qoidalari (`MKB_JONLI_SOF`, sinovi `tests/jonli.test.js`):

- Litiy, shu jumladan LiFePO4 akkumulyator 0 °C dan past haroratda zaryad olmaydi, BMS zaryadni
  to'xtatadi. Ekranda: "Zaryad to'xtatilgan: −3 °C". Harorat havo bo'yicha olinadi; akkumulyator
  qutisidagi haroratni qurilmaning o'z datchigi beradi.
- Bugungi quyosh hosili = kunlik nurlanish (kVt·soat/m²) × panel quvvati (Vt) × 0,7. PR 0,7
  taqdimotdagi o'lchovdan olingan: 22 Vt panel 1,62 kVt·soat/m² da sutkasiga 25 Vt·soat beradi.
  Hisob taqdimotdagi 1-profilga qilinadi: 104 Vt panel, kamera sutkasiga 72 Vt·soat sarflaydi.
- Navbatdan tashqari ko'rik asosi: keyingi 24 soatda shamol zarbi 72 km/soatdan yuqori, yog'in
  20 mm dan ko'p yoki harorat −10 °C dan past. Tizim ko'rik yaratmaydi, asosni ko'rsatadi, qarorni
  inspektor qabul qiladi.

## 2. Oylik quyosh nurlanishi: NASA POWER

| | |
|---|---|
| Manzil | `https://power.larc.nasa.gov/api/temporal/climatology/point?parameters=ALLSKY_SFC_SW_DWN&community=RE` |
| Kalit | kerak emas; CORS ochiq |
| Shart | NASA ma'lumoti erkin foydalaniladi, manba ko'rsatiladi ([NASA POWER](https://power.larc.nasa.gov/)) |
| Davr | 2001–2020 yillar o'rtachasi |

`MKB_JONLI_SOF.quvvatHisobi(psh)` panel va akkumulyatorni eng qorong'i oyga hisoblaydi.
Toshkent: dekabr 1,62, iyun 7,60 kVt·soat/m² kun. Natija: dekabrga 104 Vt panel, iyunga 22 Vt,
akkumulyator 450 Vt·soat (5 kun zaxira, 80 % razryad, 10 kunda tiklash). Qurilma o'rnatish sahifasi
shu funksiyani chaqirishi uchun tayyor.

## 3. Qurilma xabari: ommaviy MQTT sinov brokeri

| | |
|---|---|
| Asosiy broker | `wss://test.mosquitto.org:8081`, Eclipse Mosquitto loyihasi ([sahifa](https://test.mosquitto.org/)) |
| Zaxira broker | `wss://broker.emqx.io:8084/mqtt`, EMQ Technologies ([sahifa](https://www.emqx.com/en/mqtt/public-mqtt5-broker)) |
| Shart | ikkalasi ham sinov uchun, kafolatsiz; xabarni istalgan kishi o'qiy oladi |
| Mavzu | `mkb-nazorat/namuna/<24 ta tasodifiy hex>`, brauzerda 12 soat saqlanadi |
| Protokol | MQTT 3.1.1, QoS 0, WebSocket ustida TLS; mijoz `yadro/jonli.js` ichida, tashqi kutubxona yo'q |

Xabar sxemasi `mkb.qurilma.voqea/1`, maydon nomlari `XAVFSIZLIK_HODISALARI` yozuvi bilan bir xil:

```json
{"sxema": "mkb.qurilma.voqea/1", "qurilmaId": "SINOV-3F9C", "tur": "eshik-datchigi",
 "hodisa": "Eshik ochildi", "jiddiylik": "o'rta", "batareya": null, "obyektId": null,
 "namuna": true, "yuborildi": 1790332512345}
```

`obyektId` ataylab bo'sh. Kelgan xabar sxemaga mos kelmasa yoki 2 KB dan katta bo'lsa tashlab
yuboriladi; matn ekranga faqat escape qilingan holda chiqadi. Kechikish = qabul vaqti − `yuborildi`,
bitta brauzer soatida o'lchanadi.

Bankda ishlatishda ommaviy broker o'rniga bankning o'z brokeri turadi: TLS, har qurilmaga alohida
login yoki mijoz sertifikati, mavzu bo'yicha ruxsatlar (ACL).

## 4. Kamera kadri

Qoida: faqat egasi hammaga e'lon qilgan va saytga joylashtirishga ruxsat bergan kadr yoki jonli oqim
(davlat idorasining kamerasi, rasmiy shahar yoki teleradiokompaniya oqimi, YouTube'da joylashtirish
yoqilgan jonli efir). Himoyasiz qolgan, standart parolli yoki Shodan, Insecam kabi qidiruvlarda topilgan
kameraga ulanish ruxsatsiz kirish hisoblanadi va ishlatilmaydi.

Ro'yxat bitta faylda: `assets/jonli/kameralar.json`. Unda uch qism bor:

- `kameralar`: Monitoring markazida ko'rsatiladigan O'zbekiston shahar kameralari. **Hozir bo'sh.**
- `texnikTekshiruv`: Integratsiyalar sahifasidagi kadr olish tekshiruvi uchun bitta JPEG kadr.
- `rad_etilgan`: tekshirilib, kiritilmagan manbalar va sababi.

### Monitoring markazida kamera namunasi yo'q

26.09.2026 da O'zbekiston shaharlari uchun egasi e'lon qilgan, hozir jonli va saytga joylashtirishga
ruxsat berilgan kamera qayta qidirildi (quyidagi jadval). Mosi topilmadi. Shuning uchun Monitoring
markazida ochiq kamera ko'rsatilmaydi. Bank uchun mavzudan tashqari kadr (masalan, Gavayidagi vulqon)
rahbariyat ekraniga chiqmaydi.

Mos kamera topilsa: `kameralar` ga `youtube` yoki `youtube-kanal` turida qo'shiladi, `jonli.js` ga
`youtube-nocookie.com` orqali, faqat tugma bosilganda ochiladigan blok qaytariladi. Kadr ustida
"Ommaviy namuna, bank obyekti emas" belgisi turadi.

### Kadr olish: texnik tekshiruv (Integratsiyalar sahifasi)

"NVR va IoT shlyuzi" kartasida, MQTT sinovi ostida. Tugma bosilganda brauzer bitta JPEG kadrni so'raydi va
ko'rsatadi: HTTP javobi, turi, hajmi (KB), yetib kelish vaqti (ms), rasm o'lchami (brauzer rasmni ochib
beradi, ya'ni fayl butun), kadr olingan vaqt (`Last-Modified`) va necha daqiqa oldin olingani. Kadr
30 daqiqadan eski bo'lsa "Kadr eskirgan" belgisi chiqadi. Kadrning o'zi ekranga chiqmaydi.
Shlyuz ulanganda bank kamerasining hodisa kadri xuddi shu tekshiruvdan o'tadi.

| | |
|---|---|
| Egasi | AQSh Geologiya xizmati (USGS), Gavayi vulqon observatoriyasi |
| Sahifa | [Kīlauea summit webcams](https://www.usgs.gov/volcanoes/kilauea/summit-webcams) |
| Kadr | `https://volcanoes.usgs.gov/observatories/hvo/cams/KWcam/images/M.jpg` |
| Shart | "USGS-authored or produced data and information are considered to be in the U.S. Public Domain" ([copyrights and credits](https://www.usgs.gov/information-policies-and-instructions/copyrights-and-credits)); manba ko'rsatiladi |
| Texnik | JPEG, taxminan har daqiqada yangilanadi; `Access-Control-Allow-Origin: *`, `Last-Modified` bor (26.09.2026 da tekshirildi: HTTP 200, 100 KB) |
| Tarmoq yopiq | 8 soniyadan keyin "Kadrni 8 soniyada olib bo'lmadi" va sabab; sahifaning qolgan qismi ishlayveradi |

### Tekshirilgan va rad etilgan manbalar

| Manba | Natija | Sana |
|---|---|---|
| PANOMAX, Toshkent teleminorasi (`tashkent.panomax.com/tv-tower`) | joylashtirish kodi ochiq, oxirgi kadr 04.03.2023: jonli emas | 25.09.2026 |
| PANOMAX, Amirsoy (`amirsoy.panomax.com`) | oxirgi kadr 01.03.2023: jonli emas | 25.09.2026 |
| Amirsoy Resort, `amirsoy.com/en/webcams` (5 ta) | pleyer oqimni boshqa saytda ko'rsatmaydi | 25.09.2026 |
| YouTube kanali "Live camera Uzbekistan" (`UC9JenpnDtNkSVeNAWeJfnyw`) | jonli efir yo'q; ikkala yozuv 29.04.2022 da tugagan, kamera joyi va egasi ko'rsatilmagan | 26.09.2026 |
| YouTube kanali "LIVE UZBEKISTAN" (`UCG_9re-ot41Ivx13Ge8McJA`) | kanal nomi o'zgargan, kamera oqimi yo'q | 26.09.2026 |
| O'zbekiston Milliy universiteti, `live.nuu.uz` | imtihon zallari va stadion kamerasi, odamlar yuzi ko'rinadi; saytga joylashtirish sharti e'lon qilinmagan | 26.09.2026 |
| youwebcams, worldviewstream, worldcam, world-cam, worldcams, web-cameri-mira kataloglari | oqim egasi va sharti ko'rsatilmagan yoki oqim katalogning o'z pleyerida | 26.09.2026 |
| Windy Webcams (Toshkent atrofi) | ro'yxat faqat API kaliti bilan beriladi, kalit uchun hisob ochish kerak | 26.09.2026 |
| O'zbekiston 24, Milliy TV, Sevimli, Toshkent, Dunyo bo'ylab, Zo'r TV (YouTube) | telekanal efiri kamera emas | 25.09.2026 |
| Kīlauea (USGS) kadri Monitoring markazida | manba ruxsatli, lekin bank uchun mavzudan tashqari: faqat texnik tekshiruvda qoldirildi | 26.09.2026 |
