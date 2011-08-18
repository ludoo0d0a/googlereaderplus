/**
 * @author Valente
 */
var bgPage = chrome.extension.getBackgroundPage();
var g = chrome.i18n.getMessage;

var opendirect = bgPage.getPref('opendirect');
if (opendirect) {
    mycore.extension.sendRequest({
        message: 'core',
        action: 'findreader'
    });
    window.close();
} else {
    $(document).ready(startDom);
}

var tpl = '<div id="entry-{i}" class="entry">' +
'<span class="entry-icons entry-star {starcls}" title="' +
g("starred_items") +
'"></span>' +
'<span class="entry-icons entry-read {readcls}" title="' +
g("mark_as_read") +
'"></span>' +
'<div class="entry-title">' +
'<img class="entry-favicon {iconcls}" feed="{feed}" title="{origin}" src="{icon}">' +
'<a class="entry-original" target="_blank" href="{url}"{atitle}>{title}</a>' +
'</div>' +
'</div>';
function startDom(){
    $('.i18n').each(function(i, el){
        var t = g(el.id);
        if (t) {
            $(el).text(t);
        }
    });
    
    //Fill data feed
    loaditems(1, true);
    
    $('#loptions').attr('title', g('needreaderplus'));
    $('#loptions').click(function(){
        if (!$(this).hasClass('link-off')) {
            mycore.extension.sendRequest({
                message: 'core',
                action: 'openprefs'
            });
        }
    });
    
    $('#lrefresh').click(function(){
        loaditems(1, true);
    });
    $('#lprevious').click(function(){
        if (!$(this).hasClass('link-off')) {
            loaditems(--page);
        }
    });
    $('#lnext').click(function(){
        if (!$(this).hasClass('link-off')) {
            loaditems(++page);
        }
    });
    $('#lcontacts').click(function(){
        mycore.extension.sendRequest({
            message: 'contacts'
        });
    });
    
    //$(document).keypress(function(e){
    $(document).keydown(function(e){
        var w = e.keyCode;
        if (w == 39 || w == 40 || w == 34) {
            //right,down,pagedown
            if (!$('#lnext').hasClass('link-off')) {
                loaditems(++page);
            }
        } else if (w == 37 || w == 38 || w == 33) {
            //left,up,pageup
            if (!$('#lprevious').hasClass('link-off')) {
                loaditems(--page);
            }
        };
            });
    
}

var URL_FAVICON = "http://pageicons.appspot.com/favicons?url=";
var page = 1, pageItems = 10, items = {};
function loaditems(page, reload, feed, label){
    msg(g('loadingpage', [page]));
    if (reload) {
        mycore.extension.sendRequest({
            message: 'unread',
            label: label || '',
            feed: (feed)?feed.feed:'',
			feed_title: (feed)?feed.title:'',
            count: 100
        }, function(o){
            if (o) {
                if (label && o.entry) {
                    //from xml
                    items = o.entry;
                    displayEntries(items, page, feed, label);
                } else if (o.items) {
                    items = o.items;
                    displayEntries(items, page, feed, label || '');
                }
                if (o.GUID_CORE) {
                    //ReaderPlus detected
                    $('#loptions').removeClass('link-off').attr('title', '');
                }
            } else {
                //not logged
                msg(g('notlogged'));
            }
        });
    } else {
        displayEntries(items, page);
    }
}

function msg(txt){
    $('#entries').html("<div id='loading'>" + txt + "</div>");
    $('.tooltip').remove();
}

var reCategory = /user\/\d+\/state\/com\.google\/(.*)/;
var reLabel = /user\/\d+\/label\/(.*)/;

