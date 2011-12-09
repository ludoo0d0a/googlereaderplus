//GreaseKit
function GM_getValue(name, def){
    var value;
    var nameEQ = escape("_greasekit_" + name) + "=", ca = document.cookie.split(';');
    for (var i = 0, c; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') 
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) {
            value = unescape(c.substring(nameEQ.length, c.length));
            break;
        }
    }
    if (!value && def !== null) {
        value = def;
    }
    try {
        if (typeof value === 'string') {
            value = JSON.parse(value);
        }
    } catch (e) {
    
    }
    return value;
}
function GM_setValue(name, value, options){
    options = (options || {});
    if (typeof value !== 'string') {
        value = JSON.stringify(value);
    }
    if (options.expiresInOneYear) {
        var today = new Date();
        today.setFullYear(today.getFullYear() + 1, today.getMonth, today.getDay());
        options.expires = today;
    }
    var curCookie = escape("_greasekit_" + name) +
    "=" +
    escape(value) +
    ((options.expires) ? "; expires=" +
    options.expires.toGMTString() : "") +
    ((options.path) ? "; path=" + options.path : "") +
    ((options.domain) ? "; domain=" + options.domain : "") +
    ((options.secure) ? "; secure" : "");
    document.cookie = curCookie;
}
function GM_xmlhttpRequest(a){
    var xhr = new XMLHttpRequest();
    var method = a.method || 'get';
    method = method.toLowerCase();
    xhr.open(method, a.url, true);
    var xpath = a.xpath;
    xhr.onload = function(o){
        a.onload(o.target);
    }
    try {
        xhr.send(null);
    } catch (e) {
        //
    }
}
Array.forEach = function(a, f){
    Array.prototype.forEach.call(a, f);
};
Array.slice = function(a){
    return Array.prototype.slice.call(a);
};
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
        if (c in char2esc) return '\\' + char2esc[c];
        var ord = c.charCodeAt(0);
        return ord < 0x20 ? '\\x0' + ord.toString(16) : ord < 0x7F ? '\\' + c : ord < 0x100 ? '\\x' + ord.toString(16) : ord < 0x1000 ? '\\u0' + ord.toString(16) : '\\u' + ord.toString(16);
    };
    var uneval_asis = function(o){
        return o.toString();
    };
    // predefine objects where typeof(o) != 'object' 
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
            if (!hasOwnProperty.call(o, p)) continue;
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
        if (t != 'object') return t;
        // we have to lenear-search. sigh.
        for (var i = 0, l = protos.length; i < l; i++) {
            if (o instanceof protos[i][0]) return protos[i][1];
        }
        return 'object';
    };
    uneval = function(o, np){
        // if (o.toSource) return o.toSource();
        if (o === null) return 'null';
        var func = name2uneval[typeName(o)] || uneval_default;
        return func(o, np);
    };
}
function clone(a){
    try {
        return JSON.parse(JSON.stringify(o));
    } catch (e) {
        throw (e);
    }
}

//prefetch
function loadPrefetch(){
    var first = (GRP_prefetch.first || 25), next = (GRP_prefetch.next || 15), list = (GRP_prefetch.list || 60);
    var version = '0.2.4', id = 'GoogleReaderPrefetchMore';
    var config = (/*GM_getValue(id,*/ {
        version: '',
        src: '',
        targetFunction: '',
        targetValue: ''
    });
    Array.slice(document.getElementsByTagName('script')).forEach(function(e){
        if (e.src && /\/reader\/ui\/\d+-\w+-scroll.js/.test(e.src)) {
            if (config.src == e.src && config.version == version) {
                more(config.targetFunction, config.targetValue);
                return;
            }
            config.version = version;
            config.src = e.src;
            GM_xmlhttpRequest({
                method: 'GET',
                url: config.src,
                onload: function(res){
                    var s = res.responseText;
                    var a, r;
                    // o.Sl=function(){return St(this.tb())?this.Xa?1:5:20};
                    s = s.split(/;[^;]+\.([^.]+)=[^=]+\{[^{]+1:5:20/)[0];
                    if (!RegExp.$1) 
                        throw new Error('Prefetch failed. Something wrong with the js.');
                    a = RegExp.$1;
//console.log('a1='+a);
//console.log('s1='+s);
					//new Ut(this.ba,q(this.Cg,this),q(this.Jo,this),q(this.Lu,this),q(this.ys,this),q(this.Sl,this));
					r = new RegExp('new ([a-zA-Z]+)\\([^;]+this\.' + a + '[^a-zA-Z]');
                    s = s.split(r)[0];
                    a = RegExp.$1;
//console.log('a2='+a);
//console.log('s2='+s);
					//function Ut(a,b,c,d,e,g){this.ba=a;this.AE=b;this.PE=c;this.CA=d;this.dy=e;this.QE=g;this.fl={kH:0,Dl:0}}
					r = new RegExp('function ' + a + '\\([a-zA-Z]+,[a-zA-Z]+,[a-zA-Z]+,[a-zA-Z]+,[a-zA-Z]+,([a-zA-Z]+)\\)');
                    s = s.split(r)[2];
                    a = RegExp.$1;
//console.log('a3='+a);
//console.log('s3='+s);
                    r = new RegExp('\\{[^}]+this.([a-zA-Z]+)=' + a);
                    s = s.split(r)[2];
                    a = RegExp.$1;
//console.log('a4='+a);
//console.log('s4='+s);
                    // function Vt(a){var b=a.fl.Dl;a.fl.Dl+=a.QE();var c=a.fl.Dl;a.dy(a.ba.nj(),a.ba.Oh());for(b=b;b<c;b++)a.ba.Eh(b,q(a.Cg,a,b))}
					r = new RegExp('function ([a-zA-Z]+)\\([^\\)]*\\)\\{[^}]+=([a-zA-Z]+\\.' + a + '\\(\\))[^}]+\\}');
                    r.test(s);
                    if (a == RegExp.$1) 
                        throw new Error('Prefetch failed. Something wrong with the js!!');
                    config.targetFunction = RegExp.$1;
                    config.targetValue = RegExp.$2;
                    GM_setValue(id, config);
                    more(config.targetFunction, config.targetValue);
                }
            });
        }
    });
    function more(targetFunction, targetValue){
        var n = 'window.' + targetFunction, v = targetValue, e = eval, p;
        try {
            p = e(n);
        } catch (x) { // for Firefox prior to 3.5
            e = window.eval, n = targetFunction, p = e(n);
        }
		var up = uneval(p);
        var r = uneval(p).replace(v, ['(', v, ' == 5)? ', first, ' : (', v, ' == 1)? ', next, ' : (', v, ' == 20)? ', list, ' : ', v].join('')
		).replace(/{/, '{with(window){').replace(/}$/, '}}');
		
		//console.log(r);
        e(n + '=' + r);
    }
}

if (window.GRP_prefetch) {
    loadPrefetch();
}

