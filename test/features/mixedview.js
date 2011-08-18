

GRP.mixedview = function(prefs, langs, ID, SL){
    var css = "#chrome-viewer{width:25%;}#mixedview {width:30%;}";
    GM_addStyle(css);
	
	function initEntry(el, entry, mode){
		
	}
	function initFeature(){
		var td = dh('chrome-viewer', 'td', {position:'after', id:'mixedview', html:'<div id="mv-container"><iframe id="mv-iframe" src="" width="100%" height="100%"></iframe></div>'});
		/*var mv = get_id('mixedview');
		var mvif = get_id('mv-iframe');
		mvif.width=mv.offsetWidth+'px';
		var h = getHeightEntries();
		mvif.height=h+'px';*/
	}

	
    registerFeature(initEntry, 'e'+ID);
    
    //var keycode = getShortcutKey(ID, 'prview', prefs); //81 q
    //keycode.fn = previewShortcut;
    //initKey(keycode);
	initFeature();
};


