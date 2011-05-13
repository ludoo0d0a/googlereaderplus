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
	var wildcard=true;
	function getRegex(re, id){
		var p = prefs[ID+'_'+id];
		if (p) {
			var all=[], terms=p.split(/\n/);
			iterate(terms,function(i,term){
				var t=encoderegex(term, false, wildcard); 
				if (t){
					//Remove empty
					all.push(t);
				}
			});
			var s = all.join('|');
			if (s) {
				re[id] = new RegExp(s);
			}else{
				re[id] = false;
			}
		}
	}
	getRegex(re,'iframes');
	getRegex(re,'links');
	getRegex(re,'images');
	
	var adremove=remove;
	if (prefs.removeads_preview) {
		adremove = function(el, color){
			el.style.border = "2px solid "+(color||'red');
		};
	}
	
	function removeAds(btn, entry, mode) {
		setTimeout(function(){
			// DIV#tads
			var i,len,ads = document.getElementById("tads");
			remove(ads);

			// Remove Search-Tracking
			if (re.links) {
				var links = entry.getElementsByTagName("a");
				len = links.length;
				if (links && len>0) {
					for (i=len-1; i>=0; i--) {
						var el = links[i];
						if (el) {
							if (re.links.test(el.href)) {
								el.removeAttribute("onmousedown");
								adremove(el, 'red');
							}
						}
					}
				}
			}
		
			// Remove Right-side Ads
			if (re.iframes) {
				var iframes = entry.getElementsByTagName("iframe");
				len = iframes.length;
				if (iframes && len>0){
					for (i=len-1; i>=0; i--) {
						var el=iframes[i];
						if (el && re.iframes.test(el.src)) {
							//el.height = 0; el.width = 0;
							el.src='';
							adremove(el,'blue');
						}
					}
				}
			}
			
			if (re.images) {
				var imgs = entry.getElementsByTagName("img");
				len = imgs.length;
				if (imgs && len>0) {
					for (i=len-1; i>=0; i--) {
						var el = imgs[i];
						if (el) {
							if (el.width <= 1 && el.height <= 1) {
								el.src = '';
								adremove(el, 'fushia');
							} else if (re.images.test(el.src)) {
								el.src = '';
								adremove(el, 'green');
							}
						}
					}
				}
			}
		},10);
	}
		
	registerFeature(removeAds, ID, {onlistviewtitle:true});

};
