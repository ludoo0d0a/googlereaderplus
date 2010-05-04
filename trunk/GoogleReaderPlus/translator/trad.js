//http://jsbin.com/uwaka3
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
function htmlescape(a){
	return (a||'').replace(/&/g,'&amp;').replace(/>/g,'&gt;').replace(/</g,'&lt;').replace(/"/g,'&quot;');      
}
jQuery.fn.idle = function(time){
	var i = $(this);
	i.queue(function(){
		setTimeout(function(){
			i.dequeue();
		}, time);
	});
};

$(document).ready(function(){

    var langs={}, lin, lout, PATH = "https://googlereaderplus.googlecode.com/svn/trunk/GoogleReaderPlus/src/";
       
	function initUI(){
	   	$('#footer').hide();
  $('#save').click(function(){
    var json = {};
    $('.item').each(function(i,el){
      var ids = $(this)[0].id.split('_');
      var txt = $(el).text();
      window.console.log($(this)[0].id);
      if (!json[ids[0]]){
        json[ids[0]]={};
      }
      json[ids[0]][ids[1]]=txt;
    });
    var o = JSON2.stringify(json);
    
    $('#out').html(o);
    $('#footer').show();
    $('#translations').hide();
  });
  $('#close').click(function(){
    $('#translations').show();
    $('#footer').hide();
  });
	   }
	   initUI();
  
    var filesLoaded = 0, datas={};
	function loadall(){
		filesLoaded=4;//6
		load(lin.val(), true);
	    load(lout.val(), false);
	}
	function load(lang, isin){
		//loadFile('messages', PATH + "_locales/" + lang + "/messages.json", 'json', lang, isin);
		loadFile('features',PATH + "lang/" + lang + '/features.js', 'script', lang, isin);
		loadFile('langs',PATH + "lang/" + lang + '/langs.js', 'script', lang, isin);
	}
	function loadFile(id, url, dataType, lang, isin){
		$.ajax({
				url: url,
				dataType: dataType,
				success:function(data){
					fileLoaded(data, id, lang, isin);
				},
				error:function(){
					console.error('Error with '+url);
					fileLoaded({}, id, lang, isin);
				}
		});
	}
		
	function fileLoaded(data, id, lang, isin){
		--filesLoaded;
		console.log('->'+lang+'='+filesLoaded+','+data+','+id);
		datas[id]=data||{};
		if (filesLoaded<=0){
			renderTexts(datas, lin.val(), lout.val(), isin);
		}
	}
    
	function renderTexts(datas, lang, langout, isin){
	    console.log('renderTexts');
		if (GRP && GRP.langs && GRP.langs[lang]){
	        langs[lang]=true;
	        GRP.langs[lang].messages = datas.messages;
	    }
		var items = GRP.langs;
		renderTable(items, lang, langout);
		$('.edit').editable('save.php');
	}
	function translate(){
		console.log('translate');
		var els = $('.trans');
		els.translate(lin.val(), lout.val(), 
        {
			replace:false,
			fromOriginal: true,
			//parallel : true,
			complete: function(els, translations, original){
				var elements = els;
				$.each(translations, function(i, translation){
					elements.get(i).html(htmlescape(translation));
				});
			}
        });
		
    }
   
	function renderTable(res, lang, langout){
		console.log('renderTable');
		var t = $('<table class="lang_' + lang + '"><thead><tr></tr></thead><tbody></tbody></table>');
		t.appendTo($('#table'));
		var trh = t.find('thead > tr'),tb= t.find('tbody');
		trh.append('<th class="row_cat">Category</th><th class="row_mod">module</th><th class="row_id">id</th><th>'+lang+'</th>');
		trh.append('<th>' + langout + '</th>');
		//trh.append('<th>Google translation</th>');
		$('<a href="#">Translation</a>').click(translate).appendTo($('<th></th>').appendTo(trh));
		$.each(res[lang], function(category, items){
			if (items) {
				$.each(items, function(module, mod){
					if (mod) {
						if (typeof mod === 'string') {
							mod = [mod];
						}
						$.each(mod, function(id, item){
							if (item) {
								var tr = $('<tr></tr>').appendTo(tb);
								var hitem = htmlescape(item);
								tr.append('<td class="row_cat">' + category + '</td><td class="row_mod">' + module + '</td><td class="row_id">' + id + '</td><td class="edit">' + hitem + '</td>');
								var txt = '?';
								if (res[langout] && res[langout][category] && res[langout][category][module]) {
									txt = htmlescape(res[langout][category][module][id]);
								}
								tr.append('<td class="edit">' + txt + '</td>');
								tr.append('<td class="trans">' + (hitem||'?') + '</td>');
							}
						});
					}
				});
			}
		});
    }
    $.translate(function(){
        $('<input type="button" value="OK" />').prependTo('body').click(loadall);
		lout = $.translate.ui({
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

​