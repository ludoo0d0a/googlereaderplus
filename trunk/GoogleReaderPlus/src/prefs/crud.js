var tplCruds = {};
function loadCruds(id){
    lang = lang || 'en';
    var gp = getTextPrefs;
    tplCruds = {
        favicons_domains: {
            tpl: '{{%IMPLICIT-ITERATOR}}<table class="crud rounded" summary="{{summary}}">' +
            '<thead><tr>{{#headers}}<th scope="col" class="crud_header_{{.}}">{{.}}</th>{{/headers}}</tr></thead>' +
            '<tfoot><tr><td colspan="{{colspan}}"><em>{{desc}}</em></td>' +
            '<td><a id="t_{{$name}}_add" class="add" href="javascript:add(\'{{$name}}\');">{{txt_add}}</a></td></tr></tfoot>' +
            '<tbody>{{#rows}} ' +
            '<tr><td><a href="{{url}}" target="_blank"><span>{{#ico}}<img alt="favicon" class="favicon" title="Preview" src="{{icon}}" width="16" height="16"/>{{/ico}}{{etext}}</span></a></td>' +
            '<td><a class="action" id="t_{{$name}}_edit" href="javascript:add(\'{{$name}}\', \'{{url}}\');">{{txt_edit}}</a></td>' +
            '<td><a class="action" id="t_{{$name}}_remove" href="javascript:remove(\'{{$name}}\', \'{{url}}\');">{{txt_remove}}</a></td>' +
            '</tr>{{/rows}}</tbody></table>',
            data: {
                name: 'favicons',
                ico: true,
                colspan: 2,
                headers: ['url', 'edit', 'remove'],
                summary: getText(lang, 'favicons', 'summary'),
                desc: getText(lang, 'favicons', 'desc'),
                txt_add: getText(lang, 'filter', 'add'),
                txt_edit: getText(lang, 'filter', 'edit'),
                txt_remove: getText(lang, 'filter', 'remove'),
                url: function(){
                    return normalizeUrl(this.url);
                },
                rows: function(){
                    return removeNull(map2array(prefs.favicons_domains, 'url', 'icon'));
                },
                etext: function(){
                    return ellipsis(this.url, 60);
                }
            }
        },
        column_filter: {
            tpl: '{{%IMPLICIT-ITERATOR}}<table class="crud rounded" summary="{{summary}}">' +
            '<thead><tr>{{#headers}}<th scope="col" class="crud_header_{{.}}">{{.}}</th>{{/headers}}</tr></thead>' +
            '<tfoot><tr><td colspan="{{colspan}}"><em>{{desc}}</em></td>' +
            '<td><a id="t_{{$name}}_add" class="add" href="javascript:add(\'{{$name}}\');">{{txt_add}}</a></td></tr></tfoot>' +
            '<tbody>{{#rows}} ' +
            '<tr><td><a href="{{.}}" target="_blank"><span>{{#ico}}<img alt="favicon" class="favicon" title="Preview" src="{{icon}}" width="16" height="16"/>{{/ico}}{{etext}}</span></a></td>' +
            '<td><a class="action" id="t_{{$name}}_edit" href="javascript:add(\'{{$name}}\', \'{{.}}\');">{{txt_edit}}</a></td>' +
            '<td><a class="action" id="t_{{$name}}_remove" href="javascript:remove(\'{{$name}}\', \'{{.}}\');">{{txt_remove}}</a></td>' +
            '</tr>{{/rows}}</tbody></table>',
            data: {
                name: 'column',
                ico: false,
                colspan: 2,
                headers: ['url', 'edit', 'remove'],
                summary: getText(lang, 'column', 'summary'),
                desc: getText(lang, 'column', 'desc'),
                txt_add: getText(lang, 'filter', 'add'),
                txt_edit: getText(lang, 'filter', 'edit'),
                txt_remove: getText(lang, 'filter', 'remove'),
                rows: function(){
                    //return removeNull(map2array(prefs.column_filter, 'url', 'exclude'));
                    return removeNull(prefs.column_filter);
                },
                etext: function(){
                    return ellipsis(this['.'], 60);
                }
            }
        },
        preview_filter: {
            tpl: '{{%IMPLICIT-ITERATOR}}<table class="crud rounded" summary="{{summary}}">' +
            '<thead><tr>{{#headers}}<th scope="col" class="crud_header_{{.}}">{{.}}</th>{{/headers}}</tr></thead>' +
            '<tfoot><tr><td colspan="{{colspan}}"><em>{{desc}}</em></td>' +
            '<td><a id="t_{{$name}}_add" class="add" href="javascript:add(\'{{$name}}\');">{{txt_add}}</a></td></tr></tfoot>' +
            '<tbody>{{#rows}} ' +
            '<tr><td><a href="{{.}}" target="_blank"><span>{{#ico}}<img alt="favicon" class="favicon" title="Preview" src="{{icon}}" width="16" height="16"/>{{/ico}}{{etext}}</span></a></td>' +
            '<td><a class="action" id="t_{{$name}}_edit" href="javascript:add(\'{{$name}}\', \'{{.}}\');">{{txt_edit}}</a></td>' +
            '<td><a class="action" id="t_{{$name}}_remove" href="javascript:remove(\'{{$name}}\', \'{{.}}\');">{{txt_remove}}</a></td>' +
            '</tr>{{/rows}}</tbody></table>',
            data: {
                name: 'preview',
                ico: false,
                colspan: 2,
                headers: ['url', 'edit', 'remove'],
                summary: getText(lang, 'preview', 'summary'),
                desc: getText(lang, 'preview', 'desc'),
                txt_add: getText(lang, 'filter', 'add'),
                txt_edit: getText(lang, 'filter', 'edit'),
                txt_remove: getText(lang, 'filter', 'remove'),
                rows: function(){
                    return removeNull(prefs.preview_filter);
                },
                etext: function(){
                    return ellipsis(this['.'], 60);
                }
            }
        },
        lightbox_filter: {
            tpl: '{{%IMPLICIT-ITERATOR}}<table class="crud rounded" summary="{{summary}}">' +
            '<thead><tr>{{#headers}}<th scope="col" class="crud_header_{{.}}">{{.}}</th>{{/headers}}</tr></thead>' +
            '<tfoot><tr><td colspan="{{colspan}}"><em>{{desc}}</em></td>' +
            '<td><a id="t_{{$name}}_add" class="add" href="javascript:add(\'{{$name}}\');">{{txt_add}}</a></td></tr></tfoot>' +
            '<tbody>{{#rows}} ' +
            '<tr><td><a href="{{.}}" target="_blank"><span>{{#ico}}<img alt="favicon" class="favicon" title="Preview" src="{{icon}}" width="16" height="16"/>{{/ico}}{{etext}}</span></a></td>' +
            '<td><a class="action" id="t_{{$name}}_edit" href="javascript:add(\'{{$name}}\', \'{{.}}\');">{{txt_edit}}</a></td>' +
            '<td><a class="action" id="t_{{$name}}_remove" href="javascript:remove(\'{{$name}}\', \'{{.}}\');">{{txt_remove}}</a></td>' +
            '</tr>{{/rows}}</tbody></table>',
            data: {
                name: 'lightbox',
                ico: false,
                colspan: 2,
                headers: ['url', 'edit', 'remove'],
                summary: getText(lang, 'lightbox', 'summary'),
                desc: getText(lang, 'lightbox', 'desc'),
                txt_add: getText(lang, 'filter', 'add'),
                txt_edit: getText(lang, 'filter', 'edit'),
                txt_remove: getText(lang, 'filter', 'remove'),
                rows: function(){
                    return removeNull(prefs.lightbox_filter);
                },
                etext: function(){
                    return ellipsis(this['.'], 60);
                }
            }
        },
        replacer_items: {
            tpl: '{{%IMPLICIT-ITERATOR}}<table class="crud rounded" summary="{{summary}}">' +
            '<thead><tr>{{#headers}}<th scope="col" class="crud_header_{{.}}">{{.}}</th>{{/headers}}</tr></thead>' +
            '<tfoot><tr><td colspan="{{colspan}}"><em>{{desc}}</em></td>' +
            '<td><a id="t_{{$name}}_add" class="add" href="javascript:add(\'{{$name}}\');">{{txt_add}}</a></td></tr></tfoot>' +
            '<tbody>{{#rows}} ' +
            '<tr><td><a href="http://wedata.net/items/{{id}}" target="_blank">{{id}}</a></td><td>{{.}}</td><td><span class="url_replacer">{{url}}</span><br/>{{search}}<br/>{{replace}}</td>' +
            '<td><a class="action" id="t_{{$name}}_edit" href="javascript:add(\'{{$name}}\', \'{{.}}\');">{{txt_edit}}</a></td>' +
            '<td><a class="action" id="t_{{$name}}_remove" href="javascript:remove(\'{{$name}}\', \'{{.}}\');">{{txt_remove}}</a></td>' +
            '</tr>{{/rows}}</tbody></table>',
            data: {
                name: 'replacer',
                ico: false,
                colspan: 4,
				save:true,
                //headers: [gp(lang, 'replacer', 'title'), gp(lang, 'replacer', 'link') + '; ' + gp(lang, 'replacer', 'from') + '; ' + gp(lang, 'replacer', 'to'), 'edit', 'remove'],
				headers: [ 'id', 'title', 'link', 'edit', 'remove'],
                summary: getText(lang, 'replacer', 'summary'),
                desc: getText(lang, 'replacer', 'desc'),
                txt_add: getText(lang, 'filter', 'add'),
                txt_edit: getText(lang, 'filter', 'edit'),
                txt_remove: getText(lang, 'filter', 'remove'),
                rows: function(){
                    //var a = removeNull(prefs.replacer_items);
                    var a = map2array(removeNull(prefs.replacer_items), '.', '', true);
                    return a;
                }
            }
        },
        translate_filter: {
            tpl: '{{%IMPLICIT-ITERATOR}}<table class="crud rounded" summary="{{summary}}">' +
            '<thead><tr>{{#headers}}<th scope="col" class="crud_header_{{.}}">{{.}}</th>{{/headers}}</tr></thead>' +
            '<tfoot><tr><td colspan="{{colspan}}"><em>{{desc}}</em></td>' +
            '<td><a id="t_{{$name}}_add" class="add" href="javascript:add(\'{{$name}}\');">{{txt_add}}</a></td></tr></tfoot>' +
            '<tbody>{{#rows}} ' +
            '<tr><td><a href="{{.}}" target="_blank"><span>{{#ico}}<img alt="favicon" class="favicon" title="Preview" src="{{icon}}" width="16" height="16"/>{{/ico}}{{etext}}</span></a></td>' +
            '<td><a class="action" id="t_{{$name}}_edit" href="javascript:add(\'{{$name}}\', \'{{.}}\');">{{txt_edit}}</a></td>' +
            '<td><a class="action" id="t_{{$name}}_remove" href="javascript:remove(\'{{$name}}\', \'{{.}}\');">{{txt_remove}}</a></td>' +
            '</tr>{{/rows}}</tbody></table>',
            data: {
                name: 'translate',
                ico: false,
                colspan: 2,
                headers: ['url', 'edit', 'remove'],
                summary: getText(lang, 'translate', 'summary'),
                desc: getText(lang, 'translate', 'desc'),
                txt_add: getText(lang, 'filter', 'add'),
                txt_edit: getText(lang, 'filter', 'edit'),
                txt_remove: getText(lang, 'filter', 'remove'),
                rows: function(){
                    //return removeNull(map2array(prefs.translate_filter, 'url', 'exclude'));
                    return removeNull(prefs.translate_filter);
                },
                etext: function(){
                    return ellipsis(this['.'], 60);
                }
            }
        },
        readability_filter: {
            tpl: '{{%IMPLICIT-ITERATOR}}<table class="crud rounded" summary="{{summary}}">' +
            '<thead><tr>{{#headers}}<th scope="col" class="crud_header_{{.}}">{{.}}</th>{{/headers}}</tr></thead>' +
            '<tfoot><tr><td colspan="{{colspan}}"><em>{{desc}}</em></td>' +
            '<td><a id="t_{{$name}}_add" class="add" href="javascript:add(\'{{$name}}\');">{{txt_add}}</a></td></tr></tfoot>' +
            '<tbody>{{#rows}} ' +
            '<tr><td><a href="{{.}}" target="_blank"><span>{{#ico}}<img alt="favicon" class="favicon" title="Preview" src="{{icon}}" width="16" height="16"/>{{/ico}}{{etext}}</span></a></td>' +
            '<td><a class="action" id="t_{{$name}}_edit" href="javascript:add(\'{{$name}}\', \'{{.}}\');">{{txt_edit}}</a></td>' +
            '<td><a class="action" id="t_{{$name}}_remove" href="javascript:remove(\'{{$name}}\', \'{{.}}\');">{{txt_remove}}</a></td>' +
            '</tr>{{/rows}}</tbody></table>',
            data: {
                name: 'readability',
                ico: false,
                colspan: 2,
                headers: ['url', 'edit', 'remove'],
                summary: getText(lang, 'readability', 'summary'),
                desc: getText(lang, 'readability', 'desc'),
                txt_add: getText(lang, 'filter', 'add'),
                txt_edit: getText(lang, 'filter', 'edit'),
                txt_remove: getText(lang, 'filter', 'remove'),
                rows: function(){
                    //return removeNull(map2array(prefs.readability_filter, 'url', 'exclude'));
                    return removeNull(prefs.readability_filter);
                },
                etext: function(){
                    return ellipsis(this['.'], 60);
                }
            }
        }
    };
    if (id) {
        loadCRUD(id, tplCruds[id]);
    } else {
        iterate(tplCruds, function(id, otpl){
            loadCRUD(id, otpl);
        });
    }
}

