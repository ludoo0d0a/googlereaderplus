/*
 * Helvetireader
 */
GRP.helvetireader = function() {	
	//helvetireader v2
	var url= 'http://www.helvetireader.com/css/helvetireader.2.css';
	GM_addCss(url, 'rps_helvetireader2');
	
	//custom changes for colorful listview conflict
	var css = '#chrome-header{background-color:#33333!important;}';
	css += '#nav,#chrome,#viewer-top-controls{margin: 0 !important;}';
	css += '#lhn-add-subscription-section {height: 30px;}';
	css += '#viewer-header {height:53px;}';
	css += '#title-and-status-holder {display:none;}';
	GM_addStyle(css, 'rpsfix_helvetireader2');
	
	fireResize();
};