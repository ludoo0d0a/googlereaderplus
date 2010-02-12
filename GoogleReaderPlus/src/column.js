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
    var locked = false;
    var cols = 3;
    var maxcolumns = 6; //between 1 and 6
    prefs.column_auto = true;
    var entries = get_id('entries');
    
    function addButton(el, entry, mode){
        var text = SL.text + formatShortcut('column', 'columns', prefs); //[c]
        addBottomLink(el, SL.keyword, text, 'btn-column', true, columnize, locked, entry, mode);
    }
    
    function addKey(){
        onKey('btn-column', columnize);
    }
    
    function columnize(btn, entry, locked){
        var active = isActive(btn, entry, 'columnize', locked);
        
        var body = getBody(entry);
        
        var divoriginal = body.firstChild;
        var divwrap = getFirstElementMatchingClassName(entry, 'div', 'column-wrapped');
        
        if (!divwrap) {
            divoriginal.className = "column-original";
            divwrap = document.createElement('div');
            //divwrap.style.display = "none";
			divwrap.visibility = "hidden";
            //divwrap.className = "column-wrapped";
            divwrap.className = "wrap-container";
            
            // var paras = divoriginal.querySelectorAll("p");
            
            //check height
            var pages = 0;
            var hpage = 0;
            if (prefs.column_auto) {
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
            //compute using real time height (img.height (400px default), p=12...)
            //var elsPage = (pages > 0) ? (length / pages) : length;
            if (paras && length > 0) {
                var top, h, tag, line, offset;
                for (var i = 0; i < length; i++) {
                    tag = paras[i].nodeName;
                    line = '';
                    if (tag === "P") {
                        line = paras[i].innerHTML + '<br/>';
                    } else if (tag === "#text") {
                        line = paras[i].textContent;//nodeValue
                    } else if (tag === "IFRAME" || tag === "OBJECT" || tag === "EMBED") {
                        //TODO: add a resized video
						//line = resizeVideo(paras[i].innerHTML, cwh);
						line = paras[i].innerHTML;
                    } else if (tag === "DIV") {
                        line = paras[i].innerHTML;
                    } else {
                        line = paras[i].outerHTML;
                    }
					
					var para = document.createElement('p');
                	para.innerHTML = line;
                	div.appendChild(para);
                	
                	//fix it up if width > page.width
	                if (prefs.column_auto && div.scrollWidth > ecw) {
	                    //new div
	                    var newdiv = createDiv(divwrap, hpage);
            			newdiv.appendChild(para);
	                    div = newdiv;
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
	
	function resizeVideo(html, width){
		var rew =  /WIDTH\w*=\w*["']?(\d+)["']?/i;
		var reh =  /HEIGHT\w*=\w*["']?(\d+)["']?/i;
		var m = rew.exec(html);
		var vwidth = m[1];
		m = reh.exec(html);
		var vheight = m[1];
		return html.replace(rew, 'WIDTH="'+width+'"').replace(reh, 'HEIGHT="'+(vheight * width / vwidth)+'"');
	}
	
    function createDiv(parent, hpage){
        var div = document.createElement('div');
        div.className = 'column-wrapped';
        if (prefs.column_auto) {
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
	//column_auto
    //prefs.column_auto
    //column_locked
    if (prefs && prefs.column_locked) {
        locked = prefs.column_locked;
    }
    
    function getContainer(entry){
        var cwh = 300;
        var cw = getFirstElementMatchingClassName(entry, 'div', 'entry-main');
        if (!cw) {
            cw = entries; //get_id('entries');
        }
        return cw;
    }
    
    function getColumWidth(){
        var cwh = 300;
        //var entries = get_id('entries');
        var cw = getContainer(entries);
        if (cw) {
            cwh = Math.max(Math.round(cw.clientWidth / cols), 50);
        }
        return cwh;
    }
    var cwh = getColumWidth();
    
    // copy of fixwidth
    GM_addStyle(".entry .entry-body, .entry .entry-title{ display: inline !important; max-width: 100% !important; }");
    
    var css = ".column-wrapped{ text-align: justify; -webkit-column-count: " + cols + "; -webkit-column-gap: 1.5em; -webkit-column-rule: 1px solid #dedede;overflow:visible;padding-bottom:4px;border-bottom:1px solid #dedede;} ";
    css += '.column-wrapped img{max-width:' + cwh + 'px !important;height: auto !important;}';
    //css += '.column-wrapped p{page-break-after:auto;}';
    GM_addStyle(css);
    
    
    initCatchEntries(addButton, 'ecolumn');
    var keycode = getShortcutKey('column', 'columns', prefs); //67 c
    keycode.fn = addKey;
    initKey(keycode);
    
};
