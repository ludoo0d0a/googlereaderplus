/**
 * @author Valente
 */
var backgroundPage = chrome.extension.getBackgroundPage();
function button(a){
    if (a == 'prefs') {
        //backgroundPage.open_preferences();
        call_core('openprefs');
    } else if (a == 'reader') {
        //backgroundPage.findreader(true, true);
        call_core('findreader');
    }
}

/*
 function fillThemes(){
 var combo = document.getElementById("theme");
 for (var i = 0, len = GRP.skins.length; i < len; i++) {
 var skin = GRP.skins[i];
 var opt = document.createElement('option');
 opt.value = skin.id;
 opt.textContent = skin.name;
 combo.appendChild(opt);
 }
 }*/
function init(){
    /*external_call('getprefs', null, function(a){
     prefs=a.prefs;
     });*/
    var opendirect = backgroundPage.getPref('icon_opendirect');
    if (opendirect) {
        call_core('findreader');
        window.close();
    }
}

