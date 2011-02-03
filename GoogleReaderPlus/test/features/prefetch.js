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
    var config = GM_getValue(id, {
        version: '',
        src: '',
        targetFunction: '',
        targetValue: ''
    };
    
    Array.slice(document.getElementsByTagName('script')).forEach(function(e){
        if (e.src && /\/reader\/ui\/\d+-\w+-scroll.js/.test(e.src)) {
            if (config.src == e.src && config.version == version) {
                more(config.targetFunction, config.targetValue);
                return;
            }
            config.version = version
            config.src = e.src;
            GM_xmlhttpRequest({
                method: 'GET',
                url: config.src,
                onload: function(res){
                    var s = res.responseText;
                    var a, r;
                    // o.Sl=function(){return St(this.tb())?this.Xa?1:5:20};
                    s = s.split(/;[^;]+\.([^.]+)=[^=]+\{[^{]+1:5:20/)[0];
                    if (!RegExp.$1) 
                        throw new Error('Prefetch failed. Something wrong with the js.');
                    a = RegExp.$1;
                    // new Ut(this.ba,q(this.Cg,this),q(this.Jo,this),q(this.Lu,this),q(this.ys,this),q(this.Sl,this));
                    r = new RegExp('new ([a-zA-Z]+)\\([^;]+this\.' + a + '[^a-zA-Z]');
                    s = s.split(r)[0];
                    a = RegExp.$1;
                    // function Ut(a,b,c,d,e,g){this.ba=a;this.AE=b;this.PE=c;this.CA=d;this.dy=e;this.QE=g;this.fl={kH:0,Dl:0}}
                    r = new RegExp('function ' + a + '\\([a-zA-Z]+,[a-zA-Z]+,[a-zA-Z]+,[a-zA-Z]+,[a-zA-Z]+,([a-zA-Z]+)\\)');
                    s = s.split(r)[2];
                    a = RegExp.$1;
                    r = new RegExp('\\{[^}]+this.([a-zA-Z]+)=' + a);
                    s = s.split(r)[2];
                    a = RegExp.$1;
                    // function Vt(a){var b=a.fl.Dl;a.fl.Dl+=a.QE();var c=a.fl.Dl;a.dy(a.ba.nj(),a.ba.Oh());for(b=b;b<c;b++)a.ba.Eh(b,q(a.Cg,a,b))}
                    r = new RegExp('function ([a-zA-Z]+)\\([^\\)]*\\)\\{[^}]+=([a-zA-Z]+\\.' + a + '\\(\\))[^}]+\\}');
                    r.test(s);
                    if (a == RegExp.$1) 
                        throw new Error('Prefetch failed. Something wrong with the js!!');
                    config.targetFunction = RegExp.$1;
                    config.targetValue = RegExp.$2;
                    GM_setValue(id, config);
                    more(config.targetFunction, config.targetValue);
                }            
			});
        }
    });
    
    function more(targetFunction, targetValue){
        var n = 'unsafeWindow.' + targetFunction, v = targetValue, e = eval, p;
        try {
            p = e(n);
        } catch (x) { // for Firefox prior to 3.5
            e = unsafeWindow.eval, n = targetFunction, p = e(n);
        }
        var r = uneval(p).replace(v, ['(', v, ' == 5)? ', first, ' : (', v, ' == 1)? ', next, ' : (', v, ' == 20)? ', list, ' : ', v].join('')).replace(/{/, '{with(unsafeWindow){').replace(/}$/, '}}');
        e(n + '=' + r);
    }
};
