/**
 * Rank using postrank API
 * 
 * @version  0.1
 *
 */
GRP.rank = function(prefs, langs, ID, SL, lang){
    var KEY_OPTIONS = ['level'];
	var li={}, MAX_ENTRIES=50, BATCH_WAIT=800, collentries = {0:[]}, collectId=0;
	var _options = {}, colors = [], toggleStatus = false, entries=get_id('entries');
	var LEVELS = {
	 	all:    {id: 0, level:0},
		good:   {id: 1, level:2.7},
		great:  {id: 2, level:5.4},
		best:   {id: 3, level:7.6},
		famous: {id: 4, level:9}
	};
	 
	/*
	function addRank(el, entry, mode) {
		var title = SL.text + formatShortcut(ID, 'rank', prefs); //[f]
		var text = (SL.keyword || ID);//checkbox
		addBottomLink(el,text, title, ID, '', true, renderRank, false, entry, mode);
	}*/
		
	function renderRank(btn, entry, mode){
		if(!toggleStatus){
			return;
		}
		var active = hasClass(entry, 'rank-on');
		if (!active) {
			addClass(entry, 'rank-on');
			collectEntry(entry, mode);
		}
	}	
	
	function collectEntry(entry, mode){
		//collect urls into map
		if (!collentries[collectId]){
			collentries[collectId]=[];
		}
		collentries[collectId].push(entry);
		//console.log('collect entry '+entry.className);
		var cid = collectId;//local copy of collect id
		if (collentries[collectId].length>=MAX_ENTRIES){
			++collectId;
			console.log('max reached ['+cid+']');
		}
		if (li[cid]){
			//console.log('clearTimeout ['+cid+']');
			clearTimeout(li[cid]);
			li[cid]=0;
		}
		//wait 500ms from last added 
		li[cid] = setTimeout(function(){
			++collectId;
			//then call api
			var _cid =cid;
			var b = getUrls(collentries[_cid]);
			if (b.urls.length > 0) {
				console.log('send [' + _cid + '] : ' + b.urls.length + ' urls');
				//console.log(Ext.apply({},b.urls));
				mycore.extension.sendRequest({
					message: 'rank',
					urls: b.urls
				}, function(o){
					//decorate each entry
					console.log('decorate [' + _cid + '] : ' + b.urls.length + ' urls / '+getCount(o)+' results');
					//console.log({o:o});
					decorateRanks(b.map, o, mode);
					collentries[_cid] = [];
				});
			}else{
				console.log('No urls to decorate [' + cid + ']');
			}
		},BATCH_WAIT);
	}
	
	
	function getUrls(entries){
		var l,urls=[],mapUrls={};
		foreach(entries,function(entry){
			l = getEntryLink(entry);
			urls.push(l.url);
			mapUrls[l.url]=entry;
		});
		return {
			urls: urls,
			map: mapUrls
		};
	}
	
	function decorateRank(entry, o, mode){
		var rank = Math.ceil(o.postrank);
		addClass(entry, 'pr_' + rank);
		//insertOnTitle(entry, icon, mode);
		var link, position = 'before';
		if (mode === 'expanded') {
			link = getOriginalEntryLink(entry);
		} else {
			//link = getFirstElementByClassName(entry, 'entry-source-title');//span
			link = getFirstElementByClassName(entry, 'entry-secondary');//span
			position = 'first';
		}
		if (link) {
			var plink = dh(link, 'div', {
				cls: 'postrank',
				title: SL.title,
				href: link.href,
				text: rank,
				position: position,
				style: {
					backgroundColor: o.postrank_color
				}
			});
		}
	}
	
	function decorateRanks(mapUrls, ranks, mode){
		var level = LEVELS[_options.level];
		
		iterate(ranks,function(url, o){
			entry=mapUrls[url];
			if (entry && !hasClass(entry, 'grp-rank')) {
				addAttr(entry, 'rank', o.postrank);
				addClass(entry, 'rank');
				decorateRank(entry, o, mode);
			}
		});
		if (_options.sort){
    		var all = entries.getElementsByClassName('entry');
			quicksort(all, function(a,b){
				a.attribute
			});
		}
		
		forceScroll();
		
		//Fire update.filter
		//fireEvent('filter', 'update');
	}
	
	function cssRankLevels(){
		var css = [];
		iterate(LEVELS, function(u,o){
			var a = [];
			for(var i=0;i<o.level;i++){
				a.push('#entries.p_rank.epr_'+u+' .entry.pr_'+i);
			}
			if (a.length>0){
				var c = a.join(',')+'{display:none !important;}';
				css.push(c);
			}
		});
		GM_addStyle(css.join(''), 'rpe_ranklevels');
	}
	
	function forceScroll(){
		var el = get_id('scroll-filler');
		removeClass(el, 'hidden');
	}
	
	function initInterface(){
		//var css = '.postrank {background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQVJREFUeNq8UqGqhEAUXdYtJpMgWP0DkyAIguBPCCabYLRarYJtsYlBsPgBVpMg2ARBzKIIBst7By4sC8%2Fntj3hcO7MPXfunZnb7Usoy%2FLnDcuy%2BL6P9SiKaEVRlCsDwbZtnuf3fYdOkuTEEMcxtCRJbdsibJoGYV3X0F3XUeb9b3t93z%2BfTwhRFMHjOIIFQfjXAKiqCp7nGcxxHPg4Dtp6vOdpmlZVFQqjK4RpmrIsK8sy9DAMH4bOsoxhmCAIKIQ4MaC84zimadIJlmVR9rZtrxlObomA1qdpIgO9ydXQwLquruuS1nX9swEoiiLPcwjDMF6e%2B%2FWX8TyPLjcMw299018BBgC8R7d7W5y5RAAAAABJRU5ErkJggg%3D%3D);}';
var css = '.postrank{ background: url(http://googlereaderplus.googlecode.com/svn/trunk/GoogleReaderPlus/images/signal/signal.png) no-repeat;}';
css += '.pr_0 .postrank,.pr_1 .postrank{background-position: 0 0px !important;}';
css += '.pr_2 .postrank,.pr_3 .postrank{background-position: 0 -16px !important;}';
css += '.pr_4 .postrank,.pr_5 .postrank{background-position: 0 -32px !important;}';
css += '.pr_6 .postrank,.pr_7 .postrank{background-position: 0 -48px !important;}';
css += '.pr_10 .postrank,.pr_9 .postrank,.pr_8 .postrank{background-position: 0 -64px !important;}';
		css += '.postrank{color:black;display:inline-block;line-height:16px;vertical-align:top;padding-right:6px;padding-left:20px;padding-bottom:0px;margin-left:5px;margin-right:5px;background-repeat:no-repeat;background-position:0% 0%;border-radius:3px;}';
		css += '#entries.p_rank #scroll-filler.hidden{display:visible !important;}';

		GM_addStyle(css, 'rpe_'+ID);
		
		cssRankLevels();
		
		addClass(entries, 'epr_'+_options.level);
		
		var btn_id = 'btn-'+ID+'-toggle';
		if (get_id(btn_id)){
			return;
		}
		var ref = get_id('stream-prefs-menu');
		var items = [{
            id: 'postrank_all',
            text: SL.rank_all,
			checkbox: true,
			group:'prank',
			close:true,
			value: (_options.level==='all'),
			key:'all',
			click:updateRank
        },{
            id: 'postrank_good',
            text: SL.rank_good,
			checkbox: true,
			group:'prank',
			close:true,
			value:(_options.level==='good'),
			key:'good',
			click:updateRank
        },{
            id: 'postrank_great',
            text: SL.rank_great,
			checkbox: true,
			group:'prank',
			close:true,
			value:(_options.level==='great'),
			key:'great',
			click:updateRank
        },{
            id: 'postrank_best',
            text: SL.rank_best,
			checkbox: true,
			group:'prank',
			close:true,
			value:(_options.level==='best'),
			key:'best',
			click:updateRank
        },{
            id: 'postrank_famous',
            text: SL.rank_famous,
			checkbox: true,
			group:'prank',
			close:true,
			value:(_options.level==='famous'),
			key:'famous',
			click:updateRank
        },{
            sep: true
        },{
			id: 'postrank_ad',
			text: SL.filter_ad,
			click:openPostrank
		}];
		var btn = addSplitButton('rank-split-button', ref, SL.filter_rank, SL.filter_rank, toggleFilter, false, 1, items, {autoclose:true});
		btn.id = btn_id;
		function toggleFilter(){
            toggleStatus = !toggleStatus;
            addClassIf(btn, 'goog-button-base-open', toggleStatus);
			addClassIf(entries, 'p_rank', toggleStatus);
    	}
		function updateRank(el, menu, id, sel, item){
			removeClass(entries, 'epr_'+_options.level);
			_options.level = item.key;
			addClass(entries, 'epr_'+_options.level);
			hideMenu(menu, el);
			onUpdate();
		}
		
		toggleFilter();
	}
	
	function onUpdate(){
        _options = checkOptions(_options);
		foreach(KEY_OPTIONS,function(option){
			GM_setValue(ID+'_'+option, _options[option]);		
		});
    }
    
	function openPostrank(){
		mycore.extension.sendRequest({
			message:'opentab',
			url: "http://www.postrank.com"
		});
	}
	
	function checkOptions(o){
        o = o || {};
        o.level = o.level || 'all';
        return o;
    }
	
	function init(){
		GM_getValues(ID+'_', KEY_OPTIONS,function(o){
			_options = checkOptions(o);
            initInterface();
		});
    }
	
	init();
	
	registerFeature(renderRank, ID, {onlistviewtitle:true});
};
