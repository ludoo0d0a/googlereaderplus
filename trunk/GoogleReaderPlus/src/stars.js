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
		{id:'yellow', c:'0 -60px'},
		{id:'red', c:'0 0'},
		{id:'important', c:'0 -15px'},
		{id:'orange', c:'0 -30px'},
		{id:'next', c:'0 -45px'},
		{id:'warning', c:'0 -75px'},
		{id:'green', c:'0 -90px'},
		{id:'checked', c:'0px -105px'},
		{id:'blue', c:'0px -120px'},
		{id:'info', c:'0px -135px'},
		{id:'purple', c:'0px -150px'},
		{id:'question', c:'0px -165px'},
		{id:'white', c:'0px -180px'}
	];
	var PREFIX='star-', rePrefix = /^star\-/, TAG_STAR = 'yellow', TAG_DEFAULT = 'white';

	//https://mail.google.com/mail/u/0/pimages/2/labs/superstars_2.png
	var url = 'http://googlereaderplus.googlecode.com/svn/trunk/GoogleReaderPlus/images/stars/allstars.png';
	var ptime=0, pid=false, css = '.entry .superstar{background: url('+url+') no-repeat;background-position:0px -180px;}';
	css+='.entry-actions .superstar{padding:0px 8px 0px 16px;}';
	css+='.entry-icons .superstar{width:16px;height:16px;display:inline-block;}';
	css+='#entries.grp-superstar .entry-actions span.star:first-child {display:none;}';
	css+='.entry .star {background:none;}';
	var entries = get_id('entries');
	addClass(entries, 'grp-superstar');
	
	foreach(COLORS,function(o){
		if (o.c) {
			css += '.entry.grp-star-'+ o.id + ' .superstar{background-position: ' + o.c + ' !important;}';
		}
		if (pid) {
			NEXTCOLOR[pid] = o.id;
		}
		pid = o.id;
	});
	NEXTCOLOR[COLORS[COLORS.length-1].id]=COLORS[0].id;
	css +='#entries.set-tag .tags-edit{visibility:hidden;}';
    GM_addStyle(css, 'rpe_'+ID);
	
	function star(ea, entry, mode){
		var tag = findTagClass(entry), estar = isStarred(entry);
		if (estar && !tag){
			tag = TAG_STAR;
		}
		if (tag) {
			addClass(entry, 'grp-star', true);
			addClass(entry, 'grp-star-' + tag, true);
		}
		
		var title = SL.text  + formatShortcut(ID, 'star', prefs); 
		//var text = (SL.keyword || ID);//checkbox
		var text = (prefs && prefs.general_icons)?'':(SL.keyword || ID);
		
		//var ea = getFirstElementByClassName(entry, 'entry-actions');
		var es = false;
		if (ea){
			es = getFirstElementByClassName(ea, 'star');
		}
		
		var ei = getFirstElementByClassName(entry, 'entry-icons');
		var eicon = getFirstElementByClassName(ei, 'star');
		addIcon(entry, title, function(entry, el){
			toggleStar(el, entry, false);
		},'superstar', 'link unselectable empty', 'first');
		hide(eicon);
		eicon.style.background='transparent';
		
		addBottomLink(es, text, title, ID, 'superstar', false, toggleStar, false, entry, mode, 'after');
	}
	
	function toggleStar(btn, entry, locked){
		//var active = isActive(btn, entry, ID, locked);
		var notStarred = false, newTag=false, tag = entry.star || findTagClass(entry);
		var timeout = ((ptime===0) || (new Date()).getTime() - ptime > 1500);
		if (tag) {
			newTag = NEXTCOLOR[tag];
			removeClass(entry, 'grp-star-' + tag);
		} else {
			var estar = isStarred(entry);
			if (estar) {
				//console.log('entry is native starred');
				newTag = TAG_DEFAULT;
			} else {
				newTag = TAG_STAR;
			}
			notStarred = true;
		}
		
		//console.log('tag '+tag+' -> '+newTag);
		
		var tdefer = 0, rmStar = ((timeout && !notStarred) || (newTag==TAG_DEFAULT)); 
		if (rmStar) {
			//console.log('remove star');
			//Timeout 1s->toggle star
			newTag=false;
			removeClass(entry, 'grp-star', true);
			markAsStar(entry, false);
		} else {
			//console.log('--superstar');
			entry.star=newTag;
			markAsStar(entry, true);
			addClass(entry, 'grp-star', true);
			addClass(entry, 'grp-star-'+ newTag, true);
			tdefer = 500;
		}
		setOnceTimeout(function(){
			entry.star=newTag;
			//console.log('*** update tags for '+newTag);
			tag = findTagClass(entry);
			updateTags(entry, rePrefix, newTag?(PREFIX+newTag):false);
			delete entry.star; 
		},tdefer, 'superstar');
		ptime = (new Date()).getTime();
	}
	
	function findTagClass(entry){
		var tags = getTags(entry);
		for (var i = 0, len = tags.length; i < len; i++) {
			if (rePrefix.test(tags[i])){
				return tags[i].replace(rePrefix,'');
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
