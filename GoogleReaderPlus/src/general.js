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
	}
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
		var w = (prefs.general_icons)?40:140;
		//ig    : main.top=140 top=217 (+77)
		//normal: main.top=65  top=142 (+77)
		var css = '.entry:not(#current-entry) .card-actions{display:none}#current-entry .card-actions,#entries.list #current-entry .entry-actions{position:fixed;right:32px!important;top:' + top + 'px!important;left:!important;width:'+w+'px;z-index:9999;-webkit-box-shadow:#E3E5EB 0 1px 1px;border-bottom-left-radius:5px 5px;border-bottom-right-radius:5px 5px;border-top-left-radius:5px 5px;border-top-right-radius:5px 5px;border:2px solid #68E;opacity:0.2}#current-entry .card-actions:hover,#entries.list #current-entry .entry-actions:hover{opacity:1}#current-entry .entry-main{margin-right:'+w+'px}#current-entry .entry-actions > span,#entries.list #current-entry .entry-actions > span{display:block;height:15px;margin:1px;}';
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
					console.log(item.title);
					var s = item.getElementsByTagName('span');
					var b = (s && s[0])?(s[0]):item;
					if (s && s[0] && hasClass(s[0],'entry-tagging-action-title')){
						removeClass(item,'tag');
						removeClass(item,'link');
						addClass(s[0],'tag link');
					}
					b.innerHTML='';
					addClass(b,'debug_clean');
				}
			});
		}
		
		
		//entry-tagging-action-title

		//RAZ labels because google rewrite labels after selection
		//Xp MArquer comme lu = chekbox
		var o = ['r','s','t','u','v','w','x'];
		var js = '';
		foreach(o, function(e) {
			js += e+"q.Pf.Sb='';";
			js += e+"q.Of.Sb='';";
		});
		GM_addjs(js, true, 'clearlabel');
		registerFeature(changeIconsButton, ID);
	}
};
