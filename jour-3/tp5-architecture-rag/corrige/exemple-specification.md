# Spécification RAG — base documentaire confidentielle (corrigé)

## 1. Ingestion
Lecture des documents locaux (.txt, .md, .pdf) depuis un dossier du poste.
Aucun envoi vers un service externe.

## 2. Découpage (chunking)
Segmentation de chaque document en passages de 300 à 500 mots, avec un
léger chevauchement (~50 mots) pour ne pas couper le contexte entre deux
chunks consécutifs.

## 3. Embeddings
Génération d'un vecteur par chunk via un modèle d'embedding exécuté
localement dans LM Studio (ex. `nomic-embed-text`).

## 4. Stockage vectoriel
Index en mémoire (ou fichier JSON local) associant chaque vecteur à son
chunk d'origine et à sa source (nom du document).

## 5. Recherche
Au moment de la question : calcul de l'embedding de la question, puis
recherche des chunks les plus proches par similarité cosinus.

## 6. Génération
Les chunks les plus pertinents (top 3) sont injectés dans le prompt
envoyé au LLM local (via LM Studio), qui génère la réponse finale à
partir de ce contexte.

## 7. Confidentialité
L'intégralité du traitement (documents, embeddings, LLM) reste sur la
machine locale via LM Studio : aucune donnée ne transite par une API
tierce. C'est la mise en œuvre concrète de l'objectif pédagogique
« implémenter une IA entièrement locale ».

Voir le TP6 pour l'implémentation de cette spécification.
