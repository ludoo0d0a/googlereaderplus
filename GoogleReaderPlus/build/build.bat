cls
del /Q dist
mkdir dist\lib

del /Q debug
rem mkdir debug

echo ======================================================
echo Update version number in build/config/manifest.json
echo Copy changelog in about.html from src to build/config
echo ======================================================
pause

rem echo **************** codemirror
rem call compress codemirror

echo **************** colorpicker
call compress colorpicker

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
copy ..\src\lib\jquery.min.js dist\lib\
copy config\manifest.json dist\
copy config\*.html dist\
copy ..\src\blank.html dist\

rem copy debug\*.* dist\

move dist\colorpicker*.js dist\lib
move dist\codemirror*.js dist\lib

rem mo--ve dist\codemirror.min.js dist\lib
copy ..\src\lib\codemirror\css\csscolors.css dist\css\

xcopy /e /Y /I ..\src\skin\css\*.* dist\skin\css\
xcopy /e /Y /I ..\src\lib\codemirror\*.* dist\lib\codemirror\
rem xc--opy /e /Y /I ..\src\lib\colorpicker\*.* dist\lib\colorpicker\

xcopy /e /Y /I ..\src\_locales\*.* dist\_locales 
xcopy /e /Y /I ..\src\css\*.* dist\css
xcopy /e /Y /I ..\src\images\*.* dist\images
xcopy /e /Y /I ..\src\lang\*.* dist\lang
xcopy /e /Y /I ..\src\res\*.* dist\res

xcopy /e /Y /I ..\src\chrome_ex_*.* dist

rem del debug\*.tmp
del dist\*.tmp

echo ======================================================
echo Then to upload source into Google Westore, zip build/dist
echo or to test it as local crx, use Extensions page, go to "Pack extension"
echo   choose build\dist folder and key file build\dist.pem
echo ======================================================
pause