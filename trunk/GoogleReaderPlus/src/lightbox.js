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
    
    function addButton(el, entry, mode){
        var text = SL.text + formatShortcut(ID, 'light', prefs);
        addBottomLink(el, SL.keyword, text, 'btn-' + ID, true, lightize, locked, entry, mode);
    }
    
    function addKey(){
        onKey('btn-' + ID, lightize);
    }
    
    function lightize(btn, entry, lcked, e){
        var locked = (lcked && (typeof e === "undefined"));
        if ((typeof jQuery === "undefined") || (typeof TopUp === "undefined")) {
            return false;
        }
        if (locked && filterEntry(entry, rx)) {
            //Regex filtered
            return false;
        }
        
        var active = isActive(btn, entry, ID, locked);
        if (active) {
            decorateTitle(entry);
            decorateLinks(entry);
            decorateMedias(entry);
        }
    }
    function decorateTitle(entry){
        var link = getEntryLink(entry);
        jQuery(link.link).addClass('lighton').attr('href', '#').click(function(){
            TopUp.display(link.url, 
            {
                topUp:this,
				type:'iframe',
				width:screen.width-50,
				height:screen.height-50,
				title: "Link {alt} ({current} of {total})",
                group: "news",
                layout: "quicklook",
                readAltText: 1,
                shaded: 1
            });
        });
    }
    
    function decorateLinks(entry){
        //Links without image
		jQuery(entry).find('.entry-body a:not(a:has(img))').addClass('lightlinks').click(function(){
            TopUp.display(this.href, 
            {
                topUp:this,
				type:'iframe',
				width:screen.width-50,
				height:screen.height-50,
				title: "Link {alt} ({current} of {total})",
                group: "links",
                layout: "quicklook",
                readAltText: 1,
                shaded: 1
            });
        });
    }
    
    function decorateMedias(entry){
        if (!hasClass(entry, 'lightmedias')) {
            //images sans liens
            jQuery(entry).find('img:not(a img)').click(function(){
                TopUp.display(this.src, 
                {
                    topUp:this,
					type:'image',
					title: "Image {alt} ({current} of {total})",
                    group: "links",
                    layout: "quicklook",
                    readAltText: 1,
                    shaded: 1
                });
            });
			jQuery(entry).find('video,object,embed').click(function(){
                TopUp.display(this.src, 
                {
                    topUp:this,
					type:'auto',//'flashvideo'
					title: "Video {alt} ({current} of {total})",
                    group: "links",
                    layout: "quicklook",
                    readAltText: 1,
                    shaded: 1
                });
            });
            jQuery(entry).find('img:not(a img),video,object,embed').addClass('lightmedias');
            //videos
            addClass(entry, 'lightmedias');
        }
    }
    
    
    
    function init(){
        GM_loadScript('http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js', true, function(){
            return (typeof jQuery !== "undefined");
        }, loadui);
        
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
    
    var css = ".lighton{ border: 1px solid red;}.lightlinks{ border: 1px solid green;}.lightmedias{ border: 1px solid yellow;} ";
    GM_addStyle(css);
    
    registerFeature(addButton, 'e' + ID);
    var keycode = getShortcutKey(ID, 'light', prefs);
    keycode.fn = addKey;
    initKey(keycode);
    init();
};

