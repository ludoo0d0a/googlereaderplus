var tplCrudTableHeader = '<th scope="col" class="crud_header_{text}">{text}</th>';
var tplCrudTableRow = '<tr><td><a href="{url}" target="_blank"><span><img alt="favicon" class="favicon" title="Preview" src="{icon}" width="16" height="16"/>{text}</span></a></td>' +
'<td><a class="action" id="t_favicons_edit" href="javascript:add(\'favicons\', \'{id}\');">edit</a></td>' +
'<td><a class="action" id="t_favicons_remove" href="javascript:remove(\'favicons\', \'{id}\');">remove</a></td>' +
'</tr>';

function loadCruds(){
    var tplCruds = 
    {
        favicons_domains: 
        {
            tpl: '<table class="crud rounded" summary="{summary}">' +
            '<thead><tr>{tpl.headers}</tr></thead>' +
            '<tfoot><tr><td colspan="{colspan}"><em>{desc}</em></td>' +
            '<td><a id="t_favicons_add" class="add" href="javascript:add(\'favicons\');">Add</a></td></tr></tfoot>' +
            '<tbody>{tpl.rows}</tbody></table>',
            data: 
            {
                colspan: 2,
                summary: 'Add/edit items',
                desc: 'Manage favicons'
            },
            tpls: 
            {
                'tpl.headers': 
                {
                    tpl: tplCrudTableHeader,
                    data: ['url', 'edit', 'remove']
                },
                'tpl.rows': 
                {
                    tpl: tplCrudTableRow,
                    data: prefs.favicons_domains || {},
                    formatData: function(url, o){
                        return {
                            id: url,
							url: url,
                            text: ellipsis(url, 60),
                            icon: o
                        };
                    }
                }
            }
        }
    };
    
    iterate(tplCruds, function(id, otpl){
        loadCRUD(id, otpl);
    });
}

/**
 *
 * @param {Object} id  Id of Dom Element
 * @param {Object} name Name of prefs to get data
 */
function loadCRUD(id, o){
    var html = '';
    var el = document.getElementById(id);
    if (el) {
        html = fillTemplate(o);
        el.innerHTML = html;
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
		}else{
			html = fillTpl(o.tpl, v);
		}
    }
    
    return html;
}


function iterateFillTpl(data, tpl, formatData){
    var html = '';
    iterate(data, function(k, o){
        var v = (formatData) ? formatData.call(this, k, o) : { text: o};
        html += fillTpl(tpl, v);
    });
    return html;
}

function remove(id, key){
    if (id === 'favicons') {
        return removefavicon(key);
    }
}

function add(id, key){
    if (id === 'favicons') {
        return addfavicon(key);
    }
}

/**
 * CRUD for Favicons
 * 
 */
function addfavicon(urlin){
    var DEFAULT_SITE = 'http://www.lemonde.fr';
	var DEFAULT_URL = 'http://medias.lemonde.fr/medias/info/favicon.ico';
	
	var url = urlin || DEFAULT_SITE;
    url = prompt("Enter the site :", url);
    if (!url) {
        return;
    }
    var icon = prefs.favicons_domains[url] || DEFAULT_URL;
    icon = prompt("Enter the icon url :", icon);
    if (!icon) {
        return;
    }
    
    var favicon = 
    {
        url: url,
        icon: icon
    };
    if (urlin && url != urlin) {
        //remove old
        removefavicon(urlin);
    }

    prefs.favicons_domains[url] = icon;
	//Refresh all
	loadCruds();
}

function removefavicon(url){
    delete prefs.favicons_domains[url];
	//Refresh all
	loadCruds();
}
