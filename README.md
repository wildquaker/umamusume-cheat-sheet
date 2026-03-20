# Uma Musume Cheat Sheet

A comprehensive reference tool and database for Uma Musume: Pretty Derby, built with Next.js, Tailwind CSS, and React.

This project provides quick access to character builds, skills, races, and other helpful resources for trainers.

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Language:** TypeScript
- **Deployment:** Docker & Nginx

## 🚀 Getting Started (Development)

First, install the dependencies. The project generally recommends `pnpm`, but you can use `npm` or `yarn`:

```bash
pnpm install
# or
npm install
```

Then, run the development server:

```bash
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## 🐳 Running with Docker (Production)

This project is configured for easy production deployments using Docker and Docker Compose. It utilizes Next.js's native `standalone` output mode to drastically reduce image size and improve reliability.

To spin up the production build (which includes the Next.js app and an Nginx reverse proxy):

```bash
# 1. Build the Docker images
docker compose build

# 2. Start the containers in the background
docker compose up -d
```

The app will be accessible at [http://localhost](http://localhost).

To stop the containers:

```bash
docker compose down
```
