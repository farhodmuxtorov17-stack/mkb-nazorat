# -*- coding: utf-8 -*-
"""
Bank balansidagi mol-mulk taqdimotidan (.pptx) haqiqiy obyektlarni tizimga yuklash.

    python vositalar/import_taqdimot.py "D:\\...\\Taqdimot.pptx"

Natija faqat shu kompyuterda qoladi: mahalliy/obyektlar.json va mahalliy/rasm/*.jpg.
"mahalliy/" papkasi .gitignore ro'yxatida — repozitoriyga va internetga chiqmaydi.
Tizim bu faylni faqat localhost orqali ochilganda o'qiydi.
Talab: Python 3.9+, suratlar uchun Pillow (bo'lmasa suratsiz import qilinadi).
"""
import io, json, os, re, sys, zipfile
from xml.etree import ElementTree as ET

A = "{http://schemas.openxmlformats.org/drawingml/2006/main}"
ILDIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CHIQISH = os.path.join(ILDIZ, "mahalliy")

# ---------- Kirill -> lotin ----------
JUFT = [("ё", "yo"), ("ю", "yu"), ("я", "ya"), ("ш", "sh"), ("ч", "ch"), ("ғ", "g'"), ("ў", "o'"), ("қ", "q"), ("ҳ", "h"), ("ц", "ts"), ("щ", "sh"),
        ("а", "a"), ("б", "b"), ("в", "v"), ("г", "g"), ("д", "d"), ("ж", "j"), ("з", "z"), ("и", "i"), ("й", "y"), ("к", "k"), ("л", "l"),
        ("м", "m"), ("н", "n"), ("о", "o"), ("п", "p"), ("р", "r"), ("с", "s"), ("т", "t"), ("у", "u"), ("ф", "f"), ("х", "x"), ("ъ", "'"),
        ("ь", ""), ("ы", "i"), ("э", "e")]
def lotin(m):
    if not m: return ""
    m = re.sub(r"(^|[\s\-\"«“(])е", lambda x: x.group(1) + "ye", m)
    m = re.sub(r"(^|[\s\-\"«“(])Е", lambda x: x.group(1) + "Ye", m)
    m = m.replace("е", "e").replace("Е", "E")
    for k, l in JUFT:
        m = m.replace(k, l).replace(k.upper(), l.capitalize() if len(l) > 1 else l.upper())
    return re.sub(r"\s+", " ", m).strip()

# ---------- Hudud ----------
HUDUD = [("QR", r"Қорақалп|Қоракалп|Корақалп|Нукус|Qoraqalp"), ("XO", r"Хоразм|Урганч|Хива"), ("NV", r"Навоий|Кармана|Қизилтепа"),
         ("BU", r"Бухоро|Ғиждувон|Когон"), ("SA", r"Самар[қк]анд"), ("QA", r"Қашқадар|Қарши"), ("SU", r"Сурх[оа]ндар|Термиз|Денов"),
         ("JI", r"Жизза"), ("SI", r"Сирдарё|Гулистон"), ("TS", r"Тошкент\s*ш|Тошкент шаҳ|Юнусобод|Чилонзор|Сир[ғг]али|Яшнобод|Шайхонто|Мирзо Улу[ғг]бек|Олмазор|Учтепа|Яккасарой|Миробод|Бектемир"), ("TV", r"Тошкент\s*вил"),
         ("NA", r"Наманган"), ("FA", r"Фар[ғг]она|Қўқон"), ("AN", r"Андижон")]
HUDUD_NOMI = {"QR": "Qoraqalpog'iston", "XO": "Xorazm", "NV": "Navoiy", "BU": "Buxoro", "SA": "Samarqand", "QA": "Qashqadaryo", "SU": "Surxondaryo",
              "JI": "Jizzax", "SI": "Sirdaryo", "TS": "Toshkent sh.", "TV": "Toshkent vil.", "NA": "Namangan", "FA": "Farg'ona", "AN": "Andijon"}
def hudud_top(*matnlar):
    for m in matnlar:
        for k, q in HUDUD:
            if m and re.search(q, m, re.I): return k
    return None

