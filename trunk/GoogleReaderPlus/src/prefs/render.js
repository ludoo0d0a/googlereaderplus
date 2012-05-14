function loadSkin(){
    var input = document.getElementById("theme_skin");
    var li = document.getElementById('skin_' + input.value);
    if (!li) {
        li = document.getElementById('skin_none');
    }
    //select theme
    if (li) {
        li.onclick(false, true);
    }
}

var lastPanel, lastLink;
function showPanel(hash){
     var n = hash.split('/');
	 var id = n[0], params=false;
	 if (n.length>1){
	 	params = unescape(n.shift().join('/'));
		if (params) {
			try {
				window.GRP_params = JSON.parse(params);
			} catch (e) {
			}
		}
	 }
	 	
	if (typeof window['run_' + id] == "function") {
        window['run_' + id].call(this, id);
    }
    var link = document.getElementById('l_' + id);
    if (lastLink) {
        lastLink.className = "";
    }
    if (link) {
        link.className = "on";
        showcat(link);
        lastLink = link;
    }
    var panel = document.getElementById('panel_' + id);
    if (lastPanel) {
        lastPanel.style.display = "none";
    }
    if (panel) {
        panel.style.display = "inline";
        lastPanel = panel;
        window.location.hash = '#' + id;
    }
}

function showcat(el, fromoutside){
    var wrap;
	if (fromoutside){
		wrap = gfe(el, 'wrap');
	}else{
		wrap=findParentNode(el, 'ul', 'wrap');
	}
    if (lastCat) {
        hide(lastCat);
    }
    show(wrap);
    lastCat = wrap;
}

var lastCat;
function renderScripts(){
    var list = document.getElementById('scriptlist');//ul#scriptlist
    var panels = document.getElementById('panels');
    var tplCheckbox = '<li id="l_{id}"><a href="javascript:showPanel(\'{id}\')"><input id="{id}" name="{id}" type="checkbox" /><label for="{id}" id="l{id}" title="{tdesc}">{name}{status}</label><span class="open">{dlink}</span></a></li>';
    var tplLink = '<li id="l_{id}"><a class="link" href="javascript:showPanel(\'{id}\')"><span class="linkblock">{name}</span><span class="open olink">{dlink}</span></a></li>';
    var tplPanelTitle = '<div class="title"><h2>{name}</h2><div id="paneldesc_{id}" class="desc">{desc}</div></div>';
    var tplPanelIframe = '<div class="title"><h2>{name}</h2><iframe src="{url}" width="700" height="620"></iframe></div>';
    var categories = group(GRP.scripts, 'category');
	var firstcat=true;
    iterate(categories, function(category, scripts){
        var ulcat;
		var incat=true;
        if (incat) {
            var licat = dh(list, 'li', {
                cls: 'category'
            });
            var html = '<span class="bullet">•</span><span id="t_cat_'+category+'">'+getCategory(lang, category)+'</span>';
			if (firstcat){
				firstcat=false;
				html+='<div id="expandall">'+getTextPrefs(lang, 'global', 'expandall', 'en', 'All')+'</div>';
			}
			var acat = dh(licat, 'a', {
                //text: getCategory(lang, category),
				html: html,
                href: '#'
            }, {
                click: function(e){
                    var li=findParentNode(e.target, 'li', 'category');
					showcat(li, true);
                }
            });
            ulcat = dh(licat, 'ul', {
                cls: 'wrap'
            });
            hide(ulcat);
        }else{
			ulcat = list;
		}
        html = '';
		
        iterate(scripts, function(id, script){
			script.dlink = '>';
			script.status=getSpanStatus(script.status);
			script.desc = script.desc||'';
			script.tdesc = script.desc.replace(/<[^>]*>/g,'');
			
            var t = (script.link) ? tplLink : tplCheckbox;
            html += fillTpl(t, script);
            var body, panel = document.getElementById('panel_' + id);
            if (!panel) {
                //create panels for descritpion
                panel = document.createElement('div');
                panel.id = "panel_" + id;
                panel.style.display = "none";
                script.shortcut = script.shortcut || '-';
                var tpl = (script.url) ? tplPanelIframe : tplPanelTitle;
                panel.innerHTML = fillTpl(tpl, script);
                //+body
                body = document.createElement('div');
                body.className = "body";
                panel.appendChild(body);
                panels.appendChild(panel);
                script.dlink = '&gt;';
            } else {
                var header = document.createElement('div');
                header.className = 'header';
                header.innerHTML = fillTpl(tplPanelTitle, script);
                insertFirst(header, panel);
                body = gfe(panel, 'body');
            }
            renderOptions(body, script);
            renderShortcuts(panel, script);
        }, this, true);
        if (incat) {
            ulcat.innerHTML = html;
        } else {
            ulcat.innerHTML += html;
        }
    });
    addClass(list.firstElementChild, 'first');
    addClass(list.lastElementChild, 'last');
    showcat(list, true);
	
	//expand all 
	var togall=false, eall = get_id('expandall');
	if (eall){
		eall.onclick=function(e){
			e.stopPropagation();
			if (togall){
			//if (hasClass(eall, 'expanded')){
				removeClass(eall, 'expanded');
				toggleCategories(true);
			}else{
				addClass(eall, 'expanded');
				toggleCategories(false);
			}
			togall=!togall;
		};
	}
}

