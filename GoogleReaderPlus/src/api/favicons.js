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

/**
 * Extract sites list from google reader xml
 */
function loadIcons(a, cb){
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
                            setFavicon(item.data.title, item.data.icon, item.data.url, FAVICON);
							cloudItems[item.data.url]=item;
                        });
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
    xhr.open(a.method || 'get', normalizeUrl(url), true);
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
        icon = cleanUrl(url) + "/favicon.ico";
    } else {
        //Add domain if relative url
        var re = new RegExp("^http:", "i");
        if (!re.test(icon)) {
            icon = url + '/' + icon;
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
