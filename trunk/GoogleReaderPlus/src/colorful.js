/**
 * Google Reader - Colorful List View
 * @version  1.6
 * @date 2010-02-27 
 *
 * Colorizes the item headers in Google Reader list view and the entries in expanded view.
 *
 * Original author :
 * kepp
 * http://userscripts.org/scripts/show/8782
 */
GRP.colorful = function(prefs, langs){
    var STRINGS = langs.colorful;
    
    // CSS to allow items to be colored
    const BASE_CSS = "#entries.list .entry-likers,#entries.list .collapsed .entry-source-title,#entries.list .collapsed .entry-secondary,#entries.list .collapsed .entry-title{background-color:transparent!important}.gm-color-lv .collapsed /* list view headers */{border-color:transparent!important}#entries.list.gm-color-lv #current-entry .collapsed{border:2px solid #8181DC!important}#entries.list.gm-color-lv #current-entry.expanded .collapsed{border-bottom-color:transparent!important;border-width:2px 0!important}#entries .entry{padding:5px 0}#entries.list .collapsed{line-height:2.4ex!important}";
    
    // user interface for script settings added on settings page
    var settings = 
    {
        timeoutID: 0,
        entries: null,
        
        init: function(){ // insert page color options into the settings page
            // ascend out of iframe
            this.entries = frameElement.ownerDocument.getElementById("entries");
            //var sect = this.addPrefs();
        },
        /*
        addPrefs: function(){
            var sect = document.createElement("div");
            sect.className = "extra";
            
            // two column list
            sect.innerHTML = "<div class=\"extra-header\">Colors</div>" +
            STRINGS.color +
            "<div style=\"width: 30em;" +
            "margin: 0pt 0pt 1em 1em;\">" +
            "<ul style=\"list-style-type: none; padding-left: 0;" +
            "float: right;\">" +
            "</ul>" +
            "<ul style=\"list-style-type: none;" +
            "padding-left: 0;\">" +
            "</ul></div>";
            
            get_id("setting-extras-body").appendChild(sect);
            
            var lists = sect.getElementsByTagName("ul");
            var list1 = lists[1], list2 = lists[0];
            
            var tc = bind(this.toggleColors, this);
            
            this.addColorPref(list2, "gm-color-ri", STRINGS.read, tc);
            this.addColorPref(list2, "gm-color-ui", STRINGS.unread, tc);
            this.addColorPref(list1, "gm-color-lv", STRINGS.list, tc);
            this.addColorPref(list1, "gm-color-ev", STRINGS.expanded, tc);
            this.addColorPref(list1, "gm-color-ef", STRINGS.frame, tc, 0);
            this.addColorPref(list1, "gm-color-cv", STRINGS.comment, tc, 0);
            
            return sect;
        },
        
        addColorPref: function(list, id, text, handler, def){
            var pref = document.createElement("li");
            var selected = GM_getValue(id, (typeof def == "undefined") ? 1 : def);
            pref.innerHTML = "<label><input id=\"" + id + "\" type=\"checkbox\"/>" +
            text +
            "</label>";
            
            // just setting the "checked" attribute doesn't seem to work in Chrome
            // I should figure out why later
            var chk = pref.firstChild.firstChild;
            chk.checked = (selected) ? true : false;
            list.appendChild(pref);
            chk.addEventListener("change", handler, false);
        },
        */
        toggleColors: function(event){
            var id = event.target.id, curr = event.target.checked;
            var msg, newPref = "", cName = "";
            
            if (curr) {
                newPref = id;
                cName = id + " ";
                msg = "<em>" + STRINGS.msgWill + "</em>";
            } else {
                msg = "<em>" + STRINGS.msgWillNot + "</em>";
            }
            
            var re = new RegExp(id + " |^", "g");
            this.entries.className = this.entries.className.replace(re, cName);
            GM_setValue(id, newPref);
            this.setMessage(id, msg);
        },
        
        setMessage: function(id, msg){
            clearTimeout(this.timeoutID);
            var inner = getElementValue("id( 'message-area-inner' )");
            var outer = getElementValue("id( 'message-area-outer' )");
            
            // get the message string to insert into the page
            var type = (id == "gm-color-lv") ? STRINGS.msgList : (id == "gm-color-ev") ? STRINGS.msgExpanded : (id == "gm-color-ef") ? STRINGS.msgFrame : (id == "gm-color-ui") ? STRINGS.msgUnread : (id == "gm-color-ri") ? STRINGS.msgRead : (id == "gm-color-cv") ? STRINGS.msgComment : STRINGS.msgUndef;
            
            var newMsg = type + msg + STRINGS.msgColored;
            inner.innerHTML = newMsg; // set the message
            // force display and set position and width
            outer.setAttribute("style", "display: block !important;" +
            "margin-left:" +
            Math.round(inner.offsetWidth / -2) +
            "px;" +
            "width:" +
            (inner.offsetWidth + 10) +
            "px;");
            outer.className = "message-area info-message";
            
            this.timeoutID = setTimeout(function(){
                outer.style.display = "";
                
                // test if the same message is still showing.
                // force lowercase to handle any (tag name) capitalization change
                if (inner.innerHTML.toLowerCase() == newMsg.toLowerCase()) {
                    outer.className = outer.className.replace(/ hidden|$/, " hidden");
                }
                
            }, 7 * 1000);
        },
        
        getColorPrefs: function(){
            var prefs = "";
            
            prefs += GM_getValue("gm-color-lv", "gm-color-lv") + " ";
            prefs += GM_getValue("gm-color-ev", "gm-color-ev") + " ";
            prefs += GM_getValue("gm-color-ef", "") + " ";
            prefs += GM_getValue("gm-color-cv", "") + " ";
            
            prefs += GM_getValue("gm-color-ui", "gm-color-ui") + " ";
            prefs += GM_getValue("gm-color-ri", "gm-color-ri") + " ";
            
            return prefs;
        }
    };
	
	
	
	
    // controls and applies colors
    var theme = 
    {
        colors: {}, // used to store the calculated colors
        prefs: "", // pref settings
        bgColor: null, // theme settings
        textColor: null,
        styles: null, // dom node colorizing css will be injected into
        init: function(chrome){
            //this.styles = GM_addStyle("", 'colorful');
            this.prefs = settings.getColorPrefs();
            
            var setup = this.setup, thm = this;
            var set = function(){
                setup.call(thm);
                chrome.removeEventListener("DOMNodeInserted", set, false);
            };
            chrome.addEventListener("DOMNodeInserted", set, false);
        },
        
        setup: function(){ // initial setup and toggling of settings
            this.initConfig(); // put this in here so theme scripts run first
            var entries = get_id("entries");
            
            if (entries) {
                addClass(entries, this.prefs);
                entries.addEventListener("DOMNodeInserted", bind(this.processEntries, this), false);
				this.processEntries();
            }
			/*
			if (prefs.colorful_tree){
				var root = get_id("sub-tree");
				addClass(root, this.prefs);
				initCatchSidebars(bind(this.processNodes, this), 'sidebar-colorful');
			}*/
        },
        
        // determine what color theme to use by looking at the header colors
        initConfig: function(){
            var header = get_id("chrome-header");
            var bg = getComputedStyle(header, null).getPropertyValue("background-color");
            
            bg = this.rgbToHsl(bg);
            
            // a min saturation & lightness is needed to distinguish colors
            // note: value is further subtracted from this for read items
            this.bgColor = 
            {
                hue: bg[0],
                sat: Math.max(bg[1], 35),
                lt: Math.max(bg[2], 32)
            };
            
            var color = getComputedStyle(header, null).getPropertyValue("color");
            color = this.rgbToHsl(color);
            this.textColor = 
            {
                hue: color[0],
                sat: color[1],
                lt: color[2]
            };
            this.setTextColor();
        },
        
        rgbToHsl: function(color){ // calculate hsl from rgb css color string
            var hue = 0, sat = 0, lt;
            
            var rgb = this.getRgb(color);
            var max = Math.max.apply(Math, rgb);
            var min = Math.min.apply(Math, rgb);
            var chroma = max - min;
            
            var index = rgb.indexOf(max);
            rgb.splice(index, 1);
            
            lt = (max + min) / 2;
            if (chroma) {
                sat = (lt > 0.5) ? (max - min) / (2 - (max + min)) : (max - min) / (max + min);
                hue = 60 * ((rgb[0] - rgb[1]) / (max - min) + index * 2);
            }
            
            return [hue, sat * 100, lt * 100];
        },
        
        getRgb: function(color){
            var rgb;
            
            if ((rgb = /(\d+), (\d+), (\d+)/.exec(color))) {
                rgb = rgb.slice(1);
                return [rgb[0] / 255, rgb[1] / 255, rgb[2] / 255];
            }
            
            // Opera return a hex value, so convert hex to decimal
            if ((rgb = /#(......)/.exec(color))) {
                rgb = parseInt(rgb[1], 16);
                var red = rgb >> 16;
                var grn = (rgb - (red << 16)) >> 8;
                var blu = rgb - (red << 16) - (grn << 8);
                return [red / 255, grn / 255, blu / 255];
            }
            
            return [1, 0, 0];
        },
        
        setTextColor: function(){
            var hue = this.textColor.hue;
            var sat = this.textColor.sat;
            var lt = this.textColor.lt;
            
            // default color lightnesses:
            // bg lt: 85.3
            // color lt: 0
            
            // text lightnesses are set to values in the range between title text and
            // background color lightnesses
            var range = this.bgColor.lt - lt;
            
            var css = "  color: hsl(" + hue + "," + sat + "%, ";
            css += ("" +
            "#entries .collapsed .entry-title {" +
            css +
            lt +
            "% ) !important;" + // 000000 <- default color
            "}" +
            "#entries.list .collapsed .entry-main .entry-source-title {" +
            css +
            (lt + range * 0.42) +
            "% ) !important;" + // 555555
            "}" +
            ".entry .entry-author," +
            ".entry-comments .comment-time, .entry .entry-date {" +
            css +
            (lt + range * 0.50) +
            "% ) !important;" + // 666666
            "}" +
            "#entries.list .collapsed .entry-secondary {" +
            css +
            (lt + range * 0.59) +
            "% ) !important;" + // 777777
            "}" +
            // "a, a:visited, .link {" + // shouldn't need to mess with link color
            // css + lt + "% ) !important;" + // 2244BB
            // "}" + 
            "#entries .item-body {" +
            css +
            lt +
            "% ) !important;" + // 000000
            "}");
			
			//this.styles.innerText+=css;
			GM_addStyle(css, 'colorful');
        },
        
        // inject color css into the page
        processEntries: function(){
			this.process(this.bgColor, this.styles, 
				"id('entries')/div[contains(@class,'entry')][not(@colored)]", 
				".//*[ contains(concat( ' ', normalize-space( @class ), ' '),' entry-source-title ' ) ]",
				this);
		},
		processNodes: function(e){
			this.process(this.bgColor, this.styles, 
				"id('sub-tree')//li[contains(@class, 'sub')][contains(@class, 'unread')][not(@colored)]",
				".//span[contains(@class,'name')]/@title",
				 this);
	        
        },
		process: function(bgColor, styles, xpath, xpathText, thm){
            // pick up all uncolored entries, including ones missed previously
            var nocolor = getElements(xpath);
			if (!nocolor.length) {
                return;
            }
            nocolor.forEach(function(nc){
				thm.setColor(styles, bgColor, xpathText, nc);
            });
		},
			
        setColor: function(styles, bgColor, xpathText, nc){
            // source in header is: "<a>" for expanded/comment view
            //                      "<span>" for list view
            // if "Shared by [xxx]" is there this will grab that
            // search for a node that has 'entry-source-title' class name
            var src = getElementValue(xpathText, nc);
            src = src.textContent.replace(/\s+\(\d+\)$/, "").replace(/\W/g, "-");
			
			//console.log(src);
			
            nc.setAttribute("colored", src);
            if (typeof this.colors[src] == "undefined") {
				//console.log('CSS for '+src);
				//styles.innerText += this.getColorCss(src, bgColor);
				GM_addStyle(this.getColorCss(src, bgColor), 'color_'+src)
            }
        },
        
        getColorCss: function(title, bgColor){ // generate css to color items
            var hue = this.getHue(title);
            var sat = bgColor.sat;
            var lt = bgColor.lt;
            
            // set direction entry lightness is modified on read/hover
            var dir = (lt > 50) ? 1 : -1;
            
            var hsl = 
            {
                norm: "background-color: hsl(" +
                hue +
                "," +
                (sat + 7) +
                "%," +
                (lt - dir * 5) +
                "% ) !important;",
                hover: "background-color: hsl(" +
                hue +
                "," +
                (sat + 27) +
                "%, " +
                lt +
                "% ) !important;",
                read: "background-color: hsl(" +
                hue +
                "," +
                (sat - 13) +
                "%," +
                (lt + dir * 5) +
                "% ) !important;",
                readhvr: "background-color: hsl(" +
                hue +
                "," +
                (sat + 7) +
                "%," +
                (lt + dir * 10) +
                "% ) !important;"
            };
        
	        var css = this.getLvCss(title, hsl) + this.getEvCss(title, hsl) + this.getEfCss(title, hsl) + this.getCvCss(title, hsl);
	        /*if (prefs.colorful_tree) {
	            css = this.getTreeCss(title, hsl) + css;
	        }*/
	        return css;
        },
        
        getLvCss: function(ttl, hsl){ // css for coloring items in list view
            // this selector should be take priority over any other selector
            var us = "#entries.gm-color-lv.gm-color-ui div[ colored='" + ttl + "' ]";
            var rs = "#entries.gm-color-lv.gm-color-ri div[ colored='" + ttl + "' ]";
            
            return "" +
            us +
            " .collapsed {" +
            hsl.norm +
            "}" +
            us +
            ":hover .collapsed {" +
            hsl.hover +
            "}" +
            us +
            ".read .collapsed," +
            us +
            ".read:hover .collapsed { /* force no color for read items */ " +
            "background-color: white !important; }" +
            rs +
            ".read .collapsed { /* override unread item colors */" +
            hsl.read +
            "}" +
            rs +
            ".read:hover .collapsed { /* override unread item colors */ " +
            hsl.readhvr +
            "}";
        },
        
        // css for coloring expanded view item bodies
        getEvCss: function(ttl, hsl){
            var us = "#entries.gm-color-ev.gm-color-ui div[ colored='" + ttl + "' ]";
            var rs = "#entries.gm-color-ev.gm-color-ri div[ colored='" + ttl + "' ]";
            
            return "" +
            us +
            " .card," +
            /* .ccard, .t2, .t3 used for Opera expanded view */
            us +
            " .ccard," +
            us +
            " .t2," +
            us +
            " .t3 {" +
            hsl.norm +
            "}" +
            
            us +
            ":hover .card," +
            us +
            ":hover .ccard," +
            us +
            ":hover .t2," +
            us +
            ":hover .t3 {" +
            hsl.hover +
            "}" +
            
            us +
            ".read .card," +
            us +
            ".read .ccard," +
            us +
            ".read .t2," +
            us +
            ".read .t3," +
            us +
            ".read:hover .card," +
            us +
            ".read:hover .ccard," +
            us +
            ".read:hover .t2," +
            us +
            ".read:hover .t3 { /* force no color for read items */ " +
            "background-color: white !important; }" +
            
            rs +
            ".read .card," +
            rs +
            ".read .ccard," +
            rs +
            ".read .t2," +
            rs +
            ".read .t3 { /* override unread item colors */ " +
            hsl.read +
            "}" +
            
            rs +
            ".read:hover .card," +
            rs +
            ".read:hover .ccard," +
            rs +
            ".read:hover .t2," +
            rs +
            ".read:hover .t3 { /* override unread item colors */ " +
            hsl.readhvr +
            "}";
        },
        
        // css for coloring expanded view item frames
        getEfCss: function(ttl, hsl){
            var us = "#entries.gm-color-ef.gm-color-ui div[ colored='" + ttl + "' ]";
            var rs = "#entries.gm-color-ef.gm-color-ri div[ colored='" + ttl + "' ]";
            
            return "" +
            us +
            " {" +
            hsl.norm +
            "}" +
            us +
            ":hover {" +
            hsl.hover +
            "}" +
            us +
            ".read," +
            us +
            ".read:hover { /* force no color for read items */ " +
            "background-color: #F3F5FC !important; }" +
            rs +
            ".read { /* override unread item colors */ " +
            hsl.read +
            "}" +
            rs +
            ".read:hover { /* override unread item colors */ " +
            hsl.readhvr +
            "}";
        },
        
        getCvCss: function(ttl, hsl){
            var us = "#entries.gm-color-cv.gm-color-ui div[ colored='" + ttl + "' ]";
            var rs = "#entries.gm-color-cv.gm-color-ri div[ colored='" + ttl + "' ]";
            
            // comment view doesn't have read/unread
            return "" +
            us +
            " .comment-entry {" +
            hsl.norm +
            "}" +
            us +
            ":hover .comment-entry {" +
            hsl.hover +
            "}" +
            us +
            ".read .comment-entry," +
            us +
            ".read:hover .comment-entry { /* force no color for read items */ " +
            "background-color: white !important; }" +
            rs +
            ".read .comment-entry { /* override unread item colors */ " +
            hsl.read +
            "}" +
            rs +
            ".read:hover .comment-entry { /* override unread item colors */ " +
            hsl.readhvr +
            "}";
        },

		getTreeCss: function(ttl, hsl){
            var us = "#sub-tree li[ colored='" + ttl + "' ]";
			
	        return us + " {" + hsl.norm +"}" +
	        us + "']:hover{" + hsl.hover + "}";
	    },
        
        getHue: function(title){ // calculate item hue
            var hue = 0;
            
            for (var i = 0, ch; (ch = title[i]); i++) {
                hue += ch.charCodeAt(0);
            }
            hue %= 360;
            
            this.colors[title] = hue;
            return hue;
        }
    };
    
    
    //=============================================================================
    
	
    var chrome = get_id("chrome");
    theme.init(chrome);

    GM_addStyle(BASE_CSS);
};
