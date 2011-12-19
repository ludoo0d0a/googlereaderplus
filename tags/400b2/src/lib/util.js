//
// Global util functions
//

function hasClass(el, clazz){
    if (!el || !el.classList) {
        return false;
    }
    //TODO: use el.classList.contains
    return (el.classList.contains(clazz));
    /*
    var reClassname = new RegExp("(^|\\s)" + encodeRE(clazz) + "(\\s|$)");
    return (reClassname.test(el.className));*/
}
		
function addClass(el, clazz, checked){
	var classes = clazz;
	if (typeof classes === 'string'){
		classes=classes.split(' ');
	}
	if (isArray(classes) ){
		var len = classes.length;
		if (len==1){
			_addClass(el, classes[0], checked);
		}else if(len>1){
			foreach(classes,function(c){
				_addClass(el, c, checked);
			});
		}
	}
}
function _addClass(el, clazz, checked){
    if (checked && hasClass(el, clazz)) {
        return;
    }
    if (el && clazz) {
		//TODO: use el.classList
		//el.className = (el.className || '') + ' ' + clazz;
		if (!el.classList){
			el.classList={};
		}
		el.classList.add(clazz);
    }
}

function addClassChecked(el, clazz){
    addClass(el, clazz, true);
}

function addClassIf(el, cls, status, cls2){
    if (typeof status === 'string') {
        cls2 = status;
        status = null;
    }
    if (typeof status === 'undefined' || status === null) {
        status = !hasClass(el, cls);
    }
    if (status) {
        addClass(el, cls, true);
        if (cls2) {
            removeClass(el, cls2);
        }
    } else {
        removeClass(el, cls);
        if (cls2) {
            addClass(el, cls2);
        }
    }
}
function getAttr(el, name){
	var attr = el.attributes.getNamedItem(attr);
	return (attr)?attr.value:false;
}
function addAttr(el, name, value){
    var attr = document.createAttribute(name);
    attr.value = value;
    el.attributes.setNamedItem(attr);
}
function findParentNode(eel, etag, clazz, id){
	return findAncestor(eel.parentNode, etag, clazz, id);
}
function findAncestor(el, etag, clazz, id){
    var TAG_ROOT = '#document'; //'BODY'
    var tag = (etag||'').toUpperCase();
    if (clazz && etag) {
	    //class+tag 
		while (el && el.nodeName !== TAG_ROOT && (el.nodeName !== tag || !hasClass(el, clazz))) {
            el = el.parentNode;
        }
    } else if (clazz) {
        //class only
		while (el && el.nodeName !== TAG_ROOT && (!hasClass(el, clazz))) {
            el = el.parentNode;
        }
    } else if (id) {
        //id only
		while (el && el.nodeName !== TAG_ROOT && (el.id !== id)) {
            el = el.parentNode;
        }
    }else if (etag) {
		//tag only
		while (el && el.nodeName !== TAG_ROOT && (el.nodeName !== tag)) {
            el = el.parentNode;
        }
    }
    return ((el && el.nodeName !== TAG_ROOT) ? el : false);
}
/*
var reCssQuery = /[#\.]?[\w\d_-]+/g;
function findNodes(root, query){
	el = el || document;
	var els=[], segs = query.split(' ');
	foreach(segs,function(seg){
		var e, m = reCssQuery.exec(seg);
		if (m){
			var bid=[], bcls=[],btag=[];
			foreach(m,function(p){
				if (p.indexOf('#')===0){
					bid.push(p.replace(/^#/,''));
				}else if (p.indexOf('.')===0){
					bcls.push(p.replace(/^\./,''));
				}else{
					btag.push(p);
				}
			});
			
			foreach(bid,function(p){
				els = [el.getElementById(p)];
			});
			foreach(bcls,function(p){
				els = el.getElementsByClassName(p);
			});
			foreach(btag,function(p){
				els = el.getElementsByTagname(p);
			});
		}
	});
	return els;
}*/
function findFirstNode(root, query){
	var el=false, els = findNodes(root, query);
	if (els){
		el = els[0];
	}
	return el;
}
function getFirstNode(el){
    var o = el.firstChild;
    //if (typeof o == "HTMLDivElement"){
    if (o && o.nodeType == 1) {
        return o;
    }
    //
    //while(typeof o !== "undefined" && typeof o !== "HTMLDivElement"){
    while (typeof o !== "undefined" && o.nodeType !== 1) {
        o = o.nextSibling;
    }
    return o;
}
function getSibling(el, previous, index){
	/*var o=false, els = getSiblings(el, previous, index);
	if (els && els.length>0){
		o = els[els.length-1];
	}
	return o;*/
	var o = el,i=0;
	while (o && o.nodeType === 1) {
        o = (previous)?o.previousSibling:o.nextSibling;
		i++;
		if (index && i==index){
			return o;
		}
    }
	if (i===0){
		o=false;
	}
    return o;
	
}
function getSiblings(el, previous, index){
    var els=[], o = el,i=0;
	while (o && o.nodeType === 1) {
        o = (previous)?o.previousSibling:o.nextSibling;
		els.push(o);
		i++;
		if (index && i==index){
			return els;
		}
    }
    return els;
}

function getIndex(el){
    var pos = 0, o = el;
    while ((o = o.previousSibling)) {
        pos++;
    }
    return (pos + 1);
}

function getPos(obj){
    var output = {};
    var mytop = 0, myleft = 0;
    while (obj) {
        mytop += obj.offsetTop;
        myleft += obj.offsetLeft;
        obj = obj.offsetParent;
    }
    output.left = myleft;
    output.top = mytop;
    return output;
}

//native getElementsByClassName
function getFirstElementByClassName(root, clazz){
	var els = root.getElementsByClassName(clazz);
	if (els && els.length>0){
		return els[0];
	}else{
		return false;
	}
}

function getLastElementByClassName(root, clazz){
	var els = root.getElementsByClassName(clazz);
	if (els && els.length>0){
		return els[els.length-1];
	}else{
		return false;
	}
}

