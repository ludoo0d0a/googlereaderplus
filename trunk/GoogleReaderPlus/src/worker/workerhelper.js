//WorkerHelper
var WH = {
    getData: function(e){
        var data = e.data;
        if (typeof data === 'string') {
            try {
                data = JSON.parse(data);
            } catch (e) {
            }
        }
        return data;
    },
    postMsg: function(o, w){
        var data = o;
        if (typeof data !== 'string') {
            data = JSON.stringify(o);
        }
        if (w) {
            w.postMessage(data);
        } else {
            postMessage(data);
        }
        
    }
};

var console = console ||
{
    log: function(data, w){
        WH.postMsg({
            log: data
        }, w);
    }
};
