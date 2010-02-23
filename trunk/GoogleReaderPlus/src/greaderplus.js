/**
 * Reader Plus
 *
 * Adds favicons to feeds and entries
 *
 * Author : LudoO
 *
 * ChangeLog: cf about.html
 */

(function(){

    var ReaderPlus = 
    {
        init: function(){
            console.log("Starts ReaderPlus");
            this.myport = chrome.extension.connect(
            {
                name: "readerplus"
            });
            window.GRP = window.GRP || {};
            GRP.language = function(){
                //dummy
            };
            this.prefs = {};
            var me = this;
            function onMessageReceived(a){
                if (a.message == "prefs") {
                    me.prefs = a.prefs;
                    me.initprefs.call(me);
                }
            }
            this.myport.onMessage.addListener(onMessageReceived);
            this.myport.postMessage(
            {
                message: "getprefs"
            });
        },
        initprefs: function(){
            //var langs = GRP.texts;
			this.lang = this.prefs.language_lang || 'en';
            this.lang = (GRP.langs[this.lang]) ? this.lang : 'en';
			//override locale texts
			merge(GRP, GRP.langs[this.lang]);
			//next
			this.runExtra(this.lang);
        },
        runExtra: function(){
			var langs = GRP.langs[this.lang].texts;
			var count = 0;
            if (window.GRP.scripts) {
                var total = window.GRP.scripts.length;
                for (var i = 0; i < total; i++) {
                    var script = window.GRP.scripts[i];
                    if (script && this.prefs[script.id]) {
                        ++count;
                        this.run(script.id, langs);
                    }
                }
                console.log("ReaderPlus is running with " + count + "/" + total + " features");
            } else {
                console.error("ReaderPlus failed to load any features!!");
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
                            window.GRP[o].call(window, this.prefs, langs, this.myport);
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
        /*,fixlang: function(){
         this.lang = this.prefs.language_lang || 'en';
         this.stack = ['texts', 'scripts', 'skins', 'googleshortcuts'];
         var base = 'chrome://extensions/'+GUID_CORE+'/';
         this.runExtra();
         this.i18n(this.lang, this.runExtra, this.stack, base, this);
         },*/
        /*i18n: function(lang, fn, stack, base, scope){
         var cb = function(i){
         i++;
         if (i < stack.length) {
         applyRemoteLang(lang, base, stack[i], GRP, cb, scope);
         } else {
         //get out
         fn.call(scope || this, []);
         }
         };
         cb(-1);
         }*/
    };
    
    ReaderPlus.init();
    
})();
