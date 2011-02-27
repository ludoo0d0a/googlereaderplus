/*
 * Dark Helvetireader
 */
GRP.darkhelvetireaderday = function(){
	GRP.darkhelvetireader('day');
}
GRP.darkhelvetireadernight = function(){
	GRP.darkhelvetireader('night');
}
GRP.darkhelvetireader = function(theme){
    var base = 'https://github.com/ankit/flavored-hreader/raw/master/';
    var styles = ["css/helvetireader.css", "css/scrollbars.css", "css/sprites.css", "css/light-theme.css", "css/dark-theme.css", "css/buttons.css"];
    
	//TODO concat CSS to work toggle on whole feature
	addClass(document.body, (theme=='day')?'HelvetiDay':'HelvetiNight'); 
	var c =0;
    foreach(styles, function(url){
        GM_addCss(base + url, 'rps_darkhelvetireader'+theme+((c)?c:''));
		c++;
    });
    
	//fix
	var css = '#search-input{padding:3px 2px;}';
	GM_addStyle(css, 'rpsfix_darkhelvetireader');
	
    fireResize();
};
