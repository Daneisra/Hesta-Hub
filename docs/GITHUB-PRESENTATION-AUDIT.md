# Présentation GitHub de l’écosystème Hesta

Audit du 23 octobre 2026. Périmètre : les quatre dépôts publics, leur présentation et les points d’entrée pour contribuer ou demander de l’aide. Les réglages GitHub ont été consultés sans modification.

## État constaté

| Projet | About : description / site | Topics | Issues | Aperçu social |
| --- | --- | --- | --- | --- |
| [Hesta Hub](https://github.com/Daneisra/Hesta-Hub) | Description présente ; `https://hesta.dannytech.fr/` | 15, dont `hesta`, `jdr`, `tabletop-rpg` | Actives | Aperçu automatique GitHub |
| [Carte Hesta](https://github.com/Daneisra/Carte-Hesta) | Description présente ; `https://cartehesta.dannytech.fr/` | Aucun | Actives ; formulaires bug et proposition présents | Aperçu automatique GitHub |
| [Système PA](https://github.com/Daneisra/Armures-d100-Hesta) | Description présente ; `https://pahesta.dannytech.fr/` | 16, dont `hesta`, `jdr`, `tabletop-rpg` | Actives | Image personnalisée présente |
| [Hesta Codex](https://github.com/Daneisra/Hesta-Codex) | Description présente ; site public non renseigné | Aucun | Actives | Aperçu automatique GitHub |

Les quatre dépôts utilisent `main`, sont publics et ne sont pas archivés. Les Discussions sont désactivées partout. Le wiki est désactivé pour Carte Hesta et activé sur les trois autres dépôts ; son contenu n’a pas été audité.

Les descriptions About actuelles ne sont pas vides. La principale différence de Carte Hesta est l’absence de topics et d’image sociale personnalisée. L’URL de production manque dans l’About du Codex.

## Harmonisation des README réalisée dans ce chantier

- Même bandeau HESTA centré, même devise et mêmes quatre liens de navigation.
- Tableau commun dans le même ordre : Hub, Carte Hesta, Système PA, Codex ; indication « ce projet » adaptée au dépôt.
- Badges sous chaque titre : accès au site public, workflows existants et technologies propres à l’application.
- Conservation des badges existants de Système PA et des sections techniques des quatre projets.
- Les badges de version ajoutés à Carte Hesta et Codex lisent leur `package.json` sur GitHub ; ils ne constituent pas une release GitHub.
- Le badge du Hub reste sans numéro de version : son `package.json` déclare actuellement `0.0.0`.

Les badges Actions affichent l’état des workflows GitHub. Ils ne certifient pas à eux seuls la révision servie par le VPS. Le badge « HESTA / en ligne » est un lien de présentation statique, pas une sonde de disponibilité.

## Corrections GitHub proposées, non appliquées

### 1. About et topics

Conserver les noms distincts des applications et leurs domaines actuels. Propositions de descriptions :

| Projet | Description proposée | Site public |
| --- | --- | --- |
| Hesta Hub | Portail public de l’écosystème Hesta : applications, communauté et soutien au projet. | `https://hesta.dannytech.fr/` |
| Carte Hesta | Carte interactive du Monde d’Hesta : lieux, quêtes, chronologie et planning JDR. | `https://cartehesta.dannytech.fr/` |
| Système PA | Outil Hesta pour le système d100 inversé : armures, matériaux, règles, calculs et builds. | `https://pahesta.dannytech.fr/` |
| Hesta Codex | Encyclopédie du Monde d’Hesta : lore, fiches, relations éditoriales, sources et provenance. | `https://codexhesta.dannytech.fr/` |

Topics communs proposés : `hesta`, `jdr`, `tabletop-rpg`. Conserver les topics existants pertinents ; ajouter les spécialités plutôt que remplacer toutes les listes par une liste identique.

- Hub : `portal`, `community`, `static-site`, `react`, `typescript`, `vite`.
- Carte Hesta : `interactive-map`, `leaflet`, `worldbuilding`, `timeline`, `javascript`, `nodejs`.
- Système PA : `d100`, `armor-calculator`, `character-sheet`, `react`, `typescript`, `pwa`.
- Codex : `encyclopedia`, `worldbuilding`, `knowledge-graph`, `obsidian`, `provenance`, `postgresql`, `typescript`.

Priorité : renseigner le site du Codex et les topics manquants de Carte Hesta et Codex.

### 2. Aperçus sociaux

Préparer une famille de quatre visuels : fond nocturne bleu/violet, marque HESTA identifiable, nom et rôle de chaque application. Garder les différences de fonction et ne montrer aucun contenu MJ privé.

- Inventorier et conserver l’image personnalisée de Système PA avant tout remplacement.
- Préparer une image pour le Hub, la Carte et le Codex.
- Prévoir un format commun de 1280 × 640 px, en PNG/JPG/GIF de moins de 1 Mo, selon les [recommandations GitHub](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/customizing-your-repositorys-social-media-preview).
- Après validation visuelle, importer chaque image dans `Settings → General → Social preview` du dépôt concerné.

Ajouter un fichier d’image au dépôt ne configure pas automatiquement l’aperçu social GitHub. Aucun visuel ni réglage social n’a été remplacé pendant cet audit.

### 3. Issues et contribution

Les Issues sont déjà actives sur les quatre dépôts : aucune activation supplémentaire n’est nécessaire.

- Carte Hesta possède `docs/CONTRIBUTING.md`, `SECURITY.md` et deux formulaires d’Issues avec une configuration de redirection vers le portail.
- Hub, Système PA et Codex ne possèdent pas de fichier `CONTRIBUTING.md`, de politique `SECURITY.md` ni de modèles d’Issues dédiés dans leur dépôt. Système PA dispose néanmoins d’une section Contribution dans son README.
- Aucun des quatre dépôts ne possède de modèle de pull request dédié.

Prévoir des fichiers courts et cohérents, adaptés à chaque projet : commandes réellement utilisées, bug reproductible, proposition de fonctionnalité et rappel de ne pas publier de secrets ou de données privées. Ne pas copier les contraintes de stockage ou les tests de Carte Hesta dans les applications statiques.

Conserver le routage : support général de l’écosystème dans les Issues du Hub ; bugs et demandes techniques dans le dépôt de l’application. La communauté reste sur Discord. Pour les vulnérabilités, définir un canal privé fonctionnel et vérifier son activation avant de le documenter dans les dépôts qui n’ont pas encore de politique.

### 4. Vérifications des pull requests

- Carte Hesta et Codex possèdent une CI déclenchée sur les pull requests, distincte du déploiement de `main`.
- Hub et Système PA exécutent leurs vérifications dans le workflow de déploiement, déclenché par push sur `main` ou manuellement ; aucune CI de pull request dédiée n’est actuellement configurée.

Prévoir ultérieurement une validation des PR pour le Hub et Système PA, sans secrets de production ni étape de déploiement. Ce chantier n’altère aucun workflow.

### 5. Points à décider séparément

- Vérifier l’utilité des wikis activés avant de les désactiver ou de déplacer leur contenu.
- Les métadonnées GitHub n’identifient de licence standard dans aucun des quatre dépôts. Cela ne remplace pas une analyse des droits existants : définir explicitement les droits du code, du lore et des médias ; ne pas ajouter automatiquement une licence MIT.
- Vérifier la cohérence entre versions déclarées, tags et releases avant de créer une politique de publication commune. Aucune release ni aucun tag n’a été créé par cet audit.
- L’absence de paquets publiés n’est pas un défaut pour ces applications ; aucune publication npm ou GitHub Packages n’est requise pour harmoniser leur présentation.

## Sources et limites

Constats issus des métadonnées REST publiques des quatre dépôts, des balises `og:image` de leurs pages GitHub et des fichiers présents sur leurs branches `main`, complétés par les README du chantier local :

- [Métadonnées du Hub](https://api.github.com/repos/Daneisra/Hesta-Hub)
- [Métadonnées de Carte Hesta](https://api.github.com/repos/Daneisra/Carte-Hesta)
- [Métadonnées de Système PA](https://api.github.com/repos/Daneisra/Armures-d100-Hesta)
- [Métadonnées de Hesta Codex](https://api.github.com/repos/Daneisra/Hesta-Codex)

L’aperçu automatique ou personnalisé est identifié par l’URL d’image publiée dans les métadonnées de la page. Ce contrôle ne valide pas sa composition graphique. Les protections de branche, secrets, règles de sécurité privées et données de production ne font pas partie de cet audit de présentation.