function toggleCategories(expand){
	var s = get_id('scriptlist');
	var uls = s.getElementsByClassName('wrap');
	foreach(uls, function(ul){
		showas(ul, expand);
	});
}

var tplInput = '<label class="lbl {lcls}" id="t_{id}" for="{id}">{text}</label><input id="{id}" class="{cls}" name="{id}" type="{input}" value="{value}"{extra}"/><br/>';
var tplTextarea = '<label class="lbl lbltxtarea {lcls}" id="t_{id}" for="{id}">{text}</label><textarea style="" class="{cls}" id="{id}" name="{id}" cols="{cols}" rows="{rows}"{extra}">{value}</textarea><br/>';
var tplCheckbox = '<input id="{id}" name="{id}" type="checkbox"/><label class="lbl_checkbox" id="t_{id}" for="{id}">{text}</label><br/>';
var tplSelect = '<label class="lbl {lcls}" id="t_{id}">{text}</label><select name="{id}" id="{id}">{options}</select><br/><br/>';
var tplSelectOption = '<option value="{id}"{checked}>{value}</option>';
var tplButton = '<button value="{value}" name="{name}" id="{id}" onclick="javascript:{action}();return false;">{text}</button>';
var tplPara = '<p class="{cls}" id="t_{id}">{text}</p>';
var tplHeader = '<h{level}>{text}</h{level}>';
var tplDiv = '<div class="{cls}" id="{id}"></div>';
function renderOptions(body, script){
    if (!script.options) {
        return;
    }
    var cfg, xtype, value, html = '';
    iterate(script.options, function(option, cfg){
        if (typeof cfg === "object") {
            cfg.value = cfg.value || '';
            value = cfg.value;
            xtype = cfg.xtype || (typeof value);
        } else {
            value = cfg;
            xtype = typeof value;
        }
        var o = {
            text: getTextPrefs(lang, script.id, option, 'en') || ('-' + option + '-'),
            id: script.id + '_' + option,
            value: value,
            extra: '',
            lcls: cfg.lcls || '',
            input: cfg.input || 'text',
            cls: cfg.cls || ''
        };
        if (!document.getElementById(o.id)) {
            if (cfg.parent) {
                html += "<div class='mto' alt='" + cfg.parent + "'>";
            }
			
            if (xtype === "boolean") {
                html += fillTpl(tplCheckbox, o);
            } else if (xtype === "string") {
                if (cfg.size) {
                    o.extra = ' size="' + cfg.size + '"';
                }
                html += fillTpl(tplInput, o);
            } else if (xtype === "password") {
                if (cfg.size) {
                    o.extra = ' size="' + cfg.size + '"';
                }
                html += fillTpl(tplPwd, o);
            } else if (xtype === "number") {
                o.size = cfg.size || 3;
                o.extra = ' size="' + o.size + '"';
                html += fillTpl(tplInput, o);
            } else if (xtype === "textarea") {
                o.rows = cfg.rows || 5;
                o.cols = cfg.cols || 70;
				if (cfg.list && isArray(o.value)){
					o.value=o.value.join(cfg.sep||'\n');
				}
                html += fillTpl(tplTextarea, o);
            } else if (xtype === "p") {
                html += fillTpl(tplPara, o);
            }else if (xtype === "h") {
                o.level = o.level || 3;
				html += fillTpl(tplHeader, o);
            } else if (xtype === "html") {
                html += value;
            } else if (xtype === "select") {
                o.options = '';
                iterate(cfg.values, function(id, vo){
                    text = ''; //getTextPrefs(lang, script.id, option+'_'+id);
                    o.options += fillTpl(tplSelectOption, {
                        id: id,
                        value: vo.value || vo,
                        checked: (vo.checked ? ' checked="checked"' : '')
                    });
                });
                html += fillTpl(tplSelect, o);
            } else if (xtype === "button") {
                o.value= o.value||'';
				o.name= o.name||o.id;
				o.action= cfg.action||'void';
				html += fillTpl(tplButton, o);
            } else if (xtype === "crud") {
                o.cls = '_crud' + ((o.cls) ? (' ' + o.cls) : '');
                html += fillTpl(tplDiv, o);
            } else if (xtype === "picker") {
                o.cls = 'picker' + ((o.cls) ? (' ' + o.cls) : '');
                if (cfg.size) {
                    o.extra = ' size="' + cfg.size + '"';
                }
                html += fillTpl(tplInput, o);
            }
            if (cfg.parent) {
                html += "</div>";
            }
        }
    });
    body.innerHTML += html;
}

