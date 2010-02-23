/**
 * ReaderPlus
 * Translation
 *
 * **************************
 * fr : Chinese
 * **************************
 *
 * Version : 0.1
 * Date : 02-23-2010
 * @author Jfjj007
 */
namespace('GRP.langs.fr');
GRP.langs.zh.texts = 
{
    'version': "version",
    closeentry: 
    {
        text: 'Close this entry',
        keyword: 'Close'
    },
    colorful: 
    {
        // pref labels
        color: "Color these items:",
        list: "List view headers.",
        expanded: "Expanded view entry bodies.",
        frame: "Expanded view entry frames.",
        read: "Read items.",
        unread: "Unread items.",
        
        // pref messages
        msgWill: "will",
        msgWillNot: "will not",
        msgColored: " be colored.",
        msgList: "List view items ",
        msgExpanded: "Expanded view entry bodies ",
        msgFrame: "Expanded view entry frames ",
        msgUnread: "Unread items ",
        msgRead: "Read items ",
        msgUndef: "Undefined",
        
        scheme: "Color Scheme: ",
        def: "Default",
        custom: "Custom",
        
        update: "Userscript Update Available",
        install: "Install"
    },
    column: 
    {
        text: 'Display as multi columns layout',
        keyword: 'Column'
    },
    facebook: 
    {
        text: 'Share this news on Facebook',
        keyword: 'Facebook'
    },
    twitter: 
    {
        text: 'Share this news on Twitter',
        keyword: 'Twitter',
		plslogin: 'Please login to Twitter',
        toolong: "the message is too long!",
        notetoolong: "<b>Note to go along with the item:</b> (Optional, remain {0} characters)",
        notemax: "<b>Note to go along with the item:</b> (Optional, no more than 140 characters)",
        text_title: 'Title',
        text_tag: 'Tag',
        text_url: 'URL',
		text_send:'Send',
        text_count: 'Count',
        text_cancel: 'Cancel',
		text_shortener:'Url courte',
		shortfailed:"Sorry, an error occured on trying to use short url!\n\r{0}"
    },
    instapaper: 
    {
        text: 'Read Later with Instapaper',
        keyword: 'Instapaper',
        plslogin: 'Please login to Instapaper',
        login: 'Email or username:',
        password: 'Password, if you have one:',
        wronglogin: 'Wrong username or password, please retry!!',
        error: 'The service encountered an error. Please try again later.',
        badrequest: 'Bad request. Probably missing a required parameter, such as url.',
        saving: 'Saving'
    },
    favicons: 
    {
        preferences: 'Preferences',
        getfavicon: 'Get favicon',
        notfoundicon: 'Cannot found favicon for "{0}"'
    },
    filter: 
    {
        settings: 'Filter settings',
        excludes: 'Excludes',
        highlights: 'Highlights',
        highlight: 'Highlight',
        exclude: 'Exclude',
        hideduplicates: 'Hide Duplicates',
        hideexcludes: 'Hide Excludes',
        preferehighlights: 'Prefer Hilights over excludes',
        update: 'Update',
        quickadd: 'Quick Add',
        add: 'Add',
        close: 'Close'
    },
    fitheight: 
    {
        text: 'Fit height',
        keyword: 'Fit height'
    },
    jump: 
    {
        textbottom: 'Jump to bottom',
        texttop: 'Jump to top',
        keywordtop: 'top'
    },
    openbackground: 
    {
        text: 'Open in background',
        keyword: 'Open'
    },
    preview: 
    {
        text: 'Integrated preview of the news',
        title: 'Open as preview',
        opennewtab: 'Open in a new window',
        keyword: 'Preview'
    },
    readbymouse: 
    {
        middleclick: 'Middle click',
        openintab: 'Opens in Tab',
        shares: 'Shares',
        stars: 'Stars',
        tag: 'Tag',
        addtag: 'Add a Tag',
        on: 'ReadByMouse On',
        off: 'ReadByMouse Off'
    }

};

GRP.langs.zh.prefs = 
{
    "global": 
    {
        "title": "设置Reader Plus"
    },
    "link": 
    {
        "reader": "<span>转到Google Reader</span>Your RSS reader",
        "issues": "<span>报告问题Report issue</span>Found a bug or suggestion ?",
        "download": "<span>扩展页Google Extension</span>The place to download",
        "about": "<span>About</span>About, thanks,...",
        "site": "<span>网站</span>My personal website",
        "twitter": "<span><img width=\"61\" height=\"23\" src=\"http://twitter-badges.s3.amazonaws.com/twitter-a.png\" alt=\"Follow ludoo0d0a on Twitter\"></span>Follow news and updates"
    },
    "column": 
    {
        "count": "Columns number",
        "locked": "Feature 'Column' always actived by default",
        "pagebreak": "Break long articles so long articles can be read page by page like a newspaper."
    },
    "twitter": 
    {
        "shortener": "Shortener",
        "shortener_bitly": "BitLy configuration (optional):",
        "shortener_login": "Login",
        "shortener_apikey": "ApiKey",
        "shortener_pwd": "Password"
    },
    "instapaper": 
    {
        "auth": "Instapaper authentication (optional):"
    },
    "colorful": 
    {
        "tree": "Show label colors in the left navigation tree"
    },
    "icon": 
    {
        "counter": "Display unread counter in the toolbar icon",
        "opendirect": "Click on icon will open GoogleReader",
        "icontoolbar_add": "To add button with icon in toolbar, please <a href=\"https://chrome.google.com/extensions/detail/ecpcafinfpjgabomoamkhkgnpgpmdmeo\">download and install it</a>.",
        "icontoolbar_text": "<span>To make the button optional, we put him in an another extension as standalone,</span>                                    <br>                                    <span>to be installed along with readerplus.</span>                                    <br>                                    <span>To add the button, click <b>Install</b> on the <a href=\"https://chrome.google.com/extensions/detail/ecpcafinfpjgabomoamkhkgnpgpmdmeo\">readerplus Toolbar button</a> page.</span>                                    <br>                                    <span>To remove the button, right click him and choose Disable.</span>"
    },
    "removeads": 
    {
        "linkf": "Link filter",
        "imgf": "Image filter",
        "ifrf": "iframe filter"
    },
    "preview": 
    {
        "onicon": "Show integrated preview when click on icon right after the title (if not checked, on title)",
        "locked": "Feature 'Preview' always actived by default"
    },
    "fitheight": 
    {
        "locked": "Feature 'Fit height' always actived by default"
    },
    "favicons": 
    {
        "sidebaronly": "Show favicons in sidebar only",
        "custom": "Enter your custom favicons :",
        "add": "Add",
        "tip": "Tip: You could add it easily using the contextual menu \"Get favicon\" of the left side bar",
        "manual": "Manual favicons for all sites (not recommended ; slower)",
        "parsing": "This will try to detect favicon by parsing each homepage"
    },
    "getpart": 
    {
        "lr": "Link Regex",
        "sr": "Search regex",
        "to": "Replace"
    },
    "pack": 
    {
        "mini": "Package Mini",
        "ludoo": "Package LudoO",
        "full": "Package Full",
        "reset": "Package Reset"
    },
    "extshortcuts": 
    {
        "custom": "Your custom Shortcuts",
        "official": "Google Reader official shortcuts"
    },
    "thanks": 
    {
        "donators": "Thanks to donators to contribute to this project",
        "authors": "Thanks to authors of original scripts and skins (Greasemonkey and Stylish)"
    }
};
