// TP2 - Générateur de pages web par prompt (corrigé)
// Usage : node --env-file=.env generer-page.js "un prompt"

import fs from "node:fs";

const prompt = process.argv[2];
const cle = process.env.OPENAI_API_KEY; // jamais écrite en dur dans le code

if (!prompt) {
  console.error("Usage : node generer-page.js \"votre prompt\"");
  process.exit(1);
}
if (!cle) {
  console.error("Erreur : variable d'environnement OPENAI_API_KEY manquante.");
  process.exit(1);
}

async function genererPage() {
  const reponse = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cle}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Tu génères uniquement du HTML valide, sans explication ni balises Markdown." },
        { role: "user", content: prompt },
      ],
    }),
  });

  if (!reponse.ok) {
    throw new Error(`Erreur HTTP ${reponse.status} : ${await reponse.text()}`);
  }

  const data = await reponse.json();
  // Malgré le system prompt, le modèle entoure parfois sa réponse de
  // balises Markdown (```html ... ```) : on les retire avant d'écrire le fichier.
  const html = data.choices[0].message.content
    .trim()
    .replace(/^```(?:html)?\s*/i, "")
    .replace(/\s*```$/, "");
  fs.writeFileSync("page-generee.html", html);
  console.log("Page générée : page-generee.html");
}

genererPage().catch((erreur) => {
  console.error("Échec de la génération :", erreur.message);
  process.exit(1);
});
