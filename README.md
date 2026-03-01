# 🏇 Umamusume Cheat Sheet

A personal quick-reference guide for **Uma Musume: Pretty Derby**, built to help trainers find the information they need at a glance — from character guides and skill recommendations to support card builds and race schedules.

**Live site:** [umamusume.wildquaker.com](https://umamusume.wildquaker.com)

## Features

- **Characters** — Browse Uma guides with training tips and recommendations
- **Skills** — Skill recommendations organized for quick lookup
- **Builds** — Support card deck compositions
- **Races** — Key race schedules and details
- **Links** — Curated collection of external community resources

> Data is based on the Global version and community research.

## Tech Stack

| Layer      | Technology                                                         |
| ---------- | ------------------------------------------------------------------ |
| Backend    | [Laravel 12](https://laravel.com/) (PHP 8.2+)                      |
| Frontend   | [Vue 3](https://vuejs.org/) + [Inertia.js](https://inertiajs.com/) |
| Styling    | [Tailwind CSS v4](https://tailwindcss.com/)                        |
| Bundler    | [Vite](https://vite.dev/)                                          |
| Data       | Static JSON files (`config/data/`)                                 |
| Deployment | GitHub Actions → self-hosted runner on Apache                      |

## Getting Started

### Prerequisites

- PHP 8.2+
- Composer
- Node.js 22+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/wildquaker/umamusume-cheat-sheet-v2.git
cd umamusume-cheat-sheet-v2

# Run the setup script (installs dependencies, generates key, builds assets)
composer setup
```

Or manually:

```bash
composer install
cp .env.dev .env        # Use the dev environment file
php artisan key:generate
npm install
npm run build
```

### Development Server

```bash
composer dev
```

This starts the Laravel dev server, queue listener, and Vite HMR concurrently.

## Project Structure

```
├── app/
│   ├── Http/Controllers/    # Route controllers
│   └── Services/            # DataLoaderService (JSON → cached arrays)
├── config/data/             # Static JSON data files
├── resources/js/
│   ├── components/          # Reusable Vue components
│   ├── layouts/             # App and cheat sheet layouts
│   └── pages/CheatSheet/    # Page components (Home, Characters, Skills, etc.)
├── routes/
│   └── web.php              # Public routes
└── .github/workflows/       # CI/CD (lint, tests, deploy)
```

## Deployment

Deployment is automated via GitHub Actions on push to `master`. The workflow:

1. Waits for the linter workflow to pass
2. Installs dependencies and builds frontend assets on the self-hosted runner
3. Syncs the project to the Apache document root via `rsync`
4. Caches Laravel config, routes, and views

See [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) for details.

## License

This project is for personal use. All Uma Musume: Pretty Derby assets and trademarks belong to [Cygames, Inc.](https://www.cygames.co.jp/)
