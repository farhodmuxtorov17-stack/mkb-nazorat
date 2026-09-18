/* ---------------------------------------------------------------------------
   taqdimot-manba.js — loyiha taqdimoti uchun tashqi ma'lumot bazasi.

   Bu fayldagi har bir raqam va nom tashqi manbadan olingan. Har bandda:
     manba   — manba havolasi (bo'sh bo'lsa, qiymat hisob-kitob natijasi)
     ishonch — "tasdiqlangan" (manba ochilib tekshirilgan) | "taxminiy" (hisob yoki
               ikkilamchi manba) | "soralsin" (rasmiy so'rov talab qiladi)

   Narxlar 2026-yil sentabr holatiga. Kurs va narxlar o'zgarganda faqat shu fayl
   yangilanadi, taqdimot sahifasiga tegilmaydi.
   --------------------------------------------------------------------------- */
(function () {
  "use strict";

  /* === Quyosh insolyatsiyasi. NASA POWER, 2001–2020 klimatologiyasi.
     kWh/m² kuniga, gorizontal yuzaga. Dekabr — hisob nuqtasi. ================= */
  const INSOLYATSIYA = {
    "Toshkent":  {lat: "41.31N", oy: [1.90, 2.62, 3.57, 4.86, 6.30, 7.60, 7.48, 6.66, 5.20, 3.44, 2.19, 1.62]},
    "Samarqand": {lat: "39.65N", oy: [1.96, 2.68, 3.62, 4.88, 6.35, 7.62, 7.51, 6.74, 5.31, 3.55, 2.32, 1.78]},
    "Nukus":     {lat: "42.46N", oy: [1.71, 2.45, 3.44, 4.74, 6.28, 7.32, 7.24, 6.32, 4.86, 3.12, 1.94, 1.56]},
  };
  const OYLAR = ["Yan", "Fev", "Mar", "Apr", "May", "Iyn", "Iyl", "Avg", "Sen", "Okt", "Noy", "Dek"];

  /* === Jihoz katalogi ====================================================== */
  const JIHOZ = [
    {
      kalit: "kam-pro", guruh: "kamera", nom: "Hikvision DS-2XS6A47G1-IZS/C36S80",
      tavsif: "To'liq avtonom professional to'plam: 4 MP, 8–32 mm motorli obyektiv, 80 Vt panel va 360 Vt·soat batareya bir korpusda. Odam va transportni ajratadi.",
      qish: "-20 °C gacha", asos: "Katta perimetr, bitta ustunda butun hovlini qoplaydi",
      narxUSD: 2032, narxIzoh: "AQSh sotuvchisi narxi; O'zbekistonga olib kelish, bojxona va o'rnatish bilan ≈2 600–3 000 $",
      manba: "https://www.surveillance-video.com/camera-ds-2xs6a47g1-izs-c36s80-8-32mm.html", ishonch: "tasdiqlangan",
    },
    {
      kalit: "kam-eb8", guruh: "kamera", nom: "EZVIZ EB8 4G",
      tavsif: "2K aylanuvchi kamera, 10 400 mAh batareya, PIR datchik va odam aniqlash. microSD 512 GB gacha — aloqa uzilsa yozuv joyda saqlanadi.",
      qish: "-20 °C gacha", asos: "O'rta qiymatli obyekt, bitta kirish va hovli",
      narxUZS: 1930870, narxIzoh: "olx.uz e'loni, kelishiladi",
      manba: "https://www.ezviz.com/product/eb8+4g/46565", ishonch: "tasdiqlangan",
    },
    {
      kalit: "kam-imou", guruh: "kamera", nom: "Imou Cell PT 4G",
      tavsif: "3 MP aylanuvchi kamera, iste'moli 3,5 Vt dan kam — ro'yxatdagi eng tejamkori. Zavod to'plamidagi 3 Vt panel qishga yaramaydi, 30 Vt ga almashtiriladi.",
      qish: "-20 °C gacha", asos: "Kichik obyekt, quvvat tanqis joy",
      narxUSD: 150, narxIzoh: "Yevropa distribyutori narxi (112,50 € QQSsiz), O'zbekiston narxi so'ralsin",
      manba: "https://www.wifi-stock.com/details/imou-3mp-h-265-4g-battery-camera-cell-pt-4g-solar-panel-ipc-k9ep-3t0te-eu.html", ishonch: "taxminiy",
    },
    {
      kalit: "kam-yoq", guruh: "kamera", nom: "Reolink Go PT Ultra — tanlanmadi",
      tavsif: "4K, kuchli analitika, arzon. Ammo ishlash harorati -10 °C gacha, O'zbekiston qishida ishlamay qolishi mumkin. Shu sabab ro'yxatdan chiqarildi.",
      qish: "-10 °C — yaroqsiz", asos: "Tanlanmagan variant, taqqoslash uchun",
      narxUSD: 0, narxIzoh: "Narx emas, rad etish sababi muhim",
      manba: "https://reolink.com/product/reolink-go-pt-ultra/", ishonch: "tasdiqlangan", rad: true,
    },
    {
      kalit: "panel", guruh: "quvvat", nom: "Monokristall panel 550–575 Vt",
      tavsif: "Longi Hi-Mo X6 575 Vt yoki MaxProduct 560 Vt. Vatt narxi 0,12–0,15 $ — smetaning eng arzon qismi, shuning uchun quvvatni qisqartirish mantiqsiz.",
      qish: "Dekabrda nominal quvvatning ≈22% i", asos: "Har to'plamda, dekabr hisobiga ko'ra 1–3 dona",
      narxUZS: 1008000, narxIzoh: "Longi 575 Vt, QQS bilan (Sunrise Info); MaxProduct 560 Vt — 800 000 so'm",
      manba: "https://sunriseinfo.uz/PV-Panels", ishonch: "tasdiqlangan",
    },
    {
      kalit: "mppt", guruh: "quvvat", nom: "SRNE MPPT kontroller 20–30 A",
      tavsif: "Qishda MPPT oddiy PWM kontrollerga nisbatan 20–30% ko'proq energiya oladi: sovuqda panel kuchlanishi ko'tariladi va aynan shu ortiqchani MPPT foydaga aylantiradi.",
      qish: "Qishki tanqislikda hal qiluvchi", asos: "Har to'plamda 1 dona",
      narxUZS: 995020, narxIzoh: "ML2420 20 A; 30 A varianti — 1 607 340 so'm. Omborda bor-yo'qligi aniqlanishi kerak",
      manba: "https://www.prom.uz/section/solnechnye-kontrollery/", ishonch: "tasdiqlangan",
    },
    {
      kalit: "akb", guruh: "quvvat", nom: "LiFePO4 12 V 100 A·soat, past harorat himoyasi bilan",
      tavsif: "6 000 sikl resursi. Aylantirilgan har kilovatt-soat narxi gel akkumulyatordan qariyb olti barobar arzon. Shartnomada 0 °C dan past haroratda zaryadlashni to'xtatuvchi BMS majburiy talab.",
      qish: "Ishlash -20 °C; zaryad 0 °C dan yuqorida", asos: "Smetaning eng katta qatori — tejash faqat iste'molni kamaytirish orqali",
      narxUZS: 4322500, narxIzoh: "Rongke RK 12V100Ah (vidcom.uz). Gel muqobili 2,8–3,3 mln so'm, lekin resursi qisqa",
      manba: "https://vidcom.uz/shop/energosistemy/akkumulyatornye-batarei/rk-12v100ah-las-lifepo4", ishonch: "tasdiqlangan",
    },
    {
      kalit: "yongin", guruh: "datchik", nom: "Ajax FireProtect 2 RB",
      tavsif: "Simsiz tutun, issiqlik va is gazi datchigi, o'z batareyasida ishlaydi. Elektr uzilgani yong'in xavfsizligi majburiyatini bekor qilmaydi — bu qator huquqiy talabni ham yopadi.",
      qish: "Batareyada, tarmoqqa bog'liq emas", asos: "Bino ichida, har 60–80 m² ga 1 dona",
      narxUZS: 909000, narxIzoh: "Bazaviy variant; ko'p sensorli variant 1 419 000 so'm (asaxiy.uz)",
      manba: "https://asaxiy.uz/product/dlya-doma/bezopasnost/page=2", ishonch: "tasdiqlangan",
    },
    {
      kalit: "harakat", guruh: "datchik", nom: "Ajax MotionCam Outdoor",
      tavsif: "Fotosuratli harakat datchigi: signal bilan birga surat yuboradi, shuning uchun navbatchi chiqishdan oldin nima bo'lganini ko'radi.",
      qish: "Tashqi muhitga mo'ljallangan", asos: "Perimetr va kirish yo'llari",
      narxUZS: 2759000, narxIzoh: "Tashqi variant; ichki MotionCam — 1 409 000 so'm",
      manba: "https://asaxiy.uz/product/dlya-doma/bezopasnost/datchiki-dvizheniya-i-otkrytiya-dverei", ishonch: "tasdiqlangan",
    },
    {
      kalit: "eshik", guruh: "datchik", nom: "Ajax DoorProtect",
      tavsif: "Eshik va deraza ochilishini qayd etadi. Obyektda odatda 4–10 dona qo'yiladi.",
      qish: "Batareyada", asos: "Har kirish nuqtasiga",
      narxUZS: 409000, narxIzoh: "Plus varianti 619 000 – 659 000 so'm",
      manba: "https://asaxiy.uz/product/dlya-doma/bezopasnost/datchiki-dvizheniya-i-otkrytiya-dverei", ishonch: "tasdiqlangan",
    },
    {
      kalit: "suv", guruh: "datchik", nom: "Ajax LeaksProtect",
      tavsif: "Suv bosishi datchigi. Tijorat mulki da'volarining ikkinchi eng ko'p sababi — suv zarari, bo'sh binoda oqish kunlab sezilmaydi.",
      qish: "Batareyada", asos: "Yerto'la, quvur o'tgan joylar",
      narxUZS: 569000, narxIzoh: "asaxiy.uz; buyurtma muddati aniqlanishi kerak",
      manba: "https://www.ajax-systems.uz/products/leaksprotect/", ishonch: "tasdiqlangan",
    },
    {
      kalit: "treker", guruh: "datchik", nom: "Teltonika FMB920 / TAT140",
      tavsif: "Transport va maxsus texnika uchun GPS treker. TAT140 — o'z batareyasida yillab ishlaydigan avtonom variant, quvvat manbaiga ulanmaydi.",
      qish: "Avtonom", asos: "Balansdagi har bir transport va texnika birligi",
      narxUZS: 550000, narxIzoh: "FMB920 (olx.uz); TAT140 ≈ 66–131 € — olib kelishda 1,3–1,5 barobar oshadi",
      manba: "https://glotr.uz/gps-treker-teltonika-fmb920-p722830/", ishonch: "tasdiqlangan",
    },
    {
      kalit: "nvr", guruh: "markaz", nom: "Mahalliy yozuv serveri (NVR)",
      tavsif: "Yuz tanish yoqilganda biometrik ma'lumot O'zbekiston hududida saqlanishi shart. Shu sabab xorijiy bulut o'rniga bankning o'z serveri smetaga majburiy qator sifatida kiradi.",
      qish: "Bank serverxonasida", asos: "Butun tizimga bitta, obyektga emas",
      narxUSD: 0, narxIzoh: "Bank infratuzilmasida joylashadi; qiymat IT bo'limi bilan aniqlanadi",
      manba: "https://lex.uz/docs/-4396419", ishonch: "soralsin",
    },
  ];

  /* === Yetkazib beruvchi va o'rnatuvchilar ================================= */
  const SHERIK = [
    {
      nom: "SAT Solutions (Supply and Transportation MChJ)", turi: "ornatuvchi", shahar: "Toshkent",
      meta: "STIR 308603912 · +998 97 862 66 99",
      tavsif: "Dahua ning O'zbekistondagi rasmiy tizim integratori, Hikvision va 30+ brend bo'yicha avtorizatsiya. Qo'riqlash va yong'in xavfsizligi litsenziyalariga ega. Saytida aynan avtonom 4G kameralar yechimi e'lon qilingan. Referens: Uzum ning 100+ punktli tarmog'i.",
      manba: "https://satsolutions.uz/en", ishonch: "tasdiqlangan",
    },
    {
      nom: "uzhikvision.uz — Hikvision rasmiy distribyutori", turi: "yetkazuvchi", shahar: "Toshkent",
      meta: "+998 99 213 48 63 · Chilonzor, Arnasoy 76",
      tavsif: "Rasmiy kanal, kafolat va hujjat bilan. Diqqat: katalogda quyosh va 4G liniyasi ko'rsatilmagan — bu modellarni rasmiy olib kela oladimi, smeta tuzishdan oldin so'ralishi shart.",
      manba: "https://uzhikvision.uz/en/", ishonch: "tasdiqlangan",
    },
    {
      nom: "uzdahua.uz — Dahua rasmiy distribyutori", turi: "yetkazuvchi", shahar: "Toshkent",
      meta: "Ikkinchi rasmiy kanal",
      tavsif: "Tenderda kamida ikkita rasmiy yetkazuvchi bo'lishi narxni sezilarli tushiradi. Dahua tarafida ham quyosh va 4G liniyasi bor, katalogda aniqlashtirilishi kerak.",
      manba: "https://uzdahua.uz/en/", ishonch: "taxminiy",
    },
    {
      nom: "Videonablyudeniya.uz", turi: "ornatuvchi", shahar: "Toshkent va viloyatlar",
      meta: "+998 90 117 22 33",
      tavsif: "Kalit topshirish tartibida montaj. Saytida internet yo'q joylar uchun SIM-kartali 4G va quyosh batareyali tizimlar ochiq e'lon qilingan. Smetada jihoz va ish haqi alohida ko'rsatiladi. Markazlashtirilgan 24/7 kuzatuv xizmati yo'q.",
      manba: "https://videonablyudeniya.uz/uz/", ishonch: "tasdiqlangan",
    },
    {
      nom: "Sunrise Info Technologies", turi: "yetkazuvchi", shahar: "Toshkent",
      meta: "Longi, Jinko, Trina panellari",
      tavsif: "Quyosh panellari ombordan. Longi 575 Vt — 1 008 000 so'm, Jinko 560 Vt — 1 355 200 so'm, Trina 665 Vt — 1 625 120 so'm.",
      manba: "https://sunriseinfo.uz/PV-Panels", ishonch: "tasdiqlangan",
    },
    {
      nom: "MaxProduct", turi: "yetkazuvchi", shahar: "Toshkent",
      meta: "+998 98 338-08-08 · Mirzo Ulug'bek 25",
      tavsif: "560 Vt panel 800 000 so'mdan — topilgan takliflar ichida eng arzon vatt narxi. Firma asosan qurilish panellari bilan shug'ullanadi, kafolat va servis shartlari alohida tekshirilishi kerak.",
      manba: "https://maxproduct.uz/products/colnechnye-paneli/", ishonch: "tasdiqlangan",
    },
    {
      nom: "IIV huzuridagi Qo'riqlash departamenti", turi: "qoriqlash", shahar: "Butun respublika",
      meta: "Yagona qonuniy markazlashtirilgan kuzatuv kanali",
      tavsif: "Qonunga ko'ra shartnoma asosida qo'riqlash xizmatini faqat davlat organlari ko'rsatadi, xususiy kompaniyalar bu faoliyatni amalga oshira olmaydi. Departament trevoga tugmasi, yong'in signalizatsiyasi va telefon aloqasi yo'q hududlarda GSM kanali orqali qo'riqlashni taklif qiladi. 2025-yil noyabrda xizmat Milliy gvardiyadan IIV ga o'tkazildi.",
      manba: "https://qbb.uz/oz/menu/istorija-ministerstva", ishonch: "tasdiqlangan",
    },
    {
      nom: "WCCTV / WJ Sunstone — ijara modeli", turi: "model", shahar: "Xalqaro amaliyot",
      meta: "Jihozni sotib olish emas, ijaraga olish",
      tavsif: "Britaniyada bo'sh mulkni qo'riqlashning standart yechimi — ko'chma quyosh CCTV minorasini ijaraga olish. Minora 20 daqiqada ishga tushadi, obyekt sotilgach keyingisiga ko'chiriladi. Bank uchun bu kapital xarajat o'rniga oylik xizmat haqi degani.",
      manba: "https://www.wcctv.co.uk/our-sectors/vacant-property-security/", ishonch: "tasdiqlangan",
    },
  ];

  /* === Aloqa: operator tariflari ========================================== */
  const ALOQA = [
    {nom: "Ucell «M2M Humo»", narx: 9500, birlik: "so'm/oy", izoh: "Bitta SIM, limitdan tashqari 1 MB = 250 so'm",
     manba: "https://ucell.uz/uz/corporate/tariffs/m2mhumo", ishonch: "tasdiqlangan"},
    {nom: "Ucell «TREKER»", narx: 15500, birlik: "so'm/oy", izoh: "2 GB kiritilgan — kamera uchun mos",
     manba: "https://ucell.uz/uz/corporate_tech_alerts/news_m2m_post", ishonch: "tasdiqlangan"},
    {nom: "Uzmobile M2M", narx: 10000, birlik: "so'm/oy", izoh: "500 MB; UZCARD GSM va HUMO GSM tariflari ham shu darajada",
     manba: "https://uztelecom.uz/en/for-business/mobile-communication-2/gsm/tariffs/m2m-series-of-tariff-plans/", ishonch: "tasdiqlangan"},
    {nom: "Uzmobile VPN paketi, 3 GB", narx: 28800, birlik: "so'm/oy", izoh: "Yopiq kanal; 500 MB — 12 000, 12 GB — 60 000 so'm",
     manba: "https://uztelecom.uz/uz/biznesga/mobil-aloqa/gsm/paketlar/sms/internet/vpn/", ishonch: "tasdiqlangan"},
    {nom: "Beeline «Doimiy IP»", narx: 25260, birlik: "so'm/oy", izoh: "Statik IP va yopiq APN, trafik alohida",
     manba: "https://b2b.beeline.uz/uz/products/services/fixed-ip", ishonch: "tasdiqlangan"},
    {nom: "Beeline M2M 5 GB", narx: 21892, birlik: "so'm/30 kun", izoh: "1 GB — 8 841, 10 GB — 34 943 so'm; sarflanmagan trafik keyingi davrga o'tadi",
     manba: "https://b2b.beeline.uz/uz/products/services/internet-pakety-na-30-dney", ishonch: "tasdiqlangan"},
  ];

  /* === Huquqiy asos ======================================================== */
  const HUQUQ = [
    {
      kod: "MB", nom: "Balansdagi mulk bir yil ichida sotilmasa, aktiv «umidsiz» deb tasniflanadi",
      tana: "Markaziy bankning aktivlar sifatini tasniflash nizomi 20-bandiga ko'ra garov hisobidan undirilgan ko'chmas mulk balansga olingan kundan bir yil ichida sotilmasa, u <strong>«umidsiz» toifasiga o'tadi va 100% zaxira talab qiladi</strong>. Nazorat tizimining iqtisodiy asosi shu: bu qo'riqlash xarajati emas, zaxira xarajatini kamaytirish vositasi.",
      manba: "https://lex.uz/mact/-2703053", ishonch: "tasdiqlangan", belgi: "ok",
    },
    {
      kod: "PQ-142", nom: "Davlat banklari balansdagi mulkni auksionsiz, to'g'ridan-to'g'ri sotishi mumkin",
      tana: "2025-yil 1-maydan ustav kapitalida davlat ulushi 50% va undan yuqori banklarga qarz evaziga olingan mulkni bozor qiymatida to'g'ridan-to'g'ri sotish huquqi berilgan. Hujjatda 2025–2026-yillarda kamida 4 trln so'mlik muammoli aktivni sotish maqsadi qo'yilgan. Kredit tashkilotlarida ~3 000 ta shunday aktiv bor — ya'ni raqobat katta va obyekt qanchalik ko'rsatishga tayyor bo'lsa, shuncha tez ketadi.",
      manba: "https://lex.uz/docs/-7479146", ishonch: "tasdiqlangan", belgi: "ok",
    },
    {
      kod: "O'RQ-778", nom: "Xususiy qo'riqlash kompaniyasini yollash mumkin emas",
      tana: "«Qo'riqlash faoliyati to'g'risida»gi Qonunning 9 va 13-moddalariga ko'ra shartnoma asosida qo'riqlash xizmatini faqat davlat organlari ko'rsatadi; xorijiy va xususiy shaxslar bu faoliyatni amalga oshira olmaydi. <strong>Markazlashtirilgan kuzatuv bo'yicha yagona qonuniy sherik — IIV huzuridagi Qo'riqlash departamenti.</strong> Bu loyihaning sherik tanlash bo'limini butunlay belgilaydi.",
      manba: "https://lex.uz/docs/-6066682", ishonch: "tasdiqlangan", belgi: "ogoh",
    },
    {
      kod: "O'RQ-1125", nom: "Yuz tanish yoqilsa, ma'lumot O'zbekistonda saqlanishi shart",
      tana: "2026-yil 26-martdagi o'zgartirishlar bilan biometrik ma'lumotlar O'zbekiston hududida saqlanishi belgilangan; yuz tasviri biometrik ma'lumot hisoblanadi va uni qayta ishlashga yozma rozilik talab qilinadi. Amaliy oqibat: <strong>yuz shablonlarini xorijiy bulutga yuborish qonun buzilishi</strong>, shuning uchun smetada mahalliy yozuv serveri majburiy qator.",
      manba: "https://lex.uz/docs/-4396419", ishonch: "tasdiqlangan", belgi: "ogoh",
    },
    {
      kod: "PQ-360", nom: "2026-yil 1-yanvardan qo'riqlanadigan banklarga yuz tanish vositalari o'rnatiladi",
      tana: "2025-yil noyabrdagi qaror bilan Qo'riqlash xizmati IIV ga o'tkazildi va qo'riqlovga olingan banklar hamda yirik korxonalarning kirish-chiqish joylariga yuz tanib olish imkoniyatiga ega texnik vositalar o'rnatilishi belgilandi. Bu jihoz tanloviga bevosita ta'sir qiladi va nomsiz arzon kameralarni avtomatik chiqarib tashlaydi.",
      manba: "https://www.gazeta.uz/oz/2025/11/29/qoriqlash-xizmati/", ishonch: "tasdiqlangan", belgi: "ogoh",
    },
    {
      kod: "PP-13", nom: "Akkumulyatorli quyosh tizimi 10 yillik soliq imtiyozini beradi",
      tana: "100 kVt gacha qayta tiklanuvchi energiya qurilmasini o'rnatgan yuridik shaxs mol-mulk va yer solig'idan ozod qilinadi. Muddat odatda 3 yil, ammo <strong>energiya to'plash tizimi panel quvvatining kamida 25% iga teng bo'lsa — 10 yil</strong>. Taklif etilayotgan yechim to'liq avtonom, ya'ni bu shartdan bemalol o'tadi.",
      manba: "https://www.norma.uz/novoe_v_zakonodatelstve/kakie_lgoty_dlya_lic_ustanovivshih_i_ispolzuyushchih_ustanovki_vie", ishonch: "tasdiqlangan", belgi: "ok",
    },
    {
      kod: "O'RQ-226", nom: "Elektr uzilgani yong'in xavfsizligi majburiyatini bekor qilmaydi",
      tana: "Yong'in xavfsizligi qoidalarida bo'sh va foydalanilmayotgan binolar uchun alohida yengillik yo'q: obyekt egasi yong'in haqida xabar berish texnik vositalarini ta'minlashi shart. Ya'ni batareyali yong'in datchiklari mulkni saqlash uchungina emas, huquqiy talabni yopish uchun ham kerak.",
      manba: "https://lex.uz/uz/docs/-5056473", ishonch: "tasdiqlangan", belgi: "ogoh",
    },
    {
      kod: "Soliq", nom: "Mol-mulk solig'i — 1,5%, tugallanmagan qurilish uchun 3%",
      tana: "Bank balansiga qabul qilingan kundan 6 oy soliq imtiyozi amal qiladi, undan keyin soliq kadastr qiymatidan hisoblanadi. Masalan 1 mlrd so'mlik ombor yiliga ≈15 mln so'm soliq keltiradi — nazorat tizimining yillik xarajati shu bilan taqqoslanishi mumkin.",
      manba: "https://lex.uz/docs/-4674902", ishonch: "tasdiqlangan", belgi: "muz",
    },
    {
      kod: "Litsenziya", nom: "Montaj litsenziyasi — pudratchi tanlashdagi birinchi filtr",
      tana: "Qo'riqlash signalizatsiyasi va yong'inga qarshi avtomatikani loyihalashtirish hamda montaj qilish litsenziyalanadigan faoliyat. <strong>Litsenziyasiz montajchi qilgan ish sug'urta hodisasida to'lovni rad etish asosi bo'lishi mumkin.</strong>",
      manba: "https://lex.uz/docs/-4029777", ishonch: "tasdiqlangan", belgi: "ogoh",
    },
  ];

  /* === Xatarlar va javoblar =============================================== */
  const XATAR = [
    {
      kod: "X1", nom: "Qishda quyosh yetmay, kamera o'chib qoladi", belgi: "xavf",
      tana: "Bu eng real xatar va zavod to'plamlari aynan shu yerda yiqiladi. Toshkentda dekabr quyoshi iyundan <strong>4,7 barobar zaif</strong> (1,62 va 7,60 kWh/m² kuniga, NASA POWER). Zavodning 3–18 Vt panelli to'plami yozgi hisobga tuzilgan. Javob: panel va akkumulyator dekabr ko'rsatkichiga, uch kunlik quyoshsiz zaxira bilan hisoblanadi; 4-bo'limdagi kalkulyator shuni ko'rsatadi. Tekshirish usuli: pilotda birinchi qish yakunida akkumulyator eng past zaryad darajasi jurnali ko'riladi.",
      manba: "https://power.larc.nasa.gov/",
    },
    {
      kod: "X2", nom: "Akkumulyator bir qishda ishdan chiqadi", belgi: "xavf",
      tana: "LiFePO4 akkumulyatorni <strong>0 °C dan past haroratda zaryadlash uni qaytarilmas buzadi</strong> va yong'in xavfini tug'diradi. Isitilmaydigan bo'sh obyektda bu O'zbekiston qishida real holat. Javob: shartnomaga past harorat zaryad himoyasi (low-temperature cutoff BMS) majburiy texnik talab sifatida kiritiladi; akkumulyator izolyatsiyalangan qutida joylashtiriladi. Bu talabsiz bank bir qish ichida barcha akkumulyatorlarni yo'qotishi mumkin.",
      manba: "",
    },
    {
      kod: "X3", nom: "Panel changga botadi va uni hech kim tozalamaydi", belgi: "ogoh",
      tana: "Chang panel quvvatini 2% dan 50% gacha kamaytiradi, O'rta Osiyo esa atmosfera chang konsentratsiyasi yuqori mintaqalar qatorida. Bo'sh obyektda panelni tozalaydigan odam yo'q. Javob: panel burchagi kattaroq olinadi (o'z-o'zidan tozalanishi uchun), quvvat zaxirasi ortiqcha rejalashtiriladi, tizimga «ishlab chiqarish tushib ketdi» ogohlantirishi qo'shiladi va yiliga ikki marta tozalash reglamentga kiritiladi.",
      manba: "https://aurorasolar.com/blog/understanding-pv-system-losses-part-3-soiling-snow-system-degradation/",
    },
    {
      kod: "X4", nom: "Jihozning o'zi o'g'irlanadi", belgi: "xavf",
      tana: "Panel va akkumulyator bozorda likvid tovar. Javob: jihoz 4–6 metr balandlikdagi ustunga antivandal qutida o'rnatiladi, korpus ochilishi va qiyshayishi datchik orqali darhol signal beradi, jihoz sug'urtalanadi va yozuv bank serverida saqlanadi — ya'ni jihoz yo'qolsa ham dalil qoladi. Qo'shimcha chora: ijara modelida jihoz yetkazib beruvchi balansida turadi va xavf ham unga o'tadi.",
      manba: "",
    },
    {
      kod: "X5", nom: "SIM-karta bloklanadi yoki operator tarifni o'zgartiradi", belgi: "ogoh",
      tana: "Ellik va undan ortiq obyektli tarmoqda bitta operatorga bog'lanib qolish jiddiy xatar. Javob: shartnomada M2M SIM uchun yozma tarif kafolati olinadi, qurilmalar ikkita operator SIM-kartasini qo'llab-quvvatlaydigan qilib tanlanadi. Amaldagi tariflar: Ucell M2M Humo 9 500 so'm/oy, Uzmobile M2M 10 000 so'm/oy, Beeline «Doimiy IP» 25 260 so'm/oy.",
      manba: "https://ucell.uz/uz/corporate/tariffs/m2mhumo",
    },
    {
      kod: "X6", nom: "Obyektda 4G qamrovi umuman yo'q", belgi: "muz",
      tana: "Tog'li va chekka tumanlardagi ayrim uchastkalarda uyali aloqa bo'lmasligi mumkin. Javob: bunday obyektlar alohida toifaga ajratiladi va birinchi bosqichga kiritilmaydi. Ular uchun bugun ikki yo'l bor: telemetriyani sun'iy yo'ldosh qisqa xabar kanali orqali uzatish yoki faqat lokal yozuv va davriy ko'rik. Starlink O'zbekistonda hali rasman ishlamaydi, shuning uchun smetaga kiritilmadi.",
      manba: "https://www.groundcontrol.com/products/iridium/short-burst-data-range/short-burst-data-service-plans/",
    },
    {
      kod: "X7", nom: "Kulrang import: kafolat va hujjat bo'lmaydi", belgi: "xavf",
      tana: "Bozorda avtonom 4G kameralar narxi 0,47 dan 3,0 mln so'mgacha, ya'ni olti barobar farq qiladi. Arzon nomsiz kameralarning qishki ishlash harorati ko'rsatilmagan va bulut serveri chet elda. Javob: tender shartiga rasmiy distribyutor hujjati, kafolat va -20 °C da ishlash sertifikati majburiy kiritiladi. Rasmiy kanal orqali olish narxni oshiradi, lekin bank uchun boshqa variant yo'q.",
      manba: "https://www.olx.uz/list/q-hikvision-solar/",
    },
    {
      kod: "X8", nom: "Bo'sh turgani uchun sug'urta ishlamay qolishi mumkin", belgi: "ogoh",
      tana: "Jahon polislarida mulk 30–60 kun uzluksiz bo'sh tursa, yong'in va suv bo'yicha qoplov keskin cheklanadi; ko'pchilik polisda davriy ko'rikni hujjatlashtirish sharti bor va yozuvlar bo'lmasa da'vo rad etiladi. <strong>Bu xatar emas, balki imkoniyat:</strong> video va datchik jurnali aynan shu «hujjatlashtirilgan ko'rik» talabini avtomatik bajaradi. Bank sug'urtachilari bilan shu asosda tarif qayta ko'rib chiqilishi kerak.",
      manba: "https://www.watchmanservices.co.uk/news/unoccupied-residential-property-escape-of-water-claims",
    },
  ];

  /* === Keyingi ufq: bugun shart emas, lekin bugungi tanlov yopib qo'ymasin === */
  const UFQ = [
    {
      kod: "U1", nom: "Sug'urta mukofotini kamaytirish", belgi: "ok",
      tana: "Jahon amaliyotida markaziy stansiyaga ulangan signalizatsiya mulk sug'urtasi mukofotini <strong>5–20% arzonlashtiradi</strong>: yong'in datchigi qo'shilsa 10–15%, suv oqishi datchigi bilan 15–20%. Suv datchigi uchun alohida 3%, avtomatik yopuvchi tizim uchun 8% gacha chegirma beriladi. O'zbekiston sug'urta bozorida bunday tarif jadvali ochiq e'lon qilinmagan, shuning uchun bu bandni pilot yakunida bank sug'urtachilari bilan muzokara mavzusi sifatida qo'yish kerak.",
      manba: "https://goabode.com/blog/home-security-insurance-discount/",
    },
    {
      kod: "U2", nom: "Sug'urtachi bilan birgalikda moliyalashtirish", belgi: "ok",
      tana: "Zurich kabi yirik sug'urtachilar mijoz obyektlariga suv oqishi datchiklari va bulutli monitoringni <strong>o'z hisobidan</strong> o'rnatmoqda: zararni to'lagandan ko'ra oldini olish arzon. Bank uchun g'oya: nazorat tizimini butunlay o'z kapitalidan emas, sug'urta kompaniyasi bilan birgalikdagi risk-injiniring shartnomasi doirasida moliyalashtirish. O'zbekistonda bu model hali sinalmagan.",
      manba: "https://us.zurichresilience.com/property-risk/water-leak-detection",
    },
    {
      kod: "U3", nom: "Jihozni sotib olish o'rniga ijaraga olish", belgi: "ok",
      tana: "Britaniyada bo'sh mulkni qo'riqlashning standart yechimi — ko'chma quyosh CCTV minorasini ijaraga olish. Minora 20 daqiqada ishga tushadi, obyekt sotilgach keyingi obyektga ko'chiriladi. Bank uchun mantiqi kuchli: obyekt o'rtacha 12 oy balansda turadi, jihoz esa 7 yil xizmat qiladi — sotib olingan to'plam obyekt sotilgach bo'sh qolmasligi kerak. <strong>Ijara modeli kapital xarajatni oylik xizmat haqiga aylantiradi va jihozning eskirish xavfini yetkazib beruvchiga o'tkazadi.</strong>",
      manba: "https://www.wcctv.co.uk/our-sectors/vacant-property-security/",
    },
    {
      kod: "U4", nom: "Obyektni 3D tur bilan sotuvga qo'yish", belgi: "ok",
      tana: "Nazorat kamerasi allaqachon joyda. Bitta tashrifda 360° skan ham olinsa, E-auksion e'loniga virtual tur biriktirish mumkin. Xaridor qorong'i, sovuq va uzoq binoga bormasdan ichkarini ko'radi. Sotuvchi kompaniya tadqiqotiga ko'ra 3D tur qo'shilgan e'lonlar tezroq va qimmatroq sotilgan, ammo bu manfaatdor manba — raqamni mustaqil tekshirmasdan taqdimotga kiritmaslik kerak. Amaliy ma'no: nazorat tizimi xarajatdan sotuv vositasiga aylanadi.",
      manba: "https://matterport.com/blog/3d-tours-properties-sell-31-faster-and-higher-price",
    },
    {
      kod: "U5", nom: "Bo'sh obyektdan sotilguncha daromad olish", belgi: "muz",
      tana: "Yevropada bo'sh binolarga vaqtinchalik «qo'riqchi-yashovchi» joylashtiriladi: ular bozor ijarasidan sezilarli arzon to'lov to'laydi, mulk egasi esa qo'riqlash xizmatiga katta mablag' sarflamaydi. O'zbekiston sharoitiga moslashtirilgan varianti — obyektni sotilguncha arzon ijaraga (ombor, ustaxona) berish: ham daromad, ham tabiiy nazorat. Huquqiy tomoni alohida ishlanishi kerak.",
      manba: "https://www.vice.com/en/article/guardian-schemes-kleinfeld-gentrification-homelessness-761/",
    },
    {
      kod: "U6", nom: "Bo'sh sanoat maydonini quyosh uchun tayyor maydon sifatida sotish", belgi: "ok",
      tana: "Istiqbolli loyihalar milliy agentligi tartibiga ko'ra mayning faoliyati asosan quyosh fotoelektr stansiyasi energiyasida amalga oshiriladi, yagona energotizimdan olingan elektr uchun tarif ikki barobar oshiruvchi koeffitsient bilan hisoblanadi. Elektri uzilgan, lekin katta tomi va yer maydoni bor sanoat sexi aynan shunday loyiha uchun tayyor maydon. Bank o'zi mayning qilmaydi, lekin obyektni «quyosh uchun tayyor maydon» sifatida taqdim etsa, <strong>xaridorlar doirasi butunlay boshqacha bo'ladi</strong>.",
      manba: "https://napp.uz/oz/pages/mining",
    },
    {
      kod: "U7", nom: "Yashil energiya sertifikati va barqarorlik hisoboti", belgi: "ok",
      tana: "Vazirlar Mahkamasining 2025-yil 14-apreldagi qaroriga ko'ra qayta tiklanuvchi manbadan ishlab chiqarilgan va uzatilgan har 1 MVt·soat uchun noyob raqamli sertifikat beriladi; reyestrga kiritish 1 MVt gacha quvvat uchun 100 yevro. Obyektlardagi quyosh panellari shunchaki elektr emas, bankning barqarorlik hisobotida auditga yaroqli ko'rsatkichga aylanishi mumkin. Diqqat: sertifikat tarmoqqa uzatilgan energiyaga beriladi, faqat o'zi iste'mol qiladigan kichik tizim bu mezonga tushmasligi mumkin.",
      manba: "https://lex.uz/uz/docs/-7476205",
    },
    {
      kod: "U8", nom: "Bugun 4G olib, ertaga 5G ga o'tish yo'lini yopmaslik", belgi: "muz",
      tana: "Bugun olinadigan kameralar 5–7 yil ishlaydi, lekin shu davrda operatorlar spektrni qayta taqsimlaydi. 5G RedCap aynan kuzatuv kameralari kabi qurilmalar uchun yaratilgan soddalashtirilgan standart. Amaliy qaror: bugun 4G olish to'g'ri, lekin aloqa modulini almashtirish mumkin bo'lgan modellarni afzal ko'rish va shartnomaga o'tish yo'l xaritasini kiritish kerak.",
      manba: "https://www.hologram.io/blog/cellular-iot-trends/",
    },
    {
      kod: "U9", nom: "Butun bank tizimi uchun yagona operator bo'lish", belgi: "ok",
      tana: "AQShda banklar balansiga o'tgan mulkni o'zi boshqarmaydi: ixtisoslashgan kompaniyalar ko'rik, konservatsiya va ta'mirni shartnoma asosida bajaradi. O'zbekiston kredit tashkilotlarida ~3 000 ta foydalanilmayotgan aktiv bor. Strategik savol: Mikrokreditbank bu tizimni faqat o'zi uchun quradimi, yoki keyinchalik butun bank tizimiga xizmat ko'rsatadigan platformaga aylantiradimi. Ikkinchi yo'l tanlansa, bugungi arxitektura ko'p ijarachiga mo'ljallangan bo'lishi kerak.",
      manba: "https://safeguardproperties.com/safeguard-acquires-bank-of-americas-field-service-operations/",
    },
    {
      kod: "U10", nom: "Bankrotlik islohoti obyektlar oqimini oshiradi", belgi: "muz",
      tana: "2026-yil may oyida to'lovga qobiliyatsizlik institutini isloh qiluvchi farmon imzolangan. Tartib-taomillar tezlashsa, banklar balansiga o'tadigan garov mulki oqimi ortadi. Ya'ni bugun bir-ikki obyekt uchun yechim emas, <strong>kengaytiriladigan tizim</strong> kerak: smeta obyekt boshiga birlik narx tarzida tuzilishi va uch yillik egalik qiymati ko'rsatilishi shuning uchun to'g'ri.",
      manba: "https://lex.uz/uz/docs/-8180719",
    },
  ];

  window.MKB_MANBA = {
    INSOLYATSIYA, OYLAR, JIHOZ, SHERIK, ALOQA, HUQUQ, XATAR, UFQ,
    YANGILANGAN: "2026-yil sentabr",
  };
})();
