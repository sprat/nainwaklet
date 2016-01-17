define(['utils/htmldocument', 'text!tests/fixtures/hello_world.html'], function (htmldocument, helloWorldHTML) {
    'use strict';

    QUnit.module('utils/htmldocument');

    function removeSpaces(string) {
        return string.replace(/[\n ]*/gm, '');
    }

    QUnit.test('parse', function (assert) {
        var doc = htmldocument.parse(helloWorldHTML),
            title = doc.title,
            h1 = doc.getElementsByTagName('h1')[0];

        assert.strictEqual(title, 'Hello World', 'Document title');
        assert.strictEqual(h1.innerHTML, 'Hello World', '<h1> text');
    });

    QUnit.test('serialize', function (assert) {
        var doc = htmldocument.parse(helloWorldHTML),
            html = htmldocument.serialize(doc);

        assert.strictEqual(removeSpaces(html), removeSpaces(helloWorldHTML),
                           'Roughly the same HTML');
    });
});