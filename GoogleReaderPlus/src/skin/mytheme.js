//My theme
//Customizable theme with background picture
//
GRP.mytheme = function(prefs){
    var tpl = "body{{bg}background-size:100%!important}#logo{display:none}body,#gbar,#guser,.text,.gbh,#explore-promo,#tips,#overview-footer,.viewer-page,#lhn-selectors,#quick-add-success,.friend-interruption,#directory-box .tab-group,#directory-box .tab-contents,#directory-contents .tab-header,.tab-group-contents,#featured-bundles-container,#discover-table td,.bundle-container th,#friends-tree .friends-tree-following-info,#directory-welcome-conversion,.date-tooltip td,.date-tooltip,.text-tooltip,.text-tooltip td{color:{color}!important;border:0!important}#gbar a,#gbar a:visited,#guser a,#guser a:visited,a,.link,#current-entry.read .entry-container .entry-body,.read .entry-container .entry-body,#overview .item-snippet,#team-messages .body,#overview .label,p,dl,multicol,.overview-item-link,address,blockquote,body,caption,center,col,colgroup,dd,dir,div,dl,dt,fieldset,form,h1,h2,h3,h4,h5,h6,hr,html,isindex,li,listing,map,marquee,menu,noframes,ol,p,plaintext,pre,table,tbody,td,tfoot,th,thead,tr,ul,xmp,#recent-activity #recent-activity-kept-unread h4,#recent-activity #recent-activity-read h4,#explore-promo-new,#recent-activity .recent-stream-title{color:{color}!important}.email-active,.item-link-active,.entry-likers,.tree-link-selected,.lhn-section,.scroll-tree li,#chrome-header,#viewer-header,#viewer-footer,#chrome,.card-common,span.name-text,.name{background:transparent!important;color:{color}!important;border:0!important}#viewer-container,.entry,.card-actions,.collapsed,.entry-container,.entry-actions,.scroll-tree li a.menu-open:hover,a:hover .tree-item-action-container,.section-button,.section-menubutton,#message-area-inner,.message-area-text,#message-area-outer,#loading-area,#chrome-view-links,#loading,#no-entries-msg,.message-area-text-container,.offscreen,.hover-form,.action-area,.email-this-area,.preview-interruption{background-color:transparent!important}#entries.list .read .collapsed{border:0!important}.scroll-tree li a:hover{background-color:{bg}!important}";

	var o = {
        bg: (prefs.theme_url)?('background:url('+prefs.theme_url+') no-repeat fixed top center!important;'):'',
        color: prefs.theme_color||'#aaa',
        bg: prefs.theme_bg||'#ffc'
    };
	
    var css = fillTpl(tpl, o);
    GM_addStyle(css, 'rps_mytheme');
};
