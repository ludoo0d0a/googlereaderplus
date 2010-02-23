// ==UserScript==
// @name            Google Reader Optimized Skin
// @namespace      http://userstyles.org
// @author           kouz
// @homepage         http://www.daydreamz.cn
// @include        *google.com/reader/*
// ==/UserScript==
//http://userscripts.org/scripts/show/61552

GRP.optimized = function() {
	var css = 'body{font-family:Lucida Grande,Helvetica,Arial,sans-serif;background:#fff;} #global-info{display:none;}#nav{position:absolute;top:0;width:240px;}#chrome{margin-left:240px;}#lhn-add-subscription{left:775px;top:20px;}.goog-button-base-content{line-height:1.4em;}#gbar,#logo-container,#viewer-footer{display:none;}#search{top:1px;left:1px;position:absolute;}#main{top:0;background:#E1ECFE;}#search-input{font-size:13px;height:17px;margin:1px 0 0 1px;padding:3px 0 0 2px;width:144px;}#search-restrict{border:0;}#search-restrict-button{margin:1px 0 0;}.search-restrict-contents{width:60px;}#search-restrict-input{width:60px;}#search-submit{display:none;}#lhn-selectors,#sub-tree,#friends-tree-item-0-main ul,.scroll-tree li,#lhn-selectors .selector{background-color:#E1ECFE;} #lhn-selectors.lhn-section-minimized .selector,#lhn-subscriptions ,#lhn-friends .lhn-section-primary,#lhn-selectors .selected, #lhn-selectors .selected:hover{background-color:#B6EFBB;} .lhn-section-footer {background-color:#C2CFF1;} .scroll-tree li a .name{color:#888888;}.scroll-tree li a .name-unread{color:#111111;} #chrome-title{font-size:13px;line-height:1;}#chrome-header{padding:3px 11px;}#viewer-top-controls{height:22px;padding:3px 3px 1px;}#entries.list .entry .collapsed {border:1px solid #FFFFFF;height:2.1ex;line-height:2.3ex;}';
	GM_addStyle(css, 'rps_optimized');
	fireResize();
};
