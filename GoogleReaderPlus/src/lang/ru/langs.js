/**
 * ReaderPlus
 * Translation
 *
 * **************************
 * ru : Russian
 * **************************
 *
 * Version : 0.9
 * Date : 03-22-2010
 * @author Ruslan Pokatskii
 */
namespace('GRP.langs.ru');
GRP.langs.ru.texts = 
{
    'version': "Версия",
    closeentry: 
    {
        text: 'Закрыть эту запись',
        keyword: 'Закрыть'
    },
    colorful: 
    {
    },
    column: 
    {
        text: 'Показывать в несколько колонок',
        keyword: 'Колонки',
        summary: 'Добавить/редактировать',
        desc: 'Управление колонками'
        },
    facebook: 
    {
        text: 'Опубликовать в Facebook',
        keyword: 'Facebook'
    },
    twitter: 
    {
        text: 'Отправить в Twitter',
        keyword: 'Twitter',
		plslogin: 'Авторизуйтесь в Twitter',
        toolong: "сообщениие слишком длинное!",
        notetoolong: "<b>Сообщать, сколько осталось:</b> (Опционально, осталось {0} знаков)",
        notemax: "<b>Сообщать, сколько доступно:</b> (Опционально, не более 140 знаков)",
        text_title: 'Заоловок',
        text_tag: 'Тег',
        text_url: 'URL',
		text_send:'Отпраить',
        text_count: 'Счётчик',
        text_cancel: 'Отмена',
		text_shortener: 'короткий URL',
		shortfailed: "При попытке сделать короткиу URL произошла ошибка!\n\r{0}"
    },
    instapaper: 
    {
        text: 'Прочитать позже в Instapaper',
        keyword: 'Instapaper',
        plslogin: 'Авторизуйтесь в Instapaper',
        login: 'Email или Имя пользователя:',
        password: 'Пароль:',
        wronglogin: 'Неверное имя или пароль!',
		nologin: 'Для использования Instapaper необходимо Имя пользователя, проверьте настройки!',
        error: 'Ошибка сервиса. Пожалуйста попробуйте позже.',
        badrequest: 'Неверный запрос. Возможно нехватает необходимого параметра, например URL.',
        saving: 'Сохранение',
		shortcut_readitlater: 'Быстрая клавиша:'
    },
    favicons: 
    {
        preferences: 'Настройки',
        getfavicon: 'Получить иконку',
        notfoundicon: 'Не найдено иконок для "{0}"',
		summary: 'Добавить/удалить',
        desc: 'Управление иконками'
        },
    filter: 
    {
        settings: 'Настройки фильтра',
        excludes: 'Исключения',
        highlights: 'Выделения',
        highlight: 'Выделить',
        exclude: 'Исключить',
        hideduplicates: 'Скрыть дубликаты',
        hideexcludes: 'Скрыть исключения',
        preferehighlights: 'Преимущественно Выделять, чем исключать',
        update: 'Обновить',
        quickadd: 'Быстро добаить',
        add: 'Добавить',
        close: 'Зарыть',
		edit:'Редактировать',
		remove:'Удалить'
    },
    fitheight: 
    {
        text: 'Растянуть в длинну',
        keyword: 'Растянуть'
    },
    jump: 
    {
        texttop: 'Перейти к началу записи',
        keywordtop: 'В начало',
        textbottom: 'Перейти к концу записи',
        keywordbottom: 'В конец'
    },
    openbackground: 
    {
        text: 'Открыть в фоне',
        keyword: 'Открыть в фоне'
    },
    preview: 
    {
        text: 'Встроенный просмотр оригинальных сраниц',
        title: 'Показать оригинал',
        opennewtab: 'Открыть оригинал в новой вкладке',
        keyword: 'Просмотр оригинала'
    },
    readbymouse: 
    {
        middleclick: 'Средняя кнопка',
        openintab: 'Открытие во вкладке',
		openinbacktab: 'Фоновое открытие во вкладке',
        shares: 'Сделать общими',
        stars: 'Отметить',
        tag: 'Тег',
        addtag: 'Добавить теги',
        on: 'Включить чтение мышью',
        off: 'Выключить чтение мышью'
    },
	replacer:{
		nomatch:'Ничего не найдено.',
		loading:'Загрузка ...'
	},
	lightbox:{
        text: 'Подсвечивать медиа',
        keyword: 'Подсветка'
    }
};

