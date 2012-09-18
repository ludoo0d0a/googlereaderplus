
function initprefs(){
    lang = prefs.language_lang || 'en';
    console.log('Current lang : ' + lang);
    loadLangs(lang, function(){
        loadingPage(true);
        renderScripts();
        translatePage(lang);
        specialTranslate(lang);
        renderSkins();
        renderPrefs();
        var hash = window.location.hash.substring(1) || 'general';
        showPanel(hash);
        reportNavigator();
        renderPreviewTheme();
        //renderThemes();
        renderDummies();
		textareaTab();
		renderpicker();
		renderLinks();
		loadingPage(false);
    });
}

function fixReplacer(){
	fixCloud('Replacer', 'url');
}
function fixFavicons(){
	fixCloud('Favicons', 'title');
}
function fixCloud(name, key){
	if (!GRP.FIXME) {
		return;
	}
	
	var ff = get_id(name.toLowerCase()+'_fixfilter');
	var fko = get_id(name.toLowerCase()+'_keycomp');
	var frm = get_id(name.toLowerCase()+'_okremove');
	mycore.extension.sendRequest({
	        message: "clouddata",
			name: name,
			key:key,
			fix:true,
			fixfilter:ff.value,
			keycomp:fko.value,
			okremove:frm.value
	    }, function(a){
			console.log('************ Fix done for ['+(a.doublons||'')+'] duplicate items!');
	    });
}

function syncload(){
	var r = confirm(getTextPrefs(lang, 'general', 'confirmsyncload'));
    if (r) {
		mycore.extension.sendRequest({
	        message: "syncload"
	    }, function(a){
	        gosaveprefs(a.prefs);
	    });
    }
}
function syncsave(){
	mycore.extension.sendRequest({
	        message: "syncsave",
			prefs: prefs
	    }, function(a){
	        if (a){
				info(getTextPrefs(lang, 'global', 'prefssavedok', 'en', "Preferences succesfully saved!"));
			}else{
				error(getTextPrefs(lang, 'global', 'prefssavedfailed', 'en', "Preferences save failed!"));
			}
	    });
}

function importprefs(){
    var r = confirm(getTextPrefs(lang, 'general', 'confirmimport'));
    if (r) {
		var el = document.getElementById("ieprefs");
		if (el && el.value) {
			gosaveprefs(el.value);
		}
    }
}

function gosaveprefs(value){
	if (value) {
        try {
			if (typeof value === 'string') {
				prefs = JSON.parse(value);
			} else {
				prefs = value;
			}
            saveprefs(true, true);
            info(getTextPrefs(lang, 'global', 'prefsimportedok', 'en', "Preferences imported!"));
        } 
        catch (e) {
            error(getTextPrefs(lang, 'global', 'prefsimportfailed', 'en', "Import failed!") + ' : ' + e, 'error');
        }
    }else{
		error(getTextPrefs(lang, 'global', 'prefsimportnull', 'en', "No saved preferences found!"), 'error');
	}
}

function exportprefs(synced){
    var p = {
    	g:{
    		version:GRP.getVersion()
    	}
    };
    var o = getInfo();
    if (o && o.info){
    	p.g.nav=o.info;
    }
    iterate(prefs, function(i, pref){
        if (i && pref && !(/password/.test(i))) {
            p[i] = pref;
        }
    });
    var value = JSON.stringify(p);
	if (synced){
		saveStorage(value);
	}else{
		var el = document.getElementById("ieprefs");
		el.value = value;
	}
}

function isChecked(form, name){
    return (form && form[name] && form[name].checked);
}

