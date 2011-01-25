//var READING_LIST_RE_ = new RegExp('user/[\\d]+/state/com\\.google/reading-list');
var reReader = {
    reading: /user\/[\d]+\/state\/com\.google\/reading\-list/,
    search: /https?\:\/\/www.google.com\/reader\/view\//,
    url: 'http://www.google.com/reader/view/'
};
mycore.env.background = true;
mycore.extension.onRequest.addListener(onMessageReceived);
mycore.extension.onRequestExternal.addListener(function(request, sender, sendResponse){
    if (request.keypass === "##ReaderPlusIcon") {
        console.log('CORE onRequestExternal id=' + sender.id + ' ' + request.message);
        onMessageReceived(request, false, sendResponse);
        //GUID_ICON = sender.id;
    }
});

function activePageAction(mprefs){
    //Selective tab for page icon
    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
        if (reReader.search.test(tab.url)) {
            var prefs = mprefs || getPrefs();
            var active = (prefs && prefs.general_pageicon);
            if (active) {
                chrome.pageAction.show(tabId);
                chrome.pageAction.setPopup({
                    tabId: tabId,
                    popup: 'menu.html'
                });
                /*chrome.pageAction.onClicked.addListener(function(tab){ });*/
            } else {
                chrome.pageAction.hide(tabId);
            }
        }
    });
}

function runOnSave(mprefs){
    var prefs = mprefs || getPrefs();
    var rc = prefs._replacer_changed;
    delete prefs._replacer_changed;
    monitorIcon(prefs);
    sendPrefsToIcon(prefs);
    activePageAction(prefs);
    //sure we changed replacer items and click save
    if (mprefs && rc) {
        sendReplacerToCloud(prefs);
    }
}

runOnSave();

//request, sender, callback
function onMessageReceived(a, p, cb){
    if (a.message == "track") {
        track(a);
    } else if (a.message == "loadicons") {
        loadIcons(a, cb);
    } else if (a.message == "setprefs") {
        setPreferences(a);
        sendNull(cb);
    } else if (a.message == "get") {
        getValue(a, cb);
    } else if (a.message == "set") {
        setValue(a, cb);
    } else if (a.message == "remove") {
        removeValue(a, cb);
    } else if (a.message == "getprefs") {
        getPreferences(a, cb);
    } else if (a.message == "openprefs") {
        opentab({
            url: "preferences.html"
        });
        sendNull(cb);
    } else if (a.message == "opentab") {
        open_tab(a);
        sendNull(cb);
    } else if (a.message == "findreader") {
        findreader(true, true);
        sendNull(cb);
    } else if (a.message == "geticon") {
        extractFavicon(a, cb);
    } else if (a.message == "iconcounter") {
        monitorIcon();
    } else if (a.message == "request") {
        request(a, false, cb);
    } else if (a.message == "window") {
        openwindow(a, cb);
    } else if (a.message == "igtheme") {
        igtheme(a, cb);
    } else if (a.message == "translate") {
        translate(a, cb);
    } else if (a.message == "clouddata") {
        getCloudData(a, cb);
    } else if (a.message == "exported") {
        exportitems(a);
    }else if (a.message == "micro") {
        micro(a,cb);
    }else if (a.message == "syncload") {
        syncload(a,cb);
    }else if (a.message == "syncsave") {
        syncsave(a,cb);
    }
}

function exportitems(a){
    openNewPage(a, 'export');
}

var mappers = {
    def: function(item){
        return {
            name: item.name,
            resource_url: item.resource_url,
            values: item.data
        };
    }
    /*Replacer: function(item){
     return {
     name: item.name,
     resource_url: item.resource_url,
     title: item.name,
     url: item.data.url,
     search: item.data.xpath,
     replace: item.data.replace
     };
     },
     LDRFullFeed: function(item){
     return {
     name: item.name,
     resource_url: item.resource_url,
     values: {
     title: item.name,
     url: item.data.url,
     search: 'xpath:' + item.data.xpath,
     replace: "$1"
     }
     };
     }*/
};

function getCloudData(a, cb, mapper){
    request({
        url: a.url || ('http://wedata.net/databases/' + a.name + '/items.json'),
        onload: function(xhr){
            if (xhr.status == 200) {
                console.log(a.name + ' get');
                var items = JSON.parse(xhr.responseText);
                //cache value
                var i = 0, selectors = {};
                var f = mappers[a.name] || mappers.def;
                foreach(items, function(item){
                    selectors[item.name] = f(item);
                    i++;
                });
                //store it now as cache (needs timestamp)
                mycore.storage.setItem('grp_cloud_' + a.name, selectors);
                console.log('Store Cloud DB ' + a.name + ' : ' + i + ' items');
                sendResponse(selectors, cb);
            }
        },
        onerror: function(){
            var selectors = mycore.storage.getItem('grp_cloud_' + a.name, false);
            sendResponse(selectors, cb);
        }
    }, true);
}

function sendReplacerToCloud(prefs){
    console.log('sendReplacerToCloud items...');
    var r = new GRP.api_rest('Replacer', true);
    var cloud_items = false; //mycore.storage.getItem('grp_cloud_Replacer');
    //r.item.remove_All();
    if (!cloud_items) {
        getCloudData({
            name: 'Replacer'
        }, function(items){
            sendReplacerToCloud2(r, prefs, items);
        });
    } else {
        sendReplacerToCloud2(r, prefs, cloud_items);
    }
}

function sendReplacerToCloud2(r, prefs, cloud_items){
    iterate(prefs.replacer_items, function(id, o){
        var ci = false;
        if (cloud_items) {
            ci = cloud_items[id];
        }
        r.item.createOrUpdate(ci, {
            name: id,
            values: o
        });
    });
}


