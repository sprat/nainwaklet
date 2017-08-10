var styles = require('./contour.css');

function Contour(h, color) {
    function frame(content, style) {
        return h('table', { class: ['coul_' + color, styles.contourFrame, style] }, content);
    }

    function lightBlock(content, style) {
        return h('tr', [
            h('td', { class: ['bande_v', 'VN'] }),
            h('td', { class: ['news-text', style] }, content),
            h('td', { class: ['bande_v', 'NV'] })
        ]);
    }

    function darkBlock(content, style) {
        return h('tr', [
            h('td', { class: ['bande_v', 'VT'] }),
            h('td', { class: ['news-titre', style] }, content),
            h('td', { class: ['bande_v', 'TV'] })
        ]);
    }

    function lightTop() {
        return h('tr', [
            h('td', { class: ['angle', 'VNVV_VNNV'] }),
            h('td', { class: ['bande_h', 'VVN'] }),
            h('td', { class: ['angle', 'VVNV_VVNN'] })
        ]);
    }

    function darkTop() {
        return h('tr', [
            h('td', { class: ['angle', 'VTVV_VNNV'] }),
            h('td', { class: ['bande_h', 'VTN'] }),
            h('td', { class: ['angle', 'VVTV_VVNN'] })
        ]);
    }

    function lightBottom() {
        return h('tr', [
            h('td', { class: ['angle', 'NVVV_NNVV'] }),
            h('td', { class: ['bande_h', 'VVN'] }),
            h('td', { class: ['angle', 'VVVN_NVVN'] })
        ]);
    }

    function lightToDark() {
        return h('tr', [
            h('td', { class: ['angle', 'NTVV_NVNV'] }),
            h('td', { class: ['bande_h', 'VTV'] }),
            h('td', { class: ['angle', 'VVTN_NVNV'] })
        ]);
    }

    function darkToLight() {
        return h('tr', [
            h('td', { class: ['angle', 'TNVV_NVNV'] }),
            h('td', { class: ['bande_h', 'TVV'] }),
            h('td', { class: ['angle', 'VVNT_NVNV'] })
        ]);
    }

    function lightToLightBorder() {
        return h('tr', [
            h('td', { class: ['angle', 'NNVV_NNNV'] }),
            h('td', { class: ['bande_h', 'VVN'] }),
            h('td', { class: ['angle', 'VVNN_NVNN'] })
        ]);
    }

    function lightToDarkBorder() {
        return h('tr', [
            h('td', { class: ['angle', 'NTVV_NNNV'] }),
            h('td', { class: ['bande_h', 'VTN'] }),
            h('td', { class: ['angle', 'VVTN_NVNN'] })
        ]);
    }

    return {
        frame: frame,
        lightBlock: lightBlock,
        darkBlock: darkBlock,
        lightTop: lightTop,
        darkTop: darkTop,
        lightBottom: lightBottom,
        lightToDark: lightToDark,
        darkToLight: darkToLight,
        lightToLightBorder: lightToLightBorder,
        lightToDarkBorder: lightToDarkBorder
    };
}

// Contour colors
Contour.Accueil = Contour.Yellow = 0;
Contour.Brave = Contour.Blue = 1;
Contour.Sadique = Contour.Red = 2;
Contour.Rampant = Contour.Green = 3;
Contour.Halloween = Contour.Orange = 4;
Contour.Pacific = Contour.Pink = 5;
Contour.SaintPatrick = Contour.DarkGreen = 6;
Contour.Mutant = Contour.Purple = 7;
Contour.Noir = 8;

module.exports = Contour;
