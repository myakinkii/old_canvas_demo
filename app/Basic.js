function crEl(tag, id, cN, children, events, context) {
	var el = document.createElement(tag);
	if (id)
		el.id = id;
	if (cN)
		el.className = cN
	if (children)
		if (children[0] != null && typeof (children[0]) == 'object' && children[0].inner)
			el.innerHTML = children[0].inner;
		else
			for (var i in children)
				if (children.hasOwnProperty(i) && children[i] != null)
					el.appendChild(children[i]);
	if (events)
		for (var i in events)
			if (events.hasOwnProperty(i))
				el[i] = function (e) { var e = window.event ? window.event : e; events['on' + e.type].call(context, e) }
	return el;
}

function crDiv(id, cN, children, events, context) { return crEl('div', id, cN, children, events, context); }

function crText(text) { return document.createTextNode(text); }

function crBR() { return crEl('br'); }

function crA(child, h, id, cN, events, context) {
	if (typeof (child) == 'string')
		var a = crEl('a', id, cN, [crText(child)], events, context);
	else
		var a = crEl('a', id, cN, child, events, context);
	a.href = (h) ? h : "#empty";
	return a;
}

function crCanvas(id, w, h, children) {
	var c = crEl('canvas', id, null, children);
	c.height = h;
	c.width = w;
	return c;
}

function crOption(text, value) {
	var o = crEl('option', null, null, [crText(text)]);
	o.value = value;
	return o;
}

function crSelect(opts, so, id, cN, events, context, size, mult) {
	var s = crEl('select', id, cN, null, events, context);
	s.size = size || 1;
	if (mult)
		s.milt = 'multiple';
	for (var i in opts)
		if (opts.hasOwnProperty(i)) {
			s.appendChild(crOption(opts[i].t, opts[i].v));
		}
	s.selectedIndex = so;
	return s;
}

function crImg(src, alt, w, h, id, cN, events, context) {
	var i = crEl('img', id, cN, null, events, context);
	i.src = src;
	i.alt = alt;
	i.height = h;
	i.width = w;
	return i;
}

function crInput(size, text, id, cN, events, context) {
	var i = crEl('input', id, cN, null, events, context)
	i.type = 'text';
	if (text || text == 0)
		i.value = text;
	if (size)
		i.size = size;
	return i;
}

function crRadio(checked, id, value, events, context) {
	var r = crEl('input', id, null, null, events, context)
	r.type = 'radio';
	r.value = value;
	if (checked)
		r.checked = true;
	return r;
}

function crCheck(checked, id, events, context) {
	var c = crEl('input', id, null, null, events, context)
	c.type = 'checkbox';
	if (checked)
		c.checked = true;
	return c;
}

function crTextarea(cols, rows, text, id, cN, wrap, events, context) {
	var t = crEl('textarea', id, cN, null, events, context)
	if (text || text == 0)
		t.value = text;
	if (cols)
		t.cols = cols;
	if (rows)
		t.rows = rows;
	if (wrap)
		t.wrap = wrap;
	return t;
}

function crButton(val, id, cN, events, context) {
	var b = crEl('input', id, cN, null, events, context)
	b.type = 'button';
	b.value = val;
	return b;
}

function crTable(id, cN, width, children, events, context) {
	var t = crEl('table', id, cN, children, events, context)
	if (width)
		t.width = width;
	return t;
}


function crTR(id, cN, children, events, context) {
	return crEl('tr', id, cN, children, events, context)
}

function crTD(id, cN, colspan, rowspan, children, events, context) {
	var td = crEl('td', id, cN, children, events, context)
	if (colspan)
		td.colSpan = colspan;
	if (rowspan)
		td.rowSpan = rowspan;
	return td;
}

function invoke(func, context) { return function () { func.call(context) } }

function timer(context, func, timeOut) { return window.setTimeout(function () { return func.call(context) }, timeOut) }

function interval(context, func, timeOut) { return window.setInterval(function () { return func.call(context) }, timeOut) }

function randxy(x, y) { return Math.round((y - x) * Math.random()) + x }

function focuss(el) {
	el.focus();
	if (el.setSelectionRange)
		el.setSelectionRange(el.value.length, el.value.length);
}

function getId(id) { return document.getElementById(id); }

function getTag(tag) { return document.getElementsByTagName(tag)[0]; }

function getTags(tag) { return document.getElementsByTagName(tag); }

function esc(str) {
	str = str + '';
	str = str.replace(/\+/g, "%2B");
	str = str.replace(/\&/g, "%26");
	return str;
}

function _n(s, n) { return s.substring(0, s.length - n) }

