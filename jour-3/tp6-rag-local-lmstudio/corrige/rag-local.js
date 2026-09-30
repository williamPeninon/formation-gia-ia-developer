// TP6 - ChatGPT local sur base documentaire confidentielle (corrigé)
// Pipeline RAG (Retrieval-Augmented Generation) :
//   1) charger les documents  →  2) découper en chunks  →  3) vectoriser (embeddings)
//   4) retrouver les chunks les plus proches de la question  →  5) générer la réponse
// Nécessite LM Studio lancé en local (serveur compatible API OpenAI,
// par défaut sur http://localhost:1234).

import fs from "node:fs";
import path from "node:path";

// --- Configuration -----------------------------------------------------------
const LM_STUDIO_URL = "http://localhost:1234/v1"; // endpoint OpenAI-compatible de LM Studio
const MODELE_EMBEDDING = "nomic-embed-text"; // adaptez au modèle chargé dans LM Studio
const MODELE_CHAT = "local-model"; // LM Studio accepte souvent n'importe quel nom ici
const DOSSIER_DOCUMENTS = "./documents";
const TAILLE_CHUNK_MOTS = 350; // taille cible d'un extrait (en mots)
const CHEVAUCHEMENT_MOTS = 50; // chevauchement entre deux chunks pour ne pas perdre de contexte

// 1. Charger tous les documents .txt du dossier documents/
// Renvoie un tableau { source, texte } — un objet par fichier.
function chargerDocuments() {
  // Lister uniquement les fichiers texte (on ignore le reste du dossier)
  const fichiers = fs.readdirSync(DOSSIER_DOCUMENTS).filter((f) => f.endsWith(".txt"));
  return fichiers.map((fichier) => ({
    source: fichier, // nom du fichier, conservé pour citer les sources plus tard
    texte: fs.readFileSync(path.join(DOSSIER_DOCUMENTS, fichier), "utf-8"),
  }));
}

// 2. Découper un texte en chunks de ~350 mots (chevauchement ~50 mots)
// Pourquoi découper ? Les embeddings sont plus précis sur des passages courts,
// et on ne peut pas tout injecter d'un coup dans le prompt du modèle de chat.
function decouperEnChunks(texte, source) {
  const mots = texte.split(/\s+/).filter(Boolean); // découpe sur les espaces / sauts de ligne
  const chunks = [];
  let debut = 0;
  while (debut < mots.length) {
    const fin = Math.min(debut + TAILLE_CHUNK_MOTS, mots.length);
    const contenu = mots.slice(debut, fin).join(" ");
    chunks.push({ source, contenu }); // chaque chunk garde sa source d'origine
    if (fin === mots.length) break; // dernier chunk atteint : on s'arrête
    // Reculer de CHEVAUCHEMENT_MOTS pour que la fin d'un chunk se retrouve au début du suivant
    debut = fin - CHEVAUCHEMENT_MOTS;
  }
  return chunks;
}

// 3. Obtenir l'embedding d'un texte via LM Studio
// Un embedding = vecteur numérique qui représente le "sens" du texte.
// Deux textes proches sémantiquement auront des vecteurs proches.
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
  return data.data[0].embedding; // tableau de nombres (ex. 768 dimensions)
}

// 4. Similarité cosinus entre deux vecteurs
// Score entre -1 et 1 : plus il est proche de 1, plus les textes sont proches en sens.
// Formule : cos(θ) = (a · b) / (|a| × |b|)
function similariteCosinus(a, b) {
  const produit = a.reduce((somme, v, i) => somme + v * b[i], 0); // produit scalaire a · b
  const normeA = Math.sqrt(a.reduce((somme, v) => somme + v * v, 0)); // |a|
  const normeB = Math.sqrt(b.reduce((somme, v) => somme + v * v, 0)); // |b|
  return produit / (normeA * normeB);
}

// 5. Répondre à une question en s'appuyant sur les documents (cœur du RAG)
async function repondre(question, chunksAvecEmbeddings) {
  // a) Vectoriser la question avec le même modèle d'embedding que les documents
  const embeddingQuestion = await embedding(question);

  // b) Scorer chaque chunk par similarité avec la question, puis trier (meilleur score en premier)
  const scores = chunksAvecEmbeddings
    .map((c) => ({ ...c, score: similariteCosinus(embeddingQuestion, c.embedding) }))
    .sort((a, b) => b.score - a.score);

  // c) Ne garder que les 3 passages les plus pertinents (retrieval / retrieval top-k)
  const meilleursChunks = scores.slice(0, 3);
  // Assembler le contexte injecté dans le prompt, avec la source de chaque extrait
  const contexte = meilleursChunks
    .map((c) => `[Source : ${c.source}]\n${c.contenu}`)
    .join("\n---\n");

  // d) Demander au modèle de chat de répondre UNIQUEMENT à partir de ce contexte
  const reponse = await fetch(`${LM_STUDIO_URL}/chat/completions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: MODELE_CHAT,
      messages: [
        {
          role: "system",
          // Garde-fou : évite que le modèle invente hors documents (hallucinations)
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
    reponse: data.choices[0].message.content, // texte généré par le LLM local
    // Deduplique les noms de fichiers cités (un même doc peut fournir plusieurs chunks)
    sources: [...new Set(meilleursChunks.map((c) => c.source))],
  };
}

// Point d'entrée : orchestre le pipeline RAG de bout en bout
async function main() {
  // La question est passée en argument CLI : node rag-local.js "ma question"
  const question = process.argv[2];
  if (!question) {
    console.error('Usage : node rag-local.js "votre question"');
    process.exit(1);
  }

  // Étape indexation (faite à chaque lancement pour rester simple pédagogiquement)
  console.log("Chargement des documents...");
  const documents = chargerDocuments();
  console.log(`  ${documents.length} document(s) chargé(s) : ${documents.map((d) => d.source).join(", ")}`);

  console.log("Découpage en chunks...");
  // flatMap : un document → plusieurs chunks, aplatis en un seul tableau
  const chunks = documents.flatMap((d) => decouperEnChunks(d.texte, d.source));
  console.log(`  ${chunks.length} chunk(s) généré(s)`);

  console.log("Génération des embeddings (via LM Studio)...");
  // Pour chaque chunk, on calcule son vecteur et on le stocke à côté du texte
  const chunksAvecEmbeddings = [];
  for (const chunk of chunks) {
    const vecteur = await embedding(chunk.contenu);
    chunksAvecEmbeddings.push({ ...chunk, embedding: vecteur });
  }

  // Étape requête : retrieval + génération
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
