// ==UserScript==
// @name          Google Reader: Mac OS X Snow Leopard Fixes
// @namespace     http://andrewm.info
// @description	  Fixes a few bugs with the excellent Google Reader theme found here - http://userstyles.org/styles/16900
// @author        Andrew Martin
// @homepage      http://andrewm.info/software
// @match         http://www.google.com/reader/view/*
// @match         https://www.google.com/reader/view/*
// ==/UserScript==
//http://userscripts.org/scripts/show/63802

var grp_osfix = function(prefs) {
	// fix the recommended box on the left
	var recommended = document.getElementsByClassName("lhn-section-footer");
	if (recommended) {
		recommended[1].style.background = "#D1D7E2";
	}
	// fix the boxes when you mouse over a feed or folder
	var righty = document.getElementsByClassName("tree-item-action-container");
	if (righty) {
		for ( var i = 0; i < righty.length; i++) {
			righty[i].style.background = "#D1D7E2";
		}
	}
};