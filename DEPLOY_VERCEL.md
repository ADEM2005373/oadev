## Deploy to Vercel

1) Push this repo to GitHub (or GitLab/Bitbucket).
2) In Vercel: **New Project → Import** the repo.
3) Build settings:
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Output directory: `dist`
4) Environment variables (Project → Settings → Environment Variables):
   - `VITE_FORMSPREE_FORM_ID` = your Formspree id (example: `mdaboezb`)

Notes:
- This is a client-side SPA, so `vercel.json` rewrites all routes to `index.html` (needed for `wouter` routing).
- Do not commit `.env`; Vercel env vars replace it in production.

