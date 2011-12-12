//relook custom theme

GRP.relook = function(prefs, langs, ID, SL, lang){
	var css, UID='rpe_'+ID;
	
	function setCss(css){
		if (css){
			putCss(css);
			if (prefs.relook_resize){
				fireResize();
			}
		}
	}
	
	if (prefs.relook_css) {
		var css = prefs.relook_css.replace(/\n/g, '').replace(/\t/g, ' ').replace(/\/\*.*?\*\//g, '');
		if (prefs.relook_less){
			parseLessTpl(css,false, function(a) {
					if (a.css){
						setCss(a.css);
					}else{
						console.error('Failed to compile LESS stylesheet');
						console.error(a.err);
					}
			});
		}else{
			setCss(css);
		}
	}
	
	function putCss(css){
		setTimeout(function(){
			GM_addStyle(css, UID);
		},500);
	}
	
	var tog;
	function toggleTheme(){
		var el = get_id(UID);
		if (el) {
			remove(el);
		} else {
			putCss(css);
		}
	}
	
	var keycode = getShortcutKey(ID, 'toggletheme', prefs); 
    if (keycode) {
        keycode.fn = toggleTheme;
        initKey(keycode);
    }
	
};