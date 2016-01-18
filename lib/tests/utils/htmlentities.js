var test = require('tape');
var htmlentities = require('../../utils/htmlentities');


test('htmlentities: encode', function (assert) {
    var result = htmlentities.encode('Entity & <script>a=42</script>');

    assert.equal('Entity &amp; &lt;script&gt;a=42&lt;/script&gt;', result,
        'Encode HTML entities');
    assert.equal(undefined, window.a,
        'Does not execute script');

    assert.end();
});

test('htmlentities: decode', function (assert) {
    var result = htmlentities.decode('Entity &amp; <script>a=42</script>');

    assert.equal('Entity & <script>a=42</script>', result,
        'Decode HTML entities');
    assert.equal(undefined, window.a,
        'Does not execute script');

    assert.end();
});
