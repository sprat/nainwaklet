var test = require('tape-catch');
var int = require('src/analyzers/int');

test('int', function (assert) {
    assert.strictEqual(int('0'), 0, '0 as string');
    assert.strictEqual(int(0), 0, '0 as integer');
    assert.strictEqual(int('10'), 10, '10 as string');
    assert.strictEqual(int(10), 10, '10 as integer');
    assert.strictEqual(int('???'), undefined, 'non-integer string');
    assert.strictEqual(int('10 people'), undefined, 'string with integer plus some junk');
    assert.end();
});
