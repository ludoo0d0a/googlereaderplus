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
function getMode(entry){
	return hasClass(entry.firstChild, 'collapsed')?'list':'expanded';
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
	return entries?(parseInt(entries.style.height.replace('px',''), 10)-110):500;
}
function getBody(entry){
	var body = getFirstElementMatchingClassName(entry, 'div', 'item-body');
	// why a sub body sometimes ??
	var subbody = getFirstElementMatchingClassName(body, 'div', 'item-body');
	if (subbody){
		body = subbody;
	}
	return body;
}
function initResize(fn){
	document.body.addEventListener('resize', function(e){
		if (typeof fn === "function") {
			fn.call(this);
		}
	}, false);
}
function addButton(reference, text, title,  fn, position){
	position = position || 0;
	var div = document.createElement('div');
	div.style.marginLeft = '0.5em';
	div.className = 'goog-button goog-button-base unselectable goog-inline-block goog-button-float-left goog-button-tight';
	div.setAttribute('tabindex', '0');
	if (title) {
		div.setAttribute('title', title);
	}
	div.setAttribute('role', 'wairole:button');
	div.innerHTML = '<div class="goog-button-base-outer-box goog-inline-block"><div class="goog-button-base-inner-box goog-inline-block"><div class="goog-button-base-pos"><div class="goog-button-base-top-shadow">&nbsp;</div><div class="goog-button-base-content"><div class="goog-button-body">' + text + '</div></div></div></div></div>';
	if (position ==1 ) {
		//after
		if (reference.nextSibling) {
			reference.parentNode.insertBefore(div, reference.nextSibling);
		}else{
			//last item
			reference.parentNode.appendChild(div);
		}
	}else if (position == 2) {
		//before
		reference.parentNode.insertBefore(div, reference);
	} else{
		//append
		reference.appendChild(div);
	}
	var me = this;
	div.addEventListener('click', function(e) {
		fn.call(me);
	}, false);
}
function onKey(cls, fn) {
	var entry = getCurrentEntry();
	var el = getFirstElementMatchingClassName(entry, 'span', cls);
	fn.call(this,el, entry);
}

function addBottomLink(el, text, title, cls, button, callback, locked){
	var span = document.createElement('span');
	span.className = cls+(button?'read-state-not-kept-unread read-state ':'')+' link unselectable';
	span.innerHTML = text;
	span.title = title;
	el.appendChild(span);
	var lcked = locked;
	function onClick(e) {
		var el = e.target;
		var entry = findParentNode(el, 'div', 'entry');
		callback(el, entry, lcked, e);
	}
	span.addEventListener('click', onClick, false);
	if (locked){
		//activate it
		columnize(span, entry, true);
	}
}
function isActive(entry, cls, locked){
	var active = false;
	if (locked || entry.className.indexOf(cls) == -1) {
		entry.className = entry.className + ' '+cls;
		toggleClass(el, 'read-state-not-kept-unread', 'read-state-kept-unread');
		active = true;
	} else {
		removeClass(entry, cls);
		toggleClass(el, 'read-state-kept-unread', 'read-state-not-kept-unread');
		active = false;
	}
	return active;
}