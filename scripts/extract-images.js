#!/usr/bin/env node
/*
 * extract-images.js
 * -----------------
 * Convierte una imagen almacenada como data-URL dentro de un JSON exportado
 * (`siteContent.json`) en un fichero real dentro de la carpeta `Imagenes/`.
 * Luego actualiza `background.image` en el JSON para apuntar a la ruta
 * relativa del fichero generado (por ejemplo "Imagenes/mantenimiento1.jpeg").
 *
 * Ventajas:
 *  - Evita almacenar imágenes grandes como data-URLs en localStorage/JSON.
 *  - Permite reemplazar la imagen en el repo (commitear el fichero) antes
 *    de entregar el proyecto al cliente.
 *
 * Requisitos:
 *  - Node.js instalado (no requiere dependencias externas).
 *
 * Uso (PowerShell / Windows):
 *  node .\scripts\extract-images.js --input .\siteContent.json --outdir .\Imagenes --filename mantenimiento1 --save .\siteContent-fixed.json
 *
 * Uso (macOS / Linux):
 *  node ./scripts/extract-images.js --input ./siteContent.json --outdir ./Imagenes --filename mantenimiento1 --save ./siteContent-fixed.json
 *
 * Parámetros:
 *  --input    Ruta al JSON exportado (obligatorio).
 *  --outdir   Carpeta donde escribir la imagen (por defecto: `Imagenes/` junto al repo).
 *  --filename Nombre base para la imagen de salida (se añade la extensión automáticamente).
 *  --save     (opcional) Ruta donde guardar el JSON actualizado. Si se omite, el JSON de entrada se sobrescribe.
 */

const fs = require('fs');
const path = require('path');

function usage() {
  console.log('Usage: node extract-images.js --input siteContent.json [--outdir Imagenes] [--filename mantenimiento1] [--save output.json]');
  process.exit(1);
}

// Simple argument parser to avoid external dependencies (no minimist required)
function parseArgs(list) {
  const out = {};
  for (let i = 0; i < list.length; i++) {
    const a = list[i];
    if (a.startsWith('--')) {
      const key = a.slice(2);
      const next = list[i + 1];
      if (next && !next.startsWith('--')) {
        out[key] = next;
        i++;
      } else {
        out[key] = true;
      }
    }
  }
  return out;
}

const argv = parseArgs(process.argv.slice(2));
if (!argv.input) usage();

const inputPath = path.resolve(argv.input);
const outDir = path.resolve(argv.outdir || path.join(path.dirname(inputPath), '..', 'Imagenes'));
const baseName = argv.filename || 'mantenimiento1';
const saveJson = argv.save || null;

if (!fs.existsSync(inputPath)) {
  console.error('Input file not found:', inputPath);
  process.exit(2);
}

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const data = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
const bg = data && data.background && data.background.image ? data.background.image : null;
if (!bg) {
  console.error('No background.image found in JSON');
  process.exit(3);
}

if (!bg.startsWith('data:')) {
  console.log('Background is not a data URL. Nothing to extract.');
  process.exit(0);
}

// data:[<mediatype>][;base64],<data>
const match = bg.match(/^data:(image\/[^;]+);base64,(.+)$/);
if (!match) {
  console.error('Unsupported data URL format');
  process.exit(4);
}

const mime = match[1];
const b64 = match[2];
const ext = mime.split('/')[1] || 'png';
const filename = `${baseName}.${ext}`;
const outPath = path.join(outDir, filename);

fs.writeFileSync(outPath, Buffer.from(b64, 'base64'));
console.log('Wrote image to', outPath);

// update JSON to point to relative path
const relPath = `Imagenes/${filename}`;
data.background.image = relPath;

if (saveJson) {
  const savePath = path.resolve(saveJson);
  fs.writeFileSync(savePath, JSON.stringify(data, null, 2), 'utf8');
  console.log('Updated JSON written to', savePath);
} else {
  // overwrite original
  fs.writeFileSync(inputPath, JSON.stringify(data, null, 2), 'utf8');
  console.log('Original JSON updated to reference', relPath);
}

console.log('Done. Now replace the file in your repo (if needed) and commit the change before delivery.');
