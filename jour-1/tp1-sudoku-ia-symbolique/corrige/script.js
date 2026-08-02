// TP1 - Sudoku par IA symbolique (corrigé)
// Algorithme de backtracking classique, affiné par itération avec un LLM.

function genererGrilleVide() {
  return Array.from({ length: 9 }, () => Array(9).fill(0));
}

function estValide(grille, ligne, colonne, valeur) {
  for (let i = 0; i < 9; i++) {
    if (grille[ligne][i] === valeur) return false;
    if (grille[i][colonne] === valeur) return false;
  }
  const blocLigne = Math.floor(ligne / 3) * 3;
  const blocColonne = Math.floor(colonne / 3) * 3;
  for (let l = blocLigne; l < blocLigne + 3; l++) {
    for (let c = blocColonne; c < blocColonne + 3; c++) {
      if (grille[l][c] === valeur) return false;
    }
  }
  return true;
}

function melanger(tableau) {
  const copie = [...tableau];
  for (let i = copie.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copie[i], copie[j]] = [copie[j], copie[i]];
  }
  return copie;
}

function resoudre(grille) {
  for (let l = 0; l < 9; l++) {
    for (let c = 0; c < 9; c++) {
      if (grille[l][c] === 0) {
        for (const n of melanger([1, 2, 3, 4, 5, 6, 7, 8, 9])) {
          if (estValide(grille, l, c, n)) {
            grille[l][c] = n;
            if (resoudre(grille)) return true;
            grille[l][c] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function genererSudoku() {
  const grille = genererGrilleVide();
  resoudre(grille);
  return grille;
}

function afficherGrille(grille) {
  const conteneur = document.querySelector("#grille");
  conteneur.innerHTML = "";
  grille.flat().forEach((valeur) => {
    const cellule = document.createElement("div");
    cellule.textContent = valeur;
    conteneur.appendChild(cellule);
  });
}

document.querySelector("#genererBtn").addEventListener("click", () => {
  const grille = genererSudoku();
  console.log(grille);
  afficherGrille(grille);
});
