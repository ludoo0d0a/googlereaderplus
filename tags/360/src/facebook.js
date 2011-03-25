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
	var BTN_CLS = 'item-share star';
	var BTN_CLS_ID ='btn-'+ID+' '+BTN_CLS;
	
	function addButton(el, entry, mode) {
		var title = SL.text + formatShortcut(ID, 'gofacebook', prefs); //[b]
		var text = (prefs && prefs.general_icons)?'':(SL.keyword || ID);
		addBottomLink(el,text, title, ID, BTN_CLS, false, facebookShare, false, entry, mode);
	}

	function addKey() {
		onKey('btn-facebook', facebookShare);
	}

	function facebookShare(btn, entry, locked) {
		var active = isActive(btn, entry, 'facebook', locked, 'btn-active', 'btn-inactive');
		addClassIf(btn, 'item-star-active',active);
		var iframe, facebookSharer;
		var body = getFirstElementByClassName(entry,  'entry-body');//div
		iframe = getFirstElementByClassName(entry,  'facebookSharer');//iframe
		if (active) {
			// iframe creation/display
			var shareurl = getEntryLink(entry);
			var e = encodeURIComponent;
			var fbsharer = 'http://www.facebook.com/sharer.php?&u=' + e(shareurl.url) + '&t='
					+ e(shareurl.title);
			window.open(fbsharer, 'sharer', 'toolbar=0,status=0,resizable=1,width=626,height=436');
			// Scale article container to fullwidth
			body.setAttribute('style', gpeStyles.entryBody);
		} else {
			// hide iframe
			iframe.style.display = 'none';

			// Go back to initial width
			body.removeAttribute('style', '');
		}
		scrollTo(150, active);
	}

	function scrollTo(offset, dir) {
		var view = document.getElementById('viewer-container');
		view.scrollTop += ((dir) ? 1 : -1) * offset;
		// Force scrolling to top of article
		// location.href = 'javascript:void(s.V=-1);';
		// location.href = 'javascript:void(s.pf('+index+'));';
	}

	var gpeStyles = {
		entryBody : 'max-width: 98%'
	};

	registerFeature(addButton, ID);
	var keycode = getShortcutKey(ID, 'gofacebook', prefs); //66 b
	keycode.fn = addKey;
	initKey(keycode);
};