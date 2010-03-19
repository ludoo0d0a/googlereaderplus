/**
 * Lighbox
 * @version  0.1
 * @date 2010
 * @author LudoO
 *
 * Add a lightbox
 * Idea from Player : http://www.google.com/reader/play/
 *
 */
GRP.lightbox = function(prefs, langs){
    var ID = 'lightbox';
    var SL = langs[ID];
    var locked = prefs[ID + '_locked'];
    var entries = get_id('entries');
    var rx = getRegex(prefs[ID + '_filter']);
    var box = prefs[ID + '_box'] || 'shadowbox'; //ceebox, shadowbox,topup,multibox
    function addButton(el, entry, mode){
        var text = SL.text + formatShortcut(ID, 'light', prefs);
        addBottomLink(el, SL.keyword, text, 'btn-' + ID, true, lightize, locked, entry, mode);
    }
    
    function addKey(){
        onKey('btn-' + ID, lightize);
    }
    
    function lightize(btn, entry, lcked, e){
        var locked = (lcked && (typeof e === "undefined"));
        if (locked && filterEntry(entry, rx)) {
            //Regex filtered
            return false;
        }
        
        var active = isActive(btn, entry, ID, locked);
        if (active) {
            //decorateTitle(entry);
            //decorateLinks(entry);
            decorateMedias(entry);
        }
    }
    function decorateTitle(entry){
        var link = getEntryLink(entry);
        jQuery(link.link).addClass('lighton').attr('href', '#').click(function(){
        	show(link.url, this, 'iframe');
        });
    }
    
    function decorateLinks(entry){
        //Links without image
        jQuery(entry).find('.entry-body a:not(a:has(img))').addClass('lightlinks').click(function(){
            show(this.href, this, 'iframe');
        });
    }
    
    function decorateMedias(entry){
        if (!hasClass(entry, 'lightmedias')) {
            //images sans liens
            jQuery(entry).find('img:not(a img)').click(function(){
                show(this.src, this, 'image');
            });
            jQuery(entry).find('video,object,embed').click(function(){
                show(this.src, this, 'video');
            });
            jQuery(entry).find('img:not(a img),video,object,embed').addClass('lightmedias');
            addClass(entry, 'lightmedias');
        }
    }
    
    function show(url, el, type){
        if (box == 'ceebox') {
            if (typeof jQuery.fn.ceebox !== "undefined") {
                show_ceebox(url, el, type);
            }
        } else if (box == 'topup') {
            if (typeof TopUp !== "undefined") {
                show_topup(url, el, type);
            }
        } else if (box == 'shadowbox') {
            if (typeof Shadowbox !== "undefined") {
                show_shadowbox(url, el, type);
            }
        } else if (box == 'multibox') {
            if (typeof multiBox !== "undefined") {
                show_multibox(url, el, type);
            }
        }
    }
    
    function show_shadowbox(url, el, type){
        Shadowbox.setup(el, 
        {
            gallery: "news",
            continuous: true,
            counterType: "skip",
            autoplayMovies: true
        });
    }
    
    function show_ceebox(url, el, type){
        var params = {};
        if (type == 'iframe') {
            
			
			
			params = {};
        } else if (type == 'image') {
            params = {};
        } else if (type == 'video') {
            params = {};
        }
        
        jQuery(el).ceebox();
    }
    
    function show_multibox(url, el, type){
        var box = new multiBox(el, 
        {
            overlay: new overlay()
        });
    }
    
    function show_topup(url, el, type){
        var params = {};
        if (type == 'iframe') {
            params = 
            {
                topUp: el,
                type: 'iframe',
                width: screen.width - 50,
                height: screen.height - 50,
                title: "Link {alt} ({current} of {total})",
                group: "links",
                layout: "quicklook",
                readAltText: 1,
                shaded: 1
            };
        } else if (type == 'image') {
            params = 
            {
                topUp: el,
                type: 'image',
                title: "Image {alt} ({current} of {total})",
                group: "links",
                layout: "quicklook",
                readAltText: 1,
                shaded: 1
            };
        } else if (type == 'video') {
            params = 
            {
                topUp: el,
                type: 'auto',//'flashvideo'
                title: "Video {alt} ({current} of {total})",
                group: "links",
                layout: "quicklook",
                readAltText: 1,
                shaded: 1
            };
        }
        
        TopUp.display(url, 
        {
            topUp: el,
            type: 'image',
            title: "Image {alt} ({current} of {total})",
            group: "links",
            layout: "quicklook",
            readAltText: 1,
            shaded: 1
        });
    }
    
    function init(){
        if (box == 'ceebox') {
            init_ceebox();
        } else if (box == 'topup') {
            init_topup();
        } else if (box == 'shadowbox') {
            init_shadowbox();
        } else if (box == 'multibox') {
            init_multibox();
        }
    }
    function init_multibox(){
        loadjQuery();
		GM_loadScript('http://ajax.googleapis.com/ajax/libs/mootools/1.2.4/mootools-yui-compressed.js', true, loadmultibox);
        function loadmultibox(){
            GM_addScript('http://www.phatfusion.net/_common/js/Utilities/overlay.js', true);
            GM_addScript('http://www.phatfusion.net/_common/js/Utilities/Assets.js', true);
            GM_addScript('http://www.phatfusion.net/_common/js/Interface/multibox.js', true, function(){
                return multiBox;
            });
        }
    }
    function init_shadowbox(){
        loadjQuery();
		GM_loadScript('http://shadowbox-js.com/build/shadowbox.js', true, function(){
            return unsafeWindow.Shadowbox;
        }, runshadowbox);
        GM_addCss('http://shadowbox-js.com/build/shadowbox.css');
        
        function runshadowbox(Shadowbox){
            Shadowbox.init(
            {
                skipSetup: true
            });
        }
    }
    
    function init_ceebox(){
        GM_loadScript('http://github.com/catcubed/CeeBox/raw/master/js/jquery.js', true, function(){
            return (typeof jQuery !== "undefined");
        }, loaddependencies);
        function loaddependencies(){
            jQuery.noConflict();
            GM_addScript('http://github.com/catcubed/CeeBox/raw/master/js/jquery.swfobject.js', true);
            GM_addScript('http://github.com/catcubed/CeeBox/raw/master/js/jquery.metadata.js', true);
            GM_addScript('http://github.com/catcubed/CeeBox/raw/master/js/jquery.color.js', true);
            GM_addScript('http://github.com/catcubed/CeeBox/raw/master/js/jquery.easing.js', true);
            GM_addScript('http://github.com/catcubed/CeeBox/raw/master/js/jquery.ceebox-min.js', true, function(){
				//jQuery.fn.ceebox.videos.base.param.allowScriptAccess = "sameDomain";
			});
            GM_addCss('http://github.com/catcubed/CeeBox/raw/master/css/ceebox-min.css');
            GM_addStyle('#cee_overlay{z-index:102 !important;}');
        }
    }
    
    function init_topup(){
        loadjQuery(loadui);
        
        function loadui(){
            window.jQuery = jQuery;
            jQuery.noConflict();
            GM_loadScript('http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/jquery-ui.min.js', true, function(){
                return (typeof jQuery.ui !== "undefined");
            }, loadtopup);
        }
        
        function loadtopup(){
            //GM_loadScript('chrome://extensions/'+GUID_CORE+'/lib/topup/top_up.js',
            GM_loadScript('http://googlereaderplus.googlecode.com/svn/trunk/GoogleReaderPlus/src/lib/topup/top_up.js', true, function(){
                return (typeof TopUp !== "undefined");
            }, runtopup);
        }
        
        function runtopup(){
            window.TopUp = TopUp;
            TopUp.host = "http://gettopup.com/";
            TopUp.init(true);
        }
    }
    
	function loadjQuery(cb){
		GM_loadScript('http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js', true, function(){
            return (typeof jQuery !== "undefined");
        }, cb);
	}
	
    var css = ".lighton{ border: 1px solid red;}.lightlinks{ border: 1px solid green;}.lightmedias{ border: 1px solid yellow;} ";
    GM_addStyle(css);
    
    registerFeature(addButton, 'e' + ID);
    var keycode = getShortcutKey(ID, 'light', prefs);
    keycode.fn = addKey;
    initKey(keycode);
    init();
};