/**
 *
 * @param {Object} id  Id of Dom Element
 * @param {Object} name Name of prefs to get data
 */
function loadCRUD(id, o){
    var el = document.getElementById(id);
    if (el) {
        var html = '';
        if (!o) {
            o = tplCruds[id];
        }
        //html = fillTemplate(o);
        html = Mustache.to_html(o.tpl, o.data);
        el.innerHTML = html;
		
		if (o.data.save) {
			dh(el, 'button', {
				text: 'save in the cloud'
			}, {
				click: function(){
					mycore.extension.sendRequest({
						message: "savecloud",
						db: id
					}, function(a){
						info('cloud save done');
					});
					return false;
				}
			});
		}
    }
}

function fillTemplate(o){
    var html = '', v = o.data || {};
    if (o.tpls) {
        //here v must be an object
        iterate(o.tpls, function(key, otpl){
            v[key] = fillTemplate(otpl);
        });
    }
    if (isArray(v)) {
        html = iterateFillTpl(v, o.tpl, o.formatData);
    } else if (!isObjectEmpty(v)) {
        if (o.formatData) {
            html = iterateFillTpl(v, o.tpl, o.formatData);
        } else {
            html = fillTpl(o.tpl, v);
        }
    }
    return html;
}

function iterateFillTpl(data, tpl, formatData){
    var html = '';
    iterate(data, function(k, o){
        var v = (formatData) ? formatData.call(this, k, o) : {
            text: o
        };
        html += fillTpl(tpl, v);
    });
    return html;
}

