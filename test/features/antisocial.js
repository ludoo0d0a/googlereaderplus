/**
 * antisocial
 * @param {Object} prefs
 * @param {Object} langs
 * @param {Object} ID
 * @param {Object} SL
 * @param {Object} lang
 */
GRP.antisocial = function(prefs, langs, ID, SL, lang){
   /* addReaderMenuItem(SL.antisocial||'Antisocial', function(){
        checkAntisocial(prefs);
    });
    */
	
    var antisocial = getBoolean(GM_getValue('antisocial', false));
    var askantisocial = getBoolean(prefs.antisocial_status);
    console.log('getValue antisocial: ' + antisocial + ' ' + (typeof antisocial));
    console.log('askantisocial: ' + askantisocial + ' ' + (typeof askantisocial));
    if (askantisocial !== antisocial) {
        var mode = (askantisocial) ? 'antisocial' : 'social';
        var c = confirm('You will enter in ' + mode + ' mode. Page will be reloaded. Are you sure?');
		if (c) {
			GM_setValue('antisocial', askantisocial);
			console.log('enter in ' + mode + '   javascript:antisocial(' + askantisocial + ')');
			window.location.href = "javascript:antisocial('" + askantisocial + "')";
		}
    }
};
