## Contact form (email)

This site uses **Formspree** (free tier) to deliver contact form submissions to your inbox.

1) Create a form on Formspree and set the inbox email.
2) Copy the form ID from the endpoint URL that looks like `https://formspree.io/f/abcdwxyz`.
3) Create a `.env` file (based on `.env.example`) and set:

`VITE_FORMSPREE_FORM_ID=abcdwxyz`

4) Run the app normally (`npm run dev`) and submit the form.

### Vercel

On Vercel, add the same env var in **Project → Settings → Environment Variables** instead of using `.env`.
