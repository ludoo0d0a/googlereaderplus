// Google Reader Preview Enhanced
// version 1.07g-bryantsai
// 2009-01-16
// Copyright (c) 2009, Bryan Tsai
// @namespace       http://userscripts.org/scripts/show/12352
// @description     Derived from http://userscripts.org/scripts/show/9455, fixed the short-cut key problem and also changed the short-cut key to be 'f'. Also, modified the title click behavior. Now if you press Ctrl while clicking the title, the original Google Reader behavior would be carried out instead of this preview action (normal clicking would still toggle preview).

//fix hidden part of enclosure when iframe is shown

var grp_preview = function() {
	var lastEntry;

	function addPreviewButton(el, entry, mode) {
		// Top link
		//var entry = findParentNode(el, 'div', 'entry');
		var link = getFirstElementMatchingClassName(entry, 'a', 'entry-title-link');
		var text = link.innerText;
		link.title = 'Open in a new window';
		//link.innerHTML = '<div class="entry-title-go-to"></div>';
		link.innerHTML = '<div class="entry-title-maximize"></div>';

		var title = link.parentNode;// h2.entry-title
		var ilink = document.createElement('a');
		ilink.className = 'ilink';
		ilink.href = '#';
		ilink.title = 'Open as preview [Shift+V]';
		ilink.innerText = ' ' + text;
		title.insertBefore(ilink, link);
		ilink.addEventListener('click', previewMouseClick, false);

		// Bottom button
		var preview = document.createElement('span');
		// preview.className='item-preview preview link';
		preview.className = 'item-preview preview link read-state-not-kept-unread read-state';
		preview.innerHTML = 'Preview';
		el.appendChild(preview);
		preview.addEventListener('click', previewMouseClick, false);
	}

	function calcEntryIndex(e) {
		var index = 0;
		while (e.previousSibling) {
			index++;
			e = e.previousSibling;
		}
		return index;
	}

	function previewMouseClick(e) {
		var el = e.target;
		var entry = findParentNode(el, 'div', 'entry');
		var index = calcEntryIndex(entry);
		preview(entry, index);
		e.preventDefault();
	}

	function previewShortcut() {
		preview(document.getElementById('current-entry'));
	}
	function checkAction(entry, visible){
		var itm = getFirstElementMatchingClassName(entry, 'span', 'item-preview');
		if (visible) {
			entry.className = entry.className + ' preview';
			if (itm){
				itm.className = itm.className.replace('read-state-not-kept-unread', 'read-state-kept-unread');
			}
		} else {
			entry.className = entry.className.replace('preview', '').trim();
			if (itm){
				itm.className = itm.className.replace('read-state-kept-unread', 'read-state-not-kept-unread');
			}
		}
	}
	function preview(entry, el) {
		// Update entry with preview mode, need to do it before scrolling,
		// because scrolling will repaint preview button (list view only)
		var preview;
		var itm = getFirstElementMatchingClassName(entry, 'span', 'item-preview');
		if (itm){
			preview = (itm.className.indexOf('read-state-kept-unread') == -1);
		}else{
			preview = (entry.className.indexOf('preview') == -1);
		}
		
		checkAction(entry, preview);
		if (lastEntry){
			checkAction(lastEntry, false);
		}

		// Need to scroll before changing entry-body, because scrolling repaints
		// article from scratch (list view only)
		scrollTo(entry);

		var body = getFirstElementMatchingClassName(entry, 'div', 'entry-body');
		var entryBody = getFirstElementMatchingClassName(body, 'div', 'entry-enclosure');
		if (!entryBody) {
			entryBody = getFirstElementMatchingClassName(body, 'div', 'item-body');
		}

		if (preview) {
			// classic mode-> preview mode

			// hide rss item
			entryBody.style.display = 'none';

			// iframe creation/display
			var iframe = getFirstElementMatchingClassName(entry, 'iframe', 'preview');
			if (iframe) {
				// iframe already in document, display it
				iframe.style.display = 'block';
			} else {
				// iframe not in document, create it
				iframe = document.createElement('iframe');
				iframe.setAttribute('width', '100%');
				iframe.setAttribute('height', '500px');
				iframe.setAttribute('src', getFirstElementMatchingClassName(entry, 'a', 'entry-title-link'));
				iframe.className = 'preview';
				body.appendChild(iframe);
			}

			// Scale article container to fullwidth
			body.setAttribute('style', 'max-width: 98%');
			
			lastEntry = entry;
		} else {
			// preview mode -> classic mode

			// hide iframe
			var iframe = getFirstElementMatchingClassName(entry, 'iframe', 'preview');
			if (iframe)
				iframe.style.display = 'none';

			// show rss item
			entryBody.style.display = 'block';

			// Go back to initial width
			body.removeAttribute('style', '');
			
			lastEntry = false;
		}
	}

	function getEntryDOMObject(index) {
		// Because of repaint, entry doesn't point to correct DOM object, we
		// need to find entry using index
		var entries = document.getElementById('entries');
		var i = 0;
		entry = entries.firstChild;
		while ((i++) < index) {
			entry = entry.nextSibling;
		}
		return entry;
	}

	function scrollTo(entry) {
		// Force scrolling to top of article
		try {
			// Navigate through DOM until reaching "entries" item, in order to
			// compute current entry's top coordinate relative to entries' main
			// container
			var top = 0;
			while (entry.id != 'entries') {
				top += entry.offsetTop;
				entry = entry.parentNode;
			}
			document.getElementById('entries').scrollTop = top;
		} catch (err) {
		}
	}

	function restyle() {
		// Overwrites Better GReader extension css modifications regarding
		// entry-actions class.
		// Indeed, entry-actions was set to "float : right", thus div was not in
		// document flow.
		// Then, clicking on preview button let entry actions div in place
		// instead of going down automatically when iframe was added.
		// That's why I use here text-align: right. That has the same effect,
		// but keeps div in document flow.
		// restyle() is called after document load, in order to ensure that
		// Better GReader has already added its styles modifications
		var styles = document.getElementsByTagName('head')[0].getElementsByTagName('style');
		var i = 0;

		while (i < styles.length) {
			if (styles[i].innerHTML.indexOf('.entry-actions { float:right !important; }') > -1) {
				styles[i].innerHTML = styles[i].innerHTML.replace('.entry-actions { float:right !important; }',
						'.entry-actions { text-align: right; !important; }');
			}
			i++;
		}
	}
	
	var css = ".entry-title-maximize {margin-left: 4px;padding-left:16px;width:14px;height:14px;background-repeat:no-repeat;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAMIAzwDxOt8TMwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kMERYGFfecphMAAAIYSURBVDjLjVK/a1NRGD3fffcleUlaSRpjiylBCTV0FTc3cXXRDkVB0bGDUnRxqCB2VKE4qCDSwcGt/4G66GBBpEOt1RolsTHBJLT58X7ez6H58fLU6lk+Lufe75zvfJewD0zbm9nYtuYsmzUiH8EACBg1hEP4B9qme3t1vTUPIBbkdEmr0rS8Ez9qzknFTK6rmIgAIijFGDugy2hELhQrZn6rZJ3b0x2AAMhPRXOxtuOeZuYBQQRB+JrLGHd2Wu7jdx9bM3+zKk1bxSZS+kouYywFFGqVhnPmw5fOeSKAAaaAAwCQABDWRZ2IXvQzYhb1pntvo9C56rNLg/j6FeJPthq77t21zfZlZoAIHOSz4+EVAC0G6LcG1Ya9uPa5fQ3ASHd1PUUAcKePGMuHD4XOHs/Hl0I6WXJY2Xn4frN9YS/Igc0ecpnI/eSofN3sqIXRmLzZtrwrwje3UarYKRBigVkZgJXPGo8mUqGnb9ebt75XbQcAomHtiRhsjjrTR6Oz6YR8TsTE3G9C+ayxfDChzwFIWDZPaVpgC0TQul0cpdR1Zqhq3Z1lwJmajDxIJ0PzXZfw5TFo4KsQQhSV517yPA6lk6HddEK/sd9XlwCgCRoKU2jSVkpdFEK0Avdd9n9ZAJIIXmHbOlat2888xV6PqNQdlH9aQ6+/lc04EY2QbzlyMh1+VShbp7ZKZg7/gbghXo6P6W9651+wUN+npzFYbAAAAABJRU5ErkJggg==);}";
	GM_addStyle(css);
	
	initCatchEntries(addPreviewButton, 'epreview');
	initKey({key:86, shift:true, fn:previewShortcut});//shift+V
};