/**
 * ReaderPlus
 * Translation
 *
 * **************************
 * fr : Francais
 * **************************
 *
 * Version : 1.1
 * Date : 03-30-2010
 * @author Valente
 */
var locale = 'fr';
namespace('GRP.langs.'+locale);
GRP.langs[locale].texts = 
{
    'version': "version",
    closeentry: 
    {
        text: 'Fermer cet élément',
        keyword: 'Fermer'
    },
    colorful: 
    {
    },
    column: 
    {
        text: 'Affichage multi-colonnes (type journal)',
        keyword: 'Colonnes',
		summary: 'Ajouter/Editer',
        desc: 'Gérer les colonnes'
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
        wronglogin: 'Mauvais mot de passe ou nom d\'utilisateur, merci de vérifier!!',
		nologin: 'Instapaper a besoin d\'un nom d\'utilisateur, merci de le renseigner dans la page des préférences!!',
        error: 'Ce service a rencontré une erreur. merci de réessayer plus tard.',
        badrequest: 'Mauvaise requête. Il manque surement un paramètre comme l\'url.',
        saving: 'Sauvegarde',
		shortcut_readitlater: 'Lire plus tard avec Instapaper'
    },
    favicons: 
    {
        preferences: 'Préférences',
        getfavicon: 'Obtenir l\'icône de ce site',
        notfoundicon: 'Impossible d\'obtenir l\'icône de  "{0}"',
		summary: 'Ajouter/Editer',
        desc: 'Gérer les icônes'
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
        close: 'Fermer',
		edit:'Editer',
		remove:'Effacer'
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
        openinbacktab: 'Ouvrir dans un nouvel onglet en arriéèe plan',
		shares: 'Partage',
        stars: 'suivi',
        tag: 'Tag',
        addtag: 'Ajouter un tag',
        on: 'ReadByMouse activé',
        off: 'ReadByMouse arrêté'
    },
	replacer:{
		nomatch:'Pas de résultat.',
		loading:'Chargement...'
	},
	lightbox:{
        text: 'Lumière sur les médias',
        keyword: 'Light'
    }
};

