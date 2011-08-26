/**
 * Google Reader - Mark Until Current As Read
 * @version  1.3
 * @date 2007-06-01
 *
 * Mark all entries upto the current entry as read
 *
 * Original author :
 * Gautham Pai (http://buzypi.in/)
 * http://userscripts.org/scripts/show/24955
 */

GRP.mark = function(prefs, langs, ID, SL, lang){
	var currentElement, CLS='grp-mark-scrolled', CLS_READ='grp-mark-scroll-read', modeList=false, entries=get_id('entries');
	function setConfig(){
		currentElement = getCurrentEntry();
		modeList=(getMode(currentElement)==='list');
	}
	function clickEntry(entry, modeList){
		if (!hasClass(entry,'read')){
			var el = (modeList)?entry.firstChild:entry;
			simulateClick(el);
		}
	}
	function markUntilCurrentAsRead() {
		setConfig();
		var nextElement=currentElement.previousSibling;
		while(nextElement){
			clickEntry(nextElement, modeList);
			nextElement=nextElement.previousSibling;
		}
		
		simulateClick(currentElement.childNodes[0]);
	}

	function markAfterCurrentAsRead() {
		setConfig();
		var nextElement=currentElement.nextSibling;
		while(nextElement){
			clickEntry(nextElement, modeList);
			nextElement=nextElement.nextSibling;
		}
		simulateClick(currentElement.childNodes[0]);
	}

    var keycodeUp = getShortcutKey('mark', 'markprev', prefs); //87;//w
    keycodeUp.fn = markUntilCurrentAsRead;
    var keycodeDown = getShortcutKey('mark', 'marknext', prefs); //75;//k
    keycodeDown.fn = markAfterCurrentAsRead;
    initKey([keycodeUp, keycodeDown]);
    
    //Mark as reas as scroll
    if (prefs[ID+'_asscroll']){
		if(entries){
			entries.addEventListener('scroll',checkScroll,false);
		}
	}
	
	function checkScroll(ev){
		var mode = getMode();
		if (mode!=='list'){
			return;		
		}
		var all = entries.getElementsByClassName('entry');    
		var els=[], st = entries.scrollTop , t=0, i=0;
		var curr = getCurrentEntry();
		while(t<st){
			var entry=all[i++];
			if (entry){
				t+=entry.offsetHeight;
				if (t<st){
					if (!hasClass(entry,'read')){
						els.push(entry);
					}
				}
			}
		}
		if (els.length>0){
			els=els.reverse();
			for(var len = els.length, i = len-1; i>=0; i--){
				var el = els[i];
				if (!hasClass(el,CLS)){
					addClass(el,CLS);
					markasread(el, i==0);
				}
			}
			entries.scrollTop=st;
			setTimeout(function(){
				if (curr){
					selectCurrentEntry(curr);
				}
			},400);
		}
		
	}
};