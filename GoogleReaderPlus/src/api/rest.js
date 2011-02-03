GRP.api_rest = function(name, local, cached){
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
			remove:'/databases/'+name
        },
		item: {
            getall:'/databases/'+name+'/items.json',
			get: '/items/:id.json',
            create: '/databases/'+name+'/items',
			update: '/items/:id',
			remove:'/items/:id'
        }
    };
    
    function send(method, url, params, cb){
		function response(xhr){
			if (config.successCodes[xhr.status]) {
				if (cb) {
					var o = JSON.parse(xhr.responseText);
					cb(o, true);
				}
			} else {
				console.error((SL[xhr.status]||config.errors[xhr.status]||SL.error).replace('$status', xhr.status||''));
				cb(null, false);
			}
		}
		var o = {
			method: method,
			url: config.base + url,
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
				if (cb) {
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
                var url = config.all.getall;
				o=o||{};
                var params = {
                    page: o.page||1
                };
                send('get', url, params, success, error);
            },
			get: function(o /* name, page */, success, error){
                var url = config.all.get;
                var params = {
                    page: o.page
                };
                send('get', url, params, success, error);
            },
            create: function(o /* api_key name,description, required_keys,optional_keys, permit_other_keys */, success, error){
                var url = config.all.create;
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
                var url = config.all.update;
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
				var url = config.all.remove;
                var params = {
                    api_key: o.api_key||config.api_key
                };
                send('delete', url, params, success, error);
            }
        },
        item: {
            getAll: function(o /* name, page */, success, error){
                var url = config.item.getall;
                var params = {
                    page: o.page
                };
                send('get', url, params, success, error);
            },
			get: function(o /* name, page, id */, success, error){
                var url = config.item.get.replace(':id', o.id);
                var params = {
                    page: o.page
                };
                send('get', url, params, success, error);
            },
            create: function(o /* name, api_key, name, values */, success, error){
                var url = config.item.create;
                var params = {
                    api_key: o.api_key||config.api_key,
					name: o.name,
                    data: o.values /* [] key/value */
                };
				send('post', url, params, success, error);
            },
            update: function(o /*  api_key, id, data */, success, error){
                var url = config.item.update.replace(':id', o.id);
                var params = {
                   api_key: o.api_key||config.api_key,
                   name: o.name,
				   data: o.values /* [] key/value */
                };
				send('put', url, params, success, error);
            },
			createOrUpdate: function(ci, o , success, error){
                if (ci){
					//object already exist
					if (ci.name !== o.name || !compareObject(ci.values, o.values)){
						o.id = getIdFromResourceUrl(ci);
						console.log('objects different-> update '+o.name + ' '+o.id);
						this.update(o);
					}
				}else{
					this.create(o);
				}
            },
            remove: function(o/* api_key, id */, success, error){
             	var url = config.item.get.replace(':id', o.id);
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
	return (o.resource_url)?(o.resource_url.replace(/^.*\/items\//, '')):false;
}

function compareObject(a,b){
	var eq=false;
	if ((typeof a == 'object') && (typeof b == 'object')) {
		eq = true;
		iterate(a, function(i, o){
			if (typeof o !== 'undefined' && o !== b[i]) {
				eq = false;
			//exit
			}
		});
	}
	return eq;
}
