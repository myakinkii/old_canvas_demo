function Demo()
{
this.size=650;
getTag('body').appendChild(crCanvas('canvas',this.size,this.size,[
							crText('Use better browser e.g '),
							crA('Opera','http://opera.com'),
							crText(', '),
							crA('FireFox','http://mozilla.org'),
							crText(', or '),
							crA('Safari','http://apple.com')
							]));

this.canvas=getId('canvas');
if (this.canvas.getContext)
this.init();
}

Demo.prototype.init=function()
{
this.id='conrtols';
this.ctx = this.canvas.getContext('2d');
this.time=0;
this.tf=1000;
this.center=this.size/2;
this.config={redraw:33,R:75,r:5,D:100,d:20,w1:10,w2:2,count:10,fill:1,
	    showLines:0,shape:1,angls:3,pulse:1,color:1,alpha:1,lw:1,clear:1}

this.redraw=33;
this.R=75;
this.r=5;
this.D=100;
this.d=20;
this.w1=10;
this.w2=2;
this.count=10;
this.tf=1000; //time freeze
this.fill=1;
this.showLines=0;
this.shape=1; //1 - circles; 0- triangles
this.angls=3;
this.pulse=1;
this.color=1;
this.alpha=1;
this.lw=1;
this.clear=1;

//delete psi,fi,x,y,x1,y1,r,red,green,blue,alpha,lw,i,j;
this.vars={psi:0,fi:0,x:0,y:0,x1:0,y1:0,r:0,red:0,green:0,blue:0,alpha:0,lw:0,i:0,j:0};

getTag('body').appendChild(
crDiv(this.id,'controls',[
        crDiv(null,'field',[
	    crText('Shape.'),crBR(),
	    crRadio('shape',1,{'onclick':this.change},this),
    	    crText('Circle'),
	    crRadio('shape',0,{'onclick':this.change},this),
    	    crText('Polyangle')
	]),
        crDiv(null,'field',[
	    crText('Angles'),
	    crInput(5,this.config.angls,'angls',null,{'onchange':this.change},this)
	]),
        crDiv(null,'field',[
	    crText('Show Lines'),
	    crCheck(this.config.showLines,'showLines',{'onclick':this.change},this)
	]),
        crDiv(null,'field',[
	    crText('Redraw rate (ms)'),
	    crInput(5,this.config.redraw,'redraw',null,{'onchange':this.change},this)
	]),
        crDiv(null,'field',[
	    crText('Greater Radius'),
	    crInput(5,this.config.R,'R',null,{'onchange':this.change},this)
	]),
        crDiv(null,'field',[
	    crText('Lesser Radius'),
	    crInput(5,this.config.r,'r',null,{'onchange':this.change},this)
	]),
        crDiv(null,'field',[
	    crText('Greater orbit'),
	    crInput(5,this.config.D,'D',null,{'onchange':this.change},this)
	]),
        crDiv(null,'field',[
	    crText('Lesser orbit'),
	    crInput(5,this.config.d,'d',null,{'onchange':this.change},this)
	]),
        crDiv(null,'field',[
	    crText('Omega1'),
	    crInput(5,this.config.w1,'w1',null,{'onchange':this.change},this)
	]),
        crDiv(null,'field',[
	    crText('Omega2'),
	    crInput(5,this.config.w2,'w2',null,{'onchange':this.change},this)
	]),
        crDiv(null,'field',[
	    crText('Shapes count'),
	    crInput(5,this.config.count,'count',null,{'onchange':this.change},this)
	]),
        crDiv(null,'field',[
	    crText('Draw style'),crBR(),
	    crRadio('fill',1,{'onclick':this.change},this),
    	    crText('Fill'),
	    crRadio('fill',0,{'onclick':this.change},this),
    	    crText('Stroke')
	]),
        crDiv(null,'field',[
	    crText('Pulse radius'),
	    crCheck(this.config.pulse,'pulse',{'onclick':this.change},this)
	]),
        crDiv(null,'field',[
	    crText('Color'),
	    crCheck(this.config.color,'color',{'onclick':this.change},this)
	]),
        crDiv(null,'field',[
	    crText('Alpha'),
	    crCheck(this.config.alpha,'alpha',{'onclick':this.change},this)
	]),
        crDiv(null,'field',[
	    crText('Lineweight'),
	    crCheck(this.config.lw,'lw',{'onclick':this.change},this)
	]),
        crDiv(null,'field',[
	    crText('Clear previous frames'),
	    crCheck(this.config.clear,'clear',{'onclick':this.change},this)
	]),
        crDiv(null,'field',[
	    crButton('Clear All',null,null,{'onclick':this.clearAll},this)
	])
    ])
);
this.regen=interval(this,this.anim,this.redraw);
}

