/**
 * @author Valente
 */
var grp_info = function(prefs){

	function init(){
		var sysinfo = function(e){
			infoExtensions();
			infoVersion();
		};
		
		var footer = document.getElementById('viewer-footer');
		var buttonf = getLastElementMatchingClassName(footer, 'div', 'goog-button');
		addButton(buttonf, 'info', 'Get system information', sysinfo, 1);
		
		var header = document.getElementById('viewer-top-controls');
		var buttonh = getLastElementMatchingClassName(header, 'div', 'goog-button');
		addButton(buttonh, 'info', 'Get system information', sysinfo, 1);
	}
		
    function infoExtensions(){
        GM_xmlhttpRequest(
        {
            method: 'GET',
            url: 'chrome://extensions',
            onload: function(res){
                var extensions = parseExtensions(xhr.responseXML);
				console.log(extensions);
                /*myport.postMessage(
                {
                    message: "infoextensions",
                    extensions: extensions
                });*/
            },
			onerror: function(res){
				console.log(res);
				alert('error on getting extensions information');
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
                /*myport.postMessage(
                {
                    message: "infoversion",
                    version: version
                });*/
				
            },
			onerror: function(res){
				console.log(res);
				alert('error on getting version information');
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
