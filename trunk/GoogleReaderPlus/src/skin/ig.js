/**
 * Use iGoogle Theme for Reader
 *
 */
//http://www.google.com/ig/directory?type=themes
//http://code.google.com/apis/themes/docs/dev_guide.html
GRP.ig = function(prefs, lang){
    //var tplCss = '';
    var skin = prefs.ig_theme;
    var css = ''; //GM_getValue('theme_ig_' + skin);
    if (css) {
        GM_addStyle(css, 'rps_ig');
    } else {
        loadCss('skin/css/ig.css', function(css){
            var tplCss = css.replace(/_a_/g, '{').replace(/_z_/g, '}');
            stylish(tplCss);
        });
    }

    function igurl(url){
        return 'http://skins.gmodules.com/ig/skin_fetch?fp=&type=2&sfkey=' + encodeURIComponent(url.replace(/&amp;/g, '&'));
    }
    function stylish(tplCss){
        GM_xmlhttpRequest({
            method: 'GET',
            url: skin,
            onload: function(r){
                var text = r.responseText;
                var colors = {};
                var reAttrs = /<Attribute\s+name="([^"]+)">([^<]+)<\/Attribute>/g;
                while ((m = reAttrs.exec(text)) !== null) {
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
                GM_setValue('theme_ig_' + skin, css);
            }
        });
    }
};
//http://essence-ig-themes.googlecode.com/svn/trunk/lopes/xml/lopes.xml
//http://igcdn.googlecode.com/svn/trunk/xml/travel_lpspain.xml
