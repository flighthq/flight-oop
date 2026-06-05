import { createSpritesheetFrame } from '../internal/sdkCompat.js';
import type { Entity as RawEntity, SpritesheetFrame as RawSpritesheetFrame } from '../internal/sdkCompat.js';

import Entity from '../Entity.js';

type RawSpritesheetFrameEntity = RawEntity & RawSpritesheetFrame;

export default class SpritesheetFrame extends Entity<RawSpritesheetFrameEntity> {
  constructor(id?: number, offsetX?: number, offsetY?: number) {
    super();
    if (id !== undefined) this.__raw.id = id;
    if (offsetX !== undefined) this.__raw.offsetX = offsetX;
    if (offsetY !== undefined) this.__raw.offsetY = offsetY;
  }

  protected override __create(): RawSpritesheetFrameEntity {
    return createSpritesheetFrame() as RawSpritesheetFrameEntity;
  }

  static fromRaw(raw: RawSpritesheetFrame): SpritesheetFrame {
    return Entity.getOrCreate(raw as RawSpritesheetFrameEntity, SpritesheetFrame)!;
  }

  get id(): number {
    return this.__raw.id;
  }

  set id(value: number) {
    this.__raw.id = value;
  }

  get offsetX(): number {
    return this.__raw.offsetX;
  }

  set offsetX(value: number) {
    this.__raw.offsetX = value;
  }

  get offsetY(): number {
    return this.__raw.offsetY;
  }

  set offsetY(value: number) {
    this.__raw.offsetY = value;
  }

  override get raw(): RawSpritesheetFrameEntity {
    return this.__raw;
  }
}
