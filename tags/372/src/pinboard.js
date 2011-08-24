/**
 * Pinboard integration
 * @version  ?
 * @date 2011-05-04
 *
  * see API docs: http://www.pinboard.in
 */
GRP.pinboard = function(prefs, langs, ID, SL, lang){
    var token = false;
    function setToken(text){
    	var m2 = /name="token"\svalue="(.*)"/.exec(text);
		if (m2 && m2[1]){
			token = m2[1];
		}
	}
				
    var api = {
		auth:{
			url: 'https://pinboard.in/auth',
			method: 'POST',
			dataType: ''
			/*,params:{
				next:'https://pinboard.in/add/'
			}*/
		},
		icon:ID,
		add: 'https://pinboard.in/add',
		/*getToken:function(){
			return token;
		},*/
		successCode:200,
		success:function(o,el,mode, text){
			if (mode==='login'){
				/*setToken(text);
				return {
					form_token:token
				};*/
				return (/<a\s+href="\/logout\/?">/.test(text));
			}else{
				var m = /<p\sclass="error">(.*)<\/p>/.exec(text);
				if (m && m[1]){
					return {
						error:m[1]
					};
				}
				return (/id="toread"/.test(text));
			}
		},
		errors: {
	        400: 'badrequest',
	        403: 'wronglogin',
	        500: 'error',
			503: 'unavailable'
	    },
		params:{
			//method: 'POST',
			url: 'url',
			selection:'description',
			title:'title',
			tags:'tags'
		},
		parameters:{
			later:'yes',
			noui:'yes',
			jump:'close'
		}
	};
    GRP.api_readit(prefs, langs, ID, SL, lang, api);
};