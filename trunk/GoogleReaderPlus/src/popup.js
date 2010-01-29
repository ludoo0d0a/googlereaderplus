
/**
 * @author Valente
 */
if (chrome && chrome.extension) {
    var backgroundPage = chrome.extension.getBackgroundPage();
    function button(a){
        if (a == "prefs") {
            backgroundPage.open_preferences();
        }
    }
    
    function fillThemes(){
        var combo = document.getElementById("theme");
        for (var i = 0, len = GRP.skins.length; i < len; i++) {
            var skin = GRP.skins[i];
            var opt = document.createElement('option');
            opt.value = skin.id;
            opt.textContent = skin.name;
            combo.appendChild(opt);
        }
    }
    
    function init(){
    	fillThemes();
    }
}
