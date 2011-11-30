/**
 * Google Reader Filter
 * @version  2.0
 * @date 2009-08-14
 *
 * Filters duplicated entries and unwanted content or highlight chosen content based on keywords (with regex support).
 * Completely rewritten to be well integrated, and easy to write useful expressions as well as expert mode.
 *
 * Original idea :
 * Elad Ossadon (http://twitter.com/elado | http://www.devign.co.il | elado7@gmail.com)
 * http://userscripts.org/scripts/show/23671
 *
 *
 */
GRP.filter = function(prefs, langs, ID, SL, lang) {
	var locked = false, _options = {}, entrymenu = false, toggleStatus = true, css = '', miniWord = 4;
	var KEY_OPTIONS = ['live', 'searchbody', 'excludes', 'highlights', 'hide_excludes', 'hide_duplicates', 'detect_duplicates', 'prefer_highlights', 'word_mini'];
	
	var _minifyRx = /[\n“”\?’'~\!@#\$%\^&\*\.\(\)_\+\-\:,;=\\\/\[\]]+/g;
	var useButton = prefs[ID + '_button'];

	var FILTERS = {
		excludes : {
			text : 'Excludes'
		},
		highlights : {
			text : 'Highlights'
		}
	};
	function initInterface() {
		var colors = {
			highlight : '#E6EFCF',
			duplicate : '#C7D0D8',
			filtered : '#BCBCBC',
			filtered_hover : '#6A6A6A'
		};
		css = '.entry-title-filter {margin-left: 4px;padding-left:16px;width:14px;height:14px;background-repeat:no-repeat;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sCFQ4vGkzKXpwAAAGjSURBVDjLpZJNThtBEIXf6+7xjBWE2USKxI9sJYdIzsUB4uxgkevkCoQTZBEhFp5IsEHxmITucXc9FliRjS0FiVpW9/v0ql4BrywCwLefqkdxfuTp65cKi0qaN6M2AMAopiOZ/1qI98E/QZ+XBJgRzgmAULK7GnbdaQDEvu/ovWsqjw97jZq6Isg1oYA+E9KqL8ROaEsvOIBCd9dajudWymXsmQQgeKIKhPeE5OCdQxUA75QeluXSSjxHd9f+s3t9rebX/Pcnkp+bgf+4/wZ1FYh+SRQjSEGydB/L95T05XB0cDGZMG7M+xyyN2QtOACCpHQf84YYANw6YDJhPBwdXFguZ7FXu/grmAGOhj8P1i77crYu3gIAwHiMxGYwk5CKrbImUIRkYTAbj5HW/28BSCpoIJIiqY3H5Xa87rWXGHa3e0iCCcjFAAhm2mlhpwNTdQzghACDd6gCQeK4WHUynW5e6k6AmG8l3QhQLoZlFsx0W/lyM51C/x9BYSHYj5zV39vTLovxKhcuyBfsYN7U7bDrTp33ta2i9KWkd/tvZ8BmMo9zU/DX9PsOeAAAAABJRU5ErkJggg==);}';
		css += '.entry-title-filter.goog-button-base-open{opacity:0.4;}';
		css += '.entry-hidden{display:none;}';
		css += '.entry-duplicate *{color:' + colors.duplicate + '!important;} .filter-configure-entry{background-color:#daa;color:#fff;padding:2px;cursor:pointer;position:absolute;top:0;right:90px}';
		css += '.entry-filtered .card-content *, .entry-filtered .collapsed *{color:' + colors.filtered + '!important;} ';
		css += '.entry-filtered:hover .card-content *, .entry-filtered:hover .collapsed *{color:' + colors.filtered_hover + '!important;} ';
		css += '.entry-highlighted .card-content, .entry-highlighted .collapsed{background-color:' + colors.highlight + '!important;} .entry-highlighted .card-content *, .entry-highlighted .collapsed *{color:#000!important;background-color:' + colors.highlight + ';}';
		css += '#entries.list.full-snippet .collapsed{height:auto !important;}';
		css += '#entries.list.full-snippet .collapsed .entry-secondary{position:static !important;}';
		GM_addStyle(css, 'rpe_' + ID);

		var css_ui = ".menu-filter-static{position:absolute;right:140px;top:35px;z-index:9;}";
		css_ui += "#chrome.page-view .menu-filter-static{right:30px;top:6px;}";
		GM_addStyle(css_ui, 'rpe_' + ID + '_ui');

		var btn_id = 'btn-' + ID + '-toggle';
		if(get_id(btn_id)) {
			return;
		}

		var ref = get_id('stream-prefs-menu');
		var items = [{
			id : 'excludes',
			text : SL.excludes,
			textarea : true,
			value : _options.excludes
		}, {
			id : 'highlights',
			text : SL.highlights,
			textarea : true,
			value : _options.highlights
		}, {
			sep : true
		}, {
			id : 'prefer_highlights',
			text : SL.prefer_highlights,
			checkbox : true,
			value : _options.prefer_highlights,
			click : monitorChange
		}, {
			id : 'hide_excludes',
			text : SL.hide_excludes,
			checkbox : true,
			value : _options.hide_excludes,
			click : monitorChange
		}, {
			sep : true
		}, {
			id : 'detect_duplicates',
			text : SL.detect_duplicates,
			checkbox : true,
			value : _options.detect_duplicates,
			click : monitorChange
		}, {
			id : 'hide_duplicates',
			text : SL.hide_duplicates,
			checkbox : true,
			value : _options.hide_duplicates,
			click : monitorChange
		}, {
			sep : true
		}, {
			id : 'searchbody',
			text : SL.searchbody,
			checkbox : true,
			value : _options.searchbody,
			click : monitorChange
		}, {
			id : 'togglefulltext',
			text : SL.fulltext,
			checkbox : true,
			value : _options.fulltext,
			click : toggleFullText
		}, {
			id : 'live',
			text : SL.live,
			checkbox : true,
			value : _options.live,
			click : onLive
		}, {
			sep : true
		}, {
			id : 'update',
			text : SL.save,
			click : onSave
		}, {
			id : 'close',
			text : SL.close,
			close : true
		}];
		var btn = addSplitButton('filter-split-button', ref, SL.filter, SL.filter, toggleFilter, false, 1, items);
		btn.id = btn_id;
		addClassIf(btn, 'goog-button-base-open', toggleStatus);

		function toggleFullText(btn) {
			var entries = get_id('entries');
			addClassIf(entries, 'full-snippet', hasClass(btn, 'goog-option-selected'));
		}

		function toggleFilter() {
			toggleStatus = !toggleStatus;
			addClassIf(btn, 'goog-button-base-open', toggleStatus);
			var _css = (toggleStatus) ? css : '';
			GM_addStyle(_css, 'rpe_' + ID);
		}

		function onLive(el, menu, id, sel) {
			_options.live = sel;
		}

		//Monitor change textarea
		function monitorChange() {
			if(_options.live) {
				onSave();
			}
		}

		iterate(FILTERS, function(id, o) {
			var el = get_id('t_' + id);
			if(el) {
				el.addEventListener('change', monitorChange, false);
				el.addEventListener('keyup', monitorChange, false);
			}
		});
		monitorChange();

		checkHidden();
	}

	//TODO: monitor class change on #chrome
	function checkHidden() {
		var btn = get_id('filter-split-button');
		var ref = get_id('stream-prefs-menu');
		//Check if hidden
		setTimeout(function() {
			if(btn && btn.offsetTop === 0 && btn.offsetLeft === 0) {
				//is hidden, force to show it
				var cv = get_id('chrome-viewer');
				if(cv) {
					cv.appendChild(btn);
				}
				addClass(btn, 'menu-filter-static');
			}
		}, 1000);
	}

	function isMenuChecked(id) {
		return hasClass(get_id(id), 'goog-option-selected');
	}

	function onSave() {
		_options = _options || {};
		_options.excludes = getValue('t_excludes');
		_options.highlights = getValue('t_highlights');
		_options.searchbody = isMenuChecked('searchbody');
		_options.detect_duplicates = isMenuChecked('detect_duplicates');
		_options.hide_duplicates = isMenuChecked('hide_duplicates');
		_options.hide_excludes = isMenuChecked('hide_excludes');
		_options.prefer_highlights = isMenuChecked('prefer_highlights');
		_options.live = isMenuChecked('live');
		onUpdate();
	}

	function onUpdate() {
		_options = checkOptions(_options);
		foreach(KEY_OPTIONS, function(option) {
			GM_setValue(ID + '_' + option, _options[option], true);
		});
		updateFilterEntries();
	}

	function updateFilterEntries() {
		var mode = getMode();
		forAllEntries(function(entry) {
			filterEntries(false, entry, mode, true);
		});
	}

	function checkOptions(o) {
		o = o || {};
		o.excludes = o.excludes || '';
		o.rxExcludes = getRegExp(o.excludes);
		o.highlights = o.highlights || '';
		o.rxHighlights = getRegExp(o.highlights);
		o.rxDuplicates = getRegExp(o.duplicates);
		o.hide_excludes = o.hide_excludes || false;
		o.detect_duplicates = undef(o.detect_duplicates) ? true : o.detect_duplicates;
		o.hide_duplicates = o.hide_duplicates || false;
		o.prefer_highlights = o.prefer_highlights || false;
		return o;
	}

	var _alreadyPrinted = {};
	function filterEntries(btn, entry, mode, force) {
		var tagged = isTagged(entry, 'tf');
		if(!force && tagged) {
			//stop entry was already scanned
			return;
		}

		if(!entry.previousElementSibling) {
			_alreadyPrinted = {};
		}

		if(force) {
			//clean before update
			removeClass(entry, 'entry-highlighted');
			removeClass(entry, 'entry-filtered');
			removeClass(entry, 'entry-duplicate');
			removeClass(entry, 'entry-hidden');
		}

		var content = getContentEntry(entry);
		var _entry = entry;

		var escapedContent = encodeURI(content.text);
		if(!tagged && useButton) {
			var et = getFirstElementByClassName(entry, 'entry-title');
			dh(et, 'a', {
				href : '#',
				cls : 'entry-title-link-filter', //'filter-configure-entry',
				title : 'Filter this entry', //content,
				html : '<div class="entry-title-filter"></div>'
			}, {
				click : function(e) {
					e.preventDefault();
					e.stopPropagation();
					openEntryMenu(e.target, _entry);
				}
			});
		}

		var b = false;
		if(!force && _alreadyPrinted[escapedContent]) {
			if(_options.detect_duplicates) {
				addClass(entry, 'entry-duplicate');
				if(_options.hide_duplicates) {
					addClass(entry, 'entry-hidden');
				}
				return;
			}
		}

		function doExcludes() {
			var b = false;
			if(_options.excludes.length) {
				b = checkEntry(content, entry, _options.rxExcludes, 'entry-filtered', mode);
				if(_options.hide_excludes && b) {
					addClass(entry, 'entry-hidden');
				}
			}
			return b;
		}

		function doHighlight() {
			var b = false;
			if(_options.highlights.length) {
				b = checkEntry(content, entry, _options.rxHighlights, 'entry-highlighted', mode);
			}
			return b;
		}

		//Change priority
		if(_options.prefer_highlights) {
			b = doHighlight();
			if(!b) {
				b = doExcludes();
			}
		} else {
			b = doExcludes();
			if(!b) {
				b = doHighlight();
			}
		}
		if(!force) {
			_alreadyPrinted[escapedContent] = true;
		}
	}

	function getEntryFrom(entry) {
		return getElementText(entry, 'entry-source-title');
	}

	function getEntryAuthor(entry) {
		return getElementText(entry, 'entry-author-name');
	}

	function getContentEntry(entry) {
		var link = getEntryLink(entry);
		var title = link.title;

		var dt = getElementText(entry, 'entry-date');
		// var snippet = getElementText(entry, 'snippet');
		////console.log('>>>>'+active+'--'+title);

		var text = minifyContent(title);
		var body = entry.innerText;
		if(_options.searchbody) {
			text = body;
		}

		return {
			tag : getTagsText(entry),
			author : getEntryAuthor(entry),
			from : getEntryFrom(entry),
			date : dt,
			text : text,
			body : body,
			title : title
		};
	}

	function minifyContent(title) {
		return trim(title.replace(_minifyRx, ' ').replace(/ +/g, " ").toLowerCase());
	}

	function stringSort(a, b) {
		return (a > b) ? 1 : ((a < b) ? -1 : 0);
	}

	function formatListToTextArea(list) {
		return list.join("\n").replace(/(\r?\n){2,}/, "");
	}

	function formatTextAreaToList(txt) {
		var t = trimEx(txt.replace(/\r/, ""));
		var list = false;
		if(t) {
			list = t.split(/\n+/);
		}
		return list;
	}

	function openEntryMenu(el, entry) {
		if(!entrymenu) {
			function addExpr(asExcludes) {
				var new_content = getValue('t_e_content');
				if(new_content) {
					if(asExcludes) {
						_options.excludes += '\n' + new_content;
						setValue('t_excludes', _options.excludes);
					} else {
						_options.highlights += '\n' + new_content;
						setValue('t_highlights', _options.highlights);
					}
					onUpdate();
				}
			}

			function setMenuTitle() {
				setMenuWords(true);
			}

			function setMenuWords(asTitle) {
				var v = '', content = getContentEntry(entry);
				if(asTitle) {
					//TODO : inner quotes
					v = enQuote(content.title);
				} else {
					v = getWords(content.text, miniWord);
				}
				setContentFilter(v);
			}

			function enQuote(txt) {
				return '"' + txt.replace(/"/g, '') + '"';
			}

			function setMenuFrom() {
				setContentFilter(' from:' + enQuote(getEntryFrom(entry)), true);
			}

			function setMenuAuthor() {
				setContentFilter(' author:' + enQuote(getEntryAuthor(entry)), true);
			}

			function setContentFilter(txt, add) {
				if(add) {
					txt = getValue('t_e_content') + txt;
				}
				setValue('t_e_content', txt);
			}

			var items = [{
				id : 'e_content',
				text : SL.content,
				textarea : true,
				rows : 2,
				cols : 50,
				value : ''
			}, {
				id : 'e_gettitle',
				text : SL.gettitle,
				click : setMenuTitle
			}, {
				id : 'e_getwords',
				text : SL.getwords,
				click : setMenuWords
			}, {
				id : 'e_getfrom',
				text : SL.getfrom,
				click : setMenuFrom
			}, {
				id : 'e_getauthor',
				text : SL.getauthor,
				click : setMenuAuthor
			}, {
				sep : true
			}, {
				id : 'e_add_excludes',
				text : SL.add_excludes,
				close : true,
				click : function() {
					addExpr(true);
				}
			}, {
				id : 'e_add_highlights',
				text : SL.add_highlights,
				close : true,
				click : function() {
					addExpr(false);
				}
			}];
			entrymenu = createMenu('menu-filter-entry', items, el, true);
		}
		toggleMenu(entrymenu, el, null, null, function(visible) {
			if(visible) {
				setMenuWords();
			}
		});
	}

	function getWords(text, size) {
		size = size || 3;
		text = minifyContent(text);
		var map = {}, values = [], words = text.split(' ');
		if(words) {
			foreach(words, function(word) {
				if(word.length >= size) {
					map[word] = 1;
				}
			});
			iterate(map, function(i, o) {
				values.push(i);
			});
			values.sort(stringSort);
			value = values.join(' ');
		}
		return value;
	}

	var reQuotedExpr = /"[^"]*"/g, reQuote = /^"|"$/g;
	function parseExpression(expr) {
		//TODO: Do not escape group here->use tree
		var r = expr.replace(reQuotedExpr, function(all) {
			var group = all.replace(reQuote, '');
			//return '(' + encodeRE(group) + ')';
			return escapePhrase(group);
		});
		//concat multiple spaces, then set them as OR for now (AND in google expr)
		r = r.replace(/\s+/g, ' ');
		//trim
		r = r.replace(/^\s+/, '').replace(/\s+^$/, '');
		r = r.toLowerCase();

		var _rx = false, o = {
			rx : []
		}, terms = r.split(' ');

		//tree
		o.tree = {};
		var _queue = o.tree, i = 0;
		foreach(terms, function(term) {
			if(i > 0) {
				_queue.op = 'and';
			}
			_queue.o = txt2obj({
				rx : []
			}, term);
			//if (i > 0) {
			_queue.q = {};
			_queue = _queue.q;
			//}
			i++;
		});
		createRe(o);
		//Use first term for a fast filter (refine later)
		if(o.tree.o) {
			o.re = o.tree.o.re;
		}
		//console.log(o.tree);

		return o;
	}

	function createRe(o) {
		var re = unescapePhrase(o.rx.join("|"));
		o.re = new RegExp(re, 'i');
	}

	function txt2obj(o, term) {
		if(/^author:/.test(term)) {
			//Author
			o.author = encoderegex(term.replace(/^author:/, ''), true);
		} else if(/^tag:/.test(term)) {
			//Tag
			o.tag = encoderegex(term.replace(/^tag:/, ''), true);
		} else if(/^date:/.test(term)) {
			//Date
			o.date = encoderegex(term.replace(/^date:/, ''), true);
			//o.date=new Date(o.date);
		} else if(/^from:/.test(term)) {
			//Feed name
			o.from = encoderegex(term.replace(/^from:/, ''), true);
		} else if(/^body:/.test(term)) {
			//Body text
			o.body = encoderegex(term.replace(/^body:/, ''), true);
		} else {
			o.rx.push(encoderegex(term));
			createRe(o);
		}
		return o;
	}

	function checkContent(content, o, mode) {
		if(!o) {
			return true;
		}

		if(o.re && !o.re.test(content.text)) {
			return false;
		}

		if(o.body && !o.body.test(content.body)) {
			return false;
		}

		//Metadata?
		if(o.date && !o.date.test(content.date)) {
			//bad data
			return false;
		}
		if(o.from && !o.from.test(content.from)) {
			//bad feed
			return false;
		}
		//if(mode === 'expanded') {
			//Not in listview
			if(o.author && !o.author.test(content.author)) {
				//bad author
				return false;
			}
			if(o.tag && !o.tag.test(content.tag)) {
				//bad tag
				return false;
			}
		//}
		return true;
	}

	function checkEntry(content, element, rx, className, mode) {
		var mrx = false, matched = false;
		if(rx) {
			for(var i = 0, len = rx.length; i < len; i++) {
				mrx = rx[i];
				//console.log(i);
				//console.log(mrx);
				if(checkTree(content, mrx.tree, mode)) {
					//if (checkContent(content, mrx, mode)){
					matched = true;
					addClass(element, className);
					break;
				}
			}
		}
		return matched;
	}

	function checkTree(content, node, mode) {
		if(node) {
			if(!checkContent(content, node.o, mode)) {
				return false;
			}
			return checkTree(content, node.q, mode);
		}
		return true;
	}

	function getRegExp(o) {
		var items = o;
		if( typeof items === 'string') {
			items = formatTextAreaToList(items);
		}
		var rx = [];
		foreach(items, function(item) {
			var rex = parseExpression(item);
			rx.push(rex);
		});
		return rx;
	}

	function init() {
		GM_getValues(ID, KEY_OPTIONS, '', function(o) {
			miniWord = o.word_mini || miniWord;
			_options = checkOptions(o);
			initInterface();
			registerFeature(filterEntries, ID, {
				onlistviewtitle : true
			});
		});
	}
	init();

	registerEvent(ID, 'update', updateFilterEntries);
};
