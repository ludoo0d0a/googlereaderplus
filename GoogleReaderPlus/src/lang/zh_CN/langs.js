/**
 * ReaderPlus
 * Translation
 *
 * **************************
 * 翻译 : 简体中文 By Jfjj007
 * **************************
 *
 * Version : 0.1
 * Date : 2010-03-04
 * @author Jfjj007
 */
namespace('GRP.langs.zh_CN');
GRP.langs.zh_CN.texts = 
{
    'version': "版本",
    closeentry: 
    {
        text: '关闭此项目',
        keyword: '关闭'
    },
    colorful: 
    {
        // pref labels
        color: "这些项目的颜色:",
        list: "查看列表标题.",
        expanded: "进入展开条目视图.",
        frame: "进入列表条目视图.",
        read: "Read items.",
        unread: "Unread items.",
        
        // pref messages
        msgWill: "will",
        msgWillNot: "will not",
        msgColored: " be colored.",
        msgList: "List view items ",
        msgExpanded: "显示条目为展开模式 ",
        msgFrame: "显示条目为列表模式 ",
        msgUnread: "Unread items ",
        msgRead: "Read items ",
        msgUndef: "未定义的",
        
        scheme: "配色方案: ",
        def: "默认",
        custom: "习惯",
        
        update: "用户脚本更新可用",
        install: "安装"
    },
    column: 
    {
        text: '显示为多列的布局',
        keyword: '栏'
    },
    facebook: 
    {
        text: '分享这个消息到Facebook',
        keyword: 'Facebook'
    },
    twitter: 
    {
        text: '分享这个消息到Twitter',
        keyword: 'Twitter',
		plslogin: '请登录到Twitter',
        toolong: "消息太长!",
        notetoolong: "<b>Note to go along with the item:</b> (Optional, remain {0} characters)",
        notemax: "<b>Note to go along with the item:</b> (Optional, no more than 140 characters)",
        text_title: '标题',
        text_tag: '标签',
        text_url: '链接',
		text_send:'发送',
        text_count: 'Count',
        text_cancel: '取消',
		text_shortener:'短网址',
		shortfailed:"对不起，您尝试的短网址发生错误!\n\r{0}"
    },
    instapaper: 
    {
        text: 'Read Later with Instapaper',
        keyword: 'Instapaper',
        plslogin: '请登录Instapaper',
        login: 'Email 或 用户名:',
        password: 'Password, if you have one:',
        wronglogin: '用户名或密码错误，请检查并重新输入!!',
		nologin: 'Instapaper需要一个用户名，请设定偏好!!',
        error: '该服务遇到一个错误。请稍候再试.',
        badrequest: '不正确的要求。也许是URL的参数错误，.',
        saving: '保存',
		shortcut_readitlater: 'Read Later with Instapaper'
    },
    favicons: 
    {
        preferences: '偏好',
        getfavicon: '获取Favicon',
        notfoundicon: '无法找到图标为 "{0}"'
    },
    filter: 
    {
        settings: '过滤器设置',
        excludes: '排除',
        highlights: '突出',
        highlight: '高亮',
        exclude: '排除',
        hideduplicates: '隐藏重复',
        hideexcludes: '隐藏排除',
        preferehighlights: 'Prefer Hilights over excludes',
        update: '更新',
        quickadd: '快速添加',
        add: '添加',
        close: '关闭'
    },
    fitheight: 
    {
        text: '适合高度',
        keyword: '适合高度'
    },
    jump: 
    {
        textbottom: '跳到底部',
        texttop: '跳到顶部',
        keywordtop: '顶部'
    },
    openbackground: 
    {
        text: '在后台打开',
        keyword: '打开'
    },
    preview: 
    {
        text: '集成消息预览',
        title: '打开预览',
        opennewtab: '打开一个新窗口',
        keyword: '预览'
    },
    readbymouse: 
    {
        middleclick: 'Middle click',
        openintab: '在标签中打开',
        shares: '分享',
        stars: 'Stars',
        tag: '标签',
        addtag: '添加标签',
        on: '鼠标阅读 开',
        off: '鼠标阅读 关'
    },
	replacer:{
		nomatch:'未找到相应.',
		loading:'载入中 ...'
	}
};

