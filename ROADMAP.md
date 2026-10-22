# Roadmap globale de l'écosystème Hesta

Cette roadmap synthétise les priorités des quatre applications indépendantes. Actualisation ciblée du **22 octobre 2026** : livraisons Carte Hesta validées par l'opérateur, dépôts officiels, liens et documentation. Les acquis détaillés des autres applications conservent les limites de leurs documents locaux ; aucun nouvel audit général ni contrôle de données privées n'est effectué ici.

Le [relevé du 12 octobre](docs/ECOSYSTEM-AUDIT-2026-10.md) reste une photographie historique, antérieure à la sécurisation de Carte Hesta ; il ne décrit pas l'exploitation actuelle.

## Lecture des statuts

| Statut | Sens |
| --- | --- |
| Livré | Code présent et livraison de la révision établie ; la recette métier réelle est précisée séparément. |
| Développé, non déployé | Code local disponible ; sa validation et sa livraison sont deux étapes distinctes. |
| Partiel | Un socle existe, mais une partie du périmètre reste à traiter. |
| En cours | Travail commencé et attesté dans le dépôt ; pas une simple intention. |
| Prévu | Objectif conservé, sans réalisation du périmètre demandé démontrée. |
| À vérifier | Preuve insuffisante, recette non réalisée ou état réel non consulté. |

Une case cochée clôt uniquement le périmètre qu'elle nomme. Elle ne certifie ni un corpus canonique, ni un audit complet de sécurité, ni la validation de tous les parcours en production. Les identifiants H, C, M et PA renvoient aux fichiers/tests/commits du [relevé de preuves](docs/ECOSYSTEM-AUDIT-2026-10.md).

## État actuel de l'écosystème

