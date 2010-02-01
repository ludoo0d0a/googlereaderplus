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
//debug : cmkepfncdncbdpmdfnkbpenhfbmmnebm
var GUID = 'cmkepfncdncbdpmdfnkbpenhfbmmnebm';

//remote : hhcknjkmaaeinhdjgimjnophgpbdgfmg
//var GUID = 'hhcknjkmaaeinhdjgimjnophgpbdgfmg';

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
            GRP.language = function(){
                //dummy
            };
            this.prefs = {};
            var me = this;
            function onMessageReceived(a){
                if (a.message == "prefs") {
                    me.prefs = a.prefs;
                    me.applyLang.call(me);
                }
            }
            this.myport.onMessage.addListener(onMessageReceived);
            this.myport.postMessage(
            {
                message: "getprefs"
            });
        },
        applyLang: function(){
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
                console.log("GoogleReaderPlus is running with " + count + "/" + total + " features");
            } else {
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
        /*,fixlang: function(){
         this.lang = this.prefs.language_lang || 'en';
         this.stack = ['texts', 'scripts', 'skins', 'googleshortcuts'];
         var base = 'chrome://extensions/'+GUID+'/';
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
    
    googleReaderPlus.init();
    
})();
