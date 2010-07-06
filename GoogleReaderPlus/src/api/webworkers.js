function createWorker(o){
    console.log('--createWorker '+o.url);
	
	var w = new Worker(o.url);
	
	console.log('--Worker created '+o.url);

    WH.postMsg(o.data, w);
    w.onmessage = function(e){
		var data = WH.getData(e);
        if (data && data.log) {
            console.log(data.log);
        } else {
            if (o.message && typeof o.message === 'function') {
                o.message(data);
            }
        }
    };
    w.onerror = function(e){
		if (o.onerror && typeof o.onerror === 'function') {
            var data = WH.getData(e);
			o.onerror(data, e);
        }
    };
	
	if (o.job && typeof o.job === 'function') {
	   o.job(w);
    }
}