function alertt(text) {
	var al = crEl("div");
	var id = "alert" + Math.round(10000 * Math.random());
	while (getId("alert" + id)) { id = "alert" + Math.round(10000 * Math.random()); }
	al.id = id;
	with (al.style) {
		zIndex = "2";
		if (navigator.appName != "Microsoft Internet Explorer")
			position = "fixed";
		else
			position = "absolute";
		left = "5px";
		bottom = "5px";
		textAlign = "center";
		margin = "0px auto";
		border = "1px solid #000";
		background = "#ccc";
		width = "auto";
		padding = "5px";
	}
	al.appendChild(crText(text));
	getTag("body").appendChild(al);
	setTimeout(function () { getId(id).style.visibility = "hidden"; getTag("body").removeChild(getId(id)); }, 2000);
}

function confirmm(text) {
	return confirm(text);
}

/////////////////////////////////////////////////////////////////////////////////////////

function IAmHere() {
	this.php = "/iamhere.php";
	this.timer = null;
	this.updateInterval = 5000;
	this.xmlHttp = createXmlHttpRequestObject();
	this.update();
}

// ~IAmHere
IAmHere.prototype.destruct = function () {
	window.clearTimeout(this.timer);
	this.xmlHttp.abort();
}

IAmHere.prototype.update = function () {
	var params = "act=iamhere&&rand=" + Math.random();
	this.xmlHttp.open("POST", this.php, true);
	this.xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	var self = this;
	this.xmlHttp.onreadystatechange = function () {
		self.callbackUpdate.call(self);
	}
	this.xmlHttp.send(params);
	var self = this;
	this.timer = window.setTimeout(function () { self.update.call(self); }, this.updateInterval);
}

IAmHere.prototype.callbackUpdate = function () {
	if (this.xmlHttp.readyState == 4 && this.xmlHttp.status == 200) {
		//then we are still here ;)
	}
}

/////////////////////////////////////////////////////////////////////////////////////////

function includeJs(src) {
	if (!getId(src)) {
		getXmlHttpData(null, src, function (j) {
			var js = crEl("script");
			js.type = "text/javascript";
			js.id = src;
			js.text = j;
			getTag("head").appendChild(js);
		}
			, 'text', null, 'GET', false);
	}
}

function includeCss(src) {
	if (!getId(src)) {
		getXmlHttpData(null, src, function (c) {
			var css = crEl("style");
			css.type = "text/css";
			css.id = src;
			if (css.styleSheet) {
				css.styleSheet.cssText = c;
			}
			else {
				css.appendChild(crText(c));
			}
			getTag("head").appendChild(css);
		}
			, 'text', null, 'GET', false)
	}
}

function createXmlHttpRequestObject() {
	var xmlHttp = null;
	if (window.ActiveXObject) {
		try { xmlHttp = new ActiveXObject("Microsoft.XMLHTTP"); }
		catch (e) { }
	}
	else {
		try { xmlHttp = new XMLHttpRequest(); }
		catch (e) { }
	}
	if (!xmlHttp)
		alert("Error creating the XMLHttpRequest object.");
	else
		return xmlHttp;
}

//////////////////////////////////////////////////////////////////////////////////
//XmlHttpRequest Objet Incapsulated in two classes
//////////////////////////////////////////////////////////////////////////////////

//single request
function getXmlHttpData(context, src, func, ret, params, method, async, debug) {
	var xmlhttp = new SimpleXmlHttp(context, src, func, ret, params, method, async, debug)
}

//queue
function getXmlHttpQueue(context, src, func, ret, params, method, async, debug) {
	return new QueueXmlHttp(context, src, func, ret, params, method, async, debug)
}

//////////////////////////////////////////////////////////////////////////////////

function SimpleXmlHttp(context, src, func, ret, params, method, async, debug) {
	if (!src || !func)
		alert("Not Enogh Parameters.");
	else {
		var xmlHttp = null;
		if (window.ActiveXObject) {
			try { xmlHttp = new ActiveXObject("Microsoft.XMLHTTP"); }
			catch (e) { }
		}
		else {
			try { xmlHttp = new XMLHttpRequest(); }
			catch (e) { }
		}
		if (!xmlHttp)
			alert("Error creating the XMLHttpRequest object.");
		else {
			if (context)
				this.context = context;
			this.xmlHttp = xmlHttp;
			this.src = src;
			this.func = func;
			this.ret = ret ? ret : "json"; //default return type is JSON
			this.method = method ? method : "POST"; //default method is POST
			this.async = async == false ? false : true; //default asynchronous flag is true
			this.debug = debug ? debug : false; //default debug flag (i.e. error report) is false

			if (this.method == "POST") {
				this.xmlHttp.open(this.method, this.src, this.async);
				this.xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			}
			else {
				this.xmlHttp.open(this.method, this.src + '?' + params, this.async);
				params = null;
			}

			if (this.async) {
				var self = this;
				this.xmlHttp.onreadystatechange = function () {
					self.callbackProcess.call(self);
				}
				this.xmlHttp.send(params);
			}
			else {
				this.xmlHttp.send(null);
				this.callbackProcess();
			}
		}
	}
}

