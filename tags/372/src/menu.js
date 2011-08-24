/**
 * Menu
 * @version  0.1
 * @date 2010-01-22
 * @author LudoO
 *
 * Add a menu for each entry about its site
 *
 */
GRP.menu = function(prefs, langs, ID, SL, lang){
    var menu;
	/*
    function jq_xmlhttpRequest(o){
        jQuery.ajax({
            type: o.method || 'GET',
            url: o.url,
            data: o.parameters,
            success: function(m){
				alert(m);
				o.onload();
			},error:function(m){
				alert('error xhr');
			}
        });
    }
    loadjQuery();
    */
    function createButtonMenu(entry){
        var eactions = getFirstElementByClassName(entry, 'entry-actions');
        var ent = entry;
        var el = dh(eactions, 'span', {
            cls: 'item-link grp-item-link-menu link unselectable',
            html: '<wbr><span class="entry-link-action-title">' + (SL.label || 'Extra') + '</span><div class="item-link-drop-down-arrow"></div>'
        }, {
            click: function(e){
                e.stopPropagation();
                var em = get_id('grpm_menu');
                if (!em) {
                    em = createMenu(document.body, [{
                        icon: '',
                        cls: 'read-state-kept-unread',
                        text: 'Mark site as read',
                        fn: function(){
                            markallasread(ent);
                        }
                    }]);
                }
                var p = getPos(el);
                var entries = get_id('entries');
                em.style.left = p.left + 'px';
                em.style.top = (p.top - entries.scrollTop + 15) + 'px';
                show(em);
                window.setTimeout(function(){
                    hide(em);
                }, 8000);
                var listener = function(e){
                    e.stopPropagation();
                    hide(em);
                    document.removeEventListener('click', listener, false);
                };
                var eventMenu = document.addEventListener('click', listener, false);
            }
        });
    }
    function createMenu(root, items){
        var em = dh(root, 'div', {
            id: 'grpm_menu',
            cls: 'goog-menu goog-menu-vertical',
            style: '-webkit-user-select: none; visibility: visible;',
            tabindex: -1
        });
        foreach(items, function(item){
            var eitem = dh(em, 'div', {
                cls: 'goog-menuitem',
                style: '-webkit-user-select:none;'
            });
            var content = dh(eitem, 'div', {
                cls: 'goog-menuitem-content'
            });
            var sp = dh(content, 'span', {
                cls: 'item-link-menuitem ' + item.cls,
                html: '<img src="' + item.icon + '" alt="" class="item-link-menuitem-image">' + item.text
            }, {
                click: function(){
                    item.fn();
                    hide(em);
                }
            });
        });
        root.appendChild(em);
        return em;
    }
    function addJumpButtons(el, entry, mode){
        createButtonMenu(entry);
        /*
         var favicon = getFirstElementByClassName(entry, 'entry-favicon');//div
         var title = getFirstElementByClassName(entry, 'entry-source-title');//a
         if (title) {
         var e = document.createElement('span');
         e.className = 'section-menubutton section-button';
         e.id = "sub-tree-item-165-action";
         e.innerHTML = "&nbsp;&nbsp;&nbsp;";
         e.addEventListener('click', togglemenu, false);
         //insert before favicon or title if not
         insertBefore(favicon || title, e);
         }*/
    }
    /*
     function togglemenu(item){
     if (!menu) {
     createMenu(items);
     }
     toggle(menu);
     }
     */
    
    var css = '.grp-item-link-menu item-link-drop-down-arrow{visibility:visible;}.grp-item-link-menu:hover item-link-drop-down-arrow{visibility:hidden !important;}';
    css += '.goog-menuitem:hover {background-color:#BECDEE;}'
    GM_addStyle(css, 'rpe_'+ID);
    registerFeature(addJumpButtons, ID);
    //var keycodeDown = getShortcutKey(ID, 'godown', prefs); //66 Shift+B
    //keycodeDown.fn = gotobottom;
    //initKey(keycodeDown);
};
