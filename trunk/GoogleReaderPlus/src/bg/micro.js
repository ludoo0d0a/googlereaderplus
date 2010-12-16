
var OAUTHS = {
    twitter: {
        api: 'http://api.twitter.com/1',
        authcfg: {
            'request_url': 'http://twitter.com/oauth/request_token',
            'authorize_url': 'http://twitter.com/oauth/authorize',
            'access_url': 'http://twitter.com/oauth/access_token',
            'consumer_key': '94neY4Tz43sAOVGMnFwUg',
            'consumer_secret': 'dTVZ44vhbh3wXJlG2zRpk6W1DI6sFmQcKyA2h64UE',
            'scope': 'http://twitter.com/',
            'app_name': 'Twitter for Readerplus'
        }
    },
    identi: {
        api: 'http://identi.ca/api',
        authcfg: {
            'request_url': 'http://identi.ca/api/oauth/request_token',
            'authorize_url': 'http://identi.ca/api/oauth/authorize',
            'access_url': 'http://identi.ca/api/oauth/access_token',
            'consumer_key': '50b76331aaa4523e825367c2d0fca444',
            'consumer_secret': '9c0481828baf8e501e4cf0c0ffdae4b6',
            'scope': 'http://identi.ca/',
            'app_name': 'Identi.ca for Readerplus'
        }
    }
};

function micro(a, cb){
    var o = OAUTHS[a.id];
    if (!o || !a.msg) {
        return false;
    }
    if (!o.oauth) {
        o.oauth = ChromeExOAuth.initBackgroundPage(o.authcfg);
    }
    o.oauth.authorize(function(){
        console.log("on authorize for " + a.id);
        var url = o.api + '/statuses/update.json';
        o.oauth.sendSignedRequest(url, function(text, xhr){
            var data = false;
            try {
                if (text) {
                    data = JSON.parse(text);
                }
            } catch (e) {
            
            }
            if (cb) {
                cb(data);
            }
        }, {
            method: 'POST',
            parameters: {
                status: a.msg
            }
        });
    });
}

function logout(id){
    oauths[id].oauth.clearTokens();
}

