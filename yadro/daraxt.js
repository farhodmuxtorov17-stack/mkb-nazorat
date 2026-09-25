/* Bo'lim -> sahifalar daraxti.
   MKB_DARAXT — bo'limning nomlangan sahifalari: yozuv raqamisiz ochiladi. Bo'lim markazidagi
   "Bo'lim sahifalari" kartasi, Ctrl+K qidiruvi va havola tekshiruvi shu ro'yxatdan oziqlanadi.
   Yon panel endi yassi: bir bo'lim — bir band (yadro/app.js ROL_YON), shuning uchun bu ro'yxat
   yon panelda ochilmaydi, lekin hech bir sahifa ro'yxatdan tushmaydi.
   MKB_ICHKI — yozuv kartochkasi, sehrgar qadami va chop etiladigan dalolatnomalar: ?id= yoki
   oldingi qadamsiz ma'nosi yo'q, shuning uchun sahifa qidiruvida ko'rsatilmaydi.
   Bo'lim kalitlari yadro/app.js dagi BOLIMLAR bilan bir xil. Sahifalardagi eski data-sahifa
   kalitlari (himoya, korik, realizatsiya, yuridik, vazifa, kn, baholash) app.js dagi
   BOLIM_TAXALLUS orqali yangi kalitga keltiriladi. */
