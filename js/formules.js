/* global Nany, jQuery */
(function($) {
    function addCell(row, content) {
        return $('<td>').html(content).appendTo(row);
    }

    function addEmptyCells(row, n) {
        var i;
        for (i = 0; i < n; i += 1) {
            addCell(row, '');
        }
    }

    function objetDiv(objet, klass) {
        var title = objet.nom;

        if (objet.note) {
            title += ' (' + objet.note + ')';
        }

        if (objet.id) {
            title += ' [' + objet.id + ']';
        }

        var img = $('<img class="image">');
        img.attr('src', 'http://www.nainwak.com/images/objets/' + objet.image);
        img.attr('title', title);

        var div = $('<div class="objet">');
        div.addClass(klass);
        div.append(img);

        if (objet.quantite > 1) {
            div.append(' ');
            div.append($('<span class="quantite">').text('x ' + objet.quantite));
        }

        return div;
    }

    function afficheFormules(formules) {
        var maxIngredients = 0;
        var maxResultats = 0;
        var formulesTable = $('.formules');

        // calcule le nombre max d'ingrédients et de résultats
        formules.forEach(function (formule) {
            var resultats = formule.resultats || [];
            var ingredients = formule.ingredients || [];
            maxIngredients = Math.max(ingredients.length, maxIngredients);
            maxResultats = Math.max(resultats.length, maxResultats);
        });

        // adapte les colspan
        formulesTable.find('.titre-global').attr('colspan', 2 + maxResultats + maxIngredients);
        formulesTable.find('.titre-resultats').attr('colspan', maxResultats);
        formulesTable.find('.titre-ingredients').attr('colspan', maxIngredients);

        // ajoute les objets
        var tbody = formulesTable.find('tbody').empty();
        formules.forEach(function (formule) {
            var row = $('<tr>').appendTo(tbody);
            var resultats = formule.resultats || [];
            var ingredients = formule.ingredients || [];

            addCell(row, '' + formule.id);
            addCell(row, formule.nom || '?');

            resultats.forEach(function (resultat) {
                addCell(row, objetDiv(resultat, 'resultat'));
            });

            addEmptyCells(row, maxResultats - resultats.length);

            ingredients.forEach(function (ingredient) {
                addCell(row, objetDiv(ingredient, 'ingredient'));
            });

            addEmptyCells(row, maxIngredients - ingredients.length);
        });
    }

    afficheFormules(Nany.formules);
})(jQuery);
