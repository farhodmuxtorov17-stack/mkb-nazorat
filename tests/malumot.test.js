"use strict";
/* ============================================================
   Прогон проверок ядра данных malumot.js и словаря tarjima.js.
   Без зависимостей: только node. Запуск из корня репозитория:

       node tests/malumot.test.js

   Метод: тесты строятся от ломающих случаев — границы порогов,
   деление на ноль, битые ссылки, рассинхрон производных значений.
   Мутационные тесты группы 6 намеренно ломают загруженные данные
   и проверяют, что moslikTekshiruvi() это ловит; между такими
   кейсами модуль перечитывается заново (delete require.cache).

   Характеризационные тесты помечены словом «характеризация»:
   они фиксируют фактическое (не обязательно желаемое) поведение,
   чтобы его изменение не прошло незамеченным.
   ============================================================ */

const path = require("path");
const fs = require("fs");

const MALUMOT_YOLI = path.join(__dirname, "..", "malumot.js");
const TARJIMA_YOLI = path.join(__dirname, "..", "tarjima.js");

/* Чистая загрузка модуля данных: malumot.js — IIFE, публикующая
   window.MKB_DATA, поэтому перед require создаётся новый window. */
function yukla() {
  delete require.cache[require.resolve(MALUMOT_YOLI)];
  global.window = {};
  require(MALUMOT_YOLI);
  return global.window.MKB_DATA;
}

/* ---------------- мини-раннер ---------------- */
const guruhlar = [];
let joriyGuruh = null;
function guruh(nom) { joriyGuruh = { nom, testlar: [] }; guruhlar.push(joriyGuruh); }
function test(nom, fn) { joriyGuruh.testlar.push({ nom, fn }); }

function ok(shart, izoh) {
  if (!shart) throw new Error(izoh || "условие ложно");
}
function eq(haqiqiy, kutilgan, izoh) {
  if (!Object.is(haqiqiy, kutilgan))
    throw new Error((izoh ? izoh + ": " : "") +
      "получено " + JSON.stringify(haqiqiy) + ", ожидалось " + JSON.stringify(kutilgan));
}
function yaqin(haqiqiy, kutilgan, chek, izoh) {
  if (!(Math.abs(haqiqiy - kutilgan) <= chek))
    throw new Error((izoh ? izoh + ": " : "") +
      "получено " + haqiqiy + ", ожидалось " + kutilgan + " (допуск " + chek + ")");
}

/* Общая «чистая» копия данных для групп 1–5 (они данные не мутируют). */
const D = yukla();

/* ============================================================
   Группа 1. tasnifla() — границы категорий качества.
   Пороги TASNIF: 0 / 1 / 31 / 91 / 181, правило «с этого дня».
   Проверяются обе стороны каждого порога — именно там ломаются
   ошибки вида >= против >.
   ============================================================ */
guruh("1. tasnifla(): границы категорий");

test("0 -> yaxshi (0%), 1 -> standart (10%)", () => {
  eq(D.tasnifla(0).kalit, "yaxshi");
  eq(D.tasnifla(0).zaxira, 0, "ставка резерва yaxshi");
  eq(D.tasnifla(1).kalit, "standart");
  eq(D.tasnifla(1).zaxira, 10, "ставка резерва standart");
});

test("30 -> standart, 31 -> substandart (25%)", () => {
  eq(D.tasnifla(30).kalit, "standart");
  eq(D.tasnifla(31).kalit, "substandart");
  eq(D.tasnifla(31).zaxira, 25, "ставка резерва substandart");
});

test("90 -> substandart, 91 -> shubhali (50%)", () => {
  eq(D.tasnifla(90).kalit, "substandart");
  eq(D.tasnifla(91).kalit, "shubhali");
  eq(D.tasnifla(91).zaxira, 50, "ставка резерва shubhali");
});

test("180 -> shubhali, 181 -> umidsiz (100%)", () => {
  eq(D.tasnifla(180).kalit, "shubhali");
  eq(D.tasnifla(181).kalit, "umidsiz");
  eq(D.tasnifla(181).zaxira, 100, "ставка резерва umidsiz");
});

test("очень большая просрочка остаётся umidsiz", () => {
  eq(D.tasnifla(1e6).kalit, "umidsiz");
  eq(D.tasnifla(Number.MAX_SAFE_INTEGER).kalit, "umidsiz");
});

