# Roadmap globale de l'écosystème Hesta

Cette roadmap décrit la direction produit commune à l'ensemble des applications Hesta. Chaque dépôt conserve sa propre roadmap technique ; ce document sert à coordonner les priorités, les dépendances et les nouveaux outils.

## Vision

Hesta doit devenir un écosystème cohérent plutôt qu'une collection de sites indépendants :

- **Hesta Hub** reste la porte d'entrée publique de l'univers ;
- **Carte Hesta** reste l'outil spatial, communautaire et de préparation des sessions ;
- **Système PA** reste l'outil métier pour les armures, matériaux, builds et règles associées ;
- **Hesta Codex** devient progressivement la base de connaissance structurée et la source de vérité du lore ;
- les imports Discord, Obsidian et les analyses de sessions JDR alimentent des **propositions à valider**, jamais le canon directement.

Principe directeur : **un univers, plusieurs outils, une connaissance reliée**.

## Architecture cible

```text
                         HESTA
                  hesta.dannytech.fr
                           |
       +-------------------+--------------------+
       |                   |                    |
  Carte Hesta         Hesta Codex          Système PA
  exploration         connaissance         règles / calcul
       |                   |                    |
       +--------------- Hesta API --------------+
                           |
                    Base PostgreSQL
                           |
              +------------+-------------+
              |                          |
        Sources Discord            Sessions JDR
                                      YouTube
```

Cette cible est progressive. Carte Hesta et Système PA doivent continuer de fonctionner indépendamment pendant toute la transition.

---

## E0 — Socle de l'écosystème

**État : terminé.**

- [x] Portail central `hesta.dannytech.fr`.
- [x] Applications séparées et déployées indépendamment.
- [x] Navigation croisée entre Hesta Hub, Carte Hesta et Système PA.
- [x] Identité commune HESTA dans les interfaces et README.
- [x] VPS, Nginx, HTTPS et renouvellement Certbot.
- [x] CI/CD GitHub Actions vers le VPS.
- [x] README et métadonnées GitHub harmonisés.

---

## E1 — Stabiliser les applications existantes

### Système PA — priorité courte et haute

Objectif : atteindre une première version stable avant d'ouvrir de gros nouveaux chantiers.

- [ ] Geler les règles métier principales.
- [ ] Vérifier les données JSON canon.
- [ ] Valider les tests unitaires métier.
- [ ] Valider impression/PDF sur Chrome, Firefox et Edge.
- [ ] Publier/taguer `v1.0.0`.

Après `1.0.0`, privilégier maintenance, corrections et fonctions réellement justifiées par l'usage.

### Carte Hesta — maintenance active pendant le chantier Codex

Pendant la création du Codex, continuer :

- [ ] corrections de bugs et régressions ;
- [ ] finition mobile ;
- [ ] modularisation progressive de `UiController` ;
- [ ] observabilité serveur/client ;
- [ ] nettoyage des artefacts legacy ;
- [ ] petites améliorations UX non structurantes.

Reporter temporairement les grands chantiers de narration/cartographie qui gagneront à consommer le Codex : replay historique, marqueurs évolutifs, calques, quêtes riches, narration guidée, événements temporaires.

---

## E2 — Hesta Codex

**Priorité principale du prochain cycle.**

Objectif : créer une base de connaissance web inspirée des forces d'Obsidian, mais structurée pour être consommée par les autres applications.

Nom de travail : **Hesta Codex**.

Sous-domaine envisagé : `codexhesta.dannytech.fr`.

Dépôt envisagé : `Hesta-Codex`.

### MVP

- [ ] créer le dépôt et le squelette technique ;
- [ ] mettre en place PostgreSQL et les migrations ;
- [ ] définir le modèle des entités, relations, sources, révisions et permissions ;
- [ ] interface publique de consultation ;
- [ ] interface MJ/admin d'édition ;
- [ ] recherche plein texte ;
- [ ] backlinks et relations ;
- [ ] graphe relationnel ;
- [ ] tags, alias et slugs ;
- [ ] états brouillon/proposé/canon/retcon ;
- [ ] visibilités public/joueurs/MJ/secret ;
- [ ] historique des modifications ;
- [ ] API publique/privée versionnée.

Architecture détaillée : [`docs/HESTA-CODEX-ARCHITECTURE.md`](docs/HESTA-CODEX-ARCHITECTURE.md).

---

## E3 — Migration du savoir existant

Objectif : ne pas repartir de zéro.

### Obsidian

- [ ] importer les fichiers Markdown du vault ;
- [ ] convertir les dossiers en types/sous-types suggérés ;
- [ ] transformer les `[[wikilinks]]` en relations ;
- [ ] conserver le Markdown original et le chemin source ;
- [ ] détecter doublons, alias et liens non résolus ;
- [ ] produire un rapport avant toute écriture définitive ;
- [ ] valider manuellement les fiches sensibles.

### Carte Hesta

- [ ] importer progressivement `locations.json` ;
- [ ] extraire PNJ, familles, instances et lore imbriqués en entités reliées ;
- [ ] importer les événements de `timeline.json` ;
- [ ] conserver les coordonnées, types d'icônes et données purement cartographiques dans Carte Hesta ;
- [ ] construire une table de correspondance entre anciens identifiants/noms et UUID Codex.

