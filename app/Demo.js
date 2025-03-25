function Demo() {
	this.size = 650;
	getTag('body').appendChild(crCanvas('canvas', this.size, this.size, [crText('Use better browser e.g '), crA('Opera', 'http://opera.com'), crText(', '), crA('FireFox', 'http://mozilla.org'), crText(', or '), crA('Safari', 'http://apple.com')]));
	this.canvas = getId('canvas');
	if (this.canvas.getContext)
		this.init();
}

Demo.prototype.init = function () {
	this.id = 'controls';
	this.ctx = this.canvas.getContext('2d');
	this.time = 0;
	this.tf = 1000;
	this.center = this.size / 2;
	this.config = { redraw: 33, R: 75, r: 5, D: 100, d: 20, w1: 10, w2: 2, count: 10, fill: 1, showLines: 0, shape: 1, angls: 3, pulse: 1, color: 1, alpha: 1, lw: 1, clear: 1 }
	this.vars = { psi: 0, fi: 0, x: 0, y: 0, x1: 0, y1: 0, r: 0, red: 0, green: 0, blue: 0, alpha: 0, lw: 0, i: 0, j: 0 };
	getTag('body').appendChild(this.controls());
	this.regen = interval(this, this.anim, this.config.redraw);
}

Demo.prototype.controls = function () {
	return crDiv(this.id, this.id, [
		crDiv(null, 'field', [crText('Shape.'), crBR(),
		crRadio(this.config.shape ? 1 : 0, 'shape1', 1, { 'onclick': this.change }, this), crText('Circle'),
		crRadio(this.config.shape ? 0 : 1, 'shape0', 0, { 'onclick': this.change }, this), crText('Polygon')]),
		crDiv(null, 'field', [crText('Angles'), crInput(5, this.config.angls, 'angls', null, { 'onchange': this.change }, this)]),
		crDiv(null, 'field', [crText('Show Lines'), crCheck(this.config.showLines, 'showLines', { 'onclick': this.change }, this)]),
		crDiv(null, 'field', [crText('Redraw rate (ms)'), crInput(5, this.config.redraw, 'redraw', null, { 'onchange': this.change }, this)]),
		crDiv(null, 'field', [crText('Greater Radius'), crInput(5, this.config.R, 'R', null, { 'onchange': this.change }, this)]),
		crDiv(null, 'field', [crText('Lesser Radius'), crInput(5, this.config.r, 'r', null, { 'onchange': this.change }, this)]),
		crDiv(null, 'field', [crText('Greater orbit'), crInput(5, this.config.D, 'D', null, { 'onchange': this.change }, this)]),
		crDiv(null, 'field', [crText('Lesser orbit'), crInput(5, this.config.d, 'd', null, { 'onchange': this.change }, this)]),
		crDiv(null, 'field', [crText('Omega1'), crInput(5, this.config.w1, 'w1', null, { 'onchange': this.change }, this)]),
		crDiv(null, 'field', [crText('Omega2'), crInput(5, this.config.w2, 'w2', null, { 'onchange': this.change }, this)]),
		crDiv(null, 'field', [crText('Shapes count'), crInput(5, this.config.count, 'count', null, { 'onchange': this.change }, this)]),
		crDiv(null, 'field', [crText('Draw style'), crBR(),
		crRadio(this.config.fill ? 1 : 0, 'fill1', 1, { 'onclick': this.change }, this), crText('Fill'),
		crRadio(this.config.fill ? 0 : 1, 'fill0', 0, { 'onclick': this.change }, this), crText('Stroke')]),
		crDiv(null, 'field', [crText('Pulse radius'), crCheck(this.config.pulse, 'pulse', { 'onclick': this.change }, this)]),
		crDiv(null, 'field', [crText('Color'), crCheck(this.config.color, 'color', { 'onclick': this.change }, this)]),
		crDiv(null, 'field', [crText('Alpha'), crCheck(this.config.alpha, 'alpha', { 'onclick': this.change }, this)]),
		crDiv(null, 'field', [crText('Lineweight'), crCheck(this.config.lw, 'lw', { 'onclick': this.change }, this)]),
		crDiv(null, 'field', [crText('Clear previous frames'), crCheck(this.config.clear, 'clear', { 'onclick': this.change }, this)]),
		crDiv(null, 'field', [crButton('Clear All', null, null, { 'onclick': this.clearAll }, this)]),
		crDiv(null, 'field', [crButton('Export conf', null, null, { 'onclick': this.exportConf }, this), crButton('Import conf', null, null, { 'onclick': this.importConf }, this), crBR(), crTextarea(20, 6, null, 'config', null, 'hard')])
	]);
}

Demo.prototype.change = function (e) {
	var t = e.target;
	var id = t.id;
	if (_n(id, 1) == 'fill' || _n(id, 1) == 'shape') //radios
	{
		this.config[_n(id, 1)] = parseInt(t.value);
		t.checked = true;
		getId('' + _n(id, 1) + (t.value == 1 ? 0 : 1)).checked = false;
	}
	else
		this.config[id] = parseInt(t.value);

	if (id == 'showLines' || id == 'pulse' || id == 'color' || id == 'alpha' || id == 'lw' || id == 'clear') //sheckboxes
		this.config[id] = (t.checked == true ? 1 : 0);

	if (id == 'redraw') {
		clearInterval(this.regen);
		this.regen = interval(this, this.anim, this.config.redraw);
	}
}

