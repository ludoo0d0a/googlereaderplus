@echo off
copy /y config\empty.js debug\%1-debug.js
for /f %%f in (config\files\%1.txt) do call concat.bat %%f %1

call min %1
