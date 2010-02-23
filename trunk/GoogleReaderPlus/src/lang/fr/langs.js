/**
 * ReaderPlus
 * Translation
 *
 * **************************
 * fr : Francais
 * **************************
 *
 * Version : 0.2
 * Date : 02-23-2010
 * @author Valente
 */
namespace('GRP.langs.fr');
GRP.langs.fr.texts = 
{
    'version': "version",
    closeentry: 
    {
        text: 'Fermer cet élément',
        keyword: 'Fermer'
    },
    colorful: 
    {
        // pref labels
        color: "Colorier ces élément:",
        list: "En tete de la vue liste.",
        expanded: "Corps des éléments en vue 'texte complet'.",
        frame: "Frames des éléments en vue 'texte complet'.",
        read: "Lire les éléments",
        unread: "Elément non lus.",
        
        // pref messages
        msgWill: "sera",
        msgWillNot: "ne sera pas",
        msgColored: " be colored.",
        msgList: "En tete de la vue liste ",
        msgExpanded: "Corps des éléments en vue 'texte complet' ",
        msgFrame: "Frames des éléments en vue 'texte complet' ",
        msgUnread: "Elément non lus ",
        msgRead: "Lire les éléments",
        msgUndef: "Indéfini",
        
        scheme: "Schema des couleurs: ",
        def: "Defaut",
        custom: "Personnalise",
        
        update: "Mise à jour disponible",
        install: "Installation"
    },
    column: 
    {
        text: 'Affichage multi-colonnes (type journal)',
        keyword: 'Colonnes'
    },
    facebook: 
    {
        text: 'Partager cette nouvelle sur Facebook',
        keyword: 'Facebook'
    },
    twitter: 
    {
        text: 'Partager cette nouvelle sur Twitter',
        keyword: 'Twitter',
        plslogin: 'Merci de vous connecter à Twitter',
        toolong: "Ce message est trop long!",
        notetoolong: "<b>Note attachée à la nouvelle:</b> (optionel, reste {0} caractères)",
        notemax: "<b>Note attachée à la nouvelle:</b> (optionel, 140 caractères maximum)",
        text_title: 'Titre',
        text_tag: 'Tag',
        text_url: 'Adresse',
        text_send: 'Envoyer',
        text_count: 'Compter',
        text_cancel: 'Annuler',
        text_shortener: 'Short URL',
        shortfailed: "Désolé, une erreur est survenue pour obtenir une url courte!\n\r{0}"
    },
    instapaper: 
    {
        text: 'Lire plus tard avec Instapaper',
        keyword: 'Instapaper',
        plslogin: 'Merci de vous connecter Instapaper',
        login: 'Email ou nom d\'utilisateur:',
        password: 'Mot de passe, si vous en avez un:',
        wronglogin: 'Mauvais mot de passe ou nom d\'utilisateur, merci de réessayer!!',
        error: 'Ce service a rencontré une erreur. merci de réessayer plus tard.',
        badrequest: 'Mauvaise requête. Il manque surement un paramètre comme l\'url.',
        saving: 'Sauvegarde'
    },
    favicons: 
    {
        preferences: 'Préférences',
        getfavicon: 'Obtenir l\'icône de ce site',
        notfoundicon: 'Impossible d\'obtenir l\'icône de  "{0}"'
    },
    filter: 
    {
        settings: 'Réglages du filtre',
        excludes: 'Exclusions',
        highlights: 'Surlignages',
        highlight: 'Surligner',
        exclude: 'Exclure',
        hideduplicates: 'Cacher les doublons',
        hideexcludes: 'Cacher les exclusions',
        preferehighlights: 'Préférer les surlignages',
        update: 'Mise à jour',
        quickadd: 'Ajout rapide',
        add: 'Ajouter',
        close: 'Fermer'
    },
    fitheight: 
    {
        text: 'Adapter la hauteur',
        keyword: 'Adapter la hauteur'
    },
    jump: 
    {
        textbottom: 'Aller en bas',
        texttop: 'Aller en haut',
        keywordtop: 'haut'
    },
    openbackground: 
    {
        text: 'Ouvrir en arriére-plan',
        keyword: 'Ouvrir'
    },
    preview: 
    {
        text: 'Aperçu de la nouvelle',
        title: 'Aperçu de la nouvelle',
        opennewtab: 'Ouvrir dans une nouvelle fenêtre',
        keyword: 'Aperçu'
    },
    readbymouse: 
    {
        middleclick: 'Clic bouton du milieu',
        openintab: 'Ouvrir dans un nouvel onglet',
        shares: 'Partage',
        stars: 'suivi',
        tag: 'Tag',
        addtag: 'Ajouter un tag',
        on: 'ReadByMouse activé',
        off: 'ReadByMouse arrêté'
    }
};

