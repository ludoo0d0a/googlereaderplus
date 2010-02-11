
//GreaseKit
//http://groups.google.com/group/greasekit-users/browse_thread/thread/d0ed6e8919bb6b42
if (typeof GM_getValue === "undefined") {
    GM_getValue = function(name, def){
        var value = localStorage.getItem(name);
        if (value === null && def !== null) {
            value = def;
        }
        return value;
    };
}
if (typeof GM_getCookieValue === "undefined") {
    GM_getCookieValue = function(name, def){
        var value;
        var nameEQ = escape("_greasekit" + name) + "=", ca = document.cookie.split(';');
        for (var i = 0, c; i < ca.length; i++) {
            c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) === 0) {
                value = unescape(c.substring(nameEQ.length, c.length));
                break;
            }
        }
        if (value === null && def !== null) {
            value = def;
        }
        return value;
    };
}
if (typeof GM_setValue === "undefined") {
    GM_setValue = function(name, value, options){
        try {
            localStorage.setItem(name, value);
        } 
        catch (e) {
            console.log('error on GM_setValue[' + name + ']=' + value);
        }
    };
}
if (typeof GM_setCookieValue === "undefined") {
    GM_setCookieValue = function(name, value, options){
        options = (options || {});
        if (options.expiresInOneYear) {
            var today = new Date();
            today.setFullYear(today.getFullYear() + 1, today.getMonth, today.getDay());
            options.expires = today;
        }
        var curCookie = escape("_greasekit" + name) +
        "=" +
        escape(value) +
        ((options.expires) ? "; expires=" +
        options.expires.toGMTString() : "") +
        ((options.path) ? "; path=" + options.path : "") +
        ((options.domain) ? "; domain=" + options.domain : "") +
        ((options.secure) ? "; secure" : "");
        document.cookie = curCookie;
    };
}
//TODO
function accessSecure(message, o, callback){
    var myport = chrome.extension.connect(
    {
        name: "googlereaderplus"
    });
    if (callback) {
        myport.onMessage.addListener(callback);
    }
    var a = clone(o) || {};
    a.message = message;
    var fns = ['onload', 'onreadystatechange', 'onerror'];
    for (var i = 0, len = fns.length; i < len; i++) {
        var f = fns[i];
        if (o[f]) {
            a[f] = true;
        }
    }
    myport.postMessage(a);
}

if (typeof GM_xmlhttpRequest === "undefined") {
    GM_xmlhttpRequest = function(o){
        o.method = (o.method)?o.method.toUpperCase():"GET";
        if (!o.url) {
            throw ("GM_xmlhttpRequest requires an URL.");
        }
        var om = o;
        accessSecure("request", o, function(a){
            if (a.message === (om.callback || "requestdone")) {
                if (a.action === "load") {
                    if (typeof om.onload == "function") {
                        om.onload(a);
                    }
                } else if (a.action === "readystatechange") {
                    if (typeof om.onreadystatechange == "function") {
                        om.onreadystatechange(a);
                    }
                } else if (a.action === "error") {
                    GM_log('error: ' + a.responseText);
                    if (typeof om.onerror == "function") {
                        om.onerror(a, om);
                    }
                }
            }
        });
    };
}

if (typeof GM_addStyle === "undefined") {
    function GM_addStyle(/* String */styles, id){
        var el;
		if (id) {
			el = document.getElementById(id);
		}
		if (!el) {
			el = document.createElement("style");
			el.setAttribute("type", "text\/css");
			if (id) {
				el.id = id;
			}
			el.appendChild(document.createTextNode(styles));
			document.getElementsByTagName("head")[0].appendChild(el);
		}else{
			//update
			el.innerText=styles;//textContent??
		}
    }
}

if (typeof GM_addScript === "undefined") {
    function GM_addScript(script, remote, cb, cbonerror){
        var s = document.getElementById(script);
        if (s) {
            if (cbonerror && cb) {
                cb.call(this);
            }
        } else {
            if (remote) {
                GM_xmlhttpRequest(
                {
                    method: 'get',
                    url: script,
                    onload: function(r){
                        eval('' + r.responseText + '');
                        if (cb) {
                            cb.call(this);
                        }
                    },
                    onerror: function(r){
                        if (cbonerror && cb) {
                            cb.call(this);
                        }
                        console.error('Error on loading Javascript ' + script);
                    }
                });
            } else {
                var el = document.createElement("script");
                el.setAttribute("type", "text\/javascript");
                el.setAttribute("src", script);
                el.setAttribute("id", script);
                document.getElementsByTagName("head")[0].appendChild(el);
            }
        }
    }
}