var EDITORS = {};
/*
function extraFeatures(){
    textareaTab();
	//renderCodes();
}*/
function renderCodes(){
    //var CODEMIRROR_PATH = 'http://marijn.haverbeke.nl/codemirror';
    var el=get_id('relook_css'), CODEMIRROR_PATH = chrome.extension.getURL('lib/codemirror');
	//var localcss = chrome.extension.getURL('css/editor.css');
    if (CodeMirror && el) {
        try {
			EDITORS.relook_css = CodeMirror.fromTextArea(el, {
				//EDITORS.relook_css = new CodeMirror(CodeMirror.replace(document.getElementById('relook_css')), {
				/*parserfile: "parsecss.js",
				stylesheet: [CODEMIRROR_PATH + "/css/csscolors.css", 'css/editor.css'],
				path: CODEMIRROR_PATH + "/js/",
				*/
				tabMode: 'shift',
				height: '500px'
			});
		}catch(e){
			console.error(e);
		}
    }
}

function renderpicker(){
    if (window.jscolor){
		jscolor.init();
	}
}

function getSpanStatus(status){
	var txt='';
	if (status){
		var stat = getTextPrefs(lang, 'global', 's'+status, false,'');
		if (stat) {
			txt = ' <span class="' + status + '">' + stat + '</span>';
		}
	}
	return txt;
}
			
function renderSkins(){
    var last;
	var SKINS_PATH = 'http://googlereaderplus.googlecode.com/svn/trunk/GoogleReaderPlus/images/skins/';
    var list = document.getElementById('skinlist');
    list.innerHTML = '';
    iterate(GRP.skins, function(id, o){
        var li = document.createElement('li');
        var a = document.createElement('a');
        li.id = 'skin_' + id;
		a.innerHTML = o.name+getSpanStatus(o.status);
		
        a.href = '#';
        li.appendChild(a);
        list.appendChild(li);
        li.onclick = function(e, simulate){
            var c = this;
            if (last) {
                last.className = "";
            }
            addClass(c, "on");
            var thumb = document.getElementById("thumb");
            var id = c.id.replace('skin_', '');
            var input = document.getElementById("theme_skin");
            var mtos = document.getElementsByClassName('mto');
            if (mtos && mtos.length > 0) {
                foreach(mtos, function(mto){
                    addClassIf(mto, 'hidden', (id !== mto.getAttribute('alt')));
                });
            }
            var skindesc = get_id("skindesc");
            if (id === "none") {
                input.value = "";
                addClass(thumb, "hidden", true);
				addClass(skindesc, "hidden", true);
            } else {
                input.value = id;
                thumb.className = "";
				thumb.src = "images/loading-bar300.gif";
                thumb.src = o.pic || (SKINS_PATH+ id + ".png");
                var athumb = document.getElementById("athumb");
                if (o.ref) {
                    athumb.href = o.ref;
                    athumb.target = 'blank';
                } else {
                    athumb.href = '#';
                    athumb.target = '';
                    athumb.removeAttribute('target');
                }
                if (skindesc) {
                    skindesc.innerHTML = (o.desc) ? (o.name + ' - ' + o.desc) : o.name;
                }
                athumb.title = o.name;
                //check theme feature
                if (!simulate) {
                    var checktheme = document.getElementById("theme");
                    if (checktheme) {
                        checktheme.checked = true;
                    }
                }
            }
            last = c;
        };
    });
    addClass(list.firstChild, 'first');
    addClass(list.lastChild, 'last');
}

function createReport(report){
    var list = document.getElementById('sysinfo');
    if (list) {
        list.innerHTML = '';
        recurseList(list, report, true);
    }
}

function recurseList(root, list, first){
    var ul = document.createElement('ul');
    if (!first) {
        ul.className = "mnu rounded info";
    }
    for (var o in list) {
        var li = document.createElement('li');
        if (typeof list[o] === "object") {
            ul.innerHTML += "<span class='info-title'>" + o + "</span>";
            recurseList(ul, list[o]);
        } else {
            li.innerHTML = '<span>' + o + " : " + list[o] + '</span>';
            ul.appendChild(li);
        }
    }
    root.appendChild(ul);
}

function disableAllScripts(){
    iterate(GRP.scripts, function(id, script){
        prefs[id] = false;
    });
}

function setpackage(id){
    disableAllScripts();
    if (id === "reset") {
        //Refresh page to reload all options for each script
        var sure = confirm(getTextPrefs(lang, 'pack', 'confirmdel'));
        if (sure) {
            prefs = {};
            renderPrefs();
            saveprefs(true, true);
        }
        return;
    } else {
        prefs = setPackage(id, prefs);
        info(getTextPrefs(lang, 'pack', 'done'));
    }
    renderPrefs();//update
}
var externalthemes={};
function renderPreviewTheme(){
	externalthemes = GRP.getExternalThemes();
	var theme = document.getElementById('theme_externaltheme');
	theme.addEventListener('change', previewtheme, false);
	theme.addEventListener('click', previewtheme, false);
	theme.addEventListener('keyup', previewtheme, false);
	previewtheme();
}
var reGmailTheme = /^gmail_/;
var reGooglePublicTheme = /^public_/;
var reGoogleEditorTheme = /^editor_/;
function previewtheme(){
	var theme = document.getElementById('theme_externaltheme');
	var prview = document.getElementById('thprview');
	if (!prview) {
		dh(theme, 'div', {
			id: 'thprview',
			position: 'after',
			html: '<img id="imgprview"/>'
		});
	}
	var imgprview = document.getElementById('imgprview');
	var code = theme.value;
	var otheme = externalthemes[code];
	if (reGmailTheme.test(code)) {
		code=code.replace(reGmailTheme, '');
		imgprview.src = "https://mail.google.com/mail/images/2/5/" + code + "/preview1.png";
		removeClass(imgprview, 'hidden');
	}else if (reGooglePublicTheme.test(code)) {
		imgprview.src = otheme + "s104/";
		removeClass(imgprview, 'hidden');
	}else if (reGoogleEditorTheme.test(code)) {
		imgprview.src = otheme + "s144/";
		removeClass(imgprview, 'hidden');
	}else{
		addClass(imgprview, 'hidden', true);
		imgprview.src = "";
	}
}
