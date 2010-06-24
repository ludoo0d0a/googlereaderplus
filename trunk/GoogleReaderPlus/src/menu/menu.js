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
        text: 'Themes',
		cls:'last'
    }, {
        click: function(){
            GM_openInTab(mycore.getUrl('/preferences.html#theme'));
        }
    });
}

initMenu();
