function analyze(tagHtml) {
    var noBracketsTag = tagHtml.replace(/\] \[|\[|\]/g, '');
    var guildeRegex = /<span\s+style=\"color:(#[0-9A-F]{6});\">([^<]*)<\/span>/i;
    var guilde = '';
    var result = {};

    // find the guilde and perso elements
    var perso = noBracketsTag.replace(guildeRegex, function(match, couleur, nom) {
        guilde = match;
        result.guilde = {
            nom: nom,
            couleur: couleur
        };
        return '';
    });

    if (perso) {
        result.perso = perso;
    }

    /*
     * type values:
     * 1: [PersoGuilde]
     * 2: [GuildePerso]
     * 3: [Perso][Guilde]
     * 4: [Guilde][Perso]
     */
    if (perso && guilde) {
        switch (tagHtml) {
        case '[' + perso + guilde + ']':
            result.type = 1;
            break;
        case '[' + guilde + perso + ']':
            result.type = 2;
            break;
        case '[' + perso + '][' + guilde + ']':
        case '[' + perso + '] [' + guilde + ']':
            result.type = 3;
            break;
        case '[' + guilde + '][' + perso + ']':
        case '[' + guilde + '] [' + perso + ']':
            result.type = 4;
            break;
        }
    }

    return result;
}

module.exports = {
    analyze: analyze
};
