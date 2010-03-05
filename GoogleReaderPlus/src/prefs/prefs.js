
function initprefs(){
    lang = prefs.language_lang || 'en';
    loadLangs(lang, function(){
        renderScripts();
        translatePage(lang);
        specialTranslate(lang);
        renderSkins();
        reportNavigator();
        renderPrefs();
		var current = window.location.hash.substring(1) || 'theme';
		showPanel(current);
    });
}

function applyprefs(){
    var form = document.frmprefs;
    //general checked if one option ON 
    if (form.general_secure.checked ||
    form.general_counter.checked ||
    form.general_opendirect.checked) {
        form.general.checked = true;
    }
    for (var i in form) {
        var ctrl = form[i];
        if (ctrl && !hasClass(ctrl, 'ignore')) {
            var o = ctrl.name;
            if (typeof ctrl.key !== "undefined") {
                //shortcut code
                prefs[o] = ctrl.key;
            } else if (ctrl.type === "checkbox") {
                prefs[o] = ctrl.checked || false;
            } else {
                prefs[o] = ctrl.value;
            }
        }
    }
    var select = document.getElementById("language_lang");
    if (select) {
        prefs.language_lang = select.value;
    }
}

function saveprefs(reload, cleanall){
    if (!cleanall) {
        applyprefs();
    }
    if (prefs && lang !== prefs.language_lang) {
        //reload if lang changed!
        reload = true;
    }
    
	chrome.extension.sendRequest(
    {
        message: "setprefs",
        prefs: prefs,
        cleanall: cleanall || false
    });
    run_extshortcuts();
    info("Preferences saved");
    if (reload) {
        window.location.reload();
    }
}

function renderPrefs(){
    if (prefs) {
        var select = document.getElementById("language_lang");
        if (select) {
            select.value = lang;
        }
        
        for (var o in prefs) {
            var ctrl = document.frmprefs[o];
            if (ctrl && (typeof prefs[o] !== 'undefined')) {
                if (!hasClass(ctrl, 'ignore')) {
                    if (ctrl.tagName === "INPUT") {
                        if (ctrl.key) {
                            //shortcut
                            var key = unmarshallKey(prefs[o]);
                            setShortcut(key, ctrl);
                        } else if (ctrl.type === "checkbox") {
                            ctrl.checked = (prefs[o] === true);
                        } else if (ctrl.type === "text") {
                            ctrl.value = prefs[o];
                        } else if (ctrl.type === "password") {
                            ctrl.value = prefs[o];
                        } else if (ctrl.type === "hidden") {
                            ctrl.value = prefs[o];
                        }
                    } else if (ctrl.nodeName === "TEXTAREA") {
                        ctrl.value = prefs[o];
                    }
                }
            }
        }
        loadSkin();
        loadCruds();
    }
}

