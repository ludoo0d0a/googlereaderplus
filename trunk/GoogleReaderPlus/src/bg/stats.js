/*function initstats(){
    if (GRP && GRP.useStats) {
        return;
    }
    window._gaq = window._gaq || [];
    window._gaq.push(['_setAccount', 'UA-183120-12']);
    window._gaq.push(['_trackPageview']);
    
    window.GRP = window.GRP || {};
    window.GRP.useStats = true;
    console.log('track ON');
    
    //http://code.google.com/chrome/extensions/tut_analytics.html
    (function(){
        var ga = document.createElement('script');
        ga.type = 'text/javascript';
        ga.async = true;
        ga.src = 'https://ssl.google-analytics.com/ga.js';
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(ga);
    })();
}
initstats();
*/

function track(name, value){
    if (typeof name === 'object') {
        value = name.value;
        name = name.name;
    }
    if (GRP.useStats && _gaq) {
		if (typeof name === 'object') {
            value = name.value;
            name = name.name;
        }
        _gaq.push(['_trackEvent', name, value]);
        //console.log('track '+name+':'+value);
    }
}
