/**
 * ReaderPlus
 * Translation
 *
 * **************************
 * de : German
 * **************************
 *
 * Version : 1.3
 * Date : 04-01-2010
 * @author Valente/Thorsten Rost
 */
var locale = 'de';
namespace('GRP.langs.' + locale);
GRP.langs[locale].texts = {
    version: "Ausgabe",
    closeentry: {
        text: 'eingabe beenden',
        keyword: 'BEENDEN'
    },
    column: {
        text: 'mehrspaltige anzeige',
        keyword: 'spalte',
        summary: 'objekt hinzufügen/bearbeiten',
        desc: 'spalten verwalten'
    },
    facebook: {
        text: 'neuigkeiten bei facebook austauschen',
        keyword: 'Facebook'
    },
    twitter: {
        text: 'neuigkeiten bei twitter austauschen',
        keyword: 'twitter',
        plslogin: 'bitte bei twitter anmelden',
        toolong: "nachricht ist zu lang!",
        notetoolong: "Optional, verbleibend {0} Zeichen",
        notemax: "Optional, nicht mehr als 140 Zeichen",
        text_title: 'Titel',
        text_tag: 'Tag',
        text_url: 'URL (Internet Adresse)',
        text_send: 'Senden',
        text_count: 'zählen',
        text_cancel: 'Abbrechen',
        text_shortener: 'Shortener',
        shortfailed: "Sorry, an error occured on trying to use short url!\n\r{0}"
    },
    readit: {
        password: 'passwort, falls vorhanden',
        wronglogin: 'Falsches Passwort oder benutzername, bitte überprüfen',
        nologin: 'Für dieses Feature benötigen Sie einen Benutzernamen. Bitte anmelden.',
        error: 'Ein Fehler ist aufgetreten, bitte später noch mal versuchen.',
        badrequest: 'falsche anforderung, vermutlich fehlen parameter in der adresse',
        saving: 'speichern',
        shortcut_readitlater: 'SPÄTER LESEN MIT INSTAPAPER'
    },
    instapaper: {
        text: 'später lesen mit instapaper',
        keyword: 'instapaper',
        plslogin: 'bitte bei instapaper anmelden',
        login: 'email oder benutzername:'
    },
    readitlater: {
        text: 'später lesen mit readitlater',
        keyword: 'ReadItLater',
        plslogin: 'bitte bei readitlater anmelden',
        rateexceeded: 'anmelde limit erreicht, bitte später nochmal versuchen ',
        maintenance: 'später lesen der synchronisationsserver ist außer betrieb'
    },
    favicons: {
        preferences: 'präferenzen',
        getfavicon: 'Bevorzugtes Symbol FAVICON',
        notfoundicon: 'favicon kann nicht gefunden werden',
        summary: 'hinzufügen/entfernen',
        desc: 'favicons organisieren'
    },
    filter: {
        settings: 'einstellungen filtern',
        excludes: 'ausklammern',
        highlights: 'höhepunkt',
        highlight: 'höhepunkt',
        exclude: 'ausklammern',
        hideduplicates: 'doppelte einträge vergergen',
        hideexcludes: 'augeklammerte einträge verbergen',
        preferehighlights: 'höhepunkte bevorzugen',
        update: 'update',
        quickadd: 'quick add',
        add: 'hinzufügen',
        close: 'schließen',
        edit: 'ändern',
        remove: 'entfernen'
    },
    fitheight: {
        text: 'grösse anpassen',
        keyword: 'grösse anpassen'
    },
    jump: {
        textbottom: 'zum ende wechseln',
        texttop: 'zum anfang wechseln',
        keywordtop: 'anfang'
    },
    openbackground: {
        text: 'im hintergrund öffnen',
        keyword: 'öffnen'
    },
    preview: {
        text: 'intigrierte nachrichten vorschau',
        title: 'als vorschau öffnen',
        opennewtab: 'in neuem fenster öffnen',
        keyword: 'vorschau',
        overlay_next: 'weiter',
        overlay_previous: 'vorher',
        overlay_close: 'schliessen',
        overlay_category: 'Category'
    },
    readbymouse: {
        middleclick: 'mittel klick',
        openintab: 'im neuen tab öffnen',
        openinbacktab: 'tap im hintergrund öffnen',
        shares: 'teilen',
        stars: 'sterne',
        tag: 'bezeichner',
        addtag: 'Add a Tag',
        on: 'ReadByMouse On',
        off: 'ReadByMouse Off'
    },
    replacer: {
        nomatch: 'keine übereinstimmung gefunden.',
        loading: 'LADEND ...'
    },
    lightbox: {
        text: 'licht on the media',
        keyword: 'licht'
    },
    ig: {
        menu_prefs: 'leser + präferenzen',
        menu_theme: 'thema konfigurieren',
        menu_randomtheme: 'zufallsthema'
    },
    menu: {
        label: 'Extra',
        showallfolders: 'Display all folders'
    }
};
GRP.langs[locale].prefs = {
    global: {
        title: "Reader Plus",
        "val-save": "sichern",
        alreadyexist: "das objekt existiert bereits!",
        snew: 'new!',
        supdated: 'Updated!',
        prefssaved: "Preferences saved!",
        cachecleared: "Cache cleared!",
        expandall: 'All'
    },
    theme: {
        noborder: "Entfernung von Begrenzungslinien zur Vergrößerung der Anzeigefläche",
        mytheme: 'Use <a href="http://code.google.com/p/googlereaderplus/wiki/Backgrounds" target="blank">custom background picture</a> and font color with skin "MyTheme"',
        url: 'Picture URL',
        color: 'Text color',
        bg: 'Background hover color',
        /*repeat: 'Tiled Picture ',*/
        externaltheme: 'Google/Gmail theme',
        imgrbg: 'Repeated background',
        imgsbg: 'Background',
        imgrh: 'Repeated header',
        imgh: 'Header',
        imghr: 'Right header',
        imghl: 'Left header',
        imgrf: 'Repeated footer',
        imgf: 'Footer',
        imgfr: 'Right footer',
        imgfl: 'Left footer'
    },
    ig: {
        warning: 'Some themes could be displayed incorrectly ; this is a Beta feature!',
        skin_name: 'iGoogle theme name',
        skin_url: 'iGoogle theme URL',
        debug: 'Debug mode (For debugging only)',
        randomtime: 'Random skin instead time control for dynamic theme',
        userandomthemes: 'Titel wechselt automatisch per zufallsgenerator',
        randomthemes: 'Titel (Theme) wechselt jede (min.)',
        add: 'Jetzt hinzufügen',
        next: 'Next',
        previous: 'zurück',
        random: 'zufall',
        search: 'suchen'
    },
    about: {
        thanks1: '<td><span class="top_right"><img src="images/48.png"></span><h1>Thank you...</h1>' +
        '<p>... for installing (or updating to) the latest version of <strong>Reader Plus</strong>!</p>' +
        '<p>Make sure you check the <a href="preferences.html" title="Go to the preferences page"><strong>preferences page</strong></a> for configuration of the extension.</p>' +
        '<p><a href="https://chrome.google.com/extensions/detail/hhcknjkmaaeinhdjgimjnophgpbdgfmg" target="_blank" title="Visit extension homepage"><strong>Visit the Google Chrome Extensions gallery page!</strong></a></p>' +
        '<p><a href="http://www.twitter.com/ludoo0d0a"><img src="http://twitter-badges.s3.amazonaws.com/follow_me-a.png" alt="Follow me on Twitter"/></a></p>' +
        '<p></p></td>',
        thanks2: '<td><p>ihnen gefällt die programm erweiterung und sie möchten noch mehr features, spenden werden hierzu gerne angenommen.</p>' +
        '<p>In this way, I could buy a truck of coffee so that i can stay awake to write all the code :)</p>' +
        '<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=FK9P8MNY9MGZL&lc=US&item_name=GoogleReaderPlus%20project&currency_code=EUR&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted"><img alt="Donate" border="0" src="https://www.paypal.com/en_US/i/btn/btn_donate_SM.gif" width="74" height="21"></a></td>',
        whatsnew: '<td><h2>What\'s new!!</h2><ul><li>Try the new themes</li><li>or use a custom background with the new theme "MyTheme"</li><li>or use a random <a href="http://www.google.com/ig/directory?type=themes" target="blank">iGoogle</a> theme</li><li>Preview as lightbox</li><li>Share items using <a href="http://www.readitlater.com" target="blank">ReadItLater</a></li><li>Entry actions as floating window (general)</li><li>Translate news</li></ul></td>',
        nopopup: '<p>If you don\'t want to be alerted on new version updates, check option "No popup on updates" in <a href="preferences.html#general">General section</a>.</p>'
    },
    link: {
        reader: "<span>Google Reader</span>Your RSS reader",
        issues: "<span>Report issue</span>fehler oder irgenwelche anregungen?",
        download: "<span>Google Extension</span>DER ORT ZUM DOWNLOAD",
        about: "<span>About</span>About, thanks,...",
        site: "<span>Website</span>meine eigene seite",
        twitter: "<span><img width=\"160\" height=\"27\" src=\"http://twitter-badges.s3.amazonaws.com/follow_me-a.png\" alt=\"Follow ludoo0d0a on Twitter\"></span>Follow news and updates",
        donate: '<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&amp;business=FK9P8MNY9MGZL&amp;lc=US&amp;item_name=googlereaderplus%20project&amp;currency_code=EUR&amp;bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted"><span><img alt="Donate" border="0" src="https://www.paypal.com/en_US/i/btn/btn_donate_SM.gif" width="74" height="21"></span>Offer me a coffee!</a>',
        translate: '<span>Translation</span>Help me to translate</a>'
    },
    column: {
        count: "nummer der spalte",
        locked: "feature (merkmal) spalten standartmäßig immer aktiviert :",
        pagebreak: "große artikel aufteilen das sie seite für seite wie eine zeitschrift gelesen werden können.",
        miniparas: "number of paragraphs minimum before split into columns",
        "entersite": "seite beitreten"
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
        auth: "Instapaper authentifizierung:",
        username: "benutzername:",
        password: "passwort (optional):"
    },
    readitlater: {
        auth: "ReadItLater <a href='http://readitlaterlist.com/signup' target='blank'>authentication</a> (required):",
        username: "Username:",
        password: "Password:"
    },
    colorful: {
        tree: "namen im linken navigationsbereich farblich darstellen",
        usebasecolor: "Use following base colors :",
        background: "Background color",
        color: "Fore color"
    },
    general: {
        counter: "wenn ungelesen, in der toolbar anzeigen",
        counterinterval: "Refresh unread counter every (min)",
        pageicon: 'Activate icon in the address bar (click will open a menu)',
        stats: 'Enable anonymous statistics reporting (for a better support)',
        bottomup: 'Footer toolbar on the top',
        opendirect: "google reader öffnet bei anklicken des icons",
        secure: "nutzung des sicherheitsprotikolls als vorlage (https)",
        topcurrent: "Current entry always on top",
        floatactions: "Entry actions are displayed as a floating window",
        noupdatepopup: "No popup on updates",
        icontoolbar_add: "To add button with icon in toolbar, please <a href=\"https://chrome.google.com/extensions/detail/ecpcafinfpjgabomoamkhkgnpgpmdmeo\">download and install it</a>.",
        icontoolbar_text: "<span>To make the button optional, we put him in an another extension as standalone,</span><br><span>to be installed along with readerplus.</span>                                    <br>                                    <span>To add the button, click <b></b> on the <a href=\"https://chrome.google.com/extensions/detail/ecpcafinfpjgabomoamkhkgnpgpmdmeo\">readerplus Toolbar button</a> page.</span><span>To remove the button, right click him and choose Disable.</span>",
        importexport_text: "You can now save your preferences using 'export' and reload it later using 'import':",
        confirmimport: "Are you sure to import this configuration?\nCurrent configuration will be LOST!",
        text_layout: 'Layout options',
        text_private: 'Private data and updates',
        text_toolbaricon: 'Toolbar icon',
        text_pageicon: 'Address bar icon',
        text_export: 'Export/import',
        currdir: 'Highlight folder of current entry <span class="new">new!</span>',
        icons: 'Icons only for action buttons (except checkbox) <span class="new">new!</span>'
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
        onicon: "vorschau anzeigen bei rechtsklick auf das icon",
        locked: "feature 'vorschau' standartmässig immer aktiviert, ausser für:",
        overlay: 'Fullscreen preview (Lightbox)'
    },
    fitheight: {
        locked: "feature fit height standartmässig immer aktiviert; ausser für"
    },
    filter: {
        searchbody: "im titel/haupttext suchen",
        highlights: 'Highlights list (one item per line)',
        excludes: 'Excludes list (one item per line)'
    },
    favicons: {
        providerpageicons: 'Use <a href="http://pageicons.appspot.com" target="blank">PageIcons</a> provider (Recommended to load succesfully all icons)',
        sidebaronly: "favicons nur in der sidebar anzeigen",
        cloud: 'Use cloud database <a href="http://wedata.net/databases/Favicons" target="blank">wedata/Favicons</a> so that community completes favicons',
        custom: "den eigenen favicons beitreten :",
        add: "Add",
        tip: "du kannst einfacher etwas hinzufügen in dem du das kontextmenü verwendest",
        manual: "Manual favicons for all sites (not recommended ; slower)",
        parsing: "This will try to detect favicon by parsing each homepage",
        "entersite": "Enter URL of the site",
        "prompticon": "Enter the icon url (let empty to get it automatically):"
    },
    replacer: {
        intro: 'You can use <a href="http://karmatics.com/aardvark/bookmarklet.html" target="blank">Aardvark bookmarklet</a> to identify correct xpath instead regex (Use prefix "xpath:")',
        cloud: 'Use online expressions from <a href="http://wedata.net/databases/LDRFullFeed/items" target="blank">wedata/LDRFullFeed</a> and <a href="http://wedata.net/databases/Replacer/items" target="blank">wedata/Replacer</a> cloud database',
        link: "Link Regex",
        from: "Search regex/xpath",
        to: "Replace",
        prompttitle: "Title for this filter"
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
    }
};
