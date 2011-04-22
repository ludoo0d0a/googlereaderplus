/**
 * Rank using postrank API
 * 
 * @version  0.1
 *
 */
GRP.rank = function(prefs, langs, ID, SL, lang){
    var BASE = 'http://www.postrank.com';
	var li=0, MAX_ENTRIES=50, BATCH_WAIT=500, collentries = {0:[]}, collectId=0;
	var colors = [];
	/*
	function addRank(el, entry, mode) {
		var title = SL.text + formatShortcut(ID, 'rank', prefs); //[f]
		var text = (SL.keyword || ID);//checkbox
		addBottomLink(el,text, title, ID, '', true, renderRank, false, entry, mode);
	}*/
		
	function renderRank(btn, entry, locked){
		var active = isActive(btn, entry, ID, locked);
		addClassIf(entry, 'rank-on', active);
		if (active) {
			collectEntry(entry);
		}
	}	
	
	function collectEntry(entry){
		//collect urls into map
		collentries[collectId].push(entry);
		var cid = collectId;//local copy of collect id
		if (collentries[collectId].length>=MAX_ENTRIES){
			collentries[collectId++]=[];
		}
		if (li){
			clearTimeout(li);
			li=0;
		}
		//wait 500ms from last added 
		li = setTimeout(function(){
			//then call api
			var b = getUrls(collentries[cid]);
			mycore.extension.sendRequest({
				message:'rank',
				urls:b.urls
			}, function(o){
				//decorate each entry
				decorateRanks(b.map, o);
				collentries[cid]=[];
			});
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
	
	function decorateRanks(mapUrls, ranks){
		iterate(ranks,function(url, o){
			entry=mapUrls[url];
			if (entry && !hasClass(entry, 'grp-rank')) {
				//o.postrank
				addAttr(entry, 'rank', o.postrank);
				//o.postrank_color
				addClass(entry, 'grp-rank');
				var color = o.postrank_color.replace('#','');
				addClass(entry, 'grp-rank-'+color);
				//entry.style.backgroundColor=o.postrank_color;
				colors.push(color);
			}
		});
		updateCss();
	}
	
	function updateCss(){
		var css = [];
		foreach(colors, function(color){
			var c = '.grp-rank-'+color+' .card-content, .grp-rank-'+color+' .collapsed{background-color:#'+color+' !important;}';
			css.push(c);
			//getBackColorCss
		});
		GM_addStyle(css.join(''), 'rank');
	}
	
	//TODO: registerFeature(renderRank, ID, {onlistviewtitle:true});
	registerFeature(renderRank, ID);
};
