/**
 * jaiku micro bloging
 * using shared API
 * 
 * http://www.jaiku.com/api/docs/method_post
 *  
 */
GRP.jaiku = function(prefs, langs, ID, SL, lang){
    var BASE = 'http://www.jaiku.com';
	
	var api = {
        shortcut:'jaiku'
    };
    GRP.api_micro(prefs, langs, ID, SL, lang, api);
};
