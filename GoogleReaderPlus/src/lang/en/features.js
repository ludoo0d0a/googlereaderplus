/**
 * ReaderPlus
 * Translation for features
 *
 * **************************
 * fr : English
 * **************************
 *
 * For translators : please keep major version or original for your translations !
 * Use minor version for yours translations
 * so that 0.3.11 is the 11th translated version of the original v0.3 english version.
 *
 *
 * Version : 1.5
 * Date : 09-09-2010
 * @author Valente
 */
var locale = 'en';
namespace('GRP.langs.' + locale);
GRP.langs[locale].categories = {
	main: 'Main',
	theme: 'Theme/skins',
	icons:'Icons',
	counter:'Counter',
	layout: 'Layout',
	navigation: 'Navigation',
	share: 'Share',
	action: 'Action',
	content: 'Content'
};
GRP.langs[locale].scripts = {
    general: {
        name: "General",
        desc: "General configuration"
    },
    theme: {
        name: "Theme",
        desc: "Change the look of GoogleReader"
    },
    ig: {
        name: "iGoogle Theme",
        desc: "Use <a href='http://www.google.com/ig/directory?type=themes' target='blank'>iGoogle Theme</a> in your Google Reader (Beta)"
	},
    relook: {
        name: "Relook",
        desc: "Relook your site using custom stylesheets"
    },
    favicons: {
        name: "Favicons",
        desc: "Display favicons for every feed"
    },
    unreadcount: {
        name: "Show all unread count",
        desc: "Show all feeds unread count"
    },
    fixlayout: {
        name: "Fix layout",
        desc: "Fix different layout bugs style like full width for entry, fix missing pictures in enclosures, and make big images fit the screen"
    },
    count: {
        name: "Fix counter (1000+)",
        desc: "Display real unread count"
    },
    counticon: {
        name: "Icon counter",
        desc: "Dislay unread count in the Google Reader favicon"
    },
    removeads: {
        name: "Remove ads",
        desc: "Simple advertising blocker"
    },
    column: {
        name: "Text multi columns",
        desc: "Display news as a newspaper in multi columns"
    },
    preview: {
        name: "Preview",
        desc: "Display original page content instead feed entry"
    },
    colorful: {
        name: "Colorful listview",
        desc: "Use a background color for a same feed"
    },
    filter: {
        name: "Filter",
        desc: "Filter entries by removing or highligting items based on user terms"
    },
	rank: {
        name: "Rank",
        desc: "Display popularity of items based on ranking provided by <a href='http://www.postrank.com' target='blank'>PostRank™</a>"
    },
	limit: {
        name: "Limit entries",
        desc: "Limit entries number in one page. Read items are removed to fit in a range"
    },
	prefetch: {
        name: "Prefetch more",
        desc: "Loading more entries at the same time for a smoother navigation"
    },
	nested: {
        name: "Nested folders",
        desc: "Multiple level on folders"
    },
    readbymouse: {
        name: "Read by mouse",
        desc: "Next/previous item using right/left mouse click"
    },
    facebook: {
        name: "Facebook",
        desc: "Add a button to share news using <a href='http://www.facebook.com' target='_facebook'>Facebook</a>"
    },
    twitter: {
        name: "Twitter",
        desc: "Add a button to share news using <a href='http://www.twitter.com' target='_twitter'>Twitter</a>"
    },
    instapaper: {
        name: "Instapaper",
        desc: "Add a button to read news later using <a href='http://www.instapaper.com' target='_instapaper'>Instapaper</a>"
    },
	readitlater: {
        name: "ReadItLater",
        desc: "Add a button to read news later using <a href='http://www.readitlater.com' target='_readitlater'>ReadItLater</a>"
    },
    readabilitylater: {
        name: "Readability",
        desc: "Add a button to read news later using <a href='http://www.Readability.com' target='_readabilitylater'>Readability</a>"
    },
	blogger: {
        name: "Blogger",
        desc: "Add a button to read news later using <a href='http://www.blogger.com' target='_blogger'>Blogger</a>"
    },
	tumblr: {
        name: "Tumblr",
        desc: "Add a button to read news later using <a href='http://www.tumblr.com' target='_tumblr'>Tumblr</a>"
    },
	pinboard: {
        name: "Pinboard",
        desc: "Add a button to read news later using <a href='http://www.pinboard.in' target='_pinboard'>Pinboard</a>"
    },
	reddit: {
        name: "Reddit",
        desc: "Add a button to read news later using <a href='http://www.reddit.com' target='_reddit'>Reddit</a>"
    },
    gmarks: {
        name: "Google Bookmarks",
        desc: "Add a button to read news later using <a href='http://bookmarks.google.com' target='_gmarks'>Google Bookmarks</a>"
    },
    mark: {
        name: "Mark As Read",
        desc: "Mark items before/after current as read"
    },
    jump: {
        name: "Add top/bottom links",
        desc: "Add a 'goto bottom' icon on top entry and a 'goto top' on bottom entry"
    },
    fitheight: {
        name: "Fit height",
        desc: "Fit height of the current news to the screen height (for long articles)"
    },
    diaporama: {
        name: "Diaporama",
        desc: "Scroll your news at your desired speed"
    },
    closeentry: {
        name: "Close entry",
        desc: "Add a 'close' button on each entry to remove it"
    },
    openbackground: {
        name: "Open in background",
        desc: "Add a 'open in background' button on each entry"
    },
	translate: {
        name: "Translate",
		desc: "Translate text and title for entries"
    },
    replacer: {
        name: "Replacer",
        desc: "Replace entry with a part of the original page. Currently used to get comic strips.<br/>Thanks to jolan78 for its original idea and script."
    },
    aero: {
        name: "Google Aero Toolbar",
        desc: "Toolbar using Aero theme"
    },
	actions: {
        name: "Actions icons",
        desc: "Use icons only for actions button on the bottom of entry"
    },
    info: {
        name: "SysInfo",
        desc: "System information"
    },
    extshortcuts: {
        name: "Shortcuts",
        desc: "Keyboard shortcuts"
    },
    pack: {
        name: "Packages",
        desc: "Predefined configuration packages"
    },
    thanks: {
        name: "Thanks",
        desc: ""
    },
    about: {
        name: "About",
        desc: "About ReaderPlus"
    }
};
GRP.langs[locale].skins = {
    none: {
        name: "None"
    },
    air: {
        name: "Air Skin"
    },
    aircomic: {
        name: "Air Skin Comic Sans"
    },
    black: {
        name: "Google Enhanced Black"
    },
    dark: {
        name: "Dark Skin"
    },
    darkgray: {
        name: "Dark Gray Skin"
    },
    helvetireader: {
        name: "Helvetireader Skin"
    },
    minimal: {
        name: "Minimalistic Skin"
    },
    optimized: {
        name: "Optimized Skin"
    },
    portal: {
        name: "Portal Theme"
    },
    player: {
        name: "Player Theme"
    },
    osxblue: {
        name: "Mac OS X Snow Leopard - Blue"
    },
    osxblack: {
        name: "Mac OS X Snow Leopard - Black"
    },
	calibri: {
        name: "Calibri Skin"
    },
    glassblackgold: {
        name: "Glass Black Gold Skin"
    },
    simpleclean: {
        name: "Simple and Clean"
    },
    peacockfeather: {
        name: "Peacock Feather"
    },
    myowngooglereader: {
        name: "My Own Google Reader"
    },
    compactcleantweaked: {
        name: "Compact, Clean & Tweaked"
    },
    absolutelycompact: {
        name: "Absolutely Compact"
    },
    darkshinyblue: {
        name: "Dark Shiny Blue"
    },
	persian: {
        name: "Optimized Persian"
    }
};
