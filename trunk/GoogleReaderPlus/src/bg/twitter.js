
var TWITTER_VERSION = '1';
var TWITTER_API = 'http://api.twitter.com/' + TWITTER_VERSION;
var TWITTER_SCOPE = 'http://twitter.com/';

var oauth = ChromeExOAuth.initBackgroundPage({
    'request_url': 'http://twitter.com/oauth/request_token',
    'authorize_url': 'http://twitter.com/oauth/authorize',
    'access_url': 'http://twitter.com/oauth/access_token',
    'consumer_key': '94neY4Tz43sAOVGMnFwUg',
    'consumer_secret': 'dTVZ44vhbh3wXJlG2zRpk6W1DI6sFmQcKyA2h64UE',
    'scope': TWITTER_SCOPE,
    'app_name': 'Twitter for Readerplus'
});

function tweet(a, cb){
    if (!a.msg) {
        return false;
    }
    oauth.authorize(function(){
        console.log("on authorize");
        var url = TWITTER_API + '/statuses/update.json';
        oauth.sendSignedRequest(url, function(text, xhr){
            var data = JSON.parse(text);
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


function logout(){
    oauth.clearTokens();
}

