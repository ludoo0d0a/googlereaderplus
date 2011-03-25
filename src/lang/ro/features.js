/**
 * ReaderPlus
 * Translation for features
 *
 * **************************
 * ro : Romanian
 * **************************
 *
 * For translators : please keep major version or original for your translations !
 * Use minor version for yours translations
 * so that 0.3.11 is the 11th translated version of the original v0.3 english version.
 *
 *
 * Version : 1.5.1
 * Date : 03-02-2011
 * @author KullDox (http://kulldox.info)
 */
var locale = 'ro';
namespace('GRP.langs.' + locale);
GRP.langs[locale].categories = {
	main: 'Principală',
	theme: 'Teme/piei',
	icons:'Iconiţe',
	counter:'Contor',
	layout:'Aspect',
	navigation: 'Navigare',
	share: 'Împărtăşeşte',
	action: 'Actiune',
	content: 'Content'
};
GRP.langs[locale].scripts = {
    general: {
        name: "General",
        desc: "Configuraţie generală."
    },
    theme: {
        name: "Temă",
        desc: "Schimbă aspectul GoogleReader."
    },
    ig: {
        name: "Temă iGoogle",
        desc: "Folosiţi <a href='http://www.google.com/ig/directory?type=themes' target='blank'>Temă iGoogle</a> în al vostru Google Reader (Beta)."
   },
    relook: {
        name: "Schimbarea aspectului",
        desc: "Schimbă aspectul site-ului utilizând stiluri personale."
    },
    favicons: {
        name: "Favicon-uri",
        desc: "Afişează favicon-urile fiecărui feed."
    },
    unreadcount: {
        name: "Afişează contorul de mesaje necitite",
        desc: "Afişează contorul de mesaje necitite."
    },
    fixlayout: {
        name: "Repară aspectul",
        desc: "Repară diferitor probleme legate de aspectu aşa ca întinderea mesajului pe toată lăţimea, fixarea imaginilor ataşate ascunse, şi face ca imaginile mară să încapă în ecran."
    },
    count: {
        name: "Corectează contorul (1000+)",
        desc: "Afişează numărul real de mesaje neicitite."
    },
    counticon: {
        name: "Contor în iconiţă",
        desc: "Afişează numărul de mesaje necitite în Google Reader favicon."
    },
    removeads: {
        name: "Elimină publicitatea",
        desc: "Un simplu eliminator de publicitate."
    },
    column: {
        name: "Textul în coloane multiple",
        desc: "Afişează noutăţile în coloane multiple asemeni ziarelor."
    },
    preview: {
        name: "Previzualizare integrată",
        desc: "Afişează conţinutul original al paginii în loc de feed."
    },
    colorful: {
        name: "Listă colorată",
        desc: "Aplică o culoare de fundal pentru feed-uri identice."
    },
    filter: {
        name: "Filtru înregistrări",
        desc: "Filtreză înregistrările eliminând sau evidenţiind după parametrii utilizatorului."
    },
   limit: {
        name: "Limitează înregistrări",
        desc: "Limitează numărul de înregistrări pe o pagină. Înregistrările citite sunt eliminate pentru a se încadra în limite."
    },
   prefetch: {
        name: "Navigare fluentă",
        desc: "Încarcă mai multe înregistrări în fundal, pentru o navigare mai fluentă."
    },
   nested: {
        name: "Mape îmbricate",
        desc: "Mape cu nivele multiple"
    },
    readbymouse: {
        name: "Navigare cu mouse-ul",
        desc: "Înregistrarea următoare/precedentă utilizând click-uri dreapta/stânga cu mouse-ul."
    },
    facebook: {
        name: "Facebook",
        desc: "Adaugă un buton pentru împărtăşi noutăţile în Facebook"
    },
    twitter: {
        name: "Twitter",
        desc: "Adaugă un buton pentru împărtăşi noutăţile în Twitter."
    },
    instapaper: {
        name: "Instapaper",
        desc: "Adaugă un buton pentru citi noutăţile mai târziu în Instapaper."
    },
   readitlater: {
        name: "ReadItLater",
        desc: "Adaugă un buton pentru citi noutăţile mai târziu în ReadItLater."
    },
    mark: {
        name: "Marchează ca citit",
        desc: "Marchează înregistrarea înainte/după cea currentă ca citită."
    },
    jump: {
        name: "Adaugă butoanele sus/jos",
        desc: "Adaugă un buton 'treci jos' la înregistrarea de sus şi unul 'treci sus' pentru cea de jos."
    },
    fitheight: {
        name: "Potriveşte înnălţimea",
        desc: "Potriveşte înnălţimea înregistrării curente la înălţimea ecranului (pentru articole lungi)."
    },
    closeentry: {
        name: "Închide înregistrare",
        desc: "Adaugă un buton 'închide' pentru fiecare înregistrare pentru posibilitatea de eliminare din listă."
    },
    openbackground: {
        name: "Deschide în fundal",
        desc: "Adaugă un buton 'deschide în fundal' pentru fiecare înregistrare."
    },
   translate: {
        name: "Traduce",
      desc: "Traduce titlul şi conţinutul înregistrării."
    },
    replacer: {
        name: "Înlocuitor",
        desc: "Înlocuieşte înregistrarea cu o parte a paginii originale. La moment utilizată pentru afişarea benzilor desenate.<br/>Mulţumiri lui jolan78 pentru ideia iniţială şi pentru script."
    },
    aero: {
        name: "Bara de instrumente Google Aero",
        desc: "Bară de instrumente utilizând tema Aero."
    },
   actions: {
        name: "Iconiţe pentru acţiuni",
        desc: "Utilizează doar iconiţe pentru butoanele de acţiuni din josul fiecărei înregistrări."
    },
    info: {
        name: "Informaţie de sistem",
        desc: "Informaţie de sistem."
    },
    extshortcuts: {
        name: "Comenzi rapide",
        desc: "Comenzi rapide prin combinaţii de taste."
    },
    pack: {
        name: "Pachete",
        desc: "Pachete predefinite de configuraţie."
    },
    thanks: {
        name: "Mulţumiri",
        desc: ""
    },
    about: {
        name: "Despre",
        desc: "Despre ReaderPlus"
    }
};
GRP.langs[locale].skins = {
    none: {
        name: "Nimic"
    },
    air: {
        name: "Air Skin"
    },
    aircomic: {
        name: "Air Skin Comic Sans"
    },
    black: {
        name: "Google Enhanced Black"
    },
    dark: {
        name: "Dark Skin"
    },
    darkgray: {
        name: "Dark Gray Skin"
    },
    helvetireader: {
        name: "Helvetireader Skin"
    },
    minimal: {
        name: "Minimalistic Skin"
    },
    optimized: {
        name: "Optimized Skin"
    },
    portal: {
        name: "Portal Theme"
    },
    player: {
        name: "Player Theme"
    },
    osxblue: {
        name: "Mac OS X Snow Leopard - Blue"
    },
    osxblack: {
        name: "Mac OS X Snow Leopard - Black"
    },
   calibri: {
        name: "Calibri Skin"
    },
    glassblackgold: {
        name: "Glass Black Gold Skin"
    },
    simpleclean: {
        name: "Simple and Clean"
    },
    peacockfeather: {
        name: "Peacock Feather"
    },
    myowngooglereader: {
        name: "My Own Google Reader"
    },
    compactcleantweaked: {
        name: "Compact, Clean & Tweaked"
    },
    absolutelycompact: {
        name: "Absolutely Compact"
    },
    darkshinyblue: {
        name: "Dark Shiny Blue"
    },
   persian: {
        name: "Optimized Persian"
    }
};
