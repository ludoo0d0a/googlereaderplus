function initMenu(){
	dh('readersettings', 'a', {
        href: '#',
        text: 'Reader settings',
		cls:'first'
    }, {
        click: function(){
            var url = 'https://www.google.com/reader/settings?display=edit-extras';
			GM_openInTab(url);
        }
    });
	dh('readersignin', 'a', {
        href: '#',
        text: 'Sign in to another account…'
    }, {
        click: function(){
            var url = 'https://www.google.com/accounts/AddSession?service=reader&continue=https://www.google.com/reader/view/';
			GM_openInTab(url);
        }
    });
	dh('readersignout', 'a', {
        href: '#',
        text: 'Sign out of all accounts'
    }, {
        click: function(){
            var url = 'https://www.google.com/accounts/Logout?service=reader';
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

