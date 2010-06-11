//My theme
//Customizable theme with background picture
//
GRP.mytheme = function(prefs){
    var urlgmail = window.location.protocol + '//mail.google.com/mail/';

	var desk_headers = [
		urlgmail + 'images/2/5/desk/header_bg_ruler.png',
		urlgmail + 'images/2/5/desk/header_bg_sharpenerenvelope.png',
		urlgmail + 'images/2/5/desk/header_bg_ruler.png',
		urlgmail + 'images/2/5/desk/header_bg_tape.png',
		urlgmail + 'images/2/5/desk/header_bg_vase.png',
		urlgmail + 'images/2/5/desk/header_bg_padpins.png',
		urlgmail + 'images/2/5/desk/logo_splatter.png'
	];
	var hr1 = chooseimage(desk_headers);
	var hl1 = chooseimage(desk_headers);
	while (hl1==hr1){
		//TODO : take another item
		hl1=chooseimage(desk_headers);
	}
	
	var desk_footers = [
		urlgmail + 'images/2/5/desk/footer_bg_applecalendar1.png',
		urlgmail + 'images/2/5/desk/footer_bg_cdclips1.png',
		urlgmail + 'images/2/5/desk/footer_bg_teacookie.png',
		urlgmail + 'images/2/5/desk/footer_bg_postcard.png',
		urlgmail + 'images/2/5/desk/footer_bg_pencilladybug.png',
		urlgmail + 'images/2/5/desk/footer_bg_envelopebusstop1.png',
		urlgmail + 'images/2/5/desk/footer_bg_calculatorclips1.png',
		urlgmail + 'images/2/5/desk/footer_bg_photos1.png',
		urlgmail + 'images/2/5/desk/footer_bg_paperclips.png',
		urlgmail + 'images/2/5/desk/footer_bg_cupring.png'
	];
	var fr1 = chooseimage(desk_footers);
	var fl1 = chooseimage(desk_footers);
	while (fl1==fr1){
		//TODO : take another item
		fl1=chooseimage(desk_footers);
	}

    var gmailthemes = {
        gmail_coldshower: {
            bg: '#99b1c3',
            color: '#333944',
            image: urlgmail + 'images/2/5/coldshower/blue-tile.png',
            repeat: true
        },
		gmail_mountains: {
            bg: '#6D6C68',
            color: '#fff',
            /*
			headers:{
			sun:'https://mail.google.com/mail/images/2/5/mountains/sun/sunday.jpg',
			fri:'https://mail.google.com/mail/images/2/5/mountains/fri/friday1.jpg'
			},*/
			image: urlgmail+'images/2/5/mountains/fri/friday1.jpg',
            repeat: false
        },	
		gmail_planets: {
            bg: '#0c1319',
            color: '#fff',
			h: urlgmail+'images/2/5/planets/sun/sun.jpg',
			image: urlgmail+'images/2/5/planets/base/star_tile.gif',
            repeat: true
        },	
		gmail_beach: {
            bg: '#fff',
            color: '#fff',
			rh: urlgmail+ 'images/2/5/beach/10am/headertile_bg.jpg',
			h: urlgmail+ 'images/2/5/beach/10am/header_bg.jpg',
			f: urlgmail+'images/2/5/beach/10am/footer_bg.jpg',
			image:  urlgmail+'images/2/5/beach/noon/canvastile_bg.jpg',
            repeat: true
        },	
        gmail_lapinscretins1: {
            bg: '#3275AC',
            color: '#fff',
            image: urlgmail + 'images/2/5/lapinscretins/rabbids_header1_final.png',
            repeat: false
        },
        gmail_lapinscretins2: {
            bg: '#31669A',
            color: '#fff',
            image: urlgmail + 'images/2/5/lapinscretins/rabbids_header2_final.png',
            repeat: false
        },
        gmail_lapinscretins3: {
            bg: '#B7E0E4',
            color: '#fff',
            image: urlgmail + 'images/2/5/lapinscretins/rabbids_header3_final.png',
            repeat: false
        },
		gmail_steel: {
            bg: '#fff',
            color: '#fff',
			rh: urlgmail+ 'images/2/5/steel/bg-main.png'
        },	
		gmail_assasinscreed2: {
            bg: '#000',
            color: '#fff',
            image: urlgmail + 'images/2/5/assassinscreed2/ac2_header2_final.png',
            repeat: false
        },
		gmail_turf: {
            bg: '#274A14',
            color: '#fff',
            image: urlgmail + 'images/2/5/turf/header_tile.jpg',
            repeat: false
        },
		gmail_highscore: {
            bg: '#47B3DA',
            color: '#fff',
            h: urlgmail + 'images/2/5/highscore/day_background.png',
			f: urlgmail + 'images/2/5/highscore/day_hills_footer.png',
            repeat: false
        },
		gmail_orcasisland: {
            bg: '#6E6965',
            color: '#fff',
            h: urlgmail + 'images/2/5/orcasisland/sunday_02.jpg',
            repeat: false
        },
		gmail_cherryblossom: {
            bg: '#fff',
            color: '#fff',
            image: urlgmail + 'images/2/5/cherry/bg-main.png',
            repeat: true
        },
		gmail_nightshade: {
            bg: '#000',
            color: '#fff',
            rh: urlgmail + 'images/2/5/nightshade/ns_bg.gif'
        },
		gmail_marina: {
            bg: '#000',
            color: '#fff',
            rh: urlgmail + 'images/2/5/medsoft/bg-main.gif'
        },
		gmail_dusk: {
            bg: '#000',
            color: '#fff',
            rh: urlgmail + 'images/2/5/medred/bg-main.gif'
        },
		gmail_sunset: {
            bg: '#000',
            color: '#fff',
            rh: urlgmail + 'images/2/5/darkwarm/bg-main.png'
        },
		gmail_shiny: {
            bg: '#000',
            color: '#fff',
            rh: urlgmail + 'images/2/5/shiny/canvastile_bg2.jpg'
        },
		gmail_desk: {
            bg: '#000',
            color: '#fff',
/* other images
# images/2/5/desk/logo_splatter_pencil.png
 */			
            image: urlgmail + 'images/2/5/desk/canvas_bg.jpg',
			hr: hr1,	
			hl: hl1,
			fl: fl1,
			fr: fr1
        },

		/* editors_picks */
"5478752472500006610":"http://lh4.ggpht.com/_fxkujw2mA9U/TAhwWJen7tI/AAAAAAAAAIY/QNQcTiWN9l8/","5478752827007585634":"http://lh4.ggpht.com/_fxkujw2mA9U/TAhwqyH0TWI/AAAAAAAAAI8/APTtF3_y2cI/","5478752842710333378":"http://lh4.ggpht.com/_fxkujw2mA9U/TAhwrsnpN8I/AAAAAAAAAJE/ym-TNB-ipDU/","5478753114195988130":"http://lh5.ggpht.com/_fxkujw2mA9U/TAhw7f-3jqI/AAAAAAAAAJc/YGO5_ldyj-Y/","5478753075316627266":"http://lh4.ggpht.com/_fxkujw2mA9U/TAhw5PJTl0I/AAAAAAAAAJU/rS6YK1WW8-A/","5478753460334726146":"http://lh4.ggpht.com/_fxkujw2mA9U/TAhxPpcxjAI/AAAAAAAAAJs/URghLUy99YA/","5478752501519603442":"http://lh3.ggpht.com/_fxkujw2mA9U/TAhwX1lb1vI/AAAAAAAAAIk/Ksf6-SnvVPo/","5478753089633816370":"http://lh3.ggpht.com/_fxkujw2mA9U/TAhw6EeyjzI/AAAAAAAAAJY/BDvPIiaoi2U/","5478752819223180210":"http://lh5.ggpht.com/_fxkujw2mA9U/TAhwqVH3s7I/AAAAAAAAAI0/xhmZlouBW6Q/","5478753117486370930":"http://lh5.ggpht.com/_fxkujw2mA9U/TAhw7sPW0HI/AAAAAAAAAJg/wiRaz9nNtUw/","5478752835087677362":"http://lh6.ggpht.com/_fxkujw2mA9U/TAhwrQOQt7I/AAAAAAAAAJA/H6GQMElt9Jg/","5478752493997894098":"http://lh5.ggpht.com/_fxkujw2mA9U/TAhwXZkHqdI/AAAAAAAAAIg/PR_JvDoSUUo/","5478752822146891810":"http://lh3.ggpht.com/_fxkujw2mA9U/TAhwqgA8ACI/AAAAAAAAAI4/mBFPhy-c3Dg/","5478753058608504226":"http://lh3.ggpht.com/_fxkujw2mA9U/TAhw4Q5x3aI/AAAAAAAAAJQ/CnTyXr3Q8uQ/","5480987905094465154":"http://lh4.ggpht.com/_fxkujw2mA9U/TBBhdc1eNoI/AAAAAAAAAPg/VL7O_YocFWY/","5480987906200029490":"http://lh6.ggpht.com/_fxkujw2mA9U/TBBhdg9DyTI/AAAAAAAAAPk/1jXNNml5Fvs/","5480998621006856338":"http://lh6.ggpht.com/_fxkujw2mA9U/TBBrNMuFAJI/AAAAAAAAARU/52PQOquzhC8/","5480987916726984130":"http://lh5.ggpht.com/_fxkujw2mA9U/TBBheIK4XcI/AAAAAAAAAPo/BR4cS1ib3xM/","5480987917979934498":"http://lh3.ggpht.com/_fxkujw2mA9U/TBBheM1m3yI/AAAAAAAAAPs/uKFlfn704Q8/","5480987925727076290":"http://lh5.ggpht.com/_fxkujw2mA9U/TBBhepsq38I/AAAAAAAAAPw/Ida0LeDX0fE/","5480988005113749330":"http://lh5.ggpht.com/_fxkujw2mA9U/TBBhjRb7X1I/AAAAAAAAAP4/TUTmK3R2KAE/","5480988012864676114":"http://lh4.ggpht.com/_fxkujw2mA9U/TBBhjuT5IRI/AAAAAAAAAP8/3zSixI6EFwM/","5478753466167683746":"http://lh5.ggpht.com/_fxkujw2mA9U/TAhxP_LdaqI/AAAAAAAAAJw/D3WLPN6-uhk/","5478753483552159554":"http://lh3.ggpht.com/_fxkujw2mA9U/TAhxQ_8Pd0I/AAAAAAAAAJ0/IuvA0kBkziw/","5478755559461692018":"http://lh5.ggpht.com/_fxkujw2mA9U/TAhzJ1TpInI/AAAAAAAAAL4/SRH8g8xRsRE/","5478755572322259650":"http://lh4.ggpht.com/_fxkujw2mA9U/TAhzKlN10sI/AAAAAAAAAL8/B-akepWsw9Q/","5478753799989312658":"http://lh5.ggpht.com/_fxkujw2mA9U/TAhxjawvPJI/AAAAAAAAAKE/Uo0oCE22FnM/","5478753813630017442":"http://lh4.ggpht.com/_fxkujw2mA9U/TAhxkNk736I/AAAAAAAAAKI/cbq956vqL7o/","5478753819961634386":"http://lh3.ggpht.com/_fxkujw2mA9U/TAhxklKgrlI/AAAAAAAAAKM/a95O10f-NEg/","5478752511525657170":"http://lh6.ggpht.com/_fxkujw2mA9U/TAhwYa3EGlI/AAAAAAAAAIo/Wi7XY2Bxgrc/","5478753832267149810":"http://lh5.ggpht.com/_fxkujw2mA9U/TAhxlTAX8fI/AAAAAAAAAKQ/pfQT3foJPRs/","5480997862386069170":"http://lh3.ggpht.com/_fxkujw2mA9U/TBBqhCoybrI/AAAAAAAAAQs/IRrOw-q56ig/","5480997893054118498":"http://lh3.ggpht.com/_fxkujw2mA9U/TBBqi04numI/AAAAAAAAAQw/dEVESx_pvBs/","5480998186992651026":"http://lh5.ggpht.com/_fxkujw2mA9U/TBBqz75ByxI/AAAAAAAAARE/CAq1-arltkE/","5478769425598313058":"http://lh6.ggpht.com/_fxkujw2mA9U/TAh_w8sO8mI/AAAAAAAAAMs/E5kjeXUIQOc/","5478769428183578882":"http://lh3.ggpht.com/_fxkujw2mA9U/TAh_xGUm-QI/AAAAAAAAAMw/TlYQUgOsAOs/","5478769428473291154":"http://lh4.ggpht.com/_fxkujw2mA9U/TAh_xHZroZI/AAAAAAAAAM0/fZ8ZGI4gEHs/","5478769530404012082":"http://lh4.ggpht.com/_fxkujw2mA9U/TAh_3DH3ADI/AAAAAAAAAM4/09PbIsWavv4/","5478769535168997586":"http://lh4.ggpht.com/_fxkujw2mA9U/TAh_3U366NI/AAAAAAAAAM8/fUctF4T897M/","5480596593254567266":"http://lh6.ggpht.com/_fxkujw2mA9U/TA79kGonjWI/AAAAAAAAAO8/wgt1U7ogm0k/",
/* public_gallery */
"5468005866288280370":"http://lh5.ggpht.com/_W6mjt7mDgno/S-JCXVndczI/AAAAAAAA3y0/fQWo9r8k0ks/","5480525382039743330":"http://lh4.ggpht.com/_3rqotzCU1sY/TA68zEL9q2I/AAAAAAAAA80/cZhz0pxQSM0/","5469661666160577106":"http://lh5.ggpht.com/_Z4rK3Ss0bFg/S-gkTk0SilI/AAAAAAAAADw/DDTeQLjTfWA/","5464847589870262818":"http://lh6.ggpht.com/_rfAz5DWHZYs/S9cJ7dHd2iI/AAAAAAAAcg8/kx3xyB7P6fc/","5468620555541748930":"http://lh3.ggpht.com/_0YSlK3HfZDQ/S-Rxa9h3HMI/AAAAAAAAXiI/fStJVANexYc/","5465726438613138322":"http://lh6.ggpht.com/_W6mjt7mDgno/S9opPLz_O5I/AAAAAAAA3yw/yYZekAKroI4/","5480525372525642866":"http://lh5.ggpht.com/_3rqotzCU1sY/TA68ygvoBHI/AAAAAAAAA9c/k7jhmLYmw78/","5468095309182211138":"http://lh6.ggpht.com/__75Y1wEu2H0/S-KTtmXJFEI/AAAAAAAAAFA/JzlqhzF7Vt4/","5467968585789456354":"http://lh5.ggpht.com/_aIZoxdfNfNk/S-IgdU75v-I/AAAAAAAAB7A/jL1VMOt7DgM/","5467968606322662898":"http://lh6.ggpht.com/_aIZoxdfNfNk/S-IgehbZnfI/AAAAAAAAB7E/v_h-Pq9AqeU/","5394978350593597026":"http://lh5.ggpht.com/_A5ssqXnsoMw/St7QOd4N3mI/AAAAAAAAE98/xKvtFXjUN_U/","5468030760630111442":"http://lh4.ggpht.com/_daORpSs2nxc/S-JZAYRETNI/AAAAAAAAAFA/kuOmpgEENNU/","5461268259373019506":"http://lh5.ggpht.com/_KFSyWTTuLjA/S8pSi_8LcXI/AAAAAAAAWTA/Ne49ieWVSV8/","5418083111186176690":"http://lh6.ggpht.com/_unJLPNmBC1U/SzDl4iXLmrI/AAAAAAABWv4/kkFFBMpXvdM/","5465064542962429986":"http://lh6.ggpht.com/_3UYvaY5uN7E/S9fPPyXbsCI/AAAAAAAAAbc/w9YyUMXol5k/","5465267981519769410":"http://lh3.ggpht.com/_Z6STI8lIz68/S9iIReDNT0I/AAAAAAAAVn8/1VWscVg0VHI/","5464637264209516562":"http://lh4.ggpht.com/_yjAEkPM8eKE/S9ZKo4-SGBI/AAAAAAAAExM/Yolg3yv48ZE/","5469816275349772930":"http://lh4.ggpht.com/_aIZoxdfNfNk/S-iw7A7fmoI/AAAAAAAAB7I/uX8etH_Zh8s/","5405276903498929458":"http://lh5.ggpht.com/_KFSyWTTuLjA/SwNmtJGtVTI/AAAAAAAAWS8/m3yzK6SE-9k/","5464602659331416274":"http://lh3.ggpht.com/_mlwpgEPyjKM/S9YrKnwaoNI/AAAAAAAAL8o/qERJYeK9SOY/","5468081125425097026":"http://lh5.ggpht.com/_LgRsf0mgy_M/S-KGz_v7KUI/AAAAAAAABNU/GYTn-LSj3lw/","5480525380508846738":"http://lh4.ggpht.com/_3rqotzCU1sY/TA68y-e-CpI/AAAAAAAAA8g/Fb18jqd2T18/","5465064395281172466":"http://lh6.ggpht.com/_3UYvaY5uN7E/S9fPHMNeh_I/AAAAAAAAAbY/teuqnGf7uT8/","5427875955486466754":"http://lh3.ggpht.com/_K29ox9DWiaM/S1OwbGOnosI/AAAAAAAASqs/Wg5OAoix0tk/","5480525385832476034":"http://lh6.ggpht.com/_3rqotzCU1sY/TA68zSUOLYI/AAAAAAAAA9I/JpGyEL5lx9s/","5464721817854022450":"http://lh5.ggpht.com/_7V85eCJY_fg/S9aXij2EEzI/AAAAAAAAMsc/rUXq7chzQZo/","5468499236979512002":"http://lh6.ggpht.com/_RXIvzqFA_h8/S-QDFSqoksI/AAAAAAAABss/q8Hs_Y6Ojco/","5465811371224046274":"http://lh3.ggpht.com/_7SB5-VS6jYo/S9p2e6cZmsI/AAAAAAAAAPk/CdITAmRcDNU/","5468499251879550482":"http://lh6.ggpht.com/_RXIvzqFA_h8/S-QDGKLFHhI/AAAAAAAABso/mMXhQIO_rIY/","5468011240643552594":"http://lh5.ggpht.com/_q82cg6OMtCs/S-JHQKpm5VI/AAAAAAAAQDs/eQKsBn336_w/","5464721917635140242":"http://lh3.ggpht.com/_7V85eCJY_fg/S9aXoXjvGpI/AAAAAAAAMsg/8LweEHXvC8E/","5465963404565598994":"http://lh3.ggpht.com/_4HzkBj4VmKw/S9sAwaxq0xI/AAAAAAAAy3s/595Du9f3xbQ/","5464886839716494226":"http://lh6.ggpht.com/_as1xi-WX02U/S9ctoGMCO5I/AAAAAAAAC2o/G348G26qKR0/","5464644514748019778":"http://lh5.ggpht.com/_dAaguGcsRfA/S9ZRO7VXtEI/AAAAAAAAENA/jQ1y0m7u7FE/","5465825398133839090":"http://lh3.ggpht.com/_7SB5-VS6jYo/S9qDPYwTVPI/AAAAAAAAANo/39f76y32uiA/","5467921205742594898":"http://lh3.ggpht.com/_aDwLqnCx5xE/S-H1Xcgc61I/AAAAAAAACAQ/zmy2_wM2j4Y/","5436863789388960962":"http://lh5.ggpht.com/_uqT1DECwpD8/S3Oez4q2lMI/AAAAAAAAO6c/aGrJoPQEzbY/","5464721845849026242":"http://lh4.ggpht.com/_7V85eCJY_fg/S9aXkMIl7sI/AAAAAAAAMsY/hbwwd2lB1ns/","5467928286294729906":"http://lh4.ggpht.com/_6NwUsKnkxdc/S-H7zlnoZLI/AAAAAAAAJ2Y/qYD_7yeqVOw/","5469782237294118322":"http://lh3.ggpht.com/_iGI-XCxGLew/S-iR9vSoRbI/AAAAAAAABLQ/n5Ix1uZx1qc/","5463830940035733394":"http://lh4.ggpht.com/_1rL3G0Y32aQ/S9NtSpWeV5I/AAAAAAAAJd4/wJdXRCWA-_c/","5470258900410180098":"http://lh5.ggpht.com/_n8uHgnu6KsU/S-pDfLxeIgI/AAAAAAAAAZY/uPP45av8Tls/","5467976005541355106":"http://lh5.ggpht.com/_loGyjar4MMI/S-InNNqm3mI/AAAAAAAAB9s/XKcK0UhQhHk/","5467975931636282290":"http://lh6.ggpht.com/_loGyjar4MMI/S-InI6WQ87I/AAAAAAAACEs/WaRxi6D4WCs/","5467936023478442338":"http://lh4.ggpht.com/_aDwLqnCx5xE/S-IC183-mWI/AAAAAAAACAU/x5M3XSm-z38/","5468630655462131890":"http://lh5.ggpht.com/_vegCfczOoKA/S-R6m2qhyLI/AAAAAAAAIJg/VbgtlWc1YVs/","5468499216650860930":"http://lh6.ggpht.com/_RXIvzqFA_h8/S-QDEG75-YI/AAAAAAAABsw/qbL5p3ubU8U/","5464708695072547106":"http://lh6.ggpht.com/_s60pF2QNbck/S9aLmtrJoSI/AAAAAAAAeOo/cPMni36CmMk/","5464721937652197202":"http://lh4.ggpht.com/_7V85eCJY_fg/S9aXpiILJ1I/AAAAAAAAMsU/m2f6UsfQfEA/","5464593346215231826":"http://lh4.ggpht.com/_4HzkBj4VmKw/S9YishsfQVI/AAAAAAAAy3w/2Hg6_XEPri4/"
        
    };
        
    var css = ''; //GM_getValue('theme_mytheme');
    if (css) {
        GM_addStyle(css, 'rps_mytheme');
    }
    else {
        loadCss('skin/css/mytheme.css', function(css){
            stylish(css);
        }, {
            compact: true,
            clean: false
        });
    }
	
	function chooseimage(imgs){
		return imgs[Math.round(Math.random() * imgs.length)];
	}
	
    function stylish(tplCss){
        var o = {
            image: prefs.theme_url || '',
            color: prefs.theme_color || '#aaa',
            bg: prefs.theme_bg || '#ffc',
            repeat: prefs.theme_repeat || false
        };
        if (prefs.theme_gmailtheme && gmailthemes && gmailthemes[prefs.theme_gmailtheme]) {
            console.log(prefs.theme_gmailtheme);
            o = gmailthemes[prefs.theme_gmailtheme];
            if (typeof o === 'string') {
                o = {
                    bg: '#fff',
                    color: '#fff',
                    image: o,
                    repeat: false
                };
            }
        }
        
        var css = fillTpl(tplCss, o);
		
        //same theme for repeat / norepeat
        if (o.repeat) {
            css = cleancss(css, 'bgr');
        }else{
			css = cleancss(css, 'bg');
		}		
		
		//hr : header right
		//h: header
		//rh : repeated header
		//f: footer
		//fr: footer right
		//fl: footer left
		var items = ['rh', 'h', 'hr', 'hl', 'f', 'fr', 'fl'];
		var html ='';
		 
		foreach(items, function(a){
			html+='<div id="rp-'+a+'"></div>';
			if (o[a]) {
				css = cleancss(css, a);
			}
		});
		var c = dh(document.body, 'div', {id:'rp-cs', html:html});

        GM_addStyle(css, 'rps_mytheme');
        //cache css
        GM_setValue('theme_mytheme', css);
		
		if (o.resize) {
			fireResize();
		}
    }
	
	function cleancss(css, id){
		return css.replace('/*--'+id+'>--*//*', '').replace('*//*--<'+id+'--*/', '');
	}
};
