;
(function() {
	"use strict";

	function preventDefault(ev) {
		ev.preventDefault();
	}
	document.addEventListener('touchmove', preventDefault, false);

	function canvasGround(o) {
		this.spots = o;
		this.r = 30;
		this.create();
		this.resize(this.canvas);
		this.draw();
	}
	canvasGround.prototype = {
		create: function() {
			this.canvas = document.getElementById("bapp");
			this.ctx = this.canvas.getContext("2d");
		},
		resize: function(canvas) {
			this.winW = window.innerWidth;
			this.winH = window.innerHeight;
			if (this.winW > this.winH) {
				this.winW = 750;
				this.winH = 1206;
			}
			canvas.setAttribute("width", this.winW);
			canvas.setAttribute("height", this.winH);
		},
		draw: function() {
			for (var i = 0; i < this.spots.pos.length; i++) {
				this.ctx.fillStyle = "#020202";
				this.ctx.beginPath();
				this.ctx.arc(this.spots.pos[i].l, this.spots.pos[i].t, this.r, 0, 2 * Math.PI, true);
				this.ctx.fill();
				this.ctx.fillStyle = "#ffffff";
				this.ctx.beginPath();
				this.ctx.arc(this.spots.pos[i].l, this.spots.pos[i].t, this.r - 2, 0, 2 * Math.PI, true);
				this.ctx.fill();
				this.ctx.fillStyle = "#020202";
				this.ctx.beginPath();
				this.ctx.arc(this.spots.pos[i].l, this.spots.pos[i].t, 10, 0, 2 * Math.PI, true);
				this.ctx.fill();
			};
		}
	}

	function canvasMain(o) {
		this.spots = o;
		this.lineW = 8;
		this.currentSpot = -1; // 起始点
		this.conbine = []; // 经过点
		this.create();
		canvasGround.prototype.resize.call(this, this.canvas);
		this.touchEvent();
	}
	canvasMain.prototype = {
		create: function() {
			this.canvas = document.getElementById("app");
			this.ctx = this.canvas.getContext("2d");
		},
		drawLine: function(n) {
			if (n.length < 2) {
				return;
			}
			this.ctx.beginPath();
			for (var i = 0; i < n.length - 1; i++) {
				this.ctx.lineCap = "round";
				this.ctx.lineWidth = this.lineW;
				this.ctx.moveTo(this.spots.pos[n[i]].l, this.spots.pos[n[i]].t);
				this.ctx.lineTo(this.spots.pos[n[i + 1]].l, this.spots.pos[n[i + 1]].t);
				this.ctx.stroke();
			};
		},
		clearBackground: function() {
			this.ctx.clearRect(0, 0, 750, this.winH);
		},
		clear: function() {
			this.conbine = [];
			this.currentSpot = -1;
			this.resulted = false;
			this.clearBackground();
			for (var i = 0; i < this.spots.pos.length; i++) {
				this.spots.pos[i].isDrawed = false;
			};
		},
		getSpot: function(x, y) {
			for (var i = 0; i < this.spots.pos.length; i++) {
				if (x > this.spots.pos[i].l - 15 && x < this.spots.pos[i].l + 15 && y > this.spots.pos[i].t - 15 && y < this.spots.pos[i].t + 15 && !this.spots.pos[i].isDrawed) {
					return this.spots.pos[i].id; //返回匹配点
				}
			};
		},
		touchEvent: function() {
			var self = this;
			this.canvas.addEventListener("touchstart", function() {
				self.clear();
			})
			this.canvas.addEventListener("touchmove", function(e) {
				var index = self.getSpot(e.touches[0].pageX, e.touches[0].pageY);
				// 命中点
				if ((index || index === 0)) {
					self.spots.pos[index].isDrawed = true;
					self.currentSpot = index;
					self.conbine.push(self.currentSpot);
				}
				// 非起始点画线
				if (self.currentSpot !== -1) {
					self.clearBackground();
					self.drawLine(self.conbine);
					self.ctx.beginPath();
					self.ctx.lineCap = "round";
					self.ctx.lineWidth = self.lineW;
					self.ctx.moveTo(self.spots.pos[self.currentSpot].l, self.spots.pos[self.currentSpot].t);
					self.ctx.lineTo(e.touches[0].pageX, e.touches[0].pageY);
					self.ctx.stroke();
				}
			});
			this.canvas.addEventListener("touchend", function() {
				self.clearBackground();
				self.drawLine(self.conbine);
			})
		}
	}

	function NyPhile() {
		this.spots = {
			pos: (function() {
				var g = 3,
					d = 200,
					arr = [];
				for (var i = 0; i < g * g; i++) {
					var row = Math.ceil((i + 1) / g);
					var col = (i % g) + 1;
					console.log(row, col);
					arr.push({
						t: d * row,
						l: d * col,
						id: i
					})
				}
				return arr;
			})()
		};
		this.canvasGround = new canvasGround(this.spots);
		this.canvasMain = new canvasMain(this.spots);
	}
	var app = new NyPhile();
})();