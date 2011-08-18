/**
 * Diigo integration
 * @version  ?
 * @date 2011-05-04
 *
  * see API docs: http://www.diigo.com/api_dev
 */
GRP.diigo = function(prefs, langs, ID, SL, lang){
    var api = {
		auth: 'basic', 
		icon:ID,
		key:'c5671faf686ff45a',
		add: 'https://secure.diigo.com/api/v2/bookmarks',
		successCode:200,
		success:function(o){
			return (o.message);
		},
		errors: {
	        400: 'badrequest',
			401: 'notauthorized',
	        403: 'forbidden',
			404: 'notfound',
	        500: 'error',
			502: 'badgateway',
			503: 'unavailable'
	    },
		params:{
			url: 'url',
			selection:'desc',
			title:'title',
			key:'key',
			tags:'tags',
			method: 'POST'
		}
	};
    GRP.api_readit(prefs, langs, ID, SL, lang, api);
};