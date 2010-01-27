// ==UserScript==
// @author              Scott Cowan
// @name                Google Reader Minimalistic
// @namespace          http://google.com/reader/userscript
// @description           Removes all the whitespace from Google Reader and just gives you the news
// ==/UserScript==
// Google Reader Minimalistic
// Scott Cowan http://userscripts.org/users/32932
//http://userscripts.org/scripts/show/12197

GRP.minimal = function() {
	var ids = [ "viewer-header", "logo-container", "search", "chrome-header",
			"global-info", "gbar", "viewer-footer" ];

	function toggle_gr() {
		var logo;
		var length = ids.length;
		var is_visible = document.getElementById(ids[0]).style.display != "none";

		for ( var i = 0; i < length; i++) {
			if (document.getElementById(ids[i]) != null)
				document.getElementById(ids[i]).style.display = is_visible ? "none"
						: "block";
		}
		GM_addStyle(".gbh { display:none !important; }"); // Hide dividing
															// line
		GM_addStyle("#entries .entry {padding-top: 2px}");
		GM_addStyle(".card-common {margin: 0 2px}");
		GM_addStyle(".entry .entry-source-title {font-size:110%;}");
		GM_addStyle(".entry .entry-title {font-size:120%;}");
		GM_addStyle(".card .card-content {padding: 2px 1px 2px 2px;}");
		GM_addStyle("#current-entry .card .card-content {padding: 2px 1px 2px 2px;}");
		GM_addStyle(".entry .entry-container {padding-bottom: 0;}");
		GM_addStyle(".entry .entry-body {padding-top: 0;}");
		GM_addStyle(".entry .entry-actions {padding: 2px;}");
		if (is_visible) {
			logo = document.getElementById('main');
			logo.style.top = '0';

			logo = document.getElementById('chrome');
			logo.style.paddingTop = '0';

			logo = document.getElementById('nav');
			logo.style.paddingTop = '0';
		} else {
			logo = document.getElementById('main');
			logo.style.top = '65px';

			logo = document.getElementById('chrome');
			logo.style.paddingTop = '0';

			logo = document.getElementById('nav');
			logo.style.paddingTop = '0';
		}
		fireResize();
	}

	function GRT_key(event) {
		element = event.target;
		elementName = element.nodeName.toLowerCase();
		if (elementName == "input") {
			typing = (element.type == "text" || element.type == "password");
		} else {
			typing = (elementName == "textarea");
		}
		if (typing) {
			return true;
		}
		if (String.fromCharCode(event.which) == "W" && !event.ctrlKey
				&& !event.altKey && !event.metaKey) {
			toggle_gr();
			try {
				event.preventDefault();
			} catch (e) {
			}
			return false;
		}
		return true;
	}

	document.addEventListener("keydown", GRT_key, false);
	toggle_gr();

	var accountname = document.getElementById('email-address');
	document.title = document.title + " | " + accountname.innerHTML + " | ";

};