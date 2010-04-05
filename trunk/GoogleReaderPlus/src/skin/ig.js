/**
 * Use iGoogle Theme for Reader
 *
 */
//http://www.google.com/ig/directory?type=themes
//http://code.google.com/apis/themes/docs/dev_guide.html
GRP.ig = function(prefs, lang){
    var xml_skin = prefs.ig_skin_url;
    var skin_name = prefs.ig_skin_name;
    var ig_debug = prefs.ig_debug;
    var menu_item;
    var css = ''; //GM_getValue('theme_ig'+name???);
    fixMenu();
    
    if (prefs.ig_userandomthemes) {
        var t = parseInt(prefs.ig_randomthemes, 10) || 5;
        window.setInterval(function(){
            rndskin();
        }, t * 60000);
        rndskin();
    } else {
        setcss(css, xml_skin);
    }
    
    function fixMenu(){
        menu_item = dh('gbg', 'a', {
            href: '#',
            id: 'grp_ch_theme',
            cls: 'gb2',
            html: (getText(lang, 'ig', 'menu_randomtheme') || 'Random theme') + ' <span id="th_cur">' + skin_name + '</span>'
        }, {
            click: function(){
                rndskin();
            }
        });
    }
    function rndskin(){
        var data = {
            message: 'igtheme',
            type: 'random'
        };
        chrome.extension.sendRequest(data, function(entry){
            setcss('', entry.link);
            var item = get_id('th_cur');
            if (item) {
                item.innerHTML = entry.title;
            }
        });
    }
    
    function setcss(css, xml){
        if (css) {
            GM_addStyle(css, 'theme_ig');
        } else {
            loadCss('skin/css/ig.css', function(css){
                var tplCss = css.replace(/_a_/g, '{').replace(/_z_/g, '}');
                stylish(tplCss, xml);
            });
        }
    }
    function igurl(url){
        return 'http://skins.gmodules.com/ig/skin_fetch?fp=&type=2&sfkey=' + encodeURIComponent(url.replace(/&amp;/g, '&'));
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
    
    function stylish(tplCss, xml){
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
                if (prefs.ig_randomtime) {
                    var index = Math.floor(Math.random() * skins.length);
                    skin = skins[index];
                } else {
                    var hc = (new Date()).getHours();
                    var i = 0;
                    var reTrait = /<Trait\s+name="TimeOfDay">([^<]+)<\/Trait>/;
                    function checkTime(skin){
                        var mt;
						//while ((mt = reTrait.exec(skin)) !== null) {
						//Why dont work
						//Good eats - http://igoog.googlecode.com/svn/trunk/xml/artist_altonbrown.xml
						if ((mt = reTrait.exec(skin)) !== null) {
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
                var debug = '', reAttrs = /<Attribute\s+name="([^"]+)">([^<]+)<\/Attribute>/g;
                while ((m = reAttrs.exec(skin)) !== null) {
                    colors[m[1]] = m[2];
                    if (ig_debug) {
                        debug += '<input size="50" value="' + m[1] + '" style="background-color:' + m[2] + '"/><br/>';
                    }
                }
                if (ig_debug) {
                    dh('', 'div', {
                        id: 'debug',
                        html: debug,
                        style: 'position:absolute;top:40px;right:100px;z-index:9999;background-color:white;'
                    });
                }
                //tiled
                var header_tile = colors['header.tile_image.url'] || '';
                /*if (header_tile) {
                 addClass(document.body.parentNode, 'ig_tiled');//html
                 }*/
                //fixed
                var header_fixe = colors['header.center_image.url'] || '';
                /*if (header_fixe) {
                 addClass(document.body, 'ig_fixed');
                 }*/
                apply(colors, {
                    header_tile: igurl(header_tile),
                    header_fixe: igurl(header_fixe),
                    ext_color: colors['gadget_area.tab.selected.text_color'],
                    bg_color: colors['header.background_color'],
                    //bg_menu: colors['gadget_area.tab.selected.text_color'],
                    bg_menu: colors['gadget_area.tab.selected.background_color'],
                    //text_menuhover: colors['gadget_area.gadget.header.text_color'],
                    text_menuhover: colors['gadget_area.tab.selected.text_color'],
                    bg_action: colors['gadget_area.border_color'],
                    txt_action: colors['gadget_area.gadget.header.text_color'],
                    entry_color: '#fff'
                });
                css = fillTpl(tplCss, colors);
                GM_addStyle(css, 'rps_ig');
                //cache css
                GM_setValue('theme_ig', css);
            }
        });
    }
};
//http://essence-ig-themes.googlecode.com/svn/trunk/lopes/xml/lopes.xml
//http://igcdn.googlecode.com/svn/trunk/xml/travel_lpspain.xml



