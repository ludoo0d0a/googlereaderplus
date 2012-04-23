/**
 * readability Read later integration
 * @param {Object} prefs
 * @param {Object} langs
 * 
 * see http://www.readability.com/publishers/api/
 * 
 * or simply http://www.readability.com/save?url=
 */
GRP.readabilitylater = function(prefs, langs, ID, SL, lang){
    var api = {
        auth: 'oauth',
        icon:ID,
		add: 'https://www.readability.com/api/rest/v1/bookmarks',
		successCode:202,
		errors: {
	        400: 'badrequest',
	        401: 'wronglogin',
	        403: 'forbidden',
	        404: 'notfound',  
	        409: 'conflict',
	        500: 'error'
	    }
    };
    GRP.api_readit(prefs, langs, ID, SL, lang, api);

};