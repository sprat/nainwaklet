var test = require('tape'),
    htmldocument = require('../../utils/htmldocument'),
    path = require('path'),
    fs = require('fs'),
    helloWorldHTML = fs.readFileSync(path.join(__dirname, '..', 'fixtures', 'hello_world.html'), 'utf8');


function removeSpaces(string) {
    return string.replace(/[\n ]*/gm, '');
}

test('htmldocument: parse', function (assert) {
    var doc = htmldocument.parse(helloWorldHTML),
        title = doc.title,
        h1 = doc.getElementsByTagName('h1')[0];

    assert.strictEqual(title, 'Hello World', 'Document title');
    assert.strictEqual(h1.innerHTML, 'Hello World', '<h1> text');
    assert.end();
});

test('htmldocument: serialize', function (assert) {
    var doc = htmldocument.parse(helloWorldHTML),
        html = htmldocument.serialize(doc);

    assert.strictEqual(removeSpaces(html), removeSpaces(helloWorldHTML),
                       'Roughly the same HTML');
    assert.end();
});
