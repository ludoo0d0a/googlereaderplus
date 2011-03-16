/**
 * Identi.ca micro bloging
 * using shared API
 *  
 */
GRP.identi = function(prefs, langs, ID, SL, lang){
    var BASE = 'http://identi.ca';
	var api = {
        shortcut:'identi'
    };
    GRP.api_micro(prefs, langs, ID, SL, lang, api);
};
