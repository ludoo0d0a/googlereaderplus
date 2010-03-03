/**
 * @author Valente
 */
GRP.scripts = [
{
    id: "general",
    name: "General",
    options: 
    {
        secure:false,
		counter: true,
		opendirect:false,
		icontoolbar_add:{xtype:'p'},
		icontoolbar_text:{xtype:'p'}
    }
},
{
    id: "theme",
    name: "Theme",
    options: 
    {
        skin: '',
		noborder:false
    }
}, 
{
    id: "favicons",
    name: "Favicons",
    options: 
    {
        sidebaronly:false,
		custom:{xtype:'p'},
/*		domains: {xtype:'crud', value:'<div id="crud_domains"><ul class="mnu crud" id="favicon_crud"></ul><a id="t_favicons_add" class="add" href="javascript:addfavicon();">Add</a></div>'},*/
		domains: {xtype:'crud'},
		tip:{xtype:'p'},
		manual: false,
		parsing:{xtype:'p'}
    }
}, 
{
    id: "unreadcount",
    name: "Show all unread count"
}, 
{
    id: "fixlayout",
    name: "Fix layout"
}, 
{
    id: "count",
    name: "Fix counter (1000+)"
}, 
{
    id: "counticon",
    name: "Icon counter"
}, 
{
    id: "removeads",
    name: "Remove ads",
    options: 
    {
        links: {xtype:'textarea', value:"da\.feedsportal\.com|res\.feedsportal\.com|doubleclick\.net|/ads"},
        images: {xtype:'textarea', value:"feedsportal\.com|doubleclick\.net|/ads"},
        iframes: {xtype:'textarea', value:"feedsportal\.com|doubleclick\.net|googlesyndication\.com/pagead/ads"}
    }
}, 
{
    id: "column",
    name: "Text multi columns",
    options: 
    {
        locked: false,
        count: 3,
		/*maxcolumns:6,*/
		pagebreak:true
    },
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
    options: 
    {
        onicon:false,
		locked: false
		/*,adjustframe: false*/
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
	options:{
		tree:false
	}
}, 
{
    id: "filter",
    name: "Filter entries"
}, 
{
    id: "readbymouse",
    name: "Read by mouse"
}, 
{
    id: "facebook",
    name: "Facebook integration",
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
	options: 
    {
		shortener: 
		{
			xtype: 'select',
			values:{
				tinyurl:  'TinyUrl',
				bitly: 'BitLy'
			}
		},
		shortener_bitly:{xtype:'p', cls:'subtitle'},
		shortener_login:{value:'', size:20},
		shortener_apikey:{value:'', size:30}
    },
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
    options: 
    {
        auth: {xtype:'p', cls:'subtitle'},
		username: '',
		password:''
    },
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
                //89 y
				keyCode: 89
            }
        }
    }
}, 
{
    id: "jump",
    name: "Add top/bottom links",
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
	options:{
		locked:false
	},
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
    id: "replacer",
    name: "Replacer",
    options: 
    {
        link: {xtype:'textarea', value:'http://feedproxy.google.com/~r/uclick/|http://www.gocomics.com/|http://feeds.gocomics.com/\nhttp://feedproxy.google.com/~r/uclick/|http://www.gocomics.com/|http://feeds.gocomics.com/'},
        from: {xtype:'textarea', value:"\"(http:\/\/imgsrv.gocomics.com\/dim\/[^\"]*)\"\n<SPAN id='comment_count_display'>(\d*)</SPAN>"},
        to: {xtype:'textarea', value:"<img src='$1'><br>\nComments: $2"}
    }
},
/*
{
    id: "menu",
    name: "Intuitive menu",
    desc: "Intuitive menu to add extra capabilites"
}, */
{
    id: "aero",
    name: "Google Aero Toolbar"
}, 
{
    id: "info",
    name: "SysInfo",
    link: true,
	options:{
		sysinfo:{xtype:'html', value:'<div id="sysinfo"></div>'}
	}
}, 
{
    id: "extshortcuts",
    name: "Shortcuts",
    link: true
}, 
{
    id: "pack",
    name: "Packages",
    link: true

}, 
{
    id: "thanks",
    name: "Thanks",
    link: true

}
/*,{
    id: "about",
    name: "About",
    url: 'about.html',
    link: true

}*/
];

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