GRP.langs[locale].prefs = 
{
    global:
    {
        title:"Reader Plus",
		"val-save":"Sauver",
		alreadyexist:"Cet élément existe déjà!"
    },
	theme:
    {
        noborder:"Retirer les bords des articles pour en afficher un maximum sur une page"
    },
	"about":{
		thanks1:'<td><span class="top_right"><img src="images/48.png"></span><h1>Merci...</h1>'+
'<p>... d\'avoir installé (ou mis à jour) la dernière version de <strong>Reader Plus</strong>!</p>'+
'<p>Vérifiez bien que vous avez configuré votre extension dans la <a href="preferences.html" title="Aller à la page des préférences"><strong>page des préférences</strong></a>.</p>'+
'<p><a href="https://chrome.google.com/extensions/detail/hhcknjkmaaeinhdjgimjnophgpbdgfmg" target="_blank" title="Visit extension homepage"><strong>Visitez la galerie des Extensions Google Chrome!</strong></a></p>'+
'<p><a href="http://www.twitter.com/ludoo0d0a"><img width=\"61\" height=\"23\" src=\"http://twitter-badges.s3.amazonaws.com/twitter-a.png\" alt=\"Suivez ludoo0d0a sur Twitter\"></a></p>'+
'<p></p></td>',
		thanks2:'<td><p>Si vous appréciez cette extension ou que vous avez des idées pour de nouvelles fonctionnalités, n\'hésitez pas à m\'en parler.</p>'+
		'<p>Vous pouvez également me faire un don, de sorte que je puisse m\'acheter une cargaison de café pour tenir le coup pour écrire le code :)</p>'+
        '<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&amp;business=FK9P8MNY9MGZL&amp;lc=FR&amp;item_name=googlereaderplus%20project&amp;currency_code=EUR&amp;bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted"><span><img alt="Donate" border="0" src="https://www.paypal.com/fr_FR/i/btn/btn_donate_SM.gif" width="108" height="21"></span></a></td>'
	},
    link:
    {
        reader:"<span>Google Reader</span>Mon lecteur RSS",
        issues:"<span>Support</span>Un bug ou une idée ?",
        download:"<span>Télécharger</span>La galerie Google",
        about:"<span>A propos</span>A propos, remerciements,...",
        site:"<span>Site web</span>Mon site web",
        twitter:"<span><img width=\"61\" height=\"23\" src=\"http://twitter-badges.s3.amazonaws.com/twitter-a.png\" alt=\"Suivez ludoo0d0a sur Twitter\"></span>Suivez les mises à jours",
		donate:'<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&amp;business=FK9P8MNY9MGZL&amp;lc=FR&amp;item_name=googlereaderplus%20project&amp;currency_code=EUR&amp;bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted"><span><img alt="Donate" border="0" src="https://www.paypal.com/fr_FR/i/btn/btn_donate_SM.gif" width="108" height="21"></span>Offrez moi un café!</a>',
		translate:'<span>Traduction</span>Aidez moi à traduire</a>'
    },
    column:
    {
        count:"Nombre de colonnes",
        locked:"Option 'Colonne' toujours activée",
        pagebreak:"Ajouter des sauts de page dans les articles longs pour les lire page par page comme un journal.",
		"entersite":"Saisissez l'adresse de votre site"
    },
    twitter:
    {
        shortener:"Urls courtes",
        shortener_bitly:"Configuration pour BitLy (optionnel):",
        shortener_login:"Utilisateur",
        shortener_apikey:"Clé (ApiKey)",
        shortener_pwd:"Mot de passe"
    },
    instapaper:
    {
        auth:"Authentification de Instapaper (optionnel):",
		username:"Username:",
		password:"Password:"
    },
    colorful:
    {
        tree:"Afficher les titres en couleurs dans l'arbre des sites à gauche"
    },
    general:
    {
        counter:"Afficher le compteur dans la barre d'outil",
        opendirect:"Cliquer sur l'icône pour ouvrir GoogleReader",
		secure:"Forcer l'utilisiation du protocole sécurisé (https)",
        icontoolbar_add:"Pour ajouter un bouton avec icône dans la barre d'outil, veuillez <a href=\"https://chrome.google.com/extensions/detail/ecpcafinfpjgabomoamkhkgnpgpmdmeo\">télécharger et installer le bouton</a>.",
        icontoolbar_text:"<span>Afin de le rendre optionnel, nous fournissons le bouton sous forme d'une extension indépendante,</span><br><span>à installé en plus de ReaderPlus.</span><br><span>Pour ajouter le bouton, cliquer <b>Installer</b> sur la page <a href=\"https://chrome.google.com/extensions/detail/ecpcafinfpjgabomoamkhkgnpgpmdmeo\">bouton pour ReaderPlus</a>.</span><br><span>Pour retirer le bouton, un clic droit et choisissez 'Désactiver'.</span>",
		importexport_text:"You can now save your preferences using 'export' and reload it later using 'import':",
		confirmimport:"Etes-vous sur de vouloir importer cette configuration?\nLa configuration actuelle sera perdue"
    },
    removeads:
    {
        links:"Liens:",
        images:"Images:",
        iframes:"Iframes:"
    },
    preview:
    {
        onicon:"Utiliser un icone apres le titre pour afficher l'apercu (si non coché, l'apercu apparait lors du clic sur le titre)",
        locked:"Option 'Apercu' toujours activée"
    },
    fitheight:
    {
        locked:"Option 'Adapter hauteur' toujours activée"
    },
    favicons:
    {
        providerpageicons:'Utiliser le fournisseur d\'icônes <a href="http://pageicons.appspot.com" target="blank">PageIcons</a> pour afficher correctement toutes les icônes des sites (Recommandé)',
		sidebaronly:"Afficher favicons in sidebar only",
        custom:"Saisissez vos propres favicons :",
        add:"Ajouter",
        tip:"Conseil: Vous pouvez également utiliser le menu contextuel \"Obtenir l'icône de ce site\" sur chaque site dans l'arbre de gauche",
        manual:"Favicons manuels pour tous les sites (non conseillé car relativement lent)",
        parsing:"Les icône sont obtenues en parcourant la page de chaque site.",
        "entersite":"Saisissez l'adresse de votre site",
		"prompticon":"Saisissez l'adresse de votre icône (laissez vide pour l'obtenir automatiquement):"
    },
    replacer:
    {
        intro: 'Vous pouvez utiliser le bookmarklet <a href="http://karmatics.com/aardvark/bookmarklet.html" target="blank">Aardvark</a> pour identifier un xpath au lieu d\'une expression régulière (Prefixer alors par "xpath:")',
		title:"Titre",
		link:"Sites",
        from:"Rechercher",
        to:"Remplacer par"
   },
	lightbox:
    {
		locked:"Option 'Adapter hauteur' toujours activée, sauf pour :"
    },
	relook:
    {
        css:"Feuille de style CSS",
        resize:"Utiliser l'évènement 'resize' pour adapter le plein écran"
    },
    pack:
    {
        mini:"<span>Paquetage Mini</span>Le minimum nécessaire",
        ludoo:"<span>Paquetage LudoO</span>Les meilleurs options en un clic",
        full:"<span>Paquetage Complet</span>Toutes les options activées",
        reset:"<span>Paquetage Reset</span>Remise à zéro de votre configuration",
		confirmdel:"Cette opération va EFFACER et réinitialiser vos préférences. Etes-vous sûr ?"
    },
    extshortcuts:
    {
        custom:"Vos propres raccourcis clavier",
        official:"Les raccourcis clavier officiels de Google Reader",
		alreadyusedprefs:"Déjà utilisé dans vos préférences!",
		alreadyusedgoogle:"Déjà utilisé par Google!"
    },
    thanks:
    {
        donators:"Merci aux généreux donateurs pour leurs contributions sur ce projet",
		translators:"Merci aux courageux traducteurs pour leur superbe travail",
        authors:"Merci aux auteurs des scripts et skins originaux (Greasemonkey et Stylish)"
    }
};