---

## E4 — Sources Discord

Objectif : récupérer le lore déjà présent dans les salons utiles sans aspirer tout le serveur.

- [ ] bot/importeur limité à une liste blanche de salons ;
- [ ] conservation de l'identifiant du message, salon, auteur et date ;
- [ ] pièces jointes et liens associés ;
- [ ] extraction d'entités et de faits sous forme de propositions ;
- [ ] détection des entités existantes ;
- [ ] file de validation MJ ;
- [ ] possibilité de refuser, fusionner ou corriger une proposition ;
- [ ] lien retour vers le message Discord quand possible.

Aucune donnée Discord ne doit devenir canon automatiquement.

---

## E5 — Sessions JDR et vidéos

Objectif : transformer les parties enregistrées en mémoire exploitable de l'univers.

Pipeline cible :

```text
Vidéo / piste audio
      |
      v
Transcription horodatée
      |
      v
Découpage en segments
      |
      v
Extraction IA
      |
      +-- personnages
      +-- lieux
      +-- organisations
      +-- objets / artefacts
      +-- événements
      +-- révélations
      +-- changements d'état
      +-- relations
      |
      v
Comparaison au Codex
      |
      v
Propositions à valider
      |
      v
Canon Hesta
```

- [ ] importer les métadonnées d'une session ;
- [ ] récupérer une transcription YouTube autorisée ou transcrire l'audio ;
- [ ] conserver les timestamps ;
- [ ] gérer si possible la séparation des intervenants ;
- [ ] générer résumé de session et chapitrage ;
- [ ] extraire faits et entités avec niveau de confiance ;
- [ ] associer chaque proposition à sa source temporelle ;
- [ ] permettre un lien direct vers le passage vidéo ;
- [ ] ne jamais modifier automatiquement une fiche canon.

L'analyse visuelle des vidéos pourra venir ensuite pour récupérer cartes, handouts et textes affichés ; l'audio/transcription est prioritaire.

---

## E6 — Connecter Carte Hesta au Codex

Migration progressive, sans big-bang.

### Phase de transition

```text
Carte Hesta -> API Codex
          \-> fallback JSON temporaire
```

Répartition proposée des responsabilités :

| Domaine | Source principale |
| --- | --- |
| noms, alias, résumés, lore | Hesta Codex |
| personnages, organisations, familles, artefacts | Hesta Codex |
| relations entre entités | Hesta Codex |
| événements historiques | Hesta Codex |
| sources Discord/vidéo/Obsidian | Hesta Codex |
| coordonnées et position sur la carte | Carte Hesta |
| icône, cluster, zoom, affichage cartographique | Carte Hesta |
| annotations temporaires | Carte Hesta |
| planning et sessions candidates | Carte Hesta |
| groupes actifs et expérience Discord | Carte Hesta |
| règles PA et calculs | Système PA |

Étapes :

- [ ] API de lecture Codex stable ;
- [ ] résolution UUID/slug depuis Carte Hesta ;
- [ ] affichage de données Codex sur une fiche lieu pilote ;
- [ ] fallback vers les JSON existants ;
- [ ] migration par catégorie ;
- [ ] suppression du fallback uniquement après validation complète.

---

## E7 — Reprendre les grands différenciants Carte Hesta

Une fois la connaissance centralisée :

- [ ] replay chronologique du monde ;
- [ ] marqueurs évolutifs selon date, quête ou état ;
- [ ] calques politiques, religieux, militaires et thématiques ;
- [ ] quêtes interactives à progression ;
- [ ] événements temporaires ;
- [ ] narrateur / lecture guidée ;
- [ ] export des parcours et annotations ;
- [ ] recherche globale `Ctrl+K` sur l'écosystème.

---

## E8 — Assistant documentaire Hesta

Phase ultérieure, une fois le Codex suffisamment fiable et sourcé.

Exemples de requêtes :

- « Que sait-on de Comosicus ? »
- « Quels événements concernent Valerius Primus entre 25 et 45 ap. CC ? »
- « Dans quelles sessions cet artefact est-il apparu ? »
- « Quelles informations sont contradictoires ou non confirmées ? »

L'assistant doit citer les fiches et sources internes utilisées et respecter les niveaux de visibilité.

---

## Ordre recommandé

1. Stabiliser Système PA vers `1.0.0`.
2. Maintenir Carte Hesta sans gros chantier structurel.
3. Concevoir et créer Hesta Codex.
4. Importer Obsidian et les données structurées existantes.
5. Ajouter l'import Discord.
6. Ajouter le pipeline sessions JDR / YouTube.
7. Connecter progressivement Carte Hesta au Codex.
8. Reprendre les grands chantiers P8 de Carte Hesta.
9. Ajouter la recherche globale et l'assistant documentaire.

## Règles de gouvernance

- Le **Codex ne remplace pas les applications spécialisées**.
- Une information importée ou produite par IA est une **proposition**, pas un fait canon.
- Toute information importante conserve sa **provenance**.
- Les contenus secrets sont filtrés **côté serveur**, pas seulement masqués dans l'interface.
- Les migrations se font progressivement, avec rollback/fallback possible.
- Les UUID sont stables ; un renommage ne doit pas casser les relations.
- Les roadmaps propres à chaque dépôt restent la référence pour leurs détails techniques.
