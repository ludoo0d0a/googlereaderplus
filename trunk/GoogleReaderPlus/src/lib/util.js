//
// Global util functions
//
function hasClass(el, clazz) {
	if (!el.className) {
		return false;
	}
	var reClassname = new RegExp("(^|\\s)" + clazz + "(\\s|$)");
	return (reClassname.test(el.className));
}
function findParentNode(eel, etag, clazz) {
	var tag = etag.toUpperCase();
	var el = eel.parentNode;
	if (clazz) {
		// Find first element's parent node matching tag and className
		while (el && el.tagName !== 'BODY' && (el.tagName !== tag || !hasClass(el, clazz))) {
			// console.log(el.tagName+'.'+el.className);
			el = el.parentNode;
			/*
			 * if (!el){ console.log('el null for clazz '+clazz ); }
			 */
		}
	} else {
		while (el && el.tagName !== 'BODY' && el.tagName !== tag) {
			el = el.parentNode;
		}
	}
	return ((el && el.tagName !== 'BODY') ? el : false);
}

function getFirstElementMatchingClassName(root, tag, clazz) {
	var elements = root.getElementsByTagName(tag);
	var i = 0;
	while (elements[i] && !hasClass(elements[i], clazz)) {
		i++;
	}
	return ((!elements[i]) ? null : (elements[i]));
}

/*
 * function getElementsByClassName(root, tag, class) { var elements =
 * root.getElementsByTagName(tag); var results = new Array(); for ( var i = 0; i <
 * elements.length; i++) { if (elements[i].className.indexOf(class) > -1) {
 * results.push(elements[i]); } } return (results); }
 */
function getElementsByClazzName(clazz, itag, ielm) {
	var tag = itag || "*";
	var elm = ielm || document;
	var elements = (tag == "*" && elm.all) ? elm.all : elm.getElementsByTagName(tag);
	var returnElements = [];
	var current;
	var length = elements.length;
	for ( var i = 0; i < length; i++) {
		current = elements[i];
		if (hasClass(current, clazz)) {
			returnElements.push(current);
		}
	}
	return returnElements;
}

function getElements(xpath, context) {
	var doc = (context) ? context.ownerDocument : document;
	var r = doc.evaluate(xpath, (context || doc), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for ( var i = 0, l = r.snapshotLength, res = new Array(l); i < l; i++) {
		res[i] = r.snapshotItem(i);
	}
	return res;
}
function get_id(id) {
	return document.getElementById(id);
}
function getElementValue(query, context) {
	var doc = (context) ? context.ownerDocument : document;
	return doc.evaluate(query, (context || doc), null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

if (typeof Array.forEach === "undefined") {
	Array.forEach = function(arr, fn) {
		Array.prototype.forEach.call(arr, fn);
	};
}

function isArray(obj) {
    return obj.constructor == Array;
}


/**
 * 
 * @param fn
 * @param keys
 *           [{keycode, shift, ctrl, alt}]
 * @return
 */
function initKey(keys) {
	document.addEventListener('keydown', function(e) {
		if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
			if (!isArray(keys)){
				keys = [keys];
			}
			keys.forEach(function(k) {
				if (k.key == e.keyCode 
						&& ((k.shift && e.shiftKey) || (!k.shift && !e.shiftKey)) 
						&& ((k.ctrl && e.ctrlKey) || (!k.ctrl && !e.ctrlKey))
						&& ((k.alt && e.altKey) || (!k.alt && !e.altKey))) {
					k.fn(e);
					e.preventDefault();
				}
			});
		}
	}, false);
}
function isObjectEmpty(o){
	if (!o){
		return true;
	}
	for ( var p in o) {
		if (!hasOwnProperty.call(o, p)) {
			continue;
		}
		return false;
	}
	return true;
}
function find(o, key, value){
	for (var p in o) {
		if (!hasOwnProperty.call(o, p)) {
			continue;
		}
		if (o[p][key] === value){
			return o[p];
		}
	}
	return false;
}
function removeClass(el, classname){
	el.className = el.className.replace(classname, '').trim();
}
function toggleClass(el, classFrom, classTo){
	el.className = el.className.replace(classFrom, '').trim()+' '+classTo;
}
function fireResizeDefer(){
	window.setTimeout(fireResize, 500);
}
function fireResize(){
	//dont work
	var p = document.createElement("p");
	p.appendChild(document.createTextNode('==='));
	document.body.appendChild(p);
	document.body.removeChild(p);
}
