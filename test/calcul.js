var test = require('tape-catch'),
    calcul = require('../lib/calcul');


test('calcul.degats', function (assert) {
    var armeBourrin = {
            nom: 'Excalibur',
            portee: 0,
            dommages: 12
        },
        armeSniper = {
            nom: 'Arquebuse naine',
            portee: 2,
            dommages: 20
        },
        nain = {
            nom: 'NainNain',
            vie: 100,
            force: 80,
            precision: 300,
            intelligence: 100
        };

    assert.deepEqual(calcul.degats(nain, armeSniper), {
        minimum: 72,
        maximum: 80
    }, 'Dégâts sniper');

    assert.deepEqual(calcul.degats(nain, armeBourrin), {
        minimum: 18,
        maximum: 20
    }, 'Dégâts bourrin');

    assert.end();
});