// ==UserScript==
	// @name		google Enhanced BLACK
	// @description		This Black Google script enhances all Google service pages with an inverted color-scheme for reduced eye fatigue; it also removes ads & clutter and improves page layout and readability by widening search results
	// @version		3.2.4
	// @date		2010-10-07
	// @source		http://userscripts.org/scripts/show/12917
	// @identifier		http://userscripts.org/scripts/source/12917.user.js
	// @author		Gabriel Dibble <gdibble@gmail.com>
	// @namespace		http://userscripts.org/people/24894
	// @include		htt*://*.google.*
	// @include		htt*://www.google.*/accounts*
	// @include		htt*://www.google.*/reader*
	// @include		htt*://www.google.*/voice*
	// @include		htt*://services.google.*
	// @include		htt*://translate.googleusercontent.*
	// @include		htt*://*.googlelabs.*
	// @include		htt*://*.googleratings.*
	// @include		htt*://*.appspot.*
// ==/UserScript==

// GENUINE FREEWARE <3
// (CC) BY-NC-SA: This work is licensed under a Creative Commons Attribution-Noncommercial-Share Alike 3.0 United States License. <http://creativecommons.org/licenses/by-nc-sa/3.0/us/>

// Change Log & To-Do Lists available @source (URI above)
// Feel free to leave suggestions/criticism on the UserScript Page or via email; THANX! =)


