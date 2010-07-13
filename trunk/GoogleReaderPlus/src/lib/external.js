/**
 * @author Valente
 */
var GUID_CORE = mycore.getGUID(), 
GUID_CORE_PROD = 'hhcknjkmaaeinhdjgimjnophgpbdgfmg', 
GUID_ICON = 'ecpcafinfpjgabomoamkhkgnpgpmdmeo',
LOCALPATH = mycore.getLocalPath();

if (GUID_CORE!==GUID_CORE_PROD){
	GUID_ICON = 'cgpgjbahhnkejmclppnpkcoildokbmem';
}

function call_icon(message, options, callback){
	external_call(GUID_ICON, message, options, callback);
}
function call_core(message, options, callback){
	external_call(GUID_CORE, message, options, callback);
}
function external_call(guid, message, options, callback){
    console.log('CORE external_call ['+message+'] to '+guid);
	var emptyFn = function(){
    };
    mycore.extension.sendRequest(guid, 
    {
        message: message,
		keypass: "##ReaderPlus",
        options: options || {}
    }, callback || emptyFn);
    //console.log('send "' + message + '" on ' + guid);
	//console.log(options);
}

