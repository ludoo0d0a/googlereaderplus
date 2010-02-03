/**
 * @author Valente
 */
//home : njidamgjohnfbkeagfbnkllfkdnlpjhi
//debug : cmkepfncdncbdpmdfnkbpenhfbmmnebm
//prod: hhcknjkmaaeinhdjgimjnophgpbdgfmg
var GUID = 'cmkepfncdncbdpmdfnkbpenhfbmmnebm';
var debug = true;
if (debug){
	GUID='njidamgjohnfbkeagfbnkllfkdnlpjhi';
}

if (chrome && chrome.extension) {
    function external_call(message, options, callback){
        chrome.windows.getCurrent(function(window){
            chrome.tabs.getSelected(window.id, function(tab){
                options=options||{};
				options.tabid=tab.id;
				console.log('send "'+message+'" on '+GUID);
				chrome.extension.sendRequest(GUID, 
                {
                    message:message,
                    options: options
                }, callback);
            });
        });
    }
    
    //var backgroundPage = chrome.extension.getBackgroundPage();
    function button(a){
        if (a == 'prefs') {
            //backgroundPage.open_preferences();
			external_call('openprefs');
        } else if (a == 'reader') {
            //backgroundPage.findreader(true, true);
			external_call('findreader');
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
        //fillThemes();
    }
}
