/**
 * ReaderPlus
 * Translation
 *
 * **************************
 * en : English
 * **************************
 *
 * Version : 1.2
 * Date : 04-01-2010
 * @author Valente
 */
var locale = 'de';
namespace('GRP.langs.' + locale);
GRP.langs[locale].texts = {
    version: "Ausgabe",
    closeentry: {
        text: 'Close this entry', EINGABE BEENDEN
        keyword: 'Close' BEENDEN
    },
    colorful: {},
    column: {
        text: 'Display as multi columns layout', MEHRSPALTIGE ANZEIGE
        keyword: 'Column', SPALTE
        summary: 'Add/edit items', OBJEKT HINZUFÜGEN/BEARBEITEN
        desc: 'Manage columns'SPALTEN VERWALTEN
    },
    facebook: {
        text: 'Share this news on Facebook', NEUIGKEITEN BEI FACEBOOK AUSTAUSCHEN
        keyword: 'Facebook' FACEBOOK 
    },
    twitter: {
        text: 'Share this news on Twitter', NEUIGKEITEN BEI TWITTER AUSTAUSCHEN
        keyword: 'Twitter', TWITTER
        plslogin: 'Please login to Twitter', BITTE BEI TWITTER ANMELDEN
        toolong: "the message is too long!",NACHRICHt IST ZU LANG
        notetoolong: "<b>Note to go along with the item:</b> (Optional, remain {0} characters)",Optional, verbleibend {0} Zeichen
        notemax: "<b>Note to go along with the item:</b> (Optional, no more than 140 characters)",Optional, nicht mehr als 140 Zeichen
        text_title: 'Title',Titel
        text_tag: 'Tag',??
        text_url: 'URL', URL (Internet Adresse)
        text_send: 'Send', Senden
        text_count: 'Count', ZÄHLEN
        text_cancel: 'Cancel', Abbrechen
        text_shortener: 'Url courte', ??
        shortfailed: "Sorry, an error occured on trying to use short url!\n\r{0}"
    },
		Entschuldigung, beim Versuch die Seite zu öffnen ist ein Fehler aufgetreten
        readit: {
        password: 'Password, if you have one:', PASSWORT, falls vorhanden
        wronglogin: 'Wrong username or password, please check it!!', Falsches Passwort oder BENUTZERNAME, bitte überprüfen
nologin: 'This feature requires a username, please set preferences!!', Für dieses Feature benötigen Sie einen Benutzernamen. Bitte anmelden.
        error: 'The service encountered an error. Please try again later.',Ein Fehler ist aufgetreten, bitte später noch mal versuchen.
        badrequest: 'Bad request. Probably missing a required parameter, such as url.', FALSCHE ANFORDERUNG, VERMUTLICH FEHLEN PARAMETER IN DER ADRESSE
        saving: 'Saving', SPEICHERN
        shortcut_readitlater: 'Read Later with Instapaper' SPÄTER LESEN MIT INSTAPAPER
    },
    instapaper: {
        text: 'Read Later with Instapaper',SPÄTER LESEN MIT INSTAPAPER
        keyword: 'Instapaper', INSTAPAPER
        plslogin: 'Please login to Instapaper', BITTE BEI INSTAPAPER ANMELDEN
        login: 'Email or username:'EMAIL ODER BENUTZERNAME
        },
        readitlater: {
        text: 'Read Later with ReadItLater', SPÄTER LESEN MIT READITLATER
        keyword: 'ReadItLater',READITLATER
        plslogin: 'Please login to ReadItLater', BITTE BEI READITLATER ANMELDEN
                rateexceeded:'Rate limit exceeded, please wait a little bit before resubmitting', ANMELDE LIMIT ERREICHT, BITTE SPÄTER NOCHMAL VERSUCHEN 
                maintenance:'Read It Later\'s sync server is down for scheduled maintenance' SPÄTER LESEN\ DER SYNCHRONISATIONSSERVER IST AUßER BETRIEB
        },
    favicons: {
        preferences: 'Preferences', PRÄFERENZEN
        getfavicon: 'Get favicon', Bevorzugtes Symbol FAVICON
        notfoundicon: 'Cannot found favicon for "{0}"', FAVICON KANN NICHT GEFUNDEN WERDEN
        summary: 'Add/edit items', HINZUFÜGEN/ENTFERNEN
        desc: 'Manage favicons' FAVICONS ORGANISIEREN
    },
    filter: {
        settings: 'Filter settings', EINSTELLUNGEN FILTERN
        excludes: 'Excludes', AUSKLAMMERN
        highlights: 'Highlights', HÖHEPUNKT
        highlight: 'Highlight', HÖHEPUNKT
        exclude: 'Exclude', AUSKLAMMERN
        hideduplicates: 'Hide Duplicates', DOPPELTE EINTRÄGE VERGERGEN
        hideexcludes: 'Hide Excludes', AUGEKLAMMERTE EINTRÄGE VERBERGEN
        preferehighlights: 'Prefer Hilights over excludes', HÖHEPUNKTE BEVORZUGEN
        update: 'Update', UPDATE
        quickadd: 'Quick Add', QUICK ADD
        add: 'Add', HINZUFÜGEN
        close: 'Close', SCHLIEßEN
        edit: 'Edit', ÄNDERN
        remove: 'Remove' ENTFERNEN
    },
    fitheight: {
        text: 'Fit height', GRÖSSE ANPASSEN
        keyword: 'Fit height' GRÖSSE ANPASSEN
    },
    jump: {
        textbottom: 'Jump to bottom', ZUM ENDE WECHSELN
        texttop: 'Jump to top', ZUM ANFANG WECHSELN
        keywordtop: 'top'ANFANG
    },
    openbackground: {
        text: 'Open in background', Im HINTERGRUND ÖFFNEN
        keyword: 'Open' ÖFFNEN
    },
    preview: {
        text: 'Integrated preview of the news', INTIGRIERTE NACHRICHTEN VORSCHAU
        title: 'Open as preview', ALS VORSCHAU ÖFFNEN
        opennewtab: 'Open in a new window', IN NEUEM FENSTER ÖFFNEN
        keyword: 'Preview', VORSCHAU
overlay_next: 'Next', WEITER
overlay_previous: 'Previous', VORHER
overlay_close: 'Close'SCHLIESSEN
    },
    readbymouse: {
        middleclick: 'Middle click',MITTEL KLICK
        openintab: 'Opens in Tab', IM NEUEN TAB ÖFFNEN
        openinbacktab: 'Opens in Background Tab', TAP IM HINTERGRUND ÖFFNEN
        shares: 'Shares', TEILEN
        stars: 'Stars', STERNE ?????
        tag: 'Tag', BEZEICHNER ??????
        addtag: 'Add a Tag',
        on: 'ReadByMouse On', ????????
        off: 'ReadByMouse Off' ????????
    },
    replacer: {
        nomatch: 'No match found.', KEINE ÜBEREINSTIMMUNG GEFUNDEN
        loading: 'Loading ...' LADEND
    },
    lightbox: {
        text: 'Light on the media',????????
        keyword: 'Light'LICHT
    },
        ig: {
        menu_prefs: 'Reader+ preferences', LESER + PRÄFERENZEN
        menu_theme: 'Theme configuration',THEMA KONFIGURIEREN
                menu_randomtheme: 'Random theme'ZUFALLSTHEMA
    }
};
GRP.langs[locale].prefs = {
    global: {
        title: "Reader Plus", ????
        "val-save": "Save", ????? SICHERN
        alreadyexist: "Item already exists!" DAS OBJEKT EXISTIERT BEREITS
    },
    theme: {
        noborder: "Remove entries borders to display more items on a single page", Entfernung von Begrenzungslinien zur Vergrößerung der Anzeigefläche.
                mytheme: 'Use <a href="http://code.google.com/p/googlereaderplus/wiki/Backgrounds" target="blank">custom background picture</a> and font color with skin "MyTheme"',
                url:'Picture URL',
                color:'Text color',
                bg:'Background hover color'
    },
        ig: {
                theme_name:'iGoogle theme name', IGOOGLE TITEL
                theme:'iGoogle theme URL', Titel 
                randomtime:'Random skin instead time control for dynamic theme', ????????????	
                userandomthemes:'Theme is automatically switched randomly', Titel WECHSELT AUTOMATISCH PER ZUFALLSGENERATOR
                randomthemes:'Toggle theme every (min.)', Titel (Theme) wechselt jede (min.)
                add:'Add it now', Jetzt hinzufügen
        next:'Next',
        previous:'Previous', ZURÜCK
                random:'Random', ZUFALL
        search:'Search themes' SUCHEN
        },
    about: {
        thanks1: '<td><span class="top_right"><img src="images/48.png"></span><h1>Thank you...</h1>' +
        '<p>... for installing (or updating to) the latest version of <strong>Reader Plus</strong>!</p>' +
        '<p>Make sure you check the <a href="preferences.html" title="Go to the preferences page"><strong>preferences page</strong></a> for configuration of the extension.</p>' +
        '<p><a href="https://chrome.google.com/extensions/detail/hhcknjkmaaeinhdjgimjnophgpbdgfmg" target="_blank" title="Visit extension homepage"><strong>Visit the Google Chrome Extensions gallery page!</strong></a></p>' +
        '<p><a href="http://www.twitter.com/ludoo0d0a"><img src="http://twitter-badges.s3.amazonaws.com/follow_me-a.png" alt="Follow me on Twitter"/></a></p>' +
        '<p></p></td>',
        thanks2: '<td><p>If you like this extension and want more features, feel free to make a donation.</p>' + IHNEN GEFÄLLT DIE PROGRAMM ERWEITERUNG UND SIE MÖCHTEN NOCH MEHR FEATURES? SPENDEN WERDEN HIERZU GERNE ANGENOMMEN. 
        '<p>In this way, I could buy a truck of coffee so that i can stay awake to write all the code :)</p>' +
        '<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=FK9P8MNY9MGZL&lc=US&item_name=GoogleReaderPlus%20project&currency_code=EUR&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted"><img alt="Donate" border="0" src="https://www.paypal.com/en_US/i/btn/btn_donate_SM.gif" width="74" height="21"></a></td>'
    },
    link: {
        reader: "<span>Google Reader</span>Your RSS reader",
        issues: "<span>Report issue</span>Found a bug or suggestion ?", HABEN SIE FEHLER GEFUNDEN ODER HABEN IRGENWELCHE ANREGUNGEN?
        download: "<span>Google Extension</span>The place to download", DER ORT ZUM DOWNLOAD
        about: "<span>About</span>About, thanks,...",
        site: "<span>Website</span>My personal website", MEINE EIGENE SEITE
        twitter: "<span><img width=\"160\" height=\"27\" src=\"http://twitter-badges.s3.amazonaws.com/follow_me-a.png\" alt=\"Follow ludoo0d0a on Twitter\"></span>Follow news and updates",
        donate: '<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&amp;business=FK9P8MNY9MGZL&amp;lc=US&amp;item_name=googlereaderplus%20project&amp;currency_code=EUR&amp;bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted"><span><img alt="Donate" border="0" src="https://www.paypal.com/en_US/i/btn/btn_donate_SM.gif" width="74" height="21"></span>Offer me a coffee!</a>',
        translate: '<span>Translation</span>Help me to translate</a>'
    },
    column: {
        count: "Columns number", NUMMER DER SPALTE
        locked: "Feature 'Column' always actived by default, except for :", FEATURE (MERKMAL) SPALTEN STANDARTMÄßIG IMMER AKTIVIERT 
        pagebreak: "Break long articles so long articles can be read page by page like a newspaper.", GROße ARTIKEL AUFTEILEN DAS SIE SEITE FÜR SEITE WIE EINE ZEITSCHRIFT GELESEN WERDEN KÖNNEN
        "entersite": "Enter URL of the site" SEITE BEITRETEN
    },
    twitter: {
        shortener: "Shortener",
        shortener_bitly: "BitLy configuration (optional):",
        shortener_login: "Login",
        shortener_apikey: "ApiKey",
        shortener_pwd: "Password"
    },
    instapaper: {
auth: "Instapaper authentication:", AUTHENTIFIZIERUNG
        username: "Username:", BENUTZERNAME
password: "Password (optional):" PASSWORT
    },
readitlater: {
        auth: "ReadItLater <a href='http://readitlaterlist.com/signup' target='blank'>authentication</a> (required):",
        username: "Username:",
        password: "Password:"
},
    colorful: {
        tree: "Show label colors in the left navigation tree" NAMEN IM LINKEN NAVIGATIONSBEREICH FARBLICH DARSTELLEN
    },
    general: {
        counter: "Display unread counter in the toolbar icon", WENN UNGELESEN, IN DER TOOLBAR ANZEIGEN
        opendirect: "Click on icon will open GoogleReader", GOOGLE READER ÖFFNET BEI ANKLICKEN DES ICONS
        secure: "Always force use of secure protocol (https)",  NUTZUNG DES SICHERHEITSPROTIKOLLS ALS VORLAGE
        icontoolbar_add: "To add button with icon in toolbar, please <a href=\"https://chrome.google.com/extensions/detail/ecpcafinfpjgabomoamkhkgnpgpmdmeo\">download and install it</a>.",
        icontoolbar_text: "<span>To make the button optional, we put him in an another extension as standalone,</span>                                    <br>                                    <span>to be installed along with readerplus.</span>                                    <br>                                    <span>To add the button, click <b></b> on the <a href=\"https://chrome.google.com/extensions/detail/ecpcafinfpjgabomoamkhkgnpgpmdmeo\">readerplus Toolbar button</a> page.</span><span>To remove the button, right click him and choose Disable.</span>",
        importexport_text: "You can now save your preferences using 'export' and reload it later using 'import':",
        confirmimport: "Are you sure to import this configuration?\nCurrent configuration will be LOST!"
    },
    removeads: {
        links: "Link filter:",
        images: "Image filter:",
        iframes: "Iframe filter:"
    },
    preview: {
        onicon: "Show integrated preview when click on icon right after the title (if not checked, on title)", VORSCHAU ANZEIGEN BEI RECHTSKLICK AUF DAS ICON
        locked: "Feature 'Preview' always actived by default, except for :" FEATURE 'VORSCHAU' STANDARTMÄSSIG IMMER AKTIVIERT, AUSSER FÜR:
    },
    fitheight: {
        locked: "Feature 'Fit height' always actived by default, except for :" FEATURE FIT HEIGHT STANDARTMÄSSIG IMMER AKTIVIERT; AUSSER FÜR
    },
        filter: {
        searchbody: "Search inside title and body text" ????????? IM TITEL/HAUPTTEXT SUCHEN
    },
    favicons: {
        providerpageicons: 'Use <a href="http://pageicons.appspot.com" target="blank">PageIcons</a> provider (Recommended to load succesfully all icons)', 
        sidebaronly: "Show favicons in sidebar only", FAVICONS NUR IN DER SIDEBAR ANZEIGEN
        custom: "Enter your custom favicons :", DEN EIGENEN FAVICONS BEITRETEN
        add: "Add",
        tip: "Tip: You could add it easily using the contextual menu \"Get favicon\" of the left side bar", DU KANNST EINFACHER ETWAS HINZUFÜGEN IN DEM DU DAS KONTEXTMENÜ VERWENDEST
        manual: "Manual favicons for all sites (not recommended ; slower)",
        parsing: "This will try to detect favicon by parsing each homepage",
        "entersite": "Enter URL of the site",
        "prompticon": "Enter the icon url (let empty to get it automatically):"
    },
    replacer: {
        intro: 'You can use <a href="http://karmatics.com/aardvark/bookmarklet.html" target="blank">Aardvark bookmarklet</a> to identify correct xpath instead regex (Use prefix "xpath:")',
        link: "Link Regex",
        from: "Search regex/xpath",
        to: "Replace"
    },
    lightbox: {
        locked: "Feature 'Lightbox' always actived by default, except for :"
    },
    relook: {
        css: "CSS stylesheet",
        resize: "Fire resize event to adapt fullscreen"
    },
    pack: {
        mini: "<span>Package Mini</span>The minimum for best reading",
        ludoo: "<span>Package LudoO</span>The best features in one click",
        full: "<span>Package Full</span>All features activated",
        reset: "<span>Package Reset</span>Reset your configuration",
        confirmdel: "This will ERASE and reset all your preferences. Are you sure ?"
    },
    extshortcuts: {
        custom: "Your custom Shortcuts",
        official: "Google Reader official shortcuts",
        alreadyusedprefs: "Already used in your preferences!",
        alreadyusedgoogle: "Already used by Google!"
    },
    thanks: {
        donators: "Thanks to donators to contribute to this project",
        translators: "Thanks to brave translators for their wonderful work",
        authors: "Thanks to authors of original scripts and skins (Greasemonkey and Stylish)"
