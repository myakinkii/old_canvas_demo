function Main() {
    try {
        includeJs('./render.js');
        includeJs('./Demo.js');
        var demo = new Demo();
    }
    catch (e) {
        alert(e.message);
    }
}
