function namespace(){
        var a = arguments, o = null, i, j, d;
        for (i = 0; i < a.length; i = i + 1) {
            d = a[i].split(".");
            o = window;
            for (j = 0; j < d.length; j = j + 1) {
                o[d[j]] = o[d[j]] || {};
                o = o[d[j]];
            }
        }
        return o;
}

$(document).ready(function(){
    var langs={}, lin, lout, PATH = "http://googlereaderplus.googlecode.com/svn/trunk/GoogleReaderPlus/src/";
       
    function render(lang, text, data, root){
        var el = root.html('<ul class="lang_' + lang + '"><h1>' + text + '</h1></ul>');
        if (data[lang]) {
            $.each(data[lang].texts, function(module){
                var o = data[lang].texts[module];
                if (typeof o === "object") {
                    el.append('<h3>' + module + ':</h3>');
                    $.each(GRP.langs[lang].texts[module], function(name, value){
                        el.append('<li id="' + module + '_' + name + '">' + value + '</li>');
                    });
                }
            });
        }
    }
	function loadall(){
		load(lin.val(), true);
        load(lout.val(), false);
	}
    
    function load(lang, isin){
        //console.log('load '+lang + ' ' + isin);
        /*function renderLang(){
			var urlmsg = PATH + "_locales/" + lang + "/messages.json"; 
			$.getJSON(urlmsg, function(data){
				renderLang2(data);
			});
		}*/
		function renderLang(messages){
            if (GRP && GRP.langs && GRP.langs[lang]){
				langs[lang]=true;
				if (messages){
					GRP.langs[lang].texts.messages = messages;
				}
			}
			// console.log('renderlang '+lin.val()+'->'+lout.val());
            if (isin) {
                render(lin.val(), lin.val(), GRP.langs, $('#tin'));
                render(lin.val(), lin.val() + '->' + (lout) ? lout.val() : '', GRP.langs, $('#tauto'));
            } else {
                render(lout.val(), lout.val(), GRP.langs, $('#tout'));
            }
            $('#tauto li').translate(lin.val(), lout.val(), 
            {
                fromOriginal: true
            });
            $('#translations li').editable('save.php');
        }
        
		if (langs[lang]) {
			renderLang();
		}else{
			var url = PATH + "lang/" + lang + "/langs.js";
			langs[lang] = false;
			$.getScript(url, renderLang);
			window.setTimeout(function(){
				//check if failed
				if (!langs[lang]){
					//flag still down so loading lang failed
					renderLang();
				}
			}, 2000);
		}
    }
    
    $.translate(function(){
        $('<input type="button" value="OK" />').prependTo('body').click(loadall);
		
		lout = $.translate.ui(
        {
            filter: $.translate.isTranslatable,
            label: function(langCode, lang){
                return langCode + ' - ' + $.translate.capitalize(lang);
            }
        }).change(function(){
            //load($(this).val(), false);
        }).val('uk').prependTo('body');
        
        lin = $.translate.ui(
        {
            filter: $.translate.isTranslatable,
            label: function(langCode, lang){
                return langCode + ' - ' + $.translate.capitalize(lang);
            }
        }).change(function(){
            //load($(this).val(), true);
        }).val('en').prependTo('body');
        
		loadall();
    });
});
