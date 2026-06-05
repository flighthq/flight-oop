import { Application, ImageSource, Tilemap, Tileset } from '@flighthq/oop';

import { render, scale } from './render';

const TILE_W = 32;
const TILE_H = 32;
const COLS = 8;
const ROWS = 8;
const SCALE = 2;
const PAD = 40;

const source = new ImageSource(await loadImage('assets/tileset.png'));
const tileset = new Tileset(source, TILE_W, TILE_H);

const tilemap = new Tilemap({ columns: COLS, rows: ROWS, tileset });
tilemap.scaleX = SCALE * scale;
tilemap.scaleY = SCALE * scale;
tilemap.x = PAD * scale;
tilemap.y = PAD * scale;

// Each row shows the idle frame of one character.
// Character n's first frame = n * tileset.columns (row-major stride).
const stride = tileset.columns;
for (let r = 0; r < ROWS; r++) {
  for (let c = 0; c < COLS; c++) {
    tilemap.setTile(c, r, r * stride);
  }
}

const app = new Application();
app.onRender.connect(() => render(tilemap));
app.start();

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = src;
  });
}
