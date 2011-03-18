/**
 * addThis integration
 * @version  ?
 * @date 
 *
 * AddThis button
 *
 * 
 * see API docs: http://www.addthis.com/help/client-api
 */
GRP.addthis = function(prefs, langs, ID, SL, lang){
	var ATTRS = ' addthis:url="{url}" addthis:title="{title}" addthis:description="{desc}"';
	var CTN_TB = '<div id="{nid}" class="addthis_inline addthis_toolbox addthis_default_style"'+ATTRS+'">';
	var START_LINK = '<a target="_addthis" id="{nid}" href="http://www.addthis.com/bookmark.php?v=250&amp;pubid={pubid}&amp;url={url}&amp;title={title}"';
	var LINK =   START_LINK+' class="addthis_button_compact">{text}</a>';
    var HEADER_BTN=START_LINK+' class="addthis_inline addthis_button"'+ATTRS+'>';
	var BTN_234 = '<a class="addthis_button_preferred_2"></a><a class="addthis_button_preferred_3"></a><a class="addthis_button_preferred_4"></a>';
	var LAYOUTS = {
		button_classic:		 START_LINK+' class="addthis_button">{text}</a>',
		button_menu:	
		{	tpl: 	START_LINK+' class="addthis_button">{text}</a>',
			cfg: 
		},
		button:   			 LINK,
		toolbox:  			 CTN_TB+'{html}</div>',
		toolbox_button_icons:CTN_TB+LINK+'<span class="addthis_separator">|</span><a class="addthis_button_preferred_1"></a>'+BTN_234+'</div>',
		toolbox_button:      CTN_TB+LINK+'</div>',
		toolbox_icons:       '<a target="_addthis" id="{nid}" class="addthis_button_preferred_1"></a>'+BTN_234+'<a class="addthis_button_compact"></a></div>',
		button_text_icons:	 HEADER_BTN+'<img src="http://s7.addthis.com/static/btn/v2/lg-share-'+lang+'.gif" width="125" height="16" alt="Bookmark and Share" style="border:0"/></a>',
		button_text:		 HEADER_BTN+'<img src="http://s7.addthis.com/static/btn/sm-share-'+lang+'.gif" width="83" height="16" alt="Bookmark and Share" style="border:0"/></a>'
	};
	var api = {
        shortcut:'addthis',
		tpl:'',
		cfg:{
			pubid:'ra-4d80cc1072411e4e',
			text:SL.keyword
		}
	};
	
	console.log('addthis - add config');
	GM_addjs('var addthis_product="f_readerplus", addthis_config={"ui_language":"'+lang+'", "data_track_clickback":true};',true, 'grp_addthis_cfg');
	console.log('addthis - add core');
	GM_addjs('http://s7.addthis.com/js/250/addthis_widget.js#pubid='+api.cfg.pubid, false, 'grp_addthis');
	//GM_addjs('http://googlereaderplus.googlecode.com/svn/trunk/GoogleReaderPlus/test/addthis/addthis_widget-debug.js#pubid='+api.cfg.pubid, false, 'grp_addthis');
		
	var layout = prefs[ID+'_layout'] || 'button_classic';
	console.log('layout='+layout);
	
	var ol=LAYOUTS[layout] || {};
	if (typeof ol !=='object'){
		ol = {tpl: layout};
	}
	
	function renderIcons(){
		var html='',svcs = {email: 'Email', print: 'Print', facebook: 'Facebook', expanded: 'More'};
		for (var s in svcs) {
		    html += '<a class="addthis_button_'+s+'">'+svcs[s]+'</a>';
		}
		return html;
	}
	
	var btn_inc=0;
	function addButtonLink(el, entry, mode, title, text){
		var method='',btncls='', link = getEntryLink(entry), classic = (layout === 'button_classic');
		var o = api.cfg;
		o.text = o.text; //text
		o.url = escapeJson(link.url);
		o.title = escapeJson(link.title);
		o.desc = '';
		o.html='Share';
		
		if (classic) {
			btncls = 'btn-addthis item-star star link unselectable';
		}
		o.nid = 'btn-addthis-'+btn_inc++;
		if (/button/.test(layout)){
			o.method='button';
		}else{
			o.method='toolbox';
			//o.html = renderIcons();
		}
		
		var html = fillTpl(api.tpl, o);
		var title = SL.text + formatShortcut(ID, 'share', prefs); //[b]
		var sp= dhc({root:el, tag: 'span',cls:btncls, html: html, title:title});
		var script=''; //"if(!addthis){console.error('addthis not found');return;}";
		var cfg = '{}';
		if (layout)
		script+="addthis.{method}('#"+o.nid+"', '+cfg+', {'url':'{url}', 'title':'{title}'});";
		//script+="console.log('go_"+o.nid+"');";
		//script+="console.log('addthis='+addthis);";
		//script+="console.log('addthis.{method}='+(addthis && addthis.{method}));";
		//script+="addthis.{method}('#"+o.nid+"');";
		//script+="console.log('stop');";
		script = fillTpl(script, o);
		//console.log(script);
		if (!classic) {
			//setTimeout(function(){
			GM_addjs(script, true, 's_' + o.nid, false, false, false, sp);
			//},1000);
		}
	}
	
	api.button = addButtonLink;
	api.tpl=ol.tpl+api.tpl;
	
    GRP.api_micro(prefs, langs, ID, SL, lang, api);
};