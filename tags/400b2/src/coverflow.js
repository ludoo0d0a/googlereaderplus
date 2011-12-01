/*
 * Coverflow
 * A iconified preview of read items
 *
 */
GRP.coverflow = function(prefs, langs, ID, SL, lang){
    var items=[], entries=[], flow=false, elTitle, container, initResize=false;
    var DEFAULT_THUMBNAIL = '//www.google.com/reader/ui/1605932088-explore-default-thumbnail.png';
    var cfg = getConfig(prefs, ID, ['coverflow','reflection','caption','sync','footer']);
    cfg.footer=false;//Deprecated
    var configs = {
    	slideshow:{
    		html:''
    	},
    	coverflow:{
    		html:'<canvas id="grp_cv"></canvas><div id="flow-title"></div>'
    	}
    } 
    //var config = (cfg.coverflow)?configs.coverflow:configs.slideshow;
    //var config = configs.slideshow;
    
    function coverEntry(el, entry, mode){
        if (hasClass(entry, 'entry-0')){
        	//Reload view on first entry
        	if (flow){
        		flow.destroy();
        	}
        	items=[];
        	entries=[];
        	flow = createSlideshow();
        }
        findFirstPicture(entry, updatecover);
    }
    
    function findFirstPicture(entry, cb){
    	var imgs = entry.getElementsByTagName('img');
    	loadImages(imgs, function(imgok){
    		//All images are loaded
    		var r={}, src=false;
    		if (imgok){
    			src= findFirstImage(imgok, {width:80, height:50});
    		}
    		if (!src && !cfg.caption){
    			src = DEFAULT_THUMBNAIL;
    		}
    		if (src){
    			r.src = src;
    		}else{
    			r.text = getEntryTitle(entry);
    		}
    		cb(entry, r);
    	});
    }
    
    function init(){
    	var root = (cfg.footer)?'viewer-footer':'viewer-container';
    	var root = 'viewer-container';
    	container = dh(root,'div',{
    		id:'flow-container'
    	});
    	
    	var css = '#flow-container{ ';
    	if(cfg.footer){
    		css+='margin-left:250px;margin-right:150px;';
    	}else{
    		css+='/*height:240px;*/position:fixed;bottom:40px;right:0;width:80%;margin-right:50px;';
    	}
    	css+='z-index:9999;opacity:0.9;background-image: -webkit-gradient(linear,left bottom,left top,color-stop(0.07, rgb(230,233,235)), color-stop(0.54, rgb(204,217,224)),color-stop(0.77, rgb(237,245,245)));}';
//    	css += '#flow-title{text-align:center;font-size:16px;font-weight:bold;}';
    	GM_addStyle(css, 'rpe_'+ID);  
    	
    	css='.ss-outer{overflow:hidden;min-height:100px;}';
//css+='.ss-outer{width:600px;border:1px solid gray;}';
css+='.ss-wrapper{position:relative;width:99999px}';
css+='.ss-cover .ss-wrapper{-webkit-transition:all .3s ease-in-out}';
css+='.ss-hidden{visibility:hidden}';
css+='.ss-current{border-bottom:2px solid gray}';
css+='.ss-text{text-align:center;color:gray;min-height:10px;text-shadow: 0 1px 2px white;}';
css+='.ss-inner{float:left;cursor:pointer;-webkit-transition:all .3s ease-in-out;margin:2px}';
css+='.ss-cover .ss-inner{-webkit-perspective:500;-webkit-transform-style:preserve-3d}';
css+='.ss-inner img{-webkit-transition:all .5s linear;max-width:100px;max-height:100px}';
css+='.ss-inner-text{padding:5px;max-width:200px;min-width:50px;height:100px;background:-webkit-gradient(linear, 0% 0%, 100% 100%, from(#A5A5A5), to(#7F7F7F));text-shadow: 0 1px 2px white;}';
css+='.ss-clr{clear:both}';
css+='.ss-reflect .ss-inner img{-webkit-box-reflect:below -5px 0 to(rgba(255,255,255,0.3)))}';
    	GM_addStyle(css, 'rpe_'+ID+'_ss');
    }
    init();
    
    function mapEntry(item){
    	var entry = false;
    	if (items && item && entries[item.eid]){
    		entry = entries[item.eid];
    	}
    	return entry;
    }
    function getEntryTitle(entry){
    	var l = getEntryLink(entry, true);
		return l.title||'';
	}		
    /*
    monitorCurrentEntry(function(entry,prevEntry){
    	console.log('Current entry changed for '+entry.className + ' -> '+prevEntry.className)
    	var pos = getEntryPosition(entry);
    	if (pos!==false){
    		var n = (Math.floor(flow.idx/flow.divs)-pos);
    		if (n!==0){
	    		if (n>0){
	    			flow.prev(n,true);
	    		}else if (n<0){
	    			flow.next(-n,true);
	    		}
    		}
    	}
    });
    */
   
    function updatecover(entry, o){
    	if (flow){
	    	o.eid = entries.length;
	    	//var o = {src: r.src, eid: entries.length};
	    	items.push(o);
	    	entries.push(entry);
    		//update
    		flow.add(o);
    	}
    }
    
    function createSlideshow(){
    	var flow = new Slideshow({
			el:'flow-container', 
			width:(cfg.footer)?1200:1200,
			height:(cfg.footer)?150:300,
			cover:cfg.coverflow,
			reflection:cfg.reflection,
			/*onMove: function(item){
				var entry = mapEntry(item);
				if (entry){
					var l = getEntryLink(entry, true);
					elTitle.innerText=l.title;
				}
				if (cfg.sync){
					jump(entry, true);
				}
			},*/
			formatText: function(cfg,item){
				var txt='', entry = mapEntry(cfg);
				if (entry){
					txt = getEntryTitle(entry, true);
				}
				return txt;
			},
			onselect: function(cfg,item){
				var entry = mapEntry(cfg);
				if (entry){
					jump(entry, true);
				}
			}
		});
		
		if (cfg.footer /*& !initResize*/){
				console.log('fireResize');
				fireResize();
				initResize=true;
		}
		return flow;
    }
  
    registerFeature(coverEntry, ID, {
    	onlistviewtitle:true
    });
    
};
