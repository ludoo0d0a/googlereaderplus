/**
 * @author Valente
 */
window.GRP={
	VERSION: "2.8.9",
	setVersion:function(text){
		var ver = document.getElementById('version');
		ver.innerHTML = (text||'') + GRP.VERSION;
	}
};
