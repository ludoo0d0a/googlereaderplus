/**
 * Pinboard integration
 * @version  ?
 * @date 2011-05-04
 *
  * see API docs: http://www.pinboard.in
 */
GRP.pinboard = function(prefs, langs, ID, SL, lang){
    var api = {
		icon:ID,
		add: 'https://pinboard.in/add',
		successCode:200,
		success:function(o){
			return (o.status==200 && o.number_of_videos>0);
		},
		errors: {
	        400: 'badrequest',
	        403: 'wronglogin',
	        500: 'error',
			503: 'unavailable'
	    },
		params:{
			url: 'url',
			selection:'description',
			title:'title'
		}
	};
    GRP.api_readit(prefs, langs, ID, SL, lang, api);
};