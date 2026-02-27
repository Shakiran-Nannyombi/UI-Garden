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

![The Bloom](https://github.com/shakiran-nannyombi/ui-garden/blob/main/public/images/bloom.gif)

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

## Deployment

UI Garden is deployed on **Vercel**, which provides automatic deployments and seamless integration with Git.

### Prerequisites
- A [Vercel account](https://vercel.com/signup) (free tier available)
- Your repository pushed to GitHub, GitLab, or Bitbucket
- A Google API key for Gemini AI integration

### Connecting Your Repository to Vercel

1. **Import Your Project**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New..." → "Project"
   - Select your Git provider and authorize Vercel
   - Choose the UI Garden repository

2. **Configure Build Settings**
   - Vercel will auto-detect the Vite framework
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Set Environment Variables**
   - In the project configuration, go to "Environment Variables"
   - Add `GEMINI_API_KEY` with your Gemini API key value
   - Select all environments (Production, Preview, Development)
   - Click "Save"

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your application
   - You'll receive a production URL (e.g., `ui-garden.vercel.app`)

### Automatic Deployments

Once connected, Vercel automatically deploys your application:
- **Production Deployments**: Every push to the `main` branch triggers a production deployment
- **Preview Deployments**: Pull requests and other branches get unique preview URLs
- **Instant Rollbacks**: Revert to any previous deployment with one click

### Manual Deployment via Vercel CLI

For local deployment control, use the Vercel CLI:

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to your Vercel account
vercel login

# Deploy to preview environment
vercel

# Deploy to production
vercel --prod
```

### Environment Variables Configuration

The application requires the `GEMINI_API_KEY` environment variable to enable AI-powered features. This must be configured in the Vercel dashboard before your application will function correctly in production.

#### Required Environment Variable

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Your Google Gemini API key for AI features | Yes |

#### Step-by-Step Instructions for Adding Environment Variables

1. **Access Your Project Settings**
   - Log in to your [Vercel Dashboard](https://vercel.com/dashboard)
   - Select your UI Garden project from the project list
   - Click on the "Settings" tab in the top navigation

2. **Navigate to Environment Variables**
   - In the Settings sidebar, click on "Environment Variables"
   - This is where you'll configure all environment variables for your project

3. **Add the GEMINI_API_KEY Variable**
   - In the "Key" field, enter: `GEMINI_API_KEY`
   - In the "Value" field, paste your Google Gemini API key
   - You can obtain an API key from [Google AI Studio](https://aistudio.google.com/)

4. **Select Target Environments**
   - Choose which environments should have access to this variable:
     - **Production**: Required for your live application
     - **Preview**: Recommended for testing pull requests
     - **Development**: Optional for local development via Vercel CLI
   - For most cases, select all three environments

5. **Save the Variable**
   - Click "Save" to store the environment variable
   - The variable will be available for your next deployment

6. **Redeploy if Necessary**
   - If your application is already deployed, you may need to trigger a new deployment
   - Go to the "Deployments" tab and click "Redeploy" on your latest deployment
   - Or simply push a new commit to trigger an automatic deployment

**Important Notes:**
- Environment variables are configured **per-project** in Vercel
- Variables are injected at **build time**, not runtime
- Changes to environment variables require a new deployment to take effect
- Never commit API keys to your Git repository—always use environment variables

#### Troubleshooting Environment Variable Issues

**Problem: "API key not found" or "GEMINI_API_KEY is undefined" errors**

**Solutions:**
1. **Verify the variable name is correct**
   - Ensure you used `GEMINI_API_KEY` (not `GOOGLE_API_KEY`)
   - Variable names are case-sensitive

2. **Check the variable is set in Vercel**
   - Go to Settings → Environment Variables in your Vercel project
   - Confirm `GEMINI_API_KEY` appears in the list
   - Verify it's enabled for the Production environment

3. **Redeploy your application**
   - Environment variable changes don't apply to existing deployments
   - Trigger a new deployment by pushing a commit or using the Vercel dashboard
   - Wait for the build to complete before testing

4. **Verify your API key is valid**
   - Test your API key in [Google AI Studio](https://aistudio.google.com/)
   - Ensure the key has the necessary permissions for Gemini API access
   - Check that the key hasn't expired or been revoked

5. **Check build logs for errors**
   - Go to the "Deployments" tab in Vercel
   - Click on your latest deployment
   - Review the build logs for any environment variable-related errors

**Problem: Application works locally but fails in production**

**Solutions:**
1. **Confirm local and production use the same variable name**
   - Local development uses `.env` file with `GEMINI_API_KEY`
   - Vercel production must have `GEMINI_API_KEY` in dashboard settings
   - The variable names must match exactly

2. **Check that the variable is set for Production environment**
   - In Vercel Settings → Environment Variables
   - Ensure the "Production" checkbox is selected for `GEMINI_API_KEY`

3. **Review Vercel function logs**
   - If using serverless functions, check the function logs in Vercel
   - Look for any runtime errors related to missing environment variables

---

## ENTER THE VOID

```bash
git clone https://github.com/your-username/ui-garden.git

npm install
```

Add your GEMINI_API_KEY to .env

```bash
npm run dev
```

<p align="center"> <i>"Don't just build a portfolio. Grow a garden."</i>
<b>— The UI Garden Game Master ✌🏽</b> </p>
