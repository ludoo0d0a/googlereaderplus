// ==UserScript==
// @name          Another Dark Google Reader Style
// @namespace     http://userstyles.org
// @description	  I took the style created by oltra & Ka Yue, and tweaked it a bit more to my liking.  Specifically
// @author        dvdmon
// @homepage      http://userstyles.org/styles/5133
// @include       http://www.google.com/reader/*
// @include       https://www.google.com/reader/*
// ==/UserScript==
//Another Dark Google Reader Style

GRP.dark = function() {
	/* most of the credit so far goes to 
	 * oltra & Ka Yue (oltra homepage: http://www.myradioheart.com, Ka Yue : http://ka-yue.com) 
	 * Tweaking done my Levi Wallach (http://twelveblackcodemonkeys.com) */
	var css = "page { color:#C1BEBA !important; background-color:#192129 !important; } body { color:#B1AEAA !important; background-color:#0C1319 !important; background-image: none !important; } td { color:#C1BEBA !important; background-color:#192129 !important; } div { color:#999 !important; background-color:#192129 !important; line-height: 20px !important; } a { color: #42749F !important; } a:visited { color: #882C55 !important; } a:active { color: #6799C4 !important; } #guser { color: #D1CECA !important; } .cb, .cbr, .cr, .cl, .cbl, .cc, .ct, .ctl, .ctr { background-image: none !important; } .item-body { font-size: 1.2em !important; } .entry-actions { background-color: #393929 !important; } .broadcast-inactive, .broadcast a { color: #42749F !important; } .round-box { background-color:#192129 !important; background-image: none !important; } .s, .c, .tl, .tr { background-color:#192129 !important; background-image: none !important; } .selected, .cursor { background-color:#cccccc !important; } .name-text, .unread-count, .link, #sub-tree, .name, .name-unread { color:#42749F !important; } .btl, .btr, .bbl, .bbr { background-image: none !important; background-color: #393929 !important; } .button-body-container { background-color: #393929 !important; color:#42749F !important; } #loading-area, #logo { background-image: url('data:image/png;base64,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') !important; } /* Make the star image better for display on a black background */ /* First for the highlighted star */ #recent-activity #recent-activity-star h4 { background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAQCAYAAADJViUEAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjEwcrIlkgAAAY9JREFUOE+VUz1Lw1AUzVilYl0Up8bQjurgIjaN9QOkOJSqBaFfVqpDpaI4OYgg+hucigh26ugkgiA4qIvoICg4dBEFFwcRQXrsuWlqP1LB4fCS9+5559xzE0VRFNhheCQOj+cK/QNR2/MKx57sNx5wmDuC13vzP/LEZAIrmTOUvkaRTu2DLlo4bFZe33gWVXxrKOTXMDP31JpMJd0frcKn36H4mBby7fWgWKe6bpRryhgbr+TAW4nV7EUVezunYpnk0mcvtjZzWEieyDlXXiZu+MBDFtfCIpIsz5Xz9xcXlheXzCBpmSPhBi2y2A4kXZ47pE5TCzACCeagYDaSQih8L5t2F3y8dSB/MATDnwVHGAqnrAB/02YfbKHWMl2QTEUSG0ZWT+ZoSH4ttgtol6CyzQdjkmnFGhFJLKYaV76zHbbFjGrUTTLnGI8dS+HudkAKaZMr362wGr51k+zq0qD7Mo1pihKnwbAItW++WTk4nYSjzQ2nU8VUMFYXDFtyqxF0dobQ3aM1k1v9mn/t/wDGC79Kjd0fUQAAAABJRU5ErkJggg%3D%3D') !important; } .entry .entry-actions .item-star-active { background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAQCAYAAADJViUEAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjEwcrIlkgAAAY9JREFUOE+VUz1Lw1AUzVilYl0Up8bQjurgIjaN9QOkOJSqBaFfVqpDpaI4OYgg+hucigh26ugkgiA4qIvoICg4dBEFFwcRQXrsuWlqP1LB4fCS9+5559xzE0VRFNhheCQOj+cK/QNR2/MKx57sNx5wmDuC13vzP/LEZAIrmTOUvkaRTu2DLlo4bFZe33gWVXxrKOTXMDP31JpMJd0frcKn36H4mBby7fWgWKe6bpRryhgbr+TAW4nV7EUVezunYpnk0mcvtjZzWEieyDlXXiZu+MBDFtfCIpIsz5Xz9xcXlheXzCBpmSPhBi2y2A4kXZ47pE5TCzACCeagYDaSQih8L5t2F3y8dSB/MATDnwVHGAqnrAB/02YfbKHWMl2QTEUSG0ZWT+ZoSH4ttgtol6CyzQdjkmnFGhFJLKYaV76zHbbFjGrUTTLnGI8dS+HudkAKaZMr362wGr51k+zq0qD7Mo1pihKnwbAItW++WTk4nYSjzQ2nU8VUMFYXDFtyqxF0dobQ3aM1k1v9mn/t/wDGC79Kjd0fUQAAAABJRU5ErkJggg%3D%3D') !important; } .entry .entry-icons .item-star-active { background:transparent url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAQCAYAAADJViUEAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjEwcrIlkgAAAY9JREFUOE+VUz1Lw1AUzVilYl0Up8bQjurgIjaN9QOkOJSqBaFfVqpDpaI4OYgg+hucigh26ugkgiA4qIvoICg4dBEFFwcRQXrsuWlqP1LB4fCS9+5559xzE0VRFNhheCQOj+cK/QNR2/MKx57sNx5wmDuC13vzP/LEZAIrmTOUvkaRTu2DLlo4bFZe33gWVXxrKOTXMDP31JpMJd0frcKn36H4mBby7fWgWKe6bpRryhgbr+TAW4nV7EUVezunYpnk0mcvtjZzWEieyDlXXiZu+MBDFtfCIpIsz5Xz9xcXlheXzCBpmSPhBi2y2A4kXZ47pE5TCzACCeagYDaSQih8L5t2F3y8dSB/MATDnwVHGAqnrAB/02YfbKHWMl2QTEUSG0ZWT+ZoSH4ttgtol6CyzQdjkmnFGhFJLKYaV76zHbbFjGrUTTLnGI8dS+HudkAKaZMr362wGr51k+zq0qD7Mo1pihKnwbAItW++WTk4nYSjzQ2nU8VUMFYXDFtyqxF0dobQ3aM1k1v9mn/t/wDGC79Kjd0fUQAAAABJRU5ErkJggg%3D%3D') no-repeat scroll 0% !important; } #selectors-box .selected .selector-icon-selected { display: inline !important; background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAQCAYAAADJViUEAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjEwcrIlkgAAAY9JREFUOE+VUz1Lw1AUzVilYl0Up8bQjurgIjaN9QOkOJSqBaFfVqpDpaI4OYgg+hucigh26ugkgiA4qIvoICg4dBEFFwcRQXrsuWlqP1LB4fCS9+5559xzE0VRFNhheCQOj+cK/QNR2/MKx57sNx5wmDuC13vzP/LEZAIrmTOUvkaRTu2DLlo4bFZe33gWVXxrKOTXMDP31JpMJd0frcKn36H4mBby7fWgWKe6bpRryhgbr+TAW4nV7EUVezunYpnk0mcvtjZzWEieyDlXXiZu+MBDFtfCIpIsz5Xz9xcXlheXzCBpmSPhBi2y2A4kXZ47pE5TCzACCeagYDaSQih8L5t2F3y8dSB/MATDnwVHGAqnrAB/02YfbKHWMl2QTEUSG0ZWT+ZoSH4ttgtol6CyzQdjkmnFGhFJLKYaV76zHbbFjGrUTTLnGI8dS+HudkAKaZMr362wGr51k+zq0qD7Mo1pihKnwbAItW++WTk4nYSjzQ2nU8VUMFYXDFtyqxF0dobQ3aM1k1v9mn/t/wDGC79Kjd0fUQAAAABJRU5ErkJggg%3D%3D') !important; } /* now for unstarred items */ .entry .entry-actions .item-star { background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAQCAYAAADJViUEAAAABGdBTUEAALGPC/xhBQAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjEwcrIlkgAAAVVJREFUOE91k8HLgkAQxf0ueSpCMCwKEU8R5kUw6NKtUx29eY4QT0L9310Dp34T22e5CY/VnXnz3s6sf47jyBO9x/d9536/O23bOrfbzZaie5B7CMNQDoeDeJ5njRvRXnA2m0mWZXK9XmW9XsvTxa8CfdXtdquql8tFjsejrFar32SUJpPJG4vFQs7ns5LLslTrqJuc6XT6KkZVkOf5G7vdTi1DbppGcJKmqcZZKaZueCFIcheGCJl3E6uqSonaSCyPx2PdwCLJNkAqikLzhsOhBEGgI5Y4jmW5XOqmrUBd17Lf75XACKMoMg387zZVOULXMi4gE4P4dSc+yYwG8ul0UmAXoGy5MC8yVsyIIJGMGivfHIdj0aOO+ovMHJMk0cTNZqOJ2GTl2zRrNBr1yRTgEnx1U5WYBs0Cruv2yVg2dubz+UdjONJgMLBdUftf9etv6+4/APyMT/MKWJZkAAAAAElFTkSuQmCC') !important; } .entry .entry-icons .item-star { background:transparent url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAQCAYAAADJViUEAAAABGdBTUEAALGPC/xhBQAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjEwcrIlkgAAAVVJREFUOE91k8HLgkAQxf0ueSpCMCwKEU8R5kUw6NKtUx29eY4QT0L9310Dp34T22e5CY/VnXnz3s6sf47jyBO9x/d9536/O23bOrfbzZaie5B7CMNQDoeDeJ5njRvRXnA2m0mWZXK9XmW9XsvTxa8CfdXtdquql8tFjsejrFar32SUJpPJG4vFQs7ns5LLslTrqJuc6XT6KkZVkOf5G7vdTi1DbppGcJKmqcZZKaZueCFIcheGCJl3E6uqSonaSCyPx2PdwCLJNkAqikLzhsOhBEGgI5Y4jmW5XOqmrUBd17Lf75XACKMoMg387zZVOULXMi4gE4P4dSc+yYwG8ul0UmAXoGy5MC8yVsyIIJGMGivfHIdj0aOO+ovMHJMk0cTNZqOJ2GTl2zRrNBr1yRTgEnx1U5WYBs0Cruv2yVg2dubz+UdjONJgMLBdUftf9etv6+4/APyMT/MKWJZkAAAAAElFTkSuQmCC') no-repeat scroll 0% !important; } /* Ka-Yue.com */ .entry-title { color: #CCC !important; font-weight:800 !important; } /* font-size */ ins p { color: #BBB !important; line-height: 1.3em !important; } #entries.list #current-entry.expanded .collapsed { border-width: 2px 0 2px 0 !important; border-bottom-color: #666 !important; } #entries.list .entry .collapsed { border: solid 2px #000 !important; } body.hide-nav #entries .entry-body { max-width: 100% !important; } .entry-source-title, .entry-title-link, a, .link { color:#3c90d8 !important; } .entry .card {border:none;} #entries .entry{padding-top:0px} .card-common{margin: 0px} .scroll-tree li {background: #192129;} #lhn-selectors .selector .text { color: #3C90D8;} #chrome-view-links {background: #0C1319;} .Tzvkxd .c1norb {opacity: 0.5;} .Tzvkxd .R7iiN, .Tzvkxd .wWwc8d {opacity: 0.5;} #current-entry {border:2px solid #3c90d8} .read h2  a.entry-title-link{ color: #882C55 !important; background: #192132}";
	GM_addStyle(css, 'rps_dark');
	//fireResize();
};
