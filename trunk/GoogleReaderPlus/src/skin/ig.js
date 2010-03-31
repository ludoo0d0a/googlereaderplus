/**
 * Use iGoogle Theme for Reader
 *
 */
//http://www.google.com/ig/directory?type=themes
GRP.ig = function(prefs, lang){
//http://essence-ig-themes.googlecode.com/svn/trunk/lopes/xml/lopes.xml
//http://igcdn.googlecode.com/svn/trunk/xml/travel_lpspain.xml
    var skin = prefs.ig_theme;
    
	if (prefs.ig_xsl) {
        var css = GM_getValue('theme_ig_' + skin);
        if (!css) {
            var xsl = 'xml2css.xsl';
            var d = applyXsl(skin, xsl);
            css = d.firstChild.innerText;
            //cache css
            GM_setValue('theme_ig_' + skin, css);
        }
        GM_addStyle(css, 'rps_ig');
    } else {
        //http://www.google.com/ig/skin_xml_to_css?url=http%3A//www.google.com/ig/tm%3Foutput%3Dxml%26te%3DH4sIAAAAAAAAAF3OXWuDMBQG4F-jNwPzZU0c5CJow1bKGKw3uwp-xMQuVrFxxX-_tGMIy9VzXg7vSW2W2XHr_fQMgLNZYsxkfdKMA1DsxanjaVUHZMAHXPfsk6Qn_ArE35MN0K3wZ31AHRPgijIIgZgmp9WxN9Zf-otR9arm_qvqjU7Ok4mI9IOPSIkpjnDmBxcMH7oFIcx-B3sf6C52oxl5rb-1062aljl0z7qNQ0fvnebvj-Sput8MYbV4O85cJG_6pp2LW31t_u8gLvMSyTwQh-a0qepAsjHlsij2sgjcbbsZL1Ee_hRIOaNEUBHItjTfUgR510HYPc4hXhPSUPoDoKp2-moBAAA&skindx=ix:0&v2=1&v2mcss=1&&hl=en
		var url = 'http://skins.gmodules.com/ig/skin_xml_to_css?url=' + encodeURIComponent(skin) +
		 '&skindx=ix:0&hl=en&v2=1';
		 //&skindx=ix:0&v2mcss=1&&hl=en&v2=1
		 //&skindx=ix:8&fp=RnSZcwE6cuuzQjBdU&hl=en&v2=1
		 console.log(url);
        GM_addCss(url);
		
		//Need extra tuning
		addClass(document.body, 'header_tile_image header_center_image');
	    var cssover = "#main{top:140px!important;}";
	    GM_addStyle(cssover, 'rps_ig');
    }
};
