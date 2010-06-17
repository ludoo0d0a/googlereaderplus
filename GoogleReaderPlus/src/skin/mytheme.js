//My theme
//Customizable theme with background picture
/*
 to get theme from gmail (desk is a good omplete example):
 - Open gmail
 - selet theme
 - open all css
 - copy paste 2nd line into notepad2 (html,body...)
 - replace } with }\n (transform backslash on)
 - line 5 is the background color .cP{overflow:visible;background-color:#fff}
 - line 9 is the font color : .aB,.e,.cg{color:#0065cc;
 - line 17 : the tiled piture .cP{background:url(...)}
 - line 20-39 5 groups of 4 css classes
 -.wp=hl header left
 -.wq=hr header right
 -.wn=fl footer let
 -.wo=fr footer right
 */
GRP.mytheme = function(prefs){
    var daycodes = ['mon', 'tue', 'thu', 'wed', 'fri', 'sat', 'sun'];
    var fulldaycodes = ['monday', 'tuesday', 'thursday', 'wednesday', 'friday', 'saturday', 'sunday'];
    var daytimes = {
        0: 'midnight',
        2: '2am',
        4: '4am',
        6: '6am',
        8: '8am',
        10: '10am',
        12: 'noon',
        14: '2pm',
        16: '4pm',
        18: '6pm',
        20: '8pm',
        22: '10pm'
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
    
    function stylish(tplCss){
        //rbg : Repeated image background
        //sbg : Single image background
        //hr : header right
        //h: header
        //rh : repeated header
        //f: footer
        //fr: footer right
        //fl: footer left
        //rf: repeated footer
        var items = ['rbg', 'sbg', 'rh', 'h', 'hr', 'hl', 'rf', 'f', 'fr', 'fl'];
        
        var o = {};
        
		var externalthemes = GRP.getExternalThemes();
		
        if (prefs.theme_externaltheme && externalthemes && externalthemes[prefs.theme_externaltheme]) {
            o = externalthemes[prefs.theme_externaltheme];
            o.bg2 = o.bg2 || o.bg;
            if (o.rbg) {
                //repeated image background
                o.bg2 = 'transparent';
            }
            if (typeof o === 'string') {
                o = {
	                color: prefs.theme_color || '#000',
	                bg: prefs.theme_bg || '#fff',
                    hl: o
                };
            }
            
            //current_time
            var current_time = (new Date()).getHours();
            current_time = current_time - current_time % 2;//pair number
            daytime = daytimes[current_time];
            //day
            var day = (new Date()).getDay();
            
            //placeholders replacement
            var holders = {
                day: daycodes[day - 1],
                fullday: fulldaycodes[day - 1],
                time: current_time,
                daytime: daytime,
                daynight: ((current_time < 8 || current_time > 20) ? 'night' : 'day')
            };
            if (o.vars) {
                iterate(o.vars, function(varname, varvalues){
                    var variable = false;
                    //random choice
                    variable = randomselect(varvalues);
                    holders[varname] = variable;
                });
            }
            
            
            //choose random image if multiples...
            iterate(o, function(key, a){
                if (key !== 'vars') {
                    if (isArray(a)) {
                        o[key] = randomselect(a);
                    }
                    else if (typeof a === 'object') {
                        var k = holders[a.selector]; //selector specific (day...)
                        if (k && k !== 'random') {
                            o[key] = o[key][k];
                        }
                        else {
                            delete a.selector;
                            //multiple images per day possible
                            o[key] = randomselect(a);
                        }
                    }
                }
            });
            
            //placeholders replacement
            if (holders) {
                iterate(holders, function(name, value){
                    iterate(o, function(key, a){
                        if (typeof a === 'string') {
                            o[key] = a.replace('{' + name + '}', value);
                        }
                    });
                });
            }
            
        }
        else {
            //custom
            o = {
                color: prefs.theme_color || '#aaa',
                bg: prefs.theme_bg || '#ffc'
            };
			
			foreach(items, function(itm){
	            if (prefs['theme_img'+itm]) {
	                o[itm]=prefs['theme_'+itm];
	            }
	        });
		
        }
        
        var css = fillTpl(tplCss, o);
        
        
        var html = '';
        
        foreach(items, function(itm){
            html += '<div id="rp-' + itm + '"></div>';
            if (o[itm]) {
                css = cleancss(css, itm);
            }
        });
        
        var c = dh(document.body, 'div', {
            id: 'rp-cs',
            html: html
        });
        
        GM_addStyle(css, 'rps_mytheme');
        //cache css
        GM_setValue('theme_mytheme', css);
        
        if (o.resize) {
            fireResize();
        }
    }
    
    function cleancss(css, id){
        return css.replace('/*--' + id + '>--*//*', '').replace('*//*--<' + id + '--*/', '');
    }
};

GRP.getExternalThemes = function(){
     var urlgmail = window.location.protocol + '//mail.google.com/mail/';
	 return {
        gmail_chrome: {
            bg: '#fff',
            color: '#2a5db0'
        },
        gmail_c: {
            bg: '#fff',
            color: '#00c'
        },
        gmail_newblue: {
            bg: '#79b',
            color: '#fff'
        },
        gmail_coldshower: {
            bg: '#99b1c3',
            color: '#333944',
            rbg: urlgmail + 'images/2/5/coldshower/blue-tile.png'
        },
        gmail_steel: {
            bg: '#fff',
            color: '#4263ab',
            rh: urlgmail + 'images/2/5/steel/bg-main.png'
        },
        gmail_lightbright: {
            bg: '#fff',
            color: '#222',
            rh: urlgmail + 'images/2/5/lightbright/bg-main.png'
        },
        gmail_greensky: {
            bg: '#fff',
            color: '#33c'
        },
        gmail_lightsoft: {
            bg: '#fff',
            color: '#0065cc'
        },
        gmail_cherry: {
            bg: '#fff',
            color: '#942e06',
            rbg: urlgmail + 'images/2/5/cherry/bg-main.png'
        },
        gmail_nightshade: {
            bg: '#55688a',
            color: '#fff',
            rh: urlgmail + 'images/2/5/nightshade/ns_bg.gif'
        },
        gmail_medsoft: {
            bg: '#000',
            color: '#fff',
            rh: urlgmail + 'images/2/5/medsoft/bg-main.gif'
        },
        gmail_medred: {
            bg: '#000',
            color: '#fff',
            rh: urlgmail + 'images/2/5/medred/bg-main.gif'
        },
        gmail_darkwarm: {
            bg: '#000',
            color: '#fff',
            rh: urlgmail + 'images/2/5/darkwarm/bg-main.png'
        },
        gmail_greyrain: {
            bg: '#000',
            color: '#fff',
            rh: urlgmail + 'images/2/5/darkwarm/bg-main.png'
        },
        gmail_contrastblack: {
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
            sbg: urlgmail + 'images/2/5/desk/canvas_bg.jpg',
            hl: [ /* .wp */urlgmail + 'images/2/5/desk/logo_splatter.png', urlgmail + 'images/2/5/desk/logo_splatter_pencil.png'],
            hr: [ /* .wq */urlgmail + 'images/2/5/desk/header_bg_padpins.png', urlgmail + 'images/2/5/desk/header_bg_sharpenerenvelope.png', urlgmail + 'images/2/5/desk/header_bg_ruler.png', urlgmail + 'images/2/5/desk/header_bg_tape.png', urlgmail + 'images/2/5/desk/header_bg_vase.png'],
            fl: [ /* .wn */urlgmail + 'images/2/5/desk/footer_bg_paperclips.png', urlgmail + 'images/2/5/desk/footer_bg_applecalendar1.png', urlgmail + 'images/2/5/desk/footer_bg_postcard.png', urlgmail + 'images/2/5/desk/footer_bg_envelopebusstop1.png', urlgmail + 'images/2/5/desk/footer_bg_photos1.png'],
            fr: [ /* .wo */urlgmail + 'images/2/5/desk/footer_bg_cupring.png', urlgmail + 'images/2/5/desk/footer_bg_cdclips1.png', urlgmail + 'images/2/5/desk/footer_bg_teacookie.png', urlgmail + 'images/2/5/desk/footer_bg_pencilladybug.png', urlgmail + 'images/2/5/desk/footer_bg_calculatorclips1.png']
        },
        gmail_tree: {
            bg: '#cde4f3',
            color: '#074D8F',
            rh: urlgmail + 'images/2/5/tree/mostlycloudy/header_tile.jpg',
            rf: urlgmail + 'images/2/5/tree/mostlycloudy/footer_tile.jpg',
            fl: urlgmail + 'images/2/5/tree/mostlycloudy/footer_bg.jpg'
        },
        gmail_beach: {
            bg: '#fff',
            color: '#fff',
            rh: urlgmail + 'images/2/5/beach/{daytime}/headertile_bg.jpg',
            h: urlgmail + 'images/2/5/beach/{daytime}/header_bg.jpg',
            f: urlgmail + 'images/2/5/beach/{daytime}/footer_bg.jpg',
            rbg: urlgmail + 'images/2/5/beach/{daytime}/canvastile_bg.jpg'
        },
        gmail_mountains: {
            bg: '#6D6C68',
            color: '#fff',
            hl: {
                selector: 'day',
                mon: urlgmail + 'images/2/5/mountains/mon/monday1.jpg',
                tue: [urlgmail + 'images/2/5/mountains/tue/tuesday1.jpg', urlgmail + 'images/2/5/mountains/tue/tuesday3.jpg'],
                thu: urlgmail + 'images/2/5/mountains/thu/thursday1.jpg',
                wed: urlgmail + 'images/2/5/mountains/wed/wednesday.jpg',
                fri: urlgmail + 'images/2/5/mountains/fri/friday1.jpg',
                sat: urlgmail + 'images/2/5/mountains/sat/saturday1.jpg',
                sun: urlgmail + 'images/2/5/mountains/sun/sunday.jpg'
            }
        },
        gmail_pebbles: {
            bg: '#6d6c68',
            color: '#fff',
            hl: urlgmail + 'images/2/5/pebbles/rocks_tile.jpg'
        },
        gmail_ocean: {
            bg: '#af947f',
            color: '#fff',
            hl: urlgmail + 'images/2/5/ocean/weekdays/weekday_header.jpg',
            hr: urlgmail + 'images/2/5/ocean/weekdays/header_tile.jpg'
        },
        gmail_phantasea: {
            bg: '#003142',
            color: '#fff',
            hl: urlgmail + 'images/2/5/phantasea/night_header_bg1.jpg',
            hr: urlgmail + 'images/2/5/phantasea/night_header_tile1.jpg'
        },
        gmail_graffiti: {
            bg: '#000',
            color: '#fff',
            hl: {
                selector: 'day',
                mon: urlgmail + 'images/2/5/graffiti/monday_bg1.jpg',
                tue: urlgmail + 'images/2/5/graffiti/tuesday_bg1.jpg',
                thu: urlgmail + 'images/2/5/graffiti/thursday_bg1.jpg',
                wed: urlgmail + 'images/2/5/graffiti/wednesday_bg1.jpg',
                fri: urlgmail + 'images/2/5/graffiti/friday_bg1.jpg',
                sat: urlgmail + 'images/2/5/graffiti/saturday_bg.jpg',
                sun: urlgmail + 'images/2/5/graffiti/sunday_bg.jpg'
            },
            fl: urlgmail + 'images/2/5/graffiti/footer_bg1.jpg'
        },
        gmail_planets: {
            bg: '#0c1319',
            color: '#fff',
            hl: [urlgmail + 'images/2/5/planets/sun/sun.jpg', urlgmail + 'images/2/5/planets/moon/moon.jpg', urlgmail + 'images/2/5/planets/mercury/mercury.jpg', urlgmail + 'images/2/5/planets/venus/venus.jpg', urlgmail + 'images/2/5/planets/mars/mars.jpg', urlgmail + 'images/2/5/planets/jupiter/jupiter.jpg', urlgmail + 'images/2/5/planets/saturn/saturn.jpg', urlgmail + 'images/2/5/planets/uranus/uranus.jpg', urlgmail + 'images/2/5/planets/neptune/neptune.jpg'],
            rbg: urlgmail + 'images/2/5/planets/base/star_tile.gif'
        },
        gmail_gizmos: {
            bg: '#fff',
            color: '#0065cc',
            fl: urlgmail + 'images/2/5/gizmos/footer.png'
        },
        gmail_candy: {
            bg: '#fff',
            color: '#603913',
            hl: urlgmail + 'images/2/5/candy/header_bg.gif',
            hr: urlgmail + 'images/2/5/candy/headertile_bg.gif',
            fl: urlgmail + 'images/2/5/candy/footer_bg.gif',
            rbg: urlgmail + 'images/2/5/candy/canvastile_bg.gif'
        },
        gmail_busstop: {
            bg: '#78726b',
            bg2: {
                selector: 'weather',
                sunny: '#AFDBE5',
                windy: '#AEDAE3',
                rainy: '#7495A8'
            },
            color: '#196b7b',
            /*Snowy? / Rainy / Sunny / Windy*/
            vars: {
                weather: ['sunny', 'windy', 'rainy']
            },
            rh: urlgmail + 'images/2/5/busstop/{weather}/header_bg.jpg',
            fl: urlgmail + 'images/2/5/busstop/{weather}/footer_bg.gif',
            rf: urlgmail + 'images/2/5/busstop/{weather}/footertile_bg.jpg'
        },
        gmail_ninja: {
            bg: '#006f8a',
            color: '#fff',
            rh: urlgmail + 'images/2/5/ninja/header_bg.gif',
            rf: urlgmail + 'images/2/5/ninja/footer_bg.gif'
        },
        gmail_teahouse: {
            bg: '#8ba451',
            color: '#5c4520',
            hl: urlgmail + 'images/2/5/teahouse/{daytime}/headertile_bg.jpg',
            rh: urlgmail + 'images/2/5/teahouse/{daytime}/headertile_bg.jpg',
            fl: urlgmail + 'images/2/5/teahouse/{daytime}/footer_bg.jpg',
            rf: urlgmail + 'images/2/5/teahouse/{daytime}/footertile_bg.jpg',
            rbg: urlgmail + 'images/2/5/teahouse/{daytime}/canvastile_bg.jpg'
        },
        gmail_terminal: {
            bg: '#000',
            color: '#0c0'
        },
        gmail_orcasisland: {
            bg: '#5e7056',
            color: '#000',
            hl: [urlgmail + 'images/2/5/orcasisland/{fullday}_01.jpg', urlgmail + 'images/2/5/orcasisland/{fullday}_02.jpg']
        },
        gmail_highscore: {
            bg: '#090',
            bg2: '#47B3DA',
            color: '#fff',
            hl: urlgmail + 'images/2/5/highscore/{daynight}_background.png',
            rf: urlgmail + 'images/2/5/highscore/{daynight}_hills_footer.png'
        },
        gmail_turf: {
            bg: '#254a14',
            color: '#fff',
            hl: urlgmail + 'images/2/5/turf/header_tile.jpg'
        },
        gmail_lapinscretins: {
            vars: {
                numero: [1, 2, 3]
            },
            bg: {
                selector: 'numero',
                1: '#3275AC',
                2: '#31669A',
                3: '#B7E0E4'
            },
            color: '#fff',
            sbg: urlgmail + 'images/2/5/lapinscretins/rabbids_header{numero}_final.png'
        },
        gmail_assasinscreed2: {
			bg: '#3C4844',
            color: '#fff',
            sbg: [urlgmail + 'images/2/5/assassinscreed2/ac2_header1_final.png', urlgmail + 'images/2/5/assassinscreed2/ac2_header2_final.png', urlgmail + 'images/2/5/assassinscreed2/ac2_header3_final.png', urlgmail + 'images/2/5/assassinscreed2/ac2_header4_final.png', urlgmail + 'images/2/5/assassinscreed2/ac2_header5_final.png', urlgmail + 'images/2/5/assassinscreed2/ac2_header6_final.png']
        },
        
/* editors_picks */
"editor_5478752472500006610":"http://lh4.ggpht.com/_fxkujw2mA9U/TAhwWJen7tI/AAAAAAAAAIY/QNQcTiWN9l8/","editor_5478752827007585634":"http://lh4.ggpht.com/_fxkujw2mA9U/TAhwqyH0TWI/AAAAAAAAAI8/APTtF3_y2cI/","editor_5478752842710333378":"http://lh4.ggpht.com/_fxkujw2mA9U/TAhwrsnpN8I/AAAAAAAAAJE/ym-TNB-ipDU/","editor_5478753114195988130":"http://lh5.ggpht.com/_fxkujw2mA9U/TAhw7f-3jqI/AAAAAAAAAJc/YGO5_ldyj-Y/","editor_5478753075316627266":"http://lh4.ggpht.com/_fxkujw2mA9U/TAhw5PJTl0I/AAAAAAAAAJU/rS6YK1WW8-A/","editor_5478753460334726146":"http://lh4.ggpht.com/_fxkujw2mA9U/TAhxPpcxjAI/AAAAAAAAAJs/URghLUy99YA/","editor_5478752501519603442":"http://lh3.ggpht.com/_fxkujw2mA9U/TAhwX1lb1vI/AAAAAAAAAIk/Ksf6-SnvVPo/","editor_5478753089633816370":"http://lh3.ggpht.com/_fxkujw2mA9U/TAhw6EeyjzI/AAAAAAAAAJY/BDvPIiaoi2U/","editor_5478752819223180210":"http://lh5.ggpht.com/_fxkujw2mA9U/TAhwqVH3s7I/AAAAAAAAAI0/xhmZlouBW6Q/","editor_5478753117486370930":"http://lh5.ggpht.com/_fxkujw2mA9U/TAhw7sPW0HI/AAAAAAAAAJg/wiRaz9nNtUw/","editor_5478752835087677362":"http://lh6.ggpht.com/_fxkujw2mA9U/TAhwrQOQt7I/AAAAAAAAAJA/H6GQMElt9Jg/","editor_5478752493997894098":"http://lh5.ggpht.com/_fxkujw2mA9U/TAhwXZkHqdI/AAAAAAAAAIg/PR_JvDoSUUo/","editor_5478752822146891810":"http://lh3.ggpht.com/_fxkujw2mA9U/TAhwqgA8ACI/AAAAAAAAAI4/mBFPhy-c3Dg/","editor_5478753058608504226":"http://lh3.ggpht.com/_fxkujw2mA9U/TAhw4Q5x3aI/AAAAAAAAAJQ/CnTyXr3Q8uQ/","editor_5480987905094465154":"http://lh4.ggpht.com/_fxkujw2mA9U/TBBhdc1eNoI/AAAAAAAAAPg/VL7O_YocFWY/","editor_5480987906200029490":"http://lh6.ggpht.com/_fxkujw2mA9U/TBBhdg9DyTI/AAAAAAAAAPk/1jXNNml5Fvs/","editor_5480998621006856338":"http://lh6.ggpht.com/_fxkujw2mA9U/TBBrNMuFAJI/AAAAAAAAARU/52PQOquzhC8/","editor_5480987916726984130":"http://lh5.ggpht.com/_fxkujw2mA9U/TBBheIK4XcI/AAAAAAAAAPo/BR4cS1ib3xM/","editor_5480987917979934498":"http://lh3.ggpht.com/_fxkujw2mA9U/TBBheM1m3yI/AAAAAAAAAPs/uKFlfn704Q8/","editor_5480987925727076290":"http://lh5.ggpht.com/_fxkujw2mA9U/TBBhepsq38I/AAAAAAAAAPw/Ida0LeDX0fE/","editor_5480988005113749330":"http://lh5.ggpht.com/_fxkujw2mA9U/TBBhjRb7X1I/AAAAAAAAAP4/TUTmK3R2KAE/","editor_5480988012864676114":"http://lh4.ggpht.com/_fxkujw2mA9U/TBBhjuT5IRI/AAAAAAAAAP8/3zSixI6EFwM/","editor_5478753466167683746":"http://lh5.ggpht.com/_fxkujw2mA9U/TAhxP_LdaqI/AAAAAAAAAJw/D3WLPN6-uhk/","editor_5478753483552159554":"http://lh3.ggpht.com/_fxkujw2mA9U/TAhxQ_8Pd0I/AAAAAAAAAJ0/IuvA0kBkziw/","editor_5478755559461692018":"http://lh5.ggpht.com/_fxkujw2mA9U/TAhzJ1TpInI/AAAAAAAAAL4/SRH8g8xRsRE/","editor_5478755572322259650":"http://lh4.ggpht.com/_fxkujw2mA9U/TAhzKlN10sI/AAAAAAAAAL8/B-akepWsw9Q/","editor_5478753799989312658":"http://lh5.ggpht.com/_fxkujw2mA9U/TAhxjawvPJI/AAAAAAAAAKE/Uo0oCE22FnM/","editor_5478753813630017442":"http://lh4.ggpht.com/_fxkujw2mA9U/TAhxkNk736I/AAAAAAAAAKI/cbq956vqL7o/","editor_5478753819961634386":"http://lh3.ggpht.com/_fxkujw2mA9U/TAhxklKgrlI/AAAAAAAAAKM/a95O10f-NEg/","editor_5478752511525657170":"http://lh6.ggpht.com/_fxkujw2mA9U/TAhwYa3EGlI/AAAAAAAAAIo/Wi7XY2Bxgrc/","editor_5478753832267149810":"http://lh5.ggpht.com/_fxkujw2mA9U/TAhxlTAX8fI/AAAAAAAAAKQ/pfQT3foJPRs/","editor_5480997862386069170":"http://lh3.ggpht.com/_fxkujw2mA9U/TBBqhCoybrI/AAAAAAAAAQs/IRrOw-q56ig/","editor_5480997893054118498":"http://lh3.ggpht.com/_fxkujw2mA9U/TBBqi04numI/AAAAAAAAAQw/dEVESx_pvBs/","editor_5480998186992651026":"http://lh5.ggpht.com/_fxkujw2mA9U/TBBqz75ByxI/AAAAAAAAARE/CAq1-arltkE/","editor_5478769425598313058":"http://lh6.ggpht.com/_fxkujw2mA9U/TAh_w8sO8mI/AAAAAAAAAMs/E5kjeXUIQOc/","editor_5478769428183578882":"http://lh3.ggpht.com/_fxkujw2mA9U/TAh_xGUm-QI/AAAAAAAAAMw/TlYQUgOsAOs/","editor_5478769428473291154":"http://lh4.ggpht.com/_fxkujw2mA9U/TAh_xHZroZI/AAAAAAAAAM0/fZ8ZGI4gEHs/","editor_5478769530404012082":"http://lh4.ggpht.com/_fxkujw2mA9U/TAh_3DH3ADI/AAAAAAAAAM4/09PbIsWavv4/","editor_5478769535168997586":"http://lh4.ggpht.com/_fxkujw2mA9U/TAh_3U366NI/AAAAAAAAAM8/fUctF4T897M/","editor_5480596593254567266":"http://lh6.ggpht.com/_fxkujw2mA9U/TA79kGonjWI/AAAAAAAAAO8/wgt1U7ogm0k/",
/* public_gallery */
"public_5468005866288280370":"http://lh5.ggpht.com/_W6mjt7mDgno/S-JCXVndczI/AAAAAAAA3y0/fQWo9r8k0ks/","public_5480525382039743330":"http://lh4.ggpht.com/_3rqotzCU1sY/TA68zEL9q2I/AAAAAAAAA80/cZhz0pxQSM0/","public_5469661666160577106":"http://lh5.ggpht.com/_Z4rK3Ss0bFg/S-gkTk0SilI/AAAAAAAAADw/DDTeQLjTfWA/","public_5464847589870262818":"http://lh6.ggpht.com/_rfAz5DWHZYs/S9cJ7dHd2iI/AAAAAAAAcg8/kx3xyB7P6fc/","public_5468620555541748930":"http://lh3.ggpht.com/_0YSlK3HfZDQ/S-Rxa9h3HMI/AAAAAAAAXiI/fStJVANexYc/","public_5465726438613138322":"http://lh6.ggpht.com/_W6mjt7mDgno/S9opPLz_O5I/AAAAAAAA3yw/yYZekAKroI4/","public_5480525372525642866":"http://lh5.ggpht.com/_3rqotzCU1sY/TA68ygvoBHI/AAAAAAAAA9c/k7jhmLYmw78/","public_5468095309182211138":"http://lh6.ggpht.com/__75Y1wEu2H0/S-KTtmXJFEI/AAAAAAAAAFA/JzlqhzF7Vt4/","public_5467968585789456354":"http://lh5.ggpht.com/_aIZoxdfNfNk/S-IgdU75v-I/AAAAAAAAB7A/jL1VMOt7DgM/","public_5467968606322662898":"http://lh6.ggpht.com/_aIZoxdfNfNk/S-IgehbZnfI/AAAAAAAAB7E/v_h-Pq9AqeU/","public_5394978350593597026":"http://lh5.ggpht.com/_A5ssqXnsoMw/St7QOd4N3mI/AAAAAAAAE98/xKvtFXjUN_U/","public_5468030760630111442":"http://lh4.ggpht.com/_daORpSs2nxc/S-JZAYRETNI/AAAAAAAAAFA/kuOmpgEENNU/","public_5461268259373019506":"http://lh5.ggpht.com/_KFSyWTTuLjA/S8pSi_8LcXI/AAAAAAAAWTA/Ne49ieWVSV8/","public_5418083111186176690":"http://lh6.ggpht.com/_unJLPNmBC1U/SzDl4iXLmrI/AAAAAAABWv4/kkFFBMpXvdM/","public_5465064542962429986":"http://lh6.ggpht.com/_3UYvaY5uN7E/S9fPPyXbsCI/AAAAAAAAAbc/w9YyUMXol5k/","public_5465267981519769410":"http://lh3.ggpht.com/_Z6STI8lIz68/S9iIReDNT0I/AAAAAAAAVn8/1VWscVg0VHI/","public_5464637264209516562":"http://lh4.ggpht.com/_yjAEkPM8eKE/S9ZKo4-SGBI/AAAAAAAAExM/Yolg3yv48ZE/","public_5469816275349772930":"http://lh4.ggpht.com/_aIZoxdfNfNk/S-iw7A7fmoI/AAAAAAAAB7I/uX8etH_Zh8s/","public_5405276903498929458":"http://lh5.ggpht.com/_KFSyWTTuLjA/SwNmtJGtVTI/AAAAAAAAWS8/m3yzK6SE-9k/","public_5464602659331416274":"http://lh3.ggpht.com/_mlwpgEPyjKM/S9YrKnwaoNI/AAAAAAAAL8o/qERJYeK9SOY/","public_5468081125425097026":"http://lh5.ggpht.com/_LgRsf0mgy_M/S-KGz_v7KUI/AAAAAAAABNU/GYTn-LSj3lw/","public_5480525380508846738":"http://lh4.ggpht.com/_3rqotzCU1sY/TA68y-e-CpI/AAAAAAAAA8g/Fb18jqd2T18/","public_5465064395281172466":"http://lh6.ggpht.com/_3UYvaY5uN7E/S9fPHMNeh_I/AAAAAAAAAbY/teuqnGf7uT8/","public_5427875955486466754":"http://lh3.ggpht.com/_K29ox9DWiaM/S1OwbGOnosI/AAAAAAAASqs/Wg5OAoix0tk/","public_5480525385832476034":"http://lh6.ggpht.com/_3rqotzCU1sY/TA68zSUOLYI/AAAAAAAAA9I/JpGyEL5lx9s/","public_5464721817854022450":"http://lh5.ggpht.com/_7V85eCJY_fg/S9aXij2EEzI/AAAAAAAAMsc/rUXq7chzQZo/","public_5468499236979512002":"http://lh6.ggpht.com/_RXIvzqFA_h8/S-QDFSqoksI/AAAAAAAABss/q8Hs_Y6Ojco/","public_5465811371224046274":"http://lh3.ggpht.com/_7SB5-VS6jYo/S9p2e6cZmsI/AAAAAAAAAPk/CdITAmRcDNU/","public_5468499251879550482":"http://lh6.ggpht.com/_RXIvzqFA_h8/S-QDGKLFHhI/AAAAAAAABso/mMXhQIO_rIY/","public_5468011240643552594":"http://lh5.ggpht.com/_q82cg6OMtCs/S-JHQKpm5VI/AAAAAAAAQDs/eQKsBn336_w/","public_5464721917635140242":"http://lh3.ggpht.com/_7V85eCJY_fg/S9aXoXjvGpI/AAAAAAAAMsg/8LweEHXvC8E/","public_5465963404565598994":"http://lh3.ggpht.com/_4HzkBj4VmKw/S9sAwaxq0xI/AAAAAAAAy3s/595Du9f3xbQ/","public_5464886839716494226":"http://lh6.ggpht.com/_as1xi-WX02U/S9ctoGMCO5I/AAAAAAAAC2o/G348G26qKR0/","public_5464644514748019778":"http://lh5.ggpht.com/_dAaguGcsRfA/S9ZRO7VXtEI/AAAAAAAAENA/jQ1y0m7u7FE/","public_5465825398133839090":"http://lh3.ggpht.com/_7SB5-VS6jYo/S9qDPYwTVPI/AAAAAAAAANo/39f76y32uiA/","public_5467921205742594898":"http://lh3.ggpht.com/_aDwLqnCx5xE/S-H1Xcgc61I/AAAAAAAACAQ/zmy2_wM2j4Y/","public_5436863789388960962":"http://lh5.ggpht.com/_uqT1DECwpD8/S3Oez4q2lMI/AAAAAAAAO6c/aGrJoPQEzbY/","public_5464721845849026242":"http://lh4.ggpht.com/_7V85eCJY_fg/S9aXkMIl7sI/AAAAAAAAMsY/hbwwd2lB1ns/","public_5467928286294729906":"http://lh4.ggpht.com/_6NwUsKnkxdc/S-H7zlnoZLI/AAAAAAAAJ2Y/qYD_7yeqVOw/","public_5469782237294118322":"http://lh3.ggpht.com/_iGI-XCxGLew/S-iR9vSoRbI/AAAAAAAABLQ/n5Ix1uZx1qc/","public_5463830940035733394":"http://lh4.ggpht.com/_1rL3G0Y32aQ/S9NtSpWeV5I/AAAAAAAAJd4/wJdXRCWA-_c/","public_5470258900410180098":"http://lh5.ggpht.com/_n8uHgnu6KsU/S-pDfLxeIgI/AAAAAAAAAZY/uPP45av8Tls/","public_5467976005541355106":"http://lh5.ggpht.com/_loGyjar4MMI/S-InNNqm3mI/AAAAAAAAB9s/XKcK0UhQhHk/","public_5467975931636282290":"http://lh6.ggpht.com/_loGyjar4MMI/S-InI6WQ87I/AAAAAAAACEs/WaRxi6D4WCs/","public_5467936023478442338":"http://lh4.ggpht.com/_aDwLqnCx5xE/S-IC183-mWI/AAAAAAAACAU/x5M3XSm-z38/","public_5468630655462131890":"http://lh5.ggpht.com/_vegCfczOoKA/S-R6m2qhyLI/AAAAAAAAIJg/VbgtlWc1YVs/","public_5468499216650860930":"http://lh6.ggpht.com/_RXIvzqFA_h8/S-QDEG75-YI/AAAAAAAABsw/qbL5p3ubU8U/","public_5464708695072547106":"http://lh6.ggpht.com/_s60pF2QNbck/S9aLmtrJoSI/AAAAAAAAeOo/cPMni36CmMk/","public_5464721937652197202":"http://lh4.ggpht.com/_7V85eCJY_fg/S9aXpiILJ1I/AAAAAAAAMsU/m2f6UsfQfEA/","public_5464593346215231826":"http://lh4.ggpht.com/_4HzkBj4VmKw/S9YishsfQVI/AAAAAAAAy3w/2Hg6_XEPri4/"
    };
    
}
