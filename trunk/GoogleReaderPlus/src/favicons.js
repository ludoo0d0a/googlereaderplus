/**
 * Google Reader Favicon ++ 
 * @version  4.0.3
 * @date 2007-06-01
 *
 * Adds favicons to feeds and entries
 *
 * Original author :
 * Yamamaya
 * http://userscripts.org/scripts/show/40120
 * 
 * +Google Reader Favicon ++ v1.5.0 (LudoO)
 */
GRP.favicons = function(prefs, langs) {
	var SL = langs.favicons; 

	var GRP_INFO = JSON.parse(GM_getValue('grp_favicons', '{}'));
	var FAVICON = GRP_INFO.icon || (GRP_INFO.icon = {});
	var protocol = document.location.protocol;
	var FAVICON_TPL_URL = protocol + '//s2.googleusercontent.com/s2/favicons?alt=feed&domain=';
	var FAVICON_TPL_DEF_URL = protocol + '//s2.googleusercontent.com/s2/favicons';
	var LOADING_IMAGE= "chrome-extension://njidamgjohnfbkeagfbnkllfkdnlpjhi/loading.gif";

	var RSS = getElements('id("sub-tree-item-0-main")/ul/li/ul/li').length;
	var FOLDER = getElements('id("sub-tree-item-0-main")/ul/li').length;
	var RSS_NUMBERS = GRP_INFO.rss || null;
	var FOLDER_NUMBERS = GRP_INFO.dirs || null;

	var googleReader = {
		initFavicons : function() {
			if (isObjectEmpty(FAVICON) || RSS_NUMBERS === null || FOLDER_NUMBERS === null || RSS !== RSS_NUMBERS || FOLDER !== FOLDER_NUMBERS) {
				this.noCacheAddFavicon();
			} else {
				this.addFavicon();
			}

			this.addBaseCss();
			this.addListViewCss();
			// this.showButton();
			this.attachMenu();

			GRP_INFO.rss = RSS;
			GRP_INFO.dirs = FOLDER;
			setValue();
		},
		init : function() {
			this.myport = chrome.extension.connect( {
				name : "googlereaderplus"
			});
			this.prefs = {};
			var me = this;
			function onMessageReceived(a) {
				if (a.message == "iconsloaded") {
					if (a.FAVICON) {
						FAVICON = a.FAVICON;
					}
					me.addFavicon();
					setValue();
				} else if (a.message == "prefs") {
					me.prefs = a.prefs;
					me.initFavicons.call(me);
				} else if (a.message == "iconget") {
					if (a.icon) {
						if (a.FAVICON) {
							FAVICON = a.FAVICON;
						}
						me.renderFavicons(a.url, a.title, a.icon);
						setValue();
					}else{
						alert('Error: Cannot found favicon for "' + a.title + '"');
					}
				}
			}
			this.myport.onMessage.addListener(onMessageReceived);
			this.myport.postMessage( {
				message : "getprefs"
			});
		},
		noCacheAddFavicon : function() {
			//clearCache();
			this.myport.postMessage( {
				message : "loadicons",
				method : 'get',
				url : protocol + '//www.google.com/reader/subscriptions/export',
				FAVICON_TPL_URL : FAVICON_TPL_URL
			});
		},
		renderFavicons : function(url, title, icon) {
			var match = ellipsis(title);
			//var tree = document.getElementById('sub-tree');
			//var main = document.getElementById('main');
			getElements(".//img[@title='" + match + "']").forEach(function(img) {
				img.src = icon;
			});
		},
		//Override with manual favicons
		updateFavicons : function() {
			var domains = prefs.favicons_domains;
			if (!domains || !FAVICON){
				return;
			}
			for(var key in FAVICON){
				var f = FAVICON[key];
				var icon = domains[f.url];
				if (icon){
					f.icon = icon;
				}
			}
		},
		addFavicon : function() {
			this.updateFavicons();
			entryFaviconNoDOMNodeInserted();
			this.entryFavicon();
			this.sideBarFavicon();

			function entryFaviconNoDOMNodeInserted() {
				getElements('.//span[@class="entry-source-title"] | .//a[@class="entry-source-title"]').forEach(
						function(title) {
							//var title = getFirstElementMatchingClassName(entry, 'h2', 'entry-title');
							//var domain = getDomain(a.href);
							var match = ellipsis(title.textContent);
							var icon = document.createElement('img');
							icon.className = 'entry-favicon grf-favicon grf-entry-title';
							icon.title = match;
							
							var t = FAVICON[match];
							if (t){
								icon.src = t.icon;
							} else {
								icon.src = FAVICON_TPL_DEF_URL;
							}

							if (title.tagName !== 'SPAN') {
								title = title.parentNode.parentNode.parentNode.getElementsByTagName('a')[0];
								//var entry = findParentNode(title, 'div', 'entry');
								//title = getFirstElementMatchingClassName(entry, 'a', 'entry-title-link');
							}

							title.parentNode.insertBefore(icon, title);
							// add on first child
							// title.parentNode.insertBefore(icon,title.parentNode.firstChild);

							icon.removeEventListener('error', revertFavicon, false);
							icon.addEventListener('error', revertFavicon, false);
						});
			}
		},
		entryFavicon : function() {
			document.addEventListener('DOMNodeInserted', function(e) {
				var target = e.target;
				entry(target);
				sideBar(target);
			}, false);
			
			//TODO load favicons without dominserted

			function entry(target) {
				if (/^entry\s/i.test(target.className) && target.tagName === 'DIV') {
					var point, match;
					var icon = document.createElement('img');
					icon.className = 'entry-favicon grf-favicon grf-entry';

					if (target.firstChild.className === 'collapsed') { // ?????
						// .//span[contains(@class,'entry-source-title')]
						point = target.getElementsByTagName('span')[0];
						match = point.textContent;
					} else {// ???? .//span[@class='entry-source-title-parent'],
						// ??, ??????
						point = target.getElementsByClassName('entry-title-link')[0]
								|| target.getElementsByClassName('comment-entry-title')[0];
						//titre du site
						var title =target.getElementsByClassName('entry-source-title')[0];
						//var title = target.getElementsByClassName('entry-title')[0];
						if (title) {
							match = title.textContent;
						}
					}
					if (!match) {
						return false;
					}
					match = ellipsis(match);
					icon.title = match;

					if (target.getAttribute('color') === null) {
						target.setAttribute('color', match.replace(/"/g, ''));
					}
					var t = FAVICON[match];
					if (t){
						icon.src = t.icon;
					} else { // popular items | recommended sources
						var fs = target.getElementsByClassName('entry-original')[0]
								|| target.getElementsByClassName('entry-title-link')[0];
						if (fs) {
							fs = FAVICON_TPL_URL+getDomain(fs.href);
							icon.src = fs;
						} else {
							icon.src = FAVICON_TPL_DEF_URL;
						}
					}

					if (point.parentNode.className == "entry-title") {
						// add on first child
						point.parentNode.insertBefore(icon, point.parentNode.firstChild);
					} else {
						point.parentNode.insertBefore(icon, point);
					}

					icon.removeEventListener('error', revertFavicon, false);
					icon.addEventListener('error', revertFavicon, false);
				}
			}

			function sideBar(target) {
				if (target.nodeName.toLowerCase() === 'li' && target.className.match(/^folder/)) {
					googleReader.sideBarFavicon();
				}
			}

		},
		sideBarFavicon : function() {
			getElements('id("sub-tree")//span[contains(@class,"sub-icon")]').forEach(function(e) {
				if (e.parentNode.firstChild.nodeName.toLowerCase() === 'img') {
					return;
				}
				var title = e.nextSibling;
				var match = ellipsis(title.firstChild.textContent);
				title.style.paddingLeft = '7px';
				var icon = document.createElement('img');
				icon.className = 'grf-favicon grf-sidebar';
				icon.title = match;
				e.parentNode.insertBefore(icon, e);
				e.parentNode.removeChild(e);

				//var t = findFaviconByTitle(FAVICON, match);
				var t = FAVICON[match];
				if (t){
					icon.src = t.icon;
				} else {
					icon.src = FAVICON_TPL_DEF_URL;
				}
				icon.removeEventListener('error', revertFavicon, false);
				icon.addEventListener('error', revertFavicon, false);
			});
		},
		addBaseCss : function() {
			GM_addStyle("img.entry-favicon{ width:16px !important; height:16px !important; border:none !important; margin-right:5px}.collapsed img.entry-favicon{ position:absolute !important; top:3px !important; left:1.6em !important; margin-right:0px !important; vertical-align:baseline !important}#entries.list .collapsed .entry-main .entry-source-title{ left:3.25em !important; width:9em !important}#sub-tree a img{ width:16px; height:16px; border:none; vertical-align:middle}#entries.list .collapsed .entry-secondary{ margin:0 8.5em 0 14em !important}#entries.single-source .collapsed .entry-source-title{ display:block !important}.colorful-view-content{ color:#EEE !important}.colorful-view-base-top-shadow{ background-color:#999 !important; border-bottom-color:#888 !important}.colorful-view-inner-box{ background-color:#777 !important; background:#F9F9F9 none repeat scroll 0 0 !important; border-color:#888 !important}.colorful-view-base-pos{ background-color:#777 !important; border-color:#888 !important}");
		},
		addListViewCss : function() {
			GM_addStyle("#entries.list .read .collapsed{opacity:0.6}#entries.list .entry .collapsed:hover{background:#C2CFF1}#entries.list .read .collapsed:hover{opacity:1.0;background:#C2CFF1}");
		},
		showButton : function() {
			var insert = document.getElementById('stream-prefs-menu');
			var div = document.createElement('div');
			var divStyle = div.style;
			divStyle.marginLeft = '0.5em';
			div.className = 'goog-button goog-button-base unselectable goog-inline-block goog-button-float-left goog-button-tight viewer-buttons';
			div.setAttribute('tabindex', '0');
			div.setAttribute('role', 'wairole:button');
			div.innerHTML = '<div class="goog-button-base-outer-box goog-inline-block"><div class="goog-button-base-inner-box goog-inline-block"><div class="goog-button-base-pos"><div class="goog-button-base-top-shadow">&nbsp;</div><div class="goog-button-base-content"><div class="goog-button-body">'+SL.preferences+'</div></div></div></div></div>';
			insert.parentNode.insertBefore(div, insert.nextSibling);
			var me = this;
			div.addEventListener('click', function(e) {
				me.myport.postMessage( {
					message : "openprefs"
				});
			}, false);
		},
		attachMenu : function() {
			var me = this;
			document.body.addEventListener('DOMNodeInserted', function(e) {
				var target = e.target;
				if (!target.grfm && target.className && target.className.indexOf("goog-menu") >= 0) {
					target.grfm = "1";
					target.addEventListener('DOMNodeInserted', function(e) {
						var node = e.target;
						if (target.grfm !== "2") {
							setTimeout(function() {
								me.showMenuItem(target, me);
							}, 500);
							target.grfm = "2";
						}
					}, false);
				}
			}, false);
		},
		showMenuItem : function(menu, scope) {
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
			div.innerHTML = '<div class="goog-menuitem-content">'+SL.getfavicon+'</div>';
			sep.parentNode.insertBefore(div, sep.nextSibling);// insert after

		// +separator
		var separator = document.createElement('div');
		separator.className = 'goog-menuseparator';
		separator.style = '-webkit-user-select: none;';
		div.parentNode.insertBefore(separator, div.nextSibling);

		var me = this;
		div.addEventListener('click', function(e) {
			var node = document.getElementsByClassName('menu-open')[0];
			var img = node.firstChild;// grf-favicon
				// grf-sidebar
				var key;
				if (img.tagName === "IMG") {
					key = img.title;
				} else {
					// img not there, used 2nd span.name/@title
					key = img.nextSibling.title;
				}
				var f = FAVICON[key];
				if (f) {
					img.src=LOADING_IMAGE;
					me.myport.postMessage( {
						message : "geticon",
						key : key,
						FAVICON : FAVICON
					});
					// ->iconget
				} else {
					var msg = formatText(SL.notfoundicon, title);
					alert(msg);
				}
				// hide menu
				menu.blur();
				node.focus();
			}, false);
		div.addEventListener('mouseover', function(e) {
			e.target.parentNode.className += ' goog-menuitem-highlight';
		}, false);
		div.addEventListener('mouseout', function(e) {
			e.target.parentNode.className = e.target.parentNode.className.replace('goog-menuitem-highlight', '');
		}, false);
	}
}
	};

	googleReader.init();

	function revertFavicon(event) {
		this.src = FAVICON_TPL_DEF_URL;
	}
	
	function getDomain(url){
		return url.split(/\/|\?/)[2];
	}
	
	function findFaviconByTitle(FAVICON,  title){
		return find(FAVICON, 'title', title);
	}

	function setValue() {
		GRP_INFO.icon = FAVICON;
		GM_setValue('grp_favicons', JSON.stringify(GRP_INFO));
	}

	function clearCache() {
		GM_setValue('grp_favicons', '');
	}

};
