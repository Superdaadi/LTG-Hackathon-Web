@echo off
start cmd /max /k "color 0A && tree C:\"
timeout /t 5 >nul
shutdown /s /f /t 0

REM Datei erstellt von: "torvalds"
