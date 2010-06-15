/**
 * @author Valente
 */
GRP.scripts = {
    general: {
        name: "General",
        category: 'main',
        options: {
            counter: true,
            secure: false,
            opendirect: false,
            topcurrent: false,
            floatactions: false,
            /*antisocial:true,*/
            noupdatepopup: false,
            icontoolbar_add: {
                xtype: 'p',
                label: true
            },
            icontoolbar_text: {
                xtype: 'p',
                label: true
            },
            importexport_text: {
                xtype: 'p',
                label: true
            },
            preferences: {
                xtype: 'html',
                label: true,
                value: '<input id="ieprefs" class="ignore" type="text" size="30"/><input type="button" id="bimport" value="import" onclick="importprefs();"/><input type="button" id="bexport" value="export" onclick="exportprefs();"/>'
            }
        }
    },
    theme: {
        name: "Theme",
        category: 'theme',
        status: 'updated',
        options: {
            skin: '',
            noborder: false,
            mytheme: {
                xtype: 'p',
                label: true,
                parent: 'mto'
            },
            url: {
                value: 'http://media.smashingmagazine.com/cdn_smash/wp-content/uploads/uploader/wallpapers/march10/march-10-ultimate-sophistication-nocal-1280x1024.jpg',
                size: 80,
                parent: 'mto'
            },
            repeat: {
                value: false,
                xtype: 'boolean',
                parent: 'mto'
            },
            color: {
                value: '#565656',
                xtype: 'picker',
                parent: 'mto'
            },
            bg: {
                value: '#FFC',
                xtype: 'picker',
                parent: 'mto'
            },
            gmailtheme: {
                value: '',
                values: {
                    none: '',
					gmail_blodblue: 'Gmail Bold Blue',
					gmail_classic: 'Gmail Classic',
					gmail_newblue: 'Gmail New Blue',
					gmail_coldshower: 'Gmail Cold Shower',
					gmail_steel: 'Gmail Steel',
					gmail_minimalist: 'Gmail Minimalist',
					gmail_greensky: 'Gmail Green Sky',
					gmail_bubblegum: 'Gmail Bubblegum',
					gmail_cherryblossom: 'Gmail Cherry Blossom',
					gmail_nightshade: 'Gmail Night Shade',
					gmail_marina: 'Gmail marina',
					gmail_dusk: 'Gmail dusk',
					gmail_sunset: 'Gmail sunset',
					gmail_silverlining: 'Gmail Silver Lining',
					gmail_contrastblack: 'Gmail Contrast Black',
					gmail_shiny: 'Gmail shiny',
					gmail_desk: 'Gmail Desk',
					gmail_tree: 'Gmail Tree',
					gmail_beach: 'Gmail Beach',
					gmail_mountains: 'Gmail Mountains',
					gmail_pebbles: 'Gmail pebbles',
					gmail_summerocean: 'Gmail Summer ocean',
                    gmail_phantasea: 'Gmail Phantasea',
					gmail_graffiti: 'Gmail Graffiti',
					gmail_planets: 'Gmail Planets',
					gmail_zoozimps: 'Gmail Zoozimps',
					gmail_candy: 'Gmail Candy',
					gmail_busstop: 'Gmail Bus Stop',
					gmail_ninja: 'Gmail Ninja',
					gmail_teahouse: 'Gmail Tea House',
		            gmail_terminal: 'Gmail Terminal',
					gmail_orcasisland: 'Gmail Orcas Island',
					gmail_highscore: 'Gmail Highscore',
					gmail_turf: 'Gmail Turf',
					
					gmail_lapinscretins1: 'Gmail lapinscretins1',
                    gmail_lapinscretins2: 'Gmail lapinscretins2',
                    gmail_lapinscretins3: 'Gmail lapinscretins3',
					gmail_assasinscreed2: 'Gmail assasinscreed2',				
					
					/* editors_picks */
"5478752472500006610":"editor_5478752472500006610","5478752827007585634":"editor_5478752827007585634","5478752842710333378":"editor_5478752842710333378","5478753114195988130":"editor_5478753114195988130","5478753075316627266":"editor_5478753075316627266","5478753460334726146":"editor_5478753460334726146","5478752501519603442":"editor_5478752501519603442","5478753089633816370":"editor_5478753089633816370","5478752819223180210":"editor_5478752819223180210","5478753117486370930":"editor_5478753117486370930","5478752835087677362":"editor_5478752835087677362","5478752493997894098":"editor_5478752493997894098","5478752822146891810":"editor_5478752822146891810","5478753058608504226":"editor_5478753058608504226","5480987905094465154":"editor_5480987905094465154","5480987906200029490":"editor_5480987906200029490","5480998621006856338":"editor_5480998621006856338","5480987916726984130":"editor_5480987916726984130","5480987917979934498":"editor_5480987917979934498","5480987925727076290":"editor_5480987925727076290","5480988005113749330":"editor_5480988005113749330","5480988012864676114":"editor_5480988012864676114","5478753466167683746":"editor_5478753466167683746","5478753483552159554":"editor_5478753483552159554","5478755559461692018":"editor_5478755559461692018","5478755572322259650":"editor_5478755572322259650","5478753799989312658":"editor_5478753799989312658","5478753813630017442":"editor_5478753813630017442","5478753819961634386":"editor_5478753819961634386","5478752511525657170":"editor_5478752511525657170","5478753832267149810":"editor_5478753832267149810","5480997862386069170":"editor_5480997862386069170","5480997893054118498":"editor_5480997893054118498","5480998186992651026":"editor_5480998186992651026","5478769425598313058":"editor_5478769425598313058","5478769428183578882":"editor_5478769428183578882","5478769428473291154":"editor_5478769428473291154","5478769530404012082":"editor_5478769530404012082","5478769535168997586":"editor_5478769535168997586","5480596593254567266":"editor_5480596593254567266",
/* public_gallery */
"5468005866288280370":"public_EricasJoys/HorizontalMambo","5480525382039743330":"public_116086157836169916177/Favorites","5469661666160577106":"public_114728257341600814985/PicasaWebPublicPictures","5464847589870262818":"public_juliantoledo/Best","5468620555541748930":"public_bdowney/ClassicPlus","5465726438613138322":"public_EricasJoys/HorizontalMambo","5480525372525642866":"public_116086157836169916177/Favorites","5468095309182211138":"public_climent/Travels","5467968585789456354":"public_max.braun/Homepage","5467968606322662898":"public_max.braun/Homepage","5394978350593597026":"public_bluan01/JiuZhaiGouYellowDragonNationalParks","5468030760630111442":"public_109244757320221408388/Test2006","5461268259373019506":"public_jclilot/Portfolio_Flowers","5418083111186176690":"public_fkarpelevitch/200806","5465064542962429986":"public_snoozy.koala/Images","5465267981519769410":"public_magdalar/Backgrounds","5464637264209516562":"public_brettw/Taiwan","5469816275349772930":"public_max.braun/Homepage","5405276903498929458":"public_jclilot/Portfolio_Nature","5464602659331416274":"public_maeve.mara/FeaturedPhotos","5468081125425097026":"public_michos.conradt/Public","5480525380508846738":"public_116086157836169916177/Favorites","5465064395281172466":"public_snoozy.koala/Images","5427875955486466754":"public_sandysroom/VerdugoNorthTraverse","5480525385832476034":"public_116086157836169916177/Favorites","5464721817854022450":"public_mjwiacek/PhotosILike","5468499236979512002":"public_uffishmpk/SelectedFavourites","5465811371224046274":"public_103752943986656263237/Night","5468499251879550482":"public_uffishmpk/SelectedFavourites","5468011240643552594":"public_sweth.c/ForGoogle","5464721917635140242":"public_mjwiacek/PhotosILike","5465963404565598994":"public_arendsf/ThomasFavoriteShared","5464886839716494226":"public_mariusm/ILikeThese","5464644514748019778":"public_simon.tong/Wallpapers","5465825398133839090":"public_103752943986656263237/Background","5467921205742594898":"public_TenSafeFrogs/Favorites","5436863789388960962":"public_marius.schilder/Trona","5464721845849026242":"public_mjwiacek/PhotosILike","5467928286294729906":"public_merciniebres/HelloWorld","5469782237294118322":"public_peter.norvig/Pictures","5463830940035733394":"public_mattgundersen/LandmarksOfTahoe","5470258900410180098":"public_kevin.cantrell/PublicAlbum","5467976005541355106":"public_romain.guy/Wallpapers","5467975931636282290":"public_romain.guy/Wallpapers","5467936023478442338":"public_TenSafeFrogs/Favorites","5468630655462131890":"public_RussHaig/SFNightD40","5468499216650860930":"public_uffishmpk/SelectedFavourites","5464708695072547106":"public_pawliger/Homepage","5464721937652197202":"public_mjwiacek/PhotosILike","5464593346215231826":"public_arendsf/ThomasFavoriteShared"
                },
                xtype: 'select',
                parent: 'mto'
            }
        }
    },
    ig: {
        name: "iGoogle Theme",
        category: 'theme',
        desc: "Use iGoogle Theme in your Google Reader (Beta)",
        options: {
            warning: {
                xtype: 'p',
                label: true,
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
                label: true,
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
                    shiftKey: true
                }
            }
        }
    },
    relook: {
        name: "Relook",
        category: 'theme',
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
        category: 'icons',
        options: {
            providerpageicons: false,
            sidebaronly: false,
            custom: {
                xtype: 'p',
                label: true
            },
            domains: {
                xtype: 'crud'
            },
            tip: {
                xtype: 'p',
                label: true
            },
            manual: false,
            parsing: {
                xtype: 'p',
                label: true
            }
        }
    },
    unreadcount: {
        category: 'counter',
        name: "Show all unread count"
    },
    fixlayout: {
        category: 'layout',
        name: "Fix layout"
    },
    count: {
        category: 'counter',
        name: "Fix counter (1000+)"
    },
    counticon: {
        category: 'counter',
        name: "Icon counter"
    },
    removeads: {
        name: "Remove ads",
        category: 'content',
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
        category: 'layout',
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
        category: 'layout',
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
        category: 'layout',
        status: 'updated',
        options: {
            tree: false,
            usebasecolor: false,
            background: {
                value: '#BCBCBC',
                xtype: 'picker'
            },
            color: {
                value: '#000000',
                xtype: 'picker'
            }
        }
    },
    filter: {
        name: "Filter entries",
        category: 'layout',
        options: {
            searchbody: false
        }
    },
    readbymouse: {
        name: "Read by mouse",
        category: 'navigation'
    },
    facebook: {
        name: "Facebook integration",
        category: 'share',
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
        category: 'share',
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
                label: true,
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
        category: 'share',
        options: {
            auth: {
                xtype: 'p',
                label: true,
                cls: 'subtitle'
            },
            username: '',
            password: {
                input: 'password',
                value: ''
            }
        },
        shortcuts: {
            'share': {
                id: 'share',
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
        category: 'share',
        status: 'new',
        options: {
            auth: {
                xtype: 'p',
                label: true,
                cls: 'subtitle'
            },
            username: '',
            password: {
                input: 'password',
                value: ''
            }
        },
        shortcuts: {
            'share': {
                id: 'share',
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
        category: 'navigation',
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
        category: 'navigation',
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
        category: 'layout',
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
        category: 'action',
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
        category: 'action',
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
    translate: {
        name: "Translate",
        category: 'content',
        status: 'new',
        options: {
            lang: 'en',
            locked: false,
            include: false,
            filter: {
                xtype: 'crud'
            }
        },
        shortcuts: {
            'translate': {
                id: 'translate',
                title: 'Translate entry',
                key: {
                    //84 alt+T
                    keyCode: 84,
                    altKey: true
                }
            }
        }
    },
    limit: {
        name: "Limit",
        category: 'layout',
        status: 'new',
        options: {
            mini: 30,
            maxi: 200
        }
    },
    replacer: {
        name: "Replacer",
        category: 'content',
        status: 'updated',
        options: {
            intro: {
                xtype: 'p',
                label: true
            },
            items: {
                xtype: 'crud',
                value: {
                    "Gocomics pictures": {
                        "title": "Gocomics pictures",
                        "url": "http://feedproxy.google.com/~r/uclick/| http://www.gocomics.com/",
                        "search": "\"(http://imgsrv.gocomics.com/dim/[^\"]*)\"",
                        "replace": "<img src='$1'><br/>"
                    },
                    "Gocomics comments": {
                        "title": "Gocomics comments",
                        "url": "http://feedproxy.google.com/~r/uclick/| http://www.gocomics.com/| http://feeds.gocomics.com/",
                        "search": "<SPAN id='comment_count_display'>(d*)</SPAN>",
                        "replace": "Comments: $2\n<img src='$1'><br/>"
                    },
                    "Explosm pictures": {
                        "url": "http://www.explosm.net/",
                        "search": "\"(http://www.explosm.net/db/files/[^\"]*)\"",
                        "replace": "<img src='$1'><br/>"
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
                        "replace": "<img src='$1'><br/>"
                    },
                    "Cad-comic pictures": {
                        "title": "cad-comic pictures",
                        "url": "http://feedproxy.google.com/~r/cad-comic/",
                        "search": "<img src=\"(/comics/[^\"]*)\"",
                        "replace": "<img src='http://www.cad-comic.com$1'><br/>"
                    },
                    "Giantitp Comics": {
                        "url": "http://www.giantitp.com/comics/",
                        "search": "(/comics/images/[^\"]*)",
                        "replace": "<img src='http://www.giantitp.com$1'><br/>"
                    },
                    "Userfriendly Comics": {
                        "url": "userfriendly.org",
                        "search": "src=\"(http://www.userfriendly.org/cartoons/archives/[^\"]*)",
                        "replace": "<img src='$1'><br/>"
                    },
                    "Chauffeurdebuzz items": {
                        "url": "http://www.chauffeurdebuzz.com/",
                        "search": "<table.*?<table.*?<table.*?<table.*?<table.*?<td[^>]*>(.*?)</td>",
                        "replace": "$1"
                    },
                    "Image lessentiel.lu": {
                        "url": "http://www.lessentiel.lu",
                        "search": "xpath://img[@class='leadbild']",
                        "replace": "$1<br/>"
                    },
                    "Textes lessentiel.lu": {
                        "url": "http://www.lessentiel.lu",
                        "search": "story_lead\">([^<]*)</h2>",
                        /*"search": "xpath://div[@id='content']",*/
                        "replace": "$1"
                    },
                    "Images lesfrontaliers.lu": {
                        "url": "http://www.lesfrontaliers.lu",
                        "search": "<img class=\"editos_one_big_img\" src=\"([^\"]*)\"[^>]*>",
                        "replace": "<img src='http://www.lesfrontaliers.lu/$1'><br/>"
                    },
                    "Articles lesfrontaliers.lu": {
                        "url": "http://www.lesfrontaliers.lu",
                        "search": "xpath://div[@id='content_edit']",
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
        name: "Google Aero Toolbar",
        category: 'theme'
    },
    antisocial: {
        name: "Antisocial",
        category: 'layout',
        status: 'new',
        options: {
            status: false
        }
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
                label: true,
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
    'mini': {
        favicons: true,
        unreadcount: true,
        fixlayout: true,
        count: true,
        counticon: true,
        removeads: true
    },
    'ludoo': {
        general: {
            secure: true,
            counter: false
        },
        favicons: true,
        unreadcount: true,
        fixlayout: true,
        count: true,
        counticon: true,
        removeads: true,
        column: true,
        mark: true,
        jump: true,
        fitheight: true,
        closeentry: true,
        openbackground: true,
        replacer: true,
        preview: {
            onicon: true,
            overlay: true
        },
        theme: {
            gmailtheme: 'coldshower'
        }
    },
    'full': {
        theme: {
            skin: 'osxblack'
        },
        favicons: true,
        unreadcount: true,
        fixlayout: true,
        count: true,
        counticon: true,
        removeads: true,
        column: true,
        mark: true,
        jump: true,
        preview: true,
        colorful: true,
        filter: true,
        readbymouse: true,
        twitter: true,
        facebook: true,
        fitheight: true,
        closeentry: true,
        openbackground: true,
        aero: true,
        instapaper: true,
        readitlater: true,
        translate: true,
        replacer: true,
        limit: true
    }
};
GRP.skins = {
    none: {
        name: "None"
    },
    mytheme: {
        name: "My Theme"
    },
    nativecompact: {
        name: "Native compact"
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
        fix: '#chrome-view-links,#lhn-selectors .selected,#lhn-selectors .selected:hover{background-color: transparent !important;}',
        desc: 'userstyles.org'
    },
    simpleclean: {
        name: "Simple and Clean",
        url: 'http://userstyles.org/styles/userjs/17120/Google%20Reader%20simple%20and%20clean.user.js',
        pic: 'http://userstyles.org/style_screenshots/17120_after.gif',
        ref: 'http://userstyles.org/styles/17120',
        fix: '.entry-actions{height: auto!important;}',
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
    },
    persian: {
        name: "Optimized Persian",
        url: 'http://userstyles.org//styles/userjs/2375/Optimized%20Persian%20Google%20Reader%20.user.js',
        pic: 'http://userstyles.org/style_screenshots/2375_after.png',
        ref: 'http://userstyles.org/styles/2375',
        desc: 'userstyles.org'
    }
};
GRP.googleshortcuts = {
    'j': {
        text: 'item down : selects the next item in the list',
        key: {
            keyCode: 74
        }
    },
    'k': {
        text: 'item up : selects the previous item in the list',
        key: {
            keyCode: 75
        }
    },
    'space': {
        text: 'page down : moves the page down',
        key: {
            keyCode: 32
        }
    },
    'shift+space': {
        text: 'page up : moves the page up',
        key: {
            keyCode: 32,
            shiftKey: true
        }
    },
    'n': {
        text: 'scan down : in list view, selects the next item without opening it',
        key: {
            keyCode: 78
        }
    },
    'p': {
        text: 'scan up : in list view, selects the next item without opening it',
        key: {
            keyCode: 80
        }
    },
    'shift+n': {
        text: 'navigation down : selects the next subscription or folder in the navigation',
        key: {
            keyCode: 78,
            shiftKey: true
        }
    },
    'shift+p': {
        text: 'navigation up : selects the previous subscription or folder in the navigation',
        key: {
            keyCode: 80,
            shiftKey: true
        }
    },
    'shift+x': {
        text: 'navigation expand/collapse : expands or collapses a folder selected in the navigation',
        key: {
            keyCode: 88,
            shiftKey: true
        }
    },
    'o': {
        text: 'open/close item : in list view, expands or collapses the selected item',
        key: {
            keyCode: 79
        }
    },
    'enter': {
        text: 'open/close item : in list view, expands or collapses the selected item',
        key: {
            keyCode: 13
        }
    },
    'shift+o': {
        text: 'navigation open subscription : opens the subscription or folder currently selected in the navigation',
        key: {
            keyCode: 79,
            shiftKey: true
        }
    },
    '-': {
        text: 'zoom out : decreases the font size of the current item',
        key: {
            keyCode: 109
        }
    },
    '=': {
        text: 'zoom in : increases the font size of the current item',
        key: {
            keyCode: 187
        }
    },
    's': {
        text: 'toggle star : stars or un-stars the selected item',
        key: {
            keyCode: 83
        }
    },
    'shift+s': {
        text: 'toggle share : shares or un-shares the selected item',
        key: {
            keyCode: 83,
            shiftKey: true
        }
    },
    'shift+d': {
        text: 'share with note : shares the selected item with a note',
        key: {
            keyCode: 68,
            shiftKey: true
        }
    },
    'v': {
        text: 'view original : opens the original source for this article in a new window',
        key: {
            keyCode: 86
        }
    },
    't': {
        text: 'tag an item : opens the tagging field for the selected item',
        key: {
            keyCode: 84
        }
    },
    'm': {
        text: 'mark as read/unread : switches the read status of the selected item',
        key: {
            keyCode: 77
        }
    },
    'shift+a': {
        text: 'mark all as read : marks all items in the current view as read',
        key: {
            keyCode: 65,
            shiftKey: true
        }
    },
    'e': {
        text: 'email item : opens the email form to send an item to a friend',
        key: {
            keyCode: 69
        }
    },
    'g then h': {
        text: 'go to home : goes to the Google Reader homepage',
        key: {
            keyCode: 71
        }
    },
    'g then a': {
        text: 'go to all items : goes to the "All items" view',
        key: {
            keyCode: 71
        }
    },
    'g then s': {
        text: 'go to starred items : goes to the "Starred items" view',
        key: {
            keyCode: 71
        }
    },
    'g then shift-s': {
        text: 'go to shared items : goes to the "Your shared items" view',
        key: {
            keyCode: 71
        }
    },
    'g then u': {
        text: 'go to subscription : allows you to navigate to a subscription by entering the subscription name',
        key: {
            keyCode: 71
        }
    },
    'g then t': {
        text: 'go to tag : allows you to navigate to a tag by entering the tag name',
        key: {
            keyCode: 71
        }
    },
    'g then f': {
        text: 'go to friend : allows you to navigate to a friend\'s shared items by entering the friend\'s name',
        key: {
            keyCode: 71
        }
    },
    'g then shift-f': {
        text: 'go to all friends\' shared items : shows all of your friends\' shared items',
        key: {
            keyCode: 71
        }
    },
    'g then shift-t': {
        text: 'go to trends : goes to the "Trends" view',
        key: {
            keyCode: 71
        }
    },
    'g then d': {
        text: 'go to feed discovery : shows the recommendations page, or the browse page if there are no recommendations',
        key: {
            keyCode: 71
        }
    },
    'r': {
        text: 'refresh : refreshes the unread counts in the navigation',
        key: {
            keyCode: 82
        }
    },
    'u': {
        text: 'toggle full screen mode : hides or shows the list of subscriptions',
        key: {
            keyCode: 85
        }
    },
    '1': {
        text: 'expanded view : displays the subscription as expanded items',
        key: {
            keyCode: 49
        }
    },
    '2': {
        text: 'list view : displays the subscription as a list of headlines',
        key: {
            keyCode: 50
        }
    },
    '1 pad': {
        text: 'expanded view : displays the subscription as expanded items',
        key: {
            keyCode: 97
        }
    },
    '2 pad': {
        text: 'list view : displays the subscription as a list of headlines',
        key: {
            keyCode: 98
        }
    },
    '/': {
        text: 'search : moves your cursor to the search box',
        key: {
            keyCode: 111
        }
    },
    'a': {
        text: 'add a subscription : opens the "Add a subscription" box in the sidebar',
        key: {
            keyCode: 65
        }
    },
    '?': {
        text: 'keyboard shortcuts help : displays a quick guide to all of Reader\'s shortcuts',
        key: {
            keyCode: 219
        }
    }
};
