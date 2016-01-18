var test = require('tape-catch'),
    base64 = require('../../utils/base64');


test('base64: encode', function (assert) {
    assert.equal(base64.encode('test'), 'dGVzdA==');
    assert.equal(base64.encode('Mäpïé~bla'), 'TeRw7+l+Ymxh');
    assert.end();
});

test('base64: encodeUrl', function (assert) {
    assert.equal(base64.encodeUrl('test'), 'dGVzdA');
    assert.equal(base64.encodeUrl('Mäpïé~bla'), 'TeRw7-l-Ymxh');
    assert.end();
});

test('base64: decode', function (assert) {
    assert.equal(base64.decode('dGVzdA=='), 'test');
    assert.equal(base64.decode('TeRw7+l+Ymxh'), 'Mäpïé~bla');
    assert.end();
});

test('base64: decodeUrl', function (assert) {
    assert.equal(base64.decodeUrl('dGVzdA'), 'test');
    assert.equal(base64.decodeUrl('TeRw7-l-Ymxh'), 'Mäpïé~bla');
    assert.end();
});
