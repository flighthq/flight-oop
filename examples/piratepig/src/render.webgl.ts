import { WebGLRenderer } from '@flighthq/oop';
import type { DisplayObject } from '@flighthq/oop';

const pixelRatio = window.devicePixelRatio || 1;
const canvas = document.createElement('canvas');
canvas.width = window.innerWidth * pixelRatio;
canvas.height = window.innerHeight * pixelRatio;
canvas.style.width = `${window.innerWidth}px`;
canvas.style.height = `${window.innerHeight}px`;
canvas.style.display = 'block';
document.body.appendChild(canvas);

export const container = canvas;
export const renderer = new WebGLRenderer(canvas, {
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
