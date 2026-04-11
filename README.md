# Umamusume Cheat Sheet

A comprehensive web-based guide for **Uma Musume Pretty Derby**, helping trainers quickly find character guides, skill recommendations, support card builds, race schedules, and more.

**Live Site:** [umamusume.wildquaker.com](https://umamusume.wildquaker.com/)

## Features

- **Characters** — Browse Uma Musume character guides with training tips
- **Skills** — Skill recommendations and details
- **Builds** — Support card deck suggestions
- **Races** — Key race schedules and scenarios
- **Links** — Curated collection of external community resources

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) 16 (App Router, React 19)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) 4
- **Package Manager:** [pnpm](https://pnpm.io/)
- **Deployment:** Docker + Nginx (self-hosted via GitHub Actions)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 25+
- [pnpm](https://pnpm.io/)

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

### Build

```bash
pnpm build
```

### Lint

```bash
pnpm lint
```

## Deployment

The project deploys automatically to production via a self-hosted GitHub Actions runner when changes are pushed to the `master` branch. Deployment can also be triggered manually from the Actions tab.

The production stack uses Docker Compose with two services:

| Service | Description |
|---|---|
| `umamusume-app` | Next.js standalone server (port 3000) |
| `umamusume-nginx` | Nginx reverse proxy (port 80 → 3000) |

To deploy manually:

```bash
docker compose up -d --build
```

## Project Structure

```
├── app/
│   ├── builds/          # Builds page
│   ├── characters/      # Characters page
│   ├── components/      # Shared UI components
│   ├── data/            # JSON data files (characters, skills, builds, races, links)
│   ├── lib/             # Utility functions
│   ├── links/           # Links page
│   ├── races/           # Races page
│   ├── skills/          # Skills page
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Homepage
│   └── globals.css      # Global styles
├── docker/
│   ├── Dockerfile       # Multi-stage Docker build
│   └── nginx.conf       # Nginx configuration
├── public/              # Static assets (favicons, images, sitemap)
├── .github/workflows/   # CI/CD pipeline
├── docker-compose.yml
└── package.json
```

## Data

Game data is stored as JSON files in `app/data/` and mounted as a read-only volume in production, allowing data updates without rebuilding the Docker image.

## License

This project is licensed under the [MIT License](LICENSE.txt).
