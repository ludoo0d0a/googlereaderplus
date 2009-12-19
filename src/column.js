var grp_column = function() {
	function addColumnButton(el, entry, mode) {
		var span = document.createElement('span');
		span.className = 'btn-column read-state-not-kept-unread read-state link unselectable';
		span.innerHTML = 'Column';
		span.title = 'Display as 3 columns layout [c]';
		el.appendChild(span);
		span.addEventListener('click', columnizeClick, false);
	}
	function columnizeClick(e) {
		var el = e.target;
		var entry = findParentNode(el, 'div', 'entry');
		columnize(el, entry);
	}
	function columnizeKey() {
		var entry = getCurrentEntry();
		var el = getFirstElementMatchingClassName(entry, 'span', 'btn-column');
		columnize(el, entry);
	}

	function columnize(el, entry) {
		var columnized = false;
		if (entry.className.indexOf('columnize') == -1) {
			entry.className = entry.className + ' columnize';
			el.className = el.className.replace('read-state-not-kept-unread', 'read-state-kept-unread');
			columnized = true;
		} else {
			entry.className = entry.className.replace('columnize', '');
			el.className = el.className.replace('read-state-kept-unread', 'read-state-not-kept-unread');
			columnized = false;
		}

		var body = getFirstElementMatchingClassName(entry, 'div', 'item-body');
		// why a sub body sometimes ??
		var subbody = getFirstElementMatchingClassName(body, 'div', 'item-body');
		if (subbody){
			body = subbody;
		}
		
		var divoriginal = body.firstChild;
		var divwrap = getFirstElementMatchingClassName(entry, 'div', 'column-wrapped');

		if (!divwrap) {
			divoriginal.className = "column-original";
			divwrap = document.createElement('div');
			divwrap.style.display = "none";
			divwrap.className = "column-wrapped";
			
			// var paras = divoriginal.querySelectorAll("p");
			var paras = divoriginal.childNodes;
			var txt = '';
			if (paras && paras.length>0){
				for ( var i = 0; i < paras.length; i++) {
					var tag = paras[i].nodeName;
					if (tag==="P"){
						txt += paras[i].innerHTML + '<br/>';
					}else if (tag==="#text"){
						txt += paras[i].textContent;//nodeValue
					}else if(tag==="IFRAME" || tag==="OBJECT" || tag==="EMBED"){
						// nothing
					}else if (tag==="DIV"){
						txt += paras[i].innerHTML;
					}else{
						txt += paras[i].outerHTML;
					}
				}
			}else{
				txt = divoriginal.innerText;
			}

			// clean up
			txt = txt.replace(/<iframe.*?>?.*?>/, '').replace(/<embed.*?>?.*?>/, '').replace(/<object.*?>?.*?>/, '');
			
			var para = document.createElement('p');
			para.innerHTML = txt;
			divwrap.appendChild(para);
			
			body.appendChild(divwrap);
		}
		// toggle to correct body
		divoriginal.style.display = (columnized)?"none":"";
		divwrap.style.display = (columnized)?"":"none";
		
		jump(entry, false);

	}

	var css = ".column-wrapped{ text-align: justify; -webkit-column-count: 3; -webkit-column-gap: 1.5em; -webkit-column-rule: 1px solid #dedede;overflow:visible;}";
	GM_addStyle(css);
	
	// copy of fixwidth
	GM_addStyle(".entry .entry-body, .entry .entry-title{ display: inline !important; max-width: 100% !important; }");

	initCatchEntries(addColumnButton, 'ecolumn');
	initKey({key:67, fn:columnizeKey});//c
	
};
