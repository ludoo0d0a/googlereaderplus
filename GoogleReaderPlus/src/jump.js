var grp_jump = function(prefs) {
	function addJumpButtons(el, entry, mode) {
		var title = getFirstElementMatchingClassName(entry, 'h2', 'entry-title');
		if (title) {
			var div = document.createElement('div');
			div.className = 'entry-title-go-to-bottom';

			var a = document.createElement('a');
			a.href = "#";
			a.title = 'Jump to bottom'+ formatShortcut('jump', 'godown', prefs);// [Shift+B] 
			a.appendChild(div);

			title.appendChild(a);
			div.addEventListener('click', gotobottom, false);
		}

		var text = 'Jump to top' + formatShortcut('jump', 'goup', prefs); //[Shift+T]
		addBottomLink(el, 'Top', text, 'item-go-to-top', false, gototop, false, entry);
	}

	function gototop(e) {
		var entry = getEntry(e);
		jump(entry, true);
	}

	function gotobottom(e) {
		var entry = getEntry(e);
		jump(entry, false);
	}

	var css = ".entry-title-go-to-bottom{margin-left: 4px;padding-left:16px;width:14px;height:14px;background-repeat:no-repeat;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAAAXNSR0IArs4c6QAAASxQTFRFy9jwydfx+IoAGUuXy9jwydfx+IoAGUuXy9jw+IoA1N/0y9jwydfx+IoASm+RGUuXztvyy9jw+IoANV+Ly9jwydfx+IoAGUuXy9jw+IoAztvyy9jw+IoAMFyNztvyy9jw+IoALlqZztvyy9jw+IoAMFyNy9jw+IoAy9jw+IoAztvyy9jw+IoAK1iPJ1WYztvyy9jw+IoAK1iPIVGU////+Pj49/n9//XP//Wv//SX6+/65+35//Jp4+n4//E9//Az3uX48emX/+V71N/08edD093v8eY5ztn0y9jwydfxytbq4ttAws/x5LsAmrHVmbDVka7ZmqhfjJ+XjJ6A+IoAjJ1lXoXDcIlxWIHBjnkYUHSdSHO7RHG5UHJ/Qmu1Omm2QmmHKl2wIVGUGUuX1C6NdwAAAAF0Uk5TAEDm2GYAAAABYktHRACIBR1IAAAACXBIWXMAAArwAAAK8AFCrDSYAAAAB3RJTUUH2QwRDigzPKPYCgAAAGRJREFUCNddjzsKwDAMQ30oo6GlIPDgRfc/T5W0pJ83RSTPViIiwJKKiMnemvQ+kxbOaJG+b1KNoHQkJOQhMTxFWwK5+VAxJeR4YEYky9h1rLdbY9TjcixarhddNaruGv+Sny+cz9ItvUepxrcAAAAASUVORK5CYII=);}";
	css += " .item-go-to-top{padding:1px 8px 1px 16px;width:14px;height:14px;background-repeat:no-repeat;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAAAXNSR0IArs4c6QAAASlQTFRFydfx+IoAGUuXy9jwydfx+IoAGUuXy9jw+IoA1N/0y9jwydfx+IoASm+RGUuXztvyy9jw+IoANV+Ly9jwydfx+IoAGUuXy9jw+IoAztvyy9jw+IoAMFyNztvyy9jw+IoALlqZztvyy9jw+IoAMFyNy9jw+IoAy9jw+IoAztvyy9jw+IoAK1iPJ1WYztvyy9jw+IoAK1iPIVGU////+Pj49/n9//XP//Wv//SX6+/65+35//Jp4+n4//E9//Az3uX48emX/+V71N/08edD093v8eY5ztn0y9jwydfxytbq4ttAws/x5LsAmrHVmbDVka7ZmqhfjJ+XjJ6A+IoAjJ1lXoXDcIlxWIHBjnkYUHSdSHO7RHG5UHJ/Qmu1Omm2QmmHKl2wIVGUGUuX+XEqGwAAAAF0Uk5TAEDm2GYAAAABYktHRACIBR1IAAAACXBIWXMAAArwAAAK8AFCrDSYAAAAB3RJTUUH2QwREAEtlFL0+AAAAGZJREFUCNdlT0EOBCEM4k8NB80kJD148f//WXAmmd0sBy1SSgUAqvduEQdz7YM1D0vZndOc0VjF6IR8jSJruBDcdUViXfYgb2pD6cMZ+nhN+9vbGfV6lSDJYcteB91r3Jj/S/584QNxmi0RW7THUgAAAABJRU5ErkJggg==);}";
	GM_addStyle(css);

	initCatchEntries(addJumpButtons, 'ejump');
	/* Shift+T = top, Shift+B = bottom */
	initKey( [ {
		key : 84,
		shift : true,
		fn : gototop
	}, {
		key : 66,
		shift : true,
		fn : gotobottom
	} ]);
};
