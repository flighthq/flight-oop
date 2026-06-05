import { createRenderCommandPool, resetRenderCommandPool } from '../internal/sdkCompat.js';
import type { Entity as RawEntity, RenderCommandPool as RawRenderCommandPool } from '../internal/sdkCompat.js';

import Entity from '../Entity.js';

type RawRenderCommandPoolEntity = RawEntity & RawRenderCommandPool;

export default class RenderCommandPool extends Entity<RawRenderCommandPoolEntity> {
  protected override __create(): RawRenderCommandPoolEntity {
    return createRenderCommandPool() as RawRenderCommandPoolEntity;
  }

  static fromRaw(raw: RawRenderCommandPool): RenderCommandPool {
    return Entity.getOrCreate(raw as RawRenderCommandPoolEntity, RenderCommandPool)!;
  }

  reset(): void {
    resetRenderCommandPool(this.__raw);
  }

  get commandCount(): number {
    return this.__raw.commandCount;
  }

  set commandCount(value: number) {
    this.__raw.commandCount = value;
  }
}
