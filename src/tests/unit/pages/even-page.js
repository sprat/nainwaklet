var test = require('tape-catch');
var helpers = require('../helpers');
var pages = require('../../../pages');
var evenPage = pages.byType('even');
var html = require('../fixtures/even.html');
var doc = helpers.parseHTMLDocument(html);
var now = new Date(1457780950000);

test('evenPage.analyze: evenements', function (assert) {
    var info = evenPage.analyze(doc, now, {});

    //12h09 (sam. 12/03) xØu a pris un(e) Hache sur le sol.
    assert.deepEqual(info.evenements[0], {
        isNew: true,
        date: new Date('Sat Mar 12 2016 12:09:00 GMT+0100'),
        type: 50,
        parametres: { s1: 'xØu', s2: 'Hache', s3: '', n1: 0, n2: 0, n3: 0 },
        description: 'xØu a pris un(e) Hache sur le sol.',
        image: undefined
    });

    //11h50 (sam. 12/03)  Tu as aperçu Neantnain en (16,4).
    assert.deepEqual(info.evenements[3], {
        isNew: false,
        date: new Date('Sat Mar 12 2016 11:50:00 GMT+0100'),
        type: 11,
        parametres: { s1: 'Neantnain', s2: '', s3: '', n1: 16, n2: 4, n3: 0},
        description: 'Tu as aperçu Neantnain en (16,4).',
        image: '/images/interface/evens/pas.gif'
    });

    //10h50 (sam. 12/03) the punky 89 a posé un(e) Tractopelle.
    assert.deepEqual(info.evenements[6], {
        isNew: false,
        date: new Date('Sat Mar 12 2016 10:50:00 GMT+0100'),
        type: 57,
        parametres: { s1: 'the punky 89', s2: 'Tractopelle', s3: '', n1: 0, n2: 0, n3: 0},
        description: 'the punky 89 a posé un(e) Tractopelle.',
        image: undefined
    });

    assert.end();
});

test('evenPage.analyze: pager', function (assert) {
    var info = evenPage.analyze(doc, now, {});

    // miseajourpager('17', '159', '159', 'evenpagerlu', '?', 'chatpagernonlu', '2', '14', '7', 'e48d22f62e941a14eb927c8f9d36c6b2', '<b>NainXpress</b>');
    assert.deepEqual(info.pager, {
        PA: 17,
        vie: 159,
        vieTotal: 159,
        position: [14, 7],
        messagesNonLus: 2,
        nainxpressNonLu: true
    });

    assert.end();
});