SimpleXmlHttp.prototype.callbackProcess = function () {
	var err = "";
	var errFlag = 0;
	if (this.xmlHttp.readyState == 4) {
		if (this.xmlHttp.status == 200) {
			//alertt(this.xmlHttp.responseText);
			switch (this.ret) {
				case "text":
					this.func.call(this.context, this.xmlHttp.responseText)
					break;
				case "xml":
					this.func.call(this.context, this.xmlHttp.responseXML)
					break;
				case "json":
					try {
						var obj = eval('(' + this.xmlHttp.responseText + ')');
						this.func.call(this.context, obj);
					}
					catch (e) {
						errFlag = 1;
						err = e.toString();
					}
				default:
					break;
			}
		}
		else {
			errFlag = 1
			err = this.xmlHttp.statusText;
		}
		if (this.debug && err) this.debug.call(this.context, err)
	}
}

function QueueXmlHttp(context, src, func, ret, params, method, async, debug) {
	if (!src || !func)
		alert("Not Enogh Parameters.");
	else {
		var xmlHttp = null;
		if (window.ActiveXObject) {
			try { xmlHttp = new ActiveXObject("Microsoft.XMLHTTP"); }
			catch (e) { }
		}
		else {
			try { xmlHttp = new XMLHttpRequest(); }
			catch (e) { }
		}
		if (!xmlHttp)
			alert("Error creating the XMLHttpRequest object.");
		else {
			if (context)
				this.context = context;
			this.xmlHttp = xmlHttp;
			this.timeOut = 100;
			this.timer = null;
			this.cache = new Array();
			this.src = src;
			this.func = func;
			this.ret = ret ? ret : "json"; //default return type is JSON
			this.method = method ? method : "POST"; //default method is POST
			this.async = async ? async : true; //default asynchronous flag is true
			this.debug = debug ? debug : false; //default debug flag (i.e. error report) is false

			this.cache.push(params);
			this.process();
		}
	}
}

QueueXmlHttp.prototype.push = function (params) {
	this.cache.push(params);
}

QueueXmlHttp.prototype.stop = function (time) {
	if (!time) {
		window.clearTimeout(this.timer);
	}
	else {
		var self = this;
		window.setTimeout(function () { self.stop.call(self) }, time);
	}
}

QueueXmlHttp.prototype.process = function (src, func, ret, method, async, debug, norepeat) {
	if ((this.xmlHttp.readyState == 4 || this.xmlHttp.readyState == 0) && this.cache.length > 0) {
		var params = this.cache.shift();
		//alertt(params+"\n cache length: "+this.cache.length);
		//if (this.cache.length>5)
		//alertt("Achtung! Stack owerflow!!!");
		if (this.method == "POST") {
			this.xmlHttp.open(this.method, this.src, this.async);
			this.xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		}
		else {
			this.xmlHttp.open(this.method, this.src + '?' + params, this.async);
			params = null;
		}

		var self = this;
		this.xmlHttp.onreadystatechange = function () {
			self.callbackProcess.call(self);
		}
		this.xmlHttp.send(params);
	}
	var self = this;
	this.timer = window.setTimeout(function () { self.process.call(self) }, this.timeOut);
}

QueueXmlHttp.prototype.callbackProcess = function () {
	if (this.xmlHttp.readyState == 4) {
		var err = "";
		var errFlag = 0;
		if (this.xmlHttp.status == 200) {
			//alertt(this.xmlHttp.responseText);
			switch (this.ret) {
				case "text":
					this.func.call(this.context, this.xmlHttp.responseText)
					break;
				case "xml":
					this.func.call(this.context, this.xmlHttp.responseXML)
					break;
				case "json":
					try {
						var obj = eval('(' + this.xmlHttp.responseText + ')');
						this.func.call(this.context, obj);
					}
					catch (e) {
						errFlag = 1;
						err = e.toString();
					}
				default:
					break;
			}
		}
		else {
			errFlag = 1
			err = this.xmlHttp.statusText;
		}
		if (this.debug && err) this.debug.call(this.context, err)
	}
}
