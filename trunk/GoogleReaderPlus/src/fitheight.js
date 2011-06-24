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
	var locked=false;
	if (prefs && prefs.fitheight_locked) {
		locked = prefs.fitheight_locked;
	}

	function fitHeight(btn, entry, locked){
		var active = isActive(btn, entry, ID, locked);
		//TODO: replace 'fit-height-on' with 'fitheight'
		addClassIf(entry, 'fit-height-on', active);
		if (active) {
			updateCss();
		}
		
		if (!locked) {
			jump(entry, true);
		}
	}	
	
	function addButton(el, entry, mode) {
		var title = SL.text + formatShortcut(ID, 'fit', prefs); //[f]
		//var text = (prefs && prefs.general_icons)?'':(SL.keyword || ID);
		var text = (SL.keyword || ID);//checkbox
		addBottomLink(el,text, title, ID, '', true, fitHeight, false, entry, mode);
		if (locked){
			fitHeight(el, entry, true);
		}
	}

	function fitHeightKey() {
		onKey('btn-fitheight', fitHeight);
	}
	
	function updateCss(){
		var he = getHeightEntries() - 2;
		var css = " .read.fit-height-on .entry-body{ display:block !important; max-height: " + he + "px !important; overflow-y:auto;}";
		css += ".fit-height-on .entry-likers{display:none !important;}";
		GM_addStyle(css, 'rpe_'+ID);
	}
	updateCss();
	
	registerFeature(addButton, ID);
	var keycode = getShortcutKey(ID, 'fit', prefs); //70 f
	keycode.fn = fitHeightKey;
	initKey(keycode);
};
