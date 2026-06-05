import { DOMRenderer } from '@flighthq/oop';
import type { Sprite } from '@flighthq/oop';

const STAGE_W = 800;
const STAGE_H = 400;

export const container = document.createElement('div');
container.style.position = 'relative';
container.style.width = `${STAGE_W}px`;
container.style.height = `${STAGE_H}px`;
document.body.appendChild(container);

export const renderer = new DOMRenderer(container, { backgroundColor: 0xeeddccff });
export const scale = 1;

export function render(root: Sprite): void {
  renderer.render(root);
}
