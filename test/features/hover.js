/**
 * Select by mouse hover only
 *
 * @param {Object} prefs
 * @param {Object} langs
 * @param {Object} ID
 * @param {Object} SL
 * @param {Object} lang
 */
GRP.hover = function(prefs, langs, ID, SL, lang){
    var lastEntry, entries = get_id('entries'), timehover = prefs.hover_timehover || 800;
    function enterEntry(e){
        var el = e.target;
        var entry = findParentNode(el, 'div', 'entry');
        if (entry && entry !== lastEntry) {
            lastEntry = entry;
            entry.hoverin = 1;
            console.log('in #' + el.id + '.' + el.className + ' entry:' + entry.className);
            entry.tmi = window.setTimeout(function(){
                //console.log('simulateClick entry:' + entry.className);
                var sc = entries.scrollTop;
				simulateClick(entry);
                /*
                var ce = get_id('current-entry');
                if (ce) {
                    ce.id = '';
                }
                entry.id = 'current-entry';
                */
				
                //clean up
                entry.removeEventListener('mouseover', enterEntry, false);
                entry.removeEventListener('mouseout', leaveEntry, false);
				window.setTimeout(function(){
					entries.scrollTop=sc;
				},200);
            }, timehover);
        }
    }
    function leaveEntry(e){
        if (lastEntry) {
            var el = e.target;
            var entry = findParentNode(el, 'div', 'entry');
            if (entry && entry !== lastEntry) {
                //console.log('out #'+el.id+'.'+el.className+ ' entry:'+entry.className);
                if (entry.tmi) {
                    window.clearTimeout(entry.tmi);
                }
            }
        }
    }
    function initEntry(el, entry, mode){
        if (!hasClass(entry, 'read') && !hasClass(entry, ID)) {
            //var el = (modeList) ? entry.firstChild : entry;
            entry.addEventListener('mouseover', enterEntry, false);
            entry.addEventListener('mouseout', leaveEntry, false);
        }
    }
    registerFeature(initEntry, 'e' + ID);
};
