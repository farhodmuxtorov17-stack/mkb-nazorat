@echo off
rem ============================================================
rem  MKB aktivlar nazorati: tizimni shu kompyuterda ochish.
rem  Faylni ikki marta bosing. Server faqat shu kompyuterga
rem  (127.0.0.1:8777) ochiladi, tarmoqdan unga kirib bo'lmaydi.
rem  Oynani yopsangiz server to'xtaydi.
rem  Talab: Python 3 o'rnatilgan bo'lsin (python.org).
rem ============================================================
setlocal
title MKB aktivlar nazorati - server
rem Loyiha papkasiga o'tamiz: fayl qayerdan ochilmasin, server shu papkani beradi.
cd /d "%~dp0"

set "PORT=8777"
set "MANZIL=http://127.0.0.1:%PORT%/kirish.html"

rem Python ni topamiz: avval "py" ishga tushirgichi, keyin "python".
set "PY="
where py >nul 2>nul && set "PY=py -3"
if not defined PY (
  where python >nul 2>nul && set "PY=python"
)
if not defined PY (
  echo Python topilmadi. Python 3 ni o'rnating va faylni qayta oching.
  pause
  exit /b 1
)

rem Port band bo'lsa server allaqachon ishlayapti: faqat brauzerni ochamiz.
netstat -ano | findstr /r /c:"127.0.0.1:%PORT% .*LISTENING" >nul
if not errorlevel 1 (
  echo Server allaqachon ishlayapti. Brauzer ochilmoqda.
  start "" "%MANZIL%"
  exit /b 0
)

echo Server ishga tushmoqda: %MANZIL%
echo Tizimni yopish uchun shu oynani yoping.
echo.
rem Brauzer server ko'tarilgach ochiladi (2 soniyadan keyin).
start "" /b cmd /c "ping -n 3 127.0.0.1 >nul & start "" "%MANZIL%""
%PY% -m http.server %PORT% --bind 127.0.0.1
if errorlevel 1 pause
endlocal
