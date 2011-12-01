// ==UserScript==
// @name           Google Reader Air Skin
// @namespace      http://userscripts.org
// @description    A skin for Google Reader
// @homepage       http://userscripts.org
// @include        http://www.google.*/reader/view/*
// @include        https://www.google.*/reader/view/*
// ==/UserScript==
//http://userscripts.org/scripts/show/10573

GRP.air = function(prefs, langs, ID, SL, lang) {
	var css = '* { font-family: tahoma, verdana, lucida sans, helvetica, arial !important; }';
	//buttons
	css += 'button { font-size: 13px !important }';
	/* search bar, actions menus */
	css += 'form#s input, div.tbc select, div.tbc button, div.cd button, div.chc button, div.chc select, td#st_compose button { margin-bottom: 0px !important; }';
	/* Refresh link */
	css += 'span#rfr { font-size: 13px !important; }';
	/* selection menus */
	css += 'div.tbc { font-size: 13px !important; }';
	/* contacts sidebar */
	css += 'div#nav div.nl span#comp { font-size: 13px !important; }';
	/* compose message sidebar: list item (current) */
	css += 'div#nav table.cv tr.an td b.lk { font-size: 15px !important; font-weight: normal !important; text-decoration: none !important; display: block !important; padding: 4px 0 4px 0 !important; }';
	/* folders sidebar: list item (current) */
	css += 'div#nds table.cv tr.an td b.lk { font-size: 15px !important; font-weight: normal !important; text-decoration: none !important; display: block !important; padding: 6px 0 6px 0 !important; }';
	/* folders sidebar: list item */
	css += 'div#nds div.nl { font-size: 13px !important; margin-left: 10px !important; padding-left: 6px !important; padding-top: 3px !important; padding-bottom: 3px !important; }';
	/* folders sidebar: list item (hover) */
	css += 'div#nds div.nl:hover { background-color: #e3ebfe !important; }';
	/* invite a friend sidebar */
	css += 'div#nvi { display: none !important; }';
	/* labels appearing in the subject line */
	css += 'table.tlc span.ct {color: red !important; font-size: 8pt !important; font-weight: bold !important}';
	/* messages */
	css += 'table.tlc tr td { font-size: 13px !important; padding-top: 3px !important; padding-bottom: 3px !important; }';
	/* cursor */
	css += '#ar { margin-top: 2px !important; }';
	/* messages (unread) */
	css += 'table.tlc tr.ur td { font-size: 13px !important; }';
	/* messages (unread - snippet) */
	css += 'table.tlc tr.ur td span.p { font-size: 13px !important}';
	/* block (all width active)*/
	css += 'div#nav table.cv tr.an td b[id], div#nds span.lk { display: block !important; }';
	/* remove underline */
	css += 'div#nds span.lk, div#nds b.lk { text-decoration: none !important; }';
	/*round corners*/
	css += 'div#nds div.nl { -webkit-border-radius-topleft: 4px !important; -webkit-border-radius-bottomleft: 4px !important; }';
	/* selected round corners */
	css += 'div#nav table.cv b.rnd { background-color: transparent !important; }';
	css += 'div#nav table.cv { -webkit-border-radius-topleft: 5px !important; -webkit-border-radius-bottomleft: 5px !important; }';
	css += 'div#nav table.cv td:first-child { -webkit-border-radius-topleft: 5px !important; -webkit-border-radius-bottomleft: 5px !important; }';
	/* border lines */
	css += 'div#nds div.nl:first-child { border-top: 1px solid #C3D9FF !important; }';
	css += 'div#nds div.nl { border-bottom: 1px solid #C3D9FF !important; }';
	css += 'div#nds div.nl { border-left: 1px solid #C3D9FF !important; }';
	/*selected border lines*/
	css += 'div#nds table.cv:first-child { border-top: 1px solid #C3D9FF !important; }';
	css += 'div#nds table.cv { border-bottom: 1px solid #C3D9FF !important; }';
	/* bk */
	css += 'div#nds table.cv { border-left: 1px solid #C3D9FF !important; }';
	css += 'div#nds div.nl { background-color: #FFFFFF !important; }';
	/* selected: remove not(tr.an) and resize tr.an to compensate*/
	css += 'div#nds table.cv tr.an { height: 15px !important; }';
	css += 'div#nds table.cv tr:not(.an) td { display: none !important; }';
	/* compose and contacts */
	css += 'div#nav > div.nl { border-top: 1px solid #C3D9FF !important; border-bottom: 1px solid #C3D9FF !important; border-left: 1px solid #C3D9FF !important; -webkit-border-radius-topleft: 5px !important; -webkit-border-radius-bottomleft: 5px !important; background: white !important; padding-top: 3px !important; padding-bottom: 3px !important; }';
	css += 'div#nav > div.nl:hover { background: #e3ebfe !important; }';
	 /* selected border lines */
	css += 'div#nav > table.cv { border-top: 1px solid #C3D9FF !important; border-bottom: 1px solid #C3D9FF !important; border-left: 1px solid #C3D9FF !important; }';
	css += 'div#nav > div.nl span#cont, div#nav > div.nl span#comp { display: block !important; text-decoration: none !important; }';
	css += 'div#nav > table.cv tr.an b.lk { text-decoration: none !important; }';
	/* remove left round so that the tab 'compose mail'will connect to div#co */
	css += 'div#co > div#tct > table > tbody > tr > td > b.rnd > b.rnd1, div#co > div#tct > table > tbody > tr > td > b.rnd > b.rnd2, div#co > table > tbody > tr > td > b.rnd > b.rnd1, div#co > table > tbody > tr > td > b.rnd > b.rnd2 { margin-left: 0px !important; }';
	css += '.lk { font-weight: normal !important; }';
	/* labels box labels sidebar: header */
	css += 'div#nvl td.s { padding: 6px 0px 6px 0px !important; font-size: 15px !important; }';
	css += 'div#nb_0 { margin-top: 10px !important; margin-bottom: 1.5em !important; }';
	/* label box color */
	//css+='div#nb_0 div.nb, div#prf_l, div#nvl b.rnd b.rnd1, div#nvl b.rnd b.rnd2 { background-color: rgb(0, 217, 255) !important; }';
	/* item color */
	css += 'div#nb_0 table.nc div.lk[id^=\"sc\"] { background-color: #FFFFFF !important; border-top:1px solid transparent; border-bottom: thin solid #EFEFEF !important; text-decoration: none !important; padding: 2px 1px 3px 3px !important; }';
	/* item over color */
	css += 'div#nb_0 table.nc div.lk[id^=\"sc\"]:hover { background-color: rgb(226,250,234) !important; }';
	/* remove edit label link */
	css += 'div#prf_l { display: none !important; }';
	/* remove table extra border */
	css += 'div#nb_0 table.nc { border-spacing: 0px !important; padding-right: 4px !important; }';
	css += 'div#nb_0 table.nc tr, div#nb_0 table.nc td { padding: 0 !important; }';
	/* spam not bold */
	css += '#ds_spam b { font-weight: lighter !important; }';
	GM_addStyle(css, 'rps_'+ ID);
	//fireResize();
};
