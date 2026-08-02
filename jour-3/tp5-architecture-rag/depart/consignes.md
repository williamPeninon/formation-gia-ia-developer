# TP5 — Spécification d'architecture RAG

## Consignes

Rédiger une spécification d'architecture technique **RAG** (Retrieval-Augmented
Generation) permettant à un LLM d'explorer une base de données documentaire
**locale et confidentielle**.

Votre spécification (fichier `ma-specification.md`) doit couvrir :

1. **Ingestion** : comment les documents sont chargés
2. **Découpage (chunking)** : taille des passages, chevauchement
3. **Embeddings** : quel modèle, où il s'exécute
4. **Stockage vectoriel** : quelle solution, en local
5. **Recherche** : comment les passages pertinents sont retrouvés
6. **Génération** : comment le LLM produit la réponse finale
7. **Confidentialité** : garanties que rien ne sort du poste/réseau local

## Rendu attendu

Le fichier `ma-specification.md` complété, qui servira de base à
l'implémentation du TP6 (projet fil rouge de l'après-midi).
