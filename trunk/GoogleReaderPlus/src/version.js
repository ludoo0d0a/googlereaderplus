/**
 * @author Valente
 */
window.GRP={
	VERSION: "3.3.0",
	setVersion:function(text){
		var ver = document.getElementById('version');
		ver.innerHTML = (text||'') + GRP.VERSION;
	}
};
