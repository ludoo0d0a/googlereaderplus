
function getValue(a, cb){
	var prefs = readPrefs();
	var value = prefs[a.name];
	if (isFunction(cb)){
		cb(value);
	}
}
function setValue(a, cb){
	var prefs = readPrefs();
	prefs[a.name]=a.value;
	savePrefs(prefs);
	if (isFunction(cb)) {
		cb(prefs[a.name]);
	}
}
function removeValue(a, cb){
	var prefs = readPrefs();
	delete prefs[a.name];
	savePrefs(prefs);
	if (isFunction(cb)) {
		cb(true);
	}
}

function savePrefs(prefs){
    mycore.storage.setItem('grp_prefs', prefs);
}
function setPrefs(prefs, cleanall){
    savePrefs(prefs);
    if (cleanall) {
        mycore.storage.setItem('grp_favicons', '');
    }
    runOnSave(prefs);
}

function setPreferences(a){
    mycore.storage.clear();
    mycore.storage.setItem('grp_version', GRP.VERSION);
    setPrefs(a.prefs, a.cleanall);
}

function readPrefs(){
    return mycore.storage.getItem('grp_prefs');
}

function getPrefs(a, ignoreCheck){
    var prefs = readPrefs();
    prefs = checkPrefs(prefs);
    return prefs;
}

function getPreferences(a, cb){
    initVersion();
    var prefs = getPrefs();
    if (cb) {
        cb.call(this, {
            message: "prefs",
            prefs: prefs
        });
    } else {
        sendResponse({
            message: "prefs",
            prefs: prefs
        }, cb);
    }
    return prefs;
}

function checkPrefs(prefs){
    prefs = prefs || {};
    //set default if not
    iterate(GRP.scripts, function(id, script){
        //options
        iterate(script.options, function(option, o){
            if (!(o && typeof o === 'object' && o.label)) {
                id = script.id + '_' + option;
                if (typeof prefs[id] === "undefined") {
                    prefs[id] = getTypedValue(o);
                }
            }
        });
        //shortcuts
        iterate(script.shortcuts, function(shortcut, o){
            id = script.id + '_key_' + shortcut;
            if (typeof prefs[id] === "undefined") {
                prefs[id] = o;
            }
        });
    }, this, true);
    checkIconDomains(prefs);
    return prefs;
}
