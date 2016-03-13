var test = require('tape-catch'),
    path = require('path'),
    fs = require('fs'),
    helpers = require('../helpers'),
    pages = require('../../lib/pages'),
    page = pages.byName('even'),
    html = fs.readFileSync(path.join(__dirname, '..', 'fixtures', 'even.html'), 'utf8'),
    doc = helpers.parseHTMLDocument(html),
    timestamp = 1457780950000;

test('even.analyze: evenements', function (assert) {
    var info = page.analyze(doc, timestamp);

    //12h09 (sam. 12/03) xØu a pris un(e) Hache sur le sol.
    assert.deepEqual(info.evenements[0], {
        isNew: true,
        date: 1457780940000,
        type: 50,
        parametres: { s1: 'xØu', s2: 'Hache', s3: '', n1: 0, n2: 0, n3: 0 },
        description: 'xØu a pris un(e) Hache sur le sol.',
        image: undefined
    });

    //11h50 (sam. 12/03)  Tu as aperçu Neantnain en (16,4).
    assert.deepEqual(info.evenements[3], {
        isNew: false,
        date: 1457779800000,
        type: 11,
        parametres: { s1: 'Neantnain', s2: '', s3: '', n1: 16, n2: 4, n3: 0},
        description: 'Tu as aperçu Neantnain en (16,4).',
        image: '/images/interface/evens/pas.gif'
    });

    //10h50 (sam. 12/03) the punky 89 a posé un(e) Tractopelle.
    assert.deepEqual(info.evenements[6], {
        isNew: false,
        date: 1457776200000,
        type: 57,
        parametres: { s1: 'the punky 89', s2: 'Tractopelle', s3: '', n1: 0, n2: 0, n3: 0},
        description: 'the punky 89 a posé un(e) Tractopelle.',
        image: undefined
    });

    assert.end();
});

test('even.analyze: pager', function (assert) {
    var info = page.analyze(doc, timestamp);

    assert.deepEqual(info.pager, {
        PA: 17,
        vie: 159,
        vieTotal: 159,
        position: [14, 7],
        messagesNonLus: 0,
        evenementsNonLus: false,
        chatNonLu: false
    });

    assert.end();
});