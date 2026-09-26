# Hesta Codex — Architecture cible

Ce document définit une première architecture de référence pour **Hesta Codex**, future base de connaissance structurée de l'univers Hesta.

Le but n'est pas de reproduire Obsidian dans un navigateur. Le Codex doit reprendre ses forces — Markdown, liens, backlinks, graphe, recherche — tout en fournissant une donnée structurée et stable réutilisable par Carte Hesta, de futurs outils et des traitements IA.

## 1. Rôle du Codex

Hesta Codex devient la source de vérité pour la connaissance durable :

- lieux et territoires ;
- personnages ;
- organisations ;
- familles et dynasties ;
- divinités ;
- peuples et créatures ;
- artefacts ;
- événements historiques ;
- quêtes et récits ;
- sessions JDR en tant que sources ;
- relations entre toutes ces entités ;
- provenance et historique éditorial.

Il ne doit pas absorber les responsabilités spécifiques des autres applications.

### Ce qui reste hors Codex

- coordonnées et rendu cartographique détaillé : Carte Hesta ;
- planning opérationnel des prochaines parties : Carte Hesta ;
- annotations temporaires de carte : Carte Hesta ;
- règles et calculs d'armure : Système PA ;
- portail public : Hesta Hub.

---

## 2. Stack recommandée

Pour rester cohérent avec l'écosystème existant :

```text
Frontend     React + TypeScript + Vite
API          Node.js + TypeScript + Express
Base         PostgreSQL
ORM          Prisma
Auth         Discord OAuth
Proxy        Nginx
Process      PM2
Déploiement  GitHub Actions -> VPS
```

Organisation de dépôt recommandée :

```text
Hesta-Codex/
  apps/
    web/
    api/
  packages/
    shared/
  prisma/
    schema.prisma
    migrations/
  docs/
  scripts/
```

Le monorepo permet de partager types, schémas de validation et constantes sans dupliquer les modèles entre front et API.

PostgreSQL est préférable aux JSON pour ce projet car le Codex doit gérer beaucoup de relations, recherches, droits, révisions et sources. Les champs très variables peuvent rester en `JSONB` sans abandonner le modèle relationnel.

---

## 3. Modèle conceptuel

### 3.1 Entité centrale

Toute fiche de connaissance est une `Entity` possédant un UUID stable.

Champs communs :

```text
id              UUID
slug            texte unique stable pour URL
kind            type d'entité
name            nom principal
summary         résumé court
bodyMarkdown    contenu long Markdown
status          draft | proposed | canon | deprecated
visibility      public | players | gm | secret
createdAt
updatedAt
createdBy
updatedBy
```

Champs complémentaires :

```text
aliases[]
tags[]
metadata JSONB
publishedAt
canonicalSince
supersededById?
```

Le **nom n'est jamais l'identifiant**. Renommer une ville, un personnage ou un artefact ne doit casser aucune relation.

### 3.2 Types d'entités v1

```text
place
person
organization
family
religion
 deity
species
creature
artifact
event
quest
session
concept
```

`place` possède un sous-type :

```text
continent
ocean
sea
archipelago
region
city
town
village
building
ruin
landmark
other
```

`organization` possède un sous-type :

```text
imperial
religious
military
political
guild
criminal
other
```

`person` porte un état plutôt que de dupliquer le type :

```text
lifeStatus = alive | deceased | missing | unknown
```

Ainsi « Notables » et « Notables Défunt » deviennent le même type `person`, filtré par état.

### 3.3 Pourquoi garder `metadata JSONB`

Certaines fiches auront des propriétés spécifiques :

- ville : population, régime, capitale ;
- personnage : titres, espèce, date de naissance ;
- divinité : domaines, symboles ;
- artefact : porteur actuel, rareté ;
- événement : date/ère ;
- session : numéro, vidéo, groupe.

Ces valeurs pourront d'abord vivre dans `metadata`, puis être promues en colonnes ou tables dédiées lorsqu'un vrai besoin de requête apparaît.

---

## 4. Relations

Le cœur du Codex est une table de relations explicites.

```text
Relation
- id
- sourceEntityId
- targetEntityId
- type
- label?
- description?
- startDate?
- endDate?
- status
- visibility
- sourceId?
```

