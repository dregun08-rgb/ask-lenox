# Ask Lenox — Hillside at Lenox Digital Concierge

This is a Vercel/Netlify-ready React app for the Hillside at Lenox resident chatbot.

## Locked rule
Front parking is limited to **30 minutes maximum**.

## Deploy on Vercel
1. Go to https://vercel.com
2. Create a new project.
3. Upload this folder or connect it to GitHub.
4. Vercel should auto-detect Vite.
5. Click Deploy.
6. Copy the final URL.

## Add to HOA Express / Hillside Website
1. Log in to HOA Express admin for hillsideatlenox.com.
2. Go to Pages.
3. Add a new page or link page.
4. Name it: **Ask Lenox** or **Hillside Concierge**.
5. Paste the Vercel URL.
6. Save and publish.

## Local testing
Run:

```bash
npm install
npm run dev
```

Then open the local URL shown in the terminal.

## Notes
This MVP uses a front-end knowledge base. For production learning, add a backend database and admin approval workflow before any resident-submitted answers are added to the live knowledge base.
