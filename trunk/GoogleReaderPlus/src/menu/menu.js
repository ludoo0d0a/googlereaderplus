function initMenu(){
    dh('menu', 'a', {
        href: '#',
		cls:'gb2',
        text: 'Preferences'
    }, {
        click: function(){
            GM_openInTab(mycore.getUrl('/preferences.html'));
        }
    });
    dh('menu', 'a', {
        href: '#',
		cls:'gb2',
        text: 'Themes'
    }, {
        click: function(){
            GM_openInTab(mycore.getUrl('/preferences.html#theme'));
        }
    });
}

initMenu();