Exemples :

```text
located_in
capital_of
member_of
leader_of
allied_with
enemy_of
parent_of
child_of
spouse_of
owns
created_by
worships
participated_in
happened_at
appears_in
caused
followed_by
related_to
```

Certaines relations sont orientées (`located_in`), d'autres symétriques (`allied_with`). Cette propriété doit être définie dans un catalogue des types de relations.

### Backlinks

Les backlinks sont calculés depuis les relations et les liens Markdown. Une fiche doit pouvoir afficher :

- liens sortants ;
- liens entrants ;
- mentions textuelles non structurées ;
- relations par type.

---

## 5. Dates et chronologie

Les dates Hesta ne doivent pas être stockées uniquement sous forme de texte.

Structure recommandée :

```text
calendar        CC
value           entier relatif au point zéro
precision       exact | year | range | approximate | unknown
label           texte d'affichage
startValue?
endValue?
```

Exemples :

```text
-7  -> -7 av. CC
0   -> 0 CC
42  -> 42 ap. CC
```

Un événement peut donc être trié, filtré et utilisé plus tard par un replay historique de la carte.

---

## 6. Sources et provenance

Aucune information importante ne devrait perdre sa provenance.

Table `Source` :

```text
id
kind            manual | obsidian | discord | youtube | map | import | other
label
externalId?
url?
author?
publishedAt?
metadata JSONB
```

Table `Evidence` :

```text
id
entityId?
relationId?
sourceId
quoteOrSummary?
timeStartSeconds?
timeEndSeconds?
confidence?
createdAt
```

Cela permet d'indiquer par exemple :

```text
Source : Session 42
YouTube : 02:14:32 -> 02:17:05
```

ou :

```text
Source : Discord / #lore / message 123456789
```

Une même information peut avoir plusieurs sources.

---

## 7. Canon, brouillons et révisions

### États

- `draft` : travail privé non soumis ;
- `proposed` : proposition en attente de validation ;
- `canon` : information validée ;
- `deprecated` : information ancienne, retcon ou remplacée.

### Révisions

Chaque modification d'une fiche canon doit créer une révision :

```text
Revision
- id
- entityId
- revisionNumber
- snapshot JSONB
- authorId
- message?
- createdAt
```

Le système doit permettre :

- comparaison avant/après ;
- historique ;
- restauration ;
- attribution de l'auteur.

Pour un retcon, conserver l'ancienne version plutôt que la supprimer silencieusement.

---

## 8. Permissions

Le filtrage doit être appliqué **dans l'API**, pas uniquement dans React.

### Rôles proposés

```text
guest
player
contributor
gm
admin
```

### Droits principaux

| Action | Guest | Player | Contributor | GM | Admin |
| --- | --- | --- | --- | --- | --- |
| lire public | oui | oui | oui | oui | oui |
| lire joueurs | non | oui | oui | oui | oui |
| lire MJ | non | non | non | oui | oui |
| lire secret | non | non | non | selon règle | oui |
| proposer modification | non | optionnel | oui | oui | oui |
| valider canon | non | non | non | oui | oui |
| gérer permissions | non | non | non | non | oui |
| lancer imports | non | non | optionnel | oui | oui |

Les contenus `secret` pourront plus tard recevoir des ACL plus fines par campagne/groupe.

---

## 9. API v1

Préfixe recommandé :

```text
/api/v1
```

### Lecture

```text
GET /entities
GET /entities/:idOrSlug
GET /entities/:id/relations
GET /entities/:id/backlinks
GET /search?q=
GET /graph
GET /events
GET /tags
```

Filtres :

```text
kind
subtype
status
visibility
tag
relatedTo
fromYear
toYear
```

### Édition

```text
POST   /entities
PATCH  /entities/:id
DELETE /entities/:id
POST   /entities/:id/relations
PATCH  /relations/:id
DELETE /relations/:id
```

La suppression d'une entité canon devrait par défaut être logique (`deprecated`) et non physique.

### Propositions

```text
GET  /proposals
POST /proposals
POST /proposals/:id/approve
POST /proposals/:id/reject
POST /proposals/:id/merge
```

