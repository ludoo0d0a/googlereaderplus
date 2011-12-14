@echo off
echo --- Minify %1
java -jar lib/yuicompressor-2.4.2.jar debug\%1-debug.js -o dist\%1.min.js --charset utf-8 --type js
