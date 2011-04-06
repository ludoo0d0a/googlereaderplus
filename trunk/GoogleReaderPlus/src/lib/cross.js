/**
 * Crossbrowser implementation for native browser
 *
 * @param {Object} a
 * @param {Object} fn
 */
var mycore = {
    env: {
        background: false,
        chrome: (typeof chrome !== "undefined" && chrome.extension),
        safari: (typeof safari !== "undefined"),
        prefix: '',
        autoparse: true
    },
    application: {
        sendRequest: function(a, fn, b){
            if (mycore.env.chrome) {
            
            } else if (mycore.env.safari) {
                safari.application.addEventListener(a.message, fn, false);
            }
        }
        
    },
    extension: {
        sendRequest: function(){
            //to bg
            var guid = false, a, fn, l = arguments.length;
            if (l > 2) {
                guid = arguments[0];
                a = arguments[1];
                fn = arguments[2];
            } else {
                a = arguments[0];
                fn = arguments[1];
            }
            
            if (mycore.env.chrome) {
                if (guid) {
                    if (fn) {
                        chrome.extension.sendRequest(guid, a, fn);
                    } else {
                        chrome.extension.sendRequest(guid, a);
                    }
                } else {
                    if (fn) {
                        chrome.extension.sendRequest(a, fn);
                    } else {
                        chrome.extension.sendRequest(a);
                    }
                }
                //chrome.extension.sendRequest(arguments);
            } else if (mycore.env.safari) {
                safari.self.addEventListener('crossaction', function(e){
                    var a = e;
                    a.message = a.name;
                    delete a.name;
                    fn(a);
                }, false);
                safari.self.tab.dispatchMessage('crossaction', a);
            }
        },
        onRequest: {
            addListener: function(fn){
                //from bg
                if (mycore.env.chrome) {
                    chrome.extension.onRequest.addListener(fn);
                } else if (mycore.env.safari) {
                    safari.application.addEventListener('crossaction', fn, false);
                }
            }
        },
        onRequestExternal: {
            addListener: function(fn){
                if (mycore.env.chrome) {
                    chrome.extension.onRequestExternal.addListener(fn);
                } else if (mycore.env.safari) {
                    safari.application.addEventListener('crossaction', fn, false);
                }
            }
        }
    },
    page: {
        listen: function(cb){
			if (mycore.env.chrome) {
				chrome.extension.onConnect.addListener(function(port){
					port.onMessage.addListener(cb);
				});
			}
		},
		postMessage: function(msg, cb, options){
            function post(msg, cb, options, tab){
                if (mycore.env.chrome) {
                    var port = chrome.tabs.connect(tab.id);
                    port.postMessage({
                        message: msg,
                        tab: tab.tabId,
                        options: options
                    });
                    port.onMessage.addListener(cb);
                } else if (mycore.env.safari) {
                    //safari
                }
            }
            
            if (options && options.tab) {
                post(msg, cb, options, tab);
            } else {
                mycore.tabs.getSelected(null, function(tab){
                    post(msg, cb, options, tab);
                });
            }
            
        }
    },
    tabs: {
        create: function(options){
            if (mycore.env.chrome) {
                chrome.tabs.create(options);
            } else if (mycore.env.safari) {
                //safari
            }
        },
        get: function(id, fn){
            if (mycore.env.chrome) {
                chrome.tabs.get(id, fn);
            } else if (mycore.env.safari) {
                //safari
            }
        },
        getSelected: function(options, fn){
            if (mycore.env.chrome) {
                chrome.tabs.getSelected(options, fn);
            } else if (mycore.env.safari) {
                //safari
            }
        },
        update: function(id, options, fn){
            if (mycore.env.chrome) {
                chrome.tabs.update(id, options, fn);
            } else if (mycore.env.safari) {
                //safari
            }
        },
        executeScript: function(id, options){
            if (mycore.env.chrome) {
                chrome.tabs.executeScript(id, options);
            } else if (mycore.env.safari) {
                //safari
            }
        },
        onRemoved: {
            addListener: function(fn){
                if (mycore.env.chrome) {
                    chrome.tabs.onRemoved.addListener(fn);
                } else if (mycore.env.safari) {
                    //safari
                }
            }
        }
    },
    windows: {
        getAll: function(options, fn){
            if (mycore.env.chrome) {
                chrome.windows.getAll(options, fn);
            } else if (mycore.env.safari) {
                //safari
            }
        }
    },
    storage: {
        getItem: function(name, def, cb){
            var v = null;
            if (mycore.env.chrome) {
                if (cb && !mycore.env.background) {
                    mycore.extension.sendRequest({
                        message: 'get',
                        name: name
                    }, function(o){
						cb((typeof o !== 'undefined')?o:def);
                    });
                } else {
                    if (!mycore.env.background) {
                        name = mycore.env.prefix + name;
                    }
                    v = localStorage.getItem(name);
                }
            } else if (mycore.env.safari) {
                v = localStorage.getItem(name);
                //return safari.extension.settings.getItem(name);
            }
            if (v && typeof v === 'string' && mycore.env.autoparse) {
                try {
                    v = JSON.parse(v);
                } catch (e) {
                    //
                }
            }
            v = (typeof v !== 'undefined')?v:def;
            if (cb && typeof v === 'function') {
                cb(v);
            }
            return v;
        },
        removeItem: function(name, cb){
            if (mycore.env.chrome) {
                if (!mycore.env.background) {
                    mycore.extension.sendRequest({
                        message: 'remove',
                        name: name
                    }, cb||null);
                } else {
                    if (!mycore.env.background) {
                        name = mycore.env.prefix + name;
                    }
                    localStorage.removeItem(name);
                }
            } else if (mycore.env.safari) {
                localStorage.removeItem(name);
            }
        },
        setItem: function(name, value, cb){
            var s = value;
            if (s && mycore.env.autoparse && typeof s === 'object') {
                s = JSON.stringify(s);
            }
            if (mycore.env.chrome) {
                if (cb !== false && !mycore.env.background) {
                    mycore.extension.sendRequest({
                        message: 'set',
                        name: name,
                        value: value
                    }, cb);
                } else {
                    if (!mycore.env.background) {
                        name = mycore.env.prefix + name;
                    }
                    try {
						localStorage.setItem(name, s);
					}catch(e){
						console.error('Cannot store '+name+ ' ['+e.name+']');
						console.log(s.length+ ' characters : '+ s.substring(0,400)+'...');
						return false;
					}
                }
            } else if (mycore.env.safari) {
                localStorage.setItem(name, s);
            }
			return true;
        },
        key: function(i){
            if (mycore.env.chrome) {
                return localStorage.key(i);
            } else if (mycore.env.safari) {
                return localStorage.key(i);
                //return safari.extension.settings.key(i);
            }
        },
        getLength: function(cb){
            var v = -1;
            if (mycore.env.chrome) {
                v = localStorage.length;
            } else if (mycore.env.safari) {
                v = localStorage.length;
                //return safari.extension.settings.length;
            }
            if (cb && typeof v === 'function') {
                cb(v);
            }
            return v;
        },
        clear: function(){
            localStorage.clear();
        }
    },
    getUrl: function(path){
        if (mycore.env.chrome) {
            return 'chrome-extension://' + mycore.getGUID() + path;
        } else if (mycore.env.safari) {
            return safari.extension.baseURI;
            //return 'safari-extension://' + mycore.getGUID() + path;
        }
    },
    getGUID: function(){
        if (mycore.env.chrome) {
            var url = chrome.extension.getURL('bg.html');
            var m = /:\/\/(\w+)/.exec(url);
            return m[1];
        } else if (mycore.env.safari) {
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
        if (mycore.env.chrome) {
            return 'chrome-extension://';
        } else if (mycore.env.safari) {
            return 'safari-extension://';
        }
    }
};

