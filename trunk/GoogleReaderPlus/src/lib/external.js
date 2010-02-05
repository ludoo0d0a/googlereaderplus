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
//debug : xxx-icon-debug

var GUID_CORE = 'hhcknjkmaaeinhdjgimjnophgpbdgfmg';
var GUID_ICON = 'ecpcafinfpjgabomoamkhkgnpgpmdmeo';
var env = '';
if (env && env == 'home') {
	GUID_CORE = 'njidamgjohnfbkeagfbnkllfkdnlpjhi';
	GUID_ICON = 'aencokegfecfkpckmiklpcklhdblkdgj';
} else if (env && env == 'debug') {
	GUID_CORE = 'cmkepfncdncbdpmdfnkbpenhfbmmnebm';
	GUID_ICON = 'xxx-icon-debug';
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
