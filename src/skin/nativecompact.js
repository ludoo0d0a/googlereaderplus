//nativecompact
GRP.nativecompact = function(prefs, langs, ID, SL, lang) {
	var css = '#search{top:4px;left:600px;z-index:999;}#logo-container{display:none;}#main{top:0px;}#chrome-header,#viewer-top-controls{padding:0px;}';
	css += '#quick-add-bubble-holder{margin-top: 30px;}';
	
	//hide search
	css+='#top-bar{height:0;position:static !important;}';
	//hide menu g+
	css+='#gb,#lhn-add-subscription-section,#viewer-header,#logo-section,#title-and-status-holder{display:none;}';
	var el = getFirstElementByClassName(get_id('lhn-add-subscription-section'), 'subscribe-button');
	if (el){
		el.innerText='';
	}
	css += '#entries{padding-right:0px ;}';
	
	GM_addStyle(css, 'rps_'+ID);
	fireResize();
};