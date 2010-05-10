//My theme
//Customizable theme with background picture
//
GRP.mytheme = function(prefs){
    var urlgmail = window.location.protocol+'//mail.google.com/mail/';
	
	var gmailthemes = {
		 coldshower:{
            bg: '#99b1c3',
            color: '#333944',
            image: urlgmail+'images/2/5/coldshower/blue-tile.png',
			repeat:true
        },
		lapinscretins1:{
			bg: '#31669b',
            color: '#fff',
            image: urlgmail+'images/2/5/lapinscretins/rabbids_header1_final.png',
			repeat:false
		},
		lapinscretins2:{
			bg: '#31669b',
            color: '#fff',
            image: urlgmail+'images/2/5/lapinscretins/rabbids_header2_final.png',
			repeat:false
		},
		lapinscretins3:{
			bg: '#31669b',
            color: '#fff',
            image: urlgmail+'images/2/5/lapinscretins/rabbids_header3_final.png',
			repeat:false
		}
	};
	
	var css = ''; //GM_getValue('theme_mytheme');
    if (css) {
        GM_addStyle(css, 'rps_mytheme');
    } else {
        loadCss('skin/css/mytheme.css', function(css){
            stylish(css);
        },{compact:true, clean:false});
    }
    function stylish(tplCss){
        var o = {
            image: prefs.theme_url || '',
            color: prefs.theme_color || '#aaa',
            bg: prefs.theme_bg || '#ffc',
			repeat:prefs.theme_repeat || false
        };
		if (prefs.theme_gmailtheme && gmailthemes && gmailthemes[prefs.theme_gmailtheme]){
			console.log(prefs.theme_gmailtheme);
			o = gmailthemes[prefs.theme_gmailtheme];
		}
		console.log(o);
		
        var css = fillTpl(tplCss, o);
		//same theme for repeat / norepeat
		if (o.repeat){
			css=css.replace(/\/\*--bg2>--\*\//, '/*').replace(/\/\*--<bg2--\*\//, '*/');
			css=css.replace('/*--bg1>--*//*', '').replace('*//*--<bg1--*/', '');
		}
		console.log(css);
        GM_addStyle(css, 'rps_mytheme');
        //cache css
        GM_setValue('theme_mytheme', css);
    }
};