function getElementText(root, cls, html, firstchild){
    var txt = '', el = getFirstElementByClassName(root || document, cls);
    if (el) {
        if (firstchild) {
            el = el.firstChild;
        }
        if (html) {
            txt = el.innerHTML;
        } else {
            txt = el.innerText || el.textContent;
        }
    }
    return txt;
}

function copyAttributes(src, dest){
    var ats;
    if (src && dest && src.attributes && src.attributes.length > 0) {
        for (var i = 0, len = src.attributes.length; i < len; i++) {
            ats = src.attributes[i];
            addAttr(dest, ats.nodeName, ats.nodeValue);
        }
    }
}

/**
 *
 * @param {Object} root
 * @param {Object} tag
 * @param {Object} clazz
 * @deprecated use getFirstElementByClassName
 */
function getFirstElementMatchingClassName(root, tag, clazz){
    var elements = root.getElementsByTagName(tag);
    var i = 0;
    while (elements[i] && !hasClass(elements[i], clazz)) {
        i++;
    }
    return ((!elements[i]) ? null : (elements[i]));
}

function getLastElementMatchingClassName(root, tag, clazz){
    var elements = root.getElementsByTagName(tag);
    var i = elements.length, j = 0;
    while (i >= 0 && elements[i] && !hasClass(elements[i], clazz)) {
        i--;
    }
    return ((i < 0 || !elements[i]) ? null : (elements[i]));
}

function getElementsByClazzName(clazz, itag, ielm){
    var tag = itag || "*";
    var elm = ielm || document;
    var elements = (tag == "*" && elm.all) ? elm.all : elm.getElementsByTagName(tag);
    var returnElements = [];
    var current;
    var length = elements.length;
    for (var i = 0; i < length; i++) {
        current = elements[i];
        if (hasClass(current, clazz)) {
            returnElements.push(current);
        }
    }
    return returnElements;
}

function getEl(el){
	if(typeof el =='string'){
		 el = document.getElementById(el);
	}
	return el;
}

