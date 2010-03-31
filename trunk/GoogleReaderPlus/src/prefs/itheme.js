//
//Utility to render iGoogle themes
// http://www.google.com/ig/directory?type=themes
// 
var tpl_ig_skin_block = '{{%IMPLICIT-ITERATOR}}' +
'<div class="indi_cats">{{#cats}}' +
'<span class="indi_link" onclick="javascript:setCategorie(\'{{id}}\')">{{name}}</span> - ' +
'{{/cats}}</div>' +
'<span class="indi_link" onclick="javascript:goprevious()">{{txt_previous}}</span> - ' +
'<span class="indi_link" onclick="javascript:gonext()">{{txt_next}}</span>' +
'<div class="indi_entries">' +
'{{#entry}}<div class="indi_entry">' +
'<div class="indi_entry_title_wrap"><div class="indi_entry_title">{{title}}</div></div>' +
'<div class="indi_thumbnail"><img src="http://skins.gmodules.com/ig/skin_fetch?type=4&sfkey={{dthumbnail}}" onclick="javascript:setTheme(\'{{link}}\')"/></div>' +
'</div>{{/entry}}</div>';
var ig_cat, ig_pos = 0, ig_page = 12;
//var ig_categories = ['all', 'artist', 'games', 'naturecampaign', 'comics', 'food', 'travelnew', 'animals', 'environment', 'sports', 'destinations', 'abstract', 'trendy', 'fun', 'causes'];
var ig_categories = [{
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
function gonext(){
    ig_pos = ig_pos + ig_page;
    renderThemes(ig_cat, ig_pos);
}

function goprevious(){
    ig_pos = Math.max(0, ig_pos - ig_page);
    renderThemes(ig_cat, ig_pos);
}

function setCategorie(cat){
    
if (cat === 'all') {
        cat = '';
    }
    renderThemes(cat);
}

function setTheme(link){
    var el = get_id('ig_theme');
    if (el) {
        if (!(/^http(s)?:/i.test(link))) {
			if (!(/^\//.test(link))) {
				link='/'+link;
			}
			link='http://skins.gmodules.com'+link;
		}
		el.value = link;
    }
}

function renderThemes(cat, pos){
    lang = lang || 'en';
    ig_cat = cat || '';
    ig_pos = pos || 0;
    var api = 'http://www.google.com/ig/directory?type=themes&output=json&callback=INDI_cb&sort=popular&cat=' + ig_cat + '&gl=us&hl=en&start=' + ig_pos + '&num=' + ig_page;
    console.log(api);
    GM_xmlhttpRequest({
        url: api,
        onload: function(xhr){
            var txt = xhr.responseText;
			if (txt && (/^INDI_cb/.test(txt))){
            	eval(txt);
			}
        }
    });
}

function INDI_cb(o){
    setThemes(o);
}

function setThemes(data){
    o = data.feed || {};
    apply(o, {
        cats: ig_categories,
        txt_add: getText(lang, 'theme', 'add') || 'Add it now',
        txt_next: getText(lang, 'theme', 'next') || 'Next',
        txt_previous: getText(lang, 'theme', 'previous') || 'Previous',
		dthumbnail:function(){
			return encodeURIComponent(decodeURIComponent(this.thumbnail));
		}
    });
    var el = get_id('ig_themes');
    
if (el) {
        var html = Mustache.to_html(tpl_ig_skin_block, o);
        //console.log(html);
        el.innerHTML = html;
    }
}

function dblQuote(txt){
    
    return txt.replace(/\"/g, "%#22").replace(/'/g, "\"").replace(/%#22/g, "\"");
}
