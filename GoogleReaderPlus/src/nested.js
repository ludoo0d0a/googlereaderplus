// ==UserScript==
// @name           Google Reader: Nested Folders
// @namespace      meta.ironi.st
// @author         sethaurus
// @description    Displays folders (tags) in a nested hierarchy, when (for example) one folder is named category, and another is named category:subcategory. Note that the names must be separated by a colon, and that the outer folder must exist, even if it does not directly contain any feeds. Folders an be nested to an arbitrary depth.
// @include        http://*.google.com/reader*
// @include        https://*.google.com/reader*
// @source         http://userscripts.org/scripts/show/64659
// ==/UserScript==
GRP.nested = function(prefs, langs, ID, SL, lang){
    var sep = prefs.nested_separator || ':';
	setTimeout(domIsDirty, 100);
	setInterval(domIsDirty, 5000);
    
    function nestFolders(){
        var folderNodes = document.querySelectorAll('.folder, .tag'), folderMap = {};
        
        var root = get_id('sub-tree').getElementsByTagName('ul')[0];
        
        
        var i = 0, folder;
        while ((folder = folderNodes[i++])) {
            var nameNode = folder.querySelector('.name');
            if (nameNode) {
                folderMap[nameNode.title.split(' (')[0]] = folder;
            }
        }
        
        iterate(folderMap, function(name, folder){
            var nameTokens = name.split(sep).reverse();
			var prefix = nameTokens.slice(1).reverse().join(sep);
			//console.log(name +' -- '+ prefix);
            
            if (prefix && name!==prefix && (prefix in folderMap)) {
                if (!(prefix in folderMap)){
                	var id = root.getElementsByTagName('li').length + 1;
                	folderMap[prefix] = dh(root, 'li', {
                		cls:'folder unselectable expanded unread',
                		html:'<div class="toggle folder-toggle toggle-d-1"></div>'+
                		'<a class="link" href="/reader/view/user%2F-%2Flabel%2F'+prefix+'" id="sub-tree-item-'+id+'-link">'+
                		'<span class="icon folder-icon icon-d-1" id="sub-tree-item-'+id+'-icon"></span>'+
                		'<span class="name folder-name name-d-1" id="sub-tree-item-'+id+'-name" title="'+prefix+'">'+
                		'<span class="name-text folder-name-text name-text-d-1">'+prefix+'</span>'+
                		'<span class="unread-count folder-unread-count unread-count-d-1" id="sub-tree-item-'+id+'-unread-count"></span></span>'+
                		'<div class="tree-item-action-container"><div id="sub-tree-item-'+id+'-action" class="action tree-item-action section-button section-menubutton goog-menu-button"></div></div></a>'
                	});
                }
                
                var parent = folderMap[prefix].querySelector('ul');
                
                if (!parent) {
                    parent = folderMap[prefix].appendChild(document.createElement('ul'));
                }
                addClass(folderMap[prefix], 'unread', true);
                var fname = getFirstElementByClassName(folderMap[prefix], 'name');
                addClass(fname, 'name-unread', true);
                var wrapper = parseNode('<div class="grp-wrapper"/>');
                wrapper.appendChild(folder);
                wrapper.querySelector('.name-text').innerHTML = nameTokens[0];
                var l = getFirstElementByClassName(wrapper, 'link');
                addClass(l, 'link-nested', true);
                //wrapper.querySelector('.link').style.cssText = 'margin-left:-16px';
                parent.insertBefore(wrapper, parent.firstChild);
            }
        });
    }
    
    function domIsDirty(){
        var isDirty = !document.querySelector('#clean-flag');
        if (isDirty) {
            document.querySelector('#sub-tree').appendChild(parseNode('<div id="clean-flag" />'));
        }
        if (isDirty){
        	nestFolders();
        }
    }
    
    function parseNode(html){
        if (!parseNode.element) {
            parseNode.element = document.createElement('div');
        }
        parseNode.element.innerHTML = html;
        return parseNode.element.firstChild;
    }
    
    var css = '.grp-wrapper{padding-left:16px;/*position:relative;left:16px;*/}'+
    '.link-nested{margin-left:-16px;}';
    GM_addStyle(css, 'rpe_'+ID);
};
