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

GRP.minimal = function() {
	function toggle_gr() {
		var logo;
		//var length = ids.length;
		//var is_visible = document.getElementById(ids[0]).style.display != "none";
		var is_visible = true;

		var css = ".gbh,#logo-container,#search,#search-input,#search-restrict,#search-restrict-input,#search-submit,#chrome-header,#global-info{display:none !important;}";
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
		//GM_addStyle(css, 'rps_minimal');

		var css2 = '';

		if(is_visible) {
			css2 = '#main{top:0 !important;}';

		} else {
			css2 = '#main{top:65px !important;}';
		}

		//GM_addStyle(css2, 'rps_minimal_2');

		GM_addStyle(css + css2, 'rps_minimal');
		fireResize();
	}

	function GRT_key(event) {
		element = event.target;
		elementName = element.nodeName.toLowerCase();
		if(elementName == "input") {
			typing = (element.type == "text" || element.type == "password");
		} else {
			typing = (elementName == "textarea");
		}
		if(typing) {
			return true;
		}
		if(String.fromCharCode(event.which) == "W" && !event.ctrlKey && !event.altKey && !event.metaKey) {
			toggle_gr();
			try {
				event.preventDefault();
			} catch (e) {
			}
			return false;
		}
		return true;
	}

	//document.addEventListener("keydown", GRT_key, false);
	toggle_gr();

	var accountname = document.getElementById('email-address');
	if(accountname) {
		document.title = document.title + " | " + accountname.innerHTML + " | ";
	}

};