| Application | Rôle et état | Livraison / limite |
| --- | --- | --- |
| [Hesta Hub](https://hesta.dannytech.fr/) | Portail central, accès aux trois applications, communauté, Discord et support général. | Carte Codex déjà livrée. Cette harmonisation reste en PR ; invitation Discord générale confirmée et intégrée. |
| [Carte Hesta](https://cartehesta.dannytech.fr/) | Carte, lieux, chronologie, planning et administration sécurisés ; [dépôt officiel public](https://github.com/Daneisra/Carte-Hesta). | Site en production, CI Linux et Deploy manuel protégés opérationnels. Mécanisme systemd installé ; véritable redémarrage encore à observer. |
| [Hesta Codex](https://codexhesta.dannytech.fr/) | Connaissances, édition, provenance et relations ; futur référentiel canonique du lore après qualification. | Socle livré, publication explicite selon les permissions ; intégration Carte/chronologie non réalisée. |
| [Système PA](https://pahesta.dannytech.fr/) | Règles d'armure, calculs et personnalisations locales indépendants. | Version stable 1.0.0 publiée ; évolutions locales conservées. |

### Terminé — sécurisation et exploitation de Carte Hesta

- [x] Sécurisation du stockage, des API, des autorisations et des médias.
- [x] Reconstruction indépendante du dépôt GitHub public ; ancien historique conservé en privé.
- [x] Migration et remise en production, données et permissions préservées.
- [x] CI automatique et premier Deploy manuel protégé validés, rollback du code disponible.
- [x] Mécanisme systemd installé et actif ; premier démarrage sans interruption.
- [ ] Observer le retour public lors d'un véritable redémarrage normal du VPS.

Les travaux de cette mission transverse sont des PR non fusionnées, sans déploiement. Les liens et textes préparés ne sont pas présentés comme déjà livrés.

## Vision et responsabilités

- **Hesta Hub** : porte d'entrée publique, communauté, Discord et support général, sans compte obligatoire.
- **Carte Hesta** : exploration spatiale, lieux, chronologie et logistique des sessions ; bugs suivis dans ses propres Issues.
- **Système PA** : armures, matériaux, builds et calculs.
- **Hesta Codex** : connaissance durable, provenance et relations éditoriales.
- Les imports et analyses de sessions alimentent des **propositions à valider**, jamais directement le canon.

Principe directeur : **un univers, plusieurs outils, une connaissance reliée**.

### Architecture actuelle et cible progressive

```text
Hesta Hub statique
  +-- Carte Hesta : HTML/JS + API Node + JSON
  +-- Hesta Codex : React + API Express/Prisma + PostgreSQL
  +-- Système PA  : React + données/stockage local
```

Aucune API ni base commune n'est imposée aux quatre applications. La cible historique « Hesta API / connaissance reliée » reste une perspective de contrats de lecture du Codex et d'import contrôlé. Carte Hesta ne consomme pas encore cette API ; Système PA demeure indépendant. Les liens du portail ne créent aucune dépendance technique.

L'[architecture cible du Codex](docs/HESTA-CODEX-ARCHITECTURE.md) est une référence de conception ; les statuts actuels sont établis par cette roadmap et les projets concernés.

## E0 — Socle de l'écosystème

**Socle livré, y compris la carte Codex du portail ; harmonisation du 22 octobre préparée en PR.** Preuves [H1–H3](docs/ECOSYSTEM-AUDIT-2026-10.md#hesta-hub) et [CI/livraison](docs/ECOSYSTEM-AUDIT-2026-10.md#preuves-de-ci-et-de-livraison).

- [x] Portail central public `hesta.dannytech.fr`, léger, statique et sans backend.
- [x] Quatre applications dans des dépôts séparés et déployées indépendamment.
- [x] Navigation Hub/Carte/Système PA et signatures communes HESTA ; liens interapplications dans le même onglet.
- [x] Hesta Codex déployé sur `codexhesta.dannytech.fr`.
- [x] CI/CD GitHub Actions vers le VPS : workflows et exécutions réussies consultés pour les quatre dépôts.
- [x] HTTPS public opérationnel sur les quatre URL au contrôle.
- [x] Harmonisation initiale des README et identité typographique commune.
- [x] Carte Hesta Codex du Hub livrée, réutilisant ApplicationCard/grille/accent existants et précisant les restrictions de publication.
- [ ] **Partiel :** poursuivre la cohérence des README/métadonnées à quatre applications et corriger les déclarations anciennes relevées, sans uniformiser leurs designs.
- [ ] **À vérifier :** renouvellement Certbot, configuration Nginx effective et procédures d'exploitation/sauvegarde ; un HTTP 200 ne les valide pas entièrement.

## E1 — Applications existantes : acquis, maintenance et suites

### Système PA — jalon 1.0.0 livré

Les cinq objectifs de stabilisation ne sont plus futurs. Preuves [PA1–PA6](docs/ECOSYSTEM-AUDIT-2026-10.md#système-pa), [release publiée](https://github.com/Daneisra/Armures-d100-Hesta/releases/tag/v1.0.0) et [CI/livraison](https://github.com/Daneisra/Armures-d100-Hesta/actions/runs/36351948151).

- [x] Geler les règles métier de référence : BUSINESS-RULES et tests de calcul/usure/réparation/PV.
- [x] Vérifier les dix JSON officiels et leurs références/bornes.
- [x] Valider les tests métier et trois scénarios complets sur les données officielles.
- [x] Valider les neuf PDF Standard/Compact/Détaillé sur Chrome, Firefox et Edge, selon PRINT-AUDIT ; dialogue natif et imprimante physique non couverts.
- [x] Publier/taguer `v1.0.0` sur `25df663` et livrer cette version.
- [x] Calculateur, suivi combat PA/PV, réparation, matériaux/comparateur, builds, graphiques, éditeur local, aide, changelog, responsive et PWA.

**Prévu — roadmap locale 1.1.x :**

- [ ] Étendre l'éditeur aux catégories, enchantements, résistances, matériaux de bouclier et tables de réparation.
- [ ] Prévisualiser les différences GitHub/local et signaler les conflits.
- [ ] Récupérer les mises à jour du catalogue officiel sans écraser les personnalisations locales.
- [ ] Proposer les JSON validés par PR GitHub, avec authentification sécurisée et service adapté ; aucun jeton dans l'application statique/localStorage.
- [ ] Synchroniser les données officielles après fusion/livraison, avec migration/conflits et sauvegarde exportable.

Maintenance, corrections et évolutions justifiées par l'usage restent prioritaires après 1.0.0. La release est publiée malgré les cases/documentations locales de préparation encore périmées.

### Carte Hesta — sécurisation et reconstruction terminées

- [x] Accueil, carte interactive, lieux, médias/audio, chronologie et planning.
- [x] Authentification Discord, profils, personnages, groupes privés et administration selon les permissions du compte.
- [x] Stockage persistant hors code et artefacts ; fixtures entièrement synthétiques.
- [x] Filtrage serveur et publication explicite ; médias partagés refusés si un parent reste privé.
- [x] Nouveau dépôt public [Carte-Hesta](https://github.com/Daneisra/Carte-Hesta), avec [signalement de bugs](https://github.com/Daneisra/Carte-Hesta/issues/new/choose).
- [x] Migration, HTTPS public, CI complète et Deploy manuel protégé avec rollback non destructif.
- [x] Mécanisme systemd de restauration après arrêt normal installé, sans réouverture en cas d'état incertain.
- [ ] Observer un vrai redémarrage ; poursuivre la maintenance des régressions et la finition UX justifiée par l'usage.

L'ancien historique et les anciennes données ne sont pas réintroduits dans Git. La [roadmap locale](https://github.com/Daneisra/Carte-Hesta/blob/main/ROADMAP.md) et le [runbook](https://github.com/Daneisra/Carte-Hesta/blob/main/docs/OPS-RUNBOOK.md) restent les références techniques actuelles.

La **prochaine grande étape** est l'intégration progressive Hesta Codex ↔ Carte Hesta ↔ chronologie : commencer par l'inventaire des sources et la qualification canonique, pas par un nouvel audit général de sécurisation.

## E2 — Hesta Codex : socle livré et périmètres partiels

**Socle livré ; recette MJ et qualification du corpus à poursuivre selon les documents du Codex.** Preuves [C1–C20](docs/ECOSYSTEM-AUDIT-2026-10.md#hesta-codex).

### Fonctionnalités développées, testées et déployées

- [x] Dépôt et monorepo React/TypeScript/API Express/contrats partagés.
- [x] PostgreSQL, Prisma et migrations : livraison avec migrations et santé DB établies (C1).
- [x] Entity, Relation, Evidence, Revision, Source et catalogue RelationType ; contraintes SQL, UUID, types de fiches et sous-types de lieux (C1–C2).
- [x] Slugs, alias, tags et Markdown (C2).
- [x] OAuth Discord, sessions persistantes/révocables, whitelist MJ et contrôle serveur des accès/mutations (C3).
- [x] Interface publique de consultation **des seules fiches PUBLISHED + PUBLIC** ; elle peut être vide sans défaut de fonctionnalité (C3/C20).
- [x] Administration : création, modification, publication et retrait de publication, avec Source/Evidence et transactions (C4–C5).
- [x] Suppression définitive individuelle avec bilan et confirmation, en conservant Sources et staging (C6).
- [x] Création/correction/publication des relations et ajout/correction de provenance (C7).
- [x] Recherche simple et filtres ; pagination des listes admin (C8).
- [x] Graphe interactif public/admin, exploration, filtres, plein écran, partage et positions locales (C9).
- [x] Catalogue de **27 types éditoriaux**, inverses/symétriques et choix humain du sens (C10).
- [x] Wikilinks navigables, références entrantes/sortantes et diagnostics, sans réécriture du Markdown (C11).
- [x] File de qualification, filtres/pagination, compteurs et création assistée de relations (C12).
- [x] Ignorances persistantes et révocables, empreintes invalidables et contrôle de concurrence (C13).
- [x] Staging privé, matching déterministe et associations humaines persistantes (C14–C16).
- [x] Création depuis staging, promotion groupée Obsidian et mise à jour humaine de fiches confirmées DRAFT/PROPOSED (C17).
- [x] Convertisseur/import Obsidian contrôlé et conservation du Markdown/provenance (C18–C19).
- [x] Historique des **Entity** : révision initiale, modifications/publication/retrait et mises à jour staging (C5/C17).
- [x] API de consultation `/api/v1`, authentification et administration protégée (C20).

### Fonctionnalités partielles et objectifs conservés

- [ ] **Partiel :** recherche plein texte ; recherche simple livrée, moteur plein texte absent.
- [ ] **Partiel :** pagination/total de la bibliothèque publique ; liste bornée à 100 fiches.
- [ ] **Partiel :** permissions fines joueurs/MJ/secret ; les enums et barrières public/admin existent, pas un système de rôles joueurs complet.
- [ ] **Partiel :** brouillon/proposé/canon/retcon ; DRAFT/PROPOSED/PUBLISHED/ARCHIVED existent, retcon et son workflow restent à définir.
- [ ] **Partiel :** historique des modifications ; Revision Entity livré, audit/révisions des relations/Sources/preuves non complet.
- [ ] **Partiel :** versionner/stabiliser le contrat privé et les contrats destinés aux autres applications ; API publique v1 livrée, admin non versionnée et Carte non branchée.
- [ ] Finaliser la validation éditoriale du corpus et ouvrir les contenus explicitement validés selon leurs permissions.
- [ ] Valider en recette réelle les parcours admin récents, les compteurs et la concurrence PostgreSQL multiconnexion.
- [ ] Consolider performance/volumétrie des références et du graphe, délais de tests Windows et poids du bundle.
- [ ] Compléter les limites locales documentées : restauration après suppression, opérations indépendantes sur relations/Sources/preuves, pièces jointes et dates structurées du calendrier Hesta.

Une référence Obsidian est une mention dérivée ; une ligne QUALIFIED signifie qu'une relation éditoriale existe, pas qu'elle est canonique ou publiée. Une ignorance ne supprime pas la référence. Le stockage des états/visibilités ne clôt pas tous leurs workflows.

## E3 — Migration du savoir existant

**Outillage Obsidian livré ; import initial annoncé ; consolidation du corpus et migration Carte partielles/prévues.** Preuves [C14–C19 et corpus](docs/ECOSYSTEM-AUDIT-2026-10.md#corpus-et-qualification).

### Obsidian

- [x] Lire les Markdown par un convertisseur local en lecture seule, produire un rapport/dry-run et un lot staging.
- [x] Exclure les emplacements réservés, suggérer types/sous-types depuis les dossiers et permettre les exceptions humaines.
- [x] Conserver le Markdown original, le chemin, la Source, les réceptions et la provenance de promotion.
- [x] Détecter alias/doublons/candidats et liens non résolus/ambigus, sans résolution arbitraire.
- [x] Produire et approuver un plan avant création groupée de fiches PROPOSED/GM.
- [x] Transformer les wikilinks résolus en **navigation/références automatiques** ; assistance de qualification humaine en relations éditoriales.
- [ ] Poursuivre la qualification du corpus privé dans le Codex, sans déduire sa publication des imports ou des fixtures.
- [ ] Poursuivre les imports nécessaires et corriger les classifications/diagnostics restant à traiter.
- [ ] Qualifier les mentions en relations typées sourcées ; ne pas convertir automatiquement une mention en fait canon.
- [ ] Valider manuellement les fiches sensibles et leurs niveaux de visibilité.

**Staging ≠ Entity créée ≠ référence détectée ≠ relation éditoriale validée ≠ canon public.** Les imports ne valent jamais autorisation de publication.

### Carte Hesta — migration progressive à définir

- [ ] Importer progressivement `locations.json`.
- [ ] Extraire PNJ, familles, instances et lore imbriqués en entités reliées.
- [ ] Importer les événements de `timeline.json`.
- [ ] Conserver les coordonnées, types d'icônes et données purement cartographiques dans Carte Hesta pendant la migration.
- [ ] Construire la correspondance entre anciens identifiants/noms et UUID Codex.

Le socle d'ingestion accepte des Sources HESTA_MAP, mais aucun connecteur/migration Carte n'est démontré. Aucune de ces opérations n'est entreprise par la synchronisation documentaire.

## E4 — Sources Discord

**Prévu pour le connecteur ; socle d'ingestion/matching déjà livré.** C14–C16 et `SourceKind.DISCORD` préparent le stockage, pas la collecte des salons. OAuth Discord est un mécanisme d'authentification distinct.

- [ ] Bot/importeur limité à une liste blanche de salons.
- [ ] Collecter et conserver l'identifiant du message, salon, auteur et date.
- [ ] Prendre en charge pièces jointes et liens associés.
- [ ] Extraire entités et faits sous forme de propositions.
- [ ] Brancher la détection des entités existantes sur le flux Discord ; matching générique déjà disponible.
- [ ] File de validation MJ dédiée aux propositions Discord ; ne pas la confondre avec la file de qualification des références Obsidian.
- [ ] Refuser, fusionner ou corriger une proposition ; les décisions d'association ne sont pas une fusion de contenus.
- [ ] Lien retour vers le message Discord quand possible.

Aucune donnée Discord ne devient canon automatiquement. Une enum, une Source ou un staging de texte ne clôt pas ces objectifs de connecteur.

## E5 — Sessions JDR et vidéos

**Prévu pour le pipeline ; modèle de provenance temporelle existant.** Entity SESSION, Source YOUTUBE et champs temporels d'Evidence sont présents (C1), sans transcription ni extraction IA démontrées.

Pipeline cible conservé :

```text
Vidéo / audio -> transcription horodatée -> segments
  -> extraction de personnages, lieux, organisations, artefacts, événements,
     révélations, changements d'état et relations
  -> comparaison au Codex -> propositions à valider -> canon après revue humaine
```

- [ ] Importer les métadonnées d'une session par un parcours dédié.
- [ ] Récupérer une transcription YouTube autorisée ou transcrire l'audio.
- [ ] Conserver les timestamps issus de ce pipeline et les relier aux preuves ; champs techniques déjà disponibles.
- [ ] Gérer si possible la séparation des intervenants.
- [ ] Générer résumé de session et chapitrage.
- [ ] Extraire faits et entités avec niveau de confiance.
- [ ] Associer chaque proposition à sa source temporelle.
- [ ] Lien direct vers le passage vidéo.
- [ ] Garantir dans ce futur pipeline qu'aucune fiche canon n'est modifiée automatiquement.

L'analyse visuelle des vidéos reste une suite possible pour cartes, handouts et textes affichés ; l'audio/transcription est prioritaire. Les commandes d'import JSON/staging existantes ne réalisent pas ce pipeline.

## E6 — Connecter Carte Hesta au Codex

**Prochaine grande étape, non réalisée : reprise du plan d’intégration Codex ↔ Carte ↔ chronologie.** L'API Codex existe (C20), mais aucun consommateur dans Carte Hesta n'est démontré (M8).

- [ ] Inventorier les sources actuelles des lieux, personnages, événements et de la chronologie : propriétaires, formats, identifiants et permissions.
- [ ] Distinguer le lore durable à rendre canonique dans le Codex des coordonnées, marqueurs, groupes et données de planning propres à Carte Hesta.
- [ ] Définir les responsabilités, relations et identifiants stables entre applications ; aucune correspondance implicite par nom ou slug.
- [ ] Prévoir des copies de travail, une migration progressive sans perte, un fallback compatible et un rollback explicite.
- [ ] Stabiliser le contrat de lecture requis pour Carte Hesta, notamment permissions, erreurs, pagination et identités ; ne pas confondre API v1 disponible et contrat interapplications validé.
- [ ] Résolution UUID/slug depuis Carte Hesta.
- [ ] Affichage Codex sur une fiche lieu pilote.
- [ ] Fallback vers les JSON existants.
- [ ] Migration par catégorie.
- [ ] Suppression du fallback seulement après validation complète.

Transition envisagée, pas un branchement actuel :

```text
Carte Hesta -> API de lecture Codex
          \-> fallback JSON temporaire
```

| Domaine | Responsabilité cible |
| --- | --- |
| Noms, alias, résumés, lore durable | Hesta Codex après migration validée |
| Personnages, organisations, familles, artefacts | Hesta Codex pour la connaissance durable |
| Relations éditoriales et événements historiques | Hesta Codex |
| Sources Discord/vidéo/Obsidian | Hesta Codex ; connecteurs selon E3–E5 |
| Coordonnées, icônes, clusters, zoom, rendu cartographique | Carte Hesta |
| Annotations temporaires et interactions de session | Carte Hesta |
| Planning, sessions candidates, disponibilités | Carte Hesta |
| Groupes actifs et expérience Discord | Carte Hesta |
| Règles PA, matériaux et calculs | Système PA |
| Présentation publique et accès aux applications | Hesta Hub |

Cette répartition guide l'audit ; elle ne décrit pas une migration déjà accomplie et ne fusionne ni dépôts ni permissions.

## E7 — Grands différenciants Carte Hesta

**Socle cartographique partiellement livré ; narration avancée prévue après audit et intégration progressive.** M2/M5/M6/M9 et P8 local.

- [x] Déplacement libre, lieux proches des bords utilisables et peinture éphémère locale.
- [x] Annotations persistantes et événements de quête/live existants.
- [x] Frise chronologique dédiée avec liens carte/frise.

Objectifs futurs conservés :

- [ ] Replay chronologique du monde et de la carte.
- [ ] Marqueurs évolutifs selon date, quête ou état.
- [ ] Calques politiques, religieux, militaires et thématiques.
- [ ] Quêtes interactives à progression, jalons et transitions ; les événements de quête actuels ne clôturent pas ce moteur.
- [ ] Événements temporaires avec expiration/compte à rebours.
- [ ] Narrateur audio / lecture guidée.
- [ ] Export des parcours et annotations ; une peinture locale effaçable n'est pas cet export.
- [ ] Recherche globale `Ctrl+K` sur l'écosystème.
- [ ] Position joueur/marqueur temporaire partageable, palettes de marqueurs et légende avancée du P8 local.

Le backlog local conserve aussi animations, historique, transparence, heatmap, offline/snapshots, multilingue et collaboration approfondie. Aucun de ces objectifs n'est déclaré livré sur la seule base d'une fonctionnalité voisine.

## E8 — Assistant documentaire Hesta

**Prévu**, après fiabilisation, qualification et validation du Codex et de ses sources. Aucun assistant, RAG, embeddings ou extraction IA n'est démontré dans les projets examinés.

Exemples de requêtes conservés :

- « Que sait-on de Comosicus ? »
- « Quels événements concernent Valerius Primus entre 25 et 45 ap. CC ? »
- « Dans quelles sessions cet artefact est-il apparu ? »
- « Quelles informations sont contradictoires ou non confirmées ? »

- [ ] Concevoir un assistant citant les fiches et sources internes utilisées.
- [ ] Respecter les permissions dans la recherche et les réponses.
- [ ] Distinguer canon, propositions, contradictions et absence de preuve.
- [ ] Valider la qualité des réponses avant ouverture et conserver une revue humaine des écritures éventuelles.

## Prochaines priorités

1. Relire ces PR de liens/documentation, puis autoriser séparément les fusions et livraisons ; aucun déploiement dans cette mission.
2. **Reprendre le plan Codex ↔ Carte ↔ chronologie** : audit ciblé des sources actuelles des lieux, personnages, événements et chronologie.
3. Déterminer les données canoniques futures du Codex, leurs relations, identifiants stables, provenance et règles de visibilité.
4. Concevoir les contrats de lecture, les correspondances et une migration progressive sans perte ni changement implicite des permissions.
5. Poursuivre la validation éditoriale Codex et les évolutions PA selon l'usage ; observer le prochain véritable redémarrage normal de Carte Hesta.
6. Garder les connecteurs Discord, le pipeline sessions/YouTube et les autres objectifs comme chantiers futurs, distincts de la présente harmonisation.

## Problèmes et dettes techniques identifiés

| Projet | Dette ou limite | Suite |
| --- | --- | --- |
| Hub/documentation | Invitation Discord générale confirmée ; harmonisation préparée en PR. | Autorisation de fusion puis vérification du déploiement automatique. |
| Carte Hesta | Véritable redémarrage à observer ; contrat Codex et correspondances encore absents. | Prochain chantier ciblé, sans refaire les migrations ou audits de sécurité terminés. |
| Système PA | Éditeur limité à cinq domaines ; synchronisation GitHub/local absente ; docs de release/navigation périmées. | Roadmap locale 1.1.x et corrections documentaires dans une tâche dédiée. |
| Hesta Codex | Recherche/pagination publiques, permissions fines, historique hors Entity, retcon, restauration, limites de référence/graph, délais Windows et taille du bundle. | Recettes et évolutions locales documentées ; aucune clôture par analogie. |
| Exploitation | Sauvegarde/restauration, concurrence réelle, renouvellement Certbot et recette MJ non intégralement vérifiés ici. | Conserver À vérifier avec preuves opérateur datées. |

Les [contradictions historiques](docs/ECOSYSTEM-AUDIT-2026-10.md#contradictions-et-points-à-vérifier) décrivent le 12 octobre ; les statuts Carte Hesta ci-dessus les remplacent pour son exploitation actuelle.

## Gouvernance et synchronisation

- La roadmap de chaque dépôt reste la référence technique locale. Pour le Codex sans ROADMAP autonome, utiliser le README et les documents de jalons/limites.
- La roadmap du Hub synthétise l'état global ; elle ne remplace ni les contrats ni les procédures d'exploitation locales.
- Toute évolution majeure doit être répercutée ici : livraison, nouvelle permission, migration, fonctionnalité structurante, changement de responsabilité ou dette importante.
- Vérifier les statuts dans le dépôt concerné : code et tests, révision Git, état local, CI et livraison. Ajouter une preuve de recette réelle quand elle existe.
- Distinguer réalisation, tests, déploiement et validation ; nommer le périmètre incomplet. Une intention, une enum, un template, un test simulé ou une déclaration ancienne ne suffisent pas à cocher un objectif.
- Réconcilier les contradictions : conserver une mention À vérifier tant que la preuve manque ; documenter pourquoi une preuve récente supplante une déclaration ancienne.
- Conserver les tâches futures et leurs critères de fin, ainsi que les distinctions staging/proposition/relation/canon/privé.
- Actualiser la date, les SHA consultés et les preuves après chaque synchronisation. Les liens épinglés décrivent une photographie historique ; une synchronisation ultérieure doit consulter les nouvelles révisions.
- Vérifier Markdown/liens, `git diff --check` et les contrôles habituels du Hub. Les mutations/migrations/imports/déploiements requièrent une tâche distincte autorisée.
- Aucun mécanisme de synchronisation automatique n'est créé.

Règles de gouvernance éditoriale conservées : le Codex ne remplace pas les applications spécialisées ; toute information importante conserve sa provenance ; les imports/IA restent des propositions ; le serveur filtre les contenus privés ; les migrations sont progressives avec rollback/fallback ; les UUID restent stables et les renommages ne cassent pas les relations.

## Dernière synchronisation

**22 octobre 2026.** Corrections ciblées des liens, textes et statuts dans les quatre dépôts officiels. Branches distinctes et PR sans fusion ; aucun workflow, secret, contenu privé ou service de production modifié.

- Carte Hesta : sécurisation, reconstruction publique, migration, premier Deploy GitHub Actions et installation systemd validés par l'opérateur. Essai réel de redémarrage encore en attente.
- Hub : [dernière livraison consultée](https://github.com/Daneisra/Hesta-Hub/actions/runs/38260476392), incluant la carte Codex.
- Codex : [dernière livraison consultée](https://github.com/Daneisra/Hesta-Codex/actions/runs/39651801338) ; cette mission ne refait pas sa recette métier.
- Système PA : [dernière livraison consultée](https://github.com/Daneisra/Armures-d100-Hesta/actions/runs/38260500757), version stable déjà publiée.

La [photographie du 12 octobre](docs/ECOSYSTEM-AUDIT-2026-10.md) est conservée pour contexte historique. Aucun statut d'intégration Carte/Codex n'est coché sur la seule base de liens entre applications.
