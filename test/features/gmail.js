/**
 * Use Gmail Theme for Reader
 *
 */
GRP.gmail = function(prefs, langs, ID, SL, lang){
    var urlgmail = 'https://mail.google.com/mail';
    var css = GM_getValue('cache_gmail');
    loadCss('skin/css/mytheme.css', function(css){
        stylish(css);
    });
    function stylish(tplCss){
        applyStyle(tplCss, '');
        /*
        
         GM_xmlhttpRequest({
        
         method: 'GET',
        
         url: urlgmail,
        
         //xpath: '//style',
        
         onload: function(r){
        
         var styles = r.xml || compact(r.responseText);
        
         var head = /<head>(.*?)<\/head>/.exec(styles)[1];
        
         console.log(head);
        
         applyStyle(head);
        
         }
        
         });*/
        
    }
    
    function applyStyle(tplCss, styles){
        var o = {
            bg: '#99b1c3',
            color: '#333944',
            image: 'images/2/5/coldshower/blue-tile.png',
			repeat:true
        };
		//https://mail.google.com/mail/?ui=2&view=ss&ver=undefined&am=!Y_6TWUBke-eQdZ3SKfS12gPc0JzeQUr3v9BacXrzafRiCTCQ&fri
		//
		
        //image+background
        //.cP{background:#99b1c3 url(images/2/5/coldshower/blue-tile.png) 0 0 repeat}
		//.cS .wp{background:url(images/2/5/ninja/header_bg.gif) no-repeat}	
        //color
        //.G9 .NQ .nU,.G9 .NQ .n0{color:#333944}
        //border
        //.z .m,.y .m{background:#406480}
        var m = /\.cP{background:(#[\d\w]+)\s+url\(([^)]+)/.exec(styles);
        if (m) {
            o.bg = m[1] || '#99b1c3';
            o.image = m[2] || 'images/2/5/coldshower/blue-tile.png';
        }
        if (o.image) {
            o.image = urlgmail + '/' + o.image;
        }
        var n = /\.G9\s\.NQ\s\.nU,\.G9\s\.NQ\s\.n0{color:(#[\d\w]+)}/.exec(styles);
        if (n) {
            o.color = n[1] || '#333944';
        }
		
        var css = fillTpl(tplCss, o);
        //same theme for repeat / norepeat
		if (o.repeat){
			css=css.replace(/\/\*--bg2>--\*\//, '/*').replace(/\/\*--<bg2--\*\//, '*/');
			css=css.replace('/*--bg1>--*//*', '').replace('*//*--<bg1--*/', '');
		}
		
        GM_addStyle(css, 'rps_gmail');
        //cache css
        GM_setValue('cache_gmail', css);
    }
    
};


