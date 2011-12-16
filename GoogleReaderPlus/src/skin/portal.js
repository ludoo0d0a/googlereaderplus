//Portal theme v2.1

GRP.portal = function(prefs, langs, ID, SL, lang){
    var ncolumns = parseInt(prefs.theme_ncolumns || 3,10) ;
    ncolumns=ncolumns||3;
	var asRelative = false, TIME_TRANSITION = 0.6;//s
    var cols=[], he=800, we=800, w=300;
    var memos = {}, entries = get_id('entries'), vec = get_id('viewer-entries-container');
	
	function reset(){
		console.log('reset portal theme');
		memos = {};
		we = getWidthEntries();
		w = Math.max(100, Math.round((we - 50) / ncolumns));
		he = getHeightEntries();
		for (var i = 0; i <ncolumns; i++){
			cols[i]=0;
		}
		updateCss(w,he);
	}
	
	function updateCss(w,he){
		var css = '#entries.cards .entry{width:' + w + 'px;padding:2px!important;}.card-common{margin:0;}#entries.cards .entry .entry-title {font-size:100%!important;}';
		css += '#entries.cards .entry.portal_actions .card-bottom,#entries.cards .entry.portal_actions .entry-author,#entries.cards .entry.portal_actions .entry-date{display:none;}';
		css += '#entries.cards .entry:not(.portal_maxi) .card-bottom,#entries.cards .entry:not(.portal_maxi) .entry-author,#entries.cards .entry:not(.portal_maxi) .entry-date{display:none;}';
		
		//relative
		if (asRelative) {
			css += '#entries.cards .entry{float:left;max-height:300px;}#entries.cards #scroll-filler{float:left;}';
		} else {
			css += '#entries.cards .entry{min-width:200px;position:absolute !important;}';
			css += '#entries.gridmove.cards .entry{-webkit-transition:all ' + TIME_TRANSITION + 's ease-in-out;}';

//hide/show
			css += '#entries.cards .entry{display:none;}';
			css += '#entries.cards .entry.entry-portal{display:block !important;}';

//entry-main
			css += '#entries.cards .entry:not(.portal_maxi) .entry-main{overflow:visible;}';
			css += '#entries.cards .entry.portal_maxi .entry-main{overflow:auto;}';
			css += '#entries.cards .entry .entry-main{max-height:' + he + 'px;}';
			
//media
			css += '#entries.cards .entry:not(.portal_maxi) img{max-width:' + (w - 50) + 'px;max-height:' + (w - 50) + 'px;}';
			//embed, video, iframe,video non zindexable items
			css += '#entries .entry:not(.portal_maxi) embed{display:none;}';
			css += '#entries .entry:not(.portal_maxi) video{display:none;}';
			css += '#entries .entry:not(.portal_maxi) object{display:none;}';
			css += '#entries .entry:not(.portal_maxi) iframe{display:none;}';
			
			css += '#entries.cards .entry.portal_maxi{z-index:999;}';
//			css += '#entries.cards .entry .section-button{position:static !important;}';
			css += '.section-minimize1,.section-minimize2{margin-left:15px;}';
//section-minimize without left 11px
css += '.section-minimize1 {background-position: -3px -120px;top: 6px;}';
css += '.section-minimize2 {background-position: -23px -120px;top: 6px;}';

//metadata			
			css += '#entries.cards .entry .entry-date{position:static !important;}';
			css += '#entries.cards .entry .entry-title{position:static !important;}';
			css += '#entries.cards .entry .entry-author{position:static !important;}';

//entry-overflow			
			css += '.entry .entry-overflow {background-image: -webkit-gradient(linear,left top,left bottom,from(rgba(255, 255, 255, 0)),to(rgba(255, 255, 255, 1.0)));height: 20%;max-height:150px;bottom: 0;position: absolute;width:'+(w-8)+'px;margin-left:4px;margin-bottom:3px;}';
			css += '.entry.portal_maxi .entry-overflow{display:none}';
			
			css += '#entries .entry .entry-body,#entries .entry .entry-title,#entries .entry .entry-likers {max-width: 100%;}';
			css += '.portal_mouse{cursor: pointer;}';
//			css += '#scroll-filler{display:none;}';

//css += 'iframe,video{display:none;}';

		}
		GM_addStyle(css, 'rps_portal');
	}
	
    
    //fireResize();
	function clickMenu(entry, el){
		if (hasClass(entry, 'portal_clickonce')){
			return;
		}
		addClass(entry, 'portal_clickonce',true);
		
		var m =getEntryNumber(entry,'last');
		
		if (memos){
			//close last opened, not it self
			iterate(memos,function(id,o){
				if (id != m) {
					setMaxi(o.entry, id, false, false);
				}
			});
		}
		if (hasClass(entry, 'portal_maxi')){
			setMaxi(entry, m, el, false);
			removeClass(entry, 'portal_clickonce');
		}else{
			setMaxi(entry, m, el, true);
			setTimeout(function(){
				selectCurrentEntry(entry, true, true);
				removeClass(entry, 'portal_clickonce');
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
			var sTop = vec.scrollTop;
			var ot= getNowTop(entry,sTop);
			sizeEntry(entry,{
				top: ot.top+'px',
				left:'50px',
				w:(we-100)+'px'
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
			toggleClass(el, 'section-minimize1', 'section-minimize2');
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
			toggleClass(el, 'section-minimize2', 'section-minimize1');
			addClass(entries, 'portal_current');
		}
	}
	function getNowTop(entry,sTop){
		var eb = getFirstElementByClassName(entry, 'entry-body');//div
		var maxh = getHeightEntries();
		var delta = 0;
		if (eb.scrollHeight > 0) {
			delta = eb.firstChild.clientHeight + 30 - eb.clientHeight;
		}
		var h=Math.min(Math.max(100,entry.clientHeight + delta),maxh);//100<h<maxh
		var top = sTop + Math.max(0,(maxh-h)/2);
		return {
			h: h,
			delta:delta,
			top: top
		};
	}
	
	function adjustContentSize(entry, sTop){
		var y=0, maxw = we;
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
		if (mode!=='expanded'){
			return;
		}
		
		var prev = getSibling(entry,true,ncolumns);
		if (prev){
			var prevHeight= prev.offsetHeight;
			if (asRelative && prev) {
				entry.style.top = (prevHeight + prev.offsetTop - entry.offsetTop) + 'px';
			}else{
				entry.style.top = (prevHeight + prev.offsetTop) + 'px';
			}
			//fix prev height to fix lazy loading troubles
			prev.style.height = prevHeight+'px';
		}
		addClass(entry, 'entry-portal');
		if (!asRelative){
			var m = getEntryNumber(entry);
			var icol = m % ncolumns;
			
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
		}
		if (!entry.gridified) {
			entry.gridified = true;
			//Defer menu
			setTimeout(function(){
				//TODO: lazy loading for items causes troubles (entry.hasChildNodes temporarly fix this)
				if (entry.hasChildNodes() && !hasClass(entry, 'portal_actions')){
					addClass(entry, 'portal_actions', true);
					var icon = addIcon(entry, SL.readmore, clickMenu, 'icon-portal', 'section-button section-minimize1');
					dh(entry, 'div', {cls: 'entry-overflow'});
					onTextClick(entry, clickMenu, icon);
				}
			},100);
		}
    }
	
	function onTextClick(entry, fn, el){
		if (entry && !hasClass(entry, 'portal_mouse')){
			addClass(entry, 'portal_mouse', true);
			entry.addEventListener('click',function(e){
				if (e.target.nodeName==='A'){
					return;
				}
				//e.stopPropagation(); //??
				if (e.ctrlKey){
					e.stopPropagation();
					//ctrl
					if (hasClass(entry, 'portal_maxi')) {
						toggleClassEl(entry, 'portal_actions');
					}
					//console.log('ctrl');
				}else if (	findAncestor(e.target,false, 'entry-title') || 
							findAncestor(e.target,false, 'entry-icons') ||
							findAncestor(e.target,false, 'card-actions') ||
							findAncestor(e.target,false, 'entry-author')
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

	reset();
	enableAnim();
	
    //update on entries changes
    registerFeature(gridify, 'portal_grid');
	
	onWindowResize(function(r){
		resetAll();
	});
	
	function resetAll(hidden){
		reset();
		disableAnim();
		var mode = getMode();
		forAllEntries(function(el){
			gridify(el, el, mode);
		});
		enableAnim();
	}
//	detectNavHidden(resetAll);
	
	
	function disableAnim(){
		removeClass(entries, 'gridmove');
	}
	function enableAnim(){
		addClass(entries, 'gridmove', true);
	}


};
GRP.portaltoggle = function(status){
	forAllEntries(function(el){
		if (el.style){
			if (status){
				//restore
				if (el.style.grptop) {
					el.style.top = el.style.grptop;
				}
				if (el.style.grpleft) {
					el.style.left = el.style.grpleft;
				}
			}else{
				//backup
				if (el.style.top) {
					el.style.grptop = el.style.top;
					el.style.top=''; 
				}
				if (el.style.left) {
					el.style.grpleft=el.style.left;
					el.style.left=''; 
				}
				el.style.height='auto'; 
			}
		}
	});
};