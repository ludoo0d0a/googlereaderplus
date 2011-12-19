//webbizgeek skin
//Author: jl kenney
//
//http://www.webbizgeek.com/how-to-add-custom-css-to-google-reader-in-chrome/
//
GRP.webbizgeek = function(prefs, langs, ID, SL, lang) {
	
	var css = '.scroll-tree,.lhn-section{font-size:12px;line-height:25px}';
	
	css+='.folder-name-text{font-size:13px;line-height:28px}';
	css+='#entries.list .entry .collapsed{height:26px;}';
	css+='#entries.list .collapsed .entry-main .entry-source-title{font-size:90%;width:9em;left:24px}';
	css+='.entry-date{font-size:90%}';
	
	css+='.folder-toggle + a.link{background-color:#d6d6d6;border-top:2px solid #F2F2F2}';
css+='.folder .folder > ul .icon{margin-left: 9px;}';
css+='#sub-tree ul ul li a {padding-left: 12px;}';
css+='.folder .folder .folder-toggle {margin-left: 7px;}';
css+='.folder .folder > a > .icon {margin-left: 2px;}';
css+='ul#sub-tree ul ul li a {padding-left: 2px;}';
css+='.scroll-tree li {margin: 0px;}';
css+='.scroll-tree li.folder .link, .scroll-tree li.sub {padding-bottom: 6px;}';
 
	css+='html,.scroll-tree li a,#sub-tree-container,#gbx2,#viewer-header,#lhn-add-subscription-section{background:-webkit-linear-gradient(top,#B2B2B2,#F2F2F2);}';
	css+='#gbx2.gbxngh,#top-bar{background:-webkit-linear-gradient(top,#B9B9B9,#F9F9F9);}';
	css+='#top-bar #logo{display:none;}';
	css+='div#entries.list .read .collapsed, div#entries.list #current-entry .collapsed, div#entries .entry .entry-actions{background:-webkit-linear-gradient(top,#D7D7D7,#F6F6F6);}';
	
	css+='.scroll-tree .icon{background:none}';
	css+='.scroll-tree .folder-name{padding-left:0}.scroll-tree .toggle{top:6px}';
	css+='.section-button{top:7px}.entry-source-title,#current-entry.expanded .entry-secondary-snippet{display:none}';
	css+='#entries.list .collapsed .entry-secondary .entry-title{font-family:Georgia,serif;font-size:115%;font-weight:400}';
	css+='#entries.list .collapsed .entry-main .entry-source-title,#entries .read .collapsed .entry-title{color:#898989}';
	css+='#entries.list .entry .entry-actions{padding:7px 0 7px 18px}';
	css+='.samedir #entries.list .collapsed .entry-secondary{margin-left:11em}';
	css+='.samedir #entries.single-source .collapsed div.entry-secondary{margin-left:13px}';
	css+='.samedir #entries.single-source .collapsed .entry-secondary{margin-left:22px}';
	css+='#sub-tree ul ul li a{padding-left:32px}';
	css+='.collapsed .entry-main img.entry-favicon{left:.9em!important}';
	css+='#logo-section{display:none;}';
	css+='#lhn-add-subscription-section, #viewer-header{height:35px !important;}';
	css+='#lhn-add-subscription{top:15px !important;}';
	GM_addStyle(css, 'rps_'+ID);
	
	var s = get_id('lhn-add-subscription');
	if (s){
		removeClass(s, 'jfk-button-primary');
		addClass(s, 'jfk-button-standard');
	}
	
	fireResize();
};