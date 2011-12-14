@echo off
copy /B debug\%2-debug.js+..\src\%1  debug\%2.tmp >nul
copy /Y debug\%2.tmp debug\%2-debug.js >nul
