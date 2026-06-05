import { Application, ImageSource, Sprite, TextureAtlas, TextureAtlasRegion } from '@flighthq/oop';

import { render, scale } from './render';

const SCALE = 4;
const TILE_SIZE = 32;
const STAGE_WIDTH = 800;
const STAGE_HEIGHT = 400;

const source = new ImageSource(await loadImage('assets/tileset.png'));
const atlas = new TextureAtlas(source);

function addRegion(y: number): number {
  return atlas.addRegion(new TextureAtlasRegion(0, y, TILE_SIZE, TILE_SIZE)).id;
}

const gumdropID = addRegion(0);
const balloonID = addRegion(64);
const robotID = addRegion(96);
const compyID = addRegion(224);

const root = new Sprite();
root.scaleX = SCALE * scale;
root.scaleY = SCALE * scale;

const creatureIDs = [gumdropID, balloonID, robotID, compyID];

const spriteScreenSize = TILE_SIZE * SCALE;
const totalWidth = creatureIDs.length * spriteScreenSize;
const gap = (STAGE_WIDTH - totalWidth) / (creatureIDs.length + 1);
const yLocal = (STAGE_HEIGHT - spriteScreenSize) / 2 / SCALE;

for (let i = 0; i < creatureIDs.length; i++) {
  const sprite = new Sprite();
  sprite.atlas = atlas;
  sprite.id = creatureIDs[i];
  sprite.x = (gap + i * (spriteScreenSize + gap)) / SCALE;
  sprite.y = yLocal;
  root.addChild(sprite);
}

const app = new Application();
app.onRender.connect(() => render(root));
app.start();

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = src;
  });
}
