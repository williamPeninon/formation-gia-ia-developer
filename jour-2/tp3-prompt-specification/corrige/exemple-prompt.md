# Exemple de prompt — TP3 (corrigé)

Rôle : Tu es un product designer spécialisé en applications d'actualité.

Contexte : Je veux une application web à page unique qui affiche
uniquement des nouvelles positives du jour (avancées scientifiques,
solidarité, environnement, culture — pas de politique ni de faits divers).

Tâche : Rédige la spécification fonctionnelle de cette application :
1. Liste de 5 sources d'information fiables à utiliser
2. Critères précis pour qualifier une nouvelle de "positive"
3. Structure de la page (sections, ordre d'affichage)
4. Ton éditorial attendu pour les résumés
5. Format de sortie : réponds sous forme de tableau Markdown

Exemple de critère attendu (Few-Shot) :
"Une nouvelle est positive si elle décrit une avancée, une résolution
de problème ou un acte de solidarité, sans victime ni conflit."

Réfléchis étape par étape (Chain-of-Thought) avant de produire le tableau final.

---

## Techniques appliquées dans ce prompt

- **Role Prompting** : "Tu es un product designer..."
- **Few-Shot Prompting** : l'exemple de critère fourni
- **Format de sortie explicite** : "réponds sous forme de tableau Markdown"
- **Chain-of-Thought** : "Réfléchis étape par étape..."
