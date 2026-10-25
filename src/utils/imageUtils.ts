/**
 * Auto Background Remover Utility
 * Analyzes an image and removes solid/near-solid background colors (white, black, or custom detected)
 * with smooth alpha edge anti-aliasing.
 */

export interface RemoveBgOptions {
  mode?: 'white' | 'black' | 'auto';
  tolerance?: number; // 0 to 100 (default: 30)
  feather?: number; // feather edge pixels (default: 1.5)
}

/**
 * Loads an image from a URL or data URL and returns an HTMLImageElement
 */
export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = src;
  });
}

/**
 * Removes background from an image source and returns a transparent PNG data URL
 */
export async function removeBackground(
  src: string,
  options: RemoveBgOptions = {}
): Promise<string> {
  const { mode = 'white', tolerance = 32, feather = 1.5 } = options;

  const img = await loadImage(src);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get 2D canvas context');

  canvas.width = img.naturalWidth || img.width;
  canvas.height = img.naturalHeight || img.height;

  // Draw initial image
  ctx.drawImage(img, 0, 0);

  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imgData.data;
  const len = data.length;

  // Determine target background color
  let targetR = 255;
  let targetG = 255;
  let targetB = 255;

  if (mode === 'black') {
    targetR = 0;
    targetG = 0;
    targetB = 0;
  } else if (mode === 'auto') {
    // Sample 4 corner pixels to determine background color
    const corners = [
      [0, 0],
      [canvas.width - 1, 0],
      [0, canvas.height - 1],
      [canvas.width - 1, canvas.height - 1],
    ];
    let sumR = 0, sumG = 0, sumB = 0;
    corners.forEach(([x, y]) => {
      const idx = (y * canvas.width + x) * 4;
      sumR += data[idx];
      sumG += data[idx + 1];
      sumB += data[idx + 2];
    });
    targetR = Math.round(sumR / 4);
    targetG = Math.round(sumG / 4);
    targetB = Math.round(sumB / 4);
  }

  // Calculate Euclidean distance tolerance threshold
  const maxDist = (tolerance / 100) * 441.67; // max distance in RGB space is sqrt(255^2*3) = 441.67
  const featherDist = maxDist * (feather > 0 ? (feather * 0.4) : 0.2);

  for (let i = 0; i < len; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];

    if (a === 0) continue;

    // Euclidean color distance from background
    const dist = Math.sqrt(
      (r - targetR) * (r - targetR) +
      (g - targetG) * (g - targetG) +
      (b - targetB) * (b - targetB)
    );

    if (dist <= maxDist) {
      // Inside background zone -> fully transparent
      data[i + 3] = 0;
    } else if (dist <= maxDist + featherDist) {
      // Soft transition feathering zone for clean anti-aliasing
      const alphaFactor = (dist - maxDist) / featherDist;
      data[i + 3] = Math.round(a * Math.min(1, Math.max(0, alphaFactor)));
    }
  }

  ctx.putImageData(imgData, 0, 0);
  return canvas.toDataURL('image/png');
}
