/**
 * ReaderPlus
 * Translation
 *
 * **************************
 * de : Deutsch
 * **************************
 *
 * Version : 1.9
 * Date : 09-13-2011
 * @author T Weisser
 * @author raelianer
 */
var locale = 'de';
namespace('GRP.langs.' + locale);
GRP.langs[locale].texts = {
	version : "Version",
	closeentry : {
		text : 'Eingabe beenden',
		keyword : 'Schliessen'
	},
	column : {
		text : 'mehrspaltig anzeigen',
		keyword : 'Spalte',
		summary : 'Objekt hinzufügen/bearbeiten',
		desc : 'Spalten verwalten'
	},
	sharemsg : {
		sharewith : 'Teilen mit ',
		toolong : "Die Nachricht ist zu lang!",
		notetoolong : "es verbleiben {0} Zeichen; maximum 140",
		text_title : 'Titel',
		text_tag : 'Tag',
		text_url : 'URL',
		text_desc : 'Beschreibung',
		text_send : 'Senden',
		text_count : 'Zähler',
		text_cancel : 'Abbrechen',
		text_shortener : 'kurze URL',
		shortfailed : "Entschuldigen sie, es ist ein Fehler beim verwenden der kurzen URL aufgetreten!\n\r{0}"
	},
	facebook : {
		text : 'Diese Nachricht auf Facebook teilen',
		keyword : 'Facebook'
	},
	twitter : {
		text : 'Dies aut Twitter teilen',
		keyword : 'Twitter',
		plslogin : 'Bitte loggen Sie sich in Twitter ein'
	},
	weibo : {
		text : 'Diese Nachricht auf Weibo teilen',
		keyword : 'Weibo',
		plslogin : 'Bitte loggen Sie sich in Weibo ein'
	},
	reddit : {
		text : 'Diese Nachricht auf Reddit teilen',
		keyword : 'Reddit',
		plslogin : 'Bitte loggen Sie sich in Reddit ein'
	},
	tumblr : {
		text : 'Diese Nachricht auf Tumblr teilen',
		keyword : 'Tumblr',
		plslogin : 'Bitte loggen Sie sich in Tumblr ein'
	},
	identi : {
		text : 'Dies auf Identi teilen',
		keyword : 'Identi',
		plslogin : 'Bitte loggen Sie sich auf Identi.ca ein',
		nologin : 'Diese Funktion erfordert ein Benutzernamen und Passwort, verändern Sie dies in den Einstellungen!!'
	},
	jaiku : {
		text : 'Dies aut Jaiku teilen',
		keyword : 'Jaiku',
		plslogin : 'Bitte loggen sie sich auf Jaiku ein'
	},
	readit : {
		password : 'Password, falls vorhanden:',
		wronglogin : 'Falscher Benutzername oder Passwort, bitte überprüfen!!',
		nologin : 'Diese Funktion erfordert ein Benutzername, verändern Sie dies in den Einstellungen!!',
		error : 'Es ist ein Fehler aufgetreten. Versuchen Sie es später noch einmal.',
		badrequest : 'Falsche Anfrage. Wahrscheindlich fehlt eine Angabe, z.B. die URL.',
		saving : 'Speichern',
		shortcut_readitlater : 'Später lesen mit Instapaper'
	},
	diigo : {
		keyword : 'Diigo',
		text : 'Dies auf Diigo teilen',
		badrequest : 'Einige Anfrageparameter sind ungültig oder die API Mengenbeschränkung wurde erreicht.',
		notauthorized : 'Authentifizierungsdaten fehlen oder sind ungültig.',
		forbidden : 'Die Anfrage wurde mangels fehlender Rechte zurückgewiesen.',
		notfound : 'Entweder fordern Sie eine ungültige URI an oder die angefragte Ressource existiert nicht (z.B. kein solcher Benutzer).',
		badgateway : 'Diigo ist ausgefallen oder wird aufgerüstet.',
		unavailable : 'Die Diigo Servers sind zu beschäftigt, um Ihre Anfrage zu bedienen. Bitte versuchen Sie es später nochmal.'
	},
	gmarks : {
		keyword : 'Google Bookmarks',
		wronglogin : 'Es läuft etwas schief bei der Authentifizierung!!',
		nologin : 'Fehler bei der Authentifizierung!!',
		text : 'Dies auf Google Bookmarks teilen'
	},
	instapaper : {
		text : 'Später lesen mit Instapaper',
		keyword : 'Instapaper',
		plslogin : 'Bitte loggen Sie sich in Instapaper ein',
		login : 'E-Mail oder Benutzername:'
	},
	readitlater : {
		text : 'Später lesen mit ReadItLater',
		keyword : 'ReadItLater',
		plslogin : 'Bitte loggen sie sich bei ReadItLater ein',
		rateexceeded : 'Bewertungslimit überschritten, bitte warten Sie einen Moment',
		maintenance : 'Der Server von Read It Later ist down für Wartungsarbeiten'
	},
	radbox : {
		text : 'Read Later mit Radbox',
		keyword : 'Radbox',
		nologin : 'Diese Funktion benötigt ein Passwort, verändern Sie dies in den Einstellungen!!',
		novideo : 'Es wurde kein Video auf dieser Seite gefunden'
	},
	addthis : {
		text : 'Teilen mit AddThis',
		keyword : 'AddThis'
	},
	blogger : {
		text : 'Teilen mit Blogger',
		keyword : 'Blogger'
	},
	favicons : {
		preferences : 'Einstellungen',
		getfavicon : 'Favicon holen',
		notfoundicon : 'Favicon wurde nicht gefunden "{0}"',
		summary : 'Hinzufügen / Bearbeiten von Elementen',
		desc : 'Verwalte Favicons'
	},
	filter : {
		settings : 'Filtereinstellungen',
		highlight : 'Hervorgehoben',
		exclude : 'Ausgeschlossen',
		hideduplicates : 'Verstecke Dublikate',
		hideexcludes : 'Verstecke Ausgeschlossene',
		preferehighlights : 'Beforzuge Hervorgehobene vor Ausgeschlossene',
		update : 'Update',
		quickadd : 'Schnell hinzufügen',
		add : 'hinzufügen',
		edit : 'Bearbeiten',
		remove : 'Beenden',
		//v2
		filter : 'Filter',
		save : 'Beenden & Anwenden',
		close : 'Menu schliessen',
		searchbody : 'Im ganzen Text suchen',
		detect_duplicates : 'Dulikate erkennen',
		hide_duplicates : 'verstecke Dublikate',
		hide_excludes : 'verstecke Ausgeschlossene',
		prefer_highlights : 'Beforzuge Hervorgehobene vor Ausgeschlossene',
		live : 'Live',
		highlights : 'Hervorgehobene',
		duplicates : 'Dublikate',
		excludes : 'Ausgeschlossene',
		content : 'Inhalt',
		addentry : 'hinzufügen',
		add_excludes : 'Als Ausgeschlossene hinzufügen',
		add_highlights : 'Als Hervorgehoben hinzufügen',
		button : 'Filter auf jeden Eintrag anwenden'
	},
	fitheight : {
		text : 'Höhe anpassen',
		keyword : 'Höhe anpassen'
	},
	jump : {
		text : 'Springe',
		textbottom : 'Springe zum Schluss',
		texttop : 'Springe zum Anfang',
		keywordtop : 'Anfang'
	},
	openbackground : {
		text : 'Open in background',
		keyword : 'Open'
	},
	preview : {
		text : 'Integrierte Vorschau der Nachrichten',
		title : 'Als Vorschau öffnen',
		opennewtab : 'In einem neuen Fenster öffnen',
		keyword : 'Vorschau',
		overlay_next : 'Weiter',
		overlay_previous : 'Zurück',
		overlay_close : 'Schliessen',
		overlay_category : 'Kategorie',
		overlay_loading : 'Laden...'
	},
	readbymouse : {
		middleclick : 'Mittelklick',
		openintab : 'In einem neuen Tab öffnen',
		openinbacktab : 'In einem alten Tab öffnen',
		shares : 'teilen',
		stars : 'Sterne',
		tag : 'Etikett',
		addtag : 'Etikett hinzufügen',
		on : 'ReadByMouse On',
		off : 'ReadByMouse Off'
	},
	replacer : {
		nomatch : 'Kein Treffer gefunden.',
		loading : 'Laden...'
	},
	lightbox : {
		text : 'Beleuchtung auf den Medien',
		keyword : 'Beleuchtung'
	},
	ig : {
		menu_prefs : 'Reader+ Einstellungen',
		menu_theme : 'Reader+ Aussehen',
		menu_randomtheme : 'Ändere Aussehen :'
	},
	menu : {
		label : 'Extras',
		showallfolders : 'Alle Ordner anzeigen'
	},
	actions : {
		text : 'Aktionssymbole'
	},
	portal : {
		readmore : 'Mehr lesen (Ctrl+click um Aktion anzuzeigen)'
	}
};
GRP.langs[locale].prefs = {
	global : {
		title : "Reader Plus",
		"val-save" : "Speichern",
		alreadyexist : "Eintrag existiert bereits!",
		snew : 'neu!',
		supdated : 'Erneuerung!',
		prefssaved : "Einstellungen gespeichert!",
		cachecleared : "Cache gelöscht!",
		expandall : 'Alles'
	},
	theme : {
		mytheme : 'Benutze<a href="http://code.google.com/p/googlereaderplus/wiki/Backgrounds" target="blank">eigenes Hintergrundbild</a> und Schriftfarbe mit deinem Aussehen  "Mein Aussehen" (<a href="http://code.google.com/p/googlereaderplus/wiki/Themes" target="blank">Vorschau</a>)',
		/*url: 'Bild URL',*/
		color : 'Textfarbe',
		bg : 'Hintergrundfarbe',
		/*repeat: 'gekacheltes Bild ',*/
		externaltheme : 'Google/Gmail Aussehen',
		imgrbg : 'Hintergrund widerholen',
		imgsbg : 'Hintergrund',
		imgrh : 'Kopf widerholen',
		imgh : 'Kopf',
		imghr : 'Rechter Kopf',
		imghl : 'Linker Kopf',
		imgrf : 'Fuss widerholen',
		imgf : 'Fuss',
		imgfr : 'rechter Fuss',
		imgfl : 'linker Fuss',
		ncolumns : 'Anzahl Zeilen'
	},
	ig : {
		warning : 'Einige Themen können nicht richtig angezeigt werden ; dies ist eine Betafunktion!',
		skin_name : 'iGoogle Thema',
		skin_url : 'iGoogle Thema URL',
		debug : 'Debugmodus (Nur um zu debuggen)',
		randomtime : 'Dinamisches Thema, verändert sich zufällig, anstatt Zeitgesteuert',
		userandomthemes : 'Thema verändert sich automatisch zufällig',
		randomthemes : 'Verändere Thema alle (min.)',
		add : 'Hinzufügen',
		next : 'Weiter',
		previous : 'Zurück',
		random : 'Zufall',
		search : 'Thema suchen'
	},
	about : {
		thanks1 : '<td><span class="top_right"><img src="images/48.png"></span><h1>Thank you...</h1>' + '<p>... Um die neuste Version von <strong>Reader Plus</strong>zu installieren oder upzudaten!</p>' + '<p>Überprüfen sie ob <a href="preferences.html" title="Zur Einstellungsseite springen"><strong>Einstellungsseite</strong></a> um die Erweiterungen zu bearbeiten.</p>' + '<p><a href="https://chrome.google.com/webstore/detail/hhcknjkmaaeinhdjgimjnophgpbdgfmg" target="_blank" title="Besuche Erwiterungshomepage"><strong>Besuche Google Chrome Erweiterungsgalerie!</strong></a></p>' + '<p><a href="http://www.twitter.com/ludoo0d0a"><img src="http://twitter-badges.s3.amazonaws.com/follow_me-a.png" alt="Folge mir auf Twitter"/></a></p>' + '<p></p></td>',
		thanks2 : '<td><p>Wenn sie diese Erweiterung mögen, spenden sie mir doch einen kleinen Beitrag.</p>' + '<p>damit ich mir eine Tasse Kaffee kaufen kann, um weiterhin den Code u schreiben:)</p>' + '<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=FK9P8MNY9MGZL&lc=US&item_name=GoogleReaderPlus%20project&currency_code=EUR&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted"><img alt="Donate" border="0" src="https://www.paypal.com/en_US/i/btn/btn_donate_SM.gif" width="74" height="21"></a></td>',
		//whatsnew: '<td> <h2>What\'s new!!</h2> <ul> <li>Sync settings in your Google Docs (1 profile for multiple computers)</li> <li>Try the new themes</li> <li>Toggle theme shortcut (Alt X)</li> <li>Spanish supported now</li> <li>Bugfixes</li> </ul> <p class="center"><img src="http://googlereaderplus.googlecode.com/svn/trunk/GoogleReaderPlus/screenshots/button/popup1.png"/></p><h2>And still ...</h2> <ul> <li>Cloud experience : Use shared configuration for favicons and replacer</li> <li>Toolbar button shows now a popup with last unread items and a fast tooltip preview</li> <li>or use a custom background with the new theme \'MyTheme\'</li> <li>or use a random <a href="http://www.google.com/ig/directory?type=themes" target="blank">iGoogle</a> theme</li> <li>Preview as lightbox</li> <li>Share items using <a href="http://www.readitlater.com" target="blank">ReadItLater</a></li> <li>Entry actions as floating window (general)</li> <li>Translate news</li> </ul> </td>',
		nopopup : '<p>Wenn sie nicht an neue Updates erinnert werden wollen stellen sie dies in den Einstellungen unter <a href="preferences.html#general">Allgemein</a> ein.</p>'
	},
	link : {
		reader : "<span>Google Reader</span>Dein RSS reader",
		issues : "<span>Report issue</span>Fehler gefunden oder eine Anregung",
		download : "<span>Google Extension</span>Der Ort um zu downloaden",
		about : "<span>About</span>Über, danke,...",
		site : "<span>Website</span>Meine persönliche Webseite",
		twitter : "<span><img width=\"160\" height=\"27\" src=\"http://twitter-badges.s3.amazonaws.com/follow_me-a.png\" alt=\"Follow ludoo0d0a on Twitter\"></span>Neuigkeiten und Updates",
		donate : '<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&amp;business=FK9P8MNY9MGZL&amp;lc=US&amp;item_name=googlereaderplus%20project&amp;currency_code=EUR&amp;bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted"><span><img alt="Donate" border="0" src="https://www.paypal.com/en_US/i/btn/btn_donate_SM.gif" width="74" height="21"></span>Offer me a coffee!</a>',
		translate : '<span>Übersetzung</span>Hilf mir zu übersetzen</a>'
	},
	column : {
		count : "Spaltennummer",
		locked : "Immer aktiv, ausser folgende Feeds:",
		pagebreak : "Unterbreche lange Artikel, so dass man sie Seite für Seite lesen kann, wie bei einer Zeitung",
		miniparas : "Anzahl der minimlaen Absätze, bevor aufgeteilt in Spalten",
		entersite : "Füge URL der Seite hinzu"
	},
	translate : {
		lang : "Übersetze Inhalt nach",
		locked : "Immer aktiv, ausser für:",
		include : "Nur folgende Feeds einfügen:",
		entersite : "Füge URL der Seite hinzu"
	},
	twitter : {
		shortener : "Verkürzer",
		shortener_bitly : "BitLy Konfiguration (optional):",
		shortener_login : "Login",
		shortener_apikey : "ApiKey",
		shortener_pwd : "Passwort"
	},
	instapaper : {
		auth : "<a href='http://www.instapaper.com' target='blank'>Instapaper</a> authentication:",
		username : "Benutzername:",
		password : "Passwort (optional):"
	},
	readitlater : {
		auth : "<a href='http://www.readitlaterlist.com' target='blank'>ReadItLater</a> <a href='http://readitlaterlist.com/signup' target='blank'>authentication</a> (required):",
		username : "Benutzername:",
		password : "Passwort:"
	},
	radbox : {
		auth : "<a href='http://radbox.me/support/extras' target='blank'>Radbox</a> <a href='http://radbox.me/account/user/register' target='_blank'>authentication</a> (required):",
		username : "Userkey:"
	},
	identi : {
		shortener : "Verkürzer",
		shortener_bitly : "BitLy Konfiguration (optional):",
		shortener_login : "Login",
		shortener_apikey : "ApiKey",
		shortener_pwd : "Passwort"
	},
	addthis : {
		layout : 'Layout',
		layoutdesc : 'Verschiedene Formate werden auf <a href="http://www.addthis.com/web-button-select" target="_blank">dieser Seite</a> erklährt'
	},
	colorful : {
		tree : "Zeige Farbetikett in linkem Navigationsbereich",
		usebasecolor : "Benutze folgende Standartfarben:",
		background : "Hintergrundfarbe",
		color : "Vordergrundfarbe"
	},
	general : {
		counter : "Zeige Anzahl ungelesener Artikel in der Toolbar",
		counterinterval : "Erneuere ungelesene Artikel alle(min)",
		pageicon : 'Aktiviere Icon in der Adresszeile (click öffnet das Menu)',
		stats : 'Schalte anonyme Statistik ein (für besseren Support)',
		bottomup : 'Fusszeile ganz nach oben',
		opendirect : "Click auf das Toolbaricon öffnet GoogleReader",
		secure : "Benutze immer verschlüsselte Übertragung (https)",
		noupdatepopup : "Kein Popup bei Updates",
		icontoolbar_add : "Um eine Schaltfläche in der Toolbar zu erstellen, bitte <a href=\"https://chrome.google.com/webstore/detail/ecpcafinfpjgabomoamkhkgnpgpmdmeo\">laden sie diese herunter und instalieren Sie sie</a>.",
		icontoolbar_text : "<span>Optional kann die Schaltfläche ganz alleine stehen</span>                                    <br>                                    <span>to be installed along with readerplus.</span>                                    <br>                                    <span>To add the button, click <b></b> on the <a href=\"https://chrome.google.com/webstore/detail/ecpcafinfpjgabomoamkhkgnpgpmdmeo\">readerplus Toolbar button</a> page.</span><span>To remove the button, right click him and choose Disable.</span>",
		importexport_text : "Mit 'export' können sie ihre Daten sichern und später mit 'import' widerherstellen, stellen sie sicher, dass sie Daten <a href='http://jsonformatter.curiousconcept.com/' target='blank'>JSON kompatibel</a> sind:",
		confirmimport : "Sind sie sicher das Sie diese Konfiguration laden wollen?\nDie Aktuelle geht dabei verloren!",
		confirmsyncload : "Sind sie sicher das Sie diese Konfiguration von GoogleReeder laden wollen?\nDie Aktuelle geht dabei verloren!",
		prefsimportedok : 'Einstellungen erfolgreich importiert!',
		prefsimportfailed : 'Import fehlgeschlagen!',
		prefsimportnull : 'Keine gespeicherten Einstellungen gefunden!',
		syncprefs_text : 'Lade/Speichere Mit hilfe deines Google Accounts',
		prefssavedok : 'Einstellungen erfolgreich gespeichert!',
		prefssavedfailed : 'Einstellungen speicher fehlgeschlagen!',
		text_layout : 'Layout Einstellungen',
		text_private : 'Private Daten und Updates',
		text_toolbaricon : 'Toolbar Icon',
		text_pageicon : 'Addresszeilen Icon',
		text_export : 'Export/import'
	},
	generallayout:{
		noborder : "Eintragsrand entfernen um mehr Beiträge pro Seite anzuzeigen",
		topcurrent : "Aktueller Artikel immer ganz oben",
		bottomup : 'Footer toolbar on the top',
		currdir : 'Aktuellen Ordner hervorheben<span class="new">neu!</span>',
		floatactions : "Artikelaktionen werden in schwebendem Fenster angezeigt.",
		icons : 'Icons nur für Aktionsschaltflächen (ausser checkbox) <span class="new">neu!</span>',
		hidetoolbar : 'Verstecke Usertoolbar'
		//hideplus: 'Hide GooglePlus button'
	},
	limit : {
		slidewindow : "Slidewindow - kürze Anzahl Einträge",
		mini : "Minimale Einträge",
		maxi : "Maximale Einträge"
	},
	prefetch : {
		first : "Anfangs geladene Beiträge bei der erweiterten Ansicht.",
		next : "Ladende Einträge bei der erweiterten Ansicht. ",
		list : "Anfangs geholt bei der Listendartsellung"
	},
	nested : {
		separator : "Trenner zum hinzufügen nuere Ebene(zum Beispiel: Sport:Fussball)."
	},
	removeads : {
		links : "Link Filter:",
		images : "Bilder Filter:",
		iframes : "Iframe Filter:"
	},
	preview : {
		onicon : "Zeige integrierte Vorschau beim click auf das rechte Icon nach dem Titel (Wenn nicht angewählt, auf dem Titel)",
		locked : "Immer aktiv, ausser folgende Feeds:",
		overlay : 'Fullscreen Vorschau (Lightbox)',
		loading : 'Anzeigen "laden..."'
	},
	fitheight : {
		locked : "Immer aktiv, ausser folgende Feeds:"
	},
	filter : {
		searchbody : "Suche inerhalb des Titels und des Textes",
		highlights : 'Hervorgehobene Liste (ein Element pro Zeile)',
		excludes : 'Ausgeschlossene Liste (ein Element pro Zeile)',
		searchbody : 'Suche im ganzen Text',
		detect_duplicates : 'Dublikate erkennen',
		hide_duplicates : 'verstecke Dublikate',
		hide_excludes : 'verstecke Ausgeschlossene',
		prefer_highlights : 'Beforzuge Herforgehobene vor Ausgeschlossenen',
		live : 'Live',
		word_mini : 'Minimale Anzahl Buchstaben pro Wort',
		button : 'Filterschaltfläche auf jedem Element'
	},
	favicons : {
		providerpageicons : 'Benutze <a href="http://pageicons.appspot.com" target="blank">PageIcons</a> Provider (Empfohlen alle Icons zu laden)',
		sidebaronly : "Zeige Favicons nur in der Sidebar",
		cloud : 'Benutze online Datenbank <a href="http://wedata.net/databases/Favicons" target="blank">wedata/Favicons</a> damit die Community die Favicons laden kann',
		custom : "Füge dein eigenes Favicon hinzu :",
		add : "hinzufügen",
		tip : "Tipp: You could add it easily using the contextual menu \"Get favicon\" of the left side bar",
		manual : "Manuell Favicons für alle Seiten (nicht empfehlenswert; langsamer)",
		parsing : "Favicon wird durch analysieren jeder Homepage erkennt",
		entersite : "Geben Sie die URL der Website ein",
		prompticon : "Icon URL eingeben(leer lassen für automatisch):"
	},
	replacer : {
		intro : '<a href="http://code.google.com/p/googlereaderplus/wiki/ReplacerHowto" target="blank">Hilfe zur Verwendung des Replacers</a>',
		cloud : 'Nutzen Sie Online-Ausdrücke von <a href="http://wedata.net/databases/LDRFullFeed/items" target="blank">wedata/LDRFullFeed</a> und <a href="http://wedata.net/databases/Replacer/items" target="blank">wedata/Replacer</a> Netzdatenbank',
		link : "Link Regex",
		from : "Suche regex/xpath/css",
		to : "Ersetzen",
		prompttitle : "Title für diesen Filter"
	},
	lightbox : {
		locked : "Immer aktiv, außer folgenden Feeds:"
	},
	relook : {
		css : "CSS stylesheet",
		resize : "Skalieren-Ereignis auslösen, um in den Vollbildmodus zu wechseln"
	},
	pack : {
		mini : "<span>Paket Mini</span>Das Minimum für die beste Lesung",
		ludoo : "<span>Package LudoO</span>Die besten Funktionen in einem Klick",
		full : "<span>Package Full</span>Alle Funktionen aktivieren",
		reset : "<span>Package Reset</span>Konfiguration zurücksetzen",
		confirmdel : "Dies löscht alle Einstellungen. Sind Sie sich sicher?"
	},
	extshortcuts : {
		custom : "Ihre benutzerdefinierten Shortcuts",
		official : "Offizielle Google Reader Tastenkürzel",
		alreadyusedprefs : "Bereits in den Einstellungen verwendet!",
		alreadyusedgoogle : "Bereits verwendet von Google!"
	},
	thanks : {
		donators : "Dank an alle Spender für Ihren Beitrag zum Projekt",
		translators : "Dank an die Übersetzer für ihre wunderbare Arbeit",
		authors : "Dank dem Autor der Original Skripte und Skins (Greasemonkey und Stylish)"
	}
};