function displayEntries(items, page, feed, label){
    page = page || 1;
    page = Math.max(page, 1);
    var pagesMax = items ? Math.round(items.length / pageItems) : 1;
    page = Math.min(page, 10);
    $('#nav').html(g('page', [page, pagesMax]));
    
    if (feed){
		$('#htitle').text(g('feeditems', [feed.title]));
	}else if (label) {
        $('#htitle').text(g('labelitems', [label]));
    } else {
        $('#htitle').text(g('unreaditems'));
    }
    
    toggleClass($('#lnext'), 'link-on', 'link-off', page < pagesMax);
    toggleClass($('#lprevious'), 'link-on', 'link-off', page > 1);
    
    var index = 0, min = pageItems * (page - 1) + 1, max = pageItems * page, html = '';
    $.each(items, function(id, item){
        ++index;
        if (index < min || index > max) {
            return;
        }
        var url = '';
        if (item.alternate) {
            url = item.alternate[0].href;
        } else if (item.source && item.source.link) {
            url = item.source.link['@href'];
        }
        item.actions = item.actions || {};
        var starred = item.actions.starred || false, read = item.actions.read || false, categories = [], labels = [];
        $.each(item.categories || item.category, function(i, category){
            var cat = category['@term'] || category;
            var m = reCategory.exec(cat);
            if (m && m[1]) {
                categories.push(m[1]);
                if ('starred' === m[1]) {
                    starred = true;
                }
                if ('read' === m[1]) {
                    read = true;
                }
                //console.log('starred=' + starred + ' ' + m[1]);
            }
            /*else{
             var n = reLabel.exec(cat);
             if (n && n[1]) {
             labels.push(m[1]);
             }
             }*/
        });
        var a = {
            i: index,
            date: '', //item.published,
            url: url,
            icon: ((item.enclosure && item.enclosure.href) ? item.enclosure.href : getFavicon(url)),
            title: item.title,
            summary: '',
            feed: (item.origin) ? item.origin.streamId : '',
            origin: (item.origin) ? item.origin.title : ((item.source) ? item.source.title : ''),
            //categories:categories,
            //labels:labels,
            starcls: (starred) ? 'item-star-active' : 'item-star',
            readcls: (read) ? 'item-read-active' : 'item-read'
        };
        if (item.summary && item.summary.content) {
            a.summary = cleanHTML(item.summary.content);
        } else if (item.content && item.content.content) {
            a.summary = cleanHTML(item.content.content);
        } else if (item.summary) {
            //label
            a.summary = cleanHTML(item.summary);
        }
        
        a.atitle = (a.summary) ? (' title="' + a.summary + '"') : '';
        a.iconcls = (a.icon ? ' favicon' : ' fhidden');
        html += fillTpl(tpl, a);
    });
    $('#entries').html(html);
    
    function findEntry(e){
        var entry = false, el = $(e.target);
        if (el.hasClass('entry')) {
            entry = el;
        } else {
            entry = el.parents('.entry').first();
        }
        return entry;
    }
    
    function markas(e, action){
        var entry = findEntry(e);
        var el = entry.find('.entry-' + action);
        var b = toggleClass(el, 'item-' + action, 'item-' + action + '-active');
        var itm = getEntryItem(entry);
        itm.actions[action] = b;
        //console.log('Mark as ' + action);
        //console.log(itm)
        mycore.extension.sendRequest({
            message: 'mark',
            id: itm.id,
            streamId: itm.origin.streamId,
            action: action,
            status: b
        }, function(o){
            //console.log('mark ' + action + ' done for ' + itm.id);
        });
    };
    
    /*
     //TODO edit action still not work
     $('#entries .entry-read').click(function(e){
     markas(e, 'read');
     });
     function markasread(e){
     markas(e, 'star');
     }
     $('#entries .entry-star').click(markasread);
     $('.entry-original').click(markasread);
     */
    tooltips();
    
    $('.entry-favicon').click(function(){
        var feed = $(this).attr('feed');
        if (feed) {
            loaditems(1, true, {
                feed: feed,
                title: $(this).attr('title')
            });
        }
    });
}

function tooltips(){
    $("a.entry-original").each(function(i, el){
        if ($(this).attr('title')) {
            $(this).addClass('ht').tooltip({
                position: (i < 5) ? 'bottom center' : 'top center',
                opacity: 0.9,
                fixed: true
            });
        }
    });
}

function getFavicon(url){
    var d = getUrlHost(url);
    return URL_FAVICON + d;
}

function getUrlHost(url){
    var u = parseUri(url);
    return u.host;
}

function getEntryItem(el){
    var id = el[0].id;
    var index = parseInt(id.replace(/^entry-/, ''), 10);
    var itm = (items) ? items[index] : false;
    return itm;
}
