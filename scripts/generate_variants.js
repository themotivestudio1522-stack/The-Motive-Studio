import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function generateVariants() {
  const inputPath = 'public/assets/aistudio/WhatsApp_Image_2026-10-05_at_1.50.00_PM-removebg-preview_5adf7cc5.png';
  const img = sharp(inputPath);
  const { data, info } = await img.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  // Find bounding box
  let minX = width, minY = height, maxX = 0, maxY = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      if (data[idx + 3] > 20) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  const pad = 12;
  const cropX = Math.max(0, minX - pad);
  const cropY = Math.max(0, minY - pad);
  const cropW = Math.min(width - cropX, (maxX - minX) + pad * 2);
  const cropH = Math.min(height - cropY, (maxY - minY) + pad * 2);

  // Variant 1: Light Theme / Dark Text Logo (Original colors with transparent background)
  // Perfectly trimmed
  const lightData = Buffer.from(data);
  await sharp(lightData, { raw: { width, height, channels } })
    .extract({ left: cropX, top: cropY, width: cropW, height: cropH })
    .png()
    .toFile('public/logo_light_theme.png');
  console.log('Saved public/logo_light_theme.png');

  // Variant 2: Dark Theme / White Text Logo (for dark navbar & dark sections)
  // Dark/black strokes converted to pristine pure white (#FFFFFF)
  // Blue accent is preserved with full vibrancy
  const darkData = Buffer.from(data);
  for (let i = 0; i < darkData.length; i += channels) {
    const alpha = darkData[i + 3];
    if (alpha > 0) {
      const r = darkData[i];
      const g = darkData[i + 1];
      const b = darkData[i + 2];

      const isBlue = (b > 120 && b > r + 35 && b > g + 10);
      if (!isBlue) {
        // Change black/gray to white, preserving anti-aliasing in alpha
        darkData[i] = 255;
        darkData[i + 1] = 255;
        darkData[i + 2] = 255;
      }
    }
  }

  await sharp(darkData, { raw: { width, height, channels } })
    .extract({ left: cropX, top: cropY, width: cropW, height: cropH })
    .png()
    .toFile('public/logo_dark_theme.png');
  console.log('Saved public/logo_dark_theme.png');

  // Variant 3: Card presentation with clean white rounded container or gradient
  // Let's create an icon-only version (cropping to just the M monogram above the text)
  // The text starts at roughly y = 230 in original
  let textStartY = maxY;
  // Let's find gap between mark and text
  const rowDensity = new Array(height).fill(0);
  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      if (data[(y * width + x) * channels + 3] > 20) rowDensity[y]++;
    }
  }
  // Find local minimum between monogram and text (around 60-75% down)
  let markBottomY = Math.round(minY + (maxY - minY) * 0.65);
  for (let y = Math.round(minY + (maxY - minY) * 0.55); y <= Math.round(minY + (maxY - minY) * 0.75); y++) {
    if (rowDensity[y] < rowDensity[markBottomY]) markBottomY = y;
  }

  const markH = markBottomY - cropY;
  await sharp(darkData, { raw: { width, height, channels } })
    .extract({ left: cropX, top: cropY, width: cropW, height: markH })
    .png()
    .toFile('public/logo_mark_white.png');

  await sharp(lightData, { raw: { width, height, channels } })
    .extract({ left: cropX, top: cropY, width: cropW, height: markH })
    .png()
    .toFile('public/logo_mark_black.png');

  // Copy standard default logo paths
  fs.copyFileSync('public/logo_dark_theme.png', 'public/logo_official.png');
  fs.copyFileSync('public/logo_dark_theme.png', 'public/logo.png');

  // Also create a high-res OpenGraph 1200x630 banner embedding this official logo!
  const ogWidth = 1200;
  const ogHeight = 630;
  
  // Create an SVG composite for the OG image
  const darkLogoBase64 = fs.readFileSync('public/logo_dark_theme.png').toString('base64');
  const ogSvg = `<svg width="${ogWidth}" height="${ogHeight}" viewBox="0 0 ${ogWidth} ${ogHeight}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a0c10"/>
      <stop offset="40%" stop-color="#12161f"/>
      <stop offset="100%" stop-color="#06080b"/>
    </linearGradient>
    <linearGradient id="blueGlow" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0066ff" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#0066ff" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="radialAccent" cx="50%" cy="40%" r="50%">
      <stop offset="0%" stop-color="#0066ff" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Background -->
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <rect width="100%" height="100%" fill="url(#radialAccent)"/>

  <!-- Subtle Grid Lines -->
  <g opacity="0.08" stroke="#ffffff" stroke-width="1">
    <line x1="0" y1="105" x2="1200" y2="105"/>
    <line x1="0" y1="210" x2="1200" y2="210"/>
    <line x1="0" y1="315" x2="1200" y2="315"/>
    <line x1="0" y1="420" x2="1200" y2="420"/>
    <line x1="0" y1="525" x2="1200" y2="525"/>
    <line x1="200" y1="0" x2="200" y2="630"/>
    <line x1="400" y1="0" x2="400" y2="630"/>
    <line x1="600" y1="0" x2="600" y2="630"/>
    <line x1="800" y1="0" x2="800" y2="630"/>
    <line x1="1000" y1="0" x2="1000" y2="630"/>
  </g>

  <!-- Glowing Pedestal behind logo -->
  <rect x="360" y="80" width="480" height="260" rx="24" fill="#181c24" fill-opacity="0.6" stroke="#ffffff" stroke-opacity="0.12" stroke-width="1.5"/>

  <!-- Official Logo Image -->
  <image href="data:image/png;base64,${darkLogoBase64}" x="400" y="100" width="400" height="220" preserveAspectRatio="xMidYMid meet"/>

  <!-- Headline & Subtitle -->
  <text x="600" y="410" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="38" fill="#ffffff" letter-spacing="-0.02em">
    AI-Engineered Organic Growth Systems
  </text>
  <text x="600" y="460" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-weight="500" font-size="20" fill="#94a3b8" letter-spacing="0.05em">
    100M+ Views Generated • Algorithmic Retention • Full-Stack Production
  </text>

  <!-- Pill Tags -->
  <g transform="translate(380, 510)">
    <rect x="0" y="0" width="130" height="38" rx="19" fill="#0066ff" fill-opacity="0.2" stroke="#0066ff" stroke-opacity="0.5"/>
    <text x="65" y="24" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="600" font-size="13" fill="#60a5fa" letter-spacing="0.1em">VIRAL MEDIA</text>

    <rect x="150" y="0" width="140" height="38" rx="19" fill="#0066ff" fill-opacity="0.2" stroke="#0066ff" stroke-opacity="0.5"/>
    <text x="220" y="24" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="600" font-size="13" fill="#60a5fa" letter-spacing="0.1em">ORGANIC SEO</text>

    <rect x="310" y="0" width="130" height="38" rx="19" fill="#0066ff" fill-opacity="0.2" stroke="#0066ff" stroke-opacity="0.5"/>
    <text x="375" y="24" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="600" font-size="13" fill="#60a5fa" letter-spacing="0.1em">AUTOMATION</text>
  </g>
</svg>`;

  fs.writeFileSync('public/og-image.svg', ogSvg);
  await sharp(Buffer.from(ogSvg)).png().toFile('public/og-image.png');
  console.log('Saved public/og-image.svg and public/og-image.png');

  // Favicon (mark on dark circular/rounded icon)
  const faviconSvg = `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="64" height="64" rx="16" fill="#141820"/>
  <rect width="64" height="64" rx="16" stroke="rgba(255,255,255,0.12)" stroke-width="1.5"/>
  <g transform="translate(10, 10) scale(0.68)">
    <image href="data:image/png;base64,${darkLogoBase64}" width="64" height="64" preserveAspectRatio="xMidYMid meet"/>
  </g>
</svg>`;
  fs.writeFileSync('public/favicon.svg', faviconSvg);
  console.log('Updated public/favicon.svg');
}

generateVariants().catch(console.error);
