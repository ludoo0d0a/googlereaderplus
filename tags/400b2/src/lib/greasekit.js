mycore.env.prefix = "readerplus.";
//GreaseKit
//http://groups.google.com/group/greasekit-users/browse_thread/thread/d0ed6e8919bb6b42
function GM_getValue(name, def, cb){
    value = mycore.storage.getItem(name, def, cb);
    return value;
}
function GM_getValues(id, _names, def, cb){
	var options = [];
	foreach(_names,function(name){
		options.push(id+'_'+name);
	});
	GM_getValue(options, def, function(o){
		//Remove id prefix
		var all= {};
		var re = new RegExp('^'+id+'_');
		iterate(o,function(i,v){
			var id = i.replace(re,'');
			all[id]=v;
		});
		cb(all);
	});
};

/*
function GM_getValues(prefix, _names, cb){
  var res={}, names=_names;
  prefix=prefix||'';
  _getValues(0, cb);
  
  function _getValues(i, fn){
		//if (typeof names[i] ==='string'){
		//	names[i]= {name:names[i]};
	    //}
		var name = names[i].name||names[i];
		
		GM_getValue(prefix+name, name.def, function(value){
			if ((typeof value ==='object') && value.length==1){
				value=value[0];
			}
			res[name]=value;
			
			if (i < names.length-1) {
				_getValues(++i, fn);
			}else{
				fn(res);
			}
		});
	}
}
*/

function GM_getCookieValue(name, def){
    var value;
    var nameEQ = escape(name) + "=", ca = document.cookie.split(';');
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
}
function GM_setValue(name, value, cb){
    try {
        mycore.storage.setItem(name, value, cb);
    } catch (e) {
        console.log('error on GM_setValue[' + n + ']=' + value);
    }
}
function GM_setCookieValue (name, value, options){
    options = (options || {});
    if (options.expiresInOneYear) {
        var today = new Date();
        today.setFullYear(today.getFullYear() + 1, today.getMonth, today.getDay());
        options.expires = today;
    }
    var curCookie = escape(name) +
    "=" +
    escape(value) +
    ((options.expires) ? "; expires=" +
    options.expires.toGMTString() : "") +
    ((options.path) ? "; path=" + options.path : "") +
    ((options.domain) ? "; domain=" + options.domain : "") +
    ((options.secure) ? "; secure" : "");
    document.cookie = curCookie;
}
function clearcache(lang){
    var name, v;
    for (var i = 0; i <= mycore.storage.getLength() - 1; i++) {
        name = mycore.storage.key(i);
        if ((/^readerplus\.theme_/.test(name)) || (/^readerplus\.rps_/.test(name)) 
		|| (/^readerplus\.cache/.test(name)) || (/^cache\./.test(name))   ) {
            mycore.storage.removeItem(name, null, true);
        }
    }
    if (this.getTextPrefs){
    	alert(getTextPrefs(lang, 'global', 'cachecleared', 'en', "Cache cleared"));
    }else{
    	alert("Cache cleared");
    }
}
function openWindow(o, cb){
    sendMessage("window", o, cb);
}

function sendMessage(message, o, callback){
    var a = clone(o) || {};
    a.message = message;
    var fns = ['onload', 'onreadystatechange', 'onerror'];
    for (var i = 0, len = fns.length; i < len; i++) {
        if (o[fns[i]]) {
            a[fns[i]] = true;
        }
    }
    mycore.extension.sendRequest(a, callback);
}

function GM_xmlhttpRequest(o){
    o.method = (o.method) ? o.method.toUpperCase() : "GET";
    if (!o.url) {
        throw ("GM_xmlhttpRequest requires an URL.");
    }
    
    var om = o;
    sendMessage("request", om, function(a){
        if (a.message === (om.callback || "requestdone")) {
            if (a.action === "load") {
                if (typeof om.onload == "function") {
                    om.onload(a, a.request);
                }
            } else if (a.action === "readystatechange") {
                if (typeof om.onreadystatechange == "function") {
                    om.onreadystatechange(a, a.request);
                }
            } else if (a.action === "error") {
                GM_log('error: ' + a.responseText);
                if (typeof om.onerror == "function") {
                    om.onerror(a, a.request);
                }
            }
        }
    });
}
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
    } else {
        //update
        el.innerText = styles;//textContent??
    }
    return el;
}
function GM_addCss(css, id){
    var el = document.createElement("link");
    el.setAttribute("rel", "stylesheet");
    el.setAttribute("type", "text\/css");
    el.setAttribute("href", css);
    if (id) {
        el.id = id;
    }
    document.getElementsByTagName("head")[0].appendChild(el);
}
function GM_addScript(script, remote, cb, cbonerror, scope, time){
    //var id = script.replace(/[\.:-_\/\\]/g, '');
    var id = script;
    var s = document.getElementById(id);
    if (s) {
        if (cbonerror && cb) {
            cb.call(this);
        }
    } else {
        if (remote) {
            GM_xmlhttpRequest({
                method: 'get',
                url: script,
                onload: function(r){
                    if (remote === 'inline') {
                        GM_addjs(script, true, id, cb, scope, time);
                    } else {
                        eval(r.responseText);
                        if (cb) {
                            cb.call(scope || this);
                        }
                    }
                },
                onerror: function(r){
                    if (cbonerror && cb) {
                        cb.call(scope || this);
                    }
                    console.error('Error on loading Javascript ' + script);
                }
            });
        } else {
            GM_addjs(script, false, id, cb, scope, time);
        }
    }
}
function GM_addjs(script, inline, id, cb, scope, time, root){
    var el = document.createElement("script");
    el.setAttribute("type", "text\/javascript");
    if (inline) {
        el.innerText = script;
    } else {
        el.setAttribute("src", script);
    }
    if (id) {
        el.setAttribute("id", id);
    }
	root=root || (document.getElementsByTagName("head")[0]);
	root.appendChild(el);
    if (cb) {
        window.setTimeout(function(){
            cb.call(scope || this);
        }, time || 500);
    }
}
/**
 * Pack for GM_addScript + check + callback
 */
function GM_loadScript(script, remote, check, cb, scope){
    function cbwait(){
        waitlib(check, cb, scope);
    }
    function cbonerror(){
        if (cb) {
            cb.call(scope || this);
        }
    }
    GM_addScript(script, remote, cbwait, cbonerror, scope);
}

function GM_log(log){
    console.log(log);
}

function GM_registerMenuCommand(a, b){
    //
}

function GM_openInTab(url, selected, search, index, windowId, update){
    //send request port to bg
    if (typeof selected == "undefined") {
        selected = true;
    }
    var data = {
        message: 'opentab',
        url: url,
        search: search || url,
        selected: selected,
        index: index,
        windowId: windowId,
		update:update
    };
    mycore.extension.sendRequest(data);
}
if (typeof unsafeWindow === "undefined") {
    unsafeWindow = window;
}
if (typeof(this['clone']) !== 'function') {
    clone = function(o){
        try {
            return eval(uneval(o));
        } catch (e) {
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
    var char2esc = {
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
    var name2uneval = {
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