function remove(id, key){
    if (id === 'favicons') {
        return removefavicon(key);
    } else if (id === 'replacer') {
        return removeReplacerItems(key);
    } else {
        //if (id === 'column' || id === 'preview' || id === 'lightbox')
        return removefiltersites(id, key);
    }
}

function add(id, key){
    if (id === 'favicons') {
        return addfavicon(key);
    } else if (id === 'replacer') {
        return addReplacerItems(id, key);
    } else {
        //if (id === 'column' || id === 'preview' || id === 'lightbox')
        return addfiltersites(id, key);
    }
}

/**
 * CRUD for filter sites
 *
 */
function addfiltersites(id, urlin){
    var DEFAULT_SITE = '';
    var DEFAULT_URL = '';
    var url = urlin || DEFAULT_SITE;
    url = prompt(getTextPrefs(lang, id, 'entersite'), url);
    if (!url) {
        return;
    }
    if (!prefs[id + '_filter']) {
        prefs[id + '_filter'] = [];
    }
    if (findInArray(prefs[id + '_filter'], url) === false) {
        prefs[id + '_filter'].push(url);
        //Refresh
        loadCRUD(id + '_filter');
    }
}

function removefiltersites(id, url){
    var i = findInArray(prefs[id + '_filter'], url);
    if (i!==false && i>=0) {
        delete prefs[id + '_filter'][i];
		//prefs[id + '_filter'].splice(i,1);
        //Refresh
        loadCRUD(id + '_filter');
    }
}

