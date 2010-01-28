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

GRP.facebook = function(prefs, langs) {
	var SL = langs.facebook; 

	function addButton(el, entry, mode) {
		var text = SL.text + formatShortcut('facebook', 'gofacebook', prefs); //[b]
		addBottomLink(el,SL.keyword, text, 'facebook', false, facebookShare, false, entry);
	}

	function addKey() {
		onKey('btn-facebook', facebookShare);
	}

	function facebookShare(btn, entry, locked) {
		var active = isActive(btn, entry, 'facebook', locked);
		
		var iframe, facebookSharer;
		
		var body = getFirstElementMatchingClassName(entry, 'div', 'entry-body');

		if (active) {
			// iframe creation/display
			iframe = getFirstElementMatchingClassName(entry, 'iframe', 'facebookSharer');
			if (iframe) {
				// iframe already in document, display it
				iframe.style.display = 'block';
			} else {
				// iframe not in document, create it
				iframe = document.createElement('iframe');
				iframe.setAttribute('width', '650px');
				iframe.setAttribute('height', '350px');
				iframe.setAttribute('name', 'grpfacebook');
				iframe.setAttribute('target', 'grpfacebook');
				var shareurl = getFirstElementMatchingClassName(entry, 'a', 'entry-title-link');
				var e = encodeURIComponent;
				var fbsharer = 'http://www.facebook.com/sharer.php?&u=' + e(shareurl.href) + '&t='
						+ e(shareurl.textContent);
				iframe.setAttribute('src', fbsharer);
				iframe.className = 'facebookSharer';
				body.appendChild(iframe);
			}

			// Scale article container to fullwidth
			body.setAttribute('style', gpeStyles.entryBody);
		} else {
			// hide iframe
			iframe = getFirstElementMatchingClassName(entry, 'iframe', 'facebookSharer');
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

	initCatchEntries(addButton, 'efacebook');
	var keycode = getShortcutKey('facebook', 'gofacebook', prefs); //66 b
	keycode.fn = addKey;
	initKey(keycode);
};