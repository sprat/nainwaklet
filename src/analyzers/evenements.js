var dom = require('../dom');
var code = require('./code');
var int = require('./int');
var dateRegex = /(\d\d)h(\d\d) \(\w+\. (\d\d)\/(\d\d)\)/;

function analyze(doc, date) {
    var js = dom.getInlineJavascript(doc);
    var regex = /ev\((.*)\);/ig;
    var keys = 'neweven,time,num,s1,s2,s3,n1,n2,n3,appel'.split(',');
    var objects = code.buildObjectsFromJSSequences(js, regex, keys);

    return objects.map(function (object) {
        var type = object.num;
        var params = {
            s1: object.s1,
            s2: object.s2,
            s3: object.s3,
            n1: object.n1,
            n2: object.n2,
            n3: object.n3
        };

        return {
            isNew: object.neweven == 1,
            type: type,
            date: convertToUnixTimestamp(object.time, date),
            //appel: object.appel === 1,
            parametres: params,
            description: getDescription(type, params),
            image: getImage(type)
        };
    });
}

// return the unix timestamp for a date specified as '12h09 (sam. 12/03)' in GMT+1
function convertToUnixTimestamp(date, nowDate) {
    var match = dateRegex.exec(date);
    var year = nowDate.getFullYear();
    var month = int(match[4]);
    var day = int(match[3]);
    var hours = int(match[1]);
    var minutes = int(match[2]);

    // Note: we apply the GMT+1 offset to the date
    date = new Date(Date.UTC(year, month - 1, day, hours - 1, minutes));

    if (date.getTime() > nowDate.getTime()) {  // happy new year
        date.setUTCFullYear(date.getUTCFullYear() - 1);
    }

    return date;
}

function getDescription(type, params) {
    var desc = descriptions[type - 1];

    if (!desc) {
        return;
    }

    desc = desc.replace(/%s1/, params.s1);
    desc = desc.replace(/%s2/, params.s2);
    desc = desc.replace(/%s3/, params.s3);
    desc = desc.replace(/%n1/, params.n1);
    desc = desc.replace(/%n2/, params.n2);
    desc = desc.replace(/%n3/, params.n3);
    return desc;
}

function getImage(type) {
    var img = images[type - 1];

    if (!img) {
        return;
    }

    if (img.indexOf('.') === -1) {
        img += '.gif';
    }

    return '/images/interface/evens/' + img;
}

