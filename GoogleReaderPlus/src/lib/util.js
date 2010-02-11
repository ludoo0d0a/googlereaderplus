//
// Global util functions
//
function hasClass(el, clazz){
    if (!el || !el.className) {
        return false;
    }
    var reClassname = new RegExp("(^|\\s)" + clazz + "(\\s|$)");
    return (reClassname.test(el.className));
}

function addClass(el, clazz){
    el.className = (el.className || '') + ' ' + clazz;
}

function addClassIf(el, cls, status){
    if (status) {
        addClass(el, cls);
    } else {
        removeClass(el, cls);
    }
}

function findParentNode(eel, etag, clazz){
    var tag = etag.toUpperCase();
    var el = eel.parentNode;
    if (clazz) {
        // Find first element's parent node matching tag and className
        while (el && el.tagName !== 'BODY' && (el.tagName !== tag || !hasClass(el, clazz))) {
            // console.log(el.tagName+'.'+el.className);
            el = el.parentNode;
            /*
             * if (!el){ console.log('el null for clazz '+clazz ); }
             */
        }
    } else {
        while (el && el.tagName !== 'BODY' && el.tagName !== tag) {
            el = el.parentNode;
        }
    }
    return ((el && el.tagName !== 'BODY') ? el : false);
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
    var i = 0, j = 0;
    while (elements[i]) {
        if (hasClass(elements[i], clazz)) {
            j = i;
        }
        i++;
    }
    return ((!elements[j]) ? null : (elements[j]));
}

/*
 * function getElementsByClassName(root, tag, class) { var elements =
 * root.getElementsByTagName(tag); var results = new Array(); for ( var i = 0; i <
 * elements.length; i++) { if (elements[i].className.indexOf(class) > -1) {
 * results.push(elements[i]); } } return (results); }
 */
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

function getElements(xpath, context){
    var doc = (context) ? context.ownerDocument : document;
    var r = doc.evaluate(xpath, (context || doc), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0, l = r.snapshotLength, res = new Array(l); i < l; i++) {
        res[i] = r.snapshotItem(i);
    }
    return res;
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
function insertBeforeFirst(el, ref){
    if (ref.firstChild) {
		insertBefore(el, ref.firstChild);
	}else{
		ref.parentNode.appendChild(el);
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
    var m = /([^\?]+)\??(.*)/.exec(url);
    if (m) {
        return m[1];
    } else {
        return url;
    }
}

function ellipsis(text){
    var match = text;
    if (match.length > 24) {
        match = match.substr(0, 21) + '...';
    }
    return match;
}

function isArray(obj){
    return obj.constructor == Array;
}


/**
 * Shortcuts
 *
 */
/**
 *
 * @param fn
 * @param keys
 *  [{keycode, shift, ctrl, alt}]
 * @return
 */
function initKey(keys){
    document.addEventListener('keydown', function(ee){
        var e = ee;
        var tag = e.target.tagName.toLowerCase();
        if (tag !== "input" && tag !== "select" && tag !== "textarea") {
            if (!isArray(keys)) {
                keys = [keys];
            }
            keys.forEach(function(k){
                if (k.keyCode == e.keyCode &&
                ((k.shiftKey && e.shiftKey) || (!k.shiftKey && !e.shiftKey)) &&
                ((k.ctrlKey && e.ctrlKey) || (!k.ctrlKey && !e.ctrlKey)) &&
                ((k.altKey && e.altKey) || (!k.altKey && !e.altKey))) {
                    k.fn(e);
                    e.preventDefault();
                }
            });
        }
    }, false);
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

function removeClass(el, classname){
    //todo: use regex word boundary
    var s = (el.className || '').split(' ');
    for (var i = 0, len = s.length; i < len; i++) {
        if (s[i] == classname) {
            s[i] = '';
        }
    }
    el.className = s.join(' ');
//el.className = el.className.replace(classname, '').trim();
}

function toggleClass(el, classDelete, classAdd){
    removeClass(el, classDelete);
    addClass(el, classAdd);
}

function fireResizeDefer(){
    window.setTimeout(fireResize, 500);
}

function fireResize(){
    fitHeight('sub-tree');
    fitHeight('entries', 'viewer-footer');
}

function fitHeight(id, bottom){
    var el = document.getElementById(id);
    var h = findTop(el);
    if (bottom && bottom) {
        h -= el.clientHeight;
    }
    el.style.height = (window.innerHeight - h) + 'px';
}

function findTop(obj){
    var curtop = 0;
    if (obj.offsetParent) {
        do {
            curtop += obj.offsetTop;
        }
        while ((obj = obj.offsetParent));
        return curtop;
    }
}

function simulateClick(node){
    var event = node.ownerDocument.createEvent("MouseEvents");
    event.initMouseEvent("click", true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
    node.dispatchEvent(event);
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
    var m = /(\d)(\d)(\d)(\d+)/.exec(text);
    var key = {};
    if (m) {
        key = 
        {
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

function formatKey(e){
    var keyLetter = getStringFromCharCode(e.keyCode);
    return ((e.ctrlKey) ? 'ctrl+' : '') + ((e.altKey) ? 'alt+' : '') + ((e.shiftKey) ? 'shift+' : '') + keyLetter;
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
                txt = txt.replace(re, (o[k]) ? ('' + o[k]) : '');
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

var keycodes = 
{
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
    96: 'numpad0',
    97: 'numpad1',
    98: 'numpad2',
    99: 'numpad3',
    100: 'numpad4',
    101: 'numpad5',
    102: 'numpad6',
    103: 'numpad7',
    104: 'numpad8',
    105: 'numpad9',
    106: 'multiply',
    107: 'add',
    109: 'subtract',
    110: 'decimalpoint',
    111: 'divide',
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
    186: 'semicolon',
    187: 'equalsign',
    188: 'comma',
    189: 'dash',
    190: 'period',
    191: 'forwardslash',
    219: 'openbracket',
    220: 'backslash',
    221: 'closebraket',
    222: 'singlequote'
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

function foreach(array, fn, scope){
    if (!array) {
        return;
    }
    if (typeof array.length == "undefined") {
        array = [array];
    }
    for (var i = 0, len = array.length; i < len; i++) {
        if (fn.call(scope || array[i], array[i], i, array) === false) {
            return i;
        }
    }
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
    if (typeof o !== "undefined" && typeof c !== "undefined" ) {
        if (typeof c === 'object') {
            for (var p in c) {
                //console.log(c[p] + ' Omerge['+p+']> ' + o[p]);
				if (typeof c[p] === 'object' || isArray(c[p])) {
					merge(o[p], c[p]);
				}else{
					o[p]= c[p];
				}
            }
        } else if (isArray(c)) {
            for (var i = 0, len = c.length; i < len; i++) {
				//o[i] = c[i];
				//console.log(c[i] + ' Amerge['+i+']> ' + o[i]);
				if (typeof c[i] === 'object' || isArray(c[i])) {
					merge(o[i], c[i]);
				}else{
					o[i]= c[i];
				}
				console.log('after: '+c[i] + ' Amerge['+i+']> ' + o[i]);
            }
        } else{
            //o[p] = c[p];
			console.log(c + ' -> ' + o);
			o = c;
        }
    }
    return o;
}

function applyRemoteLang(lang, base, id, o, fn, scope){
    GM_xmlhttpRequest(
    {
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
