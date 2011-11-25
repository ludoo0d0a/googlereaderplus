//http://stevenlevithan.com/assets/misc/date.format.js

var dDate = function(){
	var langs={
		en:{
			//5:31 AM
			h:{
				re:/(\d+):(\d+)\s([AP]M)\s+\([^\)]\)/,
				p:['h','m','t','ago']
			},
			//Nov 24, 2011
			d:{
				re:/(\w+)\s(\d+),\s(\d+)/,
				p:['M','d','y']
			},
			full:{
				//Nov 16, 2011 6:10 PM
				re:/((\w+)\s(\d+),\s(\d+))\s?((\d+):(\d+)\s([AP]M))(\s+\([^\)]\))/,
				p:['_day','M','d','y','_hour','h','m','t','_ago','ago']
			},
			ago:/\d+ hours ago/
		}
	};
	
	return function(){
		return {
			parse:function(text, lang){
				var d = false;
				var l = langs[lang];
				var m = l.full.re.exec(text);
				if (m){
					var n={y:0, M:0, d:0, h:0, m:0, s:0};
					//d = new Date(year, month, day, hours, minutes, seconds, milliseconds);
					for(var i=0, len=m.length;i<len; i++){
						n[p[i]]=m[i];
					}
					d = new Date(n.y, n.M, n.d, n.h, n.m, n.s, 0);
				}
				return d;
			},
			compare:function(d1,d2){
				if (d1===d2){
					return 0;
				}else if (d1>d2){
					return 1;
				} else{
					return -1;
				}
			}
		};
	};
	
}();


// For convenience...
Date.prototype.compare = function (date) {
	return dDate.compare(this, date);
};