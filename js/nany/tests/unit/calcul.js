var test = require('tape-catch');
var Calcul = require('../../calcul');

test('Calcul.degats', function (assert) {
    var armeBourrin = {
        nom: 'Excalibur',
        portee: 0,
        dommages: 12
    };
    var armeSniper = {
        nom: 'Arquebuse naine',
        portee: 2,
        dommages: 20
    };
    var nain = {
        nom: 'NainNain',
        vie: 100,
        force: 80,
        precision: 300,
        intelligence: 100
    };

    assert.deepEqual(Calcul.degats(nain, armeSniper), {
        minimum: 72,
        maximum: 80
    }, 'Dégâts sniper');

    assert.deepEqual(Calcul.degats(nain, armeBourrin), {
        minimum: 18,
        maximum: 20
    }, 'Dégâts bourrin');

    assert.end();
});

test('Calcul.portee', function (assert) {
    assert.deepEqual(Calcul.portee([12, 4], [12, 4]), 0, '0 case');
    assert.deepEqual(Calcul.portee([12, 4], [12, 3]), 1, '1 case au-dessus');
    assert.deepEqual(Calcul.portee([12, 4], [12, 5]), 1, '1 case au-dessous');
    assert.deepEqual(Calcul.portee([12, 4], [11, 4]), 1, '1 case à gauche');
    assert.deepEqual(Calcul.portee([12, 4], [13, 4]), 1, '1 case à droite');
    assert.deepEqual(Calcul.portee([12, 4], [11, 5]), 1, '1 case en diagonale');

    assert.deepEqual(Calcul.portee([12, 4], [14, 6]), 3, '2 cases diago = 3 cases');
    assert.deepEqual(Calcul.portee([12, 4], [13, 7]), 3, '3 cases');

    assert.end();
});

test('Calcul.deplacement', function (assert) {
    assert.deepEqual(Calcul.deplacement([12, 4], [12, 4]), 0, '0 case');
    assert.deepEqual(Calcul.deplacement([12, 4], [12, 3]), 1, '1 case au-dessus');
    assert.deepEqual(Calcul.deplacement([12, 4], [12, 5]), 1, '1 case au-dessous');
    assert.deepEqual(Calcul.deplacement([12, 4], [11, 4]), 1, '1 case à gauche');
    assert.deepEqual(Calcul.deplacement([12, 4], [13, 4]), 1, '1 case à droite');
    assert.deepEqual(Calcul.deplacement([12, 4], [11, 5]), 1, '1 case en diagonale');

    assert.deepEqual(Calcul.deplacement([12, 4], [14, 6]), 2, '2 cases diago');
    assert.deepEqual(Calcul.deplacement([12, 4], [13, 7]), 3, '3 cases');

    assert.end();
});

test('Calcul.bonusObjets', function (assert) {
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

    assert.deepEqual(Calcul.bonusObjets([]), {
        forceBonus: 0,
        precisionBonus: 0,
        vieBonus: 0,
        intelligenceBonus: 0
    }, 'empty list');

    assert.deepEqual(Calcul.bonusObjets([visee]), {
        forceBonus: -6,
        precisionBonus: 15,
        vieBonus: 0,
        intelligenceBonus: 0
    }, '1 object');

    assert.deepEqual(Calcul.bonusObjets([visee, guitare]), {
        forceBonus: -6,
        precisionBonus: 24,
        vieBonus: 5,
        intelligenceBonus: -10
    }, '2 objects');

    assert.end();
});
