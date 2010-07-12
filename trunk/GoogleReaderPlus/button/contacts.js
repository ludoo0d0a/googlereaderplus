/*
 * oauth sample
 * http://code.google.com/chrome/extensions/trunk/tut_oauth.html
 * 
 * http://src.chromium.org/viewvc/chrome/trunk/src/chrome/common/extensions/docs/examples/extensions/oauth_contacts/
 * 
 */
var oauth = ChromeExOAuth.initBackgroundPage({
    'request_url': 'https://www.google.com/accounts/OAuthGetRequestToken',
    'authorize_url': 'https://www.google.com/accounts/OAuthAuthorizeToken',
    'access_url': 'https://www.google.com/accounts/OAuthGetAccessToken',
    'consumer_key': 'anonymous',
    'consumer_secret': 'anonymous',
    'scope': 'http://www.google.com/m8/feeds/',
    'app_name': 'Readerplus - OAuth'	
});


var contacts = null;

function setIcon(){
    if (oauth.hasToken()) {
        chrome.browserAction.setIcon({
            'path': 'images/19.png'
        });
    } else {
        chrome.browserAction.setIcon({
            'path': 'images/19-gray.png'
        });
    }
};

function onContacts(text, xhr){
    contacts = [];
    var data = JSON.parse(text);
	$.each(data.feed.entry, function(entry){
		 var contact = {
            'name': entry['title']['$t'],
            'id': entry['id']['$t'],
            'emails': []
        };
        
		$.each(entry['gd$email'], function(email){
            contact['emails'].push(email['address']);
        });
        
        if (!contact['name']) {
            contact['name'] = contact['emails'][0] || "<Unknown>";
        }
        contacts.push(contact);
	});
    
    chrome.tabs.create({
        'url': 'contacts.html'
    });
};

function getContacts(){
    oauth.authorize(function(){
        console.log("on authorize");
        setIcon();
        var url = "http://www.google.com/m8/feeds/contacts/default/full";
        oauth.sendSignedRequest(url, onContacts, {
            'parameters': {
                'alt': 'json',
                'max-results': 100
            }
        });
    });
};

function logout(){
    oauth.clearTokens();
    setIcon();
};

setIcon();
//chrome.browserAction.onClicked.addListener(getContacts);
//chrome.browserAction.setPopup({popup :'popup.html'});

