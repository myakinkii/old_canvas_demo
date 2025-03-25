function Main()
{
try
{
includeJs('./Demo.js');
this.mech=new Demo();
}
catch(e)
{
alert(e.message);
}
}
