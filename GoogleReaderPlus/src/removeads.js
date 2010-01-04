//remove ads
var grp_removeads = function(prefs) {
	function removeAds() {
		var i;

		// DIV#tads
		var ads = document.getElementById("tads");
		if (ads) {
			ads.parentNode.removeChild(ads);
		}
		
		//start from entry ??
		
		
		// Remove Search-Tracking
		var links = document.getElementsByTagName("a");
		// var links = document.querySelector("a,img");
		if (links) {
			for (i = 0; i < links.length; i++) {
				var link = links[i];
				if (link.className == "l") {
					link.removeAttribute("onmousedown");
				}
				if (/da\.feedsportal\.com|res\.feedsportal\.com|feedburner\.com|doubleclick\.net|\/ads/.test(link.href)) {
					link.parentNode.removeChild(link);
				}
			}
		}

		links = document.getElementsByTagName("img");
		if (links) {
			for (i = 0; i < links.length; i++) {
				var link = links[i];
				if (/feedsportal\.com|feedburner\.com|doubleclick\.net|\/ads/.test(link.src)) {
					link.parentNode.removeChild(link);
				}
			}
		}

		// Remove Right-side Ads
		var iframe = document.getElementsByTagName("iframe");
		if (iframe) {
			for (i = 0; i < iframe.length; i++) {
				var s = iframe[i].src;
				if (/feedsportal\.com|doubleclick\.net|googlesyndication.com\/pagead\/ads/.test(s)) {
					iframe[i].height = 0;
					iframe[i].width = 0;
					iframe[i].src = '';
				}

			}
		}
	}

	var e = document.getElementById('entries');
	if (e) {
		e.addEventListener('DOMNodeInserted', function() {
			removeAds();
		}, false);
	}
	// document.addEventListener('load', removeAds, false);
	removeAds();

};
