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
		button_classic:'<a class="addthis_button" id="{nid}">{text}</a>',
		button:   LINK,
		toolbox:  CTN_TB+'{html}</div>',
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
	
	//GM_addjs('var addthis_config={"ui_language":"'+lang+'", "data_track_clickback":true};',true, 'grp_addthis_cfg');
	//GM_addjs('http://s7.addthis.com/js/250/addthis_widget.js#pubid='+api.cfg.pubid, false, 'grp_addthis');
	//GM_addjs('http://googlereaderplus.googlecode.com/svn-history/r1024/trunk/GoogleReaderPlus/test/addthis_widget.js#pubid='+api.cfg.pubid, false, 'grp_addthis');
	
	chrome.tabs.executeScript(null, {file: "lib/addthis_widget-debug.js"});
	
	var layout = prefs[ID+'_layout'] || 'button';
	console.log('layout='+layout);

	function renderIcons(){
		var html='',svcs = {email: 'Email', print: 'Print', facebook: 'Facebook', expanded: 'More'};
		for (var s in svcs) {
		    html += '<a class="addthis_button_'+s+'">'+svcs[s]+'</a>';
		}
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
		o.html='Share';
		/*if (layout === 'button_classic') {
			btncls = 'item-star star link unselectable';
		}*/
		o.nid = 'btn-addthis-'+btn_inc++;
		if (/button/.test(layout)){
			o.method='button';
		}else{
			o.method='toolbox';
			//o.html = renderIcons();
		}
		
		var html = fillTpl(api.tpl, o);
		var sp= dhc({root:el, tag: 'span',cls:'btn-addthis '+btncls, html: html
		/*
		, events:{
			mouseover: {
				fn: function(e){
					setTimeout(function(){
						var top = findTop(e.target) + 20;
						var el = get_id('at15s');
						if (el) {
							el.style.top = top + 'px';
						}
					}, 300);
				},
				capture:true
			}}
			*/
		});
		var script=''; //"if(!addthis){console.error('addthis not found');return;}";
		//script+="addthis.{method}('#"+o.nid+"', {}, {'url':'{url}', 'title':'{title}'});";
		script+="console.log('go_"+o.nid+"');";
		script+="console.log(addthis);";
		script+="console.log(addthis.{method});";
		script+="addthis.{method}('#"+o.nid+"');";
		script+="console.log('stop');";
		script = fillTpl(script, o);
		//console.log(script);
		setTimeout(function(){
			addthis[o.method]('#"+o.nid+"');
			//GM_addjs(script, true, 's_'+o.nid, false, false, false, sp);
		},1000);
	}
	
	api.button = addButtonLink;
	api.tpl=LAYOUTS[layout]+api.tpl;
	
    GRP.api_micro(prefs, langs, ID, SL, lang, api);
};