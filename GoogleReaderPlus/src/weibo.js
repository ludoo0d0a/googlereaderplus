/**
 * Weibo micro bloging
 * using shared API
 *  
 */
GRP.weibo = function(prefs, langs, ID, SL, lang){
    var api = {
        shortcut:'tweet',
        icon:ID
    };
    GRP.api_micro(prefs, langs, ID, SL, lang, api);
};
