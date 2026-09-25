/* ============================================================
   taqdimot-qisqa.js — rahbariyat uchun bir sahifalik qisqacha (Q tugmasi).
   Faqat taqdimot slaydlaridagi faktlar: s-muammo, s-tarkib, s-xatar,
   s-matritsa, s-narx, s-iqtisod, s-yol, s-pilot, s-faq.
   Har blokda slayd — o'sha mavzudagi slaydga havola.
   ============================================================ */
window.MKB_QISQA = {
  uz: {
    yorliq: "Rahbariyat uchun",
    sarlavha: "Taqdimot bir sahifada",
    lid: "Elektr, internet va qorovuli yo'q 267 obyektni masofaviy nazoratga olish. Boshqaruvdan pilotga ruxsat so'raladi.",
    bloklar: [
      {
        nom: "Muammo",
        raqam: "267",
        birlik: "obyekt balansda",
        matn: "Obyektlar elektr, aloqa va qorovulsiz turibdi. Mulk, yong'in xavfsizligi va sug'urta uchun bank javob beradi. Bir yilda sotilmagan mulk 100% zaxira talab qiladi.",
        slayd: "#s-muammo",
        qoshimcha: [["Balans tarkibi", "#s-tarkib"], ["Oltita xatar", "#s-xatar"]]
      },
      {
        nom: "Yondashuv",
        raqam: "10",
        birlik: "yechim, bitta platforma",
        matn: "Universal komplekt yo'q: 79 obyekt transport, texnika va uskuna. Montajchi oltita savolga javob beradi, javob o'nta yechimdan birini ko'rsatadi. Hammasi MKB platformasiga ulanadi.",
        slayd: "#s-matritsa",
        qoshimcha: [["Tanlash mezoni", "#s-shart"], ["Integratsiya", "#s-arx"]]
      },
      {
        nom: "Narx",
        raqam: "3–20",
        birlik: "mln so'm bir obyektga",
        matn: "O'nta yechimdan yettitasi o'rnatish bilan 20 mln so'mgacha. Qolgan uchtasi alohida holat uchun: klaster shkafi 3–10 obyektga bitta, minora va yoqilg'i elementi chekka va qimmat obyektga. Narxni tenderdagi kamida uchta taklif belgilaydi. Butun dastur jihozi: 267 × 3–20 mln = 0,8–5,3 mlrd so'm, o'rtacha 10 mln bilan 2,7 mlrd.",
        slayd: "#s-narx",
        qoshimcha: [["Smeta", "#s-bom"]]
      },
      {
        nom: "Iqtisod",
        raqam: "7,4",
        birlik: "mln so'm yiliga",
        matn: "Bugun obyektlar qo'riqlanmaydi, nazorat bank uchun yangi xarajat: bir obyektga yiliga 7,4 mln, 267 obyektga taxminan 1,6 mlrd so'm. Jamoa, server va sug'urta alohida qator. Taqqoslash: departament posti 55 mln, bank qorovuli 145 mln so'm.",
        slayd: "#s-iqtisod",
        qoshimcha: []
      },
      {
        nom: "Xatar",
        raqam: "3",
        birlik: "asosiy xatar va javob",
        matn: "Qish: LiFePO4 0 °C dan past zaryadlanmaydi, himoyali BMS va shkaf bino ichida. Qonun: shartnomaviy qo'riqlash faqat davlat xizmati (O'RQ-778), joyga IIV departamenti chiqadi. Ma'lumot: video va biometrik ma'lumot bankning O'zbekistondagi serverida (O'RQ-1125).",
        slayd: "#s-xatar",
        qoshimcha: [["Savol-javob", "#s-faq"]]
      },
      {
        nom: "Pilot",
        raqam: "10 · 6",
        birlik: "obyekt · hafta",
        matn: "10 obyektda 3–4 yechim yonma-yon sinaladi. Jihoz byudjeti 30–200 mln so'm (10 × 3–20 mln), jamoa va server alohida. Oltinchi haftada smeta, SLA va joriy etish standarti tayyor bo'ladi. Keyin butun balans 9 oyda ulanadi.",
        slayd: "#s-pilot",
        qoshimcha: [["Yo'l xaritasi", "#s-yol"]]
      }
    ],
    qaror: {
      nom: "Boshqaruvdan so'raladigan to'rt qaror",
      bandlar: ["10 ta pilot obyekt", "Jihoz byudjeti 30–200 mln so'm", "Bosh integrator modeli", "MKB platformasiga ulanish standarti"],
      slayd: "#s-pilot",
      havola: "Qiyin savollarga javoblar",
      havolaSlayd: "#s-faq"
    },
    slaydSoz: "Slayd",
    yopish: "Yopish"
  },
  ru: {
    yorliq: "Для правления",
    sarlavha: "Презентация на одной странице",
    lid: "267 объектов без электричества, интернета и охраны — под удалённый контроль. От правления нужно решение о пилоте.",
    bloklar: [
      {
        nom: "Проблема",
        raqam: "267",
        birlik: "объектов на балансе",
        matn: "Объекты стоят без электричества, связи и охраны. За имущество, пожарную безопасность и страховку отвечает банк. Непроданное за год имущество требует резерва 100%.",
        slayd: "#s-muammo",
        qoshimcha: [["Состав баланса", "#s-tarkib"], ["Шесть рисков", "#s-xatar"]]
      },
      {
        nom: "Подход",
        raqam: "10",
        birlik: "решений, одна платформа",
        matn: "Универсального комплекта нет: 79 объектов — транспорт, техника и оборудование. По шести вопросам монтажник выбирает одно из десяти решений. Всё подключается к платформе MKB.",
        slayd: "#s-matritsa",
        qoshimcha: [["Критерии выбора", "#s-shart"], ["Интеграция", "#s-arx"]]
      },
      {
        nom: "Стоимость",
        raqam: "3–20",
        birlik: "млн сумов на объект",
        matn: "Семь решений из десяти — до 20 млн сумов с монтажом. Остальные три — для особых случаев: кластерный шкаф на 3–10 объектов, вышка и топливный элемент — для удалённых дорогих объектов. Цену определят минимум три предложения на тендере. Оборудование всей программы: 267 × 3–20 млн = 0,8–5,3 млрд сумов, при среднем комплекте 10 млн — 2,7 млрд.",
        slayd: "#s-narx",
        qoshimcha: [["Смета", "#s-bom"]]
      },
      {
        nom: "Экономика",
        raqam: "7,4",
        birlik: "млн сумов в год",
        matn: "Сегодня объекты не охраняются, контроль — новый расход банка: 5,9 млн сумов в год на объект, около 1,6 млрд на 267 объектов. Команда, серверы и страховка — отдельные строки. Для сравнения: пост Департамента охраны 55 млн, сторож банка 145 млн сумов.",
        slayd: "#s-iqtisod",
        qoshimcha: []
      },
      {
        nom: "Риски",
        raqam: "3",
        birlik: "главных риска и ответ",
        matn: "Зима: LiFePO4 не заряжается ниже 0 °C — BMS с защитой, шкаф внутри здания. Закон: договорная охрана только у государства (ЗРУ-778), на выезд едет Департамент МВД. Данные: видео и биометрия на сервере банка в Узбекистане (ЗРУ-1125).",
        slayd: "#s-xatar",
        qoshimcha: [["Вопросы и ответы", "#s-faq"]]
      },
      {
        nom: "Пилот",
        raqam: "10 · 6",
        birlik: "объектов · недель",
        matn: "На 10 объектах параллельно проверяем 3–4 решения. Бюджет на оборудование 30–200 млн сумов (10 × 3–20 млн), команда и серверы отдельно. К шестой неделе готовы смета, SLA и стандарт внедрения. Затем весь баланс подключается за 9 месяцев.",
        slayd: "#s-pilot",
        qoshimcha: [["Дорожная карта", "#s-yol"]]
      }
    ],
    qaror: {
      nom: "На утверждение правления",
      bandlar: ["10 пилотных объектов", "Бюджет на оборудование 30–200 млн сумов", "Модель генерального интегратора", "Стандарт подключения к платформе MKB"],
      slayd: "#s-pilot",
      havola: "Ответы на сложные вопросы",
      havolaSlayd: "#s-faq"
    },
    slaydSoz: "Слайд",
    yopish: "Закрыть"
  }
};
