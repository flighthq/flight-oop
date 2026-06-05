import { WebGLRenderer } from '@flighthq/oop';
import type { Sprite } from '@flighthq/oop';

const STAGE_W = 800;
const STAGE_H = 400;

const pixelRatio = window.devicePixelRatio || 1;
const canvas = document.createElement('canvas');
canvas.width = STAGE_W * pixelRatio;
canvas.height = STAGE_H * pixelRatio;
canvas.style.width = `${STAGE_W}px`;
canvas.style.height = `${STAGE_H}px`;
canvas.style.imageRendering = 'pixelated';
document.body.appendChild(canvas);

export const renderer = new WebGLRenderer(canvas, {
  backgroundColor: 0xeeddccff,
  contextAttributes: { alpha: false },
});
export const scale = pixelRatio;

export function render(root: Sprite): void {
  renderer.render(root);
}
