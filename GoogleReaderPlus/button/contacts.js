/*
 * oauth sample
 * http://code.google.com/chrome/extensions/trunk/tut_oauth.html
 * 
 * http://src.chromium.org/viewvc/chrome/trunk/src/chrome/common/extensions/docs/examples/extensions/oauth_contacts/
 * 
 */

/*
 * Manifest permissions : 
 */
/*
	"http://www.google.com/m8/feeds/*",
    "https://www.google.com/accounts/OAuthGetRequestToken",
    "https://www.google.com/accounts/OAuthAuthorizeToken",
    "https://www.google.com/accounts/OAuthGetAccessToken"
*/
	
var DOCLIST_SCOPE = 'https://docs.google.com/feeds';
var DOCLIST_FEED = DOCLIST_SCOPE + '/default/private/full/';
var CONTACTS_SCOPE = 'http://www.google.com/m8/feeds/';
var CONTACTS_FEED = 'http://www.google.com/m8/feeds/';
	  
var oauth = ChromeExOAuth.initBackgroundPage({
    'request_url': 'https://www.google.com/accounts/OAuthGetRequestToken',
    'authorize_url': 'https://www.google.com/accounts/OAuthAuthorizeToken',
    'access_url': 'https://www.google.com/accounts/OAuthGetAccessToken',
    'consumer_key': 'anonymous',
    'consumer_secret': 'anonymous',
    'scope': CONTACTS_SCOPE,
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
	jQuery.each(data.feed.entry, function(i, entry){
		 var contact = {
            'name': entry['title']['$t'],
            'id': entry['id']['$t'],
            'emails': []
        };
        
		jQuery.each(entry['gd$email'], function(j,email){
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
        var url = 'http://www.google.com/m8/feeds/contacts/default/full';
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

