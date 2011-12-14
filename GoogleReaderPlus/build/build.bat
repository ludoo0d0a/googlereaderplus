@echo off

cls
del /Q dist
mkdir dist\lib

del /Q debug
mkdir debug

echo ======================================================
echo Update version number in build/config/manifest.json
echo Copy changelog in about.html from src to build/config
echo ======================================================
pause

rem echo **************** codemirror
rem call compress codemirror

echo **************** colorpicker
rem call compress colorpicker

echo **************** jscolor
rem call compress jscolor

echo **************** readerplus
call compress readerplus

echo **************** bg
call compress bg

echo **************** prefs
call compress prefs

echo **************** about
call compress about

echo **************** menu
call compress menu

echo **************** finalize
copy ..\src\lib\jquery.min.js dist\lib\ >nul
copy config\manifest.json dist\ >nul
copy config\*.html dist\ >nul
copy ..\src\blank.html dist\ >nul

rem copy debug\*.* dist\ >nul

move dist\colorpicker*.js dist\lib
move dist\codemirror*.js dist\lib

rem mo--ve dist\codemirror.min.js dist\lib
copy ..\src\lib\codemirror\css\csscolors.css dist\css\ >nul

xcopy /e /Y /I ..\src\skin\css\*.* dist\skin\css\
xcopy /e /Y /I ..\src\lib\codemirror\*.* dist\lib\codemirror\
rem xc--opy /e /Y /I ..\src\lib\colorpicker\*.* dist\lib\colorpicker\
xcopy /e /Y /I ..\src\lib\jscolor\*.* dist\lib\jscolor\

xcopy /q /e /Y /I ..\src\_locales\*.* dist\_locales 
xcopy /q /e /Y /I ..\src\css\*.* dist\css
xcopy /q /e /Y /I ..\src\images\*.* dist\images
xcopy /q /e /Y /I ..\src\lang\*.* dist\lang
xcopy /q /e /Y /I ..\src\res\*.* dist\res

xcopy /q /e /Y /I ..\src\chrome_ex_*.* dist

rem del debug\*.tmp
del dist\*.tmp

echo ======================================================
echo Then to upload source into Google Westore, zip build/dist
echo or to test it as local crx, use Extensions page, go to "Pack extension"
echo   choose build\dist folder and key file build\dist.pem
echo ======================================================
pause