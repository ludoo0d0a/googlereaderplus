var grp_column = function(prefs) {
	var locked = false;
	
	function addButton(el, entry, mode) {
		addBottomLink(el,'Column', 'Display as multi columns layout [c]', 'btn-column', true, columnize, locked);
/*		
		var span = document.createElement('span');
		span.className = 'btn-column read-state-not-kept-unread read-state link unselectable';
		span.innerHTML = 'Column';
		span.title = 'Display as multi columns layout [c]';
		el.appendChild(span);
		span.addEventListener('click', columnizeClick, false);
		if (locked){
			//activate it
			columnize(span, entry, true);
		}
		*/
	}
	/*
	function columnizeClick(e) {
		var el = e.target;
		var entry = findParentNode(el, 'div', 'entry');
		columnize(el, entry);
	}*/
	function addKey() {
		onKey('btn-column', columnize);
		/*var entry = getCurrentEntry()'btn-column');
		var el = getFirstElementMatchingClassName(entry, 'span', 'btn-column');
		columnize(el, entry);*/
	}

	function columnize(el, entry, locked) {
		var active = isActive(entry, 'columnize', locked);

		var body = getBody(entry);
		
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
		divoriginal.style.display = (active)?"none":"";
		divwrap.style.display = (active)?"":"none";
		
		jump(entry, false);
	}
	
	//column_count
	var cols = 3; 
	if (prefs && prefs.column_count) {
		var c = parseInt(prefs.column_count, 10);
		if (c>0){
			cols = c;
		}
	}
	
	//column_locked
	locked=false;
	if (prefs && prefs.column_locked) {
		locked = prefs.column_locked;
	}

	var cw = getFirstElementMatchingClassName(document, 'div', 'entry-main');
	var cwh = Math.max(Math.round(cw.clientWidth/cols), 50); 
	
	var css = ".column-wrapped{ text-align: justify; -webkit-column-count: "+cols+"; -webkit-column-gap: 1.5em; -webkit-column-rule: 1px solid #dedede;overflow:visible;} ";
	css += '.column-wrapped img{width:'+cwh+'px !important;height: auto !important;}';
	GM_addStyle(css);
	
	// copy of fixwidth
	GM_addStyle(".entry .entry-body, .entry .entry-title{ display: inline !important; max-width: 100% !important; }");

	initCatchEntries(addButton, 'ecolumn');
	initKey({key:67, fn:addKey});//c
	
};
