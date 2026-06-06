# 🌱 Plantasync

A full-stack plant care companion for tracking the plants you own, logging their
care, and discovering new ones. Snap a photo to identify a plant, build out your
garden, and keep on top of watering, rotating, and fertilizing schedules.

Plantasync is a personal project built to deepen and demonstrate my full-stack
skills — server-side rendering, custom authentication, a third-party
identification API, and a modern React toolchain deployed to the edge.

## Features

- **Plant identification** — upload a photo and identify the species via the
  [PlantNet](https://my.plantnet.org/) API.
- **Personal garden** — add plants to your collection with category, climate,
  light, and health metadata.
- **Care tracking** — log watering, rotating, fertilizing, and skipped actions,
  with a per-plant history and custom care schedules.
- **Explore** — browse a public catalog of plants for inspiration.
- **Accounts** — register, log in, and keep your garden in sync across sessions.

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | [React Router v7](https://reactrouter.com/) (framework mode, SSR) + React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + [shadcn/ui](https://ui.shadcn.com/) (Radix primitives) |
| Data | [Supabase](https://supabase.com/) via the PostgREST REST API |
| Auth | Custom JWT auth with [`jose`](https://github.com/panva/jose) — short-lived access tokens + hashed refresh tokens stored as sessions, delivered as `httpOnly` cookies |
| Identification | [PlantNet](https://my.plantnet.org/) API |
| Build / dev | Vite 6 |
| Hosting | [Cloudflare Workers](https://workers.cloudflare.com/) via Wrangler |

## Getting started

### Prerequisites

- Node.js (latest LTS — see [mise.toml](mise.toml))
- [Yarn](https://classic.yarnpkg.com/) (Classic / v1)
- A Supabase project and a PlantNet API key

### Install

```bash
yarn install
```

### Environment variables

Create a `.env` file in the project root:

```bash
VITE_IMAGE_CDN_URL=        # base URL for plant/asset images
VITE_SUPABASE_URL=         # your Supabase project URL
VITE_SUPABASE_ANON_KEY=    # Supabase anon/public key
VITE_PLANT_NET_KEY=        # PlantNet API key
VITE_PLANT_NET_URL=        # PlantNet identification endpoint
VITE_JWT_SECRET=           # secret used to sign access tokens
```

### Develop

```bash
yarn dev
```

The app runs at `http://localhost:5173` with HMR.

## Available scripts

| Script | Description |
| --- | --- |
| `yarn dev` | Start the development server |
| `yarn build` | Build for production |
| `yarn preview` | Build and preview the production bundle locally |
| `yarn typecheck` | Generate types (Cloudflare + React Router) and run `tsc` |
| `yarn deploy` | Build and deploy to Cloudflare Workers |

## Project structure

```text
app/
├── components/      # UI components (cards, drawers, forms, scanner) + shadcn/ui
├── db/              # Supabase query helpers (getData / postData / deleteData)
├── hooks/           # Custom React hooks
├── layout/          # Navbar, Footer, page container
├── routes/          # Route modules
│   ├── home.tsx
│   ├── account.tsx
│   ├── plants/      # garden index, plant detail, add
│   ├── explore/     # public catalog
│   └── api/         # scanner + auth (login/register/logout) actions
├── server/          # Server-only logic (auth: JWT + cookies)
├── utils/           # Helpers and shadcn utilities
├── constants.ts     # Shared option lists (climates, lights, categories…)
├── root.tsx         # App shell, root loader, error boundary
└── routes.ts        # Route configuration
workers/             # Cloudflare Worker entry
```

## Deployment

Plantasync deploys to Cloudflare Workers:

```bash
yarn deploy
```

Configuration lives in [wrangler.jsonc](wrangler.jsonc). Make sure the required
environment variables are configured as Worker secrets/vars before deploying.
