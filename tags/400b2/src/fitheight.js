/**
 * FitHeight 
 * @version  0.1
 * @date 2009
 * @author LudoO
 *
 * Fit entry height
 *
 */
GRP.fitheight = function(prefs, langs, ID, SL, lang){
	/*var active=false, locked=false;
	if (prefs && prefs.fitheight_locked) {
		locked = prefs.fitheight_locked;
	}*/

	function updateCss(){
		var he = getMaxBodyHeight() - 10;
		var css = ".read.fitheight .entry-body{ display:block !important; max-height: " + he + "px !important; max-width: 100% !important; overflow-y:auto;}";
		GM_addStyle(css, 'rpe_'+ID);
	}
	updateCss();
	
	function fitHeight(entry, active, btn, e, locked){
		addClassIf(entry, 'fitheight', active);
		if (active) {
			updateCss();
		}
		
		if (!locked) {
			jump(entry, true);
		}
	}	
	
	GRP.api_entry(prefs, langs, ID, SL, lang, {
        action: 'fit',
        cb: fitHeight
    },{
    	//onlistviewtitle:true
    });
};
