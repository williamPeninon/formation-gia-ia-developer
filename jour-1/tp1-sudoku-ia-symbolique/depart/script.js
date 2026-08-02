// TP1 - Sudoku par IA symbolique
//
// Consigne : avec l'aide d'un LLM (ChatGPT, Claude ou Copilot Chat),
// écrire un algorithme qui génère une grille de sudoku 9x9 valide.
//
// Pistes de prompts à essayer (voir aussi prompts.md) :
//  - "Écris une fonction JavaScript qui génère une grille de sudoku
//     valide et complète, en utilisant un algorithme de backtracking."
//  - "Explique-moi les règles de validité d'une case de sudoku
//     (ligne, colonne, bloc 3x3) avant de coder la fonction estValide."
//
// Objectif : obtenir une fonction genererSudoku() qui retourne
// un tableau 9x9 de chiffres 1-9 respectant les règles du sudoku.

function genererSudoku() {
  // TODO : à compléter avec l'aide du LLM
}

document.querySelector("#genererBtn").addEventListener("click", () => {
  const grille = genererSudoku();
  console.log(grille);
  // TODO : afficher la grille dans #grille
});
