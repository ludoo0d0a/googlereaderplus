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
    var gp_links, gp_from, gp_to, gp_fromregex = [];
    
    function initVars(){
        gp_links = prefs.getpart_link.split("\n");
        gp_from = prefs.getpart_from.split("\n");
        gp_to = prefs.getpart_to.split("\n");
        
        for (var i = 0; i < gp_from.length; i++) {
            gp_fromregex[i] = new RegExp(gp_from[i], "i");
        }
    }
    
    function replaceItem(res, request){
        var partresult = document.getElementById("getpart_result_" + request.partindex);
        
        if (!partresult) {
            console.log("cant find entry " + request.partindex);
            return;
        }
        
        var html = res.responseText;
        var result = "";
        
        for (var i = 0; i < gp_links.length; i++) {
            re = new RegExp(gp_links[i]);
            if (re.test(request.url)) {
                // console.log ("link match : "+request.url);
                var matchingPart = gp_fromregex[i].exec(html);
                if (matchingPart && (matchingPart.length > 0)) {
                    var matchingtext = matchingPart[0];
                    //console.log ("match found : "+matchingPart);
                    result += matchingtext.replace(gp_fromregex[i], gp_to[i]);
                } else {
                    console.log("Match " + i + " not found");
                }
            }
        }
        
        if (result !== "") {
            partresult.innerHTML = result;
        } else {
            partresult.innerHTML = "No match found.";
        }
    }
    
    function dogetpart(el, entry, mode, force){
        var link = getEntryLink(entry);
        // console.log ("entry link : "+link.url);
        if (link && prefs.getpart_link) {
            var matched = false;
			for (var i=0,  len=gp_links.length; i<len; i++){	
                // console.log("testing : "+gp_links[i]);
                re = new RegExp(gp_links[i]);
                if (re.test(link.url)) {
                    matched = true;
					continue;
                    // console.log ("link match : "+link.title);
                }
            }
            if (matched) {
                var body = getFirstElementMatchingClassName(entry, 'div', 'entry-body');
                var entryBody = getEntryBody(body);
                
                entryBody.style.display = 'none';
                var partresult = document.createElement('div');
                partIndex++;
                partresult.id = "getpart_result_" + partIndex;
                partresult.innerHTML = "Loading ...";
                body.appendChild(partresult);
                GM_xmlhttpRequest(
                {
                    url: link.url,
                    method: "GET",
                    partindex: partIndex,
                    onload: replaceItem
                });
                // console.log ("sent request.");
            }
        }
    }
    
    initVars();
    initCatchEntries(dogetpart, 'egetpart');
};
