/**
 * Linkedin
 * using shared API
 *  
 *  http://developer.linkedin.com/community/apis
 *  http://developer.linkedin.com/docs/DOC-1008
 */
GRP.linkedin = function(prefs, langs, ID, SL, lang){
    var api = {
        shortcut:'tweet',
		button: openPopup
    };
	
	function openPopup(o){
		var tplUrl = 'http://www.linkedin.com/shareArticle?summary={desc}&url={url}&source=9+to+5+Mac+Apple+Intelligence&title={title}&mini=true';
		var WINDOW_STYLE = 'scrollbars=yes,width=475,height=300,top=175,left=75,' +
		'status=yes,resizable=yes';
		var FORM_NAME = 'bloggerForm';
		o=o||{};
		var url = fillTpl(tplUrl,o);
		
		window.open(url, FORM_NAME, WINDOW_STYLE);
	}
	
    GRP.api_micro(prefs, langs, ID, SL, lang, api);
};
