# Introduction #

Help me to translate ReaderPlus in your languages.

# Details #

Already available languages are :
  * English
  * French
  * Simplified chinese
  * Traditional chinese
  * Russian
  * Ukrainan
  * Turkish
  * Polish

In progress :
  * German (please I need need a german guy !! )

## Instructions for translators ##
If you want to participate and contribute to the translations, please follow these steps :
  1. Get the English original files in the last version (English is the base language)
    * locales/en/ [messages.json](http://goo.gl/9jqd)
    * lang/en/ [features.js](http://goo.gl/AY4G)
    * lang/en/ [langs.js](http://goo.gl/ZGVB)
  1. Change the code 'en' for the new locale. I support [Chrome locales](http://code.google.com/chrome/extensions/i18n.html#locales-supported) but i can add any others locales.
  1. messages.json contains general information about extension
  1. features.js contains list of features/options. They appears in the menu in preferences page.
  1. langs.js contains :
    * in the first part (GRP.langs.en.texts), texts displayed in Google Reader
    * in the second part (GRP.langs.en.prefs), texts displayed in preferences page only.
  1. Do not translate ids and keys, look on an already translated files if you don't know read [JSON](http://www.json.org) format.
  1. Do not translate anchors such {0}. They are placeholders to insert dynamic data.
  1. As encoding, use UTF8 without BOM
  1. Use minor version for yours translations; Major version must be used to set version of original language
    * for example, 0.3.11 is the 11th version of the translation for the v0.3 english version
  1. Due to upgrades, new additions are inserted without indent to easily find it.


  * Toolbar button:
    * Don't forget to translate the little file for [Toolbar Button](http://goo.gl/6ovh) : [messages.json](http://goo.gl/8tGY)

Support on translation is done on [this issue](http://code.google.com/p/googlereaderplus/issues/detail?id=141)
---

## [Google translate tool](http://jsbin.com/uwaka3/14) ##
I start to create a tool to help translators by using Google Translator.
You could use it and may be enhance it :
http://jsbin.com/uwaka3/14