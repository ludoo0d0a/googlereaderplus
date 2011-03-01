//Portal theme

GRP.portal = function(prefs){
    var ncolumns = prefs.theme_ncolumns || 3;
    var w = Math.max(100, Math.round((getWidthEntries() - 50) / ncolumns));
    var css = '#entries.cards .entry{width:' + w + 'px;padding:2px!important;}.card-common{margin:0;}#entries.cards .entry .entry-title {font-size:100%!important;}#entries.cards .entry .card-bottom,#entries.cards .entry-author,#entries.cards .entry-date{display:none;}';
	var asRelative = false;
	//relative
	if (asRelative) {
		css += '#entries.cards.entry{float:left;max-height:300px;}#entries.cards #scroll-filler{float:left;}';
	}else{
		css += '#entries.cards .entry{position:absolute !important;display:none;}#scroll-filler{display:none;}';
		css += '#entries.cards .entry.portal{display:block !important;}';
		css += '#entries.cards .entry .entry-body{max-height:300px;}';
		css += '#entries.cards .entry:not(.portal_maxi) img{max-width:'+(w-50)+'px;max-height:'+(w-50)+'px;}';
		css += '#entries.cards .entry.portal_maxi{z-index:999;}';
		css += '#entries.cards .entry .section-button{position:static !important;}';
		css += '.portal_mouse{cursor: pointer;}';
	}
    GM_addStyle(css, 'rps_portal');
	var memos = {}, entries = get_id('entries');
    
    //fireResize();
	//TODO: close last opened
	function clickMenu(entry, el){
		var m = /entry\-\d+/.exec(entry.className);
		m=(m && m[0])?m[0]:'last';
		if (hasClass(entry, 'portal_maxi')){
			sizeEntry(entry,memos[m]);
			removeClass(entry,'portal_maxi');
			removeClass(el,'goog-menu-button-opened');
		}else{
			memos[m]= {
				top: entry.style.top,
				left: entry.style.left,
				w: entry.style.width
				//h: entry.style.height
			};
			sizeEntry(entry,{
				top: entries.scrollTop+50+'px',
				left:'50px',
				w:getWidthEntries()-100+'px'
				//h:getHeightEntries()-100+'px'
			});
			addClass(entry, 'portal_maxi');
			addClass(el,'goog-menu-button-opened');
		}
	}
	
	//TODO : use CSS dynamic transition to animate 
	function sizeEntry(entry, rect){
		entry.style.left=rect.left;
		entry.style.top=rect.top;
		entry.style.width=rect.w;
		//entry.style.height=rect.h;
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
			//TODO : get smallest column instead modulo
			var m = /entry\-(\d+)/.exec(entry.className);
			var icol = parseInt(m[1],10) % ncolumns;
			entry.style.left = (icol * (w+5)) + 'px';
		}
		addClass(entry, 'portal');
		addIcon(entry, 'Read more',clickMenu);
		onTextClick(entry, clickMenu);
    }
	
	function onTextClick(entry, fn){
		var eb = entry; //getEntryBody(entry);
		if (eb){
			addClass(eb, 'portal_mouse');
			eb.addEventListener('click',function(){
				fn(entry, false);
			},true);
		}
	}

    //update on entries changes
    registerFeature(gridify, 'portal_grid');

};
