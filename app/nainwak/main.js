define(['./urls', './getUser', './pages', './detect'], function (urls, getUser, Pages, detect) {
    /*
    // Evénements (tous types d'evts sur 10 jours)
    Page('even', log, {duree: 240, type: 'ALL'}),
    // Fiche de perso
    Page('perso', log),
    // Inventaire
    Page('invent', log),
    // Encyclopédie
    Page('encyclo', log)
    */
    var pages = Pages([detect]);

    return {
        gameUrl: urls.gameUrl,
        imageUrl: urls.imageUrl,
        isInGame: urls.isInGame,
        getUser: getUser,
        pages: pages
    };
});