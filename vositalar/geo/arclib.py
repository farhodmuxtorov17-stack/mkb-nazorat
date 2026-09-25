# -*- coding: utf-8 -*-
"""Topologiyani saqlab soddalashtirish: umumiy chegara yoylari bir marta soddalashtiriladi."""
from collections import defaultdict
from shapely.geometry import LineString

P = 6  # manba aniqligi

def _k(pt): return (round(pt[0], P), round(pt[1], P))

def rings_of(geom):
    if geom['type'] == 'Polygon':
        return [('P', 0, i, r) for i, r in enumerate(geom['coordinates'])]
    out = []
    for j, poly in enumerate(geom['coordinates']):
        for i, r in enumerate(poly):
            out.append(('M', j, i, r))
    return out

def build(feats):
    """feats: [geometry dict]. -> (arclar, har bir feature uchun ring->arc id ro'yxati)"""
    segowner = defaultdict(set)
    rings = []          # (fi, tag, j, i, pts)
    for fi, g in enumerate(feats):
        for tag, j, i, r in rings_of(g):
            pts = [_k(p) for p in r]
            if pts[0] != pts[-1]: pts.append(pts[0])
            rings.append((fi, tag, j, i, pts))
            for a, b in zip(pts, pts[1:]):
                segowner[(a, b) if a <= b else (b, a)].add(fi)

    arcs = {}           # kalit -> nuqtalar (kanonik yo'nalish)
    ringarcs = []       # (fi, tag, j, i, [(kalit, teskari)])
    for fi, tag, j, i, pts in rings:
        sig = [frozenset(segowner[(a, b) if a <= b else (b, a)]) for a, b in zip(pts, pts[1:])]
        n = len(sig)
        brk = [x for x in range(n) if sig[x] != sig[x - 1]]   # segment x boshida uzilish
        if not brk:
            # yopiq yagona yoy: eng kichik nuqtadan boshlanadi
            s = min(range(n), key=lambda x: pts[x])
            rot = pts[s:-1] + pts[:s]; rot.append(rot[0])
            if len(rot) > 2 and rot[1] > rot[-2]: rot = rot[::-1]
            segs = [rot]
        else:
            segs = []
            for a, b in zip(brk, brk[1:] + [brk[0] + n]):
                segs.append([pts[x % n] for x in range(a, b)] + [pts[b % n]])
        lst = []
        for arc in segs:
            rev = arc[::-1]
            if rev < arc: key, flip = tuple(rev), True
            else:         key, flip = tuple(arc), False
            arcs.setdefault(key, list(key))
            lst.append((key, flip))
        ringarcs.append((fi, tag, j, i, lst))
    return arcs, ringarcs

def simplify_arcs(arcs, tol, prec):
    out = {}
    for key, pts in arcs.items():
        p = pts
        if tol > 0 and len(p) > 2:
            closed = p[0] == p[-1]
            s = list(LineString(p).simplify(tol, preserve_topology=False).coords)
            if len(s) >= (4 if closed else 2): p = s
        p = [(round(x, prec), round(y, prec)) for x, y in p]
        q = [p[0]] + [c for a, c in zip(p, p[1:]) if a != c]
        if len(q) < 2: q = list(pts)[:2]
        out[key] = q
    return out

def rebuild(feats, arcs, ringarcs, simple):
    per = defaultdict(lambda: defaultdict(dict))   # fi -> j -> i -> ring
    for fi, tag, j, i, lst in ringarcs:
        pts = []
        for key, flip in lst:
            a = simple[key]
            if flip: a = a[::-1]
            pts.extend(a if not pts else a[1:])
        if pts[0] != pts[-1]: pts.append(pts[0])
        if len(pts) < 4: continue
        per[fi][j][i] = [list(p) for p in pts]
    geoms = []
    for fi, g in enumerate(feats):
        d = per[fi]
        if g['type'] == 'Polygon':
            rs = [d[0][i] for i in sorted(d[0])] if 0 in d else []
            geoms.append({'type': 'Polygon', 'coordinates': rs} if rs else None)
        else:
            polys = []
            for j in sorted(d):
                rs = [d[j][i] for i in sorted(d[j])]
                if rs: polys.append(rs)
            geoms.append({'type': 'MultiPolygon', 'coordinates': polys} if polys else None)
    return geoms
