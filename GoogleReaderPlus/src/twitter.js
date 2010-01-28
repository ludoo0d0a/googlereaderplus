/**
 * Google Reader + Twitter
 * @version  0.6
 * @date 2009-07-23
 *
 * Adds reader posts to twitter when clicked
 *
 * Original author :
 * terababy
 * http://userscripts.org/scripts/show/10169
 */

GRP.twitter = function(prefs, langs) {
	var SL = langs.twitter; 
	// Constants
	// NORMALIZE=false leaves the tags alone
	// NORMALIZE=true converts tags to proper case and replaces -'s with spaces,
	// like reader should itself

	var URL_SHORTENER = 'tinyurl';// bitly, tinyurl

	// format the message to send, pls type as you like
	function formatSendMsg(labels, title, notes, url) {
		var msg = "";
		if (notes.length > 0) {
			msg = notes + " ";
		}
		if (labels.length > 0) {
			msg = msg + "#" + labels + " ";
		}
		msg = msg + "reading:" + title + ' ' + url;
		return msg;
		// return notes + " reading " + title + ' ' + url;
	}

	var urlShorteners = {
		'bitly' : getTinyAndInsert_BitLy,
		'tinyurl' : getTinyAndInsert_TinyURL
	};

	function getTinyAndInsert_TinyURL(event) {
		var thelongurl = encodeURIComponent(url);
		// urlinput.value = "making url tiny...";
		GM_xmlhttpRequest( {
			method : 'GET',
			url : "http://tinyurl.com/create.php?url=" + thelongurl,
			onload : function(responseDetails) {
				if (responseDetails.status == 200) {
					var t = responseDetails.responseText;
					urlinput.value = t.match(/<blockquote><b>(http\:\/\/tinyurl\.com\/[a-zA-Z0-9]+)<\/b><br>/)[1];
					countWord(event);
				}
			}
		});
	}

	function getTinyAndInsert_BitLy(event) {
		var thelongurl = encodeURIComponent(url);
		// urlinput.value = "making url tiny...";
		GM_xmlhttpRequest( {
			method : 'GET',
			url : "http://api.bit.ly/shorten?version=2.0.1&login=twitthis&apiKey=R_f0b6b5e3a4c028b3ec97119e4f3ce16c&format=xml&longUrl="
					+ thelongurl,
			onload : function(responseDetails) {
				var tinydom = new DOMParser().parseFromString(responseDetails.responseText, "application/xml");
				urlinput.value = tinydom.getElementsByTagName('shortUrl')[0].textContent;
				countWord(event);
			}
		});
	}

	// -------------------------- shorturl service end
	// ---------------------------------

	var getTinyAndInsert = urlShorteners[URL_SHORTENER];

	var DEFAULT_LABEL = "";
	var NORMALIZE = true;

	// Variables for editing bookmark details
	var bookmarkField;
	var bookmarkStar;
	var lblinput;
	var notesinput;
	var urlinput;
	var url;
	var titleinput;
	var notesdesc;

	var mode;

	function addTwitterButton(el, entry, mode) {
		var btn = document.createElement("span");
		btn.className = "btn-twitter item-star star link";
		btn.innerHTML = "Twitter";
		var text = 'Share this news on Twitter' + formatShortcut('twitter', 'tweet', prefs); //[d]
		btn.title = text; //"Share this news on Twitter [d]";
		btn.addEventListener("click", postBookmark, false);
		el.appendChild(btn);
	}
	function postBookmarkKey(e) {
		var entry = getCurrentEntry();
		var el = getFirstElementMatchingClassName(entry, 'span', 'btn-twitter');
		postBookmark( {
			target : el
		});
		// TODO : optimize entry
	}

	function postBookmark(el) {
		bookmarkStar = event.target;
		var parent = findParentNode(bookmarkStar, 'div', 'entry');
		var header;
		if (mode == "expanded") {
			// parent = bookmarkStar.parentNode.parentNode.parentNode;
			bookmarkStar.parentNode.parentNode.className = "card-actions";
		} else {
			// parent = bookmarkStar.parentNode.parentNode;
			parent.className = "entry read expanded action-area-visible";
		}
		bookmarkStar.className = "item-star star link email-active";
		var l = getFirstElementMatchingClassName(parent, 'a', 'entry-title-link');
		url = l.href; // getAttribute('href');
		var title = l.firstChild.nodeValue;
		var pos = findPos(bookmarkStar);
		var addbkmk = getBookmarkField();
		if (mode == "expanded") {
			if (addbkmk.className == "action-area card-bottom") {
				bookmarkStar.className = "item-star star link";
				addbkmk.className = "action-area card-bottom hidden";
				bookmarkStar.parentNode.parentNode.className = "card-actions card-bottom";
				return;
			}
			addbkmk.className = "action-area card-bottom";
		} else {
			if (addbkmk.className == "action-area") {
				bookmarkStar.className = "item-star star link";
				addbkmk.className = "action-area hidden";
				parent.className = "entry read expanded";
				return;
			}
			addbkmk.className = "action-area";
		}
		parent.appendChild(bookmarkField);
		lblinput = document.getElementById("lblinput");
		notesinput = document.getElementById("notesinput");
		urlinput = document.getElementById("urlinput");
		titleinput = document.getElementById("titleinput");
		notesdesc = document.getElementById("notesdesc");
		notesinput.addEventListener('click', function() {
			notesinput.focus();
		}, false);
		notesinput.value = "";
		lblinput.value = getTags(parent);
		urlinput.value = url;
		titleinput.value = title;
		btnSend = document.getElementById("btnSend");
		btnTinyURL = document.getElementById("btnTinyURL");
		btnCount = document.getElementById("btnCount");
		btnCancel = document.getElementById("btnCancel");
		btnSend.addEventListener('click', saveBookmark, false);
		btnTinyURL.addEventListener('click', getTinyAndInsert, false);
		btnCount.addEventListener('click', countWord, false);
		if (mode == "expanded") {
			btnCancel.addEventListener("click", function() {
				bookmarkStar.parentNode.parentNode.className = "card-actions card-bottom";
				bookmarkField.className = "action-area card-bottom hidden";
				bookmarkStar.className = "item-star star link";
				notesdesc.innerHTML = "<b>Note to go along with the item:</b> (Optional, no more than 140 characters)";
				notesinput.value = "";
			}, false);
		} else {
			btnCancel.addEventListener("click", function() {
				parent.className = "entry read expanded";
				bookmarkField.className = "action-area hidden";
				bookmarkStar.className = "item-star star link";
				notesdesc.innerHTML = "<b>Note to go along with the item:</b> (Optional, no more than 140 characters)";
				notesinput.value = "";
			}, false);
		}
		countWord(event);
		btnSend.focus();
		notesinput.focus();
	}

	function getBookmarkField() {
		if (!bookmarkField) {
			bookmarkField = document.createElement("div");
			bookmarkField.setAttribute("id", "twitterField");
			bookmarkField.innerHTML = "<div class='email-this-area'> <iframe id='iftwitter' src='https://twitter.com/statuses/update.xml' width='0' height='0' style='display:block;'></iframe><table class='email-entry-table'> <tbody> <tr> <td class='field-name'>Title:</td> <td><input aria-haspopup='true' class='email-this-subject tags-edit-tags label-input' type='text' id='titleinput'></td> </tr> <tr> <td class='field-name'>Tag:</td> <td><input aria-haspopup='true' class='email-this-subject tags-edit-tags label-input' type='text' id='lblinput'></td> </tr> <tr> <td class='field-name'>URL:</td> <td><input aria-haspopup='true' class='email-this-subject tags-edit-tags label-input' type='text' id='urlinput'></td> </tr> <tr> <td colspan='2'><div id='notesdesc'><b>Note to go along with the item:</b> (Optional, no more than 140 characters)</div><br> <textarea class='email-this-comment' rows='6' id='notesinput'></textarea> <div class='email-this-buttons' tabindex='-1'> <div role='wairole:button' tabindex='0' class='goog-button goog-button-base unselectable goog-inline-block goog-button-float-left email-this-send' id='btnSend'> <div class='goog-button-base-outer-box goog-inline-block'> <div class='goog-button-base-inner-box goog-inline-block'> <div class='goog-button-base-pos'> <div class='goog-button-base-top-shadow'>&nbsp;</div> <div class='goog-button-base-content'> <div class='goog-button-body'>Send</div> </div></div></div></div></div> <div role='wairole:button' tabindex='0' class='goog-button goog-button-base unselectable goog-inline-block goog-button-float-left email-this-cancel' id='btnTinyURL'> <div class='goog-button-base-outer-box goog-inline-block'> <div class='goog-button-base-inner-box goog-inline-block'> <div class='goog-button-base-pos'> <div class='goog-button-base-top-shadow'>&nbsp;</div> <div class='goog-button-base-content'> <div class='goog-button-body'>TinyURL</div> </div></div></div></div></div> <div role='wairole:button' tabindex='0' class='goog-button goog-button-base unselectable goog-inline-block goog-button-float-left email-this-cancel' id='btnCount'> <div class='goog-button-base-outer-box goog-inline-block'> <div class='goog-button-base-inner-box goog-inline-block'> <div class='goog-button-base-pos'> <div class='goog-button-base-top-shadow'>&nbsp;</div> <div class='goog-button-base-content'> <div class='goog-button-body'>Count</div> </div></div></div></div></div> <div role='wairole:button' tabindex='0' class='goog-button goog-button-base unselectable goog-inline-block goog-button-float-left email-this-cancel' id='btnCancel'> <div class='goog-button-base-outer-box goog-inline-block'> <div class='goog-button-base-inner-box goog-inline-block'> <div class='goog-button-base-pos'> <div class='goog-button-base-top-shadow'>&nbsp;</div> <div class='goog-button-base-content'> <div class='goog-button-body'>Cancel</div> </div></div></div></div></div> </div></td></tr></tbody></table> </div>";
		}
		return bookmarkField;
	}

	function getTags(parent) {
		var taglist = getElementsByClazzName("user-tags-list", "ul", parent)[0];
		var ins = taglist.getElementsByTagName("li");
		var lbls = "";
		for ( var i = 0; i < ins.length; i++) {
			var lbl = ins[i].getElementsByTagName("a")[0].text;
			if (NORMALIZE) {
				lbl = lbl.replace(/-/g, ' ');
				lbl = lbl.toLowerCase().replace(/^(.)|\s(.)/g, function($1) {
					return $1.toUpperCase();
				});
			}
			if (i > 0) {
				lbls += ", ";
			}
			lbls += lbl;
		}
		if (DEFAULT_LABEL.length > 0) {
			if (lbls.length > 0) {
				lbls = DEFAULT_LABEL + ", " + lbls;
			} else {
				lbls = DEFAULT_LABEL;
			}
		}
		return lbls;
	}

	function findPos(obj) {
		var curleft = 0, curtop = 0;
		if (obj.offsetParent) {
			curleft = obj.offsetLeft + obj.offsetParent.offsetLeft;
			curtop = obj.offsetTop + obj.offsetParent.offsetTop + obj.offsetParent.offsetParent.offsetTop;
		}
		return [ curleft, curtop ];
	}

	function saveBookmark(event) {

		var title = titleinput.value;
		var labels = lblinput.value;
		var notes = notesinput.value;
		var msg = formatSendMsg(labels, title, notes, urlinput.value);
		var size = 140 - countMsgWord(msg);
		if (size < 0) {
			alert("the message is too long!");
			notesdesc.innerHTML = "<b>Note to go along with the item:</b> (Optional, remain " + size + " characters)";
			return;
		}

		GM_log("URL: " + url + "\nTitle: " + title + "\nTags: " + labels + "\nNotes: " + notes);
		GM_xmlhttpRequest( {
			method : 'POST',
			url : 'https://twitter.com/statuses/update.xml',
			headers : {
				'Content-type' : 'application/x-www-form-urlencoded'
			},
			data : 'source=GRSharing&status=' + formatSendMsg(labels, title, notes, encodeURIComponent(urlinput.value)),
			onload : function(r) {
				GM_log('onload returned status:' + r.status + ',statusText:' + r.statusText + '\n' + ',responseHeaders:'
						+ r.responseHeaders + '\n' + 'responseText:\n' + r.responseText);
				var v = false;
				if (authenticated){
					activeStar();
				}else{
					
				}
			},
			onerror: function(r){
				GM_log('onerror'+ r.responseText);
				alert('Please login to Twitter');
				var iframe = document.getElementById('iftwitter');
				//iframe.src=iframe.src;
				iframe.location.reload(true);
				//update iframe to fire popup login
			}
		});
		
	}
	function activeStar() {
		if (mode == "expanded") {
			getElementsByClazzName("card-actions", "div", bookmarkField.parentNode)[0].className = "card-actions card-bottom";
		} else {
			bookmarkField.parentNode.className = "entry read expanded";
		}
		bookmarkField.className += " hidden";
		bookmarkStar.className = "item-star-active star link";
		notesinput.value = "";
	}

	function countWord(event) {

		var title = titleinput.value;
		var labels = lblinput.value;
		var notes = notesinput.value;
		var msg = formatSendMsg(labels, title, notes, urlinput.value);
		notesdesc.innerHTML = "<b>Note to go along with the item:</b> (Optional, remain " + (140 - countMsgWord(msg))
				+ " characters)";
	}

	function countMsgWord(str) {
		var len;
		var i;
		len = 0;
		for (i = 0; i < str.length; i++) {
			if (str.charCodeAt(i) > 255) {
				len++;
			} else {
				len++;
			}
		}
		return len;
	}

	initCatchEntries(addTwitterButton, 'etwitter');
	
	var keycode = getShortcutKey('twitter', 'tweet', prefs); //68 d
	keycode.fn = postBookmarkKey;
	initKey(keycode);
};