GRP.langs.fr.prefs = 
{
    "global": 
    {
        "title": "Mon Reader Plus"
    },
    "link": 
    {
        "reader": "<span>Google Reader</span>Mon lecteur RSS",
        "issues": "<span>Support</span>Un bug ou une idée ?",
        "download": "<span>Télécharger</span>La galerie Google",
        "about": "<span>A propos</span>A propos, remerciements,...",
        "site": "<span>Site web</span>Mon site web",
        "twitter": "<span><img width=\"61\" height=\"23\" src=\"http://twitter-badges.s3.amazonaws.com/twitter-a.png\" alt=\"Suivez ludoo0d0a sur Twitter\"></span>Suivez les mises à jours"
    },
    "column": 
    {
        "count": "Columns number",
        "locked": "Feature 'Column' always actived by default",
        "pagebreak": "Break long articles so long articles can be read page by page like a newspaper."
    },
    "twitter": 
    {
        "shortener": "Shortener",
        "shortener_bitly": "BitLy configuration (optional):",
        "shortener_login": "Login",
        "shortener_apikey": "ApiKey",
        "shortener_pwd": "Password"
    },
    "instapaper": 
    {
        "auth": "Instapaper authentication (optional):"
    },
    "colorful": 
    {
        "tree": "Show label colors in the left navigation tree"
    },
    "icon": 
    {
        "counter": "Display unread counter in the toolbar icon",
        "opendirect": "Click on icon will open GoogleReader",
        "icontoolbar_add": "To add button with icon in toolbar, please <a href=\"https://chrome.google.com/extensions/detail/ecpcafinfpjgabomoamkhkgnpgpmdmeo\">download and install it</a>.",
        "icontoolbar_text": "<span>To make the button optional, we put him in an another extension as standalone,</span>                                    <br>                                    <span>to be installed along with readerplus.</span>                                    <br>                                    <span>To add the button, click <b>Install</b> on the <a href=\"https://chrome.google.com/extensions/detail/ecpcafinfpjgabomoamkhkgnpgpmdmeo\">readerplus Toolbar button</a> page.</span>                                    <br>                                    <span>To remove the button, right click him and choose Disable.</span>"
    },
    "removeads": 
    {
        "linkf": "Link filter",
        "imgf": "Image filter",
        "ifrf": "iframe filter"
    },
    "preview": 
    {
        "onicon": "Show integrated preview when click on icon right after the title (if not checked, on title)",
        "locked": "Feature 'Preview' always actived by default"
    },
    "fitheight": 
    {
        "locked": "Feature 'Fit height' always actived by default"
    },
    "favicons": 
    {
        "sidebaronly": "Show favicons in sidebar only",
        "custom": "Enter your custom favicons :",
        "add": "Add",
        "tip": "Tip: You could add it easily using the contextual menu \"Get favicon\" of the left side bar",
        "manual": "Manual favicons for all sites (not recommended ; slower)",
        "parsing": "This will try to detect favicon by parsing each homepage"
    },
    "getpart": 
    {
        "lr": "Link Regex",
        "sr": "Search regex",
        "to": "Replace"
    },
    "pack": 
    {
        "mini": "Package Mini",
        "ludoo": "Package LudoO",
        "full": "Package Full",
        "reset": "Package Reset"
    },
    "extshortcuts": 
    {
        "custom": "Your custom Shortcuts",
        "official": "Google Reader official shortcuts"
    },
    "thanks": 
    {
        "donators": "Thanks to donators to contribute to this project",
        "authors": "Thanks to authors of original scripts and skins (Greasemonkey and Stylish)"
    }
};
