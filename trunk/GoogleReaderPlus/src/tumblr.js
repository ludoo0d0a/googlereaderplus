/**
 * Tumblr integration
 * @version  ?
 * @date 2011-05-10
 *
  * see API docs: http://www.tumblr.com/docs/en/api
 */
GRP.tumblr = function(prefs, langs, ID, SL, lang){
    var api = {
		icon:ID,
		add: 'http://www.tumblr.com/api/write',
		successCode:201,
		errors: {
	        400: 'badrequest',
	        403: 'wronglogin',
	        500: 'error',
			503: 'unavailable'
	    },
		params:{
			method:'POST',
			url: 'url',
			selection:'body',
			title:'title',
			username:'email'
		},
		parameters:{
			generator:'ReaderPlus',
			type:'regular',
			email:prefs[ID+'_email'],
			password:prefs[ID+'_password']
		}
	};
    GRP.api_readit(prefs, langs, ID, SL, lang, api);
};