/**
 * Crossbrowser implementation for native browser
 *
 * @param {Object} a
 * @param {Object} fn
 */
var isChrome = (typeof chrome !== "undefined");
var isSafari = (typeof safari !== "undefined");
var options={
	autoparse:true  
}

var mycore = {
    application:{
		sendRequest: function(a, fn, b){
			if (isChrome) {
				
            }
            else if (isSafari) {
				safari.application.addEventListener(a.message,fn,false);
            }
        }
		
	},
	extension: {
        sendRequest: function(){
			//to bg
			var guid=false, a, fn, l = arguments.length;
			if (l>2){
				guid=arguments[0];
				a=arguments[1];
				fn=arguments[2];
			}else{
				a=arguments[0];
				fn=arguments[1];
			}
				
			if (isChrome) {
				if (guid){
					if (fn) {
						chrome.extension.sendRequest(guid,a, fn);
					}else{
						chrome.extension.sendRequest(guid,a);
					}
				}else{
					if (fn) {
						chrome.extension.sendRequest(a, fn);
					}else{
						chrome.extension.sendRequest(a);
					}
				}
				//chrome.extension.sendRequest(arguments);
            }
            else if (isSafari) {
				safari.self.addEventListener('crossaction', function(e){
					var a = e;
					a.message = a.name;
					delete a.name;
					fn(a);
                }, false);
				safari.self.tab.dispatchMessage('crossaction', a);
            }
        },
        onRequest:{
			addListener: function(fn){
               //from bg
			   if (isChrome) {
                    chrome.extension.onRequest.addListener(fn);
                }
                else if (isSafari) {
					safari.application.addEventListener('crossaction',fn,false);
                }
            }
        },
        onRequestExternal:{
			addListener: function(fn){
                if (isChrome) {
                    chrome.extension.onRequestExternal.addListener(fn);
                }
                else if (isSafari) {
                    safari.application.addEventListener('crossaction',fn,false);
                }
            }
        }
    },
    tabs: {
        create:function(options){
			if (isChrome) {
                 chrome.tabs.create(options);
            }else if (isSafari) {
                    //safari
            }
		},
		get: function(id, fn){
			if (isChrome) {
                 chrome.tabs.get(id, fn);
            }else if (isSafari) {
                    //safari
            }
		},
		getSelected: function(options, fn){
			if (isChrome) {
                 chrome.tabs.getSelected(options, fn);
            }else if (isSafari) {
                  //safari
            }
		},
		update: function(id, options, fn){
			if (isChrome) {
                 chrome.tabs.update(id, options, fn);
            }else if (isSafari) {
                 //safari
            }
		},
		executeScript: function(id, options){
			if (isChrome) {
                 chrome.tabs.executeScript(id, options);
            }else if (isSafari) {
                    //safari
            }
		},
		onRemoved: {
            addListener: function(fn){
                if (isChrome) {
                    chrome.tabs.onRemoved.addListener(fn);
                }
                else if (isSafari) {
                    //safari
                }
            }
        }
    },
	windows:{
		getAll: function(options, fn){
			if (isChrome) {
                 chrome.windows.getAll(options, fn);
            }else if (isSafari) {
                    //safari
            }
		}
	},
    storage: {
        getItem: function(name){
            var v;
			if (isChrome) {
                v= localStorage.getItem(name);
            }
            else if (isSafari) {
                v= localStorage.getItem(name);
                //return safari.extension.settings.getItem(name);
            }
			if (v && typeof v ==='string' && options.autoparse){
				try {
					v = JSON.parse(v);
				}catch(e){
					//
				}
			}
			return v;
        },
        removeItem: function(name){
            if (isChrome) {
                localStorage.removeItem(name);
            }
            else if (isSafari) {
                localStorage.removeItem(name);
            }
        },
        setItem: function(name, value){
            var s = value;
			if (s && options.autoparse && typeof s ==='object'){
				s= JSON.stringify(s);
			}
			if (isChrome) {
                localStorage.setItem(name, s);
            }
            else if (isSafari) {
                localStorage.setItem(name, s);
            }
        },
        key: function(i){
            if (isChrome) {
                return localStorage.key(i);
            }
            else if (isSafari) {
                return localStorage.key(i);
                //return safari.extension.settings.key(i);
            }
        },
        getLength: function(){
            if (isChrome) {
                return localStorage.length;
            }
            else if (isSafari) {
                return localStorage.length;
                //return safari.extension.settings.length;
            }
        },
		clear:function(){
			localStorage.clear();
		}
    },
    getUrl: function(path){
        if (isChrome) {
            return 'chrome-extension://' + mycore.getGUID() + path;
        }
        else if (isSafari) {
            return safari.extension.baseURI;
			//return 'safari-extension://' + mycore.getGUID() + path;
        }
    },
    getGUID: function(){
        if (isChrome) {
            var url = chrome.extension.getURL('bg.html');
            var m = /:\/\/(\w+)/.exec(url);
            return m[1];
        }
        else if (isSafari) {
            //TODO
            var namespace = 'com.pitaso.readerplus';
            var guid = '37PA8NKYKP';
            return namespace + '-' + guid;
        }
    },
    getLocalPath: function(){
        return mycore.getProtocol() + mycore.getGUID();
    },
    getProtocol: function(){
        if (isChrome) {
            return 'chrome-extension://';
        }
        else if (isSafari) {
            return 'safari-extension://';
        }
    }
};

