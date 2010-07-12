/**
 * @author Valente
 */
var GUID_CORE = 'hhcknjkmaaeinhdjgimjnophgpbdgfmg', 
GUID_ICON_PROD = 'ecpcafinfpjgabomoamkhkgnpgpmdmeo', 
GUID_ICON = mycore.getGUID();
var env = '';
if (GUID_ICON !== GUID_ICON_PROD) {
    env = 'unpacked';
    console.log('env=' + env);
    GUID_CORE = 'aiiclalbkneakbgonobojbdeapcabolj';
    console.log('icon GUID_CORE=' + GUID_CORE);
    console.log('icon GUID_ICON=' + GUID_ICON);
}
var LOCALPATH = 'chrome-extension://' + GUID_CORE;

function call_icon(message, options, callback){
    external_call(GUID_ICON, message, options, callback);
}

function call_core(message, options, callback){
    external_call(GUID_CORE, message, options, callback);
}

function external_call(guid, message, options, callback){
    var emptyFn = function(){
    };
    mycore.extension.sendRequest(guid, {
        message: message,
        options: options || {}
    }, callback || emptyFn);
    console.log('send "' + message + '" on ' + guid);
    console.log(options);
}
