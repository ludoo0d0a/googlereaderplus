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
	setTimeout(function(){
        if (domIsDirty()) 
            nestFolders();
    }, 100);
	
    
    function nestFolders(){
        var folderNodes = document.querySelectorAll('.folder, .tag'), folderMap = {};
        
        var i = 0, folder;
        while (folder = folderNodes[i++]) {
            var nameNode = folder.querySelector('.name');
            if (nameNode) {
                folderMap[nameNode.title.split(' (')[0]] = folder;
            }
        }
        
        iterate(folderMap, function(name, folder){
            var nameTokens = name.split(sep).reverse();
			var prefix = nameTokens.slice(1).reverse().join(sep);
			console.log(name +' -- '+ prefix);
            
            if (name !== prefix && (prefix in folderMap)) {
                var parent = folderMap[prefix].querySelector('ul');
                
                if (!parent) {
                    parent = folderMap[prefix].appendChild(document.createElement('ul'));
                };
                
                var wrapper = parseNode('<div style="position:relative;left:16px;"/>');
                wrapper.appendChild(folder);
                wrapper.querySelector('.name-text').innerHTML = nameTokens[0];
                wrapper.querySelector('.link').style.cssText = 'margin-left:-16px';
                parent.insertBefore(wrapper, parent.firstChild);
            }
        });
    };
    
    function domIsDirty(){
        var isDirty = !document.querySelector('#clean-flag');
        if (isDirty) {
            document.querySelector('#sub-tree').appendChild(parseNode('<div id="clean-flag" />'));
        }
        return isDirty;
    };
    
    function parseNode(html){
        if (!parseNode.element) {
            parseNode.element = document.createElement('div');
        }
        parseNode.element.innerHTML = html;
        return parseNode.element.firstChild;
    };
};
