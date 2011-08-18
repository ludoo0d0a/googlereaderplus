function initstats(){
	//crash on macOsX + chrome<6.4.458
	if (isOsLinux() || isOsMac()) {
		console.log('Statistics track OFF for platform : ' + window.navigator.platform);
	} else {
		var _gaq = _gaq || [];
		_gaq.push(['_setAccount', 'UA-183120-12']);
		_gaq.push(['_trackPageview']);
		window.GRP = window.GRP || {};
		window.GRP.useStats = true;
		console.log('Statistics track ON');
		(function(){
			var ga = document.createElement('script');
			ga.type = 'text/javascript';
			ga.async = true;
			ga.src = 'https://ssl.google-analytics.com/ga.js';
			(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(ga);
		})();
	}
}
setTimeout(initstats,50);

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
