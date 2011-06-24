// Theme
GRP.theme = function(prefs, langs, ID, SL, lang, scop){
    if (prefs.theme_noborder) {
        var css = '.card-common,.entry-main{margin:0 !important;}';
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
    
    var skin = GRP.skins[prefs.theme_skin];
    if (!skin) {
        console.log('Error with skin ' + prefs.theme_skin);
        return;
    }
    skin.id = prefs.theme_skin;
    if (skin.url) {
        //Run remote skin
        remoteSkin(skin);
    } else {
        scop.run(skin.id, langs);
    }
    
    var tog = {};
    function toggleTheme(){
        var el = get_id('rps_' + skin.id);
        if (el) {
            tog = {
                css: el.innerHTML,
                src: el.href
            };
            remove(el);
        } else if (tog.css) {
            GM_addStyle(tog.css, 'rps_' + skin.id);
            if (skin.resize) {
	            fireResize(skin.resize);
	        }
        } else if (tog.src) {
            GM_addCss(tog.src, 'rps_' + skin.id);
           if (skin.resize) {
            fireResize(skin.resize);
        	}
        }
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
                    var css = r.responseText;
                    //unescape
                    css = css.replace(/\\n/g, ' ').replace(/\\"/g, '"');
                    //Filter userscripts userjs
                    if (/^http\:\/\/userstyles\.org/.test(skin.url)) {
                        var m = /var\s+css\s+=\s+"(.*?)";\n/.exec(css);
                        if (m && m[1]) {
                            css = m[1];
                        } else {
                            //not better?
                            m = /css\s+\+=\s+"body(.*?)";\n/.exec(css);
                            if (m && m[1]) {
                                css = 'body' + m[1];
                            }
                        }
                    }
                    if (css) {
                        css = css.replace(/\n/g, ' ');
                        css = css.replace(/\-moz\-/g, '-webkit-');
                        if (skin.fix) {
                            css += skin.fix;
                        }
                        GM_addStyle(css, 'rps_' + skin.id);
                        //cache css 
                        //param3 = false : force local storage in webpage
                        GM_setValue('theme_' + skin.id, css, false);
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