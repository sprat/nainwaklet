var test = require('tape-catch');
var code = require('src/analyzers/code');

test('code.getInlineJS', function (assert) {
    var source = "function myHelloWorld() { console.log('Hello world!'); }";
    var script = document.createElement('script');
    script.textContent = source;
    document.body.appendChild(script);

    var inlineJS = code.getInlineJS();
    assert.notEqual(inlineJS.indexOf(source), -1, 'inline javascript');

    document.body.removeChild(script);

    assert.end();
});
