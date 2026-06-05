import { DOMRenderer } from '@flighthq/oop';
import type { DisplayObject } from '@flighthq/oop';

const STAGE_W = 400;
const STAGE_H = 200;

export const container = document.createElement('div');
container.style.position = 'relative';
container.style.width = `${STAGE_W}px`;
container.style.height = `${STAGE_H}px`;
document.body.appendChild(container);

export const renderer = new DOMRenderer(container, { backgroundColor: 0xeeddccff });
export const scale = 1;

export function render(root: DisplayObject): void {
  renderer.render(root);
}
