/**
 * Google Reader - Colorful List View
 * @version  20110216
 * @date Wed, 16 Feb 2011 19:07:18 GMT 
 *
 * Colorizes the item headers in Google Reader list view and the entries in expanded view.
 *
 * Original author :
 * kepp
 * http://userscripts.org/scripts/show/8782
 */
GRP.colorful = function(prefs, langs, ID, SL, lang){    
    const BASE_CSS = "#entries.list .entry-likers,#entries.list .collapsed .entry-source-title,#entries.list .collapsed .entry-secondary,#entries.list .collapsed .entry-title{background-color:transparent!important}.gm-color-lv .collapsed /* list view headers */{border-color:transparent!important}#entries.list.gm-color-lv #current-entry .collapsed{border:2px solid #8181DC!important}#entries.list.gm-color-lv #current-entry.expanded .collapsed{border-bottom-color:transparent!important;border-width:2px 0!important}#entries .entry{padding:5px 0}#entries.list .collapsed{line-height:2.4ex!important}";
	
    // controls and applies colors
    var theme = 
    {
        colors: {}, 
        prefs: "", 
        bgColor: null, 
        textColor: null,
        styles: null, 
        entries: null, 
	    baseCss: "#entries .entry-likers,#entries.list .collapsed .entry-source-title,#entries.list .collapsed .entry-secondary," +
	      "#entries.list .collapsed .entry-title {background-color: transparent !important;}" +
	      "#entries.cards.gm-color-ev .card-actions {background-color: rgba( 0, 0, 0, 0.05 ) !important;}" +
	      "#entries.cards.gm-color-ev .card-bottom {border-color: rgba( 0, 0, 0, 0.1 ) !important;}" +
	      "#entries.cards.gm-color-ev .card {padding-right: 1em;}" +
	      "#entries.cards.gm-color-ev .card-bottom {margin-bottom: 1ex !important;}" +
	      "#current-entry {box-shadow: 0 0 1px 2px rgb(22, 88, 120); z-index: 99999999;}",
        
        init: function(chrome, settings){
            //this.styles = GM_addStyle("", 'colorful');
            this.prefs = settings; //settings.getColorPrefs();
            
            /*var setup = this.setup, thm = this;
            var set = function(){
                setup.call(thm);
                chrome.removeEventListener("DOMNodeInserted", set, false);
            };
            chrome.addEventListener("DOMNodeInserted", set, false);*/
           
            GM_addStyle(this.baseCss);
           
            this.setup.call(this);
        },
        
        setup: function(){ 
            this.initConfig(); 
            var entries = get_id("entries");
			
            if (entries) {
                addClass(entries, this.prefs);
                entries.addEventListener("DOMNodeInserted", bind(this.processEntries, this), false);
				this.processEntries();
            }
			
			if (prefs.colorful_tree){
				var root = get_id('sub-tree');
				addClass(root, this.prefs);
				initCatchSidebars(bind(this.processNodes, this), 'sidebar-colorful');
			}
        },
        
        // determine what color theme to use by looking at the header colors
        initConfig: function(){
            var bg, color;
			var header = get_id('viewer-container');
			if (prefs.colorful_usebasecolor) {
				bg = (prefs.colorful_background||'').toLowerCase();
			} else {
				bg = getComputedStyle(header, null).getPropertyValue("background-color");
			}
            
            bg = this.rgbToHsl(bg);
            
            // a min saturation & lightness is needed to distinguish colors
            // note: value is further subtracted from this for read items
            /*this.bgColor =  {
                hue: bg[0],
                sat: Math.max(bg[1], 35),
                lt: Math.max(bg[2], 32)
            };*/
            this.bgColor = { hue: bg[ 0 ],
                       sat: Math.max( Math.min( bg[ 1 ], 73 ), 50 ),
                       lt: Math.max( Math.min( bg[ 2 ], 85 ), 10 ) };
            
			if (prefs.colorful_usebasecolor) {
				color = (prefs.colorful_color||'').toLowerCase();
			} else {
				color = getComputedStyle(header, null).getPropertyValue("color");
			}
            
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
            var hue = this.textColor.hue,
             sat = this.textColor.sat,
             lt = this.textColor.lt,
             range = this.bgColor.lt - lt,
             css = "  color: hsl(" + hue + "," + sat + "%, ";
            //var theCss = getBackColorCss(hue, sat, lt, range);
            
            var theCss = "#entries .collapsed .entry-title {" +  css + lt + "% ) !important;}" +
        "#entries.list .collapsed .entry-main .entry-source-title {" +        css + ( lt + range*0.42 ) + "% ) !important;}" +
        ".entry .entry-author, .entry .entry-date {" +        css + ( lt + range*0.50 ) + "% ) !important;}" +
        "#entries.list .collapsed .entry-secondary {" +        css + ( lt + range*0.59 ) + "% ) !important;}" +
        "#entries .item-body {" +  css + lt + "% ) !important;}";
        
			GM_addStyle(theCss, 'rpe_'+ID);
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
				".//div[contains(@class,'name-text')]",
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
        
	        var css = this.getLvCss(title, hsl) + this.getEvCss(title, hsl) ; //+ this.getEfCss(title, hsl) + this.getCvCss(title, hsl);
	        if (prefs.colorful_tree) {
	            css += this.getTreeCss(title, hsl);
	        }
	        return css;
        },
        
        getLvCss: function( ttl, hsl ) { // css for coloring items in list view
      // this selector should be take priority over any other selector
      var us = "#entries.gm-color-lv.gm-color-ui div[ colored='" + ttl + "' ]",
          rs = "#entries.gm-color-lv.gm-color-ri div[ colored='" + ttl + "' ]";

      return "" +
        us + ":not( .read ) .collapsed {" + hsl.norm + "}" +
        us + ":not( .read ):hover .collapsed {" + hsl.hover + "}" +

        rs + ".read .collapsed { /* override unread item colors */" +
             hsl.read + "}" +
        rs + ".read:hover .collapsed { /* override unread item colors */ " +
             hsl.readhvr + "}" +

        "#entries.gm-color-lv.gm-color-ui:not( .gm-color-ri ) .read .collapsed," +
        "#entries.gm-color-lv.gm-color-ri:not( .gm-color-ui ) :not( .read ) .collapsed {" +
        "  /* override current entry colors */" +
        "  background-color: white !important;" +
        "}";
    },

    // css for coloring expanded view item bodies
    getEvCss: function( ttl, hsl ) {
      var us = "#entries.gm-color-ev.gm-color-ui div[ colored='" + ttl + "' ]",
          rs = "#entries.gm-color-ev.gm-color-ri div[ colored='" + ttl + "' ]";

      return "" +
        us + " .card," +
        /* .ccard, .t2, .t3 used for Opera expanded view */
        us + " .ccard," +
        us + " .t2," +
        us + " .t3 {" + hsl.norm + "}" +

        us + ":hover .card," +
        us + ":hover .ccard," +
        us + ":hover .t2," +
        us + ":hover .t3 {" + hsl.hover + "}" +

        us + ".read .card," +
        us + ".read .ccard," +
        us + ".read .t2," +
        us + ".read .t3," +
        us + ".read:hover .card," +
        us + ".read:hover .ccard," +
        us + ".read:hover .t2," +
        us + ".read:hover .t3 { /* force no color for read items */ " +
             "background-color: white !important; }" +

        rs + ".read .card," +
        rs + ".read .ccard," +
        rs + ".read .t2," +
        rs + ".read .t3 { /* override unread item colors */ " +
             hsl.read + "}" +

        rs + ".read:hover .card," +
        rs + ".read:hover .ccard," +
        rs + ".read:hover .t2," +
        rs + ".read:hover .t3 { /* override unread item colors */ " +
             hsl.readhvr + "}";
    },
        
       
		getTreeCss: function(ttl, hsl){
            var us = "#sub-tree li[ colored='" + ttl + "' ]";
	        return us + " {" + hsl.norm +"}" +
	        us + ":hover{" + hsl.hover + "}";
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
    
	GM_getValue("colorful_settings", {}, function(o){
			var a = [];
			o=o||{};
            a.push(o['gm-color-lv']||"gm-color-lv");
            a.push(o['gm-color-ev']||"gm-color-ev");
            //a.push(o['gm-color-ef']||"");
            //a.push(o['gm-color-cv']||"");
            a.push(o['gm-color-ui']||"gm-color-ui");
            a.push(o['gm-color-ri']||"gm-color-ri");
			var settings=a.join(" ");
			
	    var chrome = get_id("chrome");
	    theme.init(chrome, settings);	
	});

    
};
