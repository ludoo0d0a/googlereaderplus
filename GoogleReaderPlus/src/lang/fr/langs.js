/**
 * ReaderPlus
 * Translation
 *
 * **************************
 * fr : Francais
 * **************************
 *
 * Version : 1.8
 * Date : 03-17-2011
 * @author Valente
 */
var locale = 'fr';
namespace('GRP.langs.' + locale);
GRP.langs[locale].texts = {
    'version': "version",
    closeentry: {
        text: 'Fermer cet élément',
        keyword: 'Fermer'
    },
    column: {
        text: 'Affichage multi-colonnes (type journal)',
        keyword: 'Colonnes',
        summary: 'Ajouter/Editer',
        desc: 'Gérer les colonnes'
    },
	sharemsg:{
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
    facebook: {
        text: 'Partager cette nouvelle sur Facebook',
        keyword: 'Facebook'
    },
    twitter: {
        text: 'Partager cette nouvelle sur Twitter',
        keyword: 'Twitter',
        plslogin: 'Merci de vous connecter à Twitter'
    },
    readit: {
        password: 'Mot de passe, si vous en avez un:',
        wronglogin: 'Mauvais mot de passe ou nom d\'utilisateur, merci de vérifier!!',
        nologin: 'Cette fonctionnalité a besoin d\'un nom d\'utilisateur, merci de le renseigner dans la page des préférences!!',
        error: 'Ce service a rencontré une erreur. merci de réessayer plus tard.',
        badrequest: 'Mauvaise requête. Il manque surement un paramètre comme l\'url.',
        saving: 'Sauvegarde',
        shortcut_readitlater: 'Lire plus tard avec Instapaper'
    },
    instapaper: {
        text: 'Lire plus tard avec Instapaper',
        keyword: 'Instapaper',
        plslogin: 'Merci de vous connecter Instapaper',
        login: 'Email ou nom d\'utilisateur:'
    },
    readitlater: {
        text: 'Lire plus tard avec ReadItLater',
        keyword: 'ReadItLater',
        plslogin: 'Merci de vous connecter à ReadItLater',
        rateexceeded: 'Trafic dépassé, merci d\'attendre avant de recommencer',
        maintenance: 'Maintenance en cours, revenz plus tard !'
    },
    favicons: {
        preferences: 'Préférences',
        getfavicon: 'Obtenir l\'icône de ce site',
        notfoundicon: 'Impossible d\'obtenir l\'icône de  "{0}"',
        summary: 'Ajouter/Editer',
        desc: 'Gérer les icônes'
    },
    filter: {
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
        close: 'Fermer',
        edit: 'Editer',
        remove: 'Effacer',
		//v2
		filter: 'Filtrer',
	    save: 'Sauver & appliquer',
	    close: 'Fermer le menu',
	    searchbody: 'Chercher dans tout le texte',
	    hide_duplicates: 'Cacher les doublons',
	    hide_excludes: 'Cacher les exclusions',
	    prefer_highlight: 'Préférer les surlignages',
	    highlights: 'Surlignages',
	    duplicates: 'Doublons',
	    excludes: 'Exclusions',
	    content: 'Contenu',
	    addentry: 'Ajouter',
	    add_excludes: 'Exclure',
	    add_highlights: 'Surligner'
    },
    fitheight: {
        text: 'Adapter la hauteur',
        keyword: 'Adapter la hauteur'
    },
    jump: {
        textbottom: 'Aller en bas',
        texttop: 'Aller en haut',
        keywordtop: 'haut'
    },
    openbackground: {
        text: 'Ouvrir en arriére-plan',
        keyword: 'Ouvrir'
    },
    preview: {
        text: 'Aperçu de la nouvelle',
        title: 'Aperçu de la nouvelle',
        opennewtab: 'Ouvrir dans une nouvelle fenêtre',
        keyword: 'Aperçu',
        overlay_next: 'Suivant',
        overlay_previous: 'Précédent',
        overlay_close: 'Fermer',
        overlay_category: 'Catégorie'
    },
    readbymouse: {
        middleclick: 'Clic bouton du milieu',
        openintab: 'Ouvrir dans un nouvel onglet',
        openinbacktab: 'Ouvrir dans un nouvel onglet en arriéèe plan',
        shares: 'Partage',
        stars: 'suivi',
        tag: 'Tag',
        addtag: 'Ajouter un tag',
        on: 'ReadByMouse activé',
        off: 'ReadByMouse arrêté'
    },
    replacer: {
        nomatch: 'Pas de résultat.',
        loading: 'Chargement...'
    },
    lightbox: {
        text: 'Lumière sur les médias',
        keyword: 'Light'
    },
    ig: {
        menu_prefs: 'Reader+ préférences',
        menu_theme: 'Reader+ thème',
        menu_randomtheme: 'Changer le thème :'
    },
    menu: {
        label: 'Extra',
        showallfolders: 'Show all folders'
    },
	actions:{
		text:'Icônes actions'
	},
	portal:{
		readmore: 'En lire plus (Ctrl+click pour le menu)'
	}
};
GRP.langs[locale].prefs = {
    global: {
        title: "Reader Plus",
        "val-save": "Sauver",
        alreadyexist: "Cet élément existe déjà!",
        snew: 'Nouveau!',
        supdated: 'Mis à jour!',
        expandall: 'Tous'
    },
    theme: {
        noborder: "Retirer les bords des articles pour en afficher un maximum sur une page",
        mytheme: 'Utilisez <a href="http://code.google.com/p/googlereaderplus/wiki/Backgrounds" target="blank">une image de fond </a> et des couleurs personnaliséees avec le thème "MyTheme" (<a href="http://code.google.com/p/googlereaderplus/wiki/Themes" target="blank">Aperçu</a>)',
        /*url: 'URL de l\'image',*/
        color: 'Couleur du text',
        bg: 'Couleur du fond du texte',
        /*repeat: 'Tiled Picture ',*/
        externaltheme: 'Gmail theme',
        imgrbg: 'Image répétée',
        imgsbg: 'Image',
        imgrh: 'Entête répété',
        imgh: 'Entête',
        imghr: 'Entête droit',
        imghl: 'Entête gauche',
        imgrf: 'Pied de page répété',
        imgf: 'Pied de page',
        imgfr: 'Pied de page droit',
        imgfl: 'Pied de page gauche'
    },
    ig: {
        warning: 'Some themes could be displayed incorrectly ; this is a Beta feature!',
        skin_name: 'iGoogle theme name',
        skin_url: 'iGoogle theme URL',
        debug: 'Debug mode (For debugging only)',
        randomtime: 'Dynamic theme toggles randomly instead time control',
        userandomthemes: 'Theme is automatically switched randomly',
        randomthemes: 'Toggle theme every (min.)',
        add: 'Add it now',
        next: 'Next',
        previous: 'Previous',
        random: 'Random',
        search: 'Search themes'
    },
    about: {
        thanks1: '<td><span class="top_right"><img src="images/48.png"></span><h1>Merci...</h1>' +
        '<p>... d\'avoir installé (ou mis à jour) la dernière version de <strong>Reader Plus</strong>!</p>' +
        '<p>Vérifiez bien que vous avez configuré votre extension dans la <a href="preferences.html" title="Aller à la page des préférences"><strong>page des préférences</strong></a>.</p>' +
        '<p><a href="https://chrome.google.com/webstore/detail/hhcknjkmaaeinhdjgimjnophgpbdgfmg" target="_blank" title="Visit extension homepage"><strong>Visitez la galerie des Extensions Google Chrome!</strong></a></p>' +
        '<p><a href="http://www.twitter.com/ludoo0d0a"><img width=\"61\" height=\"23\" src=\"http://twitter-badges.s3.amazonaws.com/twitter-a.png\" alt=\"Suivez ludoo0d0a sur Twitter\"></a></p>' +
        '<p></p></td>',
        thanks2: '<td><p>Si vous appréciez cette extension ou que vous avez des idées pour de nouvelles fonctionnalités, n\'hésitez pas à m\'en parler.</p>' +
        '<p>Vous pouvez également me faire un don, de sorte que je puisse m\'acheter une cargaison de café pour tenir le coup pour écrire le code :)</p>' +
        '<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&amp;business=FK9P8MNY9MGZL&amp;lc=FR&amp;item_name=googlereaderplus%20project&amp;currency_code=EUR&amp;bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted"><span><img alt="Donate" border="0" src="https://www.paypal.com/fr_FR/i/btn/btn_donate_SM.gif" width="108" height="21"></span></a></td>',
        //whatsnew: '<td> <h2>Quoi de neuf!!</h2> <ul> <li>Synchronisation des préférences dans Google Documents (1 seul profil pour plusieurs ordinateurs)</li><li>Essayer les nouveaux thèmes</li> <li>Raccourci clavier pour activer/désactiver le thème courant(Alt X)</li> <li>L\'espagnol est maintenant supporté</li> <li>Corrections de bugs</li> </ul> <p class="center"><img src="http://googlereaderplus.googlecode.com/svn/trunk/GoogleReaderPlus/screenshots/button/popup1.png"/></p><h2>Et toujours ...</h2> <ul> <li>Experience Cloud : Utilisé une configuration partagée par la communauté pour les favicons et le replacement</li> <li>Apercu des derniers articles non lus dans le bouton de la barre.</li> <li>Utiliser une image personnalisée ave le nouveau thème configurable "MyTheme"</li> <li>ou choisissez un thème aléatoire parmi les thèmes <a href="http://www.google.com/ig/directory?type=themes" target="blank">iGoogle</a></li> <li>Aperçu plein ecran façon "lightbox"</li> <li>Partager vos lectures avec <a href="http://www.readitlater.com" target="blank">ReadItLater</a></li> <li>Le panneau des actions comme fenêtre volante (onglet Général)</li> <li>Traduction des articles</li> </ul> </td>',
        nopopup: '<p>Si vous ne voulez plus être averties des mises à jour, cocher l\'option "Plus de popup lors des mises à jour" dans <a href="preferences.html#general">la section Générale</a>.</p>'
    },
    link: {
        reader: "<span>Google Reader</span>Mon lecteur RSS",
        issues: "<span>Support</span>Un bug ou une idée ?",
        download: "<span>Télécharger</span>La galerie Google",
        about: "<span>A propos</span>A propos, remerciements,...",
        site: "<span>Site web</span>Mon site web",
        twitter: "<span><img width=\"61\" height=\"23\" src=\"http://twitter-badges.s3.amazonaws.com/twitter-a.png\" alt=\"Suivez ludoo0d0a sur Twitter\"></span>Suivez les mises à jours",
        donate: '<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&amp;business=FK9P8MNY9MGZL&amp;lc=FR&amp;item_name=googlereaderplus%20project&amp;currency_code=EUR&amp;bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted"><span><img alt="Donate" border="0" src="https://www.paypal.com/fr_FR/i/btn/btn_donate_SM.gif" width="108" height="21"></span>Offrez moi un café!</a>',
        translate: '<span>Traduction</span>Aidez moi à traduire</a>'
    },
    column: {
        count: "Nombre de colonnes",
        locked: "Option 'Colonne' toujours activée",
        pagebreak: "Ajouter des sauts de page dans les articles longs pour les lire page par page comme un journal.",
		miniparas: "Nombre minimum de paragraphes avant de couper en colonnes",
        "entersite": "Saisissez l'adresse de votre site"
    },
    twitter: {
        shortener: "Urls courtes",
        shortener_bitly: "Configuration pour BitLy (optionnel):",
        shortener_login: "Utilisateur",
        shortener_apikey: "Clé (ApiKey)",
        shortener_pwd: "Mot de passe"
    },
    instapaper: {
        auth: "Authentification de <a href='http://www.instapaper.com' target='blank'>Instapaper</a> (optionnel):",
        username: "Utilisateur:",
        password: "Mot de passe:"
    },
    readitlater: {
        auth: "<a href='http://readitlaterlist.com/signup' target='blank'>Authentification</a> pour <a href='http://readitlaterlist.com' target='blank'>ReadItLater</a> (obligatoire):",
        username: "Utilisateur:",
        password: "Mot de passe:"
    },
    colorful: {
        tree: "Afficher les titres en couleurs dans l'arbre des sites à gauche",
		usebasecolor: "Utiliser les couleurs de base suivantes :",
		background: "Couleur arrière-plan",
		color:"Couleur des textes"
    },
    general: {
        counter: "Afficher le compteur dans la barre d'outil",
counterinterval: "Refraîchir le compteur toutes les (min)",
        pageicon: "Activer l'icône dans la barre d'adresse (permet d'afficher un menu)",
        stats: 'Autoriser la collecte de données statistiques anonyme (pour un meilleur support)',
        bottomup: "Placer la barre 'Précédent/Suivant' en haut de l'écran",
        opendirect: "Cliquer sur l'icône pour ouvrir GoogleReader",
        secure: "Forcer l'utilisation du protocole sécurisé (https)",
        topcurrent: "Forcer l'affichage de l'article courant toujours en haut de l'écran",
        floatactions: "Menu 'actions' est affiché dans une fenêtre volante",
        noupdatepopup: "Plus de popup lors des mises à jour",
        icontoolbar_add: "Pour ajouter un bouton avec icône dans la barre d'outil, veuillez <a href=\"https://chrome.google.com/webstore/detail/ecpcafinfpjgabomoamkhkgnpgpmdmeo\">télécharger et installer le bouton</a>.",
        icontoolbar_text: "<span>Afin de le rendre optionnel, nous fournissons le bouton sous forme d'une extension indépendante,</span><br><span>à installé en plus de ReaderPlus.</span><br><span>Pour ajouter le bouton, cliquer <b>Installer</b> sur la page <a href=\"https://chrome.google.com/webstore/detail/ecpcafinfpjgabomoamkhkgnpgpmdmeo\">bouton pour ReaderPlus</a>.</span><br><span>Pour retirer le bouton, un clic droit et choisissez 'Désactiver'.</span>",
        importexport_text: "Vous pouvez sauver vos préférences avec la fonction 'export' et les rechqrger plus tard avec 'import', mais assurez vous de la <a href='http://jsonformatter.curiousconcept.com/' target='blank'>validité du format JSON</a>:",
        confirmimport: "Etes-vous sur de vouloir importer cette configuration?\nLa configuration actuelle sera PERDUE",
confirmsyncload: "Etes-vous sur de vouloir importer cette configuration depuis votre compte Google?\nLa configuration actuelle sera PERDUE!",
prefsimportedok: 'Préférences importé avec succès!',
prefsimportfailed: 'Echec de l\'import!',
prefsimportnull: 'Aucune préférence enregistrée!',
syncprefs_text: 'Charger/Sauver avec votre compte Google',
prefssavedok: 'Préférences sauvé avec succès!',
prefssavedfailed: 'Echec de la sauvegarde!',
        text_layout: 'Mise en page',
        text_private: 'Données privées et mise à jour',
        text_toolbaricon: "Icône de la barre d'outil",
        text_pageicon: "Icône de la barre d'adresse",
        text_export: 'Export/import',
currdir: "Surligner le répertoire de l'élément sélectionné",
icons: 'Icône seulement pour les boutons de la barre action (sauf pour les radio boutons)'
    },
limit: {
slidewindow: "Slidewindow - Limiter le nombre d'éléments",
mini: "Nombre minimum d'éléments",
maxi: "Nombre maximum d'éléments"
},
prefetch: {
first: "Nombre initial d'éléments chargés dans la vue Texte complet",
next: "Nombre d'éléments chargés après un scroll dans la vue Texte complet",
list: "Nombre initial d'éléments chargés dans la vue Liste."
},
nested: {
separator: "Separateur pour des nieaux supplémentaires (exemple: Sports:Footbal)."
},
    removeads: {
        links: "Liens:",
        images: "Images:",
        iframes: "Iframes:"
    },
    preview: {
        onicon: "Utiliser un icone apres le titre pour afficher l'apercu (si non coché, l'apercu apparait lors du clic sur le titre)",
        locked: "Option 'Apercu' toujours activée",
        overlay: 'Aperçu plein écran (Lightbox)'
    },
    fitheight: {
        locked: "Option 'Adapter hauteur' toujours activée"
    },
    filter: {
        searchbody: "Recherche dans le titre et le corps du texte",
        highlights: 'Liste des exclusions (une par ligne)',
        excludes: 'Liste des  surlignages (un par ligne)'
    },
    favicons: {
        providerpageicons: 'Utiliser le fournisseur d\'icônes <a href="http://pageicons.appspot.com" target="blank">PageIcons</a> pour afficher correctement toutes les icônes des sites (Recommandé)',
        sidebaronly: "Afficher favicons in sidebar only",
        cloud: 'Utiliser les favicons de la communauté grâce la base en ligne <a href="http://wedata.net/databases/Favicons/items" target="blank">wedata/Favicons</a>',
        custom: "Saisissez vos propres favicons :",
        add: "Ajouter",
        tip: "Conseil: Vous pouvez également utiliser le menu contextuel \"Obtenir l'icône de ce site\" sur chaque site dans l'arbre de gauche",
        manual: "Favicons manuels pour tous les sites (non conseillé car relativement lent)",
        parsing: "Les icône sont obtenues en parcourant la page de chaque site.",
        "entersite": "Saisissez l'adresse de votre site",
        "prompticon": "Saisissez l'adresse de votre icône (laissez vide pour l'obtenir automatiquement):"
    },
    replacer: {
        intro: '<a href="http://code.google.com/p/googlereaderplus/wiki/ReplacerHowto" target="blank">Aide sur l\'utilisation de replacer</a>',
        cloud: 'Utiliser les expressions de la base en ligne <a href="http://wedata.net/databases/LDRFullFeed/items" target="blank">wedata/LDRFullFeed</a>  et <a href="http://wedata.net/databases/Replacer/items" target="blank">wedata/Replacer</a>',
        link: "Sites",
        from: "Rechercher regex/xpath/css",
        to: "Remplacer par"
    },
    lightbox: {
        locked: "Option 'Adapter hauteur' toujours activée, sauf pour :"
    },
    relook: {
        css: "Feuille de style CSS",
        resize: "Utiliser l'évènement 'resize' pour adapter le plein écran"
    },
    pack: {
        mini: "<span>Paquetage Mini</span>Le minimum nécessaire",
        ludoo: "<span>Paquetage LudoO</span>Les meilleurs options en un clic",
        full: "<span>Paquetage Complet</span>Toutes les options activées",
        reset: "<span>Paquetage Reset</span>Remise à zéro de votre configuration",
        confirmdel: "Cette opération va EFFACER et réinitialiser vos préférences. Etes-vous sûr ?"
    },
    extshortcuts: {
        custom: "Vos propres raccourcis clavier",
        official: "Les raccourcis clavier officiels de Google Reader",
        alreadyusedprefs: "Déjà utilisé dans vos préférences!",
        alreadyusedgoogle: "Déjà utilisé par Google!"
    },
    thanks: {
        donators: "Merci aux généreux donateurs pour leurs contributions sur ce projet",
        translators: "Merci aux courageux traducteurs pour leur superbe travail",
        authors: "Merci aux auteurs des scripts et skins originaux (Greasemonkey et Stylish)"
    }
};
