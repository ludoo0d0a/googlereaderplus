/**
 * ReaderPlus
 * Translation
 *
 * **************************
 * fr : Francais
 * **************************
 *
 * Version : 2.0
 * Date : 11-03-2011
 * @author Valente
 */
var locale = 'fr';
namespace('GRP.langs.' + locale);
GRP.langs[locale].texts = {
	'version' : "version",
	splash:{
		on: 'ReaderPlus est activé'
	},
	closeentry : {
		text : 'Fermer cet élément',
		keyword : 'Fermer'
	},
	column : {
		text : 'Affichage multi-colonnes (type journal)',
		keyword : 'Colonnes',
		summary : 'Ajouter/Editer',
		desc : 'Gérer les colonnes'
	},
	sharemsg : {
		toolong : "Ce message est trop long!",
		notetoolong : "<b>Note attachée à la nouvelle:</b> (optionel, reste {0} caractères)",
		notemax : "<b>Note attachée à la nouvelle:</b> (optionel, 140 caractères maximum)",
		text_title : 'Titre',
		text_tag : 'Tag',
		text_url : 'Adresse',
		text_desc : 'Description',
		text_send : 'Envoyer',
		text_count : 'Compter',
		text_cancel : 'Annuler',
		text_shortener : 'Short URL',
		shortfailed : "Désolé, une erreur est survenue pour obtenir une url courte!\n\r{0}"
	},
	facebook : {
		text : 'Partager sur Facebook',
		keyword : 'Facebook'
	},
	twitter : {
		text : 'Partager sur Twitter',
		keyword : 'Twitter',
		plslogin : 'Merci de vous connecter à Twitter'
	},
	weibo : {
		text : 'Partager sur Weibo',
		keyword : 'Weibo',
		plslogin : 'Merci de vous connecter à Weibo'
	},
	reddit : {
		text : 'Partager sur Reddit',
		keyword : 'Reddit',
		plslogin : 'Merci de vous connecter à Reddit'
	},
	tumblr : {
		text : 'Partager avec Tumblr',
		keyword : 'Tumblr',
		plslogin : 'Merci de vous connecter à Tumblr'
	},
	plusone : {
		text : 'Partager sur Google+',
		keyword : 'Google+',
		plslogin : 'Merci de vous connecter à Google+'
	},
	identi : {
		text : 'Partager avec Identi',
		keyword : 'Identi',
		plslogin : 'Merci de vous connecter à Identi.ca',
		nologin : 'Cette fonctionnalité a besoin d\'un nom d\'utilisateur, merci de le renseigner dans la page des préférences!!'
	},
	jaiku : {
		text : 'Partager avec Jaiku',
		keyword : 'Jaiku',
		plslogin : 'Merci de vous connecter à Jaiku'
	},
	readit : {
		password : 'Mot de passe, si vous en avez un:',
		wronglogin : 'Mauvais mot de passe ou nom d\'utilisateur, merci de vérifier!!',
		nologin : 'Cette fonctionnalité a besoin d\'un nom d\'utilisateur, merci de le renseigner dans la page des préférences!!',
		error : 'Ce service a rencontré une erreur. merci de réessayer plus tard.',
		badrequest : 'Mauvaise requête. Il manque surement un paramètre comme l\'url.',
		forbidden : 'Vous n\'êtes pas autorisé à effectuer cette action.',
	    notfound : 'La ressource demandée n\'existe pas.', 
	    conflict : 'La resource que vous essayé de créer existe déjà.',
		saving : 'Sauvegarde',
		shortcut_readitlater : 'Lire plus tard avec Instapaper'
	},
	diigo : {
		keyword : 'Diigo',
		text : 'Partager avec Diigo',
		badrequest : 'Des paramètres sont invalides ou la limite maximale a été atteinte.',
		notauthorized : 'Vous n\'êtes pas autorisé.',
		forbidden : 'Requête refusé par manque de  droits.',
		notfound : 'Mauvaise URI ou la ressource n\'existe pas.',
		badgateway : 'Diigo est en maintenance.',
		unavailable : 'The Diigo servers are too busy to server your request. Please try again later.'
	},
	gmarks : {
		keyword : 'Google Bookmarks',
		wronglogin : 'Erreur avec l\'authentication!! mauvais login/mot de passe?',
		nologin : 'Erreur lors de l\'authentification!! pas de login?',
		text : 'Partager avec Google Bookmarks'
	},
	instapaper : {
		text : 'Lire plus tard avec Instapaper',
		keyword : 'Instapaper',
		plslogin : 'Merci de vous connecter à Instapaper',
		login : 'Email ou nom d\'utilisateur:'
	},
	readitlater : {
		text : 'Lire plus tard avec ReadItLater',
		keyword : 'ReadItLater',
		plslogin : 'Merci de vous connecter à ReadItLater',
		rateexceeded : 'Trafic dépassé, merci d\'attendre avant de recommencer',
		maintenance : 'Maintenance en cours, revenez plus tard !'
	},
	readabilitylater : {
		text : 'Lire plus tard avec Readability',
		keyword : 'ReadabilityLater',
		plslogin : 'Merci de vous connecter à Readability'
	},
	radbox : {
		text : 'Lire plus tard avec Radbox',
		keyword : 'Radbox',
		nologin : 'Cette fonctionnalité a besoin d\'un nom d\'utilisateur, merci de le renseigner dans la page des préférences!!',
		novideo : 'Aucune vidéo dans cette page'
	},
	addthis : {
		text : 'Partager avec AddThis',
		keyword : 'AddThis'
	},
	blogger : {
		text : 'Partager avec Blogger',
		keyword : 'Blogger'
	},
	pinboard : {
		text : 'Partager avec Pinboard',
		keyword : 'Pinboard'
	},
	favicons : {
		preferences : 'Préférences',
		getfavicon : 'Obtenir l\'icône de ce site',
		notfoundicon : 'Impossible d\'obtenir l\'icône de  "{0}"',
		summary : 'Ajouter/Editer',
		desc : 'Gérer les icônes'
	},
	filter : {
		settings : 'Réglages du filtre',
		highlight : 'Surligner',
		exclude : 'Exclure',
		hideduplicates : 'Cacher les doublons',
		hideexcludes : 'Cacher les exclusions',
		preferehighlights : 'Préférer les surlignages',
		update : 'Mise à jour',
		quickadd : 'Ajout rapide',
		add : 'Ajouter',
		edit : 'Editer',
		remove : 'Effacer',
		//v2
		filter : 'Filtrer',
		save : 'Sauver & appliquer',
		close : 'Fermer le menu',
		searchbody : 'Chercher dans tout le texte',
		detect_duplicates : 'Détecter les doublons',
		hide_duplicates : 'Cacher les doublons',
		hide_excludes : 'Cacher les exclusions',
		prefer_highlight : 'Préférer les surlignages',
		live : 'Live',
		highlights : 'Surlignages',
		duplicates : 'Doublons',
		excludes : 'Exclusions',
		content : 'Contenu',
		addentry : 'Ajouter',
		add_excludes : 'Exclure',
		add_highlights : 'Surligner',
		button : 'Bouton \'filtrer\' sur chaque article',
		gettitle : 'Obtenir le titre',
		getwords : 'Obtenir les mots',
		getfrom : 'Ajouter un flux',
		getauthor : 'Ajouter l\'auteur'
	},
	rank : {
		filter_rank : 'Popularité',
		filter_ad : 'Powered by PostRank',
		rank_all : 'Tous',
		rank_good : 'Bien >2.7',
		rank_great : 'Bon >5.5',
		rank_best : 'Connu >7.6',
		rank_famous : 'Célèbre >9'
	},
	fitheight : {
		text : 'Adapter la hauteur',
		keyword : 'Adapter la hauteur'
	},
	jump : {
		text : 'Aller',
		textbottom : 'Aller en bas',
		texttop : 'Aller en haut',
		keywordtop : 'haut'
	},
	openbackground : {
		text : 'Ouvrir en arriére-plan',
		keyword : 'Ouvrir'
	},
	preview : {
		text : 'Aperçu de la nouvelle',
		title : 'Aperçu de la nouvelle',
		opennewtab : 'Ouvrir dans une nouvelle fenêtre',
		keyword : 'Aperçu',
		overlay_next : 'Suivant',
		overlay_previous : 'Précédent',
		overlay_close : 'Fermer',
		overlay_category : 'Catégorie',
		overlay_loading : 'Chargement en cours...'
	},
	readability : {
		text : 'Lire l\'article en entier',
		title : 'Lire tout l\'article',
		keyword : 'Lire maintenant'
	},
	readbymouse : {
		readbymouse : 'Lecture souris',
		middleclick : ' Sur clic milieu: ',
		openintab : 'Ouvrir dans un nouvel onglet',
		openinbacktab : 'Ouvrir dans un nouvel onglet en arrière plan',
		shares : 'Partage',
		stars : 'Suivi',
		tag : 'Labels séparés par des virgules:',
		addtag : 'Ajouter un tag'
	},
	replacer : {
		nomatch : 'Pas de résultat.',
		loading : 'Chargement...'
	},
	lightbox : {
		text : 'Lumière sur les médias',
		keyword : 'Light'
	},
	ig : {
		menu_prefs : 'Reader+ préférences',
		menu_theme : 'Reader+ thème',
		menu_randomtheme : 'Changer le thème :'
	},
	menu : {
		label : 'Extra',
		showallfolders : 'Show all folders'
	},
	actions : {
		text : 'Icônes actions'
	},
	portal : {
		readmore : 'En lire plus (Ctrl+click pour le menu)'
	},
	stars : {
		text : 'Etoiles multiples',
		keyword : 'Etoiles'
	},
	translate : {
		keyword : 'Traduction'
	},
	mark:{
		before:'Éléments avant l\'élément courant',
		after:'Éléments après l\'élément courant'
	}
};
GRP.langs[locale].prefs = {
	global : {
		title : "Reader Plus",
		"val-save" : "Sauver",
		alreadyexist : "Cet élément existe déjà!",
		snew : 'Nouveau!',
		supdated : 'Mis à jour!',
		stodo : 'A faire!',
		soff : 'HS!',
		prefssaved : "Préférences sauvés!",
		cachecleared : "Cache nettoyé!",
		expandall : 'Tous'
	},
	theme : {
		mytheme : 'Utilisez <a href="http://code.google.com/p/googlereaderplus/wiki/Backgrounds" target="blank">une image de fond </a> et des couleurs personnaliséees avec le thème "MyTheme" (<a href="http://code.google.com/p/googlereaderplus/wiki/Themes" target="blank">Aperçu</a>)',
		/*url: 'URL de l\'image',*/
		color : 'Couleur du text',
		bg : 'Couleur du fond du texte',
		/*repeat: 'Tiled Picture ',*/
		externaltheme : 'Gmail theme',
		imgrbg : 'Image répétée',
		imgsbg : 'Image',
		imgrh : 'Entête répété',
		imgh : 'Entête',
		imghr : 'Entête droit',
		imghl : 'Entête gauche',
		imgrf : 'Pied de page répété',
		imgf : 'Pied de page',
		imgfr : 'Pied de page droit',
		imgfl : 'Pied de page gauche',
		ncolumns : 'Nombre de colonnes'
	},
	ig : {
		warning : 'Some themes could be displayed incorrectly ; this is a Beta feature!',
		skin_name : 'iGoogle theme name',
		skin_url : 'iGoogle theme URL',
		debug : 'Debug mode (For debugging only)',
		randomtime : 'Dynamic theme toggles randomly instead time control',
		userandomthemes : 'Theme is automatically switched randomly',
		randomthemes : 'Toggle theme every (min.)',
		add : 'Add it now',
		next : 'Next',
		previous : 'Previous',
		random : 'Random',
		search : 'Search themes'
	},
	about : {
		thanks1 : '<td><span class="top_right"><img src="images/48.png"></span><h1>Merci...</h1><p>... d\'avoir installé (ou mis à jour) la dernière version de <strong>Reader Plus</strong>!</p><p><div class="btn"><div class="btn-install"><a href="javascript:fp();">Lancer maintenant !</a></div></div> Quelques options standards vont être configurés pour vous ; vous pourrez les changer plus tard.</p><p><div class="btn"><div class="btn-prefs"><a href="preferences.html" title="Aller à la page des préférences">Configurer vos options</a></div></div> pour obtenir l\'accès à toutes les options possibles!</p><p><div class="btn"><div class="btn-store"><a href="https://chrome.google.com/webstore/detail/hhcknjkmaaeinhdjgimjnophgpbdgfmg" target="_blank" title="Visit extension homepage"><strong>Visitez la page ReaderPlus dans la galerie Chrome!</strong></a></div></div></p><p><a href="http://www.twitter.com/ludoo0d0a"><img width=\"61\" height=\"23\" src=\"http://twitter-badges.s3.amazonaws.com/twitter-a.png\" alt=\"Suivez ludoo0d0a sur Twitter\"></a></p></td>',
		thanks2 : '<td><p>Si vous appréciez cette extension ou que vous avez des idées pour de nouvelles fonctionnalités, n\'hésitez pas à m\'en parler.</p>' + '<p>Vous pouvez également me faire un don, de sorte que je puisse m\'acheter une cargaison de café pour tenir le coup pour écrire le code :)</p>' + '<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&amp;business=FK9P8MNY9MGZL&amp;lc=FR&amp;item_name=googlereaderplus%20project&amp;currency_code=EUR&amp;bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted"><span><img alt="Donate" border="0" src="https://www.paypal.com/fr_FR/i/btn/btn_donate_SM.gif" width="108" height="21"></span></a></td>',
		//whatsnew: '<td> <h2>Quoi de neuf!!</h2> <ul> <li>Synchronisation des préférences dans Google Documents (1 seul profil pour plusieurs ordinateurs)</li><li>Essayer les nouveaux thèmes</li> <li>Raccourci clavier pour activer/désactiver le thème courant(Alt X)</li> <li>L\'espagnol est maintenant supporté</li> <li>Corrections de bugs</li> </ul> <p class="center"><img src="http://googlereaderplus.googlecode.com/svn/trunk/GoogleReaderPlus/screenshots/button/popup1.png"/></p><h2>Et toujours ...</h2> <ul> <li>Experience Cloud : Utilisé une configuration partagée par la communauté pour les favicons et le replacement</li> <li>Apercu des derniers articles non lus dans le bouton de la barre.</li> <li>Utiliser une image personnalisée ave le nouveau thème configurable "MyTheme"</li> <li>ou choisissez un thème aléatoire parmi les thèmes <a href="http://www.google.com/ig/directory?type=themes" target="blank">iGoogle</a></li> <li>Aperçu plein ecran façon "lightbox"</li> <li>Partager vos lectures avec <a href="http://www.readitlater.com" target="blank">ReadItLater</a></li> <li>Le panneau des actions comme fenêtre volante (onglet Général)</li> <li>Traduction des articles</li> </ul> </td>',
		nopopup : '<p>Si vous ne voulez plus être avertis des mises à jour, cocher l\'option "Plus de popup lors des mises à jour" dans <a href="preferences.html#general">la section Général</a>.</p>'
	},
	link : {
		reader : "<span>Google Reader</span>Mon lecteur RSS",
		issues : "<span>Support</span>Un bug ou une idée ?",
		download : "<span>Télécharger</span>La galerie Google",
		about : "<span>A propos</span>A propos, remerciements,...",
		site : "<span>Site web</span>Mon site web",
		twitter : "<span><img width=\"61\" height=\"23\" src=\"http://twitter-badges.s3.amazonaws.com/twitter-a.png\" alt=\"Suivez ludoo0d0a sur Twitter\"></span>Suivez les mises à jours",
		donate : '<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&amp;business=FK9P8MNY9MGZL&amp;lc=FR&amp;item_name=googlereaderplus%20project&amp;currency_code=EUR&amp;bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted"><span><img alt="Donate" border="0" src="https://www.paypal.com/fr_FR/i/btn/btn_donate_SM.gif" width="108" height="21"></span>Offrez moi un café!</a>',
		translate : '<span>Traduction</span>Aidez moi à traduire</a>'
	},
	column : {
		count : "Nombre de colonnes",
		locked : "Option 'Colonne' toujours activée",
		pagebreak : "Ajouter des sauts de page dans les articles longs pour les lire page par page comme un journal.",
		miniparas : "Nombre minimum de paragraphes avant de couper en colonnes",
		"entersite" : "Saisissez l'adresse de votre site"
	},
	translate : {
		lang : "Traduire le contenu en ",
		locked : "Toujours activé, sauf pour :",
		include : "Inclure seulement les éléments suivants:",
		entersite : "Saisir l'adresse du site"
	},
	twitter : {
		shortener : "Urls courtes",
		shortener_bitly : "Configuration pour BitLy (optionnel):",
		shortener_login : "Utilisateur",
		shortener_apikey : "Clé (ApiKey)",
		shortener_pwd : "Mot de passe",
		autoshort:'Toujours utiliser une url courte',
		tpl:'Modèle'
	},
	weibo : {
		shortener : "Urls courtes",
		shortener_bitly : "Configuration pour BitLy (optionnel):",
		shortener_login : "Utilisateur",
		shortener_apikey : "Clé (ApiKey)",
		shortener_pwd : "Mot de passe"
	},
	instapaper : {
		auth : "Authentification de <a href='http://www.instapaper.com' target='blank'>Instapaper</a> (optionnel):",
		username : "Utilisateur:",
		password : "Mot de passe:"
	},
	readitlater : {
		auth : "<a href='http://readitlaterlist.com/signup' target='blank'>Authentification</a> pour <a href='http://readitlaterlist.com' target='blank'>ReadItLater</a> (obligatoire):",
		username : "Utilisateur:",
		password : "Mot de passe:"
	},
	readabilitylater : {
		auth : "<a href='https://www.readability.com/readers/register' target='blank'>Authentification</a> pour <a href='https://www.readability.com' target='blank'>ReadItLater</a> (obligatoire):",
		username : "Utilisateur:",
		password : "Mot de passe:"
	},
	radbox : {
		auth : "<a href='http://radbox.me/support/extras' target='blank'>Radbox</a> <a href='http://radbox.me/account/user/register' target='_blank'>authentification</a> (obligatoire):",
		username : "Clé utilisateur:"
	},
	tumblr : {
		auth : "Authentification pour <a href='http://www.tumblr.com' target='blank'>Tumblr</a> nécessaire:",
		blogname : "Blog:",
		username : "Email:",
		password : "Mot de passe:"
	},
	reddit : {
		auth : "Authentification pour <a href='http://www.reddit.com' target='blank'>Reddit</a> nécessaire:",
		username : "Utilisateur:",
		password : "Mot de passe:"
	},
	diigo : {
		auth : "Authentification pour <a href='http://www.diigo.com' target='blank'>Diigo</a> nécessaire:",
		username : "Utilisateur:",
		password : "Mot de passe:"
	},
	plusone : {
		text : 'Partager avec Google+',
		keyword : 'Google+'
	},
	identi : {
		shortener : "Url courte",
		shortener_bitly : "configuration BitLy (optionnel):",
		shortener_login : "Login",
		shortener_apikey : "Clé API",
		shortener_pwd : "Mot de passe"
	},
	addthis : {
		layout : 'Layout',
		layoutdesc : 'Various formats are explained on <a href="http://www.addthis.com/web-button-select" target="_blank">this page</a>'
	},
	gmarks : {
		link : 'Mes <a href="https://www.google.com/bookmarks/l#!g=Time" target="_gmarks">Marque-pages Google</a>'
	},
	pinboard : {
		auth : "Authentification pour <a href='http://www.pinboard.in' target='blank'>Pinboard</a> <a href='http://pinboard.in/signup/' target='blank'>authentication</a> nécessaire:",
		username : "Utilisateur:",
		password : "Mot de passe:"
	},
	colorful : {
		tree : "Afficher les titres en couleurs dans l'arbre des sites à gauche",
		usebasecolor : "Utiliser les couleurs de base suivantes :",
		background : "Couleur arrière-plan",
		color : "Couleur des textes"
	},
	general : {
		opendirect : "Cliquer sur l'icône pour ouvrir GoogleReader",
		secure : "Forcer l'utilisation du protocole sécurisé (https)",
		counter : "Afficher le compteur dans la barre d'outil",
		counterinterval : "Refraîchir le compteur toutes les (min)",
		pageicon : "Activer l'icône dans la barre d'adresse (permet d'afficher un menu)",
		stats : 'Autoriser la collecte de données statistiques anonyme (pour un meilleur support)',
		noupdatepopup : "Plus de popup lors des mises à jour",
		icontoolbar_add : "Pour ajouter un bouton avec icône dans la barre d'outil, veuillez <a href=\"https://chrome.google.com/webstore/detail/ecpcafinfpjgabomoamkhkgnpgpmdmeo\">télécharger et installer le bouton</a>.",
		icontoolbar_text : "<span>Afin de le rendre optionnel, nous fournissons le bouton sous forme d'une extension indépendante,</span><br><span>à installé en plus de ReaderPlus.</span><br><span>Pour ajouter le bouton, cliquer <b>Installer</b> sur la page <a href=\"https://chrome.google.com/webstore/detail/ecpcafinfpjgabomoamkhkgnpgpmdmeo\">bouton pour ReaderPlus</a>.</span><br><span>Pour retirer le bouton, un clic droit et choisissez 'Désactiver'.</span>",
		importexport_text : "Vous pouvez sauver vos préférences avec la fonction 'export' et les rechqrger plus tard avec 'import', mais assurez vous de la <a href='http://jsonformatter.curiousconcept.com/' target='blank'>validité du format JSON</a>:",
		confirmimport : "Etes-vous sur de vouloir importer cette configuration?\nLa configuration actuelle sera PERDUE",
		confirmsyncload : "Etes-vous sur de vouloir importer cette configuration depuis votre compte Google?\nLa configuration actuelle sera PERDUE!",
		prefsimportedok : 'Préférences importé avec succès!',
		prefsimportfailed : 'Echec de l\'import!',
		prefsimportnull : 'Aucune préférence enregistrée!',
		syncprefs_text : 'Charger/Sauver avec votre compte Google',
		prefssavedok : 'Préférences sauvé avec succès!',
		prefssavedfailed : 'Echec de la sauvegarde!',
		text_layout : 'Mise en page',
		text_private : 'Données privées et mise à jour',
		text_toolbaricon : "Icône de la barre d'outil",
		text_pageicon : "Icône de la barre d'adresse",
		text_export : 'Export/import'
	},
	generallayout:{
		noborder : "Retirer les bords des articles pour en afficher un maximum sur une page",
		topcurrent : "Forcer l'affichage de l'article courant toujours en haut de l'écran",
		bottomup : "Placer la barre 'Précédent/Suivant' en haut de l'écran",
		currdir : "Surligner le répertoire de l'élément sélectionné",
		floatactions : "Menu 'actions' est affiché dans une fenêtre volante",
		focuscurrent: "Article courant mis en valeur",
		currentactions: 'Afficher les actions pour seulement l\'article en cours',
		icons : 'Icône seulement pour les boutons de la barre action (sauf pour les radio boutons)',
		hidetoolbar : 'Cacher la barre d\'outil',
		floatbar: 'Aperçu de la nouvelle barre flottante (sur ancien menu)',
		newbar: 'Activer la nouvelle interface Google (menu sur le logo)',
		oldbar: 'Restaurer l\'ancien menu Google',
		hideplus: 'Cacher le bouton GooglePlus'
	},
	compact:{
		hide_bar:'Cacher le menu',
		hide_search:'Cacher la recherche',
		hide_subscription:'Cacher le bouton "S\'abonner"',
		hide_nav:'Cacher la barre de navigation supérieure',
		hide_tags:'Cacher le panneau de gauche',
		fullscreen:'Plein écran',
		searchinbar:'Recherche dans le menu',
		hide_home:'"Accueil" dans le menu gauche',
		hide_selectors:'"Tous les éléments" dans le menu gauche',
		hide_recommendations:'"Explorer" dans le menu gauche'
	},
	limit : {
		slidewindow : "Slidewindow - Limiter le nombre d'éléments",
		mini : "Nombre minimum d'éléments",
		maxi : "Nombre maximum d'éléments"
	},
	prefetch : {
		first : "Nombre initial d'éléments chargés dans la vue Texte complet",
		next : "Nombre d'éléments chargés après un scroll dans la vue Texte complet",
		list : "Nombre initial d'éléments chargés dans la vue Liste."
	},
	nested : {
		separator : "Separateur pour des nieaux supplémentaires (exemple: Sports:Footbal)."
	},
	removeads : {
		links : "Liens:",
		images : "Images:",
		iframes : "Iframes:",
		preview : "Filter surlignage pour aperçu",
		videopreview:"Remplacer les vidéos par un simple aperçu"
	},
	preview : {
		onicon : "Utiliser un icone apres le titre pour afficher l'apercu (si non coché, l'apercu apparait lors du clic sur le titre)",
		locked : "Option 'Apercu' toujours activée",
		overlay : 'Aperçu plein écran (Lightbox)',
		loading : 'Afficher "Chargement en cours"'
	},
	fitheight : {
		locked : "Option 'Adapter hauteur' toujours activée"
	},
	filter : {
		help:'Voir <a target="_blank" href="http://code.google.com/p/googlereaderplus/wiki/Filter">le guide</a> pour plus de détails.',
		highlights : 'Liste des exclusions (une par ligne)',
		excludes : 'Liste des  surlignages (un par ligne)',
		searchbody : 'Chercher dans tout le texte',
		detect_duplicates : 'Détecter les doublons',
		hide_duplicates : 'Cacher les doublons',
		hide_excludes : 'Cacher les exclusions',
		prefer_highlights : 'Surlignage prioritaire sur exclusion',
		live : 'Live',
		word_mini : 'Nombre minimum de lettres pour un mot',
		button : 'Bouton \'filtrer\' sur chaque article'
	},
	favicons : {
		providerpageicons : 'Utiliser le fournisseur d\'icônes <a href="http://pageicons.appspot.com" target="blank">PageIcons</a> pour afficher correctement toutes les icônes des sites (Recommandé)',
		sidebaronly : "Afficher favicons in sidebar only",
		cloud : 'Utiliser les favicons de la communauté grâce la base en ligne <a href="http://wedata.net/databases/Favicons/items" target="blank">wedata/Favicons</a>',
		custom : "Saisissez vos propres favicons :",
		add : "Ajouter",
		tip : "Conseil: Vous pouvez également utiliser le menu contextuel \"Obtenir l'icône de ce site\" sur chaque site dans l'arbre de gauche",
		manual : "Favicons manuels pour tous les sites (non conseillé car relativement lent)",
		parsing : "Les icône sont obtenues en parcourant la page de chaque site.",
		"entersite" : "Saisissez l'adresse de votre site",
		"prompticon" : "Saisissez l'adresse de votre icône (laissez vide pour l'obtenir automatiquement):"
	},
	replacer : {
		intro : '<a href="http://code.google.com/p/googlereaderplus/wiki/ReplacerHowto" target="blank">Aide sur l\'utilisation de replacer</a>',
		cloud : 'Utiliser les expressions de la base <a href="http://wedata.net/databases/Replacer/items" target="blank">wedata/Replacer</a>',
		link : "Sites",
		from : "Rechercher regex/xpath/css",
		to : "Remplacer par",
		prompttitle : "Titre du filtre"
	},
	rank : {
		level : 'Afficher les niveaux',
		ad : 'La Popularité est basé sur les services de <a href="http://www.postrank.com?from=readerplus" target="_blank"><img src="http://www.postrank.com/images/navigation/head_logo.png"/></a> <i>Intelligence from the social web</i><br/><br/><span class="warning center">Depuis Google a racheté Postrank, les services fournis vont bientôt disparaitre. Je ne peux pas garantir que cette fonctionnalité marchera toujours.</span>'
	},
	readability : {
		intro : 'Afficher le contenu principal uniquement d\'un article',
		bigger:'Bigger font',
		locked : "Toujours activé, sauf pour:",
		include : "Inclure seulement ces flux : ",
		ad : 'Readability est basé sur les services de <a href="http://www.readability.com?from=readerplus" target="_blank"><img src="http://www.readability.com/media/images/logo_chair.png"/></a> <br/><i>Read Comfortably—Anytime, Anywhere</i><br/>Return to distraction–free reading while supporting writers & publishers'
	},
	coverflow : {
		coverflow : 'Coverflow / Slideshow',
		reflection : 'Utiliser la réflection',
		caption : 'Afficher les légendes',
		sync : 'Syncroniser les éléments',
		footer : 'En pied-de-page'
	},
	jump : {
		staticdown : 'Icône flottante \'Aller en bas\' pour l\'article courrant'
	},
	diaporama:{
		desc:'Appuyer sur le bouton \'Lecture\' (en haut à droite) pour lancer le diaporama de vos articles',
		duration:'Temps entre deux boucles consécutives',
		steps:'Décalage à chaque boucle',
		nextentry:'Aller à l\'article suivant au lieu de se déplacer avec le décalage.'
	},
	mark : {
		asscroll : 'Marquer comme lu les éléments passés lors du scroll'
	},
	lightbox : {
		locked : "Option 'Adapter hauteur' toujours activée, sauf pour :"
	},
	relook : {
		css : "Feuille de style CSS",
		less: 'Utiliser le langage dynamique <a href="http://lesscss.org">LESS</a>',
		resize : "Utiliser l'évènement 'resize' pour adapter le plein écran"
	},
	pack : {
		mini : "<span>Paquetage Mini</span>Le minimum nécessaire",
		ludoo : "<span>Paquetage LudoO</span>Les meilleurs options en un clic",
		full : "<span>Paquetage Complet</span>Toutes les options activées",
		reset : "<span>Paquetage Reset</span>Remise à zéro de votre configuration",
		confirmdel : "Cette opération va EFFACER et réinitialiser vos préférences. Etes-vous sûr ?",
		done : "Le nouveau paquetage est sélectionné. Vous pouvez sauver."
	},
	extshortcuts : {
		custom : "Vos propres raccourcis clavier",
		official : "Les raccourcis clavier officiels de Google Reader",
		alreadyusedprefs : "Déjà utilisé dans vos préférences!",
		alreadyusedgoogle : "Déjà utilisé par Google!"
	},
	thanks : {
		donators : "Merci aux généreux donateurs pour leurs contributions sur ce projet",
		translators : "Merci aux courageux traducteurs pour leur superbe travail",
		authors : "Merci aux auteurs des scripts et skins originaux (Greasemonkey et Stylish)"
	}
};
