GRP.FIXME = true;

if (GRP.scripts) {
	apply(GRP.scripts.favicons.options, {
		fixme: {
			xtype: 'button',
			name: 'Fix me',
			action: 'fixFavicons'
		},
		fixfilter: '',
		fixkeyonly: false
	});
	
	
	apply(GRP.scripts.replacer.options, {
		fixme: {
			xtype: 'button',
			name: 'Fix me',
			action: 'fixReplacer'
		},
		fixfilter: '',
		fixkeyonly: false
	});
	
}