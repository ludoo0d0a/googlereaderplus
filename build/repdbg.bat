copy /Y dist\%1.html dist\%1-min.html
call replace.bat .min.js -debug.js dist\%1-min.html>dist\%1.html