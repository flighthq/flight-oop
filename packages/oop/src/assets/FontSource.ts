import { createFontSource } from '../internal/sdkCompat.js';
import type { Entity as RawEntity, FontSource as RawFontSource } from '../internal/sdkCompat.js';

import Entity from '../Entity.js';

type RawFontSourceEntity = RawEntity & RawFontSource;

export default class FontSource extends Entity<RawFontSourceEntity> {
  constructor(family: string = '') {
    super();
    if (family !== '') this.__raw.family = family;
  }

  protected override __create(): RawFontSourceEntity {
    return createFontSource('') as RawFontSourceEntity;
  }

  static fromRaw(raw: RawFontSource): FontSource {
    return Entity.getOrCreate(raw as RawFontSourceEntity, FontSource)!;
  }

  get face(): FontFace | null {
    return this.__raw.face;
  }

  set face(value: FontFace | null) {
    this.__raw.face = value;
  }

  get family(): string {
    return this.__raw.family;
  }

  set family(value: string) {
    this.__raw.family = value;
  }

  override get raw(): RawFontSourceEntity {
    return this.__raw;
  }
}
