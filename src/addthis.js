/**
 * addThis integration
 * @version  0.1
 * @date 
 *
 * AddThis button
 *
 * 
 * see API docs: http://www.addthis.com/help/client-api
 */
GRP.addthis = function(prefs, langs, ID, SL, lang){
	var ATTRS = ' addthis:url="{url}" addthis:title="{title}" addthis:description="{desc}"';
	var CTN_TB = '<div id="{nid}" class="addthis_toolbox addthis_default_style {tbcls}"'+ATTRS+'">';
	var START_LINK = '<a target="_addthis" id="{nid}" href="http://www.addthis.com/bookmark.php?v=250&amp;pubid={pubid}&amp;url={url}&amp;title={title}"';
	var LINK =   START_LINK+' class="addthis_button_compact">{text}</a>';
    var HEADER_BTN=START_LINK+' class="addthis_inline addthis_button"'+ATTRS+'>';
	var LAYOUTS = {
		button_classic: {
			tpl:START_LINK+' class="addthis_button">{text}</a>',
			icon:true,
			nativ:true
		},
		/*button_window: {
			tpl:START_LINK+' class="addthis_button">{text}</a>',
			cfg: {ui_open_windows:true},
			icon:true
		},
		button_menu:{
			tpl: 	START_LINK+' class="addthis_button">{text}</a>',
			cfg: {ui_click: true},
			icon:true
		},*/
		button:   			 START_LINK+' class="addthis_button"></a>',
		button_compact:   	 START_LINK+' class="addthis_button_compact"><img src="http://s7.addthis.com/static/btn/sm-share-'+lang+'.gif" width="83" height="16" alt="Bookmark and Share" style="border:0"/></a>',
		toolbox:  			 CTN_TB+LINK+'{html}</div>',
		toolbox_preferred:{
			tpl:CTN_TB+'{html}</div>',
			items: ['preferred_1','preferred_2','preferred_3','preferred_4','compact']
		},
		toolbox_more:        CTN_TB+'<a class="addthis_button_expanded">AddThis</a></div>',
		toolbox_icons:       {
			tpl:	CTN_TB+'{html}</div>',
			tbcls: 'addthis_32x32_style',
			items: ['email','print','facebook','twitter','expanded']
		}
	};
	var api = {
        shortcut:'addthis',
        icon:ID,
		tpl:'',
		cfg:{
			pubid:'ra-4d80cc1072411e4e',
			text:SL.keyword
		}
	};
	
	GM_addjs('var addthis_product="f_readerplus", addthis_config={"ui_language":"'+lang+'", "data_track_clickback":true};',true, 'grp_addthis_cfg');
	GM_addjs('http://s7.addthis.com/js/250/addthis_widget.js#pubid='+api.cfg.pubid, false, 'grp_addthis');
	//GM_addjs('http://googlereaderplus.googlecode.com/svn/trunk/GoogleReaderPlus/test/addthis/addthis_widget-debug.js#pubid='+api.cfg.pubid, false, 'grp_addthis');
		
	var layout = prefs[ID+'_layout'] || 'button_classic';
	
	var ol=LAYOUTS[layout] || {};
	if (typeof ol === 'string'){
		ol = {tpl: ol};
	}
	
	function renderIcons(){
		var html='';
		foreach(ol.items, function(o){
		   var s = o, v='';
		   if (typeof o ==='object'){
		   		s=o.n;
				v=o.v||'';
		   }
		   html += '<a class="addthis_button_'+s+'">'+v+'</a>';
		});
		return html;
	}
	
	var btn_inc=0;
	function addButtonLink(el, entry, mode, title, text){
		var method='',btncls='', link = getEntryLink(entry);
		var o = api.cfg;
		o.text = o.text; //text
		o.url = escapeJson(link.url);
		o.title = escapeJson(link.title);
		o.desc = '';
		o.html='';
		o.tbcls=ol.tbcls||'';
		
		if (ol.icon) {
			btncls = 'btn-addthis item-star star link unselectable';
		}
		o.nid = 'btn-addthis-'+btn_inc++;
		if (/^button/.test(layout)){
			o.method='button';
		}else{
			o.method='toolbox';
			o.html = renderIcons();
		}
		
		var html = fillTpl(api.tpl, o);
		var _title = SL.text + formatShortcut(ID, 'share', prefs); //[b]
		var sp= dhc({root:el, tag: 'span',cls:btncls, html: html, title:_title});
		var cfg =JSON.stringify(ol.cfg || {});
		var script="addthis.{method}('#"+o.nid+"', '+cfg+', {'url':'{url}', 'title':'{title}'});";
		script = fillTpl(script, o);
		if (!ol.nativ) {
			GM_addjs(script, true, 's_' + o.nid, false, false, false, sp);
		}
	}
	
	api.button = addButtonLink;
	api.tpl=ol.tpl+api.tpl;
	
    GRP.api_micro(prefs, langs, ID, SL, lang, api);
};