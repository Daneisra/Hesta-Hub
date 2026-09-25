# Hesta-Hub

Portail public statique de l'univers Hesta. Il présente les applications indépendantes de l'écosystème et oriente vers la communauté. Aucun backend ni compte n'est nécessaire.

## Développement

- npm install
- npm run dev
- npm run lint
- npm run build

La compilation Vite produit des fichiers statiques dans dist/.

## Ajouter une application

Ajoutez un objet au tableau applications dans src/App.tsx. Chaque objet fournit le nom, une courte description, les fonctions principales, l'URL, le libellé du bouton, un monogramme et une couleur d'accent. Le composant ApplicationCard et la grille responsive affichent automatiquement la nouvelle entrée, sans mise en page propre à deux applications.

Les liens vers Carte Hesta et Système PA sont des URL publiques directes. Le lien communautaire mène à la section Discord de Carte Hesta ; il peut être remplacé par une invitation Discord publique stable lorsqu'elle est confirmée.