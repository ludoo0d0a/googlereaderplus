var Coverflow = function(cv, items, opts){
	this.init(cv, items, opts);
};
function _extend(o,c){
	for(var g in c){
		if (c && c[g])
			o[g]=c[g];
	}
}
_extend(Coverflow.prototype , {
//var Coverflow = {
	divs: 10,
	add: function(item){
		for (var j = 0; j < this.divs; j++)
			this.items.push(item);
		var self = this;
		self.draw(true);
	},
	init: function(cv, items, opts)
	{
		this.cv = cv;
		this.items = [];
		for (var i = 0 ; i < items.length; i++)
			for (var j = 0; j < this.divs; j++)
				this.items.push(items[i]);
		this.opts = opts;
		this.opts.width = opts.width || 600;
		this.opts.height = opts.height || 300;
		
		this.cv.width = this.opts.width;
		this.cv.height = this.opts.height;
		this.ctx = this.cv.getContext('2d');
		this.idx = 0;
		
		var self = this;
		this.draw(true);
		var self = this;
		/*this.cv.onmousescroll=function(e)
		{
			e.preventDefault();
			if (e.detail > 0)
				self.next();
			else
				self.prev();
		};
		this.cv.addEventListener('DOMMouseScroll', this.cv.onmousescroll, false);*/
		this.cv.onmousewheel=function(e){
			e.preventDefault();
			if (e.wheelDelta < 0)
				self.next();
			else
				self.prev();
			
		};
		//this.cv.addEventListener('mousewheel', this.cv.onmousewheel, false);
		
		this.cv._onkeydown=function(e){
			//37left,39right
			if (e.keyCode===39)
				self.next();
			else if (e.keyCode===37)
				self.prev();
			e.preventDefault();
		};
		document.addEventListener('keydown', this.cv._onkeydown, false);
		//this.cv.addEventListener('keydown', this.cv.onkeydown, false);
		var cx, cy, boundX, boundY;
		this.cv.onmousemove = function(e)
		{
			cx = e.layerX; cy = e.layerY;
			boundX = cx >= self._center.poly[0][0] && cx <= self._center.poly[3][0];
			boundY = cy >= self._center.poly[0][1] && cy <= self._center.poly[1][1];
			if (boundX && boundY)
				this.style.cursor = 'pointer';
			else
				this.style.cursor = 'default';
		};
		this.cv.onclick = function(e)
		{
			if (boundX && boundY)
				self.opts.onSelectCenter(self.items[self._center.n]);
		};
	},
	
	_anim: {to: 0},
	
	prev: function(n, silent)
	{
		var to = this._anim.to - this.divs * (n || 1);
		this.move(Math.max(0, to), 'prev', silent);
	},
	
	next: function(n, silent)
	{
		var to = this._anim.to + this.divs * (n || 1);
		this.move(Math.min(to, this.items.length - this.divs), 'next', silent);
	},
	
	move: function(target, dir, silent)
	{
		var check = dir == 'prev' ? this.idx == 0 : this.idx >= this.items.length - this.divs;
		if (check)
			return;
		if (this.lock)
		{
			this._anim.to = target;
			return;
		}
		this.lock = true;
		var self = this;
		this._anim = {from: this.idx, to: target};
		self._anim.timer = setInterval(function()
		{
			var dir = self._anim.to - self._anim.from > 0 ? 'next' : 'prev';
			var shift = (self._anim.to - self._anim.from) / 6;
			self.idx += Math[dir == 'next' ? 'floor' : 'ceil'](shift);
			var check = dir == 'prev' ? self.idx <= self._anim.to : self.idx >= self._anim.to;
			if (check)
			{
				self.idx = self._anim.to;
				clearInterval(self._anim.timer);
				self.lock = false;
			}
			self.draw(false, silent);
		}, 1000/30);
	},
	
	linear: function(i, x0, x1, y0, y1)
	{
		return i * (y1 - y0)/((x1 - x0) || 1) + (y0*x1 - y1*x0)/(x1 - x0);
	},
	
	draw: function(firstrun, silent)
	{
		this.ctx.clearRect(0, 0, this.opts.width, this.opts.height);
		var self = this, window = 11, block = 140, FOV = 50;
		var map = function(i, a, b, idx)
		{
			self._map = self._map || {};
			if (!(a in self._map))
				self._map[a] = {};
			if (!(i in self._map[a]))
			{
				var item = self.items[i];
				var poly = [];
				for (var j = 0; j < 4; j++)
				{
					var p = [
						Math.floor(j/2 % 2) ? -1 : 1,
						Math.floor((j+1)/2 % 2) ? -1 : 1,
						0
					];
					var x = self.linear(i, a, b, -5, 5);
					var y = 0.5;
					var z = self.linear(Math.abs(i - idx), 0, b - idx, 0, 2.5);
					poly.push(translate(p, -self.linear(i, a, b, -80, 80), -x, y, -z));
				}
				self._map[a][i] = {
					poly: poly, type: 'img', src: item.src,
					opacity: self.linear(Math.abs(i - idx), 0, b - idx, 1, 0),
					fill: self.random(item.src),
					depth: poly.map(function(p)
					{
						return p[2];
					}).reduce(function(prev, curr)
					{
						return prev + curr;
					})/poly.length, n: i
				};
			}
			return self._map[a][i];
		};
		//+
		var ratio=[Math.max(this.opts.width/600,0.01), Math.max(this.opts.height/300,0.01)];
		ratio[0]=ratio[1];
		var translate = function(p, phi, x, y, z)
		{
			phi *= Math.PI/180;
			var tmp = [p[0], p[1], p[2]];
			tmp[0] = p[0] * Math.cos(phi) - p[2] * Math.sin(phi);
			tmp[2] = p[0] * Math.sin(phi) + p[2] * Math.cos(phi);
			p = tmp;
			p[0] += x;
			p[1] += y;
			p[2] += z;
			var d = 1/Math.atan(FOV*Math.PI/180);
			p[2] -= 2;
			var b = [d * p[0]/p[2], d * p[1]/p[2]];
			//+
			return [
				Math.floor(b[0] * block)*ratio[0] + self.opts.width/2,
				Math.floor(b[1] * block)*ratio[1] + 2*self.opts.height/3,
				p[2]
			];
		};
		this.store = [];
		var k = Math.floor(window/2);
		if (firstrun)
		{
			for (var i = 0; i < this.items.length; i++)
			{
				var a = -k * this.divs + i, b = k * this.divs + i;
				var drawn = [];
				for (var j = a; j <= b; j++)
				{
					var l = Math.floor(j/this.divs);
					var item = this.items[j];
					if (!item || drawn[l])
						continue;
					drawn[l] = true;
					var obj = map(j, a, b, i);
				}
			}
		}
		var a = -k * this.divs + this.idx, b = k * this.divs + this.idx;
		var drawn = [];
		for (var i = a; i <= b; i++)
		{
			var l = Math.floor(i/this.divs);
			var item = this.items[i];
			if (!item || drawn[l])
				continue;
			drawn[l] = true;
			var obj = map(i, a, b, self.idx);
			if (i - self.idx == 0)
				this._center = obj;
			this.store.push(obj);
		}
		this.store.sort(function(a, b)
		{
			return a.depth > b.depth ? 1 : -1;
		});
		for (var j = 0; j < self.store.length; j++)
			self.render(self.store[j]);
		//+
		if (!silent && self.opts.onMove){
			self.opts.onMove(self.items[this.idx]);
		}
	},
	
	random: function(src)
	{
		this._rmap = this._rmap || {};
		var rand = function()
		{
			return Math.floor(Math.random() * 255);
		};
		if (!this._rmap[src])
			this._rmap[src] = 'rgb('+ rand() +', '+ rand() +', '+ rand() +')';
		return this._rmap[src];
	},
	
	render: function(opts)
	{
		var self = this;
		if (opts.type == 'dot')
		{
			this.ctx.fillStyle = '#fff';
			this.ctx.beginPath();
			this.ctx.arc(opts.x, opts.y, 2, 0, Math.PI*2, false);
			this.ctx.closePath();
			this.ctx.fill();
		}
		else if (opts.type == 'rect')
		{
			this.ctx.globalAlpha = opts.opacity;
			this.ctx.fillStyle = opts.fill;
			this.ctx.beginPath();
			this.ctx.moveTo(opts.poly[0][0], opts.poly[0][1]);
			this.ctx.lineTo(opts.poly[1][0], opts.poly[1][1]);
			this.ctx.lineTo(opts.poly[2][0], opts.poly[2][1]);
			this.ctx.lineTo(opts.poly[0][0], opts.poly[0][1]);
			this.ctx.lineTo(opts.poly[3][0], opts.poly[3][1]);
			this.ctx.lineTo(opts.poly[2][0], opts.poly[2][1]);
			this.ctx.fill();
			this.ctx.stroke();
			this.ctx.globalAlpha = 1;
		}
		else if (opts.type == 'img')
		{
			this.ctx.globalAlpha = opts.opacity;
			//this.ctx.globalCompositeOperation = 'destination-over';
			var img = new Image();
			img.src = opts.src;
			var w = img.width, h = img.height;
			//+
			var rx = w/h;
			var slices = Math.min(w, opts.poly[3][0] - opts.poly[0][0]);
			var sliceW = w / slices;
			//+
			slices = Math.floor(w / sliceW);
			var lh = opts.poly[1][1] - opts.poly[0][1], rh = opts.poly[2][1] - opts.poly[3][1];
			if (lh == rh){
				self.ctx.drawImage(
					img, opts.poly[0][0], opts.poly[0][1],
					opts.poly[3][0] - opts.poly[0][0], lh
				);
				return;
			}
			for (var i = 0; i < slices; i++)
			{
				var sx = i * sliceW, sy = 0,
					sWidth = sliceW, sHeight = h;
				var dx = self.linear(i, 0, slices, opts.poly[0][0], opts.poly[3][0]);
				var dy = self.linear(i, 0, slices, opts.poly[0][1], opts.poly[3][1]);
				var dWidth = (opts.poly[3][0] - opts.poly[0][0]) / slices;
				var dHeight = self.linear(i, 0, slices - 1, lh, rh);
				self.ctx.drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

			}
			this.ctx.globalAlpha = 1;
		}
	},
	destroy: function(){
		//this.cv.removeEventListener('DOMMouseScroll', this.cv.onmousescroll, false);
		this.cv.removeEventListener('mousewheel', this.cv.onmousewheel, false);
		this.cv.onmousemove=null;
		this.cv.onclick=null;
	}
}
);