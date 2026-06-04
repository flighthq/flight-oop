import { createBitmap, invalidateAppearance, invalidateLocalBounds } from '../../internal/sdkCompat.js';
import type { Bitmap as RawBitmap, BitmapData } from '../../internal/sdkCompat.js';

import ImageSource from '../../assets/ImageSource';
import Entity from '../../Entity';
import DisplayObject from './DisplayObject';

export default class Bitmap extends DisplayObject {
  protected __data: BitmapData;
  constructor(image?: ImageSource | null, smoothing?: boolean) {
    super();
    this.__data = this.__raw.data as BitmapData;
    if (image) this.__data.image = image.raw;
    if (smoothing) this.__data.smoothing = smoothing;
  }

  protected override __create() {
    return createBitmap();
  }

  static fromRaw(raw: RawBitmap): Bitmap {
    return Entity.getOrCreate(raw, Bitmap)!;
  }

  // Get & Set Methods

  get image(): ImageSource | null {
    return Entity.getOrCreate(this.__data.image, ImageSource);
  }

  set image(value: ImageSource | null) {
    this.__data.image = value !== null ? value.raw : null;
    invalidateLocalBounds(this.__raw);
    invalidateAppearance(this.__raw);
  }

  override get raw(): RawBitmap {
    return this.__raw as RawBitmap;
  }

  get smoothing(): boolean {
    return this.__data.smoothing;
  }

  set smoothing(value: boolean) {
    if (this.__data.smoothing === value) return;
    this.__data.smoothing = value;
    invalidateAppearance(this.__raw);
  }
}
