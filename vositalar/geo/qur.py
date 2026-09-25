# -*- coding: utf-8 -*-
"""assets/geo/ uchun chegara fayllarini yig'adi."""
import json, sys, io, os, unicodedata
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
from shapely.geometry import shape, mapping
from shapely.ops import unary_union
from shapely.geometry.polygon import orient
import arclib, nomlar

HAVZA = os.path.dirname(os.path.abspath(__file__))        # vositalar/geo
ILDIZ = os.path.dirname(os.path.dirname(HAVZA))           # repo ildizi
SRC = os.path.join(HAVZA, 'manba', 'UZB-ADM2.geojson')   # yuklab olingan geoBoundaries fayli
OUT = os.path.join(ILDIZ, 'assets', 'geo')               # natija shu yerga yoziladi
TOL = float(sys.argv[1]) if len(sys.argv) > 1 else 0.0003
PREC = int(sys.argv[2]) if len(sys.argv) > 2 else 5

CYR = {'\u0430':'a','\u0435':'e','\u043e':'o','\u0440':'r','\u0441':'c','\u0445':'x','\u0443':'y'}
def toza(s):
    s = unicodedata.normalize('NFC', s)
    return ''.join(CYR.get(c, c) for c in s)

src = json.load(open(SRC, encoding='utf-8'))
feats = src['features']

# Manba 2020-yilgi holatni beradi: Toshkent shahriga o'tgan yer hali "Urtachirchik"
# tarkibida, uzilgan bo'lak sifatida turibdi. Shu bo'lakni Yangihayot tumani qilib ajratamiz.
for f in list(feats):
    if f['properties']['shapeName'] != 'Urtachirchik': continue
    g = f['geometry']
    if g['type'] != 'MultiPolygon': break
    qismlar = sorted(g['coordinates'], key=lambda p: shape({'type': 'Polygon', 'coordinates': p}).area)
    kichik, katta = qismlar[0], qismlar[1:]
    f['geometry'] = {'type': 'Polygon', 'coordinates': katta[0]} if len(katta) == 1 \
                    else {'type': 'MultiPolygon', 'coordinates': katta}
    feats.append({'type': 'Feature', 'properties': {'shapeName': 'Yangihayot'},
                  'geometry': {'type': 'Polygon', 'coordinates': kichik}})
    print('Yangihayot ajratildi, yuza deg2:',
          round(shape({'type': 'Polygon', 'coordinates': kichik}).area, 5))
    break

geoms = [f['geometry'] for f in feats]
noms = [toza(f['properties']['shapeName']) for f in feats]

arcs, ringarcs = arclib.build(geoms)
print('yoylar:', len(arcs), 'nuqtalar:', sum(len(v) for v in arcs.values()))
simple = arclib.simplify_arcs(arcs, TOL, PREC)
print('soddalashtirilgandan keyin nuqtalar:', sum(len(v) for v in simple.values()))
yangi = arclib.rebuild(geoms, arcs, ringarcs, simple)

# ---- tumanlar ----
yozuv = []
for i, g in enumerate(yangi):
    if g is None:
        print('BO\'SH:', noms[i]); continue
    kod, uz, ru = nomlar.TUMAN[noms[i]]
    yozuv.append({'hudud': kod, 'nom_uz': uz, 'nom_ru': ru, 'geom': g})
yozuv.sort(key=lambda r: (r['hudud'], r['nom_uz']))
raqam = {}
for r in yozuv:
    raqam[r['hudud']] = raqam.get(r['hudud'], 0) + 1
    r['kod'] = '%s-T%02d' % (r['hudud'], raqam[r['hudud']])

def markaz(sh):
    p = sh.representative_point()
    return [round(p.y, 5), round(p.x, 5)]

def rfc(g):
    """RFC 7946: tashqi halqa soat yo'nalishiga teskari, ichki halqa soat yo'nalishi bo'yicha.
    Leaflet buni sezmaydi, lekin fayl boshqa vositaga yuklanganda teshik to'lib ketmasligi kerak."""
    sh = shape(g)
    if not sh.is_valid: sh = sh.buffer(0)
    if sh.geom_type == 'Polygon': sh = orient(sh, 1.0)
    else: sh = type(sh)([orient(p, 1.0) for p in sh.geoms])
    return json.loads(json.dumps(mapping(sh)))

