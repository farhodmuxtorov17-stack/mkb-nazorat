# Uchinchi tomon komponentlari va litsenziyalari

Tizim ichida turgan tashqi kutubxonalar, shriftlar va ma'lumot to'plamlari. Har biri
repoda saqlanadi — ishlash uchun tashqi serverga chiqish talab qilinmaydi. Ushbu fayl
bankka yetkazib berish to'plamiga kiradi.

## Dasturiy kutubxona

### Leaflet 1.9.4

- Joyi: `assets/vendor/leaflet/`
- Litsenziya: **BSD 2-Clause** — to'liq matni `assets/vendor/leaflet/LICENSE`
- Mualliflik huquqi: (c) 2010–2023 Volodymyr Agafonkin, (c) 2010–2011 CloudMade
- Sayti: https://leafletjs.com
- Shart: tarqatishda mualliflik yozuvi, shartlar ro'yxati va javobgarlikdan voz kechish
  bandi birga borishi kerak. Shuning uchun `LICENSE` fayli kutubxona yonida turadi.

Leaflet tarmoqqa o'zi chiqmaydi: plitka manzili berilmasa, u faqat repodagi vektor
geometriyani chizadi.

## Chegara ma'lumotlari

### O'zbekiston ma'muriy chegaralari (ADM1, ADM2)

- Joyi: `assets/geo/hududlar.geojson`, `assets/geo/tumanlar.geojson`
- Manba: **geoBoundaries, gbOpen release, UZB ADM2**; boshlang'ich manba — **OCHA ROCCA**
- Litsenziya: **Creative Commons Attribution 3.0 IGO (CC BY 3.0 IGO)**
  https://creativecommons.org/licenses/by/3.0/igo/
- Chegaralar qaysi yil holatiga: **2020**
- Xaritada ko'rsatiladigan qator: `Chegaralar: OCHA ROCCA / geoBoundaries (CC BY 3.0 IGO)`
- geoBoundaries loyihasi so'raydigan qo'shimcha havola: "Administrative boundaries courtesy
  of geoBoundaries.org" — https://www.geoboundaries.org
- To'liq iqtibos: Runfola, D. et al. (2020) *geoBoundaries: A global database of political
  administrative boundaries.* PLoS ONE 15(4): e0231866.
  https://doi.org/10.1371/journal.pone.0231866

Yig'ish tartibi, manbadan chetlashishlar va nazorat yig'indilari: `assets/geo/MANBA.md`.

## Shriftlar

| Shrift | Joyi | Litsenziya |
|---|---|---|
| Manrope (400/500/600/700) | `assets/fonts/manrope-*.woff2` | SIL Open Font License 1.1 |
| Outfit (400/500/600/700) | `assets/fonts/outfit-*.woff2` | SIL Open Font License 1.1 |

SIL OFL 1.1 shriftni ilovaga qo'shib tarqatishga ruxsat beradi; shart — shrift fayllari
sotilmasin va o'zgartirilgan nusxa boshqa nom bilan chiqsin. Ikkala shrift ham
o'zgartirilmagan holda, Google Fonts nashridan olingan ko'rinishda turadi.

## Rasmlar

| Fayllar | Manba | Litsenziya |
|---|---|---|
| `assets/namuna/*.webp` (61 surat va eskizlari) | Wikimedia Commons | CC BY, CC BY-SA, CC0 va jamoat mulki; har surat muallifi va litsenziyasi `assets/namuna/MANBA.md` da, ekranda surat yonida chiqadi |
| `assets/xodim_*.webp` | loyihaning o'z chizmasi: yuzsiz siluet | cheklovsiz |
| `assets/yordam/*.webp` | tizimning o'z ekranlari, namoyish ma'lumotida | cheklovsiz |

Namoyish suratlari faqat shartli reyestrda ishlatiladi, bank obyektini ko'rsatmaydi.

## Jonli ochiq manbalar

Monitoring markazidagi "Ulanish namunasi" kartasi, qurilma va obyekt sahifasidagi
ob-havo bloki tugma bosilgandagina internetga chiqadi. Ularning hech biri bank obyekti
emas va tashqariga bank ma'lumotini yubormaydi. Batafsil: `assets/jonli/MANBA.md`,
kameralar ro'yxati `assets/jonli/kameralar.json`.

| Manba | Nima olinadi | Shart |
|---|---|---|
| Open-Meteo | harorat, bulut, quyosh nurlanishi, shamol, yog'in | ma'lumot CC BY 4.0; bepul API tijoriy bo'lmagan foydalanish uchun, bankda pullik kalit yoki o'z serveri kerak |
| NASA POWER | oylik o'rtacha quyosh nurlanishi | erkin foydalaniladi, manba ko'rsatiladi |
| USGS, Kīlauea kameralari | ikki kamera kadri (JPEG) | AQSh jamoat mulki, manba ko'rsatiladi |
| test.mosquitto.org, zaxira broker.emqx.io | MQTT sinov xabari | ommaviy sinov brokerlari, kafolatsiz; xabarda bank ma'lumoti yo'q |

Himoyasiz qolgan yoki qidiruvda topilgan kameralar ishlatilmaydi: bu ruxsatsiz kirish.

## O'zimiz yozgan qismlar

SHA-256 (`boshqaruv.js`, `yadro/dalolatnoma.js`), QR kod (`yadro/dalolatnoma.js`),
.xlsx o'qish va yozish (`yadro/jadval-fayl.js`) va MQTT 3.1.1 mijozi (`yadro/jonli.js`)
uchinchi tomon kodisiz, ochiq standartlar bo'yicha yozilgan: FIPS 180-4, ISO/IEC 18004,
ECMA-376, OASIS MQTT 3.1.1. "QR Code" DENSO WAVE INCORPORATED ning ro'yxatdan
o'tgan tovar belgisi.

## Nimaga bog'lanmagan

Asosiy ish uchun tizim hech qanday tashqi CDN, plitka serveri yoki shrift serveriga
murojaat qilmaydi: kutubxona, shrift, chegara va suratlar repoda turadi. Tashqariga
faqat yuqoridagi jonli ochiq manbalar chiqadi va faqat foydalanuvchi tugmani bosganda;
tarmoq yopiq bo'lsa blok "Internet yo'q" deb yozadi, sahifaning qolgan qismi ishlaydi.
Xaritadagi ixtiyoriy ko'cha qatlami faqat sozlamalarda ichki plitka serveri manzili
ko'rsatilgandagina paydo bo'ladi (`sozlamalar.html`); manzil bo'sh bo'lsa tugma umuman
chiqmaydi.