Demo.prototype.exportConf = function () {
	var i = 1;
	var json = '{';
	for (var attr in this.config) { json += attr + ':' + this.config[attr] + ',' + (i % 3 == 0 ? '\n' : ''); i++ }
	getId('config').value = _n(json, 1) + '}';
}

Demo.prototype.importConf = function () {
	var config = getId('config').value;
	//alert(config)
	this.config = eval('(' + config + ')');
	clearInterval(this.regen);
	this.regen = interval(this, this.anim, this.config.redraw);
	getTag('body').replaceChild(this.controls(), getId('controls'));
}

Demo.prototype.clearAll = function () {
	this.ctx.clearRect(0, 0, this.center * 2, this.center * 2); //clear previous frame
}

Demo.prototype.anim = function () {
	//alertt(this.time);
	if (this.config.clear)
		this.ctx.clearRect(0, 0, this.center * 2, this.center * 2); //clear previous frame

	for (this.vars.i = 1; this.vars.i < this.config.count + 1; this.vars.i++) //draw shapes again
	{
		this.vars.psi = 2 * Math.PI / this.config.w1 / this.tf * this.time - Math.PI / 2; //main circle angle
		this.vars.fi = 2 * Math.PI / (this.config.w1 - (this.config.w1 - this.config.w2) / this.config.count * this.vars.i) / this.tf * this.time - Math.PI / 2; //radial shapes angle
		this.vars.x = this.center + this.vars.i / this.config.count * this.config.D * Math.cos(this.vars.psi); //main circle center X
		this.vars.y = this.center + this.vars.i / this.config.count * this.config.D * Math.sin(this.vars.psi); //main circle center Y
		this.vars.x1 = this.vars.x + this.config.d * (this.config.count + 1 - this.vars.i) / this.config.count * Math.cos(this.vars.fi); //radial shape center X
		this.vars.y1 = this.vars.y + this.config.d * (this.config.count + 1 - this.vars.i) / this.config.count * Math.sin(this.vars.fi);  //radial shape center Y

		this.vars.r = this.config.R - (this.config.R - this.config.r) * this.vars.i / this.config.count; //radial shape radius
		if (this.config.pulse)
			this.vars.r *= (Math.pow(Math.sin(this.time / this.tf - this.vars.i), 2) + 1);

		/////////////////////////////Set Style//////////////////////////////
		//this.setStyle(i);
		if (this.config.alpha)
			this.vars.alpha = (Math.sin(this.time / this.tf + this.vars.i) + Math.cos(this.time / this.tf - this.vars.i)) / 2 + 0.5;
		else
			this.vars.alpha = 1;

		if (this.config.color) {
			this.vars.red = Math.floor(Math.sin(this.time / this.tf - 0.3 * this.vars.i) * 255);
			this.vars.green = Math.floor(Math.cos(this.time / this.tf - 0.6 * this.vars.i) * 255);
			this.vars.blue = Math.floor(Math.cos(this.time / this.tf - this.vars.i) * 255);
		}
		else {
			this.vars.red = 0;
			this.vars.green = 0;
			this.vars.blue = 0;
		}

		if (this.config.lw)
			this.vars.lw = 5 * Math.pow(Math.sin(this.time / this.tf - this.vars.i), 2) + 1;
		else
			this.vars.lw = 2;

		this.ctx.strokeStyle = 'rgba(' + this.vars.red + ',' + this.vars.green + ',' + this.vars.blue + ',' + this.vars.alpha + ')';
		this.ctx.fillStyle = 'rgba(' + this.vars.red + ',' + this.vars.green + ',' + this.vars.blue + ',' + this.vars.alpha + ')';
		this.ctx.lineWidth = this.vars.lw;
		this.ctx.save();

		///////////////////////////////////////////////////////////////////////


		////////////////////////////////Show Lines ///////////////////////////////////////
		if (this.config.showLines)
		//this.drawLines(x,y,x1,y1);
		{
			this.ctx.strokeStyle = 'rgb(0,0,0)';
			this.ctx.lineWidth = 1;

			this.ctx.beginPath();
			this.ctx.moveTo(this.center, this.center)
			this.ctx.lineTo(this.vars.x, this.vars.y);
			this.ctx.lineTo(this.vars.x1, this.vars.y1);
			this.ctx.stroke();

			this.ctx.restore();
		}

		///////////////////////////////////////////////////////////////////////

		this.ctx.beginPath();
		if (this.config.shape == 1) //if circles
			this.ctx.arc(this.vars.x1, this.vars.y1, this.vars.r, 0, Math.PI * 2, 1); //draw a circle
		else { //or a polyangle
			this.ctx.moveTo(this.vars.x1 + this.vars.r * Math.cos(this.vars.fi), this.vars.y1 + this.vars.r * Math.sin(this.vars.fi));
			if (this.config.angls < 0 || this.config.angls > 25)
				this.config.angls = 3;
			for (this.vars.j = 1; this.vars.j < this.config.angls; this.vars.j++)
				this.ctx.lineTo(this.vars.x1 + this.vars.r * Math.cos(2 * Math.PI / this.config.angls * this.vars.j + this.vars.fi), this.vars.y1 + this.vars.r * Math.sin(2 * Math.PI / this.config.angls * this.vars.j + this.vars.fi));
			this.ctx.closePath();
		}

		if (this.config.fill)
			this.ctx.fill();
		else
			this.ctx.stroke();
	}
	this.time += this.config.redraw;
}
