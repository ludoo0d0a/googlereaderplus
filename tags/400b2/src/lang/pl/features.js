/**
 * ReaderPlus
 * Translation for features
 *
 * Version : 1.0
 * Date : 05-22-2010
 * @author (voythas) http://voythas.com
 */
var locale = 'pl';
namespace('GRP.langs.' + locale);
GRP.langs[locale].categories = {
	main: 'Główne',
	theme: 'Styl',
	icons:'Ikony',
	counter:'Licznik',
	layout: 'Układ',
	navigation: 'Nawigacja',
	share: 'Dzielenie',
	action: 'Akcje',
	content: 'Zawartość'
};
GRP.langs[locale].scripts = {
    general: {
        name: "Ogólne",
        desc: "Ogólna konfiguracja"
    },
    theme: {
        name: "Skórka",
        desc: "Zmień wygląd swojego Czytnika Google"
    },
    ig: {
        name: "Styl iGoogle",
        desc: "Użyj <a href='http://www.google.com/ig/directory?type=themes' target='blank'>stylu iGoogle</a> w swoim Czytniku Google (testowe)"
	},
    relook: {
        name: "Dopasuj",
        desc: "Dopasuj wygląd używając zewnętrznych styli CSS"
    },
    favicons: {
        name: "Favikony",
        desc: "Pokaż małe ikony przy każdym z wpisów"
    },
    unreadcount: {
        name: "Pokaż licznik nieprzeczytanych wpisów",
        desc: "Pokazuje licznik wszystkich nieprzeczytanych wpisów"
    },
    fixlayout: {
        name: "Popraw układ",
        desc: "Naprawia różne błędy w stylach, jak pełna wysokość wpisu, naprawia brak obrazków w załącznikach oraz pomniejsza zbyt duże obrazki"
    },
    count: {
        name: "Popraw licznik (1000+)",
        desc: "Pokazuje poprawny licznik nieprzeczytanych"
    },
    counticon: {
        name: "Licznik w ikonie",
        desc: "Pokazuje licznik nieprzeczytanych w ikonce Czytnika Google"
    },
    removeads: {
        name: "Ukryj reklamy",
        desc: "Proste blokowanie reklam"
    },
    column: {
        name: "Tekst w kolumnach",
        desc: "Dodaje przycisk by wyświetlać wpisy w wielu kolumnach jak w gazecie"
    },
    preview: {
        name: "Zintegrowany podgląd",
        desc: "Dodaje przycisk do pokazywania całej strony, nie tylko wpisu"
    },
    colorful: {
        name: "Kolorowa lista",
        desc: "Koloruje te wpisy z tych samych stron"
    },
    filter: {
        name: "Filtruj wpisy",
        desc: "Filtruje wpisy przez kasowanie ich, bądź podświetlanie zależnie od reguł użytkownika"
    },
	limit: {
        name: "Ogranicz wpisy",
        desc: "Ogranicza limit wpisów na jedną stronę. Przeczytane wpisy są automatycznie ukrywane by zmieścić się w limicie"
    },
    readbymouse: {
        name: "Czytaj myszką",
        desc: "Następny/Poprzedni wpis używając prawego/lewego przycisku myszy"
    },
    facebook: {
        name: "Facebook",
        desc: "Dodaje przycisk by dzielić news używając Facebooka"
    },
    twitter: {
        name: "Twitter",
        desc: "Dodaje przycisk by dzielić news używając Twittera"
    },
    instapaper: {
        name: "Instapaper",
        desc: "Dodaje przycisk by przeczytać wpis później, używając Instapaper"
    },
	readitlater: {
        name: "ReadItLater",
        desc: "Dodaje przycisk by przeczytać wpis później, używając ReadItLater"
    },
    mark: {
        name: "Oznacz jako przeczytane",
        desc: "Oznacza wpisy przed/za wpisem jako przeczytane"
    },
    jump: {
        name: "Dodaj góra/dół linki",
        desc: "Dodaje 'idź na dół' ikonę na górze każdego wpisu oraz 'idź na górę' na dole wpisu"
    },
    fitheight: {
        name: "Dopasuj wysokość",
        desc: "Dopasuj wysokość obecnego wpisu do wysokości ekranu (dla długich artykułów)"
    },
    closeentry: {
        name: "Zamknij wpis",
        desc: "Dodaje przycisk 'zamknij' do każdego wpisu by go ukryć"
    },
    openbackground: {
        name: "Otwórz w tle",
        desc: "Dodaje przycisk 'otwórz w tle' do każdego wpisu"
    },
    replacer: {
        name: "Zamiennik",
        desc: "Zamienia wpis kawałkiem treści z jej oryginalnej strony. Używane głównie by wyciągnąć paski komiksów.<br/>Podziękowania dla jolan78 dla tego oryginalengo pomysłu oraz skryptu."
    },
    aero: {
        name: "Pasek narzędzi Google Aero",
        desc: "Pasek narzędzi w stylu Aero"
    },
    info: {
        name: "Informacje",
        desc: "Informacje o systemie"
    },
    extshortcuts: {
        name: "Skróty",
        desc: "Skróty klawiaturowe"
    },
    pack: {
        name: "Pakiety",
        desc: "Zdefiniowane pakiety ustawień"
    },
    thanks: {
        name: "Podziękowania",
        desc: ""
    },
    about: {
        name: "O rozszerzeniu",
        desc: "Informacje o Czytniku Plus"
    }
};
GRP.langs[locale].skins = {
    none: {
        name: "Żaden"
    },
    air: {
        name: "Styl Air"
    },
    aircomic: {
        name: "Styl Air Comic Sans"
    },
    black: {
        name: "Ulepszone Czarne Google"
    },
    dark: {
        name: "Ciemny Styl"
    },
    darkgray: {
        name: "Styl Ciemno-szary"
    },
    helvetireader: {
        name: "Styl Helvetireader"
    },
    minimal: {
        name: "Styl Minimalistyczny"
    },
    optimized: {
        name: "Styl zoptymalizowany"
    },
    portal: {
        name: "Styl Portalu"
    },
    player: {
        name: "Styl Odtwarzacza"
    },
    osxblue: {
        name: "Mac OS X Snow Leopard - Niebieski"
    },
    osxblack: {
        name: "Mac OS X Snow Leopard - Czarny"
    },
	calibri: {
        name: "Styl Calibri"
    },
    glassblackgold: {
        name: "Styl Glass Black Gold"
    },
    simpleclean: {
        name: "Prosty i Czysty"
    },
    peacockfeather: {
        name: "Pawie Pióro"
    },
    myowngooglereader: {
        name: "Mój własny Czytnik Google"
    },
    compactcleantweaked: {
        name: "Ścisły, Czysty i Dostosowany"
    },
    absolutelycompact: {
        name: "Totalnie ściśnięty"
    },
    darkshinyblue: {
        name: "Świecący niebieski, ciemny"
    },
	persian: {
        name: "Zoptymalizowany, Perski"
    }
};
