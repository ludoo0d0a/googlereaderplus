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
        //console.log('error on GM_setValue[' + n + ']=' + value);
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
            return apply({},o);
            //return JSON.parse(JSON.stringify(o));
            //return eval(uneval(o));
        } catch (e) {
            return o;
        }
    };
}

function setPackage(name, prefs){
	prefs=prefs||{};
	iterate(GRP.packages[name], function(i, data){
        prefs[i] = true;
        if (data && (typeof data === 'object')) {
            iterate(data, function(k, o){
                prefs[i + '_' + k] = o;
            });
        }
    });
    return prefs;
}
