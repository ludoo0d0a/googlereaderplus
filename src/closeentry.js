/**
 * @author Valente
 */

var grp_closeentry = function(prefs) {

	function addCloseButton(el, entry, mode) {
		var span = document.createElement('span');
		span.className = 'item-close-me link unselectable';
		span.innerHTML = 'Close ';
		span.title = "Close this entry [x]";
		el.appendChild(span);
		span.addEventListener('click', closeEntryKey, false);
	}
	
	function closeEntryKey(e) {
		var entry = getEntry(e);
		closeEntry(entry);
	}
	
	function closeEntry(entry){
		var nextEntry = entry.nextSibling;
		entry.parentNode.removeChild(entry);
		
		if (hasClass(nextEntry.firstChild, 'collapsed')){
			//mode list
			nextEntry=nextEntry.firstChild;
		}
		
		simulateClick(nextEntry);
	}
	
	//http://images.google.com/images/isr_c.gif
	var css = ".item-close-me {margin-left: 4px;padding-left:16px;width:14px;height:14px;background-repeat:no-repeat;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oBCAkSJ1WKaoEAAABdSURBVCjPYzx0/uN/BnIBuZoPnf/4n4mBAsBErEuwiTNhU4CuEJc4imY7Q35GfBqQ5bE6G5sB2DRi1YxNITaNODXj8jNJoY3LC3hDG1kjXgOIdSJWdQOWPBkpyVUAalJcJ5S4CXgAAAAASUVORK5CYII=);}";
	GM_addStyle(css);
	
	initCatchEntries(addCloseButton, 'ecloseentry');
	initKey({key:88, fn:closeEntryKey});//x
};