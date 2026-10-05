import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize Google Gemini Client if API key is present
let aiClient: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  } catch (err) {
    console.error('Failed to initialize GoogleGenAI client:', err);
  }
}

// Studio AI Concierge Chatbot Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!aiClient) {
      // Return smart fallback if Gemini API key is not yet set
      return res.json({
        reply: `Thank you for contacting The Motive Studio! We specialize in 2D Animation, 3D CGI Product Renders, Video Editing, Viral Reels, Executive E-Book Design, Brand Identity, and Full-Stack Web Development. To schedule a discovery call with our directors, please reach us at hello@themotivestudio.com or +1 (415) 890-6420.`
      });
    }

    const systemInstruction = `
You are the official Studio AI Concierge for "The Motive Studio" (Brand Tagline: "WE CREATE. YOU GROW.").
You represent an elite creative digital agency that specializes in:
1. 2D Animation & Motion Graphics (Character animation, kinetic typography, Lottie web micro-interactions, explainer videos)
2. 3D Animation & CGI (Photorealistic 3D product renders, spatial camera loops, luxury lighting simulations, 4K broadcast assets)
3. Video Editing & Post-Production (Commercial cuts, brand documentaries, high-retention editing, color grading, sound design)
4. Reels & Short-Form Content (High-retention vertical 9:16 videos for Instagram Reels, TikTok, YouTube Shorts, viral hook scripting, dynamic captions)
5. E-Book Design & Publishing Systems (Executive 48-page publication layout, 3D book cover mockups, interactive clickable PDFs, lead-magnet funnels)
6. Brand Strategy & Identity (Monogram logomarks, typography systems, style guides, physical packaging)
7. Website Design & Full-Stack Web Development (Ultra-fast, sub-second load times, headless CMS, modern React architecture)
8. UI/UX Product Design (Figma design systems, SaaS dashboards, mobile apps)
9. Digital Marketing & Data Solutions

Pricing Guidelines:
- Focused sprints (Reels batches, E-Book design, 2D micro-animations) start around $2,500 – $5,000.
- Comprehensive brand overhauls, 3D CGI packages, and custom full-stack web builds range between $10,000 – $30,000+.
- All visual assets and codebases are 100% client-owned.

Studio Culture & Tone:
- Confident, authoritative, professional, respectful, concise, and focused on commercial business growth ("Ideas are easy. Execution wins.").
- Encourage visitors to start a project brief or schedule a discovery call with our creative directors (hello@themotivestudio.com / +1 (415) 890-6420).
- Keep answers concise (2-4 sentences max), punchy, and helpful. Never hallucinate fake clients.
`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: message,
      config: {
        systemInstruction,
        temperature: 0.6,
        maxOutputTokens: 300,
      },
    });

    const reply = response.text || 'Thank you for reaching out! How can we assist your brand today?';
    return res.json({ reply });
  } catch (error: any) {
    console.error('Error generating AI response:', error);
    return res.status(500).json({
      error: 'Failed to generate response',
      reply: 'Thanks for reaching out! Our creative directors are currently online and ready to discuss 2D/3D animation, video editing, reels, or brand design. Please reach us at hello@themotivestudio.com or +1 (415) 890-6420.'
    });
  }
});

// Vite Middleware in Dev or Static Serve in Prod
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`The Motive Studio Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
