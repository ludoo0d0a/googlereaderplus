/**
 * Google Reader - Read by Mouse
 * @version  2.0
 *
 * Adds a button that toggles Google Reader in and out of a "mouse-only" mode
 * that allows for easy and customizable reading via the mouse buttons
 * (next item, previous item, open in tab/star/share/tag).
 *
 * bug windows middle ckick :
 * http://code.google.com/p/chromium/issues/detail?id=17234
 *
 * Original author :
 * Ryan Williams <ryanbot at gmail>
 * http://userscripts.org/scripts/show/8843
 */
GRP.readbymouse = function(prefs, langs, ID, SL, lang){
    var _options = {} , btn ;
	var KEY_OPTIONS = ['status', 'middleclick', 'tag'];
	
	function setStatus(status){
		_options.status = status;
		GM_setValue(ID+'_status', _options.status);
		//update UI
		addClassIf(btn, 'goog-button-base-open', _options.status);
	}
	
	function checkOptions(o){
        o = o || {};
        o.status = o.status || false;
		o.tag = o.tag || '';
        o.middleclick = o.middleclick || o.midClick || 'openintab';
        return o;
    }
	
	function init(){
		GM_getValues(ID+'_', KEY_OPTIONS,function(o){
			_options = checkOptions(o);
            initInterface();
		});
    }
	
	function isClickedOnButton(el){
		return isAncestor(el,false,false,btn.id) || isAncestor(el,false,'goog-menu');
	}
	
    function initInterface(){
		var btn_id = 'btn-'+ID+'-toggle';
		if (get_id(btn_id)){
			return;
		}
		var ref = get_id('stream-prefs-menu');
	    var items = [{
	        id: 'rbm_middleclick',
	        text: '<b>'+SL.middleclick+'</b>'
	    }, {
	        id: 'rbm_openintab',
	        text: SL.openintab,
	        checkbox: true,
			value: (_options.middleclick==='openintab'),
	        key: 'openintab',
			group:'mc',
	        click: setMiddleClick
	    }, {
	        id: 'rbm_openinbacktab',
	        text: SL.openinbacktab,
	        checkbox: true,
			value: (_options.middleclick==='openinbacktab'),
	        key: 'openinbacktab',
			group:'mc',
	        click: setMiddleClick
	    },{
			id: 'rbm_shares',
	        text: SL.shares,
	        checkbox: true,
			value: (_options.middleclick==='shares'),
	        key: 'shares',
			group:'mc',
	        click: setMiddleClick
		}, {
	        id: 'rbm_stars',
	        text: SL.stars,
	        checkbox: true,
			value: (_options.middleclick==='stars'),
	        key: 'stars',
			group:'mc',
	        click: setMiddleClick
	    }, {
	        id: 'rbm_addtag',
	        text: SL.addtag,
	        checkbox: true,
			value: (_options.middleclick==='addtag'),
	        key: 'addtag',
			group:'mc',
	        click: setMiddleClick
	    },{
			sep:true
		},{
            id: 'rbm_tag',
            text: SL.tag,
            textarea: true,
            value: _options.tag
        }];
	    btn = addSplitButton(ID+'-split-button', ref, SL.readbymouse, SL.readbymouse + ' [Ctrl+Z]', toggleStatus, toggleRbm, 1, items, {autoclose:true});
		btn.id=btn_id;
	    addClassIf(btn, 'goog-button-base-open', _options.status);
		
		function toggleRbm(menu){
			onUpdate();
		}
		function toggleStatus(){
			_options.status=!_options.status;
			onUpdate();
		}
		function setMiddleClick(el, menu, id, sel, item){
			_options.middleclick = item.key;
			onUpdate();
		}
		function onUpdate(){
			_options.tag = getValue('t_rbm_tag');
			
			_options = checkOptions(_options);
			foreach(KEY_OPTIONS,function(option){
				GM_setValue(ID+'_'+option, _options[option]);
			});
			addClassIf(btn, 'goog-button-base-open', _options.status);	
	        //doStuff();
	    }
	}
	
	
    // Add listener for key press (toggles Mouse on and off)
    document.addEventListener('keydown', function(e){
        //Ctrl+Z
		if (e.ctrlKey && e.which == 90) {
            setStatus(!_options.status);
        }
    }, false);
	
    // Add listener for mousedown
    document.addEventListener('mousedown', function(e){
        var t = e.target;
		if (e.altKey){
			return ;
		}
		
        if (_options.status) {
            // If they click on a link, let the link work like normal
            if (t.nodeName.toLowerCase() == 'a') {
                return;
            }
            var b = e.button;
            if (b === 0) {
            	// Left Click
				if (!isClickedOnButton(t)){
					selectNextEntry();
                    e.stopPropagation();
                    e.preventDefault();
                }
            }else if (b == 2) {
                // Right Click
				selectPreviousEntry();
                e.stopPropagation();
                e.preventDefault();
            }else if (b == 1) {
            	doMiddleClick();
                e.stopPropagation();
                e.preventDefault();
            }
            
        }
    }, true);
	
  // Disable the context menu when Mouse Mode is on.
    document.addEventListener('contextmenu', function(e){
        if (_options.status) {
            // Let clicks on links open the context menu.
            if (e.target.nodeName.toLowerCase() !== 'a') {
                e.stopPropagation();
                e.preventDefault();
            }
        }
    }, true);
	
    function doMiddleClick(){
		switch (_options.middleclick) {
			case 'openintab':
				openInTab(true);
				break;
			case 'openinbacktab':
				openInTab(false);
				break;
			case 'shares':
				shareItem();
				break;
			case 'stars':
				starItem();
				break;
			case 'addtag':
				addTag();
				break;
		}
	}
				
    // Go find the "Open original in tab" element and get the URL for original
    function openInTab(selected){
        openEntryInNewTab(false, selected);
    }
    
    // Go find the "share item" button and simulate a click on it
    function shareItem(){
        var current = getCurrentEntry();
        var currentEntry = current.getElementsByTagName("broadcast")[0];
        simulateClick(currentEntry);
    }
    
    // Go find the "star item" button and simulate a click on it
    function starItem(){
        var current = getCurrentEntry();
        markAsStar(entry, true);
    }
    
    // Do the first part of tagging (click the tag button to reveal the tag
    // control)
    function tagItem1(){
        var current = getCurrentEntry();
        var currentEntry = current.getElementsByTagName("entry-tagging-action-title")[0];
        simulateClick(currentEntry);
    }
    
    // Do the second part of tagging (add the tag and click the save button)
    function addTag(){
        var tagEdit = document.getElementsByTagName("tags-edit");
        var tagEditTags = tagEdit.getElementsByTagName("tags-edit-tags");
        tagEditTags.innerHTML += _options.tag;
        var tagEditButton = tagEdit.getElementsByTagName("tags-edit-buttons")[0];
        var popup = tagEditButton.getElementsByTagName("goog-button-body")[0];
        simulateClick(popup);
    }
    
	init();
    
};
