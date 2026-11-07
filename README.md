# STAR Security & Staffing — Final Website Project

Responsive React + Vite landing page. The header/footer use the dedicated rectangular STAR logo (not the shield uniform patch). The About section uses the exact office-building photograph supplied by the user. The contact form emails enquiries to `Admin@starsecurity.info` through a Vercel serverless function.

## Final project structure

```text
star-security-landing-final/
├── api/
│   └── contact.js
├── public/
│   ├── star-security-logo.png
│   ├── star-security-emblem.png
│   ├── star-office-branding.jpg
│   ├── security-officer-hero.jpg
│   ├── patch-security-shield.png
│   ├── patch-rank-epaulette.png
│   ├── patch-collar-flap.png
│   ├── industry-hospital.jpg
│   ├── industry-corporate.jpg
│   ├── industry-manufacturing.jpg
│   ├── industry-education.jpg
│   ├── industry-residential.jpg
│   └── industry-events.jpg
├── src/
│   ├── main.jsx
│   └── styles.css
├── .gitignore
├── index.html
├── package.json
└── README.md
```

## Deploy from GitHub to Vercel

1. Create a GitHub repository, e.g. `star-security-website`.
2. Extract this ZIP and upload the **contents** of the folder to the repository root (not the ZIP itself).
3. In Vercel, choose **Add New → Project** and import the GitHub repository.
4. Use these settings: Framework `Vite`; Build Command `npm run build`; Output Directory `dist`; Install Command `npm install`.
5. Deploy.

## One-time email configuration

The website code is complete, but live email delivery requires your private Resend key and a verified sender domain.

1. Create/sign in at https://resend.com/
2. Verify `starsecurity.info` in Resend by adding the DNS records it provides.
3. Create a Resend API key.
4. In Vercel → Project → Settings → Environment Variables, add:

| Variable | Value |
|---|---|
| `RESEND_API_KEY` | Your private Resend API key |
| `EMAIL_FROM` | `STAR Security <enquiries@starsecurity.info>` |

5. Apply the variables to Production (and Preview if desired), save, then redeploy.

Enquiries are sent to `Admin@starsecurity.info`. The sender's email is set as Reply-To. Enquiries are not stored in a database. Never put the Resend API key in frontend code or commit it to GitHub.

## Asset notes

- `star-security-logo.png` is the dedicated rectangular logo supplied by the user; it is used in the top-left header and footer.
- `star-office-branding.jpg` is the exact office-building photograph supplied by the user.
- `security-officer-hero.jpg` is the approved guard visual crop from the final UI preview.
- The three supplied uniform insignia files are included in `public/` as original assets.
- No phone number is displayed.

Before publishing, confirm the 10-year experience statement and add any required agency licence/registration details and the correct social profile URL.
