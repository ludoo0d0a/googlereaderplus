if (false && chrome.contextMenus) {
    // A generic onclick callback function.
    function genericOnClick(info, tab){
        console.log("item " + info.menuItemId + " was clicked");
        console.log("info: " + JSON.stringify(info));
        console.log("tab: " + JSON.stringify(tab));
    }
        
    // Create a parent item and two children.
    var child1 = chrome.contextMenus.create({
        "title": "Settings",
        "onclick": function(info, tab){
			genericOnClick(info,tab);
			GM_openInTab(mycore.getUrl('/preferences.html'));
		}
    });
    var child2 = chrome.contextMenus.create({
        "title": "Change theme",
        "onclick": function(info, tab){
			genericOnClick(info,tab);
			GM_openInTab(mycore.getUrl('/preferences.html#theme'));
		}
    });
	var child4 = chrome.contextMenus.create({
        "title": "Add a replacer expression",
        "onclick": function(info, tab){
			var l = getEntryLink();
			var o = {
		        title:l.title,
				url: info.linkUrl||l.url
    		};
			var params = '/'+JSON.stringify(o);
			GM_openInTab(mycore.getUrl('/preferences.html#replacer'+escape(params)));
		}
    });
}
