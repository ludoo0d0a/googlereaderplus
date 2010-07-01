/**
 * @author Valente
 */
//*************** CORE ************************
//prod: hhcknjkmaaeinhdjgimjnophgpbdgfmg
//home crx : njidamgjohnfbkeagfbnkllfkdnlpjhi
//debug : cmkepfncdncbdpmdfnkbpenhfbmmnebm

//*************** ICON ************************
//prod: ecpcafinfpjgabomoamkhkgnpgpmdmeo
//home crx : aencokegfecfkpckmiklpcklhdblkdgj
//unpacked : lomblngfikeinenjgnkcnhbdgchkaeai

var GUID_CORE = 'hhcknjkmaaeinhdjgimjnophgpbdgfmg';
var GUID_ICON = mycore.getGUID();
var env = 'unpacked'; //readCookie('env');
if (env) {
	console.log('env toolbar=' + env);
}
//GM_setCookieValue('env','home');
if (env && env == 'unpacked') {
	GUID_CORE = 'lnmcgabhnnfjenanodagmpjjmgbfbgje';
}
console.log('icon GUID_CORE=' + GUID_CORE);
console.log('icon GUID_ICON=' + GUID_ICON);
var LOCALPATH = 'chrome-extension://'+GUID_CORE;

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