test("результат — запись самой таблицы TASNIF (кэллеры читают chip/rang)", () => {
  ok(D.TASNIF.includes(D.tasnifla(0)), "tasnifla(0) не из TASNIF");
  ok(D.TASNIF.includes(D.tasnifla(181)), "tasnifla(181) не из TASNIF");
  ok(typeof D.tasnifla(45).chip === "string" && D.tasnifla(45).chip.length > 0);
  ok(typeof D.tasnifla(45).rang === "string" && /^#/.test(D.tasnifla(45).rang));
});

/* ХАРАКТЕРИЗАЦИЯ. Отрицательные дни просрочки — некорректный вход:
   ни один порог `kunlar >= kundan` не срабатывает, и функция молча
   возвращает стартовое значение TASNIF[0] («yaxshi»). Валидацию входа
   она не делает — некорректные kunlar в записях ловит отдельно
   moslikTekshiruvi() (kunlar <= 0). Тест фиксирует текущий контракт;
   если в функцию добавят отказ на отрицательных значениях, тест
   сознательно упадёт и потребует пересмотра. */
test("характеризация: отрицательные дни дают «yaxshi» (вход не валидируется)", () => {
  eq(D.tasnifla(-1).kalit, "yaxshi");
  eq(D.tasnifla(-365).kalit, "yaxshi");
});

/* ============================================================
   Группа 2. zaxiraHisobi() — резерв, необеспеченный остаток, покрытие.
   Функция ПРИВАТНА (в window.MKB_DATA не экспортируется — вопреки
   описанию в постановке), а случай qarz=0 через данные недостижим.
   Поэтому исходник функции извлекается из malumot.js балансным
   сканом скобок и исполняется как есть: тестируется реальный код,
   а не переписанная копия.
   ============================================================ */
guruh("2. zaxiraHisobi(): извлечённая приватная функция");

let zaxiraHisobiKesh = null;
function zaxiraHisobiOl() {
  if (zaxiraHisobiKesh) return zaxiraHisobiKesh;
  const manba = fs.readFileSync(MALUMOT_YOLI, "utf8");
  const bosh = manba.indexOf("function zaxiraHisobi");
  ok(bosh !== -1, "в malumot.js не найдена «function zaxiraHisobi»");
  const och = manba.indexOf("{", bosh);
  let chuqurlik = 0, oxir = -1;
  for (let i = och; i < manba.length; i++) {
    if (manba[i] === "{") chuqurlik++;
    else if (manba[i] === "}") { chuqurlik--; if (chuqurlik === 0) { oxir = i; break; } }
  }
  ok(oxir !== -1, "не найден конец функции zaxiraHisobi");
  zaxiraHisobiKesh = new Function("return (" + manba.slice(bosh, oxir + 1) + ")")();
  return zaxiraHisobiKesh;
}

test("функция извлекается из исходника (private, не в экспортах MKB_DATA)", () => {
  const zx = zaxiraHisobiOl();
  eq(typeof zx, "function");
  eq(zx.length, 3, "ожидается сигнатура (qarzJami, ta'minotBaho, foiz)");
  eq("zaxiraHisobi" in D, false, "если функцию экспортировали — перевести тесты на прямой вызов");
});

test("qarz > baho: необеспеченный остаток равен разнице, покрытие < 100%", () => {
  const r = zaxiraHisobiOl()(500, 300, 25);
  eq(r.zaxira, 125, "резерв 25% от всего долга, не от остатка");
  eq(r.ochiq, 200, "ochiq = 500 - 300");
  eq(r.qoplash, 60, "покрытие 300/500");
});

test("qarz < baho: ochiq строго 0, покрытие > 100%", () => {
  const r = zaxiraHisobiOl()(300, 500, 10);
  eq(r.ochiq, 0, "залог покрывает долг — непокрытого остатка нет");
  eq(r.zaxira, 30);
  eq(r.qoplash, 167, "round(500/300*100) = 167");
});

test("qarz = 0: нет деления на ноль, все значения конечны", () => {
  const r = zaxiraHisobiOl()(0, 500, 10);
  ok(Number.isFinite(r.zaxira) && Number.isFinite(r.ochiq) && Number.isFinite(r.qoplash),
    "получены неконечные значения: " + JSON.stringify(r));
  eq(r.qoplash, 0, "защита от деления на ноль обязана дать 0, а не Infinity/NaN");
  eq(r.zaxira, 0);
  eq(r.ochiq, 0);
});

test("округление до 0.1 млн: 24.9975 -> 25, 49.99 -> 50", () => {
  const r = zaxiraHisobiOl()(99.99, 50, 25);
  eq(r.zaxira, 25, "резерв округляется до одной десятой");
  eq(r.ochiq, 50, "остаток округляется до одной десятой");
});

test("извлечённая функция совпадает с той, что заполнила запись AK-2025/1187", () => {
  const y = D.topish("AK-2025/1187");
  const r = zaxiraHisobiOl()(y.qarz.jami, y.mulk.baho, y.tasnif.zaxira);
  eq(r.zaxira, y.zaxira);
  eq(r.ochiq, y.ochiqQoldiq);
  eq(r.qoplash, y.qoplash);
  eq(r.qoplash, 108, "4150/3840.4 -> 108%");
});

/* ============================================================
   Группа 3. pul() и son() — денежное форматирование.
   Порог млн/млрд — ровно 1000; разделитель дроби — запятая.
   ============================================================ */
guruh("3. pul() / son(): форматирование сумм");

test("999.9 остаётся в млн: «999,9 mln so'm»", () => {
  eq(D.pul(999.9), "999,9 mln so'm");
});

test("1000 переходит в млрд без хвоста «,00»: «1 mlrd so'm»", () => {
  eq(D.pul(1000), "1 mlrd so'm");
});

test("десятичная запятая в обоих режимах: 1480 и 74.2", () => {
  eq(D.pul(1480), "1,48 mlrd so'm");
  eq(D.pul(74.2), "74,2 mln so'm");
});

test("целые млн теряют «,0»: 520 -> «520 mln so'm», 0 -> «0 mln so'm»", () => {
  eq(D.pul(520), "520 mln so'm");
  eq(D.pul(0), "0 mln so'm");
});

/* ХАРАКТЕРИЗАЦИЯ. Срезается только точный хвост «,00»; «1,50» так
   и остаётся с нулём («1,5 mlrd so'm» было бы короче). Фиксируем как
   текущее поведение форматтера, чтобы «улучшение» не прошло молча. */
test("характеризация: 1500 -> «1,50 mlrd so'm» (хвост «,X0» не срезается)", () => {
  eq(D.pul(1500), "1,50 mlrd so'm");
});

test("son(): ru-RU запятая и ровно один знак дроби", () => {
  eq(D.son(100), "100,0", "дробная часть добивается принудительно");
  eq(D.son(12.55), "12,6", "больше одного знака не остаётся");
});

test("son(): группировка тысяч пробельным символом (3 840,4)", () => {
  const s = D.son(3840.4);
  eq(s.replace(/\s/g, ""), "3840,4", "цифры и запятая");
  ok(s !== "3840,4", "между 3 и 840 обязан быть разделитель групп ru-RU");
  ok(/,4$/.test(s), "десятичный разделитель — запятая");
});

/* ============================================================
   Группа 4. Реестр объектов OBYEKT_INDEKS (Д-8, ТЗ 3.5).
   Битая ссылка на объект — это «?GR-...» на странице.
   ============================================================ */
guruh("4. Реестр объектов: ссылки и имена");

test("реестр собран из всех трёх источников: YOZUVLAR + SOTUV + ARXIV", () => {
  D.YOZUVLAR.forEach(y => ok(D.OBYEKT_INDEKS[y.id], "нет записи " + y.id));
  D.SOTUV.forEach(l => ok(D.OBYEKT_INDEKS[l.id], "нет лота " + l.id));
  D.ARXIV.forEach(a => ok(D.OBYEKT_INDEKS[a.kod], "нет архивного " + a.kod));
});

test("каждый obyektId вторичных коллекций разрешается в реестре", () => {
  const kolleksiyalar = ["HODISALAR", "HUJJATLAR", "XONALAR", "KORIKLAR",
    "SUGURTALAR", "BAHOLASHLAR", "TASDIQLAR"];
  const uzilgan = [];
  kolleksiyalar.forEach(nom => D[nom].forEach(r => {
    if (r.obyektId && !D.OBYEKT_INDEKS[r.obyektId]) uzilgan.push(nom + ":" + r.obyektId);
  }));
  D.XARITA_NUQTALARI.forEach(n => {
    if (n.kod && !D.OBYEKT_INDEKS[n.kod]) uzilgan.push("XARITA_NUQTALARI:" + n.kod);
  });
  eq(uzilgan.length, 0, "битые ссылки: " + uzilgan.join(", "));
});

test("несуществующий id: obyektNomi даёт префикс «?», obyekt() даёт null", () => {
  eq(D.obyektNomi("AK-9999/0000"), "?AK-9999/0000");
  eq(D.obyektNomi("AK-9999/0000", true), "?AK-9999/0000", "короткая форма тоже помечается");
  eq(D.obyekt("AK-9999/0000"), null);
});

test("короткое и полное имя различаются; без qisqa короткое падает на nom", () => {
  eq(D.obyektNomi("AK-2025/0934", true), "Navruz Plaza");
  eq(D.obyektNomi("AK-2025/0934"), "Navruz Plaza, 3-qavat savdo maydoni");
  /* архивная запись AK-2023/0088 задана без qisqa */
  eq(D.obyektNomi("AK-2023/0088", true), D.obyektNomi("AK-2023/0088"));
});

test("joyNomi: разделитель по умолчанию, свой разделитель, без внутренней части", () => {
  eq(D.joyNomi("AK-2025/0934", "1-qavat"), "Navruz Plaza, 1-qavat");
  eq(D.joyNomi("AK-2025/0934", "3-qavat", " · "), "Navruz Plaza · 3-qavat");
  eq(D.joyNomi("AK-2025/0934"), "Navruz Plaza", "без ichki — только короткое имя");
});

/* ============================================================
   Группа 5. Производные поля YOZUVLAR (Д-1, Д-2, Д-7).
   Формулы — это и есть норматив ТЗ 4.7: категория из дней,
   резерв из категории, покрытие = залог/долг.
   ============================================================ */
guruh("5. Производные значения YOZUVLAR");

test("qarz.jami = asosiy + foiz с точностью 0.05 (все записи)", () => {
  D.YOZUVLAR.forEach(y =>
    yaqin(y.qarz.jami, y.qarz.asosiy + y.qarz.foiz, 0.05, y.id));
});

test("tasnif соответствует диапазону дней своей категории (все записи)", () => {
  D.YOZUVLAR.forEach(y => {
    const i = D.TASNIF.findIndex(t => t.kalit === y.tasnif.kalit);
    ok(i !== -1, y.id + ": категория не из TASNIF");
    ok(y.qarz.kunlar >= D.TASNIF[i].kundan,
      y.id + ": " + y.qarz.kunlar + " дн. ниже порога «" + y.tasnif.kalit + "»");
    const keyingi = D.TASNIF[i + 1];
    ok(!keyingi || y.qarz.kunlar < keyingi.kundan,
      y.id + ": " + y.qarz.kunlar + " дн. уже в следующей категории");
  });
});

test("zaxira = jami * ставка / 100 c округлением до 0.1 (все записи)", () => {
  D.YOZUVLAR.forEach(y =>
    eq(y.zaxira, +(y.qarz.jami * y.tasnif.zaxira / 100).toFixed(1), y.id));
});

test("qoplash = round(baho/jami*100); ochiqQoldiq >= 0 и равен непокрытой части", () => {
  D.YOZUVLAR.forEach(y => {
    eq(y.qoplash, Math.round(y.mulk.baho / y.qarz.jami * 100), y.id + " qoplash");
    ok(y.ochiqQoldiq >= 0, y.id + ": отрицательный непокрытый остаток");
    eq(y.ochiqQoldiq,
      +(y.qarz.jami - Math.min(y.mulk.baho, y.qarz.jami)).toFixed(1),
      y.id + " ochiqQoldiq");
  });
});

/* Контрольные точки текущего датасета, посчитанные вручную. Они дают
   тесту способность падать независимо от формул выше. */
test("контрольные точки: AK-2026/4471, AK-2026/0141, AK-2025/1187", () => {
  const a = D.topish("AK-2026/4471");        /* 214 дн. -> umidsiz, 100% */
  eq(a.qarz.jami, 486.2); eq(a.tasnif.kalit, "umidsiz");
  eq(a.zaxira, 486.2); eq(a.qoplash, 107); eq(a.ochiqQoldiq, 0);

  const b = D.topish("AK-2026/0141");        /* 34 дн. -> substandart, 25% */
  eq(b.qarz.jami, 38.6); eq(b.tasnif.kalit, "substandart");
  eq(b.zaxira, 9.7, "25% от 38.6 — то же число названо в BILDIRISHLAR");
  /* baho теперь производная от BAHOLASHLAR (155.0 от 12.05.2026),
     а не устаревшие 620 из карточки: 155/38.6 = 402% */
  eq(b.qoplash, 402);

  const c = D.topish("AK-2025/1187");        /* 402 дн. -> umidsiz */
  eq(c.tasnif.kalit, "umidsiz"); eq(c.zaxira, 3840.4); eq(c.ochiqQoldiq, 0);
});

/* ============================================================
   Группа 6. moslikTekshiruvi() — сторож согласованности (П-9).
   Сторож, который не умеет краснеть, бесполезен: каждый кейс
   ломает свежезагруженные данные и требует ровно одну ошибку
   с нужным текстом. После мутаций модуль перечитывается.
   ============================================================ */
guruh("6. moslikTekshiruvi(): чистые данные и мутации");

test("на текущих данных нарушений нет", () => {
  const M = yukla();
  const xato = M.moslikTekshiruvi();
  ok(Array.isArray(xato), "ожидался массив");
  eq(xato.length, 0, "нарушения: " + xato.join(" | "));
});

test("мутация: рассинхрон qarz.jami (+0.2) ловится с точной диагностикой", () => {
  const M = yukla();
  M.YOZUVLAR[0].qarz.jami += 0.2;
  const xato = M.moslikTekshiruvi();
  /* После добавления инварианта №11 мутация jami даёт ДВЕ ошибки:
     рассинхрон суммы и производный от него рассинхрон резерва —
     обе точные, обе с id записи. */
  ok(xato.length >= 1 && xato.length <= 2, "неожиданное число ошибок: " + xato.join(" | "));
  ok(xato.some(t => /qarz yig'indisi mos emas/.test(t)), "нет ошибки суммы: " + xato.join(" | "));
  ok(xato.every(t => t.includes(M.YOZUVLAR[0].id)), "ошибка без id записи: " + xato.join(" | "));
});

test("мутация в пределах допуска ±0.05 (+0.04) нарушением не считается", () => {
  const M = yukla();
  M.YOZUVLAR[0].qarz.jami += 0.04;
  eq(M.moslikTekshiruvi().length, 0);
});

test("мутация: битый obyektId в HODISALAR ловится как «obyekt havolasi uzilgan»", () => {
  const M = yukla();
  M.HODISALAR[0].obyektId = "AK-0000/0000";
  const xato = M.moslikTekshiruvi();
  eq(xato.length, 1, "ошибки: " + xato.join(" | "));
  ok(/obyekt havolasi uzilgan/.test(xato[0]), "не тот текст: " + xato[0]);
  ok(xato[0].includes("AK-0000/0000"), "в ошибке нет битого id: " + xato[0]);
  ok(xato[0].includes(M.HODISALAR[0].kod), "в ошибке нет кода события: " + xato[0]);
});

test("мутация: статус UCHASTKALAR, оторванный от этапа дела, ловится (Д-2)", () => {
  const M = yukla();
  const u = M.UCHASTKALAR.find(x => x.kod === "AK-2025/0755");
  ok(u, "в UCHASTKALAR нет участка AK-2025/0755");
  u.status = "Ta'minotda";                       /* по этапу ijro должно быть «Musodara jarayonida» */
  const xato = M.moslikTekshiruvi();
  eq(xato.length, 1, "ошибки: " + xato.join(" | "));
  ok(/uchastka statusi ish bosqichiga mos emas/.test(xato[0]), "не тот текст: " + xato[0]);
  ok(xato[0].includes("AK-2025/0755"), "в ошибке нет кода участка: " + xato[0]);
});

/* ============================================================
   Группа 7. tasnifStatistikasi() — срез портфеля по категориям (Д-7).
   Свежая загрузка: группа 6 оставила данные испорченными.
   ============================================================ */
guruh("7. tasnifStatistikasi(): срез по категориям");

const D7 = yukla();

test("ровно 5 категорий, порядок и ставки повторяют TASNIF", () => {
  const st = D7.tasnifStatistikasi();
  eq(st.length, D7.TASNIF.length);
  st.forEach((s, i) => {
    eq(s.kalit, D7.TASNIF[i].kalit, "порядок категорий");
    eq(s.foizStavka, D7.TASNIF[i].zaxira, "ставка категории " + s.kalit);
  });
});

test("сумма qarz по категориям сходится с jamiQarz(), zaxira — с jamiZaxira()", () => {
  const st = D7.tasnifStatistikasi();
  yaqin(st.reduce((a, s) => a + s.qarz, 0), D7.jamiQarz(), 0.05, "qarz");
  yaqin(st.reduce((a, s) => a + s.zaxira, 0), D7.jamiZaxira(), 0.05, "zaxira");
});

test("пустые категории присутствуют в срезе с нулевыми суммами", () => {
  const st = D7.tasnifStatistikasi();
  const bosh = st.filter(s => s.son === 0);
  ok(bosh.length > 0, "в текущих данных ожидались пустые категории (yaxshi, standart)");
  bosh.forEach(s => {
    eq(s.qarz, 0, "пустая категория " + s.kalit + " с ненулевым долгом");
    eq(s.zaxira, 0, "пустая категория " + s.kalit + " с ненулевым резервом");
  });
  ok(st.some(s => s.kalit === "yaxshi") && st.some(s => s.kalit === "standart"),
    "категории без записей выпали из среза");
});

test("количество записей по категориям в сумме равно числу YOZUVLAR", () => {
  const st = D7.tasnifStatistikasi();
  eq(st.reduce((a, s) => a + s.son, 0), D7.YOZUVLAR.length);
});

/* ============================================================
   Группа 8. tarjima.js — словарь интерфейса (ТЗ 5.3).
   Дубликат ключа в объектном литерале JS молча затирается,
   поэтому дубли ищутся построчным разбором исходника, а счётчики
   текста и рантайма сверяются между собой.
   ============================================================ */
guruh("8. tarjima.js: словарь перевода");

let lugatKesh = null;
function lugatOl() {
  if (lugatKesh) return lugatKesh;
  delete require.cache[require.resolve(TARJIMA_YOLI)];
  global.window = {};
  require(TARJIMA_YOLI);
  const lugat = global.window.MKB_LUGAT;

  const qatorlar = fs.readFileSync(TARJIMA_YOLI, "utf8").split(/\r?\n/);
  const kalitRe = /^\s*"((?:[^"\\]|\\.)*)"\s*:/;
  const korilgan = new Map();
  const dublikatlar = [];
  let matnKalitlar = 0;
  qatorlar.forEach((qator, i) => {
    const m = qator.match(kalitRe);
    if (!m) return;
    matnKalitlar++;
    if (korilgan.has(m[1]))
      dublikatlar.push("строка " + (i + 1) + " повторяет строку " +
        (korilgan.get(m[1]) + 1) + ": " + JSON.stringify(m[1].slice(0, 60)));
    else korilgan.set(m[1], i);
  });
  lugatKesh = { lugat, matnKalitlar, dublikatlar };
  return lugatKesh;
}

