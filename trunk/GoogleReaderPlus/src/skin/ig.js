/**
 * Use iGoogle Theme for Reader
 *
 */
//http://www.google.com/ig/directory?type=themes
//http://code.google.com/apis/themes/docs/dev_guide.html
GRP.ig = function(prefs, lang){
    //var tplCss = '';
    var url_skin = prefs.ig_theme;
    var css = ''; //GM_getValue('theme_ig_' + url_skin);
    if (css) {
        GM_addStyle(css, 'theme_ig');
    } else {
        loadCss('skin/css/ig.css', function(css){
            var tplCss = css.replace(/_a_/g, '{').replace(/_z_/g, '}');
            stylish(tplCss);
        });
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
    function stylish(tplCss){
        GM_xmlhttpRequest({
            method: 'GET',
            url: url_skin,
            onload: function(r){
                var text = compact(r.responseText);
                var colors = {};
                var skins = [], metadata, skin, ms, reSkins = /<ConfigMap\s+type="Skin">(.*?)<\/ConfigMap>/g;
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
                    for (var i = 0, len = skins.length; i < len; i++) {
                        var skin = skins[i];
                        //Check time
                        var mt = reTrait.exec(skin);
                        if (mt && mt[1]) {
                            var h = mt[1].split('-');
                            h[0] = convertHours(h[0]);
                            h[1] = convertHours(h[1]);
                            if (hc >= h[0] && hc <= h[1]) {
                                break;
                            }
                        }
                    }
                }
                var reAttrs = /<Attribute\s+name="([^"]+)">([^<]+)<\/Attribute>/g;
                while ((m = reAttrs.exec(skin)) !== null) {
                    colors[m[1]] = m[2];
                }
                //tiled
                var header_tile = colors['header.tile_image.url'] || '';
                if (header_tile) {
                    addClass(document.body.parentNode, 'ig_tiled');//html
                }
                //fixed
                var header_fixe = colors['header.center_image.url'] || '';
                if (header_fixe) {
                    addClass(document.body, 'ig_fixed');
                }
                apply(colors, {
                    header_tile: igurl(header_tile),
                    header_fixe: igurl(header_fixe),
                    ext_color: colors['gadget_area.tab.selected.text_color'],
                    bg_color: colors['header.background_color'],
                    bg_menu: colors['gadget_area.tab.selected.text_color'],
                    text_menuhover: colors['gadget_area.gadget.header.text_color'],
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
