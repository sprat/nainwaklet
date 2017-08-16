function createPerso() {
    return {
        nom: 'Palme',
        image: '/images/avatar_guilde/fade976ec961a21e13af618e54476d1a5c285d7a.png',
        rang: 'Ami(e) des nains-béciles (des bêtes)',
        classe: 1,
        barbe: 68.06,
        description: "Quitte à taper un petit level, tapez Rêveur ! Gagnant de la palme d'or du meilleur nom de nain.",
        arme: 'Tuba',
        tag: {
            guilde: {
                nom: 'Gorgones',
                couleur: '#DA6400'
            },
            perso: 'Hosse',
            type: 1
        },
        vie: 138,
        vieBase: 109,
        vieBonus: 39,
        get vieTotal() {
            return this.vieBase + this.vieBonus;
        },
        forceBase: 31,
        forceBonus: -27,
        get force() {
            return this.forceBase + this.forceBonus;
        },
        precisionBase: 310,
        precisionBonus: 0,
        get precision() {
            return this.precisionBase + this.precisionBonus;
        },
        intelligenceBase: 90,
        intelligenceBonus: 22,
        get intelligence() {
            return this.intelligenceBase + this.intelligenceBonus;
        },
        honneurBase: 0,
        honneurBonus: 1,
        get honneur() {
            return this.honneurBase + this.honneurBonus;
        },
        cote: 13,
        ridicule: 1,
        honte: 0,
        xp: 5,
        tues: 16,
        morts: 2,
        giflesDonnees: 186,
        giflesRecues: 0,
        cible: {
            nom: 'Nelson',
            classe: 2,
            rang: 'Cancre (nain-culte)',
            barbe: 61.68
        },
        chasseurs: {
            nombre: 2,
            barbe: 54.80
        }
    };
}

module.exports = createPerso;
