/**
 *  Mode hybrid = mode beween card and list
 *  list with bigger row + picture 
 */
GRP.hybrid = function(prefs, langs, ID, SL, lang){
	var btnMode, mycss='';
	var css = '.entry:not(#current-entry) .card{max-height:120px;}';
    css += '.entry-main{padding-left:140px;min-height:60px;}';
    css += '.entry-body img.entry-icon-preview{position:absolute;top:0;left:0px;max-width:130px;max-height:130px}';
    css += '.card-actions{display:none;}';
    css += '.grp-diaporama > .jfk-button-img{-webkit-transform:rotate(180deg);}';
    css += '#current-entry .card-actions{display:block;}';
	    
	function hybridEntry(el, entry, mode){
		var img = findImage({el:entry}, function(img){
			if (img){
				addClass(img, 'entry-icon-preview');
			}
		});
	}
	
	function render(){
		btnMode = dh('stream-view-options-container', 'div', {
			position:'first',
			role:'button', 
			cls:'goog-inline-block jfk-button jfk-button-standard jfk-button-narrow jfk-button-collapse-right jfk-button-clear-outline',
			style:'-webkit-user-select: none; ',
			title:'Hybrid mode',
			html: '<img src="/reader/ui/138769644-magnifying_glass.png" style="width: 21px; height: 21px; " class="jfk-button-img">'
		},{click:function(e){
			toggleTheme();
		}});
	}
	
    function toggleTheme(){
    	mycss= (mycss)?'':css;
    	GM_addStyle(mycss, 'rps_'+ID);
    	addClass(btnMode, 'jfk-button-checked', mycss);
    }
    
    render();
    
	registerFeature(hybridEntry, ID, {
    	onlistviewtitle:false
    });
};