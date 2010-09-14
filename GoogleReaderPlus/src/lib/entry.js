/*
 * Entries
 */
var stackFeatures = [], externals = [];
function registerFeature(fn, bid, params){
    params = params || {};
    params.bid = 'e' + bid;
    stackFeatures.push({
        fn: fn,
        params: params
    });
    if (params && params.loader) {
        if (isArray(params.loader)) {
            externals = externals.concat(params.loader);
        } else {
            externals.push(params.loader);
        }
    }
    if (params && params.globalFn) {
        params.globalFn.call(this);
    }
}

function execAll(el, entry, mode, force){
    window.setTimeout(function(){
        execAllOffset(el, entry, mode, force);
    }, 400);
}

function execAllOffset(el, entry, mode, force){
    for (var i = 0, len = stackFeatures.length; i < len; i++) {
        var p = stackFeatures[i].params;
        if (el) {
            //ListView-opened + ExpandedView
            if (!isTagged(el, p.bid)) {
                stackFeatures[i].fn.call(this, el, entry, mode);
            }
        } else {
            //ListView-closed
            if (p && p.onlistviewtitle) {
                //only for favcions (onlistviewtitle=true)
                if (force || !isTagged(entry.firstChild, p.bid)) {
                    stackFeatures[i].fn.call(this, el, entry, mode);
                }
            }
        }
    }
}

function monitorEntries(el){
    var root = el || get_id('entries');
    root.addEventListener('DOMNodeInserted', function(e){
        checkEntry(e.target, execAll);
    }, false);
    catchAllEntries(execAll);
    loadExternal(function(){
        catchAllEntries(execAll);
    });
}

function loadExternal(cb){
    var ext = {};
    if (externals && externals.length > 0) {
        for (var i = 0, len = externals.length; i < len; i++) {
            var o = externals[i];
            ext[i] = o;
            if (typeof o === "function") {
                o.call(this, function(){
                    delete ext[i];
                    if (ext.length === 0) {
                        cb();
                    }
                });
            } else if (typeof o === "string") {
                GM_addScript(o, true);
            }
        }
    } else {
        cb();
    }
}

/*
 //ListView
 entry
 -collapsed
 if open{
 -entry-container
 -entry-comments
 -entry-actions
 }
 //ExpandedView
 entry
 -card card-common
 --card-content
 --card-comments
 --card-actions card-bottom
 ---entry-actions
 //ListView -closed
 DIV.hidden
 DIV.
 DIV.entry entry-0(*)
 //ListView -opened
 DIV.entry-container
 DIV.entry-comments
 DIV.entry-actions(*)
 DIV.entry-title-maximize
 //ExpandedView
 DIV.entry entry-0(*)
 DIV.entry-title-maximize
 */
function checkEntry(el, fn, params){
    if (el.tagName == "DIV") {
        if (hasClass(el, 'entry')) {
            if (hasClass(el.firstChild, 'card')) {
                // *********** Expanded view
                //var ea = getFirstElementByClassName(el, 'entry-actions');
                var ea = el.firstChild.lastChild.firstChild;
                //console.log("Run as ExpandedView for "+el.tagName + "." + el.className);
                catchEntry(el, ea, fn, params, false);
            } else {
                // *********** Closed article in List view
                //console.log("Run as ListView-closed for "+el.tagName + "." + el.className);
                catchEntry(el, false, fn, params, true);
            }
        } else if (hasClass(el, 'entry-actions')) {
            // *********** Expand article in List view
            //console.log("Run as ListView-opened for "+el.tagName + "." + el.className);
            var entry = findParentNode(el, 'div', 'entry');
            catchEntry(entry, el, fn, params, true, true);
        }
    }
}

function filterEntry(entry, rx){
    var o = getEntryLink(entry);
    return (rx && (rx.test(o.url) || (o.feed && rx.test(o.feed))));
}

function getRegex(urls){
    if (!urls || urls.length == 0) {
        return false;
    }
    var escaped = [];
    for (var i = 0, len = urls.length; i < len; i++) {
        if (urls[i]) {
            escaped.push(encodeRE(urls[i]));
        }
    }
    return new RegExp(escaped.join("|"), "i");
}

function forAllEntries(fn){
    var root = get_id('entries');
    //var entries = getElementsByClazzName('entry', 'div', root);
    var entries = root.getElementsByClassName('entry');
    for (var i = 0; i < entries.length; i++) {
        fn.call(this, entries[i]);
    }
}

function catchAllEntries(fn, params){
    forAllEntries(function(entry){
        checkEntry(entry, fn, params);
    });
}