window.MKB_DARAXT = {
 "panel": [
  {"f": "panel.html", "n": "Rahbariyat paneli"},
  {"f": "panel-obyekt.html", "n": "Obyekt menejeri paneli"},
  {"f": "panel-nazorat.html", "n": "Ko&#39;rik va xavfsizlik paneli"},
  {"f": "panel-moliya.html", "n": "Moliya paneli"}
 ],
 "aktivlar": [
  {"f": "obyektlar.html", "n": "Reyestr"},
  {"f": "muddatlar.html", "n": "Muddatlar"},
  {"f": "xarita.html", "n": "Xaritada"},
  {"f": "qabul-boshlash.html", "n": "Balansga qabul"},
  {"f": "rasmiylashtirish.html", "n": "Huquqni rasmiylashtirish"},
  {"f": "arxiv.html", "n": "Arxiv va chiqim"}
 ],
 "nazorat": [
  {"f": "himoya.html", "n": "Monitoring markazi"},
  {"f": "korik-rejasi.html", "n": "Ko&#39;rik rejasi"},
  {"f": "inventarizatsiya.html", "n": "Inventarizatsiya"},
  {"f": "qurilmalar.html", "n": "Qurilmalar"},
  {"f": "hodisalar.html", "n": "Hodisalar"},
  {"f": "qoriqlash.html", "n": "Qo&#39;riqlash"},
  {"f": "korik-kechikkan.html", "n": "Kechikkan ko&#39;riklar"},
  {"f": "korik-tarixi.html", "n": "Ko&#39;riklar tarixi"},
  {"f": "korik-tayinlash.html", "n": "Ko&#39;rik tayinlash"},
  {"f": "masofaviy-korik.html", "n": "Masofaviy ko&#39;rik"},
  {"f": "kommunal.html", "n": "Kommunal"},
  {"f": "ruxsatlar.html", "n": "Ruxsatlar"},
  {"f": "tashriflar.html", "n": "Tashriflar"},
  {"f": "kirish-voqealari.html", "n": "Signallar"}
 ],
 "qiymat": [
  {"f": "baholash.html", "n": "Baholash"},
  {"f": "baholash-buyurtma.html", "n": "Baholash buyurtmasi"},
  {"f": "zaxira.html", "n": "Zaxira (MB 2696)"},
  {"f": "soliq.html", "n": "Soliq"},
  {"f": "sugurta.html", "n": "Sug&#39;urta polislari"}
 ],
 "sotuv": [
  {"f": "realizatsiya.html", "n": "Sotuv rejasi"},
  {"f": "lotlar.html", "n": "E-auksion lotlari"},
  {"f": "takliflar.html", "n": "Takliflar"},
  {"f": "shartnomalar.html", "n": "Shartnomalar va to&#39;lovlar"},
  {"f": "ijara.html", "n": "Ijara"},
  {"f": "undiruv.html", "n": "Undiruv ishlari"},
  {"f": "sud-kalendar.html", "n": "Sud kalendari"},
  {"f": "davo-tayyorlash.html", "n": "Da&#39;vo tayyorlash"}
 ],
 "ishlar": [
  {"f": "vazifalar.html", "n": "Vazifalar"},
  {"f": "tasdiqlar.html", "n": "Qarorlar"},
  {"f": "bildirishnomalar.html", "n": "Bildirishnomalar"}
 ],
 "hisobot": [
  {"f": "hisobotlar.html", "n": "Hisobotlar markazi"},
  {"f": "hisobot-portfel.html", "n": "Balans aktivlari"},
  {"f": "hisobot-mb.html", "n": "MB oylik hisoboti"},
  {"f": "hisobot-xarajat.html", "n": "Xarajatlar"},
  {"f": "hisobot-kpi.html", "n": "Nazorat indeksi"},
  {"f": "hisobot-hudud.html", "n": "Hududlar kesimi"},
  {"f": "hisobot-undiruv.html", "n": "Undiruv va sud ishlari"},
  {"f": "kirish-hisoboti.html", "n": "Kirish nazorati"},
  {"f": "hisobot-eksport.html", "n": "Ma&#39;lumot eksporti"}
 ],
 "sozlama": [
  {"f": "sozlamalar.html", "n": "Profil va qoidalar"},
  {"f": "foydalanuvchilar.html", "n": "Foydalanuvchilar"},
  {"f": "rollar.html", "n": "Rollar"},
  {"f": "filiallar.html", "n": "Filiallar"},
  {"f": "integratsiyalar.html", "n": "Integratsiyalar"},
  {"f": "amallar-tarixi.html", "n": "Amallar tarixi"},
  {"f": "qollanma.html", "n": "Qo&#39;llanma"}
 ]
};
window.MKB_ICHKI = {
 "aktivlar": [
  "obyekt.html",
  "obyekt-suratlar.html",
  "obyekt-moliya.html",
  "obyekt-hujjatlar.html",
  "obyekt-koriklar.html",
  "obyekt-xarajatlar.html",
  "obyekt-kommunal.html",
  "obyekt-himoya.html",
  "obyekt-sotuv.html",
  "obyekt-tarix.html",
  "obyekt-pasport.html",
  "obyekt-tahrir.html",
  "qabul-hujjatlar.html",
  "qabul-tasdiqlash.html",
  "qabul-dalolatnoma.html",
  "arxiv-obyekt.html",
  "chiqim-tasdiqlash.html"
 ],
 "nazorat": [
  "korik-otkazish.html",
  "korik-akti.html",
  "inventar-dalolatnoma.html",
  "qurilma.html",
  "qurilma-ornatish.html",
  "servis-topshirigi.html",
  "hodisa.html",
  "kirish-soravi.html",
  "tashrif-jonli.html",
  "tashrif-chiqish.html",
  "kirish-voqea.html"
 ],
 "qiymat": [
  "baholash-hisobot-kiritish.html",
  "baholash-hisobot.html",
  "sugurta-polis.html",
  "sugurta-yangilash.html"
 ],
 "sotuv": [
  "lot.html",
  "shartnoma.html",
  "ish.html",
  "sud-majlis.html",
  "qaror-kiritish.html"
 ],
 "sozlama": [
  "foydalanuvchi.html"
 ]
};
/* Obyekt kartochkasi tablari (MKB.obyektTablar shu ro'yxatdan chizadi) */
window.MKB_OBYEKT_TABLAR = [
 {"f": "obyekt.html", "n": "Umumiy"},
 {"f": "obyekt-suratlar.html", "n": "Suratlar"},
 {"f": "obyekt-moliya.html", "n": "Moliya"},
 {"f": "obyekt-hujjatlar.html", "n": "Hujjatlar"},
 {"f": "obyekt-koriklar.html", "n": "Ko&#39;riklar"},
 {"f": "obyekt-xarajatlar.html", "n": "Xarajatlar"},
 {"f": "obyekt-kommunal.html", "n": "Kommunal"},
 {"f": "obyekt-himoya.html", "n": "Himoya"},
 {"f": "obyekt-sotuv.html", "n": "Sotuv"},
 {"f": "obyekt-tarix.html", "n": "Tarix"}
];
