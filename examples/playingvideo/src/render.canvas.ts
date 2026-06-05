import { CanvasRenderer } from '@flighthq/oop';
import type { DisplayObject } from '@flighthq/oop';

const pixelRatio = window.devicePixelRatio || 1;
const canvas = document.createElement('canvas');
canvas.style.display = 'block';
document.body.style.margin = '0';
document.body.style.background = '#000';
document.body.appendChild(canvas);

export const container = canvas;
export const renderer = new CanvasRenderer(canvas, {
  backgroundColor: 0x000000ff,
  contextAttributes: { alpha: false },
});
export const scale = pixelRatio;

export function render(root: DisplayObject): void {
  renderer.render(root);
}

export function setSize(w: number, h: number): void {
  canvas.width = w * pixelRatio;
  canvas.height = h * pixelRatio;
  canvas.style.width = `${w}px`;
  canvas.style.height = `${h}px`;
  renderer.resize(w, h);
}
