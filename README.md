# 🌸 UI Garden: The Designer's Arcade

**UI Garden** is a gamified design playground where your aesthetic identity isn't just a setting—it's a seed that grows into a world. This project was **vibe-coded** using the **Gemini 3 Pro** engine in Google AI Studio.

<p align="center">
  <img src="https://img.shields.io/badge/Vibe--Coded-Gemini%203%20Pro-FF69B4?style=for-the-badge&logo=google-gemini" alt="Vibe Coded Badge">
  <img src="https://img.shields.io/badge/State-Zustand-blue?style=for-the-badge" alt="Zustand Badge">
  <img src="https://img.shields.io/badge/UI-Tailwind-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind Badge">
</p>

---

## The Game Experience

### Phase 1: The Void 
Every journey begins in the **Null State**. A stark, monochromatic wireframe world where the garden is dormant.

### Phase 2: The Bloom 
When you plant your **Identity Seed** (Name, Vibe, and Color DNA), Gemini 3 injects life into the system.
- **The Transformation:** The B&W world glitches or fades into a high-fidelity theme.
- **Dynamic Theming:** CSS variables are updated in real-time based on AI-generated tokens.

### Phase 3: The Sprout 
Add your UI components to the garden. The AI acts as a **Game Master**, auditing your work and assigning rarity grades based on how well they fit your chosen "vibe."

---

## The Vibe Matrix

The AI translates your personality into these specific design systems:

| Vibe | Mood | UI Style | Animation | Rarity Modifier |
| :--- | :--- | :--- | :--- | :--- |
| **Dreamy** | *Soft* | Glassmorphism | `float-y` | +10 Charm |
| **Neon Cyber** | ⚡ *Electric* | Sharp & Glow | `glitch-on` | +10 Energy |
| **Brutalist** | *Raw* | Thick Borders | `snap-pop` | +10 Power |
| **Minimal** | *Clean* | High Whitespace | `fade-slow` | +10 Clarity |

---

## Tech Stack & Workflow

This project explores the **"Natural Language First"** development workflow:

- **AI Engine:** [Google AI Studio](https://aistudio.google.com/) (Gemini 3)
- **Framework:** React + Tailwind CSS
- **State Management:** Zustand (Handling the "Bloom" state transitions)
- **Animations:** Framer Motion / CSS Transitions

### Interactive "Void-to-Bloom" Toggle
The core mechanic uses a global `isBloomed` state to swap CSS variables instantly:

```javascript
// The moment of Bloom
const activateBloom = (aiGeneratedTokens) => {
  setTheme(aiGeneratedTokens);
  setIsBloomed(true); // Triggers the 1.5s color transition
};
```
---

## VIBE-CODED ARCHITECTURE
This project was built using **Natural Language First** development. 

### The "Identity Seed" JSON
The AI communicates with the React frontend through structured data:

```json
{
  "event": "BLOOM_ACTIVATED",
  "theme": {
    "primary": "#FF69B4",
    "radius": "24px",
    "animation": "dreamy-float"
  },
  "message": "The clouds part. Your garden is awake."
}
```
---

## ENTER THE VOID

```bash
git clone https://github.com/your-username/ui-garden.git

npm install
```

Add your GOOGLE_API_KEY to .env

```bash
npm run dev
```

<p align="center"> <i>"Don't just build a portfolio. Grow a garden."</i>
<b>— The UI Garden Game Master ✌🏽</b> </p>