function catchEntry(entry, el, fn, params, listview, force){
    //var mode = getMode(entry);
    var mode = (listview) ? 'list' : 'expanded';
    fn.call(this, el, entry, mode, force);
}

/*
 * Side bar
 */
function initCatchSidebars(fn, bid){
    document.body.addEventListener('DOMNodeInserted', function(e){
        catchSidebarAdded(e, fn, bid);
    }, false);
    catchAllSidebars(fn, bid);
}

function catchSidebarAdded(e, fn, bid){
    var el = e.target;
    //console.log("catchSidebarAdded > "+el.tagName + "." + el.className);
    if (el.tagName == "LI" && hasClass(el, 'sub')) {
        fn.call(this, el);
    } else if (el.tagName == "LI" && hasClass(el, 'folder') && (el.parentNode.id === 'sub-tree')) {
        catchAllSidebars(fn, bid);
    }
}

function forAllSidebars(fn){
    var root = document.getElementById('nav');
    var links = getElementsByClazzName('sub', 'li', root);
    for (var i = 0; i < links.length; i++) {
        fn.call(this, links[i]);
    }
}

function catchAllSidebars(fn, bid){
    forAllSidebars(function(el){
        catchSidebarAdded({
            target: el
        }, fn, bid);
    });
}

function getMode(entry){
    if (entry) {
        return hasClass(entry.firstChild, 'collapsed') ? 'list' : 'expanded';
    } else {
        return hasClass(get_id('view-cards'), 'link-selected') ? 'expanded' : 'list';
    }
}

function getOriginalEntryLink(entry){
    return getFirstElementByClassName(entry, 'entry-title-link');
}

function getEntrySiteTitle(ent){
    var entry = ent || getCurrentEntry();
    var point, match;
    //var mode = getMode(entry);
    //if (mode === 'collapsed') {
    point = getFirstElementByClassName(entry, 'entry-source-title');//'span'
    if (!point) {
        point = getFirstElementByClassName(entry, 'entry-source-title');//'a'
    }
    if (point) {
        match = point.textContent;
    }
    return match;
}

function getEntryLink(ent){
    //<a class="ilink entry-title-link" href="#" title="Open as preview [q]"> Il écope de 5 ans pour avoir parlé de sexe à la télé</a>
    //<a class="entry-title-link iframe title-link-url" target="_blank" href="http://www.lessentiel.lu/news/monde/story/17066269" title="Open in a new window"><div class="entry-title-maximize"></div></a>	
    var o = {
        feed: ''
    }, entry = ent || getCurrentEntry();
    var link = getFirstElementByClassName(entry, 'grp-link-url');//'a'
    if (!link) {
        //Normal way
        link = getFirstElementByClassName(entry, 'entry-title-link');//'a'
        if (link) {
            o.url = link.href;
            o.link = link;
            o.title = link.textContent;
            o.eltitle = link;
            
        } else {
            //Feed from html (non RSS page)
            var etitle = getFirstElementByClassName(entry, 'entry-title');//'h2'
            if (etitle) {
                var m = /"(.*)"/.exec(etitle.textContent);
                o.url = '';
                if (m) {
                    o.url = m[0];
                }
                o.title = etitle.textContent;
                o.eltitle = etitle;
                o.link = null;
            }
        }
    } else {
        //preview on 
        var link2 = getFirstElementByClassName(entry, 'grp-link-title');//'a'
        o = {
            title: link2.textContent,
            eltitle: link2,
            url: link.href,
            link: link
        };
    }
    //
    o.feed = getFeedEntry(entry);
    
    return o;
}

