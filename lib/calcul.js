function degats(nain, arme) {
    var competence = (arme.portee > 0) ? nain.precision : nain.force,
        dommages = arme.dommages,
        baseDegats = (competence + 80) * dommages;

    return {
        minimum: Math.round(baseDegats / 105),
        maximum: Math.round(baseDegats / 95)
        //critiqueMin: Math.round(dommages * (1 + competence/105) * 4.75),
        //critiqueMax: Math.round(dommages * (1 + competence/95) * 4.75)
    };
}

module.exports = {
    degats: degats
};