/**
 * Twitter micro bloging
 * using shared API
 *  
 */
GRP.twitter = function(prefs, langs, ID, SL, lang){
    var api = {
        shortcut:'tweet'
    };
    GRP.api_micro(prefs, langs, ID, SL, lang, api);
};
