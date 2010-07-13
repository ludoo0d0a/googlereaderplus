/**
 * @author Valente
 */
var GUID_CORE = 'hhcknjkmaaeinhdjgimjnophgpbdgfmg', 
GUID_ICON_PROD = 'ecpcafinfpjgabomoamkhkgnpgpmdmeo', 
GUID_ICON = mycore.getGUID(),
LOCALPATH = 'chrome-extension://' + GUID_CORE;

if (GUID_ICON!==GUID_ICON_PROD){
	GUID_CORE = 'lnmcgabhnnfjenanodagmpjjmgbfbgje';
}

function call_icon(message, options, callback){
    external_call(GUID_ICON, message, options, callback);
}

function call_core(message, options, callback){
	external_call(GUID_CORE, message, options, callback);
}

function external_call(guid, message, options, callback){
    console.log('ICON external_call ['+message+'] to '+guid);
	var emptyFn = function(){
    };
    mycore.extension.sendRequest(guid, {
        message: message,
		keypass: "##ReaderPlusIcon",
        options: options || {}
    }, callback || emptyFn);
    //console.log('send "' + message + '" on ' + guid);
    //console.log(options);
}
