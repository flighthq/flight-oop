import { DOMRenderer } from '@flighthq/oop';
import type { DisplayObject } from '@flighthq/oop';

const STAGE_W = 220;
const STAGE_H = 220;

export const container = document.createElement('div');
container.style.position = 'relative';
container.style.width = `${STAGE_W}px`;
container.style.height = `${STAGE_H}px`;
document.getElementById('app')!.appendChild(container);

export const renderer = new DOMRenderer(container, { backgroundColor: 0x000000ff });
export const scale = 1;

export function render(root: DisplayObject): void {
  renderer.render(root);
}
