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


## Pense-bête

- On ne peut pas utiliser de polyfills car il faudrait les charger dans chacune
  des frames de Nainwak ! Comme ce n'est pas très pratique, il vaut mieux
  utiliser des ponyfills.
