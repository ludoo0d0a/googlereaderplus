rem @echo off
echo --- Compress %1
copy /y config\empty.js debug\%1-debug.js >nul
for /f %%f in (config\files\%1.txt) do call concat.bat %%f %1

call min %1