# ---------- Tur ----------
def tur_top(matn):
    m = matn.lower()
    if re.search(r"автом|транспорт|русумли|cobalt|damas|lacetti|nexia|dongfeng|ман|man|isuzu|камаз|давлат рақам", m):
        return ("transport", "Transport vositasi", "yuk" if re.search(r"ман|man|isuzu|камаз|юк|dongfeng", m) else "avto", False)
    if re.search(r"махсус техника|комбайн|экскаватор|трактор|юклагич|қорғич|ётқизғич|ёқизғич", m): return ("texnika", "Maxsus texnika", "texnika", False)
    if re.search(r"асбоб|ускуна|линия|тегирмон|дастгоҳ|станок", m): return ("uskuna", "Asbob-uskuna", "uskuna", False)
    if re.search(r"турар|хонадон|яшаш", m) and not re.search(r"нотурар", m):
        return ("turar", "Turar joy", "kopqavat" if re.search(r"кўп қаватли|хонадон", m) else "uy", True)
    rasm = ("ombor" if "омбор" in m else "ferma" if re.search(r"молхона|чорва|парранда|товуқ|қуён|балиқ|ферма", m) else "issiqxona" if "иссиқхона" in m or "иссикхона" in m
            else "dokon" if re.search(r"дўкон|савдо|чойхона|кафе|дорихона|хаммом", m) else "sex" if re.search(r"цех|завод|ишлаб чиқариш|фабрика", m) else "mamuriy")
    return ("noturar", "Noturar bino", rasm, True)

OYLAR = {"январ": 1, "феврал": 2, "март": 3, "апрел": 4, "май": 5, "июн": 6, "июл": 7, "август": 8, "сентябр": 9, "октябр": 10, "ноябр": 11, "декабр": 12}
def sana_top(m):
    if not m: return None
    q = re.search(r"(\d{1,2})[.\-/](\d{1,2})[.\-/](20\d\d)", m)
    if q: return "%s-%02d-%02d" % (q.group(3), int(q.group(2)), int(q.group(1)))
    yil = re.search(r"(20\d\d)", m)
    if not yil: return None
    kun = re.search(r"(?<!\d)(\d{1,2})\s", m.replace(yil.group(1), ""))
    for nom, n in OYLAR.items():
        if nom in m.lower(): return "%s-%02d-%02d" % (yil.group(1), n, int(kun.group(1)) if kun and 1 <= int(kun.group(1)) <= 28 else 15)
    return yil.group(1) + "-06-15"

def summa_top(m):
    """mln so'mda qaytaradi"""
    if not m or not re.search(r"\d", m): return None
    m = m.replace("\u00a0", " ")
    q = re.search(r"(\d+)\s*млрд\.?\s*(\d+)\s*млн", m)
    if q: return int(q.group(1)) * 1000 + int(q.group(2))
    q = re.search(r"([\d\s.,]+)", m)
    xom = q.group(1).strip().rstrip(".,")
    if re.search(r"\d\.\d{3}(\D|$)", xom) and "," not in xom: xom = xom.replace(".", "")
    try: n = float(xom.replace(" ", "").replace(",", "."))
    except ValueError: return None
    if n >= 1e6: return round(n / 1e6, 1)
    if "млрд" in m: return round(n * 1000, 1) if n < 1000 else round(n, 1)      # "1 239 млрд" — manbadagi xato, aslida mln
    return round(n, 1)

def maydon_top(matn, kalit):
    q = re.search(kalit + r"[^\d]{0,24}([\d\s.,]+)", matn, re.I)
    if not q: return 0
    xom = q.group(1).strip().rstrip(".,").replace(" ", "")
    if re.search(r"\d\.\d{3}", xom): xom = xom.replace(".", "")
    try: return round(float(xom.replace(",", ".")))
    except ValueError: return 0

