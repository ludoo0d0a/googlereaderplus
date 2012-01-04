// Theme
GRP.theme = function(prefs, langs, ID, SL, lang, scop){    
    if (!prefs.theme_skin) {
        return;
    }
   
    var skin = GRP.skins[prefs.theme_skin];
    if (!skin) {
        console.log('Error with skin ' + prefs.theme_skin);
        return;
    }
    skin.id = prefs.theme_skin;
    if (skin.css) {
        //Custom stylesheet
        GM_addCss(skin.css, 'rpcss_' + skin.id);
    }else if (skin.url) {
        //Run remote skin
        remoteSkin(skin);
    } else {
        scop.run(skin.id, langs);
    }
    
    var togs = {};
    function toggleTheme(){
    	toggleSkins(skin.id);
    	foreach(GRP.THEMES[skin.id], function(o){
    		toggleSkins(o);
    	});
    }
    function toggleSkins(skinid){
        var el = get_id('rps_' + skinid), f= GRP[skinid+'toggle'];
        var tog = togs[skinid];
        if (el) {
            togs[skinid] = {
                css: el.innerHTML,
                src: el.href
            };
            remove(el);
			if (f){
				f(false);
			}
        } else if (tog){
        	var _skin = GRP.skins[skinid];
        	if (tog.css) {
	            GM_addStyle(tog.css, 'rps_' + skinid);
	            if (_skin && _skin.resize) {
		            fireResize(_skin.resize);
		        }
				if (f){
					f(true);
				}
	        } else if (tog.src) {
	            GM_addCss(tog.src, 'rps_' + skinid);
	            if (_skin && _skin.resize) {
	               fireResize(_skin.resize);
	           	}
			    if (f){
					f(true);
				}
			}
        }
    }
    
    function getcss(text, re){
		var css='', m = null;
		while(m = re.exec(text)){
			if (m[1]) {
				css += m[1];
			}
		}
		return css;
    }
    function cleanCss(css){
    	var c = compact(css);
    	c=c.replace(/@namespace[^;]+;/g,'');
    	if (/@\-\d+\-document/.test(c)){
    		//c=c.replace(/url\-prefix\([^\)]+\)\s*,?/g,'');
    		c=c.replace(/@\-\d+\-document[^\{]+\{/g,'');
    		c=c.replace(/\}\s*$/g,'');
    	}
    	return c;
    }
                        
    function remoteSkin(skin){
        var c = GM_getValue('cache_theme_' + skin.id);
        if (c) {
            GM_addStyle(c, 'rps_' + skin.id);
            if (skin.resize) {
                fireResize(skin.resize);
            }
        } else {
            GM_xmlhttpRequest({
                method: 'get',
                url: skin.url,
                onload: function(r){
                    var c='', css = r.responseText;
                    //unescape
                    css = css.replace(/\\n/g, ' ').replace(/\\"/g, '"');
                    //Filter userscripts userjs
                    if (/^http\:\/\/userstyles\.org/.test(skin.url)) {
                        var  m=null;
                        c = getcss(css, /\s*css\s*\+?=\s*"(.*?)";\n/g);
                        if (c){
                        	css=c;
                        }else{
                            //not better?
                            c = getcss(css, /\s*css\s*\+?=\s*"body(.*?)";\n/g);
                            if (c) {
                                css = 'body' + c;
                            }
                        }
                    }else if (/^http\:\/\/stylebot\.me/.test(skin.url)) {
                        c = getcss(css, /styleEl\.innerHTML\s*=\s*'(.*?)';\n/g);
                        if (c) {
                            css=c;
                        }
                    }
                    
                    if (skin.clean){
                    	css=cleanCss(css);
                    }
                    
                    if (css) {
                        if (skin.compact || (typeof skin.compact ==='undefined')){
	                        css = css.replace(/\n/g, ' ');
	                        css = css.replace(/\-moz\-/g, '-webkit-');
	                        if (skin.fix) {
	                            css += skin.fix;
	                        }
                        }
                        GM_addStyle(css, 'rps_' + skin.id);
                        //cache css 
                        //param3 = false : force local storage in webpage
                        GM_setValue('cache_theme_' + skin.id, css, false);
                        if (skin.resize) {
                            fireResize(skin.resize);
                        }
                    }
                }
            });
        }
    }
    
    var keycode = getShortcutKey(ID, 'toggletheme', prefs);
    if (keycode) {
        keycode.fn = toggleTheme;
        initKey(keycode);
    }
};