/**
 * CRUD for Favicons
 *
 */
function addfavicon(urlin){
    var DEFAULT_SITE = '';
    var DEFAULT_URL = '';
    var url = urlin || DEFAULT_SITE;
    url = prompt(getTextPrefs(lang, 'favicons', 'entersite'), url);
    if (!url) {
        return;
    }
    var icon = prefs.favicons_domains[url] || (cleanUrl(getDomain(url)) + '/favicon.ico');
    //Enter the icon url
    var promptUrl = getTextPrefs(lang, 'favicons', 'prompticon');
    icon = prompt(promptUrl, icon);
    if (icon === '') {
        //go to find
        mycore.extension.sendRequest({
            message: "geticon",
            url: url
        }, function(a){
            // ->iconget 
            addfaviconNext(a.url, a.icon, a.title);
        });
    } else {
        addfaviconNext(url, icon, '');
    }
}

function addfaviconNext(url, icon, title){
    if (!icon) {
        return;
    }
    var favicon = {
        url: url,
        icon: icon
    };
    /*if (urlin && url != urlin) {
     //remove old
     removefavicon(urlin);
     }*/
    savefavicon(favicon.url, favicon.icon);
}

//WARN: used too from background
function savefavicon(url, icon, title){
    prefs.favicons_domains[url] = icon;
    loadCRUD('favicons_domains');
}