function applyprefs(){
    var form = document.frmprefs;
    //general checked if one option ON 
    if (isChecked(form, 'general_secure') ||
    isChecked(form, 'general_counter') ||
    isChecked(form, 'general_opendirect')) {
        if (form.general) {
            form.general.checked = true;
        }
    }
    for (var i in form) {
        var ctrl = form[i];
        if (ctrl && ctrl.name && !hasClass(ctrl, 'ignore')) {
            var o = ctrl.name;
            if (typeof ctrl.key !== "undefined") {
                //shortcut code
                prefs[o] = ctrl.key;
            } else if (ctrl.type === "checkbox") {
                if (ctrl.checked || prefs[o]) {
                    prefs[o] = ctrl.checked;
                }
            } else if (ctrl.nodeName === "TEXTAREA") {
                if (EDITORS && EDITORS[o]) {
                    prefs[o] = EDITORS[o].getCode();
                    //ctrl.innerHTML=prefs[o];
                } else {
                    var v = ctrl.value;
                    if (v || prefs[o]) {
                        if (hasClass(ctrl, 'xlist')) {
                            v = v.split('\n');
                        }
                        prefs[o] = v;
                    }
                    
                }
            } else {
                if (ctrl.value || prefs[o]) {
                    prefs[o] = ctrl.value;
                }
            }
            //keep prefs light
			/*if (!prefs[o]) {
                delete prefs[o];
            }*/
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
    chrome.extension.sendRequest({
        message: "setprefs",
        prefs: prefs,
        cleanall: cleanall || false
    });
    run_extshortcuts();
    info(getTextPrefs(lang, 'global', 'prefssaved', 'en', "Preferences saved"));
    if (reload) {
        window.location.reload();
    }
}

function renderPrefs(){
    if (prefs) {
        var select = get_id("language_lang");
        if (select) {
            select.value = lang;
        }
        //console.log(prefs);
        for (var o in prefs) {
            var ctrl = document.frmprefs[o];
            if (ctrl && (typeof prefs[o] !== 'undefined')) {
                if (!hasClass(ctrl, 'ignore')) {
                    //This could help
                    //var m = /([^_]+)_(.*)/.exec(o);
                    //var script = m[1], name= m[2];
                    //var opts = GRP.scripts[script].options[name];
                    var opts = {};
                    if (ctrl.tagName === "INPUT") {
                        if (ctrl.key) {
                            //shortcut
                            var key = unmarshallKey(prefs[o]);
                            setShortcut(key, ctrl);
                        } else if (ctrl.type === "checkbox") {
                            ctrl.checked = (prefs[o] === true);
                        } else {
                            //text,password,hidden
                            ctrl.value = prefs[o];
                        }
                    } else if (ctrl.nodeName === "SELECT") {
                        ctrl.value = prefs[o];
                    } else if (ctrl.nodeName === "TEXTAREA") {
                        if (EDITORS && EDITORS[o]) {
                            var ed = EDITORS[o];
                            var p = prefs[o];
                            window.setTimeout(function(){
                                ed.setCode(p);
                            }, 500);
                        } else {
                            var v = prefs[o];
                            if (isArray(v)) {
                                v = v.join(opts.sep || '\n');
                            } else if (typeof v === 'object') {
                                try {
                                    v = JSON.stringify(v);
                                } 
                                catch (e) {
                                    //
                                }
                            }
                            ctrl.value = v;
                        }
                    }
                }
            }
        }
        loadSkin();
        loadCruds();
    }
}

function reportNavigator(){
    createReport(getInfo());
}

function initGRP(){
    GRP.setVersion();
    var me = this;
    mycore.extension.sendRequest({
        message: "getprefs"
    }, function(a){
        prefs = a.prefs;
        initprefs();
    });
}

function error(msg){
	info(msg, 'error');
}
var status_init=false;
function info(msg, cls){
    var status = document.getElementById('status');
    var content = document.getElementById('status-content');
    var elClose = document.getElementById('status-close');
    function hidestatus(){
	        status.style.bottom='-200px';
	        setTimeout(function(){
	        	status.className = 'hidden';
	        	content.innerHTML = "";
	        }, 800);
    }
    if (!status_init){
	    elClose.addEventListener('click',hidestatus,false);
	    status_init=true;
    }
    content.innerHTML = msg;
    status.className = (cls || '');
    status.style.bottom='0px';
    setTimeout(function(){
        hidestatus();
    }, 3000);
}

function findReader(){
    chrome.extension.sendRequest({
        message: "findreader"
    });
}

function specialTranslate(lang){
    var el = document.getElementById("t_link_about");
    if (el) {
        el.href = "about.html?lang=" + lang;
    }
}

function hashchange(){
    var script = location.hash;
    showPanel(script);
}

function renderDummies(){
    if (GRP.beta){
    	var eb = get_id('beta');
    	eb.innerHTML = 'BETA'+GRP.beta+' - only for tests';
    }
    
    /*var sel = get_id('language_lang');
     if (sel){
     sel.addEventListener('change', onLang);
     sel.addEventListener('keyup', onLang);
     }*/
    setTimeout(function(){
	    get_id('fbbtn').innerHTML = '<iframe class="ifbook" src="http://www.facebook.com/plugins/like.php?href=https%253A%252F%252Fchrome.google.com%252Fextensions%252Fdetail%252Fhhcknjkmaaeinhdjgimjnophgpbdgfmg&amp;layout=button_count&amp;action=recommend&amp;font=trebuchet%2Bms&amp;colorscheme=dark" scrolling="no" frameborder="0" allowTransparency="true"></iframe>';
	    //get_id('badgetwitter').innerHTML = '';
	    //get_id('badgestumbleupon').innerHTML = '<script defer async="true" src="http://www.stumbleupon.com/hostedbadge.php?s=1&r=https://chrome.google.com/webstore/detail/hhcknjkmaaeinhdjgimjnophgpbdgfmg"></script>';
		//get_id('badgestumbleupon').innerHTML = '<iframe defer src="http://www.stumbleupon.com/badge/embed/1/?url=https://chrome.google.com/webstore/detail/hhcknjkmaaeinhdjgimjnophgpbdgfmg" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:74px; height: 18px;" allowTransparency="true"></iframe>';							
    },300);
}

function loadingPage(loaded){
	var el = get_id('loading');
	addClass(el, 'hidden', loaded);
}

function setnewbar(status){
	chrome.extension.sendRequest({
		message: "setnewbar",
		status:status
	}, function(data){
		if (status){
			info(getTextPrefs(lang, 'global', 'newbarok', 'en', "New bar set!"));
		}else{
			info(getTextPrefs(lang, 'global', 'oldbarok', 'en', "Old bar restored!"));
		}
	});
}
