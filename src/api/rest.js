var GRP_MIRROR = 'http://greaderplus.appspot.com/';

GRP.api_rest = function(name, local, mirror, cached){
    //http://wedata.net/help/api
    var SL = {
		error:'Error $status on sending data using REST'
	};
    var config = {
        base: 'http://wedata.net',
        successCodes: {201:true, 200:true},
		api_key:'4b64b4cd064456a86a'+'847907fb6707c89ff560e5',
        errors: {
            201: 'Created - Database or item was created successfully.',
            200: ' OK - No error.',
            403: 'Forbidden - The API key is wrong or you are editing a database that was created by other user.',
            400: 'Bad Request - Request parameter is invalid.'
        },
        all: {
            getall:'/databases',
			get: '/databases/'+name+'.json',
            create: '/databases',
			update: '/databases/'+name,
			remove:'/databases/'+name,
			cache: (mirror)?(GRP_MIRROR+name):''
        },
		item: {
            getall:'/databases/'+name+'/items.json',
			get: '/items/:id.json',
            create: '/databases/'+name+'/items',
			update: '/items/:id',
			remove:'/items/:id',
			cache: (mirror)?(GRP_MIRROR+name):''
        }
    };
	
    function send(method, url, params, cb, cberr){
		function response(xhr){
			if (config.successCodes[xhr.status]) {
				if (cb) {
					var o = '';
					try {
						o = JSON.parse(xhr.responseText);
					}catch(e){}
					cb(o, true);
				}
			} else {
				console.error((SL[xhr.status]||config.errors[xhr.status]||SL.error).replace('$status', xhr.status||''));
				if (cberr) {
					cberr();
				} else if (cb) {
					cb(null, false);
				}
			}
		}
		var o = {
			method: method,
			url: url,
			data: params,
			headers:{
				"Content-Type": "application/x-www-form-urlencoded"
			},
			onload: function(xhr){
				if (xhr.readyState == 4) {
					response(xhr);
				}
			},
			onerror: function(xhr){
				if (cberr) {
					cberr(xhr);
				}else if (cb) {
					cb(xhr, false);
				}
			}
		};
		if (cached) {
			o.cached=cached;
		}
		
		if (local) {
			request(o, true, response);
		} else {
			GM_xmlhttpRequest(o);
		}
    }
    
    return ({
        all: {
            getAll: function(o /* page */, success, error){
                o=o||{};
                var params = {
                    page: o.page||1
                };
				var url = config.all.cache;
				
				function retryWithoutCache(){
					console.log('Retry all.getAll without cache');
					var url = config.base + config.all.getall;
					send('get', url, params, success, error);
				}
				
				if (url){
					console.log('Get all.getAll from cache');
					send('get', url, params, success, function(){
						retryWithoutCache();
					});
				}else{
					retryWithoutCache();
				}
            },
			get: function(o /* name, page */, success, error){
                var url = config.base + config.all.get;
                var params = {
                    page: o.page
                };
                send('get', url, params, success, error);
            },
            create: function(o /* api_key name,description, required_keys,optional_keys, permit_other_keys */, success, error){
                var url = config.base + config.all.create;
                var params = {
                    api_key: o.api_key||config.api_key,
                    database: {
                        name: o.name,
                        description: o.description,
                        required_keys: o.required_keys,
                        optional_keys: o.optional_keys,
                        permit_other_keys: o.permit_other_keys
                    }
                };
				send('post', url, params, success, error);
            },
            update: function(o /* api_key name,description, required_keys,optional_keys, permit_other_keys*/, success, error){
                var url = config.base + config.all.update;
                var params = {
                    api_key: o.api_key||config.api_key,
                    database: {
                        name: o.name,
                        description: o.description,
                        required_keys: o.required_keys,
                        optional_keys: o.optional_keys,
                        permit_other_keys: o.permit_other_keys
                    }
                };
				send('put', url, params, success, error);
            },
            remove: function(o/* api_key, name */, success, error){
             	//Remove DB
				var url = config.base + config.all.remove;
                var params = {
                    api_key: o.api_key||config.api_key
                };
                send('delete', url, params, success, error);
            }
        },
        item: {
            getAll: function(o /* name, page */, success, error){
				o=o||{};
                var params = {
                    page: o.page||1
                };
				function retryWithoutCache(){
					console.log('Retry item.getAll without cache');
					var url = config.base + config.item.getall;
					send('get', url, params, success, error);
				}
				var url = config.item.cache;
				if (url){
					console.log('Get item.getAll from cache');
					send('get', url, params, success, function(){
						retryWithoutCache();
					});
				}else{
					retryWithoutCache();
				}
            },
			get: function(o /* name, page, id */, success, error){
                var url = config.base + config.item.get.replace(':id', o.id);
                var params = {
                    page: o.page
                };
                send('get', url, params, success, error);
            },
            create: function(o /* name, api_key, name, values */, success, error){
                var url = config.base + config.item.create;
                var params = {
                    api_key: o.api_key||config.api_key,
					name: o.name,
                    data: o.values /* [] key/value */
                };
				send('post', url, params, success, error);
            },
            update: function(o /*  api_key, id, data */, success, error){
                var url = config.base + config.item.update.replace(':id', o.id);
                var params = {
                   api_key: o.api_key||config.api_key,
                   name: o.name,
				   data: o.values /* [] key/value */
                };
				send('put', url, params, success, error);
            },
			createOrUpdate: function(ci, o , success, error, all){
				if (all) {
					ci = isItemInList(o, all, 'data', 'values');
				}
				if (o.values && o.values.id){
					//already own an id -> update
					o.id = o.values.id;
					delete o.values.id;
					ci = true;
				}
				if (ci){
					var b = (ci.name !== o.name || !compareObject(ci.data, o.values));
					o.id = o.id || getIdFromResourceUrl(ci);
					//object already exist
					if (b && o.id){
						console.log('objects different-> update '+o.name + ' '+o.id);
						this.update(o, success, error);
					}else{
						console.log('objects equals-> NO update '+o.name);
						if (error){
							error(false, o);
						}
					}
				}else{
					this.create(o, function(xhr){
						if (success) {
							//Return id
							//ci = xhr.responseJson.id??
							//o.id = getIdFromResourceUrl(ci);
							success(xhr, o);
						}
					}, error);
				}
            },
            remove: function(o/* api_key, id */, success, error){
             	var url = config.base + config.item.get.replace(':id', o.id);
                var params = {
                    api_key: o.api_key||config.api_key
                };
                send('delete', url, params, success, error);
            },
			removeAll: function(o/* api_key */, success, error){
             	var me = this;
				o=o||{};
				this.getAll(o,function(items){
					foreach(items,function(item){
						var id = getIdFromResourceUrl(item);
						if (id) {
							me.remove({
								id: id,
								api_key: o.api_key || config.api_key
							});
						}
					});
					if (success) {
						success(true);
					}
				},error);
            }
        }
    });
};

function getIdFromResourceUrl(o){
	var s = false;
	if(o.resource_url){
		s = o.resource_url.replace(/^.*\/items\//, '');
	}else if (o.id){
		s = o.id;
	}
	return s;
}

function compareObject(a,b){
	var eq=false;
	if ((typeof a == 'object') && (typeof b == 'object')) {
		eq = true;
		iterate(a, function(i, o){
			if (typeof o !== 'undefined' && o !== b[i]) {
				eq = false;
				return false;//exit
			}
		});
	}
	return eq;
}

function isItemInList(o,all, p1, p2){
	p1=p1||'data';
	p2=p2||'values';
	var k = iterate(all,function(i,a){
		if (compareObject(a[p1], o[p2])){
			return false;//stop loop
		}
	});
	return (k)?all[k]:false;
}
