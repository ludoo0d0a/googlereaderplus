/**
 * @author Valente
 */
var backgroundPage = chrome.extension.getBackgroundPage();

var tpl = '<div id="entry-{i}" class="entry">' +
'<div class="entry-icons entry-star {starcls}" title="Starred item"></div>' +
'<div class="entry-icons entry-read {readcls}" title="Marked as read"></div>' +
'<img class="entry-favicon {iconcls}" title="{origin}" src="{icon}">' +
'<a class="entry-original" target="_blank" href="{url}" title="{summary}">' +
'<span class="entry-title">{i}-{title}</span>' +
'</a></div>';
function init(){
    var opendirect = backgroundPage.getPref('general_opendirect');
    if (opendirect) {
        window.close();
        call_core('findreader');
    } else {
        //Fill data feed
        loaditems(1, true);
        
        $('#lreader').click(function(){
            call_core('findreader');
        });
        $('#lprefs').click(function(){
            call_core('openprefs');
        });
        $('#lrefresh').click(function(){
            loaditems(1, true);
        });
        $('#lprevious').click(function(){
            loaditems(--page);
        });
        $('#lnext').click(function(){
            loaditems(++page);
        });
        $('#lcontacts').click(function(){
            mycore.extension.sendRequest({
                message: 'contacts'
            });
        });
    }
}

var URL_FAVICON = "http://pageicons.appspot.com/favicons?url=";
var page = 1, pageItems = 10, items = {};
function loaditems(page, reload){
    $('#entries').html("<div id='loading'>Loading page " + page + "...</div>");
    if (reload) {
        console.log('loaditems reload');
        mycore.extension.sendRequest({
            message: 'unread',
            count: 100
        }, function(o){
            items = o.items;
            displayEntries(items, page);
        });
    } else {
        console.log('loaditems not reload');
        displayEntries(items, page);
    }
}

var reCategory = /user\/\d+\/state\/com\.google\/(.*)/;
var reLabel = /user\/\d+\/label\/(.*)/;

function displayEntries(items, page){
    console.log('displayEntries page=' + page);
    page = page || 1;
    page = Math.max(page, 1);
    var pagesMax = items ? Math.round(items.length / pageItems) : 1;
    page = Math.min(page, 10);
    $('#nav').html('Page ' + page + '/' + pagesMax);
    var index = 0, min = pageItems * (page - 1) + 1, max = pageItems * page, html = '';
    console.log('min=' + min + 'max=' + max);
    $.each(items, function(id, item){
        ++index;
        if (index < min || index > max) {
            return;
        }
        var url = item.alternate[0].href;
        item.actions = item.actions || {};
        var starred = item.actions.starred || false, read = item.actions.read || false, categories = [], labels = [];
        console.log('---');
        $.each(item.categories, function(i, cat){
            var m = reCategory.exec(cat);
            console.log('cat=' + cat);
            if (cat.indexOf('starred') > 0) {
                cat = cat;
            }
            
            if (m && m[1]) {
                categories.push(m[1]);
                if ('starred' === m[1]) {
                    starred = true;
                }
                if ('read' === m[1]) {
                    read = true;
                }
                console.log('starred=' + starred + ' ' + m[1]);
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
            title: ellipsis(item.title, 85),
            summary: ((item.summary) ? cleanHTML(item.summary.content) : ''),
            origin: (item.origin) ? item.origin.title : '',
            //categories:categories,
            //labels:labels,
            starcls: (starred) ? 'item-star-active' : 'item-star',
            readcls: (read) ? 'item-read-active' : 'item-read'
        };
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
        console.log('Mark as ' + action);
        console.log(itm)
        mycore.extension.sendRequest({
            message: 'mark',
            id: itm.id,
            streamId: itm.origin.streamId,
            action: action,
            status: b
        }, function(o){
            console.log('mark ' + action + ' done for ' + itm.id);
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
	
    $(".entry-original").tipTip({
        maxWidth: "400px",
        defaultPosition: 'top',
        edgeOffset: -100,
        fadeIn: 50
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

function toggleClass(el, cls1, cls2){
    var b = false;
    if (el.hasClass(cls1)) {
        el.removeClass(cls1).addClass(cls2);
        b = true;
    } else {
        el.removeClass(cls2).addClass(cls1);
        b = false;
    }
    return b;
}

function getEntryItem(el){
    var id = el[0].id;
    var index = parseInt(id.replace(/^entry-/, ''), 10);
    var itm = (items) ? items[index] : false;
    return itm;
}



