/**
 * General configuration
 * @version  0.1
 * @date 2010
 *
 */
GRP.general = function(prefs, langs){
    var CLS_CURRENT = 'grp_current';
    if (prefs.general_secure) {
        if (/^http\:/.test(window.location.href)) {
            window.location.href = window.location.href.replace(/^http\:/, 'https:');
        }
    }
    if (prefs.general_topcurrent) {
        var entries = get_id('entries');
        var h = screen.height; // getHeightEntries();
        var scrollspacer = dh(entries, 'div', {
            id: 'topcurrent',
            html: '&nbsp;',
            style: 'height:' + (2 * h) + 'px;'
        });
		var cur, oldcur;
        window.setInterval(function(){
            cur = get_id('current-entry');
            //check if current entry hans changed!
            if (cur && !hasClass(cur, CLS_CURRENT)) {
                oldcur = getFirstElementByClassName(entries, CLS_CURRENT);
				if (oldcur) {
                    removeClass(oldcur, CLS_CURRENT);
                }
                addClass(cur, CLS_CURRENT);
                entries.scrollTop = cur.offsetTop;
            }
        }, 500);
    }
	
	if (prefs.general_floatactions) {
		//Remove #entries.list .entry .entry-actions {left:0px;}
		var ss = findre(document.styleSheets, 'href', /en-scroll\.css/);
		if (ss) {
			var rule = find(ss.cssRules, 'selectorText', '#entries.list .entry .entry-actions');
			if (rule) {
				rule.style.left = '';
			}
		}
		
		var css = '.entry:not(#current-entry) .card-actions{display:none}#current-entry .card-actions,#entries.list #current-entry .entry-actions{position:fixed;right:32px!important;top:142px!important;left:!important;width:140px;z-index:9999;-webkit-box-shadow:#E3E5EB 0 1px 1px;border-bottom-left-radius:5px 5px;border-bottom-right-radius:5px 5px;border-top-left-radius:5px 5px;border-top-right-radius:5px 5px;border:2px solid #68E;opacity:0.2}#current-entry .card-actions:hover,#entries.list #current-entry .entry-actions:hover{opacity:1}#current-entry .entry-main{margin-right:140px}#current-entry .entry-actions > span,#entries.list #current-entry .entry-actions > span{display:block}';
        GM_addStyle(css, 'rps_floatactions');
    }
};
