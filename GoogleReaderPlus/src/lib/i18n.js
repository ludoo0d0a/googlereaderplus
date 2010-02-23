/**
 * @author Valente
 */
function translatePage(lang){
    var translations = (GRP.langs[lang]) ? GRP.langs[lang].prefs : false;
    if (translations) {
        for (var name in translations) {
            var texts = translations[name];
            for (var key in texts) {
                var text = texts[key];
                var id = 't_'+((name==='global')?'':(name+'_'))+key;
				var el = document.getElementById(id);
                if (el) {
                    el.innerHTML = text;
                }
            }
        }
    }
}

function getAllTexts(){
    var texts = getElements("//*[starts-with(@id, 't_')]");
    var translations = {};
    for (var i = 0, len = texts.length; i < len; i++) {
        var id = texts[i].id;
        var o = splitId(id);
        
        var text = texts[i].innerHTML;
        text = text.replace(/\n/g, '');
        if (!translations[o.name]) {
            translations[o.name] = {};
        }
        translations[o.name][o.key] = text.trim();
    }
    document.write("<!--" + JSON.stringify(translations) + "-->");
}

function splitId(id){
    var key, name;
    var m = id.split('_');
    if (m.length == 2) {
        name = 'global';
        key = m[1];
    } else {
        name = m[1];
        m.shift();
        m.shift();
        key = m.join('_');
    }
    return {
        key: key,
        name: name
    };
}
