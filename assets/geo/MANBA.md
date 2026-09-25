# Chegara ma'lumotlari — manba, litsenziya va yig'ish tartibi

Bu papkadagi fayllar O'zbekiston ma'muriy chegaralarini saqlaydi. Ular tizim ichida
turadi: xarita ishlashi uchun tashqi tayl serveriga chiqish shart emas.

| Fayl | Nima | Obyekt | Hajm |
|---|---|---|---|
| `hududlar.geojson` | 1-daraja: 12 viloyat + Qoraqalpog'iston Respublikasi + Toshkent shahri | 14 | ~105 KB |
| `tumanlar.geojson` | 2-daraja: tuman va viloyat bo'ysunuvidagi shaharlar | 200 | ~370 KB |

## Manba

**geoBoundaries, gbOpen release, UZB ADM2.**

- Yuklab olindi: `https://media.githubusercontent.com/media/wmgeolab/geoBoundaries/main/releaseData/gbOpen/UZB/ADM2/geoBoundaries-UZB-ADM2.geojson`
- Metama'lumot: `.../geoBoundaries-UZB-ADM2-metaData.txt`
- Yuklab olingan sana: 2026-09-24
- Boshlang'ich manba (metama'lumotdan): **OCHA ROCCA**, `https://data.humdata.org/dataset/ubbekistan-update`
- Chegaralar qaysi yil holatiga: 2020
- Litsenziya: **Creative Commons Attribution 3.0 IGO (CC BY 3.0 IGO)** — tarqatishga,
  o'zgartirishga va tijorat ishlatuvga ruxsat beradi, yagona shart — manbani ko'rsatish.
- geoBoundaries loyihasi qo'shimcha havola so'raydi: "Administrative boundaries courtesy of
  geoBoundaries.org" (Runfola, D. et al. (2020), PLoS ONE 15(4): e0231866).

Nazorat uchun `geoBoundaries-UZB-ADM1.geojson` (OpenStreetMap asosida, ODbL 1.0) ham
yuklab olindi va solishtirildi, lekin yakuniy faylga kirmadi — quyida sababi.

### Nazorat yig'indilari

Natija fayllari (yetkazib berishda almashmaganini tekshirish uchun):

| Fayl | Bayt | SHA-256 |
|---|---|---|
| `hududlar.geojson` | 108 333 | `e4f6a7cd978b0e369b66a4183ec57a880126991cfee4f869b86d310e72cee1dc` |
| `tumanlar.geojson` | 379 204 | `52699329a93d174a423d05707de8d98327c118ddbcf6415a38d085abe7b4dc9d` |

Manba faylining o'zi repoda saqlanmaydi (u yakuniy mahsulotga kirmaydi), shuning uchun uni
qaytadan yuklab olganda **hajmi va SHA-256 si shu yerga yozib qo'yilsin**, gbOpen nashr tegi
bilan birga. geoBoundaries relizlari yangilanib turadi: yig'indisiz bir yildan keyin o'sha
havoladan boshqa fayl kelgani bilinmay qoladi va natijani asl bilan solishtirib bo'lmaydi.

| Nima | Qiymat |
|---|---|
| gbOpen nashr tegi | *yuklab olishda yozilsin* |
| `UZB-ADM2.geojson` hajmi, bayt | *yuklab olishda yozilsin* |
| `UZB-ADM2.geojson` SHA-256 | *yuklab olishda yozilsin* |

## Xaritada ko'rsatiladigan matn

Xarita quyidagi qatorni ko'rsatishi shart (Leaflet `attributionControl` yoki shunga teng joy):

```
Chegaralar: OCHA ROCCA / geoBoundaries (CC BY 3.0 IGO)
```

Shu qator `yadro/geo.js` ichida `MKB.geo.ATRIBUT` sifatida turadi — matnni ikki joyda
saqlamaslik uchun xarita o'sha qiymatni o'qisin.

## Yig'ish tartibi

