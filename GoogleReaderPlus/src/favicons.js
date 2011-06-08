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
GRP.favicons = function(prefs, langs, ID, SL, lang){
    var GRP_INFO = GM_getValue('grp_favicons', {});
    var ICONS_TITLE = GRP_INFO.icon || (GRP_INFO.icon = {});
    updateFavicons();
    var protocol = document.location.protocol;
    var ICO_TPL_URL = protocol + '//s2.googleusercontent.com/s2/favicons?alt=feed&domain=';
	//ICO_TPL_URL = protocol + '//www.google.com/profiles/c/u/0/favicons?domain=';
	
    var ICONS_TITLE_TPL_DEF_URL = protocol + '//s2.googleusercontent.com/s2/favicons';
    if (prefs.favicons_providerpageicons) {
        ICO_TPL_URL = 'http://pageicons.appspot.com/favicons?f=1&url=';
        ICONS_TITLE_TPL_DEF_URL = 'http://pageicons.appspot.com/favicons';
    }
	//ICO_TPL_URL = 'http://getfavicons.appspot.com?domain=';
	
    //var LOADING_IMAGE = "chrome-extension://'+GUID_CORE+'/images/loading.gif";
    var LOADING_IMAGE = GRP.IMAGES_PATH+"/loading.gif";
	
    var RSS = getElements('id("sub-tree-item-0-main")/ul/li/ul/li').length;
    var FOLDER = getElements('id("sub-tree-item-0-main")/ul/li').length;
    var RSS_NUMBERS = GRP_INFO.rss || null;
    var FOLDER_NUMBERS = GRP_INFO.dirs || null;
	
    function init(){
        if (true || isObjectEmpty(ICONS_TITLE) || RSS_NUMBERS === null || FOLDER_NUMBERS === null || RSS !== RSS_NUMBERS || FOLDER !== FOLDER_NUMBERS) {
            loadFavicons();
        } else {
            initFavicons();
        }
        GRP_INFO.rss = RSS;
        GRP_INFO.dirs = FOLDER;
        setValue();
    }
    
    function loadFavicons(){
        //clearCache();
		mycore.extension.sendRequest(
        {
            message: "loadicons",
            method: 'get',
            url: protocol + '//www.google.com/reader/subscriptions/export',
            ICO_TPL_URL: ICO_TPL_URL
        }, function(a){
			if (a.ICONS_TITLE) {
                ICONS_TITLE = a.ICONS_TITLE;
                updateFavicons();
            }
            initFavicons();
            setValue();
        });
		
		if (!prefs.favicons_sidebaronly) {
			//Moved on creation
			registerFeature(addFaviconEntry, ID, {
				onlistviewtitle: true
			});
		}
    }
    
    function initFavicons(){
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
    
    function addFaviconEntry(el, entry, mode){
		if (isTagged(entry, 'tfavicon')) {
            //stop entry was already scanned
            return;
        }
        
        var icon = document.createElement('img');
        icon.className = 'entry-favicon grf-favicon grf-entry';       
        var siteTitle = getEntrySiteTitle(entry);
        var match = ellipsis(siteTitle);
        icon.title = match;
        
        var t = ICONS_TITLE[match];
        if (t) {
            icon.src = t.icon;
        } else { // popular items | recommended sources
            var fs = entry.getElementsByClassName('entry-original')[0] ||
            entry.getElementsByClassName('entry-title-link')[0];
            if (fs) {
                fs = ICO_TPL_URL + getDomain(fs.href);
                icon.src = fs;
            } else {
                icon.src = ICONS_TITLE_TPL_DEF_URL;
            }
        }
        
        var point;
		insertOnTitle(entry, icon, mode);
    }
	
    function addFaviconSidebar(el, mode){
		if (isTagged(el, 'tfavicon')) {
            //stop entry was already scanned
            return;
        }
		
		function addIcon(el){
			var elsubicon = getFirstElementByClassName(el, 'sub-icon');//span
			var title = elsubicon.nextSibling;
			var match = ellipsis(title.firstChild.textContent);
			title.style.paddingLeft = '7px';
			var icon = document.createElement('img');
			icon.className = 'grf-favicon grf-sidebar';
			icon.title = match;
			var ep = elsubicon.parentNode;
			ep.insertBefore(icon, elsubicon);
			ep.removeChild(elsubicon);
		
			//console.log('setIcon:'+match);
			//var t = findFaviconByTitle(ICONS_TITLE, match);
			var t = ICONS_TITLE[match];
			if (t) {
				icon.src = t.icon;
			} else {
				icon.src = ICONS_TITLE_TPL_DEF_URL;
			}
		}
		
		var tim= (hasClass(el, 'unread'))?0:4000;
		window.setTimeout(function(){
			addIcon(el);
		}, tim);
    }
    
    function renderFavicons(o){
        var match = ellipsis(o.title);
        //var tree = document.getElementById('sub-tree');
        //var main = document.getElementById('main');
        getElements(".//img[@title='" + match + "']").forEach(function(img){
            img.src = o.icon;
        });
    }
    
    //Override with manual favicons
    function updateFavicons(){
        var domains = prefs.favicons_domains;
        if (!domains || !ICONS_TITLE) {
            return;
        }
        for (var key in ICONS_TITLE) {
            var f = ICONS_TITLE[key];
			if (f) {
				var icon = domains[f.url];
				if (icon) {
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
    function findFaviconByTitle(ICONS_TITLE, title){
        return find(ICONS_TITLE, 'title', title);
    }
    
    function setValue(){
        GRP_INFO.icon = ICONS_TITLE;
		//cache only in webpage storage
        GM_setValue('grp_favicons', GRP_INFO, false);
    }
    
    function clearCache(){
        GM_setValue('grp_favicons', '');
    }
    
    function attachMenu(){
        var me = this;
        document.body.addEventListener('DOMNodeInserted', function(e){
            var target = e.target;
			if (!target.grfm && hasClass(target,"goog-menu")) {
                target.grfm = "1";
                target.addEventListener('DOMNodeInserted', function(e){
                    var node = e.target;
                    if (target.id=='stream-prefs-menu-menu' && target.grfm !== "2") {
                        setTimeout(function(){
                            showMenuItem(target, me);
                        }, 500);
                        target.grfm = "2";
                    }
                }, false);
            }
        }, false);
    }
	
    function showMenuItem(menu, scope){
        if (!menu) {
            return;
        }
        // find first separator
        var seps = menu.getElementsByClassName('goog-menuseparator');
        if (seps && seps.length > 0) {
            var sep = seps[0];
            var div = document.createElement('div');
            div.className = 'goog-menuitem goog-option grf-menuitem';
            div.style = '-webkit-user-select: none;';
            div.innerHTML = '<div class="goog-menuitem-content">' + SL.getfavicon + '</div>';
            sep.parentNode.insertBefore(div, sep.nextSibling);// insert after
            // +separator
            var separator = document.createElement('div');
            separator.className = 'goog-menuseparator';
            separator.style = '-webkit-user-select: none;';
            div.parentNode.insertBefore(separator, div.nextSibling);
            
            var me = this;
            div.addEventListener('click', function(e){
                var node = document.getElementsByClassName('menu-open')[0];
                if (node) {
                    var img = node.firstChild;// grf-favicon
                    // grf-sidebar
                    var key = '';
                    if (img.tagName === "IMG") {
                        key = img.title;
                    } else {
                        // img not there, used 2nd span.name/@title
                        key = img.nextSibling.title;
                    }
                    var f = ICONS_TITLE[key];
                    //if (!f) {
                        //try to get url+title, but this solution is sometimes wrong !!
						var dir = getSelectedDir(node);
						if (dir) {
							ICONS_TITLE[key] = {
								url: dir.url,
								title: dir.text
							};
						}
                    //}
					function promptIcon(a){
						var url = prompt(formatText(SL.notfoundicon, a.title),a.url||'favicon.ico');
						if (url) {
							a.url=url;
							ICONS_TITLE[a.title] = a;
							updateFavicons();
						}
						return url;
					}
                    if (f) {
                        var oldimg = img.src, _key = key;
						img.src = '';
                        img.src = LOADING_IMAGE;
                        mycore.extension.sendRequest(
                        {
                            message: "geticon",
                            key: key,
							f: ICONS_TITLE[key]
                            //,ICONS_TITLE: ICONS_TITLE
                        }, function(a){
                            if (a.o && a.o.icon) {
								if (a.ICONS_TITLE) {
                                    ICONS_TITLE = a.ICONS_TITLE;
                                }else{
									ICONS_TITLE[_key]=a.o;
								}
								updateFavicons();
                                renderFavicons(a.o);
                                setValue();
                            } else {
                                var url = promptIcon(a);
								if (!url) {
									img.src = oldimg;
								}
                            }
                        });
                        // ->iconget
                    } else {
                        var url = promptIcon({title: key});
                    }
                }
                // hide menu
                menu.blur();
                node.focus();
            }, false);
            div.addEventListener('mouseover', function(e){
                e.target.parentNode.className += ' goog-menuitem-highlight';
            }, false);
            div.addEventListener('mouseout', function(e){
                e.target.parentNode.className = e.target.parentNode.className.replace('goog-menuitem-highlight', '');
            }, false);
        }
    }
    
    var css = "img.entry-favicon{ width:16px !important; height:16px !important; border:none !important; margin-right:5px}.collapsed img.entry-favicon{position:absolute !important; top:3px !important; left:2em !important; margin-right:0px !important; vertical-align:baseline !important}#entries.list .collapsed .entry-main .entry-source-title{left:4em !important; width:7.2em !important}#sub-tree a img{ width:16px; height:16px; border:none; vertical-align:middle}.colorful-view-content{ color:#EEE !important}.colorful-view-base-top-shadow{ background-color:#999 !important; border-bottom-color:#888 !important}.colorful-view-inner-box{ background-color:#777 !important; background:#F9F9F9 none repeat scroll 0 0 !important; border-color:#888 !important}.colorful-view-base-pos{ background-color:#777 !important; border-color:#888 !important}";
	//css += '#entries.list:not(.single-source) .collapsed .entry-secondary{ margin-left:14em !important}';
	css += '#entries.list.single-source .collapsed .entry-secondary{ margin-left:4em !important}';
    GM_addStyle(css);
    
    attachMenu();
    init();

};


