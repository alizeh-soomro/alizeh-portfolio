# Alizeh Soomro: Interactive 3D Web Portfolio

Node.js + Express backend, Three.js frontend, RAG chatbot, Nodemailer contact system.

## Setup
1. Install Node.js 18+ (nodejs.org).
2. `npm install`
3. Copy `.env.example` to `.env` and fill it in:
   - `EMAIL_USER` / `EMAIL_PASS`: Gmail address and a Gmail App Password (Google Account > Security > 2-Step Verification > App passwords).
   - `ANTHROPIC_API_KEY`: from console.anthropic.com. Without it, the chatbot returns the best-matching text chunk only.
4. `npm start`, then open http://localhost:3000

## Project files
- `public/avatar.glb`: the 3D avatar exported from Blender (glTF 2.0 binary) with two animations, **Idle** and **Wave**. Source: `../blender/alizeh_avatar.blend`. Double-click the page to make her wave; her head follows the mouse.
- `public/intro.mp4` + `public/intro-poster.jpg`: the promotional video (59 s, 1080p). The After Effects project is in `../after-effects/`.
- `data/about-me.txt`: the knowledge the chatbot answers from. Restart the server after editing.

## RAG pipeline
1. **Collect**: `data/about-me.txt` holds CV, skills, projects, achievements.
2. **Chunk**: split by paragraph into pieces of up to about 450 characters.
3. **Embed**: each chunk becomes a 512-dimension hashed bag-of-words vector (local, no API cost).
4. **Store**: vectors are kept in an in-memory vector index built at startup.
5. **Retrieve**: the question is embedded and the top 3 chunks by cosine similarity are selected (minimum score 0.05).
6. **Generate**: the chunks go to Claude with a system prompt that allows answers only from the context. If nothing relevant is found, the bot says it does not know. Source snippets are returned and shown under each answer.

## Security
Secrets live in `.env` (git-ignored). Contact form: frontend and backend validation, hidden honeypot field, rate limiting (5 per 15 min), length limits, HTML escaping, header-injection stripping, security headers. Chat is rate limited (12 per minute).

## Deploy on Render
1. Push to GitHub (`.env` is ignored).
2. Render > New > Web Service > connect the repo. Build: `npm install`. Start: `npm start`.
3. Add the `.env` values under Environment. Open the generated URL.

## Extra credit included
Dark/light theme, mouse-reactive 3D sparkles, animated avatar gestures (idle + wave), project filter and search, chatbot source citations, reduced-motion and keyboard focus accessibility, scroll progress bar and active-section navigation.
