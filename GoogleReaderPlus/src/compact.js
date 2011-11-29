/**
 *
 * Toggle search
 */

GRP.compact = function(prefs, langs, ID, SL, lang) {
	var searchinbar = prefs.compact_searchinbar || false;
	var hide_search = prefs.compact_hidesearch || false;
	var hide_bar = prefs.compact_hidebar || false;
	var hide_subscription = prefs.compact_hidesubscription || false;
	var isCompact = GM_getValue('compact', false);

	function toggleCompact() {
		isCompact = !isCompact;
		GM_setValue('compact', isCompact);

		showas(get_id('gb'), hide_search && isCompact);
		showas(get_id('lhn-add-subscription-section'), hide_subscription && isCompact);
		if(searchinbar) {
			var css = '#search{position: absolute;top: -42px;left: 300px;z-index: 9999;}';
			css += '#top-bar{height:0px;}';
			css += '#logo-container{display:none;}';
			css += '#search .jfk-textinput{height:22px;}';
			css += '#search .jfk-button{height:22px;}';
			css += '#search .goog-flat-menu-button{line-height: 22px;}';
			GM_addStyle(css, 'rps_searchinbar');
		} else {
			showas(get_id('top-bar'), hide_search && isCompact);
		}
		fireResize();
	}

	toggleCompact();

	var keycode = getShortcutKey(ID, 'compact', prefs);
	//66 z
	keycode.fn = toggleCompact;
	initKey(keycode);

};