function removefavicon(url){
    delete prefs.favicons_domains[url];
	//prefs.favicons_domains.splice(url,1);
    loadCRUD('favicons_domains');
}

/**
 * Replacer
 *
 */
function addReplacerItems(id, key){
    var p = window.GRP_params||{};
	var title = key || p.title || 'Image site.web';
    title = prompt(getTextPrefs(lang, 'replacer', 'prompttitle'), title);
    if (!title) {
        return;
    }
    if (!key && prefs.replacer_items[title]) {
        //on add, check if key already exists
        alert(getTextPrefs(lang, 'global', 'alreadyexist'));
        return;
    }
    var def = prefs.replacer_items[key] ||
    {
        url: p.url || 'http://www.WEBSITE.COM',
        search: p.search || 'xpath://div[@class="CLASSNAME"]',
        replace: p.replace || "$1"
    };
    url = prompt(getTextPrefs(lang, 'replacer', 'link'), def.url);
    if (!url) {
        return;
    }
    search = prompt(getTextPrefs(lang, 'replacer', 'from'), def.search);
    if (!search) {
        return;
    }
	var replace = def.replace;
	if (!(/^xpath:|^css:/.test(search))) {
		//Replace if NOT xpath or css
		replace = prompt(getTextPrefs(lang, 'replacer', 'to'), def.replace);
	}
	
	if (replace) {
		var newItem = {
			url: url,
			search: search,
			replace: replace
		};
		if (def.id) {
			newItem.id = def.id;
		}
		saveReplacerNext(title, newItem);
	}
	
}

function saveReplacerNext(title, newItem){
    if (!prefs.replacer_items) {
        prefs.replacer_items = {};
    }
    prefs.replacer_items[title] =newItem;
	prefs._replacer_changed=true;
    loadCRUD('replacer_items');
}

function removeReplacerItems(key){
    delete prefs.replacer_items[key];
	//prefs.replacer_items.splice(key,1);
    loadCRUD('replacer_items');
}
