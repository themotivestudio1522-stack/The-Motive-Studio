import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// High body size limit to safely handle transparent logo data URLs and full content configs
app.use(express.json({ limit: '20mb' }));

const CONTENT_FILE_PATH = path.join(__dirname, 'public', 'content.json');

// Studio Dynamic Content API (Persists Admin Edits on Live Node Server)
app.get('/api/content', async (req, res) => {
  try {
    if (fs.existsSync(CONTENT_FILE_PATH)) {
      const data = await fs.promises.readFile(CONTENT_FILE_PATH, 'utf-8');
      return res.json(JSON.parse(data));
    }
    return res.status(404).json({ message: 'No custom content file found' });
  } catch (error) {
    console.error('Error reading content file:', error);
    return res.status(500).json({ error: 'Failed to read content' });
  }
});

app.post('/api/content', async (req, res) => {
  try {
    const payload = req.body;
    if (!payload || typeof payload !== 'object') {
      return res.status(400).json({ error: 'Invalid content payload' });
    }

    await fs.promises.writeFile(CONTENT_FILE_PATH, JSON.stringify(payload, null, 2), 'utf-8');
    return res.json({ success: true, message: 'Content persisted successfully to server' });
  } catch (error) {
    console.error('Error persisting content file:', error);
    return res.status(500).json({ error: 'Failed to save content to server' });
  }
});

import { generateStudioConciergeResponse } from './src/utils/studioConcierge.js';

// Initialize Google Gemini Client if API key is present
let aiClient: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.error('Failed to initialize GoogleGenAI client:', err);
  }
}

// Studio AI Concierge Chatbot Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    // If Gemini client is active, attempt generative response
    if (aiClient) {
      try {
        const systemInstruction = `
You are the official Studio Concierge for "The Motive Studio" (Tagline: "WE CREATE. YOU GROW.").
Founders: Eman Tariq (CEO) & Zara Amin Khan (Co-Founder & Creative Director).
Direct Contact: themotivestudio1522@gmail.com | Phone/WhatsApp: 03141025918 / 0317 3150998. Operating remotely worldwide.
Services: 2D & 3D Animation, Video Editing, Viral Reels, Executive E-Books ("The Motive Playbook"), Brand Identity, and Full-Stack Web Development.
Pricing: Sprints $1,500–$3,500; Growth $4,000–$9,000; Enterprise $10,000–$25,000+. All IP 100% client-owned.
Deliver concise, authoritative, professional, and friendly answers (2-3 sentences max).
`;

        const response = await aiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: message,
          config: {
            systemInstruction,
            temperature: 0.6,
            maxOutputTokens: 250,
          },
        });

        if (response.text && response.text.trim()) {
          const fallbackActions = generateStudioConciergeResponse(message, history).actions;
          return res.json({
            reply: response.text.trim(),
            actions: fallbackActions,
          });
        }
      } catch (geminiErr: any) {
        console.warn('Gemini API call failed, falling back to local concierge engine:', geminiErr?.message || geminiErr);
      }
    }

    // Execute comprehensive Motive Studio Concierge Engine
    const conciergeResult = generateStudioConciergeResponse(message, history);
    return res.json(conciergeResult);
  } catch (error: any) {
    console.error('Error generating concierge response:', error);
    const fallback = generateStudioConciergeResponse(req.body?.message || '');
    return res.json(fallback);
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
