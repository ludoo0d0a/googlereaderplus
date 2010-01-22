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

GRP.preview = function(prefs){
   var locked = false;
   
   function addPreviewButton(el, entry, mode){
      // Top link
      //[preview as text] [maximize as icon]
      
      var link = getFirstElementMatchingClassName(entry, 'a', 'entry-title-link');
      
      //empty current link to keep open link
      var text = link.textContent;
      link.title = 'Open in a new window';
      addClass(link, 'title-link-url');
      link.innerHTML = '<div class="entry-title-maximize"></div>';
      
		var keytext = formatShortcut('preview', 'prview', prefs);
		
      //create a second link before the previous one to used as preview
      var title = link.parentNode;// h2.entry-title
      var ilink = document.createElement('a');
      ilink.className = 'ilink entry-title-link';
      ilink.href = '#';
      ilink.title = 'Open as preview' + keytext; //[Shift+V]
      ilink.innerText = ' ' + text;
      link.parentNode.insertBefore(ilink, link);
      ilink.addEventListener('click', previewTitleClick, false);
      
      /*
       //solution 2
       //preventdefault on entry-title-link
       //create a second link after to open background
       var url = link.href;
       link.className = 'ilink entry-title-link';
       link.href = '#';
       link.title = 'Open as preview [Shift+R]';
       link.onclick = previewTitleClick;//with preventdefault on first
       */
      // Bottom button
      addBottomLink(el, 'Preview', 'Integrated preview of the news '+keytext, 'btn-preview', true, previewize, locked, entry);
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
      jump(entry, true);
      
      //todo: factorize in entry.js
      var body = getFirstElementMatchingClassName(entry, 'div', 'entry-body');
      var entryBody = getFirstElementMatchingClassName(body, 'div', 'entry-enclosure');
      if (!entryBody) {
         entryBody = getFirstElementMatchingClassName(body, 'div', 'item-body');
      }
      
      iframe = getFirstElementMatchingClassName(entry, 'iframe', 'if-preview');
      
      if (active) {
         // classic mode-> preview mode
         
         // hide rss item
         entryBody.style.display = 'none';
         // iframe creation/display
         
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
            //get url fron hidden link
            var urlLink = getFirstElementMatchingClassName(entry, 'a', 'title-link-url');
            if (!urlLink) {
               //or if not, from classical one
               urlLink = getFirstElementMatchingClassName(entry, 'a', 'entry-title-link');
            }
            iframe.setAttribute('src', urlLink.href);
            iframe.className = 'if-preview';
            body.appendChild(iframe);
         }
         
         // Scale article container to fullwidth
         body.setAttribute('style', 'max-width: 98%');
         
         //lastEntry = entry;
      } else {
         // preview mode -> classic mode
         
         // hide iframe
         if (iframe) {
            iframe.style.display = 'none';
         }
         
         // show rss item
         entryBody.style.display = 'block';
         body.removeAttribute('style', '');
         //lastEntry = false;
         
         jump(entry, true);
      }
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
   
   //column_locked
   locked = false;
   if (prefs && prefs.preview_locked) {
      locked = prefs.preview_locked;
   }
   
   var css = ".entry-title-maximize {margin-left: 4px;padding-left:16px;width:14px;height:14px;background-repeat:no-repeat;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAMIAzwDxOt8TMwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kMERYGFfecphMAAAIYSURBVDjLjVK/a1NRGD3fffcleUlaSRpjiylBCTV0FTc3cXXRDkVB0bGDUnRxqCB2VKE4qCDSwcGt/4G66GBBpEOt1RolsTHBJLT58X7ez6H58fLU6lk+Lufe75zvfJewD0zbm9nYtuYsmzUiH8EACBg1hEP4B9qme3t1vTUPIBbkdEmr0rS8Ez9qzknFTK6rmIgAIijFGDugy2hELhQrZn6rZJ3b0x2AAMhPRXOxtuOeZuYBQQRB+JrLGHd2Wu7jdx9bM3+zKk1bxSZS+kouYywFFGqVhnPmw5fOeSKAAaaAAwCQABDWRZ2IXvQzYhb1pntvo9C56rNLg/j6FeJPthq77t21zfZlZoAIHOSz4+EVAC0G6LcG1Ya9uPa5fQ3ASHd1PUUAcKePGMuHD4XOHs/Hl0I6WXJY2Xn4frN9YS/Igc0ecpnI/eSofN3sqIXRmLzZtrwrwje3UarYKRBigVkZgJXPGo8mUqGnb9ebt75XbQcAomHtiRhsjjrTR6Oz6YR8TsTE3G9C+ayxfDChzwFIWDZPaVpgC0TQul0cpdR1Zqhq3Z1lwJmajDxIJ0PzXZfw5TFo4KsQQhSV517yPA6lk6HddEK/sd9XlwCgCRoKU2jSVkpdFEK0Avdd9n9ZAJIIXmHbOlat2888xV6PqNQdlH9aQ6+/lc04EY2QbzlyMh1+VShbp7ZKZg7/gbghXo6P6W9651+wUN+npzFYbAAAAABJRU5ErkJggg==);}";
   GM_addStyle(css);
   
   initCatchEntries(addPreviewButton, 'epreview');
   initResize(onResize);
   
	var keycode = getShortcutKey('preview', 'prview', prefs); //81 Shift+R
	keycode.fn = previewShortcut;
	initKey(keycode);
};