### Import

```text
POST /imports/obsidian
POST /imports/discord
POST /imports/youtube
GET  /imports/:id
```

Les imports sont asynchrones et produisent un rapport avant validation.

---

## 10. Recherche et graphe

### Recherche MVP

PostgreSQL full-text search sur :

- nom ;
- aliases ;
- résumé ;
- Markdown ;
- tags.

Tolérance minimale aux accents et casse.

### Recherche ultérieure

Ajouter éventuellement `pg_trgm` pour les noms proches/fautes et une couche vectorielle seulement si la recherche sémantique apporte une vraie valeur.

### Graphe

Le graphe doit être une vue des relations, pas la base de stockage elle-même.

Filtres utiles :

- type d'entité ;
- type de relation ;
- période ;
- visibilité ;
- profondeur 1/2/3 ;
- focus sur une entité.

---

## 11. Import Obsidian

Le vault actuel est une source majeure ; l'import doit préserver les informations au lieu de forcer immédiatement un format parfait.

### Correspondance initiale de dossiers

| Dossier Obsidian | Type Codex suggéré |
| --- | --- |
| Continents | `place/continent` |
| Mers & Océans | `place/sea` ou `place/ocean` |
| Villes | `place/city` |
| Lieux | `place/other` |
| Instances Impériales | `organization/imperial` |
| Instances Religieuses | `organization/religious` |
| Instances Militaires | `organization/military` |
| Instances Autres | `organization/other` |
| Notables | `person` + vivant/unknown |
| Notables Défunt | `person` + `deceased` |
| Familles Nobles | `family` |
| Divinités | `deity` |
| Créatures et Peuples | `species`/`creature` |
| Artefacts | `artifact` |
| Lore | `concept` ou contenu à rattacher |

### Pipeline

```text
scan vault
  -> lire frontmatter
  -> lire Markdown
  -> détecter [[wikilinks]]
  -> proposer type
  -> rechercher doublons
  -> résoudre les liens
  -> rapport dry-run
  -> validation
  -> import
```

Conserver pour chaque fiche :

- chemin original ;
- hash du fichier ;
- date d'import ;
- Markdown original ;
- liens non résolus.

Les `[[wikilinks]]` deviennent au minimum des relations `related_to` ou `mentions`, puis pourront être requalifiées manuellement.

---

## 12. Import Carte Hesta

La Carte possède déjà beaucoup de données structurées utiles. Le Codex ne doit pas dupliquer aveuglément les objets existants.

### `locations.json`

Les lieux contiennent déjà notamment :

- nom ;
- type visuel ;
- coordonnées ;
- description ;
- images/vidéos/audio ;
- historique ;
- quêtes ;
- lore ;
- instances ;
- familles nobles ;
- PNJ ;
- tags.

Migration recommandée :

```text
Lieu Carte -> Entity(place)
lore/history -> body/sections ou événements associés
pnjs -> Entity(person) + relation appears_at / located_in
nobleFamilies -> Entity(family) + relation
instances -> Entity(organization) + relation
quests -> Entity(quest) + relation
x/y/type/icon -> restent côté Carte
```

### `timeline.json`

Chaque entrée devient `Entity(event)` avec :

- date structurée ;
- résumé ;
- contenu Markdown ;
- type lore/joueur ;
- période/ère ;
- tags ;
- relations vers les lieux ;
- médias.

### Règle de transition

Construire une table `legacy_mapping` :

```text
sourceSystem
sourceType
sourceKey
entityId
```

Elle permet de relier ancien nom/ID JSON et UUID Codex pendant la migration.

---

## 13. Import Discord

L'importeur Discord doit utiliser un bot autorisé et une **liste blanche de salons**.

Ne pas aspirer automatiquement les conversations privées ou sans rapport avec le lore.

Données conservées :

```text
guildId
channelId
messageId
authorId / displayName
timestamp
content
attachments
permalink
```

Pipeline :

```text
message
 -> stockage source
 -> segmentation
 -> détection entités existantes
 -> extraction faits/relations
 -> propositions
 -> validation MJ
```

Un message Discord reste une source ; il n'est pas automatiquement une fiche canon.