test("модуль парсится и публикует window.MKB_LUGAT (объект)", () => {
  const { lugat } = lugatOl();
  ok(lugat && typeof lugat === "object" && !Array.isArray(lugat));
});

test("ключей не меньше 800", () => {
  const soni = Object.keys(lugatOl().lugat).length;
  ok(soni >= 800, "ключей всего " + soni);
});

test("построчный разбор видит все записи: счётчик текста равен рантайму", () => {
  const { lugat, matnKalitlar } = lugatOl();
  /* если появятся многострочные записи, парсер их потеряет,
     и этот тест потребует его обновить */
  eq(matnKalitlar, Object.keys(lugat).length);
});

test("дублей ключей нет (построчно, до схлопывания литералом)", () => {
  const { dublikatlar } = lugatOl();
  eq(dublikatlar.length, 0, "\n  " + dublikatlar.join("\n  "));
});

test("каждое значение — непустая строка", () => {
  const { lugat } = lugatOl();
  const yomon = Object.entries(lugat)
    .filter(([, v]) => typeof v !== "string" || v.trim() === "")
    .map(([k]) => k);
  eq(yomon.length, 0, "пустые переводы: " + yomon.join(", "));
});

/* ---------------- исполнение ---------------- */
let otdi = 0, yiqildi = 0;
for (const g of guruhlar) {
  console.log("\n" + g.nom);
  for (const t of g.testlar) {
    try {
      t.fn();
      otdi++;
      console.log("  [OK]   " + t.nom);
    } catch (e) {
      yiqildi++;
      console.log("  [FAIL] " + t.nom);
      console.log("         " + String(e.message).split("\n").join("\n         "));
    }
  }
}
console.log("\nИтог: пройдено " + otdi + ", провалено " + yiqildi +
  ", всего " + (otdi + yiqildi));
if (yiqildi > 0) process.exit(1);
