/**
 * @author Valente
 */
var grp_info = function(prefs){
	
	var myport, status, report = {};
	
	function init(){
		/*var footer = document.getElementById('viewer-footer');
		var buttonf = getLastElementMatchingClassName(footer, 'div', 'goog-button');
		addButton(buttonf, 'info', 'Get system information', sysinfo, 1);
		
		var header = document.getElementById('viewer-top-controls');
		var buttonh = getLastElementMatchingClassName(header, 'div', 'goog-button');
		addButton(buttonh, 'info', 'Get system information', sysinfo, 1);
		*/
		
		myport = chrome.extension.connect( {
			name : "googlereaderplus"
		});
	}
	
	function sendreport(){
		if (status == 3) {
			//status ==3 -> report complete
			myport.postMessage(
			{
				message: "info",
				report: report
			});
		}
	}
	
 	function sysinfo(){
		status=0;
		infoNavigator();
		infoExtensions();
		infoVersion();
	}
	
	function infoNavigator(){
		var n = window.navigator;
		var w = {};
		for(var p in n) {
			if (typeof n[p] === "string" || typeof n[p] === "boolean"){
				w[p]=n[p];
			}
		}
		console.log(w);
		report.navigator = w;
		sendreport(++status);
	}
		
    function infoExtensions(){
        GM_xmlhttpRequest(
        {
            method: 'GET',
            url: 'chrome://extensions',
            onload: function(res){
                var extensions = parseExtensions(xhr.responseXML);
				console.log(extensions);
				report.extensions = extensions;
				sendreport(++status);
            },
			onerror: function(res){
				console.log(res);
				report.extensions = {};
				sendreport(++status);
			}
        });
    }
    
    function infoVersion(){
        GM_xmlhttpRequest(
        {
            method: 'GET',
            url: 'about:version',
            onload: function(res){
                var version = parseVersion(xhr.responseXML);
				console.log(version);
				report.version = version;
				sendreport(++status);
            },
			onerror: function(res){
				console.log(res);
				report.version = {};
				sendreport(++status);
			}
        });
    }
    
    function parseExtensions(xml){
        var extensions = {};
        Array.forEach(xml.getElementsByClassName('extension'), function(e){
            var data = 
            {
                name: getElementValue("./span[@jscontent='name']", e),
                version: getElementValue("./span[@jscontent='version']", e),
                description: getElementValue("./span[@jscontent='description']", e),
                id: getElementValue("./span[@jscontent='id']", e)
            };
            extensions[data.name] = data;
        });
        return extensions;
    }
    
    function parseVersion(xml){
        var version = {};
        var t = xml.getElementsById('inner');
        Array.forEach(t.getElementsByTagName('tr'), function(row){
            var name, value, i = 0, cell = {};
            Array.forEach(row.getElementsByTagName('td'), function(c){
                if (i === 0) {
                    name = c.innerText;
                } else {
                    value = c.innerText;
                }
                i++;
            });
            if (name) {
                version[name] = value;
            }
        });
        return version;
    }
	
	init();
};