---

## 14. Sessions JDR / YouTube / IA

### Principe

Une session est d'abord créée comme `Entity(session)` avec :

```text
title
sessionNumber?
date
campaign/group
youtubeVideoId?
youtubeUrl?
duration?
participants[]
```

### Acquisition du texte

Ordre recommandé :

1. piste de sous-titres/captions autorisée pour une vidéo possédée ;
2. sinon audio source de la session ;
3. transcription locale/API ;
4. conservation du texte horodaté.

### Traitement

Ne pas envoyer une session entière à un modèle en une seule requête.

```text
transcription
 -> segments temporels
 -> résumé par segment
 -> extraction structurée
 -> consolidation globale
 -> déduplication
 -> comparaison avec Codex
 -> propositions
```

Types de sorties :

```text
new_entity
entity_update
new_relation
relation_update
event
status_change
uncertain_reference
contradiction
```

Chaque sortie IA possède :

```text
confidence
sourceId
timeStart
timeEnd
model
promptVersion
status = proposed
```

### Exemple

```text
02:47:19 - 02:49:03
Proposition : personnage Z -> lifeStatus = deceased
Confiance : 0.91
Source : Session 42
```

Le MJ valide, corrige ou refuse.

### Diarisation

Si la transcription permet d'identifier les locuteurs, conserver `speakerId/speakerLabel`. La correspondance entre voix et joueurs/personnages reste une validation séparée.

### Analyse visuelle ultérieure

Phase 2 : extraire périodiquement des frames pertinentes pour détecter :

- handouts ;
- textes ;
- cartes ;
- noms affichés ;
- documents montrés aux joueurs.

Ne pas lancer une analyse image de chaque frame : utiliser détection de changement/scènes et échantillonnage.

---

## 15. Interface utilisateur du Codex

### Consultation publique

- navigation par catégories ;
- recherche globale ;
- fiche lisible avec sommaire ;
- relations ;
- backlinks ;
- sources publiques ;
- chronologie liée ;
- lien « voir sur la carte » lorsque disponible ;
- graphe local.

### Interface MJ/admin

- éditeur Markdown + champs structurés ;
- autocomplétion de liens ;
- création de relation ;
- gestion canon/visibilité ;
- historique/révisions ;
- fusion de doublons ;
- file de propositions ;
- rapports d'import ;
- audit des liens cassés et fiches incomplètes.

### Inspirations Obsidian à conserver

- `[[wikilinks]]` dans l'éditeur ;
- backlinks ;
- graphe ;
- tags ;
- raccourci `Ctrl+K` ;
- navigation rapide entre fiches.

---

## 16. Première version MVP proposée

### M0 — Fondations

- repo, CI/CD, environnement local ;
- PostgreSQL + Prisma ;
- API santé ;
- auth Discord ;
- rôles.

### M1 — Connaissance

- CRUD Entity ;
- Markdown ;
- alias/tags ;
- status/visibility ;
- recherche ;
- relations/backlinks ;
- révisions.

### M2 — Interface

- accueil ;
- navigation catégories ;
- fiche entité ;
- recherche ;
- graphe local ;
- admin/MJ.

### M3 — Migration

- import Obsidian dry-run ;
- import Carte Hesta ;
- résolution doublons ;
- mapping legacy.

### M4 — Sources

- Discord ;
- sessions JDR ;
- YouTube/transcription ;
- propositions IA et validation.

### M5 — Intégration Carte

- API lecture stable ;
- fiche lieu pilote ;
- fallback JSON ;
- migration progressive.

---

## 17. Décisions à conserver

1. **UUID stables partout.**
2. **Markdown pour le narratif, structure relationnelle pour les faits et relations.**
3. **Toute donnée IA/importée arrive en proposition.**
4. **Provenance obligatoire pour les informations issues de sources externes.**
5. **Permissions appliquées côté serveur.**
6. **Pas de migration big-bang de Carte Hesta.**
7. **PostgreSQL comme base centrale, JSON seulement pour export/cache/compatibilité.**
8. **Le Codex décrit le monde ; les applications spécialisées l'utilisent sans perdre leur autonomie.**
