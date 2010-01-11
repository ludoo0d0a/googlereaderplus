// ==UserScript==
// @name          Google Reader - Mark Until Current As Read v 1.3
// @namespace     http://buzypi.in/
// @description   Mark all entries upto the current entry as read
// @include       http://www.google.com/reader*
// @include       https://www.google.com/reader*
// ==/UserScript==

//Google Reader - Mark Until Current As Read v 1.3
//http://userscripts.org/scripts/show/24955

/* Modifications to this script is permitted provided this comment is retained in its entirety.
 * Copyright: Gautham Pai
 * Author: Gautham Pai
 * http://buzypi.in/
 */

var grp_mark = function(prefs) {
	var currentElement, modeList=false;

	function setConfig(){
		currentElement = getCurrentEntry();
		modeList=getMode(currentElement)=='list';
	}
	function clickEntry(entry, modeList){
		if (!hasClass(entry,'read')){
			var el = (modeList)?entry.firstChild:entry;
			simulateClick(el);
		}
	}
	function markUntilCurrentAsRead() {
		setConfig();
		var nextElement=currentElement.previousSibling;
		while(nextElement){
			clickEntry(nextElement, modeList);
			nextElement=nextElement.previousSibling;
		}
		
		simulateClick(currentElement.childNodes[0]);
	}

	function markAfterCurrentAsRead() {
		setConfig();
		var nextElement=currentElement.nextSibling;
		while(nextElement){
			clickEntry(nextElement, modeList);
			nextElement=nextElement.nextSibling;
		}
		simulateClick(currentElement.childNodes[0]);
	}

	//w, k
	initKey([{key:87, fn:markUntilCurrentAsRead}, {key:75, fn:markAfterCurrentAsRead}]);
};