function getFeedEntry(entry){
    var url;
    var est = getFirstElementByClassName(entry, 'entry-source-title');//'a'
    //TODO/ listview=span but no href (could we use text label to match in nav tree?)
    if (est && est.href) {
        url = decodeURIComponent(est.href.replace(/^.*?view\/feed\//, ''));
        if (!url) {
            //Find using current selected nav item 
            var nav = get_id('nav'), tls = getFirstElementByClassName(nav, 'tree-link-selected');//'a'
            if (tls) {
                url = decodeURIComponent(tls.href.replace(/^.*?view\/feed\//, ''));
            }
        }
    }
    
    return url;
}

function openEntryInNewTab(entry, selected){
    var link = getEntryLink(entry);
    var url = link.url;
    GM_openInTab(url, selected);
}

function getCurrentEntry(){
    return document.getElementById('current-entry');
}

function selectCurrentEntry(el){
    if (el) {
        var cur = getCurrentEntry();
        if (cur) {
            delete cur.id;
        }
        el.id = 'current-entry';
    }
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
    var entries = get_id('entries');
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

function getWidthEntries(){
    var entries = get_id('entries');
    return entries.clientWidth;
}

function getHeightEntries(alone){
    var height = 500;
    var entries = get_id('entries');
    if (entries) {
        var offset = 0;
        if (!alone) {
            var eb = getFirstElementByClassName(entries, 'entry-body');
            if (eb) {
                offset += eb.offsetTop;
            }
            var ea = getFirstElementByClassName(entries, 'entry-actions');
            if (ea) {
                offset += ea.clientHeight;
            }
            offset = Math.max(110, offset);
        }
        height = parseInt(entries.style.height.replace('px', ''), 10) - offset;
    }
    return height;
}

function getBody(entry){
    var body = getFirstElementByClassName(entry, 'item-body');//div
    // why a sub body sometimes ??
    if (body) {
        var subbody = getFirstElementByClassName(body, 'item-body');//div
        if (subbody) {
            body = subbody;
        }
    } else {
        //get Snippet in list view
        body = getFirstElementByClassName(entry, 'snippet');
    }
    return body;
}

function getEntryBody(body){
    var entryBody = getFirstElementByClassName(body, 'entry-enclosure');//div
    if (!entryBody) {
        entryBody = getFirstElementByClassName(body, 'item-body');//div
    }
    return entryBody;
}

function initResize(fn){
    window.addEventListener('resize', function(e){
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
    var btn = getFirstElementByClassName(entry, cls);//'span'
    fn.call(this, btn, entry);
}

function addBottomLink(el, text, title, script, cls, button, callback, locked, entry, mode){
    var span = document.createElement('span');
    span.className = 'btn-' + script + ' ' + cls + (button ? ' read-state-not-kept-unread read-state' : '') + ' link unselectable';
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
        if (callback) {
            callback(span, entry, true);
        }
    }
}

function isActive(btn, entry, cls, locked){
    var active = false;
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

function isTagged(entry, cls){
    var tagged = entry.getAttribute(cls);
    if (!tagged) {
        entry.setAttribute(cls, 'true');
    }
    return tagged;
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
	if (keyhash && typeof keyhash === 'object' && keyhash.key) {
		key = keyhash.key;
	}else if (keyhash && typeof keyhash === 'string') {
		key = unmarshallKey(keyhash);
    } else {
        try {
            var s = getScriptObject(script);
            key = s.shortcuts[shortcut];
        } catch (e) {
            console.error("Failed to get default shortcut " + shortcut + " for script " + script);
        }
    }
    return key;
}

function getScriptObject(id){
    return GRP.scripts[id];
}

function toggle(el){
    if (!el.style.display) {
        hide(el);
    } else {
        show(el);
    }
}

function createMenu(items){
    var menu = document.createElement('div');
    menu.className = "goog-menu goog-menu-vertical";
    menu.style = "-moz-user-select: none; left: 228px; top: 20.1px; max-height: 300px;";
    menu.role = "menu";
    //menu['aria-haspopup']=true;
    menu.tabindex = -1;
    menu.id = "stream-prefs-menu-menu";
    addMenuItems(menu, items);
}

function addMenuItems(menu, items){
    var item, i, len, html = '';
    var tplInner = '<div class="goog-menuitem-content"><div class="goog-menuitem-checkbox"></div>{text}</div>';
    for (i = 0, len = items.length; i < len; i++) {
        item = items[i];
        var el = document.createElement('div');
        addClass(el, 'goog-menuitem goog-option ' + ((item.selected) ? 'goog-option-selected' : ''));
        el.role = "menuitem";
        el.style = "-moz-user-select: none;";
        el.id = ':grp' + i;
        el.innerHTML = fillTpl(tplInner, item);
        var callback = function(){
            item.fn.call(el, [item, el]);
        };
        el.addEventListener('click', callback, false);
    }
}

function addReaderMenuItem(text, cb, checkbox){
    var html = text;
    GM_addStyle('.grp-menu{background: transparent url(/reader/ui/3607832474-entry-action-icons.png) no-repeat;padding: 1px 8px 1px 16px;}' +
    '.grp-menu-checked{background-position:-80px -160px;}' +
    '.grp-menu-unchecked{background-position:-64px -128px;}', 'grp_menusettings');
    
    if (checkbox) {
        html = '<span class="grp-menu grp-menu-unchecked">' + text + '</span>';
    }
    
    dh('gbg', 'a', {
        href: '#',
        cls: 'gb2',
        html: html
    }, {
        click: function(e){
            if (checkbox) {
                var span = e.target;
                addClassIf(span, 'grp-menu-checked', 'grp-menu-unchecked');
            }
            cb(e);
        }
    });
}

function toggleCheckMenu(el){
    addClassIf(el, 'goog-option-selected');
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

function getSelectedDir(node){
    var o = {
        url: ''
    };
    //a.tree-link-selected
    var el = node || getFirstElementByClassName(document, 'tree-link-selected');
    if (el) {
        o = {
            text: getElementText(el, 'name-text'),
            count: getElementText(el, 'unread-count').replace(/[\(\)]/g, ''),
            url: el.href
        };
    } else {
        //div.selector.selected
        el = getFirstElementByClassName(document, 'selected');
        if (el) {
            o = {
                text: getElementText(el, 'text', false, true),
                count: getElementText(el, 'unread-count').replace(/[\(\)]/g, ''),
                url: el.href
            };
        }
    }
	if (o.url && /\/reader\/view\/feed\//.test(o.url)) {
		o.url = decodeURIComponent(o.url.replace(/.*\/reader\/view\/feed\//, ''));
	}
    return o;
}

function getMetadata(){
    var s = document.head.getElementsByTagName('script')[0];
    var c = s.innerHTML;
    var m, re = /([_A-Z]+)\s+=\s+([^,]+),/g;
    var metadata = {};
    while ((m = re.exec(c)) !== null) {
        metadata[m[1]] = m[2].replace(/^"|"$/g, '');
    }
    return metadata;
}


/*
 * Various useful methods
 */
function sublime_update(){
    //hide searh
    var s = get_id('search');
    hide(s);
    s.addEventListener('click', function(e){
        e.stopPropagation();
    }, false);
    //new search
    dh(false, 'searchicon', {
        id: 'searchicon',
        html: 'SEARCH'
    }, {
        click: function(){
            toggle(s);
        }
    });
}

function showallfolders(){
    var saf = 'grp_showallfolders';
    var elsaf = get_id(saf);
    if (elsaf) {
        remove(elsaf);
    } else {
        GM_addStyle('.folder li{display:block !important;}', saf);
    }
}

function removeReadItems(ent, deleteMarkAsRead){
    var currentry = ent || getCurrentEntry();
	
	if (deleteMarkAsRead) {
		var entries = get_id('entries');
		var items = entries.getElementsByClassName('read');
		foreach(items, function(item){
			if (item && currentry !== item) {
				console.log('remove ' + item.className);
				remove(item);
			}
		});
	} else {
		entry = currentry.previousSibling;
		while (entry) {
			var prev = entry.previousSibling;
			console.log('Remove ' + entry.className)
			remove(entry);
			entry = prev;
		}
	}
	setTimeout(function(){
    	jump(currentry, true);
	},200);
}

function markallasread(entry, since){
        console.log('entry: ' + entry.className);
        var url, text;
        var a = getFirstElementByClassName(entry, 'entry-source-title');//a
        if (a) {
            console.log('entry-source-title: ' + a.href);
            url = 'feed/' + (decodeURIComponent(a.href).replace(/.*?\/feed\//, ''));
            //url = 'feed/' + (a.href.replace(/.*?\/feed\//, ''));
            text = a.innerText;
        } else {
            //No link found -> get from nav
            var d = getSelectedDir();
            text = d.text;
        }
        var domain = getDomain(window.location.href, true);
        var metadata = getMetadata();
        console.log('_COMMAND_TOKEN: ' + metadata._COMMAND_TOKEN);
        console.log('url: ' + url);
        console.log('text: ' + text);
        console.log('domain: ' + domain);
        var params = {
            T: metadata._COMMAND_TOKEN,
            s: url,
            t: text,
            ts: 1000 * (new Date()).getTime() + 999 //since
        };
        var urlpost = domain + '/reader/api/0/mark-all-as-read';
        console.log('url: ' + urlpost);
        console.log('params: ' + JSON.stringify(params));
        GM_xmlhttpRequest({
            method: 'post',
			injected:true,
            headers: {
                Origin: domain,
                Referer: domain + '/reader/view/'
            },
            url: urlpost,
            parameters: params,
            onload: function(r){
				if (r.status == 200 && r.responsText === 'OK') {
                    console.log('Mark all as read done');
                } else {
                    console.error(r);
                    alert(r.status + ':' + r.statusText);
                }
            },
            onerror: function(r){
                console.error(r);
                alert(r.status + ':' + r.statusText);
            }
        });
    }