import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(__dirname, '..', 'public');
const inputPath = resolve(publicDir, 'ChatGPT Image May 8, 2026, 06_58_51 PM.png');
const outputPath = resolve(publicDir, 'brickbase-logo.png');

const TOLERANCE = 28;

const img = sharp(inputPath).ensureAlpha();
const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;

const bgR = data[0];
const bgG = data[1];
const bgB = data[2];

const out = Buffer.from(data);
for (let i = 0; i < out.length; i += channels) {
  const dr = out[i] - bgR;
  const dg = out[i + 1] - bgG;
  const db = out[i + 2] - bgB;
  const dist = Math.sqrt(dr * dr + dg * dg + db * db);
  if (dist <= TOLERANCE) {
    out[i + 3] = 0;
  }
}

await sharp(out, { raw: { width, height, channels } })
  .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 1 })
  .png({ compressionLevel: 9 })
  .toFile(outputPath);

console.log(`Wrote ${outputPath}`);
console.log(`bg color sampled: rgb(${bgR}, ${bgG}, ${bgB})`);
