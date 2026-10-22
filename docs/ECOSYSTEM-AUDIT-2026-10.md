# Audit fonctionnel transversal — 12 octobre 2026

**Document historique du 12 octobre 2026.** Il décrit l’état antérieur à la sécurisation et à la reconstruction de Carte Hesta. Les statuts actuels sont dans la [roadmap globale](../ROADMAP.md) ; les anciennes preuves Carte sont conservées en archive privée.

Ce relevé justifiait les statuts de la roadmap à cette date. Il porte sur les quatre dépôts du workspace Hesta-Ecosystem, leurs README, leurs documents techniques, leur code, leurs tests, leurs derniers commits et les exécutions GitHub Actions correspondantes. Les quatre dossiers sont accessibles en lecture.

Les chemins techniques ci-dessous sont relatifs au dépôt de leur section, aux révisions indiquées dans la [dernière synchronisation](../ROADMAP.md#dernière-synchronisation). Les identifiants H, C, M et PA permettent de retrouver la preuve d'un changement de statut sans recopier les détails techniques dans la roadmap.

## Méthode et portée

- Lecture seule de Carte Interactive, Armures d100 et Hesta-Codex ; états Git propres avant et après vérification.
- Consultation des résultats et journaux CI existants ; aucune nouvelle suite susceptible d'écrire dans ces dépôts n'est lancée.
- GET HTTPS publics et GET admin **sans session**, uniquement pour constater les refus d'accès.
- Aucun accès au coffre Obsidian, à la base privée du VPS ou à un compte MJ ; aucune migration, ingestion, promotion, mutation éditoriale ou opération de déploiement.
- Validation locale du Hub et conservation de l'intégration Codex déjà préparée dans `src/App.tsx` et `src/App.css`.

**Développé**, **testé**, **déployé** et **validé en usage réel** sont des preuves distinctes. Un workflow vert prouve ses étapes exécutées ; il ne remplace pas une recette MJ sur les données réelles. Un HTTP 200 d'une SPA prouve son accessibilité, pas tous ses parcours.

## Preuves de CI et de livraison

| Application | Révision | Résultats consultés | Portée prouvée |
| --- | --- | --- | --- |
| Hesta Hub | `ef95fe3` | [Déploiement du 26 septembre](https://github.com/Daneisra/Hesta-Hub/actions/runs/36238938722) | Lint, build, rsync et contrôle HTTP réussis pour le portail à deux cartes. L'intégration Codex locale n'est pas incluse dans cette révision. |
| Hesta Codex | `f6f73d7` | [CI du 12 octobre](https://github.com/Daneisra/Hesta-Codex/actions/runs/38243871644), [déploiement](https://github.com/Daneisra/Hesta-Codex/actions/runs/38244104704) | Lint, typecheck, **438 tests API + 318 tests web**, build et Prisma validate réussis. Le journal de livraison confirme migrations, redémarrage PM2, santé API locale et publique. |
| Carte Hesta | `b78e174` | CI du 26 septembre (preuve historique conservée en archive privée), déploiement (preuve historique conservée en archive privée) | Lint d'encodage, tests unitaires, validation assets, **4 tests API, 52 Chromium et 52 Firefox** réussis ; rsync et rechargement API réussis. Le build est un placeholder, pas une compilation du frontend. |
| Système PA | `25df663` | [Tests et déploiement du 27 septembre](https://github.com/Daneisra/Armures-d100-Hesta/actions/runs/36351948151), [release v1.0.0](https://github.com/Daneisra/Armures-d100-Hesta/releases/tag/v1.0.0) | Lint, **46 tests dans 9 fichiers**, build, rsync et vérification publique réussis. Release publiée le 27 septembre, tag ciblant ce même commit. |

Les tests API Codex emploient majoritairement des stores simulés. Les tests du catalogue et de la suppression emploient aussi PGlite éphémère : SQL, contraintes et transactions sont exercés, sans reproduire le VPS ni une concurrence multiconnexion. Les tests web simulent l'API. Les tests API Carte écrivent normalement dans des fixtures/fichiers puis restaurent les états ; ils ne sont pas relancés ici pour respecter la lecture seule.

## Contrôles publics du 12 octobre

| Contrôle | Observation |
| --- | --- |
| Hub, Carte `/map/`, `/timeline/`, `/planning/`, Système PA et Codex | HTTP 200. |
| Carte `/api/timeline` et `/api/planning/sessions` | HTTP 200 ; aucune écriture ni inventaire des données privées. |
| Codex `/api/v1/health` | HTTP 200, `status=ok`, `database=ok`. |
| Codex `/api/v1/relation-types` | HTTP 200, **27 types**. |
| Codex `/api/v1/entities` | HTTP 200, liste publique vide dans la réponse observée. |
| Codex `/api/v1/graph` | HTTP 200, zéro nœud et zéro arête publics au moment du contrôle. |
| Codex `/api/admin/stats` et `/api/admin/reference-qualifications` | HTTP 401 sans session. Aucun contenu administratif consulté. |
| Bundle JavaScript public du Hub | Le lien vers `codexhesta.dannytech.fr` est absent ; il existe dans le travail local non commité. |

Les réponses publiques vides ne contredisent pas les 130 fiches privées annoncées et ne prouvent pas leur nombre. Le refus anonyme confirme une barrière d'accès sur les routes contrôlées ; il ne constitue pas un audit complet des permissions.

## Hesta Hub

| Preuve | État constaté | Code, documentation ou validation |
| --- | --- | --- |
| H1 | Portail React/TypeScript/Vite statique, sans backend ni authentification obligatoire ; deux cartes en production. | `src/App.tsx`, `src/App.css`, `package.json`, `.github/workflows/deploy.yml` ; workflow et GET public ci-dessus. |
| H2 | Troisième carte Codex développée et validée localement ; non commitée et non déployée. Composant et grille réutilisés, accent azure, note MJ, liens dans le même onglet. | Diff local de `src/App.tsx` et `src/App.css` ; lint/build ; contrôle Chromium à 320, 390, 600, 768, 1024, 1280 et 1440 px réalisé lors de l'intégration le 12 octobre. |
| H3 | Documentation globale distincte des références techniques locales. Le document d'architecture décrit une cible progressive, pas un système déjà partagé. | `ROADMAP.md`, `README.md`, `docs/HESTA-CODEX-ARCHITECTURE.md`. Aucun mécanisme de synchronisation automatique. |

## Hesta Codex

Référence locale : [dépôt à la révision auditée](https://github.com/Daneisra/Hesta-Codex/tree/f6f73d729ebca88ea386365b1a2e130aefb066ca). Il n'existe pas de `ROADMAP.md` autonome dans ce dépôt : le README et les documents de jalons, notamment `docs/INGESTION.md`, portent son état technique.

Les fonctionnalités suivantes sont présentes dans le commit livré et couvertes par la CI. Leur recette authentifiée sur le corpus de production reste **À vérifier**, sauf preuve de contrôle public explicitement indiquée.

| Preuve | Réalisation vérifiée | Code et tests/documentation confrontés |
| --- | --- | --- |
| C1 | PostgreSQL, Prisma, sept migrations versionnées ; modèles Entity, RelationType, Relation, Evidence, Revision, Source, User, Session et staging/associations/ignorances. | `prisma/schema.prisma`, `prisma/migrations/`, `apps/api/src/db.ts`, `docs/DATA-MODEL.md` ; CI Prisma validate, livraison avec migrate deploy, santé PostgreSQL publique. |
| C2 | Types de fiches, sous-types de lieux, UUID, slugs, alias, tags et Markdown. DRAFT/PROPOSED/PUBLISHED/ARCHIVED ; PUBLIC/PLAYERS/GM/SECRET. | `prisma/schema.prisma`, `apps/api/src/admin/validation.ts`, `apps/web/src/AdminEditor.tsx`, `apps/api/src/editorial.test.ts`. Pas d'enum RETCON ni de permission joueur effective démontrée. |
| C3 | OAuth Discord, sessions révocables en base, whitelist MJ, contrôle Origin des mutations et no-store ; filtrage public côté serveur. | `apps/api/src/auth/routes.ts`, `apps/api/src/auth/session.ts`, `apps/api/src/auth/store.ts`, `apps/api/src/store.ts`, `apps/api/src/auth.test.ts`, `docs/AUTH.md`. La connexion réelle Discord n'est pas rejouée. |
| C4 | Création manuelle d'une fiche avec Source/Evidence obligatoires et Revision #1, transaction, PROPOSED/GM par défaut. | `apps/api/src/admin/manual.ts`, `apps/web/src/AdminCreate.tsx`, `apps/api/src/manual.test.ts`, `apps/web/src/AdminCreate.test.tsx`, `docs/MANUAL-CREATION.md`. |
| C5 | Modification, publication et retrait explicites ; concurrence optimiste ; historique Entity avec snapshot après action. Une sauvegarde sans changement ne produit pas de révision. | `apps/api/src/admin/editorial.ts`, `apps/api/src/admin/routes.ts`, `apps/api/src/editorial.test.ts`, `apps/web/src/AdminEdit.test.tsx`, `docs/EDITORIAL-WORKFLOW.md`. |
| C6 | Suppression définitive **individuelle** : bilan, empreinte, confirmation et transaction nettoyant les dépendances ; Sources et originaux staging conservés. | `apps/api/src/admin/entity-deletion.ts`, `apps/web/src/AdminDeleteEntity.tsx`, `apps/api/src/entity-deletion.test.ts`, `apps/web/src/AdminDeleteEntity.test.tsx`, `docs/ENTITY-DELETION.md` ; commit `f6f73d7`. Pas de restauration admin. |
| C7 | Relations éditoriales : création sourcée, correction, publication/retrait distincts ; ajout et correction de preuves et Sources. | `apps/api/src/admin/manual-relations.ts`, `apps/api/src/admin/provenance.ts`, `apps/api/src/admin/evidence-add.ts`, `apps/api/src/manual-relations.test.ts`, `apps/api/src/provenance.test.ts`, `apps/api/src/evidence-add.test.ts`. Les révisions détaillées des relations/Sources/Evidence ne sont pas implémentées. |
| C8 | Recherche simple titre/résumé/slug et filtres de bibliothèque ; liste admin paginée et filtres éditoriaux ; recherche spécifique dans staging et qualification. | `apps/api/src/store.ts`, `apps/api/src/admin/store.ts`, `apps/api/src/reference-qualification.ts`, `apps/web/src/App.tsx`, `apps/api/src/app.test.ts`, `apps/api/src/admin.test.ts`. `contains` insensible à la casse, pas de moteur PostgreSQL plein texte. Liste publique plafonnée à 100, sans pagination/total. |
| C9 | Graphe public/admin, recherche et filtres, voisinage, zoom, déplacement, plein écran, partage d'état public et positions locales. Public limité aux fiches/relations PUBLISHED+PUBLIC. | `apps/api/src/graph.ts`, `apps/web/src/GraphPage.tsx`, `apps/web/src/GraphCanvas.tsx`, `apps/api/src/graph.test.ts`, `apps/web/src/GraphPage.test.tsx`, `docs/GRAPH.md`. Les filtres et positions locaux ne sont pas des modifications du lore. |
| C10 | Catalogue de 27 types, 7 symétriques, 20 inverses ; 47 formulations, catégories éditoriales et confirmation humaine. | `packages/shared/src/relation-catalog.ts`, `prisma/relation-catalog.ts`, `prisma/migrations/20261011120000_editorial_relation_catalog/migration.sql`, `apps/api/src/relation-catalog.test.ts`, `docs/RELATION-CATALOG.md` ; commit `d8e9d19` et API publique à 27 types. |
| C11 | Navigation wikilinks, alias/chemins/ancres ; références entrantes/sortantes, diagnostics et graphe de mentions admin, sans réécrire le Markdown ni créer des Relation. | `apps/api/src/obsidian-references.ts`, `apps/web/src/WikiMarkdown.tsx`, `apps/web/src/ObsidianReferences.tsx`, `apps/api/src/obsidian-references.test.ts`, `apps/web/src/WikiMarkdown.test.tsx`, `docs/OBSIDIAN-REFERENCES.md` ; commit `f4afd84`. |
| C12 | File « Relations à qualifier », filtres, compteurs, pagination et formulaire de création assisté depuis une référence. | `apps/api/src/reference-qualification.ts`, `apps/web/src/AdminReferenceQueue.tsx`, `apps/web/src/reference-relation.ts`, `apps/api/src/reference-qualification.test.ts`, `apps/web/src/AdminReferenceQueue.test.tsx`, `docs/REFERENCE-QUALIFICATION.md` ; commits `259c5ae`, `7847bee`. |
| C13 | Ignorances persistantes/révocables avec auteur, date, empreinte et révision ; changement du contexte demandant une nouvelle revue ; transaction SERIALIZABLE. | `prisma/schema.prisma` (ObsidianReferenceIgnore), `prisma/migrations/20261011000000_obsidian_reference_ignores/migration.sql`, `apps/api/src/reference-qualification.ts`, `apps/api/src/reference-qualification.test.ts`. Ignorer ne supprime ni navigation ni arêtes automatiques. |
| C14 | Staging générique privé, Sources, lots, snapshots et réceptions immuables, dry-run et idempotence ; pas de création éditoriale automatique. | `apps/api/src/ingestion/service.ts`, `apps/api/src/ingestion/repository.ts`, `apps/web/src/AdminIngestion.tsx`, `apps/api/src/ingestion/ingestion.test.ts`, `docs/INGESTION.md` ; commit `07c280f`. |
| C15 | Matching déterministe : identité/provenance, titres/alias, slug et similitude conservatrice ; suggestions explicables, aucune acceptation automatique. | `apps/api/src/ingestion/matching.ts`, `apps/api/src/ingestion/matching-selection.test.ts`, `apps/api/src/ingestion/matching.test.ts`, `docs/MATCHING.md` ; commit `6e8d82b`. Ce n'est pas de l'extraction IA. |
| C16 | Associations staging humaines confirmées/rejetées/remplacées/retirées, persistantes entre versions selon l'identité ; auteur et révision optimiste. | `apps/api/src/ingestion/association.ts`, `apps/api/src/ingestion/association-routes.ts`, `apps/web/src/IngestionAssociationPanel.tsx`, `apps/api/src/ingestion/association.test.ts`, `docs/ASSOCIATION.md` ; commit `adffb6e`. Ces décisions seules n'écrivent pas d'Entity/Evidence/Revision. |
| C17 | Création depuis staging, promotion Obsidian groupée avec plan/empreinte approuvés et mise à jour humaine d'une fiche confirmée DRAFT/PROPOSED. | `apps/api/src/ingestion/proposal.ts`, `apps/api/src/ingestion/promotion.ts`, `apps/api/src/ingestion/update.ts`, tests `proposal.test.ts`, `promotion.test.ts`, `update.test.ts` dans le même dossier ; `docs/STAGING-PROMOTION.md`, `docs/STAGING-UPDATE.md` ; commits `40ddf3d`, `9c02044`, `eee7204`. Mise à jour depuis staging interdite pour PUBLISHED/ARCHIVED ; publication séparée. |
| C18 | Convertisseur Obsidian local, coffre lu sans mutation, rapport/dry-run, sélection et exclusion des notes vides ; propositions de types depuis les dossiers. | `apps/api/src/ingestion/obsidian.ts`, `apps/api/src/ingestion/obsidian-markdown.ts`, `apps/api/src/ingestion/obsidian-files.ts`, `apps/api/src/ingestion/obsidian.test.ts`, `docs/OBSIDIAN-IMPORT.md` ; commits `f6147f8`, `a128572`. Les classements ambigus demandent une décision humaine. |
| C19 | Markdown original, chemin, Source, variantes, snapshots et provenance de promotion conservés ; import JSON éditorial transactionnel séparé. | `apps/api/src/ingestion/obsidian.ts`, `apps/api/src/ingestion/promotion-repository.ts`, `apps/api/src/import/service.ts`, `apps/api/src/import/import.test.ts`, `docs/IMPORT.md`, `docs/STAGING-PROMOTION.md`. Conservation technique ≠ validation canonique. |
| C20 | API publique de consultation `/api/v1`, routes auth et administration `/api/admin`, contrats partagés, santé DB. | `apps/api/src/app.ts`, `apps/api/src/admin/routes.ts`, `packages/shared/src/index.ts`, `apps/api/src/app.test.ts`, `apps/api/src/admin.test.ts`, `docs/API.md`. L'API admin n'est pas versionnée comme la publique ; aucun consommateur Carte n'est branché. |

### Corpus et qualification

**État fourni par l'utilisateur : 161 notes Markdown, dont 31 emplacements réservés, et 130 fiches issues de l'import initial.** Ces nombres décrivent le corpus annoncé, pas une nouvelle requête à la base MJ. Les fixtures 161/31/130 et 130 fiches/296 paires figurant dans les tests sont **fictives** et ne certifient pas les compteurs de production. Ceux-ci restent À vérifier dans une recette autorisée.

| Couche | Ce qui existe | Ce que cela ne certifie pas |
| --- | --- | --- |
| Source et staging | Original, identité, versions, réceptions et provenance. | Qu'une Entity soit créée ou qu'un fait soit canon. Une note réservée n'est pas une fiche lore vide à publier. |
| Entity créée | Fiche proposée, Evidence, Revision et association après action humaine de promotion. | Publication, visibilité publique ou validation de tous ses faits. |
| Référence Obsidian | Mention résolue, offsets, navigation et arête dérivée en lecture seule. | Relation sémantique, provenance éditoriale nouvelle ou validation humaine. FOUND désigne une note, pas nécessairement une Entity. |
| Relation éditoriale | Type choisi, énoncé, Source et Evidence, création humaine. | Statut PUBLISHED/PUBLIC automatique. La file peut la compter QUALIFIED même si elle est PROPOSED ou ARCHIVED. |
| Canon et publication publique | PUBLISHED après validation explicite ; PUBLIC exigé en plus pour exposition anonyme. | Publication en cascade des voisins, preuves, Sources ou relations. |
| Ignorance | Décision de ne pas qualifier une paire dans ce contexte. | Suppression de la référence ou interdiction permanente ; décision révocable et invalidable. |

### Limites techniques confirmées

Recherche plein texte et pagination publique absentes ; permissions joueurs fines et retcon non finalisés ; Revision limitée aux Entity ; suppression sans restauration ; APIs admin non versionnées ; pièces jointes du coffre non ingérées comme fiches ; classification et relations sémantiques non automatiques.

Le moteur de références est recalculé par requête avec des limites de 2 000 fiches, 4 000 associations, 32 Mio de Markdown et 100 000 occurrences. La qualification ajoute des bornes de 50 000 relations et 100 000 décisions. Les mesures locales sur fixtures ne garantissent pas les performances VPS. Les documents signalent des dépassements de délais de tests web sous Windows et un bundle légèrement supérieur au seuil Vite de 500 ko ; la CI Linux consultée passe sans ces adaptations locales.

## Carte Hesta

Références locales : README (preuve historique conservée en archive privée) et roadmap P3 à P9 (preuve historique conservée en archive privée). Il s'agit d'un état des lieux fonctionnel, pas de l'audit approfondi ni d'une proposition de réorganisation.

| Preuve | Socle livré | Code et tests/documentation confrontés |
| --- | --- | --- |
| M1 | Accueil, communauté/compteur Discord avec fallback, dons/crédits, configuration admin et changelog. | `index.html`, `js/home.js`, `js/home-admin.js`, `js/changelog.js`, `server.js` ; `tests/ui/home.spec.js`, `tests/ui/changelog.spec.js`, `tests/ui/admin-entrypoints.spec.js`. |
| M2 | Carte, lieux, marqueurs, recherche/filtres, favoris, clustering, navigation/historique et types/icônes. | `map/index.html`, `js/mapController.js`, `js/dataService.js`, `js/ui/filtersManager.js`, `js/ui/historyManager.js`, `js/shared/locationSchema.mjs` ; `tests/ui/selection.spec.js`, `tests/ui/filters.spec.js`. |
| M3 | Fiches avec résumé, lore/histoire, géographie, médias/audio, PNJ et familles ; édition et uploads admin. | `js/ui/infoPanel.js`, `js/ui/locationEditor.js`, `js/uiController.js`, `server/routes/locations.js`, `server.js` ; `tests/ui/selection.spec.js`, `tests/ui/admin-entrypoints.spec.js`. Ces champs narratifs JSON ne sont pas des Entity Codex. |
| M4 | OAuth Discord, profils/personnages, groupes JDR et administration. | `server/routes/auth.js`, `server.js` (profil/utilisateurs/groupes), `js/ui/characterModel.mjs`, `js/ui/profileCustomization.mjs`, `js/ui/userAdminPanel.js` ; `tests/api/auth.spec.js`, `tests/ui/admin-entrypoints.spec.js`, `tests/unit/run.mjs`. |
| M5 | Événements de quête avec progression existante et flux SSE pour lieux/annotations/live. | `server/routes/questEvents.js`, `server.js` (`/api/events/stream`), `js/ui/eventsFeed.js`, `js/uiController.js`. Pas de preuve d'un moteur complet de jalons/transitions ou de comptes à rebours. |
| M6 | Chronologie horizontale, recherche/filtres, URL partageable, liens carte/frise, médias/lightbox, admin CRUD et ordre/visibilité. | `timeline/index.html`, `js/timeline.js`, `js/ui/timelineAdminPanel.js`, `server/routes/timeline.js` ; `tests/ui/timeline.spec.js`, `tests/ui/admin-entrypoints.spec.js`. GET public contrôlé. |
| M7 | Planning daté mensuel, sessions candidates/confirmées, disponibilités par date/heure, saisie multi-date, réponses/statuts, groupes et synthèses MJ, admin. | `planning/index.html`, `js/planning.js`, `js/ui/availability.mjs`, `server.js` (`/api/admin/planning/sessions`, `/api/planning/my-availability`, réponses) ; `tests/api/planning.spec.js`, `tests/ui/planning.spec.js`. GET public contrôlé. |
| M8 | API Node avec routeur maison, persistance JSON, validations partagées et verrous fichiers. | `server.js`, `server/routes/index.js`, `server/utils/fileLock.js`, `js/shared/locationValidation.mjs`, `docs/DATA-MANAGEMENT.md` ; `tests/unit/run.mjs`. Pas de PostgreSQL Carte ni de lecture Codex implémentée. |
| M9 | Annotations persistantes et suppression synchronisée ; peinture éphémère locale et déplacement libre de carte. | `server/routes/annotations.js`, `js/ui/annotationModel.mjs`, `js/mapController.js`, `js/ui/mapControlsManager.js` ; `tests/unit/run.mjs`, `tests/ui/selection.spec.js`. Peinture locale ≠ parcours exporté ou collaboration complète. |
| M10 | Tests et CI/livraison consultés ; responsive déjà travaillé ; séparations admin existantes. | `.github/workflows/ci.yml`, `.github/workflows/deploy.yml`, `tests/ui/responsive.spec.js`, `tests/ui/admin-entrypoints.spec.js` ; résultats CI ci-dessus. Mobile exhaustif, dette UI et exploitation restent ouverts dans P9. |

Limites et travaux restants : UiController volumineux et extractions partielles, compatibilités legacy, observabilité limitée, médias lourds/LFS, divergence possible entre JSON édités sur VPS et Git, cookie `map_session` fixe. Le workflow déploie sur push indépendamment du résultat CI ; l'automatisation existe mais son déclenchement n'est pas une garantie de validation préalable.

La chronologie actuelle n'est pas un replay de la carte. Les événements de quête existants ne clôturent pas les quêtes riches de P8. Les améliorations mobiles livrées ne clôturent pas la finition complète de toutes les surfaces. Une base Carte, la lecture Codex, les calques, l'export, le narrateur et les autres objectifs P8 restent futurs.

## Système PA

Références locales : [README et roadmap embarquée](https://github.com/Daneisra/Armures-d100-Hesta/blob/25df663066f45f5bb9cc6e045519df042f615afc/README.md) ; `BUSINESS-RULES.md`, `DATA-AUDIT.md`, `PRINT-AUDIT.md`, `RELEASE-1.0.0.md`.

| Preuve | État vérifié | Code et tests/documentation confrontés |
| --- | --- | --- |
| PA1 | Calculs PA/malus/compatibilité/enchantements/boucliers, usure/PV, réparation et Constitution ; règles de référence figées pour 1.0.0. | `src/lib/calc.ts`, `src/lib/wear.ts`, `src/lib/repair.ts`, `src/lib/pv.ts`, `src/components/WearWidget.tsx`, `BUSINESS-RULES.md` ; tests `calc.test.ts`, `wear.test.ts`, `repair.test.ts`, `pv.test.ts`, `businessScenarios.test.ts` dans `tests/`. |
| PA2 | Audit des dix JSON officiels et validation stricte des imports/références/bornes ; trois scénarios complets sur les valeurs officielles. | `src/data/`, `src/lib/importValidation.ts`, `DATA-AUDIT.md` ; `tests/defaultData.test.ts`, `tests/businessScenarios.test.ts`, `tests/importValidation.test.ts`. Validation informatique ≠ nouvel équilibrage des règles de jeu. |
| PA3 | Matériaux/comparateur, builds, graphiques, stockage local et éditeur local. | `src/components/Calculator.tsx`, `src/pages/MaterialsPage.tsx`, `src/pages/BuildsPage.tsx`, `src/pages/EditorPage.tsx`, `src/buildCatalog.ts` ; `tests/catalog.test.ts`, `tests/importFeedback.test.ts`. L'éditeur a cinq domaines, pas toute l'extension 1.1.x. |
| PA4 | Fiches imprimables Standard/Compact/Détaillé ; rapport de neuf PDF sur Chrome, Edge et Firefox du 27 septembre. | `src/pages/PrintBuildPage.tsx`, `src/index.css`, `PRINT-AUDIT.md` ; commit `c698862`. Recette automatisée documentée, non rejouée ici ; imprimante physique/dialogue natif hors de ce rapport. |
| PA5 | Application statique sans backend, thèmes, aide/changelog, navigation mobile et PWA/cache versionné. | `src/App.tsx`, `src/pwa.ts`, `public/sw.js`, `public/manifest.webmanifest`, `src/pages/HelpPage.tsx`. Contrôle public HTTP 200 ; recette exhaustive offline/accessibilité non rejouée. |
| PA6 | Version 1.0.0, commit de préparation, tag local résolu sur ce commit, release GitHub publiée et workflow réussi. | `package.json`, `src/pages/ChangelogPage.tsx`, `RELEASE-1.0.0.md`, commit `25df663`, tag `v1.0.0`, liens release/Actions ci-dessus. Le README annonçant « publication à effectuer » est dépassé. |
| PA7 | Extension d'éditeur, diff GitHub/local, récupération du catalogue et proposition par PR sécurisée restent prévues. | Roadmap 1.1.x du README ; `src/pages/EditorPage.tsx` (chassis/materials/qualities/shields/params), `src/catalog.ts`. Pas de service d'écriture GitHub implémenté ni de backend à présenter comme livré. |

## Contradictions et points à vérifier

| Déclaration ancienne | Preuve actuelle | Conséquence pour la roadmap globale |
| --- | --- | --- |
| PA : release/tag 1.0.0 encore à faire. | Tag local, release publique non draft et déploiement `25df663`. | Jalon 1.0.0 livré ; ne plus le conserver comme prochaine priorité. Déclarations locales de préparation à actualiser dans une tâche dédiée. |
| PA : lien Carte dans un nouvel onglet. | `src/App.tsx` ne met pas de target sur ce lien ; celui vers GitHub ouvre un nouvel onglet. | Navigation interapplications dans le même onglet ; contradiction documentaire signalée, dépôt laissé intact. |
| Codex : README mentionnant quatre types de seed. | Catalogue/code/migration et API publique à 27 types. | Catalogue 27 livré ; seed historique de quatre types n'est plus l'état courant. |
| Codex : `DATA-MODEL.md` reporte extraction wikilinks et graphe ; documents anciens disent « aucune suppression ». | C6/C9/C11 et leurs tests/commits récents. | Navigation, graphe et suppression individuelle livrés ; ne pas étendre la suppression aux Sources/preuves/relations autonomes. |
| Codex : documents de jalons disant migration « non exécutée ». | Journal du déploiement du dernier commit : `OK: Apply Prisma migrations`, santé DB ; catalogue public à 27. | Déploiement établi pour ce commit ; la recette privée et la concurrence PostgreSQL restent à vérifier séparément. |
| Codex : présence des enums PLAYERS/SECRET, statut PROPOSED ou file QUALIFIED. | Filtres serveur, whitelist et calcul d'état de C2/C3/C12. | Enums ≠ permissions joueurs complètes ; proposition/qualification ≠ canon/publication. |
| Carte : `docs/ARCHITECTURE.md` décrit encore une semaine type. | Code planning daté, routes/JSON et tests M7 ; P7/P7.1 livrés. | Agenda daté déjà livré ; la semaine type legacy n'est pas la référence fonctionnelle. |
| Hub : Codex présenté comme déjà accessible depuis le portail déployé. | Diff local et absence d'URL Codex dans le bundle public du Hub. | Intégration développée et testée localement, livraison encore à faire. |

À vérifier avec l'opérateur : compteurs privés du corpus, nombre et validité sémantique des relations éditoriales, recette admin réelle des dernières fonctions, concurrence PostgreSQL multiconnexion, sauvegardes/restauration, renouvellement Certbot, expérience tactile/lecteurs d'écran et cohérence des données Carte VPS/Git. Aucun de ces points n'est coché sur la seule base d'un workflow vert ou d'une fixture.

## Validation de cette synchronisation

Validation locale du 12 octobre 2026 : `npm run lint`, `npm run build` et `git diff --check` réussis. Les trois documents sont analysés en Markdown GFM avec les bibliothèques déjà installées dans le Codex, sans ajout de dépendance ni écriture dans ce dépôt : tableaux et blocs de code valides, 46 liens/ancres contrôlés et 200 occurrences de chemins de preuve vérifiées dans les dossiers concernés. La conversion de la roadmap en arbre HTML conserve ses cinq tableaux. Les sections E0–E8 et leurs objectifs futurs ont été relus.

Les empreintes SHA-256 de `src/App.tsx` et `src/App.css` restent identiques à celles relevées avant la synchronisation ; l'intégration Codex est conservée. Les trois autres dépôts restent propres aux mêmes HEAD. Aucun commit, push, déploiement ou changement de données n'est réalisé.

Les journaux CI ci-dessus sont consultés, pas rejoués ; les tests des trois autres dépôts et les recettes privées restent en lecture seule. La maintenance de ce relevé et de la roadmap est décrite dans [Gouvernance et synchronisation](../ROADMAP.md#gouvernance-et-synchronisation).
