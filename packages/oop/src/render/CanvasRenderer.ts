import {
  createCanvasRenderState,
  defaultCanvasBitmapRenderer,
  defaultCanvasDisplayObjectRenderer,
  defaultCanvasQuadBatchRenderer,
  isSpriteNode,
  renderBackground,
  renderDisplayObject as __renderDisplayObject,
  renderSprite as __renderSprite,
  registerRenderer,
  updateDisplayObjectBeforeRender,
  updateSpriteBeforeRender,
  BitmapKind,
  DisplayObjectKind,
  QuadBatchKind,
} from '../internal/sdkCompat.js';
import type { CanvasRenderOptions as CanvasRenderOptionsModel, CanvasRenderState } from '../internal/sdkCompat.js';

import type DisplayObject from '../scene/display/DisplayObject';
import type SpriteNode from '../scene/sprite/SpriteNode';
import type CanvasRenderOptions from './CanvasRenderOptions';

export default class CanvasRenderer {
  private state: CanvasRenderState;

  constructor(canvas: HTMLCanvasElement, options?: Partial<CanvasRenderOptions>) {
    this.state = createCanvasRenderState(canvas, this.mapCanvasOptions(options));
    registerRenderer(this.state, DisplayObjectKind, defaultCanvasDisplayObjectRenderer);
    registerRenderer(this.state, BitmapKind, defaultCanvasBitmapRenderer);
    registerRenderer(this.state, QuadBatchKind, defaultCanvasQuadBatchRenderer);
  }

  private mapCanvasOptions(options?: Partial<CanvasRenderOptions>): CanvasRenderOptionsModel | undefined {
    if (!options) return undefined;
    return {
      ...options,
      renderTransform: options.renderTransform?.raw,
    };
  }

  render(renderable: DisplayObject | SpriteNode): void {
    if (isSpriteNode(renderable.raw)) {
      this.renderSprite(renderable as SpriteNode);
    } else {
      this.renderDisplayObject(renderable as DisplayObject);
    }
  }

  renderDisplayObject(displayObject: DisplayObject): void {
    if (updateDisplayObjectBeforeRender(this.state, displayObject.raw)) {
      renderBackground(this.state);
      __renderDisplayObject(this.state, displayObject.raw);
    }
  }

  renderSprite(sprite: SpriteNode): void {
    if (updateSpriteBeforeRender(this.state, sprite.raw)) {
      renderBackground(this.state);
      __renderSprite(this.state, sprite.raw);
    }
  }
}
