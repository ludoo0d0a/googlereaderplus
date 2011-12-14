//http://stevenlevithan.com/assets/misc/date.format.js

var dDate = function() {
	var langs = {
		en : {
			months:{Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11},
			//ago : /\d+ hours? ago/,
			//5:31 AM
			h : {
				re : /(\d+):(\d+)\s([AP]M)\s+\([^\)]\)/,
				p : ['h', 'm', 't', 'ago']
			},
			//Nov 24, 2011
			d : {
				re : /(\w+)\s(\d+),\s(\d+)/,
				p : ['M', 'd', 'y']
			},
			full : {
				//Nov 16, 2011 6:10 PM
				re : /((\w+)\s(\d+),\s(\d+))?\s?((\d+):(\d+)\s([AP]M))?(\s+\([^\)]\))?/,
				p : ['_all', '_day', 'M', 'd', 'y', '_hour', 'h', 'm', 't', '_ago', 'ago']
			}
		},
		fr:{
			_months:"janv.,f\u00e9vr.,mars,avr.,mai,juin,juil.,ao\u00fbt,sept.,oct.,nov.,d\u00e9c.",
			full : {
				//7 déc. 2011 02:23
				re : /((\w+)\s([^\s]+)\s(\d+))?\s?((\d+):(\d+))?(\s+\([^\)]\))?/,
				p : ['_all', '_day', 'd', 'M', 'y', '_hour', 'h', 'm', '_ago', 'ago']
			}
		}
	};

	function getInt(a, def) {
		var v = a;
		if(v) {
			v = parseInt(v, 10);
		}
		return v || def;
	}

	//return function(){
	return {
		parse : function(text, lang) {
			var d = false;
			lang = lang || 'en';
			var l = langs[lang];
			if (!l.full){
				l.full=langs.en.full;
				l.h=langs.en.h;
				l.d=langs.en.d;
			}
			if (!l.months){
				l.months={};
				var m =l._months.split(',');
				for(var i = 0, len = m.length; i < len; i++) {
					l.months[m[i]] = i || 0;
				}
			}
			var m = l.full.re.exec(text), p = l.full.p;
			if(m) {
				var n = {
					y : 0,
					M : 0,
					d : 0,
					h : 0,
					m : 0,
					s : 0
				};
				//d = new Date(year, month, day, hours, minutes, seconds, milliseconds);
				for(var i = 0, len = m.length; i < len; i++) {
					n[p[i]] = m[i] || 0;
				}
				var today = new Date();
				n.y = getInt(n.y, today.getFullYear());
				n.M = getInt(l.months[n.M]||n.M, today.getMonth());
				n.d = getInt(n.d, today.getDate());
				d = new Date(n.y, n.M, n.d, n.h, n.m, n.s, 0);
			}
			return d;
		},
		compare : function(d1, d2) {
			if(d1 === d2) {
				return 0;
			} else if(d1 > d2) {
				return 1;
			} else {
				return -1;
			}
		},
		daysBetween : function(d1, d2) {
			var ms = d2.getTime() - d1.getTime();
			return Math.floor(ms / 864E5);
		},
		daysBeforeToday : function(d,lang) {
			var t=d;
			if (typeof d ==='string'){
				d = this.parse(d,lang);
			}
			var db =  this.daysBetween(d, new Date());
			console.log(t+' - '+db);
			return db;
		}
	};
	//};

}();

function test(txt) {
	var today = new Date();
	var d = dDate.parse(txt);
	//var days = dDate.daysBetween(d, today);
	var days = dDate.daysBeforeToday(d);
	console.log(txt + ' -> ' + d + 'days=' + days);
}

function tests() {
	test('10:38 AM');
	test('Dec 6, 2011');
	test('Nov 13, 2011');
	test('Sep 29, 2011');

	test('Dec 5, 2011 (2 days ago)');
	test('Dec 1, 2011 (6 days ago)');
	test('Nov 26, 2011 5:42 PM');
	test('Nov 22, 2011 10:09 AM');
}

/*tests();*/
