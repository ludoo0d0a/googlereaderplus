/**
 * TODO make doc
 * @version  0.1
 * @date 2010
 * @author JoLan
 * Replace entries with part of the original article
 *
 */
GRP.replacer = function(prefs, langs){
    var locked = false, SL = langs.replacer, partIndex = 0, TPL_NAME = "replacer_result_";
    var gp_links, gp_from, gp_to, re_from = [], re_links = [];
    
    function initVars(){
        gp_links = prefs.replacer_link.split("\n");
        gp_from = prefs.replacer_from.split("\n");
        gp_to = prefs.replacer_to.split("\n");
        
        for (var i = 0; i < gp_from.length; i++) {
            if (gp_from[i] && gp_links[i]) {
                re_from[i] = new RegExp(gp_from[i], "i");
                re_links[i] = new RegExp(gp_links[i], "i");
            }
        }
    }
    
    function replaceItem(html, indexes, partIndex){
        var result = "";
        for (var i = 0, len = indexes.length; i < len; i++) {
            var index = indexes[i];
            var m = re_from[index].exec(html);
            if (m && (m.length > 0)) {
                var matchingtext = m[0];
                result += matchingtext.replace(re_from[index], gp_to[index]);
            }
            
        }
        var el = document.getElementById(TPL_NAME + partIndex);
        if (result !== "") {
            el.innerHTML = result;
        } else {
            el.innerHTML = SL.nomatch;
        }
        
    }
    
    function doreplacer(el, entry, mode, force){
        var index = -1, regex, link = getEntryLink(entry);
        if (link && prefs.replacer_link) {
            var indexes = [];
            for (var i = 0, len = gp_links.length; i < len; i++) {
                if (gp_links[i]) {
                    //console.log(link.url);
                    //console.log(gp_links[i]);
                    if (re_links[i].test(link.url)) {
                        indexes.push(i);
                    }
                }
            }
            
            replacePart(indexes, entry, link);
        }
    }
    
    function replacePart(indexes, entry, link){
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
            indexes: JSON.stringify(indexes),
            onload: function(res, req){
                var indexes = JSON.parse(req.indexes);
                replaceItem(res.responseText, indexes, req.partIndex);
            }
        });
    }
    
    
    initVars();
    registerFeature(doreplacer, 'ereplacer');
};
