/**
 * ReadItLater integration
 * @param {Object} prefs
 * @param {Object} langs
 * 
 * see http://readitlaterlist.com/api/
 */
GRP.readitlater = function(prefs, langs, ID, SL, lang){
    var api = {
        key:'e6cg2d3cp4431Y55aKT0V06R29AWr21b',
        icon:ID,
		add: 'https://readitlaterlist.com/v2/add',
        //auth: 'https://readitlaterlist.com/v2/auth',
		successCode:200,
		errors: {
	        400: 'badrequest',
	        401: 'wronglogin',
	        403: 'rateexceeded',
	        500: 'error',
	        503: 'maintenance'
	    }
    };
    GRP.api_readit(prefs, langs, ID, SL, lang, api);
};