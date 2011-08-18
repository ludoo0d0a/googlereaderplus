/**
 * Facebook Sharer + Google Reader
 * @version  ?
 * @date 2007-06-01
 *
 * Adds a "Preview button" that allows you to view actual article in a frame. 
 * Clicking again on that button goes back to RSS view. 
 * Does work both in List view and expanded view.
 *
 * Original author :
 * Thadk
 * http://userscripts.org/scripts/show/63997
 * http://userscripts.org/scripts/show/9594
 */

GRP.facebook = function(prefs, langs, ID, SL, lang){
	var BTN_CLS = 'item-share star', BTN_CLS_ID ='btn-'+ID+' '+BTN_CLS;
	var URL='http://www.facebook.com/sharer.php?&u={url}&t={title}';
	var OPTWIN = 'toolbar=0,status=0,resizable=1,width=626,height=436';
	
	function addButton(el, entry, mode) {
		var title = SL.text + formatShortcut(ID, 'go'+ID, prefs); //[b]
		var text = (prefs && prefs.general_icons)?'':(SL.keyword || ID);
		addBottomLink(el,text, title, ID, BTN_CLS, false, openShareWindow, false, entry, mode);
	}

	function addKey() {
		onKey('btn-'+ID, openShareWindow);
	}

	function openShareWindow(btn, entry, locked) {
		var active = isActive(btn, entry, ID, locked, 'btn-active', 'btn-inactive');
		addClassIf(btn, 'item-star-active',active);
		if (active) {
			var shareurl = getEntryLink(entry);
			var url = fillTpl(URL, shareurl);
			window.open(url, ID+'sharer', OPTWIN);
		} 
	}
	addCssIcon(ID);
	registerFeature(addButton, ID);
	var keycode = getShortcutKey(ID, 'go'+ID, prefs); //66 b
	keycode.fn = addKey;
	initKey(keycode);
};