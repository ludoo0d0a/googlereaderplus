//webbizgeek skin
//Author: jl kenney
//http://code.google.com/p/googlereaderplus/issues/detail?id=282
//http://www.webbizgeek.com/how-to-add-custom-css-to-google-reader-in-chrome/
GRP.webbizgeek = function(prefs, langs, ID, SL, lang) {
	var css = ".scroll-tree,.lhn-section{font-size:12px;line-height:25px}.folder-name-text{font-size:13px;line-height:28px}#entries.list .entry .collapsed{height:3ex;line-height:3ex}#entries.list .collapsed .entry-main .entry-source-title{font-size:90%;width:9em;left:10px!important}.entry-date{font-size:90%}#chrome-lhn-toggle,#viewer-header{background:#d6d6d6}.scroll-tree li a,#sub-tree-container,#sub-tree,.gecko{background:#F2F2F2}.folder-toggle + a.link{background:#d6d6d6;border-top:2px solid #F2F2F2}.lhn-section-primary,.lhn-subscriptions,#lhn-add-subscription-section,html{background:#F2F2F2!important;xborder-top:2px solid #fff}html,#logo-container,#guser,h1.logo{background:#F2F2F2!important}#entries.list .read .collapsed{background:#F0F0F0!important}#entries.list .expanded .collapsed{background:#d6d6d6!important}#sub-tree-container{border-top:2px solid #C2CFF1}.scroll-tree .icon,.entry .entry-icons .star{background:none}.scroll-tree .favicon{top:4px}.scroll-tree .folder-name{padding-left:0}.scroll-tree .toggle{top:6px}.section-button{top:7px}.entry-source-title,#current-entry.expanded .entry-secondary-snippet{display:none}#entries.list .collapsed .entry-secondary .entry-title{font-family:Georgia,serif;font-size:115%;font-weight:400}#entries.list .collapsed .entry-main .entry-source-title,#entries .read .collapsed .entry-title{color:#898989}#entries.list .entry .entry-actions{background:#E3E3E3;padding:7px 0 7px 18px}.samedir #entries.list .collapsed .entry-secondary{margin-left:11em}.samedir #entries.single-source .collapsed div.entry-secondary{margin-left:13px}.samedir #entries.single-source .collapsed .entry-secondary{margin-left:10px!important}#sub-tree ul ul li a{padding-left:32px};.collapsed .entry-main img.entry-favicon{left:.9em!important}";
	//new UI
	//css +='#gb{display:none}';
	GM_addStyle(css, 'rps_'+ID);
};