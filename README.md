# Calqulate.net — Metabolic & Cardiovascular Risk-Reversal Platform

> **Watch your disease risk drop, not just the scale.**

Calqulate.net is a **USA-focused metabolic health & longevity SaaS** built on top of a large free-calculator SEO funnel. It turns a person's numbers and labs into a tracked **Metabolic Health Score**, validated clinical risk scores (10-year ASCVD, heart age, type-2 diabetes), a **Longevity Index (0–1000)**, a **Biological Age** estimate, and a Monte-Carlo **"Future You"** projection — then tells the user the single highest-impact change to make next.

The free calculators (50+) are the **top-of-funnel on-ramp**; **Calqulate Vitals** is the paid, longitudinal service.

---

## Table of contents
1. [Status & tech stack](#1-status--tech-stack)
2. [Products & features](#2-products--features)
3. [Clinical & algorithm methodology](#3-clinical--algorithm-methodology)
4. [Architecture & folder structure](#4-architecture--folder-structure)
5. [Database schema](#5-database-schema)
6. [Authentication](#6-authentication)
7. [Admin / developer mode](#7-admin--developer-mode)
8. [Notifications: push + weekly email](#8-notifications-push--weekly-email)
9. [Environment variables](#9-environment-variables)
10. [API routes](#10-api-routes)
11. [Pages map](#11-pages-map)
12. [Setup & run](#12-setup--run)
13. [Testing](#13-testing)
14. [Security](#14-security)
15. [Roadmap](#15-roadmap)
16. [Disclaimer](#16-disclaimer)

---

## 1. Status & tech stack

| Layer | Choice |
|---|---|
| Framework | **Next.js 14.2** (App Router) + **React 18** + **TypeScript** |
| Styling | **Tailwind CSS** + Radix UI primitives (`components/ui`) |
| Auth / DB / Storage | **Supabase** (Postgres, Auth, RLS) via `@supabase/ssr` |
| Payments | **Stripe** (Checkout + Billing Portal + webhooks) |
| Charts | **Recharts** |
| PDF | **@react-pdf/renderer** |
| Email | **Nodemailer** (SMTP) |
| Web Push | **web-push** (VAPID, self-hosted — no paid API) |
| Validation | **Zod** |
| Search (DSA) | In-house **Trie + Damerau-Levenshtein** (no dependency) |

**Design principle:** all health math is **pure, transparent TypeScript** — no external/paid AI APIs. Every result is reproducible and unit-tested.

> Note: the original v2 brief referenced Next.js 15; the repo currently runs **Next 14.2**. All v2 features are built and shipping on 14.2.

---

## 2. Products & features

### Free funnel (top of funnel)
- **50+ health calculators** under `/health/*` (BMI, body fat, ASCVD, diabetes risk, heart age, cholesterol, TDEE, etc.) — no login.
- **Trie + fuzzy search** (`/api/search`, `components/search`) with typo tolerance.
- **AEO/GEO answer hub** `/answers` + standalone high-intent pages `/answers/[slug]` with `FAQPage`/`QAPage` JSON-LD, written to be cited by Google & LLMs. Backed by `public/llms.txt`.
- **Ava** — an on-site assistant (`components/chat/ChatWidget.tsx`) that routes users to the right calculator/tracker, answers questions, shows pricing, and hands off to email. Pure intent-matching + the site search engine (no API cost).

### Calqulate Vitals (paid service)
- **Metabolic Health Score** (0–100, A–F) + score **trajectory engine** (Kalman) that separates real signal from daily noise.
- **Counterfactual "next lever"** — re-runs the validated engines on the user's own inputs to rank changes by impact-per-effort, in their own numbers.
- **Longevity Index (0–1000)** + **Biological Age** with ranked levers (`lib/healthCalculations.ts`).
- **"Future You" simulator** (`/dashboard/future`) — 600-iteration Monte-Carlo projection across optimistic / realistic / pessimistic adherence with p10/p50/p90 confidence bands (`lib/simulationEngine.ts`).
- **Three trackers** on the dashboard: Metabolic Health Score, Heart Age, GLP-1 Progress (weight + lean-mass protection).
- **GLP-1 Autopilot** (`/dashboard/protocol`) — adaptive 12–24 week titration schedule (semaglutide/tirzepatide ladders), weekly missions, protein target (1.6 g/kg goal weight), meal timing & training, with a weekly check-in that **holds the dose when side-effects are logged** (`lib/protocolGenerator.ts`).
- **Doctor-shareable PDF report** (`/api/vitals/report`, Pro).
- **USA units** — kg/lb + cm/in toggle on the metric form (`lib/units.ts`).
- **Weekly progress email** + optional **mobile push** (PWA), branded "Calqulate.net".

### Service landing pages (SEO)
`/service/metabolic-health-tracker`, `/service/heart-age-tracker`, `/service/glp1-progress-tracker` — each with dynamic metadata, JSON-LD, free snapshot form, and the single pricing plan.

---

## 3. Clinical & algorithm methodology

All engines are pure functions in `lib/` with test harnesses in `scripts/`.

| Engine | Model / method | File |
|---|---|---|
| 10-yr ASCVD risk | 2013 ACC/AHA Pooled Cohort Equations (Goff 2013) | `lib/clinical/ascvd.ts` |
| Heart age / 10-yr CVD | Framingham General CVD, lipid (D'Agostino 2008) | `lib/clinical/framingham.ts` |
| Type-2 diabetes risk | FINDRISC (Lindström & Tuomilehto 2003) | `lib/clinical/diabetesRisk.ts` |
| Body composition | BMI, waist-to-height, RFM, US Navy %BF, Boer LBM | `lib/clinical/bodyComposition.ts` |
| Metabolic Health Score | Transparent weighted composite (0–100) | `lib/clinical/compositeScore.ts` |
| Trajectory engine | Local-linear-trend **Kalman filter** + OLS verdict | `lib/vitals/trajectory.ts` |
| Next-lever | **Counterfactual** simulation against the validated engines | `lib/vitals/nextLever.ts` |
| Risk graph | Weighted directed graph + DFS | `lib/graph/riskGraph.ts` |
| Biological Age | Transparent biomarker-weighted (Klemera-Doubal inspired) | `lib/healthCalculations.ts` |
| Longevity Index | Weighted roll-up (0–1000) + ranked levers | `lib/healthCalculations.ts` |
| Future You | **Monte-Carlo** trajectory simulation (3 scenarios, bands) | `lib/simulationEngine.ts` |
| GLP-1 Autopilot | Adaptive dose-ladder titration + missions | `lib/protocolGenerator.ts` |

These are **educational decision-support**, not validated single indices for the composites — methodology is documented in code and surfaced in the UI.

---

## 4. Architecture & folder structure

```
app/
├── page.tsx                     # Homepage (service-first, advanced-platform section)
├── layout.tsx                   # Root layout: GTM, Clarity, ChatWidget, SW register, PWA meta
├── manifest.ts                  # PWA manifest (/manifest.webmanifest)
├── sitemap.ts                   # Auto + service/answer URLs
├── health/*                     # 50+ free calculators
├── service/[slug]/              # Vitals SEO landing pages
├── how-it-works/                # Flagship convince page
├── answers/  +  answers/[slug]/ # AEO answer hub + standalone pages
├── login, signup, auth/         # Supabase auth pages + callback/signout
├── dashboard/                   # Paid app
│   ├── page.tsx                 # Mission control: Longevity hero + 3 trackers + trajectory + levers
│   ├── future/                  # "Future You" Monte-Carlo simulator
│   ├── protocol/                # GLP-1 Autopilot
│   ├── history/, settings/      # History + privacy/notifications
├── admin/                       # Admin panel (role-gated)
│   ├── page, users, subscriptions, reports, dev, audit-logs, settings
└── api/
    ├── vitals/{compute,measurements,report,protocol}
    ├── stripe/{checkout,portal,webhook}
    ├── auth/{signup,login,oauth}
    ├── account/{export,delete}
    ├── admin/                   # admin actions (grant pro, seed, delete…)
    ├── push/subscribe
    ├── notifications/{prefs,test}
    ├── cron/weekly-digest
    └── search

components/
├── vitals/      # ScoreGauge, TrackerCards, SinglePlan, MetricForm, Paywall, panels…
├── health/      # LongevityHero, SimulationRunner, TrajectoryChart, ProtocolBuilder
├── admin/       # AdminSidebar, UsersTable, StatCard, DevTools
├── pwa/         # ServiceWorkerRegister, NotificationSettings
├── chat/        # ChatWidget (Ava)
├── auth/, search/, layout/ (header, footer)

lib/
├── clinical/*               # validated risk engines
├── vitals/{trajectory,nextLever}
├── healthCalculations.ts    # bio age + longevity index
├── simulationEngine.ts      # Monte-Carlo
├── protocolGenerator.ts     # GLP-1 Autopilot
├── email/{mailer,weeklyDigest}
├── push.ts                  # web-push (VAPID)
├── units.ts                 # kg/lb, cm/in
├── supabase/{client,server,middleware}
├── stripe/{plans,server}
├── security/{rateLimit,turnstile,headers}
├── search/{trie,fuzzy,engine,catalog}
├── auth.ts, admin.ts, admin-core.ts

supabase/migrations/   0001_init.sql · 0002_admin.sql · 0003_longevity.sql
scripts/               test-clinical, test-vitals-algo, test-v2-engines, test-protocol
public/                sw.js, llms.txt, robots.txt
middleware.ts          session refresh + /dashboard & /admin gating (scoped)
```

---

## 5. Database schema

Three migrations, all Postgres/Supabase with **Row-Level Security** (owner-only) + admin-read policies.

**`0001_init.sql`** — `profiles`, `subscriptions`, `measurements`, `risk_results`, `reports`, `reminders`; RLS owner policies; signup trigger auto-creates a free profile + subscription.

**`0002_admin.sql`** — adds `profiles.role` (`user`/`admin`) + `suspended`; `is_admin()` SQL helper; admin-read policies; **`audit_logs`**; **`site_settings`**.

**`0003_longevity.sql`** — `health_snapshots`, `glp1_protocols`, `daily_mission_logs`, `trajectory_simulations`, **`push_subscriptions`**, **`notification_prefs`**; owner RLS + admin read.

> Run them in order in the Supabase SQL editor. After `0002`, optionally: `update public.profiles set role='admin' where email='you@example.com';`

---

## 6. Authentication

- **Supabase Auth** via `@supabase/ssr` (browser + server + middleware clients in `lib/supabase/`).
- **Email/password** (Turnstile + consent required) and **OAuth** — Google + Azure (Microsoft/Outlook).
- **Anti-bot:** Cloudflare Turnstile verified server-side on signup/login (`lib/security/turnstile.ts`); fails closed in production, allows in dev when unconfigured.
- **Rate limiting** on sensitive routes (`lib/security/rateLimit.ts`).
- **Middleware** (`middleware.ts` + `lib/supabase/middleware.ts`) refreshes the session and gates `/dashboard` (auth) and `/admin` (admin). **Scoped** matcher so the rest of the site (and its AdSense/GTM/Clarity) is untouched; the Stripe webhook is excluded.
- **Paywall:** `lib/auth.ts` → `getAccess()` / `hasPaidAccess()`. Paid routes return **HTTP 402** for free users.

---

## 7. Admin / developer mode

**Purpose:** access and test every paid feature **without paying**.

- **Who is admin:** `profiles.role = 'admin'` **OR** the `ADMIN_EMAILS` env allowlist (works before any SQL).
- **Paywall bypass:** admins resolve to `tier: pro, isActive: true` in `getAccess()` — so dashboard, trackers, Future You, Autopilot, and PDF all unlock automatically.
- **Panel** (`/admin`, `noindex`, middleware + server `requireAdmin()` guarded):
  - **Dashboard** — live KPIs (users, paid subs, est. MRR/ARR, measurements, reports).
  - **Users** — search, set role, grant/revoke Pro, delete.
  - **Subscriptions / Reports** — read-only views.
  - **Dev Tools** — *Grant myself Pro*, **Seed 8 weeks** of realistic improving data (lights up trajectory/levers/Longevity/Future You), Reset.
  - **Audit Logs** — every admin action recorded.
  - **Settings** — read-only env/config health check.
- All admin reads use the service-role client (bypasses RLS); every write is audit-logged (`lib/admin.ts`).

> Planned admin modules (need data infrastructure not yet present): Payments/Stripe analytics, DAU/WAU/MAU + funnel/churn/LTV, calculator enable-disable/CTR, content CMS, notifications broadcast, system metrics.

---

## 8. Notifications: push + weekly email

**PWA + Web Push (branded "Calqulate.net"):**
- `app/manifest.ts` (installable) + `public/sw.js` (push + click handling) + `ServiceWorkerRegister`.
- Opt-in flow in `/dashboard/settings` (`NotificationSettings.tsx`) → asks permission → subscribes → `/api/push/subscribe`.
- Sender: `lib/push.ts` (VAPID). Generate keys: `npx web-push generate-vapid-keys`.

**Weekly email (from `support@calqulate.net`):**
- `lib/email/mailer.ts` (Nodemailer SMTP) + `lib/email/weeklyDigest.ts` — a **week-on-week** HTML "score dashboard" per paid user (score + delta, sparkline, heart-age/risk tiles, Longevity Index, top lever, CTAs).
- **Fan-out:** `/api/cron/weekly-digest?secret=CRON_SECRET` — emails active paid members (respecting opt-out) + sends a push nudge. Point a weekly scheduler (Vercel Cron / cron-job.org / Supabase pg_cron) at it.
- **Self-test:** `/api/notifications/test` ("Send me a test weekly email" button).
- Prefs: `/api/notifications/prefs` (weekly email + push toggles).

---

## 9. Environment variables

```bash
# Site
NEXT_PUBLIC_SITE_URL=https://calqulate.net

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=        # REQUIRED for auth (@supabase/ssr)
SUPABASE_SERVICE_ROLE_KEY=            # admin + webhook + cron (server-only)

# Stripe (payment setup)
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_PLUS_MONTHLY=
STRIPE_PRICE_PLUS_YEARLY=
STRIPE_PRICE_PRO_MONTHLY=
STRIPE_PRICE_PRO_YEARLY=

# Cloudflare Turnstile (anti-bot; optional in dev)
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=

# Admin / developer mode (comma-separated allowlist)
ADMIN_EMAILS=you@example.com

# Weekly email — support@calqulate.net mailbox (you provide)
SUPPORT_SMTP_HOST=
SUPPORT_SMTP_PORT=587
SUPPORT_SMTP_USER=
SUPPORT_SMTP_PASS=
SUPPORT_FROM_EMAIL=support@calqulate.net

# Web Push (npx web-push generate-vapid-keys)
NEXT_PUBLIC_VAPID_PUBLIC_KEY=
VAPID_PRIVATE_KEY=
VAPID_SUBJECT=mailto:support@calqulate.net

# Weekly digest scheduler
CRON_SECRET=

# (existing) transactional SMTP for contact/calculator-request forms
SMTP_HOST= SMTP_PORT= SMTP_USER= SMTP_PASS=
```

Everything degrades gracefully when unset (Stripe → "Unknown plan"; SMTP → clear message; VAPID → push hidden).

---

## 10. API routes

| Route | Purpose | Gate |
|---|---|---|
| `POST /api/vitals/compute` | Stateless full report + protocol | rate-limited |
| `GET/POST /api/vitals/measurements` | List / save measurement (+ report) | 402 if free |
| `GET /api/vitals/report` | Doctor PDF | Pro |
| `POST /api/vitals/protocol` | Generate + save GLP-1 protocol | paid |
| `POST /api/stripe/checkout` · `/portal` · `/webhook` | Subscriptions | — |
| `POST /api/auth/{signup,login,oauth}` | Auth (Turnstile + rate limit) | — |
| `GET /api/account/export` · `POST /delete` | GDPR/CCPA | auth |
| `GET /api/search` | Trie + fuzzy search | rate-limited |
| `POST /api/admin` | Admin actions (grant pro, seed, delete…) | admin |
| `POST/DELETE /api/push/subscribe` | Push subscription | auth |
| `GET/POST /api/notifications/prefs` · `POST /test` | Notification prefs + self-test | auth |
| `GET/POST /api/cron/weekly-digest` | Weekly fan-out | `CRON_SECRET` |

---

## 11. Pages map

- **Public:** `/`, `/how-it-works`, `/answers` (+ `/answers/[slug]`), `/service/[slug]`, `/search`, `/blog`, `/gallery`, `/about-us`, `/health/*`, legal pages.
- **Auth:** `/login`, `/signup`, `/auth/callback`, `/auth/signout`.
- **App (paid/admin):** `/dashboard`, `/dashboard/future`, `/dashboard/protocol`, `/dashboard/history`, `/dashboard/settings`.
- **Admin:** `/admin`, `/admin/{users,subscriptions,reports,dev,audit-logs,settings}`.

---

## 12. Setup & run

```bash
# 1. Install
npm install

# 2. Configure env
cp .env.example .env.local   # then fill values (see §9)

# 3. Database — run in Supabase SQL editor, in order:
#    supabase/migrations/0001_init.sql
#    supabase/migrations/0002_admin.sql
#    supabase/migrations/0003_longevity.sql
#    Enable Email + Google + Azure providers; add /auth/callback redirect URL.

# 4. Run
npm run dev        # http://localhost:3000
npm run build      # production build
```

**Try the paid app without paying:** sign up with an `ADMIN_EMAILS` email → `/admin → Dev Tools → Seed 8 weeks` → open `/dashboard`.

---

## 13. Testing

Pure-engine test harnesses (run with `npx tsx --tsconfig tsconfig.json <file>`):

```bash
npm run test:clinical                                  # ASCVD reference cases
npx tsx --tsconfig tsconfig.json scripts/test-vitals-algo.mts   # trajectory + next-lever
npx tsx --tsconfig tsconfig.json scripts/test-v2-engines.mts    # bio age + longevity + Monte-Carlo
npx tsx --tsconfig tsconfig.json scripts/test-protocol.mts      # GLP-1 titration
```

---

## 14. Security

- **RLS** on every table (owner-only) + admin-read policies; admin panel uses service-role server-side only.
- **CSP + security headers** applied to Vitals routes (`lib/security/headers.ts`), allowlisting Stripe, Turnstile, Supabase, and the shared analytics origins.
- **Turnstile** + **rate limiting** on auth/compute/search/checkout.
- **Stripe** card data never touches the server (hosted Checkout/Portal); webhook signatures verified; webhook excluded from middleware.
- **Admin** triple-guarded: middleware → server `requireAdmin()` → audit logging.
- **Push** uses VAPID (self-hosted); **email** via your SMTP. No third-party AI/data APIs.

---

## 15. Roadmap

Shipped: free funnel, Vitals trackers, Longevity/Bio-age, Future You, GLP-1 Autopilot, AEO answers, Ava chatbot, admin/dev mode, PWA + push + weekly email architecture.

**Next (need a dependency or infra decision):**
- **3D body avatar + organ-system dashboard** — `three` + `@react-three/fiber` + `drei`.
- **Daily mission logs UI** (table exists) + adherence trend.
- **Mission Control dark redesign** + PDF report with 3D/chart screenshots (`html2canvas`).
- **Analytics events table** → DAU/WAU/MAU, funnel, churn, LTV (unlocks the admin analytics module).
- **Realtime** dashboard updates via Supabase Realtime.

---

## 16. Disclaimer

Calqulate is **educational decision-support — not medical, legal, or financial advice**, and not a diagnosis, treatment, or prescription. Every clinical surface carries this notice. Users should consult a licensed clinician for health decisions; GLP-1 dosing must be confirmed with a prescriber.

© Calqulate.net
