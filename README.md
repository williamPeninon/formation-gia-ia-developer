# GIA — L'intelligence artificielle au service des développeurs

Dépôt d'exercices pour la formation **GIA — L'intelligence artificielle au service des développeurs**.

- Client : Orsys
- Effectif : 12 participants
- Lieu : Orsys Lyon — Silex² by Covivio, 9 Rue des Cuirassiers, 69003 Lyon
- Dates : du 28 au 30 septembre 2026 — 9h00-12h30 / 13h30-17h00 (21 heures)

Ce dépôt accompagne le **Guide formateur** et le **Livret apprenant** remis en amont de la formation.

## Nature des travaux pratiques

Contrairement à une formation purement code, les TP de cette formation sont
de trois natures différentes :

| Type | TP concernés | Contenu du dossier |
|---|---|---|
| Code à compléter | TP1, TP2, TP6 | `depart/` (squelette + `TODO`) ; solution fonctionnelle publiée après correction |
| Rédaction de prompt / spécification | TP3, TP5 | `depart/` (gabarit Markdown à remplir) ; exemple rédigé publié après correction |
| Outil IA externe (Bolt, Lovable, Copilot agent) | TP4 | `sujet.md` uniquement — pas de code, l'exercice se fait entièrement dans l'outil choisi |

## Comment utiliser ce dépôt

1. Ouvrez le dossier du TP du jour dans votre éditeur de code (VS Code recommandé)
2. Pour les TP de code : complétez le fichier indiqué aux endroits marqués `// TODO`
3. Pour les TP de prompt/spécification : complétez le fichier Markdown fourni
4. Après la correction ou le débriefing collectif, récupérez les corrigés
   (branche `corriges`, rendue disponible par le formateur) et comparez :

   ```bash
   git fetch origin
   git checkout corriges
   ```

   Chaque TP contient alors un dossier `corrige/` à côté de `depart/`.

## Prérequis techniques

- VS Code avec GitHub Copilot activé (Jour 1)
- Node.js installé (TP1, TP2, TP6)
- Une clé API OpenAI valide, en variable d'environnement (TP2) — voir le
  `README.md` du TP2 pour la procédure, **ne jamais committer de clé**
- LM Studio installé avec un modèle GGUF déjà téléchargé (TP6) — voir le
  `README.md` du TP6

## Structure du dépôt

```
jour-1/
  tp1-sudoku-ia-symbolique/     Génération d'un sudoku assistée par un LLM
  tp2-generateur-pages-web/     Script Node.js : prompt -> page HTML via API OpenAI
jour-2/
  tp3-prompt-specification/     Rédaction d'un prompt de spécification
  tp4-app-deployee-par-ia/      Application développée et déployée via un outil IA (Bolt/Lovable/Copilot agent)
jour-3/
  tp5-architecture-rag/         Rédaction d'une spécification d'architecture RAG
  tp6-rag-local-lmstudio/       Projet fil rouge : RAG local complet avec LM Studio
```

## Programme

| Jour | Thème | Durée |
|---|---|---|
| Jour 1 | Fondamentaux de l'IA et prise en main des outils | 7h |
| Jour 2 | Prompt engineering et écosystème cloud | 7h |
| Jour 3 | Architecture LLM, RAG et mise en œuvre locale | 7h |

Pour le détail pédagogique complet (objectifs, déroulé, éléments de réponse
commentés), reportez-vous au Guide formateur et au Livret apprenant fournis
séparément.

## Confidentialité et sécurité

- Aucune clé d'API n'est stockée dans ce dépôt (voir les fichiers `.env.example`)
- Les documents du TP6 (`documents/`) sont **entièrement fictifs**, créés pour
  l'exercice — aucune donnée réelle n'y figure
- Le TP6 illustre volontairement une architecture 100 % locale : aucun appel
  à une API cloud n'y est fait
