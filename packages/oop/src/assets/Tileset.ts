import {
  createTileset,
  createTilesetFromAtlas,
  createTilesetFromImageSource,
  initTilesetRegions,
  loadTilesetFromArrayBuffer,
  loadTilesetFromBase64,
  loadTilesetFromBlob,
  loadTilesetFromURL,
} from '../internal/sdkCompat.js';
import type { Tileset as RawTileset } from '../internal/sdkCompat.js';

import Entity from '../Entity';
import ImageSource from './ImageSource';
import TextureAtlas from './TextureAtlas';

export default class Tileset extends Entity<RawTileset> {
  constructor(atlas?: TextureAtlas, columns?: number, rows?: number, tileWidth?: number, tileHeight?: number) {
    super();
    const raw = this.__raw;
    if (atlas !== undefined) raw.atlas = atlas.raw;
    if (columns !== undefined) raw.columns = columns;
    if (rows !== undefined) raw.rows = rows;
    if (tileWidth !== undefined) raw.tileWidth = tileWidth;
    if (tileHeight !== undefined) raw.tileHeight = tileHeight;
  }

  protected override __create() {
    return createTileset();
  }

  static fromRaw(raw: RawTileset): Tileset {
    return Entity.getOrCreate(raw, Tileset)!;
  }

  static fromAtlas(atlas: TextureAtlas, tileWidth: number, tileHeight: number): Tileset {
    return Tileset.fromRaw(createTilesetFromAtlas(atlas.raw, tileWidth, tileHeight));
  }

  static fromImageSource(source: ImageSource, tileWidth: number, tileHeight: number): Tileset {
    return Tileset.fromRaw(createTilesetFromImageSource(source.raw, tileWidth, tileHeight));
  }

  static async loadFromArrayBuffer(
    buffer: ArrayBuffer,
    tileWidth: number,
    tileHeight: number,
    mimeType?: string,
  ): Promise<Tileset> {
    return Tileset.fromRaw(await loadTilesetFromArrayBuffer(buffer, tileWidth, tileHeight, mimeType));
  }

  static async loadFromBase64(
    base64: string,
    mimeType: string,
    tileWidth: number,
    tileHeight: number,
  ): Promise<Tileset> {
    return Tileset.fromRaw(await loadTilesetFromBase64(base64, mimeType, tileWidth, tileHeight));
  }

  static async loadFromBlob(blob: Blob, tileWidth: number, tileHeight: number): Promise<Tileset> {
    return Tileset.fromRaw(await loadTilesetFromBlob(blob, tileWidth, tileHeight));
  }

  static async loadFromURL(
    url: string,
    tileWidth: number,
    tileHeight: number,
    crossOrigin?: string,
  ): Promise<Tileset> {
    return Tileset.fromRaw(await loadTilesetFromURL(url, tileWidth, tileHeight, crossOrigin));
  }

  initRegions(): void {
    initTilesetRegions(this.__raw);
  }

  // Get & Set Methods

  get atlas(): TextureAtlas | null {
    if (this.__raw.atlas === null) return null;
    return Entity.getOrCreate(this.__raw.atlas, TextureAtlas);
  }

  set atlas(value: TextureAtlas | null) {
    this.__raw.atlas = value !== null ? value.raw : value;
  }

  get columns(): number {
    return this.__raw.columns;
  }

  set columns(value: number) {
    this.__raw.columns = value;
  }

  get rows(): number {
    return this.__raw.rows;
  }

  set rows(value: number) {
    this.__raw.rows = value;
  }

  get tileHeight(): number {
    return this.__raw.tileHeight;
  }

  set tileHeight(value: number) {
    this.__raw.tileHeight = value;
  }

  get tileWidth(): number {
    return this.__raw.tileWidth;
  }

  set tileWidth(value: number) {
    this.__raw.tileWidth = value;
  }
}
