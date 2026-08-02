# TP2 — Générateur de pages web par prompt (corrigé)

## Utilisation

```bash
npm install
cp .env.example .env   # puis renseigner votre clé API
export $(cat .env | xargs)
node generer-page.js "une page d'accueil pour un club de course à pied"
```

Le résultat est écrit dans `page-generee.html`, à ouvrir dans un navigateur.
