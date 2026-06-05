import { Application, DisplayContainer, Quad, Shape, TweenManager } from '@flighthq/oop';

import { render, scale } from './render';

const STAGE_WIDTH = 550;
const STAGE_HEIGHT = 400;
const CIRCLE_COUNT = 80;
const MIN_RADIUS = 25;
const MAX_RADIUS = 60;
const MIN_DURATION = 1500;
const MAX_DURATION = 6000;
const MAX_CREATION_DELAY = 10000;

const manager = new TweenManager();
const root = new DisplayContainer();
root.scaleX = scale;
root.scaleY = scale;

function animateCircle(circle: Shape): void {
  const duration = MIN_DURATION + Math.random() * (MAX_DURATION - MIN_DURATION);
  const targetX = Math.random() * STAGE_WIDTH;
  const targetY = Math.random() * STAGE_HEIGHT;
  const tween = manager.tween(circle, duration, { x: targetX, y: targetY }, { ease: Quad.easeOut });
  tween.onComplete.connect(() => animateCircle(circle));
}

function createCircle(): void {
  const radius = MIN_RADIUS + Math.random() * (MAX_RADIUS - MIN_RADIUS);
  const circle = new Shape();

  circle.beginFill(Math.floor(Math.random() * 0xffffff));
  circle.drawCircle(0, 0, radius);
  circle.endFill();

  circle.alpha = 0.2 + Math.random() * 0.6;
  circle.x = Math.random() * STAGE_WIDTH;
  circle.y = Math.random() * STAGE_HEIGHT;

  root.addChildAt(circle, 0);
  animateCircle(circle);
}

for (let i = 0; i < CIRCLE_COUNT; i++) {
  const delay = Math.random() * MAX_CREATION_DELAY;
  const timer = manager.timer(delay);
  timer.onComplete.connect(createCircle);
}

const app = new Application();
app.onUpdate.connect((delta) => manager.update(delta));
app.onRender.connect(() => render(root));
app.start();
