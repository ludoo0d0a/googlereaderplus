/*
 * Helvetireader
 */
GRP.helvetireader = function(prefs, langs, ID, SL, lang) {	
	//helvetireader v2
	var url= 'http://www.helvetireader.com/css/helvetireader.2.css';
	GM_addCss(url, 'rps_'+ID);
	
	//custom changes for colorful listview conflict
	var css = '#chrome-header{background-color:#33333!important;}';
	css += '#nav,#chrome,#viewer-top-controls{margin: 0 !important;}';
	css += '#lhn-add-subscription-section {height: 30px;}';
	css += '#viewer-header {height:53px;}';
	css += '#title-and-status-holder {display:none;}';
	css += '#entries{padding-right:0px ;}';
	
	GM_addStyle(css, 'rpsfix_'+ID);
	
	fireResize();
};