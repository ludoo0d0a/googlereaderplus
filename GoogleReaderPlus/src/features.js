/**
 * @author Valente
 */
GRP.scripts = [
{
    id: "theme",
    name: "Theme",
    desc: "Change the look of GoogleReader",
    options: 
    {
        skin: ''
    }
}, 
{
    id: "favicons",
    name: "Favicons",
    desc: "Display favicons for every feed",
    options: 
    {
        manual: '',
        domains: {}
    }
}, 
{
    id: "unreadcount",
    name: "Show all unread count",
    desc: "Show all feeds unread count"
}, 
{
    id: "fixlayout",
    name: "Fix layout",
    desc: "Fix different layout bugs style like full width for entry, fix missing pictures in enclosures, and make big images fit the screen"
}, 
{
    id: "count",
    name: "Fix counter (1000+)",
    desc: "Display real unread count"
}, 
{
    id: "counticon",
    name: "Icon counter",
    desc: "Dislay unread count in the Google Reader favicon"
}, 
{
    id: "removeads",
    name: "Remove ads",
    desc: "Simple advertising blocker",
    options: 
    {
        links: "da\.feedsportal\.com|res\.feedsportal\.com|doubleclick\.net|/ads",
        images: "feedsportal\.com|doubleclick\.net|/ads",
        iframes: "feedsportal\.com|doubleclick\.net|googlesyndication\.com/pagead/ads"
    }
}, 
{
    id: "column",
    name: "Text multi columns",
    desc: "Add abutton to display news as a newspaper in multi columns",
    options: 
    {
        locked: false,
        count: 0
    },
    //shortcut: "c",
    shortcuts: 
    {
        'columns': 
        {
            id: 'columns',
            title: 'Multi columns',
            key: 
            {
                //67 c
				keyCode: 67
            }
        }
    }
}, 
{
    id: "preview",
    name: "Integrated preview",
    desc: "Add a button to show entire original page instead the entry",
    options: 
    {
        locked: false
    },
    //shortcut: "shift+R",
    shortcuts: 
    {
        'prview': 
        {
            id: 'prview',
            title: 'Entry preview',
            key: 
            {
                //81 q
				keyCode: 81
            }
        }
    }
}, 
{
    id: "colorful",
    name: "Colorful listview",
    desc: "Use a background color for a same feed",
	options: 
    {
        tree: false
    }
}, 
{
    id: "filter",
    name: "Filter entries",
    desc: "Filter entries by removing or highligting items based on user terms"
}, 
{
    id: "readbymouse",
    name: "Read by mouse",
    desc: "Middle click not available on Windows",
    desc: "Next/previous item using right/left mouse click"
}, 
{
    id: "facebook",
    name: "Facebook integration",
    desc: "Add a button to share news using Facebook",
    shortcuts: 
    {
        'gofacebook': 
        {
            id: 'gofacebook',
            title: 'Post on Facebook',
            key: 
            {
                 //70 f
				 keyCode: 70
            }
        }
    }
}, 
{
    id: "twitter",
    name: "Twitter integration",
    desc: "Add a button to share news using Twitter",
    shortcuts: 
    {
        'tweet': 
        {
            id: 'tweet',
            title: 'Post on Twitter',
            key: 
            {
                 //87 w
				 keyCode: 87
            }
        }
    }
}, 
{
    id: "instapaper",
    name: "Instapaper integration",
    desc: "Add a button to read news later using Instapaper",
    shortcuts: 
    {
        'readitlater': 
        {
            id: 'readitlater',
            title: 'Read Later with Instapaper',
            key: 
            {
                 //73 i
				 keyCode: 73
            }
        }
    }
}, 
{
    id: "mark",
    name: "Mark As Read",
    desc: "Mark items before/after current as read",
    //shortcut: "before: w ; after: x",
    shortcuts: 
    {
        'markprev': 
        {
            id: 'markprev',
            title: 'Mark items before As Read',
            key: 
            {
                 //87 w
				 keyCode: 87
            }
        },
        'marknext': 
        {
            id: 'marknext',
            title: 'Mark items after As Read',
            key: 
            {
                //75 x
				keyCode: 75
            }
        }
    }
}, 
{
    id: "jump",
    name: "Add top/bottom links",
    desc: "Add a 'goto bottom' icon on top entry and a 'goto top' on bottom entry",
    //shortcut: "shift+T: goto top ; shift+B : goto bottom",
    shortcuts: 
    {
        'goup': 
        {
            id: 'goup',
            title: 'Goto top',
            key: 
            {
                //84 Shift+T
				keyCode: 84,
				shiftKey:true
            }
        },
        'godown': 
        {
            id: 'godown',
            title: 'Goto bottom',
            key: 
            {
                //66 Shift+B
				keyCode: 66,
				shiftKey:true
            }
        }
    }
}, 
{
    id: "fitheight",
    name: "Fit height",
    desc: "Fit height of the current news to the screen height (for long articles)",
    shortcuts: 
    {
        'fit': 
        {
            id: 'fit',
            title: 'Fit height',
            key: 
            {
                //72 h
				keyCode: 72
            }
        }
    }
}, 
{
    id: "closeentry",
    name: "Close entry",
    desc: "Add a 'close' button on each entry to remove it",
    //shortcut: "x",
    shortcuts: 
    {
        'close': 
        {
            id: 'close',
            title: 'Close entry',
            key: 
            {
                //88 x
				keyCode: 88
            }
        }
    }

}, 
{
    id: "openbackground",
    name: "Open in background",
    desc: "Add a 'open in background' button on each entry",
    //shortcut: "shift + V : open in background tab",
    shortcuts: 
    {
        'openback': 
        {
            id: 'openback',
            title: 'Open in background tab',
            key: 
            {
                shiftKey: true,
                keyCode: 86
            }
        }
    }
}, 
{
    id: "menu",
    name: "Intuitive menu",
    desc: "Intuitive menu to add extra capabilites"
}, 
{
    id: "aero",
    name: "Google Aero Toolbar",
    desc: "Toolbar using Aero theme"
}, 
{
    id: "info",
    name: "SysInfo",
    desc: "System information",
    link: true
}, 
/*{
 id: "readershortcuts",
 name: "Keyboard shortcuts",
 desc: "Original keyboard shortcuts",
 url: 'http://www.google.com/support/reader/bin/answer.py?hl=en&answer=69973',
 link: true
 }, */
{
    id: "extshortcuts",
    name: "Shortcuts",
    desc: "Keyboard shortcuts",
    link: true
}, 
{
    id: "pack",
    name: "Packages",
    desc: "Predefined configuration packages",
    link: true

}, 
{
    id: "thanks",
    name: "Thanks",
    desc: "",
    link: true

}, 
{
    id: "about",
    name: "About",
    desc: "About GoogleReaderPlus",
    url: 'about.html',
    link: true

}];

