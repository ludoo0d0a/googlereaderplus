var OAUTHS = {
	twitter : {
		api : {
			url : 'https://api.twitter.com/1/statuses/update.json'
		},
		authcfg : {
			'request_url' : 'https://api.twitter.com/oauth/request_token',
			'authorize_url' : 'https://api.twitter.com/oauth/authorize',
			'access_url' : 'https://api.twitter.com/oauth/access_token',
			'consumer_key' : '94neY4Tz43sAOVGMnFwUg',
			'consumer_secret' : 'dTVZ44vhbh3wXJlG2zRpk6W1DI6sFmQcKyA2h64UE',
			'scope' : 'https://api.twitter.com/',
			'app_name' : 'Twitter for Readerplus'
		}
	},
	gdocs : {
		api : {
			url : 'https://docs.google.com/feeds/default/private/full/statuses/update.json'
		},
		authcfg : {
			'request_url' : 'https://www.google.com/accounts/OAuthGetRequestToken',
			'authorize_url' : 'https://www.google.com/accounts/OAuthAuthorizeToken',
			'access_url' : 'https://www.google.com/accounts/OAuthGetAccessToken',
			'consumer_key' : 'anonymous',
			'consumer_secret' : 'anonymous',
			'scope' : 'https://docs.google.com/feeds',
			'app_name' : 'Readerplus sync settings'
		}
	},
	identi : {
		api : {
			url : 'http://identi.ca/api/statuses/update.json'
		},
		authcfg : {
			'request_url' : 'http://identi.ca/api/oauth/request_token',
			'authorize_url' : 'http://identi.ca/api/oauth/authorize',
			'access_url' : 'http://identi.ca/api/oauth/access_token',
			'consumer_key' : '50b76331aaa4523e825367c2d0fca444',
			'consumer_secret' : '9c0481828baf8e501e4cf0c0ffdae4b6',
			'scope' : 'http://identi.ca/',
			'app_name' : 'Identi.ca for Readerplus'
		}
	},
	linkedin : {
		api : {
			url : 'https://linkedin.com/.../update.json'
		},
		authcfg : {
			'request_url' : 'https://api.linkedin.com/uas/oauth/requestToken',
			'authorize_url' : 'https://www.linkedin.com/uas/oauth/authorize',
			'access_url' : 'https://api.linkedin.com/uas/oauth/accessToken',
			'consumer_key' : '03Lo9p85VlPONMBZeemRektEGq8_hB_J3WZky9nRRQW4dcwnEByjInXupo7DpF9V',
			'consumer_secret' : 'XU2i8HtQB_G2DVKBN_MJO5rEM0oMTky7tEkRlm8xnkFktWc46fwzzcbepsD-At2I',
			'scope' : 'http://www.linkedind.com/',
			'app_name' : 'LinkedIn for Readerplus'
		}
	},
	weibo : {
		api : {
			url : 'http://api.t.sina.com.cn/statuses/update.json'
		},
		authcfg : {
			'request_url' : 'http://api.t.sina.com.cn/oauth/request_token',
			'authorize_url' : 'http://api.t.sina.com.cn/oauth/authorize',
			'access_url' : 'http://api.t.sina.com.cn/oauth/access_token',
			'consumer_key' : '628632117',
			'consumer_secret' : '2e7332e96a166ecfd4438917644634aa',
			'scope' : 'http://api.t.sina.com.cn/',
			'app_name' : 'Weibo for Readerplus'
		}
	},
	jaiku : {
		api : {
			url : 'http://api.jaiku.com/json',
			/*authparams:{
			 method:'authorize'
			 },*/
			params : function(a) {
				return {
					parameters : {
						method : 'post',
						message : 'the title of your entry',
						location : 'free form location for this entry',
						icon : 'the web icon for this icon',
						nick : a.username,
						uuid : 'a unique identifier for this entry'
					}
				};
			}
		},
		authcfg : {
			'request_url' : 'http://www.jaiku.com/api/request_token', //?method=authorize',
			'authorize_url' : 'http://www.jaiku.com/api/authorize', //?perms=write',
			'access_url' : 'http://wwww.jaiku.com/api/access_token',
			'consumer_key' : '3ad9319262fe40938df06db4e06d2f6c',
			'consumer_secret' : '5744eee309c8412a8a766bedfe7ade3d',
			'scope' : 'http://www.jaiku.com/',
			'app_name' : 'Jaiku for Readerplus'
		}
	},
	tumblr : {
		api : {
			url : 'http://api.tumblr.com/v2/blog/{blogname}.tumblr.com/post',
			params : function(a) {
				return {
					method : 'post',
					headers : {
						'Content-Type' : 'application/json'
					},
					body : JSON.stringify({
						title : a.title,
						url : a.url,
						description : a.desc + '_',
						body : a.desc + '_',
						type : 'link',
						//state:'queue',
						//tags:a.tags
					})
				};
			}
		},
		authcfg : {
			'request_url' : 'http://www.tumblr.com/oauth/request_token',
			'authorize_url' : 'http://www.tumblr.com/oauth/authorize',
			'access_url' : 'http://www.tumblr.com/oauth/access_token',
			'consumer_key' : 'yGKl3JKPR43oPkvvaWOdxTvkUxkN4DgOHTJHXqdzw9puyCnvt2',
			'consumer_secret' : '2A3vEfLdYKIWj6oOpwKACoyPMolQfVbGcT1jGhPtTiIKERZPkE',
			'scope' : 'http://www.tumblr.com/',
			'app_name' : 'Tumblr for Readerplus'
		}
	},
	readabilitylater : {
		api : {
			url : 'https://www.readability.com/api/rest/v1/bookmarks',
			params : function(a) {
				return {
					method : 'post',
					headers : {
						'Content-Type' : 'application/x-www-form-urlencoded'
					},
					body : urlEncode({
						url : a.url
					}),
					parameters : {
						'oauth_method': 'PLAINTEXT',
						'oauth_signature_method': 'PLAINTEXT'
					}
				};
			}
		},
		authcfg : {
			'request_url' : 'https://www.readability.com/api/rest/v1/oauth/request_token',
			'authorize_url' : 'https://www.readability.com/api/rest/v1/oauth/authorize',
			'access_url' : 'https://www.readability.com/api/rest/v1/oauth/access_token',
			'consumer_key' : 'LudoO',
			'consumer_secret' : 'GaAzxmuqvmvMUJk7ASwb39bWwjqdK6x6',
			'scope' : 'https://www.readability.com/',
			'app_name' : 'Readability for Readerplus'
		}
	},
};

