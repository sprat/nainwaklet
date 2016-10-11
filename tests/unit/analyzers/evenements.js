var test = require('tape-catch');
var analyzeEvenements = require('src/analyzers/evenements');
var parseHTMLDocument = require('../parse-html-document');
var evenHTML = require('../fixtures/even.html');
var evenDocument = parseHTMLDocument(evenHTML);
var now = new Date(1457780950000);

test('analyzeEvenements', function (assert) {
    var evenements = analyzeEvenements(evenDocument, now);

    //12h09 (sam. 12/03) xØu a pris un(e) Hache sur le sol.
    assert.deepEqual(evenements[0], {
        isNew: true,
        date: new Date('Sat Mar 12 2016 12:09:00 GMT+0100'),
        type: 50,
        parametres: { s1: 'xØu', s2: 'Hache', s3: '', n1: 0, n2: 0, n3: 0 },
        description: 'xØu a pris un(e) Hache sur le sol.',
        image: undefined
    }, 'evenement 1');

    //11h50 (sam. 12/03)  Tu as aperçu Neantnain en (16,4).
    assert.deepEqual(evenements[3], {
        isNew: false,
        date: new Date('Sat Mar 12 2016 11:50:00 GMT+0100'),
        type: 11,
        parametres: { s1: 'Neantnain', s2: '', s3: '', n1: 16, n2: 4, n3: 0},
        description: 'Tu as aperçu Neantnain en (16,4).',
        image: '/images/interface/evens/pas.gif'
    }, 'evenement 4');

    //10h50 (sam. 12/03) the punky 89 a posé un(e) Tractopelle.
    assert.deepEqual(evenements[6], {
        isNew: false,
        date: new Date('Sat Mar 12 2016 10:50:00 GMT+0100'),
        type: 57,
        parametres: { s1: 'the punky 89', s2: 'Tractopelle', s3: '', n1: 0, n2: 0, n3: 0},
        description: 'the punky 89 a posé un(e) Tractopelle.',
        image: undefined
    }, 'evenement 7');

    assert.end();
});
