/**
 * General configuration
 * @version  0.1
 * @date 2010
 *
 */
GRP.general = function(prefs, langs){
	if (prefs.general_secure){
		if (/^http\:/.test(window.location.href)) {
			window.location.href=window.location.href.replace(/^http\:/, 'https:');
		}
	}
};