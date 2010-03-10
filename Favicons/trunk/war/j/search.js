var URL = 'http://pageicons.appspot.com/favicons?url=';
var URL_LUCKY = 'http://pageicons.appspot.com/lucky?p=';

function init(){
	var p = getParameters();
	if (p && p.q){
		search(p.q);
	}
}
function test(){
    search("vincentabry.com, accessoweb.com, lesfrontaliers.lu, jsfcentral.com, smarterware.org, framasoft.net, cinemovies.fr, developer.com");
}

function getParameters(){
	var r={};
	if (window.location.search) {
		var p = window.location.search.substring(1).split('&');
		for (var i = 0, len = p.length; i < len; i++) {
			var o = p[i].split('=');
			r[o[0]] = o[1];
		}
	}
	return r;
}

function xhr(url, callback){
	var oXMLHttpRequest = new XMLHttpRequest();
	oXMLHttpRequest.open("POST", url, true);
	oXMLHttpRequest.onreadystatechange = function(xhr){
		if (this.readyState == XMLHttpRequest.DONE) {
			callback(xhr.target);
		}
	};
	oXMLHttpRequest.send(null);
}
var alls;
function luckyall(){
	alls=[];
	luckysearch(1, 24);
}
function luckysearch(n, max){
	xhr(URL_LUCKY+n, function(a){
		var urls=JSON.parse(a.responseText);
		if (urls) {
			alls.push(urls.join(','));
		}
		if (n<max){
			luckysearch(n+1, max);
		}else{
			search(alls.join(','), true);
		}
	});
}
function lucky(){
	var n=1+Math.floor(Math.random()*24);
	xhr(URL_LUCKY+n, function(a){
		var urls=JSON.parse(a.responseText);
		if (urls) {
			search(urls.join(','), true);
		}
	});
}
function clearsearch(){
    var results = document.getElementById('results');
	results.style.display = 'none';
	
	var icons = document.getElementById('icons');
    icons.innerHTML = '';
}

function search(value, clear){
    var q = document.getElementById('q');
    value = value || q.value;
    var qs = value.split(',');
    var icons = document.getElementById('icons');
	if (clear){
		icons.innerHTML = '';
	}
    for (var i = 0, len = qs.length; i < len; i++) {
        var d = qs[i];
        
        var icon = document.createElement('div');
        icon.className = 'icon white';
        
        var link = document.createElement('a');
		link.href = URL + d;
        
        var img = document.createElement('img');
        img.title = d;
        img.src = URL + d;
        link.appendChild(img);
		icon.appendChild(link);
		
		var br = document.createElement('br');
		icon.appendChild(br);
		
		var linktitle = document.createElement('a');
		var url = fixurl(d); 
		var domain = getdomain(url);
		linktitle.href = url;
		linktitle.innerText = domain;
		icon.appendChild(linktitle);
        
        icons.appendChild(icon);
    }
    
    q.value = value;
    
    var results = document.getElementById('results');
    results.style.display = 'inline';
}

function getdomain(url){
    return url.split(/\/|\?/)[2].replace('www.','');
}

function fixurl(d){
	var url = d;
	if (!(/^http/.test(d))){
		url = 'http://'+url;
	}
	if (d.indexOf('.') < 1) {
		url += '.com';
	}
	return url;
}

window.onload=init;