/**
 * @author Valente
 */
var GUID_CORE = mycore.getGUID(), 
GUID_CORE_PROD = 'hhcknjkmaaeinhdjgimjnophgpbdgfmg', 
GUID_ICON = 'ecpcafinfpjgabomoamkhkgnpgpmdmeo';
var env = ''; //readCookie('env');
if (GUID_CORE!==GUID_CORE_PROD){
	env='unpacked';
	console.log('env=' + env);
	GUID_ICON = 'cgpgjbahhnkejmclppnpkcoildokbmem';
	console.log('GUID_CORE=' + GUID_CORE);
	console.log('GUID_ICON=' + GUID_ICON);
}
var LOCALPATH = mycore.getLocalPath();

function call_icon(message, options, callback){
	external_call(GUID_ICON, message, options, callback);
}
function call_core(message, options, callback){
	external_call(GUID_CORE, message, options, callback);
}
function external_call(guid, message, options, callback){
    var emptyFn = function(){
    };
    mycore.extension.sendRequest(guid, 
    {
        message: message,
        options: options || {}
    }, callback || emptyFn);
    //console.log('send "' + message + '" on ' + guid);
	//console.log(options);
}

