//Glass BlackGold
//Author: Ghis1964
//http://userstyles.org/styles/26569
GRP.glassblackgold = function() {
	//a lot of changes to work under chrome
	//-moz ->webkit + strecteched image using css3 background-size:100%
	//still needs a lot of clean up
	var css = 'body{background:url(http://i40.tinypic.com/161ksk.jpg)no-repeat fixed top center!important;background-size:100%!important;color:#aaa!important;border:0!important}#gbar a,#gbar a:visited,#guser a,#guser a:visited{color:#AAA!important}#logo{display:none}[id=gbar],[id=guser],.text,.gbh,#explore-promo,#tips,#overview-footer,[class=viewer-page],#lhn-selectors .selector:hover,[id=quick-add-success],.friend-interruption,#directory-box .tab-group,#directory-box .tab-contents,#directory-contents .tab-header,.tab-group-contents,#featured-bundles-container,#discover-table td,.bundle-container th,#friends-tree .friends-tree-following-info,#directory-welcome-conversion,.date-tooltip td,.date-tooltip,.text-tooltip,.text-tooltip td,[target=_blank]{color:#aaa!important;border:0!important}#current-entry.read .entry-container .entry-body,.read .entry-container .entry-body,#overview .item-snippet,#team-messages .body,#overview .label,p,dl,multicol,.overview-item-link,address,blockquote,body,caption,center,col,colgroup,dd,dir,div,dl,dt,fieldset,form,h1,h2,h3,h4,h5,h6,hr,html,isindex,li,listing,map,marquee,menu,noframes,ol,p,plaintext,pre,table,tbody,td,tfoot,th,thead,tr,ul,xmp{color:#aaa!important}#recent-activity #recent-activity-kept-unread h4,#recent-activity #recent-activity-read h4,#explore-promo-new,#recent-activity .recent-stream-title{color:#dfdfdf!important}a,.link,.lhn-section,.scroll-tree li,#chrome-header,#viewer-header,#viewer-footer,[id=chrome],.card-common,span.name-text,.name{background:transparent!important;color:#aaa!important;border:0!important}.card-common,[id=chrome-view-links]{-webkit-border-radius:3px 3px 3px 3px!important;-webkit-box-shadow:1px 1px 2em 2px #000!important;border-width:0!important}.card-content{-webkit-border-radius:3px 3px 3px 3px!important;-webkit-box-shadow:0 0 2em 2px #000!important}.scroll-tree{-webkit-border-radius:7px 7px 7px 7px!important;-webkit-box-shadow:inset 1px 1px 2em 2px #000!important}tr{-webkit-border-radius:7px 7px 7px 7px!important;-webkit-box-shadow:inset 0 0 3em 3px #999!important}.posting-form .textarea{-webkit-border-radius:7px 7px 7px 7px!important;-webkit-box-shadow:inset 0 0 1em 1px #000!important;border-width:0!important;margin:3px!important}#entries .entry,#entries.list .entry-container,[id=current-entry],#no-entries-msg,.interruption{-webkit-border-radius:3px 3px 3px 3px!important;-webkit-box-shadow:inset 0 0 2em 4px #999!important}[id=viewer-top-controls],.email-entry-table,.field-name,.email-this-area,#current-entry .card .action-area,.action-area .email-this-area,#quick-add-bubble-holder,#setting-extras .extra,#settings #settings-navigation .selected,#settings .settings-list .setting-body,#settings .settings-list .setting-body td,.setting-import,#footer,.hover-form,[class=" fr-modal-dialog fr-dialog-with-close"],[class=" fr-modal-dialog-buttons"],[id=:a0],[id=:a1],[class=f],[class="fr-clips-dialog fr-modal-dialog fr-dialog-with-close"],[id=main-clip-creator],.fr-modal-dialog-buttons,h3,[id=publisher-preview-container],[id=publisher-preview],[id=readerpublishermodule0],[class=i],[id=publisher-blogger-widget],[id=publisher-snippet],.fr-modal-dialog-title,[class=" fr-modal-dialog-title  fr-modal-dialog-title-draggable"],[style="margin: 0.5em; padding: 0pt; background: none repeat scroll 0% 0% rgb(255, 255, 255); border: 1px solid rgb(188, 204, 235); text-align: left; text-indent: 0pt; text-decoration: none; font-weight: normal; font-family: arial,sans-serif; font-size: 10pt;"],#header,#main,#main2,[class="fr-confirm-dialog fr-modal-dialog"],#no-entries-msg,.friend-interruption,.interruption,#featured-bundles-container,#discover-table td,.bundle-container,.bundle-container th,.bundles-list,p,#trends .sorting td,#trends .trends-columns td,[class=top-links],[class=sorting-empty],#chrome.page-view,#viewer-page-container,#friends-manager h2,#friends-manager .style-chooser,*|:-webkit-any-link img,img[usemap],object[usemap],.preview-interruption-related-streams,[class="goog-button-base-outer-box goog-inline-block"],[class="goog-button-base-inner-box goog-inline-block"],.goog-button-body,.fr-modal-dialog{border-width:0!important}#search-input,#search-restrict-input{-webkit-border-radius:3px 3px 3px 3px!important}#stream-prefs-menu-menu,.webkit .goog-menu,.gecko191 .goog-menu,.hover-form{-webkit-border-radius:3px 3px 3px 3px!important;-webkit-box-shadow:0 0 2em 6px #999!important}.entry .entry-actions{direction:ltr;font-size:100%!important;height:14px!important;-webkit-border-radius:3px 3px 3px 3px!important;-webkit-box-shadow:inset 0 0 .4em 1px #000!important;margin:-2px!important;padding:4px 7px .5em!important}#trends .tab-header{-webkit-border-radius:3px 3px 3px 3px!important;-webkit-box-shadow:inset 0 0 1em 2px #999!important}.entry,.card-content,#entries .entry{-webkit-box-shadow:0 0 1em 1px #000!important}#search-restrict-input{width:110px!important;height:20px!important}a:hover,span.name-text:hover,span.link:hover,span.item-star:hover,#sub-tree-header:hover,#viewer-all-new-links .link:hover,.name-unread{color:#cfcfcf!important}.bookmarklet,.bookmarklet-container .bookmarklet-callout-inner{-webkit-border-radius:8px 8px 8px 8px;background-color:rgba(20,20,20,.4)!important;padding:5px}[id=blue],[class=blue],[color=blue],[value=blue]{color:#aaa!important;border-width:0!important}#bundle-creation-area .drag-over{border-color:#aaa!important;border-style:solid;border-width:0!important}#entries.list .read .collapsed{margin:-2px!important}.subscribe-button{-webkit-border-radius:2px 2px 2px 2px!important;-webkit-box-shadow:0 0 .4em 1px #000!important}#search-input{-webkit-border-radius:7px 7px 7px 7px!important;-webkit-box-shadow:0 0 .4em 4px #999!important}[class=" fr-modal-dialog fr-dialog-with-close"],[id=:a1],[id=quick-add-success],[class="fr-clips-dialog fr-modal-dialog-title fr-clips-dialog fr-modal-dialog-title-draggable"],[class="fr-clips-dialog fr-modal-dialog fr-dialog-with-close"],[class="fr-confirm-dialog fr-modal-dialog"]{color:#aaa!important;-webkit-border-radius:4px 4px 4px 4px!important;-webkit-box-shadow:0 0 .2em 6px #999!important;margin:-3px!important}select > option{-webkit-padding-end:5px;-webkit-padding-start:3px;padding-bottom:0;padding-top:0}option{-webkit-user-select:none;display:block;float:none!important;line-height:normal!important;min-height:1em;position:static!important;text-indent:0;white-space:nowrap!important;word-wrap:normal!important}.read .entry-container .entry-title a,.read .entry-container a.entry-source-title,.read .entry-container .entry-body a,.read .entry-container a.entry-post-author-name{color:#b1b1b1!important}.read .entry-container .entry-title a:hover,.read .entry-container a.entry-source-title:hover,.read .entry-container .entry-body a:hover,.read .entry-container a.entry-post-author-name:hover,:-webkit-any-link:hover{color:#CFCFCF!important}.goog-menu-button:hover .goog-menu-button-dropdown,.goog-menu-button.goog-button-base:focus .goog-menu-button-dropdown,#entries.list .read .collapsed,#setting-extras .extra,.no-chrome,#settings #settings-navigation .selected,#entries,#settings .settings-list .setting-body,#settings .round-box td,[id=message-area-inner],[class=message-area-text],[id=message-area-outer],[class="message-area-inner message-area-text-container"],[class=message-area],h3,[class=f],[class="message-area hidden"],[id=loading-area],.message-area-text-container,[class=offscreen],.hover-form,[class=i],[style="-webkit-user-select: none; visibility: visible; left: 675px; top: 1075.27px;"],[class=" fr-modal-dialog-content"],[id=:a0],[style="margin-left: -27px; width: 64px;"],[class=" fr-modal-dialog fr-dialog-with-close"],[class=" fr-modal-dialog-buttons"],[class="fr-clips-dialog fr-modal-dialog-content"],[class="fr-clips-dialog fr-modal-dialog fr-dialog-with-close"],[id=:a1],[id=main-clip-creator],.fr-modal-dialog-buttons,[id=publisher-preview-container],[id=publisher-preview],[id=readerpublishermodule0],[id=publisher-title],[class="fr-clips-dialog fr-modal-dialog-title fr-clips-dialog fr-modal-dialog-title-draggable"],[style="margin: 0.5em; padding: 0pt; background: none repeat scroll 0% 0% rgb(255, 255, 255); border: 1px solid rgb(188, 204, 235); text-align: left; text-indent: 0pt; text-decoration: none; font-weight: normal; font-family: arial,sans-serif; font-size: 10pt;"],[class="message-area-inner message-area-bottom"],[class="message-area-inner message-area-bottom-1"],[class="message-area-inner message-area-bottom-2"],[class="message-area-inner message-area-bottom-3"],[class="message-area-inner message-area-bottom-4"],[class="message-area-inner message-area-bottom-5"],[class="message-area-inner message-area-bottom-6"],[class="message-area-inner message-area-bottom-7"],[class="message-area-inner message-area-bottom-8"],[class="message-area-inner message-area-bottom-9"],[class="message-area-inner message-area-bottom-10"],[class="message-area-inner message-area-bottom-11"],.message-area-inner message-area,[type=text/javascript],[class=" fr-modal-dialog-title  fr-modal-dialog-title-draggable"],#header,#main,#main2,[class="fr-confirm-dialog fr-modal-dialog"],[class="fr-confirm-dialog fr-modal-dialog-content"],[class=secondary],[class=link],[class="selector selected"],[id=reading-list-selector],[href=#overview-page],#trends .tab-header,.small-interruption,.preview-interruption,.preview-interruption-related-streams,.fr-modal-dialog-content,.fr-modal-dialog-bg,[id=:3k],option,option:checked,select > option,[id=subs-label-selector]{background-color:transparent!important;color:#aaa!important}#viewer-container,.entry,.card-actions,.collapsed,.entry-container,.entry-actions,.scroll-tree li a.menu-open:hover,a:hover .tree-item-action-container,.section-button,.section-menubutton,[id=message-area-inner],[class=message-area-text],[id=message-area-outer],[class="message-area hidden"] [class="message-area-inner message-area-text-container"],[id=loading-area],#loading,#no-entries-msg,.message-area-text-container,[class=offscreen],[style="margin-left: -27px; width: 64px;"],.hover-form{background-color:transparent!important}';
 	GM_addStyle(css, 'rps_glassblackgold');
};