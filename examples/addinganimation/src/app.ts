import { Application, Bitmap, DisplayContainer, Elastic, ImageSource, TweenManager } from '@flighthq/oop';

import { render, scale } from './render';

const STAGE_WIDTH = 550;
const STAGE_HEIGHT = 400;

const manager = new TweenManager();
const main = new DisplayContainer();
main.scaleX = scale;
main.scaleY = scale;

const container = new DisplayContainer();
container.alpha = 0;
container.scaleX = 0;
container.scaleY = 0;
container.x = STAGE_WIDTH / 2;
container.y = STAGE_HEIGHT / 2;

const bitmap = new Bitmap();
main.addChild(container);
container.addChild(bitmap);

const image = new ImageSource(await loadImage('assets/wabbit_alpha.png'));
bitmap.image = image;
bitmap.x = -image.width / 2;
bitmap.y = -image.height / 2;

manager.tween(container, 3000, { alpha: 1, scaleX: 2, scaleY: 2 }, {
  ease: Elastic.easeOut,
  repeat: -1,
  reflect: true,
});

const app = new Application();
app.onUpdate.connect((delta) => manager.update(delta));
app.onRender.connect(() => render(main));
app.start();

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = src;
  });
}