function getElements(xpath, context){
    var res = false, doc = (context) ? context.ownerDocument : document;
    try {
        var r = doc.evaluate(xpath, (context || doc), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        for (var i = 0, l = r.snapshotLength, res = new Array(l); i < l; i++) {
            res[i] = r.snapshotItem(i);
        }
    } catch (e) {
        console.error('xpath error : ' + xpath);
    }
    return res;
}

function serializeXml(nodes){
    var html = '';
    nodes.forEach(function(node){
        html += node.outerHTML;
    });
    return html;
}

/*
 * From jQuery
 */
function serializePost(a, traditional){
    function buildParams(prefix, obj){
        if (isArray(obj)) {
            iterate(obj, function(i, v){
                if (traditional || (/\[\]$/.test(prefix))) {
                    add(prefix, v);
                } else {
                    buildParams(prefix + "[" + (typeof v === "object" || isArray(v) ? i : "") + "]", v);
                }
            });
            
        } else if (!traditional && obj !== null && typeof obj === "object") {
            // Serialize object item.
            iterate(obj, function(k, v){
                buildParams(prefix + "[" + k + "]", v);
            });
            
        } else {
            // Serialize scalar item.
            add(prefix, obj);
        }
    }
    
    function add(key, value){
        // If value is a function, invoke it and return its value
        value = (typeof value === 'function') ? value() : value;
        s[s.length] = e(key) + "=" + e(value);
    }
	
    var e = encodeURIComponent, s = [];
    if (isArray(a)) {
        forEeach(a, function(){
            add(this.name, this.value);
        });
    } else {
        for (var prefix in a) {
            buildParams(prefix, a[prefix]);
        }
    }
    return s.join("&").replace(/%20/g, "+");
}

function get_id(id){
    return document.getElementById(id);
}

function getElementValue(query, context){
    var doc = (context) ? context.ownerDocument : document;
    return doc.evaluate(query, (context || doc), null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function parseXml(xmlText){
    var dom = new DOMParser().parseFromString(xmlText, "application/xml");
    //urlinput.value = dom.getElementsByTagName('shortUrl')[0].textContent;
    return dom;
}

if (typeof Array.forEach === "undefined") {
    Array.forEach = function(arr, fn){
        Array.prototype.forEach.call(arr, fn);
    };
}

function insertAfter(el, ref){
    var next = ref.nextSibling;
    if (next) {
        insertBefore(el, next);
    } else {
        ref.parentNode.appendChild(el);
    }
}

function insertBefore(el, ref){
    ref.parentNode.insertBefore(el, ref);
}

function insertFirst(el, ref){
    if (ref.firstChild) {
        insertBefore(el, ref.firstChild);
    } else {
        ref.parentNode.appendChild(el);
    }
}
function insertLast(el, ref){
	if (ref) {
			//append
			ref.appendChild(el);
		}
}
function insertOn(el, ref, position){
	if (position=='after' || position == 1) {
		//after
		insertAfter(el, ref);
	} else if (position=='before' || position == 2) {
		//before
		insertBefore(el, ref);
	}else if (position=='first' || position == 3) {
		//first child
		insertFirst(el, ref);
	} else {
		insertLast(el,ref);
	}
}

function remove(el){
    if (el && el.parentNode) {
        el.parentNode.removeChild(el);
		el=null;
    }
}

function removeCascade(el){
	if (el.parentNode && el.parentNode.childNodes.length==1){
		removeCascade(el.parentNode);
	}else{
		remove(el);
	}
}

/**
 * Strings
 */
function normalizeUrl(url){
    if (!(/^http(s)?:/i.test(url))) {
        return 'http://' + url;
    } else {
        return url;
    }
}

//without parameter
function cleanUrl(url){
    var r=url, m = /([^\?]+)\??(.*)/.exec(url);
    if (m) {
        r= m[1];
    } 
	m = /(.*)\/.*\.\w+$/.exec(url);
	if (m) {
        r= m[1];
    }
	//Remove 2 dots
	r=r.replace(/\/[^\/]+\/\.\./g,''); 
	return r;
}

function getUrlBase(url){
	var m = url.split(/\/|\?/);
	if (m){
		return m[0]+'/'+m[1]+'/'+m[2];
	}else{
		return url;
	}
}

function ellipsis(text, max){
    var match = text || '';
    max = max || 24;
    if (match.length > max) {
        match = match.substr(0, max - 3) + '...';
    }
    return match;
}

String.prototype.toMaj = function(){
    return this.replace(/(^\w)/, function(m){
        return m.toUpperCase();
    });
};

//To Camel Case
String.prototype.toCamel = function(){
    return this.replace(/(\-[a-z])/g, function($1){
        return $1.toUpperCase().replace('-', '');
    });
};
//To Dashed from Camel Case
String.prototype.toDash = function(){
    return this.replace(/([A-Z])/g, function($1){
        return "-" + $1.toLowerCase();
    });
};
//To Underscore from Camel Case
String.prototype.toUnderscore = function(){
    return this.replace(/([A-Z])/g, function($1){
        return "_" + $1.toLowerCase();
    });
};
function isArray(obj){
    return (obj && obj.constructor == Array);
}

/**
 * Shortcuts
 *
 */
var _GRP={events:{}};
/**
 *
 * @param fn
 * @param keys
 *  [{keycode, shift, ctrl, alt}]
 * @return
 */
function _handleKeyEvent(e, event){
	var kc = e.keyCode;
	if (kc<20){
		//shift, ctrl, alt only goes out
		return;
	}
    var target = e.target,tag = target.tagName;
    //console.log('keydown on '+tag+'.'+(tag.className||''));
    if (tag !== 'INPUT' && tag !== 'SELECT' && tag !== 'TEXTAREA') {
        var keys = _GRP.events[event]||[];
        /*if (!isArray(keys)) {
            keys = [keys];
        }*/
        for (var i = 0, len = keys.length; i < len; i++) {
            var k = keys[i];
            if (k.keyCode == kc){
            //if (k.keyCode == kc &&
            	console.log(kc);
            if (((k.shiftKey && e.shiftKey) || (!k.shiftKey && !e.shiftKey)) &&
            ((k.ctrlKey && e.ctrlKey) || (!k.ctrlKey && !e.ctrlKey)) &&
            ((k.altKey && e.altKey) || (!k.altKey && !e.altKey))) {
                e.preventDefault();
                //e.stopPropagation();
                //k.fn(e);
                if (!target.locked) {
                    //console.log('run fn for keyCode='+k.keyCode);
                    k.fn(e);
                    target.locked = true;
                    window.setTimeout(function(){
                        target.locked = false;
                    }, 300);
                } else {
                    console.log('LOCK run fn for keyCode=' + k.keyCode);
                }
                break;
            }
            }
        }
    }
}

function initKey(keys, event){
	event=event||'keydown';
    if (!_GRP.events[event]){
    	_GRP.events[event]=[];
    	document.addEventListener(event, function(e){
    		_handleKeyEvent(e,event);
    	}, false);
    }
    if (isArray(keys)){
    	_GRP.events[event]=_GRP.events[event].concat(keys);
    }else{
    	_GRP.events[event].push(keys);
    }
    //_GRP.events[event].push(keys);
    	
    /*document.addEventListener(event, function(e){
        
    }, false);*/
}

function notEmpty(o){
    if (o) {
        if (isArray(o) && o.length > 0) {
            return o;
        } else if (typeof o === "object" && !isObjectEmpty(o)) {
            return o;
        } else {
            return false;
        }
    } else {
        return false;
    }
}
function removeNull(o){
    if (o) {
        var r, a = notEmpty(o);
		if (isArray(o)) {
			r = [];
			foreach(a, function(e){
				if (e) {
					r.push(e);
				}
			});
		} else {
			r = {};
			iterate(a, function(i, e){
				if (e) {
					r[i] = e;
				}
			});
		}
		return r;
    } else {
        return false;
    }
}


function isFunction(fn){
    return (fn && typeof fn === 'function');
}


function isObjectEmpty(o){
    if (!o) {
        return true;
    }
    for (var p in o) {
        if (!hasOwnProperty.call(o, p)) {
            continue;
        }
        return false;
    }
    return true;
}

function findInArray(a, value){
    for (var i = 0, len = a.length; i < len; i++) {
        if (a[i] === value) {
            return i;
        }
    }
    return false;
}

function find(o, key, value){
    for (var p in o) {
        if (!hasOwnProperty.call(o, p)) {
            continue;
        }
        if (o[p][key] === value) {
            return o[p];
        }
    }
    return false;
}

function findre(o, key, re){
    for (var p in o) {
        if (!hasOwnProperty.call(o, p)) {
            continue;
        }
        if (re.test(o[p][key])) {
            return o[p];
        }
    }
    return false;
}

function getCount(o){
    var count = 0;
    for (var p in o) {
        if (!hasOwnProperty.call(o, p)) {
            continue;
        }
        count++;
    }
    return count;
}

function returnItemAtPosition(o, i){
    var count = 0;
    for (var p in o) {
        if (!hasOwnProperty.call(o, p)) {
            continue;
        }
        if (count == i) {
            return o;
        }
    }
    return false;
}

function randomselect(ar){
    if (isArray(ar)) {
        return ar[Math.round(Math.random() * (ar.length - 1))];
    } else if (typeof ar == 'object') {
        var i = Math.round(Math.random() * (getCount(ar) - 1));
        return returnItemAtPosition(ar, i);
    } else {
        return false;
    }
    
}

function removeClass(el, classname){
    if (el && el.classList){
    	el.classList.remove(classname)
    }
   /* var s = (el.className || '').split(' ');
    for (var i = 0, len = s.length; i < len; i++) {
        if (s[i] == classname) {
            s[i] = '';
        }
    }
    el.className = s.join(' ').trim();*/
}

function toggleClass(el, classDelete, classAdd){
    removeClass(el, classDelete);
    addClass(el, classAdd);
}
function toggleClassEl(el, clazz){
	if (hasClass(el,clazz)){
		removeClass(el, clazz);
		return false;
	}else{
		addClass(el, clazz);
		return true;
	}
}
	
function onWindowResize(cb){
	var r = {w:0,h:0};
	window.addEventListener('resize',function(){
		if (window.innerHeight!== r.h || window.innerWidth!== r.w){
			r.h=window.innerHeight;
			r.w=window.innerWidth;
			cb(r);
		} 
	},true);
}

/*
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
            var et = get_id('title-and-status-holder');
            if (et) {
				offset += et.clientHeight;
            }
            var ca = getFirstElementByClassName(entries, 'card-actions');
            if (ca) {
				if (ca.style && ca.clientHeight) {
					offset += ca.clientHeight;
				}
            }
			//var vf = get_id('viewer-footer');
			//if (vf){
			//	offset += vf.clientHeight;
			//}
        }
		height = entries.clientHeight - offset;
    }
    return height;
}
*/

function fitHeight(el,h){
	el.style=el.style||{};
	el.style.height = (window.innerHeight - h) + 'px';
}
function getVisibleHeight(el){
	var h =0;
	if (isShown(el)){
		h=el.clientHeight;
	}
	return h;
}

function findTop(obj, relative){
    var curtop = 0;
    if (obj.offsetParent) {
        do {
            curtop += obj.offsetTop - obj.scrollTop;
        } while ((obj = obj.offsetParent) && (!relative || (relative && relative!==obj)) );
    }
    return curtop;
}

function findLeft(obj, relative){
    var curleft = 0;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
        } while ((obj = obj.offsetParent) && (!relative || (relative && relative!==obj)) );
        return curleft;
    }
}

function findPosition(element){
    var point = {
        x: 0,
        y: 0
    };
    var parent = element;
    while (parent) {
        point.x += parent.offsetLeft;
        point.y += parent.offsetTop;
        parent = parent.offsetParent;
    }
    return point;
}

function addStyle(el, property, value){
	if (el && el.style) {
		el.style[property]=value;
	}
}
function removeStyle(el, property){
	if (el && el.style && el.style[property]) {
		el.style[property]='';
		delete el.style[property];
	}
}

function getStyle(el, property){
    if (el && el.style && el.style[property]) {
        return parseInt(el.style[property].replace('px', ''), 10);
    } else {
        return 0;
    }
}

function simulateClick(node, bubble){
    if (!node){
		return false;
	}
	bubble=!!bubble;
	var event = node.ownerDocument.createEvent("MouseEvents");
	event.initMouseEvent("click", bubble, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
    /*
    eventName,   bubble,   cancellable, view,  clicks
 sx, sy, // screen coordinates
 cx, cy, // client coordinates
 false, false, false, false, // control/alt/shift/meta
 0, // button,
 node
 */
    node.dispatchEvent(event);
}

function simulateKeypress(node, keycode){
    var event = node.ownerDocument.createEvent("KeyboardEvent");
    if (typeof keycode === "string") {
        keycode = keycode.charCodeAt(0);
    }
    event.initKeyEvent("keypress", true, true, window, 0, 0, 0, 0, 0, keycode);
    //event.initKeyboardEvent('keypress', true, true, window, "U+0041");
    node.dispatchEvent(evt);
}

/**
 * Shortcuts
 * @param {Object} e
 */
function getStringFromCharCode(codePt){
    if (codePt > 0xFFFF) {
        codePt -= 0x10000;
        return String.fromCharCode(0xD800 + (codePt >> 10), 0xDC00 + (codePt & 0x3FF));
    } else if (keycodes && keycodes[codePt]) {
        return keycodes[codePt];
    } else {
        return String.fromCharCode(codePt);
    }
}

//saved under format CTRL[0,1]ALT[0,1]SHIFT[0,1]keyCode
function unmarshallKey(text){
    var m = /(\d)(\d)(\d)(\d+)/.exec(text || '');
    var key = {};
    if (m) {
        key = {
            ctrlKey: (m[1] === '1'),
            altKey: (m[2] === '1'),
            shiftKey: (m[3] === '1'),
            keyCode: m[4]
        };
    }
    return key;
}

function marshallKey(e){
    return ((e.ctrlKey) ? '1' : '0') + ((e.altKey) ? '1' : '0') + ((e.shiftKey) ? '1' : '0') + e.keyCode;
}

function formatKey(e, keyFirst){
    if (e && e.keyCode) {
		var keyLetter = getStringFromCharCode(e.keyCode);
		if (keyFirst) {
			return keyLetter + ((e.ctrlKey) ? '+ctrl' : '') + ((e.altKey) ? '+alt' : '') + ((e.shiftKey) ? '+shift' : '');
		} else {
			return ((e.ctrlKey) ? 'ctrl+' : '') + ((e.altKey) ? 'alt+' : '') + ((e.shiftKey) ? 'shift+' : '') + keyLetter;
		}
	}else{
		return '';
	}
}

/**
 * Cookies
 *
 */
function readCookie(name){
    name = name.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
    var regex = new RegExp('(?:^|;)\\s?' + name + '=(.*?)(?:;|$)', 'i'), match = document.cookie.match(regex);
    return match && unescape(match[1]);
}

/**
 * Templates
 */
function fillTpl(tpl, o){
    var txt = '' + tpl;
    for (var k in o) {
        if (o.hasOwnProperty(k)) {
            if (typeof o[k] !== "object") {
                var re = new RegExp("\\{" + k + "\\}", "g");
                txt = txt.replace(re, (typeof o[k] !== 'undefined') ? ('' + o[k]) : '');
            }
        }
    }
    return txt;
}

//Format text using number {0}
function formatText(tpl){
    if (!arguments) {
        return '';
    }
    var args = Array.prototype.slice.call(arguments, 1);
    var values = {};
    for (var i = 0, len = args.length; i < len; i++) {
        values[i] = args[i];
    }
    return fillTpl(tpl, values);
}

function getGlobal(){
    return (window.GRP = window.GRP || {});
}

var keycodes = {
    8: 'backspace',
    9: 'tab',
    13: 'enter',
    16: 'shift',
    17: 'ctrl',
    18: 'alt',
    19: 'pause',
    20: 'capslock',
    27: 'escape',
    33: 'pageup',
    32: 'space',
    34: 'pagedown',
    35: 'end',
    36: 'home',
    37: 'arrowleft',
    38: 'arrowup',
    39: 'arrowright',
    40: 'arrowdown',
    44: 'printscreen',
    45: 'insert',
    46: 'delete',
    48: '0',
    49: '1',
    50: '2',
    51: '3',
    52: '4',
    53: '5',
    54: '6',
    55: '7',
    56: '8',
    57: '9',
    65: 'a',
    66: 'b',
    67: 'c',
    68: 'd',
    69: 'e',
    70: 'f',
    71: 'g',
    72: 'h',
    73: 'i',
    74: 'j',
    75: 'k',
    76: 'l',
    77: 'm',
    78: 'n',
    79: 'o',
    80: 'p',
    81: 'q',
    82: 'r',
    83: 's',
    84: 't',
    85: 'u',
    86: 'v',
    87: 'w',
    88: 'x',
    89: 'y',
    90: 'z',
    91: 'leftwindowkey',
    92: 'rightwindowkey',
    93: 'selectkey',
    96: '0 pad',
    97: '1 pad',
    98: '2 pad',
    99: '3 pad',
    100: '4 pad',
    101: '5 pad',
    102: '6 pad',
    103: '7 pad',
    104: '8 pad',
    105: '9 pad',
    106: '*',
    107: '+',
    109: '-',
    110: '.',
    111: '/',
    112: 'f1',
    113: 'f2',
    114: 'f3',
    115: 'f4',
    116: 'f5',
    117: 'f6',
    118: 'f7',
    119: 'f8',
    120: 'f9',
    121: 'f10',
    122: 'f11',
    123: 'f12',
    144: 'numlock',
    145: 'scrolllock',
    182: 'MyComputer',
    183: 'MyCalculator',
    186: ';',
    187: '=',
    188: ',',
    189: 'dash',
    190: 'period',
    191: '/',
    219: '(',
    220: '\\',
    221: ')',
    222: '\''
};
//a.href sometimes truncated
function getHref(a){
    var url = a.protocol + '//' + a.host + a.pathname + (a.hash || '');
    return url;
}

function adjustIframeHeight(iframe, heightMaxi){
    var el;
    if (iframe.document.height) {
        el = parent.document.getElementById(iframe.name);
        el.style.height = iframe.document.height + 'px';
    //el.style.width = iframe.document.width + 'px';
    } else if (document.all) {
        el = parent.document.all[iframe.name];
        if (iframe.document.compatMode &&
        iframe.document.compatMode != 'BackCompat') {
            el.style.height = iframe.document.documentElement.scrollHeight + 5 + 'px';
        //el.style.width = iframe.document.documentElement.scrollWidth + 5 + 'px';
        } else {
            el.style.height = iframe.document.body.scrollHeight + 5 + 'px';
        //el.style.width = iframe.document.body.scrollWidth + 5 + 'px';
        }
    }
}


function getHeight(el){
	var h = 0;
	if (el && el.style) {
		h = parseInt(el.style.height.replace('px', ''), 10);
	}
	return h;
}

function bind(func, thisArg){
    var args = Array.prototype.slice.call(arguments, 2);
    return function(){
        var bargs = args.concat(Array.prototype.slice.call(arguments));
        func.apply(thisArg, bargs);
    };
}

function foreach(array, fn, scope){
    if (!array) {
        return;
    }
    if (typeof array.length == "undefined") {
        array = [array];
    }
    for (var i = 0, len = array.length; i < len; i++) {
        if (fn.call(scope || array[i], array[i], i, array, len) === false) {
            return i;
        }
    }
}

function map2array(all, key, value, flat, eu){
    var r = [];
    iterate(all, function(p, o){
        var a = {};
        a[key || 'key'] = p;
        if (flat && typeof o === "object") {
            iterate(o, function(k, obj){
                a[k] = obj;
            });
        } else {
            a[value || 'value'] = o;
        }
        r.push(a);
    });
    return r;
}

function iterate(o, fn, scope, id){
    var r=false;
	if (o) {
        for (var p in o) {
            if (!hasOwnProperty.call(o, p)) {
                continue;
            }
            if (typeof id !== 'undefined') {
                o[p][(typeof id === "string") ? id : 'id'] = p;
            }
            r = fn.call(scope || this, p, o[p]);
			if (r === false){
				return p;
				//r=o;break;
			}
        }
    }
    return r;
}
function count(o, fn, scope, id){
	var s= 0;
	iterate(o, function(id, a){
		s++;
	});
	return s;
}

function namespace(){
    var o, d;
    foreach(arguments, function(v){
        d = v.split(".");
        o = window[d[0]] = window[d[0]] || {};
        foreach(d.slice(1), function(v2){
            o = o[v2] = o[v2] || {};
        });
    });
    return o;
}

function createDelegate(fn, obj, args, appendArgs) {
    if (!isFunction(fn)) {
        return fn;
    }
    return function() {
        var callArgs = args || arguments;
        if (appendArgs === true) {
            callArgs = Array.prototype.slice.call(arguments, 0);
            callArgs = callArgs.concat(args);
        }
        else if (typeof appendArgs === 'number') {
            callArgs = Array.prototype.slice.call(arguments, 0);
            // copy arguments first
            var applyArgs = [appendArgs, 0].concat(args);
            // create method call params
            Array.prototype.splice.apply(callArgs, applyArgs);
            // splice them in
        }
        return fn.apply(obj || window, callArgs);
    };
}
        
function extend(a, c){
	var o = function(){
		a.call(this);
	};
	o.prototype=apply({}, c, a.prototype)
	return o;
}
function apply(o, c, defaults){
    if (defaults) {
        apply(o, defaults);
    }
    if (o && c && typeof c === 'object') {
        for (var p in c) {
            o[p] = c[p];
        }
    }
    return o;
}

//Override text with last item
function merge(o, c, defaults){
    if (defaults) {
        merge(o, defaults);
    }
    if (typeof o !== "undefined" && typeof c !== "undefined") {
        if (typeof c === 'object') {
            for (var p in c) {
                //console.log(c[p] + ' Omerge['+p+']> ' + o[p]);
                if (typeof c[p] === 'object' || isArray(c[p])) {
                    merge(o[p], c[p]);
                } else {
                    o[p] = c[p];
                }
            }
        } else {
            //o[p] = c[p];
            //console.log(c + ' -> ' + o);
            o = c;
        }
    }
    return o;
}

function isundef(o){
    return (typeof o === 'undefined');
}

function group(a, name){
    var r = {};
    iterate(a, function(id, o){
        var val = o[name] || 'other';
        if (!r[val]) {
            r[val] = {};
        }
        r[val][id] = o;
    });
    return r;
}

function applyRemoteLang(lang, base, id, o, fn, scope){
    GM_xmlhttpRequest({
        method: 'GET',
        url: base + '_locales/' + lang + '/' + id + '.json',
        onload: function(res){
            var data = eval(xhr.responseText);
            if (data) {
                //merge data into o
                applyLast(o[id], data);
            }
        },
        onerror: function(res, a){
            if (a && a.url) {
                console.error(a.url);
            }
            console.error(res);
        }
    });
}

//http://snipplr.com/view/9649/escape-regular-expression-characters-in-string/
//http://simonwillison.net/2006/Jan/20/escape/
//var re_encodeRE = new RegExp("[-^$.*+?|()\\[\\]{}\\\\]", "g"); // .*+?|()[]{}\
var re_encodeRE = /[\/\-\^\$\.\*\+\?\\|\(\)\[\]{}\\\\]/g;
var re_wildcard = /[^\\]\\\\*/g;
function encodeRE(s,wildcard){
    var e = s.replace(re_encodeRE, "\\$&").replace(/\s/g, '\\s');
	/*if (wildcard){
		e = e.replace(re_wildcard, ".*");
	}*/
	return e;
}

function encoderegex(term, re, wildcard){
	var rx = '';
	if (/^#/.test(term)){
		//RegExp
		rx=term.replace(/^#/,'');
	}else {
		rx = encodeRE(term, wildcard);
	}
	if (re) {
		rx=new RegExp(unescapePhrase(rx), 'i');
	}
	return rx;
}

function escapePhrase(t){
	return '<#' + t.replace(/\s/g, '#_#') + '#>';
}
function unescapePhrase(t){
	return t.replace(/<#/g, '(\\b').replace(/#>/g, '\\b)').replace(/#_#/g, '\\s');
}
	
function urlDecode(string){
    var obj = {}, pairs = string.split('&'), d = decodeURIComponent, name, value;
    for (var i = 0, len = pairs.length; i < len; i++) {
        var pair = pairs[i];
        pair = pair.split('=');
        name = d(pair[0]);
        value = d(pair[1]);
        obj[name] = !obj[name] ? value : [].concat(obj[name]).concat(value);
    }
    return obj;
}

function getDomain(url, withProtocol){
    var m = url.split(/\/|\?/);
    if (withProtocol) {
        return m[0] + '/' + m[1] + '/' + m[2];
    } else {
        return m[2];
    }
}

/*
 isChromeVersionMini('5.0.342.1')
 compareVersion('5.1', '5.0.342.1');->=true
 compareVersion('5.0.100', '5.0.342.1');->=false
 */
function getChromeVersion(){
    var version = /Chrome\/([\d\.]+)/.exec(window.navigator.appVersion);
    return version[1];
}

//Chrome mini version required
function isChromeVersionMini(ref){
    return (compareVersion(getChromeVersion(), ref) >= 0);
}

function isOsMac(){
	return window.navigator.platform.toLowerCase().indexOf('mac')>=0;
}
function isOsLinux(){
	return window.navigator.platform.toLowerCase().indexOf('linux')>=0;
}
//compare 2 first segments
function isVersionMajorUpdated(oldVersion, newVersion){
    return (compareVersion(newVersion, oldVersion, 2) > 0);
}

function compareVersion(version, ref, count){
    if (!ref) {
        //new version, no previous version
        return 1;
    }
    var versions = version.split('.');
    var refs = ref.split('.');
    count = count || versions.length;
    for (var i = 0, len = count; i < len; i++) {
        versions[i] = parseInt(versions[i], 10);
        if (i <= refs.length) {
            refs[i] = parseInt(refs[i], 10);
            if (versions[i] < refs[i]) {
                return -1;
            } else if (versions[i] > refs[i]) {
                return 1;
            }
        }
    }
    return 0;
}

function textareaTab(){
    //Let handle tab on textarea
    var areas = document.getElementsByTagName('textarea');
    if (areas) {
        for (var i = 0, len = areas.length; i < len; i++) {
            areas[i].addEventListener('keydown', function(e){
                var t = e.target;
                if (e.keyCode == 9) {
                    e.preventDefault();
                    var tab = '\t';
                    var ss = t.selectionStart;
                    var se = t.selectionEnd;
                    var currentScroll = t.scrollTop;
                    // Indent
                    if (ss != se && t.value.slice(ss, se).indexOf("\n") != -1) {
                        var pre = t.value.slice(0, ss);
                        var selb = t.value.slice(ss, se);
                        if (e.shiftKey) {
                            //un-indent
                            sel = selb.replace(/^\t/mg, "\n");
                        } else {
                            //indent
                            sel = selb.replace(/\n/g, "\n" + tab);
                        }
                        var post = t.value.slice(se, t.value.length);
                        t.value = pre.concat(tab).concat(sel).concat(post);
                        t.selectionStart = ss + tab.length;
                        t.selectionEnd = se + (sel.length - selb.length);
                    } else {
                        t.value = t.value.slice(0, ss).concat(tab).concat(t.value.slice(ss, t.value.length));
                        if (ss == se) {
                            t.selectionStart = t.selectionEnd = ss + tab.length;
                        } else {
                            t.selectionStart = ss + tab.length;
                            t.selectionEnd = se + tab.length;
                        }
                    }
                    t.scrollTop = currentScroll;
                    t.focus();
                    return false;
                } else {
                    return true;
                }
            });
        }
    }
}

function waitlib(check, fn, scope){
    if (check()) {
        if (fn) {
            fn.call(scope || this);
        }
    } else {
        window.setTimeout(function(){
            waitlib(check, fn);
        }, 200);
    }
}

function waitImages(images, cb, scope){
    var count = (images) ? images.length : 0;
    if (count <= 0) {
        cb.call(scope || this, true);
    } else {
        var timeout = window.setTimeout(function(){
            console.log("Images are not all loaded: " + count);
            cb.call(scope || this, false);
        }, 3000);
        function check(){
            if (count === 0) {
                window.clearTimeout(timeout);
                cb.call(scope || this, true);
            }
        }
        for (var i = 0, len = images.length; i < len; i++) {
            var image = images[i];
            if (image.complete) {
                count--;
            } else {
                image.addEventListener('load', function(){
                    count--;
                    check();
                });
            }
        }
        check();
    }
}

function isShown(el){
    return (el && el.style && el.style.display !== 'none' && el.visibility !== 'hidden');
}

function show(el, value){
    if (el) {
        if (!el.style) {
            el.style = {};
        }
        el.style.display = value || '';
    }
}

function hide(el){
    if (el) {
        el.style.display = 'none';
    }
}

function toggle(el){
    var r = false;
	if (isShown(el)){
		hide(el);
	} else {
       show(el);
	   r = true;
    }
	return r;
}

function showas(el, hideme){
    if (hideme) {
        hide(el);
    } else {
        show(el);
    }
}

function shake(el){
	if (typeof el === 'string'){
		el=get_id(el);
	}
	hide(el);
	setTimeout(function(){
		show(el);
	},100);
}

//http://forums.mozillazine.org/viewtopic.php?f=19&t=1806595
//http://forums.mozillazine.org/viewtopic.php?f=19&t=1594275
//https://developer.mozilla.org/En/Code_snippets:HTML_to_DOM
function loadXml(html, id){
    var el = document.createElement('div');
	el.id = id || ('_grp_xml_'+Math.round(Math.random()*999+1));
    el.style.display = 'none';
    el.innerHTML = (html.split(/<body[^>]*>((?:.|\n)*)<\/body>/i)[1]) || html;
    return el;
}

function loadText(url, cb){
    GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        onload: function(r){
            var txt = r.responseText;
            cb(txt);
        }
    });
}

function loadCss(url, cb, option){
    loadText(url, function(txt){
        var css = txt;
        if (!option || option.compact) {
            css = compact(css);
        }
        if (!option || option.clean) {
            css = css.replace(/\/\*.*?\*\//g, '');
        }
        cb(css);
    });
}

function compact(text){
    return text.replace(/[\n\t]/g, '').replace(/\s+/g, ' ');
}

//Only works with XML well-formed
function getDocumentXml(html, id){
    var h = html.replace(/^(.*\n)*.*<html/i, "<html");
    h = h.replace(/<\/html>(.*\n)*.*$/i, "</html>");
    var parser = new DOMParser();
    var dom = parser.parseFromString(t, "text/xml");
    return dom;
}

function loadXMLDoc(url){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.send("");
    return xhr.responseXML;
}

function applyXsl(xml, xsl){
    var oxml = loadXMLDoc(xml);
    var oxsl = loadXMLDoc(xsl);
    var xp = new XSLTProcessor();
    xp.importStylesheet(oxsl);
    var doc = xp.transformToFragment(oxml, document);
    return doc;
}

var tmaps = {
    id: 'id',
    cls: 'className',
    style: 'style',
    href: 'href',
    alt: 'alt',
    title: 'title',
    text: 'innerText',
    html: 'innerHTML'
};
function dh(root, tag, attrs, events){
    var config = attrs||{};
    if (root) {
        config.root = root;
    }
    if (tag) {
        config.tag = tag;
    }
    if (events) {
        config.events = events;
    }
    return dhc(config);
}

function dhc(config){
    if (!config) {
        return false;
    }
    var root = config.root;
    if (!root) {
        root = document.body;
    } else if (typeof config.root == "string") {
        root = get_id(config.root);
        if (!root) {
            return false;
        }
    }
    var excepts = {
        root: 1,
        tag: 1,
        events: 1,
        el: 1,
        position: 1,
		style: 1
    };
    var el = document.createElement(config.tag || 'div');
    iterate(config, function(k, o){
        if (typeof o !== 'undefined') {
            if (excepts[k] !== 1) {
                if (tmaps[k]) {
                    el[tmaps[k]] = o;
                } else {
                    addAttr(el, k, o);
                }
            }
        }
    });
	if (config.style) {
		if (typeof config.style === 'string') {
			el.style = config.style;
		} else {
			el.style = el.style || {};
			iterate(config.style, function(k, o){
				el.style[k] = o;
			});
		}
	}
    iterate(config.events, function(name, o){
        var fn = o, capture=false;
		if (typeof o ==='object'){
			fn = o.fn;
			capture = o.capture;
		}
		el.addEventListener(name, fn, capture);
    });
    if (config.el) {
        //recurse
        var cfg = config.el;
        cfg.root = el;
        dhc(cfg);
    }
	insertOn(el, root, config.position);
    return el;
}

function newel(id, cls){
    var el = get_id(id);
    if (el) {
        return el;
    } else {
        return dh('', 'div', {
            id: id,
            cls: cls
        });
    }
}

function randomItem(items){
    return items[Math.round(Math.random() * (items.length - 1))];
}

function loadjQuery(cb, version, local){
    version = version || '1';
    var url = (local) ? (LOCALPATH + '/lib/jquery.min.js') : ('http://ajax.googleapis.com/ajax/libs/jquery/' + version + '/jquery.min.js');
    GM_loadScript(url, false, function(){
        return (typeof jQuery !== "undefined");
    }, cb);
}

function runfn(fn, id, priority, delay){
    GRP.fns.push({
        fn: fn,
        id: id,
        delay: delay,
        priority: priority
    });
}

function escapeJson(text){
    return text.replace(/'/g,"\\'");
}

function encodeu(el){
    return escape(encodeURIComponent(el));
}

function decodeu(el){
    return decodeURIComponent(unescape(el));
}

function getBoolean(val){
    return (val && (val === true || val.toLowerCase() === 'true'));
}


function getTypedValue(o){
    var text;
    if (typeof o === 'object') {
        text = o.value || '';
    } else {
        text = o;
    }
    if (text === "true") {
        return true;
    } else if (text === "false") {
        return false;
    } else {
        return text;
    }
}

function trim(s){
    return s ? s.replace(/^\s+|\s+$/g, "") : "";
}
function trimEx(s){
	return (s||'').replace(/^[\s\t\n\r]*/,'').replace(/[\s\t\n\r]*$/,'');
}
function substrUntilLast(txt, find){
	var t=txt, pos = txt.lastIndexOf(find);
	if (pos > 0) {
	     t = txt.substr(0, pos+1);
	}
	return t;
}
function setValue(id, value){
	var el = get_id(id);
	if (el){
		el.value = value;
	}
}
function getValue(id, def){
	var value=def||'', el = get_id(id);
	if (el){
		value=el.value;
	}
	return value;
}

var _ti={};
function setOnceTimeout(cb, t, id){
	id=id||'t';
	if (_ti[id]){
		clearTimeout(_ti[id]);
	}
	_ti[id] = setTimeout(cb, t);
}

function undef(o){
	return ((typeof o ==='undefined')||(o===null)); 
}

function bubbleSort(a, fn, swap){
    if (typeof fn !=='function'){
		fn=function(a,b){
			return a>b;
		};
	}
	if (typeof swap !=='function'){
		swap=function(a,i,j){
			var temp = a[i];
            a[i] = a[j];
            a[j] = temp;
		};
	}
	var swapped;
    do {
        swapped = false;
        for (var i=0; i < a.length-1; i++) {
            if (fn(a[i], a[i+1])) {
                swap(a,i,i+1);
                swapped = true;
            }
        }
    } while (swapped);
}

function qsort(array, begin, end){
	if(end-1>begin) {
		Array.prototype.swap=function(a, b){
			var tmp=this[a];
			this[a]=this[b];
			this[b]=tmp;
		};
		function partition(array, begin, end, pivot){
			var piv=array[pivot];
			array.swap(pivot, end-1);
			var store=begin;
			var ix;
			for(ix=begin; ix<end-1; ++ix) {
				if(array[ix]<=piv) {
					array.swap(store, ix);
					++store;
				}
			}
			array.swap(end-1, store);
			return store;
		}
		var pivot=begin+Math.floor(Math.random()*(end-begin));
		pivot=partition(array, begin, end, pivot);
		qsort(array, begin, pivot);
		qsort(array, pivot+1, end);
	}
}
function quicksort(array){
	qsort(array, 0, array.length);
}

function loadImages(items, cb){
	var imgs=[], imgok=[], len = items.length;
	if (len>0){
		var j = len;
		for (var i=0; i<len; i++){
			var img=new Image();
			(function(){
				var _img=img;
				_img.onload = function(){
					imgok.push(_img);
					decimg();
				};
			})();
			function decimg(){
				//Already removed?
				//if (imgs[p]){
				//	imgs[p]=false;
					if (--j == 0){
						cb(imgok);
					}
				//}
			}
			img.src = items[i].src;
			/*setTimeout(function(){
				//3 s max
				decimg();
			},3000);*/
		}
	}else{
		//No image go anayway
		cb(false);
	}
}

function findImage(images, width, minWidth, useFirstAnyway){
    var src = false, len = images.length;
    for (var i = 0; i < len; i++) {
        if (images[i].naturalWidth >= width) {
            if (!minWidth || (minWidth && images[i].naturalWidth >= minWidth)) {
                src = images[i].src;
                break;
            }
        }
    }
    if (!src && useFirstAnyway && len>=0){
    	if (images[0].naturalWidth>0){
    		src=images[0].src;
    	}
    }
    return src;
}

function findFirstImage(images, cfg){
    var src = false, len = images.length;
    cfg=cfg||{};
    for (var i = 0; i < len; i++) {
        if (images[i].naturalWidth >= cfg.width) {
        	if (images[i].naturalHeight >= cfg.height) {
                src = images[i].src;
                break;
            }
        }
    }
    if (!src && cfg.useFirstAnyway && len>=0){
    	if (images[0].naturalWidth>0){
    		src=images[0].src;
    	}
    }
    return src;
}

function loadFiles(cfg, cb){
	cfg.f = cfg.f || 0;
	if (!cfg.text){
		cfg.text='';
	}
	if (cfg.f>=cfg.files.length){
		cb(cfg.text);
	}else{
		var url = (cfg.base||'')+cfg.files[cfg.f];
		GM_xmlhttpRequest({
			url:url, 
			onload: function(res){
				cfg.text+=res.responseText+(cfg.sep||'');
				++cfg.f; 
				loadFiles(cfg, cb);
			}
		});
	}
}

function compressCss(text){
	return text.replace(/[\r\n]+/g,'').replace(/\s+/g,' ');
}

function delay(fn, maxi, tim){
	var i=0,maxi=maxi||6,tim=tim||500, stop=false;
	while(!plus_removed && i++<maxi){
		setTimeout(function(){
			stop=fn();
		},tim);	
	}
}
/*
var _events={};
function addEvListener(el,m,cb,p){
	var id = el.addEventListener(m,cb,p);
	//_events.push('#'+(el.id||'')+'.'+(el.className||''), id);
	_events.push(el, id);
}

function tickCleanEvents(tim){
	setInterval(function(){
		iterate(_events,function(el,ev){
			if(nodeRemoved(el)){
				el.removeEvents(ev);
			}
		});
	},tim||30000);
}
*/