tf = []
for r in yozuv:
    sh = shape(r['geom'])
    if not sh.is_valid: sh = sh.buffer(0)
    r['geom'] = rfc(r['geom'])
    tf.append({'type': 'Feature',
               'properties': {'kod': r['kod'], 'nom_uz': r['nom_uz'], 'nom_ru': r['nom_ru'],
                              'daraja': 2, 'hudud': r['hudud'], 'markaz': markaz(sh)},
               'geometry': r['geom']})

# ---- hududlar: soddalashtirilgan tumanlarni birlashtirish ----
guruh = {}
for r in yozuv:
    guruh.setdefault(r['hudud'], []).append(shape(r['geom']).buffer(0))
hf = []
TARTIB = ['QR','XO','BU','NV','SA','QA','SU','JI','SI','TS','TV','NA','AN','FA']
for kod in TARTIB:
    u = unary_union(guruh[kod])
    if u.geom_type == 'Polygon': parts = [u]
    else: parts = [p for p in u.geoms]
    # mayda parchalar va ichki teshiklarni tashlash (soddalashtirish qoldig'i)
    parts = [p for p in parts if p.area > 1e-5]
    net = []
    for p in parts:
        ichki = [r for r in p.interiors if shape({'type':'Polygon','coordinates':[list(r.coords)]}).area > 1e-5]
        net.append({'type': 'Polygon', 'coordinates':
                    [[[round(x, PREC), round(y, PREC)] for x, y in p.exterior.coords]] +
                    [[[round(x, PREC), round(y, PREC)] for x, y in r.coords] for r in ichki]})
    if len(net) == 1: g = net[0]
    else: g = {'type': 'MultiPolygon', 'coordinates': [p['coordinates'] for p in net]}
    sh = shape(g).buffer(0)
    g = rfc(g)
    nom, toliq, rnom, rtoliq = nomlar.HUDUD[kod]
    hf.append({'type': 'Feature',
               'properties': {'kod': kod, 'nom_uz': nom, 'nom_ru': rnom, 'daraja': 1,
                              'toliq_uz': toliq, 'toliq_ru': rtoliq, 'markaz': markaz(sh),
                              'tumanlar': sum(1 for r in yozuv if r['hudud'] == kod)},
               'geometry': g})
    print(kod, nom, 'qismlar:', len(net), 'nuqtalar:', sum(len(rr) for p in net for rr in p['coordinates']))

# ---- nazorat: shahar o'z tumanidan katta bo'lib qolmasin ----
# Manbada Kogon shahri va tumani almashgan edi (nomlar.py da tuzatildi). Xuddi shunday
# almashish boshqa juftlikda ham bo'lishi mumkin, shuning uchun har safar tekshiriladi.
yuza = {r['nom_uz']: shape(r['geom']).area for r in yozuv}
xato = []
for nom_sh, s_yuza in yuza.items():
    if not nom_sh.endswith(' shahri'): continue
    nom_t = nom_sh[:-len(' shahri')] + ' tumani'
    if nom_t in yuza and s_yuza > yuza[nom_t]:
        xato.append('%s (%.4f) > %s (%.4f)' % (nom_sh, s_yuza, nom_t, yuza[nom_t]))
if xato:
    print('XATO: shahar o'z tumanidan katta:')
    for x in xato: print('  ', x)
    sys.exit(1)
print('nazorat: shahar/tuman yuzalari tartibda')

os.makedirs(OUT, exist_ok=True)
def yoz(nom, fc):
    yol = os.path.join(OUT, nom)
    s = json.dumps(fc, ensure_ascii=False, separators=(',', ':'))
    open(yol, 'w', encoding='utf-8', newline='\n').write(s)
    print(nom, len(s.encode('utf-8')) // 1024, 'KB')

MANBA = ('OCHA ROCCA / geoBoundaries gbOpen UZB ADM2 (CC BY 3.0 IGO). '
         'Hududlar tuman chegaralarini birlashtirish yo\'li bilan olingan.')
yoz('hududlar.geojson', {'type': 'FeatureCollection', 'nomi': 'O\'zbekiston hududlari',
                         'daraja': 1, 'manba': MANBA, 'features': hf})
yoz('tumanlar.geojson', {'type': 'FeatureCollection', 'nomi': 'O\'zbekiston tumanlari',
                         'daraja': 2, 'manba': MANBA, 'features': tf})
