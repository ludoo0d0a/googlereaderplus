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
	var token = false;
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
        if (pp.key) {
            params[pp.key] = api.key;
        }
        login(cred, params, btn);
    }
	function isOk(r, btn, mode){
		var res = (r.status == api.successCode);
		if (res && typeof api.success ==='function'){
			res = api.success(r.responseJson, btn, mode);
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
			var o = apply({
				method: 'GET',
				dataType:'json'
			}, api.auth);
			o.data=apply(o.data,p);
			
			o.onload = function(r){
				token = isOk(r, btn, 'login');
				if (token) {
					//login success
					post(cred, params, btn);
				} else if (api.errors[r.status]) {
					alert(SL[api.errors[r.status]]);
				} else {
					alert(SL.error);
				}
			};
			GM_xmlhttpRequest(o);
		}else{
			//direct
			post(cred, params, btn);
		}
    }
    function post(cred, params, btn){
		params[pp.username || 'username'] = cred.username;
        if (cred.password) {
            params[pp.password || 'password'] = cred.password;
        }
        var p=false,d=false,m = pp.method || 'GET';
		if (m=='GET'){
			p=params;
		}else{
			d=params;
		}
		GM_xmlhttpRequest({
            method: m,
            url: api.add,
			dataType:'json',
            parameters: p,
			data: d,
            onload: function(r){
                if (isOk(r,false,'post')){
                    //set star active
                    addClass(btn, 'btn-active'); //item-star-active
                    removeClass(btn, 'item-share');
					if (typeof api.successTitle ==='function') {
						btn.title=api.successTitle(r.responseJson,SL);
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
    function clearCredentials(){
        //GM_setValue(ID+'_username', '');
        //GM_setValue(ID+'_password', '');
    }
	function addCss(id){
		var css = '.entry .entry-actions .btn-'+id+'{background: url(\'http://googlereaderplus.googlecode.com/svn/trunk/GoogleReaderPlus/images/share/'+id+'.png\') no-repeat!important;padding:0px 8px 1px 16px !important;}'+
		'.entry .entry-actions .btn-facebook{background-position: 0 0px !important;}'+
		'.entry .entry-actions .btn-facebook.btn-active{background-position: 0 -16px !important;}';
		GM_addStyle(css, 'btn_share_'+id);
	}
	if (api.icon){
		addCss(api.icon);
	}
	
    registerFeature(addButton, ID);
    var keycode = getShortcutKey(ID, 'share', prefs);
    keycode.fn = addKey;
    initKey(keycode);
};