GRP.black = function(){
	var BRUTEFORCE = false;
	
	function sI(w){switch(w){
		case "v":return 1286442835013;
		case "h":return "http://userscripts.org/scripts/show/12917";
		case "f":return "http://userscripts.org/scripts/source/12917.user.js";
	}}//alert(Date.now());
	
	
	function enhanceGoogle(){
		var Gtld = location.host.substring(iO(location.host, ".google.") + 8, location.host.length), lH = location.href, lc = uColorLink, vl = uColorLinkVisited, gL = _gL(), gHpL = _gL("H"), rW = _rW(), isiG = (iO(lH, ".google.") > -1 && iO(lH, "/ig") > -1 && iO(lH, "/ig") < 24);
		var cssBf='', $_$ = // General Google Page
 /* Global font override */
		"* {font-family:" + uFontFamily + ";}" +
		/* page bg */
		"BODY {background:#000 none !important; color:#fff;}" +
		/* link color */
		"A,#gbar A.gb1,#gbar A.gb2,#gbar A.gb3,#guser A.gb3,#guser A.gb3 U,#guser A.gb4,SPAN.i,.linkon,#codesiteContent A,TABLE.mmhdr TBODY TR TD.mmttlinactive SPAN,TABLE TBODY TR TD TABLE TBODY TR TD A,.lk,BODY > DIV.g-doc > DIV#body-wrapper > DIV.g-section DIV#related TABLE.gf-table TH.sortable,SPAN.linkbtn,DIV#ss-status A.gb3,SPAN#rptgl SPAN,A SPAN.b,.mmttl SPAN,A > SPAN.navlink,SPAN > SPAN.link,DIV#rptgl > SPAN,DIV#tbt-expander DIV,#guser SPAN > SPAN,DIV#ss-bar DIV#ss-box > A,DIV#rpsp.rpop DIV.tl B,SPAN#zippyspan,.actbar-btn,.gtc-doclist-item-select > SPAN,.goog-tab-bar .goog-tab > DIV,UL.goog-tabpane-tabs > LI.goog-tabpane-tab,DIV.gwt-Label,#guser .gb2,DIV.n SPAN.b,.linkbtn,.blended-menu-option .blended-menu-option-selected,.blended-menu-option-not-selected, #chrome-title .chevron {color:" +
		lc +
		" !important;}" +
		/* visitedLinx color */
		"A:visited {color:" +
		vl +
		" !important;}" +
		/* results visited linx */
		"DIV#res A:visited {font-size:0.8em !important;}" +
		/* google bar txt */
		"#gbar SPAN {color:#999;}" +
		/* google bar txt */
		"#gbar DIV.gb1 {background-color:#c9d7f1 !important;}" +
		/* google bar txt */
		"#gbar DIV.gb2 {padding-top:0; padding-bottom:0; background-color:#c9d7f1 !important;}" +
		/* google bar linx */
		"#gbar A.gb1,#gbar B.gb1,#gbar A.gb3 {position:relative; bottom:0.2em; font-weight:bold !important; font-size:1.15em !important;}" +
		/* google bar b-line */
		"#gbh,.gbh {border-color:#555;}" +
		/* google bar bg */
		"#guser,#guser *,#gbar,#gbar *,#ghead,#gog,.lhcl_onebar,.lhshdr,.rshdr,.tpblk,.tphdr,#tbbcc,#rgsh_s,#gc-header {background-color:transparent !important; font-family:" +
		uFontFamily +
		" !important; color:#ccc;}" +
		/* search options boxes */
		"#sbl,.fade {background-color:transparent !important;}" +
		/* top logos */
		"#logo SPAN,DIV#regular_logo,TABLE[align='center'] TBODY TR TD DIV#logo,#search .logo,TABLE[width='100%'][cellpadding='2'] TBODY TR TD[width='1%'][valign='top'],#gc-header #logo,#header #logo,TABLE[style='margin: 0px 0px -6px 0pt; padding: 0px; width: 100%;'] TD[style='width: 153px;'],TABLE[align='center'] TBODY TR TD[width='155'][rowspan='2'],TABLE[align='center'] TBODY TR[valign='middle'] TD[width='135'],BODY[bgcolor='#ffffff'][topmargin='3'] CENTER TABLE[width='725'] TBODY TR TD TABLE[cellspacing='1'] TBODY TR TD[height='1'][bgcolor='#666666'],BODY > TABLE[width='100%'][style='direction: ltr;'] > TBODY > TR > TD,BODY > TABLE[width='100%'] > TBODY > TR > TD[width='100%'][style='padding-left: 15px;'],BODY.siteowners > TABLE[width='96%'] > TBODY > TR > TD[width='1%'],BODY > CENTER > DIV > TABLE[width='739'] > TBODY > TR > TD[width='100%'],BODY[bgcolor='#ffffff'] > TABLE[cellpadding='5'][align='center'] > TBODY > TR[valign='middle'] > TD[width='1%'],TABLE[width='100%'][cellspacing='0'][cellpadding='0'][border='0'] > TBODY > TR > TD[width='1%'][valign='top'],BODY.search > TABLE[width='95%'] > TBODY > tr[valign='top'] > TD[width='1%'],BODY > DIV#container > DIV#header > DIV[style='float: left; width: 155px;'],BODY > TABLE[width='100%'][height='100%'][style='margin-bottom: 1px;'] > TBODY > TR > TD[valign='top'] > TABLE[width='100%'][cellspacing='2'] > TBODY > TR > TD[width='1%'],BODY[onload='sf()'] > CENTER > FORM > TABLE#frame > TBODY > TR > TD > TABLE[width='100%'] > TBODY > TR > TD[width='100%'] > TABLE > TBODY > TR > TD[width='100%'] > TABLE > TBODY > TR > TD > DIV[style='margin: 5px 0pt 4px 4px; background: transparent url(/images/firefox/sprite.png) no-repeat scroll 0pt -95px; " +
		bS('background-clip') +
		": " +
		bS('initial') +
		"; " +
		bS('background-origin') +
		": " +
		bS('initial') +
		"; " +
		bS('background-inline-policy') +
		": " +
		bS('initial') +
		"; height: 23px; width: 80px;'],BODY > TABLE#title-t > TBODY > TR > TD.tc,A#glogo,BODY.answer_page TABLE.header_table > TBODY > TR > TD.header_logo_td,CENTER > H1#ps-logo,BODY[marginheight='3'][bgcolor='white'][topmargin='3'] > CENTER > TABLE > TBODY TR > TD[align='left'] > TABLE > TBODY > TR > TD[valign='top'] > DIV,BODY[marginheight='3'][bgcolor='white'][topmargin='3'] > TABLE[width='100%'][cellspacing='0'][cellpadding='0'][border='0'] > TBODY > TR > TD[valign='top'] > DIV,BODY > TABLE[width='100%'][cellspacing='2'][cellpadding='0'][border='0'][style='margin-top: 1em;'] > TBODY > TR > TD[width='1%'],BODY > DIV#wrapper > DIV#header_logo,BODY.hp > DIV#main-wrapper > DIV#main > DIV.background > DIV.centered > DIV.search > DIV#browse-header > TABLE > TBODY > TR:first-child > TD:first-child,BODY.serp > DIV#main-wrapper > DIV#main > DIV.background > DIV.centered > DIV.search > DIV#search-header,BODY.sp > DIV#main-wrapper > DIV#main > DIV.background > DIV.centered > DIV.search > DIV#browse-header > TABLE > TBODY > TR:first-child > TD:first-child,BODY > CENTER > DIV#videoheader > TABLE.table-header > TBODY > TR > TD.td-logo,BODY#search-results-body > DIV#videoheader > TABLE.table-header > TBODY > TR > TD.td-logo,BODY > DIV > DIV#videoheader > TABLE > TBODY > TR > TD:first-child,BODY > DIV#main-wrapper > DIV#main > DIV.background > DIV.centered > DIV.search > DIV#page-header > TABLE > TBODY > TR > TD:first-child,BODY > FORM[name='f'] > TABLE[width='100%'][cellspacing='0'][cellpadding='0'][border='0'][style='clear: left;'] > TBODY > TR > TD:first-child,BODY > DIV#whole > TABLE[cellspacing='0'][cellpadding='0'][border='0'][style='font-size: medium;'] > TBODY > TR > TD,BODY > TABLE[cellspacing='0'][cellpadding='0'][border='0'][style='font-size: medium;'] > TBODY > TR > TD,DIV[style='background: transparent url(/intl/en_com/images/logo_plain.png) no-repeat scroll 0 0%; " +
		bS('background-clip') +
		": " +
		bS('initial') +
		"; " +
		bS('background-origin') +
		": " +
		bS('initial') +
		"; " +
		bS('background-inline-policy') +
		": " +
		bS('initial') +
		"; height: 110px; width: 276px;'],BODY > FORM > TABLE#sft > TBODY > TR > TD.tc,BODY > DIV[style='clear: both;'] > CENTER > TABLE[cellspacing='0'][cellpadding='0'][border='0'] > TBODY > TR > TD[style='padding-bottom: 8px; padding-top: 2px;'],BODY > DIV#top_search_bar > DIV[style='padding: 1px 10px 0px 6px; float: left;'],BODY#search-results-body > DIV#videoheader > TABLE.table-header > TBODY > TR > TD:first-child,BODY > DIV#body-wrapper > DIV.g-doc > DIV.g-section > DIV.g-unit > DIV.sfe-logo > A > DIV.SP_logo,BODY > DIV.g-doc > DIV#body-wrapper > DIV.g-section > DIV.g-unit > DIV.sfe-logo > A > DIV.SP_logo,BODY > DIV.g-doc > DIV.g-section > DIV.g-unit > DIV.sfe-logo > A > DIV.SP_logo,BODY DIV.g-doc DIV.g-section > DIV.g-unit > DIV.sfe-logo,BODY > FORM > DIV#advd-search-header > TABLE:first-child > TBODY > TR > TD[width='1%']:first-child,BODY > SPAN#main > DIV#header > DIV#sform > FORM#tsf > TABLE#sft > TBODY > TR > TD:first-child > H1,BODY > FORM[name='f'] > TABLE[width='99%'] > TBODY > TR:first-child > TD[width='1%'],BODY > DIV > TABLE#srch_box_t > TBODY > TR > TD:first-child,BODY[bgcolor='#ffffff'] > TABLE[width='100%'] > TBODY > TR:first-child > TD[width='143']:first-child,BODY > TABLE[style='margin: 7px 3px; clear: both;'] > TBODY > TR:first-child > TD:first-child,BODY DIV#srp-header > FORM[name='f'] > TABLE > TBODY > TR > TD:first-child,BODY > TABLE#sft > TBODY > TR > TD.tc,BODY[bgcolor='#ffffff'] > TABLE > TBODY > TR > TD[valign='top'][rowspan='2'],BODY > DIV#h > TABLE:first-child > TBODY > TR > TD:first-child,BODY > DIV#headerdiv > TABLE[width='100%']:first-child > TBODY > TR:first-child > TD[width='1%'][valign='top'],BODY > DIV#masthead > TABLE.searchbar > TBODY > TR#logo-section > TD.searchbar-logo,BODY > DIV[style='clear: both;'] > CENTER > TABLE[cellspacing='0'][cellpadding='0'][border='0'] > TBODY > TR > TD[style='padding-bottom: 8px; padding-top: 2px;'],BODY.e > DIV.h TABLE#gn_ph > TBODY > TR:first-child > TD[align='right']:first-child,BODY > FORM[name='gs'] > TABLE#scife_hdr > TBODY > TR:first-child > TD[valign='top']:first-child,BODY > DIV#whole > DIV[style='margin: 10px 0pt 5px;'],BODY[marginheight='3'][topmargin='3'] > DIV[style='margin: 10px 0pt 5px;'],BODY TABLE#top_search_box > TBODY > TR > TD:first-child,BODY[marginheight='3'][bgcolor='#ffffff'][topmargin='3'] > DIV[style='margin: 3px 8px;'] > TABLE[style='margin: 7px 0pt 10px; clear: both;'] > TBODY > TR:first-child > TD[valign='top'][rowspan='2']:first-child,BODY[style='margin-top: 4px; cursor: default;'] > TABLE[width='100%'] > TBODY > TR:first-child > TD[valign='top']:first-child,BODY#gsr > DIV#cnt > FORM#tsf > TABLE#sft > TBODY > TR > TD > H1,BODY > SPAN#main > DIV > DIV#cnt > DIV#sform > FORM#tsf > TABLE#sft > TBODY > TR:first-child > TD:first-child > H1,DIV#cnt DIV#sfcnt FORM#tsf > DIV > DIV:first-child,FORM#tsf > DIV > DIV#logocont > H1 {width:150px !important; height:55px !important; background:transparent url('" +
		gL +
		"') no-repeat scroll 0 !important; text-decoration:none !important; font-size:0; color:transparent !important;}" +
		/* intl home logo [insert] */
		"BODY > SPAN#main > CENTER > SPAN#body > CENTER > DIV#logo,DIV#lga,DIV#lga > DIV#logo,DIV#lga > DIV > DIV#logo {width:281px !important; height:191px !important; background:transparent url('" +
		gHpL +
		"') no-repeat scroll center center !important;}" +
		/* intl home logo [remove] */
		"DIV#lga > DIV > DIV#logo {background-image:none !important;}" +
		
		/* CONDITIONAL-EVALUATION related to Homepage Special Logo [exception for g.Images-home] */
		(((($('logo') && ($('logo').alt == 'Google' || $('logo').title == 'Google') || iO(lH, "images.google.") > -1)) && $("lga") === null) ? /* insert hp-logo img */ "BODY[vlink='#551a8b'] > DIV#xjsd,BODY > SPAN#main > CENTER > DIV#xjsd,BODY[vlink='#551a8b'] > CENTER > DIV#xjsd {height:131px !important; background:transparent url('" + gHpL + "') no-repeat scroll 0 !important;}" +
		/* intl logo mover */
		"BODY[vlink='#551a8b'] > DIV#xjsd,BODY > SPAN#main > CENTER > DIV#xjsd,BODY[vlink='#551a8b'] > CENTER > DIV#xjsd {position:absolute; top:52px; left:0; width:100% !important; background-position:center !important;}" : "") +
		(($('logo') && $('logo').alt != 'Google' && iO(lH, "images.google.") == -1) ? "" : /* large logo hide */ "BODY > CENTER IMG[onload='window.lol&&lol()']#logo,BODY > CENTER DIV[onload='window.lol&&lol()']#logo,BODY > SPAN#main > CENTER > SPAN#body > CENTER > IMG#logo,BODY > SPAN#main > CENTER > SPAN#body > CENTER DIV#logo,BODY > CENTER > DIV#lga > IMG[width='276'] {visibility:hidden; min-height:117px;}") +
		
		/* featur logo hider */
		"BODY > SPAN#main > CENTER > SPAN#body > CENTER > DIV#lga > A > IMG#logo {visibility:hidden;}" +
		/* h.spcl logo hider */
		(uLogoLuri != "none" ? "BODY > SPAN#main > CENTER > SPAN#body > CENTER > A > IMG#logo {visibility:hidden;}" : "") +
		
		/* Evrythng home logo hider */
		"DIV#lga > IMG#logo {visibility:hidden;}" +
		/* Neo home logo remover */
		"DIV#lga > IMG#hplogo {display:none;}" +
		
		/* search input */
		"INPUT[type='text'],INPUT[type='password'],INPUT[name='q'] {background:#333 none !important; background-color:rgba(0,0,0,0.6) !important;  padding:2px; border:solid 1px #ccc; font-weight:bold; color:" +
		uColorInputTxt +
		" !important;}" +
		/* srch input b-brdr */
		"FORM[name='f'] TABLE#search-input > TBODY > TR > TD.srchBoxCont {border-bottom:0 none transparent;}" +
		/* submit btns */
		"INPUT[type='submit'],BUTTON[type='submit'],INPUT[value='Cancel'],INPUT[value='Save'],INPUT#stxemailsend,INPUT[value='Discard'],INPUT[value='Download'],INPUT[value='Add it now'],INPUT[type='button'][value='Save changes'],INPUT[type='reset'][value='Clear All'],INPUT[type='reset'][value='Reset'],INPUT[type='button'][value='Done'],INPUT[type='button'][value='Copy'],INPUT[type='button'][value='Move'],INPUT[type='button'][value='Delete'],INPUT[type='button'][value='Compare'],INPUT[type='button'][value='Check for Updates'],DIV.gac_bt > INPUT,INPUT#q-sub,INPUT.goog-button,INPUT.lsb {background-color:#333 !important; background:" +
		bS('gradLinear') +
		"0% 0%,0% 100%,from(#555),to(#000)) !important; background-image:none !important; border:solid 1px #ccc !important; " +
		bS('radiusAll') +
		":14px; color:#fff !important; cursor:pointer; opacity:0.8;}" +
		/* submit btn hover */
		"INPUT[type='submit']:hover,BUTTON[type='submit']:hover,INPUT[type='reset'][value='Clear All']:hover,INPUT[type='button'][value='Done']:hover,INPUT[type='button'][value='Copy']:hover,INPUT[type='button'][value='Move']:hover,INPUT[type='button'][value='Delete']:hover,INPUT[type='button'][value='Compare']:hover,INPUT[type='reset'][value='Reset']:hover,INPUT[type='button'][value='Check for Updates']:hover,DIV.gac_bt > INPUT:first-child:hover,INPUT#q-sub:hover,INPUT.goog-button:hover {background-color:#36f !important; background:" +
		bS('gradLinear') +
		"0% 0%,0% 100%,from(#000),to(#36f)) !important; color:#fff;}" +
		/* go btns hover */
		"INPUT#btnI:hover,INPUT[name='btnI']:hover,INPUT[value='Save']:hover,SPAN#button_0 BUTTON:hover,INPUT#stxemailsend:hover,INPUT[value='Submit Issue']:hover,INPUT[value='Download']:hover,INPUT[value='Add it now']:hover,INPUT[value='Add it now'],INPUT[value='Save Preferences']:hover,INPUT[value='Save Preferences ']:hover,INPUT#save:hover,BUTTON[name='ok']:hover,BUTTON[name='yes']:hover,BUTTON[accesskey='s']:hover,INPUT[value='Send Email']:hover,INPUT[type='button'][value='Save changes']:hover,DIV.gac_bt > INPUT:last-child:hover,INPUT[type='submit'].goog-button:hover {background-color:#090 !important; background:" +
		bS('gradLinear') +
		"0% 0%,0% 100%,from(#000),to(#090)) !important; color:#fff;}" +
		/* cancel btn hover */
		"INPUT[value='Cancel']:hover,SPAN#button_1 BUTTON:hover,INPUT[value='Discard']:hover,INPUT[value='Delete Group']:hover,INPUT#cancel:hover,INPUT[value='Cancel']:hover,INPUT#cancel:hover,INPUT[value='Cancel']:hover,BUTTON[name='cancel']:hover,BUTTON[onclick='_EV_Blur(this);_EF_Dismiss(true)']:hover,BUTTON[name='no']:hover {background-color:#900 !important; background:" +
		bS('gradLinear') +
		"0% 0%,0% 100%,from(#000),to(#900)) !important; color:#fff !important;}" +
		/* srch tool bx */
		".lst-td {background-color:transparent;}" +
		/* srch tool bx brdr */
		".lst-td DIV.lst-b {border:0 none;}" +
		/* searchHelp btns override */
		"BUTTON.wci,BUTTON.w4,BUTTON.w40,BUTTON.w5,BUTTON.w50 {display:inline !important; background:" +
		bS('gradLinear') +
		"0% 0%,0% 0%,from(transparent),to(transparent)) !important;}" +
		/* btn height */
		"INPUT.lsb {height:1.7em !important; padding-bottom:0.2em;}" +
		/* btn txt V-position */
		"INPUT.lsb {margin-top:0.2em; padding-bottom:0.1em;}" +
		/* btn bgs */
		".lsbb,DIV.q-outer,DIV.q-inner,.srchButtonRightShadow,.srchButtonBorder {background-color:transparent !important; border:0 none !important;}" +
		/* srch btn spacing */
		"DIV.skunk-head > DIV.cntrl > TABLE.cntrltable > TBODY > TR > TD > DIV.q-outer > DIV.q-inner > INPUT#q-sub,INPUT#srchButton {margin-left:0.5em !important;}" +
		/* srch box brdrs */
		".tsf-p TABLE,.tsf-p TD,.ds {border:0 none !important;}" +
		/* div btn outer */
		".goog-button-base-outer-box {border-top-color:#555; border-bottom-color:#333;}" +
		/* div btn inner */
		".goog-button-base-inner-box {border-left-color:#555; border-right-color:#333; background-color:#555;}" +
		/* div btn inner txt */
		".goog-button-base-content,.goog-button-base-content SPAN {color:#fff !important;}" +
		/* div btn inner txtH */
		".goog-button-base-content:hover {color:#fff !important;}" +
		/* div btn T-shadow */
		".goog-button-base-top-shadow {background-color:#777; border-bottom-color:#555;}" +
		/* div btn restrict */
		"#search-restrict {border-bottom-color:#000;}" +
		/* menu dropd folder */
		"DIV.goog-menu > DIV.goog-menuitem > DIV.goog-menuitem-content {color:#ccc !important;}" +
		/* menu dropd item */
		"DIV.goog-menu > DIV.goog-menuitem {background-color:#222; color:#999 !important;}" +
		/* menu dropd itemHov*/
		"DIV.goog-menu > DIV.goog-menuitem:hover {background-color:#333; color:#ccc !important;}" +
		/* home international txt */
		"DIV[style='background: transparent url(/intl/en_com/images/logo_plain.png) no-repeat scroll 0 0%; " +
		bS('background-clip') +
		": " +
		bS('initial') +
		"; " +
		bS('background-inline-policy') +
		": " +
		bS('initial') +
		"; height: 110px; width: 276px;'] > DIV[style='color: rgb(102, 102, 102); font-size: 16px; font-weight: bold; left: 208px; position: relative; top: 78px;'] {top:-18px !important; left:180px !important; color:#fff !important;}" +
		/* home change bg link */
		"DIV#cpf,#cpFooter {position:absolute !important; bottom:5px; left:-3px; white-space:nowrap;}" +
		/* more pop layer */
		"SPAN#more,#gbar .gb2 {background-color:#333 !important; border-right:solid 1px #a2bae7; border-bottom:solid 1px #a2bae7; color:#333 !important;}" +
		/* more l-side iF */
		"IFRAME#gbs {background-color:transparent;}" +
		/* google alerts txt */
		"P[style='margin-left: 9px;'],SPAN[style='font-size: medium;'] {color:#999;}" +
		//	/* EvrythngPnl top pos */	"#leftnav {top:101px !important;}"+
		/* EvrythngPnl bg */
		"#leftnav, #tbd,#atd,#tsf,#hidden_modes,#hmp {background-color:transparent !important;}" +
		/* mainbody txt */
		"DIV.mainbody,TD.j,DIV.empty,DIV.empty DIV,BODY#gsr DIV,BODY#gsr TD {color:#999 !important;}" +
		/* bgPicker bg */
		"BODY > DIV#pickerContainer,BODY > DIV#pickerContainer > DIV#pickerTitle,DIV#pickerContainer > DIV#onePickMsg {background-color:#000; border:0 none;}" +
		/* footer bg */
		"CENTER#fctr {background-color:transparent !important;}" +
		/* footers */
		(uHideFooters ? "#footer,#footer_promos,#footerwrap,P FONT[size='-2'],TABLE[class='t n bt'][width='100%'][cellpadding='2'],DIV[align='center'][style='white-space: nowrap;'],FONT[class='p'][size='-1'],FONT[size='-1'][color='#6f6f6f'],DIV.div-copyright,SPAN.copyr,DIV.content DIV.footer,DIV#footarea,TABLE[width='99%'][cellpadding='3'][bgcolor='#c3d9ff'][align='center'][style='margin-bottom: 5px;'],CENTER > DIV[style='padding: 2px;'] > FONT[size='-1'],CENTER > CENTER > P > FONT[size='-1'],BODY.search > DIV[align='center'] > SMALL > FONT[size='-1'][face='Arial,sans-serif'],BODY > TABLE[width='100%'][height='100%'][style='margin-bottom: 1px;'] > TBODY > TR > TD[valign='top'] > CENTER > FONT[size='-1'],BODY > CENTER > TABLE[width='100%'][cellspacing='0'][cellpadding='2'][border='0'] *,DIV[class='padt10 padb10'] > TABLE[width='100%'] > TBODY > TR > TD[class='fontsize1 padt5'][align='center'],BODY[marginheight='3'][bgcolor='#ffffff'][dir='ltr'][topmargin='3'] > CENTER > FONT[size='-1'],BODY > DIV[style='width: 100%; clear: both;'] > FORM[name='langform'] > DIV[align='center'] > FONT[size='-1'] {display:none;}" : "") +
		
		// Preferences
		/* pre title line */
		"BODY[vlink='#551a8b'][text='#000000'][link='#0000cc'][bgcolor='#ffffff'][alink='#ff0000'] > DIV[style='width: 100%; clear: both;'] > FORM > TABLE TBODY TR TD[bgcolor='#3366cc'],BODY> DIV[style='width: 100%; clear: both;'] > FORM > TABLE TBODY TR TD[bgcolor='#3366cc'] {display:none;}" +
		/* title header txt */
		"BODY[vlink='#551a8b'][text='#000000'][link='#0000cc'][bgcolor='#ffffff'][alink='#ff0000'] > DIV[style='width: 100%; clear: both;'] > FORM > TABLE TBODY TR TD[bgcolor='#e5ecf9'] FONT B {color:#999 !important;}" +
		/* headers */
		"BODY[vlink='#551a8b'][text='#000000'][link='#0000cc'][bgcolor='#ffffff'][alink='#ff0000'] > DIV[style='width: 100%; clear: both;'] > FORM > TABLE TBODY TR TD[bgcolor='#e5ecf9'],TABLE TBODY TR[bgcolor='#e5ecf9'],TABLE > TBODY > TR > TD[bgcolor='#e5ecf9'] {background-color:#000;}" +
		/* global borders */
		"BODY[vlink='#551a8b'][text='#000000'][link='#0000cc'][bgcolor='#ffffff'][alink='#ff0000'] > DIV[style='width: 100%; clear: both;'] > FORM > TABLE > TBODY > TR > TD[bgcolor='#cbdced'] {display:none;}" +
		/* page txt */
		"BODY[vlink='#551a8b'][text='#000000'][link='#0000cc'][bgcolor='#ffffff'][alink='#ff0000'] > DIV[style='width: 100%; clear: both;'] > FORM H1,BODY[vlink='#551a8b'][text='#000000'][link='#0000cc'][bgcolor='#ffffff'][alink='#ff0000'] > DIV[style='width: 100%; clear: both;'] > FORM H2,BODY[vlink='#551a8b'][text='#000000'][link='#0000cc'][bgcolor='#ffffff'][alink='#ff0000'] > DIV[style='width: 100%; clear: both;'] > FORM LABEL,TABLE#gsea_table > TBODY > TR > TD DIV {color:#ccc !important;}" +
		/* subscribed links */
		"BODY[vlink='#551a8b'][text='#000000'][link='#0000cc'][bgcolor='#ffffff'][alink='#ff0000'] > DIV[style='width: 100%; clear: both;'] > FORM > TABLE > TBODY > TR > TD[valign='top'] > IFRAME[src='http://www.google.com/coop/sl/pref'] {padding-left:9px; background-color:#fff; " +
		bS('radiusAll') +
		":14px;}" +
		
		// Toolbar
		/* logo imgs */
		"BODY[bgcolor='#ffffff'][topmargin='3'] CENTER TABLE[width='725'] TBODY TR TD IMG[width='143'][height='59'][src='../../../../common/toolbar_sm.gif'],TABLE[width='100%'][style='direction: ltr;'] TBODY TR TD A[href='http://toolbar.google.com'] IMG,BODY > TABLE[width='100%'] > TBODY > TR > TD > A[href='../../T4/'] IMG[width='143'][height='59'],BODY.siteowners > TABLE[width='96%'] > TBODY > TR > TD[width='1%'] > A > IMG,BODY.siteowners IMG[src='http://www.google.com/images/art.gif'] {display:none;}" +
		/* page title */
		"BODY > TABLE[width='100%'][style='direction: ltr;'] > TBODY > TR > TD[width='100%'],BODY > TABLE[width='100%'][style='direction: ltr;'] > TBODY > TR > TD[width='100%'] TABLE TBODY TR TD {background-image:none !important; color:#fff !important;}" +
		/* download box */
		"BODY[bgcolor='#ffffff'][topmargin='3'] CENTER TABLE TBODY TR TD TABLE#download TBODY TR TD {background-color:#000; border:0 !important;}" +
		/* bottom logo(s) */
		"TABLE TBODY TR TD[nowrap='nowrap'] IMG[src='http://www.google.com/nav_first.gif'],TABLE TBODY TR TD[nowrap='nowrap'] IMG[src='http://www.google.com/nav_current.gif'],TABLE TBODY TR TD[nowrap='nowrap'] IMG[src='http://www.google.com/nav_page.gif'],TABLE TBODY TR TD[nowrap='nowrap'] IMG[src='http://www.google.com/nav_next.gif'] {display:none;}" +
		
		// API
		/* page title */
		"BODY > TABLE[width='100%'] > TBODY > TR > TD[width='100%'][style='padding-left: 15px;'] TABLE TBODY TR TD FONT STRONG {padding-left:131px; color:#fff !important;}" +
		/* start making btn */
		"TABLE TBODY TR TD#content DIV#start_box {border:1px solid #fff; background-color:#333; " +
		bS('radiusAll') +
		":14px;}" +
		/* header bars */
		"TABLE TBODY TR TD#content H2.header {border:0; background:#333; " +
		bS('radiusAll') +
		":14px;}" +
		/* page-code */
		"TABLE TBODY TR TD#content PRE {color:#000;}" +
		/* page block bgs */
		"TABLE TBODY TR TD#content DIV,BODY.siteowners TABLE TBODY TR TD {background-color:#000 !important;}";
		/* Toolbar expanded below in BF-func */
		
		if (BRUTEFORCE) {
			// BRUTE-FORCE for "less cooperative" sites (each URI validated)
			var style = document.createElement('style');
			style.setAttribute('id', 'bruteForce');
			document.getElementsByTagName('head')[0].appendChild(style);
		}
		//stylesheet Insert Rule
		function sIR(style){
			if (BRUTEFORCE) {
				$('bruteForce').sheet.insertRule(style, 0);
			}else{
				cssBf+=style;
			}
		}
		
		// Global Styles
		function Ge(){
			/* Global font */
			sIR("* {font-family:" + uFontFamily + ";}");
			/* page bg */
			sIR("HTML,BODY {background:#000 none !important; color:#fff;}");
			/* link color */
			sIR("A,#gbar A.gb1,#gbar A.gb2,#gbar A.gb3,#gbar A.gb3 U,A.gb4,SPAN.i,.linkon,#codesiteContent A,TABLE.mmhdr TBODY TR TD.mmttlinactive SPAN,TABLE TBODY TR TD TABLE TBODY TR TD A,SPAN#show-new,SPAN#show-all,SPAN.link,SPAN[dir='ltr'] > FONT[color='blue'],FONT[color='blue'][dir='ltr'],.gc-control,.goog-flat-menu-button,.gsc-tabHeader.gsc-tabhInactive,.goog-tab-bar-top .goog-tab,DIV.search-options-header-link,.gtc-doclist-item-select > SPAN,.goog-tab-bar .goog-tab > DIV,UL.goog-tabpane-tabs > LI.goog-tabpane-tab,DIV.gwt-Label,#guser .gb2,DIV.n SPAN.b,SPAN.ae-action,.linkbtn,.CSS_PROFILES_UPDATE_BUTTONS SPAN,.CSS_UPDATES_UCW_SHOW_PEOPLE_LIST_LINK,.CSS_UPDATES_UCW_SHOW_COMMENTS_LINK,.CSS_PROFILES_FOLLOWING_COUNT,SPAN.gl > A.l > SPAN {color:" + lc + " !important;}");
			/* visitedLinx color */
			sIR("A:visited {color:" + vl + " !important;}");
			/* resultsvisitedlnx */
			sIR("DIV#res A:visited {font-size:0.8em !important;}");
			/* google bar bg */
			sIR("#guser,#guser *,#gbar,#gbar *,#ghead,#gog,.lhcl_onebar,.lhshdr,.rshdr,.tpblk,.tphdr,#tbbcc,#rgsh_s,#gc-header {background-color:transparent !important; font-family:" + uFontFamily + " !important; color:#ccc;}");
			/* google bar txt */
			sIR("#gbar SPAN {color:#999;}");
			/* google bar txt */
			sIR("#gbar DIV.gb1 {background-color:#c9d7f1 !important;}");
			/* google bar txt */
			sIR("#gbar DIV.gb2 {padding-top:0; padding-bottom:0; background-color:#c9d7f1 !important;}");
			/* google bar linx */
			sIR("#gbar A.gb1,#gbar B.gb1,#gbar A.gb3 {font-weight:bold !important; font-size:1.15em !important;}");
			/* google bar b-line */
			sIR("#gbh,.gbh {border-color:#555;}");
			/* search input */
			sIR("INPUT[type='text'],INPUT[type='password'],INPUT[name='q'] {background:#333 none !important; background-color:rgba(0,0,0,0.6) !important; color:#ff0; padding:2px; border:solid 1px #ccc; font-weight:bold; color:" + uColorInputTxt + " !important;}");
			/* srch input b-brdr */
			sIR("FORM[name='f'] TABLE#search-input > TBODY > TR > TD.srchBoxCont {border-bottom:0 none transparent;}");
			/* submit btns */
			sIR("INPUT[type='submit'],INPUT[type='button'],.yt-button-primary,.manager-page .goog-flat-button, .manager-page .goog-menu-button,BUTTON.search-button,BUTTON#createBtn,BUTTON#cancelBtn,INPUT[type='button'][value='Save changes'],INPUT[type='reset'][value='Clear All'],INPUT[type='reset'][value='Reset'],INPUT[type='button'][value='Done'],INPUT[type='button'][value='Copy'],INPUT[type='button'][value='Move'],INPUT[type='button'][value='Delete'],INPUT[type='button'][value='Compare'],.modal-dialog-buttons BUTTON,.goog-custom-button,BUTTON.gwt-Button,INPUT[type='reset'][value='Cancel'],INPUT[type='button'][value='Check for Updates'] {background:#333 none !important; background:" + bS('gradLinear') + "0% 0%,0% 100%,from(#555),to(#000)) !important; border:solid 1px #ccc !important; color:#fff !important; cursor:pointer; " + bS('radiusAll') + ":14px !important; opacity:0.8;}");
			/* submit btn hover */
			sIR("INPUT[type='submit']:hover,BUTTON[type='submit']:hover,INPUT[type='button']:hover,.manager-page .goog-flat-button-hover, .manager-page .goog-menu-button-hover,BUTTON.search-button:hover,INPUT[type='reset'][value='Clear All']:hover,INPUT[type='button'][value='Done']:hover,INPUT[type='button'][value='Copy']:hover,INPUT[type='button'][value='Move']:hover,INPUT[type='button'][value='Delete']:hover,INPUT[type='button'][value='Compare']:hover,.goog-custom-button:hover,BUTTON#send-button:hover,INPUT[type='button'][value='Check for Updates']:hover {background-color:#36f !important; background:" + bS('gradLinear') + "0% 0%,0% 100%,from(#000),to(#36f)) !important; color:#fff;}");
			/* go btns hover */
			sIR("INPUT#btnI:hover,INPUT[name='btnI']:hover,INPUT[value='Save']:hover,SPAN#button_0 BUTTON:hover,INPUT#stxemailsend:hover,INPUT[value='Submit Issue']:hover,INPUT[value='Download']:hover,INPUT[value='Add it now']:hover,INPUT[value='Add it now'],INPUT[value='Save Preferences']:hover,INPUT[value='Save Preferences ']:hover,INPUT#save:hover,BUTTON[name='ok']:hover,BUTTON[name='yes']:hover,BUTTON[accesskey='s']:hover,BUTTON#createBtn:hover,INPUT[type='submit'][value='Create an Application']:hover,INPUT[value='Send Email']:hover,INPUT[type='button'][value='Save changes']:hover,INPUT[type='reset'][value='Reset']:hover {background-color:#090 !important; background:" + bS('gradLinear') + "0% 0%,0% 100%,from(#000),to(#090)) !important; color:#fff;}");
			/* cancel btn hover */
			sIR("INPUT[value='Cancel']:hover,SPAN#button_1 BUTTON:hover,INPUT[value='Discard']:hover,INPUT[value='Delete Group']:hover,INPUT#cancel:hover,INPUT[value='Cancel']:hover,INPUT#cancel:hover,INPUT[value='Cancel']:hover,BUTTON[name='cancel']:hover,BUTTON[onclick='_EV_Blur(this);_EF_Dismiss(true)']:hover,BUTTON#cancelBtn:hover,BUTTON[name='no']:hover,BUTTON#cancel-button:hover,INPUT[type='reset'][value='Cancel']:hover {background-color:#900 !important; background:" + bS('gradLinear') + "0% 0%,0% 100%,from(#000),to(#900)) !important; color:#fff !important;}");
			/* srch tool bx */
			sIR("TD[class='lst-td lst-td-xbtn'] {width:100%; background-color:transparent;}");
			/* srch tool bx brdr */
			sIR(".lst-td DIV.lst-b {border:0 none;}");
			/* srch clear X */
			sIR("#xbtn {margin:0 7px 0 7px;}");
			/* srch hint bx */
			sIR("#pocs {background:transparent !important;}");
			/* searchHelp btnsOR */
			sIR("BUTTON.wci,BUTTON.w4,BUTTON.w40,BUTTON.w5,BUTTON.w50 {display:inline !important; background:" + bS('gradLinear') + "0% 0%,0% 0%,from(transparent),to(transparent)) !important;}");
			/* btn height */
			sIR("INPUT.lsb {height:1.7em !important; padding-bottom:0.2em;}");
			/* btn txt-Vposition */
			sIR("INPUT.lsb {margin-top:0.2em; padding-bottom:0.1em;}");
			/* btn bgs */
			sIR(".lsbb,DIV.q-outer,DIV.q-inner,.srchButtonRightShadow,.srchButtonBorder {background-color:transparent !important; border:0 none !important;}");
			/* srch btn spacing */
			sIR("DIV.skunk-head > DIV.cntrl > TABLE.cntrltable > TBODY > TR > TD > DIV.q-outer > DIV.q-inner > INPUT#q-sub,INPUT#srchButton {margin-left:0.5em !important;}");
			/* srch box brdrs */
			sIR(".tsf-p TABLE,.tsf-p TD,.ds {border:0 none !important;}");
			/* gCstmBtn children */
			sIR(".goog-custom-button-inner-box,.goog-custom-button-outer-box {border:0 none;}");
			/* div btn outer */
			sIR(".goog-button-base-outer-box {border-top-color:#555 !important; border-bottom-color:#333 !important; cursor:pointer;}");
			/* div btn inner */
			sIR(".goog-button-base-inner-box {border-left-color:#555 !important; border-right-color:#333 !important; background-color:#555 !important;}");
			/* div btn disabled */
			sIR(".goog-button-base-disabled .goog-button-base-inner-box, .goog-button-base-disabled .goog-button-base-top-shadow,.goog-button-base-disabled SPAN {background-color:#151515 !important; border-bottom-color:#222 !important; color:#333 !important;}");
			/* div btn inner txt */
			sIR(".goog-button-base-content,.goog-button-base-content SPAN {color:#fff !important;}");
			/* div btn inner txtH*/
			sIR(".goog-button-base-content:hover {color:#fff !importan;}");
			/* div btn T-shadow */
			sIR(".goog-button-base-top-shadow {background-color:#777 !important; border-bottom-color:#555 !important;}");
			/* div btn restrict */
			sIR("#search-restrict {border-bottom-color:#000 !important;}");
			/* menu dropd folder */
			sIR("DIV.goog-menu > DIV.goog-menuitem > DIV.goog-menuitem-content {color:#ccc !important;}");
			/* menu dropd item */
			sIR("DIV.goog-menu > DIV.goog-menuitem {background-color:#222 !important; color:#999 !important;}");
			/* menu dropd itemHov*/
			sIR("DIV.goog-menu > DIV.goog-menuitem:hover {background-color:#333 !important; color:#ccc !important;}");
			/* more pop layer */
			sIR("SPAN#more,#gbar .gb2 {background-color:#333 !important; border-right:solid 1px #a2bae7; border-bottom:solid 1px #a2bae7; color:#333 !important;}");
			/* dd box */
			sIR("#po-box,#ss-box {padding:0.1em; background-color:#333; border:0; " + bS('radiusAll') + ":14px;}");
			/* dd box bg */
			sIR("#po-barframe,#ss-barframe {visibility:hidden !important;}");
			/* dd selected */
			sIR("#po-box A.po-selected,#ss-box A.ss-selected {color:#fff !important;}");
			/* modal box */
			sIR(".modal-dialog,.gwt-DialogBox {background-color:#222; border:0 none; color:#999; " + bS('radiusAll') + ":14px;}");
			/* modal title */
			sIR(".modal-dialog-title,.dialogTopCenterInner > .Caption {background-color:#333; color:#fff; " + bS('border-radius-topright') + ":14px; " + bS('border-radius-topleft') + ":14px;}");
			/* modal content */
			sIR("BODY > .modal-dialog .modal-dialog-content,BODY > .modal-dialog .modal-dialog-buttons,.profile-preview-inner .preview-header-line,.dialogMiddleCenter .content-panel-container {background-color:#222; border:0 none; color:#fff;}");
			/* modal content txt */
			sIR("BODY#body > DIV.modal-dialog > DIV.modal-dialog-content SPAN,BODY#body > DIV.modal-dialog > DIV.modal-dialog-content P {color:#999;}");
			/* modal content s-S */
			sIR("BODY#body > DIV.modal-dialog > DIV.modal-dialog-content .selected,BODY#body > DIV.modal-dialog > DIV.modal-dialog-content .selected SPAN,.profile-preview-inner {background:none #555; border:0 none; color:#000;}");
			/* modal bottom */
			sIR("BODY > .modal-dialog .modal-dialog-buttons,.dialogMiddleCenter .content-panel-container {" + bS('border-radius-bottomright') + ":14px; " + bS('border-radius-bottomleft') + ":14px;}");
			/* 404 error header */
			sIR("BODY[text='#000000'][bgcolor='#ffffff'] TABLE[width='100%'] > TBODY > TR > TD[bgcolor='#3366cc']:first-child {background-color:#000;}");
			/* EvrythngPnl bg */
			sIR("#leftnav, #tbd,#atd,#tsf,#hidden_modes,#hmp {background-color:transparent !important;}");
			/* EvrythngCenterCol */
			sIR("#center_col {margin-right:0; border-left:1px solid #111 !important;}");
			/* EvrythngMenuH-div */
			sIR("DIV#ms > A#showmodes,DIV#leftnav > H2 {border-color:#111 !important;}");
			/* EvrythngMenuSeltd */
			sIR("DIV#ms > UL > LI.msel,#ms .current_mode,#ms > UL > LI.current-mode {background-color:transparent !important; border:0 none transparent !important; color:#fff;}");
			/* search suggest bx */
			sIR(".ac-renderer,.ac-renderer DIV,.gac_id,.gac_m {background-color:#333 !important; color:#999 !important;}");
			/* search suggest hv */
			sIR(".gac_b TD {background-color:#555 !important; color:#fff !important;}");
			/* search suggest Bt */
			sIR(".ac-renderer,.ac-renderer B {color:#fff !important;}");
			/* sr hdr box */
			sIR("#tbbc {margin-bottom:1em !important; background:#333 !important; " + bS('radiusAll') + ":14px;}");
			/* sr hdr box txt */
			sIR("#tbbc SPAN {color:#000 !important;}");
		}
		
		/* applyGlobals */
		Ge();
		
		/* top linx */
		sIR("DIV#gbar > NOBR {top:-2px;}");
		/* logo img [replce] */
		sIR("A#logo-container > H1#logo {z-index:1000; width:145px !important; height:50px !important; background:transparent url('" + gL + "') no-repeat scroll 0 -10px !important; font-size:0;}");
		/* addSub btn */
		sIR("DIV#lhn-add-subscription {position:relative; top:15px; left:0;}");
		/* addSub box */
		sIR("DIV#quick-add-bubble-holder {background-color:#000; border:1px solid #777; color:#ccc !important; " + bS('border-radius-topright') + ":8px; " + bS('border-radius-bottomright') + ":8px; " + bS('border-radius-bottomleft') + ":8px;}");
		/* border */
		sIR("DIV#chrome {border:0 none;}");
		/* hdr */
		sIR("DIV#chrome-header {background-color:#555; border:0; color:#fff !important; " + bS('border-radius-topleft') + ":14px;}");
		/* hdr v-Linx */
		sIR("DIV#chrome-header > SPAN#chrome-view-links {background-color:#555;}");
		/* menu txt */
		sIR(".lhn-section a,.lhn-section a .text,.lhn-section .link,UL#your-items-tree LI,SPAN.name > SPAN,UL#friends-tree *,UL#sub-tree LI {color:#888 !important;}");
		/* menu sel/h */
		sIR(".scroll-tree LI A:hover,.scroll-tree LI .tree-link-selected,.scroll-tree LI .tree-link-selected SPAN,.scroll-tree LI .tree-link-selected:hover,#lhn-selectors .selector:hover,#lhn-selectors .selected,#lhn-selectors .selected SPAN,#lhn-selectors .selected:hover {background-color:#555; color:#fff !important;}");
		/* menu spcng */
		sIR("DIV#lhn-selectors,DIV#your-items-tree-container,DIV.lhn-section,DIV.friends-tree-notification-info {margin-top:1.5em;}");
		/* light grey */
		sIR("TABLE#chrome-viewer-container > TBODY > TR > TD#chrome-lhn-toggle,TABLE#chrome-viewer-container > TBODY > TR > TD#chrome-viewer,DIV.setting-body,#settings #settings-navigation .selected{background-color:#555 !important;}");
/* current selection*/
sIR("#current-entry div.entry-container{background-color:#444 !important;}");
		/* dark grey */
		sIR("TABLE#chrome-viewer-container > TBODY > TR > TD#chrome-viewer > DIV#viewer-header,TABLE#chrome-viewer-container > TBODY > TR > TD#chrome-viewer > DIV#viewer-footer,DIV.tab-group > DIV.tab-header-selected,DIV.card-actions, DIV.entry-actions {background-color:#333 !important;}");
		/* black bg */
		sIR("DIV#lhn-selectors,DIV#lhn-friends,DIV#lhn-subscriptions,DIV#lhn-recommendations,TABLE#chrome-viewer-container > TBODY > TR > TD#chrome-viewer > DIV#viewer-container,DIV#entries > DIV.entry,div#entries.list .entry .collapsed,UL#your-items-tree LI,UL#friends-tree *,DIV#viewer-page-container,DIV#friends-manager,UL#sub-tree LI,DIV.preview-interruption,DIV.friend-interruption,DIV.interruption,DIV#settings > TABLE TD,DIV.tab-group,DIV.tab-group-contents,DIV#discover-container,DIV.tab-group > DIV.tab-header,DIV#directory-search-container,DIV#recommendations-tab-contents,DIV.card-common,DIV.entry-likers,DIV.fr-modal-dialog DIV,DIV.entry-comments,DIV.entry > DIV.comment-entry,.scroll-tree LI, DIV.entry-container {background:#000 none !important;}");
		/* no borders */
		sIR("DIV#lhn-selectors,DIV#viewer-top-controls,DIV.friends-tree-following-info,DIV.friends-tree-notification-info,DIV.entry > DIV.comment-entry {border:0 none !important;}");
		/* Vwr header */
		sIR("TABLE#chrome-viewer-container > TBODY > TR > TD#chrome-viewer > DIV#viewer-header   {" + bS('border-radius-topleft') + ":14px;}");
		/* Vwr cntrls */
		sIR("DIV#viewer-all-new-links,DIV#entries-status {padding-left:0.5em !important; color:#ccc !important;}");
		/* note box */
		sIR("DIV#overview > DIV#featured-bundles-promo,DIV#explore-promo {background-color:#333; color:#fff !important; " + bS('radiusAll') + ":14px;}");
		/* page txt */
		sIR("DIV#friends-manager DIV,DIV.results DIV,DIV#quick-add-helptext,.unselectable,DIV#viewer-container DIV,DIV#viewer-container LI,DIV#viewer-container SPAN,DIV.subscription-title,TR.data-row TD,TABLE#homepage-table TD,DIV#viewer-comments-all-links,DIV.fr-modal-dialog DIV, H2.entry-title {color:#999 !important;}");
		/* card box */
		sIR("DIV.card, DIV.entry, DIV.entry-actions, .entry .collapsed {border-color:#333 !important; " + bS('box-shadow') + ":none !important;}");
		/* R boxes */
		sIR("DIV#rec-preview,DIV#tips {background-color:#222; border:0 none; color:#ccc !important; " + bS('radiusAll') + ":14px;}");
		/* R bx title */
		sIR("TD#right-section DIV.section-header {color:#fff !important;}");
		/* subMenu */
		sIR("DIV#settings-navigation H3.selected,DIV.tab-group > DIV.tab-header {margin:0.2em; " + bS('border-radius-topright') + ":8px; " + bS('border-radius-topleft') + ":8px;}");
		/* rndBoxes */
		sIR("DIV.setting-body,DIV.fr-modal-dialog {color:#000; " + bS('border-radius-topright') + ":14px; " + bS('border-radius-bottomright') + ":14px; " + bS('border-radius-bottomleft') + ":14px;}");
		/* browse top */
		sIR("DIV.tab-group-contents {padding:0;}");
		/* cmodial dlg */
		sIR("DIV.fr-modal-dialog {" + bS('border-radius-topleft') + ":14px;}");
		/* footer */
		if (uHideFooters) 
			sIR("DIV#footer > DIV.copyright {display:none;}");
		
		
		// Remove Right-side Ads
		if (uHideAds) {
			iFs = document.getElementsByTagName("iframe");
			for (var iB = 0; iB < iFs.length; iB++) {
				if (iO(iFs[iB].src, "pagead2.googlesyndication.com/pagead/ads") != -1) {
					iFs[iB].height = 0;
					iFs[iB].width = 0;
				}
			}
		}
		
		if (!BRUTEFORCE){
			$_$+=cssBf;
		}
		
		
		GM_addStyle($_$, 'rps_black');

	}
	
	//Remove Search Tracking 
	function RST(){
		if (uRemoveST) {
			lAs = document.getElementsByTagName("a");
			for (var iC = 0; iC < lAs.length; iC++) {
				if (lAs[iC].className == "l") 
					lAs[iC].removeAttribute("onmousedown");
			}
		}
	}
	
	// Google Logo
	function _gL(W){
		if (W == "H") {
			if (uLogoLuri == "none") {
				return "";
			} else if (uLogoLuri !== "") {
				return uLogoLuri;
			} else {
				return "data:image/png;base64,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";
			}
		} else {
			if (uLogoSuri == "none") {
				return "";
			} else if (uLogoSuri !== "") {
				return uLogoSuri;
			} else {
				return "data:image/gif;base64,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";
			}
		}
	}
	
	// Browser Style [injector]
	function bS(typ){
		var newStyl, uA = navigator.userAgent.toLowerCase(), bP = (iO(uA, "chrome") > -1) ? "-webkit-" : (iO(uA, "konqueror") > -1) ? "-khtml" : (iO(uA, "opera") > -1) ? "" : "-moz-";
		if (iO(typ, "radiusAll") > -1) {
			newStyl = "border-radius";
			if (bP != "-webkit-") 
				newStyl = bP + newStyl;
		} else if (iO(typ, "radius") > -1) {
			if (bP == "-webkit-") { //Chrome CSS3 Rounded Corners
				if (iO(typ, "topright") > -1) 
					newStyl = "border-top-right-radius";
				else if (iO(typ, "topleft") > -1) 
					newStyl = "border-top-left-radius";
				else if (iO(typ, "bottomright") > -1) 
					newStyl = "border-bottom-right-radius";
				else if (iO(typ, "bottomleft") > -1) 
					newStyl = "border-bottom-left-radius";
			} else 
				newStyl = bP + typ;
		} else if (iO(typ, "gradLinear") > -1) {
			if (bP == "-moz-") 
				newStyl = "-moz-linear-gradient(";
			else 
				newStyl = bP + "gradient(linear,";
		} else {
			newStyl = typ;
			if (bP != "-webkit-") 
				newStyl = bP + newStyl;
		}
		return newStyl;
	}
	
	// Shortcut!
	function $(id){
		return document.getElementById(id);
	}
	
	// Shorthand indexOf
	function iO(elm, str){
		return elm.indexOf(str);
	}
	
	// Adaptive Resolution Support from 800x600 to 2560x1600 for Search Results
	function _rW(){
		var rV, dW = document.all ? document.body.clientWidth : window.innerWidth;
		if ($('gSearchSidebar') === null) 
			rV = 96;
		else if (dW >= 2532) 
			rV = 73;
		else if (dW >= 1699) 
			rV = 72;
		else if (dW >= 1308) 
			rV = 71;
		else if (dW >= 1266) 
			rV = 70;
		else if (dW >= 1226) 
			rV = 69;
		else if (dW >= 1189) 
			rV = 68;
		else if (dW >= 1154) 
			rV = 67;
		else if (dW >= 1121) 
			rV = 66;
		else if (dW >= 1090) 
			rV = 65;
		else if (dW >= 1060) 
			rV = 64;
		else if (dW >= 1032) 
			rV = 63;
		else if (dW >= 1006) 
			rV = 62;
		else if (dW >= 981) 
			rV = 61;
		else if (dW < 981) 
			rV = 60;
		return rV;
	}
	
	// Creates a new node with the given attributes and properties
	function createNode(type, attributes, props){
		node = document.createElement(type);
		if (attributes) 
			for (var attr in attributes) 
				node.setAttribute(attr, attributes[attr]);
		if (props) 
			for (var prop in props) 
				if (prop in node) 
					node[prop] = props[prop];
		return node;
	}
	
	// Runs a particular XPath expression p against the context node context (or the document, if not provided)
	// If a document (docObj) is provided, its evaluate method is used instead of document.evaluate (and it's also the default context)
	// Returns the results as an array
	function $x(p, context, docObj){
		if (!docObj) 
			docObj = document;
		if (!context) 
			context = docObj;
		var arr = [], xpr = docObj.evaluate(p, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0, l = xpr.snapshotLength; i < l; i++) 
			arr.push(xpr.snapshotItem(i));
		return arr;
	}
	
	// Returns only the first element of the array returned by $x (or null if the array was empty)
	function $x1(p, context, docObj){
		var nodeArray = $x(p, context, docObj);
		return (nodeArray.length > 0) ? nodeArray[0] : null;
	}
	function _GM_getValue(id, value){
		return value;
	}
	
 var currentMk=2,
 uConfigMk=_GM_getValue("uConfigMk",0),
 uFontFamily=_GM_getValue("uFontFamily","trebuchet ms,sans-serif"),
 uColorLink=_GM_getValue("uColorLink","#999"),
 uColorLinkVisited=_GM_getValue("uColorLinkVisited","#6e37cc"),
 uColorInputTxt=_GM_getValue("uColorInputTxt","#ff0"),
 uColorButtonHover=_GM_getValue("uColorButtonHover","#36f"),
 uLogoLuri=_GM_getValue("uLogoLuri",""),
 uLogoSuri=_GM_getValue("uLogoSuri",""),
 uHideLogos=_GM_getValue("uHideLogos",false),
 uHideAds=_GM_getValue("uHideAds",true),
 uHideFooters=_GM_getValue("uHideFooters",true),
 uRemoveST=_GM_getValue("uRemoveST",true),
 uForceSSL=_GM_getValue("uForceSSL",false),
 uCheckUpdates=_GM_getValue("uCheckUpdates",true);
 
	// Force Secure Connection
	/*function FSC(){
		var Gtld = location.host.substring(iO(location.host, ".google.") + 8, location.host.length), lH = location.href, sL = [".google." + Gtld + "/advanced_search?", "mail.google.", "maps.google.", ".google." + Gtld + "/calendar/", "docs.google.", "spreadsheets.google.", "www.google." + Gtld + "/reader/", "www.google." + Gtld + "/bookmarks/", "www.google." + Gtld + "/history/", "groups.google." + Gtld + "/", "sites.google." + Gtld + "/",  //	"knol.google.",
		".google." + Gtld + "/notebook/", ".google." + Gtld + "/webmasters/tools/", ".google." + Gtld + "/contacts", ".google." + Gtld + "/voice/", ".google." + Gtld + "/finance", ".google." + Gtld + "/dictionary"];
		
		for (iE in sL) 
			if (/^http:/.test(lH) && iO(lH, sL[iE]) > 1) 
				location.replace(location.href.replace("http:", "https:"));
	}
	if (uForceSSL) 
		FSC();
	*/
	// RUN!!!
	enhanceGoogle();
	
};
