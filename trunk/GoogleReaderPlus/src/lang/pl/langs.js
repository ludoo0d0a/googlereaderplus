/**
 * ReaderPlus
 * Translation
 *
 * Version : 1.3
 * Date : 22-05-2010
 * @author (voythas) http://voythas.com
 */
var locale = 'pl';
namespace('GRP.langs.' + locale);
GRP.langs[locale].texts = {
    version: "wersja",
    closeentry: {
        text: 'Zamknij ten wpis',
        keyword: 'Zamknij'
    },
    colorful: {},
    column: {
        text: 'Pokaż jako wielokolumnowy układ',
        keyword: 'Kolumna',
        summary: 'Dodaj/edytuj elementy',
        desc: 'Zarządzaj kolumnami'
    },
    facebook: {
        text: 'Podziel się (Facebook)',
        keyword: 'Facebook'
    },
    twitter: {
        text: 'Podziel się (Twitter)',
        keyword: 'Twitter',
        plslogin: 'Proszę zaloguj się na Twitter',
        toolong: "wiadomość jest zbyt długa!",
        notetoolong: "<b>Notka, która pójdzie wraz z wpisem:</b> (Opcjonalne, pozostało {0} znaków)",
        notemax: "<b>Notka, która pójdzie wraz z wpisem:</b> (Opcjonalne, nie więcej niż 140 znaków)",
        text_title: 'Tytuł',
        text_tag: 'Tag',
        text_url: 'Link',
        text_send: 'Wyślij',
        text_count: 'Licz',
        text_cancel: 'Anuluj',
        text_shortener: 'Skróć link',
        shortfailed: "Niestety, wystąpił problem podczas skracania linku!\n\r{0}"
    },
	readit: {
        password: 'Hasło, jeśli posiadasz:',
        wronglogin: 'Zły login lub hasło, proszę sprawdź to!!',
nologin: 'Ta funkcja wymaga loginu, sprawdź ustawienia!!',
        error: 'Serwis napotkał błąd. Proszę spróbować później.',
        badrequest: 'Złe żądanie. Prawdopodobnie brakuje wymaganego parametru, takiego jak link.',
        saving: 'Zapisywanie',
        shortcut_readitlater: 'Przeczytaj później (Instapaper)'
    },
    instapaper: {
        text: 'Przeczytaj później (Instapaper)',
        keyword: 'Instapaper',
        plslogin: 'Proszę zaloguj się na Instapaper',
        login: 'Email lub login:'
	},
	readitlater: {
        text: 'Przeczytaj później (ReadItLater)',
        keyword: 'ReadItLater',
        plslogin: 'Proszę zaloguj się na ReadItLater',
		rateexceeded:'Przekroczono limit prędkości wysyłania wiadomości, proszę trochę odczekać przed ponownym przesłaniem',
		maintenance:'Serwer synchronizujący z ReadItLater jest tymczasowo wyłączony z powodu przerwy technicznej'
	},
    favicons: {
        preferences: 'Ustawienia',
        getfavicon: 'Znajdź favikon',
        notfoundicon: 'Nie można znaleźć favikony dla "{0}"',
        summary: 'Dodaj/edytuj elementy',
        desc: 'Zarządzaj favikonami'
    },
    filter: {
        settings: 'Ustawienia filtrowania',
        excludes: 'Wykluczanie',
        highlights: 'Podkreślania',
        highlight: 'Podkreśl',
        exclude: 'Wyklucz',
        hideduplicates: 'Ukryj duplikaty',
        hideexcludes: 'Ukryj Wykluczenia',
        preferehighlights: 'Preferuj Podkreślenia nad wykluczeniami',
        update: 'Aktualizuj',
        quickadd: 'Dodaj Szybko',
        add: 'Dodaj',
        close: 'Zamknij',
        edit: 'Edytuj',
        remove: 'Skasuj'
    },
    fitheight: {
        text: 'Dopasuj wysokość',
        keyword: 'Dopasuj wysokość'
    },
    jump: {
        textbottom: 'Skocz na dół',
        texttop: 'Skocz na górę',
        keywordtop: 'góra'
    },
    openbackground: {
        text: 'Otwórz w tle',
        keyword: 'Otwórz'
    },
    preview: {
        text: 'Zintegrowany podgląd wpisu',
        title: 'Otwórz jako podgląd',
        opennewtab: 'Otwórz w nowym oknie',
        keyword: 'Podgląd',
overlay_next: 'Następny',
overlay_previous: 'Poprzedni',
overlay_close: 'Zamknij',
overlay_category: 'Kategoria'
    },
    readbymouse: {
        middleclick: 'Kliknięcie rolką',
        openintab: 'Otwiera w karcie',
        openinbacktab: 'Otwiera w karcie w tle',
        shares: 'Dzieli',
        stars: 'Gwiazdka',
        tag: 'Tag',
        addtag: 'Dodaj Tag',
        on: 'CzytajMyszką: Tak',
        off: 'CzytajMyszką: Nie'
    },
    replacer: {
        nomatch: 'Nie znaleziono celu.',
        loading: 'Wczytywanie...'
    },
    lightbox: {
        text: 'Światło na media',
        keyword: 'Światło'
    },
	ig: {
        menu_prefs: 'Czytnik+ - ustawienia',
        menu_theme: 'Czytnik+ - styl',
		menu_randomtheme: 'Zmień styl :'
    },
	menu:{
        label: 'Dodatki'
	}
};
GRP.langs[locale].prefs = {
    global: {
        title: "Czytnik Plus",
        "val-save": "Zapisz",
        alreadyexist: "Element już istnieje!",
		snew:'nowe!',
		supdated:'Zaktualizowane!',
prefssaved:"Zapisano ustawienia!",
cachecleared:"Opróżniono cache!"
    },
    theme: {
        noborder: "Usuń obramowania wpisów, aby wyświetlić więcej elementów na jednej stronie",
		mytheme: 'Użyj <a href="http://code.google.com/p/googlereaderplus/wiki/Backgrounds" target="blank">własny obrazek tła</a> oraz kolor czcionki wraz ze stylem "MyTheme"',
		url:'Link Obrazka',
		color:'Kolor tekstu',
		bg:'Kolor tła',
clearcache:'Opróżnij cache'
    },
	ig: {
		warning:'Niektóre style mogą być wyświetlane niepoprawnie ; jest to funkcja testowa!',
		skin_name:'nazwa stylu iGoogle',
		skin_url:'link do stylu iGoogle',
		debug:'Tryb debugowania (tylko do debugowania)',
		randomtime:'Dynamiczna zmiana stylu uaktywnia się losowo zamiast czasowo',
		userandomthemes:'Styl jest automatycznie przełączany losowo',
		randomthemes:'Zmień styl co (minuty)',
		add:'Dodaj to',
        next:'Następne',
        previous:'Poprzednie',
		random:'Losowo',
        search:'Szukaj styli'
	},
    about: {
        thanks1: '<td><span class="top_right"><img src="images/48.png"></span><h1>Dziękuję...</h1>' +
        '<p>... za zainstalowanie (lub zaktualizowanie) najnowszej wersji <strong>Czytnika Plus</strong>!</p>' +
        '<p>Upewnij się, by sprawdzić <a href="preferences.html" title="Ustawienia"><strong>stronę z ustawieniami</strong></a>, aby skonfigurować  rozszerzenie.</p>' +
        '<p><a href="https://chrome.google.com/extensions/detail/hhcknjkmaaeinhdjgimjnophgpbdgfmg" target="_blank" title="Odwiedź stronę główną"><strong>Odwiedź stronę rozszerzeń Google Chrome!</strong></a></p>' +
        '<p><a href="http://www.twitter.com/ludoo0d0a"><img src="http://twitter-badges.s3.amazonaws.com/follow_me-a.png" alt="Dodaj mnie na Twitterze"/></a></p>' +
        '<p></p></td>',
        thanks2: '<td><p>Jeśli podoba Ci się ta wtyczka i chciałbyś więcej opcji, proszę o dotacje.</p>' +
        '<p>Dzięki temu, mógłbym kupić ciężarówkę kawy, która by pomogła mi przetrwać całą noc pisząc kod :) :)</p>' +
        '<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=FK9P8MNY9MGZL&lc=US&item_name=GoogleReaderPlus%20project&currency_code=EUR&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted"><img alt="Dotacja" border="0" src="https://www.paypal.com/pl_PL/i/btn/btn_donate_SM.gif" width="74" height="21"></a></td>',
		whatsnew:'<td><h2>Co nowego?</h2><ul><li>Wypróbuj nowe style</li><li>lub użyj własnego tła z nowym stylem "MyTheme"</li><li>lub użyj losowego  <a href="http://www.google.com/ig/directory?type=themes" target="blank">stylu iGoogle</a></li><li>Podgląd przy użyciu Lightboxa</li><li>Podziel wpis przy użyciu <a href="http://www.readitlater.com" target="blank">ReadItLater</a></li><li>Akcje dotyczące wpisu w pływającym okienku (Ogólne)</li><li>Tłumaczenie wpisu</li></ul></td>',
nopopup:'<p>Jeśli nie chcesz być powiadamiany o aktualizacjach, zaznacz "Brak powiadomień przy aktualizacji" w <a href="preferences.html#general">sekcji Ogólne</a>.</p>'
    },
    link: {
        reader: "<span>Czytnik Google</span>Twój czytnik RSS",
        issues: "<span>Zgłoś błąd</span>Znalazłeś bug lub masz sugestię?",
        download: "<span>Rozszerzenia Google</span>Tutaj je ściągniesz",
        about: "<span>Info</span>Info, podziękowania...",
        site: "<span>Strona</span>Moja prywatna strona",
        twitter: "<span><img width=\"160\" height=\"27\" src=\"http://twitter-badges.s3.amazonaws.com/follow_me-a.png\" alt=\"Follow ludoo0d0a on Twitter\"></span>Dodaj mnie na Twitterze",
        donate: '<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&amp;business=FK9P8MNY9MGZL&amp;lc=US&amp;item_name=googlereaderplus%20project&amp;currency_code=EUR&amp;bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted"><span><img alt="Donate" border="0" src="https://www.paypal.com/pl_PL/i/btn/btn_donate_SM.gif" width="74" height="21"></span>Postaw mi kawę!</a>',
        translate: '<span>Tłumaczenia</span>Pomóż mi przetłumaczyć</a>'
    },
    column: {
        count: "Liczba kolumn",
        locked: "Zawsze aktywne, oprócz tych kanałów:",
        pagebreak: "Podziel długie artykuły, aby mogłyby być czytane strona po stronie, jak gazeta.",
        entersite: "Podaj link do strony"
    },
	translate: {
        lang:"Przetłumacz zawartość ",
		locked: "Zasze aktywne oprócz dla:",
        include:"Tylko aktywuj dla tych kanałów:",
		entersite: "Podaj link do strony"
    },
    twitter: {
        shortener: "Skracacz",
        shortener_bitly: "Konfiguracja BitLy (niewymagane):",
        shortener_login: "Login",
        shortener_apikey: "Klucz API",
        shortener_pwd: "Hasło"
    },
    instapaper: {
auth: "<a href='http://www.instapaper.com' target='blank'>Instapaper</a> uwierzytelnienie:",
        username: "Login:",
password: "Hasło (niewymagane):"
    },
readitlater: {
	auth: "<a href='http://www.readitlaterlist.com' target='blank'>ReadItLater</a> <a href='http://readitlaterlist.com/signup' target='blank'>uwierzytelnienie</a> (wymagane):",
	username: "Login:",
	password: "Hasło:"
},
    colorful: {
        tree: "Pokaż etykiety kolorów w lewym panelu nawigacji"
    },
    general: {
        counter: "Pokaż licznik nieprzeczytanych wiadomości w ikonie na pasku narzędzi",
        opendirect: "Kliknięcie w ikonę otwiera stronę Czytnika Google",
        secure: "Zawsze wymuś bezpieczny protokół (https)",
topcurrent: "Aktualny wpis zawsze na górze",
floatactions: "Opcje dotyczące wpisu wyświetlone w pływającym oknie",
noupdatepopup: "Brak powiadomień przy aktualizacji",
        icontoolbar_add: "Aby dodać przycisk z ikoną na pasku narzędziowym, proszę <a href=\"https://chrome.google.com/extensions/detail/ecpcafinfpjgabomoamkhkgnpgpmdmeo\">ściągnąć oraz zainstalować to.</a>.",
        icontoolbar_text: "<span>Aby zrobić przycisk niewymagany, stworzyliśmy go jako osobne rozszerzenie,</span>                                    <br>                                    <span>które może być zainstalowane wraz z Czytnikiem Plus.</span>                                    <br>                                    <span>Aby dodać przycisk, kliknij Zainstaluj <b></b> na stronie<a href=\"https://chrome.google.com/extensions/detail/ecpcafinfpjgabomoamkhkgnpgpmdmeo\">Ikony Czytnika Plus</a>.</span><span>Aby pozbyć się przycisku, kliknij na nim prawym przyciskiem myszki, następnie wybierz Wyłącz.</span>",
        importexport_text: "Możesz zapisać swoje ustawienia używając 'eksport' i wczytać je później, używając 'import', ale upewnij się, że dane są <a href='http://jsonformatter.curiousconcept.com/' target='blank'>zgodne z JSON</a>:",
        confirmimport: "Jesteś pewien, że chcesz zaimportować te ustawienia?\nUtracisz obecną konfigurację!"
    },
	limit:{
		slidewindow: "Slidewindow - ogranicz ilość wpisów",
		mini: "Minimum elementów",
		maxi: "Maksimum elementów"
	},
    removeads: {
        links: "Filtr adresu:",
        images: "Filtr obrazka:",
        iframes: "Filtr ramki:"
    },
    preview: {
        onicon: "Pokaż zintegrowany podgląd po kliknięciu na ikone zaraz za tytułem (jeśli nie zaznaczone, podgląd pojawia się po kliknięciu w tytuł)",
        locked: "Zawsze aktywne, pomijając kanały:",
overlay:'Podgląd pełnoekranowy (Lightbox)'
    },
    fitheight: {
        locked: "Zawsze aktywne, pomijając kanały:"
    },
	filter: {
        searchbody: "Przeszukuj w tytule oraz body"
    },
    favicons: {
        providerpageicons: 'Użyj dostawcy <a href="http://pageicons.appspot.com" target="blank">PageIcons</a> (Zalecane by wczytać poprawnie wszystkie favikony)',
        sidebaronly: "Pokaż favikony tylko w lewym panelu",
        custom: "Podaj niestandardowy favikon:",
        add: "Dodaj",
        tip: "Wskazówka: Możesz łatwo dodać z menu kontekstowego wybierając \"Znajdź favikon\" z lewego panelu",
        manual: "Ręczne favikony dla wszystkich stron (niezalecane ; powolne)",
        parsing: "Włącza próbę wyciągnięcia favikona ze strony",
        entersite: "Podaj link strony",
        prompticon: "Podaj link favicona(zostaw puste by wykryć automatycznie):"
    },
    replacer: {
        intro: 'Możesz użyć <a href="http://karmatics.com/aardvark/bookmarklet.html" target="blank">Aardvark bookmarklet</a> aby zidentyfikować właściwy xpath, zamiast regex (Użyj prefiksu "xpath:")',
        link: "Link Regex",
        from: "Wyszukiwanie regex/xpath",
        to: "Zamień",
		prompttitle: "Tytuł dla tego filtru"
    },
    lightbox: {
        locked: "Zawsze aktywny, pomijając poniższe kanały:"
    },
    relook: {
        css: "Styl CSS",
        resize: "Aktywuj funkcję skalowania, aby przystosować tryb pełnoekranowy"
    },
    pack: {
        mini: "<span>Mini Paczka</span>Minimum, dla najlepszego czytania",
        ludoo: "<span>Paczka LudoO</span>Najlepsze funkcje pod jednym kliknięciem",
        full: "<span>Pełna paczka</span>Wszystkie funkcje włączone",
        reset: "<span>Reset paczki</span>Resetuje konfigurację",
        confirmdel: "Ta funkcja WYKASUJE wszystkie Twoje ustawienia. Jesteś pewien?"
    },
    extshortcuts: {
        custom: "Twoje własne skróty",
        official: "Oficjalne skróty Czytnika google",
        alreadyusedprefs: "Używasz już tego skrótu w swoich ustawieniach!",
        alreadyusedgoogle: "Używane już przez Google!"
    },
    thanks: {
        donators: "Podziękowania dla osób, które wpłaciły pieniądze",
        translators: "Podziękowania dla dzielnych tłumaczy, dla ich wspaniałej pracy",
        authors: "Podziękowania dla autorów oryginalnych skryptów oraz styli (Greasemonkey oraz Stylish)"
    }
};