// Adapted copy of http://www.nainwak.com/js/even.js, version 2.0.2.0
var descriptions = [
    'Repos.', //1
    '%s1 s\'est reposé.',
    'Ton %s2 a rendu l\'âme, te faisant perdre %n1 point(s) de Vie, et augmenter de %n2 point(s) de Ridicule !',
    'Le véhicule de %s1 lui a explosé à la figure.',
    'Tu es mort dans l\'explosion de ton véhicule !', //5
    '%s1 est mort dans l\'explosion de son véhicule (%s2) !',
    'Tu as perdu tous tes objets.',
    'Tu réssuscites, honteux, sur le monde \'%s1\'.',
    'Ta nouvelle cible est : %s1.',
    'Déplacement en %n1,%n2.', //10
    'Tu as aperçu %s1 en (%n1,%n2).',
    'Tu as rejoint ta cible, et bénéficié d\'un bonus de %n1 PA.',
    'Glisse vers %s2.',
    '%s1 a glissé vers %s2.',
    '%s1 est arrivé du monde %s3.', //15
    'Début d\'hibernation.',
    '%s1 s\'est placé en hibernation.',
    'Tu as mangé un aliment non comestible, et tu en es mort !',
    '%s1 a mangé un(e) %s2, puis s\'est écroulé en se tordant de douleur !',
    'Tu as consommé un(e) %s2 [%n1 PV]', //20
    '%s1 a mangé un(e) %s2',
    'Tu as attaqué un nain qui est de ton côté ! Tu bascules de l\'autre !',
    'Tu as attaqué un rampant de ton côté tout en ayant au moins 1 point de Honte! Tu passe rampant toi-même en basculant de l\'autre coté !',
    'Tu as choisi ton côté, celui des Braves, en frappant un Sadique !',
    'Tu as choisi ton côté, celui des Sadiques, en frappant un Brave !', //25
    'Tu as réussi un coup critique sur %s2 avec ton %s3, et lui as fait perdre %n1 point(s) de Vie ! [+%n2 XP]',
    '%s1 t\'a porté un coup critique avec son(sa) %s2, et t\'a fait perdre %n1 point(s) de Vie !',
    '%s1 a réussi un coup critique sur %s2 avec son(sa) %s3 !',
    'Tu as attaqué %s2 avec ton(ta) %s3, et lui as fait perdre %n1 point(s) de Vie ! [+%n2 XP]',
    '%s1 t\'a attaqué avec son(sa) %s2, et t\'a fait perdre %n1 point(s) de Vie !', //30
    '%s1 a frappé %s2 avec son(sa) %s3 !',
    '%s1 t\'a porté un coup terrible avec son(sa) %s3, engendrant une perte de %n1 PV !',
    '%s1 a tué %s2 avec son(sa) %s3 !',
    'Tu es MORT !',
    'Tu as ressuscité, le coeur empli de vengeance, sur le monde \'%s1\'.', //35
    'Tu as été tué par un joueur à la barbe plus courte, tu augmentes de %n1 point(s) de Ridicule !',
    'Tu as tué ta cible, et as gagné %n1 point(s) d\'Honneur et %n2 point(s) d\'XP !',
    'Tu as été tué par ton chasseur',
    'Tu as tué %s1, le puissant %s2, qui était ton chasseur ! Tu gagnes %n1 point(s) d\'XP et %n2 point(s) d\'Honneur !',
    'Tu as tué %s1, qui était ton chasseur ! Tu gagnes %n1 point(s) d\'XP !', //40
    'Tu as tué %s1, le puissant %s2, tes points de Côté varient de %n1, et tu gagnes %n2 point(s) d\'XP et %n3 point(s) d\'Honneur !',
    'Tu as tué %s1, un(e) %s2, tes points de Côté varient de %n1, et tu gagnes %n2 point(s) d\'XP !',
    'Armé de ton %s3, tu as lamentablement raté ton attaque contre %s2.',
    '%s1, armé d\'un(e) %s2, a ridiculement raté son attaque contre toi !',
    '%s1, armé de son(sa) %s3, a lamentablement raté une attaque contre %s2 !', //45
    'Ton %s1 a été détruit(e) !',
    '%s1 t\'a giflé !',
    '%s1 a giflé %s2 !',
    'Tu as ramassé un(e) %s2.',
    '%s1 a pris un(e) %s2 sur le sol.', //50
    'Un p\'tit lutin de Schlavbeuk a ramassé le(la) %s2 de %s1 et s\'est enfui avec.',
    'Tu es descendu de ton %s2, et l\'a laissé dans un état tel, qu\'il est maintenant inutilisable.',
    '%s1 est descendu de son(sa) %s2, et l\'a laissé dans un état tellement lamentable qu\'il est inutilisable.',
    'Tu as mis un détritus à la poubelle !',
    '%s1 est très civique, il a mis un détritus à la poubelle !', //55
    'Tu t\'es séparé de ton %s2.',
    '%s1 a posé un(e) %s2.',
    'Un petit lutin de Schlavbeuk t\'a volé ton %s2.',
    'Un petit lutin de Schlavbeuk a volé le(la) %s2 de %s1 et s\'est enfui avec.',
    'Un petit lutin de Schlavbeuk a réparé votre %s2', //60
    'Un petit lutin de Schlavbeuk a réparé le(la) %s2 de %s1',
    'Tu as posé une rune qui te maintenait en vie, tu es mort et as augmenté de %n1 point(s) de Ridicule.',
    '%s1 a posé une rune (%s2), qui le maintenait en vie, et il en est mort !',
    'Tu as réparé ton %s2.',
    '%s1 a réparé son(sa) %s2.', //65
    'Entraînement en Force.',
    '%s1 s\'est musclé un peu, et a gagné en Force.',
    'Entraînement en Intelligence.',
    '%s1 est très studieux, et a progressé en Intelligence.',
    'Entraînement en Précision.', //70
    '%s1 s\'est entraîné au tir, et s\'est amélioré en Précision.',
    'Entraînement en Vie.',
    '%s1 a travaillé sa constitution, et augmenté ses points de Vie.',
    'Rédemption',
    '%s1 a fait pénitence.', //75
    'Tu as peint la case %n1, %n2 de %s3 en %s2.',
    '%s1 a peint la case %n1, %n2 de %s3 en %s2.',
    'Tu as effacé la case %n1, %n2 de %s2.',
    '%s1 a effacé la case %n1, %n2 de %s2.',
    'Reset de ton nain.', //80
    'Ta cible hiberne, une nouvelle cible t\'a été attribuée.',
    'Ta cible a fait un reset de son nain, une nouvelle cible t\'a été attribuée.',
    'Ta cible a été retirée du jeu, une nouvelle cible t\'a été attribuée.',
    '%s1',
    'Fin d\'hibernation', //85
    'Il n\'y a pas eu d\'hibernation, tu as toujours été en combat !',
    'Nouvelle vie',
    'Tu as envoyé %s2 bouffer l\'herbe de %n1, %n2 avec ton %s3.',
    '%s1 t\'a shooté avec son(sa) %s2 et t\'a envoyé en %n1, %n2.',
    '%s1 a utilisé son(sa) %s3 sur %s2 et l\'a expédié en %n1, %n2 voir si l\'air était plus frais.', //90
    'Tu as attrapé %s2 avec ton %s3.',
    '%s1 t\'a attrapé avec son %s2 et t\'a attiré en %n1, %n2.',
    '%s1 a utilisé son(sa) %s3 sur %s2 et l\'a ramené au bercail en %n1, %n2.',
    'Tu as joué au %s2 et as %s3.',
    '%s1 a joué au %s2 et a %s3.',//95
    'Tu as utilisé ton %s2 pour récupérer un(e) %s3.',
    '%s1 a utilisé son(sa) %s2 pour récupérer un(e) %s3.',
    'Tu as téléporté %s2 avec ton %s3.',
    '%s1 t\'a shooté avec son(sa) %s2 et t\'a envoyé en %n1, %n2 de %s3.',
    '%s1 a téléporté %s2 avec son %s3.', //100
    'Tu as entarté %s2 avec ta %s3 et infligé %n1 points de ridicule.',
    '%s1 t\'a entarté avec son(sa) %s3 et t\'a infligé %n1 points de ridicule.',
    '%s1 a entarté %s2 avec son(sa) %s3 et infligé %n1 points de ridicule.',
    'Tu as endommagé l\'inventaire de %s2 avec ton %s3.',
    '%s1 a endommagé ton inventaire avec son(sa) %s2.', //105
    '%s1 a endommagé l\'inventaire de %s2 avec son(sa) %s3.',
    '%s2 a évité la tarte que tu viens de lui lancer d\'une façon admirable, ses PR diminuent de %n1.',
    '%s1 a ridiculement raté ton entartage, grâce à ta pirouette tu perds %n1 point(s) de Ridicule !',
    '%s1 a ridiculement raté l\'entartage de %s2 qui grâce à sa pirouette perd %n1 point(s) de Ridicule',
    '%s1 %s2', //110
    '%s1 a tenté de manger une Surprise de Kine d\'Heure, qui a fini à la poubelle !',
    '%s1 a mangé un Kine d\'Heure, et une merveilleuse surprise toute mimi est apparue.',
    'La Surprise de Kine d\'Heure est tombée sur ta case.',
    'Hélas, la surprise de Kine d\'Heure est passée de travers et part à la poubelle !',
    'Tu as peint la case %n1,%n2 de %s3 avec %s2.', //115
    '%s1 a peint la case %n1,%n2 de %s3 avec %s2.',
    'Tu as offert ton(ta) %s3 à %s2. Joyeux nain-ël.',
    '%s1 t\'a offert son(sa) %s3. Joyeux nain-ël.',
    '%s1 a offert son(sa) %s3 à %s2. Joyeux nain-ël.',
    'Tu as été ramené sur la case de l\'%s3 ', //120
    '%s1 a voulu attraper un(e) %s3 avec son(sa) %s2 et a été ramené sur sa case !',
    'BAOUM ! %s1 a lancé un(e) %s2 sur ta case, tu as atteris en %n1,%n2 sur %s3 et perdu %n3 PV',
    'Tu as fait exploser la case %n1,%n2 avec ton %s2 !',
    'BAOUM ! %s1 a fait exploser la case %n1, %n2 avec sa %s2 !',
    'La Boule de NainLo que tu avais a quitté ton inventaire pour aller tomber ailleur !', //125
    'Le tirage du NainLo a eu lieu, n\'oublie pas d\'aller vérifier ta combinaison.',
    '%s1 %s2',
    'Porté par le vent ton mot doux est parti vers d\'autres cieux.',
    'Ton coeur s\'est embrasé en lisant le mot doux de %s1',
    'Le coeur de %s1 s\'est embrasé en lisant ton mot doux.', //130
    'Le mot doux de %s1 ne t\'a fait ni chaud ni froid.',
    'Ton mot doux n\'a fait ni chaud ni froid à %s1.',
    'La tête te tourne dès que le breuvage noir a touché ton gosier. Avec un mal de crâne terrible, tu te réveilles sur Ire-Land.',
    '%s1 s\'écroule par terre et son corps s\'évanouit dans les airs, ne laissant qu\'un carré de trèfles verdoyants.',
    'Ton coup de chaudron a arraché une feuille au trèfle de %s2.', //135
    'D\'un revers de chaudron %s1 a arraché une feuille de ton trèfle !',
    '%s1 a chaudronné %s2', //137
    'Tu as mangé ton Trognon de trèfle et as glissé vers %s2',
    '%s1 a mangé son Trognon de trèfle et est reparti sur %s2', //139
    'Tu as offert un bien joli bouquet de muguet à %s2',
    '%s1 t\'a offert un bien joli bouquet de muguet !', //141
    '%s1 a offert un bien joli bouquet de muguet à %s2',
    'Tu as réclamé des bonbons à d\'effrayants voisins.',
    '%s1 a été réclamer des bonbons à d\'effrayants voisins.',
    'Tu as accroché ta vieille chaussette au sapin de Nain-ël.', //145
    '%s1 a accroché sa vieille chaussette au sapin de Nain-ël.',
    'Tu as lancé ta %s3 sur %s2 et l\'a touché en plein dans le mille.',
    'Touché ! %s1 t\'as bien eu avec sa %s3.',
    '%s2 s\'est fait blanchir par %s1',
    'Oh non ! Mary a tout pris ... ou presque !',//150
    'À bout de force, tu es ramené sur la case de %s2.',
    'À bout de force, %s1 n\'a pas réussi a te ramener sur sa case. Tu en a profité pour le ramener à toi.',
    'À bout de force, %s1 n\'a pas réussi a ramener %s2 sur sa case.',
    'Tu n\'as rien compris à l\'art du lassotage et as échangé ta place avec %s2.',
    '%s1 n\'a rien compris à l\'art du lassotage, vous avez échangé de place.', //155
    '%s1 n\'a rien compris à l\'art du lassotage et a échangé de place avec %s2.',
    'Tu as tiré avec ton(ta) %s3 sur %s2 et l\'a touché en plein dans le mille.',
    'Touché ! %s1 t\'a bien eu avec son(sa) %s3.',
    '%s2 s\'est fait arroser par %s1',
    'Tu as mutanisé %s2 avec ton(ta) %s3', //160
    '%s1 t\'a mutanisé avec son(sa) %s2 !',
    '%s1 a mutanisé %s2 avec son(sa) %s3 !'
];

