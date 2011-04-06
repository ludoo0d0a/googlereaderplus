/**
 * ReaderPlus
 * Translation
 *
 * **************************
 * de : Deutsch
 * **************************
 *
 * Version : 1.8
 * Date : 03-17-2011
 * @author Valente
 */
var locale = 'de';
namespace('GRP.langs.' + locale);
GRP.langs[locale].texts = {
    version: "Version",
    closeentry: {
        text: 'Eingabe beenden',
        keyword: 'Schliessen'
    },
    column: {
        text: 'mehrspaltig anzeigen',
        keyword: 'Spalte',
        summary: 'Objekt hinzufügen/bearbeiten',
        desc: 'Spalten verwalten'
    },
	sharemsg:{
		toolong: "Die Nachricht ist zu lang!",
        notetoolong: "<b>Hinweis, ihre Nachricht ist zu lang:</b> (Optional, remain {0} characters)",
        notemax: "<b>Hinweis, ihre Nachricht ist zu lang:</b> (Optional, no more than 140 characters)",
        text_title: 'Titel',
        text_tag: 'Etikett',
        text_url: 'URL',
        text_send: 'Senden',
        text_count: 'Zähler',
        text_cancel: 'Abbrechen',
        text_shortener: 'kurze URL',
        shortfailed: "Entschuldigen sie, es ist ein Fehler beim verwenden der kurzen URL aufgetreten!\n\r{0}"
	},
    facebook: {
        text: 'Dies auf Facebook teilen',
        keyword: 'Facebook'
    },
    twitter: {
        text: 'Dies aut Twitter teilen',
        keyword: 'Twitter',
        plslogin: 'Bitte loggen Sie sich in Twitter ein'
    },
	identi:{
		text:'Dies auf Identi teilen',
		keyword: 'Identi',
		plslogin: 'Bitte loggen Sie sich auf Identi.ca ein',
		nologin: 'Diese Funktion erfordert ein Benutzernamen und Passwort, verändern Sie dies in den Einstellungen!!'
	},
	jaiku:{
		text:'Dies aut Jaiku teilen',
		keyword: 'Jaiku',
		plslogin: 'Bitte loggen sie sich auf Jaiku ein'
	},
    readit: {
        password: 'Password, falls vorhanden:',
        wronglogin: 'Falscher Benutzername oder Passwort, bitte überprüfen!!',
        nologin: 'Diese Funktion erfordert ein Benutzername, verändern Sie dies in den Einstellungen!!',
        error: 'Es ist ein Fehler aufgetreten. Versuchen sie es später noch einmal.',
        badrequest: 'Falsche Anfrage. Wahrscheindlich fehlt eine Angabe, z.B. die URL.',
        saving: 'Speichern',
        shortcut_readitlater: 'Später lesen mit Instapaper'
    },
    instapaper: {
        text: 'Später lesen mit Instapaper',
        keyword: 'Instapaper',
        plslogin: 'Bitte loggen Sie sich in Instapaper ein',
        login: 'E-Mail oder Benutzername:'
    },
	readitlater: {
        text: 'Später lesen mit ReadItLater',
        keyword: 'ReadItLater',
        plslogin: 'Bitte loggen sie sich bei ReadItLater ein',
        rateexceeded: 'Bewertungslimit überschritten, bitte warten Sie einen Moment',
        maintenance: 'Der Server von Read It Later ist down für Wartungsarbeiten'
    },
	radbox: {
        text: 'Read Later mit Radbox',
        keyword: 'Radbox',
        nologin: 'Diese Funktion benötigt ein Passwort, verändern Sie dies in den Einstellungen!!',
		novideo: 'Es wurde kein Video auf dieser Seite gefunden'
    },
	addthis:{
		text:'Teilen mit AddThis',
		keyword: 'AddThis'
	},
	blogger:{
		text:'Teilen mit Blogger',
		keyword: 'Blogger'
	},
    favicons: {
        preferences: 'Einstellungen',
        getfavicon: 'Favicon holen',
        notfoundicon: 'Favicon wurde nicht gefunden "{0}"',
        summary: 'Hinzufügen / Bearbeiten von Elementen',
        desc: 'Verwalte Favicons'
    },
    filter: {
        settings: 'Filtereinstellungen',
        excludes: 'Ausgeschlossene',
        highlights: 'Hervorgehobene',
        highlight: 'Hervorgehoben',
        exclude: 'Ausgeschlossen',
        hideduplicates: 'Verstecke Dublikate',
        hideexcludes: 'Verstecke Ausgeschlossene',
        preferehighlights: 'Beforzuge Hervorgehobene vor Ausgeschlossene',
        update: 'Update',
        quickadd: 'Schnell hinzufügen',
        add: 'hinzufügen',
        close: 'Schliessen',
        edit: 'Bearbeiten',
        remove: 'Beenden',
		//v2
		filter: 'Filter',
	    save: 'Beenden & Anwenden',
	    close: 'Menu schliessen',
	    searchbody: 'Im ganzen Text suchen',
		detect_duplicates: 'Dulikate erkennen',
	    hide_duplicates: 'verstecke Dublikate',
	    hide_excludes: 'verstecke Ausgeschlossene',
	    prefer_highlights: 'Beforzuge Hervorgehobene vor Ausgeschlossene',
		live:'Live',
	    highlights: 'Hervorgehobene',
	    duplicates: 'Dublikate',
	    excludes: 'Ausgeschlossene',
	    content: 'Inhalt',
	    addentry: 'hinzufügen',
	    add_excludes: 'Als Ausgeschlossene hinzufügen',
	    add_highlights: 'Als Hervorgehoben hinzufügen',
		button:'Filter auf jeden Eintrag anwenden'
    },
    fitheight: {
        text: 'Höhe anpassen',
        keyword: 'Höhe anpassen'
    },
    jump: {
        text: 'Springe',
	    textbottom: 'Springe zum Schluss',
        texttop: 'Springe zum Anfang',
        keywordtop: 'Anfang'
    },
    openbackground: {
        text: 'Open in background',
        keyword: 'Open'
    },
    preview: {
        text: 'Integrierte Vorschau der Nachrichten',
        title: 'Als Vorschau öffnen',
        opennewtab: 'In einem neuen Fenster öffnen',
        keyword: 'Vorschau',
        overlay_next: 'Weiter',
        overlay_previous: 'Zurück',
        overlay_close: 'Schliessen',
        overlay_category: 'Kategorie',
		overlay_loading: 'Laden...'
    },
    readbymouse: {
        middleclick: 'Mittelklick',
        openintab: 'In einem neuen Tab öffnen',
        openinbacktab: 'In einem alten Tab öffnen',
        shares: 'teilen',
        stars: 'Sterne',
        tag: 'Etikett',
        addtag: 'Etikett hinzufügen',
        on: 'ReadByMouse On',
        off: 'ReadByMouse Off'
    },
    replacer: {
        nomatch: 'Kein Treffer gefunden.',
        loading: 'Laden...'
    },
    lightbox: {
        text: 'Beleuchtung auf den Medien',
        keyword: 'Beleuchtung'
    },
    ig: {
        menu_prefs: 'Reader+ Einstellungen',
        menu_theme: 'Reader+ Aussehen',
        menu_randomtheme: 'Ändere Aussehen :'
    },
    menu: {
        label: 'Extras',
        showallfolders: 'Alle Ordner anzeigen'
    },
	actions:{
		text:'Aktionssymbole'
	},
	portal:{
		readmore: 'Mehr lesen (Ctrl+click um Aktion anzuzeigen)'
	}
};
GRP.langs[locale].prefs = {
    global: {
        title: "Reader Plus",
        "val-save": "Speichern",
        alreadyexist: "Eintrag existiert bereits!",
        snew: 'neu!',
        supdated: 'Erneuerung!',
        prefssaved: "Einstellungen gespeichert!",
        cachecleared: "Cache gelöscht!",
        expandall: 'Alles'
    },
    theme: {
        noborder: "Eintragsrand entfernen um mehr Beiträge pro Seite anzuzeigen",
        mytheme: 'Benutze<a href="http://code.google.com/p/googlereaderplus/wiki/Backgrounds" target="blank">eigenes Hintergrundbild</a> und Schriftfarbe mit deinem Aussehen  "Mein Aussehen" (<a href="http://code.google.com/p/googlereaderplus/wiki/Themes" target="blank">Vorschau</a>)',
        /*url: 'Bild URL',*/
        color: 'Textfarbe',
        bg: 'Hintergrundfarbe',
        /*repeat: 'gekacheltes Bild ',*/
        externaltheme: 'Google/Gmail Aussehen',
        imgrbg: 'Hintergrund widerholen',
        imgsbg: 'Hintergrund',
        imgrh: 'Kopf widerholen',
        imgh: 'Kopf',
        imghr: 'Rechter Kopf',
        imghl: 'Linker Kopf',
        imgrf: 'Fuss widerholen',
        imgf: 'Fuss',
        imgfr: 'rechter Fuss',
        imgfl: 'linker Fuss',
		ncolumns: 'Anzahl Zeilen'
    },
    ig: {
        warning: 'Einige Themen können nicht richtig angezeigt werden ; dies ist eine Betafunktion!',
        skin_name: 'iGoogle Thema',
        skin_url: 'iGoogle Thema URL',
        debug: 'Debugmodus (Nur um zu debuggen)',
        randomtime: 'Dinamisches Thema, verändert sich zufällig, anstatt Zeitgesteuert',
        userandomthemes: 'Thema verändert sich automatisch zufällig',
        randomthemes: 'Verändere Thema alle (min.)',
        add: 'Hinzufügen',
        next: 'Weiter',
        previous: 'Zurück',
        random: 'Zufall',
        search: 'Thema suchen'
    },
    about: {
        thanks1: '<td><span class="top_right"><img src="images/48.png"></span><h1>Thank you...</h1>' +
        '<p>... for installing (or updating to) the latest version of <strong>Reader Plus</strong>!</p>' +
        '<p>Make sure you check the <a href="preferences.html" title="Go to the preferences page"><strong>preferences page</strong></a> for configuration of the extension.</p>' +
        '<p><a href="https://chrome.google.com/webstore/detail/hhcknjkmaaeinhdjgimjnophgpbdgfmg" target="_blank" title="Visit extension homepage"><strong>Visit the Google Chrome Extensions gallery page!</strong></a></p>' +
        '<p><a href="http://www.twitter.com/ludoo0d0a"><img src="http://twitter-badges.s3.amazonaws.com/follow_me-a.png" alt="Follow me on Twitter"/></a></p>' +
        '<p></p></td>',
        thanks2: '<td><p>If you like this extension and want more features, feel free to make a donation.</p>' +
        '<p>In this way, I could buy a truck of coffee so that i can stay awake to write all the code :)</p>' +
        '<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=FK9P8MNY9MGZL&lc=US&item_name=GoogleReaderPlus%20project&currency_code=EUR&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted"><img alt="Donate" border="0" src="https://www.paypal.com/en_US/i/btn/btn_donate_SM.gif" width="74" height="21"></a></td>',
        //whatsnew: '<td> <h2>What\'s new!!</h2> <ul> <li>Sync settings in your Google Docs (1 profile for multiple computers)</li> <li>Try the new themes</li> <li>Toggle theme shortcut (Alt X)</li> <li>Spanish supported now</li> <li>Bugfixes</li> </ul> <p class="center"><img src="http://googlereaderplus.googlecode.com/svn/trunk/GoogleReaderPlus/screenshots/button/popup1.png"/></p><h2>And still ...</h2> <ul> <li>Cloud experience : Use shared configuration for favicons and replacer</li> <li>Toolbar button shows now a popup with last unread items and a fast tooltip preview</li> <li>or use a custom background with the new theme \'MyTheme\'</li> <li>or use a random <a href="http://www.google.com/ig/directory?type=themes" target="blank">iGoogle</a> theme</li> <li>Preview as lightbox</li> <li>Share items using <a href="http://www.readitlater.com" target="blank">ReadItLater</a></li> <li>Entry actions as floating window (general)</li> <li>Translate news</li> </ul> </td>',
        nopopup: '<p>If you don\'t want to be alerted on new version updates, check option "No popup on updates" in <a href="preferences.html#general">General section</a>.</p>'
    },
    link: {
        reader: "<span>Google Reader</span>Your RSS reader",
        issues: "<span>Report issue</span>Found a bug or suggestion ?",
        download: "<span>Google Extension</span>The place to download",
        about: "<span>About</span>About, thanks,...",
        site: "<span>Website</span>My personal website",
        twitter: "<span><img width=\"160\" height=\"27\" src=\"http://twitter-badges.s3.amazonaws.com/follow_me-a.png\" alt=\"Follow ludoo0d0a on Twitter\"></span>Follow news and updates",
        donate: '<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&amp;business=FK9P8MNY9MGZL&amp;lc=US&amp;item_name=googlereaderplus%20project&amp;currency_code=EUR&amp;bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted"><span><img alt="Donate" border="0" src="https://www.paypal.com/en_US/i/btn/btn_donate_SM.gif" width="74" height="21"></span>Offer me a coffee!</a>',
        translate: '<span>Translation</span>Help me to translate</a>'
    },
    column: {
        count: "Columns number",
        locked: "Always actived, except following feeds:",
        pagebreak: "Break long articles so long articles can be read page by page like a newspaper.",
		miniparas: "Number of paragraphs minimum before split into columns",
        entersite: "Enter URL of the site"
    },
    translate: {
        lang: "Translate content into ",
        locked: "Always actived, except for:",
        include: "Only include following feeds:",
        entersite: "Enter URL of the site"
    },
    twitter: {
        shortener: "Shortener",
        shortener_bitly: "BitLy configuration (optional):",
        shortener_login: "Login",
        shortener_apikey: "ApiKey",
        shortener_pwd: "Password"
    },
    instapaper: {
        auth: "<a href='http://www.instapaper.com' target='blank'>Instapaper</a> authentication:",
        username: "Username:",
        password: "Password (optional):"
    },
    readitlater: {
        auth: "<a href='http://www.readitlaterlist.com' target='blank'>ReadItLater</a> <a href='http://readitlaterlist.com/signup' target='blank'>authentication</a> (required):",
        username: "Username:",
        password: "Password:"
    },
	radbox: {
        auth: "<a href='http://radbox.me/support/extras' target='blank'>Radbox</a> <a href='http://radbox.me/account/user/register' target='_blank'>authentication</a> (required):",
        username: "Userkey:"
    },
	identi: {
        shortener: "Shortener",
        shortener_bitly: "BitLy configuration (optional):",
        shortener_login: "Login",
        shortener_apikey: "ApiKey",
        shortener_pwd: "Password"
    },
	addthis:{
		layout:'Layout',
		layoutdesc:'Various formats are explained on <a href="http://www.addthis.com/web-button-select" target="_blank">this page</a>'
	},
    colorful: {
        tree: "Show label colors in the left navigation tree",
		usebasecolor: "Use following base colors :",
		background: "Background color",
		color:"Fore color"
    },
    general: {
        counter: "Display unread counter in the toolbar icon",
counterinterval: "Refresh unread counter every (min)",
        pageicon: 'Activate icon in the address bar (click will open a menu)',
        stats: 'Enable anonymous statistics reporting (for a better support)',
        bottomup: 'Footer toolbar on the top',
        opendirect: "Click on toolbar icon will open GoogleReader",
        secure: "Always force use of secure protocol (https)",
        topcurrent: "Current entry always on top",
        floatactions: "Entry actions are displayed as a floating window",
        noupdatepopup: "No popup on updates",
        icontoolbar_add: "To add button with icon in toolbar, please <a href=\"https://chrome.google.com/webstore/detail/ecpcafinfpjgabomoamkhkgnpgpmdmeo\">download and install it</a>.",
        icontoolbar_text: "<span>To make the button optional, we put him in an another extension as standalone,</span>                                    <br>                                    <span>to be installed along with readerplus.</span>                                    <br>                                    <span>To add the button, click <b></b> on the <a href=\"https://chrome.google.com/webstore/detail/ecpcafinfpjgabomoamkhkgnpgpmdmeo\">readerplus Toolbar button</a> page.</span><span>To remove the button, right click him and choose Disable.</span>",
        importexport_text: "You can now save your preferences using 'export' and reload it later using 'import', but be sure data are <a href='http://jsonformatter.curiousconcept.com/' target='blank'>JSON compliant</a>:",
        confirmimport: "Are you sure to import this configuration?\nCurrent configuration will be LOST!",
confirmsyncload: "Are you sure to import this configuration from your Google's account?\nCurrent configuration will be LOST!",
prefsimportedok: 'Preferences succesfully imported!',
prefsimportfailed: 'Import failed!',
prefsimportnull: 'No saved preferences found!',
syncprefs_text: 'Load/save using your Google\'s account',
prefssavedok: 'Preferences succesfully saved!',
prefssavedfailed: 'Preferences save failed!',
        text_layout: 'Layout options',
        text_private: 'Private data and updates',
        text_toolbaricon: 'Toolbar icon',
        text_pageicon: 'Address bar icon',
        text_export: 'Export/import',
currdir: 'Highlight folder of current entry <span class="new">new!</span>',
icons: 'Icons only for action buttons (except checkbox) <span class="new">new!</span>',
hidetoolbar: 'Hide user toolbar'
    },
limit: {
slidewindow: "Slidewindow - limit entries number",
mini: "Minimum items",
maxi: "Maximum items"
},
prefetch: {
first: "Initial loading items number on the expanded view.",
next: "Loading items when scrolling on the expanded view. ",
list: "Initial fetch on the list view."
},
nested: {
separator: "Separator to add extra level (example: Sports:Footbal)."
},
    removeads: {
        links: "Link filter:",
        images: "Image filter:",
        iframes: "Iframe filter:"
    },
    preview: {
        onicon: "Show integrated preview when click on icon right after the title (if not checked, on title)",
        locked: "Always actived, except following feeds:",
        overlay: 'Fullscreen preview (Lightbox)',
		loading: 'Display "Loading in progress"'
    },
    fitheight: {
        locked: "Always actived, except following feeds:"
    },
    filter: {
        searchbody: "Search inside title and body text",
        highlights: 'Highlights list (one item per line)',
        excludes: 'Excludes list (one item per line)',
		searchbody: 'Search in whole body text',
		detect_duplicates: 'Detect Duplicates',
	    hide_duplicates: 'Hide Duplicates',
	    hide_excludes: 'Hide Excludes',
	    prefer_highlights: 'Prefer Highlights over excludes',
		live:'Live',
		word_mini: 'Minimum number of letters for a word',
		button:'Filter button on each entry'
    },
    favicons: {
        providerpageicons: 'Use <a href="http://pageicons.appspot.com" target="blank">PageIcons</a> provider (Recommended to load succesfully all icons)',
        sidebaronly: "Show favicons in sidebar only",
        cloud: 'Use cloud database <a href="http://wedata.net/databases/Favicons" target="blank">wedata/Favicons</a> so that community completes favicons',
        custom: "Enter your custom favicons :",
        add: "Add",
        tip: "Tip: You could add it easily using the contextual menu \"Get favicon\" of the left side bar",
        manual: "Manual favicons for all sites (not recommended ; slower)",
        parsing: "This will try to detect favicon by parsing each homepage",
        entersite: "Enter URL of the site",
        prompticon: "Enter the icon url (let empty to get it automatically):"
    },
    replacer: {
        intro: '<a href="http://code.google.com/p/googlereaderplus/wiki/ReplacerHowto" target="blank">Help on how to use replacer</a>',
        cloud: 'Use online expressions from <a href="http://wedata.net/databases/Replacer/items" target="blank">wedata/Replacer</a> cloud database',
        link: "Link Regex",
        from: "Search regex/xpath/css",
        to: "Replace",
        prompttitle: "Title for this filter"
    },
    lightbox: {
        locked: "Always actived, except following feeds:"
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
    }
};
