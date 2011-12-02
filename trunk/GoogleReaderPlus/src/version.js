/**
 * @author Valente
 */
window.GRP={
	VERSION: "4.0.0",
	beta:3,
	setVersion:function(text){
		var ver = document.getElementById('version');
		ver.innerHTML = (text||'') + GRP.VERSION;
	},
	getVersion:function(){
		return GRP.VERSION+((GRP.beta)?('beta'+GRP.beta):'');
	}
};
