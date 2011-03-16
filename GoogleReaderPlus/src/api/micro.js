//microblogging oauth API
/**
 * Google Reader + MicroBlogging platform
 * @version  1.0
 * @date 09-09-2010
 *
 * MicroBlogging platform API with oauth
 *
 * Original author of Google Reader +Twitter :
 * terababy
 * http://userscripts.org/scripts/show/10169
 */
GRP.api_micro = function(prefs, langs, ID, SL, lang, api){
    var DEFAULT_LABEL = "",NORMALIZE = true;
	var CLS_ACTIVE='btn-active', MAX_TEXT=api.max_text||140;
    var BTN_CLS = 'item-share star',BTN_CLS_ID ='btn-'+ID+' '+BTN_CLS;
    var entries = get_id('entries');
	
	function getPref(name, def){
		return prefs[ID+'_'+name] || def;
	}
	    
    // format the message to send, pls type as you like
    function formatSendMsg(labels, title, notes, url){
        var msg = "";
        if (notes.length > 0) {
            msg = notes + " ";
        }
        if (labels.length > 0) {
            msg = msg + "#" + labels + " ";
        }
        msg = msg + "reading:" + title + ' ' + url;
        return msg;
        // return notes + " reading " + title + ' ' + url;
    }
    
    var urlShorteners = {
		tinyurl: function(url, cb){
			var thelongurl = encodeURIComponent(url);
			// urlinput.value = "making url tiny...";
			GM_xmlhttpRequest({
				method: 'GET',
				url: "http://tinyurl.com/create.php?url=" + thelongurl,
				onload: function(r){
					if (r.status == 200) {
						var t = r.responseText;
						var s = t.match(/<blockquote><b>(http\:\/\/tinyurl\.com\/[a-zA-Z0-9]+)<\/b><br>/)[1];
						if (cb){
							cb(!!s, s);
						}
					}
				},
				onerror: function(r){
					var error = formatText(SL.shortfailed, r.status);
					alert(error);
					if (cb){
						cb(false);
					}
				}
			});
		},
		bitly: function(url, cb){
			var thelongurl = encodeURIComponent(url);
			// urlinput.value = "making url tiny...";
			var o = {
				login: getPref('bitlylogin', 'twitthis'),
				apiKey: getPref('bitlykey', 'R_f0b6b5e3a4c028b3ec97119e4f3ce16c'),
				url: thelongurl
			};
			var tpl = "http://api.bit.ly/shorten?version=2.0.1&login={login}&apiKey={apiKey}&format=xml&longUrl={url}";
			var urlbitly = fillTpl(tpl, o);
			
			GM_xmlhttpRequest({
				method: 'GET',
				url: urlbitly,
				onload: function(r){
					var tinydom = new DOMParser().parseFromString(r.responseText, "application/xml");
					var s = tinydom.getElementsByTagName('shortUrl')[0].textContent;
					if (cb){
						cb(!!s, s);
					}
					//countWord();
				},
				onerror: function(r){
					var error = formatText(SL.shortfailed, r.status);
					alert(error);
					if (cb){
						cb(false);
					}
				}
			});
		},
		googl: function(url, cb){
			//http://code.google.com/apis/urlshortener/v1/getting_started.html#shorten
			GM_xmlhttpRequest({
				method: 'POST',
				dataType:'json',
				url: "https://www.googleapis.com/urlshortener/v1/url",
				headers:{
					'Content-Type':'application/json'
				},
				data:JSON.stringify({
					key:'AIzaSyA-0Dvm2SX5qkNGeM73nkrGwhjAIirZZNM',
					longUrl: url
				}),
				onload: function(r){
					var s = (r.responseJson && r.responseJson.id);
					if (cb){
						cb(!!s,s);
					}
				},
				onerror: function(r){
					var error = formatText(SL.shortfailed, r.status);
					alert(error);
					if (cb){
						cb(false);
					}
				}
			});
		}
	};
	
	var URL_SHORTENER = getPref('shortener', 'googl');// bitly, tinyurl, googl
    var getShortUrl = urlShorteners[URL_SHORTENER];
    
    function addMicroButton(el, entry, mode){
        var title = SL.text + formatShortcut(ID, 'tweet', prefs); //[b]
        var text = (prefs && prefs.general_icons) ? '' : (SL.keyword || ID);
        addBottomLink(el, text, title, ID, BTN_CLS, false, postBookmark, false, entry, mode);
    }
    function addKey(){
        onKey('btn-'+ID, postBookmark);
    }

    function postBookmark(btn, entry, locked){
        //local
		var taginput,notesinput,urlinput,titleinput,notesdesc,mode;
		
		//var active = isActive(btn, entry, ID, locked);
        var bookmarkField = getFirstElementByClassName(entry, 'micro-form-'+ID);
		var header, bookmarkStar = btn, parent = entry;
		
		if (bookmarkField){
			//toggle
			var hidden = toggleClassEl(bookmarkField, 'hidden');
			addClassIf(btn, 'btn-sel', !hidden);
			return;
		}
        
		//create
		bookmarkField = document.createElement("div");
        addClass(bookmarkField, 'micro-form-'+ID+' action-area');
        var tpl = "<div class='email-this-area'><table class='email-entry-table'><tbody><tr><td class='field-name'>{text_title}:</td><td><input aria-haspopup='true' class='email-this-subject tags-edit-tags label-input inp-title' type='text'></td></tr><tr><td class='field-name'>{text_tag}:</td><td><input aria-haspopup='true' class='email-this-subject tags-edit-tags label-input inp-tag' type='text'></td></tr><tr><td class='field-name'>{text_url}:</td><td><input aria-haspopup='true' class='email-this-subject tags-edit-tags label-input inp-url' type='text'></td></tr><tr><td colspan='2'><div class='inp-notes'>{notemax}</div><br/><textarea class='email-this-comment inp-notes' rows='6'></textarea><div class='email-this-buttons' tabindex='-1'><div role='wairole:button' tabindex='0' class='goog-button goog-button-base unselectable goog-inline-block goog-button-float-left email-this-send inp-btn-send'><div class='goog-button-base-outer-box goog-inline-block'><div class='goog-button-base-inner-box goog-inline-block'><div class='goog-button-base-pos'><div class='goog-button-base-top-shadow'> &nbsp; </div><div class='goog-button-base-content'><div class='goog-button-body'>{text_send}</div></div></div></div></div></div><div role='wairole:button' tabindex='0' class='goog-button goog-button-base unselectable goog-inline-block goog-button-float-left email-this-cancel inp-btn-shorturl'><div class='goog-button-base-outer-box goog-inline-block'><div class='goog-button-base-inner-box goog-inline-block'><div class='goog-button-base-pos'><div class='goog-button-base-top-shadow'> &nbsp; </div><div class='goog-button-base-content'><div class='goog-button-body'>{text_shortener}</div></div></div></div></div></div><div role='wairole:button' tabindex='0' class='goog-button goog-button-base unselectable goog-inline-block goog-button-float-left email-this-cancel inp-btn-count'><div class='goog-button-base-outer-box goog-inline-block'><div class='goog-button-base-inner-box goog-inline-block'><div class='goog-button-base-pos'><div class='goog-button-base-top-shadow'> &nbsp; </div><div class='goog-button-base-content'><div class='goog-button-body'>{text_count}</div></div></div></div></div></div><div role='wairole:button' tabindex='0' class='goog-button goog-button-base unselectable goog-inline-block goog-button-float-left email-this-cancel inp-btn-cancel'><div class='goog-button-base-outer-box goog-inline-block'><div class='goog-button-base-inner-box goog-inline-block'><div class='goog-button-base-pos'><div class='goog-button-base-top-shadow'> &nbsp; </div><div class='goog-button-base-content'><div class='goog-button-body'>{text_cancel}</div></div></div></div></div></div></div></td></tr></tbody></table></div>";
        var html = fillTpl(tpl, SL);
        bookmarkField.innerHTML = html;
		
		if (mode === "expanded") {
            bookmarkStar.parentNode.parentNode.className = "card-actions";
        } else {
            parent.className = "entry read expanded action-area-visible";
        }
        bookmarkStar.className = "btn-"+ID+" btn-sel star link";
        
        var link = getEntryLink(entry), url = link.url, title = link.title;
		var cb = '';
		if (mode == "expanded") {
			cb = ' card-bottom';
		}
        
        parent.appendChild(bookmarkField);
        taginput = getFirstElementByClassName(bookmarkField, "inp-tag");
        notesinput = getFirstElementByClassName(bookmarkField, "inp-notes");
        urlinput = getFirstElementByClassName(bookmarkField, "inp-url");
        titleinput = getFirstElementByClassName(bookmarkField, "inp-title");
        notesdesc = getFirstElementByClassName(bookmarkField, "inp-notes");

		notesinput.value = "";
        taginput.value = getTags(parent);
        urlinput.value = url;
        titleinput.value = title;
		
		function monitorCount(el){
			el.addEventListener('keypress', function(){
				countWord();
			}, false);
		}
		monitorCount(notesinput);
		monitorCount(urlinput);
		monitorCount(titleinput);
		monitorCount(taginput);
        
        btnSend = getFirstElementByClassName(bookmarkField, "inp-btn-send");
        btnTinyURL = getFirstElementByClassName(bookmarkField, "inp-btn-shorturl");
        btnCount = getFirstElementByClassName(bookmarkField, "inp-btn-count");
        btnCancel = getFirstElementByClassName(bookmarkField, "inp-btn-cancel");
        btnSend.addEventListener('click', saveBookmark, false);
        btnTinyURL.addEventListener('click',  function(){
            url=urlinput.value;
			getShortUrl(url, function(status, shortUrl){
				if (status && shortUrl){
					urlinput.value=shortUrl;
					countWord();
				}
			});
        }, false);
        btnCount.addEventListener('click',  function(){
            countWord();
        }, false);
        
        btnCancel.addEventListener("click", function(){
            if (mode == "expanded") {
				bookmarkStar.parentNode.parentNode.className = "card-actions" + cb;
			}else{
				parent.className = "entry read expanded";
			}
            bookmarkField.className = "action-area'+cb+' hidden";
            bookmarkStar.className = BTN_CLS_ID+" link";
            notesdesc.innerHTML = SL.notemax;
            notesinput.value = "";
        }, false);
       
		
		function countWord(warning){
	        var title = titleinput.value;
	        var labels = taginput.value;
	        var notes = notesinput.value;
	        var msg = formatSendMsg(labels, title, notes, urlinput.value);
			var remain= MAX_TEXT - countMsgWord(msg);
	        notesdesc.innerHTML = formatText(SL.notetoolong, remain);
			if (warning && remain<0){
				alert(SL.toolong);
				return false;
			}else{
				return msg;
			}
			
	    }
		
		countWord();
		
        //btnSend.focus();
        //notesinput.focus();
		
	    function saveBookmark(event){
	        var msg = countWord(true);
			if (!msg){
				return;
			}

			function activeStar(){
		        if (mode == "expanded") {
		            getElementsByClazzName("card-actions", "div", bookmarkField.parentNode)[0].className = "card-actions card-bottom";
		        } else {
		            bookmarkField.parentNode.className = "entry read expanded";
		        }
		        addClass(bookmarkField, 'hidden');
				addClass(bookmarkStar, CLS_ACTIVE);
		        notesinput.value = "";
		    }
		
	        mycore.extension.sendRequest({
	            message: "micro",
				id:ID,
				msg:msg
	        }, function(o){
				var txt = '';
				if (o) {
					if (!o.error) {
						activeStar();
					}else{
						alert('Error from '+ID+': '+(o.responseJson.error||''));
					}
				}else{
					alert('Error: Unable to share this item.');
				}
	        });        
	    }
		
    }
    
    function getTags(parent){
        var taglist = getFirstElementByClassName(parent, "user-tags-list");
        var ins = taglist.getElementsByTagName("li");
        var lbls = "";
        for (var i = 0; i < ins.length; i++) {
            var lbl = ins[i].getElementsByTagName("a")[0].text;
            if (NORMALIZE) {
                lbl = lbl.replace(/-/g, ' ');
                lbl = lbl.toLowerCase().replace(/^(.)|\s(.)/g, function($1){
                    return $1.toUpperCase();
                });
            }
            if (i > 0) {
                lbls += ", ";
            }
            lbls += lbl;
        }
        if (DEFAULT_LABEL.length > 0) {
            if (lbls.length > 0) {
                lbls = DEFAULT_LABEL + ", " + lbls;
            } else {
                lbls = DEFAULT_LABEL;
            }
        }
        return lbls;
    }
    
        
    function countMsgWord(str){
        return (str||'').length;
    }
    
    registerFeature(addMicroButton, ID);
    
    var keycode = getShortcutKey(ID, api.shortcut, prefs); //68 d
    if (keycode) {
		keycode.fn = addKey;
		initKey(keycode);
	}
};


