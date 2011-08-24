/**
 * @author Valente
 */
window.GRPP={
	VERSION: "2.0.0",
	setVersion:function(text){
		var ver = document.getElementById('version');
		ver.innerHTML = (text||'') + GRP.VERSION;
	}
};
