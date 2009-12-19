// ==UserScript==
// @name           Google Reader: Fixer
// @description    Fix all missing images in enclosures.
// @author henrah / LudoO(xeoos.fr) 
// @namespace      http://www.pitaso.com
// @include        htt*://www.google.*/reader/view*
// ==/UserScript==

var grp_fixenclosures = function() {

	function checkImage(root, href) {
		var links = getElements(".//img[@src='" + href + "']", root);
		return (links && links.length > 0);
	}
	function fixEnclosures() {
		var nodes = getElements("//a[span[@class='view-enclosure']]");
		if (!nodes || !nodes.length) {
			return;
		}

		nodes.forEach(function(o) {
			var entry = findParentNode(o, 'div', 'entry');
			if (entry) {
				var found = checkImage(entry, o.href);
				var p = o.parentNode.parentNode;
				if (found) {
					if (p && p.parentNode) {
						p.parentNode.removeChild(p);
					}
				} else {
					var div = document.createElement('div');
					div.className = "item-pict";
					var img = document.createElement('img');
					div.appendChild(img);
					img.src = o.href;
					img.align = "left";
					if (p && p.parentNode) {
						p.parentNode.replaceChild(div, p);
					}
				}
			}
		});
	}

	var e = document.getElementById('entries');
	if (e) {
		e.addEventListener('DOMNodeInserted', function() {
			fixEnclosures();
		}, false);
	}
	fixEnclosures();// on load
};
