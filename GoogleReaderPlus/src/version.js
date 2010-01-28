/**
 * @author Valente
 */
window.GRP={
	VERSION: "2.7.3",
	setVersion:function(text){
		var ver = document.getElementById('version');
		ver.innerHTML = (text||'') + GRP.VERSION;
	}
};
