var cloudItems={};
function setFavicon(title, icon, url, FAVICON){
    if (FAVICON) {
        var key = ellipsis(title);
        FAVICON[key] = {
            icon: icon,
            url: url,
            title: title
        };
    }
}

var counts = {doublons:0,urlreader:0,urluser:0,uiicon:0,icoslash:0};
var reFixReader = /^.*\/feed%2F/;
var r2 = new GRP.api_rest('Favicons', true);	

/**
 * Extract sites list from google reader xml
 */
function loadIcons(a, cb){
    var FIXING = false;
	var FAVICON_TPL_URL = a.FAVICON_TPL_URL;
    var prefs = getPrefs();
    request({
        url: a.url,
        onload: function(xhr){
            var xml = xhr.responseXML;
            var FAVICON = parseXml(xml, FAVICON_TPL_URL);
            
            var prefs = getPrefs();
            //Load wedata cloud data
			if (prefs.favicons_cloud) {
                var r = new GRP.api_rest('Favicons', true);
                r.item.getAll({}, function(items, success){
                    if (success) {
                        cloudItems={};
						foreach(items, function(item){
                            if (FIXING) {
								item = fixItem(item);
							}
							setFavicon(item.data.title, item.data.icon, item.data.url, FAVICON);
							cloudItems[item.data.url]=item;
                        });
						if (FIXING) {
							console.log('doublons=' + counts.doublons);
							console.log('urlreader=' + counts.urlreader);
							console.log('urluser=' + counts.urluser);
							console.log('uiicon=' + counts.uiicon);
							console.log('icoslash=' + counts.icoslash);
						}
                    }
                    sendResponse({
                        message: "iconsloaded",
                        FAVICON: FAVICON
                    }, cb);
                });
            } else {
                sendResponse({
                    message: "iconsloaded",
                    FAVICON: FAVICON
                }, cb);
            }
        }
    }, true);
}

function fixItem(item){
	/*if (cloudItems[item.data.url]){
		//remove doublon
		item.id = getIdFromResourceUrl(item);
		counts.doublons++;
		//r2.item.remove(item);
	}
	if (reFixReader.test(item.data.url)||reFixReader.test(item.name)){
		item.id = getIdFromResourceUrl(item);
		item.name = cleanReaderUrl(item.name);
		item.values = {
			url: cleanReaderUrl(item.data.url),
			icon: cleanReaderUrl(item.data.icon),
			title: item.data.title
		};
		console.log(item);
		counts.urlreader++;
		//r2.item.update(item);
	}
	
	//if url is a page, remove page
	if (/http\:\/\/.*\/[^\.]+\.\w+$/.test(item.data.url)){
		var url = getUrlBase(item.data.url);
		item.id = getIdFromResourceUrl(item);
		item.values=item.data
		item.values.icon=item.values.icon.replace(new RegExp('^'+item.data.url), url);
		item.values.url=url;
		item.name = url;
		console.log(item);
		counts.urluser++;
		//r2.item.update(item);
	}
	
	if (/\/reader\/ui\/favicon\.ico$/.test(item.data.icon)){
		item.id = getIdFromResourceUrl(item);
		item.values=item.data
		item.values.icon=item.values.icon.replace(/\/?\/reader\/ui\//, '');
		console.log(item);
		counts.uiicon++;
		r2.item.update(item);
	}
	*/
	
	return item;
}
function cleanReaderUrl(url){
	if (reFixReader.test(url)) {
		return decodeURIComponent(url.replace(reFixReader, ''));
	}else{
		return url;
	}
}

function extractFavicon(a, cb){
    var xhr = new XMLHttpRequest();
    var url, title, key = a.key, FAVICON = a.FAVICON;
    if (!key) {
        //url+title
        key = ellipsis(title);
        url = a.url;
        title = a.title;
    } else {
        //key only
        var f = FAVICON[key];
        url = f.url;
        title = f.title;
    }
	var page = getUrlBase(url);
	
	//Helper for feedburner
	page=page.replace(/\/\/feeds\./,'//www.');
	
    //xhr.open(a.method || 'get', normalizeUrl(url), true);
	xhr.open(a.method || 'get', page, true);
    xhr.onload = function(o){
        var xhr = o.target;
        if (xhr) {
            var html = xhr.responseText; //responseBody
            var icon = parseFavicon(html, url);
            if (icon) {
                setFavicon(title, icon, url, FAVICON);
                saveFavicon(url, icon, title);
            }
            sendResponse({
                message: "iconget",
                title: title,
                icon: icon,
                url: url,
                FAVICON: FAVICON
            }, cb);
        }
    };
    xhr.send({});
}

