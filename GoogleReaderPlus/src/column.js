/**
 * Multi column layout
 * @version  0.1
 * @date 2010
 *
 * Display entry using multi colum layout
 *
 */
GRP.column = function(prefs, langs){
    var SL = langs.column;
    var locked = prefs.column_locked;
    var cols = 3;
    var maxcolumns = 6; //between 1 and 6
    var entries = get_id('entries');
	var rx= getRegex(prefs.column_filter);
    
    function addButton(el, entry, mode){
        var text = SL.text + formatShortcut('column', 'columns', prefs); //[c]
        addBottomLink(el, SL.keyword, text, 'btn-column', true, columnize, locked, entry, mode);
    }
    
    function addKey(){
        onKey('btn-column', columnize);
    }
    
    function columnize(btn, entry, lcked, e){
        var locked = (lcked && (typeof e === "undefined"));
		if (locked && filterEntry(entry, rx)){
			//Regex filtered
			return false;
		}
		
		var active = isActive(btn, entry, 'columnize', locked);
        
        var body = getBody(entry);
        var hpage = 0;
        var divoriginal = body.firstChild;
        var divwrap = getFirstElementByClassName(entry,  'wrap-container');//div
        
		if (divwrap && active && prefs.column_pagebreak) {
			//already exists but height changed
			var h = divwrap.firstChild.style['max-height'];
			if (h) {
				var oldHeight = parseInt(h.replace('px', ''), 10);
				hpage = getHeightEntries();
				if (hpage !== oldHeight) {
					divwrap.parentNode.removeChild(divwrap);
					divwrap = null;
				}
			}
		}
		
        if (!divwrap) {			
			divoriginal.className = "column-original";
            divwrap = document.createElement('div');
            divwrap.visibility = "hidden";
            divwrap.className = "wrap-container";

            //check height
            if (prefs.column_pagebreak) {
                hpage = getHeightEntries();
                /*
                 if (prefs && prefs.column_maxcolumns) {
                 var colsCount = Math.ceil(divoriginal.clientHeight / hpage);
                 if (colsCount < maxcolumns) {
                 divwrap.style['-webkit-column-count'] = colsCount;
                 }
                 }*/
            }
            //first append to monitor scrollwidth
            body.appendChild(divwrap);
            
            var ecw = entries.clientWidth;
            var div = createDiv(divwrap, hpage);
            var paras = divoriginal.childNodes;
            var length = paras.length;
            var cwh = getColumWidth();

            if (paras && length > 0) {
                var top, h, tag, line, offset;
                for (var i = 0; i < length; i++) {
                    tag = paras[i].nodeName;
                    line = '';
                    if (tag === "P") {
                        line = paras[i].innerHTML + '<br/>';
                    } else if (tag === "#text") {
                        line = paras[i].textContent;//nodeValue
                    } else if (tag === "IFRAME") {
                        //ignore iframe
                    } else if (tag === "OBJECT" || tag === "EMBED") {
                        line = paras[i].innerHTML;
                    } else if (tag === "DIV") {
                        line = paras[i].innerHTML;
                    } else {
                        line = paras[i].outerHTML;
                    }
                    
                    //line = line.replace(/<br\/?>/, '');
					line = line.trim();
                    if (line !== '') {
                        var para = document.createElement('p');
                        para.innerHTML = line;
                        div.appendChild(para);
                        
                        //fix it up if width > page.width
                        if (prefs.column_pagebreak && div.scrollWidth > ecw) {
                            //new div
                            var newdiv = createDiv(divwrap, hpage);
                            newdiv.appendChild(para);
                            div = newdiv;
                        }
                    }
                }
                
            }
            
            divwrap.visibility = "visible";
        }
        // toggle to correct body
        divoriginal.style.display = (active) ? "none" : "";
        divwrap.style.display = (active) ? "" : "none";
        
        if (!locked) {
            jump(entry, true);
        }
    }
    
    function createDiv(parent, hpage){
        var div = document.createElement('div');
        div.className = 'column-wrapped';
        if (prefs.column_pagebreak) {
            if (hpage > 0) {
                div.style['max-height'] = hpage + 'px';
            }
        }
        parent.appendChild(div);
        return div;
    }
    
    // clean up
    function cleanHtml(txt){
        return txt.replace(/<iframe.*?>?.*?>/, '').replace(/<embed.*?>?.*?>/, '').replace(/<object.*?>?.*?>/, '');
    }
    
    //column_count
    if (prefs && prefs.column_count) {
        var c = parseInt(prefs.column_count, 10);
        cols = Math.max(0, c);
    }
    //maxi columns enable to fit from 1 to n columns automatically
    if (prefs && prefs.column_maxcolumns) {
        var d = parseInt(prefs.column_maxcolumns, 10);
        maxcolumns = Math.max(1, Math.min(6, d));
    }
    
    function getContainer(entry){
        var cwh = 300;
        var cw = getFirstElementByClassName(entry,  'entry-main');//div
        if (!cw) {
            cw = entries; //get_id('entries');
        }
        return cw;
    }
    
	var cw = getContainer(entries);
    function getColumWidth(){
        var cwh = 300;
        //var entries = get_id('entries');
        //var cw = getContainer(entries);
        if (cw) {
            cwh = Math.max(Math.round(cw.clientWidth / cols), 50);
        }
        return cwh;
    }
    var cwh = getColumWidth();
    
    var lastcwh = -1;
    function fitall(){
        //Images
        var cwh = getColumWidth();
        if (lastcwh !== cwh) {
            var css = '.column-wrapped img{max-width:' + cwh + 'px !important;height: auto !important;}';
            GM_addStyle(css, 'column_css_imgfit');
            
            //videos
            fitVideos(cwh);
            lastcwh = cwh;
        }
    }
    
    function fitVideos(width){
        var objects = entries.querySelectorAll(".column-wrapped OBJECT,.column-wrapped EMBED");
        for (var i = 0, len = objects.length; i < len; i++) {
            var o = objects[i];
            if (!o.w) {
                o.w = o.width;
                o.h = o.height;
            }
            o.width = width;
            o.height = Math.round(o.h * width / o.w);
        }
    }
    
    window.addEventListener('resize', function(e){
        fitall();
    }, false);
    window.setInterval(function(){
        fitall();
    }, 2000);
    fitall();
    
    // copy of fixwidth to fit content
    GM_addStyle(".entry .entry-body, .entry .entry-title{ display: inline !important; max-width: 100% !important; }");
    
    var css = ".column-wrapped{ text-align: justify; -webkit-column-count: " + cols + "; -webkit-column-gap: 1.5em; -webkit-column-rule: 1px solid #dedede;overflow:visible;padding-bottom:4px;border-bottom:1px solid #dedede;} ";
    //css += '.column-wrapped p{page-break-after:auto;}';
    GM_addStyle(css);
    
    
    registerFeature(addButton, 'ecolumn');
    var keycode = getShortcutKey('column', 'columns', prefs); //67 c
    keycode.fn = addKey;
    initKey(keycode);

};
