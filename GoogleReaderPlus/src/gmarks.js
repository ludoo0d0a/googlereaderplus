/**
 * Google Boormarks integration
 * @version  ?
 * @date 2011-05-04
 *
 * see API docs: http://www.mmartins.com/mmartins/googlebookmarksapi/
 * http://code.google.com/p/gmarks-android/wiki/BookmarksAPI
 * http://code.google.com/p/pyrfeed/wiki/GoogleReaderAPI
 * http://www.keakon.net/2011/04/21/%E5%90%8C%E6%AD%A5Chrome%E6%A0%87%E7%AD%BE%E9%A1%B5
 */
GRP.gmarks = function(prefs, langs, ID, SL, lang) {
	var token=false, threadId=false;

	//getThreadId(cb);

	var api = {
		icon:ID,
		//add: 'http://www.google.com/bookmarks/mark',
		add:'https://www.google.com/bookmarks/api/thread',//Star
		//add:'https://www.google.com/bookmarks/api/api/thread',//AddResults
		//method:'POST',
		nousername:true,
		auth: {
			method:'GET',
			url:'https://www.google.com/bookmarks/api/bookmarklet'
		},
		strip:")]}'",
		successCode:200,
		success: function(r,btn,mode, text) {
			var ret = false;
			if (mode == 'login') {
				//token
				if (text  ) {
					var result = /SL.xt = '([^']+)'/.exec(text);
					if (result) {
						token = result[1];
					}
					result = /a.threadID\):"([^"]+)"/.exec(text);
					if (result) {
						threadId = result[1];
					}
					console.log(token);
					console.log(threadId);
				}
				ret= {
					xt:token,
					threadId:threadId
				};
			} else {
				var o = r.results;
				ret = (o && o[0] && o[0].threadresult && o[0].threadresult.elementId);
			}
			return {
				id:ret
			};
		},
		getToken: function() {
			return (token && threadId)? {
				xt:token,
				threadId:threadId
			}:false;
		},
		getData: function(p, cred) {

			var results = {
				results:[{
					threadId:p.threadId  || threadId,
					elementId:0,
					authorId:0,
					title:unicode(p.title),
					timestamp:0,
					formattedTimestamp:0,
					url:p.url,
					signedUrl:'',
					previewUrl:'',
					snippet:'',
					threadComments:[],
					parentId:p.threadId || threadId,
					labels:p.tags||[]
				}]
			};
			var data = 'td='+encodeURIComponent(JSON.stringify(results));
			var tags = '';
			if(p.tags) {
				tags = unicode(p.tags.join(','));
			}
			//data='td={"results":[{"threadId":"' + p.threadId + '","elementId":0,"authorId":0,"title":"' + unicode(p.title) + '","timestamp":0,"formattedTimestamp":0,"url":"' + p.url + '","signedUrl":"","previewUrl":"","snippet":"","threadComments":[],"parentId":"' + p.threadId + '","labels":["testGmarks"]}]}'
			var params= {
				xt:p.xt || token,
				op:'Star'
				//op:'AddResults'
			};

			return {
				data:data,
				params:params
			};
		},
		errors: {
			400: 'badrequest',
			403: 'wronglogin',
			500: 'error',
			503: 'unavailable'
		},
		/*parameters: {
		 prev:'/lookup',
		 sig:sig
		 },*/
		params: {
			method:'POST',
			url: 'url',//bkmk
			title:'title',
			selection:'description',
			desc:'annotation',
			tags:'labels'
		}
	};
	GRP.api_readit(prefs, langs, ID, SL, lang, api);

	function getThreadId() {
		request('https://www.google.com/bookmarks/api/bookmarklet', function(o) {
			var text = o.responseText;
			var result = /SL.xt = '([^']+)'/ .exec(text);
			if (result) {
				token = result[1];
			}
			result = /a.threadID\):"([^"]+)"/ .exec(text);
			if (result) {
				threadId = result[1];
				cb(token, threadId);
			}
		});
	}

	function addBookmark(token, threadId, url, title, tags) {

		var results = [{
			threadId:threadId,
			elementId:0,
			authorId:0,
			title:unicode(title),
			timestamp:0,
			formattedTimestamp:0,
			url:url,
			signedUrl:'',
			previewUrl:'',
			snippet:'',
			threadComments:[],
			parentId:''+threadId,
			labels:tags||[]
		}];

		//'td={"results":[{"threadId":"' + threadId + '","elementId":0,"authorId":0,"title":"' + unicode(title) + '","timestamp":0,"formattedTimestamp":0,"url":"' + url + '","signedUrl":"","previewUrl":"","snippet":"","threadComments":[],"parentId":"' + threadId + '","labels":["Sync My Tabs"]}]}'

		var data = 'td='+JSON.stringify(results);
		request({
			method:'POST',
			url:'https://www.google.com/bookmarks/api/thread',
			parameters: {
				xt:token,
				op:'Star'
			},
			data:data
		});
	}

	function unicode (string) {
		if (string) {
			var length = string.length;
			var unicode_array = [];
			for (i = 0 ; i < length; ++i) { var charCode = string.charCodeAt(i)
				if (charCode < 128 ) {
					unicode_array.push(string[i]);
				} else {
					unicode_array.push( '\\u' );
					unicode_array.push(charCode.toString( 16 ));
				}
			}
			return unicode_array.join( '' );
		} else {
			return string;
		}
	}

};