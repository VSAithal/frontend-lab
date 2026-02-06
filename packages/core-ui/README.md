# Core UI - A Personal Design System

Welcome to Core UI! This is a personal design system and component library built with React, TypeScript, and Tailwind CSS. It's designed to be a single source of truth for UI components, ensuring a consistent, high-quality look and feel across all my personal projects and portfolios.

This project is built using modern best practices, including a themeable architecture with CSS variables, and is developed and documented using Storybook.

## ✨ Features

- **React + TypeScript:** For a robust and type-safe development experience.
- **Tailwind CSS:** A utility-first CSS framework for rapid and consistent styling.
- **Themeable:** Uses a CSS variable-based theme (`theme.css`) and a Tailwind Preset (`tailwind.preset.ts`) for easy customization and theme switching.
- **Prefix `ds-`:** All Tailwind utilities are prefixed to prevent style collisions when used in other applications.
- **Storybook:** For isolated component development, documentation, and visual testing.
- **Vitest & Testing Library:** For fast, reliable unit and accessibility testing.
- **shadcn/ui Primitives:** Leverages unstyled, accessible primitives as a foundation.
- **`cva`:** For creating powerful, variant-driven components.

## 🚀 Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v18 or later recommended)
- npm (or your package manager of choice)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <your-repo-url>
    cd core-ui
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

## 📦 How to Consume (GitHub Packages)

This package is published to **GitHub Packages** (not npmjs). To install it in your project:

1.  **Create a GitHub token** with `read:packages` scope.
2.  **Add an `.npmrc`** to your project root:

    ```bash
    @vsaithal:registry=https://npm.pkg.github.com
    //npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
    ```

3.  **Install the package:**

    ```bash
    npm install @vsaithal/core-ui
    ```

4.  **Import styles (once in your app):**

    ```ts
    import '@vsaithal/core-ui/core-ui.css'
    ```

## 🛠️ Available Scripts

This project comes with a set of useful scripts defined in `package.json`.

- **Run Storybook:**
  This is the primary command for component development. It starts the Storybook server and opens it in your browser.

  ```bash
  npm run storybook
  ```

- **Run Unit Tests:**
  This command executes all unit tests (`.spec.tsx` files) using Vitest in a simulated DOM environment.

  ```bash
  npm run test
  ```

- **Run Unit Tests in Watch Mode:**
  To run tests automatically whenever you save a file, use:

  ```bash
  npm run test -- --watch
  ```

- **Linting and Formatting:**
  To check for code style issues and format the entire codebase:
  ```bash
  npm run lint
  npm run format
  ```
