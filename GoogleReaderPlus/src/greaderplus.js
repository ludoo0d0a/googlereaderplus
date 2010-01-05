/*
 * Google Reader Plus : Collection of Greasemonkey scripts and skins
 * Version 2.5.0
 * Date 4/01/2010
 * 
 * ChangeLog:
 *
 * 2.5.0: 
 *   -options by feature
 *   -multi column configurable
 *   -can lock preview and column option 
 * 
 */

//home : njidamgjohnfbkeagfbnkllfkdnlpjhi
//remote : hhcknjkmaaeinhdjgimjnophgpbdgfmg

(function() {

	var googleReaderPlus = {
		init : function() {
			console.log("Starts GoogleReaderPlus");
			this.myport = chrome.extension.connect( {
				name : "googlereaderplus"
			});
			this.prefs = {};
			var me = this;
			function onMessageReceived(a) {
				if (a.message == "prefs") {
					me.scripts = a.scripts;
					me.prefs = a.prefs;
					var f = me.scripts?me.scripts.length:0;
					console.log("Init GoogleReaderPlus with "+f+" features");
					me.runExtra.call(me);
				}
			}
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
					window["grp_" + o].call(window, this.prefs);
				} else {
					console.log("ERROR: can't run " + o);
				}
			}
		}
	};

	googleReaderPlus.init();

})();
