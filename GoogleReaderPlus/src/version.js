/**
 * @author Valente
 */
window.GRP={
	VERSION: "2.8.4",
	setVersion:function(text){
		var ver = document.getElementById('version');
		ver.innerHTML = (text||'') + GRP.VERSION;
	}
};
