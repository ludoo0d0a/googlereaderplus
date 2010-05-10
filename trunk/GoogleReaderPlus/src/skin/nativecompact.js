//nativecompact
GRP.nativecompact = function() {
	var css = "#search{top:0px;left:500px;}#logo-container{display:none;}#main{top:24px;}#chrome-header,#viewer-top-controls{padding:0px;}#lhn-add-subscription-section{position: absolute;left: 330px;top: -26px;z-index: 9;}";
	var el = getFirstElementByClassName(get_id('lhn-add-subscription-section'), 'subscribe-button');
	if (el){
		el.innerText='';
	}
	GM_addStyle(css, 'rps_nativecompact');
	fireResize();
};