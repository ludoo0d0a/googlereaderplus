/*
 * Coverflow
 * A iconified preview of read items
 *
 */
GRP.coverflow = function(prefs, langs, ID, SL, lang){
    var items=[], entries=[], flow=false, elTitle, container;
    var DEFAULT_THUMBNAIL = '//www.google.com/reader/ui/1605932088-explore-default-thumbnail.png';
    var cfg = getConfig(prefs, ID, ['sync']);
    
    function coverEntry(el, entry, mode){
        if (hasClass(entry, 'entry-0')){
        	//Reload view on first entry
        	/*if (flow){
        		flow.destroy();
        	}*/
        	items=[];
        	entries=[];
        	flow = false;
        }
        findFirstPicture(entry, updatecover);
    }
    
    function findFirstPicture(entry, cb){
    	var imgs = entry.getElementsByTagName('img');
    	loadImages(imgs, function(imgok){
    		//All images are loaded
    		var src=DEFAULT_THUMBNAIL;
    		if (imgok){
    			src = findImage(imgok, 80, 30) || DEFAULT_THUMBNAIL;
    		}
    		cb(entry, src);
    	});
    }
    
    function init(){
    	container = dh('viewer-container','div',{
    		id:'coverflow-container',
    		html:'<canvas id="grp_cv"></canvas><div id="flow-title"></div>'
    	});
			
    	var css = '#coverflow-container{ position: fixed;height:240px;bottom:40px;right:0;width: 80%;z-index:9999;margin-right: 50px;'+
    	'opacity:0.9;background-image: -webkit-gradient(linear,left bottom,left top,color-stop(0.07, rgb(230,233,235)), color-stop(0.54, rgb(204,217,224)),color-stop(0.77, rgb(237,245,245)));}';
    	css += '#flow-title{text-align:center;font-size:16px;font-weight:bold;}';
    	GM_addStyle(css, 'rpe_'+ID);  
    	
    	elTitle = get_id('flow-title');  	
    }
    init();
    
    function mapEntry(item){
    	var entry = false;
    	if (items && item && entries[item.eid]){
    		entry = entries[item.eid];
    	}
    	return entry;
    }
    
    monitorCurrentEntry(function(entry){
    	var pos = getEntryPosition(entry);
    	if (pos!==false){
    		var n = (Math.floor(flow.idx/flow.divs)-pos);
    		if (n!==0){
	    		if (n>0){
	    			flow.prev(n);
	    		}else if (pos<0){
	    			flow.next(-n);
	    		}
    		}
    	}
    });
    
    function updatecover(entry, src){
    	var o = {src: src, eid: entries.length};
    	items.push(o);
    	entries.push(entry);
    	if (flow){
    		//update
    		flow.add(o);
    	}else{
     		//create
	    	flow = new Coverflow(get_id('grp_cv'), items, {
				width:1200,
				height:200,
				onMove: function(item){
					var entry = mapEntry(item);
					if (entry){
						var l = getEntryLink(entry, true);
						elTitle.innerText=l.title;
					}
					if (cfg.sync){
						jump(entry, true);
					}
				},
				onSelectCenter: function(item){
					var entry = mapEntry(item);
					if (entry){
						jump(entry, true);
					}
				}
			});
		}
    }
    
    registerFeature(coverEntry, ID, {
    	onlistviewtitle:true
    });
    
};
