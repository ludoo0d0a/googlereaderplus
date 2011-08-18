var Slideshow = function(opts){
	this.init(opts);
};
function _extend(o,c){
	for(var g in c){
		if (c)
			o[g]=c[g];
	}
}
_extend(Slideshow.prototype , {
	range: 4,
	opacityratio: 1.5,
	idx:0,
	cover:true,
	els: [],
	reflection:true,
	add: function(cfg){
		if (!cfg) {return;}
		var cls='', me = this;
		var o={
			cfg:cfg
		};
		var html = '', c='';
		if (cfg.src){
			html = '<img'+cls+' src="'+cfg.src+'"/>';
		}else{
			html = cfg.text||'';
			c=' ss-inner-text';
		}
		var idx=this.items.length;
		o.el = dh(this.wrapper, 'div', {
			cls:'ss-inner ss-hidden'+c,
			html:html
		},{
			click:function(e){
				me.move(idx, true);
			}
		});
		o.img=o.el.firstChild;
		o.idx=idx;
		//o.el.id='ss-item'+item.idx;
		this.items.push(o);
		this.refresh();
	},
	init: function(opts){
		Slideshow._i= ++Slideshow._i||0;
		this._id=Slideshow._i;
		this.opts = opts;
		this.root =dh(this.opts.el||document.body, 'div', {
			id_:'_ss_'+this._id,
			cls:'ss-outer '+((this.cover)?'ss-cover':'ss-slide')+((this.reflection)?' ss-reflect':'')
		});
		this.wrapper =dh(this.root, 'div', {
			cls:'ss-wrapper'
		});
		var clr =dh(this.root, 'div', {
			cls:'ss-clr'
		});	
		this.text =dh(this.root, 'div', {
			cls:'ss-text'
		});		
		this.width = this.root.clientWidth; 
		var me = this;
		this.items=[];
		if (this.opts.els){
			for (var i = 0, len=this.opts.els.length; i < len; i++){
				this.add(this.opts.els[i]);
			}
		}
		this._onmousewheel=function(e){
			e.preventDefault();
			if (e.wheelDelta < 0)
				me.next();
			else
				me.prev();
			
		};
		this.root.addEventListener('mousewheel', this._onmousewheel, false);
		
		this._onkeydown=function(e){
			//37left,39right
			if (e.keyCode===39)
				me.next();
			else if (e.keyCode===37)
				me.prev();
			e.preventDefault();
		};
		document.addEventListener('keydown', this._onkeydown, false);
		
		this.move(this.idx, false, true);
	},
	last: function(silent){
		var to = this.items.length-1;
		this.move(to, silent);
	},
	first: function(n, silent){
		this.move(0, silent);
	},
	prev: function(n, silent){
		var to = this.idx - (n || 1);
		this.move(to, silent);
	},
	next: function(n, silent){
		var to = this.idx + (n || 1);
		this.move(to, silent);
	},
	refresh: function(silent){
		this.move(this.idx, silent, true);
	},
	move: function(target, silent, force){
		if (this.inprogress){
			return;
		}
		if (!force && this.idx===target){
			return;
		}
		this.inprogress=true;
		target=target||0;
		target=Math.min(Math.max(0, target), this.items.length-1);
		//var d = (dir == 'prev')?+1:-1;
		var t = this.items[target];
		if (t){
			var l = t.el.offsetLeft + t.el.clientWidth/2 - this.width / 2 ;
			//console.log(target+'='+l);
			this.wrapper.style.left=-l+'px';
			this.idx=target;
			
			var lr= Math.max(0,this.idx - this.range);
			var hr= Math.min(this.items.length-1,this.idx + this.range);
			var me = this, idx =me.idx, _3d=this.opts.cover;
	
			foreach(me.items,function(item,i){
				removeClass(item.el,'ss-current');
				if (i>=lr && i<=hr){
					//in range
					var c = '';
					if (item.cfg.text){
						c = ' ss-inner-text';
					}
					item.el.className='ss-inner'+c;
					if(_3d){
						item.img.style.webkitTransform='';
					}
					var g = 1.2-(Math.abs(i-idx)*me.opacityratio)/me.range;
					//var g = normalcdf(Math.abs(i - idx), 0, hr+1 - idx, 1, 0);
					var f = Math.max(0,Math.min(1,g));
					//console.log(i+'-'+f);
					item.el.style.opacity = f;
					//console.log(i+'-'+f);
					if (i===idx){
						addClass(item.el,'ss-current', true);
					}else if (i>idx){
						//addClass(item.el,'ss-after', true);
						if(_3d){
							item.img.style.webkitTransform = 'rotateY('+(20+f*40)+'deg)';
						}
					}else {
						//addClass(item.el,'ss-before', true);
						if(_3d){
							item.img.style.webkitTransform = 'rotateY(-'+(20+f*40)+'deg)';
						}
					}
				}else{
					//hide
					addClass(item.el,'ss-hidden', true);
				}
			});
			this.select();
		}
		this.inprogress=false;
	},
	select: function(){
		var item = this.items[this.idx];
		if (this.opts.formatText){
			var text = this.opts.formatText(item.cfg,item);
			this.text.innerHTML=text;
		}
		if (this.opts.onselect){
			this.opts.onselect(item.cfg,item);
		}
	},
	destroy: function(){
		this.root.removeEventListener('mousewheel', this._onmousewheel, false);
		this.root.removeEventListener('keydown', this._onkeydown, false);
		this.root._onmousewheel=null;
		this.root._onkeydown=null;
		remove(this.root);
		this.items=[];
		this.idx = 0;
	}
}
);

function normalcdf(mean, sigma, to) {
    var z = (to-mean)/Math.sqrt(2*sigma*sigma);
    var t = 1/(1+0.3275911*Math.abs(z));
    var a1 =  0.254829592;
    var a2 = -0.284496736;
    var a3 =  1.421413741;
    var a4 = -1.453152027;
    var a5 =  1.061405429;
    var erf = 1-(((((a5*t + a4)*t) + a3)*t + a2)*t + a1)*t*Math.exp(-z*z);
    var sign = 1;
    if(z < 0)
    {
        sign = -1;
    }
    return (1/2)*(1+sign*erf);
}