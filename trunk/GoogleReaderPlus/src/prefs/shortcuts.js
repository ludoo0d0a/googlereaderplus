function run_extshortcuts(){
    //update all Keyboard shortcuts
    var key, html = '';
    var tplShorcut = '<li><span>{keytext}</span>{title}</li>';
    var grpshortcuts = document.getElementById('grpshortcuts');
    grpshortcuts.innerHTML = '';
    for (var i = 0, len = GRP.scripts.length; i < len; i++) {
        var script = GRP.scripts[i];
        if (script.shortcuts) {
            for (var sid in script.shortcuts) {
                var shortcut = script.shortcuts[sid];
                if (prefs && prefs[script.id + '_key_' + sid]) {
                    key = unmarshallKey(prefs[script.id + '_key_' + sid]);
                } else {
                    key = shortcut.key;
                }
                shortcut.keytext = formatKey(key);
                html += fillTpl(tplShorcut, shortcut);
            }
        }
    }
    grpshortcuts.innerHTML = html;
}

function renderShortcuts(el, script){
	iterate(script.shortcuts, function(sid, shortcut){
        createShortcut(el, script, shortcut, sid);
    });
}

function createShortcut(el, script, shortcut){
    var div = document.createElement('div');
    div.className = 'shortcut';
    
    var label = document.createElement('label');
    var t = getText(lang, script.id, 'shortcut_' + shortcut.id);
	if (t) {
        shortcut.title = t;
    }
    label.innerHTML = shortcut.title + ':';
    
    div.appendChild(label);
    var input = document.createElement('input');
    input.type = 'text';
    input.size = 15;
    input.className = 'shortcut';
    input.id = script.id + '_key_' + shortcut.id;
    var key = shortcut.key;
    //use default value on creation
    setShortcut(key, input);
    
    var scriptId = script.id;
    var shortcutId = shortcut.id;
    
    input.onkeydown = function(e){
        e.preventDefault();
        e.stopPropagation();
        fixShortcut(e, e.target);
    };
    div.appendChild(input);
    
    var br = document.createElement('br');
    br.className = 'clearall';
    div.appendChild(br);
    
    el.appendChild(div);
}

function isShortcutFree(e){
    var text = formatKey(e);
    var key = marshallKey(e);
    
    //custom in prefs
    if (gshortcuts[key]) {
        var warning1 = getTextPrefs(lang, 'extshortcuts', 'alreadyusedprefs');
		return warning1;
    }
    
    //google
    if (GRP.googleshortcuts && GRP.googleshortcuts[text]) {
        var warning2 = getTextPrefs(lang, 'extshortcuts', 'alreadyusedgoogle');
		return warning2+'<br/>(' + GRP.googleshortcuts[text] + ')';
    }
    
    return true;
}

function setShortcut(key, ctrl){
    if (!key.keyCode) {
        //error
        return;
    }
    //remove old
    delete gshortcuts[ctrl.key];
    ctrl.value = formatKey(key);
    ctrl.key = marshallKey(key);
    //add new
    gshortcuts[ctrl.key] = key;
    prefs[ctrl.id] = ctrl.key;
}

//function fixShortcut(e, hidden, input){
function fixShortcut(e, input){
    //himself?
    var newKey = marshallKey(e);
    if (input.key == newKey) {
        return;
    }
    var free = isShortcutFree(e);
    var warn = input.nextSibling;
    if (free === true) {
        if (warn) {
            warn.className = 'warning hidden';
        }
        input.className = '';
        setShortcut(e, input);
    } else {
        //Already set
        if (!hasClass(warn, 'warning')) {
            warn = document.createElement('div');
            warn.className = 'warning';
            insertAfter(warn, input);
        }
        warn.className = 'warning';
        input.value = formatKey(e);
        input.className = 'warning';
        warn.innerHTML = free;
    }
}
