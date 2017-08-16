var styles = require('./contour.css');

function frame(h, color, content, style) {
    var classes = {};
    for (var c=0; c<9; ++c) {
        classes['coul_' + c] = (c === color);
    }
    return h('table', { class: [styles.contourFrame, style], classes: classes }, content);
}

function lightBlock(h, content, style) {
    return h('tr', [
        h('td', { class: ['bande_v', 'VN'] }),
        h('td', { class: ['news-text', style] }, content),
        h('td', { class: ['bande_v', 'NV'] })
    ]);
}

function darkBlock(h, content, style) {
    return h('tr', [
        h('td', { class: ['bande_v', 'VT'] }),
        h('td', { class: ['news-titre', style] }, content),
        h('td', { class: ['bande_v', 'TV'] })
    ]);
}

function lightTop(h) {
    return h('tr', [
        h('td', { class: ['angle', 'VNVV_VNNV'] }),
        h('td', { class: ['bande_h', 'VVN'] }),
        h('td', { class: ['angle', 'VVNV_VVNN'] })
    ]);
}

function darkTop(h) {
    return h('tr', [
        h('td', { class: ['angle', 'VTVV_VNNV'] }),
        h('td', { class: ['bande_h', 'VTN'] }),
        h('td', { class: ['angle', 'VVTV_VVNN'] })
    ]);
}

function lightBottom(h) {
    return h('tr', [
        h('td', { class: ['angle', 'NVVV_NNVV'] }),
        h('td', { class: ['bande_h', 'VVN'] }),
        h('td', { class: ['angle', 'VVVN_NVVN'] })
    ]);
}

function lightToDark(h) {
    return h('tr', [
        h('td', { class: ['angle', 'NTVV_NVNV'] }),
        h('td', { class: ['bande_h', 'VTV'] }),
        h('td', { class: ['angle', 'VVTN_NVNV'] })
    ]);
}

function darkToLight(h) {
    return h('tr', [
        h('td', { class: ['angle', 'TNVV_NVNV'] }),
        h('td', { class: ['bande_h', 'TVV'] }),
        h('td', { class: ['angle', 'VVNT_NVNV'] })
    ]);
}

function lightToLightBorder(h) {
    return h('tr', [
        h('td', { class: ['angle', 'NNVV_NNNV'] }),
        h('td', { class: ['bande_h', 'VVN'] }),
        h('td', { class: ['angle', 'VVNN_NVNN'] })
    ]);
}

function lightToDarkBorder(h) {
    return h('tr', [
        h('td', { class: ['angle', 'NTVV_NNNV'] }),
        h('td', { class: ['bande_h', 'VTN'] }),
        h('td', { class: ['angle', 'VVTN_NVNN'] })
    ]);
}

module.exports = {
    frame: frame,
    lightBlock: lightBlock,
    darkBlock: darkBlock,
    lightTop: lightTop,
    darkTop: darkTop,
    lightBottom: lightBottom,
    lightToDark: lightToDark,
    darkToLight: darkToLight,
    lightToLightBorder: lightToLightBorder,
    lightToDarkBorder: lightToDarkBorder,

    // Colors
    Brown: 0,  // Nain-déci
    Blue: 1,  // Brave
    Red: 2,  // Sadique
    Green: 3,  // Rampant
    Orange: 4,
    Pink: 5,
    DarkGreen: 6,
    Purple: 7,  // Mutant
    Black: 8
};
