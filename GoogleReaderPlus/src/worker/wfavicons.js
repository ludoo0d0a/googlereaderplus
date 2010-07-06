var w = this;
onmessage = function(e) {
	importScripts('workerhelper.js');
	var data=WH.getData(e);
	var icons = (data)?data.icons:false;
	
	for (var icon in icons){
		//process icon
		//import business here
		/*extractFavicon(icon, function(o){
			
		});*/
	}
};
