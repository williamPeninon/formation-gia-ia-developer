# TP2 — Générateur de pages web par prompt

## Consignes
1. Écrire un script Node.js qui envoie un prompt à l'API OpenAI (ou une
   autre API de LLM) et récupère du HTML en réponse.
2. Écrire le résultat dans un fichier `page-generee.html`.
3. S'aider de GitHub Copilot (chat et suggestions inline) pour accélérer
   l'écriture du script.

## Utilisation prévue

```bash
npm install
cp .env.example .env   # puis renseigner votre clé API
export $(cat .env | xargs)
node generer-page.js "une page d'accueil pour un club de course à pied"
```

## Point de vigilance sécurité

La clé d'API ne doit **jamais** être écrite en dur dans le code, ni
committée dans le dépôt Git. Utilisez toujours une variable
d'environnement (voir `.env.example`), et assurez-vous que `.env` est
listé dans `.gitignore`.
