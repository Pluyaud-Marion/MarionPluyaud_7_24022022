# Les petits plats 
P7 - Développez un algorithme de recherche en JavaScript

Ce repo a été réalisé dans le cadre d'un projet pour la formation DA Javascript React - Openclassrooms

L'ensemble des recettes sont communiquées par l'entreprise sous forme de fichier JS = utilisation export/import sous forme de modules

Fonctionnalités du site : 
- **L'utilisateur doit pouvoir faire une recherche grâce à une barre de recherche en tapant au moins 3 lettres**
(recherche dans le titre de la recette + dans sa description + dans ses ingrédients) = l'ensemble des cartes correspondant à la recherche doivent s'afficher et se mettre à jour

- **L'utilisateur doit pouvoir faire une recherche grâce à des tags (ingrédients / appareils / ustensils)**
= à chaque tag sélectionné (ou retiré) les cartes correspondant à la recherche doivent s'afficher et se mettre à jour

- **L'utilisateur doit pouvoir commencer une recherche grâce à la barre de recherche puis affiner son choix grâce à la sélection d'un ou plusieurs tags** 
= les cartes correspondant à la recherche doivent s'afficher et se mettre à jour

Demandes du client : 
Implémentation de 2 algorithmes différents pour la recherche principale

Travail réalisé : 
- Branche Master : contient la recherche par tag
- Branche algorithme1 : contient la recherche principale `implémentée avec Filter`
- Branche alogirthme2 : contient la recherche principale `implémentée avec des boucles for`
- Site accessible (navigation au clavier possible)
- Site passé avec succès aux validateurs W3C et Achecker
- Réalisation d'une documentation JSDoc : http://127.0.0.1:5500/docs/index.js.html
- Réalisation d'un algorigramme : [algorigramme.pdf](https://github.com/Pluyaud-Marion/MarionPluyaud_7_24022022/files/8231171/algorigramme.pdf)
- Réalisation d'un comparatif de performance entre les 2 algorithmes (outil Jsben.ch) : ![benchmark](benchmark.png)


Technologies utilisées : 
- HTML 
- SCSS
- JavaScript

Pour lancer le projet : 
`npm install`


