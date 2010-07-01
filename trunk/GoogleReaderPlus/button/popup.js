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
    var opendirect = backgroundPage.getPref('general_opendirect');
	console.log('opendirect='+opendirect);
    if (opendirect) {
        call_core('findreader');
        window.close();
    }
}

