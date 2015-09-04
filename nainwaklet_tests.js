/*global
    QUnit
 */

(function () {
    "use strict";

    var test = QUnit.test;

    test("test 1", function (assert) {
        var v = 1;
        assert.ok(v === 1, "v should be equal to 1");
    });

    test("test 2", function (assert) {
        var v = 2;
        assert.ok(v === 1, "v should be equal to 1");
    });

    test("test 3", function (assert) {
        console.log(Nainwaklet.pages);
        assert.ok(Nainwaklet.pages, "Nainwaklet should have pages");
    });
}());