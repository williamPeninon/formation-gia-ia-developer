# TP2 — Générateur de pages web par prompt

## Consignes
1. Écrire un script Node.js qui envoie un prompt à l'API OpenAI (ou une
   autre API de LLM) et récupère du HTML en réponse.
2. Écrire le résultat dans un fichier `page-generee.html`.
3. S'aider de GitHub Copilot (chat et suggestions inline) pour accélérer
   l'écriture du script.

## Utilisation prévue

```bash
cp .env.example .env   # puis renseigner votre clé API dans .env
node --env-file=.env generer-page.js "une page d'accueil pour un club de course à pied"
```

> `--env-file` (Node.js 20.6+) charge les variables du fichier `.env` sans
> les exporter dans votre terminal. Alternative sans fichier :
> `OPENAI_API_KEY=sk-... node generer-page.js "votre prompt"`

## Point de vigilance sécurité

La clé d'API ne doit **jamais** être écrite en dur dans le code, ni
committée dans le dépôt Git. Utilisez toujours une variable
d'environnement (voir `.env.example`), et assurez-vous que `.env` est
listé dans `.gitignore`.
