var _BASE_URL = "https://www.google.com/reader";
var api_urls = {
    subscriptions: "/api/0/stream/contents/user/-/pref/com.google/subscriptions&client=readerplus",
    unreadcount: "/api/0/unread-count?output=json&refresh=true&client=readerplus",
    unread: "/api/0/stream/contents/user/-/state/com.google/reading-list?n={n}&ck={ck}&client=readerplus",
    read: "/api/0/stream/contents/user/-/state/com.google/read?n={n}&ck={ck}&client=readerplus",
    label: "/reader/atom/user/-/label/{label}",
    //	feed:"/api/0/stream/contents/feed/{feed}?ot=1276437600&r=n&xt=user%2F10147519360553949837%2Fstate%2Fcom.google%2Fread&sharers=CJXgrfPbDRCOuK_fswQQmtDv0AkQ9dbmqP0IEPjL6qKeBxCyrubhlwQQ7ayFmYYG&n=20&ck=1279033108960"
    feed: "/api/0/stream/contents/{feed}?n={n}&ck={ck}&client=readerplus",
    edit: "/api/0/edit-tag",
    mark_read: "user/-/state/com.google/read",
    mark_star: "user/-/state/com.google/starred",
    starred: "/api/0/stream/contents/user/-/state/com.google/starred?n={n}&ck={ck}&client=readerplus",
    label: "/api/0/stream/contents/user/-/label/{label}&ck={ck}&client=readerplus",
    token: "/api/0/token"
}

function getunread(a, cb){
    var o;
    if (a.label) {
        o = {
            action: 'label',
            label: a.label || ''
        };
    } else if (a.feed) {
        o = {
            action: 'feed',
            feed: a.feed,
			count: a.count || 100
        };
    } else {
        o = {
            action: 'unread',
            count: a.count || 100
        };
    }
	if (o) {
		getreader(o, cb);
	}
}


function getstarred(a, cb){
    var o = {
        action: 'starred',
        count: a.count || 100
    };
    getreader(o, cb);
}

function getreader(o, cb){
    var a = {
        n: o.count,
        ck: new Date().getTime(),
        client: 'readerplus',
        label: encodeURIComponent(o.label||''),
		feed: encodeURIComponent(o.feed||'')
	};
    var url = fillTpl(_BASE_URL + api_urls[o.action], a);
	console.log(url);
    request({
        url: url,
        dataType: 'json',
        onload: function(res){
            cb((res) ? res.responseJson : false);
        },
        onerror: function(res){
            cb(false);
        }
    }, true);
}

var token;
function getToken(cb){
    //clear all
    token = '';
    if (token) {
        //already get one
        cb(token);
    } else {
        request({
            method: 'get',
            url: _BASE_URL + api_urls.token,
            onload: function(xhr){
                token = xhr.responseText;
                cb(token);
            }
        }, true);
    }
}

function mark(a, cb){
    getToken(function(token){
        a = a || {};
        a.token = token;
        marktoken(a, cb);
    });
}

function marktoken(a, cb){
    var o = {
        ck: new Date().getTime(),
        i: a.id,
        async: true,
        T: a.token,
        pos: 0,
        client: 'readerplus'
    };
    if (a.streamId) {
        o.s = a.streamId;
    }
    //,status:a.status
    o.a = api_urls['mark_' + a.action];
    
    //TODO: a.status
    //var url = fillTpl(_BASE_URL + api_urls['mark_' + a.action], o);
    var url = _BASE_URL + api_urls.edit;
    if (url) {
        //console.log('post');
        //console.log(url);
        //console.log(o);
        request({
            method: 'post',
            url: url,
            parameters: o,
            dataType: 'json'
        }, true);
    }
}
