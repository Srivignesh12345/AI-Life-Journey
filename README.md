# 🤖 AI Life Journey

An interactive single-page React application that tells the story of Artificial Intelligence — from raw data to the future of AGI — through animated, computeristic visuals and a dark terminal aesthetic.

---

## 🚀 Live Demo

```
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📸 Sections

| Section | Description |
|---|---|
| **Hero** | Landing screen with glitch title animation and typewriter subtitle |
| **Data** | Scroll-triggered glitch + typewriter card explaining data as AI's fuel |
| **Learning** | Interactive neural network trainer with animated layers, loss bar, and epoch counter |
| **Decision** | Terminal-style simulator comparing Human vs AI decision making |
| **Impact** | Scroll-triggered animated counters for AI impact statistics |
| **Timeline** | Clickable accordion timeline of 6 major AI milestones with glitch + typewriter |
| **Journey** | Tabbed step-by-step walkthrough of AI's path with glitch tabs and typewriter cards |

---

## ✨ Animations

Every section shares a consistent set of computeristic animations:

- **Glitch effect** — text scrambles through random characters (`@#$%ABCxyz...`) before resolving to the real content
- **Typewriter effect** — text types out character by character with a blinking `█` cursor
- **Glow pulse** — borders and dots glow in accent colors on hover and active states
- **Custom cursor** — a blue dot replaces the default cursor and follows mouse movement
- **Scroll-triggered** — Data and Impact sections animate when they enter the viewport

---

## 🛠️ Tech Stack

- **React 19** — UI framework
- **CSS-in-JS** — all styles written as inline style objects, no external CSS classes
- **Tailwind CSS 3** — imported but available for utility use
- **GSAP 3** — available as a dependency for advanced animations
- **Create React App** — project bootstrapping

---

## 📁 Project Structure

```
ai-journey/
├── public/
│   └── index.html
├── src/
│   ├── sections/
│   │   ├── Hero.jsx        # Glitch title + typewriter subtitle
│   │   ├── Data.jsx        # Scroll-triggered glitch + typewriter card
│   │   ├── Learning.jsx    # Interactive neural network visualizer
│   │   ├── Decision.jsx    # Human vs AI terminal decision simulator
│   │   ├── Impact.jsx      # Animated stat counters
│   │   ├── Timeline.jsx    # AI history accordion with glitch + typewriter
│   │   └── Journey.jsx     # Tabbed AI journey with glitch tabs + typewriter
│   ├── App.js              # Root component, custom cursor logic
│   ├── App.css
│   └── index.css           # Global styles, cursor, smooth scroll
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js >= 16
- npm >= 8

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/ai-journey.git

# Navigate into the project
cd ai-journey

# Install dependencies
npm install

# Start the development server
npm start
```

### Build for Production

```bash
npm run build
```

Output will be in the `build/` folder, ready to deploy.

---

## 🎨 Design System

| Token | Value |
|---|---|
| Background primary | `#0d0d14` |
| Background secondary | `#0f0f1a` |
| Card background | `#1a1a2e` |
| Border default | `#2d2d4e` |
| Blue accent | `#60a5fa` |
| Purple accent | `#a78bfa` |
| Cyan accent | `#67e8f9` |
| Font | `monospace` / `Courier New` |

---

## 📄 License

MIT — free to use and modify.
