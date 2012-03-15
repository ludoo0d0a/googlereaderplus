/**
 * @author Valente
 */
window.GRP={
	VERSION: "4.1.0",
	beta:1,
	setVersion:function(text){
		var ver = document.getElementById('version');
		ver.innerHTML = (text||'') + GRP.VERSION;
	},
	getVersion:function(){
		return GRP.VERSION+((GRP.beta)?('beta'+GRP.beta):'');
	}
};
