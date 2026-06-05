import {
  Application,
  ImageSource,
  Sprite,
  Spritesheet,
  SpritesheetAnimation,
  SpritesheetFrame,
  SpritesheetPlayer,
  TextureAtlas,
  TextureAtlasRegion,
} from '@flighthq/oop';

import { render, scale } from './render';

const SCALE = 4;
const TILE_SIZE = 32;
const FRAME_DURATION = 150;
const STAGE_WIDTH = 800;
const STAGE_HEIGHT = 400;

const source = new ImageSource(await loadImage('assets/tileset.png'));
const atlas = new TextureAtlas(source);
const sheet = new Spritesheet({ atlas });

const animationDefs = [
  { name: 'snail', row: 1 },
  { name: 'blob', row: 4 },
  { name: 'owl', row: 5 },
  { name: 'bug', row: 6 },
];

for (const { name, row } of animationDefs) {
  const frameIndices: number[] = [];
  for (let col = 0; col < 4; col++) {
    const region = atlas.addRegion(new TextureAtlasRegion(col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE));
    const frame = sheet.addFrame(new SpritesheetFrame({ id: region.id }));
    frameIndices.push(frame.index);
  }
  sheet.addAnimation(name, new SpritesheetAnimation({ frames: frameIndices, frameDuration: FRAME_DURATION, loop: true }));
}

const root = new Sprite();
root.scaleX = SCALE * scale;
root.scaleY = SCALE * scale;

const spriteScreenSize = TILE_SIZE * SCALE;
const totalWidth = animationDefs.length * spriteScreenSize;
const gap = (STAGE_WIDTH - totalWidth) / (animationDefs.length + 1);
const yLocal = (STAGE_HEIGHT - spriteScreenSize) / 2 / SCALE;

const sprites = animationDefs.map((def, i) => {
  const sprite = new Sprite();
  sprite.atlas = atlas;
  sprite.x = (gap + i * (spriteScreenSize + gap)) / SCALE;
  sprite.y = yLocal;
  root.addChild(sprite);
  return sprite;
});

const players = animationDefs.map(({ name }) => {
  const player = new SpritesheetPlayer();
  player.play(sheet.getAnimation(name)!);
  return player;
});

const app = new Application();
app.onUpdate.connect((delta) => {
  for (let i = 0; i < players.length; i++) {
    if (players[i].update(delta)) {
      const frame = players[i].getCurrentFrame(sheet);
      if (frame !== null) sprites[i].id = frame.id;
    }
  }
});
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
