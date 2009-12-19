/*
 * Google Reader Plus :
 * 
 * Collection of Greasemonkey scripts and skins
 * 
 */
//id: njidamgjohnfbkeagfbnkllfkdnlpjhi
(function() {

	var googleReaderPlus = {
		init : function() {
			this.myport = chrome.extension.connect( {
				name : "googlereaderplus"
			});
			this.prefs = {};
			var me = this;
			function onMessageReceived(a) {
				if (a.message == "prefs") {
					me.scripts = a.scripts;
					me.prefs = a.prefs;
					me.runExtra.call(me);
				}
			}
			;
			this.myport.onMessage.addListener(onMessageReceived);
			this.myport.postMessage( {
				message : "getprefs"
			});
		},
		runExtra : function() {
			if (this.prefs.skin) {
				this.run(this.prefs.skin);
			}
			for ( var i = 0, len = this.scripts.length; i < len; i++) {
				var o = this.scripts[i];
				if (o && this.prefs[o]) {
					this.run(o);
				}
			}
		},
		run : function(o) {
			if (o && o!=="false") {
				if (window["grp_" + o]) {
					console.log("**** run " + o);
					window["grp_" + o].call(window, false);
				} else {
					console.log("ERROR: can't run " + o);
				}
			}
		}
	};

	googleReaderPlus.init();

})();
