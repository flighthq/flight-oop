import { createFont } from '../internal/sdkCompat.js';
import type { Font as RawFont } from '../internal/sdkCompat.js';

import Entity from '../Entity';

export default class Font extends Entity<RawFont> {
  constructor(name: string = '') {
    super();
    if (name !== '') this.__raw.name = name;
  }

  protected override __create() {
    return createFont('');
  }

  static fromRaw(raw: RawFont): Font {
    return Entity.getOrCreate(raw, Font)!;
  }

  get name(): string {
    return this.__raw.name;
  }

  set name(value: string) {
    this.__raw.name = value;
  }
}
