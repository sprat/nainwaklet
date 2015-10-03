/* Collection of pages */
define(['./detect', 'array'], function(detect, array) {
    /*
    // Evénements (tous types d'evts sur 10 jours)
    createPage('even', log, {duree: 240, type: 'ALL'}),
    // Fiche de perso
    createPage('perso', log),
    // Inventaire
    createPage('invent', log),
    // Encyclopédie
    createPage('encyclo', log)
    */

    var elements = [detect],
        getByUrl = function (url) {
            return array.find(elements, function (page) {
                return page.url === url;
            });
        },
        self = {
            getByUrl: getByUrl
        };

    // add the pages to the object
    elements.forEach(function (page) {
        self[page.name] = page;
    });

    return Object.freeze(self);
});