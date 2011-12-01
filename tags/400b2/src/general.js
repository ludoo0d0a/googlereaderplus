/**
 * General configuration
 * @version  0.1
 * @date 2010
 *
 */
GRP.general = function(prefs, langs, ID, SL, lang) {
	function getPref(id){
		return prefs[ID+'_'+id];
	}
	if (getPref('secure')) {
		if (/^http\:/.test(window.location.href)) {
			window.location.href = window.location.href.replace(/^http\:/, 'https:');
		}
	}
	
};
