/**
 * ReaderPlus
 * Translation
 *
 * **************************
 * en : English
 * **************************
 *
 * Version : 2.0
 * Date : 11-03-2011
 * @author Valente
 */
var locale = 'en';
namespace('GRP.langs.' + locale);
GRP.langs[locale].texts = {
	version : "version",
	splash:{
		on: 'ReaderPlus is ON'
	},
	closeentry : {
		text : 'Close this entry',
		keyword : 'Close'
	},
	column : {
		text : 'Display as multi columns layout',
		keyword : 'Column',
		summary : 'Add/edit items',
		desc : 'Manage columns'
	},
	sharemsg : {
		sharewith : 'Share with ',
		toolong : "The message is too long!",
		notetoolong : "remains {0} characters ; maximum 140",
		text_title : 'Title',
		text_tag : 'Tag',
		text_url : 'URL',
		text_desc : 'Description',
		text_send : 'Send',
		text_count : 'Count',
		text_cancel : 'Cancel',
		text_shorturl : 'Short url',
		shortfailed : "Sorry, an error occured on trying to use short url!\n\r{0}"
	},
	facebook : {
		text : 'Share this news on Facebook',
		keyword : 'Facebook'
	},
	twitter : {
		text : 'Share this news on Twitter',
		keyword : 'Twitter',
		plslogin : 'Please login to Twitter'
	},
	weibo : {
		text : 'Share this news on Weibo',
		keyword : 'Weibo',
		plslogin : 'Please login to Weibo'
	},
	reddit : {
		text : 'Share this news on Reddit',
		keyword : 'Reddit',
		plslogin : 'Please login to Reddit'
	},
	tumblr : {
		text : 'Share this news on Tumblr',
		keyword : 'Tumblr',
		plslogin : 'Please login to Tumblr'
	},
	plusone : {
		text : 'Share this news on Google+',
		keyword : 'Google+',
		plslogin : 'Please login to Google+'
	},
	identi : {
		text : 'Share this news on Identi',
		keyword : 'Identi',
		plslogin : 'Please login to Identi.ca',
		nologin : 'This feature requires a username and a key, please set preferences!!'
	},
	jaiku : {
		text : 'Share this news on Jaiku',
		keyword : 'Jaiku',
		plslogin : 'Please login to Jaiku'
	},
	readit : {
		password : 'Password, if you have one:',
		wronglogin : 'Wrong username or password, please check it!!',
		nologin : 'This feature requires a username, please set preferences!!',
		error : 'The service encountered an error. Please try again later.',
		badrequest : 'Bad request. Probably missing a required parameter, such as url.',
		saving : 'Saving',
		shortcut_readitlater : 'Read Later with Instapaper'
	},
	diigo : {
		keyword : 'Diigo',
		text : 'Share with Diigo',
		badrequest : 'Some request parameters are invalid or the API rate limit is exceeded.',
		notauthorized : 'Authentication credentials are missing or invalid.',
		forbidden : 'The request has been refused because of the lack of proper permission.',
		notfound : 'Either you\'re requesting an invalid URI or the resource in question doesn\'t exist (e.g. no such user).',
		badgateway : 'Diigo is down or being upgraded.',
		unavailable : 'The Diigo servers are too busy to server your request. Please try again later.'
	},
	gmarks : {
		keyword : 'Google Bookmarks',
		wronglogin : 'Something goes wrong with authentication!!',
		nologin : 'Error with authentication!!',
		text : 'Share with Google Bookmarks'
	},
	instapaper : {
		text : 'Read Later with Instapaper',
		keyword : 'Instapaper',
		plslogin : 'Please login to Instapaper',
		login : 'Email or username:'
	},
	readitlater : {
		text : 'Read Later with ReadItLater',
		keyword : 'ReadItLater',
		plslogin : 'Please login to ReadItLater',
		rateexceeded : 'Rate limit exceeded, please wait a little bit before resubmitting',
		maintenance : 'Read It Later\'s sync server is down for scheduled maintenance'
	},
	radbox : {
		text : 'Read Later with Radbox',
		keyword : 'Radbox',
		nologin : 'This feature requires a userkey, please set preferences!!',
		novideo : 'No video were found on this page'
	},
	addthis : {
		text : 'Share with AddThis',
		keyword : 'AddThis'
	},
	blogger : {
		text : 'Share with Blogger',
		keyword : 'Blogger'
	},
	pinboard : {
		text : 'Share with Pinboard',
		keyword : 'Pinboard'
	},
	favicons : {
		preferences : 'Preferences',
		getfavicon : 'Get favicon',
		notfoundicon : 'Cannot found favicon for "{0}"',
		summary : 'Add/edit items',
		desc : 'Manage favicons'
	},
	filter : {
		settings : 'Filter settings',
		highlight : 'Highlight',
		exclude : 'Exclude',
		hideduplicates : 'Hide Duplicates',
		hideexcludes : 'Hide Excludes',
		preferehighlights : 'Prefer Hilights over excludes',
		update : 'Update',
		quickadd : 'Quick Add',
		add : 'Add',
		edit : 'Edit',
		remove : 'Remove',
		//v2
		filter : 'Filter',
		save : 'Save & apply',
		close : 'Close menu',
		searchbody : 'Search in whole body text',
		fulltext : 'Toggle full text',
		detect_duplicates : 'Detect Duplicates',
		hide_duplicates : 'Hide Duplicates',
		hide_excludes : 'Hide Excludes',
		prefer_highlights : 'Prefer Highlights over excludes',
		live : 'Live',
		highlights : 'Highlights',
		duplicates : 'Duplicates',
		excludes : 'Excludes',
		content : 'Content',
		addentry : 'Add',
		add_excludes : 'Add as exludes',
		add_highlights : 'Add as highlight',
		button : 'Filter button on each entry',
		gettitle : 'Get title',
		getwords : 'Get words',
		getfrom : 'Add feed',
		getauthor : 'Add author'
	},
	rank : {
		filter_rank : 'Ranking',
		filter_ad : 'Powered by PostRank',
		rank_all : 'All',
		rank_good : 'Good >2.7',
		rank_great : 'Great >5.5',
		rank_best : 'Best >7.6',
		rank_famous : 'Famous >9'
	},
	fitheight : {
		text : 'Fit height',
		keyword : 'Fit height'
	},
	jump : {
		text : 'Jump',
		textbottom : 'Jump to bottom',
		texttop : 'Jump to top',
		keywordtop : 'top'
	},
	openbackground : {
		text : 'Open in background',
		keyword : 'Open'
	},
	preview : {
		text : 'Integrated preview of the news',
		title : 'Open as preview',
		opennewtab : 'Open in a new window',
		keyword : 'Preview',
		overlay_next : 'Next',
		overlay_previous : 'Previous',
		overlay_close : 'Close',
		overlay_category : 'Category',
		overlay_loading : 'Loading in progress...'
	},
	readability : {
		text : 'Read now with Readability',
		title : 'Read now full content with Readability',
		keyword : 'Read now'
	},
	readbymouse : {
		readbymouse : 'Read by mouse',
		middleclick : ' On middle click: ',
		openintab : 'Opens in Tab',
		openinbacktab : 'Opens in Background Tab',
		shares : 'Shares',
		stars : 'Stars',
		tag : 'Separate tags by commas:',
		addtag : 'Add a Tag'
	},
	replacer : {
		nomatch : 'No match found.',
		loading : 'Loading ...'
	},
	lightbox : {
		text : 'Light on the media',
		keyword : 'Light'
	},
	ig : {
		menu_prefs : 'Reader+ preferences',
		menu_theme : 'Reader+ theme',
		menu_randomtheme : 'Change theme :'
	},
	menu : {
		label : 'Extra',
		showallfolders : 'Display all folders'
	},
	actions : {
		text : 'Actions icons'
	},
	portal : {
		readmore : 'Read more (Ctrl+click to show actions)'
	},
	stars : {
		text : 'Multiple stars',
		keyword : 'Stars'
	},
	translate : {
		keyword : 'Translate'
	}
};
GRP.langs[locale].prefs = {
	global : {
		title : "Reader Plus",
		"val-save" : "Save",
		alreadyexist : "Item already exists!",
		snew : 'new!',
		supdated : 'Updated!',
		stodo : 'todo!',
		soff : 'off!',
		prefssaved : "Preferences saved!",
		cachecleared : "Cache cleared!",
		expandall : 'All'
	},
	theme : {
		mytheme : 'Use <a href="http://code.google.com/p/googlereaderplus/wiki/Backgrounds" target="blank">custom background picture</a> and font color with skin "MyTheme" (<a href="http://code.google.com/p/googlereaderplus/wiki/Themes" target="blank">Preview</a>)',
		/*url: 'Picture URL',*/
		color : 'Text color',
		bg : 'Background color',
		/*repeat: 'Tiled Picture ',*/
		externaltheme : 'Google/Gmail theme',
		imgrbg : 'Repeated background',
		imgsbg : 'Background',
		imgrh : 'Repeated header',
		imgh : 'Header',
		imghr : 'Right header',
		imghl : 'Left header',
		imgrf : 'Repeated footer',
		imgf : 'Footer',
		imgfr : 'Right footer',
		imgfl : 'Left footer',
		ncolumns : 'Number of columns'
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
		//thanks1 : '<td><span class="top_right"><img src="images/48.png"></span><h1>Thank you...</h1><p>... for installing (or updating to) the latest version of <strong>Reader Plus</strong>!</p><p>Make sure you check the <a href="preferences.html" title="Go to the preferences page"><strong>preferences page</strong></a> for configuration of the extension.</p>	<p>To get an overview, just click <a href="javascript:fp();">here</a> ! A few options will be set for you ; you could change them later.</p><p><a href="https://chrome.google.com/webstore/detail/hhcknjkmaaeinhdjgimjnophgpbdgfmg" target="_blank" title="Visit extension homepage"><strong>Visit the Google Chrome Extensions gallery page!</strong></a></p><p><a href="http://www.twitter.com/ludoo0d0a"><img src="http://twitter-badges.s3.amazonaws.com/follow_me-a.png" alt="Follow me on Twitter"/></a></p><p></p></td>',
		thanks2 : '<td><p>If you like this extension and want more features, feel free to make a donation.</p>' + '<p>In this way, I could buy a truck of coffee so that i can stay awake to write all the code :)</p><a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=FK9P8MNY9MGZL&lc=US&item_name=GoogleReaderPlus%20project&currency_code=EUR&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted"><img alt="Donate" border="0" src="https://www.paypal.com/en_US/i/btn/btn_donate_SM.gif" width="74" height="21"></a></td>',
		//whatsnew: '<td> <h2>What\'s new!!</h2> <ul> <li>Sync settings in your Google Docs (1 profile for multiple computers)</li><li>Try the new themes</li> <li>Toggle theme shortcut (Alt X)</li> <li>Spanish supported now</li> <li>Bugfixes</li></ul><p class="center"><img src="http://googlereaderplus.googlecode.com/svn/trunk/GoogleReaderPlus/screenshots/button/popup1.png"/></p><h2>And still ...</h2><ul><li>Cloud experience : Use shared configuration for favicons and replacer</li> <li>Toolbar button shows now a popup with last unread items and a fast tooltip preview</li> <li>or use a custom background with the new theme \'MyTheme\'</li> <li>or use a random <a href="http://www.google.com/ig/directory?type=themes" target="blank">iGoogle</a> theme</li><li>Preview as lightbox</li> <li>Share items using <a href="http://www.readitlater.com" target="blank">ReadItLater</a></li> <li>Entry actions as floating window (general)</li> <li>Translate news</li> </ul> </td>',
		nopopup : '<p>If you don\'t want to be alerted on new version updates, check option "No popup on updates" in <a href="preferences.html#general">General section</a>.</p>'
	},
	link : {
		reader : "<span>Google Reader</span>Your RSS reader",
		issues : "<span>Report issue</span>Found a bug or suggestion ?",
		download : "<span>Google Extension</span>The place to download",
		about : "<span>About</span>About, thanks,...",
		site : "<span>Website</span>My personal website",
		twitter : "<span><img width=\"160\" height=\"27\" src=\"http://twitter-badges.s3.amazonaws.com/follow_me-a.png\" alt=\"Follow ludoo0d0a on Twitter\"></span>Follow news and updates",
		donate : '<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&amp;business=FK9P8MNY9MGZL&amp;lc=US&amp;item_name=googlereaderplus%20project&amp;currency_code=EUR&amp;bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted"><span><img alt="Donate" border="0" src="https://www.paypal.com/en_US/i/btn/btn_donate_SM.gif" width="74" height="21"></span>Offer me a coffee!</a>',
		translate : '<span>Translation</span>Help me to translate</a>'
	},
	column : {
		count : "Columns number",
		locked : "Always actived, except following feeds:",
		pagebreak : "Break long articles so long articles can be read page by page like a newspaper.",
		miniparas : "Number of paragraphs minimum before split into columns",
		entersite : "Enter URL of the site"
	},
	translate : {
		lang : "Translate content into ",
		locked : "Always actived, except for:",
		include : "Only include following feeds:",
		entersite : "Enter URL of the site"
	},
	twitter : {
		shortener : "Shortener",
		shortener_bitly : "BitLy configuration (optional):",
		shortener_login : "Login",
		shortener_apikey : "ApiKey",
		shortener_pwd : "Password"
	},
	weibo : {
		shortener : "Shortener",
		shortener_bitly : "BitLy configuration (optional):",
		shortener_login : "Login",
		shortener_apikey : "ApiKey",
		shortener_pwd : "Password"
	},
	instapaper : {
		auth : "<a href='http://www.instapaper.com' target='blank'>Instapaper</a> authentication:",
		username : "Email:",
		password : "Password (optional):"
	},
	readitlater : {
		auth : "<a href='http://www.readitlaterlist.com' target='blank'>ReadItLater</a> <a href='http://readitlaterlist.com/signup' target='blank'>authentication</a> (required):",
		username : "Username:",
		password : "Password:"
	},
	radbox : {
		auth : "<a href='http://radbox.me/support/extras' target='blank'>Radbox</a> <a href='http://radbox.me/account/user/register' target='_blank'>authentication</a> (required):",
		username : "Userkey:"
	},
	tumblr : {
		auth : "<a href='http://www.tumblr.com' target='blank'>Tumblr</a> authentication (required):",
		blogname : "Blog:",
		username : "Email:",
		password : "Password:"
	},
	reddit : {
		auth : "<a href='http://www.reddit.com' target='blank'>Reddit</a> authentication (required):",
		username : "Username:",
		password : "Password:"
	},
	diigo : {
		auth : "<a href='http://www.diigo.com' target='blank'>Diigo</a> authentication (required):",
		username : "Username:",
		password : "Password:"
	},
	plusone : {
		text : 'Share with Google+',
		keyword : 'Google+'
	},
	identi : {
		shortener : "Shortener",
		shortener_bitly : "BitLy configuration (optional):",
		shortener_login : "Login",
		shortener_apikey : "ApiKey",
		shortener_pwd : "Password"
	},
	addthis : {
		layout : 'Layout',
		layoutdesc : 'Various formats are explained on <a href="http://www.addthis.com/web-button-select" target="_blank">this page</a>'
	},
	gmarks : {
		link : 'My <a href="https://www.google.com/bookmarks/l#!g=Time" target="_gmarks">Google Bookmarks</a>'
	},
	pinboard : {
		auth : "<a href='http://www.pinboard.in' target='blank'>Pinboard</a> <a href='http://pinboard.in/signup/' target='blank'>authentication</a> (required):",
		username : "Username:",
		password : "Password:"
	},
	colorful : {
		tree : "Show label colors in the left navigation tree",
		usebasecolor : "Use following base colors :",
		background : "Background color",
		color : "Fore color"
	},
	general : {
		counter : "Display unread counter in the toolbar icon",
		counterinterval : "Refresh unread counter every (min)",
		pageicon : 'Activate icon in the address bar (click will open a menu)',
		stats : 'Enable anonymous statistics reporting (for a better support)',
		secure : "Always force use of secure protocol (https)",
		noupdatepopup : "No popup on updates",
		icontoolbar_add : "To add button with icon in toolbar, please <a href=\"https://chrome.google.com/webstore/detail/ecpcafinfpjgabomoamkhkgnpgpmdmeo\">download and install it</a>.",
		icontoolbar_text : "<span>To make the button optional, we put him in an another extension as standalone,</span>                                    <br>                                    <span>to be installed along with readerplus.</span>                                    <br>                                    <span>To add the button, click <b></b> on the <a href=\"https://chrome.google.com/webstore/detail/ecpcafinfpjgabomoamkhkgnpgpmdmeo\">readerplus Toolbar button</a> page.</span><span>To remove the button, right click him and choose Disable.</span>",
		importexport_text : "You can now save your preferences using 'export' and reload it later using 'import', but be sure data are <a href='http://jsonformatter.curiousconcept.com/' target='blank'>JSON compliant</a>:",
		confirmimport : "Are you sure to import this configuration?\nCurrent configuration will be LOST!",
		confirmsyncload : "Are you sure to import this configuration from your Google's account?\nCurrent configuration will be LOST!",
		prefsimportedok : 'Preferences succesfully imported!',
		prefsimportfailed : 'Import failed!',
		prefsimportnull : 'No saved preferences found!',
		syncprefs_text : 'Load/save using your Google\'s account',
		prefssavedok : 'Preferences succesfully saved!',
		prefssavedfailed : 'Preferences save failed!',
		text_layout : 'Layout options',
		text_private : 'Private data and updates',
		text_toolbaricon : 'Toolbar icon',
		text_pageicon : 'Address bar icon',
		text_export : 'Export/import'
	},
	generallayout:{
		noborder : "Remove entries borders to display more items on a single page",
		topcurrent : "Current entry always on top",
		bottomup : 'Footer toolbar on the top',
		currdir : 'Highlight folder of current entry',
		floatactions : "Entry actions are displayed as a floating window",
		icons : 'Icons only for action buttons (except checkbox)',
		hidetoolbar: 'Hide user toolbar',
		floatbar: 'New float bar mimic',
		newbar: 'Activate new Google interface (menu on logo)',
		oldbar: 'Restore old fixed Google bar',
		hideplus: 'Hide GooglePlus button'
	},
	compact:{
		hide_bar:'Hide bar',
		hide_search:'Hide search',
		hide_subscription:'Hide subscription',
		hide_nav:'Hide navigation',
		searchinbar:'Search in bar'
	},
	limit : {
		slidewindow : "Slidewindow - limit entries number",
		mini : "Minimum items",
		maxi : "Maximum items"
	},
	prefetch : {
		first : "Initial loading items number on the expanded view.",
		next : "Loading items when scrolling on the expanded view. ",
		list : "Initial fetch on the list view."
	},
	nested : {
		separator : "Separator to add extra level (example: Sports:Footbal)."
	},
	removeads : {
		links : "Link filter:",
		images : "Image filter:",
		iframes : "Iframe filter:",
		preview : "Highlight preview filter"
	},
	preview : {
		onicon : "Show integrated preview when click on icon right after the title (if not checked, on title)",
		locked : "Always actived, except following feeds:",
		overlay : 'Fullscreen preview (Lightbox)',
		loading : 'Display "Loading in progress"'
	},
	fitheight : {
		locked : "Always actived, except following feeds:"
	},
	filter : {
		help:'See <a target="_blank" href="http://code.google.com/p/googlereaderplus/wiki/Filter">guide</a> for details.',
		highlights : 'Highlights list (one item per line)',
		excludes : 'Excludes list (one item per line)',
		searchbody : 'Search in whole body text',
		detect_duplicates : 'Detect Duplicates',
		hide_duplicates : 'Hide Duplicates',
		hide_excludes : 'Hide Excludes',
		prefer_highlights : 'Prefer Highlights over excludes',
		live : 'Live',
		word_mini : 'Minimum number of letters for a word',
		button : 'Filter button on each entry'
	},
	favicons : {
		providerpageicons : 'Use <a href="http://pageicons.appspot.com" target="blank">PageIcons</a> provider (Recommended to load succesfully all icons)',
		sidebaronly : "Show favicons in sidebar only",
		cloud : 'Use cloud database <a href="http://wedata.net/databases/Favicons/items" target="blank">wedata/Favicons</a> so that community completes favicons',
		custom : "Enter your custom favicons :",
		add : "Add",
		tip : "Tip: You could add it easily using the contextual menu \"Get favicon\" of the left side bar",
		manual : "Manual favicons for all sites (not recommended ; slower)",
		parsing : "This will try to detect favicon by parsing each homepage",
		entersite : "Enter URL of the site",
		prompticon : "Enter the icon url (let empty to get it automatically):"
	},
	replacer : {
		intro : '<a href="http://code.google.com/p/googlereaderplus/wiki/ReplacerHowto" target="blank">Help on how to use replacer</a>',
		cloud : 'Use online expressions from <a href="http://wedata.net/databases/Replacer/items" target="blank">wedata/Replacer</a> cloud database',
		link : "Link Regex",
		from : "Search regex/xpath/css",
		to : "Replace",
		prompttitle : "Title for this filter"
	},
	rank : {
		level : 'Display level',
		ad : 'Ranking is powered by <a href="http://www.postrank.com" target="_blank"><img src="http://www.postrank.com/images/navigation/head_logo.png"/></a> <i>Intelligence from the social web</i><br/><br/><span class="warning center">Since Google has bought Postrank , used API is deprecated. I cannot guarantee this feature will still work.</span>'
	},
	readability : {
		intro : 'Display the whole cleaned content of the news',
		bigger: 'Texte plus grand',
		locked : "Always actived, except for:",
		include : "Only include following feeds:",
		ad : 'Readability is powered by <a href="http://www.readability.com?from=readerplus" target="_blank"><img src="http://www.readability.com/media/images/logo_chair.png"/></a> <br/><i>Read Comfortably—Anytime, Anywhere</i><br/>Return to distraction–free reading while supporting writers & publishers'
	},
	coverflow : {
		coverflow : 'Coverflow / Slideshow',
		reflection : 'Use reflection',
		caption : 'Display captions',
		sync : 'Sync items',
		footer : 'As footer'
	},
	jump : {
		staticdown : 'Floating icon \'go down\' for current entry'
	},
	mark : {
		asscroll : 'Mark as read past items on scroll'
	},
	lightbox : {
		locked : "Always actived, except following feeds:"
	},
	relook : {
		css : "CSS stylesheet",
		less: 'Use <a href="http://lesscss.org">LESS</a> dynamic language',
		resize : "Fire resize event to adapt fullscreen"
	},
	pack : {
		mini : "<span>Package Mini</span>The minimum for best reading",
		ludoo : "<span>Package LudoO</span>The best features in one click",
		full : "<span>Package Full</span>All features activated",
		reset : "<span>Package Reset</span>Reset your configuration",
		confirmdel : "This will ERASE and reset all your preferences. Are you sure ?",
		done : "The new package is selected. Save now."
	},
	extshortcuts : {
		custom : "Your custom Shortcuts",
		official : "Google Reader official shortcuts",
		alreadyusedprefs : "Already used in your preferences!",
		alreadyusedgoogle : "Already used by Google!"
	},
	thanks : {
		donators : "Thanks to donators to contribute to this project",
		translators : "Thanks to brave translators for their wonderful work",
		authors : "Thanks to authors of original scripts and skins (Greasemonkey and Stylish)"
	}
};