//Backward compatibility
function micro(a, cb) {
	return postoauth(a,cb);
}

function postoauth(a, cb) {
	oauth_sign(a, cb, function(o) {
		o.api=o.api||{};
		var url = o.api.url || '';
		if(a.tpl && a.tpl.url) {
			url = fillTpl(url, a.tpl.url || {});
		}
		return url;
	}, function(o) {
		var v = o.api.params;
		var _v = ( typeof v == 'function') ? v(a) : v;
		if(!_v) {
			_v = {
				method : 'POST',
				parameters : {
					status : a.msg
				}
			};
		}
		return _v;
	});
}

function oauth_sign(a, cb, url, params) {
	var id = ( typeof a === 'string') ? a : a.id;
	var o = OAUTHS[id];
	if(!o) {
		return false;
	}
	if(!o.oauth) {
		o.oauth = ChromeExOAuth.initBackgroundPage(o.authcfg);
	}

	o.oauth.authorize(function(token, secret) {
		console.log("on authorize for " + id);
		var _url = ( typeof url === 'function') ? url(o) : url;
		var _params = ( typeof params === 'function') ? params(o) : params;
		o.oauth.sendSignedRequest(_url, function(text, xhr) {
			var data = false, r = {
				responseText : xhr.responseText,
				responseHeaders : xhr.responseHeaders,
				status : xhr.status,
				statusText : xhr.statusText,
				responseJson : {}
			};

			if(text) {
				try {
					r.responseJson = JSON.parse(text);
				} catch (e) {
				}
			}

			if(xhr.status >= 200 && xhr.status <= 210) {
				r.data = r.responseJson;
			} else {
				r.error = true;
			}
			if(r.responseJson.error) {
				r.error = r.responseJson.error;
			} else if(r.responseJson.response && r.responseJson.response.errors) {
				r.error = r.responseJson.response.errors.join(';');
				//tumblr
			}
			if(cb) {
				cb(r);
			}
		}, _params);
	});
}

function logout(id) {
	oauths[id].oauth.clearTokens();
}