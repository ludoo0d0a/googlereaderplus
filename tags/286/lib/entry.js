/*
 *
 */
function initCatchEntries(fn, bid, globalFn){
    document.body.addEventListener('DOMNodeInserted', function(e){
        catchEntryAdded(e, fn, bid);
		if (globalFn){
			globalFn.call(this);
		}
    }, false);
    catchAllEntries(fn, bid);
	if (globalFn){
		globalFn.call(this);
	}
}

function catchEntryAdded(e, fn, bid){
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
    return hasClass(entry.firstChild, 'collapsed') ? 'list' : 'expanded';
}

function forAllEntries(fn){
    var root = document.getElementById('entries');
    var entries = getElementsByClazzName('entry', 'div', root);
    for (var i = 0; i < entries.length; i++) {
        fn.call(this, entries[i]);
    }
}

function catchAllEntries(fn, bid){
    forAllEntries(function(entry){
		catchEntryAdded(
        {
            target: entry
        }, fn, bid);
	});
}

function catchEntry(el, mode, fn, bid){
    var entry = findParentNode(el, 'div', 'entry');
    if (!entry.className || entry.className.indexOf(bid) === -1) {
        entry.className += ' ' + bid;
        fn.call(this, el, entry, mode);
    }
}

function getEntryLink(ent){
    var entry = ent || getCurrentEntry();
    var link = getFirstElementMatchingClassName(entry, 'a', 'title-link-url');
	if (!link || link.href == "#") {
		//Normal way
		link = getFirstElementMatchingClassName(entry, 'a', 'entry-title-link');
	}
	return link;
}

function openEntryInNewTab(entry, selected){
    var link = getEntryLink(entry);
	var url =  link.href;
    GM_openInTab(url, selected);
}

function getCurrentEntry(){
    return document.getElementById('current-entry');
}

function getEntry(e){
    var el = (e && e.target) ? e.target : (e.localName ? e : null);
    var entry;
    if (el) {
        entry = findParentNode(el, 'div', 'entry');
    }
    if (!entry) {
        entry = getCurrentEntry();
    }
    return entry;
}

function jump(entry, dirtop){
    if (!entry) {
        return false;
    }
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
    //TODO: better computation if minimalistic skin (110??)
    //todo : wrong if 'xx persons like this' is displayed
    return entries ? (parseInt(entries.style.height.replace('px', ''), 10) - 110) : 500;
}

function getBody(entry){
    var body = getFirstElementMatchingClassName(entry, 'div', 'item-body');
    // why a sub body sometimes ??
    var subbody = getFirstElementMatchingClassName(body, 'div', 'item-body');
    if (subbody) {
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

function addButton(reference, text, title, fn, position){
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
    if (position == 1) {
        //after
        if (reference.nextSibling) {
            reference.parentNode.insertBefore(div, reference.nextSibling);
        } else {
            //last item
            reference.parentNode.appendChild(div);
        }
    } else if (position == 2) {
        //before
        reference.parentNode.insertBefore(div, reference);
    } else {
        //append
        reference.appendChild(div);
    }
    var me = this;
    div.addEventListener('click', function(e){
        fn.call(me);
    }, false);
}

function onKey(cls, fn){
    var entry = getCurrentEntry();
    var btn = getFirstElementMatchingClassName(entry, 'span', cls);
    fn.call(this, btn, entry);
}

function addBottomLink(el, text, title, cls, button, callback, locked, entry){
    var span = document.createElement('span');
    span.className = cls + (button ? ' read-state-not-kept-unread read-state' : '') + ' link unselectable';
    span.innerHTML = text;
    span.title = title;
    el.appendChild(span);
    var lcked = locked;
    function onClick(e){
        var btn = e.target;
        var entry = findParentNode(el, 'div', 'entry');
        callback(btn, entry, lcked, e);
    }
    span.addEventListener('click', onClick, false);
    if (locked) {
        //activate it
        callback(span, entry, true);
    }
}

function isActive(btn, entry, cls, locked){
    var active = false;
    //if (locked || entry.className.indexOf(cls) == -1) {
    if (locked || !hasClass(btn, 'read-state-kept-unread')) {
        addClass(entry, cls);
		if (btn) {
			toggleClass(btn, 'read-state-not-kept-unread', 'read-state-kept-unread');
		}
        active = true;
    } else {
        removeClass(entry, cls);
		if (btn) {
			toggleClass(btn, 'read-state-kept-unread', 'read-state-not-kept-unread');
		}
        active = false;
    }
    return active;
}

function formatShortcut(script, shortcut, prefs){
    var t = '';
    if (prefs) {
        //var key = prefs[script + '-key-' + shortcut];
        var key = getShortcutKey(script, shortcut, prefs);
        if (key) {
            t = formatKey(key);
            if (t) {
                t = ' [' + t + ']';
            }
        }
    }
    return t;
}

function getShortcutKey(script, shortcut, prefs){
    var key, keyhash = prefs[script + '_key_' + shortcut];
    if (keyhash) {
        key = unmarshallKey(keyhash);
    } else {
        try {
            var s = getScriptObject(script);
            key = s.shortcuts[shortcut];
        } 
        catch (e) {
            console.error("Failed to get default shortcut " + shortcut + " for script " + script);
        }
    }
    return key;
}

/*
 * TODO: replace by a map
 */
function getScriptObject(id){
    for (var i = 0, len = GRP.scripts.length; i < len; i++) {
        var script = GRP.scripts[i];
        if (script.id == id) {
            return script;
        }
    }
    return null;
}

function toggle(el){
	if (!el.style.display){
		hide(el);
	}else{
		show(el);
	}
}
function hide(el){
	el.style.display = "none";
}
function show(el){
	delete el.style.display;
}

function createMenu(items){
    var menu = document.createElement('div');
    menu.className = "goog-menu goog-menu-vertical";
    menu.style = "-moz-user-select: none; left: 228px; top: 20.1px; max-height: 300px;";
    menu.role = "menu";
    //menu['aria-haspopup']=true;
    menu.tabindex = -1;
    menu.id = "stream-prefs-menu-menu";
	addMenuItems(menu,items);
}

function addMenuItems(menu, items){
    var item, i, len, html = '';
	var tplInner = '<div class="goog-menuitem-content"><div class="goog-menuitem-checkbox"></div>{text}</div>';
    for (i = 0, len = items.length; i < len; i++) {
        item = items[i];
        var el = document.createElement('div');
		addClass(el, 'goog-menuitem goog-option '+((item.selected) ? 'goog-option-selected' : ''));
		el.role = "menuitem";
		el.style="-moz-user-select: none;";
		el.id=':grp' + i;
		el.innerHTML=fillTpl(tplInner, item);
		var callback = function(){
			item.fn.call(el, [item, el]);
		};
		el.addEventListener('click', callback, false);
	 }
}
function toggleCheckMenu(el){
	if (hasClass(el, 'goog-option-selected')) {
		removeClass(el, 'goog-option-selected');
	} else {
		addClass(el, 'goog-option-selected');
	}
}

function getLanguage(){
    var m, lang = 'en';
    var cookie = readCookie('GRLD') || '';
    if (cookie !== '') {
        //GRLD Not visible !!
        m = /((\w+)-(\w+)):\d+/.exec(cookie);
        if (m) {
            lang = m[2];//en
        //lang = m[1];en-US
        }
    } else {
        cookie = readCookie('PREF') || '';
        //855ba6572:LD=en:CR=2:TM=12
        m = /:LD=(\w+):/.exec(cookie);
        if (m) {
            lang = m[1];//en
        }
    }
    
    return lang;
}