import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function processLogo() {
  const inputPath = path.resolve('public/assets/aistudio/WhatsApp_Image_2026-10-05_at_1.50.00_PM-removebg-preview_5adf7cc5.png');
  console.log('Reading from:', inputPath);

  const image = sharp(inputPath);
  const metadata = await image.metadata();
  console.log('Image dimensions:', metadata.width, metadata.height, 'channels:', metadata.channels);

  const { data, info } = await image
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const channels = info.channels; // 4 (RGBA)

  console.log(`Buffer size: ${data.length}, width: ${width}, height: ${height}, channels: ${channels}`);

  // Create a mask of background pixels using BFS flood fill from edges
  // Any pixel connected to the border with RGB close to pure white (e.g. > 235 on all channels) is background.
  const isOuterBg = new Uint8Array(width * height);
  const queue = [];

  function isWhite(x, y) {
    const idx = (y * width + x) * channels;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    // Almost white or white
    return r >= 232 && g >= 232 && b >= 232;
  }

  // Push border pixels
  for (let x = 0; x < width; x++) {
    if (isWhite(x, 0)) {
      isOuterBg[0 * width + x] = 1;
      queue.push(x, 0);
    }
    if (isWhite(x, height - 1)) {
      isOuterBg[(height - 1) * width + x] = 1;
      queue.push(x, height - 1);
    }
  }
  for (let y = 0; y < height; y++) {
    if (isWhite(0, y) && !isOuterBg[y * width + 0]) {
      isOuterBg[y * width + 0] = 1;
      queue.push(0, y);
    }
    if (isWhite(width - 1, y) && !isOuterBg[y * width + (width - 1)]) {
      isOuterBg[y * width + (width - 1)] = 1;
      queue.push(width - 1, y);
    }
  }

  // BFS
  let head = 0;
  while (head < queue.length) {
    const cx = queue[head++];
    const cy = queue[head++];

    const neighbors = [
      [cx + 1, cy],
      [cx - 1, cy],
      [cx, cy + 1],
      [cx, cy - 1]
    ];

    for (const [nx, ny] of neighbors) {
      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        const nIndex = ny * width + nx;
        if (!isOuterBg[nIndex] && isWhite(nx, ny)) {
          isOuterBg[nIndex] = 1;
          queue.push(nx, ny);
        }
      }
    }
  }

  console.log(`Identified ${queue.length / 2} outer background pixels.`);

  // 1. Create transparent logo buffer (with edge softening)
  const transData = Buffer.from(data);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const nIndex = y * width + x;

      if (isOuterBg[nIndex]) {
        transData[idx + 3] = 0; // Alpha 0
      } else {
        // Check if adjacent to background for antialiasing
        let bgNeighbors = 0;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const nx = x + dx;
            const ny = y + dy;
            if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
              if (isOuterBg[ny * width + nx]) bgNeighbors++;
            }
          }
        }
        if (bgNeighbors > 0) {
          const r = transData[idx];
          const g = transData[idx + 1];
          const b = transData[idx + 2];
          const brightness = (r + g + b) / 3;
          if (brightness > 200) {
            // Soft blend
            const alphaFactor = (255 - brightness) / 55;
            transData[idx + 3] = Math.round(Math.min(255, Math.max(0, alphaFactor * 255)));
          }
        }
      }
    }
  }

  // Find bounding box of non-transparent content to trim excess margins cleanly
  let minX = width, minY = height, maxX = 0, maxY = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      if (transData[idx + 3] > 20) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  console.log(`Content bounding box: [${minX}, ${minY}] to [${maxX}, ${maxY}]`);

  // Pad slightly (e.g. 15px)
  const pad = 16;
  const cropX = Math.max(0, minX - pad);
  const cropY = Math.max(0, minY - pad);
  const cropW = Math.min(width - cropX, (maxX - minX) + pad * 2);
  const cropH = Math.min(height - cropY, (maxY - minY) + pad * 2);

  // Save trimmed transparent logo
  await sharp(transData, { raw: { width, height, channels } })
    .extract({ left: cropX, top: cropY, width: cropW, height: cropH })
    .png()
    .toFile('public/logo_official_transparent.png');
  console.log('Saved public/logo_official_transparent.png');

  // Also save a trimmed version of original with white background (useful for light cards)
  await sharp(inputPath)
    .extract({ left: cropX, top: cropY, width: cropW, height: cropH })
    .png()
    .toFile('public/logo_official_light.png');
  console.log('Saved public/logo_official_light.png');

  // 2. Create the DARK MODE variant requested by user:
  // Black lettering and black monogram facets turn to pure crisp white (#FFFFFF)
  // Blue facet (#0066FF) is preserved vibrantly!
  // White arrow remains crisp white!
  const darkData = Buffer.from(transData);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const alpha = darkData[idx + 3];
      if (alpha > 0) {
        const r = darkData[idx];
        const g = darkData[idx + 1];
        const b = darkData[idx + 2];

        // Is it blue?
        // Blue has high B and lower R (e.g. b > 140 and b > r + 30)
        const isBlue = (b > 120 && b > r + 40 && b > g + 10);

        if (!isBlue) {
          // If it was dark/black, invert to white!
          // Distance from black (0,0,0)
          const brightness = (r + g + b) / 3;
          if (brightness < 160) {
            // Dark gray / black pixel -> make it pure crisp white
            darkData[idx] = 255;
            darkData[idx + 1] = 255;
            darkData[idx + 2] = 255;
          }
        }
      }
    }
  }

  // Save dark mode logo
  await sharp(darkData, { raw: { width, height, channels } })
    .extract({ left: cropX, top: cropY, width: cropW, height: cropH })
    .png()
    .toFile('public/logo_official_dark.png');
  console.log('Saved public/logo_official_dark.png');

  // Also save a standard unified logo file at /public/logo.png for universal links
  fs.copyFileSync('public/logo_official_dark.png', 'public/logo.png');
  fs.copyFileSync('public/logo_official_dark.png', 'public/logo_official.png');

  console.log('Logo processing completed successfully!');
}

processLogo().catch(console.error);
