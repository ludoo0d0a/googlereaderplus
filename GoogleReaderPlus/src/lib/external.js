/**
 * @author Valente
 */
//*************** ICON ************************
//debug : 
//home crx : aencokegfecfkpckmiklpcklhdblkdgj
//prod: 

//*************** CORE ************************
//debug : cmkepfncdncbdpmdfnkbpenhfbmmnebm
//home crx : njidamgjohnfbkeagfbnkllfkdnlpjhi
//prod: hhcknjkmaaeinhdjgimjnophgpbdgfmg

var GUID_CORE = 'hhcknjkmaaeinhdjgimjnophgpbdgfmg';
var GUID_ICON = '?';
var env = 'home';
if (env && env == 'home') {
	GUID_CORE = 'njidamgjohnfbkeagfbnkllfkdnlpjhi';
	GUID_ICON = 'aencokegfecfkpckmiklpcklhdblkdgj';
} else if (env && env == 'debug') {
	GUID_CORE = 'cmkepfncdncbdpmdfnkbpenhfbmmnebm';
	GUID_ICON = '';
}

function call_icon(message, options, callback){
	external_call(GUID_ICON, message, options, callback);
}
function call_core(message, options, callback){
	external_call(GUID_CORE, message, options, callback);
}
function external_call(guid, message, options, callback){
    var emptyFn = function(){
    };
    chrome.extension.sendRequest(guid, 
    {
        message: message,
        options: options || {}
    }, callback || emptyFn);
    console.log('send "' + message + '" on ' + guid);
	console.log(options);
}
