// TP2 - Générateur de pages web par prompt
//
// Objectif : envoyer le prompt passé en argument à l'API OpenAI,
// et écrire le HTML retourné dans page-generee.html.
//
// Usage prévu :
//   OPENAI_API_KEY=sk-... node generer-page.js "un prompt de page web"

import fs from "node:fs";

const prompt = process.argv[2];
const cle = process.env.OPENAI_API_KEY;

if (!prompt) {
  console.error("Usage : node generer-page.js \"votre prompt\"");
  process.exit(1);
}
if (!cle) {
  console.error("Erreur : variable d'environnement OPENAI_API_KEY manquante.");
  process.exit(1);
}

// TODO : appeler https://api.openai.com/v1/chat/completions en POST
// avec le header Authorization: `Bearer ${cle}`, un system prompt qui
// demande uniquement du HTML valide, et le prompt utilisateur.
//
// TODO : récupérer la réponse, extraire le HTML généré,
// et l'écrire dans "page-generee.html" avec fs.writeFileSync.
