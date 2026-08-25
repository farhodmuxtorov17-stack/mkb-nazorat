# Aktivlar nazorati tizimi — arxitektura

Mikrokreditbank muammoli aktivlar bo'limi uchun to'liq ish tizimi:
muddati o'tgan kreditdan obyekt realizatsiyasigacha bo'lgan butun jarayon
bitta oynada. 126 ekran, 16 modul, rolga qat'iy bog'langan kirish.

## 1. Texnik qatlamlar

### Frontend (statik, yig'uvchisiz)
| Fayl | Vazifasi |
|---|---|
| `yadro/app.css` | Dizayn tizimi: tokenlar, komponentlar, holatlar |
| `yadro/app.js` | Qobiq: relsa-navigatsiya, sarlavha, RBAC, i18n, jadval/forma dvijoklari |
| `yadro/api.js` | Ma'lumot xizmati: server bo'lsa REST, bo'lmasa snapshot + localStorage |
| `yadro/ikonlar.js` | Solar ikonkalar sprayti (75 ta, CC BY 4.0) |
| `malumot.js` | Yagona ma'lumot manbai (snapshot) + `moslikTekshiruvi()` invariantlari |
| `tarjima.js` | UZ→RU lug'ati; kalit = DOM matni |
| `assets/` | Shriftlar (Satoshi, Cabinet Grotesk, JetBrains Mono), foto, xarita kutubxonasi |

Sahifalar — tekis ro'yxat, modul prefiksi bilan (`obyekt-*.html`,
`korik-*.html`, `hisobot-*.html`…). Ro'yxat: `docs/EKRANLAR.md`.

### Backend (server/)
`server/server.js` — sof Node.js (tashqi paketsiz):
- statika + REST `/api/*`;
- JSON-omborlar `server/malumotlar/*.json` (yozuvlar diskka saqlanadi);
- sessiya tokenlari (`/api/kirish`), rol tekshiruvi har so'rovda;
- har o'zgarish `amallar` jurnaliga tushadi.

Ishga tushirish:
```
node server/server.js
```
So'ng `http://localhost:8790`. GitHub Pages'da server yo'q — `api.js`
avtomatik snapshot rejimiga o'tadi, o'zgarishlar brauzer omborida saqlanadi
(demo uchun to'liq ishlaydi, ma'lumot yo'qolmaydi).

## 2. Biznes-jarayon (asosiy oqim)

```
Muddati o'tgan kredit
  └─ Muammoli deb belgilash (portfel)
      └─ Undiruv: ogohlantirish → da'vo → sud → qaror → ijro
          └─ Balansga qabul (musodara / ixtiyoriy topshirish) — dalolatnoma
              └─ Saqlash va nazorat: ko'rik · sug'urta · qayta baholash ·
                 tasnif-zaxira · xarajatlar hisobi
                  └─ Realizatsiya: to'g'ridan-to'g'ri savdo / auksion / ijara
                      └─ Chiqim (sotildi / hisobdan chiqarildi) → Arxiv
```

Har bosqich o'z modulida, obyekt esa `AK-YYYY/NNNN` raqami bilan butun
zanjir bo'ylab kuzatiladi. Qoplash foizi (aktiv bahosi / qarz) — tizimning
markaziy ko'rsatkichi, hamma joyda halqa-indikator bilan.

## 3. Modullar xaritasi

| # | Modul | Prefiks | Ekranlar | Asosiy rollar |
|---|---|---|---|---|
| A | Kirish va xatolar | kirish, xato- | 5 | hamma |
| B | Boshqaruv paneli | panel | 7 | rolga mos |
| C | Portfel (qarzdorlar) | qarzdor-, shartnoma- | 11 | kredit, filial, admin |
| D | Aktivlar reyestri | obyekt-, qabul- | 14 | aktiv, filial, admin |
| E | Yuridik (undiruv) | ish-, sud-, ijro- | 11 | yurist, admin |
| F | Ko'rik | korik- | 9 | aktiv, filial |
| G | Baholash | baholash- | 6 | aktiv, tavakkal |
| H | Sug'urta | sugurta- | 5 | aktiv |
| I | Tasnif va zaxira | tasnif-, zaxira- | 5 | tavakkal, filial |
| J | Realizatsiya | savdo-, lot, auksion-, ijara- | 14 | aktiv, admin |
| K | Arxiv | arxiv- | 3 | hamma (o'qish) |
| L | Hisobotlar | hisobot- | 12 | rolga mos |
| M | Xarita | xarita- | 2 | aktiv, filial, admin |
| N | Vazifalar | vazifa-, tasdiq- | 6 | hamma |
| O | Hujjatlar | hujjat- | 5 | hamma |
| P | Sozlamalar | sozlama-, foydalanuvchi- | 11 | admin (qisman hamma) |

## 4. Rollar (RBAC)

6 rol: `admin · filial · kredit · aktiv · yurist · tavakkal`.
Har sahifa `<body data-sahifa="...">` bo'lim belgisiga ega; `app.js`
ruxsatni `ROL_RUXSAT` matritsasi bo'yicha tekshiradi: relsada faqat ruxsatli
bo'limlar, ruxsatsiz URL → `xato-403.html`. Server tomonida xuddi shu
matritsa REST darajasida takrorlanadi (ikki qavatli himoya).

## 5. REST kontrakt (qisqa)

```
POST /api/kirish              {login, parol} → {token, rol}
GET  /api/yozuvlar            portfel yozuvlari (filtr: bosqich, filial, q)
GET  /api/yozuvlar/:id        bitta yozuv (obyekt kartochkasi)
PATCH/api/yozuvlar/:id        maydon yangilash (bosqich, mas'ul...)
GET  /api/koriklar · POST /api/koriklar        ko'rik rejasi / yangi akt
GET  /api/polislar · PATCH /api/polislar/:id   sug'urta
GET  /api/takliflar · POST /api/takliflar      auksion takliflari
GET  /api/vazifalar · PATCH /api/vazifalar/:id
GET  /api/amallar             amallar tarixi (faqat admin)
GET  /api/lugat               ma'lumotnomalar
```
To'liq ro'yxat: `docs/API.md`. Frontend hech qachon to'g'ridan-to'g'ri
fetch chaqirmaydi — faqat `MKBapi.*` orqali (bitta nuqta, ikki rejim).

## 6. Sifat nazorati

- `node tests/malumot.test.js` — ma'lumot invariantlari;
- `node tests/server.test.js` — REST tekshiruvi;
- `docs/qa-harness.html` — barcha ekranlarni yuklab konsol/o'lcham nazorati;
- rol smoke: har rol uchun ruxsat chegaralari;
- konsol tozaligi: har ekran `?chk=` belgisi bilan xatosiz ochilishi shart.
