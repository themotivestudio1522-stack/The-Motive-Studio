import { generateStudioConciergeResponse } from '../src/utils/studioConcierge.js';

export default async function handler(req: any, res: any) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { message, history } = body || {};
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    const conciergeResult = generateStudioConciergeResponse(message, history || []);
    return res.status(200).json(conciergeResult);
  } catch (error: any) {
    console.error('Serverless chat error:', error);
    const fallback = generateStudioConciergeResponse(req.body?.message || '');
    return res.status(200).json(fallback);
  }
}
