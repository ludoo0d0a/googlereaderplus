/*
 * Entries
 */
var stackFeatures = [], externals = [], events = {};

var ELS = {};
fillElements();
function fillElements(){
	ELS.entries = get_id('entries');
	ELS.ss = get_id('scrollable-sections');
	ELS.vec=get_id('viewer-entries-container');
	ELS.tsh=get_id('title-and-status-holder');
	ELS.tb=get_id('top-bar');
	ELS.gb=get_id('gb');
	ELS.las=get_id('lhn-add-subscription-section');
	ELS.vhc=get_id('viewer-header-container');
	ELS.tsh=get_id('title-and-status-holder');
}

function getConfig(prefs, ID, params){
	var cfg = {};
	foreach(params,function(p){
		cfg[p]=prefs[ID+'_'+p];
	});
	return cfg;
}

function registerEvent(id, key, fn, args){
	events[id]=events[id]||{};
	events[id][key] = {
		fn: fn,
		args: args
	};
}
function fireEvent(id, key){
	if (events[id]){
		var e=events[id][key];
		if (e){
			e.fn.call(this, e.args);
		}
	}
}
	
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


function monitorEntries(el){
    var root = el || ELS.entries;
    root.addEventListener('DOMNodeInserted', function(e){
        checkEntry(e.target);
    }, false);
    catchAllEntries();
    loadExternal(function(){
        catchAllEntries();
    });
}

function checkEntry(el, params, mode){
    var entry,ea=false;
    if (el.tagName === 'DIV') {
//        console.log('-- div.' + el.className);
        if (hasClass(el, 'entry')) {
            entry=el;
            var entryContent = (entry.hasChildNodes());
            if (entryContent){
            	ea = gfe(entry, 'entry-actions');
	            //ExpandedView
	            catchEntry(entry, ea, params, mode);
            }
        } else if (hasClass(el, 'entry-actions')) {
            // *********** Expand article in ExpandedView in ListView
            ea = el;
            entry = findParentNode(ea, 'div', 'entry');
            //console.log("+entry-actions on " + entry.className);
            catchEntry(entry, ea, params, mode, true);
        }
    }
}

function catchEntry(entry, ea, params, mode, body){
    mode = mode || getMode();
    execAll(ea, entry, mode, body);
}

var lockTimeout=false;
function execAll(ea, entry, mode, body){
    //if (!lockTimeout){
	    lockTimeout = window.setTimeout(function(){
	        //lockTimeout=false;
	        execAllOffset(ea, entry, mode, body);
	    }, 100);
    //}
}

function execAllOffset(ea, entry, mode, body){
    for (var i = 0, len = stackFeatures.length; i < len; i++) {
        var p = stackFeatures[i].params || {};
		//console.log('p.bid='+p.bid);
		if (p.onlistviewtitle){
			w = entry.firstChild;
		}else{
			w = gfe(entry,'entry-container');
		}
		if(!isTagged(w, p.bid)) {
			stackFeatures[i].fn.call(this, ea, entry, mode, body);
		}
    }
}


var _currentEntry=false;
function monitorCurrentEntry(cb, time){
	setInterval(function(){
		var ce = getCurrentEntry();
		if (_currentEntry !== ce){
			cb(ce, _currentEntry);
			_currentEntry=ce;
		}
	},time||2000);
}

function filterEntry(entry, rx){
    var o = getEntryLink(entry);
    return (rx && (rx.test(o.url) || (o.feed && rx.test(o.feed))));
}

