# MealLedger

Paperless H1530s and real-time CACFP compliance for multi-site providers.

## Stack
- **Frontend:** React 18 + TypeScript + Vite
- **Backend:** Node.js + Express + TypeScript
- **Shared:** TypeScript types for the demo-request payload

## Project structure
```
CACFP Food Program/
├── frontend/   # Vite + React landing page (and future app shell)
├── backend/    # Express API (demo requests, future POS + validator endpoints)
└── shared/     # Types shared by frontend and backend
```

## Quick start

You need Node.js 18+ and npm.

```bash
# 1. Install everything
npm install
npm install --prefix frontend
npm install --prefix backend

# 2. Run the API (port 4000)
npm run dev --prefix backend

# 3. In a second terminal, run the frontend (port 5173)
npm run dev --prefix frontend
```

Open http://localhost:5173.

The "Request a demo" form on the landing page POSTs to `http://localhost:4000/api/demo-requests`.

## What's built so far
- Full marketing landing page: hero, features, compliance/trust strip, pricing, testimonials, FAQ, footer
- "Request a demo" modal wired to a working Express endpoint
- Sign-in / sign-up modal scaffolding (UI only, not yet wired to auth)
- Brand system: navy `#1c4a7e`, action orange `#f5a623`, compliant green `#7cb342`

## Deploying to Render

This repo includes a `render.yaml` Blueprint that provisions both services in one shot.

1. Push this folder to a GitHub repo.
2. In Render: **New → Blueprint → connect the repo → Apply**.
3. Render creates two services:
   - **mealledger-api** — Express API at `https://mealledger-api.onrender.com`
   - **mealledger-frontend** — Static Vite build at `https://mealledger-frontend.onrender.com`
4. The Blueprint auto-wires environment variables so the frontend knows the API URL and the backend allows CORS from the frontend. No manual env-var entry needed.

**Notes**
- Both services start on Render's **free plan**. Free web services sleep after 15 min of inactivity (first request after sleep takes ~30s). Upgrade `mealledger-api` to **Starter ($7/mo)** before sharing the URL with real users.
- The frontend's `/*` rewrite to `index.html` is included so client-side routing will work once we add `/app/*` routes.
- The "Request a demo" endpoint currently stores submissions in memory — they're lost on every deploy. We'll move to Postgres in the next milestone.
- To use a custom domain (e.g. `mealledger.com`), add it in the Render dashboard for the frontend service. Render handles SSL automatically.

## Environment variables

**Backend (`backend/.env`)**
```
PORT=4000
CORS_ORIGIN=http://localhost:5173
```

**Frontend (`frontend/.env.local`)** — only needed in production builds; in dev the Vite proxy handles it.
```
VITE_API_BASE_URL=
```

## What's next (in order)
1. **Auth** — sign up, sign in, password reset, session cookies
2. **Postgres** — switch from in-memory store to Render Postgres (free tier available)
3. **Org / sites / users data model** — schema (provider → sites → users → participants)
4. **CACFP validator** — vegetable crediting (1/8 cup min, leafy greens 0.5x raw, juice ≤1x/day), snack 2-of-5, meal pattern checks
5. **H1530 digital grid** — daily meal count, attendance, meal production
6. **Reports** — H1530 export (PDF), site rollups, sponsor view

## Note on the USDA CACFP logo
The CACFP program logo shown in the trust strip is property of USDA. MealLedger is **not affiliated with or endorsed by USDA or TDA**. Replace `frontend/public/cacfp-logo.png` with the official logo file before going public, and review usage with counsel.
