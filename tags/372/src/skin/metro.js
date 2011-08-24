/*
Metro UI theme

Inspired from Metro UI from MS
screenshot : http://mishrareader.codeplex.com/

Author: ludoo
Date : 08/03/11
*/
GRP.metro = function(prefs, langs, ID, SL, lang) {
	var css = '*{font-family:Segoe, Helvetica, sans-serif!important}';
	css += '.scroll-tree .icon, .scroll-tree .favicon{display:none;}';
	css += 'body,span.name, span.name-text, .scroll-tree li a.name-unread{color:#F1EFE2!important;}';
	css += 'li.folder > a.link{background-color: #373E46;}';
	css += 'li.folder > a.link .name, li.folder > a.link span.name-text{color:#de6f28 ! important;}';
	css += '.scroll-tree li a {padding-bottom: 15px;border-bottom: solid 1px #151a20;border-top: solid 1px #44494f;}';
	css += '.scroll-tree li a:hover, #lhn-selectors .selector:hover{background-color: #373E46!important;}';
	css += '.scroll-tree .toggle{background: #de6f28;}';
	css += '.entry {padding:0 !important;}';
	css += '#chrome {border-left: 0px;}';
	css += '.entry, #viewer-top-controls, #entries.list .entry {border-bottom: solid 1px #151a20 !important;border-top: solid 1px #44494f;}';
	css += '.entry .card{margin:0;-webkit-border-radius: none;-webkit-box-shadow:none;}';
	css += '.subscribe-button{background:none;}';
	css += '::-webkit-scrollbar{width:12px;height:12px}::-webkit-scrollbar-track{background-color:#373e46;}::-webkit-scrollbar-thumb{background-color:#de6f28;-webkit-border-radius:0px;}';
	css += '#chrome-lhn-toggle, .fullscreen #chrome-fullscreen-top-toggle {background:#373E46;border:0;}';
	css += '#chrome-lhn-toggle:hover, .fullscreen #chrome-fullscreen-top-toggle:hover {background:#67686C;border:0;}';
	css += '#chrome-lhn-toggle #chrome-lhn-toggle-icon {border-color: #67686C #F1EFE2 #67686C #67686C;}';
	css += '#chrome-lhn-toggle:hover #chrome-lhn-toggle-icon {border-color: #F1EFE2 #67686C #F1EFE2 #F1EFE2;}';
	css += 'body,#chrome-title a, #chrome-title .chevron {color: #67686C;}';
	css += '#chrome.page-view #viewer-page-container, .tab-contents, .tab-group, .bundle-container {background-color: #262B31;}';
	css += 'a, a:visited, .link{color:#F1EFE2;}';

/*
+my theme : 
text color: #67686C (gray)
link : Foreground: #F1EFE2 (white)
author: #de6f28 (orange)
BackgroundColor: #262B31 ()
*/
	GRP.mytheme({
        theme_color: '#67686C' ,
        theme_link: '#F1EFE2' ,
        theme_author: '#de6f28' ,
        theme_bg : '#262B31' 
	});

	GM_addStyle(css, 'rps_'+ID);
	fireResize();
	
	//Reveal scrollbars
	shake('sub-tree');
	shake('viewer-container');
	
	GRP.THEMES.metro=['mytheme'];
};

