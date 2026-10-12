<div align="center">
  <strong>HESTA</strong><br>
  <em>Un univers, plusieurs outils.</em><br>
  <a href="https://hesta.dannytech.fr/">Portail Hesta</a> ·
  <a href="https://cartehesta.dannytech.fr/">Carte Hesta</a> ·
  <a href="https://pahesta.dannytech.fr/">Système PA</a> ·
  <a href="https://codexhesta.dannytech.fr/">Hesta Codex</a>
</div>

# Hesta-Hub

Portail central public de l'univers Hesta, disponible sur [hesta.dannytech.fr](https://hesta.dannytech.fr/). Il présente les applications indépendantes de l'écosystème et oriente vers la communauté. Le portail est statique : aucun backend ni compte n'est nécessaire.

Le portail déployé présente Carte Hesta et Système PA. Le travail local préparé ajoute Hesta Codex, avec des accès dans le même onglet ; cette intégration n'est pas encore déployée au 12 octobre 2026. Chaque application conserve son fonctionnement et ses permissions. Hesta Codex est lui-même déployé : il propose une encyclopédie structurée, des fiches reliées, des sources et un graphe interactif. Les contenus importés sont principalement au statut « proposé » et réservés à l'administration MJ ; leur publication reste soumise à validation et à leurs permissions.

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

Ajoutez un objet au tableau `applications` dans `src/App.tsx`. Chaque objet fournit un identifiant, une catégorie, le nom, une courte description, les fonctions principales, l'URL, le libellé du bouton, un monogramme et une couleur d'accent existante (`azure` ou `violet`). Une note d'accès facultative (`accessNote`) permet de préciser les restrictions de contenu. Le composant `ApplicationCard` et la grille responsive affichent automatiquement la nouvelle entrée, sans mise en page propre à un nombre fixe d'applications.

Les liens vers Carte Hesta, Système PA et Hesta Codex sont des URL publiques directes. Le lien communautaire mène à la section Discord de Carte Hesta ; il peut être remplacé par une invitation Discord publique stable lorsqu'elle est confirmée.

## Documentation

- [Roadmap globale de l'écosystème](ROADMAP.md)
- [Audit transversal du 12 octobre 2026 et preuves de statut](docs/ECOSYSTEM-AUDIT-2026-10.md)
- [Architecture cible de Hesta Codex — référence de conception](docs/HESTA-CODEX-ARCHITECTURE.md)

La roadmap technique de chaque dépôt reste sa référence locale ; celle du Hub synthétise l'état global. Pour chaque évolution majeure, vérifier le code, les tests, la révision Git et la livraison du projet concerné, puis actualiser les statuts, les preuves et la date de synchronisation dans `ROADMAP.md`. Une fonctionnalité développée, testée, déployée et validée en usage réel correspond à quatre niveaux de preuve distincts. La [gouvernance de synchronisation](ROADMAP.md#gouvernance-et-synchronisation) précise la procédure, sans automatisation.

La prochaine grande étape est un audit de Carte Hesta pour organiser la carte, la chronologie, le planning et leurs interactions avec le Codex.

## Écosystème Hesta

| Application | Rôle | URL publique |
| --- | --- | --- |
| Hesta Hub — ce projet | Portail central | [hesta.dannytech.fr](https://hesta.dannytech.fr/) |
| Carte Hesta | Carte interactive, quêtes, chronologie, planning et communauté | [cartehesta.dannytech.fr](https://cartehesta.dannytech.fr/) |
| Système PA | Armures, matériaux, builds et outils de combat | [pahesta.dannytech.fr](https://pahesta.dannytech.fr/) |
| Hesta Codex | Encyclopédie structurée, lore, relations, sources et graphe ; accès aux fiches selon leurs permissions | [codexhesta.dannytech.fr](https://codexhesta.dannytech.fr/) |
