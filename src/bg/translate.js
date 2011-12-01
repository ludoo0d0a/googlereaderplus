GRP=GRP||{};
GRP.lang={
	engines:{},
	IID:0,
	DEFAULT_ENGINE:'google'
};

GRP.lang.WebTranslate = function(){};
GRP.lang.WebTranslate.prototype = {
	limit: 1000, 
	url: '',
	key:'',
	to:'fr',
	initInProgress:false,
	tip:true, //use tooltip
	onEnd:function(){
		//
	},
	onReady: function(cb, scope){
        cb.call(scope||this, this);
    },
    checkLibs: function(){
    	return true;
    },
    internalTranslate: function(para, from, to, cb){
    	cb(''); 
    },   
    
    /**
     * Translate using API google
     * @param {Object} text
     * @param {Object} from
     * @param {Object} to
     * @param {Object} cbPara
     * @param {Object} cbFinal
     */
    translate: function(text, from, to, cbPara, cbFinal, translation){
        if (!this.checkLibs()){
        	return;
        }
        from = from || '';
        translation=translation|| '';
        text=text.replace(/[\n\r]/g, '').replace(/\t/g, ' ');
        this._translate(text, from, to, cbPara, cbFinal, translation);
    },
    _translate: function(text, from, to, cbPara, cbFinal, translation){
        //Text has a limit 
        // see here : http://code.google.com/p/google-ajax-apis/issues/detail?id=18
        //First 1000 characters
        if (text){
	        var para = text.substr(0, this.limit);
	        //html based
	        para = substrUntilLast(para,'>');
			//Removed 10 unicode chars on each step
	        while(escape(para).length > this.limit){
	        	para=para.substr(0,para.length-10);
	        }
	        para = substrUntilLast(para,'>');
	        
	        var me = this;  
            this.internalTranslate(para, from, to, function(result){
                var tt = '';
                if (result) {
                    //intermediate update callback
                    cbPara.call(me, para, result);
                    translation+=result;
                    tt = text.substr(para.length);
                }
                me._translate(tt, from, to, cbPara, cbFinal, translation);
            });
        } else {
        	//Final translation
            cbFinal.call(this, translation);
            this.onEnd();
        }
    },
    detect: function(text, callback){
    	//TODO in implementation
    },
    webTranslate: function(text, from, to){
    	//TODO in implementation
    }
};

/**
 * Translate using Microsoft® Translator
 * http://www.microsofttranslator.com/dev/
 */
GRP.lang.TranslateMs = extend(GRP.lang.WebTranslate, {
	//url:"http://api.microsofttranslator.com/V2/Ajax.svc/GetTranslations", 
	url:"http://api.microsofttranslator.com/V2/Ajax.svc/Translate",
//	urlAppId:"http://api.microsofttranslator.com/V2/Ajax.svc/Detect",
	key: '0BF9646CB05E7370D190E046CC43A2FA87371776',

	internalTranslate: function(para, from, to, cb){
		var params = {
			oncomplete: 'mstranslatecallback'+(++GRP.lang.IID),
			appId: this.key,
			text: para,
			from: from,
			to: to
		};
		
		scriptLoad({
			cb: params.oncomplete,
    		url: this.url,
    		params:params,
    		success:function(r){
    			if (r) {
    				cb(r);
    			} else {
    				//Error!
                }
    		}
    	});
    }
});


/**
 * Translate using Google (becomes deprecated)
 */
