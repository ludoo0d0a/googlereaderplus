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
GRP.filter = function(prefs, langs, ID, SL, lang){
    var locked = false,_options = {};
	
	//TODO
	SL.filter='Filter';
	
	var FILTERS = {
		excludes: {text: 'Excludes'},
		//duplicates:{text:'Duplicates'},
		highlights:{text:'Highlights'}
	};
    function initInterface(){
        var css = ".entry-title-filter {margin-left: 4px;padding-left:16px;width:14px;height:14px;background-repeat:no-repeat;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sCFQ4vGkzKXpwAAAGjSURBVDjLpZJNThtBEIXf6+7xjBWE2USKxI9sJYdIzsUB4uxgkevkCoQTZBEhFp5IsEHxmITucXc9FliRjS0FiVpW9/v0ql4BrywCwLefqkdxfuTp65cKi0qaN6M2AMAopiOZ/1qI98E/QZ+XBJgRzgmAULK7GnbdaQDEvu/ovWsqjw97jZq6Isg1oYA+E9KqL8ROaEsvOIBCd9dajudWymXsmQQgeKIKhPeE5OCdQxUA75QeluXSSjxHd9f+s3t9rebX/Pcnkp+bgf+4/wZ1FYh+SRQjSEGydB/L95T05XB0cDGZMG7M+xyyN2QtOACCpHQf84YYANw6YDJhPBwdXFguZ7FXu/grmAGOhj8P1i77crYu3gIAwHiMxGYwk5CKrbImUIRkYTAbj5HW/28BSCpoIJIiqY3H5Xa87rWXGHa3e0iCCcjFAAhm2mlhpwNTdQzghACDd6gCQeK4WHUynW5e6k6AmG8l3QhQLoZlFsx0W/lyM51C/x9BYSHYj5zV39vTLovxKhcuyBfsYN7U7bDrTp33ta2i9KWkd/tvZ8BmMo9zU/DX9PsOeAAAAABJRU5ErkJggg==);}";
		css+=".entry-hidden{display:none;}.filter-settings-button,.filter-settings-window *,.filter-settings-entry-window *{font-family:verdana;font-size:11px;color:#000;} .filter-settings-window textarea,.filter-settings-entry-window input[type=text]{font-family:'courier new';border:1px solid #669CB9;} .filter-settings-button{cursor:pointer;background-color:#ADCBDA;padding:4px;position:absolute;top:30px;right:10px;z-index:1000;} .filter-settings-button:hover{background-color:#B46B8F;} .filter-settings-window{background-color:#ADCBDA;border:1px solid #669CB9;padding:4px;position:absolute;top:30px;right:10px;z-index:1000;} .filter-settings-window label.ta{float:left;width:250px;} .filter-settings-window textarea{height:300px;width:250px;} .filter-settings-entry-window{width:300px;background-color:#ADCBDA;border:1px solid #669CB9;font-size:11px;padding:4px;position:fixed;top:30px;right:10px;z-index:1000;} .filter-settings-entry-window input[type=text]{width:300px;} .filter-settings-window button,.filter-settings-entry-window button{margin-top:5px;margin-right:5px;background-color:#669CB9;color:#fff;font-size:11px;border:1px solid #000;}.entry-filtered .card-content *, .entry-filtered .collapsed *{color:#BCBCBC!important;} .entry-filtered:hover .card-content *, .entry-filtered:hover .collapsed *{color:#6A6A6A!important;} .entry-highlighted .card-content, .entry-highlighted .collapsed{background-color:#E6EFCF!important;} .entry-highlighted .card-content *, .entry-highlighted .collapsed *{color:#000!important;background-color:#E6EFCF;} .entry-duplicate *{color:#C7D0D8!important;} .filter-configure-entry{background-color:#daa;color:#fff;padding:2px;cursor:pointer;position:absolute;top:0;right:90px}";
		GM_addStyle(css, 'rps_filter');
		
		var ref = get_id('stream-prefs-menu');
		var items = [
			{id:'excludes', text:'Excludes', textarea:true, value:_options.excludes},
			//{id:'duplicates', text:'Duplicates', textarea:true, value:_options.duplicates},
			{id:'highlights', text:'Highlights', textarea:true, value:_options.highlights},
			{id:'prefer_highlight', text:'Prefer Highlights over excludes', checkbox:true, value:_options.preferHighlights},
			{sep:true},
			{id:'hide_excludes', text:'Hide Excludes', checkbox:true, value:_options.hideExcludes},
			{id:'hide_duplicates', text:'Hide Duplicates', checkbox:true, value:_options.hideDuplicates},
			{sep:true},
			{id:'searchbody', text:'Search in whole body text', checkbox:true, value:_options.searchbody},
			{id:'live', text:'Live', checkbox:true, value:_options.live, click:onLive},
			{sep:true},
			{id:'update', text:'Update', click:onSave},
			{id:'close', text:'Close', close:true}
		];
		addSplitButton(ref, SL.filter, SL.filter, emptyFn, emptyFn, 1, items);
		
		function onLive(el, menu, id, sel){
			_options.live=sel;
		}
		//Monitor change textarea
		function monitorChange(){
			if (_options.live) {
				onSave();
			}
		}
		iterate(FILTERS,function(id,o){
			var el = get_id('t_'+id);
			if(el){
				el.addEventListener('change', monitorChange, false);
				el.addEventListener('keyup', monitorChange, false);
			}
		});
		monitorChange();
    }
	
	function emptyFn(){
		openSettings();
	}
	
    function findPosition(element){
        var point = {
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

    function init(){
		GM_getValue("filter_settings", [], function(o){
			_options=checkOptions(o);
			initInterface();
			registerFeature(filterEntries, ID, {onlistviewtitle: true});
		});
        
    }
	
	function isMenuChecked(id){
		return hasClass(get_id(id),'goog-option-selected');
	}
	function getMenuValue(id){
		return get_id(id).value||'';
	}
	
	function onSave(){
		_options = _options||{};
		_options.excludes=getMenuValue('t_excludes');
		//_options.duplicates=getMenuValue('t_duplicates');
		_options.highlights=getMenuValue('t_highlights');
		
		_options.searchbody=isMenuChecked('searchbody');
		_options.hideDuplicates=isMenuChecked('hide_duplicates');
		_options.hideExcludes=isMenuChecked('hide_excludes');
		_options.preferHighlights=isMenuChecked('prefer_highlight');
		_options.live=isMenuChecked('live');
		
		_options=checkOptions(_options);
		
		//filter
		var opt = {};
		iterate(_options,function(name,value){
			if (!(/^rx/.test(name))){ //typeof 'string'
				opt[name]=value;
			}
		});
		
		GM_setValue("filter_settings", opt);
		updateFilterEntries();
		//alert('Settings saved');
	}
	
	function checkOptions(o){
		o= o||{};
		o.excludes=o.excludes||'';
		o.rxExcludes = getRegExp(o.excludes);
		
		o.highlights=o.highlights||'';
		o.rxHighlights = getRegExp(o.highlights);
		//o.duplicates=o.duplicates||'';
		o.rxDuplicates = getRegExp(o.duplicates);
		
		o.hideExcludes=o.hideExcludes||false;
		o.hideDuplicates=o.hideDuplicates||false;
		o.preferHighlights=o.preferHighlights||false;			
		return o;
	}
	        
    function getRegExp(o){
		var items = o;
		if (typeof items === 'string'){
			items=formatTextAreaToList(items);
		}
		var rx=false,nonRxs=[],toRxs=[];
		if (items && items.length > 0) {
			foreach(items, function(item){
				if (/@/.test(item)) {
					nonRxs.push(encodeRE(item.substr(1)));
				} else {
					toRxs.push(item);
				}
			});
			
			var rex = nonRxs.join("|");
			if (nonRxs.length > 0 && toRxs.length > 0) {
				rex += '|';
			}
			if (toRxs.length > 0) {
				rex += "\\b(" + toRxs.join('|') + ")\\b";
			}
			rx = new RegExp(rex, "i");
		}
		return rx;
	}
  
    var _settingsForEntry, _settingsForEntryInput;
    function openSettingsForEntry(relative, title){
        if (!_settingsForEntry) {
            var settingsForEntry = document.createElement("div");
            settingsForEntry.className = "filter-settings-entry-window";
            settingsForEntry.innerHTML = "<label>" + SL.quickadd + "</label><div style='clear:both'></div>";
            
            var input = document.createElement("input");
            input.type = "text";
            settingsForEntry.appendChild(input);
            
            settingsForEntry.appendChild(document.createElement("br"));
            
            var  excludesButton = createButton(settingsForEntry, 'btn-exclude', SL.exclude, input, true);
			var  highlightButton = createButton(settingsForEntry, 'btn-highlight',SL.highlight, input, false);
			
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
        }
        else {
            _settingsForEntry.style.top = y + "px";
            _settingsForEntry.style.bottom = "auto";
        }
        _settingsForEntryInput.value = title;
    }
    
    function updateFilterEntries(){
        forAllEntries(function(entry){
            filterEntries(false, entry, false, true);
        });
    }
    
	var _alreadyPrinted = {};
    function filterEntries(btn, entry, mode, force){
        var tagged = isTagged(entry, 'tf');
		if (!force && tagged) {
            //stop entry was already scanned
            return;
        }
        
        // reset the dups list when entries inserted again
        /*if (entry.parentNode.id === "entries") {
            var l = entry.parentNode.childNodes.length;
            if (l <= 2) {
                _alreadyPrinted = {};
            }
        }*/
		if (!entry.previousElementSibling) {
			_alreadyPrinted = {};
		}
        
        if (force) {
            //clean before update
            removeClass(entry, 'entry-highlighted');
            removeClass(entry, 'entry-filtered');
            removeClass(entry, 'entry-duplicate');
            removeClass(entry, 'entry-hidden');
        }
        var link = getEntryLink(entry);
        var title = link.title;
		var dt = getFirstElementByClassName(entry, 'entry-date').innerText;
		var feedname = getFirstElementByClassName(entry, 'entry-source-title').innerText;
		var snippet = getFirstElementByClassName(entry, 'snippet').innerText;
        //console.log('>>>>'+active+'--'+title);
        
        var minifiedTitle = minifyTitle(title);
		if (_options.searchbody) {
			/*var body = getBody(entry);
			if (body) {
				minifiedTitle += ' ' + body.innerText;
			}*/
			minifiedTitle= entry.innerText;
		}
		
        var escapedTitle = encodeURI(minifiedTitle);
		if (!tagged) {
			var et = getFirstElementByClassName(entry, 'entry-title');
			dh(et, 'a', {
				href: '#',
				cls: 'entry-title-link-filter', //'filter-configure-entry', 
				title: 'Filter this entry', //minifiedTitle,
				html: '<div class="entry-title-filter"></div>'
			}, {
				click: configureCurrent
			});
		}
		
        var b = false;
        if (!force && _alreadyPrinted[escapedTitle]) {
            addClass(entry, 'entry-duplicate');
            if (_options.hideDuplicates) {
                addClass(entry, 'entry-hidden');
            }
            return;
        }
		
        function doExcludes(){
			var b = false;
			if (_options.excludes.length) {
                b = checkEntry(minifiedTitle, entry, _options.rxExcludes, "entry-filtered");
                if (_options.hideExcludes && b) {
                    addClass(entry, 'entry-hidden');
                }
            }
			return b;
		}
		function doHighlight(){
			var b = false;
			if (_options.highlights.length) {
                b = checkEntry(minifiedTitle, entry, _options.rxHighlights, "entry-highlighted");
            }
			return b;
		}
		
		//Change priority
        if (_options.preferHighlights) {
            b=doHighlight();
            if (!b) {
                b=doExcludes();
            }
        }else {
            b=doExcludes();
			if (!b){
				b=doHighlight();
			}
        }
        if (!force) {
			_alreadyPrinted[escapedTitle] = true;
		}
    }
	
	var _minifyRx = /[~!@#$%^&*()_+-]+/g;
	
    function minifyTitle(title){
        return trim(title.replace(_minifyRx, " ").replace(/ +/g, " ").toLowerCase());
    }
	
 	function stringSort(a, b){
        return (a > b)?1:((a < b)?-1:0);
    }
        
    function formatListToTextArea(list){
		return list.join("\n").replace(/(\r?\n){2,}/, "");
    }
	 function formatTextAreaToList(txt){
		var t=trimEx(txt.replace(/\r/, ""));
		var list= false;
		if (t){
			list=t.split(/\n+/);
		}
		return list;
    }
    
    function configureCurrent(e){
        openSettingsForEntry(e.target, e.target.title);
        e.preventDefault();
        e.stopPropagation();
    }
    
    function checkEntry(title, element, rx, className){
        if (rx && rx.test(title)) {
            addClass(element, className);
            return true;
        }
        return false;
    }
    
    init();
};
