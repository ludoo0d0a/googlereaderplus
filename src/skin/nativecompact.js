//nativecompact
GRP.nativecompact = function() {
	var css = "#search{top:0px;left:500px;z-index:999;}#logo-container{display:none;}#main{top:24px;}#chrome-header,#viewer-top-controls{padding:0px;}#lhn-add-subscription-section{position: absolute;left:400px;top: -26px;z-index:999;}";
	var el = getFirstElementByClassName(get_id('lhn-add-subscription-section'), 'subscribe-button');
	if (el){
		el.innerText='';
	}
	GM_addStyle(css, 'rps_nativecompact');
	fireResize();
};