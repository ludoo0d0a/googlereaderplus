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
GRP.instapaper = function(prefs, langs){
    var SL = langs.instapaper;
    var apiUrl = 
    {
        add: 'https://www.instapaper.com/api/add',
        auth: 'https://www.instapaper.com/api/authenticate'
    };
    
    function addButton(el, entry, mode){
        var text = SL.text + formatShortcut('instapaper', 'readitlater', prefs); //[b]
        addBottomLink(el, SL.keyword, text, 'instapaper item-star star', false, instapaperShare, false, entry, mode);
    }
    
    function addKey(){
        onKey('btn-instapaper', instapaperShare);
    }
    
    function instapaperShare(btn, entry, locked){
        //var active = isActive(btn, entry, 'instapaper', locked);
        readitlater(entry, btn);
    }
    
    function readitlater(entry, btn){
        var auth = getAuth();
		if (!auth){
			return;
		}
        
		//var link = getFirstElementMatchingClassName(entry, 'a', 'entry-title-link');
		var link = getEntryLink(entry);
		var body = getBody(entry);
        var params = 
        {
            url: link.url,
			title: link.title,
			selection:body.innerText
            //selection: window.getSelection().toString()
        };
        //login(auth, params, btn);
		//direct
		post(auth, params, btn);
    }
    
    function login(auth, params, btn){
        GM_xmlhttpRequest(
        {
            method: 'GET',
            url: apiUrl.auth,
            parameters: auth,
            onload: function(r){
                if (r.status == 200) {
                    //login success
                    post(auth, params, btn);
                } else if (r.status == 403) {
                    //403: Invalid username or password.
                    clearAuth();
                    alert(SL.wronglogin);
                    //GM_openInTab('http://www.instapaper.com/user/login', true);
                } else {
                    //500
                    alert(SL.error);
                }
            }
        });
    }
    function post(auth, params, btn){
		params.username = auth.username;
		if (auth.password) {
			params.password = auth.password;
		}
		GM_xmlhttpRequest(
        {
            method: 'GET',
            url: apiUrl.add,
            parameters: params,
            onload: function(r){
                if (r.status == 201) {
                    //201: This URL has been successfully added to this Instapaper account.
                    //set star active
                    addClass(btn, 'item-star-active');
                    removeClass(btn, 'item-star');
                } else if (r.status == 400) {
                    //400: Bad request. Probably missing a required parameter, such as url.
                    alert(SL.badrequest);
                    //GM_openInTab('http://www.instapaper.com/user/login', true);
                } else if (r.status == 403) {
                    //403: Invalid username or password.
                    clearAuth();
                    alert(SL.wronglogin);
                    //GM_openInTab('http://www.instapaper.com/user/login', true);
                } else {
                    //500: The service encountered an error. Please try again later.
                    alert(SL.error);
                }
            }
        });
    }
    
    function getAuth(){
		var username = prefs.instapaper_username;
        var password = prefs.instapaper_password;
		/*
		var username = GM_getValue('instapaper_username');
        var password = GM_getValue('instapaper_password');
        */
        if (typeof username === "undefined" || username === '') {
            alert(SL.nologin);
			return false;
			/*username = prompt(SL.login);
            username = username || '';
			if (username===''){
				return false;
			}
            password = prompt(SL.password);
            password = password || '';
            GM_setValue('instapaper_username', username);
            GM_setValue('instapaper_password', password);
            */
        }
        
        return {
            username: username,
            password: password
        };
    }
    function clearAuth(){
        //GM_setValue('instapaper_username', '');
        //GM_setValue('instapaper_password', '');
    }
    
    //var css = ".instapaper{margin-left: 4px;padding-left:16px;width:14px;height:14px;background-repeat:no-repeat;background-image:url(data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%06%00%00%00%1F%F3%FFa%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%20cHRM%00%00z%26%00%00%80%84%00%00%FA%00%00%00%80%E8%00%00u0%00%00%EA%60%00%00%3A%98%00%00%17p%9C%BAQ%3C%00%00%00%09pHYs%00%00%0E%C3%00%00%0E%C3%01%C7o%A8d%00%00%00%18tEXtSoftware%00Paint.NET%20v3.22%B7%91%17%7D%00%00%00%84IDAT8Oc%60%18%B4%E0%DD%9Bw%FFa%18%E4Hd6AG%3F%7B%F2%EC%FF%CE%DD%3B%E1%F8%C0%BE%03%FF%9F%3D%B9%0F6%90%A0f%90%82%D7%2F%9F%FD_%B4h%D1%FF%EE%DE%EE%FF%93%A7N%06%B3%AF_%BDN%BC%01%20C%40%AE%00%19%00%C2%20%CDD%D9%8C%AC%08%DD%00%90%ABH2%04f%00%C8%0B%24%3B%1F%D9%0B%14%1B%00%0B%03%B2%BD%40V%20R%1C%8D%14%27%24%E4%A4%0BK%7D%24%25e%92%E2%9BR%C5%00%82%C7%DB%C3L%A1%1D%CB%00%00%00%00IEND%AEB%60%82);}";
    /*var css = "#instapaper-bezel {position: fixed;left: 10px; top: 10px; width:168px; height: 100px; z-index: 2147483647; border: 3px solid #aaa;}";
     GM_addStyle(css);*/
    initCatchEntries(addButton, 'einstapaper');
    var keycode = getShortcutKey('instapaper', 'readitlater', prefs);
    keycode.fn = addKey;
    initKey(keycode);
};
