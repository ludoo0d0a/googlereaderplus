//nativecompact
GRP.nativecompact = function(prefs, langs, ID, SL, lang) {
	var css = "#search{top:4px;left:600px;z-index:999;}#logo-container{display:none;}#main{top:0px;}#chrome-header,#viewer-top-controls{padding:0px;}#lhn-add-subscription-section{position: absolute;left:500px;top:-70px;z-index:999;}";
	//hide search
	css+='#top-bar{height:0;position:static !important;}';
	//hide menu g+
	css+='#gb{display:none;}';
	var el = getFirstElementByClassName(get_id('lhn-add-subscription-section'), 'subscribe-button');
	if (el){
		el.innerText='';
	}
	css += '#entries{padding-right:0px ;}';
	
	GM_addStyle(css, 'rps_'+ID);
	fireResize();
};