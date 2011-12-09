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
 * @author Ata İsmet Özçelik (ataozcelik@gmail.com) + S.U
 */
var locale = 'tr';
namespace('GRP.langs.' + locale);
GRP.langs[locale].texts = {
    version: "sürüm",
    closeentry: {
        text: 'Bu öğeyi kapat',
        keyword: 'Kapat'
    },
    colorful: {},
    column: {
        text: 'Çoklu sütun görününümde göster',
        keyword: 'Sütun',
        summary: 'Öğe ekle/düzelt',
        desc: 'Sütunları yönet'
    },
    facebook: {
        text: 'Bu haberleri Facebook\'ta paylaş',
        keyword: 'Facebook'
    },
    twitter: {
        text: 'Bu haberleri Twitter\'da paylaş',
        keyword: 'Twitter',
        plslogin: 'Lütfen Twitter\'a giriş yapın',
        toolong: "Mesaj çok uzun!",
        notetoolong: "<b>Öğe ile beraber gidecek not :</b> (Opsiyonel, {0}  karakter kaldı)",
        notemax: "<b>Öğe ile beraber gidecek not:</b> (Opsiyonel, 140 karakterden fazla olamaz)",
        text_title: 'Başlık',
        text_tag: 'Etiket',
        text_url: 'URL',
        text_send: 'Gönder',
        text_count: 'Sayaç',
        text_cancel: 'Vazgeç',
        text_shortener: 'Kısa url',
        shortfailed: "Üzgünüm, kısa url'yi kullanmaya çalışırken bir hata oluştu!\n\r{0}"
    },
	readit: {
        password: 'Varsa, şifreniz:',
        wronglogin: 'Yanlış kullanıcı adı veya şifre, lütfen kontrol ediniz!!',
nologin: 'Bu özellik için kullanıcı adı gerekiyor, lütfen özellikleri değiştiriniz!!',
        error: 'Serviste bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.',
        badrequest: 'Yanlış istek. Muhtemelen url gibi gerekli bir parametre eksik.',
        saving: 'Kaydediliyor',
        shortcut_readitlater: 'Instapaper ile daha sonra okuyun'
    },
    instapaper: {
        text: 'Instapaper ile daha sonra oku',
        keyword: 'Instapaper',
        plslogin: 'Instapaper\'a giriş yapın',
        login: 'Email veya kullanıcı adı:'
	},
	readitlater: {
        text: 'ReadItLater ile daha sonra oku',
        keyword: 'ReadItLater',
        plslogin: 'ReadItLater\'a giriş yapın',
		rateexceeded:'Oran sınırına ulaşıldı, tekrar göndermeden önce biraz bekleyin',
		maintenance:'Read It Later\'ın senkronizasyon sunucusu zamanlanmış bakım için devre dışı'
	},
    favicons: {
        preferences: 'Özellikler',
        getfavicon: 'Favori ıkonları alma',
        notfoundicon: '"{0}" için favori ikonu bulunamadı',
        summary: 'Öğeleri ekle/düzelt',
        desc: 'Favori ikonları yönet'
    },
    filter: {
        settings: 'Filtreleme ayarları',
        excludes: 'Hariç tutar',
        highlights: 'Vurgular',
        highlight: 'Vurgulama',
        exclude: 'Hariç',
        hideduplicates: 'Duplikasyonları Gizle',
        hideexcludes: 'Hariçleri Gizle',
        preferehighlights: 'Vurgulananları hariçlerden öncelikli tut',
        update: 'Güncelle',
        quickadd: 'Hızlı Ekle',
        add: 'Ekle',
        close: 'Kapat',
        edit: 'Düzelt',
        remove: 'Kaldır'
    },
    fitheight: {
        text: 'Yüksekliği Ayarla',
        keyword: 'Yüksekliği Ayarla'
    },
    jump: {
        textbottom: 'En aşağıya git',
        texttop: 'En yukarı git',
        keywordtop: 'yukarı'
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
        shares: 'Paylaşır',
        stars: 'Yıldızlar',
        tag: 'Etiket',
        addtag: 'Etiket Ekle',
        on: 'ReadByMouse Açık',
        off: 'ReadByMouse Kapalı'
    },
    replacer: {
        nomatch: 'Eşleşme bulunamadı.',
        loading: 'Yükleniyor ...'
    },
    lightbox: {
        text: 'Medya öğeleri LightBox ile göster',
        keyword: 'Light'
    },
	ig: {
        menu_prefs: 'Reader+ tercihler',
        menu_theme: 'Reader+ tema',
		menu_randomtheme: 'Temayı değiştir :'
    },
	menu:{
        label: 'Ekstra'
	}
};
GRP.langs[locale].prefs = {
    global: {
        title: "Reader Plus",
        "val-save": "Kaydet",
        alreadyexist: "Öğe zaten mevcut!",
		snew:'yeni!',
		supdated:'Güncellendi!',
prefssaved:"Tercihler kaydedildi!",
cachecleared:"Önbellek boşaltıldı!"
    },
    theme: {
		mytheme: '"MyTheme" temasıya ve font rengiyle <a href="http://code.google.com/p/googlereaderplus/wiki/Backgrounds" target="blank">özel arka plan resmi </a> kullan',
		url:'Resim URL',
		color:'Yazı rengi',
		bg:'Arka plan rengi',
clearcache:'Önbelleği boşalt'
    },
	ig: {
		warning:'Bazı temalar düzgün görünmeyebilir ; Bu bir Beta özelliğidir!',
		skin_name:'iGoogle tema adı',
		skin_url:'iGoogle tema URL',
		debug:'Debug modu (Sadece debug için)',
		randomtime:'Dinamik tema zaman kontrolü yerine rastgele değişir',
		userandomthemes:'Tema otomatik olarak rastgele değişir',
		randomthemes:'Temayı şu kadar dakikada bir değiştir',
		add:'şimdi ekle',
        next:'Sonraki',
        previous:'Önceki',
		random:'Rastgele',
        search:'Tema ara'
	},
    about: {
        thanks1: '<td><span class="top_right"><img src="images/48.png"></span><h1>Teşekkürler...</h1>' +
        '<p>... <strong>Reader Plus</strong> yüklediniz veya son sürüme güncellediniz!</p>' +
        '<p>Eklentinin konfigürasyonu için <a href="preferences.html" title="Go to the preferences page"><strong>tercihler sayfasına </strong></a> baktığınıza emin olun.</p>' +
        '<p><a href="https://chrome.google.com/webstore/detail/hhcknjkmaaeinhdjgimjnophgpbdgfmg" target="_blank" title="Visit extension homepage"><strong> Google Chrome Eklenti galeri sayfasını ziyaret edin!</strong></a></p>' +
        '<p><a href="http://www.twitter.com/ludoo0d0a"><img src="http://twitter-badges.s3.amazonaws.com/follow_me-a.png" alt="Follow me on Twitter"/></a></p>' +
        '<p></p></td>',
        thanks2: '<td><p>Eklentiyi beğendiyseniz ve daha fazla özellik istiyorsanız, bağış yapmaktan çekinmeyin.</p>' +
        '<p>Bu sayede,tüm kodu yazmak için bir kamyon kahve alabilirim :)</p>' +
        '<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=FK9P8MNY9MGZL&lc=US&item_name=GoogleReaderPlus%20project&currency_code=EUR&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted"><img alt="Donate" border="0" src="https://www.paypal.com/en_US/i/btn/btn_donate_SM.gif" width="74" height="21"></a></td>',
		//whatsnew:'<td><h2>Neler yeni!!</h2><ul><li>Yeni temaları deneyin</li><li>veya yeni "MyTheme" temasıyla özel bir arkaplan kullanın</li><li>veya bir rastgele <a href="http://www.google.com/ig/directory?type=themes" target="blank">iGoogle</a> teması kullanın</li><li>Lightbox olarak önizleme yapın</li><li><a href="http://www.readitlater.com" target="blank">ReadItLater</a> kullanarak öğeleri paylaş</li><li> Öğeler için özel işlemler (genel)</li><li>Haberleri tercüme et</li></ul></td>',
nopopup:'<p>Güncellemelerle ilgili uyarılmak istemiyorsanız, <a href="preferences.html#general">Genel Bölümdeki</a> "Güncellemelerde uyarı mesajı çıkmasın" seçeneğini işaretleyin.</p>'
    },
    link: {
        reader: "<span>Google Reader</span>RSS okuyucunuz",
        issues: "<span>Olay bildir</span>Hata mı buldunuz veya öneriniz mi var?",
        download: "<span>Google Eklentisi</span>ındirme adresi",
        about: "<span>Hakkında </span>Hakkında, teşekkürler,...",
        site: "<span>Web sayfası</span>Kişisel Web sayfam",
        twitter: "<span><img width=\"160\" height=\"27\" src=\"http://twitter-badges.s3.amazonaws.com/follow_me-a.png\" alt=\"Follow ludoo0d0a on Twitter\"></span>Haberleri ve güncellemeleri takip edin",
        donate: '<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&amp;business=FK9P8MNY9MGZL&amp;lc=US&amp;item_name=googlereaderplus%20project&amp;currency_code=EUR&amp;bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted"><span><img alt="Donate" border="0" src="https://www.paypal.com/en_US/i/btn/btn_donate_SM.gif" width="74" height="21"></span>Bana bir kahve ısmarlayın!</a>',
        translate: '<span>Çeviri</span>Çeviri için bana yardım edin</a>'
    },
    column: {
        count: "Sütun sayısı",
        locked: "Aşağıdaki beslemeler  hariç, her zaman aktif:",
        pagebreak: "Uzun makalaleri gazetedeki gibi sayfa sayfa okumak için parçalara ayırın.",
        entersite: "Sitenin URL'sini girin"
    },
	translate: {
        lang:"ıçeriği şu dile çevir ",
		locked: "Her zaman aktif, şu hariç:",
        include:"Sadece şu beslemeleri içersin:",
		entersite: "Sitenin URL'sini girin"
    },
    twitter: {
        shortener: "Kısaltıcı",
        shortener_bitly: "BitLy konfigürasyonu (opsiyonel):",
        shortener_login: "Giriş",
        shortener_apikey: "ApiKey",
        shortener_pwd: "şifre"
    },
    instapaper: {
auth: "<a href='http://www.instapaper.com' target='blank'>Instapaper</a> yetkilendirmesi:",
        username: "Kullanıcı Adı:",
password: "şifre (opsiyonel):"
    },
readitlater: {
	auth: "<a href='http://www.readitlaterlist.com' target='blank'>ReadItLater</a> <a href='http://readitlaterlist.com/signup' target='blank'>yetkilendirmesi</a> (gerekli):",
	username: "Kullanıcı Adı:",
	password: "şifre:"
},
    colorful: {
        tree: "Sol navigasyon ağacında etiket renklerini göster"
    },
    general: {
        counter: "Araç çubuğu ikonunda okunmadı sayısını göster",
        opendirect: "İkona tıklarsanız GoogleReader açılır",
        secure: "Her zaman güvenli protokol (https) kullan",
        noupdatepopup: "Güncellemelerde uyarı gösterme",
        icontoolbar_add: "Araç çubuğuna düğme ve buton eklemek için, lütfen  <a href=\"https://chrome.google.com/webstore/detail/ecpcafinfpjgabomoamkhkgnpgpmdmeo\">yükleyin ve kurun</a>.",
        icontoolbar_text: "<span>Butonu opsiyonel yapmak için, ayrı bir eklenti olarak sunduk; </span>                                    <br>                                    <span>readerplus ile farklı paketlerde yer alıyor.</span>                                    <br>                                    <span>To add the button, click <b></b> on the <a href=\"https://chrome.google.com/webstore/detail/ecpcafinfpjgabomoamkhkgnpgpmdmeo\">readerplus Toolbar button</a> page.</span><span>To remove the button, right click him and choose Disable.</span>",
        importexport_text: "Artık tercihlerinizi  'dışa aktar' ile kaydedip daha sonra 'içe aktar' ile geri yükleyebilirsiniz, ancak verinizin <a href='http://jsonformatter.curiousconcept.com/' target='blank'>JSON compliant</a> olduğundan emin olun:",
        confirmimport: "Bu konfigürasyonu içe aktarmak istediğiniden emin misiniz?\nMevcut konfigürasyon SıLıNECEKTıR!"
    },
    generallayout:{
		noborder: "Tek bir sayfada daha fazla öğe göstermek için sınırları kaldır",
		topcurrent: "şu anki öğe her zaman en üstte",
		//bottomup : 'Footer toolbar on the top',
		//currdir : 'Highlight folder of current entry <span class="new">new!</span>',
		floatactions: "Öğe işlemleri ayrı bir pencere olarak görüntülenir"
		//icons : 'Icons only for action buttons (except checkbox) <span class="new">new!</span>',
		//hidetoolbar: 'Hide user toolbar',
		//hideplus: 'Hide GooglePlus button'
	},
	limit:{
		slidewindow: "Kayarpencere - öğe sayısını sınırla",
		mini: "En az öğe",
		maxi: "En fazla öğe"
	},
    removeads: {
        links: "Bağlantı filtresi:",
        images: "Resim filtresi:",
        iframes: "Iframe filtresi:"
    },
    preview: {
        onicon: "Başlığın hemen sağındaki ikona tıklayınca entregre önizlemyi göster (Seçilmezse, başlığa tıklayınca)",
        locked: "Her zaman aktif, şu beslemeler hariç:",
overlay:'Tam ekran önizleme (Lightbox)'
    },
    fitheight: {
        locked: "Her zaman aktif, şu beslemeler hariç:"
    },
	filter: {
        searchbody: "Başlığın ve gövde metnin içerisinde ara"
    },
    favicons: {
        providerpageicons: ' <a href="http://pageicons.appspot.com" target="blank">Sayfa ıkonlarıPageIcons</a> sağlayıcısı kullan (Tüm ikonları başarıyla yüklemek için önerilir)',
        sidebaronly: "Yan tarafta sadece favori ikonları göster",
        custom: "Özel favori ikonlarınızı girin :",
        add: "Ekle",
        tip: "ıpucu: Sol taraftaki sağ buton menüsü \"Favori ikon al\" kullanılarak kolayca eklenebilir",
        manual: "Her site için manuel favori ikonları (önerilmez ; daha yavaş)",
        parsing: "Bu özellik favori ikonları her ana sayfada arayarak bulur",
        entersite: "Sitenin  URL'ini girin",
        prompticon: "ıkon  url'ini girin (otomatik almak için boş bırakın):"
    },
    replacer: {
        intro: 'Regex yerine doğru xpath\'i tanımlamak için  <a href="http://karmatics.com/aardvark/bookmarklet.html" target="blank">Aardvark bookmarklet</a> kullanabilirsiniz (Ön ek "xpath:" kullanın)',
        link: "Bağlantı Regex",
        from: "Regex/xpath Ara",
        to: "Değiştir",
		prompttitle: "Bu filtre için başlık"
    },
    lightbox: {
        locked: "Her zaman aktif, şu beslemeler hariç:"
    },
    relook: {
        css: "CSS ",
        resize: "Tam ekrana adapte olmak için yeniden boyutlandımra olayını çağır"
    },
    pack: {
        mini: "<span>Paket Mini</span>En iyi okuma için minimum",
        ludoo: "<span>Paket LudoO</span>Bir klikte en iyi özellikler",
        full: "<span>Paket Full</span>Tüm özellikler aktifleştirilmiş",
        reset: "<span>Paket Reset</span>Konfigurasyonu resetle",
        confirmdel: "Bu tüm tercihlerinizi SıLECEK ve resetleyecektir. Emin misiniz ?"
    },
    extshortcuts: {
        custom: "Özel kısayıllarınız",
        official: "Google Reader resmi kısayolları",
        alreadyusedprefs: "Tercihlerinizde zaten kullanılıyor!",
        alreadyusedgoogle: "Google tarafından zaten kullanılıyor!"
    },
    thanks: {
        donators: "Bu projeye katkı sağlayan bağışçılara teşekkürler",
        translators: "Harika iş için cesur tercümanlara teşekkürler",
        authors: "Orijinal tema ve script yazarlarına teşekkürler (Greasemonkey ve Stylish)"
    }
};
