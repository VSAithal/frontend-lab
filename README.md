# frontend-lab

Monorepo managed with pnpm workspaces and Turborepo.

## Structure
- apps/
- packages/
  - core-ui/

## Getting Started
### Requirements
- Node 20+
- pnpm 9.12.0 via Corepack:
```bash
corepack enable
corepack prepare pnpm@9.12.0 --activate
```

```bash
pnpm install
```

## Common Commands
```bash
pnpm build
pnpm lint
pnpm test
pnpm storybook
```

## Package-Specific Commands
```bash
pnpm -C packages/core-ui build
pnpm -C packages/core-ui test
pnpm -C packages/core-ui storybook
```
