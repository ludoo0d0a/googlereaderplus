/**
 * @author Valente
 */
window.GRP={
	VERSION: "2.7.1",
	setVersion:function(text){
		var ver = document.getElementById('version');
		ver.innerHTML = (text||'') + GRP.VERSION;
	}
};