def asosiy(pptx):
    z = zipfile.ZipFile(pptx)
    slaydlar = sorted([n for n in z.namelist() if re.match(r"ppt/slides/slide\d+\.xml$", n)], key=lambda n: int(re.findall(r"\d+", n)[0]))
    os.makedirs(os.path.join(CHIQISH, "rasm"), exist_ok=True)
    try:
        from PIL import Image
    except ImportError:
        Image = None
        print("Pillow topilmadi — suratlar import qilinmaydi (pip install pillow)")
    obyektlar, oxirgi_hudud, filiallar = [], None, {}
    for s in slaydlar:
        raqam = int(re.findall(r"\d+", s)[0])
        ildiz = ET.fromstring(z.read(s))
        qatorlar = [t for t in ("".join(x.text or "" for x in p.iter(A + "t")).strip() for p in ildiz.iter(A + "p")) if t]
        matn = "\n".join(qatorlar)
        qiymat_q = re.search(r"(?:Баланс|Мулк)\s*[кқ]иймати\s*:?\s*(.+)", matn)
        if not qiymat_q: continue
        qiymat = summa_top(qiymat_q.group(1))
        if not qiymat: continue
        manzil_q = re.search(r"Жойлашган\s+ма\w+\s*:?\s*:?\s*(.+)", matn)
        manzil = manzil_q.group(1).strip(" :") if manzil_q else ""
        filial_q = re.search(r"^(.*(?:БХМ|БХО|BXM|BXO|бошқармаси))\s*$", matn, re.M)
        filial = filial_q.group(1).strip() if filial_q else ""
        hudud = hudud_top(manzil, filial, matn) or oxirgi_hudud or "TS"
        oxirgi_hudud = hudud
        sana = sana_top((re.search(r"Баланс\w*\s+олинган\s+сана\w*\s*:?\s*(.+)", matn) or [None, ""])[1]) or "2025-06-15"
        if sana > __import__("datetime").date.today().isoformat(): sana = str(int(sana[:4]) - 1) + sana[4:]      # manbadagi yil xatosi
        sotish_q = re.search(r"Сотиш\s+(?:[қк]иймати|нархи|ба[ҳх]оси)\s*:?\s*-?\s*(.+)", matn)
        sotish = summa_top(sotish_q.group(1)) if sotish_q else None
        ega = next((q for q in qatorlar if re.search(r"МЧЖ|MCHJ|MChJ|ХК|X/K|ф/х|f/x|ЯТТ|YATT|ICHK|NTM|СП |«|“|\"", q)
                    and not re.search(r"манзил|[кқ]иймати|майдон|сана", q, re.I)), "")
        tur_kalit, tur, rasm_turi, binoli = tur_top(matn)
        yaroqli = [q for q in qatorlar if not re.search(r"майдон|манзил|[кқ]иймати|ба[ҳх]оси|нарх|сана|[БB][ХXх][МMОOмо]\b|бошқармаси|филиал|МЧЖ|MCHJ|кв\.?м|\d{3}", q, re.I) and 3 < len(q) < 60 and q != ega]
        qavs = re.search(r"\(([^()\d]{4,48})\)", matn)       # "Нотурар бино (Омборхона)" -> aniqroq nom
        nom = qavs.group(1).strip().capitalize() if qavs else (yaroqli[0] if yaroqli else tur)
        tuman_q = re.search(r"([\w'ўқғҳЎҚҒҲ\.\s]+?)\s+(?:тумани|туман|шаҳар|шахар|шаҳри|шахри)", manzil)
        f_lotin = lotin(filial) or HUDUD_NOMI[hudud] + " BXO"
        f_lotin = re.sub(r"\bBXM\b|\bBXO\b", lambda q: q.group(0), f_lotin.replace("BXM", "BXM").replace("Bxm", "BXM").replace("Bxo", "BXO"))
        f_id = f_lotin      # vaqtincha; hudud ovozi aniqlangach raqamlanadi
        rasm = None
        if Image:
            try:
                rels = z.read("ppt/slides/_rels/slide%d.xml.rels" % raqam).decode("utf-8", "ignore")
                nomzodlar = [(z.getinfo("ppt/media/" + t).file_size, t) for t in re.findall(r'Target="\.\./media/([^"]+)"', rels) if t.lower().endswith((".jpg", ".jpeg", ".png", ".jfif"))]
                nomzodlar = [n for n in nomzodlar if n[0] > 40000]
                fotolar = [n for n in nomzodlar if not n[1].lower().endswith(".png")]      # PNG ko'pincha xarita skrinshoti
                if fotolar: nomzodlar = fotolar
                if nomzodlar:
                    im = Image.open(io.BytesIO(z.read("ppt/media/" + max(nomzodlar)[1]))).convert("RGB")
                    im.thumbnail((1280, 960))
                    im.save(os.path.join(CHIQISH, "rasm", "%d.jpg" % raqam), quality=80, optimize=True)
                    rasm = "mahalliy/rasm/%d.jpg" % raqam
            except Exception as xato:
                print("  slayd %d: surat o'qilmadi (%s)" % (raqam, xato))
        obyektlar.append({
            "id": "BM-%s/%04d" % (sana[:4], raqam), "nom": lotin(nom)[:70], "tur": tur, "turKalit": tur_kalit, "rasmTuri": rasm_turi, "binoli": binoli,
            "hudud": hudud, "hududNomi": HUDUD_NOMI[hudud], "tuman": (lotin(tuman_q.group(1)).split(",")[-1].strip() + " tumani") if tuman_q else f_lotin,
            "manzil": lotin(manzil) or HUDUD_NOMI[hudud], "filial": f_id, "filialNomi": f_lotin, "sobiqEga": lotin(ega) or "—",
            "yerMaydon": maydon_top(matn, r"(?:Умумий|ер)\s*(?:ер\s*)?майдони") if binoli else 0,
            "qurilishOsti": maydon_top(matn, r"[ҚК]урилиш\s*ости") if binoli else 0,
            "foydaliMaydon": (maydon_top(matn, r"Фойдал\w*\s*майдони") or maydon_top(matn, r"Яшаш\s*майдони") or maydon_top(matn, r"[ҚК]урилиш\s*ости") or 1) if binoli else 0,
            "tafsilot": None if binoli else lotin(" ".join(qatorlar[:2]))[:120],
            "balansQiymat": qiymat, "balansSana": sana, "sotishQiymat": sotish,
            "holat": "Sotuvga tayyorlanmoqda" if sotish else "Balansda", "rasm": rasm, "urug": 7000 + raqam * 13,
        })
    # Bank hududni filial bo'yicha yuritadi: filialdagi obyektlar manzilining ko'pchiligi filial hududini belgilaydi
    ovoz = {}
    for o in obyektlar:
        ovoz.setdefault(o["filialNomi"], {}).setdefault(o["hudud"], 0)
        ovoz[o["filialNomi"]][o["hudud"]] += 1
    for nom, v in ovoz.items():
        h = "TS" if re.search(r"Amaliyot|Bosh ofis|Toshkent sha", nom) else max(v, key=v.get)      # bosh ofis bo'linmalari Toshkent shahri hisobida
        filiallar[nom] = "%s-%02d" % (h, len([1 for x in filiallar.values() if x.startswith(h)]) + 1)
    for o in obyektlar:
        o["filial"] = filiallar[o["filialNomi"]]
        o["hudud"] = o["filial"][:2]
        o["hududNomi"] = HUDUD_NOMI[o["hudud"]]
    os.makedirs(CHIQISH, exist_ok=True)
    with io.open(os.path.join(CHIQISH, "obyektlar.json"), "w", encoding="utf-8") as f:
        json.dump({"manba": os.path.basename(pptx), "obyektlar": obyektlar,
                   "filiallar": [{"id": v, "nom": k, "hudud": v[:2], "turi": "BXM" if "BXM" in k else "BXO"} for k, v in filiallar.items()]}, f, ensure_ascii=False)
    jami = sum(o["balansQiymat"] for o in obyektlar)
    print("Import qilindi: %d obyekt, %d surat, jami %.1f mlrd so'm" % (len(obyektlar), sum(1 for o in obyektlar if o["rasm"]), jami / 1000))
    print("Fayl: " + os.path.join(CHIQISH, "obyektlar.json"))

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(__doc__); sys.exit(1)
    asosiy(sys.argv[1])
