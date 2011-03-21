
var OAUTHS = {
    twitter: {
        api: {
			url:'http://api.twitter.com/1/statuses/update.json'
		},
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
		api: {
			url: 'https://docs.google.com/feeds/default/private/full/statuses/update.json'
		},
        authcfg: {
			'request_url': 'https://www.google.com/accounts/OAuthGetRequestToken',
	        'authorize_url': 'https://www.google.com/accounts/OAuthAuthorizeToken',
	        'access_url': 'https://www.google.com/accounts/OAuthGetAccessToken',
	        'consumer_key': 'anonymous',
	        'consumer_secret':   'anonymous',
	        'scope': 'https://docs.google.com/feeds',
	        'app_name': 'Readerplus sync settings'
		}
	},
    identi: {
        api: {
			url: 'http://identi.ca/api/statuses/update.json'
		},
        authcfg: {
            'request_url': 'http://identi.ca/api/oauth/request_token',
            'authorize_url': 'http://identi.ca/api/oauth/authorize',
            'access_url': 'http://identi.ca/api/oauth/access_token',
            'consumer_key': '50b76331aaa4523e825367c2d0fca444',
            'consumer_secret': '9c0481828baf8e501e4cf0c0ffdae4b6',
            'scope': 'http://identi.ca/',
            'app_name': 'Identi.ca for Readerplus'
        }
    },
	jaiku:{
		api: {
			url: 'http://api.jaiku.com/json',
			/*authparams:{
				method:'authorize'
			},*/
			params: function(a){
				return {
					method:'post',
					message:'the title of your entry',
					location:'free form location for this entry',
					icon:'the web icon for this icon',
					nick:a.username,
					uuid:'a unique identifier for this entry'
				};
			}
		},
        authcfg: {
            'request_url': 'http://www.jaiku.com/api/request_token', //?method=authorize',
            'authorize_url': 'http://www.jaiku.com/api/authorize', //?perms=write',
            'access_url': 'http://wwww.jaiku.com/api/access_token',
            'consumer_key': '3ad9319262fe40938df06db4e06d2f6c',
            'consumer_secret': '5744eee309c8412a8a766bedfe7ade3d',
            'scope': 'http://www.jaiku.com/',
            'app_name': 'Jaiku for Readerplus'
        }
	}
	
};

function micro(a, cb){
	oauth_sign(a, cb, function(o){
		return o.api.url;
	},  function(o){
		var v = o.api.params;
		var _v = (typeof v == 'function')?v(a):v;	
		if (!_v){
			_v =  {method: 'POST',parameters: {status: a.msg}};
		}
		return _v;
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
	
    o.oauth.authorize(function(token, secret){
        console.log("on authorize for " + id);
		var _url = (typeof url == 'function')?url(o):url;
		var _params = (typeof params == 'function')?params(o):params;		
        o.oauth.sendSignedRequest(_url, function(text, xhr){
            var data=false , r = {
				responseText: xhr.responseText,
                responseHeaders: xhr.responseHeaders,
                status: xhr.status,
                statusText: xhr.statusText,
				responseJson:{}
			};
			
			if (text) {
				try {
					r.responseJson = JSON.parse(text);
				} catch (e) {
				}
			}

			if (xhr.status >= 200 && xhr.status <= 210) {
				r.data = r.responseJson;
				if (r.data && r.data.error){
					r.error=true;
				}
			}else{
				r.error=true;
			}
            if (cb) {
                cb(r);
            }
        }, _params
		);
    });
}

function logout(id){
    oauths[id].oauth.clearTokens();
}
