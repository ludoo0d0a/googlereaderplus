/**
 * Use iGoogle Theme for Reader
 *
 */
//http://www.google.com/ig/directory?type=themes
//http://code.google.com/apis/themes/docs/dev_guide.html
GRP.ig = function(prefs, langs, ID, SL, lang){
    var skin_url = prefs.ig_skin_url;
    var skin_name = prefs.ig_skin_name||'';
    var ig_debug = prefs.ig_debug;
    var menu_item;
    var css = GM_getValue('cache_ig_'+skin_name);
    var props = GM_getValue('cache_ig_props_'+skin_name);
    if (prefs.ig_userandomthemes) {
        var t = parseInt(prefs.ig_randomthemes, 10) || 5;
        window.setInterval(function(){
            rndskin();
        }, t * 60000);
        rndskin();
    } else {
        setcss(css, skin_url);
    }
    fixMenu();
    
    function fixMenu(){
        var txt = (getText(lang, 'ig', 'menu_randomtheme') || 'Change theme :') + ' <span id="th_cur">' + skin_name + '</span>';
        addReaderMenuItem(txt, rndskin);
    }
    function rndskin(){
        var data = {
            message: 'igtheme',
            type: 'random',
			current:skin_name
        };
        chrome.extension.sendRequest(data, function(entry){
				setcss('', entry.link);
				var item = get_id('th_cur');
				if (item) {
					item.innerHTML = entry.title;
				}
        });
    }
	
	var tog={};
	function toggleTheme(){
		var el = get_id('theme_ig');
		var el2 = get_id('rps_ig');
		if (el || el2) {
			tog = {
				css: (el)?el.innerHTML:'',
				css2: (el2)?el2.innerHTML:''
			};
			remove(el);
			remove(el2);
		} else {
			if (tog.css) {
				GM_addStyle(tog.css, 'theme_ig');
			}
			if (tog.css2) {
				GM_addStyle(tog.css2, 'rps_ig');
			}
		}
		fireResize();
	}
	
    function setcss(css, xml, entry){
        if (css) {
            GM_addStyle(css, 'theme_ig');
            setProperty(props);
        } else {
            //loadCss
            loadText('skin/css/ig.css', function(css){
                stylish(css, xml, entry);
            },{});
        }
    }
    function less_escape(v){
    	return '~"'+v+'"';
    }
    function igurl(url){
        //var uri = 'http://skins.gmodules.com/ig/skin_fetch?fp=&type=2&sfkey=' + encodeURIComponent(url.replace(/&amp;/g, '&'));
        return url; 
    }
    function convertHours(h){
        var t = 0;
        if (/am$/.test(h)) {
            //am
            t = 12;
        } else {
            //pm
            t = 0;
        }
        t += parseInt(h.replace('/[apm]/g', ''), 10);
        return t;
    }
    function setProperty(props){
    	props=props||{};
    	addClassIf(document.documentElement, 'ig_tiled', !!props.header_tile);//html
        addClassIf(document.body, 'ig_fixed', !!props.header_fixe);
    }
    
    function stylish(tplCss, xml, entry){
        GM_xmlhttpRequest({
            method: 'GET',
            url: xml,
            onload: function(r){
                var text = compact(r.responseText);
                var colors = {};
                var skin, skins = [], metadata, ms, reSkins = /<ConfigMap\s+type="Skin">(.*?)<\/ConfigMap>/g;
                var f = 0;
                while ((ms = reSkins.exec(text)) !== null) {
                    if (f > 0) {
                        skins.push(ms[0]);
                    } else {
                        //first is metadata
                        metadata = ms[0];
                    }
                    f++;
                }
				if (skins.length===0){
					console.error('Not XML valid for iGoogle Theme:'+ xml);
					return;
				}
				
                if (prefs.ig_randomtime) {
                    var index = Math.floor(Math.random() * skins.length);
                    skin = skins[index];
                } else {
                    var hc = (new Date()).getHours();
                    var i = 0;
                    var reTrait = /<Trait\s+name="TimeOfDay">([^<]+)<\/Trait>/g;
                    function checkTime(skin){
                        var mt;
                        while ((mt = reTrait.exec(skin)) !== null) {
                            if (mt && mt[1]) {
                                var h = mt[1].split('-');
                                var a = convertHours(h[0]);
                                var b = convertHours(h[1]);
                                if (hc >= a && hc <= b) {
                                    return true;
                                }
                            }
                        }
                    }
                    for (var i = 0, len = skins.length; i < len; i++) {
                        skin = skins[i];
                        if (checkTime(skin)) {
                            break;
                        }
                    }
                }
				if (entry) {
					skin_name = entry.title;
					skin_url = entry.link;
				}
				
				var debug = '', reAttrs = /<Attribute\s+name="([^"]+)">([^<]+)<\/Attribute>/g;
				if (ig_debug) {
					debug += '<a href="http://www.google.com/ig/directory?q=' + encodeURIComponent(skin_name) + '&type=themes" target="igtheme">' + skin_name + '</a><br/>';
				}
                while ((m = reAttrs.exec(skin)) !== null) {
                    colors[m[1]] = m[2];
                    if (ig_debug) {
						debug += '<input size="50" value="' + m[1] + '" style="background-color:' + m[2] + '"/><br/>';
                    }
                }
                if (ig_debug) {
                    var eldbg = get_id('debug');
					if (eldbg) {
						eldbg.innerHTML=debug;
					} else {
						GM_addStyle('#debug{position:absolute;top:200px;right:400px;z-index:9999;height:600px;overflow:auto;background-color:white;}', 'rps_debug');
						var e = dh('', 'div', {
							id: 'debug',
							html: debug
						});
					}
                }
                //tiled
                var header_tile = colors['header.tile_image.url'] || '';
                header_tile=header_tile.trim();
                
                //fixed
                var header_fixe = colors['header.center_image.url'] || '';
                header_fixe=header_fixe.trim();

                apply(colors, {
                    header_tile: less_escape(igurl(header_tile)),
                    header_fixe: less_escape(igurl(header_fixe)),
					header_link_color: colors['header.link_color'],
					body_bg_color: (header_tile && header_fixe)?'transparent':colors['header.background_color'],
					header_bg_color: colors['header.background_color'],

                    header_text_color: colors['header.text_color'],
					//text_color: colors['gadget_area.tab.unselected.text_color']||colors['gadget_area.tab.selected.text_color'],
					text_color: colors['gadget_area.gadget.body.link_color'],
					link_color: colors['gadget_area.gadget.body.link_color'],

					nav_bg_color: colors['navbar.background_color']||'white',
					nav_text_color:colors['navbar.tab.unselected.link_color']||colors['navbar.tab.selected.link_color']||'black',

					border_color: colors['gadget_area.border_color']||colors['gadget_area.gadget.border_color']||'transparent',
					bg_action: colors['gadget_area.gadget.header.background_color']||'transparent',
                    txt_action: colors['gadget_area.gadget.header.text_color']||'transparent',
					
                    entry_color: '#fff',
                    skin_name: less_escape(skin_name)
                });
                apply(colors, {
                	nav_bg_color_hover: colors['gadget_area.tab.selected.background_color']||colors['gadget_area.tab.unselected.background_color']||colors.nav_bg_color,
					nav_text_color_hover: colors['gadget_area.tab.selected.text_color']||colors['gadget_area.tab.unselected.text_color']||colors.nav_text_color,
					nav_border_color_hover: colors['gadget_area.gadget.hover.border_color']||colors.nav_border_color
				});

                function displayCss(a){
                	if (a.css){
						props = {header_tile:header_tile,header_fixe:header_fixe};
						setProperty(props);
                
						GM_addStyle(a.css, 'rps_ig');
						//cache css
	                	GM_setValue('cache_ig_'+skin_name, a.css, false);
	                	GM_setValue('cache_ig_props_'+skin_name, props, false);
					}else{
						console.error('Failed to compile LESS stylesheet');
						console.error(a.err);
					}	               
                }
                parseLessTpl(tplCss, colors, displayCss);
            }
        });
    }
	
    var keycode = getShortcutKey(ID, 'random', prefs); //shift+r
    keycode.fn = rndskin;
    initKey(keycode);
	
	var keycode = getShortcutKey(ID, 'toggletheme', prefs);
    keycode.fn = toggleTheme;
    initKey(keycode);
	
};
//http://essence-ig-themes.googlecode.com/svn/trunk/lopes/xml/lopes.xml
//http://igcdn.googlecode.com/svn/trunk/xml/travel_lpspain.xml
