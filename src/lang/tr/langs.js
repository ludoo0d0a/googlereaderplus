/**
 * ReaderPlus
 * Translation
 *
 * **************************
 * tr : Türkçe
 * **************************
 *
 * Version : 1.3
 * Date : 04-30-2010
 * @author Ata Ýsmet Özçelik (ataozcelik@gmail.com)
 */
var locale = 'tr';
namespace('GRP.langs.' + locale);
GRP.langs[locale].texts = {
    version: "sürüm",
    closeentry: {
        text: 'Bu öðeyi kapat',
        keyword: 'Kapat'
    },
    colorful: {},
    column: {
        text: 'Çoklu sütun görününümde göster',
        keyword: 'Sütun',
        summary: 'Öðe ekle/düzelt',
        desc: 'Sütunlarý yönet'
    },
    facebook: {
        text: 'Bu haberleri Facebook\'ta paylaþ',
        keyword: 'Facebook'
    },
    twitter: {
        text: 'Bu haberleri Twitter\'da paylaþ',
        keyword: 'Twitter',
        plslogin: 'Lütfen Twitter\'a giriþ yapýn',
        toolong: "Mesaj çok uzun!",
        notetoolong: "<b>Öðe ile beraber gidecek not :</b> (Opsiyonel, {0}  karakter kaldý)",
        notemax: "<b>Öðe ile beraber gidecek not:</b> (Opsiyonel, 140 karakterden fazla olamaz)",
        text_title: 'Baþlýk',
        text_tag: 'Etiket',
        text_url: 'URL',
        text_send: 'Gönder',
        text_count: 'Sayaç',
        text_cancel: 'Vazgeç',
        text_shortener: 'Kýsa url',
        shortfailed: "Üzgünüm, kýsa url'i kullanmaya çalýþýrken bir hata oluþtu!\n\r{0}"
    },
	readit: {
        password: 'Varsa, þifreniz:',
        wronglogin: 'Yanlýþ kullanýcý adý veya þifre, lütfen kontrol ediniz!!',
nologin: 'Bu özellik için kullanýcý adý gerekiyor, lütfen özellikleri deðiþtiriniz!!',
        error: 'Serviste bir hata oluþtu. Lütfen daha sonra tekrar deneyiniz.',
        badrequest: 'Yanlýþ istek. Muhtemelen url gibi gerekli bir parametre eksik.',
        saving: 'Kaydediliyor',
        shortcut_readitlater: 'Instapaper ile daha sonra okuyun'
    },
    instapaper: {
        text: 'Instapaper ile daha sonra oku',
        keyword: 'Instapaper',
        plslogin: 'Instapaper\'a giriþ yapýn',
        login: 'Email veya kullanýcý adý:'
	},
	readitlater: {
        text: 'ReadItLater ile daha sonra oku',
        keyword: 'ReadItLater',
        plslogin: 'ReadItLater\'a giriþ yapýn',
		rateexceeded:'Oran sýnýrýna ulaþýldý, tekrar göndermeden önce biraz bekleyin',
		maintenance:'Read It Later\'ýn senkronizasyon sunucusu zamanlanmýþ bakým için devre dýþý'
	},
    favicons: {
        preferences: 'Özellikler',
        getfavicon: 'Favori Ýkonlarý alma',
        notfoundicon: '"{0}" için favori ikonu bulunamadý',
        summary: 'Öðeleri ekle/düzelt',
        desc: 'Favori ikonlarý yönet'
    },
    filter: {
        settings: 'Filtreleme ayarlarý',
        excludes: 'Hariç tutar',
        highlights: 'Vurgular',
        highlight: 'Vurgulama',
        exclude: 'Hariç',
        hideduplicates: 'Duplikasyonlarý Gizle',
        hideexcludes: 'Hariçleri Gizle',
        preferehighlights: 'Vurgulananlarý hariçlerden öncelikli tut',
        update: 'Güncelle',
        quickadd: 'Hýzlý Ekle',
        add: 'Ekle',
        close: 'Kapat',
        edit: 'Düzelt',
        remove: 'Kaldýr'
    },
    fitheight: {
        text: 'Yüksekliði Ayarla',
        keyword: 'Yüksekliði Ayarla'
    },
    jump: {
        textbottom: 'En aþaðýya git',
        texttop: 'En yukarý git',
        keywordtop: 'yukarý'
    },
    openbackground: {
        text: 'Arka planda aç',
        keyword: 'Aç'
    },
    preview: {
        text: 'Haberlerin entegre önizlemesi',
        title: 'Önizleme olarak aç',
        opennewtab: 'Yeni pencerede aç',
        keyword: 'Önizleme',
overlay_next: 'Sonraki',
overlay_previous: 'Önceki',
overlay_close: 'Kapat',
overlay_category: 'Kategori'
    },
    readbymouse: {
        middleclick: 'Orta klik',
        openintab: 'Sekmede Açar',
        openinbacktab: 'Arkaplandaki sekmede açar',
        shares: 'Paylaþýr',
        stars: 'Yýldýzlar',
        tag: 'Etiket',
        addtag: 'Etiket Ekle',
        on: 'ReadByMouse Açýk',
        off: 'ReadByMouse Kapalý'
    },
    replacer: {
        nomatch: 'Eþleþme bulunamadý.',
        loading: 'Yükleniyor ...'
    },
    lightbox: {
        text: 'Medya öðeleri LightBox ile göster',
        keyword: 'Light'
    },
	ig: {
        menu_prefs: 'Reader+ tercihler',
        menu_theme: 'Reader+ tema',
		menu_randomtheme: 'Temayý deðiþtir :'
    },
	menu:{
        label: 'Ekstra'
	}
};
GRP.langs[locale].prefs = {
    global: {
        title: "Reader Plus",
        "val-save": "Kaydet",
        alreadyexist: "Öðe zaten mevcut!",
		snew:'yeni!',
		supdated:'Güncellendi!',
prefssaved:"Tercihler kaydedildi!",
cachecleared:"Önbellek boþaltýldý!"
    },
    theme: {
        noborder: "Tek bir sayfada daha fazla öðe göstermek için sýnýrlarý kaldýr",
		mytheme: '"MyTheme" temasýya ve font rengiyle <a href="http://code.google.com/p/googlereaderplus/wiki/Backgrounds" target="blank">özel arka plan resmi </a> kullan',
		url:'Resim URL',
		color:'Yazý rengi',
		bg:'Arka plan rengi',
clearcache:'Önbelleði boþalt'
    },
	ig: {
		warning:'Bazý temalar düzgün görünmeyebilir ; Bu bir Beta özelliðidir!',
		skin_name:'iGoogle tema adý',
		skin_url:'iGoogle tema URL',
		debug:'Debug modu (Sadece debug için)',
		randomtime:'Dinamik tema zaman kontrolü yerine rastgele deðiþir',
		userandomthemes:'Tema otomatik olarak rastgele deðiþir',
		randomthemes:'Temayý þu kadar dakikada bir deðiþtir',
		add:'Þimdi ekle',
        next:'Sonraki',
        previous:'Önceki',
		random:'Rastgele',
        search:'Tema ara'
	},
    about: {
        thanks1: '<td><span class="top_right"><img src="images/48.png"></span><h1>Teþekkürler...</h1>' +
        '<p>... <strong>Reader Plus</strong> yüklediniz veya son sürüme güncellediniz!</p>' +
        '<p>Eklentinin konfigürasyonu için <a href="preferences.html" title="Go to the preferences page"><strong>tercihler sayfasýna </strong></a> baktýðýnýza emin olun.</p>' +
        '<p><a href="https://chrome.google.com/webstore/detail/hhcknjkmaaeinhdjgimjnophgpbdgfmg" target="_blank" title="Visit extension homepage"><strong> Google Chrome Eklenti galeri sayfasýný ziyaret edin!</strong></a></p>' +
        '<p><a href="http://www.twitter.com/ludoo0d0a"><img src="http://twitter-badges.s3.amazonaws.com/follow_me-a.png" alt="Follow me on Twitter"/></a></p>' +
        '<p></p></td>',
        thanks2: '<td><p>Eklentiyi beðendiyseniz ve daha fazla özellik istiyorsanýz, baðýþ yapmaktan çekinmeyin.</p>' +
        '<p>Bu sayede,tüm kodu yazmak için bir kamyon kahve alabilirim :)</p>' +
        '<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=FK9P8MNY9MGZL&lc=US&item_name=GoogleReaderPlus%20project&currency_code=EUR&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted"><img alt="Donate" border="0" src="https://www.paypal.com/en_US/i/btn/btn_donate_SM.gif" width="74" height="21"></a></td>',
		//whatsnew:'<td><h2>Neler yeni!!</h2><ul><li>Yeni temalarý deneyin</li><li>veya yeni "MyTheme" temasýyla özel bir arkaplan kullanýn</li><li>veya bir rastgele <a href="http://www.google.com/ig/directory?type=themes" target="blank">iGoogle</a> temasý kullanýn</li><li>Lightbox olarak önizleme yapýn</li><li><a href="http://www.readitlater.com" target="blank">ReadItLater</a> kullanarak öðeleri paylaþ</li><li> Öðeler için özel iþlemler (genel)</li><li>Haberleri tercüme et</li></ul></td>',
nopopup:'<p>Güncellemelerle ilgili uyarýlmak istemiyorsanýz, <a href="preferences.html#general">Genel Bölümdeki</a> "Güncellemelerde uyarý mesajý çýkmasýn" seçeneðini iþaretleyin.</p>'
    },
    link: {
        reader: "<span>Google Reader</span>RSS okuyucunuz",
        issues: "<span>Olay bildir</span>Hata mý buldunuz veya öneriniz mi var?",
        download: "<span>Google Eklentisi</span>Ýndirme adresi",
        about: "<span>Hakkýnda </span>Hakkýnda, teþekkürler,...",
        site: "<span>Web sayfasý</span>Kiþisel Web sayfam",
        twitter: "<span><img width=\"160\" height=\"27\" src=\"http://twitter-badges.s3.amazonaws.com/follow_me-a.png\" alt=\"Follow ludoo0d0a on Twitter\"></span>Haberleri ve güncellemeleri takip edin",
        donate: '<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&amp;business=FK9P8MNY9MGZL&amp;lc=US&amp;item_name=googlereaderplus%20project&amp;currency_code=EUR&amp;bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted"><span><img alt="Donate" border="0" src="https://www.paypal.com/en_US/i/btn/btn_donate_SM.gif" width="74" height="21"></span>Bana bir kahve ýsmarlayýn!</a>',
        translate: '<span>Çeviri</span>Çeviri için bana yardým edin</a>'
    },
    column: {
        count: "Sütun sayýsý",
        locked: "Aþaðýdaki beslemeler  hariç, her zaman aktif:",
        pagebreak: "Uzun makalaleri gazetedeki gibi sayfa sayfa okumak için parçalara ayýrýn.",
        entersite: "Sitenin URL'sini girin"
    },
	translate: {
        lang:"Ýçeriði þu dile çevir ",
		locked: "Her zaman aktif, þu hariç:",
        include:"Sadece þu beslemeleri içersin:",
		entersite: "Sitenin URL'sini girin"
    },
    twitter: {
        shortener: "Kýsaltýcý",
        shortener_bitly: "BitLy konfigürasyonu (opsiyonel):",
        shortener_login: "Giriþ",
        shortener_apikey: "ApiKey",
        shortener_pwd: "Þifre"
    },
    instapaper: {
auth: "<a href='http://www.instapaper.com' target='blank'>Instapaper</a> yetkilendirmesi:",
        username: "Kullanýcý Adý:",
password: "Þifre (opsiyonel):"
    },
readitlater: {
	auth: "<a href='http://www.readitlaterlist.com' target='blank'>ReadItLater</a> <a href='http://readitlaterlist.com/signup' target='blank'>yetkilendirmesi</a> (gerekli):",
	username: "Kullanýcý Adý:",
	password: "Þifre:"
},
    colorful: {
        tree: "Sol navigasyon aðacýnda etiket renklerini göster"
    },
    general: {
        counter: "Araç çubuðu ikonunda okunmadý sayýsýný göster",
        opendirect: "Ýkona týklarsanýz GoogleReader açýlýr",
        secure: "Her zaman güvenli protokol (https) kullan",
topcurrent: "Þu anki öðe her zaman en üstte",
floatactions: "Öðe iþlemleri ayrý bir pencere olarak görüntülenir",
noupdatepopup: "Güncellemelerde uyarý gösterme",
        icontoolbar_add: "Araç çubuðuna düðme ve buton eklemek için, lütfen  <a href=\"https://chrome.google.com/webstore/detail/ecpcafinfpjgabomoamkhkgnpgpmdmeo\">yükleyin ve kurun</a>.",
        icontoolbar_text: "<span>Butonu opsiyonel yapmak için, ayrý bir eklenti olarak sunduk; </span>                                    <br>                                    <span>readerplus ile farklý paketlerde yer alýyor.</span>                                    <br>                                    <span>To add the button, click <b></b> on the <a href=\"https://chrome.google.com/webstore/detail/ecpcafinfpjgabomoamkhkgnpgpmdmeo\">readerplus Toolbar button</a> page.</span><span>To remove the button, right click him and choose Disable.</span>",
        importexport_text: "Artýk tercihlerinizi  'dýþa aktar' ile kaydedip daha sonra 'içe aktar' ile geri yükleyebilirsiniz, ancak verinizin <a href='http://jsonformatter.curiousconcept.com/' target='blank'>JSON compliant</a> olduðundan emin olun:",
        confirmimport: "Bu konfigürasyonu içe aktarmak istediðiniden emin misiniz?\nMevcut konfigürasyon SÝLÝNECEKTÝR!"
    },
	limit:{
		slidewindow: "Kayarpencere - öðe sayýsýný sýnýrla",
		mini: "En az öðe",
		maxi: "En fazla öðe"
	},
    removeads: {
        links: "Baðlantý filtresi:",
        images: "Resim filtresi:",
        iframes: "Iframe filtresi:"
    },
    preview: {
        onicon: "Baþlýðýn hemen saðýndaki ikona týklayýnca entregre önizlemyi göster (Seçilmezse, baþlýða týklayýnca)",
        locked: "Her zaman aktif, þu beslemeler hariç:",
overlay:'Tam ekran önizleme (Lightbox)'
    },
    fitheight: {
        locked: "Her zaman aktif, þu beslemeler hariç:"
    },
	filter: {
        searchbody: "Baþlýðýn ve gövde metnin içerisinde ara"
    },
    favicons: {
        providerpageicons: ' <a href="http://pageicons.appspot.com" target="blank">Sayfa ÝkonlarýPageIcons</a> saðlayýcýsý kullan (Tüm ikonlarý baþarýyla yüklemek için önerilir)',
        sidebaronly: "Yan tarafta sadece favori ikonlarý göster",
        custom: "Özel favori ikonlarýnýzý girin :",
        add: "Ekle",
        tip: "Ýpucu: Sol taraftaki sað buton menüsü \"Favori ikon al\" kullanýlarak kolayca eklenebilir",
        manual: "Her site için manuel favori ikonlarý (önerilmez ; daha yavaþ)",
        parsing: "Bu özellik favori ikonlarý her ana sayfada arayarak bulur",
        entersite: "Sitenin  URL'ini girin",
        prompticon: "Ýkon  url'ini girin (otomatik almak için boþ býrakýn):"
    },
    replacer: {
        intro: 'Regex yerine doðru xpath\'i tanýmlamak için  <a href="http://karmatics.com/aardvark/bookmarklet.html" target="blank">Aardvark bookmarklet</a> kullanabilirsiniz (Ön ek "xpath:" kullanýn)',
        link: "Baðlantý Regex",
        from: "Regex/xpath Ara",
        to: "Deðiþtir",
		prompttitle: "Bu filtre için baþlýk"
    },
    lightbox: {
        locked: "Her zaman aktif, þu beslemeler hariç:"
    },
    relook: {
        css: "CSS ",
        resize: "Tam ekrana adapte olmak için yeniden boyutlandýmra olayýný çaðýr"
    },
    pack: {
        mini: "<span>Paket Mini</span>En iyi okuma için minimum",
        ludoo: "<span>Paket LudoO</span>Bir klikte en iyi özellikler",
        full: "<span>Paket Full</span>Tüm özellikler aktifleþtirilmiþ",
        reset: "<span>Paket Reset</span>Konfigurasyonu resetle",
        confirmdel: "Bu tüm tercihlerinizi SÝLECEK ve resetleyecektir. Emin misiniz ?"
    },
    extshortcuts: {
        custom: "Özel kýsayýllarýnýz",
        official: "Google Reader resmi kýsayollarý",
        alreadyusedprefs: "Tercihlerinizde zaten kullanýlýyor!",
        alreadyusedgoogle: "Google tarafýndan zaten kullanýlýyor!"
    },
    thanks: {
        donators: "Bu projeye katký saðlayan baðýþçýlara teþekkürler",
        translators: "Harika iþ için cesur tercümanlara teþekkürler",
        authors: "Orijinal tema ve script yazarlarýna teþekkürler (Greasemonkey ve Stylish)"
    }
};
