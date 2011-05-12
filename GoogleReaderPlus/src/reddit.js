/**
 * Reddit integration
 * @version  ?
 * @date 2011-05-10
 *
 * see http://code.reddit.com/wiki/API
 */
GRP.reddit = function(prefs, langs, ID, SL, lang){
	var api = {
		icon:ID,
		auth: {
			method:'POST',
			url:'http://www.reddit.com/api/login',
			data:{
				api_type:'json'
			}
		},
		add: 'http://www.reddit.com/api/submit',
		successCode:200,
		success:function(r,btn,mode){
			var a = false;
			if (mode == 'login') {
				//token
				if (r && r.json && r.json.data  ){
					a={uh:r.json.data.modhash||''};
				}
			} else {
				//post successfull
				a = (o && !o.error);
			}
			return a;
		},
		errors: {
	        400: 'badrequest',
	        403: 'wronglogin',
	        500: 'error',
			503: 'unavailable'
	    },
		params:{
			url: 'url',
			//selection:'description',
			title:'title',
			username:'user',
			password:'passwd'
		},
		parameters:{
			uh:'',
			kind: 'link',
			sr:'blog',//subreddit = tags
			r:'blog'//=sr
		}
	};
    GRP.api_readit(prefs, langs, ID, SL, lang, api);
};