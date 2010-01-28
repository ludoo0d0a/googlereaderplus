/**
 * FitHeight 
 * @version  0.1
 * @date 2009
 * @author LudoO
 *
 * Fit entry height
 *
 */
GRP.fitheight = function(prefs, langs){
    var SL = langs.fitheight;
	var locked=false;
	if (prefs && prefs.fitheight_locked) {
		locked = prefs.fitheight_locked;
	}

	function fitHeight(btn, entry, locked){
		var active = isActive(btn, entry, 'fitheight', locked);
		//TODO: replace 'fit-height-on' with 'fitheight'
		addClassIf(entry, 'fit-height-on', active);
		jump(entry, true);
	}	
	
	function addButton(el, entry, mode) {
		var text = SL.text + formatShortcut('fitheight', 'fit', prefs); //[f]
		addBottomLink(el,SL.keyword, text, 'btn-fitheight', true, fitHeight, false, entry);
		if (locked){
			fitHeight(el, entry, true);
		}
	}

	function fitHeightKey() {
		onKey('btn-fitheight', fitHeight);
	}
	
	var he = getHeightEntries()-2;	

	var css = " .read.fit-height-on .entry-body{ display:block !important; max-height: "+he+"px !important; overflow-y:auto;}";
	css += ".fit-height-on .entry-likers{display:none;}";
	GM_addStyle(css);
	
	initCatchEntries(addButton, 'efitheight');
	var keycode = getShortcutKey('fitheight', 'fit', prefs); //70 f
	keycode.fn = fitHeightKey;
	initKey(keycode);
};
