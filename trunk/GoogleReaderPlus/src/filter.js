/**
 * Google Reader Filter
 * @version  0.6
 * @date 2009-08-14
 *
 * Filters duplicated entries and unwanted content or highlight chosen content based on keywords (with regex support).
 *
 * Original author :
 * Elad Ossadon (http://twitter.com/elado | http://www.devign.co.il | elado7@gmail.com)
 * http://userscripts.org/scripts/show/23671
 *
 */
GRP.filter = function(prefs, langs){
    var SL = langs.filter;
    
    function findPosition(element){
        var point = 
        {
            x: 0,
            y: 0
        };
        var parent = element;
        while (parent) {
            point.x += parent.offsetLeft;
            point.y += parent.offsetTop;
            parent = parent.offsetParent;
        }
        return point;
    }
    function trim(s){
        return s ? s.replace(/^\s+|\s+$/g, "") : "";
    }
    
    // preferences
    var _excludes = [];
    var _highlights = [];
    var _hideExcluds, _hideDuplicates, _preferHighlights;
    
    function init(){
        _excludes = JSON.parse(decodeURI("" + trim(GM_getValue("excludes", JSON.stringify(_excludes)))));
        _highlights = JSON.parse(decodeURI("" + trim(GM_getValue("highlights", JSON.stringify(_highlights)))));
        
        _hideExcluds = +GM_getValue("hideExcluds", 0);
        _hideDuplicates = +GM_getValue("hideDuplicates", 0);
        _preferHighlights = +GM_getValue("preferHighlights", 0);
        
        _excludes.sort(stringSort);
        _highlights.sort(stringSort);
        
        initInterface();
        
        setRegExps();
        
        if (_excludes.length || _highlights.length) {
            document.body.addEventListener("DOMNodeInserted", filterEntries, false);
        }
    }
    
    var _rxExcludes, _rxHighlights;
    
    function setRegExps(){
        if (_excludes.length) {
            _rxExcludes = getRegExp(_excludes);
        }
        if (_highlights.length) {
            _rxHighlights = getRegExp(_highlights);
        }
    }
    
    // (0) all until 0 (2f) , [0-9], above 9 (3a) to @ (40), [A-Z], above Z (5b)
    // to
    // a (60), [a-z], above z (7b) to european characters (bf), another unicode
    // character
    // this regex contains all symbols between 0-255 char codes, such as
    // ~!@#$%^&*()_+- etc in order to replace them with a single space
    // that way, both "hello: world!" and "hello.world" become "hello world" and
    // than regex in exclude/highlight stays simple
    // var
    // _minifyRx=/[\u0000-\u002f\u003a-\u0040\u005b-\u0060\u007b-\u00bf\u201d\u202b]+/g;
    var _minifyRx = /[~!@#$%^&*()_+-]+/g;
    
    function getRegExp(items){
        return new RegExp("(^| )(" + items.join("|") + ")($| )", "i");
    }
    
    function stringSort(a, b){
        if (a > b) {
            return 1;
        } else if (a < b) {
            return -1;
        } else {
            return 0;
        }
    }
    
    function initInterface(){
        GM_addStyle(".filter-settings-button,.filter-settings-window *,.filter-settings-entry-window *{font-family:verdana;font-size:11px;color:#000;} .filter-settings-window textarea,.filter-settings-entry-window input[type=text]{font-family:'courier new';border:1px solid #669CB9;} .filter-settings-button{cursor:pointer;background-color:#ADCBDA;padding:4px;position:absolute;top:30px;right:10px;z-index:1000;} .filter-settings-button:hover{background-color:#B46B8F;} .filter-settings-window{background-color:#ADCBDA;border:1px solid #669CB9;padding:4px;position:absolute;top:30px;right:10px;z-index:1000;} .filter-settings-window label.ta{float:left;width:250px;} .filter-settings-window textarea{height:300px;width:250px;} .filter-settings-entry-window{width:300px;background-color:#ADCBDA;border:1px solid #669CB9;font-size:11px;padding:4px;position:fixed;top:30px;right:10px;z-index:1000;} .filter-settings-entry-window input[type=text]{width:300px;} .filter-settings-window button,.filter-settings-entry-window button{margin-top:5px;margin-right:5px;background-color:#669CB9;color:#fff;font-size:11px;border:1px solid #000;}  .entry-filtered div.card-content *{color:#BCBCBC!important;} .entry-filtered:hover div.card-content *{color:#6A6A6A!important;} .entry-highlighted div.card-content{background-color:#E6EFCF!important;} .entry-highlighted div.card-content *{color:#000!important;background-color:#E6EFCF;} .entry-duplicate *{color:#C7D0D8!important;} .filter-configure-entry{background-color:#daa;color:#fff;padding:2px;cursor:pointer;position:absolute;top:0;right:90px}");
        
        var div = document.createElement("div");
        div.innerHTML = SL.settings;
        div.className = "filter-settings-button";
        div.addEventListener("click", openSettings, false);
        document.body.appendChild(div);
    }
    
    function formatListToTextArea(list){
        return list.join("\n").replace(/(\r?\n){2,}/, "");
    }
    
    // ui
    var _settings;
    var _excludeTextarea, _highlightTextarea;
    
    var _hideDuplicatesCheckbox, _hideExcludsCheckbox, _preferHighlightsCheckbox;
    
    function openSettings(){
        if (!_settings) {
            var settings = document.createElement("div");
            settings.className = "filter-settings-window";
            
            settings.innerHTML = "<label class='ta'>"+SL.excludes+"</label><label class='ta'>"+SL.highlights+"</label><div style='clear:both'></div>";
            
            var excludeTextarea = document.createElement("textarea");
            settings.appendChild(excludeTextarea);
            
            var highlightTextarea = document.createElement("textarea");
            settings.appendChild(highlightTextarea);
            
            settings.appendChild(document.createElement("br"));
            
            // hide dups
            var hideDuplicatesCheckbox = document.createElement("input");
            hideDuplicatesCheckbox.type = "checkbox";
            hideDuplicatesCheckbox.id = "grf-hideDuplicatesCheckbox";
            settings.appendChild(hideDuplicatesCheckbox);
            
            var hideDuplicatesLabel = document.createElement("label");
            hideDuplicatesLabel.innerHTML = SL.hideduplicates;
            hideDuplicatesLabel.setAttribute("for", "grf-hideDuplicates");
            settings.appendChild(hideDuplicatesLabel);
            hideDuplicatesLabel.style.paddingRight = "20px;";
            
            // hide excluded
            var hideExcludsCheckbox = document.createElement("input");
            hideExcludsCheckbox.id = "grf-hideExcludsCheckbox";
            hideExcludsCheckbox.type = "checkbox";
            settings.appendChild(hideExcludsCheckbox);
            
            var hideExcludsLabel = document.createElement("label");
            hideExcludsLabel.setAttribute("for", "grf-hideExcluds");
            hideExcludsLabel.innerHTML = SL.hideexcludes;
            settings.appendChild(hideExcludsLabel);
            
            // hide dups
            var preferHighlightsCheckbox = document.createElement("input");
            preferHighlightsCheckbox.type = "checkbox";
            preferHighlightsCheckbox.id = "grf-preferHighlightsCheckbox";
            settings.appendChild(preferHighlightsCheckbox);
            
            var preferHighlightsLabel = document.createElement("label");
            preferHighlightsLabel.innerHTML = SL.preferehighlights;
            preferHighlightsLabel.setAttribute("for", "grf-preferHighlights");
            settings.appendChild(preferHighlightsLabel);
            preferHighlightsLabel.style.paddingRight = "20px;";
            
            settings.appendChild(document.createElement("br"));
            
            // / buttons
            var update = document.createElement("button");
            update.textContent = SL.update;
            update.addEventListener("click", function(){
                saveSettings(excludeTextarea.value, highlightTextarea.value);
                settings.style.display = "none";
            }, false);
            settings.appendChild(update);
            
            var close = document.createElement("button");
            close.textContent = SL.close;
            close.addEventListener("click", function(){
                settings.style.display = "none";
            }, false);
            settings.appendChild(close);
            
            document.body.appendChild(settings);
            
            // globalize elements
            _settings = settings;
            _excludeTextarea = excludeTextarea;
            _highlightTextarea = highlightTextarea;
            _hideDuplicatesCheckbox = hideDuplicatesCheckbox;
            _hideExcludsCheckbox = hideExcludsCheckbox;
            _preferHighlightsCheckbox = preferHighlightsCheckbox;
        }
        _settings.style.display = "";
        _excludeTextarea.value = formatListToTextArea(_excludes);
        _highlightTextarea.value = formatListToTextArea(_highlights);
        
        _hideDuplicatesCheckbox.checked = !!_hideDuplicates;
        _hideExcludsCheckbox.checked = !!_hideExcluds;
        _preferHighlightsCheckbox.checked = !!_preferHighlights;
    }
    
    var _settingsForEntry, _settingsForEntryInput;
    
    function openSettingsForEntry(relative, title){
        if (!_settingsForEntry) {
            var settingsForEntry = document.createElement("div");
            settingsForEntry.className = "filter-settings-entry-window";
            settingsForEntry.innerHTML = "<label>"+SL.quickadd+"</label><div style='clear:both'></div>";
            
            var input = document.createElement("input");
            input.type = "text";
            settingsForEntry.appendChild(input);
            
            settingsForEntry.appendChild(document.createElement("br"));
            
            var excludeRadio = document.createElement("input");
            excludeRadio.name = "ex";
            excludeRadio.type = "radio";
            excludeRadio.value = 1;
            excludeRadio.checked = true;
            settingsForEntry.appendChild(excludeRadio);
            settingsForEntry.appendChild(document.createTextNode(SL.exclude));
            
            var highlightRadio = document.createElement("input");
            highlightRadio.name = "ex";
            highlightRadio.type = "radio";
            highlightRadio.value = 2;
            settingsForEntry.appendChild(highlightRadio);
            settingsForEntry.appendChild(document.createTextNode(SL.highlight));
            
            settingsForEntry.appendChild(document.createElement("br"));
            
            var update = document.createElement("button");
            update.textContent = SL.add;
            update.addEventListener("click", function(){
                var coll;
                coll = highlightRadio.checked ? _highlights : _excludes;
                coll.push(input.value);
                saveCollections();
                settingsForEntry.style.display = "none";
            }, false);
            settingsForEntry.appendChild(update);
            
            var close = document.createElement("button");
            close.textContent = SL.close;
            close.addEventListener("click", function(){
                settingsForEntry.style.display = "none";
            }, false);
            settingsForEntry.appendChild(close);
            
            document.body.appendChild(settingsForEntry);
            
            _settingsForEntry = settingsForEntry;
            _settingsForEntryInput = input;
        }
        _settingsForEntry.style.display = "";
        var point = findPosition(relative);
        _settingsForEntry.style.left = (point.x - 250) + "px";
        
        var y = point.y + 21 - document.getElementById("entries").scrollTop;
        if (y + _settingsForEntry.offsetHeight > document.documentElement.clientHeight) {
            _settingsForEntry.style.top = "auto";
            _settingsForEntry.style.bottom = (document.documentElement.clientHeight -
            y +
            10) +
            "px";
        } else {
            _settingsForEntry.style.top = y + "px";
            _settingsForEntry.style.bottom = "auto";
        }
        _settingsForEntryInput.value = title;
    }
    
    var _alreadyPrinted = {};
    
    function saveSettings(excludesString, highlightsString){
        _excludes = excludesString.replace(/\r/, "").split(/\n+/);
        _highlights = highlightsString.replace(/\r/, "").split(/\n+/);
        _hideExcluds = +_hideExcludsCheckbox.checked;
        _hideDuplicates = +_hideDuplicatesCheckbox.checked;
        _preferHighlights = +_preferHighlightsCheckbox.checked;
        GM_setValue("hideExcluds", _hideExcluds ? 1 : "");
        GM_setValue("hideDuplicates", _hideDuplicates ? 1 : "");
        GM_setValue("preferHighlights", _preferHighlights ? 1 : "");
        saveCollections();
    }
    
    function saveCollections(){
        GM_setValue("excludes", encodeURI(JSON.stringify(_excludes)));
        GM_setValue("highlights", encodeURI(JSON.stringify(_highlights)));
        setRegExps();
    }
    
    function filterEntries(e){
        var element = e.target;
        
        if (!(/(^| )entry( |$)/.test(element.className))) {
            return;
		}
        
        // reset the dups list when entries inserted again
        if (element.parentNode.id == "entries") {
            var l = document.getElementById("entries").childNodes.length;
            if (l <= 2) {
				_alreadyPrinted = {};
			}
        }
        
        var title = element.getElementsByTagName("h2")[0];
        var url = element.getElementsByTagName("a")[0].href;
        
        var minifiedTitle = minifyTitle(title.textContent);
        
        var configure = document.createElement("span");
        configure.className = "filter-configure-entry";
        configure.textContent = "#";
        element.appendChild(configure, element);
        configure.title = minifiedTitle;
        configure.addEventListener("click", configureCurrent, false);
        
        var escapedTitle = encodeURI(minifiedTitle);
        
        var b = false;
        if (_alreadyPrinted[escapedTitle]/* || _alreadyPrinted[url] */) {
            element.className += " entry-duplicate";
            if (_hideDuplicates) {
				element.parentNode.removeChild(element);// element.style.display="none";
			}
			return;
        }
        
        if (_preferHighlights) {
            if (_highlights.length) {
                b = checkEntry(minifiedTitle, element, _rxHighlights, "entry-highlighted");
            }
            if (!b && _excludes.length) {
				b = checkEntry(minifiedTitle, element, _rxExcludes, "entry-filtered");
				if (_hideExcluds && b) {
					element.parentNode.removeChild(element);// element.style.display="none";
				}
            }
        } else {
            if (_excludes.length) {
                b = checkEntry(minifiedTitle, element, _rxExcludes, "entry-filtered");
                if (_hideExcluds && b) {
                    element.parentNode.removeChild(element);// element.style.display="none";
                }
            }
            if (!b && _highlights.length) {
                checkEntry(minifiedTitle, element, _rxHighlights, "entry-highlighted");
            }
        }
        
        _alreadyPrinted[escapedTitle] = /* _alreadyPrinted[url]= */ true;
    }
    function minifyTitle(title){
        return trim(title.replace(_minifyRx, " ").replace(/ +/g, " ").toLowerCase());
    }
    
    function configureCurrent(e){
        openSettingsForEntry(e.target, e.target.title);
        e.preventDefault();
        e.stopPropagation();
    }
    function checkEntry(title, element, rx, className){
        if (rx.test(title)) {
            element.className += " " + className;
            return true;
        }
        return false;
    }
    /*
     * if (window.attachEvent) attachEvent("onload",init); else
     * addEventListener("load",init,false);
     */
    init();
};
