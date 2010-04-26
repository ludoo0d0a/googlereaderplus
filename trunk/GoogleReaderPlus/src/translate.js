/*
 * Translate entries 
 * 
 * Samples
 * ro : www.hackersblog.org
 * ru : www.kremlin.ru
 * zh : http://newsrss.bbc.co.uk/rss/chinese/trad/news/rss.xml
 * de : www.spiegel.de
 * fr : www.lemonde.fr
 * 
 * 
 */
//TODO: 
// - walk inside text nodes ONLY
// - web feeds
// - check compatibility with features (preview, column...)
// - Add a back to original (2 divs like columns,replacer ??)
// - Translate into mylanguage already exist -> Can we be better ?
// - Translate feed title too
GRP.translate = function(prefs, langs, ID, SL, lang){
    var langDest = prefs.translate_lang || lang;

    function translateEntry(entry, active, btn, e){
		var body = getBody(entry),
		l = getEntryLink(entry);
		
		var texts= {};
		if (l.eltitle){
			translate(l.eltitle.firstChild, 'text');
			translate(l.eltitle.title, 'direct');
		}
		if (body){
			//var eb = getEntryBody(body);
			translate(body, 'html');
		}
		 
		function translate(el, mode){
			mode=mode||'html';
			var txt;
			if (mode === 'html') {
				txt = el.innerHTML;
			} else if (mode === 'direct') {
				txt = el;
			} else if (mode === 'text') {
				txt = (el.innerText || el.textContent || el);
			}
			
			chrome.extension.sendRequest({
				message: "translate",
				text: txt,
				to: langDest
			}, function(a){
				if (a.detectedSourceLanguage !== langDest) {
					var t = (a.translation||'').replace('&#39;', "'");
					if (mode === 'html') {
						el.innerHTML = t;
					} else if (mode === 'direct') {
						el = a.translation;
					} else if (mode === 'text') {
						if (el.innerText) {
							el.innerText = t;
						} else if (el.textContent) {
							el.textContent = t;
						} else {
							el = t;
						}
					}
				}
			});
		}
			
    }
    GRP.api_entry(prefs, langs, ID, SL, lang, {
        action: 'translate',
        cb: translateEntry
    });
};
