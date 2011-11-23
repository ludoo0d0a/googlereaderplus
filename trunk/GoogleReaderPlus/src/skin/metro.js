/*
Metro UI theme

Inspired from Metro UI from MS
screenshot : http://mishrareader.codeplex.com/

Author: ludoo
Date : 08/03/11
*/
GRP.metro = function(prefs, langs, ID, SL, lang) {
/*
+my theme : 
text color: #67686C (gray)
link : Foreground: #F1EFE2 (white)
author: #de6f28 (orange)
BackgroundColor: #262B31 ()
*/
	var C={
		orange:'#DE6F28',
		dark_orange: '#CD5A06',
		white: '#F1EFE2',
		//button
		gray:'#67686C',
		light_gray:'#CCC',
		dark_gray:'#4D4E51',
		bg: '#262B31'	
	}
	
	var css = '*{font-family:Segoe, Helvetica, sans-serif!important}';
	css += '.scroll-tree .icon, .scroll-tree .favicon{display:none;}';
	css += 'body,span.name, div.name-text, .scroll-tree li a.name-unread{color:'+C.white+'!important;}';
	css += 'div.name-text{margin-left: 30px;}';
	css += 'li.folder > a.link{background-color: #373E46;}';
	css += 'li.folder > a.link .name, li.folder > a.link div.name-text{color:'+C.orange+' ! important;}';
	css += '.scroll-tree li a {/*padding-bottom: 15px;*/border-bottom: solid 1px #151a20;border-top: solid 1px #44494f;}';
	css += '.scroll-tree li a:hover, #lhn-selectors .selector:hover{background-color: #373E46!important;}';
	css += '.scroll-tree .toggle{background:'+C.orange+';}';
	css += '.entry {padding:0 !important;}';
	css += '#chrome {border-left: 0px;}';
//	css += '.entry, #viewer-top-controls, #entries.list .entry {border-bottom: solid 1px #151a20 !important;border-top: solid 1px #44494f;}';
	css += '.entry .card{margin:0;-webkit-border-radius: none;-webkit-box-shadow:none;}';
	css += '.subscribe-button{background:none;}';
	css += '::-webkit-scrollbar{width:12px;height:12px}::-webkit-scrollbar-track{background-color:#373e46;}::-webkit-scrollbar-thumb{background-color:;-webkit-border-radius:0px;}';
	css += '#chrome-lhn-toggle, .fullscreen #chrome-fullscreen-top-toggle {background:#373E46;border:0;}';
	css += '#chrome-lhn-toggle:hover, .fullscreen #chrome-fullscreen-top-toggle:hover {background:'+C.gray+';border:0;}';
	css += '#chrome-lhn-toggle #chrome-lhn-toggle-icon {border-color: '+C.gray+' '+C.white+' '+C.gray+' '+C.gray+';}';
	css += '#chrome-lhn-toggle:hover #chrome-lhn-toggle-icon {border-color: '+C.white+' '+C.gray+' '+C.white+' '+C.white+';}';
	css += 'body,#chrome-title a, #chrome-title .chevron {color: '+C.gray+';}';
	css += '#chrome.page-view #viewer-page-container, .tab-contents, .tab-group, .bundle-container {background-color: #262B31;}';
	css += 'a, a:visited, .link{color:'+C.white+';}';
	//new UI
	css += '.card .card-bottom, #entries.list .entry .entry-actions{padding:0;border:0;}';
	css += '.jfk-button-primary,.jfk-button-primary.jfk-button-hover{background:transparent;color:'+C.orange+'! important;box-shadow:none;-webkit-box-shadow:none;border:none;}';
	css += '.jfk-button-primary.jfk-button-hover{font-weight:bold;}';

	css += '.goog-inline-block,.jfk-button-standard {color: white !important;}';
	css += '.jfk-button-standard, .goog-flat-menu-button, .goog-button-base-inner-box{background-color: '+C.gray+';background-image: -webkit-linear-gradient(top,'+C.gray+','+C.dark_gray+');border: 1px solid '+C.dark_gray+';}';
	css += '.jfk-button-standard.jfk-button-checked{background-color: '+C.light_gray+' !important;background-image: -webkit-linear-gradient(top,'+C.light_gray+','+C.gray+') !important;border: 1px solid '+C.gray+' !important;}';
	css += '.goog-flat-menu-button.goog-flat-menu-button-hover, .jfk-button-standard.jfk-button-hover, .jfk-button-standard.jfk-button-clear-outline.jfk-button-hover, .goog-flat-menu-button.goog-flat-menu-button-hover, .goog-button-base:hover .goog-button-base-inner-box{background-color: '+C.gray+';background-image: -webkit-linear-gradient(top,'+C.gray+',#616161);border: 1px solid #6E6F61;color: white !important;}';

	css += '.goog-flat-menu-button.goog-flat-menu-button-open, .goog-flat-menu-button.goog-flat-menu-button-active{background-color: '+C.gray+';background-image: -webkit-linear-gradient(top,'+C.gray+','+C.dark_gray+');border: 1px solid '+C.dark_gray+';}';
	css += '.goog-flat-menu-button,.goog-flat-menu-button-focused{border-color:'+C.dark_gray+' !important;}';
	
	css += '.goog-menu,.gbmc{background-image: -webkit-linear-gradient(top,'+C.gray+','+C.dark_gray+');}';
	css += '.goog-menuitem-highlight, .goog-menuitem-hover {background-color: '+C.light_gray+';border-color: '+C.light_gray+';}';
	css += '.goog-menuitem, .goog-tristatemenuitem, .goog-filterobsmenuitem {color: '+C.white+';}';
	
	css += '.goog-button-base:hover .goog-button-base-content, .goog-button-base:focus .goog-button-base-content {	color: '+C.white+'}';
	css += '.goog-button-base-outer-box {border-top: 1px solid '+C.dark_gray+' !important;border-bottom: 1px solid '+C.dark_gray+' !important;}';

	css += '.jfk-button-action {background-color: '+C.orange+';background-image: -webkit-linear-gradient(top,'+C.orange+','+C.dark_orange+');border: 1px solid '+C.dark_orange+';}';
	css += '.jfk-button-action.jfk-button-hover {background-color: #357AE8;background-image: -webkit-linear-gradient(top,'+C.orange+',#984A17);border: 1px solid #984A17;}';
	
	css += '.gbmt, .gbml1, .gbmt:visited, .gbml1:visited {color: '+C.white+' !important;}';
	css += '.gbmt-hvr, .gbmt:focus {background: '+C.light_gray+'; color: '+C.white+' !important;}';
	
	css += '#lhn-selectors .selected a span, #lhn-selectors .selected a:hover span {color: '+C.dark_orange+';}';

var ICONS_PATH = 'http://googlereaderplus.googlecode.com/svn/trunk/GoogleReaderPlus/images/toolbar/white/';

function setIcon(root, img, i){
	var el = root;
	if (el && typeof el === 'string'){
		el = get_id(el);
	}
	if (el && (typeof i !== 'undefined')){
		el=el.children[i];
	}
	if (el && el.firstChild){
		el.firstChild.src=ICONS_PATH+img+'.png';
	}
}

setIcon('viewer-refresh', '681661618-refresh');
var svoc = get_id('stream-view-options-container');
setIcon(svoc, '138769644-magnifying_glass', 0);
setIcon(svoc, '3538434020-view_options_details', 1);
setIcon(svoc, '3369744051-view_options_list', 2);

setIcon('entries-up', '3172090053-down_arrow');
setIcon('entries-down', '3978377008-up_arrow');
setIcon('settings-button', '345992534-settings',0);

	GRP.mytheme({
        theme_color: C.gray ,
        theme_link: C.white ,
        theme_author: C.orange ,
        theme_bg : C.bg  
	});

	GM_addStyle(css, 'rps_'+ID);
	fireResize();
	
	//Reveal scrollbars
	shake('sub-tree');
	shake('viewer-container');
	
	GRP.THEMES.metro=['mytheme'];
};

