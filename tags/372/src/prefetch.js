/**
 * Google Reader Prefetch More
 * @version  0.2.4
 * @date 2010-07-21
 *
 * This script will improve the speed experience.
 * It boosts the number of articles that prefetched on the Google Reader's expanded view.
 *
 * Original author :
 * ucnv
 * http://userscripts.org/scripts/show/26383
 */
GRP.prefetch = function(prefs, langs, ID, SL, lang){
	var js = 'var GRP_prefetch={first:'+(prefs.prefetch_first||25)+','+
	'next:'+(prefs.prefetch_next||15)+','+
	'list:'+(prefs.prefetch_list||60)+'};';
	GM_addjs(js, true, '_grp_prefetch');
	
	GM_addjs(chrome.extension.getURL('res/prefetch.js?'+Math.round(Math.random()*999+1)));
};
