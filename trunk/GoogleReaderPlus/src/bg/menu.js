function initMenu(){
    dh('readersettings', 'a', {
        href: '#',
        text: 'Reader settings',
		cls:'first'
    }, {
        click: function(){
            var url = 'http://www.google.com/reader/settings?display=edit-extras';
			//GM_openInTab(url,false,false,false,false,true);
			GM_openInTab(url);
        }
    });
	
	dh('prefs', 'a', {
        href: '#',
        text: 'Preferences'
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
        }
    });	
}
window.onload = function(){
	initMenu();
};

