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
    //GRP.api_readit(prefs, langs, ID, SL, lang, api);
    
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
    
    
    /**
     * Version popup windows
     */
    
    var BTN_CLS = 'item-share star', BTN_CLS_ID ='btn-'+ID+' '+BTN_CLS;
    var URL='http://www.reddit.com/submit?url={url}&title={title}';
	var OPTWIN = 'toolbar=0,status=0,resizable=1,width=626,height=436';
	
	function addButton(el, entry, mode) {
		var title = SL.text + formatShortcut(ID, 'go'+ID, prefs); //[b]
		var text = (prefs && prefs.general_icons)?'':(SL.keyword || ID);
		addBottomLink(el,text, title, ID, BTN_CLS, false, openShareWindow, false, entry, mode);
	}

	function addKey() {
		onKey('btn-'+ID, openShareWindow);
	}

	function openShareWindow(btn, entry, locked) {
		var active = isActive(btn, entry, ID, locked, 'btn-active', 'btn-inactive');
		addClassIf(btn, 'item-star-active',active);
		if (active) {
			var shareurl = getEntryLink(entry);
			
			var url = fillTpl(URL, shareurl);
			window.open(url, ID+'sharer', OPTWIN);
		}
	}
	
	function addCss(id){
		var css = '.entry .entry-actions .btn-'+id+'{background: url(\'http://googlereaderplus.googlecode.com/svn/trunk/GoogleReaderPlus/images/share/'+id+'.png\') no-repeat!important;padding:0px 8px 1px 16px !important;}'+
		'.entry .entry-actions .btn-'+id+'{background-position: 0 0px !important;}'+
		'.entry .entry-actions .btn-'+id+'.btn-active{background-position: 0 -16px !important;}';
		GM_addStyle(css, 'rpe_'+id);
	}
	addCss(ID);
	
	registerFeature(addButton, ID);
	var keycode = getShortcutKey(ID, 'go'+ID, prefs); //66 b
	keycode.fn = addKey;
	initKey(keycode);
    
    
};