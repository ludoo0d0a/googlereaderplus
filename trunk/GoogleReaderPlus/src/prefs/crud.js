var tplRowCrud = '<a href="http://{url}" target="_blank"><span><img alt="favicon" class="favicon" title="Preview" src="{icon}" width="16" height="16"/>{text}</span></a><a class="action" href="javascript:addfavicon(\'{url}\');">edit</a><a class="action" href="javascript:removefavicon(\'{url}\');">remove</a>';

function loadCruds(){
	loadCRUD('favicon_crud', 'favicons_domains');
}

/**
 * 
 * @param {Object} id  Id of Dom Element 
 * @param {Object} name Name of prefs to get data
 */
function loadCRUD(id, name){
    var data = prefs[name];
    if (!data) {
        return;
    }
    var tplRowCrudLi = '<li id="li_{id}">' + tplRowCrud + '</li>';
    var html = '';
    var ul = document.getElementById(id);
    for (var url in data) {
        var favicon = 
        {
            id: url,
            text: ellipsis(url, 60),
            icon: favicons[url]
        };
        html += fillTpl(tplRowCrudLi, favicon);
    }
    ul.innerHTML = html;
}

function addfavicon(urlin){
    var url = urlin || '';
    url = prompt("Enter the site :", url);
    if (!url) {
        return;
    }
    var icon = prefs.favicons_domains[url] || '';
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
    
    var id = 'li_' + favicon.url;
    var li = document.getElementById(id);
    if (!li) {
        var ul = document.getElementById('favicon_crud');
        li = document.createElement('li');
        li.id = 'li_' + favicon.url;
        ul.appendChild(li);
    }
    li.innerHTML = fillTpl(tplRowCrud, favicon);
    savefavicon(favicon.url, favicon.icon);
}

function savefavicon(url, icon, title){
    prefs.favicons_domains[url] = icon;
}

function removefavicon(url){
    delete prefs.favicons_domains[url];
    var li = document.getElementById('li_' + url);
    if (li) {
        li.parentNode.removeChild(li);
    }
}
