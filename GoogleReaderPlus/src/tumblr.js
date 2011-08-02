/**
 * Tumblr integration
 * @version  ?
 * @date 2011-05-10
 *
  * see API docs: http://www.tumblr.com/docs/en/api
 */
GRP.tumblr = function(prefs, langs, ID, SL, lang){
    
    var api = {
        shortcut:'tumblr',
        tpl:{
        	url:['blogname']
        }
    };
    
    GRP.api_micro(prefs, langs, ID, SL, lang, api);
};