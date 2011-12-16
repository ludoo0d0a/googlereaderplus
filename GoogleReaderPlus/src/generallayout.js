/**
 * General layout
 * @version  0.1
 * @date 2011
 *
 */
GRP.generallayout = function(prefs, langs, ID, SL, lang) {
	var CLS_CURRENT = 'grp_current';
	function getPref(id){
		return prefs[ID+'_'+id];
	}
    
	function setnewbar(status){
    	setTimeout(function(){
	    		var domain = window.location.host.replace('www','');
	    		var js = 'document.cookie="PREF=ID=0:U=0:FF=0:LD=en:CR=0:TM=0:LM=0:S=A; path=/; domain='+domain+'";';
	    		if (status){
	    			if (get_id('gbq1')){
	    				return;
	    			}
	    			//http://googlesystem.blogspot.com/2011/11/how-to-try-googles-new-navigation-menu.html
	    			js = 'document.cookie="PREF=ID=03fd476a699d6487:U=88e8716486ff1e5d:FF=0:LD=en:CR=2:TM=1322688084:LM=1322688085:S=McEsyvcXKMiVfGds; path=/; domain='+domain+'";';
	    		}else{
	    			if (!get_id('gbq1')){
	    				return;
	    			}
	    		}
	    		GM_addjs(js, true, 'newbar');
	    		showSplash("<a href='#' onclick='window.location.reload();'>Reload</a> now to activate new layout",8000);
	    	
    	},3000);
	}
    if (getPref('newbar')) {
    	setnewbar(true);
    }else if (getPref('oldbar')) {
    	setnewbar(false);
    }
    
    if (getPref('floatbar')) {
    	function mimicFloatbar(){
	    	if (get_id('gbq1')){
	    		showSplash('New native layout is already ON!<br/>No mimic',3000);
	    		return;
	    	}
	     	var gbz = get_id('gbz');
	     	hide(gbz);
	     	function toggleBar(e){
	     		e.stopPropagation();
	     		toggle(gbz);
	     		return false;
	     	}
	     	//http://googleblog.blogspot.com/2011/11/next-stage-in-our-redesign.html
	     	var css = '#gbz .gbt{background-color: #2D2D2D;border-bottom: 1px solid black;}';
	     	css += '#gbz .gbt{display:block;}';
	     	css += '#gbz .gbts{margin:5px 20px;}';
	     	css += '#gbz {left:30px;top:50px;}';
	     	
	     	css += '#gbg {right:20px;top:15px;}';
	     	//from jfk-button-standard
	     	css += '#gbg .gbt{border: 1px solid rgba(0, 0, 0, 0.1);background-color: whiteSmoke;background-image: -webkit-linear-gradient(top,whiteSmoke,#F1F1F1);}';
	     	
			css += '#gb {height:0px;}';
			css += '#gbx3, #gbx4 {display:none;}';
			css += '#chrome-bar-toggle {height:8px;cursor:pointer;z-index: 50;}';
			css += '#chrome-bar-toggle-icon {width: 0;height: 0;position: absolute;left: 50%;border-color: white white #2D2D2D;border-style: solid;border-width: 0 7px 7px 7px;margin-top: 1px;font-size: 1px;line-height: 1px;}';
					
			GM_addStyle(css, 'rps_floatbar');
			
			dh('gbz','div', {
				position:'first',
				id:'chrome-bar-toggle',
				html:'<div id="chrome-bar-toggle-icon"></div>'
			});
			
	     	var logo = get_id('logo-container');
	     	if (logo){
	     		logo.href='#';
	     		logo.addEventListener('click',toggleBar,true);
	     	}
	    	
	    	fireResize();
    	}
    	mimicFloatbar();
    }
    
    if (getPref('noborder')) {
        var css = '.entry,.card-common,.entry-main{margin:0 !important;}';
        css += '.entry,.card-content,.entry-actions,.entry-container{padding:0 !important;}';
        css += '.entry-title{margin-left:20px !important;font-size:120% !important;}';
        css += '.entry .entry-body{max-width:100% !important;}';
        css += '.entry-author{display:none;}';
        css += '.entry,.entry .card, #no-entries-msg{border-width:0 !important;}';
        css += '.collapsed{background-color:transparent !important;}';
        css += '.entry:nth-child(odd) .card-common, .entry:nth-child(odd) .card-actions {background-color:#EFEFEF;}';
        css += '.entry:nth-child(even) .card-actions {background-color:transparent;}';
        GM_addStyle(css, 'rps_noborder');
    }
    
	var entries = get_id('entries'), vec = get_id('viewer-entries-container');
	if (getPref('bottomup')) {
		var el = get_id('viewer-footer'), ref = get_id('viewer-header'), c = get_id('chrome');
		ref = get_id('stream-prefs-menu');
		var h = el.clientHeight;
		var css = 'div#entries-status{width:auto;top:0px;}';
		css+= 'div#viewer-footer{border:none;padding:0;}';
		GM_addStyle(css, 'rpe_bottomup');
		insertAfter(el, ref);
		entries.style.height = (getStyle(entries, 'height') + h) + 'px';
	}

	if (getPref('hideplus')) {
		GM_addStyle('.item-plusone{display:none !important;}','rpe_hideplus');
		fireResize('',100);
		/*function removeButtonPlus(el, entry, mode){
			var ea = getFirstElementByClassName(el,'entry-actions');
			if (ea){
				delay(function(){
					var btn = getFirstElementByClassName(ea,'item-plusone');
					if (btn){
						remove(btn);
						return true;
					}
					return false;
				});
			}
		}
		registerFeature(removeButtonPlus, ID+'_hideplus');*/
	}
	
	/*if (getPref('linkbar')) {
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
	if (getPref('currdir')) {
		var lastTitle='';
		GM_addStyle('.tree-sel{background-color:#dedede;}', 'rpe_currdir');
		//var st = get_id('sub-tree');
		var st = get_id('scrollable-sections');
		setInterval( function() {
			var e = get_id('current-entry');
			if (e) {
				if (hasClass(e,'entry-seld')){
					return;
				}
				//clean all other entry-seld
				var els = st.getElementsByClassName('entry-seld');
				if (els){
					foreach(els,function(el){
						removeClass(el, 'entry-seld');
					})
				}
				var sth = st.clientHeight;
				var title = getEntrySiteTitle(e, 'entry-source-title');
				if (title && title !== lastTitle) {
					var l = getFirstElementByClassName(st, 'tree-sel');
					if (l) {
						removeClass(l, 'tree-sel');
					}
					//Xpath 1.0 don't support quote escaping...
					var a = getElements(".//div[contains(@class,'name-text')][text()='" + escapeXpath(title) + "']", st);
					if (!a || (a && a.length===0) ) {
						//Try slower with real text compare
						a = getElements(".//div[contains(@class,'name-text')]", st, title);
					}
					if (a && a.length > 0) {
						var node = findParentNode(a[0],'a','link');
						if (node){
							//force show
							var p = findParentNode(node,'li','folder');//expanded/collapsed
							if (p){
								removeClass(p,'collapsed');
								addClass(p,'expanded');
							}
							addClass(node, 'tree-sel');
							addClass(e,'entry-seld');
							lastTitle = title;
							//ensure visible
							//TODO : Better
							var h = findTop(node, st);
							if (h<st.scrollTop || h>st.scrollTop+sth) {
								st.scrollTop = h;
							}
						}
					}
				}
			}
		},2000);
	}
	if (getPref('topcurrent')) {
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
				vec.scrollTop = cur.offsetTop;
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
		if (getPref('icons')){
			w=40;
			css += '.rp-action-icons .user-tags-list{display:none;}';//hide tags
			addClass(get_id('entries'), 'rp-action-icons');
		}
		css += '.entry:not(#current-entry) .card-actions{display:none}';
		css += '#current-entry .card-actions,#entries.list #current-entry .entry-actions{position:fixed;right:32px!important;top:' + top + 'px!important;left:!important;width:'+w+'px;z-index:9999;-webkit-box-shadow:#E3E5EB 0 1px 1px;border-bottom-left-radius:5px 5px;border-bottom-right-radius:5px 5px;border-top-left-radius:5px 5px;border-top-right-radius:5px 5px;border:2px solid #68E;opacity:0.2}';
		css += '#current-entry .card-actions:hover,#entries.list #current-entry .entry-actions:hover{opacity:1}';
		css += '#current-entry .entry-actions > span,#entries.list #current-entry .entry-actions > span{display:block;height:15px;margin:1px;}';
		//star only, strange way todo...
		css += '#current-entry .entry-actions > span.star,#entries.list #current-entry .entry-actions > span.star{width:0px}';
		css += '#current-entry .entry-main{margin-right:'+w+'px}';//Current reduced for current floating menu
css += '.card-common .card-actions{height:auto !important}';
css += '#entries .entry:not(#current-entry){opacity:0.6 !important}';

		GM_addStyle(css, 'rpe_floatactions');
	}

	if (getPref('floatactions')) {
		runfn(floatactions, 'floatactions', 99, 2000);
		//defer to get right #main.top
	}else if (getPref('currentactions')) {
		var  css = '.entry:not(#current-entry) .card-actions{display:none}';
		GM_addStyle(css, 'rpe_currentactions');
	}

	if (getPref('icons')) {
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
		
		GM_addjs('http://googlereaderplus.googlecode.com/svn/trunk/GoogleReaderPlus/script/clearlabel.js', false, 'clearlabel');
		
		registerFeature(changeIconsButton, ID+'_icons');
	}
};