/**
 * Icon monitor for unreead count
 */
var monitorId;
function monitorIcon(mprefs){
    if (monitorId) {
        window.clearInterval(monitorId);
    }
	//Check if button is installed
	call_icon('version', {}, function(o){
        //
		if (o){
			//OK
			_monitorIcon(mprefs);
		}
    });
}

function _monitorIcon(mprefs){
    var prefs = mprefs || getPrefs();
	
	var t = 5*60000;//5 min
	if (prefs && prefs.general_counterinterval) {
		t = prefs.general_counterinterval * 60000;
	}
	t=Math.max(60000, t);
    if (prefs && prefs.general_counter) {
		getUnreadCount();
        monitorId = window.setInterval(function(){
            getUnreadCount();
        }, t);
		//TODO : change setInterval with a conditional(using lastTabReader) setTimeout
		/*if (lastTabReader){
			//Tab is open, fast refresh
			t = 5000; //5s
		}
		window.setTimeout(function(){
            getUnreadCount();
			_monitorIcon(mprefs);
        }, t);*/
    }
}

function sendPrefsToIcon(mprefs){
    var prefs = mprefs || getPrefs();
    var iconprefs = {
        opendirect: prefs.general_opendirect || false
    };
    call_icon('prefs', {
        prefs: iconprefs
    }, function(){
        //
    });
}

var lastText, lastLogged;
function updateIcon(logged, text){
    var refresh = ((!lastLogged || logged !== lastLogged) && (!lastText || text !== lastText));
    refresh = true;
    if (refresh) {
        var a = {
            logged: logged,
            text: text
        };
        call_icon('updateicon', a);
        lastLogged = logged;
        lastText = text;
    }
}


monitorCloseTab();

function getUnreadCount(cb){
    if (lastTabReader) {
        updateFromTabtitle(lastTabReader);
    } else {
        findreader(false, false, function(tab){
            if (tab) {
                lastTabReader = tab;
                //From tab title
                updateFromTabtitle(tab);
            } else {
                //from xhr (1000+ limitations)
                request({
                    url: 'http://www.google.com/reader/api/0/unread-count?output=json&client=readerplus&refresh=true',
                    onload: function(xhr){
                        if (xhr.status == 200) {
                            var count = parseUnread(xhr.responseText);
                            var text;
                            if (lastText && count == 1000) {
                                //Let the last text since tab wereclosed and xhr cannot tell us more info on count
                                text = lastText;
                            } else {
                                text = formatUnread(count);
                            }
                            updateIcon(true, text);
                        } else {
                            updateIcon(false, '');
                        }
                    },
                    onerror: function(o){
                        updateIcon(false, '');
                        if (cb) {
                            cb(false);
                        }
                    }
                }, true);
            }
        });
    }
}

function formatUnread(count){
    if (!count) {
        return '';
    }
    var text = '' + count;
    if (text.length > 4 && text.lenth < 6) {
        text = text.substring(0, text.length - 3) + "k";
    } else if (count.lenth >= 6) {
        text = ">1M";
    }
    return text;
}

function updateFromTabtitle(tab, cb){
    var count = parseTabtitle(tab, function(count){
        var text = formatUnread(count);
        updateIcon(true, text);
    });
}

function parseTabtitle(tb, cb){
    //Needs update data 
    mycore.tabs.get(tb.id, function(tab){
        var checkurl = /^https?:\/\/www\.google\.com\/reader\/view/.test(tab.url);
        if (checkurl) {
            var m = /\((\d+)\+?\)/.exec(tab.title);
            var text = (m) ? m[1] : '0';
            cb.call(this, text);
        } else {
            tb = false;
        }
    });
}

function parseUnread(json){
    var o = JSON.parse(json);
    for (var i = 0, len = o.unreadcounts.length; i < len; i++) {
        var f = o.unreadcounts[i];
        if (reReader.reading.test(f.id)) {
            count = f.count;
            continue;
        }
    }
    return count;
}

function findreader(selected, create, fn){
    selecttab(reReader, selected, create, fn);
}

function openwindow(a, cb){
    delete a.message;
    chrome.windows.create(a, cb);
}

function igtheme(o, cb){
    if (o.type === 'random') {
        //random theme
        getRandomTheme(o.current, function(entry){
            prefs = getPrefs();
            prefs.ig_skin_name = entry.title;
            prefs.ig_skin_id = entry.skin_id;
            prefs.ig_skin_url = entry.link;
            setPrefs(prefs);
            cb(entry);
        }, true);
    }
}

function translate(o, cb){
    function trad(){
        google.language.translate(o.text, o.from || '', o.to, function(a){
            cb(a);
        });
    }
    if (!google.language) {
        google.load("language", "1", {
            "callback": trad
        });
    } else {
        trad();
    }
}


//+favicons_providerpageicons
function upgrade(){
    var prefs = getPrefs();
    if (prefs) {
        /*if (prefs.favicons) {
         prefs.favicons_providerpageicons = true;
         }*/
        if (isundef(prefs.general_stats)) {
            prefs.general_stats = true;
        }
        if (isundef(prefs.general_pageicon)) {
            prefs.general_pageicon = true;
        }
        setPrefs(prefs);
    }
}

function initVersion(){
    var v = mycore.storage.getItem('grp_version');
    if (v === null || v !== GRP.VERSION) {
        mycore.storage.setItem('grp_version', GRP.VERSION);
        upgrade();
        var prefs = getPrefs();
        if (prefs.general_noupdatepopup === false) {
            //no popup on minor updates
            if (isVersionMajorUpdated(v, GRP.VERSION)) {
                opentab({
                    url: "about.html"
                });
            }
        }
    }
}
