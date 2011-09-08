/**
 *
 * Readability
 *
 * API: http://www.readability.com/publishers/api/
 * Bookmarklet : http://www.readability.com/bookmarklet/read.js
 * Service :  http://www.readability.com/articles/queue
 *
 * Based on Replacer
 */

GRP.readability = function(prefs, langs, ID, SL, lang) {
	var locked = false;

	var css = ".p_readability{font-family: Georgia,'Times New Roman',serif;font-size:19px;}";
	css+= ".p_readability img{margin:1em auto;display: block;}";
	GM_addStyle(css,'rps_rdnews');
	
	function readableEntry(entry, active, btn, e) {
		var content = getFirstElementByClassName(entry, 'p_' + ID);//div
		if (content){
			showContent(entry,content,active);
		}else{
			var link = getEntryLink(entry);
			if(link) {
				replaceItem(link.url,entry,active);
			}
		}
	}

	function replaceItem(url,entry,active) {
		GM_xmlhttpRequest({
			url : 'http://www.readability.com/api/content/v1/parser',
			method : 'GET',
			dataType:'json',
			parameters:{
				url:url,
				token:'13ac5ea3e3b16ab8030e68952c7ffcf7cf508ff8'
			},
			onload : function(res, req) {
				var text = res.responseJson.content.replace(/[\r\n]+/g, '').replace(/>\s+</g, '><');
				replaceBody(text, entry,active);
			}
		});
	}

	function replaceBody(text, entry,active) {
		if(text !== '') {
			var body = getFirstElementByClassName(entry, 'entry-body');//div
			var el = document.createElement('div');
			el.className = 'p_' + ID;
			el.innerHTML = SL.loading;
			hide(el);
			el.innerHTML = text;
			body.appendChild(el);
			showContent(entry,el,active);
		} 
	}
	
	//Reset to original
	function showContent(entry,content,active){
		var body = getFirstElementByClassName(entry, 'entry-body');//div
		var entryBody = getEntryBody(body);
		if (active){
			hide(entryBody);
			show(content);
		}else {
			hide(content);
			show(entryBody);
		}
	}

	//registerFeature(doreadable, ID);
	GRP.api_entry(prefs, langs, ID, SL, lang, {
        action: 'readit',
        cb: readableEntry ,
        icon:{
        	id:ID,
        	clson:'read-state-kept-unread'
        }
    });
	
};
