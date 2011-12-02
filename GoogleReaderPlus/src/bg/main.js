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
    //var rc = prefs._replacer_changed;
    delete prefs._replacer_changed;
    monitorIcon(prefs);
    sendPrefsToIcon(prefs);
    activePageAction(prefs);
    //sure we changed replacer items and click save
    /*if (mprefs && rc) {
        sendReplacerToCloud(prefs);
    }*/
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
    } else if (a.message == "removeitem") {
        removeItem(a,cb);
    }  else if (a.message == "getprefs") {
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
    }else if (a.message == "savecloud") {
        if (a.db === "replacer_items") {
			sendReplacerToCloud();
		}
    }else if (a.message == "rank") {
        getRank(a,cb);
    }else if (a.message == "setcookie") {
        setCookies(a,cb);
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
			var canRemove=a.okremove, b = false;
			if (a.keycomp){
				//key compare only
				b = (key==o.data[a.key]);
			}else{
				//Complete compare
				b = (compareObject(item.data, o.data));				
			}
			
			if (b) {
				//CLOUD.counts.d[key] = (CLOUD.counts.d[key] || 0) + 1;
				CLOUD.counts.v[key] = CLOUD.counts.v[key] || [o];
				CLOUD.counts.v[key].push(item);
				
				if (!a.fixfilter || (a.fixfilter && new RegExp(a.fixfilter,'i').test(key))){
					CLOUD.counts.doublons++;
					if (canRemove && CLOUD.counts.doublons < 100) {
						console.log(CLOUD.counts.doublons+' {'+a.fixfilter+'} : remove '+item.id+ ' - ' + key);
						//console.log(item);
						r.item.remove(item, function(){
							CLOUD.counts.done++;
							console.log('************ '+CLOUD.counts.done +'/'+ CLOUD.counts.doublons);
							if (CLOUD.counts.done === CLOUD.counts.doublons) {
								console.log('************ All remove completed');
							}
						});
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
	var mirror=!a.direct;
	if (a.fix){
		//If fix no mirror, direct access
		mirror=false;
	}
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
        //sendResponse(selectors, cb);
    });
	
}

function sendReplacerToCloud(mprefs){
    var prefs = mprefs || getPrefs();
	if (!prefs.replacer_cloud || !prefs._replacer_changed){
		//abort
		alert('No changes found or cloud saving disabled');
		return;
	}

	console.log('sendReplacerToCloud items...');
    var r = new GRP.api_rest('Replacer', true);
    //Chek against real data before
    /*if (allGotIds(prefs.replacer_items)) {
		sendReplacerToCloud2(r, prefs);
	} else {*/
		getCloudData({
			name: 'Replacer',
			direct: true //no mirror
		}, function(items){
			sendReplacerToCloud2(r, prefs, items);
		});
	//}
}
function sendReplacerToCloud2(r, prefs, cloud_items){
	iterate(prefs.replacer_items, function(id, o){
		var ci = cloud_items?cloud_items[id]:false;
		console.log('createOrUpdate');
		r.item.createOrUpdate(ci, {
			name: id,
			values: o
		}, function(xhr, status, a){
			updateReplacerId(prefs, a,id);
		} , function(xhr, a){
			//updateReplacerId(prefs, a,id);
		} , cloud_items);
	});
}
function allGotIds(items){
	var r = iterate(items, function(id, o){
		if (!o.id){
			return false;
		}
	});
	return !r;
}
function updateReplacerId(prefs, a, id){
	//update id
	if (prefs && a && a.id) {
		//o.id = a.id;
		prefs.replacer_items[id].id = a.id;
		//save
		savePrefs(prefs);
	}
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
var translator=false;
function translate(o, cb){
    var init = (!translator);
    translator=translator||new GRP.lang.Translate();
	
	function gotrans(){
        translator.translate(o.text, '', o.to, function(para, translation){
           //
        }, function(translation){
        	if (translation){
	        	cb({translation:translation});
        	}else{
        		cb({error:'error'});
        	}
        });
	}
	
	translator.onReady(function(translator){
		gotrans()
	}, this);
}
function changecategory(id, from, to, prefs){
	if (typeof prefs[id+'_'+from] !== 'undefined'){
		prefs[id+'_'+to]=prefs[id+'_'+from];
		if (prefs[id+'_'+to]){
			//Activate category if true
			prefs[id]=true;
		}
		delete prefs[id+'_'+from];
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
        //Move from general to generallayout
        changecategory('topcurrent', 'general', 'generallayout', prefs);
        changecategory('bottomup', 'general', 'generallayout', prefs);
        changecategory('currdir', 'general', 'generallayout', prefs);
        changecategory('floatactions', 'general', 'generallayout', prefs);
        changecategory('icons', 'general', 'generallayout', prefs);
        changecategory('hidetoolbar', 'general', 'generallayout', prefs);
        changecategory('hideplus', 'general', 'generallayout', prefs);
        changecategory('noborder', 'theme', 'generallayout', prefs);
        
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



function getRank(a,cb){
	request({
		url:'http://api.postrank.com/v1/postrank',
		method:'post',
		dataType: 'json',
		data:{url:a.urls},
		parameters: {appkey: 'b'+(58*7+3)+'bd44ae20129dac245'+(2056*8)+'fecb6d'},
		onload:function(o){
			sendResponse(o.responseJson||{},cb);
		}
	},true);
}

function setCookies(a,cb){
	if (a.cookies) {
		foreach(a.cookies,function(o){
			setCookie(o.name, o.value);
		});
	}else if (a.name){
		setCookie(a.name, a.value);
	}
}

function checkfile(url, cb){
	request({
		url: url,
		onload: function(r){
			if (cb){
				cb(r, (r.status >= 200 && r.status <= 299));
			}
		},
		onerror: function(r){
			if (cb){
				cb(r, false);
			}
		}
	}, true);
}
