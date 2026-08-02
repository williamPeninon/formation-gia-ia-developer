# TP6 — ChatGPT local sur base documentaire confidentielle (projet fil rouge)

## Prérequis

1. [LM Studio](https://lmstudio.ai) installé et lancé.
2. Dans LM Studio, charger :
   - un modèle de complétion de chat (ex. un modèle 7B-8B quantifié GGUF),
   - un modèle d'embedding (ex. `nomic-embed-text`), s'il est disponible
     séparément dans votre version de LM Studio.
3. Démarrer le serveur local LM Studio (bouton "Start Server", en général
   sur `http://localhost:1234`, compatible avec l'API OpenAI).

## Consignes

En s'appuyant sur la spécification rédigée au TP5, implémenter dans
`rag-local.js` :

1. `chargerDocuments()` : lit tous les fichiers `.txt` du dossier `documents/`
2. `decouperEnChunks(texte)` : découpe un texte en passages de 300-500 mots
3. `embedding(texte)` : appelle LM Studio pour obtenir le vecteur d'un texte
4. `similariteCosinus(a, b)` : calcule la similarité entre deux vecteurs
5. `repondre(question)` : trouve les chunks les plus pertinents pour la
   question et interroge le LLM local avec ce contexte

## Utilisation prévue

```bash
npm install
node rag-local.js "Combien de jours de télétravail sont autorisés par semaine ?"
```

## Confidentialité

Ce TP met en œuvre concrètement l'objectif « implémenter une IA
entièrement locale » : les documents dans `documents/` ne doivent jamais
être envoyés à une API cloud. Seul LM Studio, exécuté en local, y accède.
