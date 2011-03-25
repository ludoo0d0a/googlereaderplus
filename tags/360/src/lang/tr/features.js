/**
 * ReaderPlus
 * Translation for features
 *
 * **************************
 * tr : Türkçe 
 * **************************
 *
 *
 *
 * Version : 1.4
 * Date : 04-30-2010
 * @author Ata Ýsmet Özçelik (ataozcelik@gmail.com)
 */
var locale = 'tr';
namespace('GRP.langs.' + locale);
GRP.langs[locale].categories = {
	main: 'Ana',
	theme: 'Tema/görünüm',
	icons:'Ýkonlar',
	counter:'Sayaç',
	layout: 'Yerleþim',
	navigation: 'Navigasyon',
	share: 'Paylaþma',
	action: 'Aksiyonlar',
	content: 'Ýçerik'
};
GRP.langs[locale].scripts = {
    general: {
        name: "Genel",
        desc: "Genel konfigürasyon"
    },
    theme: {
        name: "Tema",
        desc: "GoogleReader'ýn görüntüsünü deðiþtir"
    },
    ig: {
        name: "iGoogle Temasý",
        desc: "Google Reader (Beta)'da  <a href='http://www.google.com/ig/directory?type=themes' target='blank'>iGoogle Temalarýný</a> kullan"
	},
    relook: {
        name: "Yeni görünüm",
        desc: "Özel CSS kullanarak sayfaya yeni görünüm kazandýr"
    },
    favicons: {
        name: "Favori ikonlarý",
        desc: "Her besleme için favori ikon kullan"
    },
    unreadcount: {
        name: "Tüm okunmadý sayýsýný göster",
        desc: "Tüm beslemelerin okunmadý sayýsýný göster"
    },
    fixlayout: {
        name: "Yerleþimi düzelt",
        desc: "Öðe için tam geniþlik, çevresi sarýlmýþ resimlerin eksikliði gibi yerleþim hatalarýný düzelt ve büyük resimlerin ekrana tam oturmasýný saðlaa"
    },
    count: {
        name: "Sayacý düzelt (1000+)",
        desc: "Gerçek okunmadý sayýsýný göster"
    },
    counticon: {
        name: "Ýkon sayacý",
        desc: "Google Reader favori ikonunda okunmadý sayýsýný göster"
    },
    removeads: {
        name: "Reklamlarý engelleme",
        desc: "Basit reklam engelleyici"
    },
    column: {
        name: "Çoklu sütun yazýsý",
        desc: "Gazete gibi çoklu sütun görünümü için bir buton ekle"
    },
    preview: {
        name: "Entegre önizleme",
        desc: "Öðe yerine orijinal sayfanýn tamamýný göstermek için bir buton ekle"
    },
    colorful: {
        name: "Renkli liste gösterimi",
        desc: "Ayný besleme için bir arka plan rengi kullan"
    },
    filter: {
        name: "Öðleleri filtrele",
        desc: "Kullanýcý seçimlerine göre kelimeleri kaldýrarak veya önplana çýkararak öðeleri filtreleme"
    },
	limit: {
        name: "Öðeleri sýnýrlandýrma",
        desc: "Bir sayfda gösterilen öðe sayýsýný sýnýrlandýr. Okunan öðeler bir aralýða sýðmak için kaldýrýlýr."
    },
    readbymouse: {
        name: "Fare ile okuma",
        desc: "Farenin sað/sol düðmesi ile Sonraki/Önceki öðeyi okuma"
    },
    facebook: {
        name: "Facebook",
        desc: "Haberleri Facebook'ta paylaþmak için bir buton ekle"
    },
    twitter: {
        name: "Twitter",
        desc: "Haberleri Twitter'da paylaþmak için bir buton ekle"
    },
    instapaper: {
        name: "Instapaper",
        desc: "Haberleri daha sonra Instapaper kullanarak okumak için bir buton ekle"
    },
	readitlater: {
        name: "ReadItLater",
        desc: "Haberleri daha sonra ReadItLater kullanarak okumak için bir buton ekle"
    },
    mark: {
        name: "Okundu olarak iþaretle",
        desc: "Öðeleri þu an okumadan önce/sonra okundu olarak iþaretle"
    },
    jump: {
        name: "Yukarý/aþaðý baðlantýlarý ekleme",
        desc: "En üstteki öðeye 'en aþaðýya git' ikonu, en alttaki öðeye 'en yukarý git' ikonu ekle"
    },
    fitheight: {
        name: "Yüksekliði ayarla",
        desc: "Açýk olan haberlerin yüksekliðini ekran yüksekliðine ayarla (uzun makaleler için)"
    },
    closeentry: {
        name: "Öðeyi kapama",
        desc: "Her öðeye kaldýrmak için bir 'kapat' butonu ekle"
    },
    openbackground: {
        name: "Arka planda açma",
        desc: "Her öðe için 'arka planda aç' butonu ekle"
    },
    replacer: {
        name: "Deðiþtirme",
        desc: "Öðeyi orijinal sayfanýn bir parçasýyla deðiþtir. Þu an karikatürleri almak için kullanýlýyor.<br/>jolan78'e orijinal fikri ve scripti için teþekkürler."
    },
    aero: {
        name: "Google Aero Araç Çubuðu",
        desc: "Aero Temasý kullanan Araç Çubuðu"
    },
    info: {
        name: "SysInfo",
        desc: "Sistem Bilgisi"
    },
    extshortcuts: {
        name: "Kýsayollar",
        desc: "Klavye kýsayollarý"
    },
    pack: {
        name: "Paketler",
        desc: "Öntanýmlý konfigürasyon paketleri"
    },
    thanks: {
        name: "Teþekkürler",
        desc: ""
    },
    about: {
        name: "Hakkýnda",
        desc: "ReaderPlus Hakkýnda"
    }
};
GRP.langs[locale].skins = {
    none: {
        name: "Hiçbiri"
    },
    air: {
        name: "Air Skin"
    },
    aircomic: {
        name: "Air Skin Comic Sans"
    },
    black: {
        name: "Google Geliþmiþ Siyah"
    },
    dark: {
        name: "Koyu Görünüm"
    },
    darkgray: {
        name: "Koyu Gri Görünüm"
    },
    helvetireader: {
        name: "Helvetireader"
    },
    minimal: {
        name: "Minimalistik Görünüm"
    },
    optimized: {
        name: "Optimize Görünüm"
    },
    portal: {
        name: "Portal Temasý"
    },
    player: {
        name: "Oynatýcý Temasý"
    },
    osxblue: {
        name: "Mac OS X Snow Leopard - Mavi"
    },
    osxblack: {
        name: "Mac OS X Snow Leopard - Siyah"
    },
	calibri: {
        name: "Calibri Görünüm"
    },
    glassblackgold: {
        name: "Parlak Siyah Altýn Görünüm"
    },
    simpleclean: {
        name: "Basit ve Temiz"
    },
    peacockfeather: {
        name: "Tavuskuþu Tüyü"
    },
    myowngooglereader: {
        name: "Benim Google Reader'ým"
    },
    compactcleantweaked: {
        name: "Kompakt, Temiz & Düzeltilmiþ"
    },
    absolutelycompact: {
        name: "Tamamen Kompakt"
    },
    darkshinyblue: {
        name: "Koyu Parlak Mavi"
    },
	persian: {
        name: "Optimize Farsi"
    }
};
