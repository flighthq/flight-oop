import {
  addTextureAtlasRegion,
  createTextureAtlas,
  createTextureAtlasFromCanvas,
  createTextureAtlasFromImageBitmap,
  createTextureAtlasFromImageElement,
  createTextureAtlasFromImageSource,
  loadTextureAtlasFromArrayBuffer,
  loadTextureAtlasFromBase64,
  loadTextureAtlasFromBlob,
  loadTextureAtlasFromURL,
} from '../internal/sdkCompat.js';
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

  static fromCanvas(canvas: HTMLCanvasElement): TextureAtlas {
    return TextureAtlas.fromRaw(createTextureAtlasFromCanvas(canvas));
  }

  static fromImageBitmap(bitmap: ImageBitmap): TextureAtlas {
    return TextureAtlas.fromRaw(createTextureAtlasFromImageBitmap(bitmap));
  }

  static fromImageElement(img: HTMLImageElement): TextureAtlas {
    return TextureAtlas.fromRaw(createTextureAtlasFromImageElement(img));
  }

  static fromImageSource(source: ImageSource): TextureAtlas {
    return TextureAtlas.fromRaw(createTextureAtlasFromImageSource(source.raw));
  }

  static async loadFromArrayBuffer(buffer: ArrayBuffer, mimeType?: string): Promise<TextureAtlas> {
    return TextureAtlas.fromRaw(await loadTextureAtlasFromArrayBuffer(buffer, mimeType));
  }

  static async loadFromBase64(base64: string, mimeType: string): Promise<TextureAtlas> {
    return TextureAtlas.fromRaw(await loadTextureAtlasFromBase64(base64, mimeType));
  }

  static async loadFromBlob(blob: Blob): Promise<TextureAtlas> {
    return TextureAtlas.fromRaw(await loadTextureAtlasFromBlob(blob));
  }

  static async loadFromURL(url: string, crossOrigin?: string): Promise<TextureAtlas> {
    return TextureAtlas.fromRaw(await loadTextureAtlasFromURL(url, crossOrigin));
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