1. **Tumanlar** to'g'ridan-to'g'ri ADM2 dan olindi.
2. **Hududlar** alohida yuklanmadi, tumanlarni birlashtirish (dissolve) yo'li bilan
   yasaldi. Sababi: ADM1 fayli boshqa manbadan (OpenStreetMap, 2017) kelgan va uning
   konturi ADM2 bilan bir necha joyda bir necha yuz metrga farq qiladi — ikkala qatlam
   birga chizilganda tuman chegaralari viloyat chegarasidan chiqib ketardi. Birlashtirish
   natijasida ikki qatlam bir-biriga aniq tushadi (tekshirildi: tumanlar yuzasi yig'indisi
   hududlar yuzasi yig'indisiga teng, birorta tuman o'z hududidan chiqmaydi).
3. **Soddalashtirish** topologiyani saqlab bajarildi: qo'shni tumanlarning umumiy chegarasi
   bitta yoy sifatida ajratilib, bir marta soddalashtirildi (Duglas-Peyker, dopusk 0.0003°,
   koordinatalar 5 xonagacha yaxlitlandi). Shuning uchun qo'shni poligonlar orasida yoriq
   yoki ustma-ust tushish yo'q. Nuqtalar soni 10 966 → 10 357.

## Kodlar

`kod` maydoni tizimda allaqachon ishlatiladigan kodlarga bog'langan
(`malumot.js` → `HUDUD_KODLAR`, filial kodlarining birinchi ikki harfi):

`QR XO BU NV SA QA SU JI SI TS TV NA AN FA`

O'n to'rttasi ham to'liq mos tushdi, mos kelmagani yo'q. `nom_uz` qiymatlari
`HUDUD_KODLAR[...].nom` bilan bir xil yozilgan (`Toshkent sh.`, `Farg'ona`,
`Qoraqalpog'iston`), shuning uchun `MKB.geo.kod(nom)` mavjud ma'lumotdagi nomlarni
to'g'ridan-to'g'ri taniydi.

Tuman kodi — `HUDUD-Tnn`, masalan `SA-T16` (Urgut tumani). Raqam hudud ichida `nom_uz`
bo'yicha alifbo tartibida beriladi. Filial kodlari (`SA-01`) bilan chalkashmaydi.

> **Kod raqami barqaror emas.** Manba yangilanib, hududga yangi tuman qo'shilsa yoki nom
> o'zgarsa, alifbo tartibi suriladi va undan keyingi hamma raqam boshqa tumanga o'tadi.
> Shuning uchun hujjatda ham, kodda ham uzoq muddatli bog'lanish uchun `nom_uz` ishlatilsin;
> bu faylda keltirilgan har bir kod faqat hozirgi nashrga tegishli.

## Xususiyatlar (properties)

Hududlar: `kod`, `nom_uz`, `nom_ru`, `daraja` (1), `toliq_uz`, `toliq_ru`,
`markaz` (`[lat, lng]`, poligon ichida yotadigan nuqta), `tumanlar` (soni).

Tumanlar: `kod`, `nom_uz`, `nom_ru`, `daraja` (2), `hudud` (ota hudud kodi), `markaz`.

Nomlar o'zbek lotinida, tizimdagi yozuv bilan bir xil — tutuq belgisi sifatida oddiy
apostrof (`Qo'qon shahri`, `Farg'ona tumani`). Ruscha nomlar rasmiy ko'rinishda
(`Ферганский район`, `город Коканд`), tarjima qatlamiga bog'lanmagan: xarita tilga qarab
`nom_ru` yoki `nom_uz` ni oladi.

## Manbadan chetlashishlar — ochiq ro'yxat

1. **Yangihayot tumani (`TS-T10`).** Manba 2020-yil holatini beradi va Toshkent shahrining
   janubi-g'arbidagi yerni hali `Urtachirchik` (Toshkent viloyati) tarkibida, shahardan
   uzilgan alohida bo'lak sifatida saqlaydi. Natijada Toshkent shahri konturida teshik
   paydo bo'lardi. Shu bo'lak manbadagi geometriyasini o'zgartirmagan holda alohida
   tumanga ajratildi va Toshkent shahriga biriktirildi, O'rtachirchiq tumani esa yaxlit
   qoldi. Boshqa hech qayerda geometriya qo'lda tahrir qilinmagan.
