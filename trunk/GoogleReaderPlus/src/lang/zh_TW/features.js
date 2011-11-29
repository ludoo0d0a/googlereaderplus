/**
 * ReaderPlus
 * Translation for features
 *
 * **************************
 * 翻譯 : 繁體中文 By greenteaf
 * **************************
 *
 * Version : 2.0
 * Date : 11-28-2011
 * @author greenteaf
 * @author shell9000 (v1.0)
 */
var locale = 'zh_TW';
namespace('GRP.langs.' + locale);
GRP.langs[locale].categories = {
        main: '主要',
        theme: '主題/風格',
        icons:'圖示',
        counter:'計數器',
        layout: '版面配置',
        navigation: '導航',
        share: '分享',
        action: '行為',
        content: '內容'
};
GRP.langs[locale].scripts = {
    general: {
        name: "一般功能",
        desc: "一般功能配置"
    },
    theme: {
        name: "主題",
        desc: "更改Google Reader界面風格"
    },
    ig: {
        name: "iGoogle 主題",
        desc: "在Google Reader中使用 <a href='http://www.google.com/ig/directory?type=themes' target='blank'>iGoogle 主題</a> (Beta)"
        },
    relook: {
        name: "Relook",
        desc: "使用自訂的CSS樣式"
    },
    favicons: {
        name: "網站圖示",
        desc: "顯示每個訂閱的網站圖示"
    },
    unreadcount: {
        name: "顯示所有未讀新聞數",
        desc: "顯示所有未讀新聞數"
    },
    fixlayout: {
        name: "最佳化版面配置",
        desc: "最佳化各種不同的版面配置，例項目最寬化，修正遺失的項目圖片，讓大張圖片調整至適合螢幕大小"
    },
    count: {
        name: "修正計數(1000+)",
        desc: "顯示正確的未讀新聞計數"
    },
    counticon: {
        name: "計數器圖示",
        desc: "在Google Reader網頁圖示上顯示未讀新聞計數"
    },
    removeads: {
        name: "移除廣告",
        desc: "簡單去除多餘的廣告"
    },
    column: {
        name: "多欄顯示",
        desc: "像報紙般顯示多欄的新聞"
    },
    preview: {
        name: "綜合預覽",
        desc: "以原文內容取代訂閱項目內容"
    },
    colorful: {
        name: "彩色列表",
        desc: "在不同的訂閱項目中自訂背景顏色"
    },
    filter: {
        name: "過濾器",
        desc: "以自訂條件過濾移除或反白新聞"
    },
    rank: {
        name: "熱門",
        desc: "顯示<a href='http://www.postrank.com' target='blank'>PostRank™</a>提供的熱門訂閱項目"
    },
    limit: {
        name: "限制顯示數量",
        desc: "顯示每頁的新聞顯示數量. 超過限制數量時優先顯示未讀項目."
    },
    prefetch: {
        name: "預先載入",
        desc: "預先載入其他新聞以增進瀏覽流暢度"
    },
    nested: {
        name: "巢狀資料夾",
        desc: "讓資料夾能更多層的分類"
    },
    readbymouse: {
        name: "使用滑鼠瀏覽",
        desc: "使用滑鼠左/右鍵切換下/前一篇新聞"
    },
    facebook: {
        name: "Facebook",
        desc: "添加分享新聞至 Facebook 的按鈕"
    },
    twitter: {
        name: "Twitter",
        desc: "添加分享新聞至 Twitter 的按鈕"
    },
    instapaper: {
        name: "Instapaper",
        desc: "添加分享新聞至 <a href='http://www.instapaper.com' target='_instapaper'>Instapaper</a> 的按鈕"
    },
    readitlater: {
        name: "ReadItLater",
        desc: "添加分享新聞至 <a href='http://www.readitlater.com' target='_readitlater'>ReadItLater</a> 的按鈕"
    },
        blogger: {
        name: "Blogger",
        desc: "添加分享新聞至 <a href='http://www.blogger.com' target='_blogger'>Blogger</a> 的按鈕"
    },
    tumblr: {
        name: "Tumblr",
        desc: "添加分享新聞至 <a href='http://www.tumblr.com' target='_tumblr'>Tumblr</a> 的按鈕"
    },
    pinboard: {
        name: "Pinboard",
        desc: "添加分享新聞至 <a href='http://www.pinboard.in' target='_pinboard'>Pinboard</a> 的按鈕"
    },
    reddit: {
        name: "Reddit",
        desc: "添加分享新聞至 <a href='http://www.reddit.com' target='_reddit'>Reddit</a> 的按鈕"
    },
    gmarks: {
        name: "Google Bookmarks",
        desc: "添加分享新聞至 <a href='http://bookmarks.google.com' target='_gmarks'>Google Bookmarks</a> 的按鈕"
    },
    mark: {
        name: "標記已讀",
        desc: "快捷鍵控制當前閱讀的前/後項目為已讀狀態"
    },
    jump: {
        name: "添加頂部/底部連結",
        desc: "添加至頂的按鈕在最下面, 添加至底的按鈕在最上面"
    },
    fitheight: {
        name: "最佳化高度",
        desc: "將目前的新聞調整至螢幕高度(長文章)"
    },
    closeentry: {
        name: "關閉新聞",
        desc: "給每個新聞添加一個'關閉'按鈕，將其刪除"
    },
    openbackground: {
        name: "在新分頁開啟",
        desc: "給每個新聞添加一個'在新分頁開啟'按鈕"
    },
    translate: {
        name: "翻譯",
		desc: "翻譯新聞的內容及標題"
    },
    replacer: {
        name: "替換腳本",
        desc: "替換進入原始網頁的一部分"
    },
    aero: {
        name: "Google Aero 工具列",
        desc: "工具列使用Aero主題"
    },
    actions: {
        name: "動作按鈕圖示",
        desc: "底部動作按鈕只顯示圖示"
    },
    info: {
        name: "系統資訊",
        desc: "顯示系統資訊"
    },
    extshortcuts: {
        name: "快捷鍵",
        desc: "鍵盤快捷鍵"
    },
    pack: {
        name: "快速設置",
        desc: "預先設置的的配置參數"
    },
    thanks: {
        name: "鳴謝",
        desc: ""
    },
    about: {
        name: "關於",
        desc: "關於 Reader Plus"
    }
};
GRP.langs[locale].skins = {
    none: {
        name: "無"
    },
    air: {
        name: "Air Skin"
    },
    aircomic: {
        name: "Air Skin Comic Sans"
    },
    black: {
        name: "Google Enhanced Black"
    },
    dark: {
        name: "Dark Skin"
    },
    darkgray: {
        name: "Dark Gray Skin"
    },
    helvetireader: {
        name: "Helvetireader Skin"
    },
    minimal: {
        name: "Minimalistic Skin"
    },
    optimized: {
        name: "Optimized Skin"
    },
    portal: {
        name: "Portal Theme"
    },
    player: {
        name: "Player Theme"
    },
    osxblue: {
        name: "Mac OS X Snow Leopard - Blue"
    },
    osxblack: {
        name: "Mac OS X Snow Leopard - Black"
    },
    calibri: {
        name: "Calibri Skin"
    },
    glassblackgold: {
        name: "Glass Black Gold Skin"
    },
    simpleclean: {
        name: "Simple and Clean"
    },
    peacockfeather: {
        name: "Peacock Feather"
    },
    myowngooglereader: {
        name: "My Own Google Reader"
    },
    compactcleantweaked: {
        name: "Compact, Clean & Tweaked"
    },
    absolutelycompact: {
        name: "Absolutely Compact"
    },
    darkshinyblue: {
        name: "Dark Shiny Blue"
    },
    persian: {
        name: "Optimized Persian"
    }
};
