//
//Utility to render iGoogle themes
// http://www.google.com/ig/directory?type=themes
// 
var tpl_ig_skin_block = '{{%IMPLICIT-ITERATOR}}' +
'<div class="indi_cats">{{#cats}}' +
'<span class="indi_link" onclick="javascript:igcat(\'{{id}}\')">{{name}}</span> - ' +
'{{/cats}}</div>' +
'<div class="indi_sort">{{#sorts}}' +
'<span class="indi_link" onclick="javascript:igsort(\'{{id}}\')">{{name}}</span> - ' +
'{{/sorts}}</div>' +
'<span class="indi_link" onclick="javascript:igprevious()">{{txt_previous}}</span> - ' +
'<span class="indi_link" onclick="javascript:ignext()">{{txt_next}}</span> - ' +
'<span class="indi_link" onclick="javascript:igrnd()">{{txt_random}}</span>  ' +
'<form onsubmit="javascript:igsearch();return false;"><input type="text" value="{{q}}" size="20" id="igq"><input type="submit" value="{{txt_search}}"></form>' +
'<div class="indi_entries">' +
'{{#entry}}<div class="indi_entry">' +
'<div class="indi_entry_title_wrap"><div class="indi_entry_title">{{title}}</div></div>' +
'<div class="indi_thumbnail"><img src="http://skins.gmodules.com/ig/skin_fetch?type=4&sfkey={{dthumbnail}}" onclick="javascript:setTheme(\'{{skin_id}}\')"/></div>' +
'</div>{{/entry}}</div>';
var entries={}, ig_cat, ig_q = '', ig_pos = 0, ig_page = 12, ig_sort = 'popular';
var ig_cats = [{
    id: '',
    name: 'All'
}, {
    id: 'artist',
    name: 'Artist'
}, {
    id: 'games',
    name: 'Games'
}, {
    id: 'naturecampaign',
    name: 'Nature'
}, {
    id: 'comics',
    name: 'Comics'
}, {
    id: 'food',
    name: 'Food'
}, {
    id: 'travel',
    name: 'Travel'
}, {
    id: 'animals',
    name: 'Animals'
}, {
    id: 'nature',
    name: 'Environment'
}, {
    id: 'sports',
    name: 'Sports'
}, {
    id: 'destinations',
    name: 'Destinations'
}, {
    id: 'abstract',
    name: 'Abstract'
}, {
    id: 'trendy',
    name: 'Trendy'
}, {
    id: 'fun',
    name: 'Fun'
}, {
    id: 'causes',
    name: 'Causes'
}];
var ig_sorts = [{
    id: 'popular',
    name: 'Popular'
}, {
    id: 'users',
    name: 'Most users'
}, {
    id: 'newest',
    name: 'Newest'
}];
function igsearch(){
    var q = get_id('igq');
    if (q && q.value) {
        ig_q = q.value;
        renderThemes(ig_cat, ig_pos, ig_sort, ig_q);
    }
}

function ignext(){
    ig_pos = ig_pos + ig_page;
    renderThemes(ig_cat, ig_pos);
}

function igprevious(){
    ig_pos = Math.max(0, ig_pos - ig_page);
    renderThemes(ig_cat, ig_pos);
}

function igrnd(){
    ig_cat= ig_cats[Math.round(Math.random() * ig_cats.length)].id;
	ig_sort= ig_sorts[Math.round(Math.random() * ig_sorts.length)].id;
	ig_pos= Math.round(Math.random() * 10);
	renderThemes(ig_cat, ig_pos, ig_sort);
}

function igcat(cat){
    if (cat === 'all') {
        cat = '';
    }
    renderThemes(cat);
}
function igsort(sort){
    renderThemes(ig_cat, ig_pos, sort);
}

function setTheme(id){
	var entry = find(entries.entry, 'skin_id', id);
	if (!entry){
		return;
	}
    var el = get_id('ig_theme_name');
    if (el) {
		el.value = entry.title;
	}
	el = get_id('ig_theme');
    if (el) {
        var link = entry.link;
		if (!(/^http(s)?:/i.test(link))) {
            if (!(/^\//.test(link))) {
                link = '/' + link;
            }
            link = 'http://skins.gmodules.com' + link;
        }
        el.value = link;
    }
}

function renderThemes(cat, pos, sort, q){
    lang = lang || 'en';
    ig_cat = cat || '';
    ig_pos = pos || 0;
    ig_sort = sort || ig_sort;
    ig_q = q || ig_q;
    var api = 'http://www.google.com/ig/directory?type=themes&output=json&callback=INDI_cb&sort=' + ig_sort + '&cat=' + ig_cat + '&gl=us&hl=en&start=' + ig_pos + '&num=' + ig_page;
    if (ig_q) {
        api += '&q=' + ig_q;
    }
    console.log(api);
    GM_xmlhttpRequest({
        url: api,
        onload: function(xhr){
            var txt = xhr.responseText;
            if (txt && (/^INDI_cb/.test(txt))) {
                eval(txt);
            }
        }
    });
}

function INDI_cb(o){
    setThemes(o);
}

function setThemes(data){
    entries = data.feed || {};
    apply(entries, {
        cats: ig_cats,
        sorts: ig_sorts,
        q: ig_q,
        txt_add: getTextPrefs(lang, 'ig', 'add') || 'Add it now',
        txt_next: getTextPrefs(lang, 'ig', 'next') || 'Next',
        txt_previous: getTextPrefs(lang, 'ig', 'previous') || 'Previous',
		txt_random: getTextPrefs(lang, 'ig', 'random') || 'Randm',
        txt_search: getTextPrefs(lang, 'ig', 'search') || 'Search themes',
        dthumbnail: function(){
            return encodeURIComponent(decodeURIComponent(this.thumbnail));
        }
    });
    var el = get_id('ig_themes');
    if (el) {
        var html = Mustache.to_html(tpl_ig_skin_block, entries);
        //console.log(html);
        el.innerHTML = html;
    }
}

function dblQuote(txt){
    return txt.replace(/\"/g, "%#22").replace(/'/g, "\"").replace(/%#22/g, "\"");
}
