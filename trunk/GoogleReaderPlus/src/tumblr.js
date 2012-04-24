/**
 * Tumblr integration
 * @version  ?
 * @date 2011-05-10
 *
  * see API docs: http://www.tumblr.com/docs/en/api
 */
GRP.tumblr = function(prefs, langs, ID, SL, lang){
    /*
    var api = {
        shortcut:'tumblr',
        tpl:{
        	url:['blogname']
        }
    };
    
    GRP.api_micro(prefs, langs, ID, SL, lang, api);
    */
   
    //popup version based on facebook
    //var BTN_CLS = 'item-share star', BTN_CLS_ID ='btn-'+ID+' '+BTN_CLS;
    var BTN_CLS = 'item-share ', BTN_CLS_ID ='btn-'+ID+' '+BTN_CLS;
	var URL='http://www.tumblr.com/share/link?url={url}&name={title}&description={description}';
	var OPTWIN = 'toolbar=0,status=0,resizable=1,width=450,height=480';
	
	addCssIcon(ID);
	
	function addButton(el, entry, mode) {
		var title = SL.text + formatShortcut(ID, 'go'+ID, prefs); //[b]
		var text = (prefs && prefs.general_icons)?'':(SL.keyword || ID);
		
		addBottomLink(el,text, title, ID, BTN_CLS, false, openShareWindow, false, entry, mode);
	}

	function addKey() {
		onKey('btn-'+ID, openShareWindow);
	}

	function openShareWindow(btn, entry, locked) {
		var active = isActive(btn, entry, ID, locked, 'btn-active', 'btn-inactive');
		addClassIf(btn, 'item-star-active',active);
		if (active) {
			var l = getEntryLink(entry, true);
			var b = getBody(entry);
			var s = {
				url: encodeURIComponent(l.url),
				title: encodeURIComponent(l.title),
				description: encodeURIComponent(b.innerText||'')
			};
			var url = fillTpl(URL, s);
			window.open(url, ID+'sharer', OPTWIN);
		} 
	}
	registerFeature(addButton, ID);
	var keycode = getShortcutKey(ID, 'go'+ID, prefs); //66 b
	keycode.fn = addKey;
	initKey(keycode);
};