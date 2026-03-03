# Fenrir  Security Scan Platform

A modern frontend for an AI-powered security scanning platform. Built with React + Vite, it covers the full scan workflow: from login to live scan monitoring.

---

Loom Video: https://www.loom.com/share/ebb5c94adf3e4f0aaf2157b12c006e43
Live Deployed URL: https://fenrir-security-scan-platform.vercel.app/login

## What's inside

Three main screens, all fully responsive and theme-aware:

- **Login**  clean split-panel signup with social login (Apple, Google, Meta) and client-side validation
- **Dashboard**  live overview of all scans, severity breakdown, and a searchable/filterable scan table
- **Scan Detail**  real-time scan progress with a step tracker, activity console, and a live finding log

---

## Tech used

| Thing | What |
|-------|------|
| React 18 | UI, functional components + hooks only |
| Vite 5 | Build tool |
| Tailwind CSS v4 | Styling, class-based dark mode |
| Zustand | Auth + theme + toast state |
| React Router v6 | Routing + protected routes |
| Lucide React | Icons |

No backend. Everything runs on mock data.

---

## Getting started

```bash
# Clone the repo
git clone <your-repo-url>
cd fenrir-security-scan-platform/fenrir-scan

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

You'll land on the login page. Fill in the form or just click one of the social login buttons  it'll take you straight to the dashboard.

---

## Project structure

```
fenrir-scan/
├── src/
│   ├── components/
│   │   ├── layout/       # Sidebar, ThemeToggle
│   │   └── ui/           # Button, Input, Badges, Toast
│   ├── mock/
│   │   └── data.js       # All mock scan data lives here
│   ├── pages/
│   │   ├── LoginPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── ScanDetailPage.jsx
│   │   └── NotFoundPage.jsx
│   ├── store/
│   │   └── index.js      # Zustand stores (auth, theme, toasts)
│   └── App.jsx           # Routes + theme init
```

---

## Features

- **Dark / Light mode**  persisted to localStorage, toggleable from the sidebar
- **Mobile responsive**  card-based list on mobile, full table on desktop; sidebar becomes a slide-in drawer
- **Form validation**  inline errors for all fields; password strength, email format, terms checkbox
- **Live console**  Activity Log and Verification Loops tabs with terminal-style output
- **Finding log**  severity-tagged findings (Critical → High → Medium → Low) with timestamps
- **Toast notifications**  feedback for scan stop, export, new scan, etc.
- **Protected routes**  unauthenticated users are redirected to login

---

## Customizing mock data

Everything you see in the UI comes from `src/mock/data.js`. To change the scans, findings, or stats, just edit that file  no API calls needed.

---

## Deployment

```bash
npm run build
```

The output goes to `dist/`. Drop it on Vercel, Netlify, or any static host  it just works.

---

## Notes

- This is a **frontend-only** implementation. There's no real backend, auth service, or live scan engine.
- The mock data is intentionally realistic to make the UI feel alive during demos.
- All components are functional  no class components, no Redux.

---

## Contact

<div align="center">

[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:khchakri@gmail.com)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/hemanth-chakravarthy)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/hemanth-chakravarthy-kancharla-a27b87357)
[![Portfolio](https://img.shields.io/badge/Portfolio-FF5722?style=for-the-badge&logo=todoist&logoColor=white)](https://hemanth-chakravarthy.netlify.app/)

</div>

---
## License

MIT

---
