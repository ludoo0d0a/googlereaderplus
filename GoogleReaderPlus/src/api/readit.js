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
        var auth = getAuth();
        if (!auth) {
            return;
        }
        var link = getEntryLink(entry);
        var body = getBody(entry);
        var params = {};
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
        //login(auth, params, btn);
        //direct
        post(auth, params, btn);
    }
	function isOk(r, btn){
		var res = (r.status == api.successCode);
		if (res && typeof api.success ==='function'){
			res = api.success(r.responseJson, btn);
		}
		return res;
	}
    function login(auth, params, btn){
        GM_xmlhttpRequest({
            method: 'GET',
            url: api.auth,
            parameters: auth,
            onload: function(r){
                if (isOk(r, btn)){
                    //login success
                    post(auth, params, btn);
                } else if (api.errors[r.status]) {
                    alert(SL[api.errors[r.status]]);
                } else {
                    alert(SL.error);
                }
            }
        });
    }
    function post(auth, params, btn){
		params[pp.username || 'username'] = auth.username;
        if (auth.password) {
            params[pp.password || 'password'] = auth.password;
        }
        GM_xmlhttpRequest({
            method: 'GET',
            url: api.add,
			dataType:'json',
            parameters: params,
            onload: function(r){
                if (isOk(r)){
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
    function getAuth(){
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
    function clearAuth(){
        //GM_setValue(ID+'_username', '');
        //GM_setValue(ID+'_password', '');
    }
    registerFeature(addButton, ID);
    var keycode = getShortcutKey(ID, 'share', prefs);
    keycode.fn = addKey;
    initKey(keycode);
};
