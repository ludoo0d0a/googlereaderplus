/**
 * Google Reader Favicon ++
 * @version  4.0.3/4.1.0
 *
 *
 * Adds favicons to feeds and entries
 *
 * Original author :
 * Yamamaya
 * http://userscripts.org/scripts/show/40120
 *
 * +Google Reader Favicon ++ v1.5.0 (LudoO)
 */
GRP.favicons = function(prefs, langs, ID, SL, lang) {
	mycore.storage.removeItem('grp_favicons',false,true);
	var GRP_INFO = GM_getValue('cache_favicons', {});
	var ICONS_TITLE = GRP_INFO.icon || (GRP_INFO.icon = {});
	updateFavicons();
	var protocol = document.location.protocol;
	var ICO_TPL_URL = protocol + '//s2.googleusercontent.com/s2/favicons?alt=feed&domain=';

	var ICONS_TITLE_TPL_DEF_URL = protocol + '//s2.googleusercontent.com/s2/favicons';
	if(prefs.favicons_providerpageicons) {
		ICO_TPL_URL = 'http://pageicons.appspot.com/favicons?f=1&url=';
		ICONS_TITLE_TPL_DEF_URL = 'http://pageicons.appspot.com/favicons';
	}

	var LOADING_IMAGE = GRP.IMAGES_PATH + "/loading.gif";

	var RSS = {
		items : getElements('id("sub-tree-item-0-main")/ul/li/ul/li').length,
		folders : getElements('id("sub-tree-item-0-main")/ul/li').length,
		_items : GRP_INFO.rss || null,
		_folders : GRP_INFO.dirs || null
	};

	function init() {
		if(isObjectEmpty(ICONS_TITLE)) {
			loadFavicons();
		} else if(RSS._items === null || RSS._folders === null || RSS._items !== RSS.items || RSS._folders !== RSS.folders) {
			loadFavicons(true);
		} else {
			initFavicons();
		}
		GRP_INFO._folders = RSS.folders;
		GRP_INFO._items = RSS.items;
		setValue();
	}

	function loadFavicons(loadNow) {
		//clearCache();
		if(loadNow) {
			//Load first, then update
			initFavicons();
		}
		console.log('sites list loading...');
		mycore.extension.sendRequest({
			message : "loadicons",
			method : 'get',
			url : protocol + '//www.google.com/reader/subscriptions/export',
			ICO_TPL_URL : ICO_TPL_URL
		}, function(a) {
			if(a.ICONS_TITLE) {
				console.log('sites list loaded');
				ICONS_TITLE = a.ICONS_TITLE;
				updateFavicons();
				initFavicons();
				setValue();
			}
		});
		if(!prefs.favicons_sidebaronly) {
			//Moved on creation
			registerFeature(addFaviconEntry, ID, {
				onlistviewtitle : true
			});
		}
	}

	function initFavicons() {
		//Do not wait loading, register first
		/*if (!prefs.favicons_sidebaronly) {
		 registerFeature(addFaviconEntry, ID,
		 {
		 onlistviewtitle: true
		 });
		 //forAllEntries(addFaviconEntry);
		 }*/
		initCatchSidebars(addFaviconSidebar, 'sidebar-favicons');
	}

	function addFaviconEntry(ea, entry, mode, body) {
		/*if(isTagged(entry, 'tfavicon')) {
			//stop entry was already scanned
			return;
		}*/
		if (body && mode==='list'){
			//already done if body reloaded in ListView
			return;
		}
		
		var icon = document.createElement('div');
		icon.className = 'favicon gr-favicon grf-entry';
		var match = getEntrySiteTitle(entry);
		icon.title = escapeHTML(match);

		var t = ICONS_TITLE[match];
		if(t) {
			src = t.icon;
		} else {
			// popular items | recommended sources
			var fs = gfe(entry,'entry-original') || gfe(entry,'entry-title-link');
			if(fs) {
				fs = ICO_TPL_URL + getDomain(fs.href);
				src = fs;
			} else {
				src = ICONS_TITLE_TPL_DEF_URL;
			}
		}
		setBgImg(icon, fixUrl(src));
		addClass(entry, 'entry-favicon');
		//insertOnTitleStart(entry, icon, mode);
		insertOnTitle(entry, icon, mode);
	}
	
	function fixUrl(src){
		var url = src;
		if (!/^http:/.test(url)){
			url='http://'+url;
		}
		return url; 
	}

	function addFaviconSidebar(el, mode) {
		/*if(isTagged(el, 'tfavicon')) {
			//stop entry was already scanned
			return;
		}*/

		function addIcon(el) {
			var elicon = gfe(el, 'icon');
			//div
			if(elicon) {
				addClass(elicon, ['favicon', 'gr-favicon', 'grf-sidebar']);

				var title = gfe(el, 'name-text');
				//div.name-text
				//var match = ellipsis(title.textContent);
				var match = title.textContent;

				//console.log('setIcon:'+match);
				//var t = findFaviconByTitle(ICONS_TITLE, match);
				var src = '', t = ICONS_TITLE[match];
				if(t) {
					src = t.icon;
				} else {
					src = ICONS_TITLE_TPL_DEF_URL;
				}
				elicon.title = escapeHTML(match);
				setBgImg(elicon, src);
			}
		}

		var tim = (hasClass(el, 'unread')) ? 0 : 4000;
		window.setTimeout(function() {
			addIcon(el);
		}, tim);
	}

	function renderFavicons(o){
		//var match = ellipsis(o.title);
		var match = o.title;
		getElements(".//div[contains(@class,'favicon')][@title='" + match + "']").forEach(function(el){
			setBgImg(el, o.icon);
		});
	}

	//Override with manual favicons
	function updateFavicons() {
		var domains = prefs.favicons_domains;
		if(!domains || !ICONS_TITLE) {
			return;
		}
		for(var key in ICONS_TITLE) {
			var f = ICONS_TITLE[key];
			if(f) {
				var icon = domains[f.url];
				if(icon) {
					ICONS_TITLE[key].icon = icon;
				}
			}
		}
	}

	/*
	 function revertFavicon(event){
	 this.src = ICONS_TITLE_TPL_DEF_URL;
	 }
	 */
	function findFaviconByTitle(ICONS_TITLE, title) {
		return find(ICONS_TITLE, 'title', title);
	}

	function setValue() {
		GRP_INFO.icon = ICONS_TITLE;
		//cache only in webpage storage
		GM_setValue('cache_favicons', GRP_INFO, false);
	}

	function clearCache() {
		GM_setValue('cache_favicons', '');
	}

	function attachMenu() {
		var me = this;
		document.body.addEventListener('DOMNodeInserted', function(e) {
			var target = e.target;
			if(!target.grfm && hasClass(target, 'goog-menu')) {
				target.grfm = "1";
				target.addEventListener('DOMNodeInserted', function(e) {
					var node = e.target;
					if(hasClass(target, 'subscription-folders-menu') && target.grfm !== "2") {
						setTimeout(function() {
							showMenuItem(target, me);
						}, 500);
						target.grfm = "2";
					}
				}, false);
			}
		}, false);
	}

	function onMenuItemClick(e, menu) {
		var node = gfe(document, 'menu-open');
		//a
		if(node) {
			var icon = gfe(node, 'favicon');
			// img not there, used 2nd div.name/@title
			var key = unescapeHTML(icon.title||'') || icon.nextSibling.textContent;
			//try to get url+title, but this solution is sometimes wrong !!
			var f = ICONS_TITLE[key];
			var dir = getSelectedDir(node);
			if(dir && key) {
				//overwrite value
				ICONS_TITLE[key] = {
					url : dir.url,
					title : dir.text
				};
			}

			function promptIcon(a) {
				var url = prompt(formatText(SL.notfoundicon, a.title), a.url||'');
				if(url) {
					a.url = url;
					ICONS_TITLE[a.title] = a;
					updateFavicons();
				}
				return url;
			}

			if(f) {
				var oldicon = getBgImg(icon), _key = key;
				setBgImg(icon, LOADING_IMAGE);
				mycore.extension.sendRequest({
					message : 'geticon',
					key : key,
					f : ICONS_TITLE[key]
				}, function(a) {
					var o = a && a.o;
					if(o && o.icon && o.exists) {
						ICONS_TITLE[_key] = o;
						setBgImg(icon, o.icon);
						renderFavicons(o);
						updateFavicons();
						setValue();
					} else {
						o.url=(o.url||'')+'/favicon.ico';
						var url = promptIcon(o);
						if(!url) {
							setBgImg(icon, oldicon);
						}
					}
				});
				// ->iconget
			} else {
				var o = ICONS_TITLE[key]||{};
				var url = promptIcon({
					title : key,
					url:((o.url||'')+'/favicon.ico')
				});
			}
			node.focus();
		}
		// hide menu
		menu.blur();
	}

	function showMenuItem(menu, scope) {
		if(!menu) {
			return;
		}

		var mi = dh(menu, 'div', {
			cls : 'goog-menuitem',
			role : 'menuitem',
			position : 'first'
			//style="-webkit-user-select: none; "
		});

		var div = dh(mi, 'div', {
			cls : 'goog-menuitem-content',
			text : SL.getfavicon
		}, {
			mouseover : function(e) {
				addClass(e.target.parentNode, 'goog-menuitem-highlight');
			},
			mouseout : function(e) {
				removeClass(e.target.parentNode, 'goog-menuitem-highlight');
			},
		});

		var sep = dh(mi, 'div', {
			cls : 'goog-menuseparator',
			position : 'after'
		});

		menu.scrollTop = 0;

		div.addEventListener('click', function(e) {
			onMenuItemClick(e, menu);
		}, false);
	}
	
	var css = '.favicon{background-repeat:no-repeat !important;background-position:center !important;background-size: 16px 16px !important;}';
	css += '.grf-entry{width:16px;height:16px;display: inline-block;margin-right:4px;}';

	//listview
	//css += '.collapsed img.entry-favicon{position:absolute !important; top:3px !important; left:2em !important; margin-right:0px !important; vertical-align:baseline !important}';
	css += '#entries.list .collapsed .entry-main .entry-source-title{left:4em !important; width:10em !important;padding:0px !important}';
	css += '#entries.list.single-source .collapsed .entry-secondary{ margin-left:4em !important}';
css += '.samedir #entries.list .entry-favicon .collapsed .entry-secondary {margin-left: 14em; !important}';	
	css += '.entry.entry-favicon .entry-icons .star{margin-right:4px;}';
	//    css += ".colorful-view-content{ color:#EEE !important}.colorful-view-base-top-shadow{ background-color:#999 !important; border-bottom-color:#888 !important}.colorful-view-inner-box{ background-color:#777 !important; background:#F9F9F9 none repeat scroll 0 0 !important; border-color:#888 !important}.colorful-view-base-pos{ background-color:#777 !important; border-color:#888 !important}";

	GM_addStyle(css, 'rpe_' + ID);

	attachMenu();
	init();

};
