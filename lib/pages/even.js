var Page = require('./page'),
    analyzer = require('./analyzer'),
    evenInfo = require('./even-info'),
    urls = require('../urls'),
    dateRegex = /(\d\d)h(\d\d) \(\w+\. (\d\d)\/(\d\d)\)/;

function toTimestamp(year, month, day, hours, minutes, seconds, milliseconds, tz) {
    // convert the date to ISO-8601 format
    // note: the parameters should be strings with 0 padding
    return Date.parse('' + year + '-' + month + '-' + day + 'T'
        + hours + ':' + minutes + ':' + seconds + '.' + milliseconds + tz);
}

// return the unix timestamp for a date specified as '12h09 (sam. 12/03)' in GMT+1
function convertToUnixTimestamp(date, now) {
    var match = dateRegex.exec(date),
        year = (new Date(now)).getFullYear(),
        month = match[4],
        day = match[3],
        hours = match[1],
        minutes = match[2];

    date = toTimestamp(year, month, day, hours, minutes, '00', '000', '+01:00');
    if (date > now) {  // happy new year
        date = toTimestamp(year - 1, month, day, hours, minutes, '00', '000', '+01:00');
    }

    return date;
}

function getDescription(type, params) {
    var desc = evenInfo.descriptions[type - 1];

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
    var img = evenInfo.images[type - 1];

    if (!img) {
        return;
    }

    if (img.indexOf('.') === -1) {
        img += '.gif';
    }

    return urls.getImageUrl('interface/evens/' + img);
}

function getEvenements(js, now) {
    var regex = /ev\((.*)\);/ig,
        keys = 'neweven,time,num,s1,s2,s3,n1,n2,n3,appel'.split(','),
        objects = analyzer.buildObjectsFromJSSequences(js, regex, keys);

    return objects.map(function (object) {
        var type = object.num,
            params = {
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
            date: convertToUnixTimestamp(object.time, now),
            //appel: object.appel === 1,
            parametres: params,
            description: getDescription(type, params),
            image: getImage(type)
        };
    });
}

function analyze(doc, now) {
    var js = analyzer.getScriptsCode(doc),
        evenements = getEvenements(js, now),
        pager = analyzer.getPager(js);

    return Object.freeze({
        evenements: evenements,
        pager: pager
    });
}

module.exports = Page('even', analyze, {
    duree: 240,
    type: 'ALL'
});
