/**
 * TODO make doc
 * @version  0.3
 * @date 2010
 * @author JoLan, LudoO
 * Replace entries with part of the original article
 *
 * +css selector 
 */
GRP.replacer = function(prefs, langs, ID, SL, lang){
    var locked = false, partIndex = 0, gp_data = {}, TPL_NAME = "replacer_result_";
    
    function initVars(){
        gp_data = {};
		
		GM_addStyle('.entry.preview .p_replacer{display:none}', 'rpe_'+ID+'_preview');
		
        parseItems(gp_data, prefs.replacer_items);
        
        if (prefs.replacer_cloud) {
            //get online data from cloud db
            /*chrome.extension.sendRequest({
                message: "clouddata",
                name: 'LDRFullFeed'
            }, function(selectors){
                parseItems(gp_data, selectors);
                console.log('cloud LDRFullFeed added');
            });*/
            chrome.extension.sendRequest({
                message: "clouddata",
                name: 'Replacer'
            }, function(selectors){
                parseItems(gp_data, selectors);
                console.log('cloud replacer added');
            });
        }
        
    }
    
	function getHash(o){
		return o.search+';'+o.replace+';'+o.url;
	}


    function parseItems(gp_data, items){
        var dup = {};
		iterate(items, function(title, o){
            if (o.values) {
				//flatten values
				o = apply(o, o.values);
				delete o.values;
				delete o.data;
			}
			
			//Filtering duplicates based on hash
			var h = getHash(o);
			if (dup[h]) {
				//abort duplicate
				//console.log('abort duplicate ' + title /*+ ' : ' + h*/);
				return;
			}
			dup[h]=o;
			
            o.re_url = new RegExp(o.url, "im");
			//o.re_url = new RegExp(encodeRE(o.url), "im");
            if (/^xpath\:/.test(o.search)) {
                o.xpath = o.search.replace(/^xpath\:/, '');
                //Ensure relative path
                if (!(/^\./.test(o.xpath))) {
                    if (/^\//.test(o.xpath)) {
                        o.xpath = '.' + o.xpath;
                    } else {
                        o.xpath = './' + o.xpath;
                    }
                }
            }else if (/^css\:/.test(o.search)) {
				o.selector = o.search.replace(/^css\:/, '');
			} else {
                var s = o.search;
				if (/^link\:/.test(s)) {
					s = s.replace(/^link\:/, '');
					o.link = true;
				}
				try {
					o.re_search = new RegExp(s, "im");
				}catch(e){
					//Retry with escaped
					try {
						s = encodeRE(s);
						o.re_search = new RegExp(s, "im");
					} catch (e) {
						console.error(e);
						console.error(o);
						o = false;
					}
				}
            }
			if (o){
            	gp_data[title] = o;
			}
        });
    }
    
    function replaceItem(html, xml, matches, partIndex, body){
        var result = '';
        var el = document.getElementById(TPL_NAME + partIndex);
        /*if (item.keeptext){
         var eb = getEntryBody(el.parentNode);
         result = eb.innerHTML+'<br/>';
         }*/
        iterate(matches, function(title, o){
            //Fix relative url
			var base = getUrlBase(o.url);
			if (o.xpath || o.selector) {
                if (!xml) {
                    xml = loadXml(html);
                }
                if (xml) {
                    var els;
					if (o.xpath){
						els = getElements(o.xpath, xml);
					}else{
						els = Sizzle(o.selector, xml);
					}
					if (els && els.length>0) {
						var res = '';
						foreach(els, function(el){
							res += el.outerHTML;
						});
						result += fixurls(res, base);
					}
                    //clean xml
                    remove(xml);
                }
            } else {
                var item = gp_data[title];
                if (item.re_search) {
					if (item.link) {
						html=item._link.url;
					}
					
                    var m = item.re_search.exec(html);
                    if (m && m[0]) {
                        var r =item.replace;
						if (/^\+/.test(r)){
							var entryBody = getEntryBody(body);//item-body
							if (entryBody) {
								result += fixurls(entryBody.innerHTML,base);
							}
							r=r.replace(/^\+/,'');
						}
						result += fixurls(m[0].replace(item.re_search, r));
                    }
                }
            }
        });
        
        var entryBody = getEntryBody(el.parentNode);
        if (result !== '') {
			el.innerHTML = result;
            show(el);
            hide(entryBody);
        } else {
            el.innerHTML = SL.nomatch;
            //Reset to original
            hide(el);
            show(entryBody);
        }
    }
	
  function fixurls(html, base){
    function replaceUrl(){
      //var args = Array.prototype.slice.call(arguments, 1);
      var t = arguments[0];//text
      var url = arguments[1];
      if (!(/^http/.test(url))){
          t=t.replace(url, base+url);
      }
      return t;
    }
    html=html.replace(/\shref="([^"]*)/g, replaceUrl);
    html=html.replace(/\shref='([^']*)/g, replaceUrl);
    html=html.replace(/\ssrc="([^"]*)/g, replaceUrl);
    html=html.replace(/\ssrc='([^']*)/g, replaceUrl);
    return html;
  }
    
    function doreplacer(el, entry, mode, force){
        var index = -1, regex, link = getEntryLink(entry);
        if (link) {
            var matches = {};
            iterate(gp_data, function(title, o){
                if (o.re_url.test(link.url) || o.re_url.test(link.feed)) {
                    o._link={url:link.url,title:link.title};
					matches[title] = o;
                }
            });
            replacePart(matches, entry, link);
        }
    }
    
    function replacePart(matches, entry, link){
        if (isObjectEmpty(matches)) {
            return false;
        }
        
        var body = getFirstElementByClassName(entry, 'entry-body');//div
        //var entryBody = getEntryBody(body);
        
        //hide(entryBody);
        var el = document.createElement('div');
        /*if (matches[0].keeptext) {
         hide(el);
         }else{
         hide(entryBody);
         }*/
        partIndex++;
		el.className = 'p_replacer';
        el.id = TPL_NAME + partIndex;
        el.innerHTML = SL.loading;
        hide(el);
        body.appendChild(el);
        //console.log('request '+partIndex+' - '+link.url);
        GM_xmlhttpRequest({
            url: link.url,
            method: "GET",
            partIndex: partIndex,
            matches: JSON.stringify(matches),
            onload: function(res, req){
                var matches = JSON.parse(req.matches);
                var text = res.responseText.replace(/[\r\n]+/g, '');
                replaceItem(text, res.responseXml, matches, req.partIndex, body);
            }
        });
    }
    
    
    initVars();
    registerFeature(doreplacer, ID);
};