var ICONS_TITLE, ICONS_URL={};
var counts = {total:0},reFixReader = /^.*\/feed%2F/;
//debug
var FIXING = false, MIRROR = true, r2=false;
if (FIXING) {
	r2 = new GRP.api_rest('Favicons', true, MIRROR);
}

function setFavicon(o, item){
    if (o){
	    var key = ellipsis(o.title);
	    ICONS_TITLE[key] = o;/* {icon, url, title}*/
		if (item) {
			o.id = getIdFromResourceUrl(item); 
			ICONS_URL[item.data.url] = o;
		}
	}
}

/**
 * Extract sites list from google reader xml
 */
function loadIcons(a, cb){

	var ICO_TPL_URL = a.ICO_TPL_URL;
    request({
        url: a.url,
        onload: function(xhr){
            var xml = xhr.responseXML;
            parseXml(xml, ICO_TPL_URL);
            
            var prefs = getPrefs();
            //Load wedata cloud data
			if (prefs.favicons_cloud) {
                var r = new GRP.api_rest('Favicons', true, MIRROR);
				r.item.getAll({}, function(items, success){
                    if (success) {
                        ICONS_URL={};
						if (FIXING) {
								counts = {total:0,doublons:0,d:{},urldoublons:0,urlreader:0,urluser:0,uiicon:0,icoslash:0,icofailed:0};
						}
						foreach(items, function(item){
                            if (FIXING) {
								item = fixItem(item);
							}
							counts.total++;
							setFavicon(item.data, item);
                        });
						if (FIXING) {
							console.log('total=' + items.length);
							console.log('doublons=' + counts.doublons);
							console.log('urldoublons=' + counts.urldoublons);
							console.log('urlreader=' + counts.urlreader);
							console.log('urluser=' + counts.urluser);
							console.log('uiicon=' + counts.uiicon);
							console.log('icoslash=' + counts.icoslash);
							console.log('icofailed=' + counts.icofailed);
							console.log(counts.d);
						}
                    }
                    sendResponse({
                        message: "iconsloaded",
                        ICONS_TITLE: ICONS_TITLE
                    }, cb);
                });
				
            } else {
                sendResponse({
                    message: "iconsloaded",
                    ICONS_TITLE: ICONS_TITLE
                }, cb);
            }
        }
    }, true);
}

function fixItem(item){
	var o = ICONS_URL[item.data.url];
	/*if (o){
		//remove doublon
		item.id = getIdFromResourceUrl(item);
		if (item.id) {
			if (item.data.url==o.data.url){
			//if (compareObject(item.data, o.data)) {
				counts.doublons++;
				counts.d[item.data.url] = (counts.d[item.data.url] || 0) + 1;
				if (counts.doublons < 100) {
					console.log(counts.doublons+' : remove '+item.id);
					//r2.item.remove(item);
				}
			} else {
				counts.urldoublons++;
			}
		}
	}*/
	
	/*
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
	}*/
	
	//if url is a page, remove page
	/*if (/http\:\/\/.*\/[^\.]+\.\w+$/.test(item.data.url)){
		var url = getUrlBase(item.data.url);
		item.id = getIdFromResourceUrl(item);
		item.values=item.data;
		item.values.icon=item.values.icon.replace(new RegExp('^'+item.data.url), url);
		item.values.url=url;
		item.name = url;
		console.log(item);
		counts.urluser++;
		//r2.item.update(item);
	}*/
	
	/*
	if (/\/reader\/ui\/favicon\.ico$/.test(item.data.icon)){
		item.id = getIdFromResourceUrl(item);
		item.values=item.data;
		item.values.icon=item.values.icon.replace(/\/?\/reader\/ui\//, '');
		console.log(item);
		counts.uiicon++;
		//r2.item.update(item);
	}
	*/
	/*
	if (counts.total < 20) {
		//Check favicon response
		checkfile({url: item.data.icon}, function(){
			counts.icofailed++;
			console.error('Favicon not found ['+counts.icofailed+']: ' + item.data.icon);
		});
	}
	*/
	return item;
}
function checkfile(a, cb){
	request({
		url: a.url,
		onload: function(xhr){
			if (xhr.status >= 400) {
				if (cb){
					cb(a);
				}
			}
		},
		onerror: function(){
			if (cb){
				cb(a);
			}
		}
	}, true);
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
    var url, title, key = a.key; //, ICONS_TITLE = a.ICONS_TITLE;
    if (!key) {
        //url+title
        key = ellipsis(title);
        url = a.url;
        title = a.title;
    } else {
        //key only
        var f = a.f; //ICONS_TITLE[key];
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
               var f = {title:title, icon:icon, url:url};
			   setFavicon(f);
               saveFavicon(f);
            }
			//ICONS_TITLE[key].icon=icon;
            sendResponse({
                message: "iconget",
				o:{
					title: title,
	                icon: icon,
	                url: url
				}
                //,ICONS_TITLE: ICONS_TITLE
            }, cb);
        }
    };
    xhr.send({});
}

/**
 * Save just one icon on get Favicon menu
 */
function saveFavicon(f){
    var prefs = getPrefs();
    prefs.favicons_domains[f.url] = f.icon;
    setPrefs(prefs);
    
    if (cloudSaveIcon(f.url)){
		//send to remote db
	    var r = new GRP.api_rest('Favicons', true, MIRROR);	
	    var name = getNameFromUrl(f.url);
		//Check if already exist
		var ci = ICONS_URL[f.url];
		setTimeout(function(){
			r.item.createOrUpdate(ci, {
					name: name,
					values: f
			});
		},10);
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
	/*if (/\/\d{2}\d+(\/|$)/.test(url)){
		return false;
	}*/
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


function parseXml(xml, tplUrl){
    var prefs = getPrefs();
    var domains = prefs.favicons_domains;
    ICONS_TITLE = {};
    var manual = mycore.storage.getItem("favicons_manual");
    Array.forEach(xml.getElementsByTagName('outline'), function(outline){
        var url = outline.getAttribute('htmlUrl');
		if (!url) {
            return;
        }
		var xurl = outline.getAttribute('xmlUrl');
        var title = outline.getAttribute('title');
        var domain = url.split(/\/|\?/)[2] ;
        setFavicon({
			icon:tplUrl + domain, 
			url:xurl,
			title:title
		});
    });
}

