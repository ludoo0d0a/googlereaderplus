// ==UserScript==
// @author              Scott Cowan
// @name                Google Reader Minimalistic
// @namespace          http://google.com/reader/userscript
// @description           Removes all the whitespace from Google Reader and just gives you the news
// ==/UserScript==
// Google Reader Minimalistic
// Scott Cowan http://userscripts.org/users/32932
//http://userscripts.org/scripts/show/12197
// Update : Jun 29,2011

GRP.minimal = function(prefs, langs, ID, SL, lang) {
		var css = '#main{top:0 !important;}';
		css += ".gbh,#logo-container,#search,#search-input,#search-restrict,#search-restrict-input,#search-submit,#chrome-header,#global-info{display:none !important;}";
		css += "#gb,#top-bar,#viewer-footer,#viewer-header{display:none !important;}";
		css += "#entries .entry {padding-top: 2px}";
		css += ".card-common {margin: 0 2px}";
		css += ".entry .entry-source-title {font-size:110%;}";
		css += ".entry .entry-title {font-size:120%;}";
		css += ".card .card-content {padding: 2px 1px 2px 2px;}";
		css += "#current-entry .card .card-content {padding: 2px 1px 2px 2px;}";
		css += ".entry .entry-container {padding-bottom: 0;}";
		css += ".entry .entry-body {padding-top: 0;}";
		css += ".entry .entry-actions {padding: 2px;}";
		css += '#entries{padding-right:0px ;}'

		GM_addStyle(css, 'rps_'+ID);
		fireResize();
};
