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
    addClass(document.body, (theme == 'day') ? 'HelvetiDay' : 'HelvetiNight');
    var c = 0;
    foreach(styles, function(url){
        GM_addCss(base + url, 'rps_darkhelvetireader' + theme + ((c) ? c : ''));
        c++;
    });
    
    //fix
    var css = '#search-input{padding:3px 2px;}';
    GM_addStyle(css, 'rpsfix_darkhelvetireader');
    
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
    
	//TODO : dont work !
	//117 = u 
    initKey({keyCode:117,fn:toggleView});
	
    fireResize();
};
