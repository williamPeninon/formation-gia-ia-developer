// TP6 - ChatGPT local sur base documentaire confidentielle
// Nécessite LM Studio lancé en local (serveur compatible API OpenAI,
// par défaut sur http://localhost:1234).

import fs from "node:fs";
import path from "node:path";

const LM_STUDIO_URL = "http://localhost:1234/v1";
const MODELE_EMBEDDING = "nomic-embed-text"; // adaptez au modèle chargé dans LM Studio
const MODELE_CHAT = "local-model"; // LM Studio accepte souvent n'importe quel nom ici
const DOSSIER_DOCUMENTS = "./documents";

// 1. Charger tous les documents .txt du dossier documents/
function chargerDocuments() {
  // TODO : lire les fichiers .txt de DOSSIER_DOCUMENTS avec fs.readdirSync
  // et fs.readFileSync, retourner un tableau de { source, texte }
}

// 2. Découper un texte en chunks de 300 à 500 mots (chevauchement ~50 mots)
function decouperEnChunks(texte, source) {
  // TODO : découper `texte` en passages, retourner un tableau
  // de { source, contenu }
}

// 3. Obtenir l'embedding d'un texte via LM Studio
async function embedding(texte) {
  // TODO : POST vers `${LM_STUDIO_URL}/embeddings`
  // body: { model: MODELE_EMBEDDING, input: texte }
  // retourner le tableau de nombres (vecteur)
}

// 4. Similarité cosinus entre deux vecteurs
function similariteCosinus(a, b) {
  // TODO : produit scalaire / (norme(a) * norme(b))
}

// 5. Répondre à une question en s'appuyant sur les documents
async function repondre(question, chunksAvecEmbeddings) {
  // TODO :
  //  - calculer l'embedding de la question
  //  - trouver les chunks les plus proches (similariteCosinus)
  //  - construire un prompt avec ce contexte
  //  - appeler POST `${LM_STUDIO_URL}/chat/completions`
  //  - retourner la réponse du modèle
}

async function main() {
  const question = process.argv[2];
  if (!question) {
    console.error('Usage : node rag-local.js "votre question"');
    process.exit(1);
  }

  console.log("Chargement des documents...");
  const documents = chargerDocuments();

  console.log("Découpage en chunks...");
  const chunks = documents.flatMap((d) => decouperEnChunks(d.texte, d.source));

  console.log(`Génération des embeddings pour ${chunks.length} chunks...`);
  // TODO : calculer l'embedding de chaque chunk (chunksAvecEmbeddings)

  console.log("Recherche de la réponse...");
  // TODO : appeler repondre(question, chunksAvecEmbeddings) et afficher le résultat
}

main();
