function initMenu(){
    dh('prefs', 'a', {
        href: '#',
        text: 'Preferences',
		cls:'first'
    }, {
        click: function(){
            GM_openInTab(mycore.getUrl('/preferences.html'));
        }
    });
    dh('theme', 'a', {
        href: '#',
        text: 'Themes'
    }, {
        click: function(){
            GM_openInTab(mycore.getUrl('/preferences.html#theme'));
        }
    });
	dh('export', 'a', {
        href: '#',
        text: 'Export',
		cls:'last'
    }, {
        click: function(){
            mycore.page.postMessage('export');
			/*mycore.extension.sendRequest({
				message: 'export'
			});*/
        }
    });	
}
//document.onload = function(){
	initMenu();
//};

