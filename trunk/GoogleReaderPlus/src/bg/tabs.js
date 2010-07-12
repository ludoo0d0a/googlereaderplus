
//Try to find opened tab before open it
function open_tab(a){
    if (a.search) {
        var o = {
            search: new RegExp(a.search.replace(/^https?/, 'https?').replace(/#.*$/, '')),
            url: a.url
        };
        selecttab(o, a.selected, a.create || true, a.fn);
    } else {
        opentab(a);
    }
}


function selecttab(a, selected, create, fn){
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

function opentab(a){
    mycore.tabs.getSelected(null, function(tab){
        var o = {
            url: a.url,
            selected: (a.selected || typeof a.selected === "undefined"),
            windowId: a.windowId,
            index: a.index || (tab.index + 1)
        };
        mycore.tabs.create(o);
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
