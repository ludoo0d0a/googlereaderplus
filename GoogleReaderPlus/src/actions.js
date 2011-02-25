/**
 * Actions 
 * @version  0.1
 * @date 2011
 * @author LudoO
 *
 * Actions button icons only
 *
 */
GRP.actions = function(prefs, langs, ID, SL, lang){
	
	function inject(){
		var code = '', all = ['m', 'n', 'o', 'p', 'q', 'r', 's'];
		foreach(all, function(c){
			code += c + "q.Tf.Tb='&nbsp;';" + c + "q.Sf.Tb='&nbsp;';";
		});
		GM_addjs(code, true, 'grp-shortuts');
	}
	inject();
	
	var targets = [ 'star', 'like', 'entry-link-action-title','entry-tagging-action-title',
			'broadcast-with-note link','broadcast',
			'email link','read-state','grp-btn' ];
			
	function changeActions(el, entry, mode){
		var ea =getFirstElementByClassName(entry,'entry-actions');
		if (ea){
			foreach(targets,function(target){
				var n=[ea], cls = target.split(' ');
				foreach(cls, function(c){
					if (n) {
						n = n[0].getElementsByClassName(c);
					}
				});
				foreach(n, function(node){
					if (node) {
						node.innerHTML = '&nbsp;';
					}
				});
			});
		}
	}
	registerFeature(changeActions, ID);

};
