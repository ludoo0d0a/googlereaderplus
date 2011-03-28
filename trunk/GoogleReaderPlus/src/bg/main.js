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
    }else if (a.message == "blogger") {
        postblogger(a,cb);
    }else if (a.message == "popupblogger") {
        popupBlogger(a,cb);
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
            values: item.data,//to remove ?
			data: item.data
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

var CLOUD = {}; 
function fixCloudItem(item, o,r,a){
	if (o){
		//remove doublon
		item.id = getIdFromResourceUrl(item);
		if (item.id) {
			var key = item.data[a.key];
			//url,search,replace
			var canRemove=false, b = false;
			if (a.fixkeyonly){
				//key compare only
				b = (key==o.data[a.key]);
			}else{
				//Complete compare
				b = (compareObject(item.data, o.data));				
				canRemove=true;
			}
			
			if (b) {
				//CLOUD.counts.d[key] = (CLOUD.counts.d[key] || 0) + 1;
				CLOUD.counts.v[key] = CLOUD.counts.v[key] || [o];
				CLOUD.counts.v[key].push(item);
				
				if (!a.fixfilter || (a.fixfilter && new RegExp(a.fixfilter,'i').test(key))){
					if (CLOUD.counts.doublons < 100) {
						CLOUD.counts.doublons++;
						console.log(CLOUD.counts.doublons+' {'+a.fixfilter+'} : remove '+item.id);
						//console.log(item);
						if (canRemove) {
							r.item.remove(item, function(){
								CLOUD.counts.done++;
								if (CLOUD.counts.done == CLOUD.counts.doublons) {
									console.log('************ All remove completed');
								}
							});
						}
					}
				}
			} else {
				CLOUD.counts.keydoublons++;
				
				CLOUD.counts.kv[key] = CLOUD.counts.kv[key] || [o];
				CLOUD.counts.kv[key].push(item);
			}
		}
	}
}

function getCloudData(a, cb, mapper){
	var mirror=!a.fix;//If fix no mirror, direct access
	var r = new GRP.api_rest(a.name, true, mirror);
	
	//Load wedata cloud data
	r.item.getAll({}, function(items, success){
		var selectors = {};
		if (success) {
			if (a.fix){
				CLOUD.counts={doublons:0,keydoublons:0,done:0,d:{},v:{},kv:{}};
			}
			//cache value
            var i = 0,f = mappers[a.name] || mappers.def;
            foreach(items, function(item){
                if (a.fix && selectors[item.name]){
					//Remove this one
					fixCloudItem(item, selectors[item.name],r,a);
				}
				selectors[item.name] = f(item);
                i++;
            });
			
			if (a.fix) {
				console.log('total=' + items.length);
				console.log('doublons=' + CLOUD.counts.doublons);
				//console.log(CLOUD.counts.d);
				console.log(CLOUD.counts.v);
				console.log('keydoublons[/'+a.key+']=' + CLOUD.counts.keydoublons);
				console.log(CLOUD.counts.kv);		
				sendResponse(CLOUD.counts, cb);
			} else {
			
				//store it now as cache (needs timestamp)
				mycore.storage.setItem('grp_cloud_' + a.name, selectors);
				console.log('Store Cloud DB ' + a.name + ' : ' + i + ' items');
				sendResponse(selectors, cb);
			}
        }
        sendResponse(selectors, cb);
    });
	
}

function sendReplacerToCloud(prefs){
    if (!prefs.replacer_cloud){
		//abort
		return;
	}
	console.log('sendReplacerToCloud items...');
    var r = new GRP.api_rest('Replacer', true);
    var cloud_items = false; //mycore.storage.getItem('grp_cloud_Replacer');
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
