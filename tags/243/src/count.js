// ==UserScript==
// @name            Google Reader Unread Count
// @version         9
// @namespace       http://ellab.org/
// @author          angusdev
// @description     Display actual unread count instead of "1000+" in Google Reader
// @include         http://www.google.tld/reader/*
// @include         https://www.google.tld/reader/*
// ==/UserScript==

/*
 Author: Angus http://angusdev.mysinablog.com/
 http://angusdev.blogspot.com/
 Date:   2009-11-25
 */

var grp_count = function() {

	var unreadCountElement = null;

	// Wait for the dom ready
	function waitForReady() {
		if (unreadCountElement = document.getElementById('reading-list-unread-count')) {
			window.setInterval(calcUnread, 3000);
			calcUnread();
		} else {
			window.setTimeout(waitForReady, 500);
		}
	}

	function modifySubtree() {
		if (unreadCountElement.textContent.match(/\d{4}\+?/)) {
			calcUnread();
		}
	}

	function findItemUnread(checkDuplicated, item) {
		var hasplus = false;
		var count = 0;
		var alreadyCounted = false;
		var countres = item.innerHTML.match(/\((\d*)\+?\)/);
		if (countres) {
			count = parseInt(countres[1], 10);
			if (item.innerHTML.match(/\(1000\+\)/)) {
				hasplus = true;
			}
			var nodeTitle = item.parentNode.getAttribute('title');
			if (nodeTitle) {
				if (checkDuplicated.indexOf(nodeTitle) < 0) {
					checkDuplicated.push(nodeTitle);
				} else {
					alreadyCounted = true;
				}
			}
		}

		return {
			count : count,
			hasplus : hasplus,
			alreadyCounted : alreadyCounted
		};
	}

	function calcUnread() {
		var checkDuplicated = [];
		var total = 0;
		var totalplus = false;
		var res = document.evaluate("//li[contains(@class, 'folder')]//li[contains(@class, 'folder')]", document, null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for ( var i = 0; i < res.snapshotLength; i++) {
			var res2 = document.evaluate(
					".//li[contains(@class, 'unread')]/a/span/span[contains(@class, 'unread-count')]", res.snapshotItem(i),
					null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			var subtotal = 0;
			var subtotalplus = false;
			for ( var j = 0; j < res2.snapshotLength; j++) {
				var result = findItemUnread(checkDuplicated, res2.snapshotItem(j));
				if (result.hasplus) {
					totalplus = true;
					subtotalplus = true;
				}
				subtotal += result.count;
				if (!result.alreadyCounted) {
					total += result.count;
				}
			}
			if (subtotal > 0) {
				var resfolder = document.evaluate(".//a/span/span[contains(@class, 'unread-count')]", res.snapshotItem(i),
						null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
				if (resfolder) {
					resfolder.innerHTML = '&nbsp;(' + subtotal + (subtotalplus ? '+' : '') + ')';
				}
			}
		}

		// untagged items
		var res2 = document
				.evaluate(
						"//ul[@id='sub-tree']/li/ul/li[not(contains(@class, 'folder')) and contains(@class, 'unread')]/a/span/span[contains(@class, 'unread-count')]",
						document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for ( var j = 0; j < res2.snapshotLength; j++) {
			var result = findItemUnread(checkDuplicated, res2.snapshotItem(j));
			if (result.hasplus) {
				totalplus = true;
			}
			if (!result.alreadyCounted) {
				total += result.count;
			}
		}

		if (total > 0) {
			var totaltext = total + (totalplus ? '+' : '');
			unreadCountElement.innerHTML = ' (' + totaltext + ')';

			//update subtitle (1000+ new items)
			var elnew = document.getElementById('show-new');
			if (elnew && elnew.innerText.indexOf('1000+')>=0){
				elnew.innerText = elnew.innerText.replace('1000+', totaltext);
			}
			
			// update windows title as well
			if (totaltext) {
				var newTitle = '(' + totaltext + ') '
						+ document.title.replace(/\s*\(\d+\+?\)$/, '').replace(/^\(\d+\+?\)\s*/, '');
				;
				if (document.title != newTitle) {
					document.title = newTitle;
				}
			}
		}
	}

	waitForReady();

};