2. **Namangan viloyatidagi kichik teshik** (taxminan 40,91–41,01° N, 70,56–70,68° E,
   ~30 km²). Manbaning ikkala darajasida ham (ADM1 va ADM2) shu joy qoplanmagan.
   Ma'lumot to'qib chiqarilmadi — teshik qanday bo'lsa shundayligicha qoldirildi.
3. **Farg'ona viloyati to'rtta bo'lakdan iborat** — So'x va Shohimardon anklavlari
   manbada qanday bo'lsa shunday saqlandi, xato emas.
4. **Kogon shahri va tumani manbada almashib ketgan.** Manbada `Kagan` deb belgilangan
   birlik — 1,9 km² lik kichik anklav, `Kagan city` esa uni o'rab turgan 470 km² lik halqa.
   Haqiqatda aksincha: shahar — anklav, tuman — uni o'rab turgan hudud. Geometriya
   o'zgartirilmadi, faqat nom to'g'rilandi (`vositalar/geo/nomlar.py`). `qur.py` endi har
   yig'ishda tekshiradi: "… shahri" birligining yuzasi shu nomdagi "… tumani" birligidan
   katta bo'lsa, skript xato bilan to'xtaydi.
5. **Manbada bir nechta tuman yo'q.** Uchalasi ham manbaning 2020-yilgi kesimidan oldin
   tashkil etilgan, ya'ni bu manba sanasining emas, manba to'liqligining kamchiligi.
   Ma'lumot to'qib chiqarilmadi — yetishmagan birliklar shu yerda nom bilan yozildi:

   | Hudud | Faylda yo'q | Tashkil etilgan |
   |---|---|---|
   | Qoraqalpog'iston | Bo'zatov tumani | 2000 |
   | Surxondaryo | Bandixon tumani | 2016 |
   | Xorazm | Tuproqqal'a tumani | 2017 |

   Ta'siri yuzada ko'rinadi: Xorazmning fayldagi geodezik yuzasi rasmiy raqamdan sezilarli
   darajada kichik, qolgan hududlarda esa farq bir necha foizdan oshmaydi.
6. **Yigirma uchta shahar konturi dag'al.** Viloyat markazlari va kichik shaharlar manbada
   6 dan 19 gacha nuqta bilan berilgan (yonidagi tumanlar 100–300 nuqtali), yuzasi esa
   rasmiy raqamdan bir necha barobar kichik. Farq soddalashtirish dopuskidan emas, manbaning
   o'zidan: gbOpen ADM2 bu birliklar uchun shahar yadrosini beradi, ma'muriy chegarani emas.
   Kontur qo'lda tuzatilmadi. Ro'yxat (kod — nuqta soni — geodezik yuza, km²):

   `AN-T01` Andijon sh. 16/37,6 · `AN-T16` Xonobod sh. 6/0,8 · `BU-T05` Kogon sh. 6/1,9 ·
   `FA-T05` Farg'ona sh. 15/33,1 · `FA-T08` Marg'ilon sh. 12/16,8 · `FA-T11` Qo'qon sh. 14/46,6 ·
   `FA-T14` Quvasoy sh. 8/2,3 · `JI-T06` Jizzax sh. 17/30,8 · `NV-T04` Navoiy sh. 17/13,2 ·
   `NV-T10` Zarafshon sh. 7/2,5 · `QA-T11` Qarshi sh. 16/21,1 · `QR-T07` Nukus sh. 19/17,6 ·
   `SA-T04` Kattaqo'rg'on sh. 12/10,0 · `SI-T02` Guliston sh. 11/15,6 · `SI-T08` Shirin sh. 6/0,1 ·
   `SI-T11` Yangiyer sh. 9/0,5 · `SU-T12` Termiz sh. 14/15,4 · `TV-T02` Bekobod sh. 11/6,3 ·
   `TV-T07` Chirchiq sh. 13/15,1 · `TV-T10` Ohangaron sh. 9/0,6 · `TV-T12` Olmaliq sh. 16/13,8 ·
   `TV-T19` Yangiyo'l sh. 14/7,3 · `XO-T06` Urganch sh. 17/19,5

   Bu birliklar tuman masshtabida (zoom 8 dan) ko'rinadi; viloyat va mamlakat ko'rinishida
   ular umuman chizilmaydi, shuning uchun kengash ko'radigan ekranlarga ta'sir qilmaydi.

