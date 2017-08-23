var test = require('tape-catch');
var httpHeaders = require('src/utilities/http-headers');

test('utilities/http-headers: getDate', function (assert) {
    assert.strictEqual(
        httpHeaders.getDate({}),
        undefined,
        'no date'
    );

    assert.strictEqual(
        httpHeaders.getDate({
            'date': 'Thu, 06 Oct 2016 09:00:00 GMT'
        }).toISOString(),
        new Date('2016-10-06T09:00:00Z').toISOString(),
        'with date'
    );

    assert.end();
});

test('utilities/http-headers: getRetryAfter', function (assert) {
    assert.strictEqual(
        httpHeaders.getRetryAfter({}),
        undefined,
        'no retry-after'
    );

    assert.strictEqual(
        httpHeaders.getRetryAfter({
            'retry-after': 'Thu, 06 Oct 2016 09:01:00 GMT'
        }).toISOString(),
        new Date('2016-10-06T09:01:00Z').toISOString(),
        'date retry-after'
    );

    assert.strictEqual(
        httpHeaders.getRetryAfter({
            'date': 'Thu, 06 Oct 2016 09:00:00 GMT',
            'retry-after': '60'
        }).toISOString(),
        new Date('2016-10-06T09:01:00Z').toISOString(),
        'integer retry-after'
    );

    assert.end();
});