var images = [
    'dodo', //1
    'dodo',
    'explosion',
    'explosion',
    'mort', //5
    'mort',
    '',
    '',
    'cible',
    'pas', //10
    'pas',
    '',
    'pas',
    'pas',
    'pas', //15
    'dodo',
    'dodo',
    'mort',
    'mort',
    '', //20
    '',
    'cote',
    'cote',
    'cote',
    'cote', //25
    'combat_critique',
    'combat_critique',
    'combat_critique',
    'combat',
    'combat', //30
    'combat',
    'combat_critique',
    'mort',
    'mort',
    '', //35
    'mort',
    'mort',
    'mort',
    'mort',
    'mort', //40
    'mort',
    'mort',
    '',
    '',
    '', //45
    'explosion',
    'gifle',
    'gifle',
    '',
    '', //50
    '',
    '',
    '',
    '',
    '', //55
    '',
    '',
    '',
    '',
    'repare', //60
    'repare',
    'mort',
    'mort',
    'repare',
    'repare', //65
    '',
    '',
    '',
    '',
    '', //70
    '',
    '',
    '',
    '',
    '', //75
    '',
    '',
    '',
    '',
    '', //80
    '',
    '',
    '',
    'lutin.png',
    '', //85
    '',
    '',
    'batte',
    'batte',
    'batte', //90
    'lasso',
    'lasso',
    'lasso',
    'quite',
    'quite', //95
    'main',
    'main',
    'pistolet',
    'pistolet',
    'pistolet', //100
    'tarte',
    'tarte',
    'tarte',
    'explosion',
    'explosion', //105
    'explosion',
    'tarte',
    'tarte',
    'tarte',
    'noel', //110
    '',
    '',
    '',
    '',
    '', //115
    '',
    '',
    '',
    '',
    'main', //120
    'main',
    'explosion',
    'explosion',
    'explosion',
    '', //125
    '', //126
    '', //127
    'eventsaintvalentin.png',
    'eventsaintvalentin.png',
    'eventsaintvalentin.png', // 130
    'brokenheart.png',
    'brokenheart.png',
    'trefle_event.png',
    'trefle_event.png',
    'trefle_event.png', // 135
    'trefle_event.png',
    'trefle_event.png',
    'pas',
    'pas',
    '',//140
    '',
    '',
    'halloween',
    'halloween',
    'cerfoo.png', //145
    'cerfoo.png',
    'poule',
    'poule',
    'poule',
    'fee.png', //150
    'lasso',
    'lasso',
    'lasso',
    'lasso',
    'lasso', //155
    'lasso',
    'bombe_eau.png',
    'bombe_eau.png',
    'bombe_eau.png',
    'combat_critique', //160
    'combat_critique',
    'combat_critique'
];

module.exports = analyze;
