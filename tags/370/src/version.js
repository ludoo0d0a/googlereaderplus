/**
 * @author Valente
 */
window.GRP={
	VERSION: "3.7.0",
	//beta:5,
	setVersion:function(text){
		var ver = document.getElementById('version');
		ver.innerHTML = (text||'') + GRP.VERSION;
	}
};