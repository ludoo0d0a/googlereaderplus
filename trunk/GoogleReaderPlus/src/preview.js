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
            var text = link.textContent;
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
        
        if (fancybox) {
            //var link = getEntryLink(entry);
            setFancyBox(plink);
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
            var btn = getFirstElementMatchingClassName(entry, 'span', 'btn-preview');
            previewize(btn, entry, locked, e);
        }
    }
    
    function previewize(btn, entry, locked, e){
        var iframe;
        var active = isActive(btn, entry, 'preview', locked);
        
        // Need to scroll before changing entry-body, because scrolling repaints
        // article from scratch (list view only)
        if (!locked) {
            jump(entry, true);
        }
        
        var body = getFirstElementMatchingClassName(entry, 'div', 'entry-body');
        var entryBody = getFirstElementMatchingClassName(body, 'div', 'entry-enclosure');
        if (!entryBody) {
            entryBody = getFirstElementMatchingClassName(body, 'div', 'item-body');
        }
        
        if (fancybox) {
            //var link = getEntryLink(entry);
            //setFancyBox(link);
        } else {
            iframe = getFirstElementMatchingClassName(entry, 'iframe', 'if-preview');
            
            if (active) {
                // classic mode-> preview mode
                entryBody.style.display = 'none';
                if (iframe) {
                    // iframe already in document, display it
                    iframe.style.display = 'block';
                } else {
                    // iframe not in document, create it
                    iframe = document.createElement('iframe');
                    //iframe.id='if-preview';
                    iframe.setAttribute('width', '100%');
                    var h = getHeightEntries();
                    iframe.setAttribute('height', h + 'px');
					var urlLink = getEntryLink(entry);
					var url = urlLink.url;
					var locksite = isSiteLocked(url);
					if (locksite){
						GM_xmlhttpRequest({url:url, onload:function(r){
							iframe.setAttribute('src', cleanHtml(r.responseText, url));
						}});
					}else{
	                    //get url fron hidden link
						iframe.setAttribute('src', url);
                   	}
                    iframe.className = 'if-preview';
                    body.appendChild(iframe);
                    
                    /*if (prefs.preview_adjustframe) {
                     adjustIframeHeight(iframe, h);
                     }*/
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
		var text=html.replace(/\n\r/,"");
		//remove scripts
		text=text.replace(/<script.*<\/script>/gi, '');
		//add base
		text=text.replace('<head>', '<head><base href="'+base+'" />');
		//render html
		var htmlurl = 'data:text/html;,' + encodeURIComponent(text);
		return htmlurl;
	}
    
    function onResize(height){
        var iframes = getElementsByClazzName('if-preview', 'iframe', document);
        var h = getHeightEntries();
        if (iframes && iframes.length > 0) {
            for (var i = 0, len = iframes.length; i < len; i++) {
                iframes[i].setAttribute('height', h + 'px');
            }
        }
    }
    
    //var fancybox = prefs.preview_fancybox || false;
	var fancybox = false;
    
    function initFancyBox(){
        if (fancybox) {
            GM_addScript("http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js", true);
            GM_addCss("http://fancybox.net/js/fancybox/jquery.fancybox-1.2.6.css");
            waitJquery(function(){
                GM_addScript("http://fancybox.net/js/fancybox/jquery.fancybox-1.2.6.pack.js", true);
                GM_addScript("http://fancybox.net/js/jquery.easing.1.3.js", true);
            })
            
        }
    }
    function waitJquery(fn){
        window.setTimeout(function(){
            //wait jquery
            if (typeof jQuery !== "undefined") {
                fn.call(this);
            } else {
                //console.log('No jquery found '+new Date());
                waitJquery(fn);
            }
        }, 1000);
    }
    function runFancyBoxAuto(){
        if (fancybox) {
            if ((typeof jQuery !== "undefined") && (typeof jQuery.fn.fancybox !== "undefined")) {
                jQuery("a.dofbox").removeClass('dofbox').addClass('infbox').fancybox(
                {
                     hideOnContentClick: false
					 /*
					,title: jQuery(this).text(),
                    frameWidth: 800,
                    frameHeight: 600,
                    enableEscapeButton: true,
                    showCloseButton: true*/
                });
            }
        }
    }
    function setFancyBox(link){
        if (fancybox) {
            addClass(link, 'dofbox');
        }
    }
    
    //column_locked
    locked = false;
    if (prefs && prefs.preview_locked) {
        locked = prefs.preview_locked;
    }
    
    var css = ".entry-title-maximize {margin-left: 4px;padding-left:16px;width:14px;height:14px;background-repeat:no-repeat;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAMIAzwDxOt8TMwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kMERYGFfecphMAAAIYSURBVDjLjVK/a1NRGD3fffcleUlaSRpjiylBCTV0FTc3cXXRDkVB0bGDUnRxqCB2VKE4qCDSwcGt/4G66GBBpEOt1RolsTHBJLT58X7ez6H58fLU6lk+Lufe75zvfJewD0zbm9nYtuYsmzUiH8EACBg1hEP4B9qme3t1vTUPIBbkdEmr0rS8Ez9qzknFTK6rmIgAIijFGDugy2hELhQrZn6rZJ3b0x2AAMhPRXOxtuOeZuYBQQRB+JrLGHd2Wu7jdx9bM3+zKk1bxSZS+kouYywFFGqVhnPmw5fOeSKAAaaAAwCQABDWRZ2IXvQzYhb1pntvo9C56rNLg/j6FeJPthq77t21zfZlZoAIHOSz4+EVAC0G6LcG1Ya9uPa5fQ3ASHd1PUUAcKePGMuHD4XOHs/Hl0I6WXJY2Xn4frN9YS/Igc0ecpnI/eSofN3sqIXRmLzZtrwrwje3UarYKRBigVkZgJXPGo8mUqGnb9ebt75XbQcAomHtiRhsjjrTR6Oz6YR8TsTE3G9C+ayxfDChzwFIWDZPaVpgC0TQul0cpdR1Zqhq3Z1lwJmajDxIJ0PzXZfw5TFo4KsQQhSV517yPA6lk6HddEK/sd9XlwCgCRoKU2jSVkpdFEK0Avdd9n9ZAJIIXmHbOlat2888xV6PqNQdlH9aQ6+/lc04EY2QbzlyMh1+VShbp7ZKZg7/gbghXo6P6W9651+wUN+npzFYbAAAAABJRU5ErkJggg==);}";
    css += ".entry-title-preview {margin-left: 4px;padding-left:16px;width:14px;height:14px;background-repeat:no-repeat;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oCAQg3C7TLiegAAAB3SURBVCjPYzx0/uN/BnIBuZoPnf/4nwXB+fCLgYHxAQMDAxMuDf8Z/v9jZGBQsDMUYGNgYGBgQUgxPrAz5FcjwsZbMDayLUxEupiJVA34TRnVTLrmf8Rp+Q9Xh5RI/itAEwBu1/z//4+BgVEBQzMsyZECGCnJVQB9eSYmMdOF/wAAAABJRU5ErkJggg==);}";
    css += ".preview .entry-likers{display:none;}";
    GM_addStyle(css);
    
    initCatchEntries(addPreviewButton, 'epreview', runFancyBoxAuto);
    initResize(onResize);
    
    var keycode = getShortcutKey('preview', 'prview', prefs); //81 q
    keycode.fn = previewShortcut;
    initKey(keycode);
    initFancyBox();
};