GRP.langs.ru.prefs = 
{
    "global": 
    {
        "title": "Reader Plus",
		"val-save":"Сохранить",
"alreadyexist": "Item already exists!"
    },
	"theme": 
    {
        "noborder": "Убрать рамку чтобы отображалось больше записей на странице"
    },
	"about":{
		"thanks1":'<td><span class="top_right"><img src="images/48.png"></span><h1>Спасибо...</h1>'+
'<p>... что установили (или обновили) последнюю версию <strong>Reader Plus</strong>!</p>'+
'<p>Откройте <a href="preferences.html" title="Перейти к настройкам"><strong>страницу настройки</strong></a> для настройки расширения.</p>'+
'<p><a href="https://chrome.google.com/extensions/detail/hhcknjkmaaeinhdjgimjnophgpbdgfmg" target="_blank" title="Перейти в Гаерею расширений Google"><strong>Посетите Галерею расширений Google!</strong></a></p>'+
'<p><a href="http://www.twitter.com/ludoo0d0a"><img src="http://twitter-badges.s3.amazonaws.com/follow_me-a.png" alt="Следить в Twitter"/></a></p>'+
'<p></p></td>',
		"thanks2":'<td><p>Если Вам нравится это расширение и Вы хотите, что бы оно улучшалось, можете подкинуть деньжат.</p>'+
		'<p>Тогда я смогу купить себе вагон кофе и буду программировать круглосуточно без выходных :)</p>'+
        '<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=FK9P8MNY9MGZL&lc=US&item_name=GoogleReaderPlus%20project&currency_code=EUR&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted"><img alt="Пожертвовать" border="0" src="https://www.paypal.com/en_US/i/btn/btn_donate_SM.gif" width="74" height="21"></a></td>'
	},
    "link": 
    {
        "reader": "<span>Google Reader</span>Доставка новостей",
        "issues": "<span>Обратная связь</span>Нашли ошибку или есть предложения?",
        "download": "<span>Расширения Google</span>Скачать/обновить",
        "about": "<span>Информация</span>О программе",
        "site": "<span>Website</span>Мой персональный сайт",
        "twitter": "<span><img width=\"160\" height=\"27\" src=\"http://twitter-badges.s3.amazonaws.com/follow_me-a.png\" alt=\"Follow ludoo0d0a on Twitter\"></span>Следите за новостями и обновлениями",
		"donate":'<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&amp;business=FK9P8MNY9MGZL&amp;lc=US&amp;item_name=googlereaderplus%20project&amp;currency_code=EUR&amp;bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted"><span><img alt="Пожертвуйте" border="0" src="https://www.paypal.com/en_US/i/btn/btn_donate_SM.gif" width="74" height="21"></span>Скиньтесь мне на кофе!</a>',
		"translate":'<span>Translation</span>Помогите с переводом</a>'
    },
    "column": 
    {
        "count": "Количество колонок",
        "locked": "Функция 'Колонки' всегда активирована по умолчанию",
        "pagebreak": "Разрывать длинные сообщения, чтобы читать их постранично, как газету.",
		"entersite":"Введите URL сайта"
    },
    "twitter": 
    {
        "shortener": "Shortener",
        "shortener_bitly": "Настройка BitLy (опционально):",
        "shortener_login": "Имя",
        "shortener_apikey": "Ключ",
        "shortener_pwd": "Пароль"
    },
    "instapaper": 
    {
        "auth": "Авторизация в Instapaper (опционально):",
		"username": "Имя пользователя:",
		"password": "Пароль:"
    },
    "colorful": 
    {
        "tree": "Так же выделять цветом подписки в дереве навигации"
    },
        "icon": 
    {
        "counter": "Показывать количество непрочитанных на кнопке панели",
        "opendirect": "Открывать GoogleReader нажатием кнопки",
        "icontoolbar_add": "Чтобы добавить кнопку в панель Google Chrome нужно <a href=\"https://chrome.google.com/extensions/detail/ecpcafinfpjgabomoamkhkgnpgpmdmeo\">скачать и установить её</a>.",
         "icontoolbar_text": "<span>Мы сделали кнопку отдельным самостоятельным расширением, чтобы можно было устанавливать её отдельно от Reader Plus.</span><br><span>Чтобы добавить кнопку на панель, нажмите <b>Install</b> на странице <a href=\"https://chrome.google.com/extensions/detail/ecpcafinfpjgabomoamkhkgnpgpmdmeo\">Reader Plus Toolbar Button</a></span><br><span>Чтобы спрятать кнопку, нажмите на неё правой кнопкой мыши и выберите 'Отключить'</span>"
    },
    "general": 
    {
        "counter": "Показывать количество непрочитанных сообщений в заголовке вкладки",
        "opendirect": "Открыть GoogleReader по нажатию на иконку",
		"secure": "Всгда использовать защищённое соединение (https)",
        "icontoolbar_add": "Чтобы добавить кнопку на панель Google Chrome, нужно <a href=\"https://chrome.google.com/extensions/detail/ecpcafinfpjgabomoamkhkgnpgpmdmeo\">скачать и установить её</a>.",
        "icontoolbar_text": "<span>Мы сделали кнопку опциональной, отдельным расширением,</span><br><span>которое устанавливается независимо от Reader Plus.</span><br><span>Чтобы добавить кнопку, нажмите <b>Install</b> на странице <a href=\"https://chrome.google.com/extensions/detail/ecpcafinfpjgabomoamkhkgnpgpmdmeo\">Reader Plus Toolbar button</a>.</span><br><span>Чтобы скрыть кнопку из панели, нажмите на ней правой кнопкой мыши и выберите Отключить.</span>",
		"importexport_text": "Вы можете сохранить ваши настроки, используя 'экспорт' загрузить их позже, используя 'импорт':",
		"confirmimport": "Вы уверены, что хотите импортировать эти настройки?\nТекущие настройки будут утеряны!!!"
    },
    "removeads": 
    {
        "links": "Фильтр ссылок:",
        "images": "Фильтр картинок:",
        "iframes": "Фильтр Iframe:"
    },
    "preview": 
    {
        "onicon": "Показывать оригинальную страницу по нажатию на иконку справа от заголовка (если не отмечено, показывать по нажатию на заголовок)",
        "locked": "Включить 'Просмотр оригинала' всегда по умолчанию"
    },
    "fitheight": 
    {
        "locked": "Включить 'Растягивание в длинну' всегда по умолчанию"
    },
    "favicons": 
    {
        "providerpageicons": 'Использовать поставщика <a href="http://pageicons.appspot.com" target="blank">PageIcons</a> (Рекомендуется для успешной загрузки всех иконок)',
		"sidebaronly": "Показывать иконки только в панели навигации",
        "custom": "Добавьте свои собственные иконки:",
        "add": "Добавить",
        "tip": "Подсказка: Вы легко можете добавить иконки, используя контекстное меню \"Получить иконку\" в панели навигации",
        "manual": "Настройка иконок вручную для всех сайтов (не рекомендуется, замедляет работу)",
        "parsing": "Будет пытаться найти иконки, анализируя каждую страницу",
		"entersite":"Введите URL сайта",
"prompticon":"Enter the icon url (let empty to get it automatically):"
    },
    "replacer": 
    {
        "link": "Ссылка:",
        "from": "Найти:",
        "to": "Заменить на:"
    },
	"lightbox": 
    {
        "locked": "Активировать 'Lightbox' всегда по умолчанию, кроме как для:"
    },
	"relook": 
    {
        "css": "Таблица стилей CSS",
        "resize": "Быстрая адаптация к полноэкранному режиму"
    },
    "pack": 
    {
        "mini": "<span>Набор Минимальный</span>Минимальный набор для улучшения вида",
        "ludoo": "<span>Набор LudoO</span>Лучшие возможности одним нажатием",
        "full": "<span>Набор Полный</span>Активировать все возможности",
        "reset": "<span>Сброс</span>Сбросить все настройки по умолчанию",
		"confirmdel": "Будут сброшены все Ваши настройки. Вы уверены???"
    },
    "extshortcuts": 
    {
        "custom": "Пользовательские сочетания клавиш",
        "official": "Официальные сочетания клавиш Google Reader",
		"alreadyusedprefs": "Уже используется в Ваших настройках!",
		"alreadyusedgoogle": "Уже используется Google!"
    },
    "thanks": 
    {
        "donators": "Благодарю спонсоров за поддержку этого проекта",
		"translators" : "Благодарю смелых переводчиков за их замечательную работу",
        "authors": "Благодарю авторов оригинальных скриптов и оболочек (Greasemonkey и Stylish)"
    }
};
