/* ---------------------------------------------------------------------------
   taqdimot-arxitektura.js — qurilmadan tizimgacha bo'lgan integratsiya
   spetsifikatsiyasi. Taqdimotning dasturchilar uchun mo'ljallangan qismi.

   Bu yerda tizimning O'Z arxitekturasi tasvirlanadi: qurilmalar qanday ulanadi,
   hodisa qanday keladi, yagona sxema qanday ko'rinadi, 100–300 qurilma qanday
   boshqariladi. Qurilma tomonidagi protokol tafsilotlari taqdimot-manba.js da.
   --------------------------------------------------------------------------- */
(function () {
  "use strict";

  /* === Qatlamlar. Har biri mustaqil almashtiriladi. ======================= */
  const QATLAM = [
    {
      kod: "L1", nom: "Qurilma", joy: "Obyektda",
      tarkib: "Kamera, harakat va ochilish datchigi, tutun datchigi, suv datchigi, plomba, GPS treker",
      vazifa: "Hodisani aniqlaydi va dalil yig'adi. Quvvatni o'zi boshqaradi, tarmoqqa ulanmaydi.",
      almashtirish: "Ishlab chiqaruvchi almashsa, yuqoridagi qatlamlar o'zgarmaydi — shart faqat ONVIF yoki ochiq API.",
    },
    {
      kod: "L2", nom: "Joydagi to'plovchi", joy: "Obyektda",
      tarkib: "4G marshrutizator yoki signalizatsiya markazi (hub). Ayrim yechimlarda kamera o'zi to'plovchi bo'ladi.",
      vazifa: "Qurilmalarni bitta nuqtaga yig'adi, aloqa uzilganda yozuvni saqlab turadi, tiklangach uzatadi.",
      almashtirish: "Obyektda bitta IP manzil qoladi. Qurilmalar soni o'zgarsa ham bank tarmog'i tomonida hech nima o'zgarmaydi.",
    },
    {
      kod: "L3", nom: "Transport", joy: "Operator tarmog'i",
      tarkib: "Yopiq APN yoki VPN kanali, statik IP, M2M SIM",
      vazifa: "Ma'lumotni ochiq internetga chiqarmasdan bank tarmog'iga yetkazadi.",
      almashtirish: "Operator almashsa faqat SIM va APN nomi o'zgaradi.",
    },
    {
      kod: "L4", nom: "Qabul qilish", joy: "Bank serverida",
      tarkib: "Ingest xizmati: webhook qabul qiluvchi, MQTT broker, ONVIF ko'prigi, RTSP kadr oluvchi",
      vazifa: "Turli ishlab chiqaruvchining turli protokolini qabul qiladi va yagona hodisa sxemasiga o'giradi.",
      almashtirish: "Yangi ishlab chiqaruvchi qo'shilsa, faqat shu qatlamga bitta adapter yoziladi.",
    },
    {
      kod: "L5", nom: "Yadro", joy: "Bank serverida",
      tarkib: "Qurilma reyestri, hodisa jurnali, obyekt bilan bog'lanish, saqlash siyosati",
      vazifa: "Hodisani obyektga bog'laydi, dalilni saqlaydi, muddatni nazorat qiladi.",
      almashtirish: "Ma'lumot bankda qoladi. Yetkazib beruvchi o'zgarsa ham tarix yo'qolmaydi.",
    },
    {
      kod: "L6", nom: "Tizim", joy: "Foydalanuvchida",
      tarkib: "Obyektlar reyestri, hodisalar doskasi, ko'rik rejasi, hisobotlar, rahbariyat paneli",
      vazifa: "Hodisani ish jarayoniga aylantiradi: kim ko'radi, kim boradi, qachon yopiladi.",
      almashtirish: "Allaqachon ishlab turibdi.",
    },
  ];

  /* === Yagona hodisa sxemasi. Barcha ishlab chiqaruvchi shu ko'rinishga keltiriladi. */
  const HODISA_SXEMA = `{
  "obyekt_id":   "AK-2026/0141",
  "qurilma_id":  "KAM-0007",
  "vaqt":        "2026-12-14T03:12:47+05:00",
  "tur":         "harakat",
  "jiddiylik":   "yuqori",
  "dalil": {
    "turi":      "surat",
    "havola":    "/dalil/2026/12/14/KAM-0007-031247.jpg",
    "saqlanadi": "90 kun"
  },
  "qurilma_holati": { "batareya": 82, "signal": -71, "quvvat": "quyosh" },
  "manba": { "ishlab_chiqaruvchi": "Ajax", "protokol": "SIA DC-09", "xom": "..." }
}`;

  /* === Qabul qilish kanallari. To'rt xil, hammasi bitta sxemaga tushadi. === */
  const KANAL = [
    {
      nom: "Webhook", qachon: "Qurilma yoki bulut HTTP POST yubora olsa",
      spek: "POST /api/v1/hodisa\nContent-Type: application/json\nX-MKB-Imzo: HMAC-SHA256(tana, sir)\nX-MKB-Qurilma: KAM-0007",
      izoh: "Eng sodda yo'l. Imzo tekshiriladi, takroriy xabar qurilma_id va vaqt bo'yicha filtrlanadi. Javob 202 Accepted.",
      kim: "TP-Link Tapo (bulut orqali), Reolink (push), ayrim integrator bulutlari",
    },
    {
      nom: "MQTT", qachon: "Joyda hub yoki NVR bo'lsa",
      spek: "mkb/obyekt/<obyekt_id>/hodisa   — hodisa\nmkb/obyekt/<obyekt_id>/holat    — batareya, signal, quvvat\nmkb/obyekt/<obyekt_id>/javob    — buyruq javobi\nQoS 1, TLS 8883, mijoz sertifikati bilan",
      izoh: "Aloqa uzilsa broker qayta ulanishni o'zi boshqaradi. Frigate va Home Assistant shu kanalda ishlaydi.",
      kim: "Frigate NVR, Home Assistant, LoRaWAN network server, o'z shlyuzimiz",
    },
    {
      nom: "ONVIF", qachon: "Kamera IP tarmoqda va ONVIF ni qo'llab-quvvatlasa",
      spek: "WS-Discovery: UDP 3702 (qurilmani topish)\nGetCapabilities → Event xizmati manzili\nCreatePullPointSubscription → PullMessages (uzun so'rov)\nVoqealar: RuleEngine/CellMotionDetector/Motion, Tamper, FieldDetector",
      izoh: "Sanoat standarti. Kamera bulutga bog'liq bo'lmaydi. Profile S — video, Profile T — analitika va metama'lumot.",
      kim: "Hikvision, Dahua, Milesight, Uniview va ONVIF sertifikatiga ega boshqa kameralar",
    },
    {
      nom: "SIA DC-09", qachon: "Qo'riqlash signalizatsiyasi pultga ulansa",
      spek: "TCP/UDP, shifrlangan ramka.\nMisol: \"ADM-CID\" 0018 \"#123456|1130 01 003\"\n1130 — trevoga, 003 — zona raqami",
      izoh: "Qo'riqlash sanoatining standarti. Davlat qo'riqlash pulti aynan shu protokolni qabul qiladi, shuning uchun bitta hodisa bir vaqtda pultga ham, bank tizimiga ham tushadi.",
      kim: "Ajax, Bolid, Rubezh va boshqa signalizatsiya markazlari",
    },
  ];

  /* === 100–300 qurilmani boshqarish ====================================== */
  const MASSHTAB = [
    {
      nom: "Qurilma reyestri",
      tana: "Har bir qurilma tizimda yozuv sifatida mavjud: seriya raqami, turi, obyekt, o'rnatilgan sana, kafolat muddati, SIM raqami, oxirgi signal vaqti. Obyekt sotilganda qurilma «bo'sh» holatiga o'tadi va keyingi obyektga biriktiriladi.",
    },
    {
      nom: "Avtomatik ro'yxatdan o'tish",
      tana: "Qurilma birinchi marta quvvatga ulanganda oldindan yozilgan sertifikat bilan o'zini e'lon qiladi. Muhandis faqat QR kodni skanerlab, qurilmani obyektga biriktiradi. Sozlash qo'lda kiritilmaydi.",
    },
    {
      nom: "Tiriklik signali",
      tana: "Har bir qurilma belgilangan oraliqda holat yuboradi. Ikki oraliq o'tsa tizim «aloqa yo'q» hodisasini ochadi. Bu eng muhim signal: buzilgan kamera indamay turadi, shuning uchun sukut ham hodisa hisoblanadi.",
    },
    {
      nom: "Batareya va quvvat telemetriyasi",
      tana: "Batareya darajasi va quyosh unumi kunlik yoziladi. Tizim tushish tezligiga qarab almashtirish sanasini oldindan aytadi, shunda ko'rik marshrutiga qo'shib yuboriladi va alohida chiqish kerak bo'lmaydi.",
    },
    {
      nom: "Guruh bo'yicha sozlash",
      tana: "Qurilmalar shablon bo'yicha guruhlanadi (masalan «B daraja, ombor»). Sezuvchanlik yoki yozuv uzunligi o'zgartirilsa, guruhdagi barcha qurilmaga tarqaladi.",
    },
    {
      nom: "Proshivka yangilash",
      tana: "Yangilanish avval o'nta sinov qurilmasida, so'ng to'lqin-to'lqin tarqatiladi. Qaytarish imkoniyati saqlanadi. Bu bandsiz 200 ta qurilmani xavfsizlik yangilanishisiz qoldirish xavfi paydo bo'ladi.",
    },
    {
      nom: "Xavfsizlik",
      tana: "Zavod paroli majburiy almashtiriladi, qurilma ochiq internetga chiqmaydi, faqat yopiq APN orqali bank tarmog'iga ulanadi. Port ochilmaydi: ulanish har doim qurilmadan serverga qarab boshlanadi.",
    },
  ];

  window.MKB_ARXITEKTURA = { QATLAM, HODISA_SXEMA, KANAL, MASSHTAB };
})();
