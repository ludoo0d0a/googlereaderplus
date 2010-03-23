//Portal theme

GRP.player = function(){
    var css = 'body{background: black;}';
    
    //var h = getHeightEntries();
    //css += 'div#entries .entry{height:' + h + 'px;position:absolute;width:100%;top:0px;width: auto!important;}';
    
    //css += 'div#entries{overflow:hidden!important;}';
    css += 'div#current-entry{height:100%;position:absolute!important;width:100%;top:0px;width: auto!important;z-index:10;visibility:visible!important;}';
    
    css += 'div#entries .entry{visibility:hidden;background-color:black;}';
    
    //css += 'div#entries{padding:40px;width: auto!important;}';
    //background black
    css += 'div.entry-likers{background-color:black;}';
    css += 'div#entries, div#entries .entry, div#viewer-container, div.entry-container .entry-body{color:#999!important;}';
    //text color and size
    //css += 'div#entries .entry{font-size:250%;}';
    css += 'div.card-common,div#viewer-container{color:white;background-color: black;}';
    css += '.card{border-color:transparent!important; border-width:0px !important;-webkit-box-shadow:0px 0px black!important;box-shadow:10px 10px 20px black!important;}';
    css += 'a.entry-title-link{color:white !important;text-decoration: none;}';
    //arrows
    css += '#entries-up{left:0px;}#entries-down{right:0px;}';
    css += '#entries-up,#entries-down{z-index:9999;color: #AAA;cursor: pointer;font-size: 200%;font-weight: bold;height: 64px;line-height: 58px;margin-top: -32px;position: fixed;text-align: center;top: 50%;width: 32px;}';
    css += 'a,a:visited,.link{color: #AAA !important};';
    //css += '#current-entry{display:inline;}';
    css += '#current-entry{display:inline;}';
    css += '#chrome-header,#lhn-add-subscription-section,#viewer-header{display:none;}';
    css += '#search,#gbh,#guser,#logo-container{display:none !important;}';
    css += 'div#main{top:0px;}';
    css += 'div#viewer-page-container{overflow: hidden!important;height:200px!important;}';
    
    css += '.scroll-tree li, .lhn-section{background-color:#AAA !important;}';
    css += '.scroll-tree li a:hover, a:hover .tree-item-action-container, .scroll-tree li a.menu-open, #lhn-selectors .selector:hover{background-color:#DDD !important;}';
    
    
    //hide entry items
    css += '#entries-status, .card-actions, .card-bottom{display:none;}';
    //hide nav
    css += '#chrome{margin-left:0px !important;}';//#chrome-lhn-toggle
    //adapt main when nav is on
    css += 'table#chrome-viewer-container{width:auto !important;table-layout:auto !important;}';
    
    //TIMELINE
    css += '#viewer-footer{background-color: #222 !important;}';
    /*
     css += '#tl-arrow-left{left:0px;}#tl-arrow-right{right:0px;}';
     css += '#tl-arrow-left,#tl-arrow-right{z-index:9999;color: #AAA;cursor: pointer;font-size: 150%;font-weight: bold;height: 64px;line-height: 58px;margin-top: -32px;position: fixed;text-align: center;top: 50%;width: 32px;}';
     */
    css += '#timeline{background-color: #222;}';
    //css += '#timeline{margin-left:50px;margin-right:50px;}';
    var w = screen.width - 100;
    css += '#timeline{overflow:auto;width:' + w + 'px;}';
    css += '#tl-arrow-left{float:left;}#tl-arrow-right{float:right;}';
    css += '#tl-items{padding:2px;}';
    css += '.tl-item{float:left;width:80px;height:80px;border:2px solid #acacac;margin:10px;opacity: 0.6;cursor: pointer;}';
    css += 'div.tl-item-sel{opacity:1;border:2px solid #dedede;}';
    css += '.tl-img{width: 80px; height: 80px; margin-top: 0px; margin-left: 0px;}';
    css += '.tl-ico{position: relative;bottom: 20px;left: 65px;}';
    
    
    GM_addStyle(css, 'rps_player');
    
    //nav hidden on load
    addClass(document.body, 'lhn-hidden');
    
	//fireResize();
    
    var body, gup = document.getElementById('entries-up'), gdown = document.getElementById('entries-down');
    if (gup) {
        body = getFirstElementByClassName(gup, 'goog-button-body');
        body.innerText = '◀';
    }
    if (gdown) {
        body = getFirstElementByClassName(gdown, 'goog-button-body');
        body.innerText = '▶';
    }
    
    var vf = document.getElementById('viewer-footer');
    var timeline = document.createElement('div');
    timeline.id = 'timeline';
    var timelineItems = document.createElement('div');
    timelineItems.id = 'tl-items';
    timeline.appendChild(timelineItems);
    
    vf.appendChild(timeline);
    
    var ta = document.createElement('div');
    ta.id = 'tl-arrows';
    ta.innerHTML = '<div id="tl-arrow-left">◀</div><div id="tl-arrow-right">▶</div>';
    vf.appendChild(ta);
    
    
    function onAttrChanged(event){
        console.log('onAttrChanged: ' + event.attrName + ' : ' + event.newValue);
        if (event === undefined) {
            event = window.event;
        }
        if (event.attrName === 'class') {
            if (event.newValue.indexOf('current-entry') < 0) {
                //lost current entry
                current.removeEventListener("DOMAttrModified", onAttrChanged, false);
                //check new one
                checkCurrentEntry();
            }
        }
    }
    
    var lastEntry;
    function checkCurrentEntry(){
        var current = getCurrentEntry();
        if (!current) {
            current = getFirstElementByClassName(document, 'entry');
            if (current) {
                current.id = 'current-entry';
            }
        }
        if (current) {
            //console.log('DOMAttrModified: '+current.className);
            //current.addEventListener("DOMAttrModified", onAttrChanged, false);
            if (lastEntry !== current) {
                selectTimelineItem(current);
                lastEntry = current;
            }
        }
    }
    
    function selectEntryItem(el, entry){
        if (lastItem) {
            removeClass(lastItem, 'tl-item-sel');
        }
        selectEntry(entry);
        addClass(el, 'tl-item-sel');
        lastItem = el;
    }
    
    function selectEntry(entry, fired){
        if (entry) {
            var current = getCurrentEntry();
            if (current) {
                current.removeAttribute('id');
            }
            entry.id = 'current-entry';
            if (fired) {
                selectTimelineItem(entry);
            }
            //adaptSize(entry);
        }
    }
    
    
    function selectTimelineItem(entry){
        var sel = getFirstElementByClassName(document, 'tl-item-sel');
        if (sel) {
            removeClass(sel, 'tl-item-sel');
        }
        if (entry) {
            //select timeline item
            var m = /tl-entry-(\d+)/.exec(entry.className || '');
            if (m && m[1]) {
                if (lastItem) {
                    removeClass(lastItem, 'tl-item-sel');
                }
                var index = parseInt(m[1], 10);
                var el = get_id('tl-item-' + index);
                if (el) {
                    addClass(el, 'tl-item-sel');
                    var vf = get_id('viewer-footer');
                    //center on screen
                    //scroll(timeline, (index * 100) - (vf.clientWidth / 2 - 40));
					timeline.scrollLeft=(index * 100) - (vf.clientWidth / 2 - 40);
                    lastItem = el;
                }
            }
        }
    }
    
    function scroll(el, value, inc, time){
        console.log('scroll from '+el.scrollLeft+ ' to ' + value);
        var v0 = el.scrollLeft;
        var v = v0 + inc || 5;
        el.scrollLeft = v;
		console.log('new value = '+el.scrollLeft);
        //out if no move
        if (v0 !== el.scrollLeft) {
            if (v < value) {
                window.setTimeout(function(){
                    scroll(el, value, inc, time);
                }, time || 50);
            } else {
                console.log('scroll finished');
            }
        } else {
            console.log('scroll no move');
        }
    }
    
    function forceSelectEntry(){
        var current = getCurrentEntry();
        if (!current) {
            var entry = getFirstElementByClassName(document, 'entry');
            selectEntry(entry, true);
        }
    }
    
    forceSelectEntry();
    
    window.setInterval(function(){
        checkCurrentEntry();
    }, 200);
    window.setInterval(function(){
        fillTimeline();
    }, 2000);
    var lastItem;
    var itl = 0;
    
    var heightEntries = getHeightEntries();
    function adaptSize(entry){
        var eb = getFirstElementByClassName(entry, 'entry-body');
        var s = 100;
        while (s < 300 || entry.clientHeight < heightEntries) {
            eb.style.fontSize = s + '%';
            s += 10;
        }
    }
    function findImage(images, width, minWidth){
        for (var i = 0, len = images.length; i < len; i++) {
            if (images[i].width >= width) {
                if (!minWidth || (minWidth && images[i].width >= minWidth)) {
                    return images[i].src;
                }
            }
        }
        return images[0].src;
    }
    
    function fillTimeline(){
        console.log('fillTimeline');
        var entriesContainer = get_id('entries');
        //TODO: check tihs ?
        timelineItems = timelineItems || document.getElementById("tl-items");
        var entry0 = entriesContainer.firstChild;
        if (entry0 && !hasClass(entry0, 'tl-marked')) {
            //clear timeline if change folder
            timelineItems.innerHTML = '';
        }
        //getElements("id('entries')/div[contains(@class, 'entry')][not(contains(@class, 'tl-marked'))]")
        var entries = entriesContainer.getElementsByClassName('entry');
        timelineItems.style.width = (entries.length * 100 + 120) + 'px';
        foreach(entries, function(entry){
            if (hasClass(entry, 'tl-marked')) {
                return;
            }
            var link = getEntryLink(entry);
            var title = link.title || '';
            var eb = getFirstElementByClassName(entry, 'entry-body');
            var img = '', images = eb.getElementsByTagName('img');
            if (images && images[0]) {
                img = findImage(images, 80, 30);
            }
            if (!img) {
                img = '/reader/ui/1327928375-explore-default-thumbnail.png';
            }
            var domain = getDomain(link.url);
            var el = document.createElement('div');
            el.className = 'tl-item';
            //el.style.left = (itl * 100) + 'px';
            //el.style.top = '0px';
            el.id = 'tl-item-' + itl;
            addClass(entry, 'tl-entry-' + itl);
            ++itl;
            var html = '<img class="tl-img" title="' + title + '" src="' + img + '" width="78" height="78"/>';
            html += '<img src="http://s2.googleusercontent.com/s2/favicons?domain=' + domain + '" class="tl-ico" width="16" height="16"/>';
            el.innerHTML = html;
            el.addEventListener('click', function(e){
                selectEntryItem(el, entry);
            });
            timelineItems.appendChild(el);
            addClass(entry, 'tl-marked');
        }, this);
    }
    
    
};
