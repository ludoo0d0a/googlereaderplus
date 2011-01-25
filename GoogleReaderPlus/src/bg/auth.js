
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
	gdocs:{
		api: 'https://docs.google.com/feeds/default/private/full/',
        authcfg: {
			'request_url': 'https://www.google.com/accounts/OAuthGetRequestToken',
	        'authorize_url': 'https://www.google.com/accounts/OAuthAuthorizeToken',
	        'access_url': 'https://www.google.com/accounts/OAuthGetAccessToken',
	        'consumer_key': 'anonymous', /*'www.pitaso.com',*/
	        'consumer_secret':   'anonymous', /*'Y70x/jA2wD66oH6mk32LWozU',*/
	        'scope': 'https://docs.google.com/feeds',
	        'app_name': 'Readerplus sync settings'
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
	oauth_sign(a, cb, function(o){
		return o.api + '/statuses/update.json';
	},  {
		method: 'POST',
		parameters: {
			status: a.msg
		}
	});
}

function oauth_sign(a, cb, url, params){
	var id = (typeof a ==='string')?a:a.id;
	var o = OAUTHS[id];
    if (!o) {
        return false;
    }
    if (!o.oauth) {
        o.oauth = ChromeExOAuth.initBackgroundPage(o.authcfg);
    }
    o.oauth.authorize(function(){
        console.log("on authorize for " + id);
		var _url = (typeof url == 'function')?url(o):url;
		var _params = (typeof params == 'function')?params(o):params;		
        o.oauth.sendSignedRequest(_url, function(text, xhr){
            var data = false;
			if (xhr.status >= 200 && xhr.status <= 210) {
				try {
					if (text) {
						data = JSON.parse(text);
					}
				} catch (e) {
				
				}
			}
            if (cb) {
                cb(data, xhr);
            }
        }, _params
		);
    });
}

function logout(id){
    oauths[id].oauth.clearTokens();
}

