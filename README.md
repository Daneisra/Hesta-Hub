<div align="center">
  <strong>HESTA</strong><br>
  <em>Un univers, plusieurs outils.</em><br>
  <a href="https://hesta.dannytech.fr/">Portail Hesta</a> ·
  <a href="https://cartehesta.dannytech.fr/">Carte Hesta</a> ·
  <a href="https://pahesta.dannytech.fr/">Système PA</a>
</div>

# Hesta-Hub

Portail central public de l'univers Hesta, disponible sur [hesta.dannytech.fr](https://hesta.dannytech.fr/). Il présente les applications indépendantes de l'écosystème et oriente vers la communauté. Le portail est statique : aucun backend ni compte n'est nécessaire.

## Stack

- React, TypeScript et Vite.
- Compilation en fichiers statiques dans `dist/`.

## Développement

```bash
npm install
npm run dev
npm run lint
npm run build
npm run preview
```

`npm run dev` lance le serveur Vite local. `npm run preview` permet de vérifier localement le contenu compilé de `dist/`.

## Déploiement

Le workflow [GitHub Actions](.github/workflows/deploy.yml) se lance automatiquement après un push sur `main` ; il peut aussi être lancé manuellement. Il installe les dépendances, exécute le lint et la compilation, puis synchronise `dist/` vers `/var/www/hesta/` sur le VPS. Il vérifie ensuite l'URL de production.

## Ajouter une application

Ajoutez un objet au tableau applications dans src/App.tsx. Chaque objet fournit le nom, une courte description, les fonctions principales, l'URL, le libellé du bouton, un monogramme et une couleur d'accent. Le composant ApplicationCard et la grille responsive affichent automatiquement la nouvelle entrée, sans mise en page propre à deux applications.

Les liens vers Carte Hesta et Système PA sont des URL publiques directes. Le lien communautaire mène à la section Discord de Carte Hesta ; il peut être remplacé par une invitation Discord publique stable lorsqu'elle est confirmée.

## Documentation

- [Roadmap globale de l'écosystème](ROADMAP.md)
- [Architecture cible de Hesta Codex](docs/HESTA-CODEX-ARCHITECTURE.md)

## Écosystème Hesta

| Application | Rôle | URL publique |
| --- | --- | --- |
| Hesta Hub — ce projet | Portail central | [hesta.dannytech.fr](https://hesta.dannytech.fr/) |
| Carte Hesta | Carte interactive, quêtes, chronologie, planning et communauté | [cartehesta.dannytech.fr](https://cartehesta.dannytech.fr/) |
| Système PA | Armures, matériaux, builds et outils de combat | [pahesta.dannytech.fr](https://pahesta.dannytech.fr/) |
