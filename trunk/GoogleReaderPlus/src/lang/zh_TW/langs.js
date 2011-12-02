/**
 * ReaderPlus
 * Translation
 *
 * **************************
* 繁體中文 : greenteaf@yahoo.com.tw
 * **************************
 *
 * Version : 2.0
 * Date : 11-29-2011
 * @author greenteaf
 * @author shell9000 (v1.0)
 */
var locale = 'zh_TW';
namespace('GRP.langs.' + locale);
GRP.langs[locale].texts = {
    version: "版本",
    closeentry: {
        text: '關閉此項目',
        keyword: '關閉'
    },
    column: {
        text: '多欄版面配置',
        keyword: '欄',
        summary: '新增/編輯項目',
        desc: '管理多欄版面'
    },
	sharemsg : {
		sharewith : '分享至 ',
		toolong : "訊息太長!",
		notetoolong : "剩餘 {0} 字元; 最大 140 字元",
		text_title : '標題',
		text_tag : '標籤',
		text_url : '網址',
		text_desc : '說明',
		text_send : '傳送',
		text_count : '計數',
		text_cancel : '取消',
		text_shorturl : '短網址',
		shortfailed : "抱歉, 使用短網址時發生錯誤!\n\r{0}"
	},
    facebook: {
        text: '分享此新聞至Facebook',
        keyword: 'Facebook'
    },
	twitter : {
		text : '分享此新聞至 Twitter',
		keyword : 'Twitter',
		plslogin : '請登入 Twitter'
	},
	weibo : {
		text : '分享此新聞至 Weibo',
		keyword : 'Weibo',
		plslogin : '請登入 Weibo'
	},
	reddit : {
		text : '分享此新聞至 Reddit',
		keyword : 'Reddit',
		plslogin : '請登入 Reddit'
	},
	tumblr : {
		text : '分享此新聞至 Tumblr',
		keyword : 'Tumblr',
		plslogin : '請登入 Tumblr'
	},
	plusone : {
		text : '分享此新聞至 Google+',
		keyword : 'Google+',
		plslogin : '請登入 Google+'
	},
	identi : {
		text : '分享此新聞至 Identi',
		keyword : 'Identi',
		plslogin : '請登入 Identi.ca',
		nologin : 'This feature requires a username and a key, please set preferences!!'
	},
	jaiku : {
		text : '分享此新聞至 Jaiku',
		keyword : 'Jaiku',
		plslogin : '請登入 Jaiku'
	},
	readit : {
		password : '若有的話請輸入密碼:',
		wronglogin : '用戶名或密碼錯誤, 請重新確認!!',
		nologin : '此功能需要用戶名, 請設置偏好設定!!',
		error : '服務發生錯誤. 請稍後再嘗試.',
		badrequest : '錯誤的請求. 可能有資料未輸入, 例如網址.',
		saving : '儲存中',
		shortcut_readitlater : '稍後以 Instapaper 閱讀'
	},
	diigo : {
		keyword : 'Diigo',
		text : '分享此新聞至 Diigo',
		badrequest : '參數無效或API次數超過限制.',
		notauthorized : '認證憑證遺失或無效.',
		forbidden : '因沒有適當的權限, 要求以被拒絕.',
		notfound : '你所要求的網址或用戶不存在.',
		badgateway : 'Diigo 維護中.',
		unavailable : 'Diigo 伺服器忙碌中. 請稍後再試.'
	},
	gmarks : {
		keyword : 'Google Bookmarks',
		wronglogin : '認證時發生錯誤!!',
		nologin : '認證時發生錯誤!!',
		text : '分享至 Google Bookmarks'
	},
    instapaper: {
		text : '稍後以 Instapaper 閱讀',
		keyword : 'Instapaper',
		plslogin : '請登入 Instapaper',
		login : '電子郵件或用戶名:'
    },
	readitlater : {
		text : '稍後以 ReadItLater 閱讀',
		keyword : 'ReadItLater',
		plslogin : '請登入 ReadItLater',
		rateexceeded : '已達次數限制, 請稍後再重試',
		maintenance : 'Read It Later\的同步伺服器維護中'
	},
	radbox : {
		text : '稍後以 Radbox 閱讀',
		keyword : 'Radbox',
		nologin : '此功能需要 userkey, 請設定偏好設置!!',
		novideo : '此頁面上找不到影片'
	},
	addthis : {
		text : '分享至 AddThis',
		keyword : 'AddThis'
	},
	blogger : {
		text : '分享至 Blogger',
		keyword : 'Blogger'
	},
	pinboard : {
		text : '分享至 Pinboard',
		keyword : 'Pinboard'
	},
	favicons : {
		preferences : '設置',
		getfavicon : '取得網站圖示',
		notfoundicon : '找不到網站圖示 "{0}"',
		summary : '新增/編輯項目',
		desc : '管理網站圖示'
	},
	filter : {
		settings : '過濾設定',
		highlight : '反白',
		exclude : '排除',
		hideduplicates : '隱藏重複',
		hideexcludes : '隱藏排除',
		preferehighlights : 'Prefer Hilights over excludes',
		update : '更新',
		quickadd : '快速新增',
		add : '新增',
		edit : '編輯',
		remove : '移除',
		//v2
		filter : '過濾器',
		save : '儲存 & 套用',
		close : '關閉選單',
		searchbody : '搜尋內文',
		fulltext : '切換純文字',
		detect_duplicates : '分析重複',
		hide_duplicates : '隱藏重複',
		hide_excludes : '隱藏排除',
		prefer_highlights : 'Prefer Highlights over excludes',
		live : 'Live',
		highlights : '反白',
		duplicates : '重複',
		excludes : '排除',
		content : '內容',
		addentry : '新增',
		add_excludes : '新增至排除',
		add_highlights : '新增至反白',
		button : '各訂閱項目中顯示過濾按鈕',
		gettitle : '取得標題',
		getwords : '取得文字',
		getfrom : '新增訂月',
		getauthor : '新增作者'
	},
	rank : {
		filter_rank : 'Ranking',
		filter_ad : 'Powered by PostRank',
		rank_all : 'All',
		rank_good : '好 >2.7',
		rank_great : '很好 >5.5',
		rank_best : '非常好 >7.6',
		rank_famous : '熱門 >9'
	},
    fitheight: {
        text: '適合高度',
        keyword: '適合高度'
    },
    jump: {
		text : '跳到',
        textbottom: '跳到底部',
        texttop: '跳到頂部',
        keywordtop: '頂部'
    },
    openbackground: {
        text: '在新分頁開啟',
        keyword: '開啟'
    },
	preview : {
		text : '新聞綜合預覽',
		title : '以預覽開啟',
		opennewtab : '在新分頁開啟',
		keyword : '預覽',
		overlay_next : '下一個',
		overlay_previous : '上一個',
		overlay_close : '關閉',
		overlay_category : '分類',
		overlay_loading : '載入中...'
	},
	readability : {
		text : 'Read now with Readability',
		title : 'Read now full content with Readability',
		keyword : 'Read now'
	},
    readbymouse: {
		readbymouse : 'Read by mouse',
		middleclick : ' On middle click: ',
		openintab : 'Opens in Tab',
		openinbacktab : 'Opens in Background Tab',
		shares : 'Shares',
		stars : 'Stars',
		tag : 'Separate tags by commas:',
		addtag : 'Add a Tag'
    },
    replacer: {
        nomatch: '未找到相應.',
        loading: '載入中 ...'
    },
	lightbox : {
		text : '燈箱',
		keyword : '燈箱'
	},
	ig : {
		menu_prefs : 'Reader+ 偏好',
		menu_theme : 'Reader+ 主題',
		menu_randomtheme : '更換主題 :'
	},
	menu : {
		label : '額外',
		showallfolders : '顯示所有資料夾'
	},
	actions : {
		text : '動作圖示'
	},
	portal : {
		readmore : '閱讀更多 (Ctrl+點擊 顯示動作)'
	},
	stars : {
		text : 'Multiple stars',
		keyword : 'Stars'
	},
	translate : {
		keyword : '翻譯'
	}
};
GRP.langs[locale].prefs = {
	global : {
		title : "Reader Plus",
		"val-save" : "儲存",
		alreadyexist : "項目已存在!",
		snew : '新增!',
		supdated : '已更新!',
		stodo : '計畫中!',
		soff : '已關閉!',
		prefssaved : "偏好設定已儲存!",
		cachecleared : "快取已清除!",
		expandall : '顯示全部'
	},
	theme : {
		mytheme : '使用"MyTheme"主題套用 <a href="http://code.google.com/p/googlereaderplus/wiki/Backgrounds" target="blank">自訂背景圖片</a> 及文字顏色 (<a href="http://code.google.com/p/googlereaderplus/wiki/Themes" target="blank">預覽</a>)',
		/*url: 'Picture URL',*/
		color : '文字顏色',
		bg : '背景顏色',
		/*repeat: 'Tiled Picture ',*/
		externaltheme : 'Google/Gmail 主題',
		imgrbg : '重複背景',
		imgsbg : '背景',
		imgrh : '重複標頭',
		imgh : '標頭',
		imghr : '右標頭',
		imghl : '左標頭',
		imgrf : '重複標尾',
		imgf : '標尾',
		imgfr : '右標尾',
		imgfl : '左標尾',
		ncolumns : '分欄數量'
	},
	ig : {
		warning : '部分主題可能會顯示不正確; 此功能目前還在測試中!',
		skin_name : 'iGoogle 主題名稱',
		skin_url : 'iGoogle 主題網址',
		debug : '除錯模式 (僅供除錯用)',
		randomtime : '以隨機啟用動態主題取代時間啟用',
		userandomthemes : '主題已隨機切換',
		randomthemes : '切換時間 (分鐘)',
		add : '馬上新增',
		next : '下一個',
		previous : '上一個',
		random : '隨機',
		search : '搜尋主題'
	},
	about : {
		thanks1 : '<td><span class="top_right"><img src="images/48.png"></span><h1>感謝您...</h1>' + '<p>... 安裝(或更新至)最新版本的 <strong>Reader Plus</strong>!</p>' + '<p>請檢查在 <a href="preferences.html" title="偏好設定"><strong>偏好設定</strong></a> 中的設置.</p>' + '<p><a href="https://chrome.google.com/webstore/detail/hhcknjkmaaeinhdjgimjnophgpbdgfmg" target="_blank" title="Visit extension homepage"><strong>拜訪Google Chrome擴充功能頁面!</strong></a></p>' + '<p><a href="http://www.twitter.com/ludoo0d0a"><img src="http://twitter-badges.s3.amazonaws.com/follow_me-a.png" alt="Follow me on Twitter"/></a></p>' + '<p></p></td>',
		thanks2 : '<td><p>如果你喜歡此擴充並且想要更多功能, 你可以贊助此擴充.</p>' + '<p>這樣我可以買一卡車的咖啡讓我能隨時醒著在寫擴充 :)</p>' + '<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=FK9P8MNY9MGZL&lc=US&item_name=GoogleReaderPlus%20project&currency_code=EUR&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted"><img alt="Donate" border="0" src="https://www.paypal.com/en_US/i/btn/btn_donate_SM.gif" width="74" height="21"></a></td>',
		//whatsnew: '<td> <h2>What\'s new!!</h2> <ul> <li>Sync settings in your Google Docs (1 profile for multiple computers)</li> <li>Try the new themes</li> <li>Toggle theme shortcut (Alt X)</li> <li>Spanish supported now</li> <li>Bugfixes</li> </ul> <p class="center"><img src="http://googlereaderplus.googlecode.com/svn/trunk/GoogleReaderPlus/screenshots/button/popup1.png"/></p><h2>And still ...</h2> <ul> <li>Cloud experience : Use shared configuration for favicons and replacer</li> <li>Toolbar button shows now a popup with last unread items and a fast tooltip preview</li> <li>or use a custom background with the new theme \'MyTheme\'</li> <li>or use a random <a href="http://www.google.com/ig/directory?type=themes" target="blank">iGoogle</a> theme</li> <li>Preview as lightbox</li> <li>Share items using <a href="http://www.readitlater.com" target="blank">ReadItLater</a></li> <li>Entry actions as floating window (general)</li> <li>Translate news</li> </ul> </td>',
		nopopup : '<p>如果你不想收到版本更新的通知, 請勾選<a href="preferences.html#general">一般選項</a>中的"不通知版本更新".</p>'
	},
    link: {
        reader: "<span>Google Reader</span>開始閱讀您的RSS訂閱項目",
        issues: "<span>回報問題</span>發現了一個Bug或有任何建議?",
        download: "<span>擴充功能頁面</span>關於本擴充的資訊及下載",
        about: "<span>關於</span>關於和鳴謝...",
        site: "<span>作者主頁</span>作者的個人網站",
        twitter: "<span><img width=\"160\" height=\"27\" src=\"http://twitter-badges.s3.amazonaws.com/follow_me-a.png\" alt=\"Follow ludoo0d0a on Twitter\"></span>關注新消息及更新",
        donate: '<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&amp;business=FK9P8MNY9MGZL&amp;lc=US&amp;item_name=googlereaderplus%20project&amp;currency_code=EUR&amp;bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted"><span><img alt="Donate" border="0" src="https://www.paypal.com/en_US/i/btn/btn_donate_SM.gif" width="74" height="21"></span>讓我能買咖啡熬夜寫擴充!</a>',
        translate: '<span>繁體翻譯</span><a href="http://twitter.com/shell2046" target="_blank">繁體漢化@shell2046</a>'
    },
    column: {
        count: "欄數",
        locked: "不對以下訂閱項目啟用:",
        pagebreak: "截斷長篇文章, 讓你能像閱讀報紙般地閱讀長篇文章.",
		miniparas : "每欄最少段落",
		entersite : "輸入網站的網址"
    },
	translate : {
		lang : "翻譯至 ",
		locked : "不對以下訂閱項目啟用:",
		include : "只對以下訂閱項目啟用:",
		entersite : "輸入網站的網址"
	},
    twitter: {
        shortener: "網址縮短",
        shortener_bitly: "BitLy 配置 (選填):",
        shortener_login: "登錄",
        shortener_apikey: "ApiKey",
        shortener_pwd: "密碼"
    },
	weibo : {
        shortener: "網址縮短",
        shortener_bitly: "BitLy 配置 (選填):",
        shortener_login: "登錄",
        shortener_apikey: "ApiKey",
        shortener_pwd: "密碼"
	},
    instapaper: {
        auth: "Instapaper認證(選填):",
        username: "電子郵件:",
        password: "密碼 (選填):"
    },
	readitlater : {
		auth : "<a href='http://www.readitlaterlist.com' target='blank'>ReadItLater</a> <a href='http://readitlaterlist.com/signup' target='blank'>驗證</a> (必填):",
		username : "用戶名:",
		password : "密碼:"
	},
	radbox : {
		auth : "<a href='http://radbox.me/support/extras' target='blank'>Radbox</a> <a href='http://radbox.me/account/user/register' target='_blank'>驗證</a> (必填):",
		username : "Userkey:"
	},
	tumblr : {
		auth : "<a href='http://www.tumblr.com' target='blank'>Tumblr</a> 驗證 (必填):",
		blogname : "部落格:",
		username : "電子郵件:",
		password : "密碼:"
	},
	reddit : {
		auth : "<a href='http://www.reddit.com' target='blank'>Reddit</a> 驗證 (必填):",
		username : "用戶名:",
		password : "密碼:"
	},
	diigo : {
		auth : "<a href='http://www.diigo.com' target='blank'>Diigo</a> 驗證 (必填):",
		username : "用戶名:",
		password : "密碼:"
	},
	plusone : {
		text : '分享至 Google+',
		keyword : 'Google+'
	},
	identi : {
        shortener: "網址縮短",
        shortener_bitly: "BitLy 配置 (選填):",
        shortener_login: "登錄",
        shortener_apikey: "ApiKey",
        shortener_pwd: "密碼"
	},
	addthis : {
		layout : '版面配置',
		layoutdesc : '各種配置格式都能在 <a href="http://www.addthis.com/web-button-select" target="_blank">這裡</a> 找到'
	},
	gmarks : {
		link : '我的 <a href="https://www.google.com/bookmarks/l#!g=Time" target="_gmarks">Google Bookmarks</a>'
	},
	pinboard : {
		auth : "<a href='http://www.pinboard.in' target='blank'>Pinboard</a> <a href='http://pinboard.in/signup/' target='blank'>驗證</a> (必填):",
		username : "用戶名:",
		password : "密碼:"
	},
    colorful: {
        tree: "在左側導航欄中顯示標籤的顏色",
		usebasecolor : "使用以下的顏色 :",
		background : "背景顏色",
		color : "前端顏色"
    },
	general: {
		counter : "在工具欄顯示未讀消息的計數器圖標",
		counterinterval : "自動重整未讀計數的時間間隔 (分鐘)",
		pageicon : '在網址列中顯示擴充圖示 (點擊會開啟選單)',
		stats : '啟用匿名統計回報 (for a better support)',
		secure : "總是自動切換至加密模式 (https)",
		noupdatepopup : "不通知版本更新",
		icontoolbar_add : "若欲將擴充按鈕加至工具列, <a href=\"https://chrome.google.com/webstore/detail/ecpcafinfpjgabomoamkhkgnpgpmdmeo\">請在此下載與安裝</a>.",
		icontoolbar_text : "<span>我們將擴充按鈕做成額外的插件,</span>                                    <br>                                    <span>可以額外安裝至Reader Plus.</span>                                    <br>                                    <span>To add the button, click <b></b> on the <a href=\"https://chrome.google.com/webstore/detail/ecpcafinfpjgabomoamkhkgnpgpmdmeo\">readerplus Toolbar button</a> page.</span><span>To remove the button, right click him and choose Disable.</span>",
		importexport_text : "你可以將你的設置 '匯出' 並且可在之後重新 '匯入', 但請確保檔案為 <a href='http://jsonformatter.curiousconcept.com/' target='blank'>JSON 格式</a>:",
		confirmimport : "你確定要匯入此設置?\n目前的設置將會被取代!",
		confirmsyncload : "你確定要從Google帳號載入設置?\n目前的設置將會被取代!",
		prefsimportedok : '設置已成功載入!',
		prefsimportfailed : '匯入失敗!',
		prefsimportnull : '找不到已儲存的設置!',
		syncprefs_text : '讀取/儲存至您的Google帳號',
		prefssavedok : '設置已成功儲存!',
		prefssavedfailed : '設置儲存失敗!',
		text_layout : '版面配置',
		text_private : '私人資料及更新',
		text_toolbaricon : '工具列圖示',
		text_pageicon : '網址列圖示',
		text_export : '匯出/匯入'
	},
	generallayout:{
		noborder : "移除邊界以在一頁中顯示更多項目",
		topcurrent : "將目前的訂閱項目至頂",
		bottomup : '將頁尾工具列移至頂部',
		currdir : '反白目前訂閱項目的資料夾',
		floatactions : "訂閱項目的動作皆顯示為浮動視窗",
		icons : '動作按鈕只顯示圖示 (勾選框除外)',
		hidetoolbar: '隱藏使用者工具列',
		hideplus: '隱藏 GooglePlus 按鈕'
	},
	limit : {
		slidewindow : "滑動視窗 - 限制訂閱項目數量",
		mini : "最小數量",
		maxi : "最大數量"
	},
	prefetch : {
		first : "初始載入擴展視圖.",
		next : "在視圖上捲動滾輪時載入項目. ",
		list : "初始化清單."
	},
	nested : {
		separator : "增加資料夾分層的分離器 (例: Sports:Footbal)."
	},
    removeads: {
        links: "連結過濾:",
        images: "圖片過濾:",
        iframes: "框架過濾:",
		preview : "反白預覽過濾器"
    },
    preview: {
        onicon: "點擊標題旁邊的圖示時顯示綜合預覽 (若未勾選則點擊標題)",
        locked: "'預覽'功能始終預設激活",
		overlay : '全螢幕預覽 (燈箱)',
		loading : '顯示 "載入中"'
    },
    fitheight: {
        locked: "不對以下訂閱項目啟用:"
	},
	filter : {
		highlights : '反白清單 (每列單個項目)',
		excludes : '排除清單 (每列單個項目)',
		searchbody : '搜尋整個內文',
		detect_duplicates : '搜尋重複',
		hide_duplicates : '隱藏重複',
		hide_excludes : '隱藏排除',
		prefer_highlights : 'Prefer Highlights over excludes',
		live : 'Live',
		word_mini : '單字內最小字數',
		button : '在各訂閱項目中新增一個過濾按鈕'
	},
    favicons: {
        providerpageicons : '使用 <a href="http://pageicons.appspot.com" target="blank">PageIcons</a> 提供者 (推薦)',
        sidebaronly: "在側邊欄顯示Favicon",
		cloud : '使用 <a href="http://wedata.net/databases/Favicons/items" target="blank">wedata/Favicons</a> 雲端資料庫',
        custom: "請輸入您的自定義Favicons :",
        add: "新增",
        tip: "Tip: 你可以很使用上下文選單 \"取得網站圖示\" 來新增",
        manual: "獲取所有網站的Favicons (不推薦;慢)",
        parsing: "這將試圖通過分析檢測每個網頁Favicon",
        entersite: "輸入網站的網址",
        prompticon: "輸入圖示的網址 (留白時自動取得):"
    },
    replacer: {
		intro : '<a href="http://code.google.com/p/googlereaderplus/wiki/ReplacerHowto" target="blank">使用幫助</a>',
		cloud : '使用 <a href="http://wedata.net/databases/Replacer/items" target="blank">wedata/Replacer</a> 雲端的線上表達式',
        link: "連結 regex",
        from: "搜索 regex/xpath/css",
        to: "替換",
		prompttitle : "此過濾設置的標題"
    },
	rank : {
		level : '顯示等級',
		ad : 'Ranking is powered by <a href="http://www.postrank.com" target="_blank"><img src="http://www.postrank.com/images/navigation/head_logo.png"/></a> <i>Intelligence from the social web</i><br/><br/><span class="warning center">Since Google has bought Postrank , used API is deprecated. I cannot guarantee this feature will still work.</span>'
	},
	readability : {
		intro : '顯示簡潔的訂閱內容',
		bigger: '文字加大',
		locked : "不對以下訂閱項目啟用:",
		include : "只對以下訂閱項目啟用:",
		ad : 'Readability is powered by <a href="http://www.readability.com?from=readerplus" target="_blank"><img src="http://www.readability.com/media/images/logo_chair.png"/></a> <br/><i>Read Comfortably—Anytime, Anywhere</i><br/>Return to distraction–free reading while supporting writers & publishers'
	},
	coverflow : {
		coverflow : '封面 / 幻燈片',
		reflection : '使用反射',
		caption : '顯示標題',
		sync : '同步項目',
		footer : '放在頁尾'
	},
	jump : {
		staticdown : '在目前項目中新增浮動圖示 \'go down\''
	},
	mark : {
		asscroll : '捲動卷軸時自動標記為已讀'
	},
    lightbox: {
        locked: "不對以下訂閱項目啟用:"
    },
    relook: {
        css: "CSS 樣板",
        resize: "開始重設大小事件以適應全螢幕"
    },
    pack: {
        mini: "<span>迷你型</span>開啟基本配置閱讀功能",
        ludoo: "<span>特色型</span>單鍵啟用推薦的功能",
        full: "<span>全能型</span>啟用所有功能",
        reset: "<span>恢復默認</span>重置您的配置(所有功能未啟用，並切換回英文版界面)",
		confirmdel : "這會移除並且重設您所有的偏好設定. 確定繼續?",
		done : "以選擇新的包. 立即儲存."
    },
    extshortcuts: {
        custom: "自定義快捷鍵",
        official: "Google Reader 官方快捷鍵",
        alreadyusedprefs: "已在偏好設定中使用!",
        alreadyusedgoogle: "已被估狗使用!"
    },
    thanks: {
        donators: "感謝對此擴充作出貢獻行為的捐贈者",
        translators: "感謝以下勇敢的翻譯者及他們出色的工作",
        authors: "感謝原創作者的腳本和皮膚 (Greasemonkey and Stylish)"
    }
};
