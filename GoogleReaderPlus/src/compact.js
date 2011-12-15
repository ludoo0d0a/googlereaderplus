/**
 *
 * Toggle search
 */

GRP.compact = function(prefs, langs, ID, SL, lang) {
	var searchinbar = prefs.compact_searchinbar || false;
	var hide_search = prefs.compact_hide_search || false;
	var hide_bar = prefs.compact_hide_bar || false;
	var hide_nav = prefs.compact_hide_nav || false;
	var hide_subscription = prefs.compact_hide_subscription || false;
	var isCompact = GM_getValue('compact', false);

	function toggleCompact() {
		isCompact = !isCompact;
		GM_setValue('compact', isCompact);

		showas(get_id('gb'), hide_search && isCompact);
		showas(get_id('lhn-add-subscription-section'), hide_subscription && isCompact);
		//nav=viewer-header-container+logo-section
		showas(get_id('viewer-header-container'), hide_nav && isCompact);
		showas(get_id('logo-section'), hide_nav && isCompact);
		if(searchinbar) {
			var css = '#search{position: absolute;top:-6px;left:330px;z-index:9999;}';
			css += '#top-bar{height:0px;}';
			css += '#logo-container{display:none;}';
css += '#search-input{width:150px}';
css += '#search .goog-flat-menu-button{width:60px}';
			css += '#search .jfk-textinput{height:22px;}';
			css += '#search .jfk-button{height:22px;}';
			css += '#search .goog-flat-menu-button{line-height: 22px;}';
css += '#viewer-header {margin-left: -120px;}';
css += '#viewer-header div.jfk-button, #viewer-view-options, #mark-all-as-read-split-button, #viewer-top-controls .goog-button  {margin: 0 2px 0 0;}';
css += 'div#gbg {top: 45px;}';
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