/**
 * Save just one icon on get Favicon menu
 */
function saveFavicon(url, icon, title){
    var prefs = getPrefs();
    prefs.favicons_domains[url] = icon;
    setPrefs(prefs);
    
    if (cloudSaveIcon(url)){
		//send to remote db
	    var r = new GRP.api_rest('Favicons', true);	
	    var name = getNameFromUrl(url);
		
		//Check if already exist
		var ci = cloudItems[url];
		r.item.createOrUpdate(ci, {
				name: name,
				values: {
					url: url,
					icon: icon,
					title: title
				}
			});
	}
}
//Ignore some user custom sites
function cloudSaveIcon(url){
	//User reader
	if (/google\.com\/\reader\/view\/user/.test(url)){
		return false;
	}
	//Google Buzz
	if (/buzz\.googleapis\.com/.test(url)){
		return false;
	}
	//some numeric number inside urls
	if (/\/\d{2}\d+(\/|$)/.test(url)){
		return false;
	}
	return true;
}

function getNameFromUrl(url){
	return url.replace(/^http:\/\//, '').replace(/\/$/, '');
}

function parseFavicon(html, url){
    var icon, link;
    var relink = /<LINK[^>]*?REL=["'](SHORTCUT\W+)?ICON["'][^>]*?>/i;
    var rehref = /href=["'](.*?)["']/i;
    var m = relink.exec(html);
    if (m) {
        link = m[0];
        m = rehref.exec(link);
        if (m) {
            icon = m[1];
        }
    }
    if (!icon) {
        icon = getUrlBase(url) + "/favicon.ico";
    } else {
        //Add domain if relative url
        var re = new RegExp("^http:", "i");
        if (!re.test(icon)) {
            if (/^\//.test(icon)){
				icon = getUrlBase(url) + icon;
			}else{
				icon = cleanUrl(url) + '/' + icon;
			}
        }
    }
    icon = normalizeUrl(icon);
    return icon;
}


function checkIconDomains(prefs){
    //Check domains
    if (!prefs.favicons_domains) {
        prefs.favicons_domains = {};
    }
    if (typeof prefs.favicons_domains == "string") {
        var favicons = {};
        var sites = prefs.favicons_domains.split(',');
        for (var j = 0, ln = sites.length; i < ln; i++) {
            var site = sites[j];
            if (site && site != 'null') {
                favicons[site] = '';
            }
        }
        prefs.favicons_domains = favicons;
    }
}


function parseXml(xml, FAVICON_TPL_URL){
    var prefs = getPrefs();
    var domains = prefs.favicons_domains;
    var FAVICON = {};
    var manual = mycore.storage.getItem("favicons_manual");
    Array.forEach(xml.getElementsByTagName('outline'), function(outline){
        if (!outline.hasAttribute('htmlUrl')) {
            return;
        }
        var title = outline.getAttribute('title');
        var url = outline.getAttribute('htmlUrl');
        var favicon;
        var domain = url.split(/\/|\?/)[2];
        var icon = FAVICON_TPL_URL + domain;
        setFavicon(title, icon, url, FAVICON);
        
        /*
         var icond = domains[url];//domains store site->faviconUrl
         var manualDomain = (typeof icond !== "undefined");
         if (manualDomain){
         icon=icond;
         }
         //manualmode + (empty or null or not defined)
         //or EXCEPTION + empty (autofill)
         if ((manual && !icon) || (!manual && manualDomain && icon==='')) {
         extractFavicon(
         {
         url: url,
         title: title,
         FAVICON: FAVICON
         });
         }else{
         setFavicon(title, icon, url, FAVICON);
         }
         */
    });
    
    //upload parsing results
    //createWorkerIcons(FAVICON);
    
    return FAVICON;
}
/*
function createWorkerIcons(icons){
    createWorker({
        url: "worker/wfavicons.js",
        data: {
            icons: icons
        },
		job: function(worker){
			console.log('Job here');
		},
        onmessage: function(data, e){
        	console.log('onmessage here');
        },
        onerror: function(data, e){
            console.error('Error on worker favicon ' + data);
        }
    });
}
*/
