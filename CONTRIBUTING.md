# Contributing to the Electromagnetism Virtual Lab

First of all, thank you for considering contributing to this project! We are excited to see this educational tool grow with the help of the community. Every contribution, from a small typo fix to a new feature, is highly appreciated.

This document provides a set of guidelines to help you contribute effectively.

## 📖 Table of Contents

- [Ways to Contribute](#ways-to-contribute)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Enhancements](#suggesting-enhancements)
- [Setting Up Your Development Environment](#setting-up-your-development-environment)
- [Project Structure](#project-structure)
- [Code Style Guide](#code-style-guide)
- [Submitting a Pull Request](#submitting-a-pull-request)

## Ways to Contribute

There are many ways you can help improve this project:

- **Reporting bugs:** If you find something that isn't working as expected.
- **Suggesting enhancements:** If you have an idea for a new feature or an improvement to an existing one.
- **Improving documentation:** If you find parts of the documentation that are unclear or could be improved.
- **Writing code:** If you want to fix a bug or implement a new feature yourself.

## Reporting Bugs

Before creating a bug report, please check the existing [Issues](https://github.com/Elimge/electromagnetism-lab/issues) to see if someone has already reported it.

When creating a bug report, please include as many details as possible:

- A clear and descriptive title.
- A step-by-step description of how to reproduce the bug.
- The expected behavior and what actually happened.
- Screenshots or GIFs are extremely helpful.
- The browser and operating system you are using.

[➡️ Report a Bug](https://github.com/Elimge/electromagnetism-lab/issues/new/choose)

## Suggesting Enhancements

If you have an idea for an enhancement, feel free to open an [Issue](https://github.com/Elimge/electromagnetism-lab/issues/new/choose) or start a conversation in the [Discussions](https://github.com/Elimge/electromagnetism-lab/discussions) tab. We'd love to hear your thoughts!

## Setting Up Your Development Environment

Ready to write some code? Here’s how to get your local environment set up.

1.  **Fork the repository:** Click the "Fork" button at the top right of the repository page.
2.  **Clone your fork:**
    ```bash
    git clone https://github.com/YOUR_USERNAME/electromagnetism-lab.git
    cd electromagnetism-lab
    ```
3.  **Create a new branch:** Choose a descriptive name for your branch.
    ```bash
    # Examples:
    # git checkout -b feature/add-gauss-law-model
    # git checkout -b fix/arrow-rendering-bug
    git checkout -b your-branch-name
    ```
4.  **Install dependencies:**
    ```bash
    npm install
    ```
5.  **Run the development server:**
    ```bash
    npm run dev
    ```

## Project Structure

Here is a brief overview of the project structure to help you find your way around:

- `src/lib/scenes/scene.ts`: The heart of the application. All Three.js logic, including object creation, rendering, and interaction, lives here.
- `src/lib/physics/biotSavart.ts`: Contains the core physics formulas used to calculate the magnetic fields.
- `src/lib/components/`: Contains all the Svelte components that make up the UI.
  - `shared/`: Reusable components like sliders, buttons, and the header.
  - Other files are the main UI panels.
- `src/lib/stores/`: Svelte stores for managing global state, such as the active theme and the current simulation.
- `src/routes/`: Defines the pages of the application, following the SvelteKit routing conventions.

## Code Style Guide

This project uses **Prettier** for code formatting and **ESLint** for linting to maintain a consistent code style.

- Before committing your changes, please run the formatter:
  ```bash
  npm run format
  ```
- You can also check for any linting errors with:
  ```bash
  npm run lint
  ```

## 💬 Communication Channels

- For **general questions and discussions**, please use the [GitHub Discussions](https://github.com/Elimge/electromagnetism-lab/discussions) tab.
- For **private or sensitive matters**, you can contact the project maintainer, Elimge, through the email listed on his [GitHub profile](https://github.com/Elimge).

## Submitting a Pull Request

1.  Commit your changes with a clear and descriptive commit message.
2.  Push your branch to your forked repository:
    ```bash
    git push origin your-branch-name
    ```
3.  Open a **Pull Request** from your fork to the `develop` branch of the original repository.
4.  In the Pull Request description, please explain the changes you've made and link to any relevant Issues.

Thank you again for your contribution!
