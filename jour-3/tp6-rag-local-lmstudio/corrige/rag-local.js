// TP6 - ChatGPT local sur base documentaire confidentielle (corrigé)
// Nécessite LM Studio lancé en local (serveur compatible API OpenAI,
// par défaut sur http://localhost:1234).

import fs from "node:fs";
import path from "node:path";

const LM_STUDIO_URL = "http://localhost:1234/v1";
const MODELE_EMBEDDING = "nomic-embed-text"; // adaptez au modèle chargé dans LM Studio
const MODELE_CHAT = "local-model"; // LM Studio accepte souvent n'importe quel nom ici
const DOSSIER_DOCUMENTS = "./documents";
const TAILLE_CHUNK_MOTS = 350;
const CHEVAUCHEMENT_MOTS = 50;

// 1. Charger tous les documents .txt du dossier documents/
function chargerDocuments() {
  const fichiers = fs.readdirSync(DOSSIER_DOCUMENTS).filter((f) => f.endsWith(".txt"));
  return fichiers.map((fichier) => ({
    source: fichier,
    texte: fs.readFileSync(path.join(DOSSIER_DOCUMENTS, fichier), "utf-8"),
  }));
}

// 2. Découper un texte en chunks de ~350 mots (chevauchement ~50 mots)
function decouperEnChunks(texte, source) {
  const mots = texte.split(/\s+/).filter(Boolean);
  const chunks = [];
  let debut = 0;
  while (debut < mots.length) {
    const fin = Math.min(debut + TAILLE_CHUNK_MOTS, mots.length);
    const contenu = mots.slice(debut, fin).join(" ");
    chunks.push({ source, contenu });
    if (fin === mots.length) break;
    debut = fin - CHEVAUCHEMENT_MOTS;
  }
  return chunks;
}

// 3. Obtenir l'embedding d'un texte via LM Studio
async function embedding(texte) {
  const reponse = await fetch(`${LM_STUDIO_URL}/embeddings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: MODELE_EMBEDDING, input: texte }),
  });
  if (!reponse.ok) {
    throw new Error(`Erreur embeddings LM Studio (${reponse.status}) : ${await reponse.text()}`);
  }
  const data = await reponse.json();
  return data.data[0].embedding;
}

// 4. Similarité cosinus entre deux vecteurs
function similariteCosinus(a, b) {
  const produit = a.reduce((somme, v, i) => somme + v * b[i], 0);
  const normeA = Math.sqrt(a.reduce((somme, v) => somme + v * v, 0));
  const normeB = Math.sqrt(b.reduce((somme, v) => somme + v * v, 0));
  return produit / (normeA * normeB);
}

// 5. Répondre à une question en s'appuyant sur les documents
async function repondre(question, chunksAvecEmbeddings) {
  const embeddingQuestion = await embedding(question);

  const scores = chunksAvecEmbeddings
    .map((c) => ({ ...c, score: similariteCosinus(embeddingQuestion, c.embedding) }))
    .sort((a, b) => b.score - a.score);

  const meilleursChunks = scores.slice(0, 3);
  const contexte = meilleursChunks
    .map((c) => `[Source : ${c.source}]\n${c.contenu}`)
    .join("\n---\n");

  const reponse = await fetch(`${LM_STUDIO_URL}/chat/completions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: MODELE_CHAT,
      messages: [
        {
          role: "system",
          content:
            "Tu es un assistant interne. Réponds uniquement à partir du contexte fourni. " +
            "Si l'information n'est pas dans le contexte, dis-le clairement.",
        },
        {
          role: "user",
          content: `Contexte :\n${contexte}\n\nQuestion : ${question}`,
        },
      ],
    }),
  });
  if (!reponse.ok) {
    throw new Error(`Erreur chat LM Studio (${reponse.status}) : ${await reponse.text()}`);
  }
  const data = await reponse.json();
  return {
    reponse: data.choices[0].message.content,
    sources: [...new Set(meilleursChunks.map((c) => c.source))],
  };
}

async function main() {
  const question = process.argv[2];
  if (!question) {
    console.error('Usage : node rag-local.js "votre question"');
    process.exit(1);
  }

  console.log("Chargement des documents...");
  const documents = chargerDocuments();
  console.log(`  ${documents.length} document(s) chargé(s) : ${documents.map((d) => d.source).join(", ")}`);

  console.log("Découpage en chunks...");
  const chunks = documents.flatMap((d) => decouperEnChunks(d.texte, d.source));
  console.log(`  ${chunks.length} chunk(s) généré(s)`);

  console.log("Génération des embeddings (via LM Studio)...");
  const chunksAvecEmbeddings = [];
  for (const chunk of chunks) {
    const vecteur = await embedding(chunk.contenu);
    chunksAvecEmbeddings.push({ ...chunk, embedding: vecteur });
  }

  console.log("Recherche de la réponse...\n");
  const { reponse, sources } = await repondre(question, chunksAvecEmbeddings);

  console.log("Réponse :");
  console.log(reponse);
  console.log("\nSources utilisées :", sources.join(", "));
}

main().catch((erreur) => {
  console.error("Erreur :", erreur.message);
  console.error("Vérifiez que LM Studio est lancé avec son serveur local actif (http://localhost:1234).");
  process.exit(1);
});
