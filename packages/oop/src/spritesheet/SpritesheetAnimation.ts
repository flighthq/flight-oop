import { createSpritesheetAnimation } from '../internal/sdkCompat.js';
import type { SpritesheetAnimation as RawSpritesheetAnimation } from '../internal/sdkCompat.js';

import Entity from '../Entity';

export default class SpritesheetAnimation extends Entity<RawSpritesheetAnimation> {
  constructor(frames?: number[], frameDuration?: number, loop?: boolean, originX?: number, originY?: number) {
    super();
    const raw = this.__raw;
    if (frames !== undefined) raw.frames = frames;
    if (frameDuration !== undefined) raw.frameDuration = frameDuration;
    if (loop !== undefined) raw.loop = loop;
    if (originX !== undefined) raw.originX = originX;
    if (originY !== undefined) raw.originY = originY;
  }

  protected override __create() {
    return createSpritesheetAnimation();
  }

  static fromRaw(raw: RawSpritesheetAnimation): SpritesheetAnimation {
    return Entity.getOrCreate(raw, SpritesheetAnimation)!;
  }

  // Get & Set Methods

  get frameDuration(): number {
    return this.__raw.frameDuration;
  }

  set frameDuration(value: number) {
    this.__raw.frameDuration = value;
  }

  get frames(): number[] {
    return this.__raw.frames;
  }

  set frames(value: number[]) {
    this.__raw.frames = value;
  }

  get loop(): boolean {
    return this.__raw.loop;
  }

  set loop(value: boolean) {
    this.__raw.loop = value;
  }

  get originX(): number {
    return this.__raw.originX;
  }

  set originX(value: number) {
    this.__raw.originX = value;
  }

  get originY(): number {
    return this.__raw.originY;
  }

  set originY(value: number) {
    this.__raw.originY = value;
  }
}
