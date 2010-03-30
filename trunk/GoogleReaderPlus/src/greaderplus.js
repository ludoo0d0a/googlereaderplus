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
            window.GRP = window.GRP || {};
            GRP.language = function(){
                //dummy
            };
            this.prefs = {};
            var me = this;
            chrome.extension.sendRequest(
            {
                message: "getprefs"
            }, function(a){
				me.prefs = a.prefs;
                me.initprefs.call(me);
			});
        },
        initprefs: function(){
            this.lang = this.prefs.language_lang || 'en';
			loadLangs(this.lang, function(){
				console.log("ReaderPlus in "+this.lang);
	            this.runExtra(this.lang);
			}, this);
        },
        runExtra: function(){
            var langs = GRP.langs[this.lang].texts;
            var count = 0;
            if (GRP.scripts) {
				var total = GRP.scripts.length;
				iterate(GRP.scripts, function(id, script){
                    if (script && this.prefs[id]) {
                        ++count;
                        this.run(id, langs);
                    }
                },this, true);
                console.log("ReaderPlus is running with " + count + "/" + total + " features");
                //Start entries monitoring 
                monitorEntries();
            } else {
                console.error("ReaderPlus failed to load any features!!");
            }
        },
        run: function(o, langs){
            if (o && o !== "false") {
				if (o == 'theme') {
                    //skin
                    console.log("**** run " + o);
					GRP.theme(this.prefs, langs, this);
                } else {
                    if (window.GRP[o]) {
                        console.log("**** run " + o);
                        try {
                            //console.log("myport(run) "+this.myport.portId_);
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
