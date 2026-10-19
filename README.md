# Sathish Rao — Full-Stack MERN Developer & UI/UX Craftsman Portfolio

> An award-winning creative-agency aesthetic personal portfolio website for a **MERN Stack Developer** specializing in responsive websites, full-stack web applications, and user-centered UI/UX design.

![Portfolio Preview Banner](public/og-image.png)

---

## 🌟 Key Highlights & Architectural Features

### 1. Award-Winning Creative-Agency Aesthetic & Curated Themes
- **Pristine White Theme (Default) + Dark Mode**:
  1. 🤍 **Studio White (Default)**: Crisp luxury white (`#FFFFFF`) + Royal Cobalt Blue (`#0066FF`) + deep slate typography.
  2. 🌿 **White Emerald**: Minimalist alabaster (`#FFFFFF`) + Mint Jade (`#059669`).
  3. 💜 **White Violet**: High-fashion editorial (`#FFFFFF`) + Electric Purple (`#7C3AED`).
  4. 🖤 **Midnight Obsidian**: Deep obsidian (`#06080C`) + Electric Lime (`#D4FF00`).
  5. 🌌 **Cyber Cobalt**: Deep navy (`#050914`) + Cyber Blue (`#0066FF`).
- **1-Click Sun ☀️ / Moon 🌙 Quick Toggle**: Instant toggle right in the header between Studio White and Dark Mode.
- **Kinetic Background Running Names Animation**: 3 multi-directional horizontal scrolling ribbons streaming **SATHISH RAO** and engineering titles across the hero background in subtle stroke typography.
- **Dynamic Specialty Scramble Rotator**: Cycles through roles (*Full-Stack MERN Developer, UI/UX Design Craftsman, AI & RAG Specialist*) with blur-to-sharpness decoder animation.
- **Interactive Mouse Spotlight Illumination**: Flashlight radial illumination following the cursor over the background running names.
- **Floating Interactive Tech Badges**: Draggable/hoverable spring pills (*React 18, Node & Express, MongoDB, UX Psychology*).
- **Harmonic Theme Chimes**: Major triad synthesized via the native **Web Audio API** on theme switches.
- **Hairline Scroll Progress Indicator**: Spring-smoothed gradient bar tracking page scroll progress.
- **Infinite Editorial Marquee Ticker**: Continuous ribbon separating Hero from Projects highlighting engineering values.
- **Staggered Word-by-Word Hero Reveal**: Headline emerges with spring-damped blur-to-sharpness animation.
- **3D Card Perspective Tilt**: Interactive transformation card and project previews tilt based on mouse coordinates.
- **Physics-Based Custom Cursor**: Trailing magnetic ring and precise inner dot with hover scaling, auto-disabled on touch devices.

### 2. High-Impact Hero Section
- **Opening Headline**: *“I build digital experiences that feel effortless.”*
- **Supporting Narrative**: *“Full Stack Developer crafting responsive websites and web applications with modern technology and thoughtful UX.”*
- **Interactive Code-to-Interface Visual**: Live switchable preview between **Production TypeScript/React Component** and **Rendered Interactive UI Component** with micro-engagements and zero layout shift.
- **Accurate Availability Badge**: Live pulsing beacon indicator for freelance client intake.
- **Portrait Placeholder**: Designed for easy replacement with your own photo in `src/data/portfolioData.ts`.

### 3. Editorial Project Case Studies with Live Interactive Mockups
Rather than ordinary static cards or screenshot placeholders, every single project features an **embedded, functional, interactive mockup window** right in the browser:

1. **Saffron Leaf Restaurant Website** (`Frontend & UI/UX`):
   - Interactive menu with category filtering (*Starters, Mains, Desserts*).
   - Dietary allergen toggles (*Vegetarian, Gluten-Free*).
   - Live table reservation simulator with guest count, time slot selection, and instant confirmation.
2. **Personal Finance Tracker** (`Full-Stack Web App`):
   - Real-time wealth metrics (Net Balance, Income, Expenses).
   - Interactive transaction logger with category tagging and instant balance recalculation.
   - Synchronized client-side persistence with `localStorage`.
3. **RAG-Based College Chatbot** (`AI & LLMs`):
   - Simulated vector search and semantic retrieval pipeline over 450+ academic handbook pages.
   - Preset test inquiries (*B.Tech Eligibility, Hostel Fees, Revaluation Protocol*).
   - Citation cards displaying verified grounding source, clause number, and similarity score.
4. **Persona-Adaptive Customer Support Agent** (`AI & LLMs`):
   - Multi-persona customer mood switcher (*Frustrated VIP Customer, Technical Developer, First-time Inquirer*).
   - Real-time sentiment scoring and calibrated voice protocol.
   - Human guardrail escalation engine with automated Tier-2 supervisor routing.

### 4. Interactive UX Psychology Laboratory
Interactive before-and-after demonstrations showcasing mastery of human-computer interaction principles:
- **Hick’s Law**: 12 competing choices with decision paralysis (~14.2s) vs 3 curated tiers with progressive disclosure (~2.8s).
- **Fitts’s Law**: Awkward 14px corner target vs thumb-anchored 48px action target with recorded millisecond reaction timer.
- **Jakob’s Law**: Unorthodox hidden navigation vs recognized mental models.
- **Gestalt Principles**: Scattered form fields vs common-region chunked container cards.
- **Visual Hierarchy**: Flat gray monotony vs sculpted 3-level editorial hierarchy.

