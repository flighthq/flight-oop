import { addTextureAtlasRegion, createTextureAtlas } from '../internal/sdkCompat.js';
import type { TextureAtlas as RawTextureAtlas } from '../internal/sdkCompat.js';

import Entity from '../Entity';
import ImageSource from './ImageSource';
import TextureAtlasRegion from './TextureAtlasRegion';

export default class TextureAtlas extends Entity<RawTextureAtlas> {
  constructor(image?: ImageSource) {
    super();
    if (image) this.__raw.image = image.raw;
  }

  protected override __create() {
    return createTextureAtlas();
  }

  addRegion(region: Readonly<TextureAtlasRegion>): void {
    addTextureAtlasRegion(
      this.__raw,
      region.x,
      region.y,
      region.width,
      region.height,
      region.pivotX ?? undefined,
      region.pivotY ?? undefined,
    );
  }

  static fromRaw(raw: RawTextureAtlas): TextureAtlas {
    return Entity.getOrCreate(raw, TextureAtlas)!;
  }

  getRegion(index: number): Readonly<TextureAtlasRegion> | null {
    if (index >= 0 && index < this.__raw.regions.length) {
      return Entity.getOrCreate(this.__raw.regions[index], TextureAtlasRegion);
    }
    return null;
  }

  // Get & Set Methods

  get image(): ImageSource | null {
    return Entity.getOrCreate(this.__raw.image, ImageSource);
  }

  set image(value: ImageSource | null) {
    this.__raw.image = value ? value.raw : null;
  }

  get numRegions(): number {
    return this.__raw.regions.length;
  }
}
