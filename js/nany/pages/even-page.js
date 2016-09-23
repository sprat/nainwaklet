var Page = require('./page');
var Dom = require('../dom');
var Analyzer = require('./analyzer');
var Pager = require('./pager');
var EventInfo = require('./event-info');
var Urls = require('../urls');
var dateRegex = /(\d\d)h(\d\d) \(\w+\. (\d\d)\/(\d\d)\)/;
var int = Analyzer.int;

// return the unix timestamp for a date specified as '12h09 (sam. 12/03)' in GMT+1
function convertToUnixTimestamp(date, nowDate) {
    var match = dateRegex.exec(date);
    var year = nowDate.getFullYear();
    var month = int(match[4]);
    var day = int(match[3]);
    var hours = int(match[1]);
    var minutes = int(match[2]);

    // Note: we apply the GMT+1 offset to the date
    date = new Date(Date.UTC(year, month - 1, day, hours - 1, minutes));

    if (date.getTime() > nowDate.getTime()) {  // happy new year
        date.setUTCFullYear(date.getUTCFullYear() - 1);
    }

    return date;
}

function getDescription(type, params) {
    var desc = EventInfo.descriptions[type - 1];

    if (!desc) {
        return;
    }

    desc = desc.replace(/%s1/, params.s1);
    desc = desc.replace(/%s2/, params.s2);
    desc = desc.replace(/%s3/, params.s3);
    desc = desc.replace(/%n1/, params.n1);
    desc = desc.replace(/%n2/, params.n2);
    desc = desc.replace(/%n3/, params.n3);
    return desc;
}

function getImage(type) {
    var img = EventInfo.images[type - 1];

    if (!img) {
        return;
    }

    if (img.indexOf('.') === -1) {
        img += '.gif';
    }

    return Urls.getImageUrl('interface/evens/' + img);
}

function getEvenements(js, nowDate) {
    var regex = /ev\((.*)\);/ig;
    var keys = 'neweven,time,num,s1,s2,s3,n1,n2,n3,appel'.split(',');
    var objects = Analyzer.buildObjectsFromJSSequences(js, regex, keys);

    return objects.map(function (object) {
        var type = object.num;
        var params = {
            s1: object.s1,
            s2: object.s2,
            s3: object.s3,
            n1: object.n1,
            n2: object.n2,
            n3: object.n3
        };

        return {
            isNew: object.neweven == 1,
            type: type,
            date: convertToUnixTimestamp(object.time, nowDate),
            //appel: object.appel === 1,
            parametres: params,
            description: getDescription(type, params),
            image: getImage(type)
        };
    });
}

function analyze(doc, date, context) {
    var js = Dom.inlineJS(doc);
    var pager = Pager.analyze(js, context);

    context.evenements = getEvenements(js, date);

    return {
        evenements: context.evenements,
        pager: pager
    };
}

module.exports = Page('even', {
    analyze: analyze,
    fetchParameters: {
        duree: 240,
        type: 'ALL'
    }
});
