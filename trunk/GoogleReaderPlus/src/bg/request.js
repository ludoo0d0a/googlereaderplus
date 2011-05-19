function request(a, local, cb){
    if (a.injected) {
		/*chrome.tabs.getSelected(null, function(tab){
            chrome.tabs.executeScript(tab.id, {
                code: getInjectedXhrCode(a)
            });
        });*/
		//GM_addjs(getInjectedXhrCode(a), true, '_grp_xhr');
    } else {
		bg_request(a, local, cb);
    }
}
function getInjectedXhrCode(o){
	var p = null;
	if (o.method.toLowerCase() === 'post') {
		p = '"'+serializePost(o.parameters)+'"';
	}
	var code =  'var xhr = new XMLHttpRequest();\n'+
	'xhr.open("'+o.method+'", "'+o.url+'", true);\n'+
	'xhr.onload=function(x){\n'+
	'  var xhr=x.target;\n'+
	'  console.log(xhr.status);\n'+
	'};\n'+
	'xhr.onerror=function(x){\n'+
	'  console.log(x.target);\n'+
	'};\n'+
	'xhr.send('+p+');\n';
	
	return "(function(){\n" + code +"\n}());\n";
}

function bg_request(a, local, cb){
    if (a && a.cached){
		//Retrieve from cache
		var c = getFromCache(a);
		if (c){
            sendResponse(c.cache, cb);
			return;
		}
	}
	
	var xhr = new XMLHttpRequest();
    var method = a.method || 'get';
    method = method.toLowerCase();
    var url = a.url;
    if (a.parameters /*&& (method === 'get')*/) {
        var params = [];
        for (var k in a.parameters) {
            params.push(k + '=' + encodeURIComponent(a.parameters[k]));
        }
        var sep = (url.indexOf('?') > 0) ? '&' : '?';
        url += sep + params.join('&');
    }
    xhr.open(method, url, true);
	
	if (method !== 'get'){
			a.headers=a.headers||{};
			a.headers['Content-Type']='application/x-www-form-urlencoded; charset=UTF-8';
	}
	
	if (a.auth){
		if (a.auth.method === 'basic') {
			a.headers = a.headers || {};
			a.headers['Authorization'] = 'Basic ' + base64.encode(a.auth.username + ':' + a.auth.password);
		}
	}
    //headers
    if (a.headers) {
        for (var kh in a.headers) {
            xhr.setRequestHeader(kh, a.headers[kh]);
        }
    }
    //a['onload']=true;//force onload
    var fns = ['readystatechange', 'error', 'load'];
    var xpath = a.xpath;
    for (var i = 0, len = fns.length; i < len; i++) {
        var name = fns[i];
        if (a['on' + name]) {
            var f = '' + name;
            xhr['on' + f] = function(o){
                var res, xhr = o.target;
                if (xhr) {
                    if (local && typeof a['on' + f] === "function") {
                        res = enhanceResponse(a, xhr);
                        a['on' + f].call(this, res);
                    } else {
                        res = {
                            message: a.callback || "requestdone",
                            action: f,
                            responseXML: null, //xhr.responseXML,
                            responseText: xhr.responseText,
                            responseHeaders: xhr.responseHeaders,
                            status: xhr.status,
                            statusText: xhr.statusText,
                            request: a
                        };
                        res = enhanceResponse(a, res);
                        sendResponse(res, cb);
                    }
                }
            };
        }
    }
    try {
        var typesSend = {
            post: true,
            put: true,
            'delete': true
        };
        var d = typesSend[method] ? a.data : null;
        if (d && typeof d !== 'string') {
            d = serializePost(d);
        }
        xhr.send(d);
    } catch (e) {
        console.log('Error catched on xhr');
        var o = {
            message: a.callback || "requestdone",
            responseText: e.message || 'Error',
            status: (e.name || '') + ' ' + (e.code || 0),
            statusText: (e.name || '') + ' ' + (e.code || 0),
            action: 'error',
            error: e
        };
        if (local && typeof a.onerror === "function") {
            a.onerror.call(this, o);
        } else {
            sendResponse(o, cb);
        }
    }
    
}

function enhanceResponse(a, res){
    if (a.dataType === 'json' && res.responseText) {
        try {
            res.responseJson = JSON.parse(res.responseText);
        } catch (e) {
        }
    }
    if (a.xpath && xhr.responseXML) {
        res.xml = serializeXml(getElements(a.xpath, xhr.responseXML));
    }
	if (a.cached) {
        //save in cache
		setInCache(a,res);
    }
    return res;
}

function sendResponse(a, cb){
    if (cb) {
        cb(a);
    } else {
        //myport.postMessage(a);
    }
}

function sendNull(cb){
    if (cb) {
        cb({});
    }
}

/**
 * Cache
 */
function getFromCache(a){
	var metas = mycore.storage.getItem('grp.cache.meta', {});
	var url = a.url, o=false, meta = metas[url] ;
	if (meta) {
		var cache = mycore.storage.getItem('grp.cache.data_' + meta.i, false);
		if (cache){
			cache=cache||{};
			cache.status=200;
			o = {meta: meta,cache: cache};
			
			//Obsolete ?
			var max_time = (a.cached && typeof a.cached=='object')?a.cached.time:0;
			max_time=max_time || 8*60*60*1000;//8h default
			if (meta.time-((new Date()).getTime())>max_time){
				//invalidate
				o = false;
			}
		}
	}
	return o;
}
function setInCache(a, res){
	var metas = mycore.storage.getItem('grp.cache.meta', {});
	var o=false, url = a.url;
	metas[url] = metas[url] || {};
	metas[url].time = (new Date()).getTime();
	metas[url].i =  metas[url].i || (count(metas)+1);
	var cache = {};
	
	if (res.responseJson){
		cache = {
			responseJson: res.responseJson
		};
	}else{
		cache = {
			responseText: (res.responseText||'').replace(/\n/g,'')
		};
	}
	var s = mycore.storage.setItem('grp.cache.data_' + metas[url].i, cache);
	if (s) {
		//ensure tablespace is enough
		mycore.storage.setItem('grp.cache.meta', metas);
	}
	
}
function clearRequestCache(){
	var m = mycore.storage.getItem('grp.cache.meta', {});
	iterate(m,function(i,o){
		mycore.storage.removeItem('grp.cache.data' + m.i||0);
	});
	mycore.storage.setItem('grp.cache.meta', {});
}
