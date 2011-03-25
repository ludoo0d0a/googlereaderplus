/**
 * jaiku micro bloging
 * using shared API
 * 
 * http://www.jaiku.com/api/docs/method_post
 *  
 */
GRP.blogger = function(prefs, langs, ID, SL, lang){
    var BASE = 'http://www.blogger.com';
	var api = {
        shortcut:'blogger',
		max_text:99999,
		msg:'popupblogger'//msg to bg
    };

    GRP.api_micro(prefs, langs, ID, SL, lang, api);
};
