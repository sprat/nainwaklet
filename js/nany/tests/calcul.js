var test = require('tape-catch'),
    calcul = require('../calcul');


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

test('calcul.portee', function (assert) {
    assert.deepEqual(calcul.portee([12, 4], [12, 4]), 0, '0 case');
    assert.deepEqual(calcul.portee([12, 4], [12, 3]), 1, '1 case au-dessus');
    assert.deepEqual(calcul.portee([12, 4], [12, 5]), 1, '1 case au-dessous');
    assert.deepEqual(calcul.portee([12, 4], [11, 4]), 1, '1 case à gauche');
    assert.deepEqual(calcul.portee([12, 4], [13, 4]), 1, '1 case à droite');
    assert.deepEqual(calcul.portee([12, 4], [11, 5]), 1, '1 case en diagonale');

    assert.deepEqual(calcul.portee([12, 4], [14, 6]), 3, '2 cases diago = 3 cases');
    assert.deepEqual(calcul.portee([12, 4], [13, 7]), 3, '3 cases');

    assert.end();
});

test('calcul.deplacement', function (assert) {
    assert.deepEqual(calcul.deplacement([12, 4], [12, 4]), 0, '0 case');
    assert.deepEqual(calcul.deplacement([12, 4], [12, 3]), 1, '1 case au-dessus');
    assert.deepEqual(calcul.deplacement([12, 4], [12, 5]), 1, '1 case au-dessous');
    assert.deepEqual(calcul.deplacement([12, 4], [11, 4]), 1, '1 case à gauche');
    assert.deepEqual(calcul.deplacement([12, 4], [13, 4]), 1, '1 case à droite');
    assert.deepEqual(calcul.deplacement([12, 4], [11, 5]), 1, '1 case en diagonale');

    assert.deepEqual(calcul.deplacement([12, 4], [14, 6]), 2, '2 cases diago');
    assert.deepEqual(calcul.deplacement([12, 4], [13, 7]), 3, '3 cases');

    assert.end();
});

test('calcul.bonusObjets', function (assert) {
    var visee = {
        nom: 'Visée à poisson',
        forceBonus: -6,
        precisionBonus: 15,
        vieBonus: 0,
        intelligenceBonus: 0
    };

    var guitare = {
        nom: 'Guitare électrique Strato',
        forceBonus: 0,
        precisionBonus: 9,
        vieBonus: 5,
        intelligenceBonus: -10
    };

    assert.deepEqual(calcul.bonusObjets([]), {
        forceBonus: 0,
        precisionBonus: 0,
        vieBonus: 0,
        intelligenceBonus: 0
    }, 'empty list');

    assert.deepEqual(calcul.bonusObjets([visee]), {
        forceBonus: -6,
        precisionBonus: 15,
        vieBonus: 0,
        intelligenceBonus: 0
    }, '1 object');

    assert.deepEqual(calcul.bonusObjets([visee, guitare]), {
        forceBonus: -6,
        precisionBonus: 24,
        vieBonus: 5,
        intelligenceBonus: -10
    }, '2 objects');

    assert.end();
});
