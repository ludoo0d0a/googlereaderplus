/**
 * stars 
 * @version  0.1
 * @date 2011
 * @author LudoO
 *
 * Multiple stars based on tags
 *
 */
GRP.stars = function(prefs, langs, ID, SL, lang){
	//http://icons.iconarchive.com/icons/yusuke-kamiyamane/fugue/icons-390.jpg
	//http://icons.iconarchive.com/icons/famfamfam/silk/icons-390.jpg
	var NEXTCOLOR={}, COLORS = [
		{id:'red', c:'0 0'},
		{id:'important', c:'0 -15px'},
		{id:'orange', c:'0 -30px'},
		{id:'next', c:'0 -45px'},
		{id:'yellow', c:'0 -60px'},
		{id:'warning', c:'0 -75px'},
		{id:'green', c:'0 -90px'},
		{id:'checked', c:'0px -105px'},
		{id:'blue', c:'0px -120px'},
		{id:'info', c:'0px -135px'},
		{id:'purple', c:'0px -150px'},
		{id:'question', c:'0px -165px'}
		/*,{id:'white', c:'0px -180px'}*/
	];
		
	var url = 'http://googlereaderplus.googlecode.com/svn/trunk/GoogleReaderPlus/images/stars/allstars.png';
	//var url = 'https://mail.google.com/mail/u/0/pimages/2/labs/superstars_2.png';
	var pid=false, css = '.entry.grp-star .star{background: url('+url+') no-repeat !important;padding:0px 8px 1px 16px;}';
	var entries = get_id('entries');
	
	foreach(COLORS,function(o){
		if (o.c) {
			css += '.entry.grp-star-' + o.id + ' .star{background-position: ' + o.c + ' !important;}';
		}
		if (pid) {
			NEXTCOLOR['star-'+pid] = 'star-'+o.id;
		}
		pid = o.id;
	});
	NEXTCOLOR[COLORS[COLORS.length-1].id]=COLORS[COLORS.length-1].id;
	css +='#entries.set-tag .tags-edit{visibility:hidden;}';
    GM_addStyle(css, 'grp_stars');
	
	function star(el, entry, mode){
		var tag = findTagClass(entry);
		if (tag) {
			addClass(entry, 'grp-star', true);
			addClass(entry, 'grp-' + tag, true);
		}
		
		var title = SL.text  + formatShortcut(ID, 'star', prefs); 
		var text = (SL.keyword || ID);//checkbox
		addBottomLink(el,text, title, ID, 'star superstar', false, toggleStar, false, entry, mode);
	}
	
	function toggleStar(btn, entry, locked){
		//var active = isActive(btn, entry, ID, locked);
		var tag = findTagClass(entry);
		if (!tag) {
			tag = 'star-'+COLORS[0].id;
		}
		addClass(entry, 'grp-star', true);
		removeClass(entry, 'grp-' + tag);
		var newTag = NEXTCOLOR[tag];
		addClass(entry, 'grp-' + newTag, true);
		
		//Set tag
		var tags = getTags(entry);
		for (var i = 0, len = tags.length; i < len; i++) {
			if (tag == tags[i]) {
				tags[i] = '';
			}
		}
		tags.push(newTag);
		tags=tags.join(',').replace(/^,+/,'').replace(/,+$/,'');
		setTags(entry, tags);	
	}	

	function setTags(entry, tags){
		//tags-edit
		addClass(entries, 'set-tag', true);
		var tim=0, te = getFirstElementByClassName(entries, 'tags-edit');
		if (!te){
			var opentags = getFirstElementByClassName(entry, 'entry-tagging-action-title');
			simulateClick(opentags);
			tim=500;
		}
		setTimeout(function(){
			te = getFirstElementByClassName(entries, 'tags-edit');
			if (te) {
				var txttags = getFirstElementByClassName(te, 'tags-edit-tags');
				if (txttags) {
					txttags.value = tags;
					var tok = getFirstElementByClassName(entries, 'tags-edit-save');
					simulateClick(tok);
					removeClass(entries, 'set-tag');
				}
			}else{
				removeClass(entries, 'set-tag');
			}
		},tim);
	}
			
	
	function findTagClass(entry){
		var tags = getTags(entry);
		for (var i = 0, len = tags.length; i < len; i++) {
			if (/^star\-/.test(tags[i])){
				return tags[i];
			}
		}
		return false;
	}
	
	registerFeature(star, ID);
	
	var keycode = getShortcutKey(ID, 'star', prefs); 
	keycode.fn =function () {
		onKey('btn-stars', toggleStar);
	};	
	
	initKey(keycode);

};
