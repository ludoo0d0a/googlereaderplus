/**
 * Experimental Player theme 
 * 
 * based on the Google Player http://www.google.com/reader/play/
 * 
 * Author: 	Ludovic Valente
 * Version:	0.1
 * Date:	03/24/2010
 */

GRP.player = function(){
    var css = 'body{background: black;}';
    css += 'div#current-entry{height:100%;position:absolute!important;width:100%;top:0px;z-index:10;visibility:visible!important;}';
    
    //adapt main when nav is on
    css += 'body:not(.lhn-hidden) table#chrome-viewer-container{width:auto !important;}';
    
    //background black
    css += 'div#entries .entry{visibility:hidden;background-color:black;}';
    css += 'div.entry-likers, #no-entries-msg{background-color:black;}';
    css += 'div#entries, div#entries .entry, div#viewer-container, div.entry-container .entry-body{color:#999!important;}';
    //text color and size
    css += 'div.card-common,div#viewer-container{color:white;background-color: black;}';
    css += '.card{border-color:transparent!important; border-width:0px !important;-webkit-box-shadow:0px 0px black!important;box-shadow:10px 10px 20px black!important;}';
    css += 'a.entry-title-link{color:white !important;text-decoration: none;}';
    css += 'a,a:visited,.link{color: #AAA !important};';
    css += '#current-entry{display:inline;}';
    css += '#chrome-header,#lhn-add-subscription-section{display:none;}';
    css += '#search,#gbh,#logo-container{display:none !important;}';
    css += 'div#main{top:0px;}';
    css += '#viewer-page-container{height:200px!important;}';
    css += '#entries, #viewer-page-container{overflow:hidden!important;}';
    css += '.scroll-tree li, .lhn-section{background-color:#AAA !important;}';
    css += '.scroll-tree li a:hover, a:hover .tree-item-action-container, .scroll-tree li a.menu-open, #lhn-selectors .selector:hover{background-color:#DDD !important;}';
    
	//arrows
    css += '#entries-up{left:0px;}#entries-down{right:0px;}';
    css += '#entries-up,#entries-down{z-index:9999;color: #AAA;cursor: pointer;font-size: 200%;font-weight: bold;height: 64px;line-height: 58px;margin-top: -32px;position: fixed;text-align: center;top: 50%;width: 32px;}';
	
    //Can scroll long articles
    //css += '.entry-body{overflow:auto;}';
    css += '.entry{overflow:auto;}';
    
    //hide entry items
    css += '#gbar, #entries-status, .card-actions, .card-bottom{display:none;}';
    //hide nav
    css += '#chrome{margin-left:0px !important;}';//#chrome-lhn-toggle
    //TIMELINE
    css += '#viewer-footer{background-color: #222 !important;}';
    css += '#timeline{background-color: #222;margin-left:30px;}';
    var w = screen.width - 100;
    css += '#timeline{overflow:hidden;width:' + w + 'px;}';
    css += '#tl-items{padding:2px;}';
    css += '.tl-item{float:left;width:80px;height:80px;border:2px solid #acacac;margin:10px;opacity: 0.6;cursor: pointer;}';
    css += 'div.tl-item-sel{opacity:1;border:2px solid #dedede;}';
    css += '.tl-img{width: 80px; height: 80px; margin-top: 0px; margin-left: 0px;}';
    css += '.tl-ico{position: relative;bottom: 20px;left: 65px;}';
    css += '.tl-arrow{cursor:pointer;color: #DEDEDE;font-size: 300%;position: absolute;bottom:50px;z-index: 9999;}';
    css += '#tl-arrow-left{left:0px;}#tl-arrow-right{right:0px;}';
    css += '#viewer-footer{height:120px!important;padding-top:40px;}';
    
    //header timeline
    css += '.entry-date{position:fixed;right:0px;bottom:130px;font-size:23px!important;}';
    css += 'b.gb4{position:fixed;right:300px;bottom:130px;color:#aaa;z-index:99;font-size:23px!important;}';
    
    //Show unread counter
    //css += '#viewer-header{display:none;}';//let viewer-all-new-links be displayed
    css += '#viewer-comments-all-links, #mark-all-as-read-split-button, #viewer-header .goog-button, #viewer-toggles, #viewer-allcomments-return, #viewer-recommendations-return, #viewer-translated-by, #viewer-single-parent, #viewer-single-item-parent, #viewer-details-toggle {display:none;}';
    css += '#quick-add-success, #viewer-details {display:none;}div#viewer-top-controls{padding:0;}';
    css += '#viewer-all-new-links{position:fixed;left:10px;bottom:130px;color:#aaa;z-index:99;font-size:15px!important;}';
    
    GM_addStyle(css, 'rps_player');
    
    var csst = '#navdebug{cursor:pointer;position:fixed;right:200px;bottom:10px;color:#aaa;z-index:99;font-size:23px!important;}';
    GM_addStyle(csst, 'rps_playert');
    
    
    //nav hidden on load
    addClass(document.body, 'lhn-hidden');
    
    var body, gup = document.getElementById('entries-up'), gdown = document.getElementById('entries-down');
    if (gup) {
        body = getFirstElementByClassName(gup, 'goog-button-body');
        body.innerText = '◀';
    }
    if (gdown) {
        body = getFirstElementByClassName(gdown, 'goog-button-body');
        body.innerText = '▶';
    }
    
    function createArrow(root, left){
        var el = document.createElement('div');
        el.id = (left) ? 'tl-arrow-left' : 'tl-arrow-right';
        el.className = 'tl-arrow';
        el.innerText = (left) ? '◀' : '▶';
        el.addEventListener('click', function(e){
			scrollpage(left, 1);
        });
        root.appendChild(el);
    }
    
    var vf = document.getElementById('viewer-footer');
    
	/*
    //Debug toggle
    var navdebug = document.createElement('div');
    navdebug.id = 'navdebug';
    
    var eltoggle = document.createElement('a');
    eltoggle.innerText = 'Toggle';
    var playerOn = true;
    eltoggle.addEventListener('click', function(e){
        var el = get_id('rps_player');
        if (el) {
            el.parentNode.removeChild(el);
        } else {
            GM_addStyle(css, 'rps_player');
        }
        playerOn = !el;
    });
    navdebug.appendChild(eltoggle);
    
    var elscroll = document.createElement('a');
    elscroll.innerText = 'Scroll';
    elscroll.addEventListener('click', function(e){
        var entries = get_id('entries');
        entries.scrollTop = entries.scrollHeight - 1;
    });
    navdebug.appendChild(elscroll);
    vf.appendChild(navdebug);
    */
	
    createArrow(vf, true);
    
    var timeline = document.createElement('div');
    timeline.id = 'timeline';
    var timelineItems = document.createElement('div');
    timelineItems.id = 'tl-items';
    timeline.appendChild(timelineItems);
    vf.appendChild(timeline);
    
    createArrow(vf, false);
    
    var lastEntry;
    function checkCurrentEntry(){
        if (!playerOn) {
            return;
        }
        var current = getCurrentEntry();
        if (!current) {
            current = getFirstElementByClassName(document, 'entry');
            if (current) {
                current.id = 'current-entry';
            }
        }
        if (current) {
            if (!lastEntry || lastEntry !== current) {
                selectThumb(current);
                adaptSize(current);
                lastEntry = current;
            }
            /*	
             //timeline not checked
             var sel = getFirstElementByClassName(document, 'tl-item-sel');
             if (!sel) {
             selectThumb(current);
             }
             */
        }
    }
    
    function scrollNext(){
        var entries = get_id('entries');
        entries.scrollTop = entries.scrollHeight - 1;
    }
    
    function selectEntry(entry, selThumb){
        if (entry) {
            var current = getCurrentEntry();
            if (current) {
                current.removeAttribute('id');
            }
            entry.id = 'current-entry';
            if (selThumb) {
                selectThumb(entry);
            }
            simulateClick(entry);//mark as read
            adaptSize(entry);
        }
    }
	
	function getEntryIndex(entry){
		var index=false, m = /tl-entry-(\d+)/.exec(entry.className || '');
            if (m && m[1]) {
				index = parseInt(m[1], 10);
			}
			return index;
	}
	
	function getThumb(index){
		return get_id('tl-item-' + index);
	}
    
    function selectThumb(entry, elThumb){
		if (lastThumb) {
            removeClass(lastThumb, 'tl-item-sel');
        }
        if (elThumb) {
            selectEntry(entry);
        } else {
            //get thumb from entry id
            var index = getEntryIndex(entry);
            if (index) {
                elThumb=getThumb(index);
                //center on screen
                scrollThumb(index);
            }
        }
        if (elThumb) {
            addClass(elThumb, 'tl-item-sel');
            lastThumb = elThumb;
        }
    }
    
    
    function scrollpage(left, count){
        if (!left) {
			scrollNext();
		}
		
	    var current = getCurrentEntry();
		var index = getEntryIndex(current);
        index += ((left)?(-1):1)*count;

        var el = getThumb(index);
		if (el) {
			simulateClick(el);
		}
    }
    
    function scrollThumb(index){
        var vf = get_id('viewer-footer');
        scroll(timeline, (index * 100) - (vf.clientWidth / 2 - 40));
    }
    
    function scroll(el, value, inc, time){
        el.scrollLeft = value;
        /*return;
        console.log('scroll from ' + el.scrollLeft + ' to ' + value);
        var v0 = el.scrollLeft;
        var v = v0 + inc || 5;
        el.scrollLeft = v;
        console.log('new value = ' + el.scrollLeft);
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
        */
    }
    
    function forceSelectEntry(){
        var current = getCurrentEntry();
        if (!current) {
            var entry = getFirstElementByClassName(document, 'entry');
            selectEntry(entry, true);
        }
    }
    
    var heightEntries = getHeightEntries();
    
    //forceSelectEntry();
    
    window.setInterval(function(){
        checkCurrentEntry();
    }, 200);
    window.setInterval(function(){
        fillTimeline();
    }, 2000);
    var lastThumb;
    var itl = 0;
    
    function resetTop(entry){
		entry.parentNode.scrollTop = 0;//entries top=0
	}
	
    function adaptSize(entry){
        resetTop(entry);
        var eb = entry.firstChild;//card-common
        eb.style.fontSize = "200%";
        for (var c = 200; c > 80 && eb.offsetHeight > heightEntries; c -= 10) {
            eb.style.fontSize = c + "%";
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
        var entriesContainer = get_id('entries');
        var entry0 = entriesContainer.firstChild;
        if (!entry0) {
            fireResize();
        } else if (entry0 && !hasClass(entry0, 'tl-marked')) {
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
            el.id = 'tl-item-' + itl;
            addClass(entry, 'tl-entry-' + itl);
            ++itl;
            var html = '<img class="tl-img" title="' + title + '" src="' + img + '" width="78" height="78"/><img src="http://s2.googleusercontent.com/s2/favicons?domain=' + domain + '" class="tl-ico" width="16" height="16"/>';
            el.innerHTML = html;
            el.addEventListener('click', function(e){
                scrollNext();
				selectThumb(entry, el);
            });
            timelineItems.appendChild(el);
            addClass(entry, 'tl-marked');
        }, this);
    }
    
    
};
