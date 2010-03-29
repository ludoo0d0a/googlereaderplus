/**
 * TODO make doc
 * @version  0.2
 * @date 2010
 * @author JoLan
 * Replace entries with part of the original article
 *
 */
GRP.replacer = function(prefs, langs){
    var locked = false, SL = langs.replacer, partIndex = 0, gp_data={}, TPL_NAME = "replacer_result_";
    
    function initVars(){
		gp_data={};
		iterate(prefs.replacer_items, function(title,o){
			  o.re_url=new RegExp(o.url, "i");
			  o.re_search=new RegExp(o.search, "i");
			  gp_data[title]=o;
		});
    }
    
    function replaceItem(html, matches, partIndex){
        var result = '';
       
	   iterate(matches, function(title, o){
            var item = gp_data[title];
			var m = item.re_search.exec(html);
            if (m && m[0]) {
                result += m[0].replace(item.re_search, item.replace);
            }
        });
		
        var el = document.getElementById(TPL_NAME + partIndex);
        if (result !== '') {
            el.innerHTML = result;
        } else {
            el.innerHTML = SL.nomatch;
			//Reset to original
			el.style.display = 'none';
			var entryBody = getEntryBody(el.parentNode);
			if (entryBody){
				entryBody.style.display='';
			}
        }
    }
    
    function doreplacer(el, entry, mode, force){
        var index = -1, regex, link = getEntryLink(entry);
		if (link) {
            var matches = {};
			iterate(gp_data, function(title, o){
				if (o.re_url.test(link.url)){
					matches[title]=o;
				}
			});
            replacePart(matches, entry, link);
        }
    }
    
    function replacePart(matches, entry, link){
        if (!matches || matches.length===0){
			return false;
		}
		
		var body = getFirstElementByClassName(entry, 'entry-body');//div
        var entryBody = getEntryBody(body);
        
        entryBody.style.display = 'none';
        var el = document.createElement('div');
        partIndex++;
        el.id = TPL_NAME + partIndex;
        el.innerHTML = SL.loading;
        body.appendChild(el);
        //console.log('request '+partIndex+' - '+link.url);
        GM_xmlhttpRequest(
        {
            url: link.url,
            method: "GET",
            partIndex: partIndex,
            matches: JSON.stringify(matches),
            onload: function(res, req){
                var matches = JSON.parse(req.matches);
                replaceItem(res.responseText, matches, req.partIndex);
            }
        });
    }
    
    
    initVars();
    registerFeature(doreplacer, 'ereplacer');
};
