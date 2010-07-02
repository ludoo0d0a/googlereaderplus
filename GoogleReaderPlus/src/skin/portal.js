//Portal theme

GRP.portal = function(prefs){
    var ncolumns = prefs.theme_ncolumns || 2;
    var w = Math.max(100, Math.round((getWidthEntries() - 50) / ncolumns));
    var css = '.entry{float:left;width:' + w + 'px;padding:2px!important;}.card-common{margin:0;}.entry .entry-title {font-size:100%!important;}.entry .card-bottom,.entry-author,.entry-date{display:none;}#scroll-filler{float:left;}';
    GM_addStyle(css, 'rps_portal');
    
    //fireResize();
    function masonry(el, entry, mode){
        var o = {};
        if (entry) {
            console.log('masonry ' + entry.className);
			o = {
                appendedContent: jQuery(entry)
            }
        } else {
           console.log('masonry First : ' + jQuery('#entries .entry').length);
		    o = {
                itemSelector: '.entry:visible',
                //singleMode: true,
                resizeable: false,
                animate: false,
                columnWidth: w / ncolumns,
                save: true
            };
        }
        
        jQuery('#entries').masonry(o, function(){
            //jQuery('#entries').css('height', '');
        });
    }
    
	/*
    masonry();
    
    //update on entries changes
    registerFeature(masonry, 'portal_masonry');
    */
};
