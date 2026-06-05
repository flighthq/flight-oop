import {
  Application,
  ImageSource,
  MovieClip,
  Spritesheet,
  SpritesheetAnimation,
  SpritesheetFrame,
  TextureAtlas,
  TextureAtlasRegion,
} from '@flighthq/oop';

import { render, scale } from './render';

const FRAME_W = 220;
const FRAME_H = 220;
const MARGIN = 2;
const GAP = 4;
const COLS_PER_ROW = [5, 4];
const FPS = 10;

const source = new ImageSource(await loadImage('assets/nyancat.png'));
const atlas = new TextureAtlas(source);

const frames: SpritesheetFrame[] = [];
for (let row = 0; row < COLS_PER_ROW.length; row++) {
  for (let col = 0; col < COLS_PER_ROW[row]; col++) {
    const region = atlas.addRegion(
      new TextureAtlasRegion(MARGIN + col * (FRAME_W + GAP), MARGIN + row * (FRAME_H + GAP), FRAME_W, FRAME_H),
    );
    frames.push(new SpritesheetFrame({ id: region.id }));
  }
}

const animation = new SpritesheetAnimation({
  frames: frames.map((_, i) => i),
  frameDuration: 1000 / FPS,
  loop: true,
});

const spritesheet = new Spritesheet({ atlas, frames, animations: { nyancat: animation } });

const clip = new MovieClip();
clip.attachSpritesheet(spritesheet, animation);
clip.scaleX = scale;
clip.scaleY = scale;

const app = new Application();
app.onUpdate.connect((delta) => clip.update(delta));
app.onRender.connect(() => render(clip));
app.start();

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = src;
  });
}
