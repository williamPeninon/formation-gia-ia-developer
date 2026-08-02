# Pistes de prompts — TP1 Sudoku

Ce TP est volontairement ouvert : il n'y a pas un unique bon prompt.
Voici des pistes pour démarrer et itérer avec votre LLM préféré.

## Prompt de démarrage possible

> Écris une fonction JavaScript `genererSudoku()` qui retourne une
> grille 9x9 (tableau de tableaux) de chiffres 1 à 9, formant une
> grille de sudoku valide et complète. Utilise un algorithme de
> backtracking. Explique brièvement le principe avant le code.

## Questions à poser en itération

- "Ma fonction est trop lente / ne termine jamais, comment l'optimiser ?"
- "Ajoute une fonction `estValide(grille, ligne, colonne, valeur)` qui
  vérifie les contraintes de ligne, colonne et bloc 3x3."
- "Comment mélanger aléatoirement l'ordre d'essai des chiffres pour
  obtenir une grille différente à chaque appel ?"

## Ce qu'il faut observer

Notez, pendant le TP, la différence entre :
- une approche **symbolique** (règles explicites, backtracking) — ce que
  vous allez implémenter ;
- une approche **statistique** (un LLM ne "sait" pas résoudre un sudoku
  par apprentissage : il vous aide à écrire l'algorithme symbolique).
