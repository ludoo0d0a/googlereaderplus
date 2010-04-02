/**
 * Google Reader Preview Enhanced
 * @version  1.0.7g
 * @date 2009-01-16
 *
 * Adds a "Preview button" to Google Reader that allows you to view actual article in a frame.
 * Clicking again on that button goes back to RSS view.
 * Does work both in List view and expanded view.
 *
 * Original author :
 * Bryan Tsai
 * Julien Carosi
 * http://userscripts.org/scripts/show/12352
 * http://userscripts.org/scripts/show/9455
 */
GRP.preview = function(prefs, langs){
    var SL = langs.preview;
    var locked = false;
    var rx = getRegex(prefs.preview_filter);
    function addPreviewButton(el, entry, mode){
        // Top link
        //[preview as text] [maximize as icon]
        var previewOnIcon = prefs.preview_onicon || false;
        var keytext = formatShortcut('preview', 'prview', prefs);
        var link = getOriginalEntryLink(entry);
        //addClass(link, 'iframe');
        var plink;
        if (previewOnIcon) {
            addClass(link, 'grp-link-url');
            addClass(link, 'grp-link-title');
            //add a button right after the title
            plink = document.createElement('a');
            plink.title = SL.title + keytext; //[Shift+V]
            plink.href = '#';
            plink.innerHTML = '<div class="entry-title-preview"></div>';
            insertAfter(plink, link);
            plink.addEventListener('click', previewTitleClick, false);
        } else {
            //clean current a.href link to keep open link
            var text = link.innerText;
            link.title = SL.opennewtab;
            addClass(link, 'grp-link-url');
            link.innerHTML = '<div class="entry-title-maximize"></div>';
            //create a second link before the previous one to used as preview
            var title = link.parentNode;// h2.entry-title
            plink = document.createElement('a');
            //plink.className = 'ilink entry-title-link';
            addClass(plink, 'grp-link-title');
            plink.href = '#';
            plink.title = SL.title + keytext; //[Shift+V]
            plink.innerText = ' ' + text;
            link.parentNode.insertBefore(plink, link);
            plink.addEventListener('click', previewTitleClick, false);
        }
        // Bottom button
        addBottomLink(el, SL.keyword, SL.text + keytext, 'btn-preview', true, previewize, locked, entry, mode);
    }
    function previewShortcut(){
        onKey('btn-preview', previewize);
    }
    /**
     * Click on faked title link to open preview
     */
    function previewTitleClick(e){
        e.preventDefault();
        var entry = getEntry(e);
        if (e.ctrlKey) {
            //Ctrl+click : open in a new tab
            openEntryInNewTab(entry);
        } else {
            var btn = getFirstElementByClassName(entry, 'btn-preview');//span
            previewize(btn, entry, locked, e);
        }
    }
    function previewize(btn, entry, lcked, e){
        var locked = (lcked && (typeof e === "undefined"));
        if (locked && filterEntry(entry, rx)) {
            //Regex filtered
            return false;
        }
        var iframe;
        var active = isActive(btn, entry, 'preview', locked);
        // Need to scroll before changing entry-body, because scrolling repaints
        // article from scratch (list view only)
        if (!locked) {
            jump(entry, true);
        }
        var body = getFirstElementByClassName(entry, 'entry-body');//div
        var entryBody = getFirstElementByClassName(body, 'entry-enclosure');//div
        if (!entryBody) {
            entryBody = getFirstElementByClassName(body, 'item-body');//div
        }
        iframe = getFirstElementByClassName(entry, 'if-preview');//'iframe'
        if (active) {
            // classic mode-> preview mode
            if (iframe) {
                // iframe already in document, display it
                iframe.style.display = 'block';
            } else {
                // iframe not in document, create it
                iframe = document.createElement('iframe');
                //iframe.id='if-preview';
                updateFrame(iframe, entry);
                iframe.className = 'if-preview';
                if (prefs.preview_overlay) {
					renderoverlay(iframe, entry);
                } else {
                    entryBody.style.display = 'none';
					iframe.setAttribute('width', '100%');
                    var h = getHeightEntries();
                    iframe.setAttribute('height', h + 'px');
                    body.appendChild(iframe);
                }
                //if (prefs.preview_adjustframe) { adjustIframeHeight(iframe, h); }
            }
            // Scale article container to fullwidth
            body.setAttribute('style', 'max-width: 98%');
        } else {
            // preview mode -> classic mode
            // hide iframe
            if (iframe) {
                iframe.style.display = 'none';
            }
            // show rss item
            entryBody.style.display = 'block';
            body.removeAttribute('style', '');
            if (!locked) {
                jump(entry, true);
            }
        }
    }
	function updateFrame(iframe, entry){
		var urlLink = getEntryLink(entry);
		var url = urlLink.url;
		if (overlay && overlay.title){
			overlay.title.innerHTML = '<a href="'+urlLink.url+'">'+urlLink.title+'</a>';
		}
		var locksite = isSiteLocked(url);
		if (locksite) {
			GM_xmlhttpRequest({
				url: url,
				onload: function(r){
					iframe.setAttribute('src', cleanHtml(r.responseText, url));
				}
			});
		} else {
			//get url fron hidden link
			iframe.setAttribute('src', url);
		}
	}
				
    function isSiteLocked(url){
        /*if (/www\.zdnet\.fr/.test(url) || /www\.lefigaro\.fr/.test(url) || /www\.chauffeurdebuzz\.com/.test(url)){
         return true;
         }*/
        return false;
    }
    function cleanHtml(html, url){
        var base = (/(.*)\//.exec(url))[0];
        //compress
        var text = html.replace(/\n\r/, "");
        //remove scripts
        text = text.replace(/<script.*<\/script>/gi, '');
        //add base
        text = text.replace('<head>', '<head><base href="' + base + '" />');
        //render html
        var htmlurl = 'data:text/html;,' + encodeURIComponent(text);
        return htmlurl;
    }
	var overlay={};
    function renderoverlay(iframe, entry){
        if (overlay.root) {
			overlay.root.style.display = '';
		}else{
			var urlLink = getEntryLink(entry);
			overlay.root = newel('pov');
			overlay.mask = dh(overlay.root,'div',{
				id: 'pov_mask'
			});
			overlay.btn_next = dh(overlay.root,'div',{
				id: 'pov_next',
				title:SL.overlay_next
			},{click:function(){
				siblingentry(iframe, true);
			}});
			overlay.btn_previous = dh(overlay.root,'div',{
				id: 'pov_previous',
				title:SL.overlay_previous
			},{click:function(){
				siblingentry(iframe, false);
			}});
			overlay.btn_close = dh(overlay.root,'div',{
				id: 'pov_close',
				title:SL.overlay_close
			},{click:function(){
				hideoverlay();
			}});
			overlay.title = dh(overlay.root,'div',{
				id: 'pov_title',
				html: '<a href="'+urlLink.url+'">'+urlLink.title+'</a>'
			});	
			overlay.content = dh(overlay.root,'div',{
				id: 'pov_content'
			});		
			overlay.content.appendChild(iframe);	
		}
		overlay.entry=entry;
		overlay.iframe=iframe;
        overlay.content.style.height = (window.innerWidth-40) + 'px';
        overlay.content.style.width =(window.innerHeight-40) + 'px';
        iframe.setAttribute('width', (window.innerWidth-40)+'px');
        iframe.setAttribute('height', (window.innerHeight-80) + 'px');
    }
	function hideoverlay(){
		overlay.root.style.display='none';
	}
	function siblingentry(iframe, next){
		var entry;
		if (next){
			entry = overlay.entry.previousSibling;
		}else{
			entry = overlay.entry.nextSibling;
		}
		if (entry) {
			overlay.entry=entry;
			updateFrame(iframe, entry);
			jump(entry, true);
			simulateClick(entry);//mark as read
		}
	}
	
    function onResize(height){
        if (prefs.preview_overlay) {
			//Resize overlay
			if (overlay.root) {
				renderoverlay(overlay.iframe, overlay.entry);
			}
		} else {
			var iframes = getElementsByClazzName('if-preview', 'iframe', document);
			var h = getHeightEntries();
			foreach(iframes, function(iframe){
				iframe.setAttribute('height', h + 'px');
			});
		}
    }
    //column_locked
    locked = false;
    if (prefs && prefs.preview_locked) {
        locked = prefs.preview_locked;
    }
    var css = ".entry-title-maximize {margin-left: 4px;padding-left:16px;width:14px;height:14px;background-repeat:no-repeat;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAMIAzwDxOt8TMwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kMERYGFfecphMAAAIYSURBVDjLjVK/a1NRGD3fffcleUlaSRpjiylBCTV0FTc3cXXRDkVB0bGDUnRxqCB2VKE4qCDSwcGt/4G66GBBpEOt1RolsTHBJLT58X7ez6H58fLU6lk+Lufe75zvfJewD0zbm9nYtuYsmzUiH8EACBg1hEP4B9qme3t1vTUPIBbkdEmr0rS8Ez9qzknFTK6rmIgAIijFGDugy2hELhQrZn6rZJ3b0x2AAMhPRXOxtuOeZuYBQQRB+JrLGHd2Wu7jdx9bM3+zKk1bxSZS+kouYywFFGqVhnPmw5fOeSKAAaaAAwCQABDWRZ2IXvQzYhb1pntvo9C56rNLg/j6FeJPthq77t21zfZlZoAIHOSz4+EVAC0G6LcG1Ya9uPa5fQ3ASHd1PUUAcKePGMuHD4XOHs/Hl0I6WXJY2Xn4frN9YS/Igc0ecpnI/eSofN3sqIXRmLzZtrwrwje3UarYKRBigVkZgJXPGo8mUqGnb9ebt75XbQcAomHtiRhsjjrTR6Oz6YR8TsTE3G9C+ayxfDChzwFIWDZPaVpgC0TQul0cpdR1Zqhq3Z1lwJmajDxIJ0PzXZfw5TFo4KsQQhSV517yPA6lk6HddEK/sd9XlwCgCRoKU2jSVkpdFEK0Avdd9n9ZAJIIXmHbOlat2888xV6PqNQdlH9aQ6+/lc04EY2QbzlyMh1+VShbp7ZKZg7/gbghXo6P6W9651+wUN+npzFYbAAAAABJRU5ErkJggg==);}";
    css += ".entry-title-preview {margin-left: 4px;padding-left:16px;width:14px;height:14px;background-repeat:no-repeat;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oCAQg3C7TLiegAAAB3SURBVCjPYzx0/uN/BnIBuZoPnf/4nwXB+fCLgYHxAQMDAxMuDf8Z/v9jZGBQsDMUYGNgYGBgQUgxPrAz5FcjwsZbMDayLUxEupiJVA34TRnVTLrmf8Rp+Q9Xh5RI/itAEwBu1/z//4+BgVEBQzMsyZECGCnJVQB9eSYmMdOF/wAAAABJRU5ErkJggg==);}";
    css += ".preview .entry-likers, .preview .entry-annotations, .preview .entry-via, .preview .card-comments{display:none;}";
    css += "#pov_mask{position:absolute;top:0px;left:0px;width:100%;height:100%;z-index:15000;background-color:#333;opacity:0.6;}";
    css += "#pov_content{position:absolute;top:0px;left:0px;margin:20px;text-align:center;vertical-align:middle;z-index:15001;color:#ddd;opacity:1;}";
	css += "#pov_content iframe{padding-top:40px;}";
	css += "#pov_title{position:absolute;width:95%;left: 20px;top:5px;height:50px;text-align:center;z-index:15002;}";
	css += "#pov_title a,#pov_title a:visited{color:#ddd;text-decoration:none;font-size:20px;}";
	css += "#pov_next{position:absolute;right:70px;top:45px;background:url("+GRP.IMAGES_PATH+"/next.png);width:24px;height:24px;z-index:15002;cursor:pointer;}";
	css += "#pov_previous{position:absolute;right:40px;top:45px;background:url("+GRP.IMAGES_PATH+"/previous.png);width:24px;height:24px;z-index:15002;cursor:pointer;}";
	css += "#pov_close{position:absolute;right:8px;top:45px;background:url("+GRP.IMAGES_PATH+"/close2.png);width:24px;height:24px;z-index:15002;cursor:pointer;}";
	//css += "#pov_close{position:absolute;right:10px;top:45px;background:url("+GRP.IMAGES_PATH+"/close.png);width:22px;height:22px;z-index:15002;cursor:pointer;}";
	
    GM_addStyle(css);
    registerFeature(addPreviewButton, 'epreview');
    initResize(onResize);
    var keycode = getShortcutKey('preview', 'prview', prefs); //81 q
    keycode.fn = previewShortcut;
    initKey(keycode);
};
