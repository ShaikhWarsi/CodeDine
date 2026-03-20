# CodePath

**Master the primitives, win the interview.**

CodePath is a high-end, minimalist interview preparation platform designed for software engineers who want to move beyond mindless memorization. Instead of grinding through thousands of disconnected problems, CodePath focuses on the **16 core algorithmic primitives** that unlock deep intuition for 80% of technical interview questions.

---

## 🚀 Key Features

### 1. **Core Patterns Roadmap**
A curated curriculum focusing on the foundational patterns (Sliding Window, Two Pointers, Dynamic Programming, etc.) that reappear in almost every senior-level interview.

### 2. **Mastery Tracks**
Specialized, domain-specific problem sets (e.g., Advanced Graphs, System Design Primitives, Math for Engineers) designed to take you from foundation to professional intuition.

### 3. **AI Interview Coach (Calibrated Simulation)**
A real-time, multi-turn interview simulator that chat with you based on your target seniority (Junior to Staff) and role. Features a **Senior-Level Stress Test** mode that introduces unexpected scale and constraint challenges.

### 4. **Pattern-Linker (Alpha)**
Paste any LeetCode URL, and our AI identifies the underlying primitive, providing the architect's reasoning and the "Aha!" moment for that specific problem.

### 5. **"Aha!" Logic Persistence**
Integrated code snippets for every problem. Save the core pattern logic directly in a syntax-highlighted editor to build a personal "Primitive Bible."

### 6. **Spaced Repetition Dashboard**
An automated "Forgetting Zone" that identifies patterns you haven't reviewed in 7+ days, calculating retention scores to ensure you're always interview-ready.

### 7. **94 Patterns Curriculum**
The ultimate comprehensive roadmap covering every major algorithmic pattern and data structure design.

### 8. **Premium UI/UX**
- **Minimalist Professional Theme**: High-contrast monochrome aesthetic with subtle glassmorphism.
- **Dark/Light Mode**: Full support with perceptual uniformity via OKLCH color spaces.
- **Interactive Animations**: Matrix-inspired text effects and sophisticated component transitions powered by Framer Motion.

---

## 🛠 Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router, Turbopack)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/) (using `@import` syntax and OKLCH)
- **AI Integration**: [Vercel AI SDK](https://sdk.vercel.ai/) (`useChat`, `generateObject`)
- **Animations**: [Framer Motion / Motion](https://motion.dev/)
- **Code Editor**: `react-simple-code-editor` + `PrismJS`
- **Icons**: [Lucide React](https://lucide.dev/)
- **Theme Management**: [next-themes](https://github.com/pacocoursey/next-themes)
- **Form/Validation**: [Zod](https://zod.dev/)

---

## 📂 Project Structure

```bash
├── app/
│   ├── api/                # AI endpoints and server actions
│   ├── interview-questions/# AI Practice Kit interface
│   ├── mastery/            # Specialized track logic and detail pages
│   ├── ninety-patterns/    # Comprehensive curriculum view
│   ├── patterns/           # Core 16 primitives and module logic
│   ├── globals.css         # OKLCH-based theme variables and Tailwind layers
│   └── layout.tsx          # Root layout with ThemeProvider
├── components/
│   ├── ui/                 # Reusable Radix-based UI components
│   ├── theme-toggle.tsx    # Global mode switcher
│   └── ...                 # Custom animations (MatrixText, Testimonials)
├── hooks/
│   └── use-progress.ts     # LocalStorage-based persistence logic
├── lib/
│   ├── data.ts             # Central curriculum and pattern definitions
│   └── utils.ts            # Tailwind merging and UI helpers
└── package.json            # Dependency manifest
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/codepath.git
   cd codepath
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env.local` file in the root directory:
   ```env
   OPENAI_API_KEY=your_openai_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

---

## 🧠 Philosophy: The LeetCode Paradox

Most developers solve 500+ problems and still feel unprepared. CodePath is built on the belief that **intuition is a skill, not a memory**. By focusing on the underlying primitives, we reduce the problem-solving space by 80%, allowing you to approach any novel problem with senior-level confidence.

---

## ⚖️ License

Private / Proprietary. All rights reserved.
