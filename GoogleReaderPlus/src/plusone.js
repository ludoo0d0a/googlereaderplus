/**
 * Plusone
 * @version  0.1
 * @date 2011-07-25
 *
 * Adds a "Plus one" button to share news on Google+. 
 *
 * Author : LudoO
 * 
 */

GRP.plusone = function(prefs, langs, ID, SL, lang){
	var BTN_CLS = 'g-plusone __item-share __star', BTN_CLS_ID ='btn-'+ID+' '+BTN_CLS;
	//var URL='https://apis.google.com/js/plusone.js';
	//TODO: use xhr
	var URL = 'https://plus.google.com/';//title, href
	var counter = 0;
	var OPTWIN = 'toolbar=0,status=0,resizable=1,width=626,height=436';
	/*
	var head =document.getElementsByTagName("head")[0];
	dh(head,'script',{
		type: "text\/javascript",
		id:'rps_'+ID,
		text: '{"parsetags": "explicit"}',
		src:URL
	});
	//GM_addScript(URL, 'rps_'+ID);
	*/
	
	var css = '.esw{background-repeat:no-repeat;border:0;cursor:pointer;display:inline;height:15px;margin-left:5px;overflow: hidden;width:24px;vertical-align:0;}.esc{color:#767676;font-size:small}.esc a,.esc a:link{color:#36c;text-decoration:none}.eswd{background:url(/images/nav_logo82.png);background-position:0 -243px}.eswa{background:url(/images/nav_logo82.png);background-position:-25px -243px}.eswa:active{background:url(/images/experiments/p1/p1sprite.png);background-position:-450px 0}.eswe{background:url(/images/experiments/p1/p1sprite.png);background-position:-475px 0}.esww{background:url(/images/experiments/p1/p1wkng2.gif);cursor:default}.esws{background:url(/images/experiments/p1/p1sprite.png);background-position:0 0}.eswd:hover,.eswh{background:url(/images/experiments/p1/p1sprite.png);background-position:-400px 0}.eswh:active{background:url(/images/experiments/p1/p1sprite.png);background-position:-425px 0}';
	GM_addStyle(css, 'rpe_'+ID);
	
	function addButton(el, entry, mode) {
		//var title = SL.text + formatShortcut(ID, 'go'+ID, prefs); //[b]
		//var text = (prefs && prefs.general_icons)?'':(SL.keyword || ID);
		//var span = addBottomLink(el,text, title, ID, BTN_CLS, false, openShareWindow, false, entry, mode);
		
		/*var gid = 'g-'+ID+'_'+(counter++);
		//explicit load
		var b= dh(el, 'g:plusone');
		//console.log('gapi '+gid+'='+gapi);
		if (gapi){
			//explicit load
			gapi.plusone.go("entries");
		}	*/
		
		//gapi.plusone.render("render-plus",{"href":url});
		
		var id = counter++;
		var o = getEntryLink(entry);
		var html = '<button class="esw eswd" onclick="window.gbar&amp;&amp;gbar.pw&amp;&amp;gbar.pw.clk(this)" onmouseover="window.gbar&amp;&amp;gbar.pw&amp;&amp;gbar.pw.hvr(this,google.time())" g:entity="'+o.url+'" g:type="plusone" g:undo="poS'+id+'" title="Recommander cette page" id="gbpwm_'+id+'" style=""></button>';
		var b= dh(el, 'span', {html:html});
	}

	function addKey() {
		onKey('btn-'+ID, openShareWindow);
	}

	function openShareWindow(btn, entry, locked) {
		var active = isActive(btn, entry, ID, locked, 'btn-active', 'btn-inactive');
		addClassIf(btn, 'item-star-active',active);
		//if (active) {
			//var shareurl = getEntryLink(entry);
			//var url = fillTpl(URL, shareurl);
			//window.open(url, ID+'sharer', OPTWIN);
			var b = getFirstElementByClassName(entry,'esw')
			if (b) {
				simulateClick(b);
			}
		//} 
	}
	registerFeature(addButton, ID);
	var keycode = getShortcutKey(ID, 'go'+ID, prefs); //66 b
	keycode.fn = addKey;
	initKey(keycode);
};