GRP.packages = 
{
    'mini': ['favicons', 'unreadcount', 'fixlayout', 'count', 'counticon', 'removeads'],
    'ludoo': ['favicons', 'unreadcount', 'fixlayout', 'count', 'counticon', 'removeads', 'column', 'mark', 'jump', 'fitheight', 'closeentry', 'openbackground'],
    'full': ['theme', 'favicons', 'unreadcount', 'fixlayout', 'count', 'counticon', 'removeads', 'column', 'mark', 'jump', 'preview', 'colorful', 'filter', 'readbymouse', 'twitter', 'facebook', 'fitheight', 'closeentry', 'openbackground', 'aero']
};

GRP.skins = [
{
    id: "none",
    name: "None"
}, 
{
    id: "air",
    name: "Air Skin"
}, 
{
    id: "aircomic",
    name: "Air Skin Comic Sans"
}, 
{
    id: "black",
    name: "Google Enhanced Black"
}, 
{
    id: "dark",
    name: "Dark Skin"
}, 
{
    id: "darkgray",
    name: "Dark Gray Skin"
}, 
{
    id: "helvetireader",
    name: "Helvetireader Skin"
}, 
{
    id: "minimal",
    name: "Minimalistic Skin"
}, 
{
    id: "optimized",
    name: "Optimized Skin"
}, 
{
    id: "portal",
    name: "Portal Theme"
}, 
{
    id: "osxblue",
    name: "Mac OS X Snow Leopard - Blue"
}, 
{
    id: 'osxblack',
    name: "Mac OS X Snow Leopard - Black"
}];
GRP.googleshortcuts = 
{
    'j': 'item down',
    'k': 'item up',
    'space': 'page down',
    'shift+space': 'page up',
    'n': 'scan down',
    'p': 'scan up',
    'shift+n': 'navigation down',
    'shift+p': 'navigation up',
    'shift+x': 'navigation expand/collapse',
    'o': 'open/close item',
    'enter': 'open/close item',
    'shift+o': 'navigation open subscription',
    '-': 'zoom out',
    '=': 'zoom in',
    's': 'toggle star',
    'shift+s': 'toggle share',
    'shift+d': 'share with note',
    'v': 'view original',
    't': 'tag an item',
    'm': 'mark as read/unread',
    'shift+a': 'mark all as read',
    'e': 'email item',
    'g': 'go to...',
    'r': 'refresh',
    'u': 'toggle full screen mode',
    '1': 'expanded view',
    '2': 'list view',
    '/': 'search',
    'a': 'add a subscription',
    '?': 'help'
};

