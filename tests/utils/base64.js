define(['utils/base64'], function (base64) {
    'use strict';

    QUnit.module('utils/base64');

    QUnit.test('encode', function (assert) {
        assert.equal(base64.encode('test'), 'dGVzdA==');
        assert.equal(base64.encode('Mäpïé~bla'), 'TeRw7+l+Ymxh');
    });

    QUnit.test('encodeUrl', function (assert) {
        assert.equal(base64.encodeUrl('test'), 'dGVzdA');
        assert.equal(base64.encodeUrl('Mäpïé~bla'), 'TeRw7-l-Ymxh');
    });

    QUnit.test('decode', function (assert) {
        assert.equal(base64.decode('dGVzdA=='), 'test');
        assert.equal(base64.decode('TeRw7+l+Ymxh'), 'Mäpïé~bla');
    });

    QUnit.test('decodeUrl', function (assert) {
        assert.equal(base64.decodeUrl('dGVzdA'), 'test');
        assert.equal(base64.decodeUrl('TeRw7-l-Ymxh'), 'Mäpïé~bla');
    });
});