/**
 * @author Valente
 */
GRP.scripts = {
    general: {
        name: "General",
        options: {
            secure: false,
            counter: true,
            opendirect: false,
            icontoolbar_add: {
                xtype: 'p'
            },
            icontoolbar_text: {
                xtype: 'p'
            },
            importexport_text: {
                xtype: 'p'
            },
            preferences: {
                xtype: 'html',
                value: '<input id="ieprefs" type="text" size="30"/><input type="button" id="bimport" value="import" onclick="importprefs();"/><input type="button" id="bexport" value="export" onclick="exportprefs();"/>'
            }
        }
    },
    theme: {
        name: "Theme",
        options: {
            skin: '',
            noborder: false,
            mytheme: {
                xtype: 'p',
				parent:'mto'
            },
            url: {
                value: 'http://media.smashingmagazine.com/cdn_smash/wp-content/uploads/uploader/wallpapers/march10/march-10-ultimate-sophistication-nocal-1280x1024.jpg',
                size: 80,
				parent:'mto'
            },
            color: {
                value: '#565656',
                cls: 'picker',
				parent:'mto'
            },
            bg: {
                value: '#FFC',
                cls: 'picker',
				parent:'mto'
            }
        }
    },
    relook: {
        name: "Relook",
        desc: "Relook yourself GoogleReader using custom stylesheets",
        options: {
            resize: false,
            css: {
                xtype: 'textarea',
                cls: 'code',
                rows: 40,
                value: '/* This CSS sample alternates green entry, red border */\n/* green entry */\n.entry:nth-child(even) .card-common, \n.entry:nth-child(even) .card-actions, \n#entries .entry:nth-child(even) .collapsed {\n border:1px solid #FFACAC;\n}\n/* red border */\n.entry:nth-child(odd) .card-common, \n.entry:nth-child(odd) .card-actions, \n#entries .entry:nth-child(odd) .collapsed {\n background-color:#C4DFC0;\n}\n'
            }
        }
    },
    ig: {
        name: "iGoogle Theme",
        desc: "Use iGoogle Theme in your Google Reader (Beta)",
        options: {
			skin_name:{
                value: '',
                size: 80
            },
			skin_url: {
                value: '',
                size: 80
            },
			skin_id:{xtype:'hidden'},
			debug:false,
			randomtime:true,
			userandomthemes:false,
			randomthemes:30,
			themes:{xtype:'html', value:'<div id="ig_themes"></div>'}
        }
    },
    favicons: {
        name: "Favicons",
        options: {
            providerpageicons: false,
            sidebaronly: false,
            custom: {
                xtype: 'p'
            },
            domains: {
                xtype: 'crud'
            },
            tip: {
                xtype: 'p'
            },
            manual: false,
            parsing: {
                xtype: 'p'
            }
        }
    },
    unreadcount: {
        name: "Show all unread count"
    },
    fixlayout: {
        name: "Fix layout"
    },
    count: {
        name: "Fix counter (1000+)"
    },
    counticon: {
        name: "Icon counter"
    },
    removeads: {
        name: "Remove ads",
        options: {
            links: {
                xtype: 'textarea',
                value: "da\.feedsportal\.com|res\.feedsportal\.com|doubleclick\.net|/ads"
            },
            images: {
                xtype: 'textarea',
                value: "feedsportal\.com|doubleclick\.net|/ads"
            },
            iframes: {
                xtype: 'textarea',
                value: "feedsportal\.com|doubleclick\.net|googlesyndication\.com/pagead/ads"
            }
        }
    },
    column: {
        name: "Text multi columns",
        options: {
            count: 3,
            /*maxcolumns:6,*/
            pagebreak: true,
            locked: false,
            filter: {
                xtype: 'crud'
            }
        },
        shortcuts: {
            'columns': {
                id: 'columns',
                title: 'Multi columns',
                key: {
                    //67 c
                    keyCode: 67
                }
            }
        }
    },
    preview: {
        name: "Integrated preview",
        options: {
            onicon: false,
			overlay: false,
            locked: false,
            filter: {
                xtype: 'crud'
            }
        },
        //shortcut: "shift+R",
        shortcuts: {
            'prview': {
                id: 'prview',
                title: 'Entry preview',
                key: {
                    //81 q
                    keyCode: 81
                }
            }
        }
    },
    colorful: {
        name: "Colorful listview",
        options: {
            tree: false
        }
    },
    filter: {
        name: "Filter entries",
        options: {
            searchbody: false
        }
    },
    readbymouse: {
        name: "Read by mouse"
    },
    facebook: {
        name: "Facebook integration",
        shortcuts: {
            'gofacebook': {
                id: 'gofacebook',
                title: 'Post on Facebook',
                key: {
                    //70 f
                    keyCode: 70
                }
            }
        }
    },
    twitter: {
        name: "Twitter integration",
        options: {
            shortener: {
                xtype: 'select',
                values: {
                    tinyurl: 'TinyUrl',
                    bitly: 'BitLy'
                }
            },
            shortener_bitly: {
                xtype: 'p',
                cls: 'subtitle'
            },
            shortener_login: {
                value: '',
                size: 20
            },
            shortener_apikey: {
                value: '',
                size: 30
            }
        },
        shortcuts: {
            'tweet': {
                id: 'tweet',
                title: 'Post on Twitter',
                key: {
                    //87 w
                    keyCode: 87
                }
            }
        }
    },
    instapaper: {
        name: "Instapaper integration",
        options: {
            auth: {
                xtype: 'p',
                cls: 'subtitle'
            },
            username: '',
            password: {input:'password', value:''}
        },
        shortcuts: {
            'readitlater': {
                id: 'readitlater',
                title: 'Read Later with Instapaper',
                key: {
                    //73 i
                    keyCode: 73
                }
            }
        }
    },
	readitlater: {
        name: "ReadItLater integration",
        options: {
            auth: {
                xtype: 'p',
                cls: 'subtitle'
            },
            username: '',
            password: {input:'password', value:''}
        },
        shortcuts: {
            'ril': {
                id: 'ril',
                title: 'Read Later with ReadItLater',
                key: {
                    //76 l
                    keyCode: 76
                }
            }
        }
    },
    mark: {
        name: "Mark As Read",
        shortcuts: {
            'markprev': {
                id: 'markprev',
                title: 'Mark items before As Read',
                key: {
                    //87 w
                    keyCode: 87
                }
            },
            'marknext': {
                id: 'marknext',
                title: 'Mark items after As Read',
                key: {
                    //89 y
                    keyCode: 89
                }
            }
        }
    },
    jump: {
        name: "Add top/bottom links",
        shortcuts: {
            'goup': {
                id: 'goup',
                title: 'Goto top',
                key: {
                    //84 Shift+T
                    keyCode: 84,
                    shiftKey: true
                }
            },
            'godown': {
                id: 'godown',
                title: 'Goto bottom',
                key: {
                    //66 Shift+B
                    keyCode: 66,
                    shiftKey: true
                }
            }
        }
    },
    fitheight: {
        name: "Fit height",
        options: {
            locked: false
        },
        shortcuts: {
            'fit': {
                id: 'fit',
                title: 'Fit height',
                key: {
                    //72 h
                    keyCode: 72
                }
            }
        }
    },
    closeentry: {
        name: "Close entry",
        shortcuts: {
            'close': {
                id: 'close',
                title: 'Close entry',
                key: {
                    //88 x
                    keyCode: 88
                }
            }
        }
    },
    openbackground: {
        name: "Open in background",
        shortcuts: {
            'openback': {
                id: 'openback',
                title: 'Open in background tab',
                key: {
                    shiftKey: true,
                    keyCode: 86
                }
            }
        }
    },
    replacer: {
        name: "Replacer",
        options: {
            intro: {
                xtype: 'p'
            },
            items: {
                xtype: 'crud',
                value: {
                    "Gocomics pictures": {
                        "title": "Gocomics pictures",
                        "url": "http://feedproxy.google.com/~r/uclick/| http://www.gocomics.com/",
                        "search": "\"(http://imgsrv.gocomics.com/dim/[^\"]*)\"",
                        "replace": "<img src='$1'><br>"
                    },
                    "Gocomics comments": {
                        "title": "Gocomics comments",
                        "url": "http://feedproxy.google.com/~r/uclick/| http://www.gocomics.com/| http://feeds.gocomics.com/",
                        "search": "<SPAN id='comment_count_display'>(d*)</SPAN>",
                        "replace": "Comments: $2\n<img src='$1'><br>"
                    },
                    "Explosm pictures": {
                        "url": "http://www.explosm.net/",
                        "search": "\"(http://www.explosm.net/db/files/[^\"]*)\"",
                        "replace": "<img src='$1'><br>"
                    },
                    "Explosm videos": {
                        "title": "Explosm videos",
                        "url": "http://www.explosm.net/",
                        "search": "(<embed[^>]+>)",
                        "replace": "$1"
                    },
                    "Explosm forums": {
                        "url": "http://forums.explosm.net",
                        "search": "xpath://div[@id='posts']",
                        "replace": "$1"
                    },
                    "Penny-arcade pictures": {
                        "url": "penny-arcade.com",
                        "search": "\"(http://art.penny-arcade.com/photos/[^\"]*)\"",
                        "replace": "<img src='$1'><br>"
                    },
                    "Cad-comic pictures": {
                        "title": "cad-comic pictures",
                        "url": "http://feedproxy.google.com/~r/cad-comic/",
                        "search": "<img src=\"(/comics/[^\"]*)\"",
                        "replace": "<img src='http://www.cad-comic.com$1'><br>"
                    },
                    "Giantitp Comics": {
                        "url": "http://www.giantitp.com/comics/",
                        "search": "(/comics/images/[^\"]*)",
                        "replace": "<img src='http://www.giantitp.com$1'></br>"
                    },
                    "Userfriendly Comics": {
                        "url": "userfriendly.org",
                        "search": "src=\"(http://www.userfriendly.org/cartoons/archives/[^\"]*)",
                        "replace": "<img src='$1'></br>"
                    },
                    "Chauffeurdebuzz items": {
                        "url": "http://www.chauffeurdebuzz.com/",
                        "search": "<table.*?<table.*?<table.*?<table.*?<table.*?<td[^>]*>(.*?)</td>",
                        "replace": "$1"
                    }
                }
            }
            /*
             ,link:
             {
             xtype: 'textarea',
             value: "http://feedproxy.google.com/~r/uclick/|http://www.gocomics.com/|http://feeds.gocomics.com/\nhttp://feedproxy.google.com/~r/uclick/|http://www.gocomics.com/|http://feeds.gocomics.com/\nhttp://www.explosm.net/\nhttp://www.explosm.net/\nhttp://www.penny-arcade.com/|http://feeds.penny-arcade.com\nhttp://feedproxy.google.com/~r/cad-comic/\nhttp://www.chauffeurdebuzz.com/"
             },
             from:
             {
             xtype: 'textarea',
             value: "\"(http://imgsrv.gocomics.com/dim/[^\"]*)\"\n<SPAN id='comment_count_display'>(d*)</SPAN>\n\"(http://www.explosm.net/db/files/Comics/[^\"]*)\"\n(<embed[^>]+>)\n\"(http://art.penny-arcade.com/photos/[^\"]*)\"\n<img src=\"(/comics/[^\"]*)\"\n<table.*?<table.*?<td[^>]*>(.*?)</td>"
             },
             to:
             {
             xtype: 'textarea',
             value: "<img src='$1'><br>\nComments: $2\n<img src='$1'><br>\n$1\n<img src='$1'><br>\n<img src='http://www.cad-comic.com$1'><br>\n<img src='$1'><br>"
             }
             */
        }
    },
    /*
     {
     menu:{
     name: "Intuitive menu",
     desc: "Intuitive menu to add extra capabilites"
     },
     {
     lightbox:{
     name: "Lightbox",
     options:
     {
     box:
     {
     xtype: 'select',
     values: {ceebox:'CeeBox', shadowbox:'ShadowBox', topup:'TopUp', multibox:'MultiBox'}
     },
     locked: false,
     filter: {xtype:'crud'}
     }
     ,shortcuts:
     {
     'light':
     {
     id: 'light',
     title: 'Show media fullscreen',
     key:
     {
     //76 l
     keyCode: 82
     }
     }
     }
     }}, */
    aero: {
        name: "Google Aero Toolbar"
    },
    info: {
        name: "SysInfo",
        link: true,
        options: {
            sysinfo: {
                xtype: 'html',
                value: '<div id="sysinfo"></div>'
            }
        }
    },
    extshortcuts: {
        name: "Shortcuts",
        link: true
    },
    pack: {
        name: "Packages",
        link: true
    },
    thanks: {
        name: "Thanks",
        link: true
    }
    /*,{
     about:{
     name: "About",
     url: 'about.html',
     link: true
     }*/
};
GRP.packages = {
    'mini': ['favicons', 'unreadcount', 'fixlayout', 'count', 'counticon', 'removeads'],
    'ludoo': ['favicons', 'unreadcount', 'fixlayout', 'count', 'counticon', 'removeads', 'column', 'mark', 'jump', 'fitheight', 'closeentry', 'openbackground'],
    'full': ['theme', 'favicons', 'unreadcount', 'fixlayout', 'count', 'counticon', 'removeads', 'column', 'mark', 'jump', 'preview', 'colorful', 'filter', 'readbymouse', 'twitter', 'facebook', 'fitheight', 'closeentry', 'openbackground', 'aero']
};
GRP.skins = {
    none: {
        name: "None"
    },
    mytheme: {
        name: "My Theme"
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
        name: "Glass Black Gold Skin",
        /*
         url: 'http://userstyles.org/styles/userjs/26569/Google%20Reader%20-%20Glass%20BlackGold%20.user.js',
         */
        pic: 'http://userstyles.org/style_screenshots/26569_after.png',
        ref: 'http://userstyles.org/styles/26569'
    },
    simpleclean: {
        name: "Simple and Clean",
        url: 'http://userstyles.org/styles/userjs/17120/Google%20Reader%20simple%20and%20clean.user.js',
        pic: 'http://userstyles.org/style_screenshots/17120_after.gif',
        ref: 'http://userstyles.org/styles/17120'
    },
    peacockfeather: {
        name: "Peacock Feather",
        url: 'http://userstyles.org/styles/userjs/3014/Google%20Reader%20-%20peacock%20feather.user.js',
        pic: 'http://userstyles.org/style_screenshots/3014_after.gif',
        ref: 'http://userstyles.org/styles/3014',
        resize: true
    },
    myowngooglereader: {
        name: "My Own Google Reader",
        url: 'http://userstyles.org/styles/userjs/13384/My%20Own%20Google%20Reader.user.js',
        pic: 'http://userstyles.org/style_screenshots/13384_after.png',
        ref: 'http://userstyles.org/styles/13384',
        resize: true
    },
    compactcleantweaked: {
        name: "Compact, Clean & Tweaked",
        url: 'http://userstyles.org/styles/userjs/16117/Google%20Reader%20-%20Compact%2C%20Clean%20%26%20Tweaked.user.js',
        pic: 'http://userstyles.org/style_screenshots/16117_after.png',
        ref: 'http://userstyles.org/styles/16117'
    },
    /*
     '31d1remix':
     {
     name: "31d1 remix",
     url:'http://userstyles.org/styles/userjs/3519/Google%20Reader%20-%2031d1%20remix%20.user.js',
     pic:'http://userstyles.org/style_screenshots/3519_after.png',
     ref:'http://userstyles.org/styles/3519'
     },
     */
    absolutelycompact: {
        name: "Absolutely Compact",
        url: 'http://userstyles.org/styles/userjs/12691/Google%20Reader%20Absolutely%20Compact.user.js',
        pic: 'http://userstyles.org/style_screenshots/12691_after.png',
        ref: 'http://userstyles.org/styles/12691'
    },
    darkshinyblue: {
        name: "Dark Shiny Blue",
        url: 'http://userstyles.org/styles/userjs/8935/iGoogle%2FGoogle%20Dark%20Shiny%20Blue%2C%20transparency.user.js',
        pic: 'http://userstyles.org/style_screenshots/8935_after.jpeg',
        ref: 'http://userstyles.org/styles/8935'
    },
    player: {
        name: "Player Theme"
    }
};
GRP.googleshortcuts = {
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
