/*
 * 
 */
function initCatchEntries(fn, bid){
	document.body.addEventListener('DOMNodeInserted', function(e){
		catchEntryAdded(e, fn, bid);
	}, false);
	catchAllEntries(fn, bid);
}
function catchEntryAdded(e, fn, bid) {
	var mode, el = e.target;
	if (el.tagName == "DIV" && el.className.indexOf('entry') > -1) {
		if (el.className.indexOf('entry-actions') > -1) {
			// Expanding article in list view
			mode = "list";
			catchEntry(el, mode, fn, bid);
		} else if (getFirstElementMatchingClassName(el, 'div', 'card-bottom')) {
			// Adding article in expanded view
			mode = "expanded";
			el = getFirstElementMatchingClassName(el, 'div', 'entry-actions');
			catchEntry(el, mode, fn, bid);
		}
	}
}

function catchAllEntries(fn, bid) {
	var root = document.getElementById('entries');
	var entries = getElementsByClazzName('entry', 'div', root);
	for ( var i = 0; i < entries.length; i++) {
		catchEntryAdded( {
			target : entries[i]
		}, fn, bid);
	}
}

function catchEntry(el, mode, fn, bid) {
	var entry = findParentNode(el, 'div', 'entry');
	if (!entry.className || entry.className.indexOf(bid) === -1) {
		entry.className += ' '+bid;
		fn.call(this, el, entry, mode);
	}
}

function getCurrentEntry(){
	return document.getElementById('current-entry');
}

function getEntry(e){
	var el = e.target;
	var entry;
	if (el){
		entry = findParentNode(el, 'div', 'entry');
	}
	if (!entry){
		entry = getCurrentEntry();
	}
	return entry;
}

function jump(entry, dirtop) {
	var entries = document.getElementById('entries');
	var height = parseInt(entries.style.height.replace('px', ''), 10);
	var top = 0;
	if (dirtop) {
		top = entry.offsetTop; // - height;
	} else {
		top = entry.offsetTop + entry.offsetHeight - height;
	}
	if (top >= 0) {
		entries.scrollTop = top;
	}
}
function getHeightEntries(){
	var entries = document.getElementById('entries');
	return entries?(entries.style.height-110):500;
}
function initResize(fn){
	document.body.addEventListener('resize', function(e){
		if (typeof fn === "function") {
			fn.call(this);
		}
	}, false);
}