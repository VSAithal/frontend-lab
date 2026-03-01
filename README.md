# frontend-lab

A frontend monorepo containing:

1. `apps/portfolio`: my personal portfolio app.
2. `packages/core-ui`: my reusable React component library and Storybook.

Built with pnpm workspaces + Turborepo.

## Live Demos
- Portfolio: [vsaithal-portfolio](https://vsaithal-portfolio.netlify.app)
- Core UI Storybook: [vsaithal-design-system](https://vsaithal-design-system.netlify.app)

## Core UI Links
- Core UI package folder: [packages/core-ui](https://github.com/VSAithal/frontend-lab/tree/master/packages/core-ui)
- Core UI detailed documentation: [packages/core-ui/README.md](https://github.com/VSAithal/frontend-lab/blob/master/packages/core-ui/README.md)

## Monorepo Structure
```txt
apps/
  portfolio/            # Portfolio SPA (React + Vite)
packages/
  core-ui/              # Design system + Storybook + tests
```

## What This Showcases
- Reusable, variant-driven design system architecture
- Accessibility-first UI primitives and patterns
- Monorepo workflow with shared packages and isolated app development
- Modern frontend engineering with React, TypeScript, Tailwind, Storybook, and Vitest

## Tech Stack
- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Storybook
- Vitest
- Changesets
- Turborepo

## Getting Started
### Prerequisites
- Node 20+
- pnpm 9.12.0

Setup pnpm via Corepack:
```bash
corepack enable
corepack prepare pnpm@9.12.0 --activate
```

Install dependencies:
```bash
pnpm install
```

## Run Locally
### Portfolio
```bash
pnpm --filter portfolio dev
```

### Core UI Storybook
```bash
pnpm -C packages/core-ui storybook
```

## Build Commands
### Portfolio build
```bash
pnpm --filter portfolio build
```

### Core UI library build
```bash
pnpm -C packages/core-ui build
```

### Core UI static Storybook build
```bash
pnpm -C packages/core-ui build-storybook
```

### Monorepo build
```bash
pnpm build
```

