# Electromagnetism Virtual Lab

An interactive web application designed to help students and educators visualize and understand the fundamental principles of electromagnetism, including Biot-Savart's Law and Ampere's Law.

**[➡️ Live Demo Link - ¡Enlace a la Demo en Vivo!](https://elimge.github.io/electromagnetism-lab/)**

---

## ✨ Features

- **Interactive 3D Simulations:** Manipulate parameters in real-time and observe their immediate effect on magnetic fields.
- **Multiple Scenarios:** Explore three fundamental cases: the infinite straight wire, the circular loop, and the solenoid.
- **Real-time Vector Visualization:** A dynamic 3D arrow accurately represents the magnetic field's magnitude and direction at any point.
- **Bilingual Interface:** Fully available in English and Spanish to support a wider audience.
- **Light & Dark Mode:** Choose the theme that's most comfortable for your eyes.
- **Responsive Design:** Fully functional and intuitive on desktops, tablets, and mobile devices.

## 🛠️ Built With

![SvelteKit](https://img.shields.io/badge/SvelteKit-FF3E00?style=for-the-badge&logo=svelte&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

- **[SvelteKit](https://kit.svelte.dev/):** The web framework for building a fast and robust application.
- **[Three.js](https://threejs.org/):** For rendering and interacting with the 3D scenes.
- **[TypeScript](https://www.typescriptlang.org/):** For strong typing and more maintainable code.
- **[svelte-i18n](https://github.com/cibernox/svelte-i18n):** For internationalization.

## 📁 Project Structure

A brief overview of the key directories and files in this project:

``` bash
electromagnetism-lab/
├── /src
│ ├── /lib
│ │ ├── /components
│ │ │ ├── /shared # Reusable, general-purpose components (Slider, Header, etc.).
│ │ │ └── Other components for the main UI panels.
│ │ ├── /i18n # Configuration for the svelte-i18n library.
│ │ ├── /locales # JSON files containing the translations for each language (en.json, es.json).
│ │ ├── /physics # Core physics logic. biotSavart.ts contains the formulas to calculate magnetic fields.
│ │ ├── /scenes # The heart of the application. scene.ts handles all Three.js logic, including object creation, rendering, and user interaction.
│ │ └── /stores # Svelte stores for managing global application state (themeStore.ts, simulationStore.ts).
│ ├── /routes # Defines the pages of the application, following SvelteKit's file-based routing conventions.
│ └── app.html # Main HTML template for all pages.
├── /static # Contains static assets like the favicon and robots.txt that are copied directly to the output directory.
└── svelte.config.js # SvelteKit configuration file, including static adapter settings for GitHub Pages.
```

## 📚 Documentation

This project provides different documentation resources depending on your needs:

- **🎓 For Users, Students, and Educators:** Check out the [**GitHub Wiki**](https://github.com/Elimge/electromagnetism-lab/wiki) for detailed user guides, theoretical explanations of the physics involved, and tips for using this tool in an educational setting.
- **💻 For Developers:** If you'd like to contribute to the code, please read our [**Contributing Guide (CONTRIBUTING.md)**](CONTRIBUTING.md) for details on the project structure, code style, and how to submit your changes.

## 🚀 Getting Started (Local Development)

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Elimge/electromagnetism-lab.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd electromagnetism-lab
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! We believe this tool can grow and improve with the help of the community.

- Report a bug or suggest a feature by opening an [**Issue**](https://github.com/Elimge/electromagnetism-lab/issues).
- Start a conversation about ideas in the [**Discussions**](https://github.com/Elimge/electromagnetism-lab/discussions) tab.
- Before submitting code, please review the [**Contributing Guide**](CONTRIBUTING.md).

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 💡 Author

* Created by **Miguel Canedo Vanegas** 
* Github: [`@Elimge`](https://github.com/Elimge)
* **Email:** elimge@outlook.com