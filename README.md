# Nany

Nany est un outil de guilde pour le jeu [Nainwak](www.nainwak.fr). Il se présente
sous la forme d'un bookmarklet faisant apparaître l'interface de guilde directement
à l'intérieur des pages Web du jeu.

Cet outil peut également envoyer des mises à jour des informations du nain
courant vers le serveur de la guilde.


## A faire

- Calcul de dégâts : poing perso manquant
- Analyser les actions dans les paramètres d'url lors du chargement des pages
- Ajouter une fonction de recherche textuelle dans la page des formules
- Implémenter un détecteur de formule dans les pages "detect" et "inventaire"
- Communication temps-réel pour outils externes (IRC bot, etc.)
- Mettre en place une intégration continue ? (Travis ?)


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
