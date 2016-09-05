/*
 * Calcule les dégâts d'une arme en fonction des caractéristiques du nain
 */
function degats(perso, arme) {
    var competence = (arme.portee > 0) ? perso.precision : perso.force,
        dommages = arme.dommages,
        baseDegats = (competence + 80) * dommages / 100;

    return {
        minimum: Math.round(baseDegats * 0.95),  // -5%
        maximum: Math.round(baseDegats * 1.05)  // +5%
        //critiqueMin: Math.round(dommages * (1 + competence/105) * 4.75),
        //critiqueMax: Math.round(dommages * (1 + competence/95) * 4.75)
    };
}

function offset(point1, point2) {
    var x = Math.abs(point1[0] - point2[0]),
        y = Math.abs(point1[1] - point2[1]);
    return [x, y];
}

/*
 * Calcule la distance entre 2 points en terme de "portée", c'est-à-dire pour
 * les armes, mains collantes, etc.
 */
function portee(point1, point2) {
    var dep = offset(point1, point2);
    return Math.round(Math.sqrt(dep[0]*dep[0] + dep[1]*dep[1]));
}

/*
 * Calcule la distance entre 2 points en terme de "déplacements", c'est-à-dire
 * le nombre de déplacements à faire pour aller d'un point à l'autre.
 */
function deplacement(point1, point2) {
    var dep = offset(point1, point2);
    return Math.max(dep[0], dep[1]);
}

module.exports = {
    degats: degats,
    portee: portee,
    deplacement: deplacement
};