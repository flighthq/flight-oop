import { createImageSource } from '../internal/sdkCompat.js';
import type { ImageSource as RawImageSource } from '../internal/sdkCompat.js';

import Entity from '../Entity';

export default class ImageSource extends Entity<RawImageSource> {
  constructor(src?: HTMLImageElement) {
    super();
    if (src) {
      const raw = this.__raw;
      raw.src = src;
      raw.width = src.width;
      raw.height = src.height;
    }
  }

  protected override __create() {
    return createImageSource();
  }

  static fromRaw(raw: RawImageSource): ImageSource {
    return Entity.getOrCreate(raw, ImageSource)!;
  }

  get height(): number {
    return this.__raw.height;
  }

  set height(value: number) {
    this.__raw.height = value;
  }

  get src(): HTMLImageElement | null {
    return this.__raw.src;
  }

  set src(value: HTMLImageElement | null) {
    this.__raw.src = value;
  }

  get width(): number {
    return this.__raw.width;
  }

  set width(value: number) {
    this.__raw.width = value;
  }
}
