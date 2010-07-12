function request(a, local, cb){
    var xhr = new XMLHttpRequest();
    var method = a.method || 'get';
    method = method.toLowerCase();
    var url = a.url;
    if (a.parameters && (method === 'get')) {
        var params = [];
        for (var k in a.parameters) {
            params.push(k + '=' + encodeURIComponent(a.parameters[k]));
        }
        var sep = (url.indexOf('?') > 0) ? '&' : '?';
        url += sep + params.join('&');
    }
    xhr.open(method, url, true);
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
                var xhr = o.target;
                if (xhr) {
                    if (local && typeof a['on' + f] === "function") {
                        var res = enhanceResponse(a, xhr);
                        a['on' + f].call(this, res);
                    } else {
                        var res = {
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

