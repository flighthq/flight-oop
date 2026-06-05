import { Bitmap, DisplayContainer, ImageSource, InteractionManager, Quad, TweenManager } from '@flighthq/oop';

export const TILE_SIZE = 57;
export const TILE_STEP = TILE_SIZE + 16;

export interface TileInteractionOptions {
  coordScale?: number;
  cursorElement?: HTMLElement;
}

export class Tile {
  obj: DisplayContainer;
  column: number = 0;
  row: number = 0;
  type: number;
  moving: boolean = false;
  removed: boolean = false;

  constructor(image: ImageSource, type: number) {
    this.type = type;
    this.obj = new DisplayContainer();
    this.obj.setLocalBounds(0, 0, TILE_SIZE, TILE_SIZE);

    const bitmap = new Bitmap(image);
    bitmap.smoothing = true;
    this.obj.addChild(bitmap);
  }

  init(): void {
    this.moving = false;
    this.removed = false;
    this.obj.alpha = 1;
    this.obj.scaleX = 1;
    this.obj.scaleY = 1;
  }

  connectInteraction(
    manager: InteractionManager,
    onDrag: (tile: Tile, dx: number, dy: number) => void,
    options?: TileInteractionOptions,
  ): void {
    const coordScale = options?.coordScale ?? 1;
    const cursorElement = options?.cursorElement ?? null;
    const dragThreshold = 10 * coordScale;
    let startX = 0;
    let startY = 0;
    let isDragging = false;

    const signals = manager.getSignals(this.obj);

    signals.onPointerDown.connect((data) => {
      if (this.moving) return;
      manager.capturePointer(data.pointerId, this.obj);
      startX = data.worldX;
      startY = data.worldY;
      isDragging = true;
    });

    signals.onPointerUp.connect((data) => {
      manager.releasePointer(data.pointerId);
      if (!isDragging) return;
      isDragging = false;
      if (this.moving) return;
      const dx = data.worldX - startX;
      const dy = data.worldY - startY;
      if (Math.abs(dx) > dragThreshold || Math.abs(dy) > dragThreshold) {
        onDrag(this, dx, dy);
      }
    });

    if (cursorElement !== null) {
      signals.onPointerOver.connect(() => {
        cursorElement.style.cursor = this.moving ? '' : 'pointer';
      });
      signals.onPointerMove.connect(() => {
        cursorElement.style.cursor = this.moving ? '' : 'pointer';
      });
      signals.onPointerOut.connect(() => {
        cursorElement.style.cursor = '';
      });
    }
  }

  move(manager: TweenManager, duration: number, targetX: number, targetY: number): void {
    this.moving = true;
    const tween = manager.tween(this.obj, duration, { x: targetX, y: targetY }, { ease: Quad.easeOut });
    tween.onComplete.connect(() => {
      this.moving = false;
    });
  }

  removeAnimated(manager: TweenManager, tileContainer: DisplayContainer): void {
    if (this.removed) return;
    this.removed = true;

    const half = TILE_SIZE / 2;
    tileContainer.addChildAt(this.obj, 0);

    const tween = manager.tween(
      this.obj,
      600,
      { alpha: 0, scaleX: 2, scaleY: 2, x: this.obj.x - half, y: this.obj.y - half },
      { ease: Quad.easeOut },
    );
    tween.onComplete.connect(() => {
      if (this.obj.parent !== null) this.obj.parent.removeChild(this.obj);
    });
  }

  removeImmediate(tileContainer: DisplayContainer): void {
    this.removed = true;
    if (this.obj.parent !== null) this.obj.parent.removeChild(this.obj);
  }
}
