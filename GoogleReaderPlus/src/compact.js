/**
 *
 * Toggle search
 */

GRP.compact = function(prefs, langs, ID, SL, lang) {
	var isCompact = GM_getValue('compact', false);
	var searchinbar = prefs.compact_searchinbar || false;
	var H={
		search: prefs.compact_hide_search || false,
		bar: prefs.compact_hide_bar || false,
		nav: prefs.compact_hide_nav || false,
		subscription: prefs.compact_hide_subscription || false,
		home: prefs.compact_hide_home || false,
		selectors: prefs.compact_hide_selectors || false,
		recommendations: prefs.compact_hide_recommendations || false
	};

	function toggleCompact(compact) {
		isCompact = ((compact===true) || !isCompact);
		GM_setValue('compact', isCompact);

		showas(get_id('gb'), H.search && isCompact);
		showas(get_id('lhn-add-subscription-section'), H.subscription && isCompact);
		showas(get_id('home-section'),  H.home && isCompact);
		showas(get_id('lhn-selectors'),  H.selectors && isCompact);
		showas(get_id('lhn-recommendations'),  H.recommendations && isCompact);
		
		//nav=viewer-header-container+logo-section
		showas(get_id('viewer-header-container'), H.nav && isCompact);
		showas(get_id('logo-section'), H.nav && isCompact);
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
			showas(get_id('top-bar'), H.search && isCompact);
		}
		fireResize('', 100);
	}

	toggleCompact(true);

	var keycode = getShortcutKey(ID, 'compact', prefs);
	//66 z
	keycode.fn = toggleCompact;
	initKey(keycode);

};
