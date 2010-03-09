var URL = 'http://pageicons.appspot.com/favicons?url=';
var URL_LUCKY = 'http://pageicons.appspot.com/lucky?p=';
//'http://www.alexa.com/topsites/global;'
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
	oXMLHttpRequest.onreadystatechange = function(){
		if (this.readyState == XMLHttpRequest.DONE) {
			callback();
		}
	};
	oXMLHttpRequest.send(null);
}

function lucky(){
	var n=Math.floor(Math.random()*25);
	xhr(URL_LUCKY+n, function(a){
		var urls=[],m = /<h2><a\shref="([^"]+)">([^<]*)<\/a><\/h2>/.exec(a.responseText);
		for (var i=0,  len=m.length; i<len; i++){
			urls.push(m[i][2]);
		}
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
        icons.appendChild(icon);
    }
    
    q.value = value;
    
    var results = document.getElementById('results');
    results.style.display = 'inline';
}

window.onload=init;