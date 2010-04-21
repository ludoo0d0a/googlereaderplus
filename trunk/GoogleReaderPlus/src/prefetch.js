/**
 * Google Reader Prefetch More
 * @version  0.3.0
 * @date 2009-10-24
 *
 * This script will improve the speed experience.
 * It boosts the number of articles that prefetched on the Google Reader's expanded view.
 *
 * Original author :
 * ucnv
 * http://userscripts.org/scripts/show/26383
 */
GRP.prefetch = function(prefs, langs, ID, SL, lang){
    var first = 25; // default is 5
    var next = 15; // default is 1
    var list = 60; // default is 20
    var version = '0.3.0';
    
    var id = 'GoogleReaderPrefetchMore';
    var config = eval(GM_getValue(id)) ||
        {
        version: '',
        src: '',
        targetFunction: '',
        targetValue: ''
    };
    
    var scripts = document.getElementsByTagName('script');
    for (var i = 0, len = scripts.length; i < len; i++) {
        var e = scripts[i];
        if (e.src && /\/reader\/ui\/\d+-\w+-scroll.js/.test(e.src)) {
            if (config.src == e.src && config.version == version) {
                more(config.targetFunction, config.targetValue);
                return;
            }
            config.version = version;
            config.src = e.src;
            GM_xmlhttpRequest(
            {
                method: 'GET',
                url: config.src,
                onload: function(res){
                    var s = res.responseText;
                    // aF.prototype.Om=function(){return
                    // TE(this.cb())?this.Xa?1:5:20};
                    var m = s.match(/;([^=]+)=(function\(\)\{[^\}]*\?1:5:20\});/);
                    if (m.length != 3) 
                        throw new Error('Prefetch failed. Something wrong with the js.');
                    config.targetFunction = m[1];
                    config.targetValue = m[2];
                    GM_setValue(id, uneval(config));
                    // GM_log('js changed.');
                    more(config.targetFunction, config.targetValue);
                }
            });
        }
    }
    
    function more(targetFunction, targetValue){
        // var w = 'unsafeWindow';
        // var w = 'window';
        var f = /* w + '.' + */ targetFunction;
        // var v = targetValue.replace(/function\(\){([^}]*)}/, "function(){with("
        // + w + "){$1}}").replace('1:5:20',
        // [ next, first, list ].join(':'));list
        var v = targetValue.replace('1:5:20', [next, first, list].join(':'));
        console.log(f + '=' + v);
        // console.log(window.fF);
        /*
         * with(window){ fF.prototype.Tm=function(){ return
         * (ZE(this.db())?this.Ya?next:first:list); }; }
         */
        // window.eval('window.fF');
        eval(f + '=' + v);
        console.log('evaled');
    }
};