### 5. Verified Technical Stack & Capabilities
- **Frontend**: HTML5, CSS3, JavaScript (ES6+), React.js, Tailwind CSS, Bootstrap, Framer Motion.
- **Backend**: Node.js, Express.js, RESTful APIs.
- **Databases**: MongoDB, MySQL.
- **AI/ML**: Python, LLMs, RAG Architecture, LangChain, Vector Embeddings.
- **Tools**: Git, GitHub, VS Code, Figma.
- *Strictly grounded in architectural purpose—zero arbitrary proficiency percentages.*

### 6. Career Timeline & About Me
- Educational background, internship achievements, and certified MERN specializations.
- Authentic engineering philosophy highlighting clean code, accessibility, and dependable communication.

### 7. Freelance Conversion & Project Estimator
- Headline: *“Have an idea? Let’s make it real.”*
- Project Focus Selector (*Full-Stack Web App, Responsive Website, UI/UX Redesign, AI / RAG*).
- Desired Timeline Picker (*< 2 Weeks, 1 Month, 2-3 Months, Ongoing*).
- Validated contact form with celebratory confetti on submission.
- 1-click email copy button with toast feedback.
- Editable links to **GitHub, LinkedIn, Upwork, and Fiverr Pro**.

---

## 🛠️ Project Structure

```bash
├── public/
│   ├── favicon.svg              # Custom dark/lime developer favicon
│   └── og-image.png             # Social preview graph image
├── src/
│   ├── components/
│   │   ├── project-previews/    # Interactive live mockup components
│   │   │   ├── SaffronLeafPreview.tsx
│   │   │   ├── FinanceTrackerPreview.tsx
│   │   │   ├── CollegeChatbotPreview.tsx
│   │   │   └── CustomerSupportPreview.tsx
│   │   ├── About.tsx            # Philosophy & authentic background
│   │   ├── CaseStudyModal.tsx   # Detailed modal with problems & objectives
│   │   ├── Contact.tsx          # Conversion form & project estimator
│   │   ├── CustomCursor.tsx     # Smooth spring-physics desktop cursor
│   │   ├── Experience.tsx       # Verified career & education timeline
│   │   ├── Footer.tsx           # Monogram, credits & quick links
│   │   ├── Hero.tsx             # Editorial opening screen & code transformer
│   │   ├── Navbar.tsx           # Frosted floating header & mobile drawer
│   │   ├── Projects.tsx         # Editorial case study showcase
│   │   ├── Skills.tsx           # Grouped verified technologies
│   │   └── UxLab.tsx            # Interactive UX psychology demonstrations
│   ├── context/
│   │   └── ThemeContext.tsx     # Accent color & synthesized sound context
│   ├── data/
│   │   └── portfolioData.ts     # Single source of truth for all content
│   ├── App.tsx                  # Main layout orchestrator
│   ├── index.css                # Tailwind directives, grain texture & accessibility
│   └── main.tsx                 # React DOM mount point
├── index.html                   # SEO metadata, Open Graph, Google fonts
├── package.json                 # Dependencies & build scripts
├── tailwind.config.js           # Custom midnight palette & lime accents
├── tsconfig.json                # TypeScript compiler configuration
└── vite.config.ts               # Vite configuration
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or later (Tested with Node v26)
- **npm**: v9.0.0 or later

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/freelancing-portfolio.git

# Navigate into project directory
cd "Freelancing Portfolio"

# Install dependencies
npm install
```

### Running Locally
```bash
# Start development server
npm run dev
```
The application will launch at `http://localhost:3000` with hot-module reloading enabled.

### Building for Production
```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## ✏️ How to Customize with Your Own Content

All content, personal details, and project links are centralized in one single, clean file:
👉 **`src/data/portfolioData.ts`**

1. **Update Name, Bio, and Contact**:
   Modify `PORTFOLIO_DATA.personal`:
   ```ts
   name: "Your Name",
   role: "Your Role / Specialty",
   email: "your.email@example.com",
   github: "https://github.com/your-username",
   linkedin: "https://linkedin.com/in/your-profile",
   upwork: "https://www.upwork.com/freelancers/...",
   fiverr: "https://www.fiverr.com/...",
   ```
2. **Replace Portrait Photo**:
   In `src/components/Hero.tsx`, replace the avatar SVG placeholder inside `<div className="w-16 h-16 rounded-xl overflow-hidden ...">` with an `<img>` tag:
   ```tsx
   <img src="/my-photo.jpg" alt="Your Name" className="w-full h-full object-cover" />
   ```
   Place your image in the `public/` directory.
3. **Connect Form to Live Backend**:
   In `src/components/Contact.tsx`, replace the `setTimeout` simulation in `handleSubmit` with your preferred service:
   - **Formspree**: `await fetch("https://formspree.io/f/YOUR_FORM_ID", { method: "POST", body: JSON.stringify(formData) })`
   - **Web3Forms**: `https://api.web3forms.com/submit`
   - **Resend** or your own Express/Node API endpoint.

---

## 🌐 Deployment Instructions

### Deploy to Vercel (Recommended)
1. Push your repository to GitHub.
2. Sign in to [Vercel](https://vercel.com/) and click **"Add New Project"**.
3. Select this repository.
4. Framework Preset will automatically detect **Vite**.
5. Click **"Deploy"**.

### Deploy to Netlify
1. Connect repository in [Netlify](https://www.netlify.com/).
2. Set Build Command: `npm run build`
3. Set Publish Directory: `dist`
4. Click **"Deploy Site"**.

---

## 📄 License
This portfolio is open source and available under the **MIT License**.

