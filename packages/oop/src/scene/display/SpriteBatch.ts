import { createSpriteBatch, invalidateAppearance, invalidateLocalBounds } from '../../internal/sdkCompat.js';
import type { SpriteBatch as RawSpriteBatch, SpriteBatchData } from '../../internal/sdkCompat.js';

import Entity from '../../Entity.js';
import type SpriteNode from '../sprite/SpriteNode.js';
import DisplayObject from './DisplayObject.js';

export default class SpriteBatch extends DisplayObject {
  protected __data: SpriteBatchData;

  constructor(graph?: SpriteNode | null, smoothing?: boolean) {
    super();
    this.__data = this.__raw.data as SpriteBatchData;
    if (graph !== undefined) this.__data.graph = graph?.raw ?? null;
    if (smoothing !== undefined) this.__data.smoothing = smoothing;
  }

  protected override __create() {
    return createSpriteBatch();
  }

  static fromRaw(raw: RawSpriteBatch): SpriteBatch {
    return Entity.getOrCreate(raw, SpriteBatch)!;
  }

  override get raw(): RawSpriteBatch {
    return this.__raw as RawSpriteBatch;
  }

  get graph(): SpriteNode | null {
    return Entity.get(this.__data.graph) as SpriteNode | null;
  }

  set graph(value: SpriteNode | null) {
    if (value?.raw === this.__data.graph) return;
    this.__data.graph = value?.raw ?? null;
    invalidateLocalBounds(this.__raw);
    invalidateAppearance(this.__raw);
  }

  get smoothing(): boolean {
    return this.__data.smoothing;
  }

  set smoothing(value: boolean) {
    if (value === this.__data.smoothing) return;
    this.__data.smoothing = value;
    invalidateAppearance(this.__raw);
  }
}
