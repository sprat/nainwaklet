# Nany

Nany est un outil de guilde pour le jeu [Nainwak](www.nainwak.fr). Il se présente
sous la forme d'un bookmarklet faisant apparaître l'interface de guilde directement
à l'intérieur des pages Web du jeu.

Cet outil peut également envoyer des mises à jour des informations du nain
courant vers le serveur de la guilde.

[![Build Status](https://travis-ci.org/sprat/nany.svg?branch=master)](https://travis-ci.org/sprat/nany)


## A faire

- Calcul de dégâts : poing perso manquant
- Spy : extraire l'url et les paramètres GET et POST (evt submit ?) en plus du
  document
- Analyser les actions lors des changements des pages (cf. ci-dessous)
- Ajouter une fonction de recherche textuelle dans la page des formules
- Implémenter un détecteur de formule dans les pages "detect" et "inventaire"
- Communication temps-réel pour outils externes (IRC bot, etc.)
- Mettre en place une intégration continue ? (Travis ?)


## Actions

- Poser : transfert.php en GET avec IDS, action=poser, idinv
- Ramasser : transfert.php et GET avec IDS, action=ramasser, idsol
- Réparer : reparer.php en GET avec IDS, idinv
- Manger : utiliser.php en GET avec IDS, idinv
- Gifler : gifler.php en GET avec IDS, id
- Utiliser une arme : utiliser.php en POST avec IDS, idennemi et idinv
- Se déplacer : deplac.php en POST avec IDS, type=1, destx et desty
- Glisser : deplac.php en POST avec IDS, type=2, destimonde (cf. deplac.php pour les id de mondes)
- Occuper son nain : deplac.php en POST avec IDS, type=3
- Localiser sa cible : deplac.php en POST avec IDS, type=7


## Développement

En pré-requis, il est nécessaire d'installer NodeJS et Npm.

Pour installer les dépendances Javascript du projet, lancer la commande
suivante :

```shell
npm install
```

Puis, pour développer de nouvelles fonctionnalités, il faut lancer la commande
"dev" :
```shell
npm run dev
```

Cette commande lance un outil qui surveille les sources du projet afin de
détecter d'éventuels changements. En cas de changement, il vérifie les sources
(lint) puis lance la construction des bundles Javascript si tout est ok et
lance les tests unitaires. Cette commande lance aussi un serveur de dev sur
http://localhost:8080/ permettant d'observer/vérifier le résultat.

Enfin, une fois le développement validé, pour déployer l'application sur le
site http://sprat.github.io/nany/, entrer la commande suivante :
```shell
npm run deploy
```


## Pense-bête

- On ne peut pas utiliser de polyfills car il faudrait les charger dans chacune
  des frames de Nainwak ! Comme ce n'est pas très pratique, il vaut mieux
  utiliser des ponyfills.