GRP.lang.TranslateGoogle = extend(GRP.lang.WebTranslate, {
    /*
     * Limit size for google API translation
     */
    //limit: 1000, //2K GET, 5k POST
    limit: 850, //150 for key and others url params...
	/**
	 * Key is signed for pitaso.com
	 */
	url: 'https://www.google.com/jsapi?key=ABQIAAAAtEOPihzWueLlNCLMoB9gSRQzovFltyh3__eQzIYnI8zKDV9c-RSnWsxRr2N1XFC9jiUukMEh3_bzxw',
	
	/**
     * Google API loader
     */
	onReady: function(cb, scope){
        var me = this;
        if (me.initInProgress){
        	//Async call while init->retry later
        	setTimeout(function(){
        		console.log('initInProgress');
        		me.onReady.call(me,cb,scope);
        	},500);
        	return;
        }
        var cblast = function(){
        	me.initInProgress=false;
        	cb.call(scope||me,me);
        }
	    var exec = function(g){
            if (google.language && google.language.translate){
            	cblast();
            }else{
            	google.load("language", "1", {callback:cblast});
            }
        };
        if (typeof window.google === "undefined" || typeof window.google.loader === "undefined" ) {
            me.initInProgress=true;
            loadscript(this.url, false, 'googleapi', exec, function (){
            	return window.google && window.google.loader;
			},  me);
        } else{
			exec();
			//cb.call(scope||me, me);
		}
    },
    checkLibs: function(){
    	return (typeof google !== 'undefined' && typeof google.language !== 'undefined' && typeof google.language.translate !== 'undefined');
    },
    internalTranslate: function(para, from, to, cb){
    	function wraptrans(r){
    		cb(r.translation);
    	}
    	if (google.language && google.language.translate){
    		google.language.translate(para, from, to, wraptrans);
    	}else{
    		console.error('No google.language.translate');
    	}
    },
   
    detect: function(text, callback){
       if (typeof google === 'undefined') {
           return;
       }
       google.language.detect(text, function(result){
           if (!result.error) {
               var language = 'unknown';
               for (l in google.language.Languages) {
                   if (google.language.Languages[l] == result.language) {
                       language = l;
                       break;
                   }
               }
               callback.call(this, language);
           }
       });
   },
   webTranslate: function(text, from, to){
       var e = (document.charset || document.characterSet);
       var url = 'http://translate.google.com/translate_t?text=' + text + '&hl=en&langpair=' + from + '|' + to + '&tbb=1&ie=' + e;
   }
});

/**
 * Google Translate element
 * http://translate.google.com/translate_tools
 */

function GRPGoogleSectionalElementInit() {
	new google.translate.SectionalElement({
		    sectionalNodeClassName: 'ptrans',
		    controlNodeClassName: 'pctrl',
		    background: 'transparent'
	 }, 'google_sectional_element');
}

GRP.lang.TranslateElement = extend(GRP.lang.WebTranslate, {
	url: 'http://translate.google.com/translate_a/element.js?cb=googleSectionalElementInit&ug=section&hl='+this.to,
	tip:false, //No tooltip
	tpl:[ '<div class="ptrans">',
	      '<div class="pctrl"></div>',
          '{0}',
     '</div>'],
	checkLibs: function(){
    	return true; 
    },
    onReady: function(cb, scope){
    	cb.call(scope||this, this);
    },
    internalTranslate: function(para, from, to, cb){
    	cb.call(this, para);
    },
    onEnd:function(){
    	var tip = get_id(':0.balloonContainer');
    	if (tip){
    		tip.remove();
    	}
    	var src = get_id('googleElement');
    	if (src){
    		src.remove();
    	}
		var url = 'http://translate.google.com/translate_a/element.js?cb=GRPGoogleSectionalElementInit&ug=section&hl='+this.to;
		loadscript(url, false, 'googleElement', function(){}, function(){
        	return window.google && window.google.translate;
		},  this);
	},
});

GRP.lang.Translate = function(engine){
	var provider = GRP.lang.engines[engine];
	if (!provider){
		engine=engine||GRP.lang.DEFAULT_ENGINE;
		if (engine==='google'){
			provider = new GRP.lang.TranslateGoogle();
		}else if (engine==='ms'){
			provider = new GRP.lang.TranslateMs();
		}else if (engine==='element'){
			provider = new GRP.lang.TranslateElement();
		}
		
		GRP.lang.engines[engine]=provider;
		provider.engine=engine;
	}
	return provider;
};


function scriptLoad(cfg){
	window[cfg.cb] = function(r){
			cfg.success(r);
	};
	var store = new Ext.data.Store({
	    proxy: new Ext.data.ScriptTagProxy({
			url: cfg.url+'?'+Ext.urlEncode(cfg.params)
	    })
	});
	store.load();
}

function loadscript(script, inline, id, cb, check, scope){
    var el = document.createElement("script");
    el.setAttribute("type", "text/javascript");
    if (inline) {
        el.innerText = script;
    } else {
        el.setAttribute("src", script);
    }
    if (id) {
        el.setAttribute("id", id);
    }
    document.getElementsByTagName("head")[0].appendChild(el);
    if (cb) {
        if (check) {
            waitlib(check, cb, scope);
        } else {
            cb.call(scope || this);
        }
    }
};
function waitlib(check, fn, scope, inside){
    inside = inside || 0;
	var o = check();
    if ((inside > 20) || (typeof o !== 'undefined')) {
        if (fn) {
            fn.call(scope || this, o);
        }
    } else {
        window.setTimeout(function(){
            waitlib(check, fn, scope, ++inside);
        }, 200);
    }
};