Demo.prototype.change=function(e)
{
var id=e.target.id;
if (id=='showLines'||id=='pulse'||id=='color'||id=='alpha'||id=='lw'||id=='clear')
{
if (e.target.checked==true)
this[id]=1;
else
this[id]=0;
}
else

this[id]=parseInt(e.target.value);

if (id=='redraw')
{
clearInterval(this.regen);
this.regen=interval(this,this.anim,this.redraw);
}
}

Demo.prototype.clearAll=function()
{
this.ctx.clearRect(0,0,this.center*2,this.center*2); //clear previous frame
}

Demo.prototype.anim=function()
{
//alertt(this.time);
if (this.clear)
this.ctx.clearRect(0,0,this.center*2,this.center*2); //clear previous frame

for (var i=1;i<this.count+1;i++) //draw shapes again
{
var psi=2*Math.PI/this.w1/this.tf*this.time-Math.PI/2; //main circle angle
var fi=2*Math.PI/( this.w1-(this.w1-this.w2)/this.count*i) / this.tf*this.time - Math.PI/2; //radial shapes angle
var x=this.center+i/this.count*this.D*Math.cos(psi); //main circle center X
var y=this.center+i/this.count*this.D*Math.sin(psi); //main circle center Y
var x1 = x + this.d*(this.count+1-i)/this.count * Math.cos( fi); //radial shape center X
var y1 = y + this.d*(this.count+1-i)/this.count * Math.sin(fi);  //radial shape center Y

var r=this.R-(this.R-this.r)*i/this.count; //radial shape radius
if (this.pulse)
r*=(Math.pow(Math.sin(this.time/this.tf-i),2)+1);

/////////////////////////////Set Style//////////////////////////////
//this.setStyle(i);
if (this.alpha)
var alpha=(Math.sin(this.time/this.tf+i)+Math.cos(this.time/this.tf-i))/2+0.5;
else
var alpha=1;

if (this.color)
{
var red=Math.floor(Math.sin(this.time/this.tf-0.3*i)*255);
var green=Math.floor(Math.cos(this.time/this.tf-0.6*i)*255);
var blue=Math.floor(Math.cos(this.time/this.tf-i)*255);
}
else
{
var red=0;
var green=0;
var blue=0;
}

if (this.lw)
var lw=5*Math.pow(Math.sin(this.time/this.tf-i),2)+1;
else
var lw=2;

this.ctx.strokeStyle = 'rgba('+red+','+green+','+blue+','+alpha+')';
this.ctx.fillStyle = 'rgba('+red+','+green+','+blue+','+alpha+')';
this.ctx.lineWidth=lw;
this.ctx.save();

///////////////////////////////////////////////////////////////////////


////////////////////////////////Show Lines ///////////////////////////////////////
if (this.showLines)
//this.drawLines(x,y,x1,y1);
{
this.ctx.strokeStyle = 'rgb(0,0,0)';
this.ctx.lineWidth=1;

this.ctx.beginPath();
this.ctx.moveTo(this.center,this.center)
this.ctx.lineTo(x,y);
this.ctx.lineTo(x1,y1);
this.ctx.stroke();

this.ctx.restore();
}

///////////////////////////////////////////////////////////////////////

this.ctx.beginPath();
if (this.shape==1) //if circles
this.ctx.arc(x1,y1,r,0,Math.PI*2,1); //draw a circle
else
{ //or a polyangle
this.ctx.moveTo(x1+r*Math.cos(fi),y1+r*Math.sin(fi));
if (this.angls<0 || this.angls>25)
this.angls=3;
for (var j=1;j<this.angls;j++)
this.ctx.lineTo(x1+r*Math.cos(2*Math.PI/this.angls*j+fi),y1+r*Math.sin(2*Math.PI/this.angls*j+fi));
this.ctx.closePath();
}

if (this.fill)
this.ctx.fill();
else
this.ctx.stroke();
}

this.time+=this.redraw;
delete psi,fi,x,y,x1,y1,r,red,green,blue,alpha,lw,i,j;
}
