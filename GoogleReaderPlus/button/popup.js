/**
 * @author Valente
 */
var backgroundPage = chrome.extension.getBackgroundPage();
function button(a){
    if (a == 'prefs') {
        call_core('openprefs');
    } else if (a == 'reader') {
        call_core('findreader');
    }
}

function init(){
    var opendirect = backgroundPage.getPref('icon_opendirect');
    if (opendirect) {
        call_core('findreader');
        window.close();
    }
}

