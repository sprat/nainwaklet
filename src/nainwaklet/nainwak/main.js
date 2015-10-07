define(['./urls', './nain', './pages', './detect'], function (urls, nain, Pages, detect) {
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
        getNain: nain.get,
        pages: pages
    };
});