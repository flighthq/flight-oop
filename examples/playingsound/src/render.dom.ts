import { DOMRenderer } from '@flighthq/oop';
import type { DisplayObject } from '@flighthq/oop';

export const container = document.createElement('div');
container.style.position = 'relative';
container.style.width = `${window.innerWidth}px`;
container.style.height = `${window.innerHeight}px`;
document.body.appendChild(container);

export const renderer = new DOMRenderer(container, { backgroundColor: 0xeeddccff });
export const scale = 1;

export function render(root: DisplayObject): void {
  renderer.render(root);
}

export function setSize(w: number, h: number): void {
  container.style.width = `${w}px`;
  container.style.height = `${h}px`;
  renderer.resize(w, h);
}
