import type { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

let inMemoryContent: any = null;

export default async function handler(req: any, res: any) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const tmpPath = path.join('/tmp', 'content.json');

  if (req.method === 'POST') {
    try {
      const data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      if (!data || typeof data !== 'object') {
        return res.status(400).json({ error: 'Invalid content format' });
      }

      inMemoryContent = data;

      try {
        fs.writeFileSync(tmpPath, JSON.stringify(data, null, 2), 'utf-8');
      } catch (err) {
        // Tmp write warning, inMemory remains set
      }

      return res.status(200).json({
        success: true,
        message: 'Content updated successfully on production server',
      });
    } catch (e: any) {
      return res.status(500).json({ error: e.message || 'Failed to update content' });
    }
  }

  if (req.method === 'GET') {
    if (inMemoryContent) {
      return res.status(200).json(inMemoryContent);
    }

    try {
      if (fs.existsSync(tmpPath)) {
        const fileData = fs.readFileSync(tmpPath, 'utf-8');
        return res.status(200).json(JSON.parse(fileData));
      }
    } catch (err) {}

    // Fallback: Check public/content.json
    try {
      const publicPath = path.join(process.cwd(), 'public', 'content.json');
      if (fs.existsSync(publicPath)) {
        const publicData = fs.readFileSync(publicPath, 'utf-8');
        return res.status(200).json(JSON.parse(publicData));
      }
    } catch (err) {}

    return res.status(404).json({ message: 'No server cache found, use default' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
