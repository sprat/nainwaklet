var test = require('tape-catch');
var parseHTMLDocument = require('../parse-html-document');
var pages = require('src/pages');
var detectPage = pages.byType('detect');
var html = require('../fixtures/detect.html');
var doc = parseHTMLDocument(html);
var now = new Date(1457780950000);

test('detectPage.analyze: localisation', function (assert) {
    var info = detectPage.analyze(doc, now, {});

    assert.deepEqual(info.detection.position, [13, 5], 'Position');
    assert.strictEqual(info.detection.monde, 'Monde des sadiques', 'Monde');

    assert.end();
});

test('detectPage.analyze: nains', function (assert) {
    var info = detectPage.analyze(doc, now, {});
    var nains = info.detection.nains;

    assert.strictEqual(nains.length, 3, 'Nombre de nains');

    // ["33966", "avatar_guilde/41ddb8ad2c2be408e27352accf1cc0b6559466bb.png", "Le PheniX", '[Gnouille] [<span style="color:#91005D;">#!</span>]', "13799", "2", "Diablotin(e)", "0", "13", "5", "&quot;Le PheniX est un oiseau qui symbolise l&#039;immortalité et la résurrection.&quot; A quoi bon me tuer ?!?", "o", "o", "0"];
    assert.deepEqual(nains[0], {
        id: 33966,
        nom: 'Le PheniX',
        image: '/images/avatar_guilde/41ddb8ad2c2be408e27352accf1cc0b6559466bb.png',
        description: "\"Le PheniX est un oiseau qui symbolise l'immortalité et la résurrection.\" A quoi bon me tuer ?!?",
        position: [13, 5],
        classe: 'sadique',
        rang: 'Diablotin(e)',
        barbe: 137.99,
        tag: {
            guilde: {
                nom: '#!',
                couleur: '#91005D'
            },
            perso: 'Gnouille',
            type: 3
        },
        attaquable: true,
        autreAction: 'gifler',
        estCible: false
    }, 'Nain 1');

    // ["33924", "avatar/perso/dab064da974199a53f0e22527f901d523e8869b3.png", "Nainkomp'", '[Perso]', "10314", "2", "Cancre (nain-culte)", "1", "14", "5", "Description", "o", "", "1"];
    assert.deepEqual(nains[1], {
        id: 33924,
        nom: "Nainkomp'",
        image: '/images/avatar/perso/dab064da974199a53f0e22527f901d523e8869b3.png',
        description: 'Description',
        position: [14, 5],
        classe: 'sadique',
        rang: 'Cancre (nain-culte)',
        barbe: 103.14,
        tag: {
            perso: 'Perso'
        },
        attaquable: true,
        autreAction: undefined,
        estCible: true
    }, 'Nain 2');

    // ["71985", "avatar/choix/TOsmuf4.gif", "Bimme65", '', "0", "3", "Rampant Nain-déci", "2", "13", "6", "Bimme65", "", "", "0"];
    assert.deepEqual(nains[2], {
        id: 71985,
        nom: 'Bimme65',
        image: '/images/avatar/choix/TOsmuf4.gif',
        description: 'Bimme65',
        position: [13, 6],
        classe: 'rampant',
        rang: 'Rampant Nain-déci',
        barbe: 0,
        tag: {},
        attaquable: false,
        autreAction: undefined,
        estCible: false
    }, 'Nain 3');

    assert.end();
});

test('detectPage.analyze: objets', function (assert) {
    var info = detectPage.analyze(doc, now, {});
    var objets = info.detection.objets;

    assert.strictEqual(objets.length, 3, "Nombre d'objets");

    // [3613899, "objets/jouetkinder2_2.gif", "Surprise de Kine d&#039;Heure", 1, 13, 6, "INUTILE", 1271419];
    assert.deepEqual(objets[0], {
        id: 3613899,
        nom: "Surprise de Kine d'Heure",
        image: '/images/objets/jouetkinder2_2.gif',
        type: 'inutile',
        position: [13, 6],
        poussiere: 1271419
    }, 'Objet 1');

    //tabobjet[2] = [3613897, "objets/banane_sauteuse.gif", "Banane sauteuse", 1, 13, 6, "VEHICULE", 1271419];
    assert.deepEqual(objets[1], {
        id: 3613897,
        nom: 'Banane sauteuse',
        image: '/images/objets/banane_sauteuse.gif',
        type: 'vehicule',
        position: [13, 6],
        poussiere: 1271419
    }, 'Objet 2');

    //tabobjet[3] = [3613896, "objets/naindiana.gif", "Panoplie de Naindiana Jones", 2, 13, 7, "RUNE", 1271419];
    assert.deepEqual(objets[2], {
        id: 3613896,
        nom: 'Panoplie de Naindiana Jones',
        image: '/images/objets/naindiana.gif',
        type: 'rune',
        position: [13, 7],
        poussiere: 1271419
    }, 'Objet 3');

    assert.end();
});

test('detectPage.analyze: pager', function (assert) {
    var info = detectPage.analyze(doc, now, {});
    assert.notStrictEqual(info.pager, undefined);
    assert.end();
});
