//Portal theme

GRP.player = function(){

    var css = 'body{background: black;}';
    
    //var h = getHeightEntries();
    //css += 'div#entries .entry{height:' + h + 'px;position:absolute;width:100%;top:0px;width: auto!important;}';
	
    css += 'div#entries .entry{background-color:black;}';
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
	/*
    css += '#entries-up{left:0px;}#entries-down{right:0px;}';
    css += '#entries-up,#entries-down{z-index:9999;color: #AAA;cursor: pointer;font-size: 200%;font-weight: bold;height: 64px;line-height: 58px;margin-top: -32px;position: fixed;text-align: center;top: 50%;width: 32px;}';
	*/
    //hide items
    css += '.card-actions{display:none;}';
    /*
	css += '.entry{display:none;} #current-entry{display:inline;}';
    css += '#chrome-header,#lhn-add-subscription-section,#viewer-header{display:none;}';
    css += '#search,#gbh,#guser,#logo-container{display:none !important;}';
    css += 'div#main{top:0px;}';
    css += 'div#viewer-page-container{overflow: hidden!important;height:200px!important;}';
    */
	
	//css += '#viewer-footer{position:absolute;left:-9999px;}';
	//TIMELINE
	/*
	css += '#tl-arrow-left{left:0px;}#tl-arrow-right{right:0px;}';
    css += '#tl-arrow-left,#tl-arrow-right{z-index:9999;color: #AAA;cursor: pointer;font-size: 150%;font-weight: bold;height: 64px;line-height: 58px;margin-top: -32px;position: fixed;text-align: center;top: 50%;width: 32px;}';
	*/
	css += '#tl-arrow-left{float:left;}#tl-arrow-right{floatright;}';
	
    GM_addStyle(css, 'rps_player');
    
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
	timeline.id='timeline';
	timeline.innerHTML='<div id="tl-arrows"><div id="tl-arrow-left">◀</div><div id="tl-arrow-right">▶</div></div><div id="tl-items"></div>';
	vf.appendChild(timeline);
    
    window.setTimeout(function(){
        checkCurrentEntry();
    }, 500);
    
    function onAttrChanged(event){
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
    
    function checkCurrentEntry(){
        var current = document.getElementById('current-entry');
        if (!current) {
            current = getFirstElementByClassName(document, 'entry');
            if (current) {
                current.id = 'current-entry';
            }
        }
        if (current) {
            // Internet Explorer:                
            //elemToCheck.attachEvent ('onpropertychange', handler);
            current.addEventListener("DOMAttrModified", onAttrChanged, false);
        }
    }
};