if (typeof GM_addCss === "undefined") {
    function GM_addCss(css){
        var el = document.createElement("link");
        el.setAttribute("rel", "stylesheet");
        el.setAttribute("type", "text\/css");
        el.setAttribute("href", css);
        document.getElementsByTagName("head")[0].appendChild(el);
    }
}

if (typeof GM_log === "undefined") {
    function GM_log(log){
        console.log(log);
    }
}

if (typeof GM_registerMenuCommand === "undefined") {
    function GM_registerMenuCommand(a, b){
        //
    }
}

if (typeof GM_openInTab === "undefined") {
    GM_openInTab = function(url, selected, index, windowId){
        //send request port to bg
        if (typeof selected == "undefined") {
            selected = true;
        }
        var data = 
        {
            url: url,
            selected: selected,
            index: index,
            windowId: windowId
        };
        accessSecure("opentab", data);
    };
}

if (typeof unsafeWindow === "undefined") {
    unsafeWindow = window;
}

if (typeof(this['clone']) !== 'function') {
    clone = function(o){
        try {
            return eval(uneval(o));
        } 
        catch (e) {
            throw (e);
        }
    };
}

/**
 * uneval for prefetch !!
 */
if (typeof(this['uneval']) !== 'function') {
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var protos = [];
    var char2esc = 
    {
        '\t': 't',
        '\n': 'n',
        '\v': 'v',
        '\f': 'f',
        '\r': '\r',
        '\'': '\'',
        '\"': '\"',
        '\\': '\\'
    };
    var escapeChar = function(c){
        if (c in char2esc) 
            return '\\' + char2esc[c];
        var ord = c.charCodeAt(0);
        return ord < 0x20 ? '\\x0' + ord.toString(16) : ord < 0x7F ? '\\' + c : ord < 0x100 ? '\\x' + ord.toString(16) : ord < 0x1000 ? '\\u0' + ord.toString(16) : '\\u' + ord.toString(16);
    };
    var uneval_asis = function(o){
        return o.toString();
    };
    /* predefine objects where typeof(o) != 'object' */
    var name2uneval = 
    {
        'boolean': uneval_asis,
        'number': uneval_asis,
        'string': function(o){
            return '\'' +
            o.toString().replace(/[\x00-\x1F\'\"\\\u007F-\uFFFF]/g, escapeChar) +
            '\'';
        },
        'undefined': function(o){
            return 'undefined';
        },
        'function': uneval_asis
    };
    
    var uneval_default = function(o, np){
        var src = []; // a-ha!
        for (var p in o) {
            if (!hasOwnProperty.call(o, p)) 
                continue;
            src[src.length] = uneval(p) + ':' + uneval(o[p], 1);
        }
        // parens needed to make eval() happy
        return np ? '{' + src.toString() + '}' : '({' + src.toString() + '})';
    };
    
    uneval_set = function(proto, name, func){
        protos[protos.length] = [proto, name];
        name2uneval[name] = func || uneval_default;
    };
    
    uneval_set(Array, 'array', function(o){
        var src = [];
        for (var i = 0, l = o.length; i < l; i++) 
            src[i] = uneval(o[i]);
        return '[' + src.toString() + ']';
    });
    uneval_set(RegExp, 'regexp', uneval_asis);
    uneval_set(Date, 'date', function(o){
        return '(new Date(' + o.valueOf() + '))';
    });
    
    var typeName = function(o){
        // if (o === null) return 'null';
        var t = typeof o;
        if (t != 'object') 
            return t;
        // we have to lenear-search. sigh.
        for (var i = 0, l = protos.length; i < l; i++) {
            if (o instanceof protos[i][0]) 
                return protos[i][1];
        }
        return 'object';
    };
    
    uneval = function(o, np){
        // if (o.toSource) return o.toSource();
        if (o === null) 
            return 'null';
        var func = name2uneval[typeName(o)] || uneval_default;
        return func(o, np);
    };
}
