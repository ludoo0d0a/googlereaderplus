/**
 * FitHeight 
 * @version  0.1
 * @date 2009
 * @author LudoO
 *
 * Fit entry height
 *
 */
GRP.fitheight = function(prefs) {
	var locked=false;
	if (prefs && prefs.fitheight_locked) {
		locked = prefs.fitheight_locked;
	}

	function fitHeight(btn, entry, locked){
		var active = isActive(btn, entry, 'fitheight', locked);
		addClassIf(entry, 'fit-height-on', active);
		jump(entry, true);
	}	
	
	function addButton(el, entry, mode) {
		var text = 'Fit height' + formatShortcut('fitheight', 'fit', prefs); //[f]
		addBottomLink(el,'Fit height', text, 'btn-fitheight', true, fitHeight, false, entry);
		if (locked){
			fitHeight(el, entry, true);
		}
	}

	function fitHeightKey() {
		onKey('btn-fitheight', fitHeight);
	}
	
	
	
	var he = getHeightEntries()-2;	

	var css = " .read.fit-height-on .entry-body{ display:block !important; max-height: "+he+"px !important; overflow-y:auto;}";
	GM_addStyle(css);
	
	initCatchEntries(addButton, 'efitheight');
	var keycode = getShortcutKey('fitheight', 'fit', prefs); //70;//f
	keycode.fn = fitHeightKey;
	initKey(keycode);
};
