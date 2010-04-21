/**
 * API for entry
 *
 */
GRP.api_entry = function(prefs, langs, ID, SL, lang, edata){
    var locked = false;
    if (prefs && prefs[ID + '_locked']) {
        locked = prefs[ID + '_locked'];
    }
    function addButton(el, entry, mode){
        var text = (SL.text || ID) + formatShortcut(ID, edata.action, prefs); //[x]
        addBottomLink(el, SL.keyword || ID, text, ID, '', false, edata.cb, locked, entry, mode);
    }
    function addKey(e){
        var entry = getEntry(e);
        cbentry('btn-' + ID, entry);
    }
    if (edata.css) {
        var css;
        if (edata.css.code) {
            css = edata.css.code;
        } else if (edata.css.image) {
            //http://images.google.com/images/isr_c.gif
            css = ".btn-" + ID + " {margin-left: 4px;padding: 1px 8px 1px 16px;;width:14px;height:14px;background-repeat:no-repeat;}";
            if (edata.css.image.url) {
				css += ".background-image:url(" + edata.css.image.url + ");";
			}else if (edata.css.image.base64) {
				css += ".background-image:url(data:image/png;base64," + edata.css.image.base64 + ");";
			}
            css += "}";
        }
        if (css) {
            GM_addStyle(css);
        }
    }
    registerFeature(addButton, ID);
    var keycode = getShortcutKey(ID, edata.action, prefs); //88//x
    if (keycode) {
        keycode.fn = addKey;
        initKey(keycode);
    }
};
