/**
 * General configuration
 * @version  0.1
 * @date 2010
 *
 */
GRP.general = function(prefs, langs, ID, SL, lang) {
	var CLS_CURRENT = 'grp_current';
	if (prefs.general_secure) {
		if (/^http\:/.test(window.location.href)) {
			window.location.href = window.location.href.replace(/^http\:/, 'https:');
		}
	}
	var entries = get_id('entries');
	if (prefs.general_bottomup) {
		var el = get_id('viewer-footer'), ref = get_id('viewer-header'), c = get_id('chrome');
		ref = get_id('stream-prefs-menu');
		var h = el.clientHeight;
		var css = 'div#entries-status{width:auto;top:0px;}';
		css+= 'div#viewer-footer{border:none;padding:0;}';
		GM_addStyle(css, 'rpe_bottomup');
		insertAfter(el, ref);
		entries.style.height = (getStyle(entries, 'height') + h) + 'px';
	}
	if (prefs.general_hidetoolbar) {
		//TODO: full screen, margin top - toolbar height
		GM_addStyle('#gb{display:none !important;}','rpe_hidetoolbar');
		fireResize('',100);
	}
	if (prefs.general_hideplus) {
		GM_addStyle('div.item-plusone{display:none !important;}','rpe_hideplus');
		fireResize('',100);
		function removeButtonPlus(el, entry, mode){
			var els = el.getElementsByClassName('item-plusone');
			foreach(els, function(el){
				remove(el);
			});
		}
		registerFeature(removeButtonPlus, ID+'_hideplus');
	}
	
	/*if (prefs.general_linkbar) {
		var c = getFirstElementByClassName(document, 'gbtc');
		var g = getLastElementByClassName(c, 'gbt');
		if (g){
			dh(g, 'li', {
				position:'before',
				cls:'gbt',
				html:'<a onclick="gbar.qs(this)" class="gbzt" id="gb_99" href="/reader/view/?hl=en&tab=wy&authuser=0"><span class="gbtb2"></span><span class="gbts">Reader</span></a>'
			});
		}
	}*/
	if (prefs.general_currdir) {
		var lastUrl='';
		GM_addStyle('.tree-sel{background-color:#dedede;}', 'rpe_currdir');
		var st = get_id('sub-tree');
		setInterval( function() {
			var e = get_id('current-entry'),st = get_id('sub-tree');
			var sth = getHeight(st);
			if (e) {
				var el = getFirstElementByClassName(e, 'entry-source-title');
				if (el) {
					var url = el.getAttribute('href');
					if (url && url !== lastUrl) {
						var l = getFirstElementByClassName(st, 'tree-sel');
						if (l) {
							removeClass(l, 'tree-sel');
						}
						//var a = Sizzle('#sub-tree a.link[href="' + url + '"]');
						var a = getElements(".//a[@class='link'][@href='" + url + "']", st);
						if (a && a.length > 0) {
							addClass(a[0], 'tree-sel');
							lastUrl = url;
							//ensure visible
							//TODO : Better
							var h = findTop(a[0], st);
							if (h<st.scrollTop || h>st.scrollTop+sth) {
								st.scrollTop = h;
							}
						}
					}
				}
			}
		},2000);
	}
	if (prefs.general_topcurrent) {
		function updateSpacer() {
			var scrollspacer = get_id('scrollspacer');
			if (!scrollspacer) {
				var h = getHeightEntries();//screen.height
				scrollspacer = dh(entries, 'div', {
					id: 'scrollspacer',
					html: '&nbsp;'
				});
				scrollspacer.style.height = h + 'px';
			}
		}

		updateSpacer();
		var cur, oldcur;
		window.setInterval( function() {
			cur = get_id('current-entry');
			//check if current entry hans changed!
			if (cur && !hasClass(cur, CLS_CURRENT)) {
				updateSpacer();
				oldcur = getFirstElementByClassName(entries, CLS_CURRENT);
				if (oldcur) {
					removeClass(oldcur, CLS_CURRENT);
				}
				addClass(cur, CLS_CURRENT);
				entries.scrollTop = cur.offsetTop;
			}
		}, 500);
	}

	function floatactions() {
		//Remove #entries.list .entry .entry-actions {left:0px;}
		var ss = findre(document.styleSheets, 'href', /-scroll\.css/);
		if (ss) {
			var rule = find(ss.cssRules, 'selectorText', '#entries.list .entry .entry-actions');
			if (rule) {
				rule.style.left = '';
			}
		}
		var main = get_id('main');
		var top = main.offsetTop; //getStyle(main, 'top');
		top = Math.max(142, top + 77);
		var w = 140;
		//ig    : main.top=140 top=217 (+77)
		//normal: main.top=65  top=142 (+77)
		var css = '';
		if (prefs.general_icons){
			w=40;
			css += '.rp-action-icons .user-tags-list{display:none;}';//hide tags
			addClass(get_id('entries'), 'rp-action-icons');
		}
		css += '.entry:not(#current-entry) .card-actions{display:none}#current-entry .card-actions,#entries.list #current-entry .entry-actions{position:fixed;right:32px!important;top:' + top + 'px!important;left:!important;width:'+w+'px;z-index:9999;-webkit-box-shadow:#E3E5EB 0 1px 1px;border-bottom-left-radius:5px 5px;border-bottom-right-radius:5px 5px;border-top-left-radius:5px 5px;border-top-right-radius:5px 5px;border:2px solid #68E;opacity:0.2}#current-entry .card-actions:hover,#entries.list #current-entry .entry-actions:hover{opacity:1}#current-entry .entry-actions > span,#entries.list #current-entry .entry-actions > span{display:block;height:15px;margin:1px;}';
		//star only, strange way todo...
		css += '#current-entry .entry-actions > span.star,#entries.list #current-entry .entry-actions > span.star{width:0px}';
		css += '#current-entry .entry-main{margin-right:'+w+'px}';//Current reduced for current floating menu
		GM_addStyle(css, 'rpe_floatactions');
	}

	if (prefs.general_floatactions) {
		runfn(floatactions, 'floatactions', 99, 2000);
		//defer to get right #main.top
	}

	if (prefs.general_icons) {
		function changeIconsButton(el, entry, mode) {
			var items = el.getElementsByClassName('link');
			foreach(items, function(item) {
				if (item && !hasClass(item, 'read-state')) {
					item.title=item.innerText;
					var s = item.getElementsByTagName('span');
					var b = (s && s[0])?(s[0]):item;
					if (s && s[0] && hasClass(s[0],'entry-tagging-action-title')){
						removeClass(item,'tag');
						removeClass(item,'link');
						addClass(s[0],'tag link');
					}
					b.innerHTML='';
				}
			});
		}
		
		//entry-tagging-action-title

		//RAZ labels because google rewrite labels after selection
		//Xp MArquer comme lu = chekbox
		/*var o = ['w','x','y','z', 'B', 'C'];
		var js = '';
		foreach(o, function(e) {
			js += e+"q.Nf.Sb='';";
			js += e+"q.Of.Sb='';";
		});
		GM_addjs(js, true, 'clearlabel');
		*/
		GM_addjs('http://googlereaderplus.googlecode.com/svn/trunk/GoogleReaderPlus/script/clearlabel.js', false, 'clearlabel');
		
		registerFeature(changeIconsButton, ID+'_icons');
	}
};
