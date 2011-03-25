/**
 * Identi.ca micro bloging
 * using shared API
 *  
 */
GRP.identi = function(prefs, langs, ID, SL, lang){
    var BASE = 'http://identi.ca';
	var api = {
        shortcut:'identi'
		/*,required:function(){
			var login = prefs[ID+'_login'];
			var key = prefs[ID+'_key'];
			return (login && key);
		}*/
    };
	
	GRP.api_micro(prefs, langs, ID, SL, lang, api);    
};