function getRegex(urls){
    if (!urls || urls.length === 0) {
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
    var root = ELS.entries;
    var entries = root.getElementsByClassName('entry');
    for (var i = 0; i < entries.length; i++) {
        fn.call(this, entries[i]);
    }
}

function catchAllEntries(params){
    var mode = getMode();
    forAllEntries(function(entry){
        checkEntry(entry, params, mode);
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

function getMode(){
    //list cards
    var entries = ELS.entries;
    if (entries){
    	return hasClass(entries, 'list') ? 'list' : 'expanded';
	}else{
        var btns = getElements('#stream-view-options-container .jfk-button');
        return hasClass(btns[1], 'jfk-button-checked') ? 'expanded' : 'list';
   }
}

function getOriginalEntryLink(entry){
    return gfe(entry, 'entry-title-link');
}

function getEntrySiteTitle(ent){
    var entry = ent || getCurrentEntry();
    var point, match;
    point = gfe(entry, 'entry-source-title');//'span'
    if (point) {
        match = point.textContent;
    }
    return match;
}

function insertOnTitle(entry, el, mode){
    if (!mode){
		mode=getMode();
	}
    if (mode === 'expanded') {
        var et = gfe(entry, 'entry-title');
        insertFirst(el, et);
    } else {
        var ei = gfe(entry, 'entry-icons');
        insertLast(el, ei);
    }
}

function insertOnTitleStart(entry, el){
   var et = gfe(entry, 'entry-title');
   insertFirst(el, et); 
}

function getEntryLink(ent, useFeed){
    //<a class="ilink entry-title-link" href="#" title="Open as preview [q]"> Il écope de 5 ans</a>
    //<a class="entry-title-link iframe title-link-url" target="_blank" href="http://www.lessentiel.lu/news/monde/story/17066269" title="Open in a new window"><div class="entry-title-maximize"></div></a>	
    var o = {
        feed: '',
        title:''
    }, entry = ent || getCurrentEntry();
    var link = gfe(entry, 'grp-link-url');//'a'
    if (!link) {
        //Normal way
        link = gfe(entry, 'entry-title-link');//'a'
        if (link) {
            o.url = link.href;
            o.link = link;
            o.title = link.textContent;
            o.eltitle = link;
        } else {
			//Feed from html (non RSS page)
			var etitle = gfe(entry, 'entry-title');//'h2'
			link = gfe(entry, 'entry-original');//'a'
			if (etitle) {
				o.url = '';
				o.title = etitle.textContent;
				o.eltitle = etitle;
				if (link) {
					//list view
					o.url = link.href;
		            o.link = link;
				}else{
					var m = /"(.*)"/.exec(etitle.textContent);
					if (m) {
						o.url = m[0];
					}
					o.link = null;
				}
			}
        }
    } else {
        //preview on 
        var link2 = gfe(entry, 'grp-link-title');//'a'
        o = {
            title: link2.textContent,
            eltitle: link2,
            url: link.href,
            link: link
        };
    }
    //
    if (useFeed){
    	o.feed = getFeedEntry(entry);
    }
    return o;
}

function getFeedEntry(entry){
    var url;
    var est = gfe(entry, 'entry-source-title');//'a'
    //TODO/ listview=span but no href (could we use text label to match in nav tree?)
    if (est && est.href) {
        url = decodeURIComponent(est.href.replace(/^.*?view\/feed\//, ''));
        if (!url) {
            //Find using current selected nav item 
            var nav = get_id('nav'), tls = gfe(nav, 'tree-link-selected');//'a'
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
    var el = document.getElementById('current-entry');
	if (!el){
		el = ELS.entries.firstChild;
	}
	return el;
}

function getEntryPosition(ent){
	var pos=false, entry = ent || getCurrentEntry();
	var m = /\bentry\-(\d+)\b/.exec(entry.className);
	if (m && m[1]){
		pos = parseInt(m[1],10);
	}
	return pos;
}

function selectCurrentEntry(el, markread, fixScroll, force){
	if (el && el.id !== 'current-entry' && hasClass(el, 'entry')) {
		var st = ELS.vec.scrollTop;
		var cur = getCurrentEntry();
		if (cur) {
			cur.removeAttribute('id');
		}
		el.id = 'current-entry';
		if (markread) {
			markasread(el, false, force);
		}
		if (fixScroll){
			ELS.vec.scrollTop=st;
		}
		return expandEntry(el);
	}
}
function selectNextEntry(force){
	return selectSiblingEntry(true, force);
}
function selectPreviousEntry(force){
	return selectSiblingEntry(false, force);
}
		
function selectSiblingEntry(dir, force){
	var next, cur = getCurrentEntry();
	if (cur){
		next = (dir)?cur.nextSibling:cur.previousSibling;
		if (next) {
			return selectCurrentEntry(next, true, false, force);
		}
	}
	return false;
}
	
function detectNavHidden(cb){
	function isHidden(){
		return hasClass(document.body, 'lhn-hidden');
	}
	var status=isHidden();
	setInterval(function(){
		//change?
		var t = isHidden();
		if (t!==status){
			status=t;
			cb(status);
		}
	},1000);
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
    var top = 0;
    if (dirtop) {
        top = entry.offsetTop; // - height;
    } else {
        top = entry.offsetTop + entry.offsetHeight - getHeightEntries();
    }
    if (top >= 0) {
        ELS.vec.scrollTop = top;
    }
}

function fireResize(value, time){
	value=value||'';
	time=time||0;
	var lhnfooter = (value=='footer');
	setTimeout(function(){
		_fireResize(lhnfooter, time);
	}, time);
}

function _fireResize(lhnfooter){
    //scrollable-sections = lhn-add-subscription-section.height + top-bar.height + gb.height
    var hl = getVisibleHeight(ELS.las)+getVisibleHeight(ELS.tb)+getVisibleHeight(ELS.gb);
    fitHeight(ELS.ss, hl);
    //viewer-entries-container = viewer-header-container.height + top-bar.height + gb.height
    var hr = getVisibleHeight(ELS.vhc)+getVisibleHeight(ELS.tb)+getVisibleHeight(ELS.gb);
    fitHeight(ELS.vec, hr);
}
var headerOffset = 0;
function getMaxBodyHeight(){
	//vec-tsh
	var offset=60, h = getVisibleHeight(ELS.vec);
	if (!headerOffset){
		var entry = getCurrentEntry();
		var eti = gfe(entry, 'entry-title'), //22px
		eau = gfe(entry, 'entry-author') //16px
		ean = gfe(entry, 'entry-annotations');
		eca = gfe(entry, 'card-actions');//30px
		//ELS.tsh?
		headerOffset = getVisibleHeight(eti) + getVisibleHeight(eau) + getVisibleHeight(ean)+ getVisibleHeight(eca);
	}
	return h - offset - headerOffset; 
}
var getHeightEntries=getMaxBodyHeight;

function getWidthEntries(){
    return ELS.entries.clientWidth;
}

function getBody(entry){
    var body = gfe(entry, 'item-body');//div
    // why a sub body sometimes ??
    if (body) {
        var subbody = gfe(body, 'item-body');//div
        if (subbody) {
            body = subbody;
        }
    } else {
        //get Snippet in list view
        body = gfe(entry, 'snippet');
    }
    return body;
}

function getEntryBody(body){
    var entryBody = gfe(body, 'entry-enclosure');//div
    if (!entryBody) {
        entryBody = gfe(body, 'item-body');//div
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
var countbtn=0;
function addSplitButton(id, reference, text, title, fn, fnmenu, position, items, cfg){
	var menu,c=countbtn++, split = dh(reference, 'div', {
		id:id||'split-button'+c, 
		position:position
	});
	cfg=cfg||{};
	var btn = addButton(split, text, title, fn, 0,false);
	btn.style.marginRight = '-2px';
	addClass(btn, 'goog-menu-button');//use it as menu to get gray on highlight
	
	var dwn = addButton(split, '&nbsp;', '', function(){
		toggleMenu(menu,dwn,btn,null,false,fnmenu);
	}, 0,true);
	
	menu=createMenu(':rpjm'+c, items, dwn, cfg.autoclose);
	
	return btn;
}

function hideMenu(menu,dwn){
	toggleMenu(menu,dwn,false,false);
}
function showMenu(menu,dwn,btn){
	toggleMenu(menu,dwn,btn,true);
}

function toggleMenu(menu,dwn,btn,visible,init,fnmenu){
	if (menu) {
		if ((typeof visible === 'undefined') || (visible === null)){
			visible = !hasClass(dwn, 'goog-button-base-open');
		}
		if (init && (typeof init ==='function')){
			init(visible);
		}
		
		showas(menu,!visible);
		if (menu.dwn) {
			removeClass(menu.dwn,'goog-button-base-open');
		}
		removeClass(dwn,'goog-flat-menu-button-open');
		addClassIf(dwn, 'goog-button-base-open', visible);
		if (visible) {
			//set pos
			menu.style.top = (findTop(dwn) + dwn.offsetHeight) + 'px';
			var left = Math.max(0,Math.min(findLeft(btn || dwn), window.innerWidth-250));
			menu.style.left = left + 'px';
			menu.dwn = dwn;
		}else{
			menu.dwn = false;
		}
		if (fnmenu) {
			menu.fnmenu = fnmenu;
		}
		
		if (menu.autoclose){
			if (!menu.clickElseWhere) {
				//console.log('create menu.clickElseWhere');
				menu.clickElseWhere = function(e){
					//console.log('clickElseWhere...');
					if (e.button === 0) {
						var fm = findParentNode(e.target, false, false, menu.id);
						//var fd = findParentNode(e.target, false, false, dwn.id);
						//console.log('clickElseWhere parent:' + f);
						if (menu && !fm) {
							//console.log('clickElseWhere hideMenu');
							hideMenu(menu, dwn);
							if (menu.fnmenu){
								menu.fnmenu(menu);
							}
							e.stopPropagation();
						}
					}
				};
			}
			if (visible) {
				document.addEventListener('click', menu.clickElseWhere, true);
			}else{
				document.removeEventListener('click', menu.clickElseWhere, true);
			}
		}
	}
}

function createMenu(id, items, dwn, autoclose){
    var menu = dh(document.body, 'div', {
		id:id,
		cls:'goog-menu goog-menu-vertical',
		style:"-webkit-user-select: none; visibility: visible; display: none;",
		role:"menu",
		tabindex:-1
	});
	menu.autoclose=autoclose;
    
	var iitem=1;
	foreach(items,function(item){
		if (item.text) {
			addMenuItem(menu, dwn, iitem++, item);
		}else{
			addMenuSeparator(menu, dwn, iitem++);
		}
	});
	
	hideMenu(menu,dwn);
	
	return menu;
}

function addMenuSeparator(menu, dwn, id, text){
	dh(menu, 'div', {
		id:menu.id+'_ev'+id,
		cls:'goog-menuseparator',
		style:"-webkit-user-select: none;",
		role:"separator"
	});
}

function addMenuItem(menu, dwn, id, item){
	var html=item.text, chkbox = item.checkbox, _close = item.close;
	var cls = '';
	if (item.textarea){
		cls += ' goog-textarea';
		if (typeof item.value ==='object'){
			item.value=item.value.join('\n');
		}
		html+='<br/><textarea id="t_'+(item.id||id)+'" rows="'+(item.rows||5)+'" cols="'+(item.cols||25)+'">'+(item.value||'')+'</textarea>';
	}
	if (chkbox && item.value){
		cls += ' goog-option-selected';
	}
	var el = dh(menu, 'div', {
		id:item.id||(menu.id+'_'+id),
		cls:'goog-menuitem goog-option'+cls,
		style:"-webkit-user-select: none;",
		role:"menuitem",
		tabindex:-1, 
		html:'<div class="goog-menuitem-content"><div class="goog-menuitem-checkbox"></div>'+html+'</div></div>'
	},{
		mouseover:function(e){
			addClass(el, 'goog-menuitem-highlight');
		},
		mouseout:function(){
			removeClass(el, 'goog-menuitem-highlight');
		},
		click:function(){
			if (chkbox){
				if (item.group) {
					//Remove checkbox on all previous group items
					foreach(menu.groups[item.group], function(m){
						if (m !== el) {
							removeClass(m, 'goog-option-selected');
						}
					});
				}
				addClassIf(el, 'goog-option-selected');
			}
			if (_close){
				removeClass(el, 'goog-menuitem-highlight');
				removeClass(dwn, 'goog-menuitem-highlight');
				hideMenu(menu,dwn);
			}
			if (item.click){
				fwdClick();
			}
		}
	});
	
	if (item.group) {
		//Save groups
		menu.groups = menu.groups || {};
		menu.groups[item.group]=menu.groups[item.group]||[];
		menu.groups[item.group].push(el);
	}
			
	function fwdClick(){
		var sel = hasClass(el, 'goog-option-selected');
		item.click(el, menu, id, sel, item);
	}
}

	
function addButton(reference, text, title, fn, position, menu){
    position = position || 0;
    var div = document.createElement('div');
	var styleBaseContent = '';
	if (menu) {
		styleBaseContent=' style="padding:0 .95em 0 0;"';
	}else{
		div.style.marginLeft = '0.5em';
	}
    var cls  = 'goog-button goog-button-base unselectable goog-inline-block goog-button-float-left goog-button-tight';
	var dropdown = '';
	if (menu){
		cls+=' goog-menu-button';
		dropdown = '<div class="goog-menu-button-dropdown"></div>';
	}
	div.className = cls;
    div.setAttribute('tabindex', '0');
    if (title) {
        div.setAttribute('title', title);
    }
    div.setAttribute('role', 'wairole:button');
	
	
    div.innerHTML = '<div class="goog-button-base-outer-box goog-inline-block"><div class="goog-button-base-inner-box goog-inline-block"><div class="goog-button-base-pos"><div class="goog-button-base-content" '+styleBaseContent+'><div class="goog-button-body">' + text + '</div>'+dropdown+'</div></div></div></div>';
    insertOn(div, reference, position);
    var me = this;
    div.addEventListener('click', function(e){
		fn.call(me);
    }, false);
	return div;
}

function addIcon(entry, title, fn, cls, clsExtra, position){
	var el=false, elicons = gfe(entry, 'entry-icons');
	if (elicons) {
		el = gfe(entry, cls);
		if (!el){
			var acls = [cls];
			if (clsExtra){
				acls.push(clsExtra);
			}
			var events=false, me=this, wcls = acls.join(' ')|| 'section-button section-menubutton';
			if (fn) {
				events = {
					click:function(e){
						e.stopPropagation();
						fn.call(me, entry, el);
					}
				};
			}
			el = dh(elicons, 'div', {
				cls:wcls,
				title:title,
				position:position||'last'
			}, events);
		}
	}
	return el;
}

function onKey(cls, fn){
    var entry = getCurrentEntry();
    var btn = gfe(entry, cls);//'span'
    fn.call(this, btn, entry);
}

function addBottomLink(el, text, title, script, cls, button, callback, locked, entry, mode, position){
    var _locked = locked, _entry = entry;
    if (!el){
    	el = gfe(entry, 'entry-actions');
    }
    if (el){
	    var span = document.createElement('span');
	    span.className = 'grp-btn btn-' + script + ' ' + cls + (button ? ' read-state-not-kept-unread read-state' : '') + ' link unselectable';
	    span.innerHTML = text;
	    span.title = title;
		insertOn(span, el, position);
		//+wbr before span
		insertBefore(document.createElement('wbr'), span);
			
	    function onClick(e){
	        var btn = e.target;
	        //var entry = findParentNode(el, 'div', 'entry');
	        callback(btn, _entry, _locked, e);
	    }
	    span.addEventListener('click', onClick, false);
    }
    if (locked) {
        //activate it
        if (callback) {
            callback(span, entry, true);
        }
    }
    return span;
}

function isActive(btn, entry, cls, locked, clsOn, clsOff){
    var active = false;
	clsOn=clsOn||'read-state-kept-unread';
	clsOff=clsOff||'read-state-not-kept-unread';
    if (locked || !hasClass(btn, clsOn)) {
        addClass(entry, cls);
        if (btn) {
            toggleClass(btn, clsOff, clsOn);
        }
        active = true;
    } else {
        removeClass(entry, cls);
        if (btn) {
            toggleClass(btn, clsOn, clsOff);
        }
        active = false;
    }
    return active;
}

function isTagged(el, id){
   //Tag on entry-container
   var tagged = false;
   if (el){
    	var cls='grpt-'+id;
    	tagged=hasClass(el,cls);
	    if (!tagged) {
	        addClass(el,cls);
	    }
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
			if (s && s.shortcuts) {
				key = s.shortcuts[shortcut];
			}
        } catch (e) {
            console.error("Failed to get default shortcut " + shortcut + " for script " + script);
        }
    }
    return key;
}

function getScriptObject(id){
    return GRP.scripts[id];
}

function getReaderMenu(){
	var menu=get_id('settings-button-menu');
	if (!menu){
		//Reader Play
		menu=getFirstElementByClassName(document.body, 'goog-menu');
	}
	return menu;
}

function addReaderMenuSeparator(){
	var menu=getReaderMenu();
	dh(menu, 'div', {
		cls:'goog-menuseparator',
		role:'separator'
	});
}
function addReaderMenuItem(text, cb, checkbox){
    var clsOption='';
	if (checkbox) {
	      clsOption=' goog-option';
	}
	var html = '<div class="goog-menuitem-content">' + text + '</div>';

	var menu=getReaderMenu();
    var el = dh(menu, 'div', {
        href: '#',
        cls: 'goog-menuitem'+clsOption,
        role:'menuitem',
        html: html
    }, {
        click: function(e){
            if (checkbox) {
                addClassIf(el, 'goog-option-selected', 'goog-option-unselected');
            }
            cb(e);
        },
        mouseover:function(e){
			addClass(el, 'goog-menuitem-highlight');
		},
		mouseout:function(){
			removeClass(el, 'goog-menuitem-highlight');
		},
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
    var el = node || gfe(document, 'tree-link-selected');
    if (el) {
        o = {
            text: getElementText(el, 'name-text'),
            count: getElementText(el, 'unread-count').replace(/[\(\)]/g, ''),
            url: el.href
        };
    } else {
        //div.selector.selected
        el = gfe(document, 'selected');
        if (el) {
            o = {
                text: getElementText(el, 'text', false, true),
                count: getElementText(el, 'unread-count').replace(/[\(\)]/g, ''),
                url: el.href
            };
        }
    }
	if (o.url && (/\/reader\/view\/feed\//.test(o.url))) {
		o.url = decodeURIComponent(o.url.replace(/.*\/reader\/view\/feed\//, ''));
	}
	o.count = o.count || 0;
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

function showallfolders(){
    var saf = 'rpe_showallfolders';
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
		var items = ELS.entries.getElementsByClassName('read');
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
			console.log('Remove ' + entry.className);
			remove(entry);
			entry = prev;
		}
	}
	setTimeout(function(){
    	jump(currentry, true);
	},200);
}

function updateTags(entry, reTag, newTag){
	//Set tag
	var tags = getTags(entry);
	for (var i = 0, len = tags.length; i < len; i++) {
		if (reTag.test(tags[i])) {
			tags[i] = '';
		}
	}
	if (newTag) {
		tags.push(newTag);
	}
	tags = tags.join(',').replace(/^,+/, '').replace(/,+$/, '');
	setTags(entry, tags);
}

function setTags(entry, tags){
	//tags-edit
	addClass(entries, 'set-tag', true);
	var tim=0, te = gfe(entries, 'tags-edit');
	if (!te){
		var opentags = gfe(entry, 'entry-tagging-action-title');
		simulateClick(opentags);
		tim=500;
	}
	setTimeout(function(){
		te = gfe(entries, 'tags-edit');
		if (te) {
			var txttags = gfe(te, 'tags-edit-tags');
			if (txttags) {
				txttags.value = tags;
				var tok = gfe(entries, 'tags-edit-save');
				simulateClick(tok);
				removeClass(entries, 'set-tag');
			}
		}else{
			removeClass(entries, 'set-tag');
		}
	},tim);
}

function markAsStar(entry, status){
	var ei = gfe(entry,'entry-icons');
	var is = gfe(ei,'star');
	var isStarred = hasClass(is, 'item-star-active');
	if ((typeof status === 'undefined' && isStarred) || (status !== isStarred)) {
		var hidden = (is.style && is.style.display=='none');
		if (hidden){
			show(is);
		}
		simulateClick(is);
		if (hidden){
			hide(is);
		}
	}
}

function isStarred(entry){
	var esa=false, ei = gfe(entry, 'entry-icons');
	if (ei) {
		esa = gfe(ei, 'item-star-active');
	}
	return !!esa;
}

function markasread(entry, passive, force, dbl){
	//already read
	if (!force && hasClass(entry,'read')){
		return;
	}

	if (passive){
		console.log('mark as read PASSIVE '+ entry.className);
		if (!hasClass(entry,'grp-marp')){
			addClass(entry,'grp-marp');
			//click 1
			clickEntry(entry);
			//click 2
			var id = entry.className;
			setTimeout(function(){
				//Collapse entry if not current entry
				if (entry.id!=='current-entry'){
					collapseEntry(entry);
				}
				removeClass(entry,'grp-marp');
			},2500);
		}
	}else{
		clickEntry(entry, dbl);
	}
}
function clickEntry(entry, dbl){
	var ce = gfe(entry, 'collapsed') || entry;
	simulateClick(ce, false, true);
}
function expandEntry(entry){
	var ec = gfe(entry, 'entry-container');
	if (!ec){
		clickEntry(entry);
		return true;
	}
	return false;
}
function collapseEntry(entry){
	var ec = gfe(entry, 'entry-container');
	if (ec){
		clickEntry(entry);
	}
}

//@deprecated
function markallasread(entry, since){
        console.log('entry: ' + entry.className);
        var url, text;
        var a = gfe(entry, 'entry-source-title');//a
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
function getTagsText(entry, normalize, defaultlabel, sep){
	sep=sep||', ';
	var tags = getTags(entry, normalize, defaultlabel)||[];
	return tags.join(sep);
}
function getTags(entry, normalize, defaultlabel){
    var lbls = [], taglist = gfe(entry, "user-tags-list");
	if (taglist) {
		var ins = taglist.getElementsByTagName("li");
		
		if (defaultlabel) {
			lbls.push(defaultlabel);
		}
		foreach(ins, function(o){
			var lbl = o.getElementsByTagName("a")[0].text;
			if (normalize) {
				lbl = lbl.replace(/-/g, ' ');
				lbl = lbl.toLowerCase().replace(/^(.)|\s(.)/g, function($1){
					return $1.toUpperCase();
				});
			}
			lbls.push(lbl);
		});
	}
    return lbls;
}

function getEntryNumber(entry,def){
	var v=def||0, m = /entry\-(\d+)/.exec(entry.className);
	if (m) {
		v=parseInt(m[1], 10);
	}
	return v;
}
	
function addCssIcon(id, clsOn){
	clsOn=clsOn || 'btn-active';
	var css = '.entry .entry-actions .btn-'+id+'{background: url(\'http://googlereaderplus.googlecode.com/svn/trunk/GoogleReaderPlus/images/share/'+id+'.png\') no-repeat !important;padding:0px 8px 0px 20px !important;margin-right: 4px;}'+
	'.entry .entry-actions .btn-'+id+'{background-position: 0 0px !important;}'+
	'.entry .entry-actions .btn-'+id+'.'+clsOn+'{background-position: 0 -16px !important;}';
	GM_addStyle(css, 'rpe_share_'+id);
}

function showSplash(msg, tim, defer){
	setTimeout(function(){
		var prevText='', lac = get_id('loading-area-container'), la = get_id('loading-area');
		if (lac && la && msg){
			prevText=la.innerHTML;
			la.innerHTML=msg;
			removeClass(lac, 'hidden');
			setTimeout(function(){
				if (la.innerHTML==msg){
					//Restore and hide, if still my text
					la.innerHTML=prevText;
				}
				addClass(lac, 'hidden');
			},tim||2000);
		}
	},defer||5000);
}

function getEntryPosition(entry){
	var index=false, m = /entry-(\d+)/.exec(entry.className || '');
    if (m && m[1]) {
		index = parseInt(m[1], 10);
	}
	return index;
}