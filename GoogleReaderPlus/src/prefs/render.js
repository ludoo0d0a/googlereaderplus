
function loadSkin(){
    var input = document.getElementById("theme_skin");
    var li = document.getElementById('skin_' + input.value);
    if (!li) {
        li = document.getElementById('skin_none');
    }
    //no theme is no theme
    if (li) {
        li.onclick();
    }
}

var lastPanel, lastLink;
function showPanel(id){
    if (typeof window['run_' + id] == "function") {
        window['run_' + id].call(this, id);
    }
    var link = document.getElementById('l_' + id);
    if (lastLink) {
        lastLink.className = "";
    }
    if (link) {
        link.className = "on";
        lastLink = link;
    }
    
    var panel = document.getElementById('panel_' + id);
    if (lastPanel) {
        lastPanel.style.display = "none";
    }
    if (panel) {
        panel.style.display = "inline";
        lastPanel = panel;
		window.location.hash='#'+id;
    }
}

function renderScripts(){
    var list = document.getElementById('scriptlist');
    var panels = document.getElementById('panels');
    list.innerHTML = 'In progress...';
    var html = '';
    var tplCheckbox = '<li id="l_{id}"><a href="javascript:showPanel(\'{id}\')"><input id="{id}" name="{id}" type="checkbox" /><label for="{id}" id="l{id}" title="{desc}">{name}</label><span class="open">{dlink}</span></a></li>';
    var tplLink = '<li id="l_{id}"><a class="link" href="javascript:showPanel(\'{id}\')"><span class="linkblock">{name}</span><span class="open olink">{dlink}</span></a></li>';
    var tplPanelTitle = '<div class="title"><h2>{name}</h2><div id="paneldesc_{id}" class="desc">{desc}</div></div>';
    var tplPanelIframe = '<div class="title"><h2>{name}</h2><iframe src="{url}" width="700" height="620"></iframe></div>';
    for (var i = 0, len = GRP.scripts.length; i < len; i++) {
        var script = GRP.scripts[i];
        script.dlink = '>';
        var t = (script.link) ? tplLink : tplCheckbox;
        html += fillTpl(t, script);
        var body, panel = document.getElementById('panel_' + script.id);
        if (!panel) {
            //create panels for descritpion
            panel = document.createElement('div');
            panel.id = "panel_" + script.id;
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
			
			renderOptions(body, script);
        } else {
            var header = document.createElement('div');
            header.className = 'header';
            header.innerHTML = fillTpl(tplPanelTitle, script);
            body = getFirstNode(panel);
            panel.insertBefore(header, body);
        }
        renderShortcuts(panel, script);    
    }
    list.innerHTML = html;
}

var tplInput = '<label class="lbl" id="t_{id}" for="{id}">{text}</label><input id="{id}" name="{id}" type="text" value="{value}" {extra}"/><br/>';
var tplTextarea = '<label class="lbl" id="t_{id}" for="{id}">{text}</label><textarea id="{id}" name="{id}" cols="{cols}" rows="{rows}" {extra}">{value}</textarea><br/>';
var tplCheckbox = '<input id="{id}" name="{id}" type="checkbox"/><label class="lbl_checkbox" id="t_{id}" for="{id}">{text}</label><br/>';
var tplSelect = '<label class="lbl" id="t_{id}">{text}</label><select name="{id}" id="{id}">{options}</select><br/>';
var tplSelectOption = '<option value="{id}"{checked}>{value}</option>';
var tplPara = '<p class="{cls}" id="t_{id}">{text}</p>';
var tplDiv = '<div class="{cls}" id="{id}"></div>';

function renderOptions(body, script){
    if (!script.options) {
        return;
    }
    
    var cfg, xtype, value, html = '';
    iterate(script.options, function(option, cfg){
        if (typeof cfg === "object") {
            cfg.value=cfg.value||'';
			value = cfg.value;
            xtype = cfg.xtype || (typeof value);
        } else {
            value = cfg;
            xtype = typeof value;
        }
        
        var o = 
        {
            text: '-', /*getText(lang, script.id, option),*/
            id: script.id + '_' + option,
            value: value,
            extra: ''
        };
        if (!document.getElementById(o.id)) {
            if (xtype === "boolean") {
				html += fillTpl(tplCheckbox, o);
			} else if (xtype === "string") {
				html += fillTpl(tplInput, o);
			} else if (xtype === "number") {
				o.size = o.size || 3;
				o.extra = ' size="' + o.size + '"';
				html += fillTpl(tplInput, o);
			} else if (xtype === "textarea") {
				o.rows = cfg.rows || 5;
				o.cols = cfg.cols || 70;
				html += fillTpl(tplTextarea, o);
			} else if (xtype === "p") {
				o.cls = cfg.cls || '';
				html += fillTpl(tplPara, o);
			} else if (xtype === "html") {
				html += value;
			} else if (xtype === "select") {
				o.options = '';
				iterate(cfg.values, function(id, vo){
					text = ''; //getText(lang, script.id, option+'_'+id);
					o.options += fillTpl(tplSelectOption, 
					{
						id: id,
						value: vo.value || vo,
						checked: (vo.checked ? ' checked="checked"' : '')
					});
				});
				html += fillTpl(tplSelect, o);
			} else if (xtype === "crud") {
				o.cls='_crud';
				html += fillTpl(tplDiv, o);
			}
        }
    });
    body.innerHTML = html;
}

function renderSkins(){
    var last;
    var list = document.getElementById('skinlist');
    list.innerHTML = '';
    for (var i = 0, len = GRP.skins.length; i < len; i++) {
        var o = GRP.skins[i];
        var li = document.createElement('li');
        var a = document.createElement('a');
        li.id = 'skin_' + o.id;
        a.innerHTML = o.name;
        a.href = '#';
        li.appendChild(a);
        list.appendChild(li);
        var id = o.id;
        li.onclick = function(){
            var c = this;
            if (last) {
                last.className = "";
            }
            c.className = "on";
            var thumb = document.getElementById("thumb");
            var id = c.id.replace('skin_', '');
            var input = document.getElementById("theme_skin");
            if (id === "none") {
                input.value = "";
                thumb.className = "hidden";
            } else {
                input.value = id;
                thumb.className = "";
                thumb.src = "skin/img/" + id + ".png";
                //check theme feature
                var checktheme = document.getElementById("theme");
                if (checktheme) {
                    checktheme.checked = true;
                }
            }
            last = c;
        };
    }
}

function createReport(report){
    var list = document.getElementById('sysinfo');
    list.innerHTML = '';
    recurseList(list, report);
}

function recurseList(root, list){
    var ul = document.createElement('ul');
    for (var o in list) {
        var li = document.createElement('li');
        if (typeof list[o] === "object") {
            ul.innerHTML += "<span class='info-title'>" + o + "</span>";
            recurseList(ul, list[o]);
        } else {
            li.innerHTML = o + " : " + list[o];
            ul.appendChild(li);
        }
    }
    root.appendChild(ul);
}

function disableAllScripts(){
    for (var i = 0, len = GRP.scripts.length; i < len; i++) {
        var script = GRP.scripts[i];
        prefs[script.id] = false;
    }
}

function setpackage(id){
    disableAllScripts();
    if (id === "reset") {
        //Refresh page to reload all options for each script
        var sure = confirm('This will ERASE and reset all your preferences. Are you sure ?');
        if (sure) {
            prefs = {};
            renderPrefs();
            saveprefs(true, true);
        }
        return;
    } else {
        for (var i = 0, len = GRP.packages[id].length; i < len; i++) {
            var o = GRP.packages[id][i];
            prefs[o] = true;
            prefs[o + '_skin'] = 'osxblack';
        }
    }
    renderPrefs();//update
}
