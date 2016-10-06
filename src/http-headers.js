function parseDate(string) {
    var date = new Date(string);

    // is it a a valid date?
    if (isNaN(date.getTime())) {
        return;
    }

    return date;
}

function getDate(headers) {
    return parseDate(headers['date']);  // assume lowercase, as returned by parse-headers
}

function getRetryAfter(headers) {
    var date = getDate(headers) || new Date();
    var retryAfter = headers['retry-after'];  // assume lowercase, as returned by parse-headers
    var seconds = parseInt(retryAfter, 10);

    // is it an integer?
    if (String(seconds) === retryAfter) {
        date.setSeconds(date.getSeconds() + seconds);
        return date;
    }

    // then, it should be a date
    return parseDate(retryAfter);
}

module.exports = {
    getRetryAfter: getRetryAfter
};
