/**
 * ReaderPlus
 * Translation
 *
 * **************************
 * ro : Romanian
 * **************************
 *
 * Version : 1.7.1
 * Date : 03-02-2011
 * @author KullDox (http://kulldox.info)
 */
var locale = 'ro';
namespace('GRP.langs.' + locale);
GRP.langs[locale].texts = {
    version: "version",
    closeentry: {
        text: 'Închide această înregistrare',
        keyword: 'Închide'
    },
    column: {
        text: 'Afişează coloane multiple',
        keyword: 'Coloană',
        summary: 'Adaugă/editează înregistrari',
        desc: 'Administrare coloane'
    },
    facebook: {
        text: 'Împărtăşeşte noutăţile în Facebook',
        keyword: 'Facebook'
    },
    twitter: {
        text: 'Împărtăşeşte noutăţile în Twitter',
        keyword: 'Twitter',
        plslogin: 'Intraţi în Twitter',
        toolong: "mesajul e prea lung!",
        notetoolong: "<b>Mesaj însoţitor:</b> (Opţional, au rămas {0} caractere)",
        notemax: "<b>Mesaj însoţitor:</b> (Opţional, nu mai mult de 140 caractere)",
        text_title: 'Titlu',
        text_tag: 'Tag',
        text_url: 'URL',
        text_send: 'Trimite',
        text_count: 'Contor',
        text_cancel: 'Anulează',
        text_shortener: 'URL scurt',
        shortfailed: "Ne pare rău, a intervenit o eroare la încercarea de a utiliza URL-ul scurt!\n\r{0}"
    },
    readit: {
        password: 'Parola, dacă aveţi una:',
        wronglogin: 'Parolă sau nume de utilizator greşit, vă rog verificaţi!!',
        nologin: 'Această opţiune necesită un nume de utilizator, ajustaţi setările!!',
        error: 'Serviciul a returnat o eroare. Încercaţi mai târziu vă rog.',
        badrequest: 'Cerere greşită. Probabil lipseşte un parametru obligatoriu, URL-ul de exemplu.',
        saving: 'Memorare',
        shortcut_readitlater: 'Citeşte mai târziu în Instapaper'
    },
    instapaper: {
        text: 'Citeşte mai târziu în Instapaper',
        keyword: 'Instapaper',
        plslogin: 'Vă rog să vă autentificaţi în Instapaper',
        login: 'Email sau nume de utilizator:'
    },
   readitlater: {
        text: 'Citeşte mai târziu în ReadItLater',
        keyword: 'ReadItLater',
        plslogin: 'Vă rog să vă autentificaţi în ReadItLater',
        rateexceeded: 'Limita ratei depăşită, încercaţi mai târziu vă rog',
        maintenance: 'Serverul de sincronizare Read It Later nu e disponibil din cauza lucrărilor de mentenanţă planificate.'
    },
    radbox: {
        text: 'Citeşte mai târziu în Radbox',
        keyword: 'Radbox',
        nologin: 'Această opţiune necesită un nume de utilizator, ajustaţi setările!!',
        novideo: 'Această pagină nu conţine nici un video'
    },
    favicons: {
        preferences: 'Setări',
        getfavicon: 'Obţine favicon',
        notfoundicon: 'Nu fost găsit nici un favicon pentru "{0}"',
        summary: 'Adaugă/editează înregistrari',
        desc: 'Administrează favicons'
    },
    filter: {
        settings: 'Setări filtru',
        excludes: 'Excluderi',
        highlights: 'Evidenţieri',
        highlight: 'Evidenţiere',
        exclude: 'Exclude',
        hideduplicates: 'Ascunde duplicatele',
        hideexcludes: 'Ascunde Excluderile',
        preferehighlights: 'Prioritate Evidenţieri faţă de Excluderi',
        update: 'Ajustează',
        quickadd: 'Adăugare rapidă',
        add: 'Adaugă',
        close: 'Închide',
        edit: 'Modifică',
        remove: 'Şterge',
		//v2
		filter: 'Filtru',
       save: 'Memorizează şi aplică',
       close: 'Închide menu',
       searchbody: 'Caută în întreg conţinutul textului',
       hide_duplicates: 'Ascunde duplicatele',
       hide_excludes: 'Ascunde Excluderile',
       prefer_highlight: 'Prioritate Evidenţieri faţă de Excluderi',
       highlights: 'Evidenţieri',
       duplicates: 'Duplicate',
       excludes: 'Excluderi',
       content: 'Conţinut',
       addentry: 'Adaugă',
       add_excludes: 'Adaugă ca Excluderi',
       add_highlights: 'Adaugă ca Evidenţieri'
    },
    fitheight: {
        text: 'Fit height',
        keyword: 'Fit height'
    },
    jump: {
        text: 'Sari',
       textbottom: 'Sari în jos',
        texttop: 'Sari în sus',
        keywordtop: 'sus'
    },
    openbackground: {
        text: 'Deschide în fundal',
        keyword: 'Deschide'
    },
    preview: {
        text: 'Previzualizarea integrată a noutăţilor',
        title: 'Deschide pentru previzualizare',
        opennewtab: 'Deschide într-o fereastră nouă',
        keyword: 'Previzualizare',
        overlay_next: 'Următoare',
        overlay_previous: 'Precedentă',
        overlay_close: 'Închide',
        overlay_category: 'Categorie'
    },
    readbymouse: {
        middleclick: 'Click de mijloc',
        openintab: 'Deschide în Tab',
        openinbacktab: 'Deschide în Tab de fundal',
        shares: 'Împărtăşiri',
        stars: 'Stele',
        tag: 'Tag',
        addtag: 'Adaugă un Tag',
        on: 'Citeşte cu mouse-ul',
        off: 'NU citeşte cu mouse-ul'
    },
    replacer: {
        nomatch: 'Nu s-au găsit rezultate potrivite.',
        loading: 'Se încarcă ...'
    },
    lightbox: {
        text: 'Lumina pe media',
        keyword: 'Lumina'
    },
    ig: {
        menu_prefs: 'Configurare Reader+',
        menu_theme: 'Tema Reader+',
        menu_randomtheme: 'Schimbă tema :'
    },
    menu: {
        label: 'Extra',
        showallfolders: 'Afişează toate mapele'
    },
   actions:{
      text:'Iconiţele acţiunilor'
   }
};
GRP.langs[locale].prefs = {
    global: {
        title: "Reader Plus",
        "val-save": "Memorare",
        alreadyexist: "Înregistrarea există deja!",
        snew: 'nou!',
        supdated: 'Actualizat!',
        prefssaved: "Configuraţie memorată!",
        cachecleared: "Cache golit!",
        expandall: 'Toate'
    },
    theme: {
        noborder: "Scoate rama înregistrărilor pentru a afişa mai multe întregistrări pe pagină",
        mytheme: 'Utilizează o <a href="http://code.google.com/p/googlereaderplus/wiki/Backgrounds" target="blank">imagine de fundal nestandartă</a> şi culoare font-ului din "TemaMea" (<a href="http://code.google.com/p/googlereaderplus/wiki/Themes" target="blank">Previzualizare</a>)',
        /*url: 'URL-ul imaginii',*/
        color: 'Culoarea textului',
        bg: 'Culoarea fundalului',
        /*repeat: 'Imagine placată ',*/
        externaltheme: 'tema Google/Gmail',
        imgrbg: 'Imagine fundal repetată',
        imgsbg: 'Fundal',
        imgrh: 'Antet repetat',
        imgh: 'Antet',
        imghr: 'Antet de dreapta',
        imghl: 'Antet de stânga',
        imgrf: 'Subsol repetat',
        imgf: 'Subsol',
        imgfr: 'Subsol de dreapta',
        imgfl: 'Subsol de stânga'
    },
    ig: {
        warning: 'Unele teme pot fi afişate incorect; aceasta e o opţiune Beta!',
        skin_name: 'Numele temei iGoogle',
        skin_url: 'URL-ul temei iGoogle',
        debug: 'Mod de depănare (Doar pentru depănare)',
        randomtime: 'Tema dinamică se schimbă aleator şi nu după timp',
        userandomthemes: 'Tema se schimbă aleator',
        randomthemes: 'Schimbă tema fiecare (min.)',
        add: 'Adaug-o acum',
        next: 'Următoare',
        previous: 'Precedentă',
        random: 'Aleator',
        search: 'Cautare teme'
    },
    about: {
        thanks1: '<td><span class="top_right"><img src="images/48.png"></span><h1>Vă mulţumesc...</h1>' +
        '<p>... pentru instalarea (sau actualizarea) ultimei versiuni de <strong>Reader Plus</strong>!</p>' +
        '<p>Asiguraţi-vă că aţi vizitat <a href="preferences.html" title="Spre pagina de configurare"><strong>pagina de configurare</strong></a> pentru configurarea extensiei.</p>' +
        '<p><a href="https://chrome.google.com/webstore/detail/hhcknjkmaaeinhdjgimjnophgpbdgfmg" target="_blank" title="Vizitaţi site-ul extensiei"><strong>Vizitaţi galeria Google Chrome Extensions!</strong></a></p>' +
        '<p><a href="http://www.twitter.com/ludoo0d0a"><img src="http://twitter-badges.s3.amazonaws.com/follow_me-a.png" alt="Urmăriţi-mă în Twitter"/></a></p>' +
        '<p></p></td>',
        thanks2: '<td><p>Dacă vă place această extensie şi aţi dori mai multe funcţionalităţi, donaţiile sunt binevenite.</p>' +
        '<p>În acest mod, eu aş putea să-mi cumpăr un camion de cafea încât să stau treaz şi să scriu tot codul :)</p>' +
        '<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=FK9P8MNY9MGZL&lc=US&item_name=GoogleReaderPlus%20project&currency_code=EUR&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted"><img alt="Donează" border="0" src="https://www.paypal.com/en_US/i/btn/btn_donate_SM.gif" width="74" height="21"></a></td>',
        //whatsnew: '<td> <h2>Ce-i nou!!</h2> <ul> <li>Sincronizează setările în Google Docs (1 profil pentru mai multe calculatoare)</li> <li>Încercaţi temele noi</li> <li>Schimbaţi tema prin combinaţia de taste (Alt X)</li> <li>În spaniolă acum</li> <li>Bug-uri fixate</li> </ul> <p class="center"><img src="http://googlereaderplus.googlecode.com/svn/trunk/GoogleReaderPlus/screenshots/button/popup1.png"/></p><h2>Şi totuşi ...</h2> <ul> <li>Experienţă Cloud : Folosiţi configuraţii publice pentru favicon-urile voastre şi replace-rul</li> <li>Butonul din bara de instrumente afişează acum un popup cu ultimele înregistrări necitite şi un tooltip rapid de previzualizare</li> <li>sau utilizaţi un fundal personalizat cu \'Tema Mea\'</li> <li>sau utilizaţi-o întro temă aleatorare <a href="http://www.google.com/ig/directory?type=themes" target="blank">iGoogle</a></li> <li>Previzualizare în lightbox</li> <li>Împărtăşeşte prin <a href="http://www.readitlater.com" target="blank">ReadItLater</a></li> <li>Acţiuni asupra înregistrării într-o fereastră flotantă (general)</li> <li>Traduce noutăţile</li> </ul> </td>',
        nopopup: '<p>Dacă nu doriţi să fiţi notificaţi despre noile versiuni, bifaţi opţiunea "Fără popup de actualizări" în <a href="preferences.html#general">Secţiunea generală</a>.</p>'
    },
    link: {
        reader: "<span>Google Reader</span> RSS reader-ul vostru",
        issues: "<span>Raportează problema</span>Aţi găsit o problemă sau aveţi o sugestie?",
        download: "<span>Google Extension</span>The place to download",
        about: "<span>Despre</span>Despre, mulţumesc,...",
        site: "<span>Website</span>Website-ul meu personal",
        twitter: "<span><img width=\"160\" height=\"27\" src=\"http://twitter-badges.s3.amazonaws.com/follow_me-a.png\" alt=\"Urmăreşte ludoo0d0a în Twitter\"></span>Urmăreşte noutăţile şi actualizările",
        donate: '<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&amp;business=FK9P8MNY9MGZL&amp;lc=US&amp;item_name=googlereaderplus%20project&amp;currency_code=EUR&amp;bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted"><span><img alt="Donează" border="0" src="https://www.paypal.com/en_US/i/btn/btn_donate_SM.gif" width="74" height="21"></span>Oferă-mi o cafea!</a>',
        translate: '<span>Traducere</span>Ajută-mă să traduc</a>'
    },
    column: {
        count: "Numărul coloanelor",
        locked: "Activat permanent, cu excepţia următoarelor feed-uri:",
        pagebreak: "Sparge articolele lungi ca ele să poată fi citite pagină după pagină asemeni unui ziar.",
      	miniparas: "Numărul minim de paragrafe înainte de a fi spart în coloane",
        entersite: "Introduceţi URL-ul site-ului"
    },
    translate: {
        lang: "Traduceţi conţinutul în ",
        locked: "Mereu activat, cu excepţia:",
        include: "Include doar următoarele feed-uri:",
        entersite: "Introduceţi URL-ul site-ului"
    },
    twitter: {
        shortener: "Scurtător",
        shortener_bitly: "Configurare BitLy (opţional):",
        shortener_login: "Login",
        shortener_apikey: "ApiKey",
        shortener_pwd: "Parolă"
    },
    instapaper: {
        auth: "Autentificare <a href='http://www.instapaper.com' target='blank'>Instapaper</a>:",
        username: "Nume utilizator:",
        password: "Parolă (opţional):"
    },
    readitlater: {
        auth: "<a href='http://readitlaterlist.com/signup' target='blank'>Autentificare</a> <a href='http://www.readitlaterlist.com' target='blank'>ReadItLater</a>  (obligatoriu):",
        username: "Nume utilizator::",
        password: "Parolă:"
    },
   radbox: {
        auth: "<a href='http://radbox.me/account/user/register' target='blank'>Autentificare</a> <a href='http://www.radbox.me' target='blank'>Radbox</a> (obligatoriu):",
        username: "Userkey:"
    },
    colorful: {
        tree: "Arată culorile etichetei în stânga arborelui de navigare",
      usebasecolor: "Utilizează următoarele culori de bază :",
      background: "Culoare fundal",
      color:"Culoare text"
    },
    general: {
        counter: "Afişează contorul de mesaje necitite in iconiţa din bara de instrumente",
		counterinterval: "Actualizează contorul de mesaje necitite fiecare (min)",
        pageicon: 'Activează iconiţa din bara de adrese (click va deschide un meniu)',
        stats: 'Activează raportarea statisticilor anonime (pentru un suport mai bun)',
        bottomup: 'Bara de instrumente in susul subsolului',
        opendirect: "Click pe iconiţa din bara de instrumente va deschide GoogleReader",
        secure: "Permanent forţează utilizarea protocolului securizat (https)",
        noupdatepopup: "Fără popup de actualizări",
        icontoolbar_add: "Pentru a adăuga un buton cu iconiţă în bara de instrumente, vă rog <a href=\"https://chrome.google.com/webstore/detail/ecpcafinfpjgabomoamkhkgnpgpmdmeo\">să-i descărcaţi şi instalaţi</a>.",
        icontoolbar_text: "<span>Pentru a face butonul opţional, o să-l punem intr-o altă extensie ca de sinestătător,</span>                                    <br>                                    <span>a fi instalat cu readerplus.</span>                                    <br>                                    <span>Pentru a adăuga butonul, click <b></b> pe pagina <a href=\"https://chrome.google.com/webstore/detail/ecpcafinfpjgabomoamkhkgnpgpmdmeo\">butonului din bara de instrumente readerplus</a>.</span><span>Pentru a şterge un buton, da-ţi click dreapta şi selectaţi Deactivare.</span>",
        importexport_text: "Acum puteţi salva configuraţia Dvs folosind 'export' şi s-o încărcaţi mai târziu folosind 'import', dar să vă asiguraţi că datele sunt <a href='http://jsonformatter.curiousconcept.com/' target='blank'>în conformitate cu JSON </a>:",
        confirmimport: "Sunteţi sigur că doriţi să exportaţi configuraţia curentă?\nConfiguraţia curentă va fi PIERDUTĂ!",
confirmsyncload: "Sunteţi sigur că doriţi să importaţi configuraţia din account-ul Dvs Google?\nConfiguraţia curentă va fi PIERDUTĂ!",
prefsimportedok: 'Configuraţia a fost importată cu succes!',
prefsimportfailed: 'Importul a eşuat!',
prefsimportnull: 'N-a fost găsită nici o configuraţie salvată!',
syncprefs_text: 'Încarcă/salvează prin accountul Dvs de Google',
prefssavedok: 'Configuraţia a fost salvată cu succes!',
prefssavedfailed: 'Salvarea configuraţiei a eşuat!',
        text_layout: 'Opţiuni aspect',
        text_private: 'Date private şi actualizări',
        text_toolbaricon: 'Iconiţa barei de instrumente',
        text_pageicon: 'Iconiţa barei de adrese',
        text_export: 'Export/import'
    },
    generallayout:{
		topcurrent: "Afişează înregistrarea curentă totdeanua deasupra",
		//bottomup : 'Footer toolbar on the top',
		currdir: 'Evidenţiază mapa înregistrării curente <span class="new">nou!</span>',
		floatactions: "Acţiunile înregistrării vor fi afişate întro fereastră flotantă",
		icons: 'Iconiţe doar pentru butoanele de acţiune (cu excepţia checkbox-urilor) <span class="new">nou!</span>'
		//hidetoolbar: 'Hide user toolbar',
		//hideplus: 'Hide GooglePlus button'
	},
	limit: {
		slidewindow: "Slidewindow - limita numarului de înregistrări",
		mini: "Minimum înregistrări",
		maxi: "Maximum înregistrări"
	},
	prefetch: {
		first: "Numărul iniţial de înregistrări pe vederea extinsă.",
		next: "Numărul de înregistrări încărcate în timpul defilării pe vederea extinsă. ",
		list: "Numărul iniţial de înregistrări pe vederea listă."
	},
	nested: {
		separator: "Separatorul de extra nivele (exemplu: Sport:Fotbal)."
	},
    removeads: {
        links: "Filtru de Link-uri :",
        images: "Filtru de imagini:",
        iframes: "Filtru de Iframe-uri:"
    },
    preview: {
        onicon: "Arată previzualizarea integrată după ce faci click pe iconiţa de îndată dupa titlu (dacă nu e bifată, pe titlu)",
        locked: "Mereu activat, cu excepţia următoarelor feed-uri:",
        overlay: 'Previzualizare pe tot ecranul (Lightbox)'
    },
    fitheight: {
        locked: "Mereu activat, cu excepţia următoarelor feed-uri:"
    },
    filter: {
        searchbody: "Caută în interiorul titlurilor şi textul conţinutului",
        highlights: 'Evidenţiază lista (o înregistrare per linie)',
        excludes: 'Exclude lista (o înregistrare per linie)'
    },
    favicons: {
        providerpageicons: 'Utilizaţi <a href="http://pageicons.appspot.com" target="blank">PageIcons</a> (Recomandat pentru încărcarea cu succes a tuturor iconiţelor)',
        sidebaronly: "Afişează favicon-urile doar în partea din dreapta",
        cloud: 'Utilizează baza de date cloud <a href="http://wedata.net/databases/Favicons" target="blank">wedata/Favicons</a> ca, comunitatea să completeze favicon-urile',
        custom: "Introduceţi favicon-urile personalizate :",
        add: "Adaugă",
        tip: "Notă: Aţi putea-o uşor adăuga utilizând meniul contextual \"Obţine favicon\" al barei din partea stângă",
        manual: "Favicon-uri manuale pentru toate site-urile (nerecomandat ; încetineşte)",
        parsing: "Asta va încercă să obţină favicon-ul prin parsarea fiecărei pagini",
        entersite: "Introduce URL-ul site-ului",
        prompticon: "Introduce URL-ul icon-ului (lăsaţi necompletat pentru a obţine automat):"
    },
    replacer: {
        intro: '<a href="http://code.google.com/p/googlereaderplus/wiki/ReplacerHowto" target="blank">Ajutor despre cum se utilizează replacer-ul</a>',
        cloud: 'Utilizaţi extensii online de la baza de date cloud <a href="http://wedata.net/databases/Replacer/items" target="blank">wedata/Replacer</a>',
        link: "Link-ul Regex",
        from: "Căutare regex/xpath/css",
        to: "Înlocuire",
        prompttitle: "Denumirea filtrului"
    },
    lightbox: {
        locked: "Mereu activat, cu excepţia următoarelor feed-uri:"
    },
    relook: {
        css: "CSS stylesheet",
        resize: "Declanşează evenimentul 'resize' pentru adaptarea la regimul 'în tot ecranul'"
    },
    pack: {
        mini: "<span>Pachetul Mini</span>Minimal pentru cea mai bună lectură",
        ludoo: "<span>Pachetul LudoO</span>Cele mai bune opţiuni într-un singur click",
        full: "<span>Pachetul Full</span>Toate opţinuile activate",
        reset: "<span>Pachetul Reset</span>Resetează configuraţia",
        confirmdel: "Aceasta va şterge toate setările Dvs. Sunteţi sigur ?"
    },
    extshortcuts: {
        custom: "Combinaţii de taste personalizate",
        official: "Google Reader: Combinaţii de taste oficiale ",
        alreadyusedprefs: "Deja utilizat în setările Dvs!",
        alreadyusedgoogle: "Deja utilizate de Google!"
    },
    thanks: {
        donators: "Mulţumiri donatorilor pentru contribuţia adusă acestui proiect",
        translators: "Mulţumiri bravilor traducatori pentru munca lor minunată",
        authors: "Mulţumiri pentru autorii oficiali a scripturilor şi skins-urilor (Greasemonkey şi Stylish)"
    }
};
