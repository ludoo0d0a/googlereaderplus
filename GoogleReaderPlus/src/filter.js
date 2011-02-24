/**
 * Google Reader Filter
 * @version  2.0
 * @date 2009-08-14
 *
 * Filters duplicated entries and unwanted content or highlight chosen content based on keywords (with regex support).
 * Completely rewritten to be well integrated, and easy to write useful expressions as well as expert mode.
 *
 * Original author :
 * Elad Ossadon (http://twitter.com/elado | http://www.devign.co.il | elado7@gmail.com)
 * http://userscripts.org/scripts/show/23671
 *
 *
 */
GRP.filter = function(prefs, langs, ID, SL, lang){
    var locked = false, _options = {}, entrymenu = false, toggleStatus = true, css = '', miniWord = 4;
	var KEY_OPTIONS = ['live', 'searchbody', 'excludes','highlights', 'hide_excludes', 'hide_duplicates', 'prefer_highlights', 'word_mini'];

    var FILTERS = {
        excludes: {
            text: 'Excludes'
        },
        highlights: {
            text: 'Highlights'
        }
    };
    function initInterface(){
        var colors = {
            highlight: '#E6EFCF',
            duplicate: '#C7D0D8',
            filtered: '#BCBCBC',
            filtered_hover: '#6A6A6A'
        };
        
        css = '.entry-title-filter {margin-left: 4px;padding-left:16px;width:14px;height:14px;background-repeat:no-repeat;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sCFQ4vGkzKXpwAAAGjSURBVDjLpZJNThtBEIXf6+7xjBWE2USKxI9sJYdIzsUB4uxgkevkCoQTZBEhFp5IsEHxmITucXc9FliRjS0FiVpW9/v0ql4BrywCwLefqkdxfuTp65cKi0qaN6M2AMAopiOZ/1qI98E/QZ+XBJgRzgmAULK7GnbdaQDEvu/ovWsqjw97jZq6Isg1oYA+E9KqL8ROaEsvOIBCd9dajudWymXsmQQgeKIKhPeE5OCdQxUA75QeluXSSjxHd9f+s3t9rebX/Pcnkp+bgf+4/wZ1FYh+SRQjSEGydB/L95T05XB0cDGZMG7M+xyyN2QtOACCpHQf84YYANw6YDJhPBwdXFguZ7FXu/grmAGOhj8P1i77crYu3gIAwHiMxGYwk5CKrbImUIRkYTAbj5HW/28BSCpoIJIiqY3H5Xa87rWXGHa3e0iCCcjFAAhm2mlhpwNTdQzghACDd6gCQeK4WHUynW5e6k6AmG8l3QhQLoZlFsx0W/lyM51C/x9BYSHYj5zV39vTLovxKhcuyBfsYN7U7bDrTp33ta2i9KWkd/tvZ8BmMo9zU/DX9PsOeAAAAABJRU5ErkJggg==);}';
        css += '.entry-title-filter.goog-button-base-open{opacity:0.4;}';
        css += '.entry-hidden{display:none;}';
        css += '.entry-duplicate *{color:' + colors.duplicate + '!important;} .filter-configure-entry{background-color:#daa;color:#fff;padding:2px;cursor:pointer;position:absolute;top:0;right:90px}';
        css += '.entry-filtered .card-content *, .entry-filtered .collapsed *{color:' + colors.filtered + '!important;} ';
        css += '.entry-filtered:hover .card-content *, .entry-filtered:hover .collapsed *{color:' + colors.filtered_hover + '!important;} ';
        css += '.entry-highlighted .card-content, .entry-highlighted .collapsed{background-color:' + colors.highlight + '!important;} .entry-highlighted .card-content *, .entry-highlighted .collapsed *{color:#000!important;background-color:' + colors.highlight + ';}';
        GM_addStyle(css, 'rps_filter');
        
        var css_ui = ".menu-filter-static{position:absolute;right:30px;top:22px;z-index:9;}";
        GM_addStyle(css_ui, 'rps_filter_ui');
        
        var ref = get_id('stream-prefs-menu');
        var items = [{
            id: 'excludes',
            text: SL.excludes,
            textarea: true,
            value: _options.excludes
        },
        {
            id: 'highlights',
            text: SL.highlights,
            textarea: true,
            value: _options.highlights
        }, {
            sep: true
        }, {
            id: 'prefer_highlight',
            text: SL.prefer_highlight,
            checkbox: true,
            value: _options.prefer_highlights,
            click: monitorChange
        }, {
            id: 'hide_excludes',
            text: SL.hide_excludes,
            checkbox: true,
            value: _options.hide_excludes,
            click: monitorChange
        }, {
            id: 'hide_duplicates',
            text: SL.hide_duplicates,
            checkbox: true,
            value: _options.hide_duplicates,
            click: monitorChange
        }, {
            sep: true
        }, {
            id: 'searchbody',
            text: SL.searchbody,
            checkbox: true,
            value: _options.searchbody,
            click: monitorChange
        }, {
            id: 'live',
            text: 'Live',
            checkbox: true,
            value: _options.live,
            click: onLive
        }, {
            sep: true
        }, {
            id: 'update',
            text: SL.save,
            click: onSave
        }, {
            id: 'close',
            text: SL.close,
            close: true
        }];
        var btn = addSplitButton('filter-split-button', ref, SL.filter, SL.filter, toggleFilter, toggleFilter, 1, items);
        addClassIf(btn, 'goog-button-base-open', toggleStatus);
        
        function toggleFilter(){
            toggleStatus = !toggleStatus;
            addClassIf(btn, 'goog-button-base-open', toggleStatus);
            var _css = (toggleStatus) ? css : '';
            GM_addStyle(_css, 'rps_filter');
        }
        
        
        function onLive(el, menu, id, sel){
            _options.live = sel;
        }
        //Monitor change textarea
        function monitorChange(){
            if (_options.live) {
                onSave();
            }
        }
        iterate(FILTERS, function(id, o){
            var el = get_id('t_' + id);
            if (el) {
                el.addEventListener('change', monitorChange, false);
                el.addEventListener('keyup', monitorChange, false);
            }
        });
        monitorChange();
        
        checkHidden();
    }
    
    function checkHidden(){
        //Check if hidden
        setTimeout(function(){
            var elsplit = get_id('filter-split-button');
            if (elsplit && elsplit.offsetTop === 0 && elsplit.offsetLeft === 0) {
                //is hidden, force to show it
                var cv = get_id('chrome-viewer');
                if (cv) {
                    cv.appendChild(elsplit);
                }
                addClass(elsplit, 'menu-filter-static');
            }
        }, 1000);
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
		GM_getValues(ID+'_', KEY_OPTIONS,function(o){
			miniWord = o.word_mini || miniWord; 
			_options = checkOptions(o);
            initInterface();
            registerFeature(filterEntries, ID, {
                onlistviewtitle: true
            });
		});
    }
    
    function isMenuChecked(id){
        return hasClass(get_id(id), 'goog-option-selected');
    }
    
    function onSave(){
        _options = _options || {};
        _options.excludes = getValue('t_excludes');
        _options.highlights = getValue('t_highlights');
        _options.searchbody = isMenuChecked('searchbody');
        _options.hide_duplicates = isMenuChecked('hide_duplicates');
        _options.hide_excludes = isMenuChecked('hide_excludes');
        _options.prefer_highlights = isMenuChecked('prefer_highlight');
        _options.live = isMenuChecked('live');
        onUpdate();
    }
    
    function onUpdate(){
        _options = checkOptions(_options);
		foreach(KEY_OPTIONS,function(option){
			GM_setValue(ID+'_'+option, _options[option]);		
		});
        updateFilterEntries();
    }
    
    function updateFilterEntries(){
        forAllEntries(function(entry){
            filterEntries(false, entry, false, true);
        });
    }
    
    function checkOptions(o){
        o = o || {};
        o.excludes = o.excludes || '';
        o.rxExcludes = getRegExp(o.excludes);
        o.highlights = o.highlights || '';
        o.rxHighlights = getRegExp(o.highlights);
        o.rxDuplicates = getRegExp(o.duplicates);
        o.hide_excludes = o.hide_excludes || false;
        o.hide_duplicates = o.hide_duplicates || false;
        o.prefer_highlights = o.prefer_highlights || false;
        return o;
    }
    
    var _alreadyPrinted = {};
    function filterEntries(btn, entry, mode, force){
        var tagged = isTagged(entry, 'tf');
        if (!force && tagged) {
            //stop entry was already scanned
            return;
        }
        
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
        
        var content = getContentEntry(entry);
        
        var escapedContent = encodeURI(content);
        if (!tagged) {
            var et = getFirstElementByClassName(entry, 'entry-title');
            dh(et, 'a', {
                href: '#',
                cls: 'entry-title-link-filter', //'filter-configure-entry', 
                title: 'Filter this entry', //content,
                html: '<div class="entry-title-filter"></div>'
            }, {
                click: function(e){
                    e.preventDefault();
                    e.stopPropagation();
                    openEntryMenu(e.target, entry);
                }
            });
        }
        
        var b = false;
        if (!force && _alreadyPrinted[escapedContent]) {
            addClass(entry, 'entry-duplicate');
            if (_options.hide_duplicates) {
                addClass(entry, 'entry-hidden');
            }
            return;
        }
        
        function doExcludes(){
            var b = false;
            if (_options.excludes.length) {
                b = checkEntry(content, entry, _options.rxExcludes, "entry-filtered");
                if (_options.hide_excludes && b) {
                    addClass(entry, 'entry-hidden');
                }
            }
            return b;
        }
        function doHighlight(){
            var b = false;
            if (_options.highlights.length) {
                b = checkEntry(content, entry, _options.rxHighlights, "entry-highlighted");
            }
            return b;
        }
        
        //Change priority
        if (_options.prefer_highlights) {
            b = doHighlight();
            if (!b) {
                b = doExcludes();
            }
        } else {
            b = doExcludes();
            if (!b) {
                b = doHighlight();
            }
        }
        if (!force) {
            _alreadyPrinted[escapedContent] = true;
        }
    }
    function getContentEntry(entry){
        var link = getEntryLink(entry);
        var title = link.title;
        /*var dt = getElementText(entry, 'entry-date');
         var feedname = getElementText(entry, 'entry-source-title');
         var snippet = getElementText(entry, 'snippet');
         */
        //console.log('>>>>'+active+'--'+title);
        
        var text = minifyContent(title);
        if (_options.searchbody) {
            /*var body = getBody(entry);
             if (body) {
             text += ' ' + body.innerText;
             }*/
            text = entry.innerText;
        }
        return text;
    }
    
    var _minifyRx = /[\n“”’'~\!@#\$%\^&\*\.\(\)_+-\:,;=\\\/\[\]]+/g;
    function minifyContent(title){
        return trim(title.replace(_minifyRx, ' ').replace(/ +/g, " ").toLowerCase());
    }
    
    function stringSort(a, b){
        return (a > b) ? 1 : ((a < b) ? -1 : 0);
    }
    
    function formatListToTextArea(list){
        return list.join("\n").replace(/(\r?\n){2,}/, "");
    }
    function formatTextAreaToList(txt){
        var t = trimEx(txt.replace(/\r/, ""));
        var list = false;
        if (t) {
            list = t.split(/\n+/);
        }
        return list;
    }
    
    function openEntryMenu(el, entry){
        if (!entrymenu) {
            function addExpr(asExcludes){
                var new_content = getValue('t_e_content');
                if (new_content) {
                    if (asExcludes) {
                        _options.excludes += '\n' + new_content;
                        setValue('t_excludes', _options.excludes);
                    } else {
                        _options.highlights += '\n' + new_content;
                        setValue('t_highlights', _options.highlights);
                    }
                    onUpdate();
                }
            }
            
            var items = [{
                id: 'e_content',
                text: SL.content,
                textarea: true,
                rows: 2,
                cols: 50,
                value: ''
            }, {
                sep: true
            }, {
                id: 'e_add_excludes',
                text: SL.add_excludes,
                close: true,
                click: function(){
                    addExpr(true);
                }            
			}, {
                id: 'e_add_highlights',
                text: SL.add_highlights,
                close: true,
                click: function(){
                    addExpr(false);
                }
            }];
            entrymenu = createMenu('menu-filter-entry', items, el, true);
        }
        toggleMenu(entrymenu, el, null, null, function(visible){
            if (visible) {
                var content = getContentEntry(entry);
                var words = getWords(content, miniWord);
                setValue('t_e_content', words);
            }
        });
    }
    
    function checkEntry(title, element, rx, className){
        if (rx) {
            if (typeof rx !== "object") {
                rx = [rx];
            }
            for (var i = 0, len = rx.length; i < len; i++) {
                if (!rx[i].test(title)) {
                    return false;
                }
            }
            addClass(element, className);
            return true;
        }
        return false;
    }
    
    function getWords(text, size){
        size = size || 3;
        text = minifyContent(text);
        var map = {}, values = [], words = text.split(' ');
        if (words) {
            foreach(words, function(word){
                if (word.length >= size) {
                    map[word]=1;
                }
            });
			iterate(map,function(i,o){
				values.push(i);
			});
            values.sort(stringSort);
            value = values.join(' ');
        }
        return value;
    }
    
    //Transform a google-like expression into a tree regex
    function buildTree(items){
    
    }
    
    var reQuotedExpr = /"[^"]*"/g, reQuote = /^"|"$/g;
    function parseExpression(expr){
        var r = expr.replace(reQuotedExpr, function(all){
            var group = all.replace(reQuote, '');
            return '(' + encodeRE(group) + ')';
        });
        //concat multiple spaces, then set them as OR for now (ANd in google expr)
        r = r.replace(/\s+/g, ' ').replace(/\s/g, '|');
        return r;
    }
    
    function getRegExp(o){
        var items = o;
        if (typeof items === 'string') {
            items = formatTextAreaToList(items);
        }
        //var rx = buildTree(items);
        var rx = [];
        foreach(items, function(item){
            var rex = parseExpression(item);
            rx.push(rex);
        });
        
        var rex = rx.join("|");
        rx = new RegExp(rex, "i");
        return rx;
    }
    
    init();
};


