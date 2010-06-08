/**
 * Crossbrowser implementation for native browser
 *
 * @param {Object} a
 * @param {Object} fn
 */
var isChrome = (typeof chrome !== "undefined");
var isSafari = (typeof safari !== "undefined");

var mycore = {
    extension: {
        sendRequest: function(){
			if (isChrome) {
				var guid, a, fn, l = arguments.length;
				if (l>2){
					guid=arguments[0];
					a=arguments[1];
					fn=arguments[2];
					chrome.extension.sendRequest(guid, a, fn);
				}else{
					a=arguments[0];
					fn=arguments[1];
					chrome.extension.sendRequest(a, fn);
				}
				//chrome.extension.sendRequest(arguments);
            }
            else if (isSafari) {
                safari.self.addEventListener("message", function(e){
                    fn(e);
                }, false);
                safari.self.tab.dispatchMessage(a.message, a);
            }
        },
		
        onRequest:{
			addListener: function(fn){
                if (isChrome) {
                    chrome.extension.onRequest.addListener(fn);
                }
                else if (isSafari) {
                    //safari.self.tab.dispatchMessage(a.message, a);
                }
            }
        },
        onRequestExternal:{
			addListener: function(fn){
                if (isChrome) {
                    chrome.extension.onRequestExternal.addListener(fn);
                }
                else if (isSafari) {
                    //safari.self.tab.dispatchMessage(a.message, a);
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
            if (isChrome) {
                return localStorage.getItem(name);
            }
            else if (isSafari) {
                return localStorage.getItem(name);
                //return safari.extension.settings.getItem(name);
            }
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
            if (isChrome) {
                localStorage.setItem(name, value);
            }
            else if (isSafari) {
                localStorage.setItem(name, value);
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
        }
        
    },
    getUrl: function(path){
        if (isChrome) {
            return 'chrome-extension://' + mycore.getGUID() + path;
        }
        else if (isSafari) {
            return 'safari-extension://' + mycore.getGUID() + path;
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