## Tuman soni: fayl va rasmiy reyestr

Faylda hudud bo'yicha nechta ikkinchi darajali birlik borligi va uning geodezik yuzasi.
"Rasmiy" ustuni faqat yuqorida tekshirilgan uchta hudud uchun to'ldirilgan; qolganlari
rasmiy reyestr bo'yicha tasdiqlanishi kerak.

| Hudud | Faylda | Rasmiy | Geodezik yuza, km² |
|---|---|---|---|
| Qoraqalpog'iston | 15 | 16 | 166 034 |
| Xorazm | 12 | 13 | 5 276 |
| Buxoro | 13 | — | 38 576 |
| Navoiy | 10 | — | 115 538 |
| Samarqand | 16 | — | 16 562 |
| Qashqadaryo | 15 | — | 27 971 |
| Surxondaryo | 14 | 15 | 19 593 |
| Jizzax | 13 | — | 21 500 |
| Sirdaryo | 11 | — | 4 669 |
| Toshkent sh. | 12 | — | 363 |
| Toshkent vil. | 22 | — | 15 342 |
| Namangan | 12 | — | 7 495 |
| Andijon | 16 | — | 4 348 |
| Farg'ona | 19 | — | 6 975 |
| **Jami** | **200** | — | **450 243** |

Chegaralar qaysi yil holatiga ekani (2020) xaritaning yon panelida ham yozilgan, toki
kengashda savol tug'ilganda javob ekranda tursin.

## Qayta yig'ish

Fayllarni qaytadan yasaydigan uchta skript `vositalar/geo/` papkasida turadi — statik
daraxtdan tashqarida, shuning uchun ular tashqi manzildan umuman berilmaydi.

| Fayl | Nima qiladi |
|---|---|
| `vositalar/geo/nomlar.py` | manbadagi 200 ta inglizcha nomni o'zbekcha/ruscha nomga va hudud kodiga bog'laydigan jadval |
| `vositalar/geo/arclib.py` | topologiyani saqlab soddalashtirish: umumiy chegarani yoyga ajratadi, bir marta soddalashtiradi, poligonlarni qayta yig'adi |
| `vositalar/geo/qur.py` | ikkala `.geojson` faylini yozadi va nazoratdan o'tkazadi |

Tartib: manba faylini yuqoridagi havoladan olib `vositalar/geo/manba/UZB-ADM2.geojson` ga
qo'yiladi, so'ng `python vositalar/geo/qur.py` ishga tushiriladi (`shapely` kerak). Natija
`assets/geo/` ga yoziladi. Boshqa dopusk kerak bo'lsa: `python vositalar/geo/qur.py 0.0005 5`.

Skript yozishdan oldin ikki nazoratni bajaradi: halqa yo'nalishini RFC 7946 ga keltiradi
(tashqi halqa soat yo'nalishiga teskari, ichki halqa soat yo'nalishi bo'yicha) va "… shahri"
birligi o'z "… tumani" idan katta bo'lib qolmaganini tekshiradi.

Natija `tests/geo.test.js` bilan tekshiriladi: obyektlar soni, kod formati, kodlarning
`HUDUD_KODLAR` bilan mosligi, geometriya yaxlitligi, markazlarning o'z poligoni ichida
yotishi va yuqoridagi ikki nazorat shu yerda qayta o'lchanadi.

Jadvalda manbadagi 200 ta nomning hammasi bor — ortiqcha ham, yetishmaydigan ham yo'q;
skript nomni topa olmasa xato bilan to'xtaydi.

## Server

`server/server.js` chegara fayllarini `application/geo+json` turi bilan va gzip bilan
beradi: 476 KB o'rniga tarmoqdan 132 KB o'tadi. Filialning tor kanalida bu sezilarli.
