/**
 * Readitlater and instapaper API
 */
GRP.api_readit = function(prefs, langs, ID, scriptlangs, lang, api){
    var o = apply({}, langs.readit);
    var SL = apply(o, scriptlangs);
    var pp = api.params ||
    {
        url: 'url',
        title: 'title',
        selection: 'selection'
    };
	
    function addButton(el, entry, mode){
        var title = SL.text + formatShortcut(ID, 'share', prefs);
        var text = (prefs && prefs.general_icons) ? '' : (SL.keyword || ID);
        addBottomLink(el, text, title, ID, 'item-share share-star', false, readitlaterClick, false, entry, mode);
    }
    function addKey(){
        onKey('btn-' + ID, readitlaterClick);
    }
    function readitlaterClick(btn, entry, locked){
        //var active = isActive(btn, entry, ID, locked, 'btn-active', 'btn-inactive');
		var active = hasClass(btn,'btn-active');
		if (!active) {
			readitlater(entry, btn);
		}
    }
    function readitlater(entry, btn){
        var cred = getCredentials();
        if (!cred) {
            return;
        }
        var link = getEntryLink(entry);
        var body = getBody(entry);
        var params = api.parameters || {};
        if (pp.url) {
            params[pp.url] = link.url;
        }
        if (pp.title) {
            params[pp.title] = link.title;
        }
        if (pp.selection) {
            params[pp.selection] = body.innerText;
        }
		if (pp.tags) {
            var t = '';
			if (typeof pp.tags === 'function'){
				t = pp.tags(entry);
			}else{
				t = getTagsText(entry);
			}
			params[pp.tags] = t;
        }
        if (pp.key) {
            params[pp.key] = api.key;
        }
        login(cred, params, btn);
    }
	function isOk(r, btn, mode){
		var res = (r.status == api.successCode);
		if (res && typeof api.success ==='function'){
			res = api.success(r.responseJson, btn, mode, r.responseText);
		}
		return res;
	}
    function login(cred, params, btn){
        if (api.auth) {
			var p = {};
			p[pp.username || 'username'] = cred.username;
			if (cred.password){
	        	p[pp.password || 'password'] = cred.password;
			}
			if (api.auth === 'basic') {
				//Basic authentication
				cred.method=api.auth;
				post(cred, params, btn);
			}else {
				token = (api.getToken)?api.getToken():false;
				
				function gopost(token){
					cred.method='token';//api.auth
					params=apply(params,token);
					//login success
					post(cred, params, btn);
				}
				
				if (token){
					gopost(token);
				}else{
					var o = apply({
						method: 'GET',
						dataType: 'json'
					}, api.auth);
					
					o.data = apply(o.data || {}, p);
					o.onload = function(r){
						var token = isOk(r, btn, 'login');
						if (token) {
							gopost(token);
						} else if (api.errors[r.status]) {
							alert(SL[api.errors[r.status]]);
						} else {
							alert(SL.error);
						}
					};
					GM_xmlhttpRequest(o);
				}
			}
		}else{
			//direct
			post(cred, params, btn);
		}
    }
    function post(cred, params, btn, retry){
		var auth = false;
		if (cred && cred.method === 'basic') {
			auth=cred;
		}else if (cred && cred.method === 'token'){
			//Nothing
		} else if (cred){
			params[pp.username || 'username'] = cred.username;
			if (cred.password) {
				params[pp.password || 'password'] = cred.password;
			}
		}
        var p=false,d=false,m = pp.method || 'GET';
		if (m=='GET'){
			p=params;
		}else{
			if (typeof api.getData==='function'){
				var o= api.getData(params, cred);
				d=o.data;
				p=o.params;
			}else{
				d=params;
			}
		}
		GM_xmlhttpRequest({
            method: m,
            headers:pp.headers,
            strip:api.strip,
			auth:auth,
            url: api.add,
			dataType:'json',
            parameters: p,
			data: d,
            onload: function(r){
                console.log(r.responseText);
                var k = isOk(r,false,'post');
                if (k){
                    if (!retry && k.retry){
                    	if (api.retryparams){
                    		params=api.retryparams(params, k);
                    	}
                    	post(cred, params, btn, true);
                    }else{
	                    //set star active
	                    addClass(btn, 'btn-active'); //item-star-active
	                    removeClass(btn, 'item-share');
						if (typeof api.successTitle ==='function') {
							btn.title=api.successTitle(r.responseJson,SL);
						}
					}
                } else if (api.errors[r.status]) {
                    alert(SL[api.errors[r.status]]);
                } else {
                    alert(SL.error);
                }
            }
        });
    }
    function getCredentials(){
        if (api.nousername){
       		return {};
        }else{
	        var username = prefs[ID + '_username'];
	        var password = prefs[ID + '_password'];
	        if (typeof username === "undefined" || username === '') {
	            alert(SL.nologin);
	            return false;
	        }
	        return {
	            username: username,
	            password: password
	        };
        }
    }
    function clearCredentials(){
        //GM_setValue(ID+'_username', '');
        //GM_setValue(ID+'_password', '');
    }
	if (api.icon){
		addCssIcon(api.icon);
	}
	
    registerFeature(addButton, ID);
    var keycode = getShortcutKey(ID, 'share', prefs);
    keycode.fn = addKey;
    initKey(keycode);
};
