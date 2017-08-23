var test = require('tape-catch');
var nainwak = require('src/nainwak');

test('nainwak: degats', function (assert) {
    var armeBourrin = {
        nom: 'Excalibur',
        type: 'arme',
        portee: 0,
        dommages: 12
    };
    var armeSniper = {
        nom: 'Arquebuse naine',
        type: 'arme',
        portee: 2,
        dommages: 20
    };
    var rune = {
        nom: 'Visée à poisson',
        type: 'rune',
        portee: 0,
        dommages: 0
    };
    var mainCollante = {
        nom: 'Main collante de gosse',
        type: 'special',
        portee: 0,
        dommages: 0
    };
    var tarte = {
        nom: 'Tarte à la crème',
        type: 'arme',
        portee: 4,
        dommages: 0
    };
    var batteSpeciale = {
        nom: 'Batte de base-ball spéciale',
        type: 'arme',
        portee: 0,
        dommages: 0
    };
    var nain = {
        nom: 'NainNain',
        vie: 100,
        force: 80,
        precision: 300,
        intelligence: 100
    };

    assert.deepEqual(nainwak.degats(nain, armeSniper), {
        minimum: 72,
        maximum: 80
    }, 'dégâts arme sniper');

    assert.deepEqual(nainwak.degats(nain, armeBourrin), {
        minimum: 18,
        maximum: 20
    }, 'dégâts arme bourrin');

    assert.deepEqual(nainwak.degats(nain, rune), undefined, 'dégâts rune');
    assert.deepEqual(nainwak.degats(nain, mainCollante), undefined, 'dégâts main collante');
    assert.deepEqual(nainwak.degats(nain, tarte), undefined, 'dégâts tarte');
    assert.deepEqual(nainwak.degats(nain, batteSpeciale), undefined, 'dégâts batte spéciale');

    assert.end();
});

test('nainwak: portee', function (assert) {
    assert.deepEqual(nainwak.portee([12, 4], [12, 4]), 0, '0 case');
    assert.deepEqual(nainwak.portee([12, 4], [12, 3]), 1, '1 case au-dessus');
    assert.deepEqual(nainwak.portee([12, 4], [12, 5]), 1, '1 case au-dessous');
    assert.deepEqual(nainwak.portee([12, 4], [11, 4]), 1, '1 case à gauche');
    assert.deepEqual(nainwak.portee([12, 4], [13, 4]), 1, '1 case à droite');
    assert.deepEqual(nainwak.portee([12, 4], [11, 5]), 1, '1 case en diagonale');

    assert.deepEqual(nainwak.portee([12, 4], [14, 6]), 3, '2 cases diago = 3 cases');
    assert.deepEqual(nainwak.portee([12, 4], [13, 7]), 3, '3 cases');

    assert.end();
});

test('nainwak: deplacement', function (assert) {
    assert.deepEqual(nainwak.deplacement([12, 4], [12, 4]), 0, '0 case');
    assert.deepEqual(nainwak.deplacement([12, 4], [12, 3]), 1, '1 case au-dessus');
    assert.deepEqual(nainwak.deplacement([12, 4], [12, 5]), 1, '1 case au-dessous');
    assert.deepEqual(nainwak.deplacement([12, 4], [11, 4]), 1, '1 case à gauche');
    assert.deepEqual(nainwak.deplacement([12, 4], [13, 4]), 1, '1 case à droite');
    assert.deepEqual(nainwak.deplacement([12, 4], [11, 5]), 1, '1 case en diagonale');

    assert.deepEqual(nainwak.deplacement([12, 4], [14, 6]), 2, '2 cases diago');
    assert.deepEqual(nainwak.deplacement([12, 4], [13, 7]), 3, '3 cases');

    assert.end();
});

test('nainwak: bonusObjets', function (assert) {
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

    assert.deepEqual(nainwak.bonusObjets([]), {
        forceBonus: 0,
        precisionBonus: 0,
        vieBonus: 0,
        intelligenceBonus: 0
    }, 'aucun objet');

    assert.deepEqual(nainwak.bonusObjets([visee]), {
        forceBonus: -6,
        precisionBonus: 15,
        vieBonus: 0,
        intelligenceBonus: 0
    }, '1 objet');

    assert.deepEqual(nainwak.bonusObjets([visee, guitare]), {
        forceBonus: -6,
        precisionBonus: 24,
        vieBonus: 5,
        intelligenceBonus: -10
    }, '2 objets');

    assert.end();
});
