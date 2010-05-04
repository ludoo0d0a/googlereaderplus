/**
 * @author Valente
 */
GRP.scripts = {
    general: {
        name: "General",
        options: {
            secure: false,
			topcurrent: false,
			floatactions: false, 
            counter: true,
            opendirect: false,
			noupdatepopup:false,
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
                parent: 'mto'
            },
            url: {
                value: 'http://media.smashingmagazine.com/cdn_smash/wp-content/uploads/uploader/wallpapers/march10/march-10-ultimate-sophistication-nocal-1280x1024.jpg',
                size: 80,
                parent: 'mto'
            },
            color: {
                value: '#565656',
                cls: 'picker',
                parent: 'mto'
            },
            bg: {
                value: '#FFC',
                cls: 'picker',
                parent: 'mto'
            }
        }
    },
    ig: {
        name: "iGoogle Theme",
        desc: "Use iGoogle Theme in your Google Reader (Beta)",
        options: {
            warning: {
                xtype: 'p',
                cls: 'warning center'
            },
            skin_name: {
                value: '',
                size: 80
            },
            skin_url: {
                value: '',
                size: 80
            },
            skin_id: {
                xtype: 'hidden'
            },
            /*debug: false,*/
            randomtime: true,
            userandomthemes: false,
            randomthemes: {
                value: 30,
                lcls: 'large'
            },
            themes: {
                xtype: 'html',
                value: '<div id="ig_themes"></div>'
            }
        },
		shortcuts: {
            'random': {
                id: 'random',
                title: 'Random theme',
                key: {
                    //82 r
                    keyCode: 82,
					shiftKey:true
                }
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
            password: {
                input: 'password',
                value: ''
            }
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
            password: {
                input: 'password',
                value: ''
            }
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
        }
    },
    /*menu: {
        name: "Intuitive menu",
        desc: "Intuitive menu to add extra capabilites"
    },*/
    aero: {
        name: "Google Aero Toolbar"
    },
	/*hover: {
        name: "Hover selection"
    },*/
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
	player: {
        name: "Player Theme"
    },
    osxblue: {
        name: "Mac OS X Snow Leopard - Blue"
    },
    osxblack: {
        name: "Mac OS X Snow Leopard - Black"
    },
    portal: {
        name: "Portal Theme"
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
    calibri: {
        name: "Calibri Skin"
    },
    glassblackgold: {
        name: "Glass Black Gold Skin",
        /*
         url: 'http://userstyles.org/styles/userjs/26569/Google%20Reader%20-%20Glass%20BlackGold%20.user.js',
         */
        pic: 'http://userstyles.org/style_screenshots/26569_after.png',
        ref: 'http://userstyles.org/styles/26569',
		desc: 'userstyles.org'
    },
    simpleclean: {
        name: "Simple and Clean",
        url: 'http://userstyles.org/styles/userjs/17120/Google%20Reader%20simple%20and%20clean.user.js',
        pic: 'http://userstyles.org/style_screenshots/17120_after.gif',
        ref: 'http://userstyles.org/styles/17120',
		desc: 'userstyles.org'
    },
    peacockfeather: {
        name: "Peacock Feather",
        url: 'http://userstyles.org/styles/userjs/3014/Google%20Reader%20-%20peacock%20feather.user.js',
        pic: 'http://userstyles.org/style_screenshots/3014_after.gif',
        ref: 'http://userstyles.org/styles/3014',
		desc: 'userstyles.org',
        resize: true
    },
    myowngooglereader: {
        name: "My Own Google Reader",
        url: 'http://userstyles.org/styles/userjs/13384/My%20Own%20Google%20Reader.user.js',
        pic: 'http://userstyles.org/style_screenshots/13384_after.png',
        ref: 'http://userstyles.org/styles/13384',
		desc: 'userstyles.org',
        resize: true
    },
    compactcleantweaked: {
        name: "Compact, Clean & Tweaked",
        url: 'http://userstyles.org/styles/userjs/16117/Google%20Reader%20-%20Compact%2C%20Clean%20%26%20Tweaked.user.js',
        pic: 'http://userstyles.org/style_screenshots/16117_after.png',
        ref: 'http://userstyles.org/styles/16117',
		desc: 'userstyles.org'
    },
    /*
     '31d1remix':
     {
     name: "31d1 remix",
     url:'http://userstyles.org/styles/userjs/3519/Google%20Reader%20-%2031d1%20remix%20.user.js',
     pic:'http://userstyles.org/style_screenshots/3519_after.png',
     ref:'http://userstyles.org/styles/3519',
		desc: 'userstyles.org'
     },
     */
    absolutelycompact: {
        name: "Absolutely Compact",
        url: 'http://userstyles.org/styles/userjs/12691/Google%20Reader%20Absolutely%20Compact.user.js',
        pic: 'http://userstyles.org/style_screenshots/12691_after.png',
        ref: 'http://userstyles.org/styles/12691',
		desc: 'userstyles.org'
    },
    darkshinyblue: {
        name: "Dark Shiny Blue",
        url: 'http://userstyles.org/styles/userjs/8935/iGoogle%2FGoogle%20Dark%20Shiny%20Blue%2C%20transparency.user.js',
        pic: 'http://userstyles.org/style_screenshots/8935_after.jpeg',
        ref: 'http://userstyles.org/styles/8935',
		desc: 'userstyles.org'
    }
    
};
GRP.googleshortcuts = {
'j':{text: 'item down : selects the next item in the list',key:{keyCode:74}},
'k':{text: 'item up : selects the previous item in the list',key:{keyCode:75}},
'space':{text: 'page down : moves the page down',key:{keyCode:32}},
'shift+space':{text: 'page up : moves the page up',key:{keyCode:32,shiftKey: true}},
'n':{text: 'scan down : in list view, selects the next item without opening it',key:{keyCode:78}},
'p':{text: 'scan up : in list view, selects the next item without opening it',key:{keyCode:80}},
'shift+n':{text: 'navigation down : selects the next subscription or folder in the navigation',key:{keyCode:78,shiftKey: true}},
'shift+p':{text: 'navigation up : selects the previous subscription or folder in the navigation',key:{keyCode:80,shiftKey: true}},
'shift+x':{text: 'navigation expand/collapse : expands or collapses a folder selected in the navigation',key:{keyCode:88,shiftKey: true}},
'o':{text: 'open/close item : in list view, expands or collapses the selected item',key:{keyCode:79}},
'enter':{text: 'open/close item : in list view, expands or collapses the selected item',key:{keyCode:13}},
'shift+o':{text: 'navigation open subscription : opens the subscription or folder currently selected in the navigation',key:{keyCode:79,shiftKey: true}},
'-':{text: 'zoom out : decreases the font size of the current item',key:{keyCode:109}},
'=':{text: 'zoom in : increases the font size of the current item',key:{keyCode:187}},
's':{text: 'toggle star : stars or un-stars the selected item',key:{keyCode:83}},
'shift+s':{text: 'toggle share : shares or un-shares the selected item',key:{keyCode:83,shiftKey: true}},
'shift+d':{text: 'share with note : shares the selected item with a note',key:{keyCode:68,shiftKey: true}},
'v':{text: 'view original : opens the original source for this article in a new window',key:{keyCode:86}},
't':{text: 'tag an item : opens the tagging field for the selected item',key:{keyCode:84}},
'm':{text: 'mark as read/unread : switches the read status of the selected item',key:{keyCode:77}},
'shift+a':{text: 'mark all as read : marks all items in the current view as read',key:{keyCode:65,shiftKey: true}},
'e':{text: 'email item : opens the email form to send an item to a friend',key:{keyCode:69}},
'g then h':{text: 'go to home : goes to the Google Reader homepage',key:{keyCode:71}},
'g then a':{text: 'go to all items : goes to the "All items" view',key:{keyCode:71}},
'g then s':{text: 'go to starred items : goes to the "Starred items" view',key:{keyCode:71}},
'g then shift-s':{text: 'go to shared items : goes to the "Your shared items" view',key:{keyCode:71}},
'g then u':{text: 'go to subscription : allows you to navigate to a subscription by entering the subscription name',key:{keyCode:71}},
'g then t':{text: 'go to tag : allows you to navigate to a tag by entering the tag name',key:{keyCode:71}},
'g then f':{text: 'go to friend : allows you to navigate to a friend\'s shared items by entering the friend\'s name',key:{keyCode:71}},
'g then shift-f':{text: 'go to all friends\' shared items : shows all of your friends\' shared items',key:{keyCode:71}},
'g then shift-t':{text: 'go to trends : goes to the "Trends" view',key:{keyCode:71}},
'g then d':{text: 'go to feed discovery : shows the recommendations page, or the browse page if there are no recommendations',key:{keyCode:71}},
'r':{text: 'refresh : refreshes the unread counts in the navigation',key:{keyCode:82}},
'u':{text: 'toggle full screen mode : hides or shows the list of subscriptions',key:{keyCode:85}},
'1':{text: 'expanded view : displays the subscription as expanded items',key:{keyCode:49}},
'2': {text: 'list view : displays the subscription as a list of headlines',key: {keyCode: 50}},
'1 pad':{text: 'expanded view : displays the subscription as expanded items',key:{keyCode:97}},
'2 pad': {text: 'list view : displays the subscription as a list of headlines',key: {keyCode: 98}},
'/':{text: 'search : moves your cursor to the search box',key:{keyCode:111}},
'a':{text: 'add a subscription : opens the "Add a subscription" box in the sidebar',key:{keyCode:65}},
'?':{text: 'keyboard shortcuts help : displays a quick guide to all of Reader\'s shortcuts',key:{keyCode:219}}
};