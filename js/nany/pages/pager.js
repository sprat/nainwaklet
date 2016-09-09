var analyzer = require('./analyzer'),
    int = analyzer.int;

function analyze(js) {
    var regex = /miseajourpager\((.*)\);/ig,
        keys = 'pa,pv,pvbase,classeeven,evnonlu,classechat,mesgnonlu,posx,posy,IDS,newmonochat'.split(','),
        object = analyzer.buildObjectsFromJSSequences(js, regex, keys)[0];

    return {
        PA: int(object.pa),
        vie: int(object.pv),
        vieTotal: int(object.pvbase),
        position: [int(object.posx), int(object.posy)],
        messagesNonLus: int(object.mesgnonlu),
        nainxpressNonLu: object.newmonochat.indexOf('<b>') === 0
    };
}

module.exports = {
    analyze: analyze
};
