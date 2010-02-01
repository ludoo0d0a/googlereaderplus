/**
 * Menu
 * @version  0.1
 * @date 2010-01-22
 * @author LudoO
 *
 * Add a menu for each entry about its site
 *
 */
GRP.menu = function(prefs, langs) {
	var SL = langs.menu; 
	
	var menu; 
    function addJumpButtons(el, entry, mode){
        var favicon = getFirstElementMatchingClassName(entry, 'div', 'entry-favicon');
		
		var title = getFirstElementMatchingClassName(entry, 'a', 'entry-source-title');
        if (title) {
            
			var e = document.createElement('span');
            e.className = 'section-menubutton section-button';
            e.id="sub-tree-item-165-action";
			e.innerHTML="&nbsp;&nbsp;&nbsp;";
			e.addEventListener('click', togglemenu, false);
			
			//insert before favicon or title if not
			insertBefore(favicon||title, e);
        }
    }
    function togglemenu(item){
		if (!menu){
			var items = [{
				text:'Mark as read all items of this site',
				fn: markreadsite
			}]; 
			createMenu(items);
		}
		toggle(menu);
    }
	
	function markreadsite(item){
		//toggleCheckMenu(item);
		alert('click on '+item.text);
	}

    var css = "";
    GM_addStyle(css);
    
    initCatchEntries(addJumpButtons, 'ejump');

    var keycodeDown = getShortcutKey('jump', 'godown', prefs); //66 Shift+B
    keycodeDown.fn = gotobottom;
    initKey(keycodeDown);
};
