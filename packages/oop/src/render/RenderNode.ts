import { syncRenderNodeRenderer } from '../internal/sdkCompat.js';
import type { Entity as RawEntity, RenderNode as RawRenderNode } from '../internal/sdkCompat.js';

import Entity from '../Entity.js';
import RenderState from './RenderState.js';

type RawRenderNodeEntity = RawEntity & RawRenderNode;

export default class RenderNode extends Entity<RawRenderNodeEntity> {
  protected override __create(): RawRenderNodeEntity {
    throw new Error('RenderNode objects are created by RenderState.');
  }

  static fromRaw(raw: RawRenderNode): RenderNode {
    return Entity.getOrCreate(raw as RawRenderNodeEntity, RenderNode)!;
  }

  syncRenderer(state: Readonly<RenderState>): void {
    syncRenderNodeRenderer(state.raw, this.__raw);
  }

  get alpha(): number {
    return this.__raw.alpha;
  }

  set alpha(value: number) {
    this.__raw.alpha = value;
  }

  get name(): string | null {
    return this.__raw.name;
  }

  set name(value: string | null) {
    this.__raw.name = value;
  }

  get visible(): boolean {
    return this.__raw.visible;
  }

  set visible(value: boolean) {
    this.__raw.visible = value;
  }
}
