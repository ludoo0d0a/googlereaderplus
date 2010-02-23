/**
 * TODO make doc
 * @version  0.1
 * @date 2010
 * @author JoLan
 * Replace enties with part of the original article
 *
 */
GRP.getpart = function(prefs, langs, myport){
    var locked = false;
    var partIndex = 0;
    var gp_links, gp_from, gp_to, re_from = [], re_links = [];
    
    function initVars(){
        gp_links = prefs.getpart_link.split("\n");
        gp_from = prefs.getpart_from.split("\n");
        gp_to = prefs.getpart_to.split("\n");
        
        for (var i = 0; i < gp_from.length; i++) {
            if (gp_from[i] && gp_links[i]) {
				re_from[i] = new RegExp(gp_from[i], "i");
				re_links[i] = new RegExp(gp_links[i], "i");
			}
        }
    }
    
    function replaceItem(html, index, partresult, partindex){
        var result = "";
        var m = re_from[index].exec(html);
        if (m && (m.length > 0)) {
            var matchingtext = m[0];
            result += matchingtext.replace(re_from[index], gp_to[index]);
        } else {
            console.log("Match " + index + " not found");
        }
        
        if (result !== "") {
            partresult.innerHTML = result;
        } else {
            partresult.innerHTML = "No match found.";
        }
    }
    
    function dogetpart(el, entry, mode, force){
        var index = -1, regex, link = getEntryLink(entry);
        if (link && prefs.getpart_link) {
            for (var i = 0, len = gp_links.length; i < len; i++) {
                if (gp_links[i]) {
                    console.log(link.url);
					console.log(gp_links[i]);
					if (re_links[i].test(link.url)) {
                        index = i;
                        break;
                    }
                }
            }
            if (index >= 0) {
                var body = getFirstElementMatchingClassName(entry, 'div', 'entry-body');
                var entryBody = getEntryBody(body);
                
                entryBody.style.display = 'none';
                var partresult = document.createElement('div');
                partIndex++;
                partresult.id = "getpart_result_" + partIndex;
                partresult.innerHTML = "Loading ...";
                body.appendChild(partresult);
				var ii=index, pr=partresult, pi = partIndex;
                GM_xmlhttpRequest(
                {
                    url: link.url,
                    method: "GET",
                    //partindex: partIndex,
                    onload: function(res, req){
						replaceItem(res.responseText, ii, pr, pi);
                    }
                });
            }
        }
    }
    
    initVars();
    initCatchEntries(dogetpart, 'egetpart');
};
