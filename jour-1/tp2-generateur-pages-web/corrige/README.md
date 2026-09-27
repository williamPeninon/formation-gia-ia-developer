# TP2 — Générateur de pages web par prompt (corrigé)

## Utilisation

```bash
cp .env.example .env   # puis renseigner votre clé API dans .env
node --env-file=.env generer-page.js "une page d'accueil pour un club de course à pied"
```

> `--env-file` (Node.js 20.6+) charge les variables du fichier `.env` sans
> les exporter dans votre terminal. Alternative sans fichier :
> `OPENAI_API_KEY=sk-... node generer-page.js "votre prompt"`

Le résultat est écrit dans `page-generee.html`, à ouvrir dans un navigateur.
