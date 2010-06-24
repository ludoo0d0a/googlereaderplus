function initstats(){
	var _gaq = _gaq || [];
	_gaq.push(['_setAccount', 'UA-183120-12']);
	_gaq.push(['_trackPageview']);
	GRP = GRP || {};
	GRP.useStats = true;
	
	//http://code.google.com/chrome/extensions/tut_analytics.html
	(function(){
		var ga = document.createElement('script');
		ga.type = 'text/javascript';
		ga.async = true;
		ga.src = 'https://ssl.google-analytics.com/ga.js';
		(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(ga);
	})();
}

function track(name, value){
   if (GRP.useStats && _gaq) {
   		if (typeof name === 'object'){
			value=name.value;
			name=name.name;
		}
		_gaq.push(['_trackEvent', name, value]);
   }
}
