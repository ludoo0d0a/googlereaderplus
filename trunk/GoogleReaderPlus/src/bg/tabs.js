
//Try to find opened tab before open it
function open_tab(a){
    if (a.search) {
        var o = {
            search: new RegExp(a.search.replace(/^https?/, 'https?').replace(/#.*$/, '')),
            url: a.url,
			update:a.update
        };
        selecttab(o, a.selected, a.create||true, a.reload||false, a.fn);
    } else {
        opentab(a);
    }
}


function selecttab(a, selected, create, reload, fn){
    findtab(a, function(tab){
        if (tab) {
            if (selected) {
                mycore.tabs.update(tab.id, {
                    url: a.url,
                    selected: true
                }, function(tab){
                    mycore.tabs.executeScript(tab.id, 'hashchange();');
                });
            }
            if (reload){
	        	reloadTab(tab);
	        }
        } else {
            if (create) {
                a.selected = selected;
                opentab(a);
            }
        }
        if (fn && typeof fn === "function") {
            fn.call(this, tab);
        }
    });
}

function findtab(a, fn){
    mycore.windows.getAll({
        populate: true
    }, function(windows){
        var tab = false, found = false;
        for (var i = 0, len = windows.length; i < len; i++) {
            var window = windows[i];
            for (var j = 0, jlen = window.tabs.length; j < jlen; j++) {
                tab = window.tabs[j];
                var check = false;
                if (a.search && a.search.test) {
                    check = (a.search.test(tab.url));
                } else {
                    check = (tab.url.indexOf(a.search) >= 0);
                }
                if (check) {
                    found = true;
                    fn.call(this, tab);
                    break;
                }
            }
        }
        if (!found) {
            fn.call(this, false);
        }
    });
}
var reReaderTab = /^https?:\/\/\w+\.google\.\w+\/reader\//;
function findtabreader(cb){
	findtab({
		search:reReaderTab
	},cb);
}

function opentab(a){
    mycore.tabs.getSelected(null, function(tab){
		var secure = (/^https/.test(tab.url));
		var url = a.url;
		if (secure && (reReaderTab.test(url))){
			url=url.replace(/^http/,'https');
		}
		var o = {
            url: url,
            selected: (a.selected || typeof a.selected === "undefined"),
            windowId: a.windowId,
            index: a.index || (tab.index + 1)
        };
		if (a.update) {
			mycore.tabs.update(o);
		} else {
			mycore.tabs.create(o);
		}
    });
}

function openNewPage(a, id){
    chrome.tabs.getSelected(null, function(tab){
        var oldUrl = tab.url;
        var blankUrl = chrome.extension.getURL('blank.html');
        blankUrl += '#' + id;
        chrome.tabs.create({
            url: blankUrl,
            index: tab.index + 1
        }, function(tab){
            var tabs = chrome.extension.getExtensionTabs();
            for (var i = 0; i < tabs.length; i++) {
                var tb = tabs[i];
                if (tb.location.href == blankUrl && !tb.dataAlreadySet) {
                    tb.printSource(a);
                    tb.dataAlreadySet = true;
                    break;
                }
            }
        });
    });
}

var lastTabReader = false;
function monitorCloseTab(){
    //Check if greader were closed
    mycore.tabs.onRemoved.addListener(function(tabId){
        if (lastTabReader && tabId == lastTabReader.id) {
            lastTabReader = false;
        }
    });
}

function reloadTab(tabId){
	mycore.tabs.reload(tabId)
}
