/**
 * Reddit integration
 * @version  ?
 * @date 2011-05-10
 *
 * see http://code.reddit.com/wiki/API
 */
GRP.reddit = function(prefs, langs, ID, SL, lang){
	var token=false, cookie=false;
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
			var ret = false;
			if (mode == 'login') {
				//token
				if (r && r.json && r.json.data  ){
					ret={uh:r.json.data.modhash||''};
					cookie=r.json.data.cookie;
					mycore.extension.sendRequest({
                        message: "setcookie",
                        name: 'reddit_session',
                        value:cookie
                    });
				}
			} else {
				if(r && r.jquery){
					var rr = parseJquery(r);
					ret={r:rr};
					if (rr.error && rr.captcha){
						ret.retry=true;
					}
				}
			}
			return ret;
		},
		getToken:function(){
			return token;
		},
		errors: {
	        400: 'badrequest',
	        403: 'wronglogin',
	        500: 'error',
			503: 'unavailable'
	    },
	    retryparams:function(params, k){
	    	params=params||{};
	    	params.iden=params.uh;
	    	var rr = k.r||{};
	    	params.captcha=rr.captcha;
	    	return params;
	    },
		params:{
			method:'POST',
			headers:{
				cookie: function(){
					//return 'reddit_session='+cookie;
					return '.reddit.com	TRUE	/	FALSE	0	reddit_session	'+cookie;
				}
			},
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
    
    function parseJquery(o){
    	var r = {}, all=o.jquery;
    	var re = /\.error\.(\w+)/;
    	if (all){
	    	//start after body
	    	for(var i=1,len=all.length; i<len; i=i+2){
	    		var a=all[i], b=all[i+1];
	    		if (a && b){
	    			var n=a[3], v = b[3];
	    			if(v.length===1){
	    				v=v[0];
	    				if (re.test(v)){
	    					var m = re.exec(v);
	    					v = m[1] || v;
	    					n = 'error'
	    				}
	    			}
	    			r[n]=v;
	    		}
	    	};
    	}
    	return r;
    }
};