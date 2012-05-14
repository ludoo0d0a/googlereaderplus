//Sublime Reader skin
//Author: lai
//https://chrome.google.com/webstore/detail/jbhkdhkngalchoobjfiobbjobnbpfgmg#
GRP.sublimelight = function(prefs, langs, ID, SL, lang) {
	var css = "#sub-tree::-webkit-scrollbar {width: 10px;}*{font-weight:400!important}b,.label{font-weight:700!important}body{background-color:#ececec!important}#main{top:0!important}#sub-tree::-webkit-scrollbar,#entries::-webkit-scrollbar{width:9px!important}#sub-tree::-webkit-scrollbar-thumb,#entries::-webkit-scrollbar-thumb{background:#f6f6f6!important;border:1px solid #bbb!important;-webkit-border-radius:5px!important}#entries.list .entry{margin-right:1px!important;border-color:transparent!important}.goog-button-base-outer-box{border:none!important}.goog-button-base-top-shadow{border-bottom:none!important;background-color:transparent!important}.goog-button-base-inner-box{border:1px solid #dbdbdb!important;border-radius:3px!important;background-image:0 to(#f2f2f2))!important}.goog-button-body{font-size:11px!important;color:#888!important;line-height:18px!important;text-shadow:0 1px 0 #fff}#nav{width:200px!important}.lhn-section{border-top:none!important;background-color:transparent!important}#sub-tree{font-size:12px!important}.scroll-tree li .tree-link-selected span{font-weight:700!important;color:#3e3e3e!important}.scroll-tree li a{background-color:transparent!important;padding-left:10px!important}.scroll-tree li a:hover span{text-decoration:underline!important}#sub-tree ul ul li a{padding-left:26px!important}.scroll-tree .name{padding-left:2px!important}.lhn-section-footer{height:0!important}#chrome{margin-left:200px!important;border-left:none!important;padding-left:10px!important;padding-right:12px!important}#chrome-title{font-size:21px!important;color:#3e3e3e!important;text-shadow:0 1px 0 #fff}#viewer-header{background-color:transparent!important;border-bottom:1px solid #bbb!important;font-size:11px!important}#viewer-top-controls{border-bottom:1px solid #fff!important}#viewer-container{background-color:transparent!important;border-bottom:1px solid #bbb!important;padding:0 1px!important}#entries.list .entry .collapsed{background:#e2e2e2!important;border-color:#e2e2e2!important}#entries.list .read .collapsed{background:transparent!important;border-color:transparent!important}#entries.list .entry .collapsed:hover{background-color:transparent!important;border-color:transparent!important}#entries.list .collapsed .entry-secondary{color:#999!important}#entries.list .read .collapsed .entry-secondary{color:#b2b2b2!important}#entries .collapsed .entry-title{color:#505050!important}#entries .read .collapsed .entry-title{color:#909090!important}.entry-title a,.entry-container .entry-body{color:#333!important}#entries.list .entry .entry-actions{background:transparent!important;border:none!important}#viewer-footer{background-color:transparent!important;font-size:11px!important;border-color:#fff!important}#no-entries-msg{background:transparent!important;border:1px solid #fff!important;-webkit-box-shadow:0 0 0 1px #bbb;border-radius:10px!important}.entry-secondary .entry-title,.entry-container .entry-title a{font-family:Georgia,serif!important}#searchicon{position:absolute;top:8px;right:16px;color:#666!important;cursor:pointer;font-weight:700!important;font-size:11px}#gbar,#guser,.gbh,#logo-container,.section-button,#lhn-add-subscription-section,#lhn-recommendations,.folder-toggle,.folder-icon,.sub-icon,.tree-item-action-container,#chrome-view-links,.chevron,#chrome-lhn-toggle,.entry-icons,.entry-original,#lhn-friends .icon{display:none!important}.lhn-section .link *,.entry-body a{color:#666!important}.scroll-tree li,.scroll-tree li .tree-link-selected,#chrome-header,#entries .entry{background-color:transparent!important}.entry-date,.entry-author{font-size:11px!important}#entries.list .entry .entry-container,.entry-likers{background:transparent!important}";
	
	//new UI
	css +=sublime_cssfix();
	
	GM_addStyle(css, 'rps_'+ID);
	fireResize(false, 400);
	sublime_update();
};

function sublime_cssfix(){
	var css ='#gb{height:0px !important;}';
	css +='#gbx1,#gbx3,#gbbw,#gbzw,#gbu,#gbq1{display:none}';
	css +='#settings-button-container {margin-right: 100px;}';
	css +='#quick-add-bubble-holder {width: 500px;}';
	css +='#gbq{left:auto !important;right:0!important;top:30px!important;background-color:#eee!important;-webkit-box-shadow:rgba(0,0,0,0.3) -4px 4px 10px 1px!important;padding:10px!important}';
	css +='#gbq{display:block;position:absolute;z-index: 99;width:650px;}';
	css +='#search{height: 40px;;}';
	css +='#gbq2{margin-left: 20px !important;}';
	return css;
}

/*
 * Various useful methods
 */
function sublime_update(){
    //hide searh
    var s = get_id('gbq');
    hide(s);
    s.addEventListener('click', function(e){
        e.stopPropagation();
    }, false);
    //new search
    dh(false, 'searchicon', {
        id: 'searchicon',
        html: 'SEARCH'
    }, {
        click: function(){
            toggle(s);
        }
    });
}
