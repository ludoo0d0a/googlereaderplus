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
	var tplMsg = getPref('tpl', '{desc}{tags} Reading: {title} {url}');
	var autoshort = getPref('autoshort', false);
	var SM = langs.sharemsg;
	
	var overlay,editMicro,labelTitle,taginput,labelInfo,urlinput,titleinput,descinput,mode;
		
	var css='.xoverlay{-webkit-box-align:center;-webkit-box-pack:center;-webkit-transition:0.25s opacity;background:-webkit-radial-gradient(rgba(127,127,127,0.5),rgba(127,127,127,0.5)35%,rgba(0,0,0,0.7));bottom:0;display:-webkit-box;left:0;padding:20px;padding-bottom:130px;position:fixed;right:0;top:0;z-index:999;}';
	css += '.xoverlay .xpage {-webkit-box-shadow: 0px 5px 80px #505050;background: white;border: 1px solid #BCC1D0;border-radius: 2px;min-width:600px;padding: 0;position: relative;}';
	css += '.xaction {-webkit-box-align: center;-webkit-box-orient: horizontal;-webkit-box-pack: end;border-top: 1px solid rgba(188, 193, 208, .5);display: -webkit-box;padding: 12px;}';
	css += '.xpage h1 {  -webkit-padding-end: 24px;  -webkit-user-select: none;  border-bottom: 1px solid #eeeeee;  color: #53637d;  font-size: 200%;  font-weight: normal;  margin: 0;  padding-bottom: 4px;  padding-top: 13px;  text-shadow: white 0 1px 2px;}';
	css += '.xoverlay .xpage h1 {  background: -webkit-linear-gradient(white, #F8F8F8);  border-bottom: 1px solid rgba(188, 193, 208, .5);  font-size: 105%;  font-weight: bold;  padding: 10px 15px 8px 15px;}';
	css += '.xcontent{padding: 10px 15px;}';
	
	css +="button,input[type='button'],input[type='submit']/*,textarea*/ {  -webkit-border-radius: 2px;  -webkit-box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);  -webkit-user-select: none;  background: -webkit-linear-gradient(#fafafa, #f4f4f4 40%, #e5e5e5);  border: 1px solid #aaa;  color: #444;  font-size: inherit;  margin-bottom: 0px;  min-width: 4em;  padding: 3px 12px 3px 12px;}";
	css +="button:hover,input[type='button']:hover,input[type='submit']:hover/*,textarea:hover*/ {  -webkit-box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);  background: #ebebeb -webkit-linear-gradient(#fefefe, #f8f8f8 40%, #e9e9e9);  border-color: #999;  color: #222;}";
	css +="button:active,input[type='button']:active,input[type='submit']:active,textarea:active {  -webkit-box-shadow: inset 0px 1px 3px rgba(0, 0, 0, 0.2);  background: #ebebeb -webkit-linear-gradient(#f4f4f4, #efefef 40%, #dcdcdc);  color: #333;}";
	css +="button[disabled],input[type='button'][disabled],textarea[disabled],input[type='submit'][disabled],button[disabled]:hover,input[type='button'][disabled]:hover,input[type='submit'][disabled]:hover,textarea[disabled]:hover {  -webkit-box-shadow: none;  background: -webkit-linear-gradient(#fafafa, #f4f4f4 40%, #e5e5e5);  border-color: #aaa;  color: #888;}";
	
	css +="input[type='text'],textarea{width:90%;}";
	css +="textarea{height:80px;text-align:left;}";
	css +='.xwarning{color:red;}';
	css +='#btn-send{font-weight:bold;}';
	
	//css += '#edit-micro{position:fixed;width:60%;margin:auto;height: 280px;top: 200px;z-index: 9999;}';
	GM_addStyle(css, 'rps_'+ID);
	
	function getPref(name, def){
		return prefs[ID+'_'+name] || def;
	}
	    
    // format the message to send, pls type as you like
    function _formatSendMsg(url, title, desc, tags){
        if (desc) {
            desc = desc + " ";
        }
        if (tags) {
			tags='#'+tags;
        }
		msg = fillTpl(tplMsg, {
			url:url,
			title:title,
			desc:desc,
			tags:tags
		});
        return msg;
    }
	var formatSendMsg = api.format || _formatSendMsg;
    
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
					var error = formatText(SM.shortfailed, r.status);
					_alert(error);
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
					var error = formatText(SM.shortfailed, r.status);
					_alert(error);
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
				url: 'https://www.googleapis.com/urlshortener/v1/url',
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
					var error = formatText(SM.shortfailed, r.status);
					_alert(error);
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
        var title = SL.text + formatShortcut(ID, 'share', prefs); //[b]
        var text = (prefs && prefs.general_icons) ? '' : (SL.keyword || ID);		
		if (api.button && typeof api.button ==='function') {
			api.button(el, entry, mode, title, text);
		} else {
			addBottomLink(el, text, title, ID, BTN_CLS, false, postBookmark, false, entry, mode);
		}
    }
	
    function addKey(){
        onKey('btn-'+ID, postBookmark);
    }

    function postBookmark(btn, entry, locked){
		
		if (typeof api.required =='function'){
			if (!api.required()){
				_alert(SL.nologin);
				return;
			}
		}
		
		function fillValues(entry){
			labelTitle.innerHTML=SM.sharewith+ID
			var link = getEntryLink(entry), url = link.url, title = link.title;
			descinput.value = '';
	        taginput.value = getTagsText(entry, NORMALIZE, DEFAULT_LABEL)
	        urlinput.value = url;
	        titleinput.value = title;
	        countWord();
		}
		
		function showBox(show){
			if (show){
				removeClass(editMicro, 'hidden');
				removeClass(overlay, 'hidden');
			}else{
				addClass(editMicro, 'hidden');
				addClass(overlay, 'hidden');
			}
		}
		
		if (editMicro){
			//toggle
			fillValues(entry);
			showBox(true);
			return;
		}
        
		//create
        overlay=dh(document.body,'div', {
        	id:'overlay-micro',
        	cls:'xoverlay'
        })
        
        editMicro=dh(overlay,'div', {
        	id:'edit-micro',
        	cls: 'micro-form-'+ID+' action-area xpage',
        	html: "<h1 class='xtitle'></h1><div class='xcontent'></div><div class='xaction'></div>"
        });

        labelTitle= gfe(editMicro, "xtitle");
        var content = gfe(editMicro, "xcontent");
        function createInput(root, id, cfg){
        	var title = SM['text_'+id]||id;
        	var wrap=dh(root, 'div', {cls:'xwrap-input', html:'<div class="xlabel">'+title+'</div>'});
        	var tag = 'input';
        	cfg=cfg||{};
        	cfg.id=id;
        	cfg.type=cfg.type||'text';
        	if (cfg.type==='textarea'){
        		tag = cfg.type;
        		cfg.type='';
        	}
        	cfg.placeholder=title;
        	cfg.events=cfg.events||{};
        	//cfg.events.keypress=countWord;
        	cfg.events.keydown=countWord;
        	return dh(wrap, tag, cfg);
        }
        titleinput = createInput(content, 'title');
        urlinput = createInput(content, 'url');
        taginput = createInput(content, 'tag');
        descinput = createInput(content, 'desc', {type:'textarea'});
        labelInfo = dh(content, 'p', {id:'label-info'});

        var xaction = gfe(editMicro, "xaction");
        function createButton(root, id, click){
        	var cfg={};
        	cfg.id='btn-'+id;
        	cfg.type='button';
        	cfg.value=SM['text_'+id]||id;
        	cfg.events=cfg.events||{};
        	if (click){
        		cfg.events.click=click;
        	}
        	return dh(root, 'input', cfg);
        }
        
        function doShortUrl(){
            url=urlinput.value;
			getShortUrl(url, function(status, shortUrl){
				if (status && shortUrl){
					urlinput.value=shortUrl;
					countWord();
				}
			});
        }
        function cancelBox(){
           showBox(false);
        }
        
		function countWord(warning, cb){
	        setTimeout(function(){
		        var o= {}; 
				o.url = urlinput.value;
				o.title = titleinput.value;
		        o.tags = taginput.value;
		        o.desc = descinput.value;
		        o.msg = formatSendMsg(o.url, o.title, o.desc, o.tags);
				var remain= MAX_TEXT - countMsgWord(o.msg);
		        labelInfo.innerHTML = formatText(SM.notetoolong, remain);
				if (remain<0){
					//_alert(SM.toolong);
					addClass(labelInfo, 'xwarning');
					o = false;
				}else{
					removeClass(labelInfo, 'xwarning');
				}
				if (cb){
					cb(o);
				}
			},100);
	    }
		
		 function saveBookmark(event){
		 	  countWord(true, sendBookmark);
		 }
	    function sendBookmark(p){
			var msg = p.msg;
			if (!msg){
				return;
			}

			function activeStar(){
		        showBox(false);
		        addClass(btn, CLS_ACTIVE);
		    }
		
			p.message = api.msg || "micro";
			p.id=ID;
			if (api.tpl && api.tpl.url){
				p.tpl = p.tpl || {};
				p.tpl.url = {};
				foreach(api.tpl.url, function(o){
					p.tpl.url[o]=getPref(o);
				});
			}
	        mycore.extension.sendRequest(p, function(o){
				var txt = '';
				if (o) {
					if (!o.error) {
						activeStar();
					}else{
						_alert('Error from '+ID+': '+(o.error||''));
					}
				}else{
					_alert('Error: Unable to share this item.');
				}
	        });        
	    }
		
	    
        btnSend = createButton(xaction, 'send', saveBookmark);
        btnShortUrl = createButton(xaction, 'shorturl', doShortUrl);
        btnCount = createButton(xaction, 'count', countWord);
        btnCancel = createButton(xaction, 'cancel', cancelBox);

		fillValues(entry);
		showBox(true);
		if (autoshort){
			doShortUrl();
		}
    }
        
    function countMsgWord(str){
        return (str||'').length;
    }
    
    if (api.icon){
		addCssIcon(api.icon);
	}
	
    registerFeature(addMicroButton, ID);
    
    var keycode = getShortcutKey(ID, api.shortcut, prefs); //68 d
    if (keycode) {
		keycode.fn = addKey;
		initKey(keycode);
	}
	function _alert(msg){
		console.error(msg);
		alert(msg);
	}
};


