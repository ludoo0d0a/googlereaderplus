//My theme
//Customizable theme with background picture
//
GRP.mytheme = function(prefs){
    var css = GM_getValue('mytheme_css');
    if (css) {
        GM_addStyle(css, 'rps_mytheme');
    } else {
        loadCss('skin/css/mytheme.css', function(css){
            stylish(css);
        });
    }
    function stylish(tplCss){
        var o = {
            bg: (prefs.theme_url) ? ('background:url(' + prefs.theme_url + ') no-repeat fixed top center!important;') : '',
            color: prefs.theme_color || '#aaa',
            bg: prefs.theme_bg || '#ffc'
        };
        var css = fillTpl(tplCss, o);
        GM_addStyle(css, 'rps_mytheme');
        //cache css
        GM_setValue('mytheme_css', css);
    }
};
