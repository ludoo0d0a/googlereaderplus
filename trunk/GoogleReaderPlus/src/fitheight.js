var grp_fitheight = function(prefs) {
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
		addBottomLink(el,'Fit height', 'Fit height [f]', 'btn-fitheight', true, fitHeight);
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
	/*f = fitHeight*/
	initKey({key:70, fn:fitHeightKey});
};
