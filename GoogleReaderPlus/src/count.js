/**
 * Google Reader Unread Count
 * @version  9
 * @date 2009-11-25
 * 
 * Display actual unread count instead of "1000+" in Google Reader
 * 
 * Original author : 
 * Angus http://angusdev.mysinablog.com/
 */

GRP.count = function(prefs, langs, ID, SL, lang){
    var unreadCountElement = null;
    
    // Wait for the dom ready
    function waitForReady(){
        unreadCountElement = document.getElementById('reading-list-unread-count');
        if (unreadCountElement) {
            window.setInterval(calcUnread, 3000);
            calcUnread();
        } else {
            window.setTimeout(waitForReady, 500);
        }
    }
    
    function modifySubtree(){
        if (unreadCountElement.textContent.match(/\d{4}\+?/)) {
            calcUnread();
        }
    }
    
    function findItemUnread(item, checkDuplicated){
        var hasplus = false;
        var count = 0;
        var alreadyCounted = false;
        var countres = item.innerHTML.match(/\((\d*)\+?\)/);
        if (countres) {
            count = parseInt(countres[1], 10);
            if (item.innerHTML.match(/\(1000\+\)/)) {
                hasplus = true;
            }
            var nodeTitle = item.parentNode.getAttribute('title');
            if (nodeTitle) {
                if (checkDuplicated.indexOf(nodeTitle) < 0) {
                    checkDuplicated.push(nodeTitle);
                } else {
                    alreadyCounted = true;
                }
            }
        }
        
        return {
            count: count,
            hasplus: hasplus,
            alreadyCounted: alreadyCounted
        };
    }
    function calcUnreadFolder(folder, checkDuplicated){
    	var total = 0, hasplus = false;
		
		//var name = getElementText(folder, 'name-text');
		//console.log('calc folder : '+name);

        var res2 = document.evaluate("./ul/li[contains(@class, 'unread')]/a/div[contains(@class, 'unread-count')]", folder, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        for (var j = 0; j < res2.snapshotLength; j++) {
            var result = findItemUnread(res2.snapshotItem(j), checkDuplicated);
            total += result.count;
            if (result.hasplus) {
                hasplus = true;
            }
            /*if (!result.alreadyCounted) {
                total += result.count;
            }*/
        }
        
        //Recurse
        var res3 = document.evaluate("./ul/div/li[contains(@class, 'folder')]", folder, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        for (var k = 0; k < res3.snapshotLength; k++) {
        	var ures = calcUnreadFolder(res3.snapshotItem(k), checkDuplicated);
        	total+=ures.total;
        	if (ures.hasplus) {
                hasplus = true;
            }
        }
        
        if (total > 0) {
            var resfolder = document.evaluate(".//a/div[contains(@class, 'unread-count')]", folder, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            //var resfolder = unreadfolder;
            if (resfolder) {
                resfolder.innerHTML = '&nbsp;(' + total + (hasplus ? '+' : '') + ')';
            }
        }
        
        //console.log('total folder : '+name + '='+total );
        
        return {
        	total:total, 
        	hasplus:hasplus
        };
    }
    
    
    function calcUnread(){
        var checkDuplicated = [],total = 0,hasplus=false;
        
        var subtree = get_id('sub-tree');
        var res = document.evaluate("./li/ul/li[contains(@class, 'folder')][contains(@class, 'unread')]", subtree, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        for (var i = 0; i < res.snapshotLength; i++) {
            var folder = res.snapshotItem(i);
            var ures = calcUnreadFolder(folder, checkDuplicated);
            total += ures.total;
            if (ures.hasplus) {
                hasplus = true;
            }
        }
        
		//friends unread
		var elfriend = document.getElementById('friends-tree-item-0-unread-count');
		if (elfriend && elfriend.innerText) {
			var friendcount = parseInt(elfriend.innerText.replace(/[\s\(\)]*/g, ''), 10);
			if (friendcount && friendcount > 0) {
				total += friendcount;
			}
		}
		
        // untagged items
        var res3 = document.evaluate("//ul[@id='sub-tree']/li/ul/li[not(contains(@class, 'folder')) and contains(@class, 'unread')]/a/span/span[contains(@class, 'unread-count')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        for (var k = 0; k < res3.snapshotLength; k++) {
            var res4 = findItemUnread(res3.snapshotItem(k), checkDuplicated);
            if (res4.hasplus) {
                hasplus = true;
            }
            if (!res4.alreadyCounted) {
                total += res4.count;
            }
        }
        
        if (total > 0) {
            var totaltext = total + (hasplus ? '+' : '');
            unreadCountElement.innerHTML = ' (' + totaltext + ')';
            
            //update subtitle (1000+ new items)
            var elnew = document.getElementById('show-new');
            if (elnew && elnew.innerText.indexOf('1000+') >= 0) {
                elnew.innerText = elnew.innerText.replace('1000+', totaltext);
            }
            
            // update windows title as well
            if (totaltext) {
                var newTitle = '(' + totaltext + ') ' +
                document.title.replace(/\s*\(\d+\+?\)$/, '').replace(/^\(\d+\+?\)\s*/, '');
                if (document.title != newTitle) {
                    document.title = newTitle;
                }
            }
        }
    }
    
    waitForReady();
    
};
