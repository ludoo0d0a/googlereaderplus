/**
 * Instapaper integration
 * @version  ?
 * @date 2009-07-30
 *
 * Integrate an instapaper button
 *
 * Original author :
 * ckolderup
 * http://userscripts.org/scripts/show/54713
 *
 * see API docs: http://www.instapaper.com/api
 */
GRP.radbox = function(prefs, langs, ID, SL, lang){
    var api = {
        key:'7c3ab03e24e85a95c0bc3ffe7360917d',
		add: 'http://api.radbox.me/video/add',
		successCode:200,
		success:function(o){
			return (o.status==200 && o.number_of_videos>0);
		},
		successTitle:function(o,SL){
			return o.number_of_videos+' videos added in Radbox';
		},
		errors: {
	        200: 'novideo',
			//400: Bad request. Probably missing a required parameter, such as url.
	        400: 'badrequest',
	        //403: Invalid username or password.
	        403: 'wronglogin',
	        //500: The service encountered an error. Please try again later.
	        500: 'error',
			503: 'unavailable'
	    },
		params:{
			url: 'url',
			key:'devKey',
			username:'userKey',
			title:'t'
		}
	};
    GRP.api_readit(prefs, langs, ID, SL, lang, api);
};