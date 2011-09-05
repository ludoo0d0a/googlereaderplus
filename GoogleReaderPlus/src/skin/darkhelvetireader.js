/*
 * Dark Helvetireader 
 * from Flavored Helvetireader 1.0.8

 * https://raw.github.com/ankit/flavored-hreader/master
 * "css/helvetireader.css", "css/scrollbars.css", "css/sprites.css", 
	"css/light-theme.css", "css/dark-theme.css", "css/buttons.css"
 
 * * update through stylebot : 
 *  - day: http://stylebot.me/styles/61 (http://stylebot.me/style/get_userscript/61.js)
 *  - night: http://stylebot.me/styles/62 (http://stylebot.me/style/get_userscript/62.js)
 */
GRP.darkhelvetireaderday = function(prefs, langs, ID, SL, lang){
    GRP.darkhelvetireader(ID, 'day');
};
GRP.darkhelvetireadernight = function(prefs, langs, ID, SL, lang){
    GRP.darkhelvetireader(ID, 'night');
};
GRP.darkhelvetireader = function(ID, theme){
	addClass(document.body, (theme == 'day') ? 'HelvetiDay' : 'HelvetiNight');
	addClass(document.body, 'DarkHelvetireader');
	var cfg = {
		base: 'https://raw.github.com/ankit/flavored-hreader/master/',
	    files: ['css/helvetireader.css', 'css/scrollbars.css', 'css/sprites.css', 'css/light-theme.css', 'css/dark-theme.css', 'css/buttons.css']
	};
	
	var css = GM_getValue('cache_theme_' + ID+theme);
	if (css){
		applyCss(css);
	}else{
		loadFiles(cfg, function(text){
   			 var css = text;
			//fix
			css += '#search-input{padding:3px 2px;}';
			//fix star
			css += '.star{display:block !important;background: transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAMCAMAAACDd7esAAAAAXNSR0IArs4c6QAAAklQTFRF/////f39/Pz8+/v7+vr6/fr6+fn5+Pj4+ff39/f39vb29fX19PT09fT08/Pz+vHx8vLy/fDw8PDw8u/v7+/v7u7u7e3t7Ozs6+vr6enp6Ojo+uLi5+fn5eXl5OTk8+Dg6uDg4uLi6eDg4ODg39/f3d3d3Nzc+9TU+9PT29vb+9HR2dnZ2NjY8tHR19fX1tbW1dXV+srK1NTU09PT4tDQ0tLS0dHR0NDQz8/Pzs7O+sHBzc3N78PDzMzMy8vLysrKycnJyMjIx8fH3sHB3MHBxsbGxcXFxMTEw8PDwsLCwcHBwMDAv7+/97Gxvr6+vb29vLy8962tu7u73bOz4LKy2LOzurq6ubm5uLi4t7e3tra2tbW1tLS0s7OzsrKysbGxsLCwr6+vrq6u1qSk1KSkra2trKysq6ur9ZeX85eXqampqKiop6en5paWpqamo6Oj9IyM0JOTn5+f0o+P9IWFm5ub84KCmpqamZmZ1IaGjo6OjIyMi4uL0nd3iYmJzXZ2y3Z28Wpq3Glp1mhofX19fHx8e3t7enp6zmRk71VV71NT71JS11lZzFZWxVhY70xM7kpK7khI7kJCy0tL2EZGyEhIw0lJ7Tk57TY21js77DExwzo6wTs77C4u6yYmyisr6iAg6h8f6hoa6hYW6hcXyx0d6RUV6RQUwh0d5xIS5hIS3RUV6RISvRwc6RAQ5BAQ3RER2hIS4RAQ4BAQ3xAQ2BER4A8P2g8P1RER1RAQzxERyRAQxhAQwA8PxA4OwA0NvQ0Nug0N////U2oaVwAAAAF0Uk5TAEDm2GYAAAABYktHRACIBR1IAAAACXBIWXMAAArwAAAK8AFCrDSYAAAAB3RJTUUH2wgTBxsz1VhJ9QAAADZJREFUCNdjYAABRwYEiEYw3dLd4Oz09HQMtmM6DDiCBSEApgSuIT3dDcYGMdKhpoLFYCbBSADyDBPlAM918QAAAABJRU5ErkJggg==) no-repeat 0 0!important;}';
			//fix2
			css += '#chrome-viewer-container{width: auto !important;}';
			//fix3 #509
			css += '#star-selector{margin-top: 15px !important;}';
			css = compressCss(css);
			GM_setValue('cache_theme_'+ID+theme, css);
			applyCss(css);
		});
	}	
	
	function applyCss(css){
		GM_addStyle(css, 'rps_'+ID+theme);
		fireResize('footer');   
	}
	
    function toggleView(){
        var display = document.getElementById("nav").style.display;
        var status = (display == 'none') ? 1 : 0; //1 indicates fullscreen
        if (!status) {
            document.getElementById("nav").style.display = 'none';
            document.getElementById("search").style.display = 'none';
            document.getElementById("chrome").style.margin = "0px !important";
            document.getElementById("logo-container").style.display = 'none';
            document.getElementById("main").style.top = "15px";
        } else {
            document.getElementById("nav").style.display = 'block';
            document.getElementById("search").style.display = 'block';
            document.getElementById("chrome").style.margin = "-50px 0 10px 245px !important";
            document.getElementById("main").style.top = "65px";
        }
    }

	/*
	//Reveal scrollbars
	shake('sub-tree');
	shake('viewer-container');
	*/
	//117 = u ->keypress
    initKey({keyCode:117,fn:toggleView},'keypress');
};
