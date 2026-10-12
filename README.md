# GET Academy Corporate Website

The official modern corporate web presence for **Global Experiential Training Academy PLT (GET Academy)** — an established human capital development and training partner catering to enterprises, government statutory agencies, and educational institutions across Malaysia.

Built with **[Astro](https://astro.build/)**, **[Tailwind CSS](https://tailwindcss.com/)**, and **[Lucide Icons](https://lucide.dev/)**.

---

## 🚀 Quick Start (Local Setup)

Follow these steps to run the website locally on your computer.

### Prerequisites

Make sure you have installed:
- **[Node.js](https://nodejs.org/)** (v18.17.1, v20.x, or v22.x recommended)
- **npm** (comes with Node.js) or **pnpm** / **yarn**
- **Git**

Verify your installation in terminal / command prompt:
```bash
node -v
npm -v
git --version
```

---

### 1. Clone the Repository

```bash
git clone https://github.com/Yunussaid03/getacademy-corporate-website.git
cd getacademy-corporate-website
```

---

### 2. Install Dependencies

Install the project dependencies using npm:

```bash
npm install
```

---

### 3. Run the Local Development Server

Start Astro's local dev server:

```bash
npm run dev
```

Once started, open your browser and navigate to:
```
http://localhost:4321/
```

The development server supports **Hot Module Replacement (HMR)** — any changes you make to `.astro`, `.css`, or `.json` files will automatically reload in your browser.

---

### 4. Build for Production

To create a static production build:

```bash
npm run build
```

This generates a static output directory in `./dist/`.

To test and preview the production build locally before deployment:

```bash
npm run preview
```

---

## 📁 Project Architecture

```
getacademy-corporate-website/
├── public/
│   ├── assets/
│   │   ├── brand/          # Official logos (GETA-Logo-HQ.png, Comptia strip, etc.)
│   │   ├── partners/       # Institutional & certification marks (MDEC, MPC, MATRADE, CompTIA, SEGi, etc.)
│   │   └── photos/         # High-resolution genuine event & classroom photography
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── layout/         # BaseLayout.astro, Navbar.astro, Footer.astro
│   │   └── ui/             # SectionHeader.astro, CourseCard.astro, Button.astro
│   ├── data/
│   │   └── courses.json    # Curated training catalogue and syllabus data
│   ├── pages/
│   │   ├── index.astro     # Homepage (Hero, What We Do, Institutional Impact, Accreditations, Differentiators, Courses)
│   │   ├── about.astro     # Corporate background & mission
│   │   ├── courses.astro   # Full curriculum directory
│   │   ├── corporate-solutions.astro # Enterprise advisory & bespoke capacity building
│   │   ├── trainers.astro  # Facilitators and practitioner profiles
│   │   └── contact.astro   # Training enquiry & corporate procurement channel
│   └── styles/
│       └── global.css      # Custom styling, fonts & brand colour definitions
├── astro.config.mjs        # Astro configuration with Tailwind integration
├── tailwind.config.mjs     # Theme tokens, brand colors (sage green, dark green, gold)
└── package.json            # Project scripts and dependencies
```

---

## 🎨 Brand Design System

| Element | Description | Token / Value |
| :--- | :--- | :--- |
| **Primary Green** | Signature corporate green | `#406D59` (`brand-sage`) |
| **Deep Green** | Structural dark headers & contrasts | `#1A2E26` (`brand-dark`) |
| **Accent Gold** | Attention badges & highlight buttons | `#FADB50` (`brand-gold`) |
| **Light Tint** | Clean alternating section background | `#F4F8F6` (`brand-light`) |
| **Typography** | Inter / System Sans-Serif | Clean corporate readability |

---

## 🛠 Available Scripts

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts local dev server at `http://localhost:4321` |
| `npm run build` | Compiles static site into `./dist/` |
| `npm run preview` | Previews the local `./dist/` static build |

---

## 🤝 Contributing & Workflow Guidelines

1. Ensure code passes `npm run build` before committing.
2. Maintain genuine asset paths under `/public/assets/`.
3. Adhere to factual corporate messaging and institutional verification standards.
