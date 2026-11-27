# SUFIAN. Hire to unlock.

Personal portfolio for Sufian Sayed, Business & Technology Analyst, Perth WA.
A streaming style portfolio: browse projects as titles, open each for the full story,
filter by career, explore skills and search everything.

Built with Next.js, React, TypeScript, Tailwind CSS and Lucide icons. No database.

## Run it on your computer

1. Install Node.js 20 or newer from https://nodejs.org
2. In this folder run:
   ```
   npm install
   npm run dev
   ```
3. Open http://localhost:3000

## Edit your content (no design changes needed)

| What | File |
|---|---|
| Projects (add, edit, remove, change status) | `data/projects.ts` |
| Skills, and the career paths | `data/skills.ts` |
| Name, email, LinkedIn, GitHub, about text, experience, certifications | `data/profile.ts` |
| Resume download | replace `public/resume.pdf` |
| Project images | put files in `public/`, then set `thumbnail`, `banner` or `screenshots` on the project |

Rules built in:
- Any field you leave out is hidden, so there are never empty sections.
- Skills with `show: false` stay hidden until you switch them on. Only switch on skills you have used or studied.
- Planned projects are labelled **Concept** and sit in the collapsed "Coming soon" area.
- GitHub is hidden until you add your URL in `data/profile.ts`.
- `/#project=ears` opens a project directly, handy for links in applications.

## Deploy to Vercel (free)

1. Create a GitHub repository and push this folder to it:
   ```
   git init
   git add .
   git commit -m "Portfolio"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/sufian-portfolio.git
   git push -u origin main
   ```
2. Go to https://vercel.com, sign in with GitHub, click **Add New > Project** and import the repository.
3. Leave the settings as they are and click **Deploy**. You get a link like `sufian-portfolio.vercel.app`.
4. Optional: in Vercel, **Settings > Environment Variables**, add `NEXT_PUBLIC_SITE_URL` with your final link (used for sharing previews).

## Contact form

The form validates input and has spam protection (hidden honeypot field, minimum fill time, length limits, rate limit).
To have it actually send email:
1. Create a free account at https://resend.com and make an API key.
2. In Vercel, add environment variables from `.env.example`: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and optionally `CONTACT_FROM_EMAIL`.
3. Redeploy.

Until then, the form tells visitors to email you directly, so no message is silently lost.
Never put the API key in the code; keep it in Vercel's environment variables.

## Checked before delivery

- Production build passes (`npm run build`).
- Navigation, search ("Power BI", "AWS", "Business Analyst"), empty search state, category filters, career selector, skill explorer, project detail modal, recently viewed row, resume download and contact validation tested.
- No sideways scrolling at 390px wide; modal and rows work on phones.

This is an independent personal portfolio and is not affiliated with any streaming service.
