// @name           Google Reader - Colorful List View
// @description    Colorizes the item headers in Google Reader list view and the entries in expanded view.
// @version        20091122
// @jsversion      1.6

var grp_colorful = function(prefs) {

	// CSS to allow items to be colored
	const	BASE_CSS = "#entries.list .entry-likers,#entries.list .collapsed .entry-source-title,#entries.list .collapsed .entry-secondary,#entries.list .collapsed .entry-title{background-color:transparent!important}.gm-color-lv .collapsed /* list view headers */{border-color:transparent!important}#entries.list.gm-color-lv #current-entry .collapsed{border:2px solid #8181DC!important}#entries.list.gm-color-lv #current-entry.expanded .collapsed{border-bottom-color:transparent!important;border-width:2px 0!important}#entries .entry{padding:5px 0}#entries.list .collapsed{line-height:2.4ex!important}";

	const	STRINGS = {
		// pref labels
		color : "Color these items:",
		list : "List view headers.",
		expanded : "Expanded view entry bodies.",
		frame : "Expanded view entry frames.",
		read : "Read items.",
		unread : "Unread items.",

		// pref messages
		msgWill : "will",
		msgWillNot : "will not",
		msgColored : " be colored.",
		msgList : "List view items ",
		msgExpanded : "Expanded view entry bodies ",
		msgFrame : "Expanded view entry frames ",
		msgUnread : "Unread items ",
		msgRead : "Read items ",
		msgUndef : "Undefined",

		scheme : "Color Scheme: ",
		def : "Default",
		custom : "Custom",

		update : "Userscript Update Available",
		install : "Install"
	};

	// user interface for script settings added on settings page
	var settings = {
		timeoutID : 0,
		entries : null,

		init : function() { // insert page color options into the settings page
			// ascend out of iframe
			this.entries = frameElement.ownerDocument.getElementById("entries");
		},

		addPrefs : function() {
			var sect = document.createElement("div");
			sect.className = "extra";

			// two column list, yay <_<
			sect.innerHTML = "<div class=\"extra-header\">Colors</div>"
					+ STRINGS.color
					+ "<div style=\"width: 30em; margin: 0pt 0pt 1em 1em;\"><ul style=\"list-style-type: none; padding-left: 0;float: right;\"></ul><ul style=\"list-style-type: none; padding-left: 0;\"></ul></div>";// +
			// STRINGS.scheme;

			get_id("setting-extras-body").appendChild(sect);
			var lists = sect.getElementsByTagName("ul");

			var me = this;
			function tc(event) {
				me.toggleColors(event.target.id, event.target.checked);
			}
			this.addColorPref(lists[0], "gm-color-ri", STRINGS.read, tc);
			this.addColorPref(lists[0], "gm-color-ui", STRINGS.unread, tc);
			this.addColorPref(lists[1], "gm-color-lv", STRINGS.list, tc);
			this.addColorPref(lists[1], "gm-color-ev", STRINGS.expanded, tc);
			this.addColorPref(lists[1], "gm-color-ef", STRINGS.frame, tc, 0);

			// this.addSchemePref( sect );
			return sect;
		},

		addColorPref : function(list, id, text, handler, def) {
			var pref = document.createElement("li");
			var selected = storage.getItem(id, (def == undefined) ? 1 : def);
			pref.innerHTML = "<label><input id=\"" + id + "\" type=\"checkbox\" " + ((selected) ? "checked=\"on\"" : "")
					+ "\"/>" + text + "</label>";
			list.appendChild(pref);

			var label = pref.firstChild.firstChild;
			label.addEventListener("change", handler, false);
		},

		toggleColors : function(id, curr) {
			var msg, newPref = "", cName = "";
			if (curr) {
				newPref = id;
				cName = id + " ";
				msg = "<em>" + STRINGS.msgWill + "</em>";
			} else {
				msg = "<em>" + STRINGS.msgWillNot + "</em>";
			}

			var re = new RegExp(id + " |^", "g");
			this.entries.className = this.entries.className.replace(re, cName);
			storage.setItem(id, newPref);
			this.setMessage(id, msg);
		},

		togglePref : function(event) {
			if (this.value == STRINGS.custom) {
				this.style.fontStyle = "italic";
				addButton.removeAttribute("disabled");
			} else {
				this.style.fontStyle = "";
				addButton.setAttribute("disabled", "true");
			}
		},

		setMessage : function(id, msg) {
			clearTimeout(this.timeoutID);
			var inner = getElementValue("id( 'message-area-inner' )");
			var outer = getElementValue("id( 'message-area-outer' )");

			// get the message string to insert into the page
		var type = (id == "gm-color-lv") ? STRINGS.msgList : (id == "gm-color-ev") ? STRINGS.msgExpanded
				: (id == "gm-color-ef") ? STRINGS.msgFrame : (id == "gm-color-ui") ? STRINGS.msgUnread
						: (id == "gm-color-ri") ? STRINGS.msgRead : STRINGS.msgUndef;

		var newMsg = type + msg + STRINGS.msgColored;
		inner.innerHTML = newMsg; // set the message

		// force display and set position and width
		outer.setAttribute("style", "display: block !important;" + "margin-left:" + Math.round(inner.offsetWidth / -2)
				+ "px;" + "width:" + (inner.offsetWidth + 10) + "px;");
		outer.className = "message-area info-message";

		this.timeoutID = setTimeout(function() {
			outer.style.display = "";

			// test if the same message is still showing.
				// force lowercase to handle any (tag name) capitalization
				// change
				if (inner.innerHTML.toLowerCase() == newMsg.toLowerCase())
					outer.className = outer.className.replace(/ hidden|$/, " hidden");

			}, 7 * 1000);
	},

	getColorPrefs : function() {
		var prefs = "";

		prefs += storage.getItem("gm-color-lv", "gm-color-lv") + " ";
		prefs += storage.getItem("gm-color-ev", "gm-color-ev") + " ";
		prefs += storage.getItem("gm-color-ef", "") + " ";
		prefs += storage.getItem("gm-color-ui", "gm-color-ui") + " ";
		prefs += storage.getItem("gm-color-ri", "gm-color-ri") + " ";

		return prefs;
	}
	};

	// provide local data storage
	var storage = {
		cookie : {},

		init : function() { // initialize methods for data storage access
			// Google Chrome dev channel stubs GM_ functions with error messages
		// test it's the real deal by looking for "arguments" in stingified
		// version
		if (typeof GM_getValue != "undefined" && /arguments/.test(GM_getValue.toString())) {
			this.getItem = GM_getValue;
			this.setItem = GM_setValue;
			return;
		}

		// Google Chrome gives null for localStorage if not enabled by
		// switch,
		// Opera gives undefined
		// http://www.w3.org/TR/webstorage/#the-storage-interface
		if (typeof localStorage != "undefined" && localStorage != null) {

			this.getItem = function(key, def) {
				var value = localStorage.getItem(key);
				return (value == null) ? def : value;
			};

			this.setItem = function(key, value) {
				localStorage.setItem(key, value);
			};
			return;
		}

		var pairs = {};
		if (/gm-color=([^;]*)/.test(unescape(document.cookie))) {
			var cookie = RegExp.$1;

			cookie.split("/").forEach(function(pair) {
				var set = pair.split(":");
				pairs[set[0]] = set[1];
			});
		}

		this.cookie = pairs;
	},

	getItem : function(name, def) {
		var cookieVal = this.cookie[name];
		return (typeof cookieVal == "undefined") ? def : cookieVal;
	},

	setItem : function(name, value) {
		this.cookie[name] = value;
		var strCookie = "gm-color=";

		for ( var prop in this.cookie)
			strCookie += prop + ":" + this.cookie[prop] + "/";

		var future = new Date((new Date().getTime() + 10 * 365 * 24 * 60 * 60 * 1000));
		strCookie += ";path=/reader;expires=" + future.toGMTString();

		document.cookie = strCookie;
	}
	};

	// used to keep track of all the calculated colors
	var colors = {};

	// =============================================================================

	// calculate item hue
	function getHue(title) {
		var hue = 0;

		for ( var i = 0, ch; ch = title[i]; i++)
			hue += ch.charCodeAt(0);
		hue %= 360;

		colors[title] = hue;
		return hue;
	}

	function getColorCss(title) {
		var hue = getHue(title);
		return getLvCss(title, hue) + getEvCss(title, hue) + getEfCss(title, hue);
	}

	function getLvCss(ttl, hue) { // css for coloring items in list view
		// this selector should be take priority over any other selector
		var lvUi = "#entries.gm-color-lv.gm-color-ui div[ colored='";
		var lvRi = "#entries.gm-color-lv.gm-color-ri div[ colored='";
		return "" + lvUi + ttl + "' ] .collapsed {background-color: hsl(" + hue + ", 70%, 80% ) !important;}" + lvUi
				+ ttl + "' ]:hover .collapsed { background-color: hsl(" + hue + ", 90%, 85% ) !important;}" + lvUi + ttl
				+ "' ].read .collapsed," + lvUi + ttl + "' ].read:hover .collapsed {background-color: white !important; }"
				+ lvRi + ttl + "' ].read .collapsed {background-color: hsl(" + hue + ", 50%, 90% ) !important;}" + lvRi
				+ ttl + "' ].read:hover .collapsed { background-color: hsl(" + hue + ", 70%, 95% ) !important; }";
	}

	function getEvCss(ttl, hue) { // css for coloring expanded view item
		// bodies
		var evUi = "#entries.gm-color-ev.gm-color-ui div[ colored='";
		var evRi = "#entries.gm-color-ev.gm-color-ri div[ colored='";
		return "" + evUi + ttl + "' ] .card," + evUi + ttl + "' ] .ccard," + evUi + ttl + "' ] .t2," + evUi + ttl
				+ "' ] .t3 {background-color: hsl(" + hue + ", 70%, 80% ) !important; }" + evUi + ttl + "' ]:hover .card,"
				+ evUi + ttl + "' ]:hover .ccard," + evUi + ttl + "' ]:hover .t2," + evUi + ttl
				+ "' ]:hover .t3 { background-color: hsl(" + hue + ", 90%, 85% ) !important; }" + evUi + ttl
				+ "' ].read .card," + evUi + ttl + "' ].read .ccard," + evUi + ttl + "' ].read .t2," + evUi + ttl
				+ "' ].read .t3," + evUi + ttl + "' ].read:hover .card," + evUi + ttl + "' ].read:hover .ccard," + evUi
				+ ttl + "' ].read:hover .t2," + evUi + ttl + "' ].read:hover .t3 { background-color: white !important;  }"
				+ evRi + ttl + "' ].read .card," + evRi + ttl + "' ].read .ccard," + evRi + ttl + "' ].read .t2," + evRi
				+ ttl + "' ].read .t3 { background-color: hsl(" + hue + ", 50%, 90% ) !important;}" + evRi + ttl
				+ "' ].read:hover .card," + evRi + ttl + "' ].read:hover .ccard," + evRi + ttl + "' ].read:hover .t2,"
				+ evRi + ttl + "' ].read:hover .t3 { background-color: hsl(" + hue + ", 70%, 95% ) !important; }";
	}

	function getEfCss(ttl, hue) { // css for coloring expanded view item
		// frames
		var efUi = "#entries.gm-color-ef.gm-color-ui div[ colored='";
		var efRi = "#entries.gm-color-ef.gm-color-ri div[ colored='";
		return "" + efUi + ttl + "' ] { background: hsl(" + hue + ", 70%, 80% ) !important;}" + efUi + ttl
				+ "' ]:hover { background: hsl(" + hue + ", 90%, 85% ) !important;}" + efUi + ttl + "' ].read," + efUi
				+ ttl + "' ].read:hover { background: #F3F5FC !important; " + efRi + ttl + "' ].read { background: hsl("
				+ hue + ", 50%, 90% ) !important;}" + efRi + ttl + "' ].read:hover {background: hsl(" + hue
				+ ", 70%, 95% ) !important;}";
	}

	// inject color css into the page
	function setColor() {
		// pick up all uncolored entries, including ones missed previously
		var nocolor = getElements("id( 'entries' )/div[ contains( @class, 'entry' ) ]" + "[ not( @colored ) ]");

		if (!nocolor.length)
			return;

		nocolor.forEach(function(nc) {

			// source in header is an "<a>" for expanded view, "<span>" for list
				// view
				// if "Shared by [xxx]" is there this will grab that
				// search for a node that has 'entry-source-title' class name
				var src = getElementValue(".//*[ contains(" + "concat( ' ', normalize-space( @class ), ' '),"
						+ "' entry-source-title ' ) ]", nc);
				src = src.textContent.replace(/\W/g, "-");

				nc.setAttribute("colored", src);
				if (colors[src] == undefined)
					GM_addStyle(getColorCss(src));
			});
	}

	function watchLoading(chrome) {
		// pull this out here out of unsafeWindow context
		var prefs = settings.getColorPrefs();

		function setup(event) {
			var entries = get_id("entries");
			if (entries) {
				chrome.removeEventListener("DOMNodeInserted", setup, false);

				// initial setup and toggling of settings
				entries.className = prefs + entries.className;
				entries.addEventListener("DOMNodeInserted", setColor, false);
			}
		}
		/*if (stop) {
			chrome.removeEventListener("DOMNodeInserted", setup, false);
			var entries = get_id("entries");
			entries.removeEventListener("DOMNodeInserted", setColor, false);
		} else {*/
			chrome.addEventListener("DOMNodeInserted", setup, false);
		//}
	}
	var chrome = get_id("chrome");
	storage.init();
	if (chrome)
		watchLoading(chrome); // watch for the loading of rss entries
	else { // settings and script meta info page have no "chrome" element
		settings.init();
	}
	GM_addStyle(BASE_CSS);

};
