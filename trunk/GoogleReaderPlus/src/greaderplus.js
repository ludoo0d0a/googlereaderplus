/**
 * Google Reader Plus
 * @version  2.7.1
 * @date 2010-01-04
 *
 * Adds favicons to feeds and entries
 *
 * Author : LudoO
 *
 * ChangeLog: cf about.html
 */
//home : njidamgjohnfbkeagfbnkllfkdnlpjhi
//remote : hhcknjkmaaeinhdjgimjnophgpbdgfmg

(function(){

    var googleReaderPlus = 
    {
        init: function(){
            console.log("Starts GoogleReaderPlus");
            this.myport = chrome.extension.connect(
            {
                name: "googlereaderplus"
            });
			window.GRP = window.GRP || {};
            this.prefs = {};
			this.lang = getLanguage();
            var me = this;
            function onMessageReceived(a){
                if (a.message == "prefs") {
                    me.prefs = a.prefs;
                    me.runExtra.call(me);
                }
            }
            this.myport.onMessage.addListener(onMessageReceived);
            this.myport.postMessage(
            {
                message: "getprefs"
            });
        },
        runExtra: function(){
            var count = 0;
            if (window.GRP.scripts) {
                var total = window.GRP.scripts.length;
                var langs = GRP.langs[this.lang];
				for (var i = 0; i < total; i++) {
                    var script = window.GRP.scripts[i];
                    if (script && this.prefs[script.id]) {
                        ++count;
                        this.run(script.id, langs);
                    }
                }
				console.log("GoogleReaderPlus is running with " + count + "/" + total + " features");
            }else{
				console.error("GoogleReaderPlus failed to load any features!!");
			}
        },
        run: function(o, langs){
            if (o && o !== "false") {
                if (o == 'theme') {
                    //Run skin
                    this.run(this.prefs.theme_skin, langs);
                } else {
                    if (window.GRP[o]) {
                        console.log("**** run " + o);
                        try {
                            window.GRP[o].call(window, this.prefs, langs);
                        } 
                        catch (e) {
                            console.error(e);
                        }
                    } else {
                        console.log("ERROR: can't run " + o);
                    }
                }
            }
        }
    };
    
    googleReaderPlus.init();
    
})();
