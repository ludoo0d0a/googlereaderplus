/**
 * Auto scroll entries
 * 
 * @todo : in GUI : start, stop, set steps
 */
GRP.diaporama = function(prefs, langs, ID, SL, lang){
	var DEF={duration:1000,steps:10};
	var btn, ends=0, timeId=0, steps = prefs.diaporama_steps||DEF.steps, duration = prefs.diaporama_duration||DEF.duration;
	
	function render(){
		var css = '.grp-diaporama > .jfk-button-img{-webkit-transform:rotate(90deg);opacity:0.2;}';
		css += '.grp-diaporama.grp-diaporama-start > .jfk-button-img{opacity:1;}';
		GM_addStyle(css, 'rps_'+ID);
		
		btn = dh('item-up-down-buttons', 'div', {
			position:'first',
			role:'button', 
			cls:'goog-inline-block jfk-button jfk-button-standard jfk-button-narrow jfk-button-collapse-right jfk-button-clear-outline grp-diaporama',
			style:'-webkit-user-select: none; ',
			title:'Diaporama',
			html: '<img src="/reader/ui/3978377008-up_arrow.png" style="width: 21px; height: 21px; " class="jfk-button-img">'
		},{click:function(e){
			toggle();
		}});
	}
	
	function updateButton(start){
		addClassIf(btn, 'jfk-button-checked', start);
		addClassIf(btn, 'grp-diaporama-start', start);
	}
	
	function start(){
		steps=Math.abs(steps||DEF.steps);
		duration=Math.max(duration||DEF.duration, DEF.duration);
		timeId = setInterval(function(){
			var moved=true, vs = ELS.vec.scrollTop;
			if (prefs.diaporama_nextentry){
				moved = selectNextEntry();
				if (!moved){
					console.log('autostop');
					stop();
					return;
				}
			}else{
				ELS.vec.scrollTop=ELS.vec.scrollTop+steps;
			}
			if ((ELS.vec.scrollTop === vs)){
				ends++;
				if (ends>5){
					console.log('autostop');
					//End of page = auto stop
					stop();
				}
			}else{
				ends=0;
			}
		},duration);
		updateButton(true);
	}

	function stop(){
		if (timeId){
			clearTimeout(timeId);
			timeId=0;
			updateButton(false);
		}
	}
	
	function toggle(){
		if (timeId){
			stop();
		}else{
			start();
		}
	}
	
	render();
	
};