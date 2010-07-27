rem @echo off
copy /B debug\%2-debug.js+..\src\%1  debug\%2.tmp
copy /Y debug\%2.tmp debug\%2-debug.js
