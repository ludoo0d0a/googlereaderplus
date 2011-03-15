//Portal theme

GRP.portal = function(prefs, langs, ID, SL, lang){
    var ncolumns = prefs.theme_ncolumns || 3;
    var w = Math.max(100, Math.round((getWidthEntries() - 50) / ncolumns));
    var css = '#entries.cards .entry{width:' + w + 'px;padding:2px!important;}.card-common{margin:0;}#entries.cards .entry .entry-title {font-size:100%!important;}';
	css+='#entries.cards .entry.portal_actions .card-bottom,#entries.cards .entry.portal_actions .entry-author,#entries.cards .entry.portal_actions .entry-date{display:none;}';
	css+='#entries.cards .entry:not(.portal_maxi) .card-bottom,#entries.cards .entry:not(.portal_maxi) .entry-author,#entries.cards .entry:not(.portal_maxi) .entry-date{display:none;}';
	var asRelative = false;
	var TIME_TRANSITION = 0.6;//s
	var he = getHeightEntries();
	var cols=[];
	for (var i = 0; i <ncolumns; i++){
		cols[i]=0;
	}
	//relative
	if (asRelative) {
		css += '#entries.cards.entry{float:left;max-height:300px;}#entries.cards #scroll-filler{float:left;}';
	}else{
		css += '#entries.cards .entry{min-width:200px;position:absolute !important;display:none;-webkit-transition:all '+TIME_TRANSITION+'s ease-in-out;}';
		css += '#entries.cards .entry.portal{display:block !important;}';
		css += '#entries.cards .entry .entry-body{max-height:'+he+'px;overflow:auto;}';
		css += '#entries.cards .entry:not(.portal_maxi) img{max-width:'+(w-50)+'px;max-height:'+(w-50)+'px;}';
		//embed, video, iframe,video non zindexable items
		css += '#entries.cards.portal_current .entry:not(.portal_maxi) embed{display:none;}';
		css += '#entries.cards.portal_current .entry:not(.portal_maxi) video{display:none;}';
		css += '#entries.cards.portal_current .entry:not(.portal_maxi) object{display:none;}';
		css += '#entries.cards.portal_current .entry:not(.portal_maxi) iframe{display:none;}';
		css += '#entries.cards .entry.portal_maxi{z-index:999;}';
		css += '#entries.cards .entry .section-button{position:static !important;}';
		css += '#entries.cards .entry .entry-main{overflow:visible !important;}';
		css += '#entries .entry .entry-body,#entries .entry .entry-title,#entries .entry .entry-likers {max-width: 100%;}';
		css += '.portal_mouse{cursor: pointer;}';
		css += '#scroll-filler{display:none;}';
		
	}
    GM_addStyle(css, 'rps_portal');
	var memos = {}, entries = get_id('entries');
    
    //fireResize();
	function clickMenu(entry, el){
		var m = /entry\-\d+/.exec(entry.className);
		m=(m && m[0])?m[0]:'last';
		if (memos){
			//close last opened, notitself
			iterate(memos,function(id,o){
				if (id != m) {
					setMaxi(o.entry, id, false, false);
				}
			});
		}
		if (hasClass(entry, 'portal_maxi')){
			setMaxi(entry, m, el, false);
		}else{
			setMaxi(entry, m, el, true);
			setTimeout(function(){
				selectCurrentEntry(entry);
			},1000);
		}
	}
	
	function setMaxi(entry, m, el, maximize){
		if (maximize){
			memos[m]= {
				entry: entry,
				c: {
					top: entry.style.top,
					left: entry.style.left,
					w: entry.style.width,
					h: entry.style.height
				}
			};
			var sTop = entries.scrollTop;
			var ot= getNowTop(entry,sTop);
			sizeEntry(entry,{
				top: ot.top+'px',
				left:'50px',
				w:getWidthEntries()-100+'px'
				//h:-
			}, true);
			addClass(entry, 'portal_maxi');
			if (el) {
				addClass(el, 'goog-menu-button-opened');
			}
			setTimeout(function(){
				adjustContentSize(entry,sTop);
			},TIME_TRANSITION*1000+100);
			lastMaxi=entry;
			toggleClass(el, 'section-menubutton', 'section-minimize');
			removeClass(entries, 'portal_current');
		}else{
			if (memos[m]) {
				sizeEntry(entry, memos[m].c, false);
			}
			removeClass(entry,'portal_maxi');
			if (el) {
				removeClass(el, 'goog-menu-button-opened');
			}
			delete memos[m];
			toggleClass(el, 'section-minimize', 'section-menubutton');
			addClass(entries, 'portal_current');
		}
	}
	function getNowTop(entry,sTop){
		var eb = getFirstElementByClassName(entry, 'entry-body');//div
		var maxh = getHeightEntries(), delta = eb.firstChild.clientHeight+30 - eb.clientHeight;
		var h=Math.min(Math.max(100,entry.clientHeight + delta),maxh);//100<h<maxh
		var top = sTop + Math.max(0,(maxh-h)/2);
		return {
			h: h,
			delta:delta,
			top: top
		};
	}
	
	function adjustContentSize(entry, sTop){
		var y=0, maxw = getWidthEntries();
		var ot = getNowTop(entry,sTop);
		if (ot.delta>0) {
			entry.style.height = ot.h + 'px';
		}
		entry.style.left = Math.max(0,(maxw-entry.clientWidth)/2) + 'px';
		entry.style.top = ot.top+ 'px';
		entries.scrollTop=sTop;
	}
	
	function sizeEntry(entry, rect, hover){
		if (rect) {
			entry.style.left = rect.left;
			entry.style.top = rect.top;
			entry.style.width = rect.w;
			if (rect.h){
				entry.style.height=rect.h;
			}
		}
		if (!hover) {
			delete entry.style.height;
		}
	}

    function gridify(el, entry, mode){
		var prev = getSibling(entry,true,ncolumns);
		if (prev){
			if (asRelative && prev) {
				entry.style.top = (prev.offsetHeight + prev.offsetTop - entry.offsetTop) + 'px';
			}else{
				entry.style.top = (prev.offsetHeight + prev.offsetTop) + 'px';
			}
		}
		if (!asRelative){
			addClass(entry, 'portal');
			
			var m = /entry\-(\d+)/.exec(entry.className);
			var icol = parseInt(m[1],10) % ncolumns;
			var smallest = false;
			//get smallest column instead modulo
			foreach(cols,function(o,i){
				if(smallest===false || o<smallest.h){
					smallest.col=i;
				}
			});
			if (smallest){
				icol=smallest.col||0;
			}
			
			entry.style.left = (icol * (w+5)) + 'px';
			cols[icol]+=entry.clientHeight;
		}else{
			addClass(entry, 'portal');
		}
		addClass(entry, 'portal_actions');
		var icon = addIcon(entry, SL.readmore, clickMenu);
		onTextClick(entry, clickMenu, icon);
    }
	
	function onTextClick(entry, fn, el){
		var eb = entry;
		if (eb){
			addClass(eb, 'portal_mouse');
			eb.addEventListener('click',function(e){
				//e.stopPropagation(); //??
				if (e.ctrlKey){
					e.stopPropagation();
					//ctrl
					if (hasClass(entry, 'portal_maxi')) {
						toggleClassEl(entry, 'portal_actions');
					}
					//console.log('ctrl');
				}else if (	isAncestor(e.target,false, 'entry-title') || 
							isAncestor(e.target,false, 'entry-icons') ||
							isAncestor(e.target,false, 'card-actions') ||
							isAncestor(e.target,false, 'entry-author') 
				){
					//e.stopPropagation();
					e.preventDefault();
					//Let default way for title and icons
					//console.log('default way: '+e.target.className);
				}else{
					e.stopPropagation();
					e.preventDefault();
					//console.log('Catch default');
					//Catch default
					fn(entry, el);
				}
			},true);
		}
	}

    //update on entries changes
    registerFeature(gridify, 'portal_grid');

};
