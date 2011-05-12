/**
 * Remove ads
 * @version  0.1
 * @date 2010
 * @author LudoO
 *
 * Simple advertising cleaner
 *
 */

GRP.removeads = function(prefs, langs, ID, SL, lang){
	var re = {iframes:false, links:false, images:false};
	if (prefs.removeads_iframes) {
		re.iframes = new RegExp(prefs.removeads_iframes);
	}
	if (prefs.removeads_links) {
		re.links = new RegExp(prefs.removeads_links);
	}
	if (prefs.removeads_images) {
		re.images = new RegExp(prefs.removeads_images);
	}
	
	function removeAds(btn, entry, mode) {
		setTimeout(function(){
			var i,el;
	
			// DIV#tads
			var ads = document.getElementById("tads");
			if (ads) {
				ads.parentNode.removeChild(ads);
			}
			
			//start from entry ??
			
			// Remove Search-Tracking
			if (re.links) {
				var links = entry.getElementsByTagName("a");
				if (links && links.length>0) {
					for (i = 0; i < links.length; i++) {
						el = links[i];
						if (el.className == "l") {
							el.removeAttribute("onmousedown");
						}
						if (re.links.test(el.href)) {
							//console.log("REMOVE AD a : "+link.href);
							el.parentNode.removeChild(el);
						}
					}
				}
			}
	
			if (re.images) {
				var imgs = entry.getElementsByTagName("img");
				if (imgs && imgs.length>0) {
					for (i = 0; i < imgs.length; i++) {
						el = links[i];
						if (re.images.test(el.src)) {
							//console.log("REMOVE AD img : "+link.src);
							el.parentNode.removeChild(el);
						}
					}
				}
			}
	
			// Remove Right-side Ads
			if (re.iframes) {
				var iframes = entry.getElementsByTagName("iframe");
				if (iframes && iframes.length>0){
					for (i = 0; i < iframes.length; i++) {
						el=iframes[i];
						if (re.iframes.test(el.src)) {
							el.parentNode.removeChild(el);
						/*//console.log("REMOVE AD iframe : "+s);
				 iframe[i].height = 0;
				 iframe[i].width = 0;
				 iframe[i].src = '';*/
						}
					}
				}
			}
		},0);
	}
		
	registerFeature(removeAds, ID, {onlistviewtitle:true});
/*
	document.body.addEventListener('DOMNodeInserted', function(e){
		removeAds(entry);
	}, false);*/
	//removeAds(document);

};