GRP.langs.zh_CN.prefs = 
{
    "global": 
    {
        "title": "Reader Plus",
		"val-save":"保存"
    },
	"about":{
		"thanks1":'<td><span class="top_right"><img src="images/48.png"></span><h1>谢谢您...</h1>'+
'<p>... 安装（或更新）最新的版本 <strong>Reader Plus</strong>!</p>'+
'<p>Make sure you check the <a href="preferences.html" title="Go to the preferences page"><strong>preferences page</strong></a> for configuration of the extension.</p>'+
'<p><a href="https://chrome.google.com/extensions/detail/hhcknjkmaaeinhdjgimjnophgpbdgfmg" target="_blank" title="Visit extension homepage"><strong>Visit the Google Chrome Extensions gallery page!</strong></a></p>'+
'<p><a href="http://www.twitter.com/ludoo0d0a"><img src="http://twitter-badges.s3.amazonaws.com/follow_me-a.png" alt="Follow me on Twitter"/></a></p>'+
'<p></p></td>',
		"thanks2":'<td><p>如果您喜欢这个扩展，并希望更多的功能，可随时作出捐赠.</p>'+
		'<p>In this way, I could buy a truck of coffee so that i can stay awake to write all the code :)</p>'+
        '<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=FK9P8MNY9MGZL&lc=US&item_name=GoogleReaderPlus%20project&currency_code=EUR&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted"><img alt="Donate" border="0" src="https://www.paypal.com/en_US/i/btn/btn_donate_SM.gif" width="74" height="21"></a></td>'
	},
    "link": 
    {
        "reader": "<span>Google Reader</span>开始阅读您的RSS阅读器",
        "issues": "<span>报告问题</span>发现了一个Bug或提交问题?",
        "download": "<span>扩展页面</span>下载更新扩展的页面",
        "about": "<span>关于</span>关于和鸣谢...",
        "site": "<span>作者主页</span>作者的个人网站",
        "twitter": "<span><img width=\"160\" height=\"27\" src=\"http://twitter-badges.s3.amazonaws.com/follow_me-a.png\" alt=\"Follow ludoo0d0a on Twitter\"></span>Follow news and updates",
		"donate":'<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&amp;business=FK9P8MNY9MGZL&amp;lc=US&amp;item_name=googlereaderplus%20project&amp;currency_code=EUR&amp;bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted"><span><img alt="Donate" border="0" src="https://www.paypal.com/en_US/i/btn/btn_donate_SM.gif" width="74" height="21"></span>Offer me a coffee!</a>',
		"translate":'<span>翻译</span><a href="Http://Twitter.Com/Jfjj007" target="_blank">汉化@Jfjj007</a>'
    },
    "column": 
    {
        "count": "列数",
        "locked": "'专栏'功能始终默认激活",
        "pagebreak": "Break long articles so long articles can be read page by page like a newspaper."
    },
    "twitter": 
    {
        "shortener": "网址缩短",
        "shortener_bitly": "BitLy 配置 (可选):",
        "shortener_login": "登录",
        "shortener_apikey": "ApiKey",
        "shortener_pwd": "密码"
    },
    "instapaper": 
    {
        "auth": "Instapaper认证(可选):"
    },
    "colorful": 
    {
        "tree": "在左侧导航栏中显示标签的颜色"
    },
    "icon": 
    {
        "counter": "在工具栏显示未读消息的计数器图标",
        "opendirect": "点击图标就会打开Google Reader",
        "icontoolbar_add": "要添加工具栏图标，请点击 <a href=\"https://chrome.google.com/extensions/detail/ecpcafinfpjgabomoamkhkgnpgpmdmeo\">下载并安装</a>.",
        "icontoolbar_text": "<span>为了使按钮自定义添加，我们也开发了另外一个独立的扩展,</span>                                    <br>                                    <span>必须安装reader plus.</span>                                    <br>                                    <span>要添加按钮，点击 <b>Install</b> 在 <a href=\"https://chrome.google.com/extensions/detail/ecpcafinfpjgabomoamkhkgnpgpmdmeo\">readerplus 工具栏按钮</a> page.</span>                                    <br>                                    <span>要删除按钮，右键点击他，选择禁用.</span>"
    },
    "removeads": 
    {
        "linkf": "过滤链接",
        "imgf": "过滤图片",
        "ifrf": "自定义过滤"
    },
    "preview": 
    {
        "onicon": "显示集成预览时，右键点击图标后的标题 (if not checked, on title)",
        "locked": "'预览'功能始终默认激活"
    },
    "fitheight": 
    {
        "locked": "'适合高度'始终激活默认"
    },
    "favicons": 
    {
        "sidebaronly": "在侧边栏显示Favicon",
        "custom": "请输入您的自定义Favicons :",
        "add": "添加",
        "tip": "Tip: 你可以很容易的在左侧栏添加使用上下文菜单 \"获取 favicon\" ",
        "manual": "获取所有网站的Favicons (不推荐;慢)",
        "parsing": "这将试图通过分析检测每个网页Favicon"
    },
    "replacer": 
    {
        "lr": "链接正则表达式",
        "sr": "搜索正则表达式",
        "to": "替换"
    },
    "pack": 
    {
        "mini": "<span>迷你型</span>开启基本配置阅读功能",
        "ludoo": "<span>特色型</span>适合喜欢在后台阅读的用户",
        "full": "<span>全能型</span>激活所有功能",
        "reset": "<span>恢复默认</span>重置您的配置(所有功能未激活，并切换到英文版界面)"
    },
    "extshortcuts": 
    {
        "custom": "自定义快捷键",
        "official": "Google Reader 官方快捷键"
    },
    "thanks": 
    {
        "donators": "感谢对这一项目作出贡献行为的捐赠者",
        "authors": "感谢原创作者的脚本和皮肤 (Greasemonkey and Stylish)"
    }
};
