/**
 * Close entry
 * @version  0.1
 * @date 2010
 * @author LudoO
 *
 * Add a close button on each entry
 *
 */

GRP.closeentry = function(prefs, langs) {
	var SL = langs.closeentry; 
	function addLink(el, entry, mode) {
		var text = SL.text + formatShortcut('closeentry', 'close', prefs); //[x]
		addBottomLink(el, SL.keyword , text, 'item-close-me', false, closeEntry, false, entry);
	}
	
	function addKey(e) {
		var entry = getEntry(e);
		closeEntry('item-close-me', entry);
	}
	
	function closeEntry(btn, entry, locked, e){
		var nextEntry = entry.nextSibling;
		entry.parentNode.removeChild(entry);
		
		if (hasClass(nextEntry.firstChild, 'collapsed')){
			//mode list
			nextEntry=nextEntry.firstChild;
		}
		
		simulateClick(nextEntry);
	}
	
	//http://images.google.com/images/isr_c.gif
	var css = ".item-close-me {margin-left: 4px;padding: 1px 8px 1px 16px;;width:14px;height:14px;background-repeat:no-repeat;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oBCAkSJ1WKaoEAAABdSURBVCjPYzx0/uN/BnIBuZoPnf/4n4mBAsBErEuwiTNhU4CuEJc4imY7Q35GfBqQ5bE6G5sB2DRi1YxNITaNODXj8jNJoY3LC3hDG1kjXgOIdSJWdQOWPBkpyVUAalJcJ5S4CXgAAAAASUVORK5CYII=);}";
	GM_addStyle(css);
	
	initCatchEntries(addLink, 'ecloseentry');
	var keycode = getShortcutKey('closeentry', 'close', prefs); //88//x
	keycode.fn = addKey;
	initKey(keycode);
};