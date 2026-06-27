# Interactive Story-Driven Portfolio Website

A premium, story-driven interactive portfolio website built for **Nil Lad**, an AI/ML Engineer and Full-Stack Developer. Designed with modern web aesthetics, custom micro-animations, color-themed glow effects, responsive layouts, and playfair typography.

---

## 🚀 Key Features

*   **Story-Driven Chapter Layouts**: Captivating storytelling design featuring animated sections describing professional development and background.
*   **Dynamic Projects Page**: A dedicated page (`/projects`) showcasing 7 end-to-end projects with category filters (All, AI / ML, Full-Stack, Mobile), custom color themes, hover lifts, tech badges, and GitHub code redirection.
*   **Aesthetic & Modern Styling**: Built on Tailwind CSS v4 with smooth gradient overlays, animated glowing background rings, and cohesive typography ('Playfair Display').
*   **Fully Responsive**: Optimised from the ground up for mobile, tablet, and widescreen displays.
*   **Privacy-First Codebase**: Configurations are set to prevent pushing personal and family photos directly to public repositories.

---

## 🛠️ Tech Stack

*   **Core Framework**: [React 19](https://react.dev/) + [Vite 7](https://vite.dev/)
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Routing**: [React Router DOM v7](https://reactrouter.com/)

---

## 📁 Shipped Projects Featured

1.  **Dayflow** — Full-Stack Attendance Management System (*React, FastAPI, MongoDB, Docker*)
2.  **Heart Disease Prediction** — ML-Powered Risk Assessment Platform (*Python, XGBoost, SHAP, FastAPI*)
3.  **Personal Portfolio Website** — Story-Driven Interactive Portfolio (*React, Vite, Tailwind CSS*)
4.  **Vidsnap AI** — AI-Powered Video Reel Generator (*Python, Flask, ElevenLabs API, FFmpeg*)
5.  **Metis Hire** — AI-Powered Recruitment Platform (*Next.js, TypeScript, Groq API, MongoDB*)
6.  **VyaparSeth** — Smart Udhaar & Store Manager (*Flutter, Dart, FastAPI, Groq API*)
7.  **Intern Crawler** — AI Internship Matching System (*FastAPI, Sentence-Transformers, Streamlit*)

---

## ⚙️ Local Setup and Development

Follow these steps to run the portfolio website locally.

### Prerequisites

*   [Node.js](https://nodejs.org/) (v18+ recommended)
*   npm, yarn, or pnpm

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/ladnil03/My-site.git
    cd portfolio
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Run the local development server:
    ```bash
    npm run dev
    ```
    Open your browser and navigate to `http://localhost:5173`.

4.  Build for production:
    ```bash
    npm run build
    ```
    The compiled bundle will be available in the `dist` or `build` directory.

---

## 🔒 Note on Media Assets & Privacy

To protect personal privacy, all personal family photos, custom portraits, and temporary video renders located in `src/assets/` have been added to `.gitignore`. 

If you are duplicating or forks this repository, please make sure to place your own images in `src/assets/` matching the names imported in:
*   `src/pages/About.jsx` (e.g. `nil.jpg`, `mom.jpg`, `momdada.jpg`, etc.)
*   `src/pages/Home.jsx` (e.g. `nil.jpg`, `background.jpeg`)
