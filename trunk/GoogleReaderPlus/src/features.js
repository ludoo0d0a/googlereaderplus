/**
 * @author Valente
 */
GRP.scripts = {
    general: {
        name: "General",
        category: 'main',
        options: {
            secure: false,

			text_layout:{
                xtype: 'h'
            },
            topcurrent: false,
            floatactions: false,
			bottomup:false,
			currdir:true,
			icons:false,
			hidetoolbar:true,
            /*antisocial:true,*/
			text_pageicon:{
                xtype: 'h'
            },
			pageicon:true,
			text_toolbaricon: {
                xtype: 'h'
            },
			icontoolbar_add: {
                xtype: 'p',
                label: true
            },
			
			counter: false,
			counterinterval: 5,
			opendirect: false,
            icontoolbar_text: {
                xtype: 'p',
                label: true
            },
			
			text_private:{
                xtype: 'h'
            },
			stats:true,
            noupdatepopup: false,
			
			text_export:{
                xtype: 'h'
            },
            importexport_text: {
                xtype: 'p',
                label: true
            },
            preferences: {
                xtype: 'html',
                label: true,
                value: '<input id="ieprefs" class="ignore" type="text" size="30"/><input type="button" id="bimport" value="import" onclick="importprefs();"/><input type="button" id="bexport" value="export" onclick="exportprefs();"/>'
            },
			syncprefs_text: {
                xtype: 'p',
                label: true
            },
			syncprefs: {
                xtype: 'html',
                label: true,
                value: '<input type="button" id="bsync_load" value="Load from your Google\'s account" onclick="syncload();"/><input type="button" id="bsync_save" value="Save into your Google\'s account"  onclick="syncsave();"/>'
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
                parent: 'mytheme'
            },
            externaltheme: {
                value: '',
                values: {
                    none: '',
					gmail_chrome: 'Gmail Bold Blue',
					gmail_c: 'Gmail Classic',
					gmail_newblue: 'Gmail New Blue',
					gmail_coldshower: 'Gmail Cold Shower',
					gmail_steel: 'Gmail Steel',
					gmail_lightbright: 'Gmail Minimalist',
					gmail_greensky: 'Gmail Green Sky',
					gmail_lightsoft: 'Gmail Bubblegum',
					gmail_cherry: 'Gmail Cherry Blossom',
					gmail_nightshade: 'Gmail Night Shade',
					gmail_medsoft: 'Gmail marina',
					gmail_medred: 'Gmail dusk',
					gmail_darkwarm: 'Gmail sunset',
					gmail_greyrain: 'Gmail Silver Lining',
					gmail_contrastblack: 'Gmail Contrast Black',
					gmail_shiny: 'Gmail shiny',
					gmail_desk: 'Gmail Desk',
					gmail_tree: 'Gmail Tree',
					gmail_beach: 'Gmail Beach',
					gmail_mountains: 'Gmail Mountains',
					gmail_pebbles: 'Gmail pebbles',
					gmail_ocean: 'Gmail Summer ocean',
                    gmail_phantasea: 'Gmail Phantasea',
					gmail_graffiti: 'Gmail Graffiti',
					gmail_planets: 'Gmail Planets',
					gmail_gizmos: 'Gmail Zoozimps',
					gmail_candy: 'Gmail Candy',
					gmail_busstop: 'Gmail Bus Stop',
					gmail_ninja: 'Gmail Ninja',
					gmail_teahouse: 'Gmail Tea House',
		            gmail_terminal: 'Gmail Terminal',
					gmail_orcasisland: 'Gmail Orcas Island',
					gmail_highscore: 'Gmail Highscore',
					gmail_turf: 'Gmail Turf',
					gmail_lapinscretins: 'Gmail lapinscretins',
					gmail_assasinscreed2: 'Gmail assasinscreed2',				
/* editors_picks */
"editor_5478752472500006610":"Google, artist, Dale Chihuly, 01_chihuly_06.jpg","editor_5478752827007585634":"Google, artist, Dale Chihuly, 08_chihuly_02.jpg","editor_5478752842710333378":"Google, artist, Dale Chihuly, 10_chihuly_05.jpg","editor_5478753114195988130":"Google, artist, Dale Chihuly, 14_chihuly_01.jpg","editor_5478753075316627266":"Google, artist, Dale Chihuly, 12_chihuly_03.jpg","editor_5478753460334726146":"Google, artist, Dale Chihuly, 16_chihuly_07.jpg","editor_5478752501519603442":"Google, \u00a9 Jeff Koons, 04_koons_02.jpg","editor_5478753089633816370":"Google, \u00a9 Jeff Koons, 13_koons_01.jpg","editor_5478752819223180210":"Google, Polly Apfelbaum, 06_apfelbaum_01.jpg","editor_5478753117486370930":"Google, Polly Apfelbaum, 15_apfelbaum_03.jpg","editor_5478752835087677362":"Google, Polly Apfelbaum, 09_apfelbaum_02.jpg","editor_5478752493997894098":"Google, \u00a9 Tom Otterness, 03_otterness_02.jpg","editor_5478752822146891810":"Google, \u00a9 Tom Otterness, 07_otterness_03.jpg","editor_5478753058608504226":"Google, \u00a9 Tom Otterness, 11_otterness_01.jpg","editor_5480987905094465154":"Google, \u00a9 Kengo Kuma (???), kengo_kuma.jpg","editor_5480987906200029490":"Google, \u00a9 Tord Boontje, tord_boontje.jpg","editor_5480998621006856338":"Google, \u00a9 Kwon, Ki-soo (???), ki_soo_kwon.jpg","editor_5480987916726984130":"Google, \u00a9 Yann Arthus-Bertrand, y_a_b_01.jpg","editor_5480987917979934498":"Google, \u00a9 Yann Arthus-Bertrand, y_a_b_02.jpg","editor_5480987925727076290":"Google, \u00a9 Yann Arthus-Bertrand, y_a_b_03.jpg","editor_5480988005113749330":"Google, \u00a9 Yann Arthus-Bertrand, y_a_b_04.jpg","editor_5480988012864676114":"Google, \u00a9 Yann Arthus-Bertrand, y_a_b_05.jpg","editor_5478753466167683746":"Google, National Geographic Stock, natgeo_01.jpg","editor_5478753483552159554":"Google, National Geographic Stock, natgeo_02.jpg","editor_5478755559461692018":"Google, National Geographic Stock, natgeo_03.jpg","editor_5478755572322259650":"Google, National Geographic Stock, natgeo_04.jpg","editor_5478753799989312658":"Google, National Geographic Stock, natgeo_06.jpg","editor_5478753813630017442":"Google, National Geographic Stock, natgeo_07.jpg","editor_5478753819961634386":"Google, National Geographic Stock, natgeo_08.jpg","editor_5478752511525657170":"Google, National Geographic Stock, 05_natgeo_10.jpg","editor_5478753832267149810":"Google, National Geographic Stock, natgeo_09.jpg","editor_5480997862386069170":"Google, National Geographic Stock, NationalGeographic_1143826.jpg","editor_5480997893054118498":"Google, National Geographic Stock, NationalGeographic_1146940.jpg","editor_5480998186992651026":"Google, National Geographic Stock, NationalGeographic_1223429.jpg","editor_5478769425598313058":"Google, Blue, Color_Google_blue.jpg","editor_5478769428183578882":"Google, Green, Color_Google_green.jpg","editor_5478769428473291154":"Google, Grey, Color_Google_grey.jpg","editor_5478769530404012082":"Google, Red, Color_Google_red.jpg","editor_5478769535168997586":"Google, Yellow-Orange, Color_Google_yelloworange.jpg","editor_5480596593254567266":"Google, White, white-2000x1500.jpg",
/* public_gallery */
"public_5468005866288280370":"Google, EricasJoys/HorizontalMambo","public_5480525382039743330":"Google, 116086157836169916177/Favorites","public_5469661666160577106":"Google, 114728257341600814985/PicasaWebPublicPictures","public_5464847589870262818":"Google, juliantoledo/Best","public_5468620555541748930":"Google, bdowney/ClassicPlus","public_5465726438613138322":"Google, EricasJoys/HorizontalMambo","public_5480525372525642866":"Google, 116086157836169916177/Favorites","public_5468095309182211138":"Google, climent/Travels","public_5467968585789456354":"Google, max.braun/Homepage","public_5467968606322662898":"Google, max.braun/Homepage","public_5394978350593597026":"Google, bluan01/JiuZhaiGouYellowDragonNationalParks","public_5468030760630111442":"Google, 109244757320221408388/Test2006","public_5461268259373019506":"Google, jclilot/Portfolio_Flowers","public_5418083111186176690":"Google, fkarpelevitch/200806","public_5465064542962429986":"Google, snoozy.koala/Images","public_5465267981519769410":"Google, magdalar/Backgrounds","public_5464637264209516562":"Google, brettw/Taiwan","public_5469816275349772930":"Google, max.braun/Homepage","public_5405276903498929458":"Google, jclilot/Portfolio_Nature","public_5464602659331416274":"Google, maeve.mara/FeaturedPhotos","public_5468081125425097026":"Google, michos.conradt/Public","public_5480525380508846738":"Google, 116086157836169916177/Favorites","public_5465064395281172466":"Google, snoozy.koala/Images","public_5427875955486466754":"Google, sandysroom/VerdugoNorthTraverse","public_5480525385832476034":"Google, 116086157836169916177/Favorites","public_5464721817854022450":"Google, mjwiacek/PhotosILike","public_5468499236979512002":"Google, uffishmpk/SelectedFavourites","public_5465811371224046274":"Google, 103752943986656263237/Night","public_5468499251879550482":"Google, uffishmpk/SelectedFavourites","public_5468011240643552594":"Google, sweth.c/ForGoogle","public_5464721917635140242":"Google, mjwiacek/PhotosILike","public_5465963404565598994":"Google, arendsf/ThomasFavoriteShared","public_5464886839716494226":"Google, mariusm/ILikeThese","public_5464644514748019778":"Google, simon.tong/Wallpapers","public_5465825398133839090":"Google, 103752943986656263237/Background","public_5467921205742594898":"Google, TenSafeFrogs/Favorites","public_5436863789388960962":"Google, marius.schilder/Trona","public_5464721845849026242":"Google, mjwiacek/PhotosILike","public_5467928286294729906":"Google, merciniebres/HelloWorld","public_5469782237294118322":"Google, peter.norvig/Pictures","public_5463830940035733394":"Google, mattgundersen/LandmarksOfTahoe","public_5470258900410180098":"Google, kevin.cantrell/PublicAlbum","public_5467976005541355106":"Google, romain.guy/Wallpapers","public_5467975931636282290":"Google, romain.guy/Wallpapers","public_5467936023478442338":"Google, TenSafeFrogs/Favorites","public_5468630655462131890":"Google, RussHaig/SFNightD40","public_5468499216650860930":"Google, uffishmpk/SelectedFavourites","public_5464708695072547106":"Google, pawliger/Homepage","public_5464721937652197202":"Google, mjwiacek/PhotosILike","public_5464593346215231826":"Google, arendsf/ThomasFavoriteShared"
					
},
                xtype: 'select',
                parent: 'mytheme'
            },
			color: {
                value: '#565656',
                xtype: 'picker',
                parent: 'mytheme'
            },
            bg: {
                value: '#FFC',
                xtype: 'picker',
                parent: 'mytheme'
            },
			imgsbg: {
                value: '',
                size: 80,
                parent: 'mytheme'
            }, imgrbg: {
                value: '',
                size: 80,
                parent: 'mytheme'
            },imgrh: {
                value: '',
                size: 80,
                parent: 'mytheme'
            }, imgh: {
                value: '',
                size: 80,
                parent: 'mytheme'
            }, imghr: {
                value: '',
                size: 80,
                parent: 'mytheme'
            }, imghl: {
                value: '',
                size: 80,
                parent: 'mytheme'
            }, imgrf: {
                value: '',
                size: 80,
                parent: 'mytheme'
            }, imgf: {
                value: '',
                size: 80,
                parent: 'mytheme'
            }, imgfr: {
                value: '',
                size: 80,
                parent: 'mytheme'
            }, imgfl: {
                value: '',
                size: 80,
                parent: 'mytheme'
            }, ncolumns: {
	            value: 2,
	            parent: 'portal'
	       }	
        },
		shortcuts: {
			'toggletheme': {
				id: 'toggletheme',
				title: 'Toggle theme',
				key: {
					//Alt+x
					keyCode: 88,
					altKey: true
				}
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
            'toggletheme': {
                id: 'toggletheme',
                title: 'Toggle theme',
                key: {
                    //Shift+y
                    keyCode: 89,
                    altKey: true
                }
            },
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
        },
        shortcuts: {
            'toggletheme': {
                id: 'togglerelook',
                title: 'Toggle relook',
                key: {
                    //Alt+z
                    keyCode: 90,
                    altKey: true
                }
            }
        }
    },
    favicons: {
        name: "Favicons",
        category: 'icons',
		status: 'updated',
        options: {
            providerpageicons: false,
            sidebaronly: false,
			cloud:true,
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
			miniparas:5,
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
		status:'updated',
        options: {
            onicon: false,
            overlay: false,
			loading: true,
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
            },
			'next': {
                id: 'next',
                title: 'Next preview',
                key: {
                    //81 q
                    keyCode: 81,
					shiftKey:true
                }
            },
			'previous': {
                id: 'previous',
                title: 'Previous preview',
                key: {
                    //81 q
                    keyCode: 81,
					ctrlKey:true
                }
            },
			'close': {
                id: 'close',
                title: 'Close preview',
                key: {
                    //88 ctrl+x
                    keyCode: 88,
					ctrlKey:true
                }
            }
        }
    },
    colorful: {
        name: "Colorful listview",
        category: 'layout',
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
    readbymouse: {
        name: "Read by mouse",
        category: 'navigation',
		status:'updated'
    },
    facebook: {
        name: "Facebook integration",
        category: 'share',
        shortcuts: {
            'gofacebook': {
                id: 'gofacebook',
                title: 'Post on Facebook',
                key: {
                    //70 shift+f
                    keyCode: 70,
					shiftKey:true
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
                    googl:'Goo.gl',
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
            'share': {
                id: 'share',
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
identi: {
        name: "Identi.ca",
        category: 'share',
		status: 'new',
        options: {
            shortener: {
                xtype: 'select',
                values: {
                    googl:'Goo.gl',
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
            'share': {
                id: 'share',
                title: 'Post on Identi.ca',
                key: {
                    //87 w
                    keyCode: 87,
					shiftKey:true
                }
            }
        }
    },
	radbox: {
        name: "Radbox",
        category: 'share',
		status:'new',
        options: {
            auth: {
                xtype: 'p',
                label: true,
                cls: 'subtitle'
            },
            username: {
                value: '',
                size: 40
            }
        },
        shortcuts: {
            'share': {
                id: 'share',
                title: 'Read Later with Radbox',
                key: {
                    //66 b
                    keyCode: 66
                }
            }
        }
    },
	addthis: {
        name: "AddThis",
        category: 'share',
		status:'new',
        options: {
            layoutdesc:{
				xtype:'p'
			},
			layout: {
                xtype: 'select',
                values: {
                    button_classic:'Basic',
					toolbox_more:'Text menu',
					button:'Button',
					button_compact:'Button compact',
					toolbox: 'Toolbox',
					toolbox_preferred:'Toolbox preferred icons',
					toolbox_icons:'Toolbox big icons'
                }
            }
        },
        shortcuts: {
            'share': {
                id: 'share',
                title: 'Share with Addthis',
                key: {
                    //66 ctrl+b
                    keyCode: 66,
                    ctrlKey:true
                }
            }
        }
    },
	blogger: {
        name: "Blogger",
        category: 'share',
		status:'new',
        shortcuts: {
            'share': {
                id: 'share',
                title: 'Share with Blogger',
                key: {
                    //66 b
                    keyCode: 66,
                    altKey:true
                }
            }
        }
    },
/*jaiku: {
        name: "Jaiku",
        category: 'share',
		status: 'new',
        options: {
            username:'',
			location:'',
			shortener: {
                xtype: 'select',
                values: {
                    googl:'Goo.gl',
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
        }
       , shortcuts: {
            'share': {
                id: 'share',
                title: 'Post on Jaiku',
                key: {
                    //87 w + shift+alt
                    keyCode: 87,
					shiftKey:true,
					altKey:true
                }
            }
        }
    },*/
    mark: {
        name: "Mark As Read",
        category: 'navigation',
        shortcuts: {
            'markprev': {
                id: 'markprev',
                title: 'Mark items before As Read',
                key: {
                    //87 shift+w
                    keyCode: 87,
					shiftKey:true
                }
            },
            'marknext': {
                id: 'marknext',
                title: 'Mark items after As Read',
                key: {
                    //89 shift+y
                    keyCode: 89,
					shiftKey:true
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
        options: {
            mini: 30,
            maxi: 200
        }
    },
	prefetch: {
        name: "Prefetch",
        category: 'layout',
        
        options: {
            first: 25,
			next: 15,
			list: 60
        }
    },
	nested: {
        name: "Nested folders",
        category: 'layout',
        
        options: {
            separator: ":"
        }
    },
    replacer: {
        name: "Replacer",
        category: 'content',
        options: {
            intro: {
                xtype: 'p',
                label: true
            },
			cloud: true,
            items: {
                xtype: 'crud'
            }
        }
    },
	filter: {
        name: "Filter",
        category: 'content',
		status:'updated',
        options: {
			excludes: {xtype:'textarea',list:true,cls:'xlist'},
			highlights: {xtype:'textarea',list:true,cls:'xlist'},
			searchbody: false,
			detect_duplicates: true,
			hide_duplicates: false,
			hide_excludes: false,
			prefer_highlights: false,
			live: true,
			button:true,
			word_mini: 4
        }
    },
   /* menu: {
     name: "Smart menu",
	 category: 'navigation',
     desc: "Smart menu to add extra capabilites on each entry"
    },*/
    aero: {
        name: "Google Aero Toolbar",
        category: 'theme'
    },
	actions: {
        name: "Actions icons",
        category: 'action',
		status:'new'
    },
    /*antisocial: {
        name: "Antisocial",
        category: 'layout',
        status: 'new',
        options: {
            status: false
        }
    },*/
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
    'none': {
        general: {
            secure: true,
			stats:true
        }
    },
	'mini': {
        general: {
            secure: true,
			stats:true
        },
		favicons: {
			cloud:true
		},
        unreadcount: true,
        fixlayout: true,
        count: true,
        counticon: true,
        removeads: true
    },
    'ludoo': {
        general: {
            secure: true,
            counter: false,
			pageicon: true,
			stats:true
        },
        favicons: {
			cloud:true
		},
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
        replacer: {
			cloud:true
		},
        preview: {
            onicon: true,
            overlay: true
        },
        theme: {
            skin:'webbizgeek'
			//skin:'mytheme',
			//externaltheme: 'gmail_coldshower'
        }
    },
    'full': {
        general: {
            secure: true,
            counter: false,
			pageicon: true,
			stats:true
        },
		theme: {
            skin: 'osxblack',
			stats:true
        },
        favicons: {
			cloud:true
		},
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
        aero: false,
        instapaper: true,
        readitlater: true,
        translate: true,
        replacer: true,
        limit: true,
		prefetch:true,
		nested:true,
		actions:true,
		identi:true,
		radbox:true,
		blogger:true,
		addthis:true
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
	snowleopard: {
        name: "Snow Leopard Improved",
		status:'updated',
		url: 'http://userstyles.org/styles/userjs/41190/Google%20Reader%20for%20Snow%20Leopard%20Improved.user.js',
        pic: 'http://userstyles.org/style_screenshots/41190_after.jpeg',
        ref: 'http://userstyles.org/styles/41190',
        desc: 'userstyles.org',
        resize: 'footer'
    },
	snowleopard2: {
        name: "Snow Leopard Improved v2",
		status:'new',
		url: 'http://userstyles.org/styles/userjs/45455/Google%20Reader%20for%20Snow%20Leopard%202%20-%20Improved.user.js',
        pic: 'http://userstyles.org/style_screenshots/45455_after.png',
        ref: 'http://userstyles.org/style/45455',
        desc: 'userstyles.org',
        resize: 'footer'
    },
    osxblue: {
        name: "Mac OS X Snow Leopard - Blue",
        resize: 'footer'
    },
    osxblack: {
        name: "Mac OS X Snow Leopard - Black",
        resize: 'footer'
    },
    portal: {
        name: "Portal v2",
		status:'updated'
    },
    helvetireader: {
        name: "Helvetireader Skin"
    },
	darkhelvetireaderday: {
        name: "Dark Helvetireader - Day",
		status:'new',
        pic:'https://chrome.google.com/extensions/img/dkcjfdlgfmefnbhkholnhliliohggmef/1296639253.46/screenshot/3001'
		/*
		url: 'http://stylebot.me/style/get_userscript/61.user.js',
        pic: 'http://stylebot.me/uploads/61.png',
		ref: 'http://stylebot.me/styles/61',
        fix: '.entry-actions{height: auto!important;}',
        desc: 'stylebot.me',
		resize: 'footer'*/
    },
	darkhelvetireadernight: {
        name: "Dark Helvetireader - Night",
		status:'new',
		pic:'https://chrome.google.com/extensions/img/dkcjfdlgfmefnbhkholnhliliohggmef/1296639253.46/screenshot/4001'
		/*url: 'http://stylebot.me/style/get_userscript/62.user.js',
        pic: 'http://stylebot.me/uploads/62.png',
		ref: 'http://stylebot.me/styles/62',
        desc: 'stylebot.me',
		resize: 'footer'*/
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
	sublimelight: {
        name: "Sublime Reader Light",
		ref:'https://code.google.com/p/sublimereader/'
    },
	sublimedark: {
        name: "Sublime Reader Dark",
		ref:'https://code.google.com/p/sublimereader',
		resize:true
    },
	redesigned: {
        name: "Redesigned",
		status:'updated',
		ref:'http://www.globexdesigns.com/products/gr/'
    },
	webbizgeek: {
		name: "WebBizGeek Skin",
		pic: 'http://www.webbizgeek.com/wp-content/uploads/2010/07/Google-Reader-custom-skin1.jpg'
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
    /*'31d1remix': {
	    name: "31d1 remix <span class='new'>New!</span>",
	    url:'http://userstyles.org/styles/userjs/3519/Google%20Reader%20-%2031d1%20remix%20.user.js',
	    pic:'http://userstyles.org/style_screenshots/3519_after.png',
	    ref:'http://userstyles.org/styles/3519',
	    desc: 'userstyles.org'
    },*/
    absolutelycompact: {
        name: "Absolutely Compact",
        url: 'http://userstyles.org/styles/userjs/12691/Google%20Reader%20Absolutely%20Compact.user.js',
        pic: 'http://userstyles.org/style_screenshots/12691_after.png',
        ref: 'http://userstyles.org/styles/12691',
        desc: 'userstyles.org',
        resize: true
    },
    darkshinyblue: {
        name: "Dark Shiny Blue",
        url: 'http://userstyles.org/styles/userjs/8935/iGoogle%2FGoogle%20Dark%20Shiny%20Blue%2C%20transparency.user.js',
        pic: 'http://userstyles.org/style_screenshots/8935_after.png',
        ref: 'http://userstyles.org/styles/8935',
        desc: 'userstyles.org'
    },
    persian: {
        name: "Optimized Persian",
        url: 'http://userstyles.org//styles/userjs/2375/Optimized%20Persian%20Google%20Reader%20.user.js',
        pic: 'http://userstyles.org/style_screenshots/2375_after.png',
        ref: 'http://userstyles.org/styles/2375',
        desc: 'userstyles.org'
    },
	purereader:{
        name: "Pure Reader",
        url: 'http://idzr.org/2ioj',
        pic: 'http://nadesign.net/safari/images/preview-reader.png',
        ref: 'http://nadesign.net/safari/',
		desc: 'Pure Reader by Na\'Design',
		fix:'.gbtc{padding-left:200px;}',
        resize: true
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
	'f': {
        text: 'toggle full screen mode : displays reading list in full screen mode',
        key: {
            keyCode: 70
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
