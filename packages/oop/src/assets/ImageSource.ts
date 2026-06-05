import {
  createImageSource,
  createImageSourceFromCanvas,
  createImageSourceFromImageBitmap,
  createImageSourceFromImageElement,
  detectImageMimeType,
  isImageSourceSameOrigin,
  loadImageSourceFromArrayBuffer,
  loadImageSourceFromBase64,
  loadImageSourceFromBlob,
  loadImageSourceFromURL,
} from '../internal/sdkCompat.js';
import type { ImageSource as RawImageSource } from '../internal/sdkCompat.js';
import type { Entity as RawEntity } from '../internal/sdkCompat.js';

import Entity from '../Entity';

type RawImageEntity = RawEntity & {
  height: number;
  src: CanvasImageSource | null;
  version: number;
  width: number;
};

export default class ImageSource<RawType extends RawImageEntity = RawImageEntity> extends Entity<RawType> {
  constructor(src?: CanvasImageSource) {
    super();
    if (src) {
      const raw = this.__raw;
      raw.src = src;
      raw.width = src instanceof HTMLVideoElement ? src.videoWidth : (src as HTMLImageElement | HTMLCanvasElement).width;
      raw.height =
        src instanceof HTMLVideoElement ? src.videoHeight : (src as HTMLImageElement | HTMLCanvasElement).height;
    }
  }

  protected override __create() {
    return createImageSource() as RawType;
  }

  static fromRaw(raw: RawImageSource): ImageSource {
    return Entity.getOrCreate(raw as RawImageEntity, ImageSource)!;
  }

  static fromCanvas(canvas: HTMLCanvasElement): ImageSource {
    return ImageSource.fromRaw(createImageSourceFromCanvas(canvas));
  }

  static fromImageBitmap(bitmap: ImageBitmap): ImageSource {
    return ImageSource.fromRaw(createImageSourceFromImageBitmap(bitmap));
  }

  static fromImageElement(img: HTMLImageElement): ImageSource {
    return ImageSource.fromRaw(createImageSourceFromImageElement(img));
  }

  static detectMimeType(buffer: ArrayBuffer): string | null {
    return detectImageMimeType(buffer);
  }

  static isSameOrigin(url: string): boolean {
    return isImageSourceSameOrigin(url);
  }

  static async loadFromArrayBuffer(buffer: ArrayBuffer, mimeType?: string): Promise<ImageSource> {
    return ImageSource.fromRaw(await loadImageSourceFromArrayBuffer(buffer, mimeType));
  }

  static async loadFromBase64(base64: string, mimeType: string): Promise<ImageSource> {
    return ImageSource.fromRaw(await loadImageSourceFromBase64(base64, mimeType));
  }

  static async loadFromBlob(blob: Blob): Promise<ImageSource> {
    return ImageSource.fromRaw(await loadImageSourceFromBlob(blob));
  }

  static async loadFromURL(url: string, crossOrigin?: string): Promise<ImageSource> {
    return ImageSource.fromRaw(await loadImageSourceFromURL(url, crossOrigin));
  }

  get height(): number {
    return this.__raw.height;
  }

  set height(value: number) {
    this.__raw.height = value;
  }

  get src(): CanvasImageSource | null {
    return this.__raw.src;
  }

  set src(value: CanvasImageSource | null) {
    this.__raw.src = value;
    this.__raw.version++;
  }

  get width(): number {
    return this.__raw.width;
  }

  set width(value: number) {
    this.__raw.width = value